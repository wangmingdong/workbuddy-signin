# 多平台积分签到中心（WorkBuddy 每日签到）

一个纯标准库 Python 单文件服务（`web_server.py`），把多个 AI 平台的「每日积分/活动分」签到聚合成一个手机网页：**后台定时自动签，手机随时看状态、可一键补签**。

> 设计铁律：**单文件 SPA**——改 UI 只动 `web_server.py` 内联的 `PAGE` 字符串，不引外部静态文件；部署就是 scp 一个文件到服务器。所有凭据/状态文件**平铺在项目根目录**，服务端按平铺路径读取（这是线上部署依赖的约定，勿擅自改成子目录）。

---

> ## ⚠️ 2026-11-19：Qoder 官方下掉「每日领 100 Credits」签到活动
>
> 实测结论：用本机完整登录态（token 有效 + `runtime-info.exe` 设备指纹正常、接口 HTTP 200）查询，`campaigns` 接口已**不再返回 `CLAIM_BENEFIT` 活动**，只剩一条「首购订阅加赠 Credits」的订阅广告（`VIEW_DETAILS`）。本机守护、服务端代领、exe 一键签到三条路都查不到活动——**非登录/配置故障**，等官方恢复即可。
>
> 应对（已做）：
> - `web_server.py` 里 Qoder 的**自动签到执行代码已暂时注释**——从 `AUTO_PLATFORMS` 移除、`run_checkin_for` 不再触发签到、补签线程 `_qoder_topup_loop` 停止启动、`run_daily_all` 顺序表移除。均带 `【2026-11-19 暂停】` 注释标记。
> - **卡片只读展示保留**：余额、逐包到期积分照常显示，不受影响。
> - **官方恢复后**：搜索 `【2026-11-19 暂停】` 逐处取消注释（含 `AUTO_PLATFORMS` 的 `"qoder"`、`run_checkin_for` 的 `return run_qd_checkin()`、补签线程启动行、顺序表 `("qoder", "Qoder")`）即可恢复，无需改逻辑。
> - 下方第 5 步 / 接口说明里关于 Qoder 自动领取的描述为**活动下线前的历史机制**，供恢复时参考。

---

## 它能签到哪些平台

卡片顺序 = `web_server.py` 中 `ADAPTERS` 字典的插入顺序。**共 10 张卡**。

> **2026-10-16 起，10 张卡全部属于「🤖 自动签到」分组，不再有「✋ 手动签到」分组**
> （手动分组为空时，该 tab 会自动隐藏）。改动记录：
> - **Link AI** 原为手动卡（接口强制图片验证码、服务端无法代签）；
>   现已在 `lk_captcha_solver.py` 里实现**滑块验证码自动破解**，
>   端到端实测签到成功，**无需再手动操作**。详见下方 FAQ。
> - **华为码道** 其实是全自动的（`hw_last_run.json` 显示每天 08:31 自动 +1000 积分、
>   从未失败）；之前误放在手动组，是因为其 Cookie 短效需偶尔重登，
>   但那属于「维护凭据」而非「手动签到」。
>
> **Qoder 签到已于 2026-11-19 暂停**（官方下掉每日活动，见顶部公告）；卡片仅保留积分展示，恢复方法见顶部公告。下方第 5 步为其历史领取机制。
> **豆包为「浏览器签名代理」架构**——详见下方「第 9 步 · 豆包」。

> 所有卡片底部统一显示「可用积分」（4 家真实有余额：千帆 / WorkBuddy / Qoder / Link AI；其余接口不提供余额则诚实显示「—」）。
> WorkBuddy 与 Qoder 还会显示「将过期积分」：WorkBuddy 按赠送包到期日汇总最近一档及 7/30 天合计；Qoder 的逐包到期日取自网页会话（`qoder_cookie.txt` 有效时），失效时只显示 token 查到的总余额。

| 平台 | 官网 | 每日奖励 | 凭据文件（根目录） | 维护频率 |
|------|------|---------|------------------|----------|
| WorkBuddy | workbuddy.cn | 100 积分 | `token.info` | 打开一次客户端自动续期 |
| 百度千帆 | qianfan.baidu.com | — | `qf_token.txt`（另一台 ECS 同步） | 自动 |
| MiniMax Code | platform.minimax.io | 400 智点 | `mm_web_token.json` | 约 40 天，过期重新登录 |
| Qoder | qoder.com | ~~100 Credits~~ **活动已于 2026-11-19 下线，暂停签到**（余额展示保留） | `qoder_token.txt` | — |
| Link AI | console.link-ai.tech | 每日签到随机积分（**已实现自动绕过滑块验证码**，见下方 FAQ） | `linkai_token.txt` | 不定期 |
| WPS 灵犀 | lingxi.wps.cn | 100 智点 | `lx_cookie.txt` | 不定期需重新导出 Cookie |
| Trae Work | work.trae.cn | 150+50 积分 | `trae_cookie.txt` | 约 14 天，需重新导出 Cookie |
| **Coze 扣子** | coze.cn | 60 积分/天 + 自动聊天点亮连续活跃（当日 23:59 过期） | `coze_cookie.txt` | 约 60 天，过期重新导出 Cookie |
| 华为码道 | devcloud.cn-north-4.huaweicloud.com | — | `hw_cookie.txt`（本机 `hw_autopush.py` 自动同步；亦支持网页「🔑 配置会话 Cookie」粘贴登录） | 会话失效后双击 `huawei/relogin_huawei.bat` |
| **豆包 Doubao** | doubao.com / 豆包 PC 客户端 | 每日签到 + 积分任务领奖 | 浏览器实时算签代持（详见下方「第 9 步 · 豆包」） | 随会话（约 30 天，靠本机续传） |

> **派猫猫旅行**已并入 WorkBuddy：它共用 WorkBuddy 登录态，在 WorkBuddy 卡内作为弹窗入口，不单独成卡、也不在设置页单独配置（开关跟随 WorkBuddy）。
>
> **CodeBuddy / MiniMax Agent** 曾经加过，但实测与 WorkBuddy / MiniMax Code 是同一套登录态、同一笔积分，属重复项，已删除。
>
> 卡片为响应式 CSS Grid：`<600px 单列 / ≥600px 两列 / ≥920px 三列 / ≥1240px 四列`；详情是**真模态弹窗**（× / 点遮罩 / Esc 三种关闭），每卡右下角「🌐 前往官网登录」跳官方站点。
>
> 卡片高度对齐：页面加载后按实测内容高度决定折叠——内容本来装得下的卡（如千帆、Link AI）直接全部显示，不出现「展开其余 N 项」；只有确实撑高的卡才把「凭据有效期 / 上次执行（签到）时间」以外的明细折起来。折叠高度取所有卡折起后的最高值作为统一高度（不再硬编码 480px），短卡的操作按钮仍贴底；单列手机端保留自然高度。与上方大数字重复的「可用积分」条（千帆 / Link AI 的大数字本身就是可用积分）不再重复渲染。WorkBuddy 卡内的多个入口折进「更多入口（N）」（单入口的千帆/豆包保持原样）。点开折叠只影响本卡，不会触发详情弹窗。

### 🟣 豆包 Doubao（第 3 张卡 · 浏览器签名代理架构）

豆包是这 10 家里**唯一不能纯靠静态 token/cookie 在服务端直接签**的平台，因为它在签到/领积分的写接口上强制一道 **`a_bogus` 动态签名**：这串签名由豆包网页 JS 在你**真浏览器发请求的那一刻**临时算出来（把请求参数 + 时间戳 + 浏览器指纹搅一起哈希），算签函数锁死在网页闭包里，服务器根本拿不到。服务器光持你的 cookie 裸调接口，会被 `710010702` 直接拒绝。

> **白话结论**：别的平台「钥匙」是静态 token/cookie，服务器存着就能自己签；豆包的「钥匙」是「浏览器当场算签名的能力」，只活在你本机登录着的浏览器里。所以必须借你本机（或服务器上的无头浏览器）当「签名代理」。

为此本仓库提供两套方案（详见「第 9 步 · 豆包」）：
- **方案一 · 本机自治（推荐起步）**：你本机常驻一个签名服务（`doubao_sign.js` + `doubao_signer.bat`），服务器只负责喊「该签了」，真签名在你本机 Edge 完成。已做崩溃自愈 + 开机自启，注册一次后您再也不用开 bat。
- **方案二 · 搬到 112 服务器**：把签名代理挪到 112 上跑无头 Chromium（`doubao_sign_server.js`），您电脑关机也能签；登录态由本机 `doubao_sign.js` 每 30 分钟自动推给 112。

⚠️ **诚实边界（两方案通用）**：豆包的「积分任务」（如生成 PPT、用某个技能等）本身仍需您在豆包**真做完**才领得到——平台校验真实使用，自动化只管「领」不管「做」。

---

## 目录结构

