# 多平台积分签到中心（WorkBuddy 每日签到）

一个纯标准库 Python 单文件服务（`web_server.py`），把多个 AI 平台的「每日积分/活动分」签到聚合成一个手机网页：**后台定时自动签，手机随时看状态、可一键补签**。

> 设计铁律：**单文件 SPA**——改 UI 只动 `web_server.py` 内联的 `PAGE` 字符串，不引外部静态文件；部署就是 scp 一个文件到服务器。所有凭据/状态文件**平铺在项目根目录**，服务端按平铺路径读取（这是线上部署依赖的约定，勿擅自改成子目录）。

---

## 它能签到哪些平台

卡片顺序 = `web_server.py` 中 `ADAPTERS` 字典的插入顺序。**共 9 张卡**：8 张全自动 + 1 张手动（华为）。

| 平台 | 官网 | 每日奖励 | 凭据文件（根目录） | 维护频率 |
|------|------|---------|------------------|----------|
| WorkBuddy | workbuddy.cn | 100 积分 | `token.info` | 打开一次客户端自动续期 |
| 百度千帆 | qianfan.baidu.com | — | `qf_token.txt`（另一台 ECS 同步） | 自动 |
| MiniMax Code | platform.minimax.io | 400 智点 | `mm_web_token.json` | 约 40 天，过期重新登录 |
| Qoder | qoder.com | 100 Credits | `qoder_token.txt` | 约 1 个月，失效重新取出 |
| Link AI | console.link-ai.tech | — | `linkai_token.txt` | 不定期 |
| WPS 灵犀 | lingxi.wps.cn | 100 智点 | `lx_cookie.txt` | 不定期需重新导出 Cookie |
| Trae Work | work.trae.cn | 150+50 积分 | `trae_cookie.txt` | 约 14 天，需重新导出 Cookie |
| **Coze 扣子** | coze.cn | 1500 活动分（登录自动发） | `coze_cookie.txt` | 约 60 天，过期重新导出 Cookie |
| 华为码道（手动卡） | devcloud.cn-north-4.huaweicloud.com | — | `hw_cookie.txt`（本机 `hw_autopush.py` 自动同步） | 会话失效后双击 `huawei/relogin_huawei.bat` |

> **派猫猫旅行**已并入 WorkBuddy：它共用 WorkBuddy 登录态，在 WorkBuddy 卡内作为弹窗入口，不单独成卡、也不在设置页单独配置（开关跟随 WorkBuddy）。
>
> **CodeBuddy / MiniMax Agent** 曾经加过，但实测与 WorkBuddy / MiniMax Code 是同一套登录态、同一笔积分，属重复项，已删除。
>
> 卡片为响应式 CSS Grid：`<600px 单列 / ≥600px 两列 / ≥920px 三列 / ≥1240px 四列`；详情是**真模态弹窗**（× / 点遮罩 / Esc 三种关闭），每卡右下角「🌐 前往官网登录」跳官方站点。

---

## 目录结构

