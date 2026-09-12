import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { _ as isLearnBuddy, n as getDesktopDeeplinkScheme, o as getInstallDownloadUrl, p as init_environment, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { n as useI18n, r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as init_header_icon, n as init_header_icon_dark, r as header_icon_default, t as header_icon_dark_default } from "./header-icon-dark-DmGJ_Yaj.js";
import { n as init_header_workbuddy, t as header_workbuddy_default } from "./header-workbuddy-UO2zaYBA.js";
import { n as init_is_mobile_ua, t as IS_MOBILE_UA } from "./is-mobile-ua-B8SGTv_t.js";
//#region ../../packages/agent-ui/src/assets/header-learnbuddy.svg
var header_learnbuddy_default;
var init_header_learnbuddy = __esmMin((() => {
	header_learnbuddy_default = "" + new URL("header-learnbuddy-iuKBNpx_.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/chat-with-workbuddy-button.less
var init_chat_with_workbuddy_button = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/ChatWithWorkBuddyButton.tsx
/** 是否在微信小程序内嵌 webview 中（UA 含 miniProgram） */
function isInsideWeixinMiniProgram() {
	if (typeof navigator === "undefined") return false;
	return /miniProgram/i.test(navigator.userAgent || "");
}
function ensureJweixinLoaded() {
	if (typeof window === "undefined") return Promise.reject(/* @__PURE__ */ new Error("window is undefined"));
	if (window.wx?.miniProgram) return Promise.resolve();
	if (jweixinLoadPromise) return jweixinLoadPromise;
	jweixinLoadPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = JWEIXIN_SRC;
		script.async = true;
		script.onload = () => {
			if (window.wx?.miniProgram) resolve();
			else reject(/* @__PURE__ */ new Error("wx.miniProgram unavailable after jweixin load"));
		};
		script.onerror = () => {
			jweixinLoadPromise = null;
			reject(/* @__PURE__ */ new Error("Failed to load jweixin SDK"));
		};
		document.head.appendChild(script);
	});
	return jweixinLoadPromise;
}
var import_react$3, import_jsx_runtime$1, JWEIXIN_SRC, TARGET_PATH, jweixinLoadPromise, ChatWithWorkBuddyButton;
var init_ChatWithWorkBuddyButton = __esmMin((() => {
	init_chat_with_workbuddy_button();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_header_icon();
	init_header_icon_dark();
	init_header_learnbuddy();
	init_header_workbuddy();
	init_useI18n();
	init_environment();
	import_jsx_runtime$1 = require_jsx_runtime();
	JWEIXIN_SRC = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
	TARGET_PATH = "/pages/chat/index";
	jweixinLoadPromise = null;
	ChatWithWorkBuddyButton = ({ onTrack }) => {
		const t = useTranslation();
		const [visible, setVisible] = (0, import_react$3.useState)(false);
		(0, import_react$3.useEffect)(() => {
			setVisible(isInsideWeixinMiniProgram());
		}, []);
		const handleClick = (0, import_react$3.useCallback)(async () => {
			onTrack?.("share_view_back_to_wb");
			try {
				await ensureJweixinLoaded();
				window.wx.miniProgram.navigateTo({ url: TARGET_PATH });
			} catch (err) {
				console.warn("[ChatWithWorkBuddyButton] navigateTo failed:", err);
			}
		}, [onTrack]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
			type: "button",
			className: "chat-with-workbuddy-btn",
			onClick: handleClick,
			"aria-label": t("shareTaskPreview.chatWithWorkBuddy"),
			children: [isLearnBuddy() ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				src: header_learnbuddy_default,
				alt: "",
				className: "chat-with-workbuddy-icon",
				width: 20,
				height: 20
			}) : isWorkBuddy() ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				src: header_workbuddy_default,
				alt: "",
				className: "chat-with-workbuddy-icon",
				width: 20,
				height: 20
			}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				src: header_icon_dark_default,
				alt: "",
				className: "chat-with-workbuddy-icon chat-with-workbuddy-icon--dark",
				width: 20,
				height: 20
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				src: header_icon_default,
				alt: "",
				className: "chat-with-workbuddy-icon chat-with-workbuddy-icon--light",
				width: 20,
				height: 20
			})] }), t("shareTaskPreview.chatWithWorkBuddy")]
		});
	};
	ChatWithWorkBuddyButton.displayName = "ChatWithWorkBuddyButton";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/useDeeplinkProbe.ts
