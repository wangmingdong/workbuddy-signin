import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Xl as init_services, Zl as useTencentDocsFacade, dd as init_use_is_enterprise_admin, fu as init_use_oneid_app_status, pd as useIsEnterpriseEdition, pu as useOneidAppStatus } from "./agent-mail-CiuzbR2o.js";
import { Ba as Tooltip, dc as Yr, fc as init_dist, i as Breadcrumb, k as Checkbox, pn as Dropdown, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_zustand } from "./zustand-BGHu9tpa.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
import { t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as init_telemetry_helpers, s as reportLibraryAuthConnectorSuccess, x as init_store$1, y as connectorStore } from "./ima-auth-store-Cq8i4JCG.js";
import { _ as reportTDocAuthFromLibrary, g as reportTDocAuthFromFileUpload, h as reportTDocAuthFromFilePicker, m as reportTDocAuthFromConnector, p as reportTDocAuthFail, t as init_telemetry, v as reportTDocAuthPageShow, y as reportTDocAuthSuccess } from "./telemetry-DmUpjlLA.js";
import { n as init_header_workbuddy, t as header_workbuddy_default } from "./header-workbuddy-UO2zaYBA.js";
import { n as init_MoreIcon, t as MoreIcon } from "./MoreIcon-DZ17Rnhm.js";
import { a as init_tdoc_slide, c as tdoc_mind_default, i as tdoc_smartcanvas_default, l as init_tdoc_folder, n as tdoc_smartsheet_default, o as tdoc_slide_default, r as init_tdoc_smartcanvas, s as init_tdoc_mind, t as init_tdoc_smartsheet, u as tdoc_folder_default } from "./tdoc-smartsheet-BpkxxL4U.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/types.ts
var ListType, OrderBy, FileType, FileDeleteType, SearchField;
var init_types = __esmMin((() => {
	ListType = /* @__PURE__ */ function(ListType) {
		ListType["MY_DOC"] = "MY_DOC";
		ListType["RECENT"] = "RECENT";
		ListType["STAR"] = "STAR";
		ListType["TRASH"] = "TRASH";
		ListType["COLLABORATION_LIST"] = "COLLABORATION_LIST";
		ListType["SHARED"] = "SHARED";
		return ListType;
	}({});
	OrderBy = /* @__PURE__ */ function(OrderBy) {
		OrderBy["FILE_NAME"] = "FILE_NAME";
		OrderBy["ACCESS_TIME"] = "ACCESS_TIME";
		OrderBy["MODIFY_TIME"] = "MODIFY_TIME";
		OrderBy["STAR_TIME"] = "STAR_TIME";
		OrderBy["DELETE_TIME"] = "DELETE_TIME";
		return OrderBy;
	}({});
	FileType = /* @__PURE__ */ function(FileType) {
		FileType["DOC"] = "DOC";
		FileType["SHEET"] = "SHEET";
		FileType["SLIDE"] = "SLIDE";
		FileType["FORM"] = "FORM";
		FileType["PDF"] = "PDF";
		FileType["MIND"] = "MIND";
		FileType["FLOW_CHART"] = "FLOW_CHART";
		FileType["REC"] = "REC";
		FileType["DRIVE"] = "DRIVE";
		FileType["FOLDER"] = "FOLDER";
		FileType["COLLABORATE"] = "COLLABORATE";
		FileType["SMART_SHEET"] = "SMART_SHEET";
		FileType["SMART_CANVAS"] = "SMART_CANVAS";
		FileType["BOARD"] = "BOARD";
		FileType["SPACE_LINK"] = "SPACE_LINK";
		FileType["FORM_CLOCK"] = "FORM_CLOCK";
		FileType["FORM_SEQUENCE"] = "FORM_SEQUENCE";
		FileType["SPEECH"] = "SPEECH";
		return FileType;
	}({});
	FileDeleteType = /* @__PURE__ */ function(FileDeleteType) {
		FileDeleteType[FileDeleteType["DELETE_TYPE_ALL_DOC"] = 1] = "DELETE_TYPE_ALL_DOC";
		FileDeleteType[FileDeleteType["DELETE_TYPE_TRASH"] = 2] = "DELETE_TYPE_TRASH";
		FileDeleteType[FileDeleteType["DELETE_TYPE_STARRED"] = 3] = "DELETE_TYPE_STARRED";
		FileDeleteType[FileDeleteType["DELETE_TYPE_MY_DOC"] = 4] = "DELETE_TYPE_MY_DOC";
		FileDeleteType[FileDeleteType["DELETE_TYPE_SHARED"] = 5] = "DELETE_TYPE_SHARED";
		FileDeleteType[FileDeleteType["DELETE_TYPE_HISTORY"] = 6] = "DELETE_TYPE_HISTORY";
		return FileDeleteType;
	}({});
	SearchField = /* @__PURE__ */ function(SearchField) {
		SearchField["FILE_NAME"] = "FILE_NAME";
		SearchField["OWNER_NAME"] = "OWNER_NAME";
		return SearchField;
	}({});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/constants.ts
/**
* 判断（FileInfo / FileViewModel 通用）某个文件是否可勾选添加到任务。
*
*  - 文件夹一律不可勾选
*  - 在线文档品类按 {@link SELECTABLE_FILE_TYPES} 白名单
*  - DRIVE 文件按扩展名命中 {@link SELECTABLE_DRIVE_EXTS} 才可勾选
*/
function isFileViewModelCheckable(file) {
	if (file.isFolder) return false;
	if (SELECTABLE_FILE_TYPES.has(file.type)) return true;
	if (file.type === FileType.DRIVE && file.ext) return SELECTABLE_DRIVE_EXTS.has(file.ext.toLowerCase());
	return false;
}
var ROOT_FOLDER_ID, TDOCS_CONNECTOR_NAME, AUTH_POLL_INTERVAL, GATEWAY_TICKET_REQUIRED, GATEWAY_CREDENTIAL_MISSING, TDOCS_ACCESS_TOKEN_EMPTY, TDOCS_TOKEN_EXPIRED, TDOCS_ACCESS_TOKEN_NOT_FOUND, AUTH_EXPIRED_CODES, SELECTABLE_FILE_TYPES, SELECTABLE_DRIVE_EXTS, CREATE_DOC_OPTIONS;
var init_constants = __esmMin((() => {
	init_types();
	ROOT_FOLDER_ID = "root";
	TDOCS_CONNECTOR_NAME = "tdocs-app";
	AUTH_POLL_INTERVAL = 2e3;
	GATEWAY_TICKET_REQUIRED = 17002;
	GATEWAY_CREDENTIAL_MISSING = 17009;
	TDOCS_ACCESS_TOKEN_EMPTY = 10313;
	TDOCS_TOKEN_EXPIRED = 37019;
	TDOCS_ACCESS_TOKEN_NOT_FOUND = 10101;
	AUTH_EXPIRED_CODES = [
		GATEWAY_CREDENTIAL_MISSING,
		GATEWAY_TICKET_REQUIRED,
		TDOCS_TOKEN_EXPIRED,
		TDOCS_ACCESS_TOKEN_EMPTY,
		TDOCS_ACCESS_TOKEN_NOT_FOUND
	];
	SELECTABLE_FILE_TYPES = new Set([
		FileType.DOC,
		FileType.SLIDE,
		FileType.SHEET,
		FileType.FORM,
		FileType.PDF,
		FileType.MIND,
		FileType.SMART_CANVAS,
		FileType.SMART_SHEET,
		FileType.FLOW_CHART,
		FileType.BOARD
	]);
	SELECTABLE_DRIVE_EXTS = new Set([
		"md",
		"markdown",
		"png",
		"jpg",
		"jpeg",
		"txt"
	]);
	new Set([
		FileType.DOC,
		FileType.SLIDE,
		FileType.SHEET
	]);
	CREATE_DOC_OPTIONS = [
		{
			type: FileType.DOC,
			labelKey: "tdoc.create.doc",
			defaultNameKey: "tdoc.create.defaultName.doc",
			group: "professional",
			enabled: true,
			telemetryType: "word"
		},
		{
			type: FileType.SHEET,
			labelKey: "tdoc.create.sheet",
			defaultNameKey: "tdoc.create.defaultName.sheet",
			group: "professional",
			enabled: true,
			telemetryType: "excel"
		},
		{
			type: FileType.SLIDE,
			labelKey: "tdoc.create.slide",
			defaultNameKey: "tdoc.create.defaultName.slide",
			group: "professional",
			enabled: true,
			telemetryType: "ppt"
		},
		{
			type: FileType.FORM,
			labelKey: "tdoc.create.form",
			defaultNameKey: "tdoc.create.defaultName.form",
			group: "creative",
			enabled: true,
			telemetryType: "form"
		},
		{
			type: FileType.SMART_CANVAS,
			labelKey: "tdoc.create.smartCanvas",
			defaultNameKey: "tdoc.create.defaultName.smartCanvas",
			group: "creative",
			enabled: true,
			telemetryType: "smartcanvas"
		},
		{
			type: FileType.SMART_SHEET,
			labelKey: "tdoc.create.smartSheet",
			defaultNameKey: "tdoc.create.defaultName.smartSheet",
			group: "creative",
			enabled: true,
			telemetryType: "smartsheet"
		},
		{
			type: FileType.MIND,
			labelKey: "tdoc.create.mind",
			defaultNameKey: "tdoc.create.defaultName.mind",
			group: "creative",
			enabled: true,
			telemetryType: "mind"
		},
		{
			type: FileType.FLOW_CHART,
			labelKey: "tdoc.create.flowchart",
			defaultNameKey: "tdoc.create.defaultName.flowchart",
			group: "creative",
			enabled: true,
			telemetryType: "flow"
		},
		{
			type: FileType.BOARD,
			labelKey: "tdoc.create.board",
			defaultNameKey: "tdoc.create.defaultName.board",
			group: "creative",
			enabled: true,
			telemetryType: "board"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/store.ts
/**
* 授权成功后让 connector:tencent-docs 进入 enabled 状态：
*
* 1. `updateConnectorHeaders` 把 mcp_token 写进 headerOverrides.Authorization，
*    使后续 MCP 调用直通使用最新 token；
* 2. 直接走底层 `adapter.connectConnector` 显式启用 connector
*    （加入 persistentState.enabled、触发 MCP 连接、并把状态同步刷新为 connected）。
*
* 注意：这里不能调用 `connectorStore.connectMcpConnector`。该方法是连接器面板的
* 用户入口，会先执行 gateway/server-side connector 自己的 OAuth 预流程；腾讯N  * 资料库已经通过 `tdocStartAuth` 完成授权并拿到 mcp_token，再走连接器 OAuth 会在
* 首次打开资料库时弹出"连接器-腾讯N文档"授权页。
*
* 内部 fire-and-forget：失败仅记录日志，不影响资料库授权状态。
*
* ## silent 模式（被动检查场景）
*
* 当 `options.silent === true` 时，仅执行步骤 1（同步 header），跳过步骤 2：
* 不调 `connectConnector`、也不刷 `loadMcpConnectors`，从而不会改动 connector
* 的启用状态。
*
* 用于 `checkAuthStatus` 里看板与连接器已处于兼容状态的被动同步：
* 只刷新 header，不改 connector enabled 状态，避免把用户主动关闭的开关
* 重新打开。
*
* 首次走完授权（`startAuthorization` 拿到 connected 时），以及进入看板发现
* "看板已授权但连接器未授权"时，仍走默认非 silent，保留"授权完成即启用
* connector"的预期行为。
*/
function syncMcpTokenToConnector(adapter, connectorId, mcpToken, options) {
	if (!mcpToken || !adapter?.updateConnectorHeaders) return;
	const silent = options?.silent === true;
	adapter.updateConnectorHeaders(connectorId, { Authorization: mcpToken }).then((result) => {
		if (!result?.success) {
			console.warn("[TencentDocs] sync mcp_token to connector headers failed:", result?.error);
			return;
		}
		if (silent) return;
		connectorStore.getState().loadMcpConnectors().catch((err) => {
			console.warn("[TencentDocs] loadMcpConnectors after auth failed:", err);
		});
	}).catch((error) => {
		console.warn("[TencentDocs] sync mcp_token to connector headers threw:", error);
	});
}
/**
* 授权过期时清掉 connector headers 里的 Authorization，避免主对话里
* 已附加的腾讯文档 phrase block 在被 agent 引用时仍然带着失效的旧 token。
*
* `updateConnectorHeaders` 内部是 shallow merge，无法删除 key，所以这里
* 用空字符串覆盖；后续重新授权成功会被新 mcp_token 覆盖回去。
* 内部 fire-and-forget，失败仅记录日志。
*/
function clearMcpTokenFromConnector(adapter, connectorId) {
	if (!adapter?.updateConnectorHeaders) return;
	adapter.updateConnectorHeaders(connectorId, { Authorization: "" }).then((result) => {
		if (!result?.success) console.warn("[TencentDocs] clear mcp_token from connector headers failed:", result?.error);
	}).catch((error) => {
		console.warn("[TencentDocs] clear mcp_token from connector headers threw:", error);
	});
}
function shouldAuthorizeConnectorFromBoard(connectorState) {
	if (!connectorState) return true;
	if (connectorState.status === "connected" || connectorState.status === "connecting") return false;
	if (connectorState.needsAuth) return true;
	return !connectorState.everConnected && !connectorState.lastConnectedAt;
}
function shouldUnbindConnectorFromBoard(connectorState) {
	if (!connectorState) return false;
	return connectorState.status === "connected" || connectorState.status === "connecting" || Boolean(connectorState.everConnected) || Boolean(connectorState.lastConnectedAt);
}
async function syncConnectorAuthStatusWithBoard(adapter, connectorId, boardStatus, mcpToken) {
	if (!adapter) return;
	try {
		await connectorStore.getState().loadMcpConnectors();
		const connectorState = connectorStore.getState().mcpConnectorStates[connectorId];
		if (boardStatus === "connected") {
			if (shouldAuthorizeConnectorFromBoard(connectorState)) {
				syncMcpTokenToConnector(adapter, connectorId, mcpToken);
				return;
			}
			syncMcpTokenToConnector(adapter, connectorId, mcpToken, { silent: true });
			return;
		}
		if (boardStatus === "pending") return;
		if (!shouldUnbindConnectorFromBoard(connectorState)) {
			clearMcpTokenFromConnector(adapter, connectorId);
			return;
		}
		if (adapter.unbindConnector) {
			const result = await adapter.unbindConnector(connectorId);
			if (!result?.success) console.warn("[TencentDocs] unbind connector after board auth mismatch failed:", result?.error);
		} else clearMcpTokenFromConnector(adapter, connectorId);
		await connectorStore.getState().loadMcpConnectors();
	} catch (error) {
		console.warn("[TencentDocs] sync connector auth status with board failed:", error);
	}
}
/**
* 把 adapter 上的连接器事件桥接到腾讯文档 store：
*
* - `connector:unauthorized`：主进程把 `connector:tencent-docs` 标记为 unauthorized
*   （例如 mcp_token 过期引发 MCP 调用 401）时，调 `markExpired()` 让 UI 回到 AuthGuide。
* - `connector:unbound`：用户在连接器面板解绑 `tencent-docs` 时，同步撤销后端
*   OAuth 并把 store 重置到 `not_connected`；避免后端授权仍在而 UI 显示已授权的割裂。
*
* 绑定对每个 adapter 只做一次；adapter 本身持有 WsRpc `$on` 订阅，
* 生命周期与页面/客户端一致，不在 store 这一层解绑。
*/
function ensureConnectorEventSubscription(adapter) {
	if (!adapter || subscribedAdapters.has(adapter) || typeof adapter.on !== "function") return;
	subscribedAdapters.add(adapter);
	try {
		adapter.on("connector:unauthorized", (data) => {
			const payload = data;
			const activeId = tencentDocsStore.getState().downstreamConnectorId;
			if (payload?.configId !== activeId) return;
			console.info("[TencentDocs] received connector:unauthorized — switching to expired:", payload.reason?.substring(0, 100));
			tencentDocsStore.getState().markExpired();
		});
	} catch (error) {
		console.warn("[TencentDocs] subscribe connector:unauthorized failed:", error);
	}
	try {
		adapter.on("connector:unbound", (data) => {
			const payload = data;
			const activeId = tencentDocsStore.getState().downstreamConnectorId;
			if (payload?.configId !== activeId) return;
			console.info("[TencentDocs] received connector:unbound — revoking auth & resetting store");
			tencentDocsStore.getState().handleConnectorUnbound();
		});
	} catch (error) {
		console.warn("[TencentDocs] subscribe connector:unbound failed:", error);
	}
}
var import_zustand, DEFAULT_DOWNSTREAM_CONNECTOR_ID, subscribedAdapters, tencentDocsStore, useTencentDocsStore;
var init_store = __esmMin((() => {
	import_zustand = require_zustand();
	init_vanilla();
	init_store$1();
	init_telemetry_helpers();
	init_constants();
	init_telemetry();
	DEFAULT_DOWNSTREAM_CONNECTOR_ID = "tencent-docs";
	subscribedAdapters = /* @__PURE__ */ new WeakSet();
	tencentDocsStore = createStore((set, get) => ({
		authStatus: "checking",
		authError: null,
		authorizeUrl: null,
		connectedAt: null,
		adapter: null,
		facade: null,
		pollTimerId: null,
		isPolling: false,
		authTimedOut: false,
		downstreamConnectorId: DEFAULT_DOWNSTREAM_CONNECTOR_ID,
		init: ({ adapter, connectorId }) => {
			const targetId = connectorId ?? DEFAULT_DOWNSTREAM_CONNECTOR_ID;
			if (get().downstreamConnectorId !== targetId) {
				get().reset();
				set({ downstreamConnectorId: targetId });
			}
			set({ adapter });
			ensureConnectorEventSubscription(adapter);
		},
		setAdapter: (adapter) => {
			set({ adapter });
			ensureConnectorEventSubscription(adapter);
		},
		setFacade: (facade) => {
			set({ facade });
		},
		checkAuthStatus: async () => {
			set({
				authStatus: "checking",
				authError: null
			});
			try {
				const { facade, adapter } = get();
				if (!facade) {
					console.warn("[TencentDocs] facade not available");
					set({ authStatus: "not_connected" });
					return;
				}
				const response = await facade.checkAuthStatus();
				set({
					authStatus: {
						not_connected: "not_connected",
						pending: "authorizing",
						connected: "connected",
						expired: "expired",
						failed: "failed"
					}[response.status] || "not_connected",
					connectedAt: response.connected_at || null,
					authError: null
				});
				await syncConnectorAuthStatusWithBoard(adapter, get().downstreamConnectorId, response.status, response.extra?.mcp_token);
			} catch {
				set({
					authStatus: "failed",
					authError: "Failed to check authorization status"
				});
			}
		},
		startAuthorization: async () => {
			const { adapter, facade, stopPolling } = get();
			stopPolling();
			set({
				authStatus: "authorizing",
				authError: null,
				authTimedOut: false
			});
			try {
				if (!facade) throw new Error("TencentDocs facade not available");
				const response = await facade.startAuth();
				set({ authorizeUrl: response.authorize_url });
				const sessionExpireAt = response.expire_at ? new Date(response.expire_at).getTime() : 0;
				const poll = async () => {
					if (sessionExpireAt > 0 && Date.now() > sessionExpireAt) {
						set({
							authTimedOut: true,
							isPolling: false,
							pollTimerId: null
						});
						reportTDocAuthFail(adapter);
						return;
					}
					try {
						if (!facade) throw new Error("TencentDocs facade not available");
						const statusResponse = await facade.checkAuthStatus();
						if (statusResponse.status === "connected") {
							set({
								authStatus: "connected",
								connectedAt: statusResponse.connected_at || (/* @__PURE__ */ new Date()).toISOString(),
								authError: null,
								authorizeUrl: null,
								isPolling: false,
								pollTimerId: null
							});
							reportTDocAuthSuccess(adapter);
							reportLibraryAuthConnectorSuccess(adapter, get().downstreamConnectorId);
							syncMcpTokenToConnector(adapter, get().downstreamConnectorId, statusResponse.extra?.mcp_token);
							return;
						}
						if (statusResponse.status === "failed" || statusResponse.status === "expired") {
							set({
								authTimedOut: true,
								isPolling: false,
								pollTimerId: null
							});
							reportTDocAuthFail(adapter);
							return;
						}
						set({ pollTimerId: setTimeout(poll, AUTH_POLL_INTERVAL) });
					} catch {
						set({ pollTimerId: setTimeout(poll, AUTH_POLL_INTERVAL) });
					}
				};
				set({ isPolling: true });
				set({ pollTimerId: setTimeout(poll, AUTH_POLL_INTERVAL) });
			} catch {
				set({
					authStatus: "failed",
					authError: "Failed to start authorization"
				});
			}
		},
		revokeAuthorization: async () => {
			const { adapter, facade, stopPolling } = get();
			stopPolling();
			try {
				if (!facade) throw new Error("TencentDocs facade not available");
				await facade.revokeAuth();
				set({
					authStatus: "not_connected",
					connectedAt: null,
					authorizeUrl: null,
					authError: null
				});
				if (adapter?.unbindConnector) try {
					await adapter.unbindConnector(get().downstreamConnectorId);
				} catch (err) {
					console.warn("[TencentDocs] unbindConnector after revoke failed:", err);
				}
				connectorStore.getState().loadMcpConnectors().catch((err) => {
					console.warn("[TencentDocs] loadMcpConnectors after revoke failed:", err);
				});
			} catch {
				set({ authError: "Failed to revoke authorization" });
			}
		},
		stopPolling: () => {
			const { pollTimerId } = get();
			if (pollTimerId) {
				clearTimeout(pollTimerId);
				set({
					pollTimerId: null,
					isPolling: false
				});
			}
		},
		dismissTimeout: () => {
			set({
				authStatus: "not_connected",
				authorizeUrl: null,
				authTimedOut: false,
				authError: null
			});
		},
		markExpired: () => {
			const { stopPolling, adapter, authStatus, downstreamConnectorId } = get();
			if (authStatus === "authorizing") return;
			stopPolling();
			set({
				authStatus: "expired",
				authError: null
			});
			clearMcpTokenFromConnector(adapter, downstreamConnectorId);
		},
		handleConnectorUnbound: async () => {
			const { facade, stopPolling } = get();
			stopPolling();
			set({
				authStatus: "not_connected",
				connectedAt: null,
				authorizeUrl: null,
				authError: null
			});
			if (facade) try {
				await facade.revokeAuth();
			} catch (err) {
				console.warn("[TencentDocs] tdocRevokeAuth after connector unbind failed:", err);
			}
		},
		reset: () => {
			const { stopPolling } = get();
			stopPolling();
			set({
				authStatus: "checking",
				authError: null,
				authorizeUrl: null,
				connectedAt: null,
				pollTimerId: null,
				isPolling: false,
				authTimedOut: false
			});
		}
	}));
	useTencentDocsStore = (selector) => (0, import_zustand.useStore)(tencentDocsStore, selector);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/transformers/file-transformer.ts
var FILE_TYPE_MAP, formatFileSize$1, formatRelativeTime, getFileTypeInfo, transformFileInfo, transformFileList;
var init_file_transformer = __esmMin((() => {
	init_types();
	FILE_TYPE_MAP = {
		[FileType.DOC]: {
			label: "文档",
			key: "doc"
		},
		[FileType.SHEET]: {
			label: "表格",
			key: "sheet"
		},
		[FileType.SLIDE]: {
			label: "幻灯片",
			key: "slide"
		},
		[FileType.FORM]: {
			label: "收集表",
			key: "form"
		},
		[FileType.PDF]: {
			label: "PDF",
			key: "pdf"
		},
		[FileType.MIND]: {
			label: "思维导图",
			key: "mind"
		},
		[FileType.FLOW_CHART]: {
			label: "流程图",
			key: "flowchart"
		},
		[FileType.REC]: {
			label: "语音速记",
			key: "rec"
		},
		[FileType.DRIVE]: {
			label: "云盘文件",
			key: "drive"
		},
		[FileType.FOLDER]: {
			label: "文件夹",
			key: "folder"
		},
		[FileType.COLLABORATE]: {
			label: "共享空间",
			key: "collaborate"
		},
		[FileType.SMART_SHEET]: {
			label: "智能表格",
			key: "smart-sheet"
		},
		[FileType.SMART_CANVAS]: {
			label: "智能文档",
			key: "smart-canvas"
		},
		[FileType.BOARD]: {
			label: "白板",
			key: "board"
		},
		[FileType.FORM_CLOCK]: {
			label: "打卡",
			key: "form-clock"
		},
		[FileType.FORM_SEQUENCE]: {
			label: "接龙",
			key: "form-sequence"
		},
		[FileType.SPEECH]: {
			label: "语音速记",
			key: "speech"
		}
	};
	formatFileSize$1 = (bytes) => {
		const size = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
		if (!size || size <= 0) return "-";
		const units = [
			"B",
			"KB",
			"MB",
			"GB"
		];
		let unitIndex = 0;
		let value = size;
		while (value >= 1024 && unitIndex < units.length - 1) {
			value /= 1024;
			unitIndex++;
		}
		return `${unitIndex === 0 ? value : value.toFixed(1)} ${units[unitIndex]}`;
	};
	formatRelativeTime = (time) => {
		if (!time) return "-";
		const date = typeof time === "number" ? /* @__PURE__ */ new Date(time * 1e3) : new Date(time);
		const now = /* @__PURE__ */ new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMinutes = Math.floor(diffMs / (1e3 * 60));
		const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
		if (diffMinutes < 1) return "刚刚";
		if (diffMinutes < 60) return `${diffMinutes} 分钟前`;
		if (diffHours < 24) return `${diffHours} 小时前`;
		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);
		if (date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) return `昨天 ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
		if (diffDays < 7) return `${diffDays} 天前`;
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		if (year === now.getFullYear()) return `${month}-${day}`;
		return `${year}-${month}-${day}`;
	};
	getFileTypeInfo = (type) => FILE_TYPE_MAP[type] ?? {
		label: "未知",
		key: "unknown"
	};
	transformFileInfo = (file) => {
		const typeInfo = getFileTypeInfo(file.type);
		return {
			id: file.file_id,
			name: file.title,
			type: file.type,
			typeLabel: typeInfo.label,
			typeKey: typeInfo.key,
			isFolder: file.is_folder,
			isLink: file.is_link,
			ownerName: file.owner_name ?? "-",
			ownerAvatar: "",
			parentId: file.parent_id,
			accessTimeFormatted: formatRelativeTime(file.access_time),
			accessTimeRaw: String(file.access_time),
			modifiedTimeFormatted: formatRelativeTime(file.last_modify_time),
			modifiedTimeRaw: String(file.last_modify_time),
			createTimeFormatted: formatRelativeTime(file.create_time),
			sizeFormatted: file.is_folder ? "-" : formatFileSize$1(file.size),
			sizeRaw: file.size || 0,
			url: file.url,
			ext: file.ext,
			isTop: file.is_top,
			isStar: file.is_star,
			status: (file.status ?? "normal").toLowerCase()
		};
	};
	transformFileList = (files) => files.map(transformFileInfo);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/api/file-service.ts
var getRawFileList, searchFiles, createFile, getPreviewUrl, deleteFile, renameFile;
var init_file_service = __esmMin((() => {
	init_constants();
	init_file_transformer();
	getRawFileList = async (facade, params) => {
		const result = await facade.getFileList(params);
		return {
			files: result.files,
			hasMore: result.hasMore,
			nextOffset: result.nextOffset
		};
	};
	searchFiles = async (facade, params) => {
		const result = await facade.searchFiles(params);
		return {
			files: transformFileList(result.files.filter((f) => !f.is_folder)),
			total: result.total,
			hasMore: result.hasMore,
			nextOffset: result.nextOffset
		};
	};
	createFile = async (facade, params) => {
		return await facade.createFile(params);
	};
	getPreviewUrl = async (facade, file, type = "openOriginalFile", sessionId) => facade.getPreviewUrl({
		file,
		type,
		...sessionId ? { sessionId } : {}
	});
	deleteFile = async (facade, params) => {
		await facade.deleteFile(params);
	};
	renameFile = async (facade, fileId, title) => {
		await facade.renameFile({
			file_id: fileId,
			title
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/logos/tencent-docs.png
var tencent_docs_default;
var init_tencent_docs = __esmMin((() => {
	tencent_docs_default = "" + new URL("tencent-docs-BprqnGYL.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/auth-guide.tsx
/**
* 把描述文案中的 **粗体** 语法解析为 <strong> 节点。
* 不引入完整 markdown，只支持成对的 `**...**` 粗体，足够描述场景。
*/
function renderEmphasizedText(text) {
	return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
		if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("strong", { children: part.slice(2, -2) }, index);
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_react$13.Fragment, { children: part }, index);
	});
}
/**
* 给 C 端腾讯文档授权页 URL 追加 new_login=1，强制走「新登录」流程
* （不复用浏览器已有登录态，每次都展示扫码 / 登录页）。issue #58599。
* 用 URL 解析避免重复追加或破坏已有 query；解析失败时降级为原样返回。
*/
function withForceNewLogin(rawUrl) {
	try {
		const url = new URL(rawUrl);
		url.searchParams.set("new_login", "1");
		return url.toString();
	} catch {
		return rawUrl;
	}
}
var import_react$13, import_jsx_runtime$10, EyeIcon, PencilIcon, ShieldCheckIcon, BrandConnectArrows, AuthGuide;
var init_auth_guide = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_header_workbuddy();
	init_tencent_docs();
	init_contexts();
	init_useI18n();
	init_telemetry();
	import_jsx_runtime$10 = require_jsx_runtime();
	EyeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		})]
	});
	PencilIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" })]
	});
	ShieldCheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "m9 12 2 2 4-4" })]
	});
	BrandConnectArrows = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		className: "tencent-docs-auth-guide__connect-arrows",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--1",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--2",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--3",
				children: "›"
			})
		]
	});
	AuthGuide = ({ authStatus, error, authorizeUrl, onAuthorize, onRetry, authSource }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const webviewContainerRef = (0, import_react$13.useRef)(null);
		const isAuthorizing = authStatus === "authorizing";
		const isExpired = authStatus === "expired";
		const isFailed = authStatus === "failed";
		(0, import_react$13.useEffect)(() => {
			if (authStatus !== "checking") reportTDocAuthPageShow(adapter);
		}, [adapter, authStatus]);
		(0, import_react$13.useEffect)(() => {
			const container = webviewContainerRef.current;
			if (!container || !isAuthorizing || !authorizeUrl) return;
			const webview = document.createElement("webview");
			webview.setAttribute("src", withForceNewLogin(authorizeUrl));
			webview.className = "tencent-docs-auth-webview";
			container.appendChild(webview);
			return () => {
				if (webview.parentNode === container) container.removeChild(webview);
			};
		}, [isAuthorizing, authorizeUrl]);
		if (isAuthorizing && authorizeUrl) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "tencent-docs-auth-webview-container",
			ref: webviewContainerRef
		}, "tdoc-auth-webview");
		const title = isExpired ? t("tdoc.auth.expiredTitle") : t("tdoc.auth.title");
		const description = isExpired ? t("tdoc.auth.expiredDesc") : isAuthorizing ? t("tdoc.auth.authorizingDesc") : t("tdoc.auth.description");
		const buttonText = isExpired ? t("tdoc.auth.reauthorize") : isAuthorizing ? t("tdoc.auth.authorizing") : isFailed ? t("tdoc.auth.retry") : t("tdoc.auth.authorize");
		const handleClick = () => {
			if (isFailed) onRetry();
			else {
				if (authSource) ({
					library: () => reportTDocAuthFromLibrary(adapter),
					file_picker: () => reportTDocAuthFromFilePicker(adapter),
					file_upload: () => reportTDocAuthFromFileUpload(adapter),
					connector: () => reportTDocAuthFromConnector(adapter)
				})[authSource]?.();
				onAuthorize();
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "tencent-docs-auth-guide",
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "tencent-docs-auth-guide__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "tencent-docs-auth-guide__brands",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--wb",
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
									src: header_workbuddy_default,
									alt: "WorkBuddy",
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(BrandConnectArrows, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--tdoc",
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
									src: tencent_docs_default,
									alt: "Tencent Docs",
									draggable: false
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h2", {
						className: "tencent-docs-auth-guide__title",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
						className: "tencent-docs-auth-guide__desc",
						children: renderEmphasizedText(description)
					}),
					!isAuthorizing && !isFailed && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "tencent-docs-auth-guide__permissions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
							className: "tencent-docs-auth-guide__permissions-title",
							children: t("tdoc.auth.permissionsTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("ul", {
							className: "tencent-docs-auth-guide__permissions-list",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("li", {
								className: "tencent-docs-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
									className: "tencent-docs-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(EyeIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
									className: "tencent-docs-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-label",
										children: t("tdoc.auth.permissionRead")
									}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-desc",
										children: t("tdoc.auth.permissionReadDesc")
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("li", {
								className: "tencent-docs-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
									className: "tencent-docs-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(PencilIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
									className: "tencent-docs-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-label",
										children: t("tdoc.auth.permissionWrite")
									}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "tencent-docs-auth-guide__permission-desc",
										children: t("tdoc.auth.permissionWriteDesc")
									})]
								})]
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "tencent-docs-auth-guide__error",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
						className: `tencent-docs-auth-guide__btn${isAuthorizing ? " tencent-docs-auth-guide__btn--loading" : ""}`,
						onClick: handleClick,
						disabled: isAuthorizing,
						children: [isAuthorizing && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { className: "tencent-docs-auth-guide__spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
							className: "tencent-docs-auth-guide__btn-label",
							children: buttonText
						})]
					}),
					!isAuthorizing && !isFailed && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "tencent-docs-auth-guide__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ShieldCheckIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: t("tdoc.auth.privacyHint") })]
					})
				]
			})
		}, "tdoc-auth-guide");
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-board.png
var tdoc_board_default;
var init_tdoc_board = __esmMin((() => {
	tdoc_board_default = "" + new URL("tdoc-board-DOc21FR6.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-default.svg
var tdoc_default_default;
var init_tdoc_default = __esmMin((() => {
	tdoc_default_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.25%204.34375C3.25%203.48081%203.94956%202.78125%204.8125%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H4.8125C3.94956%2021.2188%203.25%2020.5192%203.25%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H4.8125C4.46732%203.71875%204.1875%203.99857%204.1875%204.34375V19.6562C4.1875%2020.0014%204.46732%2020.2812%204.8125%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM4.8125%202.78125C3.94956%202.78125%203.25%203.48081%203.25%204.34375V19.6562C3.25%2020.5192%203.94956%2021.2188%204.8125%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H4.8125Z'%20fill='%2381868F'%20fill-opacity='0.64'/%3e%3cpath%20d='M12.7422%2010.7607H17.1885V17.5625C17.1885%2017.7695%2017.0205%2017.9374%2016.8135%2017.9375H7.18848C6.98137%2017.9375%206.81348%2017.7696%206.81348%2017.5625V6.4375C6.81348%206.23039%206.98137%206.0625%207.18848%206.0625H12.7422V10.7607ZM17.0752%209.70215C17.1298%209.75544%2017.166%209.82375%2017.1807%209.89746H13.6318V6.34082L17.0752%209.70215Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-doc.png
var tdoc_doc_default;
var init_tdoc_doc = __esmMin((() => {
	tdoc_doc_default = "" + new URL("tdoc-doc-D8iQzLkd.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-flowchart.png
var tdoc_flowchart_default;
var init_tdoc_flowchart = __esmMin((() => {
	tdoc_flowchart_default = "" + new URL("tdoc-flowchart-CbH1QFoM.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-form.png
var tdoc_form_default;
var init_tdoc_form = __esmMin((() => {
	tdoc_form_default = "" + new URL("tdoc-form-CFqj3AV0.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-form-clock.svg
var tdoc_form_clock_default;
var init_tdoc_form_clock = __esmMin((() => {
	tdoc_form_clock_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_596_1832)'%3e%3cg%20clip-path='url(%23clip1_596_1832)'%3e%3cpath%20d='M4.10742%204.09082C4.10742%203.57798%204.52316%203.16225%205.03599%203.16225H15.7533L19.6352%207.07295V19.8318C19.6352%2020.3447%2019.2195%2020.7604%2018.7066%2020.7604H5.03599C4.52316%2020.7604%204.10742%2020.3447%204.10742%2019.8318V4.09082Z'%20fill='url(%23paint0_linear_596_1832)'/%3e%3cg%20filter='url(%23filter0_d_596_1832)'%3e%3cpath%20d='M16.1787%209.95242L10.877%2015.2337L9.65332%2014.0149L9.66797%2013.9993L7.82129%2012.1614L9.02246%2010.9661L10.8682%2012.803L14.9551%208.73367L16.1787%209.95242Z'%20fill='url(%23paint1_linear_596_1832)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_596_1832'%20x='6.53734'%20y='8.0917'%20width='10.9253'%20height='9.0679'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dy='0.641975'/%3e%3cfeGaussianBlur%20stdDeviation='0.641975'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_596_1832'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_596_1832'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_596_1832'%20x1='7.54422'%20y1='-3.12609'%20x2='-5.45062'%20y2='12.8301'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FFB800'/%3e%3cstop%20offset='0.999314'%20stop-color='%23F3A102'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_596_1832'%20x1='12'%20y1='8.73367'%20x2='12'%20y2='15.2337'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='white'/%3e%3cstop%20offset='1'%20stop-color='white'%20stop-opacity='0.8'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_596_1832'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3cclipPath%20id='clip1_596_1832'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-form-sequence.svg
var tdoc_form_sequence_default;
var init_tdoc_form_sequence = __esmMin((() => {
	tdoc_form_sequence_default = "" + new URL("tdoc-form-sequence-DBxPQ7Ey.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-img.png
var tdoc_img_default;
var init_tdoc_img = __esmMin((() => {
	tdoc_img_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAShSURBVHgB7ZvLbxQ3HMe/k5ZCSwtRC0Vqq4pKUPXQXji1FYde2kOrSvTQS/+ItgiQACGFExwSBOF14QJC4hXeEBABRBBBkABReEeAIBIvJQTIC0RArPEvHu/OzO6sPWQ8iYk/yPKM5zcs/s73Z3vYNeBwOBwOh8MxNvGQkOoD7BdWgTn8xsmwCAb0ejnsXfCn15jkvkQCrTjEVvIP+h8Wwzu8at7v3lzd+ArdwJrDrMp2cQjqQ3U9W6obr+2gmkPsKa8q6finmcD3X8IaBl8Bd58AJ67nm3reG8Q3c//yelT3vg8NaNyBL86MacDPM2AXHwJTJ3GRHgO3uoZaKl9NxHRet6lu1U4xydRPYC3jxxWOvUHxwFUkFmis4QRS4ARS4ARSoDWLDYf2h0DDZeD5S3E++1tRbMGoQHtbebkQbiPBmm4C//4KfPQBRj3GUqzpRrE4kvYHwlU2YFSgcjRcgRUYE6h7IHzueeFajkmjHWMCTYmsuBkL11M+hhUYE2j2zNLt0kGzpsMKzAnEp/LffhDHXuD/DMhBX38KzJkFKzA6zf/zoxCDpvXufpFW331hjziE8YWibQvDKO5VQ4ETSIEVAj0bBB71Y0SwQqA9/JVl2X4hVNaMeoHO3wEOXwK6uIOOjMD726gWiNJq82mxdqKy8xzQ0Y1MyVSgpCmy65xwjoTeUkiwLMlMIHLDwjrhAh1OtgON7cI5OVZw0dX7IuWyIjOB6sgNvbxuAa7dLx9LYpKQ8sWWoEMpEv0dWc1qmQhEgjRe9zvJy/rj4dSJQtc7+8QxC7hHQqm6qQmZYFwg6sy6434H/Y5S59cfKx1P7rh6TxwHUytfIOqW2yLdTGNcoB3N3C19BffITl7hImw8FY6luB0thTggcF/kfqpJeNNrI6MC0ROuv1jsAPidP9gmnCCp2l2cUoyVLoQc00xiVKA1RwuzEGLSZe0xMR4NOa2/4BQix0o4yC/y2oE2s6lmTKDtzWKsyfnnwY4H02XgBTBvC7CtOSxejsW7J+8iv6bPMoURgWgs2XYWeSVUHSWRWNyAXOZz5HUazw4qf8jydhgRaMnO4pQIEm2PjY0KjHgX0QPp6kPqpC7Q1rMitaIdyQVKXCeVbstFhEKhDPDZbHUDUidVgegJbj1TIk18W4RWxrINYSfJutwAHeemy/dEuqVJqgItrivdGSIXqIOClZvGdeKiD6K2Id21UWoCbeHO6ewtnTr5aR6F8yIHINIGDSeh2FX0byAXp0UqAtGCjQRikXYWOZaO8ICiMQQxQiFSxzktGLOvVaRbGqQi0KK6ZPFMsy3YHnudhWNl2XACqTDs78XI0p9P5mUSfGv4F+S3qSzQHvxVdvS8XCw02yIqPuPrq4kTMCyGLdA0Ls7yv/HO4r4XU+AEUuAEUuAEUuAEUuAEUqAlEKtAfl/VSP2IIA1o31hStNZB416i4/X4IZEqb3UCrR3AV58BE4z//Co96JsSf68Y0aO7d1Wri7Qzr7qe1Xoequg8sHPPSvjrSa1ubKJNvTX1bBW/4z/YC+N/auf/ob+p1/Zt4SxBIG0L35d0W7jD4XA4HA7HWOUNwEnzT+BSTsEAAAAASUVORK5CYII=";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-markdown.png
var tdoc_markdown_default;
var init_tdoc_markdown = __esmMin((() => {
	tdoc_markdown_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABU1BMVEUAAACgqPCgsPCgsPCgqPCgsPCgqPCgoPCosPCgqPCgrPCgsPCgsPD///+jrPDw8P+krPDQ2PjIyPh4iPCAkPh4hPBwgOh8iPR4gPDQ0PiAiPDg4Ph0gOx4hvDY4Pjg4P/Q2P+wuPh6iPJwgPBvfeiYoPDAyPj4+P+AjPiBj/h5h/F2hO6AiPjI0PiQoPB0guyAjPSAjPZ3he+AjviIkP+4wPhwfOh0hOyImPB8jPSImP98iPJwfumosPjQ0P+wwP+QmPiAkPDAwPhvfelwgOpygOyAjveCkPiEkPqIlPzAyPCgqPiQmPB6iPDY2Pjo6P+wsPh2hPCwuP90hO6EkPyElPygqPCQoPiQoP+IkPh8ivR+jPR3hO94hfB0hPB4iOiCj/mDkPmCkPmEkvyEkPiosPC4wP/g6P91g+6BjviAjffY4P+IkPDg6Phwfuh5hvF6h/H2MqPNAAAADXRSTlMAQKCQgPAwEICQ8BAwCg9OzgAAAm9JREFUeAHt11Vj2zwUgOHih5OUVEbVDthhZqIyM42Zif7/1Y4yu6OCPAa/l4En0pFDI187P7/R8TEPjY+e5oxjj/17svMP9tzEidAkxkHioW2MJ/8+aUABvI48tY4Df50MBb1BUzgw6kM+5EM/HCK6rg+S6IOeRSKRR4hHBhGIiEBhyliu/oFDap1O5yHihSVeRAxSVZWF34cu19bWOjMOVE2viEJWV2Wz7zkR6fBoreZC5eW0KJSxLJXNHzvkknT/3pEL5VJPq2LQNDUzry06R1woKq2srh5e2X8LsXY5JQhVKuarjEU3HGdHSqfv3lmVHIiq10QhTa7cMDMZ6sx7Vqo+Sd9ekaIudLUkDcSgbPa6bJq0lURQXkqVU8vp9DHUVduSLgTZxoGsybJJ+bzJLCuV4KSqDjTNzzQnChna5pwGEoFJU1XNbUgwYBcy4UjFIMUw7HgC1kTjaAd2wvp6rnQMaTK1qCC0tGTH0SaXEi1qWZTorF3iUJKQIKw0Q6cISZ4LhZTFRSUOO7yZlSk1+ah0prZzABGq2Ea2Ym5RxogA9JJDKGo3D2RYVQshHQbFAEIJxSg292TTogkkADV6PYCSzDaasCidQxaHoDhIj/e4LgDFFmK9Ar+CbKNY1B4gDm1ZdAgRClJWmyNCEFRwXt7QyBCCAe8iXkJZMpoabExoaw7EZ1tHQ0g2HQhdVAw4UyGo0VjgEBSsgwPl+aXQR8OSt5TnRAxSFBeCHEjTXAjuzyMhKBmCXnwAkWmIIFfyvyB9yIe+BLoQwAlv0PrJ0P//YbxNPBTEeHLkpCa+1l9R73+Ox7/a3/WvnJ/fG+UwzAbU2vyVAAAAAElFTkSuQmCC";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-mp3.png
var tdoc_mp3_default;
var init_tdoc_mp3 = __esmMin((() => {
	tdoc_mp3_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU8SURBVHgB7ZtBb9xEFMffuEkqskJx1C4SiZS0B6DlUlCKIByafIGqS8/LB4AK0V5zafkEJEIBcavEcibpiXJARVClCKVAOVABErsLLZWaUCdqNsom2enMeMeesTfyeHfGidv5Rc6MHdu77+83b8ZvMgAWi8VisVgszyYIUlJe+mS6hZwScpwhyBG41VpzsLNQmXzvRprrUgn07o+ffowBLkKOId9/9ss337+ker6jemL5p88u510cCvGIi+Wl+SspzlejfGv+ESDk0vo7o2/AmaOvQF5o7Dbh9/V7UKnf9A9g8PoObx2/+volL+naPlCAxh0uzoR7HM6Pnoa8MTZ4hIm07FWpW7jN7cIxcviXpOuUm1jwQYUjkFcG+w4HdWd311W5JrVAzxpWoASsQAlYgRJ4qgTydhqgG6Vufr+pNVaI8ZtQJ+UaK1ehtrlK6g34bf1f8JoNVp956SzMvHwWdLKvAnnbDbZRw6tkWyfG03JtexPurNdZWSdCiCCEOtb9A6Ad4wIt3r9NPOChbzh50vTJ15gIVJxNZlRgFzEYBVXZWr6PMe5YN4Vxgc4vzTKjqSEYIh5Af5GDmAtDDOb1qPEYQiH3FAaDdjIJ0vR7U6OYGKz0t8CePeq4w3Hxb8E52IAybYwLFBjCtrBOm1PM6PAiuS4K0P4b88iYmPqFyj5IC4LxZsXFYrtic6Ml2R/uL8BQ/yCMkxfO8cGjLJhfe/CzfL0hMhGIewA1HbdtQe14M0wMdweo8UVm/LEC2UhJBaHlGNlcUhf54p+bcO2/23vGK50YF0jqdcgPIlq5AwX49swMjBfixqe8eeA9PMbpJpsmhtsNCvk2uP3PwSl3DLqGxyEQvBMhI+Mg40GafoAYoHXBxZF6tTx28y2hjqPdey/35T2bKJIBhYwLxOMPam/MBB12dOj6TWB+oNgO0ny844ukx5zoQNIE2YykqUgQxlAdsbTjoNIA5kfSQhkbMfd4Y/E+uQ3SCJDkMXzI2CsYhIDfHg/lMkiLjxUJm447cnGw/zYMehqvTGYp16AHY/T6pLH0Tsf8CYuNWB+Z5qSDfA70SDg6lHZzGYN4zNH93bm/yOkU/WTkQXLjQj3GiujYJ8wW6CfTfBA37FFzA7rB296AxXvLMPfXN6EovAfLa8JMDs7+Pp3JUKVKEv5zf3wNC/eXobaxGrgJK3ieO0h76PchIwLRJ71AnvR3D++y/ejXTmNG9fEKzP15HcIMZJg2EYM+Cmp60SoQfdJXa9/Dr16N7fOvK07rdJNgDwQIUrPCtI9434Pei9FmIIoT69a5QWlA8nRPUIq9V7S714j2Xkz0Gnlsi+IeleaGnXfD43l5mxeDsvz23uVTRnJV8kphjk04qhWtMSjuNT78WLRHU2IPDxI/gyb/S6OnoTSi/38ntQoUJsR8UOSY2NyUQXFR6VTROSLIVPEETBdfZVNFpjDSzXNBoo5PDTk3MgFTL5wEZTCwicNTw2NQetG/9jV3HLJCr0CReDFEDCuNTjCDqDDdPOlpIsj/pc9hv9AqkEsEmSqeZPGAzntNF1N4ygFFq0BfvZ37lQox7D9xJmAFSsAKlIAVKAErUAJKArUOOcG6qvrGKuSVxs4WpEWpmx/ob1Z3tgY8umZs2fsbrj+4AyeeH4GCsLxov0l6x/th5a6/Vsw/2VNdu6q+4pAuY3TQZXgaaOGPKpMXrqicmio1U741P0u86EPIL3SGca7y1gXlRb2pE3z+svBDJTJ1cxCWhStnT8iJaw7eWaxMfnADLBaLxWKxWCyJPAE+MluuV3rOUwAAAABJRU5ErkJggg==";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-pdf.png
var tdoc_pdf_default;
var init_tdoc_pdf = __esmMin((() => {
	tdoc_pdf_default = "" + new URL("tdoc-pdf-C2yhAP3P.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-sheet.png
var tdoc_sheet_default;
var init_tdoc_sheet = __esmMin((() => {
	tdoc_sheet_default = "" + new URL("tdoc-sheet-jGc8DUfM.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-speech.svg
var tdoc_speech_default;
var init_tdoc_speech = __esmMin((() => {
	tdoc_speech_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.6875%208.3875C6.6875%207.79379%207.16267%207.3125%207.74882%207.3125H19.6887C20.2748%207.3125%2020.75%207.79379%2020.75%208.3875V19.675C20.75%2020.2687%2020.2748%2020.75%2019.6887%2020.75H7.74882C7.16267%2020.75%206.6875%2020.2687%206.6875%2019.675V8.3875Z'%20fill='url(%23paint0_linear_596_1413)'/%3e%3cpath%20d='M17.3125%203.25C18.0029%203.25%2018.5625%203.80964%2018.5625%204.5V19.5H18.5752C18.5679%2019.5511%2018.5625%2019.6031%2018.5625%2019.6562C18.5625%2020.2603%2019.0522%2020.75%2019.6562%2020.75H4.8125C4.12214%2020.75%203.5625%2020.1904%203.5625%2019.5V4.5C3.5625%203.80964%204.12214%203.25%204.8125%203.25H17.3125ZM19.8125%2020.75H19.6562C19.7094%2020.75%2019.7614%2020.7446%2019.8125%2020.7373V20.75Z'%20fill='url(%23paint1_linear_596_1413)'/%3e%3cg%20filter='url(%23filter0_d_596_1413)'%3e%3cpath%20d='M9.94093%2011.3181C9.55621%2011.0351%209.16917%2011.0439%208.82338%2011.2037C8.48318%2011.3608%208.1832%2011.6631%207.9515%2011.9678C7.05037%2013.153%206.38835%2014.9253%205.74902%2017.2008H7.30949C7.40983%2016.8523%208.60332%2012.5235%209.28267%2012.8519C9.42661%2012.9216%209.41901%2013.2506%209.42397%2013.3744C9.45549%2014.1629%209.32009%2015%209.57198%2015.7612C9.83609%2016.559%2010.8257%2016.825%2011.4174%2016.3993C12.009%2015.9735%2012.5245%2013.7447%2012.7623%2013.7113C13.0001%2013.6779%2012.716%2015.9657%2014.11%2016.0538C15.5041%2016.1418%2015.4402%2014.2662%2016.5364%2013.6054L16.2479%2012.9403C15.2135%2013.1036%2014.6834%2014.8012%2014.3022%2014.75C13.921%2014.6989%2014.1449%2013.2263%2013.569%2012.5873C12.9932%2011.9483%2012.0717%2012.2347%2011.6792%2012.8498C11.3223%2013.409%2011.1999%2014.0713%2010.883%2014.646C10.8207%2014.759%2010.7648%2014.7985%2010.7331%2014.6304C10.7084%2014.4992%2010.7009%2014.3259%2010.703%2014.0183L10.703%2014.0139C10.7058%2013.5894%2010.7092%2013.0663%2010.6227%2012.5873C10.5345%2012.0995%2010.3461%2011.6162%209.94093%2011.3181Z'%20fill='url(%23paint2_linear_596_1413)'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_596_1413'%20x='5.3995'%20y='10.3934'%20width='12.8842'%20height='8.20541'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0.699044'%20dy='0.349522'/%3e%3cfeGaussianBlur%20stdDeviation='0.524283'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.0901961%200%200%200%200%200.360784%200%200%200%200%200.921569%200%200%200%200.8%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_596_1413'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_596_1413'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_596_1413'%20x1='20.75'%20y1='10.214'%20x2='18.4467'%20y2='10.214'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%231E6FFF'/%3e%3cstop%20offset='1'%20stop-color='%23144DEB'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_596_1413'%20x1='19.1464'%20y1='-2.44868'%20x2='1.21081'%20y2='19.2317'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2334A4FF'/%3e%3cstop%20offset='0.999235'%20stop-color='%231E6FFF'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint2_linear_596_1413'%20x1='7.8761'%20y1='12.2017'%20x2='11.1747'%20y2='18.1909'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23D3F3FF'/%3e%3cstop%20offset='1'%20stop-color='%23B3D9FF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-video.png
var tdoc_video_default;
var init_tdoc_video = __esmMin((() => {
	tdoc_video_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARYSURBVHgB7ZvLTxNBHMe/C20pYmhrTDQaBMSLHrwYX/g2aozG+IiPxOiBv0D9C/QfMMrRiyjEA2+4CNz05EUDPkg8aDSQqNFDW020LxhnZmfbIQF3ltjZ3TAfWqbdzgb2k+/8dmB3AIPBYDAYDIaViQWPdPWnD0csnCNWTQIhwiLzWRCMXL+UeuZpPy+duwez9yxCbiLEWMS6f+1S4pZq/xrVjk8Gs7fDLodBLHLzcX/6jmp/5QR1D2TStHOSvd6+tQ5tzTGEhUKR4NuPEl69yTmbMqVfpLWjI5Vx2zcCBXpo3YGQ07Qhgu3b4ggTDfSZStbiO5U0+7XENiXpxhbaTrntqzzEHFKJWoSVaKwyYOiJJqmyj2dBKw0jyAUjyAUjyAUjyAUjyAVtgj7NzOHug9+YfFdCmNCaoHR2HkNPcxgayyOTJQgDeocYIWBaJt8W8bD3TyjSpFUQz4yQlM7M8yQFPU16BQk5kFqWooe9ucCmSZ8gYj8Xk8Rq0/B4nj+DliZtgoj4WkoSfVTSNB2cNGku0nCVlPlJ0zRWCEyaNBdpoiTJrk1z6OrLYcrnNGku0ktLWkwWS9DweAEj9OlXmvTPg5aQZH+8UBJxahNNUVdf3pc0aSzSYh4Eb5Lk2jQyXtSeJo0JIpUas0xJ7N3U9Bwe9ed5qwN/ZtIEnoeb3J8laGSC1qaJIk1WddPky0y6fPBSkohHSezBatLjvkJV06R3Js1bUm7lJGEZSWKPNK1NozRJz19Up4D7miCyxEF7kcTaRCPQ3FSdQ1G6cPh/sM9j7IAsy+IHzVp+sLS1+GcWu3jOrg/zll5H5xKc/mD9nP5cloX2HbU43B5FvM7zfRhKaBQEIceRBDslQhK7Ci508D5MEvmHpESiBhdO1aG1qboXMrUJkktQ2YnYuiBJIhmLJkkobN8Zw9H2GOLx6qRGRnOCKqdk7gSOENi3URBUhpFIEpEkJZMWLp6uR+smfZe/fRhijiiREshCIJIkfJGKpH27oji2P64lNTJaBTGc4sxb2Ca4pgVJsuPEvicTtbh8ZhU2N2v/VTmaf6qdmHKRhiNMHm6VIr1/Tx2OH6jXnhoZrYLs5NivnXrkbONDSZRhdovNlbOr0dYchd9or0HiVbkh5fObXYMO7I7jxKEG1PuYGhl/BrZzyrIqhTtF5zVXzzeircX/1Mj4UINs5OF2cE89Th5ZHZjUyGgW5AiwzaxJ0tRcaMSWluDeEOpLglh6gpwaGe0JCkNqZLQJ2rg+ShPTgEN7VwU+NTLaBDEpTFDYMHeYuWAEuWAEuWAEuWAEuWAEuaAkqBRBeV0VuxssrBQLxOsuyvOgz+z+AbagbvZLEe8/5LFubQSxaHgmfB9nis5aMUZGde2qkqCO86lMT3+6k/4RdZu9f/k6hzAzT0inal9PEegZSN+nu9xAeGH/ouu8fjGlvKjX8xjhyzODsyxcuaiIZeGjXpeFGwwGg8FgMKxU/gKgaeFWpylUogAAAABJRU5ErkJggg==";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/tdoc-zip.png
var tdoc_zip_default;
var init_tdoc_zip = __esmMin((() => {
	tdoc_zip_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATBSURBVHgB7ZvPbw5BGMe/UwQRNBEkOJAQIUiICxeOQhr8FxIHBGcObq3Qi3BzceDgZ4qLH+FEECF+JU1UiAQtlaaJttHHzvu+++7s7MzO7PvONLs6H3m7szPPzO48+8zzzMxaIBAIBAKBQGB6wlCQ7lu0kzqwL6q4EBWCgN9sEtePd7GHReoVUtDp23QmutBhVJiow2eP7mZHbOU7bAV77tCJqiuHw/vQ3UcnbeWtLajnNv2KDp08vW0NsGE5KsPYBPD5J/DgXTNreMYYVh3Zz4ZNdWfCAu530FDO6qXA9tWoFnOBxQsiJQ0B/d9rOZ0T87AyOr40VbUeYjGL56OyzJ6VpNlY/YGbKKyg6UZQkIGgIANBQQasopgtd18Dzz/W06SRYdHEgqLCXZuArSuz5aduCrJCO3E6ri+Xx2xdFbW9Ec5wq6BXwI+Relp18zG8kzvWqsvefZVkc9pRMTjiVkHehhi1XNiyaPGFpQVOFWTbmTw5pkm3226rOFUQ7xBjSVoug1Cu60zRTvqwGhGnPogTO9CaQ0XSYZLKua+S/Q1n/bKkbszoGPBpKDlnivZ94VxBInIEqqUbUejaM+CqIBvLXDqQbefRB+DCg0RGjmY+mfJ5kGhhhesisSzeDkPFhljt6Uo95096khq+Rx47Ul0brZEm7Qu3Q0xxx02LIb2MVdOU1m1T155NyLkFiUemkWm1TxndKvyQa7/kPorFf5hi2Aghns+k1yl2Jc/fz+bxiKdoZkqctBcfxJBdL7GGQByB1i1TLzdqClJ1XAiFpMgT78ElXsI8GfLynjzlzCBZkkwr3LLtVnBrQaS4QalXRMlsunD7FmnXeJ0ockjRk1YsKLXNISi6HYXb4N6ChPO8pQBfPsRbIyJLFqSXEfw4Oh79/qSvkzo2/5R8iNUQnAKJPY1pnF98XP/JMf/KwWyTD98D5+5lmkjOBUWV3klnQrsUzWydrbphIamLao7xMlE0lekimm19OUNUfrmH2KThBqWxoXK8rVCdKMYMQyVnWUAG8yFx/aKaSnjSkvMoVjuida48QSqE8TYHBsWLKCp5NCEvE0VrX6kQvPw0KWo6/ALOt9xRzLDfnIGy1ZUGolrXaa6NUjtpKvzA5erKtJynXctSyS2oGWo15cpIpXO6kLY1WL7iqWpOmuWUpzP1eSTl5W1zxMovtw+CZhjEC8vGqe61TY4xqS8iZuWNvzbw8l5M1fFJkvwok6IUf/qZNYggD3VZ5vpwy5RsmOmsSkyLu5ByuawTcfZtNME28frah5lm1lAPNbkcyA//onC5o5hmKREPKd3dU54lsKz1MGn45c6P2sSbk+aknDFlnTNTVYIkpLAK3bYuqcraxM+GWZxkmazUOVm2k4ccAFzjVEFdm4F7b+vbqXkdVI2oVCQTrU33qpqyZVy+awuc4lRBe7fUf/8T4X+5GggKMhAUZCAoyICVgqgDze+qVC/7qgL/bqwoVlFs1jgG/s6uKamz/xvwYgBYsQiY4/3FtTvefGl+K8YZtv121aqL/Mu87j7qjeYdJ/i58OVeJYnmUL22soUmoD19dDaqcQjVhaJ/vcf22H/UW3iGXrLPwq1XXlT/LPxG0c/CA4FAIBAIBKYr/wB1ee5LkWmYXAAAAABJRU5ErkJggg==";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-type-icon.tsx
/**
* 获取腾讯文档类型对应的官方图标 URL。
* 用于将腾讯文档作为 mention pill 插入聊天输入框时提供图标资源。
* 未映射到时返回默认文件图标。
*/
function getTdocIconUrl(type, isFolder) {
	return FILE_TYPE_ICON_MAP[isFolder ? FileType.FOLDER : type] ?? "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.25%204.34375C3.25%203.48081%203.94956%202.78125%204.8125%202.78125H19.1875C20.0504%202.78125%2020.75%203.48081%2020.75%204.34375V19.6562C20.75%2020.5192%2020.0504%2021.2188%2019.1875%2021.2188H4.8125C3.94956%2021.2188%203.25%2020.5192%203.25%2019.6562V4.34375Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19.1875%203.71875H4.8125C4.46732%203.71875%204.1875%203.99857%204.1875%204.34375V19.6562C4.1875%2020.0014%204.46732%2020.2812%204.8125%2020.2812H19.1875C19.5327%2020.2812%2019.8125%2020.0014%2019.8125%2019.6562V4.34375C19.8125%203.99857%2019.5327%203.71875%2019.1875%203.71875ZM4.8125%202.78125C3.94956%202.78125%203.25%203.48081%203.25%204.34375V19.6562C3.25%2020.5192%203.94956%2021.2188%204.8125%2021.2188H19.1875C20.0504%2021.2188%2020.75%2020.5192%2020.75%2019.6562V4.34375C20.75%203.48081%2020.0504%202.78125%2019.1875%202.78125H4.8125Z'%20fill='%2381868F'%20fill-opacity='0.64'/%3e%3cpath%20d='M12.7422%2010.7607H17.1885V17.5625C17.1885%2017.7695%2017.0205%2017.9374%2016.8135%2017.9375H7.18848C6.98137%2017.9375%206.81348%2017.7696%206.81348%2017.5625V6.4375C6.81348%206.23039%206.98137%206.0625%207.18848%206.0625H12.7422V10.7607ZM17.0752%209.70215C17.1298%209.75544%2017.166%209.82375%2017.1807%209.89746H13.6318V6.34082L17.0752%209.70215Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}
var import_jsx_runtime$9, FILE_TYPE_ICON_MAP, DRIVE_EXT_ICON_MAP, FileTypeIcon;
var init_file_type_icon = __esmMin((() => {
	require_react();
	init_tdoc_board();
	init_tdoc_default();
	init_tdoc_doc();
	init_tdoc_flowchart();
	init_tdoc_folder();
	init_tdoc_form();
	init_tdoc_form_clock();
	init_tdoc_form_sequence();
	init_tdoc_img();
	init_tdoc_markdown();
	init_tdoc_mind();
	init_tdoc_mp3();
	init_tdoc_pdf();
	init_tdoc_sheet();
	init_tdoc_slide();
	init_tdoc_smartcanvas();
	init_tdoc_smartsheet();
	init_tdoc_speech();
	init_tdoc_video();
	init_tdoc_zip();
	init_types();
	import_jsx_runtime$9 = require_jsx_runtime();
	FILE_TYPE_ICON_MAP = {
		[FileType.DOC]: tdoc_doc_default,
		[FileType.SHEET]: tdoc_sheet_default,
		[FileType.SLIDE]: tdoc_slide_default,
		[FileType.FORM]: tdoc_form_default,
		[FileType.PDF]: tdoc_pdf_default,
		[FileType.SMART_CANVAS]: tdoc_smartcanvas_default,
		[FileType.SMART_SHEET]: tdoc_smartsheet_default,
		[FileType.MIND]: tdoc_mind_default,
		[FileType.FLOW_CHART]: tdoc_flowchart_default,
		[FileType.BOARD]: tdoc_board_default,
		[FileType.FOLDER]: tdoc_folder_default,
		[FileType.FORM_CLOCK]: tdoc_form_clock_default,
		[FileType.FORM_SEQUENCE]: tdoc_form_sequence_default,
		[FileType.SPEECH]: tdoc_speech_default
	};
	DRIVE_EXT_ICON_MAP = {
		md: tdoc_markdown_default,
		markdown: tdoc_markdown_default,
		doc: tdoc_doc_default,
		docx: tdoc_doc_default,
		rtf: tdoc_doc_default,
		txt: tdoc_doc_default,
		xls: tdoc_sheet_default,
		xlsx: tdoc_sheet_default,
		csv: tdoc_sheet_default,
		ppt: tdoc_slide_default,
		pptx: tdoc_slide_default,
		pdf: tdoc_pdf_default,
		mp4: tdoc_video_default,
		avi: tdoc_video_default,
		mov: tdoc_video_default,
		mkv: tdoc_video_default,
		wmv: tdoc_video_default,
		zip: tdoc_zip_default,
		rar: tdoc_zip_default,
		"7z": tdoc_zip_default,
		tar: tdoc_zip_default,
		gz: tdoc_zip_default,
		jpg: tdoc_img_default,
		jpeg: tdoc_img_default,
		png: tdoc_img_default,
		gif: tdoc_img_default,
		bmp: tdoc_img_default,
		webp: tdoc_img_default,
		svg: tdoc_img_default,
		mp3: tdoc_mp3_default,
		wav: tdoc_mp3_default,
		flac: tdoc_mp3_default,
		aac: tdoc_mp3_default,
		ogg: tdoc_mp3_default
	};
	FileTypeIcon = ({ type, ext = "", isFolder, size = 24 }) => {
		const resolvedType = isFolder ? FileType.FOLDER : type;
		const iconUrl = FILE_TYPE_ICON_MAP[resolvedType] || (resolvedType === FileType.DRIVE ? DRIVE_EXT_ICON_MAP[ext.toLowerCase()] : void 0);
		if (iconUrl) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
			className: "tdoc-file-type-icon",
			style: {
				width: size,
				height: size
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("img", {
				src: iconUrl,
				width: size,
				height: size,
				alt: resolvedType,
				draggable: false,
				style: { display: "block" }
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
			className: "tdoc-file-type-icon",
			style: {
				width: size,
				height: size
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("img", {
				src: tdoc_default_default,
				width: size,
				height: size,
				alt: resolvedType,
				draggable: false,
				style: { display: "block" }
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/assets/empty-no-files.png
var empty_no_files_default;
var init_empty_no_files = __esmMin((() => {
	empty_no_files_default = "" + new URL("empty-no-files-Bg7fPSxV.png", import.meta.url).href;
})), import_jsx_runtime$8, EmptyState;
var init_empty_state = __esmMin((() => {
	require_react();
	init_useI18n();
	init_empty_no_files();
	import_jsx_runtime$8 = require_jsx_runtime();
	EmptyState = ({ type = "no-files", keyword, description, actions }) => {
		const t = useTranslation();
		const hasActions = !!actions;
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: `tdoc-empty-state${hasActions ? " tdoc-empty-state--with-actions" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "tdoc-empty-state__icon",
					children: type === "no-files" ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("img", {
						className: "tdoc-empty-state__icon-img",
						src: empty_no_files_default,
						alt: "",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: "tdoc-empty-state__icon-emoji",
						children: "🔍"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "tdoc-empty-state__title",
					children: type === "no-files" ? t("tdoc.empty.noFiles") : t("tdoc.empty.noResults")
				}),
				type === "no-results" && keyword && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "tdoc-empty-state__desc",
					children: t("tdoc.empty.noResultsFor", { keyword })
				}),
				type === "no-files" && description && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "tdoc-empty-state__desc",
					children: description
				}),
				hasActions && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "tdoc-empty-state__actions",
					children: actions
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/list-header.tsx
/**
* ListHeader - Generic table header row with sortable columns
* No business dependencies — renders column.label directly
*/
function ListHeader({ columns, sortConfig, onSortChange, allChecked, indeterminate, onCheckAll }) {
	const handleSort = (column) => {
		if (!column.sortable || !column.sortKey || !onSortChange) return;
		if (sortConfig?.sortKey === column.sortKey) onSortChange(column.sortKey, !sortConfig.desc);
		else onSortChange(column.sortKey, true);
	};
	const renderSortIcon = (column) => {
		if (!column.sortable || !column.sortKey) return null;
		if (!(sortConfig?.sortKey === column.sortKey)) return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SortArrowBoth, {});
		return sortConfig?.desc ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SortArrowDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SortArrowUp, {});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		className: "tdoc-file-list-header",
		role: "row",
		children: [onCheckAll && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "tdoc-file-list-header__checkbox-cell",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Checkbox, {
				size: "small",
				checked: allChecked,
				ref: (el) => {
					if (el) el.indeterminate = !!indeterminate;
				},
				onChange: onCheckAll
			})
		}), columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: `tdoc-file-list-header__cell${col.sortable ? " tdoc-file-list-header__cell--sortable" : ""}${col.align === "right" ? " tdoc-file-list-header__cell--right" : ""}${col.align === "center" ? " tdoc-file-list-header__cell--center" : ""}`,
			style: { flex: col.flex },
			role: "columnheader",
			onClick: () => handleSort(col),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
				className: "tdoc-file-list-header__label",
				children: col.label
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
				className: "tdoc-file-list-header__sort-icon",
				children: renderSortIcon(col)
			})]
		}, col.key))]
	});
}
var import_jsx_runtime$7, SortArrowBoth, SortArrowDown, SortArrowUp;
var init_list_header = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$7 = require_jsx_runtime();
	SortArrowBoth = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M8 3L11 6.5H5L8 3Z",
			opacity: "0.35"
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M8 13L5 9.5H11L8 13Z",
			opacity: "0.35"
		})]
	});
	SortArrowDown = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M8 3L11 6.5H5L8 3Z",
			opacity: "0.25"
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", { d: "M8 13L5 9.5H11L8 13Z" })]
	});
	SortArrowUp = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", { d: "M8 3L11 6.5H5L8 3Z" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M8 13L5 9.5H11L8 13Z",
			opacity: "0.25"
		})]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/list-row.tsx
