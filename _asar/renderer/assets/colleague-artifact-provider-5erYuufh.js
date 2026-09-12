import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Ht as init_remote_file_context, Ut as registerRemoteFileContext, gr as setDetailPanelContextOverride, hr as init_context_override, pr as clearDetailPanelContextOverride } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { dt as useOptionalDocumentPreviewBridge, ut as init_document_preview_context, vt as ConversationsContext, yt as init_conversations_context } from "./contexts-D7XKqa2J.js";
import { c as readUserAttachmentUrl, i as init_attachment_preview, o as isSafeUserAttachmentUrl } from "./attachment-preview-B-Ru2kV_.js";
//#region ../../packages/agent-ui/src/components/colleagues-panel/utils/attachment-preview-cache.ts
function stripQueryAndHash(url) {
	return url.split(/[?#]/)[0] || url;
}
function decodeRepeated(value) {
	let current = value;
	for (let i = 0; i < 3; i++) try {
		const decoded = decodeURIComponent(current);
		if (decoded === current) break;
		current = decoded;
	} catch {
		break;
	}
	return current;
}
function getPreviewCacheKeys(url) {
	const keys = /* @__PURE__ */ new Set();
	const add = (value) => {
		if (value) keys.add(value);
	};
	const noQueryUrl = stripQueryAndHash(url);
	add(noQueryUrl);
	add(decodeRepeated(noQueryUrl));
	try {
		const parsed = new URL(url);
		const path = parsed.pathname;
		const decodedPath = decodeRepeated(path);
		add(`${parsed.origin}${path}`);
		add(`${parsed.origin}${decodedPath}`);
		add(`${parsed.origin}${encodeURI(decodedPath)}`);
	} catch {}
	return [...keys];
}
function setColleagueAttachmentPreviewFile(url, file) {
	if (!url) return;
	for (const key of getPreviewCacheKeys(url)) colleagueAttachmentPreviewFiles.set(key, file);
}
function getColleagueAttachmentPreviewFile(url) {
	if (!url) return;
	for (const key of getPreviewCacheKeys(url)) {
		const file = colleagueAttachmentPreviewFiles.get(key);
		if (file) return file;
	}
}
var colleagueAttachmentPreviewFiles;
var init_attachment_preview_cache = __esmMin((() => {
	colleagueAttachmentPreviewFiles = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-colleague-document-preview.ts
function getExtension(filePath) {
	const cleanPath = filePath.replace(/[?#].*$/, "");
	const idx = cleanPath.lastIndexOf(".");
	return idx >= 0 ? cleanPath.slice(idx + 1).toLowerCase() : "";
}
function isColleagueSdkDocumentPreviewPath(filePath) {
	if (!filePath) return false;
	return COLLEAGUE_DOCUMENT_PREVIEW_EXTENSIONS.has(getExtension(filePath));
}
function getSafePreviewFilename(filePath) {
	const rawName = filePath.replace(/[?#].*$/, "").split("/").filter(Boolean).pop() || "document";
	try {
		return decodeURIComponent(rawName).replace(/[/\\]/g, "_");
	} catch {
		return rawName.replace(/[/\\]/g, "_");
	}
}
function uint8ArrayToBase64(bytes) {
	const chunkSize = 32768;
	let binary = "";
	for (let i = 0; i < bytes.length; i += chunkSize) binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
	return btoa(binary);
}
/** 为同事助理 doc/ppt/pdf 远端产物提供 Desktop 腾讯文档 SDK 预览 URL。 */
function useColleagueDocumentPreview(readFileWithFormat) {
	const previewDocumentFromContent = useOptionalDocumentPreviewBridge()?.previewDocumentFromContent;
	const getPreviewUrl = (0, import_react$2.useCallback)(async (filePath) => {
		if (!isColleagueSdkDocumentPreviewPath(filePath)) return {
			success: false,
			error: "Use built-in preview fallback"
		};
		if (!previewDocumentFromContent) return {
			success: false,
			error: "Document preview bridge is unavailable"
		};
		const cachedFile = getColleagueAttachmentPreviewFile(filePath);
		const content = cachedFile ? new Uint8Array(await cachedFile.arrayBuffer()) : isSafeUserAttachmentUrl(filePath) ? await readUserAttachmentUrl(filePath, "bytes") : await readFileWithFormat(filePath, "bytes");
		if (!(content instanceof Uint8Array)) return {
			success: false,
			error: "Unexpected document content"
		};
		if (content.byteLength > COLLEAGUE_DOCUMENT_PREVIEW_MAX_BYTES) return {
			success: false,
			error: "Document exceeds preview size limit"
		};
		return previewDocumentFromContent({
			filename: getSafePreviewFilename(filePath),
			contentBase64: uint8ArrayToBase64(content)
		});
	}, [previewDocumentFromContent, readFileWithFormat]);
	return (0, import_react$2.useMemo)(() => previewDocumentFromContent ? getPreviewUrl : void 0, [getPreviewUrl, previewDocumentFromContent]);
}
var import_react$2, COLLEAGUE_DOCUMENT_PREVIEW_EXTENSIONS, COLLEAGUE_DOCUMENT_PREVIEW_MAX_BYTES;
var init_use_colleague_document_preview = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_document_preview_context();
	init_attachment_preview();
	init_attachment_preview_cache();
	COLLEAGUE_DOCUMENT_PREVIEW_EXTENSIONS = new Set([
		"doc",
		"ppt",
		"pdf"
	]);
	COLLEAGUE_DOCUMENT_PREVIEW_MAX_BYTES = 50 * 1024 * 1024;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/acp-chat/use-colleague-draft-conversation.ts
/** 为 app-global 草稿态提供前端占位会话，避免无真实 ACP session 时全局右栏被布局门控拦截。 */
function useColleagueDraftConversation({ sessionId, cwd, title, messages, useAppDetailPanel, ownerId }) {
	const draftConversationTimestampRef = (0, import_react$1.useRef)(/* @__PURE__ */ new Date());
	const draftConversationId = useAppDetailPanel && !sessionId && ownerId ? `${ownerId}:draft` : void 0;
	return (0, import_react$1.useMemo)(() => {
		if (sessionId) return {
			id: sessionId,
			cwd,
			title,
			timestamp: /* @__PURE__ */ new Date(),
			messages,
			status: "pending"
		};
		if (draftConversationId) return {
			id: draftConversationId,
			cwd,
			title,
			timestamp: draftConversationTimestampRef.current,
			messages,
			status: "pending"
		};
		return null;
	}, [
		cwd,
		draftConversationId,
		messages,
		sessionId,
		title
	]);
}
var import_react$1;
var init_use_colleague_draft_conversation = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/acp-chat/colleague-artifact-provider.tsx
function useColleagueArtifactLayout() {
	const context = (0, import_react.useContext)(ColleagueArtifactLayoutContext);
	if (!context) throw new Error("useColleagueArtifactLayout must be used within ColleagueArtifactProvider");
	return context;
}
/** 为同事助理右侧产物面板注入 DetailPanelWrapper 需要的 ConversationsContext。 */
function ColleagueArtifactProvider({ children, artifacts, selectedArtifactId, setSelectedArtifactId, openArtifact, isGitWorkspace, showDetailPanelAsNeededRef, sidebarView, setSidebarView, browserUrl, setBrowserUrl, workspaceFileOpenRequest, sessionId, cwd = "/workspace", title, messages, fileTreeProps, readFileWithFormat, getDocumentPreviewUrlOverride, markdownImageUrlResolver, readFileForDiff, writeSandboxFile, subscribeSandboxFileChange, serveHtmlContent, updateArtifact, removeArtifact, clearArtifacts, appDetailPanelOverride }) {
	const parentConversations = (0, import_react.useContext)(ConversationsContext);
	const parentPreviewFullscreenRef = (0, import_react.useRef)(false);
	parentPreviewFullscreenRef.current = Boolean(parentConversations?.isPreviewFullscreen);
	const [localShowDetailPanel, setLocalShowDetailPanel] = (0, import_react.useState)(false);
	const [detailPanelWidth, setDetailPanelWidth] = (0, import_react.useState)(440);
	const [isPreviewFullscreen, setIsPreviewFullscreen] = (0, import_react.useState)(false);
	const [selectedFilePath, setSelectedFilePath] = (0, import_react.useState)(void 0);
	const beforeSelectFilePathRef = (0, import_react.useRef)(void 0);
	const [beforeSelectFilePathVersion, setBeforeSelectFilePathVersion] = (0, import_react.useState)(0);
	const completedWorkspaceFileOpenRequestRef = (0, import_react.useRef)(null);
	const workspaceFileOpenRunSeqRef = (0, import_react.useRef)(0);
	const sashDragRef = (0, import_react.useRef)(null);
	const useAppDetailPanel = appDetailPanelOverride?.active === true;
	const showDetailPanel = useAppDetailPanel ? Boolean(parentConversations?.showDetailPanel) : localShowDetailPanel;
	const setShowDetailPanel = (0, import_react.useCallback)((next) => {
		if (useAppDetailPanel && parentConversations?.setShowDetailPanel) {
			parentConversations.setShowDetailPanel(next);
			return;
		}
		setLocalShowDetailPanel(next);
	}, [parentConversations, useAppDetailPanel]);
	const closeDetailPanel = (0, import_react.useCallback)(() => {
		setShowDetailPanel(false);
		setIsPreviewFullscreen(false);
		setSelectedArtifactId(void 0);
		setSelectedFilePath(void 0);
		if (browserUrl) setBrowserUrl("");
		if (sidebarView !== "artifacts") setSidebarView("artifacts");
	}, [
		browserUrl,
		setBrowserUrl,
		setSelectedArtifactId,
		setShowDetailPanel,
		sidebarView,
		setSidebarView,
		useAppDetailPanel
	]);
	const openDetailPanel = (0, import_react.useCallback)(() => {
		if (!Boolean(selectedArtifactId || selectedFilePath || browserUrl)) {
			setSidebarView("artifacts");
			if (useAppDetailPanel) parentConversations?.requestNarrowOverviewMode?.();
		}
		setShowDetailPanel(true);
	}, [
		browserUrl,
		parentConversations,
		selectedArtifactId,
		selectedFilePath,
		setShowDetailPanel,
		setSidebarView,
		useAppDetailPanel
	]);
	const toggleDetailPanel = (0, import_react.useCallback)(() => {
		if (showDetailPanel) {
			closeDetailPanel();
			return;
		}
		openDetailPanel();
	}, [
		closeDetailPanel,
		openDetailPanel,
		showDetailPanel
	]);
	const registerBeforeSelectFilePath = (0, import_react.useCallback)((handler) => {
		beforeSelectFilePathRef.current = handler;
		setBeforeSelectFilePathVersion((version) => version + 1);
	}, []);
	const handleSashMouseDown = (0, import_react.useCallback)((event) => {
		event.preventDefault();
		sashDragRef.current = {
			startX: event.clientX,
			startWidth: detailPanelWidth
		};
		const onMouseMove = (moveEvent) => {
			if (!sashDragRef.current) return;
			const delta = sashDragRef.current.startX - moveEvent.clientX;
			setDetailPanelWidth(Math.min(Math.max(sashDragRef.current.startWidth + delta, 340), 800));
		};
		const onMouseUp = () => {
			sashDragRef.current = null;
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		};
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
	}, [detailPanelWidth]);
	(0, import_react.useEffect)(() => {
		showDetailPanelAsNeededRef.current = openDetailPanel;
	}, [openDetailPanel, showDetailPanelAsNeededRef]);
	(0, import_react.useEffect)(() => {
		const request = workspaceFileOpenRequest;
		const filePath = request?.filePath;
		if (!request || !filePath) return;
		if (completedWorkspaceFileOpenRequestRef.current === request.id) return;
		if (useAppDetailPanel) parentConversations?.requestNarrowOverviewMode?.();
		setShowDetailPanel(true);
		setSidebarView("fileTree");
		setSelectedArtifactId(void 0);
		if (browserUrl) setBrowserUrl("");
		const beforeSelectFilePath = beforeSelectFilePathRef.current;
		if (!beforeSelectFilePath) {
			completedWorkspaceFileOpenRequestRef.current = request.id;
			setSelectedFilePath(filePath);
			return;
		}
		let cancelled = false;
		const runSeq = ++workspaceFileOpenRunSeqRef.current;
		Promise.resolve(beforeSelectFilePath(filePath)).then((handled) => {
			if (cancelled || workspaceFileOpenRunSeqRef.current !== runSeq) return;
			completedWorkspaceFileOpenRequestRef.current = request.id;
			if (handled !== true) setSelectedFilePath(filePath);
		}).catch((error) => {
			if (cancelled || workspaceFileOpenRunSeqRef.current !== runSeq) return;
			completedWorkspaceFileOpenRequestRef.current = request.id;
			console.warn("[ColleagueArtifactProvider] beforeSelectFilePath failed:", error);
			setSelectedFilePath(filePath);
		});
		return () => {
			cancelled = true;
		};
	}, [
		beforeSelectFilePathVersion,
		browserUrl,
		parentConversations,
		setBrowserUrl,
		setSelectedArtifactId,
		setShowDetailPanel,
		setSidebarView,
		useAppDetailPanel,
		workspaceFileOpenRequest
	]);
	(0, import_react.useEffect)(() => {
		setSelectedFilePath(void 0);
		completedWorkspaceFileOpenRequestRef.current = null;
		workspaceFileOpenRunSeqRef.current += 1;
	}, [sessionId, cwd]);
	(0, import_react.useEffect)(() => {
		if (!sessionId || !readFileWithFormat) return;
		return registerRemoteFileContext(sessionId, { readFileWithFormat });
	}, [readFileWithFormat, sessionId]);
	const conversation = useColleagueDraftConversation({
		sessionId,
		cwd,
		title,
		messages,
		useAppDetailPanel,
		ownerId: appDetailPanelOverride?.ownerId
	});
	const contextValue = (0, import_react.useMemo)(() => ({
		...parentConversations ?? {},
		conversations: parentConversations?.conversations ?? [],
		currentConversation: conversation,
		setCurrentConversation: parentConversations?.setCurrentConversation ?? (() => {}),
		addConversation: parentConversations?.addConversation ?? (() => {}),
		removeConversation: parentConversations?.removeConversation ?? (async () => false),
		updateConversationTitle: parentConversations?.updateConversationTitle ?? (async () => false),
		detailInfo: parentConversations?.detailInfo ?? null,
		isLoading: parentConversations?.isLoading ?? false,
		addOrUpdateMessage: parentConversations?.addOrUpdateMessage ?? (() => {}),
		createConversation: parentConversations?.createConversation ?? (async () => null),
		artifacts,
		updateArtifact,
		removeArtifact,
		clearArtifacts,
		isCreatingConversation: parentConversations?.isCreatingConversation ?? false,
		isCreatingLoading: parentConversations?.isCreatingLoading ?? false,
		fileTree: parentConversations?.fileTree ?? {},
		selectedFilePath,
		onFileSelect: (filePath) => setSelectedFilePath(filePath),
		lazyFileTreeMode: fileTreeProps?.lazyFileTreeMode,
		fileTreeData: fileTreeProps?.fileTreeData,
		fileTreeLoaded: fileTreeProps?.fileTreeLoaded,
		onLoadFileTreeChildren: fileTreeProps?.onLoadFileTreeChildren,
		loadedPaths: fileTreeProps?.loadedPaths,
		onLoadedPathsChange: fileTreeProps?.onLoadedPathsChange,
		collapsedFolders: fileTreeProps?.collapsedFolders,
		onCollapsedFoldersChange: fileTreeProps?.onCollapsedFoldersChange,
		onTreeDataChange: fileTreeProps?.onTreeDataChange,
		onRequestFileTreeRefresh: fileTreeProps?.onRequestFileTreeRefresh,
		onReadFile: fileTreeProps?.onReadFile,
		selectedModelId: parentConversations?.selectedModelId ?? "",
		setSelectedModelId: parentConversations?.setSelectedModelId ?? (() => {}),
		selectedChatMode: parentConversations?.selectedChatMode ?? "",
		setSelectedChatMode: parentConversations?.setSelectedChatMode ?? (() => {}),
		selectedWelcomeMode: parentConversations?.selectedWelcomeMode ?? "",
		setSelectedWelcomeMode: parentConversations?.setSelectedWelcomeMode ?? (() => {}),
		sidebarView,
		onSidebarViewChange: setSidebarView,
		browserUrl,
		setBrowserUrl,
		disableHtmlBrowserPreview: true,
		selectedArtifactId,
		setSelectedArtifactId,
		openArtifact,
		isGitWorkspace,
		showDetailPanel,
		setShowDetailPanel,
		onToggleDetailPanel: toggleDetailPanel,
		setDetailSidebarExpanded: void 0,
		readFileWithFormat,
		markdownImageUrlResolver,
		readFileForDiff,
		writeSandboxFile,
		subscribeSandboxFileChange,
		jumpToConversationId: parentConversations?.jumpToConversationId ?? ""
	}), [
		parentConversations,
		conversation,
		artifacts,
		updateArtifact,
		removeArtifact,
		clearArtifacts,
		selectedFilePath,
		fileTreeProps,
		sidebarView,
		setSidebarView,
		browserUrl,
		setBrowserUrl,
		selectedArtifactId,
		setSelectedArtifactId,
		openArtifact,
		isGitWorkspace,
		showDetailPanel,
		toggleDetailPanel,
		readFileWithFormat,
		markdownImageUrlResolver,
		readFileForDiff,
		writeSandboxFile,
		subscribeSandboxFileChange
	]);
	const selectedArtifact = (0, import_react.useMemo)(() => artifacts.find((artifact) => artifact.id === selectedArtifactId), [artifacts, selectedArtifactId]);
	const selectedArtifactPreviewPath = selectedArtifact?.type === "media-artifact" ? selectedArtifact.url : selectedArtifact?.uri;
	const appGlobalDocumentPreviewUrlOverride = isColleagueSdkDocumentPreviewPath(sidebarView === "fileTree" ? selectedFilePath : selectedArtifactPreviewPath) ? getDocumentPreviewUrlOverride : void 0;
	(0, import_react.useEffect)(() => {
		const ownerId = appDetailPanelOverride?.ownerId;
		if (!ownerId) return;
		if (!appDetailPanelOverride.active) {
			clearDetailPanelContextOverride(ownerId);
			return;
		}
		setDetailPanelContextOverride(ownerId, contextValue, {
			canSaveArtifactToLibrary: false,
			forceCloudEnvironment: true,
			disableArtifactToolbarActions: true,
			disableDocumentSdkPreview: true,
			documentPreviewSource: "colleague-assistant",
			disableArtifactUploadActions: true,
			hideHeaderDebugTools: true,
			getDocumentPreviewUrlOverride: appGlobalDocumentPreviewUrlOverride,
			canUseDocumentPreviewForFilePath: isColleagueSdkDocumentPreviewPath,
			registerBeforeSelectFilePath
		});
	}, [
		appDetailPanelOverride?.active,
		appDetailPanelOverride?.ownerId,
		appGlobalDocumentPreviewUrlOverride,
		contextValue,
		registerBeforeSelectFilePath
	]);
	(0, import_react.useEffect)(() => {
		const ownerId = appDetailPanelOverride?.ownerId;
		if (!ownerId) return;
		return () => {
			if (parentPreviewFullscreenRef.current) return;
			clearDetailPanelContextOverride(ownerId);
		};
	}, [appDetailPanelOverride?.ownerId]);
	const layoutValue = (0, import_react.useMemo)(() => ({
		showDetailPanel,
		detailPanelWidth,
		isPreviewFullscreen,
		getDocumentPreviewUrlOverride,
		registerBeforeSelectFilePath,
		handleSashMouseDown,
		togglePreviewFullscreen: setIsPreviewFullscreen,
		openDetailPanel,
		closeDetailPanel,
		toggleDetailPanel
	}), [
		closeDetailPanel,
		detailPanelWidth,
		getDocumentPreviewUrlOverride,
		handleSashMouseDown,
		isPreviewFullscreen,
		openDetailPanel,
		registerBeforeSelectFilePath,
		showDetailPanel,
		toggleDetailPanel
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueArtifactLayoutContext.Provider, {
		value: layoutValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationsContext.Provider, {
			value: contextValue,
			children
		})
	});
}
var import_react, import_jsx_runtime, ColleagueArtifactLayoutContext;
var init_colleague_artifact_provider = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_conversations_context();
	init_remote_file_context();
	init_context_override();
	init_use_colleague_document_preview();
	init_use_colleague_draft_conversation();
	import_jsx_runtime = require_jsx_runtime();
	ColleagueArtifactLayoutContext = (0, import_react.createContext)(null);
}));
//#endregion
export { isColleagueSdkDocumentPreviewPath as a, setColleagueAttachmentPreviewFile as c, init_use_colleague_document_preview as i, init_colleague_artifact_provider as n, useColleagueDocumentPreview as o, useColleagueArtifactLayout as r, init_attachment_preview_cache as s, ColleagueArtifactProvider as t };