```
workbuddy-signin/
├─ web_server.py          ← 核心：HTTP 服务 + 签到中心单页（PAGE 内联全部 HTML/CSS/JS）
├─ wb_icon.py             ← 各平台官方图标（SVG/PNG，运行时注入 PAGE）
├─ wb_travel.py           ← 派猫猫旅行（WorkBuddy 卡内弹窗）逻辑
├─ wb_growth.py           ← WorkBuddy 成长中心 / 每日任务 一键完成
├─ workbuddy_checkin.py   ← 核心签到逻辑（找 token → 查状态 → 签到，CLI 供 timer）
├─ wb_token_dump.js       ← 新版客户端会话解密器：用 WorkBuddy 自带二进制（Node 模式）取主密钥，
│                            把加密的 workbuddy-desktop.info 还原成明文（零依赖）
├─ wb_token_sync.py       ← 令牌刷新编排：解密 → 原子写 token.info → 推送到 112（SFTP 优先，HTTP 兜底）
├─ run_token_sync.bat     ← 手动刷新令牌（run_checkin.bat 每次也会自动先跑一遍）
├─ deploy_ui.py           ← 最小化 UI 部署：传 web_server.py + 凭据、重启 wb-checkin（本地私有脚本，未入库）
├─ envconf.py             ← 本地运维脚本统一从 .env 读 ECS/ACCESS_KEY
├─ config.example.json    ← 各平台凭据文件/环境变量说明模板（不进仓库）
├─ start_web.bat          ← 启动网页服务并打印手机访问地址
├─ run_checkin.bat        ← 本机手动跑一次每日签到（内含令牌自动刷新）
├─ setup_task.ps1         ← 注册 Windows 计划任务（本机每日自动跑）
├─ install_autostart.bat  ← 网页服务开机后台自启（无需管理员）
├─ trae_capture.js        ← Trae Cookie 抓取脚本（本机从浏览器导出）
├─ qoder_capture.js       ← Qoder 网页会话抓取（Edge 登录一次 → 校验后推 112）
├─ qoder_login.js         ← Qoder 一键登录（exe 版专用：内嵌 playwright + 系统 Edge，登录采 cookie 写本地即退，不依赖 python）
├─ huawei_login.js        ← 华为一键登录（同上；登录完成判据 = 页面回到码道主页，见「凭据一键更新」节）
├─ lx_capture.js          ← 灵犀 Cookie 抓取（本机采集 + 推送）
├─ capture_logs/          ← 各平台采集脚本运行日志（点一键登录时自动生成，崩溃排障看这里）
├─ refresh_qoder_cookie.bat ← Qoder「将过期积分」一键刷新入口
├─ push_qoder_cookie.py   ← 推送 qoder_cookie.txt 到 112 并实测逐包到期接口
│
├─ ★ 豆包签名代理（Doubao）★
├─ doubao_sign.js          ← 本机签名代理：Playwright 驱动 Edge 算 a_bogus 真签；每 30 分把 cookie 推给 112（方案二）
├─ doubao_signer.bat       ← 本机签名服务启动器（启动前释放 8791 端口 + node 崩溃 5s 自愈循环）
├─ install_doubao_autostart.bat ← 一键注册开机自启（双击即自动提权 + 注册计划任务 + 立即拉起）
├─ setup_doubao_task.ps1   ← 注册 Windows 计划任务 DoubaoSignService（崩溃自动拉起兜底）
├─ doubao_sign_server.js   ← 112 服务器签名代理：headless Chromium 代签（方案二）
├─ wb-doubao-sign.service  ← 112 systemd 服务单元（方案二）
├─ setup_doubao_server.sh  ← 112 一键安装脚本（装 Playwright/Chromium + 注入 DOUBAO_SIGNER_URL）
│
├─ ★ 凭据 & 状态文件（平铺根目录，服务端平铺读取）★
│   token.info  qf_token.txt  mm_token.json  mm_web_token.json  qoder_token.txt
│   linkai_token.txt  lx_cookie.txt  trae_cookie.txt  coze_cookie.txt
│   hw_cookie.txt（注：实际由 huawei/ 工具链产生并推送）
│   settings.json  *_last_run.json（各平台签到历史） travel_state.json
│
├─ huawei/                ← 华为本机常驻工具链（王大少 PC 侧，非服务器）
│   ├─ hw_keeper.js        ← 无头常驻，每 5 分刷新华为会话
│   ├─ hw_capture.js       ← 抓华为登录态 Cookie
│   ├─ hw_autopush.py      ← 把 Cookie 推到 112 服务器
│   ├─ hw_watch_login.py / hw_keepalive.py / hw_index.js
│   ├─ relogin_huawei.bat  ← 华为登录态一键恢复（双击）
│   ├─ run_keeper.bat / run_autopush.bat / install_keeper.bat / install_hw_keepalive.py
│   └─ hw_profile/ / hw_cookies.json / hw_cookie.txt / 各类日志（均 gitignored）
│
├─ docs/                  ← 文档
│   ├─ README.md          ← 本文件
│   └─ WORKBUDDY_CHECKIN_REVIEW.md
│
├─ node_modules/          ← 解包品牌资源用的 asar 依赖（保留，非垃圾）
└─ .env.example           ← 环境变量模板（复制为 .env 填值，.env 已 gitignored）
```

---

## 文件说明（核心）

| 文件 | 作用 |
|------|------|
| `web_server.py` | 手机网页版服务：10 个平台签到适配器 + 单页 UI（含统一「可用积分」显示、华为网页登录、Link AI 自动过滑块、**凭据到期预警**）；`--daily` 模式供服务器定时跑全部平台 |
| `wb_icon.py` | 各平台官方图标（64×64 圆角内联 SVG/PNG，含 Coze 官方 logo 已 base64 内联） |
| `wb_travel.py` | 派猫猫旅行（WorkBuddy 卡内弹窗）逻辑，共用 WorkBuddy 登录态 |
| `wb_growth.py` | WorkBuddy 成长中心 / 每日任务 一键完成（纯标准库） |
| `workbuddy_checkin.py` | WorkBuddy 核心脚本：读 token → 查状态 → 未签则签到 |
| `deploy_ui.py` | 最小化 UI 部署：上传 `web_server.py`+凭据、重启 `wb-checkin`（不改口令、不触发签到） |
| `envconf.py` | 本地运维脚本统一从项目根 `.env` 读取 `ECS_HOST/PORT/USER/PASS/ACCESS_KEY` |
| `config.example.json` | 各平台凭据文件 / 环境变量 / 获取方式说明模板（不进仓库） |
| `start_web.bat` | 启动网页版服务，打印手机访问地址 |
| `install_autostart.bat` | 可选：网页版开机自动后台运行（无需管理员） |
| `qoder_login.js` | Qoder 一键登录采集器（exe 桌面版专用）：用 exe 内嵌 Node + playwright-core 拉起系统 Edge，登录 qoder.com 采到会话 cookie 写 `qoder_cookie.txt` 即自动退出，**不依赖 python**；未登录成功绝不写盘 |
| `huawei_login.js` | 华为一键登录采集器（同上机制）：弹独立 Edge 登录 DevCloud，**登录完成判据 = 会话 cookie 存在 且 页面已回到码道主页**（只看 cookie 会把登录页的「预登录会话」误判成已登录，踩过），回主页后再等 `agencyID` 等补发 cookie 收全才写盘关窗 |
| `build_exe.py` | 一键打包 exe 桌面版：PyInstaller 主程序 + 内嵌 Node 运行时 / playwright-core / 全部采集脚本 + 生成 `使用说明.txt`，产物在 `dist/签到中心/`（约 157MB）；打包前自动把旧产物改名让路，避免文件占用导致打包失败 |
| `doubao_sign.js` | 本机豆包签名代理：Playwright 开真 Edge 算 `a_bogus` 真签；`/sync-cookie` 手动 + 每 30 分自动把 cookie 推给 112（方案二） |
| `doubao_signer.bat` | 本机签名服务启动器：启动前释放 8791 端口防冲突 + node 崩溃 5s 自愈循环 |
| `install_doubao_autostart.bat` | 一键注册豆包签名服务开机自启（双击即自动提权 + 注册计划任务 + 立即拉起） |
| `setup_doubao_task.ps1` | 注册 Windows 计划任务 `DoubaoSignService`（登录自启 + 每日 08:20 保活；动态探测参数兼容旧版 Windows） |
| `doubao_sign_server.js` | 112 服务器签名代理：headless Chromium 代签，读 `doubao_cookies_server.json` 登录态（方案二） |
| `wb-doubao-sign.service` | 112 systemd 服务单元，拉起 `doubao_sign_server.js`（含 `--no-sandbox` 适配 root） |
| `setup_doubao_server.sh` | 112 一键安装脚本：装 Playwright/Chromium/系统依赖 + 注册服务 + 给 `wb-checkin` 注入 `DOUBAO_SIGNER_URL` |

> 凭证只**读取**不修改；脚本不会用 refreshToken 刷新，避免影响主程序登录态。

---

## 配置（分享 / 迁移给他人）

本项目**核心代码已配置化**：所有敏感信息（ECS 密码、网页访问口令、各平台 token/cookie）都从环境变量读取，不写死代码。

- 服务端 `web_server.py` 读取 `WB_ACCESS_KEY` / `QF_BASE_URL` / `QF_ACCESS_TOKEN` / `TRAE_COOKIE` / `HW_COOKIE` …（生产由 systemd 注入；`QF_BASE_URL` 未设置时自动跳过千帆）。
- 本地运维脚本统一从项目根 `.env` 读 `ECS_HOST / ECS_PORT / ECS_USER / ECS_PASS / ACCESS_KEY`，由 `envconf.py` 加载。

**别人拿到仓库后怎么配：**
1. 复制 `.env.example` 为 `.env`：`cp .env.example .env`
2. 在 `.env` 里填入自己的值（ECS 地址/密码、访问口令等）。
3. 各平台 token/cookie 仍按上文「目录结构」各自放置（如 `trae_cookie.txt`、`lx_cookie.txt`、`coze_cookie.txt`），这些文件已在 `.gitignore` 忽略。

> `.env` 含真实口令，**已被 .gitignore 忽略，绝不入库**；仓库里只有 `.env.example` 占位模板。所有凭据/状态文件（含 `hw/` 下华为登录态、`*_last_run.json`、`token.info`、`settings.json`）均已被 `.gitignore` 忽略。

---

## 🧭 使用方式（先选一条）

本项目只有一份代码（`web_server.py`），按「谁常驻运行」分两种用法。**凭据、设置页、卡片功能完全一样**，区别只在本机跑还是服务器跑：

