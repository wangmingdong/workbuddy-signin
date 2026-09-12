import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { B as accountService, n as init_common } from "./common-CwB_VqKR.js";
import { Lr as groupMessagesByUser, Va as LoadingSpinnerIcon, Yr as toast, ni as ConfirmDialog, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_client } from "./client-BPkZUIji.js";
import { p as init_environment, r as getEnvironmentType, w as init_basename, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { o as writeRendererLog, t as init_http_logger } from "./http-logger-BE9rNaof.js";
import { d as isClawWorkspacePath, u as init_file_path } from "./file-path-DzzGeaqx.js";
import { n as init_adapter_context } from "./adapter-context-DGaRYQ5R.js";
import { n as init_ima_api_context } from "./ima-api-context-C8-EzcEu.js";
import { o as init_theme, t as init_useTheme } from "./useTheme-KZ-Qaric.js";
import { c as init_auth_expired_detector, d as registerAuthExpiredSignInHandler, g as throttle, h as init_timing, i as init_product_features, m as debounce, r as init_chat_types, s as clearAuthExpired, t as MessageType } from "./chat-types-BMkaZPiE.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
//#region ../../packages/agent-ui/src/contexts/conversations-context.tsx
/**
* 规范化路径用于比较（小写 + 正斜杠 + 去尾斜杠）
*/
function normalizePath(path) {
	return path.replace(/\\/g, "/").toLowerCase().replace(/\/+$/, "");
}
function isClawPath(path, label) {
	if (label?.trim().toLowerCase() === "claw") return true;
	return isClawWorkspacePath(path);
}
/**
* 全局工作区目录选项 Hook
* 在 App 层调用，将状态存入 ConversationsContext，
* 使 directoryOptions 在 Grid remount 后仍可用。
*
* @param adapter Agent Adapter 实例（用于 getCurrentWorkspaces）
* @param conversations 会话列表（变化时触发刷新）
*/
function useGlobalDirectoryOptions(adapter, conversations) {
	const [globalDirectoryOptions, setGlobalDirectoryOptions] = (0, import_react$14.useState)([]);
	const prevConversationsLengthRef = (0, import_react$14.useRef)(void 0);
	const refreshFromAdapter = (0, import_react$14.useCallback)(() => {
		if (!adapter?.getCurrentWorkspaces) return;
		adapter.getCurrentWorkspaces().then((workspaces) => {
			console.log("[useGlobalDirectoryOptions] getCurrentWorkspaces returned:", workspaces.map((w) => w.path));
			if (workspaces.length === 0) return;
			setGlobalDirectoryOptions((prev) => {
				const existingKeys = new Set(prev.map((opt) => normalizePath(opt.value)));
				const newOpts = workspaces.filter((ws) => ws.path && !isClawPath(ws.path, ws.label) && !existingKeys.has(normalizePath(ws.path))).map((ws) => ({
					value: ws.path,
					label: ws.label || ws.path.split(/[\\/]/).filter(Boolean).pop() || ws.path
				}));
				return newOpts.length > 0 ? [...newOpts, ...prev] : prev;
			});
		}).catch((error) => {
			console.error("[useGlobalDirectoryOptions] Failed to load global workspaces:", error);
		});
	}, [adapter]);
	const addGlobalDirectoryOption = (0, import_react$14.useCallback)((path, label) => {
		if (!path) return;
		if (isClawPath(path, label)) return;
		setGlobalDirectoryOptions((prev) => {
			const normalizedNew = normalizePath(path);
			if (prev.some((opt) => normalizePath(opt.value) === normalizedNew)) return prev;
			return [{
				value: path,
				label: label || path.split(/[\\/]/).filter(Boolean).pop() || path
			}, ...prev];
		});
	}, []);
	(0, import_react$14.useEffect)(() => {
		const currentLength = conversations?.length ?? 0;
		const prevLength = prevConversationsLengthRef.current;
		if (prevLength === void 0 || currentLength !== prevLength) {
			prevConversationsLengthRef.current = currentLength;
			refreshFromAdapter();
		}
	}, [conversations?.length, refreshFromAdapter]);
	return {
		globalDirectoryOptions,
		addGlobalDirectoryOption
	};
}
function readPersistedDisableAllExtensions() {
	try {
		const raw = localStorage.getItem(DISABLE_ALL_EXTENSIONS_STORAGE_KEY);
		if (!raw) return {
			enabled: false,
			snapshot: null
		};
		const parsed = JSON.parse(raw);
		const enabled = !!parsed.enabled;
		if (parsed.snapshot != null) try {
			localStorage.setItem(DISABLE_ALL_EXTENSIONS_STORAGE_KEY, JSON.stringify({
				enabled,
				snapshot: null
			}));
		} catch {}
		return {
			enabled,
			snapshot: null
		};
	} catch {
		return {
			enabled: false,
			snapshot: null
		};
	}
}
function writePersistedDisableAllExtensions(value) {
	try {
		localStorage.setItem(DISABLE_ALL_EXTENSIONS_STORAGE_KEY, JSON.stringify(value));
	} catch {}
}
function useDisableAllExtensionsState() {
	const [state, setState] = (0, import_react$14.useState)(() => readPersistedDisableAllExtensions());
	const setDisableAllExtensionsState = (0, import_react$14.useCallback)((enabled, snapshot) => {
		const next = {
			enabled,
			snapshot
		};
		setState(next);
		writePersistedDisableAllExtensions(next);
	}, []);
	return {
		disableAllExtensions: state.enabled,
		disableAllExtensionsSnapshot: state.snapshot,
		setDisableAllExtensionsState
	};
}
var import_react$14, ConversationsContext, useConversations, DISABLE_ALL_EXTENSIONS_STORAGE_KEY;
var init_conversations_context = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_file_path();
	ConversationsContext = (0, import_react$14.createContext)(void 0);
	useConversations = () => {
		const context = (0, import_react$14.useContext)(ConversationsContext);
		if (!context) throw new Error("useConversations must be used within ConversationsProvider");
		return context;
	};
	DISABLE_ALL_EXTENSIONS_STORAGE_KEY = "agent-ui-disable-all-extensions";
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/account-context.tsx
var import_react$13, AccountContext, useAccount;
var init_account_context = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	AccountContext = (0, import_react$13.createContext)(void 0);
	useAccount = () => {
		const context = (0, import_react$13.useContext)(AccountContext);
		if (!context) throw new Error("useAccount must be used within AccountProvider");
		return context;
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/enhance-service-context.tsx
/**
* 取注入的 enhanceService；未注入时返回 `undefined`（消费者据此关闭增强按钮）。
*/
function useOptionalEnhanceService() {
	return (0, import_react$12.useContext)(EnhanceServiceContext);
}
var import_react$12, EnhanceServiceContext;
var init_enhance_service_context = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	EnhanceServiceContext = (0, import_react$12.createContext)(void 0);
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/document-preview-context.tsx
function useOptionalDocumentPreviewBridge() {
	return (0, import_react$11.useContext)(DocumentPreviewContext);
}
var import_react$11, DocumentPreviewContext;
var init_document_preview_context = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	DocumentPreviewContext = (0, import_react$11.createContext)(void 0);
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/question-context.tsx
/**
* 可选的 Question Context Hook（不抛出错误）
*/
function useQuestionContextOptional() {
	return (0, import_react$10.useContext)(QuestionContext);
}
var import_react$10, QuestionContext;
var init_question_context = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	require_jsx_runtime();
	QuestionContext = (0, import_react$10.createContext)(null);
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/clipboard.ts
/**
* 剪贴板工具函数
* 支持 VSCode webview、Electron renderer 和 Safari 环境
*/
/**
* 使用 execCommand 方式复制文本（同步，兼容 Safari/iOS Safari）。
* Safari 对 textarea.select() 支持不完整，需要使用 setSelectionRange 确保文本被选中。
* 同时设置 contentEditable 和 readOnly 属性以兼容 iOS Safari 不弹出键盘。
*/
function execCommandCopy(text) {
	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.setAttribute("readonly", "");
	textArea.contentEditable = "true";
	textArea.style.position = "fixed";
	textArea.style.top = "0";
	textArea.style.left = "-9999px";
	textArea.style.width = "1px";
	textArea.style.height = "1px";
	textArea.style.padding = "0";
	textArea.style.border = "none";
	textArea.style.outline = "none";
	textArea.style.boxShadow = "none";
	textArea.style.background = "transparent";
	textArea.style.opacity = "0";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.setSelectionRange(0, text.length);
	let ok = false;
	try {
		ok = document.execCommand("copy");
	} catch {
		ok = false;
	}
	document.body.removeChild(textArea);
	return ok;
}
/** 取 desktop 剪贴板桥；非 desktop（Web / VSCode webview）环境返回 undefined。 */
function getDesktopClipboardBridge() {
	if (typeof window === "undefined") return;
	return window.workbuddyDesktop?.clipboard;
}
/**
* 复制文本到剪贴板。按可靠性从高到低依次尝试：
*   0. WorkBuddy Desktop 主进程剪贴板（`window.workbuddyDesktop.clipboard.writeText`）——
*      经主进程 IPC 写入 electron.clipboard，不受 sandbox / secure context / focus /
*      用户手势限制，是 desktop 端最可靠的复制路径。
*   1. 浏览器 `navigator.clipboard.writeText` —— 标准 API，Safari 要求在用户手势
*      的同步调用栈中调用，且页面必须处于 focus 状态。
*   2. `document.execCommand('copy')` fallback —— 使用 setSelectionRange 兼容
*      iOS Safari，VSCode webview 下通常也可用。
*
* @param text - 要复制的文本
* @returns Promise<boolean> - 复制成功返回 true，否则返回 false
*/
async function copyToClipboard(text) {
	if (!text) return false;
	const desktopClipboard = getDesktopClipboardBridge();
	if (desktopClipboard?.writeText) try {
		await desktopClipboard.writeText(text);
		return true;
	} catch {}
	if (navigator.clipboard?.writeText && document.hasFocus()) try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {}
	if (execCommandCopy(text)) return true;
	console.warn("[clipboard] all copy strategies failed");
	return false;
}
var init_clipboard = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/download.ts
/**
* 下载工具函数
*/
/**
* 通过创建隐藏的 a 标签触发浏览器下载
* @param url 下载地址
* @param fileName 下载文件名
*/
function triggerDownload(url, fileName) {
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName ?? "";
	link.style.display = "none";
	document.body.appendChild(link);
	try {
		link.click();
	} finally {
		link.remove();
	}
}
/**
* 通过 fetch 拉取资源后再触发下载（参考 PreviewIframe 的 resolveRedirectUrl 思路）。
*
* 与 {@link triggerDownload} 直接 `<a download href={remoteUrl}>` 相比：
* 1. **能感知真实状态码**：远端 401/403/404 会被显式抛出（而 `<a download>` 只能静默
*    打开一个错误页或什么都不发生），调用方可以提前 toast。
* 2. **跨源也能强制使用指定文件名**：浏览器对跨源链接会忽略 `<a download>` 上的
*    `download` 属性；这里改成「下载到 blob → 同源 object URL」，文件名一定生效。
* 3. **对 302 透明**：fetch 默认 `redirect: 'follow'` 会跟完跳转，与 SMH 分享下载
*    链路（`/api/v1/share/file/.../?download` → 302 → 真实文件流）天然兼容。
*
* 代价：先把整个文件读进内存再喂给 a[download]，对超大文件不友好。当前分享场景
* 单文件上限有限，可以接受。
*
* @param url 远端资源地址（可能 302 跳转）
* @param fileName 期望的下载文件名
* @throws 网络异常 / 非 2xx 时抛出，调用方负责 toast 与日志
*/
async function fetchAndDownload(url, fileName) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const blob = await response.blob();
	const objectUrl = URL.createObjectURL(blob);
	try {
		triggerDownload(objectUrl, fileName);
	} finally {
		setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
	}
}
var init_download = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/upload-cache.ts
/**
* 为 File 对象生成缓存 key
* 使用 文件名 + 文件大小 + lastModified 组合
*
* @param file - File 对象
* @returns 缓存 key
*/
function generateCacheKey(file) {
	return [
		file.name,
		file.size.toString(),
		file.lastModified.toString()
	].join("|");
}
var STORAGE_KEY, DEFAULT_EXPIRE_SECONDS, EXPIRE_BUFFER_MS, MAX_CACHE_ENTRIES, UploadCache, uploadCache;
var init_upload_cache = __esmMin((() => {
	STORAGE_KEY = "genie_upload_cache";
	DEFAULT_EXPIRE_SECONDS = 3600;
	EXPIRE_BUFFER_MS = 60 * 1e3;
	MAX_CACHE_ENTRIES = 100;
	UploadCache = class UploadCache {
		/**
		* 获取单例实例
		*/
		static getInstance() {
			if (!UploadCache.instance) UploadCache.instance = new UploadCache();
			return UploadCache.instance;
		}
		/**
		* 私有构造函数，防止外部实例化
		*/
		constructor() {
			this.cleanup();
		}
		/**
		* 获取缓存条目
		*
		* @param key - 缓存 key
		* @returns 缓存条目，如果不存在或已过期返回 null
		*/
		get(key) {
			const data = this.loadData();
			const entry = data[key];
			if (!entry) return null;
			if (this.isExpired(entry)) {
				delete data[key];
				this.saveData(data);
				return null;
			}
			return entry;
		}
		/**
		* 通过 File 对象获取缓存
		*
		* @param file - File 对象
		* @returns 缓存条目，如果不存在或已过期返回 null
		*/
		getByFile(file) {
			const key = generateCacheKey(file);
			return this.get(key);
		}
		/**
		* 设置缓存条目
		*
		* @param key - 缓存 key
		* @param url - 云端 URL
		* @param options - 可选配置
		* @param options.expireSeconds - 过期时间（秒），来自后端返回
		* @param options.expiresAt - 过期时间戳（毫秒），优先级高于 expireSeconds
		* @param options.fileName - 文件名（用于调试）
		*/
		set(key, url, options) {
			const data = this.loadData();
			let expiresAt;
			if (options?.expiresAt !== void 0) expiresAt = options.expiresAt;
			else {
				const expireSeconds = options?.expireSeconds ?? DEFAULT_EXPIRE_SECONDS;
				expiresAt = Date.now() + expireSeconds * 1e3;
			}
			data[key] = {
				url,
				expiresAt,
				fileName: options?.fileName
			};
			this.cleanupExpiredEntries(data);
			this.enforceMaxEntries(data);
			this.saveData(data);
		}
		/**
		* 通过 File 对象设置缓存
		*
		* @param file - File 对象
		* @param url - 云端 URL
		* @param expireSeconds - 过期时间（秒），来自后端返回
		*/
		setByFile(file, url, expireSeconds) {
			const key = generateCacheKey(file);
			this.set(key, url, {
				expireSeconds,
				fileName: file.name
			});
		}
		/**
		* 检查是否存在有效缓存
		*
		* @param key - 缓存 key
		* @returns 是否存在有效缓存
		*/
		has(key) {
			return this.get(key) !== null;
		}
		/**
		* 通过 File 对象检查是否存在有效缓存
		*
		* @param file - File 对象
		* @returns 是否存在有效缓存
		*/
		hasByFile(file) {
			const key = generateCacheKey(file);
			return this.has(key);
		}
		/**
		* 删除缓存条目
		*
		* @param key - 缓存 key
		*/
		delete(key) {
			const data = this.loadData();
			delete data[key];
			this.saveData(data);
		}
		/**
		* 清理所有过期条目
		*
		* @returns 清理的条目数量
		*/
		cleanup() {
			const data = this.loadData();
			let cleanedCount = 0;
			for (const key of Object.keys(data)) if (this.isExpired(data[key])) {
				delete data[key];
				cleanedCount++;
			}
			if (cleanedCount > 0) this.saveData(data);
			return cleanedCount;
		}
		/**
		* 清空所有缓存
		*/
		clear() {
			this.saveData({});
		}
		/**
		* 获取缓存统计信息
		*
		* @returns 统计信息
		*/
		getStats() {
			const data = this.loadData();
			const keys = Object.keys(data);
			let expired = 0;
			let valid = 0;
			for (const key of keys) if (this.isExpired(data[key])) expired++;
			else valid++;
			return {
				total: keys.length,
				expired,
				valid
			};
		}
		/**
		* 获取所有有效的缓存条目
		*
		* @returns 有效缓存条目列表
		*/
		getAllValid() {
			const data = this.loadData();
			const result = [];
			for (const key of Object.keys(data)) {
				const entry = data[key];
				if (!this.isExpired(entry)) result.push({
					key,
					entry
				});
			}
			return result;
		}
		/**
		* 检查条目是否过期（包含缓冲时间）
		*/
		isExpired(entry) {
			return Date.now() + EXPIRE_BUFFER_MS >= entry.expiresAt;
		}
		/**
		* 清理 data 对象中的过期条目（在 set 时调用）
		*/
		cleanupExpiredEntries(data) {
			for (const key of Object.keys(data)) if (this.isExpired(data[key])) delete data[key];
		}
		/**
		* 强制执行最大条目数限制
		* 如果超过限制，删除最早过期的条目
		*/
		enforceMaxEntries(data) {
			const keys = Object.keys(data);
			if (keys.length <= MAX_CACHE_ENTRIES) return;
			const entriesToRemove = keys.map((key) => ({
				key,
				expiresAt: data[key].expiresAt
			})).sort((a, b) => a.expiresAt - b.expiresAt).slice(0, keys.length - MAX_CACHE_ENTRIES);
			for (const { key } of entriesToRemove) delete data[key];
		}
		/**
		* 从 localStorage 加载数据
		*/
		loadData() {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (!raw) return {};
				return JSON.parse(raw);
			} catch (error) {
				console.error("[UploadCache] Failed to load data:", error);
				return {};
			}
		}
		/**
		* 保存数据到 localStorage
		*/
		saveData(data) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			} catch (error) {
				console.error("[UploadCache] Failed to save data:", error);
				this.cleanup();
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
				} catch {}
			}
		}
	};
	uploadCache = UploadCache.getInstance();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/format.ts
