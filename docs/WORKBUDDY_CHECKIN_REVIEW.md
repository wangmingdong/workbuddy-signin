# `cat-xierluo/legal-skills` · `skills/workbuddy-checkin` 代码审查

> 审查对象：`skills/workbuddy-checkin`（v1.0.4，作者 yydshy / 杨卫薪）
> 审查时间：2026-09-17
> 结论：**底子扎实，但跨平台一致性、健壮性与可观测性还有 6 处可改/可补**，其中 2 处是真正的正确性隐患（非纯打磨）。

---

## 一、已经做对的（别动）

- **401 判定改为真实 HTTP 状态码**（1.0.3）：修掉了「响应体随机 UUID 恰好含 401 → 误判令牌过期 → 当天漏签 + 连续 7 天中断」的 0.57%/次 雷。这是全项目最大的价值点。
- **v5.3.8 明文登录态优先 + `%LOCALAPPDATA%` 优先**：绕开了旧版 `state.vscdb` + Electron safeStorage 的复杂度。
- **Windows 三连修**（1.0.4）：PS5.1 的 UTF-8 BOM、GBK 吞引号（`[Console]::OutputEncoding` 临时切 UTF-8）、`cygpath -w` 路径归一化。
- **令牌不落盘、不回显、不提交**：安全红线守得住。
- **`code=10001` 幂等兜底**：重复签到不会误报失败。

---

## 二、可修改/补充清单（按优先级）

### 🔴 P0-1 · `checkin.sh` 丢弃了 `X-User-Id` 等鉴权头（跨平台不一致，真实隐患）

`decrypt-token.js` 成功时会输出 4 行：`DECRYPT_RESULT` / `ACCOUNT_UID` / `AUTH_DOMAIN` / `ENTERPRISE_ID`。
`checkin.ps1` 正确消费了后三行并拼出 `X-User-Id`/`X-Domain`/`X-Enterprise-Id`；但 **`checkin.sh` 的 `read_token` 只 `grep "^DECRYPT_RESULT:"` 取了 token，其余三行被丢弃**，导致 macOS/Linux 的请求只带 `Authorization`，没有 `X-User-Id`。

CHANGELOG 1.0.3 把这点列为「已知限制」并承认 ps1 注释里说网关「会收紧」。换言之 **macOS/Linux 现在是脆弱的**——一旦腾讯网关真按桌面端 `buildHeaders` 收紧鉴权，sh 版会集体 401，而 ps1 版不会。

**修法**：让 `read_token` 把四行都抓出来，并按 ps1 的方式拼头（同时把请求路径对齐到 `/v2/billing/meter/...`）。

```bash
# checkin.sh · read_token 内
local raw out="" uid="" domain="" eid=""
raw=$("$node_bin" "$DECRYPT_JS" 2>/dev/null)
out=$(printf '%s\n' "$raw"    | grep '^DECRYPT_RESULT:' | sed 's/^DECRYPT_RESULT://')
uid=$(printf '%s\n' "$raw"    | grep '^ACCOUNT_UID:'   | sed 's/^ACCOUNT_UID://')
domain=$(printf '%s\n' "$raw" | grep '^AUTH_DOMAIN:'   | sed 's/^AUTH_DOMAIN://')
eid=$(printf '%s\n' "$raw"    | grep '^ENTERPRISE_ID:' | sed 's/^ENTERPRISE_ID://')
TOKEN="$out"; ACC_UID="$uid"; ACC_DOMAIN="$domain"; ACC_EID="$eid"

# 调用前拼头（替换原来裸 -H "Authorization..."）
AUTH_H=(-H "Authorization: Bearer $TOKEN")
[ -n "$ACC_UID" ]    && AUTH_H+=(-H "X-User-Id: $ACC_UID")
[ -n "$ACC_DOMAIN" ] && AUTH_H+=(-H "X-Domain: $ACC_DOMAIN")
[ -n "$ACC_EID" ]    && AUTH_H+=(-H "X-Enterprise-Id: $ACC_EID" -H "X-Tenant-Id: $ACC_EID")
# curl 调用改为："${AUTH_H[@]}"  且路径用 /v2/billing/meter/...
```

---

### 🔴 P0-2 · 依赖不可靠的 `today_checked_in` 做「跳过」分支（潜在漏签风险）

两个脚本都先调 `checkin-status`，若 `today_checked_in == true` 就 `exit 0` 跳过。SKILL/CHANGELOG 自己写明**该字段不可靠**。
- 文档里说的故障模式是**假阴性**（签到成功后仍为 `false`）——这种情况下只会多打一次 `daily-checkin`，被 `code=10001` 兜底，无害。
- 但**反之（假阳性：字段为 `true` 其实没签上）**会让脚本在「真正签到」之前就退出 → **当天积分没领到，7 天连签中断**。这正是 CHANGELOG 反复强调的「最贵损失」。
- 而且 `daily-checkin` 本身就是幂等的（`code=10001` 已正确处理），`checkin-status` 这步纯属冗余。

