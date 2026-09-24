# 多平台积分签到中心（WorkBuddy 每日签到）

一个纯标准库 Python 单文件服务（`web_server.py`），把多个 AI 平台的「每日积分/活动分」签到聚合成一个手机网页：**后台定时自动签，手机随时看状态、可一键补签**。

> 设计铁律：**单文件 SPA**——改 UI 只动 `web_server.py` 内联的 `PAGE` 字符串，不引外部静态文件；部署就是 scp 一个文件到服务器。所有凭据/状态文件**平铺在项目根目录**，服务端按平铺路径读取（这是线上部署依赖的约定，勿擅自改成子目录）。

---

## 它能签到哪些平台

卡片顺序 = `web_server.py` 中 `ADAPTERS` 字典的插入顺序。**共 10 张卡**：多数可全自动（WorkBuddy / 千帆 / MiniMax / 即梦 / 灵犀 / Trae / Coze）；Link AI 因接口强制图片验证码、服务端无法代签，需网页手动签到后卡片「✅ 我已在网页签到」确认；Qoder 卡片仍展示，但每日 100 Credits 因官方限制需**桌面端手动领**（不在服务端自动签到列表）；华为为手动卡，支持**网页粘贴会话 Cookie 直接登录**。

> 所有卡片底部统一显示「可用积分」（4 家真实有余额：即梦 / 千帆 / WorkBuddy / Link AI；其余接口不提供余额则诚实显示「—」）；即梦额外显示「88 积分将于 x月x日 过期」提示。

| 平台 | 官网 | 每日奖励 | 凭据文件（根目录） | 维护频率 |
|------|------|---------|------------------|----------|
| WorkBuddy | workbuddy.cn | 100 积分 | `token.info` | 打开一次客户端自动续期 |
| 百度千帆 | qianfan.baidu.com | — | `qf_token.txt`（另一台 ECS 同步） | 自动 |
| MiniMax Code | platform.minimax.io | 400 智点 | `mm_web_token.json` | 约 40 天，过期重新登录 |
| Qoder | qoder.com | 100 Credits（桌面端手动领） | `qoder_token.txt` | 约 1 个月，失效重新取出 |
| Link AI | console.link-ai.tech | 需网页手动签到后卡片确认（接口强制图片验证码，服务端无法代签） | `linkai_token.txt` | 不定期 |
| WPS 灵犀 | lingxi.wps.cn | 100 智点 | `lx_cookie.txt` | 不定期需重新导出 Cookie |
| Trae Work | work.trae.cn | 150+50 积分 | `trae_cookie.txt` | 约 14 天，需重新导出 Cookie |
| **Coze 扣子** | coze.cn | 1500 活动分（登录自动发） | `coze_cookie.txt` | 约 60 天，过期重新导出 Cookie |
| 即梦 AI | jimeng.jianying.com | 每日登录发放免费额度（实测 88 赠送积分） | `jimeng_cookie.txt` | 字节风控强，Cookie 周期失效需重捕 |
| 华为码道（手动卡） | devcloud.cn-north-4.huaweicloud.com | — | `hw_cookie.txt`（本机 `hw_autopush.py` 自动同步；亦支持网页「🔑 配置会话 Cookie」粘贴登录） | 会话失效后双击 `huawei/relogin_huawei.bat` |

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
│   linkai_token.txt  lx_cookie.txt  trae_cookie.txt  coze_cookie.txt  jimeng_cookie.txt
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
| `web_server.py` | 手机网页版服务：10 个平台签到适配器 + 单页 UI（含统一「可用积分」显示、即梦过期提示、华为网页登录、Link AI 手动确认）；`--daily` 模式供服务器定时跑全部平台 |
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

## 🚀 开源首次配置指南（Clone 后从零跑起来）

面向第一次拿到本仓库、想自己部署签到的用户。**核心代码已配置化，没有写死任何人的令牌 / 设备 id**—— clone 后只需按下面填好你自己的凭据即可。

### 0. 运行环境
- **Python 3.8+**（纯标准库，无需 `pip install`）
- 一台常驻机器跑 `web_server.py`（本机 / 云服务器均可）；手机同 WiFi 或经 nginx 反代访问网页

