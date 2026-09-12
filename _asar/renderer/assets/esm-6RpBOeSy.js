import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
//#region ../../node_modules/@tencent/wedocs-icons/esm/icon.js
/**
* use react createElement to render an IconElement with other props
*/
function render(node, id, runtimeProps, rootProps) {
	return (0, import_react$22.createElement)(node.tag, __assign(__assign({ key: id }, replaceRuntimeIdsInAttrs(node, runtimeProps)), rootProps), (replaceRuntimeIdsInDefs(node, runtimeProps).children || []).map(function(child, index) {
		return render(child, id + "-" + node.tag + "-" + index, runtimeProps);
	}));
}
function replaceRuntimeIdsInAttrs(node, runtimeProps) {
	var defIds = runtimeProps.defIds;
	if (!defIds || defIds.length === 0) return node.attrs;
	var attrs = __assign({}, node.attrs);
	if (node.tag === "use" && attrs["xlink:href"]) attrs["xlink:href"] = attrs["xlink:href"] + runtimeProps.idSuffix;
	Object.entries(attrs).forEach(function(_a) {
		var key = _a[0], value = _a[1];
		if (typeof value === "string") attrs[key] = value.replace(/url\(#(.*)\)/, "url(#$1" + runtimeProps.idSuffix + ")");
	});
	return attrs;
}
function replaceRuntimeIdsInDefs(node, runtimeProps) {
	var _a;
	var defIds = runtimeProps.defIds;
	if (!defIds || defIds.length === 0) return node;
	if (node.tag === "defs" && ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length)) return __assign(__assign({}, node), { children: node.children.map(function(child) {
		if (typeof child.attrs.id === "string") {
			if (defIds && defIds.indexOf(child.attrs.id) > -1) return __assign(__assign({}, child), { attrs: __assign(__assign({}, child.attrs), { id: child.attrs.id + runtimeProps.idSuffix }) });
		}
		return child;
	}) });
	return node;
}
function generateShortUuid() {
	return Math.random().toString(36).substring(2, 8);
}
var import_react$22, __assign, __rest, IconBase;
var init_icon = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	__assign = function() {
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	__rest = function(s, e) {
		var t = {};
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
		if (s != null && typeof Object.getOwnPropertySymbols === "function") {
			for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
		}
		return t;
	};
	IconBase = (0, import_react$22.forwardRef)(function(props, ref) {
		var icon = props.icon, id = props.id, className = props.className, restProps = __rest(props, [
			"icon",
			"id",
			"className"
		]);
		var cls = ("wedocs-icon wedocs-icon-" + id + " " + (className || "")).trim();
		var idSuffix = (0, import_react$22.useRef)("_" + generateShortUuid());
		return render(icon, "" + id, {
			defIds: icon.defIds,
			idSuffix: idSuffix.current
		}, __assign({
			ref,
			className: cls
		}, restProps));
	});
	IconBase.displayName = "WefeIcon";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/app-gradient-ai-fill-16.js
var import_react$21, element$21, AppGradientAiFill16;
var init_app_gradient_ai_fill_16 = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$21 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "url(#app-gradient-ai-fill-16_paint0_linear_7492_65176)",
				"d": "M5.25 9C6.22 9 7 9.78 7 10.75v2.5C7 14.22 6.22 15 5.25 15h-2.5C1.78 15 1 14.22 1 13.25v-2.5C1 9.78 1.78 9 2.75 9h2.5zm8 0c.97 0 1.75.78 1.75 1.75v2.5c0 .97-.78 1.75-1.75 1.75h-2.5C9.78 15 9 14.22 9 13.25v-2.5C9 9.78 9.78 9 10.75 9h2.5zm-8-8C6.22 1 7 1.78 7 2.75v2.5C7 6.22 6.22 7 5.25 7h-2.5C1.78 7 1 6.22 1 5.25v-2.5C1 1.78 1.78 1 2.75 1h2.5zm8 0c.97 0 1.75.78 1.75 1.75v2.5C15 6.22 14.22 7 13.25 7h-2.5C9.78 7 9 6.22 9 5.25v-2.5C9 1.78 9.78 1 10.75 1h2.5z"
			}
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "linearGradient",
				"attrs": {
					"id": "app-gradient-ai-fill-16_paint0_linear_7492_65176",
					"x1": 19.2,
					"x2": -.05,
					"y1": 8,
					"y2": 8,
					"gradientUnits": "userSpaceOnUse"
				},
				"children": [
					{
						"tag": "stop",
						"attrs": { "stopColor": "#FE9A75" }
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": .44,
							"stopColor": "#DC8FFF"
						}
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": 1,
							"stopColor": "#8E92FF"
						}
					}
				]
			}]
		}],
		"defIds": ["app-gradient-ai-fill-16_paint0_linear_7492_65176"]
	};
	AppGradientAiFill16 = (0, import_react$21.forwardRef)(function(props, ref) {
		return (0, import_react$21.createElement)(IconBase, Object.assign({}, props, {
			id: "app-gradient-ai-fill-16",
			ref,
			icon: element$21
		}));
	});
	AppGradientAiFill16.displayName = "AppGradientAiFill16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/arrow-up-square-trailing-bold-gradient-ai-fill-16.js
