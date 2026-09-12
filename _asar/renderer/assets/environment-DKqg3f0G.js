import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/basename.ts
/**
* 判断给定路径是否匹配某个 basename（精确匹配 or 以 `${basename}/` 开头）
*/
function matchBasename(pathname, basename) {
	return pathname === basename || pathname.startsWith(`${basename}/`);
}
var SUPPORTED_WEB_BASENAMES, DEFAULT_WEB_BASENAME, getCurrentWebBasename, isOnWebBasename, isOnWebSubPath;
var init_basename = __esmMin((() => {
	SUPPORTED_WEB_BASENAMES = ["/agents", "/app"];
	DEFAULT_WEB_BASENAME = "/agents";
	getCurrentWebBasename = () => {
		if (typeof window === "undefined" || !window.location) return DEFAULT_WEB_BASENAME;
		const pathname = window.location.pathname;
		for (const bn of SUPPORTED_WEB_BASENAMES) if (matchBasename(pathname, bn)) return bn;
		return DEFAULT_WEB_BASENAME;
	};
	isOnWebBasename = () => {
		if (typeof window === "undefined" || !window.location) return false;
		const pathname = window.location.pathname;
		return SUPPORTED_WEB_BASENAMES.some((bn) => matchBasename(pathname, bn));
	};
	isOnWebSubPath = (subPath, mode = "equals", pathname) => {
		const path = pathname ?? (typeof window !== "undefined" ? window.location?.pathname : void 0);
		if (!path) return false;
		return SUPPORTED_WEB_BASENAMES.some((bn) => {
			const full = `${bn}${subPath}`;
			return mode === "equals" ? path === full : path.startsWith(full);
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/environment.ts
/**
* 检测是否在 IDE 内嵌环境中运行
*
* 判断依据：
* 1. 存在 window.vs 对象（VSCode WebView）
* 2. 存在 acquireVsCodeApi 函数
* 3. 父窗口不是当前窗口（iframe）
*/
function isIDEEnvironment() {
	if (typeof window !== "undefined") {
		if (window.vs || typeof window.acquireVsCodeApi === "function") return true;
		if (window.parent !== window) return true;
	}
	return false;
}
/**
* 检测是否在浏览器环境中运行
*/
function isBrowserEnvironment() {
	return getEnvironmentType() === "browser";
}
function normalizeVersion(version) {
	if (typeof version !== "string") return null;
	return version.trim() || null;
}
/**
* 检测是否为 OAuth 授权回跳结果页。
*
* 仅对线上 OAuth 回跳路径生效：该页面可能被 WorkBuddy 内嵌在 iframe 中，
* 但它本质上是官网前端页面，不需要 IDE IPC channel，应按 Browser/SSE 模式初始化 adapter。
*
* 同时支持 /agents/callback 与 /app/callback 两条等价路径。
*/
function isOAuthCallbackPage() {
	if (typeof window === "undefined") return false;
	return isOnWebSubPath("/callback", "equals");
}
/**
* 获取环境类型
*/
function getEnvironmentType() {
	if (isOAuthCallbackPage()) return "browser";
	const applicationName = document.body?.getAttribute("data-application-name");
	return isIDEEnvironment() || !!applicationName ? "ide" : "browser";
}
/**
* 获取宿主已注入的产品版本号
*/
function getInjectedProductVersion() {
	if (typeof window === "undefined") return null;
	const bodyVersion = normalizeVersion(document.body?.getAttribute("data-product-version"));
	if (bodyVersion) return bodyVersion;
	const workBuddyVersion = normalizeVersion(window.__WORKBUDDY_VERSION__);
	if (workBuddyVersion) return workBuddyVersion;
	const codeBuddyVersion = normalizeVersion(window.__CODEBUDDY_VERSION__);
	if (codeBuddyVersion) return codeBuddyVersion;
	return normalizeVersion(window.electronAPI?.getVersion?.());
}
/**
* 获取当前产品版本号
*
* 优先读取宿主同步注入的版本，缺失时再回退到运行时 API。
*/
async function resolveProductVersion() {
	const injectedVersion = getInjectedProductVersion();
	if (injectedVersion) return injectedVersion;
	if (typeof window === "undefined") return null;
	try {
		const workAPI = window.workAPI;
		if (workAPI?.update?.getInfo) return normalizeVersion((await workAPI.update.getInfo())?.version);
	} catch {}
	return null;
}
/**
* 检测是否为国际版环境
*
* 判断逻辑：
* 1. IDE 模式: 从 body 的 data-is-chinese-version 属性读取（由 Agent Manager 注入）
*    - 使用 updateUrl 判断：国内版使用 copilot.tencent.com
*    - 参考: src/vs/workbench/contrib/genieSettings/browser/components/pages/generalSettings.ts
* 2. Web 模式: 从 window.location.hostname 判断
*
* 国际版域名：
* 1. 预发环境：staging-codebuddy.tencent.com
* 2. 生产环境：www.codebuddy.ai, codebuddy.ai
*/
function isInternationalVersion() {
	if (typeof window === "undefined") return false;
	const isChineseVersionAttr = document.body?.getAttribute("data-is-chinese-version");
	if (isChineseVersionAttr !== null) return isChineseVersionAttr !== "true";
	const hostname = window.location.hostname;
	return [
		"staging-codebuddy.tencent.com",
		"www.codebuddy.ai",
		"codebuddy.ai",
		"www.workbuddy.ai",
		"workbuddy.ai",
		"staging.workbuddy.ai",
		"www.workbuddy.cc",
		"workbuddy.cc",
		"staging.workbuddy.cc"
	].some((domain) => hostname === domain);
}
/**
* 获取当前版本的品牌名称
*
* - 海外版: "WorkBuddy AI"
* - 国内版: "WorkBuddy"
*/
function getBrandName() {
	if (isLearnBuddy()) return "LearnBuddy";
	return isInternationalVersion() ? "WorkBuddy AI" : "WorkBuddy";
}
/**
* 检测是否为 WorkBuddy 产品形态
*
* 判断逻辑：
* 1. IDE 模式: 从 body 的 data-application-name 属性读取（由 Agent Manager 注入）
* 2. Web 模式: 从 window.location.hostname 判断
*
* WorkBuddy 与 CodeBuddy 在构建时通过 product.json 的 applicationName 字段区分
*/
function isWorkBuddy() {
	if (typeof window === "undefined") return false;
	if (isLearnBuddy()) return false;
	try {
		if (localStorage.getItem("__force_workbuddy") === "1") return true;
	} catch {}
	if (document.body?.getAttribute("data-application-name") === "workbuddy") return true;
	if (document.body?.getAttribute("data-electron-desktop") === "true") return true;
	if (window.location.search.match(/platform=([^&]*)/)?.[1] === "workbuddy") return true;
	if (!isIDEEnvironment()) return true;
	return false;
}
/**
* 检测是否为 LearnBuddy 产品形态（腾讯学习助手）
*
* 判断依据：URL 参数 platform=learnbuddy
*/
function isLearnBuddy() {
	if (typeof window === "undefined") return false;
	try {
		return new URLSearchParams(window.location.search).get("platform") === "learnbuddy";
	} catch {
		return false;
	}
}
/**
* 获取当前产品的 platform 标识（applicationName 小写形式）
* 用于分享链接中的 platform 参数（如 ?platform=workbuddy / ?platform=learnbuddy）
*
* 优先读取 body[data-share-platform]（由 renderer main.tsx 从 product.config.applicationName 注入），
* 与 data-application-name 解耦——后者固定为 'workbuddy' 以兼容 isWorkBuddy() 业务检测。
*/
function getSharePlatformId() {
	if (typeof document !== "undefined") {
		const sharePlatform = document.body?.getAttribute("data-share-platform");
		if (sharePlatform) return sharePlatform;
	}
	if (typeof window !== "undefined") try {
		const platform = new URLSearchParams(window.location.search).get("platform");
		if (platform) return platform.toLowerCase();
	} catch {}
	return "workbuddy";
}
/**
* 获取当前产品显示名称（如 "LearnBuddy"、"WorkBuddy"）
* 从 body[data-product-name] 读取（由 renderer main.tsx 从 product.config.productName 注入）
*/
function getProductName() {
	if (typeof document !== "undefined") {
		const name = document.body?.getAttribute("data-product-name");
		if (name) return name;
	}
	return getBrandName();
}
/**
* 检测是否为 WorkBuddy Desktop (Electron) 环境
*
* 由 workbuddy-desktop renderer main.tsx 注入 body[data-electron-desktop="true"]，
* IDE webview 中不存在该属性，以此区分。
*/
function isWorkBuddyDesktop() {
	if (typeof window === "undefined") return false;
	return document.body?.getAttribute("data-electron-desktop") === "true";
}
/**
* 检测是否为 apps/web/agents 浏览器部署环境。
*
* 用于在纯 Web 场景（含主应用、分享落地页）把品牌 logo 替换为 workbuddy-logo，
* 与 WorkBuddy IDE webview / Desktop 区分开——后两者保持原 header-icon。
*
* 判断依据：处于浏览器环境（getEnvironmentType()==='browser'，即非 IDE webview、
* 页面未注入 data-application-name）且非 Electron Desktop。
*/
function isAgentsWeb() {
	return isBrowserEnvironment() && !isWorkBuddyDesktop();
}
/**
* 检测是否为海外版（非国内版）
*
* 等价于 `isInternationalVersion()` —— 历史上写过两套实现，2026.05 收敛到同一份。
*
* 判断优先级（详见 `isInternationalVersion`）：
* 1. body[data-is-chinese-version] 属性（IDE Webview / Desktop 主进程注入）：
*    - 'true'  → 国内版 → 返回 false
*    - 其他值  → 海外版 → 返回 true
* 2. 属性未注入（独立 Web 页面 apps/web/agents 不会注入）：
*    按 hostname 白名单判断（codebuddy.ai / staging-codebuddy.tencent.com）。
*
* 历史问题：旧实现属性缺失即认定海外，导致国内 Web 版（codebuddy.cn）
* 被误判为海外版，把数据管理面板内所有条目隐藏（DataManagementPanel）。
* 同时连带影响合规 Provider 禁用、分享文件 / 分享任务等 5 个调用方。
*/
function isOverseas() {
	return isInternationalVersion();
}
/**
* 获取官网 origin
*
* 根据 window.RUN_ENV 和国际版/国内版判断，返回正确的官网 origin：
* - 海外版生产: https://www.workbuddy.ai
* - 海外版预发: https://staging.workbuddy.ai
* - 国际生产: https://www.codebuddy.ai
* - 国际预发: https://staging-codebuddy.tencent.com
* - 国内生产: https://www.workbuddy.cn
* - 国内预发: https://staging.workbuddy.cn
*/
function getWebsiteOrigin() {
	const isStaging = window.RUN_ENV === "staging";
	if (isOverseas() && isWorkBuddy()) return isStaging ? "https://staging.workbuddy.ai" : "https://www.workbuddy.ai";
	if (isInternationalVersion()) return isStaging ? "https://staging-codebuddy.tencent.com" : "https://www.codebuddy.ai";
	return isStaging ? "https://staging.workbuddy.cn" : "https://www.workbuddy.cn";
}
/**
* 获取官网完整 URL
* @param path 路径，如 '/home'、'/pricing' 等
* @returns 完整的官网 URL
*/
function getWebsiteUrl(path) {
	return `${getWebsiteOrigin()}${path}`;
}
/**
* 获取分享链接的基础域名
*
* 注意：分享域名与官网域名是分离的，不复用 getWebsiteOrigin()。
* - 海外版生产: https://workbuddy.cc（专门用于分享落地页）
* - 海外版预发: https://staging.workbuddy.cc
* - 国内/其他: https://codebuddy.work
*
* 仅用于前端兜底拼接分享链接（理想路径是后端返回完整 shareUrl）。
*/
function getShareBaseUrl() {
	const isStaging = window.RUN_ENV === "staging";
	if (isOverseas()) return isStaging ? "https://staging.workbuddy.cc" : "https://workbuddy.cc";
	return "https://codebuddy.work";
}
function getDesktopDeeplinkScheme() {
	return isOverseas() ? "workbuddy-ai://" : "workbuddy://";
}
function getInstallDownloadUrl() {
	if (isOverseas()) return `${getWebsiteOrigin()}`;
	return "https://www.codebuddy.cn/work/";
}
/**
* 打印环境信息（调试用）
*/
function logEnvironmentInfo() {
	const envType = getEnvironmentType();
	console.log("[Environment] Type:", envType);
	console.log("[Environment] User Agent:", navigator.userAgent);
	console.log("[Environment] Window parent:", window.parent === window ? "self" : "different");
	console.log("[Environment] VSCode API:", !!window.vs || typeof window.acquireVsCodeApi === "function");
}
/**
* 根据当前环境获取隐私政策 URL
*
* 海外版返回 workbuddy.ai 隐私政策页面，国内版返回 privacy.qq.com 页面。
* 用于收敛各面板中隐私链接的硬编码，避免 URL 漂移。
*/
function getPrivacyPolicyUrl() {
	return isOverseas() ? PRIVACY_POLICY_URL_OVERSEAS : PRIVACY_POLICY_URL_DOMESTIC;
}
/**
* 获取反馈接口的 URL
*
* Web 端使用相对路径 /portal/feedback（自动跟随当前域名）。
* 客户端走 IPC 通道（submitViaWorkBuddyIPC），不会调用此函数。
*/
function getFeedbackApiUrl() {
	return "/portal/feedback";
}
var PRIVACY_POLICY_URL_DOMESTIC, PRIVACY_POLICY_URL_OVERSEAS;
var init_environment = __esmMin((() => {
	init_basename();
	PRIVACY_POLICY_URL_DOMESTIC = "https://privacy.qq.com/document/preview/771d9a58551449e9a7e7445ebfe04966";
	PRIVACY_POLICY_URL_OVERSEAS = "https://www.workbuddy.ai/document/privacy-policy";
}));
//#endregion
export { getCurrentWebBasename as C, resolveProductVersion as S, isOnWebBasename as T, isLearnBuddy as _, getInjectedProductVersion as a, isWorkBuddyDesktop as b, getProductName as c, getWebsiteOrigin as d, getWebsiteUrl as f, isInternationalVersion as g, isBrowserEnvironment as h, getFeedbackApiUrl as i, getShareBaseUrl as l, isAgentsWeb as m, getDesktopDeeplinkScheme as n, getInstallDownloadUrl as o, init_environment as p, getEnvironmentType as r, getPrivacyPolicyUrl as s, getBrandName as t, getSharePlatformId as u, isOverseas as v, init_basename as w, logEnvironmentInfo as x, isWorkBuddy as y };
