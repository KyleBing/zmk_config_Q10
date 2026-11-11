const GH_META = "q10-gh-meta-v2";
const GH_TOKEN = "q10-gh-token-v1";

let ghDefaultBranch = "";

function b64ToUtf8(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
}

function parseRepoLink(url) {
  const s = (url || "").trim();
  if (!s) return null;
  let m = s.match(/github\.com[/:]([^/]+)\/([^/#?\s]+)/i);
  if (m) return { owner: m[1], repo: m[2].replace(/\.git$/i, "") };
  m = s.match(/^https?:\/\/([^.]+)\.github\.io\/([^/#?\s]+)/i);
  if (m) return { owner: m[1], repo: m[2].replace(/\/$/, "") };
  return null;
}

function detectRepoFromPage() {
  const host = location.hostname;
  const m = host.match(/^([^.]+)\.github\.io$/i);
  if (!m) return null;
  const repo = location.pathname.split("/").filter(Boolean)[0];
  if (!repo) return null;
  return {
    owner: m[1],
    repo,
    url: `https://github.com/${m[1]}/${repo}`,
  };
}

function ghReadForm() {
  const parsed = parseRepoLink(document.getElementById("gh-repo-url").value);
  return {
    owner: parsed?.owner || "",
    repo: parsed?.repo || "",
    branch: ghDefaultBranch || "main",
    token: document.getElementById("gh-token").value.trim(),
    remember: document.getElementById("gh-remember").checked,
    url: document.getElementById("gh-repo-url").value.trim(),
  };
}

function ghSaveMeta() {
  const g = ghReadForm();
  localStorage.setItem(GH_META, JSON.stringify({ url: g.url, remember: g.remember }));
  if (g.remember && g.token) localStorage.setItem(GH_TOKEN, g.token);
  else localStorage.removeItem(GH_TOKEN);
}

function setDerived(text, parsed) {
  document.getElementById("gh-derived").textContent = text;
  if (parsed) {
    document.getElementById("hint-owner").textContent = parsed.owner;
    document.getElementById("hint-repo").textContent = parsed.repo;
  } else {
    document.getElementById("hint-owner").textContent = "你的用户名";
    document.getElementById("hint-repo").textContent = "仓库名";
  }
}

async function ghFetchRepo(parsed, token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}

async function refreshRepoMeta() {
  const parsed = parseRepoLink(document.getElementById("gh-repo-url").value);
  const token = document.getElementById("gh-token").value.trim();
  if (!parsed) {
    ghDefaultBranch = "";
    setDerived("填写 GitHub 仓库地址后，会自动解析账号、仓库名和默认分支。", null);
    return;
  }
  setDerived(`解析为 ${parsed.owner}/${parsed.repo}，正在读取默认分支…`, parsed);
  try {
    const repo = await ghFetchRepo(parsed, token);
    ghDefaultBranch = repo.default_branch || "main";
    setDerived(`将读写 ${parsed.owner}/${parsed.repo} · 默认分支 ${ghDefaultBranch}`, parsed);
  } catch (e) {
    ghDefaultBranch = "";
    setDerived(
      `已解析 ${parsed.owner}/${parsed.repo}，但读不到默认分支（${e.message}）。公开库应能自动读取；私有库请先填 Token。`,
      parsed
    );
  }
}

function ghRestoreMeta() {
  try {
    const meta = JSON.parse(localStorage.getItem(GH_META) || "{}");
    const detected = detectRepoFromPage();
    const url = meta.url || detected?.url || "";
    if (url) document.getElementById("gh-repo-url").value = url;
    document.getElementById("gh-remember").checked = !!meta.remember;
    const tok = localStorage.getItem(GH_TOKEN);
    if (tok) document.getElementById("gh-token").value = tok;
  } catch (_) { /* ignore */ }
  refreshRepoMeta();
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
    throw new Error(data.message || res.statusText);
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

async function ensureRepo(g) {
  if (!g.owner || !g.repo) throw new Error("请先填写 GitHub 仓库链接");
  if (!g.token) throw new Error("请先填写 GitHub Token");
  if (!ghDefaultBranch) await refreshRepoMeta();
  g.branch = ghDefaultBranch || g.branch || "main";
  if (!g.branch) throw new Error("无法读取仓库默认分支");
  return g;
}

async function ghPull() {
  let g = ghReadForm();
  ghSaveMeta();
  ghStatus("正在读取…");
  try {
    g = await ensureRepo(g);
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
  let g = ghReadForm();
  ghSaveMeta();
  ghStatus("正在提交…");
  try {
    g = await ensureRepo(g);
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
    ghStatus(`已 push 到 ${g.owner}/${g.repo}@${g.branch}：${commit.sha.slice(0, 7)}（随后 Actions 会编固件）`);
    toast("已推到 GitHub");
    localStorage.setItem(STORAGE, JSON.stringify(state));
  } catch (e) {
    ghStatus("推送失败：" + e.message);
    toast("推送失败");
  }
}

document.getElementById("gh-pull").addEventListener("click", ghPull);
document.getElementById("gh-push").addEventListener("click", ghPush);
let repoMetaTimer = 0;
document.getElementById("gh-repo-url").addEventListener("input", () => {
  clearTimeout(repoMetaTimer);
  repoMetaTimer = setTimeout(() => {
    ghSaveMeta();
    refreshRepoMeta();
  }, 400);
});
document.getElementById("gh-token").addEventListener("change", () => {
  ghSaveMeta();
  refreshRepoMeta();
});
document.getElementById("gh-remember").addEventListener("change", ghSaveMeta);
ghRestoreMeta();
