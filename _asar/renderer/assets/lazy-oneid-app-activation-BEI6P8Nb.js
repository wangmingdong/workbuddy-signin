const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./esm-CiOk1-zO.js","./chunk-BRZcfu7K.js","./preload-helper-E3UYCQGP.js","./aegis.min-ssbDZNSi.js","./is-typed-array-CGd3OXGY.js","./call-bound-CtCE4EvK.js","./classnames-BYn3_ESJ.js","./events-BqDrbybI.js","./i18next-DWuHLQMZ.js","./merge-CDI2sNhv.js","./lodash-D1c13HHR.js","./merge-vXYl4M0x.js","./_toKey-C_jhg8p3.js","./isObjectLike-Dan5H4Gd.js","./isArray-DF8nWJvm.js","./isSymbol-DlS8bGaY.js","./_arrayPush-BsNoX1T9.js","./throttle-mAPE4S6V.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./esm-BGAOtrY0.js","./tslib.es6-8NkKEYUK.js","./jsx-runtime-BNEdAQtr.js","./esm-leoUPiBo.js","./dist-DNjXzICC.js","./dist-CSHw4oQX.js","./esm-pzWMy03t.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/oneid-env.ts
function readDevEnvFromLocalStorage() {
	try {
		if (typeof localStorage === "undefined") return null;
		const raw = localStorage.getItem("__dev_env_state__");
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function resolveOneidEnv() {
	const state = readDevEnvFromLocalStorage();
	if (state?.enabled) {
		if (state.env === "staging") return "ci-741";
		if (state.env === "prod") return "prod";
	}
	return "prod";
}
var ONEID_ENV;
var init_oneid_env = __esmMin((() => {
	ONEID_ENV = resolveOneidEnv();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/oneid/lazy-oneid-app-activation.tsx
var import_react, import_jsx_runtime, OneidAppActivationLazy, LazyOneidAppActivation;
var init_lazy_oneid_app_activation = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	OneidAppActivationLazy = (0, import_react.lazy)(async () => {
		return { default: (await __vitePreload(() => import("./esm-CiOk1-zO.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url)).OneidAppActivation };
	});
	LazyOneidAppActivation = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneidAppActivationLazy, { ...props })
	});
}));
//#endregion
export { init_oneid_env as i, init_lazy_oneid_app_activation as n, ONEID_ENV as r, LazyOneidAppActivation as t };
