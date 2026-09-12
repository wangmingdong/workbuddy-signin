import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { i as require_style, r as require_theme, s as require_createElement } from "./preventScrollPenetrate-D7xvP-pE.js";
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Loading/Spin.js
var require_Spin = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	require_style().injectStyle("components/Loading/style/spin.css", "[data-duim-1-9-0~=\"dui-m-spin\"]{position:relative;width:100%;height:100%}[data-duim-1-9-0~=\"dui-m-spin-container\"]{position:absolute;left:50%;top:50%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:48px;height:48px}[data-duim-1-9-0~=\"dui-m-spin-circle\"]{border-radius:50%;width:100%;height:100%;-webkit-animation:dui-m-spin-rotate .8s linear infinite;animation:dui-m-spin-rotate .8s linear infinite;-webkit-box-sizing:border-box;box-sizing:border-box}[data-duim-1-9-0~=\"dui-m-spin-circle-light\"]{border:4px solid hsla(0,0%,100%,.4);border-top-color:#fff}[data-duim-1-9-0~=\"dui-m-spin-circle-dark\"]{border:4px solid rgba(0,0,0,.12);border-top-color:rgba(0,0,0,.32)}[data-duim-1-9-0~=\"dui-m-spin-circle-primary\"]{border:4px solid rgba(30,111,255,.24);border-top:4px solid var(--accent-default,#1e6fff)}@-webkit-keyframes dui-m-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-m-spin-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}");
	var theme_1 = require_theme();
	var VIEW_BOX_SIZE = 48;
	var Spin = function(_super) {
		tslib_1.__extends(Spin, _super);
		function Spin() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.rootRef = React.createRef();
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
			return theme_1.consumeTheme(this.themedRender);
		};
		return Spin;
	}(React.PureComponent);
	exports.default = Spin;
	Spin.defaultProps = {
		prefixCls: "dui-m-spin",
		type: "dark"
	};
}));
//#endregion
export { require_Spin as t };
