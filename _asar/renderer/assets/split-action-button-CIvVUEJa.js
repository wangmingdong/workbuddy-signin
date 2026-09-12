import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { I as Dropdown, t as init_foundation } from "./foundation-QOglV606.js";
//#region ../../packages/agent-ui/src/components/conversation-list/split-action-button.tsx
/** 向上查找第一个可滚动祖先 */
function findScrollableAncestor(el) {
	let current = el.parentElement;
	while (current) {
		const { overflow, overflowY } = getComputedStyle(current);
		if (/(auto|scroll)/.test(overflow + overflowY)) return current;
		current = current.parentElement;
	}
	return null;
}
var import_react, import_jsx_runtime, ChevronIcon, SplitActionButton;
var init_split_action_button = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	import_jsx_runtime = require_jsx_runtime();
	ChevronIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 10 10",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M2 3.5L5 6.5L8 3.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	SplitActionButton = ({ primaryLabel, onPrimaryClick, secondaryItems = [], disabled = false, className, moreLabel = "更多操作" }) => {
		const [open, setOpen] = (0, import_react.useState)(false);
		const groupRef = (0, import_react.useRef)(null);
		const handlePrimary = (0, import_react.useCallback)((e) => {
			e.stopPropagation();
			onPrimaryClick();
		}, [onPrimaryClick]);
		(0, import_react.useEffect)(() => {
			if (!open || !groupRef.current) return;
			const scrollParent = findScrollableAncestor(groupRef.current);
			if (!scrollParent) return;
			const handleScroll = () => setOpen(false);
			scrollParent.addEventListener("scroll", handleScroll, { passive: true });
			return () => scrollParent.removeEventListener("scroll", handleScroll);
		}, [open]);
		if (!(secondaryItems.length > 0)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "notification-action primary",
			disabled,
			onClick: handlePrimary,
			children: primaryLabel
		});
		const dropdownItems = secondaryItems.map((item) => ({
			key: item.key,
			label: item.label,
			danger: item.danger,
			disabled: item.disabled
		}));
		const handleSelect = (0, import_react.useCallback)((key) => {
			secondaryItems.find((i) => i.key === key)?.onClick();
		}, [secondaryItems]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `notification-action-group${className ? ` ${className}` : ""}`,
			ref: groupRef,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "notification-action primary",
				disabled,
				onClick: handlePrimary,
				children: primaryLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
				trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "notification-action-dropdown-trigger",
					disabled,
					"aria-label": moreLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronIcon, {})
				}),
				items: dropdownItems,
				onSelect: handleSelect,
				placement: "bottom-end",
				offsetDistance: 4,
				open,
				onOpenChange: setOpen,
				disabled,
				className: "notification-action-menu",
				portalRoot: "body"
			})]
		});
	};
}));
//#endregion
export { init_split_action_button as n, SplitActionButton as t };
