// huawei_login.js —— 华为云码道「一键登录」采集器（exe 桌面版 / 本机版通用）
//
// 用法：签到中心网页点 华为卡「🔑 更新凭据」→「🌐 打开浏览器登录 · 自动获取」，
//       后端用内嵌 Node 拉起本脚本。独立 Edge 窗口登录华为云 DevCloud 后，脚本
//       把会话 cookie 写成 hw_cookie.txt（web_server 读取它签到），自动退出。
//
// 不依赖任何 python：与 huawei/ 目录那套守护工具链完全独立，小白 exe 版专用。
// 门槛：必须拿到 devclouddevuibjJ_SESSION_ID（或 J_SESSION_ID），否则不写盘，
//       避免未登录的空 cookie 骗过前端 mtime 轮询。
const { chromium } = require('./runtime_env').loadPlaywright();
const fs = require('fs');
const path = require('path');

const PROFILE    = path.join(__dirname, 'hw_login_profile');
const COOKIE_TXT = path.join(__dirname, 'hw_cookie.txt');
const TARGET     = 'https://devcloud.cn-north-4.huaweicloud.com/chat/home';
const MAX_MS     = 6 * 60 * 1000;

function isHw(d) {
  const x = (d || '').replace(/^\./, '').toLowerCase();
  return x === 'huaweicloud.com' || x.endsWith('.huaweicloud.com') ||
         x === 'hwcloud.com' || x.endsWith('.hwcloud.com');
}

function saveCookie(all) {
  const rows = all.filter((c) => isHw(c.domain));
  const header = rows.map((c) => c.name + '=' + c.value).join('; ');
  if (fs.existsSync(COOKIE_TXT)) {
    const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    try { fs.copyFileSync(COOKIE_TXT, COOKIE_TXT + '.bak_' + ts); } catch (e) {}
  }
  fs.writeFileSync(COOKIE_TXT, header + '\n');
  return rows.length;
}

(async () => {
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: 'msedge',
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ['--no-first-run', '--no-default-browser-check', '--disable-blink-features=AutomationControlled'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  console.log('READY: 已弹出 Edge 窗口，请在里面登录华为云 DevCloud（账号/扫码均可）。');
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
      const names = all.filter((c) => isHw(c.domain)).map((c) => c.name);
      // 会话标识门槛：没登录就绝不写盘
      const hasSession = names.includes('devclouddevuibjJ_SESSION_ID') || names.includes('J_SESSION_ID');
      if (hasSession) {
        done = true;
        clearInterval(timer);
        const n = saveCookie(all);
        console.log('OK: 已检测到华为登录会话，写入 hw_cookie.txt（' + n + ' 个 cookie），窗口即将关闭。');
        setTimeout(async () => { try { await ctx.close(); } catch (e) {} process.exit(0); }, 1500);
        return;
      }
    } catch (e) {
      console.log('[tick] ' + e.message);
    }
    if (Date.now() > deadline) {
      done = true;
      clearInterval(timer);
      console.log('TIMEOUT: 6 分钟内未检测到华为登录态。请重新点一键登录并在 Edge 窗口完成登录。');
      try { await ctx.close(); } catch (e) {}
      setTimeout(() => process.exit(2), 1000);
    }
  };
  const timer = setInterval(tick, 5000);
  await tick();
})().catch((e) => { console.log('FATAL', e); process.exit(1); });