function useDeeplinkProbe(opts) {
	const optsRef = (0, import_react$2.useRef)(opts);
	optsRef.current = opts;
	const inflightCleanupRef = (0, import_react$2.useRef)(null);
	const [isProbing, setIsProbing] = (0, import_react$2.useState)(false);
	const isMountedRef = (0, import_react$2.useRef)(true);
	(0, import_react$2.useEffect)(() => () => {
		isMountedRef.current = false;
		inflightCleanupRef.current?.();
	}, []);
	return {
		trigger: (0, import_react$2.useCallback)(() => {
			if (inflightCleanupRef.current) inflightCleanupRef.current();
			const { deeplink, downloadUrl, timeoutMs, gracePeriodMs = DEFAULT_GRACE_PERIOD_MS, navigate = defaultNavigate, openFallback = defaultOpenFallback } = optsRef.current;
			let resolved = false;
			let graceTimer;
			let gracePollInterval;
			const cleanup = () => {
				if (resolved) return;
				resolved = true;
				document.removeEventListener("visibilitychange", onSignal);
				window.removeEventListener("blur", onSignal);
				window.removeEventListener("pagehide", onSignal);
				window.removeEventListener("focus", onFocus);
				window.clearTimeout(timer);
				window.clearTimeout(graceTimer);
				window.clearInterval(gracePollInterval);
				inflightCleanupRef.current = null;
				setIsProbing(false);
			};
			const onSignal = () => {
				cleanup();
			};
			const onFocus = () => {
				cleanup();
			};
			const onTimeout = () => {
				if (typeof document !== "undefined" && document.visibilityState === "hidden") {
					cleanup();
					return;
				}
				if (typeof document !== "undefined" && !document.hasFocus()) {
					cleanup();
					return;
				}
				const onGraceEnd = () => {
					cleanup();
					openFallback(downloadUrl);
				};
				graceTimer = window.setTimeout(onGraceEnd, gracePeriodMs);
				gracePollInterval = window.setInterval(() => {
					if (typeof document !== "undefined") {
						if (!document.hasFocus() || document.visibilityState === "hidden") cleanup();
					}
				}, 200);
			};
			document.addEventListener("visibilitychange", onSignal, { once: true });
			window.addEventListener("blur", onSignal, { once: true });
			window.addEventListener("pagehide", onSignal, { once: true });
			window.addEventListener("focus", onFocus, { once: true });
			const timer = window.setTimeout(onTimeout, timeoutMs);
			inflightCleanupRef.current = cleanup;
			setIsProbing(true);
			navigate(deeplink);
		}, []),
		isProbing
	};
}
var import_react$2, defaultNavigate, defaultOpenFallback, DEFAULT_GRACE_PERIOD_MS;
var init_useDeeplinkProbe = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	defaultNavigate = (deeplink) => {
		window.location.href = deeplink;
	};
	defaultOpenFallback = (downloadUrl) => {
		window.location.href = downloadUrl;
	};
	DEFAULT_GRACE_PERIOD_MS = 2e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/OpenOrDownloadWorkBuddyButton.tsx
var import_react$1, import_jsx_runtime, DEEPLINK_HOST, DOWNLOAD_URL, PROBE_TIMEOUT_MS, OpenOrDownloadWorkBuddyButton;
var init_OpenOrDownloadWorkBuddyButton = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_is_mobile_ua();
	init_useDeeplinkProbe();
	import_jsx_runtime = require_jsx_runtime();
	DEEPLINK_HOST = `${getDesktopDeeplinkScheme()}home`;
	DOWNLOAD_URL = getInstallDownloadUrl();
	PROBE_TIMEOUT_MS = 1500;
	OpenOrDownloadWorkBuddyButton = ({ onTrack }) => {
		const { t } = useI18n();
		const fallbackFiredRef = (0, import_react$1.useRef)(false);
		const { trigger, isProbing } = useDeeplinkProbe({
			deeplink: DEEPLINK_HOST,
			downloadUrl: DOWNLOAD_URL,
			timeoutMs: PROBE_TIMEOUT_MS,
			openFallback: () => {
				fallbackFiredRef.current = true;
				onTrack?.("share_view_download");
				window.location.href = DOWNLOAD_URL;
			}
		});
		const prevProbingRef = (0, import_react$1.useRef)(isProbing);
		(0, import_react$1.useEffect)(() => {
			if (prevProbingRef.current && !isProbing && !fallbackFiredRef.current) onTrack?.("share_view_open_client");
			prevProbingRef.current = isProbing;
		}, [isProbing, onTrack]);
		const labelContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t("preview.openMobile"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "preview-page__primary-action-full-text",
			children: t("preview.openWorkBuddySuffix")
		})] });
		if (IS_MOBILE_UA) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "preview-page__primary-action",
			href: DOWNLOAD_URL,
			target: "_blank",
			rel: "noopener noreferrer",
			onClick: () => onTrack?.("share_view_download"),
			children: labelContent
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "preview-page__primary-action",
			onClick: trigger,
			disabled: isProbing,
			"aria-busy": isProbing,
			children: [isProbing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "preview-page__primary-action-spinner",
				"aria-hidden": "true"
			}), labelContent]
		});
	};
	OpenOrDownloadWorkBuddyButton.displayName = "OpenOrDownloadWorkBuddyButton";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/usePreviewDocumentTitle.ts
