import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $u as init_utils, Ai as extractDirFromPath, At as formatShortcut, Cs as init_shortcut_storage, Ct as init_voice_input, Dt as ASR_TIMEOUT_MS, Oi as convertFilesToSuggestions, Ot as init_constants, Qc as useCancellableConnecting, Qu as getConnectorVersionIncompatibilityLabel, Rl as init_use_vpc_connector_policy, Ss as SHORTCUT_CHANGE_EVENT, Tt as useVoiceInput, Zc as init_use_cancellable_connecting, _a as fetchPersonalSkillInfos, _s as getCurrentBinding, ba as pickLocalizedDescription, bs as matchesBinding, ed as isConnectorVersionIncompatible, ji as init_mention_converters, jt as init_shortcut_formatter, ki as convertToContentBlock, ld as init_use_ima_enabled, td as isConnectorVisible, ud as useImaEnabled, va as init_skill_list_core, vs as init_shortcut_registry, xs as parseBinding, ya as mergeTeamSkills, zl as useVpcConnectorPolicy } from "./agent-mail-CiuzbR2o.js";
import { Bo as PhraseTrigger, Hs as createFileBlock, Ks as generateBlockId, Vo as CommandCategory, Ws as createImageBlock, Yr as toast, cc as BlockMeta, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { b as isWorkBuddyDesktop, p as init_environment } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as BehaviorSubject, n as init__esm5 } from "./_esm5-RYAsZ7Wr.js";
import { ht as useVoiceInputFeature, t as init_product_features } from "./product-features-N4Z0q4SS.js";
import { O as useConnectorStore, a as markLibraryAuthEntry, i as init_telemetry_helpers, x as init_store, y as connectorStore } from "./ima-auth-store-Cq8i4JCG.js";
import { t as init_common } from "./common-Czfscgga.js";
import { i as useModuleHost, r as useFacade } from "./module-host-context-CI9spvhq.js";
import { D as useSkillUploadPolicy, E as init_use_skill_upload_policy, M as init_use_delayed_visible, N as useDelayedVisible, S as init_use_installed_skills, T as PersonalSkillImportModal, r as useSkillUploadModal, t as init_components, w as usePersonalSkillImport, x as buildPolicyDeniedMessage } from "./components-2rgQGZi4.js";
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-attachment-add-menu-provider.ts
/**
* 返回一个可以直接合并进 `providers.attachment` 的 patch（仅包含加号菜单相关字段）。
* 宿主再与 wrapper 已有的 `constraints / onPaste / onError / process` 合并即可得到
* 完整的 `InputAttachmentProvider`。
*/
function useAttachmentAddMenuProvider(options) {
	const { onPickLocalFiles, onPickNetDrive, onPickTencentDocs, onPickTencentLexiang, extraItems } = options;
	return (0, import_react$16.useMemo)(() => ({
		onPickLocalFiles: onPickLocalFiles ? () => {
			onPickLocalFiles();
		} : void 0,
		onPickNetDrive,
		onPickTencentDocs,
		onPickTencentLexiang,
		extraItems
	}), [
		onPickLocalFiles,
		onPickNetDrive,
		onPickTencentDocs,
		onPickTencentLexiang,
		extraItems
	]);
}
var import_react$16;
var init_use_attachment_add_menu_provider = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/data/use-connector-default-actions.ts
/**
* 从 `InputConnectorItem` 取出原始 `ConnectorConfigInfo`。
* `useConnectorProvider` 里我们把原 config 塞进了 `item.raw`；宿主自传 items 时
* 可能没有 raw —— 这时按最小信息回退（只有 id/name，无法调 store 方法）。
*/
function getConfigFromItem(item) {
	const raw = item.raw;
	return raw && typeof raw === "object" && "id" in raw ? raw : null;
}
function useConnectorDefaultActions() {
	const t = useTranslation();
	const { disableAllExtensions, setDisableAllExtensionsState } = useConversations();
	/** 用户点了「打开」toggle：先试自动启用（复用缓存授权），成功即连；否则退回首次授权链路。 */
	const defaultOnConnectItem = (0, import_react$15.useCallback)(async (item) => {
		const config = getConfigFromItem(item);
		if (!config) {
			toast.error(t("connectorPanel.connectError", { error: item.name }));
			return;
		}
		if (!(connectorStore.getState().mcpConnectorStates[config.id]?.status === "connected")) {
			if (config.authMode !== "token") toast({
				message: t("connectorPanel.redirectAuth"),
				type: "plain"
			});
			markLibraryAuthEntry(config.id, "add_menu");
			const result = await connectorStore.getState().connectMcpConnector(config.id);
			if (result.success) {
				if (disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
				toast.success(t("connectorPanel.connectSuccess", { name: config.name }));
				return;
			}
			if (result.error) toast.error(t("connectorPanel.namedConnectError", {
				name: config.name,
				error: result.error
			}));
			return;
		}
		if (await connectorStore.getState().autoEnableMcpConnectorToggle(config.id, "", { silent: true })) {
			if (disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
			toast.success(t("connectorPanel.connectSuccess", { name: config.name }));
			return;
		}
		if (config.authMode !== "token") toast({
			message: t("connectorPanel.redirectAuth"),
			type: "plain"
		});
		markLibraryAuthEntry(config.id, "add_menu");
		const result = await connectorStore.getState().connectMcpConnector(config.id);
		if (result.success) {
			if (disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
			return;
		}
		if (result.error && !result.cancelled) toast.error(t("connectorPanel.namedConnectError", {
			name: config.name,
			error: result.error
		}));
	}, [
		disableAllExtensions,
		setDisableAllExtensionsState,
		t
	]);
	return {
		defaultOnConnectItem,
		defaultOnToggleItem: (0, import_react$15.useCallback)(async (item, enabled) => {
			const config = getConfigFromItem(item);
			if (!config) {
				toast.error(t("connectorPanel.disconnectError", { error: item.name }));
				return;
			}
			if (enabled) {
				if (await connectorStore.getState().autoEnableMcpConnectorToggle(config.id, "", { silent: true })) {
					if (disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
					toast.success(t("connectorPanel.connectSuccess", { name: config.name }));
				} else await defaultOnConnectItem(item);
				return;
			}
			const result = await connectorStore.getState().disconnectMcpConnector(config.id);
			if (result.success) toast.success(t("connectorPanel.disconnectSuccess", { name: config.name }));
			else if (result.error) toast.error(t("connectorPanel.disconnectError", { error: result.error }));
		}, [
			defaultOnConnectItem,
			disableAllExtensions,
			setDisableAllExtensionsState,
			t
		]),
		defaultOnCancelConnect: (0, import_react$15.useCallback)(async (item) => {
			const config = getConfigFromItem(item);
			if (!config) return;
			try {
				const result = await connectorStore.getState().cancelMcpConnector(config.id);
				if (result.success) toast.info(t("connectorPanel.cancelConnectSuccess", { name: config.name }));
				else if (result.error) toast.error(t("connectorPanel.cancelConnectError", { error: result.error }));
			} catch (err) {
				console.warn("[useConnectorDefaultActions] cancelMcpConnector failed:", String(err));
			}
		}, [t])
	};
}
var import_react$15;
var init_use_connector_default_actions = __esmMin((() => {
	init_src();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_store();
	init_telemetry_helpers();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/data/use-connectors-list.ts
/**
* 与 ConnectorCapsule 菜单打开时的 MCP 排序 + 10 条截断逻辑字面同源。
* `configs` 须为 marketplace 原始顺序（`mcpConnectorConfigs` 过滤后的 `allVisible`）。
*/
function sortConnectorsLikeCapsule(configs, mcpStates, mcpEverConnectedIds, maxDisplay = 10) {
	const getMcpPriority = (c) => {
		if (mcpStates[c.id]?.status === "connected") return 0;
		if (mcpEverConnectedIds.has(c.id)) return 1;
		return 2;
	};
	const sorted = [...configs].sort((a, b) => getMcpPriority(a) - getMcpPriority(b));
	const isConnectedSide = (c) => mcpEverConnectedIds.has(c.id) || mcpStates[c.id]?.status === "connected" || mcpStates[c.id]?.status === "connecting";
	const connectedSide = sorted.filter(isConnectedSide);
	const unconnectedSide = sorted.filter((c) => !isConnectedSide(c));
	return connectedSide.length >= maxDisplay ? connectedSide : [...connectedSide, ...unconnectedSide.slice(0, maxDisplay - connectedSide.length)];
}
function useConnectorsList(options) {
	const { enabled } = options;
	const host = useModuleHost();
	const adapter = useConnectorStore((state) => state.adapter);
	const mcpConfigs = useConnectorStore((state) => state.mcpConnectorConfigs);
	const mcpStates = useConnectorStore((state) => state.mcpConnectorStates);
	const mcpEverConnectedIds = useConnectorStore((state) => state.mcpEverConnectedIds);
	const { enabled: imaEnabled } = useImaEnabled();
	const vpcConnectorPolicy = useVpcConnectorPolicy();
	const [networkEnv, setNetworkEnv] = (0, import_react$14.useState)();
	(0, import_react$14.useEffect)(() => {
		if (!enabled) return;
		adapter?.getProductConfig?.().then((cfg) => setNetworkEnv(cfg?.networkEnvironment));
	}, [adapter, enabled]);
	(0, import_react$14.useEffect)(() => {
		if (!enabled) return;
		if (mcpConfigs.length === 0) connectorStore.getState().loadMcpConnectors();
	}, [mcpConfigs.length, enabled]);
	(0, import_react$14.useEffect)(() => {
		if (!enabled) return;
		connectorStore.getState().loadMcpConnectors();
	}, [enabled]);
	const hasConnecting = (0, import_react$14.useMemo)(() => Object.values(mcpStates).some((s) => s?.status === "connecting"), [mcpStates]);
	(0, import_react$14.useEffect)(() => {
		if (!enabled || !hasConnecting) return;
		const timer = setInterval(() => {
			connectorStore.getState().loadMcpConnectors();
		}, 3e3);
		return () => clearInterval(timer);
	}, [hasConnecting, enabled]);
	const allVisible = (0, import_react$14.useMemo)(() => {
		if (!enabled) return [];
		return mcpConfigs.filter((c) => {
			if (c.id === "ima-mcp" && !imaEnabled) return false;
			if (!vpcConnectorPolicy.isConnectorAllowed(c.id)) return false;
			return isConnectorVisible(c.visibleIn, networkEnv, host.accountInfo?.enterpriseId, host.accountInfo?.type);
		});
	}, [
		enabled,
		mcpConfigs,
		networkEnv,
		host.accountInfo?.enterpriseId,
		host.accountInfo?.type,
		imaEnabled,
		vpcConnectorPolicy
	]);
	return {
		items: (0, import_react$14.useMemo)(() => enabled ? sortConnectorsLikeCapsule(allVisible, mcpStates, mcpEverConnectedIds) : [], [
			enabled,
			allVisible,
			mcpStates,
			mcpEverConnectedIds
		]),
		allVisible,
		mcpStates,
		mcpEverConnectedIds
	};
}
var import_react$14;
var init_use_connectors_list = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_use_ima_enabled();
	init_use_vpc_connector_policy();
	init_common();
	init_store();
	init_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-connector-provider.ts
/**
* 把 store 的 `ConnectorConfigInfo` 转成 conversation-render 契约的 `InputConnectorItem`。
*
* ⚠️ 字段语义差异：
*   - `ConnectorConfigInfo.authMode` 是协议字段（`'server-side' | 'gateway' | 'token'`），
*     跟契约里 `InputConnectorItem.authMode` 的业务语义（`'personal' | 'public'`）**不是同一个东西**。
*   - 全局 store 里的 connector 都来自 marketplace（用户维度），一律视为 `'personal'`。
*   - 项目场景由宿主直接注入 `items`，各字段（含真实 personal/public 分类）由 wb-input-add
*     `ConnectorSubmenuItem` 提供，跳过本转换。
*
* `raw` 字段保留原始 config，便于兜底 `onConnectItem` 从 item 反查 config 直连 store。
*
* `status` / `isCancellable` 用于新 add-menu ConnectorsSubmenu 分发 connecting / spinner / 取消连接 UI
* （对齐 wb-input-add ConnectorRow 视觉），值由 mcpStates + useCancellableConnecting 计算得到。
*/
function toInputConnectorItem(config, mcpStates, everConnectedIds, cancellableIds) {
	const status = mcpStates[config.id]?.status;
	const isCurrentlyConnected = status === "connected";
	const hasEverConnected = everConnectedIds.has(config.id);
	const incompatible = isConnectorVersionIncompatible(config);
	const incompatLabel = incompatible ? getConnectorVersionIncompatibilityLabel(config) : "";
	const canToggle = !incompatible || isCurrentlyConnected;
	return {
		id: config.id,
		name: config.name ?? config.id,
		description: config.description,
		icon: config.icon,
		authMode: "personal",
		source: "personal",
		isConnected: isCurrentlyConnected || hasEverConnected,
		everConnected: hasEverConnected,
		enabled: isCurrentlyConnected,
		canToggle,
		disabledReason: !canToggle ? incompatLabel : void 0,
		raw: config,
		status,
		isCancellable: cancellableIds.has(config.id)
	};
}
/**
* 产出 `InputConnectorProvider`；enabled=false 或 onSummonMore 缺失时返回 undefined。
*
* items / allItems 二选一：
*   - 宿主显式传 items → 项目场景，直接透传
*   - 宿主不传 items → 走 `useConnectorsList` 从全局 store 派生
*/
function useConnectorProvider(options) {
	const { enabled, taskId, items: injectedItems, allItems: injectedAllItems, onSummonMore, onConnectItem, onToggleItem, onCancelConnect } = options;
	const derivedList = useConnectorsList({ enabled: enabled && !injectedItems });
	const globalMcpStates = useConnectorStore((state) => state.mcpConnectorStates);
	/**
	* 注入 items 场景（`useProjectLocalResourceInjections` 等）里 `useConnectorsList` 被
	* `enabled=false` 短路了，永远不会触发 `loadMcpConnectors()` —— 结果 `mcpConnectorStates`
	* 常年是空对象，注入 items 拿不到实时 status，UI 上看不到 connecting spinner。
	*
	* 因此只要新加号菜单启用，就无条件保证 store 已加载并轮询：
	*   - mount 时先 load 一次
	*   - 有 connecting 时 3s 轮询直到全部落地（与 useConnectorsList 内轮询同源）
	*
	* 派生 items 场景（`injectedItems` 缺失）已经由 `useConnectorsList` 覆盖，这里的 load
	* 是幂等的 no-op（store 内部会串行化），不产生副作用。
	*/
	const hasAnyConnecting = (0, import_react$13.useMemo)(() => Object.values(globalMcpStates).some((s) => s?.status === "connecting"), [globalMcpStates]);
	(0, import_react$13.useEffect)(() => {
		if (!enabled) return;
		connectorStore.getState().loadMcpConnectors();
	}, [enabled]);
	(0, import_react$13.useEffect)(() => {
		if (!enabled || !hasAnyConnecting) return;
		const POLL_INTERVAL_MS = 3e3;
		const POLL_MAX_DURATION_MS = 60 * 1e3;
		const startedAt = Date.now();
		const timer = setInterval(() => {
			if (Date.now() - startedAt >= POLL_MAX_DURATION_MS) {
				clearInterval(timer);
				return;
			}
			connectorStore.getState().loadMcpConnectors();
		}, POLL_INTERVAL_MS);
		return () => clearInterval(timer);
	}, [enabled, hasAnyConnecting]);
	const cancellableIds = useCancellableConnecting((0, import_react$13.useMemo)(() => enabled ? globalMcpStates : {}, [enabled, globalMcpStates]));
	const { defaultOnConnectItem, defaultOnToggleItem, defaultOnCancelConnect } = useConnectorDefaultActions();
	const derivedInputItems = (0, import_react$13.useMemo)(() => {
		if (injectedItems || !enabled) return [];
		return derivedList.items.map((config) => toInputConnectorItem(config, derivedList.mcpStates, derivedList.mcpEverConnectedIds, cancellableIds));
	}, [
		injectedItems,
		enabled,
		derivedList.items,
		derivedList.mcpStates,
		derivedList.mcpEverConnectedIds,
		cancellableIds
	]);
	const derivedAllInputItems = (0, import_react$13.useMemo)(() => {
		if (injectedAllItems || !enabled) return [];
		return derivedList.allVisible.map((config) => toInputConnectorItem(config, derivedList.mcpStates, derivedList.mcpEverConnectedIds, cancellableIds));
	}, [
		injectedAllItems,
		enabled,
		derivedList.allVisible,
		derivedList.mcpStates,
		derivedList.mcpEverConnectedIds,
		cancellableIds
	]);
	/**
	* 项目场景 host（`useProjectLocalResourceInjections`）注入的 items 只带 `isConnected/everConnected`
	* 静态快照，**不带**实时 status —— UI 侧看不到 connecting spinner / 「取消连接」红字。
	* 这里把全局 store 的 mcpStates 按 id 覆盖回去，让项目 / 本地任务的加号菜单也能显示连接中动画
	* （与 wb-input-add ConnectorsSubmenu 老实现的 injected 分支差异 —— 那边根本没接实时 status，
	*  这里在新输入框补上）。
	*
	* 匹配策略：按 `item.id` 直接查 mcpStates（团队 public / 个人 personal / 本机 local 都共用 store 的 id 空间）。
	* 未命中的 item 保持原样，行为不变。
	*/
	const enrichInjectedItems = (0, import_react$13.useMemo)(() => (list) => {
		if (!list) return list;
		return list.map((item) => {
			const status = globalMcpStates[item.id]?.status;
			const isCancellable = cancellableIds.has(item.id);
			if (!status && !isCancellable) return item;
			return {
				...item,
				status: status ?? item.status,
				isCancellable
			};
		});
	}, [globalMcpStates, cancellableIds]);
	const finalInjectedItems = (0, import_react$13.useMemo)(() => enrichInjectedItems(injectedItems), [enrichInjectedItems, injectedItems]);
	const finalInjectedAllItems = (0, import_react$13.useMemo)(() => enrichInjectedItems(injectedAllItems), [enrichInjectedItems, injectedAllItems]);
	return (0, import_react$13.useMemo)(() => {
		if (!enabled || !onSummonMore) return;
		return {
			taskId,
			items: finalInjectedItems ?? derivedInputItems,
			allItems: finalInjectedAllItems ?? derivedAllInputItems,
			onConnectItem: onConnectItem ?? defaultOnConnectItem,
			onToggleItem: onToggleItem ?? defaultOnToggleItem,
			onCancelConnect: onCancelConnect ?? defaultOnCancelConnect,
			onSummonMore
		};
	}, [
		enabled,
		taskId,
		finalInjectedItems,
		derivedInputItems,
		finalInjectedAllItems,
		derivedAllInputItems,
		onConnectItem,
		defaultOnConnectItem,
		onToggleItem,
		defaultOnToggleItem,
		onCancelConnect,
		defaultOnCancelConnect,
		onSummonMore
	]);
}
var import_react$13;
var init_use_connector_provider = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_store();
	init_use_cancellable_connecting();
	init_utils();
	init_use_connector_default_actions();
	init_use_connectors_list();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/data/use-experts-suggestions.ts
function notifyCacheListeners() {
	cacheListeners.forEach((fn) => {
		try {
			fn();
		} catch {}
	});
}
function getPinnedDisplayPosition(displayPosition) {
	if (!Number.isFinite(displayPosition)) return null;
	const normalized = Math.floor(displayPosition);
	return normalized >= 1 ? normalized : null;
}
/**
* 最热排序（与专家中心 sortExpertsByPopularityWithPinnedPositions 逐行同源）：
*   - 合法 displayPosition 按运营钉位插入
*   - 其余按 useCount 降序填充剩余空位
*/
function sortBuiltinByPopularity(experts, useCountMap) {
	if (experts.length <= 1) return experts;
	const byUseCount = (a, b) => (useCountMap.get(b.id) ?? 0) - (useCountMap.get(a.id) ?? 0);
	const pinnedExperts = experts.map((expert, index) => ({
		expert,
		index
	})).filter(({ expert }) => getPinnedDisplayPosition(expert.displayPosition) !== null).sort((a, b) => {
		const positionDiff = (getPinnedDisplayPosition(a.expert.displayPosition) ?? Number.MAX_SAFE_INTEGER) - (getPinnedDisplayPosition(b.expert.displayPosition) ?? Number.MAX_SAFE_INTEGER);
		return positionDiff !== 0 ? positionDiff : a.index - b.index;
	});
	if (pinnedExperts.length === 0) return [...experts].sort(byUseCount);
	const pinnedIds = new Set(pinnedExperts.map(({ expert }) => expert.id));
	const remainingExperts = experts.filter((expert) => !pinnedIds.has(expert.id)).sort(byUseCount);
	const positionedExperts = new Array(experts.length).fill(void 0);
	for (const { expert } of pinnedExperts) {
		let insertIndex = Math.min(experts.length - 1, Math.max(0, (getPinnedDisplayPosition(expert.displayPosition) ?? 1) - 1));
		while (insertIndex < positionedExperts.length && positionedExperts[insertIndex]) insertIndex += 1;
		if (insertIndex >= positionedExperts.length) insertIndex = positionedExperts.findIndex((item) => !item);
		if (insertIndex !== -1) positionedExperts[insertIndex] = expert;
	}
	let remainingIndex = 0;
	return positionedExperts.map((item) => {
		if (item) return item;
		const nextExpert = remainingExperts[remainingIndex];
		remainingIndex += 1;
		return nextExpert;
	}).filter((expert) => Boolean(expert));
}
/**
* 解析使用次数 map —— 与专家中心 useExpertUseCountMap 字面同源：
*   - 优先用列表接口返回的 useCount
*   - 缺失时回退调 getRanking 拿热度排行
*/
async function resolveUseCountMap(expertFacade, enterpriseId, list) {
	const fromList = /* @__PURE__ */ new Map();
	for (const e of list) if (e.id && Number.isFinite(e.useCount)) fromList.set(e.id, e.useCount);
	if (fromList.size > 0) return fromList;
	if (!expertFacade.getRanking) return fromList;
	try {
		const res = await expertFacade.getRanking({
			limit: Math.max(list.length, MAX_DISPLAY * 4),
			enterpriseId
		});
		const ranked = /* @__PURE__ */ new Map();
		const validIds = new Set(list.map((e) => e.id).filter(Boolean));
		for (const item of res?.items ?? []) if (item.id && validIds.has(item.id) && Number.isFinite(item.useCount)) ranked.set(item.id, item.useCount);
		return ranked;
	} catch {
		return fromList;
	}
}
/** 解析 I18nText → 当前 locale 字符串。 */
function pickLocaleText(value, locale) {
	if (!value) return "";
	if (typeof value === "string") return value;
	return value[locale] ?? value.zh ?? value.en ?? "";
}
/** 把 Market expert 映射成 RecentExpert 形态，方便统一渲染。 */
function toRecentLike(item, locale) {
	const name = pickLocaleText(item.displayName, locale) || pickLocaleText(item.name, locale) || item.id;
	const profession = pickLocaleText(item.profession, locale);
	return {
		id: item.id,
		name,
		profession,
		avatarUrl: item.avatarUrl ?? item.avatar ?? "",
		summonedAt: 0,
		defaultInitPrompt: pickLocaleText(item.defaultInitPrompt, locale) || void 0,
		pluginName: item.pluginName ?? item.plugin,
		expertType: item.expertType,
		updatedAt: item.updatedAt
	};
}
/** 单次拉取 builtin 池（按最热排序）。 */
async function fetchBuiltinPool(host) {
	const expertFacade = host.facades.expert;
	if (!expertFacade?.getMarketExperts) return [];
	const enterpriseId = host.accountInfo?.enterpriseId ?? "";
	try {
		const list = (await expertFacade.getMarketExperts({
			enterpriseId,
			source: "builtin",
			sortBy: "use_count",
			sortOrder: "desc",
			page: 1,
			page_size: 50
		}))?.experts ?? [];
		return sortBuiltinByPopularity(list, await resolveUseCountMap(expertFacade, enterpriseId, list));
	} catch (err) {
		if (!String(err).includes("DomainProxy")) console.warn("[ChatInputProviders/experts] getMarketExperts failed:", String(err));
		return [];
	}
}
/**
* 预热推荐池 —— 推荐在加号一级菜单 mount 时调用，让 hover 二级面板时已经有数据。
* 多次调用安全：同一 enterpriseId 下只发一次 HTTP，后续 await 同一个 promise。
*/
function prefetchExpertsSuggestions(host) {
	const enterpriseId = host.accountInfo?.enterpriseId ?? "";
	const cached = recommendedCache.get(enterpriseId);
	if (cached?.pool.length) return Promise.resolve();
	if (cached?.promise) return cached.promise.then(() => void 0);
	const promise = fetchBuiltinPool(host).then((pool) => {
		recommendedCache.set(enterpriseId, {
			pool,
			promise: void 0
		});
		notifyCacheListeners();
		return pool;
	});
	recommendedCache.set(enterpriseId, {
		pool: cached?.pool ?? [],
		promise
	});
	return promise.then(() => void 0);
}
function useExpertsSuggestions(options) {
	const { enabled, recentExperts, disableRecommended } = options;
	const host = useModuleHost();
	useFacade("expert");
	const enterpriseId = host.accountInfo?.enterpriseId ?? "";
	const locale = getLocale() === "en" ? "en" : "zh";
	const [, forceRender] = (0, import_react$12.useState)(0);
	(0, import_react$12.useEffect)(() => {
		const fn = () => forceRender((v) => v + 1);
		cacheListeners.add(fn);
		return () => {
			cacheListeners.delete(fn);
		};
	}, []);
	const recentSlice = (0, import_react$12.useMemo)(() => disableRecommended ? recentExperts ?? [] : (recentExperts ?? []).slice(0, MAX_DISPLAY), [recentExperts, disableRecommended]);
	const needRecommended = enabled && !disableRecommended && recentSlice.length < MAX_DISPLAY;
	(0, import_react$12.useEffect)(() => {
		if (!needRecommended) return;
		const cached = recommendedCache.get(enterpriseId);
		if (cached?.pool.length) return;
		if (cached?.promise) return;
		prefetchExpertsSuggestions(host).catch(() => void 0);
	}, [
		host,
		enterpriseId,
		needRecommended
	]);
	const recommendedPool = needRecommended ? recommendedCache.get(enterpriseId)?.pool ?? [] : [];
	const isFetching = needRecommended && !!recommendedCache.get(enterpriseId)?.promise;
	const items = (0, import_react$12.useMemo)(() => {
		if (!enabled) return [];
		const seen = /* @__PURE__ */ new Set();
		const out = [];
		const cap = disableRecommended ? Infinity : MAX_DISPLAY;
		for (const e of recentSlice) {
			if (seen.has(e.id)) continue;
			seen.add(e.id);
			out.push(e);
			if (out.length >= cap) return out;
		}
		for (const item of recommendedPool) {
			if (seen.has(item.id)) continue;
			seen.add(item.id);
			out.push(toRecentLike(item, locale));
			if (out.length >= cap) return out;
		}
		return out;
	}, [
		enabled,
		recentSlice,
		recommendedPool,
		locale,
		disableRecommended
	]);
	return {
		items,
		isLoading: items.length === 0 && isFetching && needRecommended
	};
}
var import_react$12, MAX_DISPLAY, recommendedCache, cacheListeners;
var init_use_experts_suggestions = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_common();
	MAX_DISPLAY = 5;
	recommendedCache = /* @__PURE__ */ new Map();
	cacheListeners = /* @__PURE__ */ new Set();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-expert-provider.ts
/** RecentExpert → conversation-render 契约的 InputExpertSelection。 */
function toInputExpertSelection$1(expert) {
	return {
		id: expert.id,
		name: expert.name,
		profession: expert.profession,
		avatarUrl: expert.avatarUrl
	};
}
/**
* 产出 `InputExpertProvider`；enabled=false 或 onSelect / onSummonMore 缺失时返回 undefined。
*/
function useExpertProvider(options) {
	const { enabled, recentExperts, onSelect, onSummonMore, disableRecommended } = options;
	const { items } = useExpertsSuggestions({
		enabled,
		recentExperts,
		disableRecommended
	});
	const byId = (0, import_react$11.useMemo)(() => new Map(items.map((item) => [item.id, item])), [items]);
	const search = (0, import_react$11.useCallback)(async (query) => {
		const kw = query.trim().toLowerCase();
		if (!kw) return items.map(toInputExpertSelection$1);
		return items.filter((e) => e.name.toLowerCase().includes(kw) || (e.profession ?? "").toLowerCase().includes(kw)).map(toInputExpertSelection$1);
	}, [items]);
	return (0, import_react$11.useMemo)(() => {
		if (!enabled || !onSelect && !onSummonMore) return;
		return {
			recentExperts: items.map(toInputExpertSelection$1),
			search,
			onChange: (selection) => {
				if (!selection || !onSelect) return;
				const original = byId.get(selection.id);
				if (original) onSelect(original);
			},
			onSummonMore
		};
	}, [
		enabled,
		items,
		search,
		byId,
		onSelect,
		onSummonMore
	]);
}
var import_react$11;
var init_use_expert_provider = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_use_experts_suggestions();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-mode-provider.ts
/**
* 产出 `InputModeProvider`；enabled=false 或 onChange 缺失时返回 undefined。
*
* 当前选中态由 `<InputBoxRoot selections={{ mode }}>` 受控灌入 store 管理，
* 不在 provider 层暴露 `currentMode` 字段（避免宿主和 store 出现双源）。
*/
function useModeProvider(options) {
	const { enabled, onChange } = options;
	return (0, import_react$10.useMemo)(() => {
		if (!enabled || !onChange) return;
		return { onChange: (selection) => onChange(selection.id) };
	}, [enabled, onChange]);
}
var import_react$10;
var init_use_mode_provider = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-permission-provider.ts
/**
* 产出 `InputPermissionProvider`；enabled=false 或 onModeChange 缺失时返回 undefined。
*
* 当前选中态由 `<InputBoxRoot selections={{ permissionMode }}>` 受控灌入 store 管理。
*/
function usePermissionProvider(options) {
	const { enabled, disabled, onModeChange } = options;
	return (0, import_react$9.useMemo)(() => {
		if (!enabled || !onModeChange) return;
		return {
			disabled,
			onModeChange
		};
	}, [
		enabled,
		disabled,
		onModeChange
	]);
}
var import_react$9;
var init_use_permission_provider = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/data/use-reference-files-data.ts
/**
* 拉取当前会话工作目录文件列表 —— 与 `@` mention 同一个 adapter API + 同一对 (adapter, cwd)。
* 返回数量与 `@` mention 一致（最多 resultNum 条），保证加号菜单和 @ 面板展示同款文件列表。
*/
function useReferenceFilesData(options) {
	const { enabled, adapter, cwd } = options;
	const [items, setItems] = (0, import_react$8.useState)([]);
	(0, import_react$8.useEffect)(() => {
		if (!enabled || !adapter?.searchFile || !cwd) {
			setItems([]);
			return;
		}
		const adapterRef = adapter;
		let cancelled = false;
		(async () => {
			try {
				const result = await adapterRef.searchFile({
					cwd,
					options: {
						search: "",
						resultNum: 100
					}
				});
				if (cancelled) return;
				if (result.error || !result.results) {
					setItems([]);
					return;
				}
				const next = [];
				const seen = /* @__PURE__ */ new Set();
				for (const file of result.results) {
					const fileType = file.type === "folder" ? "folder" : "file";
					const displayName = fileType === "folder" ? file.folderName || file.fileName : file.fileName || file.folderName;
					if (!displayName) continue;
					const key = `${file.relativePath || file.path || displayName}|${fileType}`;
					if (seen.has(key)) continue;
					seen.add(key);
					const suggestion = convertFilesToSuggestions([{
						fileName: displayName,
						folderName: file.folderName,
						relativePath: file.relativePath,
						path: file.path,
						type: fileType
					}])[0];
					if (!suggestion) continue;
					next.push({
						id: key,
						name: displayName,
						uri: file.relativePath || file.path || displayName,
						dirPath: extractDirFromPath(file.path || file.relativePath || "", displayName),
						isFolder: fileType === "folder",
						toContentBlock: () => convertToContentBlock(suggestion, {})
					});
				}
				setItems(next);
			} catch {
				if (!cancelled) setItems([]);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		enabled,
		adapter,
		cwd
	]);
	return items;
}
var import_react$8;
var init_use_reference_files_data = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_mention_converters();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-reference-files-provider.ts
function useReferenceFilesProvider(options) {
	const { enabled, adapter, cwd, onInsertBlock } = options;
	const items = useReferenceFilesData({
		enabled,
		adapter,
		cwd
	});
	return (0, import_react$7.useMemo)(() => {
		if (!enabled || !onInsertBlock) return;
		const providerItems = items.map((item) => ({
			id: item.id,
			name: item.name,
			uri: item.uri,
			isFolder: item.isFolder
		}));
		const factoryById = new Map(items.map((item) => [item.id, item.toContentBlock]));
		return {
			items: providerItems,
			onSelect: (item) => {
				const factory = factoryById.get(item.id);
				if (factory) onInsertBlock(factory());
			}
		};
	}, [
		enabled,
		items,
		onInsertBlock
	]);
}
var import_react$7;
var init_use_reference_files_provider = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_use_reference_files_data();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/chat-input-portals.tsx
function updateRegistry(mutator) {
	const next = new Map(portalRegistry$.value);
	mutator(next);
	portalRegistry$.next(next);
}
/**
* 注册一个 chat-input portal。
*
* @param key    portal 唯一标识；同 key 会覆盖上次注册
* @param element 待挂载的 element；`null` 表示保留 key 但不渲染
* @returns cleanup —— 组件 unmount 时调用，从注册表移除该 portal
*/
function registerChatInputPortal(key, element) {
	updateRegistry((map) => {
		map.set(key, element);
	});
	return () => {
		updateRegistry((map) => {
			map.delete(key);
		});
	};
}
function mapToEntries(map) {
	return Array.from(map, ([key, element]) => ({
		key,
		element
	}));
}
var import_react$6, import_jsx_runtime$1, portalRegistry$, ChatInputPortals;
var init_chat_input_portals = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init__esm5();
	import_jsx_runtime$1 = require_jsx_runtime();
	portalRegistry$ = new BehaviorSubject(/* @__PURE__ */ new Map());
	ChatInputPortals = () => {
		const [entries, setEntries] = (0, import_react$6.useState)(() => mapToEntries(portalRegistry$.value));
		(0, import_react$6.useEffect)(() => {
			const sub = portalRegistry$.subscribe((map) => setEntries(mapToEntries(map)));
			return () => sub.unsubscribe();
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children: entries.map((entry) => entry.element !== null ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_react$6.Fragment, { children: entry.element }, entry.key) : null) });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/data/use-skills-pool.ts
/**
* SkillInfo → SkillPoolItem。
* 图标只取 `skill.iconUrl`（裸取，不做 iconSource 兜底）—— 保持 Web `+` 菜单原有展示行为，
* 与 Desktop 的 `resolveSkillIconUrl`（含 http iconSource 兜底）刻意不合并，避免波及非 teams 场景。
*/
function toPoolItem(skill, locale) {
	return {
		id: skill.name,
		name: skill.name,
		description: pickLocalizedDescription(skill, locale),
		iconUrl: skill.iconUrl,
		marketplaceSource: skill.marketplaceSource
	};
}
function useSkillsPool(options) {
	const { enabled, cwd, useCloud, projectId, projectSkills } = options;
	const facade = useFacade("personalSkills");
	const host = useModuleHost();
	const [personalPool, setPersonalPool] = (0, import_react$5.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react$5.useState)(false);
	const fetchRequestIdRef = (0, import_react$5.useRef)(0);
	(0, import_react$5.useEffect)(() => {
		if (!enabled) {
			fetchRequestIdRef.current += 1;
			setPersonalPool([]);
			setIsLoading(false);
			return;
		}
		const requestId = ++fetchRequestIdRef.current;
		setIsLoading(true);
		const locale = getLocale() === "en" ? "en" : "zh";
		fetchPersonalSkillInfos(host.facades.personalSkills, {
			cwd,
			useCloud,
			projectId
		}).then((list) => {
			if (requestId !== fetchRequestIdRef.current) return;
			setPersonalPool(list.map((s) => toPoolItem(s, locale)));
		}).finally(() => {
			if (requestId === fetchRequestIdRef.current) setIsLoading(false);
		});
	}, [
		enabled,
		facade,
		cwd,
		useCloud,
		projectId
	]);
	return {
		pool: (0, import_react$5.useMemo)(() => mergeTeamSkills(personalPool, projectSkills), [personalPool, projectSkills]),
		isLoading
	};
}
var import_react$5;
var init_use_skills_pool = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_common();
	init_skill_list_core();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-skill-add-local-flow.tsx
function useSkillAddLocalFlow(options) {
	const { enabled, uploadTarget = "cloud" } = options;
	const t = useTranslation();
	const isDesktop = isWorkBuddyDesktop();
	const desktopSkillImportFlow = usePersonalSkillImport({ scanEnabled: enabled && isDesktop });
	const showDesktopSkillUploadOverlay = useDelayedVisible(desktopSkillImportFlow.uploading, 3e3);
	const { openPersonal } = useSkillUploadModal();
	const { policy: uploadPolicy, refresh: refreshUploadPolicy } = useSkillUploadPolicy();
	const canShowAddLocal = !uploadPolicy || uploadPolicy.allowed;
	const onAddLocal = (0, import_react$4.useCallback)(async () => {
		if (!enabled) return;
		const policy = await refreshUploadPolicy();
		if (policy && !policy.allowed) {
			toast.error(buildPolicyDeniedMessage(t, policy.reason));
			return;
		}
		if (uploadTarget === "local" && isDesktop) {
			desktopSkillImportFlow.handleImportSkill();
			return;
		}
		openPersonal();
	}, [
		enabled,
		refreshUploadPolicy,
		uploadTarget,
		isDesktop,
		desktopSkillImportFlow,
		openPersonal,
		t
	]);
	const modalElement = (0, import_react$4.useMemo)(() => {
		if (!enabled || !isDesktop) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonalSkillImportModal, {
			flow: desktopSkillImportFlow,
			scanEnabled: true,
			showUploadOverlay: showDesktopSkillUploadOverlay
		});
	}, [
		enabled,
		isDesktop,
		desktopSkillImportFlow,
		showDesktopSkillUploadOverlay
	]);
	return {
		onAddLocal: enabled && canShowAddLocal ? onAddLocal : void 0,
		modalElement
	};
}
var import_react$4, import_jsx_runtime;
var init_use_skill_add_local_flow = __esmMin((() => {
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_use_delayed_visible();
	init_useI18n();
	init_components();
	init_use_installed_skills();
	init_use_skill_upload_policy();
	init_environment();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-skill-provider.ts
/**
* 把内部 SkillPoolItem 映射成 conversation-render 契约的 InputSkillItem。
* marketplaceSource 通过 metadata 透传（SkillAvatar 从 metadata 里读，避免侵入公共契约）。
* tag（如"团队"）由 conversation-render 的 SkillsSubmenu 在 name 右侧直接渲染 badge。
*/
function toInputSkillItem(item) {
	return {
		id: item.id,
		name: item.name,
		description: item.description,
		iconUrl: item.iconUrl,
		tag: item.tag,
		metadata: item.marketplaceSource ? { marketplaceSource: item.marketplaceSource } : void 0
	};
}
/**
* 产出可直接塞进 `InputBoxProviders.skill` 的 provider；enabled=false 或 onSelect 缺失时返回 undefined。
*/
function useSkillProvider(options) {
	const { enabled, cwd = "", useCloud = false, projectId, projectSkills, onSelect, uploadTarget, onAddLocalOverride, onManage } = options;
	const { pool } = useSkillsPool({
		enabled,
		cwd,
		useCloud,
		projectId,
		projectSkills
	});
	const enterpriseId = useModuleHost().accountInfo?.enterpriseId ?? "";
	const { onAddLocal: flowOnAddLocal, modalElement } = useSkillAddLocalFlow({
		enabled: enabled && !onAddLocalOverride && !!uploadTarget,
		uploadTarget
	});
	(0, import_react$3.useEffect)(() => registerChatInputPortal("skill-import", modalElement), [modalElement]);
	const onAddLocal = onAddLocalOverride ?? flowOnAddLocal;
	return (0, import_react$3.useMemo)(() => {
		if (!enabled || !onSelect && !onManage) return;
		const byId = new Map(pool.map((item) => [item.id, item]));
		return {
			items: pool.map(toInputSkillItem),
			storageScope: enterpriseId,
			onSelect: onSelect ? (skill) => {
				const original = byId.get(skill.id);
				if (original) onSelect(original);
			} : void 0,
			onAddLocal,
			onManage
		};
	}, [
		enabled,
		pool,
		enterpriseId,
		onSelect,
		onAddLocal,
		onManage
	]);
}
var import_react$3;
var init_use_skill_provider = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_common();
	init_chat_input_portals();
	init_use_skills_pool();
	init_use_skill_add_local_flow();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-voice-provider.ts
/**
* 生成一个 `InputVoiceProvider`；返回 `undefined` 表示当前环境不支持语音（新组件按 undefined 隐藏 UI）。
*/
function useVoiceProvider(options) {
	const { adapter, onTextResult, sessionId, enabled = true, labels } = options;
	const t = useTranslation();
	const voiceInputEnabled = useVoiceInputFeature();
	const isSupported = !!adapter?.speechToText && voiceInputEnabled === true && isWorkBuddyDesktop();
	const isEnabled = enabled && isSupported;
	const handleStopRef = (0, import_react$2.useRef)();
	const { state, startRecording, stopRecording, cancelRecording, analyserNode, errorMessage, recordingDuration } = useVoiceInput({ onMaxDurationReached: () => handleStopRef.current?.() });
	/** 停止录制 → 拿到编码后音频 → 调 adapter.speechToText → onTextResult / toast。 */
	const handleStop = (0, import_react$2.useCallback)(async () => {
		const audioData = await stopRecording();
		if (!audioData) {
			cancelRecording();
			return;
		}
		if (!adapter?.speechToText) {
			toast.error(t("voice.error.notSupported"));
			cancelRecording();
			return;
		}
		try {
			const timeoutPromise = new Promise((_, reject) => {
				setTimeout(() => reject(/* @__PURE__ */ new Error("ASR timeout")), ASR_TIMEOUT_MS);
			});
			const result = await Promise.race([adapter.speechToText(audioData), timeoutPromise]);
			if (result.success && result.text) onTextResult(result.text);
			else if (result.success) toast.info(t("voice.info.emptyResult"));
			else {
				let errorMsg = "";
				if (result.errorCode) {
					const key = `voice.error.code.${result.errorCode}`;
					const translated = t(key);
					if (translated !== key) errorMsg = translated;
				}
				toast.error(errorMsg || t("voice.error.asrFailed"));
			}
		} catch (error) {
			const message = error.message === "ASR timeout" ? t("voice.error.timeout") : t("voice.error.asrFailed");
			toast.error(message);
		} finally {
			cancelRecording();
		}
	}, [
		adapter,
		cancelRecording,
		onTextResult,
		stopRecording,
		t
	]);
	handleStopRef.current = handleStop;
	const prevSessionIdRef = (0, import_react$2.useRef)(sessionId);
	(0, import_react$2.useEffect)(() => {
		const prev = prevSessionIdRef.current;
		prevSessionIdRef.current = sessionId;
		if (prev !== sessionId && state === "recording") handleStopRef.current?.();
	}, [sessionId, state]);
	/**
	* 快捷键：通过 shortcut registry 读取用户配置的 toggle-voice-recording 绑定。
	* 交互与老 `useVoiceButton` 一致：idle → 开始录制；recording → 停止并 ASR。
	*/
	(0, import_react$2.useEffect)(() => {
		if (!isEnabled) return;
		let parsed = parseBinding(getCurrentBinding("toggle-voice-recording"));
		const rebuild = () => {
			parsed = parseBinding(getCurrentBinding("toggle-voice-recording"));
		};
		const handleKeyDown = (e) => {
			if (matchesBinding(e, parsed)) {
				e.preventDefault();
				if (state === "idle") startRecording();
				else if (state === "recording") handleStopRef.current?.();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener(SHORTCUT_CHANGE_EVENT, rebuild);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener(SHORTCUT_CHANGE_EVENT, rebuild);
		};
	}, [
		isEnabled,
		state,
		startRecording
	]);
	(0, import_react$2.useEffect)(() => {
		if (errorMessage) toast.error(errorMessage);
	}, [errorMessage]);
	const tooltip = (0, import_react$2.useMemo)(() => {
		if (labels?.tooltip) return labels.tooltip;
		return t("voice.tooltip", { shortcut: formatShortcut(getCurrentBinding("toggle-voice-recording")) });
	}, [labels?.tooltip, t]);
	return (0, import_react$2.useMemo)(() => {
		if (!isEnabled) return;
		return {
			isSupported: true,
			enabled: true,
			state: state === "error" ? "idle" : state,
			startRecording,
			stopRecording: () => {
				handleStop();
			},
			cancelRecording,
			recordingDuration,
			maxDuration: 60,
			analyserNode,
			tooltip
		};
	}, [
		isEnabled,
		state,
		startRecording,
		handleStop,
		cancelRecording,
		recordingDuration,
		analyserNode,
		tooltip
	]);
}
var import_react$2;
var init_use_voice_provider = __esmMin((() => {
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_product_features();
	init_useI18n();
	init_environment();
	init_shortcut_formatter();
	init_shortcut_registry();
	init_shortcut_storage();
	init_voice_input();
	init_constants();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-workspace-provider.ts
/**
* 产出 `InputWorkspaceProvider`；enabled=false / selectorConfig 缺失 / options 为空时返回 undefined。
*/
function useWorkspaceProvider(options) {
	const { enabled, selectorConfig, onCreateWorkspace, onOpenLocalFolder } = options;
	return (0, import_react$1.useMemo)(() => {
		if (!enabled || !selectorConfig) return;
		return {
			options: selectorConfig.options.map((opt) => ({
				value: opt.value,
				label: opt.label,
				displayLabel: opt.displayLabel,
				description: opt.description,
				icon: opt.icon,
				displayIcon: opt.displayIcon,
				onClick: opt.onClick,
				clickOnly: opt.clickOnly
			})),
			onChange: selectorConfig.onChange,
			onOpenChange: selectorConfig.onOpenChange,
			emptyContent: selectorConfig.emptyContent,
			onCreateWorkspace,
			onOpenLocalFolder
		};
	}, [
		enabled,
		selectorConfig,
		onCreateWorkspace,
		onOpenLocalFolder
	]);
}
var import_react$1;
var init_use_workspace_provider = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/use-chat-input-providers.ts
/**
* 生成 `Partial<InputBoxProviders>`，宿主把返回值透传到 `CBInputProps.extraProviders`。
*/
function useChatInputProviders(options) {
	const { providers, adapter, sessionId, voice, attachment, skill, referenceFiles, mode, permission, expert, workspace, connector } = options;
	const enabledKeys = (0, import_react.useMemo)(() => new Set(providers ?? ALL_PROVIDER_KEYS), [providers]);
	const voiceProvider = useVoiceProvider({
		adapter,
		sessionId,
		enabled: enabledKeys.has("voice") && (voice?.enabled ?? !!voice),
		onTextResult: voice?.onTextResult ?? (() => {}),
		labels: voice?.labels
	});
	const attachmentEnabled = enabledKeys.has("attachment");
	const attachmentAddMenuPatch = useAttachmentAddMenuProvider({
		onPickLocalFiles: attachmentEnabled ? attachment?.onPickLocalFiles : void 0,
		onPickNetDrive: attachmentEnabled ? attachment?.onPickNetDrive : void 0,
		onPickTencentDocs: attachmentEnabled ? attachment?.onPickTencentDocs : void 0,
		onPickTencentLexiang: attachmentEnabled ? attachment?.onPickTencentLexiang : void 0,
		extraItems: attachmentEnabled ? attachment?.extraItems : void 0
	});
	const skillEnabled = enabledKeys.has("skill");
	const skillProvider = useSkillProvider({
		enabled: skillEnabled,
		cwd: skill?.cwd,
		useCloud: skill?.useCloud,
		projectId: skill?.projectId,
		projectSkills: skill?.projectSkills,
		onSelect: skillEnabled ? skill?.onSelect : void 0,
		uploadTarget: skill?.uploadTarget,
		onAddLocalOverride: skill?.onAddLocalOverride,
		onManage: skill?.onManage
	});
	const referenceFilesEnabled = enabledKeys.has("referenceFiles");
	const referenceFilesProvider = useReferenceFilesProvider({
		enabled: referenceFilesEnabled,
		adapter: referenceFiles?.adapter ?? adapter ?? void 0,
		cwd: referenceFiles?.cwd,
		onInsertBlock: referenceFilesEnabled ? referenceFiles?.onInsertBlock : void 0
	});
	const modeEnabled = enabledKeys.has("mode");
	const modeProvider = useModeProvider({
		enabled: modeEnabled,
		onChange: modeEnabled ? mode?.onChange : void 0
	});
	const permissionEnabled = enabledKeys.has("permission");
	const permissionProvider = usePermissionProvider({
		enabled: permissionEnabled,
		disabled: permission?.disabled,
		onModeChange: permissionEnabled ? permission?.onModeChange : void 0
	});
	const expertEnabled = enabledKeys.has("expert");
	const expertProvider = useExpertProvider({
		enabled: expertEnabled,
		recentExperts: expert?.recentExperts,
		onSelect: expertEnabled ? expert?.onSelect : void 0,
		onSummonMore: expertEnabled ? expert?.onSummonMore : void 0,
		disableRecommended: expert?.disableRecommended
	});
	const workspaceProvider = useWorkspaceProvider({
		enabled: enabledKeys.has("workspace"),
		selectorConfig: workspace?.selectorConfig,
		onCreateWorkspace: workspace?.onCreateWorkspace,
		onOpenLocalFolder: workspace?.onOpenLocalFolder
	});
	const connectorEnabled = enabledKeys.has("connector");
	const connectorProvider = useConnectorProvider({
		enabled: connectorEnabled,
		taskId: connector?.taskId,
		items: connector?.items,
		allItems: connector?.allItems,
		onSummonMore: connectorEnabled ? connector?.onSummonMore : void 0,
		onConnectItem: connector?.onConnectItem,
		onToggleItem: connector?.onToggleItem,
		onCancelConnect: connector?.onCancelConnect
	});
	return (0, import_react.useMemo)(() => {
		const merged = {};
		if (enabledKeys.has("voice") && voiceProvider) merged.voice = voiceProvider;
		if (enabledKeys.has("attachment")) {
			if (Object.values(attachmentAddMenuPatch).some((v) => v !== void 0)) merged.attachment = attachmentAddMenuPatch;
		}
		if (skillProvider) merged.skill = skillProvider;
		if (referenceFilesProvider) merged.referenceFiles = referenceFilesProvider;
		if (modeProvider) merged.mode = modeProvider;
		if (permissionProvider) merged.permission = permissionProvider;
		if (expertProvider) merged.expert = expertProvider;
		if (workspaceProvider) merged.workspace = workspaceProvider;
		if (connectorProvider) merged.connector = connectorProvider;
		return merged;
	}, [
		enabledKeys,
		voiceProvider,
		attachmentAddMenuPatch,
		skillProvider,
		referenceFilesProvider,
		modeProvider,
		permissionProvider,
		expertProvider,
		workspaceProvider,
		connectorProvider
	]);
}
var import_react, ALL_PROVIDER_KEYS;
var init_use_chat_input_providers = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_use_attachment_add_menu_provider();
	init_use_connector_provider();
	init_use_expert_provider();
	init_use_mode_provider();
	init_use_permission_provider();
	init_use_reference_files_provider();
	init_use_skill_provider();
	init_use_voice_provider();
	init_use_workspace_provider();
	ALL_PROVIDER_KEYS = [
		"voice",
		"attachment",
		"skill",
		"connector",
		"referenceFiles",
		"mode",
		"permission",
		"expert",
		"workspace"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/icon-utils.ts
function iconValueToProviderIcon(icon) {
	if (icon == null) return;
	if (typeof icon === "object" && "kind" in icon && icon.kind === "inline-svg") return {
		kind: "inline-svg",
		source: icon.svg ?? icon.source ?? ""
	};
	return icon;
}
var init_icon_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-model-provider.ts
/** 把 cb-chat-ui 的 `ModelOption` 转成新组件的 `InputModelOption`。 */
function toInputModelOption(m) {
	return {
		id: m.id,
		name: m.label ?? m.id,
		description: m.description,
		credits: m.credits,
		icon: iconValueToProviderIcon(m.icon),
		groupId: m.groupId,
		isDefault: m.isDefault,
		supportsImages: m.supportsImages,
		supportsReasoning: m.supportsReasoning,
		onlyReasoning: m.onlyReasoning,
		canDisableThinking: m.canDisableThinking,
		defaultEffort: m.defaultEffort,
		supportedEfforts: m.supportedEfforts,
		reasoningEffort: m.reasoningEffort,
		isThinking: m.isThinking,
		isExternal: m.isExternal,
		configurable: m.configurable,
		configured: m.configured,
		disabled: m.disabled,
		disabledReason: m.disabledReason,
		disabledAction: m.disabledAction,
		actions: m.actions?.map((a) => ({
			id: a.id,
			label: a.label,
			icon: iconValueToProviderIcon(a.icon)
		})),
		badges: [...m.badges ?? [], ...m.promotionBadges ?? []]
	};
}
/**
* 同 id 去重：同 id 只保留一条，优先 non-thinking 作为主行，
* thinking 变体的 reasoning 字段融进主行。
*/
function dedupeInputModelOptions(options) {
	const byId = /* @__PURE__ */ new Map();
	for (const opt of options) {
		const existing = byId.get(opt.id);
		if (!existing) {
			byId.set(opt.id, opt);
			continue;
		}
		const nonThinking = existing.isThinking !== true ? existing : opt.isThinking !== true ? opt : void 0;
		const thinking = existing.isThinking === true ? existing : opt.isThinking === true ? opt : void 0;
		const primary = nonThinking ?? existing;
		byId.set(opt.id, {
			...primary,
			defaultEffort: primary.defaultEffort ?? thinking?.defaultEffort,
			supportedEfforts: primary.supportedEfforts ?? thinking?.supportedEfforts,
			reasoningEffort: primary.reasoningEffort ?? thinking?.reasoningEffort
		});
	}
	return Array.from(byId.values());
}
function toModelProvider(modelSelector) {
	if (!modelSelector) return;
	return {
		options: dedupeInputModelOptions(modelSelector.options.map(toInputModelOption)),
		groups: modelSelector.groups,
		selectedModel: modelSelector.selectedModel,
		isAutoMode: modelSelector.isAutoMode,
		isMaxMode: modelSelector.isMaxMode,
		onAutoModeChange: modelSelector.onAutoModeChange,
		onMaxModeChange: modelSelector.onMaxModeChange,
		onChange: (selection) => {
			modelSelector.onChange(selection.id, selection.isThinking, selection.reasoningEffort);
		},
		onEffortPreferenceChange: modelSelector.onEffortPreferenceChange,
		onThinkingPreferenceChange: modelSelector.onThinkingPreferenceChange,
		onAction: modelSelector.onAction,
		onOpenChange: modelSelector.onOpenChange,
		footerAction: modelSelector.onConfig ? {
			label: "Config",
			onClick: modelSelector.onConfig
		} : void 0
	};
}
var init_to_model_provider = __esmMin((() => {
	init_icon_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-mention-provider.ts
function toCrFooterAction$1(a) {
	return {
		label: a.label,
		icon: iconValueToProviderIcon(a.icon),
		form: a.form,
		onClick: (ref) => a.onClick(ref)
	};
}
function toCrFooterActions(list) {
	return list?.map(toCrFooterAction$1);
}
function toCrMentionSuggestion(s) {
	return {
		id: s.id,
		label: s.label,
		insertText: s.insertText,
		description: s.description,
		icon: iconValueToProviderIcon(s.icon),
		metadata: s.metadata,
		highlightText: s.highlightText,
		highlightDescText: s.highlightDescText,
		group: s.group
	};
}
function toCbMentionSuggestion(s) {
	return {
		id: s.id,
		label: s.label,
		insertText: s.insertText,
		description: s.description,
		metadata: s.metadata,
		highlightText: s.highlightText,
		highlightDescText: s.highlightDescText,
		group: s.group
	};
}
function toMentionProvider(mentionConfig, onBeforeSelectMention) {
	if (!mentionConfig || !mentionConfig.providers?.length) return;
	return {
		sources: mentionConfig.providers.map((p) => ({
			id: p.id,
			name: p.name,
			description: p.description,
			icon: iconValueToProviderIcon(p.icon),
			showInMenu: p.showInMenu,
			hasSubList: p.hasSubList,
			multiSelect: p.multiSelect,
			placeholder: p.placeholder,
			searchEmptyText: p.searchEmptyText,
			emptyText: p.emptyText,
			autoSelectSingleSuggestion: p.autoSelectSingleSuggestion,
			fetchSuggestions: async (req) => {
				const res = await p.fetchSuggestions(req);
				return {
					suggestions: res.suggestions.map(toCrMentionSuggestion),
					hasMore: res.hasMore
				};
			},
			fetchMenuSuggestions: p.fetchMenuSuggestions ? async () => {
				const res = await p.fetchMenuSuggestions();
				return {
					suggestions: res.suggestions.map(toCrMentionSuggestion),
					hasMore: res.hasMore
				};
			} : void 0,
			onSelect: p.onSelect ? (suggestion, request) => p.onSelect(toCbMentionSuggestion(suggestion), request) : void 0,
			convertToContentBlock: (suggestion) => p.convertToContentBlock(toCbMentionSuggestion(suggestion)),
			footerActions: toCrFooterActions(p.footerActions)
		})),
		placeholderWhenMultiProviders: mentionConfig.placeholderWhenMultiProviders,
		panelClassName: mentionConfig.panelClassName,
		buttonLabel: mentionConfig.buttonLabel,
		buttonPlacement: mentionConfig.buttonPlacement,
		onBeforeSelect: onBeforeSelectMention ? async (suggestion) => {
			return await onBeforeSelectMention(toCbMentionSuggestion(suggestion), PhraseTrigger.at);
		} : void 0
	};
}
var init_to_mention_provider = __esmMin((() => {
	init_src();
	init_icon_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-command-provider.ts
function toCrFooterAction(a) {
	return {
		label: a.label,
		icon: iconValueToProviderIcon(a.icon),
		form: a.form,
		onClick: (ref) => a.onClick(ref)
	};
}
function toCrCommandItem(c) {
	return {
		name: c.name,
		description: c.description,
		icon: iconValueToProviderIcon(c.icon),
		category: c.category === CommandCategory.SKILL ? "skill" : c.category === CommandCategory.COMMAND ? "command" : void 0,
		tags: c.tags,
		autoTriggerMention: c.autoTriggerMention,
		attachedSkill: c.attachedSkill,
		argumentHint: c.argumentHint,
		prompt: c.prompt,
		metadata: c.metadata,
		disabled: c.disabled
	};
}
function toCommandProvider(commandProvider) {
	if (!commandProvider) return;
	return {
		fetchCommands: async (query, context) => {
			return (await commandProvider.fetchCommands(query, context)).map(toCrCommandItem);
		},
		footerActions: commandProvider.footerActions?.map(toCrFooterAction)
	};
}
var init_to_command_provider = __esmMin((() => {
	init_src();
	init_icon_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-attachment-provider.ts
function readFileAsBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;
			resolve(result.split(",")[1] ?? "");
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
function buildBlock(blockId, file, mimeType, filename, isImage, base64, status) {
	const commonMeta = {
		[BlockMeta.BLOCK_ID]: blockId,
		[BlockMeta.BLOCK_STATUS]: status,
		timestamp: Date.now(),
		path: "",
		size: file.size,
		originalFilename: file.name,
		type: isImage ? "image" : "file",
		mentionType: isImage ? "image" : "file",
		fileName: filename
	};
	if (isImage) return createImageBlock(base64 ?? "", mimeType, "", {
		icon: "image",
		blockId,
		blockStatus: status,
		filename,
		meta: commonMeta
	});
	return createFileBlock("", mimeType, filename, {
		icon: "file",
		blockId,
		blockStatus: status,
		size: file.size,
		meta: commonMeta
	});
}
/** 合成 `InputAttachmentProvider.process(file)`。 */
function createAttachmentProcess(options) {
	const { attachmentConfig, fileProcessor, store } = options;
	return async (file) => {
		const isImage = file.type.startsWith("image/");
		const timestamp = Date.now();
		if (fileProcessor?.validate) {
			const fileData = {
				file,
				mimeType: file.type,
				originalFilename: file.name,
				size: file.size,
				isImage
			};
			let valid = false;
			try {
				valid = await fileProcessor.validate(fileData);
			} catch {
				valid = false;
			}
			if (!valid) return { block: void 0 };
		}
		let mimeType = file.type;
		let filename = file.name;
		let blockId = generateBlockId();
		if (fileProcessor?.beforeInsert) try {
			const result = await fileProcessor.beforeInsert({
				file,
				mimeType: file.type,
				filename: file.name,
				originalFilename: file.name,
				size: file.size,
				timestamp,
				isImage
			});
			if (result === null) return { block: void 0 };
			if (result.mimeType) mimeType = result.mimeType;
			if (result.filename) filename = result.filename;
			if (result.blockId) blockId = result.blockId;
		} catch {
			return { block: void 0 };
		}
		let base64;
		if (isImage) try {
			base64 = await readFileAsBase64(file);
		} catch {}
		let block = buildBlock(blockId, file, mimeType, filename, isImage, base64, "processing");
		const storeBacked = !!store;
		const blockState = { status: "processing" };
		const updateBlock = (updates) => {
			if (storeBacked) store.api.updateBlock(blockId, updates);
			else block = {
				...block,
				...updates,
				_meta: {
					...block._meta,
					...updates._meta ?? {}
				}
			};
		};
		const setStatus = (status, error) => {
			blockState.status = status;
			updateBlock({ _meta: {
				[BlockMeta.BLOCK_STATUS]: status,
				...error ? { [BlockMeta.BLOCK_ERROR]: error } : {}
			} });
		};
		const notify = (status, result) => {
			attachmentConfig?.onBlockStatusChange?.(blockId, status, result);
		};
		if (storeBacked) store.api.insertBlocks([block], { focus: true });
		try {
			if (fileProcessor?.afterInsert) {
				const afterInsertData = {
					blockId,
					block,
					updateBlock,
					setStatus,
					file,
					base64,
					mimeType,
					filename,
					originalFilename: file.name,
					size: file.size,
					timestamp,
					isImage,
					onBlockStatusChange: notify
				};
				await fileProcessor.afterInsert(afterInsertData);
			}
			if (blockState.status !== "completed" && blockState.status !== "failed") {
				setStatus("completed");
				notify("completed", {
					base64,
					mimeType
				});
			}
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			setStatus("failed", msg);
			notify("failed", { error: msg });
		}
		return { block };
	};
}
/** 合成 `InputAttachmentProvider.processUri(uri)`。 */
function createAttachmentProcessUri(options) {
	const { fileProcessor } = options;
	return async (uri) => {
		if (!fileProcessor?.processUriFile) return false;
		try {
			return await fileProcessor.processUriFile(uri);
		} catch {
			return false;
		}
	};
}
/** 组装完整 InputAttachmentProvider（骨架层，不含加号菜单子入口）。 */
function toAttachmentProvider(attachmentConfig, fileProcessor, pasteHandler, store) {
	if (!attachmentConfig && !fileProcessor && !pasteHandler) return;
	return {
		constraints: attachmentConfig ? {
			acceptTypes: attachmentConfig.fileAccept,
			acceptExtensions: attachmentConfig.fileAcceptExtensions,
			maxFileSize: attachmentConfig.fileMaxSize
		} : void 0,
		process: attachmentConfig || fileProcessor ? createAttachmentProcess({
			attachmentConfig,
			fileProcessor,
			requireCloudUpload: attachmentConfig?.requireCloudUpload,
			store
		}) : void 0,
		processUri: fileProcessor?.processUriFile ? createAttachmentProcessUri({
			attachmentConfig,
			fileProcessor
		}) : void 0,
		onPaste: pasteHandler ? async (event) => {
			const dt = event.clipboardData;
			if (!dt) return null;
			return pasteHandler(dt);
		} : void 0,
		onError: attachmentConfig?.onError ? (code, file) => attachmentConfig.onError(String(code), file) : void 0
	};
}
var init_to_attachment_provider = __esmMin((() => {
	init_src();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-enhance-provider.ts
function toEnhanceProvider(enhancePromptConfig) {
	if (!enhancePromptConfig) return;
	return {
		disabled: enhancePromptConfig.disabled,
		minTextLength: enhancePromptConfig.minTextLength,
		isEnhancing: enhancePromptConfig.isEnhancing,
		hasEnhancePrompt: enhancePromptConfig.hasEnhancePrompt,
		errorMessage: enhancePromptConfig.errorMessage,
		pendingApply: enhancePromptConfig.pendingApply,
		onEnhance: enhancePromptConfig.onTriggerEnhance,
		onCancel: enhancePromptConfig.onCancel,
		onRevert: enhancePromptConfig.onRevert,
		onContentDiverged: enhancePromptConfig.onContentDiverged,
		acknowledgePendingApply: enhancePromptConfig.acknowledgePendingApply
	};
}
var init_to_enhance_provider = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-mode-provider.ts
function toModeProvider(onModeChange) {
	if (!onModeChange) return;
	return { onChange: (selection) => onModeChange(selection.id) };
}
var init_to_mode_provider = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-permission-provider.ts
function toPermissionProvider(permissionModeConfig) {
	if (!permissionModeConfig) return;
	return {
		disabled: permissionModeConfig.disabled,
		onModeChange: (mode) => permissionModeConfig.onModeChange(mode)
	};
}
var init_to_permission_provider = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-expert-provider.ts
function toInputExpertSelection(e) {
	return {
		id: e.id,
		name: e.name,
		profession: e.profession,
		avatarUrl: e.avatarUrl,
		prompt: e.defaultInitPrompt,
		defaultInitPrompt: e.defaultInitPrompt,
		expertType: e.expertType,
		pluginName: e.pluginName,
		summonedAt: e.summonedAt
	};
}
function toExpertProvider(modeSelector) {
	if (!modeSelector) return;
	const { recentExperts, onSelectRecentExpert, onSummonExpert } = modeSelector;
	if (!recentExperts?.length && !onSelectRecentExpert && !onSummonExpert) return;
	return {
		recentExperts: recentExperts?.map(toInputExpertSelection),
		onChange: onSelectRecentExpert ? (expert) => {
			if (!expert) return;
			const found = recentExperts?.find((e) => e.id === expert.id);
			onSelectRecentExpert(found ?? {
				id: expert.id,
				name: expert.name ?? "",
				profession: expert.profession ?? "",
				avatarUrl: expert.avatarUrl,
				summonedAt: expert.summonedAt ?? Date.now(),
				defaultInitPrompt: expert.defaultInitPrompt,
				expertType: expert.expertType,
				pluginName: expert.pluginName
			});
		} : void 0,
		onSummonMore: onSummonExpert
	};
}
var init_to_expert_provider = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/aggregate.ts
function cbInputPropsToInputBoxProviders(props, store) {
	return {
		model: toModelProvider(props.modelSelector),
		mode: toModeProvider(props.onModeChange),
		permission: toPermissionProvider(props.permissionModeConfig),
		expert: toExpertProvider(props.modeSelector),
		mention: toMentionProvider(props.mentionConfig, props.onBeforeSelectMention),
		command: toCommandProvider(props.commandProvider),
		attachment: toAttachmentProvider(props.attachmentConfig, props.fileProcessor, props.pasteHandler, store),
		enhance: toEnhanceProvider(props.enhancePromptConfig),
		phraseRenderer: props.phraseRenderer
	};
}
var init_aggregate = __esmMin((() => {
	init_to_attachment_provider();
	init_to_command_provider();
	init_to_enhance_provider();
	init_to_expert_provider();
	init_to_mention_provider();
	init_to_mode_provider();
	init_to_model_provider();
	init_to_permission_provider();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/merge-providers.ts
function mergeProviders(base, overrides) {
	if (!overrides) return base;
	const merged = { ...base };
	for (const key of Object.keys(overrides)) {
		const overrideValue = overrides[key];
		if (overrideValue === void 0) continue;
		const baseValue = base[key];
		if (baseValue && typeof baseValue === "object" && typeof overrideValue === "object") merged[key] = {
			...baseValue,
			...overrideValue
		};
		else merged[key] = overrideValue;
	}
	return merged;
}
var init_merge_providers = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-send-handler.ts
function createSendHandlerFromOnSubmit(onSubmit, options) {
	return async (draft) => {
		const blocks = draft.content.blocks;
		if (!blocks || blocks.length === 0) return {
			ok: false,
			reason: "empty"
		};
		if (options?.beforeSend) {
			if (!await options.beforeSend(blocks)) return {
				ok: false,
				reason: "before-send-rejected"
			};
		}
		try {
			await onSubmit(blocks);
			return { ok: true };
		} catch (error) {
			return {
				ok: false,
				reason: "error",
				error
			};
		}
	};
}
var init_to_send_handler = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/to-connector-items.ts
function connectorSubmenuItemToInputItem(item) {
	return {
		id: item.id,
		name: item.name,
		description: item.description,
		icon: item.icon,
		authMode: item.authMode,
		source: item.source,
		isConnected: item.isConnected,
		everConnected: item.everConnected,
		enabled: item.enabled,
		canToggle: item.canToggle,
		raw: item.raw ?? item,
		tag: item.tag,
		disabledReason: item.disabledReason
	};
}
function connectorSubmenuItemsToInputItems(items) {
	if (!items) return;
	return items.map(connectorSubmenuItemToInputItem);
}
var init_to_connector_items = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/mappers/index.ts
var init_mappers = __esmMin((() => {
	init_to_model_provider();
	init_to_mention_provider();
	init_to_command_provider();
	init_to_attachment_provider();
	init_to_enhance_provider();
	init_to_mode_provider();
	init_to_permission_provider();
	init_to_expert_provider();
	init_icon_utils();
	init_aggregate();
	init_merge_providers();
	init_to_send_handler();
	init_to_connector_items();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-input-providers/index.ts
var init_chat_input_providers = __esmMin((() => {
	init_use_chat_input_providers();
	init_use_voice_provider();
	init_use_attachment_add_menu_provider();
	init_use_skill_provider();
	init_use_reference_files_provider();
	init_use_mode_provider();
	init_use_permission_provider();
	init_use_expert_provider();
	init_use_workspace_provider();
	init_use_connector_provider();
	init_use_skill_add_local_flow();
	init_chat_input_portals();
	init_use_experts_suggestions();
	init_mappers();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/acp-reconnect-retry.ts
function getAcpErrorMessage(error) {
	if (error instanceof Error) return error.message;
	if (error && typeof error === "object") {
		const record = error;
		const message = record.message ?? record.msg ?? record.error;
		if (typeof message === "string") return message;
	}
	return String(error);
}
function isAcpConnectionClosedError(error) {
	const message = getAcpErrorMessage(error).toLowerCase();
	if (!message) return false;
	return ACP_CLOSED_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}
function waitForAcpReconnectRetry(attempt) {
	return new Promise((resolve) => setTimeout(resolve, ACP_CONNECTION_RETRY_DELAY_MS * attempt));
}
async function runAcpConnectionRetry(operation, options) {
	const maxAttempts = options.maxAttempts ?? 3;
	const shouldRetry = options.shouldRetry ?? isAcpConnectionClosedError;
	const waitForRetry = options.waitForRetry ?? waitForAcpReconnectRetry;
	let lastError;
	for (let attempt = 1; attempt <= maxAttempts; attempt += 1) try {
		return await operation(attempt);
	} catch (error) {
		lastError = error;
		const willRetry = shouldRetry(error) && attempt < maxAttempts;
		console.warn("[acp-retry][failed]", {
			source: options.source,
			attempt,
			willRetry,
			error: getAcpErrorMessage(error)
		});
		try {
			options.onAttemptFailed?.({
				attempt,
				maxAttempts,
				willRetry,
				error
			});
		} catch (callbackErr) {
			console.warn("[acp-retry][onAttemptFailed][threw]", callbackErr);
		}
		if (!willRetry) throw error;
		await waitForRetry(attempt);
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error(`[acp-retry] failed after ${maxAttempts} attempts`);
}
var ACP_CONNECTION_RETRY_DELAY_MS, ACP_CLOSED_ERROR_PATTERNS;
var init_acp_reconnect_retry = __esmMin((() => {
	ACP_CONNECTION_RETRY_DELAY_MS = 500;
	ACP_CLOSED_ERROR_PATTERNS = [
		"acp connection closed",
		"acp connection cancelled",
		"connection closed",
		"sse connection closed",
		"sse stream closed",
		"sse stream disconnected",
		"eventsource closed",
		"eventsource connection closed",
		"stream disconnected",
		"stream closed",
		"signal is aborted",
		"this operation was aborted",
		"aborterror",
		"initialize timed out"
	];
}));
//#endregion
export { init_chat_input_providers as a, mergeProviders as c, ChatInputPortals as d, runAcpConnectionRetry as i, cbInputPropsToInputBoxProviders as l, init_acp_reconnect_retry as n, connectorSubmenuItemsToInputItems as o, isAcpConnectionClosedError as r, createSendHandlerFromOnSubmit as s, getAcpErrorMessage as t, useChatInputProviders as u };