/**
* ListRow - Generic row component
* Renders each cell by calling column.render(record, index)
* No business dependencies — fully driven by ColumnDef
*/
function ListRow({ record, columns, index, selected, checked, onCheckChange, checkboxDisabled, checkboxDisabledTooltip, className, onClick }) {
	const handleClick = (0, import_react$9.useCallback)(() => {
		onClick?.(record);
	}, [record, onClick]);
	const handleKeyDown = (0, import_react$9.useCallback)((e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick?.(record);
		}
	}, [record, onClick]);
	const handleCheckboxClick = (0, import_react$9.useCallback)((e) => {
		e.stopPropagation();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		className: `tdoc-file-list-item${selected ? " tdoc-file-list-item--selected" : ""}${checked ? " tdoc-file-list-item--checked" : ""} ${className || ""}`,
		role: "row",
		tabIndex: 0,
		onClick: handleClick,
		onKeyDown: handleKeyDown,
		children: [(onCheckChange || checkboxDisabled) && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "tdoc-file-list-item__checkbox-cell",
			onClick: handleCheckboxClick,
			children: checkboxDisabled && checkboxDisabledTooltip ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Tooltip, {
				content: checkboxDisabledTooltip,
				placement: "bottom",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					className: "tdoc-file-list-item__checkbox-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Checkbox, {
						size: "small",
						checked,
						disabled: checkboxDisabled,
						onChange: onCheckChange
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Checkbox, {
				size: "small",
				checked,
				disabled: checkboxDisabled,
				onChange: onCheckChange
			})
		}), columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: `tdoc-file-list-item__cell${col.align === "right" ? " tdoc-file-list-item__cell--right" : ""}${col.align === "center" ? " tdoc-file-list-item__cell--center" : ""}`,
			style: { flex: col.flex },
			role: "cell",
			children: col.render(record, index)
		}, col.key))]
	});
}
var import_react$9, import_jsx_runtime$6;
var init_list_row = __esmMin((() => {
	init_src();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/list-skeleton.tsx
/**
* ListSkeleton - Generic loading skeleton placeholder
* Renders based on column flex values, no business dependencies
*/
function ListSkeleton({ rows = 8, columns }) {
	const cols = columns || [
		{
			key: "col-1",
			flex: "1 1 auto"
		},
		{
			key: "col-2",
			flex: "0 0 120px"
		},
		{
			key: "col-3",
			flex: "0 0 120px"
		},
		{
			key: "col-4",
			flex: "0 0 150px"
		},
		{
			key: "col-5",
			flex: "0 0 100px"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "tdoc-file-list-skeleton",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "tdoc-file-list-skeleton__header",
			children: cols.map((col) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "tdoc-file-list-skeleton__header-cell",
				style: { flex: col.flex },
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "tdoc-file-list-skeleton__bar tdoc-file-list-skeleton__bar--short" })
			}, col.key))
		}), Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "tdoc-file-list-skeleton__row",
			children: cols.map((col, colIdx) => {
				const barClass = colIdx === 0 ? "tdoc-file-list-skeleton__bar--long" : colIdx === cols.length - 1 ? "tdoc-file-list-skeleton__bar--short" : "tdoc-file-list-skeleton__bar--medium";
				return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "tdoc-file-list-skeleton__cell",
					style: { flex: col.flex },
					children: [colIdx === 0 && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: "tdoc-file-list-skeleton__icon" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { className: `tdoc-file-list-skeleton__bar ${barClass}` })]
				}, col.key);
			})
		}, i))]
	});
}
var import_jsx_runtime$5;
var init_list_skeleton = __esmMin((() => {
	require_react();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/index.tsx
/**
* VirtualList<T> - Generic virtual scrolling list component
*
* Features:
* - Virtual scrolling via react-virtuoso
* - Sortable column headers
* - Infinite scroll (load more on end reached)
* - Loading / Error / Empty states
* - Row selection
*
* Zero business dependencies — all rendering is driven by ColumnDef<T>.render()
*/
function VirtualList({ data, columns, rowKey, loading, loadingMore, error, hasMore, sortKey, sortDesc = true, onSortChange, selectedKey, checkedKeys, isCheckable, showDisabledCheckbox, checkboxDisabledTooltip, onCheckChange, onCheckAll, allChecked, indeterminate, onRowClick, onLoadMore, onRetry, className, rowClassName, renderEmpty, renderError, loadingMoreText = "Loading...", skeletonRows = 8 }) {
	const sortConfig = sortKey ? {
		sortKey,
		desc: sortDesc
	} : void 0;
	const headerRef = (0, import_react$7.useRef)(null);
	const bodyRef = (0, import_react$7.useRef)(null);
	const containerRef = (0, import_react$7.useRef)(null);
	const handleEndReached = (0, import_react$7.useCallback)(() => {
		if (hasMore && !loadingMore) onLoadMore?.();
	}, [
		hasMore,
		loadingMore,
		onLoadMore
	]);
	if (error && data.length === 0) {
		if (renderError) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: `tdoc-file-list ${className || ""}`,
			children: renderError(error, onRetry)
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: `tdoc-file-list ${className || ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "tdoc-file-list__error",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "tdoc-file-list__error-icon",
						children: "⚠️"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "tdoc-file-list__error-message",
						children: error
					}),
					onRetry && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
						className: "tdoc-file-list__error-retry",
						onClick: onRetry,
						children: "↻ Retry"
					})
				]
			})
		});
	}
	if (loading && data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		className: `tdoc-file-list ${className || ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ListSkeleton, {
			rows: skeletonRows,
			columns
		})
	});
	if (!loading && data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: `tdoc-file-list ${className || ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ListHeader, {
			columns,
			sortConfig,
			onSortChange,
			allChecked,
			indeterminate,
			onCheckAll
		}), renderEmpty ? renderEmpty() : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "tdoc-file-list__error",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "tdoc-file-list__error-message",
				children: "No data"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		ref: containerRef,
		className: `tdoc-file-list ${className || ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			ref: headerRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ListHeader, {
				columns,
				sortConfig,
				onSortChange,
				allChecked,
				indeterminate,
				onCheckAll
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			ref: bodyRef,
			className: "tdoc-file-list__body",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Yr, {
				data,
				overscan: 200,
				endReached: handleEndReached,
				itemContent: (index, record) => {
					const key = rowKey(record);
					return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ListRow, {
						record,
						columns,
						index,
						selected: key === selectedKey,
						checked: checkedKeys?.has(key),
						onCheckChange: onCheckChange && (!isCheckable || isCheckable(record)) ? (checked) => onCheckChange(key, checked) : void 0,
						checkboxDisabled: showDisabledCheckbox && isCheckable && !isCheckable(record) ? true : void 0,
						checkboxDisabledTooltip,
						className: rowClassName?.(record),
						onClick: onRowClick
					});
				},
				components: { Footer: () => loadingMore ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "tdoc-file-list__loading-more",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "tdoc-file-list__loading-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: loadingMoreText })]
				}) : null }
			})
		})]
	});
}
var import_react$7, import_jsx_runtime$4;
var init_file_list = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_list_header();
	init_list_row();
	init_list_skeleton();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/utils.ts
