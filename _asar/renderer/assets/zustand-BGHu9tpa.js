import { n as __esmMin, o as __toCommonJS, r as __exportAll, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
//#region ../../node_modules/zustand/esm/vanilla.js
var vanilla_exports = /* @__PURE__ */ __exportAll({
	createStore: () => createStore,
	default: () => vanilla
});
var createStoreImpl, createStore, vanilla;
var init_vanilla = __esmMin((() => {
	createStoreImpl = (createState) => {
		let state;
		const listeners = /* @__PURE__ */ new Set();
		const setState = (partial, replace) => {
			const nextState = typeof partial === "function" ? partial(state) : partial;
			if (!Object.is(nextState, state)) {
				const previousState = state;
				state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
				listeners.forEach((listener) => listener(state, previousState));
			}
		};
		const getState = () => state;
		const getInitialState = () => initialState;
		const subscribe = (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		};
		const destroy = () => {
			listeners.clear();
		};
		const api = {
			setState,
			getState,
			getInitialState,
			subscribe,
			destroy
		};
		const initialState = state = createState(setState, getState, api);
		return api;
	};
	createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
	vanilla = (createState) => {
		return createStore(createState);
	};
}));
//#endregion
//#region ../../node_modules/zustand/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region ../../node_modules/zustand/node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region ../../node_modules/zustand/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react(), shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region ../../node_modules/zustand/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
}));
//#endregion
//#region ../../node_modules/zustand/index.js
var require_zustand = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var vanilla = (init_vanilla(), __toCommonJS(vanilla_exports));
	var ReactExports = require_react();
	var useSyncExternalStoreExports = require_with_selector();
	var useDebugValue = ReactExports.useDebugValue;
	var useSyncExternalStoreWithSelector = useSyncExternalStoreExports.useSyncExternalStoreWithSelector;
	var identity = function identity(arg) {
		return arg;
	};
	function useStore(api, selector, equalityFn) {
		if (selector === void 0) selector = identity;
		var slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
		useDebugValue(slice);
		return slice;
	}
	var createImpl = function createImpl(createState) {
		var api = typeof createState === "function" ? vanilla.createStore(createState) : createState;
		var useBoundStore = function useBoundStore(selector, equalityFn) {
			return useStore(api, selector, equalityFn);
		};
		Object.assign(useBoundStore, api);
		return useBoundStore;
	};
	var create = function create(createState) {
		return createState ? createImpl(createState) : createImpl;
	};
	var react = (function(createState) {
		return create(createState);
	});
	exports.create = create;
	exports.default = react;
	exports.useStore = useStore;
	Object.keys(vanilla).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return vanilla[k];
			}
		});
	});
	module.exports = react;
	module.exports.create = create;
	module.exports.useStore = useStore;
	module.exports.createStore = vanilla.createStore;
	exports.default = module.exports;
}));
//#endregion
export { require_zustand as t };
