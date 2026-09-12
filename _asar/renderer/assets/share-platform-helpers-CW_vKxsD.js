const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./browser-C0-68Hhs.js","./chunk-BRZcfu7K.js","./user-menu-avatar-DZ2_gXGP.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { Ba as Tooltip, Yr as toast, d as appendShareChannelExt, f as ShareChannel, l as QrcodeFallbackDialog, o as FileTypeIcon, p as ShareChannelButtons, t as init_src, u as ShareChannelExt2 } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { p as init_environment, v as isOverseas } from "./environment-DKqg3f0G.js";
import { ot as copyToClipboard, st as init_clipboard } from "./contexts-D7XKqa2J.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
//#region ../../packages/agent-ui/src/components/share-task-dialog/index.less
var init_share_task_dialog$1 = __esmMin((() => {})), import_jsx_runtime$1, LinkChainIcon, ShareQuestionIcon, ShareLoadingIcon;
var init_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	LinkChainIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "24",
		height: "24",
		viewBox: "0 0 21.9093 21.9101",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			transform: "matrix(0.707107 0.707107 -0.707107 0.707107 15.763 -1.7728)",
			d: "M11.1986 5.4749C11.1321 2.4399 8.651 0 5.6 0C2.5072 0 0 2.5072 0 5.6L0 9.6L0.0014 9.7251C0.0679 12.7601 2.549 15.2 5.6 15.2L5.6 13.6L5.488 13.5984C3.3307 13.5392 1.6 11.7717 1.6 9.6L1.6 5.6L1.6015 5.488C1.6608 3.3307 3.4283 1.6 5.6 1.6C7.8091 1.6 9.6 3.3909 9.6 5.6L9.6 8.4L11.2 8.4L11.2 5.6L11.1986 5.4749ZM11.1986 15.0749C11.1321 12.0399 8.651 9.6 5.6 9.6L5.6 11.2L5.712 11.2015C7.8693 11.2608 9.6 13.0283 9.6 15.2L9.6 19.2L9.5985 19.312C9.5392 21.4693 7.7717 23.2 5.6 23.2C3.3909 23.2 1.6 21.4091 1.6 19.2L1.6 16.4L0 16.4L0 19.2L0.0014 19.3251C0.0679 22.3601 2.549 24.8 5.6 24.8C8.6928 24.8 11.2 22.2928 11.2 19.2L11.2 15.2L11.1986 15.0749Z",
			fillRule: "evenodd"
		})
	});
	ShareQuestionIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "currentColor",
		fillOpacity: "0.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M7 0C10.866 0 14 3.134 14 7C14 10.866 10.866 14 7 14C3.134 14 0 10.866 0 7C0 3.134 3.134 0 7 0ZM7 1C3.6863 1 1 3.6863 1 7C1 10.3137 3.6863 13 7 13C10.3137 13 13 10.3137 13 7C13 3.6863 10.3137 1 7 1ZM7.1121 3.5C7.7744 3.5 8.3144 3.6578 8.722 3.9919C9.1295 4.3167 9.3333 4.7621 9.3333 5.3282C9.3333 5.7922 9.2009 6.1727 8.9563 6.4697C8.8646 6.5625 8.5691 6.8131 8.0801 7.2029C7.8967 7.342 7.7642 7.4998 7.6725 7.6669C7.5706 7.8525 7.5197 8.0473 7.5197 8.2701L7.5197 8.4L6.3479 8.4L6.3479 8.2701C6.3479 7.9174 6.409 7.6112 6.5517 7.3606C6.6841 7.11 7.0815 6.7203 7.7438 6.182L7.8661 6.0521C8.0495 5.8479 8.1412 5.6252 8.1412 5.3932C8.1412 5.0869 8.0393 4.8456 7.8559 4.6693C7.6623 4.493 7.3872 4.4095 7.0408 4.4095C6.5924 4.4095 6.2766 4.5301 6.083 4.7899C5.9098 5.0034 5.8282 5.3097 5.8282 5.6994L4.6667 5.6994C4.6667 5.0127 4.8806 4.4744 5.329 4.0847C5.7671 3.6949 6.3581 3.5 7.1121 3.5ZM6.995 9.1C7.2158 9.1 7.4065 9.1649 7.557 9.2947C7.6975 9.4245 7.7778 9.5914 7.7778 9.7954C7.7778 9.9993 7.6975 10.1755 7.547 10.3053C7.3964 10.4351 7.2158 10.5 6.995 10.5C6.7742 10.5 6.5935 10.4258 6.443 10.296C6.2925 10.1662 6.2222 9.9993 6.2222 9.7954C6.2222 9.5914 6.2925 9.4245 6.443 9.2947C6.5935 9.1649 6.7742 9.1 6.995 9.1Z",
			fillRule: "evenodd"
		})
	});
	ShareLoadingIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		className: "share-task-dialog-loading-spinner",
		width: "24",
		height: "24",
		viewBox: "0 0 14 14",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "#00C29A",
			d: "M1.4392 2.7482Q1.7215 2.379 2.0503 2.0503Q2.379 1.7215 2.7482 1.4392L4.7106 4.0057Q4.3111 4.3111 4.0057 4.7106L1.4392 2.7482ZM0.0553 7.8779Q0.0277 7.6595 0.0138 7.4398Q0 7.2201 0 7Q0 6.7799 0.0138 6.5602Q0.0277 6.3405 0.0553 6.1221L3.2605 6.5273Q3.2308 6.7627 3.2308 7Q3.2308 7.2373 3.2605 7.4727L0.0553 7.8779ZM2.7482 12.5608Q2.379 12.2785 2.0503 11.9497Q1.7215 11.621 1.4392 11.2518L4.0057 9.2894Q4.3111 9.6889 4.7106 9.9943L2.7482 12.5608ZM7.8779 13.9447Q7.6595 13.9723 7.4398 13.9862Q7.2201 14 7 14Q6.7799 14 6.5602 13.9862Q6.3405 13.9723 6.1221 13.9447L6.5273 10.7395Q6.7627 10.7692 7 10.7692Q7.2373 10.7692 7.4727 10.7395L7.8779 13.9447ZM12.5608 11.2518Q12.2785 11.621 11.9497 11.9497Q11.621 12.2785 11.2518 12.5608L9.2894 9.9943Q9.6889 9.6889 9.9943 9.2894L12.5608 11.2518ZM13.9447 6.1221Q13.9723 6.3405 13.9862 6.5602Q14 6.7799 14 7Q14 7.2201 13.9862 7.4398Q13.9723 7.6595 13.9447 7.8779L10.7395 7.4727Q10.7692 7.2373 10.7692 7Q10.7692 6.7627 10.7395 6.5273L13.9447 6.1221ZM11.2518 1.4392Q11.621 1.7215 11.9497 2.0503Q12.2785 2.379 12.5608 2.7482L9.9943 4.7106Q9.6889 4.3111 9.2894 4.0057L11.2518 1.4392ZM7.8779 0.0553L7.4727 3.2605Q7.2373 3.2308 7 3.2308Q6.7627 3.2308 6.5273 3.2605L6.1221 0.0553Q6.3405 0.0277 6.5602 0.0138Q6.7799 -0 7 0Q7.2201 0 7.4398 0.0138Q7.6595 0.0277 7.8779 0.0553Z",
			fillRule: "evenodd"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-task-dialog/url-scheme-utils.ts
