const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./codeEditor-Btn4ynKl.js","./chunk-BRZcfu7K.js","./preload-helper-E3UYCQGP.js","./src-DRGoWjIu.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./resize-observer-QOR-7G1T.js","./wasm-C4lriWle.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./classnames-BYn3_ESJ.js","./decode-HthuYB5G.js","./index.dom-Hjybw7gi.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./hast-util-whitespace-C3G7AbkX.js","./katex-sFwAzkhG.js","./lodash-D1c13HHR.js","./merge-CDI2sNhv.js","./throttle-mAPE4S6V.js","./isObjectLike-Dan5H4Gd.js","./isSymbol-DlS8bGaY.js","./lucide-react-CmX0JwWL.js","./client-BPkZUIji.js","./jsx-runtime-BNEdAQtr.js","./dist-CSHw4oQX.js","./i18n-DH8xcldp.js","./chevron-down-icon-Bs9CIPFg.js","./copied-icon-Cvsbo-xy.js","./copy-icon-BUIWKTIn.js","./edit-icon-9Lcq4c36.js","./src-D47LCgt5.css","./dist-DUFtP4fy.js","./stringify-entities-C5RQyvNv.js","./dist-CVNH20o7.js","./dist-DNjXzICC.js","./useI18n-EyL4WIXZ.js","./file-path-usr-Mg_y.js","./codeEditor-DUwIRDT_.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { a as wb, r as init_app_core } from "./app-core-0tGlBWei.js";
//#region ../../packages/agent-ui/src/api-console/SdkDemoPanel.less
var init_SdkDemoPanel = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/account.generated.ts
var GENERATED_REGISTRY$20;
var init_account_generated = __esmMin((() => {
	GENERATED_REGISTRY$20 = [
		{
			ns: "account",
			method: "status",
			label: "当前鉴权状态。",
			defaultParams: "{}",
			doc: "当前鉴权状态。",
			returnsDoc: "`'authenticated' | 'unauthenticated' | 'expired' | 'loading'`",
			examples: ["```ts\nconst s = await wb.account.status();\nif (s === 'authenticated') { ... }\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.account.status()
		},
		{
			ns: "account",
			method: "profile",
			label: "当前登录用户的 Profile（含自动计算的 isIOA 标记）。",
			defaultParams: "{}",
			doc: "当前登录用户的 Profile（含自动计算的 isIOA 标记）。",
			returnsDoc: "`AccountProfile`，未登录返回 `undefined`",
			examples: ["```ts\nconst p = await wb.account.profile();\nconsole.log(p?.nickname, p?.isIOA);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			run: (wb) => wb.account.profile()
		},
		{
			ns: "account",
			method: "billing",
			label: "计费摘要（套餐 / 剩余积分 / 过期时间）。",
			defaultParams: "{}",
			doc: "计费摘要（套餐 / 剩余积分 / 过期时间）。",
			returnsDoc: "`AccountBilling`，无计费信息返回 `undefined`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			run: (wb) => wb.account.billing()
		},
		{
			ns: "account",
			method: "usage",
			label: "用量曲线。",
			defaultParams: "{\"range\":\"\"}",
			doc: "用量曲线。",
			returnsDoc: "`UsageData`，无数据返回 `undefined`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "range",
				type: "UsageRange",
				required: true,
				desc: "统计范围：`'day' | 'week' | 'month'`"
			}],
			run: (wb, p) => wb.account.usage(p.range)
		},
		{
			ns: "account",
			method: "checkinStatus",
			label: "签到活动状态。",
			defaultParams: "{}",
			doc: "签到活动状态。",
			returnsDoc: "`CheckinStatus`，活动未开启返回 `undefined`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			run: (wb) => wb.account.checkinStatus()
		},
		{
			ns: "account",
			method: "checkin",
			label: "领取每日签到。",
			defaultParams: "{}",
			doc: "领取每日签到。\n\n业务结果联合：调用方按 `status` 枚举判别走哪条分支。\n非系统异常——业务拒绝（已签到/活动结束等）通过 status 区分，不抛 WBError。",
			examples: ["```ts\nimport { CheckinClaimStatus } from '@genie/workbuddy-core';\nconst r = await wb.account.checkin();\nif (r.status === CheckinClaimStatus.Claimed) {\n  showReward(r.credit, r.streakDays);\n} else {\n  showReason(r.status, r.message);\n}\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.account.checkin()
		},
		{
			ns: "account",
			method: "ambassadorStatus",
			label: "大使（Ambassador）状态。",
			defaultParams: "{}",
			doc: "大使（Ambassador）状态。",
			returnsDoc: "`AmbassadorStatus`，无返回 `undefined`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			internal: true,
			run: (wb) => wb.account.ambassadorStatus()
		},
		{
			ns: "account",
			method: "isIOA",
			label: "判断当前用户是否为腾讯 IOA 内网用户。",
			defaultParams: "{}",
			doc: "判断当前用户是否为腾讯 IOA 内网用户。",
			returnsDoc: "`boolean`",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.account.isIOA()
		},
		{
			ns: "account",
			method: "login",
			label: "触发登录流程。",
			defaultParams: "{}",
			doc: "触发登录流程。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			internal: true,
			run: (wb) => wb.account.login()
		},
		{
			ns: "account",
			method: "logout",
			label: "触发登出。",
			defaultParams: "{}",
			doc: "触发登出。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			run: (wb) => wb.account.logout()
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/artifacts.generated.ts
var GENERATED_REGISTRY$19;
var init_artifacts_generated = __esmMin((() => {
	GENERATED_REGISTRY$19 = [
		{
			ns: "artifacts",
			method: "list",
			label: "制品列表。不传 conversationId 取当前会话。",
			defaultParams: "{\"conversationId\":\"\"}",
			doc: "制品列表。不传 conversationId 取当前会话。",
			returnsDoc: "`{ items: Artifact[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			params: [{
				name: "conversationId",
				type: "string | undefined",
				desc: "会话 ID（可选）"
			}],
			run: (wb, p) => wb.artifacts.list(p.conversationId)
		},
		{
			ns: "artifacts",
			method: "get",
			label: "按 ID 取制品详情；未找到 → `undefined`。",
			defaultParams: "{\"artifactId\":\"\"}",
			doc: "按 ID 取制品详情；未找到 → `undefined`。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "artifactId",
				type: "string",
				required: true,
				desc: "制品 ID"
			}],
			run: (wb, p) => wb.artifacts.get(p.artifactId)
		},
		{
			ns: "artifacts",
			method: "locate",
			label: "定位制品：返回制品的可访问位置。",
			defaultParams: "{\"artifactId\":\"\"}",
			doc: "定位制品：返回制品的可访问位置。\n- Web 端：`{ type: 'url', url }` — COS 直链或 presigned URL\n- Desktop 端：`{ type: 'local', path }` — 本地文件绝对路径",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "artifactId",
				type: "string",
				required: true,
				desc: "制品 ID"
			}],
			run: (wb, p) => wb.artifacts.locate(p.artifactId)
		},
		{
			ns: "artifacts",
			method: "reveal",
			label: "在 Finder / 资源管理器中定位制品；无文件路径 → `undefined`。",
			defaultParams: "{\"artifactId\":\"\"}",
			doc: "在 Finder / 资源管理器中定位制品；无文件路径 → `undefined`。",
			since: "1.0.0",
			platform: "desktop",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "artifactId",
				type: "string",
				required: true,
				desc: "制品 ID"
			}],
			run: (wb, p) => wb.artifacts.reveal(p.artifactId)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/automations.generated.ts
var GENERATED_REGISTRY$18;
var init_automations_generated = __esmMin((() => {
	GENERATED_REGISTRY$18 = [
		{
			ns: "automations",
			method: "list",
			label: "自动化任务列表。",
			defaultParams: "{\"page\":0,\"pageSize\":0,\"status\":\"\",\"keyword\":\"\",\"taskIds\":\"\",\"ownerType\":\"\",\"projectId\":\"\",\"withExecuteSummary\":false}",
			doc: "自动化任务列表。",
			returnsDoc: "`{ items: Automation[], total, page: { current, size } }` — SDK 标准信封 + 页码分页",
			examples: ["```ts\nconst { items, total } = await wb.automations.list({ status: 1 });\nitems.forEach(t => console.log(t.name, t.nextRunAt));\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "page",
					type: "number",
					desc: "页码（从 1 开始，不传默认 1）"
				},
				{
					name: "pageSize",
					type: "number",
					desc: "每页条数（不传默认 20）"
				},
				{
					name: "status",
					type: "AutomationStatus",
					desc: "按状态筛选：0=暂停 1=启用"
				},
				{
					name: "keyword",
					type: "string",
					desc: "按名称关键字搜索"
				},
				{
					name: "taskIds",
					type: "(string | number)[]",
					desc: "任务 ID 列表"
				},
				{
					name: "ownerType",
					type: "\"team\" | \"personal\" | \"all\"",
					desc: "归属类型筛选：'personal' | 'team' | 'all'"
				},
				{
					name: "projectId",
					type: "string",
					desc: "关联项目 ID"
				},
				{
					name: "withExecuteSummary",
					type: "boolean",
					desc: "是否携带执行摘要"
				}
			],
			run: (wb, p) => wb.automations.list(p)
		},
		{
			ns: "automations",
			method: "get",
			label: "获取单个自动化任务详情。",
			defaultParams: "{\"taskId\":\"\"}",
			doc: "获取单个自动化任务详情。",
			returnsDoc: "Automation 实体",
			examples: ["```ts\nconst task = await wb.automations.get(123);\nconsole.log(task.cronExpr, task.agentConfig.prompt);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "taskId",
				type: "AutomationTaskId",
				required: true,
				desc: "任务 ID"
			}],
			run: (wb, p) => wb.automations.get(p.taskId)
		},
		{
			ns: "automations",
			method: "create",
			label: "创建自动化任务。",
			defaultParams: "{\"taskKey\":\"\",\"workspace\":\"\",\"name\":\"\",\"description\":\"\",\"frequencyType\":\"\",\"cronExpr\":\"\",\"timezone\":\"\",\"effectiveStart\":\"\",\"effectiveEnd\":\"\",\"agentConfig\":{\"prompt\":\"\",\"model\":\"\",\"agentType\":\"\",\"conversationId\":\"\",\"connectors\":[],\"context\":\"\"},\"deliveryConfig\":{\"enabled\":false,\"channels\":\"\"},\"timeoutSec\":0,\"retryCount\":0,\"retryIntervalSec\":0,\"ownerType\":\"\",\"projectId\":\"\"}",
			doc: "创建自动化任务。",
			returnsDoc: "AutomationCreateResult — 含后端生成字段（id / nextRunAt / createdAt）",
			examples: ["```ts\nconst result = await wb.automations.create({\n    name: '每日汇报',\n    cronExpr: '0 9 * * 1-5',\n    agentConfig: { prompt: '总结昨天的工作进展' },\n});\nconsole.log(result.id, result.nextRunAt);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [
				{
					name: "taskKey",
					type: "string",
					desc: "taskKey"
				},
				{
					name: "workspace",
					type: "string",
					desc: "workspace"
				},
				{
					name: "name",
					type: "string",
					required: true,
					desc: "名称"
				},
				{
					name: "description",
					type: "string",
					desc: "描述"
				},
				{
					name: "frequencyType",
					type: "AutomationFrequencyType",
					desc: "frequencyType"
				},
				{
					name: "cronExpr",
					type: "string",
					required: true,
					desc: "cronExpr"
				},
				{
					name: "timezone",
					type: "string",
					desc: "timezone"
				},
				{
					name: "effectiveStart",
					type: "string",
					desc: "effectiveStart"
				},
				{
					name: "effectiveEnd",
					type: "string",
					desc: "effectiveEnd"
				},
				{
					name: "agentConfig",
					type: "AutomationAgentConfig",
					required: true,
					desc: "agentConfig",
					properties: [
						{
							name: "prompt",
							type: "string",
							required: true,
							desc: "执行提示词。"
						},
						{
							name: "model",
							type: "string",
							desc: "模型标识（如 'gpt-4o'）。"
						},
						{
							name: "agentType",
							type: "string",
							desc: "Agent 类型（如 'chat' / 'workflow'）。"
						},
						{
							name: "conversationId",
							type: "string",
							desc: "关联会话 ID。"
						},
						{
							name: "connectors",
							type: "string[]",
							desc: "启用的连接器列表。"
						},
						{
							name: "context",
							type: "Record<string, unknown>",
							desc: "执行上下文（自定义 KV）。"
						}
					]
				},
				{
					name: "deliveryConfig",
					type: "AutomationDeliveryConfig",
					desc: "deliveryConfig",
					properties: [{
						name: "enabled",
						type: "boolean",
						desc: "是否启用投递。"
					}, {
						name: "channels",
						type: "AutomationDeliveryChannel[]",
						desc: "投递渠道列表。"
					}]
				},
				{
					name: "timeoutSec",
					type: "number",
					desc: "timeoutSec"
				},
				{
					name: "retryCount",
					type: "number",
					desc: "retryCount"
				},
				{
					name: "retryIntervalSec",
					type: "number",
					desc: "retryIntervalSec"
				},
				{
					name: "ownerType",
					type: "AutomationOwnerType",
					desc: "所有者类型"
				},
				{
					name: "projectId",
					type: "string",
					desc: "项目 ID"
				}
			],
			run: (wb, p) => wb.automations.create(p)
		},
		{
			ns: "automations",
			method: "update",
			label: "更新自动化任务。",
			defaultParams: "{\"taskId\":\"\",\"patch\":{\"workspace\":\"\",\"name\":\"\",\"description\":\"\",\"frequencyType\":\"\",\"cronExpr\":\"\",\"timezone\":\"\",\"effectiveStart\":\"\",\"effectiveEnd\":\"\",\"agentConfig\":\"\",\"deliveryConfig\":\"\",\"timeoutSec\":\"\",\"retryCount\":\"\",\"retryIntervalSec\":\"\",\"status\":\"\"}}",
			doc: "更新自动化任务。\n\n成功静默（void），失败抛 WBError。",
			examples: ["```ts\nawait wb.automations.update(123, { status: 0 }); // 暂停任务\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "taskId",
				type: "AutomationTaskId",
				required: true,
				desc: "任务 ID"
			}, {
				name: "patch",
				type: "AutomationUpdatePatch",
				required: true,
				desc: "更新字段（name / cronExpr / status 等）",
				properties: [
					{
						name: "workspace",
						type: "string | null",
						desc: "关联工作区标识（null = 清除）。"
					},
					{
						name: "name",
						type: "string | null",
						desc: "任务名称（null = 清除）。"
					},
					{
						name: "description",
						type: "string | null",
						desc: "任务描述（null = 清除）。"
					},
					{
						name: "frequencyType",
						type: "AutomationFrequencyType | null",
						desc: "频率类型（null = 清除）。"
					},
					{
						name: "cronExpr",
						type: "string | null",
						desc: "Cron 表达式（null = 清除）。"
					},
					{
						name: "timezone",
						type: "string | null",
						desc: "时区（null = 清除）。"
					},
					{
						name: "effectiveStart",
						type: "string | null",
						desc: "生效开始时间（null = 清除）。"
					},
					{
						name: "effectiveEnd",
						type: "string | null",
						desc: "生效结束时间（null = 清除）。"
					},
					{
						name: "agentConfig",
						type: "Partial<AutomationAgentConfig> | null",
						desc: "Agent 配置更新（null = 清除）。"
					},
					{
						name: "deliveryConfig",
						type: "AutomationDeliveryConfig | null",
						desc: "通知投递配置（null = 清除）。"
					},
					{
						name: "timeoutSec",
						type: "number | null",
						desc: "超时秒数（null = 清除）。"
					},
					{
						name: "retryCount",
						type: "number | null",
						desc: "重试次数（null = 清除）。"
					},
					{
						name: "retryIntervalSec",
						type: "number | null",
						desc: "重试间隔秒数（null = 清除）。"
					},
					{
						name: "status",
						type: "AutomationStatus | null",
						desc: "任务状态（null = 不变）。"
					}
				]
			}],
			run: (wb, p) => wb.automations.update(p.taskId, p.patch)
		},
		{
			ns: "automations",
			method: "delete",
			label: "删除自动化任务。",
			defaultParams: "{\"taskId\":\"\"}",
			doc: "删除自动化任务。\n\n成功静默（void），失败抛 WBError。不可逆操作。",
			examples: ["```ts\nawait wb.automations.delete(123);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "taskId",
				type: "AutomationTaskId",
				required: true,
				desc: "任务 ID"
			}],
			run: (wb, p) => wb.automations.delete(p.taskId)
		},
		{
			ns: "automations",
			method: "trigger",
			label: "立即触发一次自动化任务执行（不影响定时计划）。",
			defaultParams: "{\"taskId\":\"\",\"opts\":{\"overrideContext\":\"\"}}",
			doc: "立即触发一次自动化任务执行（不影响定时计划）。",
			returnsDoc: "`{ logId, message }` — 本次触发的执行日志 ID",
			examples: ["```ts\nconst { logId } = await wb.automations.trigger(123);\nconsole.log('触发成功，日志 ID:', logId);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "taskId",
				type: "AutomationTaskId",
				required: true,
				desc: "任务 ID"
			}, {
				name: "opts",
				type: "AutomationTriggerOpts",
				desc: "可选参数（overrideContext 等）",
				properties: [{
					name: "overrideContext",
					type: "Record<string, unknown>",
					desc: "覆盖执行上下文（可选）。"
				}]
			}],
			run: (wb, p) => wb.automations.trigger(p.taskId, p.opts)
		},
		{
			ns: "automations",
			method: "logs",
			label: "查询自动化任务的执行历史日志（按执行时间倒序）。",
			defaultParams: "{\"taskId\":\"\",\"opts\":{\"page\":0,\"pageSize\":0,\"status\":\"\",\"startTime\":\"\",\"endTime\":\"\"}}",
			doc: "查询自动化任务的执行历史日志（按执行时间倒序）。",
			returnsDoc: "`{ items: AutomationLog[], total, page: { current, size } }` — SDK 标准信封 + 页码分页",
			examples: ["```ts\n// 查询最近执行记录\nconst { items, total } = await wb.automations.logs(123);\nitems.forEach(log => console.log(log.status, log.durationMs));\n\n// 按状态筛选 + 分页\nconst { items: failed } = await wb.automations.logs(123, {\n    status: 'failed',\n    page: 1,\n    pageSize: 10,\n});\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "taskId",
				type: "AutomationTaskId",
				required: true,
				desc: "任务 ID"
			}, {
				name: "opts",
				type: "AutomationLogsOpts",
				desc: "可选筛选/分页参数（page / pageSize / status / startTime / endTime）",
				properties: [
					{
						name: "page",
						type: "number",
						desc: "页码（从 1 开始，默认 1）。"
					},
					{
						name: "pageSize",
						type: "number",
						desc: "每页条数（默认 20）。"
					},
					{
						name: "status",
						type: "AutomationLogStatus",
						desc: "按日志状态筛选：'pending' | 'running' | 'success' | 'failed' | 'timeout' | 'cancelled'。"
					},
					{
						name: "startTime",
						type: "string",
						desc: "开始时间筛选（ISO 8601，如 '2025-06-01T00:00:00Z'）。"
					},
					{
						name: "endTime",
						type: "string",
						desc: "结束时间筛选（ISO 8601，如 '2025-06-30T23:59:59Z'）。"
					}
				]
			}],
			run: (wb, p) => wb.automations.logs(p.taskId, p.opts)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/changes.generated.ts
var GENERATED_REGISTRY$17;
var init_changes_generated = __esmMin((() => {
	GENERATED_REGISTRY$17 = [{
		ns: "changes",
		method: "list",
		label: "变更列表。不传 conversationId 取当前会话。",
		defaultParams: "{\"conversationId\":\"\"}",
		doc: "变更列表。不传 conversationId 取当前会话。",
		returnsDoc: "`{ items: Change[] }` — SDK 标准信封",
		since: "1.0.0",
		platform: "desktop, web",
		params: [{
			name: "conversationId",
			type: "string | undefined",
			desc: "会话 ID（可选）"
		}],
		run: (wb, p) => wb.changes.list(p.conversationId)
	}, {
		ns: "changes",
		method: "get",
		label: "按 ID 取变更详情；未找到 → `undefined`。",
		defaultParams: "{\"changeId\":\"\"}",
		doc: "按 ID 取变更详情；未找到 → `undefined`。",
		since: "1.0.0",
		platform: "desktop, web",
		expect: "single",
		requiresArg: true,
		params: [{
			name: "changeId",
			type: "string",
			required: true,
			desc: "变更 ID"
		}],
		run: (wb, p) => wb.changes.get(p.changeId)
	}];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/config.generated.ts
var GENERATED_REGISTRY$16;
var init_config_generated = __esmMin((() => {
	GENERATED_REGISTRY$16 = [
		{
			ns: "config",
			method: "isFeatureEnabled",
			label: "检查某功能开关是否启用。",
			defaultParams: "{\"key\":\"\"}",
			doc: "检查某功能开关是否启用。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "key",
				type: "string",
				required: true,
				desc: "功能开关名（如 'scheduler', 'teams'）"
			}],
			run: (wb, p) => wb.config.isFeatureEnabled(p.key)
		},
		{
			ns: "config.preferences",
			method: "get",
			label: "读取偏好值。",
			defaultParams: "{\"key\":\"\"}",
			doc: "读取偏好值。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "key",
				type: "string",
				required: true,
				desc: "偏好键名"
			}],
			run: (wb, p) => wb.config?.preferences?.get?.(p.key) ?? Promise.reject(/* @__PURE__ */ new Error("config.preferences 未注入"))
		},
		{
			ns: "config.preferences",
			method: "set",
			label: "写入偏好值。返回 true 表示值已变更并持久化。",
			defaultParams: "{\"key\":\"\",\"value\":\"\"}",
			doc: "写入偏好值。返回 true 表示值已变更并持久化。",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "key",
				type: "string",
				required: true,
				desc: "偏好键名"
			}, {
				name: "value",
				type: "unknown",
				required: true,
				desc: "要设置的值"
			}],
			run: (wb, p) => wb.config?.preferences?.set?.(p.key, p.value) ?? Promise.reject(/* @__PURE__ */ new Error("config.preferences 未注入"))
		},
		{
			ns: "config.preferences",
			method: "reset",
			label: "重置全部偏好为默认值，返回实际变更的 key 列表。",
			defaultParams: "{}",
			doc: "重置全部偏好为默认值，返回实际变更的 key 列表。",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			run: (wb) => wb.config?.preferences?.reset?.() ?? Promise.reject(/* @__PURE__ */ new Error("config.preferences 未注入"))
		},
		{
			ns: "config.preferences",
			method: "getTheme",
			label: "获取当前主题偏好。",
			defaultParams: "{}",
			doc: "获取当前主题偏好。",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.config?.preferences?.getTheme?.() ?? Promise.reject(/* @__PURE__ */ new Error("config.preferences 未注入"))
		},
		{
			ns: "config.preferences",
			method: "setTheme",
			label: "设置主题偏好。",
			defaultParams: "{\"value\":\"\"}",
			doc: "设置主题偏好。",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "value",
				type: "ThemePreference",
				required: true,
				desc: "主题值（如 'dark' | 'light' | 'system'）"
			}],
			run: (wb, p) => wb.config?.preferences?.setTheme?.(p.value) ?? Promise.reject(/* @__PURE__ */ new Error("config.preferences 未注入"))
		},
		{
			ns: "config.preferences",
			method: "getLanguage",
			label: "获取当前语言偏好。",
			defaultParams: "{}",
			doc: "获取当前语言偏好。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			run: (wb) => wb.config?.preferences?.getLanguage?.() ?? Promise.reject(/* @__PURE__ */ new Error("config.preferences 未注入"))
		},
		{
			ns: "config.preferences",
			method: "setLanguage",
			label: "设置语言偏好。",
			defaultParams: "{\"value\":\"\"}",
			doc: "设置语言偏好。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "value",
				type: "string",
				required: true,
				desc: "语言标识（如 'zh-CN' | 'en-US'）"
			}],
			run: (wb, p) => wb.config?.preferences?.setLanguage?.(p.value) ?? Promise.reject(/* @__PURE__ */ new Error("config.preferences 未注入"))
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/connectors.generated.ts
var GENERATED_REGISTRY$15;
var init_connectors_generated = __esmMin((() => {
	GENERATED_REGISTRY$15 = [
		{
			ns: "connectors",
			method: "list",
			label: "获取所有连接器配置（含 authMode / capabilities 等元信息）。",
			defaultParams: "{}",
			doc: "获取所有连接器配置（含 authMode / capabilities 等元信息）。",
			returnsDoc: "`{ items: ConnectorConfigInfo[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.connectors.list()
		},
		{
			ns: "connectors",
			method: "states",
			label: "获取所有连接器运行时状态。",
			defaultParams: "{}",
			doc: "获取所有连接器运行时状态。",
			returnsDoc: "key=configId 的状态字典",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.connectors.states()
		},
		{
			ns: "connectors",
			method: "connect",
			label: "发起连接（多步编排：authStart → nextAction 决策 → poll/redirect/form）。",
			defaultParams: "{\"id\":\"\",\"options\":{\"openAuth\":\"\",\"requestToken\":\"\",\"onDeviceCode\":\"\",\"projectConnectorAuth\":false,\"projectId\":\"\",\"signal\":\"\",\"skipAuth\":false,\"userInitiated\":false}}",
			doc: "发起连接（多步编排：authStart → nextAction 决策 → poll/redirect/form）。",
			returnsDoc: "操作结果（success / error / cancelled）",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "连接器标识"
			}, {
				name: "options",
				type: "ConnectOptions",
				desc: "连接选项（openAuth / requestToken / signal 等）",
				properties: [
					{
						name: "openAuth",
						type: "((url: string) => void)",
						desc: "openAuth"
					},
					{
						name: "requestToken",
						type: "((context: RequestTokenContext) => Promise<AuthCredentialInput | null>)",
						desc: "requestToken"
					},
					{
						name: "onDeviceCode",
						type: "((info: { verificationUri: string; userCode: string; }) => void)",
						desc: "onDeviceCode"
					},
					{
						name: "projectConnectorAuth",
						type: "boolean",
						desc: "项目连接器授权流程；Desktop 端默认走本地连接器流程，项目连接器需显式设为 true。"
					},
					{
						name: "projectId",
						type: "string",
						desc: "公共授权项目 ID；connect 时用于提交项目级凭据。撤销请调用 authRevoke(name, { projectId })。"
					},
					{
						name: "signal",
						type: "AbortSignal",
						desc: "signal"
					},
					{
						name: "skipAuth",
						type: "boolean",
						desc: "skipAuth"
					},
					{
						name: "userInitiated",
						type: "boolean",
						desc: "用户主动点击「连接」按钮（issue #47957）。"
					}
				]
			}],
			run: (wb, p) => wb.connectors.connect(p.id, p.options)
		},
		{
			ns: "connectors",
			method: "connectCustomMcpServer",
			label: "连接自定义 MCP Server（仅 Desktop）。",
			defaultParams: "{\"name\":\"\",\"config\":\"\",\"overwrite\":false,\"tokenValues\":\"\",\"source\":{\"type\":\"\",\"expertId\":\"\",\"pluginName\":\"\"}}",
			doc: "连接自定义 MCP Server（仅 Desktop）。",
			since: "1.0.0",
			platform: "desktop",
			requiresArg: true,
			internal: true,
			params: [
				{
					name: "name",
					type: "string",
					required: true,
					desc: "名称"
				},
				{
					name: "config",
					type: "Record<string, unknown>",
					required: true,
					desc: "config"
				},
				{
					name: "overwrite",
					type: "boolean",
					desc: "overwrite"
				},
				{
					name: "tokenValues",
					type: "Record<string, string>",
					desc: "tokenValues"
				},
				{
					name: "source",
					type: "{ type: \"expert\"; expertId: string; pluginName?: string; }",
					desc: "来源",
					properties: [
						{
							name: "type",
							type: "\"expert\"",
							required: true,
							desc: "类型"
						},
						{
							name: "expertId",
							type: "string",
							required: true,
							desc: "Expert ID"
						},
						{
							name: "pluginName",
							type: "string",
							desc: "pluginName"
						}
					]
				}
			],
			run: (wb, p) => wb.connectors.connectCustomMcpServer(p)
		},
		{
			ns: "connectors",
			method: "disconnect",
			label: "断开连接（不撤销授权）。",
			defaultParams: "{\"id\":\"\"}",
			doc: "断开连接（不撤销授权）。\n\nDesktop 端：仅关闭当前 MCP transport，保留已授权凭证（token），\n下次调用 connect 可直接重连无需再走 OAuth。\n\nWeb 端：后端仅有\"已授权/未授权\"两态，无法\"断开但保留授权\"，\n因此行为等价于 `unbind`（会撤销授权）。",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "连接器标识"
			}],
			run: (wb, p) => wb.connectors.disconnect(p.id)
		},
		{
			ns: "connectors",
			method: "unbind",
			label: "解绑连接器（彻底撤销授权）。",
			defaultParams: "{\"id\":\"\"}",
			doc: "解绑连接器（彻底撤销授权）。\n\n撤销 OAuth 授权并清除本地凭证，下次使用需重新走完整授权流程。\n与 `disconnect` 的区别：disconnect 仅断开连接但保留凭证（Desktop 端），\nunbind 则彻底清除授权。Web 端两者行为一致。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "连接器标识"
			}],
			run: (wb, p) => wb.connectors.unbind(p.id)
		},
		{
			ns: "connectors",
			method: "reset",
			label: "重置连接器（清除本地状态）。",
			defaultParams: "{\"id\":\"\"}",
			doc: "重置连接器（清除本地状态）。",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "连接器标识"
			}],
			run: (wb, p) => wb.connectors.reset(p.id)
		},
		{
			ns: "connectors",
			method: "authStart",
			label: "发起授权（底层原语，高级用户自定义授权流时使用）。",
			defaultParams: "{\"name\":\"\"}",
			doc: "发起授权（底层原语，高级用户自定义授权流时使用）。\n通常应通过 `connect()` 自动编排，无需直接调用。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			internal: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "连接器标识"
			}],
			run: (wb, p) => wb.connectors.authStart(p.name)
		},
		{
			ns: "connectors",
			method: "authStatus",
			label: "查询授权状态（底层原语）。",
			defaultParams: "{\"name\":\"\"}",
			doc: "查询授权状态（底层原语）。\n通常应通过 `connect()` 自动编排，无需直接调用。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			internal: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "连接器标识"
			}],
			run: (wb, p) => wb.connectors.authStatus(p.name)
		},
		{
			ns: "connectors",
			method: "authAccessToken",
			label: "获取 access token（底层原语，用于 MCP server header 注入）。",
			defaultParams: "{\"name\":\"\"}",
			doc: "获取 access token（底层原语，用于 MCP server header 注入）。\n通常应通过 `connect()` 自动编排，无需直接调用。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			internal: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "连接器标识"
			}],
			run: (wb, p) => wb.connectors.authAccessToken(p.name)
		},
		{
			ns: "connectors",
			method: "authRevoke",
			label: "撤销授权（底层原语）。",
			defaultParams: "{\"name\":\"\",\"params\":{\"projectId\":\"\"}}",
			doc: "撤销授权（底层原语）。\n通常应通过 `unbind()` 完成，无需直接调用。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			internal: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "连接器标识"
			}, {
				name: "params",
				type: "{ projectId?: string; }",
				desc: "params",
				properties: [{
					name: "projectId",
					type: "string",
					desc: "公共授权项目 ID"
				}]
			}],
			run: (wb, p) => wb.connectors.authRevoke(p.name, p.params)
		},
		{
			ns: "connectors",
			method: "authConnect",
			label: "提交授权凭据（底层原语：API Key / OAuth code / 动态表单）。",
			defaultParams: "{\"name\":\"\",\"params\":{\"toString\":\"\",\"valueOf\":\"\"}}",
			doc: "提交授权凭据（底层原语：API Key / OAuth code / 动态表单）。\n通常应通过 `connect()` 自动编排，无需直接调用。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			internal: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "连接器标识"
			}, {
				name: "params",
				type: "string | AuthConnectParams",
				desc: "凭据",
				properties: [{
					name: "toString",
					type: "unknown",
					desc: "function toString() { [native code] }"
				}, {
					name: "valueOf",
					type: "unknown",
					desc: "function valueOf() { [native code] }"
				}]
			}],
			run: (wb, p) => wb.connectors.authConnect(p.name, p.params)
		},
		{
			ns: "connectors",
			method: "updateHeaders",
			label: "更新连接器 HTTP headers（热更新，无需重连）。",
			defaultParams: "{\"id\":\"\",\"headers\":\"\"}",
			doc: "更新连接器 HTTP headers（热更新，无需重连）。\n底层运行时操作，供自定义连接流使用。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			requiresArg: true,
			internal: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "连接器标识"
			}, {
				name: "headers",
				type: "Record<string, string>",
				required: true,
				desc: "新的 header map"
			}],
			run: (wb, p) => wb.connectors.updateHeaders(p.id, p.headers)
		},
		{
			ns: "connectors",
			method: "updateEnv",
			label: "更新连接器环境变量（热更新，无需重连）。",
			defaultParams: "{\"id\":\"\",\"env\":\"\"}",
			doc: "更新连接器环境变量（热更新，无需重连）。\n底层运行时操作，供自定义连接流使用。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			requiresArg: true,
			internal: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "连接器标识"
			}, {
				name: "env",
				type: "Record<string, string>",
				required: true,
				desc: "新的环境变量 map"
			}],
			run: (wb, p) => wb.connectors.updateEnv(p.id, p.env)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/conversations.generated.ts
