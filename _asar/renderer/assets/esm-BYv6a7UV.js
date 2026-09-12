import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { r as init_esm$1, t as esm_default } from "./esm-w-aC9ppW.js";
import { n as init_esm$2, r as ua } from "./esm-mgJiqgJI.js";
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
var init_typeof = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
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
var init_toPrimitive = __esmMin((() => {
	init_typeof();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
var init_toPropertyKey = __esmMin((() => {
	init_typeof();
	init_toPrimitive();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
var init_defineProperty = __esmMin((() => {
	init_toPropertyKey();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
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
function _objectSpread2(e) {
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
var init_objectSpread2 = __esmMin((() => {
	init_defineProperty();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/window.js
var getCurrentWindow, getCurrentMQQ, getCurrentWX;
var init_window = __esmMin((() => {
	getCurrentWindow = function getCurrentWindow(supportIFrame) {
		if (supportIFrame && window.frameElement) return window.top || window;
		return window;
	};
	getCurrentMQQ = function getCurrentMQQ(supportIFrame) {
		if (supportIFrame && window.frameElement) {
			var _window$top;
			return (_window$top = window.top) === null || _window$top === void 0 ? void 0 : _window$top.mqq;
		}
		return window.mqq;
	};
	getCurrentWX = function getCurrentWX(supportIFrame) {
		if (supportIFrame && window.frameElement) {
			var _window$top2;
			return (_window$top2 = window.top) === null || _window$top2 === void 0 ? void 0 : _window$top2.wx;
		}
		return window.wx;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/default-open.js
/**
* 最终的兜底打开
*/
function doUrlForDefaultOpen(theUrl, options) {
	var replace = options.replace, windowName = options.windowName, windowFeatures = options.windowFeatures, supportIFrame = options.supportIFrame;
	var currentWindow = getCurrentWindow(supportIFrame);
	if (replace) {
		var _currentWindow$locati;
		currentWindow === null || currentWindow === void 0 || (_currentWindow$locati = currentWindow.location) == null || _currentWindow$locati.replace(theUrl);
	} else currentWindow === null || currentWindow === void 0 || currentWindow.open(theUrl, windowName, windowFeatures);
}
var init_default_open = __esmMin((() => {
	init_window();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/mini-program.js
/**
* 小程序中打开文件的处理.
*/
function doOpenUrlForMiniProgram(targetUrl, options) {
	var wxUrl = options.wxUrl, replace = options.replace, noHistory = options.noHistory, supportIFrame = options.supportIFrame;
	var wx = getCurrentWX(supportIFrame);
	var currentWindow = getCurrentWindow(supportIFrame);
	if (isEntMiniProgram()) {
		currentWindow.location.href = targetUrl;
		return;
	}
	if (!(wx !== null && wx !== void 0 && wx.miniProgram)) {
		doUrlForDefaultOpen(targetUrl, options);
		console.error("no miniProgram sdk");
		return;
	}
	var targetOpenUrl = wxUrl !== null && wxUrl !== void 0 ? wxUrl : getUrlFromTargetUrl(targetUrl);
	if (replace) {
		wx.miniProgram.redirectTo({ url: targetOpenUrl });
		return;
	}
	if (noHistory) {
		wx.miniProgram.reLaunch({ url: targetOpenUrl });
		return;
	}
	wx.miniProgram.navigateTo({ url: targetOpenUrl });
}
function getUrlFromTargetUrl(targetUrl) {
	if (/^https:\/\/docs\.qq\.com\/(sheet|doc|slide|form|pdf|file|mind|flowchart|rec|aio)\/(.*)$/.test(targetUrl)) return "/pages/detail/detail?url=".concat(encodeURIComponent(targetUrl));
	return "/pages/webview/webview?url=".concat(encodeURIComponent(targetUrl));
}
var isEntMiniProgram;
var init_mini_program = __esmMin((() => {
	init_window();
	init_default_open();
	isEntMiniProgram = function isEntMiniProgram() {
		var _window, _window$location, _window2, _window2$location;
		return /from=miniprogram/.test((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.search) || /from=miniprogram_wedoc/.test((_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$location = _window2.location) === null || _window2$location === void 0 ? void 0 : _window2$location.search);
	};
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/qq-docapp.js
function isNtQQ() {
	var _global, _global2;
	return ((_global = globalThis) === null || _global === void 0 ? void 0 : _global.ntqq) || ((_global2 = globalThis) === null || _global2 === void 0 ? void 0 : _global2.ntQQApi);
}
function isSameOrigin(currentUrl, targetUrl) {
	var current = new URL(currentUrl);
	var target = new URL(targetUrl);
	return current.protocol === target.protocol && current.host === target.host;
}
/**
* qq或者文档app中的打开文件处理
*/
function doOpenUrlForQQorDocApp(targetUrl, options) {
	var replace = options.replace, style = options.style, useNewConfig = options.useNewConfig, supportIFrame = options.supportIFrame, appOption = options.appOption, forceReload = options.forceReload, ignoreDomainDetect = options.ignoreDomainDetect;
	var mqq = getCurrentMQQ(supportIFrame);
	var currentWindow = getCurrentWindow(supportIFrame);
	var openStyle = style || 2;
	if (!replace && isWindows && isQQ && !isNtQQ()) {
		currentWindow.open(targetUrl);
		return;
	}
	if (replace && !isNtQQ() || !mqq) {
		doReplaceOpen(targetUrl, supportIFrame);
		return;
	}
	mqq === null || mqq === void 0 || mqq.invoke("ui", "openUrl", _objectSpread2(_objectSpread2({}, appOption), {}, {
		url: targetUrl,
		target: 1,
		style: openStyle,
		useQQBrowser: true,
		useNewConfig,
		forceReload,
		ignoreDomainDetect
	}), function() {});
}
/**
* 文档中的replace 处理
*/
function doReplaceOpen(targetUrl, supportIFrame) {
	var currentWindow = getCurrentWindow(supportIFrame);
	if (isTencentDocsApp$1 && isSameOrigin(currentWindow.location.href, targetUrl)) {
		currentWindow.history.replaceState(null, document.title, targetUrl);
		currentWindow.location.replace("");
	} else currentWindow.location.replace(targetUrl);
}
var isTencentDocsApp$1, isQQ, isWindows;
var init_qq_docapp = __esmMin((() => {
	init_objectSpread2();
	init_window();
	init_esm$2();
	isTencentDocsApp$1 = ua.isTencentDocsApp, isQQ = ua.isQQ, isWindows = ua.isWindows;
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/OverloadYield.js
function _OverloadYield(e, d) {
	this.v = e, this.k = d;
}
var init_OverloadYield = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regeneratorDefine.js
function _regeneratorDefine(e, r, n, t) {
	var i = Object.defineProperty;
	try {
		i({}, "", {});
	} catch (e) {
		i = 0;
	}
	_regeneratorDefine = function regeneratorDefine(e, r, n, t) {
		function o(r, n) {
			_regeneratorDefine(e, r, function(e) {
				return this._invoke(r, n, e);
			});
		}
		r ? i ? i(e, r, {
			value: n,
			enumerable: !t,
			configurable: !t,
			writable: !t
		}) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
	}, _regeneratorDefine(e, r, n, t);
}
var init_regeneratorDefine = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regenerator.js
function _regenerator() {
	/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
	function i(r, n, o, i) {
		var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype);
		return _regeneratorDefine(u, "_invoke", function(r, n, o) {
			var i, c, u, f = 0, p = o || [], y = !1, G = {
				p: 0,
				n: 0,
				v: e,
				a: d,
				f: d.bind(e, 4),
				d: function d(t, r) {
					return i = t, c = 0, u = e, G.n = r, a;
				}
			};
			function d(r, n) {
				for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
					var o, i = p[t], d = G.p, l = i[2];
					r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
				}
				if (o || r > 1) return a;
				throw y = !0, n;
			}
			return function(o, p, l) {
				if (f > 1) throw TypeError("Generator is already running");
				for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
					i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
					try {
						if (f = 2, i) {
							if (c || (o = "next"), t = i[o]) {
								if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
								if (!t.done) return t;
								u = t.value, c < 2 && (c = 0);
							} else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
							i = e;
						} else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
					} catch (t) {
						i = e, c = 1, u = t;
					} finally {
						f = 1;
					}
				}
				return {
					value: t,
					done: y
				};
			};
		}(r, o, i), !0), u;
	}
	var a = {};
	function Generator() {}
	function GeneratorFunction() {}
	function GeneratorFunctionPrototype() {}
	t = Object.getPrototypeOf;
	var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function() {
		return this;
	}), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
	function f(e) {
		return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
	}
	return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function() {
		return this;
	}), _regeneratorDefine(u, "toString", function() {
		return "[object Generator]";
	}), (_regenerator = function _regenerator() {
		return {
			w: i,
			m: f
		};
	})();
}
var init_regenerator = __esmMin((() => {
	init_regeneratorDefine();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regeneratorAsyncIterator.js
function AsyncIterator(t, e) {
	function n(r, o, i, f) {
		try {
			var c = t[r](o), u = c.value;
			return u instanceof _OverloadYield ? e.resolve(u.v).then(function(t) {
				n("next", t, i, f);
			}, function(t) {
				n("throw", t, i, f);
			}) : e.resolve(u).then(function(t) {
				c.value = t, i(c);
			}, function(t) {
				return n("throw", t, i, f);
			});
		} catch (t) {
			f(t);
		}
	}
	var r;
	this.next || (_regeneratorDefine(AsyncIterator.prototype), _regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
		return this;
	})), _regeneratorDefine(this, "_invoke", function(t, o, i) {
		function f() {
			return new e(function(e, r) {
				n(t, i, e, r);
			});
		}
		return r = r ? r.then(f, f) : f();
	}, !0);
}
var init_regeneratorAsyncIterator = __esmMin((() => {
	init_OverloadYield();
	init_regeneratorDefine();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regeneratorAsyncGen.js
function _regeneratorAsyncGen(r, e, t, o, n) {
	return new AsyncIterator(_regenerator().w(r, e, t, o), n || Promise);
}
var init_regeneratorAsyncGen = __esmMin((() => {
	init_regenerator();
	init_regeneratorAsyncIterator();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regeneratorAsync.js
function _regeneratorAsync(n, e, r, t, o) {
	var a = _regeneratorAsyncGen(n, e, r, t, o);
	return a.next().then(function(n) {
		return n.done ? n.value : a.next();
	});
}
var init_regeneratorAsync = __esmMin((() => {
	init_regeneratorAsyncGen();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regeneratorKeys.js
function _regeneratorKeys(e) {
	var n = Object(e), r = [];
	for (var t in n) r.unshift(t);
	return function e() {
		for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
		return e.done = !0, e;
	};
}
var init_regeneratorKeys = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regeneratorValues.js
function _regeneratorValues(e) {
	if (null != e) {
		var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
		if (t) return t.call(e);
		if ("function" == typeof e.next) return e;
		if (!isNaN(e.length)) return { next: function next() {
			return e && r >= e.length && (e = void 0), {
				value: e && e[r++],
				done: !e
			};
		} };
	}
	throw new TypeError(_typeof(e) + " is not iterable");
}
var init_regeneratorValues = __esmMin((() => {
	init_typeof();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
function _regeneratorRuntime() {
	"use strict";
	var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
	function n(r) {
		var e = "function" == typeof r && r.constructor;
		return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
	}
	var o = {
		"throw": 1,
		"return": 2,
		"break": 3,
		"continue": 3
	};
	function a(r) {
		var e, t;
		return function(n) {
			e || (e = {
				stop: function stop() {
					return t(n.a, 2);
				},
				"catch": function _catch() {
					return n.v;
				},
				abrupt: function abrupt(r, e) {
					return t(n.a, o[r], e);
				},
				delegateYield: function delegateYield(r, o, a) {
					return e.resultName = o, t(n.d, _regeneratorValues(r), a);
				},
				finish: function finish(r) {
					return t(n.f, r);
				}
			}, t = function t(r, _t, o) {
				n.p = e.prev, n.n = e.next;
				try {
					return r(_t, o);
				} finally {
					e.next = n.n;
				}
			}), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
			try {
				return r.call(this, e);
			} finally {
				n.p = e.prev, n.n = e.next;
			}
		};
	}
	return (_regeneratorRuntime = function _regeneratorRuntime() {
		return {
			wrap: function wrap(e, t, n, o) {
				return r.w(a(e), t, n, o && o.reverse());
			},
			isGeneratorFunction: n,
			mark: r.m,
			awrap: function awrap(r, e) {
				return new _OverloadYield(r, e);
			},
			AsyncIterator,
			async: function async(r, e, t, o, u) {
				return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u);
			},
			keys: _regeneratorKeys,
			values: _regeneratorValues
		};
	})();
}
var init_regeneratorRuntime = __esmMin((() => {
	init_OverloadYield();
	init_regenerator();
	init_regeneratorAsync();
	init_regeneratorAsyncGen();
	init_regeneratorAsyncIterator();
	init_regeneratorKeys();
	init_regeneratorValues();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
var init_asyncToGenerator = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/interface.js
var OpenType;
var init_interface = __esmMin((() => {
	(function(OpenType) {
		OpenType[OpenType["WxworkBrowser"] = 1] = "WxworkBrowser";
	})(OpenType || (OpenType = {}));
})), BHost;
var init_constants = __esmMin((() => {
	BHost = "doc.weixin.qq.com";
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/get-target-domain.js
function getUrlDomain(url) {
	var _domain$;
	var domain = url.match(/(http?:\/\/|https:\/\/|\/\/)?([^\/\?#]+)/i);
	return (_domain$ = domain === null || domain === void 0 ? void 0 : domain[2]) !== null && _domain$ !== void 0 ? _domain$ : "";
}
var init_get_target_domain = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/cst.js
function removeCst(url) {
	var _urlOriginal$shift;
	var host = getUrlDomain(url);
	if (!ua.isWxWork || !["doc.weixin.qq.com", "docs.qq.com"].includes(host)) return url;
	var urlOriginal = url.split("#");
	var urlString = (_urlOriginal$shift = urlOriginal.shift()) !== null && _urlOriginal$shift !== void 0 ? _urlOriginal$shift : "";
	var hashString = urlOriginal.join("#");
	var filedNames = [
		ECstParams.NAME,
		ECstParams.VID,
		ECstParams.DEVICE_ID,
		EOldCstParams.NAME,
		EOldCstParams.VID,
		EOldCstParams.DEVICE_ID
	];
	var newSearchString = urlString;
	filedNames.forEach(function(fieldName) {
		newSearchString = removeURLParameter(newSearchString, fieldName);
	});
	if (!!hashString) return "".concat(newSearchString, "#").concat(hashString);
	return "".concat(newSearchString);
}
var ECstParams, EOldCstParams;
var init_cst = __esmMin((() => {
	init_esm$2();
	init_constants();
	init_utils();
	init_get_target_domain();
	/**
	* 老版本的 cst 相关参数,存在于老版本的客户端上.
	* 作用和前面的 CST_PARAMS 相同
	*/
	(function(ECstParams) {
		ECstParams["NAME"] = "wwapp_cst";
		ECstParams["VID"] = "wwapp_vid";
		ECstParams["DEVICE_ID"] = "wwapp_deviceid";
	})(ECstParams || (ECstParams = {}));
	/**
	* 删除cst相关的参数
	*/
	(function(EOldCstParams) {
		EOldCstParams["NAME"] = "cst";
		EOldCstParams["VID"] = "vid";
		EOldCstParams["DEVICE_ID"] = "deviceid";
	})(EOldCstParams || (EOldCstParams = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/multi-user.js
/**
* 判断是否是文档域名
*/
function isTDocsUrl(url) {
	return /^http(s)?:\/\/docs\.qq\.com/.test(url);
}
/**
* 获取一个多帐号的 url，这个内部使用
* @param {string} url
*/
function getRealMultiUrl(theUrl) {
	var url = getHttpsUrl(theUrl);
	var urlUserIndex = getQuery("u", url);
	if (!isTDocsUrl(url) || urlUserIndex !== "") return url;
	var userIndex = getMultiUserIndex();
	if (!userIndex) return url;
	var parsedUrl = new URL(url);
	var protocol = parsedUrl.protocol, host = parsedUrl.host, pathname = parsedUrl.pathname, search = parsedUrl.search, hash = parsedUrl.hash;
	if (search) url = "".concat(protocol, "//").concat(host).concat(pathname).concat(search, "&u=").concat(userIndex).concat(hash);
	else url = "".concat(protocol, "//").concat(host).concat(pathname, "?u=").concat(userIndex).concat(hash);
	return url;
}
/**
* 获取一个多帐号登录的 url ,这个对外暴露，
* @param {string} url
*/
function getMultiUrl(url) {
	return getRealMultiUrl(url);
}
/**
* 获取当前的 u，没有填 0
*/
function getMultiUserIndex() {
	var global_multi_user = window.global_multi_user;
	return window.nowUserIndex || (global_multi_user === null || global_multi_user === void 0 ? void 0 : global_multi_user.nowUserIndex) || getQuery("u") || "";
}
var init_multi_user = __esmMin((() => {
	init_utils();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/ua.js
function compareClientVersion(version1, version2) {
	if (version1 == version2) return 0;
	var v1 = version1.split(".");
	var v2 = version2.split(".");
	var i = 0;
	while (v1[i] && v2[i]) {
		if (+v1[i] == +v2[i]) {
			i += 1;
			continue;
		}
		return +v1[i] > +v2[i] ? EEqualVersion.HEIGHT : EEqualVersion.LOW;
	}
	if (v1[i]) return EEqualVersion.HEIGHT;
	if (v2[i]) return EEqualVersion.LOW;
	return EEqualVersion.EQUQL;
}
/**
* 获取客户端版本号
*/
function getUAClientVersion(flag) {
	var ua = navigator.userAgent.toLowerCase();
	var regVersionResult = ua.match(new RegExp("".concat(flag, "\\/(\\d+\\.\\d+\\.\\d+)"))) || ua.match(new RegExp("".concat(flag, "\\/(\\d+\\.\\d+)")));
	return regVersionResult ? regVersionResult[1] : "";
}
function escapeUrl(url) {
	if (/^(mailto:(\/\/)?)?([a-z\u00a1-\uffff0-9_\-.])+@([a-z\u00a1-\uffff0-9_\-.])+\.([a-z]{2,})$/i.test(url)) url = url.replace(/^(mailto:(\/\/)?)?/i, "mailto:");
	else if (!/^(https?|ftp|file):\/\//i.test(url)) if (/^(doc\.weixin\.qq\.com)/i.test(url)) url = "https://".concat(url);
	else url = "http://".concat(url);
	return url;
}
var EEqualVersion;
var init_ua = __esmMin((() => {
	/**
	* 对比客户端版本号
	* @param version2 传入要比对的版本号
	* @returns 当前客户端版本小于传入的版本 => -1，等于 => 0，大于 => 1
	*/
	(function(EEqualVersion) {
		EEqualVersion[EEqualVersion["LOW"] = -1] = "LOW";
		EEqualVersion[EEqualVersion["EQUQL"] = 0] = "EQUQL";
		EEqualVersion[EEqualVersion["HEIGHT"] = 1] = "HEIGHT";
	})(EEqualVersion || (EEqualVersion = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
var init_arrayWithHoles = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
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
var init_iterableToArrayLimit = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
var init_arrayLikeToArray = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
var init_unsupportedIterableToArray = __esmMin((() => {
	init_arrayLikeToArray();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var init_nonIterableRest = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
var init_slicedToArray = __esmMin((() => {
	init_arrayWithHoles();
	init_iterableToArrayLimit();
	init_unsupportedIterableToArray();
	init_nonIterableRest();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/cac-config.js
var appConfigInstance, currentDomainName, isSaas;
var init_cac_config = __esmMin((() => {
	init_esm$1();
	appConfigInstance = esm_default.getInstance();
	currentDomainName = appConfigInstance.getConfig("runtime.domainName") || window.location.hostname;
	isSaas = currentDomainName.endsWith("docs.qq.com") && !currentDomainName.startsWith("docs.qq.com");
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
	if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
var init_classCallCheck = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(e, r) {
	for (var t = 0; t < r.length; t++) {
		var o = r[t];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
	}
}
function _createClass(e, r, t) {
	return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
var init_createClass = __esmMin((() => {
	init_toPropertyKey();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/configuration.js
var defaultConfiguration;
var init_configuration = __esmMin((() => {
	init_objectSpread2();
	init_classCallCheck();
	init_createClass();
	init_defineProperty();
	init_constants();
	init_cac_config();
	defaultConfiguration = new (/* @__PURE__ */ function() {
		function OpenConfiguration() {
			_classCallCheck(this, OpenConfiguration);
			_defineProperty(this, "options", {
				ignoreDomainDetect: isSaas ? true : false,
				ignoreHosts: [BHost]
			});
		}
		_createClass(OpenConfiguration, [{
			key: "register",
			value: function register(options) {
				if (!options) return;
				this.options.ignoreDomainDetect = !!options.ignoreDomainDetect;
				this.options = _objectSpread2(_objectSpread2({}, this.options), options);
			}
		}, {
			key: "getOptions",
			value: function getOptions() {
				return this.options;
			}
		}]);
		return OpenConfiguration;
	}())();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/url.js
function getQuery(key, url) {
	var m = getSearch(url || globalThis.location || "").match(new RegExp("(\\?|&)".concat(key, "=([^&]*)(#|&|$)")));
	return !m ? "" : decodeURIComponent(m[2]);
}
/**
* FIXME: 可以直接用 URLSearchParams 对象处理
*/
function removeURLParameter(url, parameter) {
	var _url$split2 = _slicedToArray(url.split("?"), 2), path = _url$split2[0], search = _url$split2[1];
	if (search) {
		var prefix = "".concat(encodeURIComponent(parameter), "=");
		var pars = search.split(/[&]/g);
		for (var i = pars.length; i-- > 0;) if (pars[i].lastIndexOf(prefix, 0) !== -1) pars.splice(i, 1);
		url = path + (pars.length > 0 ? "?".concat(pars.join("&")) : "");
		return url;
	}
	return url;
}
function getSearch(url) {
	if (typeof url === "string") return url;
	return url.search;
}
function isScenarioLink(url) {
	return url.includes("/scenario/link.html");
}
function isQQDomain(url) {
	return /\.qq\.com/.test(url);
}
/**
* 将链接转换成https头
*/
function getHttpsUrl(url) {
	if (isQQDomain(url)) return url.replace(/^(http:)?\/\//i, "https://");
	return url;
}
/**
* 检查是否需要跳中转页
* @param url
* @param options
* @returns
*/
function isNeedScenarioRedirectLink$1(url, defaultOptions, options) {
	var ignoreDomainDetect = (defaultOptions || {}).ignoreDomainDetect;
	var isIgnoreHost = checkIgnoreHost(defaultOptions);
	var needRedirect = !isQQDomain(url) && !isScenarioLink(url);
	var needOpenPanel = !isQQDomain(url) && !isScenarioLink(url);
	if (isIgnoreHost || options !== null && options !== void 0 && options.ignoreDomainDetect || ignoreDomainDetect) needRedirect = false;
	if (!needRedirect && !needOpenPanel || !ignoreDomainDetect) needOpenPanel = false;
	return {
		needRedirect,
		needOpenPanel
	};
}
function oldNeedScenarioRedirectLink(url, options) {
	return (!isQQDomain(url) || isScenarioLink(url)) && !(options !== null && options !== void 0 && options.ignoreDomainDetect);
}
/**
* 获取最终跳转链接，用一个新的方法来兼容，preprocessUrl 部分品类有单独使用
* @param url
* @param options
* @returns
*/
function getPreprocessUrl(url, options) {
	var theUrl = removeCst(url);
	if (!theUrl) return null;
	if (theUrl.startsWith("javascript:")) return null;
	var defaultOptions = defaultConfiguration.getOptions();
	theUrl = getHttpsUrl(url);
	/**
	* 【C端文档专属逻辑，B端直接信任三方链接，不需要中转了】
	*  假如不是 qq.com 域名，且没有传域名忽略参数的
	*  需要经过 scenario 中转跳转
	*/
	var _isNeedScenarioRedire = isNeedScenarioRedirectLink$1(url, defaultOptions, options), needRedirect = _isNeedScenarioRedire.needRedirect, needOpenPanel = _isNeedScenarioRedire.needOpenPanel;
	if (needRedirect) {
		theUrl = "//".concat(currentDomainName, "/scenario/link.html?url=").concat(encodeURIComponent(theUrl));
		var clientVars = window.clientVars;
		if (clientVars) theUrl = "".concat(theUrl, "&pid=").concat(clientVars.globalPadId, "&cid=").concat(clientVars.creatorId);
	}
	if (!(options === null || options === void 0 ? void 0 : options.noUserIndex)) theUrl = getRealMultiUrl(theUrl);
	return {
		url: theUrl,
		callback: needOpenPanel ? defaultOptions.ignoreDomainDetectCallback : void 0
	};
}
function preprocessUrl(url, options) {
	var theUrl = removeCst(url);
	if (!theUrl) return null;
	var defaultOptions = defaultConfiguration.getOptions();
	theUrl = getHttpsUrl(url);
	/**
	* 【C端文档专属逻辑，B端直接信任三方链接，不需要中转了】
	*  假如不是 qq.com 域名，且没有传域名忽略参数的
	*  需要经过 scenario 中转跳转
	*/
	if (oldNeedScenarioRedirectLink(url, defaultOptions)) {
		theUrl = "//".concat(currentDomainName, "/scenario/link.html?url=").concat(encodeURIComponent(theUrl));
		var clientVars = window.clientVars;
		if (clientVars) theUrl = "".concat(theUrl, "&pid=").concat(clientVars.globalPadId, "&cid=").concat(clientVars.creatorId);
	}
	if (!(options === null || options === void 0 ? void 0 : options.noUserIndex)) theUrl = getRealMultiUrl(theUrl);
	return theUrl;
}
function triggerAnchorClick(a) {
	if (a.href === location.href && a.target === "_self") {
		location.reload();
		return;
	}
	var event = document.createEvent("MouseEvents");
	event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	a.dispatchEvent(event);
}
function checkIgnoreHost(defaultOptions) {
	var ignoreHosts = (defaultOptions || {}).ignoreHosts;
	var isIgnoreHost = false;
	if (ignoreHosts) isIgnoreHost = ignoreHosts.includes(currentDomainName);
	return isIgnoreHost;
}
var init_url = __esmMin((() => {
	init_slicedToArray();
	init_cac_config();
	init_configuration();
	init_cst();
	init_multi_user();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/private.js
var isInPrivate;
var init_private = __esmMin((() => {
	isInPrivate = function isInPrivate() {
		return !!window.PRIVATE;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/utils/index.js
var init_utils = __esmMin((() => {
	init_cst();
	init_get_target_domain();
	init_multi_user();
	init_ua();
	init_url();
	init_private();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/ctrl-key-manager.js
var isMacOS, CtrlKeyManager, ctrl_key_manager_default;
var init_ctrl_key_manager = __esmMin((() => {
	init_classCallCheck();
	init_createClass();
	init_defineProperty();
	init_esm$2();
	isMacOS = ua.isMac || ua.isIPad;
	CtrlKeyManager = /* @__PURE__ */ function() {
		function CtrlKeyManager() {
			var _this = this;
			_classCallCheck(this, CtrlKeyManager);
			_defineProperty(this, "isPressed", false);
			_defineProperty(this, "handleKeyboardEvent", function(e) {
				if (e.key !== (isMacOS ? "Meta" : "Control")) return;
				_this.setCtrlKeyStatus(e.type === "keydown");
			});
			_defineProperty(this, "handleBlurEvent", function() {
				_this.setCtrlKeyStatus(false);
			});
			var events = ["keydown", "keyup"];
			if (typeof window === "undefined" || typeof document === "undefined") {
				console.debug("CtrlKeyManager skip init, window or document is undefined");
				return;
			}
			events.forEach(function(evt) {
				document.addEventListener(evt, _this.handleKeyboardEvent);
			});
			window.addEventListener("blur", this.handleBlurEvent);
			window.addEventListener("beforeunload", function() {
				events.forEach(function(evt) {
					document.removeEventListener(evt, _this.handleKeyboardEvent);
				});
				window.removeEventListener("blur", _this.handleBlurEvent);
			});
		}
		_createClass(CtrlKeyManager, [{
			key: "setCtrlKeyStatus",
			value: function setCtrlKeyStatus(isPressed) {
				this.isPressed = isPressed;
			}
		}]);
		return CtrlKeyManager;
	}();
	ctrl_key_manager_default = new CtrlKeyManager();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/wx-work.js
function doOpenUrlForWxworkOrWedrive(url, options) {
	/**
	* 这里在企微上有一部分特殊逻辑.
	* 企微里面老版本上不支持replace的参数,直接location.href就完事了..
	* 企微的tdocs.openurl/openinTab接口对入口链接有做白名单.
	* 但是scenario路径不在白名单中
	*  1. b/c跳转的链接:
	*    1.1 在新版本中,直接打开客户端会给打开的链接带上url参数
	*    1.2 老版本中,直接用location来处理.
	*  2. 外部链接
	*    需要调用openInBrowser 接口在外部浏览器中
	*  3. 微盘文件的特殊处理
	*/
	try {
		if (ua.isMobile) {
			if (isWdocsWebView()) return openInWedocsWebView(url, options);
			return openInMobileBrowser(url, options);
		}
		if (ua.isWxDrive) return openInWedriveWebView(url, options);
		if (ua.isWxWorkVersionAboveOrEqual("3.1.18") || ua.isWxWorkPrivateVersionAboveOrEqual("2.7.2000")) {
			if (options.openType === OpenType.WxworkBrowser) {
				if (ua.isWxWorkVersionAboveOrEqual("4.0.0")) {
					console.log("trigger openInWxworkBrowser");
					return openInWxworkBrowser(url);
				}
			}
			return openInMultiTabWebView(url, options);
		}
		return openInBrowser(url, options);
	} catch (error) {
		console.error("doOpenUrlForWxworkOrWedrive error", error);
		return openInBrowser(url, options);
	}
}
var isWdocsWebView, isPrivateRE, isWedriveLink, isEntLink, OpenTarget, openInWedocsWebView, openInMobileBrowser, openInWedriveWebView, openInMultiTabWebView, openInBrowser, openInWxworkBrowser, fetchFileIdFromSvr;
var init_wx_work = __esmMin((() => {
	init_regeneratorRuntime();
	init_asyncToGenerator();
	init_objectSpread2();
	init_interface();
	init_utils();
	init_esm$2();
	init_esm();
	init_ctrl_key_manager();
	isWdocsWebView = function isWdocsWebView() {
		return compareClientVersion(getUAClientVersion("wdocs"), "1.0.0") >= 0;
	};
	isPrivateRE = function isPrivateRE(url) {
		return [/^http(s):\/\/drive\.weixin\.qq\.com\/s\?/i, /^http(s):\/\/drive\.weixin\.qq\.com\/cgi-bin\/disk\/s\?/i].some(function(e) {
			return e.test(url);
		});
	};
	isWedriveLink = function isWedriveLink(url) {
		return isInPrivate() ? isPrivateRE(url) : /^http(s):\/\/drive\.weixin\.qq\.com\//i.test(url);
	};
	isEntLink = function isEntLink(url) {
		return [
			/^http(s):\/\/doc\.weixin\.qq\.com\/doc/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/sheet/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/forms/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/mind/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/flowchart/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/slide/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/home/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/mall\/m\/profile\/craft/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/scenario\/login/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/txdoc/i,
			/^http(s):\/\/doc\.weixin\.qq\.com\/formcol/i
		].some(function(e) {
			return e.test(url);
		});
	};
	/**
	* 企业微信或微盘中的打开文件处理
	*/
	(function(OpenTarget) {
		OpenTarget[OpenTarget["REPLACE"] = 0] = "REPLACE";
		OpenTarget[OpenTarget["FORK_WEBVIEW"] = 1] = "FORK_WEBVIEW";
		OpenTarget[OpenTarget["BROWSER"] = 2] = "BROWSER";
		OpenTarget[OpenTarget["NEW_WEBVIEW"] = 3] = "NEW_WEBVIEW";
	})(OpenTarget || (OpenTarget = {}));
	openInWedocsWebView = function openInWedocsWebView(url, options) {
		var _window, _window$tdocs;
		if ((_window = window) !== null && _window !== void 0 && (_window$tdocs = _window.tdocs) !== null && _window$tdocs !== void 0 && _window$tdocs.openUrl) {
			var target = options.replace ? OpenTarget.REPLACE : isEntLink(url) ? OpenTarget.FORK_WEBVIEW : OpenTarget.NEW_WEBVIEW;
			console.log("doOpenUrlForWxworkOrWedrive use window.tdocs.openUrl", url, _objectSpread2(_objectSpread2({}, options), {}, { target }));
			return window.tdocs.openUrl({
				url,
				target,
				style: 3
			});
		}
		return openInMobileBrowser(url, options);
	};
	openInMobileBrowser = function openInMobileBrowser(url, options) {
		var _window2, _window2$mqq, _window2$mqq$ui, _window3, _window3$qmailBridge;
		if ((_window2 = window) !== null && _window2 !== void 0 && (_window2$mqq = _window2.mqq) !== null && _window2$mqq !== void 0 && (_window2$mqq$ui = _window2$mqq.ui) !== null && _window2$mqq$ui !== void 0 && _window2$mqq$ui.openUrl) {
			console.log("doOpenUrlForWxworkOrWedrive use window.mqq.ui.openUrl", url, options);
			return window.mqq.ui.openUrl({
				url,
				target: options.replace ? 0 : 1,
				style: 3,
				useQQBrowser: true
			});
		}
		if ((_window3 = window) !== null && _window3 !== void 0 && (_window3$qmailBridge = _window3.qmailBridge) !== null && _window3$qmailBridge !== void 0 && _window3$qmailBridge.openDocLink) {
			console.log("doOpenUrlForWxworkOrWedrive use window.qmailBridge.openDocLink", url, options);
			return window.qmailBridge.openDocLink({ url });
		}
		return openInBrowser(url, options);
	};
	openInWedriveWebView = /* @__PURE__ */ function() {
		var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(url, options) {
			var _window4, _window4$qmailBridge, _window5, _window5$tdocs;
			var fileId;
			return _regeneratorRuntime().wrap(function _callee$(_context) {
				while (1) switch (_context.prev = _context.next) {
					case 0:
						if (!((_window4 = window) !== null && _window4 !== void 0 && (_window4$qmailBridge = _window4.qmailBridge) !== null && _window4$qmailBridge !== void 0 && _window4$qmailBridge.openFileInWedrive && isWedriveLink(url))) {
							_context.next = 6;
							break;
						}
						_context.next = 3;
						return fetchFileIdFromSvr(url);
					case 3:
						fileId = _context.sent;
						console.log("doOpenUrlForWxworkOrWedrive use window.qmailBridge.openFileInWedrive", url, options);
						return _context.abrupt("return", window.qmailBridge.openFileInWedrive(fileId, url));
					case 6:
						if (!((_window5 = window) !== null && _window5 !== void 0 && (_window5$tdocs = _window5.tdocs) !== null && _window5$tdocs !== void 0 && _window5$tdocs.openInTab && isEntLink(url))) {
							_context.next = 9;
							break;
						}
						console.log("doOpenUrlForWxworkOrWedrive use window.tdocs.openInTab", url, options);
						return _context.abrupt("return", window.tdocs.openInTab({ url }));
					case 9: return _context.abrupt("return", openInBrowser(url, options));
					case 10:
					case "end": return _context.stop();
				}
			}, _callee);
		}));
		return function openInWedriveWebView(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();
	openInMultiTabWebView = /* @__PURE__ */ function() {
		var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(url, options) {
			var _window6, _window6$tdocs, _window7, _window7$tdocs, _window8, _window8$tdocs;
			var fileId;
			return _regeneratorRuntime().wrap(function _callee2$(_context2) {
				while (1) switch (_context2.prev = _context2.next) {
					case 0:
						if (!options.replace) {
							_context2.next = 4;
							break;
						}
						console.log("doOpenUrlForWxworkOrWedrive use window.location.href", url, options);
						window.location.href = url;
						return _context2.abrupt("return");
					case 4:
						if (!((_window6 = window) !== null && _window6 !== void 0 && (_window6$tdocs = _window6.tdocs) !== null && _window6$tdocs !== void 0 && _window6$tdocs.openFileInWedrive && isWedriveLink(url))) {
							_context2.next = 10;
							break;
						}
						_context2.next = 7;
						return fetchFileIdFromSvr(url);
					case 7:
						fileId = _context2.sent;
						console.log("doOpenUrlForWxworkOrWedrive use window.tdocs.openFileInWedrive", url, options);
						return _context2.abrupt("return", window.tdocs.openFileInWedrive({
							fileId,
							url
						}));
					case 10:
						if (!((_window7 = window) !== null && _window7 !== void 0 && (_window7$tdocs = _window7.tdocs) !== null && _window7$tdocs !== void 0 && _window7$tdocs.openInBrowser && isNeedScenarioRedirectLink(url))) {
							_context2.next = 13;
							break;
						}
						console.log("doOpenUrlForWxworkOrWedrive use window.tdocs.openInBrowser", url, options);
						return _context2.abrupt("return", window.tdocs.openInBrowser({ url: escapeUrl(url) }));
					case 13:
						if (!((_window8 = window) !== null && _window8 !== void 0 && (_window8$tdocs = _window8.tdocs) !== null && _window8$tdocs !== void 0 && _window8$tdocs.openInTab)) {
							_context2.next = 16;
							break;
						}
						console.log("doOpenUrlForWxworkOrWedrive use window.tdocs.openInTab", url, options);
						return _context2.abrupt("return", window.tdocs.openInTab({
							is_silent: ctrl_key_manager_default.isPressed,
							url
						}));
					case 16: return _context2.abrupt("return", openInBrowser(url, options));
					case 17:
					case "end": return _context2.stop();
				}
			}, _callee2);
		}));
		return function openInMultiTabWebView(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();
	openInBrowser = function openInBrowser(url, options) {
		if (options.replace) {
			console.log("doOpenUrlForWxworkOrWedrive use window.location.href", url, options);
			window.location.href = url;
		} else {
			console.log("doOpenUrlForWxworkOrWedrive use window.open", url, options);
			window.open(url);
		}
	};
	openInWxworkBrowser = function openInWxworkBrowser(url) {
		var _window$tdocs2;
		(_window$tdocs2 = window.tdocs) === null || _window$tdocs2 === void 0 || _window$tdocs2.openInWxworkBrowser({ url });
	};
	fetchFileIdFromSvr = function fetchFileIdFromSvr(url) {
		return new Promise(function(resolve) {
			var cgiUrl = "https://doc.weixin.qq.com/wedoc/getfileinfobyurl?url=".concat(url);
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var data = xhr.responseText;
						try {
							var _res$body;
							var res = JSON.parse(data);
							var fileId = res === null || res === void 0 ? void 0 : (_res$body = res.body) === null || _res$body === void 0 ? void 0 : _res$body.fileid;
							fileId ? resolve(fileId) : resolve(null);
						} catch (e) {
							console.error("fetchFileIdFromSvr error", e);
							resolve(null);
						}
					}
				}
			};
			xhr.onerror = function(e) {
				console.error("fetchFileIdFromSvr error", e);
				resolve(null);
			};
			xhr.ontimeout = function(e) {
				console.error("fetchFileIdFromSvr timeout", e);
				resolve(null);
			};
			xhr.open("GET", cgiUrl, true);
			xhr.setRequestHeader("Content-type", "text/plain");
			xhr.send();
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/ie.js
function doOpenUrlForIE(targetUrl, options) {
	var replace = options.replace, windowFeatures = options.windowFeatures, windowName = options.windowName;
	if (replace) window.location.href = targetUrl;
	else window.open(targetUrl, windowName, windowFeatures);
}
var init_ie = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/pc-doc.js
function doOpenUrlForPCDocClient(targetUrl, options) {
	var replace = options.replace, windowFeatures = options.windowFeatures, windowName = options.windowName, supportIFrame = options.supportIFrame;
	var currentWindow = getCurrentWindow(supportIFrame);
	if (replace) currentWindow.location.href = targetUrl;
	else currentWindow.open(addFromParam(targetUrl, "opennew=1"), windowName, windowFeatures);
}
/**
* 给 url 追加参数
* @param url  https://docs.qq.com?a=1
* @param param  b = 2
* @returns {*} https://docs.qq.com?a=1&b=2
*/
function addFromParam(url, param) {
	var theUrl = url;
	if (!param) return theUrl;
	if (theUrl.indexOf("?") >= 0) theUrl += "&".concat(param);
	else theUrl += "?".concat(param);
	return theUrl;
}
var init_pc_doc = __esmMin((() => {
	init_window();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/other.js
function doOpenUrlForOther(targetUrl, options, currentWindow) {
	var replace = options.replace, noHistory = options.noHistory, safariNeedReplace = options.safariNeedReplace, launchClient = options.launchClient;
	var jumpUrl = targetUrl;
	try {
		if (jumpUrl.startsWith("//")) jumpUrl = "".concat(location.protocol).concat(jumpUrl);
		var urlObj = new URL(jumpUrl);
		/** nlc: no launch client */
		var key = "nlc";
		if (urlObj.hostname === "docs.qq.com" && !launchClient) {
			urlObj.searchParams.set(key, "1");
			jumpUrl = urlObj.toString();
		}
	} catch (e) {
		console.error("parse url params error:", e);
	}
	if (safariNeedReplace) {
		currentWindow.location.href = jumpUrl;
		return;
	}
	if (ensureOpenNewWindow(_objectSpread2(_objectSpread2({}, options), {}, { url: jumpUrl }))) return;
	var a = document.createElement("a");
	a.href = jumpUrl;
	if (replace) a.target = "_self";
	else {
		a.target = "_blank";
		a.rel = "noreferrer";
	}
	if (noHistory) history.replaceState(null, document.title, jumpUrl);
	triggerAnchorClick(a);
}
function ensureOpenNewWindow(options) {
	var url = options.url, windowName = options.windowName, windowFeatures = options.windowFeatures;
	if (windowName && windowFeatures) {
		window.open(url, windowName, windowFeatures);
		return true;
	}
	return false;
}
var init_other = __esmMin((() => {
	init_objectSpread2();
	init_utils();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/native-download.js
function doOpenUrlForDownload(targetUrl) {
	var a = document.createElement("a");
	a.href = targetUrl;
	a.rel = "noreferrer";
	a.download = "download";
	triggerAnchorClick(a);
}
var init_native_download = __esmMin((() => {
	init_utils();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/actions/index.js
var init_actions = __esmMin((() => {
	init_default_open();
	init_mini_program();
	init_qq_docapp();
	init_wx_work();
	init_ie();
	init_pc_doc();
	init_other();
	init_native_download();
}));
//#endregion
//#region ../../node_modules/@tencent/tencent_doc_open_url/dist/esm/index.js
/**
* 注册部分通用配置
* @param options 需要注入的全局配置，将会覆盖一部分默认逻辑，包括跳过 中转页的检查和哪些域名忽略中转页
*/
function setDefaultConfiguration(options) {
	defaultConfiguration.register(options);
}
function newBlankWindow() {
	if (isWxMiniProgram || isQQMiniProgram) return "miniProgram";
	return window.open();
}
/**
* window.open的封装
* @param {string}} url
*/
function openNewBlankWindow(url) {
	var theUrl = getMultiUrl(url);
	return window.open(theUrl);
}
function tencentDocOpenUrlReload() {
	tencentDocOpenUrlForAll({
		url: location.href,
		replace: true,
		ignoreDomainDetect: true
	});
}
function setNewWindowUrl(windowObject, url) {
	if (windowObject === "miniProgram") {
		tencentDocOpenUrlForAll({ url });
		return;
	}
	if (!url) return;
	var theUrl = preprocessUrl(url);
	if (windowObject) windowObject.location = theUrl;
	else if (theUrl) window.location.href = theUrl;
}
function isNeedScenarioRedirectLink(url, options) {
	return !isQQDomain(url) && !(options !== null && options !== void 0 && options.ignoreDomainDetect);
}
/**
*
* @param options
* @param options.url 要打开的 url，比如 https://docs.qq.com/sheet/xxx 这样，支持自动识别详情页，打开 detail 容器，支持自动补充 https 头
* @param options.wxUrl 指定小程序页面 url （参数要调用方组织好），比如 /pages/xxx/xxx?a=1&b=2 注意参数是否需要编码
* @param options.replace 是否在当前页打开。true 代表是在当前页打开
* @param options.ignoreDomainDetect 忽略域名校验。默认是要通过 scenario 校验域名的
* @param options.windowName?: string window.open 第二个参数
* @param options.windowFeatures?: string window.open 第三个参数
* @param options.noUserIndex?: boolean 是否需要带u
* @param options.noHistory?: boolean 是否要清history
* @param options.useNewConfig?: boolean qq接口的参数
* @param options.supportIFrame?: boolean 是否兼容 iframe 情况, 如果是 true，则支持 iframe 嵌套，会优先使用 window.top 及其 mqq 和  wx 对象
* @param options.safariNeedReplace?: boolean safari 强制在当前页面刷新
* @param options.appConfig?: app 中 openUrl相关的配置
*/
function tencentDocOpenUrlForAll(options) {
	var _window$AppConfig, _window$AppConfig$nor;
	var url = options.url, wxUrl = options.wxUrl, replace = options.replace, style = options.style, safariNeedReplace = options.safariNeedReplace;
	var domain = (_window$AppConfig = window.AppConfig) === null || _window$AppConfig === void 0 ? void 0 : (_window$AppConfig$nor = _window$AppConfig.normal) === null || _window$AppConfig$nor === void 0 ? void 0 : _window$AppConfig$nor.domain;
	if (options.ignoreDomainDetect === void 0 && (domain === "private-tdocs" || domain === "saas-tdocs")) options.ignoreDomainDetect = true;
	var _ref = getPreprocessUrl(url, options) || {}, targetUrl = _ref.url, callback = _ref.callback;
	if (!targetUrl) return;
	if (callback) {
		callback(function() {
			openUrl(targetUrl, _objectSpread2({ ignoreDomainDetect: true }, options));
		});
		return;
	}
	console.log("open_url 参数》》》》》》", targetUrl, wxUrl, replace, isWxMiniProgram, isQQMiniProgram, isTimOrQQ, isIOS, isMobile, isIPad, isIE, window.mqq, style, safariNeedReplace, options, getPreprocessUrl(url, options));
	openUrl(targetUrl, options);
}
function tencentDocOpenUrl(url, name, specs, replace) {
	if (url === void 0) return;
	var theUrl = preprocessUrl(url);
	if (!isMobile && !isIE) {
		var a = document.createElement("a");
		a.href = theUrl;
		if (!isMobile && isMiniProgram) name = "_self";
		a.target = name ? name : "_blank";
		a.rel = "noreferrer";
		triggerAnchorClick(a);
	} else window.open.apply(window, [
		url,
		name,
		specs,
		replace
	]);
}
/**
* 真正打开页面的逻辑
* @param targetUrl
* @param options
*/
function openUrl(targetUrl, options) {
	var supportIFrame = options.supportIFrame, safariNeedReplace = options.safariNeedReplace, isDownLoad = options.isDownLoad;
	var currentWindow = getCurrentWindow(supportIFrame);
	if (isDownLoad && (isTimOrQQ || isTencentDocsApp || isElectronTencentDocsClient || isQQDesktopDocsClient)) doOpenUrlForDownload(targetUrl);
	else if (isWxMiniProgram || isQQMiniProgram) doOpenUrlForMiniProgram(targetUrl, options);
	else if (isWeChat || isSafari && safariNeedReplace) currentWindow.location.href = targetUrl;
	else if (isTimOrQQ || isTencentDocsApp) doOpenUrlForQQorDocApp(targetUrl, options);
	else if (isWxWork || isWxDrive) doOpenUrlForWxworkOrWedrive(targetUrl, options);
	else if (isIE) doOpenUrlForIE(targetUrl, options);
	else if (isPCTencentDocsClient) doOpenUrlForPCDocClient(targetUrl, options);
	else doOpenUrlForOther(targetUrl, options, currentWindow);
}
var isIPad, isMobile, isMiniProgram, isWxMiniProgram, isQQMiniProgram, isTimOrQQ, isIOS, isWeChat, isWxWork, isTencentDocsApp, isPCTencentDocsClient, isIE, isSafari, isElectronTencentDocsClient, isQQDesktopDocsClient, isWxDrive, getMultUrl;
var init_esm = __esmMin((() => {
	init_objectSpread2();
	init_esm$2();
	init_actions();
	init_utils();
	init_window();
	init_configuration();
	init_actions();
	isIPad = ua.isIPad, isMobile = ua.isMobile, isMiniProgram = ua.isMiniProgram, isWxMiniProgram = ua.isWxMiniProgram, isQQMiniProgram = ua.isQQMiniProgram, isTimOrQQ = ua.isTimOrQQ, isIOS = ua.isIOS, isWeChat = ua.isWeChat, isWxWork = ua.isWxWork, isTencentDocsApp = ua.isTencentDocsApp, isPCTencentDocsClient = ua.isPCTencentDocsClient, isIE = ua.isIE, isSafari = ua.isSafari, isElectronTencentDocsClient = ua.isElectronTencentDocsClient, isQQDesktopDocsClient = ua.isQQDesktopDocsClient, isWxDrive = ua.isWxDrive;
	getMultUrl = getMultiUrl;
}));
//#endregion
init_esm();
export { doOpenUrlForDownload, doOpenUrlForIE, doOpenUrlForMiniProgram, doOpenUrlForOther, doOpenUrlForPCDocClient, doOpenUrlForQQorDocApp, doOpenUrlForWxworkOrWedrive, doUrlForDefaultOpen, getMultUrl, isNeedScenarioRedirectLink, newBlankWindow, openNewBlankWindow, setDefaultConfiguration, setNewWindowUrl, tencentDocOpenUrl, tencentDocOpenUrlForAll, tencentDocOpenUrlReload };
