import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/context-viewer-components/src/utils/file-path.ts
/** 是否是 Windows 风格盘符路径（如 `C:\`、`d:/path`、`D:`）。 */
function hasWindowsDriveLetter(input) {
	return /^[a-zA-Z]:[\\/]?/.test(input);
}
/** 安全 decode：失败时返回原文，避免脏 URI 导致抛错。 */
function safeDecode(input) {
	try {
		return decodeURIComponent(input);
	} catch {
		return input;
	}
}
/** 保留 UNC 前导双斜杠，同时折叠其它重复分隔符。 */
function collapsePathSlashes(input) {
	const isUnc = input.startsWith("//");
	const collapsed = input.replace(/\/+/g, "/");
	return isUnc && !collapsed.startsWith("//") ? `/${collapsed}` : collapsed;
}
/** 归一化裸路径的分隔符、尾斜杠、Windows 盘符大小写。 */
function normalizeBareFilePath(input) {
	let filePath = safeDecode(input).replace(/\\/g, "/");
	filePath = collapsePathSlashes(filePath);
	if (filePath.length > 1 && filePath.endsWith("/")) filePath = filePath.replace(/\/+$/, "");
	if (/^\/[a-zA-Z]:[\\/]/.test(filePath)) filePath = filePath.slice(1);
	if (hasWindowsDriveLetter(filePath)) filePath = filePath[0].toUpperCase() + filePath.slice(1);
	return filePath;
}
/**
* 把 file:// URI 转为本地路径，并补齐 Windows `file:///C:/...` 的盘符前导斜杠差异。
*/
function fileUriToPath(uri) {
	if (!uri.startsWith("file:")) return uri;
	const decodedWithoutScheme = safeDecode(uri.replace(/^file:\/{0,3}/, ""));
	if (hasWindowsDriveLetter(decodedWithoutScheme) || /^\/[a-zA-Z]:[\\/]/.test(decodedWithoutScheme)) return normalizeBareFilePath(decodedWithoutScheme);
	const repaired = uri.replace(/^file:\/\/([a-zA-Z]:)/, "file:///$1");
	let pathname;
	try {
		const parsed = new URL(repaired);
		pathname = parsed.hostname && parsed.hostname !== "localhost" ? `//${parsed.hostname}${parsed.pathname}` : parsed.pathname;
	} catch {
		pathname = repaired.replace(/^file:\/{0,2}/, "");
	}
	return normalizeBareFilePath(pathname);
}
/**
* 将 file:// URI 或裸文件路径归一化为裸文件路径。
* - `file:///Users/foo/bar.xlsx` → `/Users/foo/bar.xlsx`
* - `file:///C:/Users/foo/bar.xlsx` → `C:/Users/foo/bar.xlsx`
* - `C:\Users\foo\bar.xlsx` → `C:/Users/foo/bar.xlsx`
* - percent-encoded 路径会解码（如 `%E4%B8%8A` → `上`）
*
* 用于 keep-alive pool 的 slotKey 计算和 React key，确保同一文件
* 无论入口传入裸路径还是 file URI 都生成相同 key。
*/
function normalizeFileUrl(url) {
	if (!url) return "";
	if (url.startsWith("file:")) return fileUriToPath(url);
	if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) return safeDecode(url);
	return normalizeBareFilePath(url);
}
/**
* 从文件路径中提取文件名（跨平台兼容）
* 同时处理 Unix 风格的 `/` 和 Windows 风格的 `\` 路径分隔符。
*
* 如果路径是 percent-encoded（例如 `file://` URL 中的中文被编码成 `%E7%BE%8E...`），
* 会对提取出的文件名做一次解码，保证展示层得到可读的中文/非 ASCII 字符。
* 解码失败时回退到原始字符串。
*/
function getFileNameFromPath(filePath, fallback = "") {
	const lastSegment = normalizeFileUrl(filePath).split("/").pop() || fallback;
	if (!lastSegment) return lastSegment;
	if (!/%[0-9A-Fa-f]{2}/.test(lastSegment)) return lastSegment;
	try {
		return decodeURIComponent(lastSegment);
	} catch {
		return lastSegment;
	}
}
var init_file_path = __esmMin((() => {}));
//#endregion
export { init_file_path as n, normalizeFileUrl as r, getFileNameFromPath as t };
