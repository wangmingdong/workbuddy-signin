import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/colleagues-panel/utils/attachment-preview.ts
function isHttpUrl(value) {
	return typeof value === "string" && HTTP_URL_RE.test(value.trim());
}
function isSafeUserAttachmentUrl(value) {
	if (!isHttpUrl(value)) return false;
	try {
		const url = new URL(value);
		return url.protocol === "https:" && !isBlockedAttachmentHost(url.hostname);
	} catch {
		return false;
	}
}
function resolveAttachmentTarget(block) {
	const meta = block._meta;
	return String(getBlockString(block, "uri") || meta?.filePath || meta?.filename || meta?.fileName || getBlockString(block, "name") || "").trim() || void 0;
}
function isUserAttachmentBlock(block) {
	const meta = block._meta;
	const mentionType = typeof meta?.mentionType === "string" ? meta.mentionType : void 0;
	const metaType = typeof meta?.type === "string" ? meta.type : void 0;
	const source = typeof meta?.source === "string" ? meta.source : void 0;
	if (mentionType && BLOCKED_MENTION_TYPES.has(mentionType) || metaType && BLOCKED_MENTION_TYPES.has(metaType)) return false;
	if (source === "user-attachment") return true;
	if (block.type !== "image" && block.type !== "resource_link") return false;
	return hasAttachmentMetadata(block, meta);
}
function isTrustedUserAttachmentUrl(block) {
	return isSafeUserAttachmentUrl(resolveAttachmentTarget(block)) && isUserAttachmentBlock(block);
}
function getUserAttachmentPreviewPayload(block) {
	const uri = resolveAttachmentTarget(block);
	if (!isSafeUserAttachmentUrl(uri) || !isUserAttachmentBlock(block)) return;
	const meta = block._meta;
	const title = String(getBlockString(block, "title") || getBlockString(block, "name") || meta?.filename || meta?.fileName || getFileNameFromUrl(uri) || "attachment");
	const mimeType = getBlockString(block, "mimeType");
	return {
		uri,
		title,
		mimeType,
		contentType: inferAttachmentContentType(uri, mimeType)
	};
}
function isColleagueUserAttachmentArtifact(artifact) {
	return artifact._meta?.source === COLLEAGUE_USER_ATTACHMENT_SOURCE;
}
function buildUserAttachmentArtifact(params) {
	const { payload, sessionId, scopeKey } = params;
	return {
		id: `user-attachment:${sessionId}:${hashString(payload.uri)}`,
		sessionId,
		title: payload.title,
		subtitle: payload.mimeType || payload.uri,
		type: "media-artifact",
		category: "media",
		contentType: payload.contentType,
		url: payload.uri,
		mimeType: payload.mimeType,
		_meta: {
			colleagueArtifactScopeKey: scopeKey,
			source: COLLEAGUE_USER_ATTACHMENT_SOURCE
		}
	};
}
async function readUserAttachmentUrl(url, format = "text") {
	if (!isSafeUserAttachmentUrl(url)) throw new Error("Attachment URL is not allowed");
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), ATTACHMENT_FETCH_TIMEOUT_MS);
	try {
		const response = await fetch(url, {
			credentials: "omit",
			redirect: "manual",
			signal: controller.signal
		});
		assertAllowedAttachmentResponse(response);
		if (format === "stream") {
			if (!response.body) throw new Error("Attachment response body is empty");
			return response.body;
		}
		const bytes = await readResponseBytesWithLimit(response);
		switch (format) {
			case "bytes": return bytes;
			case "blob": return new Blob([bytes], { type: response.headers.get("content-type") || void 0 });
			default: return new TextDecoder().decode(bytes);
		}
	} finally {
		clearTimeout(timer);
	}
}
function inferAttachmentContentType(uri, mimeType) {
	const normalizedMime = mimeType?.toLowerCase() ?? "";
	if (normalizedMime.startsWith("image/")) return "snapshot";
	if (normalizedMime.startsWith("video/")) return "video";
	if (normalizedMime.startsWith("audio/")) return "audio";
	if (normalizedMime.includes("spreadsheet") || normalizedMime.includes("excel") || normalizedMime.includes("csv")) return "spreadsheet";
	if (normalizedMime.includes("presentation") || normalizedMime.includes("powerpoint")) return "presentation";
	if (normalizedMime.includes("pdf") || normalizedMime.includes("word") || normalizedMime.startsWith("text/")) return "document";
	const extension = getExtension(uri);
	if ([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg",
		"bmp",
		"ico"
	].includes(extension)) return "snapshot";
	if ([
		"mp4",
		"webm",
		"mov",
		"avi",
		"mkv"
	].includes(extension)) return "video";
	if ([
		"mp3",
		"wav",
		"aac",
		"ogg",
		"flac",
		"m4a"
	].includes(extension)) return "audio";
	if ([
		"xlsx",
		"xls",
		"csv",
		"tsv"
	].includes(extension)) return "spreadsheet";
	if (["pptx", "ppt"].includes(extension)) return "presentation";
	if ([
		"pdf",
		"docx",
		"doc",
		"md",
		"txt"
	].includes(extension)) return "document";
	if ([
		"html",
		"htm",
		"json",
		"xml",
		"yaml",
		"yml",
		"js",
		"ts",
		"tsx",
		"jsx",
		"css",
		"less",
		"scss"
	].includes(extension)) return "code";
	return "document";
}
function assertAllowedAttachmentResponse(response) {
	if (response.type === "opaqueredirect" || response.status >= 300 && response.status < 400) throw new Error("Attachment redirect is not allowed");
	if (!response.ok) throw new Error(`Failed to load attachment: ${response.status} ${response.statusText}`);
	const contentLength = Number(response.headers.get("content-length") ?? 0);
	if (Number.isFinite(contentLength) && contentLength > MAX_USER_ATTACHMENT_PREVIEW_BYTES) throw new Error("Attachment content is too large");
}
async function readResponseBytesWithLimit(response) {
	if (!response.body) {
		const buffer = await response.arrayBuffer();
		if (buffer.byteLength > MAX_USER_ATTACHMENT_PREVIEW_BYTES) throw new Error("Attachment content is too large");
		return new Uint8Array(buffer);
	}
	const reader = response.body.getReader();
	const chunks = [];
	let total = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (!value) continue;
			total += value.byteLength;
			if (total > MAX_USER_ATTACHMENT_PREVIEW_BYTES) {
				await reader.cancel();
				throw new Error("Attachment content is too large");
			}
			chunks.push(value);
		}
	} finally {
		reader.releaseLock();
	}
	const result = new Uint8Array(total);
	let offset = 0;
	chunks.forEach((chunk) => {
		result.set(chunk, offset);
		offset += chunk.byteLength;
	});
	return result;
}
function hasAttachmentMetadata(block, meta) {
	return Boolean(meta?.cacheKey || meta?.filename || meta?.fileName || getBlockString(block, "mimeType"));
}
function getBlockString(block, key) {
	if (key in block) {
		const value = block[key];
		return typeof value === "string" ? value : void 0;
	}
}
function isBlockedAttachmentHost(hostname) {
	const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
	return host === "localhost" || host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80:") || /^127\./.test(host) || /^10\./.test(host) || /^11\./.test(host) || /^21\./.test(host) || /^30\./.test(host) || /^9\./.test(host) || /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host) || /^192\.168\./.test(host);
}
function getExtension(uri) {
	const fileName = getFileNameFromUrl(uri).toLowerCase();
	const dotIndex = fileName.lastIndexOf(".");
	return dotIndex >= 0 ? fileName.slice(dotIndex + 1) : "";
}
function getFileNameFromUrl(uri) {
	try {
		const rawName = new URL(uri).pathname.split("/").filter(Boolean).pop() || "";
		return decodeURIComponent(rawName);
	} catch {
		return uri.split(/[/?#]/).filter(Boolean).pop() || "";
	}
}
function hashString(value) {
	let hash = 0;
	for (let i = 0; i < value.length; i += 1) hash = (hash << 5) - hash + value.charCodeAt(i) | 0;
	return Math.abs(hash).toString(36);
}
var COLLEAGUE_USER_ATTACHMENT_SOURCE, HTTP_URL_RE, ATTACHMENT_FETCH_TIMEOUT_MS, MAX_USER_ATTACHMENT_PREVIEW_BYTES, BLOCKED_MENTION_TYPES;
var init_attachment_preview = __esmMin((() => {
	COLLEAGUE_USER_ATTACHMENT_SOURCE = "user-attachment";
	HTTP_URL_RE = /^https?:\/\//i;
	ATTACHMENT_FETCH_TIMEOUT_MS = 3e4;
	MAX_USER_ATTACHMENT_PREVIEW_BYTES = 50 * 1024 * 1024;
	BLOCKED_MENTION_TYPES = new Set([
		"colleague",
		"skill",
		"command",
		"ima",
		"tencent-doc",
		"tencent-lexiang"
	]);
}));
//#endregion
export { isColleagueUserAttachmentArtifact as a, readUserAttachmentUrl as c, init_attachment_preview as i, resolveAttachmentTarget as l, buildUserAttachmentArtifact as n, isSafeUserAttachmentUrl as o, getUserAttachmentPreviewPayload as r, isTrustedUserAttachmentUrl as s, COLLEAGUE_USER_ATTACHMENT_SOURCE as t };
