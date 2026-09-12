import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Ra as IconButton, Yr as toast, kr as Popover, mt as ArtifactFileTypeIconV2, pn as Dropdown, t as init_src$1, za as Button, zn as VscodeFileIcon } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { f as isMcpAppsTodoEntryEnabled, i as SidebarNavContent, n as UnsavedDirtyDot, r as DetailPanel, t as init_src$2 } from "./src-BNWvGoZP.js";
import { m as subscribeSdkPreviewContextChange } from "./FileTabs-OcDV9oyi.js";
import { n as useI18n, r as useTranslation } from "./useI18n-EyL4WIXZ.js";
import { r as normalizeFileUrl } from "./file-path-usr-Mg_y.js";
//#region ../../packages/agent-sidebar-ui/src/SidebarNext.scss
var init_SidebarNext$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/components/ArtifactTabsBar.scss
var init_ArtifactTabsBar$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/components/ArtifactTabsBar.tsx
function clamp(value, min, max) {
	if (max < min) return min;
	return Math.min(Math.max(value, min), max);
}
function CloseIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			fillRule: "evenodd",
			transform: "translate(2.24448 2.24448)",
			d: "M5.5166 4.7555L9.511 8.75L8.75 9.511L4.7555 5.5166L0.761 9.511L0 8.75L3.9945 4.7555L0 0.761L0.761 0L4.7555 3.9945L8.75 0L9.511 0.761L5.5166 4.7555Z"
		})
	});
}
/** MCP Apps tab 图标（与 ViewSelector 里同款 2×2 grid 语义）。 */
function McpAppTabIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
		width: "13",
		height: "13",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
				x: "3",
				y: "3",
				width: "7",
				height: "7",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
				x: "14",
				y: "3",
				width: "7",
				height: "7",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
				x: "3",
				y: "14",
				width: "7",
				height: "7",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
				x: "14",
				y: "14",
				width: "7",
				height: "7",
				rx: "1"
			})
		]
	});
}
/** 浏览器预览 tab 图标（与 ViewSelector 的 preview 条目同款地球图形）。 */
function PreviewTabIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
		width: "13",
		height: "13",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("line", {
				x1: "2",
				y1: "12",
				x2: "22",
				y2: "12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
		]
	});
}
/** 按 tab kind / label 扩展名选图标。 */
function pickTabIcon(tab) {
	if (tab.kind === "mcpApp") return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(McpAppTabIcon, {});
	if (tab.kind === "preview") return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(PreviewTabIcon, {});
	if (tab.kind === "fileChange") return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(VscodeFileIcon, { fileName: tab.label });
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArtifactFileTypeIconV2, { fileName: tab.label });
}
function orderTabs(tabs, orderedIds) {
	if (!orderedIds) return tabs;
	const byId = new Map(tabs.map((tab) => [tab.id, tab]));
	const ordered = [];
	orderedIds.forEach((id) => {
		const tab = byId.get(id);
		if (tab) ordered.push(tab);
	});
	tabs.forEach((tab) => {
		if (!ordered.some((item) => item.id === tab.id)) ordered.push(tab);
	});
	return ordered;
}
function moveIdByPointer(order, draggedId, pointerX, tabRefs) {
	const withoutDragged = order.filter((id) => id !== draggedId);
	let insertIndex = withoutDragged.length;
	for (let index = 0; index < withoutDragged.length; index += 1) {
		const node = tabRefs.get(withoutDragged[index]);
		if (!node) continue;
		const rect = node.getBoundingClientRect();
		if (pointerX < rect.left + rect.width / 2) {
			insertIndex = index;
			break;
		}
	}
	const next = [...withoutDragged];
	next.splice(insertIndex, 0, draggedId);
	return next;
}
function ArtifactTabBody({ tab, closeLabel, onClose, clone = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
			className: "artifact-tab__icon",
			children: pickTabIcon(tab)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
			className: "artifact-tab__name",
			children: tab.label
		}),
		tab.isDirty ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(UnsavedDirtyDot, {}) : null,
		clone ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
			className: "artifact-tab__close artifact-tab__close--clone",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CloseIcon, {})
		}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
			type: "button",
			className: "artifact-tab__close",
			onClick: onClose,
			"aria-label": closeLabel,
			onMouseDown: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CloseIcon, {})
		})
	] });
}
var import_classnames, import_react$7, import_react_dom$1, import_jsx_runtime$4, DRAG_START_THRESHOLD, ArtifactTab, ArtifactTabsBar;
var init_ArtifactTabsBar = __esmMin((() => {
	init_ArtifactTabsBar$1();
	init_src$1();
	init_src$2();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	import_jsx_runtime$4 = require_jsx_runtime();
	DRAG_START_THRESHOLD = 4;
	ArtifactTab = ({ tab, isActive, isDragPlaceholder, draggable, onSelect, onClose, onPointerDown, closeLabel, registerTabRef }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		ref: (node) => registerTabRef(tab.id, node),
		className: (0, import_classnames.default)("artifact-tab", {
			"artifact-tab--active": isActive,
			"artifact-tab--draggable": draggable,
			"artifact-tab--drag-placeholder": isDragPlaceholder
		}),
		onClick: onSelect,
		onPointerDown,
		"data-artifact-id": tab.id,
		role: "tab",
		"aria-selected": isActive,
		title: tab.label,
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArtifactTabBody, {
			tab,
			closeLabel,
			onClose
		})
	});
	ArtifactTabsBar = ({ tabs, activeTabId, onSelect, onClose, onReorder, closeLabel = "Close" }) => {
		const listRef = (0, import_react$7.useRef)(null);
		const tabRefs = (0, import_react$7.useRef)(/* @__PURE__ */ new Map());
		const dragStateRef = (0, import_react$7.useRef)(null);
		const visualOrderRef = (0, import_react$7.useRef)(null);
		const previousRectsRef = (0, import_react$7.useRef)(null);
		const removeDragListenersRef = (0, import_react$7.useRef)(null);
		const suppressNextClickRef = (0, import_react$7.useRef)(false);
		const [visualOrder, setVisualOrder] = (0, import_react$7.useState)(null);
		const [dragSnapshot, setDragSnapshot] = (0, import_react$7.useState)(null);
		const tabsById = (0, import_react$7.useMemo)(() => new Map(tabs.map((tab) => [tab.id, tab])), [tabs]);
		const renderedTabs = (0, import_react$7.useMemo)(() => orderTabs(tabs, visualOrder), [tabs, visualOrder]);
		const draggedTab = dragSnapshot ? tabsById.get(dragSnapshot.id) : void 0;
		const activeTabIdForRender = visualOrder ? dragStateRef.current?.id ?? activeTabId : activeTabId;
		(0, import_react$7.useEffect)(() => {
			if (!dragStateRef.current) {
				setVisualOrder(null);
				visualOrderRef.current = null;
			}
		}, [tabs]);
		(0, import_react$7.useEffect)(() => {
			if (!activeTabId || dragStateRef.current) return;
			const node = tabRefs.current.get(activeTabId);
			if (!node) return;
			node.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		}, [activeTabId, tabs]);
		const setOrderedIds = (0, import_react$7.useCallback)((nextOrder) => {
			const current = visualOrderRef.current;
			if (current && current.length === nextOrder.length && current.every((id, index) => id === nextOrder[index])) return;
			previousRectsRef.current = /* @__PURE__ */ new Map();
			tabRefs.current.forEach((node, id) => {
				previousRectsRef.current?.set(id, node.getBoundingClientRect());
			});
			visualOrderRef.current = nextOrder;
			setVisualOrder(nextOrder);
		}, []);
		(0, import_react$7.useLayoutEffect)(() => {
			const previousRects = previousRectsRef.current;
			previousRectsRef.current = null;
			if (!previousRects || typeof window === "undefined") return;
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			const draggedId = dragStateRef.current?.id;
			const frameIds = [];
			tabRefs.current.forEach((node, id) => {
				if (id === draggedId) return;
				const previousRect = previousRects.get(id);
				if (!previousRect) return;
				const currentRect = node.getBoundingClientRect();
				const deltaX = previousRect.left - currentRect.left;
				if (Math.abs(deltaX) < .5) return;
				node.style.transition = "none";
				node.style.transform = `translate3d(${deltaX}px, 0, 0)`;
				frameIds.push(window.requestAnimationFrame(() => {
					node.style.transition = "transform 160ms cubic-bezier(0.2, 0, 0, 1)";
					node.style.transform = "";
				}));
			});
			return () => {
				frameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
			};
		}, [visualOrder]);
		(0, import_react$7.useLayoutEffect)(() => {
			if (visualOrder) return;
			const activeId = activeTabIdForRender;
			if (!activeId) return;
			const listNode = listRef.current;
			const activeNode = tabRefs.current.get(activeId);
			if (!listNode || !activeNode) return;
			if (Math.max(0, listNode.scrollWidth - listNode.clientWidth) <= 0) {
				if (listNode.scrollLeft !== 0) listNode.scrollLeft = 0;
				return;
			}
			const listRect = listNode.getBoundingClientRect();
			const activeRect = activeNode.getBoundingClientRect();
			if (activeRect.left >= listRect.left && activeRect.right <= listRect.right) return;
			activeNode.scrollIntoView({
				block: "nearest",
				inline: "nearest",
				behavior: "smooth"
			});
		}, [
			activeTabIdForRender,
			renderedTabs,
			visualOrder
		]);
		const registerTabRef = (0, import_react$7.useCallback)((id, node) => {
			if (node) {
				tabRefs.current.set(id, node);
				return;
			}
			tabRefs.current.delete(id);
		}, []);
		const handleSelect = (0, import_react$7.useCallback)((id) => {
			if (suppressNextClickRef.current) {
				suppressNextClickRef.current = false;
				return;
			}
			onSelect(id);
		}, [onSelect]);
		const handleClose = (0, import_react$7.useCallback)((e, id) => {
			e.stopPropagation();
			onClose(id);
		}, [onClose]);
		const clearDrag = (0, import_react$7.useCallback)(() => {
			dragStateRef.current = null;
			setDragSnapshot(null);
		}, []);
		const removeDragListeners = (0, import_react$7.useCallback)(() => {
			removeDragListenersRef.current?.();
			removeDragListenersRef.current = null;
		}, []);
		const finishDrag = (0, import_react$7.useCallback)(() => {
			const dragState = dragStateRef.current;
			if (!dragState) return;
			if (dragState.hasStarted) {
				const finalOrder = visualOrderRef.current ?? dragState.initialOrder;
				const orderChanged = finalOrder.length !== dragState.initialOrder.length || finalOrder.some((id, index) => id !== dragState.initialOrder[index]);
				onReorder?.(finalOrder);
				if (!orderChanged) {
					visualOrderRef.current = null;
					setVisualOrder(null);
				}
				onSelect(dragState.id);
				window.setTimeout(() => {
					suppressNextClickRef.current = false;
				}, 0);
			}
			removeDragListeners();
			clearDrag();
		}, [
			clearDrag,
			onReorder,
			onSelect,
			removeDragListeners
		]);
		const beginDragIfNeeded = (0, import_react$7.useCallback)((clientX, clientY) => {
			const dragState = dragStateRef.current;
			if (!dragState || dragState.hasStarted) return dragState?.hasStarted ?? false;
			const dx = clientX - dragState.startX;
			const dy = clientY - dragState.startY;
			if (Math.hypot(dx, dy) < DRAG_START_THRESHOLD) return false;
			dragState.hasStarted = true;
			suppressNextClickRef.current = true;
			visualOrderRef.current = dragState.initialOrder;
			setVisualOrder(dragState.initialOrder);
			return true;
		}, []);
		const updateDrag = (0, import_react$7.useCallback)((clientX, clientY) => {
			const dragState = dragStateRef.current;
			if (!dragState) return false;
			if (!beginDragIfNeeded(clientX, clientY)) return false;
			setDragSnapshot({
				id: dragState.id,
				left: clamp(clientX - dragState.offsetX, dragState.minLeft, dragState.maxLeft),
				top: dragState.top,
				width: dragState.width,
				height: dragState.height
			});
			setOrderedIds(moveIdByPointer(visualOrderRef.current ?? dragState.initialOrder, dragState.id, clientX, tabRefs.current));
			return true;
		}, [beginDragIfNeeded, setOrderedIds]);
		const handlePointerDown = (0, import_react$7.useCallback)((e, id) => {
			if (!onReorder || tabs.length < 2 || e.button !== 0) return;
			if (e.target.closest(".artifact-tab__close")) return;
			const rect = e.currentTarget.getBoundingClientRect();
			const listRect = listRef.current?.getBoundingClientRect();
			const listStyle = listRef.current ? window.getComputedStyle(listRef.current) : null;
			const paddingLeft = listStyle ? Number.parseFloat(listStyle.paddingLeft) || 0 : 0;
			const paddingRight = listStyle ? Number.parseFloat(listStyle.paddingRight) || 0 : 0;
			const minLeft = (listRect?.left ?? rect.left) + paddingLeft;
			const maxLeft = (listRect?.right ?? rect.right) - paddingRight - rect.width;
			dragStateRef.current = {
				id,
				startX: e.clientX,
				startY: e.clientY,
				offsetX: e.clientX - rect.left,
				top: rect.top,
				width: rect.width,
				height: rect.height,
				minLeft,
				maxLeft,
				hasStarted: false,
				initialOrder: tabs.map((tab) => tab.id)
			};
			removeDragListeners();
			const pointerId = e.pointerId;
			const handleWindowPointerMove = (event) => {
				if (event.pointerId !== pointerId) return;
				if (updateDrag(event.clientX, event.clientY)) event.preventDefault();
			};
			const handleWindowPointerEnd = (event) => {
				if (event.pointerId !== pointerId) return;
				finishDrag();
			};
			window.addEventListener("pointermove", handleWindowPointerMove, { passive: false });
			window.addEventListener("pointerup", handleWindowPointerEnd);
			window.addEventListener("pointercancel", handleWindowPointerEnd);
			removeDragListenersRef.current = () => {
				window.removeEventListener("pointermove", handleWindowPointerMove);
				window.removeEventListener("pointerup", handleWindowPointerEnd);
				window.removeEventListener("pointercancel", handleWindowPointerEnd);
			};
		}, [
			finishDrag,
			onReorder,
			removeDragListeners,
			tabs,
			updateDrag
		]);
		(0, import_react$7.useEffect)(() => () => {
			removeDragListeners();
		}, [removeDragListeners]);
		if (tabs.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "artifact-tabs",
			role: "tablist",
			"aria-label": "Artifact tabs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				ref: listRef,
				className: (0, import_classnames.default)("artifact-tabs__list", { "artifact-tabs__list--dragging": Boolean(visualOrder) }),
				children: renderedTabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArtifactTab, {
					tab,
					isActive: tab.id === activeTabIdForRender,
					isDragPlaceholder: dragSnapshot?.id === tab.id,
					draggable: Boolean(onReorder) && tabs.length > 1,
					onSelect: () => handleSelect(tab.id),
					onClose: (e) => handleClose(e, tab.id),
					onPointerDown: (e) => handlePointerDown(e, tab.id),
					closeLabel,
					registerTabRef
				}, tab.id))
			}), dragSnapshot && draggedTab && (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: (0, import_classnames.default)("artifact-tab", "artifact-tab--drag-clone", { "artifact-tab--active": draggedTab.id === activeTabIdForRender }),
				style: {
					width: dragSnapshot.width,
					height: dragSnapshot.height,
					transform: `translate3d(${dragSnapshot.left}px, ${dragSnapshot.top}px, 0)`
				},
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArtifactTabBody, {
					tab: draggedTab,
					closeLabel,
					clone: true
				})
			}), document.body)]
		});
	};
	ArtifactTabsBar.displayName = "ArtifactTabsBar";
})), import_jsx_runtime$3, PanelToggleIcon, WbMenuIcon, PreviewMaximizeIcon, PinIcon, PinFilledIcon, UnpinIcon, PreviewRestoreIcon;
var init_PreviewPanelIcons = __esmMin((() => {
	require_react();
	import_jsx_runtime$3 = require_jsx_runtime();
	PanelToggleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.334923 1.33492)",
			d: "M6.6651 0.0001L8.747 0.0001Q11.2135 0 12.063 0.1159Q13.4944 0.3113 14.2566 1.0735Q15.0188 1.8358 15.2142 3.2672Q15.3302 4.1166 15.3301 6.5832L15.3301 6.747Q15.3302 9.2135 15.2142 10.063Q15.0188 11.4944 14.2566 12.2566Q13.4944 13.0188 12.063 13.2142Q11.2135 13.3302 8.747 13.3301L6.5832 13.3301Q4.1167 13.3302 3.2672 13.2142Q1.8357 13.0188 1.0735 12.2566Q0.3113 11.4944 0.1159 10.063Q0 9.2135 0.0001 6.747L0.0001 6.5832Q0 4.1167 0.1159 3.2672Q0.3113 1.8358 1.0735 1.0735Q1.8358 0.3113 3.2672 0.1159Q4.1167 0 6.5832 0.0001L6.6651 0.0001ZM6.6651 1.3301L6.5831 1.3301Q4.207 1.33 3.4471 1.4337Q2.4595 1.5685 2.014 2.014Q1.5685 2.4594 1.4337 3.4471Q1.33 4.207 1.3301 6.5831L1.3301 6.747Q1.33 9.1232 1.4337 9.8831Q1.5685 10.8707 2.014 11.3162Q2.4594 11.7616 3.4471 11.8964Q4.207 12.0002 6.5831 12.0001L8.747 12.0001Q11.1232 12.0002 11.8831 11.8964Q12.8707 11.7616 13.3162 11.3162Q13.7616 10.8707 13.8964 9.8831Q14.0002 9.1232 14.0001 6.747L14.0001 6.5831Q14.0002 4.207 13.8964 3.4471Q13.7616 2.4594 13.3162 2.014Q12.8707 1.5685 11.8831 1.4337Q11.1232 1.33 8.747 1.3301L6.6651 1.3301ZM12.3301 2.6651L12.3301 10.6651L11.0001 10.6651L11.0001 2.6651L12.3301 2.6651Z",
			fillRule: "evenodd"
		})
	});
	WbMenuIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1 2.33499)",
			d: "M14 0L0 0L0 1.33L14 1.33L14 0ZM14 5L0 5L0 6.33L14 6.33L14 5ZM0 10L7 10L7 11.33L0 11.33L0 10Z",
			fillRule: "evenodd"
		})
	});
	PreviewMaximizeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 8.17 2.33)",
			d: "M4.835 5.5L4.835 2.9794L4.835 2.959Q4.835 2.0528 4.8055 1.635L1.3003 5.1403L0.3599 4.1998L3.8652 0.6945Q3.4475 0.665 2.541 0.665L2.5 0.665L0 0.665L0 -0.665L2.5 -0.665L2.541 -0.665Q3.7967 -0.665 4.2438 -0.604Q5.0703 -0.4912 5.5307 -0.0309Q5.9911 0.4293 6.104 1.2561Q6.165 1.7032 6.165 2.959L6.165 2.9795L6.165 5.5L4.835 5.5Z",
			fillRule: "evenodd"
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 2.33 8.17)",
			d: "M0.665 0L0.665 2.5L0.665 2.541Q0.665 3.4472 0.6945 3.865L4.1997 0.3597L5.1401 1.3002L1.6348 4.8055Q2.0525 4.835 2.959 4.835L3 4.835L5.5 4.835L5.5 6.165L3 6.165L2.959 6.165Q1.7033 6.165 1.2562 6.104Q0.4297 5.9912 -0.0307 5.5309Q-0.4911 5.0707 -0.604 4.2439Q-0.665 3.7968 -0.665 2.541L-0.665 2.5L-0.665 0L0.665 0Z",
			fillRule: "evenodd"
		})]
	});
	PinIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			fillOpacity: "0.85",
			transform: "matrix(0.707107 0.707107 -0.707107 0.707107 9.56006 -1.75391)",
			d: "M0.4943 8.4001C0 9.0594 0.4704 10 1.2944 10L5.129 10L5.1294 16.0001L6.4594 16L6.459 10L10.2944 10C11.1185 10 11.5889 9.0592 11.0944 8.3999L9.294 6L9.294 2C9.294 0.8954 8.3986 0 7.294 0L4.294 0C3.1895 0 2.294 0.8954 2.294 2L2.294 6L0.4943 8.4001ZM9.6343 8.67L1.9543 8.67L3.624 6.4432L3.624 2Q3.624 1.7225 3.8203 1.5262Q4.0165 1.33 4.294 1.33L7.294 1.33Q7.5715 1.33 7.7678 1.5262Q7.964 1.7225 7.964 2L7.964 6.4434L8.2301 6.7981L9.6343 8.67Z",
			fillRule: "evenodd"
		})
	});
	PinFilledIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 2.22 0)",
			d: "M0.4943 8.4001C0 9.0594 0.4704 10 1.2944 10L5.129 10L5.1294 16.0001L6.4594 16L6.459 10L10.2944 10C11.1185 10 11.5889 9.0592 11.0944 8.3999L9.294 6L9.294 2C9.294 0.8954 8.3986 0 7.294 0L4.294 0C3.1895 0 2.294 0.8954 2.294 2L2.294 6L0.4943 8.4001Z",
			fillRule: "evenodd"
		})
	});
	UnpinIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			fillOpacity: "0.9",
			transform: "matrix(1 0 0 1 1.12637 0.941389)",
			d: "M13.6129 5.1387C13.4338 5.4905 13.1041 5.8202 12.4448 6.4795L12.0914 6.8329C11.6251 7.2992 11.392 7.5323 11.2035 7.7939C10.952 8.1427 10.7584 8.5299 10.6303 8.9404C10.6282 8.9471 10.6261 8.9538 10.6241 8.9605L13.7979 12.1344L12.9494 12.9829L0.9494 0.9829L1.7979 0.1344L5.0142 3.3507C5.021 3.3486 5.0279 3.3465 5.0347 3.3444C5.4448 3.2162 5.8317 3.0227 6.1803 2.7715C6.4419 2.5829 6.6751 2.3498 7.1414 1.8834L7.4951 1.5297C8.1544 0.8704 8.484 0.5408 8.8359 0.3617C9.5463 0 10.3935 0 11.104 0.3617C11.4558 0.5408 11.7855 0.8704 12.4448 1.5297C13.1041 2.1891 13.4338 2.5187 13.6129 2.8706C13.9746 3.581 13.9746 4.4282 13.6129 5.1387ZM5.9457 4.2821Q6.4391 4.0641 6.882 3.745Q7.222 3.4999 7.9899 2.732L8.3436 2.3783Q9.198 1.5239 9.3803 1.4311Q9.9699 1.1309 10.5596 1.4311Q10.7419 1.5239 11.5963 2.3783Q12.4507 3.2327 12.5435 3.415Q12.8437 4.0046 12.5435 4.5942Q12.4507 4.7766 11.5963 5.631L11.2429 5.9844Q10.475 6.7522 10.23 7.0922Q9.9106 7.5353 9.6926 8.029L5.9457 4.2821ZM5.7982 9.0253L6.6451 8.1785L2.3466 3.88C2.3144 3.8988 2.2852 3.9192 2.2584 3.9415C1.9692 4.183 1.8377 4.5774 1.9243 4.944C1.9889 5.2182 2.2611 5.4897 2.772 5.9994C2.8129 6.0401 2.8553 6.0824 2.8992 6.1263L4.9495 8.1766L0 13.1267L0.8486 13.9751L5.798 9.0251L5.7982 9.0253ZM7.4936 9.027L10.0951 11.6286C10.0764 11.6606 10.0561 11.6898 10.0338 11.7164C9.7923 12.0059 9.3977 12.1374 9.0309 12.0508C8.7569 11.9861 8.4854 11.714 7.9759 11.2032L7.974 11.2013L7.9734 11.2008C7.9334 11.1607 7.892 11.1191 7.8489 11.076L6.6468 9.8739L7.4936 9.027Z",
			fillRule: "evenodd"
		})
	});
	PreviewRestoreIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(-1 0 0 -1 14 7.5)",
			d: "M4.835 5.5L4.835 2.9794L4.835 2.959Q4.835 2.037 4.8045 1.6206L1.1346 5.2057L0.2052 4.2543L3.8503 0.6935Q3.4315 0.665 2.541 0.665L2.5 0.665L0 0.665L0 -0.665L2.5 -0.665L2.541 -0.665Q3.7967 -0.665 4.2438 -0.604Q5.0703 -0.4912 5.5307 -0.0309Q5.9911 0.4293 6.104 1.2561Q6.165 1.7032 6.165 2.959L6.165 2.9795L6.165 5.5L4.835 5.5Z",
			fillRule: "evenodd"
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(-1 0 0 -1 7.5 14)",
			d: "M0.665 0L0.665 2.5L0.665 2.541Q0.665 3.4312 0.6935 3.8501L4.1942 0.2654L5.1457 1.1946L1.6205 4.8045Q2.0368 4.835 2.959 4.835L3 4.835L5.5 4.835L5.5 6.165L3 6.165L2.959 6.165Q1.7033 6.165 1.2562 6.104Q0.4297 5.9912 -0.0307 5.5309Q-0.4911 5.0707 -0.604 4.2439Q-0.665 3.7968 -0.665 2.541L-0.665 2.5L-0.665 0L0.665 0Z",
			fillRule: "evenodd"
		})]
	});
}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/components/ViewSelector.scss
var init_ViewSelector$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/components/ViewSelector.tsx
function ArtifactsIcon({ size = 13 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				fillRule: "evenodd",
				transform: "translate(8.50012 1.50096)",
				d: "M3 0C4.6567 0.0002 6 1.3433 6 3C5.9996 4.6563 4.6564 5.9998 3 6C1.3436 5.9997 0.0004 4.6563 0 3C0 1.3433 1.3433 0.0002 3 0ZM3 1.1992C2.0061 1.1994 1.1992 2.006 1.1992 3C1.1996 3.9936 2.0064 4.7995 3 4.7998C3.9937 4.7996 4.7994 3.9936 4.7998 3C4.7998 2.006 3.994 1.1994 3 1.1992Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				fillRule: "evenodd",
				transform: "translate(1.6007 1.60056)",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				fillRule: "evenodd",
				transform: "translate(1.60059 8.60059)",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				fillRule: "evenodd",
				transform: "translate(8.60059 8.60059)",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z"
			})
		]
	});
}
function AllFilesIcon({ size = 13 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			transform: "translate(0.900391 0.90039)",
			d: "M4.4893 0C4.8371 0 5.0591 -0.0008 5.2754 0.0244C6.3094 0.1455 7.0485 0.6989 7.6641 1.3145L8.6494 2.2998L6.9521 2.2998L6.8154 2.1631C6.2812 1.6289 5.7808 1.2913 5.1367 1.2158C5.0059 1.2005 4.8651 1.1992 4.4893 1.1992C3.3369 1.1992 2.5394 1.4806 2.0293 1.9717C1.5234 2.4588 1.1992 3.2499 1.1992 4.4893L1.1992 8.0996C1.1992 9.0452 1.1999 9.7144 1.2471 10.2353C1.2935 10.7481 1.382 11.0583 1.5215 11.2998C1.8929 11.9429 2.4455 12.2436 3.1484 12.3867C3.519 12.4622 3.9095 12.4906 4.3184 12.5L9.2217 12.5C9.8441 12.4975 10.462 12.477 11.0312 12.3564C11.7703 12.1999 12.3358 11.8919 12.6777 11.2998C12.8172 11.0583 12.9057 10.7481 12.9521 10.2353C12.9914 9.8018 12.9958 9.2656 12.9971 8.5527L12.9961 8.1064C12.9832 6.8588 12.9095 6.3058 12.6777 5.9043C12.3358 5.3123 11.7703 5.0042 11.0312 4.8477C10.462 4.7271 9.8441 4.7066 9.2217 4.7041L2.5996 4.7041L2.5996 3.5049L8.1572 3.5049L8.1514 3.499L9.8486 3.499L9.8652 3.5156C10.3318 3.533 10.8171 3.5747 11.2803 3.6729C12.2112 3.8701 13.1449 4.3124 13.7178 5.3047C14.1305 6.02 14.1839 6.8921 14.1963 8.0938L14.1963 8.0996L14.1992 8.0996C14.1992 8.2186 14.1974 8.3345 14.1973 8.4473L14.1992 9.1025L14.1982 9.1035L14.1992 9.1045L14.1934 9.1045C14.1885 9.5777 14.1788 9.9874 14.1465 10.3437C14.0925 10.9395 13.9801 11.4449 13.7178 11.8994C13.1449 12.8917 12.2112 13.334 11.2803 13.5312C10.3688 13.7243 9.3719 13.6992 8.5996 13.6992L5.5996 13.6992C4.8004 13.6992 3.8041 13.7447 2.9092 13.5625C1.9757 13.3724 1.0723 12.9228 0.4814 11.8994C0.2191 11.4449 0.1067 10.9395 0.0527 10.3437C-0.0005 9.7561 0 9.0232 0 8.0996L0 4.4893C0 3.0495 0.3791 1.8952 1.1973 1.1074C2.0113 0.3238 3.1594 0 4.4893 0Z"
		})
	});
}
function ChangesIcon({ size = 13 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			fillRule: "evenodd",
			transform: "translate(1.39992 0.999923)",
			d: "M8.2886 0.0001L6.5182 0.0001Q4.0561 0 3.211 0.1153Q1.8012 0.3078 1.0545 1.0545Q0.3078 1.8012 0.1153 3.211Q0 4.0561 0.0001 6.5182L0.0001 7.482Q0 9.9441 0.1153 10.7892Q0.3078 12.1989 1.0545 12.9457Q1.8012 13.6924 3.211 13.8848Q4.0561 14.0002 6.5182 14.0001L6.682 14.0001Q9.1441 14.0002 9.9892 13.8848Q11.3989 13.6924 12.1457 12.9457Q12.8924 12.1989 13.0848 10.7892Q13.2002 9.9441 13.2001 7.482L13.2001 4.8455Q13.2001 4.0985 13.0738 3.7998Q12.9475 3.5011 12.4117 2.9805L10.1002 0.7351Q9.5852 0.2349 9.2959 0.1175Q9.0066 0.0001 8.2886 0.0001ZM6.5181 1.2001L8.2886 1.2001Q8.7724 1.2001 8.8447 1.2294Q8.9171 1.2588 9.2641 1.5959L11.5756 3.8413Q11.9369 4.1923 11.9685 4.267Q12.0001 4.3417 12.0001 4.8455L12.0001 7.482Q12.0002 9.8626 11.8958 10.6269Q11.7581 11.6362 11.2971 12.0971Q10.8362 12.5581 9.8269 12.6958Q9.0626 12.8001 6.682 12.8001L6.5181 12.8001Q4.1376 12.8002 3.3733 12.6958Q2.364 12.5581 1.903 12.0971Q1.4421 11.6362 1.3043 10.6269Q1.2 9.8626 1.2001 7.482L1.2001 6.5181Q1.2 4.1376 1.3043 3.3733Q1.4421 2.364 1.903 1.903Q2.364 1.4421 3.3733 1.3043Q4.1376 1.2 6.5181 1.2001ZM7.2001 3.0001L7.2001 4.9001L9.1001 4.9001L9.1001 6.1001L7.2001 6.1001L7.2001 8.0001L6.0001 8.0001L6.0001 6.1001L4.1001 6.1001L4.1001 4.9001L6.0001 4.9001L6.0001 3.0001L7.2001 3.0001ZM4.1001 9.7301L4.1001 10.9302L9.1001 10.9302L9.1001 9.7301L4.1001 9.7301Z"
		})
	});
}
function PreviewIcon({ size = 13 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 14.1992 14.1992",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", { d: "M7.0996 0C10.3989 0 13.172 2.2503 13.9687 5.2998L12.7197 5.2998C12.0925 3.3403 10.4692 1.8268 8.4453 1.3545C8.5835 1.5636 8.7294 1.7983 8.874 2.0586C9.4714 3.1339 10.0702 4.6474 10.1797 6.5L12.9697 6.5L12.9697 6.499L14.1719 6.499C14.1885 6.6971 14.1992 6.8973 14.1992 7.0996C14.1992 11.0208 11.0208 14.1992 7.0996 14.1992C3.1784 14.1992 0 11.0208 0 7.0996C0 3.1784 3.1784 0 7.0996 0ZM1.2295 7.6992C1.4844 10.2247 3.3325 12.2784 5.7529 12.8437C5.615 12.6349 5.4696 12.4005 5.3252 12.1406C4.7278 11.0653 4.1291 9.5518 4.0195 7.6992L1.2295 7.6992ZM10.1797 7.6992C10.0702 9.5518 9.4714 11.0653 8.874 12.1406C8.7295 12.4007 8.5833 12.6348 8.4453 12.8437C10.8662 12.2787 12.7147 10.225 12.9697 7.6992L10.1797 7.6992ZM5.2207 7.6992C5.3282 9.2993 5.8489 10.6134 6.374 11.5586C6.6331 12.0249 6.8929 12.398 7.0996 12.6689C7.3063 12.398 7.5661 12.0249 7.8252 11.5586C8.3503 10.6134 8.871 9.2993 8.9785 7.6992L5.2207 7.6992ZM5.7529 1.3545C3.3323 1.9198 1.4844 3.9745 1.2295 6.5L4.0195 6.5C4.1291 4.6474 4.7278 3.1339 5.3252 2.0586C5.4697 1.7984 5.6149 1.5635 5.7529 1.3545ZM7.0996 1.5293C6.8928 1.8003 6.6333 2.174 6.374 2.6406C5.8489 3.5858 5.3282 4.8999 5.2207 6.5L8.9785 6.5C8.871 4.8999 8.3503 3.5858 7.8252 2.6406C7.5659 2.174 7.3064 1.8003 7.0996 1.5293Z" })
	});
}
function McpAppsIcon({ size = 13 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("rect", {
				x: "3",
				y: "3",
				width: "7",
				height: "7",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("rect", {
				x: "14",
				y: "3",
				width: "7",
				height: "7",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("rect", {
				x: "3",
				y: "14",
				width: "7",
				height: "7",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("rect", {
				x: "14",
				y: "14",
				width: "7",
				height: "7",
				rx: "1"
			})
		]
	});
}
function ChevronDownIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			fillRule: "evenodd",
			transform: "translate(4 6)",
			d: "M4 3.1515L0.4243 -0.4243L-0.4243 0.4243L3.5757 4.4243L4 4.8485L8.4243 0.4243L7.5757 -0.4243L4 3.1515Z"
		})
	});
}
function ExpertIcon({ size = 13 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
			cx: "12",
			cy: "7",
			r: "4"
		})]
	});
}
function iconForView(view, size) {
	switch (view) {
		case "overview": return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ArtifactsIcon, { size });
		case "artifacts": return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ArtifactsIcon, { size });
		case "fileTree": return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AllFilesIcon, { size });
		case "changes": return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ChangesIcon, { size });
		case "preview": return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(PreviewIcon, { size });
		case "mcpApps": return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(McpAppsIcon, { size });
		case "expert": return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ExpertIcon, { size });
	}
}
var import_react$5, import_jsx_runtime$2, ViewSelector;
var init_ViewSelector = __esmMin((() => {
	init_ViewSelector$1();
	init_src$1();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$2 = require_jsx_runtime();
	ViewSelector = ({ value, onChange, options, minWidth = 180, className, triggerIconVisible = true, onOpenChange }) => {
		const rootRef = (0, import_react$5.useRef)(null);
		const [isOpen, setIsOpen] = (0, import_react$5.useState)(false);
		const handleOpenChange = (0, import_react$5.useCallback)((nextOpen) => {
			setIsOpen(nextOpen);
			onOpenChange?.(nextOpen);
		}, [onOpenChange]);
		const handleItemClick = (0, import_react$5.useCallback)((item) => {
			setIsOpen(false);
			onChange(item.value);
		}, [onChange]);
		const items = (0, import_react$5.useMemo)(() => options.filter((option) => !option.hide).map((option) => ({
			label: option.label,
			value: option.value,
			leftIcon: option.leftIcon ?? iconForView(option.value, 14),
			selected: option.value === value,
			onClick: handleItemClick
		})), [
			options,
			value,
			handleItemClick
		]);
		const current = options.find((option) => option.value === value);
		const triggerIcon = current?.leftIcon ?? iconForView(value, 13);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			ref: rootRef,
			className: ["view-selector-root", className].filter(Boolean).join(" "),
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Dropdown, {
				className: "view-selector-dropdown",
				items,
				width: "auto",
				minWidth,
				maxWidth: 280,
				onOpenChange: handleOpenChange,
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: ["view-selector-pill", isOpen ? "view-selector-pill--open" : ""].filter(Boolean).join(" "),
					role: "button",
					"aria-label": current?.label ?? "Select view",
					"aria-expanded": isOpen,
					tabIndex: 0,
					children: [
						triggerIconVisible && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "view-selector-pill__icon",
							children: triggerIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "view-selector-pill__label",
							children: current?.label ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "view-selector-pill__chevron",
							children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ChevronDownIcon, {})
						})
					]
				})
			})
		});
	};
	ViewSelector.displayName = "ViewSelector";
}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/hooks/selection-clear-prune-policy.ts
/**
* 判断 selection 清空时是否应同步移除上一帧 active 的 unified tab。
*
* 背景：useUnifiedTabs 用 selectedArtifactId / selectedFilePath 等派生 activeTabId。
* 当 selection 变空时，默认认为用户关闭了当前预览，应删掉对应 tab。
*
* @returns true 表示应执行 prune（移除 tab）；false 表示跳过。
*/
function shouldPruneUnifiedTabOnSelectionClear(params) {
	const { activeTabId, previousActiveTabId, previousTabViewWhenActive, currentView } = params;
	if (activeTabId || !previousActiveTabId) return false;
	if (!previousTabViewWhenActive || previousTabViewWhenActive !== currentView) return false;
	return true;
}
var init_selection_clear_prune_policy = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/hooks/use-unified-tabs.ts
function lastSegment(filePath) {
	if (!filePath) return filePath;
	const normalized = filePath.replace(/\\/g, "/");
	const idx = normalized.lastIndexOf("/");
	return idx === -1 ? normalized : normalized.slice(idx + 1);
}
/** 从 browserUrl 推导一个易读的 tab 标题：优先文件名，否则 host[+path]。 */
function deriveBrowserLabel(url) {
	try {
		const parsed = new URL(url);
		const path = parsed.pathname.replace(/\/$/, "");
		const last = path.length > 1 ? lastSegment(path) : "";
		if (last) try {
			return decodeURIComponent(last);
		} catch {
			return last;
		}
		return parsed.host || url;
	} catch {
		const seg = lastSegment(url) || url;
		try {
			return decodeURIComponent(seg);
		} catch {
			return seg;
		}
	}
}
/** HTML 产物只允许进入 BrowserPreview，不允许派生 artifact tab。 */
function isHtmlArtifact(artifact) {
	const artifactUrl = artifact?.url?.replace(/[?#].*$/, "") ?? "";
	return artifact?.type === "media-artifact" && artifact.category === "artifact" && /\.(?:html|htm)$/i.test(artifactUrl);
}
/** 根据当前视图 + selection 派生"本应激活"的 tab 描述符。 */
function deriveActiveTab(options) {
	const { currentView } = options;
	if (currentView === "artifacts" || currentView === "changes") {
		const id = options.selectedArtifactId;
		if (!id) return null;
		const artifact = options.artifacts.find((a) => a.id === id);
		if (!artifact) return null;
		if (artifact.type === "task" || isHtmlArtifact(artifact)) return null;
		const isFileChange = artifact.category === "file-changes";
		if (isFileChange && currentView !== "changes") return null;
		if (!isFileChange && currentView !== "artifacts") return null;
		return {
			id: isFileChange ? `fileChange:${artifact.id}` : `artifact:${artifact.id}`,
			kind: isFileChange ? "fileChange" : "artifact",
			label: artifact.title || artifact.id,
			subtitle: artifact.subtitle,
			artifactId: artifact.id,
			viewWhenActive: isFileChange ? "changes" : "artifacts"
		};
	}
	if (currentView === "fileTree") {
		const path = options.selectedFilePath;
		if (!path) return null;
		return {
			id: `file:${path}`,
			kind: "file",
			label: lastSegment(path),
			subtitle: path,
			filePath: path,
			viewWhenActive: "fileTree"
		};
	}
	if (currentView === "mcpApps") {
		const appId = options.selectedMcpAppId;
		if (!appId) return null;
		const app = options.mcpAppsAvailable.find((a) => a.mcpAppId === appId);
		if (!app) return null;
		return {
			id: `mcpApp:${app.mcpAppId}`,
			kind: "mcpApp",
			label: app.mcpAppName || app.mcpAppId,
			subtitle: app.description,
			mcpAppId: app.mcpAppId,
			viewWhenActive: "mcpApps"
		};
	}
	if (currentView === "preview") {
		const url = options.browserUrl;
		if (!url) return null;
		return {
			id: "preview:current",
			kind: "preview",
			label: deriveBrowserLabel(url),
			subtitle: url,
			browserUrl: url,
			viewWhenActive: "preview"
		};
	}
	return null;
}
/** 判断某个已有 tab 在当前 artifacts / mcpApps 列表下是否仍然有效（数据未被删除）。 */
function isTabStillValid(tab, options) {
	switch (tab.kind) {
		case "artifact":
		case "fileChange": {
			if (!tab.artifactId) return false;
			const artifact = options.artifacts.find((a) => a.id === tab.artifactId);
			if (!artifact) return false;
			return artifact.type !== "task" && !isHtmlArtifact(artifact);
		}
		case "mcpApp": return !!tab.mcpAppId && options.mcpAppsAvailable.some((a) => a.mcpAppId === tab.mcpAppId);
		case "file": return true;
		case "preview": return !!options.browserUrl && tab.browserUrl === options.browserUrl;
		default: return true;
	}
}
/** 应用某个 tab 的 selection 到对应视图（切 view + 设 selection）。 */
function activateTab(tab, options) {
	if (options.currentView !== tab.viewWhenActive) options.onViewChange(tab.viewWhenActive);
	switch (tab.kind) {
		case "artifact":
		case "fileChange":
			options.onArtifactSelect(tab.artifactId);
			return;
		case "file":
			options.onFileSelect?.(tab.filePath);
			return;
		case "mcpApp":
			options.onSelectMcpApp?.(tab.mcpAppId);
			return;
		case "preview":
			options.onBrowserUrlChange?.(tab.browserUrl);
			return;
	}
}
/** 关闭所有 tab 后清空所有 selection，避免跨 view 留下旧高亮。 */
function clearAllSelections(options) {
	options.onArtifactSelect(void 0);
	options.onFileSelect?.(void 0);
	options.onSelectMcpApp?.(void 0);
	options.onBrowserUrlChange?.(void 0);
}
function applyTabOrder(tabs, orderedIds) {
	if (orderedIds.length === 0) return tabs;
	const byId = new Map(tabs.map((tab) => [tab.id, tab]));
	const next = [];
	orderedIds.forEach((id) => {
		const tab = byId.get(id);
		if (tab && !next.includes(tab)) next.push(tab);
	});
	tabs.forEach((tab) => {
		if (!next.includes(tab)) next.push(tab);
	});
	if (next.length === tabs.length && next.every((tab, index) => tab.id === tabs[index]?.id)) return tabs;
	return next;
}
function cloneTabs(tabs) {
	return tabs.map((tab) => ({ ...tab }));
}
function restoreSessionTabs(resetKey) {
	if (resetKey === void 0) return [];
	const cached = sessionTabsCache.get(resetKey);
	if (!cached) return [];
	sessionTabsCache.delete(resetKey);
	sessionTabsCache.set(resetKey, cached);
	return filterTabsByOwner(cloneTabs(cached), resetKey);
}
function saveSessionTabs(resetKey, tabs) {
	if (resetKey === void 0) return;
	sessionTabsCache.delete(resetKey);
	sessionTabsCache.set(resetKey, cloneTabs(tabs));
	while (sessionTabsCache.size > SESSION_TABS_CACHE_LIMIT) {
		const oldest = sessionTabsCache.keys().next().value;
		if (!oldest) return;
		sessionTabsCache.delete(oldest);
	}
}
function collectArtifactTabIds(tabs) {
	const ids = /* @__PURE__ */ new Set();
	tabs.forEach((tab) => {
		if ((tab.kind === "artifact" || tab.kind === "fileChange") && tab.artifactId) ids.add(tab.artifactId);
	});
	return ids;
}
function findMissingArtifactIds(expectedIds, artifacts) {
	if (expectedIds.size === 0) return [];
	const availableIds = new Set(artifacts.map((a) => a.id));
	return Array.from(expectedIds).filter((id) => !availableIds.has(id));
}
/**
* 按"会话烙印"过滤 tab：只保留属于 ownerKey === resetKey 的 tab。
*
* 这是跨会话隔离的最终防线，与保存/恢复时机无关：无论 sessionTabsCache
* 因何种竞态被写入了别的会话的 tab，这里都会把 ownerKey 不匹配的剔除掉。
* ownerKey 缺失（旧缓存）时放行，避免升级丢失存量 tab。
*/
function filterTabsByOwner(tabs, resetKey) {
	if (resetKey === void 0) return tabs;
	return tabs.filter((tab) => tab.ownerKey === void 0 || tab.ownerKey === resetKey);
}
/**
* 生成代表 Tab 内容本身的签名，避免 preview:current 这类稳定 id 误拦不同 URL。
*/
function getTabSignature(tab) {
	switch (tab.kind) {
		case "artifact":
		case "fileChange": return `${tab.kind}:${tab.artifactId ?? ""}`;
		case "file": return `file:${tab.filePath ?? ""}`;
		case "mcpApp": return `mcpApp:${tab.mcpAppId ?? ""}`;
		case "preview": return `preview:${tab.browserUrl ?? ""}`;
		default: return tab.id;
	}
}
function pruneRecentlyClosedSignatures(signatures, now = Date.now()) {
	signatures.forEach((closedAt, signature) => {
		if (now - closedAt > RECENTLY_CLOSED_SUPPRESSION_MS) signatures.delete(signature);
	});
}
function rememberRecentlyClosedTabs(signatures, tabs) {
	const now = Date.now();
	pruneRecentlyClosedSignatures(signatures, now);
	tabs.forEach((tab) => signatures.set(getTabSignature(tab), now));
}
function shouldSuppressRecentlyClosedAutoOpen(signatures, candidate) {
	pruneRecentlyClosedSignatures(signatures);
	if (signatures.size === 0) return false;
	if (signatures.has(getTabSignature(candidate))) return true;
	signatures.clear();
	return false;
}
function useUnifiedTabs(options) {
	const initialOpenTabsRef = (0, import_react$4.useRef)(void 0);
	if (initialOpenTabsRef.current === void 0) initialOpenTabsRef.current = restoreSessionTabs(options.resetKey);
	const [openTabs, setOpenTabs] = (0, import_react$4.useState)(() => initialOpenTabsRef.current ?? []);
	const optionsRef = (0, import_react$4.useRef)(options);
	optionsRef.current = options;
	const suppressAutoOpenTabIdRef = (0, import_react$4.useRef)(void 0);
	const openTabsRef = (0, import_react$4.useRef)(openTabs);
	openTabsRef.current = openTabs;
	const tabsOwnerKeyRef = (0, import_react$4.useRef)(options.resetKey);
	const prevResetKeyRef = (0, import_react$4.useRef)(options.resetKey);
	const skipNextAutoOpenRef = (0, import_react$4.useRef)(false);
	const recentlyClosedTabSignaturesRef = (0, import_react$4.useRef)(/* @__PURE__ */ new Map());
	const pendingRestoreArtifactIdsRef = (0, import_react$4.useRef)(collectArtifactTabIds(initialOpenTabsRef.current ?? []));
	(0, import_react$4.useEffect)(() => () => {
		const resetKey = optionsRef.current.resetKey;
		if (resetKey === tabsOwnerKeyRef.current) saveSessionTabs(resetKey, openTabsRef.current);
	}, []);
	(0, import_react$4.useEffect)(() => {
		if (prevResetKeyRef.current !== options.resetKey) return;
		saveSessionTabs(options.resetKey, openTabs);
	}, [options.resetKey, openTabs]);
	(0, import_react$4.useLayoutEffect)(() => {
		const prevKey = prevResetKeyRef.current;
		const nextKey = options.resetKey;
		if (prevKey === nextKey) return;
		saveSessionTabs(prevKey, openTabsRef.current);
		prevResetKeyRef.current = nextKey;
		tabsOwnerKeyRef.current = nextKey;
		const restored = restoreSessionTabs(nextKey);
		setOpenTabs(restored);
		skipNextAutoOpenRef.current = true;
		recentlyClosedTabSignaturesRef.current.clear();
		pendingRestoreArtifactIdsRef.current = collectArtifactTabIds(restored);
	}, [options.resetKey]);
	const activeTabCandidate = (0, import_react$4.useMemo)(() => deriveActiveTab(options), [
		options.currentView,
		options.selectedArtifactId,
		options.selectedFilePath,
		options.selectedMcpAppId,
		options.browserUrl,
		options.artifacts,
		options.mcpAppsAvailable
	]);
	const activeTabId = activeTabCandidate?.id;
	const activeTabIdRef = (0, import_react$4.useRef)(activeTabId);
	activeTabIdRef.current = activeTabId;
	const pendingCloseTabIdsRef = (0, import_react$4.useRef)(/* @__PURE__ */ new Set());
	(0, import_react$4.useEffect)(() => {
		const suppressedTabId = suppressAutoOpenTabIdRef.current;
		if (suppressedTabId && activeTabId !== suppressedTabId) suppressAutoOpenTabIdRef.current = void 0;
	}, [activeTabId]);
	(0, import_react$4.useEffect)(() => {
		if (!options.enabled) return;
		if (!activeTabCandidate) {
			skipNextAutoOpenRef.current = false;
			recentlyClosedTabSignaturesRef.current.clear();
			return;
		}
		if (skipNextAutoOpenRef.current) {
			skipNextAutoOpenRef.current = false;
			return;
		}
		if (suppressAutoOpenTabIdRef.current === activeTabCandidate.id) return;
		if (shouldSuppressRecentlyClosedAutoOpen(recentlyClosedTabSignaturesRef.current, activeTabCandidate)) return;
		if (options.shouldAutoOpenTab && !options.shouldAutoOpenTab(activeTabCandidate)) return;
		const candidateWithOwner = {
			...activeTabCandidate,
			ownerKey: options.resetKey
		};
		setOpenTabs((prev) => {
			if (candidateWithOwner.kind === "preview") {
				const htmlMediaArtifactIds = /* @__PURE__ */ new Set();
				for (const artifact of optionsRef.current.artifacts) if (isHtmlArtifact(artifact)) htmlMediaArtifactIds.add(artifact.id);
				if (htmlMediaArtifactIds.size > 0) prev = prev.filter((tab) => {
					if (tab.kind !== "artifact" && tab.kind !== "fileChange") return true;
					return !htmlMediaArtifactIds.has(tab.artifactId || "");
				});
			}
			if (candidateWithOwner.kind === "artifact" || candidateWithOwner.kind === "fileChange") {
				const artifactId = candidateWithOwner.artifactId;
				if (artifactId) {
					if (isHtmlArtifact(optionsRef.current.artifacts.find((a) => a.id === artifactId)) && prev.some((t) => t.kind === "preview")) return prev;
				}
			}
			const existingIdx = prev.findIndex((t) => t.id === candidateWithOwner.id);
			if (existingIdx === -1) return [...prev, candidateWithOwner];
			const existing = prev[existingIdx];
			if (existing.label === candidateWithOwner.label && existing.subtitle === candidateWithOwner.subtitle && existing.browserUrl === candidateWithOwner.browserUrl && existing.filePath === candidateWithOwner.filePath && existing.artifactId === candidateWithOwner.artifactId && existing.mcpAppId === candidateWithOwner.mcpAppId && existing.ownerKey === candidateWithOwner.ownerKey) return prev;
			const next = [...prev];
			next[existingIdx] = candidateWithOwner;
			return next;
		});
	}, [
		options.enabled,
		activeTabCandidate,
		options.shouldAutoOpenTab,
		options.resetKey
	]);
	(0, import_react$4.useEffect)(() => {
		if (findMissingArtifactIds(pendingRestoreArtifactIdsRef.current, optionsRef.current.artifacts).length > 0) return;
		if (pendingRestoreArtifactIdsRef.current.size > 0) pendingRestoreArtifactIdsRef.current = /* @__PURE__ */ new Set();
		setOpenTabs((prev) => {
			const filtered = prev.filter((tab) => isTabStillValid(tab, optionsRef.current));
			return filtered.length === prev.length ? prev : filtered;
		});
	}, [
		options.artifacts,
		options.mcpAppsAvailable,
		options.browserUrl
	]);
	const previousActiveTabIdRef = (0, import_react$4.useRef)(void 0);
	(0, import_react$4.useEffect)(() => {
		const previousActiveTabId = previousActiveTabIdRef.current;
		const shouldPrune = shouldPruneUnifiedTabOnSelectionClear({
			activeTabId,
			previousActiveTabId,
			previousTabViewWhenActive: (previousActiveTabId ? openTabsRef.current.find((tab) => tab.id === previousActiveTabId) : void 0)?.viewWhenActive,
			currentView: options.currentView
		});
		previousActiveTabIdRef.current = activeTabId;
		if (!shouldPrune || !previousActiveTabId) return;
		setOpenTabs((prev) => prev.filter((tab) => tab.id !== previousActiveTabId));
	}, [activeTabId, options.currentView]);
	const setActiveTab = (0, import_react$4.useCallback)((id) => {
		const tab = openTabs.find((t) => t.id === id);
		if (!tab) return;
		const beforeActivate = optionsRef.current.onBeforeActivate;
		if (!beforeActivate) {
			activateTab(tab, optionsRef.current);
			return;
		}
		Promise.resolve(beforeActivate(tab)).then((allowed) => {
			if (allowed) activateTab(tab, optionsRef.current);
		}).catch(() => {
			activateTab(tab, optionsRef.current);
		});
	}, [openTabs]);
	const closeTab = (0, import_react$4.useCallback)((id) => {
		if (pendingCloseTabIdsRef.current.has(id)) return;
		const closingTab = openTabs.find((tab) => tab.id === id);
		if (!closingTab) return;
		pendingCloseTabIdsRef.current.add(id);
		(async () => {
			let shouldClose = true;
			try {
				const beforeCloseResult = optionsRef.current.onBeforeClose?.(closingTab);
				if (beforeCloseResult !== void 0) shouldClose = await Promise.resolve(beforeCloseResult);
			} catch (error) {
				console.warn("[useUnifiedTabs] before-close gate failed", {
					tabId: id,
					error: error instanceof Error ? error.message : String(error)
				});
				shouldClose = false;
			}
			pendingCloseTabIdsRef.current.delete(id);
			if (!shouldClose) return;
			const prev = openTabsRef.current;
			const index = prev.findIndex((t) => t.id === id);
			if (index === -1) return;
			const opts = optionsRef.current;
			const closingEntry = prev[index];
			const isActive = activeTabIdRef.current === id;
			if (isActive) suppressAutoOpenTabIdRef.current = id;
			const linkedArtifactTabIds = [];
			if (closingEntry.kind === "preview" && opts.selectedArtifactId) {
				if (isHtmlArtifact(opts.artifacts.find((a) => a.id === opts.selectedArtifactId))) {
					for (const t of prev) if (t.id !== id && (t.kind === "artifact" || t.kind === "fileChange") && t.artifactId === opts.selectedArtifactId) linkedArtifactTabIds.push(t.id);
				}
			}
			const idsToRemove = new Set([id, ...linkedArtifactTabIds]);
			rememberRecentlyClosedTabs(recentlyClosedTabSignaturesRef.current, prev.filter((t) => idsToRemove.has(t.id)));
			const next = prev.filter((t) => !idsToRemove.has(t.id));
			openTabsRef.current = next;
			setOpenTabs(next);
			if (next.length === 0) {
				clearAllSelections(opts);
				opts.onAllTabsClosed?.();
				if (closingEntry.kind === "preview" && opts.currentView === "preview") opts.onViewChange("artifacts");
				return;
			}
			if (closingEntry.kind === "preview") {
				opts.onBrowserUrlChange?.(void 0);
				if (linkedArtifactTabIds.length > 0) opts.onArtifactSelect(void 0);
				if (opts.currentView === "preview") opts.onViewChange("artifacts");
			}
			if (!isActive) return;
			activateTab(next[Math.min(index, next.length - 1)], opts);
		})().catch(() => void 0);
	}, [openTabs]);
	const reorderTabs = (0, import_react$4.useCallback)((orderedIds) => {
		setOpenTabs((prev) => applyTabOrder(prev, orderedIds));
	}, []);
	const pruneTabs = (0, import_react$4.useCallback)((predicate) => {
		setOpenTabs((prev) => {
			const next = prev.filter((tab) => !predicate(tab));
			return next.length === prev.length ? prev : next;
		});
	}, []);
	const artifactIdSet = (0, import_react$4.useMemo)(() => new Set(options.artifacts.filter((artifact) => artifact.type !== "task" && !isHtmlArtifact(artifact)).map((artifact) => artifact.id)), [options.artifacts]);
	const visibleTabs = (0, import_react$4.useMemo)(() => filterTabsByOwner(openTabs, options.resetKey).filter((tab) => {
		if (tab.kind === "preview") return !!options.browserUrl && tab.browserUrl === options.browserUrl;
		if ((tab.kind === "artifact" || tab.kind === "fileChange") && tab.artifactId) return artifactIdSet.has(tab.artifactId);
		return true;
	}), [
		openTabs,
		options.resetKey,
		options.browserUrl,
		artifactIdSet
	]);
	return {
		tabs: visibleTabs,
		activeTabId: visibleTabs.some((tab) => tab.id === activeTabId) ? activeTabId : void 0,
		setActiveTab,
		closeTab,
		reorderTabs,
		pruneTabs
	};
}
var import_react$4, SESSION_TABS_CACHE_LIMIT, RECENTLY_CLOSED_SUPPRESSION_MS, sessionTabsCache;
var init_use_unified_tabs = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_selection_clear_prune_policy();
	SESSION_TABS_CACHE_LIMIT = 50;
	RECENTLY_CLOSED_SUPPRESSION_MS = 1e3;
	sessionTabsCache = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/unified-tabs-events.ts
var SIDEBAR_TABS_BLOCK_FILE_EVENT, SIDEBAR_TABS_KEEP_ONLY_FILE_EVENT;
var init_unified_tabs_events = __esmMin((() => {
	SIDEBAR_TABS_BLOCK_FILE_EVENT = "workbuddy:sidebar-tabs-block-file";
	SIDEBAR_TABS_KEEP_ONLY_FILE_EVENT = "workbuddy:sidebar-tabs-keep-only-file";
}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/SidebarNext.tsx
/**
* 从 artifact 的 url / uri 中提取本地绝对路径（与 DetailPanel 内同名函数保持一致）。
* 非 file:// 或非本地绝对路径时返回 undefined，表示无需校验（云端文件等）。
*/
function localPathFromArtifact(artifact) {
	if (!artifact) return;
	let raw;
	if (artifact.type === "media-artifact") raw = artifact.url;
	else if (artifact.type === "file-changes") raw = artifact.fileChangeInfo?.uri;
	else if (artifact.type === "custom-artifact" || artifact.type === "implementation-plan") raw = artifact.uri;
	if (!raw || typeof raw !== "string") return;
	if (/^(https?:|data:|blob:|local-file:)/i.test(raw)) return;
	if (/^file:\/\//i.test(raw)) try {
		const pathname = new URL(raw).pathname;
		if (/^\/[a-zA-Z]:/.test(pathname)) return decodeURIComponent(pathname.slice(1).replace(/\//g, "\\"));
		return decodeURIComponent(pathname);
	} catch {
		return;
	}
	if (raw.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(raw)) return raw;
}
function artifactFileKeyById(artifacts, artifactId) {
	if (!artifactId) return "";
	const artifact = artifacts?.find((item) => item.id === artifactId);
	if (artifact?.type !== "media-artifact" || !artifact.url) return "";
	return normalizeFileUrl(artifact.url);
}
function unifiedTabFileKey(tab, artifacts) {
	if (tab.filePath) return normalizeFileUrl(tab.filePath);
	if (tab.kind === "artifact" || tab.kind === "fileChange") return artifactFileKeyById(artifacts, tab.artifactId);
	return "";
}
function isUnifiedFileTab(tab, artifacts) {
	return Boolean(unifiedTabFileKey(tab, artifacts));
}
/**
* 订阅 SDK 预览的全局 context 变化事件，维护一个"按归一化文件键"的脏文档集合。
*
* 每个 SdkDocumentPreview slot 在 2s 轮询脏状态变化时广播 { filePath, isDirty }，
* 这里按 normalizeFileUrl(filePath) 收敛成稳定键，供顶部 tab 条点亮"未保存"灰点。
* 该通道不经 URI 门控，后台 keep-alive 文档也能上报。
*/
function useSdkPreviewDirtyKeys() {
	const [dirtyKeys, setDirtyKeys] = (0, import_react$3.useState)(() => /* @__PURE__ */ new Set());
	(0, import_react$3.useEffect)(() => subscribeSdkPreviewContextChange((context) => {
		const filePath = context?.filePath;
		if (!filePath) return;
		const key = normalizeFileUrl(filePath);
		if (!key) return;
		const isDirty = context?.isDirty === true;
		setDirtyKeys((prev) => {
			if (prev.has(key) === isDirty) return prev;
			const next = new Set(prev);
			if (isDirty) next.add(key);
			else next.delete(key);
			return next;
		});
	}), []);
	return dirtyKeys;
}
function useMacWindowChromeInset(enabled, forceInset = false) {
	const rootRef = (0, import_react$3.useRef)(null);
	const [needsInset, setNeedsInset] = (0, import_react$3.useState)(false);
	(0, import_react$3.useLayoutEffect)(() => {
		if (!enabled) {
			setNeedsInset(false);
			return;
		}
		if (forceInset) return;
		const update = () => {
			const rect = rootRef.current?.getBoundingClientRect();
			setNeedsInset(Boolean(rect && rect.left < 8 && rect.top < 8));
		};
		update();
		window.addEventListener("resize", update);
		if (typeof ResizeObserver === "undefined" || !rootRef.current) return () => {
			window.removeEventListener("resize", update);
		};
		const observer = new ResizeObserver(update);
		observer.observe(rootRef.current);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", update);
		};
	}, [enabled, forceInset]);
	return [rootRef, Boolean(enabled && (forceInset || needsInset))];
}
function cloneSidebarSessionState(state) {
	return { ...state };
}
function restoreSidebarSessionState(sessionId) {
	if (!sessionId) return;
	const cached = sidebarSessionStateCache.get(sessionId);
	if (!cached) return;
	sidebarSessionStateCache.delete(sessionId);
	sidebarSessionStateCache.set(sessionId, cached);
	return cloneSidebarSessionState(cached);
}
function saveSidebarSessionState(sessionId, state) {
	if (!sessionId) return;
	sidebarSessionStateCache.delete(sessionId);
	sidebarSessionStateCache.set(sessionId, cloneSidebarSessionState(state));
	while (sidebarSessionStateCache.size > SIDEBAR_SESSION_STATE_CACHE_LIMIT) {
		const oldest = sidebarSessionStateCache.keys().next().value;
		if (oldest === void 0) return;
		sidebarSessionStateCache.delete(oldest);
	}
}
function useSidebarViewOptions(hasFileChanges, hasExpert, isWorkbuddyDesktop, isProjectionActive, featureEnabled) {
	const t = useTranslation();
	const mcpAppsEntryEnabled = isMcpAppsTodoEntryEnabled();
	return (0, import_react$3.useMemo)(() => {
		const isFileVersionMode = featureEnabled;
		return [
			{
				value: "overview",
				label: t("detailPanel.overview")
			},
			{
				value: "fileTree",
				label: t("detailPanel.allFiles")
			},
			{
				value: "preview",
				label: t("detailPanel.preview")
			},
			{
				value: "changes",
				label: isFileVersionMode ? t("detailPanel.fileVersionManagement") : t("detailPanel.changes"),
				hide: isFileVersionMode ? false : !hasFileChanges
			},
			{
				value: "mcpApps",
				label: t("detailPanel.mcpApps"),
				hide: !mcpAppsEntryEnabled
			},
			{
				value: "expert",
				label: t("detailPanel.expert"),
				hide: !hasExpert
			}
		];
	}, [
		t,
		hasFileChanges,
		mcpAppsEntryEnabled,
		hasExpert,
		featureEnabled
	]);
}
var import_react$3, import_react_dom, import_jsx_runtime$1, LEFT_PANEL_MOTION_MS, isMacPlatform, SIDEBAR_SESSION_STATE_CACHE_LIMIT, sidebarSessionStateCache, SidebarNext;
var init_SidebarNext = __esmMin((() => {
	init_SidebarNext$1();
	init_src$1();
	init_src$2();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_ArtifactTabsBar();
	init_PreviewPanelIcons();
	init_ViewSelector();
	init_use_unified_tabs();
	init_unified_tabs_events();
	import_jsx_runtime$1 = require_jsx_runtime();
	LEFT_PANEL_MOTION_MS = 180;
	isMacPlatform = typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("mac");
	SIDEBAR_SESSION_STATE_CACHE_LIMIT = 50;
	sidebarSessionStateCache = /* @__PURE__ */ new Map();
	SidebarNext = (props) => {
		const t = useTranslation();
		const { sidebarView, onSidebarViewChange, ardotAuthBound, onArdotAuthToggle, environmentType, isPreviewFullscreen, artifacts, selectedArtifactId, onArtifactSelect, checkFileExists, onRemoveArtifact, sessionId, collapseSidebar, hideSidebar, onSidebarCollapseChange, onToggleDetailPanel, onTogglePreviewFullscreen, hasDetailPreviewContent } = props;
		const hasOpenedDetailContent = hasDetailPreviewContent ?? Boolean(selectedArtifactId || props.selectedFilePath || (props.browserUrlForTab ?? props.browserUrl));
		const mcpAppsEntryEnabled = isMcpAppsTodoEntryEnabled();
		const hasExpertData = !!(props.createdExperts && props.createdExperts.length > 0) || sidebarView === "expert";
		const featureEnabled = Boolean(props.fileVersionPanel);
		const isFileVersionMode = featureEnabled && props.isWorkbuddyDesktop === true && props.isProjectionActive === true;
		const options = useSidebarViewOptions((artifacts ?? []).some((a) => a.category === "file-changes") || sidebarView === "changes", hasExpertData, props.isWorkbuddyDesktop, props.isProjectionActive, featureEnabled);
		const currentView = !mcpAppsEntryEnabled && sidebarView === "mcpApps" ? "artifacts" : sidebarView ?? "artifacts";
		(0, import_react$3.useEffect)(() => {
			if (!mcpAppsEntryEnabled && sidebarView === "mcpApps") onSidebarViewChange?.("artifacts");
		}, [
			mcpAppsEntryEnabled,
			sidebarView,
			onSidebarViewChange
		]);
		const [rootRef, needsMacWindowChromeInset] = useMacWindowChromeInset(environmentType === "local" && isMacPlatform, Boolean(isPreviewFullscreen));
		const initialSidebarSessionStateRef = (0, import_react$3.useRef)(void 0);
		if (initialSidebarSessionStateRef.current === void 0) initialSidebarSessionStateRef.current = restoreSidebarSessionState(sessionId) ?? null;
		const [leftCollapsed, setLeftCollapsed] = (0, import_react$3.useState)(() => initialSidebarSessionStateRef.current?.leftCollapsed ?? Boolean(collapseSidebar && !hideSidebar));
		const prevCollapseSidebarRef = (0, import_react$3.useRef)(collapseSidebar);
		(0, import_react$3.useEffect)(() => {
			const prevCollapseSidebar = prevCollapseSidebarRef.current;
			prevCollapseSidebarRef.current = collapseSidebar;
			if (collapseSidebar && !hideSidebar) {
				setLeftCollapsed(true);
				return;
			}
			if (prevCollapseSidebar && !collapseSidebar) setLeftCollapsed(false);
		}, [collapseSidebar, hideSidebar]);
		const [previewSidebarExpanded, setPreviewSidebarExpanded] = (0, import_react$3.useState)(() => {
			const cached = initialSidebarSessionStateRef.current;
			if (cached) return cached.previewSidebarExpanded;
			return sidebarView === "preview" ? !Boolean(collapseSidebar && !hideSidebar) : false;
		});
		const [overviewHoverOpen, setOverviewHoverOpen] = (0, import_react$3.useState)(false);
		const overviewTriggerRef = (0, import_react$3.useRef)(null);
		const overviewHoverCloseTimerRef = (0, import_react$3.useRef)(null);
		const isPreviewView = currentView === "preview";
		const [isLeftCollapseAnimating, setIsLeftCollapseAnimating] = (0, import_react$3.useState)(false);
		const previousEffectiveLeftCollapsedRef = (0, import_react$3.useRef)(null);
		const [sidebarPinned, setSidebarPinned] = (0, import_react$3.useState)(() => initialSidebarSessionStateRef.current?.sidebarPinned ?? false);
		const prevSidebarSessionIdRef = (0, import_react$3.useRef)(sessionId);
		const sidebarSaveSessionIdRef = (0, import_react$3.useRef)(sessionId);
		const latestSidebarSessionStateRef = (0, import_react$3.useRef)({
			leftCollapsed,
			previewSidebarExpanded,
			sidebarPinned
		});
		latestSidebarSessionStateRef.current = {
			leftCollapsed,
			previewSidebarExpanded,
			sidebarPinned
		};
		(0, import_react$3.useEffect)(() => {
			latestSidebarSessionStateRef.current = {
				leftCollapsed,
				previewSidebarExpanded,
				sidebarPinned
			};
			if (sidebarSaveSessionIdRef.current !== sessionId) {
				sidebarSaveSessionIdRef.current = sessionId;
				return;
			}
			saveSidebarSessionState(sessionId, latestSidebarSessionStateRef.current);
		}, [
			leftCollapsed,
			previewSidebarExpanded,
			sessionId,
			sidebarPinned
		]);
		(0, import_react$3.useLayoutEffect)(() => {
			const prevSessionId = prevSidebarSessionIdRef.current;
			if (prevSessionId === sessionId) return;
			saveSidebarSessionState(prevSessionId, latestSidebarSessionStateRef.current);
			prevSidebarSessionIdRef.current = sessionId;
			const cached = restoreSidebarSessionState(sessionId);
			if (cached) {
				setLeftCollapsed(cached.leftCollapsed);
				setPreviewSidebarExpanded(cached.previewSidebarExpanded);
				setSidebarPinned(cached.sidebarPinned);
				setOverviewHoverOpen(false);
				return;
			}
			setLeftCollapsed(Boolean(collapseSidebar && !hideSidebar));
			setPreviewSidebarExpanded(isPreviewView ? !(collapseSidebar && !hideSidebar) : false);
			setSidebarPinned(false);
			setOverviewHoverOpen(false);
		}, [
			collapseSidebar,
			hideSidebar,
			isPreviewView,
			sessionId
		]);
		(0, import_react$3.useEffect)(() => () => {
			saveSidebarSessionState(prevSidebarSessionIdRef.current, latestSidebarSessionStateRef.current);
		}, []);
		const pinSidebarRequestSeq = props.pinSidebarRequestSeq ?? 0;
		const lastPinReqSeqRef = (0, import_react$3.useRef)(pinSidebarRequestSeq);
		(0, import_react$3.useEffect)(() => {
			if (pinSidebarRequestSeq > 0 && pinSidebarRequestSeq !== lastPinReqSeqRef.current) {
				lastPinReqSeqRef.current = pinSidebarRequestSeq;
				setSidebarPinned(true);
				setLeftCollapsed(false);
				setPreviewSidebarExpanded(true);
				props.onExpandDetailPanelForSidebarPin?.();
			}
		}, [pinSidebarRequestSeq]);
		(0, import_react$3.useLayoutEffect)(() => {
			if (isPreviewView) setPreviewSidebarExpanded(!leftCollapsed);
		}, [isPreviewView, leftCollapsed]);
		const effectiveLeftCollapsed = sidebarPinned ? false : !sidebarPinned && hasOpenedDetailContent;
		(0, import_react$3.useEffect)(() => {
			if (previousEffectiveLeftCollapsedRef.current === null) {
				previousEffectiveLeftCollapsedRef.current = effectiveLeftCollapsed;
				return;
			}
			if (previousEffectiveLeftCollapsedRef.current === effectiveLeftCollapsed) return;
			previousEffectiveLeftCollapsedRef.current = effectiveLeftCollapsed;
			setIsLeftCollapseAnimating(true);
			const timer = window.setTimeout(() => {
				setIsLeftCollapseAnimating(false);
			}, LEFT_PANEL_MOTION_MS + 40);
			return () => {
				window.clearTimeout(timer);
			};
		}, [effectiveLeftCollapsed]);
		const viewHasSidebarContent = currentView === "overview" || currentView === "artifacts" || currentView === "preview" || currentView === "fileTree" || currentView === "changes" || currentView === "expert" || mcpAppsEntryEnabled && currentView === "mcpApps";
		const shouldMountSelectorInSidebar = !effectiveLeftCollapsed && viewHasSidebarContent;
		const showSidebarPinButton = hasOpenedDetailContent;
		const handleViewChange = (0, import_react$3.useCallback)((next) => {
			if (!mcpAppsEntryEnabled && next === "mcpApps") return;
			if (next === currentView) return;
			onSidebarViewChange?.(next);
		}, [
			currentView,
			mcpAppsEntryEnabled,
			onSidebarViewChange
		]);
		const selectorView = currentView === "artifacts" ? "overview" : currentView;
		const [selectedExpertId, setSelectedExpertId] = (0, import_react$3.useState)(() => {
			const experts = props.createdExperts;
			return experts && experts.length > 0 ? experts[experts.length - 1].id : void 0;
		});
		(0, import_react$3.useEffect)(() => {
			const experts = props.createdExperts;
			if (!experts || experts.length === 0) {
				setSelectedExpertId(void 0);
				return;
			}
			setSelectedExpertId((prev) => prev && experts.some((expert) => expert.id === prev) ? prev : experts[experts.length - 1].id);
		}, [props.createdExperts]);
		const [tasksCollapsed, setTasksCollapsed] = (0, import_react$3.useState)(false);
		const [artifactsCollapsed, setArtifactsCollapsed] = (0, import_react$3.useState)(false);
		const viewSelectorNode = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ViewSelector, {
			value: selectorView,
			onChange: handleViewChange,
			options,
			triggerIconVisible: false,
			minWidth: 68
		});
		const clearOverviewHoverCloseTimer = (0, import_react$3.useCallback)(() => {
			if (!overviewHoverCloseTimerRef.current) return;
			clearTimeout(overviewHoverCloseTimerRef.current);
			overviewHoverCloseTimerRef.current = null;
		}, []);
		const openOverviewHover = (0, import_react$3.useCallback)(() => {
			clearOverviewHoverCloseTimer();
			setOverviewHoverOpen(true);
		}, [clearOverviewHoverCloseTimer]);
		const closeOverviewHover = (0, import_react$3.useCallback)(() => {
			clearOverviewHoverCloseTimer();
			if (document.querySelector(".cb-context-menu")) return;
			overviewHoverCloseTimerRef.current = setTimeout(() => {
				overviewHoverCloseTimerRef.current = null;
				setOverviewHoverOpen(false);
			}, 160);
		}, [clearOverviewHoverCloseTimer]);
		(0, import_react$3.useEffect)(() => () => {
			clearOverviewHoverCloseTimer();
		}, [clearOverviewHoverCloseTimer]);
		(0, import_react$3.useEffect)(() => {
			if (!overviewHoverOpen) return;
			const handlePointerDown = (event) => {
				if (document.querySelector(".cb-context-menu")) return;
				const target = event.target;
				if (!(target instanceof Node)) return;
				const popover = document.querySelector(".sidebar-next-overview-popover--portal");
				if (overviewTriggerRef.current?.contains(target) || popover?.contains(target)) return;
				setOverviewHoverOpen(false);
			};
			document.addEventListener("pointerdown", handlePointerDown, true);
			return () => document.removeEventListener("pointerdown", handlePointerDown, true);
		}, [overviewHoverOpen]);
		/**
		* header-slot 钉住按钮点击：
		*   - 未钉住 → 钉住（左栏被 effectiveLeftCollapsed 强制保持展开）
		*   - 已钉住 → 取消钉住，并顺带收起左栏（用户点击 = 想关掉这一列）
		*
		* 「取消钉住后顺带收起」是产品的取舍：钉住按钮直接占用了原 close
		* 按钮的位置，用户的意图就是"我用完了产物栏"。
		*/
		const handleHeaderSlotPinClick = (0, import_react$3.useCallback)(() => {
			setSidebarPinned((prev) => {
				const next = !prev;
				if (next) {
					setLeftCollapsed(false);
					if (isPreviewView) setPreviewSidebarExpanded(true);
					props.onExpandDetailPanelForSidebarPin?.();
				} else if (prev) if (isPreviewView) setPreviewSidebarExpanded(false);
				else {
					setLeftCollapsed(true);
					onSidebarCollapseChange?.(true);
				}
				return next;
			});
		}, [
			isPreviewView,
			onSidebarCollapseChange,
			props.onExpandDetailPanelForSidebarPin
		]);
		/**
		* popover 钉住按钮点击：
		*   - 切换钉住状态
		*   - 关闭 popover（点击图钉的语义就是"我做完决定了"，不应再悬浮停留）
		*/
		const handlePopoverPinClick = (0, import_react$3.useCallback)(() => {
			setSidebarPinned((prev) => {
				const next = !prev;
				if (next) {
					setLeftCollapsed(false);
					props.onExpandDetailPanelForSidebarPin?.();
				}
				return next;
			});
			clearOverviewHoverCloseTimer();
			setOverviewHoverOpen(false);
		}, [clearOverviewHoverCloseTimer, props.onExpandDetailPanelForSidebarPin]);
		/**
		* popover 内 SidebarNavContent 的 artifact / 团队成员选中回调。
		*
		* 透传选中 id 给上层，并把 view 从 overview / preview / changes 等
		* 切回 'artifacts'（让主区渲染 ArtifactContentRenderer）。这里**不
		* 主动关闭 popover**——用户可能想继续在浮层里浏览同列表的其它
		* 条目；要关闭时让 mouseLeave 流程自然接管。
		*
		* 例外：HTML media-artifact。上层 onArtifactSelect 包装层
		* （detail-panel-wrapper.tsx::onArtifactSelect HTML 分支）会主动把
		* view 切到 'preview' 走浏览器预览，本回调不能再把它拉回 'artifacts'，
		* 否则 popover 里点 HTML 永远停在产物详情、进不了浏览器预览（与主区
		* 产物列表行为不一致）。判定口径与 detail-panel-wrapper / DetailPanel
		* handleItemSelect / main-content-core.getLatestHtmlArtifactUrl 同源
		* （type=media-artifact + category=artifact + url 后缀 .html/.htm），
		* 任一处改动需同步其余几处。
		*/
		/**
		* 点击产物项前的文件存在性校验（与 DetailPanel.checkArtifactFileExists 逻辑对齐）。
		* - 未注入 checkFileExists 或非本地文件 → 直接返回 true（跳过校验）
		* - 文件不存在 → toast 提示 + onRemoveArtifact 移除 + 返回 false
		*/
		const checkArtifactFileExists = (0, import_react$3.useCallback)(async (artifactId) => {
			if (!checkFileExists) return true;
			const localPath = localPathFromArtifact((artifacts ?? []).find((a) => a.id === artifactId));
			if (!localPath) return true;
			const exists = await checkFileExists(localPath);
			if (!exists) {
				toast({
					message: t("detailPanel.artifactFileNotFound"),
					type: "warning"
				});
				onRemoveArtifact?.(artifactId);
			}
			return exists;
		}, [
			checkFileExists,
			onRemoveArtifact,
			artifacts,
			t
		]);
		const handleOverviewNavArtifactSelect = (0, import_react$3.useCallback)(async (item) => {
			if (!await checkArtifactFileExists(item.id)) return;
			onArtifactSelect?.(item.id);
			const targetArtifact = (artifacts ?? []).find((a) => a.id === item.id);
			const isHtmlMediaArtifact = targetArtifact?.type === "media-artifact" && targetArtifact.category === "artifact" && /\.html?$/i.test(targetArtifact.url || "");
			const isFileChange = targetArtifact?.category === "file-changes";
			if (sidebarView !== "artifacts" && !isHtmlMediaArtifact && !isFileChange) onSidebarViewChange?.("artifacts");
		}, [
			checkArtifactFileExists,
			onArtifactSelect,
			onSidebarViewChange,
			sidebarView,
			artifacts
		]);
		const handlePopoverExpertSelect = (0, import_react$3.useCallback)((id) => {
			setSelectedExpertId(id);
			if (currentView !== "expert") onSidebarViewChange?.("expert");
		}, [currentView, onSidebarViewChange]);
		const handlePopoverTeamItemSelect = (0, import_react$3.useCallback)((id, item) => {
			if (item.source === "agent-member") {
				handleOverviewNavArtifactSelect({ id });
				return;
			}
			handlePopoverExpertSelect(id);
		}, [handleOverviewNavArtifactSelect, handlePopoverExpertSelect]);
		const isNarrowDetailPanel = props.width < 480;
		/**
		* 在左栏列表（OverviewPanel / FileTree / FileChangesSidebar）里选中条目
		* 后的「自动收起」策略：
		*
		*   - 窄态（detail-panel < 480px）：**不管是否钉住**都收起，并主动取消
		*     钉住状态。窄屏下没有同时显示「列表 + 预览」的空间，钉住会逼迫用户
		*     看不到预览，因此选中即让出主区。
		*   - 普通宽度：仅当**未钉住**时收起；已钉住时左栏永久展开，不收起。
		*
		* 仅当传入值非空（确实选中了某个目标）时才调用；undefined / 空串等
		* 「清除选择」语义不触发收起。
		*/
		const collapseLeftAfterSelect = (0, import_react$3.useCallback)(() => {
			if (isNarrowDetailPanel) {
				setSidebarPinned(false);
				if (isPreviewView) setPreviewSidebarExpanded(false);
				else setLeftCollapsed((prev) => {
					if (prev) return prev;
					onSidebarCollapseChange?.(true);
					return true;
				});
				return;
			}
			if (sidebarPinned) return;
			if (isPreviewView) {
				setPreviewSidebarExpanded(false);
				return;
			}
			setLeftCollapsed((prev) => {
				if (prev) return prev;
				onSidebarCollapseChange?.(true);
				return true;
			});
		}, [
			isNarrowDetailPanel,
			sidebarPinned,
			isPreviewView,
			onSidebarCollapseChange
		]);
		const handleArtifactSelectAutoCollapse = (0, import_react$3.useCallback)((id) => {
			onArtifactSelect?.(id);
			if (!id) return;
			if (!((artifacts ?? []).find((a) => a.id === id)?.category === "file-changes") && currentView !== "artifacts") onSidebarViewChange?.("artifacts");
			collapseLeftAfterSelect();
		}, [
			onArtifactSelect,
			currentView,
			onSidebarViewChange,
			collapseLeftAfterSelect,
			artifacts
		]);
		const handleFileSelectAutoCollapse = (0, import_react$3.useCallback)((filePath, content) => {
			props.onFileSelect?.(filePath, content);
			if (filePath) collapseLeftAfterSelect();
		}, [props.onFileSelect, collapseLeftAfterSelect]);
		/**
		* SidebarNavContent 仅接受 'zh' / 'en'，与 DetailPanel 内部一致：
		* `i18nLocale = rawLocale.startsWith('zh') ? 'zh' : 'en'`。
		*/
		const { locale: rawLocale } = useI18n();
		const popoverLocale = rawLocale.startsWith("zh") ? "zh" : "en";
		const popoverViewSelectorNode = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ViewSelector, {
			value: selectorView,
			onChange: (0, import_react$3.useCallback)((next) => {
				handleViewChange(next);
			}, [handleViewChange]),
			options,
			triggerIconVisible: false,
			minWidth: 68,
			onOpenChange: (0, import_react$3.useCallback)((open) => {
				if (open) {
					clearOverviewHoverCloseTimer();
					return;
				}
			}, [clearOverviewHoverCloseTimer])
		});
		const overviewPopoverPortalTarget = typeof document !== "undefined" ? document.querySelector(".teams-container") ?? document.body : null;
		const overviewPopoverRect = overviewHoverOpen ? overviewTriggerRef.current?.getBoundingClientRect() : void 0;
		const overviewPopoverStyle = overviewPopoverRect ? {
			left: overviewPopoverRect.left,
			top: overviewPopoverRect.bottom
		} : void 0;
		const renderOverviewPopover = (node) => {
			if (!overviewPopoverPortalTarget) return node;
			return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "sidebar-next-main-header sidebar-next-overview-popover-portal-scope",
				"data-disable-open-folder-context-menu": environmentType === "cloud" ? "true" : void 0,
				"data-disable-local-file-actions": environmentType === "cloud" ? "true" : void 0,
				"data-remote-file-session-id": environmentType === "cloud" ? sessionId : void 0,
				children: node
			}), overviewPopoverPortalTarget);
		};
		const overviewMenuNode = /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			ref: overviewTriggerRef,
			className: "sidebar-next-overview-trigger",
			onMouseEnter: sidebarPinned ? void 0 : openOverviewHover,
			onMouseLeave: sidebarPinned ? void 0 : closeOverviewHover,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
				className: `sidebar-next-top-button sidebar-next-top-button--menu${sidebarPinned ? " sidebar-next-top-button--disabled" : ""}`,
				size: "small",
				"aria-label": sidebarPinned ? t("sidebar.next.alreadyPinned") : t("detailPanel.overview"),
				title: sidebarPinned ? t("sidebar.next.alreadyPinned") : t("detailPanel.overview"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbMenuIcon, {})
			}), overviewHoverOpen && (sidebarPinned || !shouldMountSelectorInSidebar) && renderOverviewPopover(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Popover, {
				className: "sidebar-next-overview-popover sidebar-next-overview-popover--portal",
				style: overviewPopoverStyle,
				onMouseEnter: openOverviewHover,
				onMouseLeave: closeOverviewHover,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "sidebar-next-overview-popover-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "sidebar-next-overview-popover-header",
						children: [popoverViewSelectorNode, hasOpenedDetailContent && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
							className: `sidebar-next-pin-button${sidebarPinned ? " sidebar-next-pin-button--active" : ""}`,
							size: "small",
							"aria-label": sidebarPinned ? t("sidebar.next.unpinSidebar") : t("sidebar.next.pinSidebar"),
							title: sidebarPinned ? t("sidebar.next.unpinSidebar") : t("sidebar.next.pinSidebar"),
							onClick: handlePopoverPinClick,
							children: sidebarPinned ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PinFilledIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PinIcon, {})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "sidebar-next-overview-popover-body",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarNavContent, {
							sidebarView: currentView,
							locale: popoverLocale,
							artifacts: artifacts ?? [],
							selectedArtifactId,
							onArtifactSelect: handleOverviewNavArtifactSelect,
							fileTree: props.fileTree,
							selectedFilePath: props.selectedFilePath,
							onFileSelect: props.onFileSelect,
							onBeforeLocalDocumentOpen: props.onBeforeLocalDocumentOpen,
							onFileDoubleClick: props.onFileDoubleClick,
							lazyFileTreeMode: props.lazyFileTreeMode,
							fileTreeData: props.fileTreeData,
							fileTreeLoaded: props.fileTreeLoaded,
							onLoadFileTreeChildren: props.onLoadFileTreeChildren,
							loadedPaths: props.loadedPaths,
							onLoadedPathsChange: props.onLoadedPathsChange,
							collapsedFolders: props.collapsedFolders,
							onCollapsedFoldersChange: props.onCollapsedFoldersChange,
							onTreeDataChange: props.onTreeDataChange,
							onReadFile: props.onReadFile,
							readFileWithFormat: props.readFileWithFormat,
							taskId: props.taskId,
							taskName: props.taskName,
							createdExperts: props.createdExperts,
							selectedExpertId,
							onExpertSelect: handlePopoverExpertSelect,
							mcpAppsAvailable: props.mcpAppsAvailable,
							selectedMcpAppId: props.selectedMcpAppId,
							onSelectMcpApp: props.onSelectMcpApp,
							teamMemberAvatars: props.teamMemberAvatars,
							onTeamItemSelect: handlePopoverTeamItemSelect,
							tasksCollapsed,
							onTasksCollapsedChange: setTasksCollapsed,
							artifactsCollapsed,
							onArtifactsCollapsedChange: setArtifactsCollapsed
						})
					})]
				})
			}))]
		});
		const panelToggleLabel = t("sidebar.next.collapseLeftColumn");
		const pinLabel = sidebarPinned ? t("sidebar.next.unpinSidebar") : t("sidebar.next.pinSidebar");
		const renderSidebarPinNode = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
			className: `sidebar-next-collapse-toggle sidebar-next-collapse-toggle--pin${sidebarPinned ? " sidebar-next-collapse-toggle--pinned" : ""}`,
			size: "small",
			"aria-label": pinLabel,
			title: pinLabel,
			onClick: handleHeaderSlotPinClick,
			children: sidebarPinned ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(UnpinIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PinIcon, {})
		});
		const renderPanelToggleNode = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
			className: "sidebar-next-collapse-toggle",
			size: "small",
			"aria-label": panelToggleLabel,
			title: panelToggleLabel,
			onClick: onToggleDetailPanel,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PanelToggleIcon, {})
		});
		const sidebarHeaderSlotNode = shouldMountSelectorInSidebar && !isFileVersionMode ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "sidebar-next-inline-nav",
			children: [viewSelectorNode, showSidebarPinButton && renderSidebarPinNode()]
		}) : void 0;
		const currentSessionArtifacts = (0, import_react$3.useMemo)(() => (artifacts ?? []).filter((artifact) => !sessionId || !artifact.sessionId || artifact.sessionId === sessionId), [artifacts, sessionId]);
		const tabArtifacts = (0, import_react$3.useMemo)(() => currentSessionArtifacts.map((artifact) => ({
			id: artifact.id,
			title: artifact.title,
			subtitle: artifact.subtitle,
			category: artifact.category,
			type: artifact.type,
			url: artifact.url
		})), [currentSessionArtifacts]);
		const handleArtifactSelectForTab = (0, import_react$3.useCallback)(async (id) => {
			if (id !== void 0) {
				if (!await checkArtifactFileExists(id)) return;
			}
			onArtifactSelect?.(id);
		}, [checkArtifactFileExists, onArtifactSelect]);
		const handleFileSelectForTab = (0, import_react$3.useCallback)((filePath) => {
			if (filePath === void 0) {
				props.onFileSelect?.(void 0);
				return;
			}
			props.onFileSelect?.(filePath);
		}, [props.onFileSelect]);
		const handleMcpAppSelectForTab = (0, import_react$3.useCallback)((id) => {
			if (!mcpAppsEntryEnabled) return;
			if (id === void 0) return;
			props.onSelectMcpApp?.(id);
		}, [mcpAppsEntryEnabled, props.onSelectMcpApp]);
		const handleBrowserUrlForTab = (0, import_react$3.useCallback)((url) => {
			props.onBrowserUrlChange?.(url ?? "");
		}, [props.onBrowserUrlChange]);
		const handleViewChangeForTab = (0, import_react$3.useCallback)((next) => {
			onSidebarViewChange?.(next);
		}, [onSidebarViewChange]);
		const handleAllTabsClosed = (0, import_react$3.useCallback)(() => {
			if (sidebarPinned) {
				setLeftCollapsed(false);
				setPreviewSidebarExpanded(false);
				onSidebarCollapseChange?.(false);
				return;
			}
			onToggleDetailPanel?.();
		}, [
			sidebarPinned,
			onSidebarCollapseChange,
			onToggleDetailPanel
		]);
		const [blockedFileTabKeys, setBlockedFileTabKeys] = (0, import_react$3.useState)(() => /* @__PURE__ */ new Set());
		(0, import_react$3.useEffect)(() => {
			setBlockedFileTabKeys(/* @__PURE__ */ new Set());
		}, [sessionId]);
		const shouldAutoOpenUnifiedTab = (0, import_react$3.useCallback)((candidate) => {
			const key = unifiedTabFileKey(candidate, currentSessionArtifacts);
			if (!key) return true;
			return !blockedFileTabKeys.has(key);
		}, [blockedFileTabKeys, currentSessionArtifacts]);
		const { tabs: unifiedTabs, activeTabId: activeUnifiedTabId, setActiveTab: setActiveUnifiedTab, closeTab: closeUnifiedTab, reorderTabs: reorderUnifiedTabs, pruneTabs: pruneUnifiedTabs } = useUnifiedTabs({
			artifacts: tabArtifacts,
			selectedArtifactId,
			onArtifactSelect: handleArtifactSelectForTab,
			selectedFilePath: props.selectedFilePath,
			onFileSelect: handleFileSelectForTab,
			mcpAppsAvailable: mcpAppsEntryEnabled ? props.mcpAppsAvailable ?? [] : [],
			selectedMcpAppId: mcpAppsEntryEnabled ? props.selectedMcpAppId : void 0,
			onSelectMcpApp: handleMcpAppSelectForTab,
			browserUrl: props.browserUrlForTab ?? props.browserUrl,
			onBrowserUrlChange: handleBrowserUrlForTab,
			currentView,
			onViewChange: handleViewChangeForTab,
			onAllTabsClosed: handleAllTabsClosed,
			enabled: true,
			resetKey: sessionId,
			shouldAutoOpenTab: shouldAutoOpenUnifiedTab,
			onBeforeActivate: props.onBeforeUnifiedTabActivate,
			onBeforeClose: props.onBeforeUnifiedTabClose
		});
		(0, import_react$3.useEffect)(() => {
			const onConflictBlocked = (event) => {
				const detail = event.detail;
				if (!detail?.requestSessionId || detail.requestSessionId !== sessionId) return;
				const key = normalizeFileUrl(detail.filePath);
				if (!key) return;
				setBlockedFileTabKeys((prev) => {
					if (prev.has(key)) return prev;
					const next = new Set(prev);
					next.add(key);
					return next;
				});
				pruneUnifiedTabs((tab) => isUnifiedFileTab(tab, currentSessionArtifacts) && unifiedTabFileKey(tab, currentSessionArtifacts) === key);
			};
			const onJumpFocus = (event) => {
				const detail = event.detail;
				if (!detail?.sessionId || detail.sessionId !== sessionId) return;
				const keepKey = normalizeFileUrl(detail.filePath);
				if (!keepKey) return;
				setBlockedFileTabKeys(/* @__PURE__ */ new Set());
				pruneUnifiedTabs((tab) => isUnifiedFileTab(tab, currentSessionArtifacts) && unifiedTabFileKey(tab, currentSessionArtifacts) !== keepKey);
			};
			window.addEventListener(SIDEBAR_TABS_BLOCK_FILE_EVENT, onConflictBlocked);
			window.addEventListener(SIDEBAR_TABS_KEEP_ONLY_FILE_EVENT, onJumpFocus);
			return () => {
				window.removeEventListener(SIDEBAR_TABS_BLOCK_FILE_EVENT, onConflictBlocked);
				window.removeEventListener(SIDEBAR_TABS_KEEP_ONLY_FILE_EVENT, onJumpFocus);
			};
		}, [
			currentSessionArtifacts,
			pruneUnifiedTabs,
			sessionId
		]);
		const dirtyFileKeys = useSdkPreviewDirtyKeys();
		const visibleUnifiedTabs = (0, import_react$3.useMemo)(() => {
			if (dirtyFileKeys.size === 0) return unifiedTabs;
			return unifiedTabs.map((tab) => {
				const key = unifiedTabFileKey(tab, currentSessionArtifacts) || (tab.subtitle ? normalizeFileUrl(tab.subtitle) : "");
				const isDirty = key ? dirtyFileKeys.has(key) : false;
				return tab.isDirty === isDirty ? tab : {
					...tab,
					isDirty
				};
			});
		}, [
			currentSessionArtifacts,
			dirtyFileKeys,
			unifiedTabs
		]);
		const handleVisibleUnifiedTabSelect = (0, import_react$3.useCallback)((id) => {
			setActiveUnifiedTab(id);
		}, [setActiveUnifiedTab]);
		const handleVisibleUnifiedTabClose = (0, import_react$3.useCallback)((id) => {
			closeUnifiedTab(id);
		}, [closeUnifiedTab]);
		const handleVisibleUnifiedTabsReorder = (0, import_react$3.useCallback)((orderedIds) => {
			reorderUnifiedTabs(orderedIds);
		}, [reorderUnifiedTabs]);
		const hasOpenTabs = visibleUnifiedTabs.length > 0;
		const showSelectorInMain = !effectiveLeftCollapsed && !viewHasSidebarContent;
		const showPanelToggleInMain = Boolean(shouldMountSelectorInSidebar || onToggleDetailPanel);
		const setDetailSidebarExpandedRef = (0, import_react$3.useRef)(props.setDetailSidebarExpanded);
		setDetailSidebarExpandedRef.current = props.setDetailSidebarExpanded;
		const lastSyncedRef = (0, import_react$3.useRef)(void 0);
		(0, import_react$3.useLayoutEffect)(() => {
			const syncedExpanded = props.showDetailPanel ? showPanelToggleInMain : false;
			if (lastSyncedRef.current !== syncedExpanded) {
				lastSyncedRef.current = syncedExpanded;
				setDetailSidebarExpandedRef.current?.(syncedExpanded);
			}
		}, [props.showDetailPanel, showPanelToggleInMain]);
		(0, import_react$3.useEffect)(() => () => {
			if (lastSyncedRef.current !== false) {
				lastSyncedRef.current = false;
				setDetailSidebarExpandedRef.current?.(false);
			}
		}, []);
		const detailMainHeaderSlotNode = /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "sidebar-next-main-header",
			children: [!props.hideHeader && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "sidebar-next-main-header__left",
				children: [
					overviewMenuNode,
					showSelectorInMain && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "sidebar-next-main-header__nav",
						children: viewSelectorNode
					}),
					hasOpenTabs && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "sidebar-next-main-header__tabs",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArtifactTabsBar, {
							tabs: visibleUnifiedTabs,
							activeTabId: activeUnifiedTabId,
							onSelect: handleVisibleUnifiedTabSelect,
							onClose: handleVisibleUnifiedTabClose,
							onReorder: handleVisibleUnifiedTabsReorder,
							closeLabel: t("detailPanel.close")
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "sidebar-next-main-header__actions",
				children: [onTogglePreviewFullscreen && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
					className: "sidebar-next-top-button sidebar-next-top-button--maximize",
					size: "small",
					"aria-label": isPreviewFullscreen ? t("common.exitFullscreen") : t("common.enterFullscreen"),
					title: isPreviewFullscreen ? t("common.exitFullscreen") : t("common.enterFullscreen"),
					onClick: () => onTogglePreviewFullscreen(!isPreviewFullscreen),
					children: isPreviewFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewRestoreIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PreviewMaximizeIcon, {})
				}), showPanelToggleInMain && renderPanelToggleNode()]
			})]
		});
		typeof document !== "undefined" && document.querySelector(".teams-container");
		const floatingActionsNode = void 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			ref: rootRef,
			className: [
				"sidebar-next",
				effectiveLeftCollapsed ? "sidebar-next--left-collapsed" : "",
				isLeftCollapseAnimating ? "sidebar-next--left-collapsing" : "",
				needsMacWindowChromeInset ? "sidebar-next--mac-window-chrome" : "",
				environmentType === "local" && !isMacPlatform ? "sidebar-next--windows-chrome" : "",
				isPreviewFullscreen ? "sidebar-next--preview-fullscreen" : ""
			].filter(Boolean).join(" "),
			"data-view": currentView,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "sidebar-next-body",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DetailPanel, {
					...props,
					onArtifactSelect: handleArtifactSelectAutoCollapse,
					onFileSelect: handleFileSelectAutoCollapse,
					hideHeader: true,
					compact: false,
					sidebarView: currentView,
					hideSidebar: Boolean(hideSidebar),
					collapseSidebar: effectiveLeftCollapsed,
					sidebarHeaderSlot: sidebarHeaderSlotNode,
					forceSidebarVisible: sidebarPinned,
					detailMainHeaderSlot: detailMainHeaderSlotNode,
					headerExtraTrailing: void 0,
					selectedExpertId,
					onExpertSelect: setSelectedExpertId,
					tasksCollapsed,
					onTasksCollapsedChange: setTasksCollapsed,
					artifactsCollapsed,
					onArtifactsCollapsedChange: setArtifactsCollapsed
				})
			}), floatingActionsNode]
		});
	};
	SidebarNext.displayName = "SidebarNext";
}));
var init_use_artifact_tabs = __esmMin((() => {
	require_react();
}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/hooks/use-sidebar-mode.ts
function normalize(value) {
	if (value === "legacy" || value === "next") return value;
}
function readFromQuery() {
	if (typeof window === "undefined") return;
	try {
		return normalize(new URLSearchParams(window.location.search).get(SIDEBAR_MODE_QUERY_PARAM));
	} catch {
		return;
	}
}
function readFromStorage() {
	if (typeof window === "undefined") return;
	try {
		return normalize(window.localStorage.getItem(SIDEBAR_MODE_STORAGE_KEY));
	} catch {
		return;
	}
}
function readFromProductFeatures() {
	if (typeof window === "undefined") return;
	try {
		const raw = window.PRODUCT_FEATURES;
		if (!raw) return;
		return normalize((typeof raw === "string" ? JSON.parse(raw) : raw)?.SidebarModeDefault);
	} catch {
		return;
	}
}
/**
* 同步解析当前 sidebar 模式。用于不希望触发 React 重渲染的位置
* （例如 Grid view 初始化），保证和 hook 返回值一致。
*/
function resolveSidebarMode() {
	return readFromQuery() ?? readFromStorage() ?? readFromProductFeatures() ?? "next";
}
/**
* 显式持久化用户选择。会广播自定义事件，以便其他 `useSidebarMode`
* 订阅者实时更新（单 tab 内也需要，`storage` 事件在同 tab 不触发）。
*/
function setSidebarMode(mode) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(SIDEBAR_MODE_STORAGE_KEY, mode);
	} catch {}
	try {
		window.dispatchEvent(new CustomEvent(SIDEBAR_MODE_CHANGE_EVENT, { detail: mode }));
	} catch {}
}
/**
* 订阅当前 sidebar 模式。
*/
function useSidebarMode() {
	const [mode, setModeState] = (0, import_react$1.useState)(() => resolveSidebarMode());
	(0, import_react$1.useEffect)(() => {
		if (typeof window === "undefined") return;
		const handleStorage = (event) => {
			if (event.key !== "agent-sidebar-mode") return;
			setModeState(resolveSidebarMode());
		};
		const handleCustomEvent = () => {
			setModeState(resolveSidebarMode());
		};
		window.addEventListener("storage", handleStorage);
		window.addEventListener(SIDEBAR_MODE_CHANGE_EVENT, handleCustomEvent);
		return () => {
			window.removeEventListener("storage", handleStorage);
			window.removeEventListener(SIDEBAR_MODE_CHANGE_EVENT, handleCustomEvent);
		};
	}, []);
	const setMode = (0, import_react$1.useCallback)((next) => {
		setSidebarMode(next);
		setModeState(next);
	}, []);
	return {
		mode,
		setMode,
		toggle: (0, import_react$1.useCallback)(() => {
			setMode(mode === "legacy" ? "next" : "legacy");
		}, [mode, setMode])
	};
}
var import_react$1, SIDEBAR_MODE_STORAGE_KEY, SIDEBAR_MODE_CHANGE_EVENT, SIDEBAR_MODE_QUERY_PARAM;
var init_use_sidebar_mode = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	SIDEBAR_MODE_STORAGE_KEY = "agent-sidebar-mode";
	SIDEBAR_MODE_CHANGE_EVENT = "agent-sidebar-mode-change";
	SIDEBAR_MODE_QUERY_PARAM = "sidebarMode";
})), import_jsx_runtime, SidebarModeToggle;
var init_SidebarModeToggle = __esmMin((() => {
	init_src$1();
	require_react();
	init_use_sidebar_mode();
	import_jsx_runtime = require_jsx_runtime();
	SidebarModeToggle = ({ className, labels, onToggle }) => {
		const { mode, setMode } = useSidebarMode();
		const next = mode === "legacy" ? "next" : "legacy";
		const label = labels?.[next] ?? (next === "next" ? "Try new sidebar" : "Use classic sidebar");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className,
			size: "small",
			variant: "outline",
			onClick: () => {
				setMode(next);
				onToggle?.(next);
			},
			title: label,
			children: label
		});
	};
	SidebarModeToggle.displayName = "SidebarModeToggle";
}));
//#endregion
//#region ../../packages/agent-sidebar-ui/src/index.ts
var init_src = __esmMin((() => {
	init_SidebarNext$1();
	init_SidebarNext();
	init_ViewSelector();
	init_ArtifactTabsBar();
	init_use_artifact_tabs();
	init_use_unified_tabs();
	init_SidebarModeToggle();
	init_use_sidebar_mode();
	init_unified_tabs_events();
}));
//#endregion
export { SIDEBAR_MODE_STORAGE_KEY as a, useSidebarMode as c, SIDEBAR_TABS_KEEP_ONLY_FILE_EVENT as d, useUnifiedTabs as f, SIDEBAR_MODE_QUERY_PARAM as i, SidebarNext as l, ArtifactTabsBar as m, SidebarModeToggle as n, resolveSidebarMode as o, ViewSelector as p, SIDEBAR_MODE_CHANGE_EVENT as r, setSidebarMode as s, init_src as t, SIDEBAR_TABS_BLOCK_FILE_EVENT as u };
