import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-EyL4WIXZ.js";
import { n as media_module_default, t as init_media_module } from "./media.module-xXG5L1DD.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/audio-preview/index.module.scss
var previewContainer, audioInstance, index_module_default;
var init_index_module = __esmMin((() => {
	previewContainer = "_previewContainer_ftw0j_1";
	audioInstance = "_audioInstance_ftw0j_10";
	index_module_default = {
		previewContainer,
		audioInstance
	};
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/audio-preview/audio-preview-component.tsx
var import_classnames, import_react, import_jsx_runtime, AudioPreviewComponent;
var init_audio_preview_component = __esmMin((() => {
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_media_module();
	init_index_module();
	import_jsx_runtime = require_jsx_runtime();
	AudioPreviewComponent = ({ className, file, filename, content, audioAttributes }) => {
		const t = useTranslation();
		const [audioUrl, setAudioUrl] = (0, import_react.useState)();
		const [hasError, setHasError] = (0, import_react.useState)(false);
		const audioRef = (0, import_react.useRef)(null);
		(0, import_react.useEffect)(() => {
			if (!file && !content) return;
			setHasError(false);
			let cleanup = () => {};
			if (file) {
				const url = URL.createObjectURL(file);
				setAudioUrl(url);
				cleanup = () => {
					URL.revokeObjectURL(url);
				};
			} else if (content) setAudioUrl(content);
			return cleanup;
		}, [file, content]);
		const handleAudioError = () => {
			setHasError(true);
		};
		if (!file && !content) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: (0, import_classnames.default)(index_module_default.previewContainer, className),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: audioRef,
				src: audioUrl,
				className: index_module_default.audioInstance,
				controls: true,
				preload: "metadata",
				crossOrigin: "use-credentials",
				...audioAttributes,
				onError: handleAudioError
			}), hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: media_module_default.errorMessage,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("mediaPreview.parseError", { name: filename || "" }) })
			})]
		});
	};
}));
//#endregion
export { init_audio_preview_component as n, AudioPreviewComponent as t };
