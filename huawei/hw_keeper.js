// 华为码道会话守护进程
// 常驻持久化 Edge（profile 已记住华为账号，凭据有效期约 1 年），
// 每隔 N 分钟访问一次码头：服务端会自动签发新的 devcloud 会话。
// 每次访问后 dump 全部 cookie 到 hw_cookies.json，由 hw_autopush.py 校验并推送。
// 心跳文件 hw_keeper.heartbeat 供 autopush 看护；未登录则尝试 SSO 静默重登。
const { chromium } = require('C:/Users/54004/.workbuddy/binaries/node/workspace/node_modules/playwright-core');
const fs = require('fs');

const BASE = 'E:/workspace/workbuddy-signin';
const PROFILE = BASE + '/hw_profile';
const COOKIES = BASE + '/hw_cookies.json';
const LOG = BASE + '/hw_keeper.log';
const HEARTBEAT = BASE + '/hw_keeper.heartbeat';
const NEEDLOGIN = BASE + '/hw_need_login.flag';
const SHOT = BASE + '/hw_shot.png';
const SHOTTXT = BASE + '/hw_shot.txt';
const TRIGGER = BASE + '/hw_shot.trigger';
const TARGET = 'https://devcloud.cn-north-4.huaweicloud.com/chat/home';
const AUTH = 'https://auth.huaweicloud.com/authui/login?service=' + encodeURIComponent(TARGET);
const INTERVAL_MIN = Number(process.env.HW_INTERVAL_MIN || 5);
const HEADLESS = process.env.HW_HEADLESS !== '0';

function log(m) {
  const line = '[' + new Date().toLocaleString() + '] ' + m;
  try { fs.appendFileSync(LOG, line + '\n'); } catch (e) {}
  console.log(line);
}

(async () => {
  log('keeper start headless=' + HEADLESS + ' interval=' + INTERVAL_MIN + 'min');
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: 'msedge',
    headless: HEADLESS,
    viewport: { width: 1280, height: 900 },
    args: ['--no-first-run', '--no-default-browser-check', '--disable-blink-features=AutomationControlled'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  let closed = false;
  const bye = (why) => { if (closed) return; closed = true; log('EXIT ' + why); process.exit(0); };
  ctx.on('close', () => bye('context close'));
  page.on('close', () => bye('page close'));

  const dump = async () => {
    try {
      const c = await ctx.cookies();
      fs.writeFileSync(COOKIES, JSON.stringify(c, null, 2));
      fs.writeFileSync(HEARTBEAT, String(Date.now()));
      return c.length;
    } catch (e) { log('dump err ' + e.message); return -1; }
  };
  const text = async () => { try { return await page.evaluate(() => document.body ? document.body.innerText : ''); } catch (e) { return ''; } };
  const isNotLogged = (t) => /登录华为云/.test(t || '') && !/体验版|hw053151338/.test(t || '');

  const tick = async () => {
    try {
      if (!/chat\/home/.test(page.url())) {
        await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => log('goto note ' + e.message));
      } else {
        await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => log('reload note ' + e.message));
      }
      await page.waitForTimeout(3500);
    } catch (e) { log('visit err ' + e.message); }

    let t = await text();
    let nl = isNotLogged(t);
    const n = await dump();
    log('tick cookies=' + n + ' notLogged=' + nl + ' url=' + String(page.url()).slice(0, 70));

    if (nl) {
      log('WARN not logged in -> try silent SSO');
      try {
        await page.goto(AUTH, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForTimeout(5000);
        await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForTimeout(4500);
      } catch (e) { log('sso err ' + e.message); }
      t = await text();
      await dump();
      if (isNotLogged(t)) {
        log('STILL NOT LOGGED IN -> needs human login');
        try { await page.screenshot({ path: SHOT }); } catch (e) {}
        try { fs.writeFileSync(NEEDLOGIN, new Date().toLocaleString()); } catch (e) {}
      } else {
        log('SSO silent re-login OK');
        try { fs.rmSync(NEEDLOGIN, { force: true }); } catch (e) {}
      }
    } else {
      try { fs.rmSync(NEEDLOGIN, { force: true }); } catch (e) {}
    }

    try {
      if (fs.existsSync(TRIGGER)) {
        fs.rmSync(TRIGGER, { force: true });
        await page.screenshot({ path: SHOT });
        fs.writeFileSync(SHOTTXT, (await text()) || '');
        log('shot captured');
      }
    } catch (e) {}
  };

  try { await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 }); }
  catch (e) { log('initial goto note ' + e.message); }
  await page.waitForTimeout(4500);
  await tick();
  setInterval(tick, INTERVAL_MIN * 60 * 1000);
  await new Promise(() => {});
})().catch(e => { log('FATAL ' + e); process.exit(1); });
