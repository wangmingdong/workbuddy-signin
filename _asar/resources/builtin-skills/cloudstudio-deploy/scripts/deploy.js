#!/usr/bin/env node
//
// CloudStudio Workspace Deploy CLI
//
// 将本地静态站点一键部署到 CloudStudio 工作空间。
// 内置通用 Node.js 静态文件服务，支持 SPA fallback。
//
// Usage:
//   node deploy.js deploy <dir> [port]
//   node deploy.js deploy-to <spaceKey> <dir> [port]
//   node deploy.js create
//   node deploy.js destroy <spaceKey>
//
// Environment:
//   CS_ENV       "internal" | "external" (default: "external")
//   CS_API_KEY   Override PaaS API key
//   CS_PAAS_API  Override PaaS API base URL
//   CS_WS_DOMAIN Override data-plane domain suffix

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const CS_ENV = process.env.CS_ENV || "external";

const ENV_PRESETS = {
  external: {
    paasApi: "https://api.ap-beijing.sandbox.cloudstudio.club",
    wsDomain: "e2b.ap-beijing.sandbox.cloudstudio.club",
    wsScheme: "https",
  },
  internal: {
    paasApi: "http://api.tc-nanjing.sandbox.codebuddy.woa.com",
    wsDomain: "e2b.tc-nanjing.sandbox.codebuddy.woa.com",
    wsScheme: "http",
  },
};

const preset = ENV_PRESETS[CS_ENV] || ENV_PRESETS.external;

const PAAS_API  = process.env.CS_PAAS_API  || preset.paasApi;
const API_KEY   = process.env.CS_API_KEY    || "";
const WS_DOMAIN = process.env.CS_WS_DOMAIN || preset.wsDomain;
const WS_SCHEME = preset.wsScheme;

// 工作空间数据面端口
// 65213 = workspace API（filesystem / console）
// 65310 = PTY（replaceCloudStudioConfig / getAutoRunLog）
const PORT_API = 65213;
const PORT_PTY = 65310;

const REMOTE_ROOT   = "/workspace";
const ARCHIVE_NAME  = "deploy-bundle.tar.gz";
const DEFAULT_PORT  = 3000;
const READY_TIMEOUT = 120_000; // ms

// 运行时填充的 session token
let sessionToken = "";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function die(msg) { console.error(`\n✖ ${msg}`); process.exit(1); }

function wsUrl(port, spaceKey) {
  return `${WS_SCHEME}://${port}-${spaceKey}.${WS_DOMAIN}`;
}

function bearerHeaders(extra = {}) {
  const h = { ...extra };
  if (sessionToken) h["Authorization"] = `Bearer ${sessionToken}`;
  return h;
}

// ---------------------------------------------------------------------------
// Embedded static file server (_serve.js)
//
// 部署到沙箱后作为启动入口；通过 PORT / ROOT 环境变量配置。
// 非文件路径自动 fallback 到 index.html（SPA 支持）。
// ---------------------------------------------------------------------------

const SERVE_JS = `\
const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = parseInt(process.env.PORT || "3000", 10);
const ROOT = process.env.ROOT || "/workspace";

const MIME = {
  html:"text/html; charset=utf-8", js:"application/javascript; charset=utf-8",
  mjs:"application/javascript; charset=utf-8", css:"text/css; charset=utf-8",
  json:"application/json; charset=utf-8", svg:"image/svg+xml",
  png:"image/png", jpg:"image/jpeg", jpeg:"image/jpeg", gif:"image/gif",
  ico:"image/x-icon", webp:"image/webp", woff:"font/woff", woff2:"font/woff2",
  ttf:"font/ttf", eot:"application/vnd.ms-fontobject", mp4:"video/mp4",
  webm:"video/webm", pdf:"application/pdf", xml:"application/xml",
  txt:"text/plain; charset=utf-8", map:"application/json",
};

http.createServer((req, res) => {
  let url = req.url.split("?")[0].split("#")[0];
  if (url === "/") url = "/index.html";
  const fp = path.join(ROOT, decodeURIComponent(url));
  if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
  const ext = path.extname(fp).slice(1).toLowerCase();
  fs.readFile(fp, (err, data) => {
    if (err) {
      fs.readFile(path.join(ROOT, "index.html"), (e2, d2) => {
        res.writeHead(e2 ? 404 : 200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(e2 ? "Not Found" : d2);
      });
    } else {
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    }
  });
}).listen(PORT, () => console.log("Static server on port " + PORT + ", root: " + ROOT));
`;

