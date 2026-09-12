import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as AgentMailPage$1, t as init_agent_mail$1 } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
//#region ../../packages/agent-ui/src/pages/agent-mail.tsx
function AgentMailPage() {
	const { setShowDetailPanel } = useConversations();
	(0, import_react.useEffect)(() => {
		setShowDetailPanel?.(false);
	}, [setShowDetailPanel]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMailPage$1, { visible: true });
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_agent_mail$1();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { AgentMailPage };