var import_react$20, element$20, ArrowUpSquareTrailingBoldGradientAiFill16;
var init_arrow_up_square_trailing_bold_gradient_ai_fill_16 = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$20 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [
			{
				"tag": "path",
				"attrs": {
					"fill": "url(#arrow-up-square-trailing-bold-gradient-ai-fill-16_paint0_linear_7492_65193)",
					"d": "M7.25 9.5a.75.75 0 101.5 0V6h3.5c.97 0 1.75.78 1.75 1.75v6.5c0 .97-.78 1.75-1.75 1.75h-8.5C2.78 16 2 15.22 2 14.25v-6.5C2 6.78 2.78 6 3.75 6h3.5v3.5z"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"fill": "url(#arrow-up-square-trailing-bold-gradient-ai-fill-16_paint1_linear_7492_65193)",
					"d": "M7.37.58a1 1 0 011.26 0l.08.07 2.32 2.32.05.06a.75.75 0 01-1.05 1.05l-.06-.05-1.22-1.22V6h-1.5V2.81L6.03 4.03a.75.75 0 01-1.06-1.06L7.29.65l.08-.07z"
				}
			},
			{
				"tag": "defs",
				"attrs": {},
				"children": [{
					"tag": "linearGradient",
					"attrs": {
						"id": "arrow-up-square-trailing-bold-gradient-ai-fill-16_paint0_linear_7492_65193",
						"x1": 17.6,
						"x2": 1.1,
						"y1": 8.17,
						"y2": 8.17,
						"gradientUnits": "userSpaceOnUse"
					},
					"children": [
						{
							"tag": "stop",
							"attrs": { "stopColor": "#FE9A75" }
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": .44,
								"stopColor": "#DC8FFF"
							}
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": 1,
								"stopColor": "#8E92FF"
							}
						}
					]
				}, {
					"tag": "linearGradient",
					"attrs": {
						"id": "arrow-up-square-trailing-bold-gradient-ai-fill-16_paint1_linear_7492_65193",
						"x1": 17.6,
						"x2": 1.1,
						"y1": 8.17,
						"y2": 8.17,
						"gradientUnits": "userSpaceOnUse"
					},
					"children": [
						{
							"tag": "stop",
							"attrs": { "stopColor": "#FE9A75" }
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": .44,
								"stopColor": "#DC8FFF"
							}
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": 1,
								"stopColor": "#8E92FF"
							}
						}
					]
				}]
			}
		],
		"defIds": ["arrow-up-square-trailing-bold-gradient-ai-fill-16_paint0_linear_7492_65193", "arrow-up-square-trailing-bold-gradient-ai-fill-16_paint1_linear_7492_65193"]
	};
	ArrowUpSquareTrailingBoldGradientAiFill16 = (0, import_react$20.forwardRef)(function(props, ref) {
		return (0, import_react$20.createElement)(IconBase, Object.assign({}, props, {
			id: "arrow-up-square-trailing-bold-gradient-ai-fill-16",
			ref,
			icon: element$20
		}));
	});
	ArrowUpSquareTrailingBoldGradientAiFill16.displayName = "ArrowUpSquareTrailingBoldGradientAiFill16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/bubble-eyes-gradient-ai-fill-bold-16.js
var import_react$19, element$19, BubbleEyesGradientAiFillBold16;
var init_bubble_eyes_gradient_ai_fill_bold_16 = __esmMin((() => {
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$19 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "url(#bubble-eyes-gradient-ai-fill-bold-16_paint0_linear_7492_65207)",
				"d": "M8 1c4.34 0 8 3 8 6.88 0 3.87-3.66 6.87-8 6.87-.77 0-1.51-.1-2.21-.27a1.1 1.1 0 00-.26.09l-2.57 1.22a.6.6 0 01-.85-.62l.22-1.6c.06-.4-.04-.8-.27-1.13A6.25 6.25 0 010 7.88C0 4 3.66 1 8 1zM5.5 6a1 1 0 100 2 1 1 0 000-2zM11 6a1 1 0 100 2 1 1 0 000-2z"
			}
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "linearGradient",
				"attrs": {
					"id": "bubble-eyes-gradient-ai-fill-bold-16_paint0_linear_7492_65207",
					"x1": 20.8,
					"x2": -1.2,
					"y1": 8.42,
					"y2": 8.42,
					"gradientUnits": "userSpaceOnUse"
				},
				"children": [
					{
						"tag": "stop",
						"attrs": { "stopColor": "#FE9A75" }
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": .44,
							"stopColor": "#DC8FFF"
						}
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": 1,
							"stopColor": "#8E92FF"
						}
					}
				]
			}]
		}],
		"defIds": ["bubble-eyes-gradient-ai-fill-bold-16_paint0_linear_7492_65207"]
	};
	BubbleEyesGradientAiFillBold16 = (0, import_react$19.forwardRef)(function(props, ref) {
		return (0, import_react$19.createElement)(IconBase, Object.assign({}, props, {
			id: "bubble-eyes-gradient-ai-fill-bold-16",
			ref,
			icon: element$19
		}));
	});
	BubbleEyesGradientAiFillBold16.displayName = "BubbleEyesGradientAiFillBold16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/close-circle-fill-24.js
