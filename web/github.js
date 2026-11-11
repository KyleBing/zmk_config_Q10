const GH_META = "q10-gh-meta-v1";
const GH_TOKEN = "q10-gh-token-v1";

function b64ToUtf8(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
}

function ghReadForm() {
  return {
    owner: document.getElementById("gh-owner").value.trim(),
    repo: document.getElementById("gh-repo").value.trim(),
    branch: document.getElementById("gh-branch").value.trim() || "main",
    token: document.getElementById("gh-token").value.trim(),
    remember: document.getElementById("gh-remember").checked,
  };
}

function ghSaveMeta() {
  const g = ghReadForm();
  localStorage.setItem(GH_META, JSON.stringify({ owner: g.owner, repo: g.repo, branch: g.branch, remember: g.remember }));
  if (g.remember && g.token) localStorage.setItem(GH_TOKEN, g.token);
  else localStorage.removeItem(GH_TOKEN);
}

function ghRestoreMeta() {
  try {
    const meta = JSON.parse(localStorage.getItem(GH_META) || "{}");
    if (meta.owner) document.getElementById("gh-owner").value = meta.owner;
    if (meta.repo) document.getElementById("gh-repo").value = meta.repo;
    if (meta.branch) document.getElementById("gh-branch").value = meta.branch;
    document.getElementById("gh-remember").checked = !!meta.remember;
    const tok = localStorage.getItem(GH_TOKEN);
    if (tok) document.getElementById("gh-token").value = tok;
  } catch (_) { /* ignore */ }
}

function ghStatus(msg) {
  const el = document.getElementById("gh-status");
  if (el) el.textContent = msg;
}

async function ghApi(g, path, opts = {}) {
  const res = await fetch(`https://api.github.com/repos/${g.owner}/${g.repo}${path}`, {
    ...opts,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${g.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch (_) { data = { raw: text }; }
  if (!res.ok) {
    const msg = data.message || res.statusText;
    throw new Error(msg);
  }
  return data;
}

function parseConfText(text) {
  const out = {};
  text.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^(CONFIG_[A-Z0-9_]+)=(.*)$/);
    if (!m) return;
    const v = m[2].trim();
    out[m[1]] = /^-?\d+$/.test(v) ? Number(v) : v;
  });
  return out;
}

async function ghGetFile(g, path) {
  try {
    const data = await ghApi(g, `/contents/${path}?ref=${encodeURIComponent(g.branch)}`);
    return b64ToUtf8(data.content);
  } catch (e) {
    if (String(e.message).includes("Not Found")) return null;
    throw e;
  }
}

async function ghPull() {
  const g = ghReadForm();
  if (!g.token) { toast("先填 GitHub Token"); return; }
  ghSaveMeta();
  ghStatus("正在读取…");
  try {
    const jsonText = await ghGetFile(g, "config/q10-config.json");
    const confText = await ghGetFile(g, "config/bbq10.conf");
    const base = defaultState();
    if (jsonText) {
      const parsed = JSON.parse(jsonText);
      state = {
        conf: { ...base.conf, ...parsed.conf },
        timing: { ...base.timing, ...parsed.timing },
        layers: parsed.layers?.length === 3 ? parsed.layers : base.layers,
      };
    } else if (confText) {
      state.conf = { ...base.conf, ...parseConfText(confText) };
    } else {
      throw new Error("仓库里没有 config/q10-config.json 或 bbq10.conf");
    }
    localStorage.setItem(STORAGE, JSON.stringify(state));
    ghStatus("已从 GitHub 读入，正在刷新页面");
    toast("已从仓库读取");
    location.reload();
  } catch (e) {
    ghStatus("读取失败：" + e.message);
    toast("读取失败");
  }
}

async function ghPush() {
  const g = ghReadForm();
  if (!g.token) { toast("先填 GitHub Token"); return; }
  ghSaveMeta();
  ghStatus("正在提交…");
  try {
    const files = [
      { path: "config/bbq10.conf", content: generateConf() },
      { path: "config/bbq10.keymap", content: generateKeymap() },
      { path: "config/q10-config.json", content: generateJson() },
    ];
    const branch = await ghApi(g, `/branches/${encodeURIComponent(g.branch)}`);
    const parent = branch.commit.sha;
    const baseTree = branch.commit.commit.tree.sha;
    const treeItems = [];
    for (const f of files) {
      const blob = await ghApi(g, "/git/blobs", {
        method: "POST",
        body: JSON.stringify({ content: f.content, encoding: "utf-8" }),
      });
      treeItems.push({ path: f.path, mode: "100644", type: "blob", sha: blob.sha });
    }
    const tree = await ghApi(g, "/git/trees", {
      method: "POST",
      body: JSON.stringify({ base_tree: baseTree, tree: treeItems }),
    });
    const commit = await ghApi(g, "/git/commits", {
      method: "POST",
      body: JSON.stringify({
        message: "Update Q10 config from configurator",
        tree: tree.sha,
        parents: [parent],
      }),
    });
    await ghApi(g, `/git/refs/heads/${encodeURIComponent(g.branch)}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha }),
    });
    ghStatus("已 push：" + commit.sha.slice(0, 7) + "（随后 Actions 会编固件）");
    toast("已推到 GitHub");
    localStorage.setItem(STORAGE, JSON.stringify(state));
  } catch (e) {
    ghStatus("推送失败：" + e.message);
    toast("推送失败");
  }
}

document.getElementById("gh-pull").addEventListener("click", ghPull);
document.getElementById("gh-push").addEventListener("click", ghPush);
["gh-owner", "gh-repo", "gh-branch", "gh-token", "gh-remember"].forEach((id) => {
  document.getElementById(id).addEventListener("change", ghSaveMeta);
});
ghRestoreMeta();
