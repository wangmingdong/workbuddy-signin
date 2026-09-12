import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { n as init_esm, t as esm_exports } from "./esm-mgJiqgJI.js";
import { r as memoize_one_esm_exports, t as init_memoize_one_esm } from "./memoize-one.esm-vG75mWtZ.js";
//#region ../../node_modules/@tencent/dui/lib/common/version.js
var require_version = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "1.28.2";
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/common/attribute.js
var require_attribute = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "data-dui-" + (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_version()).default.replace(/\./g, "-");
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/utils/helper.js
var require_helper = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createContextValueGetter = exports.shallowEqual = exports.isBrowser = exports.isDom = exports.wrapWithConfigDefaults = exports.inject = exports.assert = exports.isIE = exports.createStringParamFunc = exports.canBeDivided = exports.roundByStep = exports.castInto = exports.nullFn = exports.trueFn = exports.falseFn = exports.emptyFn = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var memoize_one_1 = tslib_1.__importDefault((init_memoize_one_esm(), __toCommonJS(memoize_one_esm_exports)));
	function emptyFn() {}
	exports.emptyFn = emptyFn;
	function falseFn() {
		return false;
	}
	exports.falseFn = falseFn;
	function trueFn() {
		return true;
	}
	exports.trueFn = trueFn;
	function nullFn() {
		return null;
	}
	exports.nullFn = nullFn;
	function castInto(value, targetRange) {
		if (value > targetRange[1]) return targetRange[1];
		if (value < targetRange[0]) return targetRange[0];
		return value;
	}
	exports.castInto = castInto;
	function roundByStep(value, step) {
		if (value < 0) return -roundByStep(-value, step);
		var diff = value % step;
		if (diff < step / 2) return value - diff;
		else return value - diff + step;
	}
	exports.roundByStep = roundByStep;
	function canBeDivided(dividend, divisor) {
		var divideResult = dividend / divisor;
		return divideResult >> 0 === divideResult;
	}
	exports.canBeDivided = canBeDivided;
	function createStringParamFunc(numberParamFunc) {
		return function() {
			var stringValues = [];
			for (var _i = 0; _i < arguments.length; _i++) stringValues[_i] = arguments[_i];
			var numberValues = stringValues.map(function(str) {
				return Number(str);
			});
			return numberParamFunc.apply(void 0, numberValues);
		};
	}
	exports.createStringParamFunc = createStringParamFunc;
	var isIEBrowser;
	function isIE() {
		if (typeof isIEBrowser === "boolean") return isIEBrowser;
		var ua = navigator.userAgent;
		if (/compatible/.test(ua) && /MSIE/.test(ua)) isIEBrowser = true;
		else if (/Trident/.test(ua) && /rv:11\.0/.test(ua)) isIEBrowser = true;
		else isIEBrowser = false;
		return isIEBrowser;
	}
	exports.isIE = isIE;
	function assert(condition, errorMessage) {
		if (!condition) console.error(errorMessage);
	}
	exports.assert = assert;
	function inject(originalFn, additionalFn) {
		return function() {
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			var result = originalFn.apply(null, args);
			if (result !== false) additionalFn();
			return result;
		};
	}
	exports.inject = inject;
	function wrapWithConfigDefaults(originalFn) {
		var defaultConfig = {};
		function configDefaults(defaults) {
			defaultConfig = defaults;
		}
		var wrappedFn = function(passedConfig) {
			return originalFn(tslib_1.__assign(tslib_1.__assign({}, defaultConfig), passedConfig));
		};
		wrappedFn.configDefaults = configDefaults;
		return wrappedFn;
	}
	exports.wrapWithConfigDefaults = wrapWithConfigDefaults;
	function isDom(node) {
		return node && typeof node === "object" && node.nodeType === 1;
	}
	exports.isDom = isDom;
	exports.isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
	function shallowEqual(paramA, paramB) {
		if (paramA === paramB) return true;
		if (typeof paramA !== typeof paramB) return false;
		if (typeof paramA !== "object" || paramA === null || typeof paramB !== "object" || paramB === null) return false;
		var keysOfA = Object.keys(paramA);
		var keysOfB = Object.keys(paramB);
		if (keysOfA.length !== keysOfB.length) return false;
		return keysOfA.every(function(key) {
			return paramA[key] === paramB[key];
		});
	}
	exports.shallowEqual = shallowEqual;
	function createContextValueGetter() {
		return memoize_one_1.default(function(context) {
			return context;
		}, function(newArgs, lastArgs) {
			return shallowEqual(newArgs[0], lastArgs[0]);
		});
	}
	exports.createContextValueGetter = createContextValueGetter;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/utils/createElement.js
