import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { Gn as useMenuMerge, Hn as init_iframe_menu$1, Un as useIframeMenusFetch, Wn as IframeMenuHost, a as WorkBuddyTopBar, o as init_workbuddy_topbar } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { D as useAccountService, E as init_auth_context, t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
//#region ../../packages/agent-ui/src/pages/iframe-menu.tsx
function IframeMenuPage() {
	const { account } = useAccountService();
	useIframeMenusFetch(account ? account.enterpriseId ?? "" : void 0);
	useMenuMerge();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			background: "#fff"
		},
		children: [(useConversations()?.sidebarCollapsed ?? false) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkBuddyTopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				flex: 1,
				minHeight: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IframeMenuHost, {})
		})]
	});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_workbuddy_topbar();
	init_contexts();
	init_auth_context();
	init_iframe_menu$1();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { IframeMenuPage };
