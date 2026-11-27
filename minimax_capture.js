// minimax_capture.js —— MiniMax Code 网页 token 一键采集工具
//
// 背景：MiniMax 每日签到依赖 agent.minimax.cn 网页登录态（localStorage._token，
// JWT，约 40 天有效）。过去只能 F12 手动复制，本脚本用 Playwright 驱动本机
// 系统 Edge（独立 profile），登录网页后自动读 localStorage 的 JWT 写盘到
// mm_web_token.json（web_server.py 直接读它签到）。
//
// 用法：
//   网页「一键更新」带 --once：采到比现有更新的 JWT 就写盘并退出（黑窗自动关）
//   手动双击 bat 不带参数：常驻守护，每 8 秒检查一次
//
// 关键判据：JWT 的 exp 必须 > 当前 mm_web_token.json 里的 exp（防旧会话残留
// 被误判成功——豆包/华为踩过这个坑）。profile 里旧 token 没刷新就不写盘。

const { chromium } = require('./runtime_env').loadPlaywright();
const fs = require('fs');
const path = require('path');

const PROFILE = path.join(__dirname, 'minimax_profile');
const TOKEN_FILE = path.join(__dirname, 'mm_web_token.json');
const TARGET = 'https://agent.minimax.cn/';
const ONCE = process.argv.includes('--once');

// 解析 JWT payload（不验签，只读 exp）
function jwtExp(tok) {
  try {
    const seg = String(tok).split('.')[1];
    if (!seg) return 0;
    const pad = seg + '='.repeat((4 - (seg.length % 4)) % 4);
    const p = JSON.parse(Buffer.from(pad, 'base64url').toString('utf8'));
    return typeof p.exp === 'number' ? p.exp : 0;
  } catch (e) { return 0; }
}

// 读现有 token 的 exp 作为「新度」基线
function currentExp() {
  try {
    const d = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
    return jwtExp(d.access_token || '');
  } catch (e) { return 0; }
}

async function exportToken(page) {
  try {
    // 在 agent.minimax.cn 域下读 localStorage 全部键值，挑 JWT
    const tokens = await page.evaluate(() => {
      const out = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        let v = '';
        try { v = localStorage.getItem(k) || ''; } catch (e) { continue; }
        if (/^eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/.test(v)) {
          out.push({ key: k, value: v });
        }
      }
      return out;
    });
    if (!tokens.length) {
      console.log('[token] ⏳ 尚未在 localStorage 找到 JWT，等待登录…');
      return false;
    }
    const base = currentExp();
    const now = Math.floor(Date.now() / 1000);
    // 优先 _token / access_token，其次 exp 最大且未过期的
    let best = null;
    for (const t of tokens) {
      const exp = jwtExp(t.value);
      if (exp <= now) continue;               // 过期的不算
      if (exp <= base) continue;              // 不比现有的新 → 跳过（防旧会话误判）
      if (!best || exp > best.exp) best = { value: t.value, exp: exp, key: t.key };
    }
    if (!best) {
      console.log('[token] ⏳ 找到 JWT 但未比现有更新（base exp=' + base + '），等待重新登录…');
      return false;
    }
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({
      access_token: best.value,
      web_auth: true,
      updated_at: new Date().toISOString(),
    }, null, 2));
    console.log('[token] ✅ 已写入新 token（key=' + best.key +
      ', exp=' + new Date(best.exp * 1000).toISOString() + '）');
    return true;
  } catch (e) {
    console.log('[token] 导出出错:', e.message);
    return false;
  }
}

(async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: 'msedge',
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ['--no-first-run', '--no-default-browser-check', '--disable-blink-features=AutomationControlled'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 })
    .then(() => console.log('NAVIGATED', TARGET))
    .catch((e) => console.log('GOTO_NOTE', e.message));

  console.log('READY: 已打开 Edge，请登录 agent.minimax.cn（网页版）。');
  console.log('       登录成功后自动读取 token 写入 mm_web_token.json。');

  // --once：拿到比现有更新的 token 就退出
  if (ONCE) {
    for (let i = 0; i < 45; i++) {   // 最多等 6 分钟
      if (await exportToken(page)) {
        try { await ctx.close(); } catch (e) {}
        setTimeout(() => process.exit(0), 800);
      }
      await new Promise((r) => setTimeout(r, 8000));
    }
    console.log('[once] 超时未拿到新 token，退出。');
    try { await ctx.close(); } catch (e) {}
    process.exit(2);
  }

  // 常驻模式
  setInterval(() => exportToken(page), 8000);
  process.on('SIGINT', async () => { await exportToken(page); process.exit(0); });
  process.on('SIGTERM', async () => { await exportToken(page); process.exit(0); });
  await new Promise(() => {});
})().catch((e) => { console.log('FATAL', e); process.exit(1); });
