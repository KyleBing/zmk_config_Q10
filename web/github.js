const GH_META = "q10-gh-meta-v2";
const GH_TOKEN = "q10-gh-token-v1";

let ghDefaultBranch = "";

function b64ToUtf8(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
}
function utf8ToB64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function explainGhError(err) {
  const m = String(err.message || err);
  if (/resource not accessible/i.test(m)) {
    return (
      m +
      "。Token 没有写仓库权限。请重新生成：Fine-grained 必须把 Contents 设为 Read and write（不是 Read-only），并勾选当前这个仓库；改权限后旧 Token 不会生效。公开库也可以用 Classic token，勾 public_repo。"
    );
  }
  if (/bad credentials|401/i.test(m)) {
    return m + "。Token 无效或已过期，请重新生成后粘贴。";
  }
  if (/fast forward/i.test(m)) {
    return (
      m +
      "。仓库默认分支刚被更新（上次推送或 GitHub Actions），当前提交叠不上去。请先点「从仓库读取」，再推送一次。"
    );
  }
  return m;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function ghStatus(kind, title, detail) {
  const box = document.getElementById("gh-status");
  const t = document.getElementById("gh-status-title");
  const d = document.getElementById("gh-status-detail");
  if (!box || !t || !d) return;
  if (!title) {
    box.hidden = true;
    return;
  }
  box.hidden = false;
  box.className = "gh-banner " + (kind || "");
  t.textContent = title;
  d.textContent = detail || "";
  d.hidden = !detail;
}

async function ghApi(g, path, opts = {}) {
  const res = await fetch(`https://api.github.com/repos/${g.owner}/${g.repo}${path}`, {
    ...opts,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `token ${g.token}`,
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

async function ghPutFile(g, path, content, message) {
  let lastErr;
  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt) await sleep(350 * attempt);
    try {
      let sha;
      let existingText;
      try {
        const existing = await ghApi(g, `/contents/${path}?ref=${encodeURIComponent(g.branch)}`);
        sha = existing.sha;
        existingText = b64ToUtf8(existing.content);
      } catch (e) {
        if (!String(e.message).includes("Not Found")) throw e;
      }
      if (existingText === content) {
        return { skipped: true, commit: { sha } };
      }
      const body = {
        message,
        content: utf8ToB64(content),
        branch: g.branch,
      };
      if (sha) body.sha = sha;
      return await ghApi(g, `/contents/${path}`, { method: "PUT", body: JSON.stringify(body) });
    } catch (e) {
      lastErr = e;
      const msg = String(e.message || "");
      if (!/fast forward|sha doesn|Conflict|409/i.test(msg)) throw e;
    }
  }
  throw lastErr;
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
  ghStatus("pending", "正在读取仓库…", "拉取 keymap 与 conf");
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
    ghStatus("ok", "已从仓库读取", "正在刷新页面以套用配置");
    toast("已从仓库读取");
    location.reload();
  } catch (e) {
    ghStatus("err", "读取失败", explainGhError(e));
    toast("读取失败");
  }
}

async function ghPush() {
  let g = ghReadForm();
  ghSaveMeta();
  ghStatus("pending", "正在推送到 GitHub…", "写入 conf / keymap / JSON");
  try {
    g = await ensureRepo(g);
    const repo = await ghApi(g, "");
    if (repo.permissions && repo.permissions.push === false) {
      throw new Error("Resource not accessible by personal access token");
    }
    const files = [
      { path: "config/bbq10.conf", content: generateConf() },
      { path: "config/bbq10.keymap", content: generateKeymap() },
      { path: "config/q10-config.json", content: generateJson() },
    ];
    let lastSha = "";
    for (const f of files) {
      const out = await ghPutFile(g, f.path, f.content, "Update Q10 config from configurator");
      lastSha = out.commit?.sha || lastSha;
      await sleep(200);
    }
    const where = `${g.owner}/${g.repo}  ·  ${g.branch}${lastSha ? "  ·  " + lastSha.slice(0, 7) : ""}`;
    ghStatus("ok", "已推送到 GitHub", where + "\nGitHub Actions 随后会编译固件。");
    toast("已推到 GitHub");
    localStorage.setItem(STORAGE, JSON.stringify(state));
  } catch (e) {
    ghStatus("err", "推送失败", explainGhError(e));
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
