// qoder_login.js —— Qoder 网页会话「一键登录」采集器（exe 桌面版 / 本机版通用）
//
// 用法：签到中心网页点 Qoder 卡「🔑 更新凭据」→「🌐 打开浏览器登录 · 自动获取」，
//       后端会用内嵌 Node 拉起本脚本。独立 Edge 窗口登录 qoder.com 后，脚本自动
//       校验会话确实有效，写出 qoder_cookie.txt 供服务端读取，然后自动退出。
//
// 与老的 qoder_capture.js 区别：老脚本是常驻 + 推服务器（本机 python 部署用），
// 本脚本是一次性采到即退、只写本地凭据文件（小白 / exe 桌面版用），不依赖任何 python。
const { chromium } = require('./runtime_env').loadPlaywright();
const fs = require('fs');
const path = require('path');

const PROFILE    = path.join(__dirname, 'qoder_login_profile');
const COOKIE_TXT = path.join(__dirname, 'qoder_cookie.txt');
const TARGET     = 'https://qoder.com/account/usage?client=qoder&sourceType=IDE';
const API        = 'https://qoder.com/api/v2/me/usages/big_model_credits';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const MAX_MS = 6 * 60 * 1000;

function qoderCookies(all) {
  const map = new Map();
  for (const c of all) {
    const d = (c.domain || '').replace(/^\./, '');
    if (d === 'qoder.com' || d.endsWith('.qoder.com')) map.set(c.name, c.value);
  }
  return map;
}

function buildHeader(map) {
  return [...map].map(([k, v]) => k + '=' + v).join('; ');
}

function saveCookie(all) {
  const rows = all.filter((c) => {
    const d = (c.domain || '').replace(/^\./, '');
    return d === 'qoder.com' || d.endsWith('.qoder.com');
  });
  const header = rows.map((c) => c.name + '=' + c.value).join('; ');
  if (fs.existsSync(COOKIE_TXT)) {
    const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    try { fs.copyFileSync(COOKIE_TXT, COOKIE_TXT + '.bak_' + ts); } catch (e) {}
  }
  fs.writeFileSync(COOKIE_TXT, header + '\n');
  return rows.length;
}

async function getCsrf(page, html) {
  try {
    const v = await page.evaluate(() => (typeof window !== 'undefined' ? window.csrfToken || '' : ''));
    if (v) return v;
  } catch (e) {}
  const m = (html || '').match(/window\.csrfToken\s*=\s*'([^']+)'/);
  return m ? m[1] : '';
}

// 用真实接口校验：HTTP 200 且返回 JSON 才算登录成功，避免把未登录的空 cookie 写盘
async function check(page, header, csrf) {
  const r = await fetch(API, {
    headers: {
      Cookie: header,
      'X-CSRF-TOKEN': csrf,
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      Origin: 'https://qoder.com',
      Referer: 'https://qoder.com/account/usage',
      'User-Agent': UA,
    },
    signal: AbortSignal.timeout(20000),
  });
  const text = await r.text();
  let data = null;
  try { data = JSON.parse(text); } catch (e) {}
  console.log('[check] HTTP ' + r.status + ' json=' + !!data);
  return r.status === 200 && !!data;
}

(async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: 'msedge',
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ['--no-first-run', '--no-default-browser-check', '--disable-blink-features=AutomationControlled'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  console.log('READY: 已弹出 Edge 窗口，请在里面登录 qoder.com（扫码/账号均可）。');
  console.log('       登录成功后本窗口会自动关闭，凭据自动写回，无需手动复制。');
  try {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (e) {
    console.log('[nav] ' + e.message);
  }
  const deadline = Date.now() + MAX_MS;
  let done = false;
  const tick = async () => {
    if (done) return;
    try {
      const all = await ctx.cookies();
      const map = qoderCookies(all);
      if (map.size > 0) {
        let html = '';
        try { html = await page.content(); } catch (e) {}
        const csrf = await getCsrf(page, html);
        const header = buildHeader(map);
        if (await check(page, header, csrf)) {
          done = true;
          clearInterval(timer);
          const n = saveCookie(all);
          console.log('OK: 登录态有效，已写入 qoder_cookie.txt（' + n + ' 个 cookie），窗口即将关闭。');
          setTimeout(async () => { try { await ctx.close(); } catch (e) {} process.exit(0); }, 1500);
          return;
        }
      }
    } catch (e) {
      console.log('[tick] ' + e.message);
    }
    if (Date.now() > deadline) {
      done = true;
      clearInterval(timer);
      console.log('TIMEOUT: 6 分钟内未检测到有效登录。请重新点一键登录并在 Edge 窗口完成登录。');
      try { await ctx.close(); } catch (e) {}
      setTimeout(() => process.exit(2), 1000);
    }
  };
  const timer = setInterval(tick, 5000);
  await tick();
})().catch((e) => { console.log('FATAL', e); process.exit(1); });