var require_createElement = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.h = exports.isScopedAttributeDisabled = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var react_1 = require_react();
	var attribute_1 = tslib_1.__importDefault(require_attribute());
	var helper_1 = require_helper();
	exports.isScopedAttributeDisabled = shouldDisableScopedAttribute();
	if (helper_1.isBrowser) window.__dui_disable_auto_focus_map__ = window.__dui_disable_auto_focus_map__ || {};
	function h(type, props) {
		var children = [];
		for (var _i = 2; _i < arguments.length; _i++) children[_i - 2] = arguments[_i];
		var mergedProps = props;
		if ((props === null || props === void 0 ? void 0 : props.className) && typeof type === "string" && !exports.isScopedAttributeDisabled) mergedProps[attribute_1.default] = props.className;
		return react_1.createElement.apply(void 0, tslib_1.__spreadArray([type, mergedProps], children));
	}
	exports.h = h;
	function shouldDisableScopedAttribute() {
		var windowDisable;
		if (typeof window === "object") windowDisable = window.__dui_disable_scoped_attribute__;
		var globalDisable;
		if (typeof globalThis === "object") globalDisable = globalThis.__dui_disable_scoped_attribute__;
		return Boolean(windowDisable || globalDisable);
	}
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/utils/style.js
var require_style = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.injectStyle = void 0;
	var version_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_version());
	var createElement_1 = require_createElement();
	var helper_1 = require_helper();
	var bundledBy = "1";
	var styleRegistryManage = new (function() {
		function StyleRegistryManage() {
			var globalObj = helper_1.isBrowser ? window : globalThis;
			globalObj.__dui_style_registry__ = globalObj.__dui_style_registry__ || {};
			this.registry = globalObj.__dui_style_registry__;
		}
		Object.defineProperty(StyleRegistryManage.prototype, "length", {
			get: function() {
				return Object.keys(this.registry).length;
			},
			enumerable: false,
			configurable: true
		});
		StyleRegistryManage.prototype.set = function(key, bundledsBy) {
			this.registry[key] = bundledsBy;
		};
		StyleRegistryManage.prototype.get = function(key) {
			return this.registry[key];
		};
		StyleRegistryManage.prototype.add = function(key, bundledBy) {
			if (!this.registry[key]) this.registry[key] = [];
			this.registry[key].push(bundledBy);
		};
		return StyleRegistryManage;
	}())();
	function injectStyle(fileKey, css) {
		var key = version_1.default + "-" + fileKey;
		var domKey = createElement_1.isScopedAttributeDisabled ? fileKey : key;
		var hasElement = Boolean(helper_1.isBrowser && document.head.querySelector("style[data-dui-key=\"" + domKey + "\"]") || !helper_1.isBrowser);
		if (Array.isArray(styleRegistryManage.get(key)) && hasElement) {
			styleRegistryManage.add(key, bundledBy);
			warnRedundantInject(key);
			return;
		}
		styleRegistryManage.set(key, [bundledBy]);
		var versions = getFileVersions(fileKey);
		if (versions.length > 1) warnMultipleVersions(fileKey, versions);
		if (helper_1.isBrowser) {
			var styleElement = document.createElement("style");
			styleElement.setAttribute("type", "text/css");
			styleElement.setAttribute("data-dui-key", domKey);
			styleElement.innerText = css;
			var currentVersionElementSelector = createElement_1.isScopedAttributeDisabled ? "style[data-dui-key]" : "style[data-dui-key|=\"" + version_1.default + "\"]";
			var existingElements = document.head.querySelectorAll(currentVersionElementSelector);
			if (existingElements.length > 0) {
				existingElements[existingElements.length - 1].after(styleElement);
				return;
			}
			document.head.insertBefore(styleElement, document.head.firstChild);
		} else if (typeof injectContentBeforeRoot === "function") {
			var styleElement = "<style type=\"text/css\" data-dui-key=\"" + domKey + "\">" + css + "</style>";
			injectContentBeforeRoot(styleElement);
		}
	}
	exports.injectStyle = injectStyle;
	var CONSOLE_DEBOUNCE = 3e3;
	function warnRedundantInject(key) {
		if (!helper_1.isBrowser || !styleRegistryManage.length || !Array.isArray(styleRegistryManage.get(key))) return;
		var count = styleRegistryManage.get(key).length;
		setTimeout(function() {
			if (styleRegistryManage.get(key).length > count) return;
			console.warn("[DUI] " + key + " 重复引入了 " + count + " 次");
		}, CONSOLE_DEBOUNCE);
	}
	function warnMultipleVersions(fileKey, versions) {
		if (!helper_1.isBrowser) return;
		setTimeout(function() {
			if (getFileVersions(fileKey).length > versions.length) return;
			console.warn("[DUI] " + fileKey + " 存在多个版本:  " + versions.join("  "));
		}, CONSOLE_DEBOUNCE);
	}
	function getFileVersions(fileKey) {
		if (!styleRegistryManage.length) return [];
		return Object.getOwnPropertyNames(styleRegistryManage.registry).filter(function(k) {
			return k.indexOf(fileKey) !== -1;
		}).map(function(k) {
			return k.split("-")[0];
		});
	}
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/utils/polyfill.js
var require_polyfill = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	if (typeof String.prototype.repeat !== "function") String.prototype.repeat = function(count) {
		"use strict";
		if (this == null) throw new TypeError("can't convert " + this + " to object");
		var str = "" + this;
		count = +count;
		if (count != count) count = 0;
		if (count < 0) throw new RangeError("repeat count must be non-negative");
		if (count == Infinity) throw new RangeError("repeat count must be less than infinity");
		count = Math.floor(count);
		if (str.length == 0 || count == 0) return "";
		if (str.length * count >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");
		var maxCount = str.length * count;
		count = Math.floor(Math.log(count) / Math.log(2));
		while (count) {
			str += str;
			count--;
		}
		str += str.substring(0, maxCount - str.length);
		return str;
	};
	if (typeof String.prototype.padStart !== "function") String.prototype.padStart = function padStart(maxLength, fillString) {
		maxLength = maxLength >> 0;
		fillString = String(typeof fillString !== "undefined" ? fillString : " ");
		if (this.length > maxLength) return String(this);
		else {
			maxLength = maxLength - this.length;
			if (maxLength > fillString.length) fillString += fillString.repeat(maxLength / fillString.length);
			return fillString.slice(0, maxLength) + String(this);
		}
	};
	if (typeof Array.prototype.fill !== "function") Array.prototype.fill = function fill(value) {
		if (this == null) throw new TypeError("this is null or not defined");
		var O = Object(this);
		var len = O.length >>> 0;
		var relativeStart = arguments[1] >> 0;
		var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
		var end = arguments[2];
		var relativeEnd = end === void 0 ? len : end >> 0;
		var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
		while (k < final) {
			O[k] = value;
			k++;
		}
		return O;
	};
	if (typeof Element !== "undefined" && typeof Element.prototype.remove !== "function") Element.prototype.remove = function() {
		if (this.parentNode) this.parentNode.removeChild(this);
	};
	if (!Array.prototype.findIndex) Array.prototype.findIndex = function(predicate) {
		if (this == null) throw new TypeError("\"this\" is null or not defined");
		var o = Object(this);
		var len = o.length >>> 0;
		if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
		var thisArg = arguments[1];
		var k = 0;
		while (k < len) {
			var kValue = o[k];
			if (predicate.call(thisArg, kValue, k, o)) return k;
			k++;
		}
		return -1;
	};
	if (!Array.prototype.includes) Array.prototype.includes = function(valueToFind, fromIndex) {
		if (this == null) throw new TypeError("\"this\" is null or not defined");
		var o = Object(this);
		var len = o.length >>> 0;
		if (len === 0) return false;
		var n = fromIndex | 0;
		var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		function sameValueZero(x, y) {
			return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
		}
		while (k < len) {
			if (sameValueZero(o[k], valueToFind)) return true;
			k++;
		}
		return false;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/utils/theme.js
var require_theme = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createThemedClassNames = exports.consumeTheme = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var classnames_1 = tslib_1.__importDefault(require_classnames());
	var docs_user_agent_1 = tslib_1.__importDefault((init_esm(), __toCommonJS(esm_exports)));
	require_polyfill();
	require_style().injectStyle("common/global.css", "[data-dui-1-28-2]{font-family:-apple-system,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,TdocsUncommon}[data-dui-1-28-2]:focus{outline:none}.__DARK__{--dui-mask-color:rgba(0,0,0,0.65);--dui-shadow-color:rgba(0,0,0,0.16);--dui-invert-filter:invert() hue-rotate(180deg) brightness(120%) grayscale()}");
	if (docs_user_agent_1.default.isMac && !docs_user_agent_1.default.isIPadEmulatedMac && !docs_user_agent_1.default.isFirefox) require_style().injectStyle("common/anti-alias.css", "[data-dui-1-28-2]{-webkit-font-smoothing:antialiased}[data-dui-1-28-2~=\"dui-button\"]{font-weight:500}");
	var ThemeContext = React.createContext(null);
	function consumeTheme(renderProp) {
		return h(ThemeContext.Consumer, null, function(themeConfig) {
			return renderProp(createThemedClassNames(themeConfig));
		});
	}
	exports.consumeTheme = consumeTheme;
	function appendThemeClassNames(themeConfig, className) {
		if (!className || !themeConfig) return className;
		var currentClassList = className.split(/\s+/);
		return currentClassList.concat.apply(currentClassList, currentClassList.map(function(name) {
			return themeConfig[name];
		}).filter(function(name) {
			return name;
		})).join(" ");
	}
	function createThemedClassNames(themeConfig) {
		return (function() {
			var classes = [];
			for (var _i = 0; _i < arguments.length; _i++) classes[_i] = arguments[_i];
			return appendThemeClassNames(themeConfig, classnames_1.default.apply(void 0, classes));
		});
	}
	exports.createThemedClassNames = createThemedClassNames;
	exports.default = ThemeContext;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/utils/keepDom.js
var require_keepDom = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decideKeepDom = void 0;
	function decideKeepDom(animationDuration, visible) {
		var _this = this;
		var willLeave = !visible && this._ALC_HELPER_prevVisible;
		this._ALC_HELPER_prevVisible = visible;
		if (visible) return true;
		if (!willLeave) return false;
		setTimeout(function() {
			_this.forceUpdate();
		}, animationDuration);
		return true;
	}
	exports.decideKeepDom = decideKeepDom;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/utils/show.js
var require_show = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.showWithTransition = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var helper_1 = require_helper();
	function showWithTransition(_a) {
		var Component = _a.Component, transitionDuration = _a.transitionDuration, autoClose = _a.autoClose, props = _a.props, forcedProps = _a.forcedProps, _b = _a.injectClosePropNames, injectClosePropNames = _b === void 0 ? [] : _b, _c = _a.deepInjectClose, deepInjectClose = _c === void 0 ? [] : _c, contexts = _a.contexts;
		var div = document.createElement("div");
		document.body.appendChild(div);
		var timer;
		var closed = false;
		injectClosePropNames.forEach(function(key) {
			overrideSingle(props, key);
		});
		deepInjectClose.forEach(function(_a) {
			var reference = _a[0], key = _a[1];
			if (Array.isArray(reference)) {
				reference.forEach(function(obj) {
					return overrideSingle(obj, key);
				});
				return;
			}
			overrideSingle(reference, key);
		});
		var currentProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, props), forcedProps), { visible: true });
		function overrideSingle(obj, key) {
			var originalValue = obj[key] || helper_1.emptyFn;
			obj[key] = helper_1.inject(originalValue, close);
		}
		function update(newProps) {
			if (closed) return;
			currentProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, currentProps), newProps), forcedProps), { visible: true });
			render(currentProps);
		}
		function close() {
			if (closed) return;
			closed = true;
			clearTimeout(timer);
			currentProps = tslib_1.__assign(tslib_1.__assign({}, currentProps), { visible: false });
			render(currentProps);
			setTimeout(function() {
				react_dom_1.default.unmountComponentAtNode(div);
				div.remove();
			}, transitionDuration + 20);
		}
		function render(props) {
			var element = (contexts === null || contexts === void 0 ? void 0 : contexts.length) ? composeContexts(contexts, h(Component, tslib_1.__assign({}, props))) : h(Component, tslib_1.__assign({}, props));
			react_dom_1.default.render(element, div);
		}
		render(currentProps);
		if (autoClose) timer = setTimeout(close, props.duration || 2e3);
		return {
			update,
			close
		};
	}
	exports.showWithTransition = showWithTransition;
	function composeContexts(contexts, children) {
		return contexts.reduce(function(child, _a) {
			var Provider = _a.provider, value = _a.value;
			return h(Provider, { value }, child);
		}, children);
	}
}));
//#endregion
export { require_createElement as a, require_style as i, require_keepDom as n, require_helper as o, require_theme as r, require_show as t };
