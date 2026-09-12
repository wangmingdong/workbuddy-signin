import { a as __require, n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/@excalidraw/excalidraw/dist/prod/chunk-SRAX5OIU.js
var d, e, f, g, h, i;
var init_chunk_SRAX5OIU = __esmMin((() => {
	d = Object.defineProperty;
	e = (b, a, c) => a in b ? d(b, a, {
		enumerable: !0,
		configurable: !0,
		writable: !0,
		value: c
	}) : b[a] = c;
	f = ((b) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(b, { get: (a, c) => (typeof __require < "u" ? __require : a)[c] }) : b)(function(b) {
		if (typeof __require < "u") return __require.apply(this, arguments);
		throw Error("Dynamic require of \"" + b + "\" is not supported");
	}), g = (b) => (a) => {
		var c = b[a];
		if (c) return c();
		throw new Error("Module not found in bundle: " + a);
	};
	h = (b, a) => {
		for (var c in a) d(b, c, {
			get: a[c],
			enumerable: !0
		});
	};
	i = (b, a, c) => (e(b, typeof a != "symbol" ? a + "" : a, c), c);
}));
//#endregion
export { init_chunk_SRAX5OIU as a, i, g as n, h as r, f as t };
