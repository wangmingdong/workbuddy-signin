import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Yr as toast, ni as ConfirmDialog, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_client } from "./client-BPkZUIji.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { n as parseLoginError, t as init_login_error_parser } from "./login-error-parser-D0A9vxdd.js";
//#region ../../packages/agent-ui/src/components/login/login-error-toast.ts
/**
* 把 `code` 转成"应该怎么提示"的描述。
*
* - `AUTH_CANCELED`：来自用户主动取消，静默处理；
* - 网络 / 超时 / 签名失败类：标准错误 toast + 网络检测入口；
* - `AUTH_LICENSE`：后端业务错误（席位上限/license 过期/试用结束等），原样展示后端文案；
* - 其余具体错误：对应文案；
* - 未识别：兜底 `unknown`。
*/
function resolveLoginErrorAction(parsed) {
	const code = parsed.code;
	if (code === "AUTH_CANCELED") return {
		kind: "silent",
		reason: "canceled"
	};
	switch (code) {
		case "AUTH_OPEN_EXTERNAL_LINK_FAILED": return {
			kind: "toast",
			type: "error",
			messageKey: "login.error.openExternalLinkFailed",
			withNetworkDiag: false
		};
		case "AUTH_NETWORK_ERROR":
		case "AUTH_SIGN_FAILED": return {
			kind: "toast",
			type: "error",
			messageKey: "login.error.network",
			withNetworkDiag: true
		};
		case "AUTH_TIMEOUT": return {
			kind: "toast",
			type: "error",
			messageKey: "login.error.timeout",
			withNetworkDiag: true
		};
		case "AUTH_IP_LIMIT": return {
			kind: "toast",
			type: "error",
			messageKey: "login.error.ipLimit",
			withNetworkDiag: false
		};
		case "AUTH_UNAUTHORIZED": return {
			kind: "toast",
			type: "error",
			messageKey: "login.error.unauthorized",
			withNetworkDiag: false
		};
		case "AUTH_PERMISSION_DENIED": return {
			kind: "dialog",
			titleKey: "login.error.permissionDenied.title",
			messageKey: "login.error.permissionDenied"
		};
		case "AUTH_LICENSE": return {
			kind: "toast-raw",
			type: "error",
			message: parsed.detailMessage,
			fallbackKey: "login.error.unknown"
		};
		default: return {
			kind: "toast",
			type: "error",
			messageKey: "login.error.unknown",
			withNetworkDiag: false
		};
	}
}
var init_login_error_toast = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/login/use-login-error-handler.tsx
function ensureDialogPortal() {
	if (dialogContainer && dialogContainer.parentElement) return {
		container: dialogContainer,
		root: dialogRoot
	};
	dialogContainer = document.createElement("div");
	dialogContainer.dataset.loginErrorDialog = "";
	document.body.appendChild(dialogContainer);
	dialogRoot = (0, import_client.createRoot)(dialogContainer);
	return {
		container: dialogContainer,
		root: dialogRoot
	};
}
function showLoginErrorDialog(title, message, confirmText) {
	const { root } = ensureDialogPortal();
	const handleClose = () => {
		root.render(null);
	};
	root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		visible: true,
		title,
		content: message,
		confirmText,
		onConfirm: handleClose,
		onClose: handleClose,
		showCloseButton: true
	}));
}
function useLoginErrorHandler(adapter) {
	const t = useTranslation();
	const openNetworkDiagnostics = (0, import_react.useCallback)(() => {
		if (!adapter?.openNetworkDiagnostics) return;
		Promise.resolve(adapter.openNetworkDiagnostics()).catch(() => void 0);
	}, [adapter]);
	const i18nRef = (0, import_react.useRef)(t);
	i18nRef.current = t;
	return (0, import_react.useCallback)((error, source = "login") => {
		const parsed = parseLoginError(error);
		console.error(`[${source}] Login failed:`, parsed.rawMessage);
		const action = resolveLoginErrorAction(parsed);
		if (action.kind === "silent") return;
		if (action.kind === "dialog") {
			showLoginErrorDialog(i18nRef.current(action.titleKey), i18nRef.current(action.messageKey), i18nRef.current("login.error.dialogConfirm"));
			return;
		}
		if (action.kind === "toast-raw") {
			const message = action.message || t(action.fallbackKey);
			toast({
				type: action.type,
				message
			});
			return;
		}
		const supportNetworkDiag = typeof adapter?.openNetworkDiagnostics === "function";
		const networkDiagAction = action.withNetworkDiag && supportNetworkDiag ? {
			label: t("login.error.checkNetwork"),
			onClick: openNetworkDiagnostics
		} : void 0;
		toast({
			type: action.type,
			message: t(action.messageKey),
			action: networkDiagAction
		});
	}, [
		adapter,
		t,
		openNetworkDiagnostics
	]);
}
var import_react, import_client, import_jsx_runtime, dialogContainer, dialogRoot;
var init_use_login_error_handler = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_client = /* @__PURE__ */ __toESM(require_client());
	init_useI18n();
	init_login_error_parser();
	init_login_error_toast();
	import_jsx_runtime = require_jsx_runtime();
	dialogContainer = null;
	dialogRoot = null;
}));
//#endregion
export { useLoginErrorHandler as n, init_use_login_error_handler as t };
