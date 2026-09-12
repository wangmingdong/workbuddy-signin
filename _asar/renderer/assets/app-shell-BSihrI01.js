import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $d as taskStarterCwd$, Ad as init_pending_session_select, Cd as consumePendingDeepLinkUrl, Dd as subscribePendingDeepLinkUrl, Gu as useAgentMailFeature, Ju as useTencentLexiangEnabled, Kd as init_task_starter_store, Md as init_purchase, Od as init_deep_link_routes, Pd as openPurchaseModal, Td as init_deeplink_pending_url, ad as init_use_product_feature, cd as useKnowledgeBaseFeature, cr as init_main_route_outlet, id as useTencentDocsKnowledgeFeature, jd as pendingSessionSelectStore, kd as resolveDeepLinkFromUrl, ld as init_use_ima_enabled, nd as init_use_tencent_docs_knowledge_feature, od as useProductFeature, qu as init_use_tencent_lexiang_enabled, sd as init_use_knowledge_base_feature, t as init_agent_mail, ud as useImaEnabled } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { f as useNavigate, r as init_dist, u as useLocation } from "./dist-BlOCCi14.js";
import { t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { A as init_route_matchers, C as BRAND_GATE_REDIRECT_EVENT, D as publishShellRouteGates, E as isShellViewAllowed, j as matchShellRoute, w as init_brand_route_gates } from "./router-O5ZnP5xt.js";
import { a as myFilesStore, n as init_store } from "./store-BI1MDwNq.js";
import { n as init_route_path_tracker, r as setCurrentRoutePath } from "./route-path-tracker-D4O9Dve0.js";
//#region ../../packages/agent-ui/src/app-shell/effects/use-route-side-effects.ts
function isCurrentClawConversation(conversation) {
	return Boolean(conversation?.id) && /[/\\]Claw$/i.test(conversation?.cwd || "");
}
function shouldClearCurrentConversation(route, conversation) {
	if (!route.handle.clearCurrentConversation) return false;
	return route.handle.view === "claw" ? !isCurrentClawConversation(conversation) : true;
}
/** 执行 route 元数据声明的一次性副作用：清会话 / 复位 task starter cwd。 */
function applyRouteSideEffects(route, context) {
	if (route.handle.resetTaskStarterCwd) taskStarterCwd$.next("");
	if (shouldClearCurrentConversation(route, context.currentConversation)) context.setCurrentConversation(null);
}
/** route → 一次性状态复位；仅保留合法的 URL → state 单向复位。 */
function useRouteSideEffects(pathname, conversations) {
	const conversationsRef = (0, import_react$3.useRef)(conversations);
	(0, import_react$3.useEffect)(() => {
		conversationsRef.current = conversations;
	});
	(0, import_react$3.useEffect)(() => {
		const route = matchShellRoute(pathname);
		if (route) applyRouteSideEffects(route, conversationsRef.current);
	}, [pathname]);
}
var import_react$3;
var init_use_route_side_effects = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_task_starter_store();
	init_route_matchers();
}));
//#endregion
//#region ../../packages/agent-ui/src/navigation/deeplink/use-deep-link-navigation.ts
/**
* 订阅并消费 workbuddy:// deep-link。
*
* URL 解析是纯函数；本 hook 只处理 telemetry、brand gate、store 写入与 navigate 副作用。
*/
function useDeepLinkNavigation({ conversations, gates, pathname, adapter, navigate }) {
	const conversationsRef = (0, import_react$2.useRef)(conversations);
	const gatesRef = (0, import_react$2.useRef)(gates);
	const pathnameRef = (0, import_react$2.useRef)(pathname);
	(0, import_react$2.useEffect)(() => {
		conversationsRef.current = conversations;
		gatesRef.current = gates;
		pathnameRef.current = pathname;
	});
	(0, import_react$2.useEffect)(() => {
		const handleDeepLink = (url) => {
			if (!url) return;
			const resolution = resolveDeepLinkFromUrl(url);
			if (resolution.kind === "invalid") {
				console.warn("[DeepLinkNavigation] deep link url parse failed:", url);
				return;
			}
			if (resolution.kind === "purchase") {
				openPurchaseModal({
					url: resolution.href,
					source: "deeplink"
				});
				return;
			}
			if (resolution.kind === "unknown") {
				console.warn("[DeepLinkNavigation] unknown deep link host, ignored:", resolution.host);
				return;
			}
			const { host, resolvedPath, replace, pendingTaskId, myFiles } = resolution;
			const targetRoute = matchShellRoute(resolvedPath);
			if (targetRoute && !isShellViewAllowed(targetRoute.handle.view, gatesRef.current)) {
				adapter.reportTelemetry(BRAND_GATE_REDIRECT_EVENT, {
					source: "deeplink",
					page: host.toLowerCase(),
					pageURL: resolvedPath,
					pageName: targetRoute.handle.view
				});
				if (pathnameRef.current !== "/") navigate("/", { replace: true });
				return;
			}
			adapter.reportTelemetry(DEEP_LINK_ENTRY_EVENT, {
				source: "deeplink",
				page: host.toLowerCase(),
				pageURL: resolvedPath
			});
			if (targetRoute) applyRouteSideEffects(targetRoute, conversationsRef.current);
			if (myFiles) {
				myFilesStore.getState().triggerCapacityRefresh();
				if (myFiles.activeTab === "cloudFiles") myFilesStore.getState().setActiveTab("cloudFiles");
			}
			if (pathnameRef.current !== resolvedPath) navigate(resolvedPath, { replace });
			if (pendingTaskId) pendingSessionSelectStore.getState().setPendingSessionId(pendingTaskId);
		};
		const unsubscribe = subscribePendingDeepLinkUrl(handleDeepLink);
		const consumed = consumePendingDeepLinkUrl();
		if (consumed) handleDeepLink(consumed.url);
		return unsubscribe;
	}, [adapter, navigate]);
}
var import_react$2, DEEP_LINK_ENTRY_EVENT;
var init_use_deep_link_navigation = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_use_route_side_effects();
	init_store();
	init_purchase();
	init_brand_route_gates();
	init_route_matchers();
	init_pending_session_select();
	init_deep_link_routes();
	init_deeplink_pending_url();
	DEEP_LINK_ENTRY_EVENT = "workbuddy_deeplink_entry";
}));
//#endregion
//#region ../../packages/agent-ui/src/router/use-shell-route-gates.ts
/**
* 组装 brand gate 判定所需的各功能开关（与 sidebar「更多」菜单入口隐藏逻辑同源）。
*
* 只应由常驻 RouterEffects 调用，并通过 `publishShellRouteGates()` 发布快照。
* BrandGate / MainRouteOutlet 等路由渲染路径必须读取 `useShellRouteGatesSnapshot()`，
* 避免路由激活时新建异步 feature hook 实例。
*/
function useShellRouteGates() {
	const { enabled: imaEnabled } = useImaEnabled();
	const knowledgeBaseEnabled = useKnowledgeBaseFeature();
	const tencentDocsEnabled = useTencentDocsKnowledgeFeature();
	const { enabled: lexiangEnabled } = useTencentLexiangEnabled();
	const agentMailEnabled = useAgentMailFeature();
	const inspirationEnabled = useProductFeature("Discover", {
		mode: "enable",
		defaultEnabled: true
	});
	return (0, import_react$1.useMemo)(() => ({
		"my-files": knowledgeBaseEnabled,
		"tencent-docs": tencentDocsEnabled,
		ima: imaEnabled,
		lexiang: lexiangEnabled,
		inspiration: inspirationEnabled,
		"agent-mail": agentMailEnabled
	}), [
		knowledgeBaseEnabled,
		tencentDocsEnabled,
		imaEnabled,
		lexiangEnabled,
		inspirationEnabled,
		agentMailEnabled
	]);
}
var import_react$1;
var init_use_shell_route_gates = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_use_ima_enabled();
	init_use_knowledge_base_feature();
	init_use_product_feature();
	init_use_tencent_docs_knowledge_feature();
	init_use_tencent_lexiang_enabled();
	init_agent_mail();
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/effects/router-effects.tsx
/** 挂载 router 相关全局副作用：route path tracker、route side effects 与 deep-link 桥。 */
function RouterEffects() {
	const location = useLocation();
	const navigate = useNavigate();
	const adapter = useAdapter();
	const conversations = useConversations();
	const gates = useShellRouteGates();
	const conversationsRef = (0, import_react.useRef)(conversations);
	(0, import_react.useEffect)(() => {
		conversationsRef.current = conversations;
	});
	(0, import_react.useEffect)(() => {
		publishShellRouteGates(gates);
	}, [gates]);
	(0, import_react.useEffect)(() => {
		setCurrentRoutePath(location.pathname);
	}, [location.pathname]);
	useRouteSideEffects(location.pathname, conversations);
	useDeepLinkNavigation({
		conversations,
		gates,
		pathname: location.pathname,
		adapter,
		navigate
	});
	return null;
}
var import_react;
var init_router_effects = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_contexts();
	init_use_deep_link_navigation();
	init_brand_route_gates();
	init_use_shell_route_gates();
	init_route_path_tracker();
	init_use_route_side_effects();
}));
//#endregion
//#region ../../packages/agent-ui/src/app-shell/index.ts
var init_app_shell = __esmMin((() => {
	init_router_effects();
	init_main_route_outlet();
}));
//#endregion
export { RouterEffects as n, init_app_shell as t };
