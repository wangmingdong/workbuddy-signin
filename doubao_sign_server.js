// doubao_sign_server.js —— 豆包「浏览器实时签名」常驻服务（运行在 112 服务器，Linux）
//
// 方案二：把 a_bogus 签名代理从本机搬到服务器，使其能独立代签豆包，
// 本机电脑关机也能每日自动签。
//
// 原理与本地版一致：豆包写接口强制 a_bogus 动态签名，必须真浏览器在页面内 fetch 才带签。
// 此处用服务器上的 headless Chromium（Playwright 自带）打开豆包页面，复用【从本机同步来的
// cookie】(doubao_cookies_server.json) 登录态，在页面内 fetch 即自动加 a_bogus。
//
// cookie 来源：本机 doubao_sign.js 周期性把登录态推送到 112 的
//   POST /api/doubao/upload-cookie
// 服务器 web_server 收到后写入 doubao_cookies_server.json，本服务每次签名时读取最新 cookie。
//
// 接口（监听 127.0.0.1:8791，与本地版同端口，便于 web_server 用 DOUBAO_SIGNER_URL 直连）：
//   GET  /health          健康检查
//   POST /sign            执行一次豆包签到
//   GET  /tasks           读取任务列表（含状态），用于弹窗
//   POST /tasks           对可领任务逐个领积分
//   GET  /cookie-status   返回当前 cookie 文件是否存在/更新时间
//
// 启动： node doubao_sign_server.js   （建议由 systemd wb-doubao-sign.service 托管）

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT          = 8791;
const ORIGIN        = 'https://bjzjsf.asia';
const SCENE         = process.env.DOUBAO_SCENE || 'pc_incentive_task_mvp_v3';
const QP = 'version_code=20800&language=zh&device_platform=pc&doubao_device_platform=pc&aid=497858&real_aid=497858&pkg_type=release_version&samantha_web=0&web_platform=pc&runtime=pc';
const COOKIE_FILE   = process.env.DOUBAO_SERVER_COOKIE_FILE
  || path.join(__dirname, 'doubao_cookies_server.json');
const LOG           = process.env.DOUBAO_SIGN_LOG
  || path.join(__dirname, 'doubao_sign_server.log');
const USER_DATA     = process.env.DOUBAO_SERVER_USERDATA
  || path.join(__dirname, 'doubao_server_profile');

function dlog(s) {
  try { fs.appendFileSync(LOG, '[' + new Date().toISOString() + '] ' + s + '\n'); } catch (e) {}
}

// 浏览器单例（懒启动 + 串行锁）
let _browserPromise = null;
let _signing = false;

async function getBrowser() {
  if (_browserPromise) {
    try {
      const b = await _browserPromise;
      if (b.isConnected()) return b;
      dlog('[browser] 浏览器已断开，重建');
    } catch (e) {
      dlog('[browser] 复用的浏览器已失效，重建: ' + String(e).slice(0, 160));
    }
    try { const old = await _browserPromise; await old.close(); } catch (_) {}
    _browserPromise = null;
  }
  const p = chromium.launch({
    headless: true,
    // 服务器通常以 root 运行，必须关沙箱；容器里还要用 /dev/shm 的替代。
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-blink-features=AutomationControlled',
    ],
  });
  _browserPromise = p;
  // 【关键】启动失败必须清空缓存，否则一次瞬态失败会把服务永久锁死（旧版即此 bug：
  // 无头 chromium 崩溃/被 OOM 杀掉后，_browserPromise 永远是 rejected promise，之后每次都直接抛
  // "Target page, context or browser has been closed"，而 systemd 只看到进程还活着 → 永不重启）。
  p.catch(() => { if (_browserPromise === p) _browserPromise = null; });
  return p;
}

function loadServerCookies() {
  try {
    const raw = fs.readFileSync(COOKIE_FILE, 'utf-8');
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr;
  } catch (e) {}
  return null;
}

async function applyCookies(ctx) {
  const cookies = loadServerCookies();
  if (cookies && cookies.length) {
    await ctx.addCookies(cookies).catch((e) => dlog('[cookie] addCookies 失败: ' + e));
    dlog('[cookie] 已注入 ' + cookies.length + ' 条服务器 cookie');
    return true;
  }
  dlog('[cookie] 未找到服务器 cookie 文件: ' + COOKIE_FILE);
  return false;
}