// ---------------------------------------------------------------------------
// PaaS Control-Plane API (api.xxx)
// ---------------------------------------------------------------------------

async function paasPost(urlPath, body) {
  const res = await fetch(`${PAAS_API}${urlPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`PaaS ${urlPath}: ${data.message || JSON.stringify(data)}`);
  return data.data;
}

async function paasGet(urlPath) {
  const res = await fetch(`${PAAS_API}${urlPath}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`PaaS ${urlPath}: ${data.message || JSON.stringify(data)}`);
  return data.data;
}

async function paasDelete(urlPath) {
  const res = await fetch(`${PAAS_API}${urlPath}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`PaaS ${urlPath}: ${data.message || JSON.stringify(data)}`);
  return data.data;
}

/** 创建工作空间，返回 workspace 对象 */
async function createWorkspace() {
  return paasPost("/workspaces", {
    expireAt: 0,
    runtimeSpec: { cpu: "1", memory: "2g" },
    storage: { type: "cbd", cbd: { quota: "1G" } },
  });
}

/** 创建连接会话，返回 session token */
async function createSession(spaceKey) {
  const data = await paasPost(`/workspaces/${spaceKey}/sessions`, {});
  sessionToken = data.token;
  return sessionToken;
}

/** 获取分享链接 */
async function getShareLink(spaceKey, port, expire = 157_680_000) {
  try {
    const data = await paasPost(`/workspaces/${spaceKey}/links`, { port, expire });
    return data?.host ? `${data.scheme}://${data.host}` : null;
  } catch { return null; }
}

/** 删除工作空间 */
async function destroyWorkspace(spaceKey) {
  return paasDelete(`/workspaces/${spaceKey}`);
}

// ---------------------------------------------------------------------------
// Data-Plane API (65213 = filesystem/console, 65310 = PTY)
// ---------------------------------------------------------------------------

/** 轮询 PTY 端口等待沙箱就绪 */
async function waitForReady(spaceKey) {
  const start = Date.now();
  const probeUrl = `${wsUrl(PORT_PTY, spaceKey)}/getAutoRunLog`;

  while (Date.now() - start < READY_TIMEOUT) {
    try {
      const res = await fetch(probeUrl, { headers: bearerHeaders(), redirect: "manual" });
      if (res.ok) return;
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`workspace not ready within ${READY_TIMEOUT / 1000}s`);
}

/** 上传文件到沙箱 */
async function uploadFile(spaceKey, buffer, remotePath) {
  const seg = remotePath.replace(/^\//, "");
  const url = `${wsUrl(PORT_API, spaceKey)}/filesystem/${seg}`;
  const res = await fetch(url, {
    method: "POST",
    headers: bearerHeaders({ "Content-Type": "application/octet-stream" }),
    body: buffer,
    redirect: "manual",
  });
  if (res.status === 302) throw new Error("upload blocked by proxy (302)");
  if (!res.ok) throw new Error(`upload failed (${res.status})`);
}

/** 在沙箱内执行命令 */
async function exec(spaceKey, command, timeoutMs = 30_000) {
  const url = `${wsUrl(PORT_API, spaceKey)}/console`;
  const res = await fetch(url, {
    method: "POST",
    headers: bearerHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ command, shell: "/bin/bash", timeoutMs }),
    redirect: "manual",
  });
  if (res.status === 302) throw new Error("exec blocked by proxy (302)");
  if (!res.ok) throw new Error(`exec failed (${res.status})`);
  const data = await res.json();
  if (data.exitCode !== 0) {
    throw new Error(`exit ${data.exitCode}: ${(data.stderr || data.stdout || "").substring(0, 300)}`);
  }
  return data;
}