/**
* 读取同源 iframe 的 document.title；跨域或尚未加载时返回 null。
*
* 注意：访问跨域 iframe 的 contentDocument 在某些浏览器下不会立即抛异常，
* 而是返回 null；同源但 about:blank 的 iframe 也会拿到空字符串，需要过滤。
*/
function readSameOriginIframeTitle(iframe) {
	if (!iframe) return null;
	try {
		const doc = iframe.contentDocument;
		if (!doc) return null;
		const title = doc.title?.trim();
		return title && title.length > 0 ? title : null;
	} catch {
		return null;
	}
}
/**
* 解析当前可用的"真实标题"——若 fileName 与同源 iframe 标题都拿不到则返回
* `null`，由调用方决定是否写入 `defaultTitle`。
*
* 与旧版 `pickTitle` 的关键差异：**不再在没有数据时立即返回 `defaultTitle`**，
* 把"兜底"的决策延后到 hook 主体里，从而实现"等待中保持空白、避免闪烁"。
*/
function resolveRealTitle(fileName, iframe) {
	const trimmedFileName = fileName?.trim();
	if (trimmedFileName) return trimmedFileName;
	const iframeTitle = readSameOriginIframeTitle(iframe);
	if (iframeTitle) return iframeTitle;
	return null;
}
/**
* 分享落地页专用：按优先级动态设置 document.title。
*
* 行为细节（重要）：
*   - **拿到 `fileName` / 同源 iframe 标题时**：立即写入 `document.title`。
*   - **暂时拿不到（等待中）**：保持 `document.title` 不变。配合 `index.html`
*     里"分享路径下默认 title 留空"的策略，浏览器 tab 在等待期是空白，
*     等数据到位后**一次性**写入真实文件名，避免 "WorkBuddy Preview → 真实
*     文件名" 的视觉跳变。
*   - **超过 `FALLBACK_DEFAULT_TITLE_TIMEOUT_MS` 仍拿不到**：兜底写入
*     `defaultTitle`，避免 tab 永远空白（例如分享接口失败的极端场景）。
*
* @example
*   usePreviewDocumentTitle({ fileName: shareDetail?.name });
*
* @example
*   const iframeRef = useRef<HTMLIFrameElement>(null);
*   usePreviewDocumentTitle({ fileName: shareDetail?.name, iframeRef });
*/
function usePreviewDocumentTitle(options = {}) {
	const { fileName, iframeRef, defaultTitle = DEFAULT_PREVIEW_TITLE } = options;
	(0, import_react.useEffect)(() => {
		const previousTitle = document.title;
		const initialRealTitle = resolveRealTitle(fileName, iframeRef?.current);
		if (initialRealTitle) document.title = initialRealTitle;
		const hasFileName = !!fileName?.trim();
		const iframe = iframeRef?.current ?? null;
		let detachListener = null;
		if (!hasFileName && iframe) {
			const handleLoad = () => {
				const realTitle = resolveRealTitle(fileName, iframe);
				if (realTitle) document.title = realTitle;
			};
			iframe.addEventListener("load", handleLoad);
			detachListener = () => iframe.removeEventListener("load", handleLoad);
		}
		let fallbackTimer = null;
		if (!initialRealTitle) fallbackTimer = setTimeout(() => {
			if (!resolveRealTitle(fileName, iframeRef?.current)) document.title = defaultTitle;
		}, FALLBACK_DEFAULT_TITLE_TIMEOUT_MS);
		return () => {
			detachListener?.();
			if (fallbackTimer !== null) clearTimeout(fallbackTimer);
			document.title = previousTitle;
		};
	}, [
		fileName,
		iframeRef,
		defaultTitle
	]);
}
var import_react, DEFAULT_PREVIEW_TITLE, FALLBACK_DEFAULT_TITLE_TIMEOUT_MS;
var init_usePreviewDocumentTitle = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	DEFAULT_PREVIEW_TITLE = "WorkBuddy Preview";
	FALLBACK_DEFAULT_TITLE_TIMEOUT_MS = 8e3;
}));
//#endregion
export { ChatWithWorkBuddyButton as a, init_header_learnbuddy as c, init_OpenOrDownloadWorkBuddyButton as i, usePreviewDocumentTitle as n, init_ChatWithWorkBuddyButton as o, OpenOrDownloadWorkBuddyButton as r, header_learnbuddy_default as s, init_usePreviewDocumentTitle as t };
