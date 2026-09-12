const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./app-providers-DKch2dAZ.js","./agent-mail-CiuzbR2o.js","./chunk-BRZcfu7K.js","./preload-helper-E3UYCQGP.js","./src-DRGoWjIu.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./resize-observer-QOR-7G1T.js","./wasm-C4lriWle.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./classnames-BYn3_ESJ.js","./decode-HthuYB5G.js","./index.dom-Hjybw7gi.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./hast-util-whitespace-C3G7AbkX.js","./katex-sFwAzkhG.js","./lodash-D1c13HHR.js","./merge-CDI2sNhv.js","./throttle-mAPE4S6V.js","./isObjectLike-Dan5H4Gd.js","./isSymbol-DlS8bGaY.js","./lucide-react-CmX0JwWL.js","./client-BPkZUIji.js","./jsx-runtime-BNEdAQtr.js","./dist-CSHw4oQX.js","./i18n-DH8xcldp.js","./chevron-down-icon-Bs9CIPFg.js","./copied-icon-Cvsbo-xy.js","./copy-icon-BUIWKTIn.js","./edit-icon-9Lcq4c36.js","./src-D47LCgt5.css","./_esm5-RYAsZ7Wr.js","./zustand-BGHu9tpa.js","./vanilla-BfruURAe.js","./common-CwB_VqKR.js","./dist-DNjXzICC.js","./dist-BlOCCi14.js","./purify.es-Buzz9Dxi.js","./message-converter-CCG28Swi.js","./chat-types-BMkaZPiE.js","./foundation-QOglV606.js","./icons-Cj3UopO9.js","./ArtifactFileIconTypes-mWPconF_.js","./icons-CmEjl25S.css","./floating-1_OFz6f-.js","./i18n-Bt_Wap4p.js","./environment-DKqg3f0G.js","./useI18n-DDytAo7_.js","./foundation-DhkLbEzB.css","./chat-types-CptmOga7.css","./router-O5ZnP5xt.js","./app-core-0tGlBWei.js","./contexts-D7XKqa2J.js","./adapter-context-DGaRYQ5R.js","./ima-api-context-C8-EzcEu.js","./file-path-DzzGeaqx.js","./http-logger-BE9rNaof.js","./useTheme-KZ-Qaric.js","./header-icon-dark-DmGJ_Yaj.js","./user-menu-avatar-DZ2_gXGP.js","./center-Cjtv6Q1N.js","./common-Czfscgga.js","./module-host-context-CI9spvhq.js","./skill-import-errors-BlMOiDaZ.js","./account-BDHahT9K.js","./center-B7qS8xvs.css","./wechatmp-qr-code-Cy7xHDnU.js","./oauth-callback-IQ0UCaVX.js","./oauth-callback-BETV_lnd.css","./use-login-error-handler-CyOZrL-F.js","./login-error-parser-D0A9vxdd.js","./FeedbackModal-COJnZocZ.js","./FeedbackModal-D1iC5KWj.css","./product-features-N4Z0q4SS.js","./storage-upgrade-entry-snapshot-BgU4-HWF.js","./SlotConfigProvider-NQm4Ut9L.js","./types-B5gc2qW1.js","./ardot-canvas-BbVvf1Ta.js","./route-path-tracker-D4O9Dve0.js","./artifact-drag-Dlide0j-.js","./agent-mail-DaA1SKc5.css"])))=>i.map(i=>d[i]);
import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { Vs as createContextBlock, Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { t as require_zustand } from "./zustand-BGHu9tpa.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
import { i as init_types, t as AgentTelemetryEvents } from "./types-B5gc2qW1.js";
//#region ../../packages/agent-ui/src/modules/connector/connector-auth-registry.ts
/**
* 注册一个 connector 的授权 provider。
* 一个 connector id 只能注册一个 provider，重复注册会覆盖。
*/
function registerConnectorAuthProvider(connectorId, provider) {
	registry.set(connectorId, provider);
}
/**
* 获取指定 connector 的授权 provider（如果已注册且 shouldHandleAuth() 返回 true）。
* 返回 null 表示走通用流程。
*/
function getActiveConnectorAuthProvider(connectorId) {
	const provider = registry.get(connectorId);
	if (!provider) return null;
	try {
		return provider.shouldHandleAuth() ? provider : null;
	} catch {
		return null;
	}
}
/**
* 检查 connector 是否有注册的 provider 且允许自动连接。
* 用于 autoEnableMcpConnectorToggle 的守卫判断。
*/
function canAutoConnect(connectorId) {
	const provider = registry.get(connectorId);
	if (!provider) return false;
	return provider.canAutoConnect?.(connectorId) ?? true;
}
var registry;
var init_connector_auth_registry = __esmMin((() => {
	registry = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/connector-op-mutex.ts
function runConnectorOpExclusive(configId, op) {
	const next = (connectorOpMutex.get(configId) ?? Promise.resolve()).then(op, op);
	connectorOpMutex.set(configId, next);
	next.catch(() => {}).finally(() => {
		if (connectorOpMutex.get(configId) === next) connectorOpMutex.delete(configId);
	});
	return next;
}
var connectorOpMutex;
var init_connector_op_mutex = __esmMin((() => {
	connectorOpMutex = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/constants.ts
var CONNECTOR_NO_AUTH, REPO_NO_AUTH, FILE_NOT_FOUND, REQ_OVER_LIMIT, FILE_NO_AUTH, TOKEN_INVALID, TOKEN_NO_AUTH;
var init_constants = __esmMin((() => {
	CONNECTOR_NO_AUTH = [10100, 10101];
	REPO_NO_AUTH = 10098;
	FILE_NOT_FOUND = 10098;
	REQ_OVER_LIMIT = 10103;
	FILE_NO_AUTH = 10102;
	TOKEN_INVALID = 10100;
	TOKEN_NO_AUTH = 10102;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/desired-state-guard.ts
var DESIRED_STATE_GUARD_TIMEOUT_MS, DesiredStateGuard;
var init_desired_state_guard = __esmMin((() => {
	DESIRED_STATE_GUARD_TIMEOUT_MS = 1e4;
	DesiredStateGuard = class {
		constructor(timeoutMs = DESIRED_STATE_GUARD_TIMEOUT_MS) {
			this.timeoutMs = timeoutMs;
			this.entries = /* @__PURE__ */ new Map();
		}
		/**
		* 记录 key 的期望最终状态，并启动超时兜底。
		* 重复设置同一 key 会重置超时（按最近一次用户操作归因）。
		*
		* @param onTimeout 超时未达成期望时的回调（如触发一次强制刷新，交还服务端真相）。
		*/
		setDesired(key, desired, onTimeout) {
			const prev = this.entries.get(key);
			if (prev) clearTimeout(prev.timeoutId);
			const timeoutId = setTimeout(() => {
				if (this.entries.get(key)?.timeoutId === timeoutId) {
					this.entries.delete(key);
					onTimeout?.(key);
				}
			}, this.timeoutMs);
			this.entries.set(key, {
				desired,
				timeoutId
			});
		}
		/** key 是否处于保护中（已设置期望且未达成/未超时）。 */
		has(key) {
			return this.entries.has(key);
		}
		/** 当前处于保护中的 key 数量（用于快速 short-circuit）。 */
		get size() {
			return this.entries.size;
		}
		/** 遍历当前处于保护中的所有 key。 */
		keys() {
			return this.entries.keys();
		}
		/** 读取 key 当前的期望状态；未处于保护中返回 undefined。 */
		getDesired(key) {
			return this.entries.get(key)?.desired;
		}
		/** 主动清除某 key 的保护（如操作失败回滚时，让服务端真相立即覆盖）。 */
		clear(key) {
			const entry = this.entries.get(key);
			if (entry) {
				clearTimeout(entry.timeoutId);
				this.entries.delete(key);
			}
		}
		/**
		* 收到服务端状态时调用：判断 key 的乐观状态是否仍需保护。
		*
		* - 未处于保护中 → 返回 false（服务端状态可直接采用）。
		* - 服务端已达成期望（`reached` 为 true）→ 释放保护并返回 false（采用服务端状态）。
		* - 服务端尚未达成期望 → 返回 true（保留本地乐观状态，屏蔽旧 payload）。
		*
		* @param reached 判断「服务端当前状态是否已达成 key 的期望」。
		*/
		shouldKeepPrevious(key, reached) {
			const entry = this.entries.get(key);
			if (!entry) return false;
			if (reached(entry.desired)) {
				this.clear(key);
				return false;
			}
			return true;
		}
		/** 测试/清理出口：清空所有 key 的保护与 timer。 */
		clearAll() {
			for (const entry of this.entries.values()) clearTimeout(entry.timeoutId);
			this.entries.clear();
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/store.ts
function acquireConnectSlot() {
	if (activeConnects < MAX_CONCURRENT_CONNECTS) {
		activeConnects++;
		return Promise.resolve();
	}
	return new Promise((resolve) => {
		connectQueue.push(resolve);
	});
}
function releaseConnectSlot() {
	const doRelease = () => {
		if (connectQueue.length > 0) connectQueue.shift()();
		else activeConnects--;
	};
	if (CONNECT_RELEASE_DELAY_MS > 0) setTimeout(doRelease, CONNECT_RELEASE_DELAY_MS);
	else doRelease();
}
/**
* 按 connector id 选取对应的自动连接 toast key。
*
* 决策表（与 `tencent-docs-id.ts` 对齐）：
*   - 'tencent-docs'（C 端 / 个人版） → `TENCENT_DOCS_PERSONAL_AUTO_CONNECT_TOAST_KEY`
*   - 'tencent-docs-oa'（B 端 / 企业版） → `TENCENT_DOCS_ENTERPRISE_AUTO_CONNECT_TOAST_KEY`
*   - 其他 / undefined（向后兼容）→ 旧 `TENCENT_DOCS_AUTO_CONNECT_TOAST_KEY`
*
* 不在此处 import `TENCENT_DOCS_*_CONNECTOR_ID` 是为了避免 connector store 反向
* 依赖具体 module（`modules/connector/utils/tencent-docs-id.ts` 内已导出常量），
* 这里直接对裸 string 比较即可。
*/
function pickTencentDocsAutoConnectToastKey(connectorId) {
	if (connectorId === "tencent-docs") return TENCENT_DOCS_PERSONAL_AUTO_CONNECT_TOAST_KEY;
	if (connectorId === "tencent-docs-oa") return TENCENT_DOCS_ENTERPRISE_AUTO_CONNECT_TOAST_KEY;
	return TENCENT_DOCS_AUTO_CONNECT_TOAST_KEY;
}
/**
* 给连接器 store 订阅主进程广播的 `connector:unbound` 事件，集中清理前端
* 记录的 `mcpEverConnectedIds`。
*
* 这样无论 unbind 是由哪个入口触发（连接器面板"解绑"按钮、资料库腾讯文档
* 解绑、主进程内部清理等），都会走到这里统一收敛，不用每个调用点都手动
* `setState(...mcpEverConnectedIds.delete(id))`。
*
* 不主动 `loadMcpConnectors()` —— 调用方如果需要刷新 `mcpConnectorStates`，
* 应当自己显式调用；这里只负责让 "曾经连过" 这个 UI 维度的前端缓存归零。
*/
function ensureUnboundSubscription(adapter) {
	if (!adapter || unboundSubscribedAdapters.has(adapter) || typeof adapter.on !== "function") return;
	unboundSubscribedAdapters.add(adapter);
	try {
		adapter.on("connector:unbound", (data) => {
			const configId = data?.configId;
			if (!configId) return;
			clearUserCancelledFreshConnect(configId);
			connectorStore.setState((state) => {
				if (!state.mcpEverConnectedIds.has(configId)) return state;
				const next = new Set(state.mcpEverConnectedIds);
				next.delete(configId);
				return { mcpEverConnectedIds: next };
			});
		});
	} catch (error) {
		console.warn("[ConnectorStore] subscribe connector:unbound failed:", error);
	}
}
/**
* 订阅主进程推来的 CLI 授权二维码 URL 事件，统一写入 store 的 `qrModalInfo`。
*
* 背景：`adapter.connectConnector()` 有多个调用入口（ConnectorPanel 插件面板、
* ConnectorCenter 对话页菜单、WelcomePage 新手引导等），如果只在单个入口订阅 QR URL
* 事件，其他入口触发的 `authQrModal: true` CLI connector 就会错过弹窗。
*
* 把订阅收敛到 store（在 setAdapter 时一次性绑定），所有入口共享同一个
* `qrModalInfo` 状态，组件只需订阅 store 渲染即可。
*/
function ensureQrUrlSubscription(adapter) {
	if (!adapter || qrUrlSubscribedAdapters.has(adapter) || typeof adapter.on !== "function") return;
	qrUrlSubscribedAdapters.add(adapter);
	try {
		adapter.on("connector:auth-qr-url", (data) => {
			const payload = data;
			if (!payload?.configId || !payload?.url) return;
			connectorStore.setState({ qrModalInfo: {
				visible: true,
				configId: payload.configId,
				url: payload.url
			} });
		});
	} catch (error) {
		console.warn("[ConnectorStore] subscribe connector:auth-qr-url failed:", error);
	}
}
/**
* 订阅主进程推来的 OAuth Device Flow 授权信息事件，统一写入 store 的 `deviceCodeInfo`。
*
* 与 `ensureQrUrlSubscription` 的设计动机一致：把订阅收敛到 store，所有 connect 入口
* 共享同一个 modal 状态。
*/
function ensureDeviceCodeSubscription(adapter) {
	if (!adapter || deviceCodeSubscribedAdapters.has(adapter) || typeof adapter.on !== "function") return;
	deviceCodeSubscribedAdapters.add(adapter);
	try {
		adapter.on("connector:device-code", (data) => {
			const payload = data;
			if (!payload?.configId || !payload?.verificationUri) return;
			const expiresIn = typeof payload.expiresIn === "number" && payload.expiresIn > 0 ? payload.expiresIn : void 0;
			connectorStore.setState({ deviceCodeInfo: {
				visible: true,
				configId: payload.configId,
				verificationUri: payload.verificationUri,
				userCode: payload.userCode,
				codeEmbeddedInUri: payload.codeEmbeddedInUri ?? false,
				expiresAt: expiresIn ? Date.now() + expiresIn * 1e3 : void 0
			} });
		});
	} catch (error) {
		console.warn("[ConnectorStore] subscribe connector:device-code failed:", error);
	}
}
var import_zustand, unboundSubscribedAdapters, qrUrlSubscribedAdapters, deviceCodeSubscribedAdapters, autoToggleConnectingIds, MCP_AUTH_TIMEOUT_TOAST_SUPPRESSION_TTL_MS, disconnectDesiredGuard, MAX_CONCURRENT_CONNECTS, activeConnects, connectQueue, CONNECT_RELEASE_DELAY_MS, pendingServerSideOauthAborts, suppressedMcpAuthTimeoutToastExpiresAt, MCP_AUTH_TIMEOUT_TOAST_DROP_WINDOW_MS, lastMcpAuthTimeoutToastAt, isOAuthDeniedError, isAuthTimeoutError, shouldEmitFailureToast, showFirstMcpAuthFailureToast, suppressNextMcpAuthTimeoutToast, consumeMcpAuthTimeoutToastSuppression, USER_INITIATED_CONNECT_TTL_MS, userInitiatedConnectExpiresAt, markUserInitiatedConnect, clearUserInitiatedConnect, peekUserInitiatedConnect, userCancelledFreshConnects, pendingFreshAuthConnects, markUserCancelledFreshConnect, clearUserCancelledFreshConnect, getUserCancelledFreshConnects, TENCENT_DOCS_MCP_CONNECTOR_ID, LEXIANG_MCP_CONNECTOR_ID, IMA_MCP_CONNECTOR_ID$1, TENCENT_DOCS_AUTO_CONNECT_TOAST_KEY, TENCENT_DOCS_PERSONAL_AUTO_CONNECT_TOAST_KEY, TENCENT_DOCS_ENTERPRISE_AUTO_CONNECT_TOAST_KEY, LEXIANG_AUTO_CONNECT_TOAST_KEY, IMA_AUTO_CONNECT_TOAST_KEY, initialConnectors, connectorStore, useConnectorStore;
var init_store = __esmMin((() => {
	init_src();
	import_zustand = require_zustand();
	init_vanilla();
	init_i18n();
	init_connector_auth_registry();
	init_connector_op_mutex();
	init_constants();
	init_desired_state_guard();
	init_preload_helper();
	unboundSubscribedAdapters = /* @__PURE__ */ new WeakSet();
	qrUrlSubscribedAdapters = /* @__PURE__ */ new WeakSet();
	deviceCodeSubscribedAdapters = /* @__PURE__ */ new WeakSet();
	autoToggleConnectingIds = /* @__PURE__ */ new Set();
	MCP_AUTH_TIMEOUT_TOAST_SUPPRESSION_TTL_MS = 60 * 1e3;
	disconnectDesiredGuard = new DesiredStateGuard();
	MAX_CONCURRENT_CONNECTS = 1;
	activeConnects = 0;
	connectQueue = [];
	CONNECT_RELEASE_DELAY_MS = 500;
	pendingServerSideOauthAborts = /* @__PURE__ */ new Map();
	suppressedMcpAuthTimeoutToastExpiresAt = /* @__PURE__ */ new Map();
	MCP_AUTH_TIMEOUT_TOAST_DROP_WINDOW_MS = 500;
	lastMcpAuthTimeoutToastAt = 0;
	isOAuthDeniedError = (error) => !!error && /access_denied/i.test(error);
	isAuthTimeoutError = (error) => {
		if (!error) return false;
		return /auth|authorization|oauth|pre-auth|polling/i.test(error) && /timeout|timed out/i.test(error);
	};
	shouldEmitFailureToast = (nextStatus, error, flags) => {
		if (!nextStatus || nextStatus === "connected") return {
			emit: false,
			reason: "connected"
		};
		if (!error) return {
			emit: false,
			reason: "no-error"
		};
		if (flags.suppressed) return {
			emit: false,
			reason: "suppressed"
		};
		if (isOAuthDeniedError(error)) return {
			emit: true,
			reason: "denied-bypass"
		};
		if (!isAuthTimeoutError(error)) return {
			emit: false,
			reason: "not-auth-timeout"
		};
		if (flags.isUserInitiated) return {
			emit: true,
			reason: "user-initiated"
		};
		return {
			emit: false,
			reason: "not-user-initiated"
		};
	};
	showFirstMcpAuthFailureToast = (name, error) => {
		const now = Date.now();
		if (now - lastMcpAuthTimeoutToastAt < MCP_AUTH_TIMEOUT_TOAST_DROP_WINDOW_MS) return;
		lastMcpAuthTimeoutToastAt = now;
		if (isOAuthDeniedError(error)) toast.warning(t("connectorPanel.authDenied", { name }));
		else if (isAuthTimeoutError(error)) toast.warning(t("connectorPanel.authTimeout", { name }));
	};
	suppressNextMcpAuthTimeoutToast = (configId) => {
		suppressedMcpAuthTimeoutToastExpiresAt.set(configId, Date.now() + MCP_AUTH_TIMEOUT_TOAST_SUPPRESSION_TTL_MS);
	};
	consumeMcpAuthTimeoutToastSuppression = (configId) => {
		const expiresAt = suppressedMcpAuthTimeoutToastExpiresAt.get(configId);
		if (!expiresAt) return false;
		if (Date.now() <= expiresAt) return true;
		suppressedMcpAuthTimeoutToastExpiresAt.delete(configId);
		return false;
	};
	USER_INITIATED_CONNECT_TTL_MS = 300 * 1e3;
	userInitiatedConnectExpiresAt = /* @__PURE__ */ new Map();
	markUserInitiatedConnect = (configId) => {
		userInitiatedConnectExpiresAt.set(configId, Date.now() + USER_INITIATED_CONNECT_TTL_MS);
	};
	clearUserInitiatedConnect = (configId) => {
		userInitiatedConnectExpiresAt.delete(configId);
	};
	peekUserInitiatedConnect = (configId) => {
		const expiresAt = userInitiatedConnectExpiresAt.get(configId);
		if (!expiresAt) return false;
		if (Date.now() > expiresAt) {
			userInitiatedConnectExpiresAt.delete(configId);
			return false;
		}
		return true;
	};
	userCancelledFreshConnects = /* @__PURE__ */ new Set();
	pendingFreshAuthConnects = /* @__PURE__ */ new Set();
	markUserCancelledFreshConnect = (configId) => {
		userCancelledFreshConnects.add(configId);
	};
	clearUserCancelledFreshConnect = (configId) => {
		userCancelledFreshConnects.delete(configId);
	};
	getUserCancelledFreshConnects = () => userCancelledFreshConnects;
	TENCENT_DOCS_MCP_CONNECTOR_ID = "tencent-docs";
	LEXIANG_MCP_CONNECTOR_ID = "lexiang";
	IMA_MCP_CONNECTOR_ID$1 = "ima-mcp";
	TENCENT_DOCS_AUTO_CONNECT_TOAST_KEY = "connectors.tencentDocs.autoConnectToast";
	TENCENT_DOCS_PERSONAL_AUTO_CONNECT_TOAST_KEY = "connectors.tencentDocs.autoConnectToast.personal";
	TENCENT_DOCS_ENTERPRISE_AUTO_CONNECT_TOAST_KEY = "connectors.tencentDocs.autoConnectToast.enterprise";
	LEXIANG_AUTO_CONNECT_TOAST_KEY = "connectors.lexiang.autoConnectToast";
	IMA_AUTO_CONNECT_TOAST_KEY = "connectors.ima.autoConnectToast";
	initialConnectors = {
		github: {
			type: "github",
			displayName: "",
			description: "",
			status: "disconnected",
			enabled: false,
			hasConnected: false,
			selectedRepositories: [],
			prompt: "",
			url: "",
			oauthClientId: "",
			oauthRedirectUrl: "",
			oauthAppName: ""
		},
		gongfeng: {
			type: "gongfeng",
			displayName: "",
			description: "",
			status: "disconnected",
			enabled: false,
			hasConnected: false,
			selectedRepositories: [],
			prompt: "",
			url: "",
			oauthClientId: "",
			oauthRedirectUrl: "",
			oauthAppName: ""
		},
		cnb: {
			type: "cnb",
			displayName: "",
			description: "",
			status: "disconnected",
			enabled: false,
			hasConnected: false,
			selectedRepositories: [],
			prompt: "",
			url: "",
			oauthClientId: "",
			oauthRedirectUrl: "",
			oauthAppName: ""
		},
		figma: {
			type: "figma",
			displayName: "",
			description: "",
			status: "disconnected",
			enabled: false,
			hasConnected: false,
			selectedRepositories: [],
			prompt: "",
			url: "",
			oauthClientId: "",
			oauthRedirectUrl: "",
			oauthAppName: ""
		}
	};
	connectorStore = createStore((set, get) => ({
		connectors: { ...initialConnectors },
		isMenuOpen: false,
		adapter: null,
		connectorModalInfo: {
			visible: false,
			type: "cnb"
		},
		setConnectorModalInfo: (info) => {
			set({ connectorModalInfo: info });
		},
		useConnectorPrompt: (prompt) => {},
		addContentBlocks: (blocks) => {},
		mcpConnectorConfigs: [],
		mcpConnectorStates: {},
		mcpEverConnectedIds: /* @__PURE__ */ new Set(),
		mcpConnectorLoading: false,
		pendingTokenRequest: null,
		resolveTokenRequest: (token) => {
			const req = get().pendingTokenRequest;
			if (req) {
				req.resolve(token);
				set({ pendingTokenRequest: null });
			}
		},
		qrModalInfo: null,
		dismissQrModal: () => set({ qrModalInfo: null }),
		deviceCodeInfo: null,
		dismissDeviceCodeModal: () => set({ deviceCodeInfo: null }),
		setMcpConnectorConfigs: (configs) => {
			set({ mcpConnectorConfigs: configs });
		},
		setMcpConnectorStates: (states) => {
			set((state) => {
				const info = state.deviceCodeInfo;
				if (info?.visible && info.configId) {
					const newStatus = states[info.configId]?.status;
					if (newStatus && newStatus !== "connecting") return {
						mcpConnectorStates: states,
						deviceCodeInfo: null
					};
				}
				return { mcpConnectorStates: states };
			});
		},
		loadMcpConnectors: async () => {
			const { getConnectorManager } = await __vitePreload(async () => {
				const { getConnectorManager } = await import("./app-providers-DKch2dAZ.js");
				return { getConnectorManager };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]), import.meta.url);
			const manager = getConnectorManager();
			if (!manager) return;
			set({ mcpConnectorLoading: true });
			try {
				const [configs, states] = await Promise.all([manager.getConfigs(), manager.getStates()]);
				const cancelledFresh = getUserCancelledFreshConnects();
				const everConnected = /* @__PURE__ */ new Set();
				for (const [id, state] of Object.entries(states || {})) {
					if (cancelledFresh.has(id)) {
						if (state.status === "connected") {
							clearUserCancelledFreshConnect(id);
							everConnected.add(id);
						}
						continue;
					}
					if (state.status === "connected" || state.lastConnectedAt || state.everConnected) everConnected.add(id);
				}
				const currentStates = get().mcpConnectorStates;
				const mergedStates = { ...states };
				for (const [id, localState] of Object.entries(currentStates)) {
					if (localState.status !== "connecting") continue;
					const mergedEntry = mergedStates[id];
					if (!mergedEntry || mergedEntry.status === "disconnected" && !mergedEntry.error) mergedStates[id] = {
						...mergedEntry || { configId: id },
						status: "connecting"
					};
				}
				for (const id of cancelledFresh) {
					const local = currentStates[id];
					if (local?.status === "disconnected" && !local.error) mergedStates[id] = {
						...mergedStates[id] || { configId: id },
						status: "disconnected",
						error: void 0
					};
				}
				for (const [id, localState] of Object.entries(currentStates)) {
					if (!disconnectDesiredGuard.has(id)) continue;
					const serverState = mergedStates[id];
					const reachedDisconnected = !serverState || serverState.status !== "connected" && serverState.status !== "connecting";
					if (disconnectDesiredGuard.shouldKeepPrevious(id, () => reachedDisconnected) && localState.status === "disconnected") mergedStates[id] = {
						...serverState || { configId: id },
						status: "disconnected",
						error: void 0
					};
				}
				set({
					mcpConnectorConfigs: configs || [],
					mcpConnectorStates: mergedStates || {},
					mcpEverConnectedIds: everConnected
				});
			} catch (error) {
				console.error("[ConnectorStore] loadMcpConnectors failed:", error);
			} finally {
				set({ mcpConnectorLoading: false });
			}
		},
		connectMcpConnector: (configId) => runConnectorOpExclusive(configId, async () => {
			disconnectDesiredGuard.clear(configId);
			try {
				const provider = getActiveConnectorAuthProvider(configId);
				if (provider) {
					if (await provider.onConnect(configId)) return {
						success: false,
						cancelled: true
					};
				}
			} catch (err) {
				console.warn("[ConnectorStore] connector auth provider onConnect threw:", err);
			}
			const { getConnectorManager } = await __vitePreload(async () => {
				const { getConnectorManager } = await import("./app-providers-DKch2dAZ.js");
				return { getConnectorManager };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]), import.meta.url);
			const manager = getConnectorManager();
			if (!manager) return {
				success: false,
				error: "ConnectorManager not available"
			};
			markUserInitiatedConnect(configId);
			if (!get().mcpEverConnectedIds.has(configId)) {
				pendingFreshAuthConnects.add(configId);
				clearUserCancelledFreshConnect(configId);
			}
			set((state) => ({ mcpConnectorStates: {
				...state.mcpConnectorStates,
				[configId]: {
					...state.mcpConnectorStates[configId],
					configId,
					status: "connecting",
					error: void 0
				}
			} }));
			try {
				await acquireConnectSlot();
				if (get().mcpConnectorStates[configId]?.status !== "connecting") {
					releaseConnectSlot();
					return {
						success: false,
						cancelled: true
					};
				}
				const abortController = new AbortController();
				pendingServerSideOauthAborts.set(configId, abortController);
				let result;
				try {
					result = await manager.connect(configId, {
						signal: abortController.signal,
						userInitiated: true
					});
				} catch (err) {
					if (err?.name === "AbortError" || abortController.signal.aborted) return {
						success: false,
						cancelled: true
					};
					throw err;
				} finally {
					pendingServerSideOauthAborts.delete(configId);
					releaseConnectSlot();
				}
				if (result.authStart) return {
					success: false,
					authStart: result.authStart
				};
				if (!result.success && !result.error) return { success: false };
				await get().loadMcpConnectors();
				get().dismissQrModal();
				get().dismissDeviceCodeModal();
				if (result.success) {
					if (get().mcpConnectorStates[configId]?.status !== "connected") return {
						success: false,
						needsAuth: true
					};
					clearUserInitiatedConnect(configId);
					pendingFreshAuthConnects.delete(configId);
					clearUserCancelledFreshConnect(configId);
				}
				return {
					success: result.success,
					error: result.error,
					cancelled: result.cancelled
				};
			} catch (error) {
				await get().loadMcpConnectors();
				get().dismissQrModal();
				get().dismissDeviceCodeModal();
				return {
					success: false,
					error: error?.message || "Connection failed"
				};
			}
		}),
		autoEnableMcpConnectorToggle: (configId, toastMessageKey, options) => runConnectorOpExclusive(configId, async () => {
			const { getConnectorManager } = await __vitePreload(async () => {
				const { getConnectorManager } = await import("./app-providers-DKch2dAZ.js");
				return { getConnectorManager };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]), import.meta.url);
			const manager = getConnectorManager();
			if (!manager || autoToggleConnectingIds.has(configId)) return false;
			autoToggleConnectingIds.add(configId);
			try {
				disconnectDesiredGuard.clear(configId);
				await get().loadMcpConnectors();
				const { mcpConnectorStates, mcpConnectorConfigs, mcpEverConnectedIds } = get();
				if (mcpConnectorStates[configId]?.status === "connected") return true;
				if (!mcpConnectorConfigs.find((c) => c.id === configId)) return false;
				if (!mcpEverConnectedIds.has(configId) && !canAutoConnect(configId)) {
					console.info(`[ConnectorStore] autoEnableMcpConnectorToggle skipped: ${configId} never connected`);
					return false;
				}
				set((state) => ({ mcpConnectorStates: {
					...state.mcpConnectorStates,
					[configId]: {
						...state.mcpConnectorStates[configId],
						configId,
						status: "connecting",
						error: void 0
					}
				} }));
				suppressNextMcpAuthTimeoutToast(configId);
				await acquireConnectSlot();
				if (get().mcpConnectorStates[configId]?.status !== "connecting") {
					releaseConnectSlot();
					return false;
				}
				let result;
				try {
					result = await manager.connect(configId, { skipAuth: true });
				} finally {
					releaseConnectSlot();
				}
				await get().loadMcpConnectors();
				const isConnected = get().mcpConnectorStates[configId]?.status === "connected";
				if (result?.success && isConnected) {
					if (!options?.silent && toastMessageKey) toast.success(t(toastMessageKey));
					return true;
				}
				console.warn(`[ConnectorStore] autoEnableMcpConnectorToggle done but not connected: ${configId}`, {
					result,
					status: get().mcpConnectorStates[configId]?.status
				});
				return false;
			} catch (error) {
				await get().loadMcpConnectors();
				console.warn("[ConnectorStore] autoEnableMcpConnectorToggle failed:", error);
				return false;
			} finally {
				autoToggleConnectingIds.delete(configId);
			}
		}),
		disconnectMcpConnector: (configId) => runConnectorOpExclusive(configId, async () => {
			const { getConnectorManager } = await __vitePreload(async () => {
				const { getConnectorManager } = await import("./app-providers-DKch2dAZ.js");
				return { getConnectorManager };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]), import.meta.url);
			const manager = getConnectorManager();
			if (!manager) return {
				success: false,
				error: "ConnectorManager not available"
			};
			clearUserInitiatedConnect(configId);
			disconnectDesiredGuard.setDesired(configId, "disconnected", () => {
				get().loadMcpConnectors().catch(() => {});
			});
			set((state) => ({ mcpConnectorStates: {
				...state.mcpConnectorStates,
				[configId]: {
					...state.mcpConnectorStates[configId],
					configId,
					status: "disconnected",
					error: void 0
				}
			} }));
			try {
				const result = await manager.disconnect(configId);
				await get().loadMcpConnectors();
				return {
					success: result.success,
					error: result.error
				};
			} catch (error) {
				disconnectDesiredGuard.clear(configId);
				await get().loadMcpConnectors();
				return {
					success: false,
					error: error?.message || "Disconnect failed"
				};
			}
		}),
		cancelMcpConnector: async (configId) => {
			const localAbort = pendingServerSideOauthAborts.get(configId);
			if (localAbort) {
				localAbort.abort();
				pendingServerSideOauthAborts.delete(configId);
			}
			clearUserInitiatedConnect(configId);
			const isFreshAuthCancel = pendingFreshAuthConnects.has(configId);
			if (isFreshAuthCancel) {
				markUserCancelledFreshConnect(configId);
				pendingFreshAuthConnects.delete(configId);
			}
			set((state) => {
				const nextEverConnected = isFreshAuthCancel ? (() => {
					const next = new Set(state.mcpEverConnectedIds);
					next.delete(configId);
					return next;
				})() : state.mcpEverConnectedIds;
				return {
					mcpConnectorStates: {
						...state.mcpConnectorStates,
						[configId]: {
							...state.mcpConnectorStates[configId],
							configId,
							status: "disconnected",
							error: void 0
						}
					},
					mcpEverConnectedIds: nextEverConnected
				};
			});
			const { adapter } = get();
			if (!adapter?.cancelConnector) return { success: true };
			try {
				const result = await adapter.cancelConnector(configId);
				return {
					success: result.success,
					error: result.error
				};
			} catch (error) {
				return {
					success: false,
					error: error?.message || "Cancel failed"
				};
			}
		},
		setAdapter: (adapter) => {
			set({ adapter });
			ensureUnboundSubscription(adapter);
			ensureQrUrlSubscription(adapter);
			ensureDeviceCodeSubscription(adapter);
		},
		getSelectedRepositories: (type) => {
			const { connectors } = get();
			return connectors[type].selectedRepositories;
		},
		setMenuOpen: (open) => {
			set({ isMenuOpen: open });
		},
		setConnectors: (connectors) => {
			set((state) => {
				const originalConnectors = state.connectors;
				return { connectors: Object.keys(originalConnectors).reduce((acc, key) => {
					const originalConnector = originalConnectors[key];
					const newConnector = connectors[key];
					return {
						...acc,
						[key]: {
							...originalConnector,
							...newConnector
						}
					};
				}, {}) };
			});
		},
		toggleEnabled: (type) => {
			set((state) => {
				const connector = state.connectors[type];
				if (connector.status !== "connected") return state;
				return { connectors: {
					...state.connectors,
					[type]: {
						...connector,
						enabled: !connector.enabled
					}
				} };
			});
		},
		handleToggleEnabled: async (type, taskId) => {
			const { connectors, adapter, toggleEnabled } = get();
			const connector = connectors[type];
			toggleEnabled(type);
			try {
				if (!taskId) await adapter?.modifyUserConnectorActiveStatus({
					name: type,
					activeStatus: connector.enabled ? 0 : 1
				});
			} catch {
				toast.error(t("connectors.toggleEnabledError"));
				toggleEnabled(type);
			}
		},
		handleRepoSelect: async (type, repo, taskId) => {
			const { addContentBlocks } = get();
			addContentBlocks(createContextBlock(repo.name, t("connectors.repoSkill", {
				type,
				cloneUrl: repo.cloneUrl
			}), { icon: type }));
		},
		handleConnect: async (type, activeStatus, taskId) => {
			const { adapter } = get();
			try {
				await adapter?.modifyUserConnectorActiveStatus({
					name: type,
					activeStatus
				});
				if (taskId) await adapter?.modifyTaskConnectorActiveStatus({
					name: type,
					taskId,
					activeStatus
				});
				set((state) => ({ connectors: {
					...state.connectors,
					[type]: {
						...state.connectors[type],
						enabled: true,
						hasConnected: true
					}
				} }));
			} catch (error) {
				throw error;
			}
		},
		addConnectorTask: async (taskId) => {
			const { adapter, connectors } = get();
			const taskConnectors = Object.values(connectors).map((connector) => {
				const { type, selectedRepositories, enabled } = connector;
				return {
					name: type,
					repos: selectedRepositories.join(","),
					activeStatus: enabled ? 1 : 0
				};
			});
			try {
				await adapter?.addConnectorTask({
					taskId,
					connectors: taskConnectors
				});
			} catch {}
		},
		setConnectStatus: (type, status) => {
			set((state) => ({ connectors: {
				...state.connectors,
				[type]: {
					...state.connectors[type],
					status,
					...status === "connected" ? { hasConnected: true } : {}
				}
			} }));
		},
		setSelectedRepositories: (type, selectedRepositories) => {
			set((state) => ({ connectors: {
				...state.connectors,
				[type]: {
					...state.connectors[type],
					selectedRepositories
				}
			} }));
		},
		setAllRepositories: (type, allRepositories) => {
			set((state) => ({ connectors: {
				...state.connectors,
				[type]: {
					...state.connectors[type],
					allRepositories
				}
			} }));
		},
		reset: () => {
			set({
				connectors: { ...initialConnectors },
				isMenuOpen: false
			});
		},
		getAllRepositories: async (type) => {
			const { adapter, connectors, setAllRepositories, setConnectStatus } = get();
			if (connectors[type]?.status !== "connected") return;
			try {
				const res = await adapter?.getRepoList({ name: type });
				if (type === "github" && res?.github_repos) setAllRepositories("github", Object.values(res.github_repos).flat().map((repo) => ({
					name: repo.name,
					cloneUrl: repo.clone_url,
					group: repo.owner?.login
				})));
				else if (type === "gongfeng") setAllRepositories("gongfeng", res?.gongfeng_repos?.map((v) => ({
					name: v.name,
					cloneUrl: v.https_url_to_repo,
					group: v.path_with_namespace?.split("/").slice(0, -1).join("/") || v.namespace?.path
				})) ?? []);
				else if (type === "cnb") setAllRepositories("cnb", res?.cnb_repos?.map((v) => ({
					name: v.name,
					cloneUrl: v.web_url,
					group: v.path?.split("/").slice(0, -1).join("/")
				})) ?? []);
			} catch (error) {
				const code = error?.response?.data?.code;
				if (CONNECTOR_NO_AUTH.includes(code)) setConnectStatus(type, "disconnected");
				if (10098 === code) setAllRepositories(type, []);
				throw error;
			}
		},
		getUser: async (type) => {
			const { adapter, connectors, setConnectStatus } = get();
			if (connectors[type]?.status !== "connected") return;
			if (!adapter) return;
			try {
				const res = await adapter?.getOauthUser({ name: type });
				set((state) => ({ connectors: {
					...state.connectors,
					[type]: {
						...state.connectors[type],
						user: res.user
					}
				} }));
			} catch (error) {
				const code = error?.response?.data?.code;
				if (CONNECTOR_NO_AUTH.includes(code)) setConnectStatus(type, "disconnected");
				throw error;
			}
		},
		revokeAll: async (type) => {
			const { getConnectorManager } = await __vitePreload(async () => {
				const { getConnectorManager } = await import("./app-providers-DKch2dAZ.js");
				return { getConnectorManager };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83]), import.meta.url);
			const manager = getConnectorManager();
			const { connectors } = get();
			const connector = connectors[type];
			if (!manager) throw new Error("ConnectorManager not available");
			await manager.authRevoke(type);
			set({ connectors: {
				...connectors,
				[type]: {
					...connector,
					status: "disconnected"
				}
			} });
		}
	}));
	useConnectorStore = (selector) => (0, import_zustand.useStore)(connectorStore, selector);
}));
//#endregion
//#region ../../packages/agent-ui/src/telemetry/adapter-telemetry-service.ts
/**
* 获取或生成 machineId（CLOUD 模式）
* 使用 crypto.randomUUID() 生成，持久化到 localStorage
*/
function getOrCreateMachineId() {
	try {
		const stored = localStorage.getItem(MACHINE_ID_STORAGE_KEY);
		if (stored) return stored;
		const newId = crypto.randomUUID();
		localStorage.setItem(MACHINE_ID_STORAGE_KEY, newId);
		return newId;
	} catch {
		return crypto.randomUUID();
	}
}
/**
* agent_task_created 事件字段名映射：代码字段名 → 数据字典字段名
* mode → source, agent_mode → mode, task_mode → name,
* model → requestModelId, template_id → action
*/
function mapTaskCreatedPayload(payload, envMode) {
	const { mode: _mode, task_mode, agent_mode, model, template_id, ...rest } = payload;
	return {
		...rest,
		source: envMode,
		name: task_mode,
		mode: agent_mode,
		requestModelId: model,
		action: template_id
	};
}
/**
* subscribe_quota_trigger 字段映射：quotaMode → mode（代码字段名 → 数据字典字段名）
*/
function mapSubscribeQuotaTriggerPayload(payload) {
	const { mode: _mode, quotaMode, ...rest } = payload;
	return {
		...rest,
		mode: quotaMode
	};
}
/**
* subscribe_expire_remind 字段映射：expireMode → mode（代码字段名 → 数据字典字段名）
*/
function mapSubscribeExpireRemindPayload(payload) {
	const { mode: _mode, expireMode, ...rest } = payload;
	return {
		...rest,
		mode: expireMode
	};
}
var EVENT_NAME_MAPPING, MACHINE_ID_STORAGE_KEY, AdapterTelemetryService;
var init_adapter_telemetry_service = __esmMin((() => {
	init_types();
	EVENT_NAME_MAPPING = {
		[AgentTelemetryEvents.NewTaskButtonClicked]: "agent_new_task_button_clicked",
		[AgentTelemetryEvents.GroupNewTaskButtonClicked]: "agent_group_new_task_button_clicked",
		[AgentTelemetryEvents.TaskArchiveClicked]: "agent_task_archive_clicked",
		[AgentTelemetryEvents.TaskDeleteClicked]: "agent_task_delete_clicked",
		[AgentTelemetryEvents.TaskArchived]: "agent_task_archived",
		[AgentTelemetryEvents.TaskDeleted]: "agent_task_deleted",
		[AgentTelemetryEvents.TaskFilterApplied]: "agent_task_filter_applied",
		[AgentTelemetryEvents.TaskCreated]: "agent_task_created",
		[AgentTelemetryEvents.TaskModeSwitched]: "agent_task_mode_switched",
		[AgentTelemetryEvents.TemplateClicked]: "agent_template_clicked",
		[AgentTelemetryEvents.ConnectorAuthInitiated]: "agent_connector_auth_initiated",
		[AgentTelemetryEvents.UploadFileClicked]: "agent_upload_file_clicked",
		[AgentTelemetryEvents.TaskTitleEdited]: "agent_task_title_edited",
		[AgentTelemetryEvents.EditorOpened]: "agent_editor_opened",
		[AgentTelemetryEvents.ConnectorEntryShow]: "connector_entry_show",
		[AgentTelemetryEvents.ConnectorEntryClick]: "connector_entry_click",
		[AgentTelemetryEvents.ConnectorAuthResult]: "connector_auth_result",
		[AgentTelemetryEvents.ConnectorDetailShow]: "connector_detail_show",
		[AgentTelemetryEvents.ConnectorUnbind]: "connector_unbind",
		[AgentTelemetryEvents.ConnectorInvoke]: "connector_invoke",
		[AgentTelemetryEvents.ConnectorManagementShow]: "connector_management_show",
		[AgentTelemetryEvents.CustomMcpEntryClick]: "custom_mcp_entry_click",
		[AgentTelemetryEvents.CustomMcpConnectSuccess]: "custom_mcp_connect_success",
		[AgentTelemetryEvents.ArtifactTopMenuClicked]: "agent_artifact_top_menu_clicked",
		[AgentTelemetryEvents.ArtifactSidebarClicked]: "agent_artifact_sidebar_clicked",
		[AgentTelemetryEvents.ArtifactDownloadClicked]: "agent_artifact_download_clicked",
		[AgentTelemetryEvents.WebPageShow]: "web_page_show",
		[AgentTelemetryEvents.AgentsPageVisit]: "agents_page_visit",
		[AgentTelemetryEvents.PluginMarketplaceAction]: "plugin_marketplace_action",
		[AgentTelemetryEvents.PluginMarketplacePageShow]: "plugin_marketplace_page_show",
		[AgentTelemetryEvents.PluginAction]: "plugin_action",
		[AgentTelemetryEvents.PluginCapabilityCall]: "plugin_capability_call",
		[AgentTelemetryEvents.SkillInstalled]: "skill_installed",
		[AgentTelemetryEvents.SkillAction]: "skill_action",
		[AgentTelemetryEvents.SkillUrlInstallFlow]: "skill_url_install_flow",
		[AgentTelemetryEvents.WechatLinked]: "wechat_linked",
		[AgentTelemetryEvents.ExpertSummoned]: "expert_summoned",
		[AgentTelemetryEvents.TemplateUsed]: "template_used",
		[AgentTelemetryEvents.ExpertIndustryClick]: "expert_industry_click",
		[AgentTelemetryEvents.ExpertSummonClick]: "expert_summon_click",
		[AgentTelemetryEvents.ExpertActualUse]: "expert_actual_use",
		[AgentTelemetryEvents.ExpertMenuClick]: "expert_menu_click",
		[AgentTelemetryEvents.ExpertSearch]: "expert_search",
		[AgentTelemetryEvents.ExpertCreateClick]: "expert_create_click",
		[AgentTelemetryEvents.ExpertCreateSuccess]: "expert_create_success",
		[AgentTelemetryEvents.ExpertUploadSuccess]: "expert_upload_success",
		[AgentTelemetryEvents.ExpertImportSuccess]: "expert_import_success",
		[AgentTelemetryEvents.CheckinCardShow]: "checkin_card_show",
		[AgentTelemetryEvents.CheckinClaimClick]: "checkin_claim_click",
		[AgentTelemetryEvents.CheckinExpertEntryClick]: "checkin_expert_entry_click",
		[AgentTelemetryEvents.TaskCreatedWithTemplate]: "agent_task_created_with_template",
		[AgentTelemetryEvents.AutomatedTaskCreateSuc]: "automated_task_create_suc",
		[AgentTelemetryEvents.AutomatedTaskDelete]: "automated_task_delete",
		[AgentTelemetryEvents.AutomatedTaskExecute]: "automated_task_execute",
		[AgentTelemetryEvents.WebElementClick]: "web_element_click",
		[AgentTelemetryEvents.PlaybookCtaClick]: "playbook_cta_click",
		[AgentTelemetryEvents.PlaybookPromptSend]: "playbook_prompt_send",
		[AgentTelemetryEvents.PlaybookSearch]: "playbook_search",
		[AgentTelemetryEvents.CollabTaskEndTurnFallback]: "collab_task_end_turn_fallback",
		[AgentTelemetryEvents.ProjectTaskQuerySend]: "project_task_query_send",
		[AgentTelemetryEvents.CollabTaskLiveLoopError]: "collab_task_live_loop_error",
		[AgentTelemetryEvents.AgentMailAction]: "agent_mail_action",
		[AgentTelemetryEvents.DataRetentionDropdownClick]: "data_retention_dropdown_click",
		[AgentTelemetryEvents.DataRetentionPolicySelect]: "data_retention_policy_select",
		[AgentTelemetryEvents.DataRetentionToastShow]: "data_retention_toast_show",
		[AgentTelemetryEvents.SkillRecommend]: "skill_recommend",
		[AgentTelemetryEvents.SkillRequestSend]: "skill_request_send",
		[AgentTelemetryEvents.ProxySettingPageView]: "proxy_setting_page_view",
		[AgentTelemetryEvents.ProxyModeChange]: "proxy_mode_change",
		[AgentTelemetryEvents.ProxyUrlInput]: "proxy_url_input",
		[AgentTelemetryEvents.ProxyTestClick]: "proxy_test_click",
		[AgentTelemetryEvents.ProxyTestResult]: "proxy_test_result",
		[AgentTelemetryEvents.ProxySaveSuccess]: "proxy_save_success",
		[AgentTelemetryEvents.IntentSuggestedSearch]: "intent_suggested_search",
		[AgentTelemetryEvents.IntentSuggestedClick]: "intent_suggested_click",
		[AgentTelemetryEvents.SubscribeEntryClick]: "subscribe_entry_click",
		[AgentTelemetryEvents.SubscribeQuotaTrigger]: "subscribe_quota_trigger",
		[AgentTelemetryEvents.SubscribeExpireRemind]: "subscribe_expire_remind"
	};
	MACHINE_ID_STORAGE_KEY = "agents_machine_id";
	AdapterTelemetryService = class {
		constructor(config) {
			this.adapter = config.adapter;
			this.mode = config.adapter.environmentType === "local" ? "LOCAL" : "CLOUD";
			this.debug = config.debug ?? false;
			this.log("AdapterTelemetryService created", { mode: this.mode });
		}
		/**
		* 上报埋点事件
		*/
		report(eventName, payload) {
			try {
				const fullPayload = {
					...payload,
					mode: this.mode,
					...this.mode === "CLOUD" ? {
						ideName: "web-Agents",
						ideType: "web-Agents",
						machineId: getOrCreateMachineId()
					} : {}
				};
				const telemetryEventName = EVENT_NAME_MAPPING[eventName];
				if (!telemetryEventName) {
					console.warn("[AdapterTelemetryService] Unknown event name:", eventName);
					return;
				}
				let reportPayload = fullPayload;
				if (eventName === AgentTelemetryEvents.TaskCreated) reportPayload = mapTaskCreatedPayload(reportPayload, this.mode);
				else if (eventName === AgentTelemetryEvents.SubscribeQuotaTrigger) reportPayload = mapSubscribeQuotaTriggerPayload(reportPayload);
				else if (eventName === AgentTelemetryEvents.SubscribeExpireRemind) reportPayload = mapSubscribeExpireRemindPayload(reportPayload);
				this.log("Reporting telemetry", {
					eventName: telemetryEventName,
					payload: reportPayload
				});
				this.adapter.reportTelemetry(telemetryEventName, reportPayload);
			} catch (error) {
				console.error("[AdapterTelemetryService] Report failed:", error);
			}
		}
		/**
		* 获取当前环境模式
		*/
		getMode() {
			return this.mode;
		}
		/**
		* 销毁服务
		*/
		dispose() {
			this.log("AdapterTelemetryService disposed");
		}
		/**
		* 调试日志
		*/
		log(message, data) {
			if (this.debug) console.log(`[AdapterTelemetryService] ${message}`, data ?? "");
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/telemetry/connector-utils.ts
var inferConnectorKind;
var init_connector_utils = __esmMin((() => {
	inferConnectorKind = (connector) => {
		if (connector.type === "cli") return "oauthCli";
		if (connector.authMode === "token") return "tokenMCP";
		return "oauthMCP";
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/connector/telemetry-helpers.ts
/** 登记「跳资料库授权」的来源入口。navigate 前调用。 */
function markLibraryAuthEntry(connectorId, entry) {
	pendingLibraryAuthEntries.set(connectorId, entry);
}
/** 消费登记过的入口。resolve 一次后即删除，避免残留。 */
function consumeLibraryAuthEntry(connectorId) {
	const entry = pendingLibraryAuthEntries.get(connectorId);
	if (entry !== void 0) pendingLibraryAuthEntries.delete(connectorId);
	return entry;
}
/**
* 上报「跳资料库授权」流程的连接器授权成功事件。
*
* 与其它 OAuth connector 从 panel/capsule 上报的 ConnectorAuthResult 保持
* 同一 schema，走同一 AdapterTelemetryService 通道，公共字段完整。
*
* @param adapter agent-adapter 实例，用于构造 AdapterTelemetryService
* @param connectorId 完整 connector id（如 'tencent-docs'、'tencent-docs-oa'、'lexiang'、'ima-mcp'）
* @param opts.startTime 授权发起时间戳（用于计算 cost）。资料库授权中间有用户交互，
*                       耗时未必有精确含义，调用方按能拿到的最合理起点传即可。
* @param opts.entry 上报入口（沿用 ConnectorEntryType 枚举值）。若不传，helper 会
*                   优先消费 `markLibraryAuthEntry` 登记的值；仍拿不到则 fallback
*                   到 'management_page'（大多数登记缺失的入口如详情弹窗 / 侧边栏
*                   都属于管理/配置类场景）。
*
* 失败时静默吞异常（埋点故障不能影响业务流），只打 warn。
*/
function reportLibraryAuthConnectorSuccess(adapter, connectorId, opts) {
	if (!adapter) return;
	try {
		const { mcpConnectorConfigs, mcpEverConnectedIds } = connectorStore.getState();
		const config = mcpConnectorConfigs.find((c) => c.id === connectorId);
		if (!config) {
			console.warn("[connector-telemetry] library auth report skipped: config not found", connectorId);
			return;
		}
		const isReconnect = mcpEverConnectedIds.has(connectorId);
		const startTime = opts?.startTime ?? Date.now();
		const entry = opts?.entry ?? consumeLibraryAuthEntry(connectorId) ?? "management_page";
		new AdapterTelemetryService({ adapter }).report(AgentTelemetryEvents.ConnectorAuthResult, {
			entry,
			connectorId: config.id,
			connectorName: config.name,
			connectorType: inferConnectorKind(config),
			isOfficial: true,
			isSuccessful: true,
			status: "success",
			cost: Math.max(0, Date.now() - startTime),
			isReconnect,
			resultAt: Date.now()
		});
	} catch (err) {
		console.warn("[connector-telemetry] library auth report failed:", err);
	}
}
/** 登记「Token Schema 授权」的来源入口。`connectMcpConnector` 调用前调用。 */
function markTokenSchemaAuthEntry(connectorId, entry) {
	pendingTokenSchemaAuthEntries.set(connectorId, entry);
}
/** 消费登记过的入口。resolve 一次后即删除，避免残留。 */
function consumeTokenSchemaAuthEntry(connectorId) {
	const entry = pendingTokenSchemaAuthEntries.get(connectorId);
	if (entry !== void 0) pendingTokenSchemaAuthEntries.delete(connectorId);
	return entry;
}
/**
* 上报「Token Schema 表单授权」流程的连接器授权结果（成功/失败/取消）。
*
* 服务于 `ConnectorTokenConfigGate`（workbuddy-app 包）：该 Gate 是渡层顶层
* sibling 组件，弹出 TAPD / 携程问道等 `needsTokenConfig` 驱动的表单，不在
* 任何 connector UI 组件子树内，也拿不到 agent-ui 侧任何 React reporter，
* 因此同样走 AdapterTelemetryService 直连上报。
*
* @param adapter agent-adapter 实例，用于构造 AdapterTelemetryService
* @param connectorId 完整 connector id（如 'tapd'、'ctrip-wendao'）
* @param result.success 是否成功；false 时应带 errorMessage（含用户取消场景）
* @param result.startTime 授权发起时间戳（Modal 打开时记录），用于计算 cost
* @param result.entry 上报入口。若不传，优先消费 `markTokenSchemaAuthEntry`
*                     登记的值；仍拿不到则 fallback 到 'management_page'
* @param result.errorMessage 失败原因；用户主动取消传 'user_cancelled'
*
* 失败时静默吞异常（埋点故障不能影响业务流），只打 warn。
*/
function reportTokenSchemaAuthResult(adapter, connectorId, result) {
	if (!adapter) return;
	try {
		const { mcpConnectorConfigs, mcpEverConnectedIds } = connectorStore.getState();
		const config = mcpConnectorConfigs.find((c) => c.id === connectorId);
		if (!config) {
			console.warn("[connector-telemetry] token schema auth report skipped: config not found", connectorId);
			return;
		}
		const isReconnect = mcpEverConnectedIds.has(connectorId);
		const startTime = result.startTime ?? Date.now();
		const entry = result.entry ?? consumeTokenSchemaAuthEntry(connectorId) ?? "management_page";
		const errorMessage = result.errorMessage;
		let errorCode;
		if (!result.success) if (errorMessage) {
			const normalized = errorMessage.split(":")[0]?.trim().slice(0, 64);
			errorCode = normalized && normalized.length > 0 ? normalized : "connect_failed";
		} else errorCode = "connect_failed";
		new AdapterTelemetryService({ adapter }).report(AgentTelemetryEvents.ConnectorAuthResult, {
			entry,
			connectorId: config.id,
			connectorName: config.name,
			connectorType: inferConnectorKind(config),
			isOfficial: true,
			isSuccessful: result.success,
			status: result.success ? "success" : "failed",
			errorCode,
			errorMessage,
			cost: Math.max(0, Date.now() - startTime),
			isReconnect,
			resultAt: Date.now()
		});
	} catch (err) {
		console.warn("[connector-telemetry] token schema auth report failed:", err);
	}
}
var pendingLibraryAuthEntries, pendingTokenSchemaAuthEntries;
var init_telemetry_helpers = __esmMin((() => {
	init_adapter_telemetry_service();
	init_connector_utils();
	init_types();
	init_store();
	pendingLibraryAuthEntries = /* @__PURE__ */ new Map();
	pendingTokenSchemaAuthEntries = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/hooks/ima-auth-store.ts
/**
* 把 adapter 上的连接器事件桥接到 imaAuthStore。
* 幂等：每个 adapter 只绑定一次（WeakSet 防重）
*/
function ensureConnectorEventSubscription(adapter) {
	if (subscribedAdapters.has(adapter) || typeof adapter.on !== "function") return;
	subscribedAdapters.add(adapter);
	try {
		adapter.on("connector:unbound", (data) => {
			if (data?.configId !== "ima-mcp") return;
			console.info("[IMA Store] received connector:unbound — revoking auth & resetting state");
			imaAuthStore.getState().handleConnectorUnbound();
		});
	} catch (error) {
		console.warn("[IMA Store] subscribe connector:unbound failed:", error);
	}
	try {
		adapter.on("connector:unauthorized", (data) => {
			const payload = data;
			if (payload?.configId !== "ima-mcp") return;
			console.info("[IMA Store] received connector:unauthorized — attempting token refresh:", payload.reason?.substring(0, 100));
			handleUnauthorized();
		});
	} catch (error) {
		console.warn("[IMA Store] subscribe connector:unauthorized failed:", error);
	}
}
/**
* 处理 connector:unauthorized：尝试 refresh，失败则 markExpired
*
* 走 silent 模式同步：token 刷新是被动行为（主进程主动通知 401），不应擅自把
* connector toggle 重新打开 —— 用户可能已在对话页主动关闭过 IMA connector。
*/
async function handleUnauthorized() {
	if (!_bridge) return;
	try {
		await _bridge.imaAuthRefresh();
		const status = await _bridge.imaAuthStatus();
		if (status?.authed && status.mcpToken) {
			syncImaMcpToken(status.mcpToken);
			imaAuthStore.setState({ authStatus: "connected" });
		} else imaAuthStore.getState().markExpired();
	} catch (err) {
		console.warn("[IMA Store] refresh after connector:unauthorized failed:", err);
		imaAuthStore.getState().markExpired();
	}
}
/**
* 把 mcp_token 同步到 connector headers，并标记 connector 为"已授权但开关未打开"。
*
* C 端默认关闭策略：
* - 仅 updateConnectorHeaders + markImaMcpConnectorAuthorized + loadMcpConnectors
* - 不调 connectMcpConnector（不建立 MCP 连接、不改 enabled）
* - daemon 端 updateHeaders 检测到 C 端 connector 首次拿到有效 token 时，
*   会自动设置 everConnected + userDisabled=true
* - 用户手动打开开关时走 connect() → markConnectorUserEnabled → 建立 MCP 连接
*/
function markImaMcpConnectorAuthorized() {
	connectorStore.setState((state) => {
		const prevState = state.mcpConnectorStates[IMA_MCP_CONNECTOR_ID];
		const nextEverConnected = new Set(state.mcpEverConnectedIds);
		nextEverConnected.add(IMA_MCP_CONNECTOR_ID);
		return {
			mcpConnectorStates: {
				...state.mcpConnectorStates,
				[IMA_MCP_CONNECTOR_ID]: {
					...prevState,
					configId: IMA_MCP_CONNECTOR_ID,
					status: prevState?.status === "connected" || prevState?.status === "connecting" ? prevState.status : "disconnected",
					needsAuth: false,
					everConnected: true
				}
			},
			mcpEverConnectedIds: nextEverConnected
		};
	});
}
function syncImaMcpToken(mcpToken) {
	const { adapter } = connectorStore.getState();
	if (!adapter?.updateConnectorHeaders) {
		console.warn("[IMA Store] syncImaMcpToken: adapter or updateConnectorHeaders not available, skipping");
		return;
	}
	adapter.updateConnectorHeaders(IMA_MCP_CONNECTOR_ID, { Authorization: mcpToken }).then((result) => {
		if (!result?.success) {
			console.warn("[IMA Store] sync mcp_token failed:", result?.error);
			return;
		}
		markImaMcpConnectorAuthorized();
		connectorStore.getState().loadMcpConnectors().catch((err) => {
			console.warn("[IMA Store] loadMcpConnectors after token sync threw:", err);
		});
	}).catch((error) => {
		console.warn("[IMA Store] sync mcp_token threw:", error);
	});
}
/** 清掉 connector headers 中的 Authorization */
function clearImaMcpToken() {
	const { adapter } = connectorStore.getState();
	if (!adapter?.updateConnectorHeaders) return;
	adapter.updateConnectorHeaders(IMA_MCP_CONNECTOR_ID, { Authorization: "" }).catch((error) => {
		console.warn("[IMA Store] clear mcp_token threw:", error);
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
async function syncConnectorAuthStatusWithBoard(boardAuthed, mcpToken, _options) {
	const { adapter } = connectorStore.getState();
	if (!adapter) return;
	try {
		await connectorStore.getState().loadMcpConnectors();
		const connectorState = connectorStore.getState().mcpConnectorStates[IMA_MCP_CONNECTOR_ID];
		if (boardAuthed) {
			if (mcpToken && shouldAuthorizeConnectorFromBoard(connectorState)) {
				syncImaMcpToken(mcpToken);
				return;
			}
			if (mcpToken) syncImaMcpToken(mcpToken);
			return;
		}
		if (!shouldUnbindConnectorFromBoard(connectorState)) {
			clearImaMcpToken();
			return;
		}
		if (adapter.unbindConnector) {
			const result = await adapter.unbindConnector(IMA_MCP_CONNECTOR_ID);
			if (!result?.success) console.warn("[IMA Store] unbind connector after board auth mismatch failed:", result?.error);
		} else clearImaMcpToken();
		await connectorStore.getState().loadMcpConnectors();
	} catch (error) {
		console.warn("[IMA Store] sync connector auth status with board failed:", error);
	}
}
/** 清理遗留的 localStorage key（升级后首次运行时一次性清理） */
function cleanupLegacyLocalStorageKeys() {
	try {
		localStorage.removeItem("ima-mcp-connected");
		localStorage.removeItem("ima-ever-authed");
	} catch {}
}
var IMA_MCP_CONNECTOR_ID, subscribedAdapters, _bridge, _adapter, imaAuthStore;
var init_ima_auth_store = __esmMin((() => {
	init_vanilla();
	init_store();
	init_telemetry_helpers();
	IMA_MCP_CONNECTOR_ID = "ima-mcp";
	subscribedAdapters = /* @__PURE__ */ new WeakSet();
	_bridge = null;
	_adapter = null;
	imaAuthStore = createStore((set, get) => {
		cleanupLegacyLocalStorageKeys();
		return {
			authStatus: "checking",
			bridgeReady: false,
			init: (adapter, bridge) => {
				const prevAdapter = _adapter;
				const prevBridge = _bridge;
				_adapter = adapter;
				_bridge = bridge;
				if (!get().bridgeReady) set({ bridgeReady: true });
				ensureConnectorEventSubscription(adapter);
				const connectorState = connectorStore.getState();
				if (connectorState.adapter !== adapter) connectorState.setAdapter(adapter);
				if (prevAdapter !== adapter || prevBridge !== bridge) {
					if (get().authStatus === "not_connected") get().checkAuthStatus().catch(() => {});
				}
			},
			checkAuthStatus: async (options) => {
				const silent = options?.silent !== false;
				if (!_bridge) {
					set({ authStatus: "not_connected" });
					return;
				}
				set({ authStatus: "checking" });
				try {
					const status = await _bridge.imaAuthStatus();
					if (status?.authed && status.mcpToken) {
						if (silent) await syncConnectorAuthStatusWithBoard(true, status.mcpToken, { silent: true });
						else {
							syncImaMcpToken(status.mcpToken);
							reportLibraryAuthConnectorSuccess(_adapter, IMA_MCP_CONNECTOR_ID);
						}
						set({ authStatus: "connected" });
					} else {
						set({ authStatus: "not_connected" });
						await syncConnectorAuthStatusWithBoard(false, void 0);
					}
				} catch (err) {
					console.warn("[IMA Store] checkAuthStatus failed:", err);
					set({ authStatus: "not_connected" });
				}
			},
			markExpired: () => {
				set({ authStatus: "expired" });
				clearImaMcpToken();
			},
			handleConnectorUnbound: () => {
				set({ authStatus: "not_connected" });
				if (_bridge) _bridge.imaAuthLogout().catch((err) => {
					console.warn("[IMA Store] imaAuthLogout after connector:unbound failed:", err);
				});
				clearImaMcpToken();
				connectorStore.setState((state) => ({ mcpConnectorStates: {
					...state.mcpConnectorStates,
					[IMA_MCP_CONNECTOR_ID]: {
						...state.mcpConnectorStates[IMA_MCP_CONNECTOR_ID],
						configId: IMA_MCP_CONNECTOR_ID,
						status: "disconnected",
						error: void 0
					}
				} }));
			},
			reset: () => {
				console.info("[IMA Store] reset — clearing all IMA auth state (account switch / logout)");
				set({ authStatus: "checking" });
				clearImaMcpToken();
			}
		};
	});
}));
//#endregion
export { init_desired_state_guard as A, init_connector_auth_registry as B, peekUserInitiatedConnect as C, suppressNextMcpAuthTimeoutToast as D, showFirstMcpAuthFailureToast as E, REQ_OVER_LIMIT as F, TOKEN_INVALID as I, TOKEN_NO_AUTH as L, FILE_NOT_FOUND as M, FILE_NO_AUTH as N, useConnectorStore as O, REPO_NO_AUTH as P, init_constants as R, markUserInitiatedConnect as S, shouldEmitFailureToast as T, registerConnectorAuthProvider as V, TENCENT_DOCS_MCP_CONNECTOR_ID as _, markLibraryAuthEntry as a, consumeMcpAuthTimeoutToastSuppression as b, reportTokenSchemaAuthResult as c, AdapterTelemetryService as d, init_adapter_telemetry_service as f, LEXIANG_MCP_CONNECTOR_ID as g, LEXIANG_AUTO_CONNECT_TOAST_KEY as h, init_telemetry_helpers as i, CONNECTOR_NO_AUTH as j, DesiredStateGuard as k, inferConnectorKind as l, IMA_MCP_CONNECTOR_ID$1 as m, imaAuthStore as n, markTokenSchemaAuthEntry as o, IMA_AUTO_CONNECT_TOAST_KEY as p, init_ima_auth_store as r, reportLibraryAuthConnectorSuccess as s, IMA_MCP_CONNECTOR_ID as t, init_connector_utils as u, clearUserInitiatedConnect as v, pickTencentDocsAutoConnectToastKey as w, init_store as x, connectorStore as y, getActiveConnectorAuthProvider as z };
