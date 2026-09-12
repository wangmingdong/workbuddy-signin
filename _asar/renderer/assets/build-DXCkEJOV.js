import { t as __commonJSMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/@tencent/wemeet-js-bridge/build/index.js
var require_build = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, r) {
		"object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.WeMeetJSBridge = r() : e.WeMeetJSBridge = r();
	})(window, (function() {
		return function(e) {
			var r = {};
			function o(t) {
				if (r[t]) return r[t].exports;
				var n = r[t] = {
					i: t,
					l: !1,
					exports: {}
				};
				return e[t].call(n.exports, n, n.exports, o), n.l = !0, n.exports;
			}
			return o.m = e, o.c = r, o.d = function(e, r, t) {
				o.o(e, r) || Object.defineProperty(e, r, {
					enumerable: !0,
					get: t
				});
			}, o.r = function(e) {
				"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
			}, o.t = function(e, r) {
				if (1 & r && (e = o(e)), 8 & r) return e;
				if (4 & r && "object" == typeof e && e && e.__esModule) return e;
				var t = Object.create(null);
				if (o.r(t), Object.defineProperty(t, "default", {
					enumerable: !0,
					value: e
				}), 2 & r && "string" != typeof e) for (var n in e) o.d(t, n, function(r) {
					return e[r];
				}.bind(null, n));
				return t;
			}, o.n = function(e) {
				var r = e && e.__esModule ? function() {
					return e.default;
				} : function() {
					return e;
				};
				return o.d(r, "a", r), r;
			}, o.o = function(e, r) {
				return Object.prototype.hasOwnProperty.call(e, r);
			}, o.p = "", o(o.s = 0);
		}([function(e, r, o) {
			"use strict";
			o.r(r), o.d(r, "OS_TYPE", (function() {
				return t;
			})), o.d(r, "getOSType", (function() {
				return i;
			})), o.d(r, "callNative", (function() {
				return c;
			})), o.d(r, "freeCallback", (function() {
				return s;
			})), o.d(r, "registMethod", (function() {
				return d;
			})), o.d(r, "unregistMethod", (function() {
				return u;
			})), o.d(r, "version", (function() {
				return f;
			}));
			var t, n = "__wmJSCallNativeTemp";
			(function(e) {
				e.MAC = "MAC", e.WIN = "WIN", e.LINUX = "LINUX", e.IOS = "IOS", e.ANDROID = "ANDROID", e.UNKNOW = "UNKNOW";
			})(t || (t = {}));
			var a = {
				module: "",
				method: "",
				param: {},
				callback: "",
				callId: ""
			}, i = function() {
				var e = navigator.userAgent, r = navigator.platform, o = t.UNKNOW;
				return [
					"Macintosh",
					"MacIntel",
					"MacPPC",
					"Mac68K"
				].includes(r) ? o = t.MAC : [
					"iPhone",
					"iPad",
					"iPod"
				].includes(r) ? o = t.IOS : [
					"Win32",
					"Win64",
					"Windows",
					"WinCE"
				].includes(r) ? o = t.WIN : e.includes("Android") ? o = t.ANDROID : o !== t.UNKNOW && r.includes("Linux") && (o = t.LINUX), o;
			}, l = function() {
				var e, r = window[n];
				if (r) return r;
				var o = {
					callbacks: {},
					registers: (e = {}, e.BASIC_MODULE = {}, e),
					execCallback: function(e) {
						void 0 === e && (e = ""), console.log("Recive Callback From Native", e);
						var r = window[n];
						if (r) {
							var o = {};
							try {
								o = JSON.parse(e);
							} catch (e) {
								console.error(e);
							}
							var t = o.callId;
							t ? r.callbacks[t] ? r.callbacks[t](o) : console.error("Ignore If Callback With The CallId Has Deleted") : console.error("Ignore If Response Has No CallId");
						}
					},
					sendMessage: function(e) {
						void 0 === e && (e = ""), console.log("Recive Message From Native", e);
						var r = {
							module: "BASIC_MODULE",
							method: ""
						};
						try {
							var o = JSON.parse(e);
							r = Object.assign(r, o);
						} catch (e) {
							console.error(e);
						}
						var t = r.module, a = r.method, i = r.param;
						if (a) {
							var l = window[n];
							if (l) {
								l.registers[t] || (l.registers[t] = {});
								var c = l.registers[t];
								c[a] || (c[a] = []), c[a].forEach((function(e) {
									if ("function" == typeof e) try {
										e(i);
									} catch (e) {
										console.error("Register Method " + a + " Execute Failed", e);
									}
								}));
							}
						} else console.error("method Not Correct");
					}
				};
				return window[n] = o, o;
			}, c = function(e, r, o, c) {
				var s = window[n];
				s || (s = l());
				var d = s.callbacks, u = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
					var r = 16 * Math.random() | 0;
					return ("x" === e ? r : 3 & r | 8).toString(16);
				})), f = c;
				return f = "function" != typeof f ? function() {
					delete d[u];
				} : function() {
					for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
					c.apply(void 0, e), delete d[u];
				}, d[u] = f, function(e, r) {
					switch (void 0 === r && (r = a), console.log(e, JSON.stringify(r)), i()) {
						case t.MAC:
						case t.IOS:
							var o = window.webkit && window.webkit.messageHandlers;
							(n = o && o[e]) && n.postMessage ? n.postMessage(JSON.stringify(r)) : console.warn("Not A WeMeet Webview");
							break;
						case t.WIN:
							var n = window.external && window.external.nativeCall, l = r.module, c = r.method, s = r.param, d = r.callback, u = r.callId;
							n ? n(e, [
								l,
								c,
								s,
								d,
								u
							], (function() {})) : console.warn("Not A WeMeet Webview");
							break;
						case t.ANDROID:
						case t.LINUX:
							window.JSCallJavaMgr && window.JSCallJavaMgr[e] ? window.JSCallJavaMgr[e](JSON.stringify(r)) : console.warn("Not A WeMeet Webview");
							break;
						default: console.error("UNKNOW OS"), console.log("UA: " + navigator.userAgent + ", Platform: " + navigator.platform);
					}
				}("JSCallNative", {
					callback: "window.__wmJSCallNativeTemp.execCallback",
					module: e,
					method: r,
					param: o,
					callId: u
				}), u;
			}, s = function(e) {
				var r = window[n];
				r || (r = l());
				var o = r.callbacks;
				e && o[e] && delete o[e];
			}, d = function(e, r, o) {
				if (void 0 === o && (o = "BASIC_MODULE"), e && "function" == typeof r) {
					var t = window[n];
					t || (t = l()), t.registers[o] || (t.registers[o] = {});
					var a = t.registers[o];
					a[e] || (a[e] = []), a[e].push(r);
				} else console.error("methodName And callback Not Correct");
			}, u = function(e, r, o) {
				if (void 0 === o && (o = "BASIC_MODULE"), e && "function" == typeof r) {
					var t = window[n];
					t || (t = l()), t.registers[o] || (t.registers[o] = {});
					var a = t.registers[o];
					a[e] || (a[e] = []);
					var i = a[e].indexOf(r);
					i > -1 && a[e].splice(i, 1);
				} else console.error("methodName And callback Not Correct");
			}, f = "1.1.5";
			r.default = {
				version: f,
				registMethod: d,
				unregistMethod: u,
				callNative: c,
				freeCallback: s
			};
		}]);
	}));
}));
//#endregion
export { require_build as t };
