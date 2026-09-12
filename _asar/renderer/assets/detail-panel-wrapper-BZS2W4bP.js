const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./use-upload-queue-CnL2THKL.js","./use-upload-queue-CXTgTthk.js","./chunk-BRZcfu7K.js","./src-DRGoWjIu.js","./preload-helper-E3UYCQGP.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./resize-observer-QOR-7G1T.js","./wasm-C4lriWle.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./classnames-BYn3_ESJ.js","./decode-HthuYB5G.js","./index.dom-Hjybw7gi.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./hast-util-whitespace-C3G7AbkX.js","./katex-sFwAzkhG.js","./lodash-D1c13HHR.js","./merge-CDI2sNhv.js","./throttle-mAPE4S6V.js","./isObjectLike-Dan5H4Gd.js","./isSymbol-DlS8bGaY.js","./lucide-react-CmX0JwWL.js","./client-BPkZUIji.js","./jsx-runtime-BNEdAQtr.js","./dist-CSHw4oQX.js","./i18n-DH8xcldp.js","./chevron-down-icon-Bs9CIPFg.js","./copied-icon-Cvsbo-xy.js","./copy-icon-BUIWKTIn.js","./edit-icon-9Lcq4c36.js","./src-D47LCgt5.css","./netdrive-service-B_rY4sKl.js","./vanilla-BfruURAe.js","./http-logger-BE9rNaof.js","./space-utils-DyQDtFfF.js","./common-CwB_VqKR.js","./dist-DNjXzICC.js","./store-BI1MDwNq.js","./zustand-BGHu9tpa.js","./i18n-Bt_Wap4p.js","./environment-DKqg3f0G.js","./storage-upgrade-entry-snapshot-BgU4-HWF.js","./route-path-tracker-D4O9Dve0.js","./contexts-D7XKqa2J.js","./adapter-context-DGaRYQ5R.js","./ima-api-context-C8-EzcEu.js","./useI18n-DDytAo7_.js","./chat-types-BMkaZPiE.js","./foundation-QOglV606.js","./icons-Cj3UopO9.js","./ArtifactFileIconTypes-mWPconF_.js","./icons-CmEjl25S.css","./floating-1_OFz6f-.js","./foundation-DhkLbEzB.css","./chat-types-CptmOga7.css","./file-path-DzzGeaqx.js","./useTheme-KZ-Qaric.js","./account-BDHahT9K.js","./store-S-fXQbuU.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $d as taskStarterCwd$, Br as useImaApi, En as init_conversation_status, Gd as expertTeamMemberAvatars$, Gt as init_artifact_drag_resolver, Ju as useTencentLexiangEnabled, Kd as init_task_starter_store, Ms as useAssistantDisplay, Qd as skipAutoSelectWorkspaceForExpertInvoke$, Sc as init_app_providers, Tc as useAgentServices, Tn as WORKING_STATUSES, U as init_expert, Ua as init_use_latest_ref, Ud as expertCreated$, Wa as useLatestRef, Wt as createArtifactDragResolver, Xd as pendingExpertModeActivation$, Xl as init_services, Zl as useTencentDocsFacade, _d as isInPlaceCreateFileUrl, bd as shouldOpenTencentDocsPreviewLinkExternally, cd as useKnowledgeBaseFeature, dd as init_use_is_enterprise_admin, du as useLexiangLibraryMode, fd as useEffectiveEdition, gd as init_tencent_docs_url, gu as init_use_oneid_applications, hu as findOneidApp, id as useTencentDocsKnowledgeFeature, js as init_use_assistant_display, ld as init_use_ima_enabled, nd as init_use_tencent_docs_knowledge_feature, pd as useIsEnterpriseEdition, qu as init_use_tencent_lexiang_enabled, sd as init_use_knowledge_base_feature, sl as init_telemetry, ud as useImaEnabled, ul as useAgentTelemetry, uu as init_use_lexiang_library_mode, vd as isTencentDocsUrl, yu as useOneidApplications, zr as init_use_ima_api } from "./agent-mail-CiuzbR2o.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { Ba as Tooltip, Dn as DiffViewer, Yr as toast, ni as ConfirmDialog, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { r as DetailPanel, t as init_src$1 } from "./src-BNWvGoZP.js";
import { d as notifyDocumentClientSaved, f as notifyDocumentPreviewAutoSaved } from "./FileTabs-OcDV9oyi.js";
import { p as init_environment, v as isOverseas, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale, o as onLocaleChange, u as t } from "./i18n-Bt_Wap4p.js";
import { a as useArdotAuth, i as ArdotAuthContent, o as ardotAuthStore, r as ensureArdotAuthStyles, s as useArdotAuthStore, t as init_src$2 } from "./src-Qa0M5Tg8.js";
import { f as useNavigate } from "./dist-BlOCCi14.js";
import { c as getArtifactRelativePath, n as extractRelativePath, u as init_file_path } from "./file-path-DzzGeaqx.js";
import { H as extractErrorMessage, W as init_errors, _t as useAccount, gt as init_account_context, t as init_contexts, vt as ConversationsContext, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { n as useTheme, t as init_useTheme } from "./useTheme-KZ-Qaric.js";
import { Z as TencentLexiangIcon0509, bn as ImaKnowledgeIcon0509, rt as TencentDocsIcon0509 } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { S as useRouterContextSafe, t as init_router } from "./router-O5ZnP5xt.js";
import { n as init_store, t as createMyFilesStore } from "./store-BI1MDwNq.js";
import { Z as useHtmlPreviewShareFeature, at as useShareFeature, t as init_product_features } from "./product-features-N4Z0q4SS.js";
import { t as init_common } from "./common-Czfscgga.js";
import { a as useOptionalModuleHost } from "./module-host-context-CI9spvhq.js";
import { r as init_icons } from "./oauth-callback-IQ0UCaVX.js";
import { h as useLocale } from "./center-Cjtv6Q1N.js";
import { a as extractArdotOpenDesignFileId, i as extractArdotCanvasFileId, o as init_ardot_canvas } from "./ardot-canvas-BbVvf1Ta.js";
import { S as reportCanvasGenerateApp, T as reportCanvasRefresh, _ as reportAuthConfirm, a as buildOnlineFileViewerPageShowFields, b as reportCanvasEdit, d as init_session_kind, f as isDesignSession, g as reportAuthCancel, h as init_canvas_telemetry, i as buildLocalFileViewerPageShowFields, l as reportFileViewerPageShow, n as useTencentDocsLinkHandler, o as init_file_viewer_telemetry, s as normalizeFileViewerFileKey, t as init_link_handler, u as resolveOnlineFileViewerMode, x as reportCanvasExpand, y as reportCanvasCollapse } from "./link-handler-CEYDmWii.js";
import { a as reportSaveToTdocConfirm, i as reportSaveToTdocBtn, s as reportSaveToTdocSuccess, t as init_telemetry$1 } from "./telemetry-DmUpjlLA.js";
import { r as useTencentDocsAiEditEnterpriseFeature, t as init_use_tencent_docs_ai_edit_enterprise_feature } from "./use-tencent-docs-ai-edit-enterprise-feature-DYUtKZJu.js";
import { d as init_use_tencent_netdrive_knowledge_feature, o as NetDriveStoreProvider, p as useTencentNetDriveKnowledgeFeature, s as init_netdrive_store_context } from "./cloud-file-constants-C5UBSGVB.js";
import { $ as getLocalSdkDocumentPath, B as resolveDetailPanelDocumentTabClose, C as init_project_input_context, Ct as WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES, E as reportSaveToMyfileSuccess, F as resolveDocArtifactSource, G as ensureLocalDocsSavedBeforeExternalAction, H as shouldBypassTencentDocsLinkInterceptForOpenExternal, I as init_local_file_open, L as ensureOrphanPreviewReconcile, M as init_tencent_docs, N as extractFileExtension, P as init_doc_artifact_source, R as confirmDetailPanelTabActivation, St as WORKBUDDY_JUMP_TO_CONVERSATION_REASONS, T as init_telemetry$2, Tt as resolveDocumentPreviewSessionId, V as resolveDetailPanelDocumentTabTarget, _t as notifyLocalFileOpenConflictUi, a as getMimeTypeFromFilename, bt as normalizeMainWindowLocalFilePath, c as init_lexiang_kb_picker, d as init_knowledge_base_panel, gt as init_open_conflict_ui_coordinator, h as FolderPickerModal, i as UploadModal, o as init_mime_utils, q as preflightSessionLocalDocumentOpen, r as init_upload_modal, s as LexiangKbPicker, w as useProjectInput, wt as init_jump_to_conversation_payload, xt as WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, z as isSameTencentDocsPreviewDocument } from "./my-files-NoDBzgqP.js";
import { A as getToolIcon, F as init_html_artifact_preview, L as shouldSkipBrowserPreview, P as getHtmlArtifactPreviewUrl, a as resolveToolExplanation, i as init_tools, r as buildSelectionQuotePhraseBlock, s as toolRendererRegistry, t as init_selection_quote } from "./selection-quote-DtJWZOvE.js";
import { n as createNetDriveServiceStore, o as init_netdrive_service } from "./netdrive-service-B_rY4sKl.js";
import { j as parseUploadError, l as init_api } from "./lexiang-file-type-icon-BHHdkoaP.js";
import { d as reportSaveToImaConfirm, f as reportSaveToImaSuccess, i as ImaDirSelector, n as useOpenImaUploadResult, o as init_telemetry$3, t as init_ima, u as reportSaveToImaBtn } from "./ima-CX4f7ak2.js";
import { n as useDescribeUploadError, t as init_use_describe_upload_error } from "./use-describe-upload-error-C-3VJV_7.js";
//#region ../../packages/agent-ui/src/hooks/use-version-control-enabled.tsx
/**
* 直接从 desktop settings 读取文件版本管理开关状态。
* 每次 refetchTrigger 变化时主动重新拉取，确保侧边栏打开时读到最新配置。
*/
function useVersionControlEnabled(refetchTrigger) {
	const adapter = useAdapter();
	const [enabled, setEnabled] = (0, import_react$4.useState)(false);
	(0, import_react$4.useEffect)(() => {
		if (!adapter || typeof adapter.on !== "function" || typeof adapter.emit !== "function") return;
		const unsubscribe = adapter.on("experimental-features-config-result", (data) => {
			const config = data;
			if (config && typeof config === "object") setEnabled(!!config.versionControl);
		});
		adapter.emit("get-experimental-features-config");
		return unsubscribe;
	}, [adapter, refetchTrigger]);
	return enabled;
}
var import_react$4;
var init_use_version_control_enabled = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/tencent-docs/use-file-viewer-page-show.ts
/**
* 从在线预览 URL 提取 WorkBuddy 私有 `_fid`（C 端免登短链的文档身份），
* 作为在线曝光去重的稳定 fileKey；缺失或非法 URL 时回退调用方的 URL 主路径。
*/
function extractTencentDocsPreviewFileId$1(url) {
	if (!url) return;
	try {
		return new URL(url).searchParams.get("_fid")?.trim() || void 0;
	} catch {
		return;
	}
}
/**
* 订阅本地 + 在线预览曝光边沿，返回供 active-slot 回调使用的薄函数。
*/
function useFileViewerPageShow(options) {
	const { adapterRef, userId, sidebarView, browserUrl, isTencentDocsPreview } = options;
	const userIdRef = (0, import_react$3.useRef)(userId);
	userIdRef.current = userId;
	const reportLocalActiveContext = (0, import_react$3.useCallback)((context) => {
		if (!context?.filePath) return;
		const fields = buildLocalFileViewerPageShowFields(context.filePath);
		const fileKey = normalizeFileViewerFileKey(context.documentResourceUri || context.filePath);
		reportFileViewerPageShow(adapterRef.current, {
			userId: userIdRef.current,
			fileKey,
			pageURL: context.documentResourceUri || context.filePath,
			...fields
		});
	}, [adapterRef]);
	(0, import_react$3.useEffect)(() => {
		if (sidebarView !== "preview" || !browserUrl) return;
		const mode = resolveOnlineFileViewerMode(browserUrl, isTencentDocsPreview);
		if (!mode) return;
		const fileKey = normalizeFileViewerFileKey(extractTencentDocsPreviewFileId$1(browserUrl) || browserUrl);
		const fields = buildOnlineFileViewerPageShowFields(browserUrl, mode);
		reportFileViewerPageShow(adapterRef.current, {
			userId: userIdRef.current,
			fileKey,
			pageURL: browserUrl,
			...fields
		});
	}, [
		adapterRef,
		browserUrl,
		isTencentDocsPreview,
		sidebarView
	]);
	return { reportLocalActiveContext };
}
var import_react$3;
var init_use_file_viewer_page_show = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_file_viewer_telemetry();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/file-version-management/file-version-management-panel.scss
var init_file_version_management_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/file-version-management/file-version-management-panel.tsx
function changeTypeToKind(changeType) {
	switch (changeType) {
		case 0: return "modified";
		case 1: return "deleted";
		case 2: return "added";
		case 3: return "renamed";
		default: return "unknown";
	}
}
/**
* 共享状态 Provider。包在 DetailPanel 外层，让 list / detail 两栏 slot
* 拿到同一份 commits + selection。
*/
function FileVersionManagementProvider({ adapter, sessionId, children }) {
	const [commits, setCommits] = (0, import_react$2.useState)([]);
	const [loading, setLoading] = (0, import_react$2.useState)(false);
	const [selectedCommitId, setSelectedCommitId] = (0, import_react$2.useState)(void 0);
	const [opInflight, setOpInflight] = (0, import_react$2.useState)(void 0);
	const [resetTarget, setResetTarget] = (0, import_react$2.useState)(void 0);
	const [resetConfirmLoading, setResetConfirmLoading] = (0, import_react$2.useState)(false);
	/**
	* 缓存：`${path}|${version}` → 该 (path, version) 的 entry / undefined（=missing）。
	* sandbox-cli 自身保证 cachePath 幂等，这里只是避免重复发 RPC。
	*/
	const versionCacheRef = (0, import_react$2.useRef)(/* @__PURE__ */ new Map());
	const refresh = (0, import_react$2.useCallback)(async () => {
		if (!adapter?.listFileCommits || !sessionId) {
			setCommits([]);
			return;
		}
		setLoading(true);
		try {
			const next = (await adapter.listFileCommits({
				sessionId,
				limit: DEFAULT_LIMIT
			}))?.commits ?? [];
			setCommits(next);
			setSelectedCommitId((prev) => {
				if (prev && next.some((c) => c.commitId === prev)) return prev;
				return next[0]?.commitId;
			});
		} catch (err) {
			toast.error(t("fileVersion.opFailed", { message: err?.message ?? String(err) }));
			setCommits([]);
			setSelectedCommitId(void 0);
		} finally {
			setLoading(false);
		}
	}, [adapter, sessionId]);
	(0, import_react$2.useEffect)(() => {
		refresh().catch(() => void 0);
	}, [refresh]);
	const revertCommit = (0, import_react$2.useCallback)(async (commit) => {
		if (!adapter?.revertFileCommit || !sessionId) return;
		setOpInflight(commit.commitId);
		try {
			const failedFile = (await adapter.revertFileCommit({
				sessionId,
				commitId: commit.commitId
			}))?.files?.find((f) => !f.success);
			if (failedFile) {
				toast.error(t("fileVersion.opFailed", { message: failedFile.error ?? t("fileVersion.unknownError") }));
				await refresh();
			} else {
				toast.success(t("fileVersion.revertSuccess"));
				await refresh();
			}
		} catch (err) {
			toast.error(t("fileVersion.opFailed", { message: err?.message ?? String(err) }));
		} finally {
			setOpInflight(void 0);
		}
	}, [
		adapter,
		sessionId,
		refresh
	]);
	const handleResetConfirm = (0, import_react$2.useCallback)(async () => {
		if (!resetTarget || !adapter?.resetFileCommit || !sessionId) {
			setResetTarget(void 0);
			return;
		}
		setResetConfirmLoading(true);
		try {
			const failedFile = (await adapter.resetFileCommit({
				sessionId,
				commitId: resetTarget.commitId
			}))?.files?.find((f) => !f.success);
			if (failedFile) {
				toast.error(t("fileVersion.opFailed", { message: failedFile.error ?? t("fileVersion.unknownError") }));
				await refresh();
			} else {
				toast.success(t("fileVersion.resetSuccess"));
				setResetTarget(void 0);
				await refresh();
			}
		} catch (err) {
			toast.error(t("fileVersion.opFailed", { message: err?.message ?? String(err) }));
		} finally {
			setResetConfirmLoading(false);
		}
	}, [
		resetTarget,
		adapter,
		sessionId,
		refresh
	]);
	/**
	* 拉取一个 (path, [versions]) 的物化结果，并把每条 entry 写入缓存。
	* 缺失 / 不在响应里的版本号会被显式标记为 undefined（=missing），
	* 后续访问同 (path, version) 走缓存就能立即得到 missing 结论。
	*/
	const fetchVersionCache = (0, import_react$2.useCallback)(async (path, versions) => {
		if (!adapter?.queryFileVersionCache || !sessionId || versions.length === 0) {
			for (const v of versions) versionCacheRef.current.set(`${path}|${v}`, void 0);
			return;
		}
		const result = await adapter.queryFileVersionCache({
			sessionId,
			relativePath: path,
			versions
		});
		const got = /* @__PURE__ */ new Set();
		for (const e of result?.entries ?? []) {
			versionCacheRef.current.set(`${path}|${e.version}`, e);
			got.add(e.version);
		}
		for (const v of versions) if (!got.has(v)) versionCacheRef.current.set(`${path}|${v}`, void 0);
	}, [adapter, sessionId]);
	const entryToSlot = (0, import_react$2.useCallback)((entry) => {
		if (!entry) return { kind: "missing" };
		if (entry.isBinary) return { kind: "binary" };
		if (entry.oversize) return {
			kind: "oversize",
			fileSize: entry.fileSize
		};
		return {
			kind: "text",
			content: entry.content ?? ""
		};
	}, []);
	const loadFileVersionDiff = (0, import_react$2.useCallback)(async (file) => {
		const beforePath = file.oldPath ?? file.relativePath;
		const afterPath = file.relativePath;
		const beforeVer = file.versionBefore;
		const afterVer = file.versionAfter;
		const pending = /* @__PURE__ */ new Map();
		const ensure = (p, v) => {
			if (typeof v !== "number") return;
			if (versionCacheRef.current.has(`${p}|${v}`)) return;
			const set = pending.get(p) ?? /* @__PURE__ */ new Set();
			set.add(v);
			pending.set(p, set);
		};
		ensure(beforePath, beforeVer);
		ensure(afterPath, afterVer);
		await Promise.all(Array.from(pending.entries()).map(([p, vs]) => fetchVersionCache(p, Array.from(vs))));
		return {
			before: typeof beforeVer === "number" ? entryToSlot(versionCacheRef.current.get(`${beforePath}|${beforeVer}`)) : { kind: "absent" },
			after: typeof afterVer === "number" ? entryToSlot(versionCacheRef.current.get(`${afterPath}|${afterVer}`)) : { kind: "absent" }
		};
	}, [entryToSlot, fetchVersionCache]);
	const value = (0, import_react$2.useMemo)(() => ({
		commits,
		loading,
		selectedCommitId,
		selectCommit: setSelectedCommitId,
		refresh,
		revertCommit,
		requestReset: setResetTarget,
		opInflightCommitId: opInflight,
		loadFileVersionDiff
	}), [
		commits,
		loading,
		selectedCommitId,
		refresh,
		revertCommit,
		opInflight,
		loadFileVersionDiff
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(FileVersionContext.Provider, {
		value,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ConfirmDialog, {
			visible: !!resetTarget,
			title: t("fileVersion.resetConfirmTitle"),
			content: t("fileVersion.resetConfirmBody"),
			confirmText: t("fileVersion.confirmReset"),
			cancelText: t("fileVersion.cancel"),
			confirmVariant: "primary",
			confirmLoading: resetConfirmLoading,
			onClose: () => setResetTarget(void 0),
			onConfirm: handleResetConfirm
		})]
	});
}
function useFileVersionContext() {
	return (0, import_react$2.useContext)(FileVersionContext);
}
/**
* 左栏 commit 列表。读取 FileVersionContext。
*/
function FileVersionListPanel() {
	const ctx = useFileVersionContext();
	(0, import_react$2.useEffect)(() => {
		ctx?.refresh().catch(() => void 0);
	}, []);
	if (!ctx) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "file-version-management-panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "file-version-management-panel__empty",
			children: t("fileVersion.empty")
		})
	});
	const { commits, loading, refresh, selectedCommitId, selectCommit, revertCommit, requestReset, opInflightCommitId } = ctx;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "file-version-management-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "file-version-management-panel__header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "file-version-management-panel__title",
				children: t("fileVersion.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				type: "button",
				className: "file-version-management-panel__refresh",
				onClick: refresh,
				disabled: loading,
				"aria-label": t("fileVersion.refresh"),
				title: t("fileVersion.refresh"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RefreshIcon, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "file-version-management-panel__body",
			children: loading && commits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "file-version-management-panel__empty",
				children: t("fileVersion.loading")
			}) : commits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "file-version-management-panel__empty",
				children: t("fileVersion.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", {
				className: "file-version-management-panel__list",
				children: commits.map((commit, idx) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CommitRow, {
					commit,
					selected: commit.commitId === selectedCommitId,
					opInflight: opInflightCommitId === commit.commitId,
					isHead: idx === 0,
					onSelect: () => selectCommit(commit.commitId),
					onRevert: () => {
						revertCommit(commit).catch(() => void 0);
					},
					onReset: () => requestReset(commit)
				}, commit.commitId))
			})
		})]
	});
}
/**
* 右栏 commit 文件明细。读取 FileVersionContext 中的 selectedCommitId。
*/
function FileVersionDetailView() {
	const ctx = useFileVersionContext();
	const selected = (0, import_react$2.useMemo)(() => {
		if (!ctx?.selectedCommitId) return;
		return ctx.commits.find((c) => c.commitId === ctx.selectedCommitId);
	}, [ctx?.commits, ctx?.selectedCommitId]);
	const [expandedKey, setExpandedKey] = (0, import_react$2.useState)(void 0);
	(0, import_react$2.useEffect)(() => {
		setExpandedKey(void 0);
	}, [selected?.commitId]);
	if (!selected) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "file-version-detail",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "file-version-detail__empty",
			children: t("fileVersion.detailEmpty")
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "file-version-detail",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "file-version-detail__header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "file-version-detail__head-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "file-version-detail__id",
							title: selected.commitId,
							children: shortCommitId(selected.commitId)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "file-version-detail__time",
							children: formatRelativeTime(selected.createTimeMs)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "file-version-detail__op",
							children: selected.operationType
						})
					]
				}),
				selected.message ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "file-version-detail__message",
					children: selected.message
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "file-version-detail__summary",
					children: t("fileVersion.filesChanged", { count: selected.files?.length ?? 0 })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", {
			className: "file-version-detail__files",
			children: (selected.files ?? []).map((f, idx) => {
				const key = `${f.relativePath}-${idx}`;
				return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DetailFileRow, {
					rowKey: key,
					file: f,
					expanded: expandedKey === key,
					onToggle: () => setExpandedKey((prev) => prev === key ? void 0 : key),
					loadDiff: ctx?.loadFileVersionDiff
				}, key);
			})
		})]
	});
}
function DetailFileRow({ file, expanded, onToggle, loadDiff }) {
	const kind = changeTypeToKind(file.changeType);
	const [diff, setDiff] = (0, import_react$2.useState)(void 0);
	const [diffLoading, setDiffLoading] = (0, import_react$2.useState)(false);
	const [diffError, setDiffError] = (0, import_react$2.useState)(void 0);
	(0, import_react$2.useEffect)(() => {
		if (!expanded || !loadDiff) return;
		let cancelled = false;
		setDiffLoading(true);
		setDiffError(void 0);
		loadDiff(file).then((pair) => {
			if (cancelled) return;
			setDiff(pair);
		}).catch((err) => {
			if (cancelled) return;
			setDiffError(err?.message ?? String(err));
		}).finally(() => {
			if (cancelled) return;
			setDiffLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		expanded,
		loadDiff,
		file
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("li", {
		className: `file-version-detail-file file-version-detail-file--${kind}${expanded ? " file-version-detail-file--expanded" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "file-version-detail-file__head",
			role: "button",
			tabIndex: 0,
			onClick: onToggle,
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onToggle();
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: `file-version-detail-file__badge file-version-detail-file__badge--${kind}`,
					title: t(changeKindI18nKey(kind)),
					children: badgeChar(kind)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "file-version-detail-file__path",
					title: file.relativePath,
					children: kind === "renamed" && file.oldPath ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "file-version-detail-file__old",
							children: file.oldPath
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "file-version-detail-file__arrow",
							children: " → "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: file.relativePath })
					] }) : file.relativePath
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: "file-version-detail-file__chevron",
					"aria-hidden": "true",
					children: expanded ? "▾" : "▸"
				})
			]
		}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "file-version-detail-file__diff",
			children: diffLoading ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "file-version-detail-file__diff-msg",
				children: t("fileVersion.diffLoading")
			}) : diffError ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "file-version-detail-file__diff-msg",
				children: t("fileVersion.opFailed", { message: diffError })
			}) : diff ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DiffSlotView, {
				pair: diff,
				fileName: file.relativePath
			}) : null
		}) : null]
	});
}
/**
* 根据 before / after 两侧 slot 决定渲染 Monaco diff 还是文字提示。
* 任一侧 binary / oversize / missing 都不展示 diff，避免误读二进制成乱码。
*/
function DiffSlotView({ pair, fileName }) {
	const { before, after } = pair;
	if (before.kind === "binary" || after.kind === "binary") return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "file-version-detail-file__diff-msg",
		children: t("fileVersion.binaryNotSupported")
	});
	if (before.kind === "missing" || after.kind === "missing") return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "file-version-detail-file__diff-msg",
		children: t("fileVersion.versionMissing")
	});
	if (before.kind === "oversize" || after.kind === "oversize") return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "file-version-detail-file__diff-msg",
		children: t("fileVersion.oversize", { size: formatFileSize(before.kind === "oversize" ? before.fileSize : after.kind === "oversize" ? after.fileSize : 0) })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "file-version-detail-file__diff-body",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DiffViewer, {
			oldCode: before.kind === "text" ? before.content : "",
			newCode: after.kind === "text" ? after.content : "",
			fileName
		})
	});
}
function CommitRow({ commit, selected, opInflight, isHead, onSelect, onRevert, onReset }) {
	const handleRevert = (e) => {
		e.stopPropagation();
		onRevert();
	};
	const handleReset = (e) => {
		e.stopPropagation();
		onReset();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("li", {
		className: `file-version-commit-row${selected ? " file-version-commit-row--selected" : ""}`,
		onClick: onSelect,
		role: "button",
		tabIndex: 0,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onSelect();
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "file-version-commit-row__head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "file-version-commit-row__id",
						title: commit.commitId,
						children: shortCommitId(commit.commitId)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "file-version-commit-row__time",
						children: formatRelativeTime(commit.createTimeMs)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "file-version-commit-row__op",
						children: commit.operationType
					})
				]
			}),
			commit.message ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
				content: commit.message,
				delay: 150,
				maxWidth: 420,
				textAlign: "left",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "file-version-commit-row__message",
					children: commit.message
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "file-version-commit-row__summary",
				children: t("fileVersion.filesChanged", { count: commit.files?.length ?? 0 })
			}),
			!isHead ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "file-version-commit-row__actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
					content: t("fileVersion.revertTip"),
					delay: 150,
					maxWidth: 280,
					textAlign: "left",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
						type: "button",
						className: "file-version-commit-row__btn",
						onClick: handleRevert,
						disabled: opInflight,
						children: t("fileVersion.revert")
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
					content: t("fileVersion.resetTip"),
					delay: 150,
					maxWidth: 280,
					textAlign: "left",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
						type: "button",
						className: "file-version-commit-row__btn file-version-commit-row__btn--danger",
						onClick: handleReset,
						disabled: opInflight,
						children: t("fileVersion.reset")
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "file-version-commit-row__head-badge",
				children: t("fileVersion.headBadge")
			})
		]
	});
}
function changeKindI18nKey(kind) {
	switch (kind) {
		case "added": return "fileVersion.changeType.created";
		case "modified": return "fileVersion.changeType.modified";
		case "deleted": return "fileVersion.changeType.deleted";
		case "renamed": return "fileVersion.changeType.renamed";
		default: return "fileVersion.changeType.modified";
	}
}
function badgeChar(kind) {
	switch (kind) {
		case "added": return "A";
		case "modified": return "M";
		case "deleted": return "D";
		case "renamed": return "R";
		default: return "?";
	}
}
function shortCommitId(id) {
	if (!id) return "";
	return id.length > 8 ? id.slice(0, 8) : id;
}
function formatRelativeTime(ms) {
	if (!ms || typeof ms !== "number") return "";
	const d = new Date(ms);
	if (Number.isNaN(d.getTime())) return "";
	const pad = (n) => n < 10 ? `0${n}` : `${n}`;
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function formatFileSize(bytes) {
	if (!bytes || bytes < 1024) return `${bytes ?? 0} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function RefreshIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("polyline", { points: "23 4 23 10 17 10" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("polyline", { points: "1 20 1 14 7 14" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
		]
	});
}
var import_react$2, import_jsx_runtime$2, DEFAULT_LIMIT, FileVersionContext;
var init_file_version_management_panel = __esmMin((() => {
	init_file_version_management_panel$1();
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	import_jsx_runtime$2 = require_jsx_runtime();
	DEFAULT_LIMIT = 50;
	FileVersionContext = (0, import_react$2.createContext)(void 0);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/file-version-management/index.ts
var init_file_version_management = __esmMin((() => {
	init_file_version_management_panel();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tencent-docs-link-preview/enterprise-docs-webview-body.less
var init_enterprise_docs_webview_body$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tencent-docs-link-preview/enterprise-docs-webview-body.tsx
var import_react$1, import_jsx_runtime$1, ENTERPRISE_PREVIEW_PARTITION, EnterpriseDocsWebviewBody;
var init_enterprise_docs_webview_body = __esmMin((() => {
	init_enterprise_docs_webview_body$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_use_is_enterprise_admin();
	init_use_tencent_docs_ai_edit_enterprise_feature();
	init_tencent_docs();
	init_services();
	init_tencent_docs_url();
	import_jsx_runtime$1 = require_jsx_runtime();
	ENTERPRISE_PREVIEW_PARTITION = "persist:tdoc-preview";
	EnterpriseDocsWebviewBody = ({ url, fileId, previewSource }) => {
		const adapter = useAdapter();
		const tencentDocs = useTencentDocsFacade();
		const { currentConversation } = useConversations();
		const edition = useEffectiveEdition();
		const aiEditEnterpriseEnabled = useTencentDocsAiEditEnterpriseFeature();
		/** cookie 注入完成后再渲染 webview，避免首屏 401 / 兜底登录页（issue #39357 截图场景）。 */
		const [cookieReady, setCookieReady] = (0, import_react$1.useState)(false);
		/** preload file:// URL，与 PreviewModal 同步状态机：undefined / null / string。 */
		const [previewPreloadUrl, setPreviewPreloadUrl] = (0, import_react$1.useState)(void 0);
		/**
		* 对话标记是否已 seed 到主进程。webview 渲染的第三道闸门（仅企业灰度命中时生效）：
		* 命中时必须先把 pending(aiEdit:true intent) 写到主进程（按 host），保证 guest preload
		* 首帧 sendSync 能读到对话标记（主进程再按企业 key AND 现算出 aiEdit:true）；seed 完成
		* （或未命中 / 非对话 / bridge 不可用）后才渲染 webview。
		*/
		const [featureFlagSeeded, setFeatureFlagSeeded] = (0, import_react$1.useState)(false);
		const webviewRef = (0, import_react$1.useRef)(null);
		(0, import_react$1.useEffect)(() => {
			setCookieReady(false);
			setPreviewPreloadUrl(void 0);
			setFeatureFlagSeeded(false);
		}, [url]);
		(0, import_react$1.useEffect)(() => {
			let cancelled = false;
			setFeatureFlagSeeded(false);
			const sessionId = resolveDocumentPreviewSessionId({
				source: previewSource,
				currentSessionId: currentConversation?.id
			});
			const update = window.__workbuddyUpdateDocsFeatureList;
			if (!aiEditEnterpriseEnabled || !sessionId || typeof update !== "function") {
				setFeatureFlagSeeded(true);
				return;
			}
			update({ aiEdit: true }).catch(() => {}).finally(() => {
				if (!cancelled) setFeatureFlagSeeded(true);
			});
			return () => {
				cancelled = true;
			};
		}, [
			aiEditEnterpriseEnabled,
			previewSource,
			currentConversation?.id,
			url
		]);
		(0, import_react$1.useEffect)(() => {
			let cancelled = false;
			(async () => {
				try {
					const result = await tencentDocs.prepareEnterpriseDocPreview();
					if (cancelled) return;
					if (!result.ok) console.warn("[TencentDocs][LinkPreview] prepareEnterpriseDocPreview not ok", { reason: result.reason });
				} catch (err) {
					if (cancelled) return;
					console.warn("[TencentDocs][LinkPreview] prepareEnterpriseDocPreview failed", err);
				} finally {
					if (!cancelled) setCookieReady(true);
				}
			})();
			return () => {
				cancelled = true;
			};
		}, [url, tencentDocs]);
		(0, import_react$1.useEffect)(() => {
			if (!fileId || typeof window.__workbuddyRegisterOnlineDocPreview !== "function") return;
			const sessionId = resolveDocumentPreviewSessionId({
				source: previewSource,
				currentSessionId: currentConversation?.id
			});
			window.__workbuddyRegisterOnlineDocPreview(fileId, sessionId).catch((err) => {
				console.warn("[TencentDocs][LinkPreview] registerOnlineDocPreview failed", err);
			});
			return () => {
				if (typeof window.__workbuddyUnregisterOnlineDocPreview === "function") window.__workbuddyUnregisterOnlineDocPreview(fileId).catch((err) => {
					console.warn("[TencentDocs][LinkPreview] unregisterOnlineDocPreview failed", err);
				});
			};
		}, [
			fileId,
			currentConversation?.id,
			previewSource,
			url
		]);
		(0, import_react$1.useEffect)(() => {
			let cancelled = false;
			const resolver = window.__getTdocPreviewPreloadUrl;
			if (typeof resolver !== "function") {
				console.warn("[TencentDocs][LinkPreview] __getTdocPreviewPreloadUrl unavailable; in-doc link clicks may be swallowed by docs.qq.com SPA.");
				setPreviewPreloadUrl(null);
				return;
			}
			Promise.resolve().then(() => resolver()).then((u) => {
				if (cancelled) return;
				setPreviewPreloadUrl(typeof u === "string" && u.length > 0 ? u : null);
			}).catch((err) => {
				if (cancelled) return;
				console.warn("[TencentDocs][LinkPreview] resolve preload url failed", err);
				setPreviewPreloadUrl(null);
			});
			return () => {
				cancelled = true;
			};
		}, [url]);
		(0, import_react$1.useEffect)(() => {
			if (!cookieReady || previewPreloadUrl === void 0) return;
			const webview = webviewRef.current;
			if (!webview) return;
			let businessHandlersAttached = false;
			const openInBrowser = (rawUrl) => {
				if (adapter && typeof adapter.openExternal === "function") adapter.openExternal(rawUrl).catch((err) => {
					console.warn("[TencentDocs][LinkPreview] openExternal failed", err);
					window.open(rawUrl, "_blank", "noopener,noreferrer");
				});
				else window.open(rawUrl, "_blank", "noopener,noreferrer");
			};
			/** 在当前 webview 内打开 URL（「新建文档」等需留在 webview 的场景）。 */
			const navigateWebviewInPlace = (rawUrl) => {
				const wv = webview;
				if (typeof wv.loadURL === "function") wv.loadURL(rawUrl).catch((err) => {
					console.warn("[TencentDocs][LinkPreview] webview.loadURL failed, fallback to browser", err);
					openInBrowser(rawUrl);
				});
				else openInBrowser(rawUrl);
			};
			/** 顶级导航分流：新建文档留 webview；其余第三方外链 → 系统浏览器。 */
			const routeCapturedUrl = (rawUrl) => {
				if (isInPlaceCreateFileUrl(rawUrl)) navigateWebviewInPlace(rawUrl);
				else openInBrowser(rawUrl);
			};
			/**
			* 顶级导航 / 重定向的统一外抛闸门。
			*
			* 关键修复：chip 点击先 getPreviewUrl 拿到 temp-login-url，webview 加载后会
			* 重定向回真正的文档 URL；这条 login → doc 重定向（及文档自身多跳导航）属于
			* 腾讯文档域内导航，必须留在 webview。旧逻辑用 firstNavigationDone（只放行
			* 第一跳）会把它误判成外链 → openExternal 呼起系统浏览器。改为按 host 判定：
			* 只有真正的第三方外链才外抛，腾讯文档本体 + QQ 登录链路一律留在 webview。
			*/
			const externalizeIfNeeded = (ev) => {
				if (!ev?.url) return;
				if (!shouldOpenTencentDocsPreviewLinkExternally(ev.url, edition)) return;
				ev.preventDefault?.();
				routeCapturedUrl(ev.url);
			};
			const onWillNavigate = (event) => {
				externalizeIfNeeded(event);
			};
			const onWillRedirect = (event) => {
				externalizeIfNeeded(event);
			};
			const onWillFrameNavigate = (event) => {
				const ev = event;
				if (ev?.isMainFrame === false) return;
				externalizeIfNeeded(ev);
			};
			const onIpcMessage = (event) => {
				const ev = event;
				if (ev?.channel === "tdoc-preview:navigate-in-place") {
					const payload = ev.args?.[0];
					if (typeof payload?.url === "string" && payload.url) navigateWebviewInPlace(payload.url);
					return;
				}
				if (ev?.channel !== "tdoc-preview:open-external") return;
				const payload = ev.args?.[0];
				if (typeof payload?.url === "string" && payload.url) openInBrowser(payload.url);
			};
			const attachHandlers = () => {
				if (businessHandlersAttached) return;
				businessHandlersAttached = true;
				webview.addEventListener("will-navigate", onWillNavigate);
				webview.addEventListener("will-redirect", onWillRedirect);
				webview.addEventListener("will-frame-navigate", onWillFrameNavigate);
				webview.addEventListener("ipc-message", onIpcMessage);
			};
			const wv = webview;
			let alreadyAttached = false;
			try {
				const id = wv.getWebContentsId?.();
				alreadyAttached = typeof id === "number" && id > 0;
			} catch {
				alreadyAttached = false;
			}
			const onDidAttach = () => attachHandlers();
			if (alreadyAttached) attachHandlers();
			else webview.addEventListener("did-attach", onDidAttach);
			return () => {
				webview.removeEventListener("did-attach", onDidAttach);
				if (businessHandlersAttached) {
					webview.removeEventListener("will-navigate", onWillNavigate);
					webview.removeEventListener("will-redirect", onWillRedirect);
					webview.removeEventListener("will-frame-navigate", onWillFrameNavigate);
					webview.removeEventListener("ipc-message", onIpcMessage);
				}
			};
		}, [
			url,
			adapter,
			cookieReady,
			previewPreloadUrl,
			edition
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "tdoc-embed-webview",
			children: cookieReady && previewPreloadUrl !== void 0 && featureFlagSeeded ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("webview", {
				ref: webviewRef,
				className: "tdoc-embed-webview__webview",
				src: url,
				partition: ENTERPRISE_PREVIEW_PARTITION,
				webpreferences: "contextIsolation=yes",
				allowpopups: true,
				...previewPreloadUrl ? { preload: previewPreloadUrl } : {}
			}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "tdoc-embed-webview__loading",
				children: "加载中..."
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tencent-docs-link-preview/index.ts
var init_tencent_docs_link_preview = __esmMin((() => {
	init_enterprise_docs_webview_body();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/detail-panel-wrapper/index.tsx
function normalizeNetDriveUploadPath(filePath) {
	if (filePath.startsWith("agent://")) try {
		return decodeURIComponent(new URL(filePath).pathname);
	} catch {
		return filePath.replace(/^agent:\/\//, "");
	}
	if (filePath.startsWith("file://")) try {
		return decodeURIComponent(new URL(filePath).pathname);
	} catch {
		return filePath.replace(/^file:\/\//, "");
	}
	return filePath;
}
/**
* 企业版在线文档 webview 没有 `getPreviewUrl` 这一步；若 URL 已带 `_fid`，
* 在挂载 webview 时把 fileId 交给注册逻辑，session 绑定仍由 previewSource 统一判断。
*/
function extractTencentDocsPreviewFileId(url) {
	if (!url) return;
	try {
		return new URL(url).searchParams.get("_fid")?.trim() || void 0;
	} catch {
		return;
	}
}
function isPlanTaskToolCall(tool) {
	return tool.name === "todo_write" || tool.name === "TodoWrite";
}
function extractPlanTaskTodos(tool) {
	const args = tool.args;
	const result = tool.result;
	if (Array.isArray(result?.result?.todos)) return result?.result?.todos ?? [];
	const rawTodos = args?.todos;
	if (typeof rawTodos === "string") try {
		const parsed = JSON.parse(rawTodos);
		if (Array.isArray(parsed)) return parsed;
	} catch {
		return [];
	}
	if (Array.isArray(rawTodos)) return rawTodos;
	const newTodos = Array.isArray(args?.newTodos) ? args.newTodos : [];
	return [...Array.isArray(args?.oldTodos) ? args.oldTodos : [], ...newTodos];
}
function shouldHideEmptyPlanTaskTool(tool) {
	return isPlanTaskToolCall(tool) && extractPlanTaskTodos(tool).length === 0;
}
var import_react, import_jsx_runtime, DetailPanelCachedToolRenderer, ARDOT_OPEN_DESIGN_APP_ID, DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE, DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX, ARDOT_AUTH_CLOSE_AND_OPEN_CANVAS_EVENT, DetailPanelAuthOverlay, DetailPanelWrapper;
var init_detail_panel_wrapper = __esmMin((() => {
	init_src$2();
	init_src();
	init_src$1();
	init_doc_artifact_source();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_account_context();
	init_product_features();
	init_use_ima_api();
	init_use_ima_enabled();
	init_use_is_enterprise_admin();
	init_use_knowledge_base_feature();
	init_use_latest_ref();
	init_use_oneid_applications();
	init_use_tencent_docs_knowledge_feature();
	init_use_tencent_lexiang_enabled();
	init_use_tencent_netdrive_knowledge_feature();
	init_use_version_control_enabled();
	init_i18n();
	init_useI18n();
	init_project_input_context();
	init_common();
	init_expert();
	init_tencent_docs();
	init_jump_to_conversation_payload();
	init_local_file_open();
	init_open_conflict_ui_coordinator();
	init_use_file_viewer_page_show();
	init_router();
	init_app_providers();
	init_telemetry();
	init_ardot_canvas();
	init_artifact_drag_resolver();
	init_environment();
	init_errors();
	init_file_path();
	init_html_artifact_preview();
	init_session_kind();
	init_tencent_docs_url();
	init_useTheme();
	init_canvas_telemetry();
	init_conversation_status();
	init_file_version_management();
	init_icons();
	init_ima();
	init_telemetry$3();
	init_knowledge_base_panel();
	init_netdrive_service();
	init_upload_modal();
	init_netdrive_store_context();
	init_store();
	init_telemetry$2();
	init_mime_utils();
	init_link_handler();
	init_telemetry$1();
	init_api();
	init_lexiang_kb_picker();
	init_use_describe_upload_error();
	init_use_lexiang_library_mode();
	init_task_starter_store();
	init_use_assistant_display();
	init_selection_quote();
	init_tencent_docs_link_preview();
	init_tools();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	DetailPanelCachedToolRenderer = import_react.memo(({ tool, adapter, sessionId, onFileClick, onPreviewUrlClick, compact }) => {
		if (shouldHideEmptyPlanTaskTool(tool)) return null;
		const renderer = toolRendererRegistry.getRenderer(tool);
		const disableCreditsConsumed = (0, import_react.useMemo)(() => {
			if (typeof window !== "undefined" && window.PRODUCT_FEATURES) try {
				return !!JSON.parse(window.PRODUCT_FEATURES)?.DisableCreditsConsumed;
			} catch {
				return false;
			}
			return false;
		}, []);
		const toolContext = (0, import_react.useMemo)(() => ({
			resultVisible: true,
			setResultVisible: () => {},
			adapter,
			sessionId,
			onFileClick,
			onPreviewUrlClick,
			disableCreditsConsumed,
			compact
		}), [
			adapter,
			sessionId,
			onFileClick,
			onPreviewUrlClick,
			disableCreditsConsumed,
			compact
		]);
		const toolElement = (0, import_react.useMemo)(() => renderer?.render?.(tool, void 0, toolContext) ?? null, [
			renderer,
			tool,
			toolContext
		]);
		const explanation = resolveToolExplanation(tool);
		if (explanation && toolElement) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tool-with-explanation",
			"data-chat-search-skip": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tool-explanation-text",
				children: `${explanation}`
			}), toolElement]
		});
		return toolElement;
	}, (prevProps, nextProps) => prevProps.tool === nextProps.tool && prevProps.sessionId === nextProps.sessionId && prevProps.onFileClick === nextProps.onFileClick && prevProps.onPreviewUrlClick === nextProps.onPreviewUrlClick && prevProps.compact === nextProps.compact);
	DetailPanelCachedToolRenderer.displayName = "DetailPanelCachedToolRenderer";
	ARDOT_OPEN_DESIGN_APP_ID = "ardot/open_design";
	DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE = "ardot-open-design-canvas";
	DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX = "design-new-canvas";
	ARDOT_AUTH_CLOSE_AND_OPEN_CANVAS_EVENT = "ardot-auth:close-and-open-canvas";
	DetailPanelAuthOverlay = ({ onCancel, onAuthorize }) => {
		const visible = useArdotAuthStore((state) => state.visible);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			ensureArdotAuthStyles();
		}, [visible]);
		const handleClose = (0, import_react.useCallback)(() => {
			Promise.resolve(onCancel ? onCancel() : ardotAuthStore.getState().close()).catch((error) => {
				console.warn("[DetailPanelAuthOverlay] cancel failed:", error);
			});
		}, [onCancel]);
		const handleAuthorize = (0, import_react.useCallback)(() => {
			Promise.resolve(onAuthorize?.()).catch((error) => {
				console.warn("[DetailPanelAuthOverlay] authorize failed:", error);
			});
		}, [onAuthorize]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "detail-design-auth-overlay",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ardot-auth-modal detail-design-auth-overlay__modal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArdotAuthContent, {
					onCancel: handleClose,
					onAuthorize: handleAuthorize
				})
			})
		});
	};
	DetailPanelWrapper = import_react.memo(({ width, narrowOverviewLayout, detailInfo, isPreviewFullscreen, onTogglePreviewFullscreen, showMediaPreviewFullscreenButton = false, PanelComponent, canSaveArtifactToLibrary = true, disableArtifactToolbarActions = false, disableArtifactUploadActions = false, hideHeaderDebugTools = false, forceCloudEnvironment = false, disableDocumentSdkPreview = false, documentPreviewSource = "session-open", getDocumentPreviewUrlOverride, canUseDocumentPreviewForFilePath, registerBeforeSelectFilePath, onOpenInternalBrowser }) => {
		const ActivePanel = PanelComponent ?? DetailPanel;
		const t = useTranslation();
		const context = import_react.useContext(ConversationsContext);
		const adapter = useAdapter();
		const agentServices = useAgentServices();
		const openImaUploadResult = useOpenImaUploadResult();
		const { account } = useAccount();
		const enterpriseId = account?.enterpriseId ?? "";
		const tencentDocs = agentServices?.tencentDocs;
		const localDocs = agentServices?.localDocs;
		const myFiles = agentServices?.myFiles;
		const projectChat = agentServices?.projectChat;
		const locale = useLocale();
		const { checkAuth, authConnector, authRevoke } = useArdotAuth(adapter);
		const { theme: currentTheme, vsCodeThemeName: themeName } = useTheme();
		const isShareEnabled = useShareFeature();
		const isHtmlShareEnabled = useHtmlPreviewShareFeature();
		const assistantDisplay = useAssistantDisplay(adapter ?? void 0);
		const router = useRouterContextSafe();
		const navigate = useNavigate();
		const moduleHost = useOptionalModuleHost();
		const isCompactMode = true;
		const [documentPreviewLocale, setDocumentPreviewLocale] = (0, import_react.useState)(getLocale);
		const knowledgeBaseEnabled = useKnowledgeBaseFeature();
		const tencentDocsKnowledgeEnabled = useTencentDocsKnowledgeFeature();
		const tencentNetDriveKnowledgeEnabled = useTencentNetDriveKnowledgeFeature();
		const { enabled: tencentLexiangEnabled } = useTencentLexiangEnabled();
		const { enabled: imaEnabled, isPersonalUser } = useImaEnabled();
		const isEnterpriseEdition = useIsEnterpriseEdition();
		const { applications: oneidApplications, error: oneidError } = useOneidApplications();
		const shouldBypassLexiangConnectorAuth = useLexiangLibraryMode() === "iframe";
		const enterpriseDocActivated = (0, import_react.useMemo)(() => {
			if (!isEnterpriseEdition) return false;
			return findOneidApp(oneidApplications, "doc")?.enabled === true;
		}, [isEnterpriseEdition, oneidApplications]);
		const enterpriseLexiangActivated = (0, import_react.useMemo)(() => {
			if (!isEnterpriseEdition) return false;
			return findOneidApp(oneidApplications, "lexiang")?.enabled === true;
		}, [isEnterpriseEdition, oneidApplications]);
		const enterpriseOneidUnavailable = (0, import_react.useMemo)(() => isEnterpriseEdition && !!oneidError, [isEnterpriseEdition, oneidError]);
		const currentSessionId = context?.currentConversation?.id || "";
		const conversationProjectId = context?.currentConversation?.projectId;
		const isProjectSession = !!router?.params.projectId && !!currentSessionId && !!projectChat?.getSandboxId?.(currentSessionId) || !!conversationProjectId;
		const hasProjectSandbox = !!currentSessionId && !!projectChat?.getSandboxId?.(currentSessionId);
		const effectiveEnvironmentType = forceCloudEnvironment || isProjectSession && hasProjectSandbox ? "cloud" : adapter.environmentType;
		const uploadTargets = (0, import_react.useMemo)(() => ({
			tencentNetdrive: canSaveArtifactToLibrary && !isProjectSession && tencentNetDriveKnowledgeEnabled,
			tencentDocs: !isProjectSession && tencentDocsKnowledgeEnabled && (isPersonalUser || isEnterpriseEdition && (enterpriseDocActivated || enterpriseOneidUnavailable)),
			imaKnowledge: !isProjectSession && imaEnabled,
			tencentLexiang: !isProjectSession && tencentLexiangEnabled && (isPersonalUser || isEnterpriseEdition && (enterpriseLexiangActivated || enterpriseOneidUnavailable)),
			projectAsset: isProjectSession && canSaveArtifactToLibrary && tencentNetDriveKnowledgeEnabled
		}), [
			canSaveArtifactToLibrary,
			isProjectSession,
			isPersonalUser,
			isEnterpriseEdition,
			enterpriseDocActivated,
			enterpriseLexiangActivated,
			enterpriseOneidUnavailable,
			tencentDocsKnowledgeEnabled,
			tencentNetDriveKnowledgeEnabled,
			tencentLexiangEnabled,
			imaEnabled
		]);
		const hasPersonalTargets = uploadTargets.tencentNetdrive || uploadTargets.tencentDocs || uploadTargets.imaKnowledge || uploadTargets.tencentLexiang;
		const uploadToCloudEnabled = isWorkBuddy() && (knowledgeBaseEnabled && hasPersonalTargets || uploadTargets.projectAsset);
		const uploadTargetIcons = (0, import_react.useMemo)(() => ({
			tencentDocs: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentDocsIcon0509, {
				width: 22,
				height: 22
			}),
			imaKnowledge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaKnowledgeIcon0509, {
				width: 22,
				height: 22
			}),
			tencentLexiang: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentLexiangIcon0509, {
				width: 22,
				height: 22
			})
		}), []);
		const adapterRef = (0, import_react.useRef)(adapter);
		adapterRef.current = adapter;
		const contextRef = (0, import_react.useRef)(context);
		contextRef.current = context;
		const resolvePreviewUrl = (0, import_react.useCallback)((sessionId, url) => {
			const resolver = adapterRef.current?.resolvePreviewUrl;
			if (!resolver) return Promise.reject(/* @__PURE__ */ new Error("resolvePreviewUrl not available"));
			const conversation = contextRef.current?.currentConversation;
			const resolvedSessionId = conversation && sessionId === conversation.id && conversation.runtimeId ? conversation.runtimeId : sessionId;
			return resolver.call(adapterRef.current, resolvedSessionId, url);
		}, []);
		const hasResolvePreviewUrlCapability = !!adapter?.resolvePreviewUrl;
		const projectInput = useProjectInput();
		const projectInputRef = (0, import_react.useRef)(projectInput);
		projectInputRef.current = projectInput;
		const wrappedSubscribeFileChange = (0, import_react.useCallback)((filePath, callback) => {
			const ad = adapterRef.current;
			const sub = ad?.subscribeFileChange;
			if (!sub) return () => {};
			const unsubscribe = sub.call(ad, filePath, callback);
			return () => {
				try {
					unsubscribe();
				} catch {}
			};
		}, []);
		const wrappedSaveFile = (0, import_react.useCallback)(async (filePath, content) => {
			const ad = adapterRef.current;
			if (!ad?.writeFile) return;
			const sessionId = contextRef.current?.currentConversation?.id ?? "";
			const result = await ad.writeFile(sessionId, filePath, content, { allowedDirs: [filePath] });
			if (!result.success) throw new Error(result.error ?? "writeFile failed");
		}, []);
		const wrappedCheckFileExists = (0, import_react.useCallback)(async (filePath) => {
			const ad = adapterRef.current;
			if (!ad?.checkFileExists) return true;
			try {
				return await ad.checkFileExists(filePath);
			} catch {
				return true;
			}
		}, []);
		const wrappedSelectionQuoteSend = (0, import_react.useCallback)((event) => {
			const phraseBlock = buildSelectionQuotePhraseBlock(event);
			const pi = projectInputRef.current;
			if (pi?.submitInput) {
				const blocks = event.message ? [phraseBlock, {
					type: "text",
					text: event.message
				}] : [phraseBlock];
				pi.submitInput(blocks);
				return;
			}
			const ad = adapterRef.current;
			if (!ad?.requestSendPrompt) return;
			const sessionId = contextRef.current?.currentConversation?.id;
			if (!sessionId) return;
			const blocks = event.message ? [phraseBlock, {
				type: "text",
				text: event.message
			}] : [phraseBlock];
			ad.requestSendPrompt({
				sessionId,
				prompt: blocks
			});
		}, []);
		const wrappedSelectionQuoteInsert = (0, import_react.useCallback)((event) => {
			const phraseBlock = buildSelectionQuotePhraseBlock(event);
			const pi = projectInputRef.current;
			if (pi) {
				const blocks = [phraseBlock];
				if (event.message) blocks.push({
					type: "text",
					text: event.message
				});
				pi.insertContentBlocks(blocks);
				return;
			}
			const ad = adapterRef.current;
			if (!ad?.requestInsertContentBlocks) return;
			ad.requestInsertContentBlocks({
				contentBlocks: [phraseBlock],
				promptText: event.message
			});
		}, []);
		const handleDetailPanelTrack = (0, import_react.useCallback)(({ elementId, eventType }) => {
			try {
				adapterRef.current?.reportTelemetry?.(eventType, { elementId });
			} catch {}
		}, []);
		const wrappedSandboxSubscribeFileChange = (0, import_react.useCallback)((filePath, callback) => {
			const fn = contextRef.current?.subscribeSandboxFileChange;
			if (!fn) return () => {};
			try {
				return fn(filePath, callback);
			} catch {
				return () => {};
			}
		}, []);
		const wrappedSandboxSaveFile = (0, import_react.useCallback)(async (filePath, content) => {
			const fn = contextRef.current?.writeSandboxFile;
			if (!fn) return;
			await fn(filePath, content);
		}, []);
		const [tdocFolderPickerVisible, setTdocFolderPickerVisible] = (0, import_react.useState)(false);
		const [pendingUpload, setPendingUpload] = (0, import_react.useState)(null);
		const [imaDirPickerVisible, setImaDirPickerVisible] = (0, import_react.useState)(false);
		const [pendingImaUpload, setPendingImaUpload] = (0, import_react.useState)(null);
		const ima = useImaApi();
		const [lexiangKbPickerVisible, setLexiangKbPickerVisible] = (0, import_react.useState)(false);
		const [lexiangPendingUpload, setLexiangPendingUpload] = (0, import_react.useState)(null);
		const [netDriveUploadModalVisible, setNetDriveUploadModalVisible] = (0, import_react.useState)(false);
		const [netDrivePendingUpload, setNetDrivePendingUpload] = (0, import_react.useState)(null);
		const projectNetDriveUploadContext = (0, import_react.useMemo)(() => ({
			netDriveStore: createNetDriveServiceStore(),
			filesStore: createMyFilesStore()
		}), []);
		(0, import_react.useEffect)(() => {
			if (!lexiangKbPickerVisible) return;
			try {
				adapter?.reportTelemetry?.("web_element_show", {
					elementId: "save_to_lexiang_btn",
					elementName: "上传到乐享的弹窗曝光"
				});
			} catch {}
		}, [lexiangKbPickerVisible, adapter]);
		(0, import_react.useEffect)(() => onLocaleChange(setDocumentPreviewLocale), []);
		const { reportEvent, Events, getFileExtension } = useAgentTelemetry();
		/**
		* 产物详情页“上传到云端”前的本地文档保存门禁。
		*
		* 顶部上传按钮是下拉菜单入口，用户点父按钮时先走这里；选择具体上传目标时也会再走一次兜底。
		* 如果用户选择“另存为”，返回的新 filePath 会继续传给后续上传流程。
		*/
		const ensureArtifactSavedBeforeUploadToCloud = (0, import_react.useCallback)(async (uploadContext) => {
			if (!uploadContext.filePath) return { proceed: true };
			const result = await ensureLocalDocsSavedBeforeExternalAction({
				localDocs,
				filePathOrUri: uploadContext.filePath
			});
			if (!result.proceed) {
				if (!result.canceled) toast.error(t("mediaPreview.saveFailed", { error: result.error || t("mediaPreview.unknownError") }));
				return { proceed: false };
			}
			if (result.saved && result.documentResourceUri) notifyDocumentClientSaved(result.documentResourceUri);
			return {
				proceed: true,
				filePath: result.filePath || uploadContext.filePath
			};
		}, [localDocs, t]);
		const handleUploadToCloud = (0, import_react.useCallback)(async (target, uploadContext) => {
			const saveGate = await ensureArtifactSavedBeforeUploadToCloud(uploadContext);
			if (!saveGate.proceed) return;
			const resolvedUploadContext = {
				...uploadContext,
				filePath: saveGate.filePath || uploadContext.filePath
			};
			if (target === "tencent-netdrive" || target === "project-asset") {
				const isProjectAsset = target === "project-asset";
				if (!canSaveArtifactToLibrary) {
					toast({
						message: "当前项目角色无权保存产物到资料库",
						type: "warning"
					});
					return;
				}
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("tdoc.folderPicker.uploadMissingFile"),
						type: "error"
					});
					return;
				}
				const filename = resolvedUploadContext.filePath.split(/[/\\]/).pop() || "file";
				const sessionId = resolvedUploadContext.taskId || context?.currentConversation?.id || "";
				const urlProjectId = router?.params.projectId || "";
				const projectSandboxId = sessionId ? projectChat?.getSandboxId?.(sessionId) : void 0;
				const projectId = urlProjectId && projectSandboxId ? urlProjectId : conversationProjectId || "";
				const runtimeId = projectSandboxId || "";
				if (isProjectAsset && !projectId) {
					toast({
						message: "项目资产仅在项目会话中可用",
						type: "warning"
					});
					return;
				}
				if (projectId) try {
					await projectNetDriveUploadContext.netDriveStore.getState().initialize(adapter, projectId);
					projectNetDriveUploadContext.filesStore.getState().reset();
				} catch (err) {
					const message = err instanceof Error ? err.message : String(err);
					console.error("[DetailPanelWrapper] project netdrive initialize failed:", err);
					toast({
						message: `项目网盘初始化失败：${message}`,
						type: "error"
					});
					return;
				}
				if (runtimeId && myFiles?.uploadToDrive) {
					setNetDrivePendingUpload({
						filePath: resolvedUploadContext.filePath,
						filename,
						projectId,
						runtimeId
					});
					setNetDriveUploadModalVisible(true);
					return;
				}
				setNetDrivePendingUpload({
					filePath: resolvedUploadContext.filePath,
					filename,
					projectId: projectId || void 0
				});
				setNetDriveUploadModalVisible(true);
				return;
			}
			if (target === "tencent-docs") {
				if (isEnterpriseEdition && !enterpriseDocActivated && enterpriseOneidUnavailable) {
					toast({
						message: t("upload.oneidUnavailable"),
						type: "warning"
					});
					return;
				}
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("tdoc.folderPicker.uploadMissingFile"),
						type: "error"
					});
					return;
				}
				reportSaveToTdocBtn(adapter);
				setPendingUpload({ filePath: resolvedUploadContext.filePath });
				setTdocFolderPickerVisible(true);
				return;
			}
			if (target === "ima-knowledge") {
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("ima.upload.missingFile"),
						type: "error"
					});
					return;
				}
				reportSaveToImaBtn(adapter);
				setPendingImaUpload({ filePath: resolvedUploadContext.filePath });
				setImaDirPickerVisible(true);
				return;
			}
			if (target === "tencent-lexiang") {
				if (isEnterpriseEdition && !enterpriseLexiangActivated && enterpriseOneidUnavailable) {
					toast({
						message: t("upload.oneidUnavailable"),
						type: "warning"
					});
					return;
				}
				if (!resolvedUploadContext.filePath) {
					toast({
						message: t("tdoc.folderPicker.uploadMissingFile"),
						type: "error"
					});
					return;
				}
				try {
					adapter?.reportTelemetry?.("web_element_click", {
						elementId: "save_to_lexiang_btn",
						elementName: "上传到乐享按钮"
					});
				} catch {}
				setLexiangPendingUpload({ filePath: resolvedUploadContext.filePath });
				setLexiangKbPickerVisible(true);
				return;
			}
			console.warn("[DetailPanelWrapper] uploadToCloud target not yet supported:", target, uploadContext);
		}, [
			adapter,
			canSaveArtifactToLibrary,
			context?.currentConversation,
			ensureArtifactSavedBeforeUploadToCloud,
			myFiles,
			projectChat,
			projectNetDriveUploadContext.filesStore,
			projectNetDriveUploadContext.netDriveStore,
			router?.params.projectId,
			isEnterpriseEdition,
			enterpriseDocActivated,
			enterpriseLexiangActivated,
			enterpriseOneidUnavailable,
			t
		]);
		const handleTdocFolderPicked = (0, import_react.useCallback)(async (selection) => {
			const filePath = pendingUpload?.filePath;
			setPendingUpload(null);
			if (!filePath) {
				toast({
					message: t("tdoc.folderPicker.uploadMissingFile"),
					type: "error"
				});
				return;
			}
			if (!tencentDocs) {
				toast({
					message: t("tdoc.folderPicker.uploadUnsupported"),
					type: "error"
				});
				return;
			}
			const cancelToken = `tdoc-upload-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
			let cancelled = false;
			const uploading = toast({
				message: t("tdoc.folderPicker.uploading", { name: selection.name }),
				type: "info",
				duration: 0,
				action: {
					label: t("common.cancel"),
					onClick: () => {
						cancelled = true;
						uploading.close();
						(tencentDocs ? tencentDocs.cancelUpload({ cancelToken }) : void 0)?.catch((err) => {
							console.warn("[DetailPanelWrapper] cancelUpload failed:", err);
						});
						console.info("[DetailPanelWrapper] tdoc upload cancelled by user (token=%s)", cancelToken);
					}
				}
			});
			try {
				reportSaveToTdocConfirm(adapter);
				const result = await tencentDocs.uploadFile({
					filePath,
					folder_id: selection.folder_id,
					space_id: selection.space_id,
					cancelToken
				});
				if (cancelled) {
					console.info("[DetailPanelWrapper] tdoc upload finished after user cancelled, suppressing success toast");
					return;
				}
				uploading.close();
				reportSaveToTdocSuccess(adapter, { source: "task_result_save" });
				console.log("[DetailPanelWrapper] tdoc upload result:", result);
				const r = result && typeof result === "object" ? result : {};
				const readStr = (key) => typeof r[key] === "string" ? r[key] : "";
				const readBool = (key) => typeof r[key] === "boolean" ? r[key] : void 0;
				const viewUrl = readStr("url");
				const fileId = readStr("file_id");
				const tencentDocUrl = readStr("tencent_doc_url");
				const successAction = Boolean(fileId || viewUrl) ? {
					label: t("tdoc.folderPicker.viewUploaded"),
					onClick: () => {
						console.log("[DetailPanelWrapper] \"查看\" clicked | fileId =", fileId, "| viewUrl =", viewUrl, "| context =", !!context, "| setPendingTdocOpen =", typeof context?.setPendingTdocOpen);
						context?.setPendingTdocOpen?.({
							fileId: fileId || void 0,
							url: viewUrl || void 0,
							tencentDocUrl: tencentDocUrl || void 0,
							title: readStr("title") || readStr("name") || void 0,
							type: readStr("type") || void 0,
							ext: readStr("ext") || void 0,
							isFolder: readBool("is_folder")
						});
						context?.setCurrentConversation?.(null);
						navigate("/library/tencent-docs");
						console.log("[DetailPanelWrapper] \"查看\" handlers called");
					}
				} : void 0;
				const pathDepth = selection.pathDepth ?? 0;
				const uploadedDirName = selection.name;
				toast({
					message: t(pathDepth >= 2 ? "tdoc.folderPicker.uploadSuccessDeep" : "tdoc.folderPicker.uploadSuccess", { name: uploadedDirName }),
					type: "success",
					action: successAction
				});
			} catch (err) {
				if (cancelled) {
					console.info("[DetailPanelWrapper] tdoc upload errored after user cancelled, suppressing error toast");
					return;
				}
				uploading.close();
				const message = extractErrorMessage(err, t("tdoc.folderPicker.uploadFailedDefault"));
				console.error("[DetailPanelWrapper] tdoc upload failed:", err);
				toast({
					message: t("tdoc.folderPicker.uploadFailed", { error: message }),
					type: "error"
				});
			}
		}, [
			adapter,
			pendingUpload,
			t,
			tencentDocs
		]);
		const handleTdocFolderPickerClose = (0, import_react.useCallback)(() => {
			setTdocFolderPickerVisible(false);
			setPendingUpload(null);
		}, []);
		const handleImaDirSelected = (0, import_react.useCallback)(async (selection) => {
			const filePath = pendingImaUpload?.filePath;
			const filename = pendingImaUpload?.filename;
			setPendingImaUpload(null);
			setImaDirPickerVisible(false);
			if (!filePath) {
				toast({
					message: t("ima.upload.missingFile"),
					type: "error"
				});
				return;
			}
			reportSaveToImaConfirm(adapter);
			const targetLabel = selection.kbName ?? selection.displayPath ?? "";
			const uploadId = `imaup-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
			let cancelled = false;
			const uploading = toast({
				message: t("ima.upload.uploading"),
				type: "info",
				duration: 0,
				action: {
					label: t("common.cancel"),
					onClick: () => {
						cancelled = true;
						uploading.close();
						if (ima.imaFilesCancelUpload) ima.imaFilesCancelUpload({ uploadId }).catch((err) => {
							console.warn("[DetailPanelWrapper] imaFilesCancelUpload failed:", err);
						});
						console.info("[DetailPanelWrapper] ima upload cancelled by user (uploadId=%s)", uploadId);
					}
				}
			});
			try {
				const result = await ima.imaFilesUploadByPath({
					filePath,
					kbId: selection.kbId,
					folderId: selection.folderId,
					filename,
					uploadId
				});
				if (cancelled) {
					console.info("[DetailPanelWrapper] ima upload finished after user cancelled, suppressing success toast");
					return;
				}
				uploading.close();
				reportSaveToImaSuccess(adapter);
				toast({
					message: t("ima.upload.success", { name: targetLabel }),
					type: "success",
					duration: 5e3,
					action: {
						label: t("ima.upload.view"),
						onClick: () => openImaUploadResult({
							result,
							selection,
							filename
						})
					}
				});
			} catch (err) {
				if (cancelled) {
					uploading.close();
					console.info("[DetailPanelWrapper] ima upload errored after user cancelled, suppressing error toast");
					return;
				}
				uploading.close();
				const message = err instanceof Error ? err.message : String(err);
				console.error("[DetailPanelWrapper] ima upload failed:", err);
				toast({
					message: t("ima.upload.failed", { error: message }),
					type: "error"
				});
			}
		}, [
			adapter,
			pendingImaUpload,
			ima,
			openImaUploadResult,
			t
		]);
		const handleImaDirPickerClose = (0, import_react.useCallback)(() => {
			setImaDirPickerVisible(false);
			setPendingImaUpload(null);
		}, []);
		const describeUploadError = useDescribeUploadError();
		const handleLexiangKbPicked = (0, import_react.useCallback)(async (result) => {
			const filePath = lexiangPendingUpload?.filePath;
			setLexiangKbPickerVisible(false);
			setLexiangPendingUpload(null);
			if (!filePath) {
				toast({
					message: t("tdoc.folderPicker.uploadMissingFile"),
					type: "error"
				});
				return;
			}
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					elementId: "save_to_lexiang_confirm",
					elementName: "确认上传到乐享"
				});
			} catch {}
			const parentEntryId = result.kb.meta?.rootEntryId;
			if (!parentEntryId) {
				toast({
					message: "无法获取知识库根目录，请重试",
					type: "error"
				});
				return;
			}
			if (!adapter?.uploadLexiangFile) {
				toast({
					message: t("tdoc.folderPicker.uploadUnsupported"),
					type: "error"
				});
				return;
			}
			let cancelled = false;
			const uploadingToast = toast({
				message: t("tencentLexiang.cloud.uploading"),
				type: "info",
				duration: 0,
				action: {
					label: t("common.cancel"),
					onClick: () => {
						cancelled = true;
						uploadingToast.close();
						console.info("[DetailPanelWrapper] lexiang upload cancelled by user (soft cancel)");
					}
				}
			});
			try {
				const uploadResult = await adapter.uploadLexiangFile({
					filePath,
					parentEntryId
				});
				if (cancelled) {
					console.info("[DetailPanelWrapper] lexiang upload finished after user cancelled, suppressing success toast");
					return;
				}
				uploadingToast.close();
				try {
					adapter?.reportTelemetry?.("web_element_click", {
						elementId: "save_to_lexiang_success",
						elementName: "上传到乐享成功"
					});
				} catch {}
				const kbName = result.kb.name;
				const uploadedEntry = (() => {
					if (uploadResult && typeof uploadResult === "object") return uploadResult.entry;
				})();
				const uploadedEntryId = uploadedEntry?.id;
				const uploadedEntryName = uploadedEntry?.name || (filePath ? decodeURIComponent(filePath.split(/[\\/]/).pop() || "") : void 0);
				toast({
					message: t("tencentLexiang.cloud.uploadSuccess", { name: kbName }),
					type: "success",
					action: {
						label: t("tencentLexiang.cloud.viewUploaded"),
						onClick: () => {
							console.log("[lexiang-debug] upload view clicked:", {
								uploadedEntry,
								uploadedEntryId,
								uploadedEntryName,
								targetKb: result.kb,
								parentEntryId
							});
							if (uploadedEntryId) {
								const pendingOpen = {
									entryId: uploadedEntryId,
									kb: {
										id: result.kb.id,
										name: result.kb.name,
										rootEntryId: parentEntryId,
										teamId: result.kb.teamId
									},
									name: uploadedEntryName,
									entryType: uploadedEntry.entry_type ?? uploadedEntry.entryType ?? "file",
									spaceId: uploadedEntry.space_id ?? uploadedEntry.spaceId ?? result.kb.id
								};
								console.log("[lexiang-debug] upload view set pending open:", pendingOpen);
								context?.setPendingLexiangOpen?.(pendingOpen);
							} else console.warn("[DetailPanelWrapper] lexiang upload result missing entry.id, fallback to panel-only open");
							context?.setCurrentConversation?.(null);
							navigate("/library/lexiang");
						}
					}
				});
				console.log("[DetailPanelWrapper] lexiang upload result:", uploadResult);
			} catch (err) {
				if (cancelled) {
					console.info("[DetailPanelWrapper] lexiang upload errored after user cancelled, suppressing error toast");
					return;
				}
				uploadingToast.close();
				console.error("[DetailPanelWrapper] lexiang upload failed:", err);
				toast({
					message: describeUploadError(parseUploadError(err)),
					type: "error"
				});
			}
		}, [
			adapter,
			context,
			lexiangPendingUpload,
			t,
			describeUploadError
		]);
		const handleLexiangKbPickerClose = (0, import_react.useCallback)(() => {
			setLexiangKbPickerVisible(false);
			setLexiangPendingUpload(null);
		}, []);
		const handleNetDriveUploadModalClose = (0, import_react.useCallback)(() => {
			setNetDriveUploadModalVisible(false);
			setNetDrivePendingUpload(null);
		}, []);
		const handlePersonalNetDriveUploadSuccess = (0, import_react.useCallback)(async (info) => {
			navigate("/library/my-files");
			const { getLastUploadFolder } = await __vitePreload(async () => {
				const { getLastUploadFolder } = await import("./use-upload-queue-CnL2THKL.js");
				return { getLastUploadFolder };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]), import.meta.url);
			const { myFilesStore } = await __vitePreload(async () => {
				const { myFilesStore } = await import("./store-S-fXQbuU.js");
				return { myFilesStore };
			}, __vite__mapDeps([61,40,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,41,35,42,43]), import.meta.url);
			const lastFolder = getLastUploadFolder();
			const targetFolderId = lastFolder?.id ?? "";
			const targetFolderName = lastFolder?.name ?? "";
			const fileId = info?.fileId;
			const fileName = info?.fileName;
			const state = myFilesStore.getState();
			state.setActiveTab("cloudFiles");
			if (targetFolderId) {
				state.setCurrentFolderId(targetFolderId);
				state.setBreadcrumbs([{
					id: targetFolderId,
					name: targetFolderName
				}]);
			} else {
				state.setCurrentFolderId(null);
				state.setBreadcrumbs([]);
			}
			state.setPendingCloudFileView(fileId || fileName ? {
				folderId: targetFolderId,
				fileId,
				fileName
			} : null);
			state.triggerCloudFilesRefresh();
		}, [navigate]);
		const handleNetDriveSaveFile = (0, import_react.useCallback)(async () => {
			const pending = netDrivePendingUpload;
			const sessionId = context?.currentConversation?.id || "";
			if (!pending?.filePath || !adapter) throw new Error("文件路径或 adapter 不可用");
			const filename = pending.filename || pending.filePath.split(/[/\\]/).pop() || "file";
			if (adapter.readFileChunked && !pending.filePath.startsWith("agent://")) {
				const CHUNK_SIZE = 10 * 1024 * 1024;
				const MAX_BYTES = 500 * 1024 * 1024;
				const chunks = [];
				let offset = 0;
				let done = false;
				let totalBytes = 0;
				while (!done) {
					const chunk = await adapter.readFileChunked({
						filePath: pending.filePath,
						offset,
						chunkSize: CHUNK_SIZE,
						sessionId,
						allowedDirs: [pending.filePath]
					});
					if (chunk.bytesRead > 0) {
						const binaryStr = atob(chunk.data);
						const bytes = new Uint8Array(binaryStr.length);
						for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
						chunks.push(bytes);
						totalBytes += chunk.bytesRead;
						if (totalBytes > MAX_BYTES) throw new Error(`文件过大（${totalBytes} bytes），超过 ${MAX_BYTES} 上限，请缩小文件或使用其他方式上传`);
					}
					offset += chunk.bytesRead;
					done = chunk.done;
				}
				const blob = new Blob(chunks);
				const mimeType = getMimeTypeFromFilename(filename);
				return new File([blob], filename, { type: mimeType });
			}
			const readResult = await adapter.readFile(sessionId, pending.filePath, "blob");
			if (!readResult.success || !readResult.content) throw new Error(readResult.error || "读取文件失败");
			const blob = readResult.content;
			return new File([blob], filename, { type: blob.type || getMimeTypeFromFilename(filename) });
		}, [
			netDrivePendingUpload,
			adapter,
			context?.currentConversation?.id
		]);
		const handleNetDriveUploadToDrive = (0, import_react.useCallback)(async (params) => {
			const pending = netDrivePendingUpload;
			console.log("[DEBUG:handleNetDriveUploadToDrive] ENTER", {
				hasFilePath: !!pending?.filePath,
				projectId: pending?.projectId,
				runtimeId: pending?.runtimeId,
				hasUploadToDrive: !!myFiles?.uploadToDrive,
				hasReportFileEvents: !!myFiles?.reportFileEvents,
				params
			});
			if (!pending?.filePath || !pending.runtimeId || !myFiles?.uploadToDrive) {
				console.error("[NetDrive:UploadToDrive] missing fields", {
					hasFilePath: !!pending?.filePath,
					runtimeId: pending?.runtimeId,
					hasUploadToDrive: !!myFiles?.uploadToDrive
				});
				return {
					ok: false,
					error: "运行时或文件路径不可用"
				};
			}
			const normalizedPath = normalizeNetDriveUploadPath(pending.filePath);
			try {
				const raw = await myFiles.uploadToDrive({
					projectId: pending.projectId || "",
					runtimeId: pending.runtimeId,
					localPath: normalizedPath,
					dirId: params.dirId,
					uploadType: params.uploadType,
					sizeHint: params.sizeHint
				});
				const result = raw?.data && typeof raw.data === "object" && "ok" in raw.data ? raw.data : raw;
				console.log("[NetDrive:UploadToDrive] result", {
					resultOk: result?.ok,
					fileName: result?.fileName
				});
				if (result?.ok && pending.projectId && myFiles?.reportFileEvents) {
					const eventType = params.uploadType === "overwrite" ? "updated" : "uploaded";
					const files = [{
						id: result.fileID || "",
						name: result.fileName || normalizedPath.split(/[/\\]/).pop() || "",
						size: result.size
					}];
					console.log("[NetDrive:ReportFileEvents] reporting", {
						projectId: pending.projectId,
						eventType,
						files
					});
					myFiles.reportFileEvents({
						projectId: pending.projectId,
						eventType,
						files
					}).then((resp) => {
						console.log("[NetDrive:ReportFileEvents] done", {
							ok: resp?.ok,
							accepted: resp?.accepted
						});
					}).catch((err) => {
						console.warn("[NetDrive:ReportFileEvents] failed (non-blocking)", err?.message);
					});
				}
				return result;
			} catch (err) {
				console.error("[NetDrive:UploadToDrive] error", err?.message);
				const errData = err?.response?.data?.data ?? err?.response?.data;
				if (errData && typeof errData === "object" && "ok" in errData) return errData;
				return {
					ok: false,
					error: errData?.msg || err?.message || "上传失败"
				};
			}
		}, [myFiles, netDrivePendingUpload]);
		const rawArtifacts = context?.artifacts || [];
		const fileTree = context?.fileTree || {};
		const selectedFilePath = context?.selectedFilePath;
		const selectedFilePathRef = useLatestRef(selectedFilePath);
		const onFileSelect = context?.onFileSelect;
		const onFileDoubleClick = context?.onFileDoubleClick;
		const lazyFileTreeMode = context?.lazyFileTreeMode;
		const fileTreeData = context?.fileTreeData;
		const onLoadFileTreeChildren = context?.onLoadFileTreeChildren;
		const loadedPaths = context?.loadedPaths;
		const onLoadedPathsChange = context?.onLoadedPathsChange;
		const collapsedFolders = context?.collapsedFolders;
		const onCollapsedFoldersChange = context?.onCollapsedFoldersChange;
		const onRequestFileTreeRefresh = context?.onRequestFileTreeRefresh;
		const onTreeDataChange = context?.onTreeDataChange;
		const onReadFile = context?.onReadFile;
		const fileTreeLoaded = context?.fileTreeLoaded;
		const hasActiveSession = !!context?.currentConversation?.id;
		const sessionId = context?.currentConversation?.id;
		const sidebarView = context?.sidebarView;
		const contextOnSidebarViewChange = context?.onSidebarViewChange;
		const browserUrl = context?.browserUrl;
		const browserRefreshToken = context?.browserRefreshToken;
		const setBrowserUrlFromContext = context?.setBrowserUrl;
		const disableHtmlBrowserPreview = context?.disableHtmlBrowserPreview;
		/**
		* 记录"当前正在浏览器预览态里展示的 HTML artifact id"（无则 null）。
		* 用于 onArtifactSelect 区分两种调用：
		* - 命中同一个 id（useUnifiedTabs.activateTab 反向激活同一条 artifact
		*   tab）：跳过三件套，否则关 preview tab 时会被立即复活（issue：
		*   浏览器 tab 关不掉）。
		* - 命中不同 id（用户在预览态里又点了另一个 HTML artifact）：正常走
		*   三件套，切到新 HTML 的 preview。
		* 之所以不用 boolean：boolean 只能表达"在不在预览态"，会把"再点另一个
		* HTML"误判成 activateTab 复活而拦掉，导致第二个 HTML 点不开预览。
		* 由下方 useEffect 在 sidebarView !== 'preview' 时清回 null。
		*/
		const inHtmlPreviewRef = (0, import_react.useRef)(null);
		const detailPanelRequestSeqRef = (0, import_react.useRef)(0);
		const beforeSelectFilePathRef = (0, import_react.useRef)(void 0);
		const registerBeforeSelectFilePathWithLocalRef = (0, import_react.useCallback)((handler) => {
			beforeSelectFilePathRef.current = handler;
			registerBeforeSelectFilePath?.(handler);
		}, [registerBeforeSelectFilePath]);
		const selectedArtifactId = context?.selectedArtifactId;
		const contextOnArtifactSelect = context?.setSelectedArtifactId;
		const selectedArtifactIdRef = useLatestRef(selectedArtifactId);
		const rawArtifactsRef = useLatestRef(rawArtifacts);
		const currentConversationIdRef = useLatestRef(sessionId);
		const localDocsRef = useLatestRef(localDocs);
		const processingSessionIds = import_react.useMemo(() => (context?.conversations ?? []).filter((conv) => WORKING_STATUSES.has(String(conv.status).toLowerCase())).map((conv) => conv.id), [context?.conversations]);
		const preflightLocalDocumentUiOpen = (0, import_react.useCallback)(async (filePath) => {
			const normalizedPath = getLocalSdkDocumentPath(filePath);
			const currentLocalDocs = localDocsRef.current;
			if (!normalizedPath || !currentLocalDocs) return {
				handled: false,
				blocked: false
			};
			const requestSessionId = currentConversationIdRef.current ?? sessionId;
			if (!requestSessionId) return {
				handled: false,
				blocked: false
			};
			return preflightSessionLocalDocumentOpen({
				filePath: normalizedPath,
				localDocs: currentLocalDocs,
				adapter: adapterRef.current,
				sessionId: requestSessionId,
				isOwnerSessionProcessing: (ownerSessionId) => processingSessionIds.includes(ownerSessionId)
			});
		}, [
			adapterRef,
			currentConversationIdRef,
			localDocsRef,
			processingSessionIds,
			sessionId
		]);
		/**
		* 传给 DetailPanel/FileTree 的 before-open gate。
		*
		* 返回 true 表示调用方必须停止后续 open/tab 入栈。顺序必须保持：
		* 1. 先确认是否清空主对话里的文档选区，避免 UI 已切走后再弹窗；
		* 2. 再跑本地文档 preflight：checkOpen 命中同路径其它会话时，只尝试
		*    温和释放 clean 旧 preview 并重试 checkOpen；dirty 仍走原冲突提示；
		* 3. keep-alive pool 的容量 / dirty LRU gate 继续留在文档预览模块内部。
		*/
		const shouldBlockLocalDocumentUiOpen = (0, import_react.useCallback)(async (filePath) => {
			const localSdkPath = getLocalSdkDocumentPath(filePath);
			if (!localSdkPath) return false;
			if (!await (context?.clearDocumentSelectionBeforeTabSwitch?.(localSdkPath) ?? true)) return true;
			const result = await preflightLocalDocumentUiOpen(localSdkPath);
			if (result.blocked && result.outcome === "abort-owned-by-self") return false;
			return result.blocked;
		}, [context, preflightLocalDocumentUiOpen]);
		/**
		* 文档 tab 关闭请求流（Promise 化）。
		*
		* 场景：用户关闭 KeepAlive Pool 内的某个文档 tab 时，
		* main 侧通过 setDocumentPreviewCloseRequest 向 iframe 侧发起"可否关闭"询问。
		* iframe 侧处理完毕后回调 handleDocumentPreviewCloseResult，main 侧据此 resolve promise。
		*
		* 流程：
		*   1. 递增 documentPreviewCloseRequestSeqRef 生成唯一 requestId
		*   2. 在 pendingDocumentPreviewCloseResolversRef 中注册 resolve + 超时兜底
		*   3. setDocumentPreviewCloseRequest 触发 iframe 侧监听
		*   4. iframe 回调 handleDocumentPreviewCloseResult → resolve / 超时 → resolve(false)
		*/
		const [documentPreviewCloseRequest, setDocumentPreviewCloseRequest] = (0, import_react.useState)(void 0);
		const documentPreviewCloseRequestSeqRef = (0, import_react.useRef)(0);
		const [documentPreviewSessionEvictionQueue, setDocumentPreviewSessionEvictionQueue] = (0, import_react.useState)([]);
		const documentPreviewSessionEvictionIntent = documentPreviewSessionEvictionQueue[0];
		const documentPreviewSessionEvictionSeqRef = (0, import_react.useRef)(0);
		const pendingDocumentPreviewCloseResolversRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		(0, import_react.useEffect)(() => {
			if (!adapter?.on) return;
			return adapter.on("local-document-session-evicted", (event) => {
				const sessionId = typeof event?.sessionId === "string" ? event.sessionId.trim() : "";
				if (!sessionId) return;
				documentPreviewSessionEvictionSeqRef.current += 1;
				const requestId = documentPreviewSessionEvictionSeqRef.current;
				setDocumentPreviewSessionEvictionQueue((previous) => [...previous, {
					requestId,
					sessionId
				}]);
			});
		}, [adapter]);
		const handleDocumentPreviewSessionEvictionSettled = (0, import_react.useCallback)((requestId) => {
			setDocumentPreviewSessionEvictionQueue((previous) => previous.filter((intent) => intent.requestId !== requestId));
		}, []);
		const reportLocalActiveContextRef = (0, import_react.useRef)(() => {});
		/**
		* KeepAlive Pool 可见 slot 切换时，同步 main 侧 active document context。
		*
		* SDK Pool 中同一时刻只有一个 slot 处于内容区可见状态。slot 切换（用户切换
		* artifact、切换会话）时，通知主进程 activateContext，让主进程记录当前前台
		* 会话，避免将前台会话的预览误判为"后台 turn 结束可关闭"。
		* 关闭 tab 的 release 定位由 KeepAlivePool 的 closeIntent entry 匹配负责。
		*/
		const handleDocumentPreviewActiveSlotChange = (0, import_react.useCallback)((contextInfo) => {
			reportLocalActiveContextRef.current(contextInfo);
			if (!contextInfo?.documentResourceUri || !localDocs?.activateContext) return;
			const activeSessionId = currentConversationIdRef.current ?? void 0;
			localDocs.activateContext(contextInfo.documentResourceUri, activeSessionId).catch((error) => {
				console.warn("[DetailPanelWrapper] activate local docs context failed", {
					documentResourceUri: contextInfo.documentResourceUri,
					error: error instanceof Error ? error.message : String(error)
				});
			});
		}, [localDocs]);
		(0, import_react.useEffect)(() => {
			const setForeground = localDocs?.setForegroundSession;
			if (!setForeground) return;
			setForeground(sessionId ?? null).catch((error) => {
				console.warn("[DetailPanelWrapper] set foreground session failed", {
					sessionId,
					error: error instanceof Error ? error.message : String(error)
				});
			});
		}, [localDocs, sessionId]);
		const getCurrentConversationId = (0, import_react.useCallback)(() => context?.currentConversation?.id, [context?.currentConversation?.id]);
		const diffCacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const readFileWithFormat = context?.readFileWithFormat;
		const artifactDragResolver = (0, import_react.useMemo)(() => createArtifactDragResolver(readFileWithFormat, sessionId), [readFileWithFormat, sessionId]);
		const isGitWorkspace = context?.isGitWorkspace ?? true;
		const isWorkbuddyDesktop = adapter?.isWorkbuddyDesktop === true;
		const isProjectionActive = context?.isProjectionActive ?? false;
		const versionControlEnabled = useVersionControlEnabled(context?.showDetailPanel);
		const fileVersionEnabled = isWorkbuddyDesktop && versionControlEnabled;
		const fileVersionPanel = (0, import_react.useMemo)(() => {
			if (!fileVersionEnabled) return;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileVersionListPanel, {});
		}, [fileVersionEnabled]);
		const fileVersionDetailPanel = (0, import_react.useMemo)(() => {
			if (!fileVersionEnabled) return;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileVersionDetailView, {});
		}, [fileVersionEnabled]);
		const registerShowSourceForFile = context?.registerShowSourceForFile;
		const mcpAppsAvailable = context?.mcpAppsAvailable ?? [];
		const selectedMcpAppId = context?.selectedMcpAppId;
		const onSelectMcpApp = context?.onSelectMcpApp;
		const activeMcpAppInstance = context?.activeMcpAppInstance;
		const mcpAppsStatus = context?.mcpAppsStatus;
		const onRetryMcpApp = context?.onRetryMcpApp;
		const onMcpAppBridgeMessage = context?.onMcpAppBridgeMessage;
		const registerMcpAppsPostMessage = context?.registerMcpAppsPostMessage;
		const onMcpAppWebviewLoadError = context?.onMcpAppWebviewLoadError;
		const notifyMcpAppDisplayModeChanged = context?.notifyMcpAppDisplayModeChanged;
		const onGenerateAppFromArdotCanvas = context?.onGenerateAppFromArdotCanvas;
		const onArdotMcpAppViewportChange = context?.onArdotMcpAppViewportChange;
		const ardotCanvasCollapseRequestSeq = context?.ardotCanvasCollapseRequestSeq ?? 0;
		const detailSidebarCollapseRequestSeq = context?.detailSidebarCollapseRequestSeq ?? 0;
		const detailSidebarExpandRequestSeq = context?.detailSidebarExpandRequestSeq ?? 0;
		const lastHandledArdotCollapseSeqRef = (0, import_react.useRef)(ardotCanvasCollapseRequestSeq);
		const lastHandledDetailCollapseSeqRef = (0, import_react.useRef)(detailSidebarCollapseRequestSeq);
		const lastHandledDetailExpandSeqRef = (0, import_react.useRef)(detailSidebarExpandRequestSeq);
		const mcpAppsDebug = context?.mcpAppsDebug;
		const onToggleMcpAppsDebug = context?.onToggleMcpAppsDebug;
		const onLoadExampleMcpApps = context?.onLoadExampleMcpApps;
		const showDesignAuthOverlay = useArdotAuthStore((state) => state.visible);
		/**
		* issue #39357：企业版（旗舰 / 专享）账号在 chat 产物里点击腾讯文档链接时，
		* onLinkClick 会调 `openArtifact('preview', { url })` 把 URL 写入 context.browserUrl
		* 并切到 preview tab。这里把"当前 browserUrl 是不是企业版腾讯文档链接"算出来：
		* - 是 → 通过 detailMainOverlay 注入 EnterpriseDocsWebviewBody，叠加在默认
		*   BrowserPreview 上，用 webview + 免登 cookie 直接预览，绕过 third-party
		*   cookie phaseout；同时把传给 ActivePanel 的 browserUrl 置 undefined，避免
		*   底层 BrowserPreview 也去加载这个会被重定向到登录页的链接。
		* - 否 → browserUrl 与 detailMainOverlay 走原逻辑。
		*
		* 仅在 sidebarView === 'preview' 时生效，用户切到其它 tab 时 webview 自动卸载。
		*/
		const effectiveEdition = useEffectiveEdition();
		const enterpriseDocsPreviewUrl = (0, import_react.useMemo)(() => {
			if (effectiveEdition === null) return null;
			if (sidebarView !== "preview") return null;
			if (!browserUrl) return null;
			return isTencentDocsUrl(browserUrl, effectiveEdition) ? browserUrl : null;
		}, [
			effectiveEdition,
			sidebarView,
			browserUrl
		]);
		const enterpriseDocsPreviewFileId = (0, import_react.useMemo)(() => extractTencentDocsPreviewFileId(enterpriseDocsPreviewUrl), [enterpriseDocsPreviewUrl]);
		const isTencentDocsPreview = Boolean(enterpriseDocsPreviewUrl) || Boolean(effectiveEdition !== null && browserUrl && isTencentDocsUrl(browserUrl, effectiveEdition));
		const { reportLocalActiveContext } = useFileViewerPageShow({
			adapterRef,
			userId: account?.uid,
			sidebarView,
			browserUrl,
			isTencentDocsPreview
		});
		reportLocalActiveContextRef.current = reportLocalActiveContext;
		const [collapseDesignCanvasSidebar, setCollapseDesignCanvasSidebar] = (0, import_react.useState)(false);
		const collapseDesignCanvasSidebarRef = (0, import_react.useRef)(collapseDesignCanvasSidebar);
		const collapseDesignCanvasSidebarCacheRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
		const prevCollapseSidebarSessionIdRef = (0, import_react.useRef)(void 0);
		const [ardotAuthBound, setArdotAuthBound] = (0, import_react.useState)(false);
		const onOpenMcpApp = context?.onOpenMcpApp;
		const currentConversation = context?.currentConversation;
		const designNewCanvasArtifactId = currentConversation?.id ? `${DESIGN_NEW_CANVAS_ARTIFACT_ID_PREFIX}:${currentConversation.id}` : void 0;
		const shouldShowDesignNewCanvas = isDesignSession(currentConversation) && !!designNewCanvasArtifactId;
		const hasFormalArdotCanvasArtifact = !!(0, import_react.useMemo)(() => rawArtifacts.find((item) => item.type === "custom-artifact" && item.customType === "ardot/canvas"), [rawArtifacts]);
		const isSyntheticDesignCanvasSelected = !!designNewCanvasArtifactId && selectedArtifactId === designNewCanvasArtifactId;
		const designNewCanvasArtifact = (0, import_react.useMemo)(() => {
			if (!shouldShowDesignNewCanvas || !currentConversation || !designNewCanvasArtifactId) return;
			if (hasFormalArdotCanvasArtifact && !isSyntheticDesignCanvasSelected) return;
			return {
				id: designNewCanvasArtifactId,
				sessionId: currentConversation.id,
				title: t("detailPanel.design.newCanvas") || "新画布",
				subtitle: t("detailPanel.design.newCanvas.subtitle") || "打开 Ardot 设计画布",
				type: "custom-artifact",
				category: "artifact",
				customType: DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE,
				createdAt: Number.MAX_SAFE_INTEGER,
				updatedAt: Number.MAX_SAFE_INTEGER
			};
		}, [
			currentConversation,
			designNewCanvasArtifactId,
			hasFormalArdotCanvasArtifact,
			isSyntheticDesignCanvasSelected,
			shouldShowDesignNewCanvas,
			t
		]);
		const artifacts = (0, import_react.useMemo)(() => designNewCanvasArtifact ? [designNewCanvasArtifact, ...rawArtifacts.filter((item) => item.id !== designNewCanvasArtifact.id)] : rawArtifacts, [designNewCanvasArtifact, rawArtifacts]);
		const selectedArtifactIdForCurrentSession = (selectedArtifactId ? artifacts.find((item) => item.id === selectedArtifactId && item.sessionId === currentConversation?.id) : void 0)?.id;
		const hasOpenedDetailContent = Boolean(selectedArtifactIdForCurrentSession || selectedFilePath || browserUrl);
		(0, import_react.useEffect)(() => () => {
			for (const pending of pendingDocumentPreviewCloseResolversRef.current.values()) {
				clearTimeout(pending.timeoutId);
				pending.resolve(false);
			}
			pendingDocumentPreviewCloseResolversRef.current.clear();
		}, []);
		const refreshArdotAuthBound = (0, import_react.useCallback)(async () => {
			try {
				setArdotAuthBound((await checkAuth()).status === "connected");
			} catch (error) {
				console.warn("[DetailPanelWrapper] check Ardot auth status failed:", error);
			}
		}, [checkAuth]);
		(0, import_react.useEffect)(() => {
			refreshArdotAuthBound();
		}, [
			currentConversation?.id,
			refreshArdotAuthBound,
			showDesignAuthOverlay
		]);
		(0, import_react.useEffect)(() => {
			collapseDesignCanvasSidebarRef.current = collapseDesignCanvasSidebar;
			if (currentConversation?.id) collapseDesignCanvasSidebarCacheRef.current.set(currentConversation.id, collapseDesignCanvasSidebar);
		}, [collapseDesignCanvasSidebar, currentConversation?.id]);
		(0, import_react.useLayoutEffect)(() => {
			const prevSessionId = prevCollapseSidebarSessionIdRef.current;
			const currentSessionId = currentConversation?.id;
			if (prevSessionId === currentSessionId) return;
			if (prevSessionId) collapseDesignCanvasSidebarCacheRef.current.set(prevSessionId, collapseDesignCanvasSidebarRef.current);
			prevCollapseSidebarSessionIdRef.current = currentSessionId;
			setCollapseDesignCanvasSidebar(currentSessionId ? collapseDesignCanvasSidebarCacheRef.current.get(currentSessionId) ?? false : false);
		}, [currentConversation?.id]);
		/**
		* "选中目标是否是 Ardot 画布(synthetic 或 任何一张正式 ardot/canvas)"。
		* collapseDesignCanvasSidebar 这套侧栏收起逻辑只对 Ardot 画布生效,
		* 切到其它 artifact 时必须重置;但同会话多张 Ardot 画布之间的切换
		* 不应让 sidebar 自动展开,因此这里按 customType 全量识别。
		*/
		const isArdotCanvasSelected = !!selectedArtifactIdForCurrentSession && (selectedArtifactIdForCurrentSession === designNewCanvasArtifactId || rawArtifacts.some((item) => item.id === selectedArtifactIdForCurrentSession && item.type === "custom-artifact" && item.customType === "ardot/canvas"));
		(0, import_react.useLayoutEffect)(() => {
			if (ardotCanvasCollapseRequestSeq === lastHandledArdotCollapseSeqRef.current) return;
			lastHandledArdotCollapseSeqRef.current = ardotCanvasCollapseRequestSeq;
			if (ardotCanvasCollapseRequestSeq > 0 && isArdotCanvasSelected) setCollapseDesignCanvasSidebar(true);
		}, [
			ardotCanvasCollapseRequestSeq,
			currentConversation?.id,
			isArdotCanvasSelected,
			selectedArtifactId
		]);
		(0, import_react.useLayoutEffect)(() => {
			if (detailSidebarCollapseRequestSeq === lastHandledDetailCollapseSeqRef.current) return;
			lastHandledDetailCollapseSeqRef.current = detailSidebarCollapseRequestSeq;
			if (detailSidebarCollapseRequestSeq > 0 && selectedArtifactIdForCurrentSession) setCollapseDesignCanvasSidebar(true);
		}, [
			currentConversation?.id,
			detailSidebarCollapseRequestSeq,
			selectedArtifactId,
			selectedArtifactIdForCurrentSession
		]);
		(0, import_react.useLayoutEffect)(() => {
			if (detailSidebarExpandRequestSeq === lastHandledDetailExpandSeqRef.current) return;
			lastHandledDetailExpandSeqRef.current = detailSidebarExpandRequestSeq;
			if (detailSidebarExpandRequestSeq > 0) setCollapseDesignCanvasSidebar(false);
		}, [
			currentConversation?.id,
			detailSidebarExpandRequestSeq,
			selectedArtifactId
		]);
		/**
		* Ardot 画布选中态自动跟随的统一 effect。
		*
		* 解决两类场景,且二者使用同一条规则,避免历史上多个 effect 互相干扰:
		*
		* 1. 首轮 synthetic「新画布」→ formal artifact 迁移:
		*    用户先点 synthetic launcher,selected 指向 synthetic id;
		*    onArdotReady 后产生第一张正式 `ardot/canvas` artifact。
		*    若不迁移,synthetic 被隐藏后 DetailPanel 找不到 selected,
		*    Ardot webview 会被 unmount。
		*
		* 2. 后续轮次新画布:
		*    会话内已有一张 ardot canvas artifact 处于 selected,新一轮
		*    `create_design` 后又产生第二张 formal artifact。用户期望
		*    sidebar active item 与 artifact tabs 自动跟随到新创建的画布,
		*    而不是停留在前一轮。
		*
		* 规则:每次 rawArtifacts 变化时计算"新增的 formal ardot_canvas",
		* 仅当当前 selected 已经处在 Ardot 画布(synthetic 或任意一张已知
		* formal)且确实有新增时,把 selected 迁到最新这一张。首次 mount /
		* 历史恢复时不会触发。
		*/
		const knownArdotCanvasIdsRef = (0, import_react.useRef)(null);
		(0, import_react.useEffect)(() => {
			const currentIds = rawArtifacts.filter((item) => item.type === "custom-artifact" && item.customType === "ardot/canvas").map((item) => item.id);
			if (knownArdotCanvasIdsRef.current === null) {
				knownArdotCanvasIdsRef.current = new Set(currentIds);
				if (selectedArtifactId === designNewCanvasArtifactId && currentIds.length > 0) {
					const targetId = currentIds[currentIds.length - 1];
					if (targetId && targetId !== selectedArtifactId) contextOnArtifactSelect?.(targetId);
				}
				return;
			}
			const known = knownArdotCanvasIdsRef.current;
			const newlyAddedIds = currentIds.filter((id) => !known.has(id));
			const nextKnown = new Set(currentIds);
			knownArdotCanvasIdsRef.current = nextKnown;
			if (newlyAddedIds.length === 0) return;
			if (!(!!selectedArtifactId && (selectedArtifactId === designNewCanvasArtifactId || known.has(selectedArtifactId) || nextKnown.has(selectedArtifactId)))) return;
			const targetId = newlyAddedIds[newlyAddedIds.length - 1];
			if (targetId && targetId !== selectedArtifactId) contextOnArtifactSelect?.(targetId);
		}, [
			contextOnArtifactSelect,
			designNewCanvasArtifactId,
			rawArtifacts,
			selectedArtifactId
		]);
		(0, import_react.useEffect)(() => {
			knownArdotCanvasIdsRef.current = null;
		}, [currentConversation?.id]);
		const openDesignCanvas = (0, import_react.useCallback)((options) => {
			if (options?.collapseSidebar) setCollapseDesignCanvasSidebar(true);
			if (designNewCanvasArtifactId) contextOnArtifactSelect?.(designNewCanvasArtifactId);
			if (onOpenMcpApp) {
				onOpenMcpApp({
					appId: ARDOT_OPEN_DESIGN_APP_ID,
					forceReload: options?.forceReload
				});
				return;
			}
			console.warn("[DetailPanelWrapper] cannot open design canvas; MCP App opener is unavailable");
		}, [
			contextOnArtifactSelect,
			designNewCanvasArtifactId,
			onOpenMcpApp
		]);
		/**
		* 点击正式 `customType === 'ardot/canvas'` artifact 的统一入口。
		*
		* 不同于 synthetic「新画布」launcher,这里:
		*   - 把 artifact 解析出的 fileId 作为 `toolInput.fileUrl` 透传给
		*     `ardot/open_design`(Ardot 工具 schema 是 `{ fileUrl: string }`,
		*     接受纯数字 fileId 或 `<host>/file/<id>` URL —— 见 cli.cjs
		*     `parseFileId`)。App.handleOpenMcpApp 收到后会经
		*     `useMcpAppsHost.openApp → loadApp(pendingOpen) →
		*     openHostApp(bootstrapToolCall:true)` 等价触发一次完整的
		*     `ardot/open_design` MCP App tool call,Ardot webview 据此切到
		*     目标画布。
		*   - 用 `targetArtifactId` 显式声明"这是用户点击 formal artifact",
		*     宿主 handleOpenMcpApp 据此把选中态写到该 artifact id,
		*     而不是回退到 synthetic「新画布」launcher。
		*
		* 若无法解析 fileId,直接走默认选中,不再调用 `onOpenMcpApp`。
		*/
		const openFormalArdotCanvas = (0, import_react.useCallback)((artifact, openSource, options) => {
			const fileId = extractArdotCanvasFileId({
				uri: "uri" in artifact ? artifact.uri : void 0,
				id: artifact.id
			});
			if (!fileId) return false;
			if (onOpenMcpApp) {
				onOpenMcpApp({
					appId: ARDOT_OPEN_DESIGN_APP_ID,
					toolInput: { fileUrl: fileId },
					targetArtifactId: artifact.id,
					openSource,
					forceReload: options?.forceReload
				});
				return true;
			}
			console.warn("[DetailPanelWrapper] cannot open formal Ardot canvas; MCP App opener is unavailable");
			return false;
		}, [onOpenMcpApp]);
		const isActiveMcpAppShowingArdotCanvas = (0, import_react.useCallback)((fileId) => {
			if (!activeMcpAppInstance || activeMcpAppInstance.appId !== ARDOT_OPEN_DESIGN_APP_ID) return false;
			return extractArdotOpenDesignFileId(activeMcpAppInstance.toolInput?.fileUrl) === fileId;
		}, [activeMcpAppInstance]);
		const handleOpenArdotCanvasArtifact = (0, import_react.useCallback)((artifact, options) => {
			if (artifact.id === designNewCanvasArtifactId || artifact.type === "custom-artifact" && artifact.customType === DESIGN_NEW_CANVAS_ARTIFACT_CUSTOM_TYPE) {
				openDesignCanvas({ forceReload: options?.forceReload });
				return;
			}
			if (artifact.type === "custom-artifact" && artifact.customType === "ardot/canvas") openFormalArdotCanvas(artifact, "file_tab", { forceReload: options?.forceReload });
		}, [
			designNewCanvasArtifactId,
			openDesignCanvas,
			openFormalArdotCanvas
		]);
		const handleDesignAuthAuthorize = (0, import_react.useCallback)(async () => {
			reportAuthConfirm(adapter);
			await authConnector();
			setArdotAuthBound(true);
			ardotAuthStore.getState().close();
			openDesignCanvas({ collapseSidebar: true });
			if (!ardotAuthStore.getState().wasCancelPrevented()) {
				const sid = currentConversation?.id;
				if (sid && adapter?.requestSendPrompt) {
					const adapterRef = adapter;
					setTimeout(() => {
						adapterRef.requestSendPrompt({
							sessionId: sid,
							prompt: [{
								type: "text",
								text: "继续"
							}]
						});
					}, 2e3);
				}
			}
		}, [
			adapter,
			authConnector,
			openDesignCanvas,
			currentConversation?.id
		]);
		const handleDesignAuthCancel = (0, import_react.useCallback)(() => {
			reportAuthCancel(adapter);
			ardotAuthStore.getState().close();
		}, [adapter]);
		(0, import_react.useEffect)(() => {
			window.addEventListener(ARDOT_AUTH_CLOSE_AND_OPEN_CANVAS_EVENT, handleDesignAuthCancel);
			return () => {
				window.removeEventListener(ARDOT_AUTH_CLOSE_AND_OPEN_CANVAS_EVENT, handleDesignAuthCancel);
			};
		}, [handleDesignAuthCancel]);
		const handleArdotAuthToggle = (0, import_react.useCallback)(async (next) => {
			if (next) {
				await authConnector();
				setArdotAuthBound(true);
				return;
			}
			await authRevoke();
			setArdotAuthBound(false);
		}, [authConnector, authRevoke]);
		/**
		* 在 WB renderer 主页 window 上暴露 Ardot 授权测试 API,供手工 QA / 自动化脚本
		* 在 DevTools Console 直接调用,验证"绑定 / 解绑 / 重新绑定"完整链路。
		*
		* 命名 `__ardotAuthTestApi` 对齐 mcp-app webview 已有的 `__mcpHostTestApi`
		* 风格,前缀双下划线提示外部代码这是辅助测试 API,不要在生产业务逻辑里依赖。
		*
		* 用法(DevTools Console):
		*   await window.__ardotAuthTestApi.revoke()   // 真实解绑,下次新建画布会触发未授权弹窗
		*   await window.__ardotAuthTestApi.bind()     // 重新绑定
		*
		* 内部直接复用 handleArdotAuthToggle,与 DetailPanel 上"绑定 Ardot 账号"
		* 测试开关共享同一条 authConnector / authRevoke 路径,行为完全一致。
		*/
		(0, import_react.useEffect)(() => {
			if (typeof window === "undefined") return;
			window.__ardotAuthTestApi = {
				revoke: async () => {
					await handleArdotAuthToggle(false);
					console.info("[__ardotAuthTestApi] revoke ok — 下次新建画布将触发未授权弹窗");
				},
				bind: async () => {
					await handleArdotAuthToggle(true);
					console.info("[__ardotAuthTestApi] bind ok");
				}
			};
			return () => {
				delete window.__ardotAuthTestApi;
			};
		}, [handleArdotAuthToggle]);
		const handleSidebarCollapseChange = (0, import_react.useCallback)((collapsed) => {
			if (documentPreviewSource === "colleague-assistant") {
				setCollapseDesignCanvasSidebar(collapsed);
				return;
			}
			if (!collapsed) setCollapseDesignCanvasSidebar(false);
		}, [documentPreviewSource]);
		const mapViewToMenuType = (view) => {
			switch (view) {
				case "artifacts": return "artifact";
				case "fileTree": return "files";
				case "preview": return "preview";
				case "changes": return "changes";
				case "mcpApps": return "mcpApps";
				case "expert": return "expert";
				case "overview": return "overview";
			}
		};
		const mapArtifactType = (type) => {
			switch (type) {
				case "implementation-plan": return "plan";
				case "task": return "task";
				case "overview": return "overview";
				case "media-artifact": return "media";
				case "diff-code":
				case "file-changes":
				case "custom-artifact": return "code";
				default: return "code";
			}
		};
		const [createdExperts, setCreatedExperts] = (0, import_react.useState)(() => expertCreated$.getValue());
		(0, import_react.useEffect)(() => {
			const subscription = expertCreated$.subscribe((experts) => {
				setCreatedExperts(experts);
			});
			return () => subscription.unsubscribe();
		}, []);
		const [teamMemberAvatars, setTeamMemberAvatars] = (0, import_react.useState)(() => expertTeamMemberAvatars$.getValue());
		(0, import_react.useEffect)(() => {
			const subscription = expertTeamMemberAvatars$.subscribe((map) => {
				setTeamMemberAvatars(map);
			});
			return () => subscription.unsubscribe();
		}, []);
		const [expertCategories, setExpertCategories] = (0, import_react.useState)([]);
		(0, import_react.useEffect)(() => {
			const expertFacade = agentServices?.expert;
			if (!expertFacade) return;
			expertFacade.getMarketCategories({
				enterpriseId,
				source: "builtin"
			}).then((result) => {
				setExpertCategories(result.categories ?? []);
			}).catch(() => {
				setExpertCategories([]);
			});
		}, [agentServices, enterpriseId]);
		const handleExpertTest = (0, import_react.useCallback)(async (expertId, _cardPosition, prompt) => {
			const targetExpert = createdExperts.find((e) => e.id === expertId);
			if (!targetExpert || !adapter) return;
			try {
				const i18nToString = (value) => {
					if (typeof value === "string") return value;
					if (value && typeof value === "object") {
						const text = value;
						return (locale === "zh" ? text.zh : text.en) ?? text.zh ?? text.en ?? "";
					}
					return "";
				};
				const expertName = i18nToString(targetExpert.displayName) || targetExpert.name;
				const expertProfession = i18nToString(targetExpert.profession);
				const targetExpertMeta = targetExpert;
				const toNonEmptyString = (value) => typeof value === "string" && value.trim() ? value.trim() : void 0;
				const expertRootDir = toNonEmptyString(targetExpertMeta.expertRootDir);
				const expertRootDirName = expertRootDir?.split(/[\\/]/).filter(Boolean).pop();
				const pluginName = toNonEmptyString(targetExpert.plugin) ?? toNonEmptyString(targetExpertMeta.pluginName);
				const marketplace = toNonEmptyString(targetExpert.marketplace) ?? (targetExpert.isCustomExpert || expertRootDir ? "my-experts" : void 0);
				const launchExpertId = marketplace === "my-experts" ? expertRootDirName ?? pluginName ?? targetExpert.id : targetExpert.id;
				const selectedExpertForLaunch = {
					...targetExpert,
					id: launchExpertId,
					name: expertName,
					profession: expertProfession,
					avatarUrl: targetExpert.avatar,
					prompt: prompt ?? i18nToString(targetExpert.defaultInitPrompt),
					defaultInitPrompt: (prompt ?? i18nToString(targetExpert.defaultInitPrompt)) || void 0,
					pluginName,
					pluginRegisteredName: toNonEmptyString(targetExpertMeta.pluginRegisteredName) ?? pluginName,
					updatedAt: toNonEmptyString(targetExpert.updatedAt),
					expertType: targetExpert.expertType,
					agentName: toNonEmptyString(targetExpertMeta.agentName),
					localPath: expertRootDir,
					expertRootDir,
					isCustomExpert: marketplace === "my-experts" ? true : targetExpert.isCustomExpert,
					...marketplace ? { marketplace } : {},
					...marketplace === "my-experts" ? { source: "custom" } : {},
					summonTimestamp: Date.now()
				};
				if (moduleHost) {
					await moduleHost.session.prepare({
						context: { expert: {
							id: launchExpertId,
							name: expertName,
							profession: expertProfession,
							avatar: targetExpert.avatar,
							plugin: pluginName,
							updatedAt: targetExpert.updatedAt,
							expertType: targetExpert.expertType,
							agentName: toNonEmptyString(targetExpertMeta.agentName),
							localPath: expertRootDir,
							expertRootDir,
							isCustomExpert: marketplace === "my-experts" ? true : targetExpert.isCustomExpert,
							marketplace,
							pluginRegisteredName: toNonEmptyString(targetExpertMeta.pluginRegisteredName) ?? pluginName,
							_selectedExpert: selectedExpertForLaunch
						} },
						prompt,
						source: "detail-panel-expert-test"
					});
					moduleHost.navigation.goHome();
					return;
				}
				context?.handleNewTask?.(true);
				skipAutoSelectWorkspaceForExpertInvoke$.next(true);
				taskStarterCwd$.next("");
				if (typeof adapter.setPendingExpert === "function") adapter.setPendingExpert(targetExpert);
				pendingExpertModeActivation$.next(true);
			} catch (err) {
				console.error("[handleExpertTest] failed:", err);
				toast.error("启动专家试用失败，请稍后重试");
			}
		}, [
			adapter,
			createdExperts,
			context,
			moduleHost,
			locale
		]);
		const onSidebarViewChange = (0, import_react.useCallback)((view) => {
			setCollapseDesignCanvasSidebar(false);
			reportEvent(Events.ArtifactTopMenuClicked, { menu_type: mapViewToMenuType(view) });
			contextOnSidebarViewChange?.(view);
		}, [
			contextOnSidebarViewChange,
			reportEvent,
			Events
		]);
		const performArtifactSelectCore = (0, import_react.useCallback)((artifactId) => {
			const requestSeq = ++detailPanelRequestSeqRef.current;
			if (artifactId) {
				const artifact = artifacts.find((a) => a.id === artifactId);
				const isFormalArdotCanvas = artifact?.type === "custom-artifact" && artifact.customType === "ardot/canvas";
				if (isFormalArdotCanvas && artifactId === selectedArtifactId) {
					const fileId = extractArdotCanvasFileId({
						uri: "uri" in artifact ? artifact.uri : void 0,
						id: artifact.id
					});
					if (fileId && isActiveMcpAppShowingArdotCanvas(fileId)) return;
				}
				if (isFormalArdotCanvas && openFormalArdotCanvas(artifact, "file_tab")) {
					reportEvent(Events.ArtifactSidebarClicked, {
						artifact_type: mapArtifactType(artifact.type),
						artifact_id: artifactId
					});
					return;
				}
				setCollapseDesignCanvasSidebar(false);
				reportEvent(Events.ArtifactSidebarClicked, {
					artifact_type: mapArtifactType(artifact?.type || "custom-artifact"),
					artifact_id: artifactId
				});
				const fileUrl = disableHtmlBrowserPreview ? void 0 : getHtmlArtifactPreviewUrl(artifact);
				if (fileUrl && inHtmlPreviewRef.current !== artifactId && !shouldSkipBrowserPreview({
					adapter,
					isProjectSession,
					forceCloudEnvironment
				})) {
					contextOnArtifactSelect?.(artifactId);
					if (fileUrl.startsWith("agent://")) {
						setBrowserUrlFromContext?.("");
						const sessionId = contextRef.current?.currentConversation?.id ?? "";
						if (sessionId) resolvePreviewUrl(sessionId, fileUrl).then((resolvedUrl) => {
							if (detailPanelRequestSeqRef.current !== requestSeq) return;
							if (resolvedUrl && !resolvedUrl.startsWith("agent://")) setBrowserUrlFromContext?.(resolvedUrl);
						}).catch(() => void 0);
					} else setBrowserUrlFromContext?.(fileUrl);
					contextOnSidebarViewChange?.("preview");
					inHtmlPreviewRef.current = artifactId;
					return;
				}
			}
			contextOnArtifactSelect?.(artifactId);
		}, [
			contextOnArtifactSelect,
			artifacts,
			reportEvent,
			Events,
			selectedArtifactId,
			isActiveMcpAppShowingArdotCanvas,
			openFormalArdotCanvas,
			setBrowserUrlFromContext,
			contextOnSidebarViewChange,
			disableHtmlBrowserPreview
		]);
		const getArtifactLocalSdkOpenPath = (0, import_react.useCallback)((artifactId) => {
			if (!artifactId) return;
			const artifact = artifacts.find((item) => item.id === artifactId);
			if (!artifact) return;
			if (artifact.type === "file-changes" || artifact.category === "file-changes") return;
			return getLocalSdkDocumentPath(getArtifactRelativePath(artifact));
		}, [artifacts]);
		const onArtifactSelect = (0, import_react.useCallback)((artifactId) => {
			if (artifactId === designNewCanvasArtifactId) {
				openDesignCanvas();
				return;
			}
			const localSdkPath = artifactId !== selectedArtifactId ? getArtifactLocalSdkOpenPath(artifactId) : void 0;
			const continueSelect = () => {
				if (artifactId !== selectedArtifactId) {
					const guard = context?.clearDocumentSelectionBeforeTabSwitch;
					if (guard) {
						guard(localSdkPath).then((allowed) => {
							if (allowed) performArtifactSelectCore(artifactId);
						}).catch(() => {
							performArtifactSelectCore(artifactId);
						});
						return;
					}
				}
				performArtifactSelectCore(artifactId);
			};
			continueSelect();
		}, [
			context,
			selectedArtifactId,
			designNewCanvasArtifactId,
			openDesignCanvas,
			performArtifactSelectCore,
			getArtifactLocalSdkOpenPath
		]);
		const handleFileSelect = (0, import_react.useCallback)((filePath) => {
			if (!filePath) {
				onFileSelect?.(void 0);
				return;
			}
			if (getLocalSdkDocumentPath(filePath)) {
				onFileSelect?.(filePath);
				return;
			}
			if (filePath === selectedFilePath) {
				onFileSelect?.(filePath);
				return;
			}
			const guard = context?.clearDocumentSelectionBeforeTabSwitch;
			if (guard) {
				guard(filePath).then((allowed) => {
					if (allowed) onFileSelect?.(filePath);
				}).catch(() => {
					onFileSelect?.(filePath);
				});
				return;
			}
			onFileSelect?.(filePath);
		}, [
			context,
			onFileSelect,
			selectedFilePath
		]);
		(0, import_react.useEffect)(() => {
			if (sidebarView !== "preview") inHtmlPreviewRef.current = null;
		}, [sidebarView]);
		/**
		* iframe 侧处理完"关闭请求"后的回调，resolve 对应 requestId 的 pending promise。
		* result.closed 为 true 表示 iframe 已完成关闭，false 表示用户取消或失败。
		*/
		const handleDocumentPreviewCloseResult = (0, import_react.useCallback)((result) => {
			const closeRequest = documentPreviewCloseRequest?.requestId === result.requestId ? documentPreviewCloseRequest : void 0;
			if (result.closed && closeRequest) {
				const latestSelectedFilePath = selectedFilePathRef.current;
				const normalizedClosedPath = normalizeMainWindowLocalFilePath(closeRequest.filePath);
				const normalizedSelectedPath = latestSelectedFilePath ? normalizeMainWindowLocalFilePath(latestSelectedFilePath) : void 0;
				const closeRequestSessionId = closeRequest.sessionId || void 0;
				const currentSessionId = currentConversationIdRef.current ?? sessionId;
				if ((!closeRequestSessionId || !currentSessionId || closeRequestSessionId === currentSessionId) && normalizedSelectedPath && normalizedClosedPath === normalizedSelectedPath) onFileSelect?.(void 0);
			}
			setDocumentPreviewCloseRequest((current) => current?.requestId === result.requestId ? void 0 : current);
			const pending = pendingDocumentPreviewCloseResolversRef.current.get(result.requestId);
			if (!pending) return;
			pendingDocumentPreviewCloseResolversRef.current.delete(result.requestId);
			clearTimeout(pending.timeoutId);
			pending.resolve(result.closed);
		}, [
			currentConversationIdRef,
			documentPreviewCloseRequest,
			onFileSelect,
			selectedFilePathRef,
			sessionId
		]);
		const requestDocumentPreviewClose = (0, import_react.useCallback)(async (sessionId, filePath) => {
			const normalizedFilePath = normalizeMainWindowLocalFilePath(filePath);
			const checkFileExists = adapterRef.current?.checkFileExists;
			if (normalizedFilePath && checkFileExists) {
				if (!await checkFileExists(normalizedFilePath).catch(() => true)) return true;
			}
			documentPreviewCloseRequestSeqRef.current += 1;
			const requestId = documentPreviewCloseRequestSeqRef.current;
			return new Promise((resolve) => {
				const timeoutId = setTimeout(() => {
					pendingDocumentPreviewCloseResolversRef.current.delete(requestId);
					setDocumentPreviewCloseRequest((current) => current?.requestId === requestId ? void 0 : current);
					console.warn("[DetailPanelWrapper] closeRequest:tab-close timeout", {
						filePath,
						requestId
					});
					resolve(false);
				}, 3e4);
				pendingDocumentPreviewCloseResolversRef.current.set(requestId, {
					resolve,
					timeoutId
				});
				setDocumentPreviewCloseRequest({
					requestId,
					sessionId: sessionId ?? "",
					filePath
				});
			});
		}, []);
		const requestDocumentTabCloseForTarget = (0, import_react.useCallback)(async (target) => {
			const closeRequest = resolveDetailPanelDocumentTabClose({
				target,
				sources: artifacts,
				currentSessionId: currentConversationIdRef.current ?? sessionId
			});
			if (!closeRequest.filePath) return true;
			return requestDocumentPreviewClose(closeRequest.sessionId, closeRequest.filePath);
		}, [
			artifacts,
			requestDocumentPreviewClose,
			sessionId
		]);
		const confirmDetailTabActivation = (0, import_react.useCallback)(async (target) => confirmDetailPanelTabActivation({
			target,
			beforeSelectFilePath: beforeSelectFilePathRef.current,
			clearDocumentSelectionBeforeTabSwitch: context?.clearDocumentSelectionBeforeTabSwitch,
			onBeforeSelectFilePathError: (error, filePath) => {
				console.warn("[DetailPanelWrapper] file tab pre-select gate failed", {
					filePath,
					error: error instanceof Error ? error.message : String(error)
				});
			}
		}), [context]);
		/**
		* 统一 tab 生命周期 gate 的「按种类解析目标文档」单一真源。
		*
		* 切换（{@link handleBeforeUnifiedTabActivate}）与关闭
		* （{@link handleBeforeUnifiedTabClose}）两个对称 gate 共用这套解析，避免同一份
		* by-kind 分派逻辑在「切换侧（宿主）」与「关闭侧（SidebarNext）」各写一遍：
		*
		* - `selectionDocument`：选区清理确认用的「目标文档标识」（在线 url / 文件路径 /
		*   产物的 SDK 本地路径）。
		* - `artifactId` / `closeFilePath`：保存后关闭用的产物 id 与源文件路径
		*   （`artifact.url`）。
		*/
		const resolveUnifiedTabTarget = (0, import_react.useCallback)((tab) => resolveDetailPanelDocumentTabTarget({
			tab,
			sources: artifacts,
			getArtifactLocalSdkOpenPath
		}), [artifacts, getArtifactLocalSdkOpenPath]);
		/**
		* 统一 tab 生命周期 gate ——「切换」侧（SidebarNext 顶部统一 tab 条点击切换前）。
		*
		* 经 {@link resolveUnifiedTabTarget} 解析「目标文档标识」，在切换视图 + selection
		* 之前整体确认是否清空 chat 输入框里指向其他文档的选区 chip：用户点「取消」→
		* 返回 false → useUnifiedTabs 不会激活该 tab（视图与 selection 都保持原状）；
		* 点「确认」→ 弹窗侧清空选区并返回 true → 正常切换。
		*
		* 统一流程：
		* 1. 先从 tab 解析目标；
		* 2. 若目标的默认动作是写 fileTree selection，则复用 DetailPanel 注册出的
		*    `beforeSelectFilePath` 组合 gate。该 gate 放行时已经完成内部 TabsContext commit；
		* 3. 否则只做选区清理确认，后续由目标自己的落地入口处理打开前预检。
		*/
		const handleBeforeUnifiedTabActivate = (0, import_react.useCallback)(async (tab) => {
			return confirmDetailTabActivation(resolveUnifiedTabTarget(tab));
		}, [confirmDetailTabActivation, resolveUnifiedTabTarget]);
		/**
		* 统一 tab 生命周期 gate ——「关闭」侧，与 {@link handleBeforeUnifiedTabActivate}
		* 对称。
		*
		* 经 {@link resolveUnifiedTabTarget} 解析出目标产物 / 源文件，SDK 文档走
		* 「保存后关闭」确认（dirty → closeIntent，等待 iframe 释放）。在线预览 / MCP App
		* 等无需保存的 tab 直接放行。返回 false 阻止关闭（tab 保持），true 才真正关闭。
		*/
		const handleBeforeUnifiedTabClose = (0, import_react.useCallback)(async (tab) => {
			if (documentPreviewSource === "colleague-assistant") {
				if (tab.kind === "file") context?.onFileSelect?.("");
				else if (tab.artifactId && tab.artifactId === selectedArtifactId) contextOnArtifactSelect?.(void 0);
				return true;
			}
			if (tab.kind !== "artifact" && tab.kind !== "fileChange" && tab.kind !== "file") return true;
			if (tab.kind !== "file" && !tab.artifactId) return true;
			return await requestDocumentTabCloseForTarget(resolveUnifiedTabTarget(tab)) !== false;
		}, [
			context?.onFileSelect,
			contextOnArtifactSelect,
			documentPreviewSource,
			requestDocumentTabCloseForTarget,
			resolveUnifiedTabTarget,
			selectedArtifactId
		]);
		const handleBrowserUrlChange = (0, import_react.useCallback)((url) => {
			if (!url) {
				setBrowserUrlFromContext?.(url);
				return;
			}
			if (isSameTencentDocsPreviewDocument(browserUrl, url, effectiveEdition)) {
				setBrowserUrlFromContext?.(url);
				return;
			}
			const guard = context?.clearDocumentSelectionBeforeTabSwitch;
			if (guard) {
				guard(url).then((allowed) => {
					if (allowed) setBrowserUrlFromContext?.(url);
				}).catch(() => {
					setBrowserUrlFromContext?.(url);
				});
				return;
			}
			setBrowserUrlFromContext?.(url);
		}, [
			browserUrl,
			context,
			effectiveEdition,
			setBrowserUrlFromContext
		]);
		/**
		* 从产物列表移除指定 artifact（本地文件不存在时的兜底清理）。
		* DetailPanel 内部已通过 checkFileExists 校验并 toast 提示，这里只做数据清理。
		*/
		const handleRemoveArtifact = (0, import_react.useCallback)((artifactId) => {
			context?.removeArtifact?.(artifactId);
		}, [context?.removeArtifact]);
		/**
		* 定期清理过期的缓存条目
		* 缓存策略说明：
		* - 主要的缓存失效检查在 handleReadFile 中通过 versionId 比对完成
		* - 这里只做时间维度的清理，防止内存泄漏
		* - 超过 5 分钟未访问的缓存条目会被清理
		*/
		(0, import_react.useEffect)(() => {
			const cache = diffCacheRef.current;
			if (cache.size === 0) return;
			const keysToDelete = [];
			const MAX_CACHE_AGE = 300 * 1e3;
			const now = Date.now();
			cache.forEach((entry, uri) => {
				if (now - entry.timestamp > MAX_CACHE_AGE) keysToDelete.push(uri);
			});
			if (keysToDelete.length > 0) keysToDelete.forEach((key) => cache.delete(key));
		}, [artifacts]);
		const handleBuild = (0, import_react.useCallback)(async (data) => {
			const conversationId = data.plan?.sessionId;
			if (!adapter || !conversationId) {
				console.warn("[DetailPanelWrapper] Cannot send build message: adapter or conversation not available", !!adapter, conversationId);
				return;
			}
			const planData = data.plan ? {
				id: data.plan.id,
				title: data.plan.title,
				content: "content" in data.plan ? data.plan.content : void 0
			} : null;
			const tasksData = data.tasks.map((t) => ({
				id: t.id,
				status: t.status,
				title: t.title
			}));
			const taskArtifact = artifacts.find((a) => a.type === "task" && "uri" in a);
			const planJsonPath = (taskArtifact && "uri" in taskArtifact ? taskArtifact.uri : void 0) || `.codebuddy/plans/${conversationId}/plan.json`;
			try {
				const readResult = await adapter.readFile(conversationId, planJsonPath);
				if (readResult.success && readResult.content) {
					const planJson = JSON.parse(readResult.content);
					planJson.todolist = data.tasks.map((t) => ({
						id: t.id,
						content: t.title,
						dependencies: [],
						status: t.status === "completed" ? "done" : t.status === "in-progress" ? "in-progress" : "pending"
					}));
					const writeResult = await adapter.writeFile(conversationId, planJsonPath, JSON.stringify(planJson, null, 2));
					if (!writeResult.success) console.error("[DetailPanelWrapper] Failed to save tasks to plan.json:", writeResult.error);
				} else console.warn("[DetailPanelWrapper] Could not read plan.json:", readResult.error);
			} catch (error) {
				console.error("[DetailPanelWrapper] Error updating plan.json:", error);
			}
			adapter.buildPlan({
				sessionId: conversationId,
				plan: planData,
				tasks: tasksData
			});
		}, [
			adapter,
			getCurrentConversationId,
			artifacts
		]);
		/**
		* 将 UI Task 状态映射为 todolist 状态
		*/
		const mapTaskStatusToTodoStatus = (status) => {
			switch (status) {
				case "completed": return "completed";
				case "in-progress": return "in_progress";
				case "waiting": return "pending";
				case "error": return "cancelled";
				default: return "pending";
			}
		};
		const handleArtifactChange = (0, import_react.useCallback)((artifact) => {
			const conversationId = artifact.sessionId;
			if (artifact.type === "file-changes" && artifact.fileChangeInfo?.cachedContent) {
				context?.updateArtifact(artifact);
				return;
			}
			if (!adapter || !conversationId) {
				console.warn(`[DetailPanelWrapper] Cannot save artifact: adapter or conversation not available, adapter: ${!!adapter}, conversationId: ${artifact.sessionId}`);
				return;
			}
			if (artifact.type === "implementation-plan" && artifact.uri) {
				const planContent = artifact.content || "";
				const planPath = artifact.uri;
				adapter.writeFile(conversationId, planPath, planContent).then((result) => {
					if (!result.success) console.error("[DetailPanelWrapper] Failed to save plan:", result.error);
				}).catch((error) => {
					console.error("[DetailPanelWrapper] Error saving plan:", error);
				});
				return;
			}
			if (artifact.type === "task" && artifact.uri) {
				const tasks = artifact.todolist || [];
				const planJsonPath = artifact.uri;
				(async () => {
					try {
						const readResult = await adapter.readFile(conversationId, planJsonPath);
						if (readResult.success && readResult.content) {
							const planJson = JSON.parse(readResult.content);
							planJson.todolist = tasks.map((t) => ({
								id: t.id,
								content: t.title,
								dependencies: [],
								status: mapTaskStatusToTodoStatus(t.status)
							}));
							const writeResult = await adapter.writeFile(conversationId, planJsonPath, JSON.stringify(planJson, null, 2));
							if (!writeResult.success) console.error("[DetailPanelWrapper] Failed to auto-save tasks:", writeResult.error);
						} else console.warn("[DetailPanelWrapper] Could not read plan.json for auto-save:", readResult.error);
					} catch (error) {
						console.error("[DetailPanelWrapper] Error auto-saving tasks:", error);
					}
				})();
				return;
			}
		}, [
			adapter,
			getCurrentConversationId,
			context?.updateArtifact
		]);
		/**
		* 根据 URI 更新对应 artifact 的缓存内容
		* 用于解决竞态条件：当 A 的响应返回时，即使当前显示的是 B，也能正确更新 A 的缓存
		*/
		const handleArtifactCacheUpdate = (0, import_react.useCallback)((uri, cachedContent) => {
			if (!uri || !cachedContent || !context?.updateArtifact) return;
			const artifactToUpdate = artifacts.find((item) => {
				if (item.type === "file-changes" && item.fileChangeInfo?.uri === uri) return !item.fileChangeInfo.cachedContent;
				if (item.type === "custom-artifact" && item.uri === uri) return !item.content;
				return false;
			});
			if (!artifactToUpdate) return;
			if (artifactToUpdate.type === "file-changes" && artifactToUpdate.fileChangeInfo) context.updateArtifact({
				...artifactToUpdate,
				fileChangeInfo: {
					...artifactToUpdate.fileChangeInfo,
					cachedContent
				}
			});
			else if (artifactToUpdate.type === "custom-artifact") context.updateArtifact({
				...artifactToUpdate,
				content: cachedContent
			});
		}, [artifacts, context?.updateArtifact]);
		const handleArtifactDownload = (0, import_react.useCallback)((artifact) => {
			const artifactName = artifact.title || (artifact.type === "media-artifact" ? artifact.url : "") || "unknown";
			const fileType = getFileExtension(artifactName);
			reportEvent(Events.ArtifactDownloadClicked, {
				file_type: fileType,
				artifact_name: artifactName
			});
		}, [
			reportEvent,
			Events,
			getFileExtension
		]);
		/**
		* 从 artifact 中提取文件路径，调用 openFolder 在文件管理器中定位到文件并高亮
		*/
		const handleOpenFolder = (0, import_react.useCallback)((artifact) => {
			const filePath = getArtifactRelativePath(artifact);
			if (!filePath) {
				console.warn("[DetailPanelWrapper] Cannot open folder: artifact has no path");
				return;
			}
			if (!adapter.openFolder) {
				console.warn("[DetailPanelWrapper] openFolder not supported by adapter");
				return;
			}
			adapter.openFolder(filePath).catch((error) => {
				console.error("[DetailPanelWrapper] openFolder failed:", error);
			});
		}, [adapter]);
		/**
		* 按裸文件路径调 openFolder（fileTree / OversizedPlaceholder 占位 UI 用）。
		* cnb#54643：fileTree 这条线没有 ArtifactItem 概念，需要一个直接收 filePath
		* 的版本。底层和 handleOpenFolder 共享同一个 desktop 能力。
		*
		* 失败处理：抛出异常让上层（OversizedPlaceholder）感知并 toast。这一点跟
		* 原有 handleOpenFolder（artifact 版本）的"静默 catch"不同 — 占位卡片的
		* 「在文件夹中显示」是用户能看见的主操作按钮，静默失败会让用户摸不着头脑。
		*/
		const handleOpenFolderByPath = (0, import_react.useCallback)(async (filePath) => {
			if (!filePath) return;
			if (!adapter.openFolder) throw new Error("openFolder not supported by adapter");
			await adapter.openFolder(filePath);
		}, [adapter]);
		const resolveExternalUrl = (0, import_react.useCallback)((url) => {
			if (!url.startsWith("agent://files/")) return url;
			const workspacePath = context?.currentConversation?.cwd;
			if (!workspacePath) return url;
			try {
				const relativePath = extractRelativePath(url);
				const normalizedWorkspacePath = workspacePath.replace(/\\/g, "/");
				const workspaceUrl = normalizedWorkspacePath.startsWith("file://") ? normalizedWorkspacePath : `file://${normalizedWorkspacePath.startsWith("/") ? "" : "/"}${normalizedWorkspacePath}`;
				const baseUrl = workspaceUrl.endsWith("/") ? workspaceUrl : `${workspaceUrl}/`;
				return new URL(relativePath, baseUrl).toString();
			} catch (error) {
				console.warn("[DetailPanelWrapper] Failed to resolve external URL:", error);
				return url;
			}
		}, [context?.currentConversation?.cwd]);
		const resolveToolFilePath = (0, import_react.useCallback)((filePath) => {
			if (filePath.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(filePath) || /^[a-zA-Z]+:\/\//.test(filePath)) return filePath;
			const cwd = context?.currentConversation?.cwd;
			if (cwd) return `${cwd.replace(/\/$/, "")}/${filePath}`;
			return filePath;
		}, [context?.currentConversation?.cwd]);
		const handleToolFileClick = (0, import_react.useCallback)((filePath) => {
			context?.openArtifact?.("artifacts", { filePath: resolveToolFilePath(filePath) });
		}, [context, resolveToolFilePath]);
		const { handleTencentDocsLink } = useTencentDocsLinkHandler({
			adapter,
			openPreview: (0, import_react.useCallback)((url) => context?.openArtifact?.("preview", { url }), [context]),
			previewSource: documentPreviewSource,
			sessionIdProvider: (0, import_react.useCallback)(() => currentConversationIdRef.current, [currentConversationIdRef])
		});
		const handleToolPreviewUrlClick = (0, import_react.useCallback)((url) => {
			if (handleTencentDocsLink(url)) return;
			context?.openArtifact?.("preview", { url });
		}, [context, handleTencentDocsLink]);
		const handleTencentDocsLinkForOpenExternal = (0, import_react.useCallback)((url) => {
			if (shouldBypassTencentDocsLinkInterceptForOpenExternal({
				sidebarView,
				currentPreviewUrl: browserUrl,
				targetUrl: url,
				edition: effectiveEdition
			})) return false;
			return handleTencentDocsLink(url);
		}, [
			sidebarView,
			browserUrl,
			effectiveEdition,
			handleTencentDocsLink
		]);
		const handleOpenExternal = (0, import_react.useCallback)((url) => {
			if (handleTencentDocsLinkForOpenExternal(url)) return;
			const resolvedUrl = resolveExternalUrl(url);
			adapter?.openExternal?.(resolvedUrl).catch((error) => {
				console.error("[DetailPanelWrapper] openExternal failed, falling back to window.open:", error);
				window.open(resolvedUrl, "_blank", "noopener,noreferrer");
			});
		}, [
			adapter,
			handleTencentDocsLinkForOpenExternal,
			resolveExternalUrl
		]);
		const agentMemberDefaultToolRenderer = (0, import_react.useCallback)(({ content, message, isSessionActive }) => {
			if (content.type !== "tool-call" || !("tool" in content)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanelCachedToolRenderer, {
				tool: content.tool,
				adapter: adapter ?? void 0,
				sessionId: context?.currentConversation?.id,
				onFileClick: handleToolFileClick,
				onPreviewUrlClick: handleToolPreviewUrlClick,
				compact: isCompactMode
			});
		}, [
			adapter,
			context?.currentConversation?.id,
			handleToolFileClick,
			handleToolPreviewUrlClick,
			isCompactMode
		]);
		const agentMemberMessageConfig = (0, import_react.useMemo)(() => ({
			assistantDisplay,
			defaultToolRenderer: agentMemberDefaultToolRenderer,
			getToolIconByName: getToolIcon,
			enableMetaFold: isCompactMode
		}), [
			assistantDisplay,
			agentMemberDefaultToolRenderer,
			isCompactMode
		]);
		/**
		* Step B：成员详情面板内联工具授权决策回调。
		*
		* 把 cb-chat-ui ToolApprovalMenu 提供的细粒度 optionId（allow/allowAll/
		* deny/reject_always 等）映射到 adapter.resolveFloatingPermission 的
		* 二值 decision —— 'allow' 系映射到 'allow'，'deny'/'reject' 系映射到
		* 'deny'。更细粒度的"始终允许/始终拒绝"信息会丢失，但这是当前 broadcast
		* 通道的契约（per project_resolve_interruption_full_chain.md）；后续若需
		* 区分需扩展 _codebuddy.ai/resolveInterruption RPC 协议。
		*
		* cloud-agent 等不暴露 resolveFloatingPermission 的产品保持 undefined：
		* AgentMemberViewer 检测 onPermissionResolve 缺失时不渲染按钮。
		*/
		const handleAgentMemberPermissionResolve = (0, import_react.useMemo)(() => {
			if (!adapter?.resolveFloatingPermission) return;
			return ({ sessionId, toolCallId, optionId }) => {
				const decision = optionId === "allow" || optionId === "allow_once" || optionId === "allowAll" || optionId === "allow_always" ? "allow" : "deny";
				adapter.resolveFloatingPermission(sessionId, toolCallId, decision).catch((err) => {
					console.warn("[DetailPanelWrapper] resolveFloatingPermission failed:", err);
				});
			};
		}, [adapter]);
		const handleGetDocumentPreviewUrl = (0, import_react.useCallback)(async (filePath) => {
			const currentLocalDocs = localDocsRef.current;
			const currentAdapter = adapterRef.current;
			if (!currentLocalDocs?.getPreviewUrl) return {
				success: false,
				error: "Not supported"
			};
			await ensureOrphanPreviewReconcile(currentLocalDocs, (event, payload) => currentAdapter?.reportTelemetry?.(event, payload));
			try {
				const ext = extractFileExtension(filePath);
				currentAdapter?.reportTelemetry?.("web_element_click", {
					elementId: "preview_tdoc_trigger",
					elementName: "触发腾讯文档预览",
					pageName: "file_preview",
					source: resolveDocArtifactSource(ext),
					type: ext,
					mode: "local"
				});
			} catch (error) {
				console.warn("[DetailPanelWrapper] reportTelemetry preview_tdoc_trigger failed:", error);
			}
			const selectedArtifactId = selectedArtifactIdRef.current;
			const selectedArtifact = selectedArtifactId ? rawArtifactsRef.current.find((item) => item.id === selectedArtifactId) : void 0;
			const selectedArtifactUrl = selectedArtifact && "url" in selectedArtifact ? selectedArtifact.url || "" : "";
			let previewSessionSource = "artifact-selected";
			if (selectedArtifactUrl && selectedArtifactUrl === filePath) previewSessionSource = "artifact-selected";
			const sessionId = resolveDocumentPreviewSessionId({
				source: previewSessionSource,
				currentSessionId: currentConversationIdRef.current
			});
			return currentLocalDocs.getPreviewUrl(filePath, { ...sessionId ? { sessionId } : {} });
		}, [
			adapterRef,
			currentConversationIdRef,
			localDocsRef,
			rawArtifactsRef,
			selectedArtifactIdRef
		]);
		const documentPreviewUrlGetter = getDocumentPreviewUrlOverride ?? (effectiveEnvironmentType === "cloud" || disableDocumentSdkPreview ? void 0 : localDocs?.getPreviewUrl ? handleGetDocumentPreviewUrl : void 0);
		/**
		* 读取文件内容（用于 diff 内容获取）
		* 带缓存机制，按文件路径缓存
		*
		* 读取来源优先级：
		*   1. context.readFileForDiff —— 嵌入场景显式注入的 sandbox-aware 读取器
		*      （如 ColleagueArtifactProvider 为同事/云助理悬浮窗注入的远端 sandbox 读取器）。
		*      这些 session 不在主 adapter 的文件读取上下文里，必须走注入路径，否则会读空 / 失败。
		*   2. adapter.readFile —— 默认主对话路径，适用于本地或当前 session 直连的场景。
		*
		* ⚠️ 维护提示：如确需调整读取模型，必须同步修改 ColleagueArtifactProvider 与
		* ConversationsContext 的契约，不能只删消费端（否则同事浮窗 diff / Markdown 图片回归）。
		*/
		const readFileForDiff = context?.readFileForDiff;
		const handleReadFile = (0, import_react.useCallback)(async (filePath) => {
			const conversationId = getCurrentConversationId();
			if (!adapter || !conversationId) throw new Error("Adapter or conversation not available");
			const cache = diffCacheRef.current;
			const cacheKey = `${conversationId}:${filePath}`;
			const cached = cache.get(cacheKey);
			if (cached && Date.now() - cached.timestamp < 5e3) return cached.content;
			if (readFileForDiff) {
				const content = await readFileForDiff(filePath);
				cache.set(cacheKey, {
					content,
					versionId: "",
					timestamp: Date.now()
				});
				return content;
			}
			const result = await adapter.readFile(conversationId, filePath);
			if (result.success && result.content !== void 0) {
				cache.set(cacheKey, {
					content: result.content,
					versionId: "",
					timestamp: Date.now()
				});
				return result.content;
			}
			throw new Error(result.error || "Failed to read file");
		}, [
			adapter,
			getCurrentConversationId,
			readFileForDiff
		]);
		const wrappedOpenArdotCanvasArtifact = (0, import_react.useCallback)((artifact) => {
			reportCanvasRefresh(adapter);
			handleOpenArdotCanvasArtifact(artifact, { forceReload: true });
		}, [adapter, handleOpenArdotCanvasArtifact]);
		const wrappedGenerateAppFromArdotCanvas = (0, import_react.useMemo)(() => {
			if (!onGenerateAppFromArdotCanvas) return;
			return () => {
				reportCanvasGenerateApp(adapter);
				onGenerateAppFromArdotCanvas();
			};
		}, [adapter, onGenerateAppFromArdotCanvas]);
		const wrappedOpenExternal = (0, import_react.useCallback)((url) => {
			if (isArdotCanvasSelected && url.includes("ardot.tencent.com")) reportCanvasEdit(adapter);
			handleOpenExternal(url);
		}, [
			adapter,
			handleOpenExternal,
			isArdotCanvasSelected
		]);
		const wrappedTogglePreviewFullscreen = (0, import_react.useCallback)((next) => {
			if (isArdotCanvasSelected) {
				if (next) reportCanvasExpand(adapter);
				else reportCanvasCollapse(adapter);
				const displayMode = next ? "fullscreen" : "inline";
				console.info("[DetailPanelWrapper] Ardot preview fullscreen toggled", { displayMode });
				notifyMcpAppDisplayModeChanged?.(displayMode);
			}
			onTogglePreviewFullscreen(next);
		}, [
			adapter,
			isArdotCanvasSelected,
			notifyMcpAppDisplayModeChanged,
			onTogglePreviewFullscreen
		]);
		const documentPreviewFrameOptions = (0, import_react.useMemo)(() => localDocs?.getFrameOptions?.({
			locale: context?.documentPreviewRuntime?.locale ?? documentPreviewLocale,
			theme: context?.documentPreviewRuntime?.theme ?? currentTheme
		}), [
			localDocs,
			context?.documentPreviewRuntime?.locale,
			context?.documentPreviewRuntime?.theme,
			currentTheme,
			documentPreviewLocale
		]);
		const handleReleaseDocumentPreviewContext = (0, import_react.useCallback)(async (documentResourceUri) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.releaseContext) return {
				success: false,
				error: "Not supported"
			};
			const result = await currentLocalDocs.releaseContext(documentResourceUri);
			if (result.released === true) notifyDocumentClientSaved(documentResourceUri);
			return result;
		}, [localDocsRef]);
		/**
		* keep-alive 池淘汰 dirty 文档前先跳转到该文档的 owner 会话。
		*/
		const handleDocumentPreviewRequestSwitchToSession = (0, import_react.useCallback)((targetSessionId, filePath) => {
			const payload = {
				sessionId: targetSessionId,
				filePath,
				source: WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES.tencentDocs,
				reason: WORKBUDDY_JUMP_TO_CONVERSATION_REASONS.poolEviction
			};
			adapter.emit(WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, payload);
		}, [adapter]);
		/** keep-alive 池满且无可淘汰候选时，提示用户主动保存/关闭其他文档后再试。 */
		const handleDocumentPreviewPoolFull = (0, import_react.useCallback)(() => {
			toast({
				message: t("tencentDocs.localFileOpen.previewPoolFull"),
				type: "warning"
			});
		}, [t]);
		const handleSaveDocumentPreviewContext = (0, import_react.useCallback)(async (documentResourceUri) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.saveContext) return {
				success: false,
				error: "Not supported"
			};
			const result = await currentLocalDocs.saveContext(documentResourceUri);
			if (result.success) notifyDocumentClientSaved(documentResourceUri);
			return result;
		}, [localDocsRef]);
		const handleAutoSaveDocumentPreviewContext = (0, import_react.useCallback)(async (documentResourceUri) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.autoSaveContext) return {
				saved: false,
				reason: "unsupported"
			};
			const result = await currentLocalDocs.autoSaveContext(documentResourceUri);
			if (result.saved) {
				notifyDocumentClientSaved(documentResourceUri);
				notifyDocumentPreviewAutoSaved(documentResourceUri);
			}
			return result;
		}, [localDocsRef]);
		const handleReleaseDocumentPreviewContextIfClean = (0, import_react.useCallback)((documentResourceUri) => {
			if (!localDocs?.releaseContextIfClean) return Promise.resolve({
				released: false,
				reason: "failed",
				error: "Not supported"
			});
			return localDocs.releaseContextIfClean(documentResourceUri);
		}, [localDocs]);
		const handleGetDocumentPreviewContextDirty = (0, import_react.useCallback)(async (documentResourceUri) => {
			const currentLocalDocs = localDocsRef.current;
			if (!currentLocalDocs?.getDirty) return true;
			return (await currentLocalDocs.getDirty(documentResourceUri)).isDirty === true;
		}, [localDocsRef]);
		/**
		* acquireOpenLease 返回 conflict（owned-by-other）时由 SdkDocumentPreview 上报。
		*
		* 职责：
		*   1. 调用 notifyLocalFileOpenConflictUi 弹 Toast + 触发 jump-to-conversation
		*   2. 回滚 selectedArtifactId → undefined，避免 DetailPanel 继续挂着冲突 artifact
		*
		* owned-by-self / none 情形在 renderer 端静默即可，不需要 Toast。
		*/
		const handleOpenConflict = (0, import_react.useCallback)((info) => {
			if (info.conflictOwnership !== "owned-by-other" || !info.ownerSessionId) return;
			const jump = (sid) => {
				const payload = {
					sessionId: sid,
					source: WORKBUDDY_JUMP_TO_CONVERSATION_SOURCES.tencentDocs,
					reason: WORKBUDDY_JUMP_TO_CONVERSATION_REASONS.alreadyActive
				};
				adapter.emit(WORKBUDDY_JUMP_TO_CONVERSATION_EVENT, payload);
			};
			notifyLocalFileOpenConflictUi({
				source: "session-open",
				result: {
					success: true,
					status: "owned-by-other",
					sessionId: info.ownerSessionId,
					sessionTitle: info.sessionTitle,
					filePath: info.filePath,
					message: info.message
				},
				filePath: info.filePath,
				requestSessionId: sessionId,
				currentSessionId: sessionId,
				onJumpToSession: jump
			});
			contextOnArtifactSelect?.(void 0);
		}, [
			adapter,
			contextOnArtifactSelect,
			sessionId
		]);
		const containerNode = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "detail-panel-container",
			style: {
				width: "100%",
				height: "100%"
			},
			"data-disable-open-folder-context-menu": forceCloudEnvironment ? "true" : void 0,
			"data-disable-local-file-actions": forceCloudEnvironment ? "true" : void 0,
			"data-remote-file-session-id": forceCloudEnvironment ? context?.currentConversation?.id : void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivePanel, {
					environmentType: effectiveEnvironmentType,
					width,
					narrowOverviewLayout,
					showDetailPanel: context?.showDetailPanel,
					detailInfo,
					artifacts,
					selectedArtifactId: selectedArtifactIdForCurrentSession,
					onArtifactSelect,
					artifactDragResolver,
					themeName,
					currentTheme,
					fileTree,
					selectedFilePath,
					onFileSelect: handleFileSelect,
					onBeforeLocalDocumentOpen: shouldBlockLocalDocumentUiOpen,
					onFileDoubleClick,
					onBuild: handleBuild,
					onArtifactChange: handleArtifactChange,
					onArtifactCacheUpdate: handleArtifactCacheUpdate,
					onArtifactDownload: handleArtifactDownload,
					onOpenFolder: disableArtifactToolbarActions || effectiveEnvironmentType !== "local" ? void 0 : handleOpenFolder,
					onOpenFolderByPath: disableArtifactToolbarActions || effectiveEnvironmentType !== "local" ? void 0 : handleOpenFolderByPath,
					onOpenExternal: wrappedOpenExternal,
					isPreviewFullscreen,
					onTogglePreviewFullscreen: wrappedTogglePreviewFullscreen,
					showMediaPreviewFullscreenButton,
					readFile: handleReadFile,
					markdownImageUrlResolver: context?.markdownImageUrlResolver,
					lazyFileTreeMode,
					fileTreeData,
					onLoadFileTreeChildren,
					loadedPaths,
					onLoadedPathsChange,
					collapsedFolders,
					onCollapsedFoldersChange,
					onTreeDataChange,
					onReadFile,
					hasActiveSession,
					fileTreeLoaded,
					onRequestFileTreeRefresh,
					sidebarView: sidebarView ?? (!hasOpenedDetailContent ? "overview" : width < 500 ? "overview" : void 0),
					onSidebarViewChange,
					browserUrl: enterpriseDocsPreviewUrl ? void 0 : browserUrl,
					browserUrlForTab: browserUrl,
					browserRefreshToken,
					onBrowserUrlChange: handleBrowserUrlChange,
					readFileWithFormat,
					sessionId,
					compact: width < 500,
					isGitWorkspace,
					isWorkbuddyDesktop,
					resolvePreviewUrl: hasResolvePreviewUrlCapability ? resolvePreviewUrl : void 0,
					isProjectionActive,
					fileVersionPanel,
					fileVersionDetailPanel,
					onShare: disableArtifactToolbarActions || isProjectSession || forceCloudEnvironment || adapter.environmentType !== "local" || !isShareEnabled ? void 0 : (visible, filePath, taskId, taskName) => {
						context?.handleShareFile?.(visible, filePath, taskId, taskName);
					},
					onShareToWeChat: disableArtifactToolbarActions || isProjectSession || forceCloudEnvironment || adapter.environmentType !== "local" || !isShareEnabled ? void 0 : (visible, filePath, taskId, taskName) => {
						context?.handleShareFile?.(visible, filePath, taskId, taskName, "wechat");
					},
					onWxShareFile: disableArtifactToolbarActions || isProjectSession || forceCloudEnvironment || adapter.environmentType !== "local" || !isShareEnabled ? void 0 : (visible, filePath, taskId, taskName) => {
						context?.handleWxShareFileDirect?.(visible, filePath, taskId, taskName);
					},
					htmlShareEnabled: disableArtifactToolbarActions ? false : isHtmlShareEnabled,
					disableShareForOfficeFiles: isOverseas(),
					uploadToCloudEnabled: disableArtifactUploadActions ? false : uploadToCloudEnabled,
					uploadTargets,
					uploadTargetIcons,
					onUploadToCloud: !disableArtifactUploadActions && uploadToCloudEnabled ? handleUploadToCloud : void 0,
					onBeforeUploadToCloudOpen: !disableArtifactUploadActions && uploadToCloudEnabled ? ensureArtifactSavedBeforeUploadToCloud : void 0,
					cwd: context?.currentConversation?.cwd,
					taskId: context?.currentConversation?.id,
					taskName: context?.currentConversation?.title,
					createdExperts: createdExperts.length > 0 ? createdExperts : void 0,
					expertCategories,
					onExpertTest: handleExpertTest,
					teamMemberAvatars,
					registerShowSourceForFile,
					agentMemberMessageConfig,
					mcpAppsAvailable,
					selectedMcpAppId,
					onSelectMcpApp,
					activeMcpAppInstance,
					mcpAppsStatus,
					onRetryMcpApp,
					onOpenArdotCanvasArtifact: wrappedOpenArdotCanvasArtifact,
					onMcpAppBridgeMessage,
					registerMcpAppsPostMessage,
					onMcpAppWebviewLoadError,
					onGenerateAppFromArdotCanvas: wrappedGenerateAppFromArdotCanvas,
					onArdotMcpAppViewportChange,
					detailMainOverlay: showDesignAuthOverlay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanelAuthOverlay, {
						onCancel: handleDesignAuthCancel,
						onAuthorize: handleDesignAuthAuthorize
					}) : enterpriseDocsPreviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterpriseDocsWebviewBody, {
						url: enterpriseDocsPreviewUrl,
						fileId: enterpriseDocsPreviewFileId,
						previewSource: documentPreviewSource
					}) : void 0,
					mcpAppsDebug: hideHeaderDebugTools ? void 0 : mcpAppsDebug,
					onToggleMcpAppsDebug: hideHeaderDebugTools ? void 0 : onToggleMcpAppsDebug,
					onLoadExampleMcpApps: hideHeaderDebugTools ? void 0 : onLoadExampleMcpApps,
					ardotAuthBound,
					onArdotAuthToggle: handleArdotAuthToggle,
					onSidebarCollapseChange: handleSidebarCollapseChange,
					onToggleDetailPanel: context?.onToggleDetailPanel,
					setDetailSidebarExpanded: context?.setDetailSidebarExpanded,
					pinSidebarRequestSeq: context?.pinSidebarRequestSeq,
					onExpandDetailPanelForSidebarPin: context?.expandDetailPanelForSidebarPin,
					hasDetailPreviewContent: hasOpenedDetailContent,
					hideSidebar: showDesignAuthOverlay,
					collapseSidebar: showDesignAuthOverlay || collapseDesignCanvasSidebar,
					onAgentMemberPermissionResolve: handleAgentMemberPermissionResolve,
					getDocumentPreviewUrl: documentPreviewUrlGetter,
					canUseDocumentPreviewForFilePath,
					onOpenConflict: handleOpenConflict,
					releaseDocumentPreviewContext: localDocs?.releaseContext ? handleReleaseDocumentPreviewContext : void 0,
					releaseDocumentPreviewContextIfClean: localDocs?.releaseContextIfClean ? handleReleaseDocumentPreviewContextIfClean : void 0,
					getDocumentPreviewContextDirty: localDocs?.getDirty ? handleGetDocumentPreviewContextDirty : void 0,
					saveDocumentPreviewContext: localDocs?.saveContext ? handleSaveDocumentPreviewContext : void 0,
					autoSaveDocumentPreviewContext: localDocs?.autoSaveContext ? handleAutoSaveDocumentPreviewContext : void 0,
					documentPreviewCloseRequest,
					documentPreviewSessionEvictionIntent,
					onDocumentPreviewSessionEvictionSettled: handleDocumentPreviewSessionEvictionSettled,
					onBeforeFilePathSelectChange: registerBeforeSelectFilePathWithLocalRef,
					onBeforeUnifiedTabActivate: handleBeforeUnifiedTabActivate,
					onBeforeUnifiedTabClose: handleBeforeUnifiedTabClose,
					onDocumentPreviewCloseResult: handleDocumentPreviewCloseResult,
					processingSessionIds,
					onDocumentPreviewRequestSwitchToSession: handleDocumentPreviewRequestSwitchToSession,
					onDocumentPreviewPoolFull: handleDocumentPreviewPoolFull,
					onDocumentPreviewActiveSlotChange: handleDocumentPreviewActiveSlotChange,
					documentPreviewFrameOptions,
					subscribeFileChange: context?.subscribeSandboxFileChange ? wrappedSandboxSubscribeFileChange : forceCloudEnvironment ? void 0 : wrappedSubscribeFileChange,
					onSaveFile: context?.writeSandboxFile ? wrappedSandboxSaveFile : forceCloudEnvironment ? void 0 : wrappedSaveFile,
					checkFileExists: forceCloudEnvironment ? void 0 : wrappedCheckFileExists,
					onRemoveArtifact: handleRemoveArtifact,
					onSendSelectionQuoteToChat: wrappedSelectionQuoteSend,
					onInsertSelectionQuoteToInput: wrappedSelectionQuoteInsert,
					onTrack: handleDetailPanelTrack
				}),
				tdocFolderPickerVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPickerModal, {
					visible: tdocFolderPickerVisible,
					onClose: handleTdocFolderPickerClose,
					onSelect: handleTdocFolderPicked
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaDirSelector, {
					open: imaDirPickerVisible,
					onClose: handleImaDirPickerClose,
					onSelected: handleImaDirSelected
				}),
				lexiangKbPickerVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LexiangKbPicker, {
					visible: lexiangKbPickerVisible,
					defaultSelectedKbId: void 0,
					bypassConnectorAuth: shouldBypassLexiangConnectorAuth,
					onClose: handleLexiangKbPickerClose,
					onConfirm: handleLexiangKbPicked
				}),
				netDrivePendingUpload?.projectId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDriveStoreProvider, {
					value: projectNetDriveUploadContext,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
						visible: netDriveUploadModalVisible,
						onClose: handleNetDriveUploadModalClose,
						onUploadComplete: () => {
							projectNetDriveUploadContext.filesStore.getState().reset();
							reportSaveToMyfileSuccess(adapter, "artifact_side_project");
						},
						defaultFolderId: projectNetDriveUploadContext.netDriveStore.getState().rootFolderId || void 0,
						projectId: netDrivePendingUpload.projectId,
						fileInfo: { name: netDrivePendingUpload.filename || "file" },
						onUploadToDrive: netDrivePendingUpload.runtimeId ? handleNetDriveUploadToDrive : void 0,
						onSaveFile: netDrivePendingUpload.runtimeId ? void 0 : handleNetDriveSaveFile,
						title: t("myFiles.save.titleProject"),
						rootFolderLabel: t("myFiles.selector.rootFolderProject")
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
					visible: netDriveUploadModalVisible,
					onClose: handleNetDriveUploadModalClose,
					onUploadComplete: () => {
						reportSaveToMyfileSuccess(adapter, "artifact_side_personal");
					},
					fileInfo: netDrivePendingUpload ? {
						name: netDrivePendingUpload.filename || "file",
						localFilePath: netDrivePendingUpload.filePath,
						sessionId: context?.currentConversation?.id || ""
					} : void 0,
					onSaveFile: handleNetDriveSaveFile,
					onViewSuccess: handlePersonalNetDriveUploadSuccess
				})
			]
		});
		if (fileVersionEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileVersionManagementProvider, {
			adapter: adapter ?? void 0,
			sessionId: context?.currentConversation?.id,
			children: containerNode
		});
		return containerNode;
	});
	DetailPanelWrapper.displayName = "DetailPanelWrapper";
}));
//#endregion
export { init_detail_panel_wrapper as n, DetailPanelWrapper as t };