```
workbuddy-signin/
├─ web_server.py          ← 核心：HTTP 服务 + 签到中心单页（PAGE 内联全部 HTML/CSS/JS）
├─ wb_icon.py             ← 各平台官方图标（SVG/PNG，运行时注入 PAGE）
├─ wb_travel.py           ← 派猫猫旅行（WorkBuddy 卡内弹窗）逻辑
├─ wb_growth.py           ← WorkBuddy 成长中心 / 每日任务 一键完成
├─ workbuddy_checkin.py   ← 核心签到逻辑（找 token → 查状态 → 签到，CLI 供 timer）
├─ deploy_ui.py           ← 最小化 UI 部署：传 web_server.py + 凭据、重启 wb-checkin（不碰口令）
├─ envconf.py             ← 本地运维脚本统一从 .env 读 ECS/ACCESS_KEY
├─ config.example.json    ← 各平台凭据文件/环境变量说明模板（不进仓库）
├─ start_web.bat          ← 启动网页服务并打印手机访问地址
├─ run_checkin.bat        ← 本机手动跑一次每日签到
├─ setup_task.ps1         ← 注册 Windows 计划任务（本机每日自动跑）
├─ install_autostart.bat  ← 网页服务开机后台自启（无需管理员）
├─ trae_capture.js        ← Trae Cookie 抓取脚本（本机从浏览器导出）
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
| `web_server.py` | 手机网页版服务：9 个平台签到适配器 + 单页 UI；`--daily` 模式供服务器定时跑全部平台 |
| `wb_icon.py` | 各平台官方图标（64×64 圆角内联 SVG/PNG，含 Coze 官方 logo 已 base64 内联） |
| `wb_travel.py` | 派猫猫旅行（WorkBuddy 卡内弹窗）逻辑，共用 WorkBuddy 登录态 |
| `wb_growth.py` | WorkBuddy 成长中心 / 每日任务 一键完成（纯标准库） |
| `workbuddy_checkin.py` | WorkBuddy 核心脚本：读 token → 查状态 → 未签则签到 |
| `deploy_ui.py` | 最小化 UI 部署：上传 `web_server.py`+凭据、重启 `wb-checkin`（不改口令、不触发签到） |
| `envconf.py` | 本地运维脚本统一从项目根 `.env` 读取 `ECS_HOST/PORT/USER/PASS/ACCESS_KEY` |
| `config.example.json` | 各平台凭据文件 / 环境变量 / 获取方式说明模板（不进仓库） |
| `start_web.bat` | 启动网页版服务，打印手机访问地址 |
| `install_autostart.bat` | 可选：网页版开机自动后台运行（无需管理员） |

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

## ⚙️ 设置页（手机网页内「⚙ 设置」入口）

设置页 `?view=settings` 提供傻瓜式配置，**所有更改持久化到 `settings.json`**（已 gitignored，含口令，禁入库），无需改代码、无需重启服务（口令/通知立即生效，定时时间热更新）。后端接口：`GET /api/settings`（读）、`POST /api/settings`（保存）、`POST /api/settings/test`（测试 Webhook）。

分为四个分组：

### 1. ⏰ 定时签到
| 字段 | 含义 | 默认 |
|------|------|------|
| 启用自动签到 `schedule_enabled` | 开关内置调度器 | `True` |
| 每日签到时间 `schedule_time` | 进程内守护线程按此时间每日自动 `run_daily_all()` | `08:35` |

> 改时间**热更新**（唤醒调度线程，无需重启）。若服务器另有 systemd 定时任务（`wb-checkin-daily.timer`）未关闭，会再跑一次——结果**幂等无副作用**。

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
cd E:\workspace\workbuddy-signin
run_checkin.bat
```
看 `checkin.log` 里的结果即可。

### 2. 设置每天自动跑（本机，一次设置长期有效）
以**管理员身份**打开 PowerShell：
```powershell
cd E:\workspace\workbuddy-signin
.\setup_task.ps1
```
之后每天 09:10 自动签到，结果记录在 `checkin.log`。立即验证：
```powershell
schtasks /run /tn WorkBuddyDailyCheckin
```

### 3. 手机打开网页签到（想手动签的时候用）
双击 `start_web.bat` 启动服务，窗口打印**手机访问地址**（需连同一 WiFi）。手机浏览器打开即可看积分和「立即签到」按钮。
- 防火墙首次弹窗选「允许访问（专用网络）」。
- 想开机自启：双击 `install_autostart.bat`（无需管理员）。取消就删启动文件夹里的 `WorkBuddyCheckinWeb.vbs`。
- 加访问口令：在 `.env` 设 `ACCESS_KEY=你的口令`（或服务器 `WB_ACCESS_KEY`），重启服务后手机首次访问需输入一次。

### 4. 服务器自动签到 + 手机网页查看（已部署到云服务器 ✅）

**签到已由服务器自动完成**：systemd 定时器 `wb-checkin-daily.timer` 每天 08:35 自动签到（恢复后会补跑），你什么都不用做。网页 `http://<你的服务器IP>/checkin/`（或域名）只是**用来看记录**；按钮是**手动备用**——万一定时没跑成功，点一下即可补签。

