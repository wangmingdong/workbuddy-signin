import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { n as purify, t as init_purify_es } from "./purify.es-Buzz9Dxi.js";
import { i as renderMarkdown, r as init_markdown_utils, u as init_markdown_preview } from "./markdown-utils-HwTwYIv3.js";
import { n as init_StatusPlaceholder, t as StatusPlaceholder } from "./StatusPlaceholder-ap1bLSpN.js";
//#region ../../packages/agent-ui/src/components/share-preview/components/html/html-preview.less
var init_html_preview = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/html/html-sanitizer.ts
/**
* 入口：根据 mode 选择对应的清洗策略。
*
* @param rawHtml 原始 HTML 字符串
* @param mode    'sandbox'（默认）= 宽松清洗（适合 sandbox iframe），'strict' = 严格清洗
*/
function sanitizeHtmlDocument(rawHtml, mode = "sandbox") {
	if (mode === "strict") return sanitizeStrict(rawHtml);
	return sanitizeForSandbox(rawHtml);
}
/**
* strict 模式：用 DOMPurify 清洗整段 HTML 文档（保留 <html>/<head>/<body> 结构）。
*
* 在 DOMPurify 默认配置之上额外强化：
*   - FORBID_TAGS 显式列出 script / iframe / object / embed / form / meta / base /
*     applet / link，因为本预览场景：
*       · script: 绝对不允许执行
*       · iframe / frame / object / embed: 防止套娃式加载攻击者的远程页
*       · form / formaction: 防钓鱼提交
*       · meta: 防 <meta http-equiv="refresh"> 跳转钓鱼站
*       · base: 防 <base href> 把所有相对 URL 重写到攻击者站点
*       · link: 防 <link rel="prefetch"> / preload 走私外发请求
*   - FORBID_ATTR 补充 srcdoc / formaction，DOMPurify 默认会处理 on*、javascript: URL，
*     这里只补默认没覆盖的危险属性。
*
* 返回的字符串里不会再有可执行 JS。
*/
function sanitizeStrict(rawHtml) {
	return injectMetaTag(purify.sanitize(rawHtml, {
		WHOLE_DOCUMENT: true,
		FORBID_TAGS: [
			"script",
			"iframe",
			"frame",
			"frameset",
			"object",
			"embed",
			"applet",
			"form",
			"meta",
			"base",
			"link"
		],
		FORBID_ATTR: ["srcdoc", "formaction"]
	}), STRICT_CSP_META_TAG);
}
/**
* sandbox 模式：极简清理 + 宽松 CSP。
*
* 不调用 DOMPurify —— DOMPurify 默认会移除 <script>/on* / javascript:，
* 而 sandbox iframe 的 origin 隔离已经把"父页污染"风险降到 0，这些恰恰是 chart 渲染必需的。
* 用 DOMPurify 还得用 hooks 反向"放回" script，反而比手写 strip 更复杂。
*
* 仅清理这几类节点（与 sandbox iframe 行为正交、CSP 也兜不住的钓鱼向量）：
*   - <meta http-equiv="refresh"> —— 自动跳转到钓鱼站（CSP 不管 meta refresh）；
*   - <base href>                 —— 改变相对 URL 解析（CSP base-uri 'none' 兜底，但提早删更稳）；
*   - <object> / <embed> / <applet> —— 加载外部插件，CSP 已 'none' 但删干净双保险；
*   - <iframe> / <frame> / <frameset> —— sandbox 内再嵌 iframe 容易绕过 CSP frame-src 约束。
*
* 故意不删：
*   - <script>（含 inline / src=external） —— chart 必需
*   - on* 事件属性                          —— chart 库的 onload / onclick
*   - javascript: URL                        —— 个别交互链接需要
*   - <form>                                  —— 静态报告里的搜索表单等；CSP form-action 'self' 限制提交目标
*/
function sanitizeForSandbox(rawHtml) {
	let cleaned = rawHtml;
	cleaned = cleaned.replace(/<meta\b[^>]*\bhttp-equiv\s*=\s*['"]?Content-Security-Policy['"]?[^>]*>/gi, "");
	cleaned = cleaned.replace(/<meta\b[^>]*\bhttp-equiv\s*=\s*['"]?refresh['"]?[^>]*>/gi, "");
	cleaned = cleaned.replace(/<base\b[^>]*\/?>/gi, "");
	cleaned = cleaned.replace(/<object\b[\s\S]*?<\/object>/gi, "");
	cleaned = cleaned.replace(/<embed\b[^>]*\/?>/gi, "");
	cleaned = cleaned.replace(/<applet\b[\s\S]*?<\/applet>/gi, "");
	cleaned = cleaned.replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "");
	cleaned = cleaned.replace(/<iframe\b[^>]*\/?>/gi, "");
	cleaned = cleaned.replace(/<frame\b[^>]*\/?>/gi, "");
	cleaned = cleaned.replace(/<frameset\b[\s\S]*?<\/frameset>/gi, "");
	return injectMetaTag(cleaned, SANDBOX_CSP_META_TAG + SANDBOX_STORAGE_SHIM + SANDBOX_ANCHOR_FIX_SCRIPT);
}
/**
* 把 <meta> 标签注入到文档 <head> 的最前面。
*
* CSP 的 <meta> 形式必须出现在所有可执行内容之前才生效，所以：
*   - 找得到 <head ...> → 紧贴它后面插入；
*   - 没有 <head>（极少见）→ 直接放在文档最前面，浏览器解析时会被拎进 head。
*
* 注意：这里只处理"插一段固定串"的场景，不需要 DOM 解析；用正则就够，
* 否则会引入二次解析-序列化的成本。
*/
function injectMetaTag(html, metaTag) {
	const headOpenRe = /<head\b[^>]*>/i;
	if (headOpenRe.test(html)) return html.replace(headOpenRe, (match) => match + metaTag);
	return metaTag + html;
}
/**
* 判断是否需要走 doc.write 兼容路径（而非 sandbox + srcDoc）。
*
* 需要兼容的环境（均不支持 srcDoc / blob: / data: iframe）：
*   - iOS 微信 WKWebView（8.x+）
*   - Mac 微信小程序（4.x+）
*   - Windows 微信小程序（4.x+）
*
* 这导致默认的 sandbox + srcDoc 路径在 iOS 微信下会显示空白，
* HtmlPreview 必须给这个环境单独走 same-origin + doc.write 的兼容路径。
*
* UA 特征：
*   - iOS：  iPhone|iPad|iPod + MicroMessenger
*   - Mac：  Macintosh + MicroMessenger
*   - Win：  Windows + MicroMessenger
*
* Android 微信使用 X5/Chromium 内核不存在该限制，因此不在此分支内。
*/
function needsDocWriteFallback() {
	if (typeof navigator === "undefined" || typeof navigator.userAgent !== "string") return false;
	const ua = navigator.userAgent;
	if (!/MicroMessenger/i.test(ua)) return false;
	const isWinWeChat = /Windows/i.test(ua);
	const isMacWeChat = /Macintosh/i.test(ua);
	const isIOSWeChat = /iPhone|iPad|iPod/i.test(ua);
	return isWinWeChat || isMacWeChat || isIOSWeChat;
}
var STRICT_CSP_META_TAG, SANDBOX_CSP_META_TAG, SANDBOX_STORAGE_SHIM, SANDBOX_ANCHOR_FIX_SCRIPT;
var init_html_sanitizer = __esmMin((() => {
	init_purify_es();
	STRICT_CSP_META_TAG = "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; img-src * data: blob:; media-src * data: blob:; font-src * data:; style-src * 'unsafe-inline'; script-src 'none'; connect-src 'none'; object-src 'none'; frame-src 'none'; frame-ancestors 'self'; base-uri 'none'; form-action 'none';\">";
	SANDBOX_CSP_META_TAG = "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; style-src 'self' 'unsafe-inline' https: data:; img-src 'self' https: data: blob:; font-src 'self' https: data:; media-src 'self' https: data: blob:; connect-src 'self' https: data: blob:; frame-src 'self' https: data:; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'self';\">";
	SANDBOX_STORAGE_SHIM = "<script>(function(){try{void sessionStorage}catch(e){var n={getItem:function(){return null},setItem:function(){},removeItem:function(){},clear:function(){},key:function(){return null},length:0};try{Object.defineProperties(window,{localStorage:{value:n,writable:false,configurable:false},sessionStorage:{value:n,writable:false,configurable:false}})}catch(e2){window.localStorage=n;window.sessionStorage=n}}})();<\/script>";
	SANDBOX_ANCHOR_FIX_SCRIPT = "<script>(function(){document.addEventListener(\"click\",function(e){var t=e.target;if(!t)return;var a=t.closest&&t.closest(\"a\");if(!a)return;var h=a.getAttribute(\"href\");if(!h||h.charAt(0)!=\"#\"||h===\"#\")return;e.preventDefault();e.stopPropagation();var el=document.querySelector(h);if(el)el.scrollIntoView({behavior:\"smooth\",block:\"start\"});try{history.replaceState(null,\"\",h);}catch(_){}});})();<\/script>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/html/HtmlPreview.tsx
var import_react$2, import_jsx_runtime$2, HtmlPreview;
var init_HtmlPreview = __esmMin((() => {
	init_html_preview();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_StatusPlaceholder();
	init_html_sanitizer();
	import_jsx_runtime$2 = require_jsx_runtime();
	HtmlPreview = (0, import_react$2.forwardRef)(function HtmlPreview({ url, loadingText = t("common.loading"), errorText = t("preview.error.loadFailed"), title = "Preview Content" }, ref) {
		const [content, setContent] = (0, import_react$2.useState)(null);
		const [loading, setLoading] = (0, import_react$2.useState)(true);
		const [error, setError] = (0, import_react$2.useState)(null);
		const iframeRef = (0, import_react$2.useRef)(null);
		/**
		* 把内部 iframeRef 暴露给外层 —— 父组件用来读取 contentDocument.title 等同源信息。
		*
		* 注意：默认 sandbox 路径下 iframe 处于 opaque origin，
		* 父组件**读不到** contentDocument（被同源策略拒绝），
		* 仅 iOS 微信 fallback 路径（same-origin）可读。父组件应 try/catch 兜底。
		*/
		(0, import_react$2.useImperativeHandle)(ref, () => iframeRef.current);
		/**
		* 仅在 iOS 微信 fallback 路径生效：记录已写入内容，避免 StrictMode 双 effect / onLoad
		* 兜底导致的重复 doc.write 闪烁。默认 sandbox 路径走 srcDoc 不需要这套机制。
		*/
		const lastWrittenContentRef = (0, import_react$2.useRef)(null);
		/**
		* UA 在组件生命周期内不变，useMemo 一次即可，避免每次 render 都重新跑正则。
		*/
		const useSandboxPath = (0, import_react$2.useMemo)(() => !needsDocWriteFallback(), []);
		/**
		* 把已 sanitize 过的 HTML 通过 same-origin + doc.write 注入 iframe（仅 iOS 微信路径）。
		*
		* 该路径下 iframe 与父页同源 —— iframe 内的 JS 理论上能访问父页，
		* 因此**必须**保证传进来的 html 已经过 sanitizeHtmlDocument(content, 'strict') 清洗
		* （无 <script>、无 on*）。
		*
		* 幂等性：通过 lastWrittenContentRef 比对避免重复写入 ——
		* 同一份内容会被 React StrictMode 双 effect / iframe.onLoad 兜底各触发一次，
		* 不去重会出现写入 → about:blank → 再写入的闪烁。
		*/
		const writeContentIntoIframe = (0, import_react$2.useCallback)((sanitizedHtml) => {
			const iframe = iframeRef.current;
			if (!iframe) return;
			if (lastWrittenContentRef.current === sanitizedHtml) return;
			try {
				const doc = iframe.contentDocument ?? (iframe.contentWindow ? iframe.contentWindow.document : null);
				if (!doc) {
					console.warn("[HtmlPreview] contentDocument not available, skip inject");
					return;
				}
				doc.open();
				doc.write(sanitizedHtml);
				doc.close();
				lastWrittenContentRef.current = sanitizedHtml;
			} catch (err) {
				console.error("[HtmlPreview] Failed to write html into iframe:", err);
				setError(err instanceof Error ? err.message : String(err));
			}
		}, []);
		/**
		* 拉远端 HTML 文本到内存。
		*
		* 不在这里做 sanitize —— sanitize 后的内容只在写入 iframe 时使用；保留原始文本
		* 便于未来诊断 / 也避免对 setState 的内容做 React diff 时的额外开销。
		*/
		(0, import_react$2.useEffect)(() => {
			let mounted = true;
			const fetchHtml = async () => {
				setLoading(true);
				setError(null);
				try {
					const response = await fetch(url);
					if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
					const text = await response.text();
					if (mounted) setContent(text);
				} catch (err) {
					console.error("[HtmlPreview] Failed to fetch html:", err);
					if (mounted) setError(err instanceof Error ? err.message : String(err));
				} finally {
					if (mounted) setLoading(false);
				}
			};
			fetchHtml();
			return () => {
				mounted = false;
			};
		}, [url]);
		/**
		* 经 sanitize + CSP 注入后的 HTML。两条渲染路径用不同 mode：
		*   - 默认 sandbox iframe 路径：origin 已被浏览器隔离，sanitize 走 'sandbox'（默认）模式，
		*     保留 <script>/on* / javascript: 让 echarts/Chart.js/D3 等可视化能跑；
		*   - iOS 微信 same-origin 路径：sanitize 是唯一防线，必须显式传 'strict' 删除一切可执行 JS。
		*/
		const safeHtml = (0, import_react$2.useMemo)(() => {
			if (content == null) return null;
			return sanitizeHtmlDocument(content, useSandboxPath ? "sandbox" : "strict");
		}, [content, useSandboxPath]);
		/**
		* iOS 微信路径下：safeHtml 准备好后，通过 onLoad / 直接写入 iframe。
		*
		* 默认 sandbox 路径用 srcDoc 渲染，浏览器自己处理，不需要这个 effect。
		*/
		(0, import_react$2.useEffect)(() => {
			if (useSandboxPath) return;
			if (safeHtml == null) return;
			writeContentIntoIframe(safeHtml);
		}, [
			useSandboxPath,
			safeHtml,
			writeContentIntoIframe
		]);
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StatusPlaceholder, {
			type: "loading",
			title: loadingText
		});
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StatusPlaceholder, {
			type: "error",
			title: errorText,
			description: error
		});
		/**
		* 默认路径：sandbox + srcDoc
		*
		* sandbox 取值说明：
		*   - allow-scripts                       —— 允许用户 HTML 内的 JS 跑（图表/交互）
		*   - allow-popups                        —— 允许 window.open 弹外链
		*   - allow-popups-to-escape-sandbox      —— 弹出窗本身不再继承 sandbox（能正常打开第三方页）
		*   - allow-forms                         —— 允许表单提交（一些静态报告含搜索 / 反馈表单）
		*   - allow-modals                        —— 允许 alert/confirm/prompt（避免 UX 误判为 bug）
		*
		* 故意**不**给的项：
		*   - allow-same-origin —— 给了就跟父页同源了，本方案的核心隔离失效；
		*   - allow-top-navigation —— 防止恶意 HTML 把整个分享页 location.href 跳到钓鱼站；
		*   - allow-downloads —— 不允许 iframe 内自动触发下载，避免下发木马。
		*/
		if (useSandboxPath) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "html-preview",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("iframe", {
				ref: iframeRef,
				className: "html-preview__frame",
				title,
				sandbox: "allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals",
				referrerPolicy: "no-referrer",
				allowFullScreen: true,
				srcDoc: safeHtml ?? ""
			})
		});
		/**
		* iOS 微信兼容路径：about:blank + doc.write
		*
		* iframe 与父页同源，安全完全依赖 sanitize（已移除 <script>/on*）+ CSP（script-src 'none'）。
		* 不加 sandbox —— sandbox 会让 iframe 进入 opaque origin，
		* 既会被 iOS 微信判成"非同源资源"拦截，也写不进 contentDocument。
		*/
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "html-preview",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("iframe", {
				ref: iframeRef,
				className: "html-preview__frame",
				title,
				referrerPolicy: "no-referrer",
				allowFullScreen: true,
				onLoad: () => {
					if (safeHtml != null) writeContentIntoIframe(safeHtml);
				}
			})
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/markdown/MarkdownPreview.tsx
var import_react$1, import_jsx_runtime$1, MarkdownPreview;
var init_MarkdownPreview = __esmMin((() => {
	init_markdown_preview();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_StatusPlaceholder();
	init_markdown_utils();
	import_jsx_runtime$1 = require_jsx_runtime();
	MarkdownPreview = ({ url, loadingText = t("common.loading"), errorText = t("preview.error.loadFailed") }) => {
		const [content, setContent] = (0, import_react$1.useState)(null);
		const [loading, setLoading] = (0, import_react$1.useState)(true);
		const [error, setError] = (0, import_react$1.useState)(null);
		(0, import_react$1.useEffect)(() => {
			let mounted = true;
			const fetchMarkdown = async () => {
				setLoading(true);
				setError(null);
				try {
					const response = await fetch(url);
					if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
					const text = await response.text();
					if (mounted) setContent(text);
				} catch (err) {
					console.error("[MarkdownPreview] Failed to fetch markdown:", err);
					if (mounted) setError(err instanceof Error ? err.message : String(err));
				} finally {
					if (mounted) setLoading(false);
				}
			};
			fetchMarkdown();
			return () => {
				mounted = false;
			};
		}, [url]);
		const renderedHtml = (0, import_react$1.useMemo)(() => {
			if (!content) return "";
			return renderMarkdown(content);
		}, [content]);
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
			type: "loading",
			title: loadingText
		});
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
			type: "error",
			title: errorText,
			description: error
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "markdown-preview",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "markdown-preview__body",
				dangerouslySetInnerHTML: { __html: renderedHtml }
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/resolve-redirect-url.ts
/**
* 发起一个预检请求，跟完 302 后拿到真正的资源地址。
*
* @param url 可能触发 302 的分享链接
* @returns 解析结果，详见 {@link ResolveRedirectResult}
*/
async function resolveRedirectUrl(url) {
	try {
		const response = await fetch(url, { method: "GET" });
		response.body?.cancel().catch(() => void 0);
		if (!response.ok) return {
			url,
			resolved: false,
			error: `HTTP ${response.status}`
		};
		if (response.redirected && response.url) return {
			url: response.url,
			resolved: true
		};
		return {
			url,
			resolved: true
		};
	} catch (error) {
		console.warn("[resolveRedirectUrl] preflight failed, fallback to original url:", error);
		return {
			url,
			resolved: false,
			error: void 0
		};
	}
}
var init_resolve_redirect_url = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/PreviewIframe.tsx
var import_react, import_jsx_runtime, PreviewIframe;
var init_PreviewIframe = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_resolve_redirect_url();
	init_StatusPlaceholder();
	import_jsx_runtime = require_jsx_runtime();
	PreviewIframe = ({ url, title = "Preview Content", className = "preview-page__iframe", loadingText, errorText }) => {
		const [resolvedSrc, setResolvedSrc] = (0, import_react.useState)(null);
		const [error, setError] = (0, import_react.useState)(null);
		(0, import_react.useEffect)(() => {
			let mounted = true;
			setResolvedSrc(null);
			setError(null);
			resolveRedirectUrl(url).then((result) => {
				if (!mounted) return;
				if (result.error) {
					setError(result.error);
					return;
				}
				setResolvedSrc(result.url);
			}).catch((err) => {
				if (mounted) setError(err instanceof Error ? err.message : String(err));
			});
			return () => {
				mounted = false;
			};
		}, [url]);
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPlaceholder, {
			type: "error",
			title: errorText,
			description: error
		});
		if (!resolvedSrc) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPlaceholder, {
			type: "loading",
			title: loadingText
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			className,
			src: resolvedSrc,
			title,
			allowFullScreen: true
		});
	};
}));
//#endregion
export { HtmlPreview as a, init_MarkdownPreview as i, init_PreviewIframe as n, init_HtmlPreview as o, MarkdownPreview as r, PreviewIframe as t };
