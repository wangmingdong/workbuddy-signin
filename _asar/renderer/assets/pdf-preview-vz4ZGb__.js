import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as init_MediaPreviewContext, r as useMediaPreview } from "./MediaPreviewContext-2UvgfAb-.js";
import { PDFPreviewComponent, t as init_pdf_preview_component } from "./pdf-preview-component-vNcBGK9Y.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/pdf-preview/index.tsx
var import_jsx_runtime, PDFPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_pdf_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	PDFPreview = ({ className }) => {
		const { artifact, file, theme, environmentType } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PDFPreviewComponent, {
			className,
			filename: name,
			file,
			environmentType,
			theme
		});
	};
}))();
export { PDFPreview };
