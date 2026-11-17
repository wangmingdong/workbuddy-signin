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
  let homeSince = 0;      // 首次确认回到码道主页的时刻
  let lastWaitLog = 0;
  const tick = async () => {
    if (done) return;
    try {
      let url = '';
      try { url = page.url() || ''; } catch (e) {}
      const all = await ctx.cookies();
      const names = all.filter((c) => isHw(c.domain)).map((c) => c.name);
      const hasSession = names.includes('devclouddevuibjJ_SESSION_ID') || names.includes('J_SESSION_ID');
      // ⚠️ 不能只看 J_SESSION_ID：打开登录页时华为就会发一个未激活的预登录
      // J_SESSION_ID，把它当"已登录"会在用户还没扫码时就写盘关窗（踩过）。
      // 真正登录完成的标志：浏览器回到码道主页（devcloud 域 /chat/ 路径），
      // 登录页在 auth.huaweicloud.com 或带 login 字样的 URL 上。
      const onHome = /huaweicloud\.com\/chat\//.test(url) && !/login|auth\.|signin/i.test(url);
      if (hasSession && onHome) {
        // 登录跳转完成后华为还会陆续补发 agencyID 等 cookie：
        // 等它出现；迟迟不来就最多再观察 6 秒收全再写。
        const hasAgency = names.some((n) => n.indexOf('agencyID') !== -1);
        if (!homeSince) {
          homeSince = Date.now();
          console.log('OK: 已进入码道主页，再等几秒收全 cookie（agencyID 等）…');
          return;
        }
        if (!hasAgency && Date.now() - homeSince < 6000) return;
        done = true;
        clearInterval(timer);
        const n = saveCookie(all);
        const miss = hasAgency ? '' : '（未见 agencyID，已按最长等待写入）';
        console.log('OK: 已写入 hw_cookie.txt（' + n + ' 个 cookie）' + miss + '。');
        // 顺路采集码道门户（codearts.huaweicloud.com）会话：积分余额/即将过期接口用。
        // 登录华为云后 CAS 单点登录通常自动放行；失败不影响签到，只是卡片暂无积分行。
        try {
          console.log('…正在顺路采集码道门户会话（用于「可用积分/即将过期」展示）…');
          await page.goto('https://codearts.huaweicloud.com/portal/settings/personal-usage?locale=zh-cn',
            { waitUntil: 'domcontentloaded', timeout: 60000 });
          await page.waitForTimeout(9000); // 等 SSO 跳转 + cookie 落定
          const url2 = page.url() || '';
          const onPortal = url2.indexOf('codearts.huaweicloud.com') !== -1
            && !/authui|login\.html/i.test(url2);
          if (onPortal) {
            // 只取对门户生效的 cookie（避免把 devcloud 专有的混进去重名）
            const ca = await ctx.cookies('https://codearts.huaweicloud.com/');
            const header = ca.map((c) => c.name + '=' + c.value).join('; ');
            if (ca.some((c) => c.name === 'SessionID')) {
              fs.writeFileSync(path.join(__dirname, 'hw_cookie_codearts.txt'), header + '\n');
              console.log('OK: 已写入 hw_cookie_codearts.txt（' + ca.length + ' 个 cookie）');
            } else {
              console.log('WARN: 门户会话缺 SessionID，跳过写盘（不影响签到）');
            }
          } else {
            console.log('WARN: 门户未自动登录（' + url2.slice(0, 60) + '），跳过（不影响签到）');
          }
        } catch (e) {
          console.log('[portal] ' + e.message);
        }
        console.log('OK: 全部完成，窗口即将关闭。');
        setTimeout(async () => { try { await ctx.close(); } catch (e) {} process.exit(0); }, 1500);
        return;
      }
      // 还没登录完成：每 30 秒打一次进度，绝不提前关窗
      if (Date.now() - lastWaitLog > 30000) {
        lastWaitLog = Date.now();
        console.log('WAIT: 等待登录完成…（当前页面: ' + (url ? url.slice(0, 80) : '未知') + '）');
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
