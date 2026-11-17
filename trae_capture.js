// trae_capture.js —— Trae Work 登录 Cookie 一键导出工具
//
// 背景：Trae 的自动签到依赖浏览器登录态（约 14 天一轮过期）。
// 此脚本用 Playwright 驱动你本机的【系统 Edge】（免下载 Chromium），
// 打开一个独立 Profile 的 Edge 窗口让你登录 work.trae.cn，
// 然后持续把 trae.cn 域下的 cookie 导出为 trae_cookie.txt
// （web_server.py 直接拿它当 Cookie 头用）。
//
// 用法：
//   1) 在本目录执行：  node trae_capture.js
//   2) 自动弹出 Edge 窗口，去登录 Trae（扫码/账号都行）；
//      登录成功后脚本每 8 秒自动把 cookie 写盘（trae_cookie.txt）。
//   3) 想立刻部署到服务器：在本目录再开一个终端执行
//         python deploy_ui.py
//      或：touch trae_deploy.trigger （脚本会抓最新 cookie 并自动跑 deploy_ui.py）
//   4) 用完 Ctrl+C 退出即可。
//
// 注意：这是独立 Profile，跟你自己日常用的 Edge 登录态不共享，
//       所以第一次要在弹出的窗口里登录一次；之后 cookie 过期再来一次。

const { chromium } = require('./runtime_env').loadPlaywright();
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const PROFILE    = path.join(__dirname, 'trae_profile');
const COOKIE_TXT = path.join(__dirname, 'trae_cookie.txt');
const COOKIE_JSON= path.join(__dirname, 'trae_cookie.json');
const TRIGGER    = path.join(__dirname, 'trae_deploy.trigger');
const PY         = require('./runtime_env').resolvePython();
const TARGET     = 'https://work.trae.cn/?mode=mtc';
const CWD        = __dirname;
// 网页「一键更新」会带 --once：采到有效 cookie 就写盘并退出（黑窗口自动关）
// 手动双击 .bat 不带此参数：保持常驻守护（老用法不变）
const ONCE       = process.argv.includes('--once');

// 只收 trae.cn 相关域（含 .trae.cn / work.trae.cn / api.trae.cn）
const isTrae = (d) => (d || '').endsWith('trae.cn') || (d || '').includes('.trae.cn');

function exportCookies(ctx) {
  return ctx.cookies().then(async (all) => {
    const trae = all.filter((c) => isTrae(c.domain));
    const names = trae.map((c) => c.name);
    // 关键：没拿到登录态就绝不写盘。否则网页轮询会把"空写入"误判成登录成功。
    // sessionid 是 trae 登录态的核心标志（与 doubao / web_server 校验口径一致）。
    if (!names.includes('sessionid')) {
      console.log('[cookies] 尚未登录（无 sessionid），跳过写盘，等待登录…');
      return 0;
    }
    const header = trae.map((c) => `${c.name}=${c.value}`).join('; ');
    fs.writeFileSync(COOKIE_JSON, JSON.stringify(trae, null, 2));
    fs.writeFileSync(COOKIE_TXT, header);
    console.log(`[cookies] ✅ trae 有效 cookie 数量=${trae.length}, 头串长度=${header.length}`);
    return trae.length;
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
  const first = await exportCookies(ctx);
  if (ONCE && first > 0) {
    try { await ctx.close(); } catch (e) {}
    setTimeout(() => process.exit(0), 800);
  }

  // 每 8 秒持续导出；--once 模式拿到有效 cookie 就写盘并自动退出（黑窗口随之关闭）
  setInterval(async () => {
    const n = await exportCookies(ctx);
    if (ONCE && n > 0) {
      try { await ctx.close(); } catch (e) {}
      setTimeout(() => process.exit(0), 800);
    }
  }, 8000);

  // 触发文件：touch trae_deploy.trigger -> 导出最新 cookie 并自动部署
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

  console.log('READY: 已打开 Edge 窗口，请登录 Trae（work.trae.cn）。');
  console.log('       登录成功后 cookie 会自动写入 trae_cookie.txt。');
  console.log('       需要部署时：另开终端 `python deploy_ui.py` 或 touch trae_deploy.trigger');
  try {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('NAVIGATED', TARGET);
  } catch (e) {
    console.log('GOTO_NOTE', e.message);
  }

  await new Promise(() => {});
})().catch((e) => { console.log('FATAL', e); process.exit(1); });
