import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { n as init_ima_api_context, r as useOptionalImaApiBridge } from "./ima-api-context-C8-EzcEu.js";
import { n as imaAuthStore, r as init_ima_auth_store } from "./ima-auth-store-Cq8i4JCG.js";
import { i as useModuleHost, n as init_module_host_context } from "./module-host-context-CI9spvhq.js";
//#region ../../packages/agent-ui/src/modules/ima/services.tsx
/**
* IMA 启动时授权状态同步服务。
*
* 挂载后立即将 adapter + bridge 注入 imaAuthStore 并触发 checkAuthStatus，
* 确保 ima-mcp connector 的 everConnected/headers 在应用启动时就被正确设置。
*
* 防重入：init() 内部在 adapter/bridge 变化且 authStatus==='not_connected' 时
* 已自行调用 checkAuthStatus；这里仅在 init 未自行触发时补调一次，避免并发双重调用。
*/
function ImaServices() {
	const host = useModuleHost();
	const bridge = useOptionalImaApiBridge();
	(0, import_react.useEffect)(() => {
		if (!bridge) return;
		const statusBeforeInit = imaAuthStore.getState().authStatus;
		imaAuthStore.getState().init(host.adapter, bridge);
		if (statusBeforeInit !== "not_connected") imaAuthStore.getState().checkAuthStatus().catch(() => {});
	}, [host.adapter, bridge]);
	return null;
}
var import_react;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_ima_api_context();
	init_ima_auth_store();
	init_module_host_context();
}))();
export { ImaServices };