| | 🖥️ **本机模式** | ☁️ **服务器模式** |
|---|---|---|
| 适合谁 | 有台电脑常开、只想自己用、零成本试用 | 电脑经常关机、想手机随时看、要公网地址 |
| 谁来跑 | 你的 Windows 电脑（exe 或 Python） | 云服务器（nginx 反代） |
| 访问地址 | `http://localhost:8765`（手机同 WiFi 用局域网 IP） | `https://你的域名/checkin/` |
| 端口 | 默认 `8765`（`WB_PORT` 可改） | `127.0.0.1:8790`，由 nginx 反代 |
| 自动签到 / 开机自启 | exe 版：设置页勾「开机自动运行」；Python 版：`install.bat` 写启动文件夹 | 设置页定时 + systemd `wb-checkin` 常驻 |
| 凭据放哪 | 你电脑上的程序目录 | 服务器 `/opt/wb-checkin/` |
| 凭据采集 | 卡片「更新凭据」一键登录或粘贴，自动写盘 | 本机采集后推服务器（服务器模式网页禁写凭据） |
| 电脑关机后 | ❌ 停签 | ✅ 照常签 |

> ⚠️ **两种模式不要同时开调度**——两边都设了定时会各签一次、各推一次通知（重复推送）。选定一边后，把另一边设置页的「启用自动签到」关掉即可。

### 🖥️ 本机模式

本机模式有两种跑法，**小白直接选 A，想看代码/自定义才选 B**：

**A. exe 桌面版（小白推荐，零环境依赖）**

1. 拿到打包好的 `dist/签到中心/` 文件夹（自己打包见下；分发给别人时把整个文件夹压缩发过去即可）。
2. 双击 **`签到中心.exe`** → 浏览器自动打开签到页 → 首次设访问口令。
3. 卡片「🔑 更新凭据」配凭据（6 家平台一键登录，见下方专节）→ 设置页设签到时间、勾「**开机自动运行**」→ 完成。之后开机静默自启、每天到点自动签，无需再管。

- exe **自带 Node 运行时和采集脚本**，电脑上不装 Python / Node.js 也能用全部功能。
- 自己打包：本机装 Python 后跑 `python build_exe.py`，产物在 `dist/签到中心/`（约 157MB，含 PyInstaller 主程序 + 内嵌 Node + playwright-core + 采集脚本 + 使用说明）。
- 常见问题（Defender 误报、日志位置等）见 exe 同目录 `使用说明.txt`。

**B. Python 源码版（进阶）**

1. 装 **Python 3.8+**（勾选 Add to PATH）；需要弹窗采集的平台再装 **Node.js**。
2. 双击 **`install.bat`**：自动检测 Python → 写开机自启 → 起服务 → 打开 `http://localhost:8765`。
3. 进设置页 →「🗝️ 凭据向导」逐平台配置 → 设定时 → 完成。

完整小白步骤、喂 AI 的提示词见根目录 **[QUICKSTART.md](../QUICKSTART.md)**。

### ☁️ 服务器模式（概要）

1. 一台常驻服务器（装 nginx、Python 3.11）+ 域名反代 `location /checkin/` → `127.0.0.1:8790`。
2. `web_server.py` 及凭据平铺到 `/opt/wb-checkin/`，systemd 起 `wb-checkin`（内置调度线程读 `settings.json` 的 `schedule_time`）。
3. 凭据在本机采集后推服务器；设置页定时 + 通知。详见下方「用法 → 第 4 步」和「服务器安全加固」。

> 服务器 `python3` 是 3.6.8 跑不动本项目，**必须用 `python3.11`**。

---

## 🔐 更新凭据：一键 vs 手动（2026-11-17）

凭据过期不用再翻控制台复制粘贴——**本机模式（含 exe 桌面版）** 点卡片「🔑 更新凭据」即可。能力分两档：

### 一键平台（6 家，全程不用复制）

| 平台 | 一键方式 | 说明 |
|------|---------|------|
| WorkBuddy | 🔄 一键自动更新 | 解密本机客户端登录态写 `token.info`（需装并登录过 WorkBuddy 客户端） |
| 豆包 | 🌐 弹 Edge 登录 | 采集脚本 `doubao_capture.js --once`，带 `sessionid` 门槛 |
| WPS 灵犀 | 🌐 弹 Edge 登录 | `lx_capture.js` |
| Trae | 🌐 弹 Edge 登录 | `trae_capture.js --once`，带 `sessionid` 门槛 |
| Qoder | 🌐 弹 Edge 登录 | `qoder_login.js`（exe 内嵌 playwright + 系统 Edge，**不依赖 python**；采到即写 `qoder_cookie.txt` 并自动退出） |
| 华为码道 | 🌐 弹 Edge 登录 | `huawei_login.js`，写 `hw_cookie.txt` |

一键脚本共同约定：**没登录成功绝不写盘**（不会拿空 cookie 骗过前端刷新）；采到有效凭据写盘后**窗口自动关闭**，页面自动检测刷新，无需手动复制。

> ⚠️ **华为的两个坑（已修，写下来防止再踩）**：
> 1. **「cookie 存在」≠「已登录」**——打开登录页时华为就会发一个**未激活的预登录 `J_SESSION_ID`**，只看 cookie 会在用户还没扫码时就误判成功、提前关窗。可靠判据是**页面 URL 回到码道主页**（`huaweicloud.com/chat/` 且不含 login/auth）。
> 2. **登录跳转完成后华为才陆续补发 `agencyID` 等 cookie**——看到主页就立刻写盘会缺 cookie，接口返回空体报 `Expecting value`。脚本会在回主页后等 `agencyID` 出现（或最多多等 6 秒）才写盘关窗。
> 3. 华为 cookie 已改为**现读盘**（`_hw_cookie()`，环境变量优先、否则读文件）：一键写回后无需重启立即生效；接口返回空/HTML 时给人话提示「登录态可能失效，请重新一键登录」，不再裸抛 JSONDecodeError。

**排障**：一键脚本崩溃/闪退时，看 `capture_logs/<平台>.log`（每次点一键登录都会重写该文件，记录脚本全程输出）。

### 手动平台（4 家，按步骤照做即可）

点「更新凭据」→ 展开「手动粘贴」，弹窗里有同款傻瓜文案。速查：

| 平台 | 步骤要点 |
|------|---------|
| 百度千帆 | 特殊：需**自建千帆服务**（`QF_BASE_URL`，由管理员提供），不是官网直接可取的 token——先找管理员要服务地址和 token |
| MiniMax | 登录 `platform.minimax.io` → 右键「检查」或按 F12 →「网络/Network」标签 → 刷新页面 → 点列表里任意请求 → 找请求头里 `authorization` 或 `token` 开头的那串复制粘贴 |
| Link AI | 登录 `link-ai.tech/console/account` → 页面上的 API Token 直接复制粘贴（签到已自动过滑块，token 即可） |
| Coze | 登录 `coze.cn` → F12 →「网络/Network」→ 刷新 → 点第一个请求 → 请求头 `Cookie:` 后面的**整串**全选复制粘贴 |

> **F12 是什么**：键盘最上面一排的 F12 键（或页面空白处右键 → 「检查/Inspect」），打开的就是浏览器开发者工具；凭据藏在「网络/Network」标签的请求头里。
>
> ⚠️ **服务器模式没有以上任何入口**：网页写凭据接口一律 403（防止外人上传自己的 token 借服务器代签），按钮也不会渲染——凭据只能在本机采集后推服务器。

---

## 🚀 开源首次配置指南（Clone 后从零跑起来）

面向第一次拿到本仓库、想自己部署签到的用户。**核心代码已配置化，没有写死任何人的令牌 / 设备 id**—— clone 后只需按下面填好你自己的凭据即可。

### 0. 运行环境
- **Python 3.8+**（纯标准库，无需 `pip install`）
- 一台常驻机器跑 `web_server.py`（本机 / 云服务器均可）；手机同 WiFi 或经 nginx 反代访问网页

### 1. 启动服务（按上面选的模式来）
- **📦 exe 桌面版（最简）**：`python build_exe.py` 打包出 `dist/签到中心/`，双击 `签到中心.exe` 即用——零环境依赖，开机自启在设置页勾选。
- **🖥️ 本机 Python 模式**：双击 `install.bat` —— 检测 Python → 写开机自启 VBS → 起服务并打开 `http://localhost:8765`（端口默认 8765，`WB_PORT` 可改）。本机需要弹窗采集的平台，设置页「凭据向导」一键处理。
- **☁️ 服务器模式**：`web_server.py` 由 systemd `wb-checkin` 常驻，监听 `127.0.0.1:8790`，nginx `location /checkin/` 反代；**进程内自带调度线程**，每天按 `settings.json` 的 `schedule_time` 自动签到。凭据在本机采集后推服务器。
- **手动前台（调试用）**：`python web_server.py --daily` 跑一次签到；`python web_server.py` 起网页服务。旧脚本 `start_web.bat` / `setup_task.ps1` 仍可用，但新用户直接用 `install.bat` 即可。

### 2. 配置访问口令（建议）
- 环境变量 `WB_ACCESS_KEY`（服务器 systemd 注入）或本地 `.env` 的 `ACCESS_KEY`。
- 留空 = 不校验口令。设置后手机首次访问需输入一次，存 `localStorage`，不写 URL。

### 3. 配置各平台凭据
所有凭据**平铺在项目根目录**（文件名固定），或等价的同名环境变量（优先级：环境变量 > 本地文件）。两份模板已给出：
- `config.example.json`：每个平台的「凭据文件 / 环境变量 / 如何获取」说明
- `.env.example`：环境变量模板（复制为 `.env` 填值）

