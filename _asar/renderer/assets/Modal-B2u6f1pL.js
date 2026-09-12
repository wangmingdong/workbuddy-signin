import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { n as init_esm, t as esm_exports } from "./esm-mgJiqgJI.js";
import { r as memoize_one_esm_exports, t as init_memoize_one_esm } from "./memoize-one.esm-vG75mWtZ.js";
import { t as require_locale } from "./locale-CF4APsfG.js";
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/common/version.js
var require_version = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "1.7.3-beta-enterprise.64";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/common/attribute.js
var require_attribute = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "data-dui-" + (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_version()).default.replace(/\./g, "-");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/helper.js
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
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/createElement.js
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
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/polyfill.js
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
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/style.js
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
		var hasElement = Boolean(helper_1.isBrowser && document.querySelector("style[data-dui-key=\"" + domKey + "\"]") || !helper_1.isBrowser);
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
			document.head.appendChild(styleElement);
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
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/theme.js
var require_theme = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createThemedClassNames = exports.consumeTheme = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var classnames_1 = tslib_1.__importDefault(require_classnames());
	var docs_user_agent_1 = tslib_1.__importDefault((init_esm(), __toCommonJS(esm_exports)));
	require_polyfill();
	require_style().injectStyle("common/global.css", "[data-dui-1-7-3-beta-enterprise-64]{font-family:-apple-system,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,TdocsUncommon}[data-dui-1-7-3-beta-enterprise-64]:focus{outline:none}");
	if (docs_user_agent_1.default.isMac && !docs_user_agent_1.default.isIPadEmulatedMac && !docs_user_agent_1.default.isFirefox) require_style().injectStyle("common/anti-alias.css", "[data-dui-1-7-3-beta-enterprise-64]{-webkit-font-smoothing:antialiased}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button\"]{font-weight:500}");
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
		return function() {
			var classes = [];
			for (var _i = 0; _i < arguments.length; _i++) classes[_i] = arguments[_i];
			return appendThemeClassNames(themeConfig, classnames_1.default.apply(void 0, classes));
		};
	}
	exports.createThemedClassNames = createThemedClassNames;
	exports.default = ThemeContext;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/components/Button/Button.js
