import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { t as require_flatten } from "./flatten-TiHiTCcv.js";
//#region ../../node_modules/@tencent/dui-mobile/lib/common/version.js
var require_version = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "1.9.0";
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/common/attribute.js
var require_attribute = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "data-duim-" + (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_version()).default.replace(/\./g, "-");
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/createElement.js
var require_createElement = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.h = exports.isScopedAttributeDisabled = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var react_1 = require_react();
	var attribute_1 = tslib_1.__importDefault(require_attribute());
	exports.isScopedAttributeDisabled = shouldDisableScopedAttribute();
	function h(type, props) {
		var children = [];
		for (var _i = 2; _i < arguments.length; _i++) children[_i - 2] = arguments[_i];
		var mergedProps = props;
		if ((props === null || props === void 0 ? void 0 : props.className) && typeof type === "string" && !exports.isScopedAttributeDisabled) mergedProps[attribute_1.default] = props.className;
		return react_1.createElement.apply(void 0, tslib_1.__spreadArrays([type, mergedProps], children));
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
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/helper.js
var require_helper = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.shallowEqual = exports.isBrowser = exports.wrapWithConfigDefaults = exports.inject = exports.assert = exports.createStringParamFunc = exports.canBeDivided = exports.roundByStep = exports.castInto = exports.trueFn = exports.falseFn = exports.emptyFn = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
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
	function assert(condition, errorMessage) {
		if (!condition) throw new Error(errorMessage);
	}
	exports.assert = assert;
	function inject(originalFn, additionalFn) {
		var newFn = function() {
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			var result = originalFn.apply(null, args);
			if (result !== false) additionalFn();
			return result;
		};
		newFn.__dui_injected_fn__ = true;
		return newFn;
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
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/keepDom.js
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
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/style.js
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
			globalObj.__duim_style_registry__ = globalObj.__duim_style_registry__ || {};
			this.registry = globalObj.__duim_style_registry__;
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
		if (Array.isArray(styleRegistryManage.get(key))) {
			styleRegistryManage.add(key, bundledBy);
			warnRedundantInject(key);
			return;
		}
		styleRegistryManage.set(key, [bundledBy]);
		var versions = getFileVersions(fileKey);
		if (versions.length > 1) warnMultipleVersions(fileKey, versions);
		var domKey = createElement_1.isScopedAttributeDisabled ? fileKey : key;
		if (helper_1.isBrowser) {
			var styleElement = document.createElement("style");
			styleElement.setAttribute("type", "text/css");
			styleElement.setAttribute("data-duim-key", domKey);
			styleElement.innerText = css;
			var currentVersionElementSelector = createElement_1.isScopedAttributeDisabled ? "style[data-duim-key]" : "style[data-duim-key|=\"" + version_1.default + "\"]";
			var existingElements = document.head.querySelectorAll(currentVersionElementSelector);
			if (existingElements.length > 0) {
				existingElements[existingElements.length - 1].after(styleElement);
				return;
			}
			document.head.insertBefore(styleElement, document.head.firstChild);
		} else if (typeof injectContentBeforeRoot === "function") {
			var styleElement = "<style type=\"text/css\" data-duim-key=\"" + domKey + "\">" + css + "</style>";
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
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/polyfill.js
var require_polyfill = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
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
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/theme.js
var require_theme = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createThemedClassNames = exports.consumeTheme = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var classnames_1 = tslib_1.__importDefault(require_classnames());
	require_polyfill();
	require_style().injectStyle("common/global.css", "[data-duim-1-9-0]{-webkit-tap-highlight-color:transparent}.__DARK__{--duim-invert-filter:invert() hue-rotate(180deg) brightness(120%) grayscale();--duim-blur-minor-bg-color:rgba(28,29,31,0.92);--duim-blur-major-bg-color:rgba(36,37,41,0.72);--duim-mask-color:rgba(0,0,0,0.65)}");
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
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/show.js
var require_show = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.showWithTransition = exports.ShowCloseContext = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var helper_1 = require_helper();
	var flatten_1 = tslib_1.__importDefault(require_flatten());
	exports.ShowCloseContext = React.createContext(helper_1.emptyFn);
	function showWithTransition(_a) {
		var Component = _a.Component, transitionDuration = _a.transitionDuration, autoClose = _a.autoClose, props = _a.props, forcedProps = _a.forcedProps, _b = _a.injectClosePropNames, injectClosePropNames = _b === void 0 ? [] : _b, _c = _a.deepInjectClosePaths, deepInjectClosePaths = _c === void 0 ? [] : _c, _d = _a.contexts, contexts = _d === void 0 ? [] : _d;
		var div = document.createElement("div");
		document.body.appendChild(div);
		var timer;
		var closed = false;
		injectClose(props);
		var currentProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, props), forcedProps), { visible: true });
		function overrideSingle(obj, key) {
			var originalValue = obj[key] || helper_1.emptyFn;
			if (originalValue.__dui_injected_fn__) return;
			obj[key] = helper_1.inject(originalValue, close);
		}
		function injectClose(propsToInject) {
			injectClosePropNames.forEach(function(key) {
				overrideSingle(propsToInject, key);
			});
			deepInjectClosePaths.forEach(function(path) {
				var segments = path.split(".");
				var finalKey = segments.pop();
				var objectWalkers = [propsToInject];
				var _loop_1 = function(seg) {
					var nextLevelObjects = flatten_1.default(objectWalkers.map(function(obj) {
						return obj[seg];
					}).filter(function(value) {
						return value;
					}));
					if (!nextLevelObjects.length) return { value: void 0 };
					objectWalkers = nextLevelObjects;
				};
				for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
					var seg = segments_1[_i];
					var state_1 = _loop_1(seg);
					if (typeof state_1 === "object") return state_1.value;
				}
				objectWalkers.forEach(function(obj) {
					overrideSingle(obj, finalKey);
				});
			});
		}
		function update(newProps) {
			if (closed) return;
			currentProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, currentProps), newProps), forcedProps), { visible: true });
			injectClose(currentProps);
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
		var effectiveContexts = [{
			provider: exports.ShowCloseContext.Provider,
			value: close
		}].concat(contexts);
		function render(props) {
			react_dom_1.default.render(composeContexts(effectiveContexts, h(Component, tslib_1.__assign({}, props))), div);
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
//#region ../../node_modules/@tencent/dui-mobile/lib/utils/preventScrollPenetrate.js
var require_preventScrollPenetrate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PreventScrollPenetrateContainer = exports.preventSelfScrollPenetrate = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var STYLUS_TOUCH_MOVE_CLICK_DISTANCE = 10;
	function getScrollParent(node, container) {
		if (!node || node === container || !container.contains(node)) return container;
		if (node.scrollHeight > node.clientHeight) return node;
		else return getScrollParent(node.parentNode, container);
	}
	function preventSelfScrollPenetrate(_a) {
		var container = _a.container, _b = _a.direction, direction = _b === void 0 ? "y" : _b, _c = _a.stopPropagationBorder, stopPropagationBorder = _c === void 0 ? null : _c, touchStartEvent = _a.touchStartEvent;
		if (!container || container.__preventSelfScrollPenetrate) return;
		var prevX;
		var prevY;
		var reachBorderInScroll = null;
		var scrollParent;
		var handleTouchStart = function(event) {
			reachBorderInScroll = null;
			var touch = event.touches[0];
			prevX = touch.screenX;
			prevY = touch.screenY;
			scrollParent = getScrollParent(event.target, container);
		};
		var handleTouchMove = function(event) {
			var touch = event.touches[0];
			var deltaX = touch.screenX - prevX;
			var deltaY = touch.screenY - prevY;
			if ((Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y") !== direction || !scrollParent) return;
			var isAtLowerX = direction === "x" && scrollParent.scrollLeft === 0;
			var isAtUpperX = direction === "x" && scrollParent.scrollLeft === scrollParent.scrollWidth - scrollParent.offsetWidth;
			var isAtLowerY = direction === "y" && scrollParent.scrollTop === 0;
			var isAtUpperY = direction === "y" && scrollParent.scrollTop === scrollParent.scrollHeight - scrollParent.offsetHeight;
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
		if (touchStartEvent && container.contains(touchStartEvent.target)) handleTouchStart(touchStartEvent);
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
						preventSelfScrollPenetrate({
							container: elem,
							touchStartEvent: event
						});
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
			if (this.props.disabled) return;
			var container = this.domRef.current;
			container.addEventListener("touchstart", this.handleTouchStart);
			container.addEventListener("touchmove", this.handleTouchMove, { passive: false });
		};
		PreventScrollPenetrateContainer.prototype.render = function() {
			var _a = this.props;
			_a.disabled;
			var children = _a.children, rest = tslib_1.__rest(_a, ["disabled", "children"]);
			return h("div", tslib_1.__assign({}, rest, { ref: this.domRef }), children);
		};
		return PreventScrollPenetrateContainer;
	}(React.Component);
	function calcDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
}));
//#endregion
export { require_keepDom as a, require_style as i, require_show as n, require_helper as o, require_theme as r, require_createElement as s, require_preventScrollPenetrate as t };