var import_react$18, element$18, CloseCircleFill24;
var init_close_circle_fill_24 = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
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
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M12 24a12 12 0 100-24 12 12 0 000 24zm4.7-16.7a1 1 0 010 1.4L13.42 12l3.3 3.3a1 1 0 01-1.42 1.4L12 13.42l-3.3 3.3a1 1 0 01-1.4-1.42L10.58 12l-3.3-3.3a1 1 0 011.42-1.4L12 10.58l3.3-3.3a1 1 0 011.4 0z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	};
	CloseCircleFill24 = (0, import_react$18.forwardRef)(function(props, ref) {
		return (0, import_react$18.createElement)(IconBase, Object.assign({}, props, {
			id: "close-circle-fill-24",
			ref,
			icon: element$18
		}));
	});
	CloseCircleFill24.displayName = "CloseCircleFill24";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/cross-16.js
var import_react$17, element$17, Cross16;
var init_cross_16 = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$17 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M2.65 12.65a.5.5 0 00.7.7L8 8.71l4.65 4.64a.5.5 0 00.7-.7L8.71 8l4.64-4.65a.5.5 0 00-.7-.7L8 7.29 3.35 2.65a.5.5 0 10-.7.7L7.29 8l-4.64 4.65z"
			}
		}]
	};
	Cross16 = (0, import_react$17.forwardRef)(function(props, ref) {
		return (0, import_react$17.createElement)(IconBase, Object.assign({}, props, {
			id: "cross-16",
			ref,
			icon: element$17
		}));
	});
	Cross16.displayName = "Cross16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/general-close-12.js
var import_react$16, element$16, GeneralClose12;
var init_general_close_12 = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$16 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 12 12",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M9.13 2.35a.5.5 0 01.7.71L6.3 6.6l3.54 3.53a.5.5 0 11-.7.7L5.6 7.3l-3.54 3.54a.5.5 0 11-.7-.7L4.88 6.6 1.35 3.06a.5.5 0 01.71-.7L5.6 5.88l3.53-3.54z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	};
	GeneralClose12 = (0, import_react$16.forwardRef)(function(props, ref) {
		return (0, import_react$16.createElement)(IconBase, Object.assign({}, props, {
			id: "general-close-12",
			ref,
			icon: element$16
		}));
	});
	GeneralClose12.displayName = "GeneralClose12";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/image-gradient-ai-fill-16.js
var import_react$15, element$15, ImageGradientAiFill16;
var init_image_gradient_ai_fill_16 = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$15 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "url(#image-gradient-ai-fill-16_paint0_linear_7492_65200)",
				"d": "M13 1a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V3c0-1.1.9-2 2-2h10zM7.06 7.66a.75.75 0 00-1.13 0l-2.71 3.09a.89.89 0 00-.22.58c0 .37.3.67.67.67h8.94c.4 0 .67-.43.5-.8a1.38 1.38 0 00-.27-.36l-1.31-1.31a.75.75 0 00-1.06 0l-.78.78c-.1.1-.27.1-.37-.02L7.06 7.66zm3.82-3.03l-1.38.62 1.38.63.62 1.37.63-1.37 1.37-.63-1.38-.62-.62-1.38-.63 1.38z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "linearGradient",
				"attrs": {
					"id": "image-gradient-ai-fill-16_paint0_linear_7492_65200",
					"x1": 19.2,
					"x2": -.05,
					"y1": 8,
					"y2": 8,
					"gradientUnits": "userSpaceOnUse"
				},
				"children": [
					{
						"tag": "stop",
						"attrs": { "stopColor": "#FE9A75" }
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": .44,
							"stopColor": "#DC8FFF"
						}
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": 1,
							"stopColor": "#8E92FF"
						}
					}
				]
			}]
		}],
		"defIds": ["image-gradient-ai-fill-16_paint0_linear_7492_65200"]
	};
	ImageGradientAiFill16 = (0, import_react$15.forwardRef)(function(props, ref) {
		return (0, import_react$15.createElement)(IconBase, Object.assign({}, props, {
			id: "image-gradient-ai-fill-16",
			ref,
			icon: element$15
		}));
	});
	ImageGradientAiFill16.displayName = "ImageGradientAiFill16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-attention-24-light.js