> **到期预警**：`get_center()` 会给能算出有效期的平台挂上「凭据有效期」行，并在卡片上方弹一条汇总预警条（🔴 <3 天 / 🟡 <7 天）。
> 目前 5 个平台可算出：WorkBuddy（`token.info` 的 `auth.expiresAt`）、MiniMax（JWT `exp`）、Link AI（JWT `exp`）、
> Qoder（`qoder_token.txt` 尾部的 `# expiresAt=`）、Trae（`trae_cookie.json` 里 `sessionid` / `X-Cloudide-Session` 的 `expires`）。
> 其余平台只有「`name=val;`」纯 Cookie 串，**不含过期信息**，故显示「未知」——如实标注，不猜数字。
> ⚠️ Trae 要显示有效期，服务器上需同时存在 `trae_cookie.json`（与 `trae_cookie.txt` 同一次导出的元数据，仅作读取、不参与鉴权）。

| 平台 | 凭据文件 | 环境变量 | 获取方式（详见 config.example.json） |
|------|---------|---------|--------------------------------------|
| WorkBuddy | `token.info` | `WB_TOKEN_FILE` | 打开一次客户端，token 自动写入本地 |
| 千帆 | `qf_token.txt` | `QF_ACCESS_TOKEN` / `QF_BASE_URL` | 千帆官网登录后取 token |
| MiniMax Code | `mm_web_token.json` | `MM_WEB_TOKEN` | agent.minimax.cn 网页端 localStorage._token |
| Qoder | `qoder_token.txt`（+ `qoder_cookie.txt`） | `QODER_TOKEN` / `QODER_COOKIE` | token 由桌面客户端取出；要显示「将过期积分」需网页会话：**双击 `refresh_qoder_cookie.bat` → 弹出的 Edge 登录 qoder.com → 自动校验并推服务器**（现读盘，无需重启） |
| Link AI | `linkai_token.txt` | `LINKAI_TOKEN` | 平台生成的 API token |
| WPS 灵犀 | `lx_cookie.txt` | `LX_COOKIE` | **推荐**：双击 `refresh_lingxi.bat` → 弹出的 Edge 登录 lingxi.wps.cn → 自动校验并推服务器（现读盘，无需重启）；亦可用浏览器 DevTools → Application → Cookies 全复制 |
| **Trae Work** | `trae_cookie.txt` + `trae_device_id.txt` | `TRAE_COOKIE`/`TRAE_JWT` + `TRAE_DEVICE_ID` | Cookie 见 config.example；**设备 id 见第 4 步** |
| Coze 扣子 | `coze_cookie.txt` | `COZE_COOKIE` | 浏览器登录 coze.cn 后复制全部 Cookie |
| 华为码道 | `hw_cookie.txt` | `HW_COOKIE` | 由本机 `huawei/` 工具链自动同步；亦可在网页「🔑 配置会话 Cookie」粘贴登录态 |
| **豆包 Doubao** | `doubao_cookie.txt`（本机浏览器导出） | `DOUBAO_COOKIE` | 见下方「第 9 步 · 豆包」（特殊架构，不能直接填 cookie 服务端签） |

> 凭据文件与 `.env` 均已被 `.gitignore` 忽略，绝不会进仓库。

### 4. ⚠️ Trae 设备 id 获取（必做，否则 Trae 永远 9074）
Trae 服务端**按设备记账**：`claim` 必须用与登录态一致的**你的真实设备 id**，随机 id 会被拒（9074）。
1. 打开你的 `TRAE SOLO CN` 客户端并登录一次。
2. 找到客户端用户数据目录（Windows 通常 `%APPDATA%\TRAE SOLO CN\User\globalStorage\storage.json`），搜索键名 `iCubeAuthInfo://icube-dc:<你的设备id>`，`<你的设备id>` 那段数字即真实设备 id；或在客户端日志里搜 `device_id=`。
3. 把这段数字写入项目根目录 `trae_device_id.txt`（一行、无空格）；或设环境变量 `TRAE_DEVICE_ID=<你的设备id>`。
4. 验证：网页打开 Trae 卡点「立即签到」，或 `python web_server.py --daily`，应显示「已签到」。

> 这一步**不能省略、也不能用别人的 id**。文件已被 gitignore，只存在你本地/服务器。

### 5. Qoder：每日 100 Credits（本机守护 + 服务端代领，双保险）
领取需 **Cosy-Machine 设备指纹**（由本机 Qoder 客户端自带的 `resources/umid/runtime-info.exe` 实时生成；不带指纹 → 活动接口返回空数组，伪造 → 503 风控）。2026-09-27 实验验证：**指纹不绑 IP、可跨机重放**——守护把指纹随状态推给服务器后，服务器即可代领：
- 本机进入 `qoder_keeper/`：先跑 `probe` 确认 token / 指纹 / 活动可见性，再双击 `install_keeper.bat` 装开机自启（或手动 `run_keeper.bat`）；
- 守护每 15 分钟自检：保持服务器侧指纹最新 + 每天 10:05 后本机自领（`GET campaigns → POST claim`，服务端 `replayed` 幂等绝不重复发放），并推送「已领 + 可用 Credits」（HTTP `/api/qoder/local-status` 优先，SFTP 兜底）；
- **服务端代领**：服务器每天 10:05~13:00 用守护推送的指纹重放自动领（`_qoder_topup_loop` 补签线程），「一键签到」按钮也可手动触发——**本机没开机也能领**；
- 卡片诚实映射：领取方式区分「🤖 本机守护」/「☁️ 服务端代领」，没指纹/没登录态就显示真实原因，绝不假报。
- **将过期积分（需要网页会话）**：token 只能拿到 `addOnQuota` 汇总余额；逐包到期日只在网页接口 `/api/v2/me/usages/big_model_credits` 里。双击 `refresh_qoder_cookie.bat` → 弹出的 Edge 登录 qoder.com → 脚本校验通过后自动推送 `qoder_cookie.txt` 到 112（备份旧文件、失败不覆盖），手机端下次刷新即显示「⏳ X Credits 将于 MM-DD 过期」与 7/30 天合计。cookie 失效时只显示余额，不猜日期。

### 6. 成长中心 / 每日任务：WorkBuddy 卡内弹窗
WorkBuddy 卡片底部的「🌱 成长中心」「🎯 每日任务」入口，点击在**当前页面弹窗**打开（与「派猫猫旅行」同一套卡内弹窗，不跳页），可一键完成/领取。它们复用 WorkBuddy 登录态，随 WorkBuddy 开关联动。

### 7. 百度千帆「活动中心」：卡内弹窗（对齐 WorkBuddy）
百度千帆卡片底部的「🧭 活动中心」入口，交互与 WorkBuddy 的「🎯 每日任务」完全一致——点击在**当前页面弹窗**打开（同一套卡内弹窗，不跳页），展示**真实活动任务分组** +「🚀 一键完成今日任务」+「🎰 抽奖」按钮。

- **真实任务来源**：逆向百度搭子（DuMate）桌面客户端 `app.asar` 找到「成长计划 growth_plan_2026」活动接口，经千帆服务（`QF_BASE_URL`，由环境变量注入，见 `config.example.json`）代理。接口组：`GET /api/dumate/activity/growth-plan/{modules,tasks,draw/status}`、`POST /api/dumate/activity/growth-plan/{task/complete,draw}`（需 `console.bce.baidu.com` 的 Cookie + `csrfToken`；cookie 由桌面客户端 AES-GCM 解密导出到 `data/cookies.json`）。
- **任务分组**：`每日推荐任务` / `进阶挑战` / `邀请码福利`（实测还出现过 `搭子初启` 等，随活动动态分配）。卡片按 `completed_count >= repeat_count` 判完成。
- **⚠️ 诚实映射（关键）**：活动任务分两类，按钮**只做接口允许的**：
  1. **接口允许自动完成**的（各类 `QUERY_INPUT` AI 任务，如关键信息提取/图视频生成/全格式文档处理/无代码创作/飞书全家桶等）→ 一键批量上报完成、发放奖励。
  2. **官方接口明确拒绝自动完成**的（下载并登录手机端、邀请好友注册、兑换好友邀请码等需真实动作）→ 上报时服务端返回「该任务不支持通过此接口完成」，**自动跳过并诚实保留为待完成**，绝不伪造。
  - 任务存在「完成即解锁」的链式关系（完成一批会解锁下一批），故一键完成多轮轮询、且每个任务**至多上报一次**（避免对 `repeat_count>1` 的重复型任务反复伪造、且防止调用量爆炸卡死）。
- **抽奖**：「🎰 抽奖」按钮一次抽完所有剩余次数（每次新 `request_id`），奖品以官方为准。
- **接口与函数**：112 端 `GET /api/qianfan/daily`、`POST /api/qianfan/daily/run`、`POST /api/qianfan/daily/draw`（均 `?k=KEY` 鉴权）；112 后端 `get_qf_daily_card()` / `run_qf_daily()` / `run_qf_draw()`；千帆服务端 `app/checkin_service.py` 的 `collect_activity()` / `complete_activity_all()` / `draw_activity()`。

### 8. 开启自动签到
- **服务器**：`systemctl enable --now wb-checkin-daily.timer`（每天 08:35）；或在「⚙ 设置」页填「定时签到时间」热更新。
- **本机**：管理员 PowerShell 跑 `.\setup_task.ps1`（每天 09:10）。
- 任一平台失败不影响其余（单平台失败不阻塞）。

### 9. 🟣 豆包 Doubao：a_bogus 动态签名死结与两套方案

豆包**不能像别的平台那样只靠 cookie 在服务端直接签**——它的写接口（签到、领积分）强制 `a_bogus` 动态签名，这串签名由豆包网页 JS 在你**真浏览器发请求那一刻**临时算出来，函数锁死在网页闭包里，服务器拿不到。服务器光持 cookie 裸调会被 `710010702` 拒绝。