var require_Button$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var theme_1 = require_theme();
	var Button = function(_super) {
		tslib_1.__extends(Button, _super);
		function Button() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, type = _b.type, size = _b.size, disabled = _b.disabled, disabledEffect = _b.disabledEffect, icon = _b.icon, testId = _b.testId, rest = tslib_1.__rest(_b, [
					"prefixCls",
					"className",
					"style",
					"type",
					"size",
					"disabled",
					"disabledEffect",
					"icon",
					"testId"
				]);
				var cls = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-type-" + type] = type, _a[prefixCls + "-size-" + size] = size, _a[prefixCls + "-with-icon"] = icon, _a[prefixCls + "-type-" + type + "-disabled"] = disabled, _a[prefixCls + "-disabled-" + disabledEffect] = disabled, _a));
				var containerCls = classNames(prefixCls + "-container");
				var iconCls = classNames(prefixCls + "-icon");
				return h("button", tslib_1.__assign({}, rest, {
					className: cls,
					style,
					disabled,
					"data-testid": testId
				}), h("div", { className: containerCls }, icon ? typeof icon === "string" ? h("span", {
					className: iconCls,
					style: { backgroundImage: "url(\"" + icon + "\")" }
				}) : icon : null, _this.props.children));
			};
			return _this;
		}
		Button.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		return Button;
	}(React.Component);
	exports.default = Button;
	Button.defaultProps = {
		prefixCls: "dui-button",
		type: "default",
		size: "default",
		disabledEffect: "default"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/components/Button/index.js
var require_Button = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Button = void 0;
	var Button_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_Button$1());
	exports.Button = Button_1.default;
	require_style().injectStyle("components/Button/style/index.css", "[data-dui-1-7-3-beta-enterprise-64~=\"dui-button\"]{outline:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;white-space:nowrap;border-radius:4px;border:1px solid transparent;font-size:14px;padding:0 29px;-webkit-tap-highlight-color:transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-default\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08));color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-default\"]:hover{background:var(--tsp-fill-strong,rgba(61,82,102,.12))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-default\"]:active{background:var(--tsp-fill-ultrastrong,rgba(61,82,102,.16))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-primary\"]{background:var(--accent-default,#1e6fff);color:var(--text-white,#fff)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-primary\"]:hover{background:var(--accent-hover,#175ceb)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-primary\"]:active{background:var(--accent-pressed,#134ae0)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-warning\"]{background:var(--critical-default,#ff4747);color:#fff}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-warning\"]:hover{background:var(--critical-hover,#eb3639)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-warning\"]:active{background:var(--critical-pressed,#e02424)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-plain\"]{background:var(--bg-lv1-default,#fff);color:var(--text-link,#175ceb)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-plain\"]:hover{background:var(--bg-lv1-weak,#f9fafb)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-plain\"]:active{background:var(--bg-lv1-medium,#f3f5f7)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"]{background:-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(270deg,#fdc668,#fcdb9f);border:none;color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{margin:0 1px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"]:hover{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.04)),to(rgba(0,0,0,.04))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.04),rgba(0,0,0,.04)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.04),rgba(0,0,0,.04)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"]:active{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.08)),to(rgba(0,0,0,.08))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.08),rgba(0,0,0,.08)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.08),rgba(0,0,0,.08)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"]{background:-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%);border:none;color:#fae0a5}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{margin:0 1px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"]:hover{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.16),rgba(0,0,0,.16)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.16),rgba(0,0,0,.16)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"]:active{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.32),rgba(0,0,0,.32)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.32),rgba(0,0,0,.32)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-outline\"]{border-color:#db8f1c;color:#db8f1c;background:#fff}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-outline\"]:hover{background:rgba(219,143,28,.1)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-outline\"]:active{background:rgba(219,143,28,.2)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button\"]:disabled{pointer-events:none;cursor:auto}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-disabled-default\"]:disabled{color:var(--text-weak,rgba(0,0,0,.24));background:var(--tsp-fill-weak,rgba(51,77,102,.06));border-color:transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-disabled-faded\"]:disabled{opacity:.4}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-large\"]{height:36px;min-width:156px;font-size:16px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-default\"]{height:36px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-small\"]{height:28px;padding:0 17px;font-size:12px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-small\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{line-height:26px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-with-icon\"]{padding:0 9px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-icon\"]{display:inline-block;width:18px;height:18px;background-size:contain;background-repeat:no-repeat;background-position:50%;margin-right:4px}");
	exports.default = Button_1.default;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/components/Modal/Dragger.js
var require_Dragger = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var helper_1 = require_helper();
	var theme_1 = require_theme();
	var Dragger = function(_super) {
		tslib_1.__extends(Dragger, _super);
		function Dragger() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.ref = null;
			_this.minLeft = 0;
			_this.minTop = 0;
			_this.setRef = function(ref) {
				_this.ref = ref;
			};
			_this.onMouseDown = function(e) {
				var _a, _b;
				(_b = (_a = _this.props).onMouseDown) === null || _b === void 0 || _b.call(_a, e);
				if (!_this.props.draggable || !_this.ref || _this.isFromInnerInput(e)) return;
				_this.mouse = true;
				var _c = _this.ref.getBoundingClientRect(), left = _c.left, top = _c.top, width = _c.width, height = _c.height;
				var clientX = e.clientX, clientY = e.clientY;
				_this.startLeft = left;
				_this.startTop = top;
				_this.startX = clientX;
				_this.startY = clientY;
				_this.maxLeft = window.innerWidth - width;
				_this.maxTop = window.innerHeight - height;
				_this.ref.style.userSelect = "none";
				_this.ref.parentElement.style.pointerEvents = "auto";
			};
			_this.onMouseMove = function(e) {
				if (!_this.mouse || !_this.ref) return;
				var clientX = e.clientX, clientY = e.clientY;
				var left = _this.startLeft + clientX - _this.startX;
				var top = _this.startTop + clientY - _this.startY;
				left = Math.min(Math.max(_this.minLeft, left), _this.maxLeft);
				top = Math.min(Math.max(_this.minTop, top), _this.maxTop);
				var beforeDragMove = _this.props.beforeDragMove;
				var moveResult = beforeDragMove === null || beforeDragMove === void 0 ? void 0 : beforeDragMove(top, left);
				if (moveResult) {
					var canMoveLeft = moveResult.canMoveLeft, canMoveTop = moveResult.canMoveTop;
					if (canMoveLeft) _this.ref.style.left = left + "px";
					if (canMoveTop) _this.ref.style.top = top + "px";
				} else {
					_this.ref.style.left = left + "px";
					_this.ref.style.top = top + "px";
				}
				_this.ref.style.position = "absolute";
			};
			_this.onMouseUp = function(e) {
				if (!_this.ref) return;
				_this.mouse = false;
				_this.ref.style.userSelect = "auto";
				_this.ref.parentElement.style.pointerEvents = "";
				var _a = _this.props, onDragEnd = _a.onDragEnd;
				if (_a.draggable === true) onDragEnd(e);
			};
			_this.themedRender = function(classNames) {
				var _a = _this.props, children = _a.children, className = _a.className, prefixCls = _a.prefixCls, style = _a.style;
				_a.onDragEnd;
				_a.draggable;
				var rest = tslib_1.__rest(_a, [
					"children",
					"className",
					"prefixCls",
					"style",
					"onDragEnd",
					"draggable"
				]);
				var cls = classNames(prefixCls, className);
				return h("div", tslib_1.__assign({}, rest, {
					className: cls,
					style,
					ref: _this.setRef,
					onMouseDown: _this.onMouseDown,
					tabIndex: -1
				}), children);
			};
			return _this;
		}
		Dragger.prototype.componentDidMount = function() {
			document.body.addEventListener("mousemove", this.onMouseMove);
			document.body.addEventListener("mouseup", this.onMouseUp);
		};
		Dragger.prototype.componentWillUnmount = function() {
			document.body.removeEventListener("mousemove", this.onMouseMove);
			document.body.removeEventListener("mouseup", this.onMouseUp);
		};
		Dragger.prototype.isFromInnerInput = function(e) {
			var _a;
			var target = e.target;
			return Boolean(/input|textarea/i.test(target.tagName) && ((_a = this.ref) === null || _a === void 0 ? void 0 : _a.contains(target)));
		};
		Dragger.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		return Dragger;
	}(React.Component);
	exports.default = Dragger;
	Dragger.defaultProps = {
		prefixCls: "dui-dragger",
		onDragEnd: helper_1.emptyFn,
		onClick: helper_1.emptyFn,
		draggable: false
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/keepDom.js
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
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/components/Snackbar/context.js
var require_context = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContainerContext = void 0;
	exports.ContainerContext = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importStar(require_react()).createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/preventScrollPenetrate.js
var require_preventScrollPenetrate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toggleGlobalScrollEvents = exports.PreventScrollPenetrateContainer = exports.preventSelfScrollPenetrate = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var STYLUS_TOUCH_MOVE_CLICK_DISTANCE = 10;
	function preventSelfScrollPenetrate(container, direction, stopPropagationBorder) {
		if (direction === void 0) direction = "y";
		if (stopPropagationBorder === void 0) stopPropagationBorder = null;
		if (!container || container.__preventSelfScrollPenetrate) return;
		var prevX;
		var prevY;
		var reachBorderInScroll = null;
		var handleTouchStart = function(event) {
			reachBorderInScroll = null;
			var touch = event.touches[0];
			prevX = touch.screenX;
			prevY = touch.screenY;
		};
		var handleTouchMove = function(event) {
			var touch = event.touches[0];
			var deltaX = touch.screenX - prevX;
			var deltaY = touch.screenY - prevY;
			var isAtLowerX = direction === "x" && container.scrollLeft === 0;
			var isAtUpperX = direction === "x" && container.scrollLeft === container.scrollWidth - container.offsetWidth;
			var isAtLowerY = direction === "y" && container.scrollTop === 0;
			var isAtUpperY = direction === "y" && container.scrollTop === container.scrollHeight - container.offsetHeight;
			var isScrollingBeyondBorder = direction === "x" ? deltaX > 0 && isAtLowerX || deltaX < 0 && isAtUpperX : deltaY > 0 && isAtLowerY || deltaY < 0 && isAtUpperY;
			var currentBorder = isAtLowerX || isAtLowerY ? "lower" : isAtUpperX || isAtUpperY ? "upper" : null;
			if (isScrollingBeyondBorder) {
				event.cancelable && event.preventDefault();
				if (reachBorderInScroll !== currentBorder) {
					container.dispatchEvent(new TouchEvent("touchstart", event));
					reachBorderInScroll = currentBorder;
				}
				stopPropagationBorder === currentBorder && event.stopPropagation();
			} else event.stopPropagation();
		};
		container.addEventListener("touchstart", handleTouchStart);
		container.addEventListener("touchmove", handleTouchMove, { passive: false });
		container.__preventSelfScrollPenetrate = true;
	}
	exports.preventSelfScrollPenetrate = preventSelfScrollPenetrate;
	exports.PreventScrollPenetrateContainer = function(_super) {
		tslib_1.__extends(PreventScrollPenetrateContainer, _super);
		function PreventScrollPenetrateContainer() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.domRef = React.createRef();
			_this.isInnerScroll = false;
			_this.startScreenX = -1;
			_this.startScreenY = -1;
			_this.handleTouchStart = function(event) {
				var container = _this.domRef.current;
				if (!container) return;
				var path = event.composedPath();
				var touch = event.touches[0];
				_this.startScreenX = touch.screenX;
				_this.startScreenY = touch.screenY;
				for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
					var elem = path_1[_i];
					if (!container.contains(elem)) {
						_this.isInnerScroll = false;
						return;
					}
					if (elem.scrollHeight > elem.clientHeight) {
						_this.isInnerScroll = true;
						preventSelfScrollPenetrate(elem);
						return;
					}
				}
				_this.isInnerScroll = false;
			};
			_this.handleTouchMove = function(event) {
				if (_this.isInnerScroll) return;
				var touch = event.touches[0];
				if (touch.touchType === "stylus" && calcDistance(_this.startScreenX, _this.startScreenY, touch.screenX, touch.screenY) < STYLUS_TOUCH_MOVE_CLICK_DISTANCE) return;
				event.cancelable && event.preventDefault();
			};
			return _this;
		}
		PreventScrollPenetrateContainer.prototype.componentDidMount = function() {
			var container = this.domRef.current;
			container.addEventListener("touchstart", this.handleTouchStart);
			container.addEventListener("touchmove", this.handleTouchMove, { passive: false });
		};
		PreventScrollPenetrateContainer.prototype.render = function() {
			return h("div", tslib_1.__assign({}, this.props, { ref: this.domRef }), this.props.children);
		};
		return PreventScrollPenetrateContainer;
	}(React.Component);
	function calcDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
	var globalScrollProperty = "";
	function toggleGlobalScrollEvents(disabled) {
		if (disabled && !globalScrollProperty) {
			globalScrollProperty = document.documentElement.style.overflow || "initial";
			document.documentElement.style.overflow = "hidden";
		}
		if (!disabled && globalScrollProperty) {
			document.documentElement.style.overflow = globalScrollProperty;
			globalScrollProperty = "";
		}
	}
	exports.toggleGlobalScrollEvents = toggleGlobalScrollEvents;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/stylusAdapter.js
