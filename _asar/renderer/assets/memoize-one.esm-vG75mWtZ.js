import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/memoize-one/dist/memoize-one.esm.js
var memoize_one_esm_exports = /* @__PURE__ */ __exportAll({ default: () => memoizeOne });
function isEqual(first, second) {
	if (first === second) return true;
	if (safeIsNaN(first) && safeIsNaN(second)) return true;
	return false;
}
function areInputsEqual(newInputs, lastInputs) {
	if (newInputs.length !== lastInputs.length) return false;
	for (var i = 0; i < newInputs.length; i++) if (!isEqual(newInputs[i], lastInputs[i])) return false;
	return true;
}
function memoizeOne(resultFn, isEqual) {
	if (isEqual === void 0) isEqual = areInputsEqual;
	var lastThis;
	var lastArgs = [];
	var lastResult;
	var calledOnce = false;
	function memoized() {
		var newArgs = [];
		for (var _i = 0; _i < arguments.length; _i++) newArgs[_i] = arguments[_i];
		if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) return lastResult;
		lastResult = resultFn.apply(this, newArgs);
		calledOnce = true;
		lastThis = this;
		lastArgs = newArgs;
		return lastResult;
	}
	return memoized;
}
var safeIsNaN;
var init_memoize_one_esm = __esmMin((() => {
	safeIsNaN = Number.isNaN || function ponyfill(value) {
		return typeof value === "number" && value !== value;
	};
}));
//#endregion
export { memoizeOne as n, memoize_one_esm_exports as r, init_memoize_one_esm as t };
