import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { ji as ShareTaskIcon, t as init_src, w as useTargetContextMenu } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
//#region ../../packages/agent-ui/src/hooks/use-message-context-menu.tsx
var import_react, import_jsx_runtime, MESSAGE_CONTEXT_MENU_KEY, DISABLE_SHARE_MENU_KEY, EMPTY_MENU, useMessageContextMenu;
var init_use_message_context_menu = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	MESSAGE_CONTEXT_MENU_KEY = "user-message-id";
	DISABLE_SHARE_MENU_KEY = "disable-share-menu";
	EMPTY_MENU = [];
	useMessageContextMenu = (options) => {
		const t = useTranslation();
		const handleShareTask = options?.handleShareTask;
		const { handleContextMenu } = useTargetContextMenu({
			menuItems: (0, import_react.useMemo)(() => {
				if (!handleShareTask) return EMPTY_MENU;
				return [{
					id: "share-task",
					label: t("contextMenu.shareTask"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareTaskIcon, {}),
					trackId: "share_multi_select_enter_moremenu",
					trackName: "空白右键分享",
					action: (targetElement) => {
						handleShareTask(targetElement.getAttribute(`data-user-message-id`) || void 0);
					}
				}];
			}, [t, handleShareTask]),
			targetKey: MESSAGE_CONTEXT_MENU_KEY
		});
		return { handleMessageContextMenu: (0, import_react.useCallback)((event) => {
			if (!handleShareTask) return;
			if (event.target.closest?.(`[data-disable-share-menu]`)) return;
			const selection = window.getSelection();
			if (selection && selection.toString().trim().length > 0) return;
			handleContextMenu(event);
		}, [handleShareTask, handleContextMenu]) };
	};
}));
//#endregion
export { init_use_message_context_menu as n, useMessageContextMenu as r, DISABLE_SHARE_MENU_KEY as t };
