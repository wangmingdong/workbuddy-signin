import { t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { n as require_isObject } from "./isSymbol-DlS8bGaY.js";
import { O as require__copyObject, k as require__assignValue, n as require__castPath, t as require__toKey, u as require_keys, x as require__isIndex, y as require__createAssigner } from "./_toKey-C_jhg8p3.js";
//#region ../../node_modules/lodash/assignWith.js
var require_assignWith = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var copyObject = require__copyObject(), createAssigner = require__createAssigner(), keys = require_keys();
	module.exports = createAssigner(function(object, source, srcIndex, customizer) {
		copyObject(source, keys(source), object, customizer);
	});
}));
//#endregion
//#region ../../node_modules/lodash/_baseSet.js
var require__baseSet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assignValue = require__assignValue(), castPath = require__castPath(), isIndex = require__isIndex(), isObject = require_isObject(), toKey = require__toKey();
	/**
	* The base implementation of `_.set`.
	*
	* @private
	* @param {Object} object The object to modify.
	* @param {Array|string} path The path of the property to set.
	* @param {*} value The value to set.
	* @param {Function} [customizer] The function to customize path creation.
	* @returns {Object} Returns `object`.
	*/
	function baseSet(object, path, value, customizer) {
		if (!isObject(object)) return object;
		path = castPath(path, object);
		var index = -1, length = path.length, lastIndex = length - 1, nested = object;
		while (nested != null && ++index < length) {
			var key = toKey(path[index]), newValue = value;
			if (key === "__proto__" || key === "constructor" || key === "prototype") return object;
			if (index != lastIndex) {
				var objValue = nested[key];
				newValue = customizer ? customizer(objValue, key, nested) : void 0;
				if (newValue === void 0) newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
			}
			assignValue(nested, key, newValue);
			nested = nested[key];
		}
		return object;
	}
	module.exports = baseSet;
}));
//#endregion
//#region ../../node_modules/lodash/set.js
var require_set = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var baseSet = require__baseSet();
	/**
	* Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
	* it's created. Arrays are created for missing index properties while objects
	* are created for all other missing properties. Use `_.setWith` to customize
	* `path` creation.
	*
	* **Note:** This method mutates `object`.
	*
	* @static
	* @memberOf _
	* @since 3.7.0
	* @category Object
	* @param {Object} object The object to modify.
	* @param {Array|string} path The path of the property to set.
	* @param {*} value The value to set.
	* @returns {Object} Returns `object`.
	* @example
	*
	* var object = { 'a': [{ 'b': { 'c': 3 } }] };
	*
	* _.set(object, 'a[0].b.c', 4);
	* console.log(object.a[0].b.c);
	* // => 4
	*
	* _.set(object, ['x', '0', 'y', 'z'], 5);
	* console.log(object.x[0].y.z);
	* // => 5
	*/
	function set(object, path, value) {
		return object == null ? object : baseSet(object, path, value);
	}
	module.exports = set;
}));
//#endregion
export { require__baseSet as n, require_assignWith as r, require_set as t };
