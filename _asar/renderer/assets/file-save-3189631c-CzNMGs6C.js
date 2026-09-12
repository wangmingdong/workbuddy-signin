import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../node_modules/browser-fs-access/dist/file-save-3189631c.js
var e;
//#endregion
__esmMin((() => {
	e = async (e, t = {}) => {
		Array.isArray(t) && (t = t[0]);
		const n = document.createElement("a");
		let a = e;
		"body" in e && (a = await async function(e, t) {
			const n = e.getReader(), a = new ReadableStream({ start: (e) => async function t() {
				return n.read().then(({ done: n, value: a }) => {
					if (!n) return e.enqueue(a), t();
					e.close();
				});
			}() }), c = await new Response(a).blob();
			return n.releaseLock(), new Blob([c], { type: t });
		}(e.body, e.headers.get("content-type"))), n.download = t.fileName || "Untitled", n.href = URL.createObjectURL(await a);
		const r = () => {
			"function" == typeof c && c();
		}, c = t.legacySetup && t.legacySetup(r, () => c(reject), n);
		return n.addEventListener("click", () => {
			setTimeout(() => URL.revokeObjectURL(n.href), 3e4), r();
		}), n.click(), null;
	};
}))();
export { e as default };
