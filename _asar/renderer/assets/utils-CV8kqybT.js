import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/discover-panel/types.ts
/** 将 case.json 的 task_mode 中文值解析为内部 welcomeMode 值，无效值返回 undefined（不切换模式） */
function resolveTaskMode(taskMode) {
	if (!taskMode) return;
	return TASK_MODE_MAP[taskMode];
}
var PlaybookArtifactType, DISCOVER_COS_CONFIG, DISCOVER_CACHE_KEYS, FEATURED_CATEGORY_ID, TASK_MODE_MAP;
var init_types = __esmMin((() => {
	PlaybookArtifactType = /* @__PURE__ */ function(PlaybookArtifactType) {
		PlaybookArtifactType["Doc"] = "doc";
		PlaybookArtifactType["Ppt"] = "ppt";
		PlaybookArtifactType["Md"] = "md";
		PlaybookArtifactType["Image"] = "image";
		PlaybookArtifactType["Table"] = "table";
		PlaybookArtifactType["Code"] = "code";
		PlaybookArtifactType["Other"] = "other";
		PlaybookArtifactType["Html"] = "html";
		PlaybookArtifactType["Video"] = "video";
		PlaybookArtifactType["Link"] = "link";
		return PlaybookArtifactType;
	}({});
	DISCOVER_COS_CONFIG = {
		baseUrl: "https://acc-1258344699.cos.ap-guangzhou.myqcloud.com/workbuddy/playbook",
		registryPath: "/registry.json",
		categoriesPath: "/categories.json",
		featuredPath: "/featured.json",
		caseDetailPath: (caseId) => `/cases/${caseId}/case.json`,
		caseAssetPath: (caseId, assetPath) => `/cases/${caseId}/${assetPath}`
	};
	DISCOVER_CACHE_KEYS = {
		registry: "discover-registry",
		categories: "discover-categories",
		featured: "discover-featured",
		favorites: "discover-favorites",
		caseDetailPrefix: "discover-case-"
	};
	FEATURED_CATEGORY_ID = "__featured__";
	TASK_MODE_MAP = {
		"日常办公": "working",
		"代码开发": "coding",
		"设计创意": "design"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/utils.ts
/** 获取多语言文本 - 支持 I18nText 对象或纯字符串 */
function getLocalizedText(value, locale, fallback = "") {
	if (!value) return fallback;
	if (typeof value === "string") return value;
	return value[locale] ?? value.zh ?? value.en ?? fallback;
}
/**
* 根据 locale 从基础字段和 _en 字段中选择合适的文本
* 英文环境优先取 enValue，fallback 到 zhValue；中文环境直接取 zhValue
*/
function getLocalizedField(zhValue, enValue, locale, fallback = "") {
	if (locale === "en") return enValue || zhValue || fallback;
	return zhValue || fallback;
}
function getHighlightParts(text, keyword) {
	if (!keyword?.trim()) return [{
		text,
		isHighlight: false
	}];
	return text.split(new RegExp(`(${escapeRegExp(keyword)})`, "gi")).filter((p) => p).map((part) => ({
		text: part,
		isHighlight: part.toLowerCase() === keyword.toLowerCase()
	}));
}
/** 转义正则表达式特殊字符 */
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
* 解析 playbook 资源的完整 COS URL
*
* @param assetPath COS 中存储的资源相对路径（无 cases/{caseId}/ 前缀）或完整 URL
* @param caseId     当前 case 的 ID，用于补全路径前缀
* @param coverMode  封面模式；为 'portrait' 时默认强制改写为 cover-portrait.png（兼容主网格/详情页旧行为）
* @param options    可选行为开关；`respectPortraitOverride: false` 时即使 coverMode='portrait' 也按字面值取 assetPath
* @returns 完整可访问的 URL
*/
function resolvePlaybookAssetUrl(assetPath, caseId, coverMode, options) {
	if (!assetPath || !caseId) return null;
	const path = (options?.respectPortraitOverride ?? true) && coverMode === "portrait" ? "cover-portrait.png" : assetPath;
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	return `${DISCOVER_COS_CONFIG.baseUrl}${DISCOVER_COS_CONFIG.caseAssetPath(caseId, path)}`;
}
/** 判断是否为竖版封面 */
function isPortraitCover(coverMode) {
	return coverMode === "portrait";
}
var init_utils = __esmMin((() => {
	init_types();
}));
//#endregion
export { isPortraitCover as a, DISCOVER_COS_CONFIG as c, init_types as d, resolveTaskMode as f, init_utils as i, FEATURED_CATEGORY_ID as l, getLocalizedField as n, resolvePlaybookAssetUrl as o, getLocalizedText as r, DISCOVER_CACHE_KEYS as s, getHighlightParts as t, PlaybookArtifactType as u };
