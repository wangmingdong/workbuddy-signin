import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
//#region ../../packages/agent-ui/src/modules/common/module-host-context.tsx
/**
* 获取宿主能力（必须在 ModuleHostProvider 内使用）
* @throws 如果在 Provider 外部调用
*/
function useModuleHost() {
	const ctx = (0, import_react.useContext)(ModuleHostContext);
	if (!ctx) throw new Error("[useModuleHost] Must be used within ModuleHostProvider.");
	return ctx;
}
/**
* 安全获取宿主能力（不 throw）
* 用于可能在 Provider 外部调用的场景
*/
function useOptionalModuleHost() {
	return (0, import_react.useContext)(ModuleHostContext);
}
/**
* 按 key 获取 Facade
*
* @example
* const expertFacade = useFacade('expert');
* const docs = useFacade('tencentDocs');
*/
function useFacade(key) {
	return useModuleHost().facades[key];
}
/**
* 模块宿主 Provider
*
* 宿主在顶层包裹一次，所有模块自动获得能力。
*/
function ModuleHostProvider({ adapter, environmentType, accountInfo, session, storage, facades, registry, navigation, reporter, connectorManager = null, requestMcpTokenConfig, children }) {
	const value = (0, import_react.useMemo)(() => ({
		adapter,
		environmentType,
		accountInfo,
		session,
		storage,
		facades,
		registry,
		navigation,
		reporter,
		connectorManager,
		requestMcpTokenConfig,
		invokePicker: (pickerId, options) => registry.invokePicker(pickerId, options)
	}), [
		adapter,
		environmentType,
		accountInfo,
		session,
		storage,
		facades,
		registry,
		navigation,
		reporter,
		connectorManager,
		requestMcpTokenConfig
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleHostContext.Provider, {
		value,
		children
	});
}
var import_react, import_jsx_runtime, ModuleHostContext;
var init_module_host_context = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime = require_jsx_runtime();
	ModuleHostContext = (0, import_react.createContext)(null);
}));
//#endregion
export { useOptionalModuleHost as a, useModuleHost as i, init_module_host_context as n, useFacade as r, ModuleHostProvider as t };