// 通用：在一个新页面里打开豆包并等待 a_bogus 包装就绪，返回 page。
async function openDoubaoPage() {
  const browser = await getBrowser();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await applyCookies(ctx);
  const page = await ctx.newPage();
  await page.goto('https://www.doubao.com/pc/agent-explore', { waitUntil: 'domcontentloaded', timeout: 60000 });
  for (let i = 0; i < 40; i++) {
    if (await page.evaluate(() => typeof window.byted_acrawler !== 'undefined').catch(() => false)) break;
    await page.waitForTimeout(1000);
  }
  await page.waitForTimeout(2500);
  return { ctx, page };
}

async function doSign() {
  if (_signing) return { ok: false, error: '已有签到任务进行中' };
  _signing = true;
  let ctx;
  try {
    const o = await openDoubaoPage();
    ctx = o.ctx;
    const result = await o.page.evaluate(async (arg) => {
      const { SCENE, QP } = arg;
      const base = 'https://www.doubao.com';
      const headers = { 'Content-Type': 'application/json', 'Referer': base + '/pc/agent-explore', 'Origin': base };
      const post = async (p, body) => {
        const r = await fetch(base + p + '?' + QP, { method: 'POST', headers, body: JSON.stringify(body) });
        const t = await r.text();
        try { return JSON.parse(t); } catch (e) { return { __raw: t.slice(0, 300) }; }
      };
      const out = {};
      out.get = await post('/alice/ug/campaign/landing/get', { scene: SCENE });
      out.checkin = await post('/alice/ug/campaign/landing/checkin', { scene: SCENE, biz_params: {} });
      return out;
    }, { SCENE, QP });
    await o.page.close();
    // 只有签到接口真返回 code=0 才标记「今日已签」，避免失败被误记导致保活不再重试
    if (result && result.checkin && result.checkin.code === 0) markSignedToday();
    return { ok: true, result };
  } catch (e) {
    return { ok: false, error: String(e) };
  } finally {
    if (ctx) await ctx.close().catch(() => {});
    _signing = false;
  }
}

async function doTasks() {
  if (_signing) return { ok: false, error: '已有签到任务进行中' };
  _signing = true;
  let ctx;
  try {
    const o = await openDoubaoPage();
    ctx = o.ctx;
    const result = await o.page.evaluate(async (arg) => {
      const { SCENE, QP } = arg;
      const base = 'https://www.doubao.com';
      const headers = { 'Content-Type': 'application/json', 'Referer': base + '/pc/agent-explore', 'Origin': base };
      const post = async (p, body) => {
        const r = await fetch(base + p + '?' + QP, { method: 'POST', headers, body: JSON.stringify(body) });
        const t = await r.text();
        try { return JSON.parse(t); } catch (e) { return { __raw: t.slice(0, 300) }; }
      };
      let detail = await post('/alice/ug/campaign/v3/detail/', { campaign_group_code: SCENE });
      let tasks = (detail.data && detail.data.tasks) || [];
      if (!tasks.length) {
        const lg = await post('/alice/ug/campaign/landing/get', { scene: SCENE });
        tasks = (lg.data && (lg.data.tasks || lg.data.task_list || [])) || [];
      }
      const out = { detail_code: detail.code, task_count: tasks.length, tasks: [], claimed: 0, failed: 0, skipped: 0 };
      for (const t of tasks) {
        const isSignin = (t.campaign_code === 'daily_signin' || t.task_kind === 'daily_signin');
        if (isSignin) continue;
        const rw = (Array.isArray(t.reward_summaries) && t.reward_summaries.length)
          ? t.reward_summaries.reduce((s, x) => s + (x.reward_amount || 0), 0)
          : (typeof t.reward_amount === 'number' ? t.reward_amount : 0);
        const claimed = !!(t.claimed || t.is_claimed || t.reward_status === 3
          || [3, 'claimed', 'received', 'done', 'finished'].includes(t.task_status));
        const done = (t.task_status === 3 || t.task_status === 2
          || ['claimed', 'done', 'completed', 'can_claim'].includes(String(t.task_status).toLowerCase()));
        if (claimed) { out.skipped++; out.tasks.push({ title: t.title || t.subtitle || t.campaign_code, status: 'already_claimed' }); continue; }
        if (!done) { out.skipped++; out.tasks.push({ title: t.title || t.subtitle || t.campaign_code, status: 'need_complete', task_status: t.task_status }); continue; }
        if (!rw || rw <= 0) { out.skipped++; out.tasks.push({ title: t.title || t.subtitle || t.campaign_code, status: 'no_reward' }); continue; }
        const campaign_code = t.campaign_code;
        const campaign_group_code = t.campaign_group_code ?? SCENE;
        if (!campaign_code) { out.skipped++; out.tasks.push({ title: t.title || t.subtitle, status: 'skip_no_code' }); continue; }
        const body = { campaign_code, campaign_group_code, AgwCommonParam: {} };
        const r = await post('/alice/ug/campaign/item/reward/claim/', body);
        const ok = r && r.code === 0;
        if (ok) out.claimed++; else out.failed++;
        out.tasks.push({ title: t.title || t.subtitle || campaign_code, status: ok ? 'claimed' : ('fail:' + (r && r.code)), code: r && r.code, msg: (r && (r.msg || r.message)) || '' });
      }
      return out;
    }, { SCENE, QP });
    await o.page.close();
    return { ok: true, result };
  } catch (e) {
    return { ok: false, error: String(e) };
  } finally {
    if (ctx) await ctx.close().catch(() => {});
    _signing = false;
  }
}