### 1. 启动服务（三选一）
- **本机试用**：双击 `start_web.bat`，窗口打印手机访问地址（需同 WiFi + 防火墙允许）。
- **服务器 systemd**（已部署示例）：`web_server.py` 监听 `127.0.0.1:8790`，由 nginx `location /checkin/` 反代；`wb-checkin-daily.timer` 每天 08:35 自动签到。
- **手动前台**：`python web_server.py --daily` 跑一次签到；`python web_server.py` 起网页服务。

### 2. 配置访问口令（建议）
- 环境变量 `WB_ACCESS_KEY`（服务器 systemd 注入）或本地 `.env` 的 `ACCESS_KEY`。
- 留空 = 不校验口令。设置后手机首次访问需输入一次，存 `localStorage`，不写 URL。

### 3. 配置各平台凭据
所有凭据**平铺在项目根目录**（文件名固定），或等价的同名环境变量（优先级：环境变量 > 本地文件）。两份模板已给出：
- `config.example.json`：每个平台的「凭据文件 / 环境变量 / 如何获取」说明
- `.env.example`：环境变量模板（复制为 `.env` 填值）

| 平台 | 凭据文件 | 环境变量 | 获取方式（详见 config.example.json） |
|------|---------|---------|--------------------------------------|
| WorkBuddy | `token.info` | `WB_TOKEN_FILE` | 打开一次客户端，token 自动写入本地 |
| 千帆 | `qf_token.txt` | `QF_ACCESS_TOKEN` / `QF_BASE_URL` | 千帆官网登录后取 token |
| MiniMax Code | `mm_web_token.json` | `MM_WEB_TOKEN` | agent.minimax.cn 网页端 localStorage._token |
| Qoder | `qoder_token.txt` | `QODER_TOKEN` | 桌面客户端取出（仅状态展示，领取见第 5 步） |
| Link AI | `linkai_token.txt` | `LINKAI_TOKEN` | 平台生成的 API token |
| WPS 灵犀 | `lx_cookie.txt` | `LX_COOKIE` | 浏览器 DevTools → Application → Cookies 全复制 |
| **Trae Work** | `trae_cookie.txt` + `trae_device_id.txt` | `TRAE_COOKIE`/`TRAE_JWT` + `TRAE_DEVICE_ID` | Cookie 见 config.example；**设备 id 见第 4 步** |
| Coze 扣子 | `coze_cookie.txt` | `COZE_COOKIE` | 浏览器登录 coze.cn 后复制全部 Cookie |
| 即梦 AI | `jimeng_cookie.txt` | `JIMENG_COOKIE` | 浏览器登录 jimeng.jianying.com 后复制全部 Cookie（sessionid 即凭证） |
| 华为码道 | `hw_cookie.txt` | `HW_COOKIE` | 由本机 `huawei/` 工具链自动同步；亦可在网页「🔑 配置会话 Cookie」粘贴登录态 |

> 凭据文件与 `.env` 均已被 `.gitignore` 忽略，绝不会进仓库。

### 4. ⚠️ Trae 设备 id 获取（必做，否则 Trae 永远 9074）
Trae 服务端**按设备记账**：`claim` 必须用与登录态一致的**你的真实设备 id**，随机 id 会被拒（9074）。
1. 打开你的 `TRAE SOLO CN` 客户端并登录一次。
2. 找到客户端用户数据目录（Windows 通常 `%APPDATA%\TRAE SOLO CN\User\globalStorage\storage.json`），搜索键名 `iCubeAuthInfo://icube-dc:<你的设备id>`，`<你的设备id>` 那段数字即真实设备 id；或在客户端日志里搜 `device_id=`。
3. 把这段数字写入项目根目录 `trae_device_id.txt`（一行、无空格）；或设环境变量 `TRAE_DEVICE_ID=<你的设备id>`。
4. 验证：网页打开 Trae 卡点「立即签到」，或 `python web_server.py --daily`，应显示「已签到」。

> 这一步**不能省略、也不能用别人的 id**。文件已被 gitignore，只存在你本地/服务器。

