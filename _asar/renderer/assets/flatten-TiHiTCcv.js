import { t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { r as require__Symbol } from "./isObjectLike-Dan5H4Gd.js";
import { n as require_isArguments, t as require_isArray } from "./isArray-DF8nWJvm.js";
import { t as require__arrayPush } from "./_arrayPush-BsNoX1T9.js";
//#region ../../node_modules/lodash/_isFlattenable.js
var require__isFlattenable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Symbol = require__Symbol(), isArguments = require_isArguments(), isArray = require_isArray();
	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
	/**
	* Checks if `value` is a flattenable `arguments` object or array.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	*/
	function isFlattenable(value) {
		return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	module.exports = isFlattenable;
}));
//#endregion
//#region ../../node_modules/lodash/_baseFlatten.js
var require__baseFlatten = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayPush = require__arrayPush(), isFlattenable = require__isFlattenable();
	/**
	* The base implementation of `_.flatten` with support for restricting flattening.
	*
	* @private
	* @param {Array} array The array to flatten.
	* @param {number} depth The maximum recursion depth.
	* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	* @param {Array} [result=[]] The initial result value.
	* @returns {Array} Returns the new flattened array.
	*/
	function baseFlatten(array, depth, predicate, isStrict, result) {
		var index = -1, length = array.length;
		predicate || (predicate = isFlattenable);
		result || (result = []);
		while (++index < length) {
			var value = array[index];
			if (depth > 0 && predicate(value)) if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
			else arrayPush(result, value);
			else if (!isStrict) result[result.length] = value;
		}
		return result;
	}
	module.exports = baseFlatten;
}));
//#endregion
//#region ../../node_modules/lodash/flatten.js
var require_flatten = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseFlatten = require__baseFlatten();
	/**
	* Flattens `array` a single level deep.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Array
	* @param {Array} array The array to flatten.
	* @returns {Array} Returns the new flattened array.
	* @example
	*
	* _.flatten([1, [2, [3, [4]], 5]]);
	* // => [1, 2, [3, [4]], 5]
	*/
	function flatten(array) {
		return (array == null ? 0 : array.length) ? baseFlatten(array, 1) : [];
	}
	module.exports = flatten;
}));
//#endregion
export { require__baseFlatten as n, require_flatten as t };
