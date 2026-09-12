const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./services-_SA1yO2s.js","./chunk-BRZcfu7K.js","./preload-helper-E3UYCQGP.js","./src-DRGoWjIu.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./resize-observer-QOR-7G1T.js","./wasm-C4lriWle.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./classnames-BYn3_ESJ.js","./decode-HthuYB5G.js","./index.dom-Hjybw7gi.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./hast-util-whitespace-C3G7AbkX.js","./katex-sFwAzkhG.js","./lodash-D1c13HHR.js","./merge-CDI2sNhv.js","./throttle-mAPE4S6V.js","./isObjectLike-Dan5H4Gd.js","./isSymbol-DlS8bGaY.js","./lucide-react-CmX0JwWL.js","./client-BPkZUIji.js","./jsx-runtime-BNEdAQtr.js","./dist-CSHw4oQX.js","./i18n-DH8xcldp.js","./chevron-down-icon-Bs9CIPFg.js","./copied-icon-Cvsbo-xy.js","./copy-icon-BUIWKTIn.js","./edit-icon-9Lcq4c36.js","./src-D47LCgt5.css","./useI18n-DDytAo7_.js","./i18n-Bt_Wap4p.js","./environment-DKqg3f0G.js","./module-host-context-CI9spvhq.js","./skill-import-errors-BlMOiDaZ.js","./_esm5-RYAsZ7Wr.js","./common-Czfscgga.js","./context-2xODbZdo.js","./types-B5gc2qW1.js","./skill-picker-CDxpsgKb.js","./agent-mail-CiuzbR2o.js","./zustand-BGHu9tpa.js","./vanilla-BfruURAe.js","./common-CwB_VqKR.js","./dist-DNjXzICC.js","./dist-BlOCCi14.js","./purify.es-Buzz9Dxi.js","./message-converter-CCG28Swi.js","./chat-types-BMkaZPiE.js","./foundation-QOglV606.js","./icons-Cj3UopO9.js","./ArtifactFileIconTypes-mWPconF_.js","./icons-CmEjl25S.css","./floating-1_OFz6f-.js","./foundation-DhkLbEzB.css","./chat-types-CptmOga7.css","./router-O5ZnP5xt.js","./app-core-0tGlBWei.js","./contexts-D7XKqa2J.js","./adapter-context-DGaRYQ5R.js","./ima-api-context-C8-EzcEu.js","./file-path-DzzGeaqx.js","./http-logger-BE9rNaof.js","./useTheme-KZ-Qaric.js","./header-icon-dark-DmGJ_Yaj.js","./user-menu-avatar-DZ2_gXGP.js","./wechatmp-qr-code-Cy7xHDnU.js","./oauth-callback-IQ0UCaVX.js","./oauth-callback-BETV_lnd.css","./use-login-error-handler-CyOZrL-F.js","./login-error-parser-D0A9vxdd.js","./FeedbackModal-COJnZocZ.js","./FeedbackModal-D1iC5KWj.css","./product-features-N4Z0q4SS.js","./storage-upgrade-entry-snapshot-BgU4-HWF.js","./ima-auth-store-Cq8i4JCG.js","./SlotConfigProvider-NQm4Ut9L.js","./account-BDHahT9K.js","./ardot-canvas-BbVvf1Ta.js","./route-path-tracker-D4O9Dve0.js","./artifact-drag-Dlide0j-.js","./agent-mail-DaA1SKc5.css","./skill-card-BX-gt0I0.js","./SkillAvatar-CEySvDFr.js","./skills-DApVmNog.js","./skills-D6W5wmwH.css","./skill-picker-CGgsnR8p.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { m as getBuiltinMarketSkillId, n as init_common } from "./common-CwB_VqKR.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { o as writeRendererLog, t as init_http_logger } from "./http-logger-BE9rNaof.js";
import { n as useI18n, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { n as isIOAUser, t as init_account } from "./account-BDHahT9K.js";
import { t as init_common$1 } from "./common-Czfscgga.js";
import { a as useOptionalModuleHost } from "./module-host-context-CI9spvhq.js";
import { b as skillsUpdateBadgeRefresh$, c as init_use_high_risk_notification, i as init_use_scan_result_subscription, m as init_extension_refresh_events, n as init_skill_import_errors, s as init_async_security_scan_service, u as init_high_risk_notification_store } from "./skill-import-errors-BlMOiDaZ.js";
//#region ../../packages/agent-ui/src/modules/skills/definition.ts
var import_react$7, LazySkillsServices, skillsModule;
var init_definition = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_preload_helper();
	LazySkillsServices = import_react$7.lazy(() => __vitePreload(() => import("./services-_SA1yO2s.js").then((m) => ({ default: m.SkillsServices })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]), import.meta.url));
	skillsModule = {
		id: "skills",
		name: "技能中心",
		facadeKey: "personalSkills",
		contributions: {
			services: LazySkillsServices,
			pickers: [{
				id: "skills.pick",
				label: "选择技能",
				description: "从已安装技能中选择",
				component: import_react$7.lazy(() => __vitePreload(() => import("./skill-picker-CDxpsgKb.js"), __vite__mapDeps([42,1,43,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,38,44,45,46,47,48,49,50,51,52,53,54,55,56,34,35,33,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,41,39,36,37,79,80,81,82,83,84,85,86,87,88,40,89]), import.meta.url))
			}]
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/local-cache.ts
/**
* Local-first localStorage cache utilities
* Shared by plugins-panel and skills-panel for stale-while-revalidate pattern
*/
function readCache(key) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function writeCache(key, data) {
	const doWrite = () => {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch {}
	};
	if (typeof requestIdleCallback === "function") requestIdleCallback(doWrite);
	else setTimeout(doWrite, 0);
}
/**
* Synchronous write to localStorage.
*
* Use this instead of writeCache when the caller dispatches an event
* immediately after writing and listeners need to read the updated value
* in the same tick (e.g. keyboard shortcut overrides).
*
* @returns true if the write succeeded, false if it failed (e.g. quota exceeded)
*/
function writeCacheSync(key, data) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
		return true;
	} catch {
		return false;
	}
}
var init_local_cache = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-auto-update-preference.ts
function useAutoUpdatePreference() {
	const [autoUpdateEnabled, setAutoUpdateEnabled] = (0, import_react$6.useState)(() => readCache("skills_auto_update_enabled") ?? true);
	(0, import_react$6.useEffect)(() => {
		const handleChange = (event) => {
			const detail = event.detail;
			if (typeof detail?.enabled === "boolean") {
				setAutoUpdateEnabled(detail.enabled);
				return;
			}
			setAutoUpdateEnabled(readCache("skills_auto_update_enabled") ?? true);
		};
		window.addEventListener(SKILLS_AUTO_UPDATE_CHANGE_EVENT, handleChange);
		return () => {
			window.removeEventListener(SKILLS_AUTO_UPDATE_CHANGE_EVENT, handleChange);
		};
	}, []);
	return {
		autoUpdateEnabled,
		toggleAutoUpdate: (0, import_react$6.useCallback)((enabled) => {
			setAutoUpdateEnabled(enabled);
			try {
				localStorage.setItem(SKILLS_AUTO_UPDATE_KEY, JSON.stringify(enabled));
			} catch {}
			window.dispatchEvent(new CustomEvent(SKILLS_AUTO_UPDATE_CHANGE_EVENT, { detail: { enabled } }));
		}, [])
	};
}
var import_react$6, SKILLS_AUTO_UPDATE_KEY, SKILLS_AUTO_UPDATE_CHANGE_EVENT;
var init_use_auto_update_preference = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_local_cache();
	SKILLS_AUTO_UPDATE_KEY = "skills_auto_update_enabled";
	SKILLS_AUTO_UPDATE_CHANGE_EVENT = "skills-auto-update-change";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/warning-cat.png
