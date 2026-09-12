const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./pdf-preview-component-vNcBGK9Y.js","./chunk-BRZcfu7K.js","./preload-helper-E3UYCQGP.js","./src-DRGoWjIu.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./resize-observer-QOR-7G1T.js","./wasm-C4lriWle.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./classnames-BYn3_ESJ.js","./decode-HthuYB5G.js","./index.dom-Hjybw7gi.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./hast-util-whitespace-C3G7AbkX.js","./katex-sFwAzkhG.js","./lodash-D1c13HHR.js","./merge-CDI2sNhv.js","./throttle-mAPE4S6V.js","./isObjectLike-Dan5H4Gd.js","./isSymbol-DlS8bGaY.js","./lucide-react-CmX0JwWL.js","./client-BPkZUIji.js","./jsx-runtime-BNEdAQtr.js","./dist-CSHw4oQX.js","./i18n-DH8xcldp.js","./chevron-down-icon-Bs9CIPFg.js","./copied-icon-Cvsbo-xy.js","./copy-icon-BUIWKTIn.js","./edit-icon-9Lcq4c36.js","./src-D47LCgt5.css","./clsx-kwfm3TVm.js","./dist-DNjXzICC.js","./useI18n-EyL4WIXZ.js","./useZoomControl-D-fnH4U0.js","./useZoomControl-DwtjFc3k.css","./media.module-xXG5L1DD.js","./media-D0jCYV4T.css","./pdf-preview-component-DE2yDnMs.css","./docx-preview-component-CjwFTC73.js","./jszip.min-BlT6AB6w.js","./docx-preview-component-VQg4fiKY.css","./pptx-preview-component-Dj5gWOZp.js","./lodash-CQINZbUj.js","./tslib.es6-8NkKEYUK.js","./pptx-preview-component-CxR1r2Ze.css","./sheet-preview-component-DtiPBU6h.js","./immer.esm-DQZHj7k-.js","./sheet-preview-component-B-PSsErQ.css","./image-preview-component-DneEaIXD.js","./image-preview-component-Dy4UBDfS.js","./image-preview-component-CekcNLOJ.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $t as ima_note_colorful_default, Br as useImaApi, Fr as init_use_ima_connector_item, Jc as useDebouncedValue, Lr as init_use_ima_auth, Nc as init_connector, Rr as useImaAuth, a as WorkBuddyTopBar, en as init_ima_note_colorful, o as init_workbuddy_topbar, qc as init_use_debounced_value, zr as init_use_ima_api } from "./agent-mail-CiuzbR2o.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { n as init_dist, t as Buffer } from "./dist-DNjXzICC.js";
import { Us as createImaFileBlock, ni as ConfirmDialog, qi as ChevronDownIcon, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { B as Minimize2, H as Maximize2, r as X, t as init_lucide_react } from "./lucide-react-CmX0JwWL.js";
import { c as getProductName, p as init_environment } from "./environment-DKqg3f0G.js";
import { f as useNavigate } from "./dist-BlOCCi14.js";
import { ht as AccountContext, t as init_contexts, vt as ConversationsContext, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { n as useTheme, t as init_useTheme } from "./useTheme-KZ-Qaric.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { t as init_router, x as useRouterContext } from "./router-O5ZnP5xt.js";
import { n as imaAuthStore, p as IMA_AUTO_CONNECT_TOAST_KEY, r as init_ima_auth_store, t as IMA_MCP_CONNECTOR_ID, y as connectorStore } from "./ima-auth-store-Cq8i4JCG.js";
import { n as init_header_workbuddy, t as header_workbuddy_default } from "./header-workbuddy-UO2zaYBA.js";
import { C as Excel_default, S as init_folder, _ as init_markdown, a as init_web, b as init_image, c as unknown_default, d as init_ppt, f as ppt_default, g as pdf_default, h as init_pdf, i as webvideo_default, l as init_txt, m as podcast_default, n as word_default, o as web_default, p as init_podcast, r as init_webvideo, s as init_unknown, t as init_word, u as txt_default, v as markdown_default, w as init_Excel, x as folder_default, y as image_default } from "./word-Ccn6X4sP.js";
import { i as renderMarkdown, r as init_markdown_utils, u as init_markdown_preview } from "./markdown-utils-HwTwYIv3.js";
import { n as init_MoreIcon, t as MoreIcon } from "./MoreIcon-DZ17Rnhm.js";
import { c as init_new_task_draft, l as overwriteBlocksToDraft, n as ImaHostBridge, o as buildNewTaskDraftKey, t as init_host } from "./host-9mJqHhXr.js";
//#region ../../packages/agent-ui/src/components/ima/ima-library-auth-entry.scss
var init_ima_library_auth_entry$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/telemetry.ts
/**
* 上报 web_page_show 事件
*/
function reportPageShow(adapter, pageName) {
	try {
		adapter?.reportTelemetry?.("web_page_show", { pageName });
	} catch (error) {
		console.warn("[ImaTelemetry] reportPageShow failed:", error);
	}
}
/**
* 上报 web_element_show 事件
*/
function reportElementShow(adapter, params) {
	try {
		adapter?.reportTelemetry?.("web_element_show", params);
	} catch (error) {
		console.warn("[ImaTelemetry] reportElementShow failed:", error);
	}
}
/**
* 上报 web_element_click 事件
*/
function reportElementClick(adapter, params) {
	try {
		adapter?.reportTelemetry?.("web_element_click", params);
	} catch (error) {
		console.warn("[ImaTelemetry] reportElementClick failed:", error);
	}
}
/** #1 ima资料库-文件列表展示 */
function reportImaLibraryList(adapter) {
	try {
		adapter?.reportTelemetry?.("web_element_show", {
			elementId: "knowledge_base_file_list",
			elementName: "ima文件列表",
			type: "ima"
		});
	} catch {}
}
/** #3 ima资料库-点击搜索入口 */
function reportImaLibSearch(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_lib_search",
		elementName: "搜索入口",
		pageName: "ima"
	});
}
/** #4 点击文件触发预览 */
function reportImaLibFileOpen(adapter, source, type) {
	reportElementClick(adapter, {
		elementId: "ima_lib_file_open",
		elementName: "文件点击预览",
		pageName: "ima",
		source,
		type,
		mode: "ima"
	});
}
/** #5 ima资料库-hover文件后点击"添加至任务" */
function reportImaLibAddToTaskHover(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_lib_add_to_task_hover",
		elementName: "hover添加至任务",
		pageName: "ima",
		mode: "ima"
	});
}
/** #6 ima资料库-多选文件后点击"添加至任务" */
function reportImaLibAddToTaskBatch(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_lib_add_to_task_batch",
		elementName: "批量添加至任务",
		pageName: "ima",
		mode: "ima"
	});
}
/** #7 ima附件添加成功（资料库场景 + 选择器场景复用） */
function reportAttachImaSuccess(adapter, pageName, source, type) {
	reportElementClick(adapter, {
		elementId: "attach_ima_success",
		elementName: "ima附件添加成功",
		pageName,
		source,
		type,
		mode: "ima"
	});
}
/** #8 ima资料库-点击"在 ima 中打开" */
function reportImaLibOpenInIma(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_lib_open_in_ima",
		elementName: "在ima中打开",
		pageName: "ima"
	});
}
/** #9 文件详情页点击"上传到云端（ima）"按钮 */
function reportSaveToImaBtn(adapter) {
	reportElementClick(adapter, {
		elementId: "save_to_ima_btn",
		elementName: "上传到ima按钮"
	});
}
/** #9.1 保存到ima知识库列表展示（授权后列表可见时上报） */
function reportSaveToImaPopShow(adapter) {
	reportElementShow(adapter, {
		elementId: "save_to_ima_pop_show",
		elementName: "保存到ima列表展示"
	});
}
/** #10 文件详情页点击"立即上传" */
function reportSaveToImaConfirm(adapter) {
	reportElementClick(adapter, {
		elementId: "save_to_ima_confirm",
		elementName: "确认上传到ima"
	});
}
/** #11 文件上传到ima成功 */
function reportSaveToImaSuccess(adapter) {
	reportElementClick(adapter, {
		elementId: "save_to_ima_success",
		elementName: "上传到ima成功"
	});
}
/** #12 ima知识库文件选择器弹窗曝光 */
function reportAttachImaChooser(adapter) {
	reportElementShow(adapter, {
		elementId: "attach_ima_chooser",
		elementName: "ima知识库文件选择器弹窗",
		pageName: "new_task"
	});
}
/** #13 点击添加ima入口 */
function reportAttachImaEntry(adapter) {
	reportElementClick(adapter, {
		elementId: "attach_ima_entry",
		elementName: "添加ima入口",
		pageName: "new_chat"
	});
}
/** #15 ima登录授权页展示 */
function reportImaAuthPageShow(adapter) {
	reportPageShow(adapter, "ima_auth_page");
}
/** #16 从资料库触达授权 */
function reportImaAuthFromLibrary(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_auth_from_library",
		elementName: "从资料库触达授权"
	});
}
/** #17 从文件选择器触达授权 */
function reportImaAuthFromFilePicker(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_auth_from_file_picker",
		elementName: "从文件选择器触达授权"
	});
}
/** #18 从文件上传触达授权 */
function reportImaAuthFromFileUpload(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_auth_from_file_upload",
		elementName: "从文件上传触达授权"
	});
}
/** #19 从连接器触达授权 */
function reportImaAuthFromConnector(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_auth_from_connector",
		elementName: "从连接器触达授权"
	});
}
/** #20 授权成功 */
function reportImaAuthSuccess(adapter) {
	reportElementClick(adapter, {
		elementId: "knowledge_base_auth_success",
		elementName: "ima授权成功",
		type: "ima"
	});
}
/** #21 授权失败 */
function reportImaAuthFail(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_auth_fail",
		elementName: "授权失败"
	});
}
/** #22 解绑ima账号 */
function reportImaUnbind(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_unbind",
		elementName: "解绑ima账号"
	});
}
/** #23 确认解绑 */
function reportImaUnbindConfirm(adapter) {
	reportElementClick(adapter, {
		elementId: "ima_unbind_confirm",
		elementName: "确认解绑"
	});
}
/** #24 对话发送携带 ima 文件时触发 */
function reportChatLibRequestSend(adapter, params) {
	try {
		adapter?.reportTelemetry?.("chat_lib_request_send", params);
	} catch (error) {
		console.warn("[ImaTelemetry] reportChatLibRequestSend failed:", error);
	}
}
var init_telemetry = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-library-auth-entry.tsx
/**
* 把描述文案中的 **粗体** 语法解析为 <strong> 节点。
* 不引入完整 markdown，只支持成对的 `**...**` 粗体，足够描述场景。
*/
function renderEmphasizedText(text) {
	return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
		if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("strong", { children: part.slice(2, -2) }, index);
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(import_react$13.Fragment, { children: part }, index);
	});
}
var import_react$13, import_jsx_runtime$10, AUTH_POLL_INTERVAL, AUTH_POLL_MAX_ATTEMPTS, LOG_TAG, EyeIcon, SearchIcon$1, ShieldCheckIcon, BrandConnectArrows, ImaLibraryAuthEntry;
var init_ima_library_auth_entry = __esmMin((() => {
	init_ima_library_auth_entry$1();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_header_workbuddy();
	init_contexts();
	init_ima_auth_store();
	init_use_ima_api();
	init_use_ima_auth();
	init_environment();
	init_ima_note_colorful();
	init_telemetry();
	import_jsx_runtime$10 = require_jsx_runtime();
	AUTH_POLL_INTERVAL = 2e3;
	AUTH_POLL_MAX_ATTEMPTS = 150;
	LOG_TAG = "[ImaLibraryAuthEntry]";
	EyeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		})]
	});
	SearchIcon$1 = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("circle", {
			cx: "11",
			cy: "11",
			r: "7"
		}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "m20 20-3.5-3.5" })]
	});
	ShieldCheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", { d: "m9 12 2 2 4-4" })]
	});
	BrandConnectArrows = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		className: "ima-auth-guide__connect-arrows",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
				className: "ima-auth-guide__connect-arrow ima-auth-guide__connect-arrow--1",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
				className: "ima-auth-guide__connect-arrow ima-auth-guide__connect-arrow--2",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
				className: "ima-auth-guide__connect-arrow ima-auth-guide__connect-arrow--3",
				children: "›"
			})
		]
	});
	ImaLibraryAuthEntry = ({ onAuthed, title = "连接 ima 知识库", subtitle = `授权后，${getProductName()} 将能访问你的 ima 知识库，为你提供**浏览文件**、**搜索内容**，以及**引用知识库文件作为上下文**。`, iframeSize, authSource }) => {
		const bridge = useImaApi();
		const adapter = useAdapter();
		const { authed: hookAuthed } = useImaAuth();
		const [stage, setStage] = import_react$13.useState("idle");
		const [authorizeUrl, setAuthorizeUrl] = import_react$13.useState(null);
		const [error, setError] = import_react$13.useState(null);
		const pollTimerRef = import_react$13.useRef(null);
		if (!bridge) {
			console.info(LOG_TAG, "skip render: ImaApiContext.Provider is not injected (web/non-ima host)");
			return null;
		}
		import_react$13.useEffect(() => {
			if (stage === "idle") reportImaAuthPageShow(adapter);
		}, [adapter, stage]);
		import_react$13.useEffect(() => {
			console.log(LOG_TAG, "挂载");
			return () => console.log(LOG_TAG, "卸载");
		}, []);
		/** 清理轮询定时器 */
		const stopPolling = import_react$13.useCallback(() => {
			if (pollTimerRef.current !== null) {
				clearTimeout(pollTimerRef.current);
				pollTimerRef.current = null;
			}
		}, []);
		import_react$13.useEffect(() => () => {
			stopPolling();
		}, [stopPolling]);
		import_react$13.useEffect(() => {
			if (hookAuthed && stage === "authorizing") {
				console.log(LOG_TAG, "事件通道确认授权成功");
				stopPolling();
				reportImaAuthSuccess(adapter);
				onAuthed?.();
			}
		}, [
			hookAuthed,
			stage,
			stopPolling,
			onAuthed,
			adapter
		]);
		/** 启动授权：调 imaAuthStart → 展示 iframe → 兜底轮询 imaAuthStatus */
		const startAuthorization = import_react$13.useCallback(async () => {
			stopPolling();
			setError(null);
			setStage("authorizing");
			if (authSource) ({
				library: () => reportImaAuthFromLibrary(adapter),
				file_picker: () => reportImaAuthFromFilePicker(adapter),
				file_upload: () => reportImaAuthFromFileUpload(adapter),
				connector: () => reportImaAuthFromConnector(adapter)
			})[authSource]?.();
			try {
				const startResp = await bridge.imaAuthStart({ mode: "iframe" });
				if (startResp?.nextAction === "connected") {
					stopPolling();
					reportImaAuthSuccess(adapter);
					imaAuthStore.getState().checkAuthStatus({ silent: false }).catch(() => {});
					setStage("idle");
					setAuthorizeUrl(null);
					onAuthed?.();
					return;
				}
				const authorizeUrlFromResp = startResp?.authorizeUrl;
				if (!authorizeUrlFromResp) throw new Error("imaAuthStart 未返回 authorizeUrl");
				const urlWithHeader = new URL(authorizeUrlFromResp);
				urlWithHeader.searchParams.set("showHeader", "1");
				setAuthorizeUrl(urlWithHeader.toString());
				let attempts = 0;
				const poll = async () => {
					attempts++;
					if (attempts > AUTH_POLL_MAX_ATTEMPTS) {
						console.warn(LOG_TAG, `轮询超过 ${AUTH_POLL_MAX_ATTEMPTS} 次，判定超时`);
						stopPolling();
						setStage("failed");
						setError("授权超时，请重试");
						setAuthorizeUrl(null);
						reportImaAuthFail(adapter);
						return;
					}
					try {
						if ((await bridge.imaAuthStatus())?.authed) {
							console.log(LOG_TAG, "轮询兜底确认授权成功");
							stopPolling();
							reportImaAuthSuccess(adapter);
							imaAuthStore.getState().checkAuthStatus({ silent: false }).catch(() => {});
							onAuthed?.();
							return;
						}
						pollTimerRef.current = setTimeout(poll, AUTH_POLL_INTERVAL);
					} catch (err) {
						console.warn(LOG_TAG, `status 轮询 #${attempts} 异常，继续重试:`, err);
						pollTimerRef.current = setTimeout(poll, AUTH_POLL_INTERVAL);
					}
				};
				pollTimerRef.current = setTimeout(() => {
					poll().catch((err) => {
						console.error(LOG_TAG, "poll() 外层抛错:", err);
					});
				}, AUTH_POLL_INTERVAL);
			} catch (err) {
				console.error(LOG_TAG, "start 失败:", err);
				setStage("failed");
				setAuthorizeUrl(null);
				setError(err instanceof Error ? err.message : String(err));
				reportImaAuthFail(adapter);
			}
		}, [
			bridge,
			onAuthed,
			stopPolling,
			adapter,
			authSource
		]);
		if (stage === "authorizing" && authorizeUrl) return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "ima-auth-webview-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("iframe", {
				className: "ima-auth-webview",
				src: authorizeUrl,
				title,
				onLoad: (e) => {
					try {
						console.log(LOG_TAG, "iframe onLoad, src=", e.target.src);
					} catch {}
				},
				...iframeSize?.width || iframeSize?.height ? {
					width: iframeSize?.width,
					height: iframeSize?.height
				} : {},
				sandbox: "allow-scripts allow-same-origin allow-forms allow-popups"
			})
		});
		const isAuthorizing = stage === "authorizing" && !authorizeUrl;
		const isFailed = stage === "failed";
		const description = isAuthorizing ? "正在打开 ima 授权页面，请稍候…" : subtitle;
		const buttonText = isAuthorizing ? "等待授权中..." : isFailed ? "重试" : "立即前往授权";
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "ima-auth-guide",
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "ima-auth-guide__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "ima-auth-guide__brands",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
								className: "ima-auth-guide__brand-icon ima-auth-guide__brand-icon--wb",
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
									src: header_workbuddy_default,
									alt: getProductName(),
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(BrandConnectArrows, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
								className: "ima-auth-guide__brand-icon ima-auth-guide__brand-icon--ima",
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
									src: ima_note_colorful_default,
									alt: "ima",
									draggable: false
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h2", {
						className: "ima-auth-guide__title",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
						className: "ima-auth-guide__desc",
						children: renderEmphasizedText(description)
					}),
					!isAuthorizing && !isFailed && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "ima-auth-guide__permissions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
							className: "ima-auth-guide__permissions-title",
							children: [
								"授权后，",
								getProductName(),
								" 将能够："
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("ul", {
							className: "ima-auth-guide__permissions-list",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("li", {
								className: "ima-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
									className: "ima-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(EyeIcon, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
									className: "ima-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "ima-auth-guide__permission-label",
										children: "浏览你的 ima 知识库"
									}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "ima-auth-guide__permission-desc",
										children: "查看你在 ima 中创建的知识库目录和文件结构"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("li", {
								className: "ima-auth-guide__permission-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
									className: "ima-auth-guide__permission-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SearchIcon$1, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
									className: "ima-auth-guide__permission-text",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "ima-auth-guide__permission-label",
										children: "搜索并引用文件内容"
									}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
										className: "ima-auth-guide__permission-desc",
										children: "在对话中检索并引用 ima 知识库里的文件作为上下文"
									})]
								})]
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
						className: "ima-auth-guide__error",
						role: "alert",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
						className: `ima-auth-guide__btn${isAuthorizing ? " ima-auth-guide__btn--loading" : ""}`,
						disabled: isAuthorizing,
						onClick: startAuthorization,
						children: [isAuthorizing && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { className: "ima-auth-guide__spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
							className: "ima-auth-guide__btn-label",
							children: buttonText
						})]
					}),
					!isAuthorizing && !isFailed && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "ima-auth-guide__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ShieldCheckIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("span", { children: [
							"授权仅用于在 ",
							getProductName(),
							" 中访问你的 ima 知识库，可随时在设置中断开。"
						] })]
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-file-selector.scss
var init_ima_file_selector$1 = __esmMin((() => {}));
var init_empty = __esmMin((() => {
	"" + new URL("empty-CopzwuXE.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/ima/imanote.svg
var imanote_default;
var init_imanote = __esmMin((() => {
	imanote_default = "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%207.5C4%204.73858%206.23858%202.5%209%202.5H55C57.7614%202.5%2060%204.73858%2060%207.5V56.5C60%2059.2614%2057.7614%2061.5%2055%2061.5H9C6.23858%2061.5%204%2059.2614%204%2056.5V7.5Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M55%205.5H9C7.89543%205.5%207%206.39543%207%207.5V56.5C7%2057.6046%207.89543%2058.5%209%2058.5H55C56.1046%2058.5%2057%2057.6046%2057%2056.5V7.5C57%206.39543%2056.1046%205.5%2055%205.5ZM9%202.5C6.23858%202.5%204%204.73858%204%207.5V56.5C4%2059.2614%206.23858%2061.5%209%2061.5H55C57.7614%2061.5%2060%2059.2614%2060%2056.5V7.5C60%204.73858%2057.7614%202.5%2055%202.5H9Z'%20fill='%2311CF70'%20fill-opacity='0.64'%20style='fill:%2311CF70;fill:color(display-p3%200.0667%200.8118%200.4392);fill-opacity:0.64;'/%3e%3cpath%20d='M38.8184%2017C41.8505%2017.0001%2044.4949%2018.651%2045.9082%2021.1016C43.5976%2022.8107%2041.6581%2024.7294%2039.9727%2026.8359C39.8014%2026.515%2039.5959%2026.2045%2039.3486%2025.9131C38.3227%2024.704%2036.8544%2024.1221%2035.1904%2024.1221C32.0274%2024.1223%2029.4886%2026.3409%2027.6729%2028.5928C25.7737%2030.9481%2024.1799%2033.9415%2022.9707%2036.6475C22.4507%2037.8111%2022.9721%2039.1763%2024.1357%2039.6963C25.2993%2040.2162%2026.6637%2039.6938%2027.1836%2038.5303C28.3197%2035.9879%2029.7238%2033.4014%2031.2656%2031.4893C32.8906%2029.474%2034.236%2028.7375%2035.1904%2028.7373C35.732%2028.7373%2035.8207%2028.8893%2035.8291%2028.8994C35.9057%2028.9897%2036.0756%2029.2868%2036.1182%2029.9775C36.2046%2031.382%2035.6964%2033.3744%2034.877%2035.0146C34.3074%2036.1547%2034.7693%2037.5406%2035.9092%2038.1104C37.0493%2038.68%2038.4362%2038.2173%2039.0059%2037.0771C41.205%2032.6755%2043.6391%2029.0648%2047%2026.1387V41.5459C46.9998%2044.558%2044.558%2046.9998%2041.5459%2047H22.4541C19.442%2046.9998%2017.0002%2044.558%2017%2041.5459V22.4541C17.0002%2019.442%2019.442%2017.0002%2022.4541%2017H38.8184Z'%20fill='%2311CF70'%20style='fill:%2311CF70;fill:color(display-p3%200.0652%200.8118%200.4409);fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/ima/soundrecording.svg
var soundrecording_default;
var init_soundrecording = __esmMin((() => {
	soundrecording_default = "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%207.5C4%204.73858%206.23858%202.5%209%202.5H55C57.7614%202.5%2060%204.73858%2060%207.5V56.5C60%2059.2614%2057.7614%2061.5%2055%2061.5H9C6.23858%2061.5%204%2059.2614%204%2056.5V7.5Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M55%205.5H9C7.89543%205.5%207%206.39543%207%207.5V56.5C7%2057.6046%207.89543%2058.5%209%2058.5H55C56.1046%2058.5%2057%2057.6046%2057%2056.5V7.5C57%206.39543%2056.1046%205.5%2055%205.5ZM9%202.5C6.23858%202.5%204%204.73858%204%207.5V56.5C4%2059.2614%206.23858%2061.5%209%2061.5H55C57.7614%2061.5%2060%2059.2614%2060%2056.5V7.5C60%204.73858%2057.7614%202.5%2055%202.5H9Z'%20fill='%2300AA5B'%20fill-opacity='0.64'%20style='fill:%2300AA5B;fill:color(display-p3%200.0000%200.6667%200.3569);fill-opacity:0.64;'/%3e%3cpath%20d='M48.499%2017.2738C48.499%2017.2759%2048.5008%2017.2777%2048.5029%2017.2777C48.5051%2017.2777%2048.5068%2017.2794%2048.5068%2017.2816V36.0185C48.5068%2036.0262%2048.514%2036.0319%2048.5215%2036.0301C48.529%2036.0284%2048.5361%2036.034%2048.5361%2036.0417V44.9583C48.5361%2045.07%2048.4609%2045.1677%2048.353%2045.1963L37.3599%2048.106C37.2038%2048.1473%2037.0508%2048.0296%2037.0508%2047.868V39.2572C37.0508%2039.1455%2037.126%2039.0478%2037.2339%2039.0192L42.0591%2037.7412C42.167%2037.7126%2042.2422%2037.6149%2042.2422%2037.5033V21.0839C42.2422%2020.9372%2042.1147%2020.8231%2041.9689%2020.8392L25.7454%2022.6391C25.6207%2022.6529%2025.5264%2022.7583%2025.5264%2022.8838V38.0458C25.5264%2038.0535%2025.5335%2038.0592%2025.541%2038.0575C25.5485%2038.0557%2025.5557%2038.0614%2025.5557%2038.0691V46.9847C25.5557%2047.0964%2025.4805%2047.1941%2025.3725%2047.2226L14.3795%2050.1324C14.2233%2050.1737%2014.0703%2050.056%2014.0703%2049.8944V41.2835C14.0703%2041.1718%2014.1455%2041.0742%2014.2534%2041.0456L19.0786%2039.7676C19.1865%2039.739%2019.2617%2039.6413%2019.2617%2039.5296V16.9927C19.2617%2016.8666%2019.357%2016.7609%2019.4824%2016.7479L48.2274%2013.759C48.3726%2013.7439%2048.499%2013.8579%2048.499%2014.0039V17.2738Z'%20fill='url(%23paint0_linear_263_5897)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_263_5897'%20x1='46.8949'%20y1='16.7896'%20x2='18.4074'%20y2='50.8777'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%230BB465'%20style='stop-color:%230BB465;stop-color:color(display-p3%200.0431%200.7059%200.3961);stop-opacity:1;'/%3e%3cstop%20offset='0.510417'%20stop-color='%2300AA5B'%20style='stop-color:%2300AA5B;stop-color:color(display-p3%200.0000%200.6667%200.3569);stop-opacity:1;'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/ima/wechatArticle.svg
var wechatArticle_default;
var init_wechatArticle = __esmMin((() => {
	wechatArticle_default = "data:image/svg+xml,%3csvg%20width='38'%20height='37'%20viewBox='0%200%2038%2037'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_263_5885)'%3e%3cmask%20id='mask0_263_5885'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='-56'%20y='-126'%20width='334'%20height='707'%3e%3cpath%20d='M277.515%20-125.515V580.747H-55.6566V-125.515H277.515Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_263_5885)'%3e%3cmask%20id='mask1_263_5885'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='38'%20height='37'%3e%3cpath%20d='M2.46592%2014.192C3.05204%2018.4695%205.71473%2022.6299%209.59763%2025.2776C9.89281%2025.4764%2010.0947%2025.8085%2010.1112%2026.1927C10.1155%2026.2949%2010.1021%2026.392%2010.0821%2026.4904L9.41416%2029.5229L9.37311%2029.6919C9.35253%2029.7776%209.33563%2029.8646%209.33931%2029.9512C9.35313%2030.2706%209.62143%2030.5197%209.94002%2030.5059C10.0651%2030.5005%2010.1649%2030.4491%2010.2682%2030.3834L13.9523%2028.0217C14.2294%2027.8439%2014.5261%2027.7296%2014.857%2027.7154C15.0028%2027.7088%2015.1433%2027.7253%2015.2796%2027.7534C16.3966%2028.0029%2017.5577%2028.1407%2018.7564%2028.1407C22.4059%2028.1407%2025.2966%2027.2916%2028.0269%2025.283C27.9559%2026.4191%2027.6142%2027.7868%2027.3022%2028.5921C24.732%2035.2229%2017.2928%2038.097%209.4963%2035.5365C2.71695%2033.3098%20-1.43734%2025.3605%200.460746%2018.7251C0.969716%2016.9468%201.48982%2015.7269%202.46592%2014.192ZM35.3034%2013.9842C39.5875%2019.5437%2038.4049%2028.0802%2032.3966%2032.7097C30.9043%2033.8597%2029.1647%2034.5326%2027.4647%2035.0031C28.8761%2033.4897%2029.9961%2031.6588%2030.6958%2029.5653C33.3251%2021.6959%2029.0615%2013.1374%2021.1724%2010.4498C21.0012%2010.3918%2020.8293%2010.3408%2020.6577%2010.2889C25.9862%208.31295%2031.8888%209.55275%2035.3034%2013.9842ZM18.7716%200.000122519C24.2264%200.000891094%2029.0439%203.35295%2030.9485%207.26925L30.6727%207.1785C26.3651%205.79789%2020.5399%205.65439%2015.0764%209.8283C11.9854%2012.4158%209.62784%2015.9359%208.99221%2020.4119C7.30639%2018.6462%206.12762%2015.8549%205.81211%2013.7392C5.35188%2010.6597%206.08655%207.57172%208.26867%204.93321C11.5363%200.981982%2015.909%20-0.00064426%2018.7716%200.000122519Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/mask%3e%3cg%20mask='url(%23mask1_263_5885)'%3e%3cpath%20d='M0.00012207%200.00012207H37.8613V36.4645H0.00012207V0.00012207Z'%20fill='%2306C15F'%20style='fill:%2306C15F;fill:color(display-p3%200.0235%200.7569%200.3725);fill-opacity:1;'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_263_5885'%3e%3crect%20width='38'%20height='36.4646'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/ima/xmind.svg
var xmind_default;
var init_xmind = __esmMin((() => {
	xmind_default = "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.00195%207.5C8.00195%204.73858%2010.2405%202.5%2013.002%202.5H55.002C57.7634%202.5%2060.002%204.73858%2060.002%207.5V56.5C60.002%2059.2614%2057.7634%2061.5%2055.002%2061.5H13.002C10.2405%2061.5%208.00195%2059.2614%208.00195%2056.5V7.5Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M55.002%205.5H13.002C11.8974%205.5%2011.002%206.39543%2011.002%207.5V56.5C11.002%2057.6046%2011.8974%2058.5%2013.002%2058.5H55.002C56.1065%2058.5%2057.002%2057.6046%2057.002%2056.5V7.5C57.002%206.39543%2056.1065%205.5%2055.002%205.5ZM13.002%202.5C10.2405%202.5%208.00195%204.73858%208.00195%207.5V56.5C8.00195%2059.2614%2010.2405%2061.5%2013.002%2061.5H55.002C57.7634%2061.5%2060.002%2059.2614%2060.002%2056.5V7.5C60.002%204.73858%2057.7634%202.5%2055.002%202.5H13.002Z'%20fill='%23FA762D'%20fill-opacity='0.64'%20style='fill:%23FA762D;fill:color(display-p3%200.9804%200.4627%200.1765);fill-opacity:0.64;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M53.7199%2019.6858H44.2676V21.0664C38.8191%2021.9375%2035.9902%2026.0026%2035.9902%2032.9192C35.9902%2039.8359%2038.8191%2043.901%2044.2676%2044.7721V46.1523H53.7199V41.3402H44.2676V42.3309C41.2314%2041.7292%2039.3997%2039.8393%2038.6912%2036.528H41.7164V34.1217H44.2676V35.3253H53.7199V30.5132H44.2676V31.7157H41.7164V29.3099H38.6913C39.3999%2025.9989%2041.2316%2024.1092%2044.2676%2023.5076V24.4979H53.7199V19.6858Z'%20fill='%23FA762D'%20fill-opacity='0.3'%20style='fill:%23FA762D;fill:color(display-p3%200.9804%200.4627%200.1765);fill-opacity:0.3;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.00195%2014.5C4.00195%2013.3954%204.89738%2012.5%206.00195%2012.5H38.002C39.1065%2012.5%2040.002%2013.3954%2040.002%2014.5V49.5C40.002%2050.6046%2039.1065%2051.5%2038.002%2051.5H6.00195C4.89738%2051.5%204.00195%2050.6046%204.00195%2049.5V14.5Z'%20fill='url(%23paint0_linear_263_5880)'/%3e%3cg%20filter='url(%23filter0_d_263_5880)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.0819%2019.951C12.3048%2019.4937%2011.2767%2019.6523%2010.6927%2020.3526C10.0604%2021.1108%2010.1884%2022.2172%2010.979%2022.824L20.9244%2030.3295L21.1%2030.4483L21.115%2030.457C21.7763%2030.8436%2022.6316%2030.7923%2023.24%2030.3075L33.01%2022.8292L33.1695%2022.6854L33.1812%2022.6734C33.8033%2022.0348%2033.8469%2021.0374%2033.2487%2020.3486C32.6012%2019.6031%2031.4466%2019.5016%2030.6686%2020.1213L22.0456%2026.6887L13.2684%2020.0761L13.0965%2019.9596L13.0819%2019.951ZM22.8517%2033.5431C22.1904%2033.1566%2021.3351%2033.2078%2020.7266%2033.6927L10.9566%2041.1709L10.7971%2041.3147L10.7854%2041.3267C10.1634%2041.9653%2010.1197%2042.9628%2010.718%2043.6516C11.3655%2044.397%2012.52%2044.4986%2013.298%2043.8788L21.921%2037.3114L30.6982%2043.924L30.8702%2044.0406L30.8848%2044.0492C31.6618%2044.5065%2032.69%2044.3479%2033.2739%2043.6476C33.9062%2042.8893%2033.7782%2041.7829%2032.9877%2041.1761L23.0423%2033.6706L22.8666%2033.5519L22.8517%2033.5431Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_263_5880'%20x='9.3983'%20y='17.9069'%20width='28.741'%20height='29.9717'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='1.78544'%20dy='0.892718'/%3e%3cfeGaussianBlur%20stdDeviation='1.33908'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_263_5880'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_263_5880'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_263_5880'%20x1='6.95094'%20y1='1.97594'%20x2='-15.0985'%20y2='43.1154'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF8246'%20style='stop-color:%23FF8246;stop-color:color(display-p3%201.0000%200.5098%200.2745);stop-opacity:1;'/%3e%3cstop%20offset='1'%20stop-color='%23FF5E2F'%20style='stop-color:%23FF5E2F;stop-color:color(display-p3%201.0000%200.3686%200.1843);stop-opacity:1;'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/highlight-match.tsx
/** 把字符串里的 RegExp 元字符转成字面匹配形式 */
function escapeRegExp(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var import_react$12, import_jsx_runtime$9, HighlightMatch;
var init_highlight_match = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$9 = require_jsx_runtime();
	HighlightMatch = ({ text, query, className }) => {
		const q = query.trim();
		if (!q || !text) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
			className,
			children: text
		});
		const pattern = new RegExp(`(${escapeRegExp(q)})`, "gi");
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
			className,
			children: text.split(pattern).map((part, i) => {
				return i % 2 === 1 && part.toLowerCase() === q.toLowerCase() ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("mark", {
					className: "ima-highlight",
					children: part
				}, i) : /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(import_react$12.Fragment, { children: part }, i);
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-dialog.tsx
var import_react$11, import_react_dom$1, import_jsx_runtime$8, ImaDialog, ImaDialogHeader;
var init_ima_dialog = __esmMin((() => {
	init_ima_file_selector$1();
	init_lucide_react();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	import_jsx_runtime$8 = require_jsx_runtime();
	ImaDialog = ({ open, onClose, dialogClassName = "", overlayClassName = "", closeOnOverlayClick = true, closeOnEsc = true, onDialogClick, children }) => {
		import_react$11.useEffect(() => {
			if (!open || !closeOnEsc) return;
			const onKey = (e) => {
				if (e.key === "Escape") onClose();
			};
			window.addEventListener("keydown", onKey);
			return () => window.removeEventListener("keydown", onKey);
		}, [
			open,
			closeOnEsc,
			onClose
		]);
		if (!open) return null;
		return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: `ima-file-selector__overlay ${overlayClassName}`,
			onClick: closeOnOverlayClick ? onClose : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: `ima-file-selector__dialog ${dialogClassName}`,
				onClick: (e) => {
					e.stopPropagation();
					onDialogClick?.(e);
				},
				children
			})
		}), document.body);
	};
	ImaDialogHeader = ({ title, extra, onClose }) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
		className: "ima-file-selector__header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
				className: "ima-file-selector__title",
				children: title
			}),
			extra,
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
				className: "ima-file-selector__close",
				onClick: onClose,
				"aria-label": "close",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(X, { size: 16 })
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-response.ts
/**
* ima 响应字段归一化工具
*
* 背景：
*   ima 后端接口文档（docs/plans/2026-04-19-ima-backend-api-requirements.md）定义的
*   响应结构统一使用 `items` 作为列表字段，文件字段名为 `name`、类型用 `type: 'file' | 'folder'`。
*
*   但不同来源的 mock / 演进中的后端曾出现过 `files` / `kbs` / `filename` 等变体，
*   UI 层为了鲁棒性需要在同一个地方做兼容，避免 selector / dir-selector / preview 各写一遍。
*
* 本模块的所有函数都是**纯函数 + 防御式读取**，不抛错。
*/
/** 列表响应里取出 items，兼容 `items | files | kbs | 直接数组` 几种写法 */
function pickItems(res) {
	if (Array.isArray(res)) return res;
	if (res && typeof res === "object") {
		const r = res;
		if (Array.isArray(r.items)) return r.items;
		if (Array.isArray(r.files)) return r.files;
		if (Array.isArray(r.kbs)) return r.kbs;
	}
	return [];
}
function normalizeEntry(raw) {
	if (!raw || typeof raw !== "object") return null;
	const r = raw;
	const id = typeof r.mediaId === "string" && r.mediaId || typeof r.media_id === "string" && r.media_id || typeof r.id === "string" && r.id || void 0;
	if (!id) return null;
	const kbId = typeof r.kbId === "string" ? r.kbId : "";
	const name = typeof r.title === "string" && r.title || typeof r.name === "string" && r.name || typeof r.filename === "string" && r.filename || "";
	let entryType;
	if (r.type === "file" || r.type === "folder") entryType = r.type;
	else if (r.isFolder === true || r.media_type === 99 || r.mediaType === 99) entryType = "folder";
	else if (r.mediaType !== void 0 || r.media_type !== void 0) entryType = "file";
	const modifiedAt = (typeof r.createTime === "number" ? r.createTime : void 0) ?? (typeof r.create_time === "number" ? r.create_time : void 0) ?? (typeof r.create_time === "string" ? parseInt(r.create_time, 10) || void 0 : void 0) ?? (typeof r.modifiedAt === "number" ? r.modifiedAt : void 0);
	const mediaType = typeof r.mediaType === "number" ? r.mediaType : typeof r.media_type === "number" ? r.media_type : void 0;
	const mimeType = typeof r.mimeType === "string" ? r.mimeType : void 0;
	const extension = typeof r.extension === "string" ? r.extension : typeof r.ext === "string" ? r.ext : void 0;
	let mediaTypeIcon;
	if (r.mediaTypeInfo && typeof r.mediaTypeInfo === "object") {
		const mti = r.mediaTypeInfo;
		if (typeof mti.icon === "string" && mti.icon) mediaTypeIcon = mti.icon;
	} else if (r.media_type_info && typeof r.media_type_info === "object") {
		const mti = r.media_type_info;
		if (typeof mti.icon === "string" && mti.icon) mediaTypeIcon = mti.icon;
	}
	let coverUrl;
	const rawCoverUrls = r.coverUrls ?? r.cover_urls;
	if (Array.isArray(rawCoverUrls) && typeof rawCoverUrls[0] === "string" && rawCoverUrls[0]) coverUrl = rawCoverUrls[0];
	let highlightContent;
	if (typeof r.highlightContent === "string" && r.highlightContent) highlightContent = r.highlightContent;
	else if (typeof r.highlight_content === "string" && r.highlight_content) highlightContent = r.highlight_content;
	else if (r.highlights && typeof r.highlights === "object") {
		const hl = r.highlights;
		if (typeof hl.content === "string" && hl.content) highlightContent = hl.content;
	}
	return {
		id,
		kbId,
		name: name || "(unnamed)",
		type: entryType,
		path: typeof r.path === "string" ? r.path : void 0,
		parentFolderId: r.parentFolderId ?? (typeof r.parent_folder_id === "string" ? r.parent_folder_id : void 0) ?? void 0,
		modifiedAt,
		mediaType,
		mimeType,
		extension,
		mediaTypeIcon,
		coverUrl,
		highlightContent,
		canFetchContent: typeof r.canFetchContent === "boolean" ? r.canFetchContent : typeof r.can_fetch_content === "boolean" ? r.can_fetch_content : void 0
	};
}
/** 同 `pickItems + normalizeEntry` 的快捷方式 */
function pickEntries(res) {
	const raws = pickItems(res);
	const out = [];
	for (const raw of raws) {
		const e = normalizeEntry(raw);
		if (e) out.push(e);
	}
	return out;
}
/**
* 从分页响应里取 `nextCursor`。
*
* 协议约定（docs/plans/2026-04-19-ima-backend-api-requirements.md）：
*   - 所有分页响应都返回 `nextCursor: string | null`
*   - `null` 表示已经是最后一页
*   - 兼容一些早期/外部 mock 使用的别名（`next_cursor` / `cursor`），全部归一化为可选字符串
*
* 返回 `null` 时明确表示"没有下一页"；返回 `undefined` 仅意味着响应里没找到游标字段，
* 调用方应按"没有下一页"处理。
*/
function pickNextCursor(res) {
	if (!res || typeof res !== "object") return null;
	const r = res;
	for (const key of [
		"nextCursor",
		"next_cursor",
		"cursor"
	]) {
		const v = r[key];
		if (typeof v === "string" && v.length > 0) return v;
		if (v === null) return null;
	}
	return null;
}
/** library/viewUrl 的 url 字段归一化：兼容 `url | viewUrl | libraryUrl | downloadUrl | download_url` */
function pickUrl(res) {
	if (typeof res === "string") return res;
	if (res && typeof res === "object") {
		const r = res;
		for (const key of [
			"url",
			"viewUrl",
			"libraryUrl",
			"downloadUrl",
			"download_url"
		]) {
			const v = r[key];
			if (typeof v === "string" && v) return v;
		}
	}
}
var init_ima_response = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/use-tr.ts
function useTr() {
	const t = useTranslation();
	return import_react$10.useCallback((key, fallback, params) => {
		const translated = t(key, params);
		const base = translated === key ? fallback : translated;
		if (!params) return base;
		return base.replace(/\{\{?\s*(\w+)\s*\}?\}/g, (match, name) => {
			const v = params[name];
			return v === void 0 || v === null ? match : String(v);
		});
	}, [t]);
}
var import_react$10;
var init_use_tr = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-file-selector.tsx
/** 获取 MediaType 对应的本地图标 URL，未匹配时返回 unknown 图标 */
function getImaMediaTypeIcon(mediaType) {
	if (mediaType == null) return unknown_default;
	return MEDIA_TYPE_ICON_MAP[mediaType] ?? "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%207.5C4%204.73858%206.23858%202.5%209%202.5H55C57.7614%202.5%2060%204.73858%2060%207.5V56.5C60%2059.2614%2057.7614%2061.5%2055%2061.5H9C6.23858%2061.5%204%2059.2614%204%2056.5V7.5Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M55%205.5H9C7.89543%205.5%207%206.39543%207%207.5V56.5C7%2057.6046%207.89543%2058.5%209%2058.5H55C56.1046%2058.5%2057%2057.6046%2057%2056.5V7.5C57%206.39543%2056.1046%205.5%2055%205.5ZM9%202.5C6.23858%202.5%204%204.73858%204%207.5V56.5C4%2059.2614%206.23858%2061.5%209%2061.5H55C57.7614%2061.5%2060%2059.2614%2060%2056.5V7.5C60%204.73858%2057.7614%202.5%2055%202.5H9Z'%20fill='%2381868F'%20fill-opacity='0.64'%20style='fill:%2381868F;fill:color(display-p3%200.5059%200.5255%200.5608);fill-opacity:0.64;'/%3e%3cpath%20d='M34.3742%2028.0342H48.6008V49.7998C48.6008%2050.4625%2048.0633%2051%2047.4006%2051H16.6017C15.939%2051%2015.4016%2050.4625%2015.4016%2049.7998V14.2002C15.4016%2013.5375%2015.939%2013%2016.6017%2013H34.3742V28.0342ZM48.2385%2024.6465C48.4129%2024.8167%2048.5303%2025.035%2048.5773%2025.2705H37.2199V13.8926L48.2385%2024.6465Z'%20fill='%2381868F'%20style='fill:%2381868F;fill:color(display-p3%200.5059%200.5255%200.5608);fill-opacity:1;'/%3e%3c/svg%3e";
}
function getSelectionKey(item) {
	return `${item.type === "kb" ? "kb" : "file"}:${item.id}`;
}
function createKbSelectedItem(kb) {
	return {
		id: kb.id,
		kbId: kb.id,
		name: kb.name,
		type: "kb",
		coverUrl: kb.coverUrl
	};
}
/** 从文件名中取扩展名（不含 `.`） */
function getExtFromName(name) {
	const dotIdx = name.lastIndexOf(".");
	return dotIdx >= 0 ? name.slice(dotIdx + 1) : "";
}
/**
* 对 highlight_content HTML 做安全消毒：
* 只保留 `<em>` / `</em>` 标签（后端用来标记匹配关键词），
* 其他所有 HTML 标签和属性都被移除，防止 XSS。
*/
function sanitizeHighlightHtml(html) {
	const PH_OPEN = "\0EM_OPEN\0";
	const PH_CLOSE = "\0EM_CLOSE\0";
	let safe = html.replace(/<em>/gi, PH_OPEN).replace(/<\/em>/gi, PH_CLOSE);
	safe = safe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	safe = safe.split(PH_OPEN).join("<em>").split(PH_CLOSE).join("</em>");
	return safe;
}
/**
* 推断 MediaType 数值（用于渲染图标）。
* 优先直接取 entry.mediaType；否则按扩展名 / mime 映射。
*/
function inferMediaType(entry) {
	if (entry.mediaType != null && entry.mediaType !== 0) return entry.mediaType;
	const ext = (entry.extension || getExtFromName(entry.name)).toLowerCase();
	const mime = (entry.mimeType || "").toLowerCase();
	if (ext === "pdf" || mime === "application/pdf") return 1;
	if (["html", "htm"].includes(ext) || mime === "text/html") return 2;
	if (["doc", "docx"].includes(ext) || mime.includes("wordprocessingml") || mime.includes("msword")) return 3;
	if (["ppt", "pptx"].includes(ext) || mime.includes("presentationml") || mime.includes("ms-powerpoint")) return 4;
	if (["xls", "xlsx"].includes(ext) || mime.includes("spreadsheetml") || mime.includes("ms-excel")) return 5;
	if (["md", "markdown"].includes(ext) || mime === "text/markdown") return 7;
	if ([
		"jpg",
		"jpeg",
		"png",
		"gif",
		"bmp",
		"webp",
		"svg"
	].includes(ext) || mime.startsWith("image/")) return 9;
	if (ext === "txt" || mime === "text/plain") return 13;
	if ([
		"mp3",
		"wav",
		"flac",
		"aac",
		"ogg"
	].includes(ext) || mime.startsWith("audio/")) return 15;
	if ([
		"mp4",
		"avi",
		"mov",
		"mkv",
		"wmv"
	].includes(ext) || mime.startsWith("video/")) return 16;
	return 0;
}
/**
* 从 `imaKbList` 响应里解析 groups。
*
* 兼容策略（按"理想 → 降级"顺序）：
*   1. PRD 标准：`{ groups: [{ type, typeName, items, nextCursor, isEnd }] }`
*   2. 早期扁平 mock：`{ items: ImaKbLike[] }` → 全部归到 type=1001 一组
*   3. 数组：`ImaKbLike[]` → 同上
*/
/** 从原始 KB 条目中提取 coverUrl（兼容 coverUrl / cover_url） */
function pickKbCoverUrl(raw) {
	if (typeof raw.coverUrl === "string" && raw.coverUrl) return raw.coverUrl;
	if (typeof raw.cover_url === "string" && raw.cover_url) return raw.cover_url;
}
function pickKbGroups(res) {
	if (res && typeof res === "object" && Array.isArray(res.groups)) return res.groups.map((g) => {
		if (!g || typeof g !== "object") return null;
		const gg = g;
		const type = gg.type;
		if (!DEFAULT_KB_TYPES.includes(type)) return null;
		const items = pickItems(gg.items).map((raw) => ({
			id: typeof raw.id === "string" ? raw.id : "",
			name: typeof raw.name === "string" ? raw.name : "",
			description: typeof raw.description === "string" ? raw.description : void 0,
			coverUrl: pickKbCoverUrl(raw)
		})).filter((k) => k.id);
		return {
			type,
			typeName: typeof gg.typeName === "string" ? gg.typeName : DEFAULT_TYPE_NAMES[type],
			items,
			nextCursor: typeof gg.nextCursor === "string" ? gg.nextCursor : null,
			isEnd: typeof gg.isEnd === "boolean" ? gg.isEnd : gg.nextCursor == null
		};
	}).filter((g) => g != null);
	const flat = pickItems(res);
	if (flat.length > 0) {
		const items = flat.map((raw) => ({
			id: typeof raw.id === "string" ? raw.id : "",
			name: typeof raw.name === "string" ? raw.name : "",
			description: typeof raw.description === "string" ? raw.description : void 0,
			coverUrl: pickKbCoverUrl(raw)
		})).filter((k) => k.id);
		return [{
			type: 1001,
			typeName: DEFAULT_TYPE_NAMES[1001],
			items,
			nextCursor: pickNextCursor(res),
			isEnd: pickNextCursor(res) == null
		}];
	}
	return [];
}
/** 把 `imaKbSearch` 响应解析为精简 KB 列表 */
function pickSearchedKbs(res) {
	return pickItems(res).map((raw) => {
		if (!raw || typeof raw !== "object") return null;
		const id = typeof raw.id === "string" ? raw.id : "";
		if (!id) return null;
		const name = typeof raw.name === "string" ? raw.name : "";
		const highlightName = typeof raw.highlightName === "string" ? raw.highlightName : typeof raw.highlight_name === "string" ? raw.highlight_name : void 0;
		const rawType = typeof raw.type === "number" ? raw.type : void 0;
		const coverUrl = pickKbCoverUrl(raw);
		return {
			id,
			name,
			highlightName,
			type: rawType && DEFAULT_KB_TYPES.includes(rawType) ? rawType : void 0,
			coverUrl
		};
	}).filter((x) => x != null);
}
var import_react$9, import_jsx_runtime$7, MEDIA_TYPE_ICON_MAP, DEFAULT_KB_TYPES, DEFAULT_TYPE_NAMES, EMPTY_FOLDER_STATE, ImaFileSelector, KbIcon, FolderIcon, FileMediaIcon, Checkbox, SearchIcon;
var init_ima_file_selector = __esmMin((() => {
	init_ima_file_selector$1();
	init_src();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_empty();
	init_Excel();
	init_folder();
	init_image();
	init_imanote();
	init_markdown();
	init_pdf();
	init_podcast();
	init_ppt();
	init_soundrecording();
	init_txt();
	init_unknown();
	init_web();
	init_webvideo();
	init_wechatArticle();
	init_word();
	init_xmind();
	init_contexts();
	init_use_debounced_value();
	init_use_ima_api();
	init_use_ima_auth();
	init_highlight_match();
	init_ima_dialog();
	init_ima_library_auth_entry();
	init_ima_response();
	init_telemetry();
	init_use_tr();
	import_jsx_runtime$7 = require_jsx_runtime();
	MEDIA_TYPE_ICON_MAP = {
		0: unknown_default,
		1: pdf_default,
		2: web_default,
		3: word_default,
		4: ppt_default,
		5: Excel_default,
		6: wechatArticle_default,
		7: markdown_default,
		9: image_default,
		11: imanote_default,
		13: txt_default,
		14: xmind_default,
		15: soundrecording_default,
		16: webvideo_default,
		19: podcast_default,
		99: folder_default
	};
	DEFAULT_KB_TYPES = [
		1001,
		1002,
		1004,
		1005
	];
	DEFAULT_TYPE_NAMES = {
		1001: "个人知识库",
		1002: "共享知识库",
		1004: "创建的订阅库",
		1005: "加入的订阅库"
	};
	EMPTY_FOLDER_STATE = {
		loading: false,
		loadingMore: false,
		error: null,
		items: [],
		nextCursor: null
	};
	ImaFileSelector = ({ open, onClose, onSelected, maxSelection = 10, initialSelectedIds, className = "" }) => {
		const tr = useTr();
		const ima = useImaApi();
		const adapter = useAdapter();
		const { authed, loading: authLoading, refresh: refreshAuth } = useImaAuth();
		import_react$9.useEffect(() => {
			if (open && authed) reportAttachImaChooser(adapter);
		}, [
			open,
			authed,
			adapter
		]);
		const PAGE_SIZE = 50;
		const [tab, setTab] = import_react$9.useState("kb");
		const [searchInput, setSearchInput] = import_react$9.useState("");
		const debouncedSearch = useDebouncedValue(searchInput, 300);
		const isSearching = debouncedSearch.trim().length > 0;
		const [selectedKbs, setSelectedKbs] = import_react$9.useState(() => /* @__PURE__ */ new Map());
		const [selectedFiles, setSelectedFiles] = import_react$9.useState(() => /* @__PURE__ */ new Map());
		const totalSelectedCount = selectedKbs.size + selectedFiles.size;
		const [showSelectedPanel, setShowSelectedPanel] = import_react$9.useState(false);
		import_react$9.useEffect(() => {
			if (!open) {
				setTab("kb");
				setShowSelectedPanel(false);
			}
		}, [open]);
		import_react$9.useEffect(() => {
			if (totalSelectedCount === 0) setShowSelectedPanel(false);
		}, [totalSelectedCount]);
		/** 合并所有已选项（知识库 + 文件）用于面板统一展示 */
		const allSelectedEntries = import_react$9.useMemo(() => {
			const entries = [];
			for (const [k, v] of selectedKbs.entries()) entries.push([k, v]);
			for (const [k, v] of selectedFiles.entries()) entries.push([k, v]);
			return entries;
		}, [selectedKbs, selectedFiles]);
		/** 移除单项（根据 item type 决定从哪个 Map 移除） */
		const handleRemoveSelected = import_react$9.useCallback((key, type) => {
			if (type === "kb") setSelectedKbs((prev) => {
				const next = new Map(prev);
				next.delete(key);
				return next;
			});
			else setSelectedFiles((prev) => {
				const next = new Map(prev);
				next.delete(key);
				return next;
			});
		}, []);
		/** 清空所有已选（知识库 + 文件一起清） */
		const handleClearAllSelected = import_react$9.useCallback(() => {
			setSelectedKbs(/* @__PURE__ */ new Map());
			setSelectedFiles(/* @__PURE__ */ new Map());
			setShowSelectedPanel(false);
		}, []);
		const [kbGroups, setKbGroups] = import_react$9.useState([]);
		const [kbsLoading, setKbsLoading] = import_react$9.useState(false);
		const [kbsLoadingMore, setKbsLoadingMore] = import_react$9.useState(false);
		const [kbsError, setKbsError] = import_react$9.useState(null);
		/** 「选择文件」Tab 下：当前进入的 KB id（用来拉文件和搜索） */
		/** 「选择文件」Tab 下：当前进入的 KB id（用来拉文件） */
		const [fileActiveKbId, setFileActiveKbId] = import_react$9.useState(null);
		const allKbs = import_react$9.useMemo(() => kbGroups.flatMap((g) => g.items), [kbGroups]);
		const hasMoreKbs = import_react$9.useMemo(() => kbGroups.some((g) => !g.isEnd && g.nextCursor), [kbGroups]);
		const [files, setFiles] = import_react$9.useState([]);
		const [filesLoading, setFilesLoading] = import_react$9.useState(false);
		const [filesLoadingMore, setFilesLoadingMore] = import_react$9.useState(false);
		const [filesError, setFilesError] = import_react$9.useState(null);
		const [filesNextCursor, setFilesNextCursor] = import_react$9.useState(null);
		/** 文件夹展开状态（folderId → children state） */
		const [folderStates, setFolderStates] = import_react$9.useState(() => /* @__PURE__ */ new Map());
		/** 文件夹是否展开（folderId → boolean） */
		const [folderExpanded, setFolderExpanded] = import_react$9.useState(() => /* @__PURE__ */ new Set());
		const [searchedKbs, setSearchedKbs] = import_react$9.useState([]);
		const [searchKbsLoading, setSearchKbsLoading] = import_react$9.useState(false);
		const [searchKbsError, setSearchKbsError] = import_react$9.useState(null);
		const [searchedFiles, setSearchedFiles] = import_react$9.useState([]);
		const [searchFilesLoading, setSearchFilesLoading] = import_react$9.useState(false);
		const [searchFilesError, setSearchFilesError] = import_react$9.useState(null);
		const fileListRef = import_react$9.useRef(null);
		/** 非空分组列表（渲染单列分组列表时用） */
		const nonEmptyGroups = import_react$9.useMemo(() => kbGroups.filter((g) => g.items.length > 0), [kbGroups]);
		import_react$9.useEffect(() => {
			if (open) setSearchInput("");
		}, [open]);
		import_react$9.useEffect(() => {
			if (!initialSelectedIds || initialSelectedIds.length === 0) return;
			setSelectedFiles((prev) => {
				return new Map(prev);
			});
		}, [initialSelectedIds]);
		const KB_MAX_ITEMS_PER_TYPE = 200;
		import_react$9.useEffect(() => {
			if (!open || !authed) return;
			let cancelled = false;
			setKbsLoading(true);
			setKbsError(null);
			setKbGroups([]);
			const fetchAllKbs = async () => {
				const firstRes = await ima.imaKbList({
					types: DEFAULT_KB_TYPES,
					limit: PAGE_SIZE
				});
				if (cancelled) return;
				let groups = pickKbGroups(firstRes);
				let pending = groups.filter((g) => !g.isEnd && g.nextCursor && g.items.length < KB_MAX_ITEMS_PER_TYPE);
				while (pending.length > 0) {
					const cursors = {};
					const types = [];
					for (const g of pending) {
						cursors[g.type] = g.nextCursor;
						types.push(g.type);
					}
					const moreRes = await ima.imaKbList({
						types,
						cursors,
						limit: PAGE_SIZE
					});
					if (cancelled) return;
					const moreGroups = pickKbGroups(moreRes);
					let hasProgress = false;
					groups = groups.map((g) => {
						const updated = moreGroups.find((m) => m.type === g.type);
						if (!updated) return g;
						const exist = new Set(g.items.map((k) => k.id));
						const addedItems = updated.items.filter((k) => !exist.has(k.id));
						const merged = {
							...g,
							items: [...g.items, ...addedItems],
							nextCursor: updated.nextCursor,
							isEnd: updated.isEnd
						};
						if (addedItems.length > 0 || merged.nextCursor !== g.nextCursor || merged.isEnd !== g.isEnd) hasProgress = true;
						return merged;
					});
					if (!hasProgress) {
						console.warn("[ImaFileSelector] kb pagination stalled, stop auto-pagination", {
							pendingTypes: pending.map((g) => g.type),
							cursors
						});
						break;
					}
					pending = groups.filter((g) => !g.isEnd && g.nextCursor && g.items.length < KB_MAX_ITEMS_PER_TYPE);
				}
				if (cancelled) return;
				setKbGroups(groups);
				const firstNonEmpty = groups.find((g) => g.items.length > 0);
				if (firstNonEmpty) {
					const firstKb = firstNonEmpty.items[0];
					if (firstKb) setFileActiveKbId((prev) => prev ?? firstKb.id);
				}
			};
			fetchAllKbs().catch((err) => {
				if (cancelled) return;
				setKbsError(err instanceof Error ? err.message : String(err));
			}).finally(() => {
				if (!cancelled) setKbsLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [
			open,
			authed,
			ima
		]);
		const loadMoreKbs = import_react$9.useCallback(() => {
			if (kbsLoading || kbsLoadingMore) return;
			const pending = kbGroups.filter((g) => !g.isEnd && g.nextCursor);
			if (pending.length === 0) return;
			const cursors = {};
			const types = [];
			for (const g of pending) {
				cursors[g.type] = g.nextCursor;
				types.push(g.type);
			}
			setKbsLoadingMore(true);
			ima.imaKbList({
				types,
				cursors,
				limit: PAGE_SIZE
			}).then((res) => {
				const more = pickKbGroups(res);
				let hasProgress = false;
				setKbGroups((prev) => prev.map((g) => {
					const updated = more.find((m) => m.type === g.type);
					if (!updated) return g;
					const exist = new Set(g.items.map((k) => k.id));
					const addedItems = updated.items.filter((k) => !exist.has(k.id));
					const next = {
						...g,
						items: [...g.items, ...addedItems],
						nextCursor: updated.nextCursor,
						isEnd: updated.isEnd
					};
					if (addedItems.length > 0 || next.nextCursor !== g.nextCursor || next.isEnd !== g.isEnd) hasProgress = true;
					return next;
				}));
				if (!hasProgress) console.warn("[ImaFileSelector] kb loadMore stalled, stop pagination", {
					types,
					cursors
				});
			}).catch((err) => {
				setKbsError(err instanceof Error ? err.message : String(err));
			}).finally(() => {
				setKbsLoadingMore(false);
			});
		}, [
			ima,
			kbGroups,
			kbsLoading,
			kbsLoadingMore
		]);
		import_react$9.useEffect(() => {
			if (!open || !authed || tab !== "file" || isSearching || !fileActiveKbId) return;
			let cancelled = false;
			setFilesLoading(true);
			setFilesError(null);
			setFiles([]);
			setFilesNextCursor(null);
			setFolderStates(/* @__PURE__ */ new Map());
			setFolderExpanded(/* @__PURE__ */ new Set());
			if (fileListRef.current) fileListRef.current.scrollTop = 0;
			ima.imaFilesList({
				kbId: fileActiveKbId,
				limit: PAGE_SIZE
			}).then((res) => {
				if (cancelled) return;
				setFiles(pickEntries(res));
				setFilesNextCursor(pickNextCursor(res));
			}).catch((err) => {
				if (cancelled) return;
				setFilesError(err instanceof Error ? err.message : String(err));
				setFiles([]);
			}).finally(() => {
				if (!cancelled) setFilesLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [
			open,
			authed,
			tab,
			isSearching,
			fileActiveKbId,
			ima
		]);
		const loadMoreFiles = import_react$9.useCallback(() => {
			if (filesLoading || filesLoadingMore || !filesNextCursor || !fileActiveKbId) return;
			const requestCursor = filesNextCursor;
			setFilesLoadingMore(true);
			ima.imaFilesList({
				kbId: fileActiveKbId,
				cursor: requestCursor,
				limit: PAGE_SIZE
			}).then((res) => {
				const more = pickEntries(res);
				let addedCount = 0;
				setFiles((prev) => {
					const exist = new Set(prev.map((f) => f.id));
					const added = more.filter((f) => !exist.has(f.id));
					addedCount = added.length;
					return [...prev, ...added];
				});
				const nextCursor = pickNextCursor(res);
				if (nextCursor && nextCursor === requestCursor && addedCount === 0) {
					console.warn("[ImaFileSelector] file loadMore stalled, force stop pagination", {
						kbId: fileActiveKbId,
						cursor: requestCursor
					});
					setFilesNextCursor(null);
					return;
				}
				setFilesNextCursor(nextCursor);
			}).catch((err) => {
				setFilesError(err instanceof Error ? err.message : String(err));
			}).finally(() => {
				setFilesLoadingMore(false);
			});
		}, [
			ima,
			fileActiveKbId,
			filesLoading,
			filesLoadingMore,
			filesNextCursor
		]);
		const FOLDER_MAX_ITEMS = 200;
		const loadAllFolderChildren = import_react$9.useCallback(async (kbId, folderId) => {
			let allItems = [];
			let cursor = null;
			try {
				const firstRes = await ima.imaFilesList({
					kbId,
					folderId,
					limit: PAGE_SIZE
				});
				allItems = pickEntries(firstRes);
				cursor = pickNextCursor(firstRes);
				while (cursor && allItems.length < FOLDER_MAX_ITEMS) {
					const requestCursor = cursor;
					const moreRes = await ima.imaFilesList({
						kbId,
						folderId,
						cursor: requestCursor,
						limit: PAGE_SIZE
					});
					const more = pickEntries(moreRes);
					const exist = new Set(allItems.map((f) => f.id));
					const added = more.filter((f) => !exist.has(f.id));
					allItems = [...allItems, ...added];
					const nextCursor = pickNextCursor(moreRes);
					if (nextCursor && nextCursor === requestCursor && added.length === 0) {
						console.warn("[ImaFileSelector] folder pagination stalled, stop auto-pagination", {
							kbId,
							folderId,
							cursor: requestCursor
						});
						break;
					}
					cursor = nextCursor;
				}
				setFolderStates((prev) => {
					const next = new Map(prev);
					next.set(folderId, {
						loading: false,
						loadingMore: false,
						error: null,
						items: allItems,
						nextCursor: null
					});
					return next;
				});
			} catch (err) {
				setFolderStates((prev) => {
					const next = new Map(prev);
					next.set(folderId, {
						loading: false,
						loadingMore: false,
						error: err instanceof Error ? err.message : String(err),
						items: [],
						nextCursor: null
					});
					return next;
				});
			}
		}, [ima]);
		const toggleFolder = import_react$9.useCallback((folder) => {
			const folderId = folder.id;
			const kbId = folder.kbId || fileActiveKbId;
			if (!kbId) return;
			setFolderExpanded((prev) => {
				const next = new Set(prev);
				if (next.has(folderId)) {
					next.delete(folderId);
					return next;
				}
				next.add(folderId);
				return next;
			});
			setFolderStates((prev) => {
				if (prev.has(folderId)) return prev;
				const next = new Map(prev);
				next.set(folderId, {
					...EMPTY_FOLDER_STATE,
					loading: true
				});
				return next;
			});
			const already = folderStates.get(folderId);
			if (already && (already.items.length > 0 || already.loading)) return;
			loadAllFolderChildren(kbId, folderId);
		}, [
			folderStates,
			fileActiveKbId,
			loadAllFolderChildren
		]);
		import_react$9.useEffect(() => {
			if (!open || !authed || !isSearching) {
				setSearchedKbs([]);
				return;
			}
			let cancelled = false;
			setSearchKbsLoading(true);
			setSearchKbsError(null);
			ima.imaKbSearch({
				query: debouncedSearch.trim(),
				limit: 20
			}).then((res) => {
				if (cancelled) return;
				setSearchedKbs(pickSearchedKbs(res));
			}).catch((err) => {
				if (cancelled) return;
				setSearchKbsError(err instanceof Error ? err.message : String(err));
				setSearchedKbs([]);
			}).finally(() => {
				if (!cancelled) setSearchKbsLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [
			open,
			authed,
			isSearching,
			debouncedSearch,
			ima
		]);
		import_react$9.useEffect(() => {
			if (!open || !authed || !isSearching || tab !== "file" || !fileActiveKbId) {
				setSearchedFiles([]);
				return;
			}
			let cancelled = false;
			setSearchFilesLoading(true);
			setSearchFilesError(null);
			ima.imaFilesSearch({
				kbId: fileActiveKbId,
				q: debouncedSearch.trim()
			}).then((res) => {
				if (cancelled) return;
				setSearchedFiles(pickEntries(res).filter((e) => e.type !== "folder"));
			}).catch((err) => {
				if (cancelled) return;
				setSearchFilesError(err instanceof Error ? err.message : String(err));
				setSearchedFiles([]);
			}).finally(() => {
				if (!cancelled) setSearchFilesLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [
			open,
			authed,
			isSearching,
			tab,
			fileActiveKbId,
			debouncedSearch,
			ima
		]);
		const toggleFileSelected = import_react$9.useCallback((file) => {
			if (file.type === "folder" || file.canFetchContent === false) return;
			setSelectedFiles((prev) => {
				const next = new Map(prev);
				const key = getSelectionKey(file);
				if (next.has(key)) next.delete(key);
				else if (next.size < maxSelection) next.set(key, file);
				return next;
			});
		}, [maxSelection]);
		const toggleKbSelected = import_react$9.useCallback((kb) => {
			setSelectedKbs((prev) => {
				const next = new Map(prev);
				const item = createKbSelectedItem(kb);
				const key = getSelectionKey(item);
				if (next.has(key)) next.delete(key);
				else if (next.size < maxSelection) next.set(key, item);
				return next;
			});
		}, [maxSelection]);
		const handleConfirm = import_react$9.useCallback(() => {
			const blocks = [];
			for (const item of selectedKbs.values()) blocks.push(createImaFileBlock({
				fileId: item.id,
				kbId: item.kbId || item.id,
				filename: item.name,
				itemType: "kb",
				kbName: item.name,
				iconUrl: item.coverUrl || "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%207.5C4%204.73858%206.23858%202.5%209%202.5H55C57.7614%202.5%2060%204.73858%2060%207.5V56.5C60%2059.2614%2057.7614%2061.5%2055%2061.5H9C6.23858%2061.5%204%2059.2614%204%2056.5V7.5Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M55%205.5H9C7.89543%205.5%207%206.39543%207%207.5V56.5C7%2057.6046%207.89543%2058.5%209%2058.5H55C56.1046%2058.5%2057%2057.6046%2057%2056.5V7.5C57%206.39543%2056.1046%205.5%2055%205.5ZM9%202.5C6.23858%202.5%204%204.73858%204%207.5V56.5C4%2059.2614%206.23858%2061.5%209%2061.5H55C57.7614%2061.5%2060%2059.2614%2060%2056.5V7.5C60%204.73858%2057.7614%202.5%2055%202.5H9Z'%20fill='%2311CF70'%20fill-opacity='0.64'%20style='fill:%2311CF70;fill:color(display-p3%200.0667%200.8118%200.4392);fill-opacity:0.64;'/%3e%3cpath%20d='M38.8184%2017C41.8505%2017.0001%2044.4949%2018.651%2045.9082%2021.1016C43.5976%2022.8107%2041.6581%2024.7294%2039.9727%2026.8359C39.8014%2026.515%2039.5959%2026.2045%2039.3486%2025.9131C38.3227%2024.704%2036.8544%2024.1221%2035.1904%2024.1221C32.0274%2024.1223%2029.4886%2026.3409%2027.6729%2028.5928C25.7737%2030.9481%2024.1799%2033.9415%2022.9707%2036.6475C22.4507%2037.8111%2022.9721%2039.1763%2024.1357%2039.6963C25.2993%2040.2162%2026.6637%2039.6938%2027.1836%2038.5303C28.3197%2035.9879%2029.7238%2033.4014%2031.2656%2031.4893C32.8906%2029.474%2034.236%2028.7375%2035.1904%2028.7373C35.732%2028.7373%2035.8207%2028.8893%2035.8291%2028.8994C35.9057%2028.9897%2036.0756%2029.2868%2036.1182%2029.9775C36.2046%2031.382%2035.6964%2033.3744%2034.877%2035.0146C34.3074%2036.1547%2034.7693%2037.5406%2035.9092%2038.1104C37.0493%2038.68%2038.4362%2038.2173%2039.0059%2037.0771C41.205%2032.6755%2043.6391%2029.0648%2047%2026.1387V41.5459C46.9998%2044.558%2044.558%2046.9998%2041.5459%2047H22.4541C19.442%2046.9998%2017.0002%2044.558%2017%2041.5459V22.4541C17.0002%2019.442%2019.442%2017.0002%2022.4541%2017H38.8184Z'%20fill='%2311CF70'%20style='fill:%2311CF70;fill:color(display-p3%200.0652%200.8118%200.4409);fill-opacity:1;'/%3e%3c/svg%3e"
			}));
			for (const item of selectedFiles.values()) {
				const itemKb = allKbs.find((kb) => kb.id === item.kbId) ?? allKbs.find((kb) => kb.id === fileActiveKbId);
				blocks.push(createImaFileBlock({
					fileId: item.id,
					kbId: item.kbId || fileActiveKbId || "",
					filename: item.name,
					itemType: "file",
					kbName: itemKb?.name,
					path: item.path,
					iconUrl: getImaMediaTypeIcon(inferMediaType(item))
				}));
			}
			onSelected(blocks);
			onClose();
			setSelectedKbs(/* @__PURE__ */ new Map());
			setSelectedFiles(/* @__PURE__ */ new Map());
		}, [
			selectedKbs,
			selectedFiles,
			allKbs,
			fileActiveKbId,
			onSelected,
			onClose
		]);
		const handleCancel = import_react$9.useCallback(() => {
			onClose();
			setSelectedKbs(/* @__PURE__ */ new Map());
			setSelectedFiles(/* @__PURE__ */ new Map());
			setSearchInput("");
		}, [onClose]);
		const REACH_BOTTOM_THRESHOLD = 80;
		const isNearBottom = (el) => el.scrollHeight - el.scrollTop - el.clientHeight <= REACH_BOTTOM_THRESHOLD;
		const handleFileScroll = import_react$9.useCallback((e) => {
			if (isNearBottom(e.currentTarget)) loadMoreFiles();
		}, [loadMoreFiles]);
		const handleKbRightScroll = import_react$9.useCallback((e) => {
			if (isNearBottom(e.currentTarget)) loadMoreKbs();
		}, [loadMoreKbs]);
		/**
		* 渲染统一的分组知识库列表（单列，分组标题作为 section header）。
		* 供「选择知识库」Tab 和「选择文件」Tab 左列共用。
		*
		* @param mode - 'kb': 多选知识库模式；'file': 点击切换 activeKb 模式
		*/
		const renderKbGroupedList = (mode) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("ul", {
			className: "ima-fs-v2__kb-grouped-list",
			onScroll: handleKbRightScroll,
			children: [
				kbsLoading && nonEmptyGroups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", {
					className: "ima-fs-v2__placeholder",
					children: tr("ima.fileSelector.loading", "加载中…")
				}),
				kbsError && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", {
					className: "ima-fs-v2__placeholder ima-fs-v2__placeholder--error",
					children: kbsError
				}),
				!kbsLoading && !kbsError && nonEmptyGroups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", {
					className: "ima-fs-v2__placeholder",
					children: tr("ima.fileSelector.noKbs", "暂无知识库")
				}),
				nonEmptyGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_react$9.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", {
					className: "ima-fs-v2__group-header",
					children: group.typeName
				}), group.items.map((kb) => {
					if (mode === "kb") {
						const key = getSelectionKey(createKbSelectedItem(kb));
						const picked = selectedKbs.has(key);
						const disabled = !picked && selectedKbs.size >= maxSelection;
						return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("li", {
							className: `ima-fs-v2__kb-row${picked ? " ima-fs-v2__kb-row--picked" : ""}${disabled ? " ima-fs-v2__kb-row--disabled" : ""}`,
							onClick: () => !disabled && toggleKbSelected(kb),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Checkbox, {
									checked: picked,
									disabled
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(KbIcon, { coverUrl: kb.coverUrl }),
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
									className: "ima-fs-v2__kb-name",
									children: kb.name
								})
							]
						}, kb.id);
					}
					return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("li", {
						className: `ima-fs-v2__kb-row${fileActiveKbId === kb.id ? " ima-fs-v2__kb-row--active" : ""}`,
						onClick: () => setFileActiveKbId(kb.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(KbIcon, { coverUrl: kb.coverUrl }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: "ima-fs-v2__kb-name",
							children: kb.name
						})]
					}, kb.id);
				})] }, group.type)),
				kbsLoadingMore && hasMoreKbs && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", {
					className: "ima-fs-v2__load-more",
					children: tr("ima.fileSelector.loadingMore", "加载更多…")
				})
			]
		});
		const renderFileTreeCol = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			ref: fileListRef,
			className: "ima-fs-v2__file-tree",
			onScroll: handleFileScroll,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__col-label",
					children: tr("ima.fileSelector.searchSectionFile", "文件")
				}),
				!fileActiveKbId && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder",
					children: tr("ima.fileSelector.selectKbFirst", "请在左侧选择一个知识库")
				}),
				fileActiveKbId && filesLoading && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder",
					children: tr("ima.fileSelector.loading", "加载中…")
				}),
				fileActiveKbId && filesError && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder ima-fs-v2__placeholder--error",
					children: filesError
				}),
				fileActiveKbId && !filesLoading && !filesError && files.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "ima-fs-v2__placeholder ima-fs-v2__placeholder--empty",
					role: "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
						className: "ima-fs-v2__placeholder-icon",
						src: "" + new URL("empty-CopzwuXE.svg", import.meta.url).href,
						alt: "",
						"aria-hidden": "true",
						draggable: false
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "ima-fs-v2__placeholder-text",
						children: tr("ima.fileSelector.empty", "此知识库暂无文件")
					})]
				}),
				fileActiveKbId && files.map((entry) => renderFileTreeRow(entry, 0)),
				fileActiveKbId && filesLoadingMore && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__load-more",
					children: tr("ima.fileSelector.loadingMore", "加载更多…")
				})
			]
		});
		const renderFileTreeRow = (entry, depth) => {
			const indent = 14 + depth * 18;
			if (entry.type === "folder") {
				const expanded = folderExpanded.has(entry.id);
				const state = folderStates.get(entry.id) ?? EMPTY_FOLDER_STATE;
				return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_react$9.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "ima-fs-v2__tree-row ima-fs-v2__tree-row--folder",
						style: { paddingLeft: indent },
						onClick: () => toggleFolder(entry),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ChevronDownIcon, {
								className: `ima-fs-v2__tree-caret${expanded ? " expanded" : ""}`,
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FolderIcon, { iconUrl: entry.mediaTypeIcon }),
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
								className: "ima-fs-v2__tree-name",
								children: entry.name
							})
						]
					}),
					expanded && state.loading && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "ima-fs-v2__placeholder",
						style: { paddingLeft: indent + 22 },
						children: tr("ima.fileSelector.loading", "加载中…")
					}),
					expanded && state.error && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "ima-fs-v2__placeholder ima-fs-v2__placeholder--error",
						style: { paddingLeft: indent + 22 },
						children: state.error
					}),
					expanded && state.items.map((child) => renderFileTreeRow(child, depth + 1))
				] }, `folder-${entry.id}`);
			}
			const isSelected = selectedFiles.has(getSelectionKey(entry));
			const disabled = !(entry.canFetchContent !== false) || !isSelected && selectedFiles.size >= maxSelection;
			return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: `ima-fs-v2__tree-row ima-fs-v2__tree-row--file${isSelected ? " ima-fs-v2__tree-row--selected" : ""}${disabled ? " ima-fs-v2__tree-row--disabled" : ""}`,
				style: { paddingLeft: indent },
				onClick: () => !disabled && toggleFileSelected(entry),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Checkbox, {
						checked: isSelected,
						disabled
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FileMediaIcon, {
						mediaType: inferMediaType(entry),
						iconUrl: entry.mediaTypeIcon,
						coverUrl: entry.coverUrl
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "ima-fs-v2__tree-name",
						children: entry.name
					})
				]
			}, `file-${entry.id}`);
		};
		const renderSearchView = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "ima-fs-v2__search-panel",
			children: [
				searchKbsLoading && searchedKbs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder",
					children: tr("ima.fileSelector.loading", "加载中…")
				}),
				searchKbsError && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder ima-fs-v2__placeholder--error",
					children: searchKbsError
				}),
				searchedKbs.map((kb) => {
					const key = getSelectionKey({
						id: kb.id,
						type: "kb"
					});
					const picked = selectedKbs.has(key);
					const disabled = !picked && selectedKbs.size >= maxSelection;
					return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: `ima-fs-v2__sr-row${picked ? " ima-fs-v2__sr-row--picked" : ""}${disabled ? " ima-fs-v2__sr-row--disabled" : ""}`,
						onClick: () => !disabled && toggleKbSelected({
							id: kb.id,
							name: kb.name
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Checkbox, {
								checked: picked,
								disabled
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(KbIcon, { coverUrl: kb.coverUrl }),
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
								className: "ima-fs-v2__sr-name",
								children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(HighlightMatch, {
									text: kb.name,
									query: debouncedSearch
								})
							})
						]
					}, `skb-${kb.id}`);
				}),
				!searchKbsLoading && !searchKbsError && searchedKbs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "ima-fs-v2__no-results",
					role: "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
						className: "ima-fs-v2__no-results-icon",
						src: "" + new URL("empty-CopzwuXE.svg", import.meta.url).href,
						alt: "",
						"aria-hidden": "true",
						draggable: false
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "ima-fs-v2__no-results-text",
						children: tr("ima.fileSelector.noSearchResult", "未找到相关结果")
					})]
				})
			]
		});
		const renderSearchFileResults = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "ima-fs-v2__file-tree",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__col-label",
					children: tr("ima.fileSelector.searchSectionFile", "文件")
				}),
				!fileActiveKbId && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder",
					children: tr("ima.fileSelector.searchPickKbFirst", "请先在左侧选择一个知识库后再搜索文件")
				}),
				fileActiveKbId && searchFilesLoading && searchedFiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder",
					children: tr("ima.fileSelector.loading", "加载中…")
				}),
				fileActiveKbId && searchFilesError && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "ima-fs-v2__placeholder ima-fs-v2__placeholder--error",
					children: searchFilesError
				}),
				fileActiveKbId && !searchFilesLoading && !searchFilesError && searchedFiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "ima-fs-v2__placeholder ima-fs-v2__placeholder--empty",
					role: "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
						className: "ima-fs-v2__placeholder-icon",
						src: "" + new URL("empty-CopzwuXE.svg", import.meta.url).href,
						alt: "",
						"aria-hidden": "true",
						draggable: false
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "ima-fs-v2__placeholder-text",
						children: tr("ima.fileSelector.noSearchResult", "未找到匹配的文件")
					})]
				}),
				fileActiveKbId && searchedFiles.map((f) => {
					const isSelected = selectedFiles.has(getSelectionKey(f));
					const disabled = !(f.canFetchContent !== false) || !isSelected && selectedFiles.size >= maxSelection;
					return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: `ima-fs-v2__sr-row${isSelected ? " ima-fs-v2__sr-row--picked" : ""}${disabled ? " ima-fs-v2__sr-row--disabled" : ""}`,
						onClick: () => !disabled && toggleFileSelected(f),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Checkbox, {
								checked: isSelected,
								disabled
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FileMediaIcon, {
								mediaType: inferMediaType(f),
								iconUrl: f.mediaTypeIcon,
								coverUrl: f.coverUrl
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("span", {
								className: "ima-fs-v2__sr-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
									className: "ima-fs-v2__sr-name",
									children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(HighlightMatch, {
										text: f.name,
										query: debouncedSearch
									})
								}), f.highlightContent && !(debouncedSearch && f.name.toLowerCase().includes(debouncedSearch.toLowerCase())) && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
									className: "ima-fs-v2__sr-highlight",
									dangerouslySetInnerHTML: { __html: sanitizeHighlightHtml(f.highlightContent) }
								})]
							}),
							f.path && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
								className: "ima-fs-v2__sr-path",
								children: f.path
							})
						]
					}, `sf-${f.id}`);
				})
			]
		});
		const dialogContent = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ImaDialogHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
					tr("ima.fileSelector.titlePrefix", "从 "),
					"ima",
					tr("ima.fileSelector.titleSuffix", " 知识库中选择")
				] }),
				onClose: handleCancel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "ima-fs-v2__toolbar",
				onClick: () => showSelectedPanel && setShowSelectedPanel(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "ima-fs-v2__tabs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
						type: "button",
						className: `ima-fs-v2__tab-btn${tab === "kb" ? " ima-fs-v2__tab-btn--active" : ""}`,
						onClick: () => setTab("kb"),
						children: tr("ima.fileSelector.tabKb", "选择知识库")
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
						type: "button",
						className: `ima-fs-v2__tab-btn${tab === "file" ? " ima-fs-v2__tab-btn--active" : ""}`,
						onClick: () => setTab("file"),
						children: tr("ima.fileSelector.tabFile", "选择文件")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "ima-fs-v2__search-box",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(SearchIcon, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("input", {
							type: "text",
							className: "ima-fs-v2__search-input",
							value: searchInput,
							placeholder: tab === "kb" ? tr("ima.fileSelector.searchKbPlaceholder", "搜索知识库") : tr("ima.fileSelector.searchFilePlaceholder", "搜索文件"),
							onChange: (e) => setSearchInput(e.target.value)
						}),
						searchInput && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							type: "button",
							className: "ima-fs-v2__search-clear",
							onClick: () => setSearchInput(""),
							"aria-label": "clear",
							children: "✕"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "ima-fs-v2__body",
				onClick: () => showSelectedPanel && setShowSelectedPanel(false),
				children: tab === "kb" ? isSearching ? renderSearchView() : renderKbGroupedList("kb") : isSearching ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("aside", {
					className: "ima-fs-v2__left",
					children: renderKbGroupedList("file")
				}), renderSearchFileResults()] }) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("aside", {
					className: "ima-fs-v2__left",
					children: renderKbGroupedList("file")
				}), renderFileTreeCol()] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "ima-fs-v2__footer-wrapper",
				children: [showSelectedPanel && totalSelectedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "ima-fs-v2__selected-panel",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "ima-fs-v2__selected-panel-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: "ima-fs-v2__selected-panel-title",
							children: tr("ima.fileSelector.selectedItems", "已选 {{count}} 项", { count: totalSelectedCount })
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							type: "button",
							className: "ima-fs-v2__selected-panel-clear",
							onClick: handleClearAllSelected,
							children: tr("ima.fileSelector.clearAll", "清空")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "ima-fs-v2__selected-panel-list",
						children: allSelectedEntries.map(([key, item]) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "ima-fs-v2__selected-panel-item",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
									className: "ima-fs-v2__selected-panel-icon",
									children: item.type === "kb" ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(KbIcon, { coverUrl: item.coverUrl }) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FileMediaIcon, {
										mediaType: inferMediaType(item),
										iconUrl: item.mediaTypeIcon,
										coverUrl: item.coverUrl
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
									className: "ima-fs-v2__selected-panel-name",
									children: item.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
									type: "button",
									className: "ima-fs-v2__selected-panel-remove",
									onClick: () => handleRemoveSelected(key, item.type || "file"),
									"aria-label": tr("ima.fileSelector.removeSelected", "移除"),
									children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 16 16",
										fill: "none",
										xmlns: "http://www.w3.org/2000/svg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
											d: "M2.626 2.626a.6.6 0 0 1 .849 0L8 7.152l4.525-4.526a.6.6 0 0 1 .849.849L8.848 8l4.526 4.525a.6.6 0 0 1-.849.849L8 8.848l-4.525 4.526a.6.6 0 0 1-.849-.849L7.152 8 2.626 3.475a.6.6 0 0 1 0-.849z",
											fill: "currentColor"
										})
									})
								})
							]
						}, key))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "ima-fs-v2__footer",
					children: [totalSelectedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("span", {
						className: "ima-fs-v2__footer-summary",
						onClick: () => setShowSelectedPanel((v) => !v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: tr("ima.fileSelector.selectedItems", "已选 {{count}} 项", { count: totalSelectedCount }) }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("svg", {
							className: `ima-fs-v2__footer-chevron${showSelectedPanel ? " ima-fs-v2__footer-chevron--up" : ""}`,
							xmlns: "http://www.w3.org/2000/svg",
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
								fill: "currentColor",
								fillOpacity: "0.4",
								transform: "translate(2.4 5.4)",
								d: "M10.176.175a.6.6 0 0 1 .849.001.6.6 0 0 1-.001.849L6.731 5.315a1 1 0 0 1-1.415 0L.176 1.025l-.077-.095A.6.6 0 0 1 .175.176a.6.6 0 0 1 .755-.077l.094.076L5.317 4.466a.2.2 0 0 0 .283 0L10.176.175Z"
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "ima-fs-v2__footer-count",
						children: tr("ima.fileSelector.selectedItems", "已选 {{count}} 项", { count: 0 })
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "ima-fs-v2__footer-btns",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							type: "button",
							className: "ima-fs-v2__btn ima-fs-v2__btn--cancel",
							onClick: handleCancel,
							children: tr("ima.fileSelector.cancel", "取消")
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							type: "button",
							className: "ima-fs-v2__btn ima-fs-v2__btn--primary",
							onClick: handleConfirm,
							disabled: totalSelectedCount === 0,
							children: tr("ima.fileSelector.ok", "确定")
						})]
					})]
				})]
			})
		] });
		const authGateContent = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ImaDialogHeader, {
			title: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
				tr("ima.fileSelector.titlePrefix", "从 "),
				"ima",
				tr("ima.fileSelector.titleSuffix", " 知识库中选择")
			] }),
			onClose: handleCancel
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "ima-fs-v2__auth-gate",
			children: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "ima-fs-v2__placeholder",
				children: tr("ima.fileSelector.loading", "加载中…")
			}) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ImaLibraryAuthEntry, {
				onAuthed: () => {
					refreshAuth();
				},
				authSource: "file_picker"
			})
		})] });
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ImaDialog, {
			open,
			onClose: handleCancel,
			overlayClassName: className,
			onDialogClick: () => showSelectedPanel && setShowSelectedPanel(false),
			children: authed ? dialogContent : authGateContent
		});
	};
	KbIcon = ({ coverUrl }) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
		src: coverUrl || "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%207.5C4%204.73858%206.23858%202.5%209%202.5H55C57.7614%202.5%2060%204.73858%2060%207.5V56.5C60%2059.2614%2057.7614%2061.5%2055%2061.5H9C6.23858%2061.5%204%2059.2614%204%2056.5V7.5Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M55%205.5H9C7.89543%205.5%207%206.39543%207%207.5V56.5C7%2057.6046%207.89543%2058.5%209%2058.5H55C56.1046%2058.5%2057%2057.6046%2057%2056.5V7.5C57%206.39543%2056.1046%205.5%2055%205.5ZM9%202.5C6.23858%202.5%204%204.73858%204%207.5V56.5C4%2059.2614%206.23858%2061.5%209%2061.5H55C57.7614%2061.5%2060%2059.2614%2060%2056.5V7.5C60%204.73858%2057.7614%202.5%2055%202.5H9Z'%20fill='%2381868F'%20fill-opacity='0.64'%20style='fill:%2381868F;fill:color(display-p3%200.5059%200.5255%200.5608);fill-opacity:0.64;'/%3e%3cpath%20d='M34.3742%2028.0342H48.6008V49.7998C48.6008%2050.4625%2048.0633%2051%2047.4006%2051H16.6017C15.939%2051%2015.4016%2050.4625%2015.4016%2049.7998V14.2002C15.4016%2013.5375%2015.939%2013%2016.6017%2013H34.3742V28.0342ZM48.2385%2024.6465C48.4129%2024.8167%2048.5303%2025.035%2048.5773%2025.2705H37.2199V13.8926L48.2385%2024.6465Z'%20fill='%2381868F'%20style='fill:%2381868F;fill:color(display-p3%200.5059%200.5255%200.5608);fill-opacity:1;'/%3e%3c/svg%3e",
		width: 18,
		height: 18,
		className: "ima-fs-v2__kb-icon-img",
		alt: "",
		draggable: false
	});
	FolderIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
		src: folder_default,
		width: 20,
		height: 20,
		className: "ima-fs-v2__folder-icon-img",
		alt: "",
		draggable: false
	});
	FileMediaIcon = ({ mediaType }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
			src: getImaMediaTypeIcon(mediaType),
			width: 16,
			height: 16,
			className: "ima-fs-v2__file-icon-img",
			alt: "",
			draggable: false
		});
	};
	Checkbox = ({ checked, disabled }) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
		className: `ima-fs-v2__chk${checked ? " ima-fs-v2__chk--on" : ""}${disabled ? " ima-fs-v2__chk--disabled" : ""}`,
		"aria-hidden": true,
		children: checked && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("svg", {
			width: "10",
			height: "10",
			viewBox: "0 0 10 10",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
				d: "M2 5l2.5 2.5 3.5-4",
				stroke: "#fff",
				strokeWidth: "1.6",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	});
	SearchIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		className: "ima-fs-v2__search-icon",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("circle", {
			cx: "6.5",
			cy: "6.5",
			r: "5",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M10.5 10.5L14 14",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-dir-selector.scss
var init_ima_dir_selector$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-auth-gate.tsx
var import_react$8, import_jsx_runtime$6, ImaAuthGate;
var init_ima_auth_gate = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_use_ima_auth();
	init_ima_library_auth_entry();
	import_jsx_runtime$6 = require_jsx_runtime();
	ImaAuthGate = ({ children, loadingFallback = null, disableAuthEntry = false, onAuthed, authWrapperClassName = "", authSource }) => {
		const { authed, loading, refresh } = useImaAuth();
		/**
		* ImaLibraryAuthEntry 内部（轮询或事件）检测到授权成功后会调 onAuthed。
		* 此时本层的 useImaAuth 可能还没感知到变化（事件未到 / 没有自动 refresh），
		* 需要主动 refresh 一次来让 authed 变 true，从而切换到 children（IMA wiki 视图）。
		*/
		const handleAuthed = import_react$8.useCallback(() => {
			refresh().catch(() => {});
			onAuthed?.();
		}, [refresh, onAuthed]);
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(import_jsx_runtime$6.Fragment, { children: loadingFallback });
		if (!authed) {
			if (disableAuthEntry) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: authWrapperClassName,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ImaLibraryAuthEntry, {
					onAuthed: handleAuthed,
					authSource
				})
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(import_jsx_runtime$6.Fragment, { children });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-scroll-area.scss
var init_ima_scroll_area$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-scroll-area.tsx
function cx(...list) {
	return list.filter(Boolean).join(" ");
}
var import_react$7, import_jsx_runtime$5, ImaScrollArea;
var init_ima_scroll_area = __esmMin((() => {
	init_ima_scroll_area$1();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$5 = require_jsx_runtime();
	ImaScrollArea = import_react$7.forwardRef(({ direction = "vertical", size, className, style, children, ...rest }, ref) => {
		const mergedStyle = size !== void 0 ? {
			["--ima-scroll-size"]: `${size}px`,
			...style
		} : style ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			ref,
			...rest,
			className: cx("ima-scroll-area", direction === "vertical" && "ima-scroll-area--vertical", direction === "horizontal" && "ima-scroll-area--horizontal", direction === "both" && "ima-scroll-area--both", className),
			style: mergedStyle,
			children
		});
	});
	ImaScrollArea.displayName = "ImaScrollArea";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-dir-selector.tsx
/**
* 把 imaKbList 响应平铺为带 `type` 的扁平列表。
* 兼容两种结构：
*   - 新结构：`{ groups: [{ type, items: [{ id, name, ... }] }] }`
*   - 旧结构：`{ items: [...] }` / 数组（无类型 → 全部归"个人"）
*/
function flattenWithType(res) {
	if (!res) return [];
	if (typeof res === "object" && Array.isArray(res.groups)) {
		const groups = res.groups;
		const out = [];
		for (const g of groups) {
			if (!g || typeof g !== "object") continue;
			const groupObj = g;
			const items = Array.isArray(groupObj.items) ? groupObj.items : [];
			for (const it of items) {
				const kb = toKbItem(it, groupObj.type);
				if (kb) out.push(kb);
			}
		}
		return out;
	}
	return (Array.isArray(res) ? res : res && typeof res === "object" && Array.isArray(res.items) ? res.items : []).map((it) => toKbItem(it, 1001)).filter((x) => x !== null);
}
function toKbItem(raw, fallbackType) {
	if (!raw || typeof raw !== "object") return null;
	const r = raw;
	const id = typeof r.id === "string" ? r.id : typeof r.kbId === "string" ? r.kbId : "";
	if (!id) return null;
	const name = typeof r.name === "string" ? r.name : "";
	const description = typeof r.description === "string" ? r.description : void 0;
	const type = (typeof r.type === "number" ? r.type : void 0) ?? fallbackType;
	const coverUrl = typeof r.coverUrl === "string" && r.coverUrl ? r.coverUrl : typeof r.cover_url === "string" && r.cover_url ? r.cover_url : void 0;
	const permissions = r.permissions && typeof r.permissions === "object" ? r.permissions : void 0;
	const canAddKnowledge = permissions && typeof permissions.canAddKnowledge === "boolean" ? permissions.canAddKnowledge : permissions && typeof permissions.can_add_knowledge === "boolean" ? permissions.can_add_knowledge : true;
	return {
		id,
		name: name || "(unnamed)",
		description,
		type,
		coverUrl,
		canAddKnowledge
	};
}
var import_react$6, import_jsx_runtime$4, CATEGORY_DEFS, CATEGORY_LABELS, BookColorIcon, ImaDirSelector;
var init_ima_dir_selector = __esmMin((() => {
	init_ima_dir_selector$1();
	init_lucide_react();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_ima_api();
	init_use_ima_auth();
	init_ima_auth_gate();
	init_ima_dialog();
	init_ima_scroll_area();
	init_telemetry();
	init_use_tr();
	import_jsx_runtime$4 = require_jsx_runtime();
	CATEGORY_DEFS = [
		{
			key: "personal",
			types: [1001]
		},
		{
			key: "shared",
			types: [1002]
		},
		{
			key: "subscribed",
			types: [1004, 1005]
		}
	];
	CATEGORY_LABELS = {
		personal: {
			key: "ima.dirSelector.category.personal",
			fallback: "个人知识库"
		},
		shared: {
			key: "ima.dirSelector.category.shared",
			fallback: "共享知识库"
		},
		subscribed: {
			key: "ima.dirSelector.category.subscribed",
			fallback: "订阅知识库"
		}
	};
	BookColorIcon = ({ size = 24, coverUrl }) => {
		if (coverUrl) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
			src: coverUrl,
			width: size,
			height: size,
			className: "ima-dir-selector__kb-icon-img",
			alt: "",
			"aria-hidden": "true",
			draggable: false
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
			width: size,
			height: size,
			viewBox: "0 0 20 20",
			fill: "none",
			className: "ima-dir-selector__kb-icon-svg",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
					x: "3",
					y: "2",
					width: "11",
					height: "14",
					rx: "2",
					stroke: "currentColor",
					strokeWidth: "1.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
					d: "M7 6h5M7 9h3",
					stroke: "currentColor",
					strokeWidth: "1.3",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
					d: "M14 4c1.1 0 3 .6 3 2v11c0 1.4-1.9 2-3 2H6",
					stroke: "currentColor",
					strokeWidth: "1.3",
					strokeLinecap: "round"
				})
			]
		});
	};
	ImaDirSelector = ({ open, onClose, onSelected, title, className = "" }) => {
		const tr = useTr();
		const ima = useImaApi();
		const adapter = useAdapter();
		const { authed } = useImaAuth();
		const [allKbs, setAllKbs] = import_react$6.useState([]);
		const [kbsLoading, setKbsLoading] = import_react$6.useState(false);
		import_react$6.useEffect(() => {
			if (open && authed && !kbsLoading && allKbs.length > 0) reportSaveToImaPopShow(adapter);
		}, [
			open,
			authed,
			kbsLoading,
			allKbs.length,
			adapter
		]);
		/** 当前选中的知识库 id */
		const [selectedKbId, setSelectedKbId] = import_react$6.useState(null);
		import_react$6.useEffect(() => {
			if (!open || !authed) return;
			let cancelled = false;
			setAllKbs([]);
			setKbsLoading(true);
			ima.imaKbList({}).then((res) => {
				if (cancelled) return;
				setAllKbs(flattenWithType(res));
			}).catch((err) => {
				if (cancelled) return;
				console.warn("[IMA] imaKbList failed (ignored):", err);
			}).finally(() => {
				if (!cancelled) setKbsLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [
			open,
			ima,
			authed
		]);
		import_react$6.useEffect(() => {
			if (!open) {
				setSelectedKbId(null);
				setAllKbs([]);
				setKbsLoading(false);
			}
		}, [open]);
		/**
		* 按分组预先聚合：每个分组生成 `{ key, label, kbs }`，渲染层只需按顺序铺开。
		* 空分组直接跳过（不显示组标题），避免出现"个人知识库\n(空)"这样的空洞。
		*/
		const grouped = import_react$6.useMemo(() => CATEGORY_DEFS.map((def) => ({
			key: def.key,
			kbs: allKbs.filter((kb) => kb.type !== void 0 && def.types.includes(kb.type))
		})).filter((g) => g.kbs.length > 0), [allKbs]);
		const selectedKb = import_react$6.useMemo(() => allKbs.find((k) => k.id === selectedKbId), [allKbs, selectedKbId]);
		const selectedKbDisabled = selectedKb ? selectedKb.canAddKnowledge === false : false;
		const handleConfirm = import_react$6.useCallback(() => {
			if (!selectedKbId || selectedKbDisabled) return;
			const kb = selectedKb;
			onSelected({
				kbId: selectedKbId,
				kbName: kb?.name,
				folderId: void 0,
				folderName: void 0,
				displayPath: kb?.name
			});
			onClose();
		}, [
			selectedKbId,
			selectedKbDisabled,
			selectedKb,
			onSelected,
			onClose
		]);
		const categoryLabel = (key) => {
			const { key: i18nKey, fallback } = CATEGORY_LABELS[key];
			return tr(i18nKey, fallback);
		};
		/**
		* 主标题："保存到 ima 知识库"（ima 作为固定品牌名不翻译）
		*/
		const defaultTitle = /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
			tr("ima.dirSelector.titlePrefix", "保存到 "),
			"ima",
			tr("ima.dirSelector.titleSuffix", " 知识库")
		] });
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(ImaDialog, {
			open,
			onClose,
			overlayClassName: className,
			dialogClassName: "ima-dir-selector__dialog",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "ima-dir-selector__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "ima-dir-selector__title",
					children: title ?? defaultTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
					type: "button",
					className: "ima-dir-selector__close",
					onClick: onClose,
					"aria-label": tr("common.close", "关闭"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(X, { size: 18 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(ImaAuthGate, {
				authWrapperClassName: "ima-dir-selector__auth-body",
				authSource: "file_upload",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "ima-dir-selector__body",
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(ImaScrollArea, {
						className: "ima-dir-selector__kb-scroll",
						children: [
							kbsLoading && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "ima-dir-selector__placeholder",
								children: tr("ima.fileSelector.loading", "加载中…")
							}),
							!kbsLoading && grouped.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "ima-dir-selector__placeholder",
								children: tr("ima.dirSelector.noKbs", "暂无可用的知识库")
							}),
							grouped.map((group) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "ima-dir-selector__group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
									className: "ima-dir-selector__group-title",
									children: categoryLabel(group.key)
								}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("ul", {
									className: "ima-dir-selector__kb-list",
									children: group.kbs.map((kb) => {
										const selected = kb.id === selectedKbId;
										const disabled = kb.canAddKnowledge === false;
										return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("li", {
											className: [
												"ima-dir-selector__kb-item",
												selected && "ima-dir-selector__kb-item--selected",
												disabled && "ima-dir-selector__kb-item--disabled"
											].filter(Boolean).join(" "),
											title: disabled ? tr("ima.dirSelector.noEditPermission", "暂无修改权限") : void 0,
											onClick: () => !disabled && setSelectedKbId(kb.id),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
													className: "ima-dir-selector__kb-radio",
													"aria-hidden": true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
													className: "ima-dir-selector__kb-icon",
													"aria-hidden": true,
													children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(BookColorIcon, {
														size: 24,
														coverUrl: kb.coverUrl
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
													className: "ima-dir-selector__kb-name",
													children: kb.name
												})
											]
										}, kb.id);
									})
								})]
							}, group.key))
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "ima-dir-selector__footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
						type: "button",
						className: "ima-dir-selector__btn ima-dir-selector__btn--ghost",
						onClick: onClose,
						children: tr("common.cancel", "取消")
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
						type: "button",
						className: "ima-dir-selector__btn ima-dir-selector__btn--primary",
						disabled: !selectedKbId || selectedKbDisabled,
						onClick: handleConfirm,
						children: tr("ima.dirSelector.confirmV2", "确定")
					})]
				})]
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-file-preview.scss
var init_ima_file_preview$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/constant.ts
var MediaType, SUPPORTED_FILE_FORMATS, BINARY_LOADING_EXTRA_MS;
var init_constant = __esmMin((() => {
	MediaType = /* @__PURE__ */ function(MediaType) {
		/** 未知 */
		MediaType[MediaType["Unknown"] = 0] = "Unknown";
		/** PDF */
		MediaType[MediaType["PDF"] = 1] = "PDF";
		/** 网页 */
		MediaType[MediaType["Web"] = 2] = "Web";
		/** Word */
		MediaType[MediaType["Word"] = 3] = "Word";
		/** PPT */
		MediaType[MediaType["PPT"] = 4] = "PPT";
		/** Excel */
		MediaType[MediaType["Excel"] = 5] = "Excel";
		/** 微信公众号文章 */
		MediaType[MediaType["WeChatArticle"] = 6] = "WeChatArticle";
		/** MarkDown */
		MediaType[MediaType["MarkDown"] = 7] = "MarkDown";
		/** 图片 */
		MediaType[MediaType["Image"] = 9] = "Image";
		/** 小笔记 */
		MediaType[MediaType["Note"] = 11] = "Note";
		/** AI 会话 */
		MediaType[MediaType["AISession"] = 12] = "AISession";
		/** txt */
		MediaType[MediaType["TXT"] = 13] = "TXT";
		/** 思维导图（Xmind） */
		MediaType[MediaType["Xmind"] = 14] = "Xmind";
		/** 录音 */
		MediaType[MediaType["SoundRecording"] = 15] = "SoundRecording";
		/** 视频 */
		MediaType[MediaType["WebVideo"] = 16] = "WebVideo";
		/** 播客 */
		MediaType[MediaType["Podcast"] = 19] = "Podcast";
		/** 文件夹 */
		MediaType[MediaType["Folder"] = 99] = "Folder";
		return MediaType;
	}({});
	SUPPORTED_FILE_FORMATS = { formats: {
		[MediaType.PDF]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.Word]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.Excel]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.PPT]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.Image]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.TXT]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.MarkDown]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.Web]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.WeChatArticle]: {
			supportChat: true,
			supportPreview: true
		},
		[MediaType.Note]: {
			supportChat: true,
			supportPreview: false
		},
		[MediaType.Xmind]: {
			supportChat: true,
			supportPreview: false
		},
		[MediaType.SoundRecording]: {
			supportChat: true,
			supportPreview: false
		},
		[MediaType.WebVideo]: {
			supportChat: true,
			supportPreview: false
		},
		[MediaType.Podcast]: {
			supportChat: true,
			supportPreview: false
		},
		[MediaType.AISession]: {
			supportChat: true,
			supportPreview: false
		}
	} };
	BINARY_LOADING_EXTRA_MS = 1500;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-file-preview.helpers.ts
