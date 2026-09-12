import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { vt as ConversationsContext, yt as init_conversations_context } from "./contexts-D7XKqa2J.js";
import { t as init_foundation } from "./foundation-QOglV606.js";
import { E as XCloseIcon } from "./icons-Cj3UopO9.js";
import { a as isColleagueSdkDocumentPreviewPath, i as init_use_colleague_document_preview, n as init_colleague_artifact_provider, r as useColleagueArtifactLayout } from "./colleague-artifact-provider-5erYuufh.js";
import { n as init_detail_panel_wrapper, t as DetailPanelWrapper } from "./detail-panel-wrapper-BZS2W4bP.js";
//#region ../../packages/agent-ui/src/components/colleagues-panel/acp-chat/colleague-artifact-detail-panel.tsx
/**
* 同事助理右侧产物面板。
*
* 不用 foundation Drawer / FloatingPortal，原因是：
*   - drawer 必须严格嵌在 .colleague-chat-page（同事页面）内，全屏时也只是
*     在该 page 容器内"小窗 ↔ 大窗"形态切换，不能撑到整个浏览器视口。
*   - portal + position:fixed 模型必然脱离 page box，绕远路要靠 ResizeObserver
*     测量 page 宽度回灌 drawer width，状态多、容易脱节。
*
* 因此参考 .colleagues-chat-float（小窗变大窗）的实现：
*   - 直接渲染 <aside>，用 position: absolute 钉在已是 position:relative 的
*     .colleague-chat-page 内
*   - top/right/bottom = 0 始终保持；右下角对齐
*   - 宽度由 inline `width: ${px}` 直接给到 px：
*       · 默认（非全屏）：detailPanelWidth
*       · 全屏（is-wide）：parentWidth（page 容器实测宽度，回退到 detailPanelWidth）
*     两态都是 px → CSS 可对 width 做 transition，实现放大/缩小的过渡动画。
*   - DetailPanel 内部 `<div style="width: ${px}">` 锁宽度无法通过 CSS 改，
*     所以 ResizeObserver 监听 <aside> 自己的实际宽度，作为 px 值传给 DetailPanel。
*     过渡期间 ResizeObserver 高频回调，会让 DetailPanel 内容宽度跟着外壳同步平滑变化，
*     正是想要的"内容跟随外壳过渡"效果。
*/
function ColleagueArtifactDetailPanel() {
	const { showDetailPanel, detailPanelWidth, isPreviewFullscreen, getDocumentPreviewUrlOverride, registerBeforeSelectFilePath, togglePreviewFullscreen, closeDetailPanel } = useColleagueArtifactLayout();
	const conversations = import_react.useContext(ConversationsContext);
	const containerRef = (0, import_react.useRef)(null);
	const [containerWidth, setContainerWidth] = (0, import_react.useState)(null);
	const [parentWidth, setParentWidth] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!showDetailPanel) return;
		const el = containerRef.current;
		if (!el) return;
		const update = () => setContainerWidth(el.getBoundingClientRect().width);
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, [showDetailPanel]);
	(0, import_react.useLayoutEffect)(() => {
		if (!showDetailPanel) return;
		const parent = containerRef.current?.parentElement;
		if (!parent) return;
		const update = () => setParentWidth(parent.getBoundingClientRect().width);
		update();
		const ro = new ResizeObserver(update);
		ro.observe(parent);
		return () => ro.disconnect();
	}, [showDetailPanel]);
	const handleToggleFullscreen = (0, import_react.useCallback)((next) => {
		togglePreviewFullscreen(next);
	}, [togglePreviewFullscreen]);
	if (!showDetailPanel) return null;
	const effectiveDetailPanelWidth = containerWidth ?? detailPanelWidth;
	const targetWidth = isPreviewFullscreen ? parentWidth ?? detailPanelWidth : detailPanelWidth;
	const selectedArtifact = conversations?.artifacts?.find((artifact) => artifact.id === conversations.selectedArtifactId);
	const selectedArtifactPreviewPath = selectedArtifact?.type === "media-artifact" ? selectedArtifact.url : selectedArtifact?.uri;
	const documentPreviewUrlOverride = isColleagueSdkDocumentPreviewPath(conversations?.sidebarView === "fileTree" ? conversations.selectedFilePath : selectedArtifactPreviewPath) ? getDocumentPreviewUrlOverride : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		ref: containerRef,
		className: `colleague-chat-artifact-drawer${isPreviewFullscreen ? " is-wide" : ""}`,
		style: { width: targetWidth },
		"aria-label": "产物预览",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "colleague-chat-artifact-drawer__header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "colleague-chat-artifact-drawer__title",
				children: "产物预览"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "colleague-chat-artifact-drawer__close",
				"aria-label": "返回对话",
				onClick: closeDetailPanel,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XCloseIcon, { size: 16 })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "colleague-chat-artifact-drawer__body",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanelWrapper, {
				width: effectiveDetailPanelWidth,
				detailInfo: null,
				isPreviewFullscreen,
				onTogglePreviewFullscreen: handleToggleFullscreen,
				canSaveArtifactToLibrary: false,
				disableArtifactToolbarActions: true,
				disableArtifactUploadActions: true,
				hideHeaderDebugTools: true,
				documentPreviewSource: "colleague-assistant",
				forceCloudEnvironment: true,
				disableDocumentSdkPreview: true,
				getDocumentPreviewUrlOverride: documentPreviewUrlOverride,
				canUseDocumentPreviewForFilePath: isColleagueSdkDocumentPreviewPath,
				registerBeforeSelectFilePath
			})
		})]
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_conversations_context();
	init_foundation();
	init_detail_panel_wrapper();
	init_use_colleague_document_preview();
	init_colleague_artifact_provider();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ColleagueArtifactDetailPanel };