var GENERATED_REGISTRY$14;
var init_conversations_generated = __esmMin((() => {
	GENERATED_REGISTRY$14 = [
		{
			ns: "conversations",
			method: "list",
			label: "会话列表。",
			defaultParams: "{\"page\":0,\"pageSize\":0,\"title\":\"\",\"conversationOrigin\":\"\",\"dayRange\":0,\"sort\":{\"orderBy\":\"\",\"order\":\"\"},\"filters\":\"\"}",
			doc: "会话列表。",
			returnsDoc: "`{ items, total, page }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "page",
					type: "number",
					desc: "页码（从 1 开始，默认 1）"
				},
				{
					name: "pageSize",
					type: "number",
					desc: "每页条数（默认 20）"
				},
				{
					name: "title",
					type: "string",
					desc: "标题"
				},
				{
					name: "conversationOrigin",
					type: "string",
					desc: "会话来源（agents / teams / scheduler）"
				},
				{
					name: "dayRange",
					type: "number",
					desc: "时间范围（天数）"
				},
				{
					name: "sort",
					type: "{ orderBy: string; order: \"asc\" | \"desc\"; }",
					desc: "排序规则",
					properties: [{
						name: "orderBy",
						type: "string",
						required: true,
						desc: "orderBy"
					}, {
						name: "order",
						type: "\"asc\" | \"desc\"",
						required: true,
						desc: "排序方向（asc / desc）"
					}]
				},
				{
					name: "filters",
					type: "{ field: string; value: string; }[]",
					desc: "筛选条件"
				}
			],
			run: (wb, p) => wb.conversations.list(p)
		},
		{
			ns: "conversations",
			method: "create",
			label: "创建新会话，返回会话详情。",
			defaultParams: "{\"title\":\"\",\"cwd\":\"\",\"expertId\":\"\",\"locale\":\"\",\"mode\":\"\",\"model\":\"\",\"tags\":\"\",\"visibility\":\"\",\"conversationOrigin\":\"\",\"projectId\":\"\"}",
			doc: "创建新会话，返回会话详情。",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			params: [
				{
					name: "title",
					type: "string",
					desc: "标题"
				},
				{
					name: "cwd",
					type: "string",
					desc: "工作目录路径"
				},
				{
					name: "expertId",
					type: "string",
					desc: "Expert ID"
				},
				{
					name: "locale",
					type: "string",
					desc: "语言区域（如 zh-CN / en-US）"
				},
				{
					name: "mode",
					type: "string",
					desc: "模式"
				},
				{
					name: "model",
					type: "string",
					desc: "模型标识"
				},
				{
					name: "tags",
					type: "Record<string, string>",
					desc: "标签"
				},
				{
					name: "visibility",
					type: "\"PRIVATE\" | \"PUBLIC\"",
					desc: "可见性"
				},
				{
					name: "conversationOrigin",
					type: "\"agents\" | \"teams\" | \"scheduler\" | \"teams_scheduler\"",
					desc: "会话来源（agents / teams / scheduler）"
				},
				{
					name: "projectId",
					type: "string",
					desc: "项目 ID"
				}
			],
			run: (wb, p) => wb.conversations.create(p)
		},
		{
			ns: "conversations",
			method: "get",
			label: "获取会话详情。",
			defaultParams: "{\"conversationId\":\"\"}",
			doc: "获取会话详情。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "conversationId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}],
			run: (wb, p) => wb.conversations.get(p.conversationId)
		},
		{
			ns: "conversations",
			method: "rename",
			label: "重命名会话。",
			defaultParams: "{\"conversationId\":\"\",\"title\":\"\"}",
			doc: "重命名会话。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "conversationId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}, {
				name: "title",
				type: "string",
				required: true,
				desc: "新标题"
			}],
			run: (wb, p) => wb.conversations.rename(p.conversationId, p.title)
		},
		{
			ns: "conversations",
			method: "update",
			label: "更新会话属性。",
			defaultParams: "{\"conversationId\":\"\",\"params\":{\"title\":\"\",\"visibility\":\"\",\"expertId\":\"\",\"locale\":\"\"}}",
			doc: "更新会话属性。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "conversationId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}, {
				name: "params",
				type: "UpdateParams",
				required: true,
				desc: "要更新的字段（title / visibility / expertId / locale）",
				properties: [
					{
						name: "title",
						type: "string",
						desc: "标题"
					},
					{
						name: "visibility",
						type: "\"PRIVATE\" | \"PUBLIC\"",
						desc: "可见性"
					},
					{
						name: "expertId",
						type: "string",
						desc: "Expert ID（空字符串=切回无专家模式）"
					},
					{
						name: "locale",
						type: "string",
						desc: "Expert locale"
					}
				]
			}],
			run: (wb, p) => wb.conversations.update(p.conversationId, p.params)
		},
		{
			ns: "conversations",
			method: "delete",
			label: "删除会话。",
			defaultParams: "{\"conversationId\":\"\"}",
			doc: "删除会话。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "conversationId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}],
			run: (wb, p) => wb.conversations.delete(p.conversationId)
		},
		{
			ns: "conversations",
			method: "archive",
			label: "归档会话。",
			defaultParams: "{\"conversationId\":\"\"}",
			doc: "归档会话。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "conversationId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}],
			run: (wb, p) => wb.conversations.archive(p.conversationId)
		},
		{
			ns: "conversations",
			method: "unarchive",
			label: "取消归档会话。",
			defaultParams: "{\"conversationId\":\"\"}",
			doc: "取消归档会话。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "conversationId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}],
			run: (wb, p) => wb.conversations.unarchive(p.conversationId)
		},
		{
			ns: "conversations",
			method: "fork",
			label: "复制会话，返回新会话详情。",
			defaultParams: "{\"conversationId\":\"\"}",
			doc: "复制会话，返回新会话详情。",
			since: "1.0.0",
			platform: "web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "conversationId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}],
			run: (wb, p) => wb.conversations.fork(p.conversationId)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/experts.generated.ts
