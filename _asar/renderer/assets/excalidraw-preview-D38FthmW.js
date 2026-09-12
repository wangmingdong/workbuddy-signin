import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as init_MediaPreviewContext, r as useMediaPreview } from "./MediaPreviewContext-2UvgfAb-.js";
import { n as init_excalidraw_preview_component, t as ExcalidrawPreviewComponent } from "./excalidraw-preview-component-B9Hvm8q1.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/excalidraw-preview/index.tsx
var import_jsx_runtime, ExcalidrawPreview;
//#endregion
__esmMin((() => {
	require_react();
	init_MediaPreviewContext();
	init_excalidraw_preview_component();
	import_jsx_runtime = require_jsx_runtime();
	ExcalidrawPreview = ({ className }) => {
		const { artifact, content, environmentType, theme } = useMediaPreview();
		const { title: name } = artifact ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExcalidrawPreviewComponent, {
			className,
			content,
			filename: name,
			environmentType,
			theme
		});
	};
}))();
export { ExcalidrawPreview };
