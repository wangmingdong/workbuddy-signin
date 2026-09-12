const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./i18n-DH8xcldp.js","./chunk-BRZcfu7K.js","./en-DG4hOH6n.js","./zh-cn-BNMACH5J.js"])))=>i.map(i=>d[i]);
import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { g as isInternationalVersion, p as init_environment } from "./environment-DKqg3f0G.js";
//#region ../../packages/agent-ui/src/i18n/index.ts
/**
* 异步同步 locale 到 cb-chat-ui 和 context-viewer-components。
* 首次调用时动态 import 对应模块的 i18n 子路径（deep import，不走 barrel），
* 后续调用直接用缓存的函数引用。
*
* 动态 import() 让 Rollup 把这些依赖拆到异步 chunk，不进入 share entry 的
* 同步 module graph，从而阻断 vendor-monaco / vendor-hljs 被拖入首屏。
*/
async function syncLocaleToSiblings(locale) {
	if (!_setCbChatUiLocale) try {
		_setCbChatUiLocale = (await __vitePreload(() => import("./i18n-DH8xcldp.js").then((n) => (n.a(), n.r)), __vite__mapDeps([0,1]), import.meta.url)).setLocale;
	} catch (e) {
		console.warn("[agent-ui i18n] Failed to load cb-chat-ui i18n:", e);
	}
	if (_setCbChatUiLocale) try {
		_setCbChatUiLocale(locale);
	} catch {}
	if (_setContextViewerLocale) try {
		_setContextViewerLocale(locale);
	} catch {}
}
/**
* 供外部（如主站 main.tsx 或 AgentWebApp 初始化）在加载 context-viewer-components 后
* 主动注入其 setLocale 函数，让后续 locale 切换能同步过去。
*
* 用法（通常在 web-agent-providers.ts 或 main.tsx 里调用一次）：
*   import { setLocale } from '@genie/context-viewer-components';
*   registerContextViewerLocaleSetter(setLocale);
*
* 分享页不调用此函数，因此不会拉入 context-viewer barrel。
*/
function registerContextViewerLocaleSetter(setter) {
	_setContextViewerLocale = setter;
	try {
		setter(currentLocale);
	} catch {}
}
/**
* 按需加载指定 locale 的 messages。
* Vite 看到 `import('./locales/${locale}.json')` 这种动态模板时，会自动把
* locales/ 目录下匹配 .json 的文件每个拆成独立 chunk。
*/
async function loadLocale(internalLocale) {
	if (messages[internalLocale]) return messages[internalLocale];
	if (loaders[internalLocale]) return loaders[internalLocale];
	let importer;
	if (internalLocale === INTERNAL_LOCALE_EN) importer = __vitePreload(() => import("./en-DG4hOH6n.js"), __vite__mapDeps([2,1]), import.meta.url);
	else importer = __vitePreload(() => import("./zh-cn-BNMACH5J.js"), __vite__mapDeps([3,1]), import.meta.url);
	const promise = importer.then((mod) => {
		const data = mod && mod.default || mod;
		messages[internalLocale] = data;
		return data;
	});
	loaders[internalLocale] = promise;
	return promise;
}
/**
* 将任意格式的 locale 值转换为内部使用的 key
* zh-CN, zh-cn, zh -> zh-cn
* en-US, en-us, en -> en
*/
function toInternalLocale(locale) {
	const lower = locale.toLowerCase();
	if (lower === "zh-cn" || lower.startsWith("zh")) return INTERNAL_LOCALE_ZH_CN;
	if (lower === "en-us" || lower === "en" || lower.startsWith("en")) return INTERNAL_LOCALE_EN;
	return DEFAULT_LOCALE;
}
/**
* 将内部 locale 值转换为存储格式（用于 localStorage）
* zh-cn -> zh-CN
* en -> en-US
*/
function toStorageLocale(internalLocale) {
	if (internalLocale === INTERNAL_LOCALE_ZH_CN) return STORAGE_LOCALE_ZH_CN;
	if (internalLocale === INTERNAL_LOCALE_EN) return STORAGE_LOCALE_EN_US;
	return STORAGE_LOCALE_ZH_CN;
}
/**
* 内部：实际应用新 locale（messages 已就绪后调用）
*/
function applyLocale(internalLocale, persist) {
	currentLocale = internalLocale;
	if (persist && typeof localStorage !== "undefined") localStorage.setItem(LOCALE_STORAGE_KEY, toStorageLocale(currentLocale));
	syncLocaleToSiblings(currentLocale).catch(() => {});
	listeners.forEach((listener) => {
		try {
			listener(currentLocale);
		} catch (e) {
			console.error("[agent-ui i18n] Error in locale change listener:", e);
		}
	});
}
/**
* 设置当前语言
* @param locale 语言代码，支持 'zh-CN', 'en-US', 'zh-cn', 'en' 等格式
* @param persist 是否保存到 localStorage，默认 true
*
* 同步签名以保持向后兼容；若目标语种 messages 未加载，会异步 load 后再切换
* （切换前 t() 仍返回原 locale 的翻译，避免出现空白闪烁）。
*/
function setLocale(locale, persist = true) {
	const internalLocale = toInternalLocale(locale);
	if (messages[internalLocale]) {
		applyLocale(internalLocale, persist);
		return;
	}
	loadLocale(internalLocale).then(() => {
		applyLocale(internalLocale, persist);
	}).catch((e) => {
		console.warn(`[agent-ui i18n] Failed to load locale "${internalLocale}":`, e);
		if (messages[DEFAULT_LOCALE]) applyLocale(DEFAULT_LOCALE, persist);
	});
}
/**
* 异步设置当前语言（推荐在初始化/语种切换 UI 中使用，可以 await 完成）
*/
async function setLocaleAsync(locale, persist = true) {
	const internalLocale = toInternalLocale(locale);
	try {
		await loadLocale(internalLocale);
		applyLocale(internalLocale, persist);
	} catch (e) {
		console.warn(`[agent-ui i18n] Failed to load locale "${internalLocale}":`, e);
		if (messages[DEFAULT_LOCALE]) applyLocale(DEFAULT_LOCALE, persist);
	}
}
/**
* 获取当前语言（返回内部格式：zh-cn 或 en）
*/
function getLocale() {
	return currentLocale;
}
/**
* 获取翻译文本
* @param key 翻译键
* @param replacements 替换参数，如 { count: 5, name: 'test' }
* @returns 翻译后的文本
*
* 同步签名。当前 locale 的 messages 尚未加载时，依次回退到 DEFAULT_LOCALE 的翻译、
* 最后回退到 key 本身（与原行为一致）。
*
* why 用 `in` 而非 `||` 回退：
*   空字符串是合法的翻译值（例如中文文案里 `loginSuffix` 天然不需要后缀），
*   若用 `||` 会把 "" 判为 falsy 一路回落到 key 本身，导致 UI 直接显示
*   `bridgeLanding.loginSuffix` 这种字面 key（历史 bug）。必须用 `in` 判断
*   key 是否存在于字典，存在即使空串也应原样返回。
*/
function t(key, replacements) {
	const currentDict = messages[currentLocale];
	const defaultDict = messages[DEFAULT_LOCALE];
	const message = currentDict && key in currentDict ? currentDict[key] : defaultDict && key in defaultDict ? defaultDict[key] : key;
	if (!replacements) return message;
	return message.replace(/\{(\w+)\}/g, (match, placeholder) => String(replacements[placeholder] ?? match));
}
/**
* 添加语言变更监听器
* @param listener 监听器函数
* @returns 取消监听的函数
*/
function onLocaleChange(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
/**
* 初始化语言设置（异步，会先按需加载当前语种 messages）
* 优先级：CODEBUDDY_IDE_STORAGE_LANG > 版本默认（海外版英文，国内版中文）
* 首次加载时会把默认语言写入 localStorage
*
* 调用方（main.tsx）应当 `await initLocale()` 后再渲染 React，
* 保证首屏不会出现"key 而非翻译文案"的闪烁。
*/
async function initLocale() {
	let targetLocale = null;
	let shouldPersist = true;
	if (typeof localStorage !== "undefined") {
		const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
		if (savedLocale) if (savedLocale === STORAGE_LOCALE_ZH_CN || savedLocale === STORAGE_LOCALE_EN_US) {
			targetLocale = toInternalLocale(savedLocale);
			shouldPersist = false;
		} else {
			const internal = toInternalLocale(savedLocale);
			if (internal === INTERNAL_LOCALE_ZH_CN || internal === INTERNAL_LOCALE_EN) {
				targetLocale = internal;
				shouldPersist = true;
			}
		}
	}
	if (targetLocale === null) {
		const isVersionKnown = (typeof document !== "undefined" ? document.body?.getAttribute("data-is-chinese-version") : null) !== null;
		targetLocale = isInternationalVersion() ? INTERNAL_LOCALE_EN : INTERNAL_LOCALE_ZH_CN;
		shouldPersist = isVersionKnown;
	}
	await setLocaleAsync(targetLocale, shouldPersist);
}
/**
* 监听 body 元素 lang 属性变化
*/
function observeBodyLang() {
	if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) if (mutation.type === "attributes" && mutation.attributeName === "lang") {
			const newLang = document.body?.getAttribute("lang");
			if (newLang) {
				const normalizedLang = newLang.toLowerCase();
				if (normalizedLang.startsWith("zh")) setLocale(INTERNAL_LOCALE_ZH_CN);
				else if (normalizedLang.startsWith("en")) setLocale(INTERNAL_LOCALE_EN);
			}
		}
	});
	if (document.body) observer.observe(document.body, {
		attributes: true,
		attributeFilter: ["lang"]
	});
	else document.addEventListener("DOMContentLoaded", () => {
		if (document.body) observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["lang"]
		});
	});
}
/**
* 保存语言设置到 localStorage（向后兼容）
* @param locale 语言代码
* @deprecated 使用 setLocale 即可，会自动保存
*/
function saveLocale(locale) {
	setLocale(locale);
}
/**
* 获取支持的语言列表（value 为内部格式）
*/
function getSupportedLocales() {
	return [{
		value: INTERNAL_LOCALE_ZH_CN,
		label: "中文(简体)"
	}, {
		value: INTERNAL_LOCALE_EN,
		label: "English"
	}];
}
var _setCbChatUiLocale, _setContextViewerLocale, LOCALE_STORAGE_KEY, STORAGE_LOCALE_ZH_CN, STORAGE_LOCALE_EN_US, INTERNAL_LOCALE_ZH_CN, INTERNAL_LOCALE_EN, DEFAULT_LOCALE, messages, loaders, currentLocale, listeners;
var init_i18n = __esmMin((() => {
	init_environment();
	init_preload_helper();
	_setCbChatUiLocale = null;
	_setContextViewerLocale = null;
	LOCALE_STORAGE_KEY = "CODEBUDDY_IDE_STORAGE_LANG";
	STORAGE_LOCALE_ZH_CN = "zh-CN";
	STORAGE_LOCALE_EN_US = "en-US";
	INTERNAL_LOCALE_ZH_CN = "zh-cn";
	INTERNAL_LOCALE_EN = "en";
	DEFAULT_LOCALE = INTERNAL_LOCALE_ZH_CN;
	messages = {};
	loaders = {};
	currentLocale = DEFAULT_LOCALE;
	listeners = /* @__PURE__ */ new Set();
	new Proxy({}, { get(_target, key) {
		return t(key);
	} });
	if (typeof window !== "undefined") {
		initLocale().catch((e) => {
			console.warn("[agent-ui i18n] auto initLocale failed:", e);
		});
		observeBodyLang();
	}
}));
//#endregion
export { init_i18n as a, saveLocale as c, initLocale as i, setLocale as l, getLocale as n, onLocaleChange as o, getSupportedLocales as r, registerContextViewerLocaleSetter as s, LOCALE_STORAGE_KEY as t, t as u };