var import_react$14, element$14, InfoAttention24Light;
var init_info_attention_24_light = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
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
			"tag": "rect",
			"attrs": {
				"width": 18,
				"height": 18,
				"x": 3,
				"y": 3,
				"fill": "#267EF0",
				"rx": 9
			}
		}, {
			"tag": "path",
			"attrs": {
				"fill": "#fff",
				"d": "M12 7a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	};
	InfoAttention24Light = (0, import_react$14.forwardRef)(function(props, ref) {
		return (0, import_react$14.createElement)(IconBase, Object.assign({}, props, {
			id: "info-attention-24-light",
			ref,
			icon: element$14
		}));
	});
	InfoAttention24Light.displayName = "InfoAttention24Light";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-attention-24-opacity.js
var import_react$13, element$13, InfoAttention24Opacity;
var init_info_attention_24_opacity = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
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
			"attrs": {
				"fill": "#fff",
				"clipPath": "url(#info-attention-24-opacity_clip0_949_19121)"
			},
			"children": [{
				"tag": "rect",
				"attrs": {
					"width": 18,
					"height": 18,
					"x": 3,
					"y": 3,
					"rx": 9,
					"fillOpacity": .25
				}
			}, {
				"tag": "path",
				"attrs": {
					"d": "M12 7a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z",
					"fillRule": "evenodd",
					"clipRule": "evenodd"
				}
			}]
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "clipPath",
				"attrs": { "id": "info-attention-24-opacity_clip0_949_19121" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h24v24H0z"
					}
				}]
			}]
		}],
		"defIds": ["info-attention-24-opacity_clip0_949_19121"]
	};
	InfoAttention24Opacity = (0, import_react$13.forwardRef)(function(props, ref) {
		return (0, import_react$13.createElement)(IconBase, Object.assign({}, props, {
			id: "info-attention-24-opacity",
			ref,
			icon: element$13
		}));
	});
	InfoAttention24Opacity.displayName = "InfoAttention24Opacity";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-error-24-light.js
var import_react$12, element$12, InfoError24Light;
var init_info_error_24_light = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
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
			"tag": "rect",
			"attrs": {
				"width": 18,
				"height": 18,
				"x": 3,
				"y": 3,
				"fill": "#D9443A",
				"rx": 9
			}
		}, {
			"tag": "path",
			"attrs": {
				"fill": "#fff",
				"d": "M9.87 8.63a.88.88 0 10-1.24 1.24L10.76 12l-2.13 2.13a.87.87 0 101.24 1.24L12 13.24l2.13 2.13a.87.87 0 101.24-1.24L13.24 12l2.13-2.13a.88.88 0 00-1.24-1.24L12 10.76 9.87 8.63z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	};
	InfoError24Light = (0, import_react$12.forwardRef)(function(props, ref) {
		return (0, import_react$12.createElement)(IconBase, Object.assign({}, props, {
			id: "info-error-24-light",
			ref,
			icon: element$12
		}));
	});
	InfoError24Light.displayName = "InfoError24Light";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-error-24-opacity.js
var import_react$11, element$11, InfoError24Opacity;
var init_info_error_24_opacity = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
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
			"attrs": {
				"fill": "#fff",
				"clipPath": "url(#info-error-24-opacity_clip0_949_19127)"
			},
			"children": [{
				"tag": "rect",
				"attrs": {
					"width": 18,
					"height": 18,
					"x": 3,
					"y": 3,
					"rx": 9,
					"fillOpacity": .25
				}
			}, {
				"tag": "path",
				"attrs": {
					"d": "M9.87 8.63a.88.88 0 10-1.24 1.24L10.76 12l-2.13 2.13a.87.87 0 101.24 1.24L12 13.24l2.13 2.13a.87.87 0 101.24-1.24L13.24 12l2.13-2.13a.88.88 0 00-1.24-1.24L12 10.76 9.87 8.63z",
					"fillRule": "evenodd",
					"clipRule": "evenodd"
				}
			}]
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "clipPath",
				"attrs": { "id": "info-error-24-opacity_clip0_949_19127" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h24v24H0z"
					}
				}]
			}]
		}],
		"defIds": ["info-error-24-opacity_clip0_949_19127"]
	};
	InfoError24Opacity = (0, import_react$11.forwardRef)(function(props, ref) {
		return (0, import_react$11.createElement)(IconBase, Object.assign({}, props, {
			id: "info-error-24-opacity",
			ref,
			icon: element$11
		}));
	});
	InfoError24Opacity.displayName = "InfoError24Opacity";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-error-white-16.js
var import_react$10, element$10, InfoErrorWhite16;
var init_info_error_white_16 = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$10 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "clipPath": "url(#info-error-white-16_clip0_2942_40901)" },
			"children": [{
				"tag": "g",
				"attrs": {
					"fill": "#fff",
					"clipPath": "url(#info-error-white-16_clip1_2942_40901)"
				},
				"children": [{
					"tag": "path",
					"attrs": {
						"d": "M.5 8a7.5 7.5 0 0115 0 7.5 7.5 0 01-15 0z",
						"fillOpacity": .25
					}
				}, {
					"tag": "path",
					"attrs": {
						"d": "M11.03 6.03a.75.75 0 10-1.06-1.06L8 6.94 6.03 4.97a.75.75 0 00-1.06 1.06L6.94 8 4.97 9.97a.75.75 0 101.06 1.06L8 9.06l1.97 1.97a.75.75 0 101.06-1.06L9.06 8l1.97-1.97z",
						"fillRule": "evenodd",
						"clipRule": "evenodd"
					}
				}]
			}]
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "clipPath",
				"attrs": { "id": "info-error-white-16_clip0_2942_40901" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h16v16H0z"
					}
				}]
			}, {
				"tag": "clipPath",
				"attrs": { "id": "info-error-white-16_clip1_2942_40901" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h16v16H0z"
					}
				}]
			}]
		}],
		"defIds": ["info-error-white-16_clip0_2942_40901", "info-error-white-16_clip1_2942_40901"]
	};
	InfoErrorWhite16 = (0, import_react$10.forwardRef)(function(props, ref) {
		return (0, import_react$10.createElement)(IconBase, Object.assign({}, props, {
			id: "info-error-white-16",
			ref,
			icon: element$10
		}));
	});
	InfoErrorWhite16.displayName = "InfoErrorWhite16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-success-24-light.js
