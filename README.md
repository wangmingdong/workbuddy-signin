# WorkBuddy 每日积分自动签到（纯代码层）

每天自动领取 WorkBuddy「开学季 · Buddy加油站」活动的 100 通用积分，**完全无需打开 WorkBuddy、无需任何点击**，后台定时运行即可。

## 它是怎么做到的（一句话版）
WorkBuddy 登录后，会把登录凭证（accessToken）以明文存在你电脑的一个本地文件里；
这个脚本每次运行时读取该文件、拿 token 去调官方签到接口，相当于"替你点了一下签到按钮"，但全程在后台、无界面。

## 文件说明
| 文件 | 作用 |
|------|------|
| `workbuddy_checkin.py` | WorkBuddy 核心脚本：读 token → 查状态 → 未签则签到 |
| `run_checkin.bat` | 启动器（自动找 Python，输出日志到 `checkin.log`） |
| `setup_task.ps1` | 一键注册 Windows 计划任务（每天 09:10 自动跑） |
| `web_server.py` | **手机网页版**服务（纯标准库；含 WorkBuddy/百度千帆/MiniMax Code/Trae Work/WPS 灵犀 5 个签到适配器；`--daily` 模式供服务器定时跑全部平台） |
| `wb_icon.py` | 各平台官方图标（64×64 圆角内联 SVG/PNG） |
| `mm_web_token.json` | MiniMax Code 网页登录 JWT（约 40 天，已配置） |
| `trae_cookie.txt` | Trae Work 登录 Cookie 串（约 14 天，**待提供**） |
| `lx_cookie.txt` | WPS 灵犀登录 Cookie 串（**待提供**） |
| `start_web.bat` | 启动网页版服务，并打印手机访问地址 |
| `install_autostart.bat` | 可选：让网页版开机自动后台运行（无需管理员） |

> 凭证只**读取**不修改；为避免影响你主程序登录态，脚本不会用 refreshToken 去刷新 token。
> 只要你平时有打开过 WorkBuddy（它每天都会自动续期），token 一直有效。

## 配置（分享 / 迁移给他人）

本项目**核心代码已配置化**：所有敏感信息（ECS 密码、网页访问口令、各平台 token/cookie）都从环境变量读取，不写死在代码里。

- 服务端 `web_server.py` 等读取 `WB_ACCESS_KEY` / `QF_ACCESS_TOKEN` / `TRAE_COOKIE` / `HW_COOKIE` …（生产由 systemd 注入）。
- 本地运维脚本（`check_112_hw.py` / `build_center_preview.py` / `hw_watch_login.py` / `hw_autopush.py` / `install_hw_keepalive.py` / `check_now.py`）统一从项目根目录的 `.env` 读取 `ECS_HOST` / `ECS_PORT` / `ECS_USER` / `ECS_PASS` / `ACCESS_KEY`，由 `envconf.py` 加载。

**别人拿到仓库后怎么配：**
1. 复制 `.env.example` 为 `.env`：`cp .env.example .env`
2. 在 `.env` 里填入自己的值（ECS 地址/密码、访问口令等）。
3. 各平台 token/cookie 仍按上文"文件说明"各自放置（如 `trae_cookie.txt`、`lx_cookie.txt`），这些文件已在 `.gitignore` 忽略。

> `.env` 含真实口令，**已被 .gitignore 忽略，绝不入库**；仓库里只有 `.env.example` 占位模板。

## 用法

### 1. 手动跑一次（先看效果）
双击 `run_checkin.bat`，或命令行：
```
cd E:\workspace\workbuddy-signin
run_checkin.bat
```
看 `checkin.log` 里的结果即可。

### 2. 设置每天自动跑（一次设置，长期有效）
以**管理员身份**打开 PowerShell，执行：
```powershell
cd E:\workspace\workbuddy-signin
.\setup_task.ps1
```
之后每天 09:10 会自动签到，结果记录在 `checkin.log`。

想立刻验证计划任务是否生效：
```powershell
schtasks /run /tn WorkBuddyDailyCheckin
```

### 3. 手机打开网页签到（想手动签的时候用）
双击 `start_web.bat` 启动服务，窗口里会打印一行**手机访问地址**，例如：
```
手机访问地址:  http://10.100.10.248:8765   (需连同一 WiFi)
```
手机连上**同一个 WiFi**，浏览器打开这个地址，就能看到积分和「立即签到」按钮，点一下即完成。

