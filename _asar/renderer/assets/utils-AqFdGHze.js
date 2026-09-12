import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { o as init_netdrive_service } from "./netdrive-service-B_rY4sKl.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/utils.ts
/** 简洁的文件大小格式化（与 shared/file-utils.ts 中的 formatSize 等价但保留独立导出） */
function formatFileSize(bytes) {
	if (!Number.isFinite(bytes) || bytes < 0) return "-";
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function inferFileTypeFromExt(extOrName, isFolder) {
	if (isFolder) return "folder";
	let ext = extOrName.toLowerCase();
	if (ext.includes(".")) {
		const dot = ext.lastIndexOf(".");
		ext = dot > 0 ? ext.slice(dot + 1) : "";
	}
	if ([
		"doc",
		"docx",
		"txt",
		"rtf"
	].includes(ext)) return "document";
	if ([
		"xls",
		"xlsx",
		"csv"
	].includes(ext)) return "spreadsheet";
	if ([
		"ppt",
		"pptx",
		"key"
	].includes(ext)) return "presentation";
	if (ext === "pdf") return "pdf";
	if ([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg",
		"bmp"
	].includes(ext)) return "image";
	if ([
		"mp4",
		"mov",
		"avi",
		"mkv",
		"webm"
	].includes(ext)) return "video";
	if ([
		"mp3",
		"wav",
		"flac",
		"aac",
		"m4a"
	].includes(ext)) return "audio";
	if (["md", "markdown"].includes(ext)) return "markdown";
	if (["html", "htm"].includes(ext)) return "website";
	if ([
		"ts",
		"tsx",
		"js",
		"jsx",
		"py",
		"go",
		"java",
		"c",
		"cpp",
		"h",
		"rs",
		"rb",
		"swift",
		"kt"
	].includes(ext)) return "code";
	return "other";
}
/**
* 将 @tencent/drive-sdk 的 DirEntry 映射为业务 FileItem。
*
* SDK DirEntry 字段：fileID, parentID, name, kind(1=file,2=folder), size, createTime, modifyTime, ext
* 注意：SDK 返回的 name 不含扩展名，ext 是独立字段。
* name 保持原始值，类型推断从 ext 字段获取。
*/
function mapDirEntryToFileItem(entry) {
	const isFolder = entry.kind === 2;
	const rawName = entry.name ?? "";
	const ext = entry.ext ?? "";
	const name = !isFolder && ext && !rawName.endsWith(`.${ext}`) ? `${rawName}.${ext}` : rawName;
	const extSource = ext || name;
	const modifyOpenId = entry.modifyOpenId || entry.modify_open_id || void 0;
	return {
		id: entry.fileID ?? "",
		name,
		type: inferFileTypeFromExt(extSource, isFolder),
		isFolder,
		size: entry.size ?? 0,
		updatedAt: entry.modifyTime ?? 0,
		createdAt: entry.createTime,
		parentId: entry.parentID,
		extension: ext,
		_authorId: modifyOpenId
	};
}
/**
* 校验文件/文件夹名称是否合法。
* 不允许包含 \ / : * ? " < > | 等特殊字符。
*
* @returns 如果名称合法返回 null，否则返回错误提示文案
*/
function validateFileName(name, t) {
	if (INVALID_FILENAME_CHARS.test(name)) return t("myFiles.error.invalidChars");
	return null;
}
var INVALID_FILENAME_CHARS;
var init_utils = __esmMin((() => {
	init_netdrive_service();
	INVALID_FILENAME_CHARS = /[\\/:*?"<>|]/;
}));
//#endregion
export { validateFileName as i, init_utils as n, mapDirEntryToFileItem as r, formatFileSize as t };