var GENERATED_REGISTRY$13;
var init_experts_generated = __esmMin((() => {
	GENERATED_REGISTRY$13 = [
		{
			ns: "experts",
			method: "list",
			label: "专家列表。",
			defaultParams: "{\"categoryId\":\"\",\"enterpriseId\":\"\",\"source\":\"\"}",
			doc: "专家列表。",
			returnsDoc: "`{ items: Expert[] }` —— SDK 标准信封",
			examples: ["```ts\nconst { items } = await wb.experts.list({ categoryId: null });\nitems.forEach(e => console.log(e.name));\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "categoryId",
					type: "string | null",
					desc: "分类 ID，null/undefined = 不限分类"
				},
				{
					name: "enterpriseId",
					type: "string",
					desc: "企业 ID（Web 端必填，Desktop 可省略）"
				},
				{
					name: "source",
					type: "string",
					desc: "集合归属：'builtin' | 'custom'，默认 'builtin'"
				}
			],
			run: (wb, p) => wb.experts.list(p)
		},
		{
			ns: "experts",
			method: "get",
			label: "专家详情。",
			defaultParams: "{\"expertId\":\"\",\"locale\":\"\",\"enterpriseId\":\"\"}",
			doc: "专家详情。\n\n不存在时抛 WBError(NOT_FOUND)——expertId 通常来自 list() 结果，\n找不到意味着数据不一致（非正常业务路径），用抛错而非 undefined 表达。",
			returnsDoc: "Expert 实体（永远非 null/undefined，找不到直接抛错）",
			examples: ["```ts\nconst expert = await wb.experts.get({ expertId: 'xxx' });\nconsole.log(expert.name);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [
				{
					name: "expertId",
					type: "string",
					required: true,
					desc: "专家 ID"
				},
				{
					name: "locale",
					type: "string",
					desc: "语言区域（如 zh-CN / en-US）"
				},
				{
					name: "enterpriseId",
					type: "string",
					desc: "企业标识"
				}
			],
			run: (wb, p) => wb.experts.get(p)
		},
		{
			ns: "experts",
			method: "categories",
			label: "专家分类列表。",
			defaultParams: "{\"enterpriseId\":\"\"}",
			doc: "专家分类列表。",
			returnsDoc: "`{ items: ExpertCategory[] }` —— SDK 标准信封",
			examples: ["```ts\nconst { items } = await wb.experts.categories();\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			params: [{
				name: "enterpriseId",
				type: "string",
				desc: "企业 ID（Web 端必填）"
			}],
			run: (wb, p) => wb.experts.categories(p)
		},
		{
			ns: "experts",
			method: "recent",
			label: "最近使用的专家列表。",
			defaultParams: "{\"sessionId\":\"\"}",
			doc: "最近使用的专家列表。",
			returnsDoc: "`{ items: RecentExpert[] }` —— SDK 标准信封",
			examples: ["```ts\nconst { items } = await wb.experts.recent({ sessionId });\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "sessionId",
				type: "string",
				required: true,
				desc: "会话 ID"
			}],
			run: (wb, p) => wb.experts.recent(p)
		},
		{
			ns: "experts",
			method: "ranking",
			label: "专家使用排行榜。",
			defaultParams: "{\"limit\":0,\"enterpriseId\":\"\",\"days\":0}",
			doc: "专家使用排行榜。",
			returnsDoc: "`ExpertRankingResult | null`（null = 无数据）",
			examples: ["```ts\nconst r = await wb.experts.ranking({ limit: 10 });\nif (r) console.log(r.items[0].name);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "limit",
					type: "number",
					desc: "返回条数上限"
				},
				{
					name: "enterpriseId",
					type: "string",
					desc: "企业标识"
				},
				{
					name: "days",
					type: "number",
					desc: "统计最近 N 天（0 = 全量）"
				}
			],
			run: (wb, p) => wb.experts.ranking(p)
		},
		{
			ns: "experts",
			method: "summon",
			label: "召唤专家（创建会话 + 绑定专家）。",
			defaultParams: "{\"expertId\":\"\",\"sessionId\":\"\",\"locale\":\"\",\"industryId\":\"\",\"source\":\"\",\"enterpriseId\":\"\"}",
			doc: "召唤专家（创建会话 + 绑定专家）。\n\n写操作：会话状态变更，不可逆。",
			returnsDoc: "ExpertSummonResult — 含专家的完整上下文",
			examples: ["```ts\nconst { expert } = await wb.experts.summon({ expertId: 'xxx', sessionId: 'yyy' });\nconsole.log(expert.prompt);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [
				{
					name: "expertId",
					type: "string",
					required: true,
					desc: "专家 ID"
				},
				{
					name: "sessionId",
					type: "string",
					desc: "目标会话 ID"
				},
				{
					name: "locale",
					type: "\"zh\" | \"en\"",
					desc: "语言区域（如 zh-CN / en-US）"
				},
				{
					name: "industryId",
					type: "string",
					desc: "industryId"
				},
				{
					name: "source",
					type: "string",
					desc: "来源"
				},
				{
					name: "enterpriseId",
					type: "string",
					desc: "企业标识"
				}
			],
			run: (wb, p) => wb.experts.summon(p)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/http.generated.ts
var GENERATED_REGISTRY$12;
var init_http_generated = __esmMin((() => {
	GENERATED_REGISTRY$12 = [
		{
			ns: "http",
			method: "get",
			label: "发送 GET 请求。",
			defaultParams: "{\"url\":\"\",\"config\":{\"headers\":\"\",\"timeout\":0,\"params\":\"\",\"responseType\":\"\"}}",
			doc: "发送 GET 请求。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "url",
				type: "string",
				required: true,
				desc: "url"
			}, {
				name: "config",
				type: "HttpRequestConfig",
				desc: "config",
				properties: [
					{
						name: "headers",
						type: "Record<string, string>",
						desc: "请求 headers"
					},
					{
						name: "timeout",
						type: "number",
						desc: "超时毫秒数"
					},
					{
						name: "params",
						type: "Record<string, unknown>",
						desc: "query 参数"
					},
					{
						name: "responseType",
						type: "\"json\" | \"text\" | \"blob\" | \"arraybuffer\"",
						desc: "响应类型（默认 json）"
					}
				]
			}],
			run: (wb, p) => wb.http.get(p.url, p.config)
		},
		{
			ns: "http",
			method: "post",
			label: "发送 POST 请求。",
			defaultParams: "{\"url\":\"\",\"data\":\"\",\"config\":{\"headers\":\"\",\"timeout\":0,\"params\":\"\",\"responseType\":\"\"}}",
			doc: "发送 POST 请求。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [
				{
					name: "url",
					type: "string",
					required: true,
					desc: "url"
				},
				{
					name: "data",
					type: "any",
					desc: "data"
				},
				{
					name: "config",
					type: "HttpRequestConfig",
					desc: "config",
					properties: [
						{
							name: "headers",
							type: "Record<string, string>",
							desc: "请求 headers"
						},
						{
							name: "timeout",
							type: "number",
							desc: "超时毫秒数"
						},
						{
							name: "params",
							type: "Record<string, unknown>",
							desc: "query 参数"
						},
						{
							name: "responseType",
							type: "\"json\" | \"text\" | \"blob\" | \"arraybuffer\"",
							desc: "响应类型（默认 json）"
						}
					]
				}
			],
			run: (wb, p) => wb.http.post(p.url, p.data, p.config)
		},
		{
			ns: "http",
			method: "put",
			label: "发送 PUT 请求。",
			defaultParams: "{\"url\":\"\",\"data\":\"\",\"config\":{\"headers\":\"\",\"timeout\":0,\"params\":\"\",\"responseType\":\"\"}}",
			doc: "发送 PUT 请求。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [
				{
					name: "url",
					type: "string",
					required: true,
					desc: "url"
				},
				{
					name: "data",
					type: "any",
					desc: "data"
				},
				{
					name: "config",
					type: "HttpRequestConfig",
					desc: "config",
					properties: [
						{
							name: "headers",
							type: "Record<string, string>",
							desc: "请求 headers"
						},
						{
							name: "timeout",
							type: "number",
							desc: "超时毫秒数"
						},
						{
							name: "params",
							type: "Record<string, unknown>",
							desc: "query 参数"
						},
						{
							name: "responseType",
							type: "\"json\" | \"text\" | \"blob\" | \"arraybuffer\"",
							desc: "响应类型（默认 json）"
						}
					]
				}
			],
			run: (wb, p) => wb.http.put(p.url, p.data, p.config)
		},
		{
			ns: "http",
			method: "patch",
			label: "发送 PATCH 请求。",
			defaultParams: "{\"url\":\"\",\"data\":\"\",\"config\":{\"headers\":\"\",\"timeout\":0,\"params\":\"\",\"responseType\":\"\"}}",
			doc: "发送 PATCH 请求。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [
				{
					name: "url",
					type: "string",
					required: true,
					desc: "url"
				},
				{
					name: "data",
					type: "any",
					desc: "data"
				},
				{
					name: "config",
					type: "HttpRequestConfig",
					desc: "config",
					properties: [
						{
							name: "headers",
							type: "Record<string, string>",
							desc: "请求 headers"
						},
						{
							name: "timeout",
							type: "number",
							desc: "超时毫秒数"
						},
						{
							name: "params",
							type: "Record<string, unknown>",
							desc: "query 参数"
						},
						{
							name: "responseType",
							type: "\"json\" | \"text\" | \"blob\" | \"arraybuffer\"",
							desc: "响应类型（默认 json）"
						}
					]
				}
			],
			run: (wb, p) => wb.http.patch(p.url, p.data, p.config)
		},
		{
			ns: "http",
			method: "delete",
			label: "发送 DELETE 请求。",
			defaultParams: "{\"url\":\"\",\"config\":{\"headers\":\"\",\"timeout\":0,\"params\":\"\",\"responseType\":\"\"}}",
			doc: "发送 DELETE 请求。",
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "url",
				type: "string",
				required: true,
				desc: "url"
			}, {
				name: "config",
				type: "HttpRequestConfig",
				desc: "config",
				properties: [
					{
						name: "headers",
						type: "Record<string, string>",
						desc: "请求 headers"
					},
					{
						name: "timeout",
						type: "number",
						desc: "超时毫秒数"
					},
					{
						name: "params",
						type: "Record<string, unknown>",
						desc: "query 参数"
					},
					{
						name: "responseType",
						type: "\"json\" | \"text\" | \"blob\" | \"arraybuffer\"",
						desc: "响应类型（默认 json）"
					}
				]
			}],
			run: (wb, p) => wb.http.delete(p.url, p.config)
		},
		{
			ns: "http",
			method: "upload",
			label: "上传文件。通过 $provide('http', { upload }) 注入实现。",
			defaultParams: "{\"content\":\"\",\"filePath\":\"\",\"filename\":\"\",\"mimeType\":\"\",\"onProgress\":\"\",\"requestId\":\"\"}",
			doc: "上传文件。通过 $provide('http', { upload }) 注入实现。",
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "content",
					type: "string | Blob | ArrayBuffer",
					desc: "content"
				},
				{
					name: "filePath",
					type: "string",
					desc: "filePath"
				},
				{
					name: "filename",
					type: "string",
					desc: "filename"
				},
				{
					name: "mimeType",
					type: "string",
					desc: "mimeType"
				},
				{
					name: "onProgress",
					type: "((event: UploadProgressEvent) => void)",
					desc: "onProgress"
				},
				{
					name: "requestId",
					type: "string",
					desc: "requestId"
				}
			],
			run: (wb, p) => wb.http.upload(p)
		},
		{
			ns: "http",
			method: "download",
			label: "下载文件。Desktop 走 shell/saveAs；Web 走 `<a download>` 兜底。",
			defaultParams: "{\"url\":\"\",\"filename\":\"\",\"saveAs\":false}",
			doc: "下载文件。Desktop 走 shell/saveAs；Web 走 `<a download>` 兜底。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [
				{
					name: "url",
					type: "string",
					required: true,
					desc: "url"
				},
				{
					name: "filename",
					type: "string",
					desc: "filename"
				},
				{
					name: "saveAs",
					type: "boolean",
					desc: "saveAs"
				}
			],
			run: (wb, p) => wb.http.download(p)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/models.generated.ts
var GENERATED_REGISTRY$11;
var init_models_generated = __esmMin((() => {
	GENERATED_REGISTRY$11 = [
		{
			ns: "models",
			method: "list",
			label: "可用模型列表（内置 + 企业 + 自定义）。",
			defaultParams: "{\"dataSource\":\"\"}",
			doc: "可用模型列表（内置 + 企业 + 自定义）。",
			returnsDoc: "`{ items: Model[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			params: [{
				name: "dataSource",
				type: "\"local\" | \"cloud\"",
				desc: "数据源。`'local'` = 本地缓存（Desktop 默认）；`'cloud'` = 云端 API（Web 默认，Desktop 强制走 HTTP）。不传 = 当前平台默认。"
			}],
			run: (wb, p) => wb.models.list(p)
		},
		{
			ns: "models",
			method: "get",
			label: "按 ID 获取模型。",
			defaultParams: "{\"id\":\"\"}",
			doc: "按 ID 获取模型。",
			returnsDoc: "`Model | undefined`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "模型 ID"
			}],
			run: (wb, p) => wb.models.get(p.id)
		},
		{
			ns: "models",
			method: "customs",
			label: "自定义模型列表。",
			defaultParams: "{}",
			doc: "自定义模型列表。",
			returnsDoc: "`{ items: CustomModel[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop",
			run: (wb) => wb.models.customs()
		},
		{
			ns: "models",
			method: "addCustom",
			label: "添加自定义模型。",
			defaultParams: "{\"id\":\"\",\"name\":\"\",\"vendor\":\"\",\"url\":\"\",\"apiKey\":\"\",\"maxInputTokens\":0,\"maxOutputTokens\":0,\"temperature\":0,\"supportsToolCall\":false,\"supportsImages\":false,\"supportsReasoning\":false,\"onlyReasoning\":false,\"reasoning\":{\"effort\":\"\",\"defaultEffort\":\"\",\"supportedEfforts\":\"\",\"summary\":\"\",\"canDisableThinking\":false},\"useCustomProtocol\":false}",
			doc: "添加自定义模型。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [
				{
					name: "id",
					type: "string",
					required: true,
					desc: "ID"
				},
				{
					name: "name",
					type: "string",
					desc: "名称"
				},
				{
					name: "vendor",
					type: "string",
					desc: "vendor"
				},
				{
					name: "url",
					type: "string",
					desc: "url"
				},
				{
					name: "apiKey",
					type: "string",
					desc: "apiKey"
				},
				{
					name: "maxInputTokens",
					type: "number",
					desc: "maxInputTokens"
				},
				{
					name: "maxOutputTokens",
					type: "number",
					desc: "maxOutputTokens"
				},
				{
					name: "temperature",
					type: "number",
					desc: "temperature"
				},
				{
					name: "supportsToolCall",
					type: "boolean",
					desc: "supportsToolCall"
				},
				{
					name: "supportsImages",
					type: "boolean",
					desc: "supportsImages"
				},
				{
					name: "supportsReasoning",
					type: "boolean",
					desc: "supportsReasoning"
				},
				{
					name: "onlyReasoning",
					type: "boolean",
					desc: "onlyReasoning"
				},
				{
					name: "reasoning",
					type: "ReasoningConfig",
					desc: "reasoning",
					properties: [
						{
							name: "effort",
							type: "ReasoningEffortLevel",
							desc: "effort"
						},
						{
							name: "defaultEffort",
							type: "ReasoningEffortLevel",
							desc: "默认推理强度（优先级高于 effort）"
						},
						{
							name: "supportedEfforts",
							type: "readonly ReasoningEffortLevel[]",
							desc: "UI 可展示的强度档位（仅 UI，与请求层翻译表 thinkingLevelMap 不同维度）"
						},
						{
							name: "summary",
							type: "\"auto\" | \"always\" | \"never\"",
							desc: "摘要模式"
						},
						{
							name: "canDisableThinking",
							type: "boolean",
							desc: "当前模型是否提供\"关闭思考\"入口。默认 true。"
						}
					]
				},
				{
					name: "useCustomProtocol",
					type: "boolean",
					desc: "useCustomProtocol"
				}
			],
			run: (wb, p) => wb.models.addCustom(p)
		},
		{
			ns: "models",
			method: "updateCustom",
			label: "修改自定义模型（按 config.id 定位，ID 不允许改）。",
			defaultParams: "{\"id\":\"\",\"name\":\"\",\"vendor\":\"\",\"url\":\"\",\"apiKey\":\"\",\"maxInputTokens\":0,\"maxOutputTokens\":0,\"temperature\":0,\"supportsToolCall\":false,\"supportsImages\":false,\"supportsReasoning\":false,\"onlyReasoning\":false,\"reasoning\":{\"effort\":\"\",\"defaultEffort\":\"\",\"supportedEfforts\":\"\",\"summary\":\"\",\"canDisableThinking\":false},\"useCustomProtocol\":false}",
			doc: "修改自定义模型（按 config.id 定位，ID 不允许改）。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [
				{
					name: "id",
					type: "string",
					required: true,
					desc: "ID"
				},
				{
					name: "name",
					type: "string",
					desc: "名称"
				},
				{
					name: "vendor",
					type: "string",
					desc: "vendor"
				},
				{
					name: "url",
					type: "string",
					desc: "url"
				},
				{
					name: "apiKey",
					type: "string",
					desc: "apiKey"
				},
				{
					name: "maxInputTokens",
					type: "number",
					desc: "maxInputTokens"
				},
				{
					name: "maxOutputTokens",
					type: "number",
					desc: "maxOutputTokens"
				},
				{
					name: "temperature",
					type: "number",
					desc: "temperature"
				},
				{
					name: "supportsToolCall",
					type: "boolean",
					desc: "supportsToolCall"
				},
				{
					name: "supportsImages",
					type: "boolean",
					desc: "supportsImages"
				},
				{
					name: "supportsReasoning",
					type: "boolean",
					desc: "supportsReasoning"
				},
				{
					name: "onlyReasoning",
					type: "boolean",
					desc: "onlyReasoning"
				},
				{
					name: "reasoning",
					type: "ReasoningConfig",
					desc: "reasoning",
					properties: [
						{
							name: "effort",
							type: "ReasoningEffortLevel",
							desc: "effort"
						},
						{
							name: "defaultEffort",
							type: "ReasoningEffortLevel",
							desc: "默认推理强度（优先级高于 effort）"
						},
						{
							name: "supportedEfforts",
							type: "readonly ReasoningEffortLevel[]",
							desc: "UI 可展示的强度档位（仅 UI，与请求层翻译表 thinkingLevelMap 不同维度）"
						},
						{
							name: "summary",
							type: "\"auto\" | \"always\" | \"never\"",
							desc: "摘要模式"
						},
						{
							name: "canDisableThinking",
							type: "boolean",
							desc: "当前模型是否提供\"关闭思考\"入口。默认 true。"
						}
					]
				},
				{
					name: "useCustomProtocol",
					type: "boolean",
					desc: "useCustomProtocol"
				}
			],
			run: (wb, p) => wb.models.updateCustom(p)
		},
		{
			ns: "models",
			method: "deleteCustom",
			label: "删除自定义模型。",
			defaultParams: "{\"id\":\"\"}",
			doc: "删除自定义模型。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "模型 ID"
			}],
			run: (wb, p) => wb.models.deleteCustom(p.id)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/navigation.generated.ts
