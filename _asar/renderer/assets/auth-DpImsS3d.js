import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { a as init_use_lexiang_check_auth_gate, c as lexiangAuthStore, i as useReportLexiangAuthResult, j as init_lexiang_auth_constants, n as init_auth_guide, o as useLexiangCheckAuthGate, r as init_use_lexiang_auth_report, s as init_lexiang_auth_store, t as AuthGuide, u as useLexiangAuth } from "./auth-guide-DhEAKsIJ.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/auth-guard.tsx
/**
* 授权守卫
*/
function AuthGuard({ source, children, className, isActive = true, silent = false, bypass = false }) {
	const { authStatus, authError } = useLexiangAuth();
	const triggerCheckAuth = useLexiangCheckAuthGate();
	const prevActiveRef = (0, import_react$1.useRef)(null);
	const silentTriggeredRef = (0, import_react$1.useRef)(false);
	/** 记录是否曾经渲染过 children（connected 过），用于 recoverable failure 时保留内容 */
	const hasRenderedChildrenRef = (0, import_react$1.useRef)(false);
	useReportLexiangAuthResult();
	(0, import_react$1.useEffect)(() => {
		if (bypass) return;
		const prev = prevActiveRef.current;
		if (prev === isActive) return;
		prevActiveRef.current = isActive;
		if (prev === null) {
			if (isActive) triggerCheckAuth();
			return;
		}
		if (isActive) {
			silentTriggeredRef.current = false;
			triggerCheckAuth();
		} else lexiangAuthStore.getState().reset();
	}, [
		bypass,
		isActive,
		triggerCheckAuth
	]);
	(0, import_react$1.useEffect)(() => {
		if (bypass || !silent || !isActive || silentTriggeredRef.current) return;
		if (authStatus === "not_connected") {
			silentTriggeredRef.current = true;
			lexiangAuthStore.getState().startAuthorization();
		}
	}, [
		bypass,
		silent,
		isActive,
		authStatus
	]);
	if (bypass) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children });
	if (authStatus === "connected") {
		hasRenderedChildrenRef.current = true;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children });
	}
	if (hasRenderedChildrenRef.current && (authStatus === "checking" || authStatus === "failed")) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [authError && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		style: {
			padding: "6px 12px",
			fontSize: "12px",
			color: "var(--cb-warning, #e6a700)",
			background: "var(--cb-bg-secondary, rgba(230, 167, 0, 0.08))",
			borderRadius: "4px",
			margin: "0 0 4px 0",
			textAlign: "center"
		},
		children: authError
	}), children] });
	if (authStatus === "checking") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className,
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100%"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
			style: {
				fontSize: "13px",
				color: "var(--cb-text-tertiary, #999)"
			},
			children: "正在检查授权状态…"
		})
	});
	if (silent && (authStatus === "authorizing" || authStatus === "not_connected")) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className,
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100%"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
			style: {
				fontSize: "13px",
				color: "var(--cb-text-tertiary, #999)"
			},
			children: "正在授权中…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AuthGuide, {
		source,
		className
	});
}
var import_react$1, import_jsx_runtime$1;
var init_auth_guard = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_use_lexiang_check_auth_gate();
	init_auth_guide();
	init_lexiang_auth_store();
	init_use_lexiang_auth_report();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/lexiang-auth-page.less
var init_lexiang_auth_page$1 = __esmMin((() => {}));
var init_lexiang_auth_page = __esmMin((() => {
	init_lexiang_auth_page$1();
	require_react();
	init_useI18n();
	init_lexiang_auth_store();
	init_use_lexiang_auth_report();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/auth/index.ts
var init_auth = __esmMin((() => {
	init_lexiang_auth_constants();
	init_lexiang_auth_store();
	init_auth_guard();
	init_auth_guide();
	init_lexiang_auth_page();
}));
//#endregion
export { init_auth_guard as i, init_lexiang_auth_page as n, AuthGuard as r, init_auth as t };
