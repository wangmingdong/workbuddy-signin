import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/format-bytes.ts
/**
* 把字节数格式化为可读的体积字符串。
*
* 用法：
*   formatBytes(0)              // "0 B"
*   formatBytes(512)            // "512 B"
*   formatBytes(1024)           // "1 KB"
*   formatBytes(5 * 1024 * 1024) // "5 MB"
*   formatBytes(1024 * 1024 * 1024) // "1 GB"
*
* 用 1024 进制（与文件系统 / Skill 包描述一致），保留至多 1 位小数；整数时不带小数点。
* 不依赖 Intl.NumberFormat，避免 i18n locale 差异（"5 MB" 在所有 locale 下都直观）。
*/
function formatBytes(bytes) {
	if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
	if (bytes < 1024) return `${Math.round(bytes)} B`;
	const units = [
		"KB",
		"MB",
		"GB",
		"TB"
	];
	let value = bytes / 1024;
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex += 1;
	}
	const rounded = Math.round(value * 10) / 10;
	return `${Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(1)} ${units[unitIndex]}`;
}
var init_format_bytes = __esmMin((() => {}));
//#endregion
export { init_format_bytes as n, formatBytes as t };
