import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/login/login-error-parser.ts
function parseLoginError(error) {
	const rawMessage = extractErrorMessage(error);
	const matched = LOGIN_ERROR_CODES.find((code) => rawMessage.startsWith(`${code}:`));
	if (matched) return {
		code: matched,
		rawMessage,
		detailMessage: rawMessage.slice(matched.length + 1).trimStart()
	};
	return {
		code: "AUTH_UNKNOWN",
		rawMessage,
		detailMessage: rawMessage
	};
}
/** 从各种 error 形态中安全提取 message 字符串 */
function extractErrorMessage(error) {
	if (error instanceof Error) return error.message;
	if (error && typeof error === "object" && "message" in error) {
		const msg = error.message;
		if (typeof msg === "string") return msg;
	}
	return String(error ?? "");
}
var LOGIN_ERROR_CODES;
var init_login_error_parser = __esmMin((() => {
	LOGIN_ERROR_CODES = [
		"AUTH_OPEN_EXTERNAL_LINK_FAILED",
		"AUTH_NETWORK_ERROR",
		"AUTH_TIMEOUT",
		"AUTH_CANCELED",
		"AUTH_IP_LIMIT",
		"AUTH_UNAUTHORIZED",
		"AUTH_SIGN_FAILED",
		"AUTH_PERMISSION_DENIED",
		"AUTH_LICENSE",
		"AUTH_UNKNOWN"
	];
}));
//#endregion
export { parseLoginError as n, init_login_error_parser as t };
