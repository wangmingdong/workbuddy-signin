import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $o as DndContext, Ii as ZoomOutIcon, Li as ZoomInIcon, Vt as DownloadIcon, as as useDroppable, ia as CloseIcon, is as useDraggable, os as useSensor, rs as init_core_esm, ss as useSensors, t as init_src, ts as PointerSensor, za as Button } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-EyL4WIXZ.js";
import { A as FlipIcon, M as RecoverIcon, a as ActionTooltip, i as useRotateControl, j as RotateIcon, n as useZoomControl, o as init_tooltip, r as init_useRotateControl, s as init_icons, t as init_useZoomControl } from "./useZoomControl-D-fnH4U0.js";
import { n as media_module_default, t as init_media_module } from "./media.module-xXG5L1DD.js";
//#region ../../packages/context-viewer-components/src/media-preview/hooks/usePreviewMode.ts
function usePreviewMode(options = {}) {
	const [isPreviewMode, setIsPreviewMode] = (0, import_react$1.useState)(options?.defaultPreviewMode ?? false);
	const openPreview = (0, import_react$1.useCallback)(() => {
		setIsPreviewMode(true);
		options.onPreviewOpen?.();
	}, [options.onPreviewOpen]);
	const closePreview = (0, import_react$1.useCallback)(() => {
		setIsPreviewMode(false);
		options.onPreviewClose?.();
	}, [options.onPreviewClose]);
	(0, import_react$1.useEffect)(() => {
		if (!isPreviewMode) return;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") closePreview();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isPreviewMode, closePreview]);
	return {
		isPreviewMode,
		openPreview,
		closePreview
	};
}
var import_react$1;
var init_usePreviewMode = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/image-preview/index.module.scss
var thumbnailContainer, thumbnailContent, thumbnailInstance, zoomIcon, previewOverlayMask, previewOverlay, imagePreviewOverlayIn, previewOverlayClosing, imagePreviewOverlayOut, previewStage, imagePreviewStageIn, previewStageClosing, imagePreviewStageOut, previewCloseActionArea, previewCloseButton, previewCloseIcon, index_module_default;
var init_index_module = __esmMin((() => {
	thumbnailContainer = "_thumbnailContainer_hhaih_1";
	thumbnailContent = "_thumbnailContent_hhaih_15";
	thumbnailInstance = "_thumbnailInstance_hhaih_25";
	zoomIcon = "_zoomIcon_hhaih_36";
	previewOverlayMask = "_previewOverlayMask_hhaih_42";
	previewOverlay = "_previewOverlay_hhaih_42";
	imagePreviewOverlayIn = "_imagePreviewOverlayIn_hhaih_1";
	previewOverlayClosing = "_previewOverlayClosing_hhaih_75";
	imagePreviewOverlayOut = "_imagePreviewOverlayOut_hhaih_1";
	previewStage = "_previewStage_hhaih_81";
	imagePreviewStageIn = "_imagePreviewStageIn_hhaih_1";
	previewStageClosing = "_previewStageClosing_hhaih_87";
	imagePreviewStageOut = "_imagePreviewStageOut_hhaih_1";
	previewCloseActionArea = "_previewCloseActionArea_hhaih_92";
	previewCloseButton = "_previewCloseButton_hhaih_114";
	previewCloseIcon = "_previewCloseIcon_hhaih_139";
	index_module_default = {
		thumbnailContainer,
		thumbnailContent,
		thumbnailInstance,
		zoomIcon,
		previewOverlayMask,
		previewOverlay,
		imagePreviewOverlayIn,
		previewOverlayClosing,
		imagePreviewOverlayOut,
		previewStage,
		imagePreviewStageIn,
		previewStageClosing,
		imagePreviewStageOut,
		previewCloseActionArea,
		previewCloseButton,
		previewCloseIcon
	};
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/image-preview/image-preview-component.tsx
var import_classnames, import_react, import_react_dom, import_jsx_runtime, IMAGE_PREVIEW_MOTION_MS, ImagePreviewComponent, Droppable, Draggable;
var init_image_preview_component = __esmMin((() => {
	init_core_esm();
	init_src();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_icons();
	init_tooltip();
	init_usePreviewMode();
	init_useRotateControl();
	init_useZoomControl();
	init_media_module();
	init_index_module();
	import_jsx_runtime = require_jsx_runtime();
	IMAGE_PREVIEW_MOTION_MS = 180;
	ImagePreviewComponent = ({ className, file, filename, content, handleDownload }) => {
		const [imageUrl, setImageUrl] = (0, import_react.useState)();
		const [position, setPosition] = (0, import_react.useState)({
			x: 0,
			y: 0
		});
		const [isPreviewMounted, setIsPreviewMounted] = (0, import_react.useState)(false);
		const [isPreviewClosing, setIsPreviewClosing] = (0, import_react.useState)(false);
		const closeAnimationTimerRef = (0, import_react.useRef)();
		const resetPreviewStateRef = (0, import_react.useRef)(() => {});
		const { isPreviewMode, openPreview, closePreview } = usePreviewMode();
		const { scale, scalePercentage, isMinScale, isMaxScale, isInitialScale, zoomInOnClick, zoomOutOnClick, zoomByWheel, resetZoom } = useZoomControl();
		const { rawRotate: rotate, rawRotateY: rotateY, rotateLeft, rotateRight, flipHorizontal, resetRotate } = useRotateControl();
		const t = useTranslation();
		(0, import_react.useEffect)(() => {
			if (!file && !content) return;
			let cleanup = () => {};
			if (file) {
				const url = URL.createObjectURL(file);
				setImageUrl(url);
				cleanup = () => {
					URL.revokeObjectURL(url);
				};
			} else if (content) setImageUrl(content);
			return cleanup;
		}, [file, content]);
		const sensors = useSensors(useSensor(PointerSensor));
		const handleDragEnd = (event) => {
			const { delta } = event;
			if (delta) setPosition((prev) => ({
				x: prev.x + delta.x,
				y: prev.y + delta.y
			}));
		};
		const resetPosition = () => {
			setPosition({
				x: 0,
				y: 0
			});
		};
		resetPreviewStateRef.current = () => {
			resetPosition();
			resetZoom();
			resetRotate();
		};
		(0, import_react.useEffect)(() => {
			window.clearTimeout(closeAnimationTimerRef.current);
			if (isPreviewMode) {
				setIsPreviewMounted(true);
				setIsPreviewClosing(false);
				return;
			}
			if (isPreviewMounted) {
				setIsPreviewClosing(true);
				closeAnimationTimerRef.current = window.setTimeout(() => {
					setIsPreviewMounted(false);
					setIsPreviewClosing(false);
					resetPreviewStateRef.current();
				}, IMAGE_PREVIEW_MOTION_MS);
			}
			return () => {
				window.clearTimeout(closeAnimationTimerRef.current);
			};
		}, [isPreviewMode, isPreviewMounted]);
		if (!file && !content) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: (0, import_classnames.default)(index_module_default.thumbnailContainer, className),
			tabIndex: 0,
			role: "region",
			"aria-label": t("mediaPreview.thumbnail"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.thumbnailContent,
				role: "button",
				"aria-label": t("mediaPreview.previewByName", { name: filename || "image" }),
				tabIndex: 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageUrl,
					alt: filename || "image",
					className: index_module_default.thumbnailInstance,
					crossOrigin: "use-credentials"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
					content: t("mediaPreview.preview"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.previewOverlayMask,
						onClick: openPreview,
						role: "button",
						"aria-label": t("mediaPreview.previewByName", { name: filename || "image" }),
						tabIndex: 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomInIcon, { className: index_module_default.zoomIcon })
					})
				})]
			})
		}), isPreviewMounted && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: (0, import_classnames.default)(index_module_default.previewOverlay, { [index_module_default.previewOverlayClosing]: isPreviewClosing }),
			onWheel: zoomByWheel,
			role: "dialog",
			"aria-label": t("mediaPreview.previewMode"),
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: media_module_default.topCenterActionArea,
					onClick: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: media_module_default.actionAreaContent,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: media_module_default.artifactNameArea,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: media_module_default.artifactName,
								children: filename || "image"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: media_module_default.actionButtonsArea,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
									content: t("mediaPreview.zoomOut"),
									portal: false,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: media_module_default.overlayButton,
										onClick: zoomOutOnClick,
										"aria-label": t("mediaPreview.zoomOut"),
										disabled: isMinScale,
										iconOnly: true,
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOutIcon, { className: media_module_default.overlayIcon }),
										variant: "ghost",
										size: "medium"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: media_module_default.scalePercentage,
									children: scalePercentage
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
									content: t("mediaPreview.zoomIn"),
									portal: false,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: media_module_default.overlayButton,
										onClick: zoomInOnClick,
										"aria-label": t("mediaPreview.zoomIn"),
										disabled: isMaxScale,
										iconOnly: true,
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomInIcon, { className: media_module_default.overlayIcon }),
										variant: "ghost",
										size: "medium"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
									content: t("mediaPreview.zoomReset"),
									portal: false,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: media_module_default.overlayButton,
										onClick: resetZoom,
										"aria-label": t("mediaPreview.zoomReset"),
										disabled: isInitialScale,
										iconOnly: true,
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoverIcon, { className: media_module_default.overlayIcon }),
										variant: "ghost",
										size: "medium"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
									content: t("mediaPreview.flipMirror"),
									portal: false,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: media_module_default.overlayButton,
										onClick: flipHorizontal,
										"aria-label": t("mediaPreview.flipMirror"),
										iconOnly: true,
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipIcon, { className: media_module_default.overlayIcon }),
										variant: "ghost",
										size: "medium"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
									content: t("mediaPreview.rotateLeft"),
									portal: false,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: media_module_default.overlayButton,
										onClick: rotateLeft,
										"aria-label": t("mediaPreview.rotateLeft"),
										iconOnly: true,
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateIcon, {
											className: media_module_default.overlayIcon,
											style: { transform: "rotateY(180deg)" }
										}),
										variant: "ghost",
										size: "medium"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
									content: t("mediaPreview.rotateRight"),
									portal: false,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: media_module_default.overlayButton,
										onClick: rotateRight,
										"aria-label": t("mediaPreview.rotateRight"),
										iconOnly: true,
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateIcon, { className: media_module_default.overlayIcon }),
										variant: "ghost",
										size: "medium"
									})
								}),
								!!handleDownload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
									content: t("mediaPreview.download"),
									portal: false,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: media_module_default.overlayButton,
										onClick: (e) => {
											e.stopPropagation();
											handleDownload();
										},
										"aria-label": t("mediaPreview.downloadByName", { name: filename || "image" }),
										iconOnly: true,
										leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadIcon, { className: media_module_default.overlayIcon }),
										variant: "ghost",
										size: "medium"
									})
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: (0, import_classnames.default)(media_module_default.topRightActionArea, index_module_default.previewCloseActionArea),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTooltip, {
						content: t("mediaPreview.previewClose"),
						portal: false,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: (0, import_classnames.default)(media_module_default.overlayButton, index_module_default.previewCloseButton),
							onClick: closePreview,
							"aria-label": t("mediaPreview.previewClose"),
							iconOnly: true,
							leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: (0, import_classnames.default)(media_module_default.overlayIcon, index_module_default.previewCloseIcon) }),
							variant: "ghost",
							size: "medium"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
					sensors,
					onDragEnd: handleDragEnd,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droppable, {
						id: "container",
						className: (0, import_classnames.default)(index_module_default.previewStage, { [index_module_default.previewStageClosing]: isPreviewClosing }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Draggable, {
							id: "image-instance",
							position,
							scale,
							rotate,
							rotateY,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: imageUrl,
								alt: filename || "image",
								className: media_module_default.previewInstance,
								style: {
									willChange: "transform",
									userSelect: "none",
									pointerEvents: "none"
								},
								crossOrigin: "use-credentials",
								draggable: false
							})
						})
					})
				})
			]
		}), document.body)] });
	};
	Droppable = ({ id, className, children }) => {
		const { setNodeRef } = useDroppable({ id });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: (0, import_classnames.default)(media_module_default.previewContainer, className),
			ref: setNodeRef,
			onClick: (e) => e.stopPropagation(),
			children
		});
	};
	Draggable = ({ id, position, scale, rotate, rotateY, children }) => {
		const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
		const finalTransform = (0, import_react.useMemo)(() => {
			const finalRotate = rotate ?? 0;
			return `translate(${(transform?.x ?? 0) + (position.x ?? 0)}px, ${(transform?.y ?? 0) + (position.y ?? 0)}px) rotate(${finalRotate}deg) rotateY(${rotateY}deg) scale(${scale})`;
		}, [
			position,
			scale,
			rotate,
			transform,
			rotateY
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...attributes,
			...listeners,
			ref: setNodeRef,
			className: "image-dnd-wrapper",
			style: {
				willChange: "transform",
				cursor: isDragging ? "grabbing" : "grab",
				transform: finalTransform,
				transition: isDragging ? void 0 : "transform 180ms cubic-bezier(0.2, 0, 0, 1)"
			},
			children
		});
	};
}));
//#endregion
export { init_image_preview_component as n, ImagePreviewComponent as t };
