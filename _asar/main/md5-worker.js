const require_chunk = require("./chunk.js");
let node_fs = require("node:fs");
node_fs = require_chunk.__toESM(node_fs);
let node_crypto = require("node:crypto");
node_crypto = require_chunk.__toESM(node_crypto);
let node_worker_threads = require("node:worker_threads");
//#region src/main/daemon/md5-worker.ts
/**
* MD5 worker — 在后台线程里流式计算文件的 MD5。
*
* 为什么必须放到 worker：
* - 腾讯文档 V2 apply_upload 强制要求 hex 小写 MD5。
* - 大文件（几百 MB ~ GB）即使用 createReadStream 分块，`hash.update(chunk)`
*   仍然是同步 CPU 操作（Node crypto 在调用线程上执行）。1GB 分 1024 个 1MB chunk
*   持续 5~10 秒占用主进程 CPU，期间所有 IPC（renderer → main 的请求）都会被排队，
*   外观上就是「客户端整个卡住」。
* - 把这段 CPU 密集型工作搬到 worker_thread 之后，主进程事件循环完全空闲，
*   UI 交互、其他 IPC 不再受影响。
*
* 通信协议：
*   workerData: { filePath: string }
*   parentPort posts: { ok: true, md5: string } | { ok: false, error: string }
*/
var input = node_worker_threads.workerData;
if (!input?.filePath) node_worker_threads.parentPort?.postMessage({
	ok: false,
	error: "[md5-worker] filePath is required"
});
else {
	const hash = node_crypto.createHash("md5");
	const stream = node_fs.createReadStream(input.filePath, { highWaterMark: 1024 * 1024 });
	stream.on("data", (chunk) => hash.update(chunk));
	stream.on("error", (err) => {
		node_worker_threads.parentPort?.postMessage({
			ok: false,
			error: err?.message || String(err)
		});
	});
	stream.on("end", () => {
		node_worker_threads.parentPort?.postMessage({
			ok: true,
			md5: hash.digest("hex")
		});
	});
}
//#endregion