**修法（推荐，双脚本通用）**：**删掉 `checkin-status` 预检，直接调 `daily-checkin`**。成功路径（`code=0`）照样能拿到 `credit`+`streak_days` 写日志；`code=10001` 记「今日已签到」。少一次 HTTP 调用，且彻底消除假阳性漏签。

```bash
# 删除 checkin.sh 里「2. 查询签到状态」整段 + 其后的 CHECKED 短路；
# 直接进入「3. 执行签到」（daily-checkin）。ps1 同理删 Invoke-CheckinApi status 调用与 $Checked 短路。
```

---

### 🟡 P1-1 · 两个脚本永远 `exit 0`（定时任务无法感知失败）

`checkin.sh` 末尾只有 `log ...`、没有 `exit N`；`checkin.ps1` 同理。网络中断、令牌过期(401)、API 报错(非 0/非 10001) 时进程退出码都是 0。
→ crontab / launchd / schtasks / WorkBuddy 自动化 都**无法据此告警**，失败是静默的。

**修法**：成功/已签到 `exit 0`；网络异常、401/403、API 业务失败统一 `exit 2`（也可细分，但一个非零码已够监控用）。

---

### 🟡 P1-2 · 文档把 Windows 明文路径写错了（与代码/CHANGELOG 矛盾）

`references/dependencies.md` 的「平台差异速查」表和 `SKILL.md` 的「平台说明」表，都把 **Windows 明文登录态写成 `%APPDATA%\CodeBuddyExtension\...`**。
但 `decrypt-token.js` 与 CHANGELOG 1.0.3 明确：真实路径是 **`%LOCALAPPDATA%`**（`%APPDATA%` 仅作回退）。代码是对的，文档是错的。

**修法**：两处表格 Windows 行改为 `%LOCALAPPDATA%\CodeBuddyExtension\Data\Public\auth\workbuddy-desktop.info`（回退 `%APPDATA%`）。

---

### 🟢 P2-1 · 临时失败无重试（000 / 5xx 直接判失败）

单次 `curl`，遇 `000`（DNS 抖动/瞬时断网）或网关 5xx 直接报错退出。定时任务在弱网环境容易偶发失败。

**修法**：对 API 调用包一层 3 次重试、间隔 3s 的小循环，仅对 `000`/5xx 重试（401/业务码不重试）。

---

### 🟢 P2-2 · `decrypt-token.js` 不读 `accounts` 数组、不提示 `expiresAt`

明文分支只取 `j.account`。若 `account` 为空但 `accounts[0]` 存在，`uid/domain/eid` 会全部落空（P0-1 的头就拼不出来）。
另外 `auth.expiresAt` 已可读，却没用于提前提示「令牌已过期，需刷新」。

**修法**：
```js
const acct = (j && j.account) || (Array.isArray(j && j.accounts) && j.accounts[0]) || {};
// 可选：if (authObj.expiresAt && Date.now() > authObj.expiresAt) process.stderr.write("[提示] accessToken 可能已过期，请打开 WorkBuddy 刷新\n");
```

---

### ⚪ P3（可选增强，慎做）· 用 `refreshToken` 主动刷新

明文文件带 `auth.refreshToken` + `auth.expiresAt`。理论上 401 时可先拿 refreshToken 换新的 accessToken 再签到，彻底免手动开客户端。
**但风险高**：刷新接口通常需要绑定桌面端的 `client_id/secret`，纯脚本未必能独立调用；且需额外网络请求与错误处理。
→ 建议**作为可选项/后续版本**，默认关闭，不阻塞上面 P0/P1。

---

## 三、建议的最小改动集（先这 4 个）

| 优先级 | 改动 | 文件 | 收益 |
|---|---|---|---|
| P0 | 补齐 `X-User-Id` 等头 + 路径对齐 `/v2/` | `checkin.sh` | macOS/Linux 不再脆弱 |
| P0 | 删 `checkin-status` 预检，直接幂等 `daily-checkin` | `checkin.sh` + `checkin.ps1` | 消除假阳性漏签 + 省一次调用 |
| P1 | 非零退出码 | 两个 checkin 脚本 | 定时任务可监控/告警 |
| P1 | 修正 Windows 明文路径文档 | `SKILL.md` + `references/dependencies.md` | 文档与代码一致 |

P2/P3 可作为第二轮。

---

## 四、附带小发现

- `checkin.ps1` 的 `Invoke-CheckinApi` 已经是正确的「标杆实现」（带 `/v2/` + 全量头 + UTF-8 切码），`checkin.sh` 应该**向它对齐**而非反过来。
- `setup.sh` / `setup.ps1` 质量 OK，无明显 bug；仅 `setup.sh` 的 `find_node` 候选里 `$HOME/.nvm/versions/node"/*/bin/node` 这个 glob 写法在数组里没问题，但 Windows Git Bash 下 `nvm` 路径常为 `/c/Users/.../AppData/Roaming/nvm`，可补一条候选（非必需）。
- 没有发现令牌泄漏类安全问题（stdout 管道 + grep 前缀过滤的用法是对的）。
