import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
//#region ../../packages/agent-ui/src/modules/collab/services/use-busy-action.ts
function useBusyAction() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	/** ref 守门：避免 React 状态尚未刷新前的并发点击穿透 */
	const busyRef = (0, import_react.useRef)(false);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	return {
		busy,
		run: (0, import_react.useCallback)(async (fn) => {
			if (busyRef.current) return false;
			busyRef.current = true;
			setBusy(true);
			try {
				await fn();
				return true;
			} finally {
				busyRef.current = false;
				if (mountedRef.current) setBusy(false);
			}
		}, [])
	};
}
var import_react;
var init_use_busy_action = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
export { useBusyAction as n, init_use_busy_action as t };