async function getTaskList() {
  if (_signing) return { ok: false, error: '浏览器忙，请稍候' };
  _signing = true;
  let ctx;
  try {
    const o = await openDoubaoPage();
    ctx = o.ctx;
    const result = await o.page.evaluate(async (arg) => {
      const { SCENE, QP } = arg;
      const base = 'https://www.doubao.com';
      const headers = { 'Content-Type': 'application/json', 'Referer': base + '/pc/agent-explore', 'Origin': base };
      const post = async (p, body) => {
        const r = await fetch(base + p + '?' + QP, { method: 'POST', headers, body: JSON.stringify(body) });
        const t = await r.text();
        try { return JSON.parse(t); } catch (e) { return { __raw: t.slice(0, 300) }; }
      };
      let detail = await post('/alice/ug/campaign/v3/detail/', { campaign_group_code: SCENE });
      let tasks = (detail.data && detail.data.tasks) || [];
      if (!tasks.length) {
        const lg = await post('/alice/ug/campaign/landing/get', { scene: SCENE });
        tasks = (lg.data && (lg.data.tasks || lg.data.task_list || [])) || [];
      }
      const list = tasks.map((t) => {
        const isSignin = (t.campaign_code === 'daily_signin' || t.task_kind === 'daily_signin');
        const rw = (Array.isArray(t.reward_summaries) && t.reward_summaries.length)
          ? t.reward_summaries.reduce((s, x) => s + (x.reward_amount || 0), 0)
          : (typeof t.reward_amount === 'number' ? t.reward_amount : 0);
        const claimed = !!(t.claimed || t.is_claimed || t.reward_status === 3
          || [3, 'claimed', 'received', 'done', 'finished'].includes(t.task_status));
        const done = (t.task_status === 3 || t.task_status === 2
          || ['claimed', 'done', 'completed', 'can_claim'].includes(String(t.task_status).toLowerCase()));
        return {
          title: t.title || t.subtitle || t.campaign_code,
          status_raw: t.task_status,
          claimed,
          reward: rw,
          claimable: (!isSignin && !claimed && done && rw > 0),
          campaign_code: t.campaign_code,
          campaign_group_code: t.campaign_group_code ?? SCENE,
        };
      });
      return { detail_code: detail.code, list };
    }, { SCENE, QP });
    await o.page.close();
    return { ok: true, result };
  } catch (e) {
    return { ok: false, error: String(e) };
  } finally {
    if (ctx) await ctx.close().catch(() => {});
    _signing = false;
  }
}

