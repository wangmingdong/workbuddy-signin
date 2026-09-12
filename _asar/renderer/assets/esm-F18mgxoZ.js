import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { i as __extends, l as __rest, p as init_tslib_es6, t as __assign, u as __spreadArray } from "./tslib.es6-8NkKEYUK.js";
import { cn as Browser, ln as init_i18nextBrowserLanguageDetector } from "./esm-cVQVEiWG.js";
import { n as init_esm$1, r as ua } from "./esm-mgJiqgJI.js";
import { t as require_prop_types } from "./prop-types-DD6A3Rdg.js";
import { r as require_assignWith, t as require_set } from "./set-CN3NcsdP.js";
import { n as init_i18next, r as instance } from "./i18next-DWuHLQMZ.js";
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/polyfill.js
var init_polyfill = __esmMin((() => {
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
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/common/version.js
var version_default;
var init_version = __esmMin((() => {
	version_default = "1.7.3-beta-enterprise.64";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/common/attribute.js
var attribute_default;
var init_attribute = __esmMin((() => {
	init_version();
	attribute_default = "data-dui-" + version_default.replace(/\./g, "-");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/helper.js
function emptyFn() {}
function inject(originalFn, additionalFn) {
	return function() {
		var args = [];
		for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
		var result = originalFn.apply(null, args);
		if (result !== false) additionalFn();
		return result;
	};
}
function wrapWithConfigDefaults(originalFn) {
	var defaultConfig = {};
	function configDefaults(defaults) {
		defaultConfig = defaults;
	}
	var wrappedFn = function(passedConfig) {
		return originalFn(__assign(__assign({}, defaultConfig), passedConfig));
	};
	wrappedFn.configDefaults = configDefaults;
	return wrappedFn;
}
function isDom(node) {
	return node && typeof node === "object" && node.nodeType === 1;
}
var isBrowser;
var init_helper = __esmMin((() => {
	init_tslib_es6();
	isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/createElement.js
function h(type, props) {
	var children = [];
	for (var _i = 2; _i < arguments.length; _i++) children[_i - 2] = arguments[_i];
	var mergedProps = props;
	if ((props === null || props === void 0 ? void 0 : props.className) && typeof type === "string" && !isScopedAttributeDisabled) mergedProps[attribute_default] = props.className;
	return import_react$10.createElement.apply(void 0, __spreadArray([type, mergedProps], children));
}
function shouldDisableScopedAttribute() {
	var windowDisable;
	if (typeof window === "object") windowDisable = window.__dui_disable_scoped_attribute__;
	var globalDisable;
	if (typeof globalThis === "object") globalDisable = globalThis.__dui_disable_scoped_attribute__;
	return Boolean(windowDisable || globalDisable);
}
var import_react$10, isScopedAttributeDisabled;
var init_createElement = __esmMin((() => {
	init_tslib_es6();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_attribute();
	init_helper();
	isScopedAttributeDisabled = shouldDisableScopedAttribute();
	if (isBrowser) window.__dui_disable_auto_focus_map__ = window.__dui_disable_auto_focus_map__ || {};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/style.js
function injectStyle(fileKey, css) {
	var key = version_default + "-" + fileKey;
	var domKey = isScopedAttributeDisabled ? fileKey : key;
	var hasElement = Boolean(isBrowser && document.querySelector("style[data-dui-key=\"" + domKey + "\"]") || !isBrowser);
	if (Array.isArray(styleRegistryManage.get(key)) && hasElement) {
		styleRegistryManage.add(key, bundledBy);
		warnRedundantInject(key);
		return;
	}
	styleRegistryManage.set(key, [bundledBy]);
	var versions = getFileVersions(fileKey);
	if (versions.length > 1) warnMultipleVersions(fileKey, versions);
	if (isBrowser) {
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
function warnRedundantInject(key) {
	if (!isBrowser || !styleRegistryManage.length || !Array.isArray(styleRegistryManage.get(key))) return;
	var count = styleRegistryManage.get(key).length;
	setTimeout(function() {
		if (styleRegistryManage.get(key).length > count) return;
		console.warn("[DUI] " + key + " 重复引入了 " + count + " 次");
	}, CONSOLE_DEBOUNCE);
}
function warnMultipleVersions(fileKey, versions) {
	if (!isBrowser) return;
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
var bundledBy, styleRegistryManage, CONSOLE_DEBOUNCE;
var init_style = __esmMin((() => {
	init_version();
	init_createElement();
	init_helper();
	bundledBy = "1";
	styleRegistryManage = new (function() {
		function StyleRegistryManage() {
			var globalObj = isBrowser ? window : globalThis;
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
	CONSOLE_DEBOUNCE = 3e3;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/theme.js
function consumeTheme(renderProp) {
	return h(ThemeContext.Consumer, null, function(themeConfig) {
		return renderProp(createThemedClassNames(themeConfig));
	});
}
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
		return appendThemeClassNames(themeConfig, import_classnames.default.apply(void 0, classes));
	};
}
var import_react$9, import_classnames, ThemeContext;
var init_theme = __esmMin((() => {
	init_style();
	init_createElement();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	init_esm$1();
	init_polyfill();
	injectStyle("common/global.css", "[data-dui-1-7-3-beta-enterprise-64]{font-family:-apple-system,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,TdocsUncommon}[data-dui-1-7-3-beta-enterprise-64]:focus{outline:none}");
	if (ua.isMac && !ua.isIPadEmulatedMac && !ua.isFirefox) injectStyle("common/anti-alias.css", "[data-dui-1-7-3-beta-enterprise-64]{-webkit-font-smoothing:antialiased}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button\"]{font-weight:500}");
	ThemeContext = import_react$9.createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Button/Button.js
var import_react$8, Button;
var init_Button$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_theme();
	Button = function(_super) {
		__extends(Button, _super);
		function Button() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, type = _b.type, size = _b.size, disabled = _b.disabled, disabledEffect = _b.disabledEffect, icon = _b.icon, testId = _b.testId, rest = __rest(_b, [
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
				return h("button", __assign({}, rest, {
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
			return consumeTheme(this.themedRender);
		};
		return Button;
	}(import_react$8.Component);
	Button.defaultProps = {
		prefixCls: "dui-button",
		type: "default",
		size: "default",
		disabledEffect: "default"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Button/index.js
var Button_default;
var init_Button = __esmMin((() => {
	init_style();
	init_Button$1();
	injectStyle("components/Button/style/index.css", "[data-dui-1-7-3-beta-enterprise-64~=\"dui-button\"]{outline:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;white-space:nowrap;border-radius:4px;border:1px solid transparent;font-size:14px;padding:0 29px;-webkit-tap-highlight-color:transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-default\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08));color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-default\"]:hover{background:var(--tsp-fill-strong,rgba(61,82,102,.12))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-default\"]:active{background:var(--tsp-fill-ultrastrong,rgba(61,82,102,.16))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-primary\"]{background:var(--accent-default,#1e6fff);color:var(--text-white,#fff)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-primary\"]:hover{background:var(--accent-hover,#175ceb)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-primary\"]:active{background:var(--accent-pressed,#134ae0)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-warning\"]{background:var(--critical-default,#ff4747);color:#fff}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-warning\"]:hover{background:var(--critical-hover,#eb3639)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-warning\"]:active{background:var(--critical-pressed,#e02424)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-plain\"]{background:var(--bg-lv1-default,#fff);color:var(--text-link,#175ceb)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-plain\"]:hover{background:var(--bg-lv1-weak,#f9fafb)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-plain\"]:active{background:var(--bg-lv1-medium,#f3f5f7)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"]{background:-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(270deg,#fdc668,#fcdb9f);border:none;color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{margin:0 1px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"]:hover{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.04)),to(rgba(0,0,0,.04))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.04),rgba(0,0,0,.04)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.04),rgba(0,0,0,.04)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden\"]:active{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.08)),to(rgba(0,0,0,.08))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.08),rgba(0,0,0,.08)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.08),rgba(0,0,0,.08)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"]{background:-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%);border:none;color:#fae0a5}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{margin:0 1px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"]:hover{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.16),rgba(0,0,0,.16)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.16),rgba(0,0,0,.16)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-dark\"]:active{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.32),rgba(0,0,0,.32)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.32),rgba(0,0,0,.32)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-outline\"]{border-color:#db8f1c;color:#db8f1c;background:#fff}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-outline\"]:hover{background:rgba(219,143,28,.1)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-type-golden-outline\"]:active{background:rgba(219,143,28,.2)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button\"]:disabled{pointer-events:none;cursor:auto}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-disabled-default\"]:disabled{color:var(--text-weak,rgba(0,0,0,.24));background:var(--tsp-fill-weak,rgba(51,77,102,.06));border-color:transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-disabled-faded\"]:disabled{opacity:.4}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-large\"]{height:36px;min-width:156px;font-size:16px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-default\"]{height:36px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-small\"]{height:28px;padding:0 17px;font-size:12px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-size-small\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-button-container\"]{line-height:26px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-with-icon\"]{padding:0 9px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-button-icon\"]{display:inline-block;width:18px;height:18px;background-size:contain;background-repeat:no-repeat;background-position:50%;margin-right:4px}");
	Button_default = Button;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/keepDom.js
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
var init_keepDom = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Modal/Dragger.js
var import_react$7, Dragger;
var init_Dragger = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_helper();
	init_theme();
	Dragger = function(_super) {
		__extends(Dragger, _super);
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
				return h("div", __assign({}, __rest(_a, [
					"children",
					"className",
					"prefixCls",
					"style",
					"onDragEnd",
					"draggable"
				]), {
					className: classNames(prefixCls, className),
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
			return consumeTheme(this.themedRender);
		};
		return Dragger;
	}(import_react$7.Component);
	Dragger.defaultProps = {
		prefixCls: "dui-dragger",
		onDragEnd: emptyFn,
		onClick: emptyFn,
		draggable: false
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Snackbar/context.js
var import_react$6, ContainerContext;
var init_context = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	ContainerContext = import_react$6.createContext(null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/preventScrollPenetrate.js
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
function calcDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
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
var import_react$5, STYLUS_TOUCH_MOVE_CLICK_DISTANCE, PreventScrollPenetrateContainer, globalScrollProperty;
var init_preventScrollPenetrate = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	STYLUS_TOUCH_MOVE_CLICK_DISTANCE = 10;
	PreventScrollPenetrateContainer = function(_super) {
		__extends(PreventScrollPenetrateContainer, _super);
		function PreventScrollPenetrateContainer() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.domRef = import_react$5.createRef();
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
			return h("div", __assign({}, this.props, { ref: this.domRef }), this.props.children);
		};
		return PreventScrollPenetrateContainer;
	}(import_react$5.Component);
	globalScrollProperty = "";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/stylusAdapter.js
var import_react$4, TouchType, StylusAdapter, WithStylusClick;
var init_stylusAdapter = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_esm$1();
	(function(TouchType) {
		TouchType["direct"] = "direct";
		TouchType["stylus"] = "stylus";
	})(TouchType || (TouchType = {}));
	StylusAdapter = function() {
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
			return ua.isIPad && event.changedTouches[0] && event.changedTouches[0].touchType === TouchType.stylus;
		};
		StylusAdapter.isEqualPos = function(pos1, pos2) {
			return Math.abs(pos1[0] - pos2[0]) < 10 && Math.abs(pos1[1] - pos2[1]) < 10;
		};
		return StylusAdapter;
	}();
	WithStylusClick = function(_a) {
		var children = _a.children, clickHandler = _a.clickHandler;
		return import_react$4.cloneElement(children, {
			onClick: clickHandler,
			onTouchStart: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			},
			onTouchEnd: function(e) {
				return StylusAdapter.supportStylus(e, clickHandler);
			}
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/focus.js
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
function saveFocus() {
	activeElement = document.activeElement;
}
function runRestoreFocus() {
	activeElement === null || activeElement === void 0 || activeElement.focus();
	activeElement = null;
}
function restoreFocus() {
	if (!activeElement) return;
	if (activeElement.tagName === "BUTTON") setTimeout(runRestoreFocus, 0);
	else runRestoreFocus();
}
var BASE_FOCUSABLE_SELECTORS, activeElement;
var init_focus = __esmMin((() => {
	BASE_FOCUSABLE_SELECTORS = [
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
	activeElement = null;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/common/wording.js
var controlKeyName, languages, translationMap;
var init_wording = __esmMin((() => {
	init_esm$1();
	controlKeyName = ua.isMac ? "Command" : "Ctrl";
	languages = [
		"en",
		"zh-CN",
		"th",
		"vi",
		"ms",
		"tl-PH",
		"id-ID",
		"es-MX",
		"de",
		"ja",
		"zh-HK"
	];
	translationMap = {
		avatar: [
			"Avatar",
			"头像",
			"รูปโปรไฟล์",
			"Ảnh hồ sơ",
			"Foto Profil",
			"Profile Photo",
			"Foto Profil",
			"Foto del perfil",
			"Profilfoto",
			"プロフィール写真",
			"頭像"
		],
		ok: [
			"OK",
			"确定",
			"ตกลง",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"OK",
			"確定"
		],
		cancel: [
			"Cancel",
			"取消",
			"ยกเลิก",
			"Hủy",
			"Batalkan",
			"Kanselahin",
			"Batalkan",
			"Cancelar",
			"Abbrechen",
			"キャンセルする",
			"取消"
		],
		select: [
			"Select",
			"请选择",
			"โปรดเลือก",
			"Vui lòng lựa chọn",
			"Sila pilih",
			"Pumili",
			"Silakan pilih",
			"Por favor selecciona",
			"Bitte auswählen",
			"選択してください",
			"請選擇"
		],
		search: [
			"Search",
			"搜索选项",
			"ตัวเลือกการค้นหา",
			"Tùy chọn tìm kiếm",
			"Pilihan carian",
			"Mga opsyon sa paghahanap",
			"Opsi penelusuran",
			"Buscar opciones",
			"Options-Suche",
			"検索オプション",
			"搜尋選項"
		],
		hour: [
			"H",
			"时",
			"h",
			"giờ",
			"h",
			"h",
			"h",
			"h",
			"h",
			"時",
			"時"
		],
		minute: [
			"M",
			"分",
			"m",
			"phút",
			"m",
			"m",
			"m",
			"m",
			"m",
			"分",
			"分"
		],
		second: [
			"S",
			"秒",
			"s",
			"giây",
			"saat",
			"s",
			"s",
			"s",
			"s",
			"秒",
			"秒"
		],
		now: [
			"Now",
			"此刻",
			"ตอนนี้",
			"Ngay bây giờ",
			"Sekarang",
			"Ngayon",
			"Sekarang",
			"Ahora",
			"Jetzt",
			"今",
			"此刻"
		],
		inputHour: [
			"Enter Hour",
			"输入小时",
			"ใส่ชั่วโมง",
			"Nhập giờ",
			"Masukkan jam",
			"Ilagay ang mga oras",
			"Masukkan jam",
			"Introducir horas",
			"Stunden eingeben",
			"時間を入力します",
			"輸入小時"
		],
		inputMinute: [
			"Enter Minute",
			"输入分",
			"ใส่นาที",
			"Nhập phút",
			"Masukkan minit",
			"Ilagay ang mga minuto",
			"Masukkan menit",
			"Introducir minutos",
			"Minuten eingeben",
			"分を入力します",
			"輸入分"
		],
		inputSecond: [
			"Enter Second",
			"输入秒",
			"ใส่วินาที",
			"Nhập giây",
			"Masukkan saat",
			"Ilagay ang mga segundo",
			"Masukkan detik",
			"Introducir segundos",
			"Sekunden eingeben",
			"秒を入力します",
			"輸入秒"
		],
		close: [
			"Close",
			"关闭",
			"ปิด",
			"Đóng",
			"Tutup",
			"Isara",
			"Tutup",
			"Cerrar",
			"Schließen",
			"閉じる",
			"關閉"
		],
		loadingFailed: [
			"Loading Failed",
			"加载失败",
			"โหลดไม่สำเร็จ",
			"Tải không thành công",
			"Memuatkan tidak berjaya",
			"Hindi matagumpay ang pag-load",
			"Gagal memuat",
			"Error al cargar",
			"Laden erfolglos",
			"読み込みに失敗しました",
			"載入失敗"
		],
		noOptions: [
			"No Options Available",
			"暂无选项",
			"ไม่มีตัวเลือกที่พร้อมใช้งาน",
			"Không có tùy chọn khả dụng",
			"Tiada pilihan tersedia",
			"Walang mga opsyon na available",
			"Tidak ada opsi tersedia",
			"No hay opciones disponibles",
			"Keine Optionen verfügbar",
			"利用可能なオプションはありません",
			"暫無選項"
		],
		copySuccessed: [
			"Copy Succeeded",
			"复制成功",
			"คัดลอกสำเร็จแล้ว",
			"Sao chép thành công",
			"Berjaya menyalin",
			"Matagumpay na nakopya",
			"Berhasil disalin",
			"Copiar con éxito",
			"Erfolgreich kopiert",
			"コピーが成功しました",
			"複製成功"
		],
		copyFailed: [
			"Copy Failed",
			"复制失败",
			"การคัดลอกล้มเหลว",
			"Sao chép không thành công",
			"Gagal menyalin",
			"Hindi nakopya",
			"Gagal menyalin",
			"Error al copiar",
			"Kopieren fehlgeschlagen",
			"コピーに失敗しました",
			"複製失敗"
		],
		eyedropper: [
			"Eyedropper",
			"取色器",
			"ตัวเลือกสี",
			"Bộ chọn màu",
			"Pemilih warna",
			"Color picker",
			"Pemilih warna",
			"Selector de color",
			"Farbwähler",
			"カラーピッカー",
			"取色器"
		],
		eyedropperFailedBrowser: [
			"Eyedropper is not supported by this browser. Please open it in Chrome",
			"取色器暂不支持本浏览器, 请在 Chrome 中使用",
			"ขณะนี้เบราว์เซอร์นี้ไม่รองรับตัวเลือกสี โปรดใช้ใน Chrome",
			"Bộ chọn màu không được hỗ trợ trong trình duyệt này, vui lòng sử dụng Chrome",
			"Pemilih warna tidak disokong dalam pelayar ini pada masa ini, sila gunakannya dalam Chrome",
			"Ang color picker ay kasalukuyang hindi sinusuportahan sa browser na ito, mangyaring gamitin ito sa Chrome",
			"Pemilih warna saat ini tidak didukung di browser ini, silakan gunakan di Chrome",
			"El selector de color no es compatible actualmente con este navegador, utilícelo en Chrome",
			"Der Farbwähler wird in diesem Browser derzeit nicht unterstützt, bitte verwenden Sie ihn in Chrome",
			"カラーピッカーは現在このブラウザではサポートされていません。Chromeで使用してください",
			"取色器暫不支援本瀏覽器，請在Chrome中使用"
		],
		zoomIn: [
			"Zoom In",
			"放大",
			"ซูมเข้า",
			"Phóng to",
			"Zum masuk",
			"Mag-zoom in",
			"Perbesar",
			"Acercar",
			"Zoomen Sie herein",
			"ズームイン",
			"放大"
		],
		zoomOut: [
			"Zoom Out",
			"缩小",
			"ซูมออก",
			"Thu nhỏ",
			"Zum keluar",
			"Mag-zoom out",
			"Perkecil",
			"Alejar",
			"Zoomen Sie heraus",
			"ズームアウト",
			"縮小"
		],
		fitScreen: [
			"Fit to Screen",
			"适应屏幕",
			"ปรับให้พอดีกับหน้าจอ",
			"Vừa màn hình",
			"Muat pada skrin",
			"I-fit sa screen",
			"Sesuaikan dengan layar",
			"Ajustar a la pantalla",
			"An Bildschirm anpassen",
			"画面に合わせます",
			"適應螢幕"
		],
		actualSize: [
			"Full Image",
			"原图",
			"ภาพเต็ม",
			"Hình ảnh đầy đủ",
			"Imej penuh",
			"Buong larawan",
			"Gambar penuh",
			"Imagen Completa",
			"Volles Bild",
			"フルイメージ",
			"原圖"
		],
		download: [
			"Download",
			"下载",
			"ดาวน์โหลด",
			"Tải xuống",
			"Muat Turun",
			"I-download",
			"Unduh",
			"Descargar",
			"Herunterladen",
			"ダウンロード",
			"下載"
		],
		monthPostfix: [
			"",
			"月",
			"เดือน",
			"Tháng",
			"Bulan",
			"Buwan",
			"Bulan",
			"Mes",
			"Monat",
			"月",
			"月"
		],
		name: languages,
		today: [
			"Today",
			"今天",
			"วันนี้",
			"Hôm nay",
			"Hari ini",
			"Ngayong araw",
			"Hari ini",
			"Hoy",
			"Heute",
			"今日",
			"今天"
		],
		backToToday: [
			"Back to Today",
			"返回今天",
			"ย้อนกลับไปยังวันนี้",
			"Quay lại hôm nay",
			"Kembali ke hari ini",
			"Bumalik sa ngayon",
			"Kembali ke hari ini",
			"Volver a hoy",
			"Zum heutigen Tag zurückkehren",
			"今日に戻ります",
			"返回今天"
		],
		timeSelect: [
			"Select Time",
			"选择时间",
			"เลือกเวลา",
			"Chọn thời gian",
			"Pilih masa",
			"Piliin ang oras",
			"Pilih waktu",
			"Seleccionar hora",
			"Zeit auswählen",
			"時間を選択します",
			"選擇時間"
		],
		dateSelect: [
			"Select Date",
			"选择日期",
			"เลือกวันที่",
			"Chọn ngày",
			"Pilih tarikh",
			"Pumili ng petsa",
			"Pilih tanggal",
			"Seleccionar fecha",
			"Datum auswählen",
			"日付を選択してください",
			"選擇日期"
		],
		weekSelect: [
			"Select Week",
			"选择周",
			"เลือกสัปดาห์",
			"Chọn tuần",
			"Pilih minggu",
			"Piliin ang linggo",
			"Pilih minggu",
			"Seleccionar semana",
			"Woche wählen",
			"週を選択します",
			"選擇週"
		],
		clear: [
			"Clear",
			"清除",
			"ล้าง",
			"Xóa",
			"Kosongkan",
			"I-clear",
			"Bersihkan",
			"Borrar",
			"Löschen",
			"削除します",
			"清除"
		],
		month: [
			"Month",
			"月",
			"เดือน",
			"Tháng",
			"Bulan",
			"Buwan",
			"Bulan",
			"Mes",
			"Monat",
			"月",
			"月"
		],
		year: [
			"Year",
			"年",
			"ปี",
			"Năm",
			"Tahun",
			"Taon",
			"Tahun",
			"Año",
			"Jahr",
			"年",
			"年"
		],
		previousMonth: [
			"Previous month (PageUp)",
			"上个月 (翻页上键)",
			"เดือนที่แล้ว (ปุ่ม Page Up)",
			"Tháng trước (Phím Page Up)",
			"Bulan lepas (kekunci Halaman Atas)",
			"Nakaraang buwan (Page Up key)",
			"Bulan lalu (tombol Page Up)",
			"Último mes (Tecla Previa página)",
			"Letzter Monat (Taste Seite hoch)",
			"先月（PageUp キー）",
			"上個月（翻頁上鍵）"
		],
		nextMonth: [
			"Next month (PageDown)",
			"下个月 (翻页下键)",
			"เดือนถัดไป (ปุ่ม Page Down)",
			"Tháng sau (Phím Page Down)",
			"Bulan depan (kekunci Halaman Bawah)",
			"Susunod na buwan (Page Down key)",
			"Bulan berikutnya (tombol Page Down)",
			"Siguiente Mes (Tecla Siguiente página)",
			"Nächster Monat (Taste Bild ab)",
			"翌月（PageDown キー）",
			"下個月（翻頁下鍵）"
		],
		monthSelect: [
			"Select Month",
			"选择月份",
			"เลือกเดือน",
			"Chọn tháng",
			"Pilih bulan",
			"Piliin ang buwan",
			"Pilih bulan",
			"Seleccionar mes",
			"Monat auswählen",
			"月を選択",
			"選擇月份"
		],
		yearSelect: [
			"Select Year",
			"选择年份",
			"เลือกปี",
			"Chọn năm",
			"Pilih tahun",
			"Piliin ang taon",
			"Pilih tahun",
			"Seleccionar año",
			"Jahr wählen",
			"年を選択します",
			"選擇年份"
		],
		decadeSelect: [
			"Select Decade",
			"选择年代",
			"เลือกทศวรรษ",
			"Chọn một thập kỷ",
			"Pilih satu dekad",
			"Pumili ng dekada",
			"Pilih dekade",
			"Seleccionar una década",
			"Wählen Sie ein Jahrzehnt",
			"10年を選択します",
			"選擇年代"
		],
		yearFormat: [
			"YYYY",
			"YYYY年",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY",
			"YYYY年"
		],
		monthFormat: [
			"M",
			"M月",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M",
			"M月"
		],
		dayFormat: [
			"D",
			"D日",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D",
			"D日"
		],
		dateFormat: [
			"M/D/YYYY",
			"YYYY年M月D日",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"DD/MM/YYYY",
			"YYYY/MM/DD",
			"YYYY年M月D日"
		],
		dateTimeFormat: [
			"M/D/YYYY HH:mm:ss",
			"YYYY年M月D日 HH时mm分ss秒",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY HH:mm:ss",
			"YYYY/MM/DD HH:mm:ss",
			"YYYY年M月D日 HH時mm分ss秒"
		],
		monthBeforeYear: [
			"true",
			"",
			"true",
			"true",
			"true",
			"true",
			"true",
			"true",
			"true",
			"",
			""
		],
		previousYear: [
			"Previous Year (" + controlKeyName + " + Left)",
			"上一年 (" + controlKeyName + "键加左方向键)",
			"ปีก่อนหน้า (ปุ่ม " + controlKeyName + " + ปุ่มลูกศรซ้าย)",
			"Năm trước (phím " + controlKeyName + " + phím Mũi tên Trái)",
			"Tahun sebelumnya (" + controlKeyName + " kekunci + Kekunci Anak Panah Kiri)",
			"Nakaraang taon (" + controlKeyName + " key + Left Arrow key)",
			"Tahun sebelumnya (tombol " + controlKeyName + " + tombol Panah Kiri)",
			"Año anterior (" + controlKeyName + " tecla + tecla de flecha izquierda)",
			"Vorheriges Jahr (" + controlKeyName + "Taste + Linke Pfeiltaste)",
			"前年（" + controlKeyName + "キー + 左矢印キー）",
			"上一年 (" + controlKeyName + "鍵加左方向鍵)"
		],
		nextYear: [
			"Next Year (" + controlKeyName + " + Right)",
			"下一年 (" + controlKeyName + "键加右方向键)",
			"ปีถัดไป (ปุ่ม " + controlKeyName + " + ปุ่มลูกศรขวา)",
			"Năm sau (phím " + controlKeyName + " + phím Mũi tên Phải)",
			"Tahun depan (" + controlKeyName + " kekunci + Kekunci Anak Panah Kanan)",
			"Susunod na taon (" + controlKeyName + " key + Right Arrow key)",
			"Tahun berikutnya (tombol " + controlKeyName + " + tombol Panah Kanan)",
			"Año siguiente (" + controlKeyName + " tecla + tecla de flecha derecha)",
			"Nächstes Jahr (" + controlKeyName + "Taste + Rechte Pfeiltaste)",
			"翌年（" + controlKeyName + "キー + 右矢印キー）",
			"下一年 (" + controlKeyName + "鍵加右方向鍵)"
		],
		previousDecade: [
			"Previous Decade",
			"上一年代",
			"ทศวรรษก่อนหน้า",
			"Thập kỷ trước",
			"Dekad sebelumnya",
			"Nakaraang dekada",
			"Dekade sebelumnya",
			"Década anterior",
			"Vorheriges Jahrzehnt",
			"前の10年",
			"上一年代"
		],
		nextDecade: [
			"Next Decade",
			"下一年代",
			"ทศวรรษหน้า",
			"Thập kỷ tiếp theo",
			"Dekad depan",
			"Susunod na dekada",
			"Dekade selanjutnya",
			"Década siguiente",
			"Nächstes Jahrzehnt",
			"次の10年",
			"下一年代"
		],
		previousCentury: [
			"Previous Century",
			"上一世纪",
			"ศตวรรษก่อนหน้า",
			"Thế kỷ trước",
			"Abad sebelumnya",
			"Nakaraang siglo",
			"Abad sebelumnya",
			"Siglo anterior",
			"Vorheriges Jahrhundert",
			"前の世紀",
			"上一世紀"
		],
		nextCentury: [
			"Next Century",
			"下一世纪",
			"ศตวรรษหน้า",
			"Thế kỷ tiếp theo",
			"Abad depan",
			"Susunod na siglo",
			"Abad selanjutnya",
			"Siglo siguiente",
			"Nächstes Jahrhundert",
			"次の世紀",
			"下一世紀"
		],
		time: [
			"Time",
			"时间",
			"เวลา",
			"Thời gian",
			"Masa",
			"Oras",
			"Waktu",
			"Hora",
			"Zeit",
			"時間",
			"時間"
		]
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/common/locale.js
function i18n(key) {
	return i18nInstance.t(key);
}
var import_assignWith, import_set, detector, resources, i18nInstance;
var init_locale = __esmMin((() => {
	import_assignWith = /* @__PURE__ */ __toESM(require_assignWith());
	import_set = /* @__PURE__ */ __toESM(require_set());
	init_i18next();
	init_i18nextBrowserLanguageDetector();
	init_wording();
	detector = new Browser();
	if (!(typeof window === "undefined")) detector.addDetector({
		name: "userAgent",
		lookup: function() {
			var match = navigator.userAgent.match(/language\/([a-zA-Z'-_]+)/i);
			if (match) return match[1].replace("_", "-");
		}
	});
	resources = {};
	languages.forEach(function(lang, index) {
		var translation = (0, import_assignWith.default)({}, translationMap, function(objectValue, sourceValue) {
			return sourceValue[index];
		});
		(0, import_set.default)(resources, [lang, "translation"], translation);
	});
	i18nInstance = instance.createInstance();
	i18nInstance.use(detector).init({
		resources,
		fallbackLng: {
			"zh-TW": ["zh-HK", "zh-CN"],
			fil: ["tl-PH"],
			id: ["id-ID"],
			es: ["es-MX"],
			default: ["zh-CN"]
		},
		detection: {
			order: [
				"querystring",
				"userAgent",
				"cookie"
			],
			lookupCookie: "language",
			caches: []
		}
	});
})), import_react$3, import_react_dom$2, MODAL_TRANSITION_IN_DURATION, Modal;
var init_Modal$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_Button();
	init_Dragger();
	init_keepDom();
	init_context();
	init_theme();
	init_preventScrollPenetrate();
	init_stylusAdapter();
	init_focus();
	init_locale();
	MODAL_TRANSITION_IN_DURATION = 300;
	Modal = function(_super) {
		__extends(Modal, _super);
		function Modal() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.draggerRef = import_react$3.createRef();
			_this.footerRef = import_react$3.createRef();
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
				if (!containerDom || destroyOnClose && !decideKeepDom.call(_this, widthAnimation ? 240 : 0, visible)) return null;
				return import_react_dom$2.createPortal(h(ContainerContext.Provider, { value: _this.draggerDom }, h(PreventScrollPenetrateContainer, {
					className: maskCls,
					style: __assign({ zIndex }, maskStyle),
					onClick: _this.handleMaskClick,
					"aria-hidden": !visible
				}, h(Dragger, {
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
				saveFocus();
				setTimeout(function() {
					var _a;
					!_this.isFocusInside() && ((_a = _this.draggerDom) === null || _a === void 0 || _a.focus());
				}, widthAnimation ? MODAL_TRANSITION_IN_DURATION : 20);
			}
		};
		Modal.prototype.restorePreviousFocus = function() {
			var _a = this.props, visible = _a.visible, autoFocus = _a.autoFocus;
			if (!visible && autoFocus) restoreFocus();
		};
		Modal.prototype.traverseFocus = function(e) {
			var container = this.draggerDom;
			if (!container) return;
			traverseFocusIn(container, e);
		};
		Modal.prototype.componentDidMount = function() {
			this.forceUpdate();
			this.focusSelf();
			var _a = this.props, visible = _a.visible, mask = _a.mask, containerDom = _a.containerDom;
			toggleGlobalScrollEvents(Boolean(visible && mask));
			containerDom === null || containerDom === void 0 || containerDom.addEventListener("click", this.clearMouseDownTarget);
		};
		Modal.prototype.componentDidUpdate = function(prevProps) {
			if (!prevProps.visible) this.focusSelf();
			else this.restorePreviousFocus();
			var _a = this.props, visible = _a.visible, mask = _a.mask;
			toggleGlobalScrollEvents(Boolean(visible && mask));
		};
		Modal.prototype.componentWillUnmount = function() {
			var _a;
			toggleGlobalScrollEvents(false);
			(_a = this.props.containerDom) === null || _a === void 0 || _a.removeEventListener("click", this.clearMouseDownTarget);
		};
		Modal.prototype.renderAction = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, action = _a.action, actionButtonType = _a.actionButtonType;
			if (!action) return null;
			var actionMainNode;
			var icon;
			if (action !== null && typeof action === "object") if (import_react$3.isValidElement(action)) actionMainNode = action;
			else {
				if ("text" in action) actionMainNode = action.text;
				if ("icon" in action) icon = action.icon;
			}
			else actionMainNode = action;
			return h(WithStylusClick, { clickHandler: this.handleClickAction }, actionButtonType ? h(Button_default, {
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
			var cancelElement = cancelText ? h(WithStylusClick, { clickHandler: this.handleClickCancel }, h(Button_default, null, cancelText)) : null;
			var okElement = okText ? h(WithStylusClick, { clickHandler: this.handleClickOk }, h(Button_default, {
				className: classNames(prefixCls + "-footer-ok"),
				type: okButtonType,
				disabled: okDisabled
			}, okText)) : null;
			var actionElement = this.renderAction(classNames);
			var footerCls = classNames(prefixCls + "-footer", prefixCls + "-footer-" + footerLayout, footerClassName);
			var child = footerDirection === "mac" ? h(import_react$3.Fragment, null, actionElement, cancelElement, okElement) : h(import_react$3.Fragment, null, okElement, actionElement, cancelElement);
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
			return h(WithStylusClick, { clickHandler: this.handleClose }, close ? h("div", { className: classNames(prefixCls + "-close-container") }, close) : h("div", { className: classNames(prefixCls + "-close") }));
		};
		Modal.prototype.renderIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, icon = _a.icon;
			if (!icon) return null;
			var iconCls = classNames(prefixCls + "-icon");
			if (import_react$3.isValidElement(icon)) return h("div", { className: iconCls }, icon);
			if (typeof icon === "string") return h("div", {
				className: iconCls,
				style: { backgroundImage: "url(\"" + icon + "\")" }
			});
			return h("div", { className: classNames(prefixCls + "-icon", prefixCls + "-icon-default") });
		};
		Modal.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Modal;
	}(import_react$3.Component);
	Modal.defaultProps = {
		prefixCls: "dui-modal",
		title: "",
		content: "",
		footer: "",
		onCancel: emptyFn,
		onOk: emptyFn,
		cancelText: i18n("cancel"),
		okText: i18n("ok"),
		mask: true,
		maskClosable: false,
		closable: true,
		onDragEnd: emptyFn,
		destroyOnClose: false,
		onClickMask: emptyFn,
		action: "",
		onClickAction: emptyFn,
		containerDom: typeof document !== "undefined" ? document.body : void 0,
		okDisabled: false,
		okButtonType: "primary",
		footerLayout: "default",
		footerDirection: "mac",
		autoFocus: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/utils/show.js
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
	var currentProps = __assign(__assign(__assign({}, props), forcedProps), { visible: true });
	function overrideSingle(obj, key) {
		obj[key] = inject(obj[key] || emptyFn, close);
	}
	function update(newProps) {
		if (closed) return;
		currentProps = __assign(__assign(__assign(__assign({}, currentProps), newProps), forcedProps), { visible: true });
		render(currentProps);
	}
	function close() {
		if (closed) return;
		closed = true;
		clearTimeout(timer);
		currentProps = __assign(__assign({}, currentProps), { visible: false });
		render(currentProps);
		setTimeout(function() {
			import_react_dom$1.unmountComponentAtNode(div);
			div.remove();
		}, transitionDuration + 20);
	}
	function render(props) {
		var element = (contexts === null || contexts === void 0 ? void 0 : contexts.length) ? composeContexts(contexts, h(Component, __assign({}, props))) : h(Component, __assign({}, props));
		import_react_dom$1.render(element, div);
	}
	render(currentProps);
	if (autoClose) timer = setTimeout(close, props.duration || 2e3);
	return {
		update,
		close
	};
}
function composeContexts(contexts, children) {
	return contexts.reduce(function(child, _a) {
		var Provider = _a.provider, value = _a.value;
		return h(Provider, { value }, child);
	}, children);
}
var import_react_dom$1;
var init_show$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Modal/confirm.js
var confirm_default;
var init_confirm = __esmMin((() => {
	init_Modal$1();
	init_show$1();
	init_helper();
	confirm_default = wrapWithConfigDefaults(function(config) {
		config.onClose = config.onClose || config.onCancel;
		var _a = config.widthAnimation;
		return showWithTransition({
			Component: Modal,
			transitionDuration: (_a === void 0 ? true : _a) ? 240 : 0,
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
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Modal/index.js
var Modal_default;
var init_Modal = __esmMin((() => {
	init_style();
	init_Modal$1();
	init_confirm();
	injectStyle("components/Modal/style/index.css", "@-webkit-keyframes dui-modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-modal-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-modal-pop-up{0%{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal\"]{position:relative;width:400px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:24px;border-radius:8px;pointer-events:auto;-webkit-animation:dui-modal-pop-up .3s cubic-bezier(.4,0,.2,1);animation:dui-modal-pop-up .3s cubic-bezier(.4,0,.2,1);-webkit-tap-highlight-color:transparent;-webkit-box-shadow:0 6px 32px 2px rgba(68,73,77,.16),0 0 0 1px rgba(0,0,0,.04),0 4px 6px 2px rgba(0,0,0,.04);box-shadow:0 6px 32px 2px rgba(68,73,77,.16),0 0 0 1px rgba(0,0,0,.04),0 4px 6px 2px rgba(0,0,0,.04);cursor:default;background-color:var(--bg-lv4-default,#fff)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-hidden\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-visible\"]{-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,visibility,-webkit-transform;transition-property:opacity,transform,visibility;transition-property:opacity,transform,visibility,-webkit-transform}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-visible\"]{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transition-duration:.3s;transition-duration:.3s}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-hidden\"]{opacity:0;-webkit-transform:scale3d(.9,.9,1);transform:scale3d(.9,.9,1);-webkit-transition-duration:.24s;transition-duration:.24s}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-with-icon\"]{padding-left:56px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-with-icon\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer\"]{margin-left:-32px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask\"]{position:fixed;z-index:9998;top:0;left:0;right:0;bottom:0;opacity:1;pointer-events:none;-webkit-animation:dui-modal-fade-in .3s cubic-bezier(.4,0,.2,1);animation:dui-modal-fade-in .3s cubic-bezier(.4,0,.2,1);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-in-container\"]{position:absolute}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-display\"]{pointer-events:auto;background-color:hsla(0,0%,100%,.65)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-visible\"]{opacity:1;visibility:visible;-webkit-transition:all .3s cubic-bezier(.4,0,.2,1);transition:all .3s cubic-bezier(.4,0,.2,1)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-mask-hidden\"]{opacity:0;visibility:hidden;-webkit-transition:all .24s cubic-bezier(.4,0,.2,1);transition:all .24s cubic-bezier(.4,0,.2,1)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-no-animation\"]{-webkit-transition:none;transition:none;-webkit-animation:none;animation:none}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"]{background-size:contain;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23464d5a' d='M17 7.714L12.714 12 17 16.286l-.714.714L12 12.714 7.714 17 7 16.286 11.286 12 7 7.714 7.714 7 12 11.286 16.286 7z'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;border-radius:2px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"]:hover{background-color:rgba(0,0,0,.04)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"]:active{background-color:rgba(0,0,0,.08)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-close-container\"]{position:absolute;z-index:1;width:24px;height:24px;top:25px;right:24px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-icon\"]{width:20px;height:20px;position:absolute;left:24px;top:26px;background-position:50%;background-size:contain;background-repeat:no-repeat}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-icon-default\"]{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Ccircle cx='10' cy='10' r='8.5' fill='color(display-p3 0.1490 0.4941 0.9412)'/%3E%3Cpath fill-rule='evenodd' d='M10 5a1 1 0 100 2 1 1 0 100-2zm0 4a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z' fill='%23fff'/%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-header\"]{margin-bottom:16px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-title\"]{font-weight:500;font-size:16px;margin-bottom:20px;line-height:26px;padding-right:24px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-content\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-title\"]{color:var(--text-ultrastrong,rgba(0,0,0,.88))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-content\"]{font-size:14px;height:-webkit-max-content;height:-moz-max-content;height:max-content;min-height:88px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;word-break:break-word}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-content-empty-title\"]{margin-top:28px;min-height:60px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer\"]{margin-top:24px;position:relative}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action\"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action\"]{border:none;margin:0;padding:0;background:transparent;-webkit-tap-highlight-color:transparent;cursor:default;font-size:12px;color:var(--text-strong,rgba(0,0,0,.64));-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action-icon\"]{display:inline-block;width:16px;height:16px;margin-right:6px;background-size:contain;background-position:50%;background-repeat:no-repeat}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action-text\"]{border-top:1px solid transparent;border-bottom:1px solid transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action\"]:hover [data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-action-text\"]{border-bottom-color:var(--text-strong,rgba(0,0,0,.64))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-default\"]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-default\"]>:nth-last-child(3){margin-right:auto}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-default\"]>:last-child{margin-left:var(--Space-space_medium_m,16px)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-stretch\"]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-stretch\"]>*{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}[data-dui-1-7-3-beta-enterprise-64~=\"dui-modal-footer-stretch\"]>:not(:first-child){margin-left:var(--Space-space_medium_m,16px)}");
	Modal.confirm = confirm_default;
	Modal_default = Modal;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Loading/Spin.js
var import_react$2, import_prop_types$1, VIEW_BOX_SIZE, Spin;
var init_Spin = __esmMin((() => {
	init_style();
	init_createElement();
	init_tslib_es6();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_prop_types$1 = /* @__PURE__ */ __toESM(require_prop_types());
	init_theme();
	injectStyle("components/Loading/style/spin.css", "[data-dui-1-7-3-beta-enterprise-64~=\"dui-spin\"]{position:relative;width:100%;height:100%}[data-dui-1-7-3-beta-enterprise-64~=\"dui-spin-container\"]{position:absolute;left:50%;top:50%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:48px;height:48px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-spin-circle\"]{border-radius:50%;width:100%;height:100%;-webkit-animation:dui-spin-rotate .8s linear infinite;animation:dui-spin-rotate .8s linear infinite;-webkit-box-sizing:border-box;box-sizing:border-box}[data-dui-1-7-3-beta-enterprise-64~=\"dui-spin-circle-light\"]{border:4px solid hsla(0,0%,100%,.4);border-top-color:#fff}[data-dui-1-7-3-beta-enterprise-64~=\"dui-spin-circle-dark\"]{border:4px solid rgba(0,0,0,.12);border-top-color:rgba(0,0,0,.32)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-spin-circle-primary\"]{border:4px solid rgba(30,111,255,.24);border-top:4px solid var(--accent-default,#1e6fff)}@-webkit-keyframes dui-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}");
	VIEW_BOX_SIZE = 48;
	Spin = function(_super) {
		__extends(Spin, _super);
		function Spin() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.rootRef = import_react$2.createRef();
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, type = _a.type, circleClassName = _a.circleClassName, circleStyle = _a.circleStyle;
				var cls = classNames(prefixCls, className);
				var circleCls = classNames(prefixCls + "-circle", prefixCls + "-circle-" + type, circleClassName);
				return h("div", {
					className: cls,
					style,
					ref: _this.rootRef
				}, h("div", {
					className: classNames(prefixCls + "-container"),
					style: _this.calcContainerTransform()
				}, h("div", {
					className: circleCls,
					style: circleStyle
				})));
			};
			return _this;
		}
		Spin.prototype.calcContainerTransform = function() {
			var rootDom = this.rootRef.current;
			if (!rootDom) return;
			var width = rootDom.clientWidth, height = rootDom.clientHeight;
			return { transform: "translate(-50%,-50%) scale(" + Math.min(width, height) / VIEW_BOX_SIZE + ")" };
		};
		Spin.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Spin.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Spin;
	}(import_react$2.PureComponent);
	Spin.defaultProps = {
		prefixCls: "dui-spin",
		type: "dark"
	};
	Spin.propTypes = {
		prefixCls: import_prop_types$1.string,
		style: import_prop_types$1.object,
		className: import_prop_types$1.string,
		type: import_prop_types$1.oneOf([
			"light",
			"dark",
			"primary"
		]),
		circleClassName: import_prop_types$1.string,
		circleStyle: import_prop_types$1.object
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Snackbar/queue.js
function getVisibleSnackbars(instance) {
	var host = instance.getContainerDom();
	host.__dui_visible_snackbars__ = host.__dui_visible_snackbars__ || [];
	return host.__dui_visible_snackbars__;
}
function getIndexOf(instance) {
	return getVisibleSnackbars(instance).findIndex(function(elem) {
		return elem.instance === instance;
	});
}
function findReplaceableSnackbar(newInstance) {
	var visibleSnackbars = getVisibleSnackbars(newInstance);
	var id = newInstance.props.id;
	if (id) {
		var sameIdIndex = visibleSnackbars.findIndex(function(elem) {
			return elem.instance.props.id === id;
		});
		if (sameIdIndex >= 0) return visibleSnackbars[sameIdIndex];
	}
	var autoCloseIndex = visibleSnackbars.findIndex(function(elem) {
		return elem.instance.props.autoClose;
	});
	if (autoCloseIndex >= 0) return visibleSnackbars[autoCloseIndex];
	return null;
}
function getNextMargin(newInstance) {
	var replacedSnackbar = findReplaceableSnackbar(newInstance);
	if (replacedSnackbar) return replacedSnackbar.marginTop;
	var occupiedMargins = getVisibleSnackbars(newInstance).map(function(elem) {
		return elem.marginTop;
	}).sort(function(a, b) {
		return a - b;
	});
	if (occupiedMargins.length === 0) return 0;
	for (var i = 0; i < occupiedMargins.length; i++) {
		var targetMargin = SNACKBAR_GAP * i;
		if (targetMargin !== occupiedMargins[i]) return targetMargin;
	}
	return occupiedMargins[occupiedMargins.length - 1] + SNACKBAR_GAP;
}
function updateVisibleSnackbars(instance) {
	var visible = instance.props.visible;
	var index = getIndexOf(instance);
	var visibleSnackbars = getVisibleSnackbars(instance);
	if (visible && index === -1) {
		var replacedSnackbar = findReplaceableSnackbar(instance);
		replacedSnackbar === null || replacedSnackbar === void 0 || replacedSnackbar.instance.handleClose();
		visibleSnackbars.push({
			instance,
			marginTop: getNextMargin(instance)
		});
	}
	if (!visible && index !== -1) visibleSnackbars.splice(index, 1);
}
function getMarginTop(instance) {
	var index = getIndexOf(instance);
	var visibleSnackbars = getVisibleSnackbars(instance);
	return index !== -1 ? visibleSnackbars[index].marginTop : getNextMargin(instance);
}
function closeAll(force) {
	var snackbars = document.body.__dui_visible_snackbars__;
	snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
		var _b = _a.instance.props, autoClose = _b.autoClose, closable = _b.closable;
		return force || autoClose || closable;
	}).forEach(function(item) {
		return item.instance.handleClose();
	});
}
function closeById(id) {
	var snackbars = document.body.__dui_visible_snackbars__;
	snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
		return _a.instance.props.id === id;
	}).forEach(function(item) {
		return item.instance.handleClose();
	});
}
function hasVisibleInstances() {
	var _a;
	return Boolean((_a = document.body.__dui_visible_snackbars__) === null || _a === void 0 ? void 0 : _a.length);
}
var SNACKBAR_GAP;
var init_queue = __esmMin((() => {
	SNACKBAR_GAP = 50;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Snackbar/constant.js
var init_constant = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Snackbar/Snackbar.js
var import_react$1, import_react_dom, Snackbar;
var init_Snackbar$1 = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_helper();
	init_keepDom();
	init_Spin();
	init_context();
	init_theme();
	init_queue();
	init_constant();
	init_locale();
	Snackbar = function(_super) {
		__extends(Snackbar, _super);
		function Snackbar() {
			var _a;
			var _this = _super.apply(this, arguments) || this;
			_this.selfRef = import_react$1.createRef();
			_this.disableAutoFocus = isBrowser && ((_a = window.__dui_disable_auto_focus_map__) === null || _a === void 0 ? void 0 : _a.Snackbar);
			_this.handleClickAction = function() {
				_this.getEffectiveProps().onClickAction();
				_this.getEffectiveProps().clickActionClose && _this.handleClose();
			};
			_this.handleClose = function() {
				_this.getEffectiveProps().onClose();
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.getEffectiveProps(), prefixCls = _b.prefixCls, className = _b.className, style = _b.style, action = _b.action, children = _b.children, message = _b.message, visible = _b.visible, closable = _b.closable, type = _b.type, zIndex = _b.zIndex, showIcon = _b.showIcon, testId = _b.testId, emphasize = _b.emphasize;
				var placement = "top";
				var messageCls = classNames(prefixCls + "-message");
				if (!decideKeepDom.call(_this, 200, visible)) return null;
				var containerDom = _this.getContainerDom();
				var cls = classNames(prefixCls, className, prefixCls + "-" + placement, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-emphasize"] = emphasize, _a[prefixCls + "-with-icon"] = showIcon && !_this.renderUserSetIcon(classNames), _a[prefixCls + "-hidden"] = !visible, _a[prefixCls + "-in-container"] = containerDom !== document.body, _a));
				return import_react_dom.createPortal(h("div", {
					className: cls,
					style: __assign({
						zIndex,
						marginTop: getMarginTop(_this) + "px"
					}, style),
					ref: _this.selfRef,
					role: "alert",
					"aria-live": "assertive",
					"aria-atomic": true,
					"data-testid": testId
				}, _this.renderIcon(classNames), h("span", { className: messageCls }, children || message), action || closable ? h("span", { className: classNames(prefixCls + "-controls") }, _this.renderAction(classNames), _this.renderClose(classNames)) : null), containerDom);
			};
			return _this;
		}
		Snackbar.prototype.getContainerDom = function() {
			return isDom(this.context) ? this.context : this.getEffectiveProps().containerDom;
		};
		Snackbar.prototype.getEffectiveProps = function() {
			var _a = this.props, type = _a.type, emphasize = _a.emphasize;
			if (!["error", "warning"].includes(type)) return this.props;
			if (type === "warning") return __assign(__assign({}, this.props), {
				type: "error",
				emphasize: false
			});
			if (type === "error" && emphasize === void 0) return __assign(__assign({}, this.props), {
				type: "error",
				emphasize: true
			});
			return this.props;
		};
		Snackbar.prototype.componentDidMount = function() {
			this.handleEffect();
		};
		Snackbar.prototype.componentDidUpdate = function() {
			this.handleEffect();
		};
		Snackbar.prototype.handleEffect = function() {
			updateVisibleSnackbars(this);
		};
		Snackbar.prototype.renderUserSetIcon = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, type = _a.type, showIcon = _a.showIcon, icon = _a.icon;
			if (!showIcon || !icon) return null;
			if (import_react$1.isValidElement(icon)) return h("div", { className: classNames(prefixCls + "-icon-container") }, icon);
			if (typeof icon === "object") {
				var resolvedIcon = icon[this.props.type] || icon[type];
				return h("div", { className: classNames(prefixCls + "-icon-container") }, resolvedIcon);
			}
			return null;
		};
		Snackbar.prototype.renderAction = function(classNames) {
			var _this = this;
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, action = _a.action;
			if (!action) return null;
			if (Array.isArray(action) && action.length > 0 && action[0].text) return h("span", { className: classNames(prefixCls + "-actions") }, action.map(function(a, index) {
				return h("button", {
					key: index,
					className: classNames(prefixCls + "-action"),
					onClick: function() {
						var _a;
						(_a = a.onClick) === null || _a === void 0 || _a.call(a);
						if (a.clickActionClose === void 0 || a.clickActionClose) _this.handleClose();
					},
					autoFocus: !_this.disableAutoFocus && index === 0
				}, a.text);
			}));
			return h("button", {
				className: classNames(prefixCls + "-action"),
				onClick: this.handleClickAction,
				autoFocus: !this.disableAutoFocus
			}, action);
		};
		Snackbar.prototype.renderIcon = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, spinType = _a.spinType, type = _a.type, showIcon = _a.showIcon, loadingStyle = _a.loadingStyle, emphasize = _a.emphasize;
			if (!showIcon) return null;
			var userSetIcon = this.renderUserSetIcon(classNames);
			if (userSetIcon) return userSetIcon;
			return type === "loading" ? loadingStyle === "tob" && !emphasize ? h("svg", {
				fill: "none",
				viewBox: "0 0 20 20",
				width: "1em",
				height: "1em",
				className: "wedocs-icon wedocs-icon-progress-ring-20 wecom-loading",
				dangerouslySetInnerHTML: { __html: "\n                    <path fill=\"url(#progress-ring-20_paint0_linear_3342_242082_u31cn1)\" d=\"M10 17.5h6.61a9.98 9.98 0 000-15H10a7.5 7.5 0 010 15z\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path><path fill=\"url(#progress-ring-20_paint1_linear_3342_242082_u31cn1)\" d=\"M2.5 10A7.5 7.5 0 0110 2.5H3.39A10 10 0 0010 20v-2.5A7.5 7.5 0 012.5 10z\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path><path fill=\"currentColor\" d=\"M16.61 2.5a9.96 9.96 0 00-13.22 0H16.6z\" fill-opacity=\"0.3\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path><path fill=\"currentColor\" d=\"M16.61 17.5A9.96 9.96 0 0110 20v-2.5h6.61z\" fill-opacity=\"0.6\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path><path fill=\"currentColor\" d=\"M10 20a1.25 1.25 0 110-2.5V20z\" fill-opacity=\"0.6\"></path><defs><linearGradient id=\"progress-ring-20_paint0_linear_3342_242082_u31cn1\" x1=\"15\" x2=\"15\" y1=\"2.5\" y2=\"17.5\" gradientUnits=\"userSpaceOnUse\"><stop stop-opacity=\"0.3\"></stop><stop offset=\"1\" stop-opacity=\"0.6\"></stop></linearGradient><linearGradient id=\"progress-ring-20_paint1_linear_3342_242082_u31cn1\" x1=\"5\" x2=\"5\" y1=\"2.5\" y2=\"20\" gradientUnits=\"userSpaceOnUse\"><stop stop-opacity=\"0.3\"></stop><stop offset=\"1\" stop-opacity=\"0\"></stop></linearGradient></defs>\n                    " }
			}) : h(Spin, {
				type: spinType,
				className: classNames(prefixCls + "-loading-indicator"),
				circleClassName: classNames(prefixCls + "-loading-indicator-circle")
			}) : null;
		};
		Snackbar.prototype.renderClose = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls;
			return _a.closable ? h("button", {
				className: classNames(prefixCls + "-close"),
				onClick: this.handleClose,
				"aria-label": i18n("close")
			}) : null;
		};
		Snackbar.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		Snackbar.contextType = ContainerContext;
		return Snackbar;
	}(import_react$1.Component);
	Snackbar.defaultProps = {
		prefixCls: "dui-snackbar",
		onClickAction: emptyFn,
		clickActionClose: true,
		closable: false,
		type: "info",
		onClose: emptyFn,
		showIcon: true,
		containerDom: typeof document !== "undefined" ? document.body : void 0,
		spinType: "primary"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Snackbar/show.js
var show_default;
var init_show = __esmMin((() => {
	init_Snackbar$1();
	init_show$1();
	init_helper();
	init_constant();
	show_default = wrapWithConfigDefaults(function(config) {
		var _a = config.autoClose, autoClose = _a === void 0 ? true : _a;
		config.autoClose = autoClose;
		return showWithTransition({
			Component: Snackbar,
			transitionDuration: 200,
			autoClose,
			props: config,
			injectClosePropNames: ["onClose"],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Snackbar/Container.js
var import_react, import_prop_types, Container;
var init_Container = __esmMin((() => {
	init_createElement();
	init_tslib_es6();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
	init_context();
	init_theme();
	Container = function(_super) {
		__extends(Container, _super);
		function Container() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.ref = import_react.createRef();
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, children = _a.children;
				return h("div", {
					className: classNames(prefixCls, className),
					style: __assign({ position: "relative" }, style),
					ref: _this.ref
				}, h(ContainerContext.Provider, { value: _this.ref.current }, children));
			};
			return _this;
		}
		Container.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Container.prototype.render = function() {
			return consumeTheme(this.themedRender);
		};
		return Container;
	}(import_react.Component);
	Container.defaultProps = { prefixCls: "dui-snackbar-container" };
	Container.propTypes = {
		prefixCls: import_prop_types.string,
		style: import_prop_types.object,
		className: import_prop_types.string
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/components/Snackbar/index.js
var Snackbar_default;
var init_Snackbar = __esmMin((() => {
	init_style();
	init_Snackbar$1();
	init_show();
	init_Container();
	init_queue();
	injectStyle("components/Snackbar/style/index.css", "@-webkit-keyframes dui-snackbar-slide-in{0%{opacity:0;-webkit-transform:translate(-50%,-20px);transform:translate(-50%,-20px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes dui-snackbar-slide-in{0%{opacity:0;-webkit-transform:translate(-50%,-20px);transform:translate(-50%,-20px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@-webkit-keyframes dui-snackbar-slide-in-container{0%{opacity:0;-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes dui-snackbar-slide-in-container{0%{opacity:0;-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:10000;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;left:50%;height:40px;border-radius:4px;padding:10px 10px 10px 12px;-webkit-box-shadow:0 4px 20px 0 rgba(0,0,0,.08);box-shadow:0 4px 20px 0 rgba(0,0,0,.08);border:1px solid rgba(0,0,0,.08);background-color:var(--bg-lv4-default,#fff);color:var(--text-ultrastrong,rgba(0,0,0,.88));font-size:14px;white-space:nowrap;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-animation:dui-snackbar-slide-in .4s cubic-bezier(.4,0,.2,1);animation:dui-snackbar-slide-in .4s cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-with-icon\"]:before{content:\"\";display:inline-block;background-position:50%;background-repeat:no-repeat;background-size:contain}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-icon-container\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-with-icon\"]:before{width:20px;height:20px;margin-right:8px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-info\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='8' fill='%231e6fff'/%3E%3Cg fill='%23fff'%3E%3Cpath d='M11.778 14.89V14h-.9V8.668H8.223v.89h.888V14h-.89v.89h3.556z'/%3E%3Ccircle cx='10' cy='6.444' r='1.333'/%3E%3C/g%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-error\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill='%23ff4747' d='M10 2a8 8 0 110 16 8 8 0 110-16zm0 10.222a1.333 1.333 0 100 2.665 1.333 1.333 0 000-2.664zm1.333-7.1H8.667l.444 6.22h1.778l.444-6.222z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-success\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='8' fill='%2300d689'/%3E%3Cpath fill='%23fff' d='M7.47 9.167l1.645 1.646 4.126-4.125 1.178 1.178-5.303 5.303-2.824-2.824L7.47 9.167z'/%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-warning-wecom\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='20' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8.5' fill='color(display-p3 .99 .7301 .0083)'/%3E%3Cpath d='M10 13a1 1 0 110 2 1 1 0 010-2zm0-8a1 1 0 011 1v4a1 1 0 11-2 0V6a1 1 0 011-1z' fill='%23fff'/%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-error\"][data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill='%23fff' d='M10 2a8 8 0 110 16 8 8 0 110-16zm0 10.222a1.333 1.333 0 100 2.665 1.333 1.333 0 000-2.664zm1.333-7.1H8.667l.444 6.22h1.778l.444-6.222z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"]{color:var(--bg-lv1-default,#fff);border-color:transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"]:before{-webkit-filter:brightness(1.2);filter:brightness(1.2)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"][data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-info\"]{background-color:var(--accent-default,#1e6fff)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"][data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-success\"]{background-color:var(--success-default,#00d689)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"][data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-warning-wecom\"]{background-color:#e4a902}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"][data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-error\"]{background-color:var(--critical-default,#ff4747)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"][data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-loading\"]{background-color:var(--accent-default,#1e6fff)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-loading\"]:before{content:none}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-loading-indicator\"]{width:16px;height:16px;margin:0 10px 0 2px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-loading-indicator-circle\"]{border-width:6px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-hidden\"]{opacity:0;-webkit-transform:translateX(-50%) translateY(-20px);transform:translateX(-50%) translateY(-20px)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-top\"]{top:105px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-bottom\"]{bottom:105px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-in-container\"]{-webkit-animation-name:dui-snackbar-slide-in-container;animation-name:dui-snackbar-slide-in-container;position:absolute;top:14px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-in-container\"][data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-hidden\"]{-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-message\"]{color:inherit}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-controls\"]{margin-left:12px;line-height:20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-controls\"]>:not(:last-child){margin-right:10px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-action\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]{display:inline-block;border-radius:2px;cursor:pointer;border:none;margin:0;padding:0;background:transparent;-webkit-tap-highlight-color:transparent}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-action\"]:hover,[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]:hover{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-action\"]:active,[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]:active{background-color:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-actions\"]>:not(:first-child){margin-left:7px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-action\"]{color:var(--text-link,#175ceb);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:0 4px;font-weight:500;font-size:14px}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-action\"],[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]{color:var(--bg-lv1-default,#fff)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-action\"]:hover,[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]:hover{background-color:hsla(0,0%,100%,.24)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-action\"]:active,[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]:active{background-color:hsla(0,0%,100%,.4)}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]{width:20px;height:20px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%2381868f' fill-rule='evenodd' d='M8.63 8L13 12.368l-.632.632L8 8.63 3.632 13 3 12.368 7.368 8 3 3.632 3.632 3 8 7.368 12.368 3l.632.632L8.63 8z'/%3E%3C/svg%3E\");background-position:50%;background-size:16px;background-repeat:no-repeat}[data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-emphasize\"] [data-dui-1-7-3-beta-enterprise-64~=\"dui-snackbar-close\"]{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M8.63 8L13 12.368l-.632.632L8 8.63 3.632 13 3 12.368 7.368 8 3 3.632 3.632 3 8 7.368 12.368 3l.632.632L8.63 8z'/%3E%3C/svg%3E\")}[data-dui-1-7-3-beta-enterprise-64~=\"wecom-loading\"]{-webkit-animation:dui-spin-rotate .8s linear infinite;animation:dui-spin-rotate .8s linear infinite;width:20px;height:20px;margin-right:8px}@-webkit-keyframes dui-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}");
	Snackbar.show = show_default;
	Snackbar.closeAll = closeAll;
	Snackbar.closeById = closeById;
	Snackbar.hasVisibleInstances = hasVisibleInstances;
	Snackbar.Container = Container;
	Snackbar_default = Snackbar;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/node_modules/@tencent/dui/esm/index.js
var init_esm = __esmMin((() => {
	init_polyfill();
	init_Button();
	init_style();
	init_createElement();
	init_theme();
	init_helper();
	init_keepDom();
	init_Modal();
	init_locale();
	init_Spin();
	init_preventScrollPenetrate();
	init_show$1();
	init_focus();
	init_stylusAdapter();
	init_Snackbar();
}));
//#endregion
export { Snackbar_default as n, Modal_default as r, init_esm as t };