var import_react$9, element$9, InfoSuccess24Light;
var init_info_success_24_light = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
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
			"tag": "rect",
			"attrs": {
				"width": 18,
				"height": 18,
				"x": 3,
				"y": 3,
				"fill": "#1EBD43",
				"rx": 9
			}
		}, {
			"tag": "path",
			"attrs": {
				"stroke": "#fff",
				"d": "M8 12.75l2.07 2.07c.1.1.26.1.36 0l5.07-5.07",
				"strokeLinecap": "round",
				"strokeWidth": 1.75
			}
		}]
	};
	InfoSuccess24Light = (0, import_react$9.forwardRef)(function(props, ref) {
		return (0, import_react$9.createElement)(IconBase, Object.assign({}, props, {
			id: "info-success-24-light",
			ref,
			icon: element$9
		}));
	});
	InfoSuccess24Light.displayName = "InfoSuccess24Light";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-success-24-opacity.js
var import_react$8, element$8, InfoSuccess24Opacity;
var init_info_success_24_opacity = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
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
			"attrs": { "clipPath": "url(#info-success-24-opacity_clip0_949_19133)" },
			"children": [{
				"tag": "rect",
				"attrs": {
					"width": 18,
					"height": 18,
					"x": 3,
					"y": 3,
					"fill": "#fff",
					"rx": 9,
					"fillOpacity": .25
				}
			}, {
				"tag": "path",
				"attrs": {
					"stroke": "#fff",
					"d": "M8 12.75l2.07 2.07c.1.1.26.1.36 0l5.07-5.07",
					"strokeLinecap": "round",
					"strokeWidth": 1.75
				}
			}]
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "clipPath",
				"attrs": { "id": "info-success-24-opacity_clip0_949_19133" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h24v24H0z"
					}
				}]
			}]
		}],
		"defIds": ["info-success-24-opacity_clip0_949_19133"]
	};
	InfoSuccess24Opacity = (0, import_react$8.forwardRef)(function(props, ref) {
		return (0, import_react$8.createElement)(IconBase, Object.assign({}, props, {
			id: "info-success-24-opacity",
			ref,
			icon: element$8
		}));
	});
	InfoSuccess24Opacity.displayName = "InfoSuccess24Opacity";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-success-white-16.js
var import_react$7, element$7, InfoSuccessWhite16;
var init_info_success_white_16 = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$7 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "clipPath": "url(#info-success-white-16_clip0_2941_40889)" },
			"children": [{
				"tag": "g",
				"attrs": { "clipPath": "url(#info-success-white-16_clip1_2941_40889)" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M.5 8a7.5 7.5 0 0115 0 7.5 7.5 0 01-15 0z",
						"fillOpacity": .25
					}
				}, {
					"tag": "path",
					"attrs": {
						"stroke": "#fff",
						"d": "M4.75 8.75l1.57 1.57c.1.1.26.1.36 0L11 6",
						"strokeLinecap": "round",
						"strokeWidth": 1.5
					}
				}]
			}]
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "clipPath",
				"attrs": { "id": "info-success-white-16_clip0_2941_40889" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h16v16H0z"
					}
				}]
			}, {
				"tag": "clipPath",
				"attrs": { "id": "info-success-white-16_clip1_2941_40889" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h16v16H0z"
					}
				}]
			}]
		}],
		"defIds": ["info-success-white-16_clip0_2941_40889", "info-success-white-16_clip1_2941_40889"]
	};
	InfoSuccessWhite16 = (0, import_react$7.forwardRef)(function(props, ref) {
		return (0, import_react$7.createElement)(IconBase, Object.assign({}, props, {
			id: "info-success-white-16",
			ref,
			icon: element$7
		}));
	});
	InfoSuccessWhite16.displayName = "InfoSuccessWhite16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/info-warming-white-16.js
