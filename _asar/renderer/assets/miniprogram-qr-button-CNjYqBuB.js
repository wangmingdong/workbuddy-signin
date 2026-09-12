import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Ga as FloatingPortal, Ja as useClick, Qa as useInteractions, Ya as useDismiss, Za as useHover, eo as useRole, io as shift, no as flip, oo as autoUpdate, ro as offset } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as useFloating, t as init_floating } from "./floating-1_OFz6f-.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as wechatmp_icon_default, n as wechatmp_qr_code_default, r as init_wechatmp_icon, t as init_wechatmp_qr_code } from "./wechatmp-qr-code-Cy7xHDnU.js";
//#region ../../packages/agent-ui/src/components/miniprogram-qr-button/index.less
var init_miniprogram_qr_button$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/miniprogram-qr-button/index.tsx
var import_react, import_jsx_runtime, MiniProgramQRButton;
var init_miniprogram_qr_button = __esmMin((() => {
	init_miniprogram_qr_button$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_wechatmp_icon();
	init_wechatmp_qr_code();
	init_floating();
	init_useI18n();
	import_jsx_runtime = require_jsx_runtime();
	MiniProgramQRButton = ({ collapsed = false, triggerMode = "hover", miniProgramPath }) => {
		const t = useTranslation();
		const [isOpen, setIsOpen] = (0, import_react.useState)(false);
		const { refs, floatingStyles, context } = useFloating({
			open: isOpen,
			onOpenChange: setIsOpen,
			placement: collapsed ? "right" : "top",
			middleware: [
				offset(8),
				flip(),
				shift({ padding: 8 })
			],
			whileElementsMounted: autoUpdate
		});
		const { getReferenceProps, getFloatingProps } = useInteractions([
			useHover(context, {
				delay: {
					open: 150,
					close: 300
				},
				restMs: 150,
				enabled: triggerMode === "hover"
			}),
			useClick(context, { enabled: triggerMode === "click" }),
			useDismiss(context),
			useRole(context, { role: "tooltip" })
		]);
		const popupContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [triggerMode === "click" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "miniprogram-qr-backdrop",
			onClick: () => setIsOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: refs.setFloating,
			style: floatingStyles,
			className: "miniprogram-qr-popup",
			...getFloatingProps(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "miniprogram-qr-popup-title",
					children: t("sidebar.miniprogram.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "miniprogram-qr-popup-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: wechatmp_qr_code_default,
						alt: "QR Code",
						className: "miniprogram-qr-popup-image",
						"data-mini-program-path": miniProgramPath
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "miniprogram-qr-popup-desc",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("sidebar.miniprogram.desc.one") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("sidebar.miniprogram.desc.two") })]
				})
			]
		})] });
		if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			ref: refs.setReference,
			className: "conversation-list-collapsed-icon-button",
			...getReferenceProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: wechatmp_icon_default,
				alt: "Mini Program",
				style: {
					width: 18,
					height: 18
				}
			})
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, { children: popupContent })] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			ref: refs.setReference,
			className: "miniprogram-qr-trigger",
			...getReferenceProps(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: wechatmp_icon_default,
				alt: "Mini Program",
				style: {
					width: 18,
					height: 18
				}
			})
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, { children: popupContent })] });
	};
}));
//#endregion
export { init_miniprogram_qr_button as n, MiniProgramQRButton as t };