var warning_cat_default;
var init_warning_cat = __esmMin((() => {
	warning_cat_default = "" + new URL("warning-cat-CfinI6Uh.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/use-cb-banner.tsx
/**
* 全局 Banner Hook
* 任何组件都可以调用此 hook 来显示/修改 banner
*/
function useCBBanner(onOpenExternalLink, currentAccountKey) {
	const bannerState = (0, import_react$5.useSyncExternalStore)(bannerStore.subscribe, bannerStore.getSnapshot, bannerStore.getSnapshot);
	const setBannerConfig = (0, import_react$5.useCallback)((config) => {
		bannerStore.updateBanner(config);
	}, []);
	const showBanner = setBannerConfig;
	const clearBanner = (0, import_react$5.useCallback)((type, except) => {
		bannerStore.clearBanner(type, except);
	}, []);
	(0, import_react$5.useEffect)(() => {
		if (currentAccountKey === void 0) return;
		if (bannerState?.accountKey && bannerState.accountKey !== currentAccountKey) bannerStore.clearBanner();
	}, [bannerState?.accountKey, currentAccountKey]);
	const createBannerConfig = (0, import_react$5.useCallback)((config) => {
		const variant = config.variant || "info";
		const imageSrc = getDecorativeImageByVariant(variant);
		return {
			variant,
			message: config.message,
			actions: config.actions,
			dismissible: config.dismissible !== void 0 ? config.dismissible : true,
			decorativeImage: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageSrc,
				alt: ""
			})
		};
	}, []);
	return {
		bannerConfig: (0, import_react$5.useMemo)(() => {
			if (!bannerState) return;
			if (currentAccountKey !== void 0 && bannerState.accountKey && bannerState.accountKey !== currentAccountKey) return;
			if (import_react$5.isValidElement(bannerState.message)) return bannerState.message;
			const variant = bannerState.variant || "info";
			const decorativeImage = bannerState.decorativeImage || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: getDecorativeImageByVariant(variant),
				alt: ""
			});
			return {
				variant,
				message: bannerState.message,
				actions: bannerState.actions,
				dismissible: bannerState.dismissible !== void 0 ? bannerState.dismissible : true,
				onDismiss: bannerState.onDismiss,
				decorativeImage,
				type: bannerState.type,
				onLinkClick: onOpenExternalLink
			};
		}, [
			bannerState,
			currentAccountKey,
			onOpenExternalLink
		]),
		showBanner,
		setBannerConfig,
		clearBanner,
		createBannerConfig
	};
}
var import_react$5, import_jsx_runtime, franticCatImage, staringCatImage, BannerType, getDecorativeImageByVariant, BannerStore, bannerStore;
var init_use_cb_banner = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_warning_cat();
	import_jsx_runtime = require_jsx_runtime();
	franticCatImage = warning_cat_default;
	staringCatImage = warning_cat_default;
	BannerType = /* @__PURE__ */ function(BannerType) {
		/** 计费相关（周期性 billing 通知） */
		BannerType["Billing"] = "billing";
		/** Credit 购买引导（错误码触发，不受 billing 通知生命周期影响） */
		BannerType["CreditPurchase"] = "creditPurchase";
		/** 敏感词警告 */
		BannerType["SensitiveWord"] = "sensitiveWord";
		/** 图片不支持警告 */
		BannerType["ImageNotSupported"] = "imageNotSupported";
		/** 错误提示 */
		BannerType["Error"] = "error";
		/** 通用类型 */
		BannerType["General"] = "general";
		return BannerType;
	}({});
	getDecorativeImageByVariant = (variant) => {
		switch (variant) {
			case "error": return franticCatImage;
			case "warning": return warning_cat_default;
			case "success": return staringCatImage;
			default: return staringCatImage;
		}
	};
	BannerStore = class {
		constructor() {
			this.state = null;
			this.listeners = /* @__PURE__ */ new Set();
			this.subscribe = (listener) => {
				this.listeners.add(listener);
				return () => this.listeners.delete(listener);
			};
			this.getSnapshot = () => this.state;
			this.setState = (newState) => {
				this.state = newState;
				this.listeners.forEach((listener) => listener());
			};
			this.updateBanner = (config) => {
				this.setState({
					variant: config.variant || "info",
					message: config.message,
					type: config.type || BannerType.General,
					accountKey: config.accountKey,
					actions: config.actions,
					dismissible: config.dismissible !== void 0 ? config.dismissible : true,
					onDismiss: config.onDismiss ?? (() => {
						this.clearBanner();
					}),
					decorativeImage: config.decorativeImage
				});
			};
			this.clearBanner = (type, except) => {
				const currentType = this.state?.type;
				if (currentType && except?.includes(currentType)) return;
				if (!type || currentType === type) this.setState(null);
			};
		}
	};
	bannerStore = new BannerStore();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/types.ts
