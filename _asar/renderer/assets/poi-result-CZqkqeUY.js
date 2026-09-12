import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { _i as isPoiTool, gi as isPickLocationTool, hi as init_tool_protocol$1, mi as getPoiResult, vi as isPoiToolPending } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { C as CheckCircleToolIcon, Mn as FailedIcon$1, S as CloudToolIcon, T as AgentToolIcon, _ as FolderToolIcon, a as WarnToolIcon, b as DebugToolIcon, c as ViewedToolIcon, d as SuccessToolIcon, f as SkillToolIcon, g as ImageToolIcon, h as LoadingToolIcon, hn as LocationIcon$1, i as WebToolIcon, l as ToolDefaultIcon, m as PlanToolIcon, n as init_icons, p as SearchToolIcon, r as WidgetToolIcon, u as TerminalToolIcon, v as EditToolIcon, w as ArrowToolIcon, x as DatabaseToolIcon, y as DeleteToolIcon } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
//#region ../../packages/agent-ui/src/components/tools/tool-protocol.ts
var ToolRendererPriority;
var init_tool_protocol = __esmMin((() => {
	ToolRendererPriority = /* @__PURE__ */ function(ToolRendererPriority) {
		ToolRendererPriority[ToolRendererPriority["NONE"] = 0] = "NONE";
		ToolRendererPriority[ToolRendererPriority["DEFAULT"] = 1] = "DEFAULT";
		ToolRendererPriority[ToolRendererPriority["EXACT"] = 10] = "EXACT";
		return ToolRendererPriority;
	}({});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/tool-icons/index.tsx
/** 工具图标适配器：foundation createIcon 图标 → ToolIconProps 兼容组件 */
function adaptToolIcon(FoundationIcon) {
	const Adapted = ({ size = 16, className, color, style }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FoundationIcon, {
		size,
		className,
		color,
		style
	});
	Adapted.displayName = FoundationIcon.displayName ?? "AdaptedToolIcon";
	return Adapted;
}
var import_jsx_runtime$1, SkillIcon, TerminalIcon, ViewedIcon, EditIcon, SearchIcon, FolderIcon, WebIcon, DeleteIcon, CheckCircleIcon, PlanIcon, AgentIcon, ImageIcon, WidgetIcon, DatabaseIcon, CloudIcon, DebugIcon, ToolIcon, LoadingIcon, FailedIcon, SuccessIcon, WarnIcon, ArrowIcon, LocationIcon;
var init_tool_icons = __esmMin((() => {
	require_react();
	init_icons();
	import_jsx_runtime$1 = require_jsx_runtime();
	SkillIcon = adaptToolIcon(SkillToolIcon);
	TerminalIcon = adaptToolIcon(TerminalToolIcon);
	ViewedIcon = adaptToolIcon(ViewedToolIcon);
	EditIcon = adaptToolIcon(EditToolIcon);
	SearchIcon = adaptToolIcon(SearchToolIcon);
	FolderIcon = adaptToolIcon(FolderToolIcon);
	WebIcon = adaptToolIcon(WebToolIcon);
	DeleteIcon = adaptToolIcon(DeleteToolIcon);
	CheckCircleIcon = adaptToolIcon(CheckCircleToolIcon);
	PlanIcon = adaptToolIcon(PlanToolIcon);
	AgentIcon = adaptToolIcon(AgentToolIcon);
	ImageIcon = adaptToolIcon(ImageToolIcon);
	WidgetIcon = adaptToolIcon(WidgetToolIcon);
	DatabaseIcon = adaptToolIcon(DatabaseToolIcon);
	CloudIcon = adaptToolIcon(CloudToolIcon);
	DebugIcon = adaptToolIcon(DebugToolIcon);
	ToolIcon = adaptToolIcon(ToolDefaultIcon);
	LoadingIcon = adaptToolIcon(LoadingToolIcon);
	FailedIcon = ({ size = 16, className, color, style }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FailedIcon$1, {
		size,
		className,
		color,
		style
	});
	SuccessIcon = adaptToolIcon(SuccessToolIcon);
	WarnIcon = adaptToolIcon(WarnToolIcon);
	ArrowIcon = adaptToolIcon(ArrowToolIcon);
	LocationIcon = adaptToolIcon(LocationIcon$1);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/poi-result/poi-result-renderer.scss
var init_poi_result_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/poi-result/poi-result-renderer.tsx
function isPendingStatus(status) {
	return [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing",
		"executing"
	].includes(status);
}
function isDoneStatus(status) {
	return status === "executed" || status === "completed";
}
var import_react, import_jsx_runtime, FAILURE_I18N_KEY, PoiResultComponent, PoiResultRenderer;
var init_poi_result_renderer = __esmMin((() => {
	init_poi_result_renderer$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_protocol$1();
	init_tool_icons();
	init_tool_protocol();
	import_jsx_runtime = require_jsx_runtime();
	FAILURE_I18N_KEY = {
		auth_denied: "poi.tool.failure.authDenied",
		locate_failed: "poi.tool.failure.locateFailed",
		manual_skipped: "poi.tool.failure.manualSkipped",
		config_error: "poi.tool.failure.configError"
	};
	PoiResultComponent = (0, import_react.memo)(({ tool }) => {
		const t = useTranslation();
		const result = getPoiResult(tool);
		if (isPendingStatus(tool.status) && !result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "poi-result poi-result--loading",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "poi-result__loading-text cb-shining-text",
				children: t("poi.dialog.locating")
			})
		});
		if (result?.status === "cancelled") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "poi-result poi-result--cancelled",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "poi-result__status-text",
				children: t("poi.tool.cancelled")
			})
		});
		if (result?.status === "failed") {
			const reasonKey = result.failureReason ? FAILURE_I18N_KEY[result.failureReason] : void 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "poi-result poi-result--failed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "poi-result__status-text",
					children: t("poi.tool.failed")
				}), reasonKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "poi-result__reason",
					children: t(reasonKey)
				})]
			});
		}
		if (result?.status === "success" && result.location) {
			const { name, address } = result.location;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "poi-result poi-result--success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "poi-result__thumb",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationIcon, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "poi-result__info",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "poi-result__name",
						children: name
					}), address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "poi-result__address",
						children: address
					})]
				})]
			});
		}
		if (isDoneStatus(tool.status)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "poi-result poi-result--failed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "poi-result__status-text",
				children: t("poi.tool.failed")
			})
		});
		return null;
	});
	PoiResultComponent.displayName = "PoiResultComponent";
	PoiResultRenderer = class {
		constructor() {
			this.className = "poi-result";
		}
		canHandle(tool) {
			if (!isPoiTool(tool)) return ToolRendererPriority.NONE;
			if (isPickLocationTool(tool) && isPoiToolPending(tool) && !getPoiResult(tool)) return ToolRendererPriority.NONE;
			return ToolRendererPriority.EXACT;
		}
		render(tool) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoiResultComponent, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/poi-result/index.ts
var init_poi_result = __esmMin((() => {
	init_poi_result_renderer();
}));
//#endregion
export { WarnIcon as C, ToolRendererPriority as D, init_tool_icons as E, init_tool_protocol as O, ViewedIcon as S, WidgetIcon as T, SearchIcon as _, CheckCircleIcon as a, TerminalIcon as b, DebugIcon as c, FailedIcon as d, FolderIcon as f, PlanIcon as g, LocationIcon as h, ArrowIcon as i, DeleteIcon as l, LoadingIcon as m, PoiResultRenderer as n, CloudIcon as o, ImageIcon as p, AgentIcon as r, DatabaseIcon as s, init_poi_result as t, EditIcon as u, SkillIcon as v, WebIcon as w, ToolIcon as x, SuccessIcon as y };