function putWithFifoEviction(cache, key, value) {
	if (cache.has(key)) cache.delete(key);
	cache.set(key, value);
	if (cache.size > MAX_PREVIEW_CACHE_SIZE) {
		const oldestKey = cache.keys().next().value;
		if (oldestKey) cache.delete(oldestKey);
	}
}
/**
* 读取二进制预览文件缓存（按 fileId）。
* 仅做会话内临时缓存，刷新页面后失效。
*/
function getCachedBinaryPreviewFile(fileId) {
	if (!fileId) return;
	return binaryFileCacheByFileId.get(fileId);
}
/** 写入二进制预览文件缓存（按 fileId）。 */
function setCachedBinaryPreviewFile(fileId, file) {
	if (!fileId) return;
	putWithFifoEviction(binaryFileCacheByFileId, fileId, file);
}
/**
* 判断 BinaryKind 是否属于腾讯文档 SDK 可预览的类型。
* image 不在 SDK 支持范围内（SDK 只处理 Office + PDF）。
*/
function isSdkSupportedKind(kind) {
	return kind !== "image";
}
/**
* 从文件名中提取扩展名并判断是否被腾讯文档 SDK 支持。
*/
function isSdkSupportedFilename(filename) {
	if (!filename) return false;
	const dotIndex = filename.lastIndexOf(".");
	if (dotIndex === -1) return false;
	const ext = filename.slice(dotIndex + 1).toLowerCase();
	return SDK_SUPPORTED_EXTENSIONS.has(ext);
}
/** 按 MediaType 决定预览策略；未知类型走 iframe 兜底 */
function resolvePreviewKind(mediaType) {
	switch (mediaType) {
		case MediaType.MarkDown:
		case MediaType.Note: return "markdown";
		case MediaType.TXT: return "text";
		case MediaType.PDF: return "pdf";
		case MediaType.Word: return "docx";
		case MediaType.PPT: return "pptx";
		case MediaType.Excel: return "sheet";
		case MediaType.Image: return "image";
		default: return "iframe";
	}
}
/** mediaType 缺失时，按文件名扩展名兜底推断预览策略 */
function resolvePreviewKindWithFilename(mediaType, filename) {
	const byMediaType = resolvePreviewKind(mediaType);
	if (byMediaType !== "iframe") return byMediaType;
	if (!filename) return "iframe";
	const dotIndex = filename.lastIndexOf(".");
	if (dotIndex < 0 || dotIndex === filename.length - 1) return "iframe";
	const ext = filename.slice(dotIndex + 1).toLowerCase();
	if (["md", "markdown"].includes(ext)) return "markdown";
	if (["txt", "log"].includes(ext)) return "text";
	if (ext === "pdf") return "pdf";
	if ([
		"doc",
		"docx",
		"wps",
		"wpt",
		"dot",
		"dotx",
		"docm",
		"dotm"
	].includes(ext)) return "docx";
	if ([
		"ppt",
		"pptx",
		"pps",
		"ppsx",
		"pot",
		"potx",
		"pptm",
		"ppsm",
		"potm"
	].includes(ext)) return "pptx";
	if ([
		"xls",
		"xlsx",
		"xlt",
		"xltx",
		"xlsm",
		"xltm",
		"csv"
	].includes(ext)) return "sheet";
	if ([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp",
		"svg"
	].includes(ext)) return "image";
	return "iframe";
}
/** 二进制预览时的默认文件名后缀（用于构造 File 对象时的 name 字段）。 */
function defaultFilenameByKind(kind) {
	switch (kind) {
		case "pdf": return "document.pdf";
		case "docx": return "document.docx";
		case "pptx": return "presentation.pptx";
		case "sheet": return "spreadsheet.xlsx";
		case "image": return "image.png";
	}
}
/** MediaType → MIME 兜底（用于 File 构造时的 type 字段）。 */
function mimeFromMediaType(mediaType) {
	switch (mediaType) {
		case MediaType.PDF: return "application/pdf";
		case MediaType.Word: return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		case MediaType.PPT: return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
		case MediaType.Excel: return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		case MediaType.Image: return "image/*";
		default: return "application/octet-stream";
	}
}
/** base64 → Uint8Array。优先用浏览器 atob，Node 环境走 Buffer 兜底。 */
function base64ToUint8Array(base64) {
	if (typeof atob === "function") {
		const binary = atob(base64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
		return bytes;
	}
	return new Uint8Array(Buffer.from(base64, "base64"));
}
/**
* 拉取二进制为 File：
*   ① 渲染端 fetch（CORS 允许时最快）
*   ② 失败则回退到主进程 imaFilesBlob（net.fetch → base64）
*/
async function fetchAsFile(url, filename, mimeHint, fallback) {
	try {
		const resp = await fetch(url);
		if (resp.ok) {
			const blob = await resp.blob();
			return new File([blob], filename, { type: blob.type || mimeHint });
		}
	} catch {}
	const { base64, mimeType } = await fallback(url);
	const bytes = base64ToUint8Array(base64);
	const normalizedBytes = new Uint8Array(bytes);
	const blob = new Blob([normalizedBytes], { type: mimeType || mimeHint });
	return new File([blob], filename, { type: mimeType || mimeHint });
}
var MAX_PREVIEW_CACHE_SIZE, binaryFileCacheByFileId, SDK_SUPPORTED_EXTENSIONS;
var init_ima_file_preview_helpers = __esmMin((() => {
	init_dist();
	init_constant();
	MAX_PREVIEW_CACHE_SIZE = 30;
	binaryFileCacheByFileId = /* @__PURE__ */ new Map();
	SDK_SUPPORTED_EXTENSIONS = new Set([
		"doc",
		"dot",
		"wps",
		"wpt",
		"docx",
		"dotx",
		"docm",
		"dotm",
		"xls",
		"xlt",
		"xlsx",
		"xltx",
		"xlsm",
		"xltm",
		"csv",
		"ppt",
		"pps",
		"pot",
		"pptx",
		"pptm",
		"ppsx",
		"ppsm",
		"potx",
		"potm",
		"pdf"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-webview.tsx
/**
* 检查 URL 协议是否允许导航（白名单）
*/
function isNavigationAllowed(url) {
	try {
		const parsed = new URL(url);
		return [
			"http:",
			"https:",
			"file:"
		].includes(parsed.protocol);
	} catch {
		return false;
	}
}
var import_react$5, import_jsx_runtime$3, ImaWebview;
var init_ima_webview = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$3 = require_jsx_runtime();
	ImaWebview = ({ src, className, onReady, onFail }) => {
		const webviewRef = import_react$5.useRef(null);
		const onReadyRef = import_react$5.useRef(onReady);
		const onFailRef = import_react$5.useRef(onFail);
		onReadyRef.current = onReady;
		onFailRef.current = onFail;
		import_react$5.useEffect(() => {
			const webview = webviewRef.current;
			if (!webview) return;
			const handleDomReady = () => {
				onReadyRef.current?.();
			};
			const handleDidFailLoad = (event) => {
				if (event.errorCode === -3) return;
				onFailRef.current?.(event.errorDescription ?? `Error code: ${event.errorCode}`);
			};
			const handleWillNavigate = (event) => {
				const url = event.url;
				if (url && !isNavigationAllowed(url)) {
					event.preventDefault();
					console.warn("[ImaWebview] Blocked navigation to disallowed URL:", url);
				}
			};
			webview.addEventListener("dom-ready", handleDomReady);
			webview.addEventListener("did-fail-load", handleDidFailLoad);
			webview.addEventListener("will-navigate", handleWillNavigate);
			return () => {
				webview.removeEventListener("dom-ready", handleDomReady);
				webview.removeEventListener("did-fail-load", handleDidFailLoad);
				webview.removeEventListener("will-navigate", handleWillNavigate);
				try {
					const wv = webview;
					wv.stop?.();
					wv.src = "about:blank";
				} catch {}
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("webview", {
			ref: webviewRef,
			className,
			src,
			webpreferences: "contextIsolation=yes,disableDialogs=true,sandbox=yes",
			partition: "ima-file-preview",
			nodeintegration: false
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-file-preview.tsx
function inferPreviewMediaType(file) {
	if (!file) return;
	if (file.mediaType != null && file.mediaType !== 0) return file.mediaType;
	switch (resolvePreviewKindWithFilename(file.mediaType, file.filename)) {
		case "markdown": return MediaType.MarkDown;
		case "text": return MediaType.TXT;
		case "pdf": return MediaType.PDF;
		case "docx": return MediaType.Word;
		case "pptx": return MediaType.PPT;
		case "sheet": return MediaType.Excel;
		case "image": return MediaType.Image;
		default: return MediaType.Unknown;
	}
}
function getMaxDragWidth() {
	const panel = document.querySelector(".ima-panel");
	if (panel) return panel.getBoundingClientRect().width;
	return window.innerWidth * .96;
}
var import_react$4, import_react_dom, import_jsx_runtime$2, BINARY_COMPONENTS, DEFAULT_WIDTH_PERCENT, MIN_WIDTH_PX, FULLSCREEN_TOP_OFFSET_PX, ImaFilePreview;
var init_ima_file_preview = __esmMin((() => {
	init_markdown_preview();
	init_ima_file_preview$1();
	init_lucide_react();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_use_ima_api();
	init_markdown_utils();
	init_constant();
	init_ima_file_preview_helpers();
	init_ima_file_selector();
	init_ima_scroll_area();
	init_ima_webview();
	init_use_tr();
	import_jsx_runtime$2 = require_jsx_runtime();
	init_preload_helper();
	BINARY_COMPONENTS = {
		pdf: import_react$4.lazy(() => __vitePreload(() => import("./pdf-preview-component-vNcBGK9Y.js").then((m) => ({ default: m.PDFPreviewComponent })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]), import.meta.url)),
		docx: import_react$4.lazy(() => __vitePreload(() => import("./docx-preview-component-CjwFTC73.js").then((m) => ({ default: m.DocxPreviewComponent })), __vite__mapDeps([41,1,11,42,34,26,25,6,35,38,39,43]), import.meta.url)),
		pptx: import_react$4.lazy(() => __vitePreload(() => import("./pptx-preview-component-Dj5gWOZp.js").then((m) => ({ default: m.PptxPreviewComponent })), __vite__mapDeps([44,1,11,42,34,26,45,25,6,46,35,47]), import.meta.url)),
		sheet: import_react$4.lazy(() => __vitePreload(() => import("./sheet-preview-component-DtiPBU6h.js").then((m) => ({ default: m.SheetPreviewComponent })), __vite__mapDeps([48,1,2,11,49,42,34,26,45,25,6,35,50]), import.meta.url)),
		image: import_react$4.lazy(() => __vitePreload(() => import("./image-preview-component-DneEaIXD.js").then((m) => ({ default: m.ImagePreviewComponent })), __vite__mapDeps([51,52,1,3,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,39,53]), import.meta.url))
	};
	DEFAULT_WIDTH_PERCENT = 62;
	MIN_WIDTH_PX = 560;
	FULLSCREEN_TOP_OFFSET_PX = 28;
	ImaFilePreview = ({ open, onClose, file, className = "" }) => {
		const tr = useTr();
		const ima = useImaApi();
		const [state, setState] = import_react$4.useState({ status: "idle" });
		/**
		* iframe 的"资源加载完成"状态（独立于 state 的数据获取阶段）。
		*/
		const [iframeReady, setIframeReady] = import_react$4.useState(false);
		/**
		* Markdown 的"DOM 挂载完成"状态
		*/
		const [markdownReady, setMarkdownReady] = import_react$4.useState(false);
		/** 办公文件宿主 overlay 可见态：与子组件挂载并发，到期关闭，总时长 = max(延迟, 解析耗时) */
		const [binaryOverlayVisible, setBinaryOverlayVisible] = import_react$4.useState(false);
		/** 关闭动画阶段：true 时播放滑出动画，animationend 后真正卸载 */
		const [closing, setClosing] = import_react$4.useState(false);
		/** 实际挂载状态（open → mounted；动画结束 → unmounted） */
		const [mounted, setMounted] = import_react$4.useState(false);
		/** 面板宽度模式：false=常规，true=放大 */
		const [expanded, setExpanded] = import_react$4.useState(false);
		/** 手动拖拽后的面板宽度（px），null 表示走默认宽度 */
		const [panelWidth, setPanelWidth] = import_react$4.useState(null);
		const [isDragging, setIsDragging] = import_react$4.useState(false);
		const panelRef = import_react$4.useRef(null);
		const isDraggingRef = import_react$4.useRef(false);
		const dragStartXRef = import_react$4.useRef(0);
		const dragStartWidthRef = import_react$4.useRef(0);
		import_react$4.useEffect(() => {
			if (open) {
				setMounted(true);
				setClosing(false);
				setExpanded(false);
				setPanelWidth(null);
			} else if (mounted) setClosing(true);
		}, [open]);
		const handleAnimationEnd = import_react$4.useCallback(() => {
			if (closing) {
				setMounted(false);
				setClosing(false);
			}
		}, [closing]);
		const handleClose = import_react$4.useCallback(() => {
			setClosing(true);
			setTimeout(() => onClose(), 260);
		}, [onClose]);
		import_react$4.useEffect(() => {
			if (!mounted || closing) return;
			const onKey = (e) => {
				if (e.key === "Escape") handleClose();
			};
			window.addEventListener("keydown", onKey);
			return () => window.removeEventListener("keydown", onKey);
		}, [
			mounted,
			closing,
			handleClose
		]);
		import_react$4.useEffect(() => {
			if (!mounted) {
				setState({ status: "idle" });
				setIframeReady(false);
				setMarkdownReady(false);
				setBinaryOverlayVisible(false);
				setPanelWidth(null);
				setIsDragging(false);
				isDraggingRef.current = false;
			}
		}, [mounted]);
		import_react$4.useEffect(() => {
			if (!mounted || !file) {
				setState({ status: "idle" });
				setIframeReady(false);
				setMarkdownReady(false);
				setBinaryOverlayVisible(false);
				return;
			}
			let cancelled = false;
			setState({ status: "loading" });
			setIframeReady(false);
			setMarkdownReady(false);
			setBinaryOverlayVisible(false);
			const url = file.viewUrl;
			const kind = resolvePreviewKindWithFilename(file.mediaType, file.filename);
			if (file.mediaType === void 0) console.log("[ImaFilePreview] mediaType missing, fallback kind by filename:", {
				filename: file.filename,
				kind
			});
			(async () => {
				try {
					if (!url) {
						setState({
							status: "error",
							message: tr("ima.preview.noUrl", "此文件暂不支持预览")
						});
						return;
					}
					switch (kind) {
						case "markdown": {
							const res = await ima.imaFilesContent({ url });
							if (cancelled) return;
							setState({
								status: "markdown",
								html: renderMarkdown(res?.content ?? "")
							});
							return;
						}
						case "text": {
							const res = await ima.imaFilesContent({ url });
							if (cancelled) return;
							setState({
								status: "text",
								text: res?.content ?? ""
							});
							return;
						}
						case "pdf":
						case "docx":
						case "pptx":
						case "sheet":
						case "image": {
							const cachedBinaryFile = getCachedBinaryPreviewFile(file.fileId);
							if (cachedBinaryFile) {
								console.log("[ImaFilePreview] cache hit binary file by fileId:", {
									fileId: file.fileId,
									kind,
									filename: cachedBinaryFile.name
								});
								if (kind !== "pdf" && kind !== "image") setBinaryOverlayVisible(true);
								setState({
									status: "binary",
									kind,
									file: cachedBinaryFile
								});
								return;
							}
							console.log("[ImaFilePreview] cache miss, start download:", {
								fileId: file.fileId,
								kind,
								filename: file.filename
							});
							if (isSdkSupportedKind(kind) && isSdkSupportedFilename(file.filename) && ima.imaFilesSdkPreview) try {
								const sdkResult = await ima.imaFilesSdkPreview({
									url,
									filename: file.filename
								});
								if (cancelled) return;
								if (sdkResult.success && sdkResult.url) {
									setState({
										status: "sdk-iframe",
										url: sdkResult.url
									});
									return;
								}
							} catch {
								if (cancelled) return;
							}
							const binaryFile = await fetchAsFile(url, file.filename || defaultFilenameByKind(kind), mimeFromMediaType(file.mediaType), (u) => ima.imaFilesBlob({ url: u }));
							if (cancelled) return;
							setCachedBinaryPreviewFile(file.fileId, binaryFile);
							console.log("[ImaFilePreview] binary file cached by fileId:", {
								fileId: file.fileId,
								kind,
								filename: binaryFile.name
							});
							if (kind !== "pdf" && kind !== "image") setBinaryOverlayVisible(true);
							setState({
								status: "binary",
								kind,
								file: binaryFile
							});
							return;
						}
						default:
							setState({
								status: "iframe",
								url
							});
							return;
					}
				} catch (err) {
					if (cancelled) return;
					setState({
						status: "error",
						message: err instanceof Error ? err.message : String(err)
					});
				}
			})();
			return () => {
				cancelled = true;
			};
		}, [
			mounted,
			file,
			ima,
			tr
		]);
		import_react$4.useEffect(() => {
			if (state.status !== "markdown") return;
			let raf1 = 0;
			let raf2 = 0;
			raf1 = requestAnimationFrame(() => {
				raf2 = requestAnimationFrame(() => setMarkdownReady(true));
			});
			return () => {
				cancelAnimationFrame(raf1);
				cancelAnimationFrame(raf2);
			};
		}, [state.status]);
		import_react$4.useEffect(() => {
			if (state.status !== "iframe" && state.status !== "sdk-iframe" || iframeReady) return;
			const timer = setTimeout(() => setIframeReady(true), 15e3);
			return () => clearTimeout(timer);
		}, [state.status, iframeReady]);
		import_react$4.useEffect(() => {
			if (state.status !== "binary" || !binaryOverlayVisible) return;
			const timer = setTimeout(() => setBinaryOverlayVisible(false), BINARY_LOADING_EXTRA_MS);
			return () => clearTimeout(timer);
		}, [state.status, binaryOverlayVisible]);
		/**
		* 统一的 loading 指示器：spinner + 文案。
		*/
		const handleResizeStart = import_react$4.useCallback((e) => {
			if (expanded) return;
			e.preventDefault();
			e.stopPropagation();
			isDraggingRef.current = true;
			setIsDragging(true);
			dragStartXRef.current = e.clientX;
			dragStartWidthRef.current = panelRef.current ? panelRef.current.getBoundingClientRect().width : panelWidth ?? window.innerWidth * DEFAULT_WIDTH_PERCENT / 100;
			document.body.style.cursor = "col-resize";
			document.body.style.userSelect = "none";
			console.info("[ImaFilePreview] resize drag start", {
				startWidth: dragStartWidthRef.current,
				filename: file?.filename
			});
		}, [
			expanded,
			file?.filename,
			panelWidth
		]);
		import_react$4.useEffect(() => {
			const handleMouseMove = (e) => {
				if (!isDraggingRef.current || expanded) return;
				const delta = dragStartXRef.current - e.clientX;
				const maxWidth = getMaxDragWidth();
				setPanelWidth(Math.max(MIN_WIDTH_PX, Math.min(maxWidth, dragStartWidthRef.current + delta)));
			};
			const handleMouseUp = () => {
				if (!isDraggingRef.current) return;
				isDraggingRef.current = false;
				setIsDragging(false);
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
			};
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
			};
		}, [expanded]);
		const toggleExpanded = import_react$4.useCallback(() => {
			setExpanded((prev) => {
				const next = !prev;
				if (next) setPanelWidth(null);
				console.info("[ImaFilePreview] toggle panel size mode", {
					expanded: next,
					panelWidth,
					filename: file?.filename
				});
				return next;
			});
		}, [file?.filename, panelWidth]);
		const renderLoading = (message) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "ima-file-preview__loading",
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "ima-file-preview__spinner",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "ima-file-preview__loading-text",
				children: message ?? tr("ima.fileSelector.loading", "加载中…")
			})]
		});
		const previewIcon = getImaMediaTypeIcon(inferPreviewMediaType(file));
		if (!mounted) return null;
		const panelStyle = expanded ? {
			width: "100vw",
			maxWidth: "100vw",
			top: FULLSCREEN_TOP_OFFSET_PX,
			right: 0,
			height: `calc(100vh - ${FULLSCREEN_TOP_OFFSET_PX}px)`
		} : panelWidth != null ? { width: panelWidth } : {};
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: `ima-file-preview ${className}${isDragging ? " ima-file-preview--dragging" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: `ima-file-preview__backdrop${closing ? " ima-file-preview__backdrop--closing" : ""}`,
				onClick: handleClose
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				ref: panelRef,
				className: `ima-file-preview__panel${expanded ? " ima-file-preview__panel--expanded" : ""}${closing ? " ima-file-preview__panel--closing" : ""}`,
				style: panelStyle,
				onAnimationEnd: handleAnimationEnd,
				onClick: (e) => e.stopPropagation(),
				children: [
					!expanded && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "ima-file-preview__resize-handle",
						onMouseDown: handleResizeStart
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "ima-file-preview__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "ima-file-preview__header-main",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("img", {
								className: "ima-file-preview__header-icon",
								src: previewIcon,
								width: 16,
								height: 16,
								alt: "",
								"aria-hidden": true,
								draggable: false
							}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
								className: "ima-file-preview__header-title",
								children: file?.filename ?? tr("ima.preview.title", "预览")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "ima-file-preview__header-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								className: "ima-file-preview__header-action",
								onClick: toggleExpanded,
								"aria-label": expanded ? tr("common.restore", "还原") : tr("common.expand", "放大"),
								title: expanded ? tr("common.restore", "还原") : tr("common.expand", "放大"),
								children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Minimize2, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Maximize2, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								className: "ima-file-preview__header-close",
								onClick: handleClose,
								"aria-label": tr("common.close", "关闭"),
								title: tr("common.close", "关闭"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(X, { size: 16 })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "ima-file-preview__body",
						children: [
							state.status === "loading" && renderLoading(),
							state.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
								className: "ima-file-selector__placeholder ima-file-selector__placeholder--error",
								children: state.message
							}),
							state.status === "markdown" && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "ima-file-preview__stage",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ImaScrollArea, {
									className: "ima-file-preview__markdown-scroll",
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
										className: "markdown-preview",
										children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
											className: "markdown-preview__body",
											dangerouslySetInnerHTML: { __html: state.html }
										})
									})
								}), !markdownReady && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "ima-file-preview__overlay",
									children: renderLoading()
								})]
							}),
							state.status === "text" && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
								className: "ima-file-preview__stage ima-file-preview__stage--text",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ImaScrollArea, {
									direction: "both",
									className: "ima-file-preview__text-scroll",
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("pre", {
										className: "ima-file-preview__text",
										children: state.text
									})
								})
							}),
							state.status === "binary" && (() => {
								const BinaryComponent = BINARY_COMPONENTS[state.kind];
								return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
									className: `ima-file-preview__stage ima-file-preview__stage--${state.kind}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_react$4.Suspense, {
										fallback: renderLoading(),
										children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(BinaryComponent, {
											className: "ima-file-preview__binary",
											file: state.file,
											filename: file?.filename
										})
									}), binaryOverlayVisible && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
										className: "ima-file-preview__overlay",
										children: renderLoading()
									})]
								});
							})(),
							state.status === "sdk-iframe" && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "ima-file-preview__stage",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("iframe", {
									className: "ima-file-preview__sdk-iframe",
									src: state.url,
									style: {
										width: "100%",
										height: "100%",
										border: "none"
									},
									title: file?.filename ?? "Document Preview",
									onLoad: () => setIframeReady(true)
								}), !iframeReady && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "ima-file-preview__overlay",
									children: renderLoading()
								})]
							}),
							state.status === "iframe" && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "ima-file-preview__stage",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ImaWebview, {
									className: "ima-file-preview__webview",
									src: state.url,
									onReady: () => setIframeReady(true),
									onFail: (desc) => {
										console.error("[ImaFilePreview] webview did-fail-load:", desc);
									}
								}), !iframeReady && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "ima-file-preview__overlay",
									children: renderLoading()
								})]
							})
						]
					})
				]
			})]
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-library-view.scss
var init_ima_library_view$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-host-bridge.ts
/**
* 在包含 ima iframe 的父组件中挂载：
* ```tsx
* const sender = useImaHostBridge({
*   handlers: {
*     onImaReady: () => sender.sendHostReady({ ... }),
*     onJsApiRequest: async (method, params) => {
*       switch (method) {
*         case 'getToken': return await fetchTemporaryToken();
*         case 'openBrowser': { await openExternal(params.url); return {}; }
*         case 'openMedia': { openPreview(params); return {}; }
*         // ...
*       }
*     },
*   }
* });
* ```
*/
function useImaHostBridge({ handlers, allowedOrigins, enabled = true, iframeRef }) {
	const handlersRef = (0, import_react$3.useRef)(handlers);
	handlersRef.current = handlers;
	const iframeRefStable = (0, import_react$3.useRef)(iframeRef);
	iframeRefStable.current = iframeRef;
	const bridgeRef = (0, import_react$3.useRef)(null);
	if (!bridgeRef.current) bridgeRef.current = new ImaHostBridge({
		allowedOrigins,
		handlers: {
			onImaReady: (msg) => handlersRef.current.onImaReady?.(msg),
			onJsApiRequest: (method, params, context) => {
				if (!handlersRef.current.onJsApiRequest) return Promise.reject(/* @__PURE__ */ new Error(`JSAPI method '${method}' is not implemented by the host`));
				return handlersRef.current.onJsApiRequest(method, params, context);
			}
		}
	});
	const bridge = bridgeRef.current;
	(0, import_react$3.useEffect)(() => {
		if (allowedOrigins) bridge.setAllowedOrigins(allowedOrigins);
	}, [allowedOrigins, bridge]);
	(0, import_react$3.useEffect)(() => {
		if (!enabled) {
			bridge.detach();
			return;
		}
		bridge.attach();
		return () => {
			bridge.detach();
		};
	}, [enabled, bridge]);
	(0, import_react$3.useEffect)(() => {
		const syncTarget = () => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
		};
		syncTarget();
		let attempts = 0;
		const maxAttempts = 50;
		const timer = setInterval(() => {
			attempts++;
			syncTarget();
			if (bridge.getLastOrigin() !== "*" || attempts >= maxAttempts) clearInterval(timer);
		}, 100);
		return () => {
			clearInterval(timer);
		};
	}, [bridge]);
	return (0, import_react$3.useMemo)(() => ({
		sendHostReady: (payload) => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
			bridge.sender.sendHostReady(payload);
		},
		sendThemeChanged: (theme) => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
			bridge.sender.sendThemeChanged(theme);
		},
		sendLocaleChanged: (locale) => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
			bridge.sender.sendLocaleChanged(locale);
		},
		sendAuthChanged: (authed, userId) => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
			bridge.sender.sendAuthChanged(authed, userId);
		},
		sendAuthRefreshRequest: (reason) => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
			bridge.sender.sendAuthRefreshRequest(reason);
		},
		sendVisibilityChanged: (visible) => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
			bridge.sender.sendVisibilityChanged(visible);
		},
		sendPreviewOpen: (payload) => {
			bridge.setTarget(iframeRefStable.current?.current?.contentWindow ?? null);
			bridge.sender.sendPreviewOpen(payload);
		}
	}), [bridge]);
}
var import_react$3;
var init_ima_host_bridge = __esmMin((() => {
	init_host();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-library-view.tsx
var import_react$2, import_jsx_runtime$1, IMA_LIBRARY_HOST_STAGING, IMA_LIBRARY_HOST_PROD, IMA_LIBRARY_PATH, ImaLibraryView;
var init_ima_library_view = __esmMin((() => {
	init_ima_library_view$1();
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_ima_api();
	init_use_ima_auth();
	init_use_ima_connector_item();
	init_connector();
	init_router();
	init_useTheme();
	init_MoreIcon();
	init_new_task_draft();
	init_workbuddy_topbar();
	init_constant();
	init_ima_file_preview();
	init_ima_file_selector();
	init_ima_host_bridge();
	init_ima_library_auth_entry();
	init_ima_response();
	init_telemetry();
	init_use_tr();
	import_jsx_runtime$1 = require_jsx_runtime();
	IMA_LIBRARY_HOST_STAGING = "ima-test.qq.com";
	IMA_LIBRARY_HOST_PROD = "ima.qq.com";
	IMA_LIBRARY_PATH = "/open-wikis";
	ImaLibraryView = ({ externalPreview = false, className = "", visible = true }) => {
		const tr = useTr();
		const ima = useImaApi();
		const adapter = useAdapter();
		const router = useRouterContext();
		const { pendingImaOpen, setPendingImaOpen } = useConversations();
		const accountUid = (0, import_react$2.useContext)(AccountContext)?.account?.uid;
		const { theme } = useTheme();
		const { authed, loading: authLoading, logout: imaLogout, refresh: authRefresh } = useImaAuth();
		const [hasBeenAuthed, setHasBeenAuthed] = import_react$2.useState(false);
		import_react$2.useEffect(() => {
			if (authed && !hasBeenAuthed) setHasBeenAuthed(true);
		}, [authed, hasBeenAuthed]);
		const [everVisible, setEverVisible] = import_react$2.useState(visible);
		import_react$2.useEffect(() => {
			if (visible && !everVisible) setEverVisible(true);
		}, [visible, everVisible]);
		const [url, setUrl] = import_react$2.useState(null);
		const [urlError, setUrlError] = import_react$2.useState(null);
		const [urlLoading, setUrlLoading] = import_react$2.useState(false);
		const [previewFile, setPreviewFile] = import_react$2.useState(null);
		const [showSettingsMenu, setShowSettingsMenu] = import_react$2.useState(false);
		const [showRevokeConfirm, setShowRevokeConfirm] = import_react$2.useState(false);
		const settingsMenuRef = import_react$2.useRef(null);
		const settingsBtnRef = import_react$2.useRef(null);
		import_react$2.useEffect(() => {
			if (!showSettingsMenu) return;
			const handleClickOutside = (event) => {
				if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target) && settingsBtnRef.current && !settingsBtnRef.current.contains(event.target)) setShowSettingsMenu(false);
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, [showSettingsMenu]);
		const handleRevoke = import_react$2.useCallback(async () => {
			setShowRevokeConfirm(false);
			setShowSettingsMenu(false);
			reportImaUnbindConfirm(adapter);
			setUrl(null);
			await imaLogout();
			if (adapter?.unbindConnector) try {
				await adapter.unbindConnector(IMA_MCP_CONNECTOR_ID);
			} catch (err) {
				console.warn("[IMA] unbindConnector after revoke failed:", err);
			}
		}, [imaLogout, adapter]);
		/** iframe ref，用于回传 JSAPI 响应 */
		const iframeRef = import_react$2.useRef(null);
		const [iframeLoaded, setIframeLoaded] = import_react$2.useState(false);
		import_react$2.useEffect(() => {
			setIframeLoaded(false);
		}, [url]);
		const loadUrl = import_react$2.useCallback(async () => {
			setUrlLoading(true);
			setUrlError(null);
			try {
				const host = await ima.isStagingEnv() ? IMA_LIBRARY_HOST_STAGING : IMA_LIBRARY_HOST_PROD;
				const kbFromUrl = new URLSearchParams(router.search).get("knowledgeBaseId");
				const nextUrl = new URL(`https://${host}${IMA_LIBRARY_PATH}`);
				if (kbFromUrl) nextUrl.searchParams.set("knowledgeBaseId", kbFromUrl);
				const finalUrl = nextUrl.toString();
				console.log("[IMA] load library url:", {
					host,
					knowledgeBaseId: kbFromUrl || void 0,
					finalUrl
				});
				setUrl(finalUrl);
			} catch (err) {
				setUrl(null);
				setUrlError(err instanceof Error ? err.message : String(err));
			} finally {
				setUrlLoading(false);
			}
		}, [ima, router.search]);
		import_react$2.useEffect(() => {
			if (!authed) return;
			loadUrl().catch(() => {});
		}, [
			authed,
			url,
			loadUrl
		]);
		/**
		* 允许的 postMessage origin 列表：直接从 iframe url 解析。
		* 不再依赖后端返回的 requiredOrigin —— URL 完全由前端按环境拼装，origin 可信。
		*/
		const allowedOrigins = import_react$2.useMemo(() => {
			if (!url) return;
			try {
				return [new URL(url).origin];
			} catch {
				return;
			}
		}, [url]);
		import_react$2.useEffect(() => {
			if (!pendingImaOpen || externalPreview) return;
			const openPendingFile = async () => {
				const fileId = pendingImaOpen.fileId;
				if (!fileId) {
					console.warn("[IMA] pendingImaOpen missing fileId, skip:", pendingImaOpen);
					setPendingImaOpen?.(null);
					return;
				}
				const kbId = new URLSearchParams(router.search).get("knowledgeBaseId") ?? "";
				let viewUrl = pendingImaOpen.viewUrl;
				if (!viewUrl) try {
					viewUrl = pickUrl(await ima.imaFilesViewUrl({ fileId })) ?? void 0;
				} catch (err) {
					console.warn("[IMA] resolve pendingImaOpen viewUrl failed:", err);
				}
				setPreviewFile({
					fileId,
					kbId,
					filename: pendingImaOpen.filename ?? fileId,
					mediaType: pendingImaOpen.mediaType,
					viewUrl
				});
				setPendingImaOpen?.(null);
			};
			openPendingFile().catch((err) => {
				console.error("[IMA] open pendingImaOpen failed:", err);
				setPendingImaOpen?.(null);
			});
		}, [
			externalPreview,
			ima,
			pendingImaOpen,
			router,
			setPendingImaOpen
		]);
		const ok = (payload) => ({
			code: 0,
			msg: "",
			...payload ?? {}
		});
		const handleGetToken = import_react$2.useCallback(async () => {
			return ok(await (ima.imaGetToken?.() ?? Promise.reject(/* @__PURE__ */ new Error("getToken not available"))));
		}, [ima]);
		const handleGetDeviceInfo = import_react$2.useCallback(async (origin) => {
			return ok({ deviceInfo: await (ima.imaGetDeviceInfo?.({ origin }) ?? Promise.reject(/* @__PURE__ */ new Error("getDeviceInfo not available"))) });
		}, [ima]);
		/**
		* addKnowledgeTask：把 IMA 知识库的 media 转为 ContentBlock[] 添加到新建任务的输入框。
		* 采用 draft-first：先写入新建任务 draft，再跳转回任务页由输入框恢复。
		* IMA JSAPI 字段：id、mediaType（数字枚举）、title、itemType（'kb'|'file'）、icon（可选）。
		*/
		const handleAddKnowledgeTask = import_react$2.useCallback(async (params) => {
			const { medias, actionType } = params;
			console.log("[ImaTelemetry] addKnowledgeTask params:", JSON.stringify({
				actionType,
				mediasCount: Array.isArray(medias) ? medias.length : 0
			}));
			if (Array.isArray(medias) && medias.length > 0) {
				const isBatch = actionType === "batch" || actionType == null && medias.length > 1;
				console.log("[ImaTelemetry] addToTask isBatch:", isBatch, "actionType:", actionType, "medias.length:", medias.length);
				if (isBatch) reportImaLibAddToTaskBatch(adapter);
				else reportImaLibAddToTaskHover(adapter);
				const blocks = medias.map((media) => createImaFileBlock({
					fileId: media.id,
					filename: media.title,
					fileType: media.mediaType,
					itemType: media.itemType,
					iconUrl: media.itemType === "kb" ? media.icon || getImaMediaTypeIcon(void 0) : getImaMediaTypeIcon(media.mediaType)
				}));
				medias.forEach(() => {
					reportAttachImaSuccess(adapter, "ima", void 0, void 0);
				});
				overwriteBlocksToDraft(blocks, buildNewTaskDraftKey(accountUid));
				router.updateUrl({ taskId: null }, { replace: true });
				connectorStore.getState().autoEnableMcpConnectorToggle(IMA_MCP_CONNECTOR_ID, IMA_AUTO_CONNECT_TOAST_KEY);
			}
			return ok({ taskId: `local-${Date.now()}` });
		}, [
			accountUid,
			adapter,
			router
		]);
		const handleOpenBrowser = import_react$2.useCallback(async (params) => {
			const { url: browserUrl } = params;
			reportImaLibOpenInIma(adapter);
			if (ima.openExternal) await ima.openExternal(browserUrl);
			else window.open(browserUrl, "_blank", "noopener,noreferrer");
			return ok();
		}, [ima, adapter]);
		/**
		* openMedia：预拉签名 URL 后塞给 ImaFilePreview，避免组件二次请求。
		* externalPreview === true 时由外部托管预览，宿主侧直接返回成功。
		*/
		const handleOpenMedia = import_react$2.useCallback(async (params) => {
			const mediaParams = params;
			let filename;
			if (!mediaParams?.id) return {
				code: 1,
				msg: "id is empty"
			};
			const ext = (mediaParams.filename || mediaParams.id).split(".").pop() || "";
			reportImaLibFileOpen(adapter, mediaParams.mimeType?.split("/")[0] || "others", ext);
			if (externalPreview) return ok();
			let viewUrl;
			try {
				const res = await ima.imaFilesViewUrl({ fileId: mediaParams.id });
				filename = res.title ?? mediaParams.filename ?? mediaParams.id;
				viewUrl = pickUrl(res) ?? void 0;
			} catch (e) {
				return {
					code: 1,
					msg: e instanceof Error ? e.message : "fetch viewUrl failed"
				};
			}
			setPreviewFile({
				fileId: mediaParams.id,
				kbId: mediaParams.kbId ?? "",
				filename,
				mediaType: mediaParams.mediaType,
				viewUrl
			});
			return ok();
		}, [externalPreview, ima]);
		const handleOpenApp = import_react$2.useCallback(async (params) => {
			const appParams = params;
			if (!appParams || !appParams.schema || !appParams.url) throw new Error("openApp params invalid: require { schema, url }");
			if (ima.imaOpenApp) await ima.imaOpenApp(appParams);
			else throw new Error("openApp not available");
			return ok();
		}, [ima]);
		const handleHasApp = import_react$2.useCallback(async () => {
			if (ima.imaHasApp) return ok(await ima.imaHasApp());
			throw new Error("hasApp not available");
		}, [ima]);
		const handleGetHostState = import_react$2.useCallback(async () => {
			const hostState = {
				theme: theme === "light" ? "light" : "dark",
				locale: navigator.language || "zh-CN"
			};
			console.log("[IMA] JSAPI getHostState:", hostState);
			return ok(hostState);
		}, [theme]);
		const hostSenderRef = import_react$2.useRef(null);
		const hostSender = useImaHostBridge({
			allowedOrigins,
			iframeRef,
			handlers: {
				onImaReady: (msg) => {
					console.log("[IMA] iframe client ready received:", msg);
					hostSenderRef.current?.sendHostReady({
						hostApp: adapter?.environmentType === "local" ? "workbuddy-desktop" : "codebuddy-web",
						hostVersion: "unknown",
						theme: theme === "light" ? "light" : "dark",
						locale: navigator.language || "zh-CN",
						authed,
						supportedProtocolVersions: ["1.1.0"]
					});
					console.log("[IMA] host:ready sent to iframe client");
				},
				onJsApiRequest: async (method, params, context) => {
					switch (method) {
						case "getToken": return handleGetToken();
						case "getDeviceInfo": return handleGetDeviceInfo(context?.origin);
						case "addKnowledgeTask": return handleAddKnowledgeTask(params);
						case "openBrowser": return handleOpenBrowser(params);
						case "openMedia": return handleOpenMedia(params);
						case "openApp": return handleOpenApp(params);
						case "hasApp": return handleHasApp();
						case "getHostState": return handleGetHostState();
						case "getSupportedFileFormats": return ok(SUPPORTED_FILE_FORMATS);
						case "search":
							reportImaLibSearch(adapter);
							return ok();
						default: throw new Error(`Unknown JSAPI method: ${method}`);
					}
				}
			}
		});
		import_react$2.useEffect(() => {
			hostSenderRef.current = hostSender;
		}, [hostSender]);
		const prevVisibleRef = import_react$2.useRef(visible);
		import_react$2.useEffect(() => {
			if (visible !== prevVisibleRef.current && iframeLoaded) {
				console.log("[IMA] panel visibility changed, sending visibility:changed to iframe:", visible);
				hostSenderRef.current?.sendVisibilityChanged(visible);
				if (visible && authed) reportImaLibraryList(adapter);
			}
			prevVisibleRef.current = visible;
		}, [
			visible,
			iframeLoaded,
			authed,
			adapter
		]);
		const topBarActions = authed ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "ima-library-view__settings-wrapper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				ref: settingsBtnRef,
				className: "ima-library-view__settings-btn",
				onClick: () => setShowSettingsMenu((prev) => !prev),
				title: tr("tdoc.settings", "设置"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MoreIcon, {
					width: 16,
					height: 16
				})
			}), showSettingsMenu && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				ref: settingsMenuRef,
				className: "ima-library-view__settings-menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					className: "ima-library-view__settings-menu-item ima-library-view__settings-menu-item--danger",
					onClick: () => {
						setShowSettingsMenu(false);
						reportImaUnbind(adapter);
						setShowRevokeConfirm(true);
					},
					children: tr("tdoc.auth.revokeMenuItem", "解除绑定")
				})
			})]
		}) : void 0;
		if (!everVisible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "ima-panel",
			style: visible ? void 0 : { display: "none" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WorkBuddyTopBar, { actions: topBarActions }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "ima-panel__body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "ima-panel__heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
							className: "ima-panel__title",
							children: tr("ima.library.pageTitle", "ima 知识库")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
							className: "ima-panel__desc",
							children: tr("ima.library.pageDesc", "个人知识管理、私域知识共享、公域知识探索")
						})]
					}), authLoading && !hasBeenAuthed ? null : !authed && !hasBeenAuthed ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: `ima-library-view ima-library-view--auth ${className}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ImaLibraryAuthEntry, {
							onAuthed: () => {
								authRefresh().catch(() => {});
							},
							authSource: "library"
						})
					}) : !authed && hasBeenAuthed ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: `ima-library-view ima-library-view--auth ${className}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ImaLibraryAuthEntry, {
							onAuthed: () => {
								authRefresh().catch(() => {});
							},
							authSource: "library"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: `ima-library-view ${className}`,
						children: [
							urlLoading && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "ima-library-view__placeholder",
								children: tr("common.loading", "加载中...")
							}),
							!urlLoading && !url && !urlError && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "ima-library-view__placeholder",
								children: tr("common.loading", "加载中...")
							}),
							urlError && !urlLoading && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "ima-library-view__placeholder ima-library-view__placeholder--error",
								children: urlError
							}),
							url && !urlError && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("iframe", {
								ref: iframeRef,
								className: "ima-library-view__iframe",
								src: url,
								title: tr("ima.library.title", "ima 资料库"),
								sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads",
								allow: "clipboard-read; clipboard-write; fullscreen",
								onLoad: () => {
									setIframeLoaded(true);
									reportImaLibraryList(adapter);
								}
							}), !iframeLoaded && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "ima-library-view__loading-overlay",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "ima-library-view__spinner",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "ima-library-view__loading-text",
									children: tr("common.loading", "加载中...")
								})]
							})] }),
							!externalPreview && previewFile && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ImaFilePreview, {
								open: !!previewFile,
								onClose: () => setPreviewFile(null),
								file: previewFile
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
					visible: showRevokeConfirm,
					title: tr("tdoc.auth.revokeConfirmTitle", "确定解除绑定？"),
					content: tr("ima.library.revokeConfirmDesc", "解绑后，当前账号将无法访问 ima 资料库。"),
					confirmText: tr("tdoc.auth.revokeConfirmOk", "确认解绑"),
					cancelText: tr("common.cancel", "取消"),
					confirmVariant: "danger",
					confirmButtonColor: "#CF222E",
					theme: theme === "dark" ? "dark" : "light",
					onConfirm: handleRevoke,
					onClose: () => setShowRevokeConfirm(false),
					overlayClassName: "kb-revoke-confirm-dialog"
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/ima-upload-progress-message.scss
var init_ima_upload_progress_message$1 = __esmMin((() => {}));
var init_ima_upload_progress_message = __esmMin((() => {
	init_ima_upload_progress_message$1();
	require_react();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/use-open-ima-upload-result.ts
function useOpenImaUploadResult() {
	const context = (0, import_react.useContext)(ConversationsContext);
	const navigate = useNavigate();
	return (0, import_react.useCallback)((payload) => {
		const { result, selection, filename, batch } = payload;
		const r = result && typeof result === "object" ? result : {};
		const fileId = typeof r.fileId === "string" ? r.fileId : "";
		const kbIdFromResult = typeof r.kbId === "string" ? r.kbId : typeof r.kbId === "number" ? String(r.kbId) : "";
		const kbIdFromAlias = typeof r.knowledgeBaseId === "string" ? r.knowledgeBaseId : typeof r.knowledgeBaseId === "number" ? String(r.knowledgeBaseId) : "";
		const kbId = kbIdFromResult || kbIdFromAlias || (selection?.kbId ?? "");
		const fileName = typeof r.name === "string" ? r.name : filename ?? "";
		const mediaType = typeof r.mediaType === "number" ? r.mediaType : void 0;
		const viewUrl = typeof r.viewUrl === "string" ? r.viewUrl : "";
		if (!batch) {
			context?.setPendingImaOpen?.({
				fileId: fileId || void 0,
				filename: fileName || void 0,
				mediaType,
				viewUrl: viewUrl || void 0
			});
			context?.setCurrentConversation?.(null);
		}
		if (!kbId) console.warn("[useOpenImaUploadResult] missing kbId when opening IMA library, url will fall back to /library/ima");
		navigate(kbId ? `/library/ima?knowledgeBaseId=${encodeURIComponent(kbId)}` : "/library/ima");
	}, [context, navigate]);
}
var import_react;
var init_use_open_ima_upload_result = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_router();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/ima/index.ts
var init_ima = __esmMin((() => {
	init_ima_library_auth_entry();
	init_ima_file_selector();
	init_ima_dir_selector();
	init_ima_file_preview();
	init_ima_library_view();
	init_constant();
	init_ima_upload_progress_message();
	init_ima_dialog();
	init_ima_auth_gate();
	init_ima_scroll_area();
	init_use_tr();
	init_ima_response();
	init_ima_host_bridge();
	init_use_open_ima_upload_result();
}));
//#endregion
export { ImaFileSelector as a, reportAttachImaSuccess as c, reportSaveToImaConfirm as d, reportSaveToImaSuccess as f, ImaDirSelector as i, reportChatLibRequestSend as l, useOpenImaUploadResult as n, init_telemetry as o, ImaLibraryView as r, reportAttachImaEntry as s, init_ima as t, reportSaveToImaBtn as u };
