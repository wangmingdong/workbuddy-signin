import { n as __esmMin, s as __toESM, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { p as init_tslib_es6, t as __assign } from "./tslib.es6-8NkKEYUK.js";
//#region ../../node_modules/react-is/cjs/react-is.production.min.js
/**
* @license React
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u = Symbol.for("react.module.reference");
	function v(a) {
		if ("object" === typeof a && null !== a) {
			var r = a.$$typeof;
			switch (r) {
				case b: switch (a = a.type, a) {
					case d:
					case f:
					case e:
					case m:
					case n: return a;
					default: switch (a = a && a.$$typeof, a) {
						case k:
						case h:
						case l:
						case q:
						case p:
						case g: return a;
						default: return r;
					}
				}
				case c: return r;
			}
		}
	}
	exports.ForwardRef = l;
	exports.isFragment = function(a) {
		return v(a) === d;
	};
	exports.isMemo = function(a) {
		return v(a) === p;
	};
	exports.isValidElementType = function(a) {
		return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? !0 : !1;
	};
}));
//#endregion
//#region ../../node_modules/react-is/index.js
var require_react_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_is_production_min();
}));
//#endregion
//#region ../../node_modules/react-use/esm/useMountedState.js
function useMountedState() {
	var mountedRef = (0, import_react$9.useRef)(false);
	var get = (0, import_react$9.useCallback)(function() {
		return mountedRef.current;
	}, []);
	(0, import_react$9.useEffect)(function() {
		mountedRef.current = true;
		return function() {
			mountedRef.current = false;
		};
	}, []);
	return get;
}
var import_react$9;
var init_useMountedState = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/react-use/esm/useAsyncFn.js
function useAsyncFn(fn, deps, initialState) {
	if (deps === void 0) deps = [];
	if (initialState === void 0) initialState = { loading: false };
	var lastCallId = (0, import_react$8.useRef)(0);
	var isMounted = useMountedState();
	var _a = (0, import_react$8.useState)(initialState), state = _a[0], set = _a[1];
	return [state, (0, import_react$8.useCallback)(function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		var callId = ++lastCallId.current;
		if (!state.loading) set(function(prevState) {
			return __assign(__assign({}, prevState), { loading: true });
		});
		return fn.apply(void 0, args).then(function(value) {
			isMounted() && callId === lastCallId.current && set({
				value,
				loading: false
			});
			return value;
		}, function(error) {
			isMounted() && callId === lastCallId.current && set({
				error,
				loading: false
			});
			return error;
		});
	}, deps)];
}
var import_react$8;
var init_useAsyncFn = __esmMin((() => {
	init_tslib_es6();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_useMountedState();
}));
//#endregion
//#region ../../node_modules/react-use/esm/misc/util.js
function on(obj) {
	var args = [];
	for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
	if (obj && obj.addEventListener) obj.addEventListener.apply(obj, args);
}
function off(obj) {
	var args = [];
	for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
	if (obj && obj.removeEventListener) obj.removeEventListener.apply(obj, args);
}
var isBrowser;
var init_util = __esmMin((() => {
	isBrowser = typeof window !== "undefined";
}));
//#endregion
//#region ../../node_modules/react-use/esm/useToggle.js
var import_react$7, toggleReducer, useToggle;
var init_useToggle = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	toggleReducer = function(state, nextValue) {
		return typeof nextValue === "boolean" ? nextValue : !state;
	};
	useToggle = function(initialValue) {
		return (0, import_react$7.useReducer)(toggleReducer, initialValue);
	};
}));
//#endregion
//#region ../../node_modules/react-use/esm/useBoolean.js
var useBoolean_default;
var init_useBoolean = __esmMin((() => {
	init_useToggle();
	useBoolean_default = useToggle;
}));
//#endregion
//#region ../../node_modules/react-use/esm/useTimeoutFn.js
function useTimeoutFn(fn, ms) {
	if (ms === void 0) ms = 0;
	var ready = (0, import_react$6.useRef)(false);
	var timeout = (0, import_react$6.useRef)();
	var callback = (0, import_react$6.useRef)(fn);
	var isReady = (0, import_react$6.useCallback)(function() {
		return ready.current;
	}, []);
	var set = (0, import_react$6.useCallback)(function() {
		ready.current = false;
		timeout.current && clearTimeout(timeout.current);
		timeout.current = setTimeout(function() {
			ready.current = true;
			callback.current();
		}, ms);
	}, [ms]);
	var clear = (0, import_react$6.useCallback)(function() {
		ready.current = null;
		timeout.current && clearTimeout(timeout.current);
	}, []);
	(0, import_react$6.useEffect)(function() {
		callback.current = fn;
	}, [fn]);
	(0, import_react$6.useEffect)(function() {
		set();
		return clear;
	}, [ms]);
	return [
		isReady,
		clear,
		set
	];
}
var import_react$6;
var init_useTimeoutFn = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../node_modules/react-use/esm/useDebounce.js
function useDebounce(fn, ms, deps) {
	if (ms === void 0) ms = 0;
	if (deps === void 0) deps = [];
	var _a = useTimeoutFn(fn, ms), isReady = _a[0], cancel = _a[1], reset = _a[2];
	(0, import_react$5.useEffect)(reset, deps);
	return [isReady, cancel];
}
var import_react$5;
var init_useDebounce = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_useTimeoutFn();
}));
//#endregion
//#region ../../node_modules/react-use/esm/useEffectOnce.js
var import_react$4, useEffectOnce;
var init_useEffectOnce = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	useEffectOnce = function(effect) {
		(0, import_react$4.useEffect)(effect, []);
	};
}));
//#endregion
//#region ../../node_modules/react-use/esm/useInterval.js
var import_react$3, useInterval;
var init_useInterval = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	useInterval = function(callback, delay) {
		var savedCallback = (0, import_react$3.useRef)(function() {});
		(0, import_react$3.useEffect)(function() {
			savedCallback.current = callback;
		});
		(0, import_react$3.useEffect)(function() {
			if (delay !== null) {
				var interval_1 = setInterval(function() {
					return savedCallback.current();
				}, delay || 0);
				return function() {
					return clearInterval(interval_1);
				};
			}
		}, [delay]);
	};
}));
//#endregion
//#region ../../node_modules/react-use/esm/useUnmount.js
var import_react$2, useUnmount;
var init_useUnmount = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_useEffectOnce();
	useUnmount = function(fn) {
		var fnRef = (0, import_react$2.useRef)(fn);
		fnRef.current = fn;
		useEffectOnce(function() {
			return function() {
				return fnRef.current();
			};
		});
	};
}));
//#endregion
//#region ../../node_modules/react-use/esm/useRafState.js
var import_react$1, useRafState;
var init_useRafState = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useUnmount();
	useRafState = function(initialState) {
		var frame = (0, import_react$1.useRef)(0);
		var _a = (0, import_react$1.useState)(initialState), state = _a[0], setState = _a[1];
		var setRafState = (0, import_react$1.useCallback)(function(value) {
			cancelAnimationFrame(frame.current);
			frame.current = requestAnimationFrame(function() {
				setState(value);
			});
		}, []);
		useUnmount(function() {
			cancelAnimationFrame(frame.current);
		});
		return [state, setRafState];
	};
}));
//#endregion
//#region ../../node_modules/react-use/esm/useWindowSize.js
var import_react, useWindowSize;
var init_useWindowSize = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useRafState();
	init_util();
	useWindowSize = function(_a) {
		var _b = _a === void 0 ? {} : _a, _c = _b.initialWidth, initialWidth = _c === void 0 ? Infinity : _c, _d = _b.initialHeight, initialHeight = _d === void 0 ? Infinity : _d, onChange = _b.onChange;
		var _e = useRafState({
			width: isBrowser ? window.innerWidth : initialWidth,
			height: isBrowser ? window.innerHeight : initialHeight
		}), state = _e[0], setState = _e[1];
		(0, import_react.useEffect)(function() {
			if (isBrowser) {
				var handler_1 = function() {
					var width = window.innerWidth;
					var height = window.innerHeight;
					setState({
						width,
						height
					});
					if (onChange) onChange(width, height);
				};
				on(window, "resize", handler_1);
				return function() {
					off(window, "resize", handler_1);
				};
			}
		}, []);
		return state;
	};
}));
//#endregion
//#region ../../node_modules/react-use/esm/index.js
var init_esm = __esmMin((() => {
	init_useAsyncFn();
	init_util();
	init_useBoolean();
	init_useMountedState();
	init_useDebounce();
	init_useEffectOnce();
	init_useInterval();
	init_useRafState();
	init_useUnmount();
	init_useTimeoutFn();
	init_useToggle();
	init_useWindowSize();
}));
//#endregion
export { useBoolean_default as a, useDebounce as i, useWindowSize as n, useAsyncFn as o, useInterval as r, require_react_is as s, init_esm as t };
