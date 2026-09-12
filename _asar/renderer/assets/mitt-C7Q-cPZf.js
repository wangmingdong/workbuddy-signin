import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/mitt/dist/mitt.mjs
function mitt_default(n) {
	return {
		all: n = n || /* @__PURE__ */ new Map(),
		on: function(t, e) {
			var i = n.get(t);
			i ? i.push(e) : n.set(t, [e]);
		},
		off: function(t, e) {
			var i = n.get(t);
			i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
		},
		emit: function(t, e) {
			var i = n.get(t);
			i && i.slice().map(function(n) {
				n(e);
			}), (i = n.get("*")) && i.slice().map(function(n) {
				n(t, e);
			});
		}
	};
}
var init_mitt = __esmMin((() => {}));
//#endregion
export { mitt_default as n, init_mitt as t };