var import_react$6, element$6, InfoWarmingWhite16;
var init_info_warming_white_16 = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$6 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "g",
			"attrs": { "clipPath": "url(#info-warming-white-16_clip0_2942_40900)" },
			"children": [{
				"tag": "g",
				"attrs": {
					"fill": "#fff",
					"clipPath": "url(#info-warming-white-16_clip1_2942_40900)"
				},
				"children": [{
					"tag": "path",
					"attrs": {
						"d": "M.5 8a7.5 7.5 0 0115 0 7.5 7.5 0 01-15 0z",
						"fillOpacity": .25
					}
				}, {
					"tag": "path",
					"attrs": {
						"d": "M8 3a1 1 0 00-1 1v4a1 1 0 002 0V4a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z",
						"fillRule": "evenodd",
						"clipRule": "evenodd"
					}
				}]
			}]
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "clipPath",
				"attrs": { "id": "info-warming-white-16_clip0_2942_40900" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h16v16H0z"
					}
				}]
			}, {
				"tag": "clipPath",
				"attrs": { "id": "info-warming-white-16_clip1_2942_40900" },
				"children": [{
					"tag": "path",
					"attrs": {
						"fill": "#fff",
						"d": "M0 0h16v16H0z"
					}
				}]
			}]
		}],
		"defIds": ["info-warming-white-16_clip0_2942_40900", "info-warming-white-16_clip1_2942_40900"]
	};
	InfoWarmingWhite16 = (0, import_react$6.forwardRef)(function(props, ref) {
		return (0, import_react$6.createElement)(IconBase, Object.assign({}, props, {
			id: "info-warming-white-16",
			ref,
			icon: element$6
		}));
	});
	InfoWarmingWhite16.displayName = "InfoWarmingWhite16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/lines-star-bold-gradient-ai-fill-16.js
var import_react$5, element$5, LinesStarBoldGradientAiFill16;
var init_lines_star_bold_gradient_ai_fill_16 = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$5 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [
			{
				"tag": "path",
				"attrs": {
					"fill": "url(#lines-star-bold-gradient-ai-fill-16_paint0_linear_7492_65178)",
					"d": "M13.25 9.75l.75.34 2 .91-2 .9-.75.35L12 15l-1.25-2.75L8 11l2.75-1.25L12 7l1.25 2.75z"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"fill": "url(#lines-star-bold-gradient-ai-fill-16_paint1_linear_7492_65178)",
					"d": "M12.5 1c.83 0 1.5.67 1.5 1.5v5.88l-.86-1.9a1.25 1.25 0 00-2.19-.16l-.09.16-1.05 2.33-2.33 1.05a1.25 1.25 0 000 2.28l2.33 1.05.36.81H2.5A1.5 1.5 0 011 12.5v-10C1 1.67 1.67 1 2.5 1h10zM3.75 7a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zm0-3.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z",
					"fillRule": "evenodd",
					"clipRule": "evenodd"
				}
			},
			{
				"tag": "defs",
				"attrs": {},
				"children": [{
					"tag": "linearGradient",
					"attrs": {
						"id": "lines-star-bold-gradient-ai-fill-16_paint0_linear_7492_65178",
						"x1": 20.5,
						"x2": -.13,
						"y1": 8,
						"y2": 8,
						"gradientUnits": "userSpaceOnUse"
					},
					"children": [
						{
							"tag": "stop",
							"attrs": { "stopColor": "#FE9A75" }
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": .44,
								"stopColor": "#DC8FFF"
							}
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": 1,
								"stopColor": "#8E92FF"
							}
						}
					]
				}, {
					"tag": "linearGradient",
					"attrs": {
						"id": "lines-star-bold-gradient-ai-fill-16_paint1_linear_7492_65178",
						"x1": 20.5,
						"x2": -.13,
						"y1": 8,
						"y2": 8,
						"gradientUnits": "userSpaceOnUse"
					},
					"children": [
						{
							"tag": "stop",
							"attrs": { "stopColor": "#FE9A75" }
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": .44,
								"stopColor": "#DC8FFF"
							}
						},
						{
							"tag": "stop",
							"attrs": {
								"offset": 1,
								"stopColor": "#8E92FF"
							}
						}
					]
				}]
			}
		],
		"defIds": ["lines-star-bold-gradient-ai-fill-16_paint0_linear_7492_65178", "lines-star-bold-gradient-ai-fill-16_paint1_linear_7492_65178"]
	};
	LinesStarBoldGradientAiFill16 = (0, import_react$5.forwardRef)(function(props, ref) {
		return (0, import_react$5.createElement)(IconBase, Object.assign({}, props, {
			id: "lines-star-bold-gradient-ai-fill-16",
			ref,
			icon: element$5
		}));
	});
	LinesStarBoldGradientAiFill16.displayName = "LinesStarBoldGradientAiFill16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/progress-ring-gray-12.js
