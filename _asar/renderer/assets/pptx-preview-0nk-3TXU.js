import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as init_MediaPreviewContext, r as useMediaPreview } from "./MediaPreviewContext-2UvgfAb-.js";
import { PptxPreviewComponent, t as init_pptx_preview_component } from "./pptx-preview-component-Dj5gWOZp.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/pptx-preview/index.tsx
var import_jsx_runtime, PptxPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_pptx_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	PptxPreview = ({ className }) => {
		const { artifact, file, environmentType, theme } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PptxPreviewComponent, {
			className,
			file,
			filename: name,
			environmentType,
			theme
		});
	};
}))();
export { PptxPreview };
