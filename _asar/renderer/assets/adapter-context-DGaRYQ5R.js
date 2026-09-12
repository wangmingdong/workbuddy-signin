import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
//#region ../../packages/agent-ui/src/contexts/adapter-context.tsx
var import_react, AdapterContext, useAdapter;
var init_adapter_context = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	AdapterContext = (0, import_react.createContext)(void 0);
	useAdapter = () => {
		const context = (0, import_react.useContext)(AdapterContext);
		if (!context) throw new Error("useAdapter must be used within AdapterProvider");
		return context;
	};
}));
//#endregion
export { init_adapter_context as n, useAdapter as r, AdapterContext as t };
