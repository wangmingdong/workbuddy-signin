import { t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { S as require_type, a as require_call_bind_apply_helpers, c as require_function_bind, d as require_es_define_property, f as require_gopd, i as require_get_proto, n as require_get_intrinsic, o as require_actualApply, r as require_hasown, s as require_functionApply, t as require_call_bound, u as require_shams$1, y as require_syntax } from "./call-bound-CtCE4EvK.js";
//#region ../../node_modules/has-tostringtag/shams.js
var require_shams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasSymbols = require_shams$1();
	/** @type {import('.')} */
	module.exports = function hasToStringTagShams() {
		return hasSymbols() && !!Symbol.toStringTag;
	};
}));
//#endregion
//#region ../../node_modules/is-regex/index.js
var require_is_regex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound = require_call_bound();
	var hasToStringTag = require_shams()();
	var hasOwn = require_hasown();
	var gOPD = require_gopd();
	/** @type {import('.')} */
	var fn;
	if (hasToStringTag) {
		/** @type {(receiver: ThisParameterType<typeof RegExp.prototype.exec>, ...args: Parameters<typeof RegExp.prototype.exec>) => ReturnType<typeof RegExp.prototype.exec>} */
		var $exec = callBound("RegExp.prototype.exec");
		/** @type {object} */
		var isRegexMarker = {};
		var throwRegexMarker = function() {
			throw isRegexMarker;
		};
		/** @type {{ toString(): never, valueOf(): never, [Symbol.toPrimitive]?(): never }} */
		var badStringifier = {
			toString: throwRegexMarker,
			valueOf: throwRegexMarker
		};
		if (typeof Symbol.toPrimitive === "symbol") badStringifier[Symbol.toPrimitive] = throwRegexMarker;
		/** @type {import('.')} */
		fn = function isRegex(value) {
			if (!value || typeof value !== "object") return false;
			var descriptor = gOPD(value, "lastIndex");
			if (!(descriptor && hasOwn(descriptor, "value"))) return false;
			try {
				$exec(value, badStringifier);
			} catch (e) {
				return e === isRegexMarker;
			}
		};
	} else {
		/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */
		var $toString = callBound("Object.prototype.toString");
		/** @const @type {'[object RegExp]'} */
		var regexClass = "[object RegExp]";
		/** @type {import('.')} */
		fn = function isRegex(value) {
			if (!value || typeof value !== "object" && typeof value !== "function") return false;
			return $toString(value) === regexClass;
		};
	}
	module.exports = fn;
}));
//#endregion
//#region ../../node_modules/safe-regex-test/index.js
var require_safe_regex_test = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound = require_call_bound();
	var isRegex = require_is_regex();
	var $exec = callBound("RegExp.prototype.exec");
	var $TypeError = require_type();
	/** @type {import('.')} */
	module.exports = function regexTester(regex) {
		if (!isRegex(regex)) throw new $TypeError("`regex` must be a RegExp");
		return function test(s) {
			return $exec(regex, s) !== null;
		};
	};
}));
//#endregion
//#region ../../node_modules/is-generator-function/index.js
var require_is_generator_function = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound = require_call_bound();
	var isFnRegex = require_safe_regex_test()(/^\s*(?:function)?\*/);
	var hasToStringTag = require_shams()();
	var getProto = require_get_proto();
	var toStr = callBound("Object.prototype.toString");
	var fnToStr = callBound("Function.prototype.toString");
	var getGeneratorFunc = function() {
		if (!hasToStringTag) return false;
		try {
			return Function("return function*() {}")();
		} catch (e) {}
	};
	/** @type {undefined | false | null | GeneratorFunctionConstructor} */
	var GeneratorFunction;
	/** @type {import('.')} */
	module.exports = function isGeneratorFunction(fn) {
		if (typeof fn !== "function") return false;
		if (isFnRegex(fnToStr(fn))) return true;
		if (!hasToStringTag) return toStr(fn) === "[object GeneratorFunction]";
		if (!getProto) return false;
		if (typeof GeneratorFunction === "undefined") {
			var generatorFunc = getGeneratorFunc();
			GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
		}
		return getProto(fn) === GeneratorFunction;
	};
}));
//#endregion
//#region ../../node_modules/is-callable/index.js
var require_is_callable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") try {
		badArrayLike = Object.defineProperty({}, "length", { get: function() {
			throw isCallableMarker;
		} });
		isCallableMarker = {};
		reflectApply(function() {
			throw 42;
		}, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) reflectApply = null;
	}
	else reflectApply = null;
	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false;
		}
	};
	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) return false;
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var objectClass = "[object Object]";
	var fnClass = "[object Function]";
	var genClass = "[object GeneratorFunction]";
	var ddaClass = "[object HTMLAllCollection]";
	var ddaClass2 = "[object HTML document.all class]";
	var ddaClass3 = "[object HTMLCollection]";
	var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
	var isIE68 = !(0 in [,]);
	var isDDA = function isDocumentDotAll() {
		return false;
	};
	if (typeof document === "object") {
		var all = document.all;
		if (toStr.call(all) === toStr.call(document.all)) isDDA = function isDocumentDotAll(value) {
			if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) try {
				var str = toStr.call(value);
				return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
			} catch (e) {}
			return false;
		};
	}
	module.exports = reflectApply ? function isCallable(value) {
		if (isDDA(value)) return true;
		if (!value) return false;
		if (typeof value !== "function" && typeof value !== "object") return false;
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) return false;
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	} : function isCallable(value) {
		if (isDDA(value)) return true;
		if (!value) return false;
		if (typeof value !== "function" && typeof value !== "object") return false;
		if (hasToStringTag) return tryFunctionObject(value);
		if (isES6ClassFn(value)) return false;
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) return false;
		return tryFunctionObject(value);
	};
}));
//#endregion
//#region ../../node_modules/for-each/index.js
var require_for_each = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isCallable = require_is_callable();
	var toStr = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */
	var forEachArray = function forEachArray(array, iterator, receiver) {
		for (var i = 0, len = array.length; i < len; i++) if (hasOwnProperty.call(array, i)) if (receiver == null) iterator(array[i], i, array);
		else iterator.call(receiver, array[i], i, array);
	};
	/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */
	var forEachString = function forEachString(string, iterator, receiver) {
		for (var i = 0, len = string.length; i < len; i++) if (receiver == null) iterator(string.charAt(i), i, string);
		else iterator.call(receiver, string.charAt(i), i, string);
	};
	/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */
	var forEachObject = function forEachObject(object, iterator, receiver) {
		for (var k in object) if (hasOwnProperty.call(object, k)) if (receiver == null) iterator(object[k], k, object);
		else iterator.call(receiver, object[k], k, object);
	};
	/** @type {(x: unknown) => x is readonly unknown[]} */
	function isArray(x) {
		return toStr.call(x) === "[object Array]";
	}
	/** @type {import('.')._internal} */
	module.exports = function forEach(list, iterator, thisArg) {
		if (!isCallable(iterator)) throw new TypeError("iterator must be a function");
		var receiver;
		if (arguments.length >= 3) receiver = thisArg;
		if (isArray(list)) forEachArray(list, iterator, receiver);
		else if (typeof list === "string") forEachString(list, iterator, receiver);
		else forEachObject(list, iterator, receiver);
	};
}));
//#endregion
//#region ../../node_modules/possible-typed-array-names/index.js
var require_possible_typed_array_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = [
		"Float16Array",
		"Float32Array",
		"Float64Array",
		"Int8Array",
		"Int16Array",
		"Int32Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Uint16Array",
		"Uint32Array",
		"BigInt64Array",
		"BigUint64Array"
	];
}));
//#endregion
//#region ../../node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var possibleNames = require_possible_typed_array_names();
	var g = typeof globalThis === "undefined" ? globalThis : globalThis;
	/** @type {import('.')} */
	module.exports = function availableTypedArrays() {
		var out = [];
		for (var i = 0; i < possibleNames.length; i++) if (typeof g[possibleNames[i]] === "function") out[out.length] = possibleNames[i];
		return out;
	};
}));
//#endregion
//#region ../../node_modules/define-data-property/index.js
var require_define_data_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty = require_es_define_property();
	var $SyntaxError = require_syntax();
	var $TypeError = require_type();
	var gopd = require_gopd();
	/** @type {import('.')} */
	module.exports = function defineDataProperty(obj, property, value) {
		if (!obj || typeof obj !== "object" && typeof obj !== "function") throw new $TypeError("`obj` must be an object or a function`");
		if (typeof property !== "string" && typeof property !== "symbol") throw new $TypeError("`property` must be a string or a symbol`");
		if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
		if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
		if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
		if (arguments.length > 6 && typeof arguments[6] !== "boolean") throw new $TypeError("`loose`, if provided, must be a boolean");
		var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
		var nonWritable = arguments.length > 4 ? arguments[4] : null;
		var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
		var loose = arguments.length > 6 ? arguments[6] : false;
		var desc = !!gopd && gopd(obj, property);
		if ($defineProperty) $defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
		else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) obj[property] = value;
		else throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
	};
}));
//#endregion
//#region ../../node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty = require_es_define_property();
	var hasPropertyDescriptors = function hasPropertyDescriptors() {
		return !!$defineProperty;
	};
	hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
		if (!$defineProperty) return null;
		try {
			return $defineProperty([], "length", { value: 1 }).length !== 1;
		} catch (e) {
			return true;
		}
	};
	module.exports = hasPropertyDescriptors;
}));
//#endregion
//#region ../../node_modules/set-function-length/index.js
var require_set_function_length = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic = require_get_intrinsic();
	var define = require_define_data_property();
	var hasDescriptors = require_has_property_descriptors()();
	var gOPD = require_gopd();
	var $TypeError = require_type();
	var $floor = GetIntrinsic("%Math.floor%");
	/** @type {import('.')} */
	module.exports = function setFunctionLength(fn, length) {
		if (typeof fn !== "function") throw new $TypeError("`fn` is not a function");
		if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) throw new $TypeError("`length` must be a positive 32-bit integer");
		var loose = arguments.length > 2 && !!arguments[2];
		var functionLengthIsConfigurable = true;
		var functionLengthIsWritable = true;
		if ("length" in fn && gOPD) {
			var desc = gOPD(fn, "length");
			if (desc && !desc.configurable) functionLengthIsConfigurable = false;
			if (desc && !desc.writable) functionLengthIsWritable = false;
		}
		if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) if (hasDescriptors) define(fn, "length", length, true, true);
		else define(fn, "length", length);
		return fn;
	};
}));
//#endregion
//#region ../../node_modules/call-bind-apply-helpers/applyBind.js
var require_applyBind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $apply = require_functionApply();
	var actualApply = require_actualApply();
	/** @type {import('./applyBind')} */
	module.exports = function applyBind() {
		return actualApply(bind, $apply, arguments);
	};
}));
//#endregion
//#region ../../node_modules/call-bind/index.js
var require_call_bind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var setFunctionLength = require_set_function_length();
	var $defineProperty = require_es_define_property();
	var callBindBasic = require_call_bind_apply_helpers();
	var applyBind = require_applyBind();
	module.exports = function callBind(originalFunction) {
		var func = callBindBasic(arguments);
		var adjustedLength = originalFunction.length - (arguments.length - 1);
		return setFunctionLength(func, 1 + (adjustedLength > 0 ? adjustedLength : 0), true);
	};
	if ($defineProperty) $defineProperty(module.exports, "apply", { value: applyBind });
	else module.exports.apply = applyBind;
}));
//#endregion
//#region ../../node_modules/which-typed-array/index.js
var require_which_typed_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var forEach = require_for_each();
	var availableTypedArrays = require_available_typed_arrays();
	var callBind = require_call_bind();
	var callBound = require_call_bound();
	var gOPD = require_gopd();
	var getProto = require_get_proto();
	var $toString = callBound("Object.prototype.toString");
	var hasToStringTag = require_shams()();
	var g = typeof globalThis === "undefined" ? globalThis : globalThis;
	var typedArrays = availableTypedArrays();
	var $slice = callBound("String.prototype.slice");
	/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
	var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
		for (var i = 0; i < array.length; i += 1) if (array[i] === value) return i;
		return -1;
	};
	/** @typedef {import('./types').Getter} Getter */
	/** @type {import('./types').Cache} */
	var cache = { __proto__: null };
	if (hasToStringTag && gOPD && getProto) forEach(typedArrays, function(typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr && getProto) {
			var proto = getProto(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor && proto) descriptor = gOPD(getProto(proto), Symbol.toStringTag);
			cache["$" + typedArray] = callBind(descriptor.get);
		}
	});
	else forEach(typedArrays, function(typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) cache["$" + typedArray] = callBind(fn);
	});
	/** @type {(value: object) => false | import('.').TypedArrayName} */
	var tryTypedArrays = function tryAllTypedArrays(value) {
		/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
		forEach(
			cache,
			/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
			function(getter, typedArray) {
				if (!found) try {
					if ("$" + getter(value) === typedArray) found = $slice(typedArray, 1);
				} catch (e) {}
			}
		);
		return found;
	};
	/** @type {(value: object) => false | import('.').TypedArrayName} */
	var trySlices = function tryAllSlices(value) {
		/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
		forEach(
			cache,
			/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
			function(getter, name) {
				if (!found) try {
					getter(value);
					found = $slice(name, 1);
				} catch (e) {}
			}
		);
		return found;
	};
	/** @type {import('.')} */
	module.exports = function whichTypedArray(value) {
		if (!value || typeof value !== "object") return false;
		if (!hasToStringTag) {
			/** @type {string} */
			var tag = $slice($toString(value), 8, -1);
			if ($indexOf(typedArrays, tag) > -1) return tag;
			if (tag !== "Object") return false;
			return trySlices(value);
		}
		if (!gOPD) return null;
		return tryTypedArrays(value);
	};
}));
//#endregion
//#region ../../node_modules/is-typed-array/index.js
var require_is_typed_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var whichTypedArray = require_which_typed_array();
	/** @type {import('.')} */
	module.exports = function isTypedArray(value) {
		return !!whichTypedArray(value);
	};
}));
//#endregion
export { require_define_data_property as a, require_for_each as c, require_safe_regex_test as d, require_is_regex as f, require_has_property_descriptors as i, require_is_callable as l, require_which_typed_array as n, require_available_typed_arrays as o, require_shams as p, require_call_bind as r, require_possible_typed_array_names as s, require_is_typed_array as t, require_is_generator_function as u };
