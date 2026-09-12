import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { d as init_knowledge_base_panel, g as TencentDocsPanel } from "./my-files-NoDBzgqP.js";
//#region ../../packages/agent-ui/src/pages/tencent-docs.tsx
function TencentDocsPage() {
	const { tencentDocsPanelConnectorId } = useConversations();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentDocsPanel, { connectorId: tencentDocsPanelConnectorId });
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_knowledge_base_panel();
	init_contexts();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { TencentDocsPage };
