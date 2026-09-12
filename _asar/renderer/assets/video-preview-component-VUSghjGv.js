import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-EyL4WIXZ.js";
import { n as init_chromium_playable_exts, t as CHROMIUM_PLAYABLE_VIDEO_EXTS } from "./chromium-playable-exts-D5cis3gE.js";
import { n as media_module_default, t as init_media_module } from "./media.module-xXG5L1DD.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/video-preview/index.module.scss
var previewContainer, centeredFull, unsupportedHint, videoInstance, index_module_default;
var init_index_module = __esmMin((() => {
	previewContainer = "_previewContainer_16052_1";
	centeredFull = "_centeredFull_16052_10";
	unsupportedHint = "_unsupportedHint_16052_14";
	videoInstance = "_videoInstance_16052_22";
	index_module_default = {
		previewContainer,
		centeredFull,
		unsupportedHint,
		videoInstance
	};
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/video-preview/video-preview-component.tsx
/**
* 从文件名中提取扩展名（小写、无点号）
*/
function getExtFromFilename(filename) {
	if (!filename) return "";
	const dot = filename.lastIndexOf(".");
	return dot >= 0 ? filename.slice(dot + 1).toLowerCase() : "";
}
var import_classnames, import_react, import_jsx_runtime, VideoPreviewComponent;
var init_video_preview_component = __esmMin((() => {
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_media_module();
	init_chromium_playable_exts();
	init_index_module();
	import_jsx_runtime = require_jsx_runtime();
	VideoPreviewComponent = ({ className, file, filename, content, videoAttributes }) => {
		const t = useTranslation();
		const [videoUrl, setVideoUrl] = (0, import_react.useState)();
		const [hasError, setHasError] = (0, import_react.useState)(false);
		const [loadTimeout, setLoadTimeout] = (0, import_react.useState)(false);
		const videoRef = (0, import_react.useRef)(null);
		const timeoutRef = (0, import_react.useRef)(null);
		const ext = (0, import_react.useMemo)(() => getExtFromFilename(filename || file?.name), [filename, file]);
		const isPlayable = (0, import_react.useMemo)(() => CHROMIUM_PLAYABLE_VIDEO_EXTS.has(ext), [ext]);
		(0, import_react.useEffect)(() => {
			if (!isPlayable) return;
			if (!file && !content) return;
			setHasError(false);
			setLoadTimeout(false);
			let cleanup = () => {};
			if (file) {
				const url = URL.createObjectURL(file);
				console.log(`[VideoPreview] Using blob URL, file: ${file.name}, size: ${file.size} bytes`);
				setVideoUrl(url);
				cleanup = () => {
					URL.revokeObjectURL(url);
				};
			} else if (content) {
				console.log(`[VideoPreview] Using direct URI: ${content}`);
				setVideoUrl(content);
			}
			timeoutRef.current = setTimeout(() => {
				const video = videoRef.current;
				if (video && video.readyState < 1) {
					console.warn(`[VideoPreview] metadata load timeout for ${filename}, treating as unplayable`);
					setLoadTimeout(true);
					video.removeAttribute("src");
					video.load();
				}
			}, 15e3);
			return () => {
				cleanup();
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
			};
		}, [
			file,
			content,
			isPlayable,
			filename
		]);
		const handleLoadedMetadata = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
		const handleVideoError = () => {
			setHasError(true);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
		if (!isPlayable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: (0, import_classnames.default)(index_module_default.previewContainer, index_module_default.centeredFull, className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: index_module_default.unsupportedHint,
				children: t("mediaPreview.unsupportedVideoFormat", {
					name: filename || "",
					ext: ext.toUpperCase()
				})
			})
		});
		if (!file && !content) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: (0, import_classnames.default)(index_module_default.previewContainer, className),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: videoUrl,
				className: index_module_default.videoInstance,
				preload: "metadata",
				crossOrigin: "use-credentials",
				controls: true,
				controlsList: "nofullscreen",
				playsInline: true,
				loop: true,
				onLoadedMetadata: handleLoadedMetadata,
				onError: handleVideoError,
				...videoAttributes
			}), (hasError || loadTimeout) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: media_module_default.errorMessage,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loadTimeout ? t("mediaPreview.videoLoadTimeout", { name: filename || "" }) : t("mediaPreview.videoDecodeError") })
			})]
		});
	};
}));
//#endregion
export { init_video_preview_component as n, VideoPreviewComponent as t };
