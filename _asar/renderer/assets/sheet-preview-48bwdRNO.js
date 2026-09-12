import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as init_MediaPreviewContext, r as useMediaPreview } from "./MediaPreviewContext-2UvgfAb-.js";
import { SheetPreviewComponent, t as init_sheet_preview_component } from "./sheet-preview-component-DtiPBU6h.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/sheet-preview/index.tsx
var import_jsx_runtime, SheetPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_sheet_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	SheetPreview = ({ className }) => {
		const { artifact, file, isLoading, theme, environmentType } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetPreviewComponent, {
			className,
			filename: name,
			file,
			environmentType,
			isLoading,
			theme
		});
	};
}))();
export { SheetPreview };