/**
* 将任意值强制转换为可安全渲染的字符串。
* 处理 YAML frontmatter 解析异常场景：当字段被写成方括号 / 多层 mapping 时，
* 解析器会返回对象或数组而非字符串。直接把对象塞给 React 子节点会抛
* "Objects are not valid as a React child"。此函数统一兜底。
*/
function coerceSkillText(value) {
	if (value == null) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	try {
		return JSON.stringify(value);
	} catch {
		return "";
	}
}
function normalizeSkill(raw) {
	const content = raw.content;
	const rawWithExtras = raw;
	return {
		...raw,
		name: coerceSkillText(raw.name),
		description: coerceSkillText(raw.description),
		description_zh: rawWithExtras.description_zh !== void 0 ? coerceSkillText(rawWithExtras.description_zh) : void 0,
		description_en: rawWithExtras.description_en !== void 0 ? coerceSkillText(rawWithExtras.description_en) : void 0,
		content,
		disable: !!raw.disable,
		installedAt: raw.installedAt
	};
}
function getLocalizedDescription(skill) {
	if (skill.description) return coerceSkillText(skill.description);
	const locale = getLocale();
	if (locale === "en" && skill.description_en) return coerceSkillText(skill.description_en);
	if (locale !== "en" && skill.description_zh) return coerceSkillText(skill.description_zh);
	return "";
}
function buildFallbackSkillMarkdown(skill) {
	const desc = getLocalizedDescription(skill);
	return `---\nname: ${skill.name}\ndescription: ${desc}\nsource: ${skill.source}\n---\n\n# ${skill.name}\n\n${desc}`;
}
/** 用 skill 元信息构造 YAML frontmatter，与后端返回的正文拼接。若内容已包含 frontmatter 则直接返回 */
function buildSkillMarkdownWithMeta(skill, bodyContent) {
	if (/^---\r?\n/.test(bodyContent)) return bodyContent;
	const entries = [];
	if (skill.name) entries.push(`name: ${skill.name}`);
	const desc = getLocalizedDescription(skill);
	if (desc) entries.push(`description: ${desc}`);
	if (skill.source) entries.push(`source: ${skill.source}`);
	if (skill.version) entries.push(`version: ${skill.version}`);
	if (skill.license) entries.push(`license: ${skill.license}`);
	if (entries.length === 0) return bodyContent;
	return `---\n${entries.join("\n")}\n---\n\n${bodyContent}`;
}
/** 解析 markdown 的 YAML frontmatter，返回属性对和剩余正文 */
function parseFrontmatter(markdown) {
	const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return {
		meta: {},
		body: markdown
	};
	const meta = {};
	for (const line of match[1].split("\n")) {
		const idx = line.indexOf(":");
		if (idx > 0) {
			const key = line.slice(0, idx).trim();
			const value = line.slice(idx + 1).trim();
			if (key && value) meta[key] = value;
		}
	}
	return {
		meta,
		body: match[2]
	};
}
function formatNumber(n) {
	if (n >= 1e4) return `${(n / 1e3).toFixed(0)}k`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
	return String(n);
}
function pickLocalizedExamples(skill) {
	if (!skill) return;
	const isEn = getLocale() === "en";
	const primary = isEn ? skill.examples_en : skill.examples_zh;
	const fallback = isEn ? skill.examples_zh : skill.examples_en;
	const sanitize = (arr) => {
		if (!Array.isArray(arr)) return;
		const filtered = arr.filter((s) => typeof s === "string" && s.trim().length > 0);
		return filtered.length > 0 ? filtered : void 0;
	};
	return sanitize(primary) ?? sanitize(fallback);
}
/**
* 从 SKILL.md 全文的 YAML frontmatter 中提取 examples_zh / examples_en。
* 用于「去试试」场景：installed skill 的 list API 不返回 examples 时，
* 从已加载的 skillDetailMarkdown 兜底提取。
*/
function extractExamplesFromMarkdown(markdown) {
	const fmMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!fmMatch) return {};
	const yaml = fmMatch[1];
	const result = {};
	for (const key of ["examples_zh", "examples_en"]) {
		const pattern = new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.*\\n?)*)`, "m");
		const match = yaml.match(pattern);
		if (match) {
			const items = match[1].split("\n").map((line) => line.replace(/^\s+-\s+/, "").trim()).filter((s) => s.length > 0).map((s) => s.replace(/^(['"])(.*)\1$/, "$2"));
			if (items.length > 0) result[key] = items;
		}
	}
	return result;
}
var SKILLS_CACHE_KEY_INSTALLED, SKILLS_CACHE_KEY_RECOMMENDED, SKILLS_CACHE_KEY_BUILTIN_MARKET, SKILLS_CACHE_KEY_FEATURED, SKILLS_CACHE_KEY_FEATURED_TS, SKILLHUB_CACHE_KEY_CATEGORIES, SKILLHUB_CATEGORIES_TTL, FEATURED_CACHE_TTL, PLUGINS_CACHE_KEY_INSTALLED, SKILLS_WARNING_DISMISSED_KEY, SORT_OPTIONS;
var init_types = __esmMin((() => {
	init_i18n();
	SKILLS_CACHE_KEY_INSTALLED = "skills-cache-installed";
	SKILLS_CACHE_KEY_RECOMMENDED = "skills-cache-recommended";
	SKILLS_CACHE_KEY_BUILTIN_MARKET = "skills-cache-builtin-market";
	SKILLS_CACHE_KEY_FEATURED = "skills-cache-featured";
	SKILLS_CACHE_KEY_FEATURED_TS = "skills-cache-featured-ts";
	SKILLHUB_CACHE_KEY_CATEGORIES = "skillhub-cache-categories";
	SKILLHUB_CATEGORIES_TTL = 1440 * 60 * 1e3;
	FEATURED_CACHE_TTL = 300 * 1e3;
	PLUGINS_CACHE_KEY_INSTALLED = "plugins-cache-installed-skills-tab";
	SKILLS_WARNING_DISMISSED_KEY = "skills-warning-dismissed";
	SORT_OPTIONS = [
		{
			value: "score",
			labelKey: "skills.skillhub.sort.score"
		},
		{
			value: "downloads",
			labelKey: "skills.skillhub.sort.downloads"
		},
		{
			value: "updated_at",
			labelKey: "skills.skillhub.sort.updated_at"
		},
		{
			value: "installs",
			labelKey: "skills.skillhub.sort.installs"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-skills-count-banner.ts
function isWarningDismissed() {
	try {
		return localStorage.getItem(SKILLS_WARNING_DISMISSED_KEY) === "1";
	} catch {
		return false;
	}
}
function setWarningDismissed(dismissed) {
	try {
		if (dismissed) localStorage.setItem(SKILLS_WARNING_DISMISSED_KEY, "1");
		else localStorage.removeItem(SKILLS_WARNING_DISMISSED_KEY);
	} catch {}
}
function getEnabledCount() {
	const cachedSkills = readCache("skills-cache-installed") || [];
	const cachedPlugins = readCache("plugins-cache-installed-skills-tab") || [];
	return cachedSkills.filter((s) => !s.disable).length + cachedPlugins.filter((p) => {
		if (p.installedScopesStatus) return !Object.values(p.installedScopesStatus).every((status) => status === false);
		return p.status !== "disabled";
	}).length;
}
/**
* Returns a callback that checks enabled skills count and shows a CB Banner
* warning if count > threshold. Only triggers for new conversations (no existing messages).
*/
function useSkillsCountBanner(t) {
	const { showBanner, clearBanner } = useCBBanner();
	const host = useOptionalModuleHost();
	return { checkAndShowSkillsBanner: (0, import_react$4.useCallback)((isNewConversation) => {
		if (!isNewConversation) return;
		if (getEnabledCount() <= 80) {
			setWarningDismissed(false);
			return;
		}
		if (isWarningDismissed()) return;
		showBanner({
			variant: "warning",
			message: t("skills.enabledWarning"),
			type: BannerType.General,
			actions: [{
				label: t("skills.enabledWarning.manage"),
				onClick: (e) => {
					e.preventDefault();
					host?.navigation.navigate("/skills");
				}
			}, {
				label: t("skills.enabledWarning.dismiss"),
				onClick: (e) => {
					e.preventDefault();
					setWarningDismissed(true);
					clearBanner(BannerType.General);
				}
			}],
			dismissible: true,
			onDismiss: () => {
				clearBanner(BannerType.General);
			}
		});
	}, [
		showBanner,
		clearBanner,
		host,
		t
	]) };
}
var import_react$4;
var init_use_skills_count_banner = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_use_cb_banner();
	init_local_cache();
	init_common$1();
	init_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/skills-utils.ts
function getDesktopFilePath(file) {
	if (typeof window === "undefined") return;
	if (typeof window.vscode?.webUtils?.getPathForFile === "function") try {
		return window.vscode.webUtils.getPathForFile(file) || void 0;
	} catch {
		return;
	}
}
/**
* 安全获取 File 对象的绝对路径（内联自 cb-chat-ui/src/utils/electron-utils.ts）
* 在 Electron 新版本中，File.path 已废弃，需使用 vscode.webUtils.getPathForFile
*/
function getFilePathSafe(file) {
	const desktopPath = getDesktopFilePath(file);
	if (desktopPath) return desktopPath;
	return file.path || void 0;
}
/** 返回今日 YYYY-MM-DD（按本地时区计算）。 */
function getTodayDateString() {
	const today = /* @__PURE__ */ new Date();
	return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}
/** 标记当天已点击过左侧专家入口。 */
function markExpertsEntryClickedToday() {
	try {
		localStorage.setItem(SKILLS_EXPERTS_ENTRY_CLICKED_DATE_KEY, getTodayDateString());
	} catch {}
}
/**
* 比较版本号，判断 remote 是否比 local 更新。
*
* 防御性处理（issue #52822）：
*  - 完全相同的版本串直接返回 false，避免任何非语义化版本格式产生误判；
*  - 非数字段（如 'latest'、含字母的预发布串）经 Number() 得到 NaN，统一兜底为 0，
*    避免 NaN 比较的歧义把残缺版本误判为「更新」。
*/
function isNewerVersion(remote, local) {
	if (remote === local) return false;
	const toNum = (v) => {
		const n = Number(v);
		return Number.isFinite(n) ? n : 0;
	};
	const rParts = remote.split(".").map(toNum);
	const lParts = local.split(".").map(toNum);
	for (let i = 0; i < Math.max(rParts.length, lParts.length); i++) {
		const r = rParts[i] ?? 0;
		const l = lParts[i] ?? 0;
		if (r > l) return true;
		if (r < l) return false;
	}
	return false;
}
/**
* Batch-check latest versions for a list of slugs by calling SkillHub detail API in parallel.
* Concurrency is capped to avoid overwhelming the server.
* Failures for individual slugs are silently ignored.
*
* 已迁移到 SkillsMarketplaceFacade（不再走老 adapter.getSkillHubDetail）。
*/
async function fetchLatestVersions(facade, slugs, concurrency = 5) {
	if (!facade) return {};
	const result = {};
	for (let i = 0; i < slugs.length; i += concurrency) {
		const batch = slugs.slice(i, i + concurrency);
		const settled = await Promise.all(batch.map((slug) => facade.skillhub.getDetail(slug).then((detail) => ({
			slug,
			version: detail?.latestVersion?.version
		}), () => ({
			slug,
			version: void 0
		}))));
		for (const { slug, version } of settled) if (version) result[slug] = version;
	}
	return result;
}
var SKILLS_EXPERTS_ENTRY_CLICKED_DATE_KEY;
var init_skills_utils = __esmMin((() => {
	SKILLS_EXPERTS_ENTRY_CLICKED_DATE_KEY = "skills_experts_entry_clicked_date";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-skills-update-badge.ts
function useSkillsUpdateBadge({ marketplace, enterpriseSkillsFacade, enterpriseId, enabled, onBadgeVisibleChange, triggerKey, autoUpdateEnabled = true, onAutoUpdateCompleted }) {
	const onBadgeVisibleChangeRef = (0, import_react$3.useRef)(onBadgeVisibleChange);
	onBadgeVisibleChangeRef.current = onBadgeVisibleChange;
	const onAutoUpdateCompletedRef = (0, import_react$3.useRef)(onAutoUpdateCompleted);
	onAutoUpdateCompletedRef.current = onAutoUpdateCompleted;
	const autoUpdateEnabledRef = (0, import_react$3.useRef)(autoUpdateEnabled);
	autoUpdateEnabledRef.current = autoUpdateEnabled;
	(0, import_react$3.useEffect)(() => {
		if (!enabled || !marketplace) return;
		const cancelled = { current: false };
		/**
		* 检测所有数据源中的可更新 skill，返回详细列表。
		*/
		const detectUpdates = async () => {
			const updates = [];
			try {
				const metas = await marketplace.builtin.getInstalledMetas() ?? [];
				const ids = metas.map((m) => m.skillId).filter((v) => !!v);
				if (ids.length > 0) {
					const res = await marketplace.builtin.getByIds(ids);
					if (cancelled.current) return [];
					if (res?.code === 0 && Array.isArray(res.data?.skills)) {
						const remoteMap = /* @__PURE__ */ new Map();
						res.data.skills.forEach((s) => {
							const sid = getBuiltinMarketSkillId(s);
							if (sid && s.version) remoteMap.set(sid, s.version);
						});
						for (const m of metas) {
							if (!m.skillId) continue;
							const remote = remoteMap.get(m.skillId);
							if (remote && m.version && isNewerVersion(remote, m.version)) updates.push({
								source: "builtin",
								meta: m,
								remoteVersion: remote,
								userModified: !!m.userModified
							});
						}
					}
				}
			} catch (err) {
				console.warn("[useSkillsUpdateBadge] BuiltinMarket detect failed:", err);
			}
			if (cancelled.current) return [];
			try {
				const metas = await marketplace.skillhub.getInstalledMetas() ?? [];
				const slugs = metas.map((m) => m.slug).filter(Boolean);
				if (slugs.length > 0) {
					const remoteMap = await fetchLatestVersions(marketplace, slugs);
					if (cancelled.current) return [];
					for (const m of metas) {
						const remote = remoteMap[m.slug];
						if (remote && m.version && isNewerVersion(remote, m.version)) updates.push({
							source: "skillhub",
							meta: m,
							remoteVersion: remote,
							userModified: !!m.userModified
						});
					}
				}
			} catch (err) {
				console.warn("[useSkillsUpdateBadge] SkillHub detect failed:", err);
			}
			if (cancelled.current) return [];
			if (isIOAUser(enterpriseId ?? "")) try {
				const metas = await marketplace.knot.getInstalledMetas() ?? [];
				const ids = metas.map((m) => m.id).filter((v) => typeof v === "number");
				if (ids.length > 0) {
					const res = await marketplace.knot.getByIds(ids);
					if (cancelled.current) return [];
					if (res?.code === 0 && Array.isArray(res.data)) {
						const remoteMap = /* @__PURE__ */ new Map();
						res.data.forEach((s) => {
							if (typeof s.id === "number" && s.version) remoteMap.set(s.id, s.version);
						});
						for (const m of metas) {
							if (typeof m.id !== "number") continue;
							const remote = remoteMap.get(m.id);
							if (remote && m.version && isNewerVersion(remote, m.version)) updates.push({
								source: "knot",
								meta: m,
								remoteVersion: remote,
								userModified: !!m.userModified
							});
						}
					}
				}
			} catch (err) {
				console.warn("[useSkillsUpdateBadge] Knot detect failed:", err);
			}
			if (cancelled.current) return [];
			if (enterpriseSkillsFacade && enterpriseId) {
				try {
					const metas = await enterpriseSkillsFacade.getInstalledMetas({ enterpriseId });
					if (cancelled.current) return [];
					for (const m of metas) {
						const installed = m.version;
						const latest = m.latestVersion;
						if (installed && latest && isNewerVersion(latest, installed)) updates.push({
							source: "enterprise",
							meta: m,
							remoteVersion: latest,
							userModified: !!m.userModified
						});
					}
				} catch (err) {
					console.warn("[useSkillsUpdateBadge] Enterprise Skill detect failed:", err);
				}
				if (cancelled.current) return [];
			}
			return updates;
		};
		/**
		* 对非 userModified 的 skill 执行静默自动更新。
		*
		* Issue #48476：企业下发 skill 不参与静默自动更新。
		*   user-asset 数据源不追踪 userModified（CloudEnterpriseSkillsRepo.mapUserAssetToInstalledMeta
		*   缺省置 false），无法判断企业 skill 是否被本地编辑过。
		*   保守处理：拿不到本地修改态时**不静默自动更新**，仅通过红点 + 批量更新弹窗
		*   提示用户手动确认（badge 检测路径仍按 userModified=false 计数，dialog 仍可见）。
		*   后续若 desktop 端补上本地 meta 同步，再放开此分支。
		*/
		const performAutoUpdate = async (updates) => {
			const toUpdate = updates.filter((u) => !u.userModified && u.source !== "enterprise");
			if (toUpdate.length === 0) return 0;
			let successCount = 0;
			for (const item of toUpdate) {
				if (cancelled.current) break;
				try {
					if (item.source === "builtin") {
						const m = item.meta;
						await marketplace.builtin.install({
							skillId: m.skillId,
							version: item.remoteVersion,
							name: m.name || "",
							skillName: m.skillName || m.name || ""
						});
						successCount++;
					} else if (item.source === "skillhub") {
						const m = item.meta;
						if ((await marketplace.skillhub.install(m.slug, item.remoteVersion, m.name, m.iconSource)).success) successCount++;
					} else if (item.source === "knot") {
						const m = item.meta;
						if (typeof m.id !== "number") continue;
						if ((await marketplace.knot.install(m.id, item.remoteVersion, m.name, m.slug, m.slug)).success) successCount++;
					} else if (item.source === "enterprise") {
						const m = item.meta;
						if ((await enterpriseSkillsFacade.install({
							skillId: m.skillId,
							version: item.remoteVersion,
							name: m.name
						})).success) successCount++;
					}
				} catch (err) {
					console.warn(`[useSkillsUpdateBadge] Auto-update failed for ${item.source} skill:`, err);
				}
			}
			return successCount;
		};
		const runDetect = async () => {
			if (cancelled.current) return;
			const isAutoUpdate = autoUpdateEnabledRef.current;
			const detectStartedAt = Date.now();
			writeRendererLog("startup-perf", "info", `useSkillsUpdateBadge detect start ${JSON.stringify({
				triggerKey,
				hasEnterpriseId: !!enterpriseId,
				autoUpdateEnabled: isAutoUpdate
			})}`);
			let updates;
			try {
				updates = await detectUpdates();
				writeRendererLog("startup-perf", "info", `useSkillsUpdateBadge detect done ${JSON.stringify({
					elapsedMs: Date.now() - detectStartedAt,
					updates: updates.length,
					cancelled: cancelled.current
				})}`);
			} catch (error) {
				writeRendererLog("startup-perf", "warn", `useSkillsUpdateBadge detect failed ${JSON.stringify({
					elapsedMs: Date.now() - detectStartedAt,
					error: error instanceof Error ? error.message : String(error)
				})}`);
				throw error;
			}
			if (cancelled.current) return;
			if (isAutoUpdate) {
				if (!autoUpdateEnabledRef.current) {
					const hasNonModifiedUpdate = updates.some((u) => !u.userModified);
					onBadgeVisibleChangeRef.current(hasNonModifiedUpdate);
					return;
				}
				const updatedCount = await performAutoUpdate(updates);
				if (cancelled.current) return;
				if (updatedCount > 0) onAutoUpdateCompletedRef.current?.(updatedCount);
				const hasUnhandledEnterpriseUpdate = updates.some((u) => u.source === "enterprise" && !u.userModified);
				onBadgeVisibleChangeRef.current(hasUnhandledEnterpriseUpdate);
			} else {
				const hasNonModifiedUpdate = updates.some((u) => !u.userModified);
				onBadgeVisibleChangeRef.current(hasNonModifiedUpdate);
			}
		};
		runDetect();
		const timer = setInterval(() => {
			runDetect();
		}, 3600 * 1e3);
		const onVisibilityChange = () => {
			if (typeof document !== "undefined" && document.visibilityState === "visible") runDetect();
		};
		if (typeof document !== "undefined") document.addEventListener("visibilitychange", onVisibilityChange);
		const refreshSub = skillsUpdateBadgeRefresh$.subscribe(() => {
			runDetect();
		});
		return () => {
			cancelled.current = true;
			clearInterval(timer);
			refreshSub.unsubscribe();
			if (typeof document !== "undefined") document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [
		marketplace,
		enterpriseSkillsFacade,
		enterpriseId,
		enabled,
		triggerKey,
		autoUpdateEnabled
	]);
}
var import_react$3;
var init_use_skills_update_badge = __esmMin((() => {
	init_common();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_account();
	init_http_logger();
	init_extension_refresh_events();
	init_skills_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/security-scan-intent-dialog.ts
function isSecurityScanFailed(state) {
	return !!state?.preCheck.error && state.scanResult.verdict === "";
}
function isSecurityScanPending(state) {
	return state?.scanResult.verdict === "" && !isSecurityScanFailed(state);
}
function isSecurityHighRisk(state) {
	return !isSecurityScanPending(state) && state?.scanResult.verdict !== "suspicious" && state?.scanResult.riskLevel === "high";
}
function buildSecurityScanDialogProps(options) {
	const { state, highRiskCountdown, t } = options;
	if (!state) return {
		title: "",
		content: "",
		confirmText: "",
		cancelText: "",
		confirmVariant: "primary"
	};
	if (isSecurityScanPending(state)) return {
		title: t("skills.security.intent.pendingTitle"),
		content: t("skills.security.intent.pendingContent"),
		confirmText: t("skills.security.skipDirectInstall"),
		cancelText: t("skills.security.cancelInstall"),
		confirmVariant: "primary"
	};
	if (isSecurityScanFailed(state)) {
		const tagsText = state.scanResult.tags.map((tag) => tag.desc || tag.tag).filter(Boolean).join("，");
		const combinedDesc = [
			state.scanResult.description,
			tagsText,
			state.preCheck.error
		].filter(Boolean).join("\n");
		return {
			title: t("skills.security.error"),
			content: combinedDesc || t("skills.security.deepAnalysisHint"),
			confirmText: t("skills.security.continueInstall"),
			cancelText: t("skills.security.cancelInstall"),
			confirmVariant: "danger"
		};
	}
	const titleKey = state.scanResult.verdict === "suspicious" ? "skills.security.verdict.grey" : `skills.security.result.${state.scanResult.riskLevel}`;
	const tagsText = state.scanResult.tags.map((tag) => tag.desc || tag.tag).filter(Boolean).join("，");
	const combinedDesc = [state.scanResult.description, tagsText].filter(Boolean).join("\n");
	return {
		title: t(titleKey),
		content: combinedDesc || t("skills.installConfirm.content.install"),
		confirmText: highRiskCountdown > 0 ? t("skills.security.confirmCountdown", { seconds: String(highRiskCountdown) }) : t("skills.security.continueInstall"),
		cancelText: t("skills.security.cancelInstall"),
		confirmVariant: "danger"
	};
}
var createPendingSecurityScanResult;
var init_security_scan_intent_dialog = __esmMin((() => {
	createPendingSecurityScanResult = (md5) => ({
		md5,
		hashHit: false,
		threatLevel: 0,
		riskLevel: "safe",
		verdict: "",
		description: "",
		tags: [],
		fileAnalysis: [],
		virusName: []
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/index.ts
var init_skills = __esmMin((() => {
	init_definition();
	init_use_high_risk_notification();
	init_use_skills_count_banner();
	init_use_skills_update_badge();
	init_use_auto_update_preference();
	init_async_security_scan_service();
	init_use_scan_result_subscription();
	init_security_scan_intent_dialog();
	init_skill_import_errors();
	init_types();
	init_skills_utils();
	init_high_risk_notification_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/context.tsx
var init_context = __esmMin((() => {
	init_common$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/utils/import-security-risk.ts
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function normalizeRiskKey(value) {
	return (value || "").replace(/\\/g, "/").replace(/\/+$/, "");
}
function getRiskStorageKeys(expertId, expertRootDir) {
	return Array.from(new Set([normalizeRiskKey(expertRootDir), normalizeRiskKey(expertId)].filter(Boolean)));
}
function loadRiskMap() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return /* @__PURE__ */ new Map();
		return new Map(JSON.parse(raw));
	} catch {
		return /* @__PURE__ */ new Map();
	}
}
function saveRiskMap(map) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(map.entries())));
	} catch {}
}
function isScanDone(result) {
	return !!result?.verdict && (!result.staticAnalysisStatus || result.staticAnalysisStatus === "done");
}
function isLowOrMediumRisk(result) {
	if (result.riskLevel === "low" || result.riskLevel === "medium" || result.verdict === "suspicious") return true;
	return result.threatLevel > 0 && result.threatLevel < 4 && result.verdict !== "black";
}
function normalizeRiskLevel(result) {
	if (result.riskLevel === "medium" || result.threatLevel >= 2) return "medium";
	return "low";
}
async function waitForScanResult(expertFacade, md5) {
	let interval = POLL_INITIAL_INTERVAL;
	const startedAt = Date.now();
	while (Date.now() - startedAt < POLL_MAX_WAIT) {
		await delay(interval);
		const result = await expertFacade.queryShareSecurityScan?.({ md5 });
		if (isScanDone(result)) return result;
		interval = Math.min(interval * 1.5, POLL_MAX_INTERVAL);
	}
	return null;
}
function recordExpertImportSecurityRisk(risk) {
	const map = loadRiskMap();
	getRiskStorageKeys(risk.expertId, risk.expertRootDir).forEach((key) => map.set(key, risk));
	saveRiskMap(map);
	window.dispatchEvent(new CustomEvent(EXPERT_IMPORT_SECURITY_RISK_EVENT, { detail: risk }));
}
function clearExpertImportSecurityRisk(expertId, expertRootDir) {
	const map = loadRiskMap();
	getRiskStorageKeys(expertId, expertRootDir).forEach((key) => map.delete(key));
	saveRiskMap(map);
	window.dispatchEvent(new CustomEvent(EXPERT_IMPORT_SECURITY_RISK_EVENT, { detail: {
		expertId,
		expertRootDir
	} }));
}
function findExpertImportSecurityRisk(map, expert) {
	return getRiskStorageKeys(expert.id, expert.expertRootDir).map((key) => map.get(key)).find(Boolean);
}
function decorateExpertsWithImportSecurityRisk(experts) {
	const map = loadRiskMap();
	return experts.map((expert) => ({
		...expert,
		importSecurityRisk: findExpertImportSecurityRisk(map, expert)
	}));
}
function subscribeExpertImportSecurityRiskChange(listener) {
	const handler = () => listener();
	window.addEventListener(EXPERT_IMPORT_SECURITY_RISK_EVENT, handler);
	return () => window.removeEventListener(EXPERT_IMPORT_SECURITY_RISK_EVENT, handler);
}
async function runBackgroundExpertImportSecurityCheck(params) {
	const { expertFacade, expertId, expertRootDir } = params;
	if (!expertRootDir || !expertFacade?.preCheckShare || !expertFacade?.queryShareSecurityScan) return;
	const preCheck = await expertFacade.preCheckShare({ zipPath: expertRootDir });
	if (!preCheck?.success || !preCheck.md5) return;
	const result = isScanDone(preCheck.scanResult) ? preCheck.scanResult : await waitForScanResult(expertFacade, preCheck.md5);
	if (!result || !isScanDone(result)) return;
	if (!isLowOrMediumRisk(result)) {
		clearExpertImportSecurityRisk(expertId, expertRootDir);
		return;
	}
	recordExpertImportSecurityRisk({
		expertId,
		expertRootDir,
		riskLevel: normalizeRiskLevel(result),
		threatLevel: result.threatLevel,
		verdict: result.verdict,
		updatedAt: Date.now()
	});
}
var EXPERT_IMPORT_SECURITY_RISK_EVENT, STORAGE_KEY, POLL_INITIAL_INTERVAL, POLL_MAX_INTERVAL, POLL_MAX_WAIT;
var init_import_security_risk = __esmMin((() => {
	EXPERT_IMPORT_SECURITY_RISK_EVENT = "workbuddy:expert-import-security-risk";
	STORAGE_KEY = "expert-import-security-risk-map";
	POLL_INITIAL_INTERVAL = 5e3;
	POLL_MAX_INTERVAL = 15e3;
	POLL_MAX_WAIT = 600 * 1e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/utils/locale-text.ts
/**
* 从多语言值中获取当前 locale 对应的文本。
* 支持纯字符串（直接返回）和 { zh, en } 对象。
*/
function getLocalizedText(value, locale, fallback = "") {
	if (!value) return fallback;
	if (typeof value === "string") return value || fallback;
	return value[locale] ?? value.zh ?? value.en ?? fallback;
}
/**
* 从多语言标签值中获取当前 locale 对应的文本。
*/
function getLocalizedTag(value, locale) {
	if (typeof value === "string") return value;
	return getLocalizedText(value, locale);
}
/**
* 将外部来源的标签列表归一化为可渲染文案；非数组输入降级为空列表，避免脏数据打断渲染。
*/
function getLocalizedTagTexts(tags, locale) {
	if (!Array.isArray(tags)) return [];
	return tags.map((tag) => getLocalizedTag(tag, locale).trim()).filter(Boolean);
}
var init_locale_text = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/pages/center/use-locale.ts
function toExpertCenterLocale(language) {
	return (language || "").toLowerCase().startsWith("en") ? "en" : "zh";
}
function useLocale() {
	const { locale } = useI18n();
	return (0, import_react$2.useMemo)(() => toExpertCenterLocale(locale || getLocale()), [locale]);
}
var import_react$2;
var init_use_locale = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_useI18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/config.ts
/**
* 专家中心相关的配置常量。
*
* 为何单独成文件：
* `SHOW_EXPERT_TEAM_SECTION` 原本只作用于 `expert-center-page.tsx`，用于
* 控制"专家团"区域在专家页面上是否展示。但历史召唤列表等消费方也需要据此
* 同步过滤（当专家团区域关闭时，已召唤过的专家团不应出现在最近历史里，
* 避免用户点进去之后功能不可用）。
*
* 抽到独立模块后可以让专家中心页面与最近历史列表共享同一份开关状态，
* 未来若升级为运行时 feature flag，替换一处即可。
*/
/**
* 专家中心页面是否展示"专家团"区域。
*
* - `true`：在专家页面展示专家团入口，最近召唤历史保留 `expertType === 'team'` 的记录。
* - `false`：专家页面不展示专家团；最近召唤历史也应过滤掉专家团类记录。
*
* 当前策略：Desktop 展示，Web 端隐藏（Web 端专家团功能不完善）。
* 注意：定制版（custom）构建会在 CI 的
* `apps/workbuddy-desktop/scripts/apply-brand-patch.js` 中将该常量替换为 `false`，
* 关闭专家团入口；如需调整定制版行为请同步修改该脚本。
*
* 使用函数而非常量：body[data-electron-desktop] 在 renderer main.tsx 渲染时才注入，
* 模块顶层 import 时 body 上还没有该属性，必须延迟到运行时读取。
*/
function isExpertTeamSectionEnabled() {
	if (typeof document === "undefined") return false;
	return document.body?.getAttribute("data-electron-desktop") === "true";
}
var CUSTOM_EXPERT_SKILL_NAME, EXPERT_ASSET_BASE_URL, EXPERT_MARKETPLACE_BASE_URL, getEditExpertPrompt, getDefaultCreateExpertPrompt;
var init_config = __esmMin((() => {
	CUSTOM_EXPERT_SKILL_NAME = "expert-manager";
	EXPERT_ASSET_BASE_URL = "https://acc-1258344699.cos.accelerate.myqcloud.com/workbuddy/experts";
	EXPERT_MARKETPLACE_BASE_URL = "https://acc-1258344699.cos.accelerate.myqcloud.com/workbuddy/expert-marketplace";
	getEditExpertPrompt = (expertId, locale) => locale === "en" ? `Edit expert "${expertId}", enhance/optimize its capabilities in [please specify the skills or knowledge areas you want to add/improve]` : `帮我修改专家：[${expertId}]，增加/优化[请补充你希望新增/优化的技能或知识领域等]方面的能力`;
	getDefaultCreateExpertPrompt = (locale) => locale === "en" ? "Help me create a XXX expert, skilled in XXXXX. My background: [please describe your industry experience]" : "帮我创建一个 XXX 专家，擅长 XXXXX。我的经验是：[请补充你的行业背景、相关经验]";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/pages/center/use-expert-theme.ts
function detectTheme() {
	if (typeof document === "undefined") return "light";
	const classList = document.body.classList;
	return classList.contains("vscode-dark") || classList.contains("vscode-high-contrast") ? "dark" : "light";
}
function useExpertTheme() {
	const [theme, setTheme] = (0, import_react$1.useState)(() => detectTheme());
	(0, import_react$1.useEffect)(() => {
		if (typeof document === "undefined") return;
		const updateTheme = () => {
			setTheme(detectTheme());
		};
		updateTheme();
		const observer = new MutationObserver(updateTheme);
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => {
			observer.disconnect();
		};
	}, []);
	return theme;
}
function useThemeClassName() {
	const theme = useExpertTheme();
	return (0, import_react$1.useMemo)(() => theme === "dark" ? "expert-center-dark" : "expert-center-light", [theme]);
}
var import_react$1;
var init_use_expert_theme = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/hooks/use-expert-avatar.ts
/**
* 公共头像 Hook，统一管理头像 URL 的 fallback 逻辑。
* 当 avatarUrl 为空或图片加载失败时，自动 fallback 到远程默认头像。
*/
function useExpertAvatar(avatarUrl) {
	const [broken, setBroken] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setBroken(false);
	}, [avatarUrl]);
	return {
		finalAvatarUrl: !broken && avatarUrl ? avatarUrl : DEFAULT_EXPERT_AVATAR_URL,
		onAvatarError: (0, import_react.useCallback)(() => setBroken(true), [])
	};
}
var import_react, DEFAULT_EXPERT_AVATAR_URL;
var init_use_expert_avatar = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	DEFAULT_EXPERT_AVATAR_URL = "https://acc-1258344699.cos.accelerate.myqcloud.com/workbuddy/custom-expert/default-avatar.png";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/pages/center/center.less
var init_center = __esmMin((() => {}));
//#endregion
export { getLocalizedDescription as $, useSkillsUpdateBadge as A, SKILLHUB_CATEGORIES_TTL as B, init_context as C, isSecurityHighRisk as D, createPendingSecurityScanResult as E, markExpertsEntryClickedToday as F, SKILLS_CACHE_KEY_RECOMMENDED as G, SKILLS_CACHE_KEY_FEATURED as H, useSkillsCountBanner as I, buildFallbackSkillMarkdown as J, SKILLS_WARNING_DISMISSED_KEY as K, FEATURED_CACHE_TTL as L, getFilePathSafe as M, init_skills_utils as N, isSecurityScanPending as O, isNewerVersion as P, formatNumber as Q, PLUGINS_CACHE_KEY_INSTALLED as R, subscribeExpertImportSecurityRiskChange as S, buildSecurityScanDialogProps as T, SKILLS_CACHE_KEY_FEATURED_TS as U, SKILLS_CACHE_KEY_BUILTIN_MARKET as V, SKILLS_CACHE_KEY_INSTALLED as W, coerceSkillText as X, buildSkillMarkdownWithMeta as Y, extractExamplesFromMarkdown as Z, getLocalizedText as _, init_definition as _t, useExpertTheme as a, init_use_cb_banner as at, init_import_security_risk as b, EXPERT_ASSET_BASE_URL as c, warning_cat_default as ct, getEditExpertPrompt as d, init_use_auto_update_preference as dt, init_types as et, init_config as f, useAutoUpdatePreference as ft, getLocalizedTagTexts as g, writeCacheSync as gt, useLocale as h, writeCache as ht, init_use_expert_theme as i, BannerType as it, fetchLatestVersions as j, init_use_skills_update_badge as k, EXPERT_MARKETPLACE_BASE_URL as l, SKILLS_AUTO_UPDATE_CHANGE_EVENT as lt, init_use_locale as m, readCache as mt, init_use_expert_avatar as n, parseFrontmatter as nt, useThemeClassName as o, useCBBanner as ot, isExpertTeamSectionEnabled as p, init_local_cache as pt, SORT_OPTIONS as q, useExpertAvatar as r, pickLocalizedExamples as rt, CUSTOM_EXPERT_SKILL_NAME as s, init_warning_cat as st, init_center as t, normalizeSkill as tt, getDefaultCreateExpertPrompt as u, SKILLS_AUTO_UPDATE_KEY as ut, init_locale_text as v, skillsModule as vt, init_skills as w, runBackgroundExpertImportSecurityCheck as x, decorateExpertsWithImportSecurityRisk as y, SKILLHUB_CACHE_KEY_CATEGORIES as z };
