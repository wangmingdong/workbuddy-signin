import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as process$1, t as init_dist } from "./dist-CSHw4oQX.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_zustand } from "./zustand-BGHu9tpa.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
import { E as CheckIcon, t as init_esm } from "./esm-leoUPiBo.js";
//#region ../../packages/ardot-infra/src/service/ardot-auth.service.ts
var TAG, CONNECTOR_NAME, CONNECT_CODE, ArdotAuthService;
var init_ardot_auth_service = __esmMin((() => {
	TAG = "[ArdotAuthService]";
	CONNECTOR_NAME = "ardot";
	CONNECT_CODE = "shadow_account_grant";
	ArdotAuthService = class {
		constructor(adapter) {
			this.adapter = adapter;
		}
		connectorOauthStatus() {
			return this.invokeWithName("connectorOauthStatus");
		}
		connectorOauthAccessToken() {
			return this.invokeWithName("connectorOauthAccessToken");
		}
		connectorOauthRevoke() {
			return this.invokeWithName("connectorOauthRevoke");
		}
		connectorOauthConnect() {
			return this.resolve("connectorOauthConnect").call(this.adapter, CONNECTOR_NAME, { code: CONNECT_CODE });
		}
		invokeWithName(method) {
			return this.resolve(method).call(this.adapter, CONNECTOR_NAME);
		}
		resolve(method) {
			if (!this.adapter) throw new Error(`${TAG} adapter is not provided`);
			const fn = this.adapter[method];
			if (typeof fn !== "function") throw new Error(`${TAG} adapter.${String(method)} is not available`);
			return fn;
		}
	};
}));
//#endregion
//#region ../../packages/ardot-infra/src/service/index.ts
var init_service = __esmMin((() => {
	init_ardot_auth_service();
}));
//#endregion
//#region ../../packages/ardot-infra/src/state/ardot-auth.store.ts
var import_zustand, DEFAULT_SKEW_MS, _deferredCancelCleanup, _cancelPrevented, ardotAuthStore, useArdotAuthStore;
var init_ardot_auth_store = __esmMin((() => {
	import_zustand = require_zustand();
	init_vanilla();
	DEFAULT_SKEW_MS = 600 * 1e3;
	_cancelPrevented = false;
	ardotAuthStore = createStore((set, get) => ({
		accessToken: void 0,
		expireAt: void 0,
		visible: false,
		setToken: ({ accessToken, expireAt }) => {
			set({
				accessToken,
				expireAt
			});
		},
		clearToken: () => {
			set({
				accessToken: void 0,
				expireAt: void 0
			});
		},
		isValid: (skewMs = DEFAULT_SKEW_MS) => {
			const { accessToken, expireAt } = get();
			if (!accessToken) return false;
			if (expireAt === void 0) return true;
			return Date.now() + skewMs < expireAt;
		},
		close: () => {
			_cancelPrevented = _deferredCancelCleanup !== void 0;
			if (_deferredCancelCleanup !== void 0) {
				try {
					_deferredCancelCleanup();
				} catch {}
				_deferredCancelCleanup = void 0;
			}
			set({ visible: false });
		},
		handleAuthResult: ({ status }) => {
			if (status === "unbound") set({ visible: true });
		},
		setDeferredCancelCleanup: (cleanup) => {
			if (_deferredCancelCleanup !== void 0) try {
				_deferredCancelCleanup();
			} catch {}
			_deferredCancelCleanup = cleanup;
			_cancelPrevented = false;
		},
		markCancelFired: () => {
			_deferredCancelCleanup = void 0;
		},
		wasCancelPrevented: () => _cancelPrevented
	}));
	useArdotAuthStore = (selector) => (0, import_zustand.useStore)(ardotAuthStore, selector);
}));
//#endregion
//#region ../../packages/ardot-infra/src/state/index.ts
var init_state = __esmMin((() => {
	init_ardot_auth_store();
}));
//#endregion
//#region ../../packages/ardot-infra/src/hooks/use-ardot-auth.ts
function useArdotAuth(adapter) {
	const service = (0, import_react$2.useMemo)(() => new ArdotAuthService(adapter), [adapter]);
	const checkAuth = (0, import_react$2.useCallback)(async () => {
		const status = toStatus(unwrap(await service.connectorOauthStatus(), "checkAuth"));
		if (status.status === "connected" && status.accessToken) cacheToken({
			accessToken: status.accessToken,
			expireAt: status.expireAt
		});
		return status;
	}, [service]);
	const refreshToken = (0, import_react$2.useCallback)(async () => {
		const token = toAccessToken(unwrap(await service.connectorOauthAccessToken(), "refreshToken"));
		cacheToken(token);
		return token;
	}, [service]);
	const getToken = (0, import_react$2.useCallback)(async () => {
		const state = ardotAuthStore.getState();
		if (state.isValid() && state.accessToken) return {
			accessToken: state.accessToken,
			expireAt: state.expireAt
		};
		return refreshToken();
	}, [refreshToken]);
	const authConnector = (0, import_react$2.useCallback)(async () => {
		const token = toAccessToken(unwrap(await service.connectorOauthConnect(), "authConnector"));
		cacheToken(token);
		return token;
	}, [service]);
	const authRevoke = (0, import_react$2.useCallback)(async () => {
		const data = unwrap(await service.connectorOauthRevoke(), "authRevoke");
		ardotAuthStore.getState().clearToken();
		return toRevokeResult(data);
	}, [service]);
	return (0, import_react$2.useMemo)(() => ({
		checkAuth,
		getToken,
		refreshToken,
		authConnector,
		authRevoke
	}), [
		checkAuth,
		getToken,
		refreshToken,
		authConnector,
		authRevoke
	]);
}
function unwrap(resp, verb) {
	if (resp.code !== 0 || resp.data === void 0 || resp.data === null) throw new ArdotAuthError(verb, resp);
	return resp.data;
}
function toStatus(data) {
	return {
		status: data.status,
		accessToken: data.access_token,
		connectedAt: secondsToMs(data.connected_at),
		expireAt: secondsToMs(data.expire_at),
		expiresIn: data.expires_in
	};
}
function toAccessToken(data) {
	return {
		accessToken: data.access_token,
		expireAt: secondsToMs(data.expire_at)
	};
}
function toRevokeResult(data) {
	return {
		status: data.status,
		revokedCount: data.revoked_count
	};
}
function secondsToMs(seconds) {
	if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds <= 0) return;
	return seconds * 1e3;
}
function cacheToken(token) {
	ardotAuthStore.getState().setToken({
		accessToken: token.accessToken,
		expireAt: token.expireAt
	});
}
var import_react$2, ArdotAuthError;
var init_use_ardot_auth = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_service();
	init_state();
	ArdotAuthError = class extends Error {
		constructor(verb, resp) {
			const parts = [`[useArdotAuth] ${verb} failed`, `code=${resp.code}`];
			if (resp.msg) parts.push(`msg=${resp.msg}`);
			if (resp.requestId) parts.push(`requestId=${resp.requestId}`);
			super(parts.join(" "));
			this.name = "ArdotAuthError";
			this.code = resp.code;
			this.msg = resp.msg;
			this.requestId = resp.requestId;
		}
	};
}));
//#endregion
//#region ../../packages/ardot-infra/src/hooks/index.ts
var init_hooks = __esmMin((() => {
	init_use_ardot_auth();
}));
//#endregion
//#region ../../packages/ardot-infra/src/types/index.ts
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../packages/ardot-infra/src/assets/done.svg
var done_default;
var init_done = __esmMin((() => {
	done_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='16'%3e%3cpath%20fill='%231E9948'%20transform='matrix(1%200%200%201%201%201)'%20d='M7%201.0769C3.7288%201.0769%201.0769%203.7288%201.0769%207C1.0769%2010.2712%203.7288%2012.9231%207%2012.9231C10.2712%2012.9231%2012.9231%2010.2712%2012.9231%207C12.9231%203.7288%2010.2712%201.0769%207%201.0769ZM0%207C0%203.134%203.134%200%207%200C10.866%200%2014%203.134%2014%207C14%2010.866%2010.866%2014%207%2014C3.134%2014%200%2010.866%200%207Z'%20fill-rule='evenodd'/%3e%3cpath%20fill='%231E9948'%20transform='matrix(1%200%200%201%201%201)'%20d='M10.307%204.3746C10.5349%204.5657%2010.5648%204.9053%2010.3737%205.1332L6.6643%209.5574C6.5673%209.6731%206.4261%209.7428%206.2752%209.7494C6.1244%209.756%205.9777%209.699%205.8709%209.5922L3.6581%207.3794C3.4478%207.1692%203.4478%206.8282%203.6581%206.618C3.8684%206.4077%204.2093%206.4077%204.4196%206.6179L6.2167%208.415L9.5485%204.4413C9.7395%204.2134%2010.0792%204.1836%2010.307%204.3746Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/ardot-infra/src/assets/logo-ardot.svg
var logo_ardot_default;
var init_logo_ardot = __esmMin((() => {
	logo_ardot_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='64'%20height='64'%3e%3cpath%20fill='%23191919'%20transform='matrix(1%200%200%201%207.62939e-05%200)'%20d='M0%2026C0%2016.8892%200%2012.3337%201.7684%208.8703C3.3262%205.8196%205.8196%203.3262%208.8703%201.7684C12.3337%200%2016.8892%200%2026%200L38%200C47.1108%200%2051.6663%200%2055.1297%201.7684C58.1804%203.3262%2060.6738%205.8196%2062.2316%208.8703C64%2012.3337%2064%2016.8892%2064%2026L64%2038C64%2047.1108%2064%2051.6663%2062.2316%2055.1297C60.6738%2058.1804%2058.1804%2060.6738%2055.1297%2062.2316C51.6662%2064%2047.1108%2064%2038%2064L26%2064C16.8892%2064%2012.3338%2064%208.8703%2062.2316C5.8196%2060.6738%203.3262%2058.1804%201.7684%2055.1297C0%2051.6663%200%2047.1108%200%2038L0%2026Z'/%3e%3cpath%20fill='%23FFF'%20transform='matrix(1%200%200%201%2010.9957%2011.5157)'%20d='M21.2598%200.0001C25.8189%200.0147%2030.3131%201.7306%2032.9192%205.2957C37.4447%2011.4867%2035.2539%2019.2138%2030.7747%2023.7857L26.2349%2019.3382C29.2551%2016.2554%2029.9348%2011.9824%2027.7883%209.046C26.6946%207.55%2024.3892%206.3654%2021.2393%206.3553C18.1618%206.3455%2014.6008%207.4888%2011.512%2010.1998C6.4901%2014.6074%205.1432%2021.5875%207.4451%2026.8468C10.2932%2033.354%2017.0002%2035.3106%2022.5549%2034.0479C28.9114%2032.603%2033.4619%2027.1408%2036.3457%2022.6646L42.3687%2023.9552L42.3687%2024.1153C42.3687%2028.7112%2043.0199%2034.7717%2043.9553%2039.0582L37.4688%2039.0582C37.0932%2037.1052%2036.7733%2034.9325%2036.53%2032.7284C33.3814%2035.9997%2029.2271%2039.0485%2023.9634%2040.245C16.2598%2041.996%206.004%2039.4044%201.623%2029.3949C-1.8162%2021.5369%200.2692%2011.6113%207.3196%205.4232C11.5698%201.6928%2016.628%20-0.0148%2021.2598%200.0001Z'/%3e%3crect%20fill='%2320E316'%20transform='matrix(0.713557%200.700598%20-0.700598%200.713557%2034.9532%2032.9998)'%20width='6.3553'%20height='6.3553'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/ardot-infra/src/assets/logo-workbuddy.svg
var logo_workbuddy_default;
var init_logo_workbuddy = __esmMin((() => {
	logo_workbuddy_default = "" + new URL("logo-workbuddy-BUNGQxi-.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/ardot-infra/src/ui/auth-i18n.ts
function normalizeLocale(locale) {
	if (!locale) return DEFAULT_FALLBACK_LOCALE;
	const lower = locale.toLowerCase();
	if (lower.startsWith("zh")) return "zh-cn";
	if (lower.startsWith("en")) return "en";
	return DEFAULT_FALLBACK_LOCALE;
}
function detectBrowserLocale() {
	if (typeof navigator === "undefined") return DEFAULT_FALLBACK_LOCALE;
	return normalizeLocale(navigator.language);
}
function formatMessage(template, params) {
	if (!params) return template;
	return template.replace(/\{(\w+)\}/g, (match, key) => params[key] !== void 0 ? String(params[key]) : match);
}
function createFallbackTranslate(options = {}) {
	const dict = BUILTIN_MESSAGES[options.locale ? normalizeLocale(options.locale) : detectBrowserLocale()] ?? BUILTIN_MESSAGES[DEFAULT_FALLBACK_LOCALE];
	const fallbackDict = BUILTIN_MESSAGES[DEFAULT_FALLBACK_LOCALE];
	return (key, params) => {
		return formatMessage(dict[key] ?? fallbackDict[key] ?? key, params);
	};
}
/**
* 包装调用方注入的 `translate`：若返回值等于 key 本身（说明调用方未定义），
* 则回退到内置字典，保证文案永不暴露 raw key。
*/
function withFallback(translate, fallbackLocale) {
	const fallback = createFallbackTranslate({ locale: fallbackLocale });
	if (!translate) return fallback;
	return (key, params) => {
		const value = translate(key, params);
		if (value === key || value === void 0 || value === null) return fallback(key, params);
		return value;
	};
}
var ARDOT_AUTH_I18N_KEYS, BUILTIN_MESSAGES, DEFAULT_FALLBACK_LOCALE;
var init_auth_i18n = __esmMin((() => {
	ARDOT_AUTH_I18N_KEYS = {
		title: "ardotAuth.title",
		description: "ardotAuth.description",
		tipRegister: "ardotAuth.tip.register",
		tipFiles: "ardotAuth.tip.files",
		tipRefs: "ardotAuth.tip.refs",
		tipShareInfo: "ardotAuth.tip.shareInfo",
		btnCancel: "ardotAuth.btn.cancel",
		btnAuthorize: "ardotAuth.btn.authorize",
		closeAriaLabel: "ardotAuth.aria.close",
		dialogAriaLabel: "ardotAuth.aria.dialog",
		defaultTargetAppName: "ardotAuth.defaultTargetAppName",
		agreementPrefix: "ardotAuth.agreement.prefix",
		agreementPolicy: "ardotAuth.agreement.policy",
		agreementPrivacy: "ardotAuth.agreement.privacy",
		agreementAnd: "ardotAuth.agreement.and",
		agreementCheckboxAriaLabel: "ardotAuth.agreement.checkboxAriaLabel"
	};
	BUILTIN_MESSAGES = {
		"zh-cn": {
			[ARDOT_AUTH_I18N_KEYS.title]: "授权 WorkBuddy 访问 {appName}",
			[ARDOT_AUTH_I18N_KEYS.description]: "为创建和编辑云端画布，WorkBuddy 需要连接你的 {appName} 账户",
			[ARDOT_AUTH_I18N_KEYS.tipRegister]: "用 WorkBuddy 账号注册 {appName}，账号信息一致",
			[ARDOT_AUTH_I18N_KEYS.tipFiles]: "在你的文件中创建 / 读取 / 更新画布文件",
			[ARDOT_AUTH_I18N_KEYS.tipRefs]: "读取你引用的文件，设计系统与组件库",
			[ARDOT_AUTH_I18N_KEYS.tipShareInfo]: "允许 {appName} 从 WorkBuddy 获取信息",
			[ARDOT_AUTH_I18N_KEYS.btnCancel]: "取消",
			[ARDOT_AUTH_I18N_KEYS.btnAuthorize]: "注册并授权",
			[ARDOT_AUTH_I18N_KEYS.closeAriaLabel]: "关闭",
			[ARDOT_AUTH_I18N_KEYS.dialogAriaLabel]: "授权 WorkBuddy 访问 {appName}",
			[ARDOT_AUTH_I18N_KEYS.defaultTargetAppName]: "腾讯设计 Ardot",
			[ARDOT_AUTH_I18N_KEYS.agreementPrefix]: "我已阅读并同意",
			[ARDOT_AUTH_I18N_KEYS.agreementPolicy]: "{appName}用户服务协议",
			[ARDOT_AUTH_I18N_KEYS.agreementPrivacy]: "{appName}隐私政策",
			[ARDOT_AUTH_I18N_KEYS.agreementAnd]: "和",
			[ARDOT_AUTH_I18N_KEYS.agreementCheckboxAriaLabel]: "同意{appName}用户服务协议和隐私政策"
		},
		en: {
			[ARDOT_AUTH_I18N_KEYS.title]: "Authorize WorkBuddy to access {appName}",
			[ARDOT_AUTH_I18N_KEYS.description]: "To create and edit cloud canvases, WorkBuddy needs to connect to your {appName} account.",
			[ARDOT_AUTH_I18N_KEYS.tipRegister]: "Sign up for {appName} with your WorkBuddy account — same identity",
			[ARDOT_AUTH_I18N_KEYS.tipFiles]: "Create, read, and update canvas files in your file list",
			[ARDOT_AUTH_I18N_KEYS.tipRefs]: "Read your referenced files, design systems, and component libraries",
			[ARDOT_AUTH_I18N_KEYS.tipShareInfo]: "Allow {appName} to fetch information from WorkBuddy",
			[ARDOT_AUTH_I18N_KEYS.btnCancel]: "Cancel",
			[ARDOT_AUTH_I18N_KEYS.btnAuthorize]: "Sign up & Authorize",
			[ARDOT_AUTH_I18N_KEYS.closeAriaLabel]: "Close",
			[ARDOT_AUTH_I18N_KEYS.dialogAriaLabel]: "Authorize WorkBuddy to access {appName}",
			[ARDOT_AUTH_I18N_KEYS.defaultTargetAppName]: "Tencent Design Ardot",
			[ARDOT_AUTH_I18N_KEYS.agreementPrefix]: "I have read and agree to the",
			[ARDOT_AUTH_I18N_KEYS.agreementPolicy]: "{appName} Terms of Service",
			[ARDOT_AUTH_I18N_KEYS.agreementPrivacy]: "Privacy Policy",
			[ARDOT_AUTH_I18N_KEYS.agreementAnd]: "and",
			[ARDOT_AUTH_I18N_KEYS.agreementCheckboxAriaLabel]: "Agree to the {appName} Terms of Service and Privacy Policy"
		}
	};
	DEFAULT_FALLBACK_LOCALE = "zh-cn";
}));
//#endregion
//#region ../../packages/ardot-infra/src/ui/auth-content.tsx
function getDefaultTips(t, appName) {
	return [
		{
			key: "register",
			label: t(ARDOT_AUTH_I18N_KEYS.tipRegister, { appName })
		},
		{
			key: "files",
			label: t(ARDOT_AUTH_I18N_KEYS.tipFiles)
		},
		{
			key: "refs",
			label: t(ARDOT_AUTH_I18N_KEYS.tipRefs)
		},
		{
			key: "shareInfo",
			label: t(ARDOT_AUTH_I18N_KEYS.tipShareInfo, { appName })
		}
	];
}
var import_react$1, import_jsx_runtime$1, ARDOT_DEFAULT_POLICY_URL, ARDOT_DEFAULT_PRIVACY_URL, ArdotAuthContent, AuthLogos, AuthTitleSection, AuthTips, TipCheckIcon, AuthAgreement, AuthFooter;
var init_auth_content = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_esm();
	init_done();
	init_logo_ardot();
	init_logo_workbuddy();
	init_auth_i18n();
	import_jsx_runtime$1 = require_jsx_runtime();
	ARDOT_DEFAULT_POLICY_URL = "https://ardot.tencent.com/drive/policy";
	ARDOT_DEFAULT_PRIVACY_URL = "https://ardot.tencent.com/drive/privacy";
	ArdotAuthContent = ({ targetAppName, tips, translate, locale, dotsAnimated = true, policyUrl = ARDOT_DEFAULT_POLICY_URL, privacyUrl = ARDOT_DEFAULT_PRIVACY_URL, onAuthorize, onCancel }) => {
		const t = withFallback(translate, locale);
		const appName = targetAppName ?? t(ARDOT_AUTH_I18N_KEYS.defaultTargetAppName);
		const resolvedTips = tips ?? getDefaultTips(t, appName);
		const [isAgreed, setIsAgreed] = import_react$1.useState(false);
		const handleToggleAgreed = import_react$1.useCallback(() => {
			setIsAgreed((v) => !v);
		}, []);
		const handleAuthorize = import_react$1.useCallback(() => {
			if (!isAgreed) return;
			onAuthorize?.();
		}, [isAgreed, onAuthorize]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "ardot-auth-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AuthLogos, {
					targetAppName: appName,
					dotsAnimated
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AuthTitleSection, {
					t,
					targetAppName: appName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AuthTips, { tips: resolvedTips }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AuthFooter, {
					t,
					onCancel,
					onAuthorize: handleAuthorize,
					authorizeDisabled: !isAgreed
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AuthAgreement, {
					t,
					appName,
					checked: isAgreed,
					onToggle: handleToggleAgreed,
					policyUrl,
					privacyUrl
				})
			]
		});
	};
	AuthLogos = ({ targetAppName, dotsAnimated }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "ardot-auth-logos",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				className: "ardot-auth-logo ardot-auth-logo--workbuddy",
				src: logo_workbuddy_default,
				alt: "WorkBuddy",
				width: 64,
				height: 64,
				draggable: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: `ardot-auth-dots${dotsAnimated ? " ardot-auth-dots--loading" : ""}`,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				className: "ardot-auth-logo ardot-auth-logo--ardot",
				src: logo_ardot_default,
				alt: targetAppName,
				width: 64,
				height: 64,
				draggable: false
			})
		]
	});
	AuthTitleSection = ({ t, targetAppName }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "ardot-auth-title-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
			className: "ardot-auth-title",
			children: t(ARDOT_AUTH_I18N_KEYS.title, { appName: targetAppName })
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
			className: "ardot-auth-description",
			children: t(ARDOT_AUTH_I18N_KEYS.description, { appName: targetAppName })
		})]
	});
	AuthTips = ({ tips }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", {
		className: "ardot-auth-tips",
		children: tips.map((tip, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("li", {
			className: "ardot-auth-tip",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TipCheckIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: tip.label })]
		}, tip.key ?? index))
	});
	TipCheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
		className: "ardot-auth-tip-check",
		src: done_default,
		alt: "",
		width: 16,
		height: 16,
		"aria-hidden": "true",
		draggable: false
	});
	AuthAgreement = ({ t, appName, checked, onToggle, policyUrl, privacyUrl }) => {
		const handleKeyDown = (event) => {
			if (event.key === " " || event.key === "Enter") {
				event.preventDefault();
				onToggle();
			}
		};
		const stopPropagation = (event) => {
			event.stopPropagation();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "ardot-auth-agreement",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				role: "checkbox",
				"aria-checked": checked,
				"aria-label": t(ARDOT_AUTH_I18N_KEYS.agreementCheckboxAriaLabel, { appName }),
				"data-state": checked ? "checked" : "unchecked",
				className: "ardot-auth-agreement-checkbox",
				onClick: onToggle,
				onKeyDown: handleKeyDown,
				children: checked ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CheckIcon, {
					className: "ardot-auth-agreement-checkmark",
					size: "12px"
				}) : null
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "ardot-auth-agreement-text",
				onClick: onToggle,
				children: [
					t(ARDOT_AUTH_I18N_KEYS.agreementPrefix),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: " " }),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
						href: policyUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "ardot-auth-agreement-link",
						onClick: stopPropagation,
						children: t(ARDOT_AUTH_I18N_KEYS.agreementPolicy, { appName })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: [
						" ",
						t(ARDOT_AUTH_I18N_KEYS.agreementAnd),
						" "
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
						href: privacyUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "ardot-auth-agreement-link",
						onClick: stopPropagation,
						children: t(ARDOT_AUTH_I18N_KEYS.agreementPrivacy, { appName })
					})
				]
			})]
		});
	};
	AuthFooter = ({ t, onCancel, onAuthorize, authorizeDisabled = false }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "ardot-auth-footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: "ardot-auth-btn ardot-auth-btn--cancel",
			onClick: onCancel,
			children: t(ARDOT_AUTH_I18N_KEYS.btnCancel)
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: "ardot-auth-btn ardot-auth-btn--primary",
			onClick: onAuthorize,
			disabled: authorizeDisabled,
			"aria-disabled": authorizeDisabled || void 0,
			children: t(ARDOT_AUTH_I18N_KEYS.btnAuthorize)
		})]
	});
}));
//#endregion
//#region ../../packages/ardot-infra/src/ui/auth-modal.styles.ts
/** 幂等注入样式到 document.head（通过固定 id 去重） */
function ensureArdotAuthStyles() {
	if (typeof document === "undefined") return;
	if (document.getElementById(STYLE_ELEMENT_ID)) return;
	const style = document.createElement("style");
	style.id = STYLE_ELEMENT_ID;
	style.textContent = ARDOT_AUTH_MODAL_STYLE;
	document.head.appendChild(style);
}
var ARDOT_AUTH_MODAL_STYLE, STYLE_ELEMENT_ID;
var init_auth_modal_styles = __esmMin((() => {
	ARDOT_AUTH_MODAL_STYLE = `
/* ========= 遮罩层 ========= */
.ardot-auth-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--cb-modal-overlay-bg, rgba(0, 0, 0, 0.6));
    animation: ardot-auth-fade-in 0.16s ease-out;
}

/* ========= 外层弹窗 ========= */
.ardot-auth-modal {
    position: relative;
    box-sizing: border-box;
    width: 720px;
    min-height: 480px;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);
    padding: 80px 100px;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Microsoft YaHei', sans-serif;
    color: rgba(0, 0, 0, 0.9);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    animation: ardot-auth-scale-in 0.18s ease-out;
    overflow: hidden; /* 创建 BFC，防止子元素 margin 溢出 */
}

/* ========= 关闭按钮 ========= */
.ardot-auth-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #999999;
    transition: background-color 0.15s ease, color 0.15s ease;
}
.ardot-auth-close:hover {
    background: rgba(0, 0, 0, 0.04);
    color: #1d1d1f;
}
.ardot-auth-close > svg {
    display: block;
}

/* ========= 内容区 ========= */
.ardot-auth-content {
    box-sizing: border-box;
    width: 500px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
}

/* ========= Logo 行 ========= */
.ardot-auth-logos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    height: 64px;
}

.ardot-auth-logo {
    width: 64px;
    height: 64px;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
}

.ardot-auth-logo--workbuddy {
    border-radius: 13.81px;
    box-shadow: 0 4px 12px rgba(1, 200, 134, 0.25);
}

.ardot-auth-logo--ardot {
    border-radius: 16.25px;
}

/* 连接三圆点（默认静态；加 --loading 变波浪呼吸，暗示"连接中"） */
.ardot-auth-dots {
    display: flex;
    align-items: center;
    gap: 4px;
}
.ardot-auth-dots > span {
    width: 9.59px;
    height: 9.59px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.08);
    will-change: opacity, transform;
}
.ardot-auth-dots > span:nth-child(2) {
    background: rgba(0, 0, 0, 0.2);
}
.ardot-auth-dots > span:nth-child(3) {
    background: rgba(26, 26, 26, 0.9);
}

.ardot-auth-dots--loading > span {
    animation: ardot-auth-dot-pulse 1.2s ease-in-out infinite;
}
.ardot-auth-dots--loading > span:nth-child(1) {
    animation-delay: 0s;
}
.ardot-auth-dots--loading > span:nth-child(2) {
    animation-delay: 0.15s;
}
.ardot-auth-dots--loading > span:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes ardot-auth-dot-pulse {
    0%,
    80%,
    100% {
        opacity: 0.35;
        transform: translateY(0) scale(0.9);
    }
    40% {
        opacity: 1;
        transform: translateY(-2px) scale(1.1);
        background: rgba(26, 26, 26, 0.9);
    }
}

/* 尊重系统减弱动效偏好 */
@media (prefers-reduced-motion: reduce) {
    .ardot-auth-dots--loading > span {
        animation: none;
        opacity: 1;
    }
}

/* ========= 标题区 ========= */
.ardot-auth-title-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.ardot-auth-title {
    margin: 0;
    padding: 0;
    font-size: 20px;
    line-height: 26px;
    font-weight: 600;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
}

.ardot-auth-description {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
}

/* ========= 提示卡片 ========= */
.ardot-auth-tips {
    list-style: none;
    margin: 0;
    padding: 16px 20px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.ardot-auth-tip {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-height: 20px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
}

.ardot-auth-tip-check {
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    margin-top: 2px; /* 对齐首行文字基线 */
    display: block;
}

/* ========= 协议同意区 =========
 * 勾选框：自绘 16×16 方块（shadcn/ui 规范），勾图标使用 tdesign-icons-react 的
 * CheckIcon（fill="currentColor"），通过容器 color 驱动为白色。
 */
.ardot-auth-agreement {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
}

.ardot-auth-agreement-checkbox {
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    margin: 2px 0 0; /* 对齐首行文字基线 */
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.9);
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    cursor: pointer;
    line-height: 0;
    appearance: none;
    -webkit-appearance: none;
    transition: background-color 0.15s ease, border-color 0.15s ease;
}
.ardot-auth-agreement-checkbox:hover {
    border-color: rgba(0, 0, 0, 0.45);
}
.ardot-auth-agreement-checkbox[data-state='checked'] {
    background: rgba(0, 0, 0, 0.9);
    border-color: transparent;
    color: #ffffff;
}
.ardot-auth-agreement-checkbox:focus-visible {
    outline: 2px solid rgba(0, 82, 217, 0.6);
    outline-offset: 2px;
}

/* tdesign-icons-react CheckIcon：继承容器 color（白色）作为 fill */
.ardot-auth-agreement-checkmark {
    display: block;
    pointer-events: none;
}

.ardot-auth-agreement-text {
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    user-select: none;
}

.ardot-auth-agreement-link {
    color: #0052d9;
    text-decoration: none;
    cursor: pointer;
}
.ardot-auth-agreement-link:hover {
    text-decoration: underline;
}

/* ========= 按钮区 ========= */
.ardot-auth-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.ardot-auth-btn {
    flex: 1;
    height: 36px;
    padding: 0 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
    transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.ardot-auth-btn:active {
    opacity: 0.85;
}

.ardot-auth-btn--cancel {
    background: rgba(0, 0, 0, 0.04);
    color: rgba(0, 0, 0, 0.9);
}
.ardot-auth-btn--cancel:hover {
    background: rgba(0, 0, 0, 0.08);
}

.ardot-auth-btn--primary {
    background: rgba(0, 0, 0, 0.9);
    color: #ffffff;
}
.ardot-auth-btn--primary:hover {
    background: rgba(0, 0, 0, 0.75);
}
.ardot-auth-btn--primary:disabled,
.ardot-auth-btn--primary[aria-disabled='true'] {
    background: rgba(0, 0, 0, 0.25);
    color: #ffffff;
    cursor: not-allowed;
    opacity: 1;
}
.ardot-auth-btn--primary:disabled:hover,
.ardot-auth-btn--primary[aria-disabled='true']:hover {
    background: rgba(0, 0, 0, 0.25);
}

/* ========= 动画 ========= */
@keyframes ardot-auth-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@keyframes ardot-auth-scale-in {
    from {
        opacity: 0;
        transform: scale(0.96);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* ========= 暗色主题适配(WB body.dark) =========
 * 仅覆盖中性色;品牌色(绿色对勾 done.svg / logo / 协议链接蓝 #0052D9)保持不变。
 * 颜色映射沿用同套规则:卡片 #1E1E1E、提示卡片 6% 白、主按钮反相为白底黑字。
 */
body.dark .ardot-auth-modal {
    background: #1E1E1E;
    color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

body.dark .ardot-auth-close {
    color: rgba(255, 255, 255, 0.5);
}
body.dark .ardot-auth-close:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
}

/* 三圆点反相 */
body.dark .ardot-auth-dots > span {
    background: rgba(255, 255, 255, 0.12);
}
body.dark .ardot-auth-dots > span:nth-child(2) {
    background: rgba(255, 255, 255, 0.3);
}
body.dark .ardot-auth-dots > span:nth-child(3) {
    background: rgba(255, 255, 255, 0.9);
}
body.dark .ardot-auth-dots--loading > span {
    /* 用 CSS var 覆盖关键帧里的颜色;此处保留动画,但 40% 帧色由 @keyframes 写死,
     * 暗色下也观感正常(高亮态深色,跟暗背景对比足够),不再单独 override。 */
}

body.dark .ardot-auth-title {
    color: rgba(255, 255, 255, 0.9);
}
body.dark .ardot-auth-description {
    color: rgba(255, 255, 255, 0.65);
}

/* 提示卡片:比 modal 浅一档,形成层次 */
body.dark .ardot-auth-tips {
    background: rgba(255, 255, 255, 0.06);
}
body.dark .ardot-auth-tip {
    color: rgba(255, 255, 255, 0.9);
}

/* 协议同意区 */
body.dark .ardot-auth-agreement-checkbox {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.25);
}
body.dark .ardot-auth-agreement-checkbox:hover {
    border-color: rgba(255, 255, 255, 0.45);
}
body.dark .ardot-auth-agreement-checkbox[data-state='checked'] {
    background: rgba(255, 255, 255, 0.9);
    border-color: transparent;
    color: #1E1E1E;
}
body.dark .ardot-auth-agreement-text {
    color: rgba(255, 255, 255, 0.65);
}

/* 按钮:取消按钮浅白底,主按钮白底黑字 */
body.dark .ardot-auth-btn--cancel {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.9);
}
body.dark .ardot-auth-btn--cancel:hover {
    background: rgba(255, 255, 255, 0.16);
}
body.dark .ardot-auth-btn--primary {
    background: rgba(255, 255, 255, 0.9);
    color: #1E1E1E;
}
body.dark .ardot-auth-btn--primary:hover {
    background: #ffffff;
}
body.dark .ardot-auth-btn--primary:disabled,
body.dark .ardot-auth-btn--primary[aria-disabled='true'] {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(30, 30, 30, 0.6);
}
body.dark .ardot-auth-btn--primary:disabled:hover,
body.dark .ardot-auth-btn--primary[aria-disabled='true']:hover {
    background: rgba(255, 255, 255, 0.2);
}
`;
	STYLE_ELEMENT_ID = "ardot-auth-modal-styles";
}));
var init_auth_modal = __esmMin((() => {
	require_react();
	require_react_dom();
	init_auth_content();
	init_auth_i18n();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/ardot-infra/src/ui/index.ts
var init_ui = __esmMin((() => {
	init_auth_modal();
	init_auth_content();
	init_auth_i18n();
	init_auth_modal_styles();
}));
//#endregion
//#region ../../packages/ardot-infra/src/embed/constants.ts
function readEnvOverride() {
	try {
		const value = ((typeof process$1 !== "undefined" ? process$1 : void 0)?.env)?.VITE_ARDOT_DEV_BASE_URL;
		if (typeof value === "string" && value.trim().length > 0) return value.trim();
	} catch {}
}
function readWindowOverride() {
	if (typeof window === "undefined") return;
	const value = window.__ardotDevBaseUrl;
	return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
/**
* 运行时解析 ardot base URL。优先级：`window.__ardotDevBaseUrl` >
* `import.meta.env.VITE_ARDOT_DEV_BASE_URL` > `ARDOT_BASE_URL`。
*/
function resolveArdotBaseUrl() {
	return readWindowOverride() ?? readEnvOverride() ?? "https://ardot.tencent.com";
}
/**
* 运行时解析 ardot origin —— postMessage 安全校验用。跟随
* `resolveArdotBaseUrl()`；解析失败回退到默认 origin。
*/
function resolveArdotOrigin() {
	try {
		return new URL(resolveArdotBaseUrl()).origin;
	} catch {
		return new URL(ARDOT_BASE_URL).origin;
	}
}
var ARDOT_BASE_URL;
var init_constants = __esmMin((() => {
	init_dist();
	ARDOT_BASE_URL = "https://ardot.tencent.com";
	new URL(ARDOT_BASE_URL).origin;
}));
//#endregion
//#region ../../packages/ardot-infra/src/embed/embed-host.ts
var DEFAULT_TIMEOUT_MS, ArdotEmbedHost;
var init_embed_host = __esmMin((() => {
	init_constants();
	DEFAULT_TIMEOUT_MS = 3e4;
	ArdotEmbedHost = class {
		constructor(iframe, options) {
			this.requestSeq = 0;
			this.pending = /* @__PURE__ */ new Map();
			this.eventHandlers = /* @__PURE__ */ new Map();
			this.disposed = false;
			this.iframe = iframe;
			this.timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
			this.allowedOrigin = options?.targetOrigin ?? resolveArdotOrigin();
			this.handleMessageBound = this.handleMessage.bind(this);
			window.addEventListener("message", this.handleMessageBound);
		}
		/** 发送 command 并等 response。抛错场景：timeout / iframe 返回 error / dispose */
		execute(method, params) {
			if (this.disposed) return Promise.reject(/* @__PURE__ */ new Error(`[ArdotEmbedHost] execute after dispose: ${method}`));
			return new Promise((resolve, reject) => {
				const id = ++this.requestSeq;
				const timer = setTimeout(() => {
					if (this.pending.has(id)) {
						this.pending.delete(id);
						reject(/* @__PURE__ */ new Error(`[ArdotEmbedHost] request timeout: ${method}`));
					}
				}, this.timeoutMs);
				this.pending.set(id, {
					resolve,
					reject,
					timer
				});
				const msg = {
					type: "embed:command",
					id,
					method,
					params
				};
				this.iframe.contentWindow?.postMessage(msg, this.allowedOrigin);
			});
		}
		/** 订阅 iframe 侧事件；返回 unsubscribe。 */
		onEvent(event, handler) {
			let handlers = this.eventHandlers.get(event);
			if (!handlers) {
				handlers = /* @__PURE__ */ new Set();
				this.eventHandlers.set(event, handlers);
			}
			handlers.add(handler);
			return () => {
				this.eventHandlers.get(event)?.delete(handler);
			};
		}
		/**
		* host → guest 事件推送（fire-and-forget，无 response）。
		*
		* 与 execute 的区别：execute 走 command/response 应答式；sendEvent 走
		* embed:event 单向广播。cocraft 侧 `EmbedGuestAdapter.handleMessage`
		* 收到 `embed:event` 会分发给对应 event 的所有订阅者，不会返回响应。
		*
		* 用于推送 HOST_CONTEXT_CHANGED 等主题/展示态变化，不用等 iframe 处理完。
		*/
		sendEvent(event, data) {
			if (this.disposed) return;
			const msg = {
				type: "embed:event",
				event,
				data
			};
			this.iframe.contentWindow?.postMessage(msg, this.allowedOrigin);
		}
		dispose() {
			if (this.disposed) return;
			this.disposed = true;
			window.removeEventListener("message", this.handleMessageBound);
			this.pending.forEach(({ reject, timer }) => {
				clearTimeout(timer);
				reject(/* @__PURE__ */ new Error("[ArdotEmbedHost] disposed"));
			});
			this.pending.clear();
			this.eventHandlers.clear();
		}
		handleMessage(event) {
			if (event.source !== this.iframe.contentWindow) return;
			if (event.origin !== this.allowedOrigin) return;
			const data = event.data;
			if (!data || typeof data !== "object" || typeof data.type !== "string") return;
			if (data.type === "embed:response") {
				const pending = this.pending.get(data.id);
				if (!pending) return;
				clearTimeout(pending.timer);
				this.pending.delete(data.id);
				if (data.error) pending.reject(/* @__PURE__ */ new Error(`[ArdotEmbedHost] guest error: ${data.error.code} ${data.error.message}`));
				else pending.resolve(data.data);
				return;
			}
			if (data.type === "embed:event") this.eventHandlers.get(data.event)?.forEach((handler) => {
				try {
					handler(data.data);
				} catch (e) {
					console.error("[ArdotEmbedHost] event handler threw", e);
				}
			});
		}
	};
}));
//#endregion
//#region ../../packages/ardot-infra/src/embed/index.ts
var init_embed = __esmMin((() => {
	init_constants();
	init_embed_host();
}));
//#endregion
//#region ../../packages/ardot-infra/src/index.ts
var init_src = __esmMin((() => {
	init_service();
	init_state();
	init_hooks();
	init_types();
	init_ui();
	init_embed();
}));
//#endregion
export { useArdotAuth as a, ArdotAuthContent as i, ArdotEmbedHost as n, ardotAuthStore as o, ensureArdotAuthStyles as r, useArdotAuthStore as s, init_src as t };