> 一句话：豆包的「钥匙」不是 cookie，是「浏览器当场算签名的能力」，只活在你本机浏览器里。所以必须借浏览器当「签名代理」。

#### 9.1 方案一 · 本机自治（推荐起步，零新增依赖）

逻辑：您本机常驻一个签名服务，**服务器只喊「该签了」，真签名在您本机 Edge 完成**。用的是您真实浏览器 + 住宅 IP，账号风险最低。

1. **本机装依赖**：已装 Node 18+ 与 Playwright（`npm install playwright`；首次 `npx playwright install chromium`）。
2. **导出豆包登录态**：用已登录豆包的 Edge，从 DevTools → Application → Cookies 复制全部 cookie，存为根目录 `doubao_cookie.txt`（或设环境变量 `DOUBAO_COOKIE`）。
3. **一键开机自启（只需一次）**：双击 `install_doubao_autostart.bat`（UAC 点「是」）→ 自动注册计划任务 `DoubaoSignService`（登录自启 + 每日 08:20 保活 + 崩溃自动拉起）→ 立即拉起服务。之后**再也不用开 bat**。
   - 验证：`schtasks /query /tn DoubaoSignService` 状态 `Ready` 即成功。
4. **日常运行**：`doubao_signer.bat` 启动 `doubao_sign.js`（监听 `127.0.0.1:8791`，内含崩溃 5s 自愈循环）。它每 15 秒轮询 112 的「待签/待领」指令并执行。
5. **手机网页**：豆包卡点「🎯 完成任务」打开弹窗，列出真实任务状态（✅已领 / 🎯可领 / ⏳待完成），底部「🎯 一键完成任务」即领积分；还有「📋 复制原始任务数据」便于排查。

#### 9.2 方案二 · 搬到 112 服务器（电脑关机也能签）

把「浏览器签名代理」从您本机搬到 112 上跑无头 Chromium，**每日自动跑，电脑关着也能签**。登录态仍在您本机，由 `doubao_sign.js` 每 30 分钟自动推给 112（偶尔没续到，用最后一次同步的 cookie 顶着，豆包 cookie 约 30 天有效）。

**112 侧（一次性）**：
```bash
cd /opt/wb-checkin
git pull                      # 取回 doubao_sign_server.js / web_server.py 等
bash setup_doubao_server.sh   # 装 Playwright+Chromium+系统依赖、注册 wb-doubao-sign.service、给 wb-checkin 注入 DOUBAO_SIGNER_URL=127.0.0.1:8791
systemctl status wb-doubao-sign   # active 即成功
curl -s 127.0.0.1:8791/health     # 应返回 {"ok":true,"hasCookie":false}
```
**本机侧（持续）**：
- 保持 `doubao_sign.js` 运行（它每 30 分钟把 cookie 推到 112 的 `POST /api/doubao/upload-cookie`）。
- 部署完成后，本机浏览器开一次 `http://127.0.0.1:8791/sync-cookie` 立即推一版登录态；之后全自动续传。
- 校验：`curl -s 127.0.0.1:8791/health` 的 `hasCookie` 变 `true`。

> `web_server.py` 的 `run_doubao_checkin()` 已支持 `DOUBAO_SIGNER_URL`：112 设了该变量后，每日自动签到直接调 112 本机签名服务，**彻底不依赖您电脑**。

#### 9.3 ⚠️ 诚实边界（两方案通用）
豆包「积分任务」（生成 PPT、用某个技能、创建日程等）本身需您在豆包**真做完**才领得到——平台校验真实使用，自动化只管「领」不管「做」。未完成任务弹窗如实标「⏳ 待完成」，绝不伪造领取。

---

## ⚙️ 设置页（手机网页内「⚙ 设置」入口）

设置页 `?view=settings` 提供傻瓜式配置，**所有更改持久化到 `settings.json`**（已 gitignored，含口令，禁入库），无需改代码、无需重启服务（口令/通知立即生效，定时时间热更新）。后端接口：`GET /api/settings`（读）、`POST /api/settings`（保存）、`POST /api/settings/test`（测试 Webhook）。

分为四个分组：

### 1. ⏰ 定时签到
| 字段 | 含义 | 默认 |
|------|------|------|
| 启用自动签到 `schedule_enabled` | 开关内置调度器 | `True` |
| 每日签到时间 `schedule_time` | 进程内守护线程按此时间每日自动 `run_daily_all()` | `08:35` |
| 开机自动运行（仅 exe 桌面版显示） | 写注册表 `HKCU\...\Run` 键 `WbCheckinCenter`，开机以 `--silent` 静默拉起 exe（不弹浏览器），配合内置调度实现「开机即无人值守」。本机 python 版 / 服务器模式不显示此项 | 关 |

> 改时间**热更新**（唤醒调度线程，无需重启）。若服务器另有 systemd 定时任务（`wb-checkin-daily.timer`）未关闭，会再跑一次——结果**幂等无副作用**。
>
> 补充（exe 版）：程序常驻期间每天到点自动签，**关掉浏览器页面不影响**；勾上「开机自动运行」后，电脑重启也不用再手动双击 exe。

### 2. 🔑 中心访问口令
| 字段 | 含义 |
|------|------|
| 当前状态 | 显示「页面已单独设置」或「沿用服务器环境变量」 |
| 新口令 `access_key` | 留空=不变；填写则**覆盖**环境变量 `WB_ACCESS_KEY`，保存后立即生效 |

> 设置后本机需用新口令访问（页面把口令存 `localStorage['wb_center_key']`，**不放在 URL**）。

### 3. 🎚 平台开关
按 `PLATFORM_TITLES` 列出每个平台一个开关（WorkBuddy / 百度千帆 / MiniMax Code / Qoder / Link AI / WPS 灵犀 / Trae Work / 华为码道）：
- 关掉的平台在 `get_center` 标 `disabled`、灰显「已停用」，并在 `run_daily_all` 中跳过；
- **派猫猫旅行**不在此列——它跟随 WorkBuddy（关 WorkBuddy 即关 travel）。

### 4. 🔔 完成通知
| 字段 | 含义 |
|------|------|
| 启用通知 `notify_on` | 总开关 |
| Webhook 地址 `notify_webhook` | 每日跑完自动推送摘要 |

支持的地址（填好点「测试推送」验证）：
- **PushPlus**：`https://www.pushplus.plus/send/你的token`（需先在 pushplus.plus 绑定微信）
- **Server酱**：`https://sctapi.ftqq.com/你的SendKey.send`（免费 5 条/天）
- **企业微信群机器人**：`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx`（进企业微信，非个人微信）

---

## 用法

### 1. 手动跑一次（先看效果）
双击 `run_checkin.bat`，或命令行：
```
cd /d "D:\path\to\workbuddy-signin"
run_checkin.bat
```
看 `checkin.log` 里的结果即可。

> `run_checkin.bat` 会**先自动刷新会话令牌**再签到（见下节），所以正常情况下你只管双击就行。

### 1.5 WorkBuddy 会话令牌自动刷新（新版客户端已加密本地会话文件）

**问题**：新版 WorkBuddy 把本地会话文件
`%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop.info`
里的 `accessToken` / `refreshToken` 等字段做了**静态加密**，读出来是
`{"$wbEncrypted":1,"envelope":"..."}`，`workbuddy_checkin.py` 再也拿不到明文。
以前靠人工维护的 `token.info` 副本不会自动更新 → 令牌一过期签到就断。

**方案**：`wb_token_dump.js` 用 **WorkBuddy 自带的二进制以 Node 模式**运行，
通过原生模块 `electron_browser_workbuddy_storage.loggerGet()` 取到主密钥，
把整个会话文件解密成明文。

- 不需要附加调试器、不需要 `--inspect`、不需要管理员权限；
- 不需要额外依赖（解密用 Node 内置 `crypto`）。

密钥链（已在 `app.asar` 中逆向确认）：

```
atRestSecretKey (base64, 32B, 来自原生模块 loggerGet())
  → symmetricKey = sha256(atRestSecretKey)               // 32B
  → protectorKeyId = sha256(symmetricKey).hex[:16]       // = 9127dea1b44020a7
  → 字段密文 = AES-256-GCM(symmetricKey, nonce, aad)
     aad = "WB-AAD\0" | 01 | lenPrefixed("WBEV1") | lenPrefixed("sym-v1")
           | uint32BE(suite) | lenPrefixed(keyId) | [kind] | [0] | [0]
```

**手动刷新**（会同时更新本机 `token.info` 并推送到 112）：

```
run_token_sync.bat                 # 刷新 + 上传
run_token_sync.bat --no-upload     # 只刷新本机
```

也可以直接调 Python：

```
python wb_token_sync.py            # 刷新 + 上传
python wb_token_sync.py --print    # 附带打印令牌片段，排障用
```

- 日志：`token_sync.log`（本机运行时也会追加进 `checkin.log`）。
- 刷新是**原子写**：先写临时文件再替换，解密失败时旧的 `token.info` 保持不动。
- 上传有**两条通道，前者失败自动降级到后者**：
  1. **SFTP**（默认）：直连 112 的 22 端口，`scp` 语义，写入 `/opt/wb-checkin/token.info`（`0600`）并回读 `md5sum` 校验；需要 `paramiko`。
  2. **HTTP 兜底**：POST 整份会话文件到 `https://bjzjsf.asia/checkin/api/wb/upload-token?k=<口令>`，
     服务端收下后同样**原子落盘**到 `WB_TOKEN_FILE`。服务端会做两道校验——访问口令 + 可选的来源 IP 白名单
     （`WB_UPLOAD_ALLOW_IPS`，逗号分隔；不设则只校验口令）。**走这条通道不需要 paramiko。**
