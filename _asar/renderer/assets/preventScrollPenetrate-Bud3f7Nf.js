import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { a as require_createElement } from "./show-Dop6Y-FF.js";
//#region ../../node_modules/@tencent/dui/lib/utils/preventScrollPenetrate.js
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
export { require_preventScrollPenetrate as t };