var GENERATED_REGISTRY$10;
var init_navigation_generated = __esmMin((() => {
	GENERATED_REGISTRY$10 = [
		{
			ns: "navigation",
			method: "goto",
			label: "跳转：URL 字符串或结构化对象。",
			defaultParams: "{\"toString\":\"\",\"valueOf\":\"\"}",
			doc: "跳转：URL 字符串或结构化对象。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "toString",
				type: "unknown",
				required: true,
				desc: "function toString() { [native code] }"
			}, {
				name: "valueOf",
				type: "unknown",
				required: true,
				desc: "function valueOf() { [native code] }"
			}],
			run: (wb, p) => wb.navigation.goto(p)
		},
		{
			ns: "navigation",
			method: "back",
			label: "返回上一个路由。",
			defaultParams: "{}",
			doc: "返回上一个路由。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			run: (wb) => wb.navigation.back()
		},
		{
			ns: "navigation",
			method: "openPanel",
			label: "打开面板（叠加层，不影响路由）。",
			defaultParams: "{\"panelId\":\"\",\"props\":\"\"}",
			doc: "打开面板（叠加层，不影响路由）。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "panelId",
				type: "string",
				required: true,
				desc: "panelId"
			}, {
				name: "props",
				type: "Record<string, unknown> | undefined",
				desc: "props"
			}],
			run: (wb, p) => wb.navigation.openPanel(p.panelId, p.props)
		},
		{
			ns: "navigation",
			method: "closePanel",
			label: "关闭面板。",
			defaultParams: "{\"panelId\":\"\"}",
			doc: "关闭面板。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "panelId",
				type: "string",
				required: true,
				desc: "panelId"
			}],
			run: (wb, p) => wb.navigation.closePanel(p.panelId)
		},
		{
			ns: "navigation",
			method: "openExternal",
			label: "打开外部链接（Desktop: shell.openExternal / Web: window.open）。",
			defaultParams: "{\"url\":\"\"}",
			doc: "打开外部链接（Desktop: shell.openExternal / Web: window.open）。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "url",
				type: "string",
				required: true,
				desc: "url"
			}],
			run: (wb, p) => wb.navigation.openExternal(p.url)
		},
		{
			ns: "navigation",
			method: "parse",
			label: "解析路由字符串为结构化对象（同步）。",
			defaultParams: "{\"route\":\"\"}",
			doc: "解析路由字符串为结构化对象（同步）。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "route",
				type: "string",
				required: true,
				desc: "route"
			}],
			run: (wb, p) => wb.navigation.parse(p.route)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/notifications.generated.ts