- 电脑防火墙首次可能弹窗，选「允许访问」（专用网络）即可。
- 手机必须和电脑在同一局域网（同一 WiFi）；跨网络/流量访问不适用。
- 想让服务**开机自动后台运行**：双击 `install_autostart.bat` 即可（无需管理员）。取消就删掉启动文件夹里的 `WorkBuddyCheckinWeb.vbs`。
- 想加访问口令（防止同网其他人乱点）：不要改代码，在 `.env` 里设 `ACCESS_KEY=你的口令`（或服务器 systemd 的 `WB_ACCESS_KEY` 环境变量），重启服务后手机首次访问需输入一次。本地 `check_now.py` 也读同一个 `ACCESS_KEY`。

### 4. 服务器自动签到 + 手机网页查看（已部署到云服务器 ✅）

**签到已经由服务器自动完成**：服务器上的 systemd 定时器 `wb-checkin-daily.timer` **每天 09:10 自动签到**（若那一刻服务器不可用，恢复后会补跑），你什么都不用做。
网页 `http://SERVER_IP_112/checkin/` 只是**用来看记录**（今天各平台是否已签 / 上次签到时间）；页面上的按钮是**手动备用**——万一定时没跑成功，点一下即可补签。

**五个平台**：
| 平台 | 地址 | 每日奖励 | 凭据（服务器端） | 维护 |
|------|------|---------|------------------|------|
| WorkBuddy | copilot.tencent.com | 100 积分 | `token.info` | 电脑上打开一次 WorkBuddy 自动续期 |
| 百度千帆 | 千帆官网 | — | `qf_token.txt`（另一台 ECS 同步） | 自动 |
| MiniMax Code | agent.minimax.cn | 400 智点 | `mm_web_token.json` | 约 40 天，快到期前在浏览器重新登录一次 |
| Trae Work | work.trae.cn | 150+50 积分 | `trae_cookie.txt` | **约 14 天，需重新导出 Cookie** |
| WPS 灵犀 | lingxi.wps.cn | 100 智点 | `lx_cookie.txt` | **不定期需重新导出 Cookie** |

> Trae / 灵犀的 Cookie 是长期登录态（HttpOnly），无法由代码生成，只能在**系统浏览器**登录对应网站后手动复制：
> 1. 打开 Chrome/Edge，登录 `work.trae.cn` 和 `lingxi.kdocs.cn`；
> 2. 按 F12 → Application（应用）→ Cookies，找到 `https://api.trae.cn`（或 `lingxi.wps.cn`）域下全部 cookie；
> 3. 把每条复制成 `名字=值` 用 `; ` 连接成一行，分别存成 `trae_cookie.txt` / `lx_cookie.txt` 放到本地 `E:\workspace\workbuddy-signin`，再运行部署脚本即可。

| 项目 | 值 |
|------|----|
| 查看地址 | **http://SERVER_IP_112/checkin/** |
| 访问口令 | 由本地 `.env` 的 `ACCESS_KEY` 提供（或服务器 `WB_ACCESS_KEY` 环境变量注入），**不写在代码里**；`.env` 已被 .gitignore 忽略，分享仓库时只提交 `.env.example` 模板 |
| 自动签到 | systemd `wb-checkin-daily.timer` → 每天 09:10 触发 `wb-checkin-daily.service`（执行 `web_server.py --daily`，一次跑完 5 个平台，任一失败不阻塞其余） |
| 网页服务 | systemd `wb-checkin`，监听 `127.0.0.1:8790` |
| nginx | `location /checkin/` 反代 |
| 服务端文件 | `/opt/wb-checkin/`（web_server.py / wb_icon.py / workbuddy_checkin.py / token.info / last_run.json / mm_web_token.json / trae_cookie.txt / lx_cookie.txt / qf_token.txt）|
| 本地部署 | `python deploy_ui.py`（上传代码 + 凭据 + 切换定时任务 → 重启服务） |

> 原理：签到由服务器自己读本地凭证、调官方接口完成，**完全不经过你的电脑**，所以电脑关机也无所谓。
> 网页请求：浏览器 → `http://SERVER_IP_112/checkin/` → nginx 反代 → `web_server.py` → 返回签到状态。

服务器运维（SSH 登录 ECS 后执行）：
```bash
systemctl list-timers wb-checkin-daily.timer    # 看下次自动签到时间
systemctl status wb-checkin                     # 网页服务状态
journalctl -u wb-checkin-daily.service -n 30    # 看自动签到日志
systemctl start wb-checkin-daily.service        # 手动立刻跑一次（不影响定时）
systemctl restart wb-checkin                    # 重启网页服务
python3 /opt/wb-checkin/web_server.py --daily   # 手动跑一次 5 平台签到（前台看结果）
```

