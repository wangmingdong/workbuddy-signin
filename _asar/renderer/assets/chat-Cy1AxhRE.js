import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Sc as init_app_providers, Tc as useAgentServices } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { p as useOutletContext, r as init_dist } from "./dist-BlOCCi14.js";
import { t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { n as MainContentCore, t as init_main_content_core } from "./main-content-core-GaK6uUTC.js";
import { i as useProjectLocalChatConfig, m as useProjectInputResources } from "./use-project-local-chat-config-B2TosZvo.js";
import { n as init_collab } from "./collab-DUk28X_V.js";
//#region ../../packages/agent-ui/src/pages/chat.tsx
/**
* 主聊天 / welcome 页：承载 `/` 与 `/task/:taskId` 的主内容区。
*
* = MainContentCore + 项目连接器资源接线。其余 shell 页面由 pages/* 各自的 route 页承载，
* 不再经这里分发（历史上叫 MainRouteOutlet / LegacyMainRoute，已正名并入本页）。
*/
function ChatPage() {
	const props = useOutletContext();
	const agentServices = useAgentServices();
	const conversationsContext = useConversations();
	const activeConversation = props?.currentConversation ?? conversationsContext.currentConversation;
	const currentProjectId = activeConversation?.projectId || activeConversation?.session?.projectId;
	const connectorFacade = agentServices?.connector;
	const listProjectConnectors = (0, import_react.useCallback)((projectId) => connectorFacade.listProjectConnectors(projectId), [connectorFacade]);
	const { projectPublicConnectorConfigs } = useProjectInputResources({
		projectId: currentProjectId,
		listProjectConnectors: connectorFacade ? listProjectConnectors : void 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainContentCore, {
		...props,
		projectPublicConnectorConfigs,
		useProjectLocalChatConfig
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_main_content_core();
	init_contexts();
	init_collab();
	init_app_providers();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ChatPage };
