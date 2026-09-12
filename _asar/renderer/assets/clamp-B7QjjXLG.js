import { t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { r as require_toNumber } from "./throttle-mAPE4S6V.js";
//#region ../../node_modules/lodash/_baseClamp.js
var require__baseClamp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* The base implementation of `_.clamp` which doesn't coerce arguments.
	*
	* @private
	* @param {number} number The number to clamp.
	* @param {number} [lower] The lower bound.
	* @param {number} upper The upper bound.
	* @returns {number} Returns the clamped number.
	*/
	function baseClamp(number, lower, upper) {
		if (number === number) {
			if (upper !== void 0) number = number <= upper ? number : upper;
			if (lower !== void 0) number = number >= lower ? number : lower;
		}
		return number;
	}
	module.exports = baseClamp;
}));
//#endregion
//#region ../../node_modules/lodash/clamp.js
var require_clamp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseClamp = require__baseClamp(), toNumber = require_toNumber();
	/**
	* Clamps `number` within the inclusive `lower` and `upper` bounds.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Number
	* @param {number} number The number to clamp.
	* @param {number} [lower] The lower bound.
	* @param {number} upper The upper bound.
	* @returns {number} Returns the clamped number.
	* @example
	*
	* _.clamp(-10, -5, 5);
	* // => -5
	*
	* _.clamp(10, -5, 5);
	* // => 5
	*/
	function clamp(number, lower, upper) {
		if (upper === void 0) {
			upper = lower;
			lower = void 0;
		}
		if (upper !== void 0) {
			upper = toNumber(upper);
			upper = upper === upper ? upper : 0;
		}
		if (lower !== void 0) {
			lower = toNumber(lower);
			lower = lower === lower ? lower : 0;
		}
		return baseClamp(toNumber(number), lower, upper);
	}
	module.exports = clamp;
}));
//#endregion
export { require_clamp as t };
