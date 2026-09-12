import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Cn as marketTabToPath, Gc as ConnectorPanel, Nc as init_connector, Sn as init_unified_market_header, U as init_expert, Y as ExpertCenterPage, wn as useVisibleMarketTabs, xn as UnifiedMarketHeader } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { f as useNavigate, r as init_dist, u as useLocation } from "./dist-BlOCCi14.js";
import { t as init_foundation, v as Breadcrumb } from "./foundation-QOglV606.js";
import { rr as ChevronLeftIcon } from "./icons-Cj3UopO9.js";
import { n as useI18n, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { n as init_skills, t as SkillsPanel } from "./skills-8UqBvkjc.js";
//#region ../../packages/agent-ui/src/components/unified-market/unified-market-page.tsx
/** 从 pathname 解析当前 tab */
function resolveTab(pathname) {
	if (pathname.startsWith("/skills")) return "skills";
	if (pathname.startsWith("/connectors")) return "connectors";
	return "experts";
}
var import_react$1, import_jsx_runtime$1, UnifiedMarketPage;
var init_unified_market_page = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_foundation();
	init_useI18n();
	init_connector();
	init_expert();
	init_skills();
	init_unified_market_header();
	import_jsx_runtime$1 = require_jsx_runtime();
	UnifiedMarketPage = ({ visible = true, active = true, initialTab }) => {
		const location = useLocation();
		const navigate = useNavigate();
		const { t } = useI18n();
		const activeTab = (0, import_react$1.useMemo)(() => initialTab ?? resolveTab(location.pathname), [initialTab, location.pathname]);
		const visibleTabs = useVisibleMarketTabs();
		(0, import_react$1.useEffect)(() => {
			if (visibleTabs.length === 0) return;
			if (!visibleTabs.some((tab) => tab.key === activeTab)) navigate(marketTabToPath(visibleTabs[0].key), { replace: true });
		}, [
			visibleTabs,
			activeTab,
			navigate
		]);
		const handleTabChange = (0, import_react$1.useCallback)((tab) => {
			navigate(marketTabToPath(tab));
		}, [navigate]);
		/**
		* 技能详情态 header 左侧渲染策略：
		*   - 从「我安装的」进入 → 两级面包屑「全部技能 / 我安装的」，配 ChevronLeft 作为 leadingIcon，
		*     与「我安装的」子页的返回按钮视觉一致
		*   - 从「全部技能」直接进入 → 返回 null，让 SkillsPanel 用默认的"‹ 技能"返回按钮
		*
		* 这里把 Breadcrumb 装配放在路由层而不是 SkillsPanel 内部，
		* 是为了让 SkillsPanel 不感知具体导航 UI 形态（解耦原则）。
		*/
		const renderSkillsDetailBack = (0, import_react$1.useCallback)((ctx) => {
			if (!ctx.fromInstalled) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Breadcrumb, {
				highlightLast: true,
				leadingIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronLeftIcon, {
					width: 16,
					height: 16
				}),
				onLeadingIconClick: () => ctx.onBackToInstalled(),
				leadingIconAriaLabel: t("unifiedMarket.myInstalled"),
				items: [{
					key: "all-skills",
					label: t("unifiedMarket.backToAllSkills"),
					onClick: (e) => {
						e.preventDefault();
						ctx.onBackToMarket();
					}
				}, {
					key: "installed",
					label: t("unifiedMarket.myInstalled"),
					onClick: (e) => {
						e.preventDefault();
						ctx.onBackToInstalled();
					}
				}]
			});
		}, [t]);
		if (!visible) return null;
		const tabs = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(UnifiedMarketHeader, {
			activeTab,
			onTabChange: handleTabChange
		});
		switch (activeTab) {
			case "connectors": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorPanel, {
				visible: true,
				active,
				hideHeader: true,
				headerLeft: tabs
			});
			case "skills": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillsPanel, {
				visible,
				active,
				headerLeft: tabs,
				renderDetailBack: renderSkillsDetailBack
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExpertCenterPage, {
				visible,
				active,
				headerLeft: tabs
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/pages/market.tsx
function MarketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifiedMarketPage, {
		visible: true,
		active: true
	});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_unified_market_page();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { MarketPage };