- `run_token_sync.bat` / `run_checkin.bat` 会自动挑选带 `paramiko` 的解释器
  （依次尝试 `%USERPROFILE%\.workbuddy` / `%USERPROFILE%\.workbuddy-ai` 自带解释器、系统 `python`），
  都没有时走 HTTP 兜底，仍然能推到服务器。
- 令牌剩余有效期不足 3 天会在日志里告警——打开一次 WorkBuddy 让它自动续期即可。
- **落盘后不需要重启服务**：`_session()` 每次调用现读盘，没有内存缓存，下一次签到就用新令牌。
  （对照：豆包的 cookie 因为服务端有内存缓存，才需要热加载 + 重启路径。）

### 2. 设置每天自动跑（本机，一次设置长期有效）
推荐：双击 `install.bat`（写好开机自启），然后进设置页填「每日签到时间」并保存——调度在 `web_server.py` 进程内，不用再配 Windows 任务计划。
旧方式（仍可用）：管理员 PowerShell 跑 `.\setup_task.ps1`，每天 09:10 由系统任务计划触发 `run_checkin.bat`，结果写在 `checkin.log`。
> ⚠️ 两种方式别同时启用，否则一天签两次。本机模式用 `install.bat` + 设置页即可。

### 3. 手机打开网页签到（想手动签的时候用）
双击 `start_web.bat` 启动服务（或 `install.bat` 已起），窗口打印**手机访问地址**（需连同一 WiFi）；本机默认 `http://localhost:8765`。手机浏览器打开即可看积分和「立即签到」按钮。
- 防火墙首次弹窗选「允许访问（专用网络）」。
- 想开机自启：双击 `install.bat`（推荐）或 `install_autostart.bat`。取消就删启动文件夹里的对应 VBS（`wb-checkin-local.vbs` / `WorkBuddyCheckinWeb.vbs`）。
- 加访问口令：在设置页「🔑 中心访问口令」改，或 `.env` 设 `ACCESS_KEY=你的口令`（服务器用 `WB_ACCESS_KEY`），手机首次访问需输入一次。
- 配凭据：设置页「🗝️ 凭据向导」，有弹窗采集脚本的平台一键登录写盘，其余粘贴 token / Cookie。

### 4. 服务器自动签到 + 手机网页查看（已部署到云服务器 ✅）

**签到已由服务器自动完成**：`web_server.py` 进程内的调度线程每天按 `settings.json` 的 `schedule_time` 自动签到（恢复后会补跑），你什么都不用做。网页 `http://<你的服务器IP>/checkin/`（或域名）只是**用来看记录**；按钮是**手动备用**——万一定时没跑成功，点一下即可补签。

| 项目 | 值 |
|------|----|
| 查看地址 | **http://<你的服务器IP>/checkin/**（或你的域名）|
| 访问口令 | 由 `.env` 的 `ACCESS_KEY`（或服务器 `WB_ACCESS_KEY` 注入），也可在「⚙ 设置」页改；不写代码、不入库 |
| 自动签到 | `web_server.py` **进程内置调度线程**（读 `settings.json` 的 `schedule_time`），一次跑完所有平台，任一失败不阻塞其余 |
| 网页服务 | systemd `wb-checkin`，监听 `127.0.0.1:8790` |
| nginx | `location /checkin/` 反代；全站已下发安全头，并已阻断 `/.git`、`*.bak` 等敏感路径 |
| 服务端目录 | `/opt/wb-checkin`（含 web_server.py / wb_icon.py / workbuddy_checkin.py / wb_growth.py / token.info / 各 *_last_run.json / 各平台凭据文件 / settings.json）|
| 本地部署 | `python deploy_ui.py`（上传代码 + 凭据 + 重启服务，最小化不碰口令）；该脚本为本地私有、未入库，新用户可用 `scp`/`rsync` 按上表目录结构手动部署 |

> 原理：签到由服务器自己读本地凭证、调官方接口完成，**完全不经过你的电脑**，电脑关机也无所谓。

服务器运维（SSH 登录 ECS 后执行）：
```bash
systemctl status wb-checkin                     # 网页服务状态（内置调度线程随它启动）
journalctl -u wb-checkin -n 30                  # 看运行 / 自动签到日志
systemctl restart wb-checkin                    # 重启网页服务
python3.11 /opt/wb-checkin/web_server.py --daily   # 手动跑一次签到（前台看结果）
nginx -t && systemctl reload nginx              # 改完 nginx 配置后校验 + 热加载
```
> 服务器上 `python3` 是 3.6.8，跑不动本项目的 f-string/语法，**必须用 `python3.11`**。

### 服务器安全加固（2026-10-14 审计）

nginx 侧现状与已做加固，记录备查：

| 项目 | 状态 |
|------|------|
| 访问日志 | ✅ `/var/log/nginx/access.log`（`main` 格式，含 IP / UA / X-Forwarded-For），logrotate 每日轮转、保留 10 天、gzip 压缩 |
| 安全头 | ✅ 全站下发 `X-Content-Type-Options: nosniff`、`X-Frame-Options: SAMEORIGIN`、`Referrer-Policy: strict-origin-when-cross-origin`；443 段另有 `Strict-Transport-Security` |
| 敏感路径阻断 | ✅ `/.git`、`/.github`、`/.svn`、`/.hg`、`/.bzr`、`/.env`、`/.DS_Store`，以及 `*.bak`、`*.old`、`*.orig`、`*.swp`、`*.save` 一律返回 404 |
| 限流 | ❌ 未做。nginx 未编译 `limit_req` / `limit_conn` 模块，且约 97% 流量来自本页自身轮询，故计划改为应用层限流（待办） |

**`Referrer-Policy` 为什么用 `strict-origin-when-cross-origin` 而不是 `no-referrer`**：跨站请求只发 origin（不含路径和查询串），已足够阻止 `?k=` 访问口令随 Referer 外泄，同时不破坏同源跳转，兼容性最好。

**`add_header` 的继承坑**：子级 `location` 只要写了任意一条 `add_header`，父级 / server 级的**全部** `add_header` 立即失效。因此 `location /` 和 `location /mywork/` 里各重复了一遍安全头。

**配置文件与回滚**：`/etc/nginx/conf.d/ip_direct.conf`（同一文件内承载 80 与 443 两个 server 块）。改动前已备份为 `ip_direct.conf.bak.security-<时间戳>`，回滚只需 `cp -a` 覆盖回去再 `nginx -t && systemctl reload nginx`。

---

## WorkBuddy 成长中心 · 一键完成任务

签到中心网页的 WorkBuddy 卡片底部有两个入口胶囊：「🌱 成长中心」和「🎯 每日任务」，点击在**当前页面弹窗**打开（与「派猫猫旅行」同一套卡内弹窗机制，不跳页、不新开标签），可一键领取成长任务奖励、显示任务完成状态（`?view=growth` / `?view=daily` 整页入口仍保留为兜底）。

- 自动 `accept` 全部成长任务；
- 对**已真实完成**的任务，一键 `claim` 领取积分/能量（幂等，重复点不重复领）；
- 对未完成任务，尽力上报对应行为事件（best-effort），并标出哪些还需手动操作。

**⚠️ 重要限制**：成长任务计分由服务端校验**真实产品交互**（真实召唤专家、打开 Buddy、用模板、夜间访问等）。仅靠 API 上报合成事件**不会**被计入进度，因此「一键完成」**无法凭空点亮需真实操作的任务**——只能领取已完成的奖励。两个纯人工任务（关注公众号、真实捐款）天然不可自动化。

接口：`GET /api/growth` → 当前成长卡片；`POST /api/growth/run` → 后台启动一键完成（前端轮询）。实现模块：`wb_growth.py`。

---

## 常见问题