活动结束后想彻底移除：
```bash
systemctl disable --now wb-checkin-daily.timer wb-checkin
rm -f /etc/systemd/system/wb-checkin.service /etc/systemd/system/wb-checkin-daily.service /etc/systemd/system/wb-checkin-daily.timer
rm -rf /opt/wb-checkin
systemctl daemon-reload
# 再从 /etc/nginx/conf.d/payroll.conf 删掉 /buddy/ 两段，然后：
nginx -t && systemctl reload nginx
```

## WorkBuddy 成长中心 · 一键完成任务

签到中心网页新增「WorkBuddy 成长中心」卡片，可一键领取成长任务奖励、并显示每个任务的完成状态。

**它能做什么**
- 自动 `accept` 全部成长任务；
- 对**你已经真实完成**的任务，一键 `claim` 领取积分/能量（幂等，重复点不会重复领）；
- 对未完成的任务，尽力上报对应行为事件（best-effort），并在详情里清楚标出哪些还需手动操作。

**怎么用**
1. 打开 `http://SERVER_IP_112/checkin/`，找到紫色「WorkBuddy 成长中心」卡片；
2. 点卡片展开详情，看每个任务状态（✅ 已完成 / ⏳ 待完成 / 🔒 需手动）；
3. 点「🚀 一键完成全部任务」，后台自动跑（页面会轮询，跑完刷新状态）。

**⚠️ 重要限制（务必了解）**
成长任务的计分由服务端校验**真实产品交互**（如真实召唤专家、打开 Buddy 应用、使用模板、夜间访问等）。实测表明：仅靠 API 上报合成事件**不会**被服务端计入进度，因此「一键完成」**无法凭空点亮需要真实操作的任务**——它只能：
- 领取你已真实完成任务的奖励；
- 对未完成任务做事件上报尝试（多数不记分），并在页面上明确提示「需先在 WorkBuddy 客户端完成对应操作」。
两个纯人工任务（`wb_wechat_oa_subscribe_task` 关注公众号、`Expert_Philanthropy` 真实捐款）天然不可自动化。

**接口 / 调试**
- `GET  /api/growth` → 当前成长卡片 + 上次执行结果
- `POST /api/growth/run` → 后台启动一键完成（立即返回，前端轮询）
- 本地调试（需明文 token）：`WB_TOKEN_FILE=token.info python wb_growth.py list|run`
- 实现模块：`wb_growth.py`（纯标准库，零依赖）

## 常见问题
- **提示 token 已过期**：说明你很久没开 WorkBuddy 了。随便打开一次 WorkBuddy 登录，它就会刷新凭证，再运行脚本即可。
- **签到接口报网络错误**：公司网络下若命中代理失败，脚本会自动改走直连；若仍失败，确认能正常访问 `copilot.tencent.com`。
- **今天已经签过**：脚本会识别并跳过（不会重复领），属正常现象。
- **手机打不开网页**：① 确认手机和电脑连的是同一 WiFi；② 确认 `start_web.bat` 窗口还开着（关掉窗口=服务停止）；③ 首次运行请在电脑弹出的防火墙提示里点「允许」；④ 换个网络后电脑 IP 可能变化，回看 `start_web.bat` 窗口里最新打印的地址。
- **网页版和计划任务冲突吗**：不冲突。两边都调用同一个签到接口，脚本是幂等的，谁先签都行，重复点也只会提示「今天已签到」。

## 技术细节（给想了解的人）
- 签到接口：`POST https://copilot.tencent.com/v2/billing/meter/daily-checkin`（body `{}`）
- 状态接口：`POST https://copilot.tencent.com/v2/billing/meter/checkin-activity-status`
- 余额接口：`POST https://copilot.tencent.com/v2/billing/meter/get-user-resource`（**必须带浏览器 `User-Agent`，否则网关返回 403**；返回 `data.Response.Data.Accounts[].CapacityRemainPrecise` 求和即剩余积分）
- 消耗明细接口：`POST https://copilot.tencent.com/billing/meter/get-user-request-usage`（**路径不带 `/v2`**；body `{startTime,endTime,pageNum,pageSize}`，返回 `data.data[]` 每条含 `credit` 消耗值、`requestTime`、`model`、`client`；「昨日用量」= 取昨天全部记录对 `credit` 求和）
- 鉴权头：`Authorization: Bearer <accessToken>` + `X-User-Id` + `X-Domain: copilot.tencent.com`
- token 来源：`%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop.info`