var formatNumber, formatDateTime, calendarDaysBetween, formatRelativeTime;
var init_format = __esmMin((() => {
	formatNumber = (num) => {
		if (num === void 0 || num === null || num === "") return "0";
		const n = typeof num === "string" ? parseFloat(num) : num;
		if (isNaN(n)) return "0";
		return Math.max(0, n).toLocaleString("en-US");
	};
	formatDateTime = (timestamp) => {
		if (!timestamp) return "--";
		const date = new Date(typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp);
		if (isNaN(date.getTime())) return "--";
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
	};
	calendarDaysBetween = (fromTs, toTs = Date.now()) => {
		const startOfDay = (ts) => {
			const d = new Date(ts);
			d.setHours(0, 0, 0, 0);
			return d.getTime();
		};
		return Math.max(0, Math.round((startOfDay(toTs) - startOfDay(fromTs)) / 864e5));
	};
	formatRelativeTime = (date, t) => {
		const now = Date.now();
		const timestamp = date instanceof Date ? date.getTime() : date;
		const diffMs = now - timestamp;
		const diffMinutes = Math.floor(diffMs / 6e4);
		const diffHours = Math.floor(diffMs / 36e5);
		if (diffMinutes < 1) return t("conversation.time.justNow");
		if (diffHours < 1) return t("conversation.time.minutesAgo", { count: diffMinutes });
		if (diffHours < 24) return t("conversation.time.hoursAgo", { count: diffHours });
		const diffDays = calendarDaysBetween(timestamp, now);
		const diffYears = Math.floor(diffDays / 365);
		if (diffYears < 1) return t("conversation.time.daysAgo", { count: diffDays });
		return t("conversation.time.yearsAgo", { count: diffYears });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/url.ts
/**
* 同步参数到 URL 查询字符串
*
* - 基于当前 URL 参数进行增量更新
* - null、undefined、空字符串、空数组的值会从 URL 中删除对应参数
* - 数组会用逗号连接
* - 布尔值会转换为 'true' / 'false'
* - 数字会转换为字符串
*
* 注意：sessionId 路由管理请使用 RouterContext
*
* @param params 要同步的参数对象
* @param options 配置选项
*/
function syncParamsToURL(params, options = {}) {
	const { replace = true } = options;
	const urlParams = new URLSearchParams(window.location.search);
	processParams(urlParams, params);
	const queryString = urlParams.toString();
	const hash = window.location.hash;
	const newUrl = queryString ? `${window.location.pathname}?${queryString}${hash}` : `${window.location.pathname}${hash}`;
	if (replace) window.history.replaceState(null, "", newUrl);
	else window.history.pushState(null, "", newUrl);
}
/**
* 处理参数到 URLSearchParams
*/
function processParams(urlParams, params) {
	for (const [key, value] of Object.entries(params)) {
		if (value === null || value === void 0) {
			urlParams.delete(key);
			continue;
		}
		if (Array.isArray(value)) {
			if (value.length > 0) urlParams.set(key, value.join(","));
			else urlParams.delete(key);
			continue;
		}
		if (typeof value === "boolean") {
			urlParams.set(key, String(value));
			continue;
		}
		if (typeof value === "number") {
			urlParams.set(key, String(value));
			continue;
		}
		if (typeof value === "string") if (value.trim() !== "") urlParams.set(key, value);
		else urlParams.delete(key);
	}
}
/**
* 从 URL 解析参数
*
* @param key 参数名
* @returns 参数值，不存在返回 null
*/
function getURLParam(key) {
	return new URLSearchParams(window.location.search).get(key);
}
/**
* 从 URL 解析数组参数
*
* @param key 参数名
* @param validValues 有效值列表（可选，用于过滤无效值）
* @returns 数组，不存在返回空数组
*/
function getURLParamArray(key, validValues) {
	const value = getURLParam(key);
	if (!value) return [];
	const values = value.split(",");
	if (validValues) return values.filter((v) => validValues.includes(v));
	return values;
}
var init_url = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/stat.ts
var init_stat = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/logout-overlay.tsx
function LogoutOverlayContent({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		style: styles.overlay,
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			style: styles.content,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(LoadingSpinnerIcon, { style: styles.spinner }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				style: styles.text,
				children: text || t("logout.loggingOut")
			})]
		})
	});
}
/**
* 显示退出登录 loading 遮罩
*
* @param text 自定义提示文本（可选）
*/
function showLogoutOverlay(text) {
	if (overlayContainer) return;
	overlayContainer = document.createElement("div");
	overlayContainer.id = "logout-overlay-root";
	document.body.appendChild(overlayContainer);
	overlayRoot = (0, import_client$1.createRoot)(overlayContainer);
	overlayRoot.render(/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(LogoutOverlayContent, { text }));
}
/**
* 隐藏退出登录 loading 遮罩
*/
function hideLogoutOverlay() {
	if (overlayRoot) {
		overlayRoot.unmount();
		overlayRoot = null;
	}
	if (overlayContainer) {
		overlayContainer.remove();
		overlayContainer = null;
	}
}
var import_client$1, import_jsx_runtime$4, styles, overlayRoot, overlayContainer;
var init_logout_overlay = __esmMin((() => {
	init_src();
	require_react();
	import_client$1 = /* @__PURE__ */ __toESM(require_client());
	init_i18n();
	import_jsx_runtime$4 = require_jsx_runtime();
	styles = {
		overlay: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: "rgba(0, 0, 0, 0.5)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: 1e4,
			backdropFilter: "blur(2px)"
		},
		content: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: "16px",
			padding: "32px 48px",
			background: "var(--cb-bg-color-container, #2d2d2d)",
			borderRadius: "12px",
			boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
		},
		spinner: {
			width: "32px",
			height: "32px",
			color: "var(--cb-text-primary, #d2d3e0)"
		},
		text: {
			fontSize: "14px",
			color: "var(--cb-text-primary, #d2d3e0)",
			fontWeight: 500
		}
	};
	overlayRoot = null;
	overlayContainer = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/errors.ts
function isCustomModel(model) {
	if (!model?.id) return false;
	if (INTERNAL_TEST_MODEL_IDS.has(model.id)) return false;
	if (model.id?.startsWith(CUSTOM_LOCAL_MODEL_PREFIX) || model.id?.startsWith(CUSTOM_MODEL_PREFIX)) return true;
	return model.configurable === true || model.vendor === "user" || model.trustLevel === "custom" || model.groupId === "custom" || model.tags?.includes("custom") === true || model.actions?.some((action) => action.id === "edit") === true;
}
function getCustomModelDisplayName(model) {
	return model?.name || model?.label || model?.id;
}
function getCustomModelConfigurationMessage(t, modelName) {
	return modelName ? t("error.customModel.authFailedWithName", { modelName }) : t("error.customModel.authFailed");
}
/**
* 自定义模型通用错误兜底文案（非 401/403 鉴权失败场景）。
*
* 用户的自定义模型来自五花八门的 OpenAI 兼容 provider，后端 category 归因常常不准
* （典型：把 provider 侧限流当成"网关 502 / 网络错误"），把错误码翻译成"网关异常"
* "额度已达上限"对用户没有排查价值——他不知道也不关心腾讯网关，他只想知道自己配的
* 模型报错了。因此除鉴权失败（走 authFailed 配置引导）外，所有自定义模型错误统一用
* 这段中性兜底文案，减少误导。
*
* 注意：Error Banner 展示的仅是 message，displayCode 保留原值，复制/反馈时后端仍能
* 拿到 Error Code + Server Detail 排查真实归因。
*/
function getCustomModelGenericErrorMessage(t, modelName) {
	return modelName ? t("error.customModel.genericErrorWithName", { modelName }) : t("error.customModel.genericError");
}
function logErrorNormalization(source, payload) {
	console.warn(`[AgentUIError] ${source}`, payload);
}
/**
* 从任意 catch 到的错误对象中提取**人类可读的错误消息**，避免在 toast / 日志中
* 出现 `[object Object]` 这类无意义文案（issue #46789）。
*
* 触发该 issue 的典型链路：
*   adapter 直连 Desktop daemon（如 `adapter.uploadTencentDocsFile`）→ Desktop preload
*   为了避免 `contextBridge` 吞掉 `Error` 自定义属性，把 `RpcError` 转成 plain
*   object envelope `{ __rpcErrorEnvelope: true, message, code, ... }` 再 reject。
*   只有走过 `createDomainProxy` 的 facade 路径才会被 `rebuildRpcError` 重建为
*   真正的 `Error`；adapter 直连路径拿到的 envelope **不是** Error 实例，业务侧
*   写 `err instanceof Error ? err.message : String(err)` 时直接走 `String(err)`
*   分支，结果就是 `[object Object]`。
*
* 该 helper 统一处理常见错误形态，业务侧 catch 块改用它即可避免：
* - `Error` 实例：取 `err.message`
* - 带 `message` 字段的 plain object（含 RpcErrorEnvelope）：取 `obj.message`
* - 字符串：直接返回
* - 其他：返回 `fallback`（默认 `'Unknown error'`），**不再** `String(obj)` 退化
*
* @param err - catch 到的任意错误
* @param fallback - 兜底文案；不传则用 `'Unknown error'`
*/
function extractErrorMessage(err, fallback = "Unknown error") {
	if (err instanceof Error) return err.message || fallback;
	if (typeof err === "string") return err || fallback;
	if (err && typeof err === "object") {
		const message = err.message;
		if (typeof message === "string" && message.length > 0) return message;
	}
	return fallback;
}
/**
* 从任意 Error 对象中提取 HTTP 状态码。
*
* 后端错误可能由不同的中间件包装，HTTP 状态码的挂载位置不统一：
* - HttpService.extractBizError() → err.httpStatus（结构化字段）
* - Axios/AxiosError          → err.response?.status
* - 原生 fetch / 其他         → err.status
* - domain unwrap()           → err.code（业务码，非 HTTP 状态码）
*
* 使用此 helper 而非直接读 err.response?.status 或 err.status，
* 避免漏掉 extractBizError 写入的结构化 httpStatus。
*
* @example
* const status = extractHttpStatus(err);
* if (status === 404) { // 资源不存在 }
*/
function extractHttpStatus(err) {
	if (!err || typeof err !== "object") return;
	const e = err;
	return e.httpStatus ?? e.response?.status ?? e.status;
}
var CUSTOM_LOCAL_MODEL_PREFIX, CUSTOM_MODEL_PREFIX, INTERNAL_TEST_MODEL_IDS, ClientError, ACPError;
var init_errors = __esmMin((() => {
	CUSTOM_LOCAL_MODEL_PREFIX = "custom-local:";
	CUSTOM_MODEL_PREFIX = "custom:";
	INTERNAL_TEST_MODEL_IDS = new Set(["custom-local:mock-server-prod", "custom:mock-server-prod"]);
	ClientError = class ClientError extends Error {
		constructor(message, code, options) {
			super(message);
			this.name = "ClientError";
			this.code = code;
			this.requestId = options?.requestId;
			this.status = options?.status;
			Object.setPrototypeOf(this, ClientError.prototype);
		}
		/**
		* 类型守卫：判断是否是 ClientError 实例
		*/
		static isClientError(error) {
			return error instanceof ClientError || error !== null && typeof error === "object" && "name" in error && error.name === "ClientError";
		}
		/**
		* 类型守卫：判断是否是 Axios 错误
		*/
		static isAxiosError(error) {
			return error !== null && typeof error === "object" && "name" in error && error.name === "AxiosError";
		}
		/**
		* 从任意错误创建 ClientError
		*
		* 自动识别错误类型：
		* - Axios 错误：从 response.data 中提取 code、msg、requestId
		* - 普通 Error：使用 message 和默认 code
		* - 其他对象：尝试提取 code、message、requestId 字段
		*
		* @param error - 捕获的错误对象
		* @param fallbackRequestId - 兜底的 requestId（当错误中没有时使用）
		* @returns ClientError 实例
		*/
		static from(error, fallbackRequestId) {
			if (ClientError.isClientError(error)) {
				if (!error.requestId && fallbackRequestId) return new ClientError(error.message, error.code, {
					requestId: fallbackRequestId,
					status: error.status
				});
				return error;
			}
			if (ClientError.isAxiosError(error)) return ClientError.fromAxiosError(error, fallbackRequestId);
			return ClientError.fromGenericError(error, fallbackRequestId);
		}
		/**
		* 从 Axios 错误创建 ClientError
		*
		* 解析优先级：
		* - code: response.data.code → response.status → error.status → 'UNKNOWN_ERROR'
		* - message: response.data.msg → response.data.message → error.message
		* - requestId: response.data.requestId → response.data.request_id
		* - status: response.status → error.status
		*/
		static fromAxiosError(error, fallbackRequestId) {
			const responseData = error.response?.data;
			return new ClientError(responseData?.msg || responseData?.message || error.message || "Unknown error", responseData?.code ?? error.response?.status ?? error.status ?? "UNKNOWN_ERROR", {
				requestId: responseData?.requestId || responseData?.request_id || fallbackRequestId,
				status: error.response?.status ?? error.status
			});
		}
		/**
		* 从普通 Error 或其他对象创建 ClientError
		*/
		static fromGenericError(error, fallbackRequestId) {
			const err = error;
			const message = err?.message || "Unknown error";
			const code = err?.code ?? "UNKNOWN_ERROR";
			const requestId = err?.requestId || err?.request_id || fallbackRequestId;
			const status = err?.status;
			return new ClientError(message, code, {
				requestId,
				status
			});
		}
	};
	ACPError = class ACPError extends Error {
		/**
		* 有效业务错误码（过滤误填入的 HTTP 状态码）
		*
		* 后端有时会把 HTTP 状态码（如 502 / 429）错误地塞进 `data.code` 字段，
		* 导致 UI 层把 HTTP 状态码误当作业务码展示（如 "Error Code: 502" 而不是 "3007"）。
		*
		* 过滤规则：
		* - 已知的 4xx 业务码（401 / 402 / 403 / 404）直接保留
		* - 5xx 服务端错误码和 429 视为 HTTP 状态码误填，过滤掉
		* - 其他 < 1000 的值不是有效业务码，过滤掉
		* - >= 1000 的视为真实业务码，保留
		*
		* 使用建议：UI 层判断"是否有业务码"时优先用 `effectiveBizCode`，
		* 保留 `bizCode` 原始值给风控判断等需要原始码的场景。
		*/
		get effectiveBizCode() {
			if (typeof this.bizCode !== "number") return;
			const code = this.bizCode;
			if (code === 401 || code === 402 || code === 403 || code === 404) return code;
			if (code === 429 || code >= 500 && code <= 599) return;
			return code >= 1e3 ? code : void 0;
		}
		constructor(message, code, options) {
			super(message);
			this.name = "ACPError";
			this.code = code;
			this.httpStatusCode = options?.httpStatusCode;
			this.bizCode = options?.bizCode;
			this.requestId = options?.requestId;
			this.serverDetail = options?.serverDetail;
			Object.setPrototypeOf(this, ACPError.prototype);
		}
		/**
		* 类型守卫：判断是否是 ACPError 实例
		*/
		static isACPError(error) {
			return error instanceof ACPError || error !== null && typeof error === "object" && "name" in error && error.name === "ACPError";
		}
		/**
		* 判断是否是限额错误
		*
		* 判断逻辑优先级：
		* 1. httpStatusCode === 429
		*    - 如果有 bizCode，验证是否为 14012 或 6004
		*    - 如果没有 bizCode，直接返回 true
		* 2. 降级方案：检查 message 是否以 "429" 开头（去除前后空格）
		*
		* @param error - 错误对象（ACPError 或任意错误对象）
		* @returns 是否是限额错误
		*
		* @example
		* ```typescript
		* // HTTP 429 + bizCode 14012
		* ACPError.isQuotaError({ httpStatusCode: 429, bizCode: 14012 }); // true
		*
		* // HTTP 429 + bizCode 6004
		* ACPError.isQuotaError({ httpStatusCode: 429, bizCode: 6004 }); // true
		*
		* // HTTP 429，无 bizCode
		* ACPError.isQuotaError({ httpStatusCode: 429 }); // true
		*
		* // HTTP 429 + 其他 bizCode（不匹配）
		* ACPError.isQuotaError({ httpStatusCode: 429, bizCode: 14001 }); // false
		*
		* // 降级：message 以 "429" 开头
		* ACPError.isQuotaError({ message: '429 本月额度已用尽' }); // true
		*
		* // 不是限额错误
		* ACPError.isQuotaError({ httpStatusCode: 500 }); // false
		* ```
		*/
		static isQuotaError(error) {
			const acpError = ACPError.isACPError(error) ? error : ACPError.from(error);
			if (acpError.httpStatusCode === 429) {
				if (acpError.bizCode !== void 0) return acpError.bizCode === 14012 || acpError.bizCode === 6004;
				return true;
			}
			if (acpError.message) return acpError.message.trim().startsWith("429");
			return false;
		}
		/**
		* 从 ACP 协议错误创建 ACPError 对象
		*
		* ACP 错误结构：
		* - code: ACP 标准错误代码 (JSON-RPC error code, 如 -32603)
		* - message: 错误描述
		* - data: 附加信息 (包含 details, statusCode, code, requestId 等)
		* - _meta: 元数据 (可能包含 requestId, statusCode, bizCode 等)
		*
		* 字段解析优先级：
		* - httpStatusCode: data.statusCode → _meta.statusCode → 从 message 中提取（如果以 "Internal error: 429" 开头）
		* - bizCode: data.code → _meta.bizCode
		* - requestId: data.requestId → _meta.requestId → error.requestId → fallback
		*
		* @param error - 捕获的错误对象
		* @param fallbackRequestId - 兜底的 requestId（当错误中没有时使用）
		* @returns ACPError 实例
		*/
		static from(error, fallbackRequestId) {
			if (ACPError.isACPError(error)) {
				if (!error.requestId && fallbackRequestId) return new ACPError(error.message, error.code, {
					httpStatusCode: error.httpStatusCode,
					bizCode: error.bizCode,
					requestId: fallbackRequestId
				});
				return error;
			}
			const err = error;
			const data = err?.data;
			const meta = err?._meta;
			const message = data?.details || err?.message || "Unknown error";
			const code = err?.code ?? "UNKNOWN_ERROR";
			let httpStatusCode = data?.statusCode ?? meta?.statusCode;
			if (!httpStatusCode && message) {
				const statusMatch = message.match(/^(?:Internal error:\s*)?(\d{3})\s/);
				if (statusMatch) httpStatusCode = parseInt(statusMatch[1], 10);
			}
			const bizCode = data?.code ?? meta?.bizCode;
			const requestId = data?.requestId || meta?.requestId || err?.requestId || fallbackRequestId;
			return new ACPError(message, code, {
				httpStatusCode,
				bizCode,
				requestId
			});
		}
		/**
		* 根据 ACP stopReason 创建错误对象（如果需要显示错误）
		*
		* ACP 官方 stopReason 定义：
		* @see https://agentclientprotocol.com/protocol/prompt-turn#stop-reasonssss
		*
		* - end_turn: 正常完成，不需要显示错误
		* - cancelled: 用户取消，不需要显示错误
		* - max_tokens: 达到最大 token 限制，需要提示用户
		* - max_turn_requests: 超过最大轮次，需要提示用户
		* - refusal: Agent 拒绝执行，需要提示用户
		*
		* 当 `stopReason === 'refusal'` 且 `errorMessageMeta` 提供了来自 ACP SDK
		* `RequestError.toErrorResponse()` 的 JSON 字符串时（JSON-RPC 2.0 形态
		* `{ code, message, data: { category?, statusCode?, code?, details? } }`），
		* 会尽量映射回既有错误码体系，便于 UI 复用历史错误码文案：
		*
		* - 优先保留服务端原始 `bizCode`
		* - HTTP 402 / 404 → 保留原始状态码
		* - `quota` / HTTP 429 → `6004`
		* - `auth` / HTTP 401|403 → `3001` / `3004`
		* - `network` / HTTP 408|502|503|504 / 流超时 → `3002` / `3003` / `3007`
		* - `model_service` → `11105`
		* - `internal` / HTTP 5xx → `10000`
		* - 其他 → `REFUSAL`
		*
		* @param stopReason - ACP stopReason 值
		* @param t - 翻译函数，用于国际化错误消息
		* @param requestId - 可选的请求 ID
		* @param serverMessage - 可选的 `_meta['codebuddy.ai/errorMessage']` 原始字符串，
		*   用于 refusal 的精细化分类和错误详情透传。
		* @returns ACPError 实例，如果不需要显示错误则返回 null
		*/
		static fromStopReason(stopReason, t, requestId, serverMessage, context) {
			if (!stopReason || stopReason === "end_turn" || stopReason === "cancelled") return null;
			const serverDetail = typeof serverMessage === "string" && serverMessage.trim().length > 0 ? serverMessage : void 0;
			logErrorNormalization("ACPError.fromStopReason", {
				stopReason,
				requestId,
				hasServerDetail: !!serverDetail,
				isCustomModel: isCustomModel(context?.model),
				modelId: context?.model?.id
			});
			switch (stopReason) {
				case "max_tokens": return new ACPError(t("error.stopReason.maxTokens"), "MAX_TOKENS", {
					requestId,
					serverDetail
				});
				case "max_turn_requests": return new ACPError(t("error.stopReason.maxTurnRequests"), "MAX_TURN_REQUESTS", {
					requestId,
					serverDetail
				});
				case "refusal": return ACPError.buildRefusalError(t, requestId, serverDetail, context);
				default: return new ACPError(t("error.stopReason.unknown", { stopReason }), "UNKNOWN_STOP_REASON", {
					requestId,
					serverDetail
				});
			}
		}
		/**
		* 解析后端通过 `_meta['codebuddy.ai/errorMessage']` 下发的 JSON-RPC 错误体，
		* 并把 `refusal` 尽量映射回既有错误码体系。
		*
		* 展示优先级：
		* 1. `data.details`（后端给的最具体错误描述，例如 "Request completed unexpectedly..."）
		* 2. `message`（JSON-RPC 顶层 message）
		* 3. 历史错误码或 refusal 对应的兜底文案
		*
		* 自定义模型 401 鉴权失败会改用配置引导文案，帮助用户定位 API Key、模型 ID 或接口地址配置问题。
		* 其他场景下，后端给出具体 errorMessage 时，UI 展示的是具体消息而不是通用话术；
		* 后端未给（老客户端、纯 stopReason=refusal）时，仍能复用已有错误码文案。
		*/
		static buildRefusalError(t, requestId, serverDetail, context) {
			const parsed = ACPError.parseErrorMessageMeta(serverDetail);
			const category = parsed?.data?.category;
			const statusCode = parsed?.data?.statusCode;
			let displayMessage = ACPError.extractServerDisplayMessage(parsed, serverDetail);
			const rawCode = parsed?.data?.code;
			const bizCode = typeof rawCode === "number" ? rawCode : void 0;
			const resolved = ACPError.resolveRefusalDisplayCode({
				category,
				statusCode,
				bizCode,
				details: displayMessage
			});
			const displayCode = resolved.code;
			const subKey = resolved.subKey;
			if (isCustomModel(context?.model) && ACPError.isCustomModelAuthRefusal(category, statusCode, context?.model)) displayMessage = getCustomModelConfigurationMessage(t, getCustomModelDisplayName(context?.model));
			if (displayCode === 3002 || displayCode === 3003 || displayCode === 3007) displayMessage = void 0;
			const makeOptions = () => ({
				httpStatusCode: statusCode,
				bizCode,
				requestId,
				serverDetail
			});
			const fallbackMessage = displayCode === "REFUSAL" ? ACPError.fallbackGenericRefusalMessage(t) : ACPError.fallbackDisplayMessageForCode(displayCode, t, subKey);
			const isCustomModelAuth = isCustomModel(context?.model) && ACPError.isCustomModelAuthRefusal(category, statusCode, context?.model);
			let finalMessage = isCustomModelAuth || displayCode === 6004 || displayCode === 14019 || displayCode === 11145 ? displayMessage || fallbackMessage : fallbackMessage || displayMessage || fallbackMessage;
			if (isCustomModel(context?.model) && !isCustomModelAuth) finalMessage = getCustomModelGenericErrorMessage(t, getCustomModelDisplayName(context?.model));
			logErrorNormalization("ACPError.buildRefusalError", {
				displayCode,
				subKey,
				category,
				statusCode,
				bizCode,
				requestId,
				hasDisplayMessage: !!displayMessage,
				hasServerDetail: !!serverDetail,
				isCustomModel: isCustomModel(context?.model),
				modelId: context?.model?.id
			});
			return new ACPError(finalMessage, displayCode, makeOptions());
		}
		/**
		* 安全解析 `_meta['codebuddy.ai/errorMessage']`。
		*
		* 支持三种形态：
		* 1. 新协议：JSON 字符串，JSON-RPC 2.0 `{ code, message, data }`
		* 2. 旧协议：JSON 字符串，`{ details, statusCode, code }`
		* 3. 纯字符串：直接当作 details
		*/
		static parseErrorMessageMeta(meta) {
			if (!meta) return;
			try {
				const obj = JSON.parse(meta);
				if (obj && typeof obj === "object") {
					if ("code" in obj && "message" in obj) {
						const data = obj.data && typeof obj.data === "object" ? obj.data : void 0;
						return {
							code: typeof obj.code === "number" ? obj.code : void 0,
							message: typeof obj.message === "string" ? obj.message : void 0,
							data: data ? {
								details: typeof data.details === "string" ? data.details : void 0,
								statusCode: typeof data.statusCode === "number" ? data.statusCode : void 0,
								code: typeof data.code === "number" ? data.code : void 0,
								category: typeof data.category === "string" ? data.category : void 0
							} : void 0
						};
					}
					return { data: {
						details: typeof obj.details === "string" ? obj.details : void 0,
						statusCode: typeof obj.statusCode === "number" ? obj.statusCode : void 0,
						code: typeof obj.code === "number" ? obj.code : void 0
					} };
				}
			} catch {
				return { data: { details: meta } };
			}
		}
		/**
		* 从服务端原始错误文案中提取可直接给用户看的完整错误信息。
		* 优先使用结构化字段中的 details，其次使用 message，最后回退到原始字符串。
		*/
		static extractServerDisplayMessage(parsed, raw) {
			const details = parsed?.data?.details?.trim();
			if (details) return details;
			const message = parsed?.message?.trim();
			if (message) return message;
			return raw?.trim() || void 0;
		}
		/**
		* 判断是否是自定义模型鉴权失败。
		*
		* 匹配后端注入的两种 category：
		* - 'auth'：标准鉴权失败（兼容旧路径）
		* - 'custom_model_auth'：后端 error-analyzer 为自定义模型 401/403 注入的 marker
		*/
		static isCustomModelAuthRefusal(category, statusCode, model) {
			return (category === "auth" || category === "custom_model_auth") && (statusCode === 401 || statusCode === 403) && isCustomModel(model);
		}
		/**
		* 将 refusal 路径尽量映射回既有错误码体系，优先保留服务端原始 bizCode。
		*
		* 同时按 details 关键词分桶产出 subKey，用于选取更细粒度的 i18n 文案
		*（如 502 → 3007 中按 proxyRefused / dnsFailed / socketHangUp 等子形态分桶）。
		*/
		static resolveRefusalDisplayCode(params) {
			const { category, statusCode, details, bizCode } = params;
			if (category === "quota" && (bizCode === 6004 || bizCode === 14019)) return { code: bizCode };
			if (bizCode === 11145) return { code: 11145 };
			if (statusCode === 402 || statusCode === 404) return { code: statusCode };
			const normalizedDetails = details?.toLowerCase() || "";
			if (category === "auth" || statusCode === 401 || statusCode === 403) {
				if (normalizedDetails.includes("api key")) return { code: 3001 };
				return { code: 3004 };
			}
			const isGatewayStatus = statusCode === 502 || statusCode === 503 || statusCode === 504;
			const isTimeout = statusCode === 408 || normalizedDetails.includes("timeout") || normalizedDetails.includes("timed out") || normalizedDetails.includes("超时");
			if (category === "network" || isGatewayStatus || isTimeout) {
				if (isGatewayStatus) return {
					code: 3007,
					subKey: ACPError.resolveGatewaySubKey(statusCode, details)
				};
				if (isTimeout) return { code: 3003 };
				return { code: 3002 };
			}
			if (category === "model_service") return { code: 11105 };
			if (category === "internal" || typeof statusCode === "number" && statusCode >= 500) return { code: 1e4 };
			return { code: "REFUSAL" };
		}
		/**
		* 根据网关错误码与 details 关键词产出子形态 key（PRD §3.4）。
		*
		* 覆盖 502 的 5 种子形态：
		* - proxyRefused: 代理拒绝连接（ECONNREFUSED + proxy）
		* - dnsFailed: DNS 解析失败（ENOTFOUND / getaddrinfo）
		* - socketHangUp: 连接中断（socket hang up）
		* - proxyConflict: 代理配置冲突
		* - default: 通用网关错误
		*/
		static resolveGatewaySubKey(statusCode, details) {
			if (!details) return;
			const d = details.toLowerCase();
			if (d.includes("econnrefused") && (d.includes("proxy") || d.includes("代理"))) return "proxyRefused";
			if (d.includes("enotfound") || d.includes("getaddrinfo") || d.includes("dns")) return "dnsFailed";
			if (d.includes("socket hang up") || d.includes("socket hangup")) return "socketHangUp";
			if (d.includes("proxy conflict") || d.includes("proxyconflict")) return "proxyConflict";
		}
		/**
		* 当 refusal 没有命中历史错误码时，优先使用中性兜底文案。
		* 若多语言资源尚未补齐 `error.stopReason.generic`，则退回 refusal 文案。
		*/
		static fallbackGenericRefusalMessage(t) {
			const genericMessage = t("error.stopReason.generic");
			return genericMessage !== "error.stopReason.generic" ? genericMessage : t("error.stopReason.refusal");
		}
		/**
		* 当 refusal 被映射到既有错误码后，回退到旧文案体系。
		* 若存在子形态 key（如 502.proxyRefused），优先使用细粒度文案，回退到 `errorCode.${code}`。
		*/
		static fallbackDisplayMessageForCode(code, t, subKey) {
			if (typeof code === "number" || /^\d+$/.test(String(code))) {
				if (subKey) {
					const subMessage = t(`errorCode.${code}.${subKey}`);
					if (subMessage !== `errorCode.${code}.${subKey}`) return subMessage;
				}
				return t(`errorCode.${code}`);
			}
			return t("error.stopReason.refusal");
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/logger.ts
/**
* 创建防抖日志函数
* 在指定延迟内只输出最后一次调用的日志
*
* @param delay 延迟时间（毫秒）
* @returns 防抖后的 console.log 函数
*
* @example
* // 在组件外部创建（避免每次渲染重建）
* const logRender = createDebouncedLogger(400);
*
* function MyComponent() {
*     logRender('[MyComponent] render', props);
*     return <div>...</div>;
* }
*/
function createDebouncedLogger(delay = 400) {
	return debounce((...args) => console.log(...args), delay);
}
/**
* 创建节流日志函数
* 在指定时间间隔内只输出第一次调用的日志
*
* @param interval 时间间隔（毫秒）
* @returns 节流后的 console.log 函数
*
* @example
* // 高频事件日志
* const logScroll = createThrottledLogger(100);
* window.addEventListener('scroll', () => logScroll('scrollY:', window.scrollY));
*/
function createThrottledLogger(interval = 400) {
	return throttle((...args) => console.log(...args), interval);
}
var init_logger = __esmMin((() => {
	init_timing();
	createDebouncedLogger(400);
	createThrottledLogger(400);
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/compact-mode.ts
/**
* 清理旧版本遗留的 localStorage key。
* 旧版本升级后首次加载时自动执行，避免残留数据。
*/
function cleanupLegacyStorage() {
	if (typeof localStorage !== "undefined") localStorage.removeItem(COMPACT_MODE_STORAGE_KEY);
}
/**
* 获取简洁模式状态 — 永远返回 true
*/
function getCompactMode() {
	return true;
}
var COMPACT_MODE_STORAGE_KEY;
var init_compact_mode = __esmMin((() => {
	COMPACT_MODE_STORAGE_KEY = "CODEBUDDY_COMPACT_MODE";
	cleanupLegacyStorage();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/trace-id.ts
/**
* Trace ID 工具（full-link-trace-context）。
* Renderer 在用户发送时生成 traceId，经 ACP `_meta['codebuddy.ai'].traceId` 透传到 CLI。
* 与 cli 端 `isValidW3CTraceId` 校验规则保持一致。
*/
/**
* 生成 32 位小写 hex 的 W3C trace-id（128 bit）。
* 优先 `crypto.randomUUID` → `crypto.getRandomValues` → `Math.random`（兜底）。
*/
function genTraceId() {
	const cryptoObj = typeof globalThis !== "undefined" && globalThis.crypto ? globalThis.crypto : void 0;
	if (cryptoObj?.randomUUID) return cryptoObj.randomUUID().replace(/-/g, "").toLowerCase();
	if (cryptoObj?.getRandomValues) {
		const bytes = new Uint8Array(16);
		cryptoObj.getRandomValues(bytes);
		let hex = "";
		for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, "0");
		return hex;
	}
	let fallback = "";
	for (let i = 0; i < 32; i++) fallback += Math.floor(Math.random() * 16).toString(16);
	return fallback;
}
var init_trace_id = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/project-local-task.ts
/**
* 项目内本地任务的唯一 UI 判据。
* 调用方应只在 project task 场景使用；普通本地会话没有 projectId，不应靠 source 判断。
*/
function isProjectLocalTask(value) {
	if (!value?.projectId) return false;
	if (value.conversationOrigin === "local" || value.source === "local") return true;
	if (value.isPlayground === true) return true;
	return isLikelyLocalPath(value.cwd);
}
function isLikelyLocalPath(cwd) {
	if (!cwd) return false;
	return cwd.startsWith("/") || /^[A-Za-z]:[\\/]/.test(cwd);
}
/** 项目内云端任务判据：有关联项目，且没有显式 local 来源。 */
function isProjectCloudTask(value) {
	return !!value?.projectId && !isProjectLocalTask(value);
}
var init_project_local_task = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/index.ts
var init_utils = __esmMin((() => {
	init_environment();
	init_theme();
	init_useTheme();
	init_clipboard();
	init_download();
	init_upload_cache();
	init_format();
	init_url();
	init_stat();
	init_logout_overlay();
	init_errors();
	init_timing();
	init_logger();
	init_file_path();
	init_compact_mode();
	init_basename();
	init_trace_id();
	init_project_local_task();
	init_auth_expired_detector();
	init_product_features();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/cross-tab-auth.ts
/**
* 处理收到的跨标签页消息
*/
function handleMessage(event) {
	const { type } = event.data;
	switch (type) {
		case "login":
			if (options.onRefreshAccount) options.onRefreshAccount().catch((error) => {
				console.error("[CrossTabAuth] Failed to refresh account:", error);
			});
			break;
		case "logout":
			isPassiveLogout = true;
			if (options.onLogout) options.onLogout();
			break;
		default: console.warn(`[CrossTabAuth] Unknown message type: ${type}`);
	}
}
/**
* 初始化跨标签页认证同步
*
* @param opts 配置选项
*/
function initCrossTabAuth(opts) {
	if (typeof BroadcastChannel === "undefined") {
		console.warn("[CrossTabAuth] BroadcastChannel not supported");
		return;
	}
	if (channel) return;
	options = opts;
	channel = new BroadcastChannel(CHANNEL_NAME);
	channel.onmessage = handleMessage;
}
/**
* 销毁跨标签页认证同步
*/
function destroyCrossTabAuth() {
	if (channel) {
		channel.close();
		channel = null;
		options = {};
		isPassiveLogout = false;
	}
}
/**
* 广播登录消息到其他标签页
*/
function broadcastLogin() {
	if (!channel) return;
	isPassiveLogout = false;
	const message = {
		type: "login",
		timestamp: Date.now()
	};
	channel.postMessage(message);
}
/**
* 广播登出消息到其他标签页
* 如果当前标签页是被动登出（收到其他标签页的 logout），则不广播
*/
function broadcastLogout() {
	if (!channel) return;
	if (isPassiveLogout) return;
	const message = {
		type: "logout",
		timestamp: Date.now()
	};
	channel.postMessage(message);
}
var CHANNEL_NAME, channel, options, isPassiveLogout;
var init_cross_tab_auth = __esmMin((() => {
	CHANNEL_NAME = "genie-auth-channel";
	channel = null;
	options = {};
	isPassiveLogout = false;
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/signed-out-dialog.tsx
function SignedOutDialogContent({ onConfirm, onClose }) {
	const [visible, setVisible] = (0, import_react$8.useState)(true);
	const handleConfirm = () => {
		setVisible(false);
		onConfirm();
	};
	const handleClose = () => {
		setVisible(false);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ConfirmDialog, {
		visible,
		title: t("crossTabAuth.signedOutTitle"),
		content: t("crossTabAuth.signedOutContent"),
		confirmText: t("crossTabAuth.signIn"),
		cancelText: t("common.cancel"),
		onConfirm: handleConfirm,
		onClose: handleClose
	});
}
/**
* 显示跨标签页登出提示弹窗
*
* @param onSignIn 点击登录按钮时的回调
*/
function showSignedOutDialog(onSignIn) {
	if (dialogContainer) return;
	dialogContainer = document.createElement("div");
	dialogContainer.id = "signed-out-dialog-root";
	document.body.appendChild(dialogContainer);
	dialogRoot = (0, import_client.createRoot)(dialogContainer);
	const handleConfirm = () => {
		hideSignedOutDialog();
		onSignIn();
	};
	dialogRoot.render(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SignedOutDialogContent, {
		onConfirm: handleConfirm,
		onClose: hideSignedOutDialog
	}));
}
/**
* 隐藏跨标签页登出提示弹窗
*/
function hideSignedOutDialog() {
	if (dialogRoot) {
		dialogRoot.unmount();
		dialogRoot = null;
	}
	if (dialogContainer) {
		dialogContainer.remove();
		dialogContainer = null;
	}
}
var import_react$8, import_client, import_jsx_runtime$3, dialogRoot, dialogContainer;
var init_signed_out_dialog = __esmMin((() => {
	init_src();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	import_client = /* @__PURE__ */ __toESM(require_client());
	init_i18n();
	import_jsx_runtime$3 = require_jsx_runtime();
	dialogRoot = null;
	dialogContainer = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/auth-context.tsx
/**
* Auth Provider
*
* 订阅 accountService，提供 React 组件访问账号状态
* 支持跨标签页登出同步
*/
function AuthProvider({ children, backendProvider }) {
	const isEmbeddedEnvironment = getEnvironmentType() === "ide";
	const [account, setAccount] = (0, import_react$7.useState)(() => accountService.getAccount());
	const [status, setStatus] = (0, import_react$7.useState)(() => {
		if (!accountService.isInitialized()) return "loading";
		return accountService.isLoggedIn() ? "authenticated" : "unauthenticated";
	});
	const isRefreshingRef = (0, import_react$7.useRef)(false);
	/**
	* 登录
	*/
	const login = (0, import_react$7.useCallback)(async () => {
		if (!backendProvider) {
			console.warn("[AuthProvider] Cannot login: backendProvider not available");
			return;
		}
		await backendProvider.login();
	}, [backendProvider]);
	/**
	* 注入"打开登录流程"回调到登录失效检测工具。
	*
	* detector（utils 层）不允许反向依赖 backendProvider，所以由 AuthProvider 在
	* backendProvider 就绪后注册一次：引导弹窗 / 左下角"点击登录"点击时走这里的 login()。
	*/
	(0, import_react$7.useEffect)(() => {
		if (!backendProvider) return;
		return registerAuthExpiredSignInHandler(() => {
			backendProvider.login();
		});
	}, [backendProvider]);
	/**
	* 重新登录成功后复位全局登录失效态。
	*
	* 背景（Desktop 专属）：登录失效引导弹窗点"立即重新登录"后，重登通常是同一 uid。
	* accountService.setAccount 在 uid 未变化时不会通知订阅者（见 account-service 的 notify gate），
	* 导致依赖 account 订阅的 clearAuthExpired 不触发，左下角一直卡在"点击登录"。
	* 这里直接监听主进程推送的登录态变化（auth:statusChanged{loggedIn:true}），
	* 登录成功即显式复位失效态并关闭残留弹窗。Web 端登录走整页跳转、reload 后状态自然重置，
	* 不会收到该事件，因此此监听对 Web 是无副作用的兜底。
	*/
	(0, import_react$7.useEffect)(() => {
		if (!backendProvider?.on) return;
		return backendProvider.on("auth:statusChanged", (data) => {
			if (data?.loggedIn) clearAuthExpired();
		});
	}, [backendProvider]);
	/**
	* 初始化跨标签页认证同步（仅浏览器环境）
	*/
	(0, import_react$7.useEffect)(() => {
		if (isEmbeddedEnvironment) return;
		accountService.setCrossTabBroadcaster({
			broadcastLogin,
			broadcastLogout
		});
		initCrossTabAuth({
			onRefreshAccount: async () => {
				if (backendProvider) await backendProvider.getAccount();
				hideSignedOutDialog();
			},
			onLogout: () => {
				if (!accountService.getAccount()) return;
				accountService.clearAccountSilently();
				showSignedOutDialog(() => {
					if (backendProvider) backendProvider.login();
				});
			}
		});
		return () => {
			accountService.setCrossTabBroadcaster(null);
			destroyCrossTabAuth();
		};
	}, [backendProvider, isEmbeddedEnvironment]);
	/**
	* 订阅 accountService 变化
	*/
	(0, import_react$7.useEffect)(() => {
		const unsubscribe = accountService.subscribe((newAccount) => {
			setAccount(newAccount);
			setStatus(newAccount ? "authenticated" : "unauthenticated");
			if (newAccount) clearAuthExpired();
		});
		accountService.waitForInit().then(() => {
			setStatus(accountService.isLoggedIn() ? "authenticated" : "unauthenticated");
			setAccount(accountService.getAccount());
		});
		return unsubscribe;
	}, []);
	/**
	* 初始加载账号信息
	*/
	(0, import_react$7.useEffect)(() => {
		if (!backendProvider) return;
		if (accountService.isInitialized()) return;
		const loadAccount = async () => {
			const startTime = performance.now();
			writeRendererLog("startup-perf", "info", "AuthProvider getAccount start");
			try {
				await backendProvider.getAccount();
				writeRendererLog("startup-perf", "info", `AuthProvider getAccount done in ${(performance.now() - startTime).toFixed(0)}ms`);
			} catch (error) {
				console.error("[AuthProvider] Failed to load initial account:", error);
				writeRendererLog("startup-perf", "warn", `AuthProvider getAccount failed after ${(performance.now() - startTime).toFixed(0)}ms: ${error instanceof Error ? error.message : String(error)}`);
				accountService.setAccount(null);
			}
		};
		loadAccount();
	}, [backendProvider]);
	/**
	* Cloud 模式下的 Token 自动刷新机制
	* 包括：页面可见性变化刷新 + 定时刷新 + 用户活动刷新
	*/
	(0, import_react$7.useEffect)(() => {
		if (isEmbeddedEnvironment || !backendProvider) return;
		const handleVisibilityChange = async () => {
			if (!document.hidden && !isRefreshingRef.current) {
				isRefreshingRef.current = true;
				try {
					console.log("[AuthProvider] Page became visible, refreshing token...");
					if (backendProvider.refreshToken) await backendProvider.refreshToken();
					else await backendProvider.getAccount();
					console.log("[AuthProvider] Visibility refresh token success");
				} catch (error) {
					console.error("[AuthProvider] Failed to refresh token on visibility change:", error);
				} finally {
					isRefreshingRef.current = false;
				}
			}
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		let refreshInterval = null;
		if (account) {
			console.log("[AuthProvider] Starting auto token refresh timer (25 minutes)");
			refreshInterval = setInterval(async () => {
				if (!isRefreshingRef.current) {
					isRefreshingRef.current = true;
					try {
						console.log("[AuthProvider] Auto refreshing token...");
						if (backendProvider.refreshToken) await backendProvider.refreshToken();
						else await backendProvider.getAccount();
						console.log("[AuthProvider] Auto refresh token success");
					} catch (error) {
						console.error("[AuthProvider] Auto refresh token failed:", error);
					} finally {
						isRefreshingRef.current = false;
					}
				}
			}, 1500 * 1e3);
		}
		let lastActivityTime = Date.now();
		const ACTIVITY_THRESHOLD = 1200 * 1e3;
		const handleUserActivity = async () => {
			if (!account) return;
			const now = Date.now();
			if (now - lastActivityTime > ACTIVITY_THRESHOLD && !isRefreshingRef.current) {
				isRefreshingRef.current = true;
				try {
					console.log("[AuthProvider] User activity after long idle, refreshing token...");
					if (backendProvider.refreshToken) await backendProvider.refreshToken();
					else await backendProvider.getAccount();
					console.log("[AuthProvider] Activity refresh token success");
				} catch (error) {
					console.error("[AuthProvider] Activity refresh token failed:", error);
				} finally {
					isRefreshingRef.current = false;
				}
			}
			lastActivityTime = now;
		};
		const activityEvents = [
			"mousedown",
			"mousemove",
			"keypress",
			"scroll",
			"touchstart",
			"click"
		];
		if (account) {
			activityEvents.forEach((event) => {
				document.addEventListener(event, handleUserActivity, { passive: true });
			});
			console.log("[AuthProvider] Started user activity monitoring");
		}
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			if (refreshInterval) {
				console.log("[AuthProvider] Clearing auto token refresh timer");
				clearInterval(refreshInterval);
			}
			activityEvents.forEach((event) => {
				document.removeEventListener(event, handleUserActivity);
			});
			if (account) console.log("[AuthProvider] Stopped user activity monitoring");
		};
	}, [
		backendProvider,
		account,
		isEmbeddedEnvironment
	]);
	/**
	* 登出
	*/
	const logout = (0, import_react$7.useCallback)(async () => {
		if (!backendProvider) {
			console.warn("[AuthProvider] Cannot logout: backendProvider not available");
			return;
		}
		showLogoutOverlay();
		try {
			await backendProvider.logout();
		} finally {
			hideLogoutOverlay();
			clearAuthExpired();
		}
	}, [backendProvider]);
	const isLoading = status === "loading";
	const isAuthenticated = status === "authenticated";
	const contextValue = (0, import_react$7.useMemo)(() => ({
		account,
		status,
		isLoading,
		isAuthenticated,
		login,
		logout,
		hasBilling: true
	}), [
		account,
		status,
		isLoading,
		isAuthenticated,
		login,
		logout
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AuthContext.Provider, {
		value: contextValue,
		children
	});
}
/**
* 获取认证状态和方法
*
* @example
* ```tsx
* function MyComponent() {
*     const { account, isAuthenticated, login, logout } = useAuth();
*
*     if (!isAuthenticated) {
*         return <button onClick={login}>Sign In</button>;
*     }
*
*     return (
*         <div>
*             <span>Hello, {account?.nickname}</span>
*             <button onClick={logout}>Sign Out</button>
*         </div>
*     );
* }
* ```
*/
function useAuth() {
	const context = (0, import_react$7.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
/**
* 获取当前账号（可能为 null）
*
* 比 useAuth 更轻量，仅获取账号信息
*/
function useCurrentAccount() {
	const { account } = useAuth();
	return account;
}
/**
* 直接使用 accountService 的 hook（无需 Provider）
*
* 适用于不需要登录/登出功能，只需要读取账号信息的场景
*/
function useAccountService() {
	const [account, setAccount] = (0, import_react$7.useState)(() => accountService.getAccount());
	const [isInitialized, setIsInitialized] = (0, import_react$7.useState)(() => accountService.isInitialized());
	(0, import_react$7.useEffect)(() => {
		const unsubscribe = accountService.subscribe((newAccount) => {
			setAccount(newAccount);
			setIsInitialized(true);
		});
		if (!accountService.isInitialized()) accountService.waitForInit().then(() => {
			setIsInitialized(true);
			setAccount(accountService.getAccount());
		});
		return unsubscribe;
	}, []);
	return {
		account,
		isInitialized,
		isLoggedIn: account !== null
	};
}
var import_react$7, import_jsx_runtime$2, AuthContext;
var init_auth_context = __esmMin((() => {
	init_common();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_utils();
	init_auth_expired_detector();
	init_cross_tab_auth();
	init_http_logger();
	init_logout_overlay();
	init_signed_out_dialog();
	import_jsx_runtime$2 = require_jsx_runtime();
	AuthContext = (0, import_react$7.createContext)(void 0);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/use-idle-timeout-check.ts
/**
* Claw idle timeout 检查逻辑
*
* 发消息前调用 checkAndHandleIdleTimeout，如果超时自动插入分割线
*/
function useIdleTimeoutCheck(params) {
	const { isClawView, currentConversation, clearSession, isLastMessageSeparator, storage } = params;
	const insertingRef = (0, import_react$6.useRef)(false);
	return { checkAndHandleIdleTimeout: (0, import_react$6.useCallback)(async (hasValidContent) => {
		if (!isWorkBuddy() || !isClawView || !hasValidContent || !currentConversation) return;
		if (currentConversation?.id) storage.saveActiveConversationId(currentConversation.id);
		const idleTimeout = storage.getIdleTimeoutMs();
		if (idleTimeout === null) return;
		const now = Date.now();
		const lastAiReply = storage.getLastAiReplyTime();
		const isOverdue = lastAiReply > 0 && now - lastAiReply > idleTimeout;
		console.log("[ClawIdle] check: idleTimeout=", idleTimeout, "lastAiReply=", lastAiReply ? new Date(lastAiReply).toLocaleTimeString() : "none", "elapsed=", lastAiReply ? Math.round((now - lastAiReply) / 1e3) + "s" : "n/a", "isOverdue=", isOverdue);
		if (!isOverdue || isLastMessageSeparator() || insertingRef.current) return;
		insertingRef.current = true;
		try {
			storage.updateLastAiReplyTime();
			console.log("[ClawIdle] overdue, inserting auto separator");
			await clearSession({
				isAutoSeparator: true,
				waitForPersist: true
			});
		} catch (err) {
			console.error("[ClawIdle] clearSession failed:", err);
		} finally {
			insertingRef.current = false;
		}
	}, [
		isClawView,
		currentConversation,
		clearSession,
		isLastMessageSeparator,
		storage
	]) };
}
var import_react$6;
var init_use_idle_timeout_check = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_environment();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/use-idle-timeout-storage.ts
/**
* 管理 Claw idle timeout 相关的 localStorage 读写
*/
function useIdleTimeoutStorage() {
	/** 读取 idle timeout 毫秒数，返回 null 表示禁用 */
	const getIdleTimeoutMs = (0, import_react$5.useCallback)(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEYS.idleTimeout);
			if (saved === null) return 6 * IDLE_TIMEOUT_UNIT_MS;
			const value = parseInt(saved, 10);
			if (isNaN(value) || value <= 0) return null;
			return value * IDLE_TIMEOUT_UNIT_MS;
		} catch {
			return null;
		}
	}, []);
	/** 读取上次 AI 回复时间戳，返回 0 表示未记录 */
	const getLastAiReplyTime = (0, import_react$5.useCallback)(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEYS.lastAiReplyTime);
			return saved ? parseInt(saved, 10) || 0 : 0;
		} catch {
			return 0;
		}
	}, []);
	/** 保存当前发消息的 conversationId，供 claw-session-ready 事件判断时使用 */
	const saveActiveConversationId = (0, import_react$5.useCallback)((conversationId) => {
		try {
			localStorage.setItem(STORAGE_KEYS.activeConversationId, conversationId);
		} catch {}
	}, []);
	return {
		getIdleTimeoutMs,
		getLastAiReplyTime,
		updateLastAiReplyTime: (0, import_react$5.useCallback)(() => {
			try {
				localStorage.setItem(STORAGE_KEYS.lastAiReplyTime, String(Date.now()));
			} catch {}
		}, []),
		saveActiveConversationId
	};
}
var import_react$5, IDLE_TIMEOUT_UNIT_MS, STORAGE_KEYS;
var init_use_idle_timeout_storage = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	IDLE_TIMEOUT_UNIT_MS = 36e5;
	STORAGE_KEYS = {
		idleTimeout: "claw.idleTimeout",
		lastAiReplyTime: "claw.lastAiReplyTime",
		activeConversationId: "claw.activeConversationId"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/use-session-separator.ts
/**
* 管理 session separator（分割线）的创建和插入
*
* - clearSession: 创建分割线消息，同步到 UI state，并按需等待后端持久化
* - isLastMessageSeparator: 检查最后一条消息是否为分割线（手动或自动）
*/
function useSessionSeparator(params) {
	const { adapter, addOrUpdateMessage, currentConversation } = params;
	return {
		clearSession: (0, import_react$4.useCallback)(async (opts) => {
			console.log("[clear context] clearSession called, currentConversation:", currentConversation?.id);
			if (!currentConversation) throw new Error("[useSessionSeparator] currentConversation not available");
			const messageId = `session-separator-${Date.now()}`;
			const createTime = Date.now();
			const extra = {
				isSessionSeparator: true,
				createTime,
				...opts?.isAutoSeparator ? { isAutoSeparator: true } : {}
			};
			const separatorMessage = {
				id: messageId,
				requestId: "",
				conversationId: currentConversation.id,
				messageType: MessageType.SYSTEM,
				createTime,
				complete: true,
				content: "",
				extra
			};
			if (addOrUpdateMessage) {
				console.log("[clear context] injecting separator to UI state, messageId:", messageId);
				addOrUpdateMessage(currentConversation.id, separatorMessage);
			}
			if (adapter?.injectSystemMessage) {
				console.log("[clear context] persisting separator to backend, conversationId:", currentConversation.id);
				const persistPromise = adapter.injectSystemMessage({
					conversationId: currentConversation.id,
					messageId,
					content: "",
					extra,
					createTime: separatorMessage.createTime
				});
				if (opts?.waitForPersist) {
					const result = await persistPromise;
					console.log("[clear context] persist result:", result);
					if (!result.success) throw new Error(result.error || "[useSessionSeparator] persist separator failed");
				} else persistPromise.then((result) => {
					console.log("[clear context] persist result:", result);
				}).catch((err) => {
					console.error("[clear context] persist separator failed:", err);
				});
			} else console.warn("[clear context] adapter.injectSystemMessage not available");
			return currentConversation.id;
		}, [
			adapter,
			addOrUpdateMessage,
			currentConversation
		]),
		isLastMessageSeparator: (0, import_react$4.useCallback)(() => {
			const messages = currentConversation?.messages || [];
			return !!messages[messages.length - 1]?.extra?.isSessionSeparator;
		}, [currentConversation?.messages])
	};
}
var import_react$4;
var init_use_session_separator = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_chat_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/use-claw-session-management.ts
/**
* Claw session 管理：分割线创建 + idle timeout 检查
*
* 供 useClearCommand 使用，不直接在 MainContentCore 里调用。
*/
function useClawSessionManagement(params) {
	const { adapter, addOrUpdateMessage, currentConversation, isClawView } = params;
	const t = useTranslation();
	const storage = useIdleTimeoutStorage();
	const { clearSession, isLastMessageSeparator } = useSessionSeparator({
		adapter,
		addOrUpdateMessage,
		currentConversation
	});
	const { checkAndHandleIdleTimeout } = useIdleTimeoutCheck({
		isClawView,
		currentConversation,
		clearSession,
		isLastMessageSeparator,
		storage
	});
	/** /clear 命令相关 CBChat props，可直接展开使用 */
	const clearCommandConfig = (0, import_react$3.useMemo)(() => {
		const enableClearCommand = isWorkBuddy() && isClawView;
		return {
			enableClearCommand,
			onClearSession: enableClearCommand ? async () => {
				await clearSession();
				toast.success(t("chat.clearSession.toast"));
			} : void 0
		};
	}, [
		isClawView,
		clearSession,
		t
	]);
	return {
		clearSession,
		checkAndHandleIdleTimeout,
		getIdleTimeoutMs: storage.getIdleTimeoutMs,
		clearCommandConfig
	};
}
var import_react$3;
var init_use_claw_session_management = __esmMin((() => {
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_use_idle_timeout_check();
	init_use_idle_timeout_storage();
	init_use_session_separator();
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/commands/clear-command.ts
/**
* /clear 命令 hook
*
* 整合了 useClawSessionManagement：
* - execute(): 手动清空会话（插入分割线 + toast）
* - checkAndHandleIdleTimeout(): 发消息前检查 idle timeout
* - getIdleTimeoutMs(): 读取 idle timeout 配置
* - clearCommandConfig: CBChat /clear 按钮 props
*/
function useClearCommand(params) {
	const { adapter, addOrUpdateMessage, currentConversation, isClawView } = params;
	const { checkAndHandleIdleTimeout, getIdleTimeoutMs, clearCommandConfig, clearSession } = useClawSessionManagement({
		adapter,
		addOrUpdateMessage,
		currentConversation,
		isClawView
	});
	return (0, import_react$2.useMemo)(() => ({
		async execute(conversationId, _message) {
			if (conversationId && currentConversation?.id && conversationId !== currentConversation.id) {
				console.warn("[ClearCommand] conversationId mismatch, skipping", conversationId, currentConversation.id);
				return;
			}
			await clearSession();
		},
		checkAndHandleIdleTimeout,
		getIdleTimeoutMs,
		clearCommandConfig
	}), [
		clearSession,
		checkAndHandleIdleTimeout,
		getIdleTimeoutMs,
		clearCommandConfig,
		currentConversation?.id
	]);
}
var import_react$2;
var init_clear_command = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_use_claw_session_management();
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/commands/index.ts
var init_commands = __esmMin((() => {
	init_clear_command();
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/command-context.tsx
/**
* 在 App 根组件中注册 handlers，替代 CommandProvider JSX 包裹层
* 不改动 render 结构，直接更新模块级 _handlersRef 和 _handlerMap
*/
function useRegisterCommandHandlers(handlers) {
	import_react$1.useEffect(() => {
		_handlersRef = handlers;
		return () => {
			_handlersRef = void 0;
		};
	}, [handlers]);
	import_react$1.useEffect(() => {
		if (handlers?.clear) {
			const clearGen = handlers.clear;
			_handlerMap.set("clear", (conversationId) => clearGen.execute(conversationId));
		} else _handlerMap.delete("clear");
	}, [handlers?.clear]);
}
var import_react$1, CommandContext, _handlersRef, _handlerMap, useClearCommandGenerator;
var init_command_context = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	require_jsx_runtime();
	CommandContext = (0, import_react$1.createContext)(void 0);
	_handlerMap = /* @__PURE__ */ new Map();
	useClearCommandGenerator = () => {
		return (0, import_react$1.useContext)(CommandContext)?.handlers?.clear ?? _handlersRef?.clear;
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/share-selection-utils.ts
/**
* 选中 id 列表的稳定指纹，用于判断缓存的 shareUrl 是否仍对应当前选区。
* 算法：ids.join(',')，顺序敏感（消息时间序即为 id 序）。
*/
function signature(ids) {
	return ids.join(",");
}
/**
* 规范化分享消息 ID 列表：过滤空串 → 去重 → 升序排序。
* 与后端 computeMessageHash 的预处理完全一致，保证同一组选区无论入参顺序/重复，
* 前后端算出的 hash 都一致。
*/
function normalizeShareMessageIds(ids) {
	const seen = /* @__PURE__ */ new Set();
	for (const id of ids) if (id) seen.add(id);
	return Array.from(seen).sort();
}
/**
* 计算分享消息哈希：SHA-256(join(",")) 的十六进制串（固定 64 字符）。
* 算法与后端 convshare.computeMessageHash 完全对齐（去重 → 排序 → join(",") → SHA256 → hex）。
* 入参为空（或去重后为空）时返回空串。
*/
async function computeShareMessageHash(ids) {
	const normalized = normalizeShareMessageIds(ids);
	if (normalized.length === 0) return "";
	const data = new TextEncoder().encode(normalized.join(","));
	const digest = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
/**
* 按 groupKey 的"时间序索引"判断哪些 group 落在可选范围内。
*
* 规则：
* - 没有选中项时：默认最后 MAX_PAIRS 个为可选项
* - 有选中项时：可选项为当前选中范围（允许取消超出范围的选中项）
*
* @param keys 所有 groupKey，按时间序（旧 → 新）
* @param selectedKeys 当前已选中的 groupKey 集合（可选）
*/
/**
* 获取可选项列表
*
* 根据总 group 数量和当前选中状态，动态计算哪些 group 可以被操作（勾选/取消）。
*
* 规则：
* 1. 总 group 数 ≤ MAX_PAIRS → 全部可选（无限制）
* 2. 当前选中数 < MAX_PAIRS → 全部可选（可以继续选超出范围的）
* 3. 当前选中数 = MAX_PAIRS → 只有已选中的可选（允许取消，但不能新增超出范围的）
* 4. 没有选中项且总 group 数 > MAX_PAIRS → 只能选最后 MAX_PAIRS 个（默认全选范围）
*
* @param keys - 所有 groupKey，按时间序（旧 → 新）
* @param selectedKeys - 当前已选中的 groupKey 集合（可选）
* @returns 可选项列表
*
* @example
* // 总数 60，已选 40 个，全部可选
* getEligibleKeys(keys60, new Set(selected40)) // 返回全部 60 个
*
* // 总数 60，已选 50 个，只有已选中的可选
* getEligibleKeys(keys60, new Set(selected50)) // 返回已选的 50 个
*
* // 总数 60，无选中，只能选最后 50 个
* getEligibleKeys(keys60) // 返回最后 50 个
*/
function getEligibleKeys(keys, selectedKeys) {
	if (keys.length <= 50) return keys;
	if (selectedKeys && selectedKeys.size < 50) return [...keys];
	if (selectedKeys && selectedKeys.size === 50) return [...selectedKeys];
	return keys.slice(keys.length - 50);
}
/**
* 计算一个 group 的 groupKey。
*
* 规则（必须与 availableGroupKeys / messagePrefixRenderer 三处保持一致）：
*   - 组内有 user 消息 → 取第一条 user 消息 id
*   - 组内无 user（独立单元：session separator / compact divider / 前置孤立 system）
*     → 取组内第一条消息 id
*
* 接受任意带 `.message` 的成员结构（cb-chat-ui 的 MessageWithCancelledState 与本文件
* 内部包装结构都满足），便于 main-content-core 的 messagePrefixRenderer 直接复用。
*/
function getShareGroupKey(groupMessages) {
	for (const m of groupMessages) if (m.message.messageType === "user") return m.message.id;
	return groupMessages.length > 0 ? groupMessages[0].message.id : null;
}
/**
* 把分享场景的 messages 交给 cb-chat-ui 的 groupMessagesByUser 分组。
*
* 这是分享选区分组的**唯一真源**：不在 agent-ui 复制一套近似算法，确保与
* MessageTimeline 渲染出的 group 边界完全一致。分组只读 message.messageType /
* message.extra，与取消/废弃状态无关，故包装时各 cancelled 标志统一填 false。
*/
function buildGroups(messages) {
	return groupMessagesByUser(messages.map((message) => ({
		message,
		isDiscarded: false,
		isCancelled: false,
		isDiscardedByCheckpoint: false,
		isSystemWarning: false
	})), false).map((group) => group.messages.map((m) => m.message));
}
/**
* 计算专家会话拆组后的 companion group 联动映射。
*
* 专家（子助理）会话中，assistant-only group（无 user 消息）与对应的 user group 分离。
* 勾选/取消时需要双向同步，否则会出现只选了 assistant 没选 user 的孤立 group。
*
* 规则：相邻两 group，前一个有 user、后一个无 user → 建立双向映射。
* 与 computeAvailableGroupKeys / buildGroupKeyToMessageIds 共享 buildGroups 的分组结果，
* 避免重复调用 groupMessagesByUser 做 O(n) 遍历。
*/
function computeGroupLinkMap(messages) {
	const map = /* @__PURE__ */ new Map();
	const groups = buildGroups(messages);
	const entries = [];
	for (const group of groups) {
		const key = getShareGroupKey(group.map((message) => ({ message })));
		if (key) entries.push({
			key,
			hasUser: group.some((m) => m.messageType === "user")
		});
	}
	for (let i = 1; i < entries.length; i++) if (!entries[i].hasUser && entries[i - 1].hasUser) {
		map.set(entries[i].key, entries[i - 1].key);
		map.set(entries[i - 1].key, entries[i].key);
	}
	return map;
}
/**
* 按 cb-chat-ui 真实分组规则计算 groupKey 序列（旧 → 新）。
* 与 buildGroupKeyToMessageIds 共用同一分组来源，保证 availableGroupKeys 里的每个 key
* 都能在 buildGroupKeyToMessageIds 里找到对应 group——杜绝"key 多出来却映射到别组消息"的越界泄漏。
*/
function computeAvailableGroupKeys(messages) {
	const keys = [];
	for (const group of buildGroups(messages)) {
		const key = getShareGroupKey(group.map((message) => ({ message })));
		if (key) keys.push(key);
	}
	return keys;
}
/**
* 按 groupKey 计算每个 group 的成员 messageId 列表。
*
* 分组规则等同 cb-chat-ui 的 useMessageGroups（唯一真源 groupMessagesByUser）：
*   - user 开新组；普通 assistant / system 追加到当前 user 组
*   - session separator / compact divider 才独立成组
* 因此 `user u1 → assistant a1 → system s1 → assistant a2` 归为同一组（key=u1），
* 取消 u1 后 s1/a2 不会被单独保留分享。
*/
function buildGroupKeyToMessageIds(messages) {
	const map = /* @__PURE__ */ new Map();
	for (const group of buildGroups(messages)) {
		const key = getShareGroupKey(group.map((message) => ({ message })));
		if (!key) continue;
		map.set(key, group.map((message) => message.id));
	}
	return map;
}
/**
* 浅比较两个字符串数组是否内容相等
*/
function arraysShallowEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
var WECHAT_SHARE_CARD_COVER_URL, SHARE_TASK_FILE_TOO_LARGE_CODE, SHARE_TASK_CONTENT_SECURITY_REVIEW_FAILED_CODE, SHARE_TASK_TITLE_CONTAINS_SENSITIVE_CONTENT_CODE, ShareTaskError;
var init_share_selection_utils = __esmMin((() => {
	init_src();
	WECHAT_SHARE_CARD_COVER_URL = "https://download.codebuddy.cn/workbuddy-mp/public/wb-assets/assets/wb-share-cover-file-task.png";
	SHARE_TASK_FILE_TOO_LARGE_CODE = 10001;
	SHARE_TASK_CONTENT_SECURITY_REVIEW_FAILED_CODE = 1e4;
	SHARE_TASK_TITLE_CONTAINS_SENSITIVE_CONTENT_CODE = 9999;
	ShareTaskError = class extends Error {
		constructor(code, message) {
			super(message ?? `Share task failed with code ${code}`);
			this.code = code;
			this.name = "ShareTaskError";
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/share-selection-context.tsx
/**
* 使用 Share Selection Context。
* 必须包在 ShareSelectionProvider 内，否则抛错。
*/
function useShareSelection() {
	const ctx = (0, import_react.useContext)(ShareSelectionContext);
	if (!ctx) throw new Error("useShareSelection must be used within a ShareSelectionProvider");
	return ctx;
}
/**
* 可选版：未在 Provider 内时返回 null。
* 用于不确定上层是否提供 Provider 的场景（如 modules 内部组件）。
*/
function useShareSelectionOptional() {
	return (0, import_react.useContext)(ShareSelectionContext);
}
var import_react, import_jsx_runtime, ShareSelectionContext, ShareSelectionProvider;
var init_share_selection_context = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_share_selection_utils();
	import_jsx_runtime = require_jsx_runtime();
	ShareSelectionContext = (0, import_react.createContext)(null);
	ShareSelectionProvider = ({ sessionId, channels = null, children }) => {
		const [isShareMode, setIsShareMode] = (0, import_react.useState)(false);
		const [selectedGroupKeys, setSelectedGroupKeys] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
		const [availableGroupKeys, setAvailableGroupKeysState] = (0, import_react.useState)(() => []);
		const [qrcodeDialogOpen, setQrcodeDialogOpen] = (0, import_react.useState)(false);
		const availableGroupKeysRef = (0, import_react.useRef)(availableGroupKeys);
		availableGroupKeysRef.current = availableGroupKeys;
		const autoFollowDefaultRef = (0, import_react.useRef)(false);
		const enterIntentRef = (0, import_react.useRef)(false);
		/**
		* 会话切换处理（避免跨会话残留）：
		* - 普通切换：退出分享态、清空选择、停止自动跟随
		* - "分享任务"菜单触发（同一提交内切会话 + enterShareMode）：保留分享态、清空旧会话选择、
		*   开启自动跟随，等新会话 keys 到位后由下方 effect 自动默认全选
		*
		* 二维码弹窗必须无条件关闭（两个分支都执行）：弹窗内的 shareUrl / 二维码内容都是基于
		* 旧会话选中消息生成的，一旦切换会话就应失效，不能让弹窗残留展示旧会话的分享内容。
		*/
		(0, import_react.useEffect)(() => {
			setQrcodeDialogOpen(false);
			if (enterIntentRef.current) {
				enterIntentRef.current = false;
				setIsShareMode(true);
				setSelectedGroupKeys(/* @__PURE__ */ new Set());
				autoFollowDefaultRef.current = true;
				return;
			}
			setIsShareMode(false);
			setSelectedGroupKeys(/* @__PURE__ */ new Set());
			autoFollowDefaultRef.current = false;
		}, [sessionId]);
		(0, import_react.useEffect)(() => {
			enterIntentRef.current = false;
		});
		const setAvailableGroupKeys = (0, import_react.useCallback)((keys) => {
			setAvailableGroupKeysState((prev) => {
				if (arraysShallowEqual(prev, keys)) return prev;
				return [...keys];
			});
		}, []);
		/**
		* 默认全选：选中最近 MAX_PAIRS 个可选 group。
		* 若总对话数超过上限，toast 告知用户只为其选中了最近的 N 组对话。
		*
		* count 取实际选中的 group 数（getEligibleKeys 返回长度），而不是写死 MAX_PAIRS * 2：
		* 一个 group 不必然对应 2 条 message（system 单元只有 1 条；夹带 tool/system 的对话可能 ≥3 条），
		* 写死 MAX_PAIRS * 2 会出现"实际只选了 8 条，toast 却显示 20 条"的不一致。
		*/
		const applyDefaultSelection = (0, import_react.useCallback)((keys) => {
			const eligible = getEligibleKeys(keys);
			setSelectedGroupKeys(new Set(eligible));
			if (keys.length > 50) toast({
				message: t("shareSelection.maxPairsToast", { count: eligible.length * 2 }),
				type: "warning",
				dedupKey: "share-selection-max-pairs"
			});
		}, []);
		const enterShareMode = (0, import_react.useCallback)((groupKeys) => {
			enterIntentRef.current = true;
			const keys = availableGroupKeysRef.current;
			if (groupKeys && groupKeys.length > 0) {
				const validKeys = groupKeys.filter((key) => keys.includes(key));
				setSelectedGroupKeys(new Set(validKeys));
				autoFollowDefaultRef.current = false;
			} else {
				autoFollowDefaultRef.current = true;
				applyDefaultSelection(keys);
			}
			setIsShareMode(true);
		}, [applyDefaultSelection]);
		(0, import_react.useEffect)(() => {
			if (!isShareMode || !autoFollowDefaultRef.current || availableGroupKeys.length === 0) return;
			applyDefaultSelection(availableGroupKeys);
		}, [
			isShareMode,
			availableGroupKeys,
			applyDefaultSelection
		]);
		const exitShareMode = (0, import_react.useCallback)(() => {
			enterIntentRef.current = false;
			autoFollowDefaultRef.current = false;
			setIsShareMode(false);
			setSelectedGroupKeys(/* @__PURE__ */ new Set());
		}, []);
		const isGroupDisabled = (0, import_react.useCallback)((groupKey) => {
			const keys = availableGroupKeysRef.current;
			if (keys.length <= 50) return false;
			return !getEligibleKeys(keys, selectedGroupKeys).includes(groupKey);
		}, [selectedGroupKeys]);
		const toggleGroup = (0, import_react.useCallback)((groupKey) => {
			if (isGroupDisabled(groupKey)) return;
			autoFollowDefaultRef.current = false;
			setSelectedGroupKeys((prev) => {
				const next = new Set(prev);
				if (next.has(groupKey)) next.delete(groupKey);
				else next.add(groupKey);
				return next;
			});
		}, [isGroupDisabled]);
		const selectAll = (0, import_react.useCallback)(() => {
			autoFollowDefaultRef.current = false;
			const eligible = getEligibleKeys(availableGroupKeysRef.current);
			setSelectedGroupKeys(new Set(eligible));
			if (availableGroupKeysRef.current.length > 50) toast({
				message: t("shareSelection.maxPairsTooltip", { count: 100 }),
				type: "warning",
				dedupKey: "share-selection-max-pairs"
			});
		}, []);
		const clearAll = (0, import_react.useCallback)(() => {
			autoFollowDefaultRef.current = false;
			setSelectedGroupKeys(/* @__PURE__ */ new Set());
		}, []);
		const isGroupSelected = (0, import_react.useCallback)((groupKey) => selectedGroupKeys.has(groupKey), [selectedGroupKeys]);
		const isAllSelected = (0, import_react.useMemo)(() => {
			const eligible = getEligibleKeys(availableGroupKeys);
			if (eligible.length === 0) return false;
			return eligible.every((k) => selectedGroupKeys.has(k));
		}, [availableGroupKeys, selectedGroupKeys]);
		const getSelectedMessageIds = (0, import_react.useCallback)((messages) => {
			if (selectedGroupKeys.size === 0) return [];
			const groupMap = buildGroupKeyToMessageIds(messages);
			const result = [];
			const targetIds = /* @__PURE__ */ new Set();
			for (const groupKey of selectedGroupKeys) {
				const ids = groupMap.get(groupKey);
				if (ids) for (const id of ids) targetIds.add(id);
			}
			for (const msg of messages) if (targetIds.has(msg.id)) result.push(msg.id);
			return result;
		}, [selectedGroupKeys]);
		const value = (0, import_react.useMemo)(() => ({
			isShareMode,
			enterShareMode,
			exitShareMode,
			setAvailableGroupKeys,
			toggleGroup,
			selectAll,
			clearAll,
			isGroupSelected,
			isGroupDisabled,
			isAllSelected,
			getSelectedMessageIds,
			channels,
			qrcodeDialogOpen,
			setQrcodeDialogOpen
		}), [
			isShareMode,
			enterShareMode,
			exitShareMode,
			setAvailableGroupKeys,
			toggleGroup,
			selectAll,
			clearAll,
			isGroupSelected,
			isGroupDisabled,
			isAllSelected,
			getSelectedMessageIds,
			channels,
			qrcodeDialogOpen
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareSelectionContext.Provider, {
			value,
			children
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/contexts/index.ts
var init_contexts = __esmMin((() => {
	init_conversations_context();
	init_adapter_context();
	init_account_context();
	init_enhance_service_context();
	init_ima_api_context();
	init_document_preview_context();
	init_question_context();
	init_auth_context();
	init_commands();
	init_command_context();
	init_share_selection_context();
}));
//#endregion
export { init_format as $, init_utils as A, ACPError as B, init_use_idle_timeout_storage as C, useGlobalDirectoryOptions as Ct, useAccountService as D, init_auth_context as E, init_trace_id as F, init_stat as G, extractErrorMessage as H, getCompactMode as I, syncParamsToURL as J, getURLParam as K, init_compact_mode as L, isProjectCloudTask as M, isProjectLocalTask as N, useAuth as O, genTraceId as P, formatRelativeTime as Q, createDebouncedLogger as R, init_use_session_separator as S, useDisableAllExtensionsState as St, AuthProvider as T, extractHttpStatus as U, ClientError as V, init_errors as W, formatDateTime as X, calendarDaysBetween as Y, formatNumber as Z, signature as _, useAccount as _t, useShareSelectionOptional as a, triggerDownload as at, useClearCommand as b, isClawPath as bt, SHARE_TASK_TITLE_CONTAINS_SENSITIVE_CONTENT_CODE as c, useQuestionContextOptional as ct, computeAvailableGroupKeys as d, useOptionalDocumentPreviewBridge as dt, generateCacheKey as et, computeGroupLinkMap as f, EnhanceServiceContext as ft, normalizeShareMessageIds as g, init_account_context as gt, init_share_selection_utils as h, AccountContext as ht, useShareSelection as i, init_download as it, init_project_local_task as j, useCurrentAccount as k, ShareTaskError as l, DocumentPreviewContext as lt, getShareGroupKey as m, useOptionalEnhanceService as mt, ShareSelectionProvider as n, uploadCache as nt, SHARE_TASK_CONTENT_SECURITY_REVIEW_FAILED_CODE as o, copyToClipboard as ot, computeShareMessageHash as p, init_enhance_service_context as pt, getURLParamArray as q, init_share_selection_context as r, fetchAndDownload as rt, SHARE_TASK_FILE_TOO_LARGE_CODE as s, init_clipboard as st, init_contexts as t, init_upload_cache as tt, WECHAT_SHARE_CARD_COVER_URL as u, init_document_preview_context as ut, useClearCommandGenerator as v, ConversationsContext as vt, init_use_idle_timeout_check as w, init_use_claw_session_management as x, useConversations as xt, useRegisterCommandHandlers as y, init_conversations_context as yt, init_logger as z };