var import_react$4, element$4, ProgressRingGray12;
var init_progress_ring_gray_12 = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$4 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 12 12",
			"width": "1em",
			"height": "1em"
		},
		"children": [
			{
				"tag": "path",
				"attrs": {
					"fill": "url(#progress-ring-gray-12_paint0_linear_3342_242299)",
					"d": "M6 2a4 4 0 110 8h4.47a5.98 5.98 0 000-8H6z",
					"fillRule": "evenodd",
					"clipRule": "evenodd"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"fill": "url(#progress-ring-gray-12_paint1_linear_3342_242299)",
					"d": "M2 6a4 4 0 014-4H1.53A6 6 0 006 12v-2a4 4 0 01-4-4z",
					"fillRule": "evenodd",
					"clipRule": "evenodd"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"fill": "#08101A",
					"d": "M1.53 2a5.99 5.99 0 018.94 0H1.53z",
					"fillOpacity": .3,
					"fillRule": "evenodd",
					"clipRule": "evenodd"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"fill": "#0B121A",
					"d": "M6 10v2c1.78 0 3.37-.77 4.47-2H6z",
					"fillOpacity": .6,
					"fillRule": "evenodd",
					"clipRule": "evenodd"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"fill": "#0B121A",
					"d": "M6 12a1 1 0 110-2v2z",
					"fillOpacity": .6
				}
			},
			{
				"tag": "defs",
				"attrs": {},
				"children": [{
					"tag": "linearGradient",
					"attrs": {
						"id": "progress-ring-gray-12_paint0_linear_3342_242299",
						"x1": 9,
						"x2": 9,
						"y1": 2,
						"y2": 10,
						"gradientUnits": "userSpaceOnUse"
					},
					"children": [{
						"tag": "stop",
						"attrs": {
							"stopColor": "#08101A",
							"stopOpacity": .3
						}
					}, {
						"tag": "stop",
						"attrs": {
							"offset": 1,
							"stopColor": "#0B121A",
							"stopOpacity": .6
						}
					}]
				}, {
					"tag": "linearGradient",
					"attrs": {
						"id": "progress-ring-gray-12_paint1_linear_3342_242299",
						"x1": 3,
						"x2": 3,
						"y1": 2,
						"y2": 12,
						"gradientUnits": "userSpaceOnUse"
					},
					"children": [{
						"tag": "stop",
						"attrs": {
							"stopColor": "#08101A",
							"stopOpacity": .3
						}
					}, {
						"tag": "stop",
						"attrs": {
							"offset": 1,
							"stopColor": "#0B121A",
							"stopOpacity": 0
						}
					}]
				}]
			}
		],
		"defIds": ["progress-ring-gray-12_paint0_linear_3342_242299", "progress-ring-gray-12_paint1_linear_3342_242299"]
	};
	ProgressRingGray12 = (0, import_react$4.forwardRef)(function(props, ref) {
		return (0, import_react$4.createElement)(IconBase, Object.assign({}, props, {
			id: "progress-ring-gray-12",
			ref,
			icon: element$4
		}));
	});
	ProgressRingGray12.displayName = "ProgressRingGray12";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/sparkles-square-gradient-ai-fill-16.js
var import_react$3, element$3, SparklesSquareGradientAiFill16;
var init_sparkles_square_gradient_ai_fill_16 = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$3 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "url(#sparkles-square-gradient-ai-fill-16_paint0_linear_7492_65213)",
				"d": "M12.25 1A2.75 2.75 0 0115 3.75v8.5A2.75 2.75 0 0112.25 15h-8.5A2.75 2.75 0 011 12.25v-8.5A2.75 2.75 0 013.75 1h8.5zm-6.5 6.5L3 8.75 5.75 10 7 12.75 8.25 10 11 8.75 8.25 7.5 7 4.75 5.75 7.5zm5.63-2.88L10 5.25l1.38.63.62 1.37.63-1.38L14 5.25l-1.38-.63L12 3.25l-.63 1.38z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "linearGradient",
				"attrs": {
					"id": "sparkles-square-gradient-ai-fill-16_paint0_linear_7492_65213",
					"x1": 19.2,
					"x2": -.05,
					"y1": 8,
					"y2": 8,
					"gradientUnits": "userSpaceOnUse"
				},
				"children": [
					{
						"tag": "stop",
						"attrs": { "stopColor": "#FE9A75" }
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": .44,
							"stopColor": "#DC8FFF"
						}
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": 1,
							"stopColor": "#8E92FF"
						}
					}
				]
			}]
		}],
		"defIds": ["sparkles-square-gradient-ai-fill-16_paint0_linear_7492_65213"]
	};
	SparklesSquareGradientAiFill16 = (0, import_react$3.forwardRef)(function(props, ref) {
		return (0, import_react$3.createElement)(IconBase, Object.assign({}, props, {
			id: "sparkles-square-gradient-ai-fill-16",
			ref,
			icon: element$3
		}));
	});
	SparklesSquareGradientAiFill16.displayName = "SparklesSquareGradientAiFill16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/tag-up-gradient-ai-fill-16.js