var require_stylusAdapter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WithStylusClick = exports.StylusAdapter = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var react_1 = tslib_1.__importDefault(require_react());
	var docs_user_agent_1 = tslib_1.__importDefault((init_esm(), __toCommonJS(esm_exports)));
	var TouchType;
	(function(TouchType) {
		TouchType["direct"] = "direct";
		TouchType["stylus"] = "stylus";
	})(TouchType || (TouchType = {}));
	var StylusAdapter = function() {
		function StylusAdapter() {}
		StylusAdapter.supportStylus = function(event, callback) {
			if (!this.isIPadStylusTouch(event)) return;
			if (event.nativeEvent.type === "touchstart") {
				this.startPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				return;
			}
			if (event.nativeEvent.type === "touchend") {
				var endPos = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
				if (this.isEqualPos(this.startPos, endPos) && callback) callback();
				event.preventDefault();
			}
		};
		StylusAdapter.startPos = [0, 0];
		StylusAdapter.isIPadStylusTouch = function(event) {
			return docs_user_agent_1.default.isIPad && event.changedTouches[0] && event.changedTouches[0].touchType === TouchType.stylus;
		};
		StylusAdapter.isEqualPos = function(pos1, pos2) {
			return Math.abs(pos1[0] - pos2[0]) < 10 && Math.abs(pos1[1] - pos2[1]) < 10;
		};
		return StylusAdapter;
	}();
	exports.StylusAdapter = StylusAdapter;
	var WithStylusClick = function(_a) {
		var children = _a.children, clickHandler = _a.clickHandler;
		return react_1.default.cloneElement(children, {
			onClick: clickHandler,
			onTouchStart: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			},
			onTouchEnd: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			}
		});
	};
	exports.WithStylusClick = WithStylusClick;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/focus.js