// ---- HTTP 服务 ----
const server = http.createServer(async (req, res) => {
  const reqOrigin = req.headers.origin || ORIGIN;
  res.setHeader('Access-Control-Allow-Origin', reqOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url.split('?')[0];
  if (url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'doubao-sign-server', ts: Date.now(), hasCookie: !!loadServerCookies() }));
    return;
  }
  if (url === '/cookie-status') {
    try {
      const exists = fs.existsSync(COOKIE_FILE);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, exists, mtime: exists ? fs.statSync(COOKIE_FILE).mtimeMs : null }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: String(e) }));
    }
    return;
  }
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ service: 'doubao-sign-server', endpoints: ['GET /health', 'POST /sign', 'GET /tasks', 'POST /tasks', 'GET /cookie-status'] }));
    return;
  }
  if (url === '/tasks' && req.method === 'GET') {
    const r = await getTaskList();
    res.writeHead(r.ok ? 200 : 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(r));
    return;
  }
  if (url === '/sign' && req.method === 'POST') {
    const r = await doSign();
    res.writeHead(r.ok ? 200 : 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(r));
    return;
  }
  if (url === '/tasks' && req.method === 'POST') {
    const r = await doTasks();
    res.writeHead(r.ok ? 200 : 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(r));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[doubao-sign-server] 服务已启动: http://127.0.0.1:${PORT}`);
  dlog('[doubao-sign-server] 启动, cookie 文件=' + COOKIE_FILE);
});

// ---- 每日定时：自动签到 + 自动领积分（服务器独立跑，不依赖本机电脑）----
function scheduleAt(hh, mm, fn, label) {
  const now = new Date();
  let next = new Date(now);
  next.setHours(hh, mm, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const delay = next - now;
  setTimeout(async () => {
    try {
      console.log('[doubao-sign-server] 定时任务触发: ' + label);
      const r = await fn();
      console.log('[doubao-sign-server] ' + label + ' 结果:', JSON.stringify(r && r.result ? r.result : r).slice(0, 400));
    } catch (e) {
      console.error('[doubao-sign-server] ' + label + ' 出错:', e);
    }
    scheduleAt(hh, mm, fn, label);
  }, delay);
  console.log(`[doubao-sign-server] 下次${label}: ${next.toLocaleString()}`);
}
scheduleAt(8, 25, doSign, '自动签到');
scheduleAt(8, 30, doTasks, '自动领积分(晨)');
scheduleAt(20, 0, doTasks, '自动领积分(晚)');

// ---- 防漏签：启动补签 + 每 20 分钟保活（覆盖进程重启/定时错过）----
const SIGN_STATE = path.join(__dirname, 'doubao_signed_today_server.json');
function signedTodayFlag() {
  try {
    const d = JSON.parse(fs.readFileSync(SIGN_STATE, 'utf-8'));
    return d.date === new Date().toISOString().slice(0, 10);
  } catch (e) { return false; }
}
function markSignedToday() {
  try { fs.writeFileSync(SIGN_STATE, JSON.stringify({ date: new Date().toISOString().slice(0, 10), ts: Date.now() })); } catch (e) {}
}
async function ensureSignedToday() {
  if (signedTodayFlag()) { dlog('[doubao-sign-server] 今日已签到，保活跳过'); return; }
  dlog('[doubao-sign-server] 保活补签：今日尚未签到，尝试...');
  try {
    const r = await doSign();
    // 以签到接口真实返回为准（doSign 内部已标记，这里再兜底一次），失败则下次保活继续重试
    const chk = r && r.result && r.result.checkin;
    if (r && r.ok && chk && chk.code === 0) markSignedToday();
    dlog('[doubao-sign-server] 保活补签结果: ' + JSON.stringify(r && r.result ? r.result : r).slice(0, 200));
  } catch (e) { dlog('[doubao-sign-server] 保活补签出错: ' + e); }
}
setTimeout(() => ensureSignedToday(), 15000);
setInterval(() => ensureSignedToday(), 20 * 60 * 1000);

// ---- 浏览器健康看门狗：定期探活，发现无头 chromium 已死就清缓存，下一次调用自动重建 ----
// 覆盖「chromium 崩溃/被 OOM 杀掉、但 node 进程还活着」——旧版正是这种场景下永久瘫痪。
setInterval(async () => {
  if (_signing || !_browserPromise) return;
  try {
    const b = await _browserPromise;
    if (!b.isConnected()) {
      dlog('[watchdog] 浏览器已断开，重置缓存待重建');
      _browserPromise = null;
    }
  } catch (e) {
    dlog('[watchdog] 浏览器探活失败，重置缓存待重建: ' + String(e).slice(0, 140));
    _browserPromise = null;
  }
}, 3 * 60 * 1000);

process.on('SIGINT', async () => {
  console.log('[doubao-sign-server] 正在关闭 ...');
  if (_browserPromise) { try { (await _browserPromise).close(); } catch (e) {} }
  process.exit(0);
});
