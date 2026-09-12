const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./task-preview-sx_Ew0fe.js","./chunk-BRZcfu7K.js","./src-DRGoWjIu.js","./preload-helper-E3UYCQGP.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./resize-observer-QOR-7G1T.js","./wasm-C4lriWle.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./classnames-BYn3_ESJ.js","./decode-HthuYB5G.js","./index.dom-Hjybw7gi.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./hast-util-whitespace-C3G7AbkX.js","./katex-sFwAzkhG.js","./lodash-D1c13HHR.js","./merge-CDI2sNhv.js","./throttle-mAPE4S6V.js","./isObjectLike-Dan5H4Gd.js","./isSymbol-DlS8bGaY.js","./lucide-react-CmX0JwWL.js","./client-BPkZUIji.js","./jsx-runtime-BNEdAQtr.js","./dist-CSHw4oQX.js","./i18n-DH8xcldp.js","./chevron-down-icon-Bs9CIPFg.js","./copied-icon-Cvsbo-xy.js","./copy-icon-BUIWKTIn.js","./edit-icon-9Lcq4c36.js","./src-D47LCgt5.css","./markdown-utils-HwTwYIv3.js","./texmath-B7nw6kf-.js","./markdown-utils-Dcxscm20.css","./StatusPlaceholder-ap1bLSpN.js","./i18n-Bt_Wap4p.js","./environment-DKqg3f0G.js","./StatusPlaceholder-Ds6ACyNM.css","./artifact-slot-panel-BE_W05-j.js","./icons-Cj3UopO9.js","./ArtifactFileIconTypes-mWPconF_.js","./icons-CmEjl25S.css","./file-path-DzzGeaqx.js","./format-bytes-CfLBp0EL.js","./artifact-drag-Dlide0j-.js","./PreviewIframe-DY_P1ukz.js","./purify.es-Buzz9Dxi.js","./PreviewIframe-BNnz6-Um.css","./message-transforms-DGKAEdDo.js","./is-mobile-ua-B8SGTv_t.js","./visualizer-show-widget-payload-BO60iXXM.js","./useI18n-DDytAo7_.js","./task-preview-kRwOxLTs.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { B as accountService, n as init_common, p as WxaQrcodeSceneTypes } from "./common-CwB_VqKR.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { _ as isLearnBuddy, p as init_environment, t as getBrandName, v as isOverseas, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { m as useParams, r as init_dist } from "./dist-BlOCCi14.js";
import { T as AuthProvider, ht as AccountContext, t as init_contexts } from "./contexts-D7XKqa2J.js";
import { t as AdapterContext } from "./adapter-context-DGaRYQ5R.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { at as useShareFeature, t as init_product_features } from "./product-features-N4Z0q4SS.js";
import { n as wechatmp_qr_code_default, t as init_wechatmp_qr_code } from "./wechatmp-qr-code-Cy7xHDnU.js";
import { i as init_header_icon, n as init_header_icon_dark } from "./header-icon-dark-DmGJ_Yaj.js";
import { c as ShareTaskDialog, l as init_share_task_dialog, n as generateShareQRCode, s as init_share_platform_helpers } from "./share-platform-helpers-CW_vKxsD.js";
import { i as init_adapters, r as createAgentAdapter } from "./loginRedirect-C0Cwucud.js";
import { n as init_header_workbuddy } from "./header-workbuddy-UO2zaYBA.js";
import { n as init_StatusPlaceholder, t as StatusPlaceholder } from "./StatusPlaceholder-ap1bLSpN.js";
import { n as init_miniprogram_qr_button, t as MiniProgramQRButton } from "./miniprogram-qr-button-CNjYqBuB.js";
import { a as ChatWithWorkBuddyButton, c as init_header_learnbuddy, i as init_OpenOrDownloadWorkBuddyButton, n as usePreviewDocumentTitle, o as init_ChatWithWorkBuddyButton, r as OpenOrDownloadWorkBuddyButton, t as init_usePreviewDocumentTitle } from "./usePreviewDocumentTitle-CUZjOsJf.js";
import { i as isWXMiniProgram, r as init_ua } from "./is-mobile-ua-B8SGTv_t.js";
//#region ../../packages/agent-ui/src/components/share-preview/task/index.less
var init_task$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/PreviewContent.tsx
var import_react$1, import_jsx_runtime$1, ShareTaskPreview, PreviewContent;
var init_PreviewContent = __esmMin((() => {
	init_common();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_header_icon();
	init_header_icon_dark();
	init_header_learnbuddy();
	init_header_workbuddy();
	init_wechatmp_qr_code();
	init_contexts();
	init_product_features();
	init_useI18n();
	init_environment();
	init_share_platform_helpers();
	init_ua();
	init_miniprogram_qr_button();
	init_share_task_dialog();
	init_ChatWithWorkBuddyButton();
	init_OpenOrDownloadWorkBuddyButton();
	init_StatusPlaceholder();
	init_usePreviewDocumentTitle();
	import_jsx_runtime$1 = require_jsx_runtime();
	init_preload_helper();
	ShareTaskPreview = import_react$1.lazy(() => __vitePreload(() => import("./task-preview-sx_Ew0fe.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]), import.meta.url));
	PreviewContent = () => {
		const t = useTranslation();
		const adapter = import_react$1.useContext(AdapterContext);
		const { code } = useParams();
		const previewRef = (0, import_react$1.useRef)(null);
		const [replayState, setReplayState] = (0, import_react$1.useState)("idle");
		(0, import_react$1.useEffect)(() => {
			const timer = setInterval(() => {
				if (previewRef.current) setReplayState(previewRef.current.replayState);
			}, 200);
			return () => clearInterval(timer);
		}, []);
		const [shareDetail, setShareDetail] = (0, import_react$1.useState)(null);
		const [shareError, setShareError] = (0, import_react$1.useState)(null);
		const [loadingState, setLoadingState] = (0, import_react$1.useState)("idle");
		const [verifyData, setVerifyData] = (0, import_react$1.useState)(null);
		const [verifyError, setVerifyError] = (0, import_react$1.useState)(null);
		const [isVerifying, setIsVerifying] = (0, import_react$1.useState)(false);
		const shareStatus = (0, import_react$1.useMemo)(() => {
			if (!shareDetail) return null;
			if (shareDetail.isExpired) return "expired";
			if (shareDetail.status === "disabled") return "disabled";
			if (shareDetail.hasExtractionCode) return "extractionCodeRequired";
			return "normal";
		}, [shareDetail]);
		(0, import_react$1.useEffect)(() => {
			if (!code) {
				console.warn("[Preview] No share code provided");
				setShareError("No share code provided");
				setLoadingState("error");
				return;
			}
			const backendProvider = adapter?.getBackendProvider?.();
			if (!backendProvider?.getTaskShareDetail) {
				console.warn("[Preview] BackendProvider or getTaskShareDetail not available yet");
				return;
			}
			let mounted = true;
			const loadShareDetail = async () => {
				setLoadingState("loading");
				try {
					const result = await backendProvider.getTaskShareDetail(code);
					if (!mounted) return;
					if (!result.error && result.data) {
						setShareDetail(result.data);
						setShareError(null);
						setLoadingState("success");
					} else {
						setShareError(result.error || "Unknown error");
						setShareDetail(null);
						setLoadingState("error");
					}
				} catch (err) {
					if (mounted) {
						console.error("[Preview] getTaskShareDetail unexpected error:", err);
						setShareError(err instanceof Error ? err.message : "Network error");
						setShareDetail(null);
						setLoadingState("error");
					}
				}
			};
			loadShareDetail();
			return () => {
				mounted = false;
			};
		}, [code, adapter]);
		(0, import_react$1.useEffect)(() => {
			if (shareStatus !== "normal" || !code) return;
			const backendProvider = adapter?.getBackendProvider?.();
			if (!backendProvider?.verifyTaskShare) {
				console.warn("[Preview] BackendProvider or verifyTaskShare not available");
				return;
			}
			let mounted = true;
			setIsVerifying(true);
			setVerifyError(null);
			const loadContent = async () => {
				try {
					const result = await backendProvider.verifyTaskShare({ code });
					if (!mounted) return;
					if (!result.error && result.data) {
						setVerifyData(result.data);
						setVerifyError(null);
					} else {
						setVerifyData(null);
						setVerifyError(result.error || "Verify failed");
					}
				} catch (err) {
					if (mounted) {
						console.error("[Preview] verifyTaskShare unexpected error:", err);
						setVerifyData(null);
						setVerifyError(err instanceof Error ? err.message : "Network error");
					}
				} finally {
					if (mounted) setIsVerifying(false);
				}
			};
			loadContent();
			return () => {
				mounted = false;
			};
		}, [
			shareStatus,
			code,
			adapter
		]);
		const messages = verifyData?.conversationData ?? null;
		const artifacts = verifyData?.artifacts ?? [];
		const shareName = verifyData?.name ?? shareDetail?.name ?? "";
		usePreviewDocumentTitle({ fileName: shareName });
		(0, import_react$1.useEffect)(() => {
			if (!adapter || !shareName) return;
			const searchParams = new URLSearchParams(window.location.search);
			adapter.reportTelemetry?.("web_page_show", {
				pageName: "share_view",
				pageTitle: shareName || "",
				type: "chat",
				mode: "page",
				ext1: isWXMiniProgram() ? "miniprogram" : "web",
				ext2: searchParams.get("ext2") || "unknown"
			});
		}, [adapter, shareName]);
		const isShareEnabled = useShareFeature();
		const [shareDialogVisible, setShareDialogVisible] = (0, import_react$1.useState)(false);
		const shareData = (0, import_react$1.useMemo)(() => {
			if (!verifyData || !messages || !code) return null;
			const shareUrl = window.location.href;
			return {
				conversation: {
					id: code,
					title: shareName
				},
				messages,
				artifacts: artifacts.map((a) => ({
					name: a.name,
					path: a.path ?? "",
					isFile: true,
					isDirectory: false,
					size: a.size ?? 0
				})),
				prepareResult: {
					success: true,
					shareCode: code,
					shareUrl
				},
				confirmResult: {
					success: true,
					shareCode: code,
					shareUrl
				}
			};
		}, [
			verifyData,
			messages,
			artifacts,
			shareName,
			code
		]);
		const handleShareCopyLink = (0, import_react$1.useCallback)(async (data) => data.confirmResult?.shareUrl ?? window.location.href, []);
		const handleWxShare = (0, import_react$1.useCallback)(async () => ({
			success: false,
			errcode: -1,
			errmsg: "wechat-not-available"
		}), []);
		const generateWxMPQRCode = (0, import_react$1.useCallback)(async (type, shareCode) => {
			const backendProvider = adapter?.getBackendProvider?.();
			if (backendProvider?.generateMiniProgramQRCode && shareCode) {
				const result = await backendProvider.generateMiniProgramQRCode({
					sceneType: WxaQrcodeSceneTypes.SHARE_TRANSIT,
					bizType: type,
					shareCode
				});
				if (!result.error && result.data?.cosUrl) return {
					url: result.data.cosUrl,
					scene: result.data?.scene || ""
				};
				console.warn("[Preview] generateMiniProgramQRCode failed, fallback to static QR:", result.error);
			}
			return {
				url: wechatmp_qr_code_default,
				scene: ""
			};
		}, [adapter]);
		const handleSaveQRCode = (0, import_react$1.useCallback)(async (dataUrl) => {
			const link = document.createElement("a");
			link.href = dataUrl;
			link.download = "share-qrcode.png";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}, []);
		const handleCopyQRCode = (0, import_react$1.useCallback)(async (dataUrl) => {
			const blob = await (await fetch(dataUrl)).blob();
			if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) throw new Error("clipboard write not supported");
			await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
		}, []);
		/**
		* 将多维状态折叠成单一视图类型，按优先级自上而下判别：
		*   1) 第一阶段未结束 / 进行中 → loading
		*   2) 第一阶段失败 → detailError
		*   3) 第一阶段成功，根据 shareStatus 分派（expired / disabled / extractionCodeRequired）
		*   4) shareStatus === 'normal' 时：第二阶段进行中 → loading；失败 → verifyError；成功 → ready
		*/
		const view = (0, import_react$1.useMemo)(() => {
			if (loadingState === "idle" || loadingState === "loading") return { kind: "loading" };
			if (loadingState === "error") return {
				kind: "detailError",
				message: shareError ?? "Unknown error"
			};
			switch (shareStatus) {
				case "expired": return { kind: "expired" };
				case "disabled": return { kind: "disabled" };
				case "extractionCodeRequired": return { kind: "extractionCodeRequired" };
				case "normal":
					if (isVerifying) return { kind: "loading" };
					if (verifyError) return {
						kind: "verifyError",
						message: verifyError
					};
					if (verifyData && messages) return { kind: "ready" };
					return { kind: "loading" };
				default: return { kind: "loading" };
			}
		}, [
			loadingState,
			shareError,
			shareStatus,
			isVerifying,
			verifyError,
			verifyData,
			messages
		]);
		const renderView = () => {
			switch (view.kind) {
				case "loading": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
					type: "loading",
					title: t("common.loading")
				});
				case "detailError": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
					type: "error",
					title: t("preview.error.loadFailed"),
					description: view.message,
					onRetry: () => window.location.reload(),
					retryText: t("common.retry")
				});
				case "expired": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
					type: "error",
					title: t("preview.error.expired"),
					description: t("preview.error.expiredDesc")
				});
				case "disabled": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
					type: "error",
					title: t("preview.error.disabled"),
					description: t("preview.error.disabledDesc")
				});
				case "extractionCodeRequired": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
					type: "warning",
					title: t("preview.error.extractionCodeRequired"),
					description: t("preview.error.extractionCodeRequiredDesc")
				});
				case "verifyError": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
					type: "error",
					title: t("preview.error.loadFailed"),
					description: view.message,
					onRetry: () => window.location.reload(),
					retryText: t("common.retry")
				});
				case "ready": return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_react$1.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StatusPlaceholder, {
						type: "loading",
						title: t("common.loading")
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareTaskPreview, {
						ref: previewRef,
						name: shareName,
						messages,
						artifacts
					})
				});
				default: return view;
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "preview-page",
			children: [
				!(0, import_react$1.useMemo)(() => {
					if (typeof window === "undefined") return false;
					const value = new URLSearchParams(window.location.search).get("hide_page_header");
					if (value === null) return false;
					const normalized = value.trim().toLowerCase();
					return normalized !== "" && normalized !== "0" && normalized !== "false";
				}, []) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", {
					className: "preview-page__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "preview-page__header-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
							className: "preview-page__logo",
							children: isLearnBuddy() ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
								src: "" + new URL("header-learnbuddy-iuKBNpx_.svg", import.meta.url).href,
								alt: "LearnBuddy",
								className: "logo-workbuddy",
								width: 24,
								height: 24
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "logo-workbuddy-title",
								children: getBrandName()
							})] }) : isWorkBuddy() ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
								src: "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_100_1124)'%3e%3crect%20width='24'%20height='24'%20rx='5.14286'%20fill='url(%23paint0_linear_100_1124)'/%3e%3cg%20filter='url(%23filter0_f_100_1124)'%3e%3ccircle%20cx='18.3915'%20cy='24.4723'%20r='7.30463'%20fill='%23FFE355'%20fill-opacity='0.49'/%3e%3c/g%3e%3cpath%20d='M16.8325%201.49185C17.0548%201.29241%2017.0679%201.2839%2017.2311%201.27411C17.4955%201.25478%2017.7382%201.38174%2018.1504%201.75707C19.1137%202.63236%2020.4543%204.4325%2021.2883%205.96929L21.6111%206.5655L22.0665%206.79192C22.5058%207.01393%2023.2257%207.46951%2023.5267%207.71363C23.6628%207.82617%2023.6824%207.82826%2023.8239%207.77323C24.4626%207.52448%2025.3778%207.85405%2026.1849%208.62819C26.9115%209.32456%2027.608%2010.5149%2027.8746%2011.508C27.9135%2011.6679%2027.9648%2012.0114%2027.9836%2012.2671C28.0444%2013.1656%2027.7559%2013.8837%2027.201%2014.2085C27.088%2014.2738%2027.0807%2014.2915%2027.0838%2014.5739C27.1094%2015.9195%2026.746%2017.2627%2026.0174%2018.5725C25.1949%2020.0431%2023.7309%2021.5646%2021.749%2022.9978C20.6847%2023.7724%2018.1656%2025.2395%2017.027%2025.7546C14.2996%2026.9824%2012.1128%2027.4537%2010.2136%2027.221C9.08082%2027.0837%207.7985%2026.6415%207.03988%2026.1283C6.84042%2025.9904%206.80877%2025.9813%206.65653%2026.0248C5.8443%2026.2581%204.78008%2025.779%203.87639%2024.7759C3.51596%2024.3748%202.93382%2023.3904%202.74525%2022.8636C2.30913%2021.6307%202.39666%2020.5184%202.97762%2019.8539C3.12772%2019.6828%203.13247%2019.6752%203.0997%2019.3877C3.04555%2018.9166%203.02112%2018.219%203.04586%2017.769L3.06482%2017.3487L2.43386%2016.2324C1.45682%2014.4939%200.836658%2013.0338%200.597232%2011.9185C0.470862%2011.307%200.478498%2011.036%200.633714%2010.8352C0.728206%2010.7139%201.03828%2010.588%201.41189%2010.519C2.35259%2010.354%204.40363%2010.504%206.68539%2010.9068L6.92189%2010.9473L7.44287%2010.4864C8.30763%209.72042%208.88266%209.29135%209.94174%208.63098C11.0456%207.94031%2012.2916%207.37199%2013.6946%206.9221L14.1444%206.77741L14.392%206.12815C15.278%203.78949%2016.1856%202.0654%2016.8325%201.49185ZM9.41133%2013.476C8.41006%2014.054%207.90943%2014.3432%207.54156%2014.6671C6.05186%2015.9789%205.49506%2018.0569%206.12928%2019.9378C6.28591%2020.4021%206.57475%2020.9027%207.15249%2021.9034C7.73039%2022.9043%208.01983%2023.4053%208.34364%2023.7732C9.65542%2025.2628%2011.7334%2025.8196%2013.6143%2025.1854C14.0788%2025.0288%2014.5795%2024.7398%2015.5808%2024.1617L21.3402%2020.8365C22.3412%2020.2586%2022.8421%2019.9692%2023.2099%2019.6454C24.6996%2018.3336%2025.2564%2016.2556%2024.6222%2014.3747C24.4656%2013.9103%2024.1764%2013.4093%2023.5985%2012.4083C23.0207%2011.4075%2022.7316%2010.9071%2022.4079%2010.5393C21.0961%209.04964%2019.0181%208.49284%2017.1372%209.12707C16.6728%209.28371%2016.1717%209.57283%2015.1707%2010.1508L9.41133%2013.476Z'%20fill='url(%23paint1_linear_100_1124)'/%3e%3crect%20x='9.9668'%20y='17.5005'%20width='2.27533'%20height='4.72569'%20rx='1.13767'%20transform='rotate(-30%209.9668%2017.5005)'%20fill='white'/%3e%3crect%20x='16.1055'%20y='13.9562'%20width='2.27533'%20height='4.72569'%20rx='1.13767'%20transform='rotate(-30%2016.1055%2013.9562)'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_f_100_1124'%20x='4.84364'%20y='10.9244'%20width='27.0959'%20height='27.0958'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='3.12164'%20result='effect1_foregroundBlur_100_1124'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_100_1124'%20x1='12'%20y1='0'%20x2='12'%20y2='24'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%230EC8A9'/%3e%3cstop%20offset='1'%20stop-color='%2301C886'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_100_1124'%20x1='8.92652'%20y1='6.00417'%20x2='19.5466'%20y2='24.3986'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='white'%20stop-opacity='0.8'/%3e%3cstop%20offset='0.437689'%20stop-color='white'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_100_1124'%3e%3crect%20width='24'%20height='24'%20rx='5.14286'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
								alt: "WorkBuddy",
								className: "logo-workbuddy",
								width: 24,
								height: 24
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "logo-workbuddy-title",
								children: getBrandName()
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
								src: "" + new URL("header-icon-dark-B6QVQZjG.svg", import.meta.url).href,
								alt: "CodeBuddy",
								className: "logo-dark"
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
								src: "" + new URL("header-icon-DKPVU6OC.svg", import.meta.url).href,
								alt: "CodeBuddy",
								className: "logo-light"
							})] })
						})
					}), !isWXMiniProgram() && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "preview-page__header-right",
						children: [
							isShareEnabled && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "preview-page__action-btn",
								onClick: () => setShareDialogVisible(true),
								disabled: !shareData,
								"aria-label": t("preview.share"),
								title: t("preview.share"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.8",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
											cx: "18",
											cy: "5",
											r: "3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
											cx: "6",
											cy: "12",
											r: "3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
											cx: "18",
											cy: "19",
											r: "3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
											x1: "8.59",
											y1: "13.51",
											x2: "15.42",
											y2: "17.49"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
											x1: "15.41",
											y1: "6.51",
											x2: "8.59",
											y2: "10.49"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "preview-page__action-btn",
								onClick: () => previewRef.current?.startReplay(),
								disabled: replayState === "playing" || replayState === "paused",
								"aria-label": replayState === "playing" || replayState === "paused" ? t("shareTaskPreview.replaying") : t("shareTaskPreview.replay"),
								title: replayState === "playing" || replayState === "paused" ? t("shareTaskPreview.replaying") : t("shareTaskPreview.replay"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.8",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
										cx: "12",
										cy: "12",
										r: "10"
									}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("polygon", { points: "10 8 16 12 10 16 10 8" })]
								})
							}),
							!isLearnBuddy() && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "preview-page__divider",
									"aria-hidden": "true"
								}),
								!isOverseas() && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MiniProgramQRButton, { triggerMode: "hover" }),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(OpenOrDownloadWorkBuddyButton, { onTrack: (elementId) => adapter?.reportTelemetry?.("web_element_click", {
									pageName: "share_view",
									fileName: shareDetail?.name,
									elementId
								}) })
							] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("main", {
					className: "preview-page__content",
					children: renderView()
				}),
				isShareEnabled && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareTaskDialog, {
					visible: shareDialogVisible,
					loading: false,
					error: null,
					shareData,
					bizType: "conversation",
					onClose: () => setShareDialogVisible(false),
					onCopyLink: handleShareCopyLink,
					...!isWXMiniProgram() && !isOverseas() && { onWxShare: handleWxShare },
					onCopyQRCode: handleCopyQRCode,
					onSaveQRCode: handleSaveQRCode,
					generateWxMPQRCode,
					generateQRCode: !isOverseas() ? generateShareQRCode : void 0,
					productDisplayName: isWorkBuddy() ? getBrandName() : "",
					onTrack: ({ elementId, eventType, extraProps }) => adapter?.reportTelemetry?.(eventType, {
						...extraProps,
						pageName: "share_view",
						elementId
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChatWithWorkBuddyButton, { onTrack: (elementId) => adapter?.reportTelemetry?.("web_element_click", {
					pageName: "share_view",
					elementId,
					contentType: "chat"
				}) })
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/index.tsx
var import_react, import_jsx_runtime, TaskSharePreview;
//#endregion
__esmMin((() => {
	init_task$1();
	init_common();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_adapters();
	init_contexts();
	init_useI18n();
	init_StatusPlaceholder();
	init_PreviewContent();
	import_jsx_runtime = require_jsx_runtime();
	TaskSharePreview = () => {
		const t = useTranslation();
		const [adapter, setAdapter] = (0, import_react.useState)(null);
		const [error, setError] = (0, import_react.useState)(null);
		const [backendProvider, setBackendProvider] = (0, import_react.useState)(null);
		const [account, setAccount] = (0, import_react.useState)(() => accountService.getAccount());
		const [accountLoading, setAccountLoading] = (0, import_react.useState)(() => !accountService.isInitialized());
		(0, import_react.useEffect)(() => {
			let mounted = true;
			createAgentAdapter({ type: "sse" }).then((adapterInstance) => {
				if (mounted) {
					setAdapter(adapterInstance);
					const bp = adapterInstance.getBackendProvider?.();
					if (bp) {
						setBackendProvider(bp);
						console.log("[Preview] BackendProvider set");
					}
				}
			}).catch((err) => {
				if (mounted) {
					console.error("[Preview] Failed to create adapter:", err);
					setError(err);
				}
			});
			return () => {
				mounted = false;
			};
		}, []);
		(0, import_react.useEffect)(() => {
			const unsubscribe = accountService.subscribe((newAccount) => {
				console.log("[Preview] Account updated:", newAccount?.nickname);
				setAccount(newAccount);
				setAccountLoading(false);
			});
			if (accountService.isInitialized() && accountLoading) {
				setAccountLoading(false);
				setAccount(accountService.getAccount());
			}
			return unsubscribe;
		}, [accountLoading]);
		(0, import_react.useEffect)(() => {
			if (!adapter) return;
			if (backendProvider) return;
			if (accountService.isInitialized()) {
				console.log("[Preview] accountService already initialized");
				return;
			}
			const loadAccount = async () => {
				console.log("[Preview] Loading account...");
				try {
					const accountData = await adapter.getAccount();
					console.log("[Preview] Account loaded:", accountData?.nickname);
				} catch (err) {
					console.error("[Preview] Failed to load account:", err);
					setAccountLoading(false);
				}
			};
			loadAccount();
		}, [adapter, backendProvider]);
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "preview-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "preview-page__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPlaceholder, {
					type: "error",
					title: t("preview.error.initFailed"),
					description: error.message,
					onRetry: () => window.location.reload(),
					retryText: t("common.retry")
				})
			})
		});
		if (!adapter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "preview-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "preview-page__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPlaceholder, {
					type: "loading",
					title: t("common.loading")
				})
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdapterContext.Provider, {
			value: adapter,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, {
				backendProvider,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountContext.Provider, {
					value: {
						account,
						setAccount,
						isInitialized: !accountLoading
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewContent, {})
				})
			})
		});
	};
}))();
export { TaskSharePreview, TaskSharePreview as default };