var require_focus = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.restoreFocus = exports.saveFocus = exports.traverseFocusIn = void 0;
	var BASE_FOCUSABLE_SELECTORS = [
		"a[href]",
		"area[href]",
		"input:not([disabled]):not([type=\"hidden\"]):not([aria-hidden])",
		"select:not([disabled]):not([aria-hidden])",
		"textarea:not([disabled]):not([aria-hidden])",
		"button:not([disabled]):not([aria-hidden])",
		"iframe",
		"object",
		"embed",
		"[contenteditable]",
		"[tabindex]:not([tabindex^=\"-\"])"
	];
	function getFocusableNodesIn(container) {
		return Array.prototype.slice.call(container.querySelectorAll(BASE_FOCUSABLE_SELECTORS));
	}
	function traverseFocusIn(container, e, isReverse) {
		if (isReverse === void 0) isReverse = e === null || e === void 0 ? void 0 : e.shiftKey;
		var focusableNodes = getFocusableNodesIn(container);
		if (focusableNodes.length === 0) return;
		var focusedIndex = focusableNodes.indexOf(document.activeElement);
		var focusElement;
		if (focusedIndex < 0) focusElement = focusableNodes[0];
		else focusElement = focusableNodes[(focusedIndex + (isReverse ? -1 : 1) + focusableNodes.length) % focusableNodes.length];
		focusElement.focus();
		focusElement.scrollIntoView({
			block: "nearest",
			inline: "nearest"
		});
		e === null || e === void 0 || e.preventDefault();
	}
	exports.traverseFocusIn = traverseFocusIn;
	var activeElement = null;
	function saveFocus() {
		activeElement = document.activeElement;
	}
	exports.saveFocus = saveFocus;
	function runRestoreFocus() {
		activeElement === null || activeElement === void 0 || activeElement.focus();
		activeElement = null;
	}
	function restoreFocus() {
		if (!activeElement) return;
		if (activeElement.tagName === "BUTTON") setTimeout(runRestoreFocus, 0);
		else runRestoreFocus();
	}
	exports.restoreFocus = restoreFocus;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/components/Modal/Modal.js
