import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/context-viewer-components/src/utils/artifact-drag.ts
function normalizeSeparators(filePath) {
	return filePath.replace(/\\/g, "/");
}
function decodePathSegments(raw) {
	if (!/%[0-9A-Fa-f]{2}/.test(raw)) return raw;
	return raw.split("/").map((segment) => {
		if (!/%[0-9A-Fa-f]{2}/.test(segment)) return segment;
		try {
			return decodeURIComponent(segment);
		} catch {
			return segment;
		}
	}).join("/");
}
/** 将 file:// URI 解析为本地绝对路径，供 Electron 原生拖拽使用。 */
function fileUriToLocalDragPath(uri) {
	if (!uri.startsWith("file://")) try {
		return decodeURIComponent(uri);
	} catch {
		return uri;
	}
	let pathname = uri.slice(7);
	if (/^\/[a-zA-Z]:[\\/]/.test(pathname)) pathname = pathname.slice(1);
	try {
		return decodeURIComponent(pathname);
	} catch {
		return pathname;
	}
}
/** 提取 artifact 对应的原始文件路径或 URI。 */
function getArtifactDragRawPath(item) {
	if (item.type === "media-artifact") return item.url || void 0;
	return item.uri || item.id || void 0;
}
/** 生成写入 HTML5 dataTransfer 的路径，保持与聊天输入框内部拖拽协议一致。 */
function getArtifactDragTransferPath(item) {
	const rawPath = getArtifactDragRawPath(item);
	if (!rawPath) return;
	if (rawPath.startsWith("file://")) return fileUriToLocalDragPath(rawPath);
	const normalized = normalizeSeparators(rawPath);
	const agentMatch = normalized.match(/^agent:\/\/(?:\/workspace\/|files\/)(.+)$/);
	return decodePathSegments(agentMatch ? agentMatch[1] : normalized.replace(/^file:\/\//, ""));
}
function isLikelyAbsoluteLocalPath(filePath) {
	return Boolean(filePath && (filePath.startsWith("/") || filePath.startsWith("\\\\") || /^[a-zA-Z]:[\\/]/.test(filePath)));
}
/** 提取可交给 Electron 原生拖拽的本地绝对路径。 */
function getArtifactLocalDragFilePath(item) {
	const transferPath = getArtifactDragTransferPath(item);
	return isLikelyAbsoluteLocalPath(transferPath) ? transferPath : void 0;
}
function getArtifactDragFileName(item) {
	if (item.title) return item.title;
	const transferPath = getArtifactDragTransferPath(item);
	if (!transferPath) return;
	return transferPath.slice(Math.max(transferPath.lastIndexOf("/"), transferPath.lastIndexOf("\\")) + 1);
}
function getStartDragLocalFile() {
	if (typeof window === "undefined") return;
	return window.__workbuddyStartDragLocalFile;
}
function getDragElement(e) {
	return e.currentTarget instanceof HTMLElement ? e.currentTarget : void 0;
}
function getDragImageRect(e) {
	const element = getDragElement(e);
	if (!element) return;
	const rect = element.getBoundingClientRect();
	if (rect.width <= 0 || rect.height <= 0) return;
	return {
		x: rect.x,
		y: rect.y,
		width: rect.width,
		height: rect.height
	};
}
function applyHtmlDragImage(e) {
	const element = getDragElement(e);
	if (!element || !e.dataTransfer.setDragImage || typeof document === "undefined") return;
	const rect = element.getBoundingClientRect();
	const dragImage = element.cloneNode(true);
	dragImage.style.position = "fixed";
	dragImage.style.left = "-10000px";
	dragImage.style.top = "-10000px";
	dragImage.style.width = `${rect.width}px`;
	dragImage.style.height = `${rect.height}px`;
	dragImage.style.pointerEvents = "none";
	dragImage.style.transform = `scale(${DRAG_IMAGE_SCALE})`;
	dragImage.style.transformOrigin = "top left";
	document.body.appendChild(dragImage);
	e.dataTransfer.setDragImage(dragImage, Math.round((e.nativeEvent?.offsetX ?? 0) * DRAG_IMAGE_SCALE), Math.round((e.nativeEvent?.offsetY ?? element.offsetHeight / 2) * DRAG_IMAGE_SCALE));
	window.setTimeout(() => dragImage.remove(), 0);
}
function toDragArrayBuffer(bytes) {
	if (bytes instanceof Uint8Array) return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
	return bytes;
}
function encodeCachePart(value) {
	return encodeURIComponent(String(value ?? ""));
}
function buildDragContext(item) {
	return {
		rawPath: getArtifactDragRawPath(item),
		transferPath: getArtifactDragTransferPath(item),
		fileName: getArtifactDragFileName(item) || "artifact"
	};
}
function getRemoteDragCacheKeyFromContext(item, context) {
	if (!context.rawPath && !context.transferPath) return;
	return [
		"artifact-remote-drag-v2",
		item.sessionId,
		item.id,
		item.type,
		item.updatedAt ?? item.createdAt,
		context.rawPath,
		context.transferPath,
		context.fileName
	].map(encodeCachePart).join("|");
}
/** 生成远程 artifact 拖拽预热缓存 key；右键菜单必须携带同一 key 才能复用缓存。 */
function getArtifactRemoteDragCacheKey(item) {
	return getRemoteDragCacheKeyFromContext(item, buildDragContext(item));
}
function deleteRemoteDragEntry(entryKey) {
	remoteDragCache.delete(entryKey);
}
function pruneRemoteDragCache() {
	while (remoteDragCache.size > MAX_REMOTE_DRAG_CACHE_ENTRIES) {
		const firstKey = remoteDragCache.keys().next().value;
		if (!firstKey) return;
		deleteRemoteDragEntry(firstKey);
	}
}
function getPreparedRemoteDragFile(item) {
	const key = getArtifactRemoteDragCacheKey(item);
	return key ? remoteDragCache.get(key)?.resolved : void 0;
}
/** 右键菜单复用拖拽预热结果：必须由 DOM 携带完整上下文组合 key，禁止按单独 path 匹配。 */
async function getPreparedArtifactRemoteDragFile(params) {
	if (!params.cacheKey) return;
	const entry = remoteDragCache.get(params.cacheKey);
	if (entry?.resolved) return entry.resolved;
	if (entry?.promise) return await entry.promise;
}
/** 预热远程 artifact 文件内容，避免 dragstart 中异步下载导致原生拖拽手势丢失。 */
function prepareArtifactRemoteDragFile(item, resolveRemoteFile) {
	if (!resolveRemoteFile || getArtifactLocalDragFilePath(item)) return;
	const context = buildDragContext(item);
	const key = getRemoteDragCacheKeyFromContext(item, context);
	if (!key) return;
	const cached = remoteDragCache.get(key);
	if (cached?.resolved || cached?.promise) return;
	const entry = {};
	entry.promise = Promise.resolve(resolveRemoteFile(item, context)).then((resolved) => {
		if (resolved) entry.resolved = resolved;
		else deleteRemoteDragEntry(key);
		entry.promise = void 0;
		return resolved;
	}).catch(() => {
		deleteRemoteDragEntry(key);
	});
	remoteDragCache.set(key, entry);
	pruneRemoteDragCache();
}
function startPreparedRemoteFileDrag(startDesktopFileDrag, e, item, resolved) {
	const fileName = getArtifactDragFileName(item) || "artifact";
	startDesktopFileDrag({
		fileName: resolved.fileName || fileName,
		bytes: toDragArrayBuffer(resolved.bytes),
		mimeType: resolved.mimeType,
		cacheKey: resolved.cacheKey,
		dragImageRect: getDragImageRect(e)
	});
}
function applyFallbackDragData(e, item) {
	applyHtmlDragImage(e);
	const transferPath = getArtifactDragTransferPath(item);
	if (!transferPath) {
		e.preventDefault();
		return;
	}
	e.dataTransfer.setData("application/vnd.code.uri-list", transferPath);
	e.dataTransfer.effectAllowed = "copy";
}
/**
* 统一 artifact 拖拽行为：Desktop 走 Electron 原生文件拖拽，其他环境保留 HTML5 DnD。
*/
function handleArtifactDragStart(e, item, options) {
	const startDesktopFileDrag = getStartDragLocalFile();
	const localFilePath = getArtifactLocalDragFilePath(item);
	if (startDesktopFileDrag && localFilePath) {
		e.preventDefault();
		startDesktopFileDrag({
			filePath: localFilePath,
			fileName: getArtifactDragFileName(item),
			dragImageRect: getDragImageRect(e)
		});
		return;
	}
	if (startDesktopFileDrag && options?.resolveRemoteFile) {
		const preparedRemoteFile = getPreparedRemoteDragFile(item);
		if (preparedRemoteFile) {
			e.preventDefault();
			startPreparedRemoteFileDrag(startDesktopFileDrag, e, item, preparedRemoteFile);
			return;
		}
		prepareArtifactRemoteDragFile(item, options.resolveRemoteFile);
		applyFallbackDragData(e, item);
		return;
	}
	applyFallbackDragData(e, item);
}
var DRAG_IMAGE_SCALE, MAX_REMOTE_DRAG_CACHE_ENTRIES, remoteDragCache;
var init_artifact_drag = __esmMin((() => {
	DRAG_IMAGE_SCALE = .5;
	MAX_REMOTE_DRAG_CACHE_ENTRIES = 20;
	remoteDragCache = /* @__PURE__ */ new Map();
}));
//#endregion
export { prepareArtifactRemoteDragFile as a, init_artifact_drag as i, getPreparedArtifactRemoteDragFile as n, handleArtifactDragStart as r, getArtifactRemoteDragCacheKey as t };
