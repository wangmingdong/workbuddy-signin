import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { A as WbFileSlideIcon, D as WbFileVideoIcon, F as WbFileHtmlIcon, I as WbFileFolderIcon, L as WbFileDocIcon, M as WbFilePdfIcon, N as WbFileMarkdownIcon, O as WbFileUnknownIcon, P as WbFileImageIcon, R as WbFileDiagramIcon, j as WbFileSheetIcon, k as WbFileTxtIcon, n as init_icons, z as WbFileAudioIcon } from "./icons-Cj3UopO9.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/file-icons.tsx
/** 文件夹图标 */
function getFolderIcon(size = 20) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbFileFolderIcon, { size });
}
/** 根据文件名返回彩色图标（按扩展名匹配） */
function getColorFileIcon(name, size = 20) {
	if (!name) return null;
	const dotIdx = name.lastIndexOf(".");
	if (dotIdx < 0) return null;
	const IconComp = EXT_ICON_MAP[name.slice(dotIdx + 1).toLowerCase()];
	if (!IconComp) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComp, { size });
}
/** 按文件类型返回图标（fallback） */
function getLucideFileIcon(type, size = 16) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TYPE_ICON_MAP[type] ?? WbFileUnknownIcon, { size });
}
/**
* 统一的文件图标获取函数 — 所有列表/弹窗都应使用此函数
*
* 优先级：
* 1. 文件夹 → 文件夹图标
* 2. 按文件名扩展名匹配图标
* 3. 按文件类型兜底
*
* @param fileName 完整文件名（含扩展名），如 "test.txt"
* @param size     图标尺寸（默认 20）
* @param fileType 文件类型字符串（MyFileType 或 FileItemType），用于兜底匹配
*/
function getFileIcon(fileName, size = 20, fileType) {
	if (fileType === "folder") return getFolderIcon(size);
	if (fileName) {
		const colorIcon = getColorFileIcon(fileName, size);
		if (colorIcon) return colorIcon;
	}
	if (fileType) return getLucideFileIcon(fileType, size);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbFileUnknownIcon, { size });
}
var import_jsx_runtime, EXT_ICON_MAP, TYPE_ICON_MAP, FileIconDefs;
var init_file_icons = __esmMin((() => {
	require_react();
	init_icons();
	import_jsx_runtime = require_jsx_runtime();
	EXT_ICON_MAP = {
		doc: WbFileDocIcon,
		docx: WbFileDocIcon,
		rtf: WbFileDocIcon,
		odt: WbFileDocIcon,
		pages: WbFileDocIcon,
		txt: WbFileTxtIcon,
		log: WbFileTxtIcon,
		ini: WbFileTxtIcon,
		cfg: WbFileTxtIcon,
		conf: WbFileTxtIcon,
		md: WbFileMarkdownIcon,
		markdown: WbFileMarkdownIcon,
		xls: WbFileSheetIcon,
		xlsx: WbFileSheetIcon,
		csv: WbFileSheetIcon,
		ods: WbFileSheetIcon,
		numbers: WbFileSheetIcon,
		tsv: WbFileSheetIcon,
		ppt: WbFileSlideIcon,
		pptx: WbFileSlideIcon,
		key: WbFileSlideIcon,
		odp: WbFileSlideIcon,
		pdf: WbFilePdfIcon,
		jpg: WbFileImageIcon,
		jpeg: WbFileImageIcon,
		png: WbFileImageIcon,
		gif: WbFileImageIcon,
		bmp: WbFileImageIcon,
		webp: WbFileImageIcon,
		svg: WbFileImageIcon,
		ico: WbFileImageIcon,
		tiff: WbFileImageIcon,
		tif: WbFileImageIcon,
		heic: WbFileImageIcon,
		heif: WbFileImageIcon,
		avif: WbFileImageIcon,
		mp4: WbFileVideoIcon,
		avi: WbFileVideoIcon,
		mov: WbFileVideoIcon,
		mkv: WbFileVideoIcon,
		wmv: WbFileVideoIcon,
		webm: WbFileVideoIcon,
		flv: WbFileVideoIcon,
		m4v: WbFileVideoIcon,
		"3gp": WbFileVideoIcon,
		mp3: WbFileAudioIcon,
		wav: WbFileAudioIcon,
		flac: WbFileAudioIcon,
		aac: WbFileAudioIcon,
		ogg: WbFileAudioIcon,
		wma: WbFileAudioIcon,
		opus: WbFileAudioIcon,
		m4a: WbFileAudioIcon,
		m4b: WbFileAudioIcon,
		html: WbFileHtmlIcon,
		htm: WbFileHtmlIcon,
		url: WbFileHtmlIcon,
		xmind: WbFileDiagramIcon,
		drawio: WbFileDiagramIcon,
		js: WbFileTxtIcon,
		ts: WbFileTxtIcon,
		jsx: WbFileTxtIcon,
		tsx: WbFileTxtIcon,
		py: WbFileTxtIcon,
		java: WbFileTxtIcon,
		c: WbFileTxtIcon,
		cpp: WbFileTxtIcon,
		h: WbFileTxtIcon,
		go: WbFileTxtIcon,
		rs: WbFileTxtIcon,
		rb: WbFileTxtIcon,
		php: WbFileTxtIcon,
		sh: WbFileTxtIcon,
		css: WbFileTxtIcon,
		scss: WbFileTxtIcon,
		less: WbFileTxtIcon,
		json: WbFileTxtIcon,
		xml: WbFileTxtIcon,
		yml: WbFileTxtIcon,
		yaml: WbFileTxtIcon,
		toml: WbFileTxtIcon,
		zip: WbFileUnknownIcon,
		rar: WbFileUnknownIcon,
		"7z": WbFileUnknownIcon,
		tar: WbFileUnknownIcon,
		gz: WbFileUnknownIcon,
		bz2: WbFileUnknownIcon
	};
	TYPE_ICON_MAP = {
		doc: WbFileDocIcon,
		sheet: WbFileSheetIcon,
		slide: WbFileSlideIcon,
		presentation: WbFileSlideIcon,
		pdf: WbFilePdfIcon,
		image: WbFileImageIcon,
		video: WbFileVideoIcon,
		audio: WbFileAudioIcon,
		website: WbFileHtmlIcon,
		code: WbFileTxtIcon,
		archive: WbFileUnknownIcon,
		document: WbFileDocIcon,
		spreadsheet: WbFileSheetIcon,
		markdown: WbFileMarkdownIcon,
		diagram: WbFileDiagramIcon,
		other: WbFileUnknownIcon
	};
	FileIconDefs = () => null;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/shared/file-utils.ts
function formatSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
	if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
	return `${(bytes / 1073741824).toFixed(1)} GB`;
}
function formatRelativeTime(ts) {
	const diff = Date.now() - ts;
	const hours = Math.floor(diff / 36e5);
	if (hours < 1) return t("myFiles.time.justNow");
	if (hours < 24) return t("myFiles.time.hoursAgo", { count: hours });
	const days = Math.floor(hours / 24);
	if (days === 1) return t("myFiles.time.yesterday");
	if (days < 7) return t("myFiles.time.daysAgo", { count: days });
	const d = new Date(ts);
	return t("myFiles.time.date", {
		month: d.getMonth() + 1,
		day: d.getDate()
	});
}
var init_file_utils = __esmMin((() => {
	init_i18n();
}));
//#endregion
export { getFileIcon as a, FileIconDefs as i, formatSize as n, init_file_icons as o, init_file_utils as r, formatRelativeTime as t };