### 5. Qoder：每日 100 Credits 需桌面端手动领
官方明文规定「领取渠道：仅限 Qoder 桌面端」。服务端令牌（哪怕从桌面导出的 PAT）调 `qcs/config/resolve` 返回空，拿不到领取入口，**服务端无法代领**。因此：
- 卡片诚实标注「🔧 仅限 Qoder 桌面端领取」，不再谎报已领；
- `qoder_token.txt` 仅用于展示状态/续期，**不作为领取凭据**；
- 那 100 Credits 请每天在桌面 Qoder 客户端点一下「领取」。

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
按 `PLATFORM_TITLES` 列出每个平台一个开关（WorkBuddy / 百度千帆 / MiniMax Code / 即梦 AI / Qoder / Link AI / WPS 灵犀 / Trae Work / 华为码道）：
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

签到中心网页的 WorkBuddy 卡片底部有两个入口胶囊：「🌱 成长中心」和「🎯 每日任务」，点击在**当前页面弹窗**打开（与「派猫猫旅行」同一套卡内弹窗机制，不跳页、不新开标签），可一键领取成长任务奖励、显示任务完成状态（`?view=growth` / `?view=daily` 整页入口仍保留为兜底）。

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
- **华为卡想从网页直接登录**：卡片 / 详情页点「🔑 配置会话 Cookie」，从浏览器 DevTools 复制登录后的华为 Cookie 粘贴保存即可（因 `J_SESSION_ID` 是 HttpOnly，JS 读不到，无法做「输账号密码自动登录」；粘贴方案是最诚实可行的网页登录方式）。保存后寿命仍仅 30~60 分，够当下立即签到一次。
- **即梦卡显示「Cookie 可能已失效」**：字节风控强，`jimeng_cookie.txt` 会周期失效。重捕 Cookie 后重部署即可——经 `deploy_ui.py` 上传新 `jimeng_cookie.txt`（覆盖线上）后重启服务，`get_jimeng_card()` 即恢复。
- **Link AI 卡一直显示「需手动」，重新检查也没变已签**：这是预期的——Link AI 接口强制图片验证码，服务端代签不了，也无从得知你浏览器里的签到。请先在网页 `console.link-ai.tech` 手动签到，再回到卡片点「✅ 我已在网页签到」确认，卡片即标记「今日已签」（本地记录，每天重置，诚实不谎报）。
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
- 最小鉴权：`Authorization: Bearer <token>` + `Cosy-ClientType: 10` + `Accept: application/json` + `User-Agent: Qoder`
- **🔧 每日 100 Credits 官方明文「仅限 Qoder 桌面端领取」**：服务端令牌（哪怕桌面导出的 PAT）调 `qcs/config/resolve`（`qodercli-feature-gates`）返回**空**，拿不到领取入口，故服务端脚本**无法代领**。卡片诚实标注「🔧 仅限 Qoder 桌面端领取」，不再谎报已领；Qoder 也已移出自动签到列表。
- **处理方式**：那 100 Credits 需每天在桌面 Qoder 客户端手动点一下。`qoder_token.txt` 仅用于状态展示/续期，**不作为领取凭据**。
- 早期曾误判「领完即查不到、以本地记录判已领 + 常驻补签线程」——已推翻，移除 `_qoder_topup_loop` 与「本地记录判已领」逻辑，改为诚实提示桌面端独占。

**Coze 扣子**（对应 `get_coze_card` / `run_coze_checkin`）：
- 每日登录自动发放 1500 活动分，**无独立 claim 接口**；卡为状态卡，Cookie 有效即「已配置」，并显示当日福利确认历史。
- 凭据：`coze_cookie.txt`（Cookie 串，含 `sessionid`/`sid_guard`，约 60 天）

