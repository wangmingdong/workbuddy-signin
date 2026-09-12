import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as init_MediaPreviewContext, r as useMediaPreview } from "./MediaPreviewContext-2UvgfAb-.js";
import { DocxPreviewComponent, t as init_docx_preview_component } from "./docx-preview-component-CjwFTC73.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/docx-preview/index.tsx
var import_jsx_runtime, DocxPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_docx_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	DocxPreview = ({ className }) => {
		const { artifact, file, environmentType, theme } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocxPreviewComponent, {
			className,
			file,
			filename: name,
			environmentType,
			theme
		});
	};
}))();
export { DocxPreview };