- **卡片上方多了条「N 个平台凭据马上要过期」的横幅**：这是**到期预警**，不是故障。它点名了哪些平台凭据快失效、还剩几天，并按紧急度排序（🔴 <3 天在前，🟡 <7 天在后）；点右侧 × 可暂时收起。卡片本体也会多一行「凭据有效期」，同样带颜色。到期后对应卡片才会变成「登录态过期」、当天签到失败——所以趁横幅还在时去更新最省事（按 README「配置各平台凭据」那节操作即可）。若某平台显示「未知」，是因为它的凭据文件里**没有过期信息**（详见上面第 3 步的说明），不是程序没算。
- **提示 token 已过期**：很久没开 WorkBuddy 了。打开一次 WorkBuddy 登录即刷新凭证，再运行脚本。
- **签到接口报网络错误**：公司网下若命中代理失败，脚本自动改走直连；仍失败则确认能访问对应官网。
- **今天已经签过**：脚本会识别并跳过，属正常。
- **手机打不开网页**：① 手机电脑同一 WiFi；② `start_web.bat` 窗口还开着；③ 防火墙点了「允许」；④ 换网后电脑 IP 可能变，回看窗口最新地址。
- **网页版和计划任务冲突吗**：不冲突，两边调用同一接口，幂等，谁先签都行。
- **Qoder 卡片显示「登录态过期」**：`qoder_token.txt` 失效，约 1 个月有效期。重新从本机已登录的 Qoder 客户端取出最新 token、经 `deploy_ui.py` 部署到服务器即可（服务端不会自动刷新，否则会顶掉你本机客户端登录态）。
- **Coze 卡片显示「未配置」**：`coze_cookie.txt` 缺失或 Cookie 过期（约 60 天）。浏览器登录 coze.cn 后从 DevTools → Application → Cookies 复制全部 cookie 存为 `coze_cookie.txt`，再 `deploy_ui.py` 推 112。
- **华为卡显示「登录态过期」**：本机模式 / exe 版点华为卡「更新凭据」→「🌐 打开浏览器登录」一键恢复（登录完成自动写回、现读盘立即生效）；服务器侧由本机 `huawei/` 工具链维持（`hw_keeper.js` + `hw_autopush.py` 自动推送，本机需常驻运行），本机守护停了再双击 `huawei/relogin_huawei.bat`。
- **一键登录窗口突然关闭 / 卡片报错**：先分两种情况——①窗口在登录完成后自动关闭是**正常行为**（采到即退）；②还没登录完就闪退，看 `capture_logs/<平台>.log` 里最后的输出（脚本每次启动都会重写日志），常见是脚本崩溃（`FATAL`）或超时退出（6 分钟未检测到登录态）。
- **卡片提示「华为接口没返回数据」**：登录态失效或不完整，重新点一次一键登录即可；这是给人话的替代报错（旧版会甩英文 `Expecting value: line 1 column 1`）。
- **华为卡想从网页直接登录**：卡片 / 详情页点「🔑 配置会话 Cookie」，从浏览器 DevTools 复制登录后的华为 Cookie 粘贴保存即可（因 `J_SESSION_ID` 是 HttpOnly，JS 读不到，无法做「输账号密码自动登录」；粘贴方案是最诚实可行的网页登录方式）。保存后寿命仍仅 30~60 分，够当下立即签到一次。
- **Link AI 卡显示「登录态过期」**：`linkai_token.txt` 的 JWT 失效。登录 `link-ai.tech/console/account` 复制新的 API Token 覆盖该文件，经 `deploy_ui.py` 推到 112 后**重启服务**即可（该文件历史上是启动时读一次，现已改为现读盘，但仍建议重启一次确保干净）。
- **Link AI 的图片验证码怎么解决的**：已用纯代码自动绕过，**不再需要手动签到**。原理：
  - Link AI 用的是开源 **AJ-Captcha** 的 `blockPuzzle`（滑块）模式；签到按钮点击链是 `ja()` → `za("blockPuzzle")` → 拿 `captchaVerification` 提交。
  - 两个关键利用点：① `/api/captcha/get` 与 `/api/captcha/check` **完全无鉴权**，不需要 Authorization；② 服务端把【完整原图】和【缺口小块】一起下发，小块带 alpha 通道，是原图上抠出来的 → 可用「alpha 掩膜 + 逐列像素差」精确反推缺口的真实 x 坐标。
  - 签名是硬编码密钥的 AES：`captchaVerification = AES_ECB_PKCS7(secretKey, token + '---' + '{"x":距离,"y":5}')`，前端密钥 `XwKsGlMcdPMEhR1B`。
  - 背景图上那三个白色拼图轮廓是**干扰项**，模板匹配的最优解与次优解差异呈断层（如 22.96 vs 39.50），可视化确认精确命中真缺口。
  - 实现见 `lk_captcha_solver.py`，`solve_captcha()` 一把返回 `captchaVerification`。本机与 112 服务器各跑 5 轮，成功率 **10/10**。
  - 该模块依赖 `pillow` / `numpy` / `pycryptodome`（112 上已装好）。

- **⚠️ Link AI 的三个返回码，别搞混**（这是本项目最容易误判的地方）：

  | 码 | 含义 | 是否表示「今天签过」 |
  |----|------|------------------|
  | `200` + `data.score` | 本次签到成功，拿到积分 | 是 |
  | `870` 签到失败 | **服务端要求滑块验证码** | **否——这个码是恒定的** |
  | `834` 今日已签到，请明日再来 | 重复签到被拒 | 是 |

  特别强调 **`870` 不含「今天是否已签」的信息**：不论今天签没签过，只要请求里没带 `captchaVerification`，它都返回 870。
  所以**不能靠它判断签到状态**。卡片里「今天签没签」是靠 `_lk_signed_today()` 回看
  `lk_last_run.json` 中当日 `ok == true` 的记录来判定的。
  只有**带上验证码**提交时，服务端才会区分出 `200`（本次成功）和 `834`（重复签到）。
- **设置改了不生效**：口令/通知即时生效；定时时间在保存时已热更新。若仍不对，确认 `settings.json` 已写入（被 gitignored，不会进仓库）。
- **豆包卡显示「需本机签名」/ 点「完成任务」没反应**：豆包写接口强制 `a_bogus` 浏览器实时签名，必须本机（或 112）有签名代理在跑。本机方案：确认 `doubao_signer.bat` 已启动且 `schtasks /query /tn DoubaoSignService` 状态 `Ready`；服务器方案（方案二）：确认 `systemctl status wb-doubao-sign` 为 active 且 `curl 127.0.0.1:8791/health` 的 `hasCookie` 为 true（未推登录态会签不了）。
- **豆包「一键完成任务」领不到积分**：豆包「积分任务」需您**在豆包真做完**（如真生成一次 PPT、真用某个技能），平台校验真实使用；未完成的任务弹窗会标「⏳ 待完成」，自动化无法替您做，也不伪造领取。
- **本机每次都要开 bat 吗**：不用。双击一次 `install_doubao_autostart.bat` 注册开机自启后，登录即自动拉起、崩溃自动自愈，再也不用手动开（`install_doubao_autostart.bat` 是一次性安装器，不是每天要跑）。
- **`doubao_signer.bat` 报 `EADDRINUSE: 8791`**：旧进程没退干净。bat 已内置启动前释放 8791；若仍报错，手动 `powershell "Get-NetTCPConnection -LocalPort 8791 | Stop-Process"` 再启动。
- **豆包 cookie 过期了**：方案一本机重新从 Edge 导出 cookie 覆盖 `doubao_cookie.txt`；方案二本机保持 `doubao_sign.js` 运行即可自动续传（约 30 天有效，偶尔没续到用最后一次同步顶着）。

---

## 技术细节（给想了解的人）

**WorkBuddy**（对应 `get_wb_card` / `run_wb_checkin`）：
- 签到：`POST https://copilot.tencent.com/v2/billing/meter/daily-checkin`
- 状态：`POST https://copilot.tencent.com/v2/billing/meter/checkin-activity-status`
- 余额：`POST https://copilot.tencent.com/v2/billing/meter/get-user-resource`（**必须带浏览器 `User-Agent`，否则 403**）
  - ⚠️ **两个口径别混**（否则数值虚高）：`Accounts[].CapacityRemainPrecise` 是资源包**生命周期总余额**；`Accounts[].CycleCapacityRemainPrecise` 是**本周期剩余**，官方客户端「可用积分」用的就是它。对周期型包（`CapacityType=4`，如「CodeBuddy个人体验版」按自然月发 500 分）用总量口径会把本周期已消耗的算成可用 —— 实测总量 4343 vs 客户端 3918，差额 424.65 正是体验版本周期已用。故本页可用余额取 `min(总量剩余, 本期剩余)`，另在详情里回显「资源包总量」供对照。
- 将过期积分：`POST https://www.workbuddy.cn/billing/meter/get-user-resource-free-packages`（注意**没有 `/v2`**）
  - 请求体必须带 `PackageCodes`（取 `get-user-resource` 返回的 `PackageCode` 去重）、`PageNumber`、`PageSize`，否则 400；
  - 逐个包读 `CycleCapacityRemainPrecise`（赠送包该字段才是实际剩余，`CapacityRemainPrecise` 可能为空串）与 `CycleEndTime`（UTC+8），按到期日汇总：卡面只显示最近一档「⏳ X 积分将于 MM-DD 过期」，下一行补 7/30 天合计；
  - 汇总口径与「可用积分」不完全一致（后者来自 `get-user-resource` 的状态过滤，会漏掉部分无周期/新批次包），只用于提醒哪天有积分到期，不复用为余额；结果缓存 5 分钟。
- 鉴权：`Authorization: Bearer <accessToken>` + `X-User-Id` + `X-Domain: copilot.tencent.com`
- token 来源：`%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop.info`

**MiniMax Code**（对应 `get_mm_card` / `run_mm_checkin`）：
- 接口：`POST https://platform.minimax.io/api/v1/credits/...`（每日 00:00 自动刷新 400 智点，积分跨 Agent/Code/API 通用——即 MiniMax Agent 与 MiniMax Code 是同一积分池，故不单独成卡）
- 凭据：`mm_web_token.json`（JWT，约 40 天）

**Qoder**（对应 `get_qd_card` / `run_qd_checkin` + 本机守护 `qoder_keeper/`）：
- 活动：`GET https://openapi.qoder.sh/sash/api/v1/me/campaigns`；领取：`POST .../campaigns/{id}/claim`（`replayed` 幂等）
- 最小鉴权：`Authorization: Bearer <token>` + `Cosy-ClientType: 10` + `Accept: application/json` + `User-Agent: Qoder`
- 可用 Credits：`GET https://openapi.qoder.sh/api/v2/quota/usage` → `addOnQuota.{total,used,remaining}`（token 即可，无需 cookie；该接口**只有汇总余额，没有逐包到期日**）
- 将过期积分：`GET https://qoder.com/api/v2/me/usages/big_model_credits`（**网页会话专属**，需 `qoder_cookie.txt` + `X-CSRF-TOKEN`，csrf 从 `/account/usage` 页 HTML 的 `window.csrfToken` 提取；dt- token 调它固定 401）
  - 按 `resource_package_quota.quota_detail[]`（缺失时退回 `total_quota.quota_detail[]`）的 `remaining_value` + `expires_at`（毫秒）汇总，跳过已过期/停用/退款及 `expires_at=0`（永不过期）的包；卡面显示最近一档到期量与 7/30 天合计；
  - **「即将到期」≠ 有积分将损失**：Qoder 网页给 5 天内到期的包打「即将到期」标（不论剩余多少），已用完的包也会打。服务端只汇总 `remaining_value > 0` 的包；若更早日期存在已用完的包，卡面补一行灰色「另有 N 个资源包 MM-DD 起到期（已用完）」，解释和官网页的差异。
  - **诚实边界**：cookie 失效时只显示 token 查到的总余额，不猜到期日、不编造数字；恢复只需按第 5 步重新导出 `qoder_cookie.txt`。