/**
* 拼接明文微信 URL Scheme。
*
* `scene` 是后端 `/v2/as/p/wxaqrcode/qrcode` 返回的 16 位 base62 短码，
* 拼接到 query 后小程序页面 onLoad 可通过 `options.scene` 读到，再走反查接口
* 获取真实 shareUrl —— 与小程序码扫码同一套链路。
*/
function buildWxMpUrlScheme(scene) {
	return `weixin://dl/business/?appid=${WX_MP_APPID}&path=${WX_MP_PATH}&query=${encodeURIComponent(`scene=${scene}`).slice(0, 512)}`;
}
/**
* 触发微信小程序 URL Scheme 唤起 —— **fire-and-forget**：
* 同步触发系统层协议跳转，**不**返回 Promise、**不**做唤起成功/失败的启发式判定。
*
* **为什么不再判定成功**：
* - 浏览器**没有公开 API** 告诉前端"用户在协议对话框点了取消"（W3C 隐私设计，防指纹），
*   只能靠 focus / visibilitychange 启发式间接推断，但实测各种边界场景（macOS 已记住选择
*   直接唤起、Windows 系统对话框延迟弹出、用户切窗口去回看链接等）都会让启发式误判。
* - 误判成"成功"会导致小程序码弹窗不弹，用户什么都看不到 —— 这是更严重的体验问题。
*
* **新策略**：调用方先请求小程序码拿到 { url, scene }，弹窗同步展示，URL Scheme 用 scene
* 作为 query 独立触发（fire-and-forget）。两者互不阻塞。
* - 系统真的把微信拉起来了 → 用户 App 内继续操作，小程序码弹窗对他无影响（切回来再关掉）
* - 系统没拉起来（未装 / 取消 / 协议未识别）→ 小程序码弹窗就是兜底入口
*
* 触发优先级：
* 1. 上层注入的 `openExternal`（VSCode `vscode.env.openExternal` / Electron `shell.openExternal`）
*    —— 走 OS 协议处理器，最干净
* 2. 隐藏 iframe 写 `src`（Web 浏览器场景）—— 行业标准做法，不污染当前页 URL
*
* iframe 在 ~3s 后自动从 DOM 移除，避免内存/DOM 泄漏。
*/
function triggerWxMpUrlScheme(scene, openExternal) {
	const scheme = buildWxMpUrlScheme(scene);
	if (openExternal) try {
		const ret = openExternal(scheme);
		if (ret && typeof ret.then === "function") ret.catch((err) => {
			console.warn("[ShareTaskDialog] URL Scheme openExternal failed, fallback to iframe:", err);
			triggerSchemeViaIframe(scheme);
		});
		return;
	} catch (err) {
		console.warn("[ShareTaskDialog] URL Scheme openExternal threw, fallback to iframe:", err);
	}
	triggerSchemeViaIframe(scheme);
}
function triggerSchemeViaIframe(scheme) {
	try {
		const iframe = document.createElement("iframe");
		iframe.style.display = "none";
		iframe.style.width = "0";
		iframe.style.height = "0";
		iframe.style.border = "none";
		iframe.setAttribute("aria-hidden", "true");
		iframe.src = scheme;
		document.body.appendChild(iframe);
		setTimeout(() => {
			if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
		}, IFRAME_CLEANUP_DELAY);
	} catch (err) {
		console.warn("[ShareTaskDialog] URL Scheme iframe trigger threw:", err);
	}
}
var WX_MP_APPID, WX_MP_PATH, IFRAME_CLEANUP_DELAY;
var init_url_scheme_utils = __esmMin((() => {
	WX_MP_APPID = "wx907c65e5e107ddcf";
	WX_MP_PATH = "pages/share/webview/index";
	IFRAME_CLEANUP_DELAY = 3e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-task-dialog/use-wx-share-fallback.ts
/**
* 给 `onWxShare` 的 Promise 包一层超时保护。
*
* 注意：超时只是放弃等待并触发兜底，并不会真正中止底层 RPC ——
* 实际的 `wechatShareLink` 还是会跑到底，避免污染 desktop 主进程状态。
*/
function withTimeout(p, ms, fallback) {
	return new Promise((resolve) => {
		let settled = false;
		const timer = setTimeout(() => {
			if (settled) return;
			settled = true;
			resolve(fallback);
		}, ms);
		p.then((value) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			resolve(value);
		}, (err) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			console.warn("[ShareTaskDialog] onWxShare rejected, fallback to qrcode chain:", err);
			resolve(fallback);
		});
	});
}
/**
* 微信分享兜底链：
*
*  shareLink (wxopensdk) ──成功──▶ 拉起微信客户端（产品确认不需要成功 toast）
*      │
*      └─失败─▶ 请求小程序码 → 拿到 { url, scene } →
*               ├─ 弹小程序码弹窗（同步展示）
*               └─ chat 场景用 scene 作为 query 触发 URL Scheme（fire-and-forget，独立触发）
*
*              小程序码获取失败 → fallback 链接二维码
*
* 同时管理二维码弹窗自身的可见性与文案；UI 只需消费返回的 `qrcode` 状态即可。
*/
function useWxShareFallback({ shareUrl, shareData, bizType, onWxShare, generateWxMPQRCode, onOpenExternal, t }) {
	const [wxShareLoading, setWxShareLoading] = (0, import_react$1.useState)(null);
	const [showQrcode, setShowQrcode] = (0, import_react$1.useState)(false);
	const [hintText, setHintText] = (0, import_react$1.useState)("");
	const [shouldGenerateQrcode, setShouldGenerateQrcode] = (0, import_react$1.useState)(false);
	const [qrcodeUrl, setQrcodeUrl] = (0, import_react$1.useState)("");
	/**
	* 展示「链接二维码」兜底：用调用方显式传入的 currentShareUrl 设置 qrcodeUrl，
	* 避免闭包捕获或初始 useState 导致的空 / 旧 URL 问题。
	*/
	const showLinkQrcodeWithUrl = (0, import_react$1.useCallback)((currentShareUrl, message = "") => {
		setQrcodeUrl(currentShareUrl);
		setShouldGenerateQrcode(true);
		setHintText("");
		setShowQrcode(true);
	}, []);
	const showLinkQrcode = (0, import_react$1.useCallback)((url) => {
		showLinkQrcodeWithUrl(url ?? shareUrl);
	}, [showLinkQrcodeWithUrl, shareUrl]);
	/**
	* 拉取微信小程序码并返回 url + scene；拿不到时 fallback 到当前 shareUrl 的链接二维码。
	* @param currentShareUrl 当前分享链接（必传，避免闭包/旧值）
	* @param shareCode prepareResult.shareCode（用于换取小程序码）
	* @param fallbackMessage fallback 时展示的提示文案
	*/
	const getWxQrcodeAndScene = (0, import_react$1.useCallback)(async (currentShareUrl, shareCode = "", fallbackMessage = "") => {
		try {
			const result = await generateWxMPQRCode?.(bizType, shareCode);
			if (result?.url) {
				setQrcodeUrl(result.url);
				setShouldGenerateQrcode(false);
				setShowQrcode(true);
				return {
					url: result.url,
					scene: result.scene || ""
				};
			}
		} catch (error) {
			console.warn("[ShareTaskDialog] getWxQrcodeAndScene failed, fallback to link qrcode:", error);
		}
		showLinkQrcodeWithUrl(currentShareUrl, fallbackMessage);
		return {
			url: "",
			scene: ""
		};
	}, [
		generateWxMPQRCode,
		bizType,
		showLinkQrcodeWithUrl
	]);
	const handleWxShareClick = (0, import_react$1.useCallback)(async (scene) => {
		if (!onWxShare || !shareUrl) return;
		setWxShareLoading(scene);
		setHintText(scene === "chat" ? t("conversation.shareFile.dialog.wxShareChatHint") : t("conversation.shareFile.dialog.wxShareTimelineHint"));
		setShouldGenerateQrcode(false);
		const txt = shareData?.conversation?.title || "WorkBuddy 分享";
		const desc = "来自WorkBuddy的分享";
		const shareCode = shareData?.prepareResult?.shareCode;
		const fallbackToQrcode = async () => {
			const { scene: qrScene } = await getWxQrcodeAndScene(shareUrl, shareCode);
			if (qrScene) triggerWxMpUrlScheme(qrScene, onOpenExternal);
		};
		try {
			const result = await withTimeout(onWxShare({
				url: shareUrl,
				scene,
				txt,
				desc,
				bizType,
				shareCode
			}), WX_SHARE_OVERALL_TIMEOUT, {
				success: false,
				errcode: 6,
				errmsg: "wxShare overall timeout"
			});
			if (!!!(result && typeof result === "object" && result.success)) {
				const errcode = result?.errcode;
				console.warn("[ShareTaskDialog] wxShare not success, fallback chain:", {
					errcode,
					errmsg: result?.errmsg
				});
				await fallbackToQrcode();
			}
		} catch (err) {
			console.error("[ShareTaskDialog] wxShare unexpected error, falling back to link qrcode:", err);
			try {
				await fallbackToQrcode();
			} catch (fallbackErr) {
				console.error("[ShareTaskDialog] fallbackToQrcode threw, force showing link qrcode:", fallbackErr);
				showLinkQrcodeWithUrl(shareUrl, t("conversation.shareFile.dialog.wxShareFailed"));
			}
		} finally {
			setWxShareLoading(null);
		}
	}, [
		onWxShare,
		shareUrl,
		shareData,
		bizType,
		t,
		getWxQrcodeAndScene,
		onOpenExternal,
		showLinkQrcodeWithUrl
	]);
	const closeQrcode = (0, import_react$1.useCallback)(() => setShowQrcode(false), []);
	return {
		wxShareLoading,
		handleWxShareClick,
		qrcode: {
			visible: showQrcode,
			url: qrcodeUrl,
			hintText,
			shouldGenerate: shouldGenerateQrcode
		},
		closeQrcode,
		showLinkQrcode
	};
}
var import_react$1, WX_SHARE_OVERALL_TIMEOUT;
var init_use_wx_share_fallback = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_url_scheme_utils();
	WX_SHARE_OVERALL_TIMEOUT = 12e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-task-dialog/index.tsx
/**
* 从消息中提取制品名称列表
* 遍历 messages 中 role=assistant 的消息，从其 content 中提取 artifact 信息
*/
function extractArtifactNames(shareData) {
	if (!shareData) return [];
	const names = [];
	const seen = /* @__PURE__ */ new Set();
	if (shareData.messages?.length) for (const msg of shareData.messages) {
		if (msg.role !== "assistant") continue;
		const content = msg.content;
		if (!Array.isArray(content)) continue;
		for (const block of content) {
			if (block.type === "artifact" && block.title) {
				const key = block.title;
				if (!seen.has(key)) {
					seen.add(key);
					names.push(key);
				}
			}
			if (block.type === "tool_result" || block.type === "tool_use") {
				const title = block.name || block.title;
				if (title && !seen.has(title)) {
					seen.add(title);
					names.push(title);
				}
			}
		}
	}
	if (names.length === 0 && shareData.artifacts?.length) {
		for (const entry of shareData.artifacts) if (!entry.isDirectory && !seen.has(entry.name)) {
			seen.add(entry.name);
			names.push(entry.name);
		}
	}
	return names;
}
var import_react, import_react_dom, import_jsx_runtime, ShareTaskDialog;
var init_share_task_dialog = __esmMin((() => {
	init_share_task_dialog$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_clipboard();
	init_environment();
	init_icons();
	init_use_wx_share_fallback();
	import_jsx_runtime = require_jsx_runtime();
	ShareTaskDialog = ({ visible, loading, error, shareData, bizType = "artifact", generateWxMPQRCode, onClose, onCopyLink, onWxShare, onSocialShare, onCopyQRCode, onSaveQRCode, generateQRCode, onOpenExternal, onDownloadMarkdown, productDisplayName, onTrack }) => {
		const t = useTranslation();
		const [copying, setCopying] = (0, import_react.useState)(false);
		const [generalLoading, setGeneralLoading] = (0, import_react.useState)(null);
		const shareUrl = shareData?.confirmResult?.shareUrl || "";
		const { wxShareLoading, handleWxShareClick, qrcode, closeQrcode, showLinkQrcode } = useWxShareFallback({
			shareUrl,
			shareData,
			bizType,
			onWxShare,
			generateWxMPQRCode,
			onOpenExternal,
			t
		});
		const loadingChannel = generalLoading || (wxShareLoading === "chat" ? ShareChannel.WX : wxShareLoading === "timeline" ? ShareChannel.TIMELINE : null);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (e) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [visible, onClose]);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			onTrack?.({
				elementId: "share_channel_panel",
				eventType: "web_element_show",
				extraProps: {
					pageName: bizType === "conversation" ? "share_chat" : "share_artifact",
					source: "task_dialog"
				}
			});
		}, [visible]);
		const handleOverlayClick = (0, import_react.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		/**
		* 复制分享链接。
		* 对齐 ShareFileDialog.handleCopyUrl：链接文案统一在组件内拼接为 `【productDisplayName】title url`。
		* onCopyLink 仅负责返回纯分享链接（含调用方的埋点 / 平台参数处理），未提供时回退到 shareUrl。
		*/
		const handleCopyUrl = (0, import_react.useCallback)(async () => {
			if (!shareData) return;
			setCopying(true);
			setGeneralLoading(ShareChannel.COPY_LINK);
			try {
				const rawUrl = onCopyLink ? await onCopyLink(shareData) : shareUrl;
				if (!rawUrl) return;
				const url = appendShareChannelExt(rawUrl, ShareChannelExt2.CopyLink);
				const title = shareData.conversation?.title || t("shareTask.dialog.title");
				if (await copyToClipboard(`${productDisplayName ? `【${productDisplayName}】` : ""}${title} ${url}`)) toast.success(t("shareTask.dialog.copyLinkSuccess"));
				else toast.error(t("shareTask.dialog.copyLinkFailed"));
			} catch {
				toast.error(t("shareTask.dialog.copyLinkFailed"));
			} finally {
				setCopying(false);
				setGeneralLoading(null);
			}
		}, [
			shareData,
			onCopyLink,
			shareUrl,
			t,
			productDisplayName
		]);
		const artifactNames = (0, import_react.useMemo)(() => extractArtifactNames(shareData), [shareData]);
		if (!visible) return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "share-task-dialog-overlay",
			onClick: handleOverlayClick,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "share-task-dialog-container",
				style: qrcode.visible ? { visibility: "hidden" } : {},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "share-task-dialog-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "share-task-dialog-title-wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "share-task-dialog-title",
								children: t("shareTask.dialog.title")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "share-task-dialog-close",
							onClick: onClose,
							type: "button",
							"aria-label": "Close",
							children: "×"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "share-task-dialog-body",
						children: [
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "share-task-dialog-loading",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareLoadingIcon, {})
							}),
							error && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "share-task-dialog-status share-task-dialog-status--error",
								children: t("shareTask.dialog.shareFailed")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "share-task-dialog-error",
								children: [
									t("shareTask.dialog.error"),
									": ",
									error
								]
							})] }),
							!loading && !error && shareData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "share-task-dialog-card-wrapper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "share-task-dialog-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "share-task-dialog-card-icon",
										children: bizType === "artifact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTypeIcon, { fileName: shareData.conversation?.title ?? "" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkChainIcon, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "share-task-dialog-card-info",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "share-task-dialog-card-title share-task-dialog-card-title--link",
											href: shareUrl,
											onClick: (e) => {
												e.preventDefault();
												if (onOpenExternal && shareUrl) onOpenExternal(shareUrl);
											},
											children: shareData.conversation?.title || t("shareTask.dialog.title")
										})
									})]
								}), artifactNames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "share-task-dialog-section",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "share-task-dialog-section-divider" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "share-task-dialog-section-title",
											children: t("shareTask.dialog.artifactList", { count: artifactNames.length })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "share-task-dialog-artifact-list",
											children: artifactNames.map((name, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
												className: "share-task-dialog-artifact-item",
												children: name
											}, idx))
										})
									]
								})]
							}) })
						]
					}),
					!loading && !error && shareData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "share-task-dialog-footer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "share-task-dialog-share-to-label",
								children: [
									t("conversation.shareFile.dialog.shareTo") || "分享到",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t("conversation.shareFile.dialog.public.tips") || "请勿未经允许分享个人信息或第三方内容。详情请查询我们的 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://privacy.qq.com/document/preview/771d9a58551449e9a7e7445ebfe04966",
											target: "_blank",
											rel: "noopener noreferrer",
											style: {
												color: "inherit",
												textDecoration: "underline",
												cursor: "pointer"
											},
											onClick: (e) => {
												e.preventDefault();
												const url = "https://privacy.qq.com/document/preview/771d9a58551449e9a7e7445ebfe04966";
												if (onOpenExternal) onOpenExternal(url);
												else window.open(url, "_blank", "noopener,noreferrer");
											},
											children: t("conversation.shareFile.dialog.public.tipsLink") || "隐私保护声明"
										})] }),
										portal: false,
										interactive: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "share-task-dialog-question-icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareQuestionIcon, {})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("conversation.shareFile.dialog.shareToTip") || "点击任意渠道分享后，将自动生成公开链接" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareChannelButtons, {
								onWxShare: !isOverseas() ? shareUrl ? (scene) => handleWxShareClick(scene) : void 0 : void 0,
								onCopyLink: handleCopyUrl,
								onGenerateQRCode: !isOverseas() && generateQRCode && shareUrl ? () => {
									setGeneralLoading(ShareChannel.QR_CODE);
									showLinkQrcode(appendShareChannelExt(shareUrl, ShareChannelExt2.QrCode));
									requestAnimationFrame(() => setGeneralLoading(null));
								} : void 0,
								onOpenExternal: onOpenExternal ? () => {
									setGeneralLoading(ShareChannel.OPEN_EXTERNAL);
									onOpenExternal(appendShareChannelExt(shareUrl, ShareChannelExt2.BrowserIcon));
									requestAnimationFrame(() => setGeneralLoading(null));
								} : void 0,
								onSocialShare: isOverseas() && onSocialShare && shareUrl ? (channel) => {
									onSocialShare(channel, shareUrl, shareData?.conversation?.title?.trim() ?? "");
								} : void 0,
								loadingChannel,
								busy: copying,
								t,
								bizType: bizType === "conversation" ? "chat" : "artifact",
								fileName: bizType === "artifact" ? shareData?.conversation?.title : void 0,
								onTrack
							}),
							onDownloadMarkdown && shareData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "share-task-dialog-action-btn",
								onClick: () => onDownloadMarkdown(shareData),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "share-task-dialog-action-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "22",
										height: "22",
										viewBox: "0 0 22 22",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M11 3v10M11 13l-4-4M11 13l4-4M3 17h16",
											stroke: "currentColor",
											strokeWidth: "1.8",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "下载 MD" })]
							})
						]
					})
				]
			}), shareUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrcodeFallbackDialog, {
				visible: qrcode.visible,
				showMask: false,
				onClose: closeQrcode,
				shareUrl: qrcode.url,
				hintText: qrcode.hintText,
				generateQRCode,
				shouldGenerateQrcode: qrcode.shouldGenerate,
				onCopyQRCode,
				onSaveQRCode,
				t
			})]
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/share-platform-helpers.ts
/**
* 分享场景的平台 helper（微信 / 二维码 / 剪贴板 / 本地保存）。
*
* 抽离自 use-share-selection-channels（该 hook 已逼近行数硬阈值），承载与 React 无关的
* 浏览器/桌面平台能力，供 ShareFileDialog / ShareTaskDialog / 分享栏复用同一套实现。
*/
/**
* 把任意 HTTP(S) 图片 URL 或 data URL 解码 → 缩放 → 重新编码为 `data:image/png;base64,...`。
*
* 为什么必须重新编码：
* 1. 后端 cosUrl 实际是 JPEG，blob.type 通常为 image/jpeg；
* 2. Desktop 主进程注入的 dataUrl 也可能是 jpeg；
* 3. Chromium 的 `ClipboardItem` 写入剪贴板**只白名单 image/png**，写 jpeg 会失败
*    或粘贴方（微信 / Finder 等）识别不到；
* 4. cosUrl 跨域时，<img> 能展示但 canvas drawImage 也会被阻止读取像素，必须先 fetch 成 blob。
*
* 同时支持下采样（`maxSize`），二维码本身分辨率不需要太高，缩到 ≤240px 边长可把 PNG 体积
* 压到原大小的 ~1/4，对扫码识别基本无影响。
*
* @param url    源 URL，可以是 https / data:URL
* @param maxSize 输出 PNG 的最大边长（保持长宽比缩放）；不传则保持原尺寸
*/
async function fetchAsPngDataUrl(url, maxSize) {
	const res = await fetch(url, {
		mode: "cors",
		credentials: "omit"
	});
	if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
	const blob = await res.blob();
	let bitmapSource = null;
	let objectUrl = null;
	try {
		if (typeof createImageBitmap === "function") bitmapSource = await createImageBitmap(blob);
		else {
			objectUrl = URL.createObjectURL(blob);
			bitmapSource = await new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => resolve(img);
				img.onerror = () => reject(/* @__PURE__ */ new Error("image decode failed"));
				img.src = objectUrl;
			});
		}
		const srcWidth = bitmapSource.width || bitmapSource.naturalWidth;
		const srcHeight = bitmapSource.height || bitmapSource.naturalHeight;
		if (!srcWidth || !srcHeight) throw new Error("image has invalid size");
		let dstWidth = srcWidth;
		let dstHeight = srcHeight;
		if (maxSize && Math.max(srcWidth, srcHeight) > maxSize) {
			const ratio = maxSize / Math.max(srcWidth, srcHeight);
			dstWidth = Math.round(srcWidth * ratio);
			dstHeight = Math.round(srcHeight * ratio);
		}
		const canvas = document.createElement("canvas");
		canvas.width = dstWidth;
		canvas.height = dstHeight;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("2d context not available");
		ctx.drawImage(bitmapSource, 0, 0, dstWidth, dstHeight);
		return canvas.toDataURL("image/png");
	} finally {
		if (objectUrl) URL.revokeObjectURL(objectUrl);
		if (bitmapSource && typeof bitmapSource.close === "function") bitmapSource.close();
	}
}
/** 加载图片，失败返回 null */
function loadImage(src) {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => resolve(null);
		img.src = src;
	});
}
/** 在 canvas 中央绘制圆形 logo（白色底衬 + 圆形裁剪头像） */
function drawCenterLogo(ctx, img, canvasSize) {
	const logoSize = Math.round(canvasSize * .2);
	const cx = canvasSize / 2;
	const cy = canvasSize / 2;
	const r = logoSize / 2;
	ctx.save();
	ctx.beginPath();
	ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, Math.PI * 2);
	ctx.clip();
	ctx.drawImage(img, cx - r, cy - r, logoSize, logoSize);
	ctx.restore();
}
/**
* 生成分享链接二维码 Data URL，并在中央嵌入产品头像 logo。
* 使用 dynamic import 让 `qrcode` 包与 logo 图片按需加载，避免首屏 bundle 增大。
*/
async function generateShareQRCode(url) {
	const [QRCode, logoModule] = await Promise.all([__vitePreload(() => import("./browser-C0-68Hhs.js").then((n) => /* @__PURE__ */ __toESM(n.t())).then((m) => m.default), __vite__mapDeps([0,1]), import.meta.url), __vitePreload(() => import("./user-menu-avatar-DZ2_gXGP.js").then((n) => (n.t(), n.r)), __vite__mapDeps([2,1]), import.meta.url)]);
	const size = 336;
	const canvas = document.createElement("canvas");
	await QRCode.toCanvas(canvas, url, {
		errorCorrectionLevel: "H",
		margin: 1,
		width: size
	});
	const ctx = canvas.getContext("2d");
	if (ctx) {
		const logo = await loadImage(logoModule.default);
		if (logo) drawCenterLogo(ctx, logo, canvas.width);
	}
	return canvas.toDataURL("image/png");
}
/**
* 微信分享处理函数。
* 桌面端通过 window.__wxShareHandler 注入实际实现（ticket + iframe）；
* Web 环境下返回失败，触发兜底二维码。
*/
async function handleWxShare(params) {
	const handler = window.__wxShareHandler;
	if (handler) return handler(params);
	return {
		success: false,
		errcode: 1,
		errmsg: "WeChat share not supported in web environment"
	};
}
async function handleWxShareFile(params) {
	const handler = window.__wxShareFileHandler;
	if (handler) return handler(params);
	return {
		success: false,
		errcode: 1,
		errmsg: "WeChat file share not supported in web environment"
	};
}
/**
* 拷贝二维码到剪贴板。
* 桌面端通过 window.__copyQRCodeHandler 注入（clipboard.writeImage）。
*/
async function handleCopyQRCode(dataUrl) {
	const handler = window.__copyQRCodeHandler;
	if (handler) return handler(dataUrl);
	try {
		const blob = await (await fetch(dataUrl)).blob();
		await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
	} catch (err) {
		console.error("[handleCopyQRCode] Failed:", err);
		throw err;
	}
}
/**
* 保存二维码到本地。
* 桌面端通过 window.__saveQRCodeHandler 注入（dialog.showSaveDialog）。
*/
async function handleSaveQRCode(dataUrl) {
	const handler = window.__saveQRCodeHandler;
	if (handler) return handler(dataUrl);
	const link = document.createElement("a");
	link.href = dataUrl;
	link.download = "qrcode.png";
	link.click();
}
var init_share_platform_helpers = __esmMin((() => {
	init_preload_helper();
}));
//#endregion
export { handleWxShare as a, ShareTaskDialog as c, handleSaveQRCode as i, init_share_task_dialog as l, generateShareQRCode as n, handleWxShareFile as o, handleCopyQRCode as r, init_share_platform_helpers as s, fetchAsPngDataUrl as t };
