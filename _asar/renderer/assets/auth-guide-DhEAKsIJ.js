import { n as __esmMin, r as __exportAll, s as __toESM } from "./chunk-BRZcfu7K.js";
import { _u as invalidateOneidApplications, dd as init_use_is_enterprise_admin, fu as init_use_oneid_app_status, gu as init_use_oneid_applications, pd as useIsEnterpriseEdition, pu as useOneidAppStatus } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_zustand } from "./zustand-BGHu9tpa.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
import { t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as init_telemetry_helpers, s as reportLibraryAuthConnectorSuccess, x as init_store$1, y as connectorStore } from "./ima-auth-store-Cq8i4JCG.js";
import { n as init_header_workbuddy, t as header_workbuddy_default } from "./header-workbuddy-UO2zaYBA.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/lexiang-auth-constants.ts
var AUTH_POLL_INTERVAL, LEXIANG_CONNECTOR_ID, LEXIANG_OAUTH_NAME;
var init_lexiang_auth_constants = __esmMin((() => {
	AUTH_POLL_INTERVAL = 2e3;
	LEXIANG_CONNECTOR_ID = "lexiang";
	LEXIANG_OAUTH_NAME = "lexiang-ol";
}));
//#endregion
//#region ../../packages/workbuddy-server/src/tencent-lexiang/origins.ts
function deriveLexiangVpcWebOriginFromEndpoint(endpoint) {
	const rawEndpoint = endpoint?.trim();
	if (!rawEndpoint) return;
	try {
		const url = new URL(rawEndpoint);
		if (url.protocol !== "https:") return;
		const host = url.hostname;
		if (!isVpcEndpointHost(host)) return;
		const labels = host.split(".");
		if (!labels[0]) return;
		if (!labels[0].endsWith("-lx")) labels[0] = `${labels[0]}-lx`;
		const port = url.port ? `:${url.port}` : "";
		return `${url.protocol}//${labels.join(".")}${port}`;
	} catch {
		return;
	}
}
/**
* 判断 host 是否符合 VPC endpoint 形态（≥4 段 + 命中后缀白名单）。
*
* 后缀白名单覆盖线上 VPC `.copilot.qq.com` 与预发 VPC `.copilot-staging.qq.com`。
* 供 `deriveLexiangVpcWebOriginFromEndpoint` 与 `deriveLexiangWebOriginForVpcAccount`
* 做防御性校验，避免对 SaaS 域名（如 `copilot.tencent.com`）派生不存在的 `-lx` 子域名。
*/
function isVpcEndpointHost(host) {
	if (!host || host === "localhost" || host.includes(":") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return false;
	return host.split(".").length >= 4 && LEXIANG_VPC_ENDPOINT_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
}
var LEXIANG_WEB_ORIGIN_PROD, LEXIANG_WEB_ORIGIN_STAGING, LEXIANG_VPC_ENDPOINT_HOST_SUFFIXES;
var init_origins = __esmMin((() => {
	LEXIANG_WEB_ORIGIN_PROD = "https://lexiangla.com";
	LEXIANG_WEB_ORIGIN_STAGING = "https://lexiangla.net";
	LEXIANG_VPC_ENDPOINT_HOST_SUFFIXES = [".copilot.qq.com", ".copilot-staging.qq.com"];
})), buildKbHomeUrl, LEXIANG_PAGE_PREVIEW_UI_QUERY, LEXIANG_TRUSTED_ORIGINS, LEXIANG_LIBRARY_EMBED_UI_QUERY, LEXIANG_IFRAME_SANDBOX, MB, GB, LEXIANG_UPLOAD_RULES, LEXIANG_SUPPORTED_EXTENSIONS;
var init_constants = __esmMin((() => {
	init_origins();
	buildKbHomeUrl = (kbId) => `https://lexiang.tencent.com/kb/${kbId}`;
	LEXIANG_PAGE_PREVIEW_UI_QUERY = {
		ui_space_sidebar: "0",
		ui_ai_panel: "0",
		ui_page_action: "0"
	};
	LEXIANG_TRUSTED_ORIGINS = [
		LEXIANG_WEB_ORIGIN_PROD,
		LEXIANG_WEB_ORIGIN_STAGING,
		"https://lexiang.tencent.com"
	];
	LEXIANG_LIBRARY_EMBED_UI_QUERY = { workbuddy_embed: "1" };
	LEXIANG_IFRAME_SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads";
	MB = 1024 * 1024;
	GB = 1024 * MB;
	LEXIANG_UPLOAD_RULES = [
		{
			categoryKey: "image",
			extensions: [
				"jpg",
				"jpeg",
				"png",
				"bmp",
				"webp",
				"gif",
				"tiff"
			],
			maxBytes: 20 * MB
		},
		{
			categoryKey: "audio",
			extensions: [
				"mp3",
				"m4a",
				"flac",
				"ogg",
				"wav",
				"aac",
				"amr"
			],
			maxBytes: 10 * GB
		},
		{
			categoryKey: "video",
			extensions: [
				"wmv",
				"rm",
				"mov",
				"mpeg",
				"mp4",
				"3gp",
				"flv",
				"avi",
				"rmvb",
				"ts",
				"asf",
				"mpg",
				"webm",
				"mkv",
				"m3u8",
				"wm",
				"asx",
				"ram",
				"mpe",
				"vob",
				"dat",
				"mp4v",
				"m4v",
				"f4v",
				"mxf",
				"qt"
			],
			maxBytes: 2 * GB
		},
		{
			categoryKey: "document",
			extensions: [
				"doc",
				"dot",
				"wps",
				"wpt",
				"docx",
				"dotx",
				"docm",
				"dotm"
			],
			maxBytes: 2 * GB
		},
		{
			categoryKey: "spreadsheet",
			extensions: [
				"xls",
				"xlt",
				"et",
				"ett",
				"xlsx",
				"xltx",
				"csv",
				"xlsb",
				"xlsm",
				"xltm",
				"ets"
			],
			maxBytes: 2 * GB
		},
		{
			categoryKey: "presentation",
			extensions: [
				"pptx",
				"ppt",
				"pot",
				"potx",
				"pps",
				"ppsx",
				"dps",
				"dpt",
				"pptm",
				"potm",
				"ppsm"
			],
			maxBytes: 2 * GB
		},
		{
			categoryKey: "pdf",
			extensions: ["pdf"],
			maxBytes: 2 * GB
		},
		{
			categoryKey: "ofd",
			extensions: ["ofd"],
			maxBytes: 2 * GB
		},
		{
			categoryKey: "text",
			extensions: ["txt", "md"],
			maxBytes: 2 * GB
		}
	];
	LEXIANG_SUPPORTED_EXTENSIONS = Array.from(new Set(LEXIANG_UPLOAD_RULES.flatMap((r) => r.extensions)));
	new Map(LEXIANG_UPLOAD_RULES.flatMap((rule) => rule.extensions.map((ext) => [ext, rule])));
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/store.ts
/** 安全访问 sessionStorage（webview 中通常可用，但仍做防御）。 */
function getSessionStorage() {
	try {
		if (typeof window === "undefined" || !window.sessionStorage) return null;
		return window.sessionStorage;
	} catch {
		return null;
	}
}
/** 读取缓存的"上次选中的知识库"。 */
function readLastSelectedKbFromCache() {
	const storage = getSessionStorage();
	if (!storage) return null;
	try {
		const raw = storage.getItem(LAST_SELECTED_KB_STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed.id !== "string" || typeof parsed.name !== "string") return null;
		return {
			id: parsed.id,
			name: parsed.name,
			avatar: parsed.avatar,
			home_url: parsed.home_url ?? buildKbHomeUrl(parsed.id),
			rootEntryId: parsed.rootEntryId,
			teamId: parsed.teamId
		};
	} catch {
		return null;
	}
}
/** 写入 / 清除"上次选中的知识库"缓存。 */
function writeLastSelectedKbToCache(kb) {
	const storage = getSessionStorage();
	if (!storage) return;
	try {
		if (!kb) {
			storage.removeItem(LAST_SELECTED_KB_STORAGE_KEY);
			return;
		}
		storage.setItem(LAST_SELECTED_KB_STORAGE_KEY, JSON.stringify(kb));
	} catch {}
}
function readLastViewFromCache() {
	const storage = getSessionStorage();
	if (!storage) return null;
	try {
		const raw = storage.getItem(LAST_VIEW_STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed?.pageView === "space-list" && parsed.team?.id) return {
			pageView: "space-list",
			team: parsed.team
		};
		if (parsed?.pageView === "space-detail" && parsed.kb?.id) {
			const team = parsed.team?.id ? parsed.team : void 0;
			return {
				pageView: "space-detail",
				kb: parsed.kb,
				team
			};
		}
		return null;
	} catch {
		return null;
	}
}
function writeLastViewToCache(view) {
	const storage = getSessionStorage();
	if (!storage) return;
	try {
		if (!view) {
			storage.removeItem(LAST_VIEW_STORAGE_KEY);
			return;
		}
		storage.setItem(LAST_VIEW_STORAGE_KEY, JSON.stringify(view));
	} catch {}
}
function clearLastViewCache() {
	writeLastViewToCache(null);
}
/**
* 清除历史版本残留的多账号 / 匿名段缓存条目。模块加载时执行一次。
*
* 旧版按 `lexiang.lastSelectedKb:<openId>` / `lexiang.lastSelectedKb:__anon__` 写入，
* 升级到单 key 方案后这些条目不会再被读取，但残留在 sessionStorage 里占空间。
* 一次性扫描带前缀 `lexiang.lastSelectedKb:` 的 key 全部移除即可。
*/
function purgeLegacyCacheEntries() {
	const storage = getSessionStorage();
	if (!storage) return;
	try {
		const toRemove = [];
		for (let i = 0; i < storage.length; i += 1) {
			const k = storage.key(i);
			if (k && k.startsWith(LEGACY_PER_ACCOUNT_KEY_PREFIX)) toRemove.push(k);
		}
		for (const k of toRemove) storage.removeItem(k);
	} catch {}
}
/**
* 清除"上次选中的知识库"sessionStorage 缓存。
*
* 调用时机：账号切换（uid 变化）/ 解绑授权 / 连接器解绑 / 授权过期。
*/
function clearLastSelectedKbCache() {
	writeLastSelectedKbToCache(null);
}
/**
* React hook：选择 store 中的某个片段。
*
* @example
* ```tsx
* const viewMode = useTencentLexiangStore(s => s.viewMode);
* const setViewMode = useTencentLexiangStore(s => s.setViewMode);
* ```
*/
function useTencentLexiangStore(selector) {
	return (0, import_zustand$1.useStore)(tencentLexiangStore, selector);
}
var import_zustand$1, LAST_SELECTED_KB_STORAGE_KEY, LEGACY_PER_ACCOUNT_KEY_PREFIX, LAST_VIEW_STORAGE_KEY, tencentLexiangStore;
var init_store = __esmMin((() => {
	import_zustand$1 = require_zustand();
	init_vanilla();
	init_constants();
	LAST_SELECTED_KB_STORAGE_KEY = "lexiang.lastSelectedKb";
	LEGACY_PER_ACCOUNT_KEY_PREFIX = `${LAST_SELECTED_KB_STORAGE_KEY}:`;
	LAST_VIEW_STORAGE_KEY = "lexiang.lastView";
	purgeLegacyCacheEntries();
	tencentLexiangStore = createStore()((set) => ({
		pageView: "space-detail",
		setPageView: (view) => set({ pageView: view }),
		goToSpaceList: (team) => set((state) => {
			const resolvedTeam = team ?? state.currentTeam;
			if (resolvedTeam) writeLastViewToCache({
				pageView: "space-list",
				team: resolvedTeam
			});
			return {
				pageView: "space-list",
				currentTeam: resolvedTeam
			};
		}),
		goToSpaceDetail: (kb) => {
			writeLastSelectedKbToCache(kb);
			set((state) => {
				writeLastViewToCache({
					pageView: "space-detail",
					kb,
					team: state.currentTeam ?? void 0
				});
				return {
					pageView: "space-detail",
					currentKnowledgeBase: kb
				};
			});
		},
		currentTeam: null,
		setCurrentTeam: (team) => set({ currentTeam: team }),
		currentKnowledgeBase: null,
		setCurrentKnowledgeBase: (kb) => {
			writeLastSelectedKbToCache(kb);
			set({ currentKnowledgeBase: kb });
		},
		personalKbInfo: null,
		setPersonalKbInfo: (info) => set({ personalKbInfo: info }),
		accountScopedVersion: 0,
		viewMode: "catalog",
		setViewMode: (mode) => set((state) => {
			if (state.viewMode === mode) return {};
			return {
				viewMode: mode,
				selectedIds: /* @__PURE__ */ new Set()
			};
		}),
		selectedIds: /* @__PURE__ */ new Set(),
		toggleSelected: (fileId) => {
			let nextChecked = false;
			set((state) => {
				const next = new Set(state.selectedIds);
				if (next.has(fileId)) {
					next.delete(fileId);
					nextChecked = false;
				} else {
					next.add(fileId);
					nextChecked = true;
				}
				return { selectedIds: next };
			});
			return nextChecked;
		},
		setSelectedIds: (ids) => set({ selectedIds: new Set(ids) }),
		clearSelected: () => set({ selectedIds: /* @__PURE__ */ new Set() }),
		showSwitchKbModal: false,
		setShowSwitchKbModal: (next) => set({ showSwitchKbModal: next }),
		showPreview: false,
		previewFile: null,
		drawerMode: null,
		drawerCreateType: null,
		drawerCreatedEntryId: null,
		openPreview: (file) => set({
			showPreview: true,
			previewFile: file,
			drawerMode: "preview",
			drawerCreateType: null,
			drawerCreatedEntryId: null
		}),
		openCreateDrawer: (type, entryId) => set({
			showPreview: true,
			previewFile: null,
			drawerMode: "edit",
			drawerCreateType: type,
			drawerCreatedEntryId: entryId
		}),
		closePreview: () => set({
			showPreview: false,
			previewFile: null,
			drawerMode: null,
			drawerCreateType: null,
			drawerCreatedEntryId: null
		}),
		authStatus: "idle",
		setAuthStatus: (status) => set({ authStatus: status }),
		fileListVersion: 0,
		bumpFileListVersion: () => set((state) => ({ fileListVersion: state.fileListVersion + 1 })),
		fileRegistry: /* @__PURE__ */ new Map(),
		registerFiles: (files) => set((state) => {
			let hasNew = false;
			for (const f of files) if (!state.fileRegistry.has(f.id)) {
				hasNew = true;
				break;
			}
			if (!hasNew) return state;
			const next = new Map(state.fileRegistry);
			for (const f of files) next.set(f.id, f);
			return { fileRegistry: next };
		}),
		clearFileRegistry: () => set({ fileRegistry: /* @__PURE__ */ new Map() }),
		teamSpaceVersions: {},
		bumpTeamSpaceVersion: (teamId) => set((state) => ({ teamSpaceVersions: {
			...state.teamSpaceVersions,
			[teamId]: (state.teamSpaceVersions[teamId] ?? 0) + 1
		} })),
		pendingNewTeam: null,
		setPendingNewTeam: (team) => set({ pendingNewTeam: team }),
		resetAccountScopedState: () => {
			clearLastSelectedKbCache();
			clearLastViewCache();
			set((state) => ({
				currentKnowledgeBase: null,
				personalKbInfo: null,
				selectedIds: /* @__PURE__ */ new Set(),
				fileRegistry: /* @__PURE__ */ new Map(),
				accountScopedVersion: state.accountScopedVersion + 1,
				pageView: "space-detail",
				currentTeam: null
			}));
		}
	}));
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/lexiang-post-activation-gate.ts
function getPostActivationStorageKey(enterpriseId, uid) {
	return `${POST_ACTIVATION_STORAGE_PREFIX}:${enterpriseId}:${uid}`;
}
function hasPassedPostActivation(enterpriseId, uid) {
	try {
		return window.sessionStorage.getItem(getPostActivationStorageKey(enterpriseId, uid)) === "1";
	} catch {
		return false;
	}
}
function markPostActivationPassedInStorage(enterpriseId, uid) {
	try {
		window.sessionStorage.setItem(getPostActivationStorageKey(enterpriseId, uid), "1");
	} catch {}
}
function clearPostActivationInterval(polling) {
	if (polling?.intervalId) clearInterval(polling.intervalId);
}
function isSamePollingContext(current, expected) {
	return !!current && current.enterpriseId === expected.enterpriseId && current.uid === expected.uid && current.checkCompanyStatus === expected.checkCompanyStatus;
}
function createConnectedState() {
	return {
		authStatus: "connected",
		authError: null,
		authorizeUrl: null,
		connectedAt: (/* @__PURE__ */ new Date()).toISOString(),
		expireAt: null,
		postActivationGate: "idle",
		postActivationPolling: null
	};
}
async function runPostActivationCheck(get, set) {
	const polling = get().postActivationPolling;
	if (!polling || get().postActivationGate !== "pending") return;
	set({ postActivationPolling: {
		...polling,
		attempts: polling.attempts + 1
	} });
	try {
		if (!polling.oneidEnabledConfirmed) {
			const enabled = await polling.checkOneidEnabled();
			const stateAfterEnabled = get();
			const pollingAfterEnabled = stateAfterEnabled.postActivationPolling;
			if (stateAfterEnabled.postActivationGate !== "pending" || !isSamePollingContext(pollingAfterEnabled, polling)) return;
			if (!enabled) {
				if (pollingAfterEnabled.attempts >= POST_ACTIVATION_MAX_ATTEMPTS) get().markPostActivationTimeout();
				return;
			}
			set({ postActivationPolling: {
				...pollingAfterEnabled,
				oneidEnabledConfirmed: true
			} });
		}
		const response = await polling.checkCompanyStatus();
		const latestState = get();
		const latestPolling = latestState.postActivationPolling;
		if (latestState.postActivationGate !== "pending" || !isSamePollingContext(latestPolling, polling)) return;
		if (response.code === 0 && response.data?.is_pass === true) {
			latestState.markPostActivationPassed({
				enterpriseId: latestPolling.enterpriseId,
				uid: latestPolling.uid
			});
			return;
		}
		const consecutiveFailures = response.code === 0 ? 0 : latestPolling.consecutiveFailures + 1;
		if (latestPolling.attempts >= POST_ACTIVATION_MAX_ATTEMPTS || consecutiveFailures >= POST_ACTIVATION_MAX_CONSECUTIVE_FAILURES) {
			set({ postActivationPolling: {
				...latestPolling,
				consecutiveFailures
			} });
			get().markPostActivationTimeout();
			return;
		}
		if (consecutiveFailures !== latestPolling.consecutiveFailures) set({ postActivationPolling: {
			...latestPolling,
			consecutiveFailures
		} });
	} catch {
		const latestState = get();
		const latestPolling = latestState.postActivationPolling;
		if (latestState.postActivationGate !== "pending" || !isSamePollingContext(latestPolling, polling)) return;
		const consecutiveFailures = latestPolling.consecutiveFailures + 1;
		if (latestPolling.attempts >= POST_ACTIVATION_MAX_ATTEMPTS || consecutiveFailures >= POST_ACTIVATION_MAX_CONSECUTIVE_FAILURES) {
			set({ postActivationPolling: {
				...latestPolling,
				consecutiveFailures
			} });
			latestState.markPostActivationTimeout();
			return;
		}
		set({ postActivationPolling: {
			...latestPolling,
			consecutiveFailures
		} });
	}
}
/**
* 创建 OneID 首次开通后的公司初始化检查 actions。
*
* 这里仅编排 UI gate 状态与轮询生命周期；真正的公司初始化检查能力由调用方注入，
* 避免 store 直接依赖 React Context、Facade hook 或乐享域名 HTTP 请求。
*/
function createLexiangPostActivationGateActions(set, get) {
	return {
		enterPostActivationGate: (params) => {
			clearPostActivationInterval(get().postActivationPolling);
			const nextPolling = {
				intervalId: null,
				consecutiveFailures: 0,
				attempts: 0,
				enterpriseId: params.enterpriseId,
				uid: params.uid,
				checkOneidEnabled: params.checkOneidEnabled,
				checkCompanyStatus: params.checkCompanyStatus,
				oneidEnabledConfirmed: false
			};
			const intervalId = setInterval(() => {
				runPostActivationCheck(get, set).catch(() => {});
			}, POST_ACTIVATION_POLL_INTERVAL);
			set({
				authError: null,
				authorizeUrl: null,
				expireAt: null,
				postActivationGate: "pending",
				postActivationPolling: {
					...nextPolling,
					intervalId
				}
			});
			runPostActivationCheck(get, set).catch(() => {});
		},
		markPostActivationPassed: ({ enterpriseId, uid }) => {
			clearPostActivationInterval(get().postActivationPolling);
			markPostActivationPassedInStorage(enterpriseId, uid);
			invalidateOneidApplications(enterpriseId, uid);
			set(createConnectedState());
		},
		markPostActivationTimeout: () => {
			const polling = get().postActivationPolling;
			clearPostActivationInterval(polling);
			set({
				postActivationGate: "timeout",
				postActivationPolling: polling ? {
					...polling,
					intervalId: null
				} : null
			});
		},
		stopPostActivationGate: () => {
			clearPostActivationInterval(get().postActivationPolling);
			set({
				postActivationGate: "idle",
				postActivationPolling: null
			});
		},
		retryPostActivationGate: () => {
			const polling = get().postActivationPolling;
			if (!polling) return;
			get().enterPostActivationGate({
				enterpriseId: polling.enterpriseId,
				uid: polling.uid,
				checkOneidEnabled: polling.checkOneidEnabled,
				checkCompanyStatus: polling.checkCompanyStatus
			});
		},
		continuePostActivationGate: () => {
			clearPostActivationInterval(get().postActivationPolling);
			set(createConnectedState());
		}
	};
}
var POST_ACTIVATION_STORAGE_PREFIX, POST_ACTIVATION_POLL_INTERVAL, POST_ACTIVATION_MAX_ATTEMPTS, POST_ACTIVATION_MAX_CONSECUTIVE_FAILURES;
var init_lexiang_post_activation_gate = __esmMin((() => {
	init_use_oneid_applications();
	POST_ACTIVATION_STORAGE_PREFIX = "lexiang.postActivationPassed";
	POST_ACTIVATION_POLL_INTERVAL = 2e3;
	POST_ACTIVATION_MAX_ATTEMPTS = 30;
	POST_ACTIVATION_MAX_CONSECUTIVE_FAILURES = 5;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/lexiang-auth-store.ts
var lexiang_auth_store_exports = /* @__PURE__ */ __exportAll({
	hasPassedPostActivation: () => hasPassedPostActivation,
	lexiangAuthStore: () => lexiangAuthStore,
	markPostActivationPassedInStorage: () => markPostActivationPassedInStorage,
	useLexiangAuth: () => useLexiangAuth
});
/**
* 授权成功后让 connector:tencent-lexiang 进入 enabled 状态：
*
* 1. `updateConnectorHeaders` 把 mcp_token 写进 headerOverrides.Authorization，
*    使后续 MCP 调用直通使用最新 token；
* 2. 直接走底层 `adapter.connectConnector` 显式启用 connector
*    （加入 persistentState.enabled、触发 MCP 连接、并把状态同步刷新为 connected）。
* 3. 最后调用 `connectorStore.loadMcpConnectors()` 让连接器面板状态同步刷新。
*
* 注意：这里不能调用 `connectorStore.connectMcpConnector`。该方法是连接器面板的
* 用户入口，会先执行 gateway/server-side connector 自己的 OAuth 预流程
* （`startServerSideOauthFlow`）；乐享资料库已经通过 `lexiangStartAuth` 完成授权
* 并拿到 mcp_token，再走连接器 OAuth 会在云端 `/start` 偶现返回
* `next_action='redirect'` 时调用 `adapter.openExternal(authorize_url)` 把系统
* 浏览器拉起，表现为"点击授权偶现弹出外部浏览器，而不是在原地 webview 授权"。
* 与 tencent-docs/store.ts 的 syncMcpTokenToConnector 实现保持一致。
*
* 内部 fire-and-forget：失败仅记录日志，不影响授权状态。
*
* ## silent 模式（被动检查场景）
*
* 当 `options.silent === true` 时，仅执行步骤 1（同步 header），跳过步骤 2/3：
* 不调 `connectConnector`、不刷 `loadMcpConnectors`，从而不会改动 connector
* 的启用状态。
*
* 用于 `checkAuthStatus` 发现看板与连接器已处于兼容状态时的被动同步：
* 只刷新 header，不改 connector enabled 状态。若进入看板时发现"看板已授权但
* 连接器未授权"，仍会走默认非 silent，主动启用 connector。
*
* 首次走完授权（`startAuthorization` 拿到 connected 时）同样走默认非 silent，
* 保留"授权完成即启用 connector"的预期行为。
*/
function syncMcpTokenToConnector(adapter, mcpToken, options) {
	if (!mcpToken || !adapter?.updateConnectorHeaders) return;
	const silent = options?.silent === true;
	adapter.updateConnectorHeaders(LEXIANG_CONNECTOR_ID, { Authorization: mcpToken }).then((result) => {
		if (!result?.success) return;
		if (silent) return;
		connectorStore.getState().loadMcpConnectors().catch(() => {});
	}).catch(() => {});
}
/**
* 授权过期时清掉 connector headers 里的 Authorization，避免已附加的乐享
* phrase block 在被 agent 引用时仍然带着失效的旧 token。
*
* 内部 fire-and-forget，失败仅记录日志。
*/
function clearMcpTokenFromConnector(adapter) {
	if (!adapter?.updateConnectorHeaders) return;
	adapter.updateConnectorHeaders(LEXIANG_CONNECTOR_ID, { Authorization: "" }).then((result) => {
		if (!result?.success) {}
	}).catch(() => {});
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
async function syncConnectorAuthStatusWithBoard(adapter, boardStatus, mcpToken) {
	if (!adapter) return;
	try {
		await connectorStore.getState().loadMcpConnectors();
		const connectorState = connectorStore.getState().mcpConnectorStates[LEXIANG_CONNECTOR_ID];
		if (boardStatus === "connected") {
			if (shouldAuthorizeConnectorFromBoard(connectorState)) {
				syncMcpTokenToConnector(adapter, mcpToken);
				return;
			}
			syncMcpTokenToConnector(adapter, mcpToken, { silent: true });
			return;
		}
		if (boardStatus === "pending") return;
		if (!shouldUnbindConnectorFromBoard(connectorState)) {
			clearMcpTokenFromConnector(adapter);
			return;
		}
		if (adapter.unbindConnector) await adapter.unbindConnector(LEXIANG_CONNECTOR_ID);
		else clearMcpTokenFromConnector(adapter);
		await connectorStore.getState().loadMcpConnectors();
	} catch {}
}
/**
* 把 adapter 上的连接器事件桥接到乐享 store：
*
* - `connector:unauthorized`：主进程把 connector 标记为 unauthorized
*   时，调 `markExpired()` 让 UI 回到授权页。
* - `connector:unbound`：用户在连接器面板解绑时，同步撤销后端
*   OAuth 并把 store 重置到 `not_connected`。
*/
function ensureConnectorEventSubscription(adapter) {
	if (!adapter || subscribedAdapters.has(adapter) || typeof adapter.on !== "function") return;
	subscribedAdapters.add(adapter);
	try {
		adapter.on("connector:unauthorized", (data) => {
			if (data?.configId !== "lexiang") return;
			lexiangAuthStore.getState().markExpired();
		});
	} catch {}
	try {
		adapter.on("connector:unbound", (data) => {
			if (data?.configId !== "lexiang") return;
			lexiangAuthStore.getState().handleConnectorUnbound();
		});
	} catch {}
}
function useLexiangAuth(selector) {
	return (0, import_zustand.useStore)(lexiangAuthStore, selector);
}
var import_zustand, subscribedAdapters, lexiangAuthStore;
var init_lexiang_auth_store = __esmMin((() => {
	import_zustand = require_zustand();
	init_vanilla();
	init_store$1();
	init_telemetry_helpers();
	init_store();
	init_lexiang_auth_constants();
	init_lexiang_post_activation_gate();
	subscribedAdapters = /* @__PURE__ */ new WeakSet();
	lexiangAuthStore = createStore((set, get) => {
		const postActivationActions = createLexiangPostActivationGateActions(set, get);
		return {
			authStatus: "checking",
			authError: null,
			authorizeUrl: null,
			connectedAt: null,
			expireAt: null,
			currentOpenId: null,
			adapter: null,
			clearWebCookies: null,
			pollTimerId: null,
			isPolling: false,
			postActivationGate: "idle",
			postActivationPolling: null,
			enterPostActivationGate: postActivationActions.enterPostActivationGate,
			markPostActivationPassed: postActivationActions.markPostActivationPassed,
			markPostActivationTimeout: postActivationActions.markPostActivationTimeout,
			stopPostActivationGate: postActivationActions.stopPostActivationGate,
			retryPostActivationGate: postActivationActions.retryPostActivationGate,
			continuePostActivationGate: postActivationActions.continuePostActivationGate,
			setAdapter: (adapter) => {
				const prevAdapter = get().adapter;
				set({ adapter });
				ensureConnectorEventSubscription(adapter);
				if (!prevAdapter) {
					const { authStatus, connectedAt } = get();
					if (authStatus === "not_connected" && !connectedAt) get().checkAuthStatus();
				}
			},
			setClearWebCookies: (clearWebCookies) => {
				set({ clearWebCookies });
			},
			checkAuthStatus: async () => {
				const currentStatus = get().authStatus;
				if (currentStatus !== "connected") set({
					authStatus: "checking",
					authError: null
				});
				try {
					const adapter = get().adapter;
					if (!adapter?.lexiangCheckAuthStatus) {
						set({ authStatus: "not_connected" });
						return;
					}
					const response = await adapter.lexiangCheckAuthStatus();
					const newStatus = {
						not_connected: "not_connected",
						pending: "authorizing",
						connected: "connected",
						expired: "expired",
						failed: "failed",
						corp_not_enabled: "corp_not_enabled"
					}[response.status] || "not_connected";
					if (currentStatus === "connected" && newStatus === "connected") {
						const nextOpenId = response.extra?.open_id ?? null;
						if (nextOpenId !== get().currentOpenId) set({ currentOpenId: nextOpenId });
					} else set({
						authStatus: newStatus,
						connectedAt: response.connected_at || null,
						authError: null,
						currentOpenId: response.status === "connected" ? response.extra?.open_id ?? null : null
					});
					await syncConnectorAuthStatusWithBoard(adapter, response.status, response.extra?.mcp_token);
				} catch {
					if (currentStatus === "connected") {
						set({ authError: "登录态校验失败，请稍后重试" });
						return;
					}
					set({
						authStatus: "failed",
						authError: "Failed to check authorization status"
					});
				}
			},
			startAuthorization: async () => {
				const { adapter, stopPolling } = get();
				stopPolling();
				set({
					authStatus: "authorizing",
					authError: null
				});
				try {
					if (!adapter?.lexiangStartAuth) throw new Error("adapter.lexiangStartAuth not available");
					const response = await adapter.lexiangStartAuth();
					if (response.next_action === "connected") {
						set({
							authStatus: "connected",
							connectedAt: (/* @__PURE__ */ new Date()).toISOString(),
							authError: null,
							authorizeUrl: null,
							isPolling: false,
							pollTimerId: null
						});
						if (adapter?.lexiangCheckAuthStatus) try {
							const statusResponse = await adapter.lexiangCheckAuthStatus();
							syncMcpTokenToConnector(adapter, statusResponse.extra?.mcp_token);
							set({ currentOpenId: statusResponse.extra?.open_id ?? null });
						} catch {}
						return;
					}
					set({
						authorizeUrl: response.authorize_url,
						expireAt: new Date(response.expire_at).getTime()
					});
					const expireAt = new Date(response.expire_at).getTime();
					let attempts = 0;
					const poll = async () => {
						attempts++;
						if (Date.now() > expireAt || attempts > 150) {
							set({
								authStatus: "expired",
								authError: "授权链接已过期",
								authorizeUrl: null,
								isPolling: false,
								pollTimerId: null
							});
							return;
						}
						try {
							if (!adapter?.lexiangCheckAuthStatus) throw new Error("adapter.lexiangCheckAuthStatus not available");
							const statusResponse = await adapter.lexiangCheckAuthStatus();
							if (statusResponse.status === "connected") {
								set({
									authStatus: "connected",
									connectedAt: statusResponse.connected_at || (/* @__PURE__ */ new Date()).toISOString(),
									authError: null,
									authorizeUrl: null,
									isPolling: false,
									pollTimerId: null,
									currentOpenId: statusResponse.extra?.open_id ?? null
								});
								syncMcpTokenToConnector(adapter, statusResponse.extra?.mcp_token);
								reportLibraryAuthConnectorSuccess(adapter, LEXIANG_CONNECTOR_ID);
								return;
							}
							if (statusResponse.status === "failed") {
								set({
									authStatus: "failed",
									authError: "Authorization failed, please try again",
									authorizeUrl: null,
									isPolling: false,
									pollTimerId: null
								});
								return;
							}
							if (statusResponse.status === "corp_not_enabled") {
								set({
									authStatus: "corp_not_enabled",
									authError: null,
									authorizeUrl: null,
									isPolling: false,
									pollTimerId: null
								});
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
				const { adapter, stopPolling } = get();
				stopPolling();
				try {
					if (!adapter?.lexiangRevokeAuth) throw new Error("adapter.lexiangRevokeAuth not available");
					await adapter.lexiangRevokeAuth();
					try {
						adapter.reportTelemetry?.("web_element_click", {
							elementId: "lexiang_unbind_confirm",
							elementName: "确认解绑"
						});
					} catch {}
					tencentLexiangStore.getState().resetAccountScopedState();
					set({
						authStatus: "not_connected",
						connectedAt: null,
						authorizeUrl: null,
						expireAt: null,
						authError: null,
						currentOpenId: null
					});
					if (adapter.unbindConnector) try {
						await adapter.unbindConnector(LEXIANG_CONNECTOR_ID);
					} catch {}
					connectorStore.getState().loadMcpConnectors().catch(() => {});
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
			markExpired: (options) => {
				const { stopPolling, adapter, authStatus, clearWebCookies } = get();
				if (authStatus === "authorizing") return;
				stopPolling();
				tencentLexiangStore.getState().resetAccountScopedState();
				set({
					authStatus: "expired",
					authError: null,
					currentOpenId: null
				});
				(options?.clearWebCookies ?? clearWebCookies)?.("expired");
				clearMcpTokenFromConnector(adapter);
			},
			handleConnectorUnbound: async () => {
				const { adapter, stopPolling } = get();
				stopPolling();
				tencentLexiangStore.getState().resetAccountScopedState();
				set({
					authStatus: "not_connected",
					connectedAt: null,
					authorizeUrl: null,
					expireAt: null,
					authError: null,
					currentOpenId: null
				});
				if (adapter?.lexiangRevokeAuth) try {
					await adapter.lexiangRevokeAuth();
				} catch {}
			},
			reset: () => {
				const { stopPolling, authStatus } = get();
				stopPolling();
				if (authStatus === "connected") return;
				set({
					authStatus: "not_connected",
					authError: null,
					authorizeUrl: null,
					expireAt: null,
					connectedAt: null,
					pollTimerId: null,
					isPolling: false,
					currentOpenId: null
				});
			}
		};
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/hooks/use-lexiang-check-auth-gate.ts
/**
* 乐享授权状态检查入口分流。
*
* OA / 企业账号的乐享访问走 OneID / 企业免登通道，C 端 OAuth status 接口
* 可能返回 not_connected 并触发 connector 自动 unbind。企业已开通时只把
* 本地 store 推到 connected，其余 OneID 态交给上层开通页或 bypass 逻辑处理。
*/
function useLexiangCheckAuthGate() {
	const isEnterpriseEdition = useIsEnterpriseEdition();
	const oneidStatus = useOneidAppStatus("lexiang");
	return (0, import_react$2.useCallback)(() => {
		if (!isEnterpriseEdition) {
			lexiangAuthStore.getState().checkAuthStatus();
			return;
		}
		if (oneidStatus.status !== "enabled") return;
		const { postActivationGate } = lexiangAuthStore.getState();
		if (postActivationGate === "pending" || postActivationGate === "timeout") return;
		lexiangAuthStore.setState({
			authStatus: "connected",
			authError: null,
			authorizeUrl: null,
			expireAt: null
		});
	}, [isEnterpriseEdition, oneidStatus.status]);
}
var import_react$2;
var init_use_lexiang_check_auth_gate = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_lexiang_auth_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/auth-guide.less
var init_auth_guide$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/assets/lexiang.svg
var lexiang_default;
var init_lexiang = __esmMin((() => {
	lexiang_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.7515%202.42862C10.9066%202.51811%2010.9066%202.74186%2010.7516%202.83137L5.94596%205.60596C5.79094%205.69546%205.59717%205.58359%205.59717%205.40459V2.40623C5.59717%202.29546%205.65626%202.19311%205.75219%202.13773L7.14737%201.33224C7.67495%201.02764%208.32497%201.02764%208.85255%201.33224L10.7515%202.42862Z'%20fill='%2330BF60'/%3e%3cpath%20d='M13.348%203.92783C13.8756%204.23244%2014.2006%204.79536%2014.2006%205.40457V7.59794C14.2006%207.77695%2014.0068%207.88882%2013.8518%207.79931L9.04613%205.02423C8.89113%204.93472%208.89113%204.71098%209.04615%204.62149L11.6428%203.12229C11.7387%203.0669%2011.8569%203.0669%2011.9529%203.12229L13.348%203.92783Z'%20fill='%23FCB900'/%3e%3cpath%20d='M4.89963%209.61105C4.89963%209.72182%204.95872%209.82417%205.05465%209.87955L7.84499%2011.4906C7.94091%2011.546%208.0591%2011.546%208.15503%2011.4906L10.9454%209.87955C11.0413%209.82417%2011.1004%209.72182%2011.1004%209.61105V7.41889C11.1004%207.23989%2011.2942%207.12802%2011.4492%207.21752L14.0457%208.7167C14.1417%208.77208%2014.2008%208.87443%2014.2008%208.98519V10.5955C14.2008%2011.2047%2013.8757%2011.7677%2013.3482%2012.0723L8.85261%2014.6678C8.32502%2014.9724%207.675%2014.9724%207.14741%2014.6678L2.65187%2012.0723C2.12427%2011.7677%201.79926%2011.2047%201.79926%2010.5955V5.40451C1.79926%204.79531%202.12426%204.23238%202.65184%203.92777L4.55084%202.83135C4.70586%202.74185%204.89963%202.85372%204.89963%203.03272V9.61105Z'%20fill='%233388FF'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/lexiang-auth-types.ts
var LEXIANG_AUTH_SOURCE_ELEMENT_ID, LEXIANG_AUTH_SOURCE_ELEMENT_NAME, LEXIANG_AUTH_PAGE_NAME;
var init_lexiang_auth_types = __esmMin((() => {
	LEXIANG_AUTH_SOURCE_ELEMENT_ID = {
		library: "lexiang_auth_from_library",
		file_picker: "lexiang_auth_from_file_picker",
		upload: "lexiang_auth_from_file_upload",
		connector: "lexiang_auth_from_connector"
	};
	LEXIANG_AUTH_SOURCE_ELEMENT_NAME = {
		library: "从资料库触达授权",
		file_picker: "从文件选择器触达授权",
		upload: "从文件上传触达授权",
		connector: "从连接器触达授权"
	};
	LEXIANG_AUTH_PAGE_NAME = "lexiang_auth_page";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/use-lexiang-auth-report.ts
/**
* 上报"触达授权来源"
*
* 在组件首次挂载时上报一次 `lexiang_auth_from_<source>`。
* 同一组件实例内不会重复上报。
*/
function useReportLexiangAuthSource(source) {
	const adapter = useAdapter();
	const hasReportedRef = (0, import_react$1.useRef)(false);
	(0, import_react$1.useEffect)(() => {
		if (hasReportedRef.current) return;
		hasReportedRef.current = true;
		const elementId = LEXIANG_AUTH_SOURCE_ELEMENT_ID[source];
		const elementName = LEXIANG_AUTH_SOURCE_ELEMENT_NAME[source];
		if (!elementId) return;
		try {
			adapter?.reportTelemetry?.("web_element_click", {
				elementId,
				elementName
			});
		} catch {}
	}, []);
}
/**
* 上报"授权页曝光（web_page_show）"
*
* 由调用方决定触发时机（一般在 webview 真正加载授权 URL 时）。
* 推荐做法：传入一个布尔 `shouldReport`，当条件首次为 true 时触发上报。
*/
function useReportLexiangAuthPageShow(shouldReport) {
	const adapter = useAdapter();
	const hasReportedRef = (0, import_react$1.useRef)(false);
	(0, import_react$1.useEffect)(() => {
		if (!shouldReport || hasReportedRef.current) return;
		hasReportedRef.current = true;
		try {
			adapter?.reportTelemetry?.("web_page_show", { pageName: LEXIANG_AUTH_PAGE_NAME });
		} catch {}
	}, [shouldReport, adapter]);
}
/**
* 上报"授权结果（成功 / 失败）"
*
* 监听 `lexiangAuthStore.authStatus`：
*  - connected → 上报 lexiang_auth_success（仅一次）
*  - failed    → 上报 lexiang_auth_fail（仅一次）
*
* 必须在整个授权流程中**始终挂载**的组件（AuthGuard）中调用，
* 而非在 AuthGuide 中调用——AuthGuide 在 authStatus 变为 connected 时会被
* AuthGuard 立即卸载，导致 useEffect 来不及执行，造成授权成功漏报。
*/
function useReportLexiangAuthResult() {
	const adapter = useAdapter();
	const authStatus = useLexiangAuth((s) => s.authStatus);
	const hasReportedSuccessRef = (0, import_react$1.useRef)(false);
	const hasReportedFailRef = (0, import_react$1.useRef)(false);
	(0, import_react$1.useEffect)(() => {
		if (authStatus === "connected" && !hasReportedSuccessRef.current) {
			hasReportedSuccessRef.current = true;
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					elementId: "knowledge_base_auth_success",
					elementName: "乐享授权成功",
					type: "lexiang"
				});
			} catch {}
			return;
		}
		if (authStatus === "failed" && !hasReportedFailRef.current) {
			hasReportedFailRef.current = true;
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					elementId: "lexiang_auth_fail",
					elementName: "授权失败"
				});
			} catch {}
		}
	}, [authStatus, adapter]);
}
var import_react$1;
var init_use_lexiang_auth_report = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_lexiang_auth_store();
	init_lexiang_auth_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/auth-guide.tsx
var import_react, import_jsx_runtime, renderEmphasizedText, EyeIcon, PencilIcon, ShieldCheckIcon, BrandConnectArrows, AuthGuide;
var init_auth_guide = __esmMin((() => {
	init_auth_guide$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_header_workbuddy();
	init_lexiang();
	init_useI18n();
	init_lexiang_auth_store();
	init_use_lexiang_auth_report();
	import_jsx_runtime = require_jsx_runtime();
	renderEmphasizedText = (text) => {
		return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
			if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: part.slice(2, -2) }, index);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: part }, index);
		});
	};
	EyeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		})]
	});
	PencilIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" })]
	});
	ShieldCheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 12 2 2 4-4" })]
	});
	BrandConnectArrows = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lexiang-auth-guide__connect-arrows",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "lexiang-auth-guide__connect-arrow lexiang-auth-guide__connect-arrow--1",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "lexiang-auth-guide__connect-arrow lexiang-auth-guide__connect-arrow--2",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "lexiang-auth-guide__connect-arrow lexiang-auth-guide__connect-arrow--3",
				children: "›"
			})
		]
	});
	AuthGuide = ({ source, className }) => {
		const t = useTranslation();
		const authStatus = useLexiangAuth((s) => s.authStatus);
		const authError = useLexiangAuth((s) => s.authError);
		const authorizeUrl = useLexiangAuth((s) => s.authorizeUrl);
		const webviewContainerRef = (0, import_react.useRef)(null);
		const isAuthorizing = authStatus === "authorizing";
		const isExpired = authStatus === "expired";
		const isFailed = authStatus === "failed";
		const isCorpNotEnabled = authStatus === "corp_not_enabled";
		useReportLexiangAuthSource(source);
		useReportLexiangAuthResult();
		useReportLexiangAuthPageShow(isAuthorizing && Boolean(authorizeUrl));
		const handleAuthorize = (0, import_react.useCallback)(() => {
			lexiangAuthStore.getState().startAuthorization();
		}, []);
		const handleRetry = (0, import_react.useCallback)(() => {
			lexiangAuthStore.getState().reset();
			lexiangAuthStore.getState().startAuthorization();
		}, []);
		(0, import_react.useEffect)(() => {
			const container = webviewContainerRef.current;
			if (!container || !isAuthorizing || !authorizeUrl) return;
			const webview = document.createElement("webview");
			webview.setAttribute("src", authorizeUrl);
			webview.className = "lexiang-auth-webview";
			container.appendChild(webview);
			return () => {
				if (webview.parentNode === container) container.removeChild(webview);
			};
		}, [isAuthorizing, authorizeUrl]);
		const rootCls = ["lexiang-auth-guide", className ?? ""].filter(Boolean).join(" ");
		if (isAuthorizing && authorizeUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lexiang-auth-webview-container",
			ref: webviewContainerRef
		});
		if (isCorpNotEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: rootCls,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lexiang-auth-guide__content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "lexiang-auth-guide__title",
					children: t("tencentLexiang.auth.corpNotEnabled")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lexiang-auth-guide__desc",
					children: t("tencentLexiang.auth.corpNotEnabledDesc")
				})]
			})
		});
		const title = isExpired ? t("tencentLexiang.auth.expiredTitle") : isFailed ? t("tencentLexiang.auth.failed") : t("tencentLexiang.auth.title");
		const description = isExpired ? t("tencentLexiang.auth.expiredDesc") : isAuthorizing ? t("tencentLexiang.auth.authorizingDesc") : isFailed ? authError ?? t("tencentLexiang.auth.failedDesc") : t("tencentLexiang.auth.description");
		const buttonText = isExpired ? t("tencentLexiang.auth.reauthorize") : isAuthorizing ? t("tencentLexiang.auth.authorizing") : isFailed ? t("tencentLexiang.auth.retry") : t("tencentLexiang.auth.authorize");
		const handleClick = isFailed ? handleRetry : handleAuthorize;
		const showPermissions = !isAuthorizing && !isFailed;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: rootCls,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lexiang-auth-guide__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lexiang-auth-guide__brands",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lexiang-auth-guide__brand-icon lexiang-auth-guide__brand-icon--wb",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: header_workbuddy_default,
									alt: "WorkBuddy",
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandConnectArrows, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lexiang-auth-guide__brand-icon lexiang-auth-guide__brand-icon--lexiang",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: lexiang_default,
									alt: "乐享知识库",
									draggable: false
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "lexiang-auth-guide__title",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lexiang-auth-guide__desc",
						children: renderEmphasizedText(description)
					}),
					showPermissions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lexiang-auth-guide__permissions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lexiang-auth-guide__permissions-title",
							children: t("tencentLexiang.auth.permissionsTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "lexiang-auth-guide__permissions-list",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "lexiang-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "lexiang-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lexiang-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lexiang-auth-guide__permission-label",
										children: t("tencentLexiang.auth.permissionRead")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lexiang-auth-guide__permission-desc",
										children: t("tencentLexiang.auth.permissionReadDesc")
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "lexiang-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "lexiang-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lexiang-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lexiang-auth-guide__permission-label",
										children: t("tencentLexiang.auth.permissionWrite")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lexiang-auth-guide__permission-desc",
										children: t("tencentLexiang.auth.permissionWriteDesc")
									})]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `lexiang-auth-guide__btn${isAuthorizing ? " lexiang-auth-guide__btn--loading" : ""}`,
						onClick: handleClick,
						disabled: isAuthorizing,
						children: [isAuthorizing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lexiang-auth-guide__spinner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lexiang-auth-guide__btn-label",
							children: buttonText
						})]
					}),
					showPermissions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lexiang-auth-guide__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheckIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("tencentLexiang.auth.privacyHint") })]
					})
				]
			})
		});
	};
}));
//#endregion
export { LEXIANG_OAUTH_NAME as A, init_constants as C, isVpcEndpointHost as D, deriveLexiangVpcWebOriginFromEndpoint as E, AUTH_POLL_INTERVAL as O, buildKbHomeUrl as S, LEXIANG_WEB_ORIGIN_STAGING as T, LEXIANG_IFRAME_SANDBOX as _, init_use_lexiang_check_auth_gate as a, LEXIANG_SUPPORTED_EXTENSIONS as b, lexiangAuthStore as c, hasPassedPostActivation as d, init_store as f, useTencentLexiangStore as g, tencentLexiangStore as h, useReportLexiangAuthResult as i, init_lexiang_auth_constants as j, LEXIANG_CONNECTOR_ID as k, lexiang_auth_store_exports as l, readLastViewFromCache as m, init_auth_guide as n, useLexiangCheckAuthGate as o, readLastSelectedKbFromCache as p, init_use_lexiang_auth_report as r, init_lexiang_auth_store as s, AuthGuide as t, useLexiangAuth as u, LEXIANG_LIBRARY_EMBED_UI_QUERY as v, LEXIANG_WEB_ORIGIN_PROD as w, LEXIANG_TRUSTED_ORIGINS as x, LEXIANG_PAGE_PREVIEW_UI_QUERY as y };
