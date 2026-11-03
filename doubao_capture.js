// doubao_capture.js —— 豆包(Doubao)登录 Cookie 一键导出工具
//
// 背景：豆包的自动签到依赖浏览器登录态（sessionid，约 30 天一轮过期）。
// 签到中心在另一台服务器(112)，页面无法直接读取您浏览器里 doubao.com 的 cookie
// （浏览器同源策略 + cookie 作用域 + HttpOnly 三重限制）。本脚本用 Playwright
// 驱动你本机的【系统 Edge】，打开一个独立 Profile 的窗口让你登录 www.doubao.com，
// 然后持续把 doubao.com 域下的 cookie 导出为 doubao_cookie.txt
// （web_server.py 直接拿它当 Cookie 头用；deploy_ui.py 已自动推送该文件）。
//
// 用法：
//   1) 在本目录执行：  node doubao_capture.js
//   2) 自动弹出 Edge 窗口，去登录豆包（扫码/账号都行）；
//      登录成功后脚本每 8 秒自动把 cookie 写盘（doubao_cookie.txt）。
//   3) 想立刻部署到服务器：在本目录再开一个终端执行
//         python deploy_ui.py
//      或：touch doubao_deploy.trigger （脚本会抓最新 cookie 并自动跑 deploy_ui.py）
//   4) 用完 Ctrl+C 退出即可。
//
// 注意：这是独立 Profile，跟你自己日常用的 Edge 登录态不共享，
//       所以第一次要在弹出的窗口里登录一次；之后 cookie 过期再来一次。

const { chromium } = require('./runtime_env').loadPlaywright();
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const PROFILE    = path.join(__dirname, 'doubao_profile');
const COOKIE_TXT = path.join(__dirname, 'doubao_cookie.txt');
const COOKIE_JSON= path.join(__dirname, 'doubao_cookie.json');
const TRIGGER    = path.join(__dirname, 'doubao_deploy.trigger');
const PY         = require('./runtime_env').resolvePython();
const TARGET     = 'https://www.doubao.com/';
const CWD        = __dirname;

// 只收 doubao.com 相关域（含 .doubao.com / www.doubao.com / doubao.com）
const isDoubao = (d) => (d || '').endsWith('doubao.com') || (d || '').includes('.doubao.com');

function exportCookies(ctx) {
  return ctx.cookies().then(async (all) => {
    const db = all.filter((c) => isDoubao(c.domain));
    const header = db.map((c) => `${c.name}=${c.value}`).join('; ');
    fs.writeFileSync(COOKIE_JSON, JSON.stringify(db, null, 2));
    fs.writeFileSync(COOKIE_TXT, header);
    console.log(`[cookies] doubao cookie 数量=${db.length}, 头串长度=${header.length}`);
    const names = db.map((c) => c.name).join(',');
    if (names) console.log('          字段: ' + names);
    // sessionid 是签到必需；提示是否到手
    const hasSid = db.some((c) => c.name === 'sessionid');
    if (hasSid) console.log('          ✅ 已拿到 sessionid，可直接部署（python deploy_ui.py）');
    else console.log('          ⏳ 尚未拿到 sessionid，请先在弹出的窗口里登录豆包');
    return db.length;
  }).catch((e) => {
    console.log('[cookies] 导出出错:', e.message);
    return 0;
  });
}

function deploy() {
  console.log('[deploy] 调用 deploy_ui.py 部署到 112 ...');
  const p = execFile(PY, ['deploy_ui.py'], { cwd: CWD }, (err, stdout, stderr) => {
    console.log('[deploy] ---- stdout ----');
    console.log(stdout || '(空)');
    if (stderr) { console.log('[deploy] ---- stderr ----'); console.log(stderr); }
    console.log('[deploy] 完成, err=' + (err ? err.message : 'none'));
  });
  p.on('error', (e) => console.log('[deploy] 启动失败:', e.message));
}

(async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: 'msedge',
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ['--no-first-run', '--no-default-browser-check', '--disable-blink-features=AutomationControlled'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  // 启动立即导一次（万一已登录）
  await exportCookies(ctx);

  // 每 8 秒持续导出
  setInterval(() => exportCookies(ctx), 8000);

  // 触发文件：touch doubao_deploy.trigger -> 导出最新 cookie 并自动部署
  setInterval(async () => {
    try {
      if (!fs.existsSync(TRIGGER)) return;
      try { fs.rmSync(TRIGGER, { force: true }); } catch (e) {}
      const n = await exportCookies(ctx);
      console.log(`[trigger] 已导出 ${n} 个 cookie，开始自动部署...`);
      deploy();
    } catch (e) { console.log('[trigger] err', e.message); }
  }, 1500);

  process.on('SIGINT', async () => { await exportCookies(ctx); process.exit(0); });
  process.on('SIGTERM', async () => { await exportCookies(ctx); process.exit(0); });

  console.log('READY: 已打开 Edge 窗口，请登录豆包（www.doubao.com）。');
  console.log('       登录成功后 cookie 会自动写入 doubao_cookie.txt。');
  console.log('       需要部署时：另开终端 `python deploy_ui.py` 或 touch doubao_deploy.trigger');
  try {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('NAVIGATED', TARGET);
  } catch (e) {
    console.log('GOTO_NOTE', e.message);
  }

  await new Promise(() => {});
})().catch((e) => { console.log('FATAL', e); process.exit(1); });
