import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { a as require_keepDom, i as require_style, n as require_show$1, o as require_helper, r as require_theme, s as require_createElement, t as require_preventScrollPenetrate } from "./preventScrollPenetrate-D7xvP-pE.js";
import { t as require_Spin } from "./Spin-B1fQ5dYI.js";
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Loading/Loading.js
var require_Loading$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LOADING_TRANSITION_DURATION = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var Spin_1 = tslib_1.__importDefault(require_Spin());
	var keepDom_1 = require_keepDom();
	var theme_1 = require_theme();
	var preventScrollPenetrate_1 = require_preventScrollPenetrate();
	exports.LOADING_TRANSITION_DURATION = 200;
	var Loading = function(_super) {
		tslib_1.__extends(Loading, _super);
		function Loading() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.themedRender = function(classNames) {
				var _a, _b;
				var _c = _this.props, prefixCls = _c.prefixCls, className = _c.className, style = _c.style, tip = _c.tip, visible = _c.visible, children = _c.children, embedded = _c.embedded, tipStyle = _c.tipStyle, zIndex = _c.zIndex, tipClassName = _c.tipClassName, maskClassName = _c.maskClassName, maskStyle = _c.maskStyle;
				var type = children ? "wrap" : embedded ? "embedded" : "fixed";
				var cls = classNames(prefixCls, className, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-hidden"] = !visible && !embedded, _a));
				var maskCls = classNames(prefixCls + "-mask", prefixCls + "-mask-" + type, maskClassName, (_b = {}, _b[prefixCls + "-mask-hidden"] = !visible, _b));
				var containerCls = classNames(prefixCls + "-container", prefixCls + "-container-" + type);
				var defaultSpinSize = {
					width: "48px",
					height: "48px"
				};
				var tipElement = tip ? h("div", {
					className: classNames(prefixCls + "-tip", tipClassName),
					style: tipStyle
				}, tip) : null;
				if (type === "wrap") return h("div", { className: containerCls }, children, h("div", {
					className: maskCls,
					style: maskStyle,
					"aria-hidden": !visible
				}, h("div", {
					className: cls,
					style
				}, h(Spin_1.default, {
					style: defaultSpinSize,
					type: _this.getUserSetSpinType() || "dark"
				}), tipElement)));
				if (type === "embedded") return h("div", {
					className: cls,
					style: tslib_1.__assign(tslib_1.__assign({}, defaultSpinSize), style)
				}, h(Spin_1.default, { type: _this.getUserSetSpinType() || "dark" }));
				if (!keepDom_1.decideKeepDom.call(_this, exports.LOADING_TRANSITION_DURATION, visible)) return null;
				return react_dom_1.default.createPortal(h(preventScrollPenetrate_1.PreventScrollPenetrateContainer, {
					className: containerCls,
					style: { zIndex },
					"aria-hidden": !visible
				}, h("div", {
					className: maskCls,
					style: maskStyle
				}), h("div", {
					className: cls,
					style
				}, h(Spin_1.default, {
					style: defaultSpinSize,
					type: _this.getUserSetSpinType() || "light"
				}), tipElement)), document.body);
			};
			return _this;
		}
		Loading.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		Loading.prototype.getUserSetSpinType = function() {
			return this.props.spinType || (document.documentElement.classList.contains("__DARK__") ? "light" : void 0);
		};
		return Loading;
	}(React.Component);
	exports.default = Loading;
	Loading.defaultProps = {
		prefixCls: "dui-m-loading",
		visible: false,
		embedded: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Loading/show.js
var require_show = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Loading_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importStar(require_Loading$1());
	var show_1 = require_show$1();
	exports.default = require_helper().wrapWithConfigDefaults(function(config) {
		if (config === void 0) config = {};
		return show_1.showWithTransition({
			Component: Loading_1.default,
			transitionDuration: Loading_1.LOADING_TRANSITION_DURATION,
			autoClose: false,
			forcedProps: { embedded: false },
			props: config,
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Loading/index.js
var require_Loading = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Loading = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	require_style().injectStyle("components/Loading/style/index.css", "@-webkit-keyframes dui-m-loading-fade-in{0%{opacity:0}to{opacity:1}}@keyframes dui-m-loading-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes dui-m-loading-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes dui-m-loading-rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes dui-m-loading-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes dui-m-loading-pop-up{0%{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1)}}[data-duim-1-9-0~=\"dui-m-loading-wrap\"] [data-duim-1-9-0~=\"dui-m-loading-tip\"]{color:rgba(0,0,0,.8)}[data-duim-1-9-0~=\"dui-m-loading-fixed\"]{background:rgba(0,0,0,.8);-webkit-animation:dui-m-loading-pop-up .2s ease-out;animation:dui-m-loading-pop-up .2s ease-out;-webkit-transition:all .2s ease-out;transition:all .2s ease-out}[data-duim-1-9-0~=\"dui-m-loading-fixed\"],[data-duim-1-9-0~=\"dui-m-loading-wrap\"]{-webkit-box-sizing:border-box;box-sizing:border-box;min-width:130px;min-height:130px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:26px 21px 22px;border-radius:4px}[data-duim-1-9-0~=\"dui-m-loading-hidden\"]{opacity:0;-webkit-transform:scale3d(.95,.95,1);transform:scale3d(.95,.95,1)}[data-duim-1-9-0~=\"dui-m-loading-container\"]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}[data-duim-1-9-0~=\"dui-m-loading-container-fixed\"]{position:fixed;z-index:9999;top:0;left:0;right:0;bottom:0}[data-duim-1-9-0~=\"dui-m-loading-container-wrap\"]{position:relative}[data-duim-1-9-0~=\"dui-m-loading-mask\"]{position:absolute;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;left:0;top:0;width:100%;height:100%;background-color:var(--duim-mask-color,hsla(0,0%,100%,.65));-webkit-transition:all .2s ease-out;transition:all .2s ease-out}[data-duim-1-9-0~=\"dui-m-loading-mask-fixed\"]{z-index:-1;-webkit-animation:dui-m-loading-fade-in .2s ease-out;animation:dui-m-loading-fade-in .2s ease-out}[data-duim-1-9-0~=\"dui-m-loading-mask-hidden\"]{opacity:0}[data-duim-1-9-0~=\"dui-m-loading-tip\"]{color:#fff;font-size:14px;margin-top:18px;line-height:16px}");
	var show_1 = tslib_1.__importDefault(require_show());
	var Loading_1 = tslib_1.__importDefault(require_Loading$1());
	exports.Loading = Loading_1.default;
	Loading_1.default.show = show_1.default;
	exports.default = Loading_1.default;
}));
//#endregion
export default require_Loading();
