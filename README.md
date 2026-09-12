# WorkBuddy 每日积分自动签到（纯代码层）

每天自动领取 WorkBuddy「开学季 · Buddy加油站」活动的 100 通用积分，**完全无需打开 WorkBuddy、无需任何点击**，后台定时运行即可。

## 它是怎么做到的（一句话版）
WorkBuddy 登录后，会把登录凭证（accessToken）以明文存在你电脑的一个本地文件里；
这个脚本每次运行时读取该文件、拿 token 去调官方签到接口，相当于"替你点了一下签到按钮"，但全程在后台、无界面。

## 文件说明
| 文件 | 作用 |
|------|------|
| `workbuddy_checkin.py` | 核心脚本：读 token → 查状态 → 未签则签到 |
| `run_checkin.bat` | 启动器（自动找 Python，输出日志到 `checkin.log`） |
| `setup_task.ps1` | 一键注册 Windows 计划任务（每天 09:10 自动跑） |
| `web_server.py` | **手机网页版**服务（纯标准库，读 token 代签 + 提供手机页面） |
| `start_web.bat` | 启动网页版服务，并打印手机访问地址 |
| `install_autostart.bat` | 可选：让网页版开机自动后台运行（无需管理员） |

> 凭证只**读取**不修改；为避免影响你主程序登录态，脚本不会用 refreshToken 去刷新 token。
> 只要你平时有打开过 WorkBuddy（它每天都会自动续期），token 一直有效。

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
- 想加访问口令（防止同网其他人乱点）：编辑 `web_server.py`，把 `ACCESS_KEY = ""` 改成如 `ACCESS_KEY = "8888"`，重启服务后手机首次访问需输入一次。

### 4. 服务器自动签到 + 手机网页查看（已部署到云服务器 ✅）

**签到已经由服务器自动完成**：服务器上的 systemd 定时器 `wb-checkin-daily.timer` **每天 09:10 自动签到**（若那一刻服务器不可用，恢复后会补跑），你什么都不用做。
网页 `https://SERVICE_DOMAIN/buddy/` 只是**用来看记录**（累计积分 / 资源余额 / 昨日用量 / 连签天数 / 今日是否已签 / 上次签到时间与来源）；页面上的按钮是**手动备用**——万一定时没跑成功，点一下即可补签。

> **资源余额 / 昨日用量**说明：余额来自 `get-user-resource` 接口（资源包 `CapacityRemainPrecise` 之和）。每日用量 = 昨日余额 − 今日余额，**由服务器自动签到定时器 + 页面访问共同按天采样**（尚无历史基线时显示 `--`，之后自动累计）。

| 项目 | 值 |
|------|----|
| 查看地址 | **https://SERVICE_DOMAIN/buddy/** |
| 访问口令 | `SERVER_SSH_PASSWORD`（手机首次输入一次，之后浏览器记住；由服务器 `WB_ACCESS_KEY` 环境变量注入，**不写在代码里**）|
| 自动签到 | systemd `wb-checkin-daily.timer` → 每天 09:10 触发 `wb-checkin-daily.service` |
| 网页服务 | systemd `wb-checkin`，监听 `127.0.0.1:8790` |
| nginx | `SERVICE_DOMAIN` 443 块内 `location /buddy/` 反代 |
| 服务端文件 | `/opt/wb-checkin/`（web_server.py / workbuddy_checkin.py / token.info / last_run.json）|
| 凭证 | 只上传签到必需的最小字段（无 refreshToken/昵称），有效期至 2026-11-11 |

> 原理：签到由服务器自己读本地凭证、调官方接口完成，**完全不经过你的电脑**，所以电脑关机也无所谓。
> 网页请求：浏览器 → `https://SERVICE_DOMAIN/buddy/` → nginx 反代 → `web_server.py` → 返回签到状态。

服务器运维（SSH 登录 ECS 后执行）：
```bash
systemctl list-timers wb-checkin-daily.timer    # 看下次自动签到时间
systemctl status wb-checkin                     # 网页服务状态
journalctl -u wb-checkin-daily.service -n 30    # 看自动签到日志
systemctl start wb-checkin-daily.service        # 手动立刻跑一次（不影响定时）
systemctl restart wb-checkin                    # 重启网页服务
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
- 鉴权头：`Authorization: Bearer <accessToken>` + `X-User-Id` + `X-Domain: copilot.tencent.com`
- token 来源：`%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop.info`
