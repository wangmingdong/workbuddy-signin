import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/context-viewer-components/src/media-preview/utils/chromium-playable-exts.ts
/**
* 判断给定扩展名是否可在 Chromium 中播放
*/
function isChromiumPlayable(ext, contentType) {
	const lower = ext.toLowerCase();
	return contentType === "video" ? CHROMIUM_PLAYABLE_VIDEO_EXTS.has(lower) : CHROMIUM_PLAYABLE_AUDIO_EXTS.has(lower);
}
var CHROMIUM_PLAYABLE_VIDEO_EXTS, CHROMIUM_PLAYABLE_AUDIO_EXTS;
var init_chromium_playable_exts = __esmMin((() => {
	CHROMIUM_PLAYABLE_VIDEO_EXTS = new Set([
		"mp4",
		"webm",
		"ogv",
		"ogg",
		"m4v",
		"mov",
		"3gp"
	]);
	CHROMIUM_PLAYABLE_AUDIO_EXTS = new Set([
		"mp3",
		"wav",
		"aac",
		"ogg",
		"flac",
		"m4a",
		"opus",
		"wma"
	]);
}));
//#endregion
export { init_chromium_playable_exts as n, isChromiumPlayable as r, CHROMIUM_PLAYABLE_VIDEO_EXTS as t };
