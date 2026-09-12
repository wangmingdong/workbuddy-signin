import { o as __toCommonJS, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { m as tslib_es6_exports, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { t as require_prop_types } from "./prop-types-DD6A3Rdg.js";
import { a as require_createElement, i as require_style, n as require_keepDom, o as require_helper, r as require_theme, t as require_show$1 } from "./show-Dop6Y-FF.js";
import { t as require_Spin } from "./Spin-D7ag8e_l.js";
import { n as require_context, t as require_locale } from "./locale-CbrNzi3U.js";
//#region ../../node_modules/@tencent/dui/lib/components/Snackbar/queue.js
var require_queue = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.hasVisibleInstances = exports.closeById = exports.closeAll = exports.getMarginTop = exports.updateVisibleSnackbars = void 0;
	var SNACKBAR_GAP = 50;
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
			var event_1 = new CustomEvent("dui-snackbar-show", { detail: instance.props });
			document.dispatchEvent(event_1);
		}
		if (!visible && index !== -1) visibleSnackbars.splice(index, 1);
	}
	exports.updateVisibleSnackbars = updateVisibleSnackbars;
	function getMarginTop(instance) {
		var index = getIndexOf(instance);
		var visibleSnackbars = getVisibleSnackbars(instance);
		return index !== -1 ? visibleSnackbars[index].marginTop : getNextMargin(instance);
	}
	exports.getMarginTop = getMarginTop;
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
//#region ../../node_modules/@tencent/dui/lib/components/Snackbar/constant.js
var require_constant = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SNACKBAR_LEAVING_TRANSITION_DURATION = void 0;
	exports.SNACKBAR_LEAVING_TRANSITION_DURATION = 200;
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/components/Snackbar/Snackbar.js
var require_Snackbar$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var react_dom_1 = tslib_1.__importDefault(require_react_dom());
	var helper_1 = require_helper();
	var keepDom_1 = require_keepDom();
	var Spin_1 = tslib_1.__importDefault(require_Spin());
	var context_1 = require_context();
	var theme_1 = require_theme();
	var queue_1 = require_queue();
	var constant_1 = require_constant();
	var locale_1 = require_locale();
	var Snackbar = function(_super) {
		tslib_1.__extends(Snackbar, _super);
		function Snackbar() {
			var _a;
			var _this = _super.apply(this, arguments) || this;
			_this.selfRef = React.createRef();
			_this.disableAutoFocus = helper_1.isBrowser && ((_a = window.__dui_disable_auto_focus_map__) === null || _a === void 0 ? void 0 : _a.Snackbar) || _this.props.autoFocus === false;
			_this.handleClickAction = function() {
				_this.getEffectiveProps().onClickAction();
				_this.handleClose();
			};
			_this.handleClickClose = function() {
				_this.getEffectiveProps().onClickClose();
				_this.handleClose();
			};
			_this.handleClose = function() {
				_this.getEffectiveProps().onClose();
			};
			_this.themedRender = function(classNames) {
				var _a;
				var _b = _this.getEffectiveProps(), prefixCls = _b.prefixCls, className = _b.className, style = _b.style, action = _b.action, children = _b.children, message = _b.message, visible = _b.visible, closable = _b.closable, type = _b.type, zIndex = _b.zIndex, showIcon = _b.showIcon, testId = _b.testId, emphasize = _b.emphasize;
				var placement = "top";
				var messageCls = classNames(prefixCls + "-message");
				if (!keepDom_1.decideKeepDom.call(_this, constant_1.SNACKBAR_LEAVING_TRANSITION_DURATION, visible)) return null;
				var containerDom = _this.getContainerDom();
				var cls = classNames(prefixCls, className, prefixCls + "-" + placement, prefixCls + "-" + type, (_a = {}, _a[prefixCls + "-emphasize"] = emphasize, _a[prefixCls + "-with-icon"] = showIcon && !_this.renderUserSetIcon(classNames), _a[prefixCls + "-hidden"] = !visible, _a[prefixCls + "-in-container"] = containerDom !== document.body, _a));
				return react_dom_1.default.createPortal(h("div", {
					className: cls,
					style: tslib_1.__assign({
						zIndex,
						marginTop: queue_1.getMarginTop(_this) + "px"
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
			return helper_1.isDom(this.context) ? this.context : this.getEffectiveProps().containerDom;
		};
		Snackbar.prototype.getEffectiveProps = function() {
			var _a = this.props, type = _a.type, emphasize = _a.emphasize;
			if (!["error", "warning"].includes(type)) return this.props;
			if (type === "warning") return tslib_1.__assign(tslib_1.__assign({}, this.props), {
				type: "error",
				emphasize: false
			});
			if (type === "error" && emphasize === void 0) return tslib_1.__assign(tslib_1.__assign({}, this.props), {
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
			queue_1.updateVisibleSnackbars(this);
		};
		Snackbar.prototype.renderUserSetIcon = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, type = _a.type, showIcon = _a.showIcon, icon = _a.icon;
			if (!showIcon || !icon) return null;
			if (React.isValidElement(icon)) return h("div", { className: classNames(prefixCls + "-icon-container") }, icon);
			if (typeof icon === "object") {
				var resolvedIcon = icon[this.props.type] || icon[type];
				if (!resolvedIcon) return null;
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
						_this.handleClose();
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
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls, spinType = _a.spinType, type = _a.type;
			if (!_a.showIcon) return null;
			var userSetIcon = this.renderUserSetIcon(classNames);
			if (userSetIcon) return userSetIcon;
			return type === "loading" ? h(Spin_1.default, {
				type: spinType,
				className: classNames(prefixCls + "-loading-indicator"),
				circleClassName: classNames(prefixCls + "-loading-indicator-circle")
			}) : null;
		};
		Snackbar.prototype.renderClose = function(classNames) {
			var _a = this.getEffectiveProps(), prefixCls = _a.prefixCls;
			return _a.closable ? h("button", {
				className: classNames(prefixCls + "-close"),
				onClick: this.handleClickClose,
				"aria-label": locale_1.i18n("close")
			}) : null;
		};
		Snackbar.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		Snackbar.contextType = context_1.ContainerContext;
		return Snackbar;
	}(React.Component);
	exports.default = Snackbar;
	Snackbar.defaultProps = {
		prefixCls: "dui-snackbar",
		onClickAction: helper_1.emptyFn,
		closable: false,
		type: "info",
		onClose: helper_1.emptyFn,
		showIcon: true,
		containerDom: typeof document !== "undefined" ? document.body : void 0,
		spinType: "primary",
		onClickClose: helper_1.emptyFn,
		autoFocus: true
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/components/Snackbar/show.js
var require_show = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Snackbar_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports)).__importDefault(require_Snackbar$1());
	var show_1 = require_show$1();
	var helper_1 = require_helper();
	var constant_1 = require_constant();
	exports.default = helper_1.wrapWithConfigDefaults(function(config) {
		var _a = config.autoClose, autoClose = _a === void 0 ? true : _a;
		config.autoClose = autoClose;
		return show_1.showWithTransition({
			Component: Snackbar_1.default,
			transitionDuration: constant_1.SNACKBAR_LEAVING_TRANSITION_DURATION,
			autoClose,
			props: config,
			injectClosePropNames: ["onClose"],
			contexts: config.contexts
		});
	});
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/components/Snackbar/Container.js
var require_Container = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var h = require_createElement().h;
	var React = tslib_1.__importStar(require_react());
	var PropTypes = tslib_1.__importStar(require_prop_types());
	var context_1 = require_context();
	var theme_1 = require_theme();
	var Container = function(_super) {
		tslib_1.__extends(Container, _super);
		function Container() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.ref = React.createRef();
			_this.themedRender = function(classNames) {
				var _a = _this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, children = _a.children;
				return h("div", {
					className: classNames(prefixCls, className),
					style: tslib_1.__assign({ position: "relative" }, style),
					ref: _this.ref
				}, h(context_1.ContainerContext.Provider, { value: _this.ref.current }, children));
			};
			return _this;
		}
		Container.prototype.componentDidMount = function() {
			this.forceUpdate();
		};
		Container.prototype.render = function() {
			return theme_1.consumeTheme(this.themedRender);
		};
		return Container;
	}(React.Component);
	exports.default = Container;
	Container.defaultProps = { prefixCls: "dui-snackbar-container" };
	Container.propTypes = {
		prefixCls: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string
	};
}));
//#endregion
//#region ../../node_modules/@tencent/dui/lib/components/Snackbar/index.js
var require_Snackbar = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Snackbar = void 0;
	var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
	var Snackbar_1 = tslib_1.__importDefault(require_Snackbar$1());
	exports.Snackbar = Snackbar_1.default;
	require_style().injectStyle("components/Snackbar/style/index.css", "@-webkit-keyframes dui-snackbar-slide-in{0%{opacity:0;-webkit-transform:translate(-50%,-20px);transform:translate(-50%,-20px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes dui-snackbar-slide-in{0%{opacity:0;-webkit-transform:translate(-50%,-20px);transform:translate(-50%,-20px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@-webkit-keyframes dui-snackbar-slide-in-container{0%{opacity:0;-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes dui-snackbar-slide-in-container{0%{opacity:0;-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}to{opacity:1;-webkit-transform:translate(-50%);transform:translate(-50%)}}[data-dui-1-28-2~=\"dui-snackbar\"]{-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;z-index:10000;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;left:50%;height:40px;border-radius:4px;padding:10px 10px 10px 12px;-webkit-box-shadow:0 4px 20px 0 rgba(0,0,0,.08);box-shadow:0 4px 20px 0 rgba(0,0,0,.08);border:1px solid rgba(0,0,0,.08);background-color:var(--bg-lv4-default,#fff);color:var(--text-ultrastrong,rgba(0,0,0,.9));font-size:14px;white-space:nowrap;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-animation:dui-snackbar-slide-in .4s cubic-bezier(.4,0,.2,1);animation:dui-snackbar-slide-in .4s cubic-bezier(.4,0,.2,1);-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1)}[data-dui-1-28-2~=\"dui-snackbar-with-icon\"]:before{content:\"\";display:inline-block;background-position:50%;background-repeat:no-repeat;background-size:contain}[data-dui-1-28-2~=\"dui-snackbar-icon-container\"],[data-dui-1-28-2~=\"dui-snackbar-with-icon\"]:before{width:20px;height:20px;margin-right:8px}[data-dui-1-28-2~=\"dui-snackbar-info\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='8' fill='%231e6fff'/%3E%3Cg fill='%23fff'%3E%3Cpath d='M11.778 14.89V14h-.9V8.668H8.223v.89h.888V14h-.89v.89h3.556z'/%3E%3Ccircle cx='10' cy='6.444' r='1.333'/%3E%3C/g%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-error\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill='%23ff4747' d='M10 2a8 8 0 110 16 8 8 0 110-16zm0 10.222a1.333 1.333 0 100 2.665 1.333 1.333 0 000-2.664zm1.333-7.1H8.667l.444 6.22h1.778l.444-6.222z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-success\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='8' fill='%2300d689'/%3E%3Cpath fill='%23fff' d='M7.47 9.167l1.645 1.646 4.126-4.125 1.178 1.178-5.303 5.303-2.824-2.824L7.47 9.167z'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-error\"][data-dui-1-28-2~=\"dui-snackbar-emphasize\"]:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill='%23fff' d='M10 2a8 8 0 110 16 8 8 0 110-16zm0 10.222a1.333 1.333 0 100 2.665 1.333 1.333 0 000-2.664zm1.333-7.1H8.667l.444 6.22h1.778l.444-6.222z' fill-rule='evenodd'/%3E%3C/svg%3E\")}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"]{color:var(--bg-lv1-default,#fff);border-color:transparent}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"]:before{-webkit-filter:brightness(1.2);filter:brightness(1.2)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-info\"]{background-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-success\"]{background-color:var(--success-default,#00d689)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-error\"]{background-color:var(--critical-default,#ff4747)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"][data-dui-1-28-2~=\"dui-snackbar-loading\"]{background-color:var(--accent-default,#1e6fff)}[data-dui-1-28-2~=\"dui-snackbar-loading\"]:before{content:none}[data-dui-1-28-2~=\"dui-snackbar-loading-indicator\"]{width:16px;height:16px;margin:0 10px 0 2px}[data-dui-1-28-2~=\"dui-snackbar-loading-indicator-circle\"]{border-width:6px}[data-dui-1-28-2~=\"dui-snackbar-hidden\"]{opacity:0;-webkit-transform:translateX(-50%) translateY(-20px);transform:translateX(-50%) translateY(-20px)}[data-dui-1-28-2~=\"dui-snackbar-top\"]{top:105px}[data-dui-1-28-2~=\"dui-snackbar-bottom\"]{bottom:105px}[data-dui-1-28-2~=\"dui-snackbar-in-container\"]{-webkit-animation-name:dui-snackbar-slide-in-container;animation-name:dui-snackbar-slide-in-container;position:absolute;top:14px}[data-dui-1-28-2~=\"dui-snackbar-in-container\"][data-dui-1-28-2~=\"dui-snackbar-hidden\"]{-webkit-transform:translate(-50%,-10px);transform:translate(-50%,-10px)}[data-dui-1-28-2~=\"dui-snackbar-message\"]{color:inherit}[data-dui-1-28-2~=\"dui-snackbar-controls\"]{margin-left:12px;line-height:20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}[data-dui-1-28-2~=\"dui-snackbar-controls\"]>:not(:last-child){margin-right:10px}[data-dui-1-28-2~=\"dui-snackbar-action\"],[data-dui-1-28-2~=\"dui-snackbar-close\"]{display:inline-block;border-radius:2px;cursor:pointer;border:none;margin:0;padding:0;background:transparent;-webkit-tap-highlight-color:transparent}[data-dui-1-28-2~=\"dui-snackbar-action\"]:hover,[data-dui-1-28-2~=\"dui-snackbar-close\"]:hover{background-color:var(--feedback-hover,rgba(51,77,102,.06))}[data-dui-1-28-2~=\"dui-snackbar-action\"]:active,[data-dui-1-28-2~=\"dui-snackbar-close\"]:active{background-color:var(--feedback-active,rgba(51,77,102,.08))}[data-dui-1-28-2~=\"dui-snackbar-actions\"]>:not(:first-child){margin-left:7px}[data-dui-1-28-2~=\"dui-snackbar-action\"]{color:var(--text-link,#175ceb);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:0 4px;font-weight:500;font-size:14px}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-action\"],[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]{color:var(--bg-lv1-default,#fff)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-action\"]:hover,[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]:hover{background-color:hsla(0,0%,100%,.24)}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-action\"]:active,[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]:active{background-color:hsla(0,0%,100%,.4)}[data-dui-1-28-2~=\"dui-snackbar-close\"]{width:20px;height:20px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%2381868f' fill-rule='evenodd' d='M8.63 8L13 12.368l-.632.632L8 8.63 3.632 13 3 12.368 7.368 8 3 3.632 3.632 3 8 7.368 12.368 3l.632.632L8.63 8z'/%3E%3C/svg%3E\");background-position:50%;background-size:16px;background-repeat:no-repeat}[data-dui-1-28-2~=\"dui-snackbar-emphasize\"] [data-dui-1-28-2~=\"dui-snackbar-close\"]{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M8.63 8L13 12.368l-.632.632L8 8.63 3.632 13 3 12.368 7.368 8 3 3.632 3.632 3 8 7.368 12.368 3l.632.632L8.63 8z'/%3E%3C/svg%3E\")}");
	var show_1 = tslib_1.__importDefault(require_show());
	var Container_1 = tslib_1.__importDefault(require_Container());
	var queue_1 = require_queue();
	Snackbar_1.default.show = show_1.default;
	Snackbar_1.default.closeAll = queue_1.closeAll;
	Snackbar_1.default.closeById = queue_1.closeById;
	Snackbar_1.default.hasVisibleInstances = queue_1.hasVisibleInstances;
	Snackbar_1.default.Container = Container_1.default;
	exports.default = Snackbar_1.default;
}));
//#endregion
export default require_Snackbar();
export { require_queue as n, require_Snackbar as t };
