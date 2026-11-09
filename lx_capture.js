// lx_capture.js —— WPS 灵犀登录 Cookie 一键刷新（登录一次，自动推送服务器）
//
// 背景：灵犀签到用的是浏览器 wps_sid 会话（约一个月一轮），服务器无法自行续期。
// 用法：双击 refresh_lingxi.bat → 弹出的 Edge 里登录 lingxi.wps.cn → 脚本自动
//       校验 Cookie 确实可用 → 调用 push_lx_cookie.py 推到 112（现读盘，无需重启）。
//
// 与 trae_capture.js 同款：用本机系统 Edge + 独立 Profile，不碰日常浏览器登录态。
const { chromium } = require('./runtime_env').loadPlaywright();
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const PROFILE = path.join(__dirname, 'lx_profile');
const COOKIE_TXT = path.join(__dirname, 'lx_cookie.txt');
const COOKIE_JSON = path.join(__dirname, 'lx_cookie.json');
const TARGET = 'https://lingxi.wps.cn/';
// 优先用装有 paramiko 的 D:/Dev/python.exe；bat 里也显式设了 PYTHON_PATH 双保险
const LOCAL_PY = 'D:/Dev/python.exe';
const PY = process.env.PYTHON_PATH ||
  (fs.existsSync(LOCAL_PY) ? LOCAL_PY : require('./runtime_env').resolvePython());
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const MAX_MS = 6 * 60 * 1000;
let pushed = false;

function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

async function exportCookies(ctx) {
  const all = await ctx.cookies();
  const wps = all.filter((c) => (c.domain || '').replace(/^\./, '').endsWith('wps.cn'));
  const map = new Map();
  for (const c of wps) map.set(c.name, c.value);
  if (!map.has('wps_sid')) return null;
  const header = [...map].map(([k, v]) => k + '=' + v).join('; ');
  fs.writeFileSync(COOKIE_JSON, JSON.stringify(wps, null, 2));
  fs.writeFileSync(COOKIE_TXT, header + '\n');
  return header;
}

async function valid(header) {
  try {
    const r = await fetch('https://lingxi.wps.cn/api/public/v1/tasks?date=' + today(), {
      headers: {
        Cookie: header,
        Referer: 'https://lingxi.wps.cn/',
        'User-Agent': UA,
        Accept: 'application/json, text/plain, */*',
      },
      signal: AbortSignal.timeout(15000),
    });
    const t = await r.text();
    console.log('[check] HTTP ' + r.status + ' ' + t.slice(0, 120));
    return r.status === 200 && !/UserUnauthorized|40101/.test(t);
  } catch (e) {
    console.log('[check] network error: ' + e.message);
    return false;
  }
}

function push(ctx) {
  if (pushed) return;
  pushed = true;
  console.log('[push] cookie OK, uploading to server ...');
  execFile(PY, ['push_lx_cookie.py'], { cwd: __dirname }, async (err, stdout, stderr) => {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    if (err) {
      console.log('[push] FAILED: ' + err.message);
      console.log('[push] retry manually: python push_lx_cookie.py');
    } else {
      console.log('[push] OK. New cookie is live, no restart needed.');
    }
    try { await ctx.close(); } catch (e) {}
    setTimeout(() => process.exit(err ? 1 : 0), 1200);
  });
}

(async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: 'msedge',
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ['--no-first-run', '--no-default-browser-check', '--disable-blink-features=AutomationControlled'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  console.log('READY: Edge opened. Please log in to lingxi.wps.cn (scan QR / account).');
  console.log('       This window is an isolated profile; it will close automatically after success.');
  try {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (e) {
    console.log('[nav] ' + e.message);
  }
  const deadline = Date.now() + MAX_MS;
  const tick = async () => {
    try {
      const header = await exportCookies(ctx);
      if (header && await valid(header)) {
        clearInterval(timer);
        push(ctx);
        return;
      }
    } catch (e) {
      console.log('[tick] ' + e.message);
    }
    if (Date.now() > deadline) {
      clearInterval(timer);
      console.log('TIMEOUT: not logged in within 6 minutes. Run refresh_lingxi.bat again.');
      try { await ctx.close(); } catch (e) {}
      setTimeout(() => process.exit(2), 1000);
    }
  };
  const timer = setInterval(tick, 5000);
  await tick();
})().catch((e) => { console.log('FATAL', e); process.exit(1); });
