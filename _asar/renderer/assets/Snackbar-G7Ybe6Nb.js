import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { a as require_keepDom, i as require_style, n as require_show$1, o as require_helper, r as require_theme, s as require_createElement, t as require_preventScrollPenetrate } from "./preventScrollPenetrate-D7xvP-pE.js";
import { t as require_Spin } from "./Spin-B1fQ5dYI.js";
import { t as require_Button } from "./Button-CoSiBNM5.js";
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Snackbar/queue.js
var require_queue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.hasVisibleInstances = exports.closeById = exports.closeAll = exports.updateVisibleSnackbars = void 0;
	function getVisibleSnackbars() {
		var host = document.body;
		host.__dui_visible_snackbars__ = host.__dui_visible_snackbars__ || [];
		return host.__dui_visible_snackbars__;
	}
	function getIndexOf(instance) {
		return getVisibleSnackbars().findIndex(function(elem) {
			return elem.instance === instance;
		});
	}
	function findReplaceableSnackbar(newInstance) {
		var visibleSnackbars = getVisibleSnackbars();
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
	function updateVisibleSnackbars(instance) {
		var visible = instance.props.visible;
		var index = getIndexOf(instance);
		var visibleSnackbars = getVisibleSnackbars();
		if (visible && index === -1) {
			var replacedSnackbar = findReplaceableSnackbar(instance);
			replacedSnackbar === null || replacedSnackbar === void 0 || replacedSnackbar.instance.handleClose();
			visibleSnackbars.push({ instance });
			var event_1 = new CustomEvent("duim-snackbar-show", { detail: instance.props });
			document.dispatchEvent(event_1);
		}
		if (!visible && index !== -1) visibleSnackbars.splice(index, 1);
	}
	exports.updateVisibleSnackbars = updateVisibleSnackbars;
	function closeAll(force) {
		var snackbars = document.body.__dui_visible_snackbars__;
		snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
			var _b = _a.instance.props, autoClose = _b.autoClose, closable = _b.closable;
			return force || autoClose || closable;
		}).forEach(function(item) {
			return item.instance.handleClose();
		});
	}
	exports.closeAll = closeAll;
	function closeById(id) {
		var snackbars = document.body.__dui_visible_snackbars__;
		snackbars === null || snackbars === void 0 || snackbars.filter(function(_a) {
			return _a.instance.props.id === id;
		}).forEach(function(item) {
			return item.instance.handleClose();
		});
	}
	exports.closeById = closeById;
	function hasVisibleInstances() {
		var _a;
		return Boolean((_a = document.body.__dui_visible_snackbars__) === null || _a === void 0 ? void 0 : _a.length);
	}
	exports.hasVisibleInstances = hasVisibleInstances;
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Snackbar/Snackbar.js
var require_Snackbar$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isActionArray = exports.SNACKBAR_TRANSITION_DURATION = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var helper_1 = require_helper();
	var keepDom_1 = require_keepDom();
	var Spin_1 = tslib_1.__importDefault(require_Spin());
	var theme_1 = require_theme();
	var show_1 = require_show$1();
	var preventScrollPenetrate_1 = require_preventScrollPenetrate();
	var queue_1 = require_queue();
	var Button_1 = tslib_1.__importDefault(require_Button());
	exports.SNACKBAR_TRANSITION_DURATION = 200;
	function isActionArray(action) {
		return Array.isArray(action) && action.length > 0 && action[0].text;
	}
	exports.isActionArray = isActionArray;
	var Snackbar = function(_super) {
		tslib_1.__extends(Snackbar, _super);
		function Snackbar() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.prevTouchScreenY = 0;
			_this.handleTouchStart = function(e) {
				var touch = _this.getValidTouch(e);
				if (!touch) return;
				_this.prevTouchScreenY = touch.screenY;
			};
			_this.handleTouchMove = function(e) {
				var touch = _this.getValidTouch(e);
				if (!touch) return;
				if (_this.prevTouchScreenY - touch.screenY > 8) return _this.context();
				_this.prevTouchScreenY = touch.screenY;
			};
			_this.handleClickAction = function() {
				_this.props.onClickAction();
				_this.handleClose();
			};
			_this.handleClickClose = function() {
				_this.props.onClickClose();
				_this.handleClose();
			};
			_this.handleClose = function() {
				_this.props.onClose();
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, children = _b.children, message = _b.message, placement = _b.placement, visible = _b.visible, type = _b.type, zIndex = _b.zIndex, testId = _b.testId, closable = _b.closable;
				var classes = classNames(prefixCls, className, prefixCls + "-" + placement, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-hidden"] = !visible, _a[prefixCls + "-override-icon"] = _this.renderUserSetIcon(classNames), _a));
				var messageClasses = classNames(prefixCls + "-message");
				if (!keepDom_1.decideKeepDom.call(_this, exports.SNACKBAR_TRANSITION_DURATION, visible)) return null;
				return react_dom_1.default.createPortal(h(preventScrollPenetrate_1.PreventScrollPenetrateContainer, {
					className: classes,
					style: tslib_1.__assign({ zIndex }, style),
					onTouchStart: _this.handleTouchStart,
					onTouchMove: _this.handleTouchMove,
					"data-testid": testId
				}, _this.renderIcon(classNames), h("span", { className: messageClasses }, children || message), _this.renderAction(classNames), closable && h("div", {
					className: classNames(prefixCls + "-close"),
					onClick: _this.handleClickClose
				})), document.body);
			};
			return _this;
		}
		Snackbar.prototype.componentDidMount = function() {
			queue_1.updateVisibleSnackbars(this);
		};
		Snackbar.prototype.componentDidUpdate = function() {
			queue_1.updateVisibleSnackbars(this);
		};
		Snackbar.prototype.getValidTouch = function(e) {
			var _a = this.props, autoClose = _a.autoClose;
			if (!_a.visible || !autoClose) return null;
			return e.touches.item(0);
		};
		Snackbar.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		Snackbar.prototype.renderAction = function(classNames) {
			var _this = this;
			var _a = this.props, prefixCls = _a.prefixCls, action = _a.action;
			if (!action) return null;
			if (isActionArray(action)) return h("span", { className: classNames(prefixCls + "-actions") }, action.map(function(a, index) {
				return h(Button_1.default, {
					key: index,
					className: classNames(prefixCls + "-action"),
					onClick: function() {
						var _a;
						(_a = a.onClick) === null || _a === void 0 || _a.call(a);
						_this.handleClose();
					}
				}, a.text);
			}));
			return h(Button_1.default, {
				className: classNames(prefixCls + "-action"),
				onClick: this.handleClickAction
			}, action);
		};
		Snackbar.prototype.renderUserSetIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, type = _a.type, icon = _a.icon;
			if (!icon) return null;
			if (React.isValidElement(icon)) return h("div", { className: classNames(prefixCls + "-icon-container") }, icon);
			if (typeof icon === "object" && icon[type]) return h("div", { className: classNames(prefixCls + "-icon-container") }, icon[type]);
			return null;
		};
		Snackbar.prototype.renderIcon = function(classNames) {
			var _a = this.props, prefixCls = _a.prefixCls, spinType = _a.spinType, type = _a.type;
			var userSetIcon = this.renderUserSetIcon(classNames);
			if (userSetIcon) return userSetIcon;
			return type === "loading" ? h(Spin_1.default, {
				type: spinType,
				className: classNames(prefixCls + "-loading-indicator"),
				circleClassName: classNames(prefixCls + "-loading-indicator-circle")
			}) : null;
		};
		Snackbar.contextType = show_1.ShowCloseContext;
		return Snackbar;
	}(React.Component);
	exports.default = Snackbar;
	Snackbar.defaultProps = {
		prefixCls: "dui-m-snackbar",
		placement: "top",
		onClickAction: helper_1.emptyFn,
		type: "info",
		spinType: "primary",
		closable: false,
		onClose: helper_1.emptyFn,
		onClickClose: helper_1.emptyFn
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Snackbar/show.js
var require_show = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Snackbar_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importStar(require_Snackbar$1());
	var show_1 = require_show$1();
	exports.default = require_helper().wrapWithConfigDefaults(function(config) {
		config.autoClose = typeof config.autoClose === "boolean" ? config.autoClose : true;
		return show_1.showWithTransition({
			Component: Snackbar_1.default,
			transitionDuration: Snackbar_1.SNACKBAR_TRANSITION_DURATION,
			autoClose: config.autoClose,
			props: config,
			injectClosePropNames: ["onClickAction", "onClose"],
			deepInjectClosePaths: Snackbar_1.isActionArray(config.action) ? ["action.onClick"] : [],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/dui-mobile/lib/components/Snackbar/index.js
var require_Snackbar = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Snackbar = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var Snackbar_1 = tslib_1.__importDefault(require_Snackbar$1());
	exports.Snackbar = Snackbar_1.default;
	require_style().injectStyle("components/Snackbar/style/index.css", "@-webkit-keyframes dui-m-snackbar-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes dui-m-snackbar-slide-in-top{0%{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes dui-m-snackbar-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes dui-m-snackbar-slide-in-bottom{0%{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}[data-duim-1-9-0~=\"dui-m-snackbar\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:10000;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;left:16px;right:16px;height:52px;padding:0 8px 0 12px;font-size:14px;color:var(--text-ultrastrong,rgba(0,0,0,.9));border-radius:8px;border:1px solid var(--border-weak,rgba(0,0,0,.04));-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);background-color:var(--bg-lv3-default,#fff);-webkit-box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08);box-shadow:0 24px 48px 2px rgba(0,0,0,.08),0 5px 12px 4px rgba(0,0,0,.08)}[data-duim-1-9-0~=\"dui-m-snackbar\"]:before{content:\"\";display:inline-block;background-position:50%;background-repeat:no-repeat;background-size:contain}[data-duim-1-9-0~=\"dui-m-snackbar-icon-container\"],[data-duim-1-9-0~=\"dui-m-snackbar\"]:before{width:24px;height:24px;margin-right:4px}[data-duim-1-9-0~=\"dui-m-snackbar-override-icon\"]:before{display:none}[data-duim-1-9-0~=\"dui-m-snackbar-info\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%231e6fff'/%3E%3Cpath fill='%23fff' d='M26 21v12h2v2h-8v-2h2V23h-2v-2h6zm-2-8a3 3 0 1 1 0 6 3 3 0 1 1 0-6z'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-snackbar-success\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%2304dd7d'/%3E%3Cpath fill='%23fff' d='M17.93 22l3.95 3.95 9.9-9.9 2.828 2.83L21.88 31.607l-6.778-6.78L17.93 22z'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-snackbar-error\"]:before,[data-duim-1-9-0~=\"dui-m-snackbar-warning\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='18' fill='%23fb4d3f'/%3E%3Cpath fill='%23fff' d='M24 29a3 3 0 1 1 0 6 3 3 0 1 1 0-6zm3-16l-1 14h-4l-1-14h6z'/%3E%3C/svg%3E\")}[data-duim-1-9-0~=\"dui-m-snackbar-loading\"]:before{content:none}[data-duim-1-9-0~=\"dui-m-snackbar-loading-indicator\"]{width:18px;height:18px;margin:0 7px 0 3px}[data-duim-1-9-0~=\"dui-m-snackbar-loading-indicator-circle\"]{border-width:8px}[data-duim-1-9-0~=\"dui-m-snackbar-top\"]{-webkit-animation-name:dui-m-snackbar-slide-in-top;animation-name:dui-m-snackbar-slide-in-top;top:16px;margin-top:env(safe-area-inset-top)}[data-duim-1-9-0~=\"dui-m-snackbar-top\"][data-duim-1-9-0~=\"dui-m-snackbar-hidden\"]{opacity:0;-webkit-transform:scaleX(1) translateY(-100%);transform:scaleX(1) translateY(-100%)}[data-duim-1-9-0~=\"dui-m-snackbar-bottom\"]{-webkit-animation-name:dui-m-snackbar-slide-in-bottom;animation-name:dui-m-snackbar-slide-in-bottom;bottom:16px;margin-bottom:env(safe-area-inset-bottom)}[data-duim-1-9-0~=\"dui-m-snackbar-bottom\"][data-duim-1-9-0~=\"dui-m-snackbar-hidden\"]{opacity:0;-webkit-transform:scaleX(1) translateY(100%);transform:scaleX(1) translateY(100%)}[data-duim-1-9-0~=\"dui-m-snackbar-message\"]{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden;text-overflow:ellipsis}[data-duim-1-9-0~=\"dui-m-snackbar-action\"]{min-width:0;font-weight:600}[data-duim-1-9-0~=\"dui-m-snackbar-actions\"]>[data-duim-1-9-0~=\"dui-m-snackbar-action\"]:not(:first-child){margin-left:6px}[data-duim-1-9-0~=\"dui-m-snackbar-close\"]{width:24px;height:24px;margin-left:4px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23000' fill-opacity='.16'/%3E%3Cpath fill-rule='evenodd' d='M10.833 10.832a.584.584 0 0 0 .004-.814L8.822 8.002l2.015-2.02a.584.584 0 0 0-.004-.814.58.58 0 0 0-.814-.004L7.999 7.18l-2.02-2.02c-.209-.209-.592-.218-.814.004s-.218.605-.004.818l2.02 2.02-2.02 2.02a.59.59 0 0 0 .004.814.593.593 0 0 0 .814.004l2.02-2.02 2.02 2.015a.58.58 0 0 0 .814-.004z' fill='%23fff'/%3E%3C/svg%3E\");background-size:16px;background-position:50%;background-repeat:no-repeat}[data-duim-1-9-0~=\"dui-m-snackbar-close\"]:active{opacity:.5}");
	var show_1 = tslib_1.__importDefault(require_show());
	var queue_1 = require_queue();
	Snackbar_1.default.show = show_1.default;
	Snackbar_1.default.closeAll = queue_1.closeAll;
	Snackbar_1.default.closeById = queue_1.closeById;
	Snackbar_1.default.hasVisibleInstances = queue_1.hasVisibleInstances;
	exports.default = Snackbar_1.default;
}));
//#endregion
export { require_Snackbar as t };
