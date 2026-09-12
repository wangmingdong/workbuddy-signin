const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./docx-preview-component-CjwFTC73.js","./chunk-BRZcfu7K.js","./classnames-BYn3_ESJ.js","./jszip.min-BlT6AB6w.js","./dist-DNjXzICC.js","./dist-CSHw4oQX.js","./jsx-runtime-BNEdAQtr.js","./react-ierAfTWN.js","./useI18n-EyL4WIXZ.js","./media.module-xXG5L1DD.js","./media-D0jCYV4T.css","./docx-preview-component-VQg4fiKY.css","./pptx-preview-component-Dj5gWOZp.js","./lodash-CQINZbUj.js","./tslib.es6-8NkKEYUK.js","./pptx-preview-component-CxR1r2Ze.css","./sheet-preview-component-DtiPBU6h.js","./preload-helper-E3UYCQGP.js","./immer.esm-DQZHj7k-.js","./sheet-preview-component-B-PSsErQ.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $ as isExpertVisibleForEnterpriseId, Q as init_visibility, Sc as init_app_providers, Tc as useAgentServices, U as init_expert, Xl as init_services, at as shouldSkipFinanceRiskConfirmation, eu as useSkillsMarketplaceFacade, it as getTeamSummonConfirmStorageKey, ll as init_telemetry_context, nt as getFinanceRiskLegacySuppressStorageKey, ot as shouldSkipTeamSummonConfirmation, q as createBrowserStorage, rt as getFinanceRiskSuppressDateStorageKey, sl as init_telemetry, tt as getCurrentDateKey, tu as usePersonalSkillsFacade, ul as useAgentTelemetry, ut as getRecentExpertsScopeKey } from "./agent-mail-CiuzbR2o.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { Gs as createPhraseBlock, ni as ConfirmDialog, oi as MarkdownRenderer, so as sanitizeSvg, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { c as MarkdownViewer, t as init_src$1 } from "./src-BNWvGoZP.js";
import { F as BrowserPreviewContextProvider, j as Frame } from "./FileTabs-OcDV9oyi.js";
import { a as init_i18n, n as getLocale, u as t } from "./i18n-Bt_Wap4p.js";
import { a as useArdotAuth, i as ArdotAuthContent, n as ArdotEmbedHost, r as ensureArdotAuthStyles, t as init_src$2 } from "./src-Qa0M5Tg8.js";
import { D as useAccountService, E as init_auth_context, _t as useAccount, t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { n as useTheme, t as init_useTheme } from "./useTheme-KZ-Qaric.js";
import { g as Tooltip, t as init_foundation } from "./foundation-QOglV606.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as init_types, n as PlaybookCtaSource } from "./types-B5gc2qW1.js";
import { ht as writeCache, mt as readCache, pt as init_local_cache, r as useExpertAvatar } from "./center-Cjtv6Q1N.js";
import { o as init_ardot_canvas, s as isArdotEmbedUrl } from "./ardot-canvas-BbVvf1Ta.js";
import { c as DISCOVER_COS_CONFIG, d as init_types$1, f as resolveTaskMode, i as init_utils, n as getLocalizedField, o as resolvePlaybookAssetUrl, r as getLocalizedText$1, s as DISCOVER_CACHE_KEYS, u as PlaybookArtifactType } from "./utils-CV8kqybT.js";
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-locale.ts
function useLocale() {
	(0, import_react$22.useTransition)();
	return getLocale() !== "en" ? "zh" : "en";
}
var import_react$22;
var init_use_locale = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-discover.ts
function getErrorMessage$1(error) {
	if (error instanceof Error) return error.message;
	return String(error);
}
function getLocalizedText(value, locale, fallback = "") {
	if (!value) return fallback;
	if (typeof value === "string") return value;
	return value[locale] ?? value.zh ?? value.en ?? fallback;
}
/** 按关键词过滤 Cases */
function filterCasesByKeyword(cases, keyword, locale) {
	const kw = keyword.trim().toLowerCase();
	if (!kw) return cases;
	return cases.filter((c) => {
		const title = getLocalizedText(c.title, locale).toLowerCase();
		const subtitle = getLocalizedText(c.subtitle, locale).toLowerCase();
		const description = getLocalizedText(c.description, locale).toLowerCase();
		const promptText = getLocalizedText(c.prompt, locale).toLowerCase();
		const tags = (c.tags ?? []).join(" ").toLowerCase();
		return title.includes(kw) || subtitle.includes(kw) || description.includes(kw) || promptText.includes(kw) || tags.includes(kw);
	});
}
/** 从 COS 获取 JSON 数据 */
async function fetchFromCOS(path) {
	const url = `${DISCOVER_COS_CONFIG.baseUrl}${path}`;
	const response = await fetch(url, { cache: "no-cache" });
	if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
	return response.json();
}
/** 按分类过滤 */
function filterByCategory(cases, categoryId) {
	if (categoryId === null) return cases;
	return cases.filter((c) => c.categories.includes(categoryId));
}
function useDiscover(selectedCategory, searchKeyword, favFilterActive, favoriteIds, enterpriseId) {
	const { account } = useAccount();
	const locale = useLocale();
	const effectiveEnterpriseId = enterpriseId ?? account?.enterpriseId ?? "";
	const [categories, setCategories] = (0, import_react$21.useState)([]);
	const [allCases, setAllCases] = (0, import_react$21.useState)([]);
	const [featuredItems, setFeaturedItems] = (0, import_react$21.useState)([]);
	const allCasesLoadedRef = (0, import_react$21.useRef)(false);
	const [isLoading, setIsLoading] = (0, import_react$21.useState)(true);
	const [error, setError] = (0, import_react$21.useState)(null);
	/** 从 COS 拉取最新数据并更新状态 + 缓存 */
	const fetchAndUpdate = (0, import_react$21.useCallback)(async () => {
		const [catResponse, regResponse, featResponse] = await Promise.all([
			fetchFromCOS(DISCOVER_COS_CONFIG.categoriesPath),
			fetchFromCOS(DISCOVER_COS_CONFIG.registryPath),
			fetchFromCOS(DISCOVER_COS_CONFIG.featuredPath)
		]);
		const freshCategories = catResponse.categories;
		const freshCases = regResponse.cases;
		const sortedItems = (featResponse.items || []).sort((a, b) => a.order - b.order);
		setCategories(freshCategories);
		setAllCases(freshCases);
		allCasesLoadedRef.current = true;
		setFeaturedItems(sortedItems);
		registryMemoryCache.categories = freshCategories;
		registryMemoryCache.cases = freshCases;
		registryMemoryCache.featured = sortedItems;
	}, []);
	(0, import_react$21.useEffect)(() => {
		let disposed = false;
		const loadData = async () => {
			setError(null);
			const cachedCategories = registryMemoryCache.categories;
			const cachedRegistry = registryMemoryCache.cases;
			const cachedFeatured = registryMemoryCache.featured;
			if (cachedCategories && cachedRegistry) {
				setCategories(cachedCategories);
				setAllCases(cachedRegistry);
				allCasesLoadedRef.current = true;
				if (cachedFeatured) setFeaturedItems(cachedFeatured);
				setIsLoading(false);
			}
			try {
				if (disposed) return;
				await fetchAndUpdate();
			} catch (err) {
				if (!disposed) {
					if (!cachedCategories || !cachedRegistry) setError(getErrorMessage$1(err));
				}
			} finally {
				if (!disposed) setIsLoading(false);
			}
		};
		loadData().catch((err) => {
			console.error("[useDiscover] Unexpected error in loadData:", err);
		});
		return () => {
			disposed = true;
		};
	}, []);
	const refresh = (0, import_react$21.useCallback)(async () => {
		setIsLoading(true);
		setError(null);
		try {
			await fetchAndUpdate();
		} catch (err) {
			setError(getErrorMessage$1(err));
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, [fetchAndUpdate]);
	const filteredAllCases = (0, import_react$21.useMemo)(() => allCases.filter((c) => {
		if (!c.experts || c.experts.length === 0) return true;
		return c.experts.every((expert) => isExpertVisibleForEnterpriseId(expert, effectiveEnterpriseId));
	}), [allCases, effectiveEnterpriseId]);
	const featuredCases = (0, import_react$21.useMemo)(() => {
		if (featuredItems.length === 0) return [];
		const result = [];
		featuredItems.forEach((item) => {
			const case_ = filteredAllCases.find((c) => c.id === item.case_id);
			if (case_) result.push(case_);
		});
		return result;
	}, [filteredAllCases, featuredItems]);
	return {
		categories,
		cases: (0, import_react$21.useMemo)(() => {
			let result = selectedCategory === "__featured__" ? featuredCases : filterByCategory(filteredAllCases, selectedCategory);
			if (favFilterActive && favoriteIds) result = result.filter((c) => favoriteIds.has(c.id));
			if (searchKeyword?.trim()) result = filterCasesByKeyword(result, searchKeyword, locale);
			return result;
		}, [
			filteredAllCases,
			featuredCases,
			selectedCategory,
			searchKeyword,
			locale,
			favFilterActive,
			favoriteIds
		]),
		allCases: filteredAllCases,
		featuredCases,
		isLoading,
		error,
		refresh,
		featuredItems
	};
}
var import_react$21, registryMemoryCache;
var init_use_discover = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_visibility();
	init_types$1();
	init_use_locale();
	registryMemoryCache = {
		categories: null,
		cases: null,
		featured: null
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-favorites.ts
function useFavorites() {
	const [favorites, setFavorites] = (0, import_react$20.useState)([]);
	(0, import_react$20.useEffect)(() => {
		const cached = readCache(DISCOVER_CACHE_KEYS.favorites);
		if (cached && Array.isArray(cached)) setFavorites([...cached].sort((a, b) => b.added_at - a.added_at));
	}, []);
	const favoriteIds = (0, import_react$20.useMemo)(() => new Set(favorites.map((f) => f.case_id)), [favorites]);
	return {
		favorites,
		favoriteIds,
		isFavorite: (0, import_react$20.useCallback)((caseId) => favoriteIds.has(caseId), [favoriteIds]),
		addFavorite: (0, import_react$20.useCallback)((caseId) => {
			setFavorites((prev) => {
				if (prev.some((f) => f.case_id === caseId)) return prev;
				const updated = [{
					case_id: caseId,
					added_at: Date.now()
				}, ...prev];
				writeCache(DISCOVER_CACHE_KEYS.favorites, updated);
				return updated;
			});
		}, []),
		removeFavorite: (0, import_react$20.useCallback)((caseId) => {
			setFavorites((prev) => {
				const updated = prev.filter((f) => f.case_id !== caseId);
				writeCache(DISCOVER_CACHE_KEYS.favorites, updated);
				return updated;
			});
		}, []),
		toggleFavorite: (0, import_react$20.useCallback)((caseId) => {
			setFavorites((prev) => {
				const exists = prev.some((f) => f.case_id === caseId);
				let updated;
				if (exists) updated = prev.filter((f) => f.case_id !== caseId);
				else updated = [{
					case_id: caseId,
					added_at: Date.now()
				}, ...prev];
				writeCache(DISCOVER_CACHE_KEYS.favorites, updated);
				return updated;
			});
		}, [])
	};
}
var import_react$20;
var init_use_favorites = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_local_cache();
	init_types$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/inline-svg-icon.tsx
var import_react$19, import_jsx_runtime$16, InlineSvgIcon;
var init_inline_svg_icon = __esmMin((() => {
	init_src();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$16 = require_jsx_runtime();
	InlineSvgIcon = ({ svg, label, className, style }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
			className,
			style,
			dangerouslySetInnerHTML: { __html: (0, import_react$19.useMemo)(() => {
				let s = sanitizeSvg(svg);
				if (!/<svg[^>]*\swidth=/.test(s)) s = s.replace("<svg", "<svg width=\"1em\" height=\"1em\"");
				return s;
			}, [svg]) },
			"aria-label": label,
			role: "img"
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/Agent应用.svg?raw
var Agent应用_default;
var init_Agent应用 = __esmMin((() => {
	Agent应用_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1.15076 0.454529)\" d=\"M1.0851 3.9791Q1.1442 3.5901 1.2785 3.2216Q1.3778 2.9472 1.5764 2.5831Q1.5807 2.5753 1.5844 2.5686Q2.0306 1.7504 2.672 1.0152L2.6797 1.0063Q3.2667 0.3322 3.6477 0.1913Q4.1656 0 4.6898 0.1687Q5.0803 0.2919 5.7321 0.9786L5.7323 0.9788Q6.4452 1.7272 7.0777 2.5892Q7.84 2.5517 8.6203 2.6831L8.6205 2.6832L9.0466 2.0246Q9.4148 1.4563 9.5635 1.2672Q9.8646 0.8842 10.1899 0.7624Q10.7773 0.5421 11.3356 0.8386Q11.6406 1.0019 11.8869 1.4183Q12.0082 1.6233 12.2948 2.2281L12.3029 2.245L12.4212 2.4983Q12.7242 3.1357 12.8039 3.3889Q12.912 3.7252 12.9554 4.0641Q12.991 4.3231 12.991 5.0342L12.991 5.2373C13.0409 5.2464 13.0849 5.2588 13.126 5.2758C13.331 5.3608 13.4927 5.5225 13.5777 5.7274C13.641 5.8808 13.641 6.0741 13.641 6.4625C13.641 6.8508 13.641 7.0441 13.5777 7.1975C13.4927 7.4025 13.331 7.5641 13.126 7.6491C13.0666 7.6737 13.0012 7.6887 12.9208 7.6979Q12.8349 8.3625 12.6074 8.808Q12.0889 9.8264 11.0712 10.3453Q10.5366 10.618 9.6889 10.6874Q9.1781 10.7292 7.7243 10.7291L6.3076 10.7291Q4.8539 10.7292 4.3431 10.6874Q3.4954 10.618 2.9608 10.3453Q1.9413 9.8252 1.4243 8.8084Q1.2887 8.5424 1.2035 8.1989C0.9981 8.1839 0.8462 8.1523 0.7102 8.0857C0.474 7.9724 0.2555 7.7557 0.1382 7.5207C0.0098 7.2624 0.0068 6.974 0.001 6.3974C0.0003 6.3224 0 6.249 0.0003 6.1741C0.0027 5.6141 0.0038 5.3357 0.1317 5.0757C0.247 4.8424 0.4698 4.6207 0.704 4.5057C0.8061 4.4559 0.9162 4.4257 1.05 4.4074Q1.061 4.1387 1.0851 3.9794L1.0851 3.9791ZM2.2716 4.159L2.2715 4.1593Q2.241 4.3614 2.241 4.9275L2.241 5.4625Q2.241 6.8672 2.2787 7.329Q2.3287 7.9403 2.4933 8.2633Q2.8342 8.9335 3.5062 9.2764Q3.8296 9.4413 4.4409 9.4914Q4.9029 9.5292 6.3076 9.5292L7.7243 9.5292Q9.1291 9.5292 9.591 9.4914Q10.2024 9.4413 10.5258 9.2764Q11.1964 8.9344 11.538 8.2636Q11.7032 7.9401 11.7532 7.329Q11.791 6.8672 11.791 5.4625L11.791 5.0342Q11.791 4.4052 11.7666 4.2275Q11.7358 3.9873 11.6614 3.7561Q11.6046 3.5756 11.3374 3.0134L11.2158 2.7533L11.2104 2.742Q10.8235 1.9256 10.7691 1.8964Q10.6922 1.8556 10.6114 1.8859Q10.5518 1.9083 10.0537 2.6771L9.4156 3.6634Q9.3213 3.8128 9.1595 3.884Q8.9995 3.9587 8.825 3.9312Q8.6755 3.9093 8.4211 3.8664Q7.6197 3.7315 6.847 3.8095Q6.6851 3.8273 6.5376 3.7583Q6.3888 3.6919 6.2962 3.5579Q5.6288 2.6099 4.8632 1.8064L4.8619 1.8049Q4.4234 1.343 4.3285 1.313Q4.1927 1.2693 4.0636 1.317Q3.9704 1.3514 3.5847 1.7943L3.577 1.8032Q3.0212 2.4402 2.6379 3.1431L2.6299 3.1579Q2.475 3.4416 2.4068 3.63Q2.3127 3.8884 2.2716 4.159ZM6.8908 5.2957L8.0908 5.2957L8.0908 7.5457L6.8908 7.5457L6.8908 5.2957ZM9.4325 5.2957L10.6325 5.2957L10.6325 7.5457L9.4325 7.5457L9.4325 5.2957ZM1.0521 14.3417Q1.7418 12.8069 3.4728 11.9913Q5.0075 11.2682 6.9377 11.2927Q8.8398 11.3169 10.4274 12.0546Q12.1791 12.8687 12.9595 14.3005L11.9058 14.8748Q11.3147 13.7902 9.9217 13.1429Q8.5674 12.5135 6.9224 12.4926Q5.2688 12.4716 3.9843 13.0768Q2.6546 13.7034 2.1466 14.8336L1.0521 14.3417Z\" fill-rule=\"evenodd\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/CICD.svg?raw
var CICD_default;
var init_CICD = __esmMin((() => {
	CICD_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><clipPath id=\"clip_0\"><path d=\"M5.0718 -2.9282L18.9282 5.0718L10.9282 18.9282L-2.9282 10.9282L5.0718 -2.9282Z\" clip-rule=\"evenodd\"/></clipPath><g clip-path=\"url(#clip_0)\"><path fill=\"currentColor\" fill-opacity=\"0.7\" transform=\"matrix(0.866025 0.5 -0.5 0.866025 5.61601 -2.4408)\" d=\"M8.9467 0.6883Q8.2584 0 7.285 0Q6.3116 0 5.6233 0.6883Q4.935 1.3766 4.935 2.35Q4.935 3.3234 5.6233 4.0117Q6.3116 4.7 7.285 4.7Q8.2584 4.7 8.9467 4.0117Q9.2206 3.7378 9.3855 3.4188Q10.3442 3.8684 11.0479 4.711Q11.9938 5.8435 12.1553 7.3052L13.348 7.1734Q13.1468 5.352 11.9689 3.9417Q10.9966 2.7777 9.6317 2.2159Q9.5871 1.3287 8.9467 0.6883ZM6.4718 1.5368Q6.8087 1.2 7.285 1.2Q7.7613 1.2 8.0982 1.5368Q8.435 1.8737 8.435 2.35Q8.435 2.8263 8.0982 3.1632Q7.7613 3.5 7.285 3.5Q6.8087 3.5 6.4718 3.1632Q6.135 2.8263 6.135 2.35Q6.135 1.8737 6.4718 1.5368ZM3.1301 8.3301Q2.7579 8.2303 2.4009 8.2464Q2.3852 8.0494 2.3852 7.8499Q2.3852 6.6837 2.9052 5.6504Q3.4087 4.65 4.2991 3.9646L3.567 3.0137Q2.4598 3.8661 1.8333 5.1109Q1.1852 6.3988 1.1851 7.8499Q1.1852 8.2453 1.2349 8.6331Q0.4867 9.1155 0.2519 9.9918Q0 10.932 0.4867 11.775Q0.9734 12.618 1.9136 12.8699Q2.8539 13.1219 3.6969 12.6352Q4.5399 12.1485 4.7918 11.2082Q5.0437 10.268 4.557 9.425Q4.0703 8.582 3.1301 8.3301ZM11.4399 8.3301Q10.4997 8.582 10.013 9.425Q9.5263 10.268 9.7782 11.2082Q9.8785 11.5824 10.0723 11.8847Q8.8451 12.7499 7.2852 12.7499Q6.2732 12.7499 5.3522 12.3541L4.8784 13.4566Q6.0263 13.9499 7.2852 13.9499Q9.378 13.9499 10.9899 12.6988Q11.781 13.1045 12.6564 12.8699Q13.5966 12.618 14.0833 11.775Q14.57 10.932 14.3181 9.9918Q14.0661 9.0515 13.2231 8.5648Q12.3801 8.0781 11.4399 8.3301ZM10.9373 10.8976Q10.814 10.4375 11.0522 10.025Q11.2904 9.6125 11.7505 9.4892Q12.2106 9.3659 12.6231 9.6041Q13.0357 9.8422 13.159 10.3024Q13.2822 10.7625 13.0441 11.175Q12.8059 11.5875 12.3458 11.7108Q11.8857 11.8341 11.4731 11.5959Q11.0606 11.3578 10.9373 10.8976ZM3.5178 10.025Q3.2796 9.6125 2.8195 9.4892Q2.3594 9.3659 1.9469 9.6041Q1.5343 9.8422 1.411 10.3024Q1.2878 10.7625 1.5259 11.175Q1.7641 11.5875 2.2242 11.7108Q2.6843 11.8341 3.0969 11.5959Q3.5094 11.3578 3.6327 10.8976Q3.756 10.4375 3.5178 10.025Z\" fill-rule=\"evenodd\"/></g></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/default.svg?raw
var default_default;
var init_default = __esmMin((() => {
	default_default = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  <rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  <rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  <rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n</svg>\r\n";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/PPT设计.svg?raw
var PPT设计_default;
var init_PPT设计 = __esmMin((() => {
	PPT设计_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1.43164 1.40038)\" d=\"M9.5686 0C10.0227 0 10.4239 -0.0012 10.7454 0.042C11.0841 0.0876 11.424 0.1913 11.7003 0.4678C11.9769 0.7443 12.0807 1.0841 12.1262 1.4229C12.1694 1.7444 12.1682 2.1454 12.1682 2.5996L12.1682 3.0166L12.6135 4.6523C12.8458 5.504 13.0397 6.2064 13.1086 6.7686C13.1794 7.3458 13.1362 7.8991 12.7737 8.374C12.411 8.8489 11.8883 9.0364 11.3127 9.1201C10.7523 9.2015 10.0236 9.1992 9.1409 9.1992L8.0686 9.1992L8.0686 8L9.1409 8C10.0615 8 10.686 7.9985 11.1399 7.9326C11.5785 7.8689 11.7321 7.76 11.8195 7.6455C11.907 7.531 11.9711 7.3546 11.9172 6.915C11.8614 6.4598 11.6986 5.8562 11.4563 4.9678L11.1096 3.6992L2.0276 3.6992L1.6809 4.9678C1.4386 5.8562 1.2758 6.4598 1.2199 6.915C1.1661 7.3548 1.2302 7.531 1.3176 7.6455C1.4051 7.76 1.5587 7.8689 1.9973 7.9326C2.4512 7.9985 3.0757 8 3.9963 8L4.5686 8C5.0227 8 5.4239 7.9988 5.7453 8.042C6.0841 8.0876 6.424 8.1913 6.7004 8.4678C6.9768 8.7442 7.0806 9.084 7.1262 9.4228C7.1694 9.7443 7.1682 10.1453 7.1682 10.5996L7.1682 12L9.5686 12L9.5686 13.1992L3.5686 13.1992L3.5686 12L5.969 12L5.969 10.5996C5.969 10.1112 5.9677 9.805 5.9377 9.582C5.9101 9.3769 5.8682 9.3329 5.8518 9.3164C5.8354 9.3 5.7916 9.2581 5.5862 9.2304C5.3631 9.2005 5.0568 9.1992 4.5686 9.1992L3.9963 9.1992C3.1136 9.1992 2.3849 9.2015 1.8244 9.1201C1.2488 9.0365 0.7263 8.8489 0.3635 8.374C0.0009 7.8991 -0.0423 7.3459 0.0285 6.7686C0.0975 6.2064 0.2914 5.504 0.5237 4.6523L0.969 3.0166L0.969 2.5996C0.969 2.1454 0.9678 1.7444 1.011 1.4229C1.0565 1.084 1.1602 0.7443 1.4367 0.4678C1.7132 0.1914 2.053 0.0875 2.3918 0.042C2.7133 -0.0012 3.1144 0 3.5686 0L9.5686 0ZM3.5686 1.1992C3.0804 1.1992 2.774 1.2005 2.551 1.2305C2.3459 1.2581 2.3018 1.2999 2.2854 1.3164C2.269 1.3328 2.2271 1.3765 2.1994 1.582C2.1715 1.7895 2.1694 2.0689 2.1692 2.5L10.968 2.5C10.9677 2.0689 10.9656 1.7895 10.9377 1.582C10.9101 1.3769 10.8683 1.3329 10.8518 1.3164C10.8354 1.3 10.7916 1.2581 10.5862 1.2305C10.3632 1.2005 10.0568 1.1992 9.5686 1.1992L3.5686 1.1992Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/Skill开发.svg?raw
var Skill开发_default;
var init_Skill开发 = __esmMin((() => {
	Skill开发_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.485779 0.117911)\" d=\"M4.6063 4.6987Q4.7494 4.7505 4.8255 4.7783Q5.7193 5.1048 6.5463 5.5015L0.59 11.4578Q0 12.0478 0 12.8821Q0 13.7164 0.59 14.3064Q1.1799 14.8963 2.0142 14.8963Q2.8485 14.8963 3.4385 14.3064L8.8444 8.9005L7.9958 8.052L2.59 13.4578Q2.3515 13.6963 2.0142 13.6963Q1.677 13.6963 1.4385 13.4578Q1.2 13.2193 1.2 12.8821Q1.2 12.5448 1.4385 12.3064L7.6601 6.0847Q8.8609 6.7696 9.9038 7.6204Q12.3371 9.6056 13.2462 12.0051Q13.3286 12.2429 13.5609 12.3395Q13.7872 12.4495 14.0199 12.3536Q14.194 12.2902 14.2984 12.1372Q14.4068 11.987 14.4072 11.8017Q14.459 8.4358 12.2057 5.3174Q9.969 2.2218 6.2641 0.4907Q5.6636 0.2101 5.415 0.1409Q4.9087 0 4.4826 0.1859Q4.1015 0.3522 3.8452 0.7962Q3.7204 1.0124 3.4651 1.6298L3.4638 1.633L3.4222 1.7337Q3.4095 1.7643 3.3849 1.8238Q3.1054 2.4987 3.0381 2.7676Q2.8998 3.3203 3.1034 3.7425Q3.2831 4.1152 3.7555 4.3571Q3.9811 4.4726 4.6063 4.6987ZM10.6624 6.6906Q8.315 4.7755 5.2372 3.6511Q5.1593 3.6227 5.0145 3.5703Q4.2127 3.2802 4.1843 3.2213Q4.1416 3.1328 4.4936 2.2829Q4.5183 2.2232 4.5311 2.1922L4.5728 2.0915L4.5741 2.0883Q4.8934 1.3159 4.9625 1.2858Q5.0496 1.2478 5.7561 1.5779Q9.1787 3.1771 11.233 6.0201Q12.1806 7.3316 12.6737 8.6809Q11.8234 7.6378 10.6624 6.6906ZM10.0312 10.5647C9.9585 10.3032 9.5796 10.3284 9.4539 10.6029L8.8284 11.9696C8.7889 12.0557 8.7157 12.1262 8.6286 12.163L7.2451 12.7441C6.9676 12.861 6.9301 13.2405 7.1879 13.3222L8.473 13.7281C8.5541 13.7537 8.6138 13.8161 8.6366 13.8983L8.998 15.1995C9.0706 15.461 9.4496 15.4358 9.5753 15.1612L10.2008 13.7945C10.2404 13.7084 10.3135 13.6379 10.4006 13.6012L11.7831 13.0201C12.0609 12.9032 12.0984 12.5235 11.8403 12.442L10.5562 12.0361C10.4752 12.0105 10.4155 11.9488 10.3926 11.8669L10.0312 10.5647Z\" fill-rule=\"evenodd\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/Web App.svg?raw
var Web_App_default;
var init_Web_App = __esmMin((() => {
	Web_App_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.900391 0.900391)\" d=\"M7.0996 0C10.3989 0 13.172 2.2503 13.9687 5.2998L12.7197 5.2998C12.0925 3.3403 10.4692 1.8268 8.4453 1.3545C8.5835 1.5636 8.7294 1.7983 8.874 2.0586C9.4714 3.1339 10.0702 4.6474 10.1797 6.5L12.9697 6.5L12.9697 6.499L14.1719 6.499C14.1885 6.6971 14.1992 6.8973 14.1992 7.0996C14.1992 11.0208 11.0208 14.1992 7.0996 14.1992C3.1784 14.1992 0 11.0208 0 7.0996C0 3.1784 3.1784 0 7.0996 0ZM1.2295 7.6992C1.4844 10.2247 3.3325 12.2784 5.7529 12.8437C5.615 12.6349 5.4696 12.4005 5.3252 12.1406C4.7278 11.0653 4.1291 9.5518 4.0195 7.6992L1.2295 7.6992ZM10.1797 7.6992C10.0702 9.5518 9.4714 11.0653 8.874 12.1406C8.7295 12.4007 8.5833 12.6348 8.4453 12.8437C10.8662 12.2787 12.7147 10.225 12.9697 7.6992L10.1797 7.6992ZM5.2207 7.6992C5.3282 9.2993 5.8489 10.6134 6.374 11.5586C6.6331 12.0249 6.8929 12.398 7.0996 12.6689C7.3063 12.398 7.5661 12.0249 7.8252 11.5586C8.3503 10.6134 8.871 9.2993 8.9785 7.6992L5.2207 7.6992ZM5.7529 1.3545C3.3323 1.9198 1.4844 3.9745 1.2295 6.5L4.0195 6.5C4.1291 4.6474 4.7278 3.1339 5.3252 2.0586C5.4697 1.7984 5.6149 1.5635 5.7529 1.3545ZM7.0996 1.5293C6.8928 1.8003 6.6333 2.174 6.374 2.6406C5.8489 3.5858 5.3282 4.8999 5.2207 6.5L8.9785 6.5C8.871 4.8999 8.3503 3.5858 7.8252 2.6406C7.5659 2.174 7.3064 1.8003 7.0996 1.5293Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/交互原型.svg?raw
var 交互原型_default;
var init_交互原型 = __esmMin((() => {
	交互原型_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.953179 0.941563)\" d=\"M7.0459 0.0114C7.1431 0.0114 7.2411 0.0111 7.3399 0.0108C9.0582 0.0058 11.001 0.0001 12.5313 1.4997C13.8902 2.8318 14.0702 4.4959 14.0912 6.0583L12.8891 6.0583C12.8641 4.5688 12.7039 3.3486 11.6914 2.3561C10.5214 1.2098 9.053 1.2106 7.2093 1.2115C7.1551 1.2116 7.1007 1.2116 7.0459 1.2116C6.9911 1.2116 6.9366 1.2116 6.8825 1.2115C5.0392 1.2105 3.5712 1.2098 2.4014 2.3561C1.1981 3.5359 1.1986 5.0375 1.1992 6.9306C1.1992 6.9733 1.1992 7.0162 1.1992 7.0593C1.1992 7.1024 1.1992 7.1453 1.1992 7.188C1.1986 9.0809 1.1981 10.5818 2.4014 11.7614C3.3886 12.729 4.5885 12.8792 6.0469 12.9019L6.0469 14.1052C4.518 14.086 2.8854 13.9155 1.5615 12.6179C0.1139 11.1988 0.0048 9.4029 0 7.7546L0 6.363C0.0048 4.7147 0.1141 2.9187 1.5615 1.4997C3.0916 0 5.0342 0.0057 6.7524 0.0108C6.851 0.0111 6.9489 0.0114 7.0459 0.0114ZM10.1252 12.538Q10.0851 12.6495 10.011 12.861Q9.7741 13.5378 9.64 13.7819Q9.2909 14.4172 8.7112 14.4032Q8.1316 14.3891 7.8137 13.7376Q7.6916 13.4873 7.4878 12.7998Q7.424 12.5849 7.3894 12.4717L5.9423 7.7446Q5.9219 7.6779 5.8824 7.5519Q5.7264 7.0537 5.6995 6.8395Q5.6317 6.2987 5.9646 5.9658Q6.2975 5.6329 6.8383 5.7007Q7.0525 5.7276 7.5507 5.8836Q7.6767 5.9231 7.7434 5.9435L12.4705 7.3906Q12.5837 7.4252 12.7986 7.489Q13.4861 7.6928 13.7364 7.8149Q14.3879 8.1328 14.402 8.7125Q14.416 9.2921 13.7807 9.6412Q13.5366 9.7753 12.8598 10.0122Q12.6483 10.0862 12.5368 10.1264L11.9893 10.3235Q11.0156 10.674 10.8442 10.8454Q10.6728 11.0168 10.3223 11.9905L10.1252 12.538ZM8.9961 12.1316L9.1932 11.5841Q9.6346 10.3579 9.9957 9.9969Q10.3567 9.6358 11.5829 9.1944L12.1304 8.9973Q12.2468 8.9554 12.4633 8.8796Q12.668 8.8079 12.8202 8.7508Q12.6655 8.7011 12.4574 8.6394Q12.2375 8.5742 12.1192 8.538L7.3921 7.091Q7.3217 7.0694 7.1921 7.0288Q7.0573 6.9866 6.956 6.9572Q6.9854 7.0585 7.0276 7.1933Q7.0682 7.3229 7.0897 7.3933L8.5368 12.1204Q8.573 12.2387 8.6382 12.4587Q8.6999 12.6667 8.7496 12.8214Q8.8067 12.6693 8.8784 12.4645Q8.9542 12.2479 8.9961 12.1316Z\" fill-rule=\"evenodd\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/产品管理.svg?raw
var 产品管理_default;
var init_产品管理 = __esmMin((() => {
	产品管理_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><clipPath id=\"clip_0\"><path d=\"M5.0723 -2.9281L18.9287 5.0719L10.9287 18.9283L-2.9277 10.9283L5.0723 -2.9281Z\" clip-rule=\"evenodd\"/></clipPath><g clip-path=\"url(#clip_0)\"><path fill=\"currentColor\" transform=\"matrix(0.866025 0.5 -0.5 0.866025 5.61601 -2.4408)\" d=\"M8.9467 0.6883Q8.2584 0 7.285 0Q6.3116 0 5.6233 0.6883Q4.935 1.3766 4.935 2.35Q4.935 3.3234 5.6233 4.0117Q6.3116 4.7 7.285 4.7Q8.2584 4.7 8.9467 4.0117Q9.2206 3.7378 9.3855 3.4188Q10.3442 3.8684 11.0479 4.711Q11.9938 5.8435 12.1553 7.3052L13.348 7.1734Q13.1468 5.352 11.9689 3.9417Q10.9966 2.7777 9.6317 2.2159Q9.5871 1.3287 8.9467 0.6883ZM6.4718 1.5368Q6.8087 1.2 7.285 1.2Q7.7613 1.2 8.0982 1.5368Q8.435 1.8737 8.435 2.35Q8.435 2.8263 8.0982 3.1632Q7.7613 3.5 7.285 3.5Q6.8087 3.5 6.4718 3.1632Q6.135 2.8263 6.135 2.35Q6.135 1.8737 6.4718 1.5368ZM3.1301 8.3301Q2.7579 8.2303 2.4009 8.2464Q2.3852 8.0494 2.3852 7.8499Q2.3852 6.6837 2.9052 5.6504Q3.4087 4.65 4.2991 3.9646L3.567 3.0137Q2.4598 3.8661 1.8333 5.1109Q1.1852 6.3988 1.1851 7.8499Q1.1852 8.2453 1.2349 8.6331Q0.4867 9.1155 0.2519 9.9918Q0 10.932 0.4867 11.775Q0.9734 12.618 1.9136 12.8699Q2.8539 13.1219 3.6969 12.6352Q4.5399 12.1485 4.7918 11.2082Q5.0437 10.268 4.557 9.425Q4.0703 8.582 3.1301 8.3301ZM11.4399 8.3301Q10.4997 8.582 10.013 9.425Q9.5263 10.268 9.7782 11.2082Q9.8785 11.5824 10.0723 11.8847Q8.8451 12.7499 7.2852 12.7499Q6.2732 12.7499 5.3522 12.3541L4.8784 13.4566Q6.0263 13.9499 7.2852 13.9499Q9.378 13.9499 10.9899 12.6988Q11.781 13.1045 12.6564 12.8699Q13.5966 12.618 14.0833 11.775Q14.57 10.932 14.3181 9.9918Q14.0661 9.0515 13.2231 8.5648Q12.3801 8.0781 11.4399 8.3301ZM10.9373 10.8976Q10.814 10.4375 11.0522 10.025Q11.2904 9.6125 11.7505 9.4892Q12.2106 9.3659 12.6231 9.6041Q13.0357 9.8422 13.159 10.3024Q13.2822 10.7625 13.0441 11.175Q12.8059 11.5875 12.3458 11.7108Q11.8857 11.8341 11.4731 11.5959Q11.0606 11.3578 10.9373 10.8976ZM3.5178 10.025Q3.2796 9.6125 2.8195 9.4892Q2.3594 9.3659 1.9469 9.6041Q1.5343 9.8422 1.411 10.3024Q1.2878 10.7625 1.5259 11.175Q1.7641 11.5875 2.2242 11.7108Q2.6843 11.8341 3.0969 11.5959Q3.5094 11.3578 3.6327 10.8976Q3.756 10.4375 3.5178 10.025Z\" fill-rule=\"evenodd\"/></g></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/品牌设计.svg?raw
var 品牌设计_default;
var init_品牌设计 = __esmMin((() => {
	品牌设计_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.568982 0.568982)\" d=\"M6.3433 0.5696Q7.0117 0 7.431 0Q7.8503 0 8.5187 0.5696L9.6979 1.5745Q9.7826 1.6467 9.816 1.6732Q9.8583 1.6781 9.9693 1.6869L11.5136 1.8101Q12.389 1.88 12.6855 2.1765Q12.982 2.473 13.0518 3.3484L13.1751 4.8927Q13.1839 5.0037 13.1888 5.046Q13.2153 5.0794 13.2875 5.1641L14.2924 6.3433Q14.862 7.0117 14.862 7.431Q14.862 7.8503 14.2924 8.5187L13.2875 9.6979Q13.2153 9.7826 13.1888 9.816Q13.1839 9.8583 13.1751 9.9693L13.0518 11.5136Q12.982 12.389 12.6855 12.6855Q12.389 12.982 11.5136 13.0518L9.9693 13.1751Q9.8583 13.1839 9.816 13.1888Q9.7826 13.2153 9.6979 13.2875L8.5187 14.2924Q7.8503 14.862 7.431 14.862Q7.0117 14.862 6.3433 14.2924L5.531 13.6002L5.531 12.0863Q5.6921 12.1608 5.9425 12.3742L7.1217 13.3791Q7.341 13.566 7.431 13.6323Q7.521 13.566 7.7403 13.3791L8.9195 12.3742Q9.1889 12.1446 9.3549 12.0758Q9.5209 12.0071 9.8738 11.9789L11.4182 11.8556Q11.7055 11.8327 11.8159 11.8159Q11.8327 11.7055 11.8556 11.4182L11.9789 9.8738Q12.0071 9.5209 12.0758 9.3549Q12.1446 9.1889 12.3742 8.9195L13.3791 7.7403Q13.566 7.521 13.6323 7.431Q13.566 7.341 13.3791 7.1217L12.3742 5.9425Q12.1446 5.673 12.0758 5.5071Q12.0071 5.3411 11.9789 4.9882L11.8556 3.4438Q11.8327 3.1565 11.8159 3.046Q11.7055 3.0293 11.4182 3.0063L9.8738 2.8831Q9.5209 2.8549 9.3549 2.7862Q9.1889 2.7174 8.9195 2.4878L7.7403 1.4829Q7.521 1.296 7.431 1.2297Q7.341 1.296 7.1217 1.4829L5.9425 2.4878Q5.6731 2.7174 5.5071 2.7862Q5.3411 2.8549 4.9882 2.8831L3.4438 3.0063Q3.1565 3.0293 3.046 3.046Q3.0293 3.1565 3.0063 3.4438L2.8831 4.9882Q2.8549 5.3411 2.7862 5.5071Q2.7174 5.6731 2.4878 5.9425L1.4829 7.1217Q1.296 7.341 1.2297 7.431Q1.296 7.521 1.4829 7.7403L2.4878 8.9195Q2.7174 9.1889 2.7862 9.3549Q2.8549 9.5209 2.8831 9.8738L3.0063 11.4182Q3.0293 11.7055 3.046 11.8159Q3.1565 11.8327 3.4438 11.8556L4.331 11.9264L4.331 13.1303L3.3484 13.0518Q2.473 12.982 2.1765 12.6855Q1.88 12.389 1.8101 11.5136L1.6869 9.9693Q1.6781 9.8583 1.6732 9.816Q1.6467 9.7826 1.5745 9.6979L0.5696 8.5187Q0 7.8503 0 7.431Q0 7.0117 0.5696 6.3433L1.5745 5.1641Q1.6467 5.0794 1.6732 5.046Q1.6781 5.0037 1.6869 4.8927L1.8101 3.3484Q1.88 2.473 2.1765 2.1765Q2.473 1.88 3.3484 1.8101L4.8927 1.6869Q5.0037 1.6781 5.046 1.6732Q5.0794 1.6467 5.1641 1.5745L6.3433 0.5696ZM5.531 8.5311L5.531 10.4311L4.331 10.4311L4.331 6.5093Q4.331 5.8228 4.3658 5.5679Q4.4372 5.0451 4.7411 4.7412Q5.045 4.4372 5.5678 4.3659Q5.8227 4.3311 6.5092 4.3311L8.431 4.3311Q9.042 4.3311 9.2692 4.358Q9.7323 4.4128 10.0187 4.6486Q10.0721 4.6923 10.121 4.7412Q10.1698 4.79 10.2124 4.842Q10.4493 5.1299 10.5041 5.5929Q10.531 5.8202 10.531 6.4311Q10.531 7.042 10.5041 7.2693Q10.4493 7.7324 10.2135 8.0188Q10.1698 8.0722 10.121 8.121Q10.0721 8.1699 10.0201 8.2124Q9.7323 8.4494 9.2692 8.5042Q9.1369 8.5199 8.8747 8.5264L9.7551 9.4068C9.8041 9.4559 9.8515 9.5024 9.8965 9.5467C10.2089 9.854 10.4119 10.0536 10.3322 10.2459C10.2526 10.4382 9.9679 10.4358 9.5298 10.4322C9.4666 10.4316 9.4002 10.4311 9.3308 10.4311L9.0823 10.4311L7.1823 8.5311L5.531 8.5311ZM5.531 7.3311L8.431 7.3311Q9.2026 7.3311 9.2574 7.286Q9.2659 7.2791 9.2725 7.2725Q9.279 7.266 9.2848 7.2589Q9.331 7.2027 9.331 6.4311Q9.331 5.6595 9.2859 5.6047Q9.279 5.5962 9.2725 5.5897Q9.2659 5.5831 9.2588 5.5774Q9.2026 5.5311 8.431 5.5311L6.5092 5.5311Q5.6482 5.5311 5.5896 5.5897Q5.531 5.6483 5.531 6.5092L5.531 7.3311Z\" fill-rule=\"evenodd\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/图标插画.svg?raw
var 图标插画_default;
var init_图标插画 = __esmMin((() => {
	图标插画_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.899994 0.899994)\" d=\"M7.1 13Q5.6657 13 4.4005 12.3478L3.8507 13.4144Q5.3746 14.2 7.1 14.2Q10.0409 14.2 12.1205 12.1205Q14.2 10.0409 14.2 7.1Q14.2 4.1591 12.1205 2.0796Q10.0409 0 7.1 0Q4.1591 0 2.0796 2.0796Q0 4.1591 0 7.1Q0 9.8799 1.8863 11.9196Q1.9798 12.0206 2.0771 12.1181Q2.2981 12.3393 2.5375 12.5402L3.3091 11.6211Q3.1099 11.454 2.9261 11.27Q2.8451 11.1889 2.7673 11.1048Q1.2 9.41 1.2 7.1Q1.2 4.6561 2.9281 2.9281Q4.6561 1.2 7.1 1.2Q9.5439 1.2 11.2719 2.9281Q13 4.6561 13 7.1Q13 9.5439 11.2719 11.2719Q9.5439 13 7.1 13ZM9.0065 8.2L9.5179 10.2455L10.6821 9.9545L9.5459 5.4097Q9.3355 4.5679 8.6516 4.034Q7.9677 3.5 7.1 3.5Q6.2323 3.5 5.5485 4.034Q4.8646 4.5679 4.6541 5.4097L3.5179 9.9545L4.6821 10.2455L5.1935 8.2L9.0065 8.2ZM8.7065 7L5.4935 7L5.8183 5.7007Q5.9286 5.2596 6.287 4.9798Q6.6453 4.7 7.1 4.7Q7.5547 4.7 7.9131 4.9798Q8.2714 5.2596 8.3817 5.7007L8.7065 7Z\" fill-rule=\"evenodd\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/幻灯片.svg?raw
var 幻灯片_default;
var init_幻灯片 = __esmMin((() => {
	幻灯片_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1.43164 1.40038)\" d=\"M9.5686 0C10.0227 0 10.4239 -0.0012 10.7454 0.042C11.0841 0.0876 11.424 0.1913 11.7003 0.4678C11.9769 0.7443 12.0807 1.0841 12.1262 1.4229C12.1694 1.7444 12.1682 2.1454 12.1682 2.5996L12.1682 3.0166L12.6135 4.6523C12.8458 5.504 13.0397 6.2064 13.1086 6.7686C13.1794 7.3458 13.1362 7.8991 12.7737 8.374C12.411 8.8489 11.8883 9.0364 11.3127 9.1201C10.7523 9.2015 10.0236 9.1992 9.1409 9.1992L8.0686 9.1992L8.0686 8L9.1409 8C10.0615 8 10.686 7.9985 11.1399 7.9326C11.5785 7.8689 11.7321 7.76 11.8195 7.6455C11.907 7.531 11.9711 7.3546 11.9172 6.915C11.8614 6.4598 11.6986 5.8562 11.4563 4.9678L11.1096 3.6992L2.0276 3.6992L1.6809 4.9678C1.4386 5.8562 1.2758 6.4598 1.2199 6.915C1.1661 7.3548 1.2302 7.531 1.3176 7.6455C1.4051 7.76 1.5587 7.8689 1.9973 7.9326C2.4512 7.9985 3.0757 8 3.9963 8L4.5686 8C5.0227 8 5.4239 7.9988 5.7453 8.042C6.0841 8.0876 6.424 8.1913 6.7004 8.4678C6.9768 8.7442 7.0806 9.084 7.1262 9.4228C7.1694 9.7443 7.1682 10.1453 7.1682 10.5996L7.1682 12L9.5686 12L9.5686 13.1992L3.5686 13.1992L3.5686 12L5.969 12L5.969 10.5996C5.969 10.1112 5.9677 9.805 5.9377 9.582C5.9101 9.3769 5.8682 9.3329 5.8518 9.3164C5.8354 9.3 5.7916 9.2581 5.5862 9.2304C5.3631 9.2005 5.0568 9.1992 4.5686 9.1992L3.9963 9.1992C3.1136 9.1992 2.3849 9.2015 1.8244 9.1201C1.2488 9.0365 0.7263 8.8489 0.3635 8.374C0.0009 7.8991 -0.0423 7.3459 0.0285 6.7686C0.0975 6.2064 0.2914 5.504 0.5237 4.6523L0.969 3.0166L0.969 2.5996C0.969 2.1454 0.9678 1.7444 1.011 1.4229C1.0565 1.084 1.1602 0.7443 1.4367 0.4678C1.7132 0.1914 2.053 0.0875 2.3918 0.042C2.7133 -0.0012 3.1144 0 3.5686 0L9.5686 0ZM3.5686 1.1992C3.0804 1.1992 2.774 1.2005 2.551 1.2305C2.3459 1.2581 2.3018 1.2999 2.2854 1.3164C2.269 1.3328 2.2271 1.3765 2.1994 1.582C2.1715 1.7895 2.1694 2.0689 2.1692 2.5L10.968 2.5C10.9677 2.0689 10.9656 1.7895 10.9377 1.582C10.9101 1.3769 10.8683 1.3329 10.8518 1.3164C10.8354 1.3 10.7916 1.2581 10.5862 1.2305C10.3632 1.2005 10.0568 1.1992 9.5686 1.1992L3.5686 1.1992Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/数据分析.svg?raw
var 数据分析_default;
var init_数据分析 = __esmMin((() => {
	数据分析_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1.40039 0.571815)\" d=\"M5.6992 2.1028C3.1458 2.5311 1.1993 4.753 1.1992 7.4279C1.1992 10.4103 3.6173 12.8284 6.5996 12.8284C9.2747 12.8284 11.4964 10.8818 11.9248 8.3283L13.1084 8.5276C12.5845 11.6494 9.8704 14.0276 6.5996 14.0276C2.9545 14.0276 0 11.0731 0 7.4279C0.0001 4.1573 2.3783 1.443 5.5 0.9192L5.6992 2.1028ZM7.5283 0.2444C7.9046 0.0002 8.2849 -0.0441 8.6797 0.0373C9.0185 0.1072 9.3924 0.2771 9.7744 0.4475C11.4842 1.2102 12.8601 2.5855 13.623 4.2951C13.7935 4.677 13.9632 5.0511 14.0332 5.3899C14.1146 5.7846 14.0703 6.165 13.8262 6.5412C13.5643 6.9444 13.1893 7.1257 12.7754 7.2033C12.404 7.273 11.9375 7.2698 11.4287 7.2697L9.3994 7.2697C8.9453 7.2698 8.5441 7.2709 8.2227 7.2278C7.8839 7.1822 7.544 7.0784 7.2676 6.802C6.9911 6.5255 6.8874 6.1857 6.8418 5.8469C6.7986 5.5254 6.7998 5.1243 6.7998 4.6701L6.7998 2.6418C6.7998 2.133 6.7966 1.6665 6.8662 1.2951C6.9439 0.8813 7.1252 0.5062 7.5283 0.2444ZM8.4375 1.2121C8.3122 1.1863 8.2609 1.1988 8.1816 1.2502C8.1297 1.284 8.082 1.3243 8.0459 1.5168C8.0018 1.7522 7.999 2.0855 7.999 2.6418L7.999 4.6701C7.999 5.1584 8.0003 5.4647 8.0303 5.6877C8.0579 5.8931 8.0998 5.937 8.1162 5.9533C8.1326 5.9697 8.1764 6.0116 8.3818 6.0393C8.6048 6.0693 8.9112 6.0705 9.3994 6.0705L11.4287 6.0705C11.985 6.0705 12.3183 6.0677 12.5537 6.0237C12.7462 5.9875 12.7865 5.9399 12.8203 5.8879C12.8717 5.8087 12.8842 5.7573 12.8584 5.632C12.8209 5.4507 12.7194 5.2147 12.5273 4.7844C11.885 3.345 10.7248 2.1854 9.2851 1.5432C8.8548 1.3512 8.6189 1.2496 8.4375 1.2121Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/数据分析及可视化.svg?raw
var 数据分析及可视化_default;
var init_数据分析及可视化 = __esmMin((() => {
	数据分析及可视化_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1.40039 0.571815)\" d=\"M5.6992 2.1028C3.1458 2.5311 1.1993 4.753 1.1992 7.4279C1.1992 10.4103 3.6173 12.8284 6.5996 12.8284C9.2747 12.8284 11.4964 10.8818 11.9248 8.3283L13.1084 8.5276C12.5845 11.6494 9.8704 14.0276 6.5996 14.0276C2.9545 14.0276 0 11.0731 0 7.4279C0.0001 4.1573 2.3783 1.443 5.5 0.9192L5.6992 2.1028ZM7.5283 0.2444C7.9046 0.0002 8.2849 -0.0441 8.6797 0.0373C9.0185 0.1072 9.3924 0.2771 9.7744 0.4475C11.4842 1.2102 12.8601 2.5855 13.623 4.2951C13.7935 4.677 13.9632 5.0511 14.0332 5.3899C14.1146 5.7846 14.0703 6.165 13.8262 6.5412C13.5643 6.9444 13.1893 7.1257 12.7754 7.2033C12.404 7.273 11.9375 7.2698 11.4287 7.2697L9.3994 7.2697C8.9453 7.2698 8.5441 7.2709 8.2227 7.2278C7.8839 7.1822 7.544 7.0784 7.2676 6.802C6.9911 6.5255 6.8874 6.1857 6.8418 5.8469C6.7986 5.5254 6.7998 5.1243 6.7998 4.6701L6.7998 2.6418C6.7998 2.133 6.7966 1.6665 6.8662 1.2951C6.9439 0.8813 7.1252 0.5062 7.5283 0.2444ZM8.4375 1.2121C8.3122 1.1863 8.2609 1.1988 8.1816 1.2502C8.1297 1.284 8.082 1.3243 8.0459 1.5168C8.0018 1.7522 7.999 2.0855 7.999 2.6418L7.999 4.6701C7.999 5.1584 8.0003 5.4647 8.0303 5.6877C8.0579 5.8931 8.0998 5.937 8.1162 5.9533C8.1326 5.9697 8.1764 6.0116 8.3818 6.0393C8.6048 6.0693 8.9112 6.0705 9.3994 6.0705L11.4287 6.0705C11.985 6.0705 12.3183 6.0677 12.5537 6.0237C12.7462 5.9875 12.7865 5.9399 12.8203 5.8879C12.8717 5.8087 12.8842 5.7573 12.8584 5.632C12.8209 5.4507 12.7194 5.2147 12.5273 4.7844C11.885 3.345 10.7248 2.1854 9.2851 1.5432C8.8548 1.3512 8.6189 1.2496 8.4375 1.2121Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/数据可视化.svg?raw
var 数据可视化_default;
var init_数据可视化 = __esmMin((() => {
	数据可视化_default = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  <path d=\"M22 12A10 10 0 0 0 12 2V12H22Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n</svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/文档.svg?raw
var 文档_default;
var init_文档 = __esmMin((() => {
	文档_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1.90039 0.9003)\" d=\"M6.0762 0C7.1535 0 7.8413 -0.0088 8.4726 0.2227C8.6425 0.285 8.8081 0.3596 8.9668 0.4463C9.557 0.769 10.0034 1.2927 10.7129 2.1035L11.2959 2.7705C11.5114 3.0168 11.7073 3.2385 11.8398 3.4278C11.9634 3.6043 12.13 3.8839 12.0898 4.2276C12.0632 4.4548 11.967 4.6683 11.8135 4.838C11.5814 5.0944 11.2611 5.1526 11.0469 5.1758C10.8173 5.2007 10.5214 5.1993 10.1943 5.1992C9.6946 5.1993 9.2753 5.2006 8.9365 5.1671C8.5881 5.1325 8.2597 5.057 7.9609 4.8643C7.7102 4.7025 7.4968 4.4891 7.335 4.2383C7.1423 3.9396 7.0667 3.6112 7.0322 3.2627C6.9987 2.9239 7 2.5047 7 2.0049L7 1.209C6.7531 1.2031 6.4529 1.1993 6.0762 1.1992C4.901 1.1993 4.0688 1.201 3.4287 1.2725C2.8006 1.3427 2.4308 1.4742 2.1504 1.6866C1.9753 1.8192 1.8192 1.9753 1.6865 2.1505C1.4741 2.4309 1.3426 2.8007 1.2725 3.4288C1.201 4.0688 1.1992 4.901 1.1992 6.0762L1.1992 8.1153C1.1992 9.2941 1.2006 10.1285 1.2725 10.7706C1.3431 11.4006 1.4757 11.7718 1.6895 12.0528C1.8204 12.2249 1.9743 12.3788 2.1465 12.5098C2.4275 12.7236 2.7987 12.8562 3.4287 12.9268C4.0708 12.9987 4.9051 13 6.084 13C7.2629 13 8.0972 12.9987 8.7392 12.9268C9.3694 12.8562 9.7405 12.7236 10.0215 12.5098C10.1936 12.3788 10.3475 12.2249 10.4785 12.0528C10.6922 11.7718 10.8249 11.4006 10.8955 10.7706C10.9674 10.1285 10.9678 9.2941 10.9678 8.1153L10.9678 6.0996L12.168 6.0996L12.168 8.1153C12.168 9.2665 12.169 10.18 12.0879 10.9043C12.0054 11.6406 11.8321 12.2554 11.4336 12.7793C11.2371 13.0376 11.0063 13.2684 10.748 13.4649C10.2241 13.8635 9.6094 14.0367 8.873 14.1192C8.1486 14.2003 7.2353 14.1993 6.084 14.1993C4.9327 14.1993 4.0193 14.2003 3.2949 14.1192C2.5586 14.0367 1.9439 13.8635 1.4199 13.4649C1.1617 13.2684 0.9309 13.0376 0.7344 12.7793C0.3358 12.2554 0.1626 11.6406 0.0801 10.9043C-0.0011 10.18 0 9.2665 0 8.1153L0 6.0762C0 4.9288 -0.0015 4.0181 0.0791 3.2959C0.1611 2.562 0.3334 1.9488 0.7295 1.4258C0.9285 1.1631 1.1631 0.9286 1.4258 0.7296C1.9488 0.3335 2.5619 0.1611 3.2959 0.0791C4.018 -0.0015 4.9287 0 6.0762 0ZM8.5996 10.6993L3.5996 10.6993L3.5996 9.5L8.5996 9.5L8.5996 10.6993ZM8.5996 7.6992L3.5996 7.6992L3.5996 6.5L8.5996 6.5L8.5996 7.6992ZM8.1992 2.0049C8.1992 2.5289 8.2002 2.8786 8.2266 3.1446C8.2519 3.401 8.2969 3.5154 8.3437 3.588C8.413 3.6951 8.5042 3.7863 8.6113 3.8555C8.6839 3.9023 8.7982 3.9473 9.0547 3.9727C9.3207 3.999 9.6703 4 10.1943 4C10.4404 4 10.62 3.9959 10.7568 3.9903C10.6709 3.8836 10.5556 3.7458 10.3935 3.5606L9.8096 2.8936C9.0424 2.0168 8.7501 1.6966 8.3906 1.5C8.3281 1.4659 8.2644 1.4339 8.1992 1.4053L8.1992 2.0049Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/文档处理.svg?raw
var 文档处理_default;
var init_文档处理 = __esmMin((() => {
	文档处理_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1.90039 0.9003)\" d=\"M6.0762 0C7.1535 0 7.8413 -0.0088 8.4726 0.2227C8.6425 0.285 8.8081 0.3596 8.9668 0.4463C9.557 0.769 10.0034 1.2927 10.7129 2.1035L11.2959 2.7705C11.5114 3.0168 11.7073 3.2385 11.8398 3.4278C11.9634 3.6043 12.13 3.8839 12.0898 4.2276C12.0632 4.4548 11.967 4.6683 11.8135 4.838C11.5814 5.0944 11.2611 5.1526 11.0469 5.1758C10.8173 5.2007 10.5214 5.1993 10.1943 5.1992C9.6946 5.1993 9.2753 5.2006 8.9365 5.1671C8.5881 5.1325 8.2597 5.057 7.9609 4.8643C7.7102 4.7025 7.4968 4.4891 7.335 4.2383C7.1423 3.9396 7.0667 3.6112 7.0322 3.2627C6.9987 2.9239 7 2.5047 7 2.0049L7 1.209C6.7531 1.2031 6.4529 1.1993 6.0762 1.1992C4.901 1.1993 4.0688 1.201 3.4287 1.2725C2.8006 1.3427 2.4308 1.4742 2.1504 1.6866C1.9753 1.8192 1.8192 1.9753 1.6865 2.1505C1.4741 2.4309 1.3426 2.8007 1.2725 3.4288C1.201 4.0688 1.1992 4.901 1.1992 6.0762L1.1992 8.1153C1.1992 9.2941 1.2006 10.1285 1.2725 10.7706C1.3431 11.4006 1.4757 11.7718 1.6895 12.0528C1.8204 12.2249 1.9743 12.3788 2.1465 12.5098C2.4275 12.7236 2.7987 12.8562 3.4287 12.9268C4.0708 12.9987 4.9051 13 6.084 13C7.2629 13 8.0972 12.9987 8.7392 12.9268C9.3694 12.8562 9.7405 12.7236 10.0215 12.5098C10.1936 12.3788 10.3475 12.2249 10.4785 12.0528C10.6922 11.7718 10.8249 11.4006 10.8955 10.7706C10.9674 10.1285 10.9678 9.2941 10.9678 8.1153L10.9678 6.0996L12.168 6.0996L12.168 8.1153C12.168 9.2665 12.169 10.18 12.0879 10.9043C12.0054 11.6406 11.8321 12.2554 11.4336 12.7793C11.2371 13.0376 11.0063 13.2684 10.748 13.4649C10.2241 13.8635 9.6094 14.0367 8.873 14.1192C8.1486 14.2003 7.2353 14.1993 6.084 14.1993C4.9327 14.1993 4.0193 14.2003 3.2949 14.1192C2.5586 14.0367 1.9439 13.8635 1.4199 13.4649C1.1617 13.2684 0.9309 13.0376 0.7344 12.7793C0.3358 12.2554 0.1626 11.6406 0.0801 10.9043C-0.0011 10.18 0 9.2665 0 8.1153L0 6.0762C0 4.9288 -0.0015 4.0181 0.0791 3.2959C0.1611 2.562 0.3334 1.9488 0.7295 1.4258C0.9285 1.1631 1.1631 0.9286 1.4258 0.7296C1.9488 0.3335 2.5619 0.1611 3.2959 0.0791C4.018 -0.0015 4.9287 0 6.0762 0ZM8.5996 10.6993L3.5996 10.6993L3.5996 9.5L8.5996 9.5L8.5996 10.6993ZM8.5996 7.6992L3.5996 7.6992L3.5996 6.5L8.5996 6.5L8.5996 7.6992ZM8.1992 2.0049C8.1992 2.5289 8.2002 2.8786 8.2266 3.1446C8.2519 3.401 8.2969 3.5154 8.3437 3.588C8.413 3.6951 8.5042 3.7863 8.6113 3.8555C8.6839 3.9023 8.7982 3.9473 9.0547 3.9727C9.3207 3.999 9.6703 4 10.1943 4C10.4404 4 10.62 3.9959 10.7568 3.9903C10.6709 3.8836 10.5556 3.7458 10.3935 3.5606L9.8096 2.8936C9.0424 2.0168 8.7501 1.6966 8.3906 1.5C8.3281 1.4659 8.2644 1.4339 8.1992 1.4053L8.1992 2.0049Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/日常开发.svg?raw
var 日常开发_default;
var init_日常开发 = __esmMin((() => {
	日常开发_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.953125 0.951744)\" d=\"M7.0459 0.0012C8.8335 0.0012 10.913 -0.0964 12.5313 1.4895C14.1859 3.1113 14.0928 5.2255 14.0928 7.049C14.0928 8.8725 14.1857 10.986 12.5313 12.6077C10.913 14.1934 8.8334 14.096 7.0459 14.0959C5.2585 14.096 3.1794 14.1935 1.5615 12.6077C0.1139 11.1886 0.0048 9.3927 0 7.7444L0 6.3528C0.0048 4.7044 0.1141 2.9085 1.5615 1.4895C3.1794 -0.0963 5.2585 0.0011 7.0459 0.0012ZM7.0459 1.2014C5.1257 1.2014 3.6055 1.1659 2.4014 2.3459C1.171 3.5522 1.1992 5.0951 1.1992 7.049C1.1992 9.0028 1.1709 10.545 2.4014 11.7512C3.4551 12.7839 4.7509 12.8855 6.3447 12.8947L7.748 12.8947C9.3421 12.8855 10.6376 12.7836 11.6914 11.7512C12.922 10.545 12.8936 9.0029 12.8936 7.049C12.8936 5.0949 12.9221 3.5523 11.6914 2.3459C10.4871 1.1659 8.9665 1.2014 7.0459 1.2014ZM8.6162 4.2375L6.6162 10.2375L5.4775 9.8586L7.4775 3.8586L8.6162 4.2375ZM4.5469 5.0481L4.9932 5.4494L3.5547 7.0481L4.9932 8.6467L4.5469 9.0481L4.1016 9.4495L2.6025 7.7844C2.2261 7.366 2.2261 6.73 2.6025 6.3117L4.1016 4.6467L4.5469 5.0481ZM11.4912 6.3117C11.8677 6.73 11.8677 7.366 11.4912 7.7844L9.9922 9.4495L9.5469 9.0481L9.1006 8.6467L10.5391 7.0481L9.1006 5.4494L9.5469 5.0481L9.9922 4.6467L11.4912 6.3117Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/深度研究.svg?raw
var 深度研究_default;
var init_深度研究 = __esmMin((() => {
	深度研究_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.854455 0.850574)\" d=\"M1.8828 1.8829C4.3934 -0.6276 8.4632 -0.6276 10.9736 1.8829C11.5219 2.4312 11.9515 3.0553 12.2607 3.7218L11.7169 3.9737L11.1719 4.2266C10.921 3.686 10.5723 3.1789 10.1251 2.7315C8.0832 0.6896 4.7734 0.6896 2.7315 2.7315C0.6897 4.7734 0.6896 8.0832 2.7315 10.125C4.3362 11.7295 6.7257 12.0746 8.667 11.1553C9.1687 10.9177 9.575 10.7245 9.8945 10.6006C10.191 10.4857 10.5358 10.3768 10.8701 10.4346C11.1797 10.4883 11.4298 10.6545 11.6445 10.8321C11.8577 11.0084 12.102 11.2534 12.3878 11.5391L12.3878 11.5401L14.3984 13.5499L13.9736 13.9737L13.5498 14.3985L11.54 12.3877L11.5392 12.3877C11.2365 12.0852 11.039 11.8885 10.8799 11.7569C10.7245 11.6284 10.6691 11.618 10.665 11.6172C10.6867 11.621 10.6197 11.6067 10.3282 11.7198C10.0608 11.8234 9.7039 11.9903 9.1905 12.2334L9.1914 12.2344L9.1808 12.2403L9.1797 12.2393C6.7946 13.3686 3.8572 12.9479 1.8828 10.9737C-0.6276 8.4632 -0.6276 4.3934 1.8828 1.8829ZM12.0771 4.921C12.1994 4.6547 12.5681 4.6303 12.6387 4.8839L12.9902 6.1456C13.0124 6.2253 13.0705 6.2858 13.1494 6.3106L14.3984 6.7042C14.6495 6.7833 14.613 7.1515 14.3428 7.2647L12.998 7.8282C12.9133 7.8638 12.8422 7.9322 12.8037 8.0157L12.1953 9.3409C12.073 9.6071 11.7044 9.6315 11.6339 9.378L11.2823 8.1163C11.26 8.0366 11.2019 7.9761 11.123 7.9512L9.873 7.5577C9.6222 7.4785 9.6587 7.1104 9.9287 6.9972L11.2734 6.4337C11.3582 6.3981 11.4293 6.3296 11.4678 6.2462L12.0771 4.921Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/视觉海报.svg?raw
var 视觉海报_default;
var init_视觉海报 = __esmMin((() => {
	视觉海报_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.858915 0.757318)\" d=\"M8.1408 1.2424C10.969 1.2424 12.3833 1.2429 13.2619 2.1213C14.1406 2.9999 14.1409 4.4142 14.1409 7.2424C14.1409 10.0708 14.1406 11.4848 13.2619 12.3635C12.4931 13.1323 11.3145 13.2284 9.1369 13.2404L8.1408 13.2424L6.1408 13.2424L5.1447 13.2404C3.123 13.2293 1.9617 13.1461 1.1906 12.5188L1.0197 12.3635C0.1413 11.4848 0.1408 10.0705 0.1408 7.2424C0.1408 6.4784 0.1441 5.8173 0.1613 5.2424L1.3606 5.2424C1.3437 5.7879 1.341 6.4414 1.341 7.2424C1.341 8.6902 1.3431 9.6559 1.4397 10.3742C1.5316 11.0578 1.6893 11.3356 1.8684 11.5149C2.0476 11.6941 2.3253 11.8516 3.009 11.9436C3.7274 12.0401 4.6929 12.0422 6.1408 12.0422L8.1408 12.0422C9.5888 12.0422 10.5543 12.0401 11.2727 11.9436C11.9566 11.8516 12.2341 11.6941 12.4133 11.5149C12.5925 11.3356 12.7501 11.0581 12.842 10.3742C12.9386 9.6559 12.9407 8.6903 12.9407 7.2424C12.9407 5.7945 12.9386 4.8289 12.842 4.1105C12.7501 3.4269 12.5925 3.1491 12.4133 2.9699C12.2341 2.7908 11.9562 2.6331 11.2727 2.5412C10.5543 2.4447 9.5887 2.4426 8.1408 2.4426L6.1408 2.4426C5.9675 2.4426 5.8008 2.4433 5.6408 2.4435L5.6408 1.2433C5.8024 1.2432 5.9691 1.2424 6.1408 1.2424L8.1408 1.2424ZM5.6408 5.1428C7.2363 5.1428 8.5041 5.861 9.4827 6.8117C10.4534 7.7549 11.1655 8.949 11.678 9.9738L10.6037 10.5109C10.1162 9.5359 9.4759 8.4797 8.6457 7.673C7.8233 6.874 6.8406 6.342 5.6408 6.342C5.11 6.342 4.708 6.4468 4.3322 6.6467C3.942 6.8544 3.5518 7.179 3.0647 7.6662L2.217 6.8185C2.7297 6.3059 3.2189 5.8803 3.7678 5.5881C4.3312 5.2882 4.9297 5.1428 5.6408 5.1428ZM10.1409 3.7424C10.693 3.7424 11.1407 4.1902 11.1409 4.7424C11.1409 5.2947 10.6931 5.7424 10.1409 5.7424C9.5887 5.7423 9.1408 5.2946 9.1408 4.7424C9.141 4.1903 9.5888 3.7425 10.1409 3.7424ZM2.3723 0.2141C2.4945 -0.0521 2.8631 -0.0764 2.9338 0.1769L3.2854 1.4396C3.3076 1.5191 3.3658 1.5788 3.4445 1.6037L4.6945 1.9973C4.9454 2.0764 4.9089 2.4445 4.6389 2.5578L3.2942 3.1213C3.2092 3.1569 3.1383 3.2261 3.0998 3.3098L2.4904 4.634C2.3682 4.9002 1.9995 4.9247 1.9289 4.6711L1.5774 3.4094C1.5552 3.3296 1.4971 3.2692 1.4182 3.2443L0.1692 2.8508C-0.0819 2.7717 -0.0454 2.4035 0.2248 2.2902L1.5695 1.7267C1.6544 1.6912 1.7254 1.6228 1.7639 1.5392L2.3723 0.2141Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/视频生成.svg?raw
var 视频生成_default;
var init_视频生成 = __esmMin((() => {
	视频生成_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.858403 0.757272)\" d=\"M8.1416 1.2424C10.9699 1.2424 12.384 1.2428 13.2627 2.1213C14.1413 3 14.1416 4.4142 14.1416 7.2424C14.1416 10.0707 14.1412 11.4848 13.2627 12.3635C12.4939 13.1323 11.3152 13.2284 9.1377 13.2404L8.1416 13.2424L6.1416 13.2424L5.1455 13.2404C3.1236 13.2293 1.9625 13.1462 1.1914 12.5188L1.0205 12.3635C0.142 11.4848 0.1416 10.0707 0.1416 7.2424C0.1416 6.4784 0.1448 5.8174 0.1621 5.2424L1.3613 5.2424C1.3444 5.7879 1.3418 6.4415 1.3418 7.2424C1.3418 8.6903 1.3439 9.6559 1.4404 10.3742C1.5323 11.0579 1.69 11.3356 1.8691 11.5149C2.0483 11.6941 2.3259 11.8516 3.0098 11.9436C3.7281 12.0401 4.6935 12.0422 6.1416 12.0422L8.1416 12.0422C9.5896 12.0422 10.5551 12.0401 11.2734 11.9436C11.9573 11.8516 12.2349 11.6941 12.4141 11.5149C12.5932 11.3356 12.7509 11.0579 12.8428 10.3742C12.9393 9.6559 12.9414 8.6903 12.9414 7.2424C12.9414 5.7945 12.9393 4.8289 12.8428 4.1106C12.7508 3.4269 12.5933 3.1492 12.4141 2.97C12.2348 2.7908 11.9571 2.6332 11.2734 2.5413C10.5551 2.4447 9.5896 2.4426 8.1416 2.4426L6.1416 2.4426C5.9681 2.4426 5.8016 2.4434 5.6416 2.4436L5.6416 1.2434C5.8032 1.2432 5.9698 1.2424 6.1416 1.2424L8.1416 1.2424ZM5.9883 4.6536C6.4455 4.5311 7.0114 4.8575 8.1416 5.51C9.2718 6.1625 9.8373 6.4894 9.96 6.9465C10.0119 7.1402 10.0118 7.3446 9.96 7.5383C9.8374 7.9955 9.2719 8.3223 8.1416 8.9749C7.0112 9.6274 6.4455 9.9538 5.9883 9.8313L5.8467 9.7824C5.7088 9.7252 5.5828 9.6416 5.4766 9.5354L5.417 9.469C5.1413 9.1167 5.1416 8.466 5.1416 7.2424L5.1465 6.3801C5.1622 5.6306 5.2256 5.2004 5.4766 4.9495C5.5828 4.8433 5.7088 4.7596 5.8467 4.7024L5.9883 4.6536ZM2.373 0.2141C2.4953 -0.0521 2.8639 -0.0765 2.9346 0.177L3.2861 1.4397C3.3084 1.5192 3.3665 1.5789 3.4453 1.6038L4.6943 1.9973C4.9454 2.0764 4.9089 2.4446 4.6387 2.5579L3.2939 3.1213C3.2091 3.157 3.138 3.2262 3.0996 3.3098L2.4912 4.634C2.3689 4.9003 2.0003 4.9247 1.9297 4.6711L1.5781 3.4094C1.5559 3.3297 1.4978 3.2693 1.4189 3.2444L0.1689 2.8508C-0.0818 2.7716 -0.0453 2.4036 0.2246 2.2903L1.5693 1.7268C1.6543 1.6912 1.7262 1.623 1.7646 1.5393L2.373 0.2141ZM6.3418 7.2424C6.3418 7.8913 6.3451 8.2922 6.373 8.5745C6.6314 8.4575 6.9802 8.2591 7.542 7.9348C8.1037 7.6105 8.4493 7.4077 8.6797 7.2424C8.4493 7.0772 8.1037 6.8744 7.542 6.55C6.98 6.2256 6.6314 6.0263 6.373 5.9094C6.345 6.1917 6.3418 6.5927 6.3418 7.2424Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/移动端App.svg?raw
var 移动端App_default;
var init_移动端App = __esmMin((() => {
	移动端App_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 3 1)\" d=\"M5 0C6.7516 0 7.6832 0.0002 8.3662 0.3311L8.5 0.4023C8.8989 0.6327 9.2391 0.9515 9.4941 1.333L9.5361 1.4004L7.8164 1.4004C7.6779 1.3384 7.4659 1.28 7.082 1.2451C6.5946 1.201 5.9563 1.2002 5 1.2002C4.0437 1.2002 3.4055 1.201 2.918 1.2451C2.4477 1.2878 2.2345 1.3636 2.0996 1.4414C1.8264 1.5993 1.5993 1.8264 1.4414 2.0996C1.3635 2.2346 1.2878 2.4473 1.2451 2.918C1.2009 3.4055 1.2002 4.0434 1.2002 5L1.2002 9C1.2002 9.9566 1.2009 10.5945 1.2451 11.082C1.2878 11.5525 1.3635 11.7654 1.4414 11.9004C1.5992 12.1735 1.8265 12.4008 2.0996 12.5586C2.2345 12.6364 2.4478 12.7122 2.918 12.7549C3.4054 12.799 4.0437 12.7998 5 12.7998C5.9563 12.7998 6.5945 12.799 7.082 12.7549C7.5523 12.7122 7.7655 12.6364 7.9004 12.5586C8.1736 12.4007 8.4007 12.1736 8.5586 11.9004C8.6365 11.7654 8.7122 11.5527 8.7549 11.082C8.7991 10.5945 8.7998 9.9566 8.7998 9L8.7998 5C8.7998 4.0434 8.7991 3.4055 8.7549 2.918C8.7438 2.7954 8.7299 2.6904 8.7148 2.5996L9.9248 2.5996C9.9656 2.9262 9.9862 3.3065 9.9941 3.7627L10 5L10 9L9.9941 10.2373C9.9753 11.3214 9.8991 11.9779 9.5977 12.5C9.3344 12.9558 8.9558 13.3344 8.5 13.5977C7.8039 13.9994 6.8688 14 5 14L3.7627 13.9941C2.6789 13.9753 2.022 13.8989 1.5 13.5977L1.333 13.4941C0.9515 13.2391 0.6327 12.8989 0.4023 12.5L0.3311 12.3662C0.0884 11.8653 0.0231 11.2308 0.0059 10.2373L0 9L0 5L0.0059 3.7627C0.0247 2.6786 0.1009 2.0221 0.4023 1.5C0.6327 1.101 0.9514 0.7609 1.333 0.5059L1.5 0.4023C2.0221 0.101 2.6788 0.0247 3.7627 0.0059L5 0ZM6.5 11.5996L3.5 11.5996L3.5 10.4004L6.5 10.4004L6.5 11.5996Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/网站开发.svg?raw
var 网站开发_default;
var init_网站开发 = __esmMin((() => {
	网站开发_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.900391 0.900391)\" d=\"M7.0996 0C10.3989 0 13.172 2.2503 13.9687 5.2998L12.7197 5.2998C12.0925 3.3403 10.4692 1.8268 8.4453 1.3545C8.5835 1.5636 8.7294 1.7983 8.874 2.0586C9.4714 3.1339 10.0702 4.6474 10.1797 6.5L12.9697 6.5L12.9697 6.499L14.1719 6.499C14.1885 6.6971 14.1992 6.8973 14.1992 7.0996C14.1992 11.0208 11.0208 14.1992 7.0996 14.1992C3.1784 14.1992 0 11.0208 0 7.0996C0 3.1784 3.1784 0 7.0996 0ZM1.2295 7.6992C1.4844 10.2247 3.3325 12.2784 5.7529 12.8437C5.615 12.6349 5.4696 12.4005 5.3252 12.1406C4.7278 11.0653 4.1291 9.5518 4.0195 7.6992L1.2295 7.6992ZM10.1797 7.6992C10.0702 9.5518 9.4714 11.0653 8.874 12.1406C8.7295 12.4007 8.5833 12.6348 8.4453 12.8437C10.8662 12.2787 12.7147 10.225 12.9697 7.6992L10.1797 7.6992ZM5.2207 7.6992C5.3282 9.2993 5.8489 10.6134 6.374 11.5586C6.6331 12.0249 6.8929 12.398 7.0996 12.6689C7.3063 12.398 7.5661 12.0249 7.8252 11.5586C8.3503 10.6134 8.871 9.2993 8.9785 7.6992L5.2207 7.6992ZM5.7529 1.3545C3.3323 1.9198 1.4844 3.9745 1.2295 6.5L4.0195 6.5C4.1291 4.6474 4.7278 3.1339 5.3252 2.0586C5.4697 1.7984 5.6149 1.5635 5.7529 1.3545ZM7.0996 1.5293C6.8928 1.8003 6.6333 2.174 6.374 2.6406C5.8489 3.5858 5.3282 4.8999 5.2207 6.5L8.9785 6.5C8.871 4.8999 8.3503 3.5858 7.8252 2.6406C7.5659 2.174 7.3064 1.8003 7.0996 1.5293Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/网站设计.svg?raw
var 网站设计_default;
var init_网站设计 = __esmMin((() => {
	网站设计_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1 2)\" d=\"M8 0C10.8284 0 12.2424 0.0002 13.1211 0.8789C13.8411 1.5989 13.9686 2.6782 13.9922 4.6006L12.793 4.6006L12.793 4.5996L1.207 4.5996C1.202 5.0101 1.2002 5.4731 1.2002 6C1.2002 7.4481 1.2023 8.4135 1.2988 9.1318C1.3908 9.8157 1.5483 10.0932 1.7275 10.2725C1.9068 10.4517 2.1843 10.6092 2.8682 10.7012C3.5866 10.7977 4.5519 10.7998 6 10.7998L8 10.7998C9.4481 10.7998 10.4135 10.7977 11.1318 10.7012C11.8157 10.6092 12.0932 10.4517 12.2725 10.2725C12.4517 10.0932 12.6092 9.8157 12.7012 9.1318C12.7977 8.4135 12.7998 7.4481 12.7998 6C12.7998 5.9322 12.7989 5.8655 12.7988 5.7998L14 5.7998C14 5.8657 14 5.9325 14 6C14 8.8284 13.9998 10.2424 13.1211 11.1211C12.3523 11.8899 11.1736 11.986 8.9961 11.998L8 12L6 12L5.0039 11.998C2.982 11.9869 1.8209 11.9038 1.0498 11.2764L0.8789 11.1211C0.0002 10.2424 0 8.8284 0 6C0 3.3485 -0.0003 1.9395 0.7236 1.0498L0.8789 0.8789C1.7576 0.0002 3.1716 0 6 0L8 0ZM6 1.2002C4.5519 1.2002 3.5866 1.2023 2.8682 1.2988C2.1843 1.3908 1.9068 1.5483 1.7275 1.7275C1.5483 1.9068 1.3908 2.1843 1.2988 2.8682C1.2768 3.0318 1.2603 3.2083 1.2471 3.4004L12.7529 3.4004C12.7396 3.2083 12.7232 3.0318 12.7012 2.8682C12.6092 2.1843 12.4517 1.9068 12.2725 1.7275C12.0932 1.5483 11.8157 1.3908 11.1318 1.2988C10.4135 1.2023 9.4481 1.2002 8 1.2002L6 1.2002Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/设计.svg?raw
var 设计_default;
var init_设计 = __esmMin((() => {
	设计_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 8.66754e-05 -8.66797e-05 1 0.621291 1.09985)\" d=\"M0.5871 4.1991C0.1957 5.0584 0 5.9587 0 6.9C0 7.8413 0.1957 8.7416 0.5871 9.601C0.9636 10.4275 1.4942 11.1587 2.1789 11.7945C2.8604 12.4273 3.6422 12.9169 4.5244 13.2634C5.4353 13.6211 6.3887 13.8 7.3846 13.8C8.3839 13.8 9.1044 13.48 9.5461 12.8401C9.7142 12.5965 9.8462 12.2956 9.942 11.9375C9.9939 11.7434 10.0514 11.4505 10.1147 11.0589C10.1854 10.6206 10.2514 10.3122 10.3125 10.1338C10.3942 9.8955 10.5047 9.7221 10.644 9.6134C10.772 9.5136 10.9538 9.4436 11.1893 9.4032C11.3609 9.3738 11.6452 9.3543 12.0422 9.3445C12.4266 9.3351 12.7138 9.3175 12.9037 9.2917C13.2624 9.243 13.5649 9.1465 13.8115 9.002C14.1504 8.8033 14.3994 8.5126 14.5584 8.13L12.4119 8.1302C12.2984 8.1362 12.1653 8.1411 12.0128 8.1449C11.5576 8.1561 11.2156 8.1812 10.9868 8.2205C10.5529 8.2948 10.1927 8.4436 9.9061 8.6671C9.5791 8.9221 9.3362 9.2813 9.1773 9.7447C9.0941 9.9877 9.0116 10.362 8.93 10.8676C8.8732 11.2192 8.8241 11.4725 8.7827 11.6275C8.7227 11.8518 8.648 12.0288 8.5585 12.1584C8.3553 12.4528 7.964 12.6 7.3846 12.6C6.5401 12.6 5.733 12.4488 4.9631 12.1465C4.2219 11.8553 3.566 11.4449 2.9955 10.9151C2.4281 10.3883 1.9893 9.7844 1.6792 9.1035C1.3597 8.4022 1.2 7.6677 1.2 6.9C1.2 6.1323 1.3597 5.3978 1.6792 4.6965C1.9893 4.0156 2.4281 3.4117 2.9955 2.8849C3.566 2.3551 4.2218 1.9447 4.9631 1.6536C5.733 1.3512 6.5401 1.2 7.3846 1.2C8.2291 1.2 9.0363 1.3512 9.8062 1.6536C10.5474 1.9447 11.2033 2.3551 11.7738 2.8849C12.3412 3.4117 12.7799 4.0156 13.09 4.6965C13.4095 5.3978 13.5692 6.1323 13.5692 6.9C13.5692 6.9101 13.5692 6.9201 13.5691 6.9301L14.7691 6.93C14.7692 6.92 14.7692 6.91 14.7692 6.9C14.7692 5.9587 14.5735 5.0584 14.1821 4.1991C13.8056 3.3725 13.275 2.6413 12.5903 2.0056C11.9089 1.3727 11.127 0.8831 10.2448 0.5366C9.334 0.1789 8.3806 0 7.3846 0C6.3887 0 5.4353 0.1789 4.5244 0.5366C3.6422 0.8831 2.8604 1.3727 2.1789 2.0056C1.4942 2.6413 0.9636 3.3725 0.5871 4.1991ZM8.587 2.9931C8.7823 3.1883 8.8799 3.424 8.8799 3.7002C8.8799 3.9763 8.7823 4.212 8.587 4.4073C8.3918 4.6026 8.1561 4.7002 7.8799 4.7002C7.6038 4.7002 7.3681 4.6026 7.1728 4.4073C6.9776 4.212 6.88 3.9763 6.8799 3.7002C6.88 3.424 6.9776 3.1883 7.1728 2.9931C7.3681 2.7978 7.6038 2.7002 7.8799 2.7002C8.1561 2.7002 8.3918 2.7978 8.587 2.9931ZM5.5871 3.993C5.3918 3.7977 5.1561 3.7001 4.8799 3.7001C4.6038 3.7001 4.3681 3.7977 4.1728 3.993C3.9776 4.1883 3.88 4.424 3.8799 4.7001C3.88 4.9762 3.9776 5.2119 4.1728 5.4072C4.3681 5.6025 4.6038 5.7001 4.8799 5.7001C5.1561 5.7001 5.3918 5.6025 5.5871 5.4072C5.7823 5.2119 5.88 4.9762 5.8799 4.7001C5.88 4.424 5.7823 4.1883 5.5871 3.993ZM4.5871 6.993C4.7823 7.1883 4.88 7.424 4.8799 7.7002C4.88 7.9763 4.7823 8.212 4.5871 8.4073C4.3918 8.6025 4.1561 8.7002 3.8799 8.7002C3.6038 8.7002 3.3681 8.6025 3.1728 8.4073C2.9776 8.212 2.88 7.9763 2.88 7.7002C2.88 7.424 2.9776 7.1883 3.1728 6.993C3.3681 6.7978 3.6038 6.7002 3.8799 6.7002C4.1561 6.7002 4.3918 6.7978 4.5871 6.993Z\" fill-rule=\"evenodd\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/设计系统.svg?raw
var 设计系统_default;
var init_设计系统 = __esmMin((() => {
	设计系统_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.400391 1.40039)\" d=\"M8.9258 5.9258C9.5743 5.2775 10.625 5.2775 11.2734 5.9258C11.9217 6.5743 11.9217 7.625 11.2734 8.2734L7.1094 12.4385C6.6219 12.9256 5.9607 13.1991 5.2715 13.1992L4 13.1992L4 11.9277C4.0002 11.2387 4.2737 10.5772 4.7607 10.0898L8.9258 5.9258ZM5.6094 10.9385C5.3473 11.2008 5.1994 11.5569 5.1992 11.9277L5.1992 12L5.2715 12C5.6424 11.9999 5.9983 11.852 6.2607 11.5898L9.001 8.8486L8.3496 8.1973L5.6094 10.9385ZM8.0996 0C9.8672 0 11.3712 1.1182 11.9473 2.6836C12.0184 2.877 12.064 3.0003 12.1006 3.0859C12.1017 3.0886 12.1024 3.0913 12.1035 3.0938C12.1063 3.095 12.1092 3.0963 12.1123 3.0977C12.198 3.1343 12.3211 3.1798 12.5146 3.251C14.0807 3.8269 15.1992 5.3317 15.1992 7.0996C15.1992 9.364 13.364 11.1992 11.0996 11.1992L10.5996 11.1992L10.5996 10L11.0996 10C12.7012 10 14 8.7012 14 7.0996C14 5.8508 13.2099 4.7849 12.1006 4.377C11.92 4.3106 11.7624 4.2528 11.6416 4.2012C11.5372 4.1566 11.3727 4.0826 11.2441 3.9541C11.1157 3.8257 11.0417 3.662 10.9971 3.5576C10.9454 3.4367 10.8878 3.2784 10.8213 3.0977C10.4132 1.9887 9.348 1.1992 8.0996 1.1992C6.7812 1.1992 5.6671 2.0799 5.3154 3.2861C5.1596 3.8205 4.6608 4.1992 4.0996 4.1992C2.498 4.1992 1.1992 5.498 1.1992 7.0996C1.1992 8.4502 2.1239 9.5864 3.375 9.9082L3.2256 10.4892L3.0752 11.0703C1.3069 10.6152 0 9.0109 0 7.0996C0 4.8352 1.8352 3 4.0996 3C4.1076 3 4.1222 2.997 4.1377 2.9854C4.1532 2.9736 4.1604 2.9595 4.1631 2.9502C4.66 1.2459 6.2334 0 8.0996 0ZM10.4258 6.7734C10.2459 6.5938 9.9533 6.5938 9.7734 6.7734L9.1973 7.3496L9.8486 8.001L10.4258 7.4258C10.6054 7.2459 10.6054 6.9533 10.4258 6.7734Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/邮件编辑.svg?raw
var 邮件编辑_default;
var init_邮件编辑 = __esmMin((() => {
	邮件编辑_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 0.858915 0.757322)\" d=\"M8.1408 1.2424C10.969 1.2424 12.3833 1.2429 13.2619 2.1213C14.1406 2.9999 14.1409 4.4141 14.1409 7.2424C14.1409 10.0708 14.1406 11.4848 13.2619 12.3635C12.4931 13.1323 11.3145 13.2284 9.1369 13.2404L8.1408 13.2424L6.1408 13.2424L5.1447 13.2404C3.123 13.2293 1.9617 13.1461 1.1906 12.5188L1.0197 12.3635C0.1413 11.4848 0.1408 10.0706 0.1408 7.2424C0.1408 6.4784 0.1441 5.8173 0.1613 5.2424L1.3606 5.2424C1.3437 5.7879 1.341 6.4414 1.341 7.2424C1.341 8.6902 1.3431 9.6559 1.4397 10.3742C1.5316 11.0578 1.6893 11.3356 1.8684 11.5149C2.0476 11.6941 2.3253 11.8516 3.009 11.9436C3.7274 12.0401 4.6929 12.0422 6.1408 12.0422L8.1408 12.0422C9.5888 12.0422 10.5543 12.0401 11.2727 11.9436C11.9566 11.8516 12.2341 11.6941 12.4133 11.5149C12.5925 11.3356 12.7501 11.0581 12.842 10.3742C12.9386 9.6559 12.9407 8.6903 12.9407 7.2424C12.9407 6.3543 12.9362 5.6479 12.9133 5.0685L9.4582 7.0851C8.977 7.3659 8.5782 7.5985 8.2317 7.757C7.8731 7.9211 7.5272 8.0265 7.1408 8.0266C6.7544 8.0265 6.4077 7.9211 6.049 7.757C5.7025 7.5984 5.3036 7.3658 4.8225 7.0851L2.885 5.9543L3.1877 5.4367L3.4904 4.9182L5.4279 6.048C5.9292 6.3404 6.2682 6.5381 6.5481 6.6662C6.8159 6.7887 6.9868 6.8273 7.1408 6.8273C7.2949 6.8273 7.4649 6.7887 7.7326 6.6662C8.0127 6.5381 8.352 6.3407 8.8537 6.048L12.7805 3.757C12.6872 3.3233 12.5578 3.1144 12.4133 2.9699C12.2341 2.7908 11.9562 2.6331 11.2727 2.5412C10.5543 2.4447 9.5887 2.4426 8.1408 2.4426L6.1408 2.4426C5.9675 2.4426 5.8008 2.4433 5.6408 2.4435L5.6408 1.2433C5.8024 1.2432 5.9691 1.2424 6.1408 1.2424L8.1408 1.2424ZM2.3723 0.2141C2.4945 -0.0521 2.8631 -0.0764 2.9338 0.1769L3.2854 1.4396C3.3076 1.5191 3.3658 1.5788 3.4445 1.6037L4.6945 1.9973C4.9454 2.0764 4.9089 2.4445 4.6389 2.5578L3.2942 3.1213C3.2092 3.1569 3.1383 3.2261 3.0998 3.3098L2.4904 4.634C2.3682 4.9002 1.9995 4.9247 1.9289 4.6711L1.5774 3.4094C1.5552 3.3296 1.4971 3.2692 1.4182 3.2443L0.1692 2.8508C-0.0819 2.7717 -0.0454 2.4035 0.2248 2.2902L1.5695 1.7267C1.6543 1.6912 1.7254 1.6228 1.7639 1.5392L2.3723 0.2141Z\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icons/金融服务.svg?raw
var 金融服务_default;
var init_金融服务 = __esmMin((() => {
	金融服务_default = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" transform=\"matrix(1 0 0 1 1 0.978296)\" d=\"M8.9258 0.1293C8.379 0 7.8613 0.1067 7.3213 0.3237C6.7956 0.5349 6.1753 0.8818 5.4141 1.3061L2.709 2.8139C2.0485 2.8934 1.5676 3.045 1.1738 3.3471L1.0215 3.4711C0.874 3.6005 0.7398 3.7449 0.6201 3.9008L0.5107 4.0571C0.0002 4.8601 0 6.0285 0 8.227C0 10.5723 0.0003 11.7452 0.6201 12.5532L0.7441 12.7055C0.8735 12.853 1.0179 12.9872 1.1738 13.1069L1.3301 13.2162C2.0261 13.6588 2.9963 13.7181 4.6738 13.726L5.5 13.727L8.5 13.727C10.8456 13.727 12.0183 13.7268 12.8262 13.1069C13.0341 12.9473 13.2203 12.7611 13.3799 12.5532C13.5993 12.2671 13.7411 11.9352 13.8327 11.5217L12.5878 11.5217C12.5388 11.6565 12.4842 11.749 12.4277 11.8227C12.3321 11.9474 12.2204 12.059 12.0957 12.1547C11.9355 12.2777 11.6857 12.392 11.1055 12.4575C10.5009 12.5256 9.7007 12.5268 8.5 12.5268L5.5 12.5268C4.2993 12.5268 3.4991 12.5256 2.8945 12.4575C2.3143 12.392 2.0645 12.2777 1.9043 12.1547C1.7796 12.059 1.6679 11.9474 1.5723 11.8227C1.4494 11.6624 1.3349 11.4125 1.2695 10.8325C1.2014 10.2279 1.2002 9.4274 1.2002 8.227C1.2002 7.0265 1.2014 6.226 1.2695 5.6215C1.335 5.0415 1.4493 4.7915 1.5723 4.6313C1.6679 4.5066 1.7796 4.3949 1.9043 4.2992C2.0645 4.1763 2.3144 4.0619 2.8945 3.9965C3.4991 3.9284 4.2993 3.9272 5.5 3.9272L8.5 3.9272C9.7007 3.9272 10.5009 3.9284 11.1055 3.9965C11.6856 4.0619 11.9355 4.1763 12.0957 4.2992C12.2203 4.3949 12.3321 4.5066 12.4277 4.6313C12.5507 4.7915 12.665 5.0415 12.7305 5.6215C12.7479 5.7761 12.7607 5.9438 12.7705 6.1274L10.5 6.1274C9.3403 6.1274 8.4006 7.0673 8.4004 8.227C8.4004 9.3382 9.2632 10.2475 10.3556 10.3217L13.972 10.3217C13.9999 9.7477 14 9.0615 14 8.227C14 5.8816 13.9998 4.7087 13.3799 3.9008C13.2203 3.6929 13.0341 3.5066 12.8262 3.3471C12.4536 3.0613 12.0033 2.9077 11.3965 2.8246C11.0247 2.1604 10.7138 1.6121 10.4092 1.1996C10.0634 0.7315 9.6789 0.3687 9.1455 0.1918C9.0733 0.1679 8.9998 0.1468 8.9258 0.1293ZM7.7686 1.4369C8.1925 1.2666 8.4405 1.2479 8.6494 1.2973C8.6891 1.3067 8.7288 1.3176 8.7676 1.3305C8.9714 1.3981 9.1728 1.5449 9.4443 1.9125C9.6042 2.129 9.7699 2.3988 9.9658 2.7358C9.5347 2.7278 9.0495 2.727 8.5 2.727L5.3291 2.727L5.998 2.3549C6.7871 1.9151 7.3301 1.6131 7.7686 1.4369ZM9.5996 8.227C9.5998 7.7301 10.0031 7.3266 10.5 7.3266L12.7949 7.3266C12.7965 7.5995 12.7998 7.8982 12.7998 8.227C12.7998 8.5556 12.7964 8.8545 12.7949 9.1274L10.5 9.1274C10.0029 9.1274 9.5996 8.724 9.5996 8.227Z\" fill-rule=\"evenodd\"/></svg>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/welcome/scene-icon-map.ts
function stripWrappingQuotes(value) {
	const trimmed = value.trim();
	if (trimmed.startsWith("\"") && trimmed.endsWith("\"") || trimmed.startsWith("'") && trimmed.endsWith("'")) return trimmed.slice(1, -1);
	return trimmed;
}
function decodeBase64Svg(payload) {
	const binary = globalThis.atob(payload.replace(/\s/g, ""));
	const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
	return new TextDecoder("utf-8").decode(bytes);
}
/**
* 兼容 Web 构建链：部分环境不会按 Vite `?raw` 返回 SVG 源码，而是返回 data:image/svg+xml URL。
* QuickActions / ChatInput 胶囊都需要原始 SVG 注入渲染，因此这里统一解码为 `<svg ...>` 源码。
*/
function normalizeSceneIconSource(source) {
	const value = stripWrappingQuotes(source);
	if (!SVG_DATA_URI_PATTERN.test(value)) return value;
	const commaIndex = value.indexOf(",");
	if (commaIndex < 0) return value;
	const meta = value.slice(0, commaIndex);
	const payload = value.slice(commaIndex + 1);
	try {
		return /;base64/i.test(meta) ? decodeBase64Svg(payload) : decodeURIComponent(payload);
	} catch {
		return value;
	}
}
/**
* 根据场景名称获取对应图标：先做别名归一化，未命中时返回默认图标
*/
function getSceneIcon(sceneName) {
	return normalizeSceneIconSource(SCENE_ICON_MAP[SCENE_NAME_ALIAS_MAP[sceneName] ?? sceneName] ?? DEFAULT_SCENE_ICON);
}
var SVG_DATA_URI_PATTERN, SCENE_ICON_MAP, SCENE_NAME_ALIAS_MAP, DEFAULT_SCENE_ICON;
var init_scene_icon_map = __esmMin((() => {
	init_Agent应用();
	init_CICD();
	init_default();
	init_PPT设计();
	init_Skill开发();
	init_Web_App();
	init_交互原型();
	init_产品管理();
	init_品牌设计();
	init_图标插画();
	init_幻灯片();
	init_数据分析();
	init_数据分析及可视化();
	init_数据可视化();
	init_文档();
	init_文档处理();
	init_日常开发();
	init_深度研究();
	init_视觉海报();
	init_视频生成();
	init_移动端App();
	init_网站开发();
	init_网站设计();
	init_设计();
	init_设计系统();
	init_邮件编辑();
	init_金融服务();
	SVG_DATA_URI_PATTERN = /^data:image\/svg\+xml(?:;[^,]*)?,/i;
	SCENE_ICON_MAP = {
		"幻灯片": 幻灯片_default,
		"视频生成": 视频生成_default,
		"深度研究": 深度研究_default,
		"文档处理": 文档处理_default,
		"数据分析": 数据分析_default,
		"数据分析及可视化": 数据分析及可视化_default,
		"可视化": 数据可视化_default,
		"数据可视化": 数据可视化_default,
		"金融服务": 金融服务_default,
		"产品管理": 产品管理_default,
		"设计": 设计_default,
		"邮件编辑": 邮件编辑_default,
		"日常开发": 日常开发_default,
		"网站开发": 网站开发_default,
		"Agent 应用": Agent应用_default,
		"Skill 开发": Skill开发_default,
		"CI/CD": CICD_default,
		"文档": 文档_default,
		"PPT 设计": PPT设计_default,
		"PPT设计": PPT设计_default,
		"交互原型": 交互原型_default,
		"品牌设计": 品牌设计_default,
		"图标&插画": 图标插画_default,
		"图标插画": 图标插画_default,
		"移动端 App": 移动端App_default,
		"移动端App": 移动端App_default,
		"网站设计": 网站设计_default,
		"Web App": Web_App_default,
		"WebApp": Web_App_default,
		"Web 应用": Web_App_default,
		"Web应用": Web_App_default,
		"视觉海报": 视觉海报_default,
		"设计系统": 设计系统_default
	};
	SCENE_NAME_ALIAS_MAP = {
		"Slides Creation": "幻灯片",
		"Video Generation": "视频生成",
		"Deep Research": "深度研究",
		"Documentation": "文档处理",
		"Data Analysis": "数据分析",
		"Data Analysis & Visualization": "数据分析及可视化",
		"Visualization": "数据分析及可视化",
		"Data Visualization": "数据可视化",
		"Financial Services": "金融服务",
		"Product": "产品管理",
		"Design": "设计",
		"Email editing": "邮件编辑",
		"Daily Development": "日常开发",
		"Website Development": "网站开发",
		"Agent Apps": "Agent 应用",
		"Skill Development": "Skill 开发",
		"PPT Design": "PPT设计",
		"Slide Design": "PPT设计",
		"Interactive Prototype": "交互原型",
		"Prototype": "交互原型",
		"Brand Design": "品牌设计",
		"Branding": "品牌设计",
		"Icon & Illustration": "图标&插画",
		"Icons & Illustrations": "图标&插画",
		"Illustration": "图标&插画",
		"Mobile App": "移动端App",
		"Mobile App Design": "移动端App",
		"Website Design": "网站设计",
		"Web Design": "网站设计",
		"Visual Poster": "视觉海报",
		"Poster": "视觉海报",
		"Design System": "设计系统"
	};
	DEFAULT_SCENE_ICON = normalizeSceneIconSource(default_default);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/discover-panel.less
var init_discover_panel = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-case-detail.ts
function getMemoryCache(caseId) {
	return caseDetailCache.get(caseId) ?? null;
}
function setMemoryCache(caseId, detail) {
	caseDetailCache.set(caseId, detail);
}
function getErrorMessage(error) {
	if (error instanceof Error) return error.message;
	return String(error);
}
/** 从 COS 获取 Case 详情 */
async function fetchCaseDetail(caseId) {
	const url = `${DISCOVER_COS_CONFIG.baseUrl}${DISCOVER_COS_CONFIG.caseDetailPath(caseId)}`;
	const response = await fetch(url, { cache: "no-cache" });
	if (!response.ok) throw new Error(`Failed to fetch case detail: ${response.status} ${response.statusText}`);
	return response.json();
}
/** 从 registry 内存缓存中获取基础数据作为降级详情 */
function getFallbackDetail(caseId) {
	const cachedCases = registryMemoryCache.cases;
	if (!cachedCases) return null;
	return cachedCases.find((c) => c.id === caseId) || null;
}
function useCaseDetail(caseId) {
	const [detail, setDetail] = (0, import_react$18.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react$18.useState)(false);
	const [error, setError] = (0, import_react$18.useState)(null);
	(0, import_react$18.useEffect)(() => {
		if (!caseId) {
			setDetail(null);
			setIsLoading(false);
			setError(null);
			return;
		}
		let disposed = false;
		const loadDetail = async () => {
			setIsLoading(true);
			setError(null);
			const cached = getMemoryCache(caseId);
			if (cached) {
				setDetail(cached);
				setIsLoading(false);
			}
			try {
				const fresh = await fetchCaseDetail(caseId);
				if (disposed) return;
				setDetail(fresh);
				setMemoryCache(caseId, fresh);
			} catch (err) {
				if (!disposed) {
					if (!cached) {
						const fallback = getFallbackDetail(caseId);
						if (fallback) {
							console.warn("[useCaseDetail] Failed to fetch case detail for", caseId, ", using registry fallback. Error:", err);
							setDetail(fallback);
						} else setError(getErrorMessage(err));
					}
				}
			} finally {
				if (!disposed) setIsLoading(false);
			}
		};
		loadDetail().catch((err) => {
			console.error("[useCaseDetail] Unexpected error in loadDetail:", err);
		});
		return () => {
			disposed = true;
		};
	}, [caseId]);
	return {
		detail,
		isLoading,
		error,
		refresh: (0, import_react$18.useCallback)(async () => {
			if (!caseId) return;
			setIsLoading(true);
			setError(null);
			try {
				const fresh = await fetchCaseDetail(caseId);
				setDetail(fresh);
				setMemoryCache(caseId, fresh);
			} catch (err) {
				const fallback = getFallbackDetail(caseId);
				if (fallback) {
					console.warn("[useCaseDetail] refresh: failed to fetch case detail for", caseId, ", using registry fallback. Error:", err);
					setDetail(fallback);
				} else {
					setError(getErrorMessage(err));
					throw err;
				}
			} finally {
				setIsLoading(false);
			}
		}, [caseId])
	};
}
var import_react$18, caseDetailCache;
var init_use_case_detail = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_types$1();
	init_use_discover();
	caseDetailCache = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-expert-confirm-dialogs.ts
function useExpertConfirmDialogs(storage, onCancel) {
	const agentServices = useAgentServices();
	const enterpriseId = useAccountService()?.account?.enterpriseId ?? "";
	const [teamSummonDialogVisible, setTeamSummonDialogVisible] = (0, import_react$17.useState)(false);
	const [teamSummonAcknowledged, setTeamSummonAcknowledged] = (0, import_react$17.useState)(false);
	const [teamSummonTeamId, setTeamSummonTeamId] = (0, import_react$17.useState)(void 0);
	const teamSummonResolveRef = (0, import_react$17.useRef)(null);
	const [financeRiskDialogVisible, setFinanceRiskDialogVisible] = (0, import_react$17.useState)(false);
	const [financeRiskAcknowledged, setFinanceRiskAcknowledged] = (0, import_react$17.useState)(false);
	const [financeRiskDontAskAgain, setFinanceRiskDontAskAgain] = (0, import_react$17.useState)(false);
	const [financeRiskExpertType, setFinanceRiskExpertType] = (0, import_react$17.useState)(void 0);
	const financeRiskResolveRef = (0, import_react$17.useRef)(null);
	const showTeamSummonConfirmDialog = (0, import_react$17.useCallback)((teamId) => new Promise((resolve) => {
		teamSummonResolveRef.current = resolve;
		setTeamSummonAcknowledged(false);
		setTeamSummonTeamId(teamId);
		setTeamSummonDialogVisible(true);
	}), []);
	const confirmTeamSummon = (0, import_react$17.useCallback)(() => {
		storage.setItem(getTeamSummonConfirmStorageKey(storage), "true");
		setTeamSummonDialogVisible(false);
		setTeamSummonAcknowledged(false);
		setTeamSummonTeamId(void 0);
		teamSummonResolveRef.current?.(true);
		teamSummonResolveRef.current = null;
	}, [storage]);
	const cancelTeamSummon = (0, import_react$17.useCallback)(() => {
		setTeamSummonDialogVisible(false);
		setTeamSummonAcknowledged(false);
		setTeamSummonTeamId(void 0);
		teamSummonResolveRef.current?.(false);
		teamSummonResolveRef.current = null;
		onCancel?.();
	}, [onCancel]);
	const showFinanceRiskConfirmDialog = (0, import_react$17.useCallback)((expertType) => new Promise((resolve) => {
		financeRiskResolveRef.current = resolve;
		setFinanceRiskAcknowledged(false);
		setFinanceRiskDontAskAgain(false);
		setFinanceRiskExpertType(expertType);
		setFinanceRiskDialogVisible(true);
	}), []);
	const confirmFinanceRisk = (0, import_react$17.useCallback)(() => {
		if (financeRiskDontAskAgain) {
			storage.setItem(getFinanceRiskLegacySuppressStorageKey(storage), "true");
			storage.removeItem(getFinanceRiskSuppressDateStorageKey(storage));
		} else storage.setItem(getFinanceRiskSuppressDateStorageKey(storage), getCurrentDateKey());
		setFinanceRiskDialogVisible(false);
		setFinanceRiskAcknowledged(false);
		setFinanceRiskDontAskAgain(false);
		setFinanceRiskExpertType(void 0);
		financeRiskResolveRef.current?.(true);
		financeRiskResolveRef.current = null;
	}, [financeRiskDontAskAgain, storage]);
	const cancelFinanceRisk = (0, import_react$17.useCallback)(() => {
		setFinanceRiskDialogVisible(false);
		setFinanceRiskAcknowledged(false);
		setFinanceRiskDontAskAgain(false);
		setFinanceRiskExpertType(void 0);
		financeRiskResolveRef.current?.(false);
		financeRiskResolveRef.current = null;
		onCancel?.();
	}, [onCancel]);
	const checkExpertConfirmations = (0, import_react$17.useCallback)(async (expertId) => {
		let fullExpertInfo;
		try {
			fullExpertInfo = (await agentServices?.expert?.getMarketExperts({
				enterpriseId,
				source: "builtin",
				page: 1,
				page_size: 500
			}))?.experts?.find((item) => item.id === expertId);
		} catch {
			console.warn("[useExpertConfirmDialogs] Failed to get expert list for confirm check");
		}
		if (fullExpertInfo?.expertType === "team" && !shouldSkipTeamSummonConfirmation(storage)) {
			if (!await showTeamSummonConfirmDialog(expertId)) return false;
		}
		if (fullExpertInfo?.categoryId === "08-FinanceInvestment" && !shouldSkipFinanceRiskConfirmation(storage)) {
			if (!await showFinanceRiskConfirmDialog(fullExpertInfo?.expertType)) return false;
		}
		return true;
	}, [
		agentServices,
		enterpriseId,
		showTeamSummonConfirmDialog,
		showFinanceRiskConfirmDialog,
		storage
	]);
	return {
		teamSummonDialog: {
			visible: teamSummonDialogVisible,
			acknowledged: teamSummonAcknowledged,
			teamId: teamSummonTeamId
		},
		financeRiskDialog: {
			visible: financeRiskDialogVisible,
			acknowledged: financeRiskAcknowledged,
			dontAskAgain: financeRiskDontAskAgain,
			expertType: financeRiskExpertType
		},
		checkExpertConfirmations,
		setTeamSummonAcknowledged,
		confirmTeamSummon,
		cancelTeamSummon,
		setFinanceRiskAcknowledged,
		setFinanceRiskDontAskAgain,
		confirmFinanceRisk,
		cancelFinanceRisk
	};
}
var import_react$17;
var init_use_expert_confirm_dialogs = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_auth_context();
	init_expert();
	init_services();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-playbook-launch.tsx
function resolveCasePrompt(caseDetail, locale) {
	const fallbackPrompt = getLocalizedText$1(caseDetail.prompt, locale);
	if (locale !== "en") return fallbackPrompt;
	const promptFields = caseDetail;
	return promptFields.prompt_en?.trim() || promptFields.Prompt_en?.trim() || fallbackPrompt;
}
function usePlaybookLaunch() {
	const locale = useLocale();
	const adapter = useAdapter();
	const { account } = useAccount();
	const agentServices = useAgentServices();
	const personalSkills = usePersonalSkillsFacade();
	const playbookStorage = (0, import_react$16.useMemo)(() => createBrowserStorage({ userId: account?.uid }), [account?.uid]);
	const recentExpertsScopeKey = (0, import_react$16.useMemo)(() => getRecentExpertsScopeKey({
		enterpriseId: account?.enterpriseId,
		userId: account?.uid,
		type: account?.type
	}), [
		account?.enterpriseId,
		account?.type,
		account?.uid
	]);
	let marketplace;
	try {
		marketplace = useSkillsMarketplaceFacade();
	} catch (e) {
		console.warn("[Playbook] SkillsMarketplace facade unavailable, skill auto-install disabled:", String(e));
		marketplace = void 0;
	}
	const conversationsContext = useConversations();
	const [isLaunching, setIsLaunching] = (0, import_react$16.useState)(false);
	const [confirmDialog, setConfirmDialog] = (0, import_react$16.useState)(null);
	const [errorDialog, setErrorDialog] = (0, import_react$16.useState)(null);
	const resolveRef = (0, import_react$16.useRef)(null);
	const { teamSummonDialog, financeRiskDialog, checkExpertConfirmations, setTeamSummonAcknowledged, confirmTeamSummon, cancelTeamSummon, setFinanceRiskAcknowledged, setFinanceRiskDontAskAgain, confirmFinanceRisk, cancelFinanceRisk } = useExpertConfirmDialogs(playbookStorage, (0, import_react$16.useCallback)(() => {
		setIsLaunching(false);
	}, []));
	/**
	* 通过 keyword 搜索判断指定 skill 是否存在于 BuiltinMarket
	* 先用 pageSize=10 快速查询，命中立即返回；未命中则根据 total 翻页继续查
	*
	* issue #45885：透传 enterpriseId 让请求走聚合接口（admin 黑名单 /
	* 启用开关在出口处过滤）。否则会绕过后台过滤把 admin 已拉黑的 skill
	* 误判为「存在」，playbook 会试图引用拉黑 skill。
	*/
	const checkMarketSkillExists = (0, import_react$16.useCallback)(async (skillId) => {
		if (!marketplace?.builtin) return null;
		const eid = account?.enterpriseId;
		const enterpriseId = typeof eid === "string" && eid.trim() ? eid.trim() : void 0;
		try {
			const pageSize = 10;
			let page = 1;
			let totalCount = 0;
			do {
				const res = await marketplace.builtin.list({
					keyword: skillId,
					page,
					pageSize,
					enterpriseId
				});
				page++;
				const skills = res?.data?.skills;
				if (!skills || skills.length === 0) break;
				totalCount = res.data.total_count ?? 0;
				const matched = skills.find((s) => s.name === skillId);
				if (matched) return {
					skillId: matched.id ?? matched.skill_id ?? matched.name ?? skillId,
					version: matched.version
				};
			} while ((page - 1) * pageSize < totalCount);
			return null;
		} catch {
			return null;
		}
	}, [marketplace, account?.enterpriseId]);
	const checkSkills = (0, import_react$16.useCallback)(async (caseDetail) => {
		const skills = caseDetail.skills;
		if (!skills || skills.length === 0) return [];
		let installedSkills = [];
		try {
			installedSkills = (await personalSkills.list({
				cwd: "",
				global: false
			}))?.results ?? [];
		} catch {
			console.warn("[usePlaybookLaunch] Failed to get skill list");
		}
		const results = [];
		for (const skill of skills) {
			const skillId = skill.slug || skill.id;
			const isInstalled = installedSkills.find((item) => item.slug && item.slug === skillId);
			if (isInstalled) {
				if (isInstalled.disable && isInstalled.filePath) try {
					const toggleResult = await personalSkills.toggle({
						filePath: isInstalled.filePath,
						disable: false
					});
					if (toggleResult?.success) console.info(`[usePlaybookLaunch] Enabled disabled skill: ${skillId}`);
					else console.warn(`[usePlaybookLaunch] Failed to enable skill ${skillId}:`, toggleResult?.error);
				} catch (error) {
					console.warn(`[usePlaybookLaunch] Error enabling skill ${skillId}:`, error);
				}
				results.push({
					skill,
					status: SkillStatus.Installed,
					installSource: null
				});
			} else results.push({
				skill,
				status: SkillStatus.NotInstalled,
				installSource: null
			});
		}
		const notInstalled = results.filter((item) => item.status === SkillStatus.NotInstalled);
		if (notInstalled.length > 0) {
			const skillHubSlugs = [];
			const marketIds = [];
			for (const item of notInstalled) if (item.skill.slug) skillHubSlugs.push(item.skill.slug);
			else if (item.skill.id) marketIds.push(item.skill.id);
			const marketSkillInfoMap = /* @__PURE__ */ new Map();
			if (marketIds.length > 0) {
				const marketCheckResults = await Promise.all(marketIds.map(async (id) => ({
					id,
					info: await checkMarketSkillExists(id)
				})));
				for (const { id, info } of marketCheckResults) if (info) marketSkillInfoMap.set(id, info);
			}
			let hubExists = {};
			if (skillHubSlugs.length > 0 && marketplace?.skillhub) try {
				const hubResult = await marketplace.skillhub.exists(skillHubSlugs);
				if (hubResult) hubExists = hubResult.exists;
			} catch (err) {
				console.warn("[usePlaybookLaunch] Failed to check SkillHub availability. Error:", err);
			}
			for (const item of results) {
				if (item.status !== SkillStatus.NotInstalled) continue;
				const skill = item.skill;
				if (skill.slug && hubExists[skill.slug]) item.installSource = SkillInstallSource.SkillHub;
				else if (skill.id && marketSkillInfoMap.has(skill.id)) {
					const info = marketSkillInfoMap.get(skill.id);
					item.installSource = SkillInstallSource.Marketplace;
					item.marketSkillId = info.skillId;
					item.marketVersion = info.version;
				} else item.installSource = null;
			}
		}
		return results;
	}, [
		marketplace,
		personalSkills,
		checkMarketSkillExists
	]);
	const installSkills = (0, import_react$16.useCallback)(async (skillResults) => {
		const toInstall = skillResults.filter((s) => s.status === SkillStatus.NotInstalled && s.installSource);
		if (toInstall.length === 0) return [];
		const results = [];
		for (const item of toInstall) try {
			if (item.installSource === SkillInstallSource.SkillHub) {
				const skillHubSlug = item.skill.slug;
				if (!skillHubSlug) {
					results.push({
						id: item.skill.id || item.skill.name || "Unknown Skill Id",
						success: false,
						error: "missing slug"
					});
					continue;
				}
				let version;
				let iconUrl;
				try {
					const detail = await marketplace?.skillhub.getDetail(skillHubSlug);
					version = detail?.latestVersion?.version;
					iconUrl = detail?.iconUrl;
				} catch (err) {
					console.warn("[usePlaybookLaunch] Failed to fetch skill hub detail for", skillHubSlug, "— will install without pinned version:", err);
				}
				const result = await marketplace?.skillhub.install(skillHubSlug, version, item.skill.name, iconUrl, item.skill.labels);
				if (!result?.success) {
					console.warn(`[Playbook] SkillHub install failed: ${skillHubSlug}`, result?.errorMessage);
					results.push({
						id: skillHubSlug,
						success: false,
						error: result?.errorMessage
					});
				} else {
					results.push({
						id: skillHubSlug,
						success: true
					});
					await personalSkills.list({
						cwd: "",
						global: false
					}).catch((err) => {
						console.warn("[usePlaybookLaunch] Failed to refresh skill list after install:", err);
					});
				}
			} else if (item.installSource === SkillInstallSource.Marketplace) {
				const realSkillId = item.marketSkillId ?? item.skill.id;
				const result = await marketplace?.builtin.install({
					skillId: realSkillId,
					version: item.marketVersion,
					name: item.skill.name,
					skillName: item.skill.id
				});
				if (!result?.success) {
					console.warn(`[Playbook] BuiltinMarket install failed: ${realSkillId}`, result?.errorMessage);
					results.push({
						id: item.skill.id,
						success: false,
						error: result?.errorMessage
					});
				} else results.push({
					id: item.skill.id,
					success: true
				});
			}
		} catch (error) {
			results.push({
				id: item.skill.slug ?? item.skill.id,
				success: false,
				error: error instanceof Error ? error.message : String(error)
			});
		}
		return results;
	}, [adapter]);
	const showContinueConfirmDialog = (0, import_react$16.useCallback)((data) => new Promise((resolve) => {
		resolveRef.current = resolve;
		const { names, type, errorType } = data;
		const typeLabel = type === "skill" ? t("discover.skillLabel") : t("discover.expertLabel");
		setConfirmDialog({
			title: t(errorType === "notFound" ? "discover.unavailableTitle" : "discover.installFailedTitle", { type: typeLabel }),
			description: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)(import_jsx_runtime$15.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("p", { children: t(errorType === "notFound" ? "discover.unavailableDesc" : "discover.installFailedDesc", { type: typeLabel }) }),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("ul", {
					className: "dc-confirm-skill-list",
					children: names.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("li", { children: s }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("p", { children: t("discover.continueQuestion", { type: typeLabel }) })
			] })
		});
	}), []);
	const confirmContinue = (0, import_react$16.useCallback)(() => {
		resolveRef.current?.(true);
		resolveRef.current = null;
		setConfirmDialog(null);
	}, []);
	const confirmCancel = (0, import_react$16.useCallback)(() => {
		resolveRef.current?.(false);
		resolveRef.current = null;
		setConfirmDialog(null);
		setIsLaunching(false);
	}, []);
	const showErrorDialog = (0, import_react$16.useCallback)((data) => {
		let message;
		if (typeof data === "string") message = data;
		else {
			const { names, type } = data;
			message = /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)(import_jsx_runtime$15.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("p", { children: t("discover.launchFailedDesc", { type: type === "skill" ? t("discover.skillLabel") : t("discover.expertLabel") }) }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("ul", {
				className: "dc-confirm-skill-list",
				children: names.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("li", { children: name }, i))
			})] });
		}
		setErrorDialog({ message });
	}, []);
	const dismissError = (0, import_react$16.useCallback)(() => {
		setErrorDialog(null);
	}, []);
	return {
		isLaunching,
		confirmDialog,
		errorDialog,
		teamSummonDialog,
		financeRiskDialog,
		launch: (0, import_react$16.useCallback)(async ({ caseDetail, source, categories, searchKeyword }) => {
			if (isLaunching) return false;
			setIsLaunching(true);
			try {
				let skillResults;
				try {
					skillResults = await checkSkills(caseDetail);
				} catch (error) {
					showErrorDialog(error instanceof Error ? error.message : String(error));
					return false;
				}
				const unavailable = skillResults.filter((s) => s.status === SkillStatus.NotInstalled && !s.installSource);
				if (unavailable.length > 0) {
					if (!await showContinueConfirmDialog({
						type: "skill",
						names: unavailable.map((s) => s.skill.name),
						errorType: "notFound"
					})) {
						setIsLaunching(false);
						return false;
					}
				}
				const failedInstalls = (await installSkills(skillResults)).filter((r) => !r.success);
				if (failedInstalls.length > 0) {
					if (!await showContinueConfirmDialog({
						type: "skill",
						names: failedInstalls.map((s) => s.id),
						errorType: "installFailed"
					})) {
						setIsLaunching(false);
						return false;
					}
				}
				const curExpert = caseDetail.experts[0];
				if (curExpert) {
					if (!await checkExpertConfirmations(curExpert.id)) return false;
				}
				let selectedExpert = null;
				if (curExpert) try {
					const expertFacade = agentServices?.expert;
					if (expertFacade?.summonExpert) {
						const result = await expertFacade.summonExpert({
							expertId: curExpert.id,
							sessionId: recentExpertsScopeKey,
							locale,
							source: "builtin"
						});
						selectedExpert = {
							id: result.expert.id,
							name: result.expert.name,
							profession: result.expert.profession,
							avatarUrl: result.expert.avatarUrl,
							prompt: result.expert.prompt,
							defaultInitPrompt: result.expert.defaultInitPrompt,
							pluginName: result.expert.pluginName,
							expertType: result.expert.expertType,
							summonTimestamp: Date.now()
						};
						selectedExpert.agentName = result.expert.agentName;
					}
				} catch {
					showErrorDialog({
						type: "expert",
						names: [curExpert.name || curExpert.id]
					});
					return false;
				}
				adapter?.setPendingExpert?.(selectedExpert ?? null);
				const skillBlocks = (caseDetail.skills || []).map((skill) => createPhraseBlock(skill.name, `skill://${skill.id}`, {
					title: `Use skill ${skill.name}. `,
					meta: {
						type: "skill",
						mentionType: "skill",
						displayText: skill.name
					},
					icon: "skill"
				}));
				const defaultPrompt = resolveCasePrompt(caseDetail, locale);
				const expert = caseDetail.experts?.[0];
				const categoryId = caseDetail.categories?.[0] ?? "";
				const playbookMeta = {
					playbookId: caseDetail.id,
					playbookName: caseDetail.title,
					playbookType: caseDetail.artifact_type,
					playbookPromptLength: defaultPrompt.length,
					playbookSkills: (caseDetail.skills ?? []).map((s) => s.id).join(","),
					playbookSkillNames: (caseDetail.skills ?? []).map((s) => s.name).join(","),
					playbookExpertId: expert?.id,
					playbookExpertName: expert?.name,
					playbookCategoryId: categoryId,
					playbookCategoryName: categories.find((c) => c.id === categoryId)?.name ?? "",
					playbookSource: source,
					playbookQuery: searchKeyword || void 0,
					playbookExt1: source === PlaybookCtaSource.Home ? "home" : "discover"
				};
				const welcomeMode = resolveTaskMode(caseDetail.task_mode);
				let sceneBlock = null;
				if (caseDetail.scenario_use && adapter?.getTemplates) try {
					const matchedTemplate = (await adapter.getTemplates(locale === "en" ? "en" : "zh"))?.find((t) => t.name === caseDetail.scenario_use);
					if (matchedTemplate) sceneBlock = createPhraseBlock(matchedTemplate.name, `scene://${matchedTemplate.id}`, {
						icon: {
							kind: "inline-svg",
							source: getSceneIcon(matchedTemplate.name),
							alt: matchedTemplate.name
						},
						meta: {
							type: "scene",
							mentionType: "scene",
							displayText: matchedTemplate.name,
							sceneId: String(matchedTemplate.id)
						}
					});
				} catch (err) {
					console.error("[usePlaybookLaunch] Failed to resolve scene template:", err);
				}
				conversationsContext?.handleNewTask?.(true);
				setTimeout(() => {
					if (welcomeMode) conversationsContext?.setSelectedWelcomeMode?.(welcomeMode);
					setTimeout(() => {
						setTimeout(() => {
							adapter?.requestInsertContentBlocks?.({
								contentBlocks: [...sceneBlock ? [sceneBlock] : [], ...skillBlocks],
								clearFirst: true,
								promptText: defaultPrompt,
								expert: selectedExpert,
								_meta: { playbookMeta }
							});
						}, 0);
					}, 0);
				}, 100);
				return true;
			} catch (error) {
				showErrorDialog(error instanceof Error ? error.message : String(error));
				return false;
			} finally {
				setIsLaunching(false);
			}
		}, [
			isLaunching,
			checkSkills,
			installSkills,
			showContinueConfirmDialog,
			showErrorDialog,
			checkExpertConfirmations,
			adapter,
			conversationsContext,
			locale,
			recentExpertsScopeKey
		]),
		confirmContinue,
		confirmCancel,
		dismissError,
		setTeamSummonAcknowledged,
		confirmTeamSummon,
		cancelTeamSummon,
		setFinanceRiskAcknowledged,
		setFinanceRiskDontAskAgain,
		confirmFinanceRisk,
		cancelFinanceRisk
	};
}
var import_react$16, import_jsx_runtime$15, SkillStatus, SkillInstallSource;
var init_use_playbook_launch = __esmMin((() => {
	init_src();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_i18n();
	init_expert();
	init_services();
	init_app_providers();
	init_telemetry();
	init_scene_icon_map();
	init_types$1();
	init_utils();
	init_use_expert_confirm_dialogs();
	init_use_locale();
	import_jsx_runtime$15 = require_jsx_runtime();
	SkillStatus = /* @__PURE__ */ function(SkillStatus) {
		SkillStatus["Installed"] = "installed";
		SkillStatus["NotInstalled"] = "not_installed";
		return SkillStatus;
	}({});
	SkillInstallSource = /* @__PURE__ */ function(SkillInstallSource) {
		SkillInstallSource["SkillHub"] = "skillhub";
		SkillInstallSource["Marketplace"] = "marketplace";
		return SkillInstallSource;
	}({});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-preview-on-light-bg.ts
function usePreviewOnLightBg(_containerRef, _deps = [], _sampleAnchor = {
	fromRight: 28,
	fromTop: 28
}) {
	return true;
}
var init_use_preview_on_light_bg = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/use-case-experts-details.ts
function cacheKey(expertId, locale, enterpriseId, source) {
	return `${expertId}|${locale}|${enterpriseId}|${source}`;
}
/** 简易并发闸门：任意时刻最多 limit 个 task 在飞。 */
async function runWithConcurrencyLimit(tasks, limit) {
	const results = new Array(tasks.length);
	let cursor = 0;
	const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
		while (true) {
			const i = cursor++;
			if (i >= tasks.length) return;
			try {
				results[i] = {
					status: "fulfilled",
					value: await tasks[i]()
				};
			} catch (reason) {
				results[i] = {
					status: "rejected",
					reason
				};
			}
		}
	});
	await Promise.all(workers);
	return results;
}
function useCaseExpertsDetails(experts, source = "builtin") {
	const agentServices = useAgentServices();
	const { account } = useAccount();
	const enterpriseId = account?.enterpriseId ?? "";
	const locale = useLocale();
	const [details, setDetails] = (0, import_react$15.useState)({});
	const [pendingIds, setPendingIds] = (0, import_react$15.useState)(() => /* @__PURE__ */ new Set());
	(0, import_react$15.useEffect)(() => {
		let disposed = false;
		const expertFacade = agentServices?.expert;
		if (!experts?.length || !expertFacade?.getExpert) {
			setDetails({});
			setPendingIds(/* @__PURE__ */ new Set());
			return () => {
				disposed = true;
			};
		}
		const uniqueIds = Array.from(new Set(experts.map((e) => e.id)));
		setPendingIds(new Set(uniqueIds));
		runWithConcurrencyLimit(uniqueIds.map((expertId) => async () => {
			const key = cacheKey(expertId, locale, enterpriseId, source);
			let promise = detailCache.get(key);
			if (!promise) {
				promise = expertFacade.getExpert({
					expertId,
					locale,
					enterpriseId,
					source
				}).then((result) => ({
					avatarUrl: result.expert.avatarUrl,
					profession: result.expert.profession,
					name: result.expert.name
				})).catch((err) => {
					detailCache.delete(key);
					throw err;
				});
				detailCache.set(key, promise);
			}
			return [expertId, await promise];
		}), MAX_CONCURRENCY).then((settled) => {
			if (disposed) return;
			const next = {};
			for (const r of settled) if (r.status === "fulfilled") {
				const [id, info] = r.value;
				next[id] = info;
			}
			setDetails(next);
			setPendingIds(/* @__PURE__ */ new Set());
		});
		return () => {
			disposed = true;
		};
	}, [
		agentServices,
		experts,
		enterpriseId,
		locale,
		source
	]);
	return (0, import_react$15.useMemo)(() => ({
		details,
		pendingIds
	}), [details, pendingIds]);
}
var import_react$15, detailCache, MAX_CONCURRENCY;
var init_use_case_experts_details = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_app_providers();
	init_use_locale();
	detailCache = /* @__PURE__ */ new Map();
	MAX_CONCURRENCY = 4;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/hooks/index.ts
var init_hooks = __esmMin((() => {
	init_use_discover();
	init_use_favorites();
	init_use_case_detail();
	init_use_locale();
	init_use_playbook_launch();
	init_use_expert_confirm_dialogs();
	init_use_preview_on_light_bg();
	init_use_case_experts_details();
})), import_jsx_runtime$14, ExpertConfirmDialogs;
var init_expert_confirm_dialogs = __esmMin((() => {
	init_src();
	require_react();
	init_useI18n();
	init_useTheme();
	import_jsx_runtime$14 = require_jsx_runtime();
	ExpertConfirmDialogs = ({ teamSummonDialog, financeRiskDialog, setTeamSummonAcknowledged, confirmTeamSummon, cancelTeamSummon, setFinanceRiskAcknowledged, setFinanceRiskDontAskAgain, confirmFinanceRisk, cancelFinanceRisk }) => {
		const t = useTranslation();
		const { theme } = useTheme();
		const dialogTheme = theme === "light" ? "light" : "dark";
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ConfirmDialog, {
			visible: teamSummonDialog.visible,
			title: t("expertCenter.teamSummonConfirmDialogTitle"),
			theme: dialogTheme,
			content: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "ec-confirm-dialog-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { children: t("expertCenter.teamSummonConfirmDialogContent") }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
					className: "ec-confirm-dialog-checkbox",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
						type: "checkbox",
						checked: teamSummonDialog.acknowledged,
						onChange: (e) => setTeamSummonAcknowledged(e.target.checked)
					}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { children: t("expertCenter.teamSummonConfirmDialogAcknowledge") })]
				})]
			}),
			confirmText: t("expertCenter.teamSummonConfirmDialogConfirm"),
			cancelText: t("common.cancel"),
			confirmVariant: "primary",
			confirmButtonColor: "var(--cb-button-dark-background)",
			confirmDisabled: !teamSummonDialog.acknowledged,
			footerButtonsAlign: "center",
			buttonOrder: "confirm-cancel",
			showCloseButton: true,
			footerButtonWidth: 96,
			onClose: cancelTeamSummon,
			onConfirm: confirmTeamSummon,
			confirmTrack: {
				elementId: "expert_team_confirm_continue",
				elementName: "确认继续使用",
				props: { source: teamSummonDialog.teamId }
			},
			cancelTrack: {
				elementId: "expert_team_confirm_cancel",
				elementName: "确认取消",
				props: { source: teamSummonDialog.teamId }
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ConfirmDialog, {
			visible: financeRiskDialog.visible,
			title: t("expertCenter.financeRiskDialogTitle"),
			theme: dialogTheme,
			content: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "ec-confirm-dialog-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { children: t(financeRiskDialog.expertType === "team" ? "expertCenter.financeRiskTeamDialogContent" : "expertCenter.financeRiskDialogContent") }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: "ec-confirm-dialog-checkbox-group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
						className: "ec-confirm-dialog-checkbox",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
							type: "checkbox",
							checked: financeRiskDialog.acknowledged,
							onChange: (e) => setFinanceRiskAcknowledged(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { children: t("expertCenter.financeRiskDialogAcknowledge") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
						className: "ec-confirm-dialog-checkbox",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
							type: "checkbox",
							checked: financeRiskDialog.dontAskAgain,
							onChange: (e) => setFinanceRiskDontAskAgain(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { children: t("expertCenter.financeRiskDialogDontAskAgain") })]
					})]
				})]
			}),
			confirmText: t("expertCenter.financeRiskDialogConfirm"),
			cancelText: t("common.cancel"),
			confirmVariant: "primary",
			confirmButtonColor: "var(--cb-button-dark-background)",
			confirmDisabled: !financeRiskDialog.acknowledged,
			footerButtonsAlign: "center",
			buttonOrder: "confirm-cancel",
			showCloseButton: true,
			footerButtonWidth: 96,
			onClose: cancelFinanceRisk,
			onConfirm: confirmFinanceRisk
		})] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/case-detail-page/preview-code.tsx
/** 从 URL 中提取文件扩展名，映射为 markdown 代码块的语言标识 */
function getLanguageFromUrl(url) {
	if (!url) return "";
	const ext = (url.split("/").pop() || "").split(".").pop()?.toLowerCase() || "";
	return {
		sql: "sql",
		py: "python",
		js: "javascript",
		ts: "typescript",
		jsx: "jsx",
		tsx: "tsx",
		java: "java",
		go: "go",
		rs: "rust",
		rb: "ruby",
		php: "php",
		sh: "bash",
		bash: "bash",
		zsh: "bash",
		css: "css",
		scss: "scss",
		less: "less",
		json: "json",
		yaml: "yaml",
		yml: "yaml",
		xml: "xml",
		c: "c",
		cpp: "cpp",
		h: "c",
		hpp: "cpp",
		cs: "csharp",
		swift: "swift",
		kt: "kotlin",
		r: "r",
		lua: "lua",
		toml: "toml",
		ini: "ini",
		dockerfile: "dockerfile"
	}[ext] || ext;
}
var import_react$13, import_jsx_runtime$13, EXPAND_ALL_CONFIG, PreviewCode;
var init_preview_code = __esmMin((() => {
	init_src();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$13 = require_jsx_runtime();
	EXPAND_ALL_CONFIG = { expandThreshold: 2e3 };
	PreviewCode = ({ content, previewUrl }) => {
		const lang = (0, import_react$13.useMemo)(() => getLanguageFromUrl(previewUrl), [previewUrl]);
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: "dc-detail-preview-code",
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(MarkdownRenderer, {
				config: EXPAND_ALL_CONFIG,
				children: (0, import_react$13.useMemo)(() => `\`\`\`${lang}\n${content}\n\`\`\``, [lang, content])
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/case-detail-page/preview-doc.tsx
var import_react$12, import_jsx_runtime$12, LazyDocxPreviewComponent, PreviewDoc;
var init_preview_doc = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$12 = require_jsx_runtime();
	init_preload_helper();
	LazyDocxPreviewComponent = import_react$12.lazy(() => __vitePreload(() => import("./docx-preview-component-CjwFTC73.js").then((m) => ({ default: m.DocxPreviewComponent })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]), import.meta.url));
	PreviewDoc = ({ file }) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
		className: "dc-detail-preview-docx",
		children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(import_react$12.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", { className: "dc-detail-preview-docx-content" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(LazyDocxPreviewComponent, {
				className: "dc-detail-preview-docx-content",
				file,
				filename: file.name
			})
		})
	});
})), import_jsx_runtime$11, EmptyArtifactIcon, PreviewEmpty;
var init_preview_empty = __esmMin((() => {
	require_react();
	init_useI18n();
	import_jsx_runtime$11 = require_jsx_runtime();
	EmptyArtifactIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("svg", {
		viewBox: "0 0 64 64",
		fill: "none",
		width: "48",
		height: "48",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("rect", {
			x: "12",
			y: "8",
			width: "40",
			height: "48",
			rx: "4",
			stroke: "currentColor",
			strokeWidth: "2",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", {
			d: "M22 24h20M22 32h14M22 40h18",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			opacity: "0.3"
		})]
	});
	PreviewEmpty = () => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "dc-detail-preview-empty",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(EmptyArtifactIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { children: t("discover.noArtifact") })]
		});
	};
})), import_jsx_runtime$10, PreviewHtml;
var init_preview_html = __esmMin((() => {
	init_src$1();
	require_react();
	init_contexts();
	init_useTheme();
	import_jsx_runtime$10 = require_jsx_runtime();
	PreviewHtml = ({ previewUrl }) => {
		const { theme } = useTheme();
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(BrowserPreviewContextProvider, {
			environmentType: useAdapter()?.environmentType,
			theme,
			browserUrl: previewUrl,
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Frame, {})
		});
	};
})), import_jsx_runtime$9, PreviewImage;
var init_preview_image = __esmMin((() => {
	require_react();
	import_jsx_runtime$9 = require_jsx_runtime();
	PreviewImage = ({ src, alt }) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
		className: "dc-detail-preview-image",
		children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("img", {
			src,
			alt,
			loading: "lazy"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/case-detail-page/preview-ardot-embed.tsx
/** 给可能挂起的异步操作套超时兜底，把 hang 转成明确 error。 */
function withTimeout(promise, ms, label) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(/* @__PURE__ */ new Error(`[withTimeout] ${label} exceeded ${ms}ms`)), ms);
		promise.then((v) => {
			clearTimeout(timer);
			resolve(v);
		}, (e) => {
			clearTimeout(timer);
			reject(e);
		});
	});
}
var import_react$8, import_jsx_runtime$8, HANDSHAKE_ATTEMPT_TIMEOUT_MS, HANDSHAKE_MAX_ATTEMPTS, HANDSHAKE_RETRY_INTERVAL_MS, GET_TOKEN_TIMEOUT_MS, VIEWPORT_RESIZE_DEBOUNCE_MS, PreviewArdotEmbed;
var init_preview_ardot_embed = __esmMin((() => {
	init_src$2();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useTheme();
	import_jsx_runtime$8 = require_jsx_runtime();
	HANDSHAKE_ATTEMPT_TIMEOUT_MS = 500;
	HANDSHAKE_MAX_ATTEMPTS = 30;
	HANDSHAKE_RETRY_INTERVAL_MS = 200;
	GET_TOKEN_TIMEOUT_MS = 5e3;
	VIEWPORT_RESIZE_DEBOUNCE_MS = 300;
	PreviewArdotEmbed = ({ src, title, onRequestEnlarge }) => {
		const adapter = useAdapter();
		const { checkAuth, authConnector, getToken } = useArdotAuth(adapter);
		const { theme } = useTheme();
		const embedTheme = theme === "dark" ? "dark" : "light";
		const iframeRef = (0, import_react$8.useRef)(null);
		const embedHostRef = (0, import_react$8.useRef)(null);
		const disposedRef = (0, import_react$8.useRef)(false);
		const [phase, setPhase] = (0, import_react$8.useState)("checking");
		const [authErrorMessage, setAuthErrorMessage] = (0, import_react$8.useState)(null);
		/**
		* 进入 need-auth 时向父详情页请求放大 —— auth modal 在非放大态的窗口里
		* 显示不下。放大只做一次，避免用户手动收起后被反复强制放大。
		*/
		const enlargeRequestedRef = (0, import_react$8.useRef)(false);
		(0, import_react$8.useEffect)(() => {
			if (phase !== "need-auth") return;
			if (enlargeRequestedRef.current) return;
			enlargeRequestedRef.current = true;
			onRequestEnlarge?.();
		}, [phase, onRequestEnlarge]);
		/**
		* 把 WB 明/暗色主题同步到 ardot iframe：
		* - handshake 完成后立即推一次首屏主题（下面握手 effect 用 currentThemeRef 读最新值）
		* - 用户切换 WB 主题后实时推送（此 effect 依赖 embedTheme）
		*
		* 与 issue #41994 wb 对话流走 MCP host bridge broadcastHostContext 的
		* 位置对齐，只是通道换成 embed-sdk HOST_CONTEXT_CHANGED event。
		*/
		const currentThemeRef = (0, import_react$8.useRef)(embedTheme);
		(0, import_react$8.useEffect)(() => {
			currentThemeRef.current = embedTheme;
			const host = embedHostRef.current;
			if (!host) return;
			host.sendEvent("HOST_CONTEXT_CHANGED", { context: { theme: embedTheme } });
		}, [embedTheme]);
		/** 幂等注入 auth modal 相关 style；即使当前 phase 是 checking 也需要，避免用户切到 need-auth 后闪一下无样式。 */
		(0, import_react$8.useEffect)(() => {
			ensureArdotAuthStyles();
		}, []);
		/**
		* 组件生命周期：mount 时 reset disposedRef、unmount 时清理 EmbedHost。
		*
		* React 18 StrictMode 会 mount → cleanup → mount 跑一遍演习：`useRef(false)`
		* 的初始值只在**真正的**首次 mount 时生效，第二轮 mount 不会重置。所以
		* 必须在这里手动 `disposedRef.current = false`，否则第一轮 cleanup 把它
		* 设成 true 之后所有后续 handler 都会被短路。
		*/
		(0, import_react$8.useEffect)(() => {
			disposedRef.current = false;
			return () => {
				disposedRef.current = true;
				embedHostRef.current?.dispose();
				embedHostRef.current = null;
			};
		}, []);
		/** 首屏 checkAuth：已授权直接 ready；未授权进 need-auth 展示 modal 内容。 */
		(0, import_react$8.useEffect)(() => {
			if (!adapter) {
				setAuthErrorMessage("adapter unavailable");
				setPhase("auth-error");
				return;
			}
			let cancelled = false;
			checkAuth().then((result) => {
				if (cancelled) return;
				if (result.status === "connected") setPhase("ready");
				else setPhase("need-auth");
			}).catch((err) => {
				if (cancelled) return;
				setAuthErrorMessage(String(err));
				setPhase("auth-error");
			});
			return () => {
				cancelled = true;
			};
		}, [adapter, checkAuth]);
		/** 用户点授权：调 authConnector 拿 token → 切 ready，触发 iframe 挂载。 */
		const handleAuthorize = (0, import_react$8.useCallback)(async () => {
			setPhase("authorizing");
			try {
				await authConnector();
				if (disposedRef.current) return;
				setPhase("ready");
			} catch (err) {
				if (disposedRef.current) return;
				setAuthErrorMessage(String(err));
				setPhase("auth-error");
			}
		}, [authConnector]);
		/** 授权 modal 上的取消 —— 灵感预览场景没有别的可退路，回到 need-auth 让用户可再点。 */
		const handleAuthCancel = (0, import_react$8.useCallback)(() => {
			setPhase("need-auth");
		}, []);
		/**
		* iframe 一挂到 DOM 就建 EmbedHost，主动轮询 SAVE_TOKENS 探测就绪。
		*
		* 不依赖 `INITIALIZED` 事件的原因：cocraft `EmbedAdapterService.init()`
		* 里 `emit('INITIALIZED')` 时机比 iframe 外层 `onLoad` 更早，React
		* StrictMode 演习或 message listener 时机稍晚都可能错过；SAVE_TOKENS
		* 是 request/response，未就绪时会 timeout，我们据此判断轮询。
		*
		* 依赖 `phase === 'ready'`：只有 ready 才 mount iframe，onLoad 之前
		* postMessage 到 iframe.contentWindow 是 no-op（execute timeout 会兜底）。
		* getToken 变化不重跑（引用稳定，用 ref 转发避免 stale closure）。
		*/
		const getTokenRef = (0, import_react$8.useRef)(getToken);
		(0, import_react$8.useEffect)(() => {
			getTokenRef.current = getToken;
		}, [getToken]);
		(0, import_react$8.useEffect)(() => {
			if (phase !== "ready") return;
			const iframe = iframeRef.current;
			if (!iframe) return;
			let targetOrigin;
			try {
				targetOrigin = new URL(iframe.src).origin;
			} catch {
				targetOrigin = void 0;
			}
			embedHostRef.current?.dispose();
			const host = new ArdotEmbedHost(iframe, targetOrigin ? {
				targetOrigin,
				timeoutMs: HANDSHAKE_ATTEMPT_TIMEOUT_MS
			} : { timeoutMs: HANDSHAKE_ATTEMPT_TIMEOUT_MS });
			embedHostRef.current = host;
			let cancelled = false;
			let attempt = 0;
			(async () => {
				try {
					const { accessToken } = await withTimeout(getTokenRef.current(), GET_TOKEN_TIMEOUT_MS, "getToken");
					while (!cancelled && attempt < HANDSHAKE_MAX_ATTEMPTS) {
						attempt += 1;
						try {
							await host.execute("SAVE_TOKENS", { authToken: accessToken });
							break;
						} catch (err) {
							if (attempt >= HANDSHAKE_MAX_ATTEMPTS) throw new Error(`SAVE_TOKENS failed after ${attempt} attempts: ${err}`);
							await new Promise((r) => setTimeout(r, HANDSHAKE_RETRY_INTERVAL_MS));
						}
					}
					if (cancelled) return;
					await host.execute("RESUME_AFTER_AUTH");
					if (!cancelled) host.sendEvent("HOST_CONTEXT_CHANGED", { context: { theme: currentThemeRef.current } });
				} catch (err) {
					if (cancelled) return;
					console.error("[PreviewArdotEmbed] host handshake failed", err);
					setAuthErrorMessage(String(err));
					setPhase("auth-error");
				}
			})();
			return () => {
				cancelled = true;
				host.dispose();
				if (embedHostRef.current === host) embedHostRef.current = null;
			};
		}, [phase, src]);
		/**
		* iframe 容器尺寸变化 → 通知 ardot 重新 fit 到内容左上角（含 spacing 呼吸边距）。
		*
		* 触发场景：
		* 1. 用户点详情页右上角放大/缩小按钮 → detail modal 宽高变
		* 2. 用户拖 WorkBuddy 应用窗口 → detail modal 跟着变
		* 3. 侧边栏折叠/展开等其他布局变化
		*
		* 只在 phase === 'ready'（iframe 已挂载 + handshake 成功）时启用，
		* 避免 loading 期间无意义地推送。ardot 侧收到 viewportChanged 会走
		* scheduleZoomAfterReflow → runZoomToFit（灵感 host 走 onZoomToFitWidth）。
		*
		* 设计取舍：曾尝试"保持视口锚点"的路径（带 old/new 宽度让 ardot 端按比例保
		* 用户拖过的位置），但 wasm 端 `window_operator.cc::setWindowSize` 内建
		* `updateContentCenter` 已在系统 window.resize 时保持 zoom + 平移 center，
		* 再叠一层 zoom 调整会与 wasm 自身补偿冲突、视觉抖动。改回单一 fit 后行为可预期。
		*
		* 使用 iframe 自身作为 observe 目标：iframe 元素尺寸变化即是 ardot 内部
		* window.innerWidth/Height 变化。
		*/
		(0, import_react$8.useEffect)(() => {
			if (phase !== "ready") return;
			const iframe = iframeRef.current;
			if (!iframe) return;
			if (typeof ResizeObserver === "undefined") return;
			let debounceTimer = null;
			let firstTick = true;
			const observer = new ResizeObserver(() => {
				if (firstTick) {
					firstTick = false;
					return;
				}
				if (debounceTimer) clearTimeout(debounceTimer);
				debounceTimer = setTimeout(() => {
					debounceTimer = null;
					const host = embedHostRef.current;
					if (!host) return;
					host.sendEvent("HOST_CONTEXT_CHANGED", { context: { viewportChanged: true } });
				}, VIEWPORT_RESIZE_DEBOUNCE_MS);
			});
			observer.observe(iframe);
			return () => {
				observer.disconnect();
				if (debounceTimer) {
					clearTimeout(debounceTimer);
					debounceTimer = null;
				}
			};
		}, [phase]);
		if (phase === "checking" || phase === "authorizing") return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "dc-detail-preview-ardot-embed",
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "dc-detail-preview-loading",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { className: "dc-spinner" })
			})
		});
		if (phase === "need-auth") return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "dc-detail-preview-ardot-embed",
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "dc-detail-preview-ardot-embed__auth-slot",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "ardot-auth-modal detail-design-auth-overlay__modal",
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ArdotAuthContent, {
						onAuthorize: handleAuthorize,
						onCancel: handleAuthCancel
					})
				})
			})
		});
		if (phase === "auth-error") return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "dc-detail-preview-ardot-embed",
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "dc-detail-preview-ardot-embed__error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("p", { children: ["加载失败：", authErrorMessage ?? "未知错误"] }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
					type: "button",
					className: "dc-detail-primary-btn",
					onClick: () => {
						setAuthErrorMessage(null);
						setPhase("checking");
						checkAuth().then((result) => {
							if (disposedRef.current) return;
							setPhase(result.status === "connected" ? "ready" : "need-auth");
						}).catch((err) => {
							if (disposedRef.current) return;
							setAuthErrorMessage(String(err));
							setPhase("auth-error");
						});
					},
					children: "重试"
				})]
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "dc-detail-preview-ardot-embed",
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("iframe", {
				ref: iframeRef,
				src,
				title,
				sandbox: "allow-scripts allow-popups allow-same-origin allow-forms",
				allow: "fullscreen; clipboard-write",
				referrerPolicy: "no-referrer"
			})
		});
	};
})), import_jsx_runtime$7, PreviewLink;
var init_preview_link = __esmMin((() => {
	require_react();
	init_ardot_canvas();
	init_preview_ardot_embed();
	import_jsx_runtime$7 = require_jsx_runtime();
	PreviewLink = ({ src, title, onRequestEnlarge }) => {
		if (isArdotEmbedUrl(src)) return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(PreviewArdotEmbed, {
			src,
			title,
			onRequestEnlarge
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "dc-detail-preview-link",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("iframe", {
				src,
				title,
				sandbox: "allow-scripts allow-popups",
				allow: "fullscreen",
				referrerPolicy: "no-referrer"
			})
		});
	};
})), import_jsx_runtime$6, PreviewLoading;
var init_preview_loading = __esmMin((() => {
	require_react();
	import_jsx_runtime$6 = require_jsx_runtime();
	PreviewLoading = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
		className: "dc-detail-preview-loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: "dc-spinner" })
	});
})), import_jsx_runtime$5, PreviewMarkdown;
var init_preview_markdown = __esmMin((() => {
	init_src$1();
	require_react();
	import_jsx_runtime$5 = require_jsx_runtime();
	PreviewMarkdown = ({ content }) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
		className: "dc-detail-preview-markdown",
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(MarkdownViewer, {
			content,
			editable: false
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/case-detail-page/preview-ppt.tsx
var import_react$4, import_jsx_runtime$4, LazyPptxPreviewComponent, PreviewPpt;
var init_preview_ppt = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$4 = require_jsx_runtime();
	init_preload_helper();
	LazyPptxPreviewComponent = import_react$4.lazy(() => __vitePreload(() => import("./pptx-preview-component-Dj5gWOZp.js").then((m) => ({ default: m.PptxPreviewComponent })), __vite__mapDeps([12,1,2,3,4,5,13,6,7,14,8,15]), import.meta.url));
	PreviewPpt = ({ file }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		className: "dc-detail-preview-pptx",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(import_react$4.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "dc-detail-preview-pptx-content" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(LazyPptxPreviewComponent, {
				className: "dc-detail-preview-pptx-content",
				file,
				filename: file.name
			})
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/case-detail-page/preview-table.tsx
var import_react$3, import_jsx_runtime$3, LazySheetPreviewComponent, PreviewTable;
var init_preview_table = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$3 = require_jsx_runtime();
	init_preload_helper();
	LazySheetPreviewComponent = import_react$3.lazy(() => __vitePreload(() => import("./sheet-preview-component-DtiPBU6h.js").then((m) => ({ default: m.SheetPreviewComponent })), __vite__mapDeps([16,1,17,2,18,3,4,5,13,6,7,8,19]), import.meta.url));
	PreviewTable = ({ file }) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
		className: "dc-detail-preview-table",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_react$3.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(LazySheetPreviewComponent, {
				file,
				isLoading: false
			})
		})
	});
})), import_jsx_runtime$2, PreviewVideo;
var init_preview_video = __esmMin((() => {
	require_react();
	import_jsx_runtime$2 = require_jsx_runtime();
	PreviewVideo = ({ src, title }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "dc-detail-preview-video",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("video", {
			src,
			controls: true,
			preload: "metadata",
			title,
			children: title
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/case-detail-page/artifact-preview.tsx
var import_react$1, import_jsx_runtime$1, PreviewErrorBoundary, ArtifactPreview, ArtifactPreviewContent;
var init_artifact_preview = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_preview_code();
	init_preview_doc();
	init_preview_empty();
	init_preview_html();
	init_preview_image();
	init_preview_link();
	init_preview_loading();
	init_preview_markdown();
	init_preview_ppt();
	init_preview_table();
	init_preview_video();
	import_jsx_runtime$1 = require_jsx_runtime();
	PreviewErrorBoundary = class extends import_react$1.Component {
		constructor(props) {
			super(props);
			this.state = { hasError: false };
		}
		static getDerivedStateFromError() {
			return { hasError: true };
		}
		componentDidCatch(error) {
			console.warn("[ArtifactPreview] Render error caught:", error.message);
		}
		render() {
			if (this.state.hasError) return this.props.fallback;
			return this.props.children;
		}
	};
	ArtifactPreview = ({ loading, fileType, content, file, previewUrl, coverUrl, title, onRequestEnlarge }) => {
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewLoading, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewErrorBoundary, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewEmpty, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArtifactPreviewContent, {
				fileType,
				content,
				file,
				previewUrl,
				coverUrl,
				title,
				onRequestEnlarge
			})
		});
	};
	ArtifactPreviewContent = ({ fileType, content, file, previewUrl, coverUrl, title, onRequestEnlarge }) => {
		if (fileType === "md" && content) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewMarkdown, { content });
		if (fileType === "doc" && file) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewDoc, { file });
		if (fileType === "ppt" && file) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewPpt, { file });
		if (fileType === "html" && content && previewUrl) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewHtml, {
			previewUrl,
			content
		});
		if (fileType === "code" && content) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewCode, {
			content,
			previewUrl
		});
		if (fileType === "table" && file) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewTable, { file });
		if (fileType === "link" && previewUrl) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewLink, {
			src: previewUrl,
			title,
			onRequestEnlarge
		});
		if (fileType === "video" && previewUrl) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewVideo, {
			src: previewUrl,
			title
		});
		if (fileType === "image" && previewUrl) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewImage, {
			src: previewUrl,
			alt: title
		});
		if (coverUrl) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewImage, {
			src: coverUrl,
			alt: title
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewEmpty, {});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/case-detail-page/index.tsx
/** 判断预览路径是否有效 */
function hasPreview(preview) {
	return !!preview && preview.trim().length > 0;
}
var import_react, import_jsx_runtime, HeartIcon, LoadingSpinner, ExpandIcon, CollapseIcon, CloseIcon, SkillIcon, ExpertChipAvatar, CaseDetailPage;
var init_case_detail_page = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_foundation();
	init_useI18n();
	init_expert();
	init_visibility();
	init_telemetry_context();
	init_types();
	init_ardot_canvas();
	init_inline_svg_icon();
	init_scene_icon_map();
	init_hooks();
	init_types$1();
	init_utils();
	init_expert_confirm_dialogs();
	init_artifact_preview();
	import_jsx_runtime = require_jsx_runtime();
	HeartIcon = ({ filled }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: filled ? "currentColor" : "none",
		stroke: "currentColor",
		strokeWidth: filled ? 2.5 : 2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	LoadingSpinner = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dc-detail-page-loading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dc-spinner" })
	});
	ExpandIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.1",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 3h6v6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21H3v-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 3l-7 7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 21l7-7" })
		]
	});
	CollapseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 4l-6 6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 4v6h6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 20l6-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 20v-6H4" })
		]
	});
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18",
			strokeLinecap: "round"
		})]
	});
	SkillIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.425049 0.104736)",
			fillRule: "evenodd",
			d: "M4.0306 4.1098Q4.1558 4.1551 4.2224 4.1794Q5.0044 4.4651 5.728 4.8122L0.5162 10.024Q0 10.5402 0 11.2702Q0 12.0003 0.5162 12.5165Q1.0324 13.0327 1.7625 13.0327Q2.4925 13.0327 3.0087 12.5165L7.7388 7.7863L6.9963 7.0439L2.2662 11.774Q2.0576 11.9827 1.7625 11.9827Q1.4674 11.9827 1.2587 11.774Q1.05 11.5653 1.05 11.2702Q1.05 10.9751 1.2587 10.7665L6.7026 5.3225Q7.7534 5.9218 8.6659 6.6662Q10.7951 8.4034 11.5905 10.5029Q11.6626 10.7109 11.8659 10.7956Q12.0639 10.8917 12.2675 10.8078Q12.4198 10.7524 12.5112 10.6185Q12.606 10.4871 12.6064 10.325Q12.6522 7.3808 10.6818 4.6528Q8.7263 1.9456 5.4862 0.4301Q4.9608 0.1844 4.7432 0.1235Q4.3015 0 3.9285 0.1597Q3.5896 0.3049 3.3436 0.7445Q3.2271 0.9528 2.9959 1.5122L2.9945 1.5154Q2.9835 1.5421 2.9619 1.5943Q2.7173 2.1848 2.6584 2.4201Q2.5374 2.9037 2.7155 3.2731Q2.8728 3.5992 3.2862 3.8109Q3.4836 3.9119 4.0306 4.1098ZM9.3296 5.8527Q7.2758 4.177 4.5827 3.1932Q4.5145 3.1683 4.3877 3.1224Q3.6862 2.8686 3.6614 2.8171Q3.624 2.7397 3.932 1.996Q3.9537 1.9437 3.9648 1.9166L3.9662 1.9133Q4.2814 1.1508 4.3419 1.1249Q4.421 1.0911 5.0414 1.3812Q8.0346 2.7813 9.8306 5.2677Q10.6593 6.4149 11.0903 7.5952Q10.3461 6.6819 9.3296 5.8527ZM8.7773 9.2425C8.7137 9.0137 8.3821 9.0358 8.2721 9.276L7.7249 10.4718C7.6903 10.5472 7.6262 10.6089 7.55 10.6411L6.3395 11.1495C6.0967 11.2518 6.0639 11.5838 6.2894 11.6554L7.4138 12.0105C7.4848 12.0329 7.5371 12.0875 7.557 12.1594L7.8733 13.298C7.9368 13.5268 8.2684 13.5047 8.3784 13.2645L8.9257 12.0687C8.9603 11.9933 9.0243 11.9316 9.1005 11.8995L10.3102 11.391C10.5533 11.2888 10.5861 10.9565 10.3603 10.8852L9.2367 10.53C9.1658 10.5076 9.1136 10.4537 9.0935 10.382L8.7773 9.2425Z"
		})
	});
	ExpertChipAvatar = ({ avatarUrl, alt }) => {
		const { finalAvatarUrl, onAvatarError } = useExpertAvatar(avatarUrl);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "dc-detail-chip-avatar",
			src: finalAvatarUrl,
			alt,
			loading: "lazy",
			onError: onAvatarError
		});
	};
	CaseDetailPage = ({ caseId, isFavorite, onBack, onToggleFavorite, onLaunchSuccess, source = PlaybookCtaSource.Scene, position = 1, categories: categoriesList = [], searchKeyword }) => {
		const t = useTranslation();
		const locale = useLocale();
		const { account } = useAccount();
		const enterpriseId = account?.enterpriseId ?? "";
		const { reportEvent, Events } = useAgentTelemetry();
		const { detail, isLoading, error } = useCaseDetail(caseId);
		const { isLaunching, confirmDialog, errorDialog, launch, confirmContinue, confirmCancel, dismissError, teamSummonDialog, financeRiskDialog, setTeamSummonAcknowledged, confirmTeamSummon, cancelTeamSummon, setFinanceRiskAcknowledged, setFinanceRiskDontAskAgain, confirmFinanceRisk, cancelFinanceRisk } = usePlaybookLaunch();
		const [enlarged, setEnlarged] = (0, import_react.useState)(false);
		const rootRef = (0, import_react.useRef)(null);
		const previewRef = (0, import_react.useRef)(null);
		const resizeTimerRef = (0, import_react.useRef)(null);
		const hasAutoEnlargedRef = (0, import_react.useRef)(false);
		(0, import_react.useEffect)(() => () => {
			if (resizeTimerRef.current !== null) {
				window.clearTimeout(resizeTimerRef.current);
				resizeTimerRef.current = null;
			}
		}, []);
		const handleToggleEnlarged = (0, import_react.useCallback)(() => {
			const modalEl = rootRef.current?.closest(".dc-detail-modal") ?? null;
			modalEl?.classList.add("is-resizing");
			setEnlarged((prev) => !prev);
			if (resizeTimerRef.current !== null) window.clearTimeout(resizeTimerRef.current);
			resizeTimerRef.current = window.setTimeout(() => {
				modalEl?.classList.remove("is-resizing");
				resizeTimerRef.current = null;
			}, 200);
		}, []);
		const title = (0, import_react.useMemo)(() => getLocalizedField(detail?.title, detail?.title_en, locale, detail?.id ?? ""), [
			detail?.title,
			detail?.title_en,
			detail?.id,
			locale
		]);
		const description = (0, import_react.useMemo)(() => getLocalizedField(detail?.description ?? detail?.subtitle, detail?.description_en ?? detail?.subtitle_en, locale), [
			detail?.description,
			detail?.description_en,
			detail?.subtitle,
			detail?.subtitle_en,
			locale
		]);
		const coverUrl = (0, import_react.useMemo)(() => resolvePlaybookAssetUrl(detail?.cover_image, detail?.id ?? "", detail?.cover_mode), [detail]);
		const previewUrl = (0, import_react.useMemo)(() => {
			if (detail?.artifact_type === "link") {
				const url = detail.external_url || detail.artifacts?.[0]?.url || null;
				return url && /^https:\/\//i.test(url) ? url : null;
			}
			if (!hasPreview(detail?.preview)) return null;
			return resolvePlaybookAssetUrl(detail.preview, detail?.id ?? "");
		}, [detail]);
		(0, import_react.useEffect)(() => {
			if (hasAutoEnlargedRef.current) return;
			if (!previewUrl) return;
			if (!isArdotEmbedUrl(previewUrl)) return;
			hasAutoEnlargedRef.current = true;
			setEnlarged(true);
		}, [previewUrl]);
		const previewFileType = detail?.artifact_type ?? PlaybookArtifactType.Other;
		const { details: summonedExperts, pendingIds: pendingExpertIds } = useCaseExpertsDetails(detail?.experts, "builtin");
		const visibleExperts = (0, import_react.useMemo)(() => (detail?.experts ?? []).filter((expert) => isExpertVisibleForEnterpriseId(expert, enterpriseId)).map((expert) => {
			const summoned = summonedExperts[expert.id];
			const summonedName = typeof summoned?.name === "string" ? summoned.name : summoned?.name ? locale === "en" ? summoned.name.en ?? summoned.name.zh : summoned.name.zh ?? summoned.name.en : void 0;
			return {
				...expert,
				avatarUrl: summoned?.avatarUrl ?? "",
				profession: summoned?.profession,
				summonedName,
				isPending: pendingExpertIds.has(expert.id)
			};
		}), [
			summonedExperts,
			pendingExpertIds,
			detail?.experts,
			enterpriseId,
			locale
		]);
		const [previewContent, setPreviewContent] = (0, import_react.useState)(null);
		const [previewFile, setPreviewFile] = (0, import_react.useState)(null);
		const isOnLightBg = usePreviewOnLightBg(previewRef, [
			previewFileType,
			previewContent,
			previewFile,
			enlarged
		]);
		const [previewLoading, setPreviewLoading] = (0, import_react.useState)(false);
		(0, import_react.useEffect)(() => {
			if (!previewUrl || previewFileType === "image" || previewFileType === "video" || previewFileType === "link") {
				setPreviewContent(null);
				setPreviewFile(null);
				return;
			}
			let cancelled = false;
			setPreviewLoading(true);
			setPreviewContent(null);
			setPreviewFile(null);
			if (previewFileType === "ppt" || previewFileType === "doc") {
				const isDoc = previewFileType === "doc";
				const mimeType = isDoc ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/vnd.openxmlformats-officedocument.presentationml.presentation";
				const fallbackName = isDoc ? "output.docx" : "output.pptx";
				fetch(previewUrl).then((res) => {
					if (!res.ok) throw new Error(`${res.status}`);
					return res.blob();
				}).then((blob) => {
					if (!cancelled) {
						const fileName = previewUrl.split("/").pop() || fallbackName;
						setPreviewFile(new File([blob], fileName, { type: mimeType }));
					}
				}).catch((err) => {
					console.warn(`[CaseDetailPage] Failed to fetch ${isDoc ? "docx" : "pptx"} preview:`, err);
				}).finally(() => {
					if (!cancelled) setPreviewLoading(false);
				});
			} else if (previewFileType === "table") fetch(previewUrl).then((res) => {
				if (!res.ok) throw new Error(`${res.status}`);
				return res.blob();
			}).then((blob) => {
				if (!cancelled) {
					const fileName = previewUrl.split("/").pop() || "spreadsheet.xlsx";
					setPreviewFile(new File([blob], fileName, { type: blob.type }));
				}
			}).catch((err) => {
				console.warn("[CaseDetailPage] Failed to fetch table preview:", err);
			}).finally(() => {
				if (!cancelled) setPreviewLoading(false);
			});
			else fetch(previewUrl).then((res) => {
				if (!res.ok) throw new Error(`${res.status}`);
				return res.text();
			}).then((text) => {
				if (!cancelled) setPreviewContent(text);
			}).catch((err) => {
				console.warn("[CaseDetailPage] Failed to fetch preview:", err);
			}).finally(() => {
				if (!cancelled) setPreviewLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [previewUrl, previewFileType]);
		const handleFavoriteClick = (0, import_react.useCallback)(() => {
			onToggleFavorite(caseId, PlaybookCtaSource.Detail);
		}, [caseId, onToggleFavorite]);
		const handleLaunch = (0, import_react.useCallback)(async () => {
			if (!detail) return;
			reportEvent(Events.WebElementClick, {
				pageName: "playbook_detail",
				elementId: "playbook_ctaClick",
				elementName: detail.title,
				source
			});
			const skills = (detail.skills ?? []).map((s) => s.id).join(",");
			const skillNames = (detail.skills ?? []).map((s) => s.name).join(",");
			const expert = visibleExperts[0];
			const categoryId = detail.categories?.[0] ?? "";
			const categoryName = categoriesList.find((c) => c.id === categoryId)?.name ?? "";
			reportEvent(Events.PlaybookCtaClick, {
				id: detail.id,
				name: detail.title,
				type: detail.artifact_type,
				categoryId,
				categoryName,
				skills,
				skillNames,
				expertId: expert?.id,
				expertName: expert?.name,
				source,
				position
			});
			if (await launch({
				caseDetail: {
					...detail,
					experts: visibleExperts
				},
				source,
				categories: categoriesList,
				searchKeyword
			})) onLaunchSuccess?.();
		}, [
			detail,
			launch,
			onLaunchSuccess,
			reportEvent,
			Events,
			source,
			position,
			visibleExperts,
			categoriesList,
			searchKeyword
		]);
		const renderPrimaryAction = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"data-track-id": "explore_remix_click",
			"data-track-name": "制作我的版本",
			"data-track-props": JSON.stringify({
				source: caseId,
				type: "remix"
			}),
			className: `dc-detail-primary-btn${isOnLightBg ? " is-on-light" : ""}`,
			onClick: handleLaunch,
			disabled: isLaunching,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("discover.createMine") }), isLaunching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dc-spinner",
				style: {
					width: 12,
					height: 12,
					borderWidth: 2
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					transform: "matrix(1 0 0 1 2.57586 2.39996)",
					fillRule: "evenodd",
					d: "M9.8242 6.6001L9.8242 5.109Q9.8243 3.305 9.7462 2.7323Q9.7081 2.4537 9.6375 2.2354L0.8485 11.0243L0 10.1758L8.789 1.3868Q8.5706 1.3162 8.292 1.2782Q7.7193 1.2 5.9153 1.2001L4.4243 1.2001L4.4243 0L5.9152 0Q7.8008 -0 8.4543 0.0892Q9.5761 0.2423 10.179 0.8453Q10.782 1.4482 10.9351 2.57Q11.0243 3.2235 11.0243 5.1091L11.0243 6.6001L9.8242 6.6001Z"
				})
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: rootRef,
			className: `dc-detail-page ${enlarged ? "is-enlarged" : ""}`.trim(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dc-detail-page-content",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, {}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dc-detail-page-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("discover.loadDetailFailed") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onBack,
							children: t("discover.backToDiscover")
						})]
					}) : detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dc-detail-modal-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `dc-detail-modal-close${isOnLightBg ? " is-on-light" : ""}`,
								onClick: onBack,
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dc-detail-modal-text",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "dc-detail-modal-title-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "dc-detail-modal-title",
											children: title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: `dc-detail-favorite ${isFavorite ? "is-active" : ""}`.trim(),
											onClick: handleFavoriteClick,
											"aria-label": isFavorite ? t("discover.removeFavorite") : t("discover.addFavorite"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartIcon, { filled: isFavorite })
										})]
									}),
									description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: description,
										maxWidth: 360,
										textAlign: "left",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "dc-detail-modal-subtitle",
											children: description
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "dc-detail-modal-chips",
										children: [
											detail.scenario_use && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "dc-detail-chip",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "dc-detail-chip-type dc-detail-chip-type-icon",
													"aria-label": t("discover.tagScenario"),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSvgIcon, {
														svg: getSceneIcon(detail.scenario_use),
														label: detail.scenario_use
													})
												}), detail.scenario_use]
											}),
											detail.skills?.map((skill) => {
												const skillName = getLocalizedField(skill.name, skill.name_en, locale);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "dc-detail-chip is-clickable",
													onClick: () => {
														reportEvent(Events.WebElementClick, {
															pageName: "playbook_detail",
															elementId: "playbook_skillClick",
															elementName: skillName,
															source: PlaybookCtaSource.Detail
														});
													},
													"data-track-id": "explore_skill_card_click",
													"data-track-name": "探索Skill卡片",
													"data-track-props": JSON.stringify({
														source: skill.id,
														type: "skill"
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "dc-detail-chip-type dc-detail-chip-type-icon",
														"aria-label": t("discover.tagSkill"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillIcon, {})
													}), skillName]
												}, skill.id);
											}),
											visibleExperts.map((expert) => {
												if (expert.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "dc-detail-chip dc-detail-chip-skeleton",
													"aria-label": t("discover.tagExpert"),
													"aria-busy": "true",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dc-detail-chip-skeleton-avatar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dc-detail-chip-skeleton-text" })]
												}, expert.id);
												const rawName = getLocalizedField(expert.name, expert.name_en, locale);
												const prof = expert.profession;
												const expertName = (typeof prof === "string" ? prof : prof ? locale === "en" ? prof.en ?? prof.zh ?? "" : prof.zh ?? prof.en ?? "" : "").trim() || expert.summonedName?.trim() || rawName;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "dc-detail-chip is-clickable",
													onClick: () => {
														reportEvent(Events.WebElementClick, {
															pageName: "playbook_detail",
															elementId: "playbook_expertClick",
															elementName: expertName,
															source: PlaybookCtaSource.Detail
														});
													},
													"data-track-id": "explore_expert_card_click",
													"data-track-name": "探索专家卡片",
													"data-track-props": JSON.stringify({
														source: expert.id,
														type: "expert"
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "dc-detail-chip-type dc-detail-chip-type-icon",
														"aria-label": t("discover.tagExpert"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertChipAvatar, {
															avatarUrl: expert.avatarUrl,
															alt: expertName
														})
													}), expertName]
												}, expert.id);
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dc-detail-modal-preview",
								ref: previewRef,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactPreview, {
									loading: previewLoading,
									fileType: previewFileType,
									content: previewContent,
									file: previewFile,
									previewUrl,
									coverUrl,
									title,
									onRequestEnlarge: () => setEnlarged(true)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: enlarged ? t("discover.collapsePanel") : t("discover.detailPanel"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `dc-detail-preview-toggle${isOnLightBg ? " is-on-light" : ""}`,
										onClick: handleToggleEnlarged,
										"aria-label": enlarged ? t("discover.collapsePanel") : t("discover.detailPanel"),
										children: enlarged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapseIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandIcon, {})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dc-detail-modal-footer",
								children: renderPrimaryAction()
							})
						]
					}) : null
				}),
				confirmDialog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dc-confirm-backdrop",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dc-confirm-dialog",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "dc-confirm-title",
								children: confirmDialog.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dc-confirm-desc",
								children: confirmDialog.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dc-confirm-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dc-confirm-cancel-btn",
									onClick: confirmCancel,
									children: t("common.cancel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dc-confirm-continue-btn",
									onClick: confirmContinue,
									children: t("discover.confirm.continue")
								})]
							})
						]
					})
				}),
				errorDialog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dc-confirm-backdrop",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dc-confirm-dialog",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "dc-confirm-title",
								children: t("discover.launchFailed")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "dc-confirm-desc",
								children: errorDialog.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dc-confirm-actions",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "dc-confirm-continue-btn",
									onClick: dismissError,
									children: t("common.confirm")
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertConfirmDialogs, {
					teamSummonDialog,
					financeRiskDialog,
					setTeamSummonAcknowledged,
					confirmTeamSummon,
					cancelTeamSummon,
					setFinanceRiskAcknowledged,
					setFinanceRiskDontAskAgain,
					confirmFinanceRisk,
					cancelFinanceRisk
				})
			]
		});
	};
}));
//#endregion
export { getSceneIcon as a, init_inline_svg_icon as c, init_use_discover as d, useDiscover as f, init_discover_panel as i, init_use_favorites as l, useLocale as m, init_case_detail_page as n, init_scene_icon_map as o, init_use_locale as p, init_hooks as r, InlineSvgIcon as s, CaseDetailPage as t, useFavorites as u };