/**
* Format file size from bytes string to human-readable string
* e.g. '25600' -> '25 KB', '2048000' -> '2 MB'
*/
function formatFileSize(sizeStr) {
	const size = parseInt(sizeStr, 10);
	if (isNaN(size) || size <= 0) return "-";
	const units = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB"
	];
	let unitIndex = 0;
	let value = size;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex++;
	}
	return `${unitIndex <= 1 ? Math.round(value) : value.toFixed(2).replace(/\.00$/, "")} ${units[unitIndex]}`;
}
/**
* Format time string/number to display format
* Supports ISO strings, millisecond timestamps (string or number)
* - Today: 'HH:mm'
* - This year: 'MM-DD HH:mm'
* - Other: 'YYYY-MM-DD'
*/
function formatTime(timeInput) {
	if (!timeInput && timeInput !== 0) return "-";
	const input = typeof timeInput === "number" ? timeInput : /^\d+$/.test(timeInput) ? Number(timeInput) : timeInput;
	const date = new Date(input);
	if (isNaN(date.getTime())) return "-";
	const now = /* @__PURE__ */ new Date();
	const pad = (n) => String(n).padStart(2, "0");
	if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
	if (date.getFullYear() === now.getFullYear()) return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
/**
* Map FileType to report event type string
* Used for lib_tdoc_file_click data reporting
*/
function getFileTypeReportKey(type, ext) {
	const typeMap = {
		[FileType.DOC]: "word",
		[FileType.SHEET]: "excel",
		[FileType.SLIDE]: "ppt",
		[FileType.FORM]: "form",
		[FileType.PDF]: "pdf",
		[FileType.MIND]: "mind",
		[FileType.FLOW_CHART]: "flow",
		[FileType.BOARD]: "board",
		[FileType.SMART_SHEET]: "smartsheet",
		[FileType.SMART_CANVAS]: "smartcanvas",
		[FileType.FORM_CLOCK]: "form_clock",
		[FileType.FORM_SEQUENCE]: "form_sequence",
		[FileType.SPEECH]: "speech"
	};
	if (typeMap[type]) return typeMap[type];
	if (type === FileType.DRIVE && ext) {
		const lowerExt = ext.toLowerCase();
		const extMap = {
			jpg: "photo",
			jpeg: "photo",
			png: "photo",
			gif: "photo",
			bmp: "photo",
			webp: "photo",
			svg: "photo",
			mp3: "audio",
			wav: "audio",
			flac: "audio",
			aac: "audio",
			ogg: "audio",
			mp4: "vedio",
			avi: "vedio",
			mov: "vedio",
			mkv: "vedio",
			wmv: "vedio",
			zip: "compressed_archive",
			rar: "compressed_archive",
			"7z": "compressed_archive",
			tar: "compressed_archive",
			gz: "compressed_archive",
			md: "md",
			html: "page",
			htm: "page",
			ofd: "OFD"
		};
		if (extMap[lowerExt]) return extMap[lowerExt];
	}
	return "others";
}
/**
* 把腾讯文档个人版选择器返回的 `mimeType`（形如 `application/vnd.tdocs-apps.doc`）
* 解析成内部 `FileType` 枚举，用于决定 DocumentUploadDock 上的图标。
*
* 协议来源：腾讯文档 desktop selector `action=1` 的 payload.files[].mimeType。
* 命中规则：取末段（最后一个 `.` 之后），按子串匹配；匹配不到返回 `null`，
* 由调用方退化到「DRIVE + 文件名扩展名」原有路径。
*
* 兼容点：
* - `smart-canvas` / `smartcanvas` / `smart_canvas` 同义；`smart-sheet` 同理
* - `flow-chart` / `flowchart` 同义
* - `slide` / `ppt` 同义（部分历史链路用 ppt）
* - `pic` / `image` / `img` 不映射到具体腾讯文档类型，让外层走 DRIVE+ext
*/
function resolveTdocFileTypeFromMime(mimeType) {
	if (!mimeType || typeof mimeType !== "string") return null;
	const lower = mimeType.toLowerCase();
	if (lower.includes("folder")) return FileType.FOLDER;
	if (lower.includes("smart-canvas") || lower.includes("smartcanvas") || lower.includes("smart_canvas")) return FileType.SMART_CANVAS;
	if (lower.includes("smart-sheet") || lower.includes("smartsheet") || lower.includes("smart_sheet")) return FileType.SMART_SHEET;
	if (lower.includes("flow-chart") || lower.includes("flowchart") || lower.includes("flow_chart")) return FileType.FLOW_CHART;
	if (lower.includes("form-clock") || lower.includes("formclock")) return FileType.FORM_CLOCK;
	if (lower.includes("form-sequence") || lower.includes("formsequence")) return FileType.FORM_SEQUENCE;
	if (lower.includes("mind")) return FileType.MIND;
	if (lower.includes("board")) return FileType.BOARD;
	if (lower.includes("speech")) return FileType.SPEECH;
	if (lower.includes("form")) return FileType.FORM;
	if (lower.includes("slide") || lower.includes("ppt")) return FileType.SLIDE;
	if (lower.includes("sheet") || lower.includes("excel")) return FileType.SHEET;
	if (lower.includes("pdf")) return FileType.PDF;
	if (lower.includes("doc") || lower.includes("word")) return FileType.DOC;
	return null;
}
/**
* 判断错误是否为 401 未授权（mcp_token 失效）。
*
* 主进程把网关错误以 `[TencentDocs] HTTP 401: ...` 的形式抛出（见
* core-services.ts 的 tdocGatewayPost / checkAuthStatus 等），所以这里
* 只用 message 文本匹配 401 即可，不依赖 status code 字段。
*/
function isUnauthorizedError(err) {
	const message = err instanceof Error ? err.message : String(err ?? "");
	return /\bHTTP\s*401\b/i.test(message) || /\b401\s+Unauthorized\b/i.test(message);
}
/**
* 判断错误是否属于"腾讯文档 OAuth token 需重新授权"语义。
*
* 主进程抛错的 message 有两种形态：
* - `HTTP <status>: {"code":<N>,"msg":"..."}`（非 2xx，直接包 response body）
* - `API error <N>: <msg>`（2xx 但 envelope.code ≠ 0）
*
* 命中即判定为 auth 失效，交由上层跳授权页。
*/
function isTencentDocsAuthError(err) {
	if (isUnauthorizedError(err)) return true;
	const message = err instanceof Error ? err.message : String(err ?? "");
	return AUTH_EXPIRED_CODES.some((code) => {
		return [new RegExp(`"code"\\s*:\\s*${code}\\b`), new RegExp(`\\berror\\s*${code}\\b`, "i")].some((re) => re.test(message));
	});
}
var init_utils = __esmMin((() => {
	init_constants();
	init_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/action-popover/action-popover.less
var init_action_popover$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/action-popover/action-popover.tsx
var import_react$6, import_react_dom, import_jsx_runtime$3, POPOVER_GAP, VIEWPORT_SAFE_MARGIN, ActionPopover;
var init_action_popover$1 = __esmMin((() => {
	init_action_popover$2();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	import_jsx_runtime$3 = require_jsx_runtime();
	POPOVER_GAP = 4;
	VIEWPORT_SAFE_MARGIN = 8;
	ActionPopover = ({ open, anchorPos, items, onItemClick, onClose, triggerRef }) => {
		const menuRef = (0, import_react$6.useRef)(null);
		const [position, setPosition] = (0, import_react$6.useState)(null);
		const handleItemClick = (0, import_react$6.useCallback)((e, key) => {
			e.stopPropagation();
			onItemClick(key);
		}, [onItemClick]);
		(0, import_react$6.useEffect)(() => {
			if (!open) setPosition(null);
		}, [open]);
		(0, import_react$6.useLayoutEffect)(() => {
			if (!open || !menuRef.current) return;
			const menuHeight = menuRef.current.offsetHeight;
			const spaceBelow = window.innerHeight - anchorPos.bottom - VIEWPORT_SAFE_MARGIN;
			const spaceAbove = anchorPos.top - VIEWPORT_SAFE_MARGIN;
			setPosition({
				top: menuHeight > spaceBelow && spaceAbove > spaceBelow ? anchorPos.top - POPOVER_GAP - menuHeight : anchorPos.bottom + POPOVER_GAP,
				left: anchorPos.left
			});
		}, [
			open,
			anchorPos.top,
			anchorPos.bottom,
			anchorPos.left
		]);
		(0, import_react$6.useEffect)(() => {
			if (!open) return;
			const handleClickOutside = (e) => {
				const target = e.target;
				if (menuRef.current && !menuRef.current.contains(target) && (!triggerRef?.current || !triggerRef.current.contains(target))) onClose();
			};
			const handleScroll = () => {
				onClose();
			};
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("scroll", handleScroll, true);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
				document.removeEventListener("scroll", handleScroll, true);
			};
		}, [
			open,
			onClose,
			triggerRef
		]);
		if (!open) return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			ref: menuRef,
			className: "action-popover__menu",
			style: {
				position: "fixed",
				top: position?.top ?? -9999,
				left: position?.left ?? anchorPos.left,
				transform: "translateX(-50%)",
				visibility: position ? "visible" : "hidden"
			},
			children: items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_react$6.Fragment, { children: [item.divider && idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "action-popover__divider" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
				className: `action-popover__item${item.danger ? " action-popover__item--danger" : ""}`,
				onClick: (e) => handleItemClick(e, item.key),
				children: [item.icon && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "action-popover__item-icon",
					children: item.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: item.label })]
			})] }, item.key))
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/action-popover/index.ts
var init_action_popover = __esmMin((() => {
	init_action_popover$1();
})), import_jsx_runtime$2, AddToTaskIcon;
var init_add_to_task_icon = __esmMin((() => {
	require_react();
	import_jsx_runtime$2 = require_jsx_runtime();
	AddToTaskIcon = ({ size = 14, className }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M8.005 13.3201C7.01 13.322 6.029 13.0986 5.133 12.6667L2 13.3334L2.867 10.7334C1.317 8.4421 1.916 5.4854 4.267 3.8174C6.617 2.1501 9.993 2.2867 12.163 4.1374C13.491 5.2707 14.117 6.8307 13.995 8.3641",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M10.667 12.6667H14.667",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M12.667 10.6667V14.6667",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/file-list/tdoc-columns.tsx
/**
* 行级「添加到任务」按钮是否展示，与勾选/批量「添加到任务」的可选规则保持一致。
*
* 单一真源 = `isFileViewModelCheckable`（见 `../../constants.ts`）：
*  - 在线文档品类（DOC/SLIDE/SHEET/FORM/PDF/MIND/SMART_CANVAS/SMART_SHEET/FLOW_CHART/BOARD）
*  - 上传到云盘（type=DRIVE）的本地文件，按 ext 白名单：md/markdown/txt/png/jpg/jpeg
*
* 历史上这里维护过一份独立白名单，导致云盘 txt/md 类文件没有行级按钮，
* 与勾选栏「添加到任务」表现不一致——现在统一走真源避免再次漂移。
*/
function canAddRowToTask(file) {
	return isFileViewModelCheckable({
		type: file.type,
		isFolder: file.is_folder,
		ext: file.ext
	});
}
function stripKnownExtensionSuffix(name, extension) {
	const normalizedExtension = extension?.trim().replace(/^\.+/, "").toLowerCase();
	if (!normalizedExtension) return name;
	const suffix = `.${normalizedExtension}`;
	if (!name.toLowerCase().endsWith(suffix)) return name;
	return name.slice(0, -suffix.length) || name;
}
var import_react$4, import_jsx_runtime$1, MoreActionsButton, InlineRenameInput, useTDocColumns;
var init_tdoc_columns = __esmMin((() => {
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_MoreIcon();
	init_constants();
	init_types();
	init_utils();
	init_action_popover();
	init_add_to_task_icon();
	init_file_type_icon();
	import_jsx_runtime$1 = require_jsx_runtime();
	MoreActionsButton = ({ file, items, onAction, tooltipText }) => {
		const [open, setOpen] = (0, import_react$4.useState)(false);
		const [menuPos, setMenuPos] = (0, import_react$4.useState)({
			top: 0,
			bottom: 0,
			left: 0
		});
		const btnRef = (0, import_react$4.useRef)(null);
		const handleToggle = (0, import_react$4.useCallback)((e) => {
			e.stopPropagation();
			setOpen((prev) => {
				if (!prev && btnRef.current) {
					const rect = btnRef.current.getBoundingClientRect();
					setMenuPos({
						top: rect.top,
						bottom: rect.bottom,
						left: rect.left + rect.width / 2
					});
				}
				return !prev;
			});
		}, []);
		const handleItemClick = (0, import_react$4.useCallback)((actionKey) => {
			setOpen(false);
			onAction(actionKey, file);
		}, [file, onAction]);
		const handleClose = (0, import_react$4.useCallback)(() => {
			setOpen(false);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
			className: "tdoc-more-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				content: open ? void 0 : tooltipText,
				placement: "bottom",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					ref: btnRef,
					className: "tdoc-file-list-item__action-btn",
					onClick: handleToggle,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MoreIcon, {})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ActionPopover, {
				open,
				anchorPos: menuPos,
				items,
				onItemClick: handleItemClick,
				onClose: handleClose,
				triggerRef: btnRef
			})]
		});
	};
	InlineRenameInput = ({ initialName, extension, onConfirm, onCancel }) => {
		const [value, setValue] = (0, import_react$4.useState)(initialName);
		const inputRef = (0, import_react$4.useRef)(null);
		(0, import_react$4.useEffect)(() => {
			const input = inputRef.current;
			if (input) {
				input.focus();
				input.setSelectionRange(0, stripKnownExtensionSuffix(initialName, extension).length);
			}
		}, [initialName, extension]);
		const handleConfirm = (0, import_react$4.useCallback)(() => {
			const newName = stripKnownExtensionSuffix(value.trim(), extension).trim();
			const oldName = stripKnownExtensionSuffix(initialName.trim(), extension).trim();
			if (newName && newName !== oldName) onConfirm(newName);
			else onCancel();
		}, [
			value,
			initialName,
			extension,
			onConfirm,
			onCancel
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
			ref: inputRef,
			className: "tdoc-rename-input",
			value,
			onChange: (e) => setValue(e.target.value),
			onBlur: handleConfirm,
			onKeyDown: (0, import_react$4.useCallback)((e) => {
				e.stopPropagation();
				if (e.key === "Enter") handleConfirm();
				else if (e.key === "Escape") onCancel();
			}, [handleConfirm, onCancel]),
			onClick: (e) => e.stopPropagation()
		});
	};
	useTDocColumns = (options) => {
		const t = useTranslation();
		const defaultActionItems = [
			{
				key: "open",
				label: t("tdoc.action.open")
			},
			{
				key: "copyLink",
				label: t("tdoc.action.copyLink")
			},
			{
				key: "rename",
				label: t("tdoc.action.rename")
			},
			{
				key: "delete",
				label: t("tdoc.action.delete")
			}
		];
		const actionItems = options?.actionItems || defaultActionItems;
		const onAction = options?.onAction || (() => {});
		const renamingFileId = options?.renamingFileId ?? null;
		const onRenameConfirm = options?.onRenameConfirm;
		const onRenameCancel = options?.onRenameCancel;
		const currentOrderBy = options?.orderBy ?? OrderBy.ACCESS_TIME;
		const onOrderByChange = options?.onOrderByChange;
		const currentDesc = options?.desc ?? true;
		const onDescToggle = options?.onDescToggle;
		const hideRowActions = options?.hideRowActions ?? false;
		const onAddToTask = options?.onAddToTask;
		const timeSortLabel = currentOrderBy === OrderBy.MODIFY_TIME ? t("tdoc.modifiedTime") : t("tdoc.recentView");
		const checkIcon = import_react$4.createElement("svg", {
			width: 14,
			height: 14,
			viewBox: "0 0 14 14",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, import_react$4.createElement("path", {
			d: "M2.5 7L5.5 10L11.5 4",
			stroke: "#3370ff",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}));
		const emptyIcon = import_react$4.createElement("span", { style: {
			display: "inline-block",
			width: 14,
			height: 14
		} });
		const timeSortItems = [{
			label: t("tdoc.recentView.myAccessTime"),
			value: OrderBy.ACCESS_TIME,
			selected: currentOrderBy === OrderBy.ACCESS_TIME,
			leftIcon: currentOrderBy === OrderBy.ACCESS_TIME ? checkIcon : emptyIcon
		}, {
			label: t("tdoc.recentView.modifiedTime"),
			value: OrderBy.MODIFY_TIME,
			selected: currentOrderBy === OrderBy.MODIFY_TIME,
			leftIcon: currentOrderBy === OrderBy.MODIFY_TIME ? checkIcon : emptyIcon
		}];
		/**
		* 时间列头：时间字段下拉框 + 升/降序箭头。
		*
		* 「最近」与「我的文档」两个 tab 共用同一套排序控件，保证体验统一
		* （#52385：此前「最近」tab 只有下拉框、缺升降序箭头，与「我的文档」不一致）。
		* 仅默认时间字段不同（最近=ACCESS_TIME，我的文档=MODIFY_TIME），由调用方
		* 通过 orderBy 传入；列头形态与具体 tab 无关。
		*/
		const timeSortHeader = onOrderByChange ? import_react$4.createElement("span", { className: "tdoc-time-sort-header" }, import_react$4.createElement(Dropdown, {
			items: timeSortItems,
			placement: "bottom-start",
			width: "auto",
			minWidth: 160,
			className: "tdoc-time-sort-dropdown",
			onSelectionChange: (values) => {
				if (values[0]) onOrderByChange(values[0]);
			},
			selectedIcon: import_react$4.createElement("span"),
			children: import_react$4.createElement("span", { className: "tdoc-time-sort-dropdown__trigger" }, timeSortLabel, import_react$4.createElement("svg", {
				className: "tdoc-time-sort-dropdown__arrow",
				width: 8,
				height: 8,
				viewBox: "0 0 8 8",
				fill: "currentColor",
				xmlns: "http://www.w3.org/2000/svg"
			}, import_react$4.createElement("path", { d: "M1 2.5L4 6L7 2.5H1Z" })))
		}), import_react$4.createElement("span", {
			className: "tdoc-time-sort-header__arrow" + (currentDesc ? "" : " tdoc-time-sort-header__arrow--asc"),
			onClick: (e) => {
				e.stopPropagation();
				onDescToggle?.();
			}
		}, import_react$4.createElement("svg", {
			width: 10,
			height: 12,
			viewBox: "0 0 10 12",
			fill: "currentColor",
			xmlns: "http://www.w3.org/2000/svg"
		}, import_react$4.createElement("path", { d: "M4.25 0.75H5.75V7.25H8.5L5 11.25L1.5 7.25H4.25V0.75Z" })))) : t("tdoc.recentView");
		return [
			{
				key: "name",
				label: t("tdoc.name"),
				flex: "1 1 auto",
				sortable: false,
				sortKey: OrderBy.FILE_NAME,
				render: (file) => {
					const isRenaming = renamingFileId === file.file_id;
					return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "tdoc-file-list-item__name-cell",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FileTypeIcon, {
							type: file.type,
							ext: file.ext,
							isFolder: file.is_folder,
							size: 24
						}), isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InlineRenameInput, {
							initialName: file.title,
							extension: file.is_folder ? "" : file.ext,
							onConfirm: (newName) => onRenameConfirm?.(file.file_id, newName),
							onCancel: () => onRenameCancel?.()
						}, file.file_id) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "tdoc-file-list-item__name",
								title: file.title,
								children: file.title
							}),
							!file.is_folder && onAddToTask && canAddRowToTask(file) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
								content: t("tdoc.selection.addToTask"),
								placement: "bottom",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									className: "tdoc-file-list-item__add-task-btn",
									onClick: (e) => {
										e.stopPropagation();
										onAddToTask(file);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddToTaskIcon, { size: 14 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "tdoc-file-list-item__actions",
								children: !hideRowActions && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MoreActionsButton, {
									file,
									items: file.is_folder ? actionItems.filter((item) => item.key !== "copyLink") : actionItems,
									onAction,
									tooltipText: t("tdoc.action.more")
								})
							})
						] })]
					});
				}
			},
			{
				key: "owner",
				label: t("tdoc.owner"),
				flex: "0 0 140px",
				render: (file) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tdoc-file-list-item__text",
					title: file.owner_name,
					children: file.owner_name || "-"
				})
			},
			{
				key: "recentView",
				label: timeSortHeader,
				flex: "0 0 150px",
				sortable: false,
				sortKey: currentOrderBy,
				render: (file) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tdoc-file-list-item__text",
					children: currentOrderBy === OrderBy.MODIFY_TIME ? formatTime(file.last_modify_time) : formatTime(file.access_time || file.last_modify_time)
				})
			},
			{
				key: "size",
				label: t("tdoc.size"),
				flex: "0 0 120px",
				render: (file) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "tdoc-file-list-item__text",
					children: file.is_folder ? "-" : formatFileSize(String(file.size))
				})
			}
		];
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/folder-breadcrumb.tsx
var import_react$3, import_jsx_runtime, FolderBreadcrumb;
var init_folder_breadcrumb = __esmMin((() => {
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	FolderBreadcrumb = ({ path, onNavigate }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, {
			className: "tdoc-folder-breadcrumb",
			items: (0, import_react$3.useMemo)(() => {
				return [{
					id: "__tdoc_root__",
					label: t("tdoc.breadcrumb.root"),
					onClick: path.length > 0 && onNavigate ? () => onNavigate("root") : void 0
				}, ...path.map((item, index) => ({
					id: item.id,
					label: item.name,
					onClick: index < path.length - 1 && onNavigate ? () => onNavigate(item.id) : void 0
				}))];
			}, [
				path,
				onNavigate,
				t
			]),
			ariaLabel: t("tdoc.breadcrumb.root"),
			size: "sm"
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-file-list.ts
var import_react$2, PAGE_SIZE, useFileList;
var init_use_file_list = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_services();
	init_file_service();
	init_store();
	init_types();
	init_utils();
	PAGE_SIZE = 20;
	useFileList = ({ listType }) => {
		const tencentDocs = useTencentDocsFacade();
		const [files, setFiles] = (0, import_react$2.useState)([]);
		const [loading, setLoading] = (0, import_react$2.useState)(false);
		const [loadingMore, setLoadingMore] = (0, import_react$2.useState)(false);
		const [error, setError] = (0, import_react$2.useState)(null);
		const [hasMore, setHasMore] = (0, import_react$2.useState)(false);
		const [orderBy, setOrderBy] = (0, import_react$2.useState)(listType === ListType.RECENT ? OrderBy.ACCESS_TIME : OrderBy.MODIFY_TIME);
		const [desc, setDesc] = (0, import_react$2.useState)(true);
		const [currentFolderId, setCurrentFolderId] = (0, import_react$2.useState)(null);
		const [folderPath, setFolderPath] = (0, import_react$2.useState)([]);
		const nextOffsetRef = (0, import_react$2.useRef)(0);
		const requestIdRef = (0, import_react$2.useRef)(0);
		const loadingMoreRef = (0, import_react$2.useRef)(false);
		/** Load initial file list (reset pagination) */
		const loadFiles = (0, import_react$2.useCallback)(async () => {
			const currentRequestId = ++requestIdRef.current;
			setLoading(true);
			setError(null);
			nextOffsetRef.current = 0;
			try {
				const result = await getRawFileList(tencentDocs, {
					list_type: listType,
					offset: 0,
					limit: PAGE_SIZE,
					order_by: orderBy,
					desc,
					parent_id: currentFolderId || void 0
				});
				if (currentRequestId !== requestIdRef.current) return;
				setFiles(result.files);
				setHasMore(result.hasMore);
				nextOffsetRef.current = result.nextOffset;
			} catch (err) {
				console.error("[TencentDocsDebug][useFileList.loadFiles:error]", {
					requestId: currentRequestId,
					error: err instanceof Error ? err.message : String(err)
				});
				if (currentRequestId !== requestIdRef.current) return;
				if (isUnauthorizedError(err)) {
					tencentDocsStore.getState().markExpired();
					setFiles([]);
					return;
				}
				setError(err instanceof Error ? err.message : "Failed to load file list");
				setFiles([]);
			} finally {
				if (currentRequestId === requestIdRef.current) setLoading(false);
			}
		}, [
			tencentDocs,
			listType,
			orderBy,
			desc,
			currentFolderId
		]);
		/** Load more files (append to existing list) */
		const loadMore = (0, import_react$2.useCallback)(async () => {
			if (loadingMoreRef.current || !hasMore) return;
			loadingMoreRef.current = true;
			setLoadingMore(true);
			try {
				const result = await getRawFileList(tencentDocs, {
					list_type: listType,
					offset: nextOffsetRef.current,
					limit: PAGE_SIZE,
					order_by: orderBy,
					desc,
					parent_id: currentFolderId || void 0
				});
				setFiles((prev) => [...prev, ...result.files]);
				setHasMore(result.hasMore);
				nextOffsetRef.current = result.nextOffset;
			} catch (err) {
				if (isUnauthorizedError(err)) tencentDocsStore.getState().markExpired();
				else setError(err instanceof Error ? err.message : "Failed to load more files");
			} finally {
				setLoadingMore(false);
				loadingMoreRef.current = false;
			}
		}, [
			tencentDocs,
			listType,
			orderBy,
			desc,
			currentFolderId,
			hasMore
		]);
		/** Enter a subfolder (MY_DOC tab only) */
		const enterFolder = (0, import_react$2.useCallback)((folderId, folderName) => {
			setCurrentFolderId((prev) => prev === folderId ? prev : folderId);
			setFolderPath((prev) => {
				const last = prev[prev.length - 1];
				if (last && last.id === folderId) return prev;
				return [...prev, {
					id: folderId,
					name: folderName
				}];
			});
		}, []);
		/** Navigate to a specific folder in the breadcrumb path */
		const navigateToFolder = (0, import_react$2.useCallback)((folderId) => {
			if (folderId === "root" || !folderId) {
				setCurrentFolderId(null);
				setFolderPath([]);
			} else {
				setFolderPath((prev) => {
					const index = prev.findIndex((item) => item.id === folderId);
					if (index >= 0) return prev.slice(0, index + 1);
					return prev;
				});
				setCurrentFolderId(folderId);
			}
		}, []);
		(0, import_react$2.useEffect)(() => {
			loadFiles();
		}, [loadFiles]);
		(0, import_react$2.useEffect)(() => {
			setCurrentFolderId(null);
			setFolderPath([]);
			setOrderBy(listType === ListType.RECENT ? OrderBy.ACCESS_TIME : OrderBy.MODIFY_TIME);
		}, [listType]);
		return {
			files,
			loading,
			loadingMore,
			error,
			hasMore,
			orderBy,
			desc,
			currentFolderId,
			folderPath,
			loadFiles,
			loadMore,
			setOrderBy,
			setDesc,
			toggleDesc: (0, import_react$2.useCallback)(() => {
				setDesc((prev) => !prev);
			}, []),
			enterFolder,
			navigateToFolder
		};
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-file-search.ts
var import_react$1, SEARCH_PAGE_SIZE, SEARCH_TIMEOUT_MS, SEARCH_DEBOUNCE_MS, useFileSearch;
var init_use_file_search = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_services();
	init_file_service();
	init_store();
	init_types();
	init_utils();
	SEARCH_PAGE_SIZE = 20;
	SEARCH_TIMEOUT_MS = 15e3;
	SEARCH_DEBOUNCE_MS = 300;
	useFileSearch = () => {
		const tencentDocs = useTencentDocsFacade();
		const [keyword, setKeyword] = (0, import_react$1.useState)("");
		const [field, setField] = (0, import_react$1.useState)(SearchField.FILE_NAME);
		const [results, setResults] = (0, import_react$1.useState)([]);
		const [total, setTotal] = (0, import_react$1.useState)(0);
		const [totalByField, setTotalByField] = (0, import_react$1.useState)({});
		const [loading, setLoading] = (0, import_react$1.useState)(false);
		const [error, setError] = (0, import_react$1.useState)(null);
		const [isTimeout, setIsTimeout] = (0, import_react$1.useState)(false);
		const [hasMore, setHasMore] = (0, import_react$1.useState)(false);
		const abortControllerRef = (0, import_react$1.useRef)(null);
		const debounceTimerRef = (0, import_react$1.useRef)(null);
		const offsetRef = (0, import_react$1.useRef)(0);
		const fieldRef = (0, import_react$1.useRef)(field);
		const keywordRef = (0, import_react$1.useRef)(keyword);
		(0, import_react$1.useEffect)(() => {
			fieldRef.current = field;
		}, [field]);
		(0, import_react$1.useEffect)(() => {
			keywordRef.current = keyword;
		}, [keyword]);
		const cancelPending = (0, import_react$1.useCallback)(() => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
				abortControllerRef.current = null;
			}
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
				debounceTimerRef.current = null;
			}
		}, []);
		const buildRequest = (0, import_react$1.useCallback)((kw, searchField, offset) => {
			return {
				keyword: kw,
				field: searchField,
				offset,
				limit: SEARCH_PAGE_SIZE
			};
		}, []);
		const executeSearch = (0, import_react$1.useCallback)(async (kw, searchField, offset, append) => {
			cancelPending();
			const controller = new AbortController();
			abortControllerRef.current = controller;
			if (!append) {
				setResults([]);
				setTotal(0);
				setHasMore(false);
			}
			setLoading(true);
			setError(null);
			setIsTimeout(false);
			const timeoutId = setTimeout(() => {
				controller.abort();
				setIsTimeout(true);
				setLoading(false);
				setError(null);
			}, SEARCH_TIMEOUT_MS);
			try {
				const response = await searchFiles(tencentDocs, buildRequest(kw, searchField, offset));
				clearTimeout(timeoutId);
				if (controller.signal.aborted) return;
				if (append) setResults((prev) => [...prev, ...response.files]);
				else setResults(response.files);
				setTotal(response.total);
				setTotalByField((prev) => ({
					...prev,
					[searchField]: response.total
				}));
				offsetRef.current = response.nextOffset;
				setHasMore(response.hasMore);
				setLoading(false);
			} catch (err) {
				clearTimeout(timeoutId);
				if (controller.signal.aborted) return;
				if (isUnauthorizedError(err)) {
					tencentDocsStore.getState().markExpired();
					setLoading(false);
					return;
				}
				setError(err instanceof Error ? err.message : String(err));
				setLoading(false);
			}
		}, [
			cancelPending,
			buildRequest,
			tencentDocs
		]);
		const search = (0, import_react$1.useCallback)((kw, searchField) => {
			const trimmed = kw.trim();
			if (!trimmed) return;
			setKeyword(trimmed);
			if (searchField !== void 0) setField(searchField);
			const actualField = searchField ?? fieldRef.current;
			setTotalByField({});
			cancelPending();
			offsetRef.current = 0;
			debounceTimerRef.current = setTimeout(() => {
				executeSearch(trimmed, actualField, 0, false);
			}, SEARCH_DEBOUNCE_MS);
		}, [cancelPending, executeSearch]);
		const loadMore = (0, import_react$1.useCallback)(() => {
			if (loading || !hasMore) return;
			executeSearch(keywordRef.current, fieldRef.current, offsetRef.current, true);
		}, [
			loading,
			hasMore,
			executeSearch
		]);
		const reset = (0, import_react$1.useCallback)(() => {
			cancelPending();
			setKeyword("");
			setField(SearchField.FILE_NAME);
			setResults([]);
			setTotal(0);
			setTotalByField({});
			setLoading(false);
			setError(null);
			setIsTimeout(false);
			setHasMore(false);
			offsetRef.current = 0;
		}, [cancelPending]);
		(0, import_react$1.useEffect)(() => {
			if (keywordRef.current.trim()) {
				cancelPending();
				offsetRef.current = 0;
				executeSearch(keywordRef.current, field, 0, false);
			}
		}, [field]);
		(0, import_react$1.useEffect)(() => () => cancelPending(), [cancelPending]);
		return {
			keyword,
			setKeyword,
			field,
			setField,
			results,
			total,
			totalByField,
			loading,
			error,
			isTimeout,
			hasMore,
			search,
			loadMore,
			reset
		};
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tdoc-check-auth-gate.ts
/**
* 腾讯文档授权状态检查入口分流。
*
* OA / 企业账号的授权走 OneID 通道，C 端 OAuth status 接口会固定返回
* not_connected；若继续调用 store.checkAuthStatus，会触发连接器自动 unbind。
* 因此企业已开通时只把本地 store 推到 connected，其余 OneID 态交给调用方渲染。
*/
function useTdocCheckAuthGate() {
	const isEnterpriseEdition = useIsEnterpriseEdition();
	const oneidStatus = useOneidAppStatus("doc");
	return (0, import_react.useCallback)(() => {
		if (!isEnterpriseEdition) {
			tencentDocsStore.getState().checkAuthStatus();
			return;
		}
		if (oneidStatus.status !== "enabled") return;
		tencentDocsStore.setState({
			authStatus: "connected",
			authError: null,
			authorizeUrl: null
		});
	}, [isEnterpriseEdition, oneidStatus.status]);
}
var import_react;
var init_use_tdoc_check_auth_gate = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_store();
}));
//#endregion
export { init_auth_guide as A, useTencentDocsStore as B, init_list_skeleton as C, getTdocIconUrl as D, FileTypeIcon as E, getPreviewUrl as F, init_constants as G, ROOT_FOLDER_ID as H, init_file_service as I, FileType as J, isFileViewModelCheckable as K, renameFile as L, tencent_docs_default as M, createFile as N, init_file_type_icon as O, deleteFile as P, init_store as R, ListSkeleton as S, init_empty_state as T, SELECTABLE_FILE_TYPES as U, CREATE_DOC_OPTIONS as V, TDOCS_CONNECTOR_NAME as W, SearchField as X, ListType as Y, init_types as Z, init_utils as _, init_use_file_list as a, VirtualList as b, init_folder_breadcrumb as c, AddToTaskIcon as d, init_add_to_task_icon as f, getFileTypeReportKey as g, formatTime as h, useFileSearch as i, init_tencent_docs as j, AuthGuide as k, init_tdoc_columns as l, ActionPopover as m, useTdocCheckAuthGate as n, useFileList as o, init_action_popover as p, FileDeleteType as q, init_use_file_search as r, FolderBreadcrumb as s, init_use_tdoc_check_auth_gate as t, useTDocColumns as u, isTencentDocsAuthError as v, EmptyState as w, init_file_list as x, resolveTdocFileTypeFromMime as y, tencentDocsStore as z };
