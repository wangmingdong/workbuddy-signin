import { n as __esmMin, s as __toESM, t as __commonJSMin } from "./chunk-BRZcfu7K.js";
import { n as init_dist, t as Buffer } from "./dist-DNjXzICC.js";
import { n as ResizeObserver, t as init_resize_observer } from "./resize-observer-QOR-7G1T.js";
import { o as __metadata, p as init_tslib_es6, r as __decorate } from "./tslib.es6-8NkKEYUK.js";
import { r as init_esm, t as esm_default } from "./esm-w-aC9ppW.js";
import { Dn as require_main, _n as Emitter, vn as init_event } from "./esm-cVQVEiWG.js";
import { $l as init_es, $u as dom, Cu as OptionStyle, Du as parseColorToARGB, El as PermissionTargetType, Eu as getDarkModeTextColor, Lu as file_image_emphasized_inline_default, Pd as BaseAppConfigService, Ru as init_file_image_emphasized_inline, Su as selectOptionStyle, Td as isSSR, Tu as getDarkModeColor, Vl as ViewType, Xu as domainConfig, Yu as logger, _d as debounceHighPriority, _u as reportManager, bd as SmartSheetEventName, ca as getTencentDomainLinkType, du as getThemeTokenValue, fd as TDW_PERFORMANCE_ACTION_MAP, fu as isDarkMode, gd as debounce, gi as defaultColorConfig, gu as markStart, hd as XViewReportAttr, hi as TimeBarColorType, pu as SharableCacheManager, ql as FieldType, rd as hostApp, tc as CheckboxIconType, td as reporter, ua as HyperlinkType, ud as TDWReportOpername, vd as debounceLowPriority, vu as jankReport, w as TableCacheService, wd as i18n, xu as getSelectOptionStyleConfig, yd as fireEvent, yu as isDev } from "./execution-result-erkS5q1j.js";
import { n as init_esm$1, r as ua } from "./esm-mgJiqgJI.js";
import { r as require_toString } from "./_toKey-C_jhg8p3.js";
import { $ as phone_14_default, A as init_person_group_sync_14, At as checkbox_14_default, B as checkbox_sync_14_default, C as location_sync_14_default, Ct as init_function_14, D as link_sync_14_default, Dt as init_calendar_14, E as init_link_sync_14, Et as calendar_14_default, F as mail_sync_14_default, Ft as init_folder_14, G as init_folder_sync_14, H as barcode_sync_14_default, I as calendar_sync_14_default, It as init_sort_numeric_descending_14, J as init_person_14, K as init_sort_numeric_descending_sync_14, L as init_calendar_sync_14, Lt as sort_numeric_descending_14_default, M as function_sync_14_default, Mt as barcode_14_default, N as init_function_sync_14, Nt as init_barcode_14, O as image_sync_14_default, Ot as init_money_circle_14, P as init_mail_sync_14, Pt as folder_14_default, Q as init_phone_14, R as init_money_circle_sync_14, S as init_location_sync_14, St as function_14_default, T as init_chain_rectangle_sync_14, Tt as mail_14_default, U as init_barcode_sync_14, V as init_checkbox_sync_14, W as folder_sync_14_default, X as init_text_a_square_14, Y as person_14_default, Z as text_a_square_14_default, _ as numbers_square_sync_14_default, _t as link_14_default, a as person_sync_14_default, at as percentage_14_default, b as init_sheet_magnifier_sync_14, bt as init_person_group_14, c as init_phone_sync_14, ct as init_list_checkmark_two_14, d as init_chevron_down_circle_sync_14, dt as sheet_magnifier_14_default, et as chevron_down_circle_14_default, f as init_progress_sync_14, ft as init_location_14, g as init_numbers_square_sync_14, gt as init_link_14, h as percentage_sync_14_default, ht as init_chain_rectangle_14, i as init_person_sync_14, it as init_percentage_14, j as person_group_sync_14_default, jt as init_checkbox_14, k as init_image_sync_14, kt as money_circle_14_default, l as phone_sync_14_default, lt as list_checkmark_two_14_default, m as init_percentage_sync_14, mt as chain_rectangle_14_default, n as supportContentPermission, nt as init_progress_14, o as init_text_a_square_sync_14, ot as init_numbers_square_14, p as progress_sync_14_default, pt as location_14_default, q as sort_numeric_descending_sync_14_default, r as attachmentPreviewImageLoader, rt as progress_14_default, s as text_a_square_sync_14_default, st as numbers_square_14_default, t as init_es$1, tt as init_chevron_down_circle_14, u as chevron_down_circle_sync_14_default, ut as init_sheet_magnifier_14, v as init_list_checkmark_two_sync_14, vt as image_14_default, w as chain_rectangle_sync_14_default, wt as init_mail_14, x as sheet_magnifier_sync_14_default, xt as person_group_14_default, y as list_checkmark_two_sync_14_default, yt as init_image_14, z as money_circle_sync_14_default } from "./es-BQsslXL1.js";
import { i as init_arrow_heavy_right_16, n as toolbar_dele_default, r as arrow_heavy_right_16_default, t as init_toolbar_dele } from "./toolbar_dele-ClM3mqBW.js";
//#region ../../node_modules/@tencent/xtable-view/es/plugins/report/performance/decorator.js
function getReportParamForView(context) {
	if (!context) return;
	var view = context.getCurrentView();
	var type = view === null || view === void 0 ? void 0 : view.type;
	if (!type) return;
	var name = ViewNameMap[type];
	var fieldCount = view.getVisibleFieldIds().length;
	return {
		name,
		recordCount: view.getDisplayedRecordIds().length,
		fieldCount,
		groupCount: type === ViewType.GRID || type === ViewType.GANTT ? view.getGroupFields().length : 0
	};
}
var ViewNameMap, markEndForView;
var init_decorator = __esmMin((() => {
	init_es();
	init_es$1();
	ViewNameMap = {
		[ViewType.GRID]: "表格",
		[ViewType.GANTT]: "甘特",
		[ViewType.KANBAN]: "看板",
		[ViewType.GALLERY]: "画册",
		[ViewType.CALENDAR]: "日历"
	};
	markEndForView = (eventName, maxReports, minValue) => {
		var executeTimes = 0;
		var lastType;
		return function(_target, _propertyKey, descriptor) {
			var original = descriptor.value;
			descriptor.value = function(context) {
				var _a;
				var viewType = (_a = context === null || context === void 0 ? void 0 : context.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type;
				if (!ViewNameMap[viewType]) return;
				if (lastType !== viewType) executeTimes = 0;
				lastType = viewType;
				if (maxReports && executeTimes >= maxReports) return;
				if (context === null || context === void 0 ? void 0 : context.customConfig) return;
				var value = reportManager.getCost(eventName);
				if (!value) return;
				if (minValue && value < minValue) return;
				reporter.metricsValue({
					attrid: eventName,
					value
				});
				var tdwAction = TDW_PERFORMANCE_ACTION_MAP[eventName];
				if (tdwAction) {
					var param = getReportParamForView(context);
					reporter.metricsTdw({
						opername: TDWReportOpername.PERFORMANCE,
						module: hostApp.getName(),
						action: tdwAction,
						ver5: value,
						ver6: viewType,
						ver7: param === null || param === void 0 ? void 0 : param.recordCount,
						ver8: param === null || param === void 0 ? void 0 : param.fieldCount,
						ver9: param === null || param === void 0 ? void 0 : param.groupCount
					});
					logger.info(`[xview][pref][${param === null || param === void 0 ? void 0 : param.name}]${eventName} ${value.toFixed(1)}ms`);
				}
				var result = original === null || original === void 0 ? void 0 : original.call(this, context);
				reportManager.dispose(eventName);
				executeTimes += 1;
				return result;
			};
		};
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/report/performance/index.js
var Common, Grid, Gantt, ViewPerformanceReport, performanceReport;
var init_performance = __esmMin((() => {
	init_tslib_es6();
	init_es();
	init_decorator();
	Common = /* @__PURE__ */ function() {
		"use strict";
		function Common() {}
		var _proto = Common.prototype;
		_proto.markViewRenderStart = function markViewRenderStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "viewRender"
			});
		};
		_proto.markViewRenderEnd = function markViewRenderEnd(_context) {};
		_proto.markViewScriptFetchStart = function markViewScriptFetchStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "viewScriptFetch"
			});
		};
		_proto.markViewScriptFetchEnd = function markViewScriptFetchEnd(_context) {};
		_proto.markViewBuildStart = function markViewBuildStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "viewBuild"
			});
		};
		_proto.markViewBuildEnd = function markViewBuildEnd(_context) {};
		_proto.markRenderStart = function markRenderStart() {};
		_proto.markRenderEnd = function markRenderEnd(_context) {};
		_proto.markResizeStart = function markResizeStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "resize"
			});
		};
		_proto.markResizeEnd = function markResizeEnd(_context) {};
		_proto.markAllInitCollectStart = function markAllInitCollectStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "allInitCollect"
			});
		};
		_proto.markAllInitCollectEnd = function markAllInitCollectEnd(_context) {};
		_proto.markAllPatchCollectStart = function markAllPatchCollectStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "allPatchCollect"
			});
		};
		_proto.markAllPatchCollectEnd = function markAllPatchCollectEnd(_context) {};
		_proto.markAllResizeCollectStart = function markAllResizeCollectStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "allResizeCollect"
			});
		};
		_proto.markAllResizeCollectEnd = function markAllResizeCollectEnd(_context) {};
		return Common;
	}();
	__decorate([
		markStart(XViewReportAttr.AllRenderCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markViewRenderStart", null);
	__decorate([
		markEndForView(XViewReportAttr.AllRenderCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markViewRenderEnd", null);
	__decorate([
		markStart(XViewReportAttr.ViewScriptFetchCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markViewScriptFetchStart", null);
	__decorate([
		markEndForView(XViewReportAttr.ViewScriptFetchCost, Infinity, 30),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markViewScriptFetchEnd", null);
	__decorate([
		markStart(XViewReportAttr.AllBuildCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markViewBuildStart", null);
	__decorate([
		markEndForView(XViewReportAttr.AllBuildCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markViewBuildEnd", null);
	__decorate([
		markStart(XViewReportAttr.OneRenderCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markRenderStart", null);
	__decorate([
		markEndForView(XViewReportAttr.OneRenderCost, 3),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markRenderEnd", null);
	__decorate([
		markStart(XViewReportAttr.ResizeCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markResizeStart", null);
	__decorate([
		markEndForView(XViewReportAttr.ResizeCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markResizeEnd", null);
	__decorate([
		markStart(XViewReportAttr.AllInitCollectCostTotal),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markAllInitCollectStart", null);
	__decorate([
		markEndForView(XViewReportAttr.AllInitCollectCostTotal),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markAllInitCollectEnd", null);
	__decorate([
		markStart(XViewReportAttr.AllPatchCollectCostTotal),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markAllPatchCollectStart", null);
	__decorate([
		markEndForView(XViewReportAttr.AllPatchCollectCostTotal, 3),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markAllPatchCollectEnd", null);
	__decorate([
		markStart(XViewReportAttr.AllResizeCollectCostTotal),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markAllResizeCollectStart", null);
	__decorate([
		markEndForView(XViewReportAttr.AllResizeCollectCostTotal),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Common.prototype, "markAllResizeCollectEnd", null);
	Grid = /* @__PURE__ */ function() {
		"use strict";
		function Grid() {}
		var _proto = Grid.prototype;
		_proto.markRowCollectInitStart = function markRowCollectInitStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "rowCollectInit"
			});
		};
		_proto.markRowCollectInitEnd = function markRowCollectInitEnd(_context) {};
		_proto.markRowCollectPatchStart = function markRowCollectPatchStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "rowCollectPatch"
			});
		};
		_proto.markRowCollectPatchEnd = function markRowCollectPatchEnd(_context) {};
		_proto.markColumnCollectInitStart = function markColumnCollectInitStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "columnCollectInit"
			});
		};
		_proto.markColumnCollectInitEnd = function markColumnCollectInitEnd(_context) {};
		_proto.markColumnCollectPatchStart = function markColumnCollectPatchStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "columnCollectPatch"
			});
		};
		_proto.markColumnCollectPatchEnd = function markColumnCollectPatchEnd(_context) {};
		_proto.markContentCollectInitStart = function markContentCollectInitStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "contentCollectInit"
			});
		};
		_proto.markContentCollectInitEnd = function markContentCollectInitEnd(_context) {};
		_proto.markContentCollectPatchStart = function markContentCollectPatchStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "contentCollectPatch"
			});
		};
		_proto.markContentCollectPatchEnd = function markContentCollectPatchEnd(_context) {};
		return Grid;
	}();
	__decorate([
		markStart(XViewReportAttr.GridRowCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markRowCollectInitStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GridRowCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markRowCollectInitEnd", null);
	__decorate([
		markStart(XViewReportAttr.GridRowCollectPatchCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markRowCollectPatchStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GridRowCollectPatchCost, 3),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markRowCollectPatchEnd", null);
	__decorate([
		markStart(XViewReportAttr.GridColumnCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markColumnCollectInitStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GridColumnCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markColumnCollectInitEnd", null);
	__decorate([
		markStart(XViewReportAttr.GridColumnCollectPatchCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markColumnCollectPatchStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GridColumnCollectPatchCost, 3),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markColumnCollectPatchEnd", null);
	__decorate([
		markStart(XViewReportAttr.GridContentCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markContentCollectInitStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GridContentCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markContentCollectInitEnd", null);
	__decorate([
		markStart(XViewReportAttr.GridContentCollectPatchCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markContentCollectPatchStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GridContentCollectPatchCost, 3),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Grid.prototype, "markContentCollectPatchEnd", null);
	Gantt = /* @__PURE__ */ function() {
		"use strict";
		function Gantt() {}
		var _proto = Gantt.prototype;
		_proto.markGanttTimeLineCollectInitStart = function markGanttTimeLineCollectInitStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "timeLineCollectInit"
			});
		};
		_proto.markGanttTimeLineCollectInitEnd = function markGanttTimeLineCollectInitEnd(_context) {};
		_proto.markGanttTimeLineCollectPatchStart = function markGanttTimeLineCollectPatchStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "timeLineCollectPatch"
			});
		};
		_proto.markGanttTimeLineCollectPatchEnd = function markGanttTimeLineCollectPatchEnd(_context) {};
		_proto.markGanttTimeLineCollectResizeStart = function markGanttTimeLineCollectResizeStart() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "timeLineCollectResize"
			});
		};
		_proto.markGanttTimeLineCollectResizeEnd = function markGanttTimeLineCollectResizeEnd(_context) {};
		return Gantt;
	}();
	__decorate([
		markStart(XViewReportAttr.GanttTimeLineCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Gantt.prototype, "markGanttTimeLineCollectInitStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GanttTimeLineCollectInitCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Gantt.prototype, "markGanttTimeLineCollectInitEnd", null);
	__decorate([
		markStart(XViewReportAttr.GanttTimeLineCollectPatchCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Gantt.prototype, "markGanttTimeLineCollectPatchStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GanttTimeLineCollectPatchCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Gantt.prototype, "markGanttTimeLineCollectPatchEnd", null);
	__decorate([
		markStart(XViewReportAttr.GanttTimeLineCollectResizeCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], Gantt.prototype, "markGanttTimeLineCollectResizeStart", null);
	__decorate([
		markEndForView(XViewReportAttr.GanttTimeLineCollectResizeCost),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Object]),
		__metadata("design:returntype", void 0)
	], Gantt.prototype, "markGanttTimeLineCollectResizeEnd", null);
	ViewPerformanceReport = function ViewPerformanceReport() {
		"use strict";
		this.common = new Common();
		this.grid = new Grid();
		this.gantt = new Gantt();
	};
	performanceReport = new ViewPerformanceReport();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/interface/common.js
var Direction, XDirection, YDirection, UpdateType;
var init_common = __esmMin((() => {
	(function(Direction) {
		Direction[Direction["UP"] = 0] = "UP";
		Direction[Direction["DOWN"] = 1] = "DOWN";
		Direction[Direction["LEFT"] = 2] = "LEFT";
		Direction[Direction["RIGHT"] = 3] = "RIGHT";
	})(Direction || (Direction = {}));
	(function(XDirection) {
		XDirection[XDirection["LEFT"] = 0] = "LEFT";
		XDirection[XDirection["RIGHT"] = 1] = "RIGHT";
		XDirection[XDirection["NONE"] = 2] = "NONE";
	})(XDirection || (XDirection = {}));
	(function(YDirection) {
		YDirection[YDirection["UP"] = 0] = "UP";
		YDirection[YDirection["DOWN"] = 1] = "DOWN";
		YDirection[YDirection["NONE"] = 2] = "NONE";
	})(YDirection || (YDirection = {}));
	(function(UpdateType) {
		UpdateType["Scale"] = "Scale";
		UpdateType["Resize"] = "Resize";
		UpdateType["Rebuild"] = "Rebuild";
		UpdateType["Mutation"] = "Mutation";
	})(UpdateType || (UpdateType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/render-app-config/index.interface.js
var RenderAppConfigKey;
var init_index_interface = __esmMin((() => {
	(function(RenderAppConfigKey) {
		RenderAppConfigKey["OPEN_MODIFY_FIELD_PROPETY_TOOTIP"] = "open-modify-field-property-tootip";
		RenderAppConfigKey["SCROLL_CONFIG_GETTER"] = "scroll-config-getter";
		RenderAppConfigKey["SIZE_CONFIG"] = "render-size-config";
		/**
		* 主区域宽度获取器: 比如内嵌 sc 场景, 智能表集中在一个主区域展示
		* - 表格视图最小宽度会以这个为准, 通过增加新建列宽度撑开
		* - 数据统计最小宽度已这个为准, 最大宽度跟随列宽
		*/ RenderAppConfigKey["MAIN_WIDTH_GETTER"] = "main-width-getter";
		RenderAppConfigKey["STAT_CONFIG"] = "stat-config";
		RenderAppConfigKey["SHOULD_HIDE_RECORD_EXPAND_ICON"] = "should-hide-record-expand-icon";
		RenderAppConfigKey["SHOULD_HIDE_FIELD_ICON"] = "should-hide-field-icon";
	})(RenderAppConfigKey || (RenderAppConfigKey = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/render-app-config/index.js
function _inherits$26(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$26(subClass, superClass);
}
function _set_prototype_of$26(o, p) {
	_set_prototype_of$26 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$26(o, p);
}
var RenderAppConfigService, renderAppConfigService;
var init_render_app_config = __esmMin((() => {
	init_es();
	init_index_interface();
	RenderAppConfigService = /* @__PURE__ */ function(BaseAppConfigService) {
		"use strict";
		_inherits$26(RenderAppConfigService, BaseAppConfigService);
		function RenderAppConfigService() {
			var _this = BaseAppConfigService.call(this) || this;
			_this.config = {};
			return _this;
		}
		var _proto = RenderAppConfigService.prototype;
		_proto.mergeConfig = function mergeConfig(config) {
			var _a, _b;
			this.config = Object.assign(Object.assign(Object.assign({}, this.config), config), {
				[RenderAppConfigKey.SIZE_CONFIG]: Object.assign(Object.assign({}, (_a = this.config) === null || _a === void 0 ? void 0 : _a[RenderAppConfigKey.SIZE_CONFIG]), config === null || config === void 0 ? void 0 : config[RenderAppConfigKey.SIZE_CONFIG]),
				[RenderAppConfigKey.STAT_CONFIG]: Object.assign(Object.assign({}, (_b = this.config) === null || _b === void 0 ? void 0 : _b[RenderAppConfigKey.STAT_CONFIG]), config === null || config === void 0 ? void 0 : config[RenderAppConfigKey.STAT_CONFIG])
			});
			if (RenderAppConfigKey.SIZE_CONFIG in config && config[RenderAppConfigKey.SIZE_CONFIG] === void 0) delete this.config[RenderAppConfigKey.SIZE_CONFIG];
			if (RenderAppConfigKey.STAT_CONFIG in config && config[RenderAppConfigKey.STAT_CONFIG] === void 0) delete this.config[RenderAppConfigKey.STAT_CONFIG];
		};
		return RenderAppConfigService;
	}(BaseAppConfigService);
	renderAppConfigService = new RenderAppConfigService();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/render-app-config/utils.js
function getScrollConfig(editorId) {
	var _a, _b;
	return (_b = (_a = renderAppConfigService.getConfig())[RenderAppConfigKey.SCROLL_CONFIG_GETTER]) === null || _b === void 0 ? void 0 : _b.call(_a, editorId);
}
function getMainWidth(editorId) {
	var _a, _b;
	return (_b = (_a = renderAppConfigService.getConfig())[RenderAppConfigKey.MAIN_WIDTH_GETTER]) === null || _b === void 0 ? void 0 : _b.call(_a, editorId);
}
var init_utils$1 = __esmMin((() => {
	init_render_app_config();
	init_index_interface();
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_editpalette_themec4c_24.svg
var checkbox_fill_lignt_editpalette_themec4c_24_default;
var init_checkbox_fill_lignt_editpalette_themec4c_24 = __esmMin((() => {
	checkbox_fill_lignt_editpalette_themec4c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%23808B9E'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpaletteb3c_24.svg
var checkbox_fill_lignt_tagpaletteb3c_24_default;
var init_checkbox_fill_lignt_tagpaletteb3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpaletteb3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%232972F4'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpalettec3c_24.svg
var checkbox_fill_lignt_tagpalettec3c_24_default;
var init_checkbox_fill_lignt_tagpalettec3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpalettec3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%2300A3F5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpaletted3c_24.svg
var checkbox_fill_lignt_tagpaletted3c_24_default;
var init_checkbox_fill_lignt_tagpaletted3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpaletted3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%2345B076'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpalettee3c_24.svg
var checkbox_fill_lignt_tagpalettee3c_24_default;
var init_checkbox_fill_lignt_tagpalettee3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpalettee3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%23DE3C36'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpalettef3c_24.svg
var checkbox_fill_lignt_tagpalettef3c_24_default;
var init_checkbox_fill_lignt_tagpalettef3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpalettef3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%23F88825'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpaletteg3c_24.svg
var checkbox_fill_lignt_tagpaletteg3c_24_default;
var init_checkbox_fill_lignt_tagpaletteg3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpaletteg3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%23F5C400'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpaletteh3c_24.svg
var checkbox_fill_lignt_tagpaletteh3c_24_default;
var init_checkbox_fill_lignt_tagpaletteh3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpaletteh3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%239A38D7'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/checkbox_fill_lignt_tagpalettei3c_24.svg
var checkbox_fill_lignt_tagpalettei3c_24_default;
var init_checkbox_fill_lignt_tagpalettei3c_24 = __esmMin((() => {
	checkbox_fill_lignt_tagpalettei3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%20fill='%23DD4097'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.14849%2011.3691L10.7817%2013.9297L15.8515%209L17%2010.1168L11.069%2015.8843C10.9104%2016.0386%2010.6533%2016.0386%2010.4947%2015.8843L7%2012.486L8.14849%2011.3691Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_editpalette_themec4c_24.svg
var flag_1_fill_light_editpalette_themec4c_24_default;
var init_flag_1_fill_light_editpalette_themec4c_24 = __esmMin((() => {
	flag_1_fill_light_editpalette_themec4c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22745L5%204.99997V14V21H6.25V13.3767C7.97141%2012.5683%2010.0075%2012.806%2011.4981%2013.9985L11.7248%2014.1798C13.1309%2015.3047%2015.0333%2015.5866%2016.7053%2014.9179L19%2014V4.99997L15.8955%205.62087C14.6758%205.86481%2013.409%205.64538%2012.3424%205.00543L11.3536%204.41212C9.8877%203.53259%208.07406%203.46294%206.54504%204.22745Z'%20fill='%23808B9E'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpaletteb3c_24.svg
var flag_1_fill_light_tagpaletteb3c_24_default;
var init_flag_1_fill_light_tagpaletteb3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpaletteb3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22745L5%204.99997V14V21H6.25V13.3767C7.97141%2012.5683%2010.0075%2012.806%2011.4981%2013.9985L11.7248%2014.1798C13.1309%2015.3047%2015.0333%2015.5866%2016.7053%2014.9179L19%2014V4.99997L15.8955%205.62087C14.6758%205.86481%2013.409%205.64538%2012.3424%205.00543L11.3536%204.41212C9.8877%203.53259%208.07406%203.46294%206.54504%204.22745Z'%20fill='%232972F4'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpalettec3c_24.svg
var flag_1_fill_light_tagpalettec3c_24_default;
var init_flag_1_fill_light_tagpalettec3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpalettec3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22757L5%205.00009V14.0001V21.0001H6.25V13.3768C7.97141%2012.5685%2010.0075%2012.8061%2011.4981%2013.9986L11.7248%2014.18C13.1309%2015.3049%2015.0333%2015.5868%2016.7053%2014.918L19%2014.0001V5.00009L15.8955%205.621C14.6758%205.86493%2013.409%205.6455%2012.3424%205.00556L11.3536%204.41225C9.8877%203.53271%208.07406%203.46306%206.54504%204.22757Z'%20fill='%2300A3F5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpaletted3c_24.svg
var flag_1_fill_light_tagpaletted3c_24_default;
var init_flag_1_fill_light_tagpaletted3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpaletted3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22757L5%205.00009V14.0001V21.0001H6.25V13.3768C7.97141%2012.5685%2010.0075%2012.8061%2011.4981%2013.9986L11.7248%2014.18C13.1309%2015.3049%2015.0333%2015.5868%2016.7053%2014.918L19%2014.0001V5.00009L15.8955%205.621C14.6758%205.86493%2013.409%205.6455%2012.3424%205.00556L11.3536%204.41225C9.8877%203.53271%208.07406%203.46306%206.54504%204.22757Z'%20fill='%2345B076'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpalettee3c_24.svg
var flag_1_fill_light_tagpalettee3c_24_default;
var init_flag_1_fill_light_tagpalettee3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpalettee3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22745L5%204.99997V14V21H6.25V13.3767C7.97141%2012.5683%2010.0075%2012.806%2011.4981%2013.9985L11.7248%2014.1798C13.1309%2015.3047%2015.0333%2015.5866%2016.7053%2014.9179L19%2014V4.99997L15.8955%205.62087C14.6758%205.86481%2013.409%205.64538%2012.3424%205.00543L11.3536%204.41212C9.8877%203.53259%208.07406%203.46294%206.54504%204.22745Z'%20fill='%23DE3C36'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpalettef3c_24.svg
var flag_1_fill_light_tagpalettef3c_24_default;
var init_flag_1_fill_light_tagpalettef3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpalettef3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22745L5%204.99997V14V21H6.25V13.3767C7.97141%2012.5683%2010.0075%2012.806%2011.4981%2013.9985L11.7248%2014.1798C13.1309%2015.3047%2015.0333%2015.5866%2016.7053%2014.9179L19%2014V4.99997L15.8955%205.62087C14.6758%205.86481%2013.409%205.64538%2012.3424%205.00543L11.3536%204.41212C9.8877%203.53259%208.07406%203.46294%206.54504%204.22745Z'%20fill='%23F88825'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpaletteg3c_24.svg
var flag_1_fill_light_tagpaletteg3c_24_default;
var init_flag_1_fill_light_tagpaletteg3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpaletteg3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22745L5%204.99997V14V21H6.25V13.3767C7.97141%2012.5683%2010.0075%2012.806%2011.4981%2013.9985L11.7248%2014.1798C13.1309%2015.3047%2015.0333%2015.5866%2016.7053%2014.9179L19%2014V4.99997L15.8955%205.62087C14.6758%205.86481%2013.409%205.64538%2012.3424%205.00543L11.3536%204.41212C9.8877%203.53259%208.07406%203.46294%206.54504%204.22745Z'%20fill='%23F5C400'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpaletteh3c_24.svg
var flag_1_fill_light_tagpaletteh3c_24_default;
var init_flag_1_fill_light_tagpaletteh3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpaletteh3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22745L5%204.99997V14V21H6.25V13.3767C7.97141%2012.5683%2010.0075%2012.806%2011.4981%2013.9985L11.7248%2014.1798C13.1309%2015.3047%2015.0333%2015.5866%2016.7053%2014.9179L19%2014V4.99997L15.8955%205.62087C14.6758%205.86481%2013.409%205.64538%2012.3424%205.00543L11.3536%204.41212C9.8877%203.53259%208.07406%203.46294%206.54504%204.22745Z'%20fill='%239A38D7'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/flag_1_fill_light_tagpalettei3c_24.svg
var flag_1_fill_light_tagpalettei3c_24_default;
var init_flag_1_fill_light_tagpalettei3c_24 = __esmMin((() => {
	flag_1_fill_light_tagpalettei3c_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22745L5%204.99997V14V21H6.25V13.3767C7.97141%2012.5683%2010.0075%2012.806%2011.4981%2013.9985L11.7248%2014.1798C13.1309%2015.3047%2015.0333%2015.5866%2016.7053%2014.9179L19%2014V4.99997L15.8955%205.62087C14.6758%205.86481%2013.409%205.64538%2012.3424%205.00543L11.3536%204.41212C9.8877%203.53259%208.07406%203.46294%206.54504%204.22745Z'%20fill='%23DD4097'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_editpalette_themec4c_24.svg
var other_error_fill_light_editpalette_themec4c_24_default;
var init_other_error_fill_light_editpalette_themec4c_24 = __esmMin((() => {
	other_error_fill_light_editpalette_themec4c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%23808B9E'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpaletteb3c_24.svg
var other_error_fill_light_tagpaletteb3c_24_default;
var init_other_error_fill_light_tagpaletteb3c_24 = __esmMin((() => {
	other_error_fill_light_tagpaletteb3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%232972F4'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpalettec3c_24.svg
var other_error_fill_light_tagpalettec3c_24_default;
var init_other_error_fill_light_tagpalettec3c_24 = __esmMin((() => {
	other_error_fill_light_tagpalettec3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%2300A3F5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpaletted3c_24.svg
var other_error_fill_light_tagpaletted3c_24_default;
var init_other_error_fill_light_tagpaletted3c_24 = __esmMin((() => {
	other_error_fill_light_tagpaletted3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%2345B076'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpalettee3c_24.svg
var other_error_fill_light_tagpalettee3c_24_default;
var init_other_error_fill_light_tagpalettee3c_24 = __esmMin((() => {
	other_error_fill_light_tagpalettee3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%23DE3C36'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpalettef3c_24.svg
var other_error_fill_light_tagpalettef3c_24_default;
var init_other_error_fill_light_tagpalettef3c_24 = __esmMin((() => {
	other_error_fill_light_tagpalettef3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%23F88825'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpaletteg3c_24.svg
var other_error_fill_light_tagpaletteg3c_24_default;
var init_other_error_fill_light_tagpaletteg3c_24 = __esmMin((() => {
	other_error_fill_light_tagpaletteg3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%23F5C400'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpaletteh3c_24.svg
var other_error_fill_light_tagpaletteh3c_24_default;
var init_other_error_fill_light_tagpaletteh3c_24 = __esmMin((() => {
	other_error_fill_light_tagpaletteh3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%239A38D7'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_error_fill_light_tagpalettei3c_24.svg
var other_error_fill_light_tagpalettei3c_24_default;
var init_other_error_fill_light_tagpalettei3c_24 = __esmMin((() => {
	other_error_fill_light_tagpalettei3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.2%2021C17.1705%2021%2021.2%2016.9706%2021.2%2012C21.2%207.02944%2017.1705%203%2012.2%203C7.22939%203%203.19995%207.02944%203.19995%2012C3.19995%2016.9706%207.22939%2021%2012.2%2021ZM8.20478%2015.0759L11.2807%2012L8.2048%208.92407L9.08869%208.04019L12.1646%2011.1161L15.2758%208.00482L16.1597%208.88871L13.0485%2012L16.1598%2015.1113L15.2759%2015.9951L12.1646%2012.8839L9.08866%2015.9598L8.20478%2015.0759Z'%20fill='%23DD4097'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_editpalette_themec4c_24.svg
var other_love_fill_light_editpalette_themec4c_24_default;
var init_other_love_fill_light_editpalette_themec4c_24 = __esmMin((() => {
	other_love_fill_light_editpalette_themec4c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%23808B9E'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpaletteb3c_24.svg
var other_love_fill_light_tagpaletteb3c_24_default;
var init_other_love_fill_light_tagpaletteb3c_24 = __esmMin((() => {
	other_love_fill_light_tagpaletteb3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%232972F4'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpalettec3c_24.svg
var other_love_fill_light_tagpalettec3c_24_default;
var init_other_love_fill_light_tagpalettec3c_24 = __esmMin((() => {
	other_love_fill_light_tagpalettec3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%2300A3F5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpaletted3c_24.svg
var other_love_fill_light_tagpaletted3c_24_default;
var init_other_love_fill_light_tagpaletted3c_24 = __esmMin((() => {
	other_love_fill_light_tagpaletted3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%2345B076'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpalettee3c_24.svg
var other_love_fill_light_tagpalettee3c_24_default;
var init_other_love_fill_light_tagpalettee3c_24 = __esmMin((() => {
	other_love_fill_light_tagpalettee3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%23DE3C36'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpalettef3c_24.svg
var other_love_fill_light_tagpalettef3c_24_default;
var init_other_love_fill_light_tagpalettef3c_24 = __esmMin((() => {
	other_love_fill_light_tagpalettef3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%23F88825'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpaletteg3c_24.svg
var other_love_fill_light_tagpaletteg3c_24_default;
var init_other_love_fill_light_tagpaletteg3c_24 = __esmMin((() => {
	other_love_fill_light_tagpaletteg3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%23F5C400'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpaletteh3c_24.svg
var other_love_fill_light_tagpaletteh3c_24_default;
var init_other_love_fill_light_tagpaletteh3c_24 = __esmMin((() => {
	other_love_fill_light_tagpaletteh3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%239A38D7'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_love_fill_light_tagpalettei3c_24.svg
var other_love_fill_light_tagpalettei3c_24_default;
var init_other_love_fill_light_tagpalettei3c_24 = __esmMin((() => {
	other_love_fill_light_tagpalettei3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.5935%2019.4L6.01337%2013.0052C4.12901%2011.1739%204.12901%208.20476%206.01337%206.37347C7.84384%204.59454%2010.7791%204.54367%2012.6728%206.22086C14.567%204.61572%2017.4282%204.67493%2019.2128%206.40927C21.0768%208.22079%2021.0603%2011.1739%2019.176%2013.0052L19.1657%2013.0152L12.5958%2019.4L12.5947%2019.3988L12.5935%2019.4Z'%20fill='%23DD4097'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_editpalette_themec4c_24.svg
var other_pin_fill_light_editpalette_themec4c_24_default;
var init_other_pin_fill_light_editpalette_themec4c_24 = __esmMin((() => {
	other_pin_fill_light_editpalette_themec4c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%23808B9E'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpaletteb3c_24.svg
var other_pin_fill_light_tagpaletteb3c_24_default;
var init_other_pin_fill_light_tagpaletteb3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpaletteb3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%232972F4'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpalettec3c_24.svg
var other_pin_fill_light_tagpalettec3c_24_default;
var init_other_pin_fill_light_tagpalettec3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpalettec3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%2300A3F5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpaletted3c_24.svg
var other_pin_fill_light_tagpaletted3c_24_default;
var init_other_pin_fill_light_tagpaletted3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpaletted3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%2345B076'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpalettee3c_24.svg
var other_pin_fill_light_tagpalettee3c_24_default;
var init_other_pin_fill_light_tagpalettee3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpalettee3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%23DE3C36'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpalettef3c_24.svg
var other_pin_fill_light_tagpalettef3c_24_default;
var init_other_pin_fill_light_tagpalettef3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpalettef3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%23F88825'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpaletteg3c_24.svg
var other_pin_fill_light_tagpaletteg3c_24_default;
var init_other_pin_fill_light_tagpaletteg3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpaletteg3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%23F5C400'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpaletteh3c_24.svg
var other_pin_fill_light_tagpaletteh3c_24_default;
var init_other_pin_fill_light_tagpaletteh3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpaletteh3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%239A38D7'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_pin_fill_light_tagpalettei3c_24.svg
var other_pin_fill_light_tagpalettei3c_24_default;
var init_other_pin_fill_light_tagpalettei3c_24 = __esmMin((() => {
	other_pin_fill_light_tagpalettei3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7963%204.01461C15.601%203.81935%2015.2844%203.81935%2015.0892%204.01461L10.493%208.6108L5.16295%209.20303C4.74626%209.24933%204.56816%209.75707%204.86461%2010.0535L14.7071%2019.896C15.0036%2020.1925%2015.5113%2020.0144%2015.5576%2019.5977L16.1498%2014.2677L20.746%209.67146C20.9413%209.4762%2020.9413%209.15962%2020.746%208.96436L15.7963%204.01461ZM9.32615%2014.5153L5.79062%2018.0508L6.6745%2018.9347L10.21%2015.3991L9.32615%2014.5153Z'%20fill='%23DD4097'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_editpalette_themec4c_24.svg
var other_star_fill_light_editpalette_themec4c_24_default;
var init_other_star_fill_light_editpalette_themec4c_24 = __esmMin((() => {
	other_star_fill_light_editpalette_themec4c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%23808B9E'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpaletteb3c_24.svg
var other_star_fill_light_tagpaletteb3c_24_default;
var init_other_star_fill_light_tagpaletteb3c_24 = __esmMin((() => {
	other_star_fill_light_tagpaletteb3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%232972F4'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpalettec3c_24.svg
var other_star_fill_light_tagpalettec3c_24_default;
var init_other_star_fill_light_tagpalettec3c_24 = __esmMin((() => {
	other_star_fill_light_tagpalettec3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%2300A3F5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpaletted3c_24.svg
var other_star_fill_light_tagpaletted3c_24_default;
var init_other_star_fill_light_tagpaletted3c_24 = __esmMin((() => {
	other_star_fill_light_tagpaletted3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%2345B076'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpalettee3c_24.svg
var other_star_fill_light_tagpalettee3c_24_default;
var init_other_star_fill_light_tagpalettee3c_24 = __esmMin((() => {
	other_star_fill_light_tagpalettee3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%23DE3C36'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpalettef3c_24.svg
var other_star_fill_light_tagpalettef3c_24_default;
var init_other_star_fill_light_tagpalettef3c_24 = __esmMin((() => {
	other_star_fill_light_tagpalettef3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%23F88825'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpaletteg3c_24.svg
var other_star_fill_light_tagpaletteg3c_24_default;
var init_other_star_fill_light_tagpaletteg3c_24 = __esmMin((() => {
	other_star_fill_light_tagpaletteg3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%23F5C400'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpaletteh3c_24.svg
var other_star_fill_light_tagpaletteh3c_24_default;
var init_other_star_fill_light_tagpaletteh3c_24 = __esmMin((() => {
	other_star_fill_light_tagpaletteh3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%239A38D7'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/checkbox/other_star_fill_light_tagpalettei3c_24.svg
var other_star_fill_light_tagpalettei3c_24_default;
var init_other_star_fill_light_tagpalettei3c_24 = __esmMin((() => {
	other_star_fill_light_tagpalettei3c_24_default = "data:image/svg+xml,%3csvg%20width='25'%20height='25'%20viewBox='0%200%2025%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.696%204.0727C12.8091%204.13174%2012.9016%204.2232%2012.9612%204.3351L15.504%209.10364L20.8733%2010.0229C21.2187%2010.082%2021.4503%2010.407%2021.3905%2010.7488C21.3687%2010.8735%2021.3094%2010.9887%2021.2202%2011.0794L17.4225%2014.9458L18.1981%2020.2824C18.248%2020.6257%2018.0072%2020.9441%2017.6602%2020.9935C17.5336%2021.0115%2017.4045%2020.9912%2017.2897%2020.9354L12.3999%2018.5564L7.50995%2020.9354C7.19536%2021.0885%206.81494%2020.9602%206.66026%2020.6489C6.60384%2020.5354%206.58339%2020.4076%206.60159%2020.2824L7.37724%2014.9458L3.57947%2011.0794C3.33514%2010.8307%203.34087%2010.4331%203.59226%2010.1913C3.68395%2010.1031%203.80043%2010.0444%203.92643%2010.0229L9.2957%209.10364L11.8385%204.3351C12.002%204.02832%2012.386%203.91084%2012.696%204.0727Z'%20fill='%23DD4097'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/flag_1_fill_light_24.svg
var flag_1_fill_light_24_default;
var init_flag_1_fill_light_24 = __esmMin((() => {
	flag_1_fill_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.54504%204.22757L5%205.00009V14.0001V21.0001H6.25V13.3768C7.97141%2012.5685%2010.0075%2012.8061%2011.4981%2013.9986L11.7248%2014.18C13.1309%2015.3049%2015.0333%2015.5868%2016.7053%2014.918L19%2014.0001V5.00009L15.8955%205.621C14.6758%205.86493%2013.409%205.6455%2012.3424%205.00556L11.3536%204.41225C9.8877%203.53271%208.07406%203.46306%206.54504%204.22757Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/flag_1_outline_light_24.svg
var flag_1_outline_light_24_default;
var init_flag_1_outline_light_24 = __esmMin((() => {
	flag_1_outline_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5%2014.0001V12.8821V5.00009L6.54504%204.22757C8.07406%203.46306%209.8877%203.53271%2011.3536%204.41225L12.3424%205.00556C13.409%205.6455%2014.6758%205.86493%2015.8955%205.621L18%205.20009L19%205.00009V6.0199V14.0001L16.7053%2014.918C15.0333%2015.5868%2013.1309%2015.3049%2011.7248%2014.18L11.4981%2013.9986C10.0075%2012.8061%207.97141%2012.5685%206.25%2013.3768V21.0001H5V14.0001ZM6.25%2012.2916C8.21898%2011.5455%2010.4553%2011.8837%2012.1228%2013.2177L12.3495%2013.3991C13.4744%2014.299%2014.9963%2014.5245%2016.3339%2013.9895L18%2013.3231V6.2199L16.0916%206.60158C14.628%206.8943%2013.1078%206.63098%2011.8279%205.86305L10.8391%205.26974C9.66638%204.56611%208.21547%204.51039%206.99225%205.122L6.25%205.49313V12.2916Z'%20fill='black'%20fill-opacity='0.16'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_error_fill_light_24.svg
var other_error_fill_light_24_default;
var init_other_error_fill_light_24 = __esmMin((() => {
	other_error_fill_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%2021C16.9706%2021%2021%2016.9706%2021%2012C21%207.02944%2016.9706%203%2012%203C7.02944%203%203%207.02944%203%2012C3%2016.9706%207.02944%2021%2012%2021ZM8.00483%2015.0759L11.0807%2012L8.00485%208.92407L8.88873%208.04019L11.9646%2011.1161L15.0759%208.00482L15.9598%208.88871L12.8485%2012L15.9598%2015.1113L15.0759%2015.9951L11.9646%2012.8839L8.88871%2015.9598L8.00483%2015.0759Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_error_outline_light_24.svg
var other_error_outline_light_24_default;
var init_other_error_outline_light_24 = __esmMin((() => {
	other_error_outline_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M20%2012C20%2016.4183%2016.4183%2020%2012%2020C7.58172%2020%204%2016.4183%204%2012C4%207.58172%207.58172%204%2012%204C16.4183%204%2020%207.58172%2020%2012ZM21%2012C21%2016.9706%2016.9706%2021%2012%2021C7.02944%2021%203%2016.9706%203%2012C3%207.02944%207.02944%203%2012%203C16.9706%203%2021%207.02944%2021%2012ZM8.00483%2015.0757L11.0807%2011.9998L8.00485%208.92386L8.88873%208.03998L11.9646%2011.1159L15.0759%208.00461L15.9598%208.88849L12.8485%2011.9998L15.9598%2015.111L15.0759%2015.9949L11.9646%2012.8836L8.88871%2015.9596L8.00483%2015.0757Z'%20fill='black'%20fill-opacity='0.16'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_love_fill_light_24.svg
var other_love_fill_light_24_default;
var init_other_love_fill_light_24 = __esmMin((() => {
	other_love_fill_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.9934%2019.4L5.41327%2013.0052C3.52891%2011.1739%203.52891%208.20476%205.41327%206.37347C7.24374%204.59454%2010.179%204.54367%2012.0727%206.22086C13.9669%204.61572%2016.8281%204.67493%2018.6127%206.40927C20.4767%208.22079%2020.4603%2011.1739%2018.5759%2013.0052L18.5656%2013.0152L11.9957%2019.4L11.9946%2019.3988L11.9934%2019.4Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_love_outline_light_24.svg
var other_love_outline_light_24_default;
var init_other_love_outline_light_24 = __esmMin((() => {
	other_love_outline_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.7412%206.59516L12.0654%206.88237L12.3959%206.60232C14.099%205.1591%2016.6693%205.21775%2018.2643%206.76784C19.9224%208.37929%2019.9136%2011.0079%2018.2274%2012.6466L18.2176%2012.6561L18.2171%2012.6566L11.996%2018.7025L11.9911%2018.6977L11.9897%2018.6992L5.76174%2012.6466C4.07942%2011.0117%204.07942%208.36697%205.76174%206.73203C7.40332%205.13668%2010.042%205.09028%2011.7412%206.59516Z'%20stroke='black'%20stroke-opacity='0.16'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_pin_fill_light_24.svg
var other_pin_fill_light_24_default;
var init_other_pin_fill_light_24 = __esmMin((() => {
	other_pin_fill_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.9962%204.01461C14.801%203.81935%2014.4844%203.81935%2014.2891%204.01461L9.69291%208.6108L4.3629%209.20303C3.94621%209.24933%203.76811%209.75707%204.06456%2010.0535L13.9071%2019.896C14.2035%2020.1925%2014.7112%2020.0144%2014.7575%2019.5977L15.3498%2014.2677L19.946%209.67146C20.1412%209.4762%2020.1412%209.15962%2019.946%208.96436L14.9962%204.01461ZM8.5261%2014.5153L4.99057%2018.0508L5.87445%2018.9347L9.40999%2015.3991L8.5261%2014.5153Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_pin_outline_light_24.svg
var other_pin_outline_light_24_default;
var init_other_pin_outline_light_24 = __esmMin((() => {
	other_pin_outline_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.6427%2013.5606L14.3946%2013.8086L14.3559%2014.1572L13.8785%2018.4533L5.50728%2010.082L9.80335%209.60469L10.152%209.56595L10.4%209.31791L14.6427%205.07527L18.8853%209.31791L14.6427%2013.5606ZM4.3629%209.20303L9.69291%208.6108L14.2891%204.01461C14.4844%203.81935%2014.801%203.81935%2014.9962%204.01461L19.946%208.96436C20.1412%209.15962%2020.1412%209.4762%2019.946%209.67146L15.3498%2014.2677L14.7575%2019.5977C14.7112%2020.0144%2014.2035%2020.1925%2013.9071%2019.896L4.06456%2010.0535C3.76811%209.75707%203.94621%209.24933%204.3629%209.20303ZM8.5261%2014.5153L4.99057%2018.0508L5.87445%2018.9347L9.40999%2015.3991L8.5261%2014.5153Z'%20fill='black'%20fill-opacity='0.16'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_star_fill_light_24.svg
var other_star_fill_light_24_default;
var init_other_star_fill_light_24 = __esmMin((() => {
	other_star_fill_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='25'%20viewBox='0%200%2024%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.2961%204.0727C12.4092%204.13174%2012.5017%204.2232%2012.5613%204.3351L15.1041%209.10364L20.4734%2010.0229C20.8188%2010.082%2021.0504%2010.407%2020.9906%2010.7488C20.9688%2010.8735%2020.9095%2010.9887%2020.8203%2011.0794L17.0226%2014.9458L17.7982%2020.2824C17.8481%2020.6257%2017.6073%2020.9441%2017.2603%2020.9935C17.1337%2021.0115%2017.0046%2020.9912%2016.8898%2020.9354L11.9999%2018.5564L7.11005%2020.9354C6.79546%2021.0885%206.41504%2020.9602%206.26036%2020.6489C6.20393%2020.5354%206.18348%2020.4076%206.20169%2020.2824L6.97733%2014.9458L3.17956%2011.0794C2.93524%2010.8307%202.94096%2010.4331%203.19235%2010.1913C3.28405%2010.1031%203.40053%2010.0444%203.52653%2010.0229L8.8958%209.10364L11.4385%204.3351C11.6021%204.02832%2011.9861%203.91084%2012.2961%204.0727Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/other_star_outline_light_24.svg
var other_star_outline_light_24_default;
var init_other_star_outline_light_24 = __esmMin((() => {
	other_star_outline_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='25'%20viewBox='0%200%2024%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.0648%204.51594C12.0891%204.52867%2012.1082%204.54791%2012.1202%204.57036L14.2017%208.47402C14.5654%209.15601%2015.224%209.63145%2015.9858%209.76187L20.389%2010.5157C20.4662%2010.5289%2020.5093%2010.5982%2020.4981%2010.6627C20.4938%2010.687%2020.4821%2010.7102%2020.4636%2010.7291L17.3609%2013.8878C16.8135%2014.4451%2016.5581%2015.2262%2016.6704%2015.9992L17.3034%2020.3543C17.3128%2020.4191%2017.2677%2020.4874%2017.1898%2020.4985C17.1618%2020.5024%2017.1335%2020.4979%2017.1086%2020.4858L13.0937%2018.5325C12.4032%2018.1966%2011.5967%2018.1966%2010.9062%2018.5325L6.89131%2020.4858C6.82084%2020.5201%206.7393%2020.4892%206.70812%2020.4264C6.69686%2020.4038%206.69294%2020.3787%206.69649%2020.3543L7.32947%2015.9992C7.44183%2015.2262%207.18638%2014.4451%206.63898%2013.8878L3.53627%2010.7291C3.487%2010.6789%203.48797%2010.6007%203.53893%2010.5517C3.55808%2010.5333%203.58308%2010.5204%203.6109%2010.5157L8.01407%209.76187C8.77587%209.63145%209.43452%209.15601%209.79818%208.47402L11.8797%204.57036C11.9129%204.50819%2011.9955%204.47979%2012.0648%204.51594Z'%20stroke='black'%20stroke-opacity='0.16'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_16_checkbox_green.svg
var basic_16_checkbox_green_default;
var init_basic_16_checkbox_green = __esmMin((() => {
	basic_16_checkbox_green_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='none'%20viewBox='0%200%2016%2016'%3e%3crect%20width='16'%20height='16'%20fill='%2300AA5B'%20rx='2'/%3e%3cpath%20fill='%23fff'%20fill-rule='evenodd'%20d='m4.148%207.37%202.634%202.56L11.852%205%2013%206.117l-5.931%205.767a.414.414%200%200%201-.574%200L3%208.486l1.148-1.117Z'%20clip-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_16_checkbox_normal.svg
var basic_16_checkbox_normal_default;
var init_basic_16_checkbox_normal = __esmMin((() => {
	basic_16_checkbox_normal_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_16_checkbox_normal%3c/title%3e%3cg%20id='database视觉（sidebar，talbe，view）'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20stroke-opacity='0.16'%3e%3cg%20id='icon集合'%20transform='translate(-130.000000,%20-203.000000)'%20fill='%23FFFFFF'%20stroke='%23000000'%3e%3cg%20id='矩形'%20transform='translate(130.000000,%20203.000000)'%3e%3crect%20x='0.5'%20y='0.5'%20width='15'%20height='15'%20rx='2'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/checkbox_24_off_nor.svg
var checkbox_24_off_nor_default;
var init_checkbox_24_off_nor = __esmMin((() => {
	checkbox_24_off_nor_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='4.5'%20y='4.5'%20width='15'%20height='15'%20rx='1.5'%20stroke='black'%20stroke-opacity='0.16'%20style='stroke:black;stroke:black;stroke-opacity:0.16;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/checkbox_24_off_nor_dark_16.svg
var checkbox_24_off_nor_dark_16_default;
var init_checkbox_24_off_nor_dark_16 = __esmMin((() => {
	checkbox_24_off_nor_dark_16_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18%204.5H6C5.17157%204.5%204.5%205.17157%204.5%206V18C4.5%2018.8284%205.17157%2019.5%206%2019.5H18C18.8284%2019.5%2019.5%2018.8284%2019.5%2018V6C19.5%205.17157%2018.8284%204.5%2018%204.5Z'%20stroke='white'%20stroke-opacity='0.2'%20style='stroke:white;stroke-opacity:0.2;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/checkbox_24_on_nor.svg
var checkbox_24_on_nor_default;
var init_checkbox_24_on_nor = __esmMin((() => {
	checkbox_24_on_nor_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3echeckbox_24_on_nor%3c/title%3e%3cg%20id='主框架'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='列表状态&amp;图标资源'%20transform='translate(-2466.000000,%20-653.000000)'%3e%3cg%20id='图标'%20transform='translate(2466.000000,%20337.000000)'%3e%3cg%20id='编组-52'%20transform='translate(0.000000,%20206.000000)'%3e%3cg%20id='编组'%20transform='translate(4.000000,%20114.000000)'%3e%3crect%20id='矩形'%20fill='%231E6FFF'%20x='0'%20y='0'%20width='16'%20height='16'%20rx='2'%3e%3c/rect%3e%3cpath%20d='M4.14848712,7.36914399%20L6.78168097,9.92974494%20L11.8515129,5%20L13,6.11682519%20L7.06896723,11.884349%20C6.91039425,12.0385503%206.65329665,12.0385503%206.49472367,11.884349%20L3,8.48596918%20L4.14848712,7.36914399%20Z'%20id='路径'%20fill='%23FFFFFF'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
})), CheckboxType, CheckboxIcons, CheckboxIconsMapList, checkboxIconUrlMap, CHECKBOX_ICON_URL_LIST, CHECKBOX_OPTIONS_FOR_SMART_SHEET, getCheckboxIconAliasIndex;
var init_checkbox_icon = __esmMin((() => {
	init_checkbox_fill_lignt_editpalette_themec4c_24();
	init_checkbox_fill_lignt_tagpaletteb3c_24();
	init_checkbox_fill_lignt_tagpalettec3c_24();
	init_checkbox_fill_lignt_tagpaletted3c_24();
	init_checkbox_fill_lignt_tagpalettee3c_24();
	init_checkbox_fill_lignt_tagpalettef3c_24();
	init_checkbox_fill_lignt_tagpaletteg3c_24();
	init_checkbox_fill_lignt_tagpaletteh3c_24();
	init_checkbox_fill_lignt_tagpalettei3c_24();
	init_flag_1_fill_light_editpalette_themec4c_24();
	init_flag_1_fill_light_tagpaletteb3c_24();
	init_flag_1_fill_light_tagpalettec3c_24();
	init_flag_1_fill_light_tagpaletted3c_24();
	init_flag_1_fill_light_tagpalettee3c_24();
	init_flag_1_fill_light_tagpalettef3c_24();
	init_flag_1_fill_light_tagpaletteg3c_24();
	init_flag_1_fill_light_tagpaletteh3c_24();
	init_flag_1_fill_light_tagpalettei3c_24();
	init_other_error_fill_light_editpalette_themec4c_24();
	init_other_error_fill_light_tagpaletteb3c_24();
	init_other_error_fill_light_tagpalettec3c_24();
	init_other_error_fill_light_tagpaletted3c_24();
	init_other_error_fill_light_tagpalettee3c_24();
	init_other_error_fill_light_tagpalettef3c_24();
	init_other_error_fill_light_tagpaletteg3c_24();
	init_other_error_fill_light_tagpaletteh3c_24();
	init_other_error_fill_light_tagpalettei3c_24();
	init_other_love_fill_light_editpalette_themec4c_24();
	init_other_love_fill_light_tagpaletteb3c_24();
	init_other_love_fill_light_tagpalettec3c_24();
	init_other_love_fill_light_tagpaletted3c_24();
	init_other_love_fill_light_tagpalettee3c_24();
	init_other_love_fill_light_tagpalettef3c_24();
	init_other_love_fill_light_tagpaletteg3c_24();
	init_other_love_fill_light_tagpaletteh3c_24();
	init_other_love_fill_light_tagpalettei3c_24();
	init_other_pin_fill_light_editpalette_themec4c_24();
	init_other_pin_fill_light_tagpaletteb3c_24();
	init_other_pin_fill_light_tagpalettec3c_24();
	init_other_pin_fill_light_tagpaletted3c_24();
	init_other_pin_fill_light_tagpalettee3c_24();
	init_other_pin_fill_light_tagpalettef3c_24();
	init_other_pin_fill_light_tagpaletteg3c_24();
	init_other_pin_fill_light_tagpaletteh3c_24();
	init_other_pin_fill_light_tagpalettei3c_24();
	init_other_star_fill_light_editpalette_themec4c_24();
	init_other_star_fill_light_tagpaletteb3c_24();
	init_other_star_fill_light_tagpalettec3c_24();
	init_other_star_fill_light_tagpaletted3c_24();
	init_other_star_fill_light_tagpalettee3c_24();
	init_other_star_fill_light_tagpalettef3c_24();
	init_other_star_fill_light_tagpaletteg3c_24();
	init_other_star_fill_light_tagpaletteh3c_24();
	init_other_star_fill_light_tagpalettei3c_24();
	init_flag_1_fill_light_24();
	init_flag_1_outline_light_24();
	init_other_error_fill_light_24();
	init_other_error_outline_light_24();
	init_other_love_fill_light_24();
	init_other_love_outline_light_24();
	init_other_pin_fill_light_24();
	init_other_pin_outline_light_24();
	init_other_star_fill_light_24();
	init_other_star_outline_light_24();
	init_basic_16_checkbox_green();
	init_basic_16_checkbox_normal();
	init_checkbox_24_off_nor();
	init_checkbox_24_off_nor_dark_16();
	init_checkbox_24_on_nor();
	init_es();
	init_es$1();
	(function(CheckboxType) {
		CheckboxType["CHECKBOX_UNCHECKED"] = "CHECKBOX_UNCHECKED";
		CheckboxType["CHECKBOX_CHECKED"] = "CHECKBOX_CHECKED";
		CheckboxType["CHECKBOX_CELL_UNCHECKED"] = "CHECKBOX_CELL_UNCHECKED";
		CheckboxType["CHECKBOX_CELL_CHECKED"] = "CHECKBOX_CELL_CHECKED";
		CheckboxType["CHECKBOX_FLAG_CHECKED"] = "CHECKBOX_FLAG_CHECKED";
		CheckboxType["CHECKBOX_FLAG_UNCHECKED"] = "CHECKBOX_FLAG_UNCHECKED";
		CheckboxType["CHECKBOX_FLAG_CHECKED_GREEN"] = "CHECKBOX_FLAG_CHECKED_GREEN";
		CheckboxType["CHECKBOX_FLAG_CHECKED_SKY_BLUE"] = "CHECKBOX_FLAG_CHECKED_SKY_BLUE";
		CheckboxType["CHECKBOX_FLAG_CHECKED_BLUE"] = "CHECKBOX_FLAG_CHECKED_BLUE";
		CheckboxType["CHECKBOX_FLAG_CHECKED_PURPLE"] = "CHECKBOX_FLAG_CHECKED_PURPLE";
		CheckboxType["CHECKBOX_FLAG_CHECKED_PINK"] = "CHECKBOX_FLAG_CHECKED_PINK";
		CheckboxType["CHECKBOX_FLAG_CHECKED_RED"] = "CHECKBOX_FLAG_CHECKED_RED";
		CheckboxType["CHECKBOX_FLAG_CHECKED_ORANGE"] = "CHECKBOX_FLAG_CHECKED_ORANGE";
		CheckboxType["CHECKBOX_FLAG_CHECKED_YELLOW"] = "CHECKBOX_FLAG_CHECKED_YELLOW";
		CheckboxType["CHECKBOX_FLAG_CHECKED_GRAY"] = "CHECKBOX_FLAG_CHECKED_GRAY";
		CheckboxType["CHECKBOX_PIN_UNCHECKED"] = "CHECKBOX_PIN_UNCHECKED";
		CheckboxType["CHECKBOX_PIN_CHECKED"] = "CHECKBOX_PIN_CHECKED";
		CheckboxType["CHECKBOX_PIN_CHECKED_GREEN"] = "CHECKBOX_PIN_CHECKED_GREEN";
		CheckboxType["CHECKBOX_PIN_CHECKED_SKY_BLUE"] = "CHECKBOX_PIN_CHECKED_SKY_BLUE";
		CheckboxType["CHECKBOX_PIN_CHECKED_BLUE"] = "CHECKBOX_PIN_CHECKED_BLUE";
		CheckboxType["CHECKBOX_PIN_CHECKED_PURPLE"] = "CHECKBOX_PIN_CHECKED_PURPLE";
		CheckboxType["CHECKBOX_PIN_CHECKED_PINK"] = "CHECKBOX_PIN_CHECKED_PINK";
		CheckboxType["CHECKBOX_PIN_CHECKED_RED"] = "CHECKBOX_PIN_CHECKED_RED";
		CheckboxType["CHECKBOX_PIN_CHECKED_ORANGE"] = "CHECKBOX_PIN_CHECKED_ORANGE";
		CheckboxType["CHECKBOX_PIN_CHECKED_YELLOW"] = "CHECKBOX_PIN_CHECKED_YELLOW";
		CheckboxType["CHECKBOX_PIN_CHECKED_GRAY"] = "CHECKBOX_PIN_CHECKED_GRAY";
		CheckboxType["CHECKBOX_CANCEL_UNCHECKED"] = "CHECKBOX_CANCEL_UNCHECKED";
		CheckboxType["CHECKBOX_CANCEL_CHECKED"] = "CHECKBOX_CANCEL_CHECKED";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_GREEN"] = "CHECKBOX_CANCEL_CHECKED_GREEN";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_SKY_BLUE"] = "CHECKBOX_CANCEL_CHECKED_SKY_BLUE";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_BLUE"] = "CHECKBOX_CANCEL_CHECKED_BLUE";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_PURPLE"] = "CHECKBOX_CANCEL_CHECKED_PURPLE";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_PINK"] = "CHECKBOX_CANCEL_CHECKED_PINK";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_RED"] = "CHECKBOX_CANCEL_CHECKED_RED";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_ORANGE"] = "CHECKBOX_CANCEL_CHECKED_ORANGE";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_YELLOW"] = "CHECKBOX_CANCEL_CHECKED_YELLOW";
		CheckboxType["CHECKBOX_CANCEL_CHECKED_GRAY"] = "CHECKBOX_CANCEL_CHECKED_GRAY";
		CheckboxType["CHECKBOX_LOVE_UNCHECKED"] = "CHECKBOX_LOVE_UNCHECKED";
		CheckboxType["CHECKBOX_LOVE_CHECKED"] = "CHECKBOX_LOVE_CHECKED";
		CheckboxType["CHECKBOX_LOVE_CHECKED_GREEN"] = "CHECKBOX_LOVE_CHECKED_GREEN";
		CheckboxType["CHECKBOX_LOVE_CHECKED_SKY_BLUE"] = "CHECKBOX_LOVE_CHECKED_SKY_BLUE";
		CheckboxType["CHECKBOX_LOVE_CHECKED_BLUE"] = "CHECKBOX_LOVE_CHECKED_BLUE";
		CheckboxType["CHECKBOX_LOVE_CHECKED_PURPLE"] = "CHECKBOX_LOVE_CHECKED_PURPLE";
		CheckboxType["CHECKBOX_LOVE_CHECKED_PINK"] = "CHECKBOX_LOVE_CHECKED_PINK";
		CheckboxType["CHECKBOX_LOVE_CHECKED_RED"] = "CHECKBOX_LOVE_CHECKED_RED";
		CheckboxType["CHECKBOX_LOVE_CHECKED_ORANGE"] = "CHECKBOX_LOVE_CHECKED_ORANGE";
		CheckboxType["CHECKBOX_LOVE_CHECKED_YELLOW"] = "CHECKBOX_LOVE_CHECKED_YELLOW";
		CheckboxType["CHECKBOX_LOVE_CHECKED_GRAY"] = "CHECKBOX_LOVE_CHECKED_GRAY";
		CheckboxType["CHECKBOX_STAR_UNCHECKED"] = "CHECKBOX_STAR_UNCHECKED";
		CheckboxType["CHECKBOX_STAR_CHECKED"] = "CHECKBOX_STAR_CHECKED";
		CheckboxType["CHECKBOX_STAR_CHECKED_GREEN"] = "CHECKBOX_STAR_CHECKED_GREEN";
		CheckboxType["CHECKBOX_STAR_CHECKED_SKY_BLUE"] = "CHECKBOX_STAR_CHECKED_SKY_BLUE";
		CheckboxType["CHECKBOX_STAR_CHECKED_BLUE"] = "CHECKBOX_STAR_CHECKED_BLUE";
		CheckboxType["CHECKBOX_STAR_CHECKED_PURPLE"] = "CHECKBOX_STAR_CHECKED_PURPLE";
		CheckboxType["CHECKBOX_STAR_CHECKED_PINK"] = "CHECKBOX_STAR_CHECKED_PINK";
		CheckboxType["CHECKBOX_STAR_CHECKED_RED"] = "CHECKBOX_STAR_CHECKED_RED";
		CheckboxType["CHECKBOX_STAR_CHECKED_ORANGE"] = "CHECKBOX_STAR_CHECKED_ORANGE";
		CheckboxType["CHECKBOX_STAR_CHECKED_YELLOW"] = "CHECKBOX_STAR_CHECKED_YELLOW";
		CheckboxType["CHECKBOX_STAR_CHECKED_GRAY"] = "CHECKBOX_STAR_CHECKED_GRAY";
		CheckboxType["CHECKBOX_TICK_UNCHECKED"] = "CHECKBOX_TICK_UNCHECKED";
		CheckboxType["CHECKBOX_TICK_UNCHECKED_DARK"] = "CHECKBOX_TICK_UNCHECKED_DARK";
		CheckboxType["CHECKBOX_TICK_CHECKED"] = "CHECKBOX_TICK_CHECKED";
		CheckboxType["CHECKBOX_TICK_CHECKED_GREEN"] = "CHECKBOX_TICK_CHECKED_GREEN";
		CheckboxType["CHECKBOX_TICK_CHECKED_SKY_BLUE"] = "CHECKBOX_TICK_CHECKED_SKY_BLUE";
		CheckboxType["CHECKBOX_TICK_CHECKED_BLUE"] = "CHECKBOX_TICK_CHECKED_BLUE";
		CheckboxType["CHECKBOX_TICK_CHECKED_PURPLE"] = "CHECKBOX_TICK_CHECKED_PURPLE";
		CheckboxType["CHECKBOX_TICK_CHECKED_PINK"] = "CHECKBOX_TICK_CHECKED_PINK";
		CheckboxType["CHECKBOX_TICK_CHECKED_RED"] = "CHECKBOX_TICK_CHECKED_RED";
		CheckboxType["CHECKBOX_TICK_CHECKED_ORANGE"] = "CHECKBOX_TICK_CHECKED_ORANGE";
		CheckboxType["CHECKBOX_TICK_CHECKED_YELLOW"] = "CHECKBOX_TICK_CHECKED_YELLOW";
		CheckboxType["CHECKBOX_TICK_CHECKED_GRAY"] = "CHECKBOX_TICK_CHECKED_GRAY";
	})(CheckboxType || (CheckboxType = {}));
	CheckboxIcons = {
		[CheckboxType.CHECKBOX_UNCHECKED]: checkbox_24_off_nor_default,
		[CheckboxType.CHECKBOX_CHECKED]: checkbox_24_on_nor_default,
		[CheckboxType.CHECKBOX_CELL_UNCHECKED]: basic_16_checkbox_normal_default,
		[CheckboxType.CHECKBOX_CELL_CHECKED]: basic_16_checkbox_green_default,
		[CheckboxType.CHECKBOX_PIN_UNCHECKED]: other_pin_outline_light_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED]: other_pin_fill_light_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_GREEN]: other_pin_fill_light_tagpaletted3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_SKY_BLUE]: other_pin_fill_light_tagpalettec3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_BLUE]: other_pin_fill_light_tagpaletteb3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_PURPLE]: other_pin_fill_light_tagpaletteh3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_PINK]: other_pin_fill_light_tagpalettei3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_RED]: other_pin_fill_light_tagpalettee3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_YELLOW]: other_pin_fill_light_tagpalettef3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_ORANGE]: other_pin_fill_light_tagpaletteg3c_24_default,
		[CheckboxType.CHECKBOX_PIN_CHECKED_GRAY]: other_pin_fill_light_editpalette_themec4c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_UNCHECKED]: other_error_outline_light_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED]: other_error_fill_light_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_GREEN]: other_error_fill_light_tagpaletted3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_SKY_BLUE]: other_error_fill_light_tagpalettec3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_BLUE]: other_error_fill_light_tagpaletteb3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_PURPLE]: other_error_fill_light_tagpaletteh3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_PINK]: other_error_fill_light_tagpalettei3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_RED]: other_error_fill_light_tagpalettee3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_YELLOW]: other_error_fill_light_tagpalettef3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_ORANGE]: other_error_fill_light_tagpaletteg3c_24_default,
		[CheckboxType.CHECKBOX_CANCEL_CHECKED_GRAY]: other_error_fill_light_editpalette_themec4c_24_default,
		[CheckboxType.CHECKBOX_FLAG_UNCHECKED]: flag_1_outline_light_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED]: flag_1_fill_light_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_GREEN]: flag_1_fill_light_tagpaletted3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_SKY_BLUE]: flag_1_fill_light_tagpalettec3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_BLUE]: flag_1_fill_light_tagpaletteb3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_PURPLE]: flag_1_fill_light_tagpaletteh3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_PINK]: flag_1_fill_light_tagpalettei3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_RED]: flag_1_fill_light_tagpalettee3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_YELLOW]: flag_1_fill_light_tagpalettef3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_ORANGE]: flag_1_fill_light_tagpaletteg3c_24_default,
		[CheckboxType.CHECKBOX_FLAG_CHECKED_GRAY]: flag_1_fill_light_editpalette_themec4c_24_default,
		[CheckboxType.CHECKBOX_LOVE_UNCHECKED]: other_love_outline_light_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED]: other_love_fill_light_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_GREEN]: other_love_fill_light_tagpaletted3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_SKY_BLUE]: other_love_fill_light_tagpalettec3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_BLUE]: other_love_fill_light_tagpaletteb3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_PURPLE]: other_love_fill_light_tagpaletteh3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_PINK]: other_love_fill_light_tagpalettei3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_RED]: other_love_fill_light_tagpalettee3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_YELLOW]: other_love_fill_light_tagpalettef3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_ORANGE]: other_love_fill_light_tagpaletteg3c_24_default,
		[CheckboxType.CHECKBOX_LOVE_CHECKED_GRAY]: other_love_fill_light_editpalette_themec4c_24_default,
		[CheckboxType.CHECKBOX_STAR_UNCHECKED]: other_star_outline_light_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED]: other_star_fill_light_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_GREEN]: other_star_fill_light_tagpaletted3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_SKY_BLUE]: other_star_fill_light_tagpalettec3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_BLUE]: other_star_fill_light_tagpaletteb3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_PURPLE]: other_star_fill_light_tagpaletteh3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_PINK]: other_star_fill_light_tagpalettei3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_RED]: other_star_fill_light_tagpalettee3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_YELLOW]: other_star_fill_light_tagpalettef3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_ORANGE]: other_star_fill_light_tagpaletteg3c_24_default,
		[CheckboxType.CHECKBOX_STAR_CHECKED_GRAY]: other_star_fill_light_editpalette_themec4c_24_default,
		[CheckboxType.CHECKBOX_TICK_UNCHECKED]: checkbox_24_off_nor_default,
		[CheckboxType.CHECKBOX_TICK_UNCHECKED_DARK]: checkbox_24_off_nor_dark_16_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED]: checkbox_24_on_nor_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_GREEN]: checkbox_fill_lignt_tagpaletted3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_SKY_BLUE]: checkbox_fill_lignt_tagpalettec3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_BLUE]: checkbox_fill_lignt_tagpaletteb3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_PURPLE]: checkbox_fill_lignt_tagpaletteh3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_PINK]: checkbox_fill_lignt_tagpalettei3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_RED]: checkbox_fill_lignt_tagpalettee3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_YELLOW]: checkbox_fill_lignt_tagpalettef3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_ORANGE]: checkbox_fill_lignt_tagpaletteg3c_24_default,
		[CheckboxType.CHECKBOX_TICK_CHECKED_GRAY]: checkbox_fill_lignt_editpalette_themec4c_24_default
	};
	CheckboxIconsMapList = {
		[CheckboxType.CHECKBOX_PIN_CHECKED]: [
			CheckboxType.CHECKBOX_PIN_CHECKED_GREEN,
			CheckboxType.CHECKBOX_PIN_CHECKED_SKY_BLUE,
			CheckboxType.CHECKBOX_PIN_CHECKED_BLUE,
			CheckboxType.CHECKBOX_PIN_CHECKED_PURPLE,
			CheckboxType.CHECKBOX_PIN_CHECKED_PINK,
			CheckboxType.CHECKBOX_PIN_CHECKED_RED,
			CheckboxType.CHECKBOX_PIN_CHECKED_YELLOW,
			CheckboxType.CHECKBOX_PIN_CHECKED_ORANGE,
			CheckboxType.CHECKBOX_PIN_CHECKED_GRAY
		],
		[CheckboxType.CHECKBOX_CANCEL_CHECKED]: [
			CheckboxType.CHECKBOX_CANCEL_CHECKED_GREEN,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_SKY_BLUE,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_BLUE,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_PURPLE,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_PINK,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_RED,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_YELLOW,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_ORANGE,
			CheckboxType.CHECKBOX_CANCEL_CHECKED_GRAY
		],
		[CheckboxType.CHECKBOX_FLAG_CHECKED]: [
			CheckboxType.CHECKBOX_FLAG_CHECKED_GREEN,
			CheckboxType.CHECKBOX_FLAG_CHECKED_SKY_BLUE,
			CheckboxType.CHECKBOX_FLAG_CHECKED_BLUE,
			CheckboxType.CHECKBOX_FLAG_CHECKED_PURPLE,
			CheckboxType.CHECKBOX_FLAG_CHECKED_PINK,
			CheckboxType.CHECKBOX_FLAG_CHECKED_RED,
			CheckboxType.CHECKBOX_FLAG_CHECKED_YELLOW,
			CheckboxType.CHECKBOX_FLAG_CHECKED_ORANGE,
			CheckboxType.CHECKBOX_FLAG_CHECKED_GRAY
		],
		[CheckboxType.CHECKBOX_LOVE_CHECKED]: [
			CheckboxType.CHECKBOX_LOVE_CHECKED_GREEN,
			CheckboxType.CHECKBOX_LOVE_CHECKED_SKY_BLUE,
			CheckboxType.CHECKBOX_LOVE_CHECKED_BLUE,
			CheckboxType.CHECKBOX_LOVE_CHECKED_PURPLE,
			CheckboxType.CHECKBOX_LOVE_CHECKED_PINK,
			CheckboxType.CHECKBOX_LOVE_CHECKED_RED,
			CheckboxType.CHECKBOX_LOVE_CHECKED_YELLOW,
			CheckboxType.CHECKBOX_LOVE_CHECKED_ORANGE,
			CheckboxType.CHECKBOX_LOVE_CHECKED_GRAY
		],
		[CheckboxType.CHECKBOX_STAR_CHECKED]: [
			CheckboxType.CHECKBOX_STAR_CHECKED_GREEN,
			CheckboxType.CHECKBOX_STAR_CHECKED_SKY_BLUE,
			CheckboxType.CHECKBOX_STAR_CHECKED_BLUE,
			CheckboxType.CHECKBOX_STAR_CHECKED_PURPLE,
			CheckboxType.CHECKBOX_STAR_CHECKED_PINK,
			CheckboxType.CHECKBOX_STAR_CHECKED_RED,
			CheckboxType.CHECKBOX_STAR_CHECKED_YELLOW,
			CheckboxType.CHECKBOX_STAR_CHECKED_ORANGE,
			CheckboxType.CHECKBOX_STAR_CHECKED_GRAY
		],
		[CheckboxType.CHECKBOX_TICK_CHECKED]: [
			CheckboxType.CHECKBOX_TICK_CHECKED_GREEN,
			CheckboxType.CHECKBOX_TICK_CHECKED_SKY_BLUE,
			CheckboxType.CHECKBOX_TICK_CHECKED_BLUE,
			CheckboxType.CHECKBOX_TICK_CHECKED_PURPLE,
			CheckboxType.CHECKBOX_TICK_CHECKED_PINK,
			CheckboxType.CHECKBOX_TICK_CHECKED_RED,
			CheckboxType.CHECKBOX_TICK_CHECKED_YELLOW,
			CheckboxType.CHECKBOX_TICK_CHECKED_ORANGE,
			CheckboxType.CHECKBOX_TICK_CHECKED_GRAY
		]
	};
	checkboxIconUrlMap = {
		[CheckboxIconType.CANCEL]: CheckboxIcons[CheckboxType.CHECKBOX_CANCEL_CHECKED],
		[CheckboxIconType.PIN]: CheckboxIcons[CheckboxType.CHECKBOX_PIN_CHECKED],
		[CheckboxIconType.TICK]: CheckboxIcons[CheckboxType.CHECKBOX_CELL_CHECKED],
		[CheckboxIconType.FLAG]: CheckboxIcons[CheckboxType.CHECKBOX_FLAG_CHECKED],
		[CheckboxIconType.LOVE]: CheckboxIcons[CheckboxType.CHECKBOX_LOVE_CHECKED],
		[CheckboxIconType.STAR]: CheckboxIcons[CheckboxType.CHECKBOX_STAR_CHECKED]
	};
	CheckboxIcons[CheckboxType.CHECKBOX_CELL_UNCHECKED], CheckboxIcons[CheckboxType.CHECKBOX_CANCEL_UNCHECKED], CheckboxIcons[CheckboxType.CHECKBOX_STAR_UNCHECKED], CheckboxIcons[CheckboxType.CHECKBOX_LOVE_UNCHECKED], CheckboxIcons[CheckboxType.CHECKBOX_PIN_UNCHECKED], CheckboxIcons[CheckboxType.CHECKBOX_FLAG_UNCHECKED];
	CHECKBOX_ICON_URL_LIST = [
		checkboxIconUrlMap[CheckboxIconType.TICK],
		checkboxIconUrlMap[CheckboxIconType.CANCEL],
		checkboxIconUrlMap[CheckboxIconType.STAR],
		checkboxIconUrlMap[CheckboxIconType.LOVE],
		checkboxIconUrlMap[CheckboxIconType.PIN],
		checkboxIconUrlMap[CheckboxIconType.FLAG]
	];
	CHECKBOX_OPTIONS_FOR_SMART_SHEET = [
		{
			color: selectOptionStyle[OptionStyle.tagpalette_D3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_D3
		},
		{
			color: selectOptionStyle[OptionStyle.tagpalette_C3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_C3
		},
		{
			color: selectOptionStyle[OptionStyle.tagpalette_B3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_B3
		},
		{
			color: selectOptionStyle[OptionStyle.tagpalette_H3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_H3
		},
		{
			color: selectOptionStyle[OptionStyle.tagpalette_I3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_I3
		},
		{
			color: selectOptionStyle[OptionStyle.tagpalette_E3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_E3
		},
		{
			color: selectOptionStyle[OptionStyle.tagpalette_F3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_F3
		},
		{
			color: selectOptionStyle[OptionStyle.tagpalette_G3].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.tagpalette_G3
		},
		{
			color: selectOptionStyle[OptionStyle.editpalette_theme_C4].background,
			srcIcon: CHECKBOX_ICON_URL_LIST,
			style: OptionStyle.editpalette_theme_C4
		}
	];
	getCheckboxIconAliasIndex = (style) => {
		var styleIndex = 0;
		CHECKBOX_OPTIONS_FOR_SMART_SHEET.forEach((item, index) => {
			if (item.style === style) styleIndex = index;
		});
		return styleIndex;
	};
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/cdn-function-export.js
function getDataAutonumberStrong24() {
	return p$3 + "data_autonumber_strong_24-29060bfbfc.svg";
}
function getDataAutonumberWhite24() {
	return p$3 + "data_autonumber_white_24-f5e1f11cec.svg";
}
function getDataBarcodeStrong24() {
	return p$3 + "data_barcode_strong_24-6a3c77de0f.svg";
}
function getDataBarcodeWhite24() {
	return p$3 + "data_barcode_white_24-c95e7d5e9e.svg";
}
function getDataCurrencyStrong24() {
	return p$3 + "data_currency_strong_24-9dd0abb5de.svg";
}
function getDataCurrencyWhite24() {
	return p$3 + "data_currency_white_24-89ac3e7099.svg";
}
function getDataGroupStrong24() {
	return p$3 + "data_group_strong_24-d0c8987e1a.svg";
}
function getDataGroupWhite24() {
	return p$3 + "data_group_white_24-1f538c1421.svg";
}
function getDataImageStrong24() {
	return p$3 + "data_image_strong_24-f02f18db9e.svg";
}
function getDataImageWhite24() {
	return p$3 + "data_image_white_24-595384be89.svg";
}
function getDataPercentageStrong24() {
	return p$3 + "data_percentage_strong_24-a132ec8c0e.svg";
}
function getDataPercentageWhite24() {
	return p$3 + "data_percentage_white_24-789bfb871a.svg";
}
function getDataPersonStrong24() {
	return p$3 + "data_person_strong_24-fd8d82fbb3.svg";
}
function getDataPersonWhite24() {
	return p$3 + "data_person_white_24-8c740e290d.svg";
}
function getFieldBarcodeBold20() {
	return p$3 + "field-barcode-bold-20-761931c04b.svg";
}
function getFieldBarcodeSyncBold20() {
	return p$3 + "field-barcode-sync-bold-20-1101bce871.svg";
}
function getFieldCalendarBold20() {
	return p$3 + "field-calendar-bold-20-ceaa9ab3ff.svg";
}
function getFieldCalendarSyncBold20() {
	return p$3 + "field-calendar-sync-bold-20-cbbd2b2117.svg";
}
function getFieldChainRectangleBold20() {
	return p$3 + "field-chain-rectangle-bold-20-241c1c7177.svg";
}
function getFieldChainRectangleSyncBold20() {
	return p$3 + "field-chain-rectangle-sync-bold-20-ad10dd4aca.svg";
}
function getFieldCheckboxBold20() {
	return p$3 + "field-checkbox-bold-20-f39362ffed.svg";
}
function getFieldCheckboxSyncBold20() {
	return p$3 + "field-checkbox-sync-bold-20-110ad972a5.svg";
}
function getFieldChevronDownCircleBold20() {
	return p$3 + "field-chevron-down-circle-bold-20-569a060966.svg";
}
function getFieldChevronDownCircleSyncBold20() {
	return p$3 + "field-chevron-down-circle-sync-bold-20-bbd8bfc746.svg";
}
function getFieldFolderBold20() {
	return p$3 + "field-folder-bold-20-64201ec81c.svg";
}
function getFieldFolderSyncBold20() {
	return p$3 + "field-folder-sync-bold-20-66bb939a90.svg";
}
function getFieldFunctionBold20() {
	return p$3 + "field-function-bold-20-1825ab7709.svg";
}
function getFieldFunctionSyncBold20() {
	return p$3 + "field-function-sync-bold-20-60d1e9a5ce.svg";
}
function getFieldImageBold20() {
	return p$3 + "field-image-bold-20-d291ff1957.svg";
}
function getFieldImageSyncBold20() {
	return p$3 + "field-image-sync-bold-20-183995953a.svg";
}
function getFieldLinkBold20() {
	return p$3 + "field-link-bold-20-b0ec2e11ee.svg";
}
function getFieldLinkSyncBold20() {
	return p$3 + "field-link-sync-bold-20-7696748e77.svg";
}
function getFieldListCheckmarkTwoBold20() {
	return p$3 + "field-list-checkmark-two-bold-20-9853db8593.svg";
}
function getFieldListCheckmarkTwoSyncBold20() {
	return p$3 + "field-list-checkmark-two-sync-bold-20-d64105c2c3.svg";
}
function getFieldLocationBold20() {
	return p$3 + "field-location-bold-20-f6be82a02a.svg";
}
function getFieldLocationSyncBold20() {
	return p$3 + "field-location-sync-bold-20-7d886c55cc.svg";
}
function getFieldMailBold20() {
	return p$3 + "field-mail-bold-20-1b826a76c6.svg";
}
function getFieldMailSyncBold20() {
	return p$3 + "field-mail-sync-bold-20-40259ac693.svg";
}
function getFieldMoneyCircleBold20() {
	return p$3 + "field-money-circle-bold-20-339fc385b8.svg";
}
function getFieldMoneyCircleSyncBold20() {
	return p$3 + "field-money-circle-sync-bold-20-f574b986e4.svg";
}
function getFieldNumbersSquareBold20() {
	return p$3 + "field-numbers-square-bold-20-d0bc44207d.svg";
}
function getFieldNumbersSquareSyncBold20() {
	return p$3 + "field-numbers-square-sync-bold-20-f5f5722e1f.svg";
}
function getFieldPercentageBold20() {
	return p$3 + "field-percentage-bold-20-eda56224dc.svg";
}
function getFieldPercentageSyncBold20() {
	return p$3 + "field-percentage-sync-bold-20-5b04b9e3bd.svg";
}
function getFieldPersonBold20() {
	return p$3 + "field-person-bold-20-6eff879f27.svg";
}
function getFieldPersonGroupBold20() {
	return p$3 + "field-person-group-bold-20-fa1ec0ceb1.svg";
}
function getFieldPersonGroupSyncBold20() {
	return p$3 + "field-person-group-sync-bold-20-3aa5bc0bcd.svg";
}
function getFieldPersonSyncBold20() {
	return p$3 + "field-person-sync-bold-20-ce8798cf24.svg";
}
function getFieldPhoneBold20() {
	return p$3 + "field-phone-bold-20-7a2907a2ec.svg";
}
function getFieldPhoneSyncBold20() {
	return p$3 + "field-phone-sync-bold-20-d120e63fad.svg";
}
function getFieldProgressBold20() {
	return p$3 + "field-progress-bold-20-cb849a92b9.svg";
}
function getFieldProgressSyncBold20() {
	return p$3 + "field-progress-sync-bold-20-197b585a11.svg";
}
function getFieldSheetMagnifierBold20() {
	return p$3 + "field-sheet-magnifier-bold-20-3b6c0bb072.svg";
}
function getFieldSheetMagnifierSyncBold20() {
	return p$3 + "field-sheet-magnifier-sync-bold-20-b220b9ea73.svg";
}
function getFieldSortNumericDescendingBold20() {
	return p$3 + "field-sort-numeric-descending-bold-20-c78bd905fa.svg";
}
function getFieldSortNumericDescendingSyncBold20() {
	return p$3 + "field-sort-numeric-descending-sync-bold-20-e573ffa446.svg";
}
function getFieldTextASquareBold20() {
	return p$3 + "field-text-a-square-bold-20-945ce3b87f.svg";
}
function getFieldTextASquareSyncBold20() {
	return p$3 + "field-text-a-square-sync-bold-20-0962e92490.svg";
}
var npmConfig$2, p$3;
var init_cdn_function_export$2 = __esmMin((() => {
	init_esm();
	npmConfig$2 = esm_default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	p$3 = !!npmConfig$2 && npmConfig$2.CDN_ORIGIN || "https://docs.gtimg.com/docs-design-resources";
	p$3 = p$3 + "/cooperation/wecom/pc/svg/";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/data_autonumber_white_24.svg
var data_autonumber_white_24_default;
var init_data_autonumber_white_24 = __esmMin((() => {
	data_autonumber_white_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.63326%2011.61H8.89423V5.20001H7.63326L6.22679%206.42218V7.78015L7.63326%206.55798V11.61Z'%20fill='white'/%3e%3cpath%20d='M5.9%2019.3042H10.1V18.1693H7.43256L9.36282%2016.33C9.83811%2015.8%2010.1%2015.46%2010.1%2014.8976C10.1%2013.656%209.22702%2012.8897%208.00485%2012.8897C6.82148%2012.8897%205.9%2013.6463%205.9%2014.9073H7.16097C7.16097%2014.238%207.58776%2014.0246%208.00485%2014.0246C8.53834%2014.0246%208.83903%2014.3738%208.83903%2014.8879C8.83903%2015.16%208.72%2015.3%208.48014%2015.57L5.9%2018.1693V19.3042Z'%20fill='white'/%3e%3cpath%20d='M15.9166%205.2002V15.3002H14.0667L16.5667%2019.3002L19.0667%2015.3002H17.2166V5.2002H15.9166Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/data_barcode_white_24.svg
var data_barcode_white_24_default;
var init_data_barcode_white_24 = __esmMin((() => {
	data_barcode_white_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.25%2015V17C5.25%2017.4142%205.58579%2017.75%206%2017.75H9V19H6C4.89543%2019%204%2018.1046%204%2017V15H5.25Z'%20fill='white'/%3e%3cpath%20d='M9%206.25H6C5.58579%206.25%205.25%206.58579%205.25%207V9H4V7C4%205.89543%204.89543%205%206%205H9V6.25Z'%20fill='white'/%3e%3cpath%20d='M18.75%209V7C18.75%206.58579%2018.4142%206.25%2018%206.25H15V5H18C19.1046%205%2020%205.89543%2020%207V9H18.75Z'%20fill='white'/%3e%3cpath%20d='M15%2017.75H18C18.4142%2017.75%2018.75%2017.4142%2018.75%2017V15H20V17C20%2018.1046%2019.1046%2019%2018%2019H15V17.75Z'%20fill='white'/%3e%3cpath%20d='M6.875%2015V9H8.125V15H6.875Z'%20fill='white'/%3e%3cpath%20d='M9.875%209V15H11.125V9H9.875Z'%20fill='white'/%3e%3cpath%20d='M12.875%2015V9H14.125V15H12.875Z'%20fill='white'/%3e%3cpath%20d='M15.875%209V15H17.125V9H15.875Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/data_currency_white_24.svg
var data_currency_white_24_default;
var init_data_currency_white_24 = __esmMin((() => {
	data_currency_white_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%2019.25C16.0041%2019.25%2019.25%2016.0041%2019.25%2012C19.25%207.99594%2016.0041%204.75%2012%204.75C7.99594%204.75%204.75%207.99594%204.75%2012C4.75%2016.0041%207.99594%2019.25%2012%2019.25ZM12%2020.5C16.6944%2020.5%2020.5%2016.6944%2020.5%2012C20.5%207.30558%2016.6944%203.5%2012%203.5C7.30558%203.5%203.5%207.30558%203.5%2012C3.5%2016.6944%207.30558%2020.5%2012%2020.5ZM9.34204%207.61713L12%2010.5409L14.658%207.61713L15.5829%208.45797L12.922%2011.385H15.325V12.635H12.625V13.865H15.325V15.115H12.625V16.955H11.375V15.115H8.675V13.865H11.375V12.635H8.675V11.385H11.078L8.41712%208.45797L9.34204%207.61713Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/data_group_white_24.svg
var data_group_white_24_default;
var init_data_group_white_24 = __esmMin((() => {
	data_group_white_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.6%203.20001C9.61179%203.20001%208.00001%204.81179%208.00001%206.80001V7.96278C8.00001%209.18167%208.36224%2010.3731%209.04069%2011.3857C9.67169%2012.3275%209.32858%2013.6095%208.31151%2014.1102L4.23608%2016.1166C3.60177%2016.4288%203.20001%2017.0744%203.20001%2017.7814C3.20001%2018.344%203.65604%2018.8%204.21858%2018.8H18.9814C19.544%2018.8%2020%2018.344%2020%2017.7814C20%2017.0744%2019.5983%2016.4288%2018.9639%2016.1166L14.8885%2014.1102C13.8714%2013.6095%2013.5283%2012.3275%2014.1593%2011.3857C14.8378%2010.3731%2015.2%209.18167%2015.2%207.96278V6.80001C15.2%204.81178%2013.5882%203.20001%2011.6%203.20001ZM9.20001%206.80001C9.20001%205.47453%2010.2745%204.40001%2011.6%204.40001C12.9255%204.40001%2014%205.47453%2014%206.80001V7.96278C14%208.94382%2013.7085%209.90273%2013.1624%2010.7177C12.1274%2012.2626%2012.6902%2014.3655%2014.3585%2015.1868L18.4339%2017.1932C18.6021%2017.276%2018.7241%2017.4251%2018.7744%2017.6H4.42559C4.47596%2017.4251%204.59789%2017.276%204.7661%2017.1932L8.84153%2015.1868C10.5098%2014.3655%2011.0727%2012.2626%2010.0376%2010.7177C9.49155%209.90273%209.20001%208.94382%209.20001%207.96278V6.80001ZM21.2001%2015.524C21.2001%2015.8341%2021.0389%2016.1067%2020.7957%2016.2623C20.4988%2015.7441%2020.0508%2015.3141%2019.494%2015.04L16.358%2013.4961C15.6485%2012.7605%2015.5109%2011.5878%2016.135%2010.6909C16.4879%2010.1837%2016.677%209.58064%2016.677%208.96274V8.27696C16.677%207.9556%2016.5744%207.65821%2016.4001%207.41578V6.80004C16.4001%206.47031%2016.3668%206.14834%2016.3035%205.83731C17.2315%206.25769%2017.877%207.19194%2017.877%208.27696V8.96274C17.877%209.82568%2017.6128%2010.6679%2017.12%2011.3763C16.7612%2011.8919%2016.9514%2012.6063%2017.5189%2012.8753L20.3837%2014.2334C20.8823%2014.4698%2021.2001%2014.9722%2021.2001%2015.524Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/data_image_white_24.svg
var data_image_white_24_default;
var init_data_image_white_24 = __esmMin((() => {
	data_image_white_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='25'%20viewBox='0%200%2024%2025'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.10111%205.50793C4.4936%205.50793%204.00111%206.00042%204.00111%206.60793V18.5682C4.00111%2019.1757%204.4936%2019.6682%205.10111%2019.6682H18.9277C19.5352%2019.6682%2020.0277%2019.1757%2020.0277%2018.5682V6.60793C20.0277%206.00042%2019.5352%205.50793%2018.9277%205.50793H5.10111ZM5.20111%2013.8676V6.70793H18.8277V15.2296L15.9675%2012.4923C15.5866%2012.1278%2014.9793%2012.1514%2014.6278%2012.5444L13.2434%2014.0925L9.81673%2010.2607C9.44607%209.84618%208.79734%209.84618%208.42669%2010.2607L5.20111%2013.8676ZM5.20111%2015.558V18.4682H18.8277V16.8907L15.3378%2013.5507L13.9384%2015.1155C13.5678%2015.53%2012.9191%2015.53%2012.5484%2015.1155L9.12171%2011.2836L5.44724%2015.3926C5.37783%2015.4702%205.29279%2015.5255%205.20111%2015.558Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/data_percentage_white_24.svg
var data_percentage_white_24_default;
var init_data_percentage_white_24 = __esmMin((() => {
	data_percentage_white_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.75%2012C9.26878%2012%2010.5%2010.433%2010.5%208.5C10.5%206.567%209.26878%205%207.75%205C6.23122%205%205%206.567%205%208.5C5%2010.433%206.23122%2012%207.75%2012ZM7.75%2010.75C8.31439%2010.75%209.25%2010.0403%209.25%208.5C9.25%206.95974%208.31439%206.25%207.75%206.25C7.18561%206.25%206.25%206.95974%206.25%208.5C6.25%2010.0403%207.18561%2010.75%207.75%2010.75Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16.25%2019C17.7688%2019%2019%2017.433%2019%2015.5C19%2013.567%2017.7688%2012%2016.25%2012C14.7312%2012%2013.5%2013.567%2013.5%2015.5C13.5%2017.433%2014.7312%2019%2016.25%2019ZM16.25%2017.75C16.8144%2017.75%2017.75%2017.0403%2017.75%2015.5C17.75%2013.9597%2016.8144%2013.25%2016.25%2013.25C15.6856%2013.25%2014.75%2013.9597%2014.75%2015.5C14.75%2017.0403%2015.6856%2017.75%2016.25%2017.75Z'%20fill='white'/%3e%3cpath%20d='M5.5072%2019L16.8822%205H18.4928L7.11779%2019H5.5072Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/data_person_white_24.svg
var data_person_white_24_default;
var init_data_person_white_24 = __esmMin((() => {
	data_person_white_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.3%207C8.3%205.01178%209.91177%203.4%2011.9%203.4C13.8882%203.4%2015.5%205.01177%2015.5%207V8.16276C15.5%209.38166%2015.1378%2010.5731%2014.4593%2011.5857C13.8283%2012.5275%2014.1714%2013.8095%2015.1885%2014.3102L19.2639%2016.3166C19.8982%2016.6288%2020.3%2017.2744%2020.3%2017.9814C20.3%2018.544%2019.844%2019%2019.2814%2019H4.51857C3.95603%2019%203.5%2018.544%203.5%2017.9814C3.5%2017.2744%203.90175%2016.6288%204.53607%2016.3166L8.6115%2014.3102C9.62856%2013.8095%209.97168%2012.5275%209.34068%2011.5857C8.66222%2010.5731%208.3%209.38166%208.3%208.16277V7ZM11.9%204.6C10.5745%204.6%209.5%205.67452%209.5%207V8.16277C9.5%209.14381%209.79154%2010.1027%2010.3376%2010.9177C11.3726%2012.4626%2010.8098%2014.5655%209.14152%2015.3868L5.06609%2017.3932C4.89787%2017.476%204.77595%2017.6251%204.72558%2017.8H19.0744C19.0241%2017.6251%2018.9021%2017.476%2018.7339%2017.3932L14.6585%2015.3868C12.9902%2014.5655%2012.4274%2012.4626%2013.4624%2010.9177C14.0085%2010.1027%2014.3%209.1438%2014.3%208.16276V7C14.3%205.67452%2013.2255%204.6%2011.9%204.6Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/cdn-function-export.js
function getCalendarBold20() {
	return p$2 + "calendar-bold-20-ed28eef249.svg";
}
function getSsformBold20() {
	return p$2 + "ssform-bold-20-bd969b0b40.svg";
}
function getSsgalleryBold20() {
	return p$2 + "ssgallery-bold-20-32ad07c514.svg";
}
function getSsganttBold20() {
	return p$2 + "ssgantt-bold-20-9da6c0fdf6.svg";
}
function getSsgridBold20() {
	return p$2 + "ssgrid-bold-20-87dc8c7bad.svg";
}
function getSskanbanBold20() {
	return p$2 + "sskanban-bold-20-1a513ce350.svg";
}
var npmConfig$1, p$2;
var init_cdn_function_export$1 = __esmMin((() => {
	init_esm();
	npmConfig$1 = esm_default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	p$2 = !!npmConfig$1 && npmConfig$1.CDN_ORIGIN || "https://docs.gtimg.com/docs-design-resources";
	p$2 = p$2 + "/icon/desktop/svg/";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/cdn-function-export.js
function getIconSmartsheetAttributeCheckboxDark24() {
	return p$1 + "icon_smartsheet_attribute_checkbox_dark_24-2189912baa.svg";
}
function getIconSmartsheetAttributeCheckboxDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_checkbox_dark_pressed_24-e30e12d0a7.svg";
}
function getIconSmartsheetAttributeCiteDark24() {
	return p$1 + "icon_smartsheet_attribute_cite_dark_24-67be9511ab.svg";
}
function getIconSmartsheetAttributeCiteDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_cite_dark_pressed_24-eb7f219260.svg";
}
function getIconSmartsheetAttributeConnectDark24() {
	return p$1 + "icon_smartsheet_attribute_connect_dark_24-aa684168bb.svg";
}
function getIconSmartsheetAttributeConnectDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_connect_dark_pressed_24-3ce1bee6fa.svg";
}
function getIconSmartsheetAttributeDateDark24() {
	return p$1 + "icon_smartsheet_attribute_date_dark_24-67f8a23d6a.svg";
}
function getIconSmartsheetAttributeDateDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_date_dark_pressed_24-3358341604.svg";
}
function getIconSmartsheetAttributeFileDark24() {
	return p$1 + "icon_smartsheet_attribute_file_dark_24-a3231146b7.svg";
}
function getIconSmartsheetAttributeFileDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_file_dark_pressed_24-2d8f4d3a3e.svg";
}
function getIconSmartsheetAttributeImageDark24() {
	return p$1 + "icon_smartsheet_attribute_image_dark_24-e0bdd34b56.svg";
}
function getIconSmartsheetAttributeImageDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_image_dark_pressed_24-591a27ebac.svg";
}
function getIconSmartsheetAttributeLinkDark24() {
	return p$1 + "icon_smartsheet_attribute_link_dark_24-0bd02e6095.svg";
}
function getIconSmartsheetAttributeLinkDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_link_dark_pressed_24-b51c079072.svg";
}
function getIconSmartsheetAttributeLocationDark24() {
	return p$1 + "icon_smartsheet_attribute_location_dark_24-0d81162c9c.svg";
}
function getIconSmartsheetAttributeLocationDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_location_dark_pressed_24-1f13144ea9.svg";
}
function getIconSmartsheetAttributeMailDark24() {
	return p$1 + "icon_smartsheet_attribute_mail_dark_24-c23caeef81.svg";
}
function getIconSmartsheetAttributeMailDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_mail_dark_pressed_24-2fffa2feb2.svg";
}
function getIconSmartsheetAttributeMultiselectDark24() {
	return p$1 + "icon_smartsheet_attribute_multiselect_dark_24-de8da1d820.svg";
}
function getIconSmartsheetAttributeMultiselectDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_multiselect_dark_pressed_24-be2ba1bd26.svg";
}
function getIconSmartsheetAttributeNumberDark24() {
	return p$1 + "icon_smartsheet_attribute_number_dark_24-3a4774156b.svg";
}
function getIconSmartsheetAttributeNumberDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_number_dark_pressed_24-7574bdf8df.svg";
}
function getIconSmartsheetAttributePeopleDark24() {
	return p$1 + "icon_smartsheet_attribute_people_dark_24-7c6f67b208.svg";
}
function getIconSmartsheetAttributePeopleDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_people_dark_pressed_24-a1eeb47e48.svg";
}
function getIconSmartsheetAttributePhoneDark24() {
	return p$1 + "icon_smartsheet_attribute_phone_dark_24-290df406de.svg";
}
function getIconSmartsheetAttributePhoneDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_phone_dark_pressed_24-49ed59c6f6.svg";
}
function getIconSmartsheetAttributeProgressDark24() {
	return p$1 + "icon_smartsheet_attribute_progress_dark_24-98d6cc1d58.svg";
}
function getIconSmartsheetAttributeProgressDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_progress_dark_pressed_24-0f36cb9096.svg";
}
function getIconSmartsheetAttributeSelectDark24() {
	return p$1 + "icon_smartsheet_attribute_select_dark_24-e1f643778d.svg";
}
function getIconSmartsheetAttributeSelectDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_select_dark_pressed_24-43f0c5849a.svg";
}
function getIconSmartsheetAttributeTextDark24() {
	return p$1 + "icon_smartsheet_attribute_text_dark_24-ec1c266fae.svg";
}
function getIconSmartsheetAttributeTextDarkPressed24() {
	return p$1 + "icon_smartsheet_attribute_text_dark_pressed_24-7ab630031f.svg";
}
function getWecomIconSmartsheetAttributeFormulaDark24() {
	return p$1 + "wecom_icon_smartsheet_attribute_formula_dark_24-772f5eff63.svg";
}
function getWecomIconSmartsheetAttributeFormulaDarkPressed24() {
	return p$1 + "wecom_icon_smartsheet_attribute_formula_dark_pressed_24-3b83cba98e.svg";
}
var npmConfig, p$1;
var init_cdn_function_export = __esmMin((() => {
	init_esm();
	npmConfig = esm_default.getInstance().getConfig("npm[\"@tencent/docs-design-resources\"]");
	p$1 = !!npmConfig && npmConfig.CDN_ORIGIN || "https://docs.gtimg.com/docs-design-resources";
	p$1 = p$1 + "/x-pc/svg/";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_checkbox_dark_pressed_24.svg
var icon_smartsheet_attribute_checkbox_dark_pressed_24_default;
var init_icon_smartsheet_attribute_checkbox_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_checkbox_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_436_64503)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.7799%206.29805L17.0799%204.99805L6%204.99989C5.44772%204.99989%205%205.4476%205%205.99989V17.9999C5%2018.5522%205.44772%2018.9999%206%2018.9999H18C18.5523%2018.9999%2019%2018.5522%2019%2017.9999L18.9999%2011.281L17.6999%2012.581L17.7%2017.6999H6.3V13.9999L6.297%209.99905L6.3%206.29989L15.7799%206.29805ZM19.6569%207.7407C19.9107%207.48686%2019.9107%207.0753%2019.6569%206.82146C19.403%206.56762%2018.9915%206.56762%2018.7376%206.82146L11.6312%2013.9279L9.26238%2011.5591C9.00854%2011.3052%208.59699%2011.3052%208.34315%2011.5591C8.08931%2011.8129%208.08931%2012.2245%208.34315%2012.4783L11.2776%2015.4128C11.4729%2015.6081%2011.7895%2015.6081%2011.9847%2015.4128L19.6569%207.7407Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_436_64503'%3e%3crect%20width='24'%20height='24'%20rx='2'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_cite_dark_pressed_24.svg
var icon_smartsheet_attribute_cite_dark_pressed_24_default;
var init_icon_smartsheet_attribute_cite_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_cite_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.25%209.25V6.25H9V9.25H5.25ZM5.25%2010.5V13.5H9V10.5H5.25ZM5.25%2014.75V17.75H9V14.75H5.25ZM10.25%2017.75H12V19H5C4.44772%2019%204%2018.5523%204%2018V6C4%205.44772%204.44772%205%205%205H19C19.5523%205%2020%205.44772%2020%206V9.25V10.5V11.5H18.75V10.5H10.25V13.5H12V14.75H10.25V17.75ZM18.75%209.25V6.25H10.25V9.25H18.75ZM18.75%2015.5C18.75%2014.2574%2017.7426%2013.25%2016.5%2013.25C15.2574%2013.25%2014.25%2014.2574%2014.25%2015.5C14.25%2016.7426%2015.2574%2017.75%2016.5%2017.75C17.7426%2017.75%2018.75%2016.7426%2018.75%2015.5ZM20%2015.5C20%2013.567%2018.433%2012%2016.5%2012C14.567%2012%2013%2013.567%2013%2015.5C13%2017.433%2014.567%2019%2016.5%2019C17.2317%2019%2017.9109%2018.7755%2018.4726%2018.3916L20.1215%2020.0406L21.0408%2019.1213L19.3918%2017.4723C19.7756%2016.9107%2020%2016.2316%2020%2015.5Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_connect_dark_pressed_24.svg
var icon_smartsheet_attribute_connect_dark_pressed_24_default;
var init_icon_smartsheet_attribute_connect_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_connect_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3%207.625C3%206.72754%203.72754%206%204.625%206H13.625C14.5225%206%2015.25%206.72754%2015.25%207.625V12.625C15.25%2013.5225%2014.5225%2014.25%2013.625%2014.25H11.625V13H13.625C13.8321%2013%2014%2012.8321%2014%2012.625V7.625C14%207.41789%2013.8321%207.25%2013.625%207.25H4.625C4.41789%207.25%204.25%207.41789%204.25%207.625V12.625C4.25%2012.8321%204.41789%2013%204.625%2013H7.625V14.25H4.625C3.72754%2014.25%203%2013.5225%203%2012.625V7.625ZM10.625%2010H12.625V11.25H10.625C10.4179%2011.25%2010.25%2011.4179%2010.25%2011.625V16.625C10.25%2016.8321%2010.4179%2017%2010.625%2017H19.625C19.8321%2017%2020%2016.8321%2020%2016.625V11.625C20%2011.4179%2019.8321%2011.25%2019.625%2011.25H16.625V10H19.625C20.5225%2010%2021.25%2010.7275%2021.25%2011.625V16.625C21.25%2017.5225%2020.5225%2018.25%2019.625%2018.25H10.625C9.72754%2018.25%209%2017.5225%209%2016.625V11.625C9%2010.7275%209.72754%2010%2010.625%2010Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_date_dark_pressed_24.svg
var icon_smartsheet_attribute_date_dark_pressed_24_default;
var init_icon_smartsheet_attribute_date_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_date_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_436_64502)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.75%204H8V5H15.75V4H17V5H19C19.5523%205%2020%205.44772%2020%206V18C20%2018.5523%2019.5523%2019%2019%2019H5C4.44772%2019%204%2018.5523%204%2018V6C4%205.44772%204.44772%205%205%205H6.75V4ZM5.3%206.3H18.7V17.7H5.3V6.3ZM9.87734%208.5C10.4797%208.50638%2010.9639%208.71162%2011.3233%209.11657C11.6644%209.50842%2011.839%209.97354%2011.8451%2010.508C11.8451%2010.7775%2011.7994%2011.0378%2011.7058%2011.2941C11.6179%2011.5006%2011.4762%2011.6874%2011.2821%2011.8546L11.2516%2011.878L11.2846%2011.9031C11.3849%2011.987%2011.4731%2012.0776%2011.549%2012.1749L11.6536%2012.3258L11.7397%2012.487C11.8589%2012.7576%2011.9186%2013.0417%2011.9186%2013.3394C11.9125%2013.9925%2011.7182%2014.5137%2011.3367%2014.8935C10.9612%2015.283%2010.4785%2015.4812%209.89352%2015.4875C9.4383%2015.4875%209.03293%2015.3321%208.68175%2015.0229C8.37348%2014.7515%208.16115%2014.3756%208.04425%2013.8985L8%2013.6878L8.10875%2013.5497H9.01194L9.11523%2013.6246C9.18972%2013.8294%209.2935%2013.9929%209.42751%2014.1176C9.55574%2014.2398%209.72797%2014.3017%209.94969%2014.3017C10.1857%2014.3017%2010.3807%2014.2181%2010.5445%2014.0454C10.7052%2013.8893%2010.7889%2013.6645%2010.7941%2013.3677C10.7889%2013.0599%2010.7047%2012.8284%2010.5439%2012.6668C10.4157%2012.5402%2010.2599%2012.4643%2010.0736%2012.439L9.92809%2012.4295H9.43717L9.44947%2011.353H9.85894C10.1396%2011.353%2010.3505%2011.274%2010.4994%2011.1169C10.6472%2010.9663%2010.7206%2010.772%2010.7207%2010.5288C10.7155%2010.2785%2010.6387%2010.078%2010.4908%209.92198C10.3416%209.76997%2010.1494%209.69129%209.9108%209.68585C9.74275%209.68585%209.59093%209.74229%209.44947%209.85888C9.33417%209.94903%209.24796%2010.0806%209.19138%2010.2564L9.1545%2010.3966L9.04651%2010.488H8.14332L8.03323%2010.3598C8.08189%209.8402%208.2823%209.39974%208.63227%209.0435C8.93487%208.73285%209.29122%208.55467%209.69761%208.51065L9.87734%208.5ZM15%208.51246V15.5H13.8577L13.8574%209.88785L13.1278%2010.4535L12.9489%2010.358V9.23342L13.9701%208.51246H15Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_436_64502'%3e%3crect%20width='24'%20height='24'%20rx='2'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_file_dark_pressed_24.svg
var icon_smartsheet_attribute_file_dark_pressed_24_default;
var init_icon_smartsheet_attribute_file_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_file_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.2929%205.29289C11.1054%205.10536%2010.851%205%2010.5858%205H5C4.44772%205%204%205.44772%204%206V18C4%2018.5523%204.44772%2019%205%2019H19C19.5523%2019%2020%2018.5523%2020%2018V8C20%207.44772%2019.5523%207%2019%207H13L11.2929%205.29289ZM5.3%206.3H10.461L12.4615%208.3H18.7V17.7H5.3V6.3Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_image_dark_pressed_24.svg
var icon_smartsheet_attribute_image_dark_pressed_24_default;
var init_icon_smartsheet_attribute_image_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_image_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.25%2017.75V6.25H18.75V17.75H5.25ZM4%206C4%205.44772%204.44772%205%205%205H19C19.5523%205%2020%205.44772%2020%206V18C20%2018.5523%2019.5523%2019%2019%2019H5C4.44772%2019%204%2018.5523%204%2018V6ZM17%2016L13.6667%2010L10.8821%2014.7339L9.22222%2012.01L7%2016H17Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_link_dark_pressed_24.svg
var icon_smartsheet_attribute_link_dark_pressed_24_default;
var init_icon_smartsheet_attribute_link_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_link_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.7267%2011.4212C20.4244%209.72353%2020.4244%206.97099%2018.7267%205.27328C17.029%203.57557%2014.2765%203.57557%2012.5788%205.27328L10.2733%207.57876C8.57557%209.27647%208.57557%2012.029%2010.2733%2013.7267C10.7768%2014.2303%2011.3732%2014.5845%2012.0073%2014.7893C12.0373%2014.3568%2012.159%2013.9495%2012.353%2013.5868C11.916%2013.4391%2011.5054%2013.1911%2011.1572%2012.8428C9.94761%2011.6333%209.94761%209.6722%2011.1572%208.46265L13.4626%206.15717L13.6055%206.02297C14.8219%204.9494%2016.6798%204.99413%2017.8428%206.15717L17.977%206.29998C19.0506%207.51646%2019.0059%209.37432%2017.8428%2010.5374L16.1513%2012.2289C16.5495%2012.3945%2016.9043%2012.6434%2017.194%2012.9539L18.7267%2011.4212ZM13%2010C13%2010.3904%2012.9254%2010.7633%2012.7898%2011.1054C12.8076%2011.1224%2012.8253%2011.1396%2012.8428%2011.1572L12.977%2011.3C14.0506%2012.5165%2014.0059%2014.3743%2012.8428%2015.5374L10.5374%2017.8428L10.3945%2017.977C9.17806%2019.0506%207.3202%2019.0059%206.15717%2017.8428C4.94761%2016.6333%204.94761%2014.6722%206.15717%2013.4626L7.69707%2011.9227C7.41722%2011.5879%207.20903%2011.1911%207.09606%2010.756L5.27328%2012.5788C3.57557%2014.2765%203.57557%2017.029%205.27328%2018.7267C6.97099%2020.4244%209.72353%2020.4244%2011.4212%2018.7267L13.7267%2016.4212C15.4244%2014.7235%2015.4244%2011.971%2013.7267%2010.2733C13.4964%2010.0429%2013.2466%209.84385%2012.9827%209.67601C12.9941%209.78244%2013%209.89054%2013%2010Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_location_dark_pressed_24.svg
var icon_smartsheet_attribute_location_dark_pressed_24_default;
var init_icon_smartsheet_attribute_location_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_location_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16.3991%206.12576L16.3992%206.12587C17.6677%207.43669%2018.25%208.87715%2018.25%2010.3703C18.25%2011.8851%2017.6495%2013.5903%2016.298%2015.3894C15.7458%2016.1246%2013.5503%2018.413%2012.1536%2019.8477C12.0605%2019.9433%2011.9164%2019.9406%2011.8284%2019.8519C10.5837%2018.5955%208.61913%2016.5737%207.61523%2015.3481C6.40915%2013.8757%205.7825%2012.2515%205.75124%2010.6823C5.72042%209.13552%206.26493%207.55533%207.55502%206.11759L7.70148%205.97126C10.1464%203.61761%2014.0386%203.68598%2016.3991%206.12576ZM17.2974%205.25659C14.4548%202.31852%209.76652%202.23909%206.82583%205.07916L6.64824%205.25659C3.63523%208.59044%203.93657%2012.8298%206.64824%2016.1402C7.69624%2017.4196%209.70419%2019.4838%2010.9404%2020.7316C11.5234%2021.3201%2012.4714%2021.3132%2013.0492%2020.7197C14.4104%2019.3215%2016.6837%2016.9572%2017.2974%2016.1402C20.2342%2012.2308%2020.2342%208.29119%2017.2974%205.25659ZM12.0025%209.25C12.969%209.25141%2013.7514%2010.036%2013.75%2011.0026C13.7486%2011.969%2012.964%2012.7514%2011.9975%2012.75C11.031%2012.7486%2010.2486%2011.964%2010.25%2010.9975C10.2507%2010.5362%2010.4335%2010.0938%2010.7586%209.76657C11.0877%209.43531%2011.5356%209.24932%2012.0025%209.25ZM12.0044%208C11.2038%207.99884%2010.4361%208.31767%209.87184%208.88555C9.31448%209.44652%209.00116%2010.2049%209%2010.9956C8.99761%2012.6525%2010.3388%2013.9976%2011.9956%2014C13.6525%2014.0024%2014.9976%2012.6612%2015%2011.0044C15.0024%209.34752%2013.6612%208.00242%2012.0044%208Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_mail_dark_pressed_24.svg
var icon_smartsheet_attribute_mail_dark_pressed_24_default;
var init_icon_smartsheet_attribute_mail_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_mail_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_436_64507)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M19%205C19.5523%205%2020%205.44772%2020%206V17C20%2017.5523%2019.5523%2018%2019%2018H5C4.44772%2018%204%2017.5523%204%2017V6C4%205.44772%204.44772%205%205%205H19ZM18.75%206.25H5.25V6.65L5.36327%206.49142L12%2011.231L18.6367%206.49142L18.75%206.65V6.25ZM18.75%207.94664L12%2012.7681L5.25%207.94664V16.75H18.75V7.94664Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_436_64507'%3e%3crect%20width='24'%20height='24'%20rx='2'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_multiselect_dark_pressed_24.svg
var icon_smartsheet_attribute_multiselect_dark_pressed_24_default;
var init_icon_smartsheet_attribute_multiselect_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_multiselect_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.6668%206.83334L10.7972%206L7.31836%209.33338L5.86958%207.94447L5%208.77782L7.31887%2011.0001L8.18845%2010.1667L8.18754%2010.1659L11.6668%206.83334ZM13%206.5H20V7.75002H13V6.5ZM20%209.5H13V10.75H20V9.5ZM11.6668%2013.8333L10.7972%2013L7.31836%2016.3334L5.86958%2014.9445L5%2015.7778L7.31887%2018.0001L8.18845%2017.1667L8.18754%2017.1659L11.6668%2013.8333ZM13%2013.5H20V14.75H13V13.5ZM20%2016.5H13V17.75H20V16.5Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_number_dark_pressed_24.svg
var icon_smartsheet_attribute_number_dark_pressed_24_default;
var init_icon_smartsheet_attribute_number_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_number_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.1899%2017.8843V6.1157H5.06954L3%208.01653V9.3719L5.06954%207.43802V17.8843H6.1899ZM13.7575%2017.8843V16.8264H8.99597L12.8705%2011.5702C13.4774%2010.7438%2013.7575%2010.1322%2013.7575%209.19008C13.7575%207.2562%2012.5282%206.01653%2010.7076%206.01653C8.85592%206.01653%207.65777%207.35537%207.65777%209.20661H8.77812C8.77812%207.68595%209.68063%207.07438%2010.7076%207.07438C11.9213%207.07438%2012.6371%207.91736%2012.6371%209.19008C12.6371%209.83471%2012.4348%2010.3471%2012.0147%2010.9256L7.64221%2016.8264V17.8843H13.7575ZM17.7479%2018C19.5529%2018%2021%2016.843%2021%2014.6777C21%2013.2066%2020.4243%2012.2479%2019.3039%2011.8017C20.2998%2011.3223%2020.7977%2010.4298%2020.7977%209.19008C20.7977%207.27273%2019.5529%206%2017.7479%206C16.0673%206%2014.7603%207.12397%2014.6358%209.02479H15.7561C15.865%207.81818%2016.5808%207.05785%2017.7479%207.05785C18.8215%207.05785%2019.6774%207.80165%2019.6774%209.20661C19.6774%2010.5289%2019.0549%2011.3388%2017.7012%2011.3388H17.4678V12.3802H17.7012C19.2105%2012.3802%2019.8796%2013.2397%2019.8796%2014.6612C19.8796%2016.0992%2018.946%2016.9421%2017.7479%2016.9421C16.6898%2016.9421%2015.7094%2016.3636%2015.6161%2014.8926H14.4957C14.5891%2017.0248%2016.0051%2018%2017.7479%2018Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_people_dark_24.svg
var icon_smartsheet_attribute_people_dark_24_default;
var init_icon_smartsheet_attribute_people_dark_24 = __esmMin((() => {
	icon_smartsheet_attribute_people_dark_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_61_52250)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%204C13.933%204%2015.5%205.567%2015.5%207.5C15.5%209.36856%2014.0357%2010.8951%2012.192%2010.9948L12%2011C10.067%2011%208.5%209.433%208.5%207.5C8.5%205.63144%209.96428%204.10487%2011.808%204.00518L12%204ZM19%2015.9892C19%2013.5959%2015.1782%2012%2012%2012L11.7773%2012.0026C8.64613%2012.0747%205%2013.6516%205%2015.9892V18C5%2018.5523%205.44772%2019%206%2019H18C18.5523%2019%2019%2018.5523%2019%2018V15.9892ZM6.30675%2015.8813C6.45903%2014.6545%209.1645%2013.3%2012%2013.3L12.2498%2013.3035C15.0755%2013.3819%2017.7%2014.7711%2017.7%2015.9892V17.7H6.3V15.9892L6.30675%2015.8813ZM9.8%207.5C9.8%206.28497%2010.785%205.3%2012%205.3C13.215%205.3%2014.2%206.28497%2014.2%207.5C14.2%208.71503%2013.215%209.7%2012%209.7C10.785%209.7%209.8%208.71503%209.8%207.5Z'%20fill='%23454D5A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_61_52250'%3e%3crect%20width='24'%20height='24'%20rx='2'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_people_dark_pressed_24.svg
var icon_smartsheet_attribute_people_dark_pressed_24_default;
var init_icon_smartsheet_attribute_people_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_people_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_436_64513)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%204C13.933%204%2015.5%205.567%2015.5%207.5C15.5%209.36856%2014.0357%2010.8951%2012.192%2010.9948L12%2011C10.067%2011%208.5%209.433%208.5%207.5C8.5%205.63144%209.96428%204.10487%2011.808%204.00518L12%204ZM19%2015.9892C19%2013.5959%2015.1782%2012%2012%2012L11.7773%2012.0026C8.64613%2012.0747%205%2013.6516%205%2015.9892V18C5%2018.5523%205.44772%2019%206%2019H18C18.5523%2019%2019%2018.5523%2019%2018V15.9892ZM6.30675%2015.8813C6.45903%2014.6545%209.1645%2013.3%2012%2013.3L12.2498%2013.3035C15.0755%2013.3819%2017.7%2014.7711%2017.7%2015.9892V17.7H6.3V15.9892L6.30675%2015.8813ZM9.8%207.5C9.8%206.28497%2010.785%205.3%2012%205.3C13.215%205.3%2014.2%206.28497%2014.2%207.5C14.2%208.71503%2013.215%209.7%2012%209.7C10.785%209.7%209.8%208.71503%209.8%207.5Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_436_64513'%3e%3crect%20width='24'%20height='24'%20rx='2'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_phone_dark_pressed_24.svg
var icon_smartsheet_attribute_phone_dark_pressed_24_default;
var init_icon_smartsheet_attribute_phone_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_phone_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_436_64506)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.94118%204.375H6.64706C5.39224%204.375%204.375%205.39224%204.375%206.64706C4.7993%2013.6481%2010.3519%2019.2007%2017.315%2019.6238C18.6078%2019.625%2019.625%2018.6078%2019.625%2017.3529V14.0588C19.625%2013.8033%2019.4694%2013.5734%2019.2321%2013.4785L15.1145%2011.8315L15.0183%2011.8017C14.7594%2011.7438%2014.4867%2011.8564%2014.3464%2012.0902L13.418%2013.637L13.3494%2013.5987C12.1355%2012.8783%2011.1217%2011.8645%2010.4013%2010.6506L10.362%2010.581L11.9098%209.65358C12.1728%209.49575%2012.2825%209.17035%2012.1685%208.88553L10.5215%204.76788C10.4266%204.53059%2010.1967%204.375%209.94118%204.375ZM9.517%205.625L10.809%208.855L9.20785%209.81701C8.92893%209.98436%208.825%2010.3377%208.96887%2010.6294C9.91169%2012.5411%2011.4589%2014.0883%2013.3706%2015.0311L13.4698%2015.07C13.7386%2015.1497%2014.0342%2015.0401%2014.183%2014.7921L15.144%2013.19L18.375%2014.482V17.3529C18.375%2017.9174%2017.9174%2018.375%2017.3529%2018.375C11.0584%2017.9913%206.00868%2012.9416%205.62385%206.60915C5.625%206.08259%206.08259%205.625%206.64706%205.625H9.517Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_436_64506'%3e%3crect%20width='24'%20height='24'%20rx='2'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_progress_dark_pressed_24.svg
var icon_smartsheet_attribute_progress_dark_pressed_24_default;
var init_icon_smartsheet_attribute_progress_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_progress_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M20%209C20%208.44772%2019.5523%208%2019%208H5C4.44772%208%204%208.44772%204%209V15C4%2015.5523%204.44772%2016%205%2016H19C19.5523%2016%2020%2015.5523%2020%2015V9ZM10.1339%209.25H15.078L9.61632%2014.4809L9.87402%2014.75H5.25V14.1339L5.5%2014.3839L10.3839%209.5L10.1339%209.25ZM8.86612%209.25H5.25V12.8661L8.86612%209.25ZM11.1426%2014.75L16.8852%209.25H18.75V14.75H11.1426Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_select_dark_pressed_24.svg
var icon_smartsheet_attribute_select_dark_pressed_24_default;
var init_icon_smartsheet_attribute_select_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_select_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%204C16.4183%204%2020%207.58172%2020%2012C20%2016.4183%2016.4183%2020%2012%2020C7.58172%2020%204%2016.4183%204%2012C4%207.58172%207.58172%204%2012%204ZM12%205.3C8.29969%205.3%205.3%208.29969%205.3%2012C5.3%2015.7003%208.29969%2018.7%2012%2018.7C15.7003%2018.7%2018.7%2015.7003%2018.7%2012C18.7%208.29969%2015.7003%205.3%2012%205.3ZM14.3054%2010.5L15.2%2011.3739L12%2014.5L8.8%2011.3739L9.69462%2010.5L12.0007%2012.7528L14.3054%2010.5Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_text_dark_pressed_24.svg
var icon_smartsheet_attribute_text_dark_pressed_24_default;
var init_icon_smartsheet_attribute_text_dark_pressed_24 = __esmMin((() => {
	icon_smartsheet_attribute_text_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.83929%205.83929V18.1607H18.1607V5.83929H5.83929ZM5.57143%204.5C4.97969%204.5%204.5%204.9797%204.5%205.57143V18.4286C4.5%2019.0203%204.9797%2019.5%205.57143%2019.5H18.4286C19.0203%2019.5%2019.5%2019.0203%2019.5%2018.4286V5.57143C19.5%204.97969%2019.0203%204.5%2018.4286%204.5H5.57143Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.7069%2016H8.5L11.3966%208H11.3966H12.6034H12.6035L15.5001%2016H14.2932L13.6595%2014.25H10.3405L9.7069%2016ZM10.7931%2013H13.207L12%209.66658L10.7931%2013Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/wecom_icon_smartsheet_attribute_formula_dark_pressed_24.svg
var wecom_icon_smartsheet_attribute_formula_dark_pressed_24_default;
var init_wecom_icon_smartsheet_attribute_formula_dark_pressed_24 = __esmMin((() => {
	wecom_icon_smartsheet_attribute_formula_dark_pressed_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16.2415%204.3962C14.5578%203.72272%2012.6706%204.71195%2012.2665%206.47976L11.5762%209.49971H9.50012C9.14114%209.49971%208.85012%209.79072%208.85012%2010.1497C8.85012%2010.5087%209.14114%2010.7997%209.50012%2010.7997H11.2791L9.57985%2018.2338C9.41286%2018.9644%208.47585%2019.1789%208.00769%2018.5937C7.78343%2018.3133%207.37439%2018.2679%207.09407%2018.4921C6.81375%2018.7164%206.7683%2019.1254%206.99256%2019.4058C8.14039%2020.8406%2010.4377%2020.3147%2010.8472%2018.5235L12.6126%2010.7997H15.0001C15.3591%2010.7997%2015.6501%2010.5087%2015.6501%2010.1497C15.6501%209.79072%2015.3591%209.49971%2015.0001%209.49971H12.9097L13.5338%206.76943C13.76%205.77995%2014.8163%205.22626%2015.7587%205.60322C16.092%205.73654%2016.4703%205.57442%2016.6036%205.24111C16.737%204.9078%2016.5748%204.52952%2016.2415%204.3962ZM5.83929%205.83929V17.4815C5.34139%2018.0249%205.15189%2018.7687%205.29835%2019.4649C4.83889%2019.3441%204.5%2018.9259%204.5%2018.4286V5.57143C4.5%204.9797%204.97969%204.5%205.57143%204.5H11.4317C11.1496%204.89695%2010.9272%205.34634%2010.7812%205.83929H5.83929ZM12.4071%2018.8801L12.5715%2018.1607H18.1607V5.83929H18.0878L18.0893%205.83543C18.2658%205.39435%2018.2927%204.93051%2018.1943%204.5H18.4286C19.0203%204.5%2019.5%204.97969%2019.5%205.57143V18.4286C19.5%2019.0203%2019.0203%2019.5%2018.4286%2019.5H12.2114C12.2915%2019.3044%2012.3573%2019.0977%2012.4071%2018.8801Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/field-icon.js
function getFieldTypeIconAlias(fieldType, isWhite = false, isWecomExternal = false) {
	if (isWecomExternal) return `${fieldType}_sync`;
	return isWhite ? `${fieldType}_white` : `${fieldType}`;
}
var isWecom, NormalFieldTypeIconSrc, SyncFieldTypeIconSrc, WhiteFieldTypeIconSrc, SyncFieldTypeIconAlias, FieldTypeIconSrc;
var init_field_icon = __esmMin((() => {
	init_cdn_function_export$2();
	init_data_autonumber_white_24();
	init_data_barcode_white_24();
	init_data_currency_white_24();
	init_data_group_white_24();
	init_data_image_white_24();
	init_data_percentage_white_24();
	init_data_person_white_24();
	init_cdn_function_export$1();
	init_cdn_function_export();
	init_icon_smartsheet_attribute_checkbox_dark_pressed_24();
	init_icon_smartsheet_attribute_cite_dark_pressed_24();
	init_icon_smartsheet_attribute_connect_dark_pressed_24();
	init_icon_smartsheet_attribute_date_dark_pressed_24();
	init_icon_smartsheet_attribute_file_dark_pressed_24();
	init_icon_smartsheet_attribute_image_dark_pressed_24();
	init_icon_smartsheet_attribute_link_dark_pressed_24();
	init_icon_smartsheet_attribute_location_dark_pressed_24();
	init_icon_smartsheet_attribute_mail_dark_pressed_24();
	init_icon_smartsheet_attribute_multiselect_dark_pressed_24();
	init_icon_smartsheet_attribute_number_dark_pressed_24();
	init_icon_smartsheet_attribute_people_dark_24();
	init_icon_smartsheet_attribute_people_dark_pressed_24();
	init_icon_smartsheet_attribute_phone_dark_pressed_24();
	init_icon_smartsheet_attribute_progress_dark_pressed_24();
	init_icon_smartsheet_attribute_select_dark_pressed_24();
	init_icon_smartsheet_attribute_text_dark_pressed_24();
	init_wecom_icon_smartsheet_attribute_formula_dark_pressed_24();
	init_barcode_14();
	init_barcode_sync_14();
	init_calendar_14();
	init_calendar_sync_14();
	init_chain_rectangle_14();
	init_chain_rectangle_sync_14();
	init_checkbox_14();
	init_checkbox_sync_14();
	init_chevron_down_circle_14();
	init_chevron_down_circle_sync_14();
	init_folder_14();
	init_folder_sync_14();
	init_function_14();
	init_function_sync_14();
	init_image_14();
	init_image_sync_14();
	init_link_14();
	init_link_sync_14();
	init_list_checkmark_two_14();
	init_list_checkmark_two_sync_14();
	init_location_14();
	init_location_sync_14();
	init_mail_14();
	init_mail_sync_14();
	init_money_circle_14();
	init_money_circle_sync_14();
	init_numbers_square_14();
	init_numbers_square_sync_14();
	init_percentage_14();
	init_percentage_sync_14();
	init_person_14();
	init_person_group_14();
	init_person_group_sync_14();
	init_person_sync_14();
	init_phone_14();
	init_phone_sync_14();
	init_progress_14();
	init_progress_sync_14();
	init_sheet_magnifier_14();
	init_sheet_magnifier_sync_14();
	init_sort_numeric_descending_14();
	init_sort_numeric_descending_sync_14();
	init_text_a_square_14();
	init_text_a_square_sync_14();
	init_es$1();
	isWecom = location.host === "doc.weixin.qq.com";
	NormalFieldTypeIconSrc = {
		[FieldType.TEXT]: text_a_square_14_default,
		[FieldType.NUMBER]: numbers_square_14_default,
		[FieldType.MULTIPLE_SELECT]: list_checkmark_two_14_default,
		[FieldType.SINGLE_SELECT]: chevron_down_circle_14_default,
		[FieldType.URL]: link_14_default,
		[FieldType.CHECKBOX]: checkbox_14_default,
		[FieldType.IMAGE]: image_14_default,
		[FieldType.DATE_TIME]: calendar_14_default,
		[FieldType.CREATED_TIME]: calendar_14_default,
		[FieldType.MODIFIED_TIME]: calendar_14_default,
		[FieldType.CREATED_USER]: person_14_default,
		[FieldType.MODIFIED_USER]: person_14_default,
		[FieldType.PROGRESS]: progress_14_default,
		[FieldType.PHONE]: phone_14_default,
		[FieldType.EMAIL]: mail_14_default,
		[FieldType.ATTACHMENT]: folder_14_default,
		[FieldType.FORMULA]: function_14_default,
		[FieldType.LINK_RECORDS]: chain_rectangle_14_default,
		[FieldType.TWO_WAY_LINK_RECORDS]: chain_rectangle_14_default,
		[FieldType.LOOKUP]: sheet_magnifier_14_default,
		[FieldType.USER]: person_14_default,
		[FieldType.USER_C]: icon_smartsheet_attribute_people_dark_24_default,
		[FieldType.LOCATION]: location_14_default,
		[FieldType.CURRENCY]: money_circle_14_default,
		[FieldType.GROUP_B]: person_group_14_default,
		[FieldType.AUTO_NUMBER]: sort_numeric_descending_14_default,
		[FieldType.PERCENT]: percentage_14_default,
		[FieldType.TITLE]: text_a_square_14_default,
		[FieldType.BARCODE]: barcode_14_default
	};
	SyncFieldTypeIconSrc = {
		[FieldType.TEXT]: text_a_square_sync_14_default,
		[FieldType.NUMBER]: numbers_square_sync_14_default,
		[FieldType.MULTIPLE_SELECT]: list_checkmark_two_sync_14_default,
		[FieldType.SINGLE_SELECT]: chevron_down_circle_sync_14_default,
		[FieldType.URL]: link_sync_14_default,
		[FieldType.CHECKBOX]: checkbox_sync_14_default,
		[FieldType.IMAGE]: image_sync_14_default,
		[FieldType.DATE_TIME]: calendar_sync_14_default,
		[FieldType.CREATED_TIME]: calendar_sync_14_default,
		[FieldType.MODIFIED_TIME]: calendar_sync_14_default,
		[FieldType.CREATED_USER]: person_sync_14_default,
		[FieldType.MODIFIED_USER]: person_sync_14_default,
		[FieldType.PROGRESS]: progress_sync_14_default,
		[FieldType.PHONE]: phone_sync_14_default,
		[FieldType.EMAIL]: mail_sync_14_default,
		[FieldType.ATTACHMENT]: folder_sync_14_default,
		[FieldType.FORMULA]: function_sync_14_default,
		[FieldType.LINK_RECORDS]: chain_rectangle_sync_14_default,
		[FieldType.TWO_WAY_LINK_RECORDS]: chain_rectangle_sync_14_default,
		[FieldType.LOOKUP]: sheet_magnifier_sync_14_default,
		[FieldType.USER]: person_sync_14_default,
		[FieldType.USER_C]: icon_smartsheet_attribute_people_dark_24_default,
		[FieldType.LOCATION]: location_sync_14_default,
		[FieldType.CURRENCY]: money_circle_sync_14_default,
		[FieldType.GROUP_B]: person_group_sync_14_default,
		[FieldType.AUTO_NUMBER]: sort_numeric_descending_sync_14_default,
		[FieldType.PERCENT]: percentage_sync_14_default,
		[FieldType.BARCODE]: barcode_sync_14_default,
		[FieldType.TITLE]: text_a_square_sync_14_default
	};
	WhiteFieldTypeIconSrc = {
		[getFieldTypeIconAlias(FieldType.TEXT, true, false)]: icon_smartsheet_attribute_text_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.NUMBER, true, false)]: icon_smartsheet_attribute_number_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.MULTIPLE_SELECT, true, false)]: icon_smartsheet_attribute_multiselect_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.SINGLE_SELECT, true, false)]: icon_smartsheet_attribute_select_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.URL, true, false)]: icon_smartsheet_attribute_link_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.CHECKBOX, true, false)]: icon_smartsheet_attribute_checkbox_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.IMAGE, true, false)]: isWecom ? data_image_white_24_default : icon_smartsheet_attribute_image_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.DATE_TIME, true, false)]: icon_smartsheet_attribute_date_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.CREATED_TIME, true, false)]: icon_smartsheet_attribute_date_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.MODIFIED_TIME, true, false)]: icon_smartsheet_attribute_date_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.CREATED_USER, true, false)]: isWecom ? data_person_white_24_default : icon_smartsheet_attribute_people_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.MODIFIED_USER, true, false)]: isWecom ? data_person_white_24_default : icon_smartsheet_attribute_people_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.PROGRESS, true, false)]: icon_smartsheet_attribute_progress_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.PHONE, true, false)]: icon_smartsheet_attribute_phone_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.EMAIL, true, false)]: icon_smartsheet_attribute_mail_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.ATTACHMENT, true, false)]: icon_smartsheet_attribute_file_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.FORMULA, true, false)]: wecom_icon_smartsheet_attribute_formula_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.LINK_RECORDS, true, false)]: icon_smartsheet_attribute_connect_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.TWO_WAY_LINK_RECORDS, true, false)]: icon_smartsheet_attribute_connect_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.LOOKUP, true, false)]: icon_smartsheet_attribute_cite_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.USER, true, false)]: data_person_white_24_default,
		[getFieldTypeIconAlias(FieldType.USER_C, true, false)]: icon_smartsheet_attribute_people_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.LOCATION, true, false)]: icon_smartsheet_attribute_location_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.CURRENCY, true, false)]: data_currency_white_24_default,
		[getFieldTypeIconAlias(FieldType.GROUP_B, true, false)]: data_group_white_24_default,
		[getFieldTypeIconAlias(FieldType.AUTO_NUMBER, true, false)]: data_autonumber_white_24_default,
		[getFieldTypeIconAlias(FieldType.TITLE, true, false)]: icon_smartsheet_attribute_text_dark_pressed_24_default,
		[getFieldTypeIconAlias(FieldType.PERCENT, true, false)]: data_percentage_white_24_default,
		[getFieldTypeIconAlias(FieldType.BARCODE, true, false)]: data_barcode_white_24_default
	};
	SyncFieldTypeIconAlias = Object.entries(SyncFieldTypeIconSrc).reduce((acc, [key, value]) => {
		acc[`${key}_sync`] = value;
		return acc;
	}, {});
	FieldTypeIconSrc = Object.assign(NormalFieldTypeIconSrc, WhiteFieldTypeIconSrc, SyncFieldTypeIconAlias);
	FieldType.TEXT, getIconSmartsheetAttributeTextDark24(), FieldType.NUMBER, getIconSmartsheetAttributeNumberDark24(), FieldType.MULTIPLE_SELECT, getIconSmartsheetAttributeMultiselectDark24(), FieldType.SINGLE_SELECT, getIconSmartsheetAttributeSelectDark24(), FieldType.URL, getIconSmartsheetAttributeLinkDark24(), FieldType.CHECKBOX, getIconSmartsheetAttributeCheckboxDark24(), FieldType.IMAGE, isWecom ? getDataImageStrong24() : getIconSmartsheetAttributeImageDark24(), FieldType.DATE_TIME, getIconSmartsheetAttributeDateDark24(), FieldType.CREATED_TIME, getIconSmartsheetAttributeDateDark24(), FieldType.MODIFIED_TIME, getIconSmartsheetAttributeDateDark24(), FieldType.CREATED_USER, isWecom ? getDataPersonStrong24() : getIconSmartsheetAttributePeopleDark24(), FieldType.MODIFIED_USER, isWecom ? getDataPersonStrong24() : getIconSmartsheetAttributePeopleDark24(), FieldType.PROGRESS, getIconSmartsheetAttributeProgressDark24(), FieldType.PHONE, getIconSmartsheetAttributePhoneDark24(), FieldType.EMAIL, getIconSmartsheetAttributeMailDark24(), FieldType.ATTACHMENT, getIconSmartsheetAttributeFileDark24(), FieldType.FORMULA, getWecomIconSmartsheetAttributeFormulaDark24(), FieldType.LINK_RECORDS, getIconSmartsheetAttributeConnectDark24(), FieldType.TWO_WAY_LINK_RECORDS, getIconSmartsheetAttributeConnectDark24(), FieldType.LOOKUP, getIconSmartsheetAttributeCiteDark24(), FieldType.USER, getDataPersonStrong24(), FieldType.USER_C, getIconSmartsheetAttributePeopleDark24(), FieldType.LOCATION, getIconSmartsheetAttributeLocationDark24(), FieldType.CURRENCY, getDataCurrencyStrong24(), FieldType.AUTO_NUMBER, getDataAutonumberStrong24(), FieldType.GROUP_B, getDataGroupStrong24(), FieldType.PERCENT, getDataPercentageStrong24 === null || getDataPercentageStrong24 === void 0 || getDataPercentageStrong24(), FieldType.TITLE, getIconSmartsheetAttributeTextDark24(), FieldType.BARCODE, getDataBarcodeStrong24();
	FieldType.TEXT, getIconSmartsheetAttributeTextDarkPressed24(), FieldType.NUMBER, getIconSmartsheetAttributeNumberDarkPressed24(), FieldType.MULTIPLE_SELECT, getIconSmartsheetAttributeMultiselectDarkPressed24(), FieldType.SINGLE_SELECT, getIconSmartsheetAttributeSelectDarkPressed24(), FieldType.URL, getIconSmartsheetAttributeLinkDarkPressed24(), FieldType.CHECKBOX, getIconSmartsheetAttributeCheckboxDarkPressed24(), FieldType.IMAGE, isWecom ? getDataImageWhite24() : getIconSmartsheetAttributeImageDarkPressed24(), FieldType.DATE_TIME, getIconSmartsheetAttributeDateDarkPressed24(), FieldType.CREATED_TIME, getIconSmartsheetAttributeDateDarkPressed24(), FieldType.MODIFIED_TIME, getIconSmartsheetAttributeDateDarkPressed24(), FieldType.CREATED_USER, isWecom ? getDataPersonWhite24() : getIconSmartsheetAttributePeopleDarkPressed24(), FieldType.MODIFIED_USER, isWecom ? getDataPersonWhite24() : getIconSmartsheetAttributePeopleDarkPressed24(), FieldType.PROGRESS, getIconSmartsheetAttributeProgressDarkPressed24(), FieldType.PHONE, getIconSmartsheetAttributePhoneDarkPressed24(), FieldType.EMAIL, getIconSmartsheetAttributeMailDarkPressed24(), FieldType.ATTACHMENT, getIconSmartsheetAttributeFileDarkPressed24(), FieldType.FORMULA, getWecomIconSmartsheetAttributeFormulaDarkPressed24(), FieldType.LINK_RECORDS, getIconSmartsheetAttributeConnectDarkPressed24(), FieldType.TWO_WAY_LINK_RECORDS, getIconSmartsheetAttributeConnectDarkPressed24(), FieldType.LOOKUP, getIconSmartsheetAttributeCiteDarkPressed24(), FieldType.USER, getDataPersonWhite24(), FieldType.USER_C, getIconSmartsheetAttributePeopleDarkPressed24(), FieldType.LOCATION, getIconSmartsheetAttributeLocationDarkPressed24(), FieldType.CURRENCY, getDataCurrencyWhite24(), FieldType.AUTO_NUMBER, getDataAutonumberWhite24(), FieldType.GROUP_B, getDataGroupWhite24(), FieldType.PERCENT, getDataPercentageWhite24 === null || getDataPercentageWhite24 === void 0 || getDataPercentageWhite24(), FieldType.TITLE, getIconSmartsheetAttributeTextDarkPressed24(), FieldType.BARCODE, getDataBarcodeWhite24();
	FieldType.TEXT, getFieldTextASquareBold20(), FieldType.NUMBER, getFieldNumbersSquareBold20(), FieldType.MULTIPLE_SELECT, getFieldListCheckmarkTwoBold20(), FieldType.SINGLE_SELECT, getFieldChevronDownCircleBold20(), FieldType.URL, getFieldLinkBold20(), FieldType.CHECKBOX, getFieldCheckboxBold20(), FieldType.IMAGE, getFieldImageBold20(), FieldType.DATE_TIME, getFieldCalendarBold20(), FieldType.CREATED_TIME, getFieldCalendarBold20(), FieldType.MODIFIED_TIME, getFieldCalendarBold20(), FieldType.CREATED_USER, getFieldPersonBold20(), FieldType.MODIFIED_USER, getFieldPersonBold20(), FieldType.PROGRESS, getFieldProgressBold20(), FieldType.PHONE, getFieldPhoneBold20(), FieldType.EMAIL, getFieldMailBold20(), FieldType.ATTACHMENT, getFieldFolderBold20(), FieldType.FORMULA, getFieldFunctionBold20(), FieldType.LINK_RECORDS, getFieldChainRectangleBold20(), FieldType.TWO_WAY_LINK_RECORDS, getFieldChainRectangleBold20(), FieldType.LOOKUP, getFieldSheetMagnifierBold20(), FieldType.USER, getFieldPersonBold20(), FieldType.USER_C, getIconSmartsheetAttributePeopleDark24(), FieldType.LOCATION, getFieldLocationBold20(), FieldType.CURRENCY, getFieldMoneyCircleBold20(), FieldType.AUTO_NUMBER, getFieldSortNumericDescendingBold20(), FieldType.GROUP_B, getFieldPersonGroupBold20(), FieldType.PERCENT, getFieldPercentageBold20(), FieldType.TITLE, getFieldTextASquareBold20(), FieldType.BARCODE, getFieldBarcodeBold20();
	FieldType.TEXT, getFieldTextASquareSyncBold20(), FieldType.NUMBER, getFieldNumbersSquareSyncBold20(), FieldType.MULTIPLE_SELECT, getFieldListCheckmarkTwoSyncBold20(), FieldType.SINGLE_SELECT, getFieldChevronDownCircleSyncBold20(), FieldType.URL, getFieldLinkSyncBold20(), FieldType.CHECKBOX, getFieldCheckboxSyncBold20(), FieldType.IMAGE, getFieldImageSyncBold20(), FieldType.DATE_TIME, getFieldCalendarSyncBold20(), FieldType.CREATED_TIME, getFieldCalendarSyncBold20(), FieldType.MODIFIED_TIME, getFieldCalendarSyncBold20(), FieldType.CREATED_USER, getFieldPersonSyncBold20(), FieldType.MODIFIED_USER, getFieldPersonSyncBold20(), FieldType.PROGRESS, getFieldProgressSyncBold20(), FieldType.PHONE, getFieldPhoneSyncBold20(), FieldType.EMAIL, getFieldMailSyncBold20(), FieldType.ATTACHMENT, getFieldFolderSyncBold20(), FieldType.FORMULA, getFieldFunctionSyncBold20(), FieldType.LINK_RECORDS, getFieldChainRectangleSyncBold20(), FieldType.TWO_WAY_LINK_RECORDS, getFieldChainRectangleSyncBold20(), FieldType.LOOKUP, getFieldSheetMagnifierSyncBold20(), FieldType.USER, getFieldPersonSyncBold20(), FieldType.USER_C, getIconSmartsheetAttributePeopleDark24(), FieldType.LOCATION, getFieldLocationSyncBold20(), FieldType.CURRENCY, getFieldMoneyCircleSyncBold20(), FieldType.AUTO_NUMBER, getFieldSortNumericDescendingSyncBold20(), FieldType.GROUP_B, getFieldPersonGroupSyncBold20(), FieldType.PERCENT, getFieldPercentageSyncBold20(), FieldType.TITLE, getFieldTextASquareSyncBold20(), FieldType.BARCODE, getFieldBarcodeSyncBold20();
	ViewType.GRID, getSsgridBold20(), ViewType.KANBAN, getSskanbanBold20(), ViewType.GALLERY, getSsgalleryBold20(), ViewType.GANTT, getSsganttBold20(), ViewType.CALENDAR, getCalendarBold20(), ViewType.FORM, getSsformBold20(), ViewType.QUERY, getSsformBold20(), ViewType.LIST, getSsgridBold20();
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/file_smartcanvas_64.svg
var file_smartcanvas_64_default;
var init_file_smartcanvas_64 = __esmMin((() => {
	file_smartcanvas_64_default = "data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15%2020.44C15%2018.5401%2016.5205%2017%2018.3962%2017H56.6038C58.4795%2017%2060%2018.5401%2060%2020.44V56.56C60%2058.4599%2058.4795%2060%2056.6038%2060H18.3962C16.5205%2060%2015%2058.4599%2015%2056.56V20.44Z'%20fill='url(%23paint0_linear_27873_366644)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9%204C6.79086%204%205%205.79086%205%208V56C5%2058.2091%206.79086%2060%209%2060H53H56.5H57V59.9646C56.8367%2059.9879%2056.6698%2060%2056.5%2060C54.567%2060%2053%2058.433%2053%2056.5C53%2056.3302%2053.0121%2056.1633%2053.0354%2056H53V8C53%205.79086%2051.2091%204%2049%204H9Z'%20fill='url(%23paint1_linear_27873_366644)'/%3e%3cg%20filter='url(%23filter0_d_27873_366644)'%3e%3cpath%20d='M15%2025H20V51H15V25Z'%20fill='%23ECFCFF'/%3e%3cpath%20d='M20%2025H25V29.9811H20V25Z'%20fill='%23ECFCFF'/%3e%3cpath%20d='M20%2046.0189H25V51L20%2051V46.0189Z'%20fill='%23ECFCFF'/%3e%3c/g%3e%3cg%20filter='url(%23filter1_d_27873_366644)'%3e%3cpath%20d='M43%2025H38V51H43V25Z'%20fill='%23CAEFFB'/%3e%3cpath%20d='M38%2025H33V29.9811H38V25Z'%20fill='%23CAEFFB'/%3e%3cpath%20d='M38%2046.0189H33V51L38%2051V46.0189Z'%20fill='%23CAEFFB'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_27873_366644'%20x='14.1467'%20y='23.2933'%20width='15.12'%20height='31.12'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='1.70667'%20dy='0.853333'/%3e%3cfeGaussianBlur%20stdDeviation='1.28'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.0901961%200%200%200%200%200.622274%200%200%200%200%200.921569%200%200%200%200.8%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_27873_366644'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_27873_366644'%20result='shape'/%3e%3c/filter%3e%3cfilter%20id='filter1_d_27873_366644'%20x='32.1467'%20y='23.2933'%20width='15.12'%20height='31.12'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='1.70667'%20dy='0.853333'/%3e%3cfeGaussianBlur%20stdDeviation='1.28'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_27873_366644'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_27873_366644'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_27873_366644'%20x1='24.1494'%20y1='17'%20x2='24.1494'%20y2='61.3134'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232DA5EB'/%3e%3cstop%20offset='1'%20stop-color='%232198EB'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_27873_366644'%20x1='29.4008'%20y1='-24'%20x2='-26.6931'%20y2='31.2909'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%234DD1FF'/%3e%3cstop%20offset='1'%20stop-color='%233CBFFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/application_vnd_tdocs_apps_doc_pace_64.svg
var application_vnd_tdocs_apps_doc_pace_64_default;
var init_application_vnd_tdocs_apps_doc_pace_64 = __esmMin((() => {
	application_vnd_tdocs_apps_doc_pace_64_default = "" + new URL("application_vnd_tdocs_apps_doc_pace_64-CpNqfENA.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_doc_16.svg
var file_doc_16_default;
var init_file_doc_16 = __esmMin((() => {
	file_doc_16_default = "" + new URL("file_doc_16-qGbeM13u.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_ai_16.svg
var file_drive_ai_16_default;
var init_file_drive_ai_16 = __esmMin((() => {
	file_drive_ai_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='1'%20width='14'%20height='16'%20rx='1'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.8572%205.71538C12.4884%205.71538%2013.0001%205.21945%2013.0001%204.60769C13.0001%203.99593%2012.4884%203.5%2011.8572%203.5C11.226%203.5%2010.7144%203.99593%2010.7144%204.60769C10.7144%205.21945%2011.226%205.71538%2011.8572%205.71538ZM5.48571%203.63843H5.71408H7.14286H7.37122L9.85693%2012.5H8.19979L7.61723%2010.4231H5.23971L4.65714%2012.5H3L5.48571%203.63843ZM7.15116%208.7616L6.42847%206.18522L5.70578%208.7616H7.15116ZM11%206.26929H12.7143V12.5001H11V6.26929Z'%20fill='%23FF8246'/%3e%3crect%20x='1.25'%20y='0.25'%20width='13.5'%20height='15.5'%20rx='0.75'%20stroke='black'%20stroke-opacity='0.16'%20stroke-width='0.5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_default_16.svg
var file_drive_default_16_default;
var init_file_drive_default_16 = __esmMin((() => {
	file_drive_default_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='1'%20width='14'%20height='16'%20rx='1'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.25%203H8.5V6V7H12.5V12.25C12.5%2012.6642%2012.1642%2013%2011.75%2013H4.25C3.83579%2013%203.5%2012.6642%203.5%2012.25V3.75C3.5%203.33579%203.83579%203%204.25%203ZM12.5%206V5.94118L9.5%203.29412V6H12.5Z'%20fill='%2381868F'/%3e%3crect%20x='1.25'%20y='0.25'%20width='13.5'%20height='15.5'%20rx='0.75'%20stroke='black'%20stroke-opacity='0.16'%20stroke-width='0.5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_excel_16.svg
var file_drive_excel_16_default;
var init_file_drive_excel_16 = __esmMin((() => {
	file_drive_excel_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_42639_72949)'%3e%3cpath%20d='M14.4%200.199951C14.6%200.199951%2014.8%200.399951%2014.8%200.599951V15.3C14.8%2015.5%2014.6%2015.7%2014.4%2015.7H1.60001C1.40001%2015.7%201.20001%2015.5%201.20001%2015.3V0.599951C1.20001%200.399951%201.40001%200.199951%201.60001%200.199951H14.4V0.199951Z'%20fill='white'%20stroke='%23DCDCDC'%20stroke-width='0.5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.99999%204.5H6.29999V5.8H8.99999V4.5ZM12.1%204.5H9.39999V5.8H12.1V4.5V4.5ZM9.39999%206.3H12.1V7.6H9.39999V6.3ZM8.99999%206.3H6.29999V7.6H8.99999V6.3ZM9.39999%208.1H12.1V9.5H9.39999V8.1ZM8.99999%208.1H6.29999V9.5H8.99999V8.1ZM9.39999%209.9H12.1V11.2H9.39999V9.9ZM8.99999%209.9H6.29999V11.2H8.99999V9.9ZM9.39999%2011.7H12.1V13H9.39999V11.7ZM8.99999%2011.7H6.29999V13H8.99999V11.7Z'%20fill='%23E5E5E5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1%203.79998L8.2%203.09998C8.4%203.09998%208.5%203.19998%208.5%203.39998V12.8C8.5%2013%208.3%2013.1%208.2%2013.1L1%2012.3V3.79998Z'%20fill='url(%23paint0_linear_42639_72949)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.70002%207.19998L5.60002%205.69998L6.70002%205.59998L5.20002%207.99998L6.70002%2010.5L5.60002%2010.4L4.70002%208.89998L4.00002%2010.2L2.90002%2010.1L4.20002%208.09998L2.90002%205.99998L4.00002%205.89998L4.70002%207.19998Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_42639_72949'%20x1='8.8737'%20y1='2.14848'%20x2='3.1946'%20y2='10.6522'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.000290329'%20stop-color='%2300CEAE'/%3e%3cstop%20offset='1'%20stop-color='%2300A558'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_42639_72949'%3e%3crect%20width='16'%20height='16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_image_16.svg
var file_drive_image_16_default;
var init_file_drive_image_16 = __esmMin((() => {
	file_drive_image_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='1'%20width='14'%20height='16'%20rx='1'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.2889%206.58065C11.0007%206.58065%2011.5777%206.00295%2011.5777%205.29032C11.5777%204.5777%2011.0007%204%2010.2889%204C9.57705%204%209.00001%204.5777%209.00001%205.29032C9.00001%206.00295%209.57705%206.58065%2010.2889%206.58065ZM4.68293%207.50864C4.82739%207.17808%205.25248%207.0849%205.52197%207.32472L8.14585%209.65969L8.83284%208.62804C9.00945%208.36283%209.37831%208.31195%209.62011%208.51945L12.8604%2011.3C13.1407%2011.5405%2012.9706%2012%2012.6012%2012H7.45448L7.44539%2011.9999H3.53125C3.14866%2011.9999%202.89178%2011.6073%203.04499%2011.2567L4.68293%207.50864Z'%20fill='%235C98FF'/%3e%3crect%20x='1.25'%20y='0.25'%20width='13.5'%20height='15.5'%20rx='0.75'%20stroke='black'%20stroke-opacity='0.16'%20stroke-width='0.5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_mp3_16.svg
var file_drive_mp3_16_default;
var init_file_drive_mp3_16 = __esmMin((() => {
	file_drive_mp3_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='1'%20width='14'%20height='16'%20rx='1'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.78748%204.25L11.9994%203.5V4.37506H12V11.125H11.9998V11.25L9.1665%2012V9.75L10.4546%209.40903V5.24628L6.33289%205.70354V9.5001L6.33326%209.5V11.75L3.5%2012.5V10.25L4.78748%209.90919V5.87499V4.87494V4.25Z'%20fill='%2300AA5B'/%3e%3crect%20x='1.25'%20y='0.25'%20width='13.5'%20height='15.5'%20rx='0.75'%20stroke='black'%20stroke-opacity='0.16'%20stroke-width='0.5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_mp4_16.svg
var file_drive_mp4_16_default;
var init_file_drive_mp4_16 = __esmMin((() => {
	file_drive_mp4_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='1'%20width='14'%20height='16'%20rx='1'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.25%204C3.83579%204%203.5%204.33579%203.5%204.75V11.25C3.5%2011.6642%203.83579%2012%204.25%2012H11.75C12.1642%2012%2012.5%2011.6642%2012.5%2011.25V4.75C12.5%204.33579%2012.1642%204%2011.75%204H4.25ZM10%208L7%206V10L10%208Z'%20fill='%237691FF'/%3e%3crect%20x='1.25'%20y='0.25'%20width='13.5'%20height='15.5'%20rx='0.75'%20stroke='black'%20stroke-opacity='0.16'%20stroke-width='0.5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_pdf_16.svg
var file_drive_pdf_16_default;
var init_file_drive_pdf_16 = __esmMin((() => {
	file_drive_pdf_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_13283_66168)'%3e%3cpath%20d='M14.4002%200.199951C14.6002%200.199951%2014.8002%200.399951%2014.8002%200.599951V15.3C14.8002%2015.5%2014.6002%2015.7%2014.4002%2015.7H1.6002C1.4002%2015.7%201.2002%2015.5%201.2002%2015.3V0.599951C1.2002%200.399951%201.4002%200.199951%201.6002%200.199951H14.4002Z'%20fill='white'%20stroke='%23DCDCDC'%20stroke-width='0.5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.6%204.19995H9.1V7.69995H6.6V4.19995ZM10.1%204.19995H12V5.49995H10.1V4.19995ZM12%206.49995H10.1V7.79995H12V6.49995ZM6%208.69995H12V9.99995H6V8.69995ZM12%2011H6V12.3H12V11Z'%20fill='%23E5E5E5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1%203.79998L8.2%203.09998C8.4%203.09998%208.5%203.19998%208.5%203.39998V12.8C8.5%2013%208.3%2013.1%208.2%2013.1L1%2012.3V3.79998Z'%20fill='url(%23paint0_linear_13283_66168)'%20fill-opacity='0.96'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.2%208.40004C6%208.40004%205.7%208.40004%205.5%208.40004C5.1%208.20004%204.9%207.90004%204.7%207.40004V7.30004V7.20004C4.7%207.00004%204.8%206.80004%204.8%206.60004C4.8%206.40004%204.8%206.30004%204.8%206.20004C4.7%205.90004%204.5%205.80004%204.3%205.80004C4%205.70004%203.8%205.90004%203.8%206.10004C3.7%206.40004%203.8%206.90004%204%207.60004C3.7%208.10004%203.4%208.80004%203.1%209.20004C2.9%209.30004%202.6%209.50004%202.4%209.60004C2.2%209.80004%202%2010%202%2010.2C2%2010.3%202%2010.4%202.1%2010.5C2.2%2010.6%202.3%2010.7%202.4%2010.7C2.8%2010.7%203.2%2010.4%203.7%209.50004H3.8C3.8%209.50004%203.8%209.50004%203.9%209.50004L4.1%209.40004C4.2%209.40004%204.3%209.30004%204.4%209.30004C4.7%209.20004%205%209.20004%205.2%209.10004C5.6%209.30004%206.1%209.50004%206.4%209.50004C6.7%209.50004%206.9%209.40004%206.9%209.10004C7%208.90004%207%208.70004%206.9%208.60004C6.7%208.50004%206.5%208.40004%206.2%208.40004ZM4.2%207.90004C4.5%208.20004%204.7%208.50004%205%208.70004H5.1H5C4.7%208.80004%204.5%208.90004%204.2%209.00004C4%209.00004%203.8%209.10004%203.7%209.20004H3.6V9.10004C3.9%208.80004%204.1%208.40004%204.2%207.90004ZM5.8%208.90004C6.2%209.10004%206.5%209.10004%206.6%209.10004V9.00004L6.5%208.90004C6.4%208.80004%206.2%208.80004%205.8%208.90004H5.7H5.8ZM4.3%207.00004C4.2%206.90004%204.2%206.70004%204.2%206.50004C4.2%206.30004%204.2%206.10004%204.3%206.10004C4.4%206.10004%204.4%206.30004%204.5%206.50004C4.4%206.70004%204.4%206.90004%204.3%207.00004ZM2.4%2010.3C2.5%2010.4%202.5%2010.4%202.4%2010.3C2.5%2010.4%202.5%2010.4%202.4%2010.3C2.5%2010.4%202.5%2010.3%202.4%2010.3C2.5%2010.3%202.6%2010.3%202.6%2010.2C2.8%2010.1%203%209.90004%203.2%209.60004L3.3%209.40004L3.1%209.50004C3.1%209.50004%203.1%209.50004%203%209.50004C3%209.60004%203%209.60004%203%209.70004C2.9%209.70004%202.8%209.80004%202.8%209.80004C2.7%209.90004%202.6%2010%202.5%2010.1C2.5%2010.2%202.5%2010.3%202.4%2010.3Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_13283_66168'%20x1='8.3792'%20y1='4.93888'%20x2='0.2984'%20y2='12.5196'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF7272'/%3e%3cstop%20offset='1'%20stop-color='%23FF4747'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_13283_66168'%3e%3crect%20width='16'%20height='16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_ppt_16.svg
var file_drive_ppt_16_default;
var init_file_drive_ppt_16 = __esmMin((() => {
	file_drive_ppt_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_42639_72957)'%3e%3cpath%20d='M14.4%200.199951C14.6%200.199951%2014.8%200.399951%2014.8%200.599951V15.3C14.8%2015.5%2014.6%2015.7%2014.4%2015.7H1.60001C1.40001%2015.7%201.20001%2015.5%201.20001%2015.3V0.599951C1.20001%200.399951%201.40001%200.199951%201.60001%200.199951H14.4V0.199951Z'%20fill='white'%20stroke='%23DCDCDC'%20stroke-width='0.5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.4%206.5C11.4%205.1%2010.3%204%208.99998%204V6.5H11.4ZM8.49998%206.9V4.5C7.09998%204.5%205.99998%205.6%205.99998%206.9C5.99998%208.3%207.09998%209.4%208.49998%209.4C9.89998%209.4%2011%208.3%2011%206.9H8.49998ZM3.09998%2010.8H12.1V11.5H3.09998V10.8V10.8ZM12.1%2012.3H3.09998V13H12.1V12.3Z'%20fill='%23E5E5E5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1%203.79998L8.2%203.09998C8.4%203.09998%208.5%203.19998%208.5%203.39998V12.8C8.5%2013%208.3%2013.1%208.2%2013.1L1%2012.3V3.79998Z'%20fill='url(%23paint0_linear_42639_72957)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.20001%205.70003L4.80001%205.60003C5.60001%205.50003%206.30001%206.30003%206.30001%207.20003C6.30001%208.10003%205.70001%208.90003%204.80001%208.80003H4.00001V10.3L3.20001%2010.2V5.70003ZM3.90001%206.40003V8.00003H4.80001C5.20001%208.00003%205.60001%207.60003%205.60001%207.20003C5.60001%206.70003%205.30001%206.40003%204.80001%206.40003H3.90001Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_42639_72957'%20x1='9.1538'%20y1='4.70378'%20x2='0.2097'%20y2='12.1078'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF8759'/%3e%3cstop%20offset='1'%20stop-color='%23FF5B0F'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_42639_72957'%3e%3crect%20width='16'%20height='16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_drive_word_16.svg
var file_drive_word_16_default;
var init_file_drive_word_16 = __esmMin((() => {
	file_drive_word_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_42639_72965)'%3e%3cpath%20d='M14.4%200.199951C14.6%200.199951%2014.8%200.399951%2014.8%200.599951V15.3C14.8%2015.5%2014.6%2015.7%2014.4%2015.7H1.60001C1.40001%2015.7%201.20001%2015.5%201.20001%2015.3V0.599951C1.20001%200.399951%201.40001%200.199951%201.60001%200.199951H14.4V0.199951Z'%20fill='white'%20stroke='%23DCDCDC'%20stroke-width='0.5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.09998%205.09998H12.1V5.79998H3.09998V5.09998V5.09998ZM3.09998%206.69998H12.1V7.39998H3.09998V6.69998V6.69998ZM12.1%208.29998H3.09998V8.99998H12.1V8.29998ZM3.09998%209.79998H12.1V10.5H3.09998V9.79998V9.79998ZM12.1%2011.4H3.09998V12.1H12.1V11.4Z'%20fill='%23E5E5E5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1%203.60002L8.2%202.90002C8.4%202.90002%208.5%203.00002%208.5%203.20002V12.6C8.5%2012.8%208.3%2012.9%208.2%2012.9L1%2012.1V3.60002Z'%20fill='url(%23paint0_radial_42639_72965)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M5.50001%208.19998L6.10001%205.69998L7.00001%205.59998L5.90001%209.99998H5.10001L4.50001%207.49998L3.90001%209.89998L3.10001%209.79998L2.20001%206.09998L3.10001%205.99998L3.50001%208.19998L4.10001%205.89998L4.90001%205.79998L5.50001%208.19998Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cradialGradient%20id='paint0_radial_42639_72965'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(7.71067%202.81211)%20rotate(121.04)%20scale(10.1215%209.16096)'%3e%3cstop%20stop-color='%23359FFF'/%3e%3cstop%20offset='0.9992'%20stop-color='%231E6FFF'/%3e%3c/radialGradient%3e%3cclipPath%20id='clip0_42639_72965'%3e%3crect%20width='16'%20height='16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_flowdiagram_16.svg
var file_flowdiagram_16_default;
var init_file_flowdiagram_16 = __esmMin((() => {
	file_flowdiagram_16_default = "" + new URL("file_flowdiagram_16-BWWDHRk5.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_folder_16.svg
var file_folder_16_default;
var init_file_folder_16 = __esmMin((() => {
	file_folder_16_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3efile_folder_16%3c/title%3e%3cdefs%3e%3clinearGradient%20x1='71.859375%25'%20y1='0%25'%20x2='71.859375%25'%20y2='103.054533%25'%20id='linearGradient-1'%3e%3cstop%20stop-color='%232DA5EB'%20offset='0%25'%3e%3c/stop%3e%3cstop%20stop-color='%232198EB'%20offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20x1='100%25'%20y1='18.8367573%25'%20x2='0%25'%20y2='84.9966987%25'%20id='linearGradient-2'%3e%3cstop%20stop-color='%234DD1FF'%20offset='0%25'%3e%3c/stop%3e%3cstop%20stop-color='%233CBFFF'%20offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='品类图标库'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='腾讯文档品类图标切图库'%20transform='translate(-1202.000000,%20-2414.000000)'%3e%3cg%20id='file_folder_16'%20transform='translate(1202.000000,%202414.000000)'%3e%3crect%20id='bg'%20x='0'%20y='0'%20width='16'%20height='16'%3e%3c/rect%3e%3cg%20id='ico_folder'%20transform='translate(1.000000,%202.000000)'%3e%3cpath%20d='M0.60953198,4.15223411e-14%20L5.82502102,4.15223411e-14%20C6.01474305,4.0488289e-14%206.19364688,0.0883423208%206.30898433,0.238980027%20L8.06053498,2.52661133%20L8.06053498,2.52661133%20L0,2.52661133%20L0,0.60953198%20C6.97963783e-17,0.272896763%200.272896763,4.16952023e-14%200.60953198,4.15223411e-14%20Z'%20id='矩形'%20fill='url(%23linearGradient-1)'%3e%3c/path%3e%3cpath%20d='M0,1.98681641%20L13.2848158,1.98681641%20C13.6798011,1.98681641%2014,2.30701527%2014,2.7020006%20L14,12.3216316%20C14,12.7166169%2013.6798011,13.0368158%2013.2848158,13.0368158%20C13.2839514,13.0368158%2013.2830869,13.0368142%2013.2822224,13.0368111%20L0.712590825,12.9912314%20C0.318620488,12.9898028%20-5.06863744e-16,12.6700249%200,12.276052%20L0,1.98681641%20L0,1.98681641%20Z'%20id='矩形'%20fill='url(%23linearGradient-2)'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_form_16.svg
var file_form_16_default;
var init_file_form_16 = __esmMin((() => {
	file_form_16_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3efile_form_16%3c/title%3e%3cdefs%3e%3clinearGradient%20x1='99.865717%25'%20y1='41.2077468%25'%20x2='80.6550777%25'%20y2='41.2077468%25'%20id='linearGradient-1'%3e%3cstop%20stop-color='%23EB9000'%20offset='0%25'%3e%3c/stop%3e%3cstop%20stop-color='%23EB7E00'%20offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20x1='68.7337996%25'%20y1='0%25'%20x2='7.48655885%25'%20y2='99.4523303%25'%20id='linearGradient-2'%3e%3cstop%20stop-color='%23FFCD00'%20offset='0%25'%3e%3c/stop%3e%3cstop%20stop-color='%23FFAB00'%20offset='99.9313767%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath%20d='M11.1119548,0%20C11.6274205,7.09939312e-16%2012.0452881,0.417867567%2012.0452881,0.933333333%20L12.0453679,12.8455283%20C12.0281437,12.9164193%2012.0190145,12.9904769%2012.0190145,13.0666667%20C12.0190145,13.5821324%2012.4368821,14%2012.9523478,14%20L12.96,13.999%20L12.9605103,14%20L0.933333333,14%20C0.417867567,14%20-1.15811898e-15,13.5821324%200,13.0666667%20L0,0.933333333%20C-1.74148653e-16,0.417867567%200.417867567,6.49801037e-16%200.933333333,0%20L11.1119548,0%20Z'%20id='path-3'%3e%3c/path%3e%3cfilter%20x='-7.7%25'%20y='-7.1%25'%20width='115.4%25'%20height='114.3%25'%20filterUnits='objectBoundingBox'%20id='filter-4'%3e%3cfeGaussianBlur%20stdDeviation='0.5'%20in='SourceAlpha'%20result='shadowBlurInner1'%3e%3c/feGaussianBlur%3e%3cfeOffset%20dx='1'%20dy='0'%20in='shadowBlurInner1'%20result='shadowOffsetInner1'%3e%3c/feOffset%3e%3cfeComposite%20in='shadowOffsetInner1'%20in2='SourceAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%20result='shadowInnerInner1'%3e%3c/feComposite%3e%3cfeColorMatrix%20values='0%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.24%200'%20type='matrix'%20in='shadowInnerInner1'%3e%3c/feColorMatrix%3e%3c/filter%3e%3cpath%20d='M5.28417088,10.6463973%20L4.29422138,9.65644781%20L2.80929714,8.17152357%20L3.79924664,7.18157407%20L5.28329714,8.66566667%20L8.58400252,5.36666667%20L9.57395201,6.35661616%20L5.28417088,10.6463973%20Z'%20id='path-5'%3e%3c/path%3e%3cfilter%20x='-29.6%25'%20y='-18.9%25'%20width='159.1%25'%20height='175.8%25'%20filterUnits='objectBoundingBox'%20id='filter-6'%3e%3cfeOffset%20dx='0'%20dy='1'%20in='SourceAlpha'%20result='shadowOffsetOuter1'%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='0.5'%20in='shadowOffsetOuter1'%20result='shadowBlurOuter1'%3e%3c/feGaussianBlur%3e%3cfeColorMatrix%20values='0%200%200%200%200.510161911%200%200%200%200%200.26330308%200%200%200%200%200%200%200%200%200.207359047%200'%20type='matrix'%20in='shadowBlurOuter1'%3e%3c/feColorMatrix%3e%3c/filter%3e%3c/defs%3e%3cg%20id='品类图标库'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='腾讯文档品类图标切图库'%20transform='translate(-1239.000000,%20-1127.000000)'%3e%3cg%20id='file_form_16'%20transform='translate(1239.000000,%201127.000000)'%3e%3crect%20id='bg'%20fill='%23FFFFFF'%20opacity='0'%20x='0'%20y='0'%20width='16'%20height='16'%20rx='4'%3e%3c/rect%3e%3cg%20id='icon/文件/创建/在线收集表'%20transform='translate(1.000000,%201.000000)'%3e%3cpath%20d='M3.26666667,3.00585937%20L13.0666667,3.00585937%20C13.5821324,3.00585938%2014,3.42372694%2014,3.93919271%20L14,13.0666667%20C14,13.5821324%2013.5821324,14%2013.0666667,14%20L3.26666667,14%20C2.7512009,14%202.33333333,13.5821324%202.33333333,13.0666667%20L2.33333333,3.93919271%20C2.33333333,3.42372694%202.7512009,3.00585937%203.26666667,3.00585937%20Z'%20id='背景板'%20fill='url(%23linearGradient-1)'%3e%3c/path%3e%3cg%20id='前景板'%3e%3cuse%20fill='url(%23linearGradient-2)'%20fill-rule='evenodd'%20xlink:href='%23path-3'%3e%3c/use%3e%3cuse%20fill='black'%20fill-opacity='1'%20filter='url(%23filter-4)'%20xlink:href='%23path-3'%3e%3c/use%3e%3c/g%3e%3cg%20id='形状结合'%3e%3cuse%20fill='black'%20fill-opacity='1'%20filter='url(%23filter-6)'%20xlink:href='%23path-5'%3e%3c/use%3e%3cuse%20fill='%23FFFBE0'%20fill-rule='evenodd'%20xlink:href='%23path-5'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_mindmap_16.svg
var file_mindmap_16_default;
var init_file_mindmap_16 = __esmMin((() => {
	file_mindmap_16_default = "" + new URL("file_mindmap_16-hgxvEKpQ.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_pdf_16.svg
var file_pdf_16_default;
var init_file_pdf_16 = __esmMin((() => {
	file_pdf_16_default = "" + new URL("file_pdf_16-D6lMq6WG.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_sharefolder_16.svg
var file_sharefolder_16_default;
var init_file_sharefolder_16 = __esmMin((() => {
	file_sharefolder_16_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3efile_sharefolder_16%3c/title%3e%3cdefs%3e%3clinearGradient%20x1='100%25'%20y1='6.37302178%25'%20x2='-48.3540286%25'%20y2='93.0146338%25'%20id='linearGradient-1'%3e%3cstop%20stop-color='%231ECCF2'%20offset='0%25'%3e%3c/stop%3e%3cstop%20stop-color='%2340BEFC'%20offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath%20d='M10.5305697,10.2982186%20C10.8894124,10.4699827%2011.1075488,10.8071196%2011.1000556,11.1594358%20L11.1000556,12.1424057%20L5.10047186,12.1424057%20L5.10047186,11.1594358%20C5.09214604,10.8071196%205.31111502,10.4699827%205.66995774,10.2982186%20L7.57640166,9.34132004%20L7.5748214,9.05928013%20C7.57315623,8.91627654%207.50821486,8.77726745%207.39082084,8.68938815%20C7.13188793,8.49525477%206.96287385,8.19406843%206.95871094,7.85453475%20L6.95038512,7.23218949%20C6.94289189,6.63780582%207.43911058,6.15047513%208.05771878,6.143285%20L8.1068411,6.1424861%20C8.72628188,6.13529597%209.23415672,6.61144203%209.24164995,7.20582569%20L9.24997577,7.82737205%20C9.25413868,8.17729147%209.08345943,8.48966245%208.8162007,8.68938815%20C8.69464378,8.77966416%208.6297024,8.92346666%208.63136757,9.07126368%20L8.63297019,9.34575931%20L10.5305697,10.2982186%20Z'%20id='path-2'%3e%3c/path%3e%3cfilter%20x='-66.7%25'%20y='-33.3%25'%20width='233.3%25'%20height='233.3%25'%20filterUnits='objectBoundingBox'%20id='filter-3'%3e%3cfeOffset%20dx='0'%20dy='2'%20in='SourceAlpha'%20result='shadowOffsetOuter1'%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='1'%20in='shadowOffsetOuter1'%20result='shadowBlurOuter1'%3e%3c/feGaussianBlur%3e%3cfeColorMatrix%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'%20type='matrix'%20in='shadowBlurOuter1'%3e%3c/feColorMatrix%3e%3c/filter%3e%3c/defs%3e%3cg%20id='页面-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='PC-新图标'%20transform='translate(-295.000000,%20-280.000000)'%3e%3cg%20id='_图标/品牌/06_共享文件夹'%20transform='translate(295.000000,%20280.000000)'%3e%3crect%20id='矩形'%20stroke='%23979797'%20fill='%23D8D8D8'%20opacity='0'%20x='0'%20y='0'%20width='16'%20height='16'%3e%3c/rect%3e%3cpath%20d='M0.6068411,2.92355556%20L14.8246189,2.92355556%20C15.2566283,2.92355556%2015.6068411,3.27376837%2015.6068411,3.70577778%20L15.6068411,13.4746667%20C15.6068411,13.9066761%2015.2566283,14.2568889%2014.8246189,14.2568889%20L1.38906332,14.2568889%20C0.957053918,14.2568889%200.6068411,13.9066761%200.6068411,13.4746667%20L0.6068411,2.92355556%20L0.6068411,2.92355556%20Z'%20id='矩形'%20fill='url(%23linearGradient-1)'%3e%3c/path%3e%3cg%20id='路径-copy-9'%3e%3cuse%20fill='black'%20fill-opacity='1'%20filter='url(%23filter-3)'%20xlink:href='%23path-2'%3e%3c/use%3e%3cuse%20fill='%23E7F9FF'%20fill-rule='evenodd'%20xlink:href='%23path-2'%3e%3c/use%3e%3c/g%3e%3cpath%20d='M1.27350777,1%20L6.92499103,1%20C7.09727728,1%207.26287388,1.06669819%207.38706351,1.18611129%20L9.27350777,3%20L9.27350777,3%20L0.6068411,3%20L0.6068411,1.66666667%20C0.6068411,1.29847683%200.905317933,1%201.27350777,1%20Z'%20id='形状结合'%20fill='%23008ED7'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_sheet_16.svg
var file_sheet_16_default;
var init_file_sheet_16 = __esmMin((() => {
	file_sheet_16_default = "" + new URL("file_sheet_16-DaG4XJfz.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_slide_16.svg
var file_slide_16_default;
var init_file_slide_16 = __esmMin((() => {
	file_slide_16_default = "" + new URL("file_slide_16-66N8Fnwt.svg", import.meta.url).href;
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_web_logo_16.svg
var file_web_logo_16_default;
var init_file_web_logo_16 = __esmMin((() => {
	file_web_logo_16_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='14px'%20viewBox='0%200%2016%2014'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3efile_web_logo_16%3c/title%3e%3cdefs%3e%3cpath%20d='M7.67989957,0.524523329%20L13.7757787,5.89453846%20L13.6454873,5.89739849%20L9.89657314,5.89739849%20L8.66186545,12.7792018%20L5.48669566,12.7792018%20L6.72000698,5.89739849%20L4.23029062,5.89739849%20L1.98697873,3.50371627%20L7.15030181,3.49492434%20L7.67989957,0.524523329%20Z'%20id='path-1'%3e%3c/path%3e%3c/defs%3e%3cg%20id='页面-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='Logo/normal'%20transform='translate(0.000000,%20-1.000000)'%3e%3cg%20id='编组'%20transform='translate(0.533333,%201.600000)'%3e%3cpath%20d='M11.9239535,5.29634309e-06%20L2.45918595,5.29634309e-06%20C2.32857224,5.29634309e-06%202.21686315,0.0924794451%202.19414539,0.219273897%20L0.00416385101,12.4677556%20C-0.0248912539,12.6302474%200.101801893,12.7791806%200.269096998,12.7791806%20L5.48671714,12.7791806%20L5.90020189,12.6527569%20L8.32326875,12.6527569%20L8.66188693,12.7791806%20L12.6811585,12.7791806%20C12.8117185,12.7791806%2012.9234276,12.6867594%2012.9461454,12.559912%20L14.7475082,2.48515536%20L11.9239535,5.29634309e-06%20Z'%20id='Fill-1'%20fill='%231E6FFF'%3e%3c/path%3e%3cpath%20d='M11.9239696,-1.21501669e-13%20L14.7475243,2.48515006%20L11.800284,2.48515006%20C11.6330426,2.48515006%2011.5062421,2.33616393%2011.5352972,2.17372509%20L11.5352972,2.17372509%20L11.9239696,-1.21501669e-13%20Z'%20id='形状结合'%20fill='%2300DCFF'%20fill-rule='nonzero'%3e%3c/path%3e%3cmask%20id='mask-2'%20fill='white'%3e%3cuse%20xlink:href='%23path-1'%3e%3c/use%3e%3c/mask%3e%3cuse%20id='形状结合'%20fill='%23FFFFFF'%20xlink:href='%23path-1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/file_web_sharefolder_16.svg
var file_web_sharefolder_16_default;
var init_file_web_sharefolder_16 = __esmMin((() => {
	file_web_sharefolder_16_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3efile_web_sharefolder_16%3c/title%3e%3cdefs%3e%3clinearGradient%20x1='100%25'%20y1='8.90157502%25'%20x2='-48.3540286%25'%20y2='90.5215711%25'%20id='linearGradient-1'%3e%3cstop%20stop-color='%231ECCF2'%20offset='0%25'%3e%3c/stop%3e%3cstop%20stop-color='%2340BEFC'%20offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath%20d='M11.4303271,10.0925772%20C11.7891698,10.270231%2012.0073062,10.6189281%2011.999813,10.9833248%20L11.999813,12%20L6.00022927,12%20L6.00022927,10.9833248%20C5.99190345,10.6189281%206.21087244,10.270231%206.56971515,10.0925772%20L8.47615908,9.10286746%20L8.47457881,9.01689156%20C8.47291365,8.86898449%208.40797228,8.7252089%208.29057826,8.63431629%20C8.03164535,8.43352625%207.86263127,8.12201247%207.85846836,7.77083647%20L7.85014254,7.12715152%20C7.84264931,6.51238694%208.338868,6.00834609%208.9574762,6.00090942%20L9.00659852,6.00008313%20C9.6260393,5.99264646%2010.1339141,6.48511916%2010.1414074,7.09988373%20L10.1497332,7.74274239%20C10.1538961,8.10466025%209.98321684,8.42774217%209.71595812,8.63431629%20C9.59440119,8.72768779%209.52945982,8.87642116%209.53112498,9.029286%20L9.5327276,9.10745895%20L11.4303271,10.0925772%20Z'%20id='path-2'%3e%3c/path%3e%3cfilter%20x='-33.3%25'%20y='-16.7%25'%20width='166.7%25'%20height='166.7%25'%20filterUnits='objectBoundingBox'%20id='filter-3'%3e%3cfeOffset%20dx='0'%20dy='1'%20in='SourceAlpha'%20result='shadowOffsetOuter1'%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='0.5'%20in='shadowOffsetOuter1'%20result='shadowBlurOuter1'%3e%3c/feGaussianBlur%3e%3cfeColorMatrix%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.08%200'%20type='matrix'%20in='shadowBlurOuter1'%3e%3c/feColorMatrix%3e%3c/filter%3e%3c/defs%3e%3cg%20id='品类图标库'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='腾讯文档品类图标切图库'%20transform='translate(-1049.000000,%20-2664.000000)'%3e%3cg%20id='file_web_sharefolder_16'%20transform='translate(1049.000000,%202664.000000)'%3e%3crect%20id='矩形'%20fill='%23FFFFFF'%20x='0'%20y='0'%20width='16'%20height='16'%3e%3c/rect%3e%3cpath%20d='M1.68266667,1%20L6.78903526,1%20C6.97492173,1%207.15277005,1.07580213%207.28150234,1.20989827%20L9,3%20L9,3%20L1,3%20L1,1.68266667%20C1,1.30564028%201.30564028,1%201.68266667,1%20Z'%20id='形状结合'%20fill='%23008ED7'%3e%3c/path%3e%3cpath%20d='M1,3%20L15.1990044,3%20C15.6413821,3%2016,3.35861793%2016,3.80099556%20L16,13.1990044%20C16,13.6413821%2015.6413821,14%2015.1990044,14%20L1.80099556,14%20C1.35861793,14%201,13.6413821%201,13.1990044%20L1,3%20L1,3%20Z'%20id='矩形'%20fill='url(%23linearGradient-1)'%3e%3c/path%3e%3cg%20id='路径-copy-9'%3e%3cuse%20fill='black'%20fill-opacity='1'%20filter='url(%23filter-3)'%20xlink:href='%23path-2'%3e%3c/use%3e%3cuse%20fill='%23E7F9FF'%20fill-rule='evenodd'%20xlink:href='%23path-2'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/blackboard.svg
var blackboard_default;
var init_blackboard = __esmMin((() => {
	blackboard_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-blackboard'%3e%3cpath%20fill='currentColor'%20d='M0%203a3%203%200%20013-3h10a3%203%200%20013%203v10a3%203%200%2001-3%203H3a3%203%200%2001-3-3V3z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M11.08%203.5h-.94l-.22%201.8H7.87l-.1.9H9.8l-.44%203.6H7.32l-.11.9h2.04l-.22%201.8h.95l.22-1.8h1.74l.11-.9h-1.74l.44-3.6h1.74l.11-.9h-1.74l.22-1.8zM7.23%203.5h-.97l-.22%201.8H4.05l-.1.9h1.98l-.44%203.6H3.5l-.11.9h1.99l-.22%201.8h.97l1.1-9z'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-ae-emphasized-inline.svg
var file_ae_emphasized_inline_default;
var init_file_ae_emphasized_inline = __esmMin((() => {
	file_ae_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-ae-emphasized-inline'%3e%3cg%20clip-path='url(%23file-ae-emphasized-inline_clip0_3427_20487)'%3e%3cg%20clip-path='url(%23file-ae-emphasized-inline_clip1_3427_20487)'%3e%3cpath%20fill='%2300005B'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%2399F'%20d='M11.04%206.14c1.4%200%202.18%201%202.18%202.42v.53H10.1c0%20.65.39%201.11%201.1%201.11.54%200%20.81-.16%201.12-.47l.77.74c-.51.52-1%20.79-1.9.79-1.2%200-2.32-.54-2.32-2.57%200-1.63.89-2.55%202.18-2.55zm0%201.04a.87.87%200%2000-.84.52c-.09.18-.1.31-.1.53h1.88a1.22%201.22%200%2000-.1-.53.87.87%200%2000-.84-.52zM5.9%204.36l2.5%206.84H7l-.4-1.21H4.18l-.41%201.21h-1.4l2.5-6.84H5.9zM5.4%206.4l-.84%202.48h1.68l-.84-2.48z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-ae-emphasized-inline_clip0_3427_20487'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-ae-emphasized-inline_clip1_3427_20487'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-ai-emphasized-inline.svg
var file_ai_emphasized_inline_default;
var init_file_ai_emphasized_inline = __esmMin((() => {
	file_ai_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-ai-emphasized-inline'%3e%3cg%20clip-path='url(%23file-ai-emphasized-inline_clip0_3427_20486)'%3e%3cg%20clip-path='url(%23file-ai-emphasized-inline_clip1_3427_20486)'%3e%3cpath%20fill='%23300'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23FF9A00'%20d='M11.68%206.34v4.86h-1.24V6.34h1.24zm.01-2.01v1.01h-1.27V4.33h1.27zM7.2%204.36l2.5%206.84H8.3l-.4-1.21H5.46l-.4%201.21H3.65l2.5-6.84H7.2zM6.68%206.4l-.84%202.48h1.68l-.84-2.48z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-ai-emphasized-inline_clip0_3427_20486'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-ai-emphasized-inline_clip1_3427_20486'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-apk-emphasized-inline.svg
var file_apk_emphasized_inline_default;
var init_file_apk_emphasized_inline = __esmMin((() => {
	file_apk_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-apk-emphasized-inline'%3e%3cg%20clip-path='url(%23file-apk-emphasized-inline_clip0_3427_20600)'%3e%3cg%20clip-path='url(%23file-apk-emphasized-inline_clip1_3427_20600)'%3e%3cpath%20fill='%233DDA84'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M4.51%204.55a.4.4%200%2010-.62.5L5.1%206.6A5.6%205.6%200%20002.4%2011h11.2a5.6%205.6%200%2000-2.71-4.4l1.22-1.55a.4.4%200%2000-.62-.5l-1.33%201.68a5.61%205.61%200%2000-4.32%200L4.51%204.55zM6%208.8a.4.4%200%2011-.8%200%20.4.4%200%2001.8%200zm4.4.4a.4.4%200%20100-.8.4.4%200%20000%20.8z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-apk-emphasized-inline_clip0_3427_20600'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-apk-emphasized-inline_clip1_3427_20600'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-au-emphasized-inline.svg
var file_au_emphasized_inline_default;
var init_file_au_emphasized_inline = __esmMin((() => {
	file_au_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-au-emphasized-inline'%3e%3cg%20clip-path='url(%23file-au-emphasized-inline_clip0_3427_20490)'%3e%3cg%20clip-path='url(%23file-au-emphasized-inline_clip1_3427_20490)'%3e%3cpath%20fill='%2300005B'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%2399F'%20d='M13.1%206.2v5H11.9v-.46c-.33.34-.8.52-1.25.52-.5%200-.9-.16-1.18-.44-.4-.4-.51-.88-.51-1.42V6.2h1.25v3.02c0%20.68.43.91.82.91.4%200%20.84-.23.84-.9V6.2h1.25zM5.77%204.36l2.5%206.84h-1.4l-.4-1.21H4.03l-.4%201.21H2.22l2.5-6.84h1.04zM5.25%206.4l-.84%202.48h1.68l-.84-2.48z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-au-emphasized-inline_clip0_3427_20490'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-au-emphasized-inline_clip1_3427_20490'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-audio-emphasized-inline.svg
var file_audio_emphasized_inline_default;
var init_file_audio_emphasized_inline = __esmMin((() => {
	file_audio_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-audio-emphasized-inline'%3e%3cg%20clip-path='url(%23file-audio-emphasized-inline_clip0_3427_20567)'%3e%3cg%20clip-path='url(%23file-audio-emphasized-inline_clip1_3427_20567)'%3e%3cpath%20fill='%232792F7'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M11.6%205.21a2%202%200%2000-2.37-1.97l-2.4.45A2%202%200%20005.2%205.66v3.65c0%20.68-.5%201.25-1.18%201.34a1.39%201.39%200%2010.34%202.75l.24-.02c.8-.1%201.4-.79%201.4-1.6v-4.7a1%201%200%2001.82-.98l2.8-.53a1%201%200%20011.18.98v1.56c0%20.68-.5%201.25-1.18%201.34a1.39%201.39%200%2000.34%202.75l.24-.02c.8-.1%201.4-.79%201.4-1.6V5.22z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-audio-emphasized-inline_clip0_3427_20567'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-audio-emphasized-inline_clip1_3427_20567'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-cad-emphasized-inline.svg
var file_cad_emphasized_inline_default;
var init_file_cad_emphasized_inline = __esmMin((() => {
	file_cad_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-cad-emphasized-inline'%3e%3cg%20clip-path='url(%23file-cad-emphasized-inline_clip0_3427_20526)'%3e%3cg%20clip-path='url(%23file-cad-emphasized-inline_clip1_3427_20526)'%3e%3cpath%20fill='%23FE2C6C'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M10.41%205.72h1.65c.62%200%201.06.23%201.38.67.28.39.28.86.28%201.61%200%20.76%200%201.22-.28%201.61-.32.44-.76.67-1.38.67h-1.65V5.72zm1.57.8h-.68v2.97h.68c.3%200%20.52-.1.67-.29.16-.2.18-.48.18-1.2s-.02-1-.18-1.2c-.15-.19-.37-.28-.67-.28zM8.2%205.72l1.66%204.56h-.93l-.27-.8H7.04l-.27.8h-.94L7.5%205.72h.7zm-.35%201.35l-.56%201.65H8.4l-.56-1.65zM3.96%205.68c.85%200%201.51.49%201.67%201.44h-.9c-.09-.37-.32-.64-.77-.64a.74.74%200%2000-.57.23c-.16.2-.22.42-.22%201.3%200%20.86.06%201.09.22%201.28.13.14.33.23.57.23.45%200%20.68-.27.77-.64h.9c-.16.95-.82%201.44-1.67%201.44-.52%200-.9-.18-1.22-.48-.45-.46-.46-.97-.46-1.84%200-.87%200-1.38.46-1.84.31-.3.7-.48%201.22-.48z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-cad-emphasized-inline_clip0_3427_20526'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-cad-emphasized-inline_clip1_3427_20526'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-cdr-emphasized-inline.svg
var file_cdr_emphasized_inline_default;
var init_file_cdr_emphasized_inline = __esmMin((() => {
	file_cdr_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-cdr-emphasized-inline'%3e%3cg%20clip-path='url(%23file-cdr-emphasized-inline_clip0_3427_20533)'%3e%3cg%20clip-path='url(%23file-cdr-emphasized-inline_clip1_3427_20533)'%3e%3cpath%20fill='%2313B462'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M10.44%205.76h1.79c.93%200%201.48.63%201.48%201.4%200%20.63-.4%201.04-.84%201.2l1.02%201.96h-1.03l-.89-1.82h-.64v1.82h-.89V5.76zm1.74.8h-.85v1.19h.85c.39%200%20.64-.24.64-.6%200-.35-.25-.6-.64-.6zM6.22%205.76h1.65c.62%200%201.06.23%201.37.66.29.4.3.86.3%201.62%200%20.75-.01%201.22-.3%201.61-.31.43-.75.67-1.37.67H6.22V5.76zm1.57.8h-.68v2.96h.68c.3%200%20.52-.1.67-.28.16-.2.18-.48.18-1.2s-.02-1-.18-1.2c-.15-.2-.37-.29-.67-.29zM3.78%205.72c.85%200%201.51.49%201.67%201.44h-.9c-.09-.37-.33-.65-.77-.65a.74.74%200%2000-.57.24c-.16.2-.22.42-.22%201.29%200%20.87.06%201.1.22%201.28.13.15.33.24.57.24.44%200%20.68-.28.77-.65h.9c-.16.96-.82%201.44-1.67%201.44-.52%200-.9-.17-1.22-.48-.45-.45-.46-.96-.46-1.83%200-.87%200-1.39.46-1.84.31-.3.7-.48%201.22-.48z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-cdr-emphasized-inline_clip0_3427_20533'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-cdr-emphasized-inline_clip1_3427_20533'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-code-emphasized-inline.svg
var file_code_emphasized_inline_default;
var init_file_code_emphasized_inline = __esmMin((() => {
	file_code_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-code-emphasized-inline'%3e%3cg%20clip-path='url(%23file-code-emphasized-inline_clip0_3427_20657)'%3e%3cg%20clip-path='url(%23file-code-emphasized-inline_clip1_3427_20657)'%3e%3cpath%20fill='%232E2E3A'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%233FCCB0'%20d='M9.34%204.43c.2.07.31.3.23.51l-2.4%206.4a.4.4%200%2001-.74-.28l2.4-6.4a.4.4%200%2001.51-.23zM5.48%2010.28a.4.4%200%2001-.56%200L3.2%208.57a.8.8%200%20010-1.14l1.72-1.71a.4.4%200%2001.56.56L3.77%208l1.71%201.72a.4.4%200%20010%20.56zM11.08%2010.28a.4.4%200%2001-.56-.56L12.23%208l-1.71-1.72a.4.4%200%2001.56-.56l1.72%201.71a.8.8%200%20010%201.14l-1.72%201.71z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-code-emphasized-inline_clip0_3427_20657'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-code-emphasized-inline_clip1_3427_20657'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-disk-emphasized-inline.svg
var file_disk_emphasized_inline_default;
var init_file_disk_emphasized_inline = __esmMin((() => {
	file_disk_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-disk-emphasized-inline'%3e%3cg%20clip-path='url(%23file-disk-emphasized-inline_clip0_3427_20588)'%3e%3cg%20clip-path='url(%23file-disk-emphasized-inline_clip1_3427_20588)'%3e%3cpath%20fill='%23006FF4'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8%2013.2A5.2%205.2%200%20108%202.8a5.2%205.2%200%20000%2010.4zm0-3.6a1.6%201.6%200%20100-3.2%201.6%201.6%200%20000%203.2z'%20fill-opacity='0.6'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M6.47%2012.97l1.06-3.44a1.6%201.6%200%2001-1.06-1.06L3.03%209.53a5.21%205.21%200%20003.44%203.44zM12.97%206.47a5.21%205.21%200%2000-3.44-3.44L8.47%206.47c.5.16.9.55%201.06%201.06l3.44-1.06z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-disk-emphasized-inline_clip0_3427_20588'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-disk-emphasized-inline_clip1_3427_20588'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-excel-emphasized-inline.svg
var file_excel_emphasized_inline_default;
var init_file_excel_emphasized_inline = __esmMin((() => {
	file_excel_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-excel-emphasized-inline'%3e%3cg%20clip-path='url(%23file-excel-emphasized-inline_clip0_3427_20425)'%3e%3cg%20clip-path='url(%23file-excel-emphasized-inline_clip1_3427_20425)'%3e%3cpath%20fill='%23107C41'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M11.4%2012H9.83L8.2%209.07l-.16-.38h-.02l-.16.38L6.18%2012H4.6l2.6-4.02L4.8%204h1.62l1.43%202.7.24.54h.02c.1-.24.2-.42.28-.56L9.87%204h1.48L8.91%207.97%2011.4%2012z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-excel-emphasized-inline_clip0_3427_20425'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-excel-emphasized-inline_clip1_3427_20425'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-exe-emphasized-inline.svg
var file_exe_emphasized_inline_default;
var init_file_exe_emphasized_inline = __esmMin((() => {
	file_exe_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-exe-emphasized-inline'%3e%3cg%20clip-path='url(%23file-exe-emphasized-inline_clip0_3427_20582)'%3e%3cg%20clip-path='url(%23file-exe-emphasized-inline_clip1_3427_20582)'%3e%3cpath%20fill='%230077D5'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.2%204.6c0-.77.63-1.4%201.4-1.4h3v4.4H3.2v-3z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8.4%203.2h3c.77%200%201.4.63%201.4%201.4v3H8.4V3.2zM3.2%208.4h4.4v4.4h-3a1.4%201.4%200%2001-1.4-1.4v-3z'%20fill-opacity='0.8'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8.4%208.4h4.4v3c0%20.77-.63%201.4-1.4%201.4h-3V8.4z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-exe-emphasized-inline_clip0_3427_20582'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-exe-emphasized-inline_clip1_3427_20582'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-fl-emphasized-inline.svg
var file_fl_emphasized_inline_default;
var init_file_fl_emphasized_inline = __esmMin((() => {
	file_fl_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-fl-emphasized-inline'%3e%3cg%20clip-path='url(%23file-fl-emphasized-inline_clip0_3427_20492)'%3e%3cg%20clip-path='url(%23file-fl-emphasized-inline_clip1_3427_20492)'%3e%3cpath%20fill='%23350101'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23F30F02'%20d='M11.17%204.36V9.7c0%20.3.13.45.44.45h.48v1.06h-.7c-1.04%200-1.47-.71-1.47-1.43v-5.4h1.25zM8.9%204.36v1.2H5.75v1.68h2.7v1.19h-2.7v2.77H4.4V4.36h4.5z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-fl-emphasized-inline_clip0_3427_20492'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-fl-emphasized-inline_clip1_3427_20492'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-font-emphasized-inline.svg
var file_font_emphasized_inline_default;
var init_file_font_emphasized_inline = __esmMin((() => {
	file_font_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-font-emphasized-inline'%3e%3cg%20clip-path='url(%23file-font-emphasized-inline_clip0_3427_20608)'%3e%3cg%20clip-path='url(%23file-font-emphasized-inline_clip1_3427_20608)'%3e%3cpath%20fill='%232E2E3A'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M4.6%2012.8h6.8c.77%200%201.4-.63%201.4-1.4V4.6c0-.39-.16-.74-.41-.99l-8.78%208.78c.25.25.6.41.99.41z'%20fill-opacity='0.8'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M4.6%203.2c-.77%200-1.4.63-1.4%201.4v6.8c0%20.39.16.74.41.99l8.78-8.78a1.4%201.4%200%2000-.99-.41H4.6z'%3e%3c/path%3e%3cpath%20fill='%232E2E3A'%20d='M4.73%2010.77v-.32l.32-.07c.24-.05.39-.1.44-.13a.82.82%200%2000.19-.27l2.06-5.4h.5l.05.1.81%201.92c.19.41.35.81.5%201.2.15.38.27.7.38.94l.26.66a6.26%206.26%200%2000.4.83c.05.05.14.08.27.1.12.01.26.05.4.1a1.69%201.69%200%2001.03.34c-.23%200-.49-.01-.77-.04a9.64%209.64%200%2000-1.28-.02l-.8.04-.23.01c0-.1%200-.21.02-.31l.52-.11a.98.98%200%2000.27-.1.15.15%200%2000.05-.1c0-.05-.01-.09-.03-.13l-.18-.46-.38-.92H6.74a22.24%2022.24%200%2000-.5%201.43c0%20.09.03.14.07.18.07.06.21.1.42.12l.33.06a9.93%209.93%200%20010%20.34c-.2%200-.66-.03-1.4-.08l-.19.03c-.23.04-.45.06-.66.06h-.08zm2.2-2.64l1.3.02h.11a17.24%2017.24%200%2000-.73-1.83l-.68%201.81z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-font-emphasized-inline_clip0_3427_20608'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-font-emphasized-inline_clip1_3427_20608'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-id-emphasized-inline.svg
var file_id_emphasized_inline_default;
var init_file_id_emphasized_inline = __esmMin((() => {
	file_id_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-id-emphasized-inline'%3e%3cg%20clip-path='url(%23file-id-emphasized-inline_clip0_3427_20493)'%3e%3cg%20clip-path='url(%23file-id-emphasized-inline_clip1_3427_20493)'%3e%3cpath%20fill='%2349021F'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23F36'%20d='M11.46%204.36v6.84h-1.22v-.47a1.5%201.5%200%2001-1.24.53c-.5%200-.94-.17-1.22-.45-.48-.5-.51-1.27-.51-2.12%200-.83.03-1.6.51-2.1.28-.29.71-.45%201.21-.45.51%200%20.9.14%201.22.5V4.36h1.25zm-2.1%202.9c-.75%200-.85.63-.85%201.43%200%20.82.1%201.44.85%201.44s.85-.62.85-1.44c0-.8-.1-1.43-.85-1.43zM5.97%204.36v6.84H4.64V4.36h1.33z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-id-emphasized-inline_clip0_3427_20493'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-id-emphasized-inline_clip1_3427_20493'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-keynote-emphasized-inline.svg
var file_keynote_emphasized_inline_default;
var init_file_keynote_emphasized_inline = __esmMin((() => {
	file_keynote_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-keynote-emphasized-inline'%3e%3cg%20clip-path='url(%23file-keynote-emphasized-inline_clip0_3427_20475)'%3e%3cg%20clip-path='url(%23file-keynote-emphasized-inline_clip1_3427_20475)'%3e%3cpath%20fill='%231E99F6'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M4.91%203.2a.8.8%200%2000-.79.66l-.56%203.2a.8.8%200%2000.8.94h7.29a.8.8%200%2000.79-.94l-.56-3.2a.8.8%200%2000-.79-.66H4.91zM4.6%206.8a.2.2%200%20100%20.4h6.8a.2.2%200%20000-.4H4.6z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8.4%208.4h-.8v4H6a.4.4%200%20000%20.8h4a.4.4%200%20000-.8H8.4v-4z'%20fill-opacity='0.6'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-keynote-emphasized-inline_clip0_3427_20475'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-keynote-emphasized-inline_clip1_3427_20475'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-lr-emphasized-inline.svg
var file_lr_emphasized_inline_default;
var init_file_lr_emphasized_inline = __esmMin((() => {
	file_lr_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-lr-emphasized-inline'%3e%3cg%20clip-path='url(%23file-lr-emphasized-inline_clip0_3427_20488)'%3e%3cg%20clip-path='url(%23file-lr-emphasized-inline_clip1_3427_20488)'%3e%3cpath%20fill='%23001E36'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%2331A8FF'%20d='M11.75%206.14c.5%200%20.84.12%201.18.47l-.93.95c-.19-.2-.35-.3-.66-.3-.38%200-.81.3-.81.93v3.01H9.28v-5h1.22v.48a1.7%201.7%200%20011.25-.54zM5.19%204.36v5.65h3.1v1.19H3.85V4.36H5.2z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-lr-emphasized-inline_clip0_3427_20488'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-lr-emphasized-inline_clip1_3427_20488'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-mail-emphasized-inline.svg
var file_mail_emphasized_inline_default;
var init_file_mail_emphasized_inline = __esmMin((() => {
	file_mail_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-mail-emphasized-inline'%3e%3cg%20clip-path='url(%23file-mail-emphasized-inline_clip0_3427_20617)'%3e%3cg%20clip-path='url(%23file-mail-emphasized-inline_clip1_3427_20617)'%3e%3cpath%20fill='%232788F7'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M4.6%204c-.77%200-1.4.63-1.4%201.4v.73l4.7%201.85c.06.03.14.03.2%200l4.7-1.85V5.4c0-.77-.63-1.4-1.4-1.4H4.6z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M12.8%206.99L8.39%208.73c-.25.1-.53.1-.78%200L3.2%206.99v3.61c0%20.77.63%201.4%201.4%201.4h6.8c.77%200%201.4-.63%201.4-1.4V6.99z'%20fill-opacity='0.6'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-mail-emphasized-inline_clip0_3427_20617'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-mail-emphasized-inline_clip1_3427_20617'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-numbers-emphasized-inline.svg
var file_numbers_emphasized_inline_default;
var init_file_numbers_emphasized_inline = __esmMin((() => {
	file_numbers_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-numbers-emphasized-inline'%3e%3cg%20clip-path='url(%23file-numbers-emphasized-inline_clip0_3427_20443)'%3e%3cg%20clip-path='url(%23file-numbers-emphasized-inline_clip1_3427_20443)'%3e%3cpath%20fill='%2348E442'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M2.8%2011.4c0-.33.27-.6.6-.6h.8c.33%200%20.6.27.6.6V13a.6.6%200%2001-.6.6h-.8a.6.6%200%2001-.6-.6v-1.6z'%20fill-opacity='0.6'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M5.6%208.6c0-.33.27-.6.6-.6H7c.33%200%20.6.27.6.6V13a.6.6%200%2001-.6.6h-.8a.6.6%200%2001-.6-.6V8.6z'%20fill-opacity='0.7'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8.4%203.8c0-.33.27-.6.6-.6h.8c.33%200%20.6.27.6.6V13a.6.6%200%2001-.6.6H9a.6.6%200%2001-.6-.6V3.8z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M11.2%206.2c0-.33.27-.6.6-.6h.8c.33%200%20.6.27.6.6V13a.6.6%200%2001-.6.6h-.8a.6.6%200%2001-.6-.6V6.2z'%20fill-opacity='0.8'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-numbers-emphasized-inline_clip0_3427_20443'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-numbers-emphasized-inline_clip1_3427_20443'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-other-emphasized-inline.svg
var file_other_emphasized_inline_default;
var init_file_other_emphasized_inline = __esmMin((() => {
	file_other_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-other-emphasized-inline'%3e%3cg%20clip-path='url(%23file-other-emphasized-inline_clip0_3427_20539)'%3e%3cg%20clip-path='url(%23file-other-emphasized-inline_clip1_3427_20539)'%3e%3cpath%20fill='%23888B99'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M5%202.8c-.77%200-1.4.63-1.4%201.4v7.6c0%20.77.63%201.4%201.4%201.4h6c.77%200%201.4-.63%201.4-1.4V6.58c0-.37-.15-.73-.41-.99L9.61%203.21a1.4%201.4%200%2000-.99-.41H5z'%20fill-opacity='0.6'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8.8%202.81V5.6c0%20.44.36.8.8.8h2.79a1.4%201.4%200%2000-.4-.81L9.61%203.21a1.4%201.4%200%2000-.81-.4z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-other-emphasized-inline_clip0_3427_20539'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-other-emphasized-inline_clip1_3427_20539'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-pages-emphasized-inline.svg
var file_pages_emphasized_inline_default;
var init_file_pages_emphasized_inline = __esmMin((() => {
	file_pages_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-pages-emphasized-inline'%3e%3cg%20clip-path='url(%23file-pages-emphasized-inline_clip0_3427_20436)'%3e%3cg%20clip-path='url(%23file-pages-emphasized-inline_clip1_3427_20436)'%3e%3cpath%20fill='%23FE9E21'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M9.84%204.2l.27-.23c.42-.32%201.63-1.23%201.99-.87.35.35-.56%201.57-.88%201.98l-.23.27L8.46%208.1a.4.4%200%2001-.57.02l-.83-.83a.4.4%200%2001.02-.57L9.84%204.2zM3.91%2010.15a4%204%200%2000-.6.77l-.3.5a.2.2%200%2000.03.25l.48.48a.2.2%200%2000.25.04l.5-.3a4%204%200%2000.77-.6l2.72-2.73a.1.1%200%20000-.14l-1-.99a.1.1%200%2000-.13%200L3.9%2010.15zM2.82%2012.02a.04.04%200%2000-.06%200l-.35.58a.13.13%200%2000.18.18l.57-.35a.04.04%200%2000.01-.06l-.35-.35z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M5.2%2012h8a.4.4%200%20010%20.8H4l1.2-.8z'%20fill-opacity='0.6'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-pages-emphasized-inline_clip0_3427_20436'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-pages-emphasized-inline_clip1_3427_20436'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-pdf-emphasized-inline.svg
var file_pdf_emphasized_inline_default;
var init_file_pdf_emphasized_inline = __esmMin((() => {
	file_pdf_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-pdf-emphasized-inline'%3e%3cg%20clip-path='url(%23file-pdf-emphasized-inline_clip0_3427_20645)'%3e%3cg%20clip-path='url(%23file-pdf-emphasized-inline_clip1_3427_20645)'%3e%3cpath%20fill='%23E63D33'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M7.65%202.8c.69%200%20.98.6.98%201.52a9.9%209.9%200%2001-.45%202.55l.04-.15c.12.21.25.43.4.64l.14.2.1.13c.25.34.53.65.82.93l.14.12c1-.17%201.84-.19%202.43-.04.75.19%201.13.7.86%201.37-.41%201.03-2.03.68-3.5-.5-.36.07-.73.17-1.12.28l-.29.09-.15.05-1.37.46-.1.04a9.53%209.53%200%2001-1.71%202.17c-.7.61-1.38.75-1.83.17-.43-.54-.27-1.14.35-1.64.48-.4%201.3-.8%202.48-1.26l.2-.08.12-.2.48-.9.14-.31c.19-.42.37-.91.54-1.42l.06-.21C6.38%204.8%206.36%202.8%207.65%202.8zM5.3%2011.03l.04-.06-.06.03c-.67.29-1.14.56-1.44.8-.32.26-.35.38-.23.54.11.14.34.1.77-.27.25-.22.53-.53.81-.9l.1-.14zm6.76-1.58c-.27-.07-.63-.09-1.06-.07l-.17.01-.13.01.1.06c.23.14.46.24.68.32l.12.04.12.03c.42.1.65.04.7-.08.05-.15%200-.23-.36-.32zM7.94%207.7l-.02.06-.02-.04-.02.08c-.1.27-.2.54-.31.78l-.08.19-.2.42-.13.26.05-.02-.02.03.39-.13.4-.13.44-.14.22-.06.24-.06-.03-.02h.05l-.02-.02-.32-.36-.15-.19-.15-.19-.1-.13-.07-.1-.07-.1-.08-.13zm-.3-4.12c-.3%200-.36.81.03%201.93l.04.13.03-.1c.06-.35.11-.67.13-.95v-.14l.01-.13c0-.54-.1-.74-.23-.74z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-pdf-emphasized-inline_clip0_3427_20645'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-pdf-emphasized-inline_clip1_3427_20645'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-ppt-emphasized-inline.svg
var file_ppt_emphasized_inline_default;
var init_file_ppt_emphasized_inline = __esmMin((() => {
	file_ppt_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-ppt-emphasized-inline'%3e%3cg%20clip-path='url(%23file-ppt-emphasized-inline_clip0_3427_20434)'%3e%3cg%20clip-path='url(%23file-ppt-emphasized-inline_clip1_3427_20434)'%3e%3cpath%20fill='%23C43E1C'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M7.1%209.1V12H5.8V4h2.37c.9%200%201.6.21%202.09.64.5.43.74%201.03.74%201.8%200%20.79-.26%201.42-.77%201.92a2.9%202.9%200%2001-2.1.74H7.1zm0-4v2.92h.83c.56%200%20.98-.14%201.27-.4.3-.26.44-.64.44-1.12%200-.94-.54-1.4-1.6-1.4h-.95z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-ppt-emphasized-inline_clip0_3427_20434'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-ppt-emphasized-inline_clip1_3427_20434'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-pr-emphasized-inline.svg
var file_pr_emphasized_inline_default;
var init_file_pr_emphasized_inline = __esmMin((() => {
	file_pr_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-pr-emphasized-inline'%3e%3cg%20clip-path='url(%23file-pr-emphasized-inline_clip0_3427_20489)'%3e%3cg%20clip-path='url(%23file-pr-emphasized-inline_clip1_3427_20489)'%3e%3cpath%20fill='%2300005B'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%2399F'%20d='M12%206.14c.5%200%20.84.12%201.19.47l-.93.95c-.2-.2-.36-.3-.67-.3-.38%200-.81.3-.81.93v3.01H9.53v-5h1.22v.48A1.7%201.7%200%200112%206.14zM3.6%204.36h2.65c1.42%200%202.25.97%202.25%202.14%200%201.16-.83%202.13-2.25%202.13H4.93v2.57H3.6V4.36zm2.58%201.2H4.93v1.88h1.25c.6%200%20.99-.39.99-.94%200-.57-.38-.94-.99-.94z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-pr-emphasized-inline_clip0_3427_20489'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-pr-emphasized-inline_clip1_3427_20489'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-ps-emphasized-inline.svg
var file_ps_emphasized_inline_default;
var init_file_ps_emphasized_inline = __esmMin((() => {
	file_ps_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-ps-emphasized-inline'%3e%3cg%20clip-path='url(%23file-ps-emphasized-inline_clip0_3427_20485)'%3e%3cg%20clip-path='url(%23file-ps-emphasized-inline_clip1_3427_20485)'%3e%3cpath%20fill='%23001E36'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%2331A8FF'%20d='M10.98%206.14c.78%200%201.43.14%201.9.59l-.76.77c-.29-.26-.72-.33-1.16-.33-.5%200-.71.23-.71.48%200%20.26.14.4.52.43l.78.08c1%20.1%201.5.61%201.5%201.47%200%201.1-.95%201.63-2.13%201.63-.79%200-1.49-.09-2.13-.72l.81-.82c.4.41.95.47%201.34.47.43%200%20.88-.14.88-.52%200-.25-.12-.42-.53-.46l-.78-.07c-.9-.1-1.46-.48-1.46-1.4%200-1.05.9-1.6%201.93-1.6zM3.41%204.36h2.65c1.42%200%202.26.97%202.26%202.14%200%201.16-.84%202.13-2.26%202.13H4.75v2.57H3.4V4.36zM6%205.56H4.75v1.88h1.24c.6%200%201-.39%201-.94%200-.57-.4-.94-1-.94z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-ps-emphasized-inline_clip0_3427_20485'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-ps-emphasized-inline_clip1_3427_20485'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-sketch-emphasized-inline.svg
var file_sketch_emphasized_inline_default;
var init_file_sketch_emphasized_inline = __esmMin((() => {
	file_sketch_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-sketch-emphasized-inline'%3e%3cg%20clip-path='url(%23file-sketch-emphasized-inline_clip0_3427_20494)'%3e%3cg%20clip-path='url(%23file-sketch-emphasized-inline_clip1_3427_20494)'%3e%3cpath%20fill='%23FAA700'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M13.94%206.8H2.06c0-.04%200-.1.03-.13l2.37-3.26a.6.6%200%2001.42-.24L8%202.8l3.12.37c.17.02.32.1.42.24l2.37%203.26a.2.2%200%2001.03.13z'%20fill-opacity='0.5'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M11.12%203.17c.1.01.2.04.27.1l.21%203.53H4.4l.21-3.53a.6.6%200%2001.27-.1L8%202.8l3.12.37z'%20fill-opacity='0.4'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8%202.8l-3.6%204h7.2L8%202.8z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M2.1%206.92l5.75%206.51a.2.2%200%2000.3%200l5.74-6.51c.05-.05%200-.12-.08-.12H2.2c-.07%200-.13.07-.08.12z'%20fill-opacity='0.3'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8.06%2013.49a.2.2%200%2001-.12%200L4.4%206.8h7.2l-3.54%206.69z'%20fill-opacity='0.4'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-sketch-emphasized-inline_clip0_3427_20494'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-sketch-emphasized-inline_clip1_3427_20494'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-smartdoc-20.svg
var file_smartdoc_20_default;
var init_file_smartdoc_20 = __esmMin((() => {
	file_smartdoc_20_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2020%2020'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-smartdoc-20'%3e%3cg%20clip-path='url(%23file-smartdoc-20_clip0_8074_18427)'%3e%3cg%20clip-path='url(%23file-smartdoc-20_clip1_8074_18427)'%3e%3cpath%20fill='%233999DA'%20d='M5%206.5C5%205.67%205.67%205%206.5%205h12c.83%200%201.5.67%201.5%201.5v12c0%20.83-.67%201.5-1.5%201.5h-12A1.5%201.5%200%20015%2018.5v-12z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%235FB8F3'%20d='M1.5%200C.67%200%200%20.67%200%201.5v17c0%20.83.67%201.5%201.5%201.5h17a1.5%201.5%200%2001-1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-14z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M13.75%2014.25v1.25H9v-1.25h4.75zm0-1.63H11v-1.24h2.75v1.24zm0-2.87H9V8.5h4.75v1.25z'%20opacity='0.75'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M5.51%208.54c.08-.22.4-.22.48%200l.8%202.27c.02.07.08.13.15.15l2.27.8c.22.08.22.4%200%20.48l-2.27.8a.25.25%200%2000-.15.15l-.8%202.27a.25.25%200%2001-.48%200l-.8-2.27a.25.25%200%2000-.15-.15l-2.27-.8a.25.25%200%20010-.48l2.27-.8a.25.25%200%2000.15-.15l.8-2.27z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-smartdoc-20_clip0_8074_18427'%3e%3cpath%20fill='%23fff'%20d='M0%200h20v20H0z'%3e%3c/path%3e%3c/clipPath%3e%3cclipPath%20id='file-smartdoc-20_clip1_8074_18427'%3e%3cpath%20fill='%23fff'%20d='M0%200h20v20H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-ssform-inline.svg
var file_ssform_inline_default;
var init_file_ssform_inline = __esmMin((() => {
	file_ssform_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-ssform-inline'%3e%3cg%20clip-path='url(%23file-ssform-inline_clip0_3922_199436)'%3e%3cg%20clip-path='url(%23file-ssform-inline_clip1_3922_199436)'%3e%3cpath%20fill='%234B95F3'%20d='M0%202C0%20.9.9%200%202%200h12a2%202%200%20012%202v12a2%202%200%2001-2%202H2a2%202%200%2001-2-2V2z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M5%202.8c-.77%200-1.4.63-1.4%201.4v7.6c0%20.77.63%201.4%201.4%201.4h6c.77%200%201.4-.63%201.4-1.4V4.2c0-.77-.63-1.4-1.4-1.4H5zm.6%202.1a.5.5%200%20100%201h4.8a.5.5%200%20000-1H5.6zm-.5%202.7c0-.28.22-.5.5-.5H8a.5.5%200%20010%201H5.6a.5.5%200%2001-.5-.5zm6.1%201.9a.5.5%200%2000-.8-.6l-1.45%201.94-.6-.6a.5.5%200%2010-.7.71l.96.97c.24.23.62.2.82-.06L11.2%209.5z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-ssform-inline_clip0_3922_199436'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-ssform-inline_clip1_3922_199436'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-svg-emphasized-inline.svg
var file_svg_emphasized_inline_default;
var init_file_svg_emphasized_inline = __esmMin((() => {
	file_svg_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-svg-emphasized-inline'%3e%3cg%20clip-path='url(%23file-svg-emphasized-inline_clip0_3427_20646)'%3e%3cg%20clip-path='url(%23file-svg-emphasized-inline_clip1_3427_20646)'%3e%3cpath%20fill='%23F7AB39'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.6%203.6a.8.8%200%2000-.8.8v.8c0%20.44.36.8.8.8h.8a.8.8%200%2000.8-.8c.62%200%201.06.17%201.38.42.32.25.55.58.7.94A3.95%203.95%200%20017.6%208v.01a2.19%202.19%200%20000%20.15%204.87%204.87%200%2000.38%201.6c.2.44.5.9.96%201.26.47.35%201.08.58%201.86.58%200%20.44.36.8.8.8h.8a.8.8%200%2000.8-.8v-.8a.8.8%200%2000-.8-.8h-.8a.8.8%200%2000-.8.8%202.2%202.2%200%2001-1.38-.42%202.34%202.34%200%2001-.7-.94A3.95%203.95%200%20018.4%208v-.01a2.19%202.19%200%20000-.15%204.87%204.87%200%2000-.38-1.6c-.2-.44-.5-.9-.96-1.26A2.99%202.99%200%20005.2%204.4a.8.8%200%2000-.8-.8h-.8zm.8.8h-.8v.8h.8v-.8zm8%206.4h-.8v.8h.8v-.8z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M10%205.6a.8.8%200%2010-.7-1.2H5.2v.8h4.1c.15.24.4.4.7.4zM6%2012a.8.8%200%2011.7-1.2h4.1v.8H6.7a.8.8%200%2001-.7.4z'%20fill-opacity='0.6'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-svg-emphasized-inline_clip0_3427_20646'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-svg-emphasized-inline_clip1_3427_20646'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-sw-emphasized-inline.svg
var file_sw_emphasized_inline_default;
var init_file_sw_emphasized_inline = __esmMin((() => {
	file_sw_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-sw-emphasized-inline'%3e%3cg%20clip-path='url(%23file-sw-emphasized-inline_clip0_3427_20515)'%3e%3cg%20clip-path='url(%23file-sw-emphasized-inline_clip1_3427_20515)'%3e%3cpath%20fill='%23FF3934'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M14.73%205.76l-1.21%204.56h-.75l-.84-2.76-.83%202.76h-.74L9.13%205.76h.93l.7%202.87.85-2.87h.65l.84%202.87.7-2.87h.93zM5.47%205.76h1.65c.62%200%201.06.23%201.37.66.28.4.29.86.29%201.62%200%20.75%200%201.22-.29%201.61-.31.43-.75.67-1.37.67H5.47V5.76zm1.57.8h-.68v2.96h.68c.3%200%20.52-.1.66-.28.17-.2.19-.48.19-1.2s-.02-1-.19-1.2c-.14-.2-.36-.29-.66-.29zM3.05%205.72c.62%200%201.08.15%201.47.53l-.56.56c-.25-.25-.52-.32-.94-.32-.47%200-.7.27-.7.58%200%20.12.04.24.13.33.1.08.23.14.42.17l.54.08c.42.06.67.17.87.36.25.23.35.55.35.96%200%20.88-.73%201.38-1.69%201.38-.69%200-1.21-.14-1.66-.6l.58-.57c.28.28.67.38%201.1.38.52%200%20.8-.2.8-.57a.51.51%200%2000-.14-.38c-.09-.08-.19-.12-.4-.15l-.55-.08A1.57%201.57%200%20011.79%208a1.2%201.2%200%2001-.33-.9c0-.81.6-1.38%201.59-1.38z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-sw-emphasized-inline_clip0_3427_20515'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-sw-emphasized-inline_clip1_3427_20515'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-text-emphasized-inline.svg
var file_text_emphasized_inline_default;
var init_file_text_emphasized_inline = __esmMin((() => {
	file_text_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-text-emphasized-inline'%3e%3cg%20clip-path='url(%23file-text-emphasized-inline_clip0_3427_20545)'%3e%3cg%20clip-path='url(%23file-text-emphasized-inline_clip1_3427_20545)'%3e%3cpath%20fill='%23888B99'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.2%204.2c0-.33.27-.6.6-.6h8.4a.6.6%200%20110%201.2H3.8a.6.6%200%2001-.6-.6z'%20fill-opacity='0.8'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.2%206.6c0-.33.27-.6.6-.6h8.4a.6.6%200%20110%201.2H3.8a.6.6%200%2001-.6-.6z'%20fill-opacity='0.7'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.2%209c0-.33.27-.6.6-.6h8.4a.6.6%200%20110%201.2H3.8a.6.6%200%2001-.6-.6z'%20fill-opacity='0.6'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.2%2011.4c0-.33.27-.6.6-.6H9A.6.6%200%20019%2012H3.8a.6.6%200%2001-.6-.6z'%20fill-opacity='0.4'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-text-emphasized-inline_clip0_3427_20545'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-text-emphasized-inline_clip1_3427_20545'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-tpdf-64.svg
var file_tpdf_64_default;
var init_file_tpdf_64 = __esmMin((() => {
	file_tpdf_64_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2064%2064'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-tpdf-64'%3e%3cg%20clip-path='url(%23file-tpdf-64_clip0_254_304045)'%3e%3cg%20clip-path='url(%23file-tpdf-64_clip1_254_304045)'%3e%3cg%20clip-path='url(%23file-tpdf-64_clip2_254_304045)'%3e%3cpath%20fill='%23D9443A'%20d='M16%2021.4a5.4%205.4%200%20015.4-5.4h37.2a5.4%205.4%200%20015.4%205.4V59a5%205%200%2001-5%205H21.4a5.4%205.4%200%2001-5.4-5.4V21.4z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23F26A62'%20d='M5.4%200A5.4%205.4%200%20000%205.4v53.2A5.4%205.4%200%20005.4%2064H54V5.4A5.4%205.4%200%200048.6%200H5.4zM54%2064v-5a5%205%200%20005%205h-5z'%3e%3c/path%3e%3cg%20fill='%23fff'%20opacity='0.5'%3e%3cpath%20d='M28.65%2023.01l-6.44.16.02.14.05.68.02.66c.1%205.3-1.97%2011.48-5.66%2016.52a25.97%2025.97%200%2001-7.38%206.73l1.28-.73a58.6%2058.6%200%200113.43-5.4c3.23-5.4%204.86-11.01%204.76-16.5%200-.67-.04-1.23-.07-1.66v-.6zM9.25%2047.9z'%3e%3c/path%3e%3c/g%3e%3cpath%20fill='%23fff'%20d='M40.9%2046.15l.4-6.43-.42-.01c-2.76-.1-7.54.15-11.94.95a59.6%2059.6%200%2000-18.4%206.5l-1.29.75%203.28%205.54.03-.02a52.97%2052.97%200%200117.53-6.44%2070.76%2070.76%200%200110.16-.86l.65.02z'%20opacity='0.75'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M22.22%2023.17a25.5%2025.5%200%20008.75%2017.89c1.96%201.68%206.46%204.18%208.18%204.64.96.27%201.75.45%201.75.45l.4-6.43a21.27%2021.27%200%2001-6.13-3.54%2019.23%2019.23%200%2001-6.34-11.66l-.1-.67-.06-.51-.02-.33-6.43.16z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-tpdf-64_clip0_254_304045'%3e%3cpath%20fill='%23fff'%20d='M0%200h64v64H0z'%3e%3c/path%3e%3c/clipPath%3e%3cclipPath%20id='file-tpdf-64_clip1_254_304045'%3e%3cpath%20fill='%23fff'%20d='M0%200h64v64H0z'%3e%3c/path%3e%3c/clipPath%3e%3cclipPath%20id='file-tpdf-64_clip2_254_304045'%3e%3cpath%20fill='%23fff'%20d='M0%200h64v64H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-video-emphasized-inline.svg
var file_video_emphasized_inline_default;
var init_file_video_emphasized_inline = __esmMin((() => {
	file_video_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-video-emphasized-inline'%3e%3cg%20clip-path='url(%23file-video-emphasized-inline_clip0_3427_20563)'%3e%3cg%20clip-path='url(%23file-video-emphasized-inline_clip1_3427_20563)'%3e%3cpath%20fill='%2327A0F7'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M2.4%205.6c0-.66.54-1.2%201.2-1.2h5.6c.66%200%201.2.54%201.2%201.2v4.8c0%20.66-.54%201.2-1.2%201.2H3.6a1.2%201.2%200%2001-1.2-1.2V5.6z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M11.2%206.8l1.38-1.38a.6.6%200%20011.02.43v4.3a.6.6%200%2001-1.02.43L11.2%209.2V6.8z'%20fill-opacity='0.8'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-video-emphasized-inline_clip0_3427_20563'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-video-emphasized-inline_clip1_3427_20563'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-word-emphasized-inline.svg
var file_word_emphasized_inline_default;
var init_file_word_emphasized_inline = __esmMin((() => {
	file_word_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-word-emphasized-inline'%3e%3cg%20clip-path='url(%23file-word-emphasized-inline_clip0_3427_20418)'%3e%3cg%20clip-path='url(%23file-word-emphasized-inline_clip1_3427_20418)'%3e%3cpath%20fill='%23185ABD'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M13.2%204.4l-2.11%208H9.64L8.17%206.8c-.06-.23-.1-.5-.11-.78h-.02c-.02.27-.06.52-.13.77L6.43%2012.4H4.96l-2.16-8h1.4l1.4%205.86c.06.24.1.5.1.77h.04c.01-.2.06-.45.15-.77L7.47%204.4h1.31l1.47%205.9c.05.2.09.44.11.72h.02c.01-.19.05-.44.13-.74l1.37-5.88h1.32z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-word-emphasized-inline_clip0_3427_20418'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-word-emphasized-inline_clip1_3427_20418'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-xmind-emphasized-inline.svg
var file_xmind_emphasized_inline_default;
var init_file_xmind_emphasized_inline = __esmMin((() => {
	file_xmind_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-xmind-emphasized-inline'%3e%3cg%20clip-path='url(%23file-xmind-emphasized-inline_clip0_3427_20509)'%3e%3cg%20clip-path='url(%23file-xmind-emphasized-inline_clip1_3427_20509)'%3e%3cpath%20fill='%23F94319'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.55%203.2a.6.6%200%2001.85-.05l3.47%203.12c.07.07.19.07.26%200l3.47-3.12a.6.6%200%2001.8.9L8.94%207.16a1.4%201.4%200%2001-1.88%200L3.6%204.05a.6.6%200%2001-.05-.85z'%20fill-opacity='0.6'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M3.55%203.2a.6.6%200%2001.85-.05L8%206.35a.6.6%200%2001-.8.9l-3.6-3.2a.6.6%200%2001-.05-.85z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M12.45%2012.8a.6.6%200%2001-.85.05L8.13%209.73a.2.2%200%2000-.26%200L4.4%2012.85a.6.6%200%2001-.8-.9l3.46-3.11a1.4%201.4%200%20011.88%200l3.46%203.11c.25.23.27.6.05.85z'%20fill-opacity='0.6'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M12.45%2012.8a.6.6%200%2001-.85.05L8%209.65a.6.6%200%2001.8-.9l3.6%203.2c.25.22.27.6.05.85z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-xmind-emphasized-inline_clip0_3427_20509'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-xmind-emphasized-inline_clip1_3427_20509'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/file-zip-emphasized-inline.svg
var file_zip_emphasized_inline_default;
var init_file_zip_emphasized_inline = __esmMin((() => {
	file_zip_emphasized_inline_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-file-zip-emphasized-inline'%3e%3cg%20clip-path='url(%23file-zip-emphasized-inline_clip0_3427_20573)'%3e%3cg%20clip-path='url(%23file-zip-emphasized-inline_clip1_3427_20573)'%3e%3cpath%20fill='%233084E3'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8%2010a.4.4%200%20100%20.8.4.4%200%20000-.8z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M4.6%203.2c-.77%200-1.4.63-1.4%201.4v6.8c0%20.77.63%201.4%201.4%201.4h6.8c.77%200%201.4-.63%201.4-1.4V4.6c0-.77-.63-1.4-1.4-1.4H4.6zm4.2%201.2a.4.4%200%20110%20.8H7.2a.4.4%200%20010-.8h1.6zm.4%202a.4.4%200%2000-.4-.4H7.2a.4.4%200%20100%20.8h1.6a.4.4%200%2000.4-.4zm0%204c0-.52-.33-.96-.79-1.13v-.86h.39a.4.4%200%2000.4-.4V8a.4.4%200%2000-.4-.4H7.2a.4.4%200%20000%20.8h.4v.87a1.2%201.2%200%20101.6%201.13z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='file-zip-emphasized-inline_clip0_3427_20573'%3e%3crect%20width='16'%20height='16'%20fill='%23fff'%20rx='2'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='file-zip-emphasized-inline_clip1_3427_20573'%3e%3cpath%20fill='%23fff'%20d='M0%200h16v16H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filetype-tdoc-flowchart.svg
var filetype_tdoc_flowchart_default;
var init_filetype_tdoc_flowchart = __esmMin((() => {
	filetype_tdoc_flowchart_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2032%2032'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filetype-tdoc-flowchart'%3e%3cpath%20fill='%234C63E9'%20d='M8%2010c0-1.47%201.2-2.67%202.67-2.67h18.66C30.81%207.33%2032%208.53%2032%2010v19.33c0%201.48-1.2%202.67-2.67%202.67H10.67A2.67%202.67%200%20018%2029.33V10z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%237187FF'%20d='M2.67%200A2.67%202.67%200%20000%202.67v26.66C0%2030.81%201.2%2032%202.67%2032H29.3a2.67%202.67%200%2001-2.64-2.65V2.67C26.67%201.19%2025.47%200%2024%200H2.67z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20stroke='%23fff'%20d='M18.67%2013.33h-7.34A2.67%202.67%200%20008.67%2016v0c0%201.47%201.2%202.67%202.66%202.67H16c1.47%200%202.67%201.19%202.67%202.66v0c0%201.48-1.2%202.67-2.67%202.67H8.67'%20opacity='0.75'%20stroke-width='2.67'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M15.33%2013.33l3-3%203%203-3%203-3-3zM10.67%2022h-4v4h4v-4z'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filetype-tdoc-folder.svg
var filetype_tdoc_folder_default;
var init_filetype_tdoc_folder = __esmMin((() => {
	filetype_tdoc_folder_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2032%2032'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filetype-tdoc-folder'%3e%3cpath%20fill='url(%23filetype-tdoc-folder_paint0_linear_427_4773)'%20d='M0%2026.67V5.33c0-1.47%201.2-2.66%202.67-2.66h6.75c.79%200%201.54.35%202.05.96L14%206.67h15.33c1.48%200%202.67%201.2%202.67%202.66v17.34c0%201.47-1.2%202.66-2.67%202.66H2.67A2.67%202.67%200%20010%2026.67z'%3e%3c/path%3e%3cdefs%3e%3clinearGradient%20id='filetype-tdoc-folder_paint0_linear_427_4773'%20x1='16.08'%20x2='-10.01'%20y1='-10.6'%20y2='20.71'%20gradient-units='userSpaceOnUse'%3e%3cstop%20stop-color='%236BBEFE'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%2359ABFE'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filetype-tdoc-mindmap.svg
var filetype_tdoc_mindmap_default;
var init_filetype_tdoc_mindmap = __esmMin((() => {
	filetype_tdoc_mindmap_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2032%2032'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filetype-tdoc-mindmap'%3e%3cpath%20fill='%239552E0'%20d='M8%2010c0-1.47%201.2-2.67%202.67-2.67h18.66C30.81%207.33%2032%208.53%2032%2010v19.33c0%201.48-1.2%202.67-2.67%202.67H10.67A2.67%202.67%200%20018%2029.33V10z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23B478F7'%20d='M2.67%200A2.67%202.67%200%20000%202.67v26.66C0%2030.81%201.2%2032%202.67%2032H29.3a2.67%202.67%200%2001-2.64-2.65V2.67C26.67%201.19%2025.47%200%2024%200H2.67z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20stroke='%23fff'%20d='M20%2014.67h-6.33a5%205%200%2000-5%205v0a5%205%200%20005%205H20'%20opacity='0.75'%20stroke-width='2.67'%3e%3c/path%3e%3crect%20width='6'%20height='6'%20x='5.33'%20y='16.67'%20fill='%23fff'%20rx='3'%3e%3c/rect%3e%3cpath%20fill='%23fff'%20d='M19.33%2012.67a2%202%200%20110%204%202%202%200%20010-4zM19.33%2022.67a2%202%200%20110%204%202%202%200%20010-4z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filetype-tdoc-tdoc.svg
var filetype_tdoc_tdoc_default;
var init_filetype_tdoc_tdoc = __esmMin((() => {
	filetype_tdoc_tdoc_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2032%2032'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filetype-tdoc-tdoc'%3e%3cpath%20fill='%232272DB'%20d='M8%2010c0-1.47%201.2-2.67%202.67-2.67h18.66C30.81%207.33%2032%208.53%2032%2010v19.33c0%201.48-1.2%202.67-2.67%202.67H10.67A2.67%202.67%200%20018%2029.33V10z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%234B95F3'%20d='M2.67%200A2.67%202.67%200%20000%202.67v26.66C0%2030.81%201.2%2032%202.67%2032H29.3a2.67%202.67%200%2001-2.64-2.67V2.67C26.67%201.19%2025.47%200%2024%200H2.67z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M21.33%2022.67v2.66H6v-2.66h15.33z'%20opacity='0.75'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M21.33%2017.33V20H6v-2.67h15.33z'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filetype-tdoc-tform.svg
var filetype_tdoc_tform_default;
var init_filetype_tdoc_tform = __esmMin((() => {
	filetype_tdoc_tform_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2032%2032'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filetype-tdoc-tform'%3e%3cpath%20fill='%23E79B00'%20d='M8%2010c0-1.47%201.2-2.67%202.67-2.67h18.66C30.81%207.33%2032%208.53%2032%2010v19.33c0%201.48-1.2%202.67-2.67%202.67H10.67A2.67%202.67%200%20018%2029.33V10z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23FFBA30'%20d='M2.67%200A2.67%202.67%200%20000%202.67v26.66C0%2030.81%201.2%2032%202.67%2032H29.3a2.67%202.67%200%2001-2.64-2.65V2.67C26.67%201.19%2025.47%200%2024%200H2.67z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M8.55%2017.45l-1.88%201.88%203.77%203.77L12.32%2025l1.89-1.89%207.54-7.54-1.88-1.88-7.55%207.54-3.77-3.77z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filetype-tdoc-tsheet.svg
var filetype_tdoc_tsheet_default;
var init_filetype_tdoc_tsheet = __esmMin((() => {
	filetype_tdoc_tsheet_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2032%2032'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filetype-tdoc-tsheet'%3e%3cpath%20fill='%231BAB3D'%20d='M8%2010c0-1.47%201.2-2.67%202.67-2.67h18.66C30.81%207.33%2032%208.53%2032%2010v19.33c0%201.48-1.2%202.67-2.67%202.67H10.67A2.67%202.67%200%20018%2029.33V10z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%2344C966'%20d='M2.67%200A2.67%202.67%200%20000%202.67v26.66C0%2030.81%201.2%2032%202.67%2032H29.3a2.67%202.67%200%2001-2.64-2.67V2.67C26.67%201.19%2025.47%200%2024%200H2.67z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M21.33%2025.33v-2.66h-6.66v2.66h6.66zm-8.66%200v-2.66H6v2.66h6.67z'%20opacity='0.75'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M12.67%2020v-2.67H6V20h6.67zm8.66%200v-2.67h-6.66V20h6.66z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filetype-tdoc-tslide.svg
var filetype_tdoc_tslide_default;
var init_filetype_tdoc_tslide = __esmMin((() => {
	filetype_tdoc_tslide_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2032%2032'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filetype-tdoc-tslide'%3e%3cpath%20fill='%23E7552B'%20d='M8%2010c0-1.47%201.2-2.67%202.67-2.67h18.66C30.81%207.33%2032%208.53%2032%2010v19.33c0%201.48-1.2%202.67-2.67%202.67H10.67A2.67%202.67%200%20018%2029.33V10z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23FF7A56'%20d='M2.67%200A2.67%202.67%200%20000%202.67v26.66C0%2030.81%201.2%2032%202.67%2032H29.3a2.67%202.67%200%2001-2.64-2.65V2.67C26.67%201.19%2025.47%200%2024%200H2.67z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M20.64%2020a7.33%207.33%200%2011-7.97-7.97V20h7.97z'%20opacity='0.75'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M20.64%2018.66A7.34%207.34%200%200014%2012.03v6.63h6.64z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/list-space-24.svg
var list_space_24_default;
var init_list_space_24 = __esmMin((() => {
	list_space_24_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-list-space-24'%3e%3cpath%20fill='%236CA9F7'%20d='M22%207.76c0-.89-.49-1.7-1.27-2.12l-7.6-4.04a2.4%202.4%200%2000-2.26%200l-7.6%204.04A2.4%202.4%200%20002%207.76v8.49c0%20.89.5%201.7%201.28%202.12l7.6%204.03c.7.38%201.54.38%202.25%200l7.6-4.03A2.4%202.4%200%200022%2016.25V7.76z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='url(%23list-space-24_paint0_linear_1417_33037)'%20d='M22%207.76c0-.89-.5-1.7-1.27-2.12l-7.6-4.04a2.4%202.4%200%2000-2.26%200l-7.6%204.04A2.4%202.4%200%20002%207.76v8.49c0%20.89.49%201.7%201.27%202.12l7.6%204.03c.7.38%201.55.38%202.25%200l7.6-4.03A2.4%202.4%200%200022%2016.25V7.76z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='url(%23list-space-24_paint1_radial_1417_33037)'%20d='M12.56%2011.75l7.96-4.5-8.55%203.53L3.5%207.27l7.93%204.5.56%209.14.57-9.16z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cdefs%3e%3cradialGradient%20id='list-space-24_paint1_radial_1417_33037'%20cx='0'%20cy='0'%20r='1'%20gradient-transform='matrix(.00007%209.54685%20-11.8874%20.00008%2012.01%2011.37)'%20gradient-units='userSpaceOnUse'%3e%3cstop%20stop-color='%23fff'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%23fff'%20stop-opacity='0.7'%3e%3c/stop%3e%3c/radialGradient%3e%3clinearGradient%20id='list-space-24_paint0_linear_1417_33037'%20x1='2'%20x2='22'%20y1='0.89'%20y2='23.11'%20gradient-units='userSpaceOnUse'%3e%3cstop%20stop-color='%2382BEFA'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%235897F5'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/treport.svg
var treport_default;
var init_treport = __esmMin((() => {
	treport_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-treport'%3e%3cg%20clip-path='url(%23treport_clip0_519_62858)'%3e%3cpath%20fill='%23E48125'%20d='M4.5%205.7c0-.66.54-1.2%201.2-1.2h8.1c.66%200%201.2.54%201.2%201.2V14a1%201%200%2001-1%201H5.7a1.2%201.2%200%2001-1.2-1.2V5.7z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23FC9D45'%20d='M2.2%201C1.54%201%201%201.54%201%202.2v11.6c0%20.66.54%201.2%201.2%201.2H14a1%201%200%2001-1-1V2.2c0-.66-.54-1.2-1.2-1.2H2.2z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M7.5%2011v1h-4v-1h4z'%20opacity='0.75'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M10.5%209v1h-7V9h7z'%3e%3c/path%3e%3ccircle%20cx='5'%20cy='5'%20r='1'%20fill='%23fff'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='treport_clip0_519_62858'%3e%3cpath%20fill='%23fff'%20d='M0%200h14v14H0z'%20transform='translate(1%201)'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/tsmartsheet.svg
var tsmartsheet_default;
var init_tsmartsheet = __esmMin((() => {
	tsmartsheet_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-tsmartsheet'%3e%3cpath%20fill='%2300A691'%20d='M4.5%204.5h9.33c.65%200%201.17.52%201.17%201.17v8.16c0%20.65-.52%201.17-1.17%201.17H4.5V4.5z'%3e%3c/path%3e%3cpath%20fill='%2315CFB0'%20d='M2.17%201C1.52%201%201%201.52%201%202.17v11.66c0%20.65.52%201.17%201.17%201.17h11.65c-.64%200-1.15-.53-1.15-1.17V2.17c0-.65-.53-1.17-1.17-1.17H2.17z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3cpath%20stroke='%23fff'%20d='M5.95%208.76L4.31%207.24M7.66%208.76L9.3%207.24'%20stroke-width='1.46'%3e%3c/path%3e%3cpath%20stroke='%23fff'%20d='M7.66%2010.5L9.3%2012M5.95%2010.5L4.31%2012'%20stroke-opacity='0.75'%20stroke-width='1.46'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/vector.svg
var vector_default;
var init_vector = __esmMin((() => {
	vector_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2016%2016'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-vector'%3e%3crect%20width='15'%20height='15'%20x='0.5'%20y='0.5'%20fill='%23fff'%20stroke='%23D8D8D8'%20rx='2.5'%3e%3c/rect%3e%3crect%20width='11'%20height='1'%20x='2.5'%20y='5'%20fill='%23D8D8D8'%20rx='0.44'%3e%3c/rect%3e%3cpath%20fill='%237F8A9A'%20d='M6.93%206.14a4%204%200%2000-2.79%202.79%201.25%201.25%200%2011-1-.13A5%205%200%20016.8%205.14a1.25%201.25%200%20012.4%200%205%205%200%20013.66%203.66%201.25%201.25%200%2011-1%20.13%204%204%200%2000-2.79-2.79%201.25%201.25%200%2001-2.14%200z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/wecom/pc/svg/avatar_member_30.svg
var avatar_member_30_default;
var init_avatar_member_30 = __esmMin((() => {
	avatar_member_30_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='30px'%20height='30px'%20viewBox='0%200%2030%2030'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20id='Component/Avatar/30,4px/Placeholder'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='M5.1277704,-2.07168062e-16%20L24.8722296,2.07168062e-16%20C26.6552671,-1.2037061e-16%2027.3018396,0.185651222%2027.9536914,0.534265408%20C28.6055433,0.882879593%2029.1171204,1.39445674%2029.4657346,2.04630859%20C29.8143488,2.69816044%2030,3.34473292%2030,5.1277704%20L30,24.8722296%20C30,26.6552671%2029.8143488,27.3018396%2029.4657346,27.9536914%20C29.1171204,28.6055433%2028.6055433,29.1171204%2027.9536914,29.4657346%20C27.3018396,29.8143488%2026.6552671,30%2024.8722296,30%20L5.1277704,30%20C3.34473292,30%202.69816044,29.8143488%202.04630859,29.4657346%20C1.39445674,29.1171204%200.882879593,28.6055433%200.534265408,27.9536914%20C0.185651222,27.3018396%208.02470732e-17,26.6552671%20-1.38112041e-16,24.8722296%20L1.38112041e-16,5.1277704%20C-8.02470732e-17,3.34473292%200.185651222,2.69816044%200.534265408,2.04630859%20C0.882879593,1.39445674%201.39445674,0.882879593%202.04630859,0.534265408%20C2.69816044,0.185651222%203.34473292,1.2037061e-16%205.1277704,-2.07168062e-16%20Z'%20id='Mask'%20fill='%2399C1E8'%3e%3c/path%3e%3cpath%20d='M8.4645331,22%20C8.2062352,21.9976311%207.99853945,21.7898391%208,21.5353077%20L8,21.0560769%20C8,20.9284615%208.04650365,20.7319231%208.10388024,20.6177692%20C8.10388024,20.6177692%208.17819659,20.4336154%208.35141925,20.2543077%20C8.52464191,20.0755385%209.52627325,19.1849231%2011.3486631,18.2334615%20C12.7027506,17.6196154%2012.9743331,17.1759231%2013.1901784,16.6304615%20C13.5180446,15.7969231%2013.1486487,15.0592308%2013.1486487,15.0592308%20C12.038275,13.3070769%2011.9038499,12.1612308%2012.2743387,9.97076923%20C12.5120417,8.56323077%2014.1868917,8%2015,8%20C15.8129802,8%2017.4881129,8.56323077%2017.7263248,9.97076923%20C18.0962089,12.1612308%2017.9612586,13.3070769%2016.8521525,15.0592308%20C16.8521525,15.0592308%2016.4828147,15.7969231%2016.8106293,16.6304615%20C17.0258943,17.1759231%2017.2968877,17.6196154%2018.6518547,18.2334615%20C20.4734112,19.1849231%2021.4748848,20.075%2021.6480802,20.2543077%20C21.8212756,20.4336154%2021.8950339,20.6177692%2021.8950339,20.6177692%20C21.9529478,20.7319231%2022,20.9284615%2022,21.0566154%20L22,21.5358462%20C22.0011488,21.790168%2021.7935734,21.9976315%2021.5355305,22%20L8.4645331,22%20Z'%20id='Person'%20fill='%23FFFFFF'%3e%3c/path%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/cooperation/weiyun/icon/mobile/svg/dropdown_outline_heavy_24.svg
var dropdown_outline_heavy_24_default;
var init_dropdown_outline_heavy_24 = __esmMin((() => {
	dropdown_outline_heavy_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6.34315%208.99903L12%2014.6559L17.6569%208.99903'%20stroke='%23454D5A'%20stroke-width='1.5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/arrow_heavy_down_16.svg
var arrow_heavy_down_16_default;
var init_arrow_heavy_down_16 = __esmMin((() => {
	arrow_heavy_down_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8%2010.625C8.16576%2010.625%208.32473%2010.5592%208.44194%2010.4419L12.4419%206.44194L11.5581%205.55806L8%209.11612L4.44194%205.55806L3.55806%206.44194L7.55806%2010.4419C7.67527%2010.5592%207.83424%2010.625%208%2010.625Z'%20fill='%23454D5A'%20style='fill:%23454D5A;fill:color(display-p3%200.2706%200.3020%200.3529);fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/zan_fill_light_24.svg
var zan_fill_light_24_default;
var init_zan_fill_light_24 = __esmMin((() => {
	zan_fill_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.03084%208.56615C3.7547%208.56615%203.53084%208.79001%203.53084%209.06615V18.9844C3.53084%2019.2605%203.7547%2019.4844%204.03084%2019.4844H6.5V8.56615H4.03084ZM8%208.54261V19.4844H16.6904C17.5148%2019.4844%2018.2363%2018.9301%2018.4487%2018.1335L20.1456%2011.7702C20.5769%2010.1528%2019.3578%208.56615%2017.684%208.56615H14.5635C15.786%205.8151%2016.0795%202.51562%2013.4293%202.51563C11.4697%202.51563%2011.0945%203.87539%2010.7344%205.18062C10.5751%205.75777%2010.4188%206.32425%2010.1298%206.75781C9.44234%208.13271%208.474%208.46401%208%208.54261Z'%20fill='%23FFAB00'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/icon/desktop/svg/zan_outline_light_24.svg
var zan_outline_light_24_default;
var init_zan_outline_light_24 = __esmMin((() => {
	zan_outline_light_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.4212%208.05851L12.6401%209.81615H17.684C18.5366%209.81615%2019.1575%2010.6243%2018.9378%2011.4481L17.2409%2017.8115C17.1744%2018.0609%2016.9485%2018.2344%2016.6904%2018.2344H6.5V9.81615H7.69834C8.10138%209.82473%2010.0191%209.705%2011.2147%207.38217C11.5397%206.86855%2011.7191%206.29065%2011.8474%205.84219C11.8859%205.70773%2011.9203%205.58329%2011.9525%205.46656L11.9526%205.46649C12.0482%205.12066%2012.1251%204.8424%2012.2337%204.57097C12.3684%204.23449%2012.4978%204.06276%2012.6229%203.96515C12.7292%203.88226%2012.9426%203.76563%2013.4293%203.76562C13.8147%203.76562%2013.934%203.87448%2013.9791%203.92321C14.053%204.00304%2014.1658%204.19936%2014.2037%204.62119C14.2817%205.48848%2013.9919%206.77418%2013.4212%208.05851ZM7.7247%208.56643C7.84585%208.56912%209.22898%208.55944%2010.1298%206.75781C10.4188%206.32425%2010.5751%205.75777%2010.7344%205.18062C11.0945%203.87539%2011.4697%202.51563%2013.4293%202.51562C15.6857%202.51562%2015.8083%204.90744%2015.0403%207.31615C14.9063%207.73651%2014.7451%208.15738%2014.5635%208.56615H17.684C19.3578%208.56615%2020.5769%2010.1528%2020.1456%2011.7702L18.4487%2018.1335C18.2363%2018.9301%2017.5148%2019.4844%2016.6904%2019.4844H4.03084C3.7547%2019.4844%203.53084%2019.2605%203.53084%2018.9844V9.06615C3.53084%208.79001%203.7547%208.56615%204.03084%208.56615H7.70663L7.7247%208.56643Z'%20fill='%23454D5A'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/mobile/svg/icon_secondary_arrow_right.svg
var icon_secondary_arrow_right_default$1;
var init_icon_secondary_arrow_right$1 = __esmMin((() => {
	icon_secondary_arrow_right_default$1 = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='40px'%20height='40px'%20viewBox='0%200%2040%2040'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eicon_secondary_arrow_right%3c/title%3e%3cg%20id='Icon-symbols'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='icon/secondary/arrow/right'%20fill='%23CBCDD1'%3e%3cpath%20d='M18.0718851,6.53583272%20L29.378,17.9138327%20L29.39665,17.8967616%20L31.4685351,19.981197%20L31.45,19.9998327%20L31.4574787,20.0077466%20L29.3855936,22.0921819%20L29.378,22.0848327%20L18.0829415,33.4531108%20L16.0110564,31.3686755%20L27.306,19.9998327%20L16,8.62026806%20L18.0718851,6.53583272%20Z'%20id='形状结合'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/mobile/svg/icon_toast_info.svg
var icon_toast_info_default;
var init_icon_toast_info = __esmMin((() => {
	icon_toast_info_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='12'%20cy='12'%20r='9'%20fill='%231E6FFF'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M11.75%209.5C12.4404%209.5%2013%208.94036%2013%208.25C13%207.55964%2012.4404%207%2011.75%207C11.0596%207%2010.5%207.55964%2010.5%208.25C10.5%208.94036%2011.0596%209.5%2011.75%209.5ZM14%2015V16H10V15H11V11H10V10H13V15H14Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/mobile/svg/square-checkbox-selected-210114.svg
var square_checkbox_selected_210114_default;
var init_square_checkbox_selected_210114 = __esmMin((() => {
	square_checkbox_selected_210114_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='48px'%20height='48px'%20viewBox='0%200%2048%2048'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3esquare-checkbox-selected-210114%3c/title%3e%3cg%20id='图标'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='编组-6'%3e%3crect%20id='矩形'%20x='0'%20y='0'%20width='48'%20height='48'%3e%3c/rect%3e%3crect%20id='矩形'%20fill='%231E6FFF'%20x='6'%20y='6'%20width='36'%20height='36'%20rx='4'%3e%3c/rect%3e%3cpath%20d='M18.7471545,17%20L18.7467062,23.595%20L33.7693961,23.5955517%20L33.7693961,26.6%20L15.7427062,26.6%20L15.7427062,17%20L18.7471545,17%20Z'%20id='形状结合'%20fill='%23FFFFFF'%20transform='translate(24.756051,%2021.800000)%20rotate(-45.000000)%20translate(-24.756051,%20-21.800000)%20'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/mobile/svg/square-checkbox-unselected-210114.svg
var square_checkbox_unselected_210114_default;
var init_square_checkbox_unselected_210114 = __esmMin((() => {
	square_checkbox_unselected_210114_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='48px'%20height='48px'%20viewBox='0%200%2048%2048'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3esquare-checkbox-unselected-210114%3c/title%3e%3cg%20id='图标'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='square-checkbox-unselected'%20stroke='%23CBCDD1'%20stroke-width='3'%3e%3crect%20id='矩形'%20x='7.5'%20y='7.5'%20width='33'%20height='33'%20rx='4'%3e%3c/rect%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/arrow_backward_16.svg
var arrow_backward_16_default;
var init_arrow_backward_16 = __esmMin((() => {
	arrow_backward_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='16'%20y='16'%20width='16'%20height='16'%20rx='2'%20transform='rotate(180%2016%2016)'%20fill='black'%20fill-opacity='0.08'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.34864%205.0476L12.9402%207.88588C13.0199%207.9489%2013.0199%208.0511%2012.9402%208.11412L9.34864%2010.9524C9.21999%2011.0541%209%2010.9821%209%2010.8383V5.16172C9%205.01793%209.21999%204.94592%209.34864%205.0476ZM3%208.59985H9V7.34985H3L3%208.59985Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/arrow_forward_16.svg
var arrow_forward_16_default;
var init_arrow_forward_16 = __esmMin((() => {
	arrow_forward_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='16'%20y='16'%20width='16'%20height='16'%20rx='2'%20transform='rotate(180%2016%2016)'%20fill='black'%20fill-opacity='0.08'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.65136%2010.9524L3.05982%208.11412C2.98006%208.0511%202.98006%207.94891%203.05982%207.88588L6.65136%205.0476C6.78001%204.94592%207%205.01793%207%205.16172L7%2010.8383C7%2010.9821%206.78001%2011.0541%206.65136%2010.9524ZM13%207.40015L7%207.40015L7%208.65015L13%208.65015L13%207.40015Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/basic_supernext.svg
var basic_supernext_default;
var init_basic_supernext = __esmMin((() => {
	basic_supernext_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_supernext%3c/title%3e%3cg%20id='PC'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='编组'%20fill='%2381868F'%20transform='translate(8.000000,%208.000000)%20scale(-1,%201)%20translate(-8.000000,%20-8.000000)%20'%3e%3cpath%20d='M8.14285714,3%20L9,3.83333333%20L4.71428571,8%20L9,12.1666667%20L8.14285714,13%20L3.36874024,8.35849746%20C3.17074756,8.16600458%203.1662891,7.84945348%203.35878198,7.6514608%20L3.36874024,7.64150254%20L3.36874024,7.64150254%20L8.14285714,3%20Z%20M12.1428571,3%20L13,3.83333333%20L8.71428571,8%20L13,12.1666667%20L12.1428571,13%20L7.36874024,8.35849746%20C7.17074756,8.16600458%207.1662891,7.84945348%207.35878198,7.6514608%20L7.36874024,7.64150254%20L7.36874024,7.64150254%20L12.1428571,3%20Z'%20id='形状结合'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/basic_superprev.svg
var basic_superprev_default;
var init_basic_superprev = __esmMin((() => {
	basic_superprev_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_superprev%3c/title%3e%3cg%20id='PC'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='编组'%20fill='%2381868F'%3e%3cpath%20d='M8.14285714,3%20L9,3.83333333%20L4.71428571,8%20L9,12.1666667%20L8.14285714,13%20L3.36874024,8.35849746%20C3.17074756,8.16600458%203.1662891,7.84945348%203.35878198,7.6514608%20L3.36874024,7.64150254%20L3.36874024,7.64150254%20L8.14285714,3%20Z%20M12.1428571,3%20L13,3.83333333%20L8.71428571,8%20L13,12.1666667%20L12.1428571,13%20L7.36874024,8.35849746%20C7.17074756,8.16600458%207.1662891,7.84945348%207.35878198,7.6514608%20L7.36874024,7.64150254%20L7.36874024,7.64150254%20L12.1428571,3%20Z'%20id='形状结合'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/common_more.svg
var common_more_default;
var init_common_more = __esmMin((() => {
	common_more_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_103153_10800)'%3e%3cpath%20d='M17.2998%2013.1504C16.6647%2013.1504%2016.1495%2012.6351%2016.1494%2012C16.1494%2011.3649%2016.6647%2010.8496%2017.2998%2010.8496C17.9349%2010.8496%2018.4502%2011.3649%2018.4502%2012C18.4501%2012.6351%2017.9349%2013.1504%2017.2998%2013.1504ZM12%2013.1504C11.3649%2013.1504%2010.8497%2012.6351%2010.8496%2012C10.8496%2011.3649%2011.3649%2010.8496%2012%2010.8496C12.6351%2010.8497%2013.1494%2011.3649%2013.1494%2012C13.1494%2012.635%2012.635%2013.1503%2012%2013.1504ZM6.7002%2013.1494C6.0651%2013.1494%205.54986%2012.6351%205.5498%2012C5.5498%2011.3649%206.06507%2010.8496%206.7002%2010.8496C7.33517%2010.8498%207.84961%2011.365%207.84961%2012C7.84956%2012.635%207.33513%2013.1492%206.7002%2013.1494Z'%20fill='black'%20fill-opacity='0.9'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_103153_10800'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/data_quote_16.svg
var data_quote_16_default;
var init_data_quote_16 = __esmMin((() => {
	data_quote_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.1996%205.19993H3.19993L3.19993%208.19977H4.40054V9.3997H3.19993C2.53723%209.3997%202%208.86247%202%208.19977V5.19993C2%204.53723%202.53723%204%203.19993%204H9.1996C9.8623%204%2010.3995%204.53723%2010.3995%205.19993V8.19977C10.3995%208.86247%209.8623%209.3997%209.1996%209.3997H8.00033V8.19977H9.1996V5.19993ZM6.79998%206.40033H8.00058V7.60027H6.79998V10.6001H12.7996V7.60027H11.6004V6.40033H12.7996C13.4623%206.40033%2013.9996%206.93756%2013.9996%207.60027V10.6001C13.9996%2011.2628%2013.4623%2011.8%2012.7996%2011.8H6.79998C6.13727%2011.8%205.60004%2011.2628%205.60004%2010.6001V7.60027C5.60004%206.93756%206.13727%206.40033%206.79998%206.40033Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/icon_secondary_arrow_left.svg
var icon_secondary_arrow_left_default;
var init_icon_secondary_arrow_left = __esmMin((() => {
	icon_secondary_arrow_left_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='20px'%20height='20px'%20viewBox='0%200%2020%2020'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eicon_secondary_arrow_left%3c/title%3e%3cg%20id='视觉'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='评论切图资源'%20transform='translate(-49.000000,%20-363.000000)'%20fill='%2381868F'%3e%3cg%20id='icon_secondary_arrow_left'%20transform='translate(49.000000,%20363.000000)'%3e%3cg%20id='PC/基础/箭头/20/箭头/左'%20transform='translate(10.000000,%2010.000000)%20scale(-1,%201)%20translate(-10.000000,%20-10.000000)%20'%3e%3cpath%20d='M7.5,4.79166667%20L12.8571429,10%20L7.5,15.2083333%20L8.57142857,16.25%20L14.5390747,10.4481218%20C14.7865655,10.2075057%2014.7921386,9.81181685%2014.5515225,9.564326%20C14.5474319,9.5601185%2014.5432822,9.55596881%2014.5390747,9.55187818%20L8.57142857,3.75%20L8.57142857,3.75%20L7.5,4.79166667%20Z'%20id='路径'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/icon_secondary_arrow_right.svg
var icon_secondary_arrow_right_default;
var init_icon_secondary_arrow_right = __esmMin((() => {
	icon_secondary_arrow_right_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='20px'%20height='20px'%20viewBox='0%200%2020%2020'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eicon_secondary_arrow_right%3c/title%3e%3cg%20id='视觉'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='评论切图资源'%20transform='translate(-49.000000,%20-400.000000)'%20fill='%2381868F'%3e%3cg%20id='PC/基础/箭头/20/箭头/右'%20transform='translate(49.000000,%20400.000000)'%3e%3cpath%20d='M7.5,4.79166667%20L12.8571429,10%20L7.5,15.2083333%20L8.57142857,16.25%20L14.5390747,10.4481218%20C14.7865655,10.2075057%2014.7921386,9.81181685%2014.5515225,9.564326%20C14.5474319,9.5601185%2014.5432822,9.55596881%2014.5390747,9.55187818%20L8.57142857,3.75%20L8.57142857,3.75%20L7.5,4.79166667%20Z'%20id='路径'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/menu_rename.svg
var menu_rename_default;
var init_menu_rename = __esmMin((() => {
	menu_rename_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3emenu_rename%3c/title%3e%3cg%20id='PC'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='PC/菜单/重命名'%20fill='%23464D5A'%20fill-rule='nonzero'%3e%3cg%20id='编组'%3e%3cpath%20d='M21,18.75%20L21,20%20L5,20%20L5,18.75%20L21,18.75%20Z%20M15.9389695,4.13058766%20L19.0916346,7.28325274%20C19.2657514,7.45736962%2019.2657514,7.73966887%2019.0916346,7.91378576%20L9.53698699,17.4684333%20C9.47110866,17.5343117%209.3862482,17.5778979%209.29432579,17.5930695%20L5.51845948,18.2162708%20C5.27550791,18.2563696%205.04605024,18.0919249%205.00595144,17.8489734%20C4.99801619,17.800895%204.99801619,17.7518411%205.00595144,17.7037627%20L5.62915268,13.9278964%20C5.64432434,13.835974%205.68791057,13.7511136%205.7537889,13.6852352%20L15.3084365,4.13058766%20C15.4825534,3.95647078%2015.7648526,3.95647078%2015.9389695,4.13058766%20Z%20M13.161,8.044%20L6.82,14.386%20L6.422,16.799%20L8.836,16.401%20L15.176,10.06%20L13.161,8.044%20Z%20M15.623,5.583%20L14.045,7.161%20L16.06,9.176%20L17.638,7.598%20L15.623,5.583%20Z'%20id='形状结合'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/pcapp_close_hover.svg
var pcapp_close_hover_default;
var init_pcapp_close_hover = __esmMin((() => {
	pcapp_close_hover_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3epcapp_close_hover%3c/title%3e%3cg%20id='pcapp_close_hover'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3crect%20id='矩形'%20x='4'%20y='4'%20width='16'%20height='16'%20rx='2'%3e%3c/rect%3e%3cpolygon%20id='路径'%20fill='%23FFFFFF'%20points='7.71428571%207%2012%2011.2857143%2016.2857143%207%2017%207.71428571%2012.7142857%2012%2017%2016.2857143%2016.2857143%2017%2011.9992857%2012.7135714%207.71428571%2017%207%2016.2857143%2011.285%2011.9992857%207%207.71428571'%3e%3c/polygon%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/placeholder_48_imagedefault.svg
var placeholder_48_imagedefault_default;
var init_placeholder_48_imagedefault = __esmMin((() => {
	placeholder_48_imagedefault_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='48px'%20height='48px'%20viewBox='0%200%2048%2048'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eplaceholder_48_imagedefault%3c/title%3e%3cg%20id='控件'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='Placeholder占位图/元素/图片备份'%20fill='%23CBCDD1'%20fill-rule='nonzero'%3e%3cpath%20d='M38,11%20C39.1045695,11%2040,11.8954305%2040,13%20L40,35%20C40,36.1045695%2039.1045695,37%2038,37%20L10,37%20C8.8954305,37%208,36.1045695%208,35%20L8,13%20C8,11.8954305%208.8954305,11%2010,11%20L38,11%20Z%20M38,13%20L10,13%20L10,30.963%20L19.2179386,20.6026975%20L25.557,26.212%20L33.2179386,17.6026975%20L38,21.8976975%20L38,24.6376975%20L33.3760779,20.4852107%20L26.69,27.9996975%20L26.564,27.999%20L25.6761724,29.0414206%20L24.494,27.999%20L23.968,27.9996975%20L24.199,27.738%20L19.3760779,23.4852107%20L10,34.022%20L10,35%20L38,35%20L38,13%20Z'%20id='形状结合'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/toolbar_smartsheet_collapsestack.svg
var toolbar_smartsheet_collapsestack_default;
var init_toolbar_smartsheet_collapsestack = __esmMin((() => {
	toolbar_smartsheet_collapsestack_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3etoolbar_smartsheet_collapsestack%3c/title%3e%3cg%20id='PC'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='编组'%3e%3crect%20id='bg'%20x='0'%20y='0'%20width='24'%20height='24'%20rx='2'%3e%3c/rect%3e%3cpath%20d='M11.5,5%20C11.7761424,5%2012,5.22385763%2012,5.5%20L12,18.5%20C12,18.7761424%2011.7761424,19%2011.5,19%20L6.5,19%20C6.22385763,19%206,18.7761424%206,18.5%20L6,5.5%20C6,5.22385763%206.22385763,5%206.5,5%20L11.5,5%20Z%20M10.8,6.2%20L7.2,6.2%20L7.2,17.8%20L10.8,17.8%20L10.8,6.2%20Z%20M17.5253165,7%20L18.5,8.07692308%20L14.9486709,11.9992308%20L18.5,15.9230769%20L17.5253165,17%20L13,12%20L17.5253165,7%20Z'%20id='形状结合'%20fill='%23464D5A'%20fill-rule='nonzero'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/upload_loading_failed.svg
var upload_loading_failed_default;
var init_upload_loading_failed = __esmMin((() => {
	upload_loading_failed_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eUpload_loading_failed%20%3c/title%3e%3cg%20id='页面-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='资源_链接多态切换'%20transform='translate(-17.000000,%20-240.000000)'%3e%3cg%20id='编组'%20transform='translate(17.000000,%20240.000000)'%3e%3ccircle%20id='椭圆形'%20fill='%23FF4747'%20cx='12'%20cy='12'%20r='9'%3e%3c/circle%3e%3cpath%20d='M12,14.5%20C12.8284271,14.5%2013.5,15.1715729%2013.5,16%20C13.5,16.8284271%2012.8284271,17.5%2012,17.5%20C11.1715729,17.5%2010.5,16.8284271%2010.5,16%20C10.5,15.1715729%2011.1715729,14.5%2012,14.5%20Z%20M13.5,6.5%20L13,13.5%20L11,13.5%20L10.5,6.5%20L13.5,6.5%20Z'%20id='形状结合'%20fill='%23FFFFFF'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/warning_gray_24.svg
var warning_gray_24_default;
var init_warning_gray_24 = __esmMin((() => {
	warning_gray_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%2021C16.9706%2021%2021%2016.9706%2021%2012C21%207.02944%2016.9706%203%2012%203C7.02944%203%203%207.02944%203%2012C3%2016.9706%207.02944%2021%2012%2021ZM11%2013.5L10.5%206.5H13.5L13%2013.5H11ZM13.5%2016C13.5%2016.8284%2012.8284%2017.5%2012%2017.5C11.1716%2017.5%2010.5%2016.8284%2010.5%2016C10.5%2015.1716%2011.1716%2014.5%2012%2014.5C12.8284%2014.5%2013.5%2015.1716%2013.5%2016Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/pc/svg/wecom_eye_slash_fill_iconmedium_16.svg
var wecom_eye_slash_fill_iconmedium_16_default;
var init_wecom_eye_slash_fill_iconmedium_16 = __esmMin((() => {
	wecom_eye_slash_fill_iconmedium_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1.85351%201.14645C1.65825%200.951184%201.34167%200.951184%201.14641%201.14645C0.951143%201.34171%200.951143%201.65829%201.14641%201.85355L14.1464%2014.8536C14.3417%2015.0488%2014.6582%2015.0488%2014.8535%2014.8536C15.0488%2014.6583%2015.0488%2014.3417%2014.8535%2014.1464L1.85351%201.14645ZM0.319176%207.48963C1.02182%206.38911%201.77151%205.45543%202.58294%204.704L5.52549%207.64655C5.50915%207.76202%205.5007%207.88002%205.5007%208C5.5007%209.38071%206.61999%2010.5%208.0007%2010.5C8.12068%2010.5%208.23868%2010.4915%208.35415%2010.4752L10.8462%2012.9672C9.96851%2013.3183%209.02517%2013.5%208.00444%2013.5C4.80347%2013.5%202.36237%2011.7106%200.319104%208.50929C0.12082%208.19862%200.120847%207.80026%200.319176%207.48963ZM10.5007%208C10.5007%208.12024%2010.4922%208.2385%2010.4758%208.35422L13.4224%2011.3008C14.2357%2010.5484%2014.9866%209.61291%2015.6899%208.50979C15.8877%208.19944%2015.8877%207.80168%2015.6899%207.4913C13.6494%204.28964%2011.2081%202.5%208.00376%202.5C6.98133%202.5%206.03639%202.68264%205.15716%203.03557L7.64648%205.5249C7.7622%205.50849%207.88046%205.5%208.0007%205.5C9.38141%205.5%2010.5007%206.61929%2010.5007%208Z'%20fill='%230A111A'%20fill-opacity='0.5'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_16_add.svg
var basic_16_add_default;
var init_basic_16_add = __esmMin((() => {
	basic_16_add_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_16_add%3c/title%3e%3cdefs%3e%3cpath%20d='M6.6,-8.03034518e-15%20L6.6,5.399%20L12,5.4%20L12,6.6%20L6.6,6.599%20L6.6,12%20L5.4,12%20L5.4,6.599%20L0,6.6%20L0,5.4%20L5.4,5.399%20L5.4,-7.95686637e-15%20L6.6,-8.03034518e-15%20Z'%20id='path-1'%3e%3c/path%3e%3c/defs%3e%3cg%20id='控件'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='编组备份-2'%20transform='translate(2.000000,%202.000000)'%3e%3cmask%20id='mask-2'%20fill='white'%3e%3cuse%20xlink:href='%23path-1'%3e%3c/use%3e%3c/mask%3e%3cuse%20id='新建icon'%20fill='%2381868F'%20xlink:href='%23path-1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_16_drag.svg
var basic_16_drag_default;
var init_basic_16_drag = __esmMin((() => {
	basic_16_drag_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_16_drag%3c/title%3e%3cg%20id='控件'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='编组'%3e%3crect%20id='矩形'%20x='0'%20y='0'%20width='16'%20height='16'%3e%3c/rect%3e%3cpath%20d='M6,11%20C6.55228475,11%207,11.4477153%207,12%20C7,12.5522847%206.55228475,13%206,13%20C5.44771525,13%205,12.5522847%205,12%20C5,11.4477153%205.44771525,11%206,11%20Z%20M10,11%20C10.5522847,11%2011,11.4477153%2011,12%20C11,12.5522847%2010.5522847,13%2010,13%20C9.44771525,13%209,12.5522847%209,12%20C9,11.4477153%209.44771525,11%2010,11%20Z%20M6,7%20C6.55228475,7%207,7.44771525%207,8%20C7,8.55228475%206.55228475,9%206,9%20C5.44771525,9%205,8.55228475%205,8%20C5,7.44771525%205.44771525,7%206,7%20Z%20M10,7%20C10.5522847,7%2011,7.44771525%2011,8%20C11,8.55228475%2010.5522847,9%2010,9%20C9.44771525,9%209,8.55228475%209,8%20C9,7.44771525%209.44771525,7%2010,7%20Z%20M6,3%20C6.55228475,3%207,3.44771525%207,4%20C7,4.55228475%206.55228475,5%206,5%20C5.44771525,5%205,4.55228475%205,4%20C5,3.44771525%205.44771525,3%206,3%20Z%20M10,3%20C10.5522847,3%2011,3.44771525%2011,4%20C11,4.55228475%2010.5522847,5%2010,5%20C9.44771525,5%209,4.55228475%209,4%20C9,3.44771525%209.44771525,3%2010,3%20Z'%20id='形状结合'%20fill='%2381868F'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_16_dropdown.svg
var basic_16_dropdown_default;
var init_basic_16_dropdown = __esmMin((() => {
	basic_16_dropdown_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='16px'%20height='16px'%20viewBox='0%200%2016%2016'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_16_dropdown%3c/title%3e%3cg%20id='控件'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='icon/basic/16/dropdown'%3e%3crect%20id='矩形'%20x='0'%20y='0'%20width='16'%20height='16'%20rx='2'%3e%3c/rect%3e%3cpath%20d='M8.22188008,5.33282012%20L11.7236089,10.5854133%20C11.8053028,10.7079543%2011.7721898,10.8735194%2011.6496488,10.9552134%20C11.6058442,10.9844165%2011.5543754,11%2011.5017288,11%20L4.49827122,11%20C4.35099529,11%204.23160456,10.8806093%204.23160456,10.7333333%20C4.23160456,10.6806867%204.24718803,10.629218%204.27639115,10.5854133%20L7.77811992,5.33282012%20C7.85981391,5.21027913%208.02537907,5.1771661%208.14792005,5.25886009%20C8.177214,5.27838939%208.20235078,5.30352617%208.22188008,5.33282012%20Z'%20id='三角形'%20fill='%2381868F'%20transform='translate(8.000000,%208.000000)%20scale(1,%20-1)%20translate(-8.000000,%20-8.000000)%20'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_16_dropdown_white_16.svg
var basic_16_dropdown_white_16_default;
var init_basic_16_dropdown_white_16 = __esmMin((() => {
	basic_16_dropdown_white_16_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.65006%2010.8012C7.81654%2011.0663%208.18346%2011.0663%208.34994%2010.8012L10.9287%206.69423C11.115%206.39748%2010.9146%206%2010.5787%206H5.42128C5.08537%206%204.88501%206.39748%205.07134%206.69423L7.65006%2010.8012Z'%20fill='white'%20style='fill:white;fill:white;fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_16_fold_normal.svg
var basic_16_fold_normal_default;
var init_basic_16_fold_normal = __esmMin((() => {
	basic_16_fold_normal_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.3823%208.21651C10.5245%208.10984%2010.5245%207.89651%2010.3823%207.78984L5.76008%204.32317C5.58428%204.19133%205.33341%204.31676%205.33341%204.53651L5.33341%2011.4698C5.33341%2011.6896%205.58428%2011.815%205.76008%2011.6832L10.3823%208.21651Z'%20fill='%2381868F'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_24_add.svg
var basic_24_add_default;
var init_basic_24_add = __esmMin((() => {
	basic_24_add_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_24_add%3c/title%3e%3cdefs%3e%3cpath%20d='M12.7,5%20L12.7,11.299%20L19,11.3%20L19,12.7%20L12.7,12.699%20L12.7,19%20L11.3,19%20L11.3,12.699%20L5,12.7%20L5,11.3%20L11.3,11.299%20L11.3,5%20L12.7,5%20Z'%20id='path-1'%3e%3c/path%3e%3c/defs%3e%3cg%20id='控件'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='icon/basic/24/add'%3e%3cmask%20id='mask-2'%20fill='white'%3e%3cuse%20xlink:href='%23path-1'%3e%3c/use%3e%3c/mask%3e%3cuse%20id='新建icon'%20fill='%2381868F'%20xlink:href='%23path-1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/basic_24_close.svg
var basic_24_close_default;
var init_basic_24_close = __esmMin((() => {
	basic_24_close_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ebasic_24_close%3c/title%3e%3cg%20id='控件'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='icon/basic/24/close'%3e%3crect%20id='矩形'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3c/rect%3e%3cpath%20d='M16.2857143,6.71715729%20L17.2828427,7.71428571%20L12.997,12%20L17.2828427,16.2857143%20L16.2857143,17.2828427%20L12,12.997%20L7.71428571,17.2828427%20L6.71715729,16.2857143%20L11.003,12%20L6.71715729,7.71428571%20L7.71428571,6.71715729%20L12,11.003%20L16.2857143,6.71715729%20Z'%20id='形状结合'%20fill='%23464D5A'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/cell_add.svg
var cell_add_default;
var init_cell_add = __esmMin((() => {
	cell_add_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='24px'%20height='24px'%20viewBox='0%200%2024%2024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3ecell_add%3c/title%3e%3cg%20id='页面-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='PC_图片管理器_展开'%20transform='translate(-1214.000000,%20-53.000000)'%3e%3cg%20id='+'%20transform='translate(1214.000000,%2053.000000)'%3e%3crect%20id='矩形'%20fill='%23E9EBED'%20x='0'%20y='0'%20width='24'%20height='24'%20rx='4'%3e%3c/rect%3e%3cpath%20d='M13,7%20L13,10.999%20L17,11%20L17,13%20L13,12.999%20L13,17%20L11,17%20L11,12.999%20L7,13%20L7,11%20L11,10.999%20L11,7%20L13,7%20Z'%20id='形状结合'%20fill='%2381868F'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/cell_add_dark_24.svg
var cell_add_dark_24_default;
var init_cell_add_dark_24 = __esmMin((() => {
	cell_add_dark_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4628_107909)'%3e%3crect%20width='24'%20height='24'%20rx='4'%20fill='%23131414'%20style='fill:%23131414;fill:color(display-p3%200.0745%200.0784%200.0784);fill-opacity:1;'/%3e%3crect%20width='24'%20height='24'%20fill='white'%20fill-opacity='0.08'%20style='fill:white;fill-opacity:0.08;'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13%207H11V11H7V13H11V17H13V13H17V11H13V7Z'%20fill='%2392969D'%20style='fill:%2392969D;fill:color(display-p3%200.5725%200.5882%200.6157);fill-opacity:1;'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4628_107909'%3e%3crect%20width='24'%20height='24'%20rx='4'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_smartsheet_attribute_location_24.svg
var icon_smartsheet_attribute_location_24_default;
var init_icon_smartsheet_attribute_location_24 = __esmMin((() => {
	icon_smartsheet_attribute_location_24_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M16.3991%206.12576C17.6676%207.43658%2018.25%208.87715%2018.25%2010.3703C18.25%2011.8851%2017.6495%2013.5903%2016.298%2015.3894C15.7458%2016.1246%2013.5503%2018.413%2012.1536%2019.8477C12.0605%2019.9433%2011.9164%2019.9406%2011.8284%2019.8519C10.5837%2018.5955%208.61913%2016.5737%207.61523%2015.3481C6.40915%2013.8757%205.7825%2012.2515%205.75124%2010.6823C5.72042%209.13552%206.26493%207.55533%207.55502%206.11759L7.70148%205.97126C10.1464%203.61761%2014.0386%203.68598%2016.3991%206.12576ZM17.2974%205.25659C14.4548%202.31852%209.76652%202.23909%206.82583%205.07916L6.64824%205.25659C3.63523%208.59044%203.93657%2012.8298%206.64824%2016.1402C7.69624%2017.4196%209.70419%2019.4838%2010.9404%2020.7316C11.5234%2021.3201%2012.4714%2021.3132%2013.0492%2020.7197C14.4104%2019.3215%2016.6837%2016.9572%2017.2974%2016.1402C20.2342%2012.2308%2020.2342%208.29119%2017.2974%205.25659ZM12.0025%209.25C12.969%209.25141%2013.7514%2010.036%2013.75%2011.0026C13.7486%2011.969%2012.964%2012.7514%2011.9975%2012.75C11.031%2012.7486%2010.2486%2011.964%2010.25%2010.9975C10.2507%2010.5362%2010.4335%2010.0938%2010.7586%209.76657C11.0877%209.43531%2011.5356%209.24932%2012.0025%209.25ZM12.0044%208C11.2038%207.99884%2010.4361%208.31767%209.87184%208.88555C9.31448%209.44652%209.00116%2010.2049%209%2010.9956C8.99761%2012.6525%2010.3388%2013.9976%2011.9956%2014C13.6525%2014.0024%2014.9976%2012.6612%2015%2011.0044C15.0024%209.34752%2013.6612%208.00242%2012.0044%208Z'%20fill='%231E6FFF'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/docs-design-resources/x-pc/svg/icon_tips_prompt_darkmode.svg
var icon_tips_prompt_darkmode_default;
var init_icon_tips_prompt_darkmode = __esmMin((() => {
	icon_tips_prompt_darkmode_default = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%2021C16.9706%2021%2021%2016.9706%2021%2012C21%207.02944%2016.9706%203%2012%203C7.02944%203%203%207.02944%203%2012C3%2016.9706%207.02944%2021%2012%2021ZM13%208.25C13%208.94036%2012.4404%209.5%2011.75%209.5C11.0596%209.5%2010.5%208.94036%2010.5%208.25C10.5%207.55964%2011.0596%207%2011.75%207C12.4404%207%2013%207.55964%2013%208.25ZM14%2016V15H13V10H10V11H11V15H10V16H14Z'%20fill='white'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/arrow-up-right-arrow-down-left-14.svg
var arrow_up_right_arrow_down_left_14_default;
var init_arrow_up_right_arrow_down_left_14 = __esmMin((() => {
	arrow_up_right_arrow_down_left_14_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2014%2014'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-arrow-up-right-arrow-down-left-14'%3e%3cpath%20fill='currentColor'%20d='M8%201a.5.5%200%20000%201h3.3L7.64%205.65a.5.5%200%2010.7.7L12%202.71V6a.5.5%200%20001%200V2a1%201%200%2000-1-1H8zM6.5%2012.5a.5.5%200%2001-.5.5H2a1%201%200%2001-1-1V8a.5.5%200%20011%200v3.3l3.65-3.65a.5.5%200%2011.7.7L2.71%2012H6c.28%200%20.5.22.5.5z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/avatar-group-typed-40.svg
var avatar_group_typed_40_default;
var init_avatar_group_typed_40 = __esmMin((() => {
	avatar_group_typed_40_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2040%2040'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-avatar-group-typed-40'%3e%3cg%20clip-path='url(%23avatar-group-typed-40_clip0_4970_52538)'%3e%3cg%20clip-path='url(%23avatar-group-typed-40_clip1_4970_52538)'%3e%3cpath%20fill='%234B95F3'%20d='M0%200h40v40H0z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M16.5%209c-2.35%200-4.25%202.02-4.25%204.52v1.92c0%201.46.47%202.87%201.34%204%201%201.3.61%203.27-.8%204.03L7%2026.61c-.61.33-1%201-1%201.74v.64c0%20.56.42%201.01.95%201.01h19.1c.53%200%20.95-.45.95-1v-.66c0-.73-.39-1.4-1-1.73l-5.74-3.14a2.76%202.76%200%2001-.82-4.04%206.62%206.62%200%20001.31-3.96v-1.95c0-2.5-1.9-4.52-4.25-4.52zm16.78%2019h-4.3a3.96%203.96%200%2000-2.02-3.15l-3.58-1.95a2.1%202.1%200%2000.4-2.95%205.01%205.01%200%2001-1.02-3.04v-1.47c0-1.9%201.45-3.44%203.24-3.44%201.79%200%203.24%201.54%203.24%203.44v1.49c0%201.1-.35%202.16-1%203.02a2.1%202.1%200%2000.62%203.08l4.38%202.38c.47.26.76.77.76%201.33v.5c0%20.42-.32.76-.72.76z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='avatar-group-typed-40_clip0_4970_52538'%3e%3crect%20width='40'%20height='40'%20fill='%23fff'%20rx='5'%3e%3c/rect%3e%3c/clipPath%3e%3cclipPath%20id='avatar-group-typed-40_clip1_4970_52538'%3e%3cpath%20fill='%23fff'%20d='M0%200h40v40H0z'%3e%3c/path%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/filter-fill-12.svg
var filter_fill_12_default;
var init_filter_fill_12 = __esmMin((() => {
	filter_fill_12_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2012%2012'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-filter-fill-12'%3e%3cpath%20fill='currentColor'%20d='M1.75%201a.75.75%200%2000-.75.75v.64c0%20.21.1.42.25.56l3.25%202.9v4.65c0%20.62.7.97%201.2.6l1.3-.97c.31-.24.5-.61.5-1V5.85l3.25-2.9a.75.75%200%2000.25-.56v-.64a.75.75%200%2000-.75-.75h-8.5z'%20fill-rule='evenodd'%20clip-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/wedocs-icons-svg/src/groupby-14.svg
var groupby_14_default;
var init_groupby_14 = __esmMin((() => {
	groupby_14_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2014%2014'%20width='1em'%20height='1em'%20class='wedocs-icon%20wedocs-icon-groupby-14'%3e%3cpath%20fill='currentColor'%20d='M11.5%208c.83%200%201.5.67%201.5%201.5V11c0%20.83-.67%201.5-1.5%201.5h-5A1.5%201.5%200%20015%2011V9.5C5%208.67%205.67%208%206.5%208h5zm-9.83.37a.5.5%200%2001.63-.06l.07.06%201.15%201.15a1%201%200%20010%201.41l-1.15%201.15a.5.5%200%2001-.7-.7l1.14-1.15-1.14-1.15L1.6%209a.5.5%200%2001.07-.63zM6.5%209a.5.5%200%2000-.5.5V11c0%20.28.22.5.5.5h5a.5.5%200%2000.5-.5V9.5a.5.5%200%2000-.5-.5h-5zm5-7.5c.83%200%201.5.67%201.5%201.5v1.5c0%20.83-.67%201.5-1.5%201.5h-5A1.5%201.5%200%20015%204.5V3c0-.83.67-1.5%201.5-1.5h5zm-9.86.35a.5.5%200%2001.63-.06l.07.06L3.5%203a1%201%200%20010%201.41L2.34%205.56a.5.5%200%2011-.7-.7L2.78%203.7%201.64%202.56l-.07-.08a.5.5%200%2001.07-.63zm4.86.65A.5.5%200%20006%203v1.5c0%20.28.22.5.5.5h5a.5.5%200%2000.5-.5V3a.5.5%200%2000-.5-.5h-5z'%3e%3c/path%3e%3c/svg%3e";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/ai-alias.js
var aiTagSvg, aiLineSvg, aiProgressCloseSvg, aiErrSvg, svgToBase64, MinitagAI28w14h, LinesAIBoldColored20, AiProgressClose8w8h, AiErr16w16h;
var init_ai_alias = __esmMin((() => {
	init_es();
	aiTagSvg = `<svg width="400" height="240" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1927_74577)">
<rect y="-0.00012207" width="20" height="12" rx="2.25" fill="url(#paint0_linear_1927_74577)"/>
<path d="M13.1475 2.99988C13.2089 2.99988 13.2644 3.03748 13.2871 3.0946L15.5342 8.7948C15.573 8.89323 15.5003 8.99988 15.3945 8.99988H14.5215C14.4589 8.99988 14.4028 8.96081 14.3809 8.90222L13.8906 7.59265C13.8686 7.53426 13.8124 7.496 13.75 7.49597H11.3672C11.305 7.49615 11.2496 7.53448 11.2275 7.59265L10.7373 8.90222C10.7154 8.96074 10.6592 8.99979 10.5967 8.99988H9.7207C9.6149 8.99988 9.54226 8.89323 9.58105 8.7948L11.8281 3.0946C11.8508 3.03763 11.9055 3.00005 11.9668 2.99988H13.1475ZM17.2246 2.99988C17.3075 2.99988 17.375 3.06743 17.375 3.15027V8.84949C17.375 8.93233 17.3075 8.99988 17.2246 8.99988H16.4004C16.3175 8.99988 16.25 8.93233 16.25 8.84949V3.15027C16.25 3.06743 16.3175 2.99988 16.4004 2.99988H17.2246ZM5.28125 5.48328L7 6.26453L5.28125 7.04578L4.5 8.76453L3.71875 7.04578L2 6.26453L3.71875 5.48328L4.5 3.76453L5.28125 5.48328ZM12.5635 4.05847C12.5531 4.05847 12.5437 4.06533 12.54 4.07507L11.6426 6.48621C11.6062 6.58406 11.6779 6.68902 11.7822 6.68933H13.3359C13.44 6.68905 13.5124 6.58492 13.4766 6.48718L12.5869 4.07507C12.5834 4.06541 12.5737 4.05863 12.5635 4.05847ZM8.01562 3.6864L8.875 4.07703L8.01562 4.46765L7.625 5.32703L7.23438 4.46765L6.375 4.07703L7.23438 3.6864L7.625 2.82703L8.01562 3.6864Z" fill="white"/>
</g>
<defs>
<linearGradient id="paint0_linear_1927_74577" x1="24.26" y1="-2.01282" x2="0.980426" y2="21.6253" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFA58E"/>
<stop offset="0.295881" stop-color="#A994F7"/>
<stop offset="0.735881" stop-color="#008BFF"/>
</linearGradient>
<clipPath id="clip0_1927_74577">
<rect width="400" height="240" fill="white"/>
</clipPath>
</defs>
</svg>
`;
	aiLineSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.875 5.5C2.875 5.15482 3.15482 4.875 3.5 4.875H16.5C16.8452 4.875 17.125 5.15482 17.125 5.5C17.125 5.75499 16.9723 5.97432 16.7533 6.07152C16.5822 6.02447 16.4041 6 16.2233 6H16.0037C15.7616 6 15.5264 6.04368 15.3075 6.125H3.5C3.15482 6.125 2.875 5.84518 2.875 5.5ZM9.64136 15.0461C9.45916 15.0129 9.28428 14.9549 9.12101 14.875H3.5C3.15482 14.875 2.875 15.1548 2.875 15.5C2.875 15.8452 3.15482 16.125 3.5 16.125H11.1689C10.8359 15.5214 10.2816 15.1628 9.64136 15.0461ZM9.71078 10.9461C10.5009 10.8142 11.3191 10.436 12.0572 9.875H3.5C3.15482 9.875 2.875 10.1548 2.875 10.5C2.875 10.8452 3.15482 11.125 3.5 11.125H9.15554C9.32814 11.0399 9.51471 10.9788 9.71078 10.9461ZM13.7037 18C14.8488 15.3637 17.3925 13.3262 19.9821 13.0337L20 12.9626C17.5589 12.6703 16.0419 10.6345 16.2233 8H16.0037C14.9041 10.5281 12.5184 12.5049 10.0402 12.9188L10 13.0785C12.2707 13.4924 13.6609 15.4705 13.4857 18H13.7037Z" fill="url(#paint0_linear_411_278952)"/>
<defs>
<linearGradient id="paint0_linear_411_278952" x1="22.4427" y1="6.0738" x2="-8.7454" y2="21.1897" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFA58E"/>
<stop offset="0.295881" stop-color="#A994F7"/>
<stop offset="0.735881" stop-color="#267EF0"/>
</linearGradient>
</defs>
</svg>
`;
	aiProgressCloseSvg = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.22482 1.08224C6.4189 0.954074 6.68286 0.975828 6.85372 1.14669C7.02459 1.31756 7.04634 1.58152 6.91818 1.7756L6.85372 1.85372L4.70724 4.00021L6.85372 6.14669L6.91818 6.22482C7.04634 6.4189 7.02459 6.68286 6.85372 6.85372C6.68286 7.02459 6.4189 7.04634 6.22482 6.91818L6.14669 6.85372L4.00021 4.70724L1.85372 6.85372C1.65846 7.04899 1.34195 7.04899 1.14669 6.85372C0.951429 6.65846 0.951429 6.34195 1.14669 6.14669L3.29318 4.00021L1.14669 1.85372L1.08224 1.7756C0.954074 1.58152 0.975828 1.31756 1.14669 1.14669C1.31756 0.975828 1.58152 0.954074 1.7756 1.08224L1.85372 1.14669L4.00021 3.29318L6.14669 1.14669L6.22482 1.08224Z" fill="#267EF0"/>
</svg>`;
	aiErrSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_516_78245)">
<circle cx="8" cy="8" r="7.5" fill="#FCBA02"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C7.44772 4 7 4.44772 7 5V8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8V5C9 4.44772 8.55228 4 8 4ZM8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_516_78245">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`;
	svgToBase64 = (svg) => {
		try {
			return `data:image/svg+xml;base64,${btoa(svg)}`;
		} catch (e) {
			logger.error("svgToBase64", e.message, svg);
			return svg;
		}
	};
	MinitagAI28w14h = svgToBase64(aiTagSvg);
	LinesAIBoldColored20 = svgToBase64(aiLineSvg);
	AiProgressClose8w8h = svgToBase64(aiProgressCloseSvg);
	AiErr16w16h = svgToBase64(aiErrSvg);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/sync-icon.js
function getSyncIconSvg(backgroundColor = "#FFFFFF", fillColor = "#0F141A") {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" ry="12" fill="${backgroundColor}"/><path transform="rotate(45 12 12)" fill-rule="evenodd" clip-rule="evenodd" d="M17.2996 5.0502L13.4996 2.2002V4.15816C13.1717 4.11975 12.8382 4.1 12.5 4.1C7.80558 4.1 4 7.90558 4 12.6C4 14.5322 4.6447 16.3138 5.73073 17.7415L7.1932 17.0102C6.1984 15.8145 5.6001 14.2772 5.6001 12.6001C5.6001 8.78934 8.68933 5.7001 12.5001 5.7001C12.8395 5.7001 13.1733 5.72461 13.4996 5.77196V7.9002L17.2996 5.0502ZM19.1659 10.8109L20.6429 10.1544C20.8752 10.9289 21 11.7499 21 12.6C21 16.956 17.7233 20.5468 13.5002 21.0418V22.999L9.7002 20.149L13.5002 17.299V19.4282C16.837 18.9437 19.4001 16.0712 19.4001 12.6001C19.4001 11.9813 19.3186 11.3815 19.1659 10.8109Z" fill="${fillColor}"/></svg>`;
}
var SyncIconNormal, SyncIconDark;
var init_sync_icon = __esmMin((() => {
	init_ai_alias();
	SyncIconNormal = svgToBase64(getSyncIconSvg());
	SyncIconDark = svgToBase64(getSyncIconSvg("#18191A", "#808080"));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/style/color.js
function _defineProperties$10(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$10(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$10(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$10(Constructor, staticProps);
	return Constructor;
}
var Color;
var init_color$1 = __esmMin((() => {
	init_es();
	Color = /* @__PURE__ */ function() {
		"use strict";
		function Color() {}
		_create_class$10(Color, [
			{
				key: "normalBorderColor",
				get: function() {
					return getThemeTokenValue("borderStrong", 1);
				}
			},
			{
				key: "lightBorderColor",
				get: function() {
					return getThemeTokenValue("borderMedium", 1);
				}
			},
			{
				key: "strongBorderColor",
				get: function() {
					return getThemeTokenValue("borderStrong");
				}
			},
			{
				key: "strongBorderColorNoAlpha",
				get: function() {
					return getThemeTokenValue("borderStrong", 1);
				}
			},
			{
				key: "ultraStrongBorderColor",
				get: function() {
					return getThemeTokenValue("borderUltrastrong");
				}
			},
			{
				key: "normalFontColor",
				get: function() {
					return getThemeTokenValue("textUltrastrong", 1);
				}
			},
			{
				key: "lightFontColor",
				get: function() {
					return getThemeTokenValue("textStrong", 1);
				}
			},
			{
				key: "lightUltraFontColor",
				get: function() {
					return getThemeTokenValue("textMedium", 1);
				}
			},
			{
				key: "weakFontColor",
				get: function() {
					return getThemeTokenValue("textWeak", 1);
				}
			},
			{
				key: "whiteFontColor",
				get: function() {
					return getThemeTokenValue("textWhite");
				}
			},
			{
				key: "lightWhiteFontColor",
				get: function() {
					return getThemeTokenValue("textWhite", .64);
				}
			},
			{
				key: "linkColor",
				get: function() {
					return getThemeTokenValue("textLink", void 0, true);
				}
			},
			{
				key: "normalBackground",
				get: function() {
					return getThemeTokenValue("bgLv2Default");
				}
			},
			{
				key: "hoverBackground",
				get: function() {
					return getThemeTokenValue("feedbackHover");
				}
			},
			{
				key: "hoverBackgroundNoAlpha",
				get: function() {
					return getThemeTokenValue("feedbackHover", 1);
				}
			},
			{
				key: "tagBackground",
				get: function() {
					return getThemeTokenValue("tspFillMedium");
				}
			},
			{
				key: "dragShadowBackground",
				get: function() {
					return getThemeTokenValue("iconMedium", .88);
				}
			},
			{
				key: "filterIconColor",
				get: function() {
					return getThemeTokenValue("iconWeak", void 0, true);
				}
			},
			{
				key: "filterIconColorActive",
				get: function() {
					return getThemeTokenValue("iconMedium", void 0, true);
				}
			},
			{
				key: "activedBackground",
				get: function() {
					return getThemeTokenValue("tspFillStrong");
				}
			},
			{
				key: "searchHighlightBorderColor",
				get: function() {
					return getThemeTokenValue("noticeDefault");
				}
			},
			{
				key: "searchHighlightBackground",
				get: function() {
					return getThemeTokenValue("noticeBgDefault");
				}
			},
			{
				key: "selectionBorderColor",
				get: function() {
					return getThemeTokenValue("accentDefault");
				}
			},
			{
				key: "selectionBackground",
				get: function() {
					return getThemeTokenValue("accentDefault", .08);
				}
			},
			{
				key: "defaultCanvasBackground",
				get: function() {
					return getThemeTokenValue("bgLv3Medium");
				}
			},
			{
				key: "lightCanvasBackground",
				get: function() {
					return getThemeTokenValue("bgLv2Weak");
				}
			},
			{
				key: "normalCanvasBackground",
				get: function() {
					return getThemeTokenValue("bgLv1Medium");
				}
			},
			{
				key: "heavyCanvasBackground",
				get: function() {
					return getThemeTokenValue("bgLv1Strong");
				}
			},
			{
				key: "headerBackground",
				get: function() {
					return getThemeTokenValue("bgLv3Weak");
				}
			},
			{
				key: "timebarHeadBackground",
				get: function() {
					return getThemeTokenValue("iconMedium");
				}
			},
			{
				key: "tspStrongBackground",
				get: function() {
					return getThemeTokenValue("tspFillUltraweak");
				}
			},
			{
				key: "tspWeakBackground",
				get: function() {
					return getThemeTokenValue("tspFillWeak");
				}
			},
			{
				key: "tspMediumBackground",
				get: function() {
					return getThemeTokenValue("tspFillMedium");
				}
			},
			{
				key: "errorTipColor",
				get: function() {
					return "#eb3639";
				}
			}
		]);
		return Color;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/style/const.js
function _defineProperties$9(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$9(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$9(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$9(Constructor, staticProps);
	return Constructor;
}
var Const, SYSTEM_FONT_FAMILY, FONT_FAMILY;
var init_const = __esmMin((() => {
	init_esm$1();
	init_es();
	Const = /* @__PURE__ */ function() {
		"use strict";
		function Const(size, color) {
			this.size = size;
			this.color = color;
		}
		_create_class$9(Const, [
			{
				key: "fontFamily",
				get: function() {
					return FONT_FAMILY;
				}
			},
			{
				key: "scrollBarStyle",
				get: function() {
					var style = {
						size: 8,
						minSize: 10,
						marginEdge: 2,
						borderRadius: this.size.borderRadius,
						background: this.color.ultraStrongBorderColor,
						backgroundHover: this.color.dragShadowBackground
					};
					if (domainConfig.getIsWb()) return Object.assign(Object.assign({}, style), {
						background: isDarkMode() ? "hsla(0,0%,100%,.26)" : "rgba(0,0,0,.26)",
						backgroundHover: isDarkMode() ? "hsla(0,0%,100%,.56)" : "rgba(0,0,0,.56)"
					});
					return style;
				}
			},
			{
				key: "disabledOpacity",
				get: function() {
					return .3;
				}
			},
			{
				key: "errorOpacity",
				get: function() {
					return .4;
				}
			}
		]);
		return Const;
	}();
	SYSTEM_FONT_FAMILY = ua.isIOS && !ua.isIOSVersionAboveOrEqual("16.0.0") ? "PingFang SC,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\", Segoe UI, Roboto, Helvetica, Arial, sans-serif" : "system-ui, -apple-system, BlinkMacSystemFont,\"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\", Segoe UI, Roboto, Helvetica, Arial, sans-serif";
	FONT_FAMILY = domainConfig.getIsToc() ? [
		"\"Helvetica Neue\"",
		"Helvetica",
		"\"PingFang SC\"",
		"\"Microsoft YaHei\"",
		"\"Source Han Sans SC\"",
		"\"Noto Sans CJK SC\"",
		"\"WenQuanYi Micro Hei\"",
		"sans-serif",
		"TdocsUncommon"
	].join(", ") : SYSTEM_FONT_FAMILY;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/style/size.js
function _defineProperties$8(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$8(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$8(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$8(Constructor, staticProps);
	return Constructor;
}
var Size;
var init_size$1 = __esmMin((() => {
	init_esm$1();
	Size = /* @__PURE__ */ function() {
		"use strict";
		function Size() {}
		_create_class$8(Size, [
			{
				key: "borderWidth",
				get: function() {
					return 1;
				}
			},
			{
				key: "borderRadius",
				get: function() {
					return 4;
				}
			},
			{
				key: "iconUltraSmall",
				get: function() {
					return 12;
				}
			},
			{
				key: "iconSmall",
				get: function() {
					return 16;
				}
			},
			{
				key: "iconNormal",
				get: function() {
					return 20;
				}
			},
			{
				key: "iconLarge",
				get: function() {
					return 24;
				}
			},
			{
				key: "fontSizeUltraSmall",
				get: function() {
					return 10;
				}
			},
			{
				key: "fontSizeSmall",
				get: function() {
					return 12;
				}
			},
			{
				key: "fieldTitleFontSize",
				get: function() {
					return 13;
				}
			},
			{
				key: "fontSizeNormal",
				get: function() {
					return 13.33;
				}
			},
			{
				key: "fontSizeLarge",
				get: function() {
					return 14;
				}
			},
			{
				key: "tagNormal",
				get: function() {
					return this.iconNormal;
				}
			},
			{
				key: "tagLarge",
				get: function() {
					return this.iconLarge;
				}
			},
			{
				key: "tagBorderWidth",
				get: function() {
					return this.borderWidth;
				}
			},
			{
				key: "tagBorderRadius",
				get: function() {
					return this.borderRadius;
				}
			},
			{
				key: "tagPaddingTop",
				get: function() {
					return 4;
				}
			},
			{
				key: "tagPaddingLeft",
				get: function() {
					return 6;
				}
			},
			{
				key: "tagMargin",
				get: function() {
					return 5;
				}
			},
			{
				key: "cellPadding",
				get: function() {
					return ua.isMobile ? 12 : 8;
				}
			},
			{
				key: "cellLineSpacing",
				get: function() {
					return 8;
				}
			},
			{
				key: "iconPadding",
				get: function() {
					return ua.isMobile ? 10 : 6;
				}
			},
			{
				key: "scrollBarSize",
				get: function() {
					return ua.isMobile ? 6 : 8;
				}
			},
			{
				key: "timePadding",
				get: function() {
					return 12;
				}
			},
			{
				key: "progressHeight",
				get: function() {
					return 10;
				}
			},
			{
				key: "fieldMinWidthToB",
				get: function() {
					return 80;
				}
			}
		]);
		return Size;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/style/index.js
function _defineProperties$7(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$7(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$7(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$7(Constructor, staticProps);
	return Constructor;
}
var Style, style;
var init_style = __esmMin((() => {
	init_color$1();
	init_const();
	init_size$1();
	Style = /* @__PURE__ */ function() {
		"use strict";
		function Style() {
			this.size = new Size();
			this.color = new Color();
			this.consts = new Const(this.size, this.color);
		}
		_create_class$7(Style, [
			{
				key: "defaultTextConfig",
				get: function() {
					return {
						fontStyle: "normal",
						fontFamily: this.consts.fontFamily,
						color: this.color.normalFontColor,
						fontSize: this.size.fontSizeNormal,
						lineHeight: 1.5,
						verticalAlign: "middle",
						align: "left",
						ellipsis: true,
						wrap: "word"
					};
				}
			},
			{
				key: "defaultLineConfig",
				get: function() {
					return {
						borderWidth: this.size.borderWidth,
						borderColor: this.color.normalBorderColor
					};
				}
			},
			{
				key: "defaultCornerConfig",
				get: function() {
					return Object.assign(Object.assign({}, this.defaultLineConfig), { borderRadius: this.size.borderRadius });
				}
			}
		]);
		return Style;
	}();
	style = new Style();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/normal-icon.js
function getCheckboxIconAlias(isSelect) {
	if (isSelect) return isDarkMode() ? NormalIconAlias.CHECKBOX_DARK_CHECKED : NormalIconAlias.CHECKBOX_CHECKED;
	return isDarkMode() ? NormalIconAlias.CHECKBOX_DARK_UNCHECKED : NormalIconAlias.CHECKBOX_UNCHECKED;
}
var getSyncIconAlias, replaceSvgColor, NormalIconAlias, NormalIconSrc;
var init_normal_icon = __esmMin((() => {
	init_avatar_member_30();
	init_dropdown_outline_heavy_24();
	init_arrow_heavy_down_16();
	init_arrow_heavy_right_16();
	init_checkbox_fill_lignt_tagpaletted3c_24();
	init_zan_fill_light_24();
	init_zan_outline_light_24();
	init_icon_secondary_arrow_right$1();
	init_icon_toast_info();
	init_square_checkbox_selected_210114();
	init_square_checkbox_unselected_210114();
	init_arrow_backward_16();
	init_arrow_forward_16();
	init_basic_supernext();
	init_basic_superprev();
	init_common_more();
	init_data_quote_16();
	init_icon_secondary_arrow_left();
	init_icon_secondary_arrow_right();
	init_menu_rename();
	init_pcapp_close_hover();
	init_placeholder_48_imagedefault();
	init_toolbar_dele();
	init_toolbar_smartsheet_collapsestack();
	init_upload_loading_failed();
	init_warning_gray_24();
	init_wecom_eye_slash_fill_iconmedium_16();
	init_basic_16_add();
	init_basic_16_drag();
	init_basic_16_dropdown();
	init_basic_16_dropdown_white_16();
	init_basic_16_fold_normal();
	init_basic_24_add();
	init_basic_24_close();
	init_cell_add();
	init_cell_add_dark_24();
	init_checkbox_24_off_nor();
	init_checkbox_24_on_nor();
	init_icon_smartsheet_attribute_location_24();
	init_icon_tips_prompt_darkmode();
	init_arrow_up_right_arrow_down_left_14();
	init_avatar_group_typed_40();
	init_filter_fill_12();
	init_groupby_14();
	init_es();
	init_ai_alias();
	init_sync_icon();
	init_style();
	getSyncIconAlias = () => isDarkMode() ? NormalIconAlias.SYNC_APP_DARK : NormalIconAlias.SYNC_APP;
	replaceSvgColor = (color, svg) => {
		try {
			var newSvg = atob(svg.replace("data:image/svg+xml;base64,", "")).replace(/currentColor/g, color);
			return `data:image/svg+xml;base64,${btoa(newSvg)}`;
		} catch (e) {
			logger.error("replaceSvgColor", e.message, svg, color);
			return svg;
		}
	};
	(function(NormalIconAlias) {
		NormalIconAlias["ADD"] = "ADD";
		NormalIconAlias["BASE_ADD"] = "BASE_ADD";
		NormalIconAlias["DROPDOWN"] = "DROPDOWN";
		NormalIconAlias["DROPDOWN_STAT"] = "DROPDOWN_STAT";
		NormalIconAlias["DROPDOWN_WHITE"] = "DROPDOWN_WHITE";
		NormalIconAlias["DROPDOWN_FOLD"] = "DROPDOWN_FOLD";
		NormalIconAlias["CHEVRON_RIGHT"] = "CHEVRON_RIGHT";
		NormalIconAlias["CHEVRON_DOWN"] = "CHEVRON_DOWN";
		NormalIconAlias["CHECKBOX_CHECKED"] = "CHECKBOX_CHECKED";
		NormalIconAlias["CHECKBOX_CHECK_GREEN"] = "CHECKBOX_CHECK_GREEN";
		NormalIconAlias["CHECKBOX_UNCHECKED"] = "CHECKBOX_UNCHECKED";
		NormalIconAlias["CHECKBOX_DARK_CHECKED"] = "CHECKBOX_DARK_CHECKED";
		NormalIconAlias["CHECKBOX_DARK_UNCHECKED"] = "CHECKBOX_DARK_UNCHECKED";
		NormalIconAlias["CLOSE_DARK"] = "CLOSE_DARK";
		NormalIconAlias["CLOSE_WHITE"] = "CLOSE_WHITE";
		NormalIconAlias["DATA_QUOTE"] = "DATA_QUOTE";
		NormalIconAlias["FAILED_ICON"] = "FAILED_ICON";
		NormalIconAlias["EXPEND_RECORD"] = "EXPEND_RECORD";
		NormalIconAlias["FAILED_ICON_GRAY"] = "FAILED_ICON_GRAY";
		NormalIconAlias["LOCATION_DEFAULT"] = "LOCATION_DEFAULT";
		NormalIconAlias["CELL_ADD_DARK"] = "CELL_ADD_DARK";
		NormalIconAlias["CELL_ADD"] = "CELL_ADD";
		NormalIconAlias["GROUP_DRAG"] = "GROUP_DRAG";
		NormalIconAlias["TIP_DARK"] = "TIP_DARK";
		NormalIconAlias["TIP_BLUE"] = "TIP_BLUE";
		NormalIconAlias["ARROW_RIGHT"] = "ARROW_RIGHT";
		NormalIconAlias["SUPER_NEXT"] = "SUPER_NEXT";
		NormalIconAlias["SUPER_PREV"] = "SUPER_PREV";
		NormalIconAlias["TIME_NEXT"] = "TIME_NEXT";
		NormalIconAlias["TIME_PREV"] = "TIME_PREV";
		NormalIconAlias["ARROW_NEXT"] = "ARROW_NEXT";
		NormalIconAlias["ARROW_PREV"] = "ARROW_PREV";
		NormalIconAlias["LIKE_CHECKED"] = "LIKE_CHECKED";
		NormalIconAlias["LIKE"] = "LIKE";
		NormalIconAlias["MENU_MORE"] = "MENU_MORE";
		NormalIconAlias["DEFAULT_IMAGE"] = "DEFAULT_IMAGE";
		NormalIconAlias["USER_AVATAR"] = "USER_AVATAR";
		NormalIconAlias["RENAME"] = "RENAME";
		NormalIconAlias["DELETE"] = "DELETE";
		NormalIconAlias["TOOLBAR_COLLAPSE"] = "TOOLBAR_COLLAPSE";
		NormalIconAlias["LINES_AI_BOLD_COLORED"] = "LINES_AI_BOLD_COLORED";
		NormalIconAlias["MINITAG_AI"] = "MINITAG_AI";
		NormalIconAlias["MINITAG_AI_ERROR"] = "MINITAG_AI_ERROR";
		NormalIconAlias["MINITAG_AI_PROGRESS_CLOSE"] = "MINITAG_AI_PROGRESS_CLOSE";
		NormalIconAlias["GROUP_AVATAR"] = "GROUP_AVATAR";
		NormalIconAlias["GROUPBY"] = "GROUPBY";
		NormalIconAlias["FIELD_FILTER"] = "FIELD_FILTER";
		NormalIconAlias["FIELD_FILTER_ACTIVE"] = "FIELD_FILTER_ACTIVE";
		NormalIconAlias["RECORD_NO_PERMISSION"] = "RECORD_NO_PERMISSION";
		NormalIconAlias["SYNC_APP"] = "SYNC_APP";
		NormalIconAlias["SYNC_APP_DARK"] = "SYNC_APP_DARK";
	})(NormalIconAlias || (NormalIconAlias = {}));
	NormalIconSrc = {
		[NormalIconAlias.ADD]: basic_24_add_default,
		[NormalIconAlias.BASE_ADD]: basic_16_add_default,
		[NormalIconAlias.DROPDOWN]: basic_16_dropdown_default,
		[NormalIconAlias.DROPDOWN_STAT]: dropdown_outline_heavy_24_default,
		[NormalIconAlias.DROPDOWN_WHITE]: basic_16_dropdown_white_16_default,
		[NormalIconAlias.DROPDOWN_FOLD]: basic_16_fold_normal_default,
		[NormalIconAlias.CHEVRON_RIGHT]: arrow_heavy_right_16_default,
		[NormalIconAlias.CHEVRON_DOWN]: arrow_heavy_down_16_default,
		[NormalIconAlias.CHECKBOX_CHECKED]: checkbox_24_on_nor_default,
		[NormalIconAlias.CHECKBOX_CHECK_GREEN]: checkbox_fill_lignt_tagpaletted3c_24_default,
		[NormalIconAlias.CHECKBOX_UNCHECKED]: checkbox_24_off_nor_default,
		[NormalIconAlias.CHECKBOX_DARK_CHECKED]: square_checkbox_selected_210114_default,
		[NormalIconAlias.CHECKBOX_DARK_UNCHECKED]: square_checkbox_unselected_210114_default,
		[NormalIconAlias.CLOSE_DARK]: basic_24_close_default,
		[NormalIconAlias.CLOSE_WHITE]: pcapp_close_hover_default,
		[NormalIconAlias.DATA_QUOTE]: data_quote_16_default,
		[NormalIconAlias.FAILED_ICON]: upload_loading_failed_default,
		[NormalIconAlias.EXPEND_RECORD]: arrow_up_right_arrow_down_left_14_default,
		[NormalIconAlias.FAILED_ICON_GRAY]: warning_gray_24_default,
		[NormalIconAlias.LOCATION_DEFAULT]: icon_smartsheet_attribute_location_24_default,
		[NormalIconAlias.CELL_ADD_DARK]: cell_add_dark_24_default,
		[NormalIconAlias.CELL_ADD]: cell_add_default,
		[NormalIconAlias.GROUP_DRAG]: basic_16_drag_default,
		[NormalIconAlias.TIP_DARK]: icon_tips_prompt_darkmode_default,
		[NormalIconAlias.TIP_BLUE]: icon_toast_info_default,
		[NormalIconAlias.ARROW_RIGHT]: icon_secondary_arrow_right_default$1,
		[NormalIconAlias.SUPER_NEXT]: basic_supernext_default,
		[NormalIconAlias.SUPER_PREV]: basic_superprev_default,
		[NormalIconAlias.TIME_NEXT]: arrow_backward_16_default,
		[NormalIconAlias.TIME_PREV]: arrow_forward_16_default,
		[NormalIconAlias.ARROW_NEXT]: icon_secondary_arrow_right_default,
		[NormalIconAlias.ARROW_PREV]: icon_secondary_arrow_left_default,
		[NormalIconAlias.LIKE_CHECKED]: zan_fill_light_24_default,
		[NormalIconAlias.LIKE]: zan_outline_light_24_default,
		[NormalIconAlias.MENU_MORE]: common_more_default,
		[NormalIconAlias.DEFAULT_IMAGE]: placeholder_48_imagedefault_default,
		[NormalIconAlias.USER_AVATAR]: avatar_member_30_default,
		[NormalIconAlias.RENAME]: menu_rename_default,
		[NormalIconAlias.DELETE]: toolbar_dele_default,
		[NormalIconAlias.TOOLBAR_COLLAPSE]: toolbar_smartsheet_collapsestack_default,
		[NormalIconAlias.LINES_AI_BOLD_COLORED]: LinesAIBoldColored20,
		[NormalIconAlias.MINITAG_AI]: MinitagAI28w14h,
		[NormalIconAlias.MINITAG_AI_ERROR]: AiErr16w16h,
		[NormalIconAlias.MINITAG_AI_PROGRESS_CLOSE]: AiProgressClose8w8h,
		[NormalIconAlias.GROUP_AVATAR]: avatar_group_typed_40_default,
		[NormalIconAlias.GROUPBY]: groupby_14_default,
		[NormalIconAlias.FIELD_FILTER]: replaceSvgColor(style.color.filterIconColor, filter_fill_12_default),
		[NormalIconAlias.FIELD_FILTER_ACTIVE]: replaceSvgColor(style.color.filterIconColorActive, filter_fill_12_default),
		[NormalIconAlias.RECORD_NO_PERMISSION]: wecom_eye_slash_fill_iconmedium_16_default,
		[NormalIconAlias.SYNC_APP]: SyncIconNormal,
		[NormalIconAlias.SYNC_APP_DARK]: SyncIconDark
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/hyperlink-icon.js
function getHyperLinkTypeIconAlias(link) {
	var hyperlinkType = getTencentDomainLinkType(link);
	if (hyperlinkType === HyperlinkType.OTHER) return;
	var iconToC = HyperlinkTypeIcons[generateHyperlinkTypeToc(hyperlinkType)];
	if (domainConfig.getIsToc() && iconToC) return generateHyperlinkTypeToc(hyperlinkType);
	return generateHyperlinkType(hyperlinkType);
}
var generateHyperlinkType, generateHyperlinkTypeToc, HyperlinkTypeIcons;
var init_hyperlink_icon = __esmMin((() => {
	init_file_smartcanvas_64();
	init_application_vnd_tdocs_apps_doc_pace_64();
	init_file_doc_16();
	init_file_drive_ai_16();
	init_file_drive_default_16();
	init_file_drive_excel_16();
	init_file_drive_image_16();
	init_file_drive_mp3_16();
	init_file_drive_mp4_16();
	init_file_drive_pdf_16();
	init_file_drive_ppt_16();
	init_file_drive_word_16();
	init_file_flowdiagram_16();
	init_file_folder_16();
	init_file_form_16();
	init_file_mindmap_16();
	init_file_pdf_16();
	init_file_sharefolder_16();
	init_file_sheet_16();
	init_file_slide_16();
	init_file_web_logo_16();
	init_file_web_sharefolder_16();
	init_blackboard();
	init_file_ae_emphasized_inline();
	init_file_ai_emphasized_inline();
	init_file_apk_emphasized_inline();
	init_file_au_emphasized_inline();
	init_file_audio_emphasized_inline();
	init_file_cad_emphasized_inline();
	init_file_cdr_emphasized_inline();
	init_file_code_emphasized_inline();
	init_file_disk_emphasized_inline();
	init_file_excel_emphasized_inline();
	init_file_exe_emphasized_inline();
	init_file_fl_emphasized_inline();
	init_file_font_emphasized_inline();
	init_file_id_emphasized_inline();
	init_file_image_emphasized_inline();
	init_file_keynote_emphasized_inline();
	init_file_lr_emphasized_inline();
	init_file_mail_emphasized_inline();
	init_file_numbers_emphasized_inline();
	init_file_other_emphasized_inline();
	init_file_pages_emphasized_inline();
	init_file_pdf_emphasized_inline();
	init_file_ppt_emphasized_inline();
	init_file_pr_emphasized_inline();
	init_file_ps_emphasized_inline();
	init_file_sketch_emphasized_inline();
	init_file_smartdoc_20();
	init_file_ssform_inline();
	init_file_svg_emphasized_inline();
	init_file_sw_emphasized_inline();
	init_file_text_emphasized_inline();
	init_file_tpdf_64();
	init_file_video_emphasized_inline();
	init_file_word_emphasized_inline();
	init_file_xmind_emphasized_inline();
	init_file_zip_emphasized_inline();
	init_filetype_tdoc_flowchart();
	init_filetype_tdoc_folder();
	init_filetype_tdoc_mindmap();
	init_filetype_tdoc_tdoc();
	init_filetype_tdoc_tform();
	init_filetype_tdoc_tsheet();
	init_filetype_tdoc_tslide();
	init_list_space_24();
	init_treport();
	init_tsmartsheet();
	init_vector();
	init_es();
	init_es$1();
	init_checkbox_icon();
	init_field_icon();
	init_normal_icon();
	generateHyperlinkType = (type) => `HyperlinkType-${[type]}`;
	generateHyperlinkTypeToc = (type) => `HyperlinkTypeToc-${[type]}`;
	HyperlinkTypeIcons = {
		[generateHyperlinkType(HyperlinkType.TEXT)]: file_text_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.CODE)]: file_code_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.IMAGE)]: file_image_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.AUDIO)]: file_audio_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.VIDEO)]: file_video_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.ZIP)]: file_zip_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.FONT)]: file_font_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.MAIL)]: file_mail_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.XMIND)]: file_xmind_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.EXE)]: file_exe_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.EXCEL)]: file_excel_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.PPT)]: file_ppt_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.WORD)]: file_word_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.NUMBERS)]: file_numbers_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.KEYNOTE)]: file_keynote_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.PAGES)]: file_pages_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.CAD)]: file_cad_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.CDR)]: file_cdr_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.SW)]: file_sw_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.PS)]: file_ps_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.AI)]: file_ai_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.AE)]: file_ae_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.LR)]: file_lr_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.PR)]: file_pr_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.AU)]: file_au_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.ID)]: file_id_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.FL)]: file_fl_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.SVG)]: file_svg_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.PDF)]: file_tpdf_64_default,
		[generateHyperlinkType(HyperlinkType.PDF_FILE)]: file_pdf_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.SKETCH)]: file_sketch_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.APK)]: file_apk_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.DISK)]: file_disk_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.FOLDER)]: filetype_tdoc_folder_default,
		[generateHyperlinkType(HyperlinkType.DOC)]: filetype_tdoc_tdoc_default,
		[generateHyperlinkType(HyperlinkType.SHEET)]: filetype_tdoc_tsheet_default,
		[generateHyperlinkType(HyperlinkType.JOURNAL)]: treport_default,
		[generateHyperlinkType(HyperlinkType.SLIDE)]: filetype_tdoc_tslide_default,
		[generateHyperlinkType(HyperlinkType.FORM)]: filetype_tdoc_tform_default,
		[generateHyperlinkType(HyperlinkType.MIND)]: filetype_tdoc_mindmap_default,
		[generateHyperlinkType(HyperlinkType.SMART_SHEET)]: tsmartsheet_default,
		[generateHyperlinkType(HyperlinkType.SMART_CANVAS)]: file_smartcanvas_64_default,
		[generateHyperlinkType(HyperlinkType.SMART_APP)]: file_smartdoc_20_default,
		[generateHyperlinkType(HyperlinkType.SPACE)]: application_vnd_tdocs_apps_doc_pace_64_default,
		[generateHyperlinkType(HyperlinkType.FLOWCHART)]: filetype_tdoc_flowchart_default,
		[generateHyperlinkType(HyperlinkType.FOLDER_SHARE)]: file_web_sharefolder_16_default,
		[generateHyperlinkType(HyperlinkType.TENCENTDOC)]: file_web_logo_16_default,
		[generateHyperlinkType(HyperlinkType.ATTACHMENT_IMAGE)]: file_drive_image_16_default,
		[generateHyperlinkType(HyperlinkType.VECTOR)]: vector_default,
		[generateHyperlinkType(HyperlinkType.OTHER)]: file_other_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.BOARD)]: blackboard_default,
		[generateHyperlinkType(HyperlinkType.DEFAULT)]: file_other_emphasized_inline_default,
		[generateHyperlinkType(HyperlinkType.WEDRIVE_SHARE_FOLDER)]: list_space_24_default,
		[generateHyperlinkType(HyperlinkType.SMART_SHEET_FORM_FILL)]: file_ssform_inline_default,
		[generateHyperlinkTypeToc(HyperlinkType.EXCEL)]: file_drive_excel_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.WORD)]: file_drive_word_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.PPT)]: file_drive_ppt_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.AUDIO)]: file_drive_mp4_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.VIDEO)]: file_drive_mp4_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.MUSIC)]: file_drive_mp3_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.AI)]: file_drive_ai_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.IMAGE)]: file_drive_image_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.PDF)]: file_pdf_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.PDF_FILE)]: file_drive_pdf_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.DOC)]: file_doc_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.SHEET)]: file_sheet_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.SLIDE)]: file_slide_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.FLOWCHART)]: file_flowdiagram_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.FOLDER)]: file_folder_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.FORM)]: file_form_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.MIND)]: file_mindmap_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.FOLDER_SHARE)]: file_sharefolder_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.DEFAULT)]: file_drive_default_16_default,
		[generateHyperlinkTypeToc(HyperlinkType.SMART_SHEET_FORM_FILL)]: file_ssform_inline_default
	};
	Object.assign(NormalFieldTypeIconSrc, WhiteFieldTypeIconSrc, HyperlinkTypeIcons, NormalIconSrc, CheckboxIcons);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/constants/cursor.js
var Cursor;
var init_cursor = __esmMin((() => {
	(function(Cursor) {
		Cursor["DEFAULT"] = "default";
		Cursor["POINTER"] = "pointer";
		Cursor["NOT_ALLOW"] = "not-allowed";
		Cursor["COL_RESIZE"] = "col-resize";
		Cursor["GRAB"] = "grab";
		Cursor["GRABBING"] = "grabbing";
		Cursor["CROSS_HAIR"] = "crosshair";
		Cursor["MOVE"] = "move";
		Cursor["EW_RESIZE"] = "ew-resize";
		Cursor["TEXT"] = "text";
	})(Cursor || (Cursor = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/transform-offset.js
/**
* 坐标转换
* @param event
* @param root
* @param scale
* @returns
*/ function transformOffset(event, root, scale = 1) {
	var rect = root.getBoundingClientRect();
	return {
		x: Math.round((event.clientX - rect.left) / scale),
		y: Math.round((event.clientY - rect.top) / scale)
	};
}
var init_transform_offset = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/feature-event/abstract.js
function _inherits$25(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$25(subClass, superClass);
}
function _set_prototype_of$25(o, p) {
	_set_prototype_of$25 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$25(o, p);
}
var import_main$18, AbstractEvent;
var init_abstract = __esmMin((() => {
	import_main$18 = require_main();
	init_transform_offset();
	AbstractEvent = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$25(AbstractEvent, Disposable);
		function AbstractEvent(option) {
			var _this = Disposable.call(this) || this;
			_this.option = option;
			return _this;
		}
		var _proto = AbstractEvent.prototype;
		_proto.transformAbsoluteOffset = function transformAbsoluteOffset(event) {
			return transformOffset(event, this.option.root, this.option.getScale());
		};
		return AbstractEvent;
	}(import_main$18.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/feature-event/document.js
function _inherits$24(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$24(subClass, superClass);
}
function _set_prototype_of$24(o, p) {
	_set_prototype_of$24 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$24(o, p);
}
var import_main$17, DocumentEvent;
var init_document = __esmMin((() => {
	init_event();
	import_main$17 = require_main();
	init_es();
	init_abstract();
	DocumentEvent = /* @__PURE__ */ function(AbstractEvent) {
		"use strict";
		_inherits$24(DocumentEvent, AbstractEvent);
		function DocumentEvent(option) {
			var _this = AbstractEvent.call(this, option) || this;
			_this.onMouseUpEmitter = _this._register(new Emitter());
			_this.onMouseDownEmitter = _this._register(new Emitter());
			_this.onMouseMoveEmitter = _this._register(new Emitter());
			_this.onMouseLeaveEmitter = _this._register(new Emitter());
			_this.onMouseDownCaptureEmitter = _this._register(new Emitter());
			_this.onKeyDownEmitter = _this._register(new Emitter());
			_this.eventDispose = new import_main$17.DisposableStore();
			_this.onDocumentMouseUp = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseUpEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onDocumentMouseDown = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseDownEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onDocumentMouseMove = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseMoveEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onDocumentMouseLeave = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseMoveEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onDocumentMouseDownCapture = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseDownCaptureEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onDocumentKeyDown = (event) => {
				_this.onKeyDownEmitter.fire(event);
			};
			_this.onMouseUp = _this.onMouseUpEmitter.event;
			_this.onMouseDown = _this.onMouseDownEmitter.event;
			_this.onMouseMove = _this.onMouseMoveEmitter.event;
			_this.onMouseLeave = _this.onMouseLeaveEmitter.event;
			_this.onMouseDownCapture = _this.onMouseDownCaptureEmitter.event;
			_this.onKeyDown = _this.onKeyDownEmitter.event;
			_this.initEvents();
			return _this;
		}
		var _proto = DocumentEvent.prototype;
		_proto.dispose = function dispose() {
			AbstractEvent.prototype.dispose.call(this);
			this.eventDispose.clear();
		};
		_proto.initEvents = function initEvents() {
			this.eventDispose.add(dom.addDisposableListener(document, "mouseup", this.onDocumentMouseUp));
			this.eventDispose.add(dom.addDisposableListener(document, "mousedown", this.onDocumentMouseDown));
			this.eventDispose.add(dom.addDisposableListener(document, "mousemove", this.onDocumentMouseMove));
			this.eventDispose.add(dom.addDisposableListener(document, "mouseleave", this.onDocumentMouseLeave));
			this.eventDispose.add(dom.addDisposableListener(document, "mousedown", this.onDocumentMouseDownCapture, true));
			this.eventDispose.add(dom.addDisposableListener(document, "keydown", this.onDocumentKeyDown, true));
		};
		return DocumentEvent;
	}(AbstractEvent);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/feature-event/stage.js
function _inherits$23(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$23(subClass, superClass);
}
function _set_prototype_of$23(o, p) {
	_set_prototype_of$23 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$23(o, p);
}
var StageEvent;
var init_stage$1 = __esmMin((() => {
	init_event();
	init_esm$1();
	init_abstract();
	StageEvent = /* @__PURE__ */ function(AbstractEvent) {
		"use strict";
		_inherits$23(StageEvent, AbstractEvent);
		function StageEvent(option) {
			var _this = AbstractEvent.call(this, option) || this;
			_this.onWheelEmitter = _this._register(new Emitter());
			_this.onSlideEmitter = _this._register(new Emitter());
			_this.onMouseUpEmitter = _this._register(new Emitter());
			_this.onMouseDownEmitter = _this._register(new Emitter());
			_this.onMouseMoveEmitter = _this._register(new Emitter());
			_this.onMouseLeaveEmitter = _this._register(new Emitter());
			_this.onDoubleClickEmitter = _this._register(new Emitter());
			_this.onTapEmitter = _this._register(new Emitter());
			_this.onResizeEmitter = _this._register(new Emitter());
			_this.onTouchStartEmitter = _this._register(new Emitter());
			_this.onTouchMoveEmitter = _this._register(new Emitter());
			_this.onTouchEndEmitter = _this._register(new Emitter());
			_this.onStageMouseUp = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseUpEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onStageMouseDown = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseDownEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onStageMouseMove = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseMoveEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onStageMouseLeave = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseLeaveEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onStageDoubleClick = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onDoubleClickEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onStageTap = (param) => {
				var offset = _this.transformAbsoluteOffset(param);
				_this.onTapEmitter.fire(Object.assign(Object.assign({ event: new MouseEvent("tap", param) }, offset), { target: _this.option.targetGetter(offset) }));
			};
			_this.onStageTouchStart = (param) => {
				var offset = _this.transformAbsoluteOffset(param);
				_this.onTouchStartEmitter.fire(Object.assign(Object.assign({ event: new MouseEvent("touchstart", param) }, offset), { target: _this.option.targetGetter(offset) }));
			};
			_this.onStageTouchMove = (param) => {
				var offset = _this.transformAbsoluteOffset(param);
				_this.onTouchMoveEmitter.fire(Object.assign(Object.assign({ event: new MouseEvent("touchmove", param) }, offset), { target: _this.option.targetGetter(offset) }));
			};
			_this.onStageTouchEnd = (param) => {
				var offset = _this.transformAbsoluteOffset(param);
				_this.onTouchEndEmitter.fire(Object.assign(Object.assign({ event: new MouseEvent("touchend", param) }, offset), { target: _this.option.targetGetter(offset) }));
			};
			_this.onStageWheel = (event) => {
				if (event.deltaX !== 0) event.preventDefault();
				var { clientX, clientY } = event;
				var { deltaX, deltaY } = event;
				if (ua.isWindows && event.shiftKey) {
					if (deltaX === 0 && deltaY !== 0) {
						deltaX = deltaY;
						deltaY = 0;
					}
				}
				var rect = _this.option.root.getBoundingClientRect();
				var offsetX = clientX - rect.left;
				var offsetY = clientY - rect.top;
				_this.onWheelEmitter.fire({
					scrollInfo: {
						deltaX,
						deltaY,
						offsetX,
						offsetY
					},
					event
				});
			};
			_this.onStageSlide = (param) => {
				var { deltaX, deltaY, clientX, clientY } = param;
				var rect = _this.option.root.getBoundingClientRect();
				var offsetX = clientX - rect.left;
				var offsetY = clientY - rect.top;
				_this.onSlideEmitter.fire({
					deltaX,
					deltaY,
					offsetX,
					offsetY
				});
			};
			_this.onWheel = _this.onWheelEmitter.event;
			_this.onSlide = _this.onSlideEmitter.event;
			_this.onMouseUp = _this.onMouseUpEmitter.event;
			_this.onMouseDown = _this.onMouseDownEmitter.event;
			_this.onMouseMove = _this.onMouseMoveEmitter.event;
			_this.onMouseLeave = _this.onMouseLeaveEmitter.event;
			_this.onDoubleClick = _this.onDoubleClickEmitter.event;
			_this.onTap = _this.onTapEmitter.event;
			_this.onResize = _this.onResizeEmitter.event;
			_this.onTouchStart = _this.onTouchStartEmitter.event;
			_this.onTouchMove = _this.onTouchMoveEmitter.event;
			_this.onTouchEnd = _this.onTouchEndEmitter.event;
			_this.initEvents();
			return _this;
		}
		var _proto = StageEvent.prototype;
		_proto.forceTriggerResize = function forceTriggerResize() {
			this.onResizeEmitter.fire();
		};
		_proto.initEvents = function initEvents() {
			this.option.stage.setAttrs({
				onWheel: (event) => this.onStageWheel(event),
				onSlide: (event) => this.onStageSlide(event),
				onResize: () => this.onResizeEmitter.fire(),
				onMouseUp: (event) => this.onStageMouseUp(event),
				onMouseDown: (event) => this.onStageMouseDown(event),
				onMouseMove: (event) => this.onStageMouseMove(event),
				onMouseLeave: (event) => this.onStageMouseLeave(event),
				onDoubleClick: (event) => this.onStageDoubleClick(event),
				onTap: (param) => this.onStageTap(param),
				onTouchStart: (param) => this.onStageTouchStart(param),
				onTouchMove: (param) => this.onStageTouchMove(param),
				onTouchEnd: (param) => this.onStageTouchEnd(param)
			});
		};
		return StageEvent;
	}(AbstractEvent);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/feature-event/window.js
function _inherits$22(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$22(subClass, superClass);
}
function _set_prototype_of$22(o, p) {
	_set_prototype_of$22 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$22(o, p);
}
var import_main$16, WindowEvent;
var init_window = __esmMin((() => {
	init_event();
	import_main$16 = require_main();
	init_es();
	init_abstract();
	WindowEvent = /* @__PURE__ */ function(AbstractEvent) {
		"use strict";
		_inherits$22(WindowEvent, AbstractEvent);
		function WindowEvent(option) {
			var _this = AbstractEvent.call(this, option) || this;
			_this.onMouseMoveEmitter = _this._register(new Emitter());
			_this.onMouseLeaveEmitter = _this._register(new Emitter());
			_this.eventDispose = new import_main$16.DisposableStore();
			_this.onWindowMouseMove = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseMoveEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onWindowMouseLeave = (event) => {
				var offset = _this.transformAbsoluteOffset(event);
				_this.onMouseLeaveEmitter.fire(Object.assign(Object.assign({ event }, offset), { target: _this.option.targetGetter(offset, event) }));
			};
			_this.onMouseMove = _this.onMouseMoveEmitter.event;
			_this.onMouseLeave = _this.onMouseLeaveEmitter.event;
			_this.initEvents();
			return _this;
		}
		var _proto = WindowEvent.prototype;
		_proto.dispose = function dispose() {
			AbstractEvent.prototype.dispose.call(this);
			this.eventDispose.clear();
		};
		_proto.initEvents = function initEvents() {
			this.eventDispose.add(dom.addDisposableListener(window, "mousemove", this.onWindowMouseMove));
			this.eventDispose.add(dom.addDisposableListener(window, "mouseleave", this.onWindowMouseLeave));
		};
		return WindowEvent;
	}(AbstractEvent);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/feature-event/index.js
function _inherits$21(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$21(subClass, superClass);
}
function _set_prototype_of$21(o, p) {
	_set_prototype_of$21 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$21(o, p);
}
var import_main$15, FeatureUIEvent;
var init_feature_event = __esmMin((() => {
	import_main$15 = require_main();
	init_document();
	init_stage$1();
	init_window();
	FeatureUIEvent = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$21(FeatureUIEvent, Disposable);
		function FeatureUIEvent(option) {
			var _this = Disposable.call(this) || this;
			_this.stage = _this._register(new StageEvent(option));
			_this.window = _this._register(new WindowEvent(option));
			_this.document = _this._register(new DocumentEvent(option));
			return _this;
		}
		return FeatureUIEvent;
	}(import_main$15.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/is-in-rect.js
/**
* x, y 是否在指定的 rect 内
* @param x
* @param y
* @param rect
* @returns
*/ function isHitRect(x, y, rect) {
	if (!rect || !rect.width || !rect.height) return false;
	return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
}
var init_is_in_rect = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/base.js
var Base;
var init_base = __esmMin((() => {
	Base = /* @__PURE__ */ function() {
		"use strict";
		function Base(util) {
			this.util = util;
		}
		var _proto = Base.prototype;
		_proto.draw = function draw(context, config) {
			this.prepare(context, config);
			this.drawAppearance(context, config);
		};
		_proto.drawBatch = function drawBatch(context, maps) {
			for (var [batchKey, configSets] of maps) {
				var params = this.toBatchParam(batchKey);
				this.prepare(context, params);
				for (var config of configSets) this.drawAppearance(context, config);
			}
		};
		return Base;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/shared/constant.js
var init_constant = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/bitmap/index.js
function _inherits$20(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$20(subClass, superClass);
}
function _set_prototype_of$20(o, p) {
	_set_prototype_of$20 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$20(o, p);
}
function hasBorder$1(config) {
	return config.borderWidth || config.borderColor;
}
var BitmapApi;
var init_bitmap = __esmMin((() => {
	init_base();
	init_constant();
	BitmapApi = /* @__PURE__ */ function(Base) {
		"use strict";
		_inherits$20(BitmapApi, Base);
		function BitmapApi() {
			return Base.apply(this, arguments) || this;
		}
		var _proto = BitmapApi.prototype;
		_proto.toBatchParam = function toBatchParam(key) {
			var [borderColor, borderWidth, borderRadius] = key.split(":");
			return {
				borderColor,
				borderWidth: Number(borderWidth),
				borderRadius: Number(borderRadius)
			};
		};
		_proto.prepare = function prepare(context, params) {
			if (hasBorder$1(params)) {
				context.lineWidth = params.borderWidth || BitmapApi.defaultStyle.borderWidth;
				context.strokeStyle = params.borderColor || BitmapApi.defaultStyle.borderColor;
			}
		};
		_proto.drawAppearance = function drawAppearance(context, config) {
			if (!config.image) return;
			var rect = this.util.getBoundingRect(config);
			var { x, y, width, height } = rect;
			var { image, borderRadius } = config;
			var withBorder = hasBorder$1(config);
			this.util.clip.apply(context, config);
			if (borderRadius) {
				context.save();
				this.util.opacity.apply(context, config);
				this.util.rotate.apply(context, rect, config);
				this.util.roundRect(context, x, y, width, height, borderRadius);
				context.clip();
				context.drawImage(image, x, y, width, height);
				if (withBorder) context.stroke();
				context.restore();
				this.util.clip.release(context, config);
				return;
			}
			this.util.opacity.apply(context, config);
			this.util.rotate.apply(context, rect, config);
			context.drawImage(image, x, y, width, height);
			if (withBorder) context.strokeRect(x, y, width, height);
			this.util.rotate.release(context, config);
			this.util.opacity.release(context, config);
			this.util.clip.release(context, config);
		};
		BitmapApi.setDefaultStyle = function setDefaultStyle(config) {
			Object.assign(BitmapApi.defaultStyle, config);
		};
		BitmapApi.toBatchKey = function toBatchKey(config) {
			return [
				config.borderColor,
				config.borderWidth,
				config.borderRadius
			].join(":");
		};
		return BitmapApi;
	}(Base);
	BitmapApi.defaultStyle = {
		borderWidth: 1,
		borderRadius: 0,
		borderColor: "black"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/corner/interface.js
var CornerType;
var init_interface$9 = __esmMin((() => {
	(function(CornerType) {
		CornerType[CornerType["Top"] = 0] = "Top";
		CornerType[CornerType["Bottom"] = 1] = "Bottom";
		CornerType[CornerType["Left"] = 2] = "Left";
		CornerType[CornerType["Right"] = 3] = "Right";
		CornerType[CornerType["TopLeft"] = 4] = "TopLeft";
		CornerType[CornerType["TopRight"] = 5] = "TopRight";
		CornerType[CornerType["BottomLeft"] = 6] = "BottomLeft";
		CornerType[CornerType["BottomRight"] = 7] = "BottomRight";
	})(CornerType || (CornerType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/corner/index.js
function _inherits$19(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$19(subClass, superClass);
}
function _set_prototype_of$19(o, p) {
	_set_prototype_of$19 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$19(o, p);
}
var CornerApi;
var init_corner = __esmMin((() => {
	init_base();
	init_interface$9();
	init_constant();
	CornerApi = /* @__PURE__ */ function(Base) {
		"use strict";
		_inherits$19(CornerApi, Base);
		function CornerApi() {
			return Base.apply(this, arguments) || this;
		}
		var _proto = CornerApi.prototype;
		_proto.toBatchParam = function toBatchParam(key) {
			var [borderColor, borderWidth, borderRadius] = key.split(":");
			return {
				borderColor,
				borderWidth: Number(borderWidth),
				borderRadius: Number(borderRadius)
			};
		};
		_proto.prepare = function prepare(context, params) {
			context.lineWidth = params.borderWidth || CornerApi.defaultStyle.borderWidth;
			context.strokeStyle = params.borderColor || CornerApi.defaultStyle.borderColor;
		};
		_proto.drawAppearance = function drawAppearance(context, config) {
			var { cornerType, borderRadius = CornerApi.defaultStyle.borderRadius } = config;
			var { x, y, height, width } = this.util.getBoundingRect(config);
			var pathHeight = height;
			this.util.clip.apply(context, config);
			context.beginPath();
			switch (cornerType) {
				case CornerType.Top:
					context.moveTo(x, y + pathHeight);
					context.lineTo(x, y + borderRadius);
					context.arcTo(x, y, x + borderRadius, y, borderRadius);
					context.lineTo(x + width - borderRadius, y);
					context.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
					context.lineTo(x + width, y + pathHeight);
					break;
				case CornerType.Bottom:
					context.moveTo(x, y);
					context.lineTo(x, y + pathHeight - borderRadius);
					context.arcTo(x, y + pathHeight, x + borderRadius, y + pathHeight, borderRadius);
					context.lineTo(x + width - borderRadius, y + pathHeight);
					context.arcTo(x + width, y + pathHeight, x + width, y + pathHeight - borderRadius, borderRadius);
					context.lineTo(x + width, y);
					break;
				case CornerType.Left:
					context.moveTo(x + width, y);
					context.lineTo(x + borderRadius, y);
					context.arcTo(x, y, x, y + borderRadius, borderRadius);
					context.lineTo(x, y + pathHeight - borderRadius);
					context.arcTo(x, y + pathHeight, x + borderRadius, y + pathHeight, borderRadius);
					context.lineTo(x + width, y + pathHeight);
					break;
				case CornerType.Right:
					context.moveTo(x, y);
					context.lineTo(x + width - borderRadius, y);
					context.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
					context.lineTo(x + width, y + pathHeight - borderRadius);
					context.arcTo(x + width, y + pathHeight, x + width - borderRadius, y + pathHeight, borderRadius);
					context.lineTo(x, y + pathHeight);
					break;
				case CornerType.TopLeft:
					context.moveTo(x, y + pathHeight);
					context.lineTo(x, y + borderRadius);
					context.arcTo(x, y, x + borderRadius, y, borderRadius);
					context.lineTo(x + width, y);
					context.lineTo(x + width, y + pathHeight);
					break;
				case CornerType.TopRight:
					context.moveTo(x, y + pathHeight);
					context.lineTo(x, y);
					context.lineTo(x + width - borderRadius, y);
					context.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
					context.lineTo(x + width, y + pathHeight);
					break;
				case CornerType.BottomLeft:
					context.moveTo(x, y);
					context.lineTo(x, y + pathHeight - borderRadius);
					context.arcTo(x, y + pathHeight, x + borderRadius, y + pathHeight, borderRadius);
					context.lineTo(x + width, y + pathHeight);
					context.lineTo(x + width, y);
					break;
				case CornerType.BottomRight:
					context.moveTo(x, y);
					context.lineTo(x, y + pathHeight);
					context.lineTo(x + width - borderRadius, y + pathHeight);
					context.arcTo(x + width, y + pathHeight, x + width, y + pathHeight - borderRadius, borderRadius);
					context.lineTo(x + width, y);
					break;
			}
			context.stroke();
			context.closePath();
			this.util.clip.release(context, config);
		};
		CornerApi.setDefaultStyle = function setDefaultStyle(config) {
			Object.assign(CornerApi.defaultStyle, config);
		};
		CornerApi.toBatchKey = function toBatchKey(config) {
			return [
				config.borderColor,
				config.borderWidth,
				config.borderRadius
			].join(":");
		};
		return CornerApi;
	}(Base);
	CornerApi.defaultStyle = {
		borderWidth: 1,
		borderRadius: 0,
		borderColor: "black"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/line/index.js
function _inherits$18(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$18(subClass, superClass);
}
function _set_prototype_of$18(o, p) {
	_set_prototype_of$18 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$18(o, p);
}
var LineApi;
var init_line = __esmMin((() => {
	init_base();
	init_constant();
	LineApi = /* @__PURE__ */ function(Base) {
		"use strict";
		_inherits$18(LineApi, Base);
		function LineApi() {
			return Base.apply(this, arguments) || this;
		}
		var _proto = LineApi.prototype;
		_proto.toBatchParam = function toBatchParam(key) {
			var [borderColor, borderWidth] = key.split(":");
			return {
				borderColor,
				borderWidth: Number(borderWidth)
			};
		};
		_proto.prepare = function prepare(context, params) {
			context.lineWidth = params.borderWidth || LineApi.defaultStyle.borderWidth;
			context.strokeStyle = params.borderColor || LineApi.defaultStyle.borderColor;
		};
		_proto.drawAppearance = function drawAppearance(context, config) {
			var { points } = config;
			if (!points.length || points.length % 2 !== 0) return;
			var { x, y } = this.util.getBoundingPosition(config);
			this.util.clip.apply(context, config);
			this.util.opacity.apply(context, config);
			context.beginPath();
			context.moveTo(points[0] + x, points[1] + y);
			var pointsIndex = 2;
			do {
				context.lineTo(points[pointsIndex] + x, points[pointsIndex + 1] + y);
				pointsIndex = pointsIndex + 2;
			} while (pointsIndex < points.length);
			context.stroke();
			context.closePath();
			this.util.opacity.release(context, config);
			this.util.clip.release(context, config);
		};
		LineApi.setDefaultStyle = function setDefaultStyle(config) {
			Object.assign(LineApi.defaultStyle, config);
		};
		LineApi.toBatchKey = function toBatchKey(config) {
			return [config.borderColor, config.borderWidth].join(":");
		};
		return LineApi;
	}(Base);
	LineApi.defaultStyle = {
		borderWidth: 1,
		borderColor: "black"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/polygon/index.js
function _inherits$17(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$17(subClass, superClass);
}
function _set_prototype_of$17(o, p) {
	_set_prototype_of$17 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$17(o, p);
}
var PolygonApi;
var init_polygon = __esmMin((() => {
	init_base();
	init_constant();
	PolygonApi = /* @__PURE__ */ function(Base) {
		"use strict";
		_inherits$17(PolygonApi, Base);
		function PolygonApi() {
			return Base.apply(this, arguments) || this;
		}
		var _proto = PolygonApi.prototype;
		_proto.toBatchParam = function toBatchParam(key) {
			var [background] = key.split(":");
			return { background };
		};
		_proto.prepare = function prepare(context, params) {
			if (params.background) context.fillStyle = params.background;
		};
		_proto.drawAppearance = function drawAppearance(context, config) {
			var { radius, background } = config;
			var { x, y } = this.util.getBoundingPosition(config);
			var hasClip = this.util.clip.apply(context, config);
			if (!hasClip) context.save();
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x + radius, y);
			context.lineTo(x, y + radius);
			context.closePath();
			if (background) context.fill();
			if (!hasClip) context.restore();
			else this.util.clip.release(context, config);
		};
		PolygonApi.setDefaultStyle = function setDefaultStyle(config) {
			Object.assign(PolygonApi.defaultStyle, config);
		};
		PolygonApi.toBatchKey = function toBatchKey(config) {
			return [config.background].join(":");
		};
		return PolygonApi;
	}(Base);
	PolygonApi.defaultStyle = { background: "red" };
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/rect/index.js
function _inherits$16(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$16(subClass, superClass);
}
function _set_prototype_of$16(o, p) {
	_set_prototype_of$16 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$16(o, p);
}
function hasBorder(config) {
	return config.borderWidth || config.borderColor && config.borderColor !== "transparent";
}
/**
* 把「百分比相对」渐变描述换算为以 rect 屏幕坐标为基准的 `CanvasGradient`。
*
* 仅支持线性渐变（`type='linear'`）。如后续要支持径向渐变，在此扩展 switch 即可，
* 调用方接口（`BackgroundGradient`）保持向后兼容。
*/ function buildCanvasGradient(context, gradient, x, y, width, height) {
	var x0 = x + width * gradient.start.x;
	var y0 = y + height * gradient.start.y;
	var x1 = x + width * gradient.end.x;
	var y1 = y + height * gradient.end.y;
	var canvasGradient = context.createLinearGradient(x0, y0, x1, y1);
	for (var [offset, color] of gradient.stops) canvasGradient.addColorStop(offset, color);
	return canvasGradient;
}
var gradientBatchSeq, GRADIENT_BATCH_PREFIX, RectApi;
var init_rect = __esmMin((() => {
	init_base();
	init_constant();
	gradientBatchSeq = 0;
	GRADIENT_BATCH_PREFIX = "__gradient__";
	RectApi = /* @__PURE__ */ function(Base) {
		"use strict";
		_inherits$16(RectApi, Base);
		function RectApi() {
			return Base.apply(this, arguments) || this;
		}
		var _proto = RectApi.prototype;
		_proto.toBatchParam = function toBatchParam(key) {
			if (key.startsWith(GRADIENT_BATCH_PREFIX)) return {};
			var [background, borderColor, borderWidth] = key.split(":");
			return {
				background,
				borderColor,
				borderWidth: Number(borderWidth)
			};
		};
		_proto.prepare = function prepare(context, params) {
			if (params.background) context.fillStyle = params.background;
			if (hasBorder(params)) {
				context.lineWidth = params.borderWidth || RectApi.defaultStyle.borderWidth;
				context.strokeStyle = params.borderColor || RectApi.defaultStyle.borderColor;
			}
		};
		_proto.drawAppearance = function drawAppearance(context, config) {
			var withBorder = hasBorder(config);
			var { borderRadius, background, backgroundGradient } = config;
			var { x, y, width, height } = this.util.getBoundingRect(config);
			this.util.clip.apply(context, config);
			this.util.opacity.apply(context, config);
			this.util.shadow.apply(context, config);
			this.util.borderDash.apply(context, config);
			var fillEnabled = !!background || !!backgroundGradient;
			if (backgroundGradient) context.fillStyle = buildCanvasGradient(context, backgroundGradient, x, y, width, height);
			if (borderRadius) {
				this.util.roundRect(context, x, y, width, height, borderRadius);
				if (fillEnabled) context.fill();
				if (withBorder) context.stroke();
				this.util.borderDash.release(context, config);
				this.util.shadow.release(context, config);
				this.util.opacity.release(context, config);
				this.util.clip.release(context, config);
				return;
			}
			if (fillEnabled) if (backgroundGradient) context.fillRect(x, y, width, height);
			else context.fillRect(x, y, width, height);
			if (withBorder) context.strokeRect(x, y, width, height);
			this.util.shadow.release(context, config);
			this.util.opacity.release(context, config);
			this.util.clip.release(context, config);
		};
		RectApi.setDefaultStyle = function setDefaultStyle(config) {
			Object.assign(RectApi.defaultStyle, config);
		};
		RectApi.toBatchKey = function toBatchKey(config) {
			if (config.backgroundGradient) {
				gradientBatchSeq += 1;
				return `${GRADIENT_BATCH_PREFIX}${gradientBatchSeq}`;
			}
			return [
				config.background,
				config.borderColor,
				config.borderWidth
			].join(":");
		};
		return RectApi;
	}(Base);
	RectApi.defaultStyle = {
		borderWidth: 1,
		borderColor: "black"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/index.js
function _inherits$15(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$15(subClass, superClass);
}
function _set_prototype_of$15(o, p) {
	_set_prototype_of$15 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$15(o, p);
}
function hasUnderLine(textDecoration) {
	return textDecoration === null || textDecoration === void 0 ? void 0 : textDecoration.includes("underline");
}
function hasLineThrough(textDecoration) {
	return textDecoration === null || textDecoration === void 0 ? void 0 : textDecoration.includes("line-through");
}
var TextApi;
var init_text = __esmMin((() => {
	init_base();
	init_constant();
	TextApi = /* @__PURE__ */ function(Base) {
		"use strict";
		_inherits$15(TextApi, Base);
		function TextApi() {
			return Base.apply(this, arguments) || this;
		}
		var _proto = TextApi.prototype;
		_proto.toBatchParam = function toBatchParam(key) {
			var [fontSize, fontStyle, color, textDecoration] = key.split(":");
			return {
				fontSize: Number(fontSize),
				fontStyle,
				color,
				textDecoration
			};
		};
		_proto.prepare = function prepare(context, params) {
			var textColor = params.color || TextApi.defaultStyle.color;
			var textStyle = params.fontStyle || TextApi.defaultStyle.fontStyle;
			var textFontSize = params.fontSize || TextApi.defaultStyle.fontSize;
			context.fillStyle = textColor;
			context.font = `${textStyle} ${textFontSize}px ${TextApi.defaultStyle.fontFamily}`;
			if (hasUnderLine(params.textDecoration) || hasLineThrough(params.textDecoration)) {
				context.lineWidth = 1;
				context.strokeStyle = textColor;
			}
		};
		_proto.drawAppearance = function drawAppearance(context, config) {
			if (!config.layouts) return;
			var { textDecoration, layouts } = config;
			var { x, y } = this.util.getBoundingRect(config);
			var fontSize = config.fontSize || TextApi.defaultStyle.fontSize;
			var baseLineTranslateY = Math.round(fontSize / 2);
			this.util.clip.apply(context, config);
			this.util.opacity.apply(context, config);
			for (var layout of layouts) {
				var textX = x + layout.x;
				var textY = y + layout.y + baseLineTranslateY;
				context.fillText(layout.text, textX, textY);
				var underline = hasUnderLine(textDecoration);
				var lineThrough = hasLineThrough(textDecoration);
				if (!underline && !lineThrough) continue;
				context.beginPath();
				if (underline) {
					context.moveTo(textX, textY + baseLineTranslateY);
					context.lineTo(textX + layout.width, textY + baseLineTranslateY);
				}
				if (lineThrough) {
					context.moveTo(textX, textY);
					context.lineTo(textX + layout.width, textY);
				}
				context.closePath();
				context.stroke();
			}
			this.util.opacity.release(context, config);
			this.util.clip.release(context, config);
		};
		TextApi.setDefaultStyle = function setDefaultStyle(config) {
			Object.assign(TextApi.defaultStyle, config);
		};
		TextApi.toBatchKey = function toBatchKey(config) {
			return [
				config.fontSize,
				config.fontStyle,
				config.color,
				config.textDecoration
			].join(":");
		};
		return TextApi;
	}(Base);
	TextApi.defaultStyle = {
		color: "#000",
		fontSize: 13,
		lineHeight: 1.5,
		fontStyle: "normal",
		fontFamily: "sans-serif"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/bitmap/interface.js
var init_interface$8 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/line/interface.js
var init_interface$7 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/polygon/interface.js
var init_interface$6 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/rect/interface.js
var init_interface$5 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/interface.js
var init_interface$4 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/unitool/dist/unitool.esm.js
function e(e, t) {
	var r = t || 0, n = e.charCodeAt(r);
	if (55296 <= n && n <= 56319) {
		var i = n;
		return 56320 <= (a = e.charCodeAt(r + 1)) && a <= 57343 ? 1024 * (i - 55296) + (a - 56320) + 65536 : i;
	}
	if (56320 <= n && n <= 57343) {
		var a = n;
		return 55296 <= (i = e.charCodeAt(r - 1)) && i <= 56319 ? 1024 * (i - 55296) + (a - 56320) + 65536 : a;
	}
	return n;
}
function t(e) {
	for (var t = [], r = 0, n = e.length; r < n;) {
		var i = e.charCodeAt(r);
		if (r += 1, i >= 55296 && i <= 56319 && r < n) {
			var a = e.charCodeAt(r);
			r += 1, 56320 == (64512 & a) ? t.push(((1023 & i) << 10) + (1023 & a) + 65536) : (t.push(i), r -= 1);
		} else t.push(i);
	}
	return t;
}
function r() {
	for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
	if (String.fromCodePoint) return String.fromCodePoint.apply(String, e);
	var r = e.length;
	if (!r) return "";
	for (var n = [], i = 0, a = ""; i < r;) {
		var o = e[i];
		o <= 65535 ? n.push(o) : (o -= 65536, n.push(55296 + (o >> 10), o % 1024 + 56320)), (i + 1 === r || n.length > 26434) && (a += String.fromCharCode.apply(String, n), n.length = 0), i += 1;
	}
	return a;
}
function n(e) {
	return 55296 <= e && e <= 56319;
}
function i(e) {
	return 56320 <= e && e <= 57343;
}
function u() {
	var e = null === navigator || void 0 === navigator ? void 0 : navigator.userAgent;
	return /msie/i.test(e) && !function() {
		var e = null === navigator || void 0 === navigator ? void 0 : navigator.userAgent;
		return /opera/i.test(e);
	}() || /trident/i.test(e);
}
function f() {
	this.table = new Uint16Array(16), this.trans = new Uint16Array(288);
}
function d(e, t) {
	this.source = e, this.sourceIndex = 0, this.tag = 0, this.bitcount = 0, this.dest = t, this.destLen = 0, this.ltree = new f(), this.dtree = new f();
}
function A(e, t, r, n) {
	var i, a;
	for (i = 0; i < r; ++i) e[i] = 0;
	for (i = 0; i < 30 - r; ++i) e[i + r] = i / r | 0;
	for (a = n, i = 0; i < 30; ++i) t[i] = a, a += 1 << e[i];
}
function P(e, t, r, n) {
	var i, a;
	for (i = 0; i < 16; ++i) e.table[i] = 0;
	for (i = 0; i < n; ++i) e.table[t[r + i]]++;
	for (e.table[0] = 0, a = 0, i = 0; i < 16; ++i) y[i] = a, a += e.table[i];
	for (i = 0; i < n; ++i) t[r + i] && (e.trans[y[t[r + i]]++] = i);
}
function m(e) {
	e.bitcount-- || (e.tag = e.source[e.sourceIndex++], e.bitcount = 7);
	var t = 1 & e.tag;
	return e.tag >>>= 1, t;
}
function b(e, t, r) {
	if (!t) return r;
	for (; e.bitcount < 24;) e.tag |= e.source[e.sourceIndex++] << e.bitcount, e.bitcount += 8;
	var n = e.tag & 65535 >>> 16 - t;
	return e.tag >>>= t, e.bitcount -= t, n + r;
}
function L(e, t) {
	for (; e.bitcount < 24;) e.tag |= e.source[e.sourceIndex++] << e.bitcount, e.bitcount += 8;
	var r = 0, n = 0, i = 0, a = e.tag;
	do
		n = 2 * n + (1 & a), a >>>= 1, ++i, r += t.table[i], n -= t.table[i];
	while (n >= 0);
	return e.tag = a, e.bitcount -= i, t.trans[r + n];
}
function N(e, t, r) {
	var n, i, a, o, u, f;
	for (n = b(e, 5, 257), i = b(e, 5, 1), a = b(e, 4, 4), o = 0; o < 19; ++o) x[o] = 0;
	for (o = 0; o < a; ++o) {
		var d = b(e, 3, 0);
		x[C[o]] = d;
	}
	for (P(g, x, 0, 19), u = 0; u < n + i;) {
		var s = L(e, g);
		switch (s) {
			case 16:
				var c = x[u - 1];
				for (f = b(e, 2, 3); f; --f) x[u++] = c;
				break;
			case 17:
				for (f = b(e, 3, 3); f; --f) x[u++] = 0;
				break;
			case 18:
				for (f = b(e, 7, 11); f; --f) x[u++] = 0;
				break;
			default: x[u++] = s;
		}
	}
	P(t, x, 0, n), P(r, x, n, i);
}
function O(e, t, r) {
	for (;;) {
		var n, i, a, o, u = L(e, t);
		if (256 === u) return 0;
		if (u < 256) e.dest[e.destLen++] = u;
		else for (n = b(e, h[u -= 257], l[u]), i = L(e, r), o = a = e.destLen - b(e, v[i], p[i]); o < a + n; ++o) e.dest[e.destLen++] = e.dest[o];
	}
}
function I(e) {
	for (var t, r; e.bitcount > 8;) e.sourceIndex--, e.bitcount -= 8;
	if ((t = 256 * (t = e.source[e.sourceIndex + 1]) + e.source[e.sourceIndex]) !== (65535 & ~(256 * e.source[e.sourceIndex + 3] + e.source[e.sourceIndex + 2]))) return -3;
	for (e.sourceIndex += 4, r = t; r; --r) e.dest[e.destLen++] = e.source[e.sourceIndex++];
	return e.bitcount = 0, 0;
}
function re(e) {
	return 0 != (K.get(e) & D);
}
function Ae(e, t, r) {
	var n = t[0], i = r[0];
	if (n === ue && i === oe) return !1;
	if (n === ae || n === ue || n === oe) return !0;
	if (i === ae || i === ue || i === oe) return !0;
	if (n === ce && (i === ce || i === he || i === pe || i === Ce)) return !1;
	if (!(n !== pe && n !== he || i !== he && i !== le)) return !1;
	if ((n === Ce || n === le) && i === le) return !1;
	if (i === fe || i === ve) return !1;
	if (i === se) return !1;
	if (n === de) return !1;
	if (n === ve && r[1]) {
		for (var a = 0, o = !1, u = e.length - 1; u >= 0; u--) {
			if ((d = e[u])[0] !== fe) {
				o = d[1];
				break;
			}
			a += 1;
		}
		return !(a >= 0 && o);
	}
	if (i === ge && n === ge) {
		var f = 0;
		for (u = e.length - 1; u >= 0; u--) {
			var d;
			if ((d = e[u])[0] !== ge) break;
			f += 1;
		}
		return f % 2 != 0;
	}
	return !0;
}
function ye(t, r) {
	if (void 0 === r && (r = 0), r < 0) return 0;
	if (r >= t.length - 1) return t.length;
	for (var n = [], i = e(t, r), a = xe.get(i), o = re(i), u = r + 1; u < t.length; u++) if (!(t.charCodeAt(u - 1) <= 56319 && t.charCodeAt(u - 1) >= 55296 && t.charCodeAt(u) <= 57343 && t.charCodeAt(u) >= 56320)) {
		var f = e(t, u), d = xe.get(f), s = re(f);
		if (Ae(n, [a, o], [d, s])) return u;
		n.push([a, o]), a = d, o = s;
	}
	return t.length;
}
function $t(e, t) {
	for (var r = e; r >= 0;) {
		var n = t[r];
		if (n !== dt) return n;
		r -= 1;
	}
	return -1;
}
function er(e, t, r, n) {
	var i = n[r];
	if (Array.isArray(e) ? -1 !== e.indexOf(i) : e === i) for (var a = r; a <= n.length;) {
		if ((f = n[a += 1]) === t) return !0;
		if (f !== dt) break;
	}
	if (i === dt) for (a = r; a > 0;) {
		var o = n[a -= 1];
		if (Array.isArray(e) ? -1 !== e.indexOf(o) : e === o) for (var u = r; u <= n.length;) {
			var f;
			if ((f = n[u += 1]) === t) return !0;
			if (f !== dt) break;
		}
		if (o !== dt) break;
	}
	return !1;
}
function ur(e, t) {
	void 0 === t && (t = tr.Strict);
	var r = [], n = [], i = [];
	return e.forEach((function(e, a) {
		var o = or.get(e), u = Ue(e);
		if (i.push(ar.includes(u)), -1 !== [
			tr.Normal,
			tr.Auto,
			tr.Loose
		].indexOf(t) && -1 !== [
			8208,
			8211,
			12316,
			12448
		].indexOf(e)) return n.push(a), r.push(Mt);
		if (o === ct) {
			if (8220 === e) return n.push(a), r.push(pt);
			if (8221 === e) return n.push(a), r.push(Pt);
		}
		if (o === it || o === zt) {
			if (0 === a) return o === zt ? (n.push(a), r.push(zt)) : (n.push(a), r.push(ht));
			var f = function(e, t) {
				var r = e;
				for (; r >= 0;) {
					var n = t[r];
					if (n !== zt && n !== it) return n;
					r -= 1;
				}
				return -1;
			}(a - 1, r);
			return -1 === f ? (n.push(a), r.push(ht)) : -1 === _t.indexOf(f) ? (n.push(n[a - 1]), r.push(f)) : (n.push(a), r.push(ht));
		}
		return n.push(a), o === Ut ? t === tr.Strict ? r.push(kt) : r.push(jt) : o === It || o === Lt ? r.push(ht) : o === nt ? e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141 ? r.push(jt) : r.push(ht) : void r.push(o);
	})), [
		n,
		r,
		i
	];
}
function fr(e, t, r, n, i, a) {
	if (void 0 === i && (i = null), void 0 === a && (a = null), 0 === r[n]) return Jt.NotAllowed;
	var o = n - 1;
	if (Array.isArray(i) && !0 === i[o]) return Jt.NotAllowed;
	var u, f = o + 1, d = t[o], s = t[f];
	return ir.some((function(e) {
		return void 0 !== (u = e({
			index: o,
			types: t,
			indicies: r,
			current: d,
			next: s
		}));
	})), void 0 !== u ? u : Array.isArray(a) && -1 !== a.indexOf(d) ? Jt.NotAllowed : Jt.Allowed;
}
var o, s, c, h, l, v, p, C, g, x, y, S, w, T, k, W, z, H, E, j, R, U, V, B, J, M, D, K, ie, ae, oe, ue, fe, de, se, ce, he, le, ve, pe, Ce, ge, xe, Le, Ne, Oe, Ie, Se, we, Te, ke, We, Ee, Ue, $e, et, rt, nt, it, at, ot, ut, ft, dt, st, ct, ht, lt, vt, pt, Ct, gt, xt, At, yt, Pt, mt, bt, Lt, Nt, Ot, It, St, wt, Tt, kt, Wt, zt, Ht, Et, Xt, jt, Rt, Ut, Vt, Bt, Jt, Mt, Zt, Ft, qt, Yt, Gt, Dt, Kt, Qt, _t, tr, rr, nr, ir, ar, or;
var init_unitool_esm = __esmMin((() => {
	init_dist();
	o = Object.freeze({
		__proto__: null,
		isEmojiShift: 0,
		isEmojiPresentationShift: 1,
		isEmojiModifierShift: 2,
		isEmojiModifierBaseShift: 3,
		isEmojiComponentShift: 4,
		isExtPictographicShift: 5,
		default: {
			isEmojiShift: 0,
			isEmojiPresentationShift: 1,
			isEmojiModifierShift: 2,
			isEmojiModifierBaseShift: 3,
			isEmojiComponentShift: 4,
			isExtPictographicShift: 5
		}
	});
	s = new f(), c = new f(), h = new Uint8Array(30), l = new Uint16Array(30), v = new Uint8Array(30), p = new Uint16Array(30), C = new Uint8Array([
		16,
		17,
		18,
		0,
		8,
		7,
		9,
		6,
		10,
		5,
		11,
		4,
		12,
		3,
		13,
		2,
		14,
		1,
		15
	]), g = new f(), x = new Uint8Array(320);
	y = new Uint16Array(16);
	(function(e, t) {
		var r;
		for (r = 0; r < 7; ++r) e.table[r] = 0;
		for (e.table[7] = 24, e.table[8] = 152, e.table[9] = 112, r = 0; r < 24; ++r) e.trans[r] = 256 + r;
		for (r = 0; r < 144; ++r) e.trans[24 + r] = r;
		for (r = 0; r < 8; ++r) e.trans[168 + r] = 280 + r;
		for (r = 0; r < 112; ++r) e.trans[176 + r] = 144 + r;
		for (r = 0; r < 5; ++r) t.table[r] = 0;
		for (t.table[5] = 32, r = 0; r < 32; ++r) t.trans[r] = r;
	})(s, c), A(h, l, 4, 3), A(v, p, 2, 1), h[28] = 0, l[28] = 258;
	k = function(e, t) {
		var r, n, i = new d(e, t);
		do {
			switch (r = m(i), b(i, 2, 0)) {
				case 0:
					n = I(i);
					break;
				case 1:
					n = O(i, s, c);
					break;
				case 2:
					N(i, i.ltree, i.dtree), n = O(i, i.ltree, i.dtree);
					break;
				default: n = -3;
			}
			if (0 !== n) throw new Error("Data error");
		} while (!r);
		return i.destLen < i.dest.length ? "function" == typeof i.dest.slice ? i.dest.slice(0, i.destLen) : i.dest.subarray(0, i.destLen) : i.dest;
	}, W = function() {
		function e(e) {
			var t = e, r = "function" == typeof t.readUInt32BE && "function" == typeof t.slice;
			if (r || t instanceof Uint8Array) {
				var n = void 0;
				if (r) this.highStart = t.readUInt32BE(0), this.errorValue = t.readUInt32BE(4), n = t.readUInt32BE(8), t = t.slice(12);
				else {
					var i = new DataView(t.buffer);
					this.highStart = i.getUint32(0), this.errorValue = i.getUint32(4), n = i.getUint32(8), t = t.subarray(12);
				}
				var a = k(t, new Uint8Array(n));
				if ((a = k(a, new Uint8Array(n))).length !== n) throw new Error("Data unzip failed.!!!");
				this.data = new Uint32Array(a.buffer);
			} else this.data = t.data, this.highStart = t.highStart, this.errorValue = t.errorValue;
		}
		return e.prototype.get = function(e) {
			if (e < 0 || e > 1114111) return this.errorValue;
			if (e < 55296 || e > 56319 && e <= 65535) {
				var t = (this.data[e >> 5] << 2) + (31 & e);
				return this.data[t];
			}
			if (e <= 65535) {
				t = (this.data[2048 + (e - 55296 >> 5)] << 2) + (31 & e);
				return this.data[t];
			}
			if (e < this.highStart) {
				t = this.data[2080 + (e >> 11)];
				return t = ((t = this.data[t + (e >> 5 & 63)]) << 2) + (31 & e), this.data[t];
			}
			return this.data[this.data.length - 4];
		}, e;
	}(), z = function() {
		function e(e) {
			this.init = e;
		}
		return e.prototype.getValue = function() {
			return void 0 === this.value && (this.value = this.init()), this.value;
		}, e.prototype.doIdly = function(e) {
			this.init = e(this.init);
		}, e;
	}(), H = "function" == typeof Proxy && ("undefined" != typeof window ? (w = null === navigator || void 0 === navigator ? void 0 : navigator.userAgent, /chrome/i.test(w) ? ((S = (null === navigator || void 0 === navigator ? void 0 : navigator.userAgent).match(/Chrom(e|ium)\/([0-9]+)\./)) ? parseInt(S[2], 10) : 0) >= 53 : !u()) : "undefined" != typeof globalThis);
	(function(e) {
		e[e.CommonProps = 0] = "CommonProps", e[e.Emoji = 1] = "Emoji", e[e.GraphemeBreak = 2] = "GraphemeBreak", e[e.LineBreak = 3] = "LineBreak";
	})(T || (T = {}));
	E = new (function() {
		function e() {
			this.idleValues = [];
		}
		return e.prototype.bindIdleWrapper = function(e) {
			this.wrapper = e;
			for (var t = this.idleValues; t.length > 0;) t.pop()?.doIdly(e);
		}, e.prototype.createTrie = function(e) {
			var t = this;
			if (!H) return new W(this.readData(e));
			var r = this.createIdleValue((function() {
				return new W(t.readData(e));
			}));
			return new Proxy(Object.create(null), {
				get: function(e, t) {
					if (t in e) return e[t];
					if ("constructor" === t) return W;
					if ("prototype" === t) return W.prototype;
					var n = r.getValue(), i = n[t];
					return "function" != typeof i || (i = i.bind(n), e[t] = i), i;
				},
				set: function(e, t, n) {
					return e[t] = n, r.getValue()[t] = n, !0;
				},
				defineProperty: function(e, t, n) {
					var i = r.getValue();
					return Object.defineProperty(i, t, n), !0;
				},
				getPrototypeOf: function() {
					return W.prototype;
				}
			});
		}, e.prototype.createIdleValue = function(e) {
			var t = new z(e);
			return this.wrapper ? t.doIdly(this.wrapper) : this.idleValues.push(t), t;
		}, e.prototype.readData = function(e) {
			switch (e) {
				case T.CommonProps: return Buffer("ABEAAAAAAAAAAYzQXXl3ONvt9//Tp8NTiqKtzYOq0araSki1RrVFae1VPGqPVM0QXQRFWnurVWrF3qS10hqxBUGQEkRihASR+Pb5fD6/ttfvv/t9Xe/r3Pc553Ve53WfmzjHUnfZP2xhez3Qf6jdDxzJuxJjDA5a7Xlhdy4a1xrcNN+UIRj3VM+8Vulkmt3Jme0oTscajZPfGgRsRl5HltdYiyVUWJJ8b8QUa7zCALQf3OI9c+lcyCqYKTkZuvCOteQ93WwC4X3c2mI3Zzs3kXYA0jwqY+yFm/sH7rVrhGEzTZP8fIVQSPslrv1zld0TUzACSKwjWh0kC3lxJ+gUdJvliPkgK78cORIkYhebuhi4FXLEfyTE+CM8irpI3z9/vVvI5pURDrFUuy9Q2akZeta+y2BfmW0BbPEFtqWa061wd/liURRrkFDDknbWK/NFxWsO6gELQ7wIXas7gtwLtze+iO8rVr5gO4leLNs/490V6MveAYNuSUIic8VsHyZxKi/xePZEB920i1ZZMAi6Oh9NXRJoExbujJh6DcM92uff6JmYsq9CQjTW4vY/TiESd+2O/ijbP/tj46Wge6ZJf65UnZbtvL8l3/YnPCWLtDjYGfCe9HlTi4u2ybFG2zoReipcZKMXCdJ/oBmN6D0+X9kLsYHxbxvMRrf6AtWCeIwW3I4E1vLzS3Ra23lHDfZZBWBcIGYIE7wnPYhl/mU47DgK2Mn0ljKTodlHiZhyaoj+EYtFlimobF6EckfE5tLfQp9FAK9yF3O3ZL+mXHAWjO8M/QY5+iZd2Xaawl3NanptUSaIaf51Lei6Zixs0dEmpn87OJSjf5/Z+3NF00mmbZhFj9GWwo8z+APmq7T+DWNQ1otEkLRdxJg2g3P+DXE/rM16uJDIh+qBbsvZxN4HNbvi/JqY0Qv9+2reX4ALf3RAmbadAJHhnbLvs8+uDHTJie3Ei2r04pow1UnBUoZflNsgvUKb6YU+nYgu9aqTfO4J7EsF+ywbWlypi8xa0JeE4YxqeKPyWuMbRGrDHKmXvrrgAHgpsX0BEh3+pVZy4Fn7YEDuyT7PoYJXqQvLQeJ2UJUYYuNSdhB3ALNLtJp3eCz5Mr6VIrE4dGVYT+xlsOA2YW3Jknaz+/mnr7TCu8d85kvuG0is/l6Hmra9Ssyu2RH9L6cOTP0xzMmuYBM53JsnpYp+vR/tcawPSFwIgoh74dESCM2a0aQ4F5unxZ45y3Lx+FWpTILfCAuXRRcuPqtRiKVyT/Xg6+GpQ69JfH1Jy+Sagd6kzLC1ZW7gEvABB6sLDratFarYjfTdDqG5QFMT7OKHWMwX+UKD2+m17y658TdWcAP5xdq5gZ/Zt2/kfHb4Ef+bJK6qE+SSJyckFh+3XXJZGgxSn4+zDRLWfAFbkN0ybzqV2+sScRyPyCbQD2Y49ARA3Rw4f5mhVnSBEpp+M8xkxu9bCz1KLH5LHCuLFaekNqm0wYibrfHAy0QgwAXYkft3GN+9aYZGvVQ/JbZO+OlJZ2xiY2OuxHp71K7q0RUIC7x3rVI5dQobLzj8sCtYVTg8HnFN4viIPH4G8zEuZofNJh5ctSZJAUmRPo9NNegbX7/FYuSEeUpxWHC4JmAghOrh3j4fj+2knbV5af0+G58jyI0zU7wXe7JPbR6YX41iaLhZF5aJJqcjxjDiWRFlTw/7BURlFTBzwNfEt74s8jZAlwXRWdF5D8C7mnZfFETWwdteFT0YeGQEA0yje7a7/Cj+Dt6IjlnrlS5n8AN7KSqM9sNd1aWob0HSi/gnRe+yHqlcxoaPbh4nUM5WIvq3D2raj3ueobFLVqEXsZ+9mrioS+B9rWZEu3ACledf5qju1fH8/LTtD4mFy9WUlZtBSnawse2nbYLhL6gLnj9I4POBHd7jTtOZjKaBAsbF72Fs/6aQ15572VuEziSQtK7xmfKj9rr2T4/OwlOqOJCedf2C90NEDb98CpJBdVt3h1WOzYOVZwKi26iJkD+Ev/zLKT67aY1Qo+AkGv8OpXPLDae2c8z2H0ojdbcH/QHd4jo6d8yOuJ0B3v6XmtpWS7zBsg605X2ZtjMuC4Hbym2EEgYjMCFQGXURqfkg5ASfkLOBwQ7w5VAUzjyB1PMfgjzubeze3kyYx4+lrGnFa3xXY0jSjBZTT+wJWM5DSySdWOyiuHHOFrMX7LChRmS1Ng6fHkz1ndLi6jDlH1UOEqFou6Kf6795ljuvaJna2rsbTEFEOYeKf5hn5cADSqxVxDcxThmYv9k8Y5D0O6hlMkEPnbcJ3X6jGFk8BTnzaTAmoeuaMu50JrI2XmKY9G3fy5wGx3iqcyHeNuojsT0UVPgyitePho9bC0WuHQ1SXKroR5660kbTcyenyAJpx+KZrde7XHyXTyGJoR8n+ycyic8RdxG3Q056X6I1Js6Lz27KraBWvK1XhqRztyTJisFDomBFqvlUlJPvNYg+476+/UtzHOuU7/NGlKwyxn/+jcsUpLaEHDAa6MTN4PoPxW/7jQru39CMfKv3XEpTanRo6Z5N2PMdtOljGi9hbyhvu5fYW9A+Jz35nW0UvPX51OTq+bAfmT65u8fS97RBsk9NIAKPa5KhVKd6n4UfM/e1PbtPBR3yNQx9Rsw5Ahnhuc+Rl2hYMbrImmUQwpVqdPf4grXLxWVgIoMbxhgI39z5JhNwyDt6tYcyUUjroewVqnivHQfKY88HN76HMFEXXspQ0garK+/6ky4FoxhdG8DqIurBhtIoY8yxHDWbHKxuqu+Cb8VhByjkFaJyY8yu9uij7gaAefO8X0/ZSisCUYaiMrx99Ddy1U/nYvhTkUVEInmEQPxQrnzr4PIDjIvrsWsf2uOhcNrOQRZwGcffkxuDnylEyp1tPYnCIcPjhkAXUsUBx1c/LihhNa6EfVY62L8w4HDhDA5huKQ5n0EN7PILJX0sBMqmXCaTH0TrmRkbpwy0Uq5anMe8FZ1bETByTnbn4/3n/R2h0yWS+ac+tetEZwe21ShyUGz6HDUx1V33YOZ10VU0+wt02Sth68WXHzP8KluDG/A9AYN95jeBzBiWe9m7f3rMPS56meFPelw266hrmmEZtZNR4jFhlHkQQO9nqwn7A0qscUZ9TSg+nXuk1Sd3HYtjueRl0OOsdY8bQKH3ffOaolPR8N0kW07MfQ/a648sHBjewtzTsB3IHndoXyCedxZ5+7NAC4EbYIRgQA2Y0sOD1gMfsEjh5u12SnCmKHi8fXoJLl5NEy7/sQUZtH59Zftq4eE8huThUKXYQegGZzl47NgY0vdtzSEenO1AOB6vFWsVrrh3lloMNRGd9jbWcV/5tJQm/Z4MbmwEm9heMF/XmGcElN5ulD3WZDIu49kuu+0nR+YTOrhiG5UhXEj8YnvF80jw/eEEaOdCbmiz4UQ9fEPs4mEDkz3hzBA/qxCTobsdNyvKIxAbH5kMr5A77nlv2SvICrKdQvblZxfV1zxb3x25LJjMq4VcZsxmyP3lgSzDzm/vx4GkTEoT1+8UMpysnu8takwqe3Ov3fA2ylJOaEhic3G7N5oxunLwufDsZMez7He7+73pbNYqayBYTsaIA5gza3VrYGyx/ktmimoPH1LZrU1J6+jU8+I8SWvb2eBiIvm6RCp1aSJnYlITDFZZs5t9c7GQwX2gyqpezQ+OyKx6Na70RNN6sO6B5Wi2I2atf1aZEKlTqnkzLyzV66S2+MSq03zcY5O3CTU3fGxZKAGDvSGnZ8LiTKbfZlZy+PPnY2um4BJ9bYi3VmYEm64Ch3T0n4pTkyO6yWFewUT/27j5upoxF40Aimex9KffQbcmoNqdxtcfDV98zuHB5Wswg25E1hOyMpO8/XYGa9RtlzcYZ1TDd3h6nKBEaZxgJK+p0H3T2rj2/oCMU5MFfSEWn9AUQ6mh9vaJghx792wVnYFWTPgOGuNa98n53GdcvZRVIR8A8k7r0s3vxi9iRO895Nt9r1qpZa+u00eOrIis0bbPrDNNQZskGrY6fbEIGQ63zzHvMLop8XxF/prCTKzXhoU9lItYjx9YHfLCRd2TZuDfSRLjna9DqKocFvAvJPRjuJcLtrqz/Z8YcE5FvxbVtMOJUPiPzDiX6CHCzXKj8TIJFBJnXVNzjYhGk7TUrSNyWl7HDgGMJsNCSrvIivJfRaEA5ofG2mfHF9tFh0S6Kt8mKI/4tDgriNmyr7zBMj50rqshl7f4xwb7ReHiciEV9SKDlvP2tqTNoavfW+w8RhV6czoe3WvJ0D1j+f2d3gnpGEmtUqBPyEN9lc2uWtWorqk/4ie0eWuvoYer54LNVtGTnDR/I5IvnjbBwmWGnkvFNtT75NhfRYhX49FAxvxRvb+FLekq9wUIjjXqcQT57bmaryKwPx9fMH713Pu75gB9FWheYjL/w8reQ9IzY4KO29XVJvvp+mZfCLEtpXsVp+FjbKeGeIbp0g6MnYOczcmuOP7dSbqT2n7i22c0O/L4XaWVouhg9yT2pf/62UJjFuDCo1Ee+mT5kOdITHZtG7xZCGG3WDeXu6mC+uEmnwv3L+isjw8cMtU/J//BhtOahbookYNvOiqutor0On+0C+mnruhJETxbyW19B3u4ZGGd41DrV9UNxLC2iUbsOxTCHPOMn0NsYiFU7PW1Z18L/riokzQ8ne1d+eRinT1ZzqfILk/BPhvkn07buxWgcUzXirPCuhWoF7ekQQsmCtR9MsH27MEAwho9BrIBGfJflbXe5IX5QfxRsr98fYmrwriNGiYGZFiilekTScphjWuNg21ezu/xQ7Ef6FqsJlh4OZdXDvxH3DzsbAP4Iz0QExVczyDLIQznWSela6hgNz/I+5/QXXVzSlsdLq5wriavv5x1zh/nZUG97pnx0Y8Vouy3IOdoc8qHubgQmmeYr/jcEd6w5eDM6J1C7J1IIviurXNrWCa+tutA+ydK8u5YX7Xo0ZoBvOgKOk9dtGzNtVporhYdq7HE7AV95TDPfIZ5nfRWnu0mWzDgabZSDY/tpFxXQSzT5l2pWf1fUVuQS1ndTMwquYH+h7fS6xsvzcuOAB9gqvuE2RuawZYV05+Vdqr9+v1JSn2QTjKjdCkENFoVivBdbyIcgoRTMex892W76mWaXRE9lS7lyXv8Po3sc4bwGez9OhFR53anAYtj5/8l/nFypV+gfUbRFSnYhytFnZaRFcUwJam47V+b+N7qV8ztjsxOX5EK4mecyu1M9f384OY88ZGhrPwY86XCOvHxk+kcZk8fk4a9p+Gu0HdyyLCKu7ZsxE3n5cYWDPIsgFTht7QBjv9SECZMCdGWBbJReADw4nkCCm/hQ2cQpo6o3jXekHBFC8TaCOc5bjhgtsZTGMdXvTsBL+YDaP5K2gfPab3x6hYYf6WTTHQrqyzEK3jvYkTeLmy6eLN2shfw+bDehoi+FvLUTTptsZD0jrwXqywXY3JlArxDejKXOG5o4cKctpiMT9409Zk6LKAASQesY6SmocQJCeppjyAU23vSPxk/a+INipnqWJb+9LSpq+stPX7B8ocr7ywN40fwpm+7VWrujzl4ATJUOJI3lMeLH1jytFe4m+mE3Za2WG0WUNwpjshPEuSv96RJet5+E8IYWdj/0EbgbYB2hqdegRrOBfEol4W7ZHcWGPxYpmgV3JnTaiZM0yKdF75OcD39S8YNc//qm8UZtu0u52rblNVKejA4VuJubu0307Gvf78V2JG8pcMhvl+hvJc57mOC0Kdf+X1BPdbwiQClZ3nMTld+b6gQJMhfZi07Zsbp/USr6RHSSH1PKl9i1OdhEBqE+vKmNwiliQWZ1RQgroCj+Ux7ky+0ht8ZfbY2tCmMsJm0tQ/CaRb1+enuZTHwOPfKlRnZTJNJCcizSSPf2hvH/f/ByQfXATE2w1OCbzlZ+yTcbHDb0Y9fk9/8JLya/l1NqIrq5hVxBzU/fv7K4GwPO7zcE4LdsRq6+ZNB8/f6J3c/qSjMzErsprBXjlmjDASAImlcRL/Yx5keZ38mZZytCctTrYmTYRoOg93M0z9m2DGoyTnfcX3+ZnQ2wkRZxOH3UD/L3TUhqMhyIyDqSHj+/FQHLdRf1f5X5B42Cny4xIq2giLLkg+jhw2NvrO+RKNCNURk3AR2ggqPhOdeOK81maoUfW9GDPmF5+IZOeZP/gvBLWKrvIy39RWvL+etOLv8z5VDpa5JHzyDSYeJl13s/EskubWC6sJt6gHRMJksriFP+kzXTgpazR/C/w1R6UFpWXb99kfF9V/l9cE1KffcnN70KNtRJbcXUV3lyHEUUfCM+ukG9JaICMI7fbO2PuAN+rp5R37dRojmBUKrcetACAlQy1qWHTOSiBbMDHysChz7sJjnJTgmUbkoYpX+BT8nVGMHuIJoICltBNsEzbGECGGhHkSARqGdTekKD+WsLrUavkGIHzyyOy++TjVjy4is7g/WiA+RidiqxL+xbydtb+8CZXCBM1v3kcDjqoOI5HZR7aM9MHI5B27p0qraYCvvSmeEzBNGw+dfr+uph88d2uFF1veJD5mGvUw5HhPAbZ7u7DTqH6XPTlyvtTu46IFpt7cruIuZa8OA0Fbh7eMdITFJAbYv+kN2iETBVzYBxrFeX5KFnxoXkiivSjTJJqE7tMIBn+VyC6ySh46haUbwDvOH7acc4rWxGppQDcRpHRVC8SdcqD3j1t5FD48t9OJ8GrtpSsPEX8tMClbl7Xbq1CESersBKbfcYkcCNLetuCPJEEhSydkVrERVo6kUvBUeHQadTC22orV7TaP7E6AzfBMFQytWvOpKmyqXDtcDafDd2H66nU7ioR8MPPIaADQoRTRNGvagaECAMglJ9VWBZZvOdlHuBDFPJ422pT5XWAsToLl4SkkPmot6aVIuJQX8ag9++aM5ItkRAeWjdtOldYEJlQm6lfZ5kCJEhxs3Bno3G9zySjLwkpAosMgKFu5CD+k6yuSku4e1eFj7WcZWEcU3mtD1SjHz22WO1nGqbIhqVmC862MpU434T0LO7eshy7TlZjgTgtIGFzzWfDVDyXw0vnc2w/ohJIlSUGkwzChZ8gSuZ8S1BBTEX+V1gGFjHLHqN9d8h1gVbk+RkwLnmI9oOeWSHsqoDokwhoQSdMsDSeDL2J4WQk0VbLaz/KcDC5Lqn951qRbyk3Q6qbwk6Sm/CbontBmh6zlEtpM8sUJra0L/XcQmB6QqcVJtmNp1ces+U6Cvy3rpqdSgw1ymMzL46+rroQU50BL/yGBIFsdRjsTrFaJ5L32WT/kporo1N7PrXCvKDj9FENj1hlEOlQ8J37aI38hRJj5Te6zuV1dDzoJztq9yFVViyfrD/oKTlQBveI2CJsZ4yCmLAER5DPsIMgkaDfOdSl4zNw7B2mvfK+hYyQTW9qUB0bcNtxmWIImL7Vl4QKIaIsAWDnZzqbhC1ayhBaa0jzX1jn9Fcy7Xo+h+AkrZ32nHl2mUFjNceAdLyFH38REfMuNN/cWjo8W9Q+UO/+eOs3iPd5ArcjmuuGHy/UddQrAUHoUQYGPtZSI0rBdpO19mN+zStNHSonP/htJEaFOfWez19/iLLSYpgsPNRpaYIddHX/hcel2OTCDq9kaPH9aR1fpeOv9JOHYNFsXqcVwoCA3XFUBmI6TSL1BdPFvcpnFpYPUBZZhXYJgLIv8U9mRIPVxPADp2rJx7VLMq4W4dP4IzJuVJOCSERcQ58U1KVPIc4cPaq6NbR3gri677haq5aey5drRTWju2xtfEymeV3TClqR9zf3KzPBLkvWe1bOMl/OllWJ+gS1iXY2MxuKp3LDi2BYbHXFQlW2UW+xmpPioxEpdAedl4pBs3YJhbHjauhHOuKdagLV0wi/SM/Uuob4VpHOjAAn0YYjd2dOAH34oChSQ0qMa5wCVl19gQg/n3n8Qjfe0lgi98yI/iVKs9aQM8KR9+xoMR3/BKWlHxQ4FtDU0jQ87zCyAH6rQVenTG7gV3fo1QoTXoWnzX9op/7vfD3jpdiRswbpy4xa3k5o6kXRUQp2Fv/9aza0sX2v6cOeRBYfQjvk/B4P8gzzdownZyhsU336uwyp+laKCUjCXkoFHv2XjQecgNxcwt/4d8ed5TSt+z8Dadfor0tD0SIMXmuIzjMKe7/jzeyce5e+8IdBuPe3+WQgDoxojKdM92+BlYo9G4A7VN8bB+s5PxrFcJCd0Hij17AolC2/uql0eKB0LieJZm5JBedsco//ffNaCeU+iXjrFO7wy+5/SEaXJdoLTIfaJF3HEKEdxqQeGaKDhXsb6wr00H7WfiQ4AcaNWllJiyCmOcTMQhz6qTe6BqO7nCIE4yT46xPRqWJMPad/m+nqW8CfiTbt5vtxSHCsPZEbOUbmoAa8YkEat1Fa3fNxIe6JViustxKKw84eUooOahdno0JC/7p5q6qzVi7zjVRGl7g6TIjYpV9Z8JV5buo4r27GncD/nsUvHqMGYSspVFkBsa2vRz1spV8eu9yajCE0Ihg+nh8IAvDncx+9vPNjvM06fqT9250eihYQN6aJzB5MvDvqQJ8AgPf0um7QQXUcm57SN52H+SwW8iZzjXz7qxriw6m4h1tvV9TMo3+13P5A5V6AJM/IWd9W3vGeiWdu7/Un4PpcuXg3jp7rYr+Grp8uDkmm25M8MmpezQcGyFgGlvZjc2KfGO04atzHiiH62G506/0vWuZOy646DSJOhhwKpUHIH/p4QoDAZoZgfwlbsAyZsy68YMtn9KOQ42b1LQKgVfWsSHtkY426gF2uFA494aSqCyCetv15BPItnYyGBD50X8De1h/4eJ40WIiWk6uKAlo+p0QWaGu+5m9ekuRI6Nedxxe7F6C50gaT2zoYek86JhFeJJp8lN198d++4i7l/aPdhUjWcfa3wE3AjaB2fuT22CnqcynsVpzfvs09u7zvJuHPKr4DOUQxv6SR7qEysHXL8roHDWFmoUp9d6t3OWF7t6ZHxIeL6QmXo030LgSQcEmHqYjVeFCFv7FiVe6ncJzUobb6KL7u89qVp9iBxUCPIp22ifNBSzFPhQ3r3WL2uvSWoUzOfMJIpFiy1l9i9khXsoh6gXDDrPyu2nrYzQg50M5HRHaT7Zs1nhqd+P/bqGEQcLXQdhcXNDyg7Q83tYC38kXsgHLpjg3cFLd27UWUXWSfb1YcOX61SwY3pTB0IktShy9Yp21+Hxld45pc0Z+BMtT9mY55l+gHr9Tx9/5fjdjHXSVHCx9H0uh6Giayu1gurlu4/tiq98IYUb7yKaGhqcCQjmLGJNjUWJniOj7LDEGfntAM0IBMGyL9zs7OsOtmGjbSvIouDBcROTOwOStUPT/p8s8/XuLIXmxkQ5ht3oGtcv9WpuN8YIBbQvlQIr90hvawolRMORFlZuZg8jIs88rxv5wuxs8oNu+AIcVShLV8iqZoObimIal4qduCkLLE3TgPg7Sd/eCUEVfC9d7zRt6gHkNEDYr+qtBs4LeEoST94VY/eCjc5H26p6wLLR0154+EYDrILUAKMJqtdhKj2E7qu0yF83DGvsE2o1SJ9mmMkpq/y4EFqujClWLN0IulTCKq3T/prUwoEeL1LhEwpOjPsWDk8gU3sGSrZUsxRvlm5IeCU9kZE4aBvHAnFGD62uKpNXN64p19v2MLaDK9PHdZ2eZ2v0BFikX6yNNV8VEH7LFadpN/LRk3Ojo/8elHi5WazN8OacVIPCarmvoflbYvLFXD8Cb1HRGzcnU6kJLlODqKjH9Y8N/pWnpmS4SGrpD8R1Hg1Rd4ZV9UDrPvaZkoGKFmWXIyIM0y+zcoZ82tTo+zzyccjt/fcgnBUcpAfVbPuKfN3Xo0Pq0ujIIfo7Ofa2PLOyRLZvqpHC0CBYazx41n8WWYmjk9XmhWvt8zb2xx+sMTvd+gGCkel7WGT+vebCN9otfU3vdQy/Fvjx4TSz/RXHjO84CYDeY8gZsN79kelvTYFyEAWvhwHnRlkPpw1o4FWoYhekYdEK3ttSk/8Iwtl2u/hYGZkwzqtgfjTd17Lykg2vJWBU+4v6Vh/qWdqiyz8ws7Kuls2Rm2+nX6D9THr5k2R5t1EnkFqAA3vHi8xBnKp2+rk1kOpJl0VRmwjrAVxQlLzlKA50BdXbsy/qrQTDnegNk2Vb8gbYD9CUCssKodXTWanyXXyDPLZPv2JIN8hDF5FG8tph0aZXnoTbZN1APofyFKgL2RpeVWgTGtgKuTE2kJeYsajkEIl+w2vH9TSD6Ss5hzpz1L/4Z36nhcQ123Q3d6Q8nNmpLEHFYU2aEMpHz2WLa3tS/5ezbrdS/p69sJtXJJqptyURRFrKmHKLa9y4ek9x1YdvN/7Txv3iDVVVj3Ly/p1LN59Tanrtn1Tomw8SlZ1xSxxrynSxtwJqKiP4wV2jFnfvwBJu6IfVKlTNCbE5B7YfpIdixtk5s111GLI1dmzIaZPTdQ5wcz+nAvFyP6XdIt9Py7Kcxw/szChgbERsI0yWj66s/1Ogd7ewtHbit1kcg/Buqd0+hgqRmqcVWSQ+rv3vfChjqf1JqaXWRT6+4RFdpqtJ+u+9e9ymouem3mYO4FRvWTOBVMwcWG85obhSJp9m/of+srOzaLa1g8xmU5q3ckw1r/ElRfcERxL/+RZsMpPsfWN+LtaH3UlprNezGWa/WivDI1oh8Tlqpdp5tEaW6l/uZ/heh+1/ygNsWSbrG2/8s+bN3o8G27xULquzLBqU9jJzq72XaTpTPvpxEydtkubnqWBuzbJ3qu5y5NuvKsjg4puTNcPvGrxev7HERrM58ZjeKlTL0vvn3f+sm0isAjoGVq3sjdIW85YTYchUr/LXNR2/deuXIc6pLasFywhdk8eSwpmb1xJTIlyptqYrXh55OVUp3VEvnsGwCyOG0xE15QaN8zM4WdNlwK8r49/1GEyHI8Tw2tjAz+b53CT9YwJK8WrJ7Tsn1WZWn0TIlz1t1rrtBADxdFSkdL+7G5wlFrfXSO7X3AA3nvE6BMWDk1nK+J9WHZ6gsggYsVFPlAenLsb55QFJB5uvH6nBmH76k+CtuXmgnUnxknmbbc4+XkFoB5ZUtZA6jvpcvey6LK+qw8V5RgMC4wPU52lEpM+7naPcVIwmnHee7LvXQ6jIzWm4HQ/VgXYkohN4RLRvVlJz2javgeusA+77BwH+/umV2tL2MMcQi5mtiy1+/ayH/jlhGak96SGKUXDHPqlm3Hva8LVY0QBIWAkZNi5ANfab1Rv8/z/M97w+3BYeKxCX+3fiuSOFVPawcGC9Wj6334ScVe+QDv7mrh97/tlNk8mh+ev3zxweOJb27UX9lMGlZ2xhzTufl87FHRiyk/CqsnPj05StR6QTCP7D7MtSceTXP38d/RM1VDLyxC5xlDj2ru5Ulxg2mTrWsfdAyQL4M26caq34jD4hxaBz/hMXskHiZeJyoh8ECB/8vNb86LB6yqxJZ93lohkb9l8S6Ln3klVTcOXPqjgJTJnJGorviSrRfLr7pX4U69PvkrX8hA5DMCTJqrL8mlavssyNzIaanCF+f4muUE4RHl+/v14ZJvKy5EZK4WmdZJxDfgq/IPVJlhGQonoU/yiV8Nm7eFbCsbB0+beHg39S3Uw+6qdfcc5I+rUIMLyqkjzWP8hcOjz8Il5ZzUKu/2uenJm1xqW5gLi8KX9rkWWrHIxx/hce+ldkV19879a4uqGTjL+PNcmq4VGl1ltXlY0QD18ZkV/TTcwLQ6Dddyet5aWxdSeqh8WGFz7Nobg8UUETsTdiKfwLcUJVmgW6mds9yPNWt6c5LwiuG5zM/fq8j/j/LN2OP1gu5pisNOd1AbprNNscnl8TOcbtdAy42Scfgg4TggeRGkz4NAB38cCcRc9KMokSphoF1nFX+zu5ojIFM1N6bBVFKJt1eRcVlB0rqzxerHfOOC/bTS46rRvLdDZGmvwgxnHex7vkN3WyxRM4Le/uGivG5kEUvHHIegN1xkt8/UKXMHnV3G/EdkP+3wF4yK2fNa60QcirBd/xOw3dunPEc8wNe+LpcZPkp+y+yp/C+VFcqsjH9Tfrqxtzw1ki2T0hA3mxrFNRBVXfJi4RU8FBOpl+aXVanZVjGcwFuuDXi/nsG8YDnuN6Qv1V25J4J74HXfvQ6MQmbLr+cIlcbXWOZODjr5mX7DjM1V83oGXsX+c9JvXqkpXyFuXXSuL0BegwcOztAueRmd6MHBzRpzx5bSSQFHI6DFFFF/QMoGlhDQANmy/89lIHmoUBfH2fsYKqQuXTGXJDljFJ+YoFEOzsubVrk05sgGlFlSdi8Z1XenC0751OWbCe4ShCK6VtRv+t4j9/3efKj/um2lvw4MOxmyUQfiBpgoipg58SsH62zK4m3JN8eFadpJSritZwjYcQ5FYPz6khjd8MSrgePYv10ESwwYpBsWPRoAqYJ+i2x8XxIb/gHFwW+m962qeLs4Ggq3mPFRZy8vo07iSDI9y/HJWVrzTyvAbD1utSH5W2HT9IkdNZ4rNOusleo4kKaB6SXFQKQByV6LLSeyLhVThj1plU+2nQm4bqHFUONy8nhd/mcMLyoTrRvb1FUnniuIuRja3tx3QXJyeluF9vNki1VBm5br/tTW+Adnr53fA3bUNgCBWQ5k38e+2EQAMVnx3yFPEUfFLGbjT8/n3S0HQKUvlr0KsVnDfGQ/Bop21UCylcpAE/fJ2VWeK/ZIUZYZhZbapB9xRQDKboe+4j8qHjIQOxe/hku1dIhYPcCuQIusTrnHng0+7Du5/aVv7+dRT5fqmGnAmFYzNLgSy5nrkc9SX38N56wZ4tP169Byvbmo9WUeFpUS0NWvl1QM9zYy5ZcgPkwDol/rA5KNAe56VOqt/xAI/S9XhT0RB0APs3eyZ9u7c7IQZdPLrNAUtpdzzhLHINyyqboHrggJPSuloQmvdypKXE8SGDzNt+vBgnf1zF438ucT18HJLf60q/Qsvi3aQ7DTv9fS+8q/uD07lSIIpBB2TAyx5yJtDMJ+HlO0FB6e5v5HEl9lGgnOmzcMJlWubu7NIq2BENSbpbigVRhKk8OCGfBLmlqfvbA+3vF5gVOU0fxWrH8bGXZWvvdx8z/R8=", "base64");
				case T.Emoji: return Buffer("AA4IAAAAAAAAAF4wAW8EkPvtmj1oFEEUgCd4q8QkogSxEGGXQ/A4rGKnlWIhaGEhCBaijURttDNpIlroKSiKKCKaIAhBSKEokkIhZaxi5U+jNmohFhYWFvqOm/HGyZv/2Z07nQcfMzs/72/ezrnByRWEnAMuAdeBGWAWaAHX/oN2UqCFjPULou+6WPo51l6n1Sf5nQMeAfPI3AJtF7mxJeC1hf53wEfu+TNtvwLfFft+KuYGaoQMAkPAKLARqANNYAzYDuwC9gD7gYPAYeAYcBw4XbPL0YTlep6zdO9FDx02Neey70lAH65UEGcikUgkEolEIpFIJBKm9MPfZhKJRCJRHq3IxI4/kUiUQxXv94seiNOHk2s6nAe2RKBYTcgRYAb4ABRD0A4Scndlp91Ln3kuw9gU6fISWTM0TEhzuPt8Avo3gFngC9AYIWR85G89IViV6ddM09huDy/3O5FIJBLVMDsS/xskNr7/ZvL5pqrans1+LDem9kzW2ebf9Cx151vWN7CpPpv6863XlkaXbN4m77bx2tRfGfVQ1vm71IrLfRGTsnIQw75JjZWVc5taqKpOY9dWiLP3yVXs+Fzjj20/RK5d11RJ7PPvtbqbROar9MXX/5ahnps1Qu4A05T7wEPgMfCM/n/z57RdgHax1tW7BP03wHvgE/Cttlz/Dxj7Veu0WUbISNbpr4d2E+1vhnYrsA3YAeyk47tpuw/aA8Ah4CgwDpwCztD5NlNZx692/wL0rwK3Mnl+7mX6/LV5AOvmgKfAPLW3AO0i7fOxvsri17NLzb3Nuti8H//CvTGxYuAPvSTrHObWGZIkiUwKwzFXWRtQl624xBEydpX0W156RTeGi44qpU7RSdl+5SXr5yVULHUB/tzrQh/zweS8q64HzL6ND6ZrY8fFC39OdWGMJ6dzuYIC6RNON7aO0UDmC4LrVD1jujE/VWsLIvczJ8trX4fOH1UMWC5MYrSxx/dV/pqKqA+rJdkZm/jBkOXXtA5MdGFzqrrA4rOtAd2+gpuvC2vZXEPYL8sTP8+E6WhSGqT7for1QpAWE9WcyW+w6JuNFJK+aB/zg3+PZWt0tsV6qUJEv3Vim1PRVoy9MnGtEZd9OrE5AxudJmNliMm7ngu43H8+6PypGlsJYctXh+teVoc+9m1j9ZEQegri/jcNl31M6kLfBJWMVgTz1yd2EwlxJ+pyXBD731oTmz66cglVie33URm0zyWnFAaY6owZj2q+6aFbzJOYM3Get8nA/OC/HVR5Njkf27OyiZmvF1H/BoTYdc1aLPemhPBFp7MpWafzR6arKdFZVe6rtIWdex7Rfhud5ER+VzBCxJArwO4s8Q5iNDW6ckQXdi82kH2sNnX6WT5EOyZ+maxT6cNiMcVmL7a2IHLfVDrFOd1ak7tLNs7wldB3iO3dJ1sn5qsNey/4M8P22Ij43mB1w56xu0asG9f7yUdygZBic97Yb6DtuZvol9kkwh6V/yaxhUKWSzHPOp9cZExAPBvdPeJr3+YMsbsjdySUrI2MKL8B", "base64");
				case T.GraphemeBreak: return Buffer("AA4IAAAAAAAAAIJgAc4GMfntnF+IVUUcx8+295y7uteVUElQeymlh4weUiRqicjoIY0irSSCllhkCTOJkqiINsxyCcMo6R9mEK0PlmYhZJSUkEVhUkmUkmmwuFT7stRDS30Pd047DjNzfnPOzJnjOj/4MH/P7zfzO/Pvzr27izqj6AqwFPSC1eAeLq9s2A/WgQGwgVD/UfCUpnwTeB68BN4Ab4PdYB84wNU7CA6Db8AP4GdwGpwCo2AM/A2iRhQ1QXej/WzGXjALefPAArAQLAZLwFLQC24EK8Et4A5wN5e+D9zP6j8EHmPPPw3mgyFm70WEvyF8jdO/E+xi6b1gHzjA0p+z575EeJTFjyE8wbX/V8TPsPQfCMdZfAJhHEdRCwxy9WcjPR9cCi6Pz/bDVfEk1zCuBzcw+Lo6Bon1bHNz3GZto02adxvSa1jb+4Q+7ECdCUHHgKafD7KyjQifZPHNXP2tiG8Dr4I3wTDYw8r3s/ATif5DyPtaYzedV98b+F/Fceg4xfSMcvr6wEwL+gPFGRP8/65kDNiws55bC8bDOw8EAoFAIBAIBAKBQM35J27fpWXpsUb+M40kilrJZHo24heBi8GiLB/hEnBt0r4PXI5wBbidla9B2Af6WXodwqMIH070tp9A+SbwDNgMngXPgS1gKJSFslAWykKZ9bJt4BWwvAZ3nas947v/gcBU5hDhDFqGDZ2T36uL9Ery+PPxzsT/+jN3Rps7wf5WPttR7x1J3REhb24PdILt4EhPO68xM4qWgfVgCHwKTk6LogunR9GtYCvo6sjnC2K9uHsyfjXiA2AXOA3mtGg6AoFAIDA1WdUqt/+vTPTlfwrp4Zz6PtiDNn2gaNcOS+en9y30e1SR/zF0f4fweGf7Nzrpb7wOIu8ws3kCHEH8GPgpaZf/gnCEa9PvkvalusaTyd8ATiAeN+Vt6Eb+LK5sHuKXKOqmXIayK7nyZc2zx8p1XFn6272bNLpWaMryWIVn7wL3Mh1rC+h6gHvmEcQfF3QMIr2F5b1goP/lEv2i8DrT/5ZjOxSG0Ybd4MMatEXkI7RpcYX2PoO9r8C3El/8WEP/UEh/K3iy2Q5H0rkO/jqH+vIv2trs8t8OX4hrRM8U9cWckv16rwZ9WNDVnmcZYnm/BtVdzrnEws6O/8ERl8QFXLyT+AyFIP4k+N/eOK5y/Nt8b43zHJtSlZ26ie93WPS986EqPtUlVkAVU5/Xec+p4/pS1RjU9SHOqSPqkNV1IXy7fEmdxkqd5Xzwg62+VeED1X6Yl6+rV5Xo7PJrlov13ITEZqcNJbOf+SjhoLRbrJ/Fo5xnTdrna66L/anattgGlQ/FNvL1TWxR61b5PhpC3Nd80c0PWV1Zu8W6Nv1YVr9qvvO6E66uyfgyEdfjqy5nCZlvXczvIuutD1GttYmQL84/qm4T+67Gtol92R4qpvPa6HvvTEU8F8jOCLL3a7t/4pnFp4jvU7e/541/yh2M6T7g+zwqy5P5iK8vzh1Xc9mmf8Q5UnRvyjun2xJKe6OomF3f+3IV9sQxK7Nne3wVgXIWLGuvTPtsUVaofhP7a7LHlRXqZxUX/iiqIxWKf8q2mX++6Zkuz0zzjC2pau+gzHl+ruvOJtT7NtO+lZmDGba+h9P5RJYvisxfKj1VvnuXnxX5/lL2Uj6Mcp6h+pEyBl3sHaZzQda3KkX3nnTjls/3JbbWG5lOn/2SvQ/ZmuNy3RBtyN69rH2mQtlnKGuBLT/kzU8Kpp+LZXmyNZp6tqwClS0T6WDPTI/s/V7W9W9xVXp9/B7Y5fyn2LWlp8h8k+nSpVV5NkW2RrsW33tw3vqtWs+rEpvrXRHbRdvlQkz3sCLjyscdhCuRnS9E//Bx33MxE1/7gc5HsnQRO5Q6vj+TuNAnWxt0fiziY9m70tUzFdXdEW/L9r1EN2hVSNX2TMXm3asodb5f1UkVf69nsserzsQUva4l7wzOz2kfors7UO0/Jn8PIpOyz6tEtafaPjv6OrfYHq+md8F8v3V/F+RyjqnarLprU0lWZuIDF6I7D6vS1LFn0mZRL9UPVfmJlzL3nfz4cCm29Os+U4n9Uc0BH/cIMtH1JRPV/YevPti2WXTsFhmzqrGhG0PU9lP3WdtSZM+i7AUUXIuuD7K/X6LoK2tX9LNKxL8XpvrU9F2ZCOV7pbLzgSpF/JHZz+uH63WSMh9Ef+qeS4klOlyK7G5dbG/Z9TZPxHllU6erdaqK9dDk+xCXlJWq94u8dujKdeu6ar3J+66WspZFxDq2xbUdX++96L5C3Xts2KL0waS/rkTVdps+tNEmW20znZd5dl2Ij7UilRkVkUqd/gfOfw==", "base64");
				case T.LineBreak: return Buffer("AA4IAAAAAAAAARYAAUQTu+ztnQuMXUUZx2cv7W7v3n2Wdimw0JZty0N5RcBCeCNQVAokFNLYgtWAooJAUiJokdfGoFYsWkSgBqlFBBsKChYjUmLVooBAAHkplEZ5GEFIRECp/o9nJnd2Ou/X2YX7ZX+Z85iZ75tvvpkz59yz976wFSGvgn+B/4JtxhEyFewM9gT7goM80g+Bj4ITwQKwCJwBzgHna8pdDC7n9ofBUnAluAZcD24Ca8BasA5sAA+Cx7lyT4NN4GXwOngTkPFoI9IOpL1gGzAVzAJ7gP1AB84fjPQoMBfMAyeDU8GnwOfBYrAEDIOl4FvgWrAS3AJuA3eBe8F9dP9h8CTYCF4Cr4E3AWnHH+gBA2BHMAO8H+wDDgSHgWPACWA++Dj4NDgbfAFcAC5pL23/KtIrwTV0/wakN4MrsH070p+De8F99PzD7SVP0vRP7aUP/0LTv7c3+Sfl3+Adyr7U5+M7yrQbaT/Ylu5PpelMpLsX2x3NMgdh+0huPwbHcvXNw/ZCcBo4EyzuaLZ3CbaHwVIu/3JsrwAr6bEfIr0V/AzcA9bT8vcjfYTmeYoeOx88j+2XwesdpW8L3sb2cUhrEwjpBBPBdhPKstNpugvSvcAHwSHgCPARcMIEdTuLcTVfc573cZEuQt4zaP5zkC4GS8AwWAqWgxVgFVgN7gB3gXvBfeB+8Ch4mtbxPE1fRvo6eBvU6mgj6K+X57ZFOhXMqstt240e37tejr396yM5gNs+HBwF5oKTwEJwGjgTLAZLwDBYCpaDFWAVWE113Ib0LnAP3f8N0gcUdul4jJZ5Bukmh/J/Q97XwWep396sl7H1fz+Mb27zvFMfORbHd2J8gcmUIgZ2QDoT7N5Zxtu+SA+kHMJtixwNjgXzwEJwGjgTLAZL6PYwWAqWceWuAtfQ7RvAzXT7domOmzX6W7Ro4UcxdtkcUbUtLVq0aNGiRYsWLcYOd4JfjgI7eNbT9Ped5fMQ0331Q8j3RGe5/RzStvHNcy92KsrR5zOv4PwbYDPN194g5NJx5fOaHmwPNMrnhDsinQl2b5TPA+8v6sD2QY2y3JFIj200ny0VzMP+QnAaOJPmu0W4x1+M40vAheDL4CJwMbiksKN1rnWuda51rnUu+rmvgmXg243mc/qquK5RLVW3v0WL0YzL2vUHjeb2TXRsrUG6FqxrjFz7bWiY17aMB5D3ALqufYyWexrps+AF8Cp4A2wW6hzXRUgXmAQGwQywa1f5uczeSPfvqn7+GewrWQCuA49q6Osn5HhwGVjfP/LcuIllOgnpHHARWAfI1oTM3ro89zmkN4HnwH/AgZMI2VgnZDr8sQh8H2wEBOv06Y0yPYKmPMW15eq2kl9he6uuLfMcgWOf5I6vxPYmMNSN42Al2NTdrCcWQz1l+jGk19LtG3tG5nmmp7RpsHdLu1u0aNGiRR4WYA7+Bq7Vh+HacAzoEK79J+DYfLCgq3nsE9j+TFe5JjiXluG5gOZdgnSYbn8N6TKwHKygx1ZJ9BUU7wktg22rcf4nNO9amt4j0WezhineWynep3pacs/xW9T5O/AI1VG8C/MU1fM80pfAa10j9b3V1VwLteE6OgH0dTf1sXxT6LFp3eW7N1eg3C7Y3qt7S/tndzf3D6Xl5tD0uO4t7ZZR2C7zT+G/kxV1FO+EzUV6Ks6f3l3un4X0PPAlun8Z0q+Db9L94hnk1di+HizG9k1c3WuwvRZcgO11SDeAB8Hj4M8SGwr7JqPOv3LtPx68orC3OP8Gzm0W8rdjXdHTU+7PQN8M9JTnd0Q6q0ftsyL/Hj1bHivYT1OOcTDyHA4+THWfgHQ+3V4u6Q+R4l2sRch/BjgbLAZf5PReiu2vgCvAd8CKnmbbTKyyyOf6DlowHWr9q3vU5e6wbLMrsdp1N7X915o2bFCc27Oepm05/PAHoU17e7YlRh8U462YA//IxUpxnXqW2vgC0lfAG2Bz4nhq75Uf78HxrcH23Pmh3uo/+6qSOYnrf19vmr6OiakNxXMTlndvx/Yf1Fldu3zG/wfQX7PBoRn7TTevFGvHIr2K7s+BXceDk3rL/dnc2u8Uic2n9zbPF2tR2bqAnT+Hfu58FsqcBy6kZYeRXgSW9upt5Tmuy5znStR3lUOdKor3wb/XW6arkP4Y/HQMjDvGL2Dr+jFkb674v7935PlHM/joGRqPGx10FePkJfAaeAu09RFS7yvP9fWZyxfz5JS+5pxZ/P/CDtif3le+87wr0j36yv8H2Yem+9N6D0U6p6+cZ+ciPUmiT5yTT0Ge08FZ4FxO7wXYvhhcDpZxx7+L7evBjeBHYA09dyfSu7l867G9ge4/hPQJ8FzfyD7l56MXqa230rniHzRvcc/4JtcO0o/73P6y3j6aTkE6jW7zbT1mDFxvTP3zbmGX/nd3+3j26lefm605917gkIrbf3T/2B/js0dBG0I4rr9cnzHE8ydqOHmMt72gjZipga3AOMp4izK2tNNH71jiEywfCEKKNOh2caz4yLabO1d8VNpL077yEmxFD6XO0SHsp6aLtqE7s15ef9GXE+l+4f/3ushicmvF8RRMImW/FDHfyVH0z2QK22ZjpEaafcrKsbwDQlmeCcJ+F0kbb5MT1z/a9Y82WHzwMcD2bX0mxhRfZsBQNge5xu1YYJJnGRU+Npj6i4l4vEc4r8on1lW3yOdDijpjxnbVtqUip9+ZVN1mE8XYqEns7aT7Vc87PtRIM47bJNsdNDXJNhkx6RbjykZs+r/BId7XuPic9yl7Barq2OZJEWe294sNblu0KWWbO4i57Sb/iOdleVkeW3+Etotk9GGumGJS9Tip2k+sf30kV/zl8olYhr7aP8JHRT7+Pj+HrSr7xeOqfExCbAot79N23m5X/SkkRXtt6k0hIXOn7XiKTY74M8VkzLab6nK1r0bJOS+L49U2llX7sccPISP1yPIzsekTPq9s3/aa2iY5pmqTqMu1f9n9hsw/7Dh/PVO1S7RLN0fl7l/TNmuL2CbRt2K7VX4Q61SJTTyKYtu/snnCNv54+13Gr6xPbMvF7F/f8SuLAdk+0xUiMcZvJ9GLrr1Esm/TH0Sz74Lv/GkSVb5U86ftnKez1xTrsnaoyujaLB6T5VPpkR23HcO8mOZXXYzajj+bOGEScz3ErpMqm1zXcMSw79MXIeVlsRAyl5r6STU3ySR0PJvEdU6z+cxU1q5c/avKy8R2vRurf1Ui2hrSv7r4MYmsXbn71xd+vgntT5UPRX2utjGJOR+r7mvEOHdZ39qOLZlfYtXtks/GDl5k49EUL7o8pjHuOj/zcegqU0YJonQG1lcn9n5kz4F0/iFkpJ264yqRtdnkE9m+yRYf38v6QpdXp4uJaxzL+nBAgD82iduu0X3ZV11MouXEz3xNa87YzwXFz/1ZWrybOJFLbdfCpnmLEPMcpKJmcVx37bIhxL5YENIc/7rrsc21h49F1VqXvV8mk6rnYNf5UmxbLv26Od/mus+L7XrAhm0rZruK2b5ifNeKRHFcFUM+5UP1u8z/VbbPxa6c7YsNE/E+UHcdSWlHzvarJLU+0/ncvhfJqZ+tFX39XyPmdY9L37vq5+sTj9k+K4uhX4a43lXdG6bW7yox/E8C9MdejzLfD3L7LHb55wNMQp9rh44Bdp7ddzL7B4TjYoyx+4Fc9oegE10s57CtzunK6R9byeUDlY0+98a8hJYXfcXGQ+h9n8/zLmI4ZyO+en3L29bLxMWvMrtSj1NVvLA8OZ99iL5sc/CfSkLLx2hDyHMx2fGcc5arflF8nmfViN/a2ManrteSqvzu2i5VO2M9Pw+JYZ3E0mOjX4wrl/eOVTbH/nwiFS5jSSc5bfbRaRJxjISMLT5mdXEsO2ZjX0pUunz7wnSez6dLq8LWft+6U9kV22aZPpOOAS6fbI5lTBL2dyBlzO1ImvEn5ptKRn73xwTS/J6mCZJ9Pm/BNI6iPvadUrLYL/Q2DPA2FHoGKSrf9JDmc8JBi/wqdGsjfn+6pCxRtFc3/pnYfKcNax///Szid7bYlCcefuFtLaRTg/idRy7IyjYk26ESe83jKrxfWbyLfah7f42HL+fyv6e2cZPi+5Z0umXfWyT73isdKn2u5Wz9IkoKfS42+bZFZpd4THaepeL3nJn6VuYLsQ063+liyCYefPrapDfGeND5RrcfI35i1W/rs1DfhdrlyrQINojvwfnauhPFRWcKn+4kEFJXDnG9nqSk7llGjJMUdrmMqRi6fG2w9aVLPbJ92+NiHaHts/W7bZkU413XbpPfWD3s/E4SPUMkzvzi00aVD3Nds3R+lM0lOynyxLA5l/9N7c6NGPMmxLEpi+nJivyy8SCe48edyk8yO2T1yOwZ0uiVIfPVkECuGOH3JygozrHP5UX7xfWZbZriOuwb7ynXeyadprQKna5plX7LqTtXrMSKaxuYuJbJ4Wvdc2Be+Pfq2DPoDmL3+aJO6sT+PU+Z6D6/itl3pjb49mOM86prignd5zb85wxdZGQ/89csft80h4n1d3A6xM81ZG2dSlF9FtIl0aFqU2jc8eK6FvMlpy6THaPBP7EkVG8RRxMpLM8gt217jbfNP8ht8+VMqD47UuWVHWefZYr+mEG3TWlqcukx6bdpt+ncDNIU1leDAqxPRpv/Y7VfFn8zhPbLJGefx9RXhe0m37nKjEBytt/H/6b74xR94iIp/CLO+SFtSh2/osS4D6gR+/sdE67vj8aWWPeLru9Txron4+urSUgprnbq9lXHYmLTD65tbCjK+fjIBvb9Huz5qEl835Fi8RP6/yOx3td18Y9NPJn0sfanjr+Y77IVOqr4zg9edD7n5yXZuCtS33hj9YT+71XI/wHydsSOA9tYcJ1Pxbpd/S/2q+//MfqIrA9Cx6MsPl3HokpfrPM+uusRzsee72okPP5EmQlmZSS3PleJ+d1KolTx/Uqi7FwxofdqKe5PXe4NTfOBi9jWUfxWXxux/92/ukNe8fcCdceJIq+qnMq2GMSQmHO3K+yZfCw/VOlHnbjaI94fht4HFf9PxT7rYL9Fye4F2ecg0zT2h+qXzS2u72+I5XTz1kQuLYQ96+bfDzLp0c2JRcr+f0k2T6pirMqxxmQ6TZkfxLbIfDxRSG2RfdbV4VhHKF2etqfSz3/uyG8zP42FZ/xi/zLRjZnY53lh/0fIn2f/u1RIjLmfn892IeXnFExM9ccex7HqtrE/ZfkQnbzUiPrZdW6bYvavr09UfsolOeOBwT8PqEJ/iKT+DMPH1py6U8aEzfPQKuKF+aJm4SNTPbI6XGIydR9X4deU7XUR1/wu9oo6cvhV5gPRlpT6VbFu2z+x+9dXR6jPU+jyiX+b/kihN2f7bXSK1xjd9cb0ObWoI3c7dddL27WKTmoGTOV1/rfJq9I7zaBXV2fsODP5J9V4UrXRVXz1htYdS0eo/hh9ULV+VRnXdwxCP5+1tUNHiC9Mn0fbrr9D+yrUjzYS417Ut1/Eec5F6sJ2ynGRKp5dfSeOQVu7ZNcTl/dVYs4/LAb470M0iSxG+bbUiDzOmLi8Pzwg1M/iMqYPbNvNJOV4FOc0MUZM+omQys6F+Mg2r27+iBGzLuNSlNjvx9q0SWx7qC9MZUVdqjz8+LTxo2pffP6rEpdngDpdun62jQOdjbbrGNlc7hJf/HzG7DTpNEnK62PI2GRiM27Z72EW8L9/o/K7CzZxJuZ1kVD/i79da0NMybHO1UkVv9sR83dUbP3HyvOx6fP7Kb5rVnFd5mq/7XXKRVzbFLqWCPGt7LxsvVrjjttci1z71LTWiBEn/JzI5kV+/vG5Z4wlqfpXdT2W+V92nbGVmOPNZhyy/0WLNUaY+MZVaFmTmGyXbeeaR3gRfWHyi+18kmo9SBTbOX1IFNuma5xN+2LYKBt/MfUXEjL3yPTnltRx08UxkUPMJx4bDd9hF6I3lt2+80esNUHI2ChEtZZJrZ/hsqaSYfOZLC8u/WXyX4rYlknq+l0kRZv5vjQ9VwhtkynmchIqquupC+J78rlF9V69Dz5SxdiMYQ+fn58vY8eYq8hsVa07dedjYFN/qrkstR6XNXxMid2OqvXb2igbd6JNKht97CaWZUeDT0ztd7XZ9jwvqXzExHbdmJqU6xGx7bHqkdVr638+r+u7mCZRrclG05oupm2ijba6VHlTiG4M2sZLSN+E1uf7PIA9g4khIfO6+FuQst+G9LWHkJHlXedmWV6xHp0NqmOyVKZTZ79NfbLyLtcp2zKqtrjW7YNMbPSk1O8iofWE3rOmuB8OrSOkvM9v0PAS+3dtYtcnSoy6U8iumQh9HpP6OVCIbTr7colM95DieAxYnKeq36RDdZz/rS+ZH2Tnc7ObBNE+mb0mYthmqnNIkc9kj6quIUWdqfugrkhV7VWV9R0DurVKjLbZkLLuVG0zxa1N//nWb6szVnzm9KOPHt1Yz/W7i/xvW/G/kaJrR4w+c52rXHXa5HcRnzb6lFdJir538YepLpPY2hS7/bEkVK/LeJBd00PHhc8aiB2zsd8ltk3jxKTPR3Q+EdtqKu+r32UtmnONbWt/FXpT6o9tY2x7q5ZUn0XY6q7y8yJR/gc=", "base64");
				default: throw Error();
			}
		}, e;
	}())(), j = o, R = j.isEmojiShift, U = j.isEmojiPresentationShift, V = j.isEmojiModifierShift, B = j.isEmojiModifierBaseShift, J = j.isEmojiComponentShift, M = j.isExtPictographicShift, 1 << R, 1 << U, 1 << V, 1 << B, 1 << J, D = 1 << M, K = E.createTrie(T.Emoji);
	ie = Object.freeze({
		__proto__: null,
		Other: 0,
		Control: 1,
		LF: 2,
		CR: 3,
		Extend: 4,
		Prepend: 5,
		SpacingMark: 6,
		L: 7,
		V: 8,
		T: 9,
		ZWJ: 10,
		LV: 11,
		LVT: 12,
		Regional_Indicator: 13,
		default: {
			Other: 0,
			Control: 1,
			LF: 2,
			CR: 3,
			Extend: 4,
			Prepend: 5,
			SpacingMark: 6,
			L: 7,
			V: 8,
			T: 9,
			ZWJ: 10,
			LV: 11,
			LVT: 12,
			Regional_Indicator: 13
		}
	}), ae = ie.Control, oe = ie.LF, ue = ie.CR, fe = ie.Extend, de = ie.Prepend, se = ie.SpacingMark, ce = ie.L, he = ie.V, le = ie.T, ve = ie.ZWJ, pe = ie.LV, Ce = ie.LVT, ge = ie.Regional_Indicator, xe = E.createTrie(T.GraphemeBreak);
	Le = E.createTrie(T.CommonProps), Ne = JSON.parse("{\"categories\":[\"Cc\",\"Zs\",\"Po\",\"Sc\",\"Ps\",\"Pe\",\"Sm\",\"Pd\",\"Nd\",\"Lu\",\"Sk\",\"Pc\",\"Ll\",\"So\",\"Lo\",\"Pi\",\"Cf\",\"No\",\"Pf\",\"Lt\",\"Lm\",\"Mn\",\"Me\",\"Mc\",\"Nl\",\"Zl\",\"Zp\",\"Cs\",\"Co\"],\"combiningClasses\":[\"Not_Reordered\",\"Above\",\"Above_Right\",\"Below\",\"Attached_Above_Right\",\"Attached_Below\",\"Overlay\",\"Iota_Subscript\",\"Double_Below\",\"Double_Above\",\"Below_Right\",\"Above_Left\",\"CCC10\",\"CCC11\",\"CCC12\",\"CCC13\",\"CCC14\",\"CCC15\",\"CCC16\",\"CCC17\",\"CCC18\",\"CCC19\",\"CCC20\",\"CCC21\",\"CCC22\",\"CCC23\",\"CCC24\",\"CCC25\",\"CCC30\",\"CCC31\",\"CCC32\",\"CCC27\",\"CCC28\",\"CCC29\",\"CCC33\",\"CCC34\",\"CCC35\",\"CCC36\",\"Nukta\",\"Virama\",\"CCC84\",\"CCC91\",\"CCC103\",\"CCC107\",\"CCC118\",\"CCC122\",\"CCC129\",\"CCC130\",\"CCC132\",\"Attached_Above\",\"Below_Left\",\"Left\",\"Kana_Voicing\",\"CCC26\",\"Right\"],\"scripts\":[\"Common\",\"Latin\",\"Bopomofo\",\"Inherited\",\"Greek\",\"Coptic\",\"Cyrillic\",\"Armenian\",\"Hebrew\",\"Arabic\",\"Syriac\",\"Thaana\",\"Nko\",\"Samaritan\",\"Mandaic\",\"Devanagari\",\"Bengali\",\"Gurmukhi\",\"Gujarati\",\"Oriya\",\"Tamil\",\"Telugu\",\"Kannada\",\"Malayalam\",\"Sinhala\",\"Thai\",\"Lao\",\"Tibetan\",\"Myanmar\",\"Georgian\",\"Hangul\",\"Ethiopic\",\"Cherokee\",\"Canadian_Aboriginal\",\"Ogham\",\"Runic\",\"Tagalog\",\"Hanunoo\",\"Buhid\",\"Tagbanwa\",\"Khmer\",\"Mongolian\",\"Limbu\",\"Tai_Le\",\"New_Tai_Lue\",\"Buginese\",\"Tai_Tham\",\"Balinese\",\"Sundanese\",\"Batak\",\"Lepcha\",\"Ol_Chiki\",\"Braille\",\"Glagolitic\",\"Tifinagh\",\"Han\",\"Hiragana\",\"Katakana\",\"Yi\",\"Lisu\",\"Vai\",\"Bamum\",\"Syloti_Nagri\",\"Phags_Pa\",\"Saurashtra\",\"Kayah_Li\",\"Rejang\",\"Javanese\",\"Cham\",\"Tai_Viet\",\"Meetei_Mayek\",\"null\",\"Linear_B\",\"Lycian\",\"Carian\",\"Old_Italic\",\"Gothic\",\"Old_Permic\",\"Ugaritic\",\"Old_Persian\",\"Deseret\",\"Shavian\",\"Osmanya\",\"Osage\",\"Elbasan\",\"Caucasian_Albanian\",\"Linear_A\",\"Cypriot\",\"Imperial_Aramaic\",\"Palmyrene\",\"Nabataean\",\"Hatran\",\"Phoenician\",\"Lydian\",\"Meroitic_Hieroglyphs\",\"Meroitic_Cursive\",\"Kharoshthi\",\"Old_South_Arabian\",\"Old_North_Arabian\",\"Manichaean\",\"Avestan\",\"Inscriptional_Parthian\",\"Inscriptional_Pahlavi\",\"Psalter_Pahlavi\",\"Old_Turkic\",\"Old_Hungarian\",\"Hanifi_Rohingya\",\"Old_Sogdian\",\"Sogdian\",\"Brahmi\",\"Kaithi\",\"Sora_Sompeng\",\"Chakma\",\"Mahajani\",\"Sharada\",\"Khojki\",\"Multani\",\"Khudawadi\",\"Grantha\",\"Newa\",\"Tirhuta\",\"Siddham\",\"Modi\",\"Takri\",\"Ahom\",\"Dogra\",\"Warang_Citi\",\"Zanabazar_Square\",\"Soyombo\",\"Pau_Cin_Hau\",\"Bhaiksuki\",\"Marchen\",\"Masaram_Gondi\",\"Gunjala_Gondi\",\"Makasar\",\"Cuneiform\",\"Egyptian_Hieroglyphs\",\"Anatolian_Hieroglyphs\",\"Mro\",\"Bassa_Vah\",\"Pahawh_Hmong\",\"Medefaidrin\",\"Miao\",\"Tangut\",\"Nushu\",\"Duployan\",\"SignWriting\",\"Mende_Kikakui\",\"Adlam\"],\"eastAsiaWidths\":[\"N\",\"Na\",\"A\",\"W\",\"H\",\"F\"]}"), Oe = Math.log2 || function(e) {
		return Math.log(e) / Math.LN2;
	}, Ie = function(e) {
		return Oe(e) + 1 | 0;
	}, Se = Ie(Ne.categories.length - 1), we = Ie(Ne.combiningClasses.length - 1), Te = Ie(Ne.scripts.length - 1), ke = Ie(Ne.eastAsiaWidths.length - 1), We = we + Te + ke + 10, Te + ke + 10, ke + 10, Ee = (1 << Se) - 1, (1 << we) - 1, (1 << Te) - 1, (1 << ke) - 1, Ue = function(e) {
		var t = Le.get(e);
		return Ne.categories[t >> We & Ee];
	}, $e = function() {
		function e(e) {
			this.codePoints = e;
		}
		return e.fromStringSlice = function(r, n, i) {
			return new e(t(r.slice(n, i + 1)));
		}, e.prototype.toString = function() {
			return r.apply(void 0, this.codePoints);
		}, e;
	}(), et = function() {
		function e(e) {
			this.codePointGenerated = !1, this.codePoint2CharCodeIndexMap = [], this.charCode2CodePointIndexMap = [], this.graphemeGenerated = !1, this.graphemeIndecies = [], this.str = e;
		}
		return e.prototype.codePoints = function() {
			return this.generateCodePoints(), this._codePoints || [];
		}, e.prototype.toString = function() {
			return this.str;
		}, e.prototype.graphemes = function() {
			var e = this;
			return this.generateGraphemes(), this.graphemeIndecies.map((function(t) {
				return $e.fromStringSlice(e.str, t.start, t.end);
			}));
		}, e.prototype.charCodeCount = function() {
			return this.str.length;
		}, e.prototype.codePointCount = function() {
			return this.codePoints().length;
		}, e.prototype.graphemeCount = function() {
			return this.generateGraphemes(), this.graphemeIndecies.length;
		}, e.prototype.codePointAt = function(e) {
			return this.codePoints()[e];
		}, e.prototype.codePointAtCharCodePoint = function(e) {
			var t = this.charCodeIndex2CodePointIndex(e);
			return this.codePointAt(t);
		}, e.prototype.charCodeAt = function(e) {
			return this.str.charCodeAt(e);
		}, e.prototype.graphemeAt = function(e) {
			this.generateGraphemes();
			var t = this.graphemeIndecies[e];
			return $e.fromStringSlice(this.str, t.start, t.end);
		}, e.prototype.codePointIndex2CharCodeIndexRange = function(e) {
			return this.generateCodePoints(), this.codePoint2CharCodeIndexMap[e];
		}, e.prototype.graphemeIndex2CharCodeIndexRange = function(e) {
			return this.generateGraphemes(), this.graphemeIndecies[e];
		}, e.prototype.charCodeIndex2CodePointIndex = function(e) {
			return this.generateCodePoints(), this.charCode2CodePointIndexMap[e];
		}, e.prototype.charCodeIndex2GraphemeIndex = function(e) {
			this.generateGraphemes();
			for (var t = 0, r = this.graphemeIndecies.length - 1; t <= r;) {
				var n = t + Math.floor((r - t) / 2), i = this.graphemeIndecies[n];
				if (i.start <= e && i.end >= e) return n;
				if (e < i.start) r = n - 1;
				else {
					if (!(e > i.end)) throw new Error("Error binary search grapheme index from char code index. Must be a bug.");
					t = n + 1;
				}
			}
			return -1;
		}, e.prototype.sliceByCharCode = function(t, r) {
			var n = void 0 === r ? this.charCodeCount() : r;
			return new e(this.str.slice(t, n));
		}, e.prototype.sliceByGrapheme = function(t, r) {
			this.generateGraphemes();
			var n = void 0 === r ? this.graphemeCount() : r, i = this.graphemeIndex2CharCodeIndexRange(t).start, a = this.graphemeIndex2CharCodeIndexRange(n - 1).end;
			return new e(this.str.slice(i, a + 1));
		}, e.prototype.sliceByCodePoint = function(t, r) {
			var n = void 0 === r ? this.codePointCount() : r, i = this.codePointIndex2CharCodeIndexRange(t).start, a = this.codePointIndex2CharCodeIndexRange(n - 1).end;
			return new e(this.str.slice(i, a + 1));
		}, e.prototype.generateCodePoints = function() {
			if (!this.codePointGenerated) {
				for (var e = [], t = [], r = [], a = this.str.length, o = 0; o < a; o++) {
					var u = this.str.charCodeAt(o);
					if (n(u) && o <= a - 1) {
						var f = this.str.charCodeAt(o + 1);
						if (i(f)) {
							o += 1, r.push(((1023 & u) << 10) + (1023 & f) + 65536), e.push({
								start: o - 1,
								end: o
							});
							var d = r.length - 1;
							t[o - 1] = d, t[o] = d;
							continue;
						}
					}
					r.push(u), e.push({
						start: o,
						end: o
					}), t[o] = r.length - 1;
				}
				this._codePoints = r, this.codePoint2CharCodeIndexMap = e, this.charCode2CodePointIndexMap = t, this.codePointGenerated = !0;
			}
		}, e.prototype.generateGraphemes = function() {
			if (!this.graphemeGenerated) {
				for (var e = this.str.length, t = [], r = 0; r < e;) {
					var n = ye(this.str, r);
					t.push({
						start: r,
						end: n - 1
					}), r = n;
				}
				this.graphemeIndecies = t, this.graphemeGenerated = !0;
			}
		}, e;
	}(), rt = Object.freeze({
		__proto__: null,
		XX: 0,
		CM: 1,
		BA: 2,
		LF: 3,
		BK: 4,
		CR: 5,
		SP: 6,
		EX: 7,
		QU: 8,
		AL: 9,
		PR: 10,
		PO: 11,
		OP: 12,
		CP: 13,
		IS: 14,
		HY: 15,
		SY: 16,
		NU: 17,
		CL: 18,
		NL: 19,
		GL: 20,
		AI: 21,
		BB: 22,
		HL: 23,
		SA: 24,
		JL: 25,
		JV: 26,
		JT: 27,
		NS: 28,
		ZW: 29,
		ZWJ: 30,
		B2: 31,
		IN: 32,
		WJ: 33,
		ID: 34,
		EB: 35,
		CJ: 36,
		H2: 37,
		H3: 38,
		SG: 39,
		CB: 40,
		RI: 41,
		EM: 42,
		default: {
			XX: 0,
			CM: 1,
			BA: 2,
			LF: 3,
			BK: 4,
			CR: 5,
			SP: 6,
			EX: 7,
			QU: 8,
			AL: 9,
			PR: 10,
			PO: 11,
			OP: 12,
			CP: 13,
			IS: 14,
			HY: 15,
			SY: 16,
			NU: 17,
			CL: 18,
			NL: 19,
			GL: 20,
			AI: 21,
			BB: 22,
			HL: 23,
			SA: 24,
			JL: 25,
			JV: 26,
			JT: 27,
			NS: 28,
			ZW: 29,
			ZWJ: 30,
			B2: 31,
			IN: 32,
			WJ: 33,
			ID: 34,
			EB: 35,
			CJ: 36,
			H2: 37,
			H3: 38,
			SG: 39,
			CB: 40,
			RI: 41,
			EM: 42
		}
	}), nt = rt.XX, it = rt.CM, at = rt.BA, ot = rt.LF, ut = rt.BK, ft = rt.CR, dt = rt.SP, st = rt.EX, ct = rt.QU, ht = rt.AL, lt = rt.PR, vt = rt.PO, pt = rt.OP, Ct = rt.CP, gt = rt.IS, xt = rt.HY, At = rt.SY, yt = rt.NU, Pt = rt.CL, mt = rt.NL, bt = rt.GL, Lt = rt.AI, Nt = rt.BB, Ot = rt.HL, It = rt.SA, St = rt.JL, wt = rt.JV, Tt = rt.JT, kt = rt.NS, Wt = rt.ZW, zt = rt.ZWJ, Ht = rt.B2, Et = rt.IN, Xt = rt.WJ, jt = rt.ID, Rt = rt.EB, Ut = rt.CJ, Vt = rt.H2, Bt = rt.H3;
	rt.SG;
	Mt = rt.CB, Zt = rt.RI, Ft = rt.EM, qt = [ht, Ot], Yt = [
		ut,
		ft,
		ot,
		mt
	], Gt = [dt, Wt], Dt = [lt, vt], Kt = [
		St,
		wt,
		Tt,
		Vt,
		Bt
	], Qt = [xt, at], _t = Yt.concat(Gt, Wt);
	(function(e) {
		e[e.Mandatory = 0] = "Mandatory", e[e.Allowed = 1] = "Allowed", e[e.NotAllowed = 2] = "NotAllowed";
	})(Jt || (Jt = {}));
	ir = [
		function(e) {
			var t = e.current, r = e.next;
			if (t === ft && r === ot) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current;
			if (-1 !== Yt.indexOf(t)) return Jt.Mandatory;
		},
		function(e) {
			var t = e.next;
			if (-1 !== Yt.indexOf(t)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.next;
			if (-1 !== Gt.indexOf(t)) return Jt.NotAllowed;
		},
		function(e) {
			if ($t(e.index, e.types) === Wt) return Jt.Allowed;
		},
		function(e) {
			if (e.current === zt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (t === Xt || r === Xt) return Jt.NotAllowed;
		},
		function(e) {
			if (e.current === bt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (-1 === [
				dt,
				at,
				xt
			].indexOf(t) && r === bt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.next;
			if (-1 !== [
				Pt,
				Ct,
				st,
				gt,
				At
			].indexOf(t)) return Jt.NotAllowed;
		},
		function(e) {
			if ($t(e.index, e.types) === pt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.index, r = e.types;
			if (er(ct, pt, t, r)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.index, r = e.types;
			if (er([Pt, Ct], kt, t, r)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.index, r = e.types;
			if (er(Ht, Ht, t, r)) return Jt.NotAllowed;
		},
		function(e) {
			if (e.current === dt) return Jt.Allowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (t === ct || r === ct) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.next, r = e.current;
			if (t === Mt || r === Mt) return Jt.Allowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (-1 !== [
				at,
				xt,
				kt
			].indexOf(r) || t === Nt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.index, r = e.types, n = e.current, i = t - 1;
			if ((i >= 0 ? r[i] : 0) === Ot && -1 !== Qt.indexOf(n)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (t === At && r === Ot) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current;
			if (e.next === Et && -1 !== qt.concat(Et, st, yt, jt, Rt, Ft).indexOf(t)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (-1 !== qt.indexOf(r) && t === yt || -1 !== qt.indexOf(t) && r === yt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (t === lt && -1 !== [
				jt,
				Rt,
				Ft
			].indexOf(r) || -1 !== [
				jt,
				Rt,
				Ft
			].indexOf(t) && r === vt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (-1 !== qt.indexOf(t) && -1 !== Dt.indexOf(r) || -1 !== Dt.indexOf(t) && -1 !== qt.indexOf(r)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.index, r = e.types, n = e.current, i = e.next, a = t - 1, o = t + 1;
			if (-1 !== [lt, vt].indexOf(n) && (i === yt || -1 !== [pt, xt].indexOf(i) && r[o + 1] === yt) || -1 !== [pt, xt].indexOf(n) && i === yt || n === yt && -1 !== [
				yt,
				At,
				gt
			].indexOf(i)) return Jt.NotAllowed;
			if (-1 !== [
				yt,
				At,
				gt,
				Pt,
				Ct
			].indexOf(i)) for (var u = t; u >= 0;) {
				if ((f = r[u]) === yt) return Jt.NotAllowed;
				if (-1 === [At, gt].indexOf(f)) break;
				u -= 1;
			}
			if (-1 !== [lt, vt].indexOf(i)) for (u = -1 !== [Pt, Ct].indexOf(n) ? a : t; u >= 0;) {
				var f;
				if ((f = r[u]) === yt) return Jt.NotAllowed;
				if (-1 === [At, gt].indexOf(f)) break;
				u -= 1;
			}
		},
		function(e) {
			var t = e.current, r = e.next;
			if (St === t && -1 !== [
				St,
				wt,
				Vt,
				Bt
			].indexOf(r) || -1 !== [wt, Vt].indexOf(t) && -1 !== [wt, Tt].indexOf(r) || -1 !== [Tt, Bt].indexOf(t) && r === Tt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (-1 !== Kt.indexOf(t) && -1 !== [Et, vt].indexOf(r) || -1 !== Kt.indexOf(r) && t === lt) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (-1 !== qt.indexOf(t) && -1 !== qt.indexOf(r)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (t === gt && -1 !== qt.indexOf(r)) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.current, r = e.next;
			if (-1 !== qt.concat(yt).indexOf(t) && r === pt || -1 !== qt.concat(yt).indexOf(r) && t === Ct) return Jt.NotAllowed;
		},
		function(e) {
			var t = e.index, r = e.types, n = e.indicies, i = e.current, a = e.next;
			if (i === Zt && a === Zt) {
				for (var o = n[t], u = 1; o > 0 && r[o -= 1] === Zt;) u += 1;
				if (u % 2 != 0) return Jt.NotAllowed;
			}
		},
		function(e) {
			var t = e.current, r = e.next;
			if (t === Rt && r === Ft) return Jt.NotAllowed;
		}
	], ar = [
		"Lu",
		"Ll",
		"Lt",
		"Lm",
		"Lo",
		"Nd",
		"Nl",
		"No"
	], or = E.createTrie(T.LineBreak);
	(function(e) {
		e[e.Auto = 0] = "Auto", e[e.Normal = 1] = "Normal", e[e.Loose = 2] = "Loose", e[e.Strict = 3] = "Strict";
	})(tr || (tr = {})), function(e) {
		e[e.Normal = 0] = "Normal", e[e.BreakAll = 1] = "BreakAll", e[e.BreakWord = 2] = "BreakWord", e[e.KeepAll = 3] = "KeepAll";
	}(rr || (rr = {})), function(e) {
		e[e.Ex = st] = "Ex", e[e.Sy = At] = "Sy";
	}(nr || (nr = {}));
	(function() {
		function e(e, t) {
			var r;
			void 0 === t && (t = {
				lineBreak: tr.Normal,
				wordBreak: rr.Normal
			}), this.nextIndex = 0, this.ustr = new et(e), this.codePoints = this.ustr.codePoints(), this.codePointLen = this.codePoints.length, this.forbiddenBreakClasses = t.forbidClasses || [], r = function(e, t) {
				var r = ur(e, t.lineBreak), n = r[0], i = r[1], a = r[2], o = i;
				return t.wordBreak !== rr.BreakAll && t.wordBreak !== rr.BreakWord || (o = i.map((function(e) {
					return -1 !== [
						yt,
						ht,
						It
					].indexOf(e) ? jt : e;
				}))), [
					n,
					o,
					t.wordBreak === rr.KeepAll ? a.map((function(t, r) {
						return t && e[r] >= 19968 && e[r] <= 40959;
					})) : null
				];
			}(this.codePoints, t), this.indicies = r[0], this.lineBreakClasses = r[1], this.forbiddenBreakpoints = r[2];
		}
		return e.prototype.getGraphemeInfoFromCodePointIndex = function(e) {
			var t = this.ustr.codePointIndex2CharCodeIndexRange(e), r = this.ustr.charCodeIndex2GraphemeIndex(t.start), n = this.ustr.graphemeIndex2CharCodeIndexRange(r), i = {
				start: this.ustr.charCodeIndex2CodePointIndex(n.start),
				end: this.ustr.charCodeIndex2CodePointIndex(n.end)
			};
			return {
				length: i.end - i.start + 1,
				range: i
			};
		}, e.prototype.next = function(e) {
			if (void 0 === e && (e = !1), this.nextIndex >= this.codePointLen) return null;
			for (var t = Jt.NotAllowed; this.nextIndex < this.codePointLen;) if ((t = fr(this.codePoints, this.lineBreakClasses, this.indicies, this.nextIndex += 1, this.forbiddenBreakpoints, this.forbiddenBreakClasses)) !== Jt.NotAllowed) {
				if (e) {
					var r = this.getGraphemeInfoFromCodePointIndex(this.nextIndex - 1), n = r.length, i = r.range;
					n > 1 && (this.nextIndex = i.start + n);
				}
				break;
			}
			return t !== Jt.NotAllowed || this.nextIndex === this.codePointLen ? {
				required: t === Jt.Mandatory,
				position: this.ustr.codePointIndex2CharCodeIndexRange(this.nextIndex - 1).end + 1
			} : null;
		}, e;
	})();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/line-layout/layout-cache.js
function _inherits$14(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$14(subClass, superClass);
}
function _set_prototype_of$14(o, p) {
	_set_prototype_of$14 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$14(o, p);
}
var LayoutCache;
var init_layout_cache = __esmMin((() => {
	init_tslib_es6();
	init_es();
	LayoutCache = /* @__PURE__ */ function(SharableCacheManager) {
		"use strict";
		_inherits$14(LayoutCache, SharableCacheManager);
		function LayoutCache() {
			return SharableCacheManager.apply(this, arguments) || this;
		}
		var _proto = LayoutCache.prototype;
		_proto.releasePools = function releasePools() {
			SharableCacheManager.prototype.releasePools.call(this);
		};
		return LayoutCache;
	}(SharableCacheManager);
	__decorate([
		debounceHighPriority(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], LayoutCache.prototype, "releasePools", null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/word-breaker/utils/regex.js
function initTibetanWordRegexString() {
	if (tibetanWordUnicodeString) return;
	tibetanWordUnicodeString = `${`[${TibetanLeftUnicodeRange.join("")}]+`}(?:[ \\u00A0]*${`[${[
		"\\u0F0B-\\u0F0C",
		"\\u0F0D-\\u0F12",
		"\\u0F14",
		"\\u0F7F"
	].join("")}]`}+)*\\u00A0*`;
}
function initWordRegex() {
	initCJKWordRegexString();
	initTibetanWordRegexString();
	if (commonRegexString || wordRegexString) return;
	commonRegexString = `[^${CJKUnicodeRangeList.join("")}${TibetanLeftUnicodeRange.join("")}${delimiters.join("")}]+`;
	wordRegexString = `${CJKWordRegexString}|${tibetanWordUnicodeString}|${commonRegexString}|( +)|([${delimiters.join("")}])|`;
}
function initCJKUnicodeString() {
	var regexList = [
		"\\u2F00-\\u30FF",
		"\\u3190-\\u319F",
		"\\u31C0-\\u33FF",
		"\\u3400-\\u4DBF",
		"\\u4E00-\\u9FFF",
		"\\uF900-\\uFAFF",
		"\\uFE10-\\uFE1F",
		"\\uFE30-\\uFE4F",
		"\\uFF00-\\uFFEF"
	];
	return isKorean ? regexList.concat(["\\u3130-\\u318F", "\\uAC00-\\uD7AF"]) : regexList;
}
function initCJKWordRegexString() {
	CJKUnicodeRangeList = initCJKUnicodeString();
	CJKUnicodeOptional = `[${CJKUnicodeRangeList.join("")}]`;
	CJKWordRegexString = `[\\u0028\\u005B\\u00AB\\u2018\\u201C\\u3008\\u300A\\u300C\\u300E\\u3010\\u3014\\u3016\\u3018\\u301D\\uFF08\\uFF3B\\uFF5F\\uFF5B]*${CJKUnicodeOptional}[\\u002C\\u0029\\u005D\\u00BB\\u2019\\u201D\\u3001\\u3009\\u300B\\u300D\\u300F\\u3011\\u3015\\u3017\\u3019\\u301F\\u3005\\u303B\\u30FC\\u30FD\\u30FE\\u30A1\\u30A3\\u30A5\\u30A7\\u30A9\\u30C3\\u30E3\\u30E5\\u30E7\\u30EE\\u30F5\\u30F6\\u3041\\u3043\\u3045\\u3047\\u3049\\u3063\\u3083\\u3085\\u3087\\u308E\\u3095\\u3096\\u31F0\\u31F1\\u31F2\\u31F3\\u31F4\\u31F5\\u31F6\\u31F7\\u31F8\\u31F9\\u31FA\\u31FB\\u31FC\\u31FD\\u31FE\\u31FF\\u2010\\u2013\\u301C\\u30A0\\u0021\\u002E\\u003A\\u003B\\u003F\\u203C\\u2047\\u2048\\u2049\\u3001\\u3002\\u30FB\\uFF01\\uFF1F\\uFF09\\uFF3D\\uFF5D\\uFF60]*`;
}
function getRegExpString() {
	if (wordRegexString) return wordRegexString;
	initWordRegex();
	return wordRegexString;
}
var isKorean, commonRegexString, wordRegexString, CJKUnicodeRangeList, CJKUnicodeOptional, CJKWordRegexString, TibetanLeftUnicodeRange, tibetanWordUnicodeString, delimiters, regex;
var init_regex = __esmMin((() => {
	isKorean = false;
	TibetanLeftUnicodeRange = [
		"\\u0F00-\\u0F0A",
		"\\u0F13",
		"\\u0F15-\\u0F7E",
		"\\u0F80-\\u0FFF"
	];
	delimiters = [
		"	",
		"\n",
		"",
		"\v",
		"\f",
		" "
	];
	regex = new RegExp(getRegExpString(), "gm");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/word-breaker/index.js
var WordBreaker;
var init_word_breaker = __esmMin((() => {
	init_regex();
	WordBreaker = /* @__PURE__ */ function() {
		"use strict";
		function WordBreaker(text) {
			this.text = text;
			this.regex = regex;
			this.lineBreakRegex = /* @__PURE__ */ new RegExp("\n|\r|\r\n", "gm");
			this.regex.lastIndex = 0;
		}
		var _proto = WordBreaker.prototype;
		_proto.getText = function getText() {
			return this.text;
		};
		_proto.getNextLineIndex = function getNextLineIndex() {
			this.lineBreakRegex.lastIndex = this.regex.lastIndex;
			var result = this.lineBreakRegex.exec(this.text);
			if (!result) return this.text.length;
			var [match] = result;
			return result.index + match.length;
		};
		_proto.seekTo = function seekTo(index) {
			this.regex.lastIndex = index;
		};
		_proto.next = function next() {
			var result = this.regex.exec(this.text);
			if (!result || result.index === this.text.length) return null;
			var [match] = result;
			return {
				text: match,
				start: result.index,
				end: result.index + match.length
			};
		};
		return WordBreaker;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/line-layout/index.js
function isEndBreak(str) {
	return str === "\n" || str === "\r" || str === "\r\n";
}
function trimBothSide(layoutLine) {
	var _a, _b;
	var words = layoutLine.data;
	if (isAllSpace((_a = words[0]) === null || _a === void 0 ? void 0 : _a.text)) layoutLine.width -= words.shift().width;
	if (isAllSpace((_b = words[words.length - 1]) === null || _b === void 0 ? void 0 : _b.text)) layoutLine.width -= words.pop().width;
}
function isAllSpace(str) {
	if (!str) return false;
	return /^\s+$/.test(str);
}
function findEdgePoint(layoutLine, maxWidth) {
	var { data: words } = layoutLine;
	if (words.length === 0) return null;
	var lineWidth = layoutLine.width;
	var previousIndex = words.length - 1;
	if (words[0].width >= maxWidth) return {
		word: words[0],
		limitWidth: maxWidth,
		index: 0
	};
	var item = words[0];
	for (var i = previousIndex; i >= 0; i--) {
		var word = words[i];
		previousIndex = i;
		if (lineWidth - word.width <= maxWidth) {
			item = word;
			break;
		}
		lineWidth -= word.width;
	}
	return {
		word: item,
		limitWidth: item.width - lineWidth + maxWidth,
		index: previousIndex
	};
}
function splitWordByWidth(params, isOnEmptyLine, maxWidth, measurer) {
	if (params.text === "") return [{
		text: "",
		width: 0
	}];
	var uString = new et(params.text);
	var graphemeStart = 0;
	var graphemeEnd = uString.graphemeCount() - 1;
	if (graphemeEnd === 0 && !isOnEmptyLine) return [{
		text: "",
		width: 0
	}, {
		text: params.text,
		width: params.width
	}];
	var breakIdx = graphemeEnd;
	for (;;) {
		var mid = Math.floor((graphemeEnd - graphemeStart) / 2 + graphemeStart);
		if (mid <= graphemeStart) {
			breakIdx = graphemeStart;
			break;
		}
		var width = measurer(uString.sliceByGrapheme(0, mid + 1).toString());
		if (width > maxWidth) graphemeEnd = mid;
		else if (width < maxWidth) graphemeStart = mid;
		else {
			breakIdx = mid;
			break;
		}
	}
	var breakLen = uString.graphemeIndex2CharCodeIndexRange(breakIdx).end + 1;
	if (params.text === "" || breakLen === params.text.length) return [{
		text: params.text,
		width: params.width
	}];
	var breakText = uString.sliceByGrapheme(0, breakIdx + 1).toString();
	var breakGlyph = measurer(breakText);
	if (!isOnEmptyLine && breakGlyph > maxWidth) return [{
		text: "",
		width: 0
	}, {
		text: params.text,
		width: params.width
	}];
	var firstWord = {
		text: breakText,
		width: breakGlyph
	};
	var restText = params.text.slice(breakLen);
	return [firstWord, {
		text: restText,
		width: measurer(restText)
	}];
}
/**
* 获取 layout cache 主键
* @param options
*/ function getLayoutCacheKey(options) {
	return `${options.measureUid} ${options.maxLineCount} ${options.maxWidth} ${options.wrapType} ${options.shouldAddEllipsis} ${options.needTrim} ${options.text}`;
}
var LineLayout;
var init_line_layout = __esmMin((() => {
	init_unitool_esm();
	init_layout_cache();
	init_word_breaker();
	LineLayout = /* @__PURE__ */ function() {
		"use strict";
		function LineLayout() {
			this.currentLineCount = 0;
		}
		var _proto = LineLayout.prototype;
		_proto.initState = function initState(text, params) {
			this.lineBreakIterator = new WordBreaker(text);
			this.maxWidth = params.maxWidth;
			this.maxLineCount = params.maxLineCount;
			this.needTrim = params.needTrim;
			this.measure = params.measure;
			this.ellipsisNode = params.ellipsis;
			this.wrapType = params.wrapType;
			this.currentLineCount = 0;
			this.splitLines = [];
		};
		/**
		* 文本分行主流程
		* 1. 不分行
		*  1.1 宽度够不用断行
		*  1.2 宽度不够，但是 wrapType 为 NONE
		*  1.3 宽度不够，但是末尾是「空格」也不用断行
		* 2. 分行
		*  2.1 宽度不够，wrapType 为 WORD，将当前 word 放到下一行
		*   2.1.1 空行，wrapType 为 WORD，切分后断行
		*  2.2 宽度不够，wrapType 为 CHAR，切分后断行
		*  2.3 宽度不够，
		* 3. 后面统一判断是否需要加 ellipsis
		*  3.1 每行 wrapType 为 NONE 时加 ellipsis
		*  3.2 最后换行时超出 maxLineCount 时加 ellipsis
		*/ _proto.getBreakLineResult = function getBreakLineResult() {
			var lineWidth = this.maxWidth;
			var { wrapType } = this;
			var limitWidth = lineWidth;
			var isOnEmptyLine = limitWidth === lineWidth;
			var splitWords = [];
			var lines = [];
			var splitWordsWidth = 0;
			var breakWord;
			var appendWords = (text, width) => {
				splitWords.push({
					text,
					width
				});
				splitWordsWidth += width;
				isOnEmptyLine = width > 0 ? false : isOnEmptyLine;
			};
			var addNewLine = (ellipsis) => {
				lines.push({
					data: splitWords,
					width: splitWordsWidth,
					ellipsis
				});
				this.currentLineCount += 1;
				splitWords = [];
				splitWordsWidth = 0;
				limitWidth = lineWidth;
				isOnEmptyLine = true;
			};
			var splitAndNewLine = (currentWord, currentWordWidth, noWrap, ellipsis) => {
				for (var grapheme of new et(currentWord).graphemes()) {
					var str = grapheme.toString();
					var width = this.measure(str);
					if (splitWordsWidth + width > limitWidth) {
						if (noWrap) {
							addNewLine(ellipsis);
							return;
						}
						if (this.shouldContinue()) {
							addNewLine(ellipsis);
							appendWords(str, width);
						} else return;
					} else appendWords(str, width);
				}
			};
			while ((breakWord = this.next()) && this.shouldContinue()) {
				var currentWord = breakWord.text;
				if (isEndBreak(currentWord)) {
					addNewLine(false);
					continue;
				}
				var currentWordWidth = this.measure(currentWord);
				if (splitWordsWidth + currentWordWidth <= limitWidth) {
					appendWords(currentWord, currentWordWidth);
					continue;
				}
				if (wrapType === 1) {
					splitAndNewLine(currentWord, currentWordWidth, true, true);
					this.seekToNextLine();
					continue;
				}
				if (isAllSpace(currentWord)) continue;
				if (!isOnEmptyLine && wrapType === 3) {
					addNewLine();
					if (currentWordWidth > lineWidth) splitAndNewLine(currentWord, currentWordWidth, false, false);
					else appendWords(currentWord, currentWordWidth);
					continue;
				}
				splitAndNewLine(currentWord, currentWordWidth, false);
			}
			if (splitWordsWidth > 0 && splitWordsWidth <= limitWidth && this.shouldContinue()) addNewLine();
			function shouldLastLineAppendEllipsis() {
				if (splitWords.length > 0) return true;
				if (breakWord) return true;
				return false;
			}
			lines.forEach((line, index) => {
				if (this.needTrim) trimBothSide(line);
				if (line.ellipsis || index === lines.length - 1 && shouldLastLineAppendEllipsis()) this.appendEllipsis(line);
				this.splitLines.push({
					text: line.data.reduce((text, word) => text + word.text, ""),
					width: line.width
				});
			});
			return this.splitLines;
		};
		_proto.seekToNextLine = function seekToNextLine() {
			var nextLineIndex = this.lineBreakIterator.getNextLineIndex();
			this.lineBreakIterator.seekTo(nextLineIndex);
		};
		_proto.appendEllipsis = function appendEllipsis(line) {
			var { ellipsisNode } = this;
			if (!ellipsisNode) return;
			var { data: splitWords } = line;
			if (line.width + ellipsisNode.width <= this.maxWidth) {
				splitWords.push({
					text: ellipsisNode.content,
					width: ellipsisNode.width
				});
				line.width += ellipsisNode.width;
				return;
			}
			var isEllipsisOverflow = ellipsisNode.width > this.maxWidth;
			if (splitWords.length === 0 && !isEllipsisOverflow) {
				splitWords.push({
					text: ellipsisNode.content,
					width: ellipsisNode.width
				});
				line.width += ellipsisNode.width;
				return;
			}
			if (isEllipsisOverflow) {
				splitWords = [{
					text: ellipsisNode.content,
					width: ellipsisNode.width
				}];
				line.data = splitWords;
				line.width = ellipsisNode.width;
			}
			var result = findEdgePoint(line, this.maxWidth - ellipsisNode.width);
			if (result === null) return;
			var { word: splitItem, limitWidth, index } = result;
			var [firstWord, secondWord] = splitWordByWidth(splitItem, index === 0, limitWidth, this.measure);
			var secondWordWidth = secondWord ? secondWord.width : 0;
			if (isEllipsisOverflow) {
				splitWords = splitWords.slice(0, index).concat([{
					text: firstWord.text,
					width: firstWord.width
				}]);
				line.data = splitWords;
				line.width -= secondWordWidth;
				return;
			}
			splitWords = splitWords.slice(0, index).concat({
				text: firstWord.text + ellipsisNode.content,
				width: firstWord.width + ellipsisNode.width
			});
			line.data = splitWords;
			line.width = splitWords.reduce((preWidth, word) => preWidth + word.width, 0);
		};
		_proto.shouldContinue = function shouldContinue() {
			if (this.currentLineCount === 0) return true;
			return this.currentLineCount + 1 <= this.maxLineCount;
		};
		/**
		* 查找下一个文本分割点
		*/ _proto.next = function next() {
			return this.lineBreakIterator.next();
		};
		LineLayout.breakLine = function breakLine(text, params) {
			var lineLayout = LineLayout.getInstance();
			lineLayout.initState(text, params);
			var cacheKey = getLayoutCacheKey({
				text,
				maxLineCount: params.maxLineCount,
				maxWidth: params.maxWidth,
				wrapType: params.wrapType,
				needTrim: params.needTrim,
				measureUid: params.measureUid,
				shouldAddEllipsis: !!params.ellipsis
			});
			var lines = LineLayout.layoutCache.getCache(cacheKey);
			if (!lines) {
				lines = lineLayout.getBreakLineResult();
				LineLayout.layoutCache.setCache(cacheKey, lines);
			}
			return lines;
		};
		LineLayout.getInstance = function getInstance() {
			if (!LineLayout.instance) LineLayout.instance = new LineLayout();
			return LineLayout.instance;
		};
		return LineLayout;
	}();
	LineLayout.layoutCache = new LayoutCache();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/word-measurer/utils/context.js
function normalizeFontFamily(fontFamily) {
	return fontFamily.split(",").map((fontFamily) => {
		var correctedFontFamily = fontFamily.trim();
		var hasSpace = correctedFontFamily.indexOf(" ") >= 0;
		var hasQuotes = correctedFontFamily.indexOf("\"") >= 0 || correctedFontFamily.indexOf("'") >= 0;
		if (hasSpace && !hasQuotes) correctedFontFamily = `"${correctedFontFamily}"`;
		return correctedFontFamily;
	}).join(", ");
}
function getContextFont(fontInfo) {
	var { fontStyle, fontVariant, fontSize, fontFamily } = fontInfo;
	return `${fontStyle} ${fontVariant} ${fontSize}px ${normalizeFontFamily(fontFamily)}`;
}
var init_context = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/word-measurer/index.js
function _inherits$13(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$13(subClass, superClass);
}
function _set_prototype_of$13(o, p) {
	_set_prototype_of$13 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$13(o, p);
}
var import_main$14, WordMeasurer;
var init_word_measurer = __esmMin((() => {
	import_main$14 = require_main();
	init_context();
	WordMeasurer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$13(WordMeasurer, Disposable);
		function WordMeasurer(uid, fontInfo) {
			var _this = Disposable.call(this) || this;
			_this.uid = uid;
			_this.fontStyle = fontInfo.fontStyle;
			_this.fontVariant = fontInfo.fontVariant;
			_this.fontFamily = fontInfo.fontFamily;
			_this.fontSize = fontInfo.fontSize;
			_this.lineHeight = fontInfo.lineHeight;
			_this.updateCanvasContext();
			return _this;
		}
		var _proto = WordMeasurer.prototype;
		_proto.dispose = function dispose() {
			WordMeasurer.wordMeasureCaches.delete(this.uid);
			Disposable.prototype.dispose.call(this);
		};
		_proto.measureWord = function measureWord(word) {
			var wordMeasureCache = this.getWordMeasureCache();
			var cacheWidth = wordMeasureCache === null || wordMeasureCache === void 0 ? void 0 : wordMeasureCache.get(word);
			if (cacheWidth) return cacheWidth;
			var width = this.measureWordBrowser(word);
			wordMeasureCache.set(word, width);
			return width;
		};
		_proto.measureWordBrowser = function measureWordBrowser(word) {
			var canvasContext = WordMeasurer.getCanvasContext();
			if (!canvasContext) return 0;
			this.setStyle();
			var { width } = canvasContext.measureText(word);
			return width;
		};
		_proto.updateCanvasContext = function updateCanvasContext() {
			var canvasContext = WordMeasurer.getCanvasContext();
			if (!canvasContext) return null;
			WordMeasurer.currentUid = this.uid;
			canvasContext.font = getContextFont({
				fontStyle: this.fontStyle,
				fontVariant: this.fontVariant,
				fontSize: this.fontSize,
				fontFamily: this.fontFamily
			});
			return canvasContext;
		};
		_proto.setStyle = function setStyle() {
			if (WordMeasurer.currentUid === this.uid) return;
			this.updateCanvasContext();
		};
		_proto.getWordMeasureCache = function getWordMeasureCache() {
			var wordMeasureCache = WordMeasurer.wordMeasureCaches.get(this.uid);
			if (wordMeasureCache) return wordMeasureCache;
			wordMeasureCache = /* @__PURE__ */ new Map();
			WordMeasurer.wordMeasureCaches.set(this.uid, wordMeasureCache);
			return wordMeasureCache;
		};
		WordMeasurer.obtain = function obtain(fontInfo) {
			var uid = WordMeasurer.getUid(fontInfo);
			var instance = WordMeasurer.wordMeasurerInstanceMap.get(uid);
			if (!instance) {
				instance = new WordMeasurer(uid, fontInfo);
				WordMeasurer.wordMeasurerInstanceMap.set(uid, instance);
			}
			return instance;
		};
		WordMeasurer.fromHashMapJSON = function fromHashMapJSON(json) {
			var maxUid = 0;
			var hashMap = /* @__PURE__ */ new Map();
			for (var [contextFont, uid] of Object.entries(json)) {
				hashMap.set(contextFont, uid);
				maxUid = Math.max(maxUid, uid);
			}
			WordMeasurer.hashMap = hashMap;
			WordMeasurer.maxUid = maxUid + 1;
		};
		WordMeasurer.toHashMapJSON = function toHashMapJSON() {
			return Object.fromEntries(WordMeasurer.hashMap);
		};
		WordMeasurer.fromWordMeasureCachesJSON = function fromWordMeasureCachesJSON(json) {
			var wordMeasureCaches = /* @__PURE__ */ new Map();
			for (var [uid, cache] of Object.entries(json)) {
				var wordMeasureCache = /* @__PURE__ */ new Map();
				for (var [key, width] of Object.entries(cache)) wordMeasureCache.set(key, width);
				wordMeasureCaches.set(Number(uid), wordMeasureCache);
			}
			WordMeasurer.wordMeasureCaches = wordMeasureCaches;
		};
		WordMeasurer.toWordMeasureCachesJSON = function toWordMeasureCachesJSON() {
			var json = {};
			WordMeasurer.wordMeasureCaches.forEach((value, key) => {
				json[key] = Object.fromEntries(value);
			});
			return json;
		};
		WordMeasurer.getCanvasContext = function getCanvasContext() {
			var _a;
			if (!WordMeasurer.canvas) WordMeasurer.canvas = document.createElement("canvas");
			if (!WordMeasurer.canvasContext) WordMeasurer.canvasContext = (_a = WordMeasurer.canvas) === null || _a === void 0 ? void 0 : _a.getContext("2d");
			return WordMeasurer.canvasContext;
		};
		WordMeasurer.getUid = function getUid(fontInfo) {
			var contextFont = getContextFont(fontInfo);
			var uid = WordMeasurer.hashMap.get(contextFont);
			if (typeof uid !== "undefined") return uid;
			WordMeasurer.maxUid += 1;
			WordMeasurer.hashMap.set(contextFont, WordMeasurer.maxUid);
			return WordMeasurer.maxUid;
		};
		return WordMeasurer;
	}(import_main$14.Disposable);
	WordMeasurer.hashMap = /* @__PURE__ */ new Map();
	WordMeasurer.maxUid = 0;
	WordMeasurer.currentUid = 0;
	WordMeasurer.canvasContext = null;
	WordMeasurer.canvas = null;
	WordMeasurer.wordMeasurerInstanceMap = /* @__PURE__ */ new Map();
	WordMeasurer.wordMeasureCaches = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/text-measurer/index.js
var TextMeasurer;
var init_text_measurer = __esmMin((() => {
	init_line_layout();
	init_word_measurer();
	TextMeasurer = /* @__PURE__ */ function() {
		"use strict";
		function TextMeasurer() {
			this.getWordWidth = (text) => this.wordMeasurer.measureWord(text);
		}
		var _proto = TextMeasurer.prototype;
		_proto.width = function width(config, maxWidth) {
			var _a;
			this.updateWordMeasurer(config);
			return LineLayout.breakLine((_a = config.text) !== null && _a !== void 0 ? _a : "", {
				maxLineCount: 1,
				maxWidth: maxWidth || Infinity,
				wrapType: 1,
				needTrim: false,
				ellipsis: null,
				measureUid: this.wordMeasurer.uid,
				measure: this.getWordWidth
			}).reduce((maxWidth, line) => Math.max(maxWidth, line.width), 0);
		};
		_proto.lines = function lines(config, maxLineCount = Infinity) {
			var _a;
			this.updateWordMeasurer(config);
			return LineLayout.breakLine((_a = config.text) !== null && _a !== void 0 ? _a : "", {
				maxLineCount,
				maxWidth: config.width || 0,
				wrapType: this.getWrapType(config),
				ellipsis: this.getEllipsis(config),
				needTrim: false,
				measureUid: this.wordMeasurer.uid,
				measure: this.getWordWidth
			});
		};
		_proto.getWrapType = function getWrapType(config) {
			switch (config.wrap) {
				case "none": return 1;
				case "char": return 2;
				default: return 3;
			}
		};
		_proto.getEllipsis = function getEllipsis(config) {
			if (config.ellipsis) return {
				content: TextMeasurer.char.ellipsis,
				width: this.getWordWidth(TextMeasurer.char.ellipsis)
			};
			return null;
		};
		_proto.updateWordMeasurer = function updateWordMeasurer(config) {
			var { fontSize = 12, lineHeight = 12, fontStyle = "normal", fontFamily = "Arial", fontVariant = "normal" } = config;
			this.wordMeasurer = WordMeasurer.obtain({
				fontSize,
				fontStyle,
				fontFamily,
				fontVariant,
				lineHeight
			});
		};
		return TextMeasurer;
	}();
	TextMeasurer.char = {
		break: "\n",
		ellipsis: "…"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/text/measurer/index.js
/**
* 计算文本绘制布局
*/ function measureTextLayouts(config) {
	var _a;
	var lineHeightPx = getLineHeightPx(config);
	var drawWidth = getDrawWidth(config);
	var drawHeight = config.height || lineHeightPx;
	if (drawHeight <= 0 || drawWidth <= 0) return [];
	if (config.width === void 0) config.width = drawWidth;
	var maxLineCount = (_a = config.maxLines) !== null && _a !== void 0 ? _a : Math.floor(drawHeight / lineHeightPx);
	var lines = textMeasurer.lines(config, maxLineCount);
	if (lines.length === 1) return [calcSingleLineLayout(0, lines, drawWidth, drawHeight, config)];
	var layouts = [];
	for (var i = 0; i < lines.length; i++) layouts.push(calcSingleLineLayout(i, lines, drawWidth, drawHeight, config));
	return layouts;
}
function getFontSize(config) {
	return config.fontSize || 13;
}
function getLineHeight(config) {
	return config.lineHeight || 1;
}
function getHorizontalAlign(config) {
	return config.align || defaultHorizontalAlign;
}
function getVerticalAlign(config) {
	return config.verticalAlign || defaultVerticalAlign;
}
/**
* 获取当前文本行的绘制布局
*/ function calcSingleLineLayout(lineIndex, lines, totalWidth, totalHeight, config) {
	var word = lines[lineIndex];
	var width = Math.ceil(word.width);
	return {
		x: calcTranslateX(width, totalWidth, config),
		y: calcTranslateY(lineIndex, lines.length, totalHeight, config),
		text: autoAddEllipsis(lineIndex, lines, totalWidth, config),
		width,
		height: getFontSize(config)
	};
}
/**
* 计算当前文本所在的水平偏移量
*/ function calcTranslateX(wordWidth, totalWidth, config) {
	var horizontalAlign = getHorizontalAlign(config);
	switch (horizontalAlign) {
		case "center":
		case "right": return Math.round((totalWidth - wordWidth) / (horizontalAlign === "center" ? 2 : 1));
		default: return 0;
	}
}
/**
* 计算当前文本所在的垂直偏移量
*/ function calcTranslateY(lineIndex, lineCount, totalHeight, config) {
	var fontSize = getFontSize(config);
	var verticalAlign = getVerticalAlign(config);
	var translateY = 0;
	var lineHeightPx = getLineHeightPx(config);
	var lineHeightTranslateY = (lineHeightPx - fontSize) / 2;
	switch (verticalAlign) {
		case "middle":
		case "bottom":
			var firstLineY = (totalHeight - lineHeightPx * lineCount) / (verticalAlign === "middle" ? 2 : 1);
			translateY += firstLineY + lineIndex * lineHeightPx + lineHeightTranslateY;
			break;
		default: translateY += lineHeightPx * lineIndex + lineHeightTranslateY;
	}
	return Math.round(translateY);
}
/**
* 获取一行所占据的高度
*/ function getLineHeightPx(config) {
	var fontSize = getFontSize(config);
	var lineHeight = getLineHeight(config);
	return Math.round(fontSize * lineHeight);
}
/**
* 获取渲染宽度
*/ function getDrawWidth(config) {
	if (config.width) return config.width;
	return textMeasurer.width(config);
}
/**
* 判断并添加省略号
*/ function autoAddEllipsis(lineIndex, lines, totalWidth, config) {
	var fullText = config.text;
	var { text, width } = lines[lineIndex];
	var ellipsisCharWidth = config.fontSize;
	if (text.length === fullText.length) return fullText;
	if (lineIndex !== lines.length - 1) return text;
	if (lines.map((line) => line.text).join("").length === fullText.replace(/\n/g, "").length) return text;
	if (text.endsWith(TextMeasurer.char.ellipsis)) return text;
	var restWidth = totalWidth - ellipsisCharWidth;
	if (width < restWidth || restWidth <= 0) return text;
	while (width > restWidth) {
		text = text.substring(0, text.length - 1);
		width = textMeasurer.width(Object.assign(Object.assign({}, config), { text }));
	}
	return `${text}${TextMeasurer.char.ellipsis}`;
}
var textMeasurer, defaultHorizontalAlign, defaultVerticalAlign, TextChar, measureTextWidth;
var init_measurer = __esmMin((() => {
	init_text_measurer();
	textMeasurer = new TextMeasurer();
	defaultHorizontalAlign = "left";
	defaultVerticalAlign = "middle";
	TextChar = TextMeasurer.char;
	measureTextWidth = (config, maxWidth) => textMeasurer.width(config, maxWidth);
}));
//#endregion
//#region ../../node_modules/lodash/uniqueId.js
var require_uniqueId = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = require_toString();
	/** Used to generate unique IDs. */
	var idCounter = 0;
	/**
	* Generates a unique ID. If `prefix` is given, the ID is appended to it.
	*
	* @static
	* @since 0.1.0
	* @memberOf _
	* @category Util
	* @param {string} [prefix=''] The value to prefix the ID with.
	* @returns {string} Returns the unique ID.
	* @example
	*
	* _.uniqueId('contact_');
	* // => 'contact_104'
	*
	* _.uniqueId();
	* // => '105'
	*/
	function uniqueId(prefix) {
		var id = ++idCounter;
		return toString(prefix) + id;
	}
	module.exports = uniqueId;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/shapes/interface.js
var DrawType$1;
var init_interface$3 = __esmMin((() => {
	(function(DrawType) {
		DrawType["Polygon"] = "Polygon";
		DrawType["Bitmap"] = "Bitmap";
		DrawType["Corner"] = "Corner";
		DrawType["Line"] = "Line";
		DrawType["Rect"] = "Rect";
		DrawType["Text"] = "Text";
	})(DrawType$1 || (DrawType$1 = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/utils/blend.js
var MixBlendMode;
var init_blend = __esmMin((() => {
	MixBlendMode = /* @__PURE__ */ function() {
		"use strict";
		function MixBlendMode() {}
		var _proto = MixBlendMode.prototype;
		_proto.apply = function apply(context, option) {
			if (option.mixBlendMode === "difference") context.globalCompositeOperation = "difference";
		};
		_proto.release = function release(context, option) {
			if (option.mixBlendMode === "difference") context.globalCompositeOperation = "source-over";
		};
		return MixBlendMode;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/utils/clip.js
var Clip;
var init_clip = __esmMin((() => {
	Clip = /* @__PURE__ */ function() {
		"use strict";
		function Clip() {}
		var _proto = Clip.prototype;
		_proto.apply = function apply(context, x, y, width, height) {
			var clipArea = typeof x === "object" ? x.clipArea : {
				x,
				y,
				width,
				height
			};
			if (!clipArea) return false;
			context.save();
			context.beginPath();
			context.rect(clipArea.x, clipArea.y, clipArea.width, clipArea.height);
			context.clip();
			return true;
		};
		_proto.release = function release(context, option) {
			if (typeof option === "object" && option.clipArea || typeof option === "boolean" && option) {
				context.restore();
				return true;
			}
			return false;
		};
		return Clip;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/utils/dash.js
function resolveDashPattern(borderDash) {
	if (Array.isArray(borderDash)) return borderDash.length > 0 ? borderDash : null;
	if (borderDash === true) return DEFAULT_DASH_PATTERN;
	return null;
}
var DEFAULT_DASH_PATTERN, BorderDash;
var init_dash = __esmMin((() => {
	DEFAULT_DASH_PATTERN = [4, 4];
	BorderDash = /* @__PURE__ */ function() {
		"use strict";
		function BorderDash() {}
		var _proto = BorderDash.prototype;
		_proto.apply = function apply(context, option) {
			var pattern = resolveDashPattern(option.borderDash);
			if (pattern) context.setLineDash(pattern);
		};
		_proto.release = function release(context, option) {
			if (resolveDashPattern(option.borderDash)) context.setLineDash([]);
		};
		return BorderDash;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/utils/opacity.js
var Opacity;
var init_opacity = __esmMin((() => {
	Opacity = /* @__PURE__ */ function() {
		"use strict";
		function Opacity() {}
		var _proto = Opacity.prototype;
		_proto.apply = function apply(context, option) {
			if (typeof option.opacity !== "undefined" && option.opacity !== 1) context.globalAlpha = option.opacity;
		};
		_proto.release = function release(context, option) {
			if (typeof option.opacity !== "undefined" && option.opacity !== 1) context.globalAlpha = 1;
		};
		return Opacity;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/utils/rotate.js
var Rotate;
var init_rotate = __esmMin((() => {
	Rotate = /* @__PURE__ */ function() {
		"use strict";
		function Rotate() {}
		var _proto = Rotate.prototype;
		_proto.apply = function apply(context, rect, option) {
			if (option.rotate) {
				context.save();
				context.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
				context.rotate(option.rotate * Math.PI / 180);
				context.translate(-rect.x - rect.width / 2, -rect.y - rect.height / 2);
			}
		};
		_proto.release = function release(context, option) {
			if (option.rotate) context.restore();
		};
		return Rotate;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/utils/shadow.js
var Shadow;
var init_shadow = __esmMin((() => {
	Shadow = /* @__PURE__ */ function() {
		"use strict";
		function Shadow() {
			this.defaultBlur = 0;
			this.defaultColor = "rgba(0, 0, 0, 0)";
		}
		var _proto = Shadow.prototype;
		_proto.apply = function apply(context, option) {
			if (option.shadowBlur || option.shadowColor) {
				context.shadowBlur = option.shadowBlur || this.defaultBlur;
				context.shadowColor = option.shadowColor || this.defaultColor;
			}
		};
		_proto.release = function release(context, option) {
			if (option.shadowBlur || option.shadowColor) {
				context.shadowBlur = this.defaultBlur;
				context.shadowColor = this.defaultColor;
			}
		};
		return Shadow;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/utils/index.js
var ContextUtil;
var init_utils = __esmMin((() => {
	init_blend();
	init_clip();
	init_dash();
	init_opacity();
	init_rotate();
	init_shadow();
	ContextUtil = /* @__PURE__ */ function() {
		"use strict";
		function ContextUtil() {
			this.clip = new Clip();
			this.rotate = new Rotate();
			this.shadow = new Shadow();
			this.opacity = new Opacity();
			this.borderDash = new BorderDash();
			this.blend = new MixBlendMode();
		}
		var _proto = ContextUtil.prototype;
		_proto.getBoundingPosition = function getBoundingPosition(config) {
			return {
				x: config.x + (config.offsetX || 0),
				y: config.y + (config.offsetY || 0)
			};
		};
		_proto.getBoundingRect = function getBoundingRect(config) {
			return Object.assign(Object.assign({}, this.getBoundingPosition(config)), {
				width: config.width,
				height: config.height
			});
		};
		_proto.roundRect = function roundRect(context, x, y, width, height, radius) {
			var radiusValue = typeof radius === "number" ? radius : 0;
			var leftTop = radiusValue;
			var rightTop = radiusValue;
			var rightBottom = radiusValue;
			var leftBottom = radiusValue;
			if (Array.isArray(radius)) [leftTop, rightTop, rightBottom, leftBottom] = radius;
			else if (width === height && radius === width / 2) {
				context.beginPath();
				context.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
				context.closePath();
				return;
			}
			context.beginPath();
			context.moveTo(x + leftTop, y);
			context.lineTo(x + width - rightTop, y);
			context.quadraticCurveTo(x + width, y, x + width, y + rightTop);
			context.lineTo(x + width, y + height - rightBottom);
			context.quadraticCurveTo(x + width, y + height, x + width - rightBottom, y + height);
			context.lineTo(x + leftBottom, y + height);
			context.quadraticCurveTo(x, y + height, x, y + height - leftBottom);
			context.lineTo(x, y + leftTop);
			context.quadraticCurveTo(x, y, x + leftTop, y);
			context.closePath();
		};
		return ContextUtil;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/api/index.js
var Api, api;
var init_api = __esmMin((() => {
	init_bitmap();
	init_corner();
	init_interface$3();
	init_line();
	init_polygon();
	init_rect();
	init_text();
	init_utils();
	Api = /* @__PURE__ */ function() {
		"use strict";
		function Api() {
			this.util = new ContextUtil();
			this.line = new LineApi(this.util);
			this.rect = new RectApi(this.util);
			this.text = new TextApi(this.util);
			this.bitmap = new BitmapApi(this.util);
			this.corner = new CornerApi(this.util);
			this.polygon = new PolygonApi(this.util);
			this.apis = /* @__PURE__ */ new Map();
			this.apis.set(DrawType$1.Line, this.line);
			this.apis.set(DrawType$1.Rect, this.rect);
			this.apis.set(DrawType$1.Text, this.text);
			this.apis.set(DrawType$1.Bitmap, this.bitmap);
			this.apis.set(DrawType$1.Corner, this.corner);
			this.apis.set(DrawType$1.Polygon, this.polygon);
		}
		var _proto = Api.prototype;
		_proto.draw = function draw(context, config) {
			var _a;
			(_a = this.apis.get(config.type)) === null || _a === void 0 || _a.draw(context, config);
		};
		_proto.drawBatch = function drawBatch(context, type, maps) {
			var _a;
			(_a = this.apis.get(type)) === null || _a === void 0 || _a.drawBatch(context, maps);
		};
		return Api;
	}();
	api = new Api();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/shared/level.js
var Level;
var init_level = __esmMin((() => {
	(function(Level) {
		Level[Level["L0"] = 0] = "L0";
		Level[Level["L1"] = 1] = "L1";
		Level[Level["L2"] = 2] = "L2";
	})(Level || (Level = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/group/pool.js
function mapToArray(map) {
	return map ? Array.from(map.values()).flatMap((set) => Array.from(set)) : [];
}
var Pool;
var init_pool = __esmMin((() => {
	init_api();
	init_bitmap();
	init_corner();
	init_interface$3();
	init_line();
	init_polygon();
	init_rect();
	init_text();
	init_level();
	Pool = /* @__PURE__ */ function() {
		"use strict";
		function Pool(useBatch) {
			this.useBatch = useBatch;
		}
		var _proto = Pool.prototype;
		_proto.add = function add(config) {
			var _a;
			var batchInfo = this.getBatchInfo(config);
			if (batchInfo) {
				var [batchKey, batchMap] = batchInfo;
				var sets = (_a = batchMap.get(batchKey)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
				sets.add(config);
				batchMap.set(batchKey, sets);
				return;
			}
			if (!this.configs) this.configs = [];
			this.configs.push(config);
		};
		_proto.draw = function draw(context) {
			if (this.rects_0) api.drawBatch(context, DrawType$1.Rect, this.rects_0);
			if (this.lines_0) api.drawBatch(context, DrawType$1.Line, this.lines_0);
			if (this.rects_1) api.drawBatch(context, DrawType$1.Rect, this.rects_1);
			if (this.lines_1) api.drawBatch(context, DrawType$1.Line, this.lines_1);
			if (this.rects_2) api.drawBatch(context, DrawType$1.Rect, this.rects_2);
			if (this.texts) api.drawBatch(context, DrawType$1.Text, this.texts);
			if (this.polygons) api.drawBatch(context, DrawType$1.Polygon, this.polygons);
			if (this.bitmaps) api.drawBatch(context, DrawType$1.Bitmap, this.bitmaps);
			if (this.lines_2) api.drawBatch(context, DrawType$1.Line, this.lines_2);
			if (this.corners) api.drawBatch(context, DrawType$1.Corner, this.corners);
			if (this.configs) for (var config of this.configs) api.draw(context, config);
		};
		_proto.clear = function clear() {
			var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
			(_a = this.texts) === null || _a === void 0 || _a.clear();
			(_b = this.rects_0) === null || _b === void 0 || _b.clear();
			(_c = this.rects_1) === null || _c === void 0 || _c.clear();
			(_d = this.rects_2) === null || _d === void 0 || _d.clear();
			(_e = this.polygons) === null || _e === void 0 || _e.clear();
			(_f = this.bitmaps) === null || _f === void 0 || _f.clear();
			(_g = this.lines_0) === null || _g === void 0 || _g.clear();
			(_h = this.lines_1) === null || _h === void 0 || _h.clear();
			(_j = this.lines_2) === null || _j === void 0 || _j.clear();
			(_k = this.corners) === null || _k === void 0 || _k.clear();
			if (this.configs) this.configs = [];
		};
		_proto.getFlattenConfigs = function getFlattenConfigs() {
			var _a;
			return [
				...mapToArray(this.rects_0),
				...mapToArray(this.rects_1),
				...mapToArray(this.rects_2),
				...mapToArray(this.texts),
				...mapToArray(this.bitmaps),
				...mapToArray(this.lines_0),
				...mapToArray(this.lines_1),
				...mapToArray(this.lines_2),
				...mapToArray(this.corners),
				...(_a = this.configs) !== null && _a !== void 0 ? _a : []
			];
		};
		_proto.getBatchInfo = function getBatchInfo(config) {
			if (!this.useBatch) return;
			if (config.type === DrawType$1.Rect) return this.getRectBatchInfo(config);
			if (config.type === DrawType$1.Text) return [TextApi.toBatchKey(config), this.texts || (this.texts = /* @__PURE__ */ new Map())];
			if (config.type === DrawType$1.Polygon) return [PolygonApi.toBatchKey(config), this.polygons || (this.polygons = /* @__PURE__ */ new Map())];
			if (config.type === DrawType$1.Bitmap) return [BitmapApi.toBatchKey(config), this.bitmaps || (this.bitmaps = /* @__PURE__ */ new Map())];
			if (config.type === DrawType$1.Line) return this.getLineBatchInfo(config);
			if (config.type === DrawType$1.Corner) return [CornerApi.toBatchKey(config), this.corners || (this.corners = /* @__PURE__ */ new Map())];
		};
		_proto.getRectBatchInfo = function getRectBatchInfo(config) {
			var { level } = config;
			if (typeof level !== "number" || level === Level.L0) return [RectApi.toBatchKey(config), this.rects_0 || (this.rects_0 = /* @__PURE__ */ new Map())];
			if (level === Level.L1) return [RectApi.toBatchKey(config), this.rects_1 || (this.rects_1 = /* @__PURE__ */ new Map())];
			if (level === Level.L2) return [RectApi.toBatchKey(config), this.rects_2 || (this.rects_2 = /* @__PURE__ */ new Map())];
		};
		_proto.getLineBatchInfo = function getLineBatchInfo(config) {
			var { level } = config;
			if (typeof level !== "number" || level === Level.L2) return [LineApi.toBatchKey(config), this.lines_2 || (this.lines_2 = /* @__PURE__ */ new Map())];
			if (level === Level.L0) return [LineApi.toBatchKey(config), this.lines_0 || (this.lines_0 = /* @__PURE__ */ new Map())];
			if (level === Level.L1) return [LineApi.toBatchKey(config), this.lines_1 || (this.lines_1 = /* @__PURE__ */ new Map())];
		};
		return Pool;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/group/index.js
function _defineProperties$6(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$6(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$6(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$6(Constructor, staticProps);
	return Constructor;
}
var import_uniqueId, Group;
var init_group = __esmMin((() => {
	import_uniqueId = /* @__PURE__ */ __toESM(require_uniqueId());
	init_es();
	init_api();
	init_pool();
	Group = /* @__PURE__ */ function() {
		"use strict";
		function Group(config) {
			this.config = config;
			this.parent = null;
			this.pool = new Pool(this.config.batch);
		}
		var _proto = Group.prototype;
		_proto.getAttr = function getAttr(key) {
			return this.config[key];
		};
		_proto.setAttr = function setAttr(key, value) {
			if (this.config[key] !== value) {
				this.config[key] = value;
				this.draw();
			}
		};
		_proto.getAttrs = function getAttrs() {
			return this.config;
		};
		_proto.setAttrs = function setAttrs(attrs) {
			Object.assign(this.config, attrs);
			this.draw();
		};
		_proto.draw = function draw(context) {
			var _a, _b;
			if (!context) {
				(_a = this.parent) === null || _a === void 0 || _a.draw();
				return;
			}
			var clip = this.config.overflow !== "visible";
			if (clip) api.util.clip.apply(context, this.config.x, this.config.y, this.config.width, this.config.height);
			api.util.opacity.apply(context, this.config);
			var rect = api.util.getBoundingRect(this.config);
			api.util.rotate.apply(context, rect, this.config);
			this.pool.draw(context);
			(_b = this.groups) === null || _b === void 0 || _b.forEach((group) => group.draw(context));
			api.util.rotate.release(context, this.config);
			api.util.opacity.release(context, this.config);
			if (clip) api.util.clip.release(context, true);
		};
		_proto.add = function add(config, offsetX = 0, offsetY = 0, clipArea) {
			var _a;
			config.offsetX = offsetX;
			config.offsetY = offsetY;
			if (isDev()) config.devId = (_a = config.devId) !== null && _a !== void 0 ? _a : (0, import_uniqueId.default)();
			config.clipArea = clipArea;
			this.pool.add(config);
			this.draw();
		};
		_proto.addGroup = function addGroup(group) {
			if (!this.groups) this.groups = [];
			group.parent = this;
			this.groups.push(group);
			this.draw();
		};
		_proto.getDrawConfigs = function getDrawConfigs() {
			return this.pool.getFlattenConfigs();
		};
		_proto.moveToTop = function moveToTop(group) {
			var _a, _b, _c;
			var index = (_a = this.groups) === null || _a === void 0 ? void 0 : _a.indexOf(group);
			if (index !== void 0 && index !== -1) {
				(_b = this.groups) === null || _b === void 0 || _b.splice(index, 1);
				(_c = this.groups) === null || _c === void 0 || _c.push(group);
				this.draw();
			}
		};
		_proto.moveToBottom = function moveToBottom(group) {
			var _a, _b, _c;
			var index = (_a = this.groups) === null || _a === void 0 ? void 0 : _a.indexOf(group);
			if (index !== void 0 && index !== -1) {
				(_b = this.groups) === null || _b === void 0 || _b.splice(index, 1);
				(_c = this.groups) === null || _c === void 0 || _c.unshift(group);
				this.draw();
			}
		};
		_proto.toTop = function toTop() {
			var _a;
			(_a = this.parent) === null || _a === void 0 || _a.moveToTop(this);
		};
		_proto.toBottom = function toBottom() {
			var _a;
			(_a = this.parent) === null || _a === void 0 || _a.moveToBottom(this);
		};
		_proto.clear = function clear() {
			this.pool.clear();
			if (this.groups) this.groups = [];
			this.draw();
		};
		_proto.dispose = function dispose() {
			this.clear();
			this.parent = null;
		};
		_create_class$6(Group, [{
			key: "children",
			get: function() {
				var _a;
				return (_a = this.groups) !== null && _a !== void 0 ? _a : this.pool;
			}
		}]);
		return Group;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/group/interface.js
var init_interface$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/layer/index.js
function _defineProperties$5(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$5(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$5(Constructor, staticProps);
	return Constructor;
}
var Layer;
var init_layer = __esmMin((() => {
	Layer = /* @__PURE__ */ function() {
		"use strict";
		function Layer(config) {
			this.config = config;
			this.stage = null;
			this.element = document.createElement("canvas");
			this.context = this.element.getContext("2d");
			this.isDrawing = false;
			this.groups = [];
			this.updateCanvas();
		}
		var _proto = Layer.prototype;
		_proto.dispose = function dispose() {
			this.groups.forEach((group) => group.dispose());
			this.stage = null;
			this.groups = [];
			this.element.remove();
		};
		_proto.clear = function clear() {
			this.groups.length = 0;
			this.draw();
		};
		_proto.addGroup = function addGroup(group) {
			group.parent = this;
			this.groups.push(group);
			this.draw();
		};
		_proto.getElement = function getElement() {
			return this.element;
		};
		_proto.getContext = function getContext() {
			return this.context;
		};
		_proto.getAttr = function getAttr(key) {
			return this.config[key];
		};
		_proto.setAttr = function setAttr(key, value) {
			if (this.config[key] !== value) this.config[key] = value;
		};
		_proto.getAttrs = function getAttrs() {
			return this.config;
		};
		_proto.setAttrs = function setAttrs(attrs) {
			var _a;
			var scaleChanged = attrs.scale !== this.config.scale;
			Object.assign(this.config, attrs);
			this.updateCanvas();
			this.batchDraw();
			if (scaleChanged) (_a = this.stage) === null || _a === void 0 || _a.triggerResize();
		};
		_proto.getDrawConfigs = function getDrawConfigs() {
			return this.groups.map((group) => group.getDrawConfigs()).flat();
		};
		_proto.moveToTop = function moveToTop(group) {
			var index = this.groups.indexOf(group);
			if (index !== -1) {
				this.groups.splice(index, 1);
				this.groups.push(group);
				this.draw();
			}
		};
		_proto.moveToBottom = function moveToBottom(group) {
			var index = this.groups.indexOf(group);
			if (index !== -1) {
				this.groups.splice(index, 1);
				this.groups.unshift(group);
				this.draw();
			}
		};
		_proto.draw = function draw() {
			this.batchDrawAsync();
		};
		_proto.updateCanvas = function updateCanvas() {
			var scale = this.config.scale || 1;
			var { x, y, width, height, id } = this.config;
			var dpr = this.config.pixelRatio || window.devicePixelRatio;
			this.element.id = id || "";
			this.element.setAttribute("draggable", "false");
			this.element.width = Math.floor(width * dpr);
			this.element.height = Math.floor(height * dpr);
			this.element.style.width = `${width}px`;
			this.element.style.height = `${height}px`;
			this.element.style.position = "absolute";
			this.element.style.left = `${x}px`;
			this.element.style.top = `${y}px`;
			this.context.translate(-.5, -.5);
			this.context.textBaseline = "middle";
			this.context.scale(scale * dpr, scale * dpr);
		};
		_proto.batchDrawAsync = function batchDrawAsync() {
			if (!this.isDrawing) {
				this.isDrawing = true;
				requestAnimationFrame(() => {
					this.batchDraw();
					this.isDrawing = false;
				});
			}
		};
		_proto.batchDraw = function batchDraw() {
			this.context.clearRect(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
			this.groups.forEach((group) => group.draw(this.context));
		};
		_create_class$5(Layer, [{
			key: "children",
			get: function() {
				return this.groups;
			}
		}]);
		return Layer;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/layer/interface.js
var init_interface$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/shared/config.js
var DrawType, NativeEvent;
var init_config$1 = __esmMin((() => {
	(function(DrawType) {
		DrawType["Polygon"] = "Polygon";
		DrawType["Bitmap"] = "Bitmap";
		DrawType["Corner"] = "Corner";
		DrawType["Line"] = "Line";
		DrawType["Rect"] = "Rect";
		DrawType["Text"] = "Text";
	})(DrawType || (DrawType = {}));
	(function(NativeEvent) {
		NativeEvent["mousemove"] = "onMouseMove";
		NativeEvent["mouseup"] = "onMouseUp";
		NativeEvent["mousedown"] = "onMouseDown";
		NativeEvent["mouseleave"] = "onMouseLeave";
		NativeEvent["dblclick"] = "onDoubleClick";
		NativeEvent["click"] = "onClick";
		NativeEvent["wheel"] = "onWheel";
		NativeEvent["resize"] = "onResize";
		NativeEvent["tap"] = "onTap";
		NativeEvent["touchstart"] = "onTouchStart";
		NativeEvent["touchmove"] = "onTouchMove";
		NativeEvent["touchend"] = "onTouchEnd";
		NativeEvent["mousedownWithRight"] = "onMouseDownWithRight";
		NativeEvent["mouseupWithRight"] = "onMouseUpWithRight";
		NativeEvent["clickWithRight"] = "onClickWithRight";
		NativeEvent["dblclickWithRight"] = "onDoubleClickWithRight";
	})(NativeEvent || (NativeEvent = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/stage/touch.js
function _inherits$12(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$12(subClass, superClass);
}
function _set_prototype_of$12(o, p) {
	_set_prototype_of$12 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$12(o, p);
}
var import_main$13, TOUCH_MODE, SLIDE_DIR, MobileTouch;
var init_touch = __esmMin((() => {
	init_event();
	import_main$13 = require_main();
	init_es();
	init_config$1();
	(function(TOUCH_MODE) {
		TOUCH_MODE["SINGLE"] = "SINGLE";
		TOUCH_MODE["DOUBLE"] = "DOUBLE";
	})(TOUCH_MODE || (TOUCH_MODE = {}));
	(function(SLIDE_DIR) {
		SLIDE_DIR["X"] = "X";
		SLIDE_DIR["Y"] = "Y";
	})(SLIDE_DIR || (SLIDE_DIR = {}));
	MobileTouch = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$12(MobileTouch, Disposable);
		function MobileTouch(root) {
			var _this = Disposable.call(this) || this;
			_this.root = root;
			_this.tap = _this._register(new Emitter());
			_this.slide = _this._register(new Emitter());
			_this.touchStart = _this._register(new Emitter());
			_this.touchMove = _this._register(new Emitter());
			_this.touchEnd = _this._register(new Emitter());
			_this.eventDispose = new import_main$13.DisposableStore();
			_this.hasRegistered = false;
			_this.touchStartX = 0;
			_this.touchStartY = 0;
			_this.touchEndTime = 0;
			_this.touchStartTime = 0;
			_this.firstFinger = {
				x: 0,
				y: 0
			};
			_this.onTouchStart = (event) => {
				var { touches } = event;
				var { clientX, clientY } = touches[0];
				cancelAnimationFrame(_this.raf);
				_this.touchStartX = clientX;
				_this.touchStartY = clientY;
				_this.touchStartTime = Date.now();
				_this.updateFirstFinger(clientX, clientY);
				_this.mode = touches.length > 1 ? TOUCH_MODE.DOUBLE : TOUCH_MODE.SINGLE;
				_this.fireTouchStart(_this.createTouchParam(0, 0, clientX, clientY));
			};
			_this.onTouchMove = (event) => {
				var { touches } = event;
				var { clientX, clientY } = touches[0];
				var followFactor = 2;
				var deltaX = _this.fixDelta(_this.firstFinger.x - clientX) * followFactor;
				var deltaY = _this.fixDelta(_this.firstFinger.y - clientY) * followFactor;
				_this.updateFirstFinger(clientX, clientY);
				_this.fireTouchMove(_this.createTouchParam(deltaX, deltaY, clientX, clientY));
				if (_this.mode === TOUCH_MODE.SINGLE) _this.fireSlide(_this.createTouchParam(deltaX, deltaY, clientX, clientY));
			};
			_this.onTouchEnd = (event) => {
				var { clientX, clientY } = event.changedTouches[0];
				var diffX = clientX - _this.touchStartX;
				var diffY = clientY - _this.touchStartY;
				_this.touchStartX = 0;
				_this.touchStartY = 0;
				_this.firstFinger.x = 0;
				_this.firstFinger.y = 0;
				_this.touchEndTime = Date.now();
				_this.fireTouchEnd(_this.createTouchParam(diffX, diffY, clientX, clientY));
				if (Math.abs(diffX) < 15 && Math.abs(diffY) < 15) {
					_this.fireTap(_this.createTouchParam(diffX, diffY, clientX, clientY));
					return;
				}
				if (_this.touchEndTime - _this.touchStartTime < 300) {
					var slideDir = _this.getDir(diffX, diffY);
					var diffDistance = slideDir === SLIDE_DIR.X ? diffX : diffY;
					_this.doInertiaSlide(slideDir, diffDistance, clientX, clientY);
				}
			};
			_this.registerEvents();
			return _this;
		}
		var _proto = MobileTouch.prototype;
		_proto.dispose = function dispose() {
			Disposable.prototype.dispose.call(this);
			this.unregisterEvents();
		};
		_proto.registerEvents = function registerEvents() {
			if (this.hasRegistered) return;
			this.hasRegistered = true;
			this.eventDispose.add(dom.addDisposableListener(this.root, "touchstart", this.onTouchStart));
			this.eventDispose.add(dom.addDisposableListener(this.root, "touchmove", this.onTouchMove));
			this.eventDispose.add(dom.addDisposableListener(this.root, "touchend", this.onTouchEnd));
		};
		_proto.unregisterEvents = function unregisterEvents() {
			if (!this.hasRegistered) return;
			this.eventDispose.dispose();
		};
		_proto.updateFirstFinger = function updateFirstFinger(x, y) {
			this.firstFinger.x = x;
			this.firstFinger.y = y;
		};
		_proto.fixDelta = function fixDelta(delta) {
			return Math.round(delta);
		};
		_proto.getDir = function getDir(deltaX, deltaY) {
			return Math.abs(deltaX) > Math.abs(deltaY) ? SLIDE_DIR.X : SLIDE_DIR.Y;
		};
		_proto.createTouchParam = function createTouchParam(deltaX, deltaY, clientX, clientY) {
			var slideDir = this.getDir(deltaX, deltaY);
			return {
				deltaX: slideDir === SLIDE_DIR.X ? deltaX : 0,
				deltaY: slideDir === SLIDE_DIR.Y ? deltaY : 0,
				clientX,
				clientY
			};
		};
		_proto.fireSlide = function fireSlide(params) {
			this.slide.fire(Object.assign(Object.assign({}, params), { type: "slide" }));
		};
		_proto.fireTap = function fireTap(params) {
			setTimeout(() => {
				this.tap.fire(Object.assign({ type: NativeEvent.tap }, params));
			}, 20);
		};
		_proto.fireTouchStart = function fireTouchStart(params) {
			this.touchStart.fire(Object.assign({ type: NativeEvent.touchstart }, params));
		};
		_proto.fireTouchMove = function fireTouchMove(params) {
			this.touchMove.fire(Object.assign({ type: NativeEvent.touchmove }, params));
		};
		_proto.fireTouchEnd = function fireTouchEnd(params) {
			this.touchEnd.fire(Object.assign({ type: NativeEvent.touchend }, params));
		};
		_proto.doInertiaSlide = function doInertiaSlide(slideDir, diffDistance, clientX, clientY) {
			var direction = diffDistance < 0 ? -1 : 1;
			var speed = diffDistance / (this.touchEndTime - this.touchStartTime);
			var speed2 = 1 * speed;
			var deceleration = this.getEase(slideDir) / 1e3;
			var duration = Math.abs(Math.round(speed / deceleration));
			var destination = Math.round(speed2 * speed2 / (1.5 * deceleration) * direction);
			this.inertia(destination, duration, (deltaValue) => {
				var deltaX = slideDir === SLIDE_DIR.X ? deltaValue : 0;
				var deltaY = slideDir === SLIDE_DIR.Y ? deltaValue : 0;
				var event = this.createTouchParam(deltaX, deltaY, clientX, clientY);
				this.fireSlide(event);
			});
		};
		_proto.inertia = function inertia(destination, duration, callback) {
			var lastPass = 0;
			var beginTime = Date.now();
			var doSlide = () => {
				var passTime = Date.now() - beginTime;
				if (passTime >= duration) {
					lastPass = 0;
					return;
				}
				var pass = destination * this.ease(passTime / duration);
				callback(lastPass - pass);
				lastPass = pass;
				this.raf = requestAnimationFrame(doSlide);
			};
			doSlide();
		};
		_proto.ease = function ease(x) {
			return Math.sqrt(1 - Math.pow(x - 1, 2));
		};
		_proto.getEase = function getEase(slideDir) {
			return slideDir === SLIDE_DIR.X ? 1.5 : 2;
		};
		return MobileTouch;
	}(import_main$13.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/stage/index.js
function _defineProperties$4(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$4(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$4(Constructor, staticProps);
	return Constructor;
}
function isHit(offsetX, offsetY, rect) {
	return offsetX > rect.x && offsetX < rect.x + rect.width && offsetY > rect.y && offsetY < rect.y + rect.height;
}
var import_main$12, Stage;
var init_stage = __esmMin((() => {
	import_main$12 = require_main();
	init_esm$1();
	init_es();
	init_layer();
	init_config$1();
	init_touch();
	init_resize_observer();
	Stage = /* @__PURE__ */ function() {
		"use strict";
		function Stage(config) {
			this.config = config;
			this.layers = [];
			this.needApplyWindowResize = false;
			this.eventDispose = new import_main$12.DisposableStore();
			this.onTouchEventProxy = (param) => {
				var _a, _b;
				if (param.type === "slide") {
					(_a = this.getAttr("onSlide")) === null || _a === void 0 || _a(param);
					return;
				}
				(_b = this.getAttr(param.type)) === null || _b === void 0 || _b(param);
				this.callLayersHit(param.type, param);
			};
			this.onMouseEventProxy = (event) => {
				var mouseEventName = NativeEvent[event.type];
				var rightKeyMap = {
					[NativeEvent.mousedown]: NativeEvent.mousedownWithRight,
					[NativeEvent.mouseup]: NativeEvent.mouseupWithRight,
					[NativeEvent.click]: NativeEvent.clickWithRight,
					[NativeEvent.dblclick]: NativeEvent.dblclickWithRight
				};
				if (event.button === 2 && rightKeyMap[mouseEventName]) mouseEventName = rightKeyMap[mouseEventName];
				var propagation = {
					isPropagationStopped: false,
					stopPropagation() {
						propagation.isPropagationStopped = true;
					}
				};
				this.callLayersHit(mouseEventName, event, propagation);
				if (propagation.isPropagationStopped) return;
				var eventHandler = this.getAttr(mouseEventName);
				if (typeof eventHandler === "function") eventHandler(event, propagation.stopPropagation);
			};
			this.onWindowResize = () => {
				this.needApplyWindowResize = true;
				setTimeout(() => {
					if (this.needApplyWindowResize) this.onContainerResize();
				}, 100);
			};
			this.init();
		}
		var _proto = Stage.prototype;
		_proto.dispose = function dispose() {
			this.layers.forEach((layer) => layer.dispose());
			this.layers = [];
			this.unbindNativeEvents();
		};
		_proto.getAttr = function getAttr(key) {
			return this.config[key];
		};
		_proto.setAttr = function setAttr(key, value) {
			this.config[key] = value;
		};
		_proto.setAttrs = function setAttrs(attrs) {
			Object.assign(this.config, attrs);
		};
		_proto.addLayer = function addLayer(layer) {
			layer.stage = this;
			this.layers.push(layer);
			this.config.container.appendChild(layer.getElement());
		};
		_proto.triggerResize = function triggerResize() {
			this.onContainerResize();
		};
		_proto.toCanvas = function toCanvas(config) {
			var rects = this.layers.map((layer) => ({
				x: layer.getAttr("x"),
				y: layer.getAttr("y"),
				width: layer.getAttr("width"),
				height: layer.getAttr("height")
			}));
			var maxAreaRect = rects.reduce((maxRect, rect) => {
				if (rect.width * rect.height > maxRect.width * maxRect.height) return rect;
				return maxRect;
			}, rects[0]);
			var resultLayer = new Layer(Object.assign(Object.assign({}, maxAreaRect), { pixelRatio: config.pixelRatio }));
			this.layers.filter((layer) => !layer.getAttr("listening")).forEach((layer, index) => {
				if (layer.getAttr("listening")) return;
				var { x, y, width, height } = rects[index];
				resultLayer.getContext().drawImage(layer.getElement(), x, y, width, height);
			});
			return resultLayer.getElement();
		};
		_proto.init = function init() {
			this.config.container.style.overflow = "hidden";
			this.config.container.style.userSelect = "none";
			if (!this.config.allowTouchAction) this.config.container.style.touchAction = "none";
			this.config.container.style.position = "relative";
			this.config.container.style.boxSizing = "border-box";
			this.config.container.setAttribute("role", "presentation");
			this.originResizeHandler = this.config.onResize;
			this.bindNativeEvents();
		};
		_proto.bindNativeEvents = function bindNativeEvents() {
			if (isSSR()) return;
			if (ua.isMobile) {
				this.touch = new MobileTouch(this.config.container);
				this.eventDispose.add(this.touch.tap.event(this.onTouchEventProxy));
				this.eventDispose.add(this.touch.slide.event(this.onTouchEventProxy));
				this.eventDispose.add(this.touch.touchStart.event(this.onTouchEventProxy));
				this.eventDispose.add(this.touch.touchMove.event(this.onTouchEventProxy));
				this.eventDispose.add(this.touch.touchEnd.event(this.onTouchEventProxy));
			} else {
				this.eventDispose.add(dom.addDisposableListener(this.config.container, "wheel", this.onMouseEventProxy));
				this.eventDispose.add(dom.addDisposableListener(this.config.container, "mousedown", this.onMouseEventProxy));
				this.eventDispose.add(dom.addDisposableListener(this.config.container, "mousemove", this.onMouseEventProxy));
				this.eventDispose.add(dom.addDisposableListener(this.config.container, "mouseup", this.onMouseEventProxy));
				this.eventDispose.add(dom.addDisposableListener(this.config.container, "mouseleave", this.onMouseEventProxy));
				this.eventDispose.add(dom.addDisposableListener(this.config.container, "dblclick", this.onMouseEventProxy));
				this.eventDispose.add(dom.addDisposableListener(this.config.container, "click", this.onMouseEventProxy));
			}
			this.eventDispose.add(dom.addDisposableListener(window, "resize", this.onWindowResize));
			this.resizeObserver = new ResizeObserver(() => {
				var rect = this.config.container.getBoundingClientRect();
				if (rect.width && rect.height) this.onContainerResize();
			});
			this.resizeObserver.observe(this.config.container);
		};
		_proto.unbindNativeEvents = function unbindNativeEvents() {
			var _a, _b;
			if (isSSR()) return;
			if (ua.isMobile) (_a = this.touch) === null || _a === void 0 || _a.dispose();
			this.eventDispose.dispose();
			this.originResizeHandler = void 0;
			(_b = this.resizeObserver) === null || _b === void 0 || _b.disconnect();
			this.resizeObserver = null;
		};
		_proto.onContainerResize = function onContainerResize() {
			var _a;
			this.needApplyWindowResize = false;
			(_a = this.originResizeHandler) === null || _a === void 0 || _a.call(this);
			var resizeHandler = this.getAttr(NativeEvent.resize);
			if (typeof resizeHandler === "function") resizeHandler();
		};
		_proto.callLayersHit = function callLayersHit(eventName, event, propagation) {
			this.layers.filter((layer) => layer.getAttr("listening")).forEach((layer) => {
				this.findAndCallHit(eventName, event, layer.getDrawConfigs(), propagation);
			});
		};
		_proto.findAndCallHit = function findAndCallHit(eventName, event, configs, propagation) {
			var _a;
			var scale = this.layers[0].getAttr("scale") || 1;
			var { left, top } = this.config.container.getBoundingClientRect();
			var offsetX = (event.clientX - left) / scale;
			var offsetY = (event.clientY - top) / scale;
			for (var i = configs.length - 1; i >= 0; i--) {
				var config = configs[i];
				if (!("width" in config) || !("height" in config)) continue;
				if (isHit(offsetX, offsetY, {
					x: config.x + (config.offsetX || 0),
					y: config.y + (config.offsetY || 0),
					width: config.width,
					height: config.height
				})) {
					(_a = config[eventName]) === null || _a === void 0 || _a.call(config, event, propagation === null || propagation === void 0 ? void 0 : propagation.stopPropagation);
					if (propagation === null || propagation === void 0 ? void 0 : propagation.isPropagationStopped) break;
				}
			}
		};
		_create_class$4(Stage, [{
			key: "children",
			get: function() {
				return this.layers;
			}
		}]);
		return Stage;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/stage/interface.js
var init_interface = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/lib/index.js
var init_lib = __esmMin((() => {
	init_bitmap();
	init_corner();
	init_line();
	init_polygon();
	init_rect();
	init_text();
	init_interface$8();
	init_interface$9();
	init_interface$7();
	init_interface$6();
	init_interface$5();
	init_interface$4();
	init_measurer();
	init_group();
	init_pool();
	init_interface$2();
	init_layer();
	init_interface$1();
	init_stage();
	init_interface();
	init_interface$3();
	init_level();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/resources/index.js
function _inherits$11(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$11(subClass, superClass);
}
function _set_prototype_of$11(o, p) {
	_set_prototype_of$11 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$11(o, p);
}
var import_main$11, ImageLoader, resourceLoader, extraIconSrcMaps, registerIconSrcMap;
var init_resources = __esmMin((() => {
	init_tslib_es6();
	init_event();
	import_main$11 = require_main();
	init_es();
	init_checkbox_icon();
	init_field_icon();
	init_hyperlink_icon();
	init_normal_icon();
	init_normal_icon();
	init_field_icon();
	ImageLoader = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$11(ImageLoader, Disposable);
		function ImageLoader() {
			var _this = Disposable.call(this) || this;
			_this.onDidBitmapLoadEmitter = _this._register(new Emitter());
			_this.onDidRenderFinishEndEmitter = _this._register(new Emitter());
			_this.bitmapLoadingCount = 0;
			_this.caches = {};
			_this.pendingRequests = /* @__PURE__ */ new Map();
			_this.onDidBitmapLoad = _this.onDidBitmapLoadEmitter.event;
			_this.onDidRenderFinish = _this.onDidRenderFinishEndEmitter.event;
			return _this;
		}
		var _proto = ImageLoader.prototype;
		_proto.dispose = function dispose() {
			Disposable.prototype.dispose.call(this);
			this.caches = {};
		};
		_proto.checkEndOnce = function checkEndOnce() {
			if (!this.bitmapLoadingCount) this.checkEndMoment();
		};
		_proto.loadUrl = function loadUrl(url) {
			return this.loadImage(url, url);
		};
		_proto.loadAlias = function loadAlias(alias) {
			var src = this.getIconSrcByAlias(alias);
			if (src) return this.loadImage(src, alias);
		};
		_proto.checkEnd = function checkEnd() {
			this.checkEndMoment();
		};
		_proto.refreshLoadingCount = function refreshLoadingCount() {
			this.bitmapLoadingCount = 0;
		};
		_proto.loadImage = function loadImage(src, cacheKey) {
			if (cacheKey && this.caches[cacheKey]) {
				this.checkEndMoment();
				return this.caches[cacheKey];
			}
			if (cacheKey && this.pendingRequests.has(cacheKey)) return this.pendingRequests.get(cacheKey);
			var imagePromise = new Promise((resolve) => {
				var image = new Image();
				image.crossOrigin = "anonymous";
				image.src = src;
				if (image.complete) resolve(image);
				image.onload = () => {
					if (cacheKey) {
						this.setCache(cacheKey, image, resolve);
						this.pendingRequests.delete(cacheKey);
					} else resolve(image);
				};
				image.onerror = () => {
					resolve(null);
				};
			});
			this.bitmapLoadingCount += 1;
			if (cacheKey) this.pendingRequests.set(cacheKey, imagePromise);
			imagePromise.then(() => {
				this.fireBitmapLoaded();
			});
			return imagePromise;
		};
		_proto.getIconSrcByAlias = function getIconSrcByAlias(alias) {
			var builtin = NormalIconSrc[alias] || FieldTypeIconSrc[alias] || HyperlinkTypeIcons[alias] || CheckboxIcons[alias];
			if (builtin) return builtin;
			for (var map of extraIconSrcMaps) {
				var src = map[alias];
				if (src) return src;
			}
			return "";
		};
		_proto.setCache = function setCache(alias, image, resolve) {
			if (domainConfig.getIsWeCom() || typeof createImageBitmap !== "function") {
				this.caches[alias] = image;
				resolve(image);
				return;
			}
			if (image.src.includes("data:image/svg+xml")) {
				var dpr = window.devicePixelRatio;
				createImageBitmap(image, {
					resizeWidth: image.width * dpr,
					resizeHeight: image.height * dpr
				}).then((bitmap) => {
					this.caches[alias] = bitmap;
					resolve(bitmap);
				});
				return;
			}
			createImageBitmap(image).then((bitmap) => {
				this.caches[alias] = bitmap;
				resolve(bitmap);
			});
		};
		_proto.checkEndMoment = function checkEndMoment() {
			if (this.bitmapLoadingCount <= 0) {
				this.bitmapLoadingCount = 0;
				requestAnimationFrame(() => {
					this.onDidRenderFinishEndEmitter.fire();
				});
			}
		};
		_proto.fireBitmapLoaded = function fireBitmapLoaded() {
			this.bitmapLoadingCount -= 1;
			requestAnimationFrame(() => {
				this.onDidBitmapLoadEmitter.fire();
				this.checkEndMoment();
			});
		};
		return ImageLoader;
	}(import_main$11.Disposable);
	__decorate([
		debounce(50),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], ImageLoader.prototype, "checkEndOnce", null);
	__decorate([
		debounce(200),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], ImageLoader.prototype, "checkEndMoment", null);
	resourceLoader = new ImageLoader();
	extraIconSrcMaps = [];
	registerIconSrcMap = (map) => {
		if (!extraIconSrcMaps.includes(map)) extraIconSrcMaps.push(map);
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/pen/config.js
function _inherits$10(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$10(subClass, superClass);
}
function _set_prototype_of$10(o, p) {
	_set_prototype_of$10 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$10(o, p);
}
var import_main$10, Config;
var init_config = __esmMin((() => {
	import_main$10 = require_main();
	init_lib();
	init_resources();
	Config = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$10(Config, Disposable);
		function Config(util) {
			var _this = Disposable.call(this) || this;
			_this.util = util;
			return _this;
		}
		var _proto = Config.prototype;
		_proto.line = function line(config) {
			return Object.assign(Object.assign({}, config), { type: DrawType$1.Line });
		};
		_proto.polygon = function polygon(config) {
			return Object.assign(Object.assign({}, config), { type: DrawType$1.Polygon });
		};
		_proto.rect = function rect(config) {
			resourceLoader.checkEndOnce();
			return Object.assign(Object.assign({}, config), { type: DrawType$1.Rect });
		};
		_proto.text = function text(config) {
			if (!config.layouts) config.layouts = this.util.measureTextLayouts(config);
			return Object.assign(Object.assign({}, config), { type: DrawType$1.Text });
		};
		_proto.icon = function icon(alias, config) {
			var bitmapConfig = this.bitmap(config);
			if (!bitmapConfig.id) bitmapConfig.id = alias;
			var result = resourceLoader.loadAlias(alias);
			if (typeof result === "object" && "then" in result) result.then((image) => {
				if (image) bitmapConfig.image = image;
			});
			else bitmapConfig.image = result;
			return bitmapConfig;
		};
		_proto.image = function image(url, config) {
			var bitmapConfig = this.bitmap(config);
			if (bitmapConfig.image) return bitmapConfig;
			var result = resourceLoader.loadUrl(url);
			if (typeof result === "object" && "then" in result) result.then((image) => {
				if (image) bitmapConfig.image = image;
			});
			else bitmapConfig.image = result;
			return bitmapConfig;
		};
		_proto.topCorner = function topCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.Top,
				type: DrawType$1.Corner
			});
		};
		_proto.bottomCorner = function bottomCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.Bottom,
				type: DrawType$1.Corner
			});
		};
		_proto.leftCorner = function leftCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.Left,
				type: DrawType$1.Corner
			});
		};
		_proto.rightCorner = function rightCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.Right,
				type: DrawType$1.Corner
			});
		};
		_proto.topLeftCorner = function topLeftCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.TopLeft,
				type: DrawType$1.Corner
			});
		};
		_proto.topRightCorner = function topRightCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.TopRight,
				type: DrawType$1.Corner
			});
		};
		_proto.bottomLeftCorner = function bottomLeftCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.BottomLeft,
				type: DrawType$1.Corner
			});
		};
		_proto.bottomRightCorner = function bottomRightCorner(config) {
			return Object.assign(Object.assign({}, config), {
				cornerType: CornerType.BottomRight,
				type: DrawType$1.Corner
			});
		};
		_proto.bitmap = function bitmap(config) {
			return Object.assign(Object.assign({}, config), { type: DrawType$1.Bitmap });
		};
		return Config;
	}(import_main$10.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/pen/util.js
var PenUtil;
var init_util = __esmMin((() => {
	init_lib();
	init_style();
	PenUtil = /* @__PURE__ */ function() {
		"use strict";
		function PenUtil() {
			this.TextChar = TextChar;
		}
		var _proto = PenUtil.prototype;
		_proto.measureTextWidth = function measureTextWidth1(text, fontSize = style.defaultTextConfig.fontSize, fontStyle = "normal", maxWidth = Infinity) {
			var config = Object.assign(Object.assign({}, style.defaultTextConfig), {
				text,
				fontSize,
				fontStyle
			});
			return Math.ceil(measureTextWidth(config, maxWidth));
		};
		_proto.measureTextLayouts = function measureTextLayouts1(textConfig) {
			if (textConfig.text === "") return [];
			return measureTextLayouts(Object.assign(Object.assign({}, style.defaultTextConfig), textConfig));
		};
		return PenUtil;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/pen/index.js
var Pen, pen;
var init_pen = __esmMin((() => {
	init_lib();
	init_config();
	init_util();
	init_style();
	Pen = /* @__PURE__ */ function() {
		"use strict";
		function Pen() {
			this.util = new PenUtil();
			this.config = new Config(this.util);
			this.updateDefaultStyle();
		}
		var _proto = Pen.prototype;
		_proto.updateDefaultStyle = function updateDefaultStyle() {
			TextApi.setDefaultStyle(style.defaultTextConfig);
			LineApi.setDefaultStyle(style.defaultLineConfig);
			RectApi.setDefaultStyle(style.defaultLineConfig);
			CornerApi.setDefaultStyle(style.defaultCornerConfig);
			BitmapApi.setDefaultStyle(style.defaultCornerConfig);
		};
		_proto.stage = function stage(config) {
			return new Stage(config);
		};
		_proto.layer = function layer(config) {
			return new Layer(config);
		};
		_proto.group = function group(config) {
			return new Group(config);
		};
		return Pen;
	}();
	pen = new Pen();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/renderer/feature-single.js
function _defineProperties$3(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$3(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$3(Constructor, staticProps);
	return Constructor;
}
function _inherits$9(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$9(subClass, superClass);
}
function _set_prototype_of$9(o, p) {
	_set_prototype_of$9 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$9(o, p);
}
var import_main$9, FeatureAuth, BaseFeature;
var init_feature_single = __esmMin((() => {
	import_main$9 = require_main();
	(function(FeatureAuth) {
		FeatureAuth[FeatureAuth["None"] = 0] = "None";
		FeatureAuth[FeatureAuth["Field"] = 1] = "Field";
		FeatureAuth[FeatureAuth["Record"] = 2] = "Record";
	})(FeatureAuth || (FeatureAuth = {}));
	BaseFeature = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$9(BaseFeature, Disposable);
		function BaseFeature(renderer) {
			var _this = Disposable.call(this) || this;
			_this.renderer = renderer;
			_this.featureLock.init(_this.getFeatureLockConfig());
			return _this;
		}
		var _proto = BaseFeature.prototype;
		_proto.setCursor = function setCursor(cursor) {
			if (cursor !== this.renderer.root.style.cursor) this.renderer.root.style.cursor = cursor;
		};
		/**
		* 获取相对于 canvas 的坐标
		* @param clientX 屏幕的 x 坐标
		* @param clientY 屏幕的 y 坐标
		* @returns
		*/ _proto.getAbsolutePosition = function getAbsolutePosition(clientX, clientY) {
			var rect = this.renderer.root.getBoundingClientRect();
			return {
				x: clientX - rect.left,
				y: clientY - rect.top
			};
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return {};
		};
		_create_class$3(BaseFeature, [{
			key: "featureLock",
			get: function() {
				return this.renderer.getFeatureLock();
			}
		}]);
		return BaseFeature;
	}(import_main$9.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/register-esc-to-cancel.js
/**
* 为「拖拽中」注册一个「按 ESC 立即取消」的 document keydown 监听，返回可 dispose 的句柄。
*
* 各视图拖拽 feature 的取消/复位逻辑各不相同（clearAll / reset / abort 等），因此把「按键判定」
* 这段公共逻辑抽到这里复用，具体「怎么取消」由调用方通过 `onCancel` 回调注入。
*
* 用法：在 feature 进入拖拽（或拖拽预备态）、注册 mousemove/mouseup 监听的同处一并注册本监听，
* 并在取消监听（cancelListeners）时一并 dispose，保证只在拖拽生命周期内响应 ESC。
*
* 说明：监听走 document 级（`DocumentEvent.onKeyDown`，capture 阶段派发），无论焦点在哪都能收到；
* 因此即便某些 feature 只监听 stage 鼠标事件（如 grid group-move），ESC 依然可用。
*/ function registerEscToCancel(uiEvent, onCancel) {
	return uiEvent.document.onKeyDown((event) => {
		if (event.key === "Escape") onCancel();
	});
}
var init_register_esc_to_cancel = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/scroller/index.js
function _inherits$8(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$8(subClass, superClass);
}
function _set_prototype_of$8(o, p) {
	_set_prototype_of$8 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$8(o, p);
}
var import_main$8, CommonScroller;
var init_scroller = __esmMin((() => {
	import_main$8 = require_main();
	init_esm$1();
	init_es();
	init_style();
	CommonScroller = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$8(CommonScroller, Disposable);
		function CommonScroller(option) {
			var _this = Disposable.call(this) || this;
			_this.option = option;
			_this.zIndex = "20";
			_this.autoHideDuration = 1e3;
			_this.scrollerY = 0;
			_this.preMouseY = 0;
			_this.hoveringVertical = false;
			_this.draggingVertical = false;
			_this.vertical = document.createElement("div");
			_this.evtStartX = 0;
			_this.startHorizontalOffsetX = 0;
			_this.hoveringHorizontal = false;
			_this.draggingHorizontal = false;
			_this.horizontal = document.createElement("div");
			_this.isHandling = false;
			_this.scrollEventDispose = new import_main$8.DisposableStore();
			_this.onVerticalStart = (event) => {
				event.stopPropagation();
				_this.draggingVertical = true;
				_this.scrollerY = _this.vertical.offsetTop;
				_this.preMouseY = ua.isMobile ? event.touches[0].clientY : event.clientY;
				_this.registerScrollDispose(dom.addDisposableListener(document, "mousemove", _this.onDocumentMouseMove));
				_this.registerScrollDispose(dom.addDisposableListener(document, "mouseup", _this.onVerticalEnd));
				_this.registerScrollDispose(dom.addDisposableListener(document, "touchmove", _this.onDocumentTouchMove));
				_this.registerScrollDispose(dom.addDisposableListener(document, "touchend", _this.onVerticalEnd));
			};
			_this.onVerticalEnd = (event) => {
				var _a, _b;
				_this.draggingVertical = false;
				_this.scrollEventDispose.clear();
				if (event.target !== _this.vertical) {
					_this.hoveringVertical = false;
					_this.vertical.style.backgroundColor = _this.style.background;
					(_b = (_a = _this.option).onMouseLeave) === null || _b === void 0 || _b.call(_a, event);
				}
			};
			_this.onHorizontalStart = (event) => {
				event.stopPropagation();
				_this.draggingHorizontal = true;
				_this.evtStartX = ua.isMobile ? event.touches[0].clientX : event.clientX;
				_this.startHorizontalOffsetX = _this.horizontal.offsetLeft;
				_this.registerScrollDispose(dom.addDisposableListener(document, "mousemove", _this.onDocumentMouseMove));
				_this.registerScrollDispose(dom.addDisposableListener(document, "mouseup", _this.onHorizontalEnd));
				_this.registerScrollDispose(dom.addDisposableListener(document, "touchmove", _this.onDocumentTouchMove));
				_this.registerScrollDispose(dom.addDisposableListener(document, "touchend", _this.onHorizontalEnd));
			};
			_this.onHorizontalEnd = (event) => {
				var _a, _b;
				_this.draggingHorizontal = false;
				_this.scrollEventDispose.clear();
				if (event.target !== _this.horizontal) {
					_this.hoveringHorizontal = false;
					_this.horizontal.style.backgroundColor = _this.style.background;
					(_b = (_a = _this.option).onMouseLeave) === null || _b === void 0 || _b.call(_a, event);
				}
			};
			_this.onDocumentMouseMove = (event) => {
				if (!_this.isHandling) {
					var evtClientY = event.clientY;
					var evtClientX = event.clientX;
					_this.handleMoveEvent(evtClientY, evtClientX);
				}
			};
			_this.onDocumentTouchMove = (event) => {
				if (!_this.isHandling) {
					var evtClientY = event.touches[0].clientY;
					var evtClientX = event.touches[0].clientX;
					_this.handleMoveEvent(evtClientY, evtClientX);
				}
			};
			_this.handleMoveEvent = (evtClientY, evtClientX) => {
				requestAnimationFrame(() => {
					if (_this.draggingVertical) _this.handleVerticalDrag(evtClientY);
					else if (_this.draggingHorizontal) _this.handleHorizontalDrag(evtClientX);
					_this.isHandling = false;
				});
			};
			_this.style = Object.assign(Object.assign({}, style.consts.scrollBarStyle), option.style);
			if ("vertical" in _this.option) {
				_this.initVertical();
				_this.registerVericalDrag();
			}
			if ("horizontal" in _this.option) {
				_this.initHorizontal();
				_this.registerHorizontalDrag();
			}
			return _this;
		}
		var _proto = CommonScroller.prototype;
		_proto.isHovering = function isHovering() {
			return this.hoveringVertical || this.hoveringHorizontal;
		};
		_proto.isDragging = function isDragging() {
			return this.draggingVertical || this.draggingHorizontal;
		};
		_proto.dispose = function dispose(trace) {
			Disposable.prototype.dispose.call(this, trace);
			this.vertical.remove();
			this.horizontal.remove();
			this.scrollEventDispose.dispose();
		};
		_proto.updatePosition = function updatePosition() {
			if ("vertical" in this.option) this.updateVertical();
			if ("horizontal" in this.option) this.updateHorizontal();
		};
		_proto.show = function show() {
			if ("vertical" in this.option) this.vertical.style.opacity = "1";
			if ("horizontal" in this.option) this.horizontal.style.opacity = "1";
		};
		/**
		* 隐藏滚动条
		* @param immediate 是否立即隐藏，否则会有渐变动画
		*/ _proto.hide = function hide(immediate = false) {
			if ("vertical" in this.option) if (immediate) this.vertical.style.display = "none";
			else this.vertical.style.opacity = "0";
			if ("horizontal" in this.option) if (immediate) this.horizontal.style.display = "none";
			else this.horizontal.style.opacity = "0";
		};
		_proto.updateVertical = function updateVertical() {
			if (!("vertical" in this.option)) return;
			var viewRect = this.option.getViewRect();
			var scrollHeight = this.option.getScrollHeight();
			var viewHeight = viewRect.height;
			var isHidden = viewHeight === 0 || scrollHeight <= viewHeight;
			this.vertical.style.display = isHidden ? "none" : "";
			if (isHidden) return;
			var barWidth = this.style.size;
			var barX = viewRect.x + viewRect.width - barWidth - this.style.marginEdge;
			var posY = this.option.getScrollTop() / scrollHeight * viewHeight + viewRect.y + this.style.marginEdge;
			var barHeight = Math.max(this.style.minSize, viewHeight / scrollHeight * viewHeight);
			var barRect = {
				left: barX,
				top: this.draggingVertical ? this.scrollerY : this.toSafeY(posY, barHeight),
				width: barWidth,
				height: Math.ceil(barHeight)
			};
			this.vertical.style.left = `${barRect.left}px`;
			this.vertical.style.top = `${barRect.top}px`;
			this.vertical.style.width = `${barRect.width}px`;
			this.vertical.style.height = `${barRect.height}px`;
			if (this.option.getMaxTop) {
				var maxTop = this.option.getMaxTop();
				var clipTop = Math.max(0, maxTop - barRect.top);
				this.vertical.style.clipPath = `inset(${clipTop}px 0 0 0)`;
			}
			if (this.option.autoHide) {
				if (this.verticalAutoHideTimer) clearTimeout(this.verticalAutoHideTimer);
				this.verticalAutoHideTimer = window.setTimeout(() => {
					if (!this.hoveringVertical && !this.draggingVertical) this.vertical.style.display = "none";
				}, this.autoHideDuration);
			}
		};
		_proto.updateHorizontal = function updateHorizontal() {
			if (!("horizontal" in this.option)) return;
			var viewRect = this.option.getViewRect();
			var scrollWidth = this.option.getScrollWidth();
			var viewWidth = viewRect.width;
			var isHidden = viewWidth === 0 || scrollWidth <= viewWidth;
			this.horizontal.style.display = isHidden ? "none" : "";
			if (isHidden) return;
			var barWidth = Math.max(this.style.minSize, viewWidth / scrollWidth * viewWidth);
			var barHeight = this.style.size;
			var barY = viewRect.y + viewRect.height - barHeight - this.style.marginEdge;
			var posX = this.option.getScrollLeft() / scrollWidth * viewWidth + viewRect.x;
			var barRect = {
				left: this.toSafeX(posX, barWidth),
				top: barY,
				width: Math.ceil(barWidth),
				height: barHeight
			};
			this.horizontal.style.left = `${barRect.left}px`;
			this.horizontal.style.top = `${barRect.top}px`;
			this.horizontal.style.width = `${barRect.width}px`;
			this.horizontal.style.height = `${barRect.height}px`;
			if (this.option.getMaxLeft) {
				var maxLeft = this.option.getMaxLeft();
				var clipLeft = Math.max(0, maxLeft - barRect.left);
				this.horizontal.style.clipPath = `inset(0 ${clipLeft}px 0 0)`;
			}
			if (this.option.autoHide) {
				if (this.horizontalAutoHideTimer) clearTimeout(this.horizontalAutoHideTimer);
				this.horizontalAutoHideTimer = window.setTimeout(() => {
					if (!this.hoveringHorizontal && !this.draggingHorizontal) this.horizontal.style.display = "none";
				}, this.autoHideDuration);
			}
		};
		_proto.toSafeY = function toSafeY(y, barHeight) {
			var viewRect = this.option.getViewRect();
			var maxY = viewRect.y + viewRect.height - barHeight;
			return Math.floor(Math.min(maxY, y));
		};
		_proto.toSafeX = function toSafeX(x, barWidth) {
			var viewRect = this.option.getViewRect();
			var maxX = viewRect.x + viewRect.width - barWidth;
			return Math.floor(Math.min(maxX, x));
		};
		_proto.initVertical = function initVertical() {
			this.vertical.style.zIndex = this.zIndex;
			this.vertical.style.position = "absolute";
			this.vertical.style.backgroundColor = this.style.background;
			this.vertical.style.borderRadius = `${this.style.borderRadius}px`;
			this.vertical.style.transition = "opacity 300ms";
			this.vertical.onmouseleave = (event) => {
				var _a, _b;
				if (this.draggingVertical) return;
				this.hoveringVertical = false;
				this.vertical.style.backgroundColor = this.style.background;
				(_b = (_a = this.option).onMouseLeave) === null || _b === void 0 || _b.call(_a, event);
			};
			this.vertical.onmouseenter = (event) => {
				var _a, _b;
				this.hoveringVertical = true;
				this.vertical.style.backgroundColor = this.style.backgroundHover;
				(_b = (_a = this.option).onMouseEnter) === null || _b === void 0 || _b.call(_a, event);
			};
			this.vertical.id = this.option.id;
			this.option.root.appendChild(this.vertical);
		};
		_proto.initHorizontal = function initHorizontal() {
			this.horizontal.style.zIndex = this.zIndex;
			this.horizontal.style.position = "absolute";
			this.horizontal.style.backgroundColor = this.style.background;
			this.horizontal.style.borderRadius = `${this.style.borderRadius}px`;
			this.horizontal.style.transition = "opacity 300ms";
			this.horizontal.onmouseleave = (event) => {
				var _a, _b;
				if (this.draggingHorizontal) return;
				this.hoveringHorizontal = false;
				this.horizontal.style.backgroundColor = this.style.background;
				(_b = (_a = this.option).onMouseLeave) === null || _b === void 0 || _b.call(_a, event);
			};
			this.horizontal.onmouseenter = (event) => {
				var _a, _b;
				this.hoveringHorizontal = true;
				this.horizontal.style.backgroundColor = this.style.backgroundHover;
				(_b = (_a = this.option).onMouseEnter) === null || _b === void 0 || _b.call(_a, event);
			};
			this.horizontal.id = this.option.id;
			this.option.root.appendChild(this.horizontal);
		};
		_proto.registerVericalDrag = function registerVericalDrag() {
			this.register(dom.addDisposableListener(this.vertical, "mousedown", this.onVerticalStart));
			this.register(dom.addDisposableListener(this.vertical, "mouseup", this.onVerticalEnd));
			this.register(dom.addDisposableListener(this.vertical, "touchstart", this.onVerticalStart));
			this.register(dom.addDisposableListener(this.vertical, "touchend", this.onVerticalEnd));
		};
		_proto.registerHorizontalDrag = function registerHorizontalDrag() {
			this.register(dom.addDisposableListener(this.horizontal, "mousedown", this.onHorizontalStart));
			this.register(dom.addDisposableListener(this.horizontal, "mouseup", this.onHorizontalEnd));
			this.register(dom.addDisposableListener(this.horizontal, "touchstart", this.onHorizontalStart));
			this.register(dom.addDisposableListener(this.horizontal, "touchend", this.onHorizontalEnd));
		};
		_proto.handleVerticalDrag = function handleVerticalDrag(mouseY) {
			if (!("vertical" in this.option)) return;
			var viewRect = this.option.getViewRect();
			var viewHeight = viewRect.height;
			var scrollHeight = this.option.getScrollHeight();
			var scrollTop = this.option.getScrollTop();
			var offset = mouseY - this.preMouseY;
			var maxScrollerTop = viewRect.y + viewHeight - this.vertical.clientHeight;
			var nextScrollerY = Math.floor(this.scrollerY + offset);
			var step = 0;
			if (mouseY === this.preMouseY) return;
			if (nextScrollerY <= viewRect.y) {
				this.option.scrollToY(0);
				this.scrollerY = viewRect.y;
				this.updateVertical();
				return;
			}
			if (nextScrollerY >= maxScrollerTop) {
				this.option.scrollToY(scrollHeight - viewHeight);
				this.scrollerY = maxScrollerTop;
				this.updateVertical();
				return;
			}
			if (mouseY < this.preMouseY) {
				var toEndDistance = scrollTop;
				var scrollerToTop = this.scrollerY - viewRect.y;
				step = scrollerToTop > 0 ? Math.floor(toEndDistance / scrollerToTop * offset) : toEndDistance;
			} else {
				var toEndDistance1 = scrollHeight - (viewHeight + scrollTop);
				var scrollerToBottom = maxScrollerTop - this.scrollerY;
				step = scrollerToBottom > 0 ? Math.floor(toEndDistance1 / scrollerToBottom * offset) : toEndDistance1;
			}
			var nextScrollTop = Math.floor(Math.max(Math.min(scrollTop + step, scrollHeight - viewHeight), 0));
			this.option.scrollToY(nextScrollTop);
			this.preMouseY = mouseY;
			this.scrollerY = nextScrollerY;
		};
		_proto.handleHorizontalDrag = function handleHorizontalDrag(mouseX) {
			if (!("horizontal" in this.option)) return;
			var viewRect = this.option.getViewRect();
			var viewWidth = viewRect.width;
			var scrollWidth = this.option.getScrollWidth();
			var left = this.toSafeX(this.startHorizontalOffsetX + mouseX - this.evtStartX, this.horizontal.clientWidth);
			this.horizontal.style.left = `${Math.max(viewRect.x, left)}px`;
			this.horizontal.style.backgroundColor = this.style.backgroundHover;
			var scrollLeft = (left - viewRect.x) / viewWidth * scrollWidth;
			this.option.scrollToX(scrollLeft);
		};
		_proto.register = function register(t) {
			if (!t) return;
			return this._register(t);
		};
		_proto.registerScrollDispose = function registerScrollDispose(t) {
			if (!t) return;
			return this.scrollEventDispose.add(t);
		};
		return CommonScroller;
	}(import_main$8.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/features-lock/features-lock.js
var FeatureLock;
var init_features_lock = __esmMin((() => {
	FeatureLock = /* @__PURE__ */ function() {
		"use strict";
		function FeatureLock() {
			this.defaultLevelActionList = [];
			this.highLevelActionList = [];
			this.lowLevelActionList = [];
		}
		var _proto = FeatureLock.prototype;
		_proto.dispose = function dispose() {
			this.defaultLevelActionList = [];
			this.highLevelActionList = [];
			this.lowLevelActionList = [];
		};
		_proto.init = function init(featureLockConfig) {
			if (featureLockConfig.default) this.defaultLevelActionList.push(Object.assign({}, featureLockConfig.default));
			if (featureLockConfig.high) this.highLevelActionList.push(Object.assign({}, featureLockConfig.high));
			if (featureLockConfig.low) this.lowLevelActionList.push(Object.assign({}, featureLockConfig.low));
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature(actionFeatureId) {
			var isPrevent = false;
			var stopLow = false;
			this.defaultLevelActionList.forEach((action) => {
				var { id, isLock } = action;
				if (id.toLegacyString() === actionFeatureId.toLegacyString()) return;
				isPrevent = isPrevent || isLock();
			});
			if (isPrevent) return isPrevent;
			this.highLevelActionList.forEach((action) => {
				var { id, isLock } = action;
				if (id.toLegacyString() === actionFeatureId.toLegacyString()) {
					stopLow = true;
					return;
				}
				isPrevent = isPrevent || isLock();
			});
			if (stopLow || isPrevent) return isPrevent;
			this.lowLevelActionList.forEach((action) => {
				var { id, isLock } = action;
				if (id.toLegacyString() === actionFeatureId.toLegacyString()) return;
				isPrevent = isPrevent || isLock();
			});
			return isPrevent;
		};
		return FeatureLock;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/renderer/feature-renderer.js
function _inherits$7(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$7(subClass, superClass);
}
function _set_prototype_of$7(o, p) {
	_set_prototype_of$7 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$7(o, p);
}
var import_main$7, BaseFeatureRenderer;
var init_feature_renderer = __esmMin((() => {
	import_main$7 = require_main();
	init_es();
	init_feature_single();
	init_features_lock();
	BaseFeatureRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$7(BaseFeatureRenderer, Disposable);
		function BaseFeatureRenderer() {
			var _this = Disposable.call(this) || this;
			_this.featureLock = new FeatureLock();
			_this.features = {};
			return _this;
		}
		var _proto = BaseFeatureRenderer.prototype;
		_proto.dispose = function dispose(trace) {
			Disposable.prototype.dispose.call(this, trace);
			this.featureLock.dispose();
			Object.values(this.features).forEach((feature) => feature.dispose());
			this.features = {};
		};
		_proto.render = function render() {
			jankReport.log({
				moduleValue: "view",
				actionValue: "featureRenderStart"
			});
			Object.values(this.features).forEach((feature) => feature.render());
		};
		_proto.getFeature = function getFeature(id) {
			return this.features[id.toLegacyString()];
		};
		_proto.install = function install(featureOption, parentApi) {
			var { id, ctor: FEATURE_CONSTRUCTOR, config } = featureOption;
			var { auth, key } = config;
			if (!this.shouldBeInstalled(id) || !this.checkFeatureAvaliable(key, parentApi) || !this.checkPermission(auth, parentApi)) return;
			var feature = new FEATURE_CONSTRUCTOR(parentApi);
			this.features[id.toLegacyString()] = feature;
			feature.bootstrap();
		};
		_proto.shouldBeInstalled = function shouldBeInstalled(id) {
			if (id.toLegacyString() in this.features) {
				logger.error(`该 Feature 已经存在: `, id);
				return false;
			}
			return true;
		};
		_proto.checkFeatureAvaliable = function checkFeatureAvaliable(key, parentApi) {
			var { customConfig } = parentApi.context;
			if (!customConfig) return true;
			if (key && customConfig.featureServiceConfig[key]) return true;
			return false;
		};
		_proto.checkPermission = function checkPermission(auth, parentApi) {
			if (auth === FeatureAuth.None) return true;
			if (auth === FeatureAuth.Field) return parentApi.getStatus().canEditFieldInView;
			if (auth === FeatureAuth.Record) return parentApi.getStatus().canEditRecordInView;
			return true;
		};
		return BaseFeatureRenderer;
	}(import_main$7.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/renderer/base-renderer.js
function _inherits$6(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$6(subClass, superClass);
}
function _set_prototype_of$6(o, p) {
	_set_prototype_of$6 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$6(o, p);
}
var import_main$6, BaseRenderer;
var init_base_renderer = __esmMin((() => {
	import_main$6 = require_main();
	init_pen();
	init_utils$1();
	init_feature_renderer();
	BaseRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$6(BaseRenderer, Disposable);
		function BaseRenderer(root, context) {
			var _this;
			var _a;
			_this = Disposable.call(this) || this;
			_this.stage = _this._register(pen.stage({
				container: root,
				allowTouchAction: !!((_a = getScrollConfig(context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll)
			}));
			_this.featureRenderer = _this._register(new BaseFeatureRenderer());
			return _this;
		}
		var _proto = BaseRenderer.prototype;
		_proto.installFeature = function installFeature(...params) {
			this.featureRenderer.install(...params);
		};
		_proto.getFeatureRenderer = function getFeatureRenderer() {
			return this.featureRenderer;
		};
		_proto.getFeatureLock = function getFeatureLock() {
			return this.featureRenderer.featureLock;
		};
		return BaseRenderer;
	}(import_main$6.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/status/base-status.js
function _defineProperties$2(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$2(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$2(Constructor, staticProps);
	return Constructor;
}
var Status;
var init_base_status = __esmMin((() => {
	init_es$1();
	Status = /* @__PURE__ */ function() {
		"use strict";
		function Status(table, view, core) {
			this.table = table;
			this.view = view;
			this.core = core;
			this.isShutdown = false;
			this.getPermissionStatus = (key, target) => this.core.permissionService.getPermissionStatus(key, Object.assign(Object.assign({}, this.viewPosition), target));
			this.getPermissionExplanation = (key, target) => this.core.permissionService.getPermissionExplanation(key, Object.assign(Object.assign({}, this.viewPosition), target));
		}
		var _proto = Status.prototype;
		/**
		* 编辑状态打断
		* @param isEditable
		*/ _proto.setShutdown = function setShutdown(isShutdown) {
			this.isShutdown = isShutdown;
		};
		/**
		* 获取列限制
		*/ _proto.getFieldRestriction = function getFieldRestriction(fieldId) {
			var { table, view } = this;
			if (!table || !view) return;
			return this.core.fieldRestrictionService.getFieldRestriction({
				table,
				view,
				fieldId
			});
		};
		_create_class$2(Status, [
			{
				key: "isSupportContentPermission",
				get: function() {
					return supportContentPermission(this.core);
				}
			},
			{
				key: "canEditFieldInView",
				get: function() {
					if (this.isShutdown || !this.tablePermissionTarget) return false;
					return this.getPermissionStatus("canEdit", this.tablePermissionTarget);
				}
			},
			{
				key: "canEditRecordInView",
				get: function() {
					if (this.isShutdown) return false;
					if (!this.viewPermissionTarget || !this.tablePermissionTarget) return false;
					return this.getPermissionStatus("canEdit", this.viewPermissionTarget) || this.getPermissionStatus("canEdit", this.tablePermissionTarget);
				}
			},
			{
				key: "canEditViewConfig",
				get: function() {
					if (this.isShutdown || !this.tablePermissionTarget) return false;
					return this.getPermissionStatus("canEditViewConfig", this.tablePermissionTarget);
				}
			},
			{
				key: "tablePermissionTarget",
				get: function() {
					return Object.assign({ type: PermissionTargetType.TABLE }, this.viewPosition);
				}
			},
			{
				key: "viewPermissionTarget",
				get: function() {
					return Object.assign({ type: PermissionTargetType.VIEW }, this.viewPosition);
				}
			},
			{
				key: "viewPosition",
				get: function() {
					var _a, _b;
					return {
						tableId: (_a = this.table) === null || _a === void 0 ? void 0 : _a.id,
						viewId: (_b = this.view) === null || _b === void 0 ? void 0 : _b.id
					};
				}
			}
		]);
		return Status;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/get-block-style.js
/**
* 按给定 `OptionStyle` 取得色板配置，并按当前主题（亮/暗）返回可直接用于绘制的
* `{ background, borderColor, textColor, ... }`：
*
* - 亮色模式：直接返回色板 raw 配置；
* - 暗色模式：优先使用色板自带的 `darkBackground` / `darkBorderColor` / `darkTextColor`
*   （历史上可能是 flutter `0xff...` 格式，会归一化为 CSS `#RRGGBB`），缺失时走
*   `getDarkModeColor` / `getDarkModeTextColor` 动态换算，与移动端 funview 卡片保持一致。
*
* 结果按 `OptionStyle` 缓存，色板离散且有限，一次算好后续帧直接命中缓存。
*
* 使用场景：
* - 甘特 / 日历时间条：由 `getBlockStyle` 从 dateConfig 反查 optionStyle 后调用；
* - wb 卡片 / 行内 select pill（sys_tags 等）：直接以 `cellData.style` 调用，取得同一份配色。
*/ function getOptionStyleWithDarkMode(style) {
	var raw = getSelectOptionStyleConfig(style);
	if (!isDarkMode()) return raw;
	var cached = darkBlockStyleCache.get(style);
	if (cached) return cached;
	var dark = toDarkOptionStyle(raw);
	darkBlockStyleCache.set(style, dark);
	return dark;
}
/**
* 获取时间条样式（背景色、边框色、字体颜色）
*
* 亮色下直接返回色板配置；暗色下走 `getOptionStyleWithDarkMode` 统一处理。
*/ function getBlockStyle(recordId, helper) {
	var _a;
	var dateConfig = helper.getDateConfig();
	var optionStyle;
	if (!dateConfig) optionStyle = defaultColorConfig.specificColor;
	else if (dateConfig.dateColorConfig.type === TimeBarColorType.BY_SPECIFIC_COLOR) optionStyle = dateConfig.dateColorConfig.specificColor;
	else {
		var colorFieldId = dateConfig.dateColorConfig.selectFieldId;
		var colorCell = helper.getCell(colorFieldId, recordId);
		optionStyle = (_a = colorCell === null || colorCell === void 0 ? void 0 : colorCell.data[0]) === null || _a === void 0 ? void 0 : _a.style;
	}
	return getOptionStyleWithDarkMode(optionStyle !== null && optionStyle !== void 0 ? optionStyle : OptionStyle.DEFAULT);
}
function toDarkOptionStyle(raw) {
	var _a, _b, _c, _d;
	var background = (_a = pickDarkColor(raw.darkBackground, raw.background)) !== null && _a !== void 0 ? _a : raw.background;
	var borderColor = isTransparent(raw.borderColor) ? raw.borderColor : (_b = pickDarkColor(raw.darkBorderColor, raw.borderColor)) !== null && _b !== void 0 ? _b : raw.borderColor;
	var textColor = (_d = (_c = normalizeToCssHex(raw.darkTextColor)) !== null && _c !== void 0 ? _c : getDarkModeTextColor(raw.textColor, background)) !== null && _d !== void 0 ? _d : raw.textColor;
	return Object.assign(Object.assign({}, raw), {
		background,
		borderColor,
		textColor
	});
}
/**
* 色板里配置的 dark* 字段优先使用（可能是 flutter `0xff...` 或已经是 CSS `#RRGGBB`），
* 否则走算法把亮色转成暗色。
*/ function pickDarkColor(configured, fallbackLight) {
	if (configured && !isTransparent(configured)) {
		var normalized = normalizeToCssHex(configured);
		if (normalized) return normalized;
	}
	return getDarkModeColor(fallbackLight);
}
function isTransparent(color) {
	if (!color) return false;
	return color === "transparent" || color === "rgba(0,0,0,0)" || color === "rgba(0, 0, 0, 0)";
}
/**
* 把 flutter ARGB `0xAARRGGBB` 归一化为 CSS `#RRGGBB`（丢弃 alpha，与画布现有消费保持一致）。
* 传入已是 `#xxx` / `rgb(...)` 也会原样输出。
*/ function normalizeToCssHex(color) {
	if (!color) return void 0;
	if (isTransparent(color)) return color;
	if (color.startsWith("#") || color.startsWith("rgb")) return color;
	var { format, values } = parseColorToARGB(color);
	if (format === "unsupported" || values.length < 4) return void 0;
	var [, r, g, b] = values;
	var toHex = (n) => n.toString(16).padStart(2, "0");
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
var darkBlockStyleCache;
var init_get_block_style = __esmMin((() => {
	init_es();
	init_es$1();
	darkBlockStyleCache = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/resources/color.js
var wbColors;
var init_color = __esmMin((() => {
	init_es();
	wbColors = {
		get groupBgDefault() {
			return isDarkMode() ? "#313235" : "#f7f7f7";
		},
		get groupTextPending() {
			return isDarkMode() ? "" : "";
		},
		get groupTextInProgress() {
			return isDarkMode() ? "" : "";
		},
		get groupTextDone() {
			return isDarkMode() ? "" : "";
		},
		get groupTextPause() {
			return isDarkMode() ? "" : "";
		},
		get groupBgPending() {
			return this.groupBgDefault || (isDarkMode() ? "#141518" : "#f8f8f8");
		},
		get groupBgInProgress() {
			return this.groupBgDefault || (isDarkMode() ? "#1b2324" : "#f3fcf7");
		},
		get groupBgDone() {
			return this.groupBgDefault || (isDarkMode() ? "#1d2423" : "#f5fdfb");
		},
		get groupBgPause() {
			return this.groupBgDefault || (isDarkMode() ? "#282321" : "#fff7f0");
		},
		get cardActiveBg() {
			return isDarkMode() ? "#1d2c2c" : "#e8faf6";
		},
		get cardActiveBorder() {
			return isDarkMode() ? "#00c29a" : "#00c29a";
		},
		get tagDefaultBg() {
			return isDarkMode() ? "#242526" : "#f2f2f2";
		},
		get treeIndicatorLine() {
			return isDarkMode() ? "#7a7b80" : "#dcdce0";
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/resources/icon.js
/**
* 分组头右侧「+」按钮图标：粗描边纯色加号。
*
* 使用场景：`head.ts` 分组头右侧新增记录按钮。原全局 `NormalIconAlias.ADD` 图标（浅灰 #81868F）
* 在 wb 分组头浅色背景下对比度不足，业务方直接给了转曲后的 svg（原图 9.33×9.33 viewBox、
* 纯黑填充），此处参数化 fillColor 以便后续与主题联动。
*
* 视觉规格（严格按业务原图，未做二次改造）：
* - viewBox 9.3333×9.3333，粗横竖 + 号（不带外框），实心填充
* - fillColor 默认 `#000`、`fill-opacity=0.96`（业务原图设定，接近纯黑但略柔和）
*/ function getGroupAddSvg(fillColor = "#000") {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="9.3333" height="9.3333" viewBox="0 0 9.3333 9.3333"><path fill="${fillColor}" fill-opacity="0.96" d="M5.1667 0L5.1667 4.1667L9.3333 4.1667L9.3333 5.1667L5.1667 5.1667L5.1667 9.3333L4.1667 9.3333L4.1667 5.1667L0 5.1667L0 4.1667L4.1667 4.1667L4.1667 0L5.1667 0Z"/></svg>`;
}
/**
* 分组头右侧「更多」三点按钮图标：水平三个实心点。
*
* 使用场景：`head.ts` 分组头右侧「更多」菜单按钮。原全局 `NormalIconAlias.MENU_MORE`
* 图标（来自 docs-design-resources 通用 svg，填充色固定深灰 #81868F）在 wb 分组头
* 浅色背景下对比度尚可，但暗色模式下深色分组头背景下**几乎不可见**。
* 与 GROUP_ADD 同源的解法：本视图私有一份可参数化 fillColor 的三点 svg，
* Normal/Dark 分别注入合适前景色。
*
* 视觉规格：
* - 16×16 viewBox，三个 r=1 的实心圆，圆心 y=8，x 分别为 4 / 8 / 12，
*   点间距 4px（视觉均匀），点直径 2px 视觉上比 GROUP_ADD 加号略轻，符合「更多」次要按钮气质；
* - fillColor 默认 `#000`、`fill-opacity=0.96`，与 GROUP_ADD 保持同款参数化风格。
*/ function getGroupMoreSvg(fillColor = "#000") {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="${fillColor}" fill-opacity="0.96"><circle cx="4" cy="8" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="12" cy="8" r="1"/></g></svg>`;
}
/**
* 待开始：灰色虚线空心圆环
*/ function getStatusPendingSvg(backgroundColor = "transparent", fillColor = "#A6A6A6") {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" ry="12" fill="${backgroundColor}"/><circle cx="12" cy="12" r="7.5" fill="none" stroke="${fillColor}" stroke-width="1.5" stroke-dasharray="2 2"/></svg>`;
}
/**
* 进行中：圆环 + 右半填充
*
* 视觉规格（参考截图）：
* - 外圆环：r=7.5、stroke-width=1.5，stroke 中线在 r=7.5，内沿在 r≈6.75
* - 内部右半填充：r=4.5 的半圆（与外环内沿之间留出 ~2.25px 的环形空隙），
*   不能直接复用外环 r=7.5，否则填充会贴着圆环内沿、看不出"留白"。
*/ function getStatusInProgressSvg(backgroundColor = "transparent", fillColor = "#0372F8") {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" ry="12" fill="${backgroundColor}"/><circle cx="12" cy="12" r="7.5" fill="none" stroke="${fillColor}" stroke-width="1.5"/><path d="M12 7.5 A4.5 4.5 0 0 1 12 16.5 Z" fill="${fillColor}"/></svg>`;
}
/**
* 完成：绿色空心圆环 + 绿色对勾
*
* 视觉规格（参考截图）：
* - 外圆环与"进行中"保持一致：r=7.5、stroke-width=1.5，便于多状态并排时高度对齐
* - 对勾用与圆环同色描边（不是白色填充背景），stroke-width=1.6，圆头/圆角衔接
*/ function getStatusDoneSvg(backgroundColor = "transparent", fillColor = "#00B050") {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" ry="12" fill="${backgroundColor}"/><circle cx="12" cy="12" r="7.5" fill="none" stroke="${fillColor}" stroke-width="1.5"/><path d="M8.5 12.2 L11 14.7 L15.5 10" fill="none" stroke="${fillColor}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
/**
* 暂停/重点：空心圆环 + 内部实心小圆（bullseye / target）
*
* 视觉规格（对齐业务方新素材：橙色 `#E37318` 靶心；原素材 16×16 内环外径 7 / 内径 6 / 内实心圆 r=4，
* 内实心圆占外环内径的比例 ≈ 0.667）：
* - 外圆环沿用家族统一规格 `r=7.5 stroke-width=1.5`（与 pending / inProgress / done 并排等高，
*   见 `getStatusDoneSvg` 注释的对齐约定），未按新素材缩放为纯 1px 描边，避免打破家族基线；
* - 内部实心小圆 r=4.5（= 外环内沿 6.75 × 0.667），比例还原新素材"靶心占内径 2/3"的视觉分量；
*   相比旧版 r=3.2 更饱满，与外环之间空隙从 ~3.5px 收敛到 ~2.25px。
* - 内圆与外环同色（`#E37318`，替换旧 `#FA541C`），整体线框风格。
*/ function getStatusFocusSvg(backgroundColor = "transparent", fillColor = "#E37318") {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" ry="12" fill="${backgroundColor}"/><circle cx="12" cy="12" r="7.5" fill="none" stroke="${fillColor}" stroke-width="1.5"/><circle cx="12" cy="12" r="4.5" fill="${fillColor}"/></svg>`;
}
/**
* 空头像（未指派 / 待邀请）：人物上半身轮廓 + 头顶三段虚线弧
*
* 使用场景：`bottom-collectors.collectAvatarGroup` 在 owner 数据为空时绘制一个占位空头像，
* 在视觉上避免「该行整片空白」、保留对齐节奏；语义上提示"该记录暂无处理人"。
*
* 视觉规格（直接采用业务方提供的成品 svg）：
* - 16×16 viewBox，路径采用「实心填充」而非描边 —— 与状态家族（pending/done 描边风）不同源，
*   但与该业务方原型「实心人形 + 头顶三段虚线放射 + 左右上下四个圆点」严格对齐，不再二次绘制。
* - fill 通过 `${fillColor}` 参数化，默认 `#A6A6A6`（与 STATUS_PENDING 同灰，融入 wbColors 浅灰系）；
* - 背景仍走 rect 容器（rx 跟随 viewBox 一半 = 8），保持与其它图标的"圆形容器"接口一致。
*/ function getAvatarEmptySvg(_backgroundColor = "transparent", fillColor = "#A6A6A6") {
	return `<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="${fillColor}" fill-rule="evenodd" d="M6.8098 0.5225Q7.1272 0.4157 7.4511 0.3303Q7.775 0.2449 8.1038 0.1814L8.246 0.9178Q7.637 1.0354 7.0491 1.2333L6.8098 0.5225ZM4.4628 1.673Q4.7345 1.4923 5.0174 1.3297Q5.3003 1.1672 5.5932 1.0234L5.9237 1.6966Q5.3812 1.9629 4.8781 2.2975L4.4628 1.673ZM2.4754 3.4136Q2.6941 3.1637 2.9289 2.9289Q3.1637 2.6941 3.4136 2.4754L3.9075 3.0398Q3.4448 3.4448 3.0398 3.9075L2.4754 3.4136ZM1.0234 5.5932Q1.1672 5.3003 1.3297 5.0174Q1.4923 4.7345 1.673 4.4628L2.2975 4.8781Q1.9629 5.3812 1.6966 5.9237L1.0234 5.5932ZM0.1814 8.1038Q0.2449 7.775 0.3303 7.4511Q0.4157 7.1272 0.5225 6.8098L1.2333 7.0491Q1.0354 7.637 0.9178 8.246L0.1814 8.1038ZM0.0193 10.6208Q0.0096 10.4658 0.0048 10.3106Q0 10.1553 0 10Q0 9.8447 0.0048 9.6894Q0.0096 9.5342 0.0193 9.3792L0.7678 9.4257Q0.75 9.7126 0.75 10Q0.75 10.2874 0.7678 10.5743L0.0193 10.6208ZM0.5225 13.1902Q0.4157 12.8728 0.3303 12.5489Q0.2449 12.225 0.1814 11.8962L0.9178 11.754Q1.0354 12.363 1.2333 12.9509L0.5225 13.1902ZM1.673 15.5372Q1.4923 15.2655 1.3297 14.9826Q1.1672 14.6997 1.0234 14.4068L1.6966 14.0763Q1.9629 14.6188 2.2975 15.1219L1.673 15.5372ZM3.4136 17.5246Q3.1637 17.3059 2.9289 17.0711Q2.6941 16.8363 2.4754 16.5864L3.0398 16.0925Q3.4448 16.5552 3.9075 16.9602L3.4136 17.5246ZM5.5932 18.9766Q5.3003 18.8328 5.0174 18.6703Q4.7345 18.5077 4.4628 18.327L4.8781 17.7025Q5.3812 18.0371 5.9237 18.3034L5.5932 18.9766ZM8.1038 19.8186Q7.775 19.7551 7.4511 19.6697Q7.1272 19.5843 6.8098 19.4775L7.0491 18.7667Q7.637 18.9646 8.246 19.0822L8.1038 19.8186ZM10.6208 19.9807Q10.4658 19.9904 10.3106 19.9952Q10.1553 20 10 20Q9.8447 20 9.6894 19.9952Q9.5342 19.9904 9.3792 19.9807L9.4257 19.2322Q9.7126 19.25 10 19.25Q10.2874 19.25 10.5743 19.2322L10.6208 19.9807ZM13.1902 19.4775Q12.8728 19.5843 12.5489 19.6697Q12.225 19.7551 11.8962 19.8186L11.754 19.0822Q12.363 18.9646 12.9509 18.7667L13.1902 19.4775ZM15.5372 18.327Q15.2655 18.5077 14.9826 18.6703Q14.6997 18.8328 14.4068 18.9766L14.0763 18.3034Q14.6188 18.0371 15.1219 17.7025L15.5372 18.327ZM17.5246 16.5864Q17.3059 16.8363 17.0711 17.0711Q16.8363 17.3059 16.5864 17.5246L16.0925 16.9602Q16.5552 16.5552 16.9602 16.0925L17.5246 16.5864ZM18.9766 14.4068Q18.8328 14.6997 18.6703 14.9826Q18.5077 15.2655 18.327 15.5372L17.7025 15.1219Q18.0371 14.6188 18.3034 14.0763L18.9766 14.4068ZM19.8186 11.8962Q19.7551 12.225 19.6697 12.5489Q19.5843 12.8728 19.4775 13.1902L18.7667 12.9509Q18.9646 12.363 19.0822 11.754L19.8186 11.8962ZM19.9807 9.3792Q19.9904 9.5342 19.9952 9.6894Q20 9.8447 20 10Q20 10.1553 19.9952 10.3106Q19.9904 10.4658 19.9807 10.6208L19.2322 10.5743Q19.25 10.2874 19.25 10Q19.25 9.7126 19.2322 9.4257L19.9807 9.3792ZM19.4775 6.8098Q19.5843 7.1272 19.6697 7.4511Q19.7551 7.775 19.8186 8.1038L19.0822 8.246Q18.9646 7.637 18.7667 7.0491L19.4775 6.8098ZM18.327 4.4628Q18.5077 4.7345 18.6703 5.0174Q18.8328 5.3003 18.9766 5.5932L18.3034 5.9237Q18.0371 5.3812 17.7025 4.8781L18.327 4.4628ZM16.5864 2.4754Q16.8363 2.6941 17.0711 2.9289Q17.3059 3.1637 17.5246 3.4136L16.9602 3.9075Q16.5552 3.4448 16.0925 3.0398L16.5864 2.4754ZM14.4068 1.0234Q14.6997 1.1672 14.9826 1.3297Q15.2655 1.4923 15.5372 1.673L15.1219 2.2975Q14.6188 1.9629 14.0763 1.6966L14.4068 1.0234ZM11.8962 0.1814Q12.225 0.2449 12.5489 0.3303Q12.8728 0.4157 13.1902 0.5225L12.9509 1.2333Q12.363 1.0354 11.754 0.9178L11.8962 0.1814ZM10.6208 0.0193L10.5743 0.7678Q10.2874 0.75 10 0.75Q9.7126 0.75 9.4257 0.7678L9.3792 0.0193Q9.5342 0.0096 9.6894 0.0048Q9.8447 0 10 0Q10.1553 0 10.3106 0.0048Q10.4658 0.0096 10.6208 0.0193Z"/><circle fill="${fillColor}" cx="10" cy="8.75" r="3.125"/><path fill="${fillColor}" fill-rule="evenodd" transform="translate(3.05526 14.8779)" d="M6.8343 5.1215Q4.9199 5.1003 3.1487 4.3736Q1.3775 3.6468 0 2.3172C0.4768 1.1026 1.5607 0.2078 2.8646 0.032C3.0992 0 3.3785 0 3.9373 0L9.9346 0C10.4933 0 10.7727 0 11.0073 0.032C12.3156 0.2084 13.4024 1.1087 13.8767 2.3296Q12.5002 3.6535 10.7326 4.3769Q8.965 5.1004 7.0552 5.1215L6.8343 5.1215Z"/></svg>`;
}
/**
* 批量选中 checkbox（选中态）：实心绿色圆形 + 白色空心对勾
*
* 视觉规格（复用 STATUS_DONE 的圆形 + 对勾语言，但改为实心底）：
* - 24×24 viewBox，实心绿色圆 r=9（比 STATUS_DONE 的 r=7.5 圆环略大，视觉更饱满）
* - 白色对勾 stroke-width=2，圆头/圆角，与 STATUS_DONE 对勾路径一致
*/ function getCheckboxCheckedSvg(backgroundColor = "transparent", fillColor = "#00B050") {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" ry="12" fill="${backgroundColor}"/><circle cx="12" cy="12" r="9" fill="${fillColor}"/><path d="M8.5 12.2 L11 14.7 L15.5 10" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
/**
* 批量选中 checkbox（未选中态）：灰色空心圆环（无对勾）
*
* 视觉规格：
* - 24×24 viewBox，空心圆环 r=8、stroke-width=1.5，灰色 #BFBFBF
* - 与选中态保持同尺寸，便于批量模式下视觉对齐
*/ function getCheckboxUncheckedSvg(backgroundColor = "transparent", strokeColor = "#BFBFBF") {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" ry="12" fill="${backgroundColor}"/><circle cx="12" cy="12" r="8" fill="none" stroke="${strokeColor}" stroke-width="1.5"/></svg>`;
}
var GroupAddIconNormal, GroupAddIconDark, GroupMoreIconNormal, GroupMoreIconDark, StatusPendingIconNormal, StatusPendingIconDark, StatusInProgressIconNormal, StatusInProgressIconDark, StatusDoneIconNormal, StatusDoneIconDark, StatusFocusIconNormal, StatusFocusIconDark, AvatarEmptyIconNormal, AvatarEmptyIconDark, CheckboxCheckedIconNormal, CheckboxCheckedIconDark, CheckboxUncheckedIconNormal, CheckboxUncheckedIconDark, KanbanTodoIconAlias, KanbanTodoIconSrc, KANBAN_TODO_ICON_DARK_MAP, toThemedKanbanTodoIconAlias, isKanbanTodoIconAlias;
var init_icon = __esmMin((() => {
	init_es();
	init_ai_alias();
	init_resources();
	GroupAddIconNormal = svgToBase64(getGroupAddSvg());
	GroupAddIconDark = svgToBase64(getGroupAddSvg("#FFFFFF"));
	GroupMoreIconNormal = svgToBase64(getGroupMoreSvg());
	GroupMoreIconDark = svgToBase64(getGroupMoreSvg("#FFFFFF"));
	StatusPendingIconNormal = svgToBase64(getStatusPendingSvg());
	StatusPendingIconDark = svgToBase64(getStatusPendingSvg());
	StatusInProgressIconNormal = svgToBase64(getStatusInProgressSvg());
	StatusInProgressIconDark = svgToBase64(getStatusInProgressSvg());
	StatusDoneIconNormal = svgToBase64(getStatusDoneSvg());
	StatusDoneIconDark = svgToBase64(getStatusDoneSvg());
	StatusFocusIconNormal = svgToBase64(getStatusFocusSvg());
	StatusFocusIconDark = svgToBase64(getStatusFocusSvg());
	AvatarEmptyIconNormal = svgToBase64(getAvatarEmptySvg());
	AvatarEmptyIconDark = svgToBase64(getAvatarEmptySvg());
	CheckboxCheckedIconNormal = svgToBase64(getCheckboxCheckedSvg());
	CheckboxCheckedIconDark = svgToBase64(getCheckboxCheckedSvg());
	CheckboxUncheckedIconNormal = svgToBase64(getCheckboxUncheckedSvg());
	CheckboxUncheckedIconDark = svgToBase64(getCheckboxUncheckedSvg());
	(function(KanbanTodoIconAlias) {
		KanbanTodoIconAlias["STATUS_PENDING"] = "KT_STATUS_PENDING";
		KanbanTodoIconAlias["STATUS_PENDING_DARK"] = "KT_STATUS_PENDING_DARK";
		KanbanTodoIconAlias["STATUS_IN_PROGRESS"] = "KT_STATUS_IN_PROGRESS";
		KanbanTodoIconAlias["STATUS_IN_PROGRESS_DARK"] = "KT_STATUS_IN_PROGRESS_DARK";
		KanbanTodoIconAlias["STATUS_DONE"] = "KT_STATUS_DONE";
		KanbanTodoIconAlias["STATUS_DONE_DARK"] = "KT_STATUS_DONE_DARK";
		KanbanTodoIconAlias["STATUS_PAUSE"] = "KT_STATUS_PAUSE";
		KanbanTodoIconAlias["STATUS_FOCUS_DARK"] = "KT_STATUS_FOCUS_DARK";
		KanbanTodoIconAlias["AVATAR_EMPTY"] = "KT_AVATAR_EMPTY";
		KanbanTodoIconAlias["AVATAR_EMPTY_DARK"] = "KT_AVATAR_EMPTY_DARK";
		KanbanTodoIconAlias["CHECKBOX_CHECKED"] = "KT_CHECKBOX_CHECKED";
		KanbanTodoIconAlias["CHECKBOX_CHECKED_DARK"] = "KT_CHECKBOX_CHECKED_DARK";
		KanbanTodoIconAlias["CHECKBOX_UNCHECKED"] = "KT_CHECKBOX_UNCHECKED";
		KanbanTodoIconAlias["CHECKBOX_UNCHECKED_DARK"] = "KT_CHECKBOX_UNCHECKED_DARK";
		KanbanTodoIconAlias["GROUP_ADD"] = "KT_GROUP_ADD";
		KanbanTodoIconAlias["GROUP_ADD_DARK"] = "KT_GROUP_ADD_DARK";
		KanbanTodoIconAlias["GROUP_MORE"] = "KT_GROUP_MORE";
		KanbanTodoIconAlias["GROUP_MORE_DARK"] = "KT_GROUP_MORE_DARK";
	})(KanbanTodoIconAlias || (KanbanTodoIconAlias = {}));
	KanbanTodoIconSrc = {
		[KanbanTodoIconAlias.STATUS_PENDING]: StatusPendingIconNormal,
		[KanbanTodoIconAlias.STATUS_PENDING_DARK]: StatusPendingIconDark,
		[KanbanTodoIconAlias.STATUS_IN_PROGRESS]: StatusInProgressIconNormal,
		[KanbanTodoIconAlias.STATUS_IN_PROGRESS_DARK]: StatusInProgressIconDark,
		[KanbanTodoIconAlias.STATUS_DONE]: StatusDoneIconNormal,
		[KanbanTodoIconAlias.STATUS_DONE_DARK]: StatusDoneIconDark,
		[KanbanTodoIconAlias.STATUS_PAUSE]: StatusFocusIconNormal,
		[KanbanTodoIconAlias.STATUS_FOCUS_DARK]: StatusFocusIconDark,
		[KanbanTodoIconAlias.AVATAR_EMPTY]: AvatarEmptyIconNormal,
		[KanbanTodoIconAlias.AVATAR_EMPTY_DARK]: AvatarEmptyIconDark,
		[KanbanTodoIconAlias.CHECKBOX_CHECKED]: CheckboxCheckedIconNormal,
		[KanbanTodoIconAlias.CHECKBOX_CHECKED_DARK]: CheckboxCheckedIconDark,
		[KanbanTodoIconAlias.CHECKBOX_UNCHECKED]: CheckboxUncheckedIconNormal,
		[KanbanTodoIconAlias.CHECKBOX_UNCHECKED_DARK]: CheckboxUncheckedIconDark,
		[KanbanTodoIconAlias.GROUP_ADD]: GroupAddIconNormal,
		[KanbanTodoIconAlias.GROUP_ADD_DARK]: GroupAddIconDark,
		[KanbanTodoIconAlias.GROUP_MORE]: GroupMoreIconNormal,
		[KanbanTodoIconAlias.GROUP_MORE_DARK]: GroupMoreIconDark
	};
	KANBAN_TODO_ICON_DARK_MAP = {
		[KanbanTodoIconAlias.STATUS_PENDING]: KanbanTodoIconAlias.STATUS_PENDING_DARK,
		[KanbanTodoIconAlias.STATUS_IN_PROGRESS]: KanbanTodoIconAlias.STATUS_IN_PROGRESS_DARK,
		[KanbanTodoIconAlias.STATUS_DONE]: KanbanTodoIconAlias.STATUS_DONE_DARK,
		[KanbanTodoIconAlias.STATUS_PAUSE]: KanbanTodoIconAlias.STATUS_FOCUS_DARK,
		[KanbanTodoIconAlias.AVATAR_EMPTY]: KanbanTodoIconAlias.AVATAR_EMPTY_DARK,
		[KanbanTodoIconAlias.CHECKBOX_CHECKED]: KanbanTodoIconAlias.CHECKBOX_CHECKED_DARK,
		[KanbanTodoIconAlias.CHECKBOX_UNCHECKED]: KanbanTodoIconAlias.CHECKBOX_UNCHECKED_DARK,
		[KanbanTodoIconAlias.GROUP_ADD]: KanbanTodoIconAlias.GROUP_ADD_DARK,
		[KanbanTodoIconAlias.GROUP_MORE]: KanbanTodoIconAlias.GROUP_MORE_DARK
	};
	toThemedKanbanTodoIconAlias = (alias) => {
		var _a;
		if (!isDarkMode()) return alias;
		return (_a = KANBAN_TODO_ICON_DARK_MAP[alias]) !== null && _a !== void 0 ? _a : alias;
	};
	isKanbanTodoIconAlias = (alias) => {
		return alias in KanbanTodoIconSrc;
	};
	registerIconSrcMap(KanbanTodoIconSrc);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/wb-config.js
/**
* 判断分组头是否应渲染「+ 新增」按钮。
*
* 业务规则：按 `sys_source` 分组时，只有"手动创建"分组（rawText === 'manual'）允许新增；
* 其它来源（如他人转交）从系统流转而来，不允许手动新增，需隐藏 add 按钮。
* 按其它字段分组时（sys_status_id / sys_priority / 未分组 / ...）一律允许新增。
*
* 该判断在 grid-list / kanban-todo 两个视图共享，抽到此处避免字面量与逻辑漂移。
*
* @param groupField 当前分组字段；未分组或分组字段缺失时视为允许新增（返回 true）
* @param rawText 分组值的原始存储文本（**不是** 走 `applyGroupTextMap` 之后的显示文案，
*   显示文案会随宿主注入的 `domainConfig.getWbSourceInfo` handler 与本地化变化，不稳定）
*/ function shouldShowGroupAddButton(groupField, rawText) {
	if (!groupField) return true;
	if (groupField.getTitle() !== "sys_source") return true;
	return rawText === WB_SOURCE_MANUAL_VALUE;
}
var WB_SOURCE_FIELD_TITLE, WB_SOURCE_MANUAL_VALUE, WB_SOURCE_HANDOFF_VALUE, WB_SOURCE_DEFAULT_VISIBLE_VALUES, WbSharedConfig;
var init_wb_config = __esmMin((() => {
	init_es();
	init_color();
	init_icon();
	WB_SOURCE_FIELD_TITLE = "sys_source";
	WB_SOURCE_MANUAL_VALUE = "manual";
	WB_SOURCE_HANDOFF_VALUE = "handoff";
	WB_SOURCE_DEFAULT_VISIBLE_VALUES = [WB_SOURCE_MANUAL_VALUE, WB_SOURCE_HANDOFF_VALUE];
	WbSharedConfig = {
		get fieldTitleMap() {
			return {
				sys_title: i18n.t("标题"),
				sys_status_id: i18n.t("状态"),
				sys_source: i18n.t("来源"),
				sys_assignee_ids: i18n.t("处理人"),
				sys_started_at: i18n.t("开始日期"),
				sys_updated_at: i18n.t("更新时间"),
				sys_description: i18n.t("描述"),
				sys_summary: i18n.t("总结"),
				sys_attachments: i18n.t("附件"),
				sys_due_date: i18n.t("截止日期"),
				sys_created_by: i18n.t("创建人"),
				sys_created_at: i18n.t("创建时间"),
				sys_priority: i18n.t("优先级"),
				sys_iteration_id: i18n.t("迭代"),
				sys_parent_id: i18n.t("父任务"),
				sys_pause_reason: i18n.t("暂停原因"),
				sys_completed_at: i18n.t("完成时间"),
				sys_blocking_reason: i18n.t("阻塞原因"),
				sys_updated_by: i18n.t("更新人"),
				sys_tags: i18n.t("标签")
			};
		},
		head: {
			groupBys: { sys_status_id: { groupKeys: [
				{
					get title() {
						return i18n.t("待开始");
					},
					matchValue: "pending",
					icon: KanbanTodoIconAlias.STATUS_PENDING,
					get color() {
						return wbColors.groupTextPending;
					},
					get background() {
						return wbColors.groupBgPending;
					}
				},
				{
					get title() {
						return i18n.t("进行中");
					},
					matchValue: "running",
					icon: KanbanTodoIconAlias.STATUS_IN_PROGRESS,
					get color() {
						return wbColors.groupTextInProgress;
					},
					get background() {
						return wbColors.groupBgInProgress;
					}
				},
				{
					get title() {
						return i18n.t("已暂停");
					},
					matchValue: "paused",
					icon: KanbanTodoIconAlias.STATUS_PAUSE,
					get color() {
						return wbColors.groupTextPause;
					},
					get background() {
						return wbColors.groupBgPause;
					}
				},
				{
					get title() {
						return i18n.t("已完成");
					},
					matchValue: "done",
					icon: KanbanTodoIconAlias.STATUS_DONE,
					get color() {
						return wbColors.groupTextDone;
					},
					get background() {
						return wbColors.groupBgDone;
					}
				}
			] } },
			groupTextMap: {}
		},
		card: {
			body: {
				showFieldTitles: ["sys_summary"],
				tagFieldTitles: [
					"sys_status_id",
					"sys_priority",
					"sys_source",
					"sys_tags"
				]
			},
			bottom: {
				statusFieldTitle: "sys_status_id",
				ownerFieldTitle: "sys_assignee_ids",
				dateFieldTitle: "sys_created_at"
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/collector/data-util.js
function _inherits$5(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$5(subClass, superClass);
}
function _set_prototype_of$5(o, p) {
	_set_prototype_of$5 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$5(o, p);
}
var import_main$5, BaseCollectorDataUtil;
var init_data_util = __esmMin((() => {
	import_main$5 = require_main();
	BaseCollectorDataUtil = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$5(BaseCollectorDataUtil, Disposable);
		function BaseCollectorDataUtil(context) {
			var _this = Disposable.call(this) || this;
			_this.context = context;
			return _this;
		}
		var _proto = BaseCollectorDataUtil.prototype;
		/**
		* 获取视图上下文
		* @returns
		*/ _proto.getContext = function getContext() {
			return this.context;
		};
		/**
		* 获取根节点宽度（注意不要在滚动时读取避免发生重排影响性能）
		* @returns
		*/ _proto.getRootOffsetWidth = function getRootOffsetWidth() {
			return this.context.getRenderRoot().offsetWidth;
		};
		/**
		* 获取根节点高度（注意不要在滚动时读取避免发生重排影响性能）
		* @returns
		*/ _proto.getRootOffsetHeight = function getRootOffsetHeight() {
			return this.context.getRenderRoot().offsetHeight;
		};
		/**
		* 获取主列 id
		* @returns
		*/ _proto.getPrimaryFieldId = function getPrimaryFieldId() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getPrimaryField().getId()) || "";
		};
		/**
		* 获取当前视图的可见列
		* @returns
		*/ _proto.getVisibleFieldIds = function getVisibleFieldIds() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getVisibleFieldIds()) || [];
		};
		/**
		* 获取所有列（包括隐藏的）
		* @returns
		*/ _proto.getAllFieldIds = function getAllFieldIds() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getAllFieldIds()) || [];
		};
		/**
		* 获取列信息
		* @param columnId
		* @returns
		*/ _proto.getFieldByFieldId = function getFieldByFieldId(columnId) {
			var _a;
			return (_a = this.context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getFieldByFieldId(columnId);
		};
		/**
		* 获取当前视图的可见行
		* @returns
		*/ _proto.getDisplayedRecordIds = function getDisplayedRecordIds() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getDisplayedRecordIds()) || [];
		};
		_proto.getRecordIndexFromVisibleRecordIds = function getRecordIndexFromVisibleRecordIds(recordId) {
			var _a, _b, _c;
			return (_c = (_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getRecordIndexFromVisibleRecordIds) === null || _b === void 0 ? void 0 : _b.call(_a, recordId)) !== null && _c !== void 0 ? _c : -1;
		};
		/**
		* 获取所有的行（包括被筛选掉的、任何形式隐藏的）
		* @returns
		*/ _proto.getAllRecordIds = function getAllRecordIds() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getAllRecordIds()) || [];
		};
		/**
		* 获取单元格内容
		* @param fieldId
		* @param recordId
		* @returns
		*/ _proto.getStandardCell = function getStandardCell(fieldId, recordId) {
			var field = this.getFieldByFieldId(fieldId);
			return field === null || field === void 0 ? void 0 : field.getStandardCell(recordId);
		};
		/**
		* 获取坐标单元格
		*/ _proto.getCoordinateCell = function getCoordinateCell(rowIndex, columnIndex) {
			var fieldId = this.getVisibleFieldIds()[columnIndex];
			var recordId = this.getDisplayedRecordIds()[rowIndex];
			return this.getStandardCell(fieldId, recordId);
		};
		/**
		* 是否是空表
		* @returns
		*/ _proto.isEmpty = function isEmpty() {
			return this.getDisplayedRecordIds().length === 0;
		};
		/**
		* 获取当前数据层 ViewModel
		* @returns
		*/ _proto.getCurrentView = function getCurrentView() {
			return this.context.getCurrentView();
		};
		/**
		* 获取当前数据层 数据表
		* @returns
		*/ _proto.getCurrentTable = function getCurrentTable() {
			return this.context.getCurrentTable();
		};
		/**
		* 获取指定的数据表
		* @param tableId
		* @returns
		*/ _proto.getTable = function getTable(tableId) {
			return this.context.getCore().base.getTableByTableId(tableId);
		};
		return BaseCollectorDataUtil;
	}(import_main$5.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/storage-sync.js
function getStorageKey(tableId, viewId, baseId, key) {
	return TableCacheService.generateCacheKey({
		viewId,
		tableId,
		key
	}, baseId);
}
var getStorageValue, setStorageValue;
var init_storage_sync = __esmMin((() => {
	init_es$1();
	getStorageValue = (context, key) => {
		var _a, _b;
		var baseId = context.getCore().base.getId();
		var tableId = (_a = context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
		var viewId = (_b = context.getCurrentView()) === null || _b === void 0 ? void 0 : _b.id;
		if (!tableId || !viewId) return null;
		var storageKey = getStorageKey(tableId, viewId, baseId, key);
		return localStorage.getItem(storageKey);
	};
	setStorageValue = (context, key, value) => {
		var _a, _b;
		var baseId = context.getCore().base.getId();
		var tableId = (_a = context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
		var viewId = (_b = context.getCurrentView()) === null || _b === void 0 ? void 0 : _b.id;
		if (!tableId || !viewId) return;
		try {
			var storageKey = getStorageKey(tableId, viewId, baseId, key);
			localStorage.setItem(storageKey, value);
		} catch (e) {}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/collector/size.js
function _defineProperties$1(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$1(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$1(Constructor, staticProps);
	return Constructor;
}
function _inherits$4(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$4(subClass, superClass);
}
function _set_prototype_of$4(o, p) {
	_set_prototype_of$4 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$4(o, p);
}
var import_main$4, BaseSizeCollector;
var init_size = __esmMin((() => {
	import_main$4 = require_main();
	BaseSizeCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$4(BaseSizeCollector, Disposable);
		function BaseSizeCollector(dataUtil) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.scale = _this.dataUtil.getContext().customConfig ? 1 : _this.dataUtil.getContext().getScale();
			_this.rootWidthCache = 0;
			_this.rootHeightCache = 0;
			return _this;
		}
		var _proto = BaseSizeCollector.prototype;
		_proto.collect = function collect() {
			this.patch();
		};
		_proto.patch = function patch() {
			this.updateDomOffsetCache();
		};
		_proto.setScale = function setScale(scale) {
			if (this.dataUtil.getContext().customConfig) return;
			if (scale) this.scale = scale;
		};
		_proto.updateDomOffsetCache = function updateDomOffsetCache() {
			this.rootWidthCache = this.dataUtil.getRootOffsetWidth();
			this.rootHeightCache = this.dataUtil.getRootOffsetHeight();
		};
		_create_class$1(BaseSizeCollector, [{
			key: "globalOriginRootWidth",
			get: function() {
				if (!this.rootWidthCache) this.updateDomOffsetCache();
				return this.rootWidthCache;
			}
		}, {
			key: "globalOriginRootHeight",
			get: function() {
				if (!this.rootHeightCache) this.updateDomOffsetCache();
				return this.rootHeightCache;
			}
		}]);
		return BaseSizeCollector;
	}(import_main$4.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/collector/state.js
function _inherits$3(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$3(subClass, superClass);
}
function _set_prototype_of$3(o, p) {
	_set_prototype_of$3 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$3(o, p);
}
var import_main$3, BaseStateCollector;
var init_state = __esmMin((() => {
	import_main$3 = require_main();
	BaseStateCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$3(BaseStateCollector, Disposable);
		function BaseStateCollector() {
			var _this = Disposable.apply(this, arguments) || this;
			_this.$isExporting = false;
			return _this;
		}
		var _proto = BaseStateCollector.prototype;
		/**
		* 设置导出状态
		* @param exporting
		*/ _proto.setExporting = function setExporting(exporting) {
			this.$isExporting = exporting;
		};
		/**
		* 是否正在导出
		* @returns
		*/ _proto.isExporting = function isExporting() {
			return this.$isExporting;
		};
		return BaseStateCollector;
	}(import_main$3.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/collector/collector.js
function _inherits$2(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$2(subClass, superClass);
}
function _set_prototype_of$2(o, p) {
	_set_prototype_of$2 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$2(o, p);
}
var import_main$2, BaseCollector;
var init_collector = __esmMin((() => {
	import_main$2 = require_main();
	init_performance();
	BaseCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$2(BaseCollector, Disposable);
		function BaseCollector(context) {
			var _this = Disposable.call(this) || this;
			_this.context = context;
			return _this;
		}
		var _proto = BaseCollector.prototype;
		_proto.collect = function collect() {
			performanceReport.common.markAllInitCollectStart();
			this.handleCollect();
			performanceReport.common.markAllInitCollectEnd(this.context);
			this.afterCollect();
		};
		_proto.patch = function patch(mutations) {
			performanceReport.common.markAllPatchCollectStart();
			this.handlePatch(mutations);
			performanceReport.common.markAllPatchCollectEnd(this.context);
			this.afterCollect();
		};
		_proto.resize = function resize(scale) {
			performanceReport.common.markAllResizeCollectStart();
			this.handleResize(scale);
			performanceReport.common.markAllResizeCollectEnd(this.context);
			this.afterCollect();
		};
		_proto.afterCollect = function afterCollect() {
			this.context.emitter.global.afterCollect.fire();
		};
		return BaseCollector;
	}(import_main$2.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/renderer-model/base-renderer-model.js
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$1(subClass, superClass);
}
function _set_prototype_of$1(o, p) {
	_set_prototype_of$1 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$1(o, p);
}
var import_main$1, BaseRendererModel;
var init_base_renderer_model = __esmMin((() => {
	import_main$1 = require_main();
	init_base_status();
	BaseRendererModel = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$1(BaseRendererModel, Disposable);
		function BaseRendererModel(context) {
			var _this = Disposable.call(this) || this;
			_this.context = context;
			_this.onDidChangeModel = (param) => {
				var _a, _b;
				var { mutations, affectedTables } = param;
				var tableIds = new Set([...mutations.map(({ tableId }) => tableId), ...affectedTables]);
				var currentTableId = (_b = (_a = _this.context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
				if (tableIds.has(currentTableId)) _this.handleModelChange(mutations);
			};
			_this.status = new Status(context.getCurrentTable(), context.getCurrentView(), context.getCore());
			if (!context.customConfig) _this._register(context.getBehaviorApi().onDidChangeModel(_this.onDidChangeModel));
			return _this;
		}
		var _proto = BaseRendererModel.prototype;
		_proto.getStatus = function getStatus() {
			return this.status;
		};
		_proto.resize = function resize(scale) {
			this.collector.resize(scale);
		};
		_proto.handleModelChange = function handleModelChange(_mutations) {};
		return BaseRendererModel;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/abstract/view/canvas-view.js
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of(subClass, superClass);
}
function _set_prototype_of(o, p) {
	_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of(o, p);
}
var import_main, BaseCanvasView;
var init_canvas_view = __esmMin((() => {
	init_tslib_es6();
	import_main = require_main();
	init_es();
	init_es$1();
	init_common();
	init_pen();
	init_utils$1();
	init_performance();
	init_resources();
	init_transform_offset();
	BaseCanvasView = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits(BaseCanvasView, Disposable);
		function BaseCanvasView(context) {
			var _this = Disposable.call(this) || this;
			_this.context = context;
			_this.tickCallbacks = [];
			_this.attachmentPreviewUpdateCount = 0;
			_this.isDark = isDarkMode();
			_this.rootOriginWidthValue = "";
			_this.rootOriginHeightValue = "";
			_this.eventDispose = _this._register(new import_main.DisposableStore());
			_this.getPermissionStatus = (key, target) => _this.collector.status.getPermissionStatus(key, target);
			_this.onVisibilityChange = () => {
				if (document.visibilityState === "visible") _this.callResizeHandler();
			};
			_this.onDevicePixelRatioChange = () => {
				_this.callResizeHandler();
			};
			_this.onOrientationChange = () => {
				_this.callResizeHandler();
			};
			_this.onAllChunkApplied = () => {
				_this.render();
			};
			_this.onAttachmentPreviewUpdate = () => {
				_this.attachmentPreviewUpdateCount += 1;
			};
			_this.onPermissionChanged = () => {
				_this.recollect();
				_this.render();
			};
			_this.onStageResize = () => {
				_this.callResizeHandler();
			};
			_this.onRenderFinish = () => {
				var _a, _b, _c;
				_this.context.emitter.service.viewRenderEnd.fire(((_a = _this.context.getCurrentView()) === null || _a === void 0 ? void 0 : _a.id) || "");
				if (_this.attachmentPreviewUpdateCount > 0) {
					_this.attachmentPreviewUpdateCount -= 1;
					_this.recollect();
					_this.render();
				}
				fireEvent.execute(SmartSheetEventName.CANVAS_RENDER_FINISH, {
					editorId: _this.context.getId(),
					viewType: _this.getType(),
					recordCount: (_b = _this.context.getCurrentTable()) === null || _b === void 0 ? void 0 : _b.getRecordCount(),
					fieldCount: (_c = _this.context.getCurrentTable()) === null || _c === void 0 ? void 0 : _c.getFieldCount()
				});
			};
			_this.root = context.getRenderRoot();
			_this.rendererModel = _this._register(_this.createRendererModel());
			_this.renderer = _this._register(_this.createRenderer());
			pen.updateDefaultStyle();
			_this.collector = _this.rendererModel.collector;
			_this.UIEvent = _this.renderer.UIEvent;
			_this.render();
			_this.registerAllCanvasViewTypeEvents();
			return _this;
		}
		var _proto = BaseCanvasView.prototype;
		_proto.getType = function getType() {
			var _a, _b;
			return (_b = (_a = this.context.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : ViewType.GRID;
		};
		_proto.getScale = function getScale() {
			return this.collector.size.scale;
		};
		_proto.getRoot = function getRoot() {
			return this.context.getRenderRoot();
		};
		_proto.setCursor = function setCursor(cursor) {
			document.body.style.cursor = cursor;
		};
		_proto.getStatus = function getStatus() {
			return this.rendererModel.getStatus();
		};
		_proto.installFeature = function installFeature(params) {
			this.renderer.installFeature(params, this);
		};
		_proto.getFeature = function getFeature(id) {
			return this.renderer.getFeatureRenderer().getFeature(id);
		};
		_proto.getFeatureLock = function getFeatureLock() {
			return this.renderer.getFeatureLock();
		};
		_proto.getStage = function getStage() {
			return this.renderer.stage;
		};
		_proto.dispose = function dispose(trace) {
			Disposable.prototype.dispose.call(this, trace);
			pen.config.dispose();
			this.tickCallbacks = [];
			this.unRegisterAllCanvasViewTypeEvents();
		};
		_proto.recollect = function recollect() {
			this.collector.patch([]);
		};
		_proto.recollectAndRender = function recollectAndRender() {
			this.collector.patch([]);
			this.renderer.render();
		};
		_proto.setScale = function setScale(scale) {
			this.handleResize(scale);
		};
		_proto.nextTick = function nextTick(callback) {
			this.tickCallbacks.push(callback);
			this.clearTicks();
		};
		_proto.render = function render() {
			this.context.emitter.service.viewRenderBegin.fire();
			this.renderer.render();
		};
		/**
		* 视图导出前的处理
		* 视图实现时需要 override 该方法，在之后调整导出的大小等
		* @return boolean 是否继续导出
		*/ _proto.beforeExport = function beforeExport() {
			this.collector.state.setExporting(true);
			var rect = this.root.getBoundingClientRect();
			this.rootOriginWidthValue = `${rect.width}px`;
			this.rootOriginHeightValue = `${rect.height}px`;
			return true;
		};
		/**
		* 导出后的处理，恢复导出前的状态
		*/ _proto.afterExport = function afterExport() {
			this.collector.state.setExporting(false);
			this.root.style.removeProperty("width");
			this.root.style.removeProperty("height");
		};
		_proto.getViewStorage = function getViewStorage(key) {
			var _a, _b;
			var tableId = (_a = this.collector.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			var viewId = (_b = this.collector.dataUtil.getCurrentView()) === null || _b === void 0 ? void 0 : _b.id;
			return this.collector.dataUtil.getContext().getCore().tableCacheService.getItem({
				tableId,
				viewId,
				key
			});
		};
		_proto.setViewStorage = function setViewStorage(key, value) {
			var _a, _b;
			var tableId = (_a = this.collector.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			var viewId = (_b = this.collector.dataUtil.getCurrentView()) === null || _b === void 0 ? void 0 : _b.id;
			this.collector.dataUtil.getContext().getCore().tableCacheService.setItem({
				tableId,
				viewId,
				key,
				value
			});
		};
		_proto.getScrollStatus = function getScrollStatus() {
			if (this.collector.range) return this.collector.range.getScrollStatus();
			return {
				x: 0,
				y: 0,
				isTop: true,
				isBottom: true
			};
		};
		_proto.clearSearchHighlight = function clearSearchHighlight() {
			this.collector.state.clearHighlight();
		};
		_proto.setHighlightInfos = function setHighlightInfos(info) {
			var _a;
			var tempInfo = Object.assign(Object.assign({}, info), { fieldId: (_a = info.fieldId) !== null && _a !== void 0 ? _a : "" });
			this.collector.state.setHighlightInfos(tempInfo);
		};
		_proto.setSearchSelectedCell = function setSearchSelectedCell(recordId, fieldId) {
			this.collector.state.setHighlightActive({
				recordId,
				fieldId
			});
		};
		_proto.getCell = function getCell(fieldId, recordId) {
			var table = this.collector.dataUtil.getCurrentTable();
			var field = table === null || table === void 0 ? void 0 : table.getFieldByFieldId(fieldId);
			return field === null || field === void 0 ? void 0 : field.getStandardCell(recordId);
		};
		_proto.getField = function getField(fieldId) {
			var _a;
			return (_a = this.collector.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getFieldByFieldId(fieldId);
		};
		_proto.takeScreenShot = function takeScreenShot() {
			return Promise.resolve("");
		};
		_proto.toActived = function toActived() {};
		_proto.toDeactivated = function toDeactivated() {};
		_proto.setSearchState = function setSearchState(_searchState) {};
		_proto.renderForce = function renderForce() {
			this.render();
		};
		_proto.update = function update(option) {
			var _a;
			if ((option === null || option === void 0 ? void 0 : option.type) === UpdateType.Scale) {
				this.setScale((_a = option.scale) !== null && _a !== void 0 ? _a : 1);
				return;
			}
			this.collector.patch();
		};
		_proto.handleResize = function handleResize(scale) {
			this.rendererModel.resize(scale);
			this.renderer.resize();
		};
		/**
		* 获取表公告的 rect
		* @returns
		*/ _proto.getTableDescRect = function getTableDescRect() {
			if (!this.isTableDescriptionVisible || this.context.customConfig) {
				var clientRect = this.context.getRenderRoot().getBoundingClientRect();
				return {
					x: clientRect.left,
					y: clientRect.top,
					width: 0,
					height: 0
				};
			}
			var clientRect1 = this.context.getTableDescriptionRoot().getBoundingClientRect();
			return {
				x: clientRect1.left,
				y: clientRect1.top,
				width: clientRect1.width,
				height: clientRect1.height
			};
		};
		_proto.setRootSize = function setRootSize(width, height) {
			this.root.style.width = `${width}px`;
			this.root.style.height = `${height}px`;
		};
		_proto.clearTicks = function clearTicks() {
			while (this.tickCallbacks.length) this.tickCallbacks.shift()();
		};
		_proto.scrollToTop = function scrollToTop(scrollTop) {
			var _a;
			if (((_a = this.collector.range) === null || _a === void 0 ? void 0 : _a.scrollTop) === void 0) return;
			this.scrollByDelta({
				deltaX: 0,
				deltaY: scrollTop - this.collector.range.scrollTop,
				offsetX: 0,
				offsetY: 0
			});
		};
		_proto.scrollToLeft = function scrollToLeft(scrollLeft) {
			var _a;
			if (((_a = this.collector.range) === null || _a === void 0 ? void 0 : _a.scrollLeft) === void 0) return;
			this.scrollByDelta({
				deltaX: scrollLeft - this.collector.range.scrollLeft,
				deltaY: 0,
				offsetX: 0,
				offsetY: 0
			});
		};
		_proto.registerAllCanvasViewTypeEvents = function registerAllCanvasViewTypeEvents() {
			var _a, _b;
			this.addEventDisposable(this.UIEvent.stage.onResize(() => {
				this.onStageResize();
			}));
			this.addEventDisposable(fireEvent.registry(SmartSheetEventName.OUTER_TO_INNER_VIEWPORT_SCROLL, ({ editorId, scrollTop, scrollLeft }) => {
				if (editorId !== this.context.getId()) return;
				if (scrollTop !== void 0) this.scrollToTop(scrollTop);
				if (scrollLeft !== void 0) this.scrollToLeft(scrollLeft);
				requestAnimationFrame(() => {
					this.context.emitter.global.scroll.fire({
						x: 0,
						y: 0
					});
				});
			}));
			this.addEventDisposable(this.UIEvent.stage.onWheel(({ scrollInfo, event }) => {
				var useOuterVerticalScroll = this.useOuterVerticalScroll(scrollInfo);
				if (!useOuterVerticalScroll && scrollInfo.deltaY) event.preventDefault();
				this.scrollByDelta(useOuterVerticalScroll ? Object.assign(Object.assign({}, scrollInfo), { deltaY: 0 }) : scrollInfo);
				requestAnimationFrame(() => {
					this.context.emitter.global.scroll.fire({
						x: scrollInfo.offsetX,
						y: scrollInfo.offsetY
					});
				});
			}));
			this.addEventDisposable(this.UIEvent.stage.onSlide((scrollInfo) => {
				this.scrollByDelta(this.useOuterVerticalScroll(scrollInfo) ? Object.assign(Object.assign({}, scrollInfo), { deltaY: 0 }) : scrollInfo);
				this.context.emitter.global.scroll.fire({
					x: scrollInfo.offsetX,
					y: scrollInfo.offsetY
				});
			}));
			this.addEventDisposable(this.UIEvent.stage.onTap((event) => {
				this.context.emitter.action.tap.fire({ delta: {
					x: event.x,
					y: event.y
				} });
			}));
			this.addEventDisposable(dom.addDisposableListener(document, "visibilitychange", this.onVisibilityChange));
			this.devicePixelRatioMediaQueryList = globalThis.matchMedia(`(resolution: ${globalThis.devicePixelRatio}dppx)`);
			this.addEventDisposable(dom.addDisposableListener(this.devicePixelRatioMediaQueryList, "change", this.onDevicePixelRatioChange));
			this.addEventDisposable(dom.addDisposableListener(this.root, "contextmenu", (event) => {
				this.context.emitter.global.contextMenu.fire(Object.assign({ evt: event }, transformOffset(event, this.root, this.getScale())));
			}));
			this.addEventDisposable(dom.addDisposableListener(this.root, "dblclick", (event) => {
				this.context.emitter.global.dblclick.fire(Object.assign({ evt: event }, transformOffset(event, this.root, this.getScale())));
			}));
			this.addEventDisposable(dom.addDisposableListener(this.root, "click", (event) => {
				this.context.emitter.global.click.fire(Object.assign({ evt: event }, transformOffset(event, this.root, this.getScale())));
			}));
			this.addEventDisposable(dom.addDisposableListener(this.root, "mouseup", (event) => {
				this.context.emitter.global.mouseup.fire(Object.assign({ evt: event }, transformOffset(event, this.root, this.getScale())));
			}));
			this.addEventDisposable(dom.addDisposableListener(this.root, "mousedown", (event) => {
				this.context.emitter.global.mousedown.fire(Object.assign({ evt: event }, transformOffset(event, this.root, this.getScale())));
			}));
			this.addEventDisposable(dom.addDisposableListener(this.root, "mouseleave", (event) => {
				this.context.emitter.global.mouseleave.fire(Object.assign({ evt: event }, transformOffset(event, this.root, this.getScale())));
			}));
			this.addEventDisposable(dom.addDisposableListener(this.root, "mousemove", (event) => {
				this.context.emitter.global.mousemove.fire(Object.assign({ evt: event }, transformOffset(event, this.root, this.getScale())));
			}));
			if ((_a = this.devicePixelRatioMediaQueryList) === null || _a === void 0 ? void 0 : _a.addListener) this.devicePixelRatioMediaQueryList.addListener(this.onDevicePixelRatioChange);
			this.orientationMediaQueryList = globalThis.matchMedia("(orientation: portrait)");
			this.addEventDisposable(dom.addDisposableListener(this.orientationMediaQueryList, "change", this.onOrientationChange));
			if ((_b = this.orientationMediaQueryList) === null || _b === void 0 ? void 0 : _b.addListener) this.orientationMediaQueryList.addListener(this.onOrientationChange);
			this.addEventDisposable(this.context.getCore().chunkManager.onAllChunkApplied((tableId) => {
				var _a;
				if (tableId === ((_a = this.context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id)) this.onAllChunkApplied();
			}));
			this.addEventDisposable(this.context.getCore().permissionService.onPermissionStatusChanged(this.onPermissionChanged));
			this.addEventDisposable(attachmentPreviewImageLoader.fetchedEmitter.event(this.onAttachmentPreviewUpdate));
			this.addEventDisposable(resourceLoader.onDidBitmapLoad(() => this.render()));
			this.addEventDisposable(resourceLoader.onDidRenderFinish(this.onRenderFinish));
			this.darkModeMutationObserver = new MutationObserver((mutations) => {
				for (var mutation of mutations) if (mutation.type === "attributes" && mutation.attributeName === "class") {
					var isDark = isDarkMode();
					if (this.isDark !== isDark) {
						this.isDark = isDark;
						pen.updateDefaultStyle();
						this.recollect();
						this.render();
					}
				}
			});
			this.darkModeMutationObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"]
			});
		};
		_proto.useOuterVerticalScroll = function useOuterVerticalScroll(_scrollInfo) {
			var _a;
			return !!((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll);
		};
		_proto.unRegisterAllCanvasViewTypeEvents = function unRegisterAllCanvasViewTypeEvents() {
			var _a, _b, _c, _d;
			this.eventDispose.clear();
			if ((_a = this.devicePixelRatioMediaQueryList) === null || _a === void 0 ? void 0 : _a.removeListener) (_b = this.devicePixelRatioMediaQueryList) === null || _b === void 0 || _b.removeListener(this.onDevicePixelRatioChange);
			this.devicePixelRatioMediaQueryList = null;
			if ((_c = this.orientationMediaQueryList) === null || _c === void 0 ? void 0 : _c.removeListener) (_d = this.orientationMediaQueryList) === null || _d === void 0 || _d.removeListener(this.onOrientationChange);
			this.orientationMediaQueryList = null;
			if (this.darkModeMutationObserver) {
				this.darkModeMutationObserver.disconnect();
				this.darkModeMutationObserver = null;
			}
		};
		_proto.callResizeHandler = function callResizeHandler() {
			var rect = this.root.getBoundingClientRect();
			if (this.prevRootSize && this.prevRootSize.width === rect.width && this.prevRootSize.height === rect.height) return;
			this.prevRootSize = {
				width: rect.width,
				height: rect.height
			};
			performanceReport.common.markResizeStart();
			this.handleResize();
			performanceReport.common.markResizeEnd(this.context);
			this.context.emitter.global.resize.fire();
			logger.info(`[xview][handleResize] w=${rect.width}px,h=${rect.height}px`);
		};
		_proto.addEventDisposable = function addEventDisposable(eventDispose) {
			if (!eventDispose) return;
			this.eventDispose.add(eventDispose);
		};
		_create_class(BaseCanvasView, [
			{
				key: "fullViewWidth",
				get: function() {
					return this.collector.size.globalWidth;
				}
			},
			{
				key: "fullViewHeight",
				get: function() {
					return this.collector.size.globalHeight;
				}
			},
			{
				key: "globalPaddingTop",
				get: function() {
					return this.collector.size.globalPaddingTop;
				}
			},
			{
				key: "globalPaddingBottom",
				get: function() {
					return this.collector.size.globalPaddingBottom;
				}
			},
			{
				key: "globalPaddingLeft",
				get: function() {
					return this.collector.size.globalPaddingLeft;
				}
			},
			{
				key: "isTableDescriptionVisible",
				get: function() {
					var { tableDescriptionService } = this.context.getCore();
					return tableDescriptionService.getTableDescriptionVisible(this.context.getCurrentTable(), this.context.getCurrentView());
				}
			}
		]);
		return BaseCanvasView;
	}(import_main.Disposable);
	__decorate([
		debounceLowPriority(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], BaseCanvasView.prototype, "clearTicks", null);
}));
//#endregion
export { measureTextWidth as $, Status as A, init_utils$1 as At, init_feature_single as B, performanceReport as Bt, isKanbanTodoIconAlias as C, init_field_icon as Ct, getBlockStyle as D, init_checkbox_icon as Dt, wbColors as E, getCheckboxIconAliasIndex as Et, init_scroller as F, Direction as Ft, resourceLoader as G, pen as H, init_register_esc_to_cancel as I, XDirection as It, init_config$1 as J, init_lib as K, registerEscToCancel as L, YDirection as Lt, BaseRenderer as M, renderAppConfigService as Mt, init_base_renderer as N, RenderAppConfigKey as Nt, getOptionStyleWithDarkMode as O, getMainWidth as Ot, CommonScroller as P, init_index_interface as Pt, init_measurer as Q, BaseFeature as R, init_common as Rt, init_icon as S, getFieldTypeIconAlias as St, init_color as T, CheckboxType as Tt, init_resources as U, init_pen as V, registerIconSrcMap as W, DrawType$1 as X, Level as Y, init_interface$3 as Z, WB_SOURCE_FIELD_TITLE as _, init_normal_icon as _t, BaseCollector as a, transformOffset as at, shouldShowGroupAddButton as b, init_ai_alias as bt, init_state as c, HyperlinkTypeIcons as ct, getStorageValue as d, getHyperLinkTypeIconAlias as dt, init_is_in_rect as et, init_storage_sync as f, init_hyperlink_icon as ft, WB_SOURCE_DEFAULT_VISIBLE_VALUES as g, getSyncIconAlias as gt, init_data_util as h, getCheckboxIconAlias as ht, init_base_renderer_model as i, init_transform_offset as it, init_base_status as j, init_render_app_config as jt, init_get_block_style as k, getScrollConfig as kt, BaseSizeCollector as l, generateHyperlinkType as lt, BaseCollectorDataUtil as m, NormalIconSrc as mt, init_canvas_view as n, FeatureUIEvent as nt, init_collector as o, Cursor as ot, setStorageValue as p, NormalIconAlias as pt, DrawType as q, BaseRendererModel as r, init_feature_event as rt, BaseStateCollector as s, init_cursor as st, BaseCanvasView as t, isHitRect as tt, init_size as u, generateHyperlinkTypeToc as ut, WbSharedConfig as v, init_style as vt, toThemedKanbanTodoIconAlias as w, CheckboxIconsMapList as wt, KanbanTodoIconAlias as x, svgToBase64 as xt, init_wb_config as y, style as yt, FeatureAuth as z, init_performance as zt };
