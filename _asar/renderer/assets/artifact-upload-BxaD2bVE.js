import { r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/share-html-zip.ts
var LOCAL_DEP_ATTR_RE = /\b(?:src|href|poster)\s*=\s*(["'])(.*?)\1/gi;
var SRCSET_ATTR_RE = /\bsrcset\s*=\s*(["'])(.*?)\1/gi;
var CSS_URL_RE = /url\(\s*(["']?)(.*?)\1\s*\)/gi;
function getFileName(filePath) {
	return filePath.replace(/\\/g, "/").split("/").pop() || "index.html";
}
function getDirPath(filePath) {
	const separatorIndex = Math.max(filePath.lastIndexOf("/"), filePath.lastIndexOf("\\"));
	return separatorIndex >= 0 ? filePath.slice(0, separatorIndex) : "";
}
function getNameWithoutExt(fileName) {
	const extIndex = fileName.lastIndexOf(".");
	return extIndex > 0 ? fileName.slice(0, extIndex) : fileName;
}
function getHtmlZipFileName(filePath) {
	return `${getNameWithoutExt(getFileName(filePath)) || "artifact"}.zip`;
}
function stripUrlHashAndQuery(rawUrl) {
	const hashIndex = rawUrl.indexOf("#");
	const withoutHash = hashIndex >= 0 ? rawUrl.slice(0, hashIndex) : rawUrl;
	const queryIndex = withoutHash.indexOf("?");
	return queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
}
function isLocalDependencyUrl(rawUrl) {
	const url = rawUrl.trim();
	if (!url || url.startsWith("#") || url.startsWith("//")) return false;
	if (/^(?:https?:|data:|blob:|mailto:|tel:|javascript:)/i.test(url)) return false;
	if (/^(?:[a-zA-Z]:[\\/]|\/)/.test(url)) return false;
	return true;
}
function normalizeDependencyPath(rawUrl) {
	const stripped = stripUrlHashAndQuery(rawUrl.trim());
	if (!isLocalDependencyUrl(stripped)) return null;
	try {
		const decoded = decodeURIComponent(stripped).replace(/\\/g, "/").replace(/^\.\//, "");
		if (!decoded || decoded.startsWith("../") || decoded.includes("/../")) return null;
		return decoded;
	} catch {
		return stripped.replace(/\\/g, "/").replace(/^\.\//, "");
	}
}
function collectHtmlDependencyPaths(html) {
	const paths = /* @__PURE__ */ new Set();
	const collect = (url) => {
		const normalized = normalizeDependencyPath(url);
		if (normalized) paths.add(normalized);
	};
	for (const match of html.matchAll(LOCAL_DEP_ATTR_RE)) collect(match[2] || "");
	for (const match of html.matchAll(SRCSET_ATTR_RE)) for (const candidate of (match[2] || "").split(",")) collect(candidate.trim().split(/\s+/)[0] || "");
	for (const match of html.matchAll(CSS_URL_RE)) collect(match[2] || "");
	return [...paths];
}
function joinLocalPath(rootDir, relativePath) {
	if (!rootDir) return relativePath;
	const separator = rootDir.includes("\\") ? "\\" : "/";
	return `${rootDir.replace(/[\\/]$/, "")}${separator}${relativePath.replace(/[\\/]/g, separator)}`;
}
function makeCrc32Table() {
	const table = new Uint32Array(256);
	for (let i = 0; i < 256; i += 1) {
		let c = i;
		for (let j = 0; j < 8; j += 1) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
		table[i] = c >>> 0;
	}
	return table;
}
var CRC32_TABLE = makeCrc32Table();
function crc32(bytes) {
	let crc = 4294967295;
	for (const byte of bytes) crc = CRC32_TABLE[(crc ^ byte) & 255] ^ crc >>> 8;
	return (crc ^ 4294967295) >>> 0;
}
function writeUint16(view, offset, value) {
	view.setUint16(offset, value, true);
}
function writeUint32(view, offset, value) {
	view.setUint32(offset, value >>> 0, true);
}
function createHeader(length) {
	return new Uint8Array(new ArrayBuffer(length));
}
async function createZipBlob(entries) {
	const encoder = new TextEncoder();
	const chunks = [];
	const centralChunks = [];
	let offset = 0;
	for (const entry of entries) {
		const fileNameBytes = encoder.encode(entry.name.replace(/\\/g, "/"));
		const data = new Uint8Array(await entry.blob.arrayBuffer());
		const checksum = crc32(data);
		const localHeader = createHeader(30);
		const localView = new DataView(localHeader.buffer);
		writeUint32(localView, 0, 67324752);
		writeUint16(localView, 4, 20);
		writeUint16(localView, 6, 0);
		writeUint16(localView, 8, 0);
		writeUint16(localView, 10, 0);
		writeUint16(localView, 12, 0);
		writeUint32(localView, 14, checksum);
		writeUint32(localView, 18, data.length);
		writeUint32(localView, 22, data.length);
		writeUint16(localView, 26, fileNameBytes.length);
		writeUint16(localView, 28, 0);
		chunks.push(localHeader, fileNameBytes, data);
		const centralHeader = createHeader(46);
		const centralView = new DataView(centralHeader.buffer);
		writeUint32(centralView, 0, 33639248);
		writeUint16(centralView, 4, 20);
		writeUint16(centralView, 6, 20);
		writeUint16(centralView, 8, 0);
		writeUint16(centralView, 10, 0);
		writeUint16(centralView, 12, 0);
		writeUint16(centralView, 14, 0);
		writeUint32(centralView, 16, checksum);
		writeUint32(centralView, 20, data.length);
		writeUint32(centralView, 24, data.length);
		writeUint16(centralView, 28, fileNameBytes.length);
		writeUint16(centralView, 30, 0);
		writeUint16(centralView, 32, 0);
		writeUint16(centralView, 34, 0);
		writeUint16(centralView, 36, 0);
		writeUint32(centralView, 38, 0);
		writeUint32(centralView, 42, offset);
		centralChunks.push(centralHeader, fileNameBytes);
		offset += localHeader.length + fileNameBytes.length + data.length;
	}
	const centralSize = centralChunks.reduce((sum, chunk) => sum + chunk.length, 0);
	const endHeader = createHeader(22);
	const endView = new DataView(endHeader.buffer);
	writeUint32(endView, 0, 101010256);
	writeUint16(endView, 4, 0);
	writeUint16(endView, 6, 0);
	writeUint16(endView, 8, entries.length);
	writeUint16(endView, 10, entries.length);
	writeUint32(endView, 12, centralSize);
	writeUint32(endView, 16, offset);
	writeUint16(endView, 20, 0);
	return new Blob([
		...chunks,
		...centralChunks,
		endHeader
	], { type: "application/zip" });
}
async function buildHtmlDependencyZip(params) {
	const dependencyPaths = collectHtmlDependencyPaths(params.entryText);
	if (dependencyPaths.length === 0) return null;
	const rootDir = getDirPath(params.entryPath);
	const entries = [{
		name: params.entryName || getFileName(params.entryPath),
		blob: params.entryBlob
	}];
	for (const dependencyPath of dependencyPaths) {
		const dependencyBlob = await params.readBlob(joinLocalPath(rootDir, dependencyPath));
		if (dependencyBlob) entries.push({
			name: dependencyPath,
			blob: dependencyBlob
		});
	}
	if (entries.length === 1) return null;
	return {
		blob: await createZipBlob(entries),
		fileName: getHtmlZipFileName(params.entryPath),
		dependencyCount: entries.length - 1
	};
}
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/html-generator/artifact-upload.ts
var artifact_upload_exports = /* @__PURE__ */ __exportAll({ uploadArtifacts: () => uploadArtifacts });
/**
* 并行上传所有产物到知识空间，返回 path → { url, type } 映射。
* 单个产物上传失败时该 path 不出现在返回 Map 中，整体不 reject。
*/
async function uploadArtifacts(artifacts, backendProvider, knowledgeOptions) {
	const results = /* @__PURE__ */ new Map();
	if (!backendProvider.uploadToKnowledge) {
		console.warn("[uploadArtifacts] uploadToKnowledge not available, skip all artifacts");
		return results;
	}
	await Promise.all(artifacts.map(async (artifact) => {
		if (!artifact.blob) return;
		try {
			let uploadBlob = artifact.blob;
			let uploadName = artifact.name;
			if (artifact.name.toLowerCase().endsWith(".html") && artifact.readBlob) {
				const htmlText = await artifact.blob.text();
				const zipResult = await buildHtmlDependencyZip({
					entryPath: artifact.path,
					entryBlob: artifact.blob,
					entryText: htmlText,
					readBlob: artifact.readBlob,
					entryName: artifact.name
				});
				if (zipResult) {
					const stem = artifact.name.replace(/\.html?$/i, "");
					uploadBlob = zipResult.blob;
					uploadName = `${stem}.zip`;
				}
			}
			const res = await backendProvider.uploadToKnowledge(uploadBlob, uploadName, knowledgeOptions);
			if (res?.url) results.set(artifact.path, {
				url: res.url,
				type: "knowledge",
				nodeId: res.nodeId,
				nodeKind: res.nodeKind,
				size: artifact.blob?.size
			});
		} catch (err) {
			console.warn("[uploadArtifacts] failed to upload artifact:", artifact.name, err);
		}
	}));
	return results;
}
//#endregion
export { uploadArtifacts as n, buildHtmlDependencyZip as r, artifact_upload_exports as t };
