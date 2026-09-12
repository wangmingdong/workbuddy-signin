import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { a as init_chunk_SRAX5OIU } from "./chunk-SRAX5OIU-BVXI1KDg.js";
import { a as init_chunk_EIO257PC, n as CB, r as NQ } from "./chunk-EIO257PC-Dep-Zt0A.js";
//#region ../../node_modules/@excalidraw/excalidraw/dist/prod/subset-worker.chunk.js
var s;
//#endregion
__esmMin((() => {
	init_chunk_EIO257PC();
	init_chunk_SRAX5OIU();
	s = import.meta.url ? new URL(import.meta.url) : void 0;
	typeof window > "u" && typeof self < "u" && (self.onmessage = async (e) => {
		switch (e.data.command) {
			case CB.Subset:
				let a = await NQ(e.data.arrayBuffer, e.data.codePoints);
				self.postMessage(a, { transfer: [a] });
				break;
		}
	});
}))();
export { s as WorkerUrl };
