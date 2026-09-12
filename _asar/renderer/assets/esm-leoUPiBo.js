import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
//#region ../../node_modules/tdesign-icons-react/esm/_chunks/dep-03138308.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (e.indexOf(n) >= 0) continue;
		t[n] = r[n];
	}
	return t;
}
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
var classnames, classNames;
var init_dep_03138308 = __esmMin((() => {
	classnames = { exports: {} };
	/*!
	Copyright (c) 2017 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
	*/
	(function(module) {
		(function() {
			"use strict";
			var hasOwn = {}.hasOwnProperty;
			function classNames() {
				var classes = [];
				for (var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (!arg) continue;
					var argType = typeof arg;
					if (argType === "string" || argType === "number") classes.push(arg);
					else if (Array.isArray(arg) && arg.length) {
						var inner = classNames.apply(null, arg);
						if (inner) classes.push(inner);
					} else if (argType === "object") {
						for (var key in arg) if (hasOwn.call(arg, key) && arg[key]) classes.push(key);
					}
				}
				return classes.join(" ");
			}
			if (module.exports) {
				classNames.default = classNames;
				module.exports = classNames;
			} else window.classNames = classNames;
		})();
	})(classnames);
	classNames = classnames.exports;
})), import_react$34, DEFAULT_LOCALE, ConfigContext;
var init_config_context = __esmMin((() => {
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	DEFAULT_LOCALE = "zh-CN";
	ConfigContext = /* @__PURE__ */ (0, import_react$34.createContext)({
		classPrefix: "t",
		locale: DEFAULT_LOCALE
	});
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/util/use-config.js
var import_react$33, useConfig;
var init_use_config = __esmMin((() => {
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	init_config_context();
	useConfig = (function() {
		return (0, import_react$33.useContext)(ConfigContext);
	});
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/util/use-common-classname.js
function useCommonClassName() {
	var classPrefix = useConfig().classPrefix;
	return (0, import_react$32.useMemo)(function() {
		return {
			SIZE: {
				"default": "",
				xs: "".concat(classPrefix, "-size-xs"),
				small: "".concat(classPrefix, "-size-s"),
				medium: "".concat(classPrefix, "-size-m"),
				large: "".concat(classPrefix, "-size-l"),
				xl: "".concat(classPrefix, "-size-xl"),
				block: "".concat(classPrefix, "-size-full-width")
			},
			STATUS: {
				loading: "".concat(classPrefix, "-is-loading"),
				disabled: "".concat(classPrefix, "-is-disabled"),
				focused: "".concat(classPrefix, "-is-focused"),
				success: "".concat(classPrefix, "-is-success"),
				error: "".concat(classPrefix, "-is-error"),
				warning: "".concat(classPrefix, "-is-warning"),
				selected: "".concat(classPrefix, "-is-selected"),
				active: "".concat(classPrefix, "-is-active"),
				checked: "".concat(classPrefix, "-is-checked"),
				current: "".concat(classPrefix, "-is-current"),
				hidden: "".concat(classPrefix, "-is-hidden"),
				visible: "".concat(classPrefix, "-is-visible"),
				expanded: "".concat(classPrefix, "-is-expanded"),
				indeterminate: "".concat(classPrefix, "-is-indeterminate")
			}
		};
	}, [classPrefix]);
}
var import_react$32;
var init_use_common_classname = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	init_use_config();
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/util/use-size-props.js
function useSizeProps(size) {
	var COMMON_SIZE_CLASS_NAMES = useCommonClassName().SIZE;
	if (typeof size === "undefined") return {};
	if (!(size in COMMON_SIZE_CLASS_NAMES)) return {
		className: "",
		style: { fontSize: size }
	};
	return {
		className: COMMON_SIZE_CLASS_NAMES[size],
		style: {}
	};
}
var init_use_size_props = __esmMin((() => {
	init_use_common_classname();
	require_react();
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/util/check-url-and-load.js
function loadStylesheet() {
	var styleSheetId = "__TDESIGN_ICON_STYLE__";
	var iconStyleString = "@keyframes t-spin {\n    from {\n      transform: rotate(0deg);\n    }\n    to {\n      transform: rotate(360deg);\n    }\n  }\n  .t-icon {\n    display: inline-block;\n    vertical-align: middle;\n    width: 1em;\n    height: 1em;\n  }\n  .t-icon::before {\n    font-family: unset;\n  }\n  .t-icon-loading {\n    animation: t-spin 1s linear infinite;\n  }\n  .t-icon.t-size-s,\n  i.t-size-s {\n    font-size: 14px;\n  }\n  .t-icon.t-size-m,\n  i.t-size-m {\n    font-size: 16px;\n  }\n  .t-icon.t-size-l,\n  i.t-size-l {\n    font-size: 18px;\n  }\n  ";
	if (!document || document.getElementById(styleSheetId)) return;
	var styleSheet = document.createElement("style");
	styleSheet.setAttribute("id", styleSheetId);
	styleSheet.innerHTML = iconStyleString;
	document.head.appendChild(styleSheet);
}
var init_check_url_and_load = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/icon.js
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function ownKeys$29(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$29(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$29(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$29(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function render(node, id, rootProps) {
	var _strokeColor$, _fillColor$;
	var _rootProps$strokeColo = rootProps.strokeColor, strokeColor = _rootProps$strokeColo === void 0 ? "currentColor" : _rootProps$strokeColo, _rootProps$strokeWidt = rootProps.strokeWidth, strokeWidth = _rootProps$strokeWidt === void 0 ? 2 : _rootProps$strokeWidt, _rootProps$fillColor = rootProps.fillColor, fillColor = _rootProps$fillColor === void 0 ? "transparent" : _rootProps$fillColor, resetRootProps = _objectWithoutProperties(rootProps, _excluded);
	var filledColor;
	if (!rootProps.fillColor) filledColor = "currentColor";
	else filledColor = Array.isArray(fillColor) ? fillColor[0] : fillColor;
	var childProps = {
		strokeWidth,
		strokeColor1: Array.isArray(strokeColor) ? strokeColor[0] : strokeColor,
		strokeColor2: Array.isArray(strokeColor) ? (_strokeColor$ = strokeColor[1]) !== null && _strokeColor$ !== void 0 ? _strokeColor$ : strokeColor[0] : strokeColor,
		fillColor1: Array.isArray(fillColor) ? fillColor[0] : fillColor,
		fillColor2: Array.isArray(fillColor) ? (_fillColor$ = fillColor[1]) !== null && _fillColor$ !== void 0 ? _fillColor$ : fillColor[0] : fillColor,
		filledColor
	};
	return /* @__PURE__ */ (0, import_react$30.createElement)(node.tag, _objectSpread$29(_objectSpread$29({ key: id }, node.attrs), resetRootProps), (node.children || []).map(function(child, index) {
		return childRender(child, childProps, index);
	}));
}
function childRender(node, childProps, index) {
	var processedAttrs = {};
	if (node.attrs) for (var _i = 0, _Object$entries = Object.entries(node.attrs); _i < _Object$entries.length; _i++) {
		var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
		if (typeof value === "string" && value.startsWith("props.")) processedAttrs[key] = childProps[value.split(".")[1]];
		else processedAttrs[key] = value;
	}
	return /* @__PURE__ */ (0, import_react$30.createElement)(node.tag, _objectSpread$29({ key: index }, processedAttrs), (node.children || []).map(function(child, index2) {
		return childRender(child, childProps, index2);
	}));
}
var import_react$30, _excluded, _excluded2, IconBase;
var init_icon = __esmMin((() => {
	init_dep_03138308();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_use_size_props();
	init_check_url_and_load();
	_excluded = [
		"strokeColor",
		"strokeWidth",
		"fillColor"
	], _excluded2 = [
		"icon",
		"id",
		"className",
		"size",
		"style"
	];
	IconBase = /* @__PURE__ */ (0, import_react$30.forwardRef)(function(props, ref) {
		var icon = props.icon, id = props.id, className = props.className, size = props.size, style = props.style, restProps = _objectWithoutProperties(props, _excluded2);
		var _useSizeProps = useSizeProps(size), sizeClassName = _useSizeProps.className, sizeStyle = _useSizeProps.style;
		var cls = classNames("t-icon", "t-icon-".concat(id), className, sizeClassName);
		(0, import_react$30.useEffect)(function() {
			loadStylesheet();
		}, []);
		return render(icon, "".concat(id), _objectSpread$29({
			ref,
			className: cls,
			style: _objectSpread$29(_objectSpread$29({ fill: "none" }, style), sizeStyle)
		}, restProps));
	});
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/add.js
function ownKeys$28(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$28(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$28(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$28(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$29, element$28, AddIcon;
var init_add = __esmMin((() => {
	init_dep_03138308();
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$28 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "add" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M12 5L12 19M19 12L5 12",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	AddIcon = /* @__PURE__ */ (0, import_react$29.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$29.createElement)(IconBase, _objectSpread$28(_objectSpread$28({}, props), {}, {
			id: "add",
			ref,
			icon: element$28
		}));
	});
	AddIcon.displayName = "AddIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/browse-off.js
function ownKeys$27(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$27(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$27(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$27(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$28, element$27, BrowseOffIcon;
var init_browse_off = __esmMin((() => {
	init_dep_03138308();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$27 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "browse-off" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M13.1758 8.17578C14.4396 8.56376 15.4368 9.56096 15.8247 10.8247M21.2858 15.2856C22.0085 14.2983 22.5776 13.1913 22.9578 12C21.4771 7.36017 17.131 4 12.0001 4C11.3698 4 10.7513 4.05072 10.1484 4.1483M5.80747 5.80786C3.57225 7.23888 1.86478 9.42193 1.04199 12.0001C2.52275 16.6399 6.86881 20.0001 11.9997 20.0001C14.2796 20.0001 16.4045 19.3367 18.1919 18.1923L5.80747 5.80786ZM8 12.0003C8 10.8957 8.44771 9.89573 9.17157 9.17188L14.8284 14.8287C14.1046 15.5526 13.1046 16.0003 12 16.0003C9.79086 16.0003 8 14.2094 8 12.0003Z",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M20.9996 21L3 3",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	BrowseOffIcon = /* @__PURE__ */ (0, import_react$28.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$28.createElement)(IconBase, _objectSpread$27(_objectSpread$27({}, props), {}, {
			id: "browse-off",
			ref,
			icon: element$27
		}));
	});
	BrowseOffIcon.displayName = "BrowseOffIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/browse.js
function ownKeys$26(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$26(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$26(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$26(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$27, element$26, BrowseIcon;
var init_browse = __esmMin((() => {
	init_dep_03138308();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$26 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": {
				"id": "browse",
				"clipPath": "url(#clip0_543_7945)"
			},
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M11.9997 4C6.86881 4 2.52275 7.36017 1.04199 12C2.52275 16.6398 6.86881 20 11.9997 20C17.1306 20 21.4766 16.6398 22.9574 12C21.4766 7.36017 17.1306 4 11.9997 4Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "fill2",
						"fill": "props.fillColor2",
						"d": "M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M11.9997 4C6.86881 4 2.52275 7.36017 1.04199 12C2.52275 16.6398 6.86881 20 11.9997 20C17.1306 20 21.4766 16.6398 22.9574 12C21.4766 7.36017 17.1306 4 11.9997 4Z",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	BrowseIcon = /* @__PURE__ */ (0, import_react$27.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$27.createElement)(IconBase, _objectSpread$26(_objectSpread$26({}, props), {}, {
			id: "browse",
			ref,
			icon: element$26
		}));
	});
	BrowseIcon.displayName = "BrowseIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/check-circle-filled.js
function ownKeys$25(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$25(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$25(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$25(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$26, element$25, CheckCircleFilledIcon;
var init_check_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$25 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM7.49985 10.5858L10.4999 13.5858L16.4999 7.58578L17.9141 8.99999L10.4999 16.4142L6.08564 12L7.49985 10.5858Z"
			}
		}]
	};
	CheckCircleFilledIcon = /* @__PURE__ */ (0, import_react$26.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$26.createElement)(IconBase, _objectSpread$25(_objectSpread$25({}, props), {}, {
			id: "check-circle-filled",
			ref,
			icon: element$25
		}));
	});
	CheckCircleFilledIcon.displayName = "CheckCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/check.js
function ownKeys$24(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$24(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$24(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$24(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$25, element$24, CheckIcon;
var init_check = __esmMin((() => {
	init_dep_03138308();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$24 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "check" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M19.5708 7.37842L10.3785 16.5708L5.42871 11.6211",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	CheckIcon = /* @__PURE__ */ (0, import_react$25.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$25.createElement)(IconBase, _objectSpread$24(_objectSpread$24({}, props), {}, {
			id: "check",
			ref,
			icon: element$24
		}));
	});
	CheckIcon.displayName = "CheckIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/chevron-down.js
function ownKeys$23(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$23(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$23(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$23(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$24, element$23, ChevronDownIcon;
var init_chevron_down = __esmMin((() => {
	init_dep_03138308();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$23 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "chevron-down" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M17.5 9.5L12 15L6.5 9.5",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ChevronDownIcon = /* @__PURE__ */ (0, import_react$24.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$24.createElement)(IconBase, _objectSpread$23(_objectSpread$23({}, props), {}, {
			id: "chevron-down",
			ref,
			icon: element$23
		}));
	});
	ChevronDownIcon.displayName = "ChevronDownIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/chevron-left.js
function ownKeys$22(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$22(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$22(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$22(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$23, element$22, ChevronLeftIcon;
var init_chevron_left = __esmMin((() => {
	init_dep_03138308();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$22 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "chevron-left" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M14.5 17.5L9 12L14.5 6.5",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ChevronLeftIcon = /* @__PURE__ */ (0, import_react$23.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$23.createElement)(IconBase, _objectSpread$22(_objectSpread$22({}, props), {}, {
			id: "chevron-left",
			ref,
			icon: element$22
		}));
	});
	ChevronLeftIcon.displayName = "ChevronLeftIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/chevron-right.js
function ownKeys$21(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$21(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$21(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$21(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$22, element$21, ChevronRightIcon;
var init_chevron_right = __esmMin((() => {
	init_dep_03138308();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$21 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "chevron-right" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M9.5 17.5L15 12L9.5 6.5",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ChevronRightIcon = /* @__PURE__ */ (0, import_react$22.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$22.createElement)(IconBase, _objectSpread$21(_objectSpread$21({}, props), {}, {
			id: "chevron-right",
			ref,
			icon: element$21
		}));
	});
	ChevronRightIcon.displayName = "ChevronRightIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/close-circle-filled.js
function ownKeys$20(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$20(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$20(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$20(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$21, element$20, CloseCircleFilledIcon;
var init_close_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$20 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM8.81753 7.40346L11.9999 10.5858L15.1815 7.40414L16.5957 8.81835L13.4141 12L16.5957 15.1816L15.1815 16.5958L11.9999 13.4142L8.81753 16.5965L7.40332 15.1823L10.5856 12L7.40332 8.81767L8.81753 7.40346Z"
			}
		}]
	};
	CloseCircleFilledIcon = /* @__PURE__ */ (0, import_react$21.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$21.createElement)(IconBase, _objectSpread$20(_objectSpread$20({}, props), {}, {
			id: "close-circle-filled",
			ref,
			icon: element$20
		}));
	});
	CloseCircleFilledIcon.displayName = "CloseCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/close.js
function ownKeys$19(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$19(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$19(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$19(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$20, element$19, CloseIcon;
var init_close = __esmMin((() => {
	init_dep_03138308();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$19 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "close" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M16.9503 7.05029L12.0005 12M12.0005 12L7.05078 16.9498M12.0005 12L16.9503 16.9498M12.0005 12L7.05078 7.05029",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	CloseIcon = /* @__PURE__ */ (0, import_react$20.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$20.createElement)(IconBase, _objectSpread$19(_objectSpread$19({}, props), {}, {
			id: "close",
			ref,
			icon: element$19
		}));
	});
	CloseIcon.displayName = "CloseIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/delete.js
function ownKeys$18(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$18(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$18(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$18(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$19, element$18, DeleteIcon;
var init_delete = __esmMin((() => {
	init_dep_03138308();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$18 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "delete" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M5 5H19L18.5 22H5.5L5 5Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M21 5H3M5 5H19L18.5 22H5.5L5 5ZM8.5 2H15.5V5H8.5V2Z",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M12 9V18",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	DeleteIcon = /* @__PURE__ */ (0, import_react$19.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$19.createElement)(IconBase, _objectSpread$18(_objectSpread$18({}, props), {}, {
			id: "delete",
			ref,
			icon: element$18
		}));
	});
	DeleteIcon.displayName = "DeleteIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/download.js
function ownKeys$17(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$17(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$17(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$17(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$18, element$17, DownloadIcon;
var init_download = __esmMin((() => {
	init_dep_03138308();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$17 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "download" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M16.5 10.5L12 15L7.5 10.5M12 13.75V4",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M20.5 15V20H3.5V15",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	DownloadIcon = /* @__PURE__ */ (0, import_react$18.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$18.createElement)(IconBase, _objectSpread$17(_objectSpread$17({}, props), {}, {
			id: "download",
			ref,
			icon: element$17
		}));
	});
	DownloadIcon.displayName = "DownloadIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/error-circle-filled.js
function ownKeys$16(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$16(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$16(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$16(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$17, element$16, ErrorCircleFilledIcon;
var init_error_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$16 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM11.0001 14H13.0001V6.49998H11.0001V14ZM13.004 15.5H11.0001V17.5039H13.004V15.5Z"
			}
		}]
	};
	ErrorCircleFilledIcon = /* @__PURE__ */ (0, import_react$17.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$17.createElement)(IconBase, _objectSpread$16(_objectSpread$16({}, props), {}, {
			id: "error-circle-filled",
			ref,
			icon: element$16
		}));
	});
	ErrorCircleFilledIcon.displayName = "ErrorCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/file-excel.js
function ownKeys$15(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$15(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$15(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$15(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$16, element$15, FileExcelIcon;
var init_file_excel = __esmMin((() => {
	init_dep_03138308();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$15 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-excel" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M4 22H20V8H14V2H4V22Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M14 11L14 11.6465C14 11.918 13.8896 12.1779 13.6941 12.3664L12 14M10 11L10 11.6465C10 11.918 10.1104 12.1779 10.3059 12.3664L12 14M12 14L10.3059 15.6336C10.1104 15.8221 10 16.082 10 16.3535L10 17M12 14L13.6941 15.6336C13.8896 15.8221 14 16.082 14 16.3535V17",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	FileExcelIcon = /* @__PURE__ */ (0, import_react$16.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$16.createElement)(IconBase, _objectSpread$15(_objectSpread$15({}, props), {}, {
			id: "file-excel",
			ref,
			icon: element$15
		}));
	});
	FileExcelIcon.displayName = "FileExcelIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/file-pdf.js
function ownKeys$14(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$14(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$14(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$14(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$15, element$14, FilePdfIcon;
var init_file_pdf = __esmMin((() => {
	init_dep_03138308();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$14 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-pdf" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M20 10V7L15 2H4V22H20M14 2V8H20",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M7 16V13H9.71428C9.87208 13 10 13.1279 10 13.2857V15.7143C10 15.8721 9.87208 16 9.71428 16H7ZM7 16V19M20.6667 13H18.2857C18.1279 13 18 13.1279 18 13.2857V16M18 16H20.6667M18 16V19M12.5 13V19H15.2143C15.3721 19 15.5 18.8721 15.5 18.7143V13.2857C15.5 13.1279 15.3721 13 15.2143 13H12.5Z",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	FilePdfIcon = /* @__PURE__ */ (0, import_react$15.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$15.createElement)(IconBase, _objectSpread$14(_objectSpread$14({}, props), {}, {
			id: "file-pdf",
			ref,
			icon: element$14
		}));
	});
	FilePdfIcon.displayName = "FilePdfIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/file-powerpoint.js
function ownKeys$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$13(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$13(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$13(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$14, element$13, FilePowerpointIcon;
var init_file_powerpoint = __esmMin((() => {
	init_dep_03138308();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$13 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-powerpoint" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M4 22H20V8H14V2H4V22Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M10 14.6V11H13C13.5523 11 14 11.4477 14 12V13.6C14 14.1523 13.5523 14.6 13 14.6H10ZM10 14.6V17",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	FilePowerpointIcon = /* @__PURE__ */ (0, import_react$14.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$14.createElement)(IconBase, _objectSpread$13(_objectSpread$13({}, props), {}, {
			id: "file-powerpoint",
			ref,
			icon: element$13
		}));
	});
	FilePowerpointIcon.displayName = "FilePowerpointIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/file-word.js
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$13, element$12, FileWordIcon;
var init_file_word = __esmMin((() => {
	init_dep_03138308();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$12 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file-word" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M4 22H20V8H14V2H4V22Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M9 12L9 16C9 16.5523 9.44772 17 10 17H12M12 17L12 12M12 17H14C14.5523 17 15 16.5523 15 16V12",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	FileWordIcon = /* @__PURE__ */ (0, import_react$13.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$13.createElement)(IconBase, _objectSpread$12(_objectSpread$12({}, props), {}, {
			id: "file-word",
			ref,
			icon: element$12
		}));
	});
	FileWordIcon.displayName = "FileWordIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/file.js
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$12, element$11, FileIcon;
var init_file = __esmMin((() => {
	init_dep_03138308();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$11 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "file" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "fill1",
					"fill": "props.fillColor1",
					"d": "M4 22H20V8H14V2H4V22Z"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M14 2V8H20M14 2H15L20 7V8M14 2H4V22H20V8",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	FileIcon = /* @__PURE__ */ (0, import_react$12.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$12.createElement)(IconBase, _objectSpread$11(_objectSpread$11({}, props), {}, {
			id: "file",
			ref,
			icon: element$11
		}));
	});
	FileIcon.displayName = "FileIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/help-circle-filled.js
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$11, element$10, HelpCircleFilledIcon;
var init_help_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$10 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM11.8265 11.8902C12.2582 11.3593 12.8004 10.9159 13.2365 10.5723C13.7034 10.2045 14.0002 9.63718 14.0002 9C14.0002 7.89543 13.1048 7 12.0002 7C11.131 7 10.3888 7.5551 10.1138 8.33325L9.78055 9.27609L7.89487 8.6096L8.22811 7.66676C8.77675 6.11451 10.2571 5 12.0002 5C14.2094 5 16.0002 6.79086 16.0002 9C16.0002 10.2759 15.4018 11.4125 14.4742 12.1433C14.0426 12.4834 13.6573 12.8088 13.3783 13.1519C13.1038 13.4896 13.0002 13.762 13.0002 14V15.25H11.0002V14C11.0002 13.1334 11.3905 12.4265 11.8265 11.8902ZM11.0001 18.2539V16.25H13.004V18.2539H11.0001Z"
			}
		}]
	};
	HelpCircleFilledIcon = /* @__PURE__ */ (0, import_react$11.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$11.createElement)(IconBase, _objectSpread$10(_objectSpread$10({}, props), {}, {
			id: "help-circle-filled",
			ref,
			icon: element$10
		}));
	});
	HelpCircleFilledIcon.displayName = "HelpCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/image-error.js
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$10, element$9, ImageErrorIcon;
var init_image_error = __esmMin((() => {
	init_dep_03138308();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$9 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "image-error" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M21 11V3H3V21H11M13 14L9 10L3.5 15.5M17.75 8.25C17.75 9.35457 16.8546 10.25 15.75 10.25C14.6454 10.25 13.75 9.35457 13.75 8.25C13.75 7.14543 14.6454 6.25 15.75 6.25C16.8546 6.25 17.75 7.14543 17.75 8.25Z",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M21.8287 16.1719L19.0003 19.0003M19.0003 19.0003L16.1719 21.8287M19.0003 19.0003L16.1719 16.1719M19.0003 19.0003L21.8287 21.8287",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	ImageErrorIcon = /* @__PURE__ */ (0, import_react$10.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$10.createElement)(IconBase, _objectSpread$9(_objectSpread$9({}, props), {}, {
			id: "image-error",
			ref,
			icon: element$9
		}));
	});
	ImageErrorIcon.displayName = "ImageErrorIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/image.js
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$9, element$8, ImageIcon;
var init_image = __esmMin((() => {
	init_dep_03138308();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$8 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "image" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M3 21H20L9 10L3 16V21Z"
					}
				},
				{
					"tag": "circle",
					"attrs": {
						"id": "fill2",
						"cx": 15.75,
						"cy": 8.25,
						"r": 2,
						"fill": "props.fillColor2"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M3 16V3H21V21H20M3 16V21H20M3 16L9 10L20 21",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "circle",
					"attrs": {
						"id": "stroke2",
						"cx": 15.75,
						"cy": 8.25,
						"r": 2,
						"stroke": "props.strokeColor2",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	ImageIcon = /* @__PURE__ */ (0, import_react$9.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$9.createElement)(IconBase, _objectSpread$8(_objectSpread$8({}, props), {}, {
			id: "image",
			ref,
			icon: element$8
		}));
	});
	ImageIcon.displayName = "ImageIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/info-circle-filled.js
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$8, element$7, InfoCircleFilledIcon;
var init_info_circle_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$7 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM10.996 8.50002V6.49611H12.9999V8.50002H10.996ZM12.9999 10L12.9999 17.5H10.9999V10L12.9999 10Z"
			}
		}]
	};
	InfoCircleFilledIcon = /* @__PURE__ */ (0, import_react$8.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$8.createElement)(IconBase, _objectSpread$7(_objectSpread$7({}, props), {}, {
			id: "info-circle-filled",
			ref,
			icon: element$7
		}));
	});
	InfoCircleFilledIcon.displayName = "InfoCircleFilledIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/mirror.js
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$7, element$6, MirrorIcon;
var init_mirror = __esmMin((() => {
	init_dep_03138308();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$6 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "mirror" },
			"children": [
				{
					"tag": "g",
					"attrs": { "id": "fill1" },
					"children": [{
						"tag": "path",
						"attrs": {
							"fill": "props.fillColor1",
							"d": "M8 8.5V17.5H3L8 8.5Z"
						}
					}, {
						"tag": "path",
						"attrs": {
							"fill": "props.fillColor1",
							"d": "M16 8.5V17.5H21L16 8.5Z"
						}
					}]
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M12 3L12 21",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "g",
					"attrs": { "id": "stroke1" },
					"children": [{
						"tag": "path",
						"attrs": {
							"stroke": "props.strokeColor1",
							"d": "M8 8.5V17.5H3L8 8.5Z",
							"strokeLinecap": "square",
							"strokeWidth": "props.strokeWidth"
						}
					}, {
						"tag": "path",
						"attrs": {
							"stroke": "props.strokeColor1",
							"d": "M16 8.5V17.5H21L16 8.5Z",
							"strokeLinecap": "square",
							"strokeWidth": "props.strokeWidth"
						}
					}]
				}
			]
		}]
	};
	MirrorIcon = /* @__PURE__ */ (0, import_react$7.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$7.createElement)(IconBase, _objectSpread$6(_objectSpread$6({}, props), {}, {
			id: "mirror",
			ref,
			icon: element$6
		}));
	});
	MirrorIcon.displayName = "MirrorIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/rotation.js
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$6, element$5, RotationIcon;
var init_rotation = __esmMin((() => {
	init_dep_03138308();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$5 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "rotation" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M12 20C12 15.5818 8.41828 12 4 12M3 3V21H21",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	RotationIcon = /* @__PURE__ */ (0, import_react$6.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$6.createElement)(IconBase, _objectSpread$5(_objectSpread$5({}, props), {}, {
			id: "rotation",
			ref,
			icon: element$5
		}));
	});
	RotationIcon.displayName = "RotationIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/time-filled.js
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$5, element$4, TimeFilledIcon;
var init_time_filled = __esmMin((() => {
	init_dep_03138308();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$4 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "props.filledColor",
				"d": "M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12.9999 5.49999H10.9999L10.9998 12.4142L14.9999 16.4142L16.4141 15L12.9999 11.5858V5.49999Z"
			}
		}]
	};
	TimeFilledIcon = /* @__PURE__ */ (0, import_react$5.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$5.createElement)(IconBase, _objectSpread$4(_objectSpread$4({}, props), {}, {
			id: "time-filled",
			ref,
			icon: element$4
		}));
	});
	TimeFilledIcon.displayName = "TimeFilledIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/upload.js
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$4, element$3, UploadIcon;
var init_upload = __esmMin((() => {
	init_dep_03138308();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$3 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "upload" },
			"children": [{
				"tag": "path",
				"attrs": {
					"id": "stroke1",
					"stroke": "props.strokeColor1",
					"d": "M16.5 8.5L12 4L7.5 8.5M12 5.25V15",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}, {
				"tag": "path",
				"attrs": {
					"id": "stroke2",
					"stroke": "props.strokeColor2",
					"d": "M20.5 15V20H3.5V15",
					"strokeLinecap": "square",
					"strokeWidth": "props.strokeWidth"
				}
			}]
		}]
	};
	UploadIcon = /* @__PURE__ */ (0, import_react$4.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$4.createElement)(IconBase, _objectSpread$3(_objectSpread$3({}, props), {}, {
			id: "upload",
			ref,
			icon: element$3
		}));
	});
	UploadIcon.displayName = "UploadIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/video.js
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$3, element$2, VideoIcon;
var init_video = __esmMin((() => {
	init_dep_03138308();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$2 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "video" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M3 3H21V21H3V3Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "fill2",
						"fill": "props.fillColor2",
						"d": "M15.75 11.9997L9 15.8968L9 8.10254L15.75 11.9997Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M3 3H21V21H3V3Z",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M15.75 11.9997L9 15.8968L9 8.10254L15.75 11.9997Z",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	VideoIcon = /* @__PURE__ */ (0, import_react$3.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$3.createElement)(IconBase, _objectSpread$2(_objectSpread$2({}, props), {}, {
			id: "video",
			ref,
			icon: element$2
		}));
	});
	VideoIcon.displayName = "VideoIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/zoom-in.js
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$2, element$1, ZoomInIcon;
var init_zoom_in = __esmMin((() => {
	init_dep_03138308();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$1 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "zoom-in" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033ZM15.8033 15.8033L21.1066 21.1066",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M10.5 13.5V10.5M10.5 10.5L10.5 7.5M10.5 10.5H7.5M10.5 10.5H13.5",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	ZoomInIcon = /* @__PURE__ */ (0, import_react$2.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$2.createElement)(IconBase, _objectSpread$1(_objectSpread$1({}, props), {}, {
			id: "zoom-in",
			ref,
			icon: element$1
		}));
	});
	ZoomInIcon.displayName = "ZoomInIcon";
}));
//#endregion
//#region ../../node_modules/tdesign-icons-react/esm/components/zoom-out.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var import_react$1, element, ZoomOutIcon;
var init_zoom_out = __esmMin((() => {
	init_dep_03138308();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "id": "zoom-out" },
			"children": [
				{
					"tag": "path",
					"attrs": {
						"id": "fill1",
						"fill": "props.fillColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033Z"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke1",
						"stroke": "props.strokeColor1",
						"d": "M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033ZM15.8033 15.8033L21.1066 21.1066",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				},
				{
					"tag": "path",
					"attrs": {
						"id": "stroke2",
						"stroke": "props.strokeColor2",
						"d": "M7.5 10.5H10.5L13.5 10.5",
						"strokeLinecap": "square",
						"strokeWidth": "props.strokeWidth"
					}
				}
			]
		}]
	};
	ZoomOutIcon = /* @__PURE__ */ (0, import_react$1.forwardRef)(function(props, ref) {
		return /* @__PURE__ */ (0, import_react$1.createElement)(IconBase, _objectSpread(_objectSpread({}, props), {}, {
			id: "zoom-out",
			ref,
			icon: element
		}));
	});
	ZoomOutIcon.displayName = "ZoomOutIcon";
}));
var init_esm = __esmMin((() => {
	init_icon();
	init_dep_03138308();
	init_use_config();
	init_use_size_props();
	init_check_url_and_load();
	init_config_context();
	init_use_common_classname();
	init_add();
	init_browse_off();
	init_browse();
	init_check_circle_filled();
	init_check();
	init_chevron_down();
	init_chevron_left();
	init_chevron_right();
	init_close_circle_filled();
	init_close();
	init_delete();
	init_download();
	init_error_circle_filled();
	init_file_excel();
	init_file_pdf();
	init_file_powerpoint();
	init_file_word();
	init_file();
	init_help_circle_filled();
	init_image_error();
	init_image();
	init_info_circle_filled();
	init_mirror();
	init_rotation();
	init_time_filled();
	init_upload();
	init_video();
	init_zoom_in();
	init_zoom_out();
	require_react();
}));
//#endregion
export { AddIcon as A, ChevronRightIcon as C, CheckCircleFilledIcon as D, CheckIcon as E, BrowseIcon as O, CloseCircleFilledIcon as S, ChevronDownIcon as T, FileExcelIcon as _, UploadIcon as a, DeleteIcon as b, MirrorIcon as c, ImageErrorIcon as d, HelpCircleFilledIcon as f, FilePdfIcon as g, FilePowerpointIcon as h, VideoIcon as i, BrowseOffIcon as k, InfoCircleFilledIcon as l, FileWordIcon as m, ZoomOutIcon as n, TimeFilledIcon as o, FileIcon as p, ZoomInIcon as r, RotationIcon as s, init_esm as t, ImageIcon as u, ErrorCircleFilledIcon as v, ChevronLeftIcon as w, CloseIcon as x, DownloadIcon as y };
