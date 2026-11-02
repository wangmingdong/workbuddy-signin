# 安全公告

## 2026-10-08 恶意 workflow 注入事件（已处置）

### 发生了什么

2026-10-08，本仓库使用的 GitHub 账号凭据被未授权使用，向仓库推送了 `.github/workflows/security-audit.yml`（提交 `18865d0`，提交信息 `Add security audit workflow`）。该 workflow 会在 GitHub Actions 运行器中扫描仓库当前文件与全部 git 历史，匹配常见凭据格式（云厂商密钥、模型 API key、GitHub/GitLab token 等），并将匹配内容外传。

该文件从未在本项目的服务器或使用者本机执行，只运行在 GitHub 托管的 Actions runner 上。

### 已采取的处置

- 2026-11-02：已从所有分支与 tag 删除该 workflow，默认分支当前不含 `.github/workflows/security-audit.yml`。
- 已撤销被盗用的 GitHub 凭据，并轮换可能受影响的服务凭据。
- 已核查相关主机的登录日志、定时任务、SSH 授权与对外连接。
- 未对 git 历史做强制改写，因此 `18865d0` 仍可能出现在历史记录与既有 fork 中。该提交不会自动执行，但请勿恢复或手动运行其中的 workflow。

### 对使用者的影响

- 仅 clone 或使用本项目：workflow 不会在你的机器上运行，无需额外操作。
- 曾 fork 本项目：请检查 fork 的默认分支及其他分支是否仍包含该文件，有则删除；同时检查是否曾把真实凭据提交进仓库或历史，如有请立即轮换。
- 曾在本仓库提交过凭据：无论仓库是否公开，都应按已泄露处理并轮换。

### 报告问题

发现相关问题请通过 GitHub 私下联系 @wangmingdong，请勿在公开 issue 中粘贴凭据或基础设施信息。

---

最后更新：2026-11-02
