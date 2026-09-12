import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as init_file_path, t as getFileNameFromPath } from "./file-path-usr-Mg_y.js";
import { n as init_chromium_playable_exts, r as isChromiumPlayable } from "./chromium-playable-exts-D5cis3gE.js";
//#region ../../packages/context-viewer-components/src/media-preview/utils/detectActualContentType.ts
/**
* 根据二进制数据的前几个字节（魔数）判断文件的真实类型。
*
* 当扩展名声称的类型与魔数不一致时，魔数更可靠。
* 例如一个 `.xls` 如果头部不是 OLE2 (D0CF11E0) 也不是 ZIP (504B0304)，
* 说明它不是真正的 Excel 文件。
*
* @param buffer 文件的前 8+ 字节
* @returns 根据魔数推断的 contentType，如果无法确定返回 undefined
*/
function detectContentTypeFromMagicBytes(buffer) {
	if (!buffer || buffer.length < 4) return;
	if (buffer[0] === 37 && buffer[1] === 80 && buffer[2] === 68 && buffer[3] === 70) return "document";
	if (buffer[0] === 137 && buffer[1] === 80 && buffer[2] === 78 && buffer[3] === 71) return "snapshot";
	if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return "snapshot";
	if (buffer[0] === 71 && buffer[1] === 73 && buffer[2] === 70 && buffer[3] === 56) return "snapshot";
	if (buffer.length >= 12 && buffer[0] === 82 && buffer[1] === 73 && buffer[2] === 70 && buffer[3] === 70 && buffer[8] === 87 && buffer[9] === 69 && buffer[10] === 66 && buffer[11] === 80) return "snapshot";
	if (buffer[0] === 80 && buffer[1] === 75 && buffer[2] === 3 && buffer[3] === 4) return;
	if (buffer[0] === 208 && buffer[1] === 207 && buffer[2] === 17 && buffer[3] === 224) return;
}
function isProbablyTextBytes(bytes) {
	if (bytes.length === 0) return false;
	let nonPrintableCount = 0;
	for (const byte of bytes) {
		if (byte === 0) return false;
		if (byte < 32 && byte !== 9 && byte !== 10 && byte !== 13) nonPrintableCount += 1;
	}
	return nonPrintableCount / bytes.length <= .3;
}
/**
* 检测一个 blob 文件是否是纯文本内容（而非其声称的二进制格式）。
*
* 很多系统导出"假"的 Office 文件，实际上是 HTML/CSV/XML 等纯文本。
* 此函数读取 blob 的前几个字节，判断是否为文本内容。
*
* @returns 如果是纯文本，返回嗅探结果（包含修正后的 contentType）；否则返回 undefined。
*/
async function sniffBlobForTextContent(file, declaredType) {
	if (![
		"snapshot",
		"video",
		"audio",
		"spreadsheet",
		"presentation",
		"document"
	].includes(declaredType)) return;
	try {
		const headerBuffer = await file.slice(0, 32).arrayBuffer();
		const header = new Uint8Array(headerBuffer);
		const magicType = detectContentTypeFromMagicBytes(header);
		if (magicType !== void 0) {
			if (magicType !== declaredType) return { actualType: magicType };
			return;
		}
		const isOLE2 = header[0] === 208 && header[1] === 207 && header[2] === 17 && header[3] === 224;
		const isZIP = header[0] === 80 && header[1] === 75 && header[2] === 3 && header[3] === 4;
		if (isOLE2 || isZIP) return;
		const textBuffer = await file.slice(0, 2048).arrayBuffer();
		const textBytes = new Uint8Array(textBuffer);
		if (!isProbablyTextBytes(textBytes)) return;
		return detectActualContentType(new TextDecoder("utf-8", { fatal: false }).decode(textBytes), declaredType);
	} catch {
		return;
	}
}
/**
* 根据实际文本内容检测真实的 contentType。
*
* 某些文件可能被错误地保存为不同的扩展名（如 HTML 保存为 .xls）。
* 本函数通过检查实际内容来发现这类"穿错马甲"的文件，
* 并返回修正后的 contentType、MIME 和虚拟扩展名。
*
* @param content 文件的文本内容（前 2048 字符即可）
* @param declaredType 根据扩展名声称的 contentType
* @returns 嗅探结果，如果不需要修正返回 undefined
*/
function detectActualContentType(content, declaredType) {
	if (!content) return;
	const trimmed = content.trimStart();
	const lower = trimmed.slice(0, 512).toLowerCase();
	if (declaredType === "code") return;
	if (lower.includes("<?mso-application") || lower.includes("schemas.microsoft.com/office") || lower.includes("urn:schemas-microsoft-com:office")) return;
	if ([
		"<!doctype html",
		"<html",
		"<head",
		"<body",
		"<table"
	].some((marker) => lower.includes(marker))) return {
		actualType: "code",
		actualMime: "text/html",
		actualExtension: "html"
	};
	if (lower.startsWith("<svg") || lower.includes("<svg")) return declaredType !== "snapshot" ? {
		actualType: "snapshot",
		actualMime: "image/svg+xml",
		actualExtension: "svg"
	} : void 0;
	if (lower.startsWith("<?xml ")) return {
		actualType: "code",
		actualMime: "application/xml",
		actualExtension: "xml"
	};
	if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && trimmed.length > 2) return {
		actualType: "code",
		actualMime: "application/json",
		actualExtension: "json"
	};
}
var init_detectActualContentType = __esmMin((() => {}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/utils/fileTypeDetector.ts
/**
* 仅对 URL/URI 去掉 search/hash；裸本地路径中的 `?` / `#` 是合法文件名字符，必须保留。
*/
function stripUrlSearchAndHash(filePath) {
	if (!URL_LIKE_PATH_PATTERN.test(filePath)) return filePath;
	const hashIndex = filePath.indexOf("#");
	const withoutHash = hashIndex === -1 ? filePath : filePath.substring(0, hashIndex);
	const searchIndex = withoutHash.indexOf("?");
	return searchIndex === -1 ? withoutHash : withoutHash.substring(0, searchIndex);
}
/**
* 检测文件类型
*
* | 分类 | 文件类型 | 说明 |
* |------|----------|------|
* | snapshot | `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.ico` | 图片文件 |
* | video | `.mp4`, `.webm`, `.mov` | 视频文件 |
* | document | `.pdf`, `.md`, `.txt` | 文档文件 |
* | presentation | `.pptx`, `.ppt` | 演示文件 |
* | spreadsheet | `.xlsx`, `.xls`, `.csv`, `.tsv` | 表格文件 |
* | diagram | `.drawio`, `.dio` | 架构图文件 |
*
* @param filePath - 文件路径或URL（可能包含search参数和hash）
* @returns 包含文件类型、扩展名和 MIME 类型的对象
*/
function fileTypeDetector(filePath) {
	if (!filePath) return {
		contentType: "document",
		extension: "",
		mimeContentType: "text/plain",
		isPreviewable: true
	};
	const extension = extractExtension(stripUrlSearchAndHash(filePath));
	return {
		contentType: FILE_TYPE_MAP[extension] || "document",
		extension,
		mimeContentType: MIME_TYPE_MAP[extension] || "text/plain",
		isPreviewable: isPreviewableExtension(extension)
	};
}
/**
* 从已剥离 query / hash 的路径中提取文件扩展名（小写、不含 `.`）。
*
* 路径分隔符兼容：
* - POSIX：`/Users/foo/bar.zip`
* - Windows：`C:\Users\foo\bar.zip`
* - 混合（Node/Electron 常见）：`C:/Users\foo/bar.zip`
* - URL：`file:///C:/path/bar.zip`、`agent://session/bar.zip`
*
* 不处理的边界情况（调用方责任 / 极罕见）：
* - 未 decode 的 URL 编码分隔符 `%2F` / `%5C` —— 由调用方在传入前 decode
* - POSIX 文件名中包含反斜杠（合法但罕见，最终 extension 解析结果仍正确）
*
* 边界处理：
* 1. 无 `.` 的文件（Dockerfile / Makefile / README）→ `''`
*    （`split('.').pop()` 会错误返回整段文件名，必须用 lastIndexOf 显式判断）
* 2. dotfile（.gitignore / .eslintrc / .npmrc / .env ...）：
*    最后一段以 `.` 开头且只有一个 `.`，整段是文件名而非扩展名。
*    优先尝试把"去掉前导 `.`"的名字当扩展名匹配（让 `.env` 仍走 'code' 高亮）；
*    匹配不到则视为无后缀文本（`.gitignore` / `.eslintrc` / `.npmrc` 走 PlainPreview）。
* 3. 带真正扩展名的 dotfile（`.eslintrc.json`）→ 按 `.json` 正常识别
*
* @param cleanPath 已剥离 ?search 和 #hash 的路径
* @returns 小写扩展名，或空字符串
*/
function extractExtension(cleanPath) {
	const lastSlashIndex = Math.max(cleanPath.lastIndexOf("/"), cleanPath.lastIndexOf("\\"));
	const filename = cleanPath.substring(lastSlashIndex + 1);
	const lastDotInFilename = filename.lastIndexOf(".");
	if (lastDotInFilename > 0) return filename.substring(lastDotInFilename + 1).toLowerCase();
	if (lastDotInFilename === 0 && filename.length > 1) {
		const candidate = filename.substring(1).toLowerCase();
		return candidate in FILE_TYPE_MAP ? candidate : "";
	}
	return "";
}
/**
* 判断文件后缀是否在可预览白名单内（cnb#55328）。
*
* 唯一数据源：`FILE_TYPE_MAP`。后缀在表内即可预览，否则展示占位。
*
* 判定规则：
* 1. 后缀缺失 / 空字符串 → **可预览**（Dockerfile / Makefile / LICENSE / README /
*    .gitignore / Procfile 等无后缀文件绝大多数是纯文本，与 VSCode 等主流编辑器
*    "无后缀默认文本"的处理一致；若极少数情况是二进制，会渲染为乱码但不会崩溃，
*    用户可主动下载，是可接受的边界行为）
* 2. 在 FILE_TYPE_MAP 中（snapshot/video/audio/document/presentation/spreadsheet/diagram/code）→ 可预览
* 3. 其他全部不可预览（zip / exe / bin / dmg / iso / tar / gz / 7z / dll / so ...）
*
* 注：新增可预览后缀时，请将其添加到 FILE_TYPE_MAP 并归类到合适的 contentType，
*     而不是单独再建一份白名单集合。
*
* @param extension 文件后缀（不含 `.`，大小写不敏感）
* @returns 是否允许进入具体预览组件；返回 false 时 UI 应展示占位文案。
*/
function isPreviewableExtension(extension) {
	if (!extension) return true;
	return extension.toLowerCase() in FILE_TYPE_MAP;
}
var FILE_TYPE_MAP, MIME_TYPE_MAP, URL_LIKE_PATH_PATTERN;
var init_fileTypeDetector = __esmMin((() => {
	FILE_TYPE_MAP = {
		"png": "snapshot",
		"jpg": "snapshot",
		"jpeg": "snapshot",
		"gif": "snapshot",
		"svg": "snapshot",
		"webp": "snapshot",
		"bmp": "snapshot",
		"ico": "snapshot",
		"avif": "snapshot",
		"mp4": "video",
		"webm": "video",
		"mov": "video",
		"ogv": "video",
		"mkv": "video",
		"avi": "video",
		"wmv": "video",
		"3gp": "video",
		"3g2": "video",
		"flv": "video",
		"f4v": "video",
		"mts": "video",
		"m2ts": "video",
		"mxf": "video",
		"prores": "video",
		"nev": "video",
		"mpg": "video",
		"mpeg": "video",
		"m4v": "video",
		"vob": "video",
		"asf": "video",
		"rm": "video",
		"rmvb": "video",
		"mp3": "audio",
		"wav": "audio",
		"aac": "audio",
		"ogg": "audio",
		"flac": "audio",
		"m4a": "audio",
		"wma": "audio",
		"opus": "audio",
		"pdf": "document",
		"docx": "document",
		"doc": "document",
		"dot": "document",
		"dotx": "document",
		"docm": "document",
		"dotm": "document",
		"wps": "document",
		"wpt": "document",
		"md": "document",
		"markdown": "document",
		"txt": "document",
		"pptx": "presentation",
		"ppt": "presentation",
		"pptm": "presentation",
		"ppsx": "presentation",
		"ppsm": "presentation",
		"pps": "presentation",
		"potx": "presentation",
		"potm": "presentation",
		"pot": "presentation",
		"dpt": "presentation",
		"dps": "presentation",
		"xlsx": "spreadsheet",
		"xls": "spreadsheet",
		"xlt": "spreadsheet",
		"xltx": "spreadsheet",
		"xlsm": "spreadsheet",
		"xltm": "spreadsheet",
		"et": "spreadsheet",
		"ett": "spreadsheet",
		"csv": "spreadsheet",
		"tsv": "spreadsheet",
		"drawio": "diagram",
		"dio": "diagram",
		"excalidraw": "diagram",
		"js": "code",
		"mjs": "code",
		"cjs": "code",
		"ts": "code",
		"jsx": "code",
		"tsx": "code",
		"vue": "code",
		"css": "code",
		"scss": "code",
		"less": "code",
		"html": "code",
		"htm": "code",
		"py": "code",
		"java": "code",
		"go": "code",
		"php": "code",
		"rb": "code",
		"rs": "code",
		"cs": "code",
		"kt": "code",
		"c": "code",
		"cc": "code",
		"cpp": "code",
		"h": "code",
		"hpp": "code",
		"swift": "code",
		"dart": "code",
		"lua": "code",
		"r": "code",
		"json": "code",
		"jsonl": "code",
		"yaml": "code",
		"yml": "code",
		"xml": "code",
		"toml": "code",
		"ini": "code",
		"env": "code",
		"sh": "code",
		"bash": "code",
		"zsh": "code",
		"fish": "code",
		"bat": "code",
		"cmd": "code",
		"ps1": "code",
		"dockerfile": "code",
		"sql": "code",
		"log": "code"
	};
	MIME_TYPE_MAP = {
		"png": "image/png",
		"jpg": "image/jpeg",
		"jpeg": "image/jpeg",
		"gif": "image/gif",
		"svg": "image/svg+xml",
		"webp": "image/webp",
		"bmp": "image/bmp",
		"ico": "image/x-icon",
		"avif": "image/avif",
		"mp4": "video/mp4",
		"webm": "video/webm",
		"mov": "video/quicktime",
		"ogv": "video/ogg",
		"mkv": "video/x-matroska",
		"avi": "video/x-msvideo",
		"wmv": "video/x-ms-wmv",
		"3gp": "video/3gpp",
		"3g2": "video/3gpp2",
		"flv": "video/x-flv",
		"f4v": "video/x-f4v",
		"mts": "video/mp2t",
		"m2ts": "video/mp2t",
		"mxf": "application/mxf",
		"prores": "video/quicktime",
		"nev": "video/x-nev",
		"mpg": "video/mpeg",
		"mpeg": "video/mpeg",
		"m4v": "video/x-m4v",
		"vob": "video/dvd",
		"asf": "video/x-ms-asf",
		"rm": "application/vnd.rn-realmedia",
		"rmvb": "application/vnd.rn-realmedia-vbr",
		"mp3": "audio/mpeg",
		"wav": "audio/wav",
		"aac": "audio/aac",
		"ogg": "audio/ogg",
		"flac": "audio/flac",
		"m4a": "audio/mp4",
		"wma": "audio/x-ms-wma",
		"opus": "audio/opus",
		"pdf": "application/pdf",
		"md": "text/markdown",
		"markdown": "text/markdown",
		"txt": "text/plain",
		"docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"doc": "application/msword",
		"dot": "application/msword",
		"dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
		"docm": "application/vnd.ms-word.document.macroenabled.12",
		"dotm": "application/vnd.ms-word.template.macroenabled.12",
		"wps": "application/vnd.ms-works",
		"wpt": "application/vnd.ms-works",
		"pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		"ppt": "application/vnd.ms-powerpoint",
		"pptm": "application/vnd.ms-powerpoint.presentation.macroenabled.12",
		"ppsx": "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
		"ppsm": "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
		"pps": "application/vnd.ms-powerpoint",
		"potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
		"potm": "application/vnd.ms-powerpoint.template.macroenabled.12",
		"pot": "application/vnd.ms-powerpoint",
		"dpt": "application/vnd.ms-powerpoint",
		"dps": "application/vnd.ms-powerpoint",
		"xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"xls": "application/vnd.ms-excel",
		"xlt": "application/vnd.ms-excel",
		"xltx": "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
		"xlsm": "application/vnd.ms-excel.sheet.macroenabled.12",
		"xltm": "application/vnd.ms-excel.template.macroenabled.12",
		"et": "application/vnd.ms-excel",
		"ett": "application/vnd.ms-excel",
		"csv": "text/csv",
		"tsv": "text/tab-separated-values",
		"drawio": "application/xml",
		"dio": "application/xml",
		"excalidraw": "application/vnd.excalidrawlib+json",
		"js": "text/javascript",
		"mjs": "text/javascript",
		"cjs": "text/javascript",
		"ts": "text/typescript",
		"jsx": "text/jsx",
		"tsx": "text/tsx",
		"vue": "text/x-vue",
		"css": "text/css",
		"scss": "text/x-scss",
		"less": "text/x-less",
		"html": "text/html",
		"htm": "text/html",
		"py": "text/x-python",
		"java": "text/x-java",
		"go": "text/x-go",
		"php": "text/x-php",
		"rb": "text/x-ruby",
		"rs": "text/x-rustsrc",
		"cs": "text/x-csharp",
		"kt": "text/x-kotlin",
		"c": "text/x-csrc",
		"cc": "text/x-c++src",
		"cpp": "text/x-c++src",
		"h": "text/x-chdr",
		"hpp": "text/x-c++hdr",
		"swift": "text/x-swift",
		"dart": "text/x-dart",
		"lua": "text/x-lua",
		"r": "text/x-rsrc",
		"json": "application/json",
		"jsonl": "application/x-ndjson",
		"yaml": "application/x-yaml",
		"zsh": "text/x-sh",
		"fish": "text/x-sh",
		"cmd": "text/plain",
		"dockerfile": "text/x-dockerfile"
	};
	URL_LIKE_PATH_PATTERN = /^(?:https?:|wss?:|file:|local-file:|agent:|blob:|data:)/i;
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/utils/getReadFileFormat.ts
/**
* 根据 contentType 和文件扩展名确定 readFile 的 format 参数
*
* 设计原则：
* - 已知的媒体文件类型（图片、视频、音频、表格）→ blob 格式（用专门的预览组件）
* - 其他所有文件 → text 格式（尝试以文本读取）
*
* 注意：判断文件是否为二进制应该在读取内容后进行，而不是在读取前。
* 这样可以避免枚举遗漏的问题。
*/
function getReadFileFormat(contentType, extension, _fileName) {
	if (MEDIA_CONTENT_TYPES.includes(contentType)) return "blob";
	if (MEDIA_EXTENSIONS.has(extension.toLowerCase())) return "blob";
	return "text";
}
/**
* 检测文本内容是否实际上是二进制文件
*
* VS Code 的做法：检查内容中是否包含 NULL 字节 (0x00)
* 如果包含 NULL 字节，则认为是二进制文件
*
* @param content - 文件内容（字符串）
* @param maxCheckLength - 最大检查长度，默认 512 字节（与 VS Code 一致）
* @returns true 如果内容看起来像二进制文件
*/
function seemsBinaryContent(content, maxCheckLength = 512) {
	if (!content) return false;
	const checkContent = content.slice(0, maxCheckLength);
	if (checkContent.includes("\0")) return true;
	let nonPrintableCount = 0;
	for (let i = 0; i < checkContent.length; i++) {
		const charCode = checkContent.charCodeAt(i);
		if (charCode < 32 && charCode !== 9 && charCode !== 10 && charCode !== 13) nonPrintableCount++;
	}
	if (nonPrintableCount / checkContent.length > .3) return true;
	return false;
}
var MEDIA_CONTENT_TYPES, MEDIA_EXTENSIONS;
var init_getReadFileFormat = __esmMin((() => {
	MEDIA_CONTENT_TYPES = [
		"snapshot",
		"video",
		"audio",
		"spreadsheet",
		"presentation"
	];
	MEDIA_EXTENSIONS = new Set([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp",
		"ico",
		"icns",
		"tiff",
		"tif",
		"psd",
		"raw",
		"heic",
		"heif",
		"avif",
		"svg",
		"mp4",
		"webm",
		"mov",
		"avi",
		"mkv",
		"flv",
		"wmv",
		"m4v",
		"3gp",
		"mpeg",
		"mpg",
		"ogv",
		"mp3",
		"wav",
		"aac",
		"ogg",
		"flac",
		"m4a",
		"wma",
		"aiff",
		"ape",
		"mid",
		"midi",
		"csv",
		"xls",
		"xlsx",
		"xlt",
		"xltx",
		"xlsm",
		"xltm",
		"tsv",
		"pdf",
		"doc",
		"docx",
		"dot",
		"dotx",
		"wps",
		"wpt",
		"docm",
		"dotm",
		"pptx",
		"ppt",
		"pps",
		"pot",
		"pptm",
		"ppsx",
		"ppsm",
		"potx",
		"potm"
	]);
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/utils/preview-size-limit.ts
/**
* 判断当前 artifact 是否需要触发"文件过大"占位。
*
* 设计取舍：
* 1. size 未知（undefined / null / 0 以下）时返回 false —— 老数据可能没有 size
*    字段，不阻断既有可预览路径，避免引入回归。这是已知的保守取舍：当 size
*    缺失时下游预览组件仍可能因超大文件卡死，待上游 ArtifactItem.size 完全
*    覆盖后此分支才能完全闭合（曾考虑用 SDK iframe onLoad 做第二层超时兜底，
*    但 onLoad 只代表 pc.html 壳页加载完，不等于文档真正就绪，方案不可靠
*    已弃用，详见 media-preview/index.tsx 的 SdkDocumentPreview 头注释）。
* 2. snapshot / video / audio / 未知 contentType 不参与 size guard：
*    - MediaPreviewContext（产物面板入口）走该函数，对它们豁免；
*    - FileTabs/FileViewer 因为视图入口性质不同（用户主动浏览全部文件、对单
*      文件预览失败容忍度更低），独立做了"按字节数一刀切、不分 contentType"
*      的早返回，这是有意为之的差异，详见 FileViewer.tsx 的 size guard 注释。
*/
function resolveOversized(options) {
	const limit = options.limit && options.limit > 0 ? options.limit : DEFAULT_PREVIEW_SIZE_LIMIT_BYTES;
	const contentType = options.contentType ?? "";
	if (!SIZE_GUARDED_CONTENT_TYPES.has(contentType)) return {
		isOversized: false,
		limit
	};
	const size = typeof options.size === "number" && options.size > 0 ? options.size : 0;
	if (size <= 0) return {
		isOversized: false,
		limit
	};
	return {
		isOversized: size >= limit,
		limit
	};
}
/**
* 把字节数格式化为人类可读字符串。仅在占位 UI 文案里使用，所以做了一份轻量
* 实现，避免把整个 cb-chat-ui 的 image-compress 模块拖进 context-viewer-components。
*/
function formatBytesHuman(bytes) {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB"
	];
	let value = bytes;
	let idx = 0;
	while (value >= 1024 && idx < units.length - 1) {
		value /= 1024;
		idx += 1;
	}
	return `${value >= 100 ? Math.round(value).toString() : value.toFixed(1)} ${units[idx]}`;
}
var DEFAULT_PREVIEW_SIZE_LIMIT_BYTES, SIZE_GUARDED_CONTENT_TYPES;
var init_preview_size_limit = __esmMin((() => {
	DEFAULT_PREVIEW_SIZE_LIMIT_BYTES = 10 * 1024 * 1024;
	SIZE_GUARDED_CONTENT_TYPES = new Set([
		"document",
		"spreadsheet",
		"presentation",
		"code",
		"diagram"
	]);
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/hooks/useArtifactReader.ts
/**
* 将 readFile('blob') 的返回值归一化为 Blob。
* 兼容实现层可能返回 Uint8Array / ArrayBuffer / string（损坏场景）的情况。
* 返回 null 表示无法转换（空值或不可识别的类型）。
*/
function normalizeToBlobOrNull(raw, mimeType) {
	if (!raw) return null;
	if (raw instanceof Blob) return raw;
	if (raw instanceof Uint8Array) return new Blob([raw], { type: mimeType });
	if (raw instanceof ArrayBuffer) return new Blob([new Uint8Array(raw)], { type: mimeType });
	if (typeof raw === "string") {
		console.error("[useArtifactReader] readFile(blob) returned a string instead of Blob — binary data was likely corrupted by text decoding");
		return null;
	}
	console.error(`[useArtifactReader] readFile(blob) returned unexpected type: ${Object.prototype.toString.call(raw)}`);
	return null;
}
function useArtifactReader(options) {
	const { uri, handleReadFile, updatedAt, extraReadAllowedDirs } = options;
	const readFileOptions = (0, import_react$1.useMemo)(() => extraReadAllowedDirs && extraReadAllowedDirs.length ? { allowedDirs: extraReadAllowedDirs } : void 0, [extraReadAllowedDirs]);
	const readFileRef = (0, import_react$1.useRef)(handleReadFile);
	(0, import_react$1.useEffect)(() => {
		readFileRef.current = handleReadFile;
	}, [handleReadFile]);
	const { mimeContentType, extension, contentType, isPreviewable: previewable } = (0, import_react$1.useMemo)(() => fileTypeDetector(uri), [uri]);
	const [content, setContent] = (0, import_react$1.useState)();
	const [file, setFile] = (0, import_react$1.useState)();
	const [downloadFile, setDownloadFile] = (0, import_react$1.useState)();
	const [stream, setStream] = (0, import_react$1.useState)();
	const [downloadStream, setDownloadStream] = (0, import_react$1.useState)();
	const [isLoading, setIsLoading] = (0, import_react$1.useState)(false);
	const [error, setError] = (0, import_react$1.useState)();
	const [sniffResult, setSniffResult] = (0, import_react$1.useState)();
	const [dataURI, setDataURI] = (0, import_react$1.useState)(uri);
	const loadedUrlRef = (0, import_react$1.useRef)(null);
	const isLoadingRef = (0, import_react$1.useRef)(false);
	const failedUrlRef = (0, import_react$1.useRef)(null);
	/**
	* 加载文件内容（带缓存机制）
	* 组件挂载时自动调用，支持所有类型的文件
	*/
	const loadArtifact = (0, import_react$1.useCallback)(async () => {
		if (!uri) {
			console.warn("No URL available for fetching content");
			return;
		}
		if (loadedUrlRef.current === uri) return;
		if (failedUrlRef.current === uri) {
			console.warn("Skipping previously failed URL:", uri);
			return;
		}
		if (isLoadingRef.current) return;
		if (!previewable) {
			setContent(void 0);
			setFile(void 0);
			setSniffResult(void 0);
			setDataURI(uri);
			loadedUrlRef.current = uri;
			const readFile = readFileRef.current;
			if (readFile) readFile(uri, "blob", readFileOptions).then((raw) => {
				if (loadedUrlRef.current !== uri) return;
				const blob = normalizeToBlobOrNull(raw, mimeContentType);
				if (blob) {
					const fileName = getFileNameFromPath(uri, "file");
					setDownloadFile(new File([blob], fileName, { type: blob.type || mimeContentType }));
				}
			}).catch((err) => {
				console.warn(`[useArtifactReader] download blob load failed for non-previewable .${extension}:`, err);
			});
			return;
		}
		if ((contentType === "video" || contentType === "audio") && !isChromiumPlayable(extension, contentType)) {
			console.log(`[ArtifactReader] unplayable ${contentType} .${extension}, skip preview fetch, try download blob`);
			setDataURI(uri);
			loadedUrlRef.current = uri;
			setFile(void 0);
			setContent(void 0);
			setSniffResult(void 0);
			const readFile = readFileRef.current;
			if (readFile) readFile(uri, "blob", readFileOptions).then((raw) => {
				const blob = normalizeToBlobOrNull(raw, mimeContentType);
				if (blob) {
					const fileName = getFileNameFromPath(uri, "file");
					setDownloadFile(new File([blob], fileName, { type: blob.type || mimeContentType }));
					console.log(`[ArtifactReader] download blob ready for unplayable ${contentType}: ${fileName}`);
				}
			}).catch((err) => {
				console.warn(`[ArtifactReader] download blob load failed for .${extension}:`, err);
			});
			return;
		}
		const isLocalProtocol = uri.startsWith("file://") || uri.startsWith("local-file://");
		if ((contentType === "video" || contentType === "audio") && isLocalProtocol) {
			const mediaUri = uri.startsWith("file://") ? uri.replace("file://", "local-file://") : uri;
			console.log(`[useArtifactReader] Fetching ${contentType} blob via protocol: ${mediaUri}`);
			isLoadingRef.current = true;
			setIsLoading(true);
			setError(void 0);
			try {
				const resp = await fetch(mediaUri);
				if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
				const blob = await resp.blob();
				const fileName = getFileNameFromPath(uri, "file");
				const fileObj = new File([blob], fileName, { type: blob.type || mimeContentType });
				console.log(`[useArtifactReader] ${contentType} loaded: ${fileObj.name}, ${fileObj.size} bytes`);
				setFile(fileObj);
				setContent(void 0);
				setSniffResult(void 0);
				setDataURI(uri);
				loadedUrlRef.current = uri;
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				console.warn(`[useArtifactReader] ${contentType} protocol fetch failed (${msg}), falling through to readFile`);
			} finally {
				isLoadingRef.current = false;
				setIsLoading(false);
			}
			if (loadedUrlRef.current === uri) return;
		}
		isLoadingRef.current = true;
		setIsLoading(true);
		setError(void 0);
		try {
			const readFile = readFileRef.current;
			if (readFile) {
				const format = getReadFileFormat(contentType, extension);
				try {
					switch (format) {
						case "stream": {
							const result = await readFile(uri, format, readFileOptions);
							if (result) try {
								const [previewStream, downloadStreamClone] = result.tee();
								setStream(previewStream);
								setDownloadStream(downloadStreamClone);
								setDataURI(uri);
								loadedUrlRef.current = uri;
							} catch (error) {
								const errorMsg = error instanceof Error ? error.message : String(error);
								console.error(`[useArtifactReader] Failed to clone stream for uri: ${uri}, error: ${errorMsg}`);
								setStream(result);
								setDataURI(uri);
								loadedUrlRef.current = uri;
							}
							else console.warn(`[useArtifactReader] readFile returned empty result for stream, uri: ${uri}`);
							break;
						}
						case "blob": {
							const result = normalizeToBlobOrNull(await readFile(uri, format, readFileOptions), mimeContentType);
							if (result) {
								const fileName = getFileNameFromPath(uri, "file");
								const fileObj = new File([result], fileName, { type: result.type || mimeContentType });
								const sniff = await sniffBlobForTextContent(fileObj, contentType);
								if (sniff?.actualType) {
									if (sniff.actualType === "code") {
										setContent(await fileObj.text());
										setFile(void 0);
									} else {
										setFile(fileObj);
										setContent(void 0);
									}
									setSniffResult(sniff);
								} else {
									setFile(fileObj);
									setContent(void 0);
									setSniffResult(void 0);
								}
								setDataURI(uri);
								loadedUrlRef.current = uri;
							} else console.warn(`[useArtifactReader] readFile returned empty result for blob, uri: ${uri}`);
							break;
						}
						case "text": {
							const result = await readFile(uri, format, readFileOptions);
							if (result != null) {
								setContent(result);
								setFile(void 0);
								setSniffResult(void 0);
								setDataURI(uri);
								loadedUrlRef.current = uri;
							} else console.warn(`[useArtifactReader] readFile returned empty result for text, uri: ${uri}`);
							break;
						}
					}
				} catch (readError) {
					const errorMsg = readError instanceof Error ? readError.message : String(readError);
					console.error(`[useArtifactReader] readFile failed for uri: ${uri}, format: ${format}, error: ${errorMsg}`);
					throw readError;
				}
			}
			if (loadedUrlRef.current) return;
			const format = getReadFileFormat(contentType, extension);
			const response = await fetch(uri, {
				mode: "cors",
				credentials: "include",
				headers: { "Accept": mimeContentType || "*/*" }
			});
			if (!response.ok) {
				const errorMsg = `Failed to fetch content: ${response.status} ${response.statusText}`;
				console.error(`[useArtifactReader] ${errorMsg}, uri: ${uri}`);
				throw new Error(errorMsg);
			}
			switch (format) {
				case "text":
					setContent(await response.text());
					setFile(void 0);
					setSniffResult(void 0);
					setDataURI(uri);
					loadedUrlRef.current = uri;
					break;
				case "blob": {
					const blob = await response.blob();
					const fileName = getFileNameFromPath(uri, "file");
					const fileObj = new File([blob], fileName, { type: blob.type || mimeContentType });
					const sniff = await sniffBlobForTextContent(fileObj, contentType);
					if (sniff?.actualType) {
						if (sniff.actualType === "code") {
							setContent(await fileObj.text());
							setFile(void 0);
						} else {
							setFile(fileObj);
							setContent(void 0);
						}
						setSniffResult(sniff);
					} else {
						setFile(fileObj);
						setContent(void 0);
						setSniffResult(void 0);
					}
					setDataURI(uri);
					loadedUrlRef.current = uri;
					break;
				}
				case "stream":
					if (response.body) try {
						const [previewStream, downloadStreamClone] = response.body.tee();
						setStream(previewStream);
						setDownloadStream(downloadStreamClone);
						setDataURI(uri);
						loadedUrlRef.current = uri;
					} catch (error) {
						const errorMsg = error instanceof Error ? error.message : String(error);
						console.error(`[useArtifactReader] Failed to clone fetch stream for uri: ${uri}, error: ${errorMsg}`);
						setStream(response.body);
						setDataURI(uri);
						loadedUrlRef.current = uri;
					}
					else console.warn(`[useArtifactReader] Fetch response has no body for stream, uri: ${uri}`);
					break;
			}
			return;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : String(err);
			const errorStack = err instanceof Error ? err.stack : void 0;
			console.error(`[useArtifactReader] Failed to load artifact for uri: ${uri}, error: ${errorMessage}`, errorStack ? `\nStack: ${errorStack}` : "");
			setError(errorMessage);
			failedUrlRef.current = uri;
			return;
		} finally {
			isLoadingRef.current = false;
			setIsLoading(false);
		}
	}, [
		uri,
		contentType,
		extension,
		mimeContentType,
		previewable,
		readFileOptions
	]);
	(0, import_react$1.useEffect)(() => {
		if (uri !== loadedUrlRef.current && uri !== failedUrlRef.current) {
			setContent(void 0);
			setFile(void 0);
			setDownloadFile(void 0);
			setStream(void 0);
			setDownloadStream(void 0);
			setError(void 0);
			setSniffResult(void 0);
			loadedUrlRef.current = null;
			failedUrlRef.current = null;
		}
		if (uri && !loadedUrlRef.current && !failedUrlRef.current) loadArtifact();
	}, [uri, loadArtifact]);
	const prevUpdatedAtRef = (0, import_react$1.useRef)(updatedAt);
	(0, import_react$1.useEffect)(() => {
		if (updatedAt === void 0) return;
		if (prevUpdatedAtRef.current === updatedAt) return;
		prevUpdatedAtRef.current = updatedAt;
		if (!loadedUrlRef.current) return;
		setContent(void 0);
		setFile(void 0);
		setDownloadFile(void 0);
		setStream(void 0);
		setDownloadStream(void 0);
		setError(void 0);
		setSniffResult(void 0);
		loadedUrlRef.current = null;
		failedUrlRef.current = null;
		loadArtifact();
	}, [
		updatedAt,
		uri,
		loadArtifact
	]);
	(0, import_react$1.useEffect)(() => {
		if (handleReadFile && failedUrlRef.current && failedUrlRef.current === uri) {
			failedUrlRef.current = null;
			setError(void 0);
			loadArtifact();
		}
	}, [
		handleReadFile,
		uri,
		loadArtifact
	]);
	return {
		mimeContentType: sniffResult?.actualMime ?? mimeContentType,
		artifactType: sniffResult?.actualType ?? contentType,
		extension: sniffResult?.actualExtension ?? extension,
		content,
		file,
		downloadFile,
		stream,
		downloadStream,
		isLoading,
		error,
		dataURI
	};
}
var import_react$1;
var init_useArtifactReader = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_file_path();
	init_chromium_playable_exts();
	init_detectActualContentType();
	init_fileTypeDetector();
	init_getReadFileFormat();
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/utils/safe-decode-uri.ts
/**
* 安全 URI 解码工具
*
* 用于 `MediaPreviewContext.tsx` 中比较 `dataURI` 与 `artifact.url` 是否一致。
*
* 背景（Issue #38883 v2）：
*   - `useArtifactReader` 拿到 `dataURI` 时是从外部传入的原始字符串（可能已编码），
*   - `artifact.url` 来自上层组件（也可能已编码或未编码）。
*   - 两侧只要有一处的 URI 编码大小写、空格表示形式（`%20` vs `+`）、
*     中文字符是否被 percent-encode 不一致，`===` 比较就会判为 mismatch，
*     `isDataValid` 误为 false，最终 ExcalidrawPreviewComponent 拿到 `content=undefined`，
*     `if (!content) return null` 直接白屏。
*
* 解决方案：比较前两侧都做 `decodeURIComponent` 归一化；解码失败时退回原值（不抛错），
* 这样合法 URI 能匹配，非法 URI 也不会破坏现有比较语义。
*/
/**
* 安全地对 URI 做 percent-decoding。
*
* - 输入合法的 URI（包含合法 percent-encoded 序列）→ 返回解码后的字符串
* - 输入非法（如裸的 `%`、单字节 percent 序列等）→ 捕获异常并返回原值
*
* 该函数只对入参做规范化，不做其他变换（不 trim、不大小写处理）。
*
* @param uri 任意字符串。`undefined`/`null` 返回原值（保留以便上层 `===` 比较时
*            对 undefined 仍然能 fall through）。
*/
function safeDecodeURI(uri) {
	if (uri === void 0) return;
	try {
		return decodeURIComponent(uri);
	} catch {
		return uri;
	}
}
var init_safe_decode_uri = __esmMin((() => {}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/MediaPreviewContext.tsx
var import_react, import_jsx_runtime, MediaPreviewContext, MediaPreviewContextProvider, useMediaPreview;
var init_MediaPreviewContext = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useArtifactReader();
	init_fileTypeDetector();
	init_preview_size_limit();
	init_safe_decode_uri();
	import_jsx_runtime = require_jsx_runtime();
	MediaPreviewContext = (0, import_react.createContext)({ theme: "auto" });
	MediaPreviewContextProvider = ({ children, environmentType, theme, artifact, readFile, previewSizeLimit, markdownConfig, subscribeFileChange, onSaveFile, onSendSelectionQuoteToChat, onInsertSelectionQuoteToInput }) => {
		const fileMeta = (0, import_react.useMemo)(() => fileTypeDetector(artifact.url), [artifact.url]);
		const oversized = (0, import_react.useMemo)(() => resolveOversized({
			contentType: artifact.contentType,
			size: artifact.size,
			limit: previewSizeLimit
		}), [
			artifact.contentType,
			artifact.size,
			previewSizeLimit
		]);
		const updatedAt = subscribeFileChange ? void 0 : artifact.updatedAt;
		const { content, file, downloadFile, stream, downloadStream, mimeContentType, artifactType, extension, isLoading, error, dataURI } = useArtifactReader({
			uri: oversized.isOversized ? void 0 : artifact.url,
			handleReadFile: readFile,
			updatedAt,
			extraReadAllowedDirs: artifact.extraReadAllowedDirs
		});
		const isDataValid = safeDecodeURI(dataURI) === safeDecodeURI(artifact.url);
		const correctedArtifact = isDataValid && artifactType !== artifact.contentType ? {
			...artifact,
			contentType: artifactType
		} : artifact;
		const effectiveExtension = isDataValid ? extension : oversized.isOversized ? fileMeta.extension : void 0;
		const value = {
			environmentType,
			theme,
			artifact: correctedArtifact,
			content: isDataValid ? content : void 0,
			file: isDataValid ? file : void 0,
			downloadFile: isDataValid ? downloadFile : void 0,
			stream: isDataValid ? stream : void 0,
			downloadStream: isDataValid ? downloadStream : void 0,
			mimeContentType: isDataValid ? mimeContentType : void 0,
			extension: effectiveExtension,
			isLoading: oversized.isOversized ? false : isLoading,
			error,
			isDataValid,
			isOversized: oversized.isOversized,
			oversizedLimit: oversized.isOversized ? oversized.limit : void 0,
			markdownConfig,
			subscribeFileChange,
			onSaveFile,
			readFile,
			onSendSelectionQuoteToChat,
			onInsertSelectionQuoteToInput
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPreviewContext.Provider, {
			value,
			children
		});
	};
	useMediaPreview = () => {
		const context = (0, import_react.useContext)(MediaPreviewContext);
		if (!context) throw new Error("useMediaPreview must be used within a MediaPreviewContextProvider");
		return context;
	};
}));
//#endregion
export { formatBytesHuman as a, init_getReadFileFormat as c, init_fileTypeDetector as d, isPreviewableExtension as f, DEFAULT_PREVIEW_SIZE_LIMIT_BYTES as i, seemsBinaryContent as l, sniffBlobForTextContent as m, init_MediaPreviewContext as n, init_preview_size_limit as o, init_detectActualContentType as p, useMediaPreview as r, getReadFileFormat as s, MediaPreviewContextProvider as t, fileTypeDetector as u };