var GENERATED_REGISTRY$9;
var init_notifications_generated = __esmMin((() => {
	GENERATED_REGISTRY$9 = [
		{
			ns: "notifications",
			method: "list",
			label: "通知列表（游标分页）。",
			defaultParams: "{\"cursor\":\"\",\"limit\":0}",
			doc: "通知列表（游标分页）。",
			returnsDoc: "`{ items, nextCursor }` — SDK 标准信封 + 游标分页",
			since: "1.0.0",
			platform: "desktop, web",
			params: [{
				name: "cursor",
				type: "string",
				desc: "游标（首次不传）"
			}, {
				name: "limit",
				type: "number",
				desc: "每页条数"
			}],
			run: (wb, p) => wb.notifications.list(p)
		},
		{
			ns: "notifications",
			method: "summary",
			label: "通知摘要（未读数 + 红点 + 轮询间隔）。",
			defaultParams: "{}",
			doc: "通知摘要（未读数 + 红点 + 轮询间隔）。",
			returnsDoc: "`NotificationSummaryResult`，无数据返回 `undefined`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			run: (wb) => wb.notifications.summary()
		},
		{
			ns: "notifications",
			method: "markAsRead",
			label: "标记已读（指定消息）。",
			defaultParams: "{\"msgIds\":[]}",
			doc: "标记已读（指定消息）。",
			returnsDoc: "`NotificationMarkAsReadResult`",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "msgIds",
				type: "string[]",
				required: true,
				desc: "消息 ID 列表"
			}],
			run: (wb, p) => wb.notifications.markAsRead(p)
		},
		{
			ns: "notifications",
			method: "markAllAsRead",
			label: "全部标记已读。",
			defaultParams: "{}",
			doc: "全部标记已读。",
			returnsDoc: "`NotificationMarkAsReadResult`",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.notifications.markAllAsRead()
		},
		{
			ns: "notifications",
			method: "delete",
			label: "删除消息。",
			defaultParams: "{\"msgId\":\"\"}",
			doc: "删除消息。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "msgId",
				type: "string",
				required: true,
				desc: "消息 ID"
			}],
			run: (wb, p) => wb.notifications.delete(p.msgId)
		},
		{
			ns: "notifications",
			method: "updateExt",
			label: "更新消息扩展数据。",
			defaultParams: "{\"msgId\":\"\",\"ext\":\"\",\"userExt\":\"\"}",
			doc: "更新消息扩展数据。\n\n两个层级按需传入：\n- `ext`：业务侧扩展数据（投递方写入，记录业务状态）\n- `userExt`：用户侧覆写层（前端写入，持久化按钮状态等）\n\n最终合并策略：`finalExt = { ...ext, ...userExt }`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			internal: true,
			params: [
				{
					name: "msgId",
					type: "string",
					required: true,
					desc: "消息 ID"
				},
				{
					name: "ext",
					type: "Record<string, any>",
					desc: "业务扩展数据（可选）"
				},
				{
					name: "userExt",
					type: "Record<string, any>",
					desc: "用户侧扩展数据（可选）"
				}
			],
			run: (wb, p) => wb.notifications.updateExt(p)
		},
		{
			ns: "notifications",
			method: "cursor",
			label: "获取已读游标（多端同步水位线）。",
			defaultParams: "{}",
			doc: "获取已读游标（多端同步水位线）。",
			returnsDoc: "游标信息，无数据返回 `undefined`",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			internal: true,
			run: (wb) => wb.notifications.cursor()
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/ops.generated.ts
var GENERATED_REGISTRY$8;
var init_ops_generated = __esmMin((() => {
	GENERATED_REGISTRY$8 = [
		{
			ns: "ops",
			method: "banners",
			label: "全部 Banner（已按后端投放顺序排序）。",
			defaultParams: "{}",
			doc: "全部 Banner（已按后端投放顺序排序）。",
			returnsDoc: "`{ items: OpsBanner[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.ops.banners()
		},
		{
			ns: "ops",
			method: "bannersByPosition",
			label: "按位置筛选 Banner。",
			defaultParams: "{\"position\":\"\"}",
			doc: "按位置筛选 Banner。",
			returnsDoc: "`{ items: OpsBanner[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "position",
				type: "OpsBannerPosition",
				required: true,
				desc: "投放位置 `'top' | 'sidebar' | 'chat-header'`"
			}],
			run: (wb, p) => wb.ops.bannersByPosition(p.position)
		},
		{
			ns: "ops",
			method: "scenes",
			label: "全部场景入口（已排序）。",
			defaultParams: "{}",
			doc: "全部场景入口（已排序）。",
			returnsDoc: "`{ items: OpsScene[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.ops.scenes()
		},
		{
			ns: "ops",
			method: "scenesByType",
			label: "按分类筛选场景。",
			defaultParams: "{\"type\":\"\"}",
			doc: "按分类筛选场景。",
			returnsDoc: "`{ items: OpsScene[] }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "type",
				type: "OpsSceneType",
				required: true,
				desc: "场景分类 `'code' | 'work' | 'design'`"
			}],
			run: (wb, p) => wb.ops.scenesByType(p.type)
		},
		{
			ns: "ops",
			method: "refresh",
			label: "手动触发重新拉取运营配置。",
			defaultParams: "{}",
			doc: "手动触发重新拉取运营配置。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			internal: true,
			run: (wb) => wb.ops.refresh()
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/skills.generated.ts
var GENERATED_REGISTRY$7;
var init_skills_generated = __esmMin((() => {
	GENERATED_REGISTRY$7 = [
		{
			ns: "skills",
			method: "installed",
			label: "已安装技能列表。",
			defaultParams: "{\"dataSource\":\"\",\"cwd\":\"\",\"global\":false,\"excludePluginSkills\":false}",
			doc: "已安装技能列表。",
			returnsDoc: "`{ items: WB.Skill[] }` —— SDK 标准信封。每个 Skill 包含 `ref`、`name`、`filePath`、`description`、`source`、`type`、`disable` 等字段。",
			examples: ["```ts\nconst { items } = await wb.skills.installed();\nitems.forEach(s => console.log(s.name, s.ref));\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "dataSource",
					type: "\"local\" | \"cloud\"",
					desc: "数据源。`'local'` = 本地 FS 扫描（Desktop 默认，含 plugin/project skill）；`'cloud'` = 云端 user-asset API（Web 默认，Desktop collab 项目场景也用此）。不传 = 当前平台默认。"
				},
				{
					name: "cwd",
					type: "string",
					desc: "工作目录路径（按项目过滤，仅返回该目录下的 project skill）"
				},
				{
					name: "global",
					type: "boolean",
					desc: "是否只取全局技能（排除项目级 skill）"
				},
				{
					name: "excludePluginSkills",
					type: "boolean",
					desc: "是否排除 IDE 插件注册的技能"
				}
			],
			run: (wb, p) => wb.skills.installed(p)
		},
		{
			ns: "skills",
			method: "enable",
			label: "启用一个已安装技能。",
			defaultParams: "{\"ref\":\"\"}",
			doc: "启用一个已安装技能。",
			returnsDoc: "`void` — 成功静默；失败抛 WBError",
			examples: ["```ts\nawait wb.skills.enable(skill.ref);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "ref",
				type: "string",
				required: true,
				desc: "操作句柄（从 `installed()` 返回的 `Skill.ref` 获取）"
			}],
			run: (wb, p) => wb.skills.enable(p.ref)
		},
		{
			ns: "skills",
			method: "disable",
			label: "禁用一个已安装技能。",
			defaultParams: "{\"ref\":\"\"}",
			doc: "禁用一个已安装技能。",
			returnsDoc: "`void` — 成功静默；失败抛 WBError",
			examples: ["```ts\nawait wb.skills.disable(skill.ref);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "ref",
				type: "string",
				required: true,
				desc: "操作句柄（从 `installed()` 返回的 `Skill.ref` 获取）"
			}],
			run: (wb, p) => wb.skills.disable(p.ref)
		},
		{
			ns: "skills",
			method: "uninstall",
			label: "卸载一个已安装技能。",
			defaultParams: "{\"ref\":\"\"}",
			doc: "卸载一个已安装技能。",
			returnsDoc: "`void` — 成功静默；失败抛 WBError",
			examples: ["```ts\nawait wb.skills.uninstall(items[0].ref);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "ref",
				type: "string",
				required: true,
				desc: "操作句柄（从 `installed()` 返回的 `Skill.ref` 获取）"
			}],
			run: (wb, p) => wb.skills.uninstall(p.ref)
		},
		{
			ns: "skills",
			method: "getContent",
			label: "读取技能的 SKILL.md 内容。",
			defaultParams: "{\"ref\":\"\"}",
			doc: "读取技能的 SKILL.md 内容。",
			returnsDoc: "`WB.SkillContent` — 含 SKILL.md 原文",
			examples: ["```ts\nconst { content } = await wb.skills.getContent(skill.ref);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "ref",
				type: "string",
				required: true,
				desc: "操作句柄（从 `installed()` 返回的 `Skill.ref` 获取）"
			}],
			run: (wb, p) => wb.skills.getContent(p.ref)
		},
		{
			ns: "skills",
			method: "installFromUrl",
			label: "从 URL 一步安装技能（下载 zip → 解压 → 安装 → 可选安全扫描）。",
			defaultParams: "{\"skillName\":\"\",\"downloadUrl\":\"\",\"channelType\":\"\",\"prompt\":\"\",\"securityCheck\":false,\"appKey\":\"\",\"overwrite\":false}",
			doc: "从 URL 一步安装技能（下载 zip → 解压 → 安装 → 可选安全扫描）。\n\n返回值是业务结果（`success: true/false`），\n调用方根据 `success` / `errorKey` / `cancelled` 等字段决定 UI 表现。",
			returnsDoc: "`WB.SkillInstallFromUrlResult`",
			examples: ["```ts\nconst r = await wb.skills.installFromUrl({ skillName: 'foo', downloadUrl: 'https://...' });\nif (r.success) console.log('已安装:', r.skillName);\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			unsafe: true,
			requiresArg: true,
			internal: true,
			params: [
				{
					name: "skillName",
					type: "string",
					required: true,
					desc: "skillName"
				},
				{
					name: "downloadUrl",
					type: "string",
					required: true,
					desc: "downloadUrl"
				},
				{
					name: "channelType",
					type: "string",
					desc: "channelType"
				},
				{
					name: "prompt",
					type: "string",
					desc: "prompt"
				},
				{
					name: "securityCheck",
					type: "boolean",
					desc: "securityCheck"
				},
				{
					name: "appKey",
					type: "string",
					desc: "appKey"
				},
				{
					name: "overwrite",
					type: "boolean",
					desc: "overwrite"
				}
			],
			run: (wb, p) => wb.skills.installFromUrl(p)
		},
		{
			ns: "skills",
			method: "importSkill",
			label: "导入自定义技能包（zip）。",
			defaultParams: "{\"file\":\"\",\"name\":\"\",\"title\":\"\",\"description\":\"\",\"version\":\"\"}",
			doc: "导入自定义技能包（zip）。\n\nCloud 端上传到云端资产库；Desktop 端解压到本地 `~/.workbuddy/skills/` 目录。\n后端异步校验：返回后 status 始终为 `checking`，需用 `getImportStatus()` 轮询至终态。",
			returnsDoc: "`SkillImportResult` — 含 id 和初始 status",
			examples: ["```ts\nconst { id } = await wb.skills.importSkill({ file, name: 'my-skill' });\n// 轮询状态直到终态\nconst s = await wb.skills.getImportStatus(id);\nif (s.status === 'ready') console.log('导入完成');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [
				{
					name: "file",
					type: "File | UploadCustomSkillFileRef",
					required: true,
					desc: "file"
				},
				{
					name: "name",
					type: "string",
					desc: "名称"
				},
				{
					name: "title",
					type: "string",
					desc: "标题"
				},
				{
					name: "description",
					type: "string",
					desc: "描述"
				},
				{
					name: "version",
					type: "string",
					desc: "version"
				}
			],
			run: (wb, p) => wb.skills.importSkill(p)
		},
		{
			ns: "skills",
			method: "getImportStatus",
			label: "查询技能导入状态（轮询用）。",
			defaultParams: "{\"id\":\"\"}",
			doc: "查询技能导入状态（轮询用）。",
			returnsDoc: "`SkillImportStatusResult` — 含 status（`checking` / `ready` / `invalid` / `failed`）/ checkError 等",
			examples: ["```ts\nconst { id } = await wb.skills.importSkill({ file, name: 'my-skill' });\nconst s = await wb.skills.getImportStatus(id);\nif (s.status === 'ready') console.log('导入完成');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "`importSkill()` 返回的 `id`（后端分配的唯一标识）"
			}],
			run: (wb, p) => wb.skills.getImportStatus(p.id)
		},
		{
			ns: "skills.marketplace.builtin",
			method: "list",
			label: "内置技能市场列表。",
			defaultParams: "{\"source\":\"\",\"categories\":[],\"keyword\":\"\",\"filterIds\":[],\"page\":0,\"pageSize\":0,\"feature\":[],\"enterpriseId\":\"\"}",
			doc: "内置技能市场列表。\n\n每项的 `skillId` 字段即为市场侧标识，传给 `install({ skillId })` 使用。",
			returnsDoc: "`{ items: BuiltinMarketSkill[], total? }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "source",
					type: "BuiltinMarketSource",
					desc: "来源"
				},
				{
					name: "categories",
					type: "string[]",
					desc: "分类列表"
				},
				{
					name: "keyword",
					type: "string",
					desc: "搜索关键字"
				},
				{
					name: "filterIds",
					type: "string[]",
					desc: "过滤 ID 列表"
				},
				{
					name: "page",
					type: "number",
					desc: "页码（从 1 开始，默认 1）"
				},
				{
					name: "pageSize",
					type: "number",
					desc: "每页条数（默认 20）"
				},
				{
					name: "feature",
					type: "number[]",
					desc: "功能特性筛选"
				},
				{
					name: "enterpriseId",
					type: "string",
					desc: "企业标识"
				}
			],
			run: (wb, p) => wb.skills?.marketplace?.builtin?.list?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.builtin 未注入"))
		},
		{
			ns: "skills.marketplace.builtin",
			method: "install",
			label: "安装内置市场技能。成功 → void，失败 → 抛 WBError。",
			defaultParams: "{\"skillId\":\"\",\"version\":\"\",\"name\":\"\",\"skillName\":\"\",\"icon\":\"\",\"examples_zh\":[],\"examples_en\":[],\"description_zh\":\"\",\"description_en\":\"\"}",
			doc: "安装内置市场技能。成功 → void，失败 → 抛 WBError。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [
				{
					name: "skillId",
					type: "string",
					required: true,
					desc: "技能 ID"
				},
				{
					name: "version",
					type: "string",
					desc: "version"
				},
				{
					name: "name",
					type: "string",
					desc: "名称"
				},
				{
					name: "skillName",
					type: "string",
					desc: "skillName"
				},
				{
					name: "icon",
					type: "string",
					desc: "icon"
				},
				{
					name: "examples_zh",
					type: "string[]",
					desc: "examples_zh"
				},
				{
					name: "examples_en",
					type: "string[]",
					desc: "examples_en"
				},
				{
					name: "description_zh",
					type: "string",
					desc: "description_zh"
				},
				{
					name: "description_en",
					type: "string",
					desc: "description_en"
				}
			],
			run: (wb, p) => wb.skills?.marketplace?.builtin?.install?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.builtin 未注入"))
		},
		{
			ns: "skills.marketplace.builtin",
			method: "categories",
			label: "内置市场分类列表。",
			defaultParams: "{\"type\":\"\"}",
			doc: "内置市场分类列表。",
			returnsDoc: "`{ items: BuiltinMarketCategory[] }` — 统一信封",
			since: "1.0.0",
			platform: "desktop, web",
			params: [{
				name: "type",
				type: "string | undefined",
				desc: "类型"
			}],
			run: (wb, p) => wb.skills?.marketplace?.builtin?.categories?.(p.type) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.builtin 未注入"))
		},
		{
			ns: "skills.marketplace.builtin",
			method: "getInstalledMetas",
			label: "已安装 meta 列表（更新检测用）。",
			defaultParams: "{}",
			doc: "已安装 meta 列表（更新检测用）。",
			internal: true,
			run: (wb) => wb.skills?.marketplace?.builtin?.getInstalledMetas?.() ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.builtin 未注入"))
		},
		{
			ns: "skills.marketplace.builtin",
			method: "getByIds",
			label: "按 ID 批量查询。",
			defaultParams: "{\"skillIds\":[]}",
			doc: "按 ID 批量查询。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "skillIds",
				type: "string[]",
				required: true,
				desc: "skillIds"
			}],
			run: (wb, p) => wb.skills?.marketplace?.builtin?.getByIds?.(p.skillIds) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.builtin 未注入"))
		},
		{
			ns: "skills.marketplace.builtin",
			method: "backfillSkillId",
			label: "回填 skillId（fire-and-forget）。",
			defaultParams: "{\"matchName\":\"\",\"skillId\":\"\"}",
			doc: "回填 skillId（fire-and-forget）。",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			internal: true,
			params: [{
				name: "matchName",
				type: "string",
				required: true,
				desc: "matchName"
			}, {
				name: "skillId",
				type: "string",
				required: true,
				desc: "技能 ID"
			}],
			run: (wb, p) => wb.skills?.marketplace?.builtin?.backfillSkillId?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.builtin 未注入"))
		},
		{
			ns: "skills.marketplace.builtin",
			method: "backfillIconSource",
			label: "回填 iconSource（fire-and-forget）。",
			defaultParams: "{\"matchName\":\"\",\"icon\":\"\"}",
			doc: "回填 iconSource（fire-and-forget）。",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			internal: true,
			params: [{
				name: "matchName",
				type: "string",
				required: true,
				desc: "matchName"
			}, {
				name: "icon",
				type: "string",
				required: true,
				desc: "icon"
			}],
			run: (wb, p) => wb.skills?.marketplace?.builtin?.backfillIconSource?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.builtin 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "list",
			label: "SkillHub 社区技能列表。",
			defaultParams: "{\"page\":0,\"pageSize\":0,\"sortBy\":\"\",\"order\":\"\",\"keyword\":\"\",\"category\":\"\"}",
			doc: "SkillHub 社区技能列表。\n\n每项的 `slug` 字段即为 SkillHub 全局唯一标识，传给 `install({ slug })` 使用。",
			returnsDoc: "`{ items: SkillHubSkill[], total? }`",
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "page",
					type: "number",
					desc: "页码（从 1 开始，默认 1）"
				},
				{
					name: "pageSize",
					type: "number",
					desc: "每页条数（默认 20）"
				},
				{
					name: "sortBy",
					type: "SkillHubSortBy",
					desc: "排序字段"
				},
				{
					name: "order",
					type: "\"asc\" | \"desc\"",
					desc: "排序方向（asc / desc）"
				},
				{
					name: "keyword",
					type: "string",
					desc: "搜索关键字"
				},
				{
					name: "category",
					type: "string",
					desc: "分类"
				}
			],
			run: (wb, p) => wb.skills?.marketplace?.skillhub?.list?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "install",
			label: "安装 SkillHub 技能。",
			defaultParams: "{\"slug\":\"\",\"version\":\"\",\"name\":\"\"}",
			doc: "安装 SkillHub 技能。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [
				{
					name: "slug",
					type: "string",
					required: true,
					desc: "技能标识（从 `list()` 返回的 `item.slug` 获取）"
				},
				{
					name: "version",
					type: "string",
					desc: "指定版本（可选，不传=最新）"
				},
				{
					name: "name",
					type: "string",
					desc: "显示名称（可选，用于安装后的元数据记录）"
				}
			],
			run: (wb, p) => wb.skills?.marketplace?.skillhub?.install?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "categories",
			label: "SkillHub 分类列表。",
			defaultParams: "{}",
			doc: "SkillHub 分类列表。",
			returnsDoc: "`{ items: SkillHubCategory[] }`",
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.skills?.marketplace?.skillhub?.categories?.() ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "getInstalledMetas",
			label: "已安装 meta 列表（更新检测用）。",
			defaultParams: "{}",
			doc: "已安装 meta 列表（更新检测用）。",
			internal: true,
			run: (wb) => wb.skills?.marketplace?.skillhub?.getInstalledMetas?.() ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "getDetail",
			label: "单个 skill 详情。",
			defaultParams: "{\"slug\":\"\"}",
			doc: "单个 skill 详情。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "slug",
				type: "string",
				required: true,
				desc: "slug"
			}],
			run: (wb, p) => wb.skills?.marketplace?.skillhub?.getDetail?.(p.slug) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "search",
			label: "全文搜索。",
			defaultParams: "{\"q\":\"\",\"limit\":0}",
			doc: "全文搜索。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "q",
				type: "string",
				required: true,
				desc: "q"
			}, {
				name: "limit",
				type: "number | undefined",
				desc: "limit"
			}],
			run: (wb, p) => wb.skills?.marketplace?.skillhub?.search?.(p.q, p.limit) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "exists",
			label: "批量检查 slug 是否存在。",
			defaultParams: "{\"slugs\":[]}",
			doc: "批量检查 slug 是否存在。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "slugs",
				type: "string[]",
				required: true,
				desc: "slugs"
			}],
			run: (wb, p) => wb.skills?.marketplace?.skillhub?.exists?.(p.slugs) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.skillhub",
			method: "reportStats",
			label: "埋点上报（fire-and-forget）。",
			defaultParams: "{\"slug\":\"\",\"inc\":{\"downloads\":0,\"installs\":0,\"stars\":0}}",
			doc: "埋点上报（fire-and-forget）。",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			internal: true,
			params: [{
				name: "slug",
				type: "string",
				required: true,
				desc: "slug"
			}, {
				name: "inc",
				type: "{ downloads?: number; installs?: number; stars?: number; }",
				required: true,
				desc: "inc",
				properties: [
					{
						name: "downloads",
						type: "number",
						desc: "downloads"
					},
					{
						name: "installs",
						type: "number",
						desc: "installs"
					},
					{
						name: "stars",
						type: "number",
						desc: "stars"
					}
				]
			}],
			run: (wb, p) => wb.skills?.marketplace?.skillhub?.reportStats?.(p.slug, p.inc) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.skillhub 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "list",
			label: "Knot 列表（仅内网）。",
			defaultParams: "{\"page\":0,\"pageSize\":0,\"sortBy\":\"\",\"order\":\"\",\"keyword\":\"\",\"category\":\"\"}",
			doc: "Knot 列表（仅内网）。",
			internal: true,
			params: [
				{
					name: "page",
					type: "number",
					desc: "页码（从 1 开始，默认 1）"
				},
				{
					name: "pageSize",
					type: "number",
					desc: "每页条数（默认 20）"
				},
				{
					name: "sortBy",
					type: "SkillHubSortBy",
					desc: "排序字段"
				},
				{
					name: "order",
					type: "\"asc\" | \"desc\"",
					desc: "排序方向（asc / desc）"
				},
				{
					name: "keyword",
					type: "string",
					desc: "搜索关键字"
				},
				{
					name: "category",
					type: "string",
					desc: "分类"
				}
			],
			run: (wb, p) => wb.skills?.marketplace?.knot?.list?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "install",
			label: "安装 Knot 技能（仅内网）。",
			defaultParams: "{\"id\":\"\",\"version\":\"\",\"name\":\"\",\"skillName\":\"\",\"slug\":\"\"}",
			doc: "安装 Knot 技能（仅内网）。",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			internal: true,
			params: [
				{
					name: "id",
					type: "string",
					required: true,
					desc: "ID"
				},
				{
					name: "version",
					type: "string | undefined",
					desc: "version"
				},
				{
					name: "name",
					type: "string | undefined",
					desc: "名称"
				},
				{
					name: "skillName",
					type: "string | undefined",
					desc: "skillName"
				},
				{
					name: "slug",
					type: "string | undefined",
					desc: "slug"
				}
			],
			run: (wb, p) => wb.skills?.marketplace?.knot?.install?.(p.id, p.version, p.name, p.skillName, p.slug) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "categories",
			label: "Knot 分类列表（仅内网）。",
			defaultParams: "{}",
			doc: "Knot 分类列表（仅内网）。",
			internal: true,
			run: (wb) => wb.skills?.marketplace?.knot?.categories?.() ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "getInstalledMetas",
			label: "已安装 meta 列表（更新检测用）。",
			defaultParams: "{}",
			doc: "已安装 meta 列表（更新检测用）。",
			internal: true,
			run: (wb) => wb.skills?.marketplace?.knot?.getInstalledMetas?.() ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "getTags",
			label: "标签列表。",
			defaultParams: "{}",
			doc: "标签列表。",
			internal: true,
			run: (wb) => wb.skills?.marketplace?.knot?.getTags?.() ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "getByIds",
			label: "按 ID 批量查询。",
			defaultParams: "{\"ids\":[]}",
			doc: "按 ID 批量查询。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "ids",
				type: "string[]",
				required: true,
				desc: "ids"
			}],
			run: (wb, p) => wb.skills?.marketplace?.knot?.getByIds?.(p.ids) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "getDetail",
			label: "单个 skill 详情。",
			defaultParams: "{\"slug\":\"\"}",
			doc: "单个 skill 详情。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "slug",
				type: "string",
				required: true,
				desc: "slug"
			}],
			run: (wb, p) => wb.skills?.marketplace?.knot?.getDetail?.(p.slug) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "search",
			label: "全文搜索。",
			defaultParams: "{\"q\":\"\",\"limit\":0}",
			doc: "全文搜索。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "q",
				type: "string",
				required: true,
				desc: "q"
			}, {
				name: "limit",
				type: "number | undefined",
				desc: "limit"
			}],
			run: (wb, p) => wb.skills?.marketplace?.knot?.search?.(p.q, p.limit) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "exists",
			label: "批量检查 slug 是否存在。",
			defaultParams: "{\"slugs\":[]}",
			doc: "批量检查 slug 是否存在。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "slugs",
				type: "string[]",
				required: true,
				desc: "slugs"
			}],
			run: (wb, p) => wb.skills?.marketplace?.knot?.exists?.(p.slugs) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.knot",
			method: "reportStats",
			label: "埋点上报（fire-and-forget）。",
			defaultParams: "{\"slug\":\"\",\"inc\":{\"downloads\":0,\"installs\":0,\"stars\":0}}",
			doc: "埋点上报（fire-and-forget）。",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			internal: true,
			params: [{
				name: "slug",
				type: "string",
				required: true,
				desc: "slug"
			}, {
				name: "inc",
				type: "{ downloads?: number; installs?: number; stars?: number; }",
				required: true,
				desc: "inc",
				properties: [
					{
						name: "downloads",
						type: "number",
						desc: "downloads"
					},
					{
						name: "installs",
						type: "number",
						desc: "installs"
					},
					{
						name: "stars",
						type: "number",
						desc: "stars"
					}
				]
			}],
			run: (wb, p) => wb.skills?.marketplace?.knot?.reportStats?.(p.slug, p.inc) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.knot 未注入"))
		},
		{
			ns: "skills.marketplace.local",
			method: "list",
			label: "本地推荐技能包列表（内部）。",
			defaultParams: "{}",
			doc: "本地推荐技能包列表（内部）。",
			internal: true,
			run: (wb) => wb.skills?.marketplace?.local?.list?.() ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.local 未注入"))
		},
		{
			ns: "skills.marketplace.local",
			method: "install",
			label: "安装本地推荐技能包（内部）。",
			defaultParams: "{\"skillName\":\"\"}",
			doc: "安装本地推荐技能包（内部）。",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			internal: true,
			params: [{
				name: "skillName",
				type: "string",
				required: true,
				desc: "skillName"
			}],
			run: (wb, p) => wb.skills?.marketplace?.local?.install?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.local 未注入"))
		},
		{
			ns: "skills.marketplace.local",
			method: "getContent",
			label: "获取本地推荐技能内容（内部）。",
			defaultParams: "{\"skillName\":\"\"}",
			doc: "获取本地推荐技能内容（内部）。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "skillName",
				type: "string",
				required: true,
				desc: "skillName"
			}],
			run: (wb, p) => wb.skills?.marketplace?.local?.getContent?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.marketplace.local 未注入"))
		},
		{
			ns: "skills.enterprise",
			method: "list",
			label: "企业自建技能列表。",
			defaultParams: "{\"enterpriseId\":\"\",\"categories\":\"\",\"keyword\":\"\",\"page\":\"\",\"pageSize\":\"\"}",
			doc: "企业自建技能列表。\n\n`enterpriseId` 可选：不传时自动从 `wb.account.getProfile().enterpriseId` 获取。",
			returnsDoc: "`{ items: EnterpriseSkill[], total? }` — SDK 标准信封",
			since: "1.0.0",
			platform: "desktop, web",
			params: [
				{
					name: "enterpriseId",
					type: "unknown",
					desc: "企业标识（可选，不传则自动获取）"
				},
				{
					name: "categories",
					type: "unknown",
					desc: "分类列表"
				},
				{
					name: "keyword",
					type: "unknown",
					desc: "搜索关键字"
				},
				{
					name: "page",
					type: "unknown",
					desc: "页码（从 1 开始，默认 1）"
				},
				{
					name: "pageSize",
					type: "unknown",
					desc: "每页条数（默认 20）"
				}
			],
			run: (wb, p) => wb.skills?.enterprise?.list?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.enterprise 未注入"))
		},
		{
			ns: "skills.enterprise",
			method: "install",
			label: "安装企业技能。成功 → void，失败 → 抛 WBError。",
			defaultParams: "{\"skillId\":\"\",\"version\":\"\",\"name\":\"\",\"downloadUrl\":\"\"}",
			doc: "安装企业技能。成功 → void，失败 → 抛 WBError。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [
				{
					name: "skillId",
					type: "string",
					required: true,
					desc: "技能标识（必填）"
				},
				{
					name: "version",
					type: "string",
					desc: "version"
				},
				{
					name: "name",
					type: "string",
					desc: "名称"
				},
				{
					name: "downloadUrl",
					type: "string",
					desc: "downloadUrl"
				}
			],
			run: (wb, p) => wb.skills?.enterprise?.install?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.enterprise 未注入"))
		},
		{
			ns: "skills.enterprise",
			method: "categories",
			label: "企业自建分类列表。",
			defaultParams: "{\"enterpriseId\":\"\"}",
			doc: "企业自建分类列表。\n\n`enterpriseId` 可选：不传时自动从 `wb.account.getProfile().enterpriseId` 获取。",
			returnsDoc: "`{ items: EnterpriseCategory[] }` — 统一信封",
			since: "1.0.0",
			platform: "desktop, web",
			params: [{
				name: "enterpriseId",
				type: "string",
				desc: "企业标识（可选，不传则自动获取）"
			}],
			run: (wb, p) => wb.skills?.enterprise?.categories?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.enterprise 未注入"))
		},
		{
			ns: "skills.enterprise",
			method: "getInstalledMetas",
			label: "已安装企业技能元数据（更新检测用）。enterpriseId 可选，不传自动获取。",
			defaultParams: "{\"enterpriseId\":\"\"}",
			doc: "已安装企业技能元数据（更新检测用）。enterpriseId 可选，不传自动获取。",
			internal: true,
			params: [{
				name: "enterpriseId",
				type: "string",
				desc: "企业标识"
			}],
			run: (wb, p) => wb.skills?.enterprise?.getInstalledMetas?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.enterprise 未注入"))
		},
		{
			ns: "skills.enterprise",
			method: "getByIds",
			label: "按 ID 批量查询企业技能最新版本。enterpriseId 可选，不传自动获取。",
			defaultParams: "{\"enterpriseId\":\"\",\"ids\":[]}",
			doc: "按 ID 批量查询企业技能最新版本。enterpriseId 可选，不传自动获取。",
			requiresArg: true,
			internal: true,
			params: [{
				name: "enterpriseId",
				type: "string",
				desc: "企业标识"
			}, {
				name: "ids",
				type: "string[]",
				required: true,
				desc: "ids"
			}],
			run: (wb, p) => wb.skills?.enterprise?.getByIds?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.enterprise 未注入"))
		},
		{
			ns: "skills.enterprise",
			method: "probeVisibility",
			label: "Tab 可见性探测（list page_size=1 看 total > 0）。enterpriseId 可选，不传自动获取。",
			defaultParams: "{\"enterpriseId\":\"\"}",
			doc: "Tab 可见性探测（list page_size=1 看 total > 0）。enterpriseId 可选，不传自动获取。",
			internal: true,
			params: [{
				name: "enterpriseId",
				type: "string",
				desc: "企业标识"
			}],
			run: (wb, p) => wb.skills?.enterprise?.probeVisibility?.(p) ?? Promise.reject(/* @__PURE__ */ new Error("skills.enterprise 未注入"))
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/storage.generated.ts
var GENERATED_REGISTRY$6;
var init_storage_generated = __esmMin((() => {
	GENERATED_REGISTRY$6 = [
		{
			ns: "storage.device",
			method: "ns",
			label: "获取指定 namespace 的 KV 操作接口。",
			defaultParams: "{\"name\":\"\"}",
			doc: "获取指定 namespace 的 KV 操作接口。",
			returnsDoc: "namespace KV 接口",
			examples: ["```ts\nconst prefs = wb.storage.device.ns('preferences');\nawait prefs.set('theme', 'dark');\nconst theme = await prefs.get('theme');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.device?.ns?.(p.name) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "get",
			label: "通过 \"ns:key\" 路径读取值。",
			defaultParams: "{\"path\":\"\",\"defaultValue\":\"\"}",
			doc: "通过 \"ns:key\" 路径读取值。",
			returnsDoc: "值（不存在返回 defaultValue 或 undefined）",
			examples: ["```ts\nconst theme = await wb.storage.device.get('prefs:theme', 'auto');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}, {
				name: "defaultValue",
				type: "T | undefined",
				desc: "key 不存在时返回的默认值"
			}],
			run: (wb, p) => wb.storage?.device?.get?.(p.path, p.defaultValue) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "set",
			label: "通过 \"ns:key\" 路径写入值。",
			defaultParams: "{\"path\":\"\",\"value\":\"\"}",
			doc: "通过 \"ns:key\" 路径写入值。",
			examples: ["```ts\nawait wb.storage.device.set('prefs:theme', 'dark');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}, {
				name: "value",
				type: "unknown",
				required: true,
				desc: "存储值（可结构化克隆的任意类型）"
			}],
			run: (wb, p) => wb.storage?.device?.set?.(p.path, p.value) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "delete",
			label: "通过 \"ns:key\" 路径删除指定 key。",
			defaultParams: "{\"path\":\"\"}",
			doc: "通过 \"ns:key\" 路径删除指定 key。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}],
			run: (wb, p) => wb.storage?.device?.delete?.(p.path) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "has",
			label: "通过 \"ns:key\" 路径判断 key 是否存在。",
			defaultParams: "{\"path\":\"\"}",
			doc: "通过 \"ns:key\" 路径判断 key 是否存在。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}],
			run: (wb, p) => wb.storage?.device?.has?.(p.path) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "keys",
			label: "列出指定 namespace 下所有 key。",
			defaultParams: "{\"prefix\":\"\"}",
			doc: "列出指定 namespace 下所有 key。",
			returnsDoc: "key 数组",
			examples: ["```ts\nconst keys = await wb.storage.device.keys('prefs');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "prefix",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.device?.keys?.(p.prefix) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "clear",
			label: "清空指定 namespace。",
			defaultParams: "{\"prefix\":\"\"}",
			doc: "清空指定 namespace。",
			examples: ["```ts\nawait wb.storage.device.clear('cache');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "prefix",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.device?.clear?.(p.prefix) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "namespaces",
			label: "列出该 scope 下所有 namespace 名称。",
			defaultParams: "{}",
			doc: "列出该 scope 下所有 namespace 名称。",
			returnsDoc: "namespace 名称数组",
			examples: ["```ts\nconst nsList = await wb.storage.device.namespaces();\n// ['preferences', 'cache', 'expertHistory']\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.storage?.device?.namespaces?.() ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "removeNamespace",
			label: "删除整个 namespace（含内部所有 key）。不可逆。",
			defaultParams: "{\"name\":\"\"}",
			doc: "删除整个 namespace（含内部所有 key）。不可逆。",
			examples: ["```ts\nawait wb.storage.device.removeNamespace('cache');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.device?.removeNamespace?.(p.name) ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.device",
			method: "clearAll",
			label: "清空 scope 下全部数据。⚠️ 不可逆。",
			defaultParams: "{}",
			doc: "清空 scope 下全部数据。⚠️ 不可逆。",
			examples: ["```ts\nawait wb.storage.device.clearAll();\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			run: (wb) => wb.storage?.device?.clearAll?.() ?? Promise.reject(/* @__PURE__ */ new Error("storage.device 未注入"))
		},
		{
			ns: "storage.user",
			method: "ns",
			label: "获取指定 namespace 的 KV 操作接口。",
			defaultParams: "{\"name\":\"\"}",
			doc: "获取指定 namespace 的 KV 操作接口。",
			returnsDoc: "namespace KV 接口",
			examples: ["```ts\nconst prefs = wb.storage.device.ns('preferences');\nawait prefs.set('theme', 'dark');\nconst theme = await prefs.get('theme');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.user?.ns?.(p.name) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "get",
			label: "通过 \"ns:key\" 路径读取值。",
			defaultParams: "{\"path\":\"\",\"defaultValue\":\"\"}",
			doc: "通过 \"ns:key\" 路径读取值。",
			returnsDoc: "值（不存在返回 defaultValue 或 undefined）",
			examples: ["```ts\nconst theme = await wb.storage.device.get('prefs:theme', 'auto');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}, {
				name: "defaultValue",
				type: "T | undefined",
				desc: "key 不存在时返回的默认值"
			}],
			run: (wb, p) => wb.storage?.user?.get?.(p.path, p.defaultValue) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "set",
			label: "通过 \"ns:key\" 路径写入值。",
			defaultParams: "{\"path\":\"\",\"value\":\"\"}",
			doc: "通过 \"ns:key\" 路径写入值。",
			examples: ["```ts\nawait wb.storage.device.set('prefs:theme', 'dark');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}, {
				name: "value",
				type: "unknown",
				required: true,
				desc: "存储值（可结构化克隆的任意类型）"
			}],
			run: (wb, p) => wb.storage?.user?.set?.(p.path, p.value) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "delete",
			label: "通过 \"ns:key\" 路径删除指定 key。",
			defaultParams: "{\"path\":\"\"}",
			doc: "通过 \"ns:key\" 路径删除指定 key。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}],
			run: (wb, p) => wb.storage?.user?.delete?.(p.path) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "has",
			label: "通过 \"ns:key\" 路径判断 key 是否存在。",
			defaultParams: "{\"path\":\"\"}",
			doc: "通过 \"ns:key\" 路径判断 key 是否存在。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "路径格式 \"namespace:key\""
			}],
			run: (wb, p) => wb.storage?.user?.has?.(p.path) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "keys",
			label: "列出指定 namespace 下所有 key。",
			defaultParams: "{\"prefix\":\"\"}",
			doc: "列出指定 namespace 下所有 key。",
			returnsDoc: "key 数组",
			examples: ["```ts\nconst keys = await wb.storage.device.keys('prefs');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "prefix",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.user?.keys?.(p.prefix) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "clear",
			label: "清空指定 namespace。",
			defaultParams: "{\"prefix\":\"\"}",
			doc: "清空指定 namespace。",
			examples: ["```ts\nawait wb.storage.device.clear('cache');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "prefix",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.user?.clear?.(p.prefix) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "namespaces",
			label: "列出该 scope 下所有 namespace 名称。",
			defaultParams: "{}",
			doc: "列出该 scope 下所有 namespace 名称。",
			returnsDoc: "namespace 名称数组",
			examples: ["```ts\nconst nsList = await wb.storage.device.namespaces();\n// ['preferences', 'cache', 'expertHistory']\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			run: (wb) => wb.storage?.user?.namespaces?.() ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "removeNamespace",
			label: "删除整个 namespace（含内部所有 key）。不可逆。",
			defaultParams: "{\"name\":\"\"}",
			doc: "删除整个 namespace（含内部所有 key）。不可逆。",
			examples: ["```ts\nawait wb.storage.device.removeNamespace('cache');\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "namespace 名称"
			}],
			run: (wb, p) => wb.storage?.user?.removeNamespace?.(p.name) ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		},
		{
			ns: "storage.user",
			method: "clearAll",
			label: "清空 scope 下全部数据。⚠️ 不可逆。",
			defaultParams: "{}",
			doc: "清空 scope 下全部数据。⚠️ 不可逆。",
			examples: ["```ts\nawait wb.storage.device.clearAll();\n```"],
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			run: (wb) => wb.storage?.user?.clearAll?.() ?? Promise.reject(/* @__PURE__ */ new Error("storage.user 未注入"))
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/telemetry.generated.ts
var GENERATED_REGISTRY$5;
var init_telemetry_generated = __esmMin((() => {
	GENERATED_REGISTRY$5 = [
		{
			ns: "telemetry.trace",
			method: "startSpan",
			label: "显式开启 span，需手动 end。",
			defaultParams: "{\"name\":\"\",\"attributes\":\"\"}",
			doc: "显式开启 span，需手动 end。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "名称"
			}, {
				name: "attributes",
				type: "Record<string, unknown> | undefined",
				desc: "attributes"
			}],
			run: (wb, p) => wb.telemetry?.trace?.startSpan?.(p.name, p.attributes) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.trace 未注入"))
		},
		{
			ns: "telemetry.trace",
			method: "withSpan",
			label: "自动包一段异步逻辑；正常退出 status=ok，抛出则 status=error + recordException。",
			defaultParams: "{\"name\":\"\",\"fn\":\"\"}",
			doc: "自动包一段异步逻辑；正常退出 status=ok，抛出则 status=error + recordException。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "名称"
			}, {
				name: "fn",
				type: "(span: Span) => T | Promise<T>",
				required: true,
				desc: "fn"
			}],
			run: (wb, p) => wb.telemetry?.trace?.withSpan?.(p.name, p.fn) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.trace 未注入"))
		},
		{
			ns: "telemetry.metrics",
			method: "increment",
			label: "计数器 +1。",
			defaultParams: "{\"name\":\"\",\"tags\":\"\"}",
			doc: "计数器 +1。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "名称"
			}, {
				name: "tags",
				type: "Record<string, string> | undefined",
				desc: "标签"
			}],
			run: (wb, p) => wb.telemetry?.metrics?.increment?.(p.name, p.tags) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.metrics 未注入"))
		},
		{
			ns: "telemetry.metrics",
			method: "record",
			label: "记录一个数值（gauge / histogram）。",
			defaultParams: "{\"name\":\"\",\"value\":0,\"unit\":\"\",\"tags\":\"\"}",
			doc: "记录一个数值（gauge / histogram）。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [
				{
					name: "name",
					type: "string",
					required: true,
					desc: "名称"
				},
				{
					name: "value",
					type: "number",
					required: true,
					desc: "value"
				},
				{
					name: "unit",
					type: "string | undefined",
					desc: "unit"
				},
				{
					name: "tags",
					type: "Record<string, string> | undefined",
					desc: "标签"
				}
			],
			run: (wb, p) => wb.telemetry?.metrics?.record?.(p.name, p.value, p.unit, p.tags) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.metrics 未注入"))
		},
		{
			ns: "telemetry.metrics",
			method: "startTimer",
			label: "返回 stop 函数；调用 stop 时记录耗时 ms。",
			defaultParams: "{\"name\":\"\",\"tags\":\"\"}",
			doc: "返回 stop 函数；调用 stop 时记录耗时 ms。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "name",
				type: "string",
				required: true,
				desc: "名称"
			}, {
				name: "tags",
				type: "Record<string, string> | undefined",
				desc: "标签"
			}],
			run: (wb, p) => wb.telemetry?.metrics?.startTimer?.(p.name, p.tags) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.metrics 未注入"))
		},
		{
			ns: "telemetry.metrics",
			method: "setSampleRate",
			label: "调整采样率（clamp 到 [0, 1]）。",
			defaultParams: "{\"rate\":0}",
			doc: "调整采样率（clamp 到 [0, 1]）。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "rate",
				type: "number",
				required: true,
				desc: "rate"
			}],
			run: (wb, p) => wb.telemetry?.metrics?.setSampleRate?.(p.rate) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.metrics 未注入"))
		},
		{
			ns: "telemetry.logger",
			method: "debug",
			label: "输出 debug 级别日志。",
			defaultParams: "{\"message\":\"\",\"data\":\"\"}",
			doc: "输出 debug 级别日志。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "message",
				type: "string",
				required: true,
				desc: "message"
			}, {
				name: "data",
				type: "unknown",
				desc: "data"
			}],
			run: (wb, p) => wb.telemetry?.logger?.debug?.(p.message, p.data) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.logger 未注入"))
		},
		{
			ns: "telemetry.logger",
			method: "info",
			label: "输出 info 级别日志。",
			defaultParams: "{\"message\":\"\",\"data\":\"\"}",
			doc: "输出 info 级别日志。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "message",
				type: "string",
				required: true,
				desc: "message"
			}, {
				name: "data",
				type: "unknown",
				desc: "data"
			}],
			run: (wb, p) => wb.telemetry?.logger?.info?.(p.message, p.data) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.logger 未注入"))
		},
		{
			ns: "telemetry.logger",
			method: "warn",
			label: "输出 warn 级别日志。",
			defaultParams: "{\"message\":\"\",\"data\":\"\"}",
			doc: "输出 warn 级别日志。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "message",
				type: "string",
				required: true,
				desc: "message"
			}, {
				name: "data",
				type: "unknown",
				desc: "data"
			}],
			run: (wb, p) => wb.telemetry?.logger?.warn?.(p.message, p.data) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.logger 未注入"))
		},
		{
			ns: "telemetry.logger",
			method: "error",
			label: "输出 error 级别日志。",
			defaultParams: "{\"message\":\"\",\"data\":\"\"}",
			doc: "输出 error 级别日志。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "message",
				type: "string",
				required: true,
				desc: "message"
			}, {
				name: "data",
				type: "unknown",
				desc: "data"
			}],
			run: (wb, p) => wb.telemetry?.logger?.error?.(p.message, p.data) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.logger 未注入"))
		},
		{
			ns: "telemetry.logger",
			method: "setLevel",
			label: "调整级别（低于此级别不输出，也不上报）。",
			defaultParams: "{\"level\":\"\"}",
			doc: "调整级别（低于此级别不输出，也不上报）。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "level",
				type: "LogLevel",
				required: true,
				desc: "level"
			}],
			run: (wb, p) => wb.telemetry?.logger?.setLevel?.(p.level) ?? Promise.reject(/* @__PURE__ */ new Error("telemetry.logger 未注入"))
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/ui.generated.ts
var GENERATED_REGISTRY$4;
var init_ui_generated = __esmMin((() => {
	GENERATED_REGISTRY$4 = [
		{
			ns: "ui",
			method: "toast",
			label: "显示轻提示（自动消失）。",
			defaultParams: "{\"message\":\"\",\"type\":\"\",\"duration\":0}",
			doc: "显示轻提示（自动消失）。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [
				{
					name: "message",
					type: "string",
					required: true,
					desc: "message"
				},
				{
					name: "type",
					type: "\"success\" | \"info\" | \"warning\" | \"error\"",
					desc: "类型"
				},
				{
					name: "duration",
					type: "number",
					desc: "duration"
				}
			],
			run: (wb, p) => wb.ui.toast(p)
		},
		{
			ns: "ui",
			method: "dialog",
			label: "打开模态对话框，返回用户点击的按钮。",
			defaultParams: "{\"title\":\"\",\"content\":\"\",\"buttons\":\"\",\"closable\":false}",
			doc: "打开模态对话框，返回用户点击的按钮。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [
				{
					name: "title",
					type: "string",
					required: true,
					desc: "标题"
				},
				{
					name: "content",
					type: "string",
					required: true,
					desc: "content"
				},
				{
					name: "buttons",
					type: "readonly DialogButton[]",
					desc: "buttons"
				},
				{
					name: "closable",
					type: "boolean",
					desc: "closable"
				}
			],
			run: (wb, p) => wb.ui.dialog(p)
		},
		{
			ns: "ui",
			method: "browse",
			label: "打开内置预览页（webview / iframe）。",
			defaultParams: "{\"url\":\"\",\"title\":\"\",\"conversationId\":\"\"}",
			doc: "打开内置预览页（webview / iframe）。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [
				{
					name: "url",
					type: "string",
					required: true,
					desc: "url"
				},
				{
					name: "title",
					type: "string",
					desc: "标题"
				},
				{
					name: "conversationId",
					type: "string",
					required: true,
					desc: "会话 ID"
				}
			],
			run: (wb, p) => wb.ui.browse(p)
		},
		{
			ns: "ui.schema",
			method: "getNode",
			label: "按 id 扁平搜索节点。",
			defaultParams: "{\"id\":\"\"}",
			doc: "按 id 扁平搜索节点。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "single",
			requiresArg: true,
			params: [{
				name: "id",
				type: "string",
				required: true,
				desc: "ID"
			}],
			run: (wb, p) => wb.ui?.schema?.getNode?.(p.id) ?? Promise.reject(/* @__PURE__ */ new Error("ui.schema 未注入"))
		},
		{
			ns: "ui.layout",
			method: "toggleSidebar",
			label: "侧边栏展开/收起；不传参数则切换。",
			defaultParams: "{\"expanded\":false}",
			doc: "侧边栏展开/收起；不传参数则切换。",
			since: "1.0.0",
			platform: "desktop, web",
			params: [{
				name: "expanded",
				type: "boolean | undefined",
				desc: "expanded"
			}],
			run: (wb, p) => wb.ui?.layout?.toggleSidebar?.(p.expanded) ?? Promise.reject(/* @__PURE__ */ new Error("ui.layout 未注入"))
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/utils.generated.ts
var GENERATED_REGISTRY$3;
var init_utils_generated = __esmMin((() => {
	GENERATED_REGISTRY$3 = [{
		ns: "utils.swr",
		method: "invalidate",
		label: "使指定 key 的缓存失效。",
		defaultParams: "{\"key\":\"\"}",
		doc: "使指定 key 的缓存失效。",
		since: "1.0.0",
		platform: "desktop, web",
		expect: "void",
		requiresArg: true,
		params: [{
			name: "key",
			type: "string",
			required: true,
			desc: "key"
		}],
		run: (wb, p) => wb.utils?.swr?.invalidate?.(p.key) ?? Promise.reject(/* @__PURE__ */ new Error("utils.swr 未注入"))
	}, {
		ns: "utils.swr",
		method: "clear",
		label: "清除所有 SWR 缓存。",
		defaultParams: "{}",
		doc: "清除所有 SWR 缓存。",
		since: "1.0.0",
		platform: "desktop, web",
		expect: "void",
		run: (wb) => wb.utils?.swr?.clear?.() ?? Promise.reject(/* @__PURE__ */ new Error("utils.swr 未注入"))
	}];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/windows.generated.ts
var GENERATED_REGISTRY$2;
var init_windows_generated = __esmMin((() => {
	GENERATED_REGISTRY$2 = [
		{
			ns: "windows",
			method: "minimize",
			label: "最小化当前窗口。",
			defaultParams: "{}",
			doc: "最小化当前窗口。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			run: (wb) => wb.windows.minimize()
		},
		{
			ns: "windows",
			method: "maximize",
			label: "最大化当前窗口（已最大化时取消最大化）。",
			defaultParams: "{}",
			doc: "最大化当前窗口（已最大化时取消最大化）。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			run: (wb) => wb.windows.maximize()
		},
		{
			ns: "windows",
			method: "unmaximize",
			label: "取消最大化。",
			defaultParams: "{}",
			doc: "取消最大化。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			run: (wb) => wb.windows.unmaximize()
		},
		{
			ns: "windows",
			method: "close",
			label: "关闭当前窗口。",
			defaultParams: "{}",
			doc: "关闭当前窗口。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			run: (wb) => wb.windows.close()
		},
		{
			ns: "windows",
			method: "isMaximized",
			label: "查询当前窗口是否最大化。",
			defaultParams: "{}",
			doc: "查询当前窗口是否最大化。",
			since: "1.0.0",
			platform: "desktop",
			run: (wb) => wb.windows.isMaximized()
		},
		{
			ns: "windows",
			method: "isFullscreen",
			label: "查询当前窗口是否全屏。",
			defaultParams: "{}",
			doc: "查询当前窗口是否全屏。",
			since: "1.0.0",
			platform: "desktop",
			run: (wb) => wb.windows.isFullscreen()
		},
		{
			ns: "windows",
			method: "setFullscreen",
			label: "设置全屏状态。",
			defaultParams: "{\"fullscreen\":false}",
			doc: "设置全屏状态。",
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			params: [{
				name: "fullscreen",
				type: "boolean",
				required: true,
				desc: "fullscreen"
			}],
			run: (wb, p) => wb.windows.setFullscreen(p.fullscreen)
		},
		{
			ns: "windows",
			method: "toggleFullscreen",
			label: "切换全屏，返回切换后的状态。",
			defaultParams: "{}",
			doc: "切换全屏，返回切换后的状态。",
			since: "1.0.0",
			platform: "desktop",
			run: (wb) => wb.windows.toggleFullscreen()
		},
		{
			ns: "windows",
			method: "reload",
			label: "重载当前窗口（刷新 renderer）。",
			defaultParams: "{}",
			doc: "重载当前窗口（刷新 renderer）。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			run: (wb) => wb.windows.reload()
		},
		{
			ns: "windows",
			method: "open",
			label: "打开新窗口或面板。",
			defaultParams: "{\"url\":\"\",\"title\":\"\",\"width\":0,\"height\":0,\"center\":false}",
			doc: "打开新窗口或面板。",
			since: "1.0.0",
			platform: "desktop, web",
			expect: "void",
			requiresArg: true,
			params: [
				{
					name: "url",
					type: "string",
					required: true,
					desc: "url"
				},
				{
					name: "title",
					type: "string",
					desc: "标题"
				},
				{
					name: "width",
					type: "number",
					desc: "width"
				},
				{
					name: "height",
					type: "number",
					desc: "height"
				},
				{
					name: "center",
					type: "boolean",
					desc: "center"
				}
			],
			run: (wb, p) => wb.windows.open(p)
		},
		{
			ns: "windows",
			method: "onResize",
			label: "窗口大小变化。",
			defaultParams: "{\"handler\":\"\"}",
			doc: "窗口大小变化。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "handler",
				type: "(event: WindowResizeEvent) => void",
				required: true,
				desc: "handler"
			}],
			run: (wb, p) => wb.windows.onResize(p.handler)
		},
		{
			ns: "windows",
			method: "onFocus",
			label: "窗口获得焦点。",
			defaultParams: "{\"handler\":\"\"}",
			doc: "窗口获得焦点。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "handler",
				type: "() => void",
				required: true,
				desc: "handler"
			}],
			run: (wb, p) => wb.windows.onFocus(p.handler)
		},
		{
			ns: "windows",
			method: "onBlur",
			label: "窗口失去焦点。",
			defaultParams: "{\"handler\":\"\"}",
			doc: "窗口失去焦点。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "handler",
				type: "() => void",
				required: true,
				desc: "handler"
			}],
			run: (wb, p) => wb.windows.onBlur(p.handler)
		},
		{
			ns: "windows",
			method: "onStateChange",
			label: "窗口状态变更（最大化/全屏切换）。",
			defaultParams: "{\"handler\":\"\"}",
			doc: "窗口状态变更（最大化/全屏切换）。",
			since: "1.0.0",
			platform: "desktop, web",
			requiresArg: true,
			params: [{
				name: "handler",
				type: "(event: WindowStateEvent) => void",
				required: true,
				desc: "handler"
			}],
			run: (wb, p) => wb.windows.onStateChange(p.handler)
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/workspaces.generated.ts
var GENERATED_REGISTRY$1;
var init_workspaces_generated = __esmMin((() => {
	GENERATED_REGISTRY$1 = [
		{
			ns: "workspaces",
			method: "list",
			label: "当前可用工作区列表。",
			defaultParams: "{\"activeOnly\":false}",
			doc: "当前可用工作区列表。",
			returnsDoc: "`{ items: WB.Workspace[] }` —— SDK 标准信封",
			examples: ["```ts\nconst { items } = await wb.workspaces.list();\nitems.forEach(w => console.log(w.path));\n```"],
			since: "1.0.0",
			platform: "desktop",
			params: [{
				name: "activeOnly",
				type: "boolean",
				desc: "是否只列出活跃工作区（预留）"
			}],
			run: (wb, p) => wb.workspaces.list(p)
		},
		{
			ns: "workspaces",
			method: "remove",
			label: "从管理列表中移除工作区（清理关联 session，不删物理文件）。",
			defaultParams: "{\"path\":\"\"}",
			doc: "从管理列表中移除工作区（清理关联 session，不删物理文件）。",
			returnsDoc: "`void` — 成功静默；失败抛 WBError",
			examples: ["```ts\nawait wb.workspaces.remove('/Users/test/old-project');\n```"],
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "path",
				type: "string",
				required: true,
				desc: "工作区目录绝对路径"
			}],
			run: (wb, p) => wb.workspaces.remove(p.path)
		},
		{
			ns: "workspaces",
			method: "generate",
			label: "在默认根目录下生成一个新的时间戳子目录，返回绝对路径。",
			defaultParams: "{}",
			doc: "在默认根目录下生成一个新的时间戳子目录，返回绝对路径。",
			returnsDoc: "`{ path: string }` — 生成的目录路径",
			examples: ["```ts\nconst { path } = await wb.workspaces.generate();\nconsole.log('新工作区:', path); // ~/WorkBuddy/2026-06-21-14-30-00\n```"],
			since: "1.0.0",
			platform: "desktop",
			run: (wb) => wb.workspaces.generate()
		},
		{
			ns: "workspaces",
			method: "getDefaultPath",
			label: "当前生效默认存储路径（用户自定义优先，回退系统默认）。",
			defaultParams: "{}",
			doc: "当前生效默认存储路径（用户自定义优先，回退系统默认）。",
			returnsDoc: "路径字符串",
			examples: ["```ts\nconst path = await wb.workspaces.getDefaultPath();\n```"],
			since: "1.0.0",
			platform: "desktop",
			expect: "single",
			run: (wb) => wb.workspaces.getDefaultPath()
		},
		{
			ns: "workspaces",
			method: "setDefaultPath",
			label: "设置默认存储路径。",
			defaultParams: "{\"path\":\"\"}",
			doc: "设置默认存储路径。",
			returnsDoc: "`void`",
			examples: ["```ts\nawait wb.workspaces.setDefaultPath('/Users/test/WorkBuddy');\n// 清除自定义：\nawait wb.workspaces.setDefaultPath(null);\n```"],
			since: "1.0.0",
			platform: "desktop",
			expect: "void",
			unsafe: true,
			requiresArg: true,
			params: [{
				name: "path",
				type: "string | null",
				required: true,
				desc: "新路径（null = 清除自定义，恢复系统默认）"
			}],
			run: (wb, p) => wb.workspaces.setDefaultPath(p.path)
		},
		{
			ns: "workspaces",
			method: "getSystemDefaultPath",
			label: "系统默认路径（只读，如 ~/WorkBuddy）。",
			defaultParams: "{}",
			doc: "系统默认路径（只读，如 ~/WorkBuddy）。",
			returnsDoc: "路径字符串",
			examples: ["```ts\nconst sysDefault = await wb.workspaces.getSystemDefaultPath();\n```"],
			since: "1.0.0",
			platform: "desktop",
			expect: "single",
			run: (wb) => wb.workspaces.getSystemDefaultPath()
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/generated/index.ts
var GENERATED_REGISTRY;
var init_generated = __esmMin((() => {
	init_account_generated();
	init_artifacts_generated();
	init_automations_generated();
	init_changes_generated();
	init_config_generated();
	init_connectors_generated();
	init_conversations_generated();
	init_experts_generated();
	init_http_generated();
	init_models_generated();
	init_navigation_generated();
	init_notifications_generated();
	init_ops_generated();
	init_skills_generated();
	init_storage_generated();
	init_telemetry_generated();
	init_ui_generated();
	init_utils_generated();
	init_windows_generated();
	init_workspaces_generated();
	GENERATED_REGISTRY = [
		...GENERATED_REGISTRY$14,
		...GENERATED_REGISTRY$20,
		...GENERATED_REGISTRY$19,
		...GENERATED_REGISTRY$17,
		...GENERATED_REGISTRY$16,
		...GENERATED_REGISTRY$15,
		...GENERATED_REGISTRY$13,
		...GENERATED_REGISTRY$11,
		...GENERATED_REGISTRY$9,
		...GENERATED_REGISTRY$8,
		...GENERATED_REGISTRY$18,
		...GENERATED_REGISTRY$7,
		...GENERATED_REGISTRY$1,
		...GENERATED_REGISTRY$6,
		...GENERATED_REGISTRY$4,
		...GENERATED_REGISTRY$3,
		...GENERATED_REGISTRY$12,
		...GENERATED_REGISTRY$10,
		...GENERATED_REGISTRY$5,
		...GENERATED_REGISTRY$2
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/api-registry.ts
/**
* 按可见性过滤：非 IOA（外部）用户只能看到 public 方法，internal 一律隐藏。
* IOA（内网）用户能看到全部。
*/
function visibleEntries(isIoa) {
	return isIoa ? MERGED : MERGED.filter((e) => !e.internal);
}
function getNamespaces(isIoa = false) {
	return [...new Set(visibleEntries(isIoa).map((e) => e.ns))];
}
function getMethodsByNs(ns, isIoa = false) {
	return visibleEntries(isIoa).filter((e) => e.ns === ns).sort((a, b) => (a.internal ? 1 : 0) - (b.internal ? 1 : 0));
}
/** Run All 时用的安全子集（仅 IOA 可用 Run All；internal 也排除在自动校验外） */
function getSafeEntries() {
	return MERGED.filter((e) => !e.unsafe && !e.requiresArg && !e.pendingProvider && !e.internal);
}
var API_REGISTRY, MERGED;
var init_api_registry = __esmMin((() => {
	init_generated();
	API_REGISTRY = [];
	MERGED = [...GENERATED_REGISTRY, ...API_REGISTRY];
}));
//#endregion
//#region ../../packages/agent-ui/src/api-console/SdkApiConsole.tsx
/**
* 递归清理参数对象中的"空占位值"。
* 表单默认值（空字符串 ''、空对象 {}、值为 0 的 timeout）会导致底层 SDK 报错
* （如 http headers 遍历到空字符串 key），调用前统一移除。
*/
function cleanParams(obj) {
	if (obj === null || obj === void 0) return obj;
	if (Array.isArray(obj)) return obj.map(cleanParams);
	if (typeof obj !== "object") return obj;
	const cleaned = {};
	for (const [k, v] of Object.entries(obj)) {
		if (v === "") continue;
		if (v && typeof v === "object" && !Array.isArray(v) && !(v instanceof File) && !(v instanceof Blob)) {
			const sub = cleanParams(v);
			if (Object.keys(sub).length === 0) continue;
			cleaned[k] = sub;
		} else cleaned[k] = v;
	}
	return cleaned;
}
/** 从 catch 到的错误中提取结构化 JSON */
function formatError(e) {
	if (!e || typeof e !== "object") return JSON.stringify({ message: String(e) }, null, 2);
	const err = e;
	const info = {};
	info.type = err.constructor?.name ?? err.name ?? "Error";
	if (err.code) info.code = err.code;
	if (err.source) info.source = err.source;
	info.message = err.message ?? String(e);
	if (err.cause) if (err.cause instanceof Error) {
		const c = err.cause;
		info.cause = {
			message: c.message,
			...c.code && { code: c.code },
			...c.httpStatus && { httpStatus: c.httpStatus }
		};
	} else info.cause = err.cause;
	return JSON.stringify(info, null, 2);
}
function buildFieldValues(params) {
	if (!params || params.length === 0) return {};
	const obj = {};
	for (const p of params) if (p.properties && p.properties.length > 0) {
		const lines = p.properties.map((sp) => `  ${sp.name}: ${sp.type === "string" ? "''" : sp.type === "number" ? "0" : sp.type === "boolean" ? "false" : "''"}`);
		obj[p.name] = `{\n${lines.join(",\n")},\n}`;
	} else if (p.type === "boolean") obj[p.name] = "false";
	else if (p.type === "number") obj[p.name] = "0";
	else if (/\[\]|Array/.test(p.type)) obj[p.name] = "[]";
	else obj[p.name] = "";
	return obj;
}
function fieldsToJson(fields, paramDefs) {
	if (fields["__monaco_merged__"]) try {
		return new Function(`return (${fields["__monaco_merged__"]})`)();
	} catch {
		try {
			return JSON.parse(fields["__monaco_merged__"]);
		} catch {}
	}
	const obj = {};
	for (const [key, val] of Object.entries(fields)) {
		if (key === "__monaco_merged__") continue;
		if (val === "" || val === void 0) continue;
		const def = paramDefs?.find((p) => p.name === key);
		if (def?.properties && def.properties.length > 0) try {
			obj[key] = new Function(`return (${val})`)();
		} catch {
			try {
				obj[key] = JSON.parse(val);
			} catch {
				obj[key] = val;
			}
		}
		else if (def?.type === "boolean") obj[key] = val === "true";
		else if (def?.type === "number") obj[key] = Number(val) || 0;
		else if (/\[\]|Array/.test(def?.type ?? "")) try {
			obj[key] = JSON.parse(val);
		} catch {
			obj[key] = [];
		}
		else obj[key] = val;
	}
	return obj;
}
/**
* 懒加载 Monaco Editor 组件，避免静态导入 2.5MB 包体积。
* 复用 @genie/context-viewer-components/codeEditor 的 MonacoEditor。
*/
function useMonacoEditor() {
	const [MonacoEditor, setMonacoEditor] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const { MonacoEditor: ME } = await __vitePreload(async () => {
					const { MonacoEditor: ME } = await import("./codeEditor-Btn4ynKl.js");
					return { MonacoEditor: ME };
				}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]), import.meta.url);
				if (!cancelled) {
					setMonacoEditor(() => ME);
					setLoading(false);
				}
			} catch {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		MonacoEditor,
		loading
	};
}
/** 从当前 fields 值构造 JS 字面量初始值（用于 Monaco 合并模式的首次渲染） */
function buildInitialLiteral(params, fields) {
	const lines = ["{"];
	for (const p of params) {
		const displayVal = (fields[p.name] ?? "") || (p.type === "boolean" ? "false" : "''");
		lines.push(`    ${p.name}: ${displayVal},`);
	}
	lines.push("}");
	return lines.join("\n");
}
/** 判断单个参数是否为二进制/文件类型（File / Blob / ArrayBuffer / Buffer / Uint8Array） */
function isBinaryParam(p) {
	return /File|Blob|ArrayBuffer|Buffer|Uint8Array/i.test(p.type);
}
/** 判断参数列表是否包含文件/二进制类型，这类方法强制表单模式、不提供 JSON 切换 */
function hasFileParam(params) {
	return params?.some((p) => isBinaryParam(p)) ?? false;
}
var import_react, import_jsx_runtime, S, ObjectParamEditor, JsonModeEditor, ParamsFormRenderer, MethodItem, ApiCallPanel, RunAllReportRow, RunAllReport, SdkApiConsole;
//#endregion
__esmMin((() => {
	init_SdkDemoPanel();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_app_core();
	init_api_registry();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	S = {
		card: {
			background: "#ffffff",
			border: "1px solid #e2e8f0",
			borderRadius: 8,
			padding: "12px 16px"
		},
		cardLabel: {
			fontSize: 11,
			fontWeight: 600,
			color: "#666666",
			textTransform: "uppercase",
			letterSpacing: "0.5px",
			marginBottom: 8
		},
		btn: {
			padding: "6px 16px",
			fontSize: 12,
			fontWeight: 500,
			borderRadius: 6,
			border: "none",
			cursor: "pointer",
			transition: "all .15s"
		},
		btnPrimary: {
			background: "#2563eb",
			color: "#ffffff"
		},
		btnGhost: {
			background: "transparent",
			border: "1px solid #e2e8f0",
			color: "#666666"
		}
	};
	ObjectParamEditor = ({ param, value, onChange }) => {
		const [collapsed, setCollapsed] = (0, import_react.useState)(false);
		const { MonacoEditor, loading: editorLoading } = useMonacoEditor();
		const props = param.properties ?? [];
		const lineCount = (value.match(/\n/g)?.length ?? 0) + 1;
		const editorHeight = Math.min(320, Math.max(120, lineCount * 20 + 16));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				borderRadius: 10,
				overflow: "hidden",
				border: "1px solid #e5e7eb",
				boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
			},
			children: [props.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { background: "#fafbfc" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCollapsed(!collapsed),
					style: {
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "8px 14px",
						background: "none",
						border: "none",
						borderBottom: collapsed ? "none" : "1px solid #e5e7eb",
						cursor: "pointer",
						fontSize: 12,
						color: "#374151",
						fontWeight: 600
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 6
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { fontSize: 13 },
							children: "📋"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"字段说明（",
							props.length,
							"）"
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: 10,
							color: "#9ca3af",
							transition: "transform .15s",
							transform: collapsed ? "rotate(-90deg)" : "rotate(0)"
						},
						children: "▼"
					})]
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { overflow: "auto" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						style: {
							width: "100%",
							borderCollapse: "collapse",
							fontSize: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: { background: "#f3f4f6" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									style: {
										textAlign: "left",
										padding: "7px 14px",
										color: "#6b7280",
										fontWeight: 600,
										fontSize: 11,
										letterSpacing: "0.3px"
									},
									children: "字段"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									style: {
										textAlign: "left",
										padding: "7px 10px",
										color: "#6b7280",
										fontWeight: 600,
										fontSize: 11
									},
									children: "类型"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									style: {
										textAlign: "center",
										padding: "7px 10px",
										color: "#6b7280",
										fontWeight: 600,
										fontSize: 11,
										width: 48
									},
									children: "必填"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									style: {
										textAlign: "left",
										padding: "7px 14px",
										color: "#6b7280",
										fontWeight: 600,
										fontSize: 11
									},
									children: "说明"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: props.map((sp, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: { borderTop: idx === 0 ? "none" : "1px solid #f0f0f0" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "6px 14px",
										fontFamily: "ui-monospace, \"SF Mono\", Menlo, monospace",
										color: "#1e293b",
										fontWeight: 500,
										fontSize: 12
									},
									children: sp.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "6px 10px",
										fontFamily: "ui-monospace, \"SF Mono\", Menlo, monospace",
										fontSize: 11
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "#7c3aed",
											background: "#f5f3ff",
											padding: "1px 6px",
											borderRadius: 4
										},
										children: sp.type
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "6px 10px",
										textAlign: "center"
									},
									children: sp.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: 10,
											color: "#fff",
											background: "#ef4444",
											padding: "1px 5px",
											borderRadius: 3,
											fontWeight: 600
										},
										children: "必填"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: 10,
											color: "#9ca3af"
										},
										children: "—"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										padding: "6px 14px",
										color: "#4b5563",
										fontSize: 12
									},
									children: sp.desc !== sp.name ? sp.desc : "—"
								})
							]
						}, sp.name)) })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					height: editorHeight,
					borderTop: props.length > 0 ? "1px solid #e5e7eb" : "none"
				},
				children: editorLoading || !MonacoEditor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						background: "#1e1e2e",
						color: "#9ca3af",
						fontSize: 12
					},
					children: "Loading editor..."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonacoEditor, {
					value,
					language: "javascript",
					height: "100%",
					minimap: false,
					lineNumbers: "off",
					wordWrap: "on",
					fontSize: 13,
					onChange,
					options: {
						scrollBeyondLastLine: false,
						automaticLayout: true,
						padding: {
							top: 8,
							bottom: 8
						},
						renderLineHighlight: "none",
						overviewRulerLanes: 0,
						hideCursorInOverviewRuler: true,
						scrollbar: {
							verticalScrollbarSize: 6,
							horizontalScrollbarSize: 6
						},
						folding: false,
						glyphMargin: false,
						lineDecorationsWidth: 8,
						lineNumbersMinChars: 0
					}
				})
			})]
		});
	};
	JsonModeEditor = ({ value, onChange }) => {
		const { MonacoEditor, loading } = useMonacoEditor();
		const lineCount = (value.match(/\n/g)?.length ?? 0) + 1;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				borderRadius: 10,
				overflow: "hidden",
				border: "1px solid #e5e7eb",
				boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
				height: Math.min(280, Math.max(120, lineCount * 20 + 16))
			},
			children: loading || !MonacoEditor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					background: "#1e1e2e",
					color: "#9ca3af",
					fontSize: 12
				},
				children: "Loading editor..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonacoEditor, {
				value,
				language: "json",
				height: "100%",
				minimap: false,
				lineNumbers: "off",
				wordWrap: "on",
				fontSize: 13,
				onChange,
				options: {
					scrollBeyondLastLine: false,
					automaticLayout: true,
					padding: {
						top: 8,
						bottom: 8
					},
					renderLineHighlight: "none",
					overviewRulerLanes: 0,
					hideCursorInOverviewRuler: true,
					scrollbar: {
						verticalScrollbarSize: 6,
						horizontalScrollbarSize: 6
					},
					folding: false,
					glyphMargin: false,
					lineDecorationsWidth: 8,
					lineNumbersMinChars: 0
				}
			})
		});
	};
	ParamsFormRenderer = ({ params, fields, setFields, fileRefs, setFileRefs }) => {
		const hasBinaryParam = params.some((p) => isBinaryParam(p));
		const hasObjectParam = params.some((p) => p.properties && p.properties.length > 0);
		if (params.length >= 5 && !hasBinaryParam && !hasObjectParam) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectParamEditor, {
			param: {
				name: "options",
				type: "object",
				desc: "参数对象",
				properties: params.map((p) => ({
					name: p.name,
					type: p.type,
					required: p.required,
					desc: p.desc
				}))
			},
			value: fields["__monaco_merged__"] ?? buildInitialLiteral(params, fields),
			onChange: (v) => setFields({
				...fields,
				"__monaco_merged__": v
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 14
			},
			children: params.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						marginBottom: 6
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 13,
								fontFamily: "ui-monospace, \"SF Mono\", Menlo, monospace",
								color: "#1e293b",
								fontWeight: 600
							},
							children: p.name
						}),
						p.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 10,
								color: "#fff",
								background: "#ef4444",
								padding: "1px 5px",
								borderRadius: 3,
								fontWeight: 600
							},
							children: "必填"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 11,
								color: "#7c3aed",
								background: "#f5f3ff",
								padding: "1px 6px",
								borderRadius: 4,
								fontFamily: "ui-monospace, monospace"
							},
							children: p.type
						})
					]
				}),
				isBinaryParam(p) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					onChange: (e) => {
						const file = e.target.files?.[0] ?? null;
						setFileRefs((prev) => ({
							...prev,
							[p.name]: file
						}));
					},
					style: {
						width: "100%",
						padding: "8px 12px",
						borderRadius: 8,
						border: "1px solid #e5e7eb",
						background: "#fafbfc",
						color: "#000",
						fontSize: 12
					}
				}), fileRefs[p.name] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						fontSize: 11,
						color: "#166534",
						marginTop: 4
					},
					children: [
						"已选：",
						fileRefs[p.name].name,
						" (",
						(fileRefs[p.name].size / 1024).toFixed(1),
						" KB)"
					]
				})] }) : p.properties && p.properties.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectParamEditor, {
					param: p,
					value: fields[p.name] ?? "",
					onChange: (v) => setFields({
						...fields,
						[p.name]: v
					})
				}) : p.type === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: fields[p.name] ?? "false",
					onChange: (e) => setFields({
						...fields,
						[p.name]: e.target.value
					}),
					style: {
						width: "100%",
						padding: "8px 12px",
						borderRadius: 8,
						border: "1px solid #e5e7eb",
						background: "#fafbfc",
						color: "#000",
						fontSize: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "false",
						children: "false"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "true",
						children: "true"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: fields[p.name] ?? "",
					onChange: (e) => setFields({
						...fields,
						[p.name]: e.target.value
					}),
					placeholder: p.desc && p.desc !== p.name ? p.desc : `${p.type}${p.required ? "" : "（可选）"}`,
					style: {
						width: "100%",
						boxSizing: "border-box",
						padding: "8px 12px",
						borderRadius: 8,
						border: "1px solid #e5e7eb",
						background: "#fafbfc",
						color: "#1e293b",
						fontSize: 13,
						fontFamily: "ui-monospace, \"SF Mono\", Menlo, monospace"
					}
				}),
				p.desc && p.desc !== p.name && !p.properties && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: 11,
						color: "#6b7280",
						marginTop: 4
					},
					children: p.desc
				})
			] }, p.name))
		});
	};
	MethodItem = import_react.memo(({ entry, selected, onSelect }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: (0, import_react.useCallback)(() => onSelect(entry.method), [onSelect, entry.method]),
			style: {
				display: "flex",
				alignItems: "center",
				gap: 6,
				textAlign: "left",
				padding: "8px 12px",
				borderRadius: 6,
				border: "none",
				width: "100%",
				background: selected ? "#1e293b" : "transparent",
				cursor: "pointer",
				transition: "background .1s"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					fontSize: 12,
					fontFamily: "ui-monospace, monospace",
					color: selected ? "#fff" : "#000",
					flex: 1
				},
				children: [
					".",
					entry.method,
					"()"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontSize: 9,
					padding: "1px 5px",
					borderRadius: 3,
					background: entry.internal ? "#6b7280" : "#065f46",
					color: "#fff",
					fontWeight: 600
				},
				children: entry.internal ? "INTERNAL" : "PUBLIC"
			})]
		});
	});
	ApiCallPanel = ({ entry }) => {
		const hasFormParams = entry.params && entry.params.length > 0;
		const isFileEntry = hasFileParam(entry.params);
		const [fields, setFields] = (0, import_react.useState)(() => buildFieldValues(entry.params));
		const [fileRefs, setFileRefs] = (0, import_react.useState)({});
		const [jsonMode, setJsonMode] = (0, import_react.useState)(!hasFormParams);
		const [rawJson, setRawJson] = (0, import_react.useState)(entry.defaultParams);
		const [result, setResult] = (0, import_react.useState)({ status: "idle" });
		(0, import_react.useEffect)(() => {
			setFields(buildFieldValues(entry.params));
			setFileRefs({});
			setRawJson(entry.defaultParams);
			setJsonMode(isFileEntry ? false : !entry.params || entry.params.length === 0);
			setResult({ status: "idle" });
		}, [entry, isFileEntry]);
		const run = (0, import_react.useCallback)(async () => {
			setResult({ status: "running" });
			const start = performance.now();
			try {
				let parsed;
				if (jsonMode) parsed = JSON.parse(rawJson);
				else {
					parsed = fieldsToJson(fields, entry.params);
					for (const [key, file] of Object.entries(fileRefs)) {
						if (!file) continue;
						const electronPath = file.path;
						if (electronPath) parsed[key] = {
							filePath: electronPath,
							name: file.name,
							type: file.type || void 0
						};
						else parsed[key] = file;
					}
				}
				const res = await entry.run(wb, cleanParams(parsed));
				setResult({
					status: "pass",
					data: JSON.stringify(res, null, 2),
					ms: performance.now() - start
				});
			} catch (e) {
				setResult({
					status: "fail",
					error: formatError(e),
					ms: performance.now() - start
				});
			}
		}, [
			entry,
			fields,
			fileRefs,
			rawJson,
			jsonMode
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				gap: 16,
				height: "100%",
				minHeight: 0
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					flex: 1,
					maxWidth: 640,
					display: "flex",
					flexDirection: "column",
					gap: 12,
					overflow: "auto",
					padding: "0 4px 16px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "#f8fafc",
							borderRadius: 8,
							padding: "12px 16px",
							border: "1px solid #e2e8f0"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
								style: {
									fontSize: 14,
									fontFamily: "ui-monospace, \"SF Mono\", Menlo, monospace",
									color: "#000",
									display: "block",
									marginBottom: 8
								},
								children: [
									"wb.",
									entry.ns,
									".",
									entry.method,
									"()"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 6,
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										padding: "2px 8px",
										borderRadius: 4,
										fontWeight: 600,
										background: entry.internal ? "#6b7280" : "#065f46",
										color: "#fff"
									},
									children: entry.internal ? "INTERNAL" : "PUBLIC"
								}), entry.dataPath === "desktop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										padding: "2px 6px",
										borderRadius: 3,
										background: "#6d28d9",
										color: "#fff",
										fontWeight: 600
									},
									children: "DESKTOP"
								}) : entry.dataPath === "cloud" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										padding: "2px 6px",
										borderRadius: 3,
										background: "#1d4ed8",
										color: "#fff",
										fontWeight: 600
									},
									children: "CLOUD"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										padding: "2px 6px",
										borderRadius: 3,
										background: "#1d4ed8",
										color: "#fff",
										fontWeight: 600
									},
									children: "WEB"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										padding: "2px 6px",
										borderRadius: 3,
										background: "#6d28d9",
										color: "#fff",
										fontWeight: 600
									},
									children: "DESKTOP"
								})] })]
							}),
							(entry.since || entry.platform) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									marginTop: 8,
									fontSize: 11,
									color: "#64748b",
									borderLeft: "3px solid #e2e8f0",
									paddingLeft: 8
								},
								children: [
									entry.since && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Since: v", entry.since] }),
									entry.since && entry.platform && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " | " }),
									entry.platform && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Platform: ", entry.platform] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: S.card,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: S.cardLabel,
							children: "描述"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: 0,
								fontSize: 13,
								color: "#000",
								lineHeight: 1.6
							},
							children: entry.doc || entry.label
						})]
					}),
					entry.returnsDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: S.card,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: S.cardLabel,
							children: "返回"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							style: {
								fontSize: 12,
								color: "#000",
								fontFamily: "ui-monospace, \"SF Mono\", Menlo, monospace"
							},
							children: entry.returnsDoc.replace(/^`|`$/g, "")
						})]
					}),
					entry.examples && entry.examples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: S.card,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: S.cardLabel,
							children: "示例"
						}), entry.examples.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							style: {
								margin: 0,
								fontSize: 12,
								color: "#4338ca",
								lineHeight: 1.5,
								overflow: "auto"
							},
							children: ex.replace(/```ts?\n?/g, "").replace(/```/g, "").trim()
						}, i))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: S.card,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									marginBottom: 12
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										...S.cardLabel,
										marginBottom: 0
									},
									children: "参数"
								}), hasFormParams && !isFileEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setJsonMode(!jsonMode),
									style: {
										...S.btn,
										...S.btnGhost,
										padding: "3px 10px",
										fontSize: 11,
										fontWeight: 500
									},
									children: jsonMode ? "表单" : "JSON"
								})]
							}),
							jsonMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonModeEditor, {
								value: rawJson,
								onChange: setRawJson
							}) : hasFormParams ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParamsFormRenderer, {
								params: entry.params,
								fields,
								setFields,
								fileRefs,
								setFileRefs
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 12,
									color: "#6b7280"
								},
								children: "无参数"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 10,
									marginTop: 16
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: run,
									disabled: result.status === "running",
									style: {
										...S.btn,
										...S.btnPrimary,
										padding: "8px 20px",
										fontSize: 13,
										borderRadius: 8,
										...result.status === "running" ? {
											opacity: .6,
											cursor: "not-allowed"
										} : {}
									},
									children: result.status === "running" ? "⏳ 执行中..." : "▶ 调用"
								}), result.ms !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: 11,
										color: result.status === "pass" ? "#4ade80" : result.status === "fail" ? "#f87171" : "#64748b"
									},
									children: [
										result.status === "pass" ? "✓" : "✗",
										" ",
										result.ms.toFixed(0),
										"ms"
									]
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					flex: 1,
					minWidth: 280,
					display: "flex",
					flexDirection: "column",
					minHeight: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						background: "#1e1e2e",
						borderRadius: 8,
						padding: "12px 16px",
						border: "1px solid #2d2d3d",
						minHeight: 0,
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							letterSpacing: "0.5px",
							marginBottom: 8,
							color: result.status === "pass" ? "#a3e635" : result.status === "fail" ? "#fb7185" : "#a1a1aa"
						},
						children: [result.status === "pass" ? "✓ RESPONSE" : result.status === "fail" ? "✗ ERROR" : "RESPONSE", result.ms !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								marginLeft: 8,
								fontWeight: 400,
								color: "#71717a"
							},
							children: [result.ms.toFixed(0), "ms"]
						})]
					}), result.data || result.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						style: {
							margin: 0,
							fontSize: 12,
							lineHeight: 1.6,
							fontFamily: "ui-monospace, \"SF Mono\", Menlo, monospace",
							color: result.status === "pass" ? "#d4d4d8" : "#fca5a5",
							overflow: "auto",
							flex: 1
						},
						children: result.data || result.error
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							flex: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "#52525b",
							fontSize: 12
						},
						children: "点击左侧 ▶ 调用 查看响应"
					})]
				})
			})]
		});
	};
	RunAllReportRow = ({ r }) => {
		const [expanded, setExpanded] = (0, import_react.useState)(false);
		const icon = r.status === "pass" ? "✓" : r.status === "fail" ? "✗" : "…";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { borderBottom: "1px solid #f3f4f6" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: () => setExpanded(!expanded),
				style: {
					display: "flex",
					gap: 8,
					alignItems: "center",
					padding: "6px 0",
					fontSize: 12,
					cursor: "pointer",
					userSelect: "none"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: r.status === "pass" ? "#4ade80" : r.status === "fail" ? "#f87171" : "#fcd34d",
							fontWeight: 700,
							width: 14,
							textAlign: "center"
						},
						children: icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontFamily: "ui-monospace, monospace",
							color: "#000",
							flex: 1
						},
						children: [
							"wb.",
							r.ns,
							".",
							r.method,
							"()"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "#666666",
							fontSize: 11,
							minWidth: 45,
							textAlign: "right"
						},
						children: r.duration !== void 0 ? `${r.duration.toFixed(0)}ms` : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "#666666",
							fontSize: 11
						},
						children: expanded ? "▼" : "▶"
					})
				]
			}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "4px 0 10px 22px",
					fontSize: 11
				},
				children: [r.result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					style: {
						margin: 0,
						color: "#166534",
						maxHeight: 150,
						overflow: "auto"
					},
					children: r.result
				}), r.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					style: {
						margin: 0,
						color: "#dc2626",
						maxHeight: 150,
						overflow: "auto"
					},
					children: r.error
				})]
			})]
		});
	};
	RunAllReport = ({ results }) => {
		if (results.length === 0) return null;
		const passed = results.filter((r) => r.status === "pass").length;
		const failed = results.filter((r) => r.status === "fail").length;
		const running = results.filter((r) => r.status === "running").length;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				...S.card,
				marginBottom: 16,
				maxHeight: "35vh",
				overflow: "auto",
				flexShrink: 0
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: 13,
					fontWeight: 600,
					marginBottom: 8,
					position: "sticky",
					top: 0,
					background: "#0f172a",
					paddingBottom: 4
				},
				children: [
					"Run All",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							color: "#16a34a",
							marginLeft: 8
						},
						children: ["✓ ", passed]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							color: "#dc2626",
							marginLeft: 8
						},
						children: ["✗ ", failed]
					}),
					running > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							color: "#fcd34d",
							marginLeft: 8
						},
						children: ["… ", running]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							color: "#666666",
							marginLeft: 8
						},
						children: ["/ ", results.length]
					})
				]
			}), results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunAllReportRow, { r }, r.key))]
		});
	};
	SdkApiConsole = () => {
		const [isIoa, setIsIoa] = (0, import_react.useState)(false);
		(0, import_react.useEffect)(() => {
			let alive = true;
			(async () => {
				try {
					const r = await wb.account?.isIOA?.();
					if (alive) setIsIoa(r === true);
				} catch {
					if (alive) setIsIoa(false);
				}
			})();
			return () => {
				alive = false;
			};
		}, []);
		const namespaces = (0, import_react.useMemo)(() => getNamespaces(isIoa), [isIoa]);
		const [selectedNs, setSelectedNs] = (0, import_react.useState)("");
		const methods = (0, import_react.useMemo)(() => getMethodsByNs(selectedNs, isIoa), [selectedNs, isIoa]);
		const [selectedMethod, setSelectedMethod] = (0, import_react.useState)("");
		const selectedEntry = (0, import_react.useMemo)(() => methods.find((m) => m.method === selectedMethod), [methods, selectedMethod]);
		(0, import_react.useEffect)(() => {
			if (!selectedNs && namespaces.length > 0) setSelectedNs(namespaces[0]);
		}, [namespaces, selectedNs]);
		(0, import_react.useEffect)(() => {
			setSelectedMethod(getMethodsByNs(selectedNs, isIoa)[0]?.method || "");
		}, [selectedNs, isIoa]);
		const [allResults, setAllResults] = (0, import_react.useState)([]);
		const [isRunningAll, setIsRunningAll] = (0, import_react.useState)(false);
		const runAll = (0, import_react.useCallback)(async () => {
			setIsRunningAll(true);
			const entries = getSafeEntries();
			const results = entries.map((e) => ({
				key: `${e.ns}.${e.method}`,
				ns: e.ns,
				method: e.method,
				label: e.label,
				status: "running"
			}));
			setAllResults([...results]);
			for (let i = 0; i < entries.length; i++) {
				const entry = entries[i];
				const start = performance.now();
				try {
					const parsed = cleanParams(JSON.parse(entry.defaultParams));
					const res = await entry.run(wb, parsed);
					results[i] = {
						...results[i],
						status: "pass",
						duration: performance.now() - start,
						result: JSON.stringify(res, null, 2)
					};
				} catch (e) {
					results[i] = {
						...results[i],
						status: "fail",
						duration: performance.now() - start,
						error: formatError(e)
					};
				}
				setAllResults([...results]);
			}
			setIsRunningAll(false);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sdk-demo-root",
			"data-testid": "sdk-demo-root",
			style: {
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				padding: "20px 24px",
				boxSizing: "border-box",
				overflow: "hidden",
				background: "#fff",
				color: "#000"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 16,
						flexShrink: 0,
						borderBottom: "1px solid #f3f4f6",
						paddingBottom: 12
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 10
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									if (typeof window.__wbNavigate === "function") window.__wbNavigate("/");
									else window.history.back();
								},
								style: {
									width: 28,
									height: 28,
									borderRadius: 6,
									border: "1px solid #e2e8f0",
									background: "transparent",
									color: "#000",
									fontSize: 16,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								title: "返回",
								children: "‹"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								style: {
									margin: 0,
									fontSize: 15,
									fontWeight: 600,
									color: "#000"
								},
								children: "API Console"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-testid": "sdk-demo-platform",
								style: {
									fontSize: 10,
									color: "#000",
									padding: "2px 6px",
									background: "#f1f5f9",
									borderRadius: 4
								},
								children: [
									wb.platform?.type ?? "—",
									wb.platform?.os ? ` · ${wb.platform.os}` : "",
									wb.platform?.appVersion ? ` · v${wb.platform.appVersion}` : ""
								]
							})
						]
					}), isIoa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: runAll,
						disabled: isRunningAll,
						style: {
							...S.btn,
							...S.btnPrimary,
							opacity: isRunningAll ? .6 : 1
						},
						children: isRunningAll ? "⏳ Running…" : "▶ Run All"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunAllReport, { results: allResults }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 20,
						flex: 1,
						minHeight: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						style: {
							width: 250,
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							gap: 4,
							overflow: "auto"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedNs,
							onChange: (e) => setSelectedNs(e.target.value),
							style: {
								width: "100%",
								padding: "8px 12px",
								paddingRight: 32,
								borderRadius: 6,
								border: "1px solid #e2e8f0",
								background: "#f8fafc",
								color: "#000",
								fontSize: 13,
								fontWeight: 500,
								appearance: "none",
								backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' fill='none' stroke='%23666' stroke-width='1.5'/%3E%3C/svg%3E\")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "right 12px center"
							},
							children: namespaces.map((ns) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: ns,
								children: ["wb.", ns]
							}, ns))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 1
							},
							children: methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodItem, {
								entry: m,
								selected: selectedMethod === m.method,
								onSelect: setSelectedMethod
							}, m.method))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						style: {
							flex: 1,
							minHeight: 0,
							overflow: "auto"
						},
						children: selectedEntry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiCallPanel, { entry: selectedEntry }, `${selectedEntry.ns}.${selectedEntry.method}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: "#666666",
								padding: 40,
								textAlign: "center"
							},
							children: "选择左侧方法开始调试"
						})
					})]
				})
			]
		});
	};
}))();
export { SdkApiConsole, SdkApiConsole as default };