var require_Modal$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MODAL_TRANSITION_OUT_DURATION = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var helper_1 = require_helper();
	var index_1 = tslib_1.__importDefault(require_Button());
	var Dragger_1 = tslib_1.__importDefault(require_Dragger());
	var keepDom_1 = require_keepDom();
	var context_1 = require_context();
	var theme_1 = require_theme();
	var preventScrollPenetrate_1 = require_preventScrollPenetrate();
	var stylusAdapter_1 = require_stylusAdapter();
	var focus_1 = require_focus();
	var locale_1 = require_locale();
	exports.MODAL_TRANSITION_OUT_DURATION = 240;
	var MODAL_TRANSITION_IN_DURATION = 300;
	var Modal = function(_super) {
		tslib_1.__extends(Modal, _super);
		function Modal() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.draggerRef = React.createRef();
			_this.footerRef = React.createRef();
			_this.isComposing = false;
			_this.mouseDownTarget = null;
			_this.handleClose = function(e) {
				var _a = _this.props, onClose = _a.onClose, onCancel = _a.onCancel;
				if (!_a.visible) return;
				(onClose || onCancel)(e);
			};
			_this.handleMaskClick = function(e) {
				var _a;
				var _b = _this.props, maskClosable = _b.maskClosable, onClickMask = _b.onClickMask;
				if ((_a = _this.draggerDom) === null || _a === void 0 ? void 0 : _a.contains(_this.mouseDownTarget)) return;
				if (maskClosable === true) _this.handleClose(e);
				onClickMask(e);
			};
			_this.handleDraggerClick = function(e) {
				e.stopPropagation();
			};
			_this.handleDraggerMouseDown = function(e) {
				_this.mouseDownTarget = e.target;
			};
			_this.handleCompositionStart = function() {
				_this.isComposing = true;
			};
			_this.handleCompositionEnd = function() {
				_this.isComposing = false;
			};
			_this.handleKeyDown = function(e) {
				var _a;
				var _b = _this.props, visible = _b.visible, footer = _b.footer, okDisabled = _b.okDisabled, cancelText = _b.cancelText, closable = _b.closable;
				if (!visible || _this.isComposing) return;
				if (e.key === "Tab") {
					_this.traverseFocus(e);
					return;
				}
				if (footer || footer === null) return;
				if (!okDisabled && e.key === "Enter" && !((_a = _this.footerRef.current) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement))) _this.handleClickOk();
				else if ((cancelText || closable) && e.key === "Escape") _this.handleClose();
			};
			_this.handleClickOk = function(e) {
				var _a = _this.props, visible = _a.visible, onOk = _a.onOk, okDisabled = _a.okDisabled;
				if (!visible || okDisabled) return;
				onOk(e);
			};
			_this.handleClickCancel = function(e) {
				var _a = _this.props, visible = _a.visible, onCancel = _a.onCancel;
				if (!visible) return;
				onCancel(e);
			};
			_this.handleClickAction = function(e) {
				var _a = _this.props, visible = _a.visible, onClickAction = _a.onClickAction;
				if (!visible) return;
				onClickAction(e);
			};
			_this.clearMouseDownTarget = function() {
				setTimeout(function() {
					_this.mouseDownTarget = null;
				}, 0);
			};
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, title = _c.title, visible = _c.visible, maskStyle = _c.maskStyle, maskClassName = _c.maskClassName, mask = _c.mask, draggable = _c.draggable, onDragEnd = _c.onDragEnd, destroyOnClose = _c.destroyOnClose, zIndex = _c.zIndex, containerDom = _c.containerDom, header = _c.header, testId = _c.testId, icon = _c.icon, beforeDragMove = _c.beforeDragMove, _d = _c.widthAnimation, widthAnimation = _d === void 0 ? true : _d;
				var cls = classNames(prefixCls, className, prefixCls + "-" + (visible ? "visible" : "hidden"), (_a = {}, _a[prefixCls + "-with-icon"] = icon, _a[prefixCls + "-no-animation"] = !widthAnimation, _a));
				var maskCls = classNames(prefixCls + "-mask", maskClassName, prefixCls + "-mask-" + (visible ? "visible" : "hidden"), (_b = {}, _b[prefixCls + "-mask-display"] = mask, _b[prefixCls + "-mask-in-container"] = containerDom !== document.body, _b[prefixCls + "-no-animation"] = !widthAnimation, _b));
				if (!containerDom || destroyOnClose && !keepDom_1.decideKeepDom.call(_this, widthAnimation ? exports.MODAL_TRANSITION_OUT_DURATION : 0, visible)) return null;
				return react_dom_1.default.createPortal(h(context_1.ContainerContext.Provider, { value: _this.draggerDom }, h(preventScrollPenetrate_1.PreventScrollPenetrateContainer, {
					className: maskCls,
					style: tslib_1.__assign({ zIndex }, maskStyle),
					onClick: _this.handleMaskClick,
					"aria-hidden": !visible
				}, h(Dragger_1.default, {
					className: cls,
					style,
					draggable,
					ref: _this.draggerRef,
					"data-testid": testId,
					onDragEnd,
					onClick: _this.handleDraggerClick,
					onKeyDown: _this.handleKeyDown,
					onMouseDown: _this.handleDraggerMouseDown,
					onCompositionStart: _this.handleCompositionStart,
					onCompositionEnd: _this.handleCompositionEnd,
					beforeDragMove
				}, _this.renderClose(classNames), _this.renderIcon(classNames), header ? h("div", { className: classNames(prefixCls + "-header") }, header) : null, title !== null ? h("div", { className: classNames(prefixCls + "-title") }, title) : null, _this.renderContent(classNames), _this.renderFooter(classNames)))), containerDom);
			};
			return _this;
		}
		Object.defineProperty(Modal.prototype, "draggerDom", {
			get: function() {
				var _a;
				return (_a = this.draggerRef.current) === null || _a === void 0 ? void 0 : _a.ref;
			},
			enumerable: false,
			configurable: true
		});
		Modal.prototype.isFocusInside = function() {
			var _a;
			return (_a = this.draggerDom) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement);
		};
		Modal.prototype.focusSelf = function() {
			var _this = this;
			var _a = this.props, visible = _a.visible, autoFocus = _a.autoFocus, _b = _a.widthAnimation, widthAnimation = _b === void 0 ? true : _b;
			if (visible && autoFocus && !this.isFocusInside()) {
				focus_1.saveFocus();
				setTimeout(function() {
					var _a;
					!_this.isFocusInside() && ((_a = _this.draggerDom) === null || _a === void 0 || _a.focus());
				}, widthAnimation ? MODAL_TRANSITION_IN_DURATION : 20);
			}
		};
		Modal.prototype.restorePreviousFocus = function() {
			var _a = this.props, visible = _a.visible, autoFocus = _a.autoFocus;
			if (!visible && autoFocus) focus_1.restoreFocus();
		};
		Modal.prototype.traverseFocus = function(e) {
			var container = this.draggerDom;
			if (!container) return;
			focus_1.traverseFocusIn(container, e);
		};
		Modal.prototype.componentDidMount = function() {
			this.forceUpdate();
			this.focusSelf();
			var _a = this.props, visible = _a.visible, mask = _a.mask, containerDom = _a.containerDom;
			preventScrollPenetrate_1.toggleGlobalScrollEvents(Boolean(visible && mask));
			containerDom === null || containerDom === void 0 || containerDom.addEventListener("click", this.clearMouseDownTarget);
		};
		Modal.prototype.componentDidUpdate = function(prevProps) {
			if (!prevProps.visible) this.focusSelf();
			else this.restorePreviousFocus();
			var _a = this.props, visible = _a.visible, mask = _a.mask;
			preventScrollPenetrate_1.toggleGlobalScrollEvents(Boolean(visible && mask));
		};
		Modal.prototype.componentWillUnmount = function() {
			var _a;
			preventScrollPenetrate_1.toggleGlobalScrollEvents(false);
			(_a = this.props.containerDom) === null || _a === void 0 || _a.removeEventListener("click", this.clearMouseDownTarget);
		};
		Modal.prototype.renderAction = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, action = _a.action, actionButtonType = _a.actionButtonType;
			if (!action) return null;
			var actionMainNode;
			var icon;
			if (action !== null && typeof action === "object") if (React.isValidElement(action)) actionMainNode = action;
			else {
				if ("text" in action) actionMainNode = action.text;
				if ("icon" in action) icon = action.icon;
			}
			else actionMainNode = action;
			return h(stylusAdapter_1.WithStylusClick, { clickHandler: this.handleClickAction }, actionButtonType ? h(index_1.default, {
				icon,
				type: actionButtonType
			}, actionMainNode) : h("button", { className: classNames(prefixCls + "-footer-action") }, icon ? typeof icon === "string" ? h("div", {
				className: classNames(prefixCls + "-footer-action-icon"),
				style: { backgroundImage: "url(\"" + icon + "\")" }
			}) : icon : null, actionMainNode ? typeof actionMainNode === "string" ? h("div", { className: classNames(prefixCls + "-footer-action-text") }, actionMainNode) : actionMainNode : null));
		};
		Modal.prototype.renderFooter = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, footer = _a.footer, okText = _a.okText, cancelText = _a.cancelText, okDisabled = _a.okDisabled, okButtonType = _a.okButtonType, footerLayout = _a.footerLayout, footerDirection = _a.footerDirection, footerClassName = _a.footerClassName, footerStyle = _a.footerStyle;
			if (footer === null) return null;
			else if (footer) return footer;
			var cancelElement = cancelText ? h(stylusAdapter_1.WithStylusClick, { clickHandler: this.handleClickCancel }, h(index_1.default, null, cancelText)) : null;
			var okElement = okText ? h(stylusAdapter_1.WithStylusClick, { clickHandler: this.handleClickOk }, h(index_1.default, {
				className: classNames(prefixCls + "-footer-ok"),
				type: okButtonType,
				disabled: okDisabled
			}, okText)) : null;
			var actionElement = this.renderAction(classNames);
			var footerCls = classNames(prefixCls + "-footer", prefixCls + "-footer-" + footerLayout, footerClassName);
			var child = footerDirection === "mac" ? h(React.Fragment, null, actionElement, cancelElement, okElement) : h(React.Fragment, null, okElement, actionElement, cancelElement);
			return h("div", {
				className: footerCls,
				style: footerStyle,
				ref: this.footerRef
			}, child);
		};
		Modal.prototype.renderContent = function(classNames) {
			var _a;
			var _b = this.props, prefixCls = _b.prefixCls, title = _b.title, content = _b.content, children = _b.children, contentStyle = _b.contentStyle;
			return h("div", {
				className: classNames(prefixCls + "-content", (_a = {}, _a[prefixCls + "-content-empty-title"] = title === "", _a)),
				style: contentStyle
			}, content || children);
		};
		Modal.prototype.renderClose = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, closable = _a.closable, close = _a.close;
			if (!closable) return null;
			return h(stylusAdapter_1.WithStylusClick, { clickHandler: this.handleClose }, close ? h("div", { className: classNames(prefixCls + "-close-container") }, close) : h("div", { className: classNames(prefixCls + "-close") }));
		};
		Modal.prototype.renderIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, icon = _a.icon;
			if (!icon) return null;
			var iconCls = classNames(prefixCls + "-icon");
			if (React.isValidElement(icon)) return h("div", { className: iconCls }, icon);
			if (typeof icon === "string") return h("div", {
				className: iconCls,
				style: { backgroundImage: "url(\"" + icon + "\")" }
			});
			return h("div", { className: classNames(prefixCls + "-icon", prefixCls + "-icon-default") });
		};
		Modal.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		return Modal;
	}(React.Component);
	exports.default = Modal;
	Modal.defaultProps = {
		prefixCls: "dui-modal",
		title: "",
		content: "",
		footer: "",
		onCancel: helper_1.emptyFn,
		onOk: helper_1.emptyFn,
		cancelText: locale_1.i18n("cancel"),
		okText: locale_1.i18n("ok"),
		mask: true,
		maskClosable: false,
		closable: true,
		onDragEnd: helper_1.emptyFn,
		destroyOnClose: false,
		onClickMask: helper_1.emptyFn,
		action: "",
		onClickAction: helper_1.emptyFn,
		containerDom: typeof document !== "undefined" ? document.body : void 0,
		okDisabled: false,
		okButtonType: "primary",
		footerLayout: "default",
		footerDirection: "mac",
		autoFocus: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/utils/show.js
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
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/components/Modal/confirm.js
var require_confirm = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Modal_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importStar(require_Modal$1());
	var show_1 = require_show();
	exports.default = require_helper().wrapWithConfigDefaults(function(config) {
		config.onClose = config.onClose || config.onCancel;
		var _a = config.widthAnimation, widthAnimation = _a === void 0 ? true : _a;
		return show_1.showWithTransition({
			Component: Modal_1.default,
			transitionDuration: widthAnimation ? Modal_1.MODAL_TRANSITION_OUT_DURATION : 0,
			autoClose: false,
			props: config,
			forcedProps: { destroyOnClose: true },
			injectClosePropNames: [
				"onOk",
				"onCancel",
				"onClickAction",
				"onClose"
			],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-core/node_modules/@tencent/dui/lib/components/Modal/index.js
var require_Modal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Modal = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var Modal_1 = tslib_1.__importDefault(require_Modal$1());
	exports.Modal = Modal_1.default;
	var confirm_1 = tslib_1.__importDefault(require_confirm());
	require_style().injectStyle("components/Modal/style/index.css", "@-webkit-keyframes dui-modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-modal-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal\"]{position:relative;width:400px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:24px;border-radius:8px;pointer-events:auto;-webkit-animation:dui-modal-pop-up .3s cubic-bezier(.4,0,.2,1);animation:dui-modal-pop-up .3s cubic-bezier(.4,0,.2,1);-webkit-tap-highlight-color:transparent;-webkit-box-shadow:0 6px 32px 2px rgba(68,73,77,.16),0 0 0 1px rgba(0,0,0,.04),0 4px 6px 2px rgba(0,0,0,.04);box-shadow:0 6px 32px 2px rgba(68,73,77,.16),0 0 0 1px rgba(0,0,0,.04),0 4px 6px 2px rgba(0,0,0,.04);cursor:default;background-color:var(--bg-lv4-default,#fff)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-hidden\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-visible\"]{-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,transform,visibility;transition-property:opacity,transform,visibility,-webkit-transform}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-visible\"]{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transition-duration:.3s;transition-duration:.3s}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-hidden\"]{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1);-webkit-transition-duration:.24s;transition-duration:.24s}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-with-icon\"]{padding-left:56px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-with-icon\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer\"]{margin-left:-32px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask\"]{position:fixed;z-index:9998;top:0;left:0;right:0;bottom:0;opacity:1;pointer-events:none;-webkit-animation:dui-modal-fade-in .3s cubic-bezier(.4,0,.2,1);animation:dui-modal-fade-in .3s cubic-bezier(.4,0,.2,1);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-in-container\"]{position:absolute}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-display\"]{pointer-events:auto;background-color:hsla(0,0%,100%,.65)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-visible\"]{opacity:1;visibility:visible;-webkit-transition:all .3s cubic-bezier(.4,0,.2,1);transition:all .3s cubic-bezier(.4,0,.2,1)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-hidden\"]{opacity:0;visibility:hidden;-webkit-transition:all .24s cubic-bezier(.4,0,.2,1);transition:all .24s cubic-bezier(.4,0,.2,1)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-no-animation\"]{-webkit-transition:none;transition:none;-webkit-animation:none;animation:none}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"]{background-size:contain;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23464d5a' d='M17 7.714L12.714 12 17 16.286l-.714.714L12 12.714 7.714 17 7 16.286 11.286 12 7 7.714 7.714 7 12 11.286 16.286 7z'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;border-radius:2px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"]:hover{background-color:rgba(0,0,0,.04)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"]:active{background-color:rgba(0,0,0,.08)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close-container\"]{position:absolute;z-index:1;width:24px;height:24px;top:25px;right:24px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-icon\"]{width:20px;height:20px;position:absolute;left:24px;top:26px;background-position:50%;background-size:contain;background-repeat:no-repeat}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-icon-default\"]{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Ccircle cx='10' cy='10' r='8.5' fill='color(display-p3 0.1490 0.4941 0.9412)'/%3E%3Cpath fill-rule='evenodd' d='M10 5a1 1 0 100 2 1 1 0 100-2zm0 4a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z' fill='%23fff'/%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-header\"]{margin-bottom:16px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-title\"]{font-weight:500;font-size:16px;margin-bottom:20px;line-height:26px;padding-right:24px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-content\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-title\"]{color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-content\"]{font-size:14px;height:-webkit-max-content;height:-moz-max-content;height:max-content;min-height:88px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;word-break:break-word}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-content-empty-title\"]{margin-top:28px;min-height:60px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer\"]{margin-top:24px;position:relative}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action\"]{border:none;margin:0;padding:0;background:transparent;-webkit-tap-highlight-color:transparent;cursor:default;font-size:12px;color:var(--text-strong,rgba(0,0,0,.64));-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action-icon\"]{display:inline-block;width:16px;height:16px;margin-right:6px;background-size:contain;background-position:50%;background-repeat:no-repeat}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action-text\"]{border-top:1px solid transparent;border-bottom:1px solid transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action\"]:hover [data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action-text\"]{border-bottom-color:var(--text-strong,rgba(0,0,0,.64))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-default\"]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-default\"]>:nth-last-child(3){margin-right:auto}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-default\"]>:last-child{margin-left:var(--Space-space_medium_m,16px)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-stretch\"]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-stretch\"]>*{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-stretch\"]>:not(:first-child){margin-left:var(--Space-space_medium_m,16px)}");
	Modal_1.default.confirm = confirm_1.default;
	exports.default = Modal_1.default;
}));
//#endregion
export default require_Modal();
