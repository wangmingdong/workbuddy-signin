import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/immer/dist/immer.esm.mjs
function n(n) {
	for (var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) t[e - 1] = arguments[e];
	throw Error("[Immer] minified error nr: " + n + (t.length ? " " + t.map((function(n) {
		return "'" + n + "'";
	})).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n) {
	return !!n && !!n[Q];
}
function t(n) {
	var r;
	return !!n && (function(n) {
		if (!n || "object" != typeof n) return !1;
		var r = Object.getPrototypeOf(n);
		if (null === r) return !0;
		var t = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
		return t === Object || "function" == typeof t && Function.toString.call(t) === Z;
	}(n) || Array.isArray(n) || !!n[L] || !!(null === (r = n.constructor) || void 0 === r ? void 0 : r[L]) || s(n) || v(n));
}
function i(n, r, t) {
	void 0 === t && (t = !1), 0 === o(n) ? (t ? Object.keys : nn)(n).forEach((function(e) {
		t && "symbol" == typeof e || r(e, n[e], n);
	})) : n.forEach((function(t, e) {
		return r(e, t, n);
	}));
}
function o(n) {
	var r = n[Q];
	return r ? r.i > 3 ? r.i - 4 : r.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}
function u(n, r) {
	return 2 === o(n) ? n.has(r) : Object.prototype.hasOwnProperty.call(n, r);
}
function a(n, r) {
	return 2 === o(n) ? n.get(r) : n[r];
}
function f(n, r, t) {
	var e = o(n);
	2 === e ? n.set(r, t) : 3 === e ? n.add(t) : n[r] = t;
}
function c(n, r) {
	return n === r ? 0 !== n || 1 / n == 1 / r : n != n && r != r;
}
function s(n) {
	return X && n instanceof Map;
}
function v(n) {
	return q && n instanceof Set;
}
function p(n) {
	return n.o || n.t;
}
function l(n) {
	if (Array.isArray(n)) return Array.prototype.slice.call(n);
	var r = rn(n);
	delete r[Q];
	for (var t = nn(r), e = 0; e < t.length; e++) {
		var i = t[e], o = r[i];
		!1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (r[i] = {
			configurable: !0,
			writable: !0,
			enumerable: o.enumerable,
			value: n[i]
		});
	}
	return Object.create(Object.getPrototypeOf(n), r);
}
function d(n, e) {
	return void 0 === e && (e = !1), y(n) || r(n) || !t(n) || (o(n) > 1 && (n.set = n.add = n.clear = n.delete = h), Object.freeze(n), e && i(n, (function(n, r) {
		return d(r, !0);
	}), !0)), n;
}
function h() {
	n(2);
}
function y(n) {
	return null == n || "object" != typeof n || Object.isFrozen(n);
}
function b(r) {
	var t = tn[r];
	return t || n(18, r), t;
}
function m(n, r) {
	tn[n] || (tn[n] = r);
}
function _() {
	return U;
}
function j(n, r) {
	r && (b("Patches"), n.u = [], n.s = [], n.v = r);
}
function g(n) {
	O(n), n.p.forEach(S), n.p = null;
}
function O(n) {
	n === U && (U = n.l);
}
function w(n) {
	return U = {
		p: [],
		l: U,
		h: n,
		m: !0,
		_: 0
	};
}
function S(n) {
	var r = n[Q];
	0 === r.i || 1 === r.i ? r.j() : r.g = !0;
}
function P(r, e) {
	e._ = e.p.length;
	var i = e.p[0], o = void 0 !== r && r !== i;
	return e.h.O || b("ES5").S(e, r, o), o ? (i[Q].P && (g(e), n(4)), t(r) && (r = M(e, r), e.l || x(e, r)), e.u && b("Patches").M(i[Q].t, r, e.u, e.s)) : r = M(e, i, []), g(e), e.u && e.v(e.u, e.s), r !== H ? r : void 0;
}
function M(n, r, t) {
	if (y(r)) return r;
	var e = r[Q];
	if (!e) return i(r, (function(i, o) {
		return A(n, e, r, i, o, t);
	}), !0), r;
	if (e.A !== n) return r;
	if (!e.P) return x(n, e.t, !0), e.t;
	if (!e.I) {
		e.I = !0, e.A._--;
		var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o, u = o, a = !1;
		3 === e.i && (u = new Set(o), o.clear(), a = !0), i(u, (function(r, i) {
			return A(n, e, o, r, i, t, a);
		})), x(n, o, !1), t && n.u && b("Patches").N(e, t, n.u, n.s);
	}
	return e.o;
}
function A(e, i, o, a, c, s, v) {
	if (r(c)) {
		var p = M(e, c, s && i && 3 !== i.i && !u(i.R, a) ? s.concat(a) : void 0);
		if (f(o, a, p), !r(p)) return;
		e.m = !1;
	} else v && o.add(c);
	if (t(c) && !y(c)) {
		if (!e.h.D && e._ < 1) return;
		M(e, c), i && i.A.l || x(e, c);
	}
}
function x(n, r, t) {
	void 0 === t && (t = !1), !n.l && n.h.D && n.m && d(r, t);
}
function z(n, r) {
	var t = n[Q];
	return (t ? p(t) : n)[r];
}
function I(n, r) {
	if (r in n) for (var t = Object.getPrototypeOf(n); t;) {
		var e = Object.getOwnPropertyDescriptor(t, r);
		if (e) return e;
		t = Object.getPrototypeOf(t);
	}
}
function k(n) {
	n.P || (n.P = !0, n.l && k(n.l));
}
function E(n) {
	n.o || (n.o = l(n.t));
}
function N(n, r, t) {
	var e = s(r) ? b("MapSet").F(r, t) : v(r) ? b("MapSet").T(r, t) : n.O ? function(n, r) {
		var t = Array.isArray(n), e = {
			i: t ? 1 : 0,
			A: r ? r.A : _(),
			P: !1,
			I: !1,
			R: {},
			l: r,
			t: n,
			k: null,
			o: null,
			j: null,
			C: !1
		}, i = e, o = en;
		t && (i = [e], o = on);
		var u = Proxy.revocable(i, o), a = u.revoke, f = u.proxy;
		return e.k = f, e.j = a, f;
	}(r, t) : b("ES5").J(r, t);
	return (t ? t.A : _()).p.push(e), e;
}
function R(e) {
	return r(e) || n(22, e), function n(r) {
		if (!t(r)) return r;
		var e, u = r[Q], c = o(r);
		if (u) {
			if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
			u.I = !0, e = D(r, c), u.I = !1;
		} else e = D(r, c);
		return i(e, (function(r, t) {
			u && a(u.t, r) === t || f(e, r, n(t));
		})), 3 === c ? new Set(e) : e;
	}(e);
}
function D(n, r) {
	switch (r) {
		case 2: return new Map(n);
		case 3: return Array.from(n);
	}
	return l(n);
}
function T() {
	function e(n) {
		if (!t(n)) return n;
		if (Array.isArray(n)) return n.map(e);
		if (s(n)) return new Map(Array.from(n.entries()).map((function(n) {
			return [n[0], e(n[1])];
		})));
		if (v(n)) return new Set(Array.from(n).map(e));
		var r = Object.create(Object.getPrototypeOf(n));
		for (var i in n) r[i] = e(n[i]);
		return u(n, L) && (r[L] = n[L]), r;
	}
	function f(n) {
		return r(n) ? e(n) : n;
	}
	var c = "add";
	m("Patches", {
		$: function(r, t) {
			return t.forEach((function(t) {
				for (var i = t.path, u = t.op, f = r, s = 0; s < i.length - 1; s++) {
					var v = o(f), p = i[s];
					"string" != typeof p && "number" != typeof p && (p = "" + p), 0 !== v && 1 !== v || "__proto__" !== p && "constructor" !== p || n(24), "function" == typeof f && "prototype" === p && n(24), "object" != typeof (f = a(f, p)) && n(15, i.join("/"));
				}
				var l = o(f), d = e(t.value), h = i[i.length - 1];
				switch (u) {
					case "replace": switch (l) {
						case 2: return f.set(h, d);
						case 3: n(16);
						default: return f[h] = d;
					}
					case c: switch (l) {
						case 1: return "-" === h ? f.push(d) : f.splice(h, 0, d);
						case 2: return f.set(h, d);
						case 3: return f.add(d);
						default: return f[h] = d;
					}
					case "remove": switch (l) {
						case 1: return f.splice(h, 1);
						case 2: return f.delete(h);
						case 3: return f.delete(t.value);
						default: return delete f[h];
					}
					default: n(17, u);
				}
			})), r;
		},
		N: function(n, r, t, e) {
			switch (n.i) {
				case 0:
				case 4:
				case 2: return function(n, r, t, e) {
					var o = n.t, s = n.o;
					i(n.R, (function(n, i) {
						var v = a(o, n), p = a(s, n), l = i ? u(o, n) ? "replace" : c : "remove";
						if (v !== p || "replace" !== l) {
							var d = r.concat(n);
							t.push("remove" === l ? {
								op: l,
								path: d
							} : {
								op: l,
								path: d,
								value: p
							}), e.push(l === c ? {
								op: "remove",
								path: d
							} : "remove" === l ? {
								op: c,
								path: d,
								value: f(v)
							} : {
								op: "replace",
								path: d,
								value: f(v)
							});
						}
					}));
				}(n, r, t, e);
				case 5:
				case 1: return function(n, r, t, e) {
					var i = n.t, o = n.R, u = n.o;
					if (u.length < i.length) {
						var a = [u, i];
						i = a[0], u = a[1];
						var s = [e, t];
						t = s[0], e = s[1];
					}
					for (var v = 0; v < i.length; v++) if (o[v] && u[v] !== i[v]) {
						var p = r.concat([v]);
						t.push({
							op: "replace",
							path: p,
							value: f(u[v])
						}), e.push({
							op: "replace",
							path: p,
							value: f(i[v])
						});
					}
					for (var l = i.length; l < u.length; l++) {
						var d = r.concat([l]);
						t.push({
							op: c,
							path: d,
							value: f(u[l])
						});
					}
					i.length < u.length && e.push({
						op: "replace",
						path: r.concat(["length"]),
						value: i.length
					});
				}(n, r, t, e);
				case 3: return function(n, r, t, e) {
					var i = n.t, o = n.o, u = 0;
					i.forEach((function(n) {
						if (!o.has(n)) {
							var i = r.concat([u]);
							t.push({
								op: "remove",
								path: i,
								value: n
							}), e.unshift({
								op: c,
								path: i,
								value: n
							});
						}
						u++;
					})), u = 0, o.forEach((function(n) {
						if (!i.has(n)) {
							var o = r.concat([u]);
							t.push({
								op: c,
								path: o,
								value: n
							}), e.unshift({
								op: "remove",
								path: o,
								value: n
							});
						}
						u++;
					}));
				}(n, r, t, e);
			}
		},
		M: function(n, r, t, e) {
			t.push({
				op: "replace",
				path: [],
				value: r === H ? void 0 : r
			}), e.push({
				op: "replace",
				path: [],
				value: n
			});
		}
	});
}
function C() {
	function r(n, r) {
		function t() {
			this.constructor = n;
		}
		a(n, r), n.prototype = (t.prototype = r.prototype, new t());
	}
	function e(n) {
		n.o || (n.R = /* @__PURE__ */ new Map(), n.o = new Map(n.t));
	}
	function o(n) {
		n.o || (n.o = /* @__PURE__ */ new Set(), n.t.forEach((function(r) {
			if (t(r)) {
				var e = N(n.A.h, r, n);
				n.p.set(r, e), n.o.add(e);
			} else n.o.add(r);
		})));
	}
	function u(r) {
		r.g && n(3, JSON.stringify(p(r)));
	}
	var a = function(n, r) {
		return (a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
			n.__proto__ = r;
		} || function(n, r) {
			for (var t in r) r.hasOwnProperty(t) && (n[t] = r[t]);
		})(n, r);
	}, f = function() {
		function n(n, r) {
			return this[Q] = {
				i: 2,
				l: r,
				A: r ? r.A : _(),
				P: !1,
				I: !1,
				o: void 0,
				R: void 0,
				t: n,
				k: this,
				C: !1,
				g: !1
			}, this;
		}
		r(n, Map);
		var o = n.prototype;
		return Object.defineProperty(o, "size", { get: function() {
			return p(this[Q]).size;
		} }), o.has = function(n) {
			return p(this[Q]).has(n);
		}, o.set = function(n, r) {
			var t = this[Q];
			return u(t), p(t).has(n) && p(t).get(n) === r || (e(t), k(t), t.R.set(n, !0), t.o.set(n, r), t.R.set(n, !0)), this;
		}, o.delete = function(n) {
			if (!this.has(n)) return !1;
			var r = this[Q];
			return u(r), e(r), k(r), r.t.has(n) ? r.R.set(n, !1) : r.R.delete(n), r.o.delete(n), !0;
		}, o.clear = function() {
			var n = this[Q];
			u(n), p(n).size && (e(n), k(n), n.R = /* @__PURE__ */ new Map(), i(n.t, (function(r) {
				n.R.set(r, !1);
			})), n.o.clear());
		}, o.forEach = function(n, r) {
			var t = this;
			p(this[Q]).forEach((function(e, i) {
				n.call(r, t.get(i), i, t);
			}));
		}, o.get = function(n) {
			var r = this[Q];
			u(r);
			var i = p(r).get(n);
			if (r.I || !t(i)) return i;
			if (i !== r.t.get(n)) return i;
			var o = N(r.A.h, i, r);
			return e(r), r.o.set(n, o), o;
		}, o.keys = function() {
			return p(this[Q]).keys();
		}, o.values = function() {
			var n, r = this, t = this.keys();
			return (n = {})[V] = function() {
				return r.values();
			}, n.next = function() {
				var n = t.next();
				return n.done ? n : {
					done: !1,
					value: r.get(n.value)
				};
			}, n;
		}, o.entries = function() {
			var n, r = this, t = this.keys();
			return (n = {})[V] = function() {
				return r.entries();
			}, n.next = function() {
				var n = t.next();
				if (n.done) return n;
				var e = r.get(n.value);
				return {
					done: !1,
					value: [n.value, e]
				};
			}, n;
		}, o[V] = function() {
			return this.entries();
		}, n;
	}(), c = function() {
		function n(n, r) {
			return this[Q] = {
				i: 3,
				l: r,
				A: r ? r.A : _(),
				P: !1,
				I: !1,
				o: void 0,
				t: n,
				k: this,
				p: /* @__PURE__ */ new Map(),
				g: !1,
				C: !1
			}, this;
		}
		r(n, Set);
		var t = n.prototype;
		return Object.defineProperty(t, "size", { get: function() {
			return p(this[Q]).size;
		} }), t.has = function(n) {
			var r = this[Q];
			return u(r), r.o ? !!r.o.has(n) || !(!r.p.has(n) || !r.o.has(r.p.get(n))) : r.t.has(n);
		}, t.add = function(n) {
			var r = this[Q];
			return u(r), this.has(n) || (o(r), k(r), r.o.add(n)), this;
		}, t.delete = function(n) {
			if (!this.has(n)) return !1;
			var r = this[Q];
			return u(r), o(r), k(r), r.o.delete(n) || !!r.p.has(n) && r.o.delete(r.p.get(n));
		}, t.clear = function() {
			var n = this[Q];
			u(n), p(n).size && (o(n), k(n), n.o.clear());
		}, t.values = function() {
			var n = this[Q];
			return u(n), o(n), n.o.values();
		}, t.entries = function() {
			var n = this[Q];
			return u(n), o(n), n.o.entries();
		}, t.keys = function() {
			return this.values();
		}, t[V] = function() {
			return this.values();
		}, t.forEach = function(n, r) {
			for (var t = this.values(), e = t.next(); !e.done;) n.call(r, e.value, e.value, this), e = t.next();
		}, n;
	}();
	m("MapSet", {
		F: function(n, r) {
			return new f(n, r);
		},
		T: function(n, r) {
			return new c(n, r);
		}
	});
}
var G, U, W, X, q, B, H, L, Q, V, Z, nn, rn, tn, en, on, un, an, fn, cn, sn, pn;
var init_immer_esm = __esmMin((() => {
	W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), X = "undefined" != typeof Map, q = "undefined" != typeof Set, B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = !0, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator", Z = "" + Object.prototype.constructor, nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n) {
		return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
	} : Object.getOwnPropertyNames, rn = Object.getOwnPropertyDescriptors || function(n) {
		var r = {};
		return nn(n).forEach((function(t) {
			r[t] = Object.getOwnPropertyDescriptor(n, t);
		})), r;
	}, tn = {}, en = {
		get: function(n, r) {
			if (r === Q) return n;
			var e = p(n);
			if (!u(e, r)) return function(n, r, t) {
				var e, i = I(r, t);
				return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
			}(n, e, r);
			var i = e[r];
			return n.I || !t(i) ? i : i === z(n.t, r) ? (E(n), n.o[r] = N(n.A.h, i, n)) : i;
		},
		has: function(n, r) {
			return r in p(n);
		},
		ownKeys: function(n) {
			return Reflect.ownKeys(p(n));
		},
		set: function(n, r, t) {
			var e = I(p(n), r);
			if (null == e ? void 0 : e.set) return e.set.call(n.k, t), !0;
			if (!n.P) {
				var i = z(p(n), r), o = null == i ? void 0 : i[Q];
				if (o && o.t === t) return n.o[r] = t, n.R[r] = !1, !0;
				if (c(t, i) && (void 0 !== t || u(n.t, r))) return !0;
				E(n), k(n);
			}
			return n.o[r] === t && (void 0 !== t || r in n.o) || Number.isNaN(t) && Number.isNaN(n.o[r]) || (n.o[r] = t, n.R[r] = !0), !0;
		},
		deleteProperty: function(n, r) {
			return void 0 !== z(n.t, r) || r in n.t ? (n.R[r] = !1, E(n), k(n)) : delete n.R[r], n.o && delete n.o[r], !0;
		},
		getOwnPropertyDescriptor: function(n, r) {
			var t = p(n), e = Reflect.getOwnPropertyDescriptor(t, r);
			return e ? {
				writable: !0,
				configurable: 1 !== n.i || "length" !== r,
				enumerable: e.enumerable,
				value: t[r]
			} : e;
		},
		defineProperty: function() {
			n(11);
		},
		getPrototypeOf: function(n) {
			return Object.getPrototypeOf(n.t);
		},
		setPrototypeOf: function() {
			n(12);
		}
	}, on = {};
	i(en, (function(n, r) {
		on[n] = function() {
			return arguments[0] = arguments[0][0], r.apply(this, arguments);
		};
	})), on.deleteProperty = function(r, t) {
		return on.set.call(this, r, t, void 0);
	}, on.set = function(r, t, e) {
		return en.set.call(this, r[0], t, e, r[0]);
	};
	un = function() {
		function e(r) {
			var e = this;
			this.O = B, this.D = !0, this.produce = function(r, i, o) {
				if ("function" == typeof r && "function" != typeof i) {
					var u = i;
					i = r;
					var a = e;
					return function(n) {
						var r = this;
						void 0 === n && (n = u);
						for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) e[o - 1] = arguments[o];
						return a.produce(n, (function(n) {
							var t;
							return (t = i).call.apply(t, [r, n].concat(e));
						}));
					};
				}
				var f;
				if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), t(r)) {
					var c = w(e), s = N(e, r, void 0), v = !0;
					try {
						f = i(s), v = !1;
					} finally {
						v ? g(c) : O(c);
					}
					return "undefined" != typeof Promise && f instanceof Promise ? f.then((function(n) {
						return j(c, o), P(n, c);
					}), (function(n) {
						throw g(c), n;
					})) : (j(c, o), P(f, c));
				}
				if (!r || "object" != typeof r) {
					if (void 0 === (f = i(r)) && (f = r), f === H && (f = void 0), e.D && d(f, !0), o) {
						var p = [], l = [];
						b("Patches").M(r, f, p, l), o(p, l);
					}
					return f;
				}
				n(21, r);
			}, this.produceWithPatches = function(n, r) {
				if ("function" == typeof n) return function(r) {
					for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) i[o - 1] = arguments[o];
					return e.produceWithPatches(r, (function(r) {
						return n.apply(void 0, [r].concat(i));
					}));
				};
				var t, i, o = e.produce(n, r, (function(n, r) {
					t = n, i = r;
				}));
				return "undefined" != typeof Promise && o instanceof Promise ? o.then((function(n) {
					return [
						n,
						t,
						i
					];
				})) : [
					o,
					t,
					i
				];
			}, "boolean" == typeof (null == r ? void 0 : r.useProxies) && this.setUseProxies(r.useProxies), "boolean" == typeof (null == r ? void 0 : r.autoFreeze) && this.setAutoFreeze(r.autoFreeze);
		}
		var i = e.prototype;
		return i.createDraft = function(e) {
			t(e) || n(8), r(e) && (e = R(e));
			var i = w(this), o = N(this, e, void 0);
			return o[Q].C = !0, O(i), o;
		}, i.finishDraft = function(r, t) {
			var i = (r && r[Q]).A;
			return j(i, t), P(void 0, i);
		}, i.setAutoFreeze = function(n) {
			this.D = n;
		}, i.setUseProxies = function(r) {
			r && !B && n(20), this.O = r;
		}, i.applyPatches = function(n, t) {
			var e;
			for (e = t.length - 1; e >= 0; e--) {
				var i = t[e];
				if (0 === i.path.length && "replace" === i.op) {
					n = i.value;
					break;
				}
			}
			e > -1 && (t = t.slice(e + 1));
			var o = b("Patches").$;
			return r(n) ? o(n, t) : this.produce(n, (function(n) {
				return o(n, t);
			}));
		}, e;
	}(), an = new un(), fn = an.produce, cn = an.produceWithPatches.bind(an), sn = an.setAutoFreeze.bind(an), an.setUseProxies.bind(an), pn = an.applyPatches.bind(an), an.createDraft.bind(an), an.finishDraft.bind(an);
}));
//#endregion
export { init_immer_esm as a, fn as i, T as n, pn as o, cn as r, sn as s, C as t };