/** 写入 .cloudstudio 自启动配置（沙箱重启时触发） */
async function setAutoStart(spaceKey, config) {
  const url = `${wsUrl(PORT_PTY, spaceKey)}/replaceCloudStudioConfig`;
  const res = await fetch(url, {
    method: "POST",
    headers: bearerHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error(`replaceCloudStudioConfig failed (${res.status})`);
  const data = await res.json();
  if (data.status === "error") throw new Error(data.message);
}

// ---------------------------------------------------------------------------
// Deploy orchestration
// ---------------------------------------------------------------------------

function pack(localDir) {
  const absDir = path.resolve(localDir);
  if (!fs.existsSync(absDir)) throw new Error(`directory not found: ${absDir}`);
  const tmp = path.join(require("os").tmpdir(), ARCHIVE_NAME);
  execSync(`COPYFILE_DISABLE=1 tar -czf "${tmp}" -C "${absDir}" .`, { stdio: "pipe" });
  return tmp;
}

/**
 * 部署静态站点到指定工作空间。
 *
 * 流程：
 *  1. 获取 session token + 等待沙箱就绪
 *  2. 上传通用静态文件服务 _serve.js
 *  3. 打包 → 上传 → 解压部署文件
 *  4. 写入自启动配置（沙箱重启自动恢复）
 *  5. 通过 console 主动启动应用
 *  6. 获取分享链接 + 验证可访问
 *
 * @returns {{ shareLink: string|null, dataPlaneUrl: string }}
 */
async function deploy(spaceKey, localDir, appPort) {
  await createSession(spaceKey);
  await waitForReady(spaceKey);

  // 注入 _serve.js
  await uploadFile(spaceKey, Buffer.from(SERVE_JS, "utf-8"), `${REMOTE_ROOT}/_serve.js`);

  // 上传 + 解压部署文件
  const archive = pack(localDir);
  try {
    await uploadFile(spaceKey, fs.readFileSync(archive), `${REMOTE_ROOT}/${ARCHIVE_NAME}`);
  } finally {
    fs.unlinkSync(archive);
  }
  await exec(spaceKey, `cd ${REMOTE_ROOT} && tar -xzf ${ARCHIVE_NAME} && rm -f ${ARCHIVE_NAME}`);

  // 自启动配置 + 主动启动
  const cmd = `PORT=${appPort} node ${REMOTE_ROOT}/_serve.js`;
  await setAutoStart(spaceKey, { app: [{ name: "app", port: appPort, cmd }] });
  await exec(spaceKey, `nohup bash -c '${cmd}' > /tmp/app.log 2>&1 &\nsleep 2 && cat /tmp/app.log`);

  // 获取分享链接 + 验证
  const shareLink = await getShareLink(spaceKey, appPort);
  const dataPlaneUrl = `${wsUrl(appPort, spaceKey)}/`;
  let verified = false;
  try {
    const r = await fetch(dataPlaneUrl, { redirect: "manual" });
    verified = r.ok;
  } catch { /* ignore */ }

  return { shareLink, dataPlaneUrl, verified };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  if (!API_KEY) die("CS_API_KEY is required. Set it via environment variable.");

  const [cmd, ...args] = process.argv.slice(2);

  switch (cmd) {
    case "create": {
      const ws = await createWorkspace();
      console.log(JSON.stringify({ spaceKey: ws.spaceKey, connections: ws.connections }, null, 2));
      break;
    }

    case "destroy": {
      const [sk] = args;
      if (!sk) die("Usage: deploy.js destroy <spaceKey>");
      await destroyWorkspace(sk);
      console.log(`Destroyed: ${sk}`);
      break;
    }

    case "deploy": {
      const [dir, portStr] = args;
      if (!dir) die("Usage: deploy.js deploy <directory> [port]");
      const port = parseInt(portStr, 10) || DEFAULT_PORT;

      const ws = await createWorkspace();
      console.log(`Workspace: ${ws.spaceKey}`);

      const result = await deploy(ws.spaceKey, dir, port);
      console.log(JSON.stringify({
        spaceKey: ws.spaceKey,
        webIDE: ws.connections?.webIDE,
        shareLink: result.shareLink,
        dataPlane: result.dataPlaneUrl,
        verified: result.verified,
      }, null, 2));
      break;
    }

    case "deploy-to": {
      const [sk, dir, portStr] = args;
      if (!sk || !dir) die("Usage: deploy.js deploy-to <spaceKey> <directory> [port]");
      const port = parseInt(portStr, 10) || DEFAULT_PORT;

      const result = await deploy(sk, dir, port);
      console.log(JSON.stringify({
        spaceKey: sk,
        shareLink: result.shareLink,
        dataPlane: result.dataPlaneUrl,
        verified: result.verified,
      }, null, 2));
      break;
    }

    default:
      console.log(`CloudStudio Workspace Deploy CLI

Usage:
  deploy.js create                          Create a workspace
  deploy.js destroy <spaceKey>              Destroy a workspace
  deploy.js deploy <dir> [port]             Create workspace + deploy
  deploy.js deploy-to <spaceKey> <dir> [port]  Deploy to existing workspace

Environment:
  CS_API_KEY      (required) PaaS API key
  CS_ENV          "internal" | "external" (default: "external")
  CS_PAAS_API     Override PaaS API URL
  CS_WS_DOMAIN    Override data-plane domain suffix

Port defaults to 3000. Embeds a Node.js static server with SPA fallback.`);
  }
}

main().catch((err) => die(err.message));
