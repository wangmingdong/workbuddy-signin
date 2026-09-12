import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { K as Loader, r as X, t as init_lucide_react } from "./lucide-react-CmX0JwWL.js";
import { ct as Button, n as init_components } from "./foundation-QOglV606.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { t as AddToChatIcon, x as init_ui_icons } from "./ui-icons-BXAc5pRk.js";
import { o as init_file_icons, r as init_file_utils } from "./file-utils-BzZ2uFuU.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/selection-action-bar.tsx
var import_jsx_runtime$4, SelectionActionBar;
var init_selection_action_bar = __esmMin((() => {
	require_react();
	init_components();
	init_useI18n();
	init_ui_icons();
	import_jsx_runtime$4 = require_jsx_runtime();
	SelectionActionBar = ({ count, onConfirm }) => {
		const t = useTranslation();
		if (count < 1) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "my-files-selection-bar",
			role: "toolbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "my-files-selection-bar__count",
				children: t("myFiles.selection.selectedCount").replace("{count}", String(count))
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Button, {
				variant: "primary",
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AddToChatIcon, { size: 14 }),
				onClick: onConfirm,
				children: t("myFiles.actions.addToTask")
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/top-progress-banner.less
var init_top_progress_banner$1 = __esmMin((() => {})), import_react_dom$1, import_jsx_runtime$3, TopProgressBanner;
var init_top_progress_banner = __esmMin((() => {
	init_top_progress_banner$1();
	init_lucide_react();
	require_react();
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	import_jsx_runtime$3 = require_jsx_runtime();
	TopProgressBanner = ({ visible, action, fileName, percent, done = false, onCancel }) => {
		const t = useTranslation();
		if (!visible) return null;
		const safePercent = Math.max(0, Math.min(100, percent));
		const showPercent = percent >= 0 && !done;
		const actionLabel = t(`myFiles.progress.action.${action}`);
		const cancelLabel = t("myFiles.progress.cancel", { action: actionLabel });
		return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "cb-top-progress-banner",
			role: "status",
			"aria-live": "polite",
			"data-action": action,
			children: [
				done ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "cb-top-progress-banner__icon-done",
					"aria-hidden": "true",
					children: "✓"
				}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Loader, {
					size: 14,
					className: "cb-top-progress-banner__icon",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "cb-top-progress-banner__text",
					title: fileName,
					children: done ? t("myFiles.progress.done", {
						action: actionLabel,
						name: fileName
					}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [t("myFiles.progress.inProgress", {
						action: actionLabel,
						name: fileName
					}), showPercent && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("span", {
						className: "cb-top-progress-banner__percent",
						children: [Math.floor(safePercent), "%"]
					})] })
				}),
				!done && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "cb-top-progress-banner__track",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "cb-top-progress-banner__fill",
						style: { width: `${safePercent}%` }
					})
				}),
				!done && onCancel && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					type: "button",
					className: "cb-top-progress-banner__cancel",
					onClick: (e) => {
						e.stopPropagation();
						onCancel();
					},
					title: cancelLabel,
					"aria-label": cancelLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(X, { size: 12 })
				})
			]
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/file-context-menu.tsx
/** 视口边界裁剪：默认左上角对齐鼠标，越界时贴边/向上展开（菜单底边精确对齐鼠标 y）。 */
function clampToViewport(x, y, w, h) {
	const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
	const vh = typeof window !== "undefined" ? window.innerHeight : 768;
	let left = x;
	let top = y;
	if (left + w + VIEWPORT_PADDING > vw) left = Math.max(VIEWPORT_PADDING, vw - w - VIEWPORT_PADDING);
	if (top + h + VIEWPORT_PADDING > vh) top = Math.max(VIEWPORT_PADDING, y - h);
	return {
		left,
		top
	};
}
var import_react$2, import_react_dom, import_jsx_runtime$2, MENU_MIN_WIDTH, MENU_EST_HEIGHT, VIEWPORT_PADDING, UploadCloudIcon, FileContextMenu;
var init_file_context_menu = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	import_jsx_runtime$2 = require_jsx_runtime();
	MENU_MIN_WIDTH = 180;
	MENU_EST_HEIGHT = 280;
	VIEWPORT_PADDING = 8;
	UploadCloudIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			d: "M20 16.7C21.2 15.7 22 14.2 22 12.5C22 9.5 19.5 7 16.5 7C16.3 7 16.1 6.9 16 6.7C14.7 4.5 12.3 3 9.5 3C5.4 3 2 6.4 2 10.5C2 12.6 2.8 14.4 4.2 15.8",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			d: "M8 16L12 12L16 16M12 12V22",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	FileContextMenu = ({ isFavorite, isLocal = false, onClose, onToggleFavorite, onAddToTask, onOpenFolder, onShare, onDownload, onDelete, uploadTargets, position }) => {
		const t = useTranslation();
		const menuRef = (0, import_react$2.useRef)(null);
		const [uploadSubOpen, setUploadSubOpen] = (0, import_react$2.useState)(false);
		const [uploadSubFlipLeft, setUploadSubFlipLeft] = (0, import_react$2.useState)(false);
		const uploadSubItemRef = (0, import_react$2.useRef)(null);
		const uploadSubMenuRef = (0, import_react$2.useRef)(null);
		(0, import_react$2.useEffect)(() => {
			const handleClick = (e) => {
				if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
			};
			document.addEventListener("mousedown", handleClick);
			return () => document.removeEventListener("mousedown", handleClick);
		}, [onClose]);
		const [measuredSize, setMeasuredSize] = (0, import_react$2.useState)(null);
		const fixedStyle = (0, import_react$2.useMemo)(() => {
			if (!position) return;
			const w = measuredSize?.w ?? MENU_MIN_WIDTH;
			const h = measuredSize?.h ?? MENU_EST_HEIGHT;
			const { left, top } = clampToViewport(position.x, position.y, w, h);
			return {
				position: "fixed",
				left,
				top,
				right: "auto",
				bottom: "auto",
				zIndex: 10100,
				visibility: measuredSize ? "visible" : "hidden"
			};
		}, [position, measuredSize]);
		(0, import_react$2.useLayoutEffect)(() => {
			if (!position) {
				setMeasuredSize(null);
				return;
			}
			const el = menuRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			setMeasuredSize((prev) => {
				if (prev && prev.w === rect.width && prev.h === rect.height) return prev;
				return {
					w: rect.width,
					h: rect.height
				};
			});
		}, [position]);
		(0, import_react$2.useLayoutEffect)(() => {
			if (!uploadSubOpen) return;
			const item = uploadSubItemRef.current;
			const sub = uploadSubMenuRef.current;
			if (!item || !sub) return;
			const itemRect = item.getBoundingClientRect();
			const subWidth = sub.offsetWidth || MENU_MIN_WIDTH;
			setUploadSubFlipLeft((typeof window !== "undefined" ? window.innerWidth : 1024) - itemRect.right < subWidth + VIEWPORT_PADDING);
		}, [uploadSubOpen]);
		const handleAction = (action) => {
			action?.();
			onClose();
		};
		const menuNode = /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "my-files-context-menu",
			ref: menuRef,
			style: fixedStyle,
			onClick: (e) => e.stopPropagation(),
			onContextMenu: (e) => e.preventDefault(),
			children: [
				uploadTargets && uploadTargets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "my-files-context-menu-item my-files-context-menu-item--has-sub",
					ref: uploadSubItemRef,
					onMouseEnter: () => setUploadSubOpen(true),
					onMouseLeave: () => setUploadSubOpen(false),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(UploadCloudIcon, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("myFiles.actions.uploadToCloud") }),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
							className: "my-files-context-menu-arrow",
							width: "8",
							height: "8",
							viewBox: "0 0 8 8",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
								d: "M3 2l2.5 2.5L3 7",
								stroke: "currentColor",
								strokeWidth: "1.2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						}),
						uploadSubOpen && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: `my-files-context-menu my-files-context-submenu${uploadSubFlipLeft ? " my-files-context-submenu--left" : ""}`,
							ref: uploadSubMenuRef,
							children: uploadTargets.map((target) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
								className: "my-files-context-menu-item",
								onClick: () => {
									target.onClick();
									onClose();
								},
								children: [target.icon, /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: target.label })]
							}, target.key))
						})
					]
				}),
				onAddToTask && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "my-files-context-menu-item",
					onClick: () => handleAction(onAddToTask),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
							cx: "12",
							cy: "12",
							r: "9",
							stroke: "currentColor",
							strokeWidth: "1.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
							d: "M12 8v8M8 12h8",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("myFiles.actions.addToTask") })]
				}),
				isLocal && onOpenFolder && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "my-files-context-menu-item",
					onClick: () => handleAction(onOpenFolder),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
							d: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z",
							stroke: "currentColor",
							strokeWidth: "1.5"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("myFiles.actions.openFolder") })]
				}),
				onShare && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "my-files-context-menu-item",
					onClick: () => handleAction(onShare),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
								cx: "18",
								cy: "5",
								r: "3",
								stroke: "currentColor",
								strokeWidth: "1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
								cx: "6",
								cy: "12",
								r: "3",
								stroke: "currentColor",
								strokeWidth: "1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
								cx: "18",
								cy: "19",
								r: "3",
								stroke: "currentColor",
								strokeWidth: "1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
								d: "M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98",
								stroke: "currentColor",
								strokeWidth: "1.5"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("myFiles.actions.share") })]
				}),
				onDownload && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "my-files-context-menu-item",
					onClick: () => handleAction(onDownload),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
							d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("myFiles.actions.download") })]
				}),
				onToggleFavorite && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "my-files-context-menu-item",
					onClick: () => handleAction(onToggleFavorite),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: isFavorite ? "currentColor" : "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
							d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinejoin: "round"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: isFavorite ? t("myFiles.actions.unfavorite") : t("myFiles.actions.favorite") })]
				}),
				onDelete && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "my-files-context-menu-sep" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "my-files-context-menu-item danger",
					onClick: () => handleAction(onDelete),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
							d: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: t("myFiles.actions.delete") })]
				})] })
			]
		});
		if (position && typeof document !== "undefined") return (0, import_react_dom.createPortal)(menuNode, document.body);
		return menuNode;
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/file-type-constants.ts
var FILE_TYPE_LABELS;
var init_file_type_constants = __esmMin((() => {
	FILE_TYPE_LABELS = {
		document: "myFiles.fileType.document",
		markdown: "myFiles.fileType.document",
		spreadsheet: "myFiles.fileType.spreadsheet",
		presentation: "myFiles.fileType.presentation",
		pdf: "myFiles.fileType.pdf",
		image: "myFiles.fileType.image",
		video: "myFiles.fileType.video",
		audio: "myFiles.fileType.audio",
		website: "myFiles.fileType.website",
		code: "myFiles.fileType.code",
		diagram: "myFiles.fileType.diagram",
		folder: "myFiles.typeFilter.folder",
		other: "myFiles.typeFilter.other"
	};
}));
var init_file_type_icon = __esmMin((() => {
	require_react();
	require_jsx_runtime();
}));
var init_view_toggle_icons = __esmMin((() => {
	require_react();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/index.ts
var init_shared = __esmMin((() => {
	init_file_context_menu();
	init_selection_action_bar();
	init_file_icons();
	init_file_type_constants();
	init_file_type_icon();
	init_file_utils();
	init_top_progress_banner();
	init_view_toggle_icons();
}));
//#endregion
export { init_top_progress_banner as a, TopProgressBanner as i, FILE_TYPE_LABELS as n, SelectionActionBar as o, FileContextMenu as r, init_selection_action_bar as s, init_shared as t };