- **🔑 2026-09-27 破局：真正卡点 = 设备指纹头 `Cosy-Machine*`**（`MachineToken/Type/Code/Id/OS`），由本机 Qoder 客户端/CLI 自带的 `resources/umid/runtime-info.exe` 实时生成（阿里 securityguard SDK，`echo {"account":""} | runtime-info.exe` → stdout JSON）。**不带指纹 → campaigns 返回空数组（看似「没活动」，即旧结论「服务端拿不到入口」的真实根因）；伪造指纹 → 503 RISK_DEPENDENCY_UNAVAILABLE**。实测带指纹后 CLAIM_BENEFIT 活动立即可见并 claim 成功（+100，余额 597）。
- **架构**：指纹绑定本机硬件 → 服务端不可代领。本机 `qoder_keeper/qoder_keeper.py`（probe / run / --loop）负责真实领取，经 HTTP `/api/qoder/local-status?k=` 或 SFTP 把 `qoder_local_status.json` 推给服务器；`get_qd_card()` 优先渲染守护上报（`_qd_local_today`），无上报则诚实显示「待本机领取」。活动 key 不按天变（如 act-20260923-252）而轮次每日 10:00(UTC+8) 刷新，故领取逻辑为「领任何 CLAIMABLE 项」。
- 历史：早期「本地记录即已领」误判 → 改「桌面端独占」诚实提示 → 2026-09-27 发现**指纹可跨机重放**，升级为「本机守护 + 服务端代领」双路径（claim 幂等不重复发放），`_qoder_topup_loop` 已恢复为服务端代领线程。

**Coze 扣子**（对应 `get_coze_card` / `run_coze_checkin`，**自动卡**）：
- 扣子有**两套每日机制**，缺一不可：① 每日登录积分（登录自动发 60 新积分）；② **连续活跃**（客户端看到的「签到」）——官网原话「**每天和扣子聊一次，即可点亮**」，必须当天真的跟 Agent 聊一次、消耗积分才点亮（`active_map` 按 `consume_points>0` 判定），**光登录/领积分不算活跃**。只调发放接口不聊天 → 连续活跃永远 0 天（这正是「签到没成功」的根因）。
- 因此每日自动签到 = 调官网同款发放接口（幂等，当日只发一次）+ **自动跟 Agent 发一句极简聊天**（动态取会话 `conversation/list_v35`，不写死 ID；约耗 1~2 积分，本就当天过期）点亮活跃日。同日重复签到只聊一次（记录 `chat_done` 幂等）。连续活跃满 7/14/30 天另有 80/200/400 积分（连续相伴任务）。
- **🔑 2026-11-10 单位改造核对**：官网「剩余积分 60」与旧文案「1500 活动分」并非矛盾——扣子积分单位升级，**新积分 = 原积分 ÷ 25**（官方 banner 原话），每日登录旧 1500 活动分 = 新 **60 积分**。`get_trade_conf` 同时返回 `scene_switch`（新 60）与 `scene_switch_origin`（旧 1500）。
- **过期规则（实测）**：活动积分在**发放当日 23:59:59 过期**（`credit/balance/detail` 的 `expired_at` 时间戳），当天不用即清零。自动聊天把当天必过期的积分用来点亮活跃，一举两得。
- 接口均可**仅凭 Cookie 服务端直调，无需 a_bogus 签名**：`POST incentive/activity/reward`（发放/当日状态）、`GET credit/balance/detail`（逐包余额+到期）、`GET get_trade_conf`（每日额度）、`POST bff/conversation/list_v35`（取会话）、`POST coze_claw/message/chat`（发聊天点亮活跃）。注意 `GET achievement/active_map`（连续活跃天数）需 a_bogus、裸调 404，故不依赖它，活跃以当日聊天成功为准。
- 凭据：`coze_cookie.txt`（Cookie 串，含 `sessionid`/`sid_guard`，约 60 天）

**华为码道 DevCloud**（对应 `get_hw_card` / `run_hw_checkin`，**自动卡**）：
- 端点前缀 `https://devcloud.cn-north-4.huaweicloud.com/chat/PromptCenterService/v1/ops/`，每日签到需带浏览器同款头（`cftk` CSRF）否则回 SPA HTML。
- **签到本身是全自动的**：服务器按 `schedule_time` 每天自动 claim + confirm，`hw_last_run.json` 显示长期每天 `ok:true`「+1000 积分」。
- 唯一的维护点是**会话 Cookie 短效**（静置 30~60 分失效）：本机 `hw_keeper.js` 无头常驻每 5 分刷新 + `hw_autopush.py` 推 112，维持服务器那份会话可用。本机没开机/守护停了 → 华为卡转「登录态过期」→ 双击 `huawei/relogin_huawei.bat` 恢复。
- **网页直接登录（2026-11-17 升级为一键）**：本机模式 / exe 桌面版点华为卡「🔑 更新凭据」→「🌐 打开浏览器登录」，`huawei_login.js` 弹独立 Edge 登录后自动采 cookie 写 `hw_cookie.txt`（判据与防抢跑见「凭据一键更新」节）。服务器模式仍走「🔑 配置会话 Cookie」粘贴（HttpOnly 无法网页自动登录）。
- **cookie 现读盘**：`_hw_cookie()` 每次调用现读文件（环境变量 `HW_COOKIE` 优先），本机/服务器一键写回或粘贴保存后**立即生效，无需重启**；`_hw_api()` 遇接口返回空/HTML（登录态失效、被 WAF 拦）时抛人话错误「请重新一键登录」，不再裸抛 `Expecting value`。

**千帆 / Link AI / WPS 灵犀 / Trae**：均为标准 token 或 Cookie 串鉴权，凭据见 `config.example.json`，过期后重新导出并经 `deploy_ui.py` 部署。

其中 **Link AI**（对应 `get_lk_card`，**自动卡**）：签到接口 `/sign/in` 要求滑块验证码
（未带验证码时返回 `code=870`），现已由 `lk_captcha_solver.py` **自动破解**，
签到全自动完成。该模块的完整原理与三个返回码的区分见上方 FAQ
「Link AI 的图片验证码怎么解决的」。
（历史：曾标「需手动」并提供「✅ 我已在网页签到」按钮，
`set_lk_manual_signed()` 保留作向后兼容，老记录仍能正确显示已签。）

其中 **Trae Work**（对应 `get_trae_card` / `run_trae_checkin`）：
- 签到：`POST https://api.trae.cn/trae/api/v2/ug/checkin_credits/claim`（`req_source=2`，客户端通道）
- 鉴权：`Authorization: Cloud-IDE-JWT <cookie 换发的 JWT>` + `x-device-id: <你的真实设备 id>`
- `code=9004`（参数/通道不符）→ 此前臆加的 `x-device-model/-system/-client-version` 三个头服务端不认，现已移除、仅保留客户端真实使用的 `x-device-id`。
- `code=9074`（当前参与用户太多）→ **真因是伪设备 id，不是限流、也不是令牌体系问题**。服务端按「设备」记账：用随机伪设备 id（`wb-xxxx`）会被直接拒；必须用**你自己的 Trae 客户端真实设备 id**（`env TRAE_DEVICE_ID` 或 `trae_device_id.txt`）。实测真实设备 id + cookie 换发的 JWT + `req_source=2` 即 `code=0 success`（`did_checked_in:true`），**无需导出桌面 userInfo.token**。
- **⚠️ Trae 设备 id 必配**：从你自己的 `TRAE SOLO CN` 客户端取真实设备 id（见下方「开源首次配置指南 · 第 4 步」），写入 `trae_device_id.txt` 或环境变量 `TRAE_DEVICE_ID`。留空会导致 9074、无法自动签。

**豆包 Doubao**（对应 `get_doubao_card` / `run_doubao_checkin` + 本机 `doubao_sign.js` / 服务器 `doubao_sign_server.js`）：
- **死结**：写接口（签到 `checkin`、领奖 `alice/ug/campaign/item/reward/claim`）强制 `a_bogus` 动态签名，由豆包网页 JS 在真实浏览器发请求时现场哈希（参数+时间戳+浏览器指纹），函数锁死在闭包，服务器无法复现；仅持 cookie 裸调 → `710010702` 拒绝。
- **中继通道**：网页 `POST /api/doubao/request-sign`（签到）/`request-tasks`（领奖）写 pending → 本机/服务器签名器轮询 `GET /api/doubao/poll[-tasks]` 取指令 → 在真实浏览器内 fetch（自动带 a_bogus）→ 回写成功。
- **任务真实字段**（校准过）：`campaign_code`（如 `browser_tool`、`pc_task_generate_ppt_v2`）、`campaign_group_code: pc_incentive_task_mvp_v3`、`reward_summaries:[{reward_amount,reward_type:"quota_grant"}]`、`task_status`（1=待完成 / 2=可领 / 3=已领）、`task_kind`（daily_signin / chat_activity）。**领奖只对已完成（status 2/3）领取**，未完成的如实标「待完成」。
- **方案二登录态搬运**：本机 `doubao_sign.js` 每次成功操作后 + 每 30 分 + `/sync-cookie` 手动，把浏览器 context 的 cookie 推到 `POST /api/doubao/upload-cookie`（中心 key 鉴权），112 存 `doubao_cookies_server.json`；`doubao_sign_server.js` 读它代签。
- **端口**：签名器监听 `127.0.0.1:8791`；`DOUBAO_SIGNER_URL` 指向它时，112 的 `run_doubao_checkin()` 直接调 `signer + "/sign"`。
- **诚实映射**：仅对接口明确可领的任务领奖；任务积分需真实使用才可领，弹窗如实显示状态与失败 code，绝不谎报。