| 项目 | 值 |
|------|----|
| 查看地址 | **http://<你的服务器IP>/checkin/**（或你的域名）|
| 访问口令 | 由 `.env` 的 `ACCESS_KEY`（或服务器 `WB_ACCESS_KEY` 注入），也可在「⚙ 设置」页改；不写代码、不入库 |
| 自动签到 | systemd `wb-checkin-daily.timer` → 每天 08:35 触发 `wb-checkin-daily.service`（执行 `web_server.py --daily`，一次跑完平台，任一失败不阻塞其余）|
| 网页服务 | systemd `wb-checkin`，监听 `127.0.0.1:8790` |
| nginx | `location /checkin/` 反代 |
| 服务端目录 | `/opt/wb-checkin`（含 web_server.py / wb_icon.py / workbuddy_checkin.py / wb_growth.py / token.info / 各 *_last_run.json / 各平台凭据文件 / settings.json）|
| 本地部署 | `python deploy_ui.py`（上传代码 + 凭据 + 重启服务，最小化不碰口令）|

> 原理：签到由服务器自己读本地凭证、调官方接口完成，**完全不经过你的电脑**，电脑关机也无所谓。

服务器运维（SSH 登录 ECS 后执行）：
```bash
systemctl list-timers wb-checkin-daily.timer    # 看下次自动签到时间
systemctl status wb-checkin                     # 网页服务状态
journalctl -u wb-checkin-daily.service -n 30    # 看自动签到日志
systemctl start wb-checkin-daily.service        # 手动立刻跑一次（不影响定时）
systemctl restart wb-checkin                    # 重启网页服务
python3 /opt/wb-checkin/web_server.py --daily   # 手动跑一次签到（前台看结果）
```

---

## WorkBuddy 成长中心 · 一键完成任务

签到中心网页的 WorkBuddy 卡片底部有两个入口胶囊：「成长中心」（`?view=growth`）和「每日任务」（`?view=daily`），都是新开页，可一键领取成长任务奖励、显示任务完成状态。

- 自动 `accept` 全部成长任务；
- 对**已真实完成**的任务，一键 `claim` 领取积分/能量（幂等，重复点不重复领）；
- 对未完成任务，尽力上报对应行为事件（best-effort），并标出哪些还需手动操作。

**⚠️ 重要限制**：成长任务计分由服务端校验**真实产品交互**（真实召唤专家、打开 Buddy、用模板、夜间访问等）。仅靠 API 上报合成事件**不会**被计入进度，因此「一键完成」**无法凭空点亮需真实操作的任务**——只能领取已完成的奖励。两个纯人工任务（关注公众号、真实捐款）天然不可自动化。

接口：`GET /api/growth` → 当前成长卡片；`POST /api/growth/run` → 后台启动一键完成（前端轮询）。实现模块：`wb_growth.py`。

---

## 常见问题

- **提示 token 已过期**：很久没开 WorkBuddy 了。打开一次 WorkBuddy 登录即刷新凭证，再运行脚本。
- **签到接口报网络错误**：公司网下若命中代理失败，脚本自动改走直连；仍失败则确认能访问对应官网。
- **今天已经签过**：脚本会识别并跳过，属正常。
- **手机打不开网页**：① 手机电脑同一 WiFi；② `start_web.bat` 窗口还开着；③ 防火墙点了「允许」；④ 换网后电脑 IP 可能变，回看窗口最新地址。
- **网页版和计划任务冲突吗**：不冲突，两边调用同一接口，幂等，谁先签都行。
- **Qoder 卡片显示「登录态过期」**：`qoder_token.txt` 失效，约 1 个月有效期。重新从本机已登录的 Qoder 客户端取出最新 token、经 `deploy_ui.py` 部署到服务器即可（服务端不会自动刷新，否则会顶掉你本机客户端登录态）。
- **Coze 卡片显示「未配置」**：`coze_cookie.txt` 缺失或 Cookie 过期（约 60 天）。浏览器登录 coze.cn 后从 DevTools → Application → Cookies 复制全部 cookie 存为 `coze_cookie.txt`，再 `deploy_ui.py` 推 112。
- **华为卡显示「登录态过期」**：本机双击 `huawei/relogin_huawei.bat` 重新登录一次；之后 `hw_keeper.js` + `hw_autopush.py` 会自动维持并推送（本机需常驻运行）。
- **设置改了不生效**：口令/通知即时生效；定时时间在保存时已热更新。若仍不对，确认 `settings.json` 已写入（被 gitignored，不会进仓库）。

