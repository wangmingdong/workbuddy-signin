import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { i as require_style, r as require_theme, s as require_createElement } from "./preventScrollPenetrate-D7xvP-pE.js";
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Button/Button.js
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
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, type = _b.type, size = _b.size, disabled = _b.disabled, testId = _b.testId, rest = tslib_1.__rest(_b, [
					"prefixCls",
					"className",
					"style",
					"type",
					"size",
					"disabled",
					"testId"
				]);
				var classes = classNames(prefixCls, className, (_a = {}, _a[prefixCls + "-type-" + type] = type, _a[prefixCls + "-size-" + size] = size, _a[prefixCls + "-disabled"] = disabled, _a));
				return h("button", tslib_1.__assign({}, rest, {
					className: classes,
					style,
					disabled,
					"data-testid": testId
				}), _this.props.children);
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
		prefixCls: "dui-m-button",
		type: "default",
		size: "default"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Button/index.js
var require_Button = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Button = void 0;
	var Button_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_Button$1());
	exports.Button = Button_1.default;
	require_style().injectStyle("components/Button/style/index.css", "[data-duim-1-9-0~=\"dui-m-button\"]{outline:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;white-space:nowrap;border-radius:8px;font-size:14px;font-weight:500;border:1px solid transparent}[data-duim-1-9-0~=\"dui-m-button\"]:disabled{border-color:transparent;pointer-events:none}[data-duim-1-9-0~=\"dui-m-button-type-default\"]{background:var(--bg-lv4-default,#fff);color:var(--text-link,#175ceb)}[data-duim-1-9-0~=\"dui-m-button-type-default\"]:active{background:var(--bg-lv4-medium,#f3f5f7)}[data-duim-1-9-0~=\"dui-m-button-type-default\"]:disabled{background:var(--bg-lv4-default,#fff);color:var(--accent-disabled,#c2d8ff)}[data-duim-1-9-0~=\"dui-m-button-type-plain\"]{background:var(--tsp-fill-medium,rgba(51,77,102,.08));color:var(--text-ultrastrong,rgba(0,0,0,.9))}[data-duim-1-9-0~=\"dui-m-button-type-plain\"]:active{background:var(--tsp-fill-strong,rgba(61,82,102,.12))}[data-duim-1-9-0~=\"dui-m-button-type-plain\"]:disabled{color:var(--text-weak,rgba(0,0,0,.26));background:var(--tsp-fill-weak,rgba(51,77,102,.06))}[data-duim-1-9-0~=\"dui-m-button-type-primary\"]{background:var(--accent-default,#1e6fff);color:var(--text-white,#fff)}[data-duim-1-9-0~=\"dui-m-button-type-primary\"]:active{background:var(--accent-pressed,#134ae0)}[data-duim-1-9-0~=\"dui-m-button-type-primary\"]:disabled{color:hsla(0,0%,100%,.5);background:var(--accent-disabled,#c2d8ff)}[data-duim-1-9-0~=\"dui-m-button-type-warning\"]{background:var(--critical-default,#ff4747);color:var(--text-white,#fff)}[data-duim-1-9-0~=\"dui-m-button-type-warning\"]:active{background:var(--critical-pressed,#e02424)}[data-duim-1-9-0~=\"dui-m-button-type-warning\"]:disabled{color:var(--text-white,#fff);background:var(--critical-disabled,#fcc)}[data-duim-1-9-0~=\"dui-m-button-type-hollow\"]{background:#fff;color:var(--accent-default,#1e6fff);border-color:var(--accent-default,#1e6fff)}[data-duim-1-9-0~=\"dui-m-button-type-hollow\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-button-type-hollow\"]:disabled{border-color:var(--accent-default,#1e6fff);opacity:.4}[data-duim-1-9-0~=\"dui-m-button-type-golden\"]{background:-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(270deg,#fdc668,#fcdb9f);border:none;color:rgba(0,0,0,.88)}[data-duim-1-9-0~=\"dui-m-button-type-golden\"]:active{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.08)),to(rgba(0,0,0,.08))),-webkit-gradient(linear,right top,left top,from(#fdc668),to(#fcdb9f));background:-webkit-linear-gradient(bottom,rgba(0,0,0,.08),rgba(0,0,0,.08)),-webkit-linear-gradient(right,#fdc668,#fcdb9f);background:linear-gradient(0deg,rgba(0,0,0,.08),rgba(0,0,0,.08)),linear-gradient(270deg,#fdc668,#fcdb9f)}[data-duim-1-9-0~=\"dui-m-button-type-golden\"]:disabled{opacity:.4}[data-duim-1-9-0~=\"dui-m-button-type-golden-dark\"]{background:-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%);border:none;color:#fae0a5}[data-duim-1-9-0~=\"dui-m-button-type-golden-dark\"]:active{background:-webkit-linear-gradient(bottom,rgba(0,0,0,.32),rgba(0,0,0,.32)),-webkit-linear-gradient(336.31deg,#454952 15.25%,#272a33 84.75%);background:linear-gradient(0deg,rgba(0,0,0,.32),rgba(0,0,0,.32)),linear-gradient(113.69deg,#454952 15.25%,#272a33 84.75%)}[data-duim-1-9-0~=\"dui-m-button-type-golden-dark\"]:disabled{opacity:.4}[data-duim-1-9-0~=\"dui-m-button-type-golden-outline\"]{border-color:#db8f1c;color:#db8f1c;background:var(--bg-lv4-default,#fff)}[data-duim-1-9-0~=\"dui-m-button-type-golden-outline\"]:active{opacity:.5}[data-duim-1-9-0~=\"dui-m-button-type-golden-outline\"]:disabled{border-color:#db8f1c;opacity:.4}[data-duim-1-9-0~=\"dui-m-button-size-large\"]{min-width:160px;height:48px;padding:0 30px;font-size:17px;border-radius:12px}[data-duim-1-9-0~=\"dui-m-button-size-small\"]{min-width:52px;height:28px;padding:0 8px;font-size:12px}[data-duim-1-9-0~=\"dui-m-button-size-default\"]{height:32px;padding:0 7px;min-width:56px}");
	exports.default = Button_1.default;
}));
//#endregion
export { require_Button as t };
