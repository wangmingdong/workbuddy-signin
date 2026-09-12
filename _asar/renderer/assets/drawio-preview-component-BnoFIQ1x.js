import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { n as useI18n, t as init_useI18n } from "./useI18n-EyL4WIXZ.js";
import { n as media_module_default, t as init_media_module } from "./media.module-xXG5L1DD.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/drawio-preview/index.module.scss
var previewContainer, drawioPreviewIframe, index_module_default;
var init_index_module = __esmMin((() => {
	previewContainer = "_previewContainer_1ql7k_1";
	drawioPreviewIframe = "_drawioPreviewIframe_1ql7k_7";
	index_module_default = {
		previewContainer,
		drawioPreviewIframe
	};
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/drawio-preview/drawio-preview-component.tsx
var import_classnames, import_react, import_jsx_runtime, DrawioPreviewComponent;
var init_drawio_preview_component = __esmMin((() => {
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_media_module();
	init_index_module();
	import_jsx_runtime = require_jsx_runtime();
	DrawioPreviewComponent = ({ className, content, filename, environmentType, theme }) => {
		const [drawioViewerUrl, setDrawioViewerUrl] = (0, import_react.useState)("");
		const { locale } = useI18n();
		const lang = (0, import_react.useMemo)(() => ["zh-cn", "zh-CN"].includes(locale) ? "zh" : "en", [locale]);
		const dark = (0, import_react.useMemo)(() => {
			if (theme === "dark") return "1";
			else if (theme === "light") return "0";
			return "auto";
		}, [theme]);
		(0, import_react.useEffect)(() => {
			if (content) {
				const baseUrl = "https://viewer.diagrams.net/";
				/**
				* @doc https://www.drawio.com/doc/faq/supported-url-parameters
				*/
				const params = {
					lightbox: "1",
					highlight: "0000ff",
					edit: "_blank",
					layers: "1",
					nav: "1",
					chrome: "0",
					title: filename || "diagram",
					lang,
					dark
				};
				const xmlContent = encodeURIComponent(content);
				setDrawioViewerUrl(`${baseUrl}?${new URLSearchParams(params).toString()}#R${xmlContent}`);
			}
		}, [
			filename,
			content,
			lang,
			dark
		]);
		const isLocalAgent = (0, import_react.useMemo)(() => environmentType === "local", [environmentType]);
		if (!content) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: (0, import_classnames.default)(className, index_module_default.previewContainer),
			children: isLocalAgent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("webview", {
				src: drawioViewerUrl,
				className: (0, import_classnames.default)(media_module_default.previewInstance, media_module_default.fullSizeFrame, index_module_default.drawioPreviewIframe),
				title: filename || "Drawio",
				webpreferences: "contextIsolation=yes,nativeWindowOpen=yes,disableDialogs=true",
				nodeintegration: false,
				allowpopups: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				src: drawioViewerUrl,
				className: (0, import_classnames.default)(media_module_default.previewInstance, media_module_default.fullSizeFrame, index_module_default.drawioPreviewIframe),
				title: filename || "Drawio",
				sandbox: "allow-scripts allow-same-origin allow-popups allow-forms",
				allow: "fullscreen"
			})
		});
	};
}));
//#endregion
export { init_drawio_preview_component as n, DrawioPreviewComponent as t };