---

## 技术细节（给想了解的人）

**WorkBuddy**（对应 `get_wb_card` / `run_wb_checkin`）：
- 签到：`POST https://copilot.tencent.com/v2/billing/meter/daily-checkin`
- 状态：`POST https://copilot.tencent.com/v2/billing/meter/checkin-activity-status`
- 余额：`POST https://copilot.tencent.com/v2/billing/meter/get-user-resource`（**必须带浏览器 `User-Agent`，否则 403**；`data.Response.Data.Accounts[].CapacityRemainPrecise` 求和即剩余积分）
- 鉴权：`Authorization: Bearer <accessToken>` + `X-User-Id` + `X-Domain: copilot.tencent.com`
- token 来源：`%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop.info`

**MiniMax Code**（对应 `get_mm_card` / `run_mm_checkin`）：
- 接口：`POST https://platform.minimax.io/api/v1/credits/...`（每日 00:00 自动刷新 400 智点，积分跨 Agent/Code/API 通用——即 MiniMax Agent 与 MiniMax Code 是同一积分池，故不单独成卡）
- 凭据：`mm_web_token.json`（JWT，约 40 天）

**Qoder**（对应 `get_qd_card` / `run_qd_checkin`）：
- 活动：`GET https://openapi.qoder.sh/sash/api/v1/me/campaigns`
- 领取：`POST https://openapi.qoder.sh/sash/api/v1/me/campaigns/{campaignId}/claim`
- 最小鉴权：`Authorization: Bearer <token>` + `Cosy-ClientType: 10` + `Accept: application/json` + `User-Agent: Qoder`
- 领取窗口：每日 **10:00（UTC+8）刷新，次日 09:59 截止，过期不可补领**——服务器定时器 08:35 跑的是「昨天 10:00 → 今天 09:59」窗口，正常每天领一次；若失败须赶在 09:59 前手动点补。

**Coze 扣子**（对应 `get_coze_card` / `run_coze_checkin`）：
- 每日登录自动发放 1500 活动分，**无独立 claim 接口**；卡为状态卡，Cookie 有效即「已配置」，并显示当日福利确认历史。
- 凭据：`coze_cookie.txt`（Cookie 串，含 `sessionid`/`sid_guard`，约 60 天）

**华为码道 DevCloud**（对应 `get_hw_card` / `run_hw_checkin`，手动卡）：
- 端点前缀 `https://devcloud.cn-north-4.huaweicloud.com/chat/PromptCenterService/v1/ops/`，每日签到需带浏览器同款头（`cftk` CSRF）否则回 SPA HTML。
- 会话寿命短（静置 30~60 分失效）→ 每天 08:35 自动签必失败；真解：本机 `hw_keeper.js` 无头常驻每 5 分刷新 + `hw_autopush.py` 推 112。本机没开机/守护停了 → 华为卡转「登录态过期」→ 双击 `huawei/relogin_huawei.bat` 恢复。

**千帆 / Link AI / WPS 灵犀 / Trae**：均为标准 token 或 Cookie 串鉴权，凭据见 `config.example.json`，过期后重新导出并经 `deploy_ui.py` 部署。

其中 **Trae Work** 需注意两种失败码：
- `code=9004`（参数/通道不符）→ 服务端走的是网页通道，须用客户端通道 `req_source=2` 并补齐设备头（已内置）。
- `code=9074`（当前参与用户太多）→ 服务端**并发限流**（早高峰最易触发），属可自愈的临时状态。程序会自动安排稍后重试（15/30/60/120 分钟共 4 轮），卡片此时显示角标「限流·稍后重试」，**无需人工干预、也不要反复手点**。
- 设备标识持久化在 `trae_device_id.txt`（首次自动生成，已 gitignore），请勿删除——每次重启换新设备 ID 更容易触发风控。
