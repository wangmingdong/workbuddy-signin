# QUICKSTART · 从零到「开机自动签到」（本地版，不需要服务器）

> 这份文档写给两种人：**想自己动手的你**，和**你想让 AI 帮你装时直接整份喂给 AI 的提示词**。
> 项目本体是一个纯标准库 Python 单文件服务（`web_server.py`）——没有数据库、没有 npm、没有 Docker，
> 装好 Python 就能跑。每日定时签到由服务内置的调度线程完成，与部署位置无关。

---

## 第 0 步 · 了解它是什么（30 秒）

**输入**：各 AI 平台的登录凭据（token / cookie，共 10 个平台，逐个可选）
**处理**：本地常驻一个小服务，每天到点自动调各平台签到接口
**输出**：① 手机/电脑打开一个网页看全部卡片状态；② 每天签到完可推送微信通知；③ 凭据快到期时卡片上会预警

| 平台 | 每日奖励 | 凭据文件（根目录） | 采集方式 |
|---|---|---|---|
| WorkBuddy | 100 积分 | `token.info` | 打开 WorkBuddy 客户端自动续期，无需配置 |
| 百度千帆 | — | `qf_token.txt` | 千帆控制台取 token 粘贴 |
| MiniMax Code | 400 智点 | `mm_web_token.json` | 登录 platform.minimax.io 复制 token 粘贴 |
| Qoder | 100 Credits | `qoder_token.txt` | `qoder_capture.js` 弹窗采集 + 本机守护自动领 |
| Link AI | 随机积分 | `linkai_token.txt` | 控制台 token 粘贴（验证码自动破解） |
| WPS 灵犀 | 100 智点 | `lx_cookie.txt` | `lx_capture.js` 弹窗采集 |
| Trae Work | 150+50 积分 | `trae_cookie.txt` | `trae_capture.js` 弹窗采集（约 14 天续一次） |
| Coze 扣子 | 60 积分/天 | `coze_cookie.txt` | 浏览器 F12 复制 Cookie 粘贴 |
| 华为码道 | 活动积分 | `hw_cookie.txt` | `huawei/relogin_huawei.bat` 弹窗采集 |
| 豆包 | 签到+任务 | `doubao_cookie.json` | `doubao_capture.js` 弹窗采集（需本机 Edge） |

> 全部可选：只配你用的平台，其它开关关掉即可（设置页 → 平台开关）。

---

## 第 1 步 · 装环境

1. **Python 3.8+**（建议 3.11）：https://www.python.org/downloads/ 安装时勾选 **Add Python to PATH**。
2. **可选 · Node.js 18+**（只为了「弹窗采集 Cookie」的几个平台）：https://nodejs.org/
   - 没装 Node 也能用：向导里改用「粘贴」方式配凭据。
3. **可选 · 本机 Edge/Chrome 浏览器**：弹窗采集会借用你已登录的浏览器 profile。

## 第 2 步 · 拿到项目

```bash
git clone https://github.com/wangmingdong/workbuddy-signin.git
cd workbuddy-signin
```
（或 GitHub 页面 Code → Download ZIP 解压）

## 第 3 步 · 一键安装并启动

**Windows**：双击根目录 `install.bat`。它会：
1. 检测 Python（没有会提示装）；
2. 写入开机自启（启动文件夹 VBS，静默后台运行，注销重启不用管）；
3. 启动服务并自动打开浏览器 `http://localhost:8765`。

**Mac/Linux**：
```bash
python3 web_server.py        # 终端前台跑；开机自启用 cron @reboot 或 systemd --user 自行配置
```

> 端口默认 `8765`，可用环境变量 `WB_PORT` 覆盖。首次打开会让你输入**访问口令**（默认 `19921010`，进设置页可改）。**内网部署建议改掉**。

## 第 4 步 · 配凭据（设置页 → 「🗝️ 凭据向导」）

- 页面右上 ⚙️ 进设置，找到「凭据向导」：每个平台一行，🟢=已配置 / 🔴=缺失。
- 有「弹窗采集」按钮的平台（Trae/灵犀/豆包/华为/Qoder）：点一下会弹出浏览器窗口，登录后 cookie 自动写盘，**无需手动复制**。
- 其余平台：点「粘贴」，把 token/cookie 贴进去保存即可（每种要贴什么，输入框上方有说明）。
- 配完在首页点对应卡的「签到」按钮试一次，卡片变「✅ 今日已领」即通。

## 第 5 步 · 设定时与通知（设置页）

1. **定时签到**：填每日时间（如 08:35），可开随机浮动。
2. **平台开关**：关掉没配置的平台，避免每日报错。
3. **完成通知**（可选）：粘贴一个 Webhook 即可每天收到结果：
   - PushPlus：`https://www.pushplus.plus/send/你的token`
   - Server酱：`https://sctapi.ftqq.com/你的SendKey.send`
   - 企业微信群机器人：`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx`

---

## 维护（很少，但要心理预期）

| 事项 | 频率 | 动作 |
|---|---|---|
| 凭据过期 | 各平台不同（14~60 天） | 卡片会显示「还剩 N 天」预警；到时在凭据向导重新采集一次 |
| 换电脑迁移 | 偶尔 | 把根目录的凭据文件（`*.txt`/`*.json` 中与凭据相关的）拷到新机同位置 |
| 平台改版 | 偶尔 | 卡片报错时把报错信息喂给 AI 排查 |

> ⚠️ **安全**：凭据文件 = 你的登录态，等同密码。不要提交到公开仓库（本项目已 gitignore）、不要发给别人。

---

## 交给 AI 装（提示词模板）

把下面整段 + 本文档一起发给你的 AI 编码助手（WorkBuddy / Claude / Cursor 等）：

```
我项目路径在 <你的路径>，请按项目里的 QUICKSTART.md 帮我在本机部署多平台签到中心：
1. 检查 Python/Node 环境，缺什么装什么；
2. 启动 web_server.py 并确认 http://localhost:8765 可访问；
3. 打开设置页带我逐平台配凭据（我能提供的平台才配）；
4. 配置定时 + 开机自启；
5. 每步给我截图或可验证的结果，不要跳步。
遇到报错直接读日志排查，不要重装系统级别的依赖。
```
