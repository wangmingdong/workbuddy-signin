import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/modules/collab/mock-data.ts
var CONNECTOR_CATALOG, createAvailableConnectors, MOCK_AVAILABLE_CONNECTORS, MOCK_DETAIL_TASKS, ME, ZHANG, LI, MOCK_DETAIL_ACTIVITIES;
var init_mock_data = __esmMin((() => {
	CONNECTOR_CATALOG = [
		{
			connectorName: "google_drive",
			displayName: "Google Drive",
			description: "访问云端文件",
			iconUrl: null
		},
		{
			connectorName: "gmail",
			displayName: "Gmail",
			description: "收发邮件",
			iconUrl: null
		},
		{
			connectorName: "notion",
			displayName: "Notion",
			description: "同步文档页面",
			iconUrl: null
		},
		{
			connectorName: "slack",
			displayName: "Slack",
			description: "发送消息通知",
			iconUrl: null
		},
		{
			connectorName: "google_sheets",
			displayName: "Google Sheets",
			description: "读写表格数据",
			iconUrl: null
		},
		{
			connectorName: "github",
			displayName: "GitHub",
			description: "代码仓库操作",
			iconUrl: null
		},
		{
			connectorName: "google_docs",
			displayName: "Google Docs",
			description: "编辑文档内容",
			iconUrl: null
		}
	];
	createAvailableConnectors = () => {
		const connectors = [];
		connectors.push({
			...CONNECTOR_CATALOG[4],
			authMode: "public",
			configuredBy: "admin-1",
			configuredByName: "管理员",
			connectedAccount: "team-ops@workbuddy.com",
			isConnected: true,
			enabled: true
		}, {
			...CONNECTOR_CATALOG[3],
			authMode: "public",
			configuredBy: "admin-1",
			configuredByName: "管理员",
			connectedAccount: "workbuddy.slack.com #team",
			isConnected: true,
			enabled: true
		}, {
			...CONNECTOR_CATALOG[5],
			authMode: "public",
			configuredBy: null,
			configuredByName: null,
			connectedAccount: null,
			isConnected: false
		});
		connectors.push({
			...CONNECTOR_CATALOG[0],
			authMode: "personal",
			configuredBy: null,
			configuredByName: null,
			connectedAccount: "me@gmail.com",
			isConnected: true,
			enabled: true
		}, {
			...CONNECTOR_CATALOG[1],
			authMode: "personal",
			configuredBy: null,
			configuredByName: null,
			connectedAccount: null,
			isConnected: false
		}, {
			...CONNECTOR_CATALOG[2],
			authMode: "personal",
			configuredBy: null,
			configuredByName: null,
			connectedAccount: null,
			isConnected: false
		}, {
			...CONNECTOR_CATALOG[3],
			authMode: "personal",
			configuredBy: null,
			configuredByName: null,
			connectedAccount: "myname@personal.com",
			isConnected: true,
			enabled: true
		});
		return connectors;
	};
	MOCK_AVAILABLE_CONNECTORS = createAvailableConnectors();
	MOCK_DETAIL_TASKS = [
		{
			id: "t1",
			title: "帮我梳理 Q2 产品规划中未完成的关键任务",
			status: "in_progress",
			createdAt: "2026-05-09T14:50:00Z"
		},
		{
			id: "t2",
			title: "整理权限系统重构的技术要点和风险项",
			status: "completed",
			createdAt: "2026-05-07T10:00:00Z"
		},
		{
			id: "t3",
			title: "数据看板 v2 相关设计文档和技术方案",
			status: "completed",
			createdAt: "2026-05-06T09:00:00Z"
		},
		{
			id: "t4",
			title: "权限系统迁移方案对比分析",
			status: "failed",
			createdAt: "2026-05-05T15:00:00Z"
		},
		{
			id: "t5",
			title: "汇总今日邮件中的待办事项",
			status: "completed",
			createdAt: "2026-05-09T09:00:00Z"
		},
		{
			id: "t6",
			title: "周报草稿：本周工作要点汇总",
			status: "in_progress",
			createdAt: "2026-05-09T14:55:00Z"
		},
		{
			id: "t7",
			title: "汇总今日邮件中的待办事项",
			status: "completed",
			createdAt: "2026-05-08T09:00:00Z"
		},
		{
			id: "t8",
			title: "整理 Q2 产品规划评审会议纪要",
			status: "completed",
			createdAt: "2026-05-08T18:30:00Z"
		},
		{
			id: "t9",
			title: "补充数据看板 v2 指标口径说明",
			status: "pending",
			createdAt: "2026-05-08T16:10:00Z"
		},
		{
			id: "t10",
			title: "检查移动端适配清单中的遗漏项",
			status: "completed",
			createdAt: "2026-05-08T14:20:00Z"
		},
		{
			id: "t11",
			title: "生成 API 文档更新待办列表",
			status: "completed",
			createdAt: "2026-05-08T11:00:00Z"
		},
		{
			id: "t12",
			title: "汇总本周项目风险和阻塞点",
			status: "pending",
			createdAt: "2026-05-09T18:00:00Z"
		},
		{
			id: "t13",
			title: "整理 Q2 产品规划评审会议纪要",
			status: "completed",
			createdAt: "2026-05-08T18:30:00Z"
		},
		{
			id: "t14",
			title: "补充活动配置后台验收标准",
			status: "pending",
			createdAt: "2026-05-08T16:10:00Z"
		},
		{
			id: "t15",
			title: "汇总今日邮件中的待办事项",
			status: "completed",
			createdAt: "2026-05-08T09:00:00Z"
		},
		{
			id: "t16",
			title: "整理接口联调风险点",
			status: "pending",
			createdAt: "2026-05-07T19:00:00Z"
		}
	];
	ME = {
		id: "u1",
		name: "我",
		role: "admin"
	};
	ZHANG = {
		id: "u2",
		name: "张三",
		role: "editor"
	};
	LI = {
		id: "u3",
		name: "李四",
		role: "editor"
	};
	MOCK_DETAIL_ACTIVITIES = [
		{
			id: "a1",
			type: "message",
			actor: ME,
			content: "创建了任务「帮我梳理 Q2 产品规划中未完成的关键任务」",
			timestamp: "2026-05-09T14:50:00Z"
		},
		{
			id: "a2",
			type: "message",
			actor: ME,
			content: "完成了任务「整理权限系统重构的技术要点和风险项」",
			timestamp: "2026-05-07T10:00:00Z"
		},
		{
			id: "a3",
			type: "member_invited",
			actor: ZHANG,
			content: "加入了项目",
			targetName: "成员",
			timestamp: "2026-05-06T09:00:00Z"
		},
		{
			id: "a4",
			type: "instruction_changed",
			actor: LI,
			content: "更新了项目指令",
			timestamp: "2026-05-05T15:00:00Z"
		},
		{
			id: "a5",
			type: "message",
			actor: ME,
			content: "创建了任务「数据看板 v2 相关设计文档和技术方案」",
			timestamp: "2026-05-04T09:00:00Z"
		},
		{
			id: "a6",
			type: "message",
			actor: ZHANG,
			content: "在「权限系统迁移方案对比分析」中发了一条消息",
			timestamp: "2026-05-03T14:20:00Z"
		}
	];
}));
//#endregion
export { init_mock_data as i, MOCK_DETAIL_ACTIVITIES as n, MOCK_DETAIL_TASKS as r, MOCK_AVAILABLE_CONNECTORS as t };
