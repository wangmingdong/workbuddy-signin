import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Xl as init_services, Zl as useTencentDocsFacade } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { F as getPreviewUrl, I as init_file_service, R as init_store, _ as init_utils, v as isTencentDocsAuthError, z as tencentDocsStore } from "./use-tdoc-check-auth-gate-x9L7eHnu.js";
import { At as isTencentDocsUrl, F as resolveDocArtifactSource, M as init_tencent_docs, N as extractFileExtension, P as init_doc_artifact_source, Tt as resolveDocumentPreviewSessionId, jt as parseTencentDocsUrl, kt as init_url_utils, ot as init_use_active_document_selection, st as isDocumentSelectionContextBlock } from "./my-files-NoDBzgqP.js";
//#region ../../packages/agent-ui/src/components/canvas/canvas-telemetry.ts
function reportCanvasElementClick(adapter, params) {
	try {
		adapter?.reportTelemetry?.("web_element_click", { ...params });
	} catch (error) {
		console.warn("[CanvasTelemetry] reportCanvasElementClick failed:", error);
	}
}
function reportDesignTabClick(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_home",
		elementId: "wbx_design_tab",
		elementName: "切换到设计创意 Tab"
	});
}
function reportCanvasEdit(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_window",
		elementId: "wbx_design_canvas_btn_edit",
		elementName: "跳转 Ardot 编辑"
	});
}
function reportCanvasGenerateApp(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_window",
		elementId: "wbx_design_canvas_btn_generate_app",
		elementName: "生成应用"
	});
}
function reportCanvasRefresh(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_window",
		elementId: "wbx_design_canvas_btn_refresh",
		elementName: "刷新画布"
	});
}
function reportCanvasExpand(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_window",
		elementId: "wbx_design_canvas_btn_expand",
		elementName: "展开画布"
	});
}
function reportCanvasCollapse(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_window",
		elementId: "wbx_design_canvas_btn_collapse",
		elementName: "恢复画布尺寸"
	});
}
function reportCanvasAddElement(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_view",
		elementId: "wbx_design_canvas_ctx_add_element",
		elementName: "添加元素到上下文"
	});
}
function reportAuthConfirm(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_auth_dialog",
		elementId: "wbx_design_auth_btn_confirm",
		elementName: "确认授权"
	});
}
function reportAuthCancel(adapter) {
	reportCanvasElementClick(adapter, {
		pageURL: "wbx_design_canvas_auth_dialog",
		elementId: "wbx_design_auth_btn_cancel",
		elementName: "取消授权"
	});
}
function extractConversationTelemetryInfo(conversations, sessionId) {
	const fallback = {
		requestId: "",
		isCustomModel: false,
		name: "",
		inputLength: 0
	};
	if (!conversations || !sessionId) return fallback;
	const conversation = conversations.find((c) => c.id === sessionId);
	if (!conversation) return fallback;
	const firstUserMessage = conversation.messages?.find((m) => m.messageType === "user");
	const requestId = firstUserMessage?.requestId ?? "";
	const textContent = firstUserMessage?.content;
	const inputLength = typeof textContent === "string" ? textContent.length : Array.isArray(textContent) ? textContent.reduce((len, block) => {
		if (typeof block === "object" && block !== null && "text" in block) return len + String(block.text ?? "").length;
		return len;
	}, 0) : 0;
	return {
		requestId,
		isCustomModel: false,
		name: conversation.title ?? "",
		inputLength
	};
}
/**
* 从 content blocks 中提取 Ardot 画布上下文块的业务 type 列表（去重）及总数。
*
* Ardot 当前把元素类型放在 `_meta.mcpAppContext.structuredContent.nodes[].type`
* 中；如果未来结构补充了 `structuredContent.type`，这里也兼容读取。
* 两者都拿不到时，才回退到 block 自身的 `type` 字段。
*/
function extractArdotContextTypes(blocks) {
	const types = /* @__PURE__ */ new Set();
	let count = 0;
	for (const block of blocks) {
		const meta = block._meta;
		if (!meta || typeof meta !== "object") continue;
		const mcpAppContext = meta.mcpAppContext;
		if (!mcpAppContext) continue;
		const uri = typeof block.uri === "string" ? block.uri : void 0;
		if (!uri || !uri.startsWith("mcp-app-context://ardot")) continue;
		count++;
		const structured = typeof mcpAppContext === "object" && mcpAppContext !== null ? mcpAppContext.structuredContent : void 0;
		const structuredRecord = typeof structured === "object" && structured !== null ? structured : void 0;
		const nodeTypes = Array.isArray(structuredRecord?.nodes) ? structuredRecord.nodes.map((node) => {
			if (!node || typeof node !== "object") return "";
			const nodeType = node.type;
			return typeof nodeType === "string" ? nodeType : "";
		}).filter(Boolean) : [];
		if (nodeTypes.length > 0) {
			for (const nodeType of nodeTypes) types.add(nodeType);
			continue;
		}
		const contextType = structuredRecord?.type;
		types.add(typeof contextType === "string" && contextType ? contextType : block.type || "canvas");
	}
	return {
		types: [...types],
		count
	};
}
function reportBusinessEvent(adapter, eventCode, payload) {
	try {
		adapter?.reportTelemetry?.(eventCode, payload);
	} catch (error) {
		console.warn(`[CanvasTelemetry] ${eventCode} failed:`, error);
	}
}
/** 画布打开请求（所有来源均上报），配合 canvas_task_create / canvas_open 计算成功率。 */
function reportCanvasOpenAttempt(adapter, params) {
	reportBusinessEvent(adapter, "wbx_design_canvas_open_attempt", params);
}
/** 设计创意任务 & 制品生成（仅 create_design 时上报）。 */
function reportCanvasTaskCreate(adapter, params) {
	reportBusinessEvent(adapter, "wbx_design_canvas_task_create", params);
}
/** 画布打开完成（仅 open_design 时上报）。 */
function reportCanvasOpen(adapter, params) {
	reportBusinessEvent(adapter, "wbx_design_canvas_open", params);
}
/** 画布上下文扩展（对话携带 ardot context block 时上报）。 */
function reportDesignChatRequestSend(adapter, params) {
	reportBusinessEvent(adapter, "wbx_design_chat_request_send", params);
}
/** 创建设计任务会话。 */
function reportDesignConversationCreate(adapter, params) {
	reportBusinessEvent(adapter, "wbx_design_conversation_create", params);
}
var init_canvas_telemetry = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/session-kind.ts
function isDesignSession(session) {
	return session?.welcomeMode === "design";
}
var init_session_kind = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/tencent-docs/file-viewer-telemetry.ts
/** 本地自然日 yyyy-mm-dd（与 Teams beacon 口径一致）。 */
function getLocalDateKey(now = /* @__PURE__ */ new Date()) {
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${now.getFullYear()}-${month}-${day}`;
}
/** 归一化文件去重键：去 query/hash，统一斜杠。 */
function normalizeFileViewerFileKey(raw) {
	const trimmed = (raw ?? "").trim();
	if (!trimmed) return "";
	return (trimmed.split(/[?#]/, 1)[0] ?? "").replace(/\\/g, "/");
}
function buildFileViewerPageShowStorageKey(userId, fileKey, now = /* @__PURE__ */ new Date()) {
	return `${PAGE_SHOW_STORAGE_PREFIX}:${userId || "anonymous"}:${getLocalDateKey(now)}:${fileKey}`;
}
function getDefaultLocalStorage() {
	try {
		return typeof window === "undefined" ? void 0 : window.localStorage;
	} catch {
		return;
	}
}
/**
* 尝试占坑：返回 true 表示本次应上报（首次或 storage 不可用时的保守上报）。
* 返回 false 表示同日同文件已报过，应跳过。
*/
function tryClaimFileViewerPageShowOnce(userId, fileKey, options) {
	const normalizedKey = normalizeFileViewerFileKey(fileKey);
	if (!normalizedKey) return false;
	const storage = options?.storage === void 0 ? getDefaultLocalStorage() : options.storage;
	if (!storage) return true;
	const storageKey = buildFileViewerPageShowStorageKey(userId, normalizedKey, options?.now);
	try {
		if (storage.getItem(storageKey)) return false;
		storage.setItem(storageKey, "1");
		return true;
	} catch {
		return true;
	}
}
/**
* 任务右侧预览区域曝光。
* @returns 是否实际发出了上报（被去重拦截则为 false）
*/
function reportFileViewerPageShow(adapter, params) {
	try {
		if (!tryClaimFileViewerPageShowOnce(params.userId ?? "anonymous", params.fileKey, {
			storage: params.storage,
			now: params.now
		})) return false;
		adapter?.reportTelemetry?.("web_page_show", {
			pageName: PAGE_NAME,
			pageURL: params.pageURL,
			source: params.source,
			type: params.type,
			mode: params.mode
		});
		return true;
	} catch (error) {
		console.warn("[FileViewerTelemetry] reportFileViewerPageShow failed:", error);
		return false;
	}
}
/** 从本地文件路径推导曝光字段。 */
function buildLocalFileViewerPageShowFields(filePath) {
	const type = extractFileExtension(filePath);
	return {
		source: resolveDocArtifactSource(type),
		type,
		mode: "local"
	};
}
/**
* 在线预览 URL → mode；非文档类预览返回 null（不上报 file_viewer）。
* tdocs 判定由调用方传入（复用 isTencentDocsUrl），此处只做 ima/lexiang host 识别。
*/
function resolveOnlineFileViewerMode(pageURL, isTencentDocs) {
	if (isTencentDocs) return "tdocs";
	let hostname = "";
	try {
		hostname = new URL(pageURL).hostname.toLowerCase();
	} catch {
		return null;
	}
	if (IMA_HOST_SUFFIXES.some((host) => hostname === host || hostname.endsWith(`.${host}`))) return "ima";
	if (LEXIANG_HOST_MARKERS.some((marker) => hostname === marker || hostname.endsWith(`.${marker}`))) return "lexiang";
	return null;
}
/** 从在线预览 URL 推导 source/type（无后缀时 source=unknown、type=''）。 */
function buildOnlineFileViewerPageShowFields(pageURL, mode) {
	const type = extractFileExtension(pageURL);
	return {
		source: resolveDocArtifactSource(type),
		type,
		mode
	};
}
/**
* 从选区 `_meta.fileType` + `filePath` 推导制品大类（source）。
* 选区侧 fileType：`word` / `excel` / `slide` / `pdf`；未知回退后缀推导。
*/
function resolveSelectionArtifactSource(fileType, filePath) {
	const ft = (fileType ?? "").toLowerCase();
	if (ft === "word") return "word";
	if (ft === "excel") return "excel";
	if (ft === "slide" || ft === "ppt") return "ppt";
	if (ft === "pdf") return "pdf";
	return resolveDocArtifactSource(extractFileExtension(filePath ?? ""));
}
/** 选区 documentResourceUri → mode：`tdoc://` → tdocs，其余 local。 */
function resolveSelectionMode(documentResourceUri) {
	return documentResourceUri?.startsWith("tdoc://") ? "tdocs" : "local";
}
function resolveFileViewerChatTriggerSource(requestMeta) {
	return requestMeta?.["fileViewerTriggerSource"] === "keyboard_shortcut" ? "keyboard_shortcut" : "input_box_on_the_left";
}
/** AI 对话发送（带选区内容）；需与同次发送的 chat_request_send 对齐（由 agent-cli 上报）。 */
function reportFileViewerChatRequestSend(adapter, params) {
	try {
		adapter?.reportTelemetry?.(CHAT_REQUEST_SEND_EVENT, {
			elementName: "AI对话发送（带选区内容在发送消息时上报）",
			source: params.source,
			type: params.type,
			mode: params.mode,
			triggerSource: params.triggerSource,
			conversationId: params.conversationId,
			requestId: params.requestId
		});
	} catch (error) {
		console.warn("[FileViewerTelemetry] reportFileViewerChatRequestSend failed:", error);
	}
}
/**
* 合流点入口：prompt 含文档选区 chip 时上报一次。
* main-content-core 只调本函数，不散落字段拼装。
*/
function reportFileViewerChatRequestSendFromPrompt(adapter, options) {
	const selectionBlock = options.prompt.find((block) => isDocumentSelectionContextBlock(block));
	if (!selectionBlock) return false;
	const meta = selectionBlock._meta ?? {};
	const documentResourceUri = typeof meta.documentResourceUri === "string" ? meta.documentResourceUri : void 0;
	const filePath = typeof meta.filePath === "string" ? meta.filePath : void 0;
	reportFileViewerChatRequestSend(adapter, {
		source: resolveSelectionArtifactSource(typeof meta.fileType === "string" ? meta.fileType : void 0, filePath),
		type: extractFileExtension(filePath ?? ""),
		mode: resolveSelectionMode(documentResourceUri),
		triggerSource: resolveFileViewerChatTriggerSource(options.requestMeta),
		conversationId: options.conversationId,
		requestId: options.requestId
	});
	return true;
}
var FILE_VIEWER_TRIGGER_SOURCE_META_KEY, PAGE_SHOW_STORAGE_PREFIX, PAGE_NAME, CHAT_REQUEST_SEND_EVENT, IMA_HOST_SUFFIXES, LEXIANG_HOST_MARKERS;
var init_file_viewer_telemetry = __esmMin((() => {
	init_doc_artifact_source();
	init_use_active_document_selection();
	FILE_VIEWER_TRIGGER_SOURCE_META_KEY = "fileViewerTriggerSource";
	PAGE_SHOW_STORAGE_PREFIX = "wb:file_viewer:page_show";
	PAGE_NAME = "file_viewer";
	CHAT_REQUEST_SEND_EVENT = "file_viewer_chat_request_send";
	IMA_HOST_SUFFIXES = [
		"ima.qq.com",
		"ima-preview.qq.com",
		"ima-test.qq.com"
	];
	LEXIANG_HOST_MARKERS = ["lexiang.tencent.com", "lexiang.com"];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tencent-docs-resolver.ts
/** 追加 _fid 供 BrowserPreview 桥接（URL 路径里的 docId ≠ file_id）。 */
function decorateLoginUrl(url, fileId) {
	if (!fileId) return url;
	try {
		const parsed = new URL(url);
		if (!parsed.searchParams.has("_fid")) parsed.searchParams.set("_fid", fileId);
		return parsed.toString();
	} catch {
		return url;
	}
}
function useTencentDocsResolver(options) {
	const { adapter, onAuthExpired, previewSource, sessionIdProvider } = options;
	const tencentDocs = useTencentDocsFacade();
	const handleAuthExpired = (0, import_react$1.useCallback)(() => {
		tencentDocsStore.getState().markExpired();
		onAuthExpired?.();
	}, [onAuthExpired]);
	return {
		resolveByFile: (0, import_react$1.useCallback)(async (file, type = "openOriginalFile") => {
			const rawUrl = file.url ?? "";
			const fileId = file.file_id ?? "";
			const fallback = {
				url: rawUrl,
				rawUrl,
				isLoginUrl: false,
				fileId
			};
			if (!adapter?.getTencentDocsPreviewUrl) return fallback;
			try {
				const loginUrl = await getPreviewUrl(tencentDocs, file, type, resolveDocumentPreviewSessionId({
					source: previewSource,
					currentSessionId: sessionIdProvider?.()
				}));
				if (!loginUrl) {
					if (fileId) handleAuthExpired();
					return fallback;
				}
				return {
					url: decorateLoginUrl(loginUrl, fileId),
					rawUrl,
					isLoginUrl: true,
					fileId
				};
			} catch (err) {
				console.warn("[TencentDocsResolver] resolveByFile failed:", err);
				if (isTencentDocsAuthError(err)) handleAuthExpired();
				return fallback;
			}
		}, [
			adapter,
			tencentDocs,
			handleAuthExpired,
			previewSource,
			sessionIdProvider
		]),
		resolveByUrl: (0, import_react$1.useCallback)(async (url) => {
			if (!isTencentDocsUrl(url)) return {
				url,
				rawUrl: url,
				isLoginUrl: false,
				fileId: ""
			};
			const info = parseTencentDocsUrl(url);
			const cleanUrl = info?.url ?? url;
			const rawUrl = info?.rawUrl ?? url;
			const fileId = info?.fileId ?? "";
			if (!adapter?.getTencentDocsPreviewUrl || !fileId) return {
				url: rawUrl,
				rawUrl,
				isLoginUrl: false,
				fileId
			};
			try {
				const sessionId = resolveDocumentPreviewSessionId({
					source: previewSource,
					currentSessionId: sessionIdProvider?.()
				});
				const loginUrl = await getPreviewUrl(tencentDocs, {
					url: cleanUrl,
					file_id: fileId
				}, "openOriginalFile", sessionId);
				if (!loginUrl) {
					handleAuthExpired();
					return {
						url: rawUrl,
						rawUrl,
						isLoginUrl: false,
						fileId
					};
				}
				return {
					url: decorateLoginUrl(loginUrl, fileId),
					rawUrl,
					isLoginUrl: true,
					fileId
				};
			} catch (err) {
				console.warn("[TencentDocsResolver] resolveByUrl failed:", err);
				if (isTencentDocsAuthError(err)) handleAuthExpired();
				return {
					url: rawUrl,
					rawUrl,
					isLoginUrl: false,
					fileId
				};
			}
		}, [
			adapter,
			tencentDocs,
			handleAuthExpired,
			previewSource,
			sessionIdProvider
		]),
		isTencentDocsUrl
	};
}
var import_react$1;
var init_use_tencent_docs_resolver = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_tencent_docs();
	init_services();
	init_file_service();
	init_store();
	init_url_utils();
	init_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-tencent-docs-link.ts
function useTencentDocsLinkHandler(options) {
	const { adapter, openPreview, onAuthExpired, previewSource, sessionIdProvider } = options;
	const { resolveByUrl } = useTencentDocsResolver({
		adapter,
		onAuthExpired,
		previewSource,
		sessionIdProvider
	});
	return {
		handleTencentDocsLink: (0, import_react.useCallback)((url) => {
			if (!isTencentDocsUrl(url)) return false;
			resolveByUrl(url).then((result) => {
				openPreview(result.url);
			}).catch((err) => {
				console.warn("[TencentDocsLink] resolveByUrl threw unexpectedly; skip opening raw URL:", err);
			});
			return true;
		}, [openPreview, resolveByUrl]),
		isTencentDocsUrl
	};
}
var import_react;
var init_use_tencent_docs_link = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_url_utils();
	init_use_tencent_docs_resolver();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/link-handler.ts
var init_link_handler = __esmMin((() => {
	init_use_tencent_docs_link();
}));
//#endregion
export { reportCanvasOpen as C, reportDesignChatRequestSend as D, reportCanvasTaskCreate as E, reportDesignConversationCreate as O, reportCanvasGenerateApp as S, reportCanvasRefresh as T, reportAuthConfirm as _, buildOnlineFileViewerPageShowFields as a, reportCanvasEdit as b, reportFileViewerChatRequestSendFromPrompt as c, init_session_kind as d, isDesignSession as f, reportAuthCancel as g, init_canvas_telemetry as h, buildLocalFileViewerPageShowFields as i, reportDesignTabClick as k, reportFileViewerPageShow as l, extractConversationTelemetryInfo as m, useTencentDocsLinkHandler as n, init_file_viewer_telemetry as o, extractArdotContextTypes as p, FILE_VIEWER_TRIGGER_SOURCE_META_KEY as r, normalizeFileViewerFileKey as s, init_link_handler as t, resolveOnlineFileViewerMode as u, reportCanvasAddElement as v, reportCanvasOpenAttempt as w, reportCanvasExpand as x, reportCanvasCollapse as y };