var import_react$2, element$2, TagUpGradientAiFill16;
var init_tag_up_gradient_ai_fill_16 = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_icon();
	element$2 = {
		"tag": "svg",
		"attrs": {
			"fill": "none",
			"viewBox": "0 0 16 16",
			"width": "1em",
			"height": "1em"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "url(#tag-up-gradient-ai-fill-16_paint0_linear_7492_65188)",
				"d": "M7.05.78a1.5 1.5 0 011.9 0l3.82 3.12a2 2 0 01.73 1.55V14a2 2 0 01-2 2h-7a2 2 0 01-2-2V5.45a2 2 0 01.73-1.55L7.05.78zM8 5.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
			}
		}, {
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "linearGradient",
				"attrs": {
					"id": "tag-up-gradient-ai-fill-16_paint0_linear_7492_65188",
					"x1": 16.8,
					"x2": 1.67,
					"y1": 8.22,
					"y2": 8.22,
					"gradientUnits": "userSpaceOnUse"
				},
				"children": [
					{
						"tag": "stop",
						"attrs": { "stopColor": "#FE9A75" }
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": .44,
							"stopColor": "#DC8FFF"
						}
					},
					{
						"tag": "stop",
						"attrs": {
							"offset": 1,
							"stopColor": "#8E92FF"
						}
					}
				]
			}]
		}],
		"defIds": ["tag-up-gradient-ai-fill-16_paint0_linear_7492_65188"]
	};
	TagUpGradientAiFill16 = (0, import_react$2.forwardRef)(function(props, ref) {
		return (0, import_react$2.createElement)(IconBase, Object.assign({}, props, {
			id: "tag-up-gradient-ai-fill-16",
			ref,
			icon: element$2
		}));
	});
	TagUpGradientAiFill16.displayName = "TagUpGradientAiFill16";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/tdoc-info-loading-color.js
var import_react$1, element$1, TdocInfoLoadingColor;
var init_tdoc_info_loading_color = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
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
			"tag": "path",
			"attrs": {
				"fill": "#060F1A",
				"d": "M3 12a9 9 0 1118 0 9 9 0 01-18 0zm16 0a7 7 0 10-14 0 7 7 0 0014 0z",
				"fillOpacity": .1,
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "path",
			"attrs": {
				"fill": "#267EF0",
				"d": "M12 3v2a7 7 0 017 7h2a9 9 0 00-9-9z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	};
	TdocInfoLoadingColor = (0, import_react$1.forwardRef)(function(props, ref) {
		return (0, import_react$1.createElement)(IconBase, Object.assign({}, props, {
			id: "tdoc-info-loading-color",
			ref,
			icon: element$1
		}));
	});
	TdocInfoLoadingColor.displayName = "TdocInfoLoadingColor";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/components/tdoc-info-loading-fill.js
var import_react, element, TdocInfoLoadingFill;
var init_tdoc_info_loading_fill = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
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
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M3 12a9 9 0 1118 0 9 9 0 01-18 0zm16 0a7 7 0 10-14 0 7 7 0 0014 0z",
				"opacity": .4,
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M12 3v2a7 7 0 017 7h2a9 9 0 00-9-9z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	};
	TdocInfoLoadingFill = (0, import_react.forwardRef)(function(props, ref) {
		return (0, import_react.createElement)(IconBase, Object.assign({}, props, {
			id: "tdoc-info-loading-fill",
			ref,
			icon: element
		}));
	});
	TdocInfoLoadingFill.displayName = "TdocInfoLoadingFill";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/icons.js
var init_icons = __esmMin((() => {
	init_icon();
	init_app_gradient_ai_fill_16();
	init_arrow_up_square_trailing_bold_gradient_ai_fill_16();
	init_bubble_eyes_gradient_ai_fill_bold_16();
	init_close_circle_fill_24();
	init_cross_16();
	init_general_close_12();
	init_image_gradient_ai_fill_16();
	init_info_attention_24_light();
	init_info_attention_24_opacity();
	init_info_error_24_light();
	init_info_error_24_opacity();
	init_info_error_white_16();
	init_info_success_24_light();
	init_info_success_24_opacity();
	init_info_success_white_16();
	init_info_warming_white_16();
	init_lines_star_bold_gradient_ai_fill_16();
	init_progress_ring_gray_12();
	init_sparkles_square_gradient_ai_fill_16();
	init_tag_up_gradient_ai_fill_16();
	init_tdoc_info_loading_color();
	init_tdoc_info_loading_fill();
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/manifest.js
var init_manifest = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons/esm/index.js
var init_esm = __esmMin((() => {
	init_icons();
	init_manifest();
	init_icon();
}));
//#endregion
export { AppGradientAiFill16 as C, ArrowUpSquareTrailingBoldGradientAiFill16 as S, ImageGradientAiFill16 as _, SparklesSquareGradientAiFill16 as a, CloseCircleFill24 as b, InfoWarmingWhite16 as c, InfoSuccess24Light as d, InfoErrorWhite16 as f, InfoAttention24Light as g, InfoAttention24Opacity as h, TagUpGradientAiFill16 as i, InfoSuccessWhite16 as l, InfoError24Light as m, TdocInfoLoadingFill as n, ProgressRingGray12 as o, InfoError24Opacity as p, TdocInfoLoadingColor as r, LinesStarBoldGradientAiFill16 as s, init_esm as t, InfoSuccess24Opacity as u, GeneralClose12 as v, BubbleEyesGradientAiFillBold16 as x, Cross16 as y };
