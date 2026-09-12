import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { nt as uploadCache, tt as init_upload_cache } from "./contexts-D7XKqa2J.js";
//#region ../../packages/agent-ui/src/utils/upload-utils.ts
/**
* 处理图片 / 文件附件 ContentBlock 的云端 URI
*
* 1. 等待异步上传完成（有超时保护）
* 2. 从缓存获取云端 URI 填入 block.uri
* 3. 失败时不阻塞，继续使用 base64 / 本地路径发送（云端可能仍然识别不了，但至少不卡住）
*
* 覆盖类型：
* - image：旧逻辑保留（写 block.uri，删 base64 data 节省带宽）
* - resource_link 文件附件（meta.cacheKey 存在）：写 block.uri，避免发出去的还是 file:// 本地路径
*
* @param contentBlocks - 待处理的内容块
* @param waitForUploads - 等待上传完成的函数
* @param options - 可选行为（如 requireUploadedUrl 严格模式）
* @returns requireUploadedUrl 模式下未拿到 URL 的图片文件名列表（非严格模式恒为空数组）
*/
async function processImageUrisFromCache(contentBlocks, waitForUploads, options) {
	const targetBlocks = contentBlocks.filter((block) => {
		if (block.type === "image") return true;
		if (block.type === "resource_link") return !!block._meta?.cacheKey;
		return false;
	});
	const blockSummary = targetBlocks.map((b) => ({
		type: b.type,
		filename: b._meta?.filename,
		cacheKey: b._meta?.cacheKey,
		hasUri: !!b.uri,
		hasData: !!b.data
	}));
	console.log("[processImageUrisFromCache] start, targetBlocks:", targetBlocks.length, blockSummary);
	if (targetBlocks.length === 0) return [];
	try {
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => reject(/* @__PURE__ */ new Error("Upload timeout")), 3e4);
		});
		await Promise.race([waitForUploads(), timeoutPromise]);
		console.log("[processImageUrisFromCache] waitForUploads done");
	} catch (error) {
		console.warn("[processImageUrisFromCache] Wait for uploads failed or timeout, continuing with available data:", error);
	}
	for (const block of targetBlocks) try {
		const meta = block._meta;
		if (block.type === "image") continue;
		const cacheKey = meta?.cacheKey;
		console.log("[processImageUrisFromCache] lookup cache for:", meta?.filename, "cacheKey:", cacheKey);
		if (cacheKey) {
			const cachedEntry = uploadCache.get(cacheKey);
			if (cachedEntry?.url) {
				console.log("[processImageUrisFromCache] cache hit, uri:", cachedEntry.url.slice(0, 60), "filename:", meta?.filename);
				block.uri = cachedEntry.url;
				if (meta && typeof meta === "object") delete meta.data;
			} else console.warn("[processImageUrisFromCache] No cached url for:", meta?.filename, "- will use base64/local path");
		} else console.warn("[processImageUrisFromCache] no cacheKey and no http uri, block will be sent as-is:", meta?.filename);
	} catch (error) {
		console.warn("[processImageUrisFromCache] Failed to get uri for block:", error);
	}
	const unresolvedImageNames = [];
	if (options?.requireUploadedUrl) for (const block of targetBlocks) {
		if (block.type !== "image") continue;
		const uri = block.uri;
		if (!(!!uri && uri.startsWith("http"))) {
			const meta = block._meta;
			const filename = meta?.filename ?? block.uri ?? "image";
			console.warn("[processImageUrisFromCache] strict mode: image has no uploaded url, dropping base64 and marking failed:", filename);
			delete block.data;
			if (meta && typeof meta === "object") {
				delete meta.data;
				meta.blockStatus = "failed";
				meta.blockError = "IMAGE_UPLOAD_INCOMPLETE";
			}
			unresolvedImageNames.push(String(filename));
		}
	}
	return unresolvedImageNames;
}
var init_upload_utils = __esmMin((() => {
	init_upload_cache();
}));
//#endregion
export { processImageUrisFromCache as n, init_upload_utils as t };
