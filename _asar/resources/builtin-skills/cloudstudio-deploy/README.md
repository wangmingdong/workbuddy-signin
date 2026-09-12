# cloudstudio-deploy

将本地静态站点一键部署到 CloudStudio 沙箱工作空间的 Agent Skill。

## 目录结构

```
cloudstudio-deploy/
├── SKILL.md              # Agent Skill 定义（触发条件、工作流指引）
├── README.md             # 本文件
└── scripts/
    └── deploy.js         # 部署 CLI（零依赖，Node.js 18+）
```

## 作为 Agent Skill 使用

当用户向 CodeBuddy 提出以下请求时，Agent 会自动触发本 Skill：

- "帮我部署这个项目到云端"
- "把 dist 目录发布到 CloudStudio"
- "我需要一个预览链接"

Agent 会自动识别部署目录、执行部署脚本、返回访问链接。

## 作为 CLI 直接使用

```bash
# 设置环境变量
export CS_API_KEY="your-api-key"
export CS_ENV=internal  # 内网 IOA 环境

# 部署
node scripts/deploy.js deploy ./dist

# 部署到指定端口
node scripts/deploy.js deploy ./dist 8080

# 部署到已有工作空间
node scripts/deploy.js deploy-to <spaceKey> ./dist

# 创建工作空间
node scripts/deploy.js create

# 销毁工作空间
node scripts/deploy.js destroy <spaceKey>
```

## 环境变量

| 变量 | 必需 | 默认值 | 说明 |
|------|------|--------|------|
| `CS_API_KEY` | 是 | - | CloudStudio PaaS API Key |
| `CS_ENV` | 否 | `external` | `internal`（IOA 内网）或 `external`（外网） |
| `CS_PAAS_API` | 否 | 按 CS_ENV 选择 | 覆盖控制面 API 地址 |
| `CS_WS_DOMAIN` | 否 | 按 CS_ENV 选择 | 覆盖数据面域名后缀 |

## 输出

deploy 命令输出结构化 JSON，便于 Agent 解析和脚本集成：

```json
{
  "spaceKey": "abc123...",
  "webIDE": "https://abc123.tc-nanjing.cloudstudio.club",
  "shareLink": "https://xyz.tc-nanjing.share.codebuddy.woa.com",
  "dataPlane": "http://3000-abc123.e2b.tc-nanjing.sandbox.codebuddy.woa.com/",
  "verified": true
}
```

## 部署流程

1. **创建工作空间** — PaaS API 创建沙箱实例
2. **获取 session token** — 用于数据面 API 鉴权
3. **等待沙箱就绪** — 轮询 PTY 端口 (65310)
4. **注入静态文件服务** — 上传内置的 `_serve.js` 到沙箱
5. **上传部署文件** — 本地打包 tar.gz → 上传 → 解压
6. **配置自启动** — `replaceCloudStudioConfig` 写入配置（沙箱重启时触发）
7. **启动应用** — 通过 console API 主动启动
8. **获取分享链接** — PaaS API 生成可分享的 URL
9. **验证可访问** — curl 数据面确认 HTTP 200

## 域名参考

### 内网 (CS_ENV=internal)

| 用途 | 域名 |
|------|------|
| 控制面 | `api.tc-nanjing.sandbox.codebuddy.woa.com` |
| 数据面 API (65213) | `65213-{spaceKey}.e2b.tc-nanjing.sandbox.codebuddy.woa.com` |
| 数据面 PTY (65310) | `65310-{spaceKey}.e2b.tc-nanjing.sandbox.codebuddy.woa.com` |
| 应用访问 | `{port}-{spaceKey}.e2b.tc-nanjing.sandbox.codebuddy.woa.com` |

### 外网 (CS_ENV=external)

| 用途 | 域名 |
|------|------|
| 控制面 | `api.ap-beijing.sandbox.cloudstudio.club` |
| 数据面 API (65213) | `65213-{spaceKey}.e2b.ap-beijing.sandbox.cloudstudio.club` |
| 数据面 PTY (65310) | `65310-{spaceKey}.e2b.ap-beijing.sandbox.cloudstudio.club` |
| 应用访问 | `{port}-{spaceKey}.e2b.ap-beijing.sandbox.cloudstudio.club` |

## 内置静态文件服务

脚本内嵌通用 Node.js 静态文件服务，自动注入到沙箱 `/workspace/_serve.js`：

- 完整 MIME 类型支持（html/js/css/svg/图片/字体/视频等）
- SPA fallback（非文件路径返回 `index.html`）
- 路径遍历防护
- 通过 `PORT` / `ROOT` 环境变量配置
