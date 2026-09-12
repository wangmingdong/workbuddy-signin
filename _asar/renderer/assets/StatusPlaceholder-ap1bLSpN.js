import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { A as RefreshCw, Nt as CircleAlert, f as TriangleAlert, t as init_lucide_react, tt as Info } from "./lucide-react-CmX0JwWL.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
//#region ../../packages/agent-ui/src/components/loading/Loading.less
var init_Loading$1 = __esmMin((() => {})), import_jsx_runtime$1, Loading;
var init_Loading = __esmMin((() => {
	init_Loading$1();
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	Loading = ({ text = "Loading...", fullscreen = false, className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: `cb-loading ${fullscreen ? "cb-loading--fullscreen" : ""} ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "cb-loading__content",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "cb-loading__gradient",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { className: "cb-loading__gradient-conic" })
			}), text && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "cb-loading__text",
				children: text
			})]
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/loading/index.ts
var init_loading = __esmMin((() => {
	init_Loading();
})), import_jsx_runtime, getDefaultIcon, StatusPlaceholder;
var init_StatusPlaceholder = __esmMin((() => {
	init_lucide_react();
	require_react();
	init_i18n();
	init_loading();
	import_jsx_runtime = require_jsx_runtime();
	getDefaultIcon = (type) => {
		const iconProps = {
			size: 48,
			strokeWidth: 1.5
		};
		switch (type) {
			case "error": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { ...iconProps });
			case "warning": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { ...iconProps });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { ...iconProps });
		}
	};
	StatusPlaceholder = ({ type = "info", icon, hideIcon = false, title, description, action, onRetry, retryText = t("common.retry"), className = "", children }) => {
		if (type === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `status-placeholder status-placeholder--loading ${className}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, { text: title })
		});
		if (children) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `status-placeholder status-placeholder--${type} ${className}`,
			children
		});
		const displayIcon = hideIcon ? null : icon ?? getDefaultIcon(type);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `status-placeholder status-placeholder--${type} ${className}`,
			children: [
				displayIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "status-placeholder__icon-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "status-placeholder__icon",
						children: displayIcon
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "status-placeholder__content",
					children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "status-placeholder__title",
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "status-placeholder__description",
						children: description
					})]
				}),
				(action || onRetry) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "status-placeholder__action",
					children: [onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "status-placeholder__retry-btn",
						onClick: onRetry,
						type: "button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: retryText })]
					}), action]
				})
			]
		});
	};
}));
//#endregion
export { init_StatusPlaceholder as n, StatusPlaceholder as t };
