const { chromium } = require('C:/Users/54004/.workbuddy/binaries/node/workspace/node_modules/playwright-core');
const fs = require('fs');

const BASE = __dirname;
const PROFILE = BASE + '/hw_profile';
const NETLOG = BASE + '/hw_netlog.jsonl';
const COOKIES = BASE + '/hw_cookies.json';
const TARGET = 'https://devcloud.cn-north-4.huaweicloud.com/chat/home';

const isHw = (u) => /huaweicloud|hwcloud|huawei/i.test(u);
const isApi = (u) => isHw(u) || /sign|check-?in|attend|daily|point|score|task|reward|lottery|draw|signin/i.test(u);

function append(rec) {
  try { fs.appendFileSync(NETLOG, JSON.stringify(rec) + '\n'); } catch (e) {}
}

(async () => {
  fs.writeFileSync(NETLOG, '');
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: 'msedge',
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ['--no-first-run', '--no-default-browser-check', '--disable-blink-features=AutomationControlled'],
  });
  const page = ctx.pages()[0] || await ctx.newPage();

  const dumpCookies = async () => {
    try {
      const c = await ctx.cookies();
      fs.writeFileSync(COOKIES, JSON.stringify(c, null, 2));
      console.log('[cookies] dumped', c.length);
    } catch (e) { console.log('[cookies] err', e.message); }
  };

  ctx.on('request', (req) => {
    const u = req.url();
    if (!isApi(u)) return;
    append({ t: Date.now(), kind: 'request', method: req.method(), url: u,
      headers: req.headers(), postData: req.postData() });
  });
  ctx.on('response', async (resp) => {
    const u = resp.url();
    if (!isApi(u)) return;
    let body = null;
    try { const b = await resp.body(); body = b.toString('utf8').slice(0, 5000); } catch (e) {}
    append({ t: Date.now(), kind: 'response', status: resp.status(), url: u,
      headers: resp.headers(), bodyPreview: body });
  });

  // 浏览器被关掉（用户手关/崩溃）时，立刻退出，避免变成刷错误的僵尸进程
  let closed = false;
  const bye = async (why) => {
    if (closed) return;
    closed = true;
    console.log('[exit] browser closed:', why);
    try { fs.appendFileSync(BASE + '/hw_capture.log',
      '\n[exit] ' + new Date().toLocaleString() + ' ' + why + '\n'); } catch (e) {}
    process.exit(0);
  };
  ctx.on('close', () => bye('context close'));
  page.on('close', () => bye('page close'));
  page.on('crash', () => bye('page crash'));
  if (ctx.browser && ctx.browser().on) {
    ctx.browser().on('disconnected', () => bye('browser disconnected'));
  }

  setInterval(dumpCookies, 15000);

  // screenshot + DOM-text trigger: touch hw_shot.trigger to capture current page
  setInterval(async () => {
    try {
      if (!fs.existsSync(BASE + '/hw_shot.trigger')) return;
      try { fs.rmSync(BASE + '/hw_shot.trigger', { force: true }); } catch (e) {}
      await page.screenshot({ path: BASE + '/hw_shot.png', fullPage: false });
      const txt = await page.evaluate(() => document.body ? document.body.innerText : '');
      const hit = (txt || '').split('\n').filter(l => /签到|积分|任务|活动|奖励|每日/i.test(l)).slice(0, 40);
      fs.writeFileSync(BASE + '/hw_shot.txt', (txt || '') + '\n\n=== 命中关键词行 ===\n' + hit.join('\n'));
      console.log('[shot] captured hw_shot.png + hw_shot.txt');
    } catch (e) { console.log('[shot] err', e.message); }
  }, 1500);

  process.on('SIGINT', async () => { await dumpCookies(); process.exit(0); });
  process.on('SIGTERM', async () => { await dumpCookies(); process.exit(0); });

  console.log('READY: Edge window opened. Please log in to Huawei Cloud and click 签到.');
  try {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('NAVIGATED', TARGET);
  } catch (e) {
    console.log('GOTO_NOTE', e.message);
  }

  // keep alive until stopped
  await new Promise(() => {});
})().catch((e) => { console.log('FATAL', e); process.exit(1); });
