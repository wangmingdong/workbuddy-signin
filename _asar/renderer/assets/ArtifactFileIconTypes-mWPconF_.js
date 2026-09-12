import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ArtifactFileIconTypes.ts
function getFileExtension(fileName) {
	if (typeof fileName !== "string") return "";
	const normalized = fileName.split(/[?#]/)[0]?.trim().toLowerCase() ?? "";
	const lastSegment = normalized.split(/[\\/]/).pop() ?? normalized;
	const dotIndex = lastSegment.lastIndexOf(".");
	return dotIndex >= 0 ? lastSegment.slice(dotIndex + 1) : "";
}
/**
* 根据文件名/路径推断图标 kind。
*
* 注：folder 不在这里推断（文件夹没有扩展名），需要调用方显式传入 `kind="folder"`。
*/
function getArtifactFileIconKind(fileName) {
	const ext = getFileExtension(fileName);
	if (ext === "pdf") return "pdf";
	if (ext === "doc" || ext === "docx") return "word";
	if (ext === "ppt" || ext === "pptx") return "presentation";
	if (ext === "xls" || ext === "xlsx" || ext === "csv") return "spreadsheet";
	if (ext === "md" || ext === "markdown") return "markdown";
	if (ext === "drawio" || ext === "dio") return "drawio";
	if (IMAGE_EXTS.has(ext)) return "image";
	if (VIDEO_EXTS.has(ext)) return "video";
	if (AUDIO_EXTS.has(ext)) return "audio";
	if (ext === "html" || ext === "htm" || CODE_EXTS.has(ext)) return "code";
	return "default";
}
var IMAGE_EXTS, VIDEO_EXTS, AUDIO_EXTS, CODE_EXTS;
var init_ArtifactFileIconTypes = __esmMin((() => {
	IMAGE_EXTS = new Set([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg",
		"bmp",
		"ico",
		"tiff",
		"tif",
		"avif",
		"heic"
	]);
	VIDEO_EXTS = new Set([
		"mp4",
		"mov",
		"avi",
		"mkv",
		"webm",
		"m4v",
		"flv",
		"wmv"
	]);
	AUDIO_EXTS = new Set([
		"mp3",
		"wav",
		"flac",
		"ogg",
		"m4a",
		"aac",
		"wma",
		"opus"
	]);
	CODE_EXTS = new Set([
		"ts",
		"tsx",
		"js",
		"jsx",
		"mjs",
		"cjs",
		"py",
		"rb",
		"go",
		"rs",
		"java",
		"kt",
		"swift",
		"c",
		"cc",
		"cpp",
		"cxx",
		"h",
		"hh",
		"hpp",
		"cs",
		"php",
		"lua",
		"pl",
		"sh",
		"bash",
		"zsh",
		"fish",
		"ps1",
		"css",
		"scss",
		"sass",
		"less",
		"styl",
		"json",
		"json5",
		"yaml",
		"yml",
		"toml",
		"ini",
		"xml",
		"env",
		"sql",
		"graphql",
		"gql",
		"proto",
		"vue",
		"svelte",
		"astro",
		"r",
		"m",
		"scala",
		"dart",
		"ex",
		"exs",
		"erl"
	]);
}));
//#endregion
export { init_ArtifactFileIconTypes as n, getArtifactFileIconKind as t };