**即梦 AI Jimeng**（对应 `get_jimeng_card` / `run_jimeng_checkin`，自动卡）：
- 端点前缀 `https://jimeng.jianying.com`，`aid=513695` / `PLATFORM_CODE=7` / `VERSION_CODE=8.4.0`。
- **sessionid 即凭证**：`acquireToken()` 直接返回 sessionid，无需换 token；Cookie 存 `jimeng_cookie.txt`（已 gitignored）。
- 余额：`POST /commerce/v1/benefits/user_credit`（读 `credit.gift_credit`）；领取：`POST /commerce/v1/benefits/credit_receive`（body `{"time_zone":"Asia/Shanghai"}`）。
- **签名**：`Sign = MD5("9e2c|{uri末7位}|7|8.4.0|{deviceTime}||11ac")`，需带 `Device-Time` / `Sign-Ver:1` / `Appid` 头。
- **幂等**：当日已领返回 `is_first_receive:false`、不再加积分 → 每日定时跑安全不重复。
- 卡片底部统一显示「可用积分」，并额外展示「88 积分将于 x月x日 过期」（取自 `expiring_credits[].expire_time`）。字节风控强，`jimeng_cookie.txt` 会周期失效，届时卡片诚实标「Cookie 可能已失效」，需重捕经 `deploy_ui.py` 部署。

**华为码道 DevCloud**（对应 `get_hw_card` / `run_hw_checkin`，手动卡）：
- 端点前缀 `https://devcloud.cn-north-4.huaweicloud.com/chat/PromptCenterService/v1/ops/`，每日签到需带浏览器同款头（`cftk` CSRF）否则回 SPA HTML。
- 会话寿命短（静置 30~60 分失效）→ 每天 08:35 自动签必失败；真解：本机 `hw_keeper.js` 无头常驻每 5 分刷新 + `hw_autopush.py` 推 112。本机没开机/守护停了 → 华为卡转「登录态过期」→ 双击 `huawei/relogin_huawei.bat` 恢复。
- **网页直接登录**：因 `devclouddevuibjJ_SESSION_ID` 是 HttpOnly（JS 读不到），无法做「输账号密码自动登录」。卡片 / 详情页提供「🔑 配置会话 Cookie」按钮（`openHwLogin()` 弹窗），从浏览器 DevTools 复制登录后的 Cookie 粘贴保存即可——后端 `set_hw_cookie()` 写入 `hw_cookie.txt`（已 gitignored）并实测验证可用性，立即可「立即签到」。寿命仍仅 30~60 分，够当下签到一次；每日自动定时仍靠本机守护。

**千帆 / Link AI / WPS 灵犀 / Trae**：均为标准 token 或 Cookie 串鉴权，凭据见 `config.example.json`，过期后重新导出并经 `deploy_ui.py` 部署。

其中 **Link AI**（对应 `get_lk_card`，手动卡）：签到接口 `/sign/in` 现强制要求图片验证码（返回 `code=870`），服务端无解验证码能力，故**无法自动代签**；卡片标「需手动」，并在网页手动签到后提供「✅ 我已在网页签到」按钮（`set_lk_manual_signed()` 本地记录今日已签，每天自动重置，诚实不谎报）。

其中 **Trae Work**（对应 `get_trae_card` / `run_trae_checkin`）：
- 签到：`POST https://api.trae.cn/trae/api/v2/ug/checkin_credits/claim`（`req_source=2`，客户端通道）
- 鉴权：`Authorization: Cloud-IDE-JWT <cookie 换发的 JWT>` + `x-device-id: <你的真实设备 id>`
- `code=9004`（参数/通道不符）→ 此前臆加的 `x-device-model/-system/-client-version` 三个头服务端不认，现已移除、仅保留客户端真实使用的 `x-device-id`。
- `code=9074`（当前参与用户太多）→ **真因是伪设备 id，不是限流、也不是令牌体系问题**。服务端按「设备」记账：用随机伪设备 id（`wb-xxxx`）会被直接拒；必须用**你自己的 Trae 客户端真实设备 id**（`env TRAE_DEVICE_ID` 或 `trae_device_id.txt`）。实测真实设备 id + cookie 换发的 JWT + `req_source=2` 即 `code=0 success`（`did_checked_in:true`），**无需导出桌面 userInfo.token**。
- **⚠️ Trae 设备 id 必配**：从你自己的 `TRAE SOLO CN` 客户端取真实设备 id（见下方「开源首次配置指南 · 第 4 步」），写入 `trae_device_id.txt` 或环境变量 `TRAE_DEVICE_ID`。留空会导致 9074、无法自动签。
