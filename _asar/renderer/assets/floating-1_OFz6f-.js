import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Ka as init_floating_ui_react, Xa as useFloating$1, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
//#region ../../packages/agent-ui/src/hooks/use-floating-layer.ts
function getFloatingLayerState() {
	const globalScope = globalThis;
	const existing = globalScope[FLOATING_LAYER_STACK_KEY];
	if (!existing || !(existing.groups instanceof Map)) globalScope[FLOATING_LAYER_STACK_KEY] = { groups: /* @__PURE__ */ new Map() };
	return globalScope[FLOATING_LAYER_STACK_KEY];
}
function getGroupStack(groupKey) {
	const state = getFloatingLayerState();
	let stack = state.groups.get(groupKey);
	if (!(stack instanceof Set)) {
		stack = /* @__PURE__ */ new Set();
		state.groups.set(groupKey, stack);
	}
	return stack;
}
function nextZIndex(groupKey, base, step) {
	const stack = getGroupStack(groupKey);
	if (stack.size === 0) return base;
	let max = base;
	for (const z of stack) if (z > max) max = z;
	return max + step;
}
/**
* 浮层 z-index 运行时分配 hook
*
* @param open 浮层是否处于打开状态
* @returns 当前浮层应该使用的 z-index；`open=false` 时返回上次分配的值（用于关闭动画期间保持层级）
*/
function useFloatingLayer(open, options) {
	const baseRef = (0, import_react$1.useRef)(options?.base ?? BASE_Z_INDEX);
	const groupKeyRef = (0, import_react$1.useRef)(options?.groupKey ?? DEFAULT_GROUP_KEY);
	const assignedRef = (0, import_react$1.useRef)(null);
	const [zIndex, setZIndex] = (0, import_react$1.useState)(baseRef.current);
	(0, import_react$1.useLayoutEffect)(() => {
		const stack = getGroupStack(groupKeyRef.current);
		if (!open) {
			if (assignedRef.current !== null) {
				stack.delete(assignedRef.current);
				assignedRef.current = null;
			}
			return;
		}
		const z = nextZIndex(groupKeyRef.current, baseRef.current, options?.step ?? STEP);
		stack.add(z);
		assignedRef.current = z;
		setZIndex(z);
		return () => {
			if (assignedRef.current !== null) {
				stack.delete(assignedRef.current);
				assignedRef.current = null;
			}
		};
	}, [open, options?.step]);
	return zIndex;
}
var import_react$1, BASE_Z_INDEX, STEP, DEFAULT_GROUP_KEY, FLOATING_LAYER_STACK_KEY;
var init_use_floating_layer = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	BASE_Z_INDEX = 1100;
	STEP = 10;
	DEFAULT_GROUP_KEY = "default";
	FLOATING_LAYER_STACK_KEY = "__workbuddyFloatingLayerStack__";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/floating/use-floating.ts
/**
* useFloating —— `@floating-ui/react` 的 useFloating 的 z-index 自动化封装
*
* 与原版**唯一**的区别：返回的 `floatingStyles` 会自动带上由全局 LIFO 浮层栈
* （`useFloatingLayer`）按打开顺序分配的 `zIndex`。浮层打开时推栈、关闭出栈，
* **后打开的天然盖在先打开的之上**，支持任意深度嵌套（弹窗里再开弹窗 / 抽屉里开下拉）。
*
* 业务调用方因此完全不需要写任何 z-index：
* ```tsx
* const { refs, floatingStyles } = useFloating({ open, ... });
* <FloatingPortal>
*     <div ref={refs.setFloating} style={floatingStyles}>...</div>
* </FloatingPortal>
* // ↑ floatingStyles 已含运行时 zIndex，业务 .less 里不要再写 z-index
* ```
*
* 独立层级组（少数场景）：
* 需要"始终高于其它浮层"的浮层可传 `layer: { groupKey: 'xxx', base: 100000 }`，
* 例如 wb 宿主行展开按钮 —— 它必须盖住 cell-editor 里的所有 popover。**必须同时传
* `groupKey`**：只传 `base` 会被默认组栈顶爬升后反超（默认组 cell-editor 打开时
* 栈顶 = max(所有已打开层 z) + step，会顶到独立 base 之上）。
* ```tsx
* const { floatingStyles } = useFloating({
*     open,
*     layer: { groupKey: 'grid-expand-button', base: 100000 },
* });
* ```
*
* ⚠️ 适用边界：本封装只对「消费 `floatingStyles` 的锚定浮层」（Popover / Dropdown /
* 下拉菜单 / tooltip 等）生效。Modal / Drawer 这类用 `FloatingOverlay` 包裹的浮层，
* 层级根是 overlay 节点而非 floating 节点，不消费 `floatingStyles`，需在各自组件里
* 把 `useFloatingLayer(open)` 注入到 overlay 的 style 上（见 Modal/Drawer 实现）。
*
* 约束：agent-ui 内部禁止直接 `import '@floating-ui/react'`，必须走本模块
* （`foundation/floating`），以保证所有浮层共享同一套运行时层级栈。
*/
function useFloating(options) {
	const { layer, ...floatingOptions } = options ?? {};
	const result = useFloating$1(floatingOptions);
	const zIndex = useFloatingLayer(floatingOptions.open ?? false, layer);
	return {
		...result,
		floatingStyles: {
			...result.floatingStyles,
			zIndex
		}
	};
}
var init_use_floating = __esmMin((() => {
	init_floating_ui_react();
	init_use_floating_layer();
}));
var init_portal = __esmMin((() => {
	require_react();
	require_react_dom();
	init_use_floating_layer();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/floating/index.ts
var init_floating = __esmMin((() => {
	init_floating_ui_react();
	init_use_floating();
	init_src();
	init_portal();
}));
//#endregion
export { useFloatingLayer as i, useFloating as n, init_use_floating_layer as r, init_floating as t };
