import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { n as require_debounce } from "./throttle-mAPE4S6V.js";
import { n as __awaiter, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event } from "./esm-cVQVEiWG.js";
import { $i as MutationId, $l as init_es, $u as dom, Ac as getFormulaError, Bu as require_isEmpty, Do as getToComponentFilterInfo, Ec as StatType, Fl as DefaultConfig, Gu as CollabEvent, Iu as WeblogReportKey, Ks as multiply, Oo as getValidFilterConditions, Rc as isFormulaLikeField, Tc as FieldStatResultType, Td as isSSR, Vl as ViewType, Vs as ProgressField, Vu as require_dist, Wl as RowHeightLevel, Xu as domainConfig, Yu as logger, ao as DisplayMode, bd as SmartSheetEventName, cd as supportNewLayout, cu as clickIgnoreEle, du as getThemeTokenValue, ed as require_isEqual, fu as isDarkMode, gl as RequestId, ii as getAIErrCodeMsg, mi as DefaultWorkDayConfig, nl as NOT_EDITABLE_FIELD, oi as SelectionType$1, ql as FieldType, qu as ViewType$1, ri as canShowAIResetButton, si as SelectionUtils, ta as fieldHelper, td as reporter, uu as slicePush, wd as i18n, wu as getFormulaTagStyleConfig, yc as NumberFormat, yd as fireEvent, yi as TableFieldGroupType, zc as isFormulaLikeFieldType, zn as FieldGroupOperationType, zr as isSupportViewGroup } from "./execution-result-erkS5q1j.js";
import { n as init_esm$1, r as ua } from "./esm-mgJiqgJI.js";
import { c as require_cloneDeep } from "./merge-vXYl4M0x.js";
import { c as Direction } from "./interface-CoGujpRf.js";
import { o as ProgressRingGray12, t as init_esm$2 } from "./esm-6RpBOeSy.js";
import { Bt as getIsLinkGroupAppSync, Vt as isCurrentUserByRecordId, t as init_es$1 } from "./es-BQsslXL1.js";
import { At as init_utils$2, B as init_feature_single, Bt as performanceReport, F as init_scroller$1, Ft as Direction$1, G as resourceLoader, H as pen, I as init_register_esc_to_cancel, It as XDirection, K as init_lib, L as registerEscToCancel, Lt as YDirection, M as BaseRenderer, Mt as renderAppConfigService, N as init_base_renderer, Nt as RenderAppConfigKey, Ot as getMainWidth, P as CommonScroller, Pt as init_index_interface$1, R as BaseFeature, Rt as init_common, St as getFieldTypeIconAlias, U as init_resources, V as init_pen, X as DrawType, Y as Level, a as BaseCollector, at as transformOffset, c as init_state$1, d as getStorageValue, et as init_is_in_rect, f as init_storage_sync$1, gt as getSyncIconAlias, h as init_data_util$1, ht as getCheckboxIconAlias, i as init_base_renderer_model, it as init_transform_offset, jt as init_render_app_config, kt as getScrollConfig, l as BaseSizeCollector, m as BaseCollectorDataUtil, mt as NormalIconSrc, n as init_canvas_view, nt as FeatureUIEvent, o as init_collector$1, ot as Cursor, p as setStorageValue, pt as NormalIconAlias, r as BaseRendererModel, rt as init_feature_event, s as BaseStateCollector, st as init_cursor, t as BaseCanvasView, tt as isHitRect, u as init_size$1, vt as init_style, yt as style, z as FeatureAuth, zt as init_performance } from "./canvas-view-DDuMsrmC.js";
import { d as init_range_model, f as NotifySourceType, p as init_index_interface$2, r as init_time_util, t as TimeUtil, u as RangeModel } from "./time-util-BfGHaEiB.js";
import { E as init_constants$1, S as init_field_collector, T as LabelTypes, d as getWbSpecialMeasureFieldType, f as init_wb_cell, h as isWbTextLikeField, l as collectWbSpecialCell, m as isWbSpecialField, n as init_auto_scroll$1, t as AutoScroll, x as fieldCollector } from "./auto-scroll-Cn43Kqkt.js";
import { a as init_binary_search, i as binarySearch, n as init_common_action, r as require_Snackbar, t as CommonAction } from "./common-action-BPA9xdl-.js";
import { n as mapWbFieldTitle, t as init_field_title } from "./field-title-CxPwqqcd.js";
import { a as init_production, c as init_groupable_status, i as init_scroll_info, n as init_fix_scroll_delta, o as productReport, r as getScrollTipInfo, s as GroupableStatus, t as fixScrollDelta } from "./fix-scroll-delta-C4NjXGCK.js";
import { t as require_clamp } from "./clamp-B7QjjXLG.js";
import { n as getUrlHotRects, r as init_url_hot_rect, t as getUrlCombineHotRect } from "./url-hot-rect-D-NY8nLI.js";
import { a as runGroupTree, c as RowType, i as runGroupFlatten, l as init_interface$23, n as init_storage_sync$2, o as init_string_group_path, r as init_run_group, s as stringifyGroupPath, t as StorageSync } from "./storage-sync-CZ5zDwyE.js";
import { r as Modal_default, t as init_esm$3 } from "./esm-F18mgxoZ.js";
import { n as getDefaultGroupValueCollectConfig, r as init_config$2, t as getDefaultContentCollectConfig } from "./config-DWNn7aqz.js";
//#region ../../node_modules/@tencent/xtable-view/es/emitter/interface.js
var ExpandRowPath, ActivePointType, ActivePointButtonType, SearchReplaceType, IAIEntEventType;
var init_interface$22 = __esmMin((() => {
	(function(ExpandRowPath) {
		ExpandRowPath[ExpandRowPath["COMMON"] = 0] = "COMMON";
		ExpandRowPath[ExpandRowPath["INSERT_RECORD"] = 1] = "INSERT_RECORD";
		ExpandRowPath[ExpandRowPath["COMMENTS"] = 2] = "COMMENTS";
		ExpandRowPath[ExpandRowPath["DASHBOARD_DETAIL"] = 3] = "DASHBOARD_DETAIL";
	})(ExpandRowPath || (ExpandRowPath = {}));
	(function(ActivePointType) {
		ActivePointType["BUTTON_CLICK"] = "BUTTON_CLICK";
		ActivePointType["CONTENT_CLICK"] = "CONTENT_CLICK";
		ActivePointType["CONTENT_HOVER"] = "CONTENT_HOVER";
		ActivePointType["DBL_CLICK"] = "DBL_CLICK";
	})(ActivePointType || (ActivePointType = {}));
	(function(ActivePointButtonType) {
		ActivePointButtonType["ADD"] = "ADD";
		ActivePointButtonType["EMAIL"] = "EMAIL";
		ActivePointButtonType["PHONE"] = "PHONE";
		ActivePointButtonType["DELETE"] = "DELETE";
		ActivePointButtonType["DROPDOWN"] = "DROPDOWN";
		ActivePointButtonType["AI_CREATE"] = "AI_CREATE";
		ActivePointButtonType["AI_DROPDOWN"] = "AI_DROPDOWN";
	})(ActivePointButtonType || (ActivePointButtonType = {}));
	(function(SearchReplaceType) {
		SearchReplaceType["SEARCH"] = "SEARCH";
		SearchReplaceType["REPLACE"] = "REPLACE";
	})(SearchReplaceType || (SearchReplaceType = {}));
	(function(IAIEntEventType) {
		IAIEntEventType[IAIEntEventType["UpdateAIResult"] = 0] = "UpdateAIResult";
	})(IAIEntEventType || (IAIEntEventType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/interface/config.js
var init_config$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/stat-counter/copyright.js
var getStatOperatorsMap$1, getRenderStatOperatorsMap, getFieldStatCalculating;
var init_copyright$1 = __esmMin((() => {
	init_es();
	init_es$1();
	getStatOperatorsMap$1 = () => ({
		[StatType.NONE]: i18n.t("不展示"),
		[StatType.COUNT]: i18n.t("记录行数"),
		[StatType.EMPTY]: i18n.t("未填写"),
		[StatType.FILLED]: i18n.t("已填写"),
		[StatType.UNIQUE]: i18n.t("去重计数"),
		[StatType.EMPTY_PERCENT]: i18n.t("未填写占比"),
		[StatType.FILLED_PERCENT]: i18n.t("已填写占比"),
		[StatType.UNIQUE_PERCENT]: i18n.t("去重占比"),
		[StatType.UNCHECKED]: i18n.t("未勾选"),
		[StatType.CHECKED]: i18n.t("已勾选"),
		[StatType.UNCHECKED_PERCENT]: i18n.t("未勾选占比"),
		[StatType.CHECKED_PERCENT]: i18n.t("已勾选占比"),
		[StatType.LATEST]: i18n.t("最晚时间"),
		[StatType.EARLIEST]: i18n.t("最早时间"),
		[StatType.DAY_RANGE]: i18n.t("时间范围（日）"),
		[StatType.MONTH_RANGE]: i18n.t("时间范围（月）"),
		[StatType.SUM]: i18n.t("求和"),
		[StatType.AVERAGE]: i18n.t("平均值"),
		[StatType.MAX]: i18n.t("最大值"),
		[StatType.MIN]: i18n.t("最小值"),
		[StatType.GROUP_EARLIEST]: "",
		[StatType.GROUP_LATEST]: "",
		[StatType.IMAGE_COUNT]: i18n.t("图片数"),
		[StatType.FILE_COUNT]: i18n.t("文件数")
	});
	getRenderStatOperatorsMap = () => Object.assign({}, getStatOperatorsMap$1(), {
		[StatType.COUNT]: i18n.t("总数"),
		[StatType.EMPTY_PERCENT]: i18n.t("未填写"),
		[StatType.FILLED_PERCENT]: i18n.t("已填写"),
		[StatType.UNIQUE]: i18n.t("去重"),
		[StatType.UNIQUE_PERCENT]: i18n.t("去重"),
		[StatType.UNCHECKED_PERCENT]: i18n.t("未勾选"),
		[StatType.CHECKED_PERCENT]: i18n.t("已勾选"),
		[StatType.MONTH_RANGE]: i18n.t("范围"),
		[StatType.LATEST]: i18n.t("最晚"),
		[StatType.EARLIEST]: i18n.t("最早"),
		[StatType.DAY_RANGE]: i18n.t("范围")
	});
	getFieldStatCalculating = () => i18n.t("加载中");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/constants.js
function getMaxBreakLines(rowLevel, fieldType) {
	if (fieldType === FieldType.IMAGE) return getImageMaxLines(rowLevel);
	if (fieldType && LabelTypes.includes(fieldType)) return getLabelMaxLines(rowLevel);
	return MaxBreakLines.get(rowLevel);
}
function getImageMaxLines(rowLevel) {
	switch (rowLevel) {
		case RowHeightLevel.Short:
		case RowHeightLevel.Medium: return 1;
		case RowHeightLevel.Tall:
		case RowHeightLevel.ExtraTall: return 2;
		default: return 1;
	}
}
function getLabelMaxLines(rowLevel) {
	switch (rowLevel) {
		case RowHeightLevel.Short:
		case RowHeightLevel.Medium: return 1;
		case RowHeightLevel.Tall: return 3;
		case RowHeightLevel.ExtraTall: return 4;
		default: return 1;
	}
}
var OperatorField, AdditionField, MaxBreakLines;
var init_constants = __esmMin((() => {
	init_es$1();
	init_constants$1();
	OperatorField = "Operator";
	AdditionField = "Addition";
	MaxBreakLines = /* @__PURE__ */ new Map();
	MaxBreakLines.set(RowHeightLevel.Short, 1);
	MaxBreakLines.set(RowHeightLevel.Medium, 2);
	MaxBreakLines.set(RowHeightLevel.Tall, 4);
	MaxBreakLines.set(RowHeightLevel.ExtraTall, 6);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/view-config/interface.js
var LayoutConfigKey, FeatureServiceConfigKey;
var init_interface$21 = __esmMin((() => {
	(function(LayoutConfigKey) {
		LayoutConfigKey["HIDE_OPERATOR_FIELD"] = "hide-operator-filed";
		LayoutConfigKey["HIDE_OPERATOR_SELECT_ICON"] = "hide-operator-select-icon";
		LayoutConfigKey["HIDE_RECORD_SELECT_ICON"] = "hide-record-select-icon";
		LayoutConfigKey["HIDE_FIELD_ADD"] = "hide-field-add";
		LayoutConfigKey["HIDE_RECORD_ADD"] = "hide-record-add";
		LayoutConfigKey["SHOW_BORDER_RADIUS"] = "show-border-radius";
		LayoutConfigKey["CUSTOM_FILED_WIDTH"] = "custom-field-width";
		LayoutConfigKey["HIDE_RECORD_BOTTOM_BORDER"] = "hide-record-bottom-border";
		/**
		* 主区域宽度: 比如内嵌 sc 场景, 智能表集中在一个主区域展示
		* - 表格视图最小宽度会以这个为准, 通过增加新建列宽度撑开
		* - 数据统计最小宽度已这个为准, 最大宽度跟随列宽
		*/ LayoutConfigKey["MAIN_WIDTH"] = "main-width";
		LayoutConfigKey["HIDE_RECORDS"] = "hide-records";
		LayoutConfigKey["HIDE_RECORD_EXPAND_BUTTON"] = "hide-record-expand-button";
	})(LayoutConfigKey || (LayoutConfigKey = {}));
	(function(FeatureServiceConfigKey) {
		FeatureServiceConfigKey["FIELD_WIDTH"] = "field_width";
		FeatureServiceConfigKey["AREA_INTERACTIVE"] = "area_interactive";
		FeatureServiceConfigKey["RECORD_ACTIVE"] = "record_active";
		FeatureServiceConfigKey["SELECTION"] = "selection";
		FeatureServiceConfigKey["RECORD_HOVER"] = "record_hover";
		FeatureServiceConfigKey["ACTIVE_POINT"] = "active_point";
		FeatureServiceConfigKey["SCROLLER"] = "scroller";
		FeatureServiceConfigKey["FIELD_MOVE"] = "field_move";
		FeatureServiceConfigKey["RECORD_MOVE"] = "record_move";
	})(FeatureServiceConfigKey || (FeatureServiceConfigKey = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/float-state/index.js
function _inherits$56(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$56(subClass, superClass);
}
function _set_prototype_of$56(o, p) {
	_set_prototype_of$56 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$56(o, p);
}
var import_main$9, FloatState;
var init_float_state = __esmMin((() => {
	init_event();
	import_main$9 = require_main();
	FloatState = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$56(FloatState, Disposable);
		function FloatState(emitter) {
			var _this = Disposable.call(this) || this;
			_this.emitter = emitter;
			_this.floatLayerPosition = null;
			_this.extraFloatLayoutInfo = null;
			_this.onFloatLayerPositionChangeEmitter = _this._register(new Emitter());
			_this.onFloatLayerPositionChange = _this.onFloatLayerPositionChangeEmitter.event;
			return _this;
		}
		var _proto = FloatState.prototype;
		_proto.isShow = function isShow() {
			return Boolean(this.floatLayerPosition);
		};
		_proto.getPosition = function getPosition() {
			return this.floatLayerPosition;
		};
		_proto.setExtraFloatLayoutInfo = function setExtraFloatLayoutInfo(extraFloatLayoutInfo) {
			this.extraFloatLayoutInfo = extraFloatLayoutInfo;
		};
		_proto.getExtraFloatLayoutInfo = function getExtraFloatLayoutInfo() {
			return this.extraFloatLayoutInfo;
		};
		_proto.show = function show(floatLayerPosition, extraFloatLayoutInfo) {
			this.floatLayerPosition = floatLayerPosition;
			this.onFloatLayerPositionChangeEmitter.fire(floatLayerPosition);
			if (extraFloatLayoutInfo) this.extraFloatLayoutInfo = extraFloatLayoutInfo;
		};
		_proto.setField = function setField(fieldId) {
			if (!this.floatLayerPosition) return;
			this.floatLayerPosition.fieldId = fieldId;
		};
		_proto.hide = function hide() {
			this.floatLayerPosition = null;
			this.onFloatLayerPositionChangeEmitter.fire(null);
		};
		return FloatState;
	}(import_main$9.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/work-day/util.js
/**
* @description 计算天数是否包含假期
* @param {Core} core
* @returns {boolean}
*/ function isCalcHoliday(dateConfig) {
	var _a, _b;
	if (!dateConfig) return false;
	return (_b = (_a = dateConfig === null || dateConfig === void 0 ? void 0 : dateConfig.workDayConfig) === null || _a === void 0 ? void 0 : _a.calcHoliday) !== null && _b !== void 0 ? _b : DefaultWorkDayConfig.calcHoliday;
}
/**
* @description 假期是否包含法定节假日
* @param {Core} core
* @returns {boolean}
*/ function hasStatutoryHoliday(dateConfig) {
	var _a, _b;
	if (!dateConfig) return false;
	return (_b = (_a = dateConfig === null || dateConfig === void 0 ? void 0 : dateConfig.workDayConfig) === null || _a === void 0 ? void 0 : _a.statutoryHoliday) !== null && _b !== void 0 ? _b : DefaultWorkDayConfig.statutoryHoliday;
}
var init_util$1 = __esmMin((() => {
	init_es$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/get-frozen-end-y.js
/**
* 获取冻结线结束 y 坐标，也用于列选区 hover 态
*/ function getFrozenEndY(collector) {
	var { range, size, rows, widgetCollector } = collector;
	var maxY = size.activityViewHeight + size.activityStartY;
	var endY = size.activityStartY;
	var { end } = range.getRowRange();
	var rowInfo = rows.getInfo(end);
	if (rowInfo) endY += rowInfo.y + rowInfo.height - range.scrollTop;
	if (end === rows.rowCount - 1) {
		if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) === RowType.GroupAdd) endY -= rowInfo.height + rows.getRowSize(RowType.Spacing);
	}
	endY = endY > maxY ? maxY : endY;
	endY = endY - size.bodyReduceHeight;
	var pinnedTopY = widgetCollector.getPinnedOccupyTopY();
	if (Number.isFinite(pinnedTopY)) {
		var pinnedBottomY = size.rootHeight - size.globalPaddingBottom;
		endY = Math.min(endY, pinnedBottomY);
	}
	return endY;
}
var init_get_frozen_end_y = __esmMin((() => {
	init_interface$23();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/storage-key.js
var GridStorageType;
var init_storage_key = __esmMin((() => {
	(function(GridStorageType) {
		GridStorageType["Position"] = "GridScrollPosition";
		GridStorageType["FoldGroup"] = "GridFoldGroups";
		GridStorageType["RootWidth"] = "GanttRootWidth";
		GridStorageType["HideGrid"] = "GanttHideGrid";
		GridStorageType["TimeType"] = "GanttTimeType";
		GridStorageType["GridInGanttPosition"] = "GridInGanttPosition";
	})(GridStorageType || (GridStorageType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/head-right-dropdown-rect.js
/**
* 获取表头上的右侧下拉按钮的位置
* @param boxRectOrColumnInfo 如果直接传入 rect 则直接使用，如果传入 ColumnInfo，需要根据 text 和传入 columnRect 来算出 rect
* @param columnRect 如果传入 ColumnInfo，需要传入 columnRect
* @returns
*/ function getHeadRightDropdownInfo(boxRectOrColumnInfo) {
	var boxRect = boxRectOrColumnInfo;
	var rectSize = style.size.iconLarge;
	var iconTakeWidth = rectSize + style.size.iconPadding;
	if (boxRect.width < iconTakeWidth) return;
	var rect = {
		x: boxRect.x + boxRect.width - iconTakeWidth,
		y: boxRect.y + (boxRect.height - rectSize) / 2,
		width: rectSize,
		height: rectSize
	};
	var iconSize = style.size.iconSmall;
	return {
		rect,
		icon: {
			x: rect.x + rect.width / 2 - iconSize / 2,
			y: rect.y + rect.height / 2 - iconSize / 2,
			width: iconSize,
			height: iconSize
		}
	};
}
var init_head_right_dropdown_rect = __esmMin((() => {
	init_style();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/action.js
function _inherits$55(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$55(subClass, superClass);
}
function _set_prototype_of$55(o, p) {
	_set_prototype_of$55 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$55(o, p);
}
var GridAction;
var init_action = __esmMin((() => {
	init_esm$3();
	init_es();
	init_style();
	init_constants();
	init_interface$23();
	init_head_right_dropdown_rect();
	init_common_action();
	init_transform_offset();
	GridAction = /* @__PURE__ */ function(CommonAction) {
		"use strict";
		_inherits$55(GridAction, CommonAction);
		function GridAction(context, dataUtil, collector, parentApi) {
			var _this = CommonAction.call(this, context, dataUtil) || this;
			_this.context = context;
			_this.dataUtil = dataUtil;
			_this.collector = collector;
			_this.parentApi = parentApi;
			return _this;
		}
		var _proto = GridAction.prototype;
		_proto.clickOperatorCheckbox = function clickOperatorCheckbox() {
			this.collector.state.setAllSelect(!this.collector.state.isSelectAll());
			this.collector.columns.patch();
			this.collector.rows.patch();
			this.parentApi.renderMain();
		};
		_proto.clickFieldDropdown = function clickFieldDropdown(evt, columnInfo) {
			var x = columnInfo.x + columnInfo.width - (columnInfo.isFrozen ? 0 : this.collector.range.scrollLeft) - 203;
			if (x < 0) x = columnInfo.x - (columnInfo.isFrozen ? 0 : this.collector.range.scrollLeft);
			this.context.emitter.service.openContextMenu.fire({
				evt,
				x,
				y: columnInfo.y + columnInfo.height - 8
			});
		};
		/**
		* 点击列编组 dropdown：弹出"编组"类型的右键菜单。
		*
		* 流程与普通列 dropdown 一致：
		* 1. fire service.openContextMenu（定位 + 显示菜单，evt 用于让业务层反查命中位置）
		* 2. 业务层通过 evt 的 clientY 反查到编组头行 → 识别 ContextmenuType.FieldGroup
		*
		* 同时为了让选区、右键菜单参数一致，额外 fire fieldTitleContextMenuEmitter —— 复用
		* field-move 监听器，把整组字段设为列选区，保证菜单内的"隐藏/解散"等操作针对整组。
		*/ _proto.clickFieldGroupDropdown = function clickFieldGroupDropdown(evt, columnInfo) {
			var _a, _b;
			if (!columnInfo.fieldGroupId || !columnInfo.fieldGroupRect) return;
			var contextMenuWidth = 203;
			var { size } = this.collector;
			var groupRect = columnInfo.fieldGroupRect;
			var groupScreenX = groupRect.x - (columnInfo.isFrozen ? 0 : this.collector.range.scrollLeft);
			var dropdownInfo = getHeadRightDropdownInfo({
				x: groupScreenX,
				y: groupRect.y,
				width: groupRect.width,
				height: groupRect.height
			});
			var dropdownX = (_a = dropdownInfo === null || dropdownInfo === void 0 ? void 0 : dropdownInfo.rect.x) !== null && _a !== void 0 ? _a : groupScreenX + groupRect.width;
			var x = dropdownX + ((_b = dropdownInfo === null || dropdownInfo === void 0 ? void 0 : dropdownInfo.rect.width) !== null && _b !== void 0 ? _b : 0) - contextMenuWidth + style.size.iconLarge;
			if (x < 0) x = dropdownX;
			this.context.emitter.service.fieldTitleContextMenuEmitter.fire({ columnInfo: {
				id: columnInfo.id,
				fieldGroupId: columnInfo.fieldGroupId
			} });
			this.context.emitter.service.openContextMenu.fire({
				evt,
				x,
				y: size.globalPaddingTop + size.fieldGroupHeaderHeight - 8
			});
		};
		_proto.clickFoldGroup = function clickFoldGroup(rowIndex) {
			var rowInfo = this.collector.rows.getInfo(rowIndex);
			if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.GroupHead) return;
			var { widgetCollector, range } = this.collector;
			var isFolding = !rowInfo.fold;
			var desiredScrollTop;
			if (isFolding && widgetCollector.isGroupHeadStickyEnabled()) {
				var preStickyInfo = widgetCollector.computeGroupHeadSticky(rowInfo);
				if (preStickyInfo.isSticking) desiredScrollTop = rowInfo.y - preStickyInfo.finalY;
			}
			this.parentApi.setGroupFold({
				fold: !rowInfo.fold,
				groupKeys: [rowInfo.path]
			});
			if (desiredScrollTop !== void 0 && desiredScrollTop !== range.scrollTop) range.updateScrollTop(desiredScrollTop);
			this.parentApi.renderMain();
		};
		_proto.clickGroupValue = function clickGroupValue(groupPath, groupValueRect, isAdd = false) {
			var rect = this.rectAddScale(groupValueRect);
			if (isAdd) {
				var [firstFieldId] = this.dataUtil.getAllFieldIds();
				var { columns } = this.collector;
				rect.width = columns.getWidth(OperatorField) + columns.getWidth(firstFieldId);
			}
			this.context.emitter.service.editGroupClickEmitter.fire({
				groupPath,
				rect,
				isAdd
			});
		};
		_proto.clickStat = function clickStat(columnId, statRect, isGlobal, layoutIndex, parentLayoutIndex, statResult) {
			this.context.emitter.service.stat.fire({
				fieldId: columnId,
				rect: this.rectAddScale(Object.assign(Object.assign({}, statRect), { y: statRect.y })),
				layoutIndex,
				parentLayoutIndex,
				stat: statResult
			});
		};
		_proto.clickFieldAdd = function clickFieldAdd(columnRect) {
			var rect = this.rectAddScale(columnRect);
			this.context.emitter.service.addFieldClickEmitter.fire({ rect });
			this.parentApi.getRangeModel().resetSelection();
		};
		_proto.clickRecordAdd = function clickRecordAdd(rowInfo) {
			var _a;
			var preRowInfo = this.collector.rows.getInfo(rowInfo.index - 1);
			var recordId = (preRowInfo === null || preRowInfo === void 0 ? void 0 : preRowInfo.type) === RowType.Record ? preRowInfo.recordId : "";
			var groupPath = rowInfo.parent === -1 ? [] : ((_a = this.collector.rows.getInfo(rowInfo.parent)) === null || _a === void 0 ? void 0 : _a.path) || [];
			if (domainConfig.getIsWb()) {
				if (groupPath) this.context.emitter.wbService.onGroupAddClick.fire({ groupPath });
				else this.context.emitter.wbService.onRecordClick.fire({ recordId: "" });
				return;
			}
			this.context.emitter.service.addRecordClickEmitter.fire({
				recordId,
				groupPath
			});
		};
		_proto.clickGroupAdd = function clickGroupAdd(...params) {
			this.clickGroupValue(params[0], params[1], true);
		};
		_proto.clickOpenGanttSetting = function clickOpenGanttSetting() {
			this.context.emitter.service.expandDateConfigSetting.fire();
		};
		_proto.openFilterPanel = function openFilterPanel(fieldId) {
			this.context.emitter.service.openFilterPanel.fire(fieldId);
		};
		_proto.getScale = function getScale() {
			return this.collector.size.scale;
		};
		_proto.clickGroupMoreMenu = function clickGroupMoreMenu(evt, iconRect) {
			var canvasRect = this.context.getRenderRoot().getBoundingClientRect();
			var rectOffset = {
				left: iconRect.x + canvasRect.x - 10,
				top: iconRect.y + iconRect.height + canvasRect.y - 10
			};
			this.context.emitter.global.contextMenu.fire(Object.assign({ evt }, transformOffset(evt, this.context.getRenderRoot(), this.getScale())));
			this.context.emitter.service.openGroupMoreEditor.fire(rectOffset);
		};
		_proto.openStatOperatorPanel = function openStatOperatorPanel(columnInfo, rowInfo, hover = false) {
			var isGridNewLayout = this.collector.dataUtil.isGridNewLayout();
			if (!rowInfo || !columnInfo || !isGridNewLayout) return;
			var layoutIndex = rowInfo.index;
			var parentLayoutIndex = rowInfo.parent;
			var fieldId = columnInfo.id;
			var { size, profile } = this.collector;
			var rect = {
				x: size.globalPaddingLeft,
				y: size.activityStartY + size.activityViewHeight,
				width: size.globalPaddingLeft + profile.operatorFieldWidth,
				height: size.statHeight
			};
			this.collector.dataUtil.getContext().emitter.service.statOperator.fire({
				fieldId,
				rect,
				layoutIndex,
				parentLayoutIndex,
				core: this.collector,
				hover
			});
		};
		_proto.clickAIStop = function clickAIStop(fieldId) {
			return new Promise((resolve, reject) => {
				Modal_default.confirm({
					title: i18n.t("确定停止 AI 生成？"),
					content: i18n.t("已生成的内容将保留"),
					okText: i18n.t("确定"),
					cancelText: i18n.t("取消"),
					onOk: () => {
						var _a;
						(_a = this.dataUtil.clearAITask(fieldId)) === null || _a === void 0 || _a.then(resolve).catch(reject);
					},
					onCancel: () => {
						resolve(null);
					},
					onClose: () => {
						resolve(null);
					}
				});
			});
		};
		_proto.rectAddScale = function rectAddScale(rect) {
			var { scale } = this.collector.size;
			return {
				x: rect.x * scale,
				y: rect.y * scale,
				width: rect.width * scale,
				height: rect.height * scale
			};
		};
		return GridAction;
	}(CommonAction);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/index.css
var init_features = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/tiptext.js
/**
* 根据时间获取显示内容
*/ function getTextByTime(time) {
	var date = new Date(time);
	var fixString = (number) => number.toString().padStart(2, "0");
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return `${year}/${fixString(month)}/${fixString(day)}`;
}
var import_jsx_runtime, TipText;
var init_tiptext = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	init_esm$2();
	init_es();
	init_es$1();
	init_util$1();
	init_resources();
	init_style();
	init_features();
	TipText = /* @__PURE__ */ function() {
		"use strict";
		function TipText(collector, status) {
			this.collector = collector;
			this.status = status;
		}
		var _proto = TipText.prototype;
		_proto.getFieldSettingTip = function getFieldSettingTip() {
			return i18n.t("修改字段设置");
		};
		_proto.getFoldTip = function getFoldTip(fold = false) {
			return fold ? i18n.t("展开分组") : i18n.t("折叠分组");
		};
		_proto.getActivePointEmailTip = function getActivePointEmailTip() {
			return i18n.t("发送邮件");
		};
		_proto.getFieldAddTip = function getFieldAddTip() {
			return i18n.t("添加一列");
		};
		_proto.getActivePointPhoneTip = function getActivePointPhoneTip() {
			return i18n.t("拨打电话");
		};
		_proto.getExpandRowTip = function getExpandRowTip() {
			return i18n.t("展开此行");
		};
		_proto.getNotSupportGroupEditTip = function getNotSupportGroupEditTip() {
			return i18n.t("此列类型不支持编辑分组");
		};
		_proto.getGanttFieldTip = function getGanttFieldTip(fieldId) {
			var dateConfig = this.collector.dataUtil.getGanttDateConfig();
			if (!dateConfig) return "";
			var text = fieldId === dateConfig.startDateFieldId ? i18n.t("起点") : i18n.t("终点");
			return this.status.getPermissionStatus("canEditViewConfig", {}) ? i18n.t("此列为右侧“时间”的{{point}}，可点击修改", { point: text }) : i18n.t("此列为右侧“时间”的{{point}}", { point: text });
		};
		_proto.getGanttExpandAreaTip = function getGanttExpandAreaTip(isHide) {
			return i18n.t(isHide ? "显示表格" : "隐藏表格");
		};
		_proto.getGanttEmptyRecordTip = function getGanttEmptyRecordTip() {
			return i18n.t("设置时间");
		};
		_proto.getAddOneRowTip = function getAddOneRowTip() {
			return i18n.t("添加一行");
		};
		_proto.getGanttTimeError = function getGanttTimeError() {
			return i18n.t("时间异常，开始时间晚于结束时间");
		};
		_proto.getTooltipTitle = function getTooltipTitle(startTime, endTime, deltaDay) {
			var { dataUtil } = this.collector;
			var startTimeText = getTextByTime(startTime);
			var endTimeText = getTextByTime(endTime);
			if (deltaDay === null) return `${startTimeText} - ${endTimeText}}`;
			return `${startTimeText} - ${endTimeText}${i18n.t("，")} ${i18n.t("共")}${deltaDay}${isCalcHoliday(dataUtil.getGanttDateConfig()) ? i18n.t("天") : i18n.t("工作日")}`;
		};
		/**
		* 根据时间条按钮 hoverTip
		*/ _proto.getGanttTodayBarTip = function getGanttTodayBarTip(todaySwitcher) {
			switch (todaySwitcher.id) {
				case NormalIconAlias.ARROW_NEXT: return i18n.t("后一页");
				case NormalIconAlias.ARROW_PREV: return i18n.t("前一页");
			}
		};
		_proto.getNoPermissionInsertGroupTip = function getNoPermissionInsertGroupTip() {
			return i18n.t("所有者已设置内容权限， 需全部权限才能添加分组。");
		};
		_proto.getFormulaOrLookupErrorTip = function getFormulaOrLookupErrorTip(errorCellData) {
			var { text, errorMessage } = errorCellData;
			return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsxs)("span", Object.assign({ style: { color: style.color.errorTipColor } }, { children: [text, "："] })), (0, import_jsx_runtime.jsx)("span", { children: errorMessage })] });
		};
		_proto.getFilterColumnTip = function getFilterColumnTip(columnTipInfo) {
			var { title, isFilter, hasEllipsis } = columnTipInfo;
			if (!hasEllipsis) return i18n.t("已筛选");
			if (!isFilter) return title;
			return (0, import_jsx_runtime.jsxs)("div", { children: [(0, import_jsx_runtime.jsx)("div", Object.assign({ style: {
				fontSize: "12px",
				lineHeight: "14px",
				textAlign: "center",
				marginBottom: "4px"
			} }, { children: title })), (0, import_jsx_runtime.jsx)("div", Object.assign({ style: {
				color: "var(--text-weak, rgba(0, 0, 0, 0.26))",
				fontSize: "12px",
				lineHeight: "14px",
				textAlign: "center"
			} }, { children: i18n.t("已筛选") }))] });
		};
		_proto.getFormulaLoadingFieldTip = function getFormulaLoadingFieldTip(field) {
			var title = field.isFirstCalculateIng() ? i18n.t("计算中...") : i18n.t("重新计算中...");
			return (0, import_jsx_runtime.jsxs)("span", Object.assign({ className: "formulaLoadingTips" }, { children: [(0, import_jsx_runtime.jsx)(ProgressRingGray12, { className: "loadingIcon" }), (0, import_jsx_runtime.jsx)("span", Object.assign({ className: "text" }, { children: title }))] }));
		};
		_proto.getNoPermissionInsertRecordInGroupTip = function getNoPermissionInsertRecordInGroupTip() {
			return i18n.t("没有分组字段的权限，不支持添加记录到此分组。");
		};
		_proto.getAIErrorTip = function getAIErrorTip(errorCode, onResetClick) {
			var message = getAIErrCodeMsg(errorCode);
			var showResetButton = canShowAIResetButton(errorCode) && this.status.getPermissionStatus("canEditFieldConfig", {});
			return (0, import_jsx_runtime.jsxs)("div", { children: [(0, import_jsx_runtime.jsx)("span", { children: message }), showResetButton ? (0, import_jsx_runtime.jsx)("span", Object.assign({
				onClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
					onResetClick();
				},
				style: {
					color: "var(--accent-blue, rgba(38, 126, 240, 1))",
					marginLeft: "8px"
				}
			}, { children: i18n.t("重新配置") })) : null] });
		};
		return TipText;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/grid-feature.js
function _defineProperties$21(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$21(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$21(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$21(Constructor, staticProps);
	return Constructor;
}
function _inherits$54(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$54(subClass, superClass);
}
function _set_prototype_of$54(o, p) {
	_set_prototype_of$54 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$54(o, p);
}
var GridFeatureBase;
var init_grid_feature = __esmMin((() => {
	init_action();
	init_tiptext();
	init_feature_single();
	GridFeatureBase = /* @__PURE__ */ function(BaseFeature) {
		"use strict";
		_inherits$54(GridFeatureBase, BaseFeature);
		function GridFeatureBase() {
			var _this = BaseFeature.apply(this, arguments) || this;
			_this.tipText = new TipText(_this.renderer.collector, _this.parentApi.getStatus());
			_this.action = _this._register(new GridAction(_this.context, _this.collector.dataUtil, _this.collector, _this.parentApi));
			return _this;
		}
		var _proto = GridFeatureBase.prototype;
		_proto.getGanttWidth = function getGanttWidth(parentApi) {
			var _a;
			var ganttCollector = (_a = parentApi.getGanttTimeLine()) === null || _a === void 0 ? void 0 : _a.collector;
			return ganttCollector ? ganttCollector.size.outerWidth : 0;
		};
		_proto.resetSelection = function resetSelection(type) {
			if (this.rangeModel.getCurrentSelection().getRanges()) {
				this.rangeModel.resetSelection(type);
				this.parentApi.renderMain();
			}
		};
		_create_class$21(GridFeatureBase, [
			{
				key: "context",
				get: function() {
					return this.renderer.context;
				}
			},
			{
				key: "root",
				get: function() {
					return this.renderer.root;
				}
			},
			{
				key: "emitter",
				get: function() {
					return this.renderer.context.emitter;
				}
			},
			{
				key: "layer",
				get: function() {
					return this.renderer.getFeatureLayer();
				}
			},
			{
				key: "parentApi",
				get: function() {
					return this.renderer;
				}
			},
			{
				key: "collector",
				get: function() {
					return this.renderer.collector;
				}
			},
			{
				key: "rangeModel",
				get: function() {
					return this.parentApi.getRangeModel();
				}
			},
			{
				key: "currentSelection",
				get: function() {
					return this.rangeModel.getCurrentSelection();
				}
			},
			{
				key: "UIEvent",
				get: function() {
					return this.renderer.UIEvent;
				}
			},
			{
				key: "isInVisible",
				get: function() {
					return this.collector.dataUtil.isGantt() && this.collector.state.isHideGrid;
				}
			}
		]);
		return GridFeatureBase;
	}(BaseFeature);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/auto-scroll/interface.js
var IGridAutoScroll;
var init_interface$20 = __esmMin((() => {
	init_module();
	IGridAutoScroll = createDecorator("IGridAutoScroll");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/auto-scroll/main.js
function _inherits$53(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$53(subClass, superClass);
}
function _set_prototype_of$53(o, p) {
	_set_prototype_of$53 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$53(o, p);
}
var GridAutoScroll;
var init_main$20 = __esmMin((() => {
	init_auto_scroll$1();
	init_grid_feature();
	GridAutoScroll = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$53(GridAutoScroll, GridFeatureBase);
		function GridAutoScroll() {
			return GridFeatureBase.apply(this, arguments) || this;
		}
		var _proto = GridAutoScroll.prototype;
		_proto.bootstrap = function bootstrap() {
			this.autoScroll = this._register(new AutoScroll({
				scrollToX: (scrollX) => this.renderer.scrollToX(scrollX),
				scrollToY: (scrollY) => this.renderer.scrollToY(scrollY),
				getRoot: () => this.root,
				getScrollLeft: () => this.collector.range.scrollLeft,
				getScrollTop: () => this.collector.range.scrollTop,
				getScale: () => this.collector.size.scale,
				getBoundRect: () => {
					var { size } = this.collector;
					return {
						left: size.activityStartX,
						right: size.activityStartX + size.activityViewWidth,
						top: size.activityStartY,
						bottom: size.activityStartY + size.activityViewHeight
					};
				},
				getBoundRectTopEdgeOffset() {
					return this.getRoot().getBoundingClientRect().top + this.getBoundRect().top + 1;
				}
			}));
		};
		_proto.readyX = function readyX(options) {
			this.autoScroll.readyX(options);
		};
		_proto.readyY = function readyY(options) {
			this.autoScroll.readyY(options);
		};
		_proto.readyBoth = function readyBoth(options) {
			this.autoScroll.readyBoth(options);
		};
		_proto.render = function render() {};
		return GridAutoScroll;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/auto-scroll/index.js
var init_auto_scroll = __esmMin((() => {
	init_interface$20();
	init_main$20();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-move/pick-records.js
/**
* @description 挑选有效的 recordMoveMap
* @param {Record<RecordId, IMoveRecordDelta>} recordMoveMap
* @param {[RecordId?, RecordId?]} shouldCheckRecordIds
* @param {GroupKey[]} groupPath
* @param {UnionViewModel} view
*/ function pickRecordMoveMap(recordMoveMap, shouldCheckRecordIds, groupPath, view) {
	var newRecordIds = pickValidRecordIds(Object.keys(recordMoveMap), shouldCheckRecordIds, groupPath, view);
	var newRecordMoveMap = {};
	newRecordIds.forEach((recordId) => {
		newRecordMoveMap[recordId] = recordMoveMap[recordId];
	});
	return newRecordMoveMap;
}
/**
* @description 挑选有效的拖拽记录
* @param {RecordId[]} recordIds
* @param {[RecordId?, RecordId?]} shouldCheckRecordIds
* @param {GroupKey[]} groupPath
* @param {UnionViewModel} view
* @returns {RecordId[]}
*/ function pickValidRecordIds(recordIds, shouldCheckRecordIds, groupPath, view) {
	return recordIds.filter((recordId) => isRecordMoveValid(recordId, shouldCheckRecordIds, groupPath, view));
}
function isRecordMoveValid(recordId, shouldCheckRecordIds, groupPath, view) {
	if (!isRecordSameGroup(recordId, groupPath, view)) return true;
	return shouldCheckRecordIds.some((checkRecordId) => checkRecordId && isRecordSameSortKey(checkRecordId, recordId, view));
}
/**
* @description record 是否与释放位置处于同一分组
* @param {RecordId} recordId
* @param {GroupKey[]} groupPath
* @param {UnionViewModel} view
* @returns {boolean}
*/ function isRecordSameGroup(recordId, groupPath, view) {
	if (!isSupportViewGroup(view)) return false;
	var recordIndex = view.getDisplayedRecordIds().indexOf(recordId);
	return (0, import_isEqual$1.default)(view.getGroupPathByRecordVisibleIndex(recordIndex), groupPath);
}
/**
* @description 两个 record 是否具有相同的 sortKey
* @param {RecordId} firstRecordId
* @param {RecordId} secondRecordId
* @param {UnionViewModel} view
* @returns {boolean}
*/ function isRecordSameSortKey(firstRecordId, secondRecordId, view) {
	var sortInfo = view.getSortInfos();
	var allFields = view.getAllFields();
	return sortInfo.reduce((fields, condition) => {
		var field = allFields.find((field) => field.getId() === condition.fieldId);
		if (field) fields.push(field);
		return fields;
	}, []).every((field) => {
		return field.getSortKey(firstRecordId) === field.getSortKey(secondRecordId);
	});
}
var import_isEqual$1;
var init_pick_records = __esmMin((() => {
	import_isEqual$1 = /* @__PURE__ */ __toESM(require_isEqual());
	init_es$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/get-group-path.js
/**
* 根据 recordId 获取分组路径
* @param recordId
* @returns
*/ function getGroupPathByRecordId(recordId, collector) {
	var { rows } = collector;
	var rowInfo = rows.getInfoByRecordId(recordId);
	if (!rowInfo) return;
	return getRowInfoGroupPath(rowInfo, rows);
}
/**
* 获取行信息的分组路径
* @param rowInfo
* @param rows
* @returns
*/ function getRowInfoGroupPath(rowInfo, rows) {
	if (rowInfo.type === RowType.GroupHead) return rowInfo.path || [];
	if (rowInfo.parent !== -1) {
		var parent = rows.getInfo(rowInfo.parent);
		if ((parent === null || parent === void 0 ? void 0 : parent.type) === RowType.GroupHead) return parent.path || [];
	}
	return [];
}
var init_get_group_path = __esmMin((() => {
	init_interface$23();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/is-same-group.js
/**
* 两条记录是否在同一分组内
* @param recordId1
* @param recordId2
* @returns
*/ function isInSameGroup(recordId1, recordId2, view) {
	if (!view || view.type !== ViewType.GRID && view.type !== ViewType.GANTT) return false;
	var recordId1Index = view.getDisplayedRecordIds().indexOf(recordId1);
	var recordId1GroupPath = view.getGroupPathByRecordVisibleIndex(recordId1Index);
	var recordId2Index = view.getDisplayedRecordIds().indexOf(recordId2);
	var recordId2GroupPath = view.getGroupPathByRecordVisibleIndex(recordId2Index);
	return recordId1GroupPath.join() === recordId2GroupPath.join();
}
var init_is_same_group = __esmMin((() => {
	init_es$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-move/util.js
/**
* 获取拖拽行选区阴影的 y 和 height
* @param clickRowInfo // 选中/点击按下的记录
* @param rangeModel
* @param collector
* @returns
*/ function getDragRectYAndHeight(clickRowInfo, rangeModel, collector) {
	var result = {
		y: 0,
		height: 0
	};
	if (!clickRowInfo) return result;
	var clickRecordId = "recordId" in clickRowInfo ? clickRowInfo.recordId : void 0;
	if (!clickRecordId) return result;
	var rowRanges = getRowRanges(rangeModel);
	var clickRowIndex = collector.dataUtil.getDisplayedRecordIds().indexOf(clickRecordId);
	if (!rowRanges.find((rowRange) => clickRowIndex >= rowRange.startRow && clickRowIndex <= rowRange.endRow)) {
		result.y = clickRowInfo.y;
		result.height = clickRowInfo.height;
		return result;
	}
	var rangeRecord = getRangeRecordsByTarget(clickRecordId, rangeModel, collector);
	if (!rangeRecord) return result;
	var { startRecordId } = rangeRecord;
	var { endRecordId } = rangeRecord;
	var startRowInfo = collector.rows.getInfoByRecordId(startRecordId);
	if (!startRowInfo) return result;
	if (!isInSameGroup(startRecordId, endRecordId, collector.dataUtil.getCurrentView())) for (var rowIndex = startRowInfo.index; rowIndex < collector.rows.rowCount; rowIndex++) {
		var rowInfo = collector.rows.getInfo(rowIndex);
		var prevRowInfo = collector.rows.getInfo(rowIndex - 1);
		if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record && (prevRowInfo === null || prevRowInfo === void 0 ? void 0 : prevRowInfo.type) === RowType.Record) {
			endRecordId = prevRowInfo.recordId;
			break;
		}
	}
	var endRowInfo = collector.rows.getInfoByRecordId(endRecordId);
	if (!endRowInfo) return result;
	result.y = startRowInfo.y;
	result.height = endRowInfo.y + collector.rows.getRecordSize() - startRowInfo.y;
	return result;
}
/**
* 获当前的取行选区
* @param core
*/ function getRowRanges(rangeModel) {
	var currentSelection = rangeModel.getCurrentSelection();
	if (!currentSelection.isRowSelection()) return [];
	return currentSelection.getRanges() || [];
}
/**
* 根据 target 记录获取所在选区的第一个和最后一个记录
* @param targetRecordId
* @param core
* @returns
*/ function getRangeRecordsByTarget(targetRecordId, rangeModel, collector) {
	var displayedRecordIds = collector.dataUtil.getDisplayedRecordIds();
	var rowRanges = getRowRanges(rangeModel);
	var targetRowIndex = displayedRecordIds.indexOf(targetRecordId);
	var rowRange = rowRanges.find((rowRange) => targetRowIndex >= rowRange.startRow && targetRowIndex <= rowRange.endRow);
	if (!rowRange) return;
	return {
		startRecordId: displayedRecordIds[rowRange.startRow],
		endRecordId: displayedRecordIds[rowRange.endRow]
	};
}
/**
* 获取拖拽基准线的 y 位置，以及目标位置
* @param clickRowInfo
* @param hoverRowInfo
* @param beforeRecord
* @param rangeModel
* @param collector
* @returns
*/ function getDragLineYAndTarget(clickRowInfo, hoverRowInfo, beforeRecord, rangeModel, collector) {
	var sheetView = collector.dataUtil.getCurrentView();
	var result = {
		lineRowIndex: -1,
		dropRowIndex: -1
	};
	if (!sheetView || clickRowInfo.type !== RowType.Record) return result;
	var lineRowIndex = getLineRowIndex(clickRowInfo, hoverRowInfo, rangeModel, collector);
	if (lineRowIndex === -1) return result;
	var dropRowIndex = getDropTargetRowIndex(clickRowInfo, lineRowIndex, beforeRecord, collector);
	if (dropRowIndex === -1) return result;
	result.dropRowIndex = dropRowIndex;
	result.lineRowIndex = lineRowIndex;
	return result;
}
/**
* 获取基准线的放置位置的布局下标
* @param clickRowInfo
* @param hoverRowInfo
* @param mouseMoveOffsetY
* @param collector
* @returns
*/ function getLineRowIndex(clickRowInfo, hoverRowInfo, rangeModel, collector) {
	var lineRowIndex = hoverRowInfo.index;
	if (clickRowInfo.index === lineRowIndex) return -1;
	if (isSelectedRowIndex(lineRowIndex, rangeModel, collector)) return -1;
	var lineRowInfo = collector.rows.getInfo(lineRowIndex);
	if (lineRowInfo && lineRowInfo.type === RowType.Record) return lineRowIndex;
	return -1;
}
/**
* 判断 lineRowIndex 是否在选中的行中
* @param lineRowIndex
* @param core
*/ function isSelectedRowIndex(lineRowIndex, rangeModel, collector) {
	var lineLayout = collector.rows.getInfo(lineRowIndex);
	if (!lineLayout) return false;
	var lineLayoutRecordId = lineLayout.type === RowType.Record ? lineLayout.recordId : "";
	if (!lineLayoutRecordId) return false;
	var ranges = rangeModel.getCurrentSelection().getRanges();
	if (Array.isArray(ranges) && ranges.length > 1) return false;
	var invalidRecordIds = getSelectionRecordIds(rangeModel, collector);
	if (invalidRecordIds.length < 2) return false;
	if (invalidRecordIds.includes(lineLayoutRecordId)) return true;
	return false;
}
/**
* 获取选中的行的 recordId
* @param rangeModel
* @param collector
* @returns
*/ function getSelectionRecordIds(rangeModel, collector) {
	var currentSelection = rangeModel.getCurrentSelection();
	if (!currentSelection.isRowSelection()) return [];
	var allRecordIds = collector.dataUtil.getDisplayedRecordIds();
	var rowRanges = currentSelection.getRanges();
	var selectedRecordIds = [];
	rowRanges.forEach((range) => {
		var { startRow, endRow } = range;
		for (var i = startRow; i <= endRow; i++) selectedRecordIds.push(allRecordIds[i]);
	});
	return selectedRecordIds;
}
/**
* 获取放置的最终数据下标
* @param clickRowInfo
* @param lineRowIndex
* @param collector
* @returns
*/ function getDropTargetRowIndex(clickRowInfo, lineRowIndex, beforeRecord, collector) {
	var lineLRowInfo = collector.rows.getInfo(lineRowIndex);
	if ((lineLRowInfo === null || lineLRowInfo === void 0 ? void 0 : lineLRowInfo.type) !== RowType.Record || clickRowInfo.type !== RowType.Record) return -1;
	var sheetView = collector.dataUtil.getCurrentView();
	var targetIndex = sheetView.getRecordIndexFromAllRecordIds(lineLRowInfo.recordId);
	var originIndex = sheetView.getRecordIndexFromAllRecordIds(clickRowInfo.recordId);
	if (targetIndex === originIndex) return -1;
	var dropRowIndex = targetIndex;
	if (!beforeRecord) dropRowIndex += 1;
	if (dropRowIndex === originIndex && clickRowInfo.parent === lineLRowInfo.parent) return -1;
	if (dropRowIndex === originIndex + 1 && clickRowInfo.parent === lineLRowInfo.parent) return -1;
	return dropRowIndex;
}
/**
* 移动行应用到数据层
* @param targetDropRowIndex 在 allRecordIds 中的下标
* @param targeRowInfo
* @param rangeModel
* @param collector
*/ function applyMovedRecordBehavior(targetDropRowIndex, targeRowInfo, context, rangeModel, collector, originIndex) {
	var _a;
	var sheetView = collector.dataUtil.getCurrentView();
	if (!sheetView) return;
	var recordMoveMap = getRecordMoveMap(targetDropRowIndex, rangeModel, collector, originIndex);
	var targetGroupPath = getRowInfoGroupPath(targeRowInfo, collector.rows);
	if (sheetView.isAutoSort() && !!sheetView.getSortInfos().length) {
		var dropRecordIds = getDropRecordIds(targeRowInfo, collector);
		recordMoveMap = pickRecordMoveMap(recordMoveMap, dropRecordIds, targetGroupPath, collector.dataUtil.getCurrentView());
	}
	if ((0, import_isEmpty.default)(recordMoveMap)) {
		showAutoSortCannotDragToast();
		return;
	}
	var nextRecordId = (_a = sheetView.getAllRecordIds()[targetDropRowIndex]) !== null && _a !== void 0 ? _a : null;
	context.getBehaviorApi().moveRecord({
		tableId: collector.dataUtil.getCurrentTable().id,
		viewId: collector.dataUtil.getCurrentView().id,
		delta: {
			recordIds: Object.keys(recordMoveMap),
			nextRecordId,
			groupPath: targetGroupPath
		}
	});
}
function getRecordMoveMap(targetDropRowIndex, rangeModel, collector, originIndex) {
	var view = collector.dataUtil.getCurrentView();
	return (originIndex !== void 0 ? [originIndex] : getSelectRowIndexArray(rangeModel, collector)).reduce((prevMoveMap, selectRecordIndex) => {
		logger.info(`[xview][移动行]moveRecord: records length = ${view.getDisplayedRecordIds().length}, source = ${selectRecordIndex}, target = ${targetDropRowIndex}`);
		var selectRecordId = view.getAllRecordIds()[selectRecordIndex];
		if (!selectRecordId) {
			logger.report(WeblogReportKey.MOVE_RECORD_ID_INVALID_ERROR);
			return prevMoveMap;
		}
		return Object.assign(Object.assign({}, prevMoveMap), { [selectRecordId]: {
			source: selectRecordIndex,
			target: targetDropRowIndex
		} });
	}, {});
}
function showAutoSortCannotDragToast() {
	import_Snackbar$2.default.show({
		message: i18n.t("开启了自动排序，记录无法移动。"),
		closable: false,
		duration: 1500,
		id: "record-move"
	});
}
/**
* 获取选中的行下标（相对所有数据包括隐藏的）
* @param rangeModel
* @param collector
* @returns
*/ function getSelectRowIndexArray(rangeModel, collector) {
	var currentSelection = rangeModel.getCurrentSelection();
	if (!currentSelection.isRowSelection()) return [];
	var rowIndexArray = [];
	currentSelection.getRanges().forEach((range) => {
		var _a;
		var { startRow, endRow } = range;
		var visibleRecordIds = collector.dataUtil.getDisplayedRecordIds();
		var currentView = collector.dataUtil.getCurrentView();
		var allRecordIds = currentView === null || currentView === void 0 ? void 0 : currentView.getAllRecordIds();
		for (var i = startRow; i <= endRow; i++) {
			var recordId = visibleRecordIds[i];
			var index = (_a = allRecordIds === null || allRecordIds === void 0 ? void 0 : allRecordIds.indexOf(recordId)) !== null && _a !== void 0 ? _a : -1;
			rowIndexArray.push(index);
		}
	});
	return rowIndexArray;
}
/**
* 获取 targetRowIndex 前后的 recordId（需同个分组层级内）
* @param targetRowInfo
* @param collector
* @returns
*/ function getDropRecordIds(targetRowInfo, collector) {
	if (targetRowInfo.type === RowType.RecordAdd) {
		var prevRowInfo = collector.rows.getInfo(targetRowInfo.index - 1);
		if ((prevRowInfo === null || prevRowInfo === void 0 ? void 0 : prevRowInfo.type) === RowType.Record) return [prevRowInfo.recordId];
		return [];
	}
	if (targetRowInfo.type !== RowType.Record) return [];
	var targetRecordId = targetRowInfo.recordId;
	var displayedRecordIds = collector.dataUtil.getDisplayedRecordIds();
	var visibleRowIndex = displayedRecordIds.indexOf(targetRecordId);
	var prevRecordId = displayedRecordIds[visibleRowIndex - 1];
	var nextRecordId = displayedRecordIds[visibleRowIndex + 1];
	var sheetView = collector.dataUtil.getCurrentView();
	if (isInSameGroup(prevRecordId, nextRecordId, sheetView)) return [prevRecordId, nextRecordId];
	if (isInSameGroup(targetRecordId, prevRecordId, sheetView)) return [prevRecordId];
	if (isInSameGroup(targetRecordId, nextRecordId, sheetView)) return [, nextRecordId];
	return [];
}
var import_isEmpty, import_Snackbar$2;
var init_util = __esmMin((() => {
	import_isEmpty = /* @__PURE__ */ __toESM(require_isEmpty());
	import_Snackbar$2 = /* @__PURE__ */ __toESM(require_Snackbar());
	init_es();
	init_interface$23();
	init_pick_records();
	init_get_group_path();
	init_is_same_group();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/get-info-by-offset.js
/**
* 根据横坐标获取列信息（无论是否在视图区域内）
* @param offsetX
* @param collector
* @returns
*/ function getColumnInfoByOffset(offsetX, collector) {
	var targetColumnInfo;
	var { range, columns } = collector;
	range.doColumnRange((columnIndex) => {
		var columnInfo = columns.getInfos().get(columnIndex);
		if (!columnInfo) return;
		var x = columnInfo.x - (columnInfo.isFrozen ? 0 : range.scrollLeft);
		if (offsetX >= x && offsetX <= x + columnInfo.width) {
			targetColumnInfo = columnInfo;
			return true;
		}
	});
	return targetColumnInfo;
}
/**
* 根据纵坐标获取行信息（无论是否在视图区域内）
* @param offsetY
* @param collector
* @returns
*/ function getRowInfoByOffset(offsetY, collector) {
	var targetRowInfo;
	var { range, rows, size, widgetCollector } = collector;
	if (offsetY < size.activityStartY) return;
	var pinnedHitRowInfo;
	rows.forEachRowInfo((rowInfo) => {
		if (pinnedHitRowInfo) return;
		if (!widgetCollector.isPinnedRowInfo(rowInfo)) return;
		var naturalTop = rowInfo.y - range.scrollTop + size.activityStartY;
		var pinTop = size.rootHeight - rowInfo.height;
		var visualTop = Math.min(naturalTop, pinTop);
		if (offsetY >= visualTop && offsetY <= visualTop + rowInfo.height) pinnedHitRowInfo = rowInfo;
	});
	if (pinnedHitRowInfo) return pinnedHitRowInfo;
	if (widgetCollector.isGroupHeadStickyEnabled()) {
		var stickyHitRowInfo;
		rows.forEachRowInfo((rowInfo) => {
			if (stickyHitRowInfo) return;
			if (rowInfo.type !== RowType.GroupHead) return;
			var stickyInfo = widgetCollector.computeGroupHeadSticky(rowInfo);
			if (!stickyInfo.isSticking) return;
			var top = stickyInfo.finalY + size.activityStartY;
			var visibleHeight = stickyInfo.clipArea ? stickyInfo.clipArea.height : rowInfo.height;
			var visibleTop = stickyInfo.clipArea ? stickyInfo.clipArea.y + size.activityStartY : top;
			if (visibleHeight <= 0) return;
			if (offsetY >= visibleTop && offsetY <= visibleTop + visibleHeight) stickyHitRowInfo = rowInfo;
		});
		if (stickyHitRowInfo) return stickyHitRowInfo;
	}
	range.doRowRange((rowIndex) => {
		var rowInfo = rows.getInfo(rowIndex);
		if (!rowInfo || rowInfo.height === 0) return;
		var y = rowInfo.y - range.scrollTop + size.activityStartY;
		if (offsetY >= y && offsetY <= y + rowInfo.height) {
			targetRowInfo = rowInfo;
			return true;
		}
	});
	return targetRowInfo;
}
var init_get_info_by_offset = __esmMin((() => {
	init_interface$23();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/stat-counter/index.js
function _assert_this_initialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _inherits$52(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$52(subClass, superClass);
}
function _possible_constructor_return(self, call) {
	if (call && (_type_of$2(call) === "object" || typeof call === "function")) return call;
	return _assert_this_initialized(self);
}
function _set_prototype_of$52(o, p) {
	_set_prototype_of$52 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$52(o, p);
}
function _type_of$2(obj) {
	"@swc/helpers - typeof";
	return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var import_debounce, import_dist$3, import_main$8, FinishDebounceTime, StatCounter;
var init_stat_counter = __esmMin((() => {
	import_debounce = /* @__PURE__ */ __toESM(require_debounce());
	import_dist$3 = require_dist();
	import_main$8 = require_main();
	init_es();
	init_es$1();
	init_copyright$1();
	FinishDebounceTime = 200;
	StatCounter = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$52(StatCounter, Disposable);
		function StatCounter(context) {
			var _this = Disposable.call(this) || this;
			_this.context = context;
			_this.hasRegister = false;
			if (isSSR()) return _possible_constructor_return(_this);
			_this.asyncTaskManager = _this._register(new import_dist$3.AsyncTaskManager());
			return _this;
		}
		var _proto = StatCounter.prototype;
		_proto.register = function register(callback) {
			var _a;
			if (!this.hasRegister) {
				this.hasRegister = true;
				(_a = this.asyncTaskManager) === null || _a === void 0 || _a.registerTaskFinishCallback((0, import_debounce.default)(() => callback(), FinishDebounceTime));
			}
		};
		_proto.getResult = function getResult(fieldId, groupPath) {
			var result = this.getFieldStatResult(fieldId, groupPath);
			if (!result) return;
			var value = "";
			var label = getRenderStatOperatorsMap()[result.statType];
			if (result.resultType === FieldStatResultType.HIDDEN) return;
			if (result.resultType === FieldStatResultType.ASYNC) value = getFieldStatCalculating();
			else value = result.value;
			return {
				label,
				value
			};
		};
		_proto.getFieldStatResult = function getFieldStatResult(fieldId, groupPath) {
			var _a, _b;
			if (isSSR()) return this.getServerResult(fieldId);
			var result = (_a = this.context.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getFieldStatResults(fieldId, groupPath);
			if (!result) return;
			if (result.resultType === FieldStatResultType.ASYNC) {
				var taskKey = `FieldStatResult-${fieldId}-${groupPath.toString()}`;
				(_b = this.asyncTaskManager) === null || _b === void 0 || _b.addTask(taskKey, result.value);
			}
			return result;
		};
		_proto.getServerResult = function getServerResult(fieldId) {
			var _a, _b, _c;
			var field = (_a = this.context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getFieldByFieldId(fieldId);
			var statType = (_c = (_b = this.context.getCurrentView()) === null || _b === void 0 ? void 0 : _b.getFieldStatType(field)) !== null && _c !== void 0 ? _c : StatType.NONE;
			return {
				statType,
				resultType: statType !== StatType.NONE ? FieldStatResultType.SYNC : FieldStatResultType.HIDDEN,
				value: i18n.t("加载中")
			};
		};
		return StatCounter;
	}(import_main$8.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/content/util-group-value.js
function collectGroupValue(firstColumnInfo, rowInfo, statInfos, groupValueInfos, size, profile, dataUtil) {
	var _a, _b;
	var { path, groupValue } = rowInfo;
	if (!groupValue) return;
	if (Array.isArray(groupValue)) {
		collectFlattenGroupValue(rowInfo, groupValueInfos, size, profile, dataUtil);
		return;
	}
	var groupValueRect = {
		x: firstColumnInfo.x,
		y: rowInfo.y,
		width: firstColumnInfo.width - style.size.tagPaddingLeft,
		height: rowInfo.height
	};
	if (firstColumnInfo.isFrozen) {
		var offsetX = (dataUtil.getGroupFields().length - 1 - rowInfo.level) * size.levelIndent;
		groupValueRect.x -= offsetX;
	}
	var statInfo = (_a = statInfos.get(firstColumnInfo.id)) === null || _a === void 0 ? void 0 : _a.get(stringifyGroupPath(path));
	if (statInfo) {
		var firstStatConfig = statInfo[0];
		if (!firstStatConfig || ((_b = firstStatConfig.layouts) === null || _b === void 0 ? void 0 : _b.length) === 0) return;
		groupValueRect.width = firstStatConfig.x + firstStatConfig.layouts[0].x - groupValueRect.x;
	}
	var groupFieldIndex = rowInfo.level;
	var groupField = dataUtil.getGroupFields()[groupFieldIndex];
	var info = collectGroupValueInfos(groupValue, groupValueRect, groupField);
	if (info) groupValueInfos.set(stringifyGroupPath(path), info);
}
function getFlattenArrowInfo() {
	return {
		size: style.size.iconSmall,
		margin: style.size.iconPadding
	};
}
function collectFlattenGroupValue(rowInfo, groupValueInfos, size, profile, dataUtil) {
	var _a;
	var { countText, groupValue, path } = rowInfo;
	var groupValues = groupValue;
	var arrowInfo = getFlattenArrowInfo();
	var arrowTakeWidth = arrowInfo.size + arrowInfo.margin * 2;
	var startX = profile.groupFoldStarts.get(0) + size.foldIconSize + style.size.tagPaddingLeft;
	var limitContentWidth = ((_a = countText === null || countText === void 0 ? void 0 : countText.x) !== null && _a !== void 0 ? _a : size.rootWidth) - style.size.tagPaddingLeft - startX - (groupValues.length - 1) * arrowTakeWidth;
	var valueLimitWidth = Math.ceil(limitContentWidth / groupValues.length);
	var fields = dataUtil.getGroupFields();
	var outerValueRect = {
		x: startX,
		y: rowInfo.y,
		width: limitContentWidth,
		height: rowInfo.height
	};
	var contentTakeWidth = 0;
	var prevCollectResults = [];
	groupValues.forEach((groupValue, index) => {
		var groupPath = path.slice(0, index + 1);
		var groupField = fields[index];
		var info = collectGroupValueInfos(groupValue, outerValueRect, groupField);
		if (info) {
			var width = fieldCollector.measureWidth(groupField, info[1]);
			if (width === 0) width = valueLimitWidth;
			contentTakeWidth += width;
			prevCollectResults.push([
				groupPath,
				info,
				groupValue,
				groupField,
				width
			]);
		}
	});
	if (groupValues.length === 1) {
		var [groupPath, info] = prevCollectResults[0];
		groupValueInfos.set(stringifyGroupPath(groupPath), info);
		return;
	}
	var recollectStartX = startX;
	var isOverLimit = contentTakeWidth > limitContentWidth;
	prevCollectResults.forEach(([groupPath, , groupValue, field, width], index) => {
		var useWidth = width + 2 * style.size.cellPadding;
		var valueRect = {
			x: Math.ceil(recollectStartX),
			y: outerValueRect.y,
			width: isOverLimit ? Math.min(valueLimitWidth, useWidth) : useWidth,
			height: outerValueRect.height
		};
		var newInfo = collectGroupValueInfos(groupValue, valueRect, field);
		if (newInfo) {
			groupValueInfos.set(stringifyGroupPath(groupPath), newInfo);
			recollectStartX += valueRect.width + (index < prevCollectResults.length - 1 ? arrowTakeWidth : 0);
		}
	});
	prevCollectResults.length = 0;
}
function collectGroupValueInfos(groupValue, groupValueRect, groupField, options) {
	var isEmptyGroupValue = groupValue.data.length === 0;
	var groupValueCollectConfig = getDefaultGroupValueCollectConfig();
	var standardCell = isEmptyGroupValue ? getEmptyGroupValueStandardCell(groupField) : groupValue;
	if (isEmptyGroupValue) {
		groupValueCollectConfig.textConfig.fontStyle = "";
		groupValueCollectConfig.textConfig.color = style.color.lightUltraFontColor;
	}
	if ((options === null || options === void 0 ? void 0 : options.ellipsis) === false) groupValueCollectConfig.textConfig.ellipsis = false;
	if (groupField.type === FieldType.LOOKUP) groupValueCollectConfig.checkboxConfig.hasTitle = false;
	var contentHeight = (groupValueCollectConfig.labelConfig.tagHeight || 0) + style.size.borderWidth * 2;
	var textRect = {
		x: groupValueRect.x + style.size.cellPadding,
		width: groupValueRect.width - 2 * style.size.cellPadding,
		y: groupValueRect.y + (groupValueRect.height - contentHeight) / 2,
		height: contentHeight
	};
	var groupValueCollectContents;
	if (!isEmptyGroupValue && domainConfig.getIsWb()) {
		var fieldTitle = groupField === null || groupField === void 0 ? void 0 : groupField.getTitle();
		if (fieldTitle && isWbSpecialField(fieldTitle, ViewType.GRID)) groupValueCollectContents = collectWbSpecialCell({
			fieldTitle,
			viewScope: ViewType.GRID,
			rect: textRect,
			collectConfig: groupValueCollectConfig,
			standardCell,
			field: groupField
		});
	}
	if (!groupValueCollectContents) groupValueCollectContents = fieldCollector.collect(textRect, groupValueCollectConfig, standardCell, groupField);
	if (groupValueCollectContents === null || groupValueCollectContents === void 0 ? void 0 : groupValueCollectContents.length) return [groupValueRect, groupValueCollectContents];
}
function getEmptyGroupValueStandardCell(field) {
	var emptyText = i18n.t("空");
	var displayTitle = mapWbFieldTitle(field === null || field === void 0 ? void 0 : field.getTitle());
	return {
		sourceType: FieldType.TEXT,
		data: [{ text: displayTitle ? `${displayTitle}: ${emptyText}` : emptyText }]
	};
}
var init_util_group_value = __esmMin((() => {
	init_es();
	init_es$1();
	init_field_collector();
	init_style();
	init_config$2();
	init_string_group_path();
	init_field_title();
	init_wb_cell();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/content/util-stat.js
function collectGlobalStatInfos(columnInfo, size, statInfos, dataUtil) {
	if (!dataUtil.isFieldStatEnabled()) return;
	var fieldId = columnInfo.id;
	var globalResult = dataUtil.getStatResult(fieldId, GlobalGroupPath);
	if (!globalResult) return;
	if (!statInfos.has(fieldId)) statInfos.set(fieldId, /* @__PURE__ */ new Map());
	var statRect = {
		x: columnInfo.x + size.fieldTitleMarginLeft,
		y: 0,
		width: columnInfo.width,
		height: size.statHeight
	};
	var textConfigs = ua.isMobile ? getStatTextConfigs(globalResult.label, globalResult.value, statRect, columnInfo.isFirst) : getVerticalStatTextConfigs(globalResult.label, globalResult.value, {
		x: columnInfo.x,
		y: 0,
		width: columnInfo.width,
		height: size.statHeight
	});
	statInfos.get(fieldId).set(stringifyGroupPath(GlobalGroupPath), textConfigs);
}
function collectGroupStatInfos(columnInfo, groupHeadRowInfo, statInfos, dataUtil) {
	var fieldId = columnInfo.id;
	var groupPath = groupHeadRowInfo.path;
	if (!groupPath) return;
	var result = dataUtil.getStatResult(fieldId, groupPath);
	if (!result) return;
	if (!statInfos.has(fieldId)) statInfos.set(fieldId, /* @__PURE__ */ new Map());
	var statRect = {
		x: columnInfo.x,
		y: groupHeadRowInfo.y,
		width: columnInfo.width,
		height: groupHeadRowInfo.height
	};
	var textConfigs = getStatTextConfigs(result.label, result.value, statRect, columnInfo.isFirst);
	statInfos.get(fieldId).set(stringifyGroupPath(groupPath), textConfigs);
}
function getStatTextConfigs(label, value, rect, isFristField = false) {
	var _a, _b;
	var labelTextConfig = pen.config.text(Object.assign(Object.assign({ text: label }, rect), {
		x: rect.x + StatStyle.labelMarginLeft,
		color: StatStyle.color,
		fontSize: StatStyle.fontSize,
		fontStyle: StatStyle.labelFontStyle,
		wrap: "none",
		ellipsis: true
	}));
	if (!((_a = labelTextConfig.layouts) === null || _a === void 0 ? void 0 : _a.length)) return [];
	var labelTextConfigWidth = labelTextConfig.layouts[0].width;
	var valueStartX = StatStyle.labelMarginLeft + labelTextConfigWidth + StatStyle.labelMarginRight;
	var valueTextConfig = pen.config.text(Object.assign(Object.assign({ text: value }, rect), {
		x: rect.x + valueStartX,
		width: rect.width - valueStartX - StatStyle.valueMarginRight,
		color: StatStyle.color,
		fontSize: StatStyle.fontSize,
		fontStyle: StatStyle.valueFontStyle,
		wrap: "none",
		ellipsis: true
	}));
	if (!((_b = valueTextConfig.layouts) === null || _b === void 0 ? void 0 : _b.length)) return [];
	if (isFristField && ua.isPC) {
		var valueTextConfigWidth = valueTextConfig.layouts[0].width;
		var totalTakeWidth = labelTextConfigWidth + StatStyle.labelMarginLeft + StatStyle.labelMarginRight + valueTextConfigWidth + StatStyle.valueMarginRight;
		var reduceWidth = rect.width - totalTakeWidth;
		if (reduceWidth > 0) {
			labelTextConfig.x = labelTextConfig.x + reduceWidth;
			valueTextConfig.x = valueTextConfig.x + reduceWidth;
		}
	}
	return [labelTextConfig, valueTextConfig];
}
/**
* 新视觉的全局列统计：label 在上，value 在下，左对齐到列左侧
* 参考视觉稿：记录数 / 求和 作为小字说明在上，对应数值在下方（加粗）
*/ function getVerticalStatTextConfigs(label, value, rect) {
	var _a, _b;
	var innerWidth = rect.width - VerticalStatStyle.paddingLeft - VerticalStatStyle.paddingRight;
	var commonProps = {
		x: rect.x + VerticalStatStyle.paddingLeft,
		width: innerWidth > 0 ? innerWidth : 0,
		align: "left",
		wrap: "none",
		ellipsis: true
	};
	var labelTextConfig = pen.config.text(Object.assign(Object.assign({
		text: label,
		y: rect.y + VerticalStatStyle.labelPaddingTop,
		height: VerticalStatStyle.labelHeight
	}, commonProps), {
		color: VerticalStatStyle.labelColor,
		fontSize: VerticalStatStyle.labelFontSize,
		fontStyle: VerticalStatStyle.labelFontStyle,
		verticalAlign: "top"
	}));
	if (!((_a = labelTextConfig.layouts) === null || _a === void 0 ? void 0 : _a.length)) return [];
	var valueTextConfig = pen.config.text(Object.assign(Object.assign({
		text: value,
		y: rect.y + VerticalStatStyle.labelPaddingTop + VerticalStatStyle.labelHeight + VerticalStatStyle.valueMarginTop,
		height: VerticalStatStyle.valueHeight
	}, commonProps), {
		x: commonProps.x + 1,
		color: VerticalStatStyle.valueColor,
		fontSize: VerticalStatStyle.valueFontSize,
		fontStyle: VerticalStatStyle.valueFontStyle,
		verticalAlign: "top"
	}));
	if (!((_b = valueTextConfig.layouts) === null || _b === void 0 ? void 0 : _b.length)) return [];
	return [labelTextConfig, valueTextConfig];
}
var GlobalGroupPath, StatStyle, VerticalStatStyle;
var init_util_stat = __esmMin((() => {
	init_esm$1();
	init_pen();
	init_style();
	init_string_group_path();
	GlobalGroupPath = [];
	StatStyle = {
		fontSize: style.size.fontSizeSmall,
		color: style.color.lightUltraFontColor,
		labelFontStyle: "normal",
		valueFontStyle: "bold",
		labelMarginLeft: 6,
		labelMarginRight: 4,
		valueMarginRight: 8
	};
	VerticalStatStyle = {
		labelFontSize: style.size.fontSizeUltraSmall,
		valueFontSize: style.size.fontSizeSmall,
		labelColor: style.color.weakFontColor,
		valueColor: style.color.normalFontColor,
		labelFontStyle: "normal",
		valueFontStyle: "normal",
		labelPaddingTop: 5,
		labelHeight: 16,
		valueHeight: 16,
		valueMarginTop: -2,
		paddingLeft: 8,
		paddingRight: 8
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/is-attachment-grid-mode.js
/**
* 是否为附件宫格模式
* @param field
* @returns
*/ function isAttachmentGridMode(field) {
	return domainConfig.getIsToc() && field.getType() === FieldType.ATTACHMENT && field.getProperty().displayMode === DisplayMode.GRID;
}
var init_is_attachment_grid_mode = __esmMin((() => {
	init_es();
	init_es$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/viewport/utils.js
function isUnitInRange(unit, range) {
	return isIndexInRange(unit.rowIndex, range.row) && isIndexInRange(unit.columnIndex, range.column);
}
function isIndexInRange(index, range) {
	var [start, end] = range;
	return index >= start && index <= end;
}
function isRangeInRange(firstRange, secondRange) {
	var [start, end] = firstRange;
	return isIndexInRange(start, secondRange) && isIndexInRange(end, secondRange);
}
/**
* @description 扩展范围，index 不会小于 0
* @returns {LinearRange}
*/ function expandRange(range, count) {
	return [Math.max(0, range[0] - count), range[1] + count];
}
/**
* @description 通过上边界和左边界粗略判断移动方向
* @param {RectRange} firstRange
* @param {RectRange} secondRange
* @returns {RangeDirection} 视区移动方向
*/ function getDirectionByRanges(firstRange, secondRange) {
	var vertical;
	if (firstRange.column[0] > secondRange.column[0]) vertical = Direction$1.UP;
	else if (firstRange.column[0] < secondRange.column[0]) vertical = Direction$1.DOWN;
	var horizontal;
	if (firstRange.row[0] > secondRange.row[0]) horizontal = Direction$1.LEFT;
	else if (firstRange.row[0] < secondRange.row[0]) horizontal = Direction$1.RIGHT;
	return {
		horizontal,
		vertical
	};
}
var init_utils$1 = __esmMin((() => {
	init_common();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/viewport/index.js
function _defineProperties$20(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$20(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$20(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$20(Constructor, staticProps);
	return Constructor;
}
function _inherits$51(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$51(subClass, superClass);
}
function _set_prototype_of$51(o, p) {
	_set_prototype_of$51 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$51(o, p);
}
var import_main$7, Viewport;
var init_viewport = __esmMin((() => {
	init_event();
	import_main$7 = require_main();
	init_utils$1();
	Viewport = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$51(Viewport, Disposable);
		function Viewport(config) {
			var _this = Disposable.call(this) || this;
			_this.config = config;
			_this.onFetchViewportEmitter = _this._register(new Emitter());
			_this.checkShouldPreFetch = () => {
				var newViewportRange = _this.config.getViewport();
				if (isRangeInRange(newViewportRange.row, _this.redLineViewPort.row) && isRangeInRange(newViewportRange.column, _this.redLineViewPort.column)) return;
				_this.fetchViewport(newViewportRange);
			};
			_this._register(config.onViewportChanged(_this.checkShouldPreFetch));
			_this.onFetchViewportEvent = _this.onFetchViewportEmitter.event;
			_this.init();
			return _this;
		}
		var _proto = Viewport.prototype;
		/**
		* @description 获取拉取事件
		* @returns {FetchEvent}
		*/ _proto.generateFetchEvent = function generateFetchEvent(viewportRange) {
			var preFetchRowCount = this.viewportRowCount * this.config.preFetchRate.row;
			var preFetchColumnCount = this.viewportColumnCount * this.config.preFetchRate.column;
			return {
				innerRange: viewportRange,
				outerRange: {
					row: expandRange(viewportRange.row, preFetchRowCount),
					column: expandRange(viewportRange.column, preFetchColumnCount)
				},
				direction: getDirectionByRanges(viewportRange, this.lastFetchViewPortRange)
			};
		};
		/**
		* @description 拉取视区
		*/ _proto.fetchViewport = function fetchViewport(viewportRange) {
			var event = this.generateFetchEvent(viewportRange);
			this.lastFetchViewPortRange = viewportRange;
			this.onFetchViewportEmitter.fire(event);
		};
		_proto.init = function init() {
			var viewport = this.config.getViewport();
			this.lastFetchViewPortRange = viewport;
			this.fetchViewport(viewport);
		};
		_create_class$20(Viewport, [
			{
				key: "viewportRowCount",
				get: function() {
					var [start, end] = this.lastFetchViewPortRange.row;
					return end - start + 1;
				}
			},
			{
				key: "viewportColumnCount",
				get: function() {
					var [start, end] = this.lastFetchViewPortRange.column;
					return end - start + 1;
				}
			},
			{
				key: "redLineViewPort",
				get: function() {
					var redLineRowCount = this.viewportRowCount * this.config.redLineRate.row;
					var redLineColumnCount = this.viewportColumnCount * this.config.redLineRate.column;
					return {
						row: expandRange(this.lastFetchViewPortRange.row, redLineRowCount),
						column: expandRange(this.lastFetchViewPortRange.column, redLineColumnCount)
					};
				}
			}
		]);
		return Viewport;
	}(import_main$7.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/viewport/fetcher/index.js
function _inherits$50(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$50(subClass, superClass);
}
function _set_prototype_of$50(o, p) {
	_set_prototype_of$50 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$50(o, p);
}
var import_dist$2, import_main$6, ViewportFetcher;
var init_fetcher = __esmMin((() => {
	init_tslib_es6();
	import_dist$2 = require_dist();
	import_main$6 = require_main();
	init_es();
	init_viewport();
	init_utils$1();
	ViewportFetcher = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$50(ViewportFetcher, Disposable);
		function ViewportFetcher(config) {
			var _this = Disposable.call(this) || this;
			_this.config = config;
			_this.asyncTask = null;
			_this.handleFetch = (event, collectType = _this.config.getCollectType()) => {
				if (isSSR()) return _this.collectBySync(event.outerRange);
				switch (collectType) {
					case "sync": return _this.collectBySync(event.outerRange);
					case "async": return _this.collectByAsync(event);
					case "outer-async": return _this.collectByOuterAsync(event);
				}
			};
			/**
			* @description 异步收集视区内内容
			*/ _this.collectInnerByAsync = (range) => __awaiter(_this, void 0, void 0, function* () {
				var { row, column } = range;
				var rowCount = row[1] - row[0] + 1;
				var columnCount = column[1] - column[0] + 1;
				var totalUnits = rowCount * columnCount;
				this.abort();
				this.asyncTask = (0, import_dist$2.executeAsync)({
					length: totalUnits,
					initialValue: void 0,
					unitCallback: (index) => {
						var rowIndex = row[0] + Math.floor(index / columnCount);
						var columnIndex = column[0] + index % columnCount;
						this.config.collectUnit({
							rowIndex,
							columnIndex
						});
					},
					finishCallback: () => {
						var _a, _b;
						this.asyncTask = null;
						(_b = (_a = this.config).innerCollectFinished) === null || _b === void 0 || _b.call(_a);
					}
				});
				yield this.asyncTask.promise;
			});
			_this.abort = () => {
				if (!_this.asyncTask) return;
				_this.asyncTask.promise.catch(() => {});
				_this.asyncTask.abort();
				_this.asyncTask = null;
			};
			_this.viewport = _this._register(new Viewport(config));
			_this._register(_this.viewport.onFetchViewportEvent(_this.handleFetch));
			_this._register({ dispose: _this.abort });
			return _this;
		}
		var _proto = ViewportFetcher.prototype;
		_proto.collect = function collect(type) {
			var event = this.viewport.generateFetchEvent(this.config.getViewport());
			this.handleFetch(event, type);
		};
		_proto.collectInner = function collectInner() {
			var event = this.viewport.generateFetchEvent(this.config.getViewport());
			this.collectBySync(event.innerRange);
		};
		_proto.collectAsync = function collectAsync() {
			var event = this.viewport.generateFetchEvent(this.config.getViewport());
			this.collectByAsync(event);
		};
		/**
		* @description 同步收集方法
		*/ _proto.collectBySync = function collectBySync(range) {
			var { row, column } = range;
			for (var rowIndex = row[0]; rowIndex <= row[1]; rowIndex++) for (var columnIndex = column[0]; columnIndex <= column[1]; columnIndex++) this.config.collectUnit({
				rowIndex,
				columnIndex
			});
		};
		/**
		* @description 异步收集方法
		*/ _proto.collectByAsync = function collectByAsync(event) {
			return __awaiter(this, void 0, void 0, function* () {
				try {
					yield this.collectInnerByAsync(event.innerRange);
					yield this.collectOuterByAsync(event);
				} catch (_a) {}
			});
		};
		/**
		* @description 同步收集视区内，异步收集视区外
		*/ _proto.collectByOuterAsync = function collectByOuterAsync(event) {
			return __awaiter(this, void 0, void 0, function* () {
				this.collectBySync(event.innerRange);
				try {
					yield this.collectOuterByAsync(event);
				} catch (_a) {}
			});
		};
		/**
		* @description 异步收集视区外内容
		*/ _proto.collectOuterByAsync = function collectOuterByAsync(event) {
			return __awaiter(this, void 0, void 0, function* () {
				var { innerRange, outerRange } = event;
				var { row, column } = outerRange;
				var rowCount = row[1] - row[0] + 1;
				var columnCount = column[1] - column[0] + 1;
				var totalUnits = rowCount * columnCount;
				var isInner = (unit) => isUnitInRange(unit, innerRange);
				this.abort();
				this.asyncTask = (0, import_dist$2.executeAsync)({
					length: totalUnits,
					initialValue: void 0,
					unitCallback: (index) => {
						var rowIndex = row[0] + Math.floor(index / columnCount);
						var columnIndex = column[0] + index % columnCount;
						if (isInner({
							rowIndex,
							columnIndex
						})) return;
						this.config.collectUnit({
							rowIndex,
							columnIndex
						});
					},
					finishCallback: () => {
						var _a, _b;
						this.asyncTask = null;
						(_b = (_a = this.config).outerCollectFinished) === null || _b === void 0 || _b.call(_a);
					}
				});
				yield this.asyncTask.promise;
			});
		};
		return ViewportFetcher;
	}(import_main$6.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/content/index.js
function _inherits$49(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$49(subClass, superClass);
}
function _set_prototype_of$49(o, p) {
	_set_prototype_of$49 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$49(o, p);
}
function getPosition(columnIndex, rowIndex) {
	return `${columnIndex}:${rowIndex}`;
}
var import_cloneDeep, import_main$5, StatClearEffetMuations, ContentCollector;
var init_content = __esmMin((() => {
	import_cloneDeep = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_event();
	import_main$5 = require_main();
	init_esm$1();
	init_es();
	init_es$1();
	init_field_collector();
	init_constants$1();
	init_constants();
	init_config$2();
	init_util_group_value();
	init_util_stat();
	init_interface$23();
	init_is_attachment_grid_mode();
	init_string_group_path();
	init_fetcher();
	init_wb_cell();
	StatClearEffetMuations = [MutationId.SET_FIELD_STAT_TYPE_MUTATION, MutationId.SET_FIELD_ATTRIBUTES_MUTATION];
	ContentCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$49(ContentCollector, Disposable);
		function ContentCollector(dataUtil, columns, rows, size, range, state, profile) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.columns = columns;
			_this.rows = rows;
			_this.size = size;
			_this.range = range;
			_this.state = state;
			_this.profile = profile;
			_this.collectConfig = getDefaultContentCollectConfig();
			_this.positions = /* @__PURE__ */ new Set();
			_this.statInfos = /* @__PURE__ */ new Map();
			_this.groupValueInfos = /* @__PURE__ */ new Map();
			_this.cellInfos = /* @__PURE__ */ new Map();
			_this.onContentChangeEmitter = _this._register(new Emitter());
			_this.collectVisibleBeforeRender = () => {
				if (_this.state.isExporting()) return;
				_this.scrollViewFetcher.collectInner();
				_this.frozenViewFetcher.collectInner();
			};
			_this.collectCell = (cellPosition) => {
				var { rowIndex, columnIndex } = cellPosition;
				var rowInfo = _this.rows.getInfo(rowIndex);
				if (!rowInfo) return;
				if (_this.positions.has(getPosition(columnIndex, rowIndex))) return;
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record && (rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.GroupHead && (rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Stat) return;
				var columnInfo = _this.columns.getInfos().get(columnIndex);
				if (!columnInfo) return;
				_this.collectByRowAndColumn(columnInfo, rowInfo);
			};
			_this.collectGlobalStatInfos = () => {
				var scrollColumnRange = _this.range.getColumnRange();
				_this.collectGlobalStatInfosByColumnRange(scrollColumnRange);
				var frozenColumnRange = _this.range.getFrozenColumnRange();
				_this.collectGlobalStatInfosByColumnRange(frozenColumnRange);
			};
			_this.collectFirstScreenStatAndGroupValue = (columnIndex) => {
				var columnInfo = _this.columns.getInfos().get(columnIndex);
				if (!columnInfo) return;
				collectGlobalStatInfos(columnInfo, _this.size, _this.statInfos, _this.dataUtil);
				_this.rows.getTypeRows(RowType.GroupHead).forEach((groupHeadRowInfo) => {
					_this.collectSingleStatAndGroupValue(columnInfo, groupHeadRowInfo);
				});
			};
			/**
			* @description 滚动区域范围
			*/ _this.getScrollViewRange = () => {
				var rowRange = _this.range.getRowRange();
				var columnRange = _this.range.getColumnRange();
				return {
					row: [rowRange.start, rowRange.end],
					column: [columnRange.start, columnRange.end]
				};
			};
			_this.getFrozenViewRange = () => {
				var rowRange = _this.range.getRowRange();
				var columnRange = _this.range.getFrozenColumnRange();
				return {
					row: [rowRange.start, rowRange.end],
					column: [columnRange.start, columnRange.end]
				};
			};
			_this.generateViewFetcher = (config) => _this._register(new ViewportFetcher(Object.assign({
				preFetchRate: {
					row: 3,
					column: 3
				},
				redLineRate: {
					row: 1,
					column: 1
				},
				onViewportChanged: _this.range.onRangeChange,
				getCollectType: () => "async",
				collectUnit: _this.collectCell,
				outerCollectFinished: () => _this.onContentChangeEmitter.fire(),
				innerCollectFinished: () => _this.onContentChangeEmitter.fire()
			}, config)));
			_this.onContentChange = _this.onContentChangeEmitter.event;
			_this.scrollViewFetcher = _this.generateViewFetcher({ getViewport: _this.getScrollViewRange });
			_this.frozenViewFetcher = _this.generateViewFetcher({
				getViewport: _this.getFrozenViewRange,
				preFetchRate: {
					row: 3,
					column: 0
				}
			});
			return _this;
		}
		var _proto = ContentCollector.prototype;
		_proto.dispose = function dispose(trace) {
			this.clearAll();
			Disposable.prototype.dispose.call(this, trace);
		};
		_proto.getCellInfo = function getCellInfo(fieldId, recordId) {
			var _a;
			return (_a = this.cellInfos.get(fieldId)) === null || _a === void 0 ? void 0 : _a.get(recordId);
		};
		_proto.getStatInfo = function getStatInfo(fieldId, groupPath) {
			var _a;
			return (_a = this.statInfos.get(fieldId)) === null || _a === void 0 ? void 0 : _a.get(stringifyGroupPath(groupPath));
		};
		_proto.getGroupValueInfo = function getGroupValueInfo(groupPath) {
			return this.groupValueInfos.get(stringifyGroupPath(groupPath));
		};
		/**
		* 确保指定 GroupHead 的 stat 和 groupValue 已被收集。
		* 用于 sticky 场景：sticky GroupHead 可能不在当前可视行范围内（自然 y 在 scrollTop 之上），
		* 当 contents.patch([]) 清空缓存后，这些 head 不会被 scrollViewFetcher 重新收集，
		* 导致 getGroupValueInfo 返回 undefined，groupValue 渲染为空。
		*
		* 本方法会内部定位到 isFirst 的 field 列再去补收集：
		*   - groupValue 仅由 isFirst 列驱动收集（见 collectSingleStatAndGroupValue）；
		*   - collectByRowAndColumn 对 !isField 的列会 early return，若调用方传入操作列，
		*     会导致 positions 被误标记而后续补收集被短路；因此此处忽略入参 columnInfo 的列身份，
		*     改用 firstFieldColumnInfo 定位去重 key 与真正执行收集。
		* 成本极低：positions 去重保证不重复收集。
		*/ _proto.ensureGroupHeadContent = function ensureGroupHeadContent(_columnInfo, groupHeadRowInfo) {
			var firstFieldColumnInfo = this.getFirstFieldColumnInfo();
			if (!firstFieldColumnInfo) return;
			var positionKey = getPosition(firstFieldColumnInfo.index, groupHeadRowInfo.index);
			if (this.positions.has(positionKey)) return;
			this.collectByRowAndColumn(firstFieldColumnInfo, groupHeadRowInfo);
		};
		_proto.collect = function collect() {
			this.resetAndCollect();
			this.onContentChangeEmitter.fire();
		};
		_proto.patch = function patch(mutations) {
			if (typeof mutations === "undefined" && !this.dataUtil.getContext().customConfig) return;
			this.resetAndCollect(mutations);
			this.onContentChangeEmitter.fire();
		};
		/**
		* 更新指定行的内容（对全量列进行收集，主要用于需要渲染被筛选行的内容时）
		*/ _proto.patchByRecordId = function patchByRecordId(recordId) {
			this.dataUtil.getVisibleFieldIds().forEach((fieldId) => this.collectCellContent(fieldId, recordId));
		};
		/**
		* 获取排版层单元格内容渲染区域（排除 padding 边距后的区域）
		*/ _proto.getCellRect = function getCellRect(...params) {
			return this.getContentRect(...params);
		};
		_proto.resetAndCollect = function resetAndCollect(mutations) {
			this.clearAll(mutations);
			this.updateCollectConfig();
			if (this.state.isExporting()) {
				this.collectAll();
				return;
			}
			this.scrollViewFetcher.collect("outer-async");
			this.frozenViewFetcher.collect("outer-async");
			this.collectGlobalStatInfos();
		};
		_proto.clearAll = function clearAll(mutations) {
			this.positions.clear();
			this.cellInfos.clear();
			this.groupValueInfos.clear();
			if (!mutations) return;
			var statMutations = mutations.filter((mutation) => StatClearEffetMuations.includes(mutation.id));
			(statMutations === null || statMutations === void 0 ? void 0 : statMutations.map((mutation) => mutation.fieldId)).forEach((fieldId) => {
				var statInfo = this.statInfos.get(fieldId);
				if (statInfo) statInfo.clear();
			});
		};
		_proto.collectAll = function collectAll() {
			this.columns.getInfos().forEach((columnInfo, columnIndex) => {
				this.collectFirstScreenStatAndGroupValue(columnIndex);
				this.rows.getTypeRows(RowType.RecordRange).forEach((recordRangeRowInfo) => {
					recordRangeRowInfo.recordIds.forEach((recordId) => {
						var recordRowInfo = this.rows.getInfoByRecordId(recordId);
						if (recordRowInfo) this.collectByRowAndColumn(columnInfo, recordRowInfo);
					});
				});
			});
		};
		_proto.collectByRowAndColumn = function collectByRowAndColumn(columnInfo, rowInfo) {
			this.positions.add(getPosition(columnInfo.index, rowInfo.index));
			if (!(columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.isField) || !rowInfo) return;
			if (rowInfo.type === RowType.Record) this.collectCellContent(columnInfo.id, rowInfo.recordId, this.getContentRectByInfo(columnInfo, rowInfo));
			else if (rowInfo.type === RowType.GroupHead) this.collectSingleStatAndGroupValue(columnInfo, rowInfo);
			var globalStatPositionKey = getPosition(columnInfo.index, -1);
			if (!this.positions.has(globalStatPositionKey)) {
				this.positions.add(globalStatPositionKey);
				collectGlobalStatInfos(columnInfo, this.size, this.statInfos, this.dataUtil);
			}
		};
		_proto.collectGlobalStatInfosByColumnRange = function collectGlobalStatInfosByColumnRange({ start, end }) {
			var infos = this.columns.getInfos();
			for (var i = start; i <= end; i++) {
				var columnInfo = infos.get(i);
				if (!columnInfo) continue;
				collectGlobalStatInfos(columnInfo, this.size, this.statInfos, this.dataUtil);
			}
		};
		_proto.collectCellContent = function collectCellContent(fieldId, recordId, contentInfoRect) {
			var field = this.dataUtil.getFieldByFieldId(fieldId);
			var standardCell = this.dataUtil.getStandardCell(fieldId, recordId);
			if (!field || !standardCell) return;
			var contentRect = contentInfoRect !== null && contentInfoRect !== void 0 ? contentInfoRect : this.getContentRect(fieldId, recordId);
			if (!contentRect) return;
			var contentCollectConfig = this.getContentCollectConfig(field, recordId);
			var drawConfigs;
			if (domainConfig.getIsWb()) {
				var fieldTitle = field.getTitle();
				if (isWbSpecialField(fieldTitle, ViewType.GRID)) drawConfigs = collectWbSpecialCell({
					fieldTitle,
					viewScope: ViewType.GRID,
					rect: contentRect,
					collectConfig: contentCollectConfig,
					standardCell,
					field
				});
			}
			if (!drawConfigs) drawConfigs = fieldCollector.collect(contentRect, contentCollectConfig, standardCell, field);
			if (!drawConfigs) return;
			if (!this.cellInfos.has(fieldId)) this.cellInfos.set(fieldId, /* @__PURE__ */ new Map());
			this.cellInfos.get(fieldId).set(recordId, drawConfigs);
		};
		_proto.collectSingleStatAndGroupValue = function collectSingleStatAndGroupValue(columnInfo, groupHeadRowInfo) {
			if (this.dataUtil.isFieldStatEnabled()) collectGroupStatInfos(columnInfo, groupHeadRowInfo, this.statInfos, this.dataUtil);
			if (columnInfo.isFirst) collectGroupValue(columnInfo, groupHeadRowInfo, this.statInfos, this.groupValueInfos, this.size, this.profile, this.dataUtil);
		};
		_proto.getContentCollectConfig = function getContentCollectConfig(field, recordId) {
			var fieldType = field.getType();
			if (isFormulaLikeField(field)) {
				var targetField = field.getResultFieldAttributes();
				if (targetField) fieldType = targetField.getType();
			}
			var maxLines = getMaxBreakLines(this.dataUtil.getRowHeightLevel(), fieldType) || 1;
			this.collectConfig.maxLines = maxLines;
			this.collectConfig.labelConfig.canWrap = maxLines > 1;
			if (!ua.isMobile && ContentCollector.AlignRightFieldTypes.includes(fieldType)) {
				var numberConfig = (0, import_cloneDeep.default)(this.collectConfig);
				numberConfig.textConfig.align = "right";
				return numberConfig;
			}
			if (isAttachmentGridMode(field)) {
				var attachmentConfig = (0, import_cloneDeep.default)(this.collectConfig);
				attachmentConfig.attachmentConfig.thumbnailMode = true;
				return attachmentConfig;
			}
			var fieldId = field.getId();
			if (this.dataUtil.isAIFiled(fieldId)) {
				var aiFieldConfig = (0, import_cloneDeep.default)(this.collectConfig);
				aiFieldConfig.aiConfig = {
					isGroupAi: this.dataUtil.isGroupAI(),
					aiFieldStyle: this.dataUtil.getAiFieldStyle(fieldId),
					isAiDirty: this.dataUtil.isAiDirty(fieldId, recordId)
				};
				return aiFieldConfig;
			}
			return this.collectConfig;
		};
		_proto.getContentRect = function getContentRect(fieldId, recordId) {
			var columnInfo = this.columns.getInfoByFieldId(fieldId);
			var rowInfo = this.rows.getInfoByRecordId(recordId);
			if (!columnInfo || !rowInfo) return;
			return this.getContentRectByInfo(columnInfo, rowInfo);
		};
		_proto.getContentRectByInfo = function getContentRectByInfo(columnInfo, rowInfo) {
			if (!columnInfo || !rowInfo) return;
			var rect = {
				x: columnInfo.contentStyle.x,
				y: rowInfo.y + this.size.cellPaddingTop,
				width: columnInfo.contentStyle.width,
				height: this.rows.getRecordSize() - this.getContentReduceHeight(columnInfo)
			};
			if (domainConfig.getIsWb()) {
				var standardCell = this.dataUtil.getStandardCell(columnInfo.id, rowInfo.recordId);
				if (standardCell && LabelTypes.includes(standardCell.sourceType)) rect.y -= 3;
			}
			return rect;
		};
		_proto.updateCollectConfig = function updateCollectConfig() {
			var isSingleLine = this.dataUtil.getRowHeightLevel() === RowHeightLevel.Short;
			this.collectConfig.textConfig.wrap = isSingleLine ? "none" : "word";
			this.collectConfig.textConfig.ellipsis = isSingleLine;
		};
		_proto.getContentReduceHeight = function getContentReduceHeight(columnInfo) {
			var { cellPaddingTop } = this.size;
			if (columnInfo.contentStyle.canExtendToBottom) return cellPaddingTop;
			return cellPaddingTop * 2;
		};
		_proto.getFirstFieldColumnInfo = function getFirstFieldColumnInfo() {
			for (var columnInfo of this.columns.getInfos().values()) if (columnInfo.isField && columnInfo.isFirst) return columnInfo;
		};
		return ContentCollector;
	}(import_main$5.Disposable);
	ContentCollector.AlignRightFieldTypes = [
		FieldType.NUMBER,
		FieldType.PERCENT,
		FieldType.CURRENCY
	];
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/data-util.js
function _inherits$48(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$48(subClass, superClass);
}
function _set_prototype_of$48(o, p) {
	_set_prototype_of$48 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$48(o, p);
}
var DataUtil;
var init_data_util = __esmMin((() => {
	init_esm$1();
	init_es();
	init_es$1();
	init_constants();
	init_data_util$1();
	init_time_util();
	DataUtil = /* @__PURE__ */ function(BaseCollectorDataUtil) {
		"use strict";
		_inherits$48(DataUtil, BaseCollectorDataUtil);
		function DataUtil(context, statCounter, status) {
			var _this = BaseCollectorDataUtil.call(this, context) || this;
			_this.context = context;
			_this.statCounter = statCounter;
			_this.status = status;
			_this._hasVisibleFieldGroup = void 0;
			_this.getAiFieldStyle = (fieldId) => {
				var _a;
				var field = _this.getFieldByFieldId(fieldId);
				if (!!(field === null || field === void 0 ? void 0 : field.getAIInfo())) return "InfoAI";
				if ((_a = field === null || field === void 0 ? void 0 : field.getAIProperty()) === null || _a === void 0 ? void 0 : _a.enable) return "SumAI";
				return null;
			};
			_this.timeUtil = new TimeUtil(_this.context, _this.status);
			return _this;
		}
		var _proto = DataUtil.prototype;
		_proto.isGantt = function isGantt() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) === ViewType.GANTT;
		};
		_proto.hasGlobalStat = function hasGlobalStat() {
			var _a;
			return this.isFieldStatEnabled() && ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) !== ViewType.GANTT && !ua.isMobile && !this.context.customConfig;
		};
		/**
		* 判断是否新版表格的布局
		* @returns bool
		*/ _proto.isGridNewLayout = function isGridNewLayout() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) === ViewType.GRID && supportNewLayout() && !this.context.customConfig;
		};
		/**
		* 获取列宽（数据层设置数据）
		* @param columnId
		* @returns
		*/ _proto.getColumnWidth = function getColumnWidth(columnId) {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getColumnWidth(columnId)) || DefaultConfig.COLUMN_DEFAULT_WIDTH;
		};
		/**
		* 获取当前视图的自定义配置
		*/ _proto.getCustomConfig = function getCustomConfig() {
			return this.context.customConfig;
		};
		/**
		* 获取行高级别
		* @returns
		*/ _proto.getRowHeightLevel = function getRowHeightLevel() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getRowHeightLevel()) || RowHeightLevel.Short;
		};
		/**
		* 获取冻结列数（数据层设置数据）
		* @returns
		*/ _proto.getFrozenFieldCount = function getFrozenFieldCount() {
			var _a, _b;
			return ((_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getFrozenFieldCount) === null || _b === void 0 ? void 0 : _b.call(_a)) || 0;
		};
		/**
		* 获取冻结的列 id
		*/ _proto.getFrozenFields = function getFrozenFields() {
			return this.getVisibleFieldIds().slice(0, this.getFrozenFieldCount());
		};
		/**
		* 获取列统计结果
		* @param params
		* @returns
		*/ _proto.getStatResult = function getStatResult(...params) {
			if (params[0] === "Operator" || params[0] === "Addition") return;
			return this.statCounter.getResult(...params);
		};
		/**
		* 获取分组树
		* @returns
		*/ _proto.getGroupTree = function getGroupTree() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getFormattedTree()) || [];
		};
		/**
		* 获取父子（树形）记录嵌套结构。
		*
		* 仅在视图启用「父子记录」（getParentLinkField() 非空）时返回非 null；
		* 否则返回 null，调用方需自行兜底为非树形渲染。
		*
		* 当前为透传 core 层 {@link IGridViewModel.getFormattedSub}，
		* 渲染层（row.ts / run-group.ts）暂不接入，后续 PR 跟进。
		* Gantt 视图本期不支持，会返回 null。
		*/ _proto.getFormattedSub = function getFormattedSub() {
			var _a;
			var view = this.getCurrentView();
			if (!view || view.type !== ViewType.GRID) return null;
			return (_a = view.getFormattedSub()) !== null && _a !== void 0 ? _a : null;
		};
		/**
		* 获取分组平铺信息
		* @returns
		*/ _proto.getGroupFlatten = function getGroupFlatten() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroupLayoutInfos()) || [];
		};
		/**
		* 获取分组依据列
		* @returns
		*/ _proto.getGroupFields = function getGroupFields() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroupFields()) || [];
		};
		/**
		* 是否有分组
		* @returns
		*/ _proto.hasGroup = function hasGroup() {
			return this.getGroupFields().length > 0;
		};
		/**
		* 是否显示列统计（默认始终都显示）
		* @returns
		*/ _proto.isFieldStatEnabled = function isFieldStatEnabled() {
			var _a, _b;
			if (domainConfig.getIsWb()) return false;
			return (_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.isFieldStatEnabled()) !== null && _b !== void 0 ? _b : true;
		};
		/**
		* 获取甘特视图的日期配置
		*/ _proto.getGanttDateConfig = function getGanttDateConfig() {
			return this.timeUtil.getDateConfig();
		};
		_proto.getRecordRangeTime = function getRecordRangeTime(recordId) {
			return this.timeUtil.getRecordRangeTime(recordId);
		};
		/**
		* 判断列是否有筛选条件
		* @param fieldId
		* @returns
		*/ _proto.isFieldHasFilter = function isFieldHasFilter(fieldId) {
			var _a, _b, _c, _d, _e;
			var context = this.getContext();
			var filterInfo = (_b = (_a = context.getCurrentView()) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b.filterInfos;
			if (!filterInfo) return false;
			var tableId = (_c = context.getCurrentTable()) === null || _c === void 0 ? void 0 : _c.id;
			var canReadOriginConditions = tableId ? context.getCore().permissionService.getPermissionStatus("canReadFilterOriginConditions", { tableId }) : false;
			var getFieldByFieldId = (fieldId) => {
				var _a;
				return (_a = context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getFieldByFieldId(fieldId);
			};
			return (((_e = (_d = getValidFilterConditions(getToComponentFilterInfo(filterInfo, !canReadOriginConditions).conditions, getFieldByFieldId)) === null || _d === void 0 ? void 0 : _d.filter((condition) => (condition === null || condition === void 0 ? void 0 : condition.fieldId) === fieldId)) === null || _e === void 0 ? void 0 : _e.length) || 0) > 0;
		};
		/**
		* 是否是 AI 字段
		* @param fieldId
		* @returns
		*/ _proto.isAIFiled = function isAIFiled(fieldId) {
			return !!this.getAiFieldStyle(fieldId);
		};
		/**
		* 是否是群主总结 AI（OldAI）
		* @returns
		*/ _proto.isGroupAI = function isGroupAI() {
			var table = this.getCurrentTable();
			return table ? getIsLinkGroupAppSync(table) : false;
		};
		/**
		* ？
		* @param recordId
		* @returns
		*/ _proto.isCurrentUserFollowAI = function isCurrentUserFollowAI(recordId) {
			var table = this.getCurrentTable();
			return table ? isCurrentUserByRecordId(table, recordId) : false;
		};
		/**
		* 单元格是否正在 AI 生成中
		* @param fieldId
		* @param recordId
		* @returns
		*/ _proto.isAiDirty = function isAiDirty(fieldId, recordId) {
			var _a;
			var tableId = (_a = this.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			if (!tableId) return false;
			return this.context.getCore().aiDirtyService.isDirty(tableId, fieldId, recordId);
		};
		/**
		* 获取 AI 生成进度百分比
		* @param fieldId
		* @returns
		*/ _proto.getAIProgress = function getAIProgress(fieldId) {
			var _a;
			var tableId = (_a = this.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			if (!tableId) return;
			return this.context.getCore().aiDirtyService.getFieldProgress(tableId, fieldId);
		};
		/**
		* 获取 AI 错误码
		* @param fieldId
		* @returns
		*/ _proto.getAIErrCode = function getAIErrCode(fieldId) {
			var _a;
			var tableId = (_a = this.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			if (!tableId) return 0;
			return this.context.getCore().aiDirtyService.getFieldErrCode(tableId, fieldId);
		};
		/**
		* 清除当前的 AI 任务
		* @param fieldId
		* @returns
		*/ _proto.clearAITask = function clearAITask(fieldId) {
			var _a;
			var tableId = (_a = this.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			if (!tableId) return;
			return this.context.getCore().aiDirtyService.clearAITask(tableId, [{ field_id: fieldId }]);
		};
		/**
		* 获取单元格填充色
		* @param recordId 记录ID
		* @param fieldId 字段ID
		* @returns 填充色字符串，如果没有则返回 undefined
		*/ _proto.getCellFillColor = function getCellFillColor(recordId, fieldId) {
			var _a, _b;
			if (this.isGantt()) return;
			var view = this.getCurrentView();
			if ((view === null || view === void 0 ? void 0 : view.type) === ViewType.GRID) return (_b = (_a = view === null || view === void 0 ? void 0 : view.viewColor) === null || _a === void 0 ? void 0 : _a.getCellColorInfo) === null || _b === void 0 ? void 0 : _b.call(_a, recordId, fieldId);
		};
		/**
		* 获取列头背景色
		* @param fieldId 字段ID
		* @returns 背景色字符串，如果没有则返回 undefined
		*/ _proto.getColHeaderBackgroundColor = function getColHeaderBackgroundColor(fieldId) {
			var _a, _b;
			if (this.isGantt()) return;
			var view = this.getCurrentView();
			if ((view === null || view === void 0 ? void 0 : view.type) === ViewType.GRID) return (_b = (_a = view === null || view === void 0 ? void 0 : view.viewColor) === null || _a === void 0 ? void 0 : _a.getColHeaderColorInfo) === null || _b === void 0 ? void 0 : _b.call(_a, fieldId);
		};
		/**
		* 获取行头背景色
		* @param recordId 记录ID
		* @returns 背景色字符串，如果没有则返回 undefined
		*/ _proto.getRowHeaderBackgroundColor = function getRowHeaderBackgroundColor(recordId) {
			var _a, _b;
			if (this.isGantt()) return;
			var view = this.getCurrentView();
			if ((view === null || view === void 0 ? void 0 : view.type) === ViewType.GRID) return (_b = (_a = view === null || view === void 0 ? void 0 : view.viewColor) === null || _a === void 0 ? void 0 : _a.getCellColorInfo) === null || _b === void 0 ? void 0 : _b.call(_a, recordId, "operator");
		};
		/**
		* 当前视图是否存在可见的字段编组
		* 有编组时表头需要变成两行（一行编组头 + 一行字段头）
		* 移动端不支持编组
		*
		* 微任务级缓存：同一帧内 size/column/widget 等会多次读取，避免重复遍历；
		* 下一个微任务自动失效，保证 mutation 后能读到最新值。
		*/ _proto.hasVisibleFieldGroup = function hasVisibleFieldGroup() {
			if (ua.isMobile) return false;
			if (this._hasVisibleFieldGroup !== void 0) return this._hasVisibleFieldGroup;
			this._hasVisibleFieldGroup = this.getVisibleFieldGroupByFieldGroupId().length > 0;
			queueMicrotask(() => {
				this._hasVisibleFieldGroup = void 0;
			});
			return this._hasVisibleFieldGroup;
		};
		/**
		* 获取可见的字段编组列表（可按编组 id 过滤）
		* @param fieldGroupId 可选，指定只返回该编组
		*/ _proto.getVisibleFieldGroupByFieldGroupId = function getVisibleFieldGroupByFieldGroupId(fieldGroupId) {
			var _a, _b;
			var list = (_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getVisibleFieldsWithFieldGroup()) !== null && _b !== void 0 ? _b : [];
			var result = [];
			for (var item of list) {
				if (item.type !== TableFieldGroupType.FIELD_GROUP) continue;
				if (fieldGroupId && item.data.id !== fieldGroupId) continue;
				result.push(item);
			}
			return result;
		};
		/**
		* 通过字段 id 反查所属编组（含 fieldList）
		*/ _proto.getFieldGroupByFieldId = function getFieldGroupByFieldId(fieldId) {
			for (var item of this.getVisibleFieldGroupByFieldGroupId()) if (item.data.fieldList.some((f) => f.getId() === fieldId)) return item.data;
		};
		/**
		* 获取指定编组内的字段在"可见字段列表"中的索引数组（相对 VisibleFieldIds，不含 Operator 列）
		*/ _proto.getFieldIndexesInFieldGroup = function getFieldIndexesInFieldGroup(fieldGroupId) {
			var group = this.getVisibleFieldGroupByFieldGroupId(fieldGroupId)[0];
			if (!group) return [];
			var visibleFieldIds = this.getVisibleFieldIds();
			var indexes = [];
			group.data.fieldList.forEach((field) => {
				var idx = visibleFieldIds.indexOf(field.getId());
				if (idx >= 0) indexes.push(idx);
			});
			return indexes;
		};
		return DataUtil;
	}(BaseCollectorDataUtil);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/helpers/width-adjuster.js
function getScreenWidth() {
	return globalThis.screen.width;
}
function getOneFieldMaxWidth() {
	var factor = ua.isIPad || isLandscape() || ua.isPC ? 1 / 3 : 2 / 3;
	return Math.round(getScreenWidth() * factor);
}
function isLandscape() {
	return window.matchMedia("(orientation: landscape)").matches;
}
var FixedContentWidthFields, SpecialFieldWidths, ColumnWidthAdjuster;
var init_width_adjuster = __esmMin((() => {
	init_esm$1();
	init_es$1();
	init_field_collector();
	init_pen();
	init_style();
	init_config$2();
	FixedContentWidthFields = [FieldType.CREATED_TIME, FieldType.MODIFIED_TIME];
	SpecialFieldWidths = {
		[FieldType.CHECKBOX]: 50,
		[FieldType.PROGRESS]: 150
	};
	ColumnWidthAdjuster = /* @__PURE__ */ function() {
		"use strict";
		function ColumnWidthAdjuster(size, profile, dataUtil, status) {
			this.size = size;
			this.profile = profile;
			this.dataUtil = dataUtil;
			this.status = status;
			this.maxCalcCells = 1e3 * 20;
			this.maxCalcRows = 100;
			this.calcTotalWidth = 0;
		}
		var _proto = ColumnWidthAdjuster.prototype;
		_proto.clear = function clear() {
			this.calcTotalWidth = 0;
		};
		_proto.getColumnWidth = function getColumnWidth(fieldId) {
			var width = this.calcWidth(fieldId);
			this.calcTotalWidth += width;
			return width;
		};
		_proto.calcWidth = function calcWidth(fieldId) {
			var maxWidth = getOneFieldMaxWidth();
			var titleWidth = this.getFieldTitleWidth(fieldId);
			if (this.dataUtil.isAIFiled(fieldId)) titleWidth += this.size.cellPaddingLeft + this.size.fieldIconSize;
			if (titleWidth > maxWidth) return maxWidth;
			var cellMaxWidth = this.getCellMaxWidthByFieldId(fieldId) + style.size.cellPadding / 2;
			var width = Math.min(maxWidth, Math.max(titleWidth, cellMaxWidth));
			var fieldIds = this.dataUtil.getVisibleFieldIds();
			if (fieldIds[fieldIds.length - 1] === fieldId) {
				var additionWidth = this.profile.additionFieldWidth;
				var fixedUsedWidth = this.profile.operatorFieldWidth + additionWidth + this.size.globalPaddingRight;
				var remainWidth = this.size.rootWidth - fixedUsedWidth - this.calcTotalWidth;
				if (remainWidth > width) width = remainWidth;
			}
			return width;
		};
		_proto.getFieldTitleWidth = function getFieldTitleWidth(fieldId) {
			var title = this.dataUtil.getFieldByFieldId(fieldId).getTitle();
			return this.size.cellPaddingLeft + pen.util.measureTextWidth(title) + this.size.fieldIconSize + this.size.fieldTitleMarginLeft + this.size.fieldTitleMarginRight + 2 * style.size.tagMargin;
		};
		_proto.getCellMaxWidthByFieldId = function getCellMaxWidthByFieldId(fieldId) {
			var maxWidth = 0;
			var contentRect = this.getCollectRect();
			var contentConfig = this.getCollectConfig();
			var field = this.dataUtil.getFieldByFieldId(fieldId);
			var fieldType = field.getType();
			if (SpecialFieldWidths[fieldType]) return SpecialFieldWidths[fieldType];
			var oneFieldMaxWidth = getOneFieldMaxWidth();
			var isFixedWidthField = FixedContentWidthFields.includes(fieldType);
			var recordIds = this.dataUtil.getDisplayedRecordIds();
			if (recordIds.length * this.dataUtil.getVisibleFieldIds().length > this.maxCalcCells) recordIds = recordIds.slice(0, this.maxCalcRows);
			for (var recordId of recordIds) {
				var standardCell = this.dataUtil.getStandardCell(fieldId, recordId);
				if (!standardCell) continue;
				var drawConfigs = fieldCollector.collect(contentRect, contentConfig, standardCell, field);
				if (!drawConfigs || drawConfigs.length === 0) continue;
				var width = fieldCollector.measureWidth(field, drawConfigs);
				if (width > maxWidth) maxWidth = width;
				if (maxWidth > oneFieldMaxWidth || isFixedWidthField) break;
			}
			return maxWidth + this.size.cellPaddingLeft * 2;
		};
		_proto.getCollectRect = function getCollectRect() {
			if (!this.collectRect) this.collectRect = {
				x: 0,
				y: 0,
				width: getScreenWidth(),
				height: this.size.minRowHeight - this.size.cellPaddingTop * 2
			};
			return this.collectRect;
		};
		_proto.getCollectConfig = function getCollectConfig() {
			if (!this.collectConfig) {
				this.collectConfig = getDefaultContentCollectConfig();
				this.collectConfig.maxLines = 1;
			}
			return this.collectConfig;
		};
		return ColumnWidthAdjuster;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/column.js
function canExtendToRightEdgeFieldType(field) {
	var fieldType = field.getType();
	return [...LabelTypes, FieldType.IMAGE].includes(fieldType);
}
function canExtendToBottomEdgeFieldType(field) {
	var fieldType = field.getType();
	if (isAttachmentGridMode(field)) return false;
	return LabelTypes.includes(fieldType);
}
function getFieldContentOffsetY(field) {
	var fieldType = field.getType();
	if (LabelTypes.includes(fieldType)) return -2;
	return 0;
}
var PatchEffectMutations, ColumnCollector;
var init_column$1 = __esmMin((() => {
	init_esm$1();
	init_es();
	init_es$1();
	init_constants$1();
	init_pen();
	init_render_app_config();
	init_index_interface$1();
	init_utils$2();
	init_resources();
	init_style();
	init_interface$21();
	init_constants();
	init_width_adjuster();
	init_head_right_dropdown_rect();
	init_is_attachment_grid_mode();
	init_field_title();
	PatchEffectMutations = [
		MutationId.SET_FIELD_ATTRIBUTES_MUTATION,
		MutationId.SET_FIELD_HIDDEN_MUTATION,
		MutationId.SET_COL_WIDTH_MUTATION,
		MutationId.DELETE_FIELD_MUTATION,
		MutationId.MOVE_FIELD_MUTATION,
		MutationId.SET_FROZEN_FIELD_COUNT_MUTATION,
		MutationId.SET_DATE_CONFIG_MUTATION,
		MutationId.SET_GROUP_MUTATION,
		MutationId.SET_FILTER_MUTATION,
		MutationId.APPEND_RECORDS_MUTATION,
		MutationId.SET_BLOCK_ATTRIBUTES_MUTATION,
		MutationId.SET_FIELD_GROUP_MUTATION
	];
	ColumnCollector = /* @__PURE__ */ function() {
		"use strict";
		function ColumnCollector(dataUtil, size, profile, state, status) {
			this.dataUtil = dataUtil;
			this.size = size;
			this.profile = profile;
			this.state = state;
			this.status = status;
			this.widths = /* @__PURE__ */ new Map();
			this.columnInfos = /* @__PURE__ */ new Map();
			this.aiIconSize = {
				width: 20,
				height: 12
			};
			this.filterIconSize = style.size.iconUltraSmall;
			this.minTitleWidth = pen.util.measureTextWidth("…");
			this.aiProgressDeleteIconWidth = 8;
			this.tempDeltaWidths = /* @__PURE__ */ new Map();
			this.widthAdjuster = new ColumnWidthAdjuster(this.size, this.profile, this.dataUtil, this.status);
			this.updateAllWidths();
		}
		var _proto = ColumnCollector.prototype;
		_proto.getInfos = function getInfos() {
			return this.columnInfos;
		};
		_proto.getInfoByFieldId = function getInfoByFieldId(fieldId) {
			return Array.from(this.columnInfos.values()).find((info) => info.id === fieldId);
		};
		_proto.getInfoByIndex = function getInfoByIndex(index) {
			return this.columnInfos.get(index);
		};
		_proto.collect = function collect() {
			this.beforeCollect();
			this.collectColumns();
		};
		_proto.patch = function patch(mutations) {
			var _a;
			var hasMutation = typeof mutations !== "undefined";
			var hasEffectMutation = hasMutation && mutations.some((mutation) => PatchEffectMutations.includes(mutation.id));
			var isForceFullCollectSignal = hasMutation && mutations.length === 0;
			if (!hasMutation) {
				if ((_a = this.dataUtil.getContext().customConfig) === null || _a === void 0 ? void 0 : _a.layoutConfig[LayoutConfigKey.CUSTOM_FILED_WIDTH]) this.updateAllWidths();
				this.collect();
				return;
			}
			if (hasMutation) this.updateAllWidths();
			if (hasEffectMutation || isForceFullCollectSignal || ua.isMobile) this.collect();
		};
		_proto.patchWidth = function patchWidth(fieldId, width) {
			this.widths.set(fieldId, width);
		};
		_proto.getWidth = function getWidth(fieldId) {
			return this.getFieldWidth(fieldId);
		};
		_proto.setColumnHovering = function setColumnHovering(columnIndex) {
			this.columnInfos.forEach((info, index) => {
				if (index === columnIndex) info.isHover = true;
				else info.isHover = false;
			});
		};
		_proto.checkColumnNeedClearHover = function checkColumnNeedClearHover() {
			var needUpdate = false;
			this.columnInfos.forEach((info) => {
				if (info.isHover) {
					info.isHover = false;
					needUpdate = true;
				}
			});
			return needUpdate;
		};
		_proto.getFieldTempWidth = function getFieldTempWidth(fieldId) {
			var tempDeltaWidth = this.tempDeltaWidths.get(fieldId);
			return tempDeltaWidth ? this.dataUtil.getColumnWidth(fieldId) + tempDeltaWidth : 0;
		};
		_proto.beforeCollect = function beforeCollect() {
			this.tempDeltaWidths.clear();
			this.columnInfos.clear();
			this.size.setFrozenWidth(0, true);
			this.size.setScrollWidth(0, true);
		};
		_proto.collectColumns = function collectColumns() {
			var isGantt = this.dataUtil.isGantt();
			var fields = this.dataUtil.getVisibleFieldIds() || [];
			var firstFieldId = fields[0];
			var lastFieldId = fields[fields.length - 1];
			var { customConfig } = this.dataUtil.getContext();
			!(customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_OPERATOR_FIELD]) && fields.unshift("Operator");
			var frozenCount = this.state.getColumnFrozenCount();
			var globalWidth = this.size.globalPaddingLeft;
			fields.forEach((fieldId, index) => {
				var info = this.collectColumn({
					fieldId,
					globalWidth,
					isGantt,
					index,
					firstFieldId,
					lastFieldId,
					frozenCount
				});
				globalWidth += info.width;
			});
			if (!isGantt && !(customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_FIELD_ADD])) {
				var mainWidth = getMainWidth(this.dataUtil.getContext().getId());
				if (mainWidth) {
					var retainWidth = mainWidth - globalWidth - style.size.borderWidth;
					this.profile.additionFieldWidth = Math.max(this.profile.additionFieldWidth, retainWidth);
				}
				var info = this.collectColumn({
					fieldId: AdditionField,
					globalWidth,
					isGantt,
					index: fields.length,
					firstFieldId,
					lastFieldId,
					frozenCount
				});
				globalWidth += info.width;
			}
			this.size.setScrollWidth(this.size.globalPaddingRight);
			this.size.setGlobalWidth(globalWidth + this.size.globalPaddingRight);
			this.assignFieldGroupRects();
		};
		/**
		* 聚合同一编组的列，计算编组头矩形
		* - 编组头位于表头的上部：y = globalPaddingTop, height = fieldGroupHeaderHeight
		* - 编组头水平覆盖组内所有字段列的宽度之和
		*/ _proto.assignFieldGroupRects = function assignFieldGroupRects() {
			if (!this.dataUtil.hasVisibleFieldGroup()) return;
			var groupMap = /* @__PURE__ */ new Map();
			this.columnInfos.forEach((info) => {
				if (!info.fieldGroupId) return;
				var prev = groupMap.get(info.fieldGroupId);
				if (prev) {
					prev.minX = Math.min(prev.minX, info.x);
					prev.totalWidth += info.width;
					prev.count += 1;
				} else groupMap.set(info.fieldGroupId, {
					minX: info.x,
					totalWidth: info.width,
					count: 1
				});
			});
			this.columnInfos.forEach((info) => {
				if (!info.fieldGroupId) return;
				var data = groupMap.get(info.fieldGroupId);
				if (!data) return;
				info.fieldGroupRect = {
					x: data.minX,
					y: this.size.globalPaddingTop,
					width: data.totalWidth,
					height: this.size.fieldGroupHeaderHeight
				};
				info.fieldGroupFieldCount = data.count;
			});
		};
		_proto.collectColumn = function collectColumn({ fieldId, globalWidth, isGantt, index, firstFieldId, lastFieldId, frozenCount }) {
			var field = this.dataUtil.getFieldByFieldId(fieldId);
			var fieldGroup = field ? this.dataUtil.getFieldGroupByFieldId(fieldId) : void 0;
			var hasVisibleFieldGroup = this.dataUtil.hasVisibleFieldGroup();
			var fieldRect = {
				x: globalWidth,
				y: this.size.globalPaddingTop,
				width: this.getFieldWidth(fieldId),
				height: this.size.fieldHeight
			};
			if (hasVisibleFieldGroup && fieldGroup) {
				fieldRect.y = this.size.globalPaddingTop + this.size.fieldGroupHeaderHeight;
				fieldRect.height = this.size.fieldHeightGrid;
			}
			var contentRect = Object.assign({}, fieldRect);
			if (isGantt) {
				contentRect.height = this.size.fieldHeightGrid;
				contentRect.y += this.size.fieldHeightGantt - this.size.fieldHeightGrid;
			}
			var topText = this.collectTopText(contentRect, field);
			var isField = !!field;
			var crimpConfig = this.getCrimpConfigs(contentRect, fieldId, field);
			var tempDeltaWidth = this.tempDeltaWidths.get(fieldId);
			if (tempDeltaWidth) {
				fieldRect.width += tempDeltaWidth;
				contentRect.width += tempDeltaWidth;
				crimpConfig = this.getCrimpConfigs(contentRect, fieldId, field);
			}
			var info = Object.assign(Object.assign({}, fieldRect), {
				id: fieldId,
				index,
				topText,
				isField,
				isHover: false,
				isFirst: fieldId === firstFieldId,
				isLast: fieldId === lastFieldId,
				isFrozen: index < frozenCount,
				isSelected: isField && this.state.isSelectedField(fieldId),
				normalDrawConfig: crimpConfig.normalDrawConfig,
				activeDrawConfig: crimpConfig.activeDrawConfig,
				fieldGroupId: fieldGroup === null || fieldGroup === void 0 ? void 0 : fieldGroup.id,
				fieldGroupName: fieldGroup === null || fieldGroup === void 0 ? void 0 : fieldGroup.name,
				contentStyle: {
					x: field ? fieldRect.x + this.size.cellPaddingLeft : 0,
					width: field ? fieldRect.width - this.getContentReduceWidth(field) : 0,
					canExtendToBottom: field ? canExtendToBottomEdgeFieldType(field) : false,
					offsetY: field ? getFieldContentOffsetY(field) : 0
				}
			});
			this.columnInfos.set(index, info);
			if (index < frozenCount) this.size.setFrozenWidth(info.width);
			else this.size.setScrollWidth(info.width);
			return info;
		};
		_proto.getCrimpConfigs = function getCrimpConfigs(contentRect, fieldId, field) {
			var normalDrawConfig = this.collectColumnsDrawConfig(fieldId, contentRect, field, false);
			var activeDrawConfig = this.collectColumnsDrawConfig(fieldId, contentRect, field, true);
			return {
				normalDrawConfig,
				activeDrawConfig: ua.isMobile ? normalDrawConfig : activeDrawConfig
			};
		};
		_proto.collectColumnsDrawConfig = function collectColumnsDrawConfig(fieldId, contentRect, field, isActived) {
			var _a;
			var result = {
				leftIcon: void 0,
				leftIconCornerIcon: void 0,
				text: void 0,
				aiLoadings: void 0,
				markIcon: void 0,
				filterIcon: void 0,
				rightIcon: void 0,
				rightIconRect: void 0,
				hasEllipsis: false
			};
			if (domainConfig.getIsWb()) {
				var itemMargin = this.size.fieldIconMarginLeft;
				if (!field && (fieldId === "Operator" || fieldId === "Addition")) {
					result.leftIcon = this.collectFieldIcon(fieldId, contentRect.x + itemMargin, contentRect, field);
					return result;
				}
				var titleRect = Object.assign(Object.assign({}, contentRect), {
					x: contentRect.x + itemMargin,
					width: Math.max(this.minTitleWidth, contentRect.width - itemMargin * 2)
				});
				var { textConfig, hasEllipsis } = this.collectTitle(fieldId, titleRect, field);
				result.text = textConfig;
				result.hasEllipsis = hasEllipsis;
				return result;
			}
			var itemMargin1 = this.size.fieldIconMarginLeft;
			var enoughTextWidth = 2 * this.minTitleWidth;
			var startX = contentRect.x + itemMargin1;
			var remainWidth = contentRect.width - itemMargin1 * 2;
			if (isActived && field) {
				var dropdownInfo = getHeadRightDropdownInfo(contentRect);
				result.rightIcon = this.collectRightIcon(dropdownInfo === null || dropdownInfo === void 0 ? void 0 : dropdownInfo.icon);
				result.rightIconRect = dropdownInfo === null || dropdownInfo === void 0 ? void 0 : dropdownInfo.rect;
				remainWidth -= result.rightIcon ? itemMargin1 + result.rightIcon.width : 0;
				if (remainWidth < enoughTextWidth) return this.getMiniResult(result, fieldId, contentRect, startX, field);
			}
			var usedInfo = this.getFilterAndAIUsedInfo(fieldId, remainWidth, itemMargin1, field);
			remainWidth = usedInfo.restWidth;
			var shouldHideFieldIcon = renderAppConfigService.getConfig()[RenderAppConfigKey.SHOULD_HIDE_FIELD_ICON];
			var fieldIconTakeWidth = this.size.fieldIconSize;
			var fieldIconShowWidth = fieldIconTakeWidth + (field ? enoughTextWidth : 0);
			if (!shouldHideFieldIcon && remainWidth > fieldIconShowWidth) {
				result.leftIcon = this.collectFieldIcon(fieldId, startX, contentRect, field);
				if (result.leftIcon && (field === null || field === void 0 ? void 0 : field.isWecomExternal)) {
					var cornerIconSize = this.size.fieldIconSize / 2;
					var cornerIconRect = {
						x: result.leftIcon.x + result.leftIcon.width - cornerIconSize,
						y: result.leftIcon.y + result.leftIcon.height - cornerIconSize,
						width: cornerIconSize,
						height: cornerIconSize
					};
					result.leftIconCornerIcon = pen.config.icon(getSyncIconAlias(), cornerIconRect);
				}
				remainWidth -= fieldIconTakeWidth;
				startX += fieldIconTakeWidth;
			}
			startX += this.size.fieldTitleMarginLeft;
			remainWidth -= this.size.fieldTitleMarginLeft;
			var titleWidth = remainWidth < enoughTextWidth ? this.minTitleWidth : remainWidth;
			var titleRect1 = Object.assign(Object.assign({}, contentRect), {
				width: titleWidth,
				x: startX
			});
			var { textConfig: textConfig1, textEndX, hasEllipsis: hasEllipsis1 } = this.collectTitle(fieldId, titleRect1, field);
			result.text = textConfig1;
			result.hasEllipsis = hasEllipsis1;
			startX = textEndX + this.size.fieldTitleMarginRight;
			remainWidth -= this.size.fieldTitleMarginRight;
			if (usedInfo.aiIconInfo) {
				result.markIcon = pen.config.icon(usedInfo.aiIconInfo.icon, {
					id: usedInfo.aiIconInfo.icon,
					x: startX,
					y: contentRect.y + (contentRect.height - this.aiIconSize.height) / 2,
					width: usedInfo.aiIconInfo.width,
					height: usedInfo.aiIconInfo.height
				});
				startX += usedInfo.aiIconInfo.width + itemMargin1;
			}
			if (usedInfo.aiLoadingInfo) {
				var rectConfig = pen.config.rect({
					x: startX,
					y: contentRect.y + (contentRect.height - usedInfo.aiLoadingInfo.height) / 2,
					width: usedInfo.aiLoadingInfo.width,
					height: usedInfo.aiLoadingInfo.height,
					borderRadius: style.size.borderRadius,
					background: style.color.tagBackground
				});
				result.aiLoadings = [
					rectConfig,
					pen.config.text({
						text: (_a = usedInfo.aiLoadingInfo) === null || _a === void 0 ? void 0 : _a.text,
						x: rectConfig.x + style.size.tagPaddingLeft,
						y: rectConfig.y,
						width: rectConfig.width,
						height: rectConfig.height,
						fontSize: style.size.fontSizeUltraSmall,
						color: style.color.selectionBorderColor
					}),
					pen.config.icon(NormalIconAlias.MINITAG_AI_PROGRESS_CLOSE, {
						x: rectConfig.x + rectConfig.width - this.aiProgressDeleteIconWidth - style.size.tagPaddingLeft / 2,
						y: rectConfig.y + (rectConfig.height - this.aiProgressDeleteIconWidth) / 2,
						width: this.aiProgressDeleteIconWidth,
						height: this.aiProgressDeleteIconWidth
					})
				];
				startX += usedInfo.aiLoadingInfo.width + itemMargin1;
			}
			if (usedInfo.filterInfo) {
				result.filterIcon = pen.config.icon(usedInfo.filterInfo.icon, {
					id: usedInfo.filterInfo.icon,
					x: startX,
					y: contentRect.y + (contentRect.height - style.size.iconUltraSmall) / 2,
					width: usedInfo.filterInfo.width,
					height: usedInfo.filterInfo.height
				});
				startX += usedInfo.filterInfo.width;
			}
			return result;
		};
		_proto.getFilterAndAIUsedInfo = function getFilterAndAIUsedInfo(fieldId, remainWidth, itemMargin, field) {
			var info = {
				filterInfo: void 0,
				aiIconInfo: void 0,
				aiLoadingInfo: void 0,
				restWidth: remainWidth
			};
			if (!field) return info;
			var hasFilter = this.dataUtil.isFieldHasFilter(fieldId);
			var hasAI = this.dataUtil.isAIFiled(fieldId);
			if (hasFilter) {
				var filterIconTakeWidth = itemMargin + this.filterIconSize;
				if (info.restWidth > filterIconTakeWidth) {
					info.filterInfo = {
						icon: NormalIconAlias.FIELD_FILTER,
						width: this.filterIconSize,
						height: this.filterIconSize
					};
					info.restWidth -= filterIconTakeWidth;
				} else return info;
			}
			if (hasAI) {
				var aiProgressValue = this.dataUtil.getAIProgress(fieldId);
				if (typeof aiProgressValue === "number") {
					var aiLoadingText = i18n.t("AI 生成中({{progress}}%)", { progress: Math.min(aiProgressValue, 99) });
					var aiLoadingAllTakeWidth = pen.util.measureTextWidth(aiLoadingText, style.size.fontSizeUltraSmall) + 2 * style.size.iconPadding + this.aiProgressDeleteIconWidth;
					if (info.restWidth > aiLoadingAllTakeWidth) {
						info.aiLoadingInfo = {
							icon: NormalIconAlias.MINITAG_AI_PROGRESS_CLOSE,
							width: aiLoadingAllTakeWidth,
							height: style.size.iconSmall,
							text: aiLoadingText
						};
						info.restWidth -= aiLoadingAllTakeWidth;
					} else this.tempDeltaWidths.set(fieldId, Math.abs(aiLoadingAllTakeWidth * 2));
				} else {
					var aiError = this.dataUtil.getAIErrCode(fieldId);
					var iconWidth = aiError ? this.aiIconSize.height : this.aiIconSize.width;
					var aiIconTakeWidth = itemMargin + iconWidth;
					if (info.restWidth > aiIconTakeWidth) {
						info.aiIconInfo = {
							icon: aiError ? NormalIconAlias.MINITAG_AI_ERROR : NormalIconAlias.MINITAG_AI,
							width: iconWidth,
							height: this.aiIconSize.height
						};
						info.restWidth -= aiIconTakeWidth;
					} else return info;
				}
			}
			return info;
		};
		_proto.getMiniResult = function getMiniResult(result, fieldId, contentRect, startX, field) {
			var titleRect = Object.assign(Object.assign({}, contentRect), {
				x: startX,
				width: this.minTitleWidth
			});
			var { textConfig } = this.collectTitle(fieldId, titleRect, field);
			result.text = textConfig;
			result.hasEllipsis = true;
			return result;
		};
		_proto.collectTitle = function collectTitle(fieldId, contentRect, field) {
			var _a;
			var title = ((field === null || field === void 0 ? void 0 : field.getTitle()) || "").replace(/[\r\n]+/g, "");
			if (fieldId === "Addition" && ua.isMobile) title = i18n.t("添加列");
			title = mapWbFieldTitle(title);
			var titleWidth = pen.util.measureTextWidth(title, style.size.fieldTitleFontSize);
			var textConfig;
			if (title) textConfig = pen.config.text(Object.assign(Object.assign({}, contentRect), {
				y: contentRect.y + (ua.isWindows ? 1 : -1),
				text: title,
				fontSize: style.size.fieldTitleFontSize,
				color: style.color.normalFontColor,
				wrap: "none",
				ellipsis: true
			}));
			var textEndX = ((_a = textConfig === null || textConfig === void 0 ? void 0 : textConfig.layouts) === null || _a === void 0 ? void 0 : _a.length) ? textConfig.x + textConfig.layouts[0].width : contentRect.x + this.minTitleWidth;
			var hasEllipsis = textConfig && titleWidth > contentRect.width;
			return {
				textConfig,
				textEndX,
				hasEllipsis
			};
		};
		_proto.collectFieldIcon = function collectFieldIcon(fieldId, startX, contentRect, field) {
			var opacity = 1;
			var iconAlias = "";
			var iconSize = this.size.fieldIconSize;
			var iconX = startX;
			var iconY = contentRect.y + (contentRect.height - this.size.fieldIconSize) / 2;
			if (field) {
				iconAlias = getFieldTypeIconAlias(field.getType());
				opacity = style.consts.disabledOpacity;
			} else if (fieldId === "Operator" && ua.isPC) {
				var { customConfig } = this.dataUtil.getContext();
				if (customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_OPERATOR_SELECT_ICON]) return;
				iconY -= (style.size.iconNormal - iconSize) / 2;
				iconSize = style.size.iconNormal;
				iconAlias = getCheckboxIconAlias(this.state.isSelectAll());
				iconX = contentRect.x + (contentRect.width - this.size.minOperatorFieldWidth) + (this.size.minOperatorFieldWidth - iconSize) / 2;
			} else if (fieldId === "Addition") {
				var addIconSize = ua.isMobile ? style.size.iconNormal : style.size.iconSmall;
				iconY -= (addIconSize - iconSize) / 2;
				iconSize = addIconSize;
				iconAlias = NormalIconAlias.ADD;
				iconX = contentRect.x + (this.size.minAdditionFieldWidth - iconSize) / 2;
				if (!this.status.getPermissionStatus("canInsertField", {})) opacity = style.consts.disabledOpacity;
			}
			if (!iconAlias) return;
			return pen.config.icon(iconAlias, {
				x: iconX,
				y: iconY,
				width: iconSize,
				height: iconSize,
				opacity
			});
		};
		_proto.collectRightIcon = function collectRightIcon(rightDropdownRect) {
			if (!rightDropdownRect) return;
			var iconAlias = isDarkMode() ? NormalIconAlias.DROPDOWN_WHITE : NormalIconAlias.DROPDOWN;
			return pen.config.icon(iconAlias, {
				x: rightDropdownRect.x,
				y: rightDropdownRect.y,
				width: rightDropdownRect.width,
				height: rightDropdownRect.height
			});
		};
		_proto.collectTopText = function collectTopText(contentRect, field) {
			var dateConfig = this.dataUtil.getGanttDateConfig();
			if (!field || !dateConfig) return;
			var fieldId = field.getId();
			var { startDateFieldId, endDateFieldId } = dateConfig;
			if (fieldId !== startDateFieldId && fieldId !== endDateFieldId) return;
			var text = "";
			if (fieldId === startDateFieldId) text = i18n.t("起点");
			else text = i18n.t("终点");
			if (!text) return;
			var fontSize = style.size.fontSizeSmall;
			var textWidth = pen.util.measureTextWidth(text, fontSize);
			return pen.config.text({
				text,
				width: textWidth + this.size.fieldTitleMarginRight * 2,
				height: style.size.tagNormal,
				x: contentRect.x + this.size.fieldIconMarginLeft,
				y: contentRect.y - this.size.fieldTopTextMarginBottom + style.size.cellPadding,
				fontSize: style.size.fontSizeSmall,
				color: style.color.lightUltraFontColor,
				align: "center"
			});
		};
		_proto.getFieldWidth = function getFieldWidth(fieldId) {
			var _a, _b;
			if (fieldId === "Operator") return this.profile.operatorFieldWidth;
			if (fieldId === "Addition") return this.profile.additionFieldWidth;
			if (this.dataUtil.getContext().customConfig && this.dataUtil.getContext().isDashboardLite) return ((_b = (_a = this.dataUtil).getColumnWidth) === null || _b === void 0 ? void 0 : _b.call(_a, fieldId)) || 0;
			return this.widths.get(fieldId) || 0;
		};
		_proto.updateAllWidths = function updateAllWidths() {
			this.widths.clear();
			this.widthAdjuster.clear();
			var { customConfig } = this.dataUtil.getContext();
			this.dataUtil.getVisibleFieldIds().forEach((fieldId) => {
				if (ua.isMobile || customConfig && customConfig.layoutConfig[LayoutConfigKey.CUSTOM_FILED_WIDTH] !== true) {
					var adjustWidth = this.widthAdjuster.getColumnWidth(fieldId);
					this.widths.set(fieldId, adjustWidth);
				} else this.widths.set(fieldId, this.dataUtil.getColumnWidth(fieldId));
			});
		};
		_proto.getContentReduceWidth = function getContentReduceWidth(field) {
			var { cellPaddingLeft } = this.size;
			if (canExtendToRightEdgeFieldType(field)) return cellPaddingLeft;
			return cellPaddingLeft * 2;
		};
		return ColumnCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/profile.js
var addFieldTextWidth, ProfileCollector;
var init_profile = __esmMin((() => {
	init_esm$1();
	init_es();
	init_pen();
	init_style();
	init_interface$21();
	addFieldTextWidth = ua.isMobile ? pen.util.measureTextWidth(i18n.t("添加列"), style.size.fontSizeNormal) : 0;
	ProfileCollector = /* @__PURE__ */ function() {
		"use strict";
		function ProfileCollector(dataUtil, size) {
			this.dataUtil = dataUtil;
			this.size = size;
			this.operatorFieldWidth = this.size.minOperatorFieldWidth;
			this.additionFieldWidth = this.dataUtil.getContext().customConfig ? 0 : this.size.minAdditionFieldWidth + addFieldTextWidth;
			this.headRadius = 0;
			this.groupLevelBackgrounds = /* @__PURE__ */ new Map();
			this.groupFoldStarts = /* @__PURE__ */ new Map();
		}
		var _proto = ProfileCollector.prototype;
		_proto.collect = function collect() {
			this.collectSideFieldWidth();
			this.collectTopLevelRadius();
			this.collectGroupLevelBackground();
			this.collectGroupFoldStartX();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.collectSideFieldWidth = function collectSideFieldWidth() {
			this.operatorFieldWidth = this.size.minOperatorFieldWidth;
			this.additionFieldWidth = this.size.minAdditionFieldWidth;
			var groupCount = this.dataUtil.getGroupFields().length;
			if (groupCount && ua.isPC) {
				var indentWidth = this.size.levelIndent * (groupCount - 1);
				this.operatorFieldWidth += indentWidth;
				this.additionFieldWidth += indentWidth;
			}
			if (ua.isMobile) this.additionFieldWidth += addFieldTextWidth;
		};
		_proto.collectTopLevelRadius = function collectTopLevelRadius() {
			var _a, _b;
			var { borderRadius } = style.size;
			if (this.dataUtil.getContext().customConfig) {
				this.headRadius = ((_b = (_a = this.dataUtil.getCustomConfig()) === null || _a === void 0 ? void 0 : _a.layoutConfig[LayoutConfigKey.SHOW_BORDER_RADIUS]) !== null && _b !== void 0 ? _b : false) ? [
					borderRadius,
					borderRadius,
					0,
					0
				] : 0;
				return;
			}
			var isGantt = this.dataUtil.isGantt();
			if (!this.dataUtil.hasGroup()) this.headRadius = [
				borderRadius,
				isGantt ? 0 : borderRadius,
				0,
				0
			];
			else this.headRadius = isGantt ? [
				borderRadius,
				0,
				0,
				borderRadius
			] : borderRadius;
		};
		_proto.collectGroupLevelBackground = function collectGroupLevelBackground() {
			var groupCount = this.dataUtil.getGroupFields().length;
			if (groupCount === 0) {
				this.groupLevelBackgrounds.clear();
				return;
			}
			var { normalBackground, lightCanvasBackground } = style.color;
			if (groupCount === 1) this.groupLevelBackgrounds.set(0, [normalBackground]);
			else if (groupCount === 2) {
				this.groupLevelBackgrounds.set(0, [normalBackground]);
				this.groupLevelBackgrounds.set(1, [normalBackground, normalBackground]);
			} else if (groupCount === 3) {
				this.groupLevelBackgrounds.set(0, [normalBackground]);
				this.groupLevelBackgrounds.set(1, [normalBackground, lightCanvasBackground]);
				this.groupLevelBackgrounds.set(2, [
					normalBackground,
					lightCanvasBackground,
					normalBackground
				]);
			}
		};
		_proto.collectGroupFoldStartX = function collectGroupFoldStartX() {
			var groupCount = this.dataUtil.getGroupFields().length;
			if (groupCount === 0) {
				this.groupFoldStarts.clear();
				return;
			}
			var foldIconSize = style.size.iconSmall;
			var indentWidth = this.size.levelIndent * (groupCount - 1);
			var startX = indentWidth + Math.abs(this.size.minOperatorFieldWidth - foldIconSize) / 2;
			if (this.dataUtil.getFrozenFieldCount() === 0 || groupCount === 1) {
				this.groupFoldStarts.set(0, startX);
				this.groupFoldStarts.set(1, startX);
				this.groupFoldStarts.set(2, startX);
				return;
			}
			if (groupCount === 2) {
				this.groupFoldStarts.set(0, this.size.levelIndent);
				this.groupFoldStarts.set(1, startX);
			} else if (groupCount === 3) {
				this.groupFoldStarts.set(0, this.size.levelIndent);
				this.groupFoldStarts.set(1, indentWidth);
				this.groupFoldStarts.set(2, startX);
			}
		};
		return ProfileCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/range.js
function _defineProperties$19(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$19(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$19(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$19(Constructor, staticProps);
	return Constructor;
}
function _inherits$47(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$47(subClass, superClass);
}
function _set_prototype_of$47(o, p) {
	_set_prototype_of$47 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$47(o, p);
}
var import_main$4, RangeCollector;
var init_range = __esmMin((() => {
	init_event();
	import_main$4 = require_main();
	init_utils$2();
	init_storage_key();
	init_binary_search();
	init_storage_sync$1();
	RangeCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$47(RangeCollector, Disposable);
		function RangeCollector(dataUtil, size, columns, rows, state) {
			var _this;
			var _a;
			_this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.size = size;
			_this.columns = columns;
			_this.rows = rows;
			_this.state = state;
			_this.scrollTop = 0;
			_this.scrollLeft = 0;
			_this.frozenColumns = [];
			_this.startColumnIndex = 0;
			_this.endColumnIndex = 0;
			_this.startRowIndex = 0;
			_this.endRowIndex = 0;
			_this.visibleRecordIds = [];
			_this.onRangeChangeEmitter = new Emitter();
			_this.onScrollEmitter = _this._register(new Emitter());
			_this.getColumnX = (columnIndex) => {
				var _a;
				return (((_a = _this.columns.getInfos().get(columnIndex)) === null || _a === void 0 ? void 0 : _a.x) || 0) - _this.size.activityStartX;
			};
			_this.getRowY = (rowIndex) => {
				var _a;
				return ((_a = _this.rows.getInfo(rowIndex)) === null || _a === void 0 ? void 0 : _a.y) || 0;
			};
			_this.onRangeChange = _this._register(_this.onRangeChangeEmitter).event;
			_this.onScroll = _this.onScrollEmitter.event;
			if (!((_a = getScrollConfig(dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.notReuseScrollPosition)) {
				var positionKey = _this.dataUtil.isGantt() ? GridStorageType.GridInGanttPosition : GridStorageType.Position;
				var [scrollTop, scrollLeft] = JSON.parse(getStorageValue(_this.dataUtil.getContext(), positionKey) || "[]");
				if (scrollTop) _this.scrollTop = scrollTop;
				if (scrollLeft) _this.scrollLeft = scrollLeft;
			}
			return _this;
		}
		var _proto = RangeCollector.prototype;
		_proto.updateScrollLeft = function updateScrollLeft(scrollLeft) {
			this.setScrollPosition({ scrollLeft });
			this.savePosition();
		};
		_proto.updateScrollTop = function updateScrollTop(scrollTop) {
			this.setScrollPosition({ scrollTop });
			this.savePosition();
		};
		_proto.clearVisibleRecordIds = function clearVisibleRecordIds() {
			this.visibleRecordIds = [];
		};
		_proto.addVisibleRecordId = function addVisibleRecordId(recordId) {
			if (!this.visibleRecordIds.includes(recordId)) this.visibleRecordIds.push(recordId);
		};
		_proto.getVisibleRecordIds = function getVisibleRecordIds() {
			return this.visibleRecordIds;
		};
		_proto.collect = function collect() {
			this.frozenColumns = [];
			var iteratorKeys = this.columns.getInfos().keys();
			for (var i = 0; i < this.minColumnIndex; i++) this.frozenColumns.push(iteratorKeys.next().value);
			this.setScrollPosition({
				scrollLeft: this.scrollLeft,
				scrollTop: this.scrollTop
			});
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		/**
		* 遍历当前渲染区间
		* @param layoutHandler 返回 true 中断遍历
		* @param headHandler
		*/ _proto.doRange = function doRange(layoutHandler, headHandler) {
			for (var columnIndex of this.frozenColumns) {
				headHandler === null || headHandler === void 0 || headHandler(columnIndex);
				for (var rowIndex = this.startRowIndex; rowIndex <= this.endRowIndex; rowIndex++) layoutHandler(columnIndex, rowIndex);
			}
			for (var columnIndex1 = this.startColumnIndex; columnIndex1 <= this.endColumnIndex; columnIndex1++) {
				headHandler === null || headHandler === void 0 || headHandler(columnIndex1);
				for (var rowIndex1 = this.startRowIndex; rowIndex1 <= this.endRowIndex; rowIndex1++) layoutHandler(columnIndex1, rowIndex1);
			}
		};
		/**
		* 遍历当前渲染区间的列
		* @param columnHandler
		*/ _proto.doColumnRange = function doColumnRange(columnHandler) {
			for (var columnIndex of this.frozenColumns) if (columnHandler(columnIndex, {
				start: this.startColumnIndex,
				end: this.endColumnIndex
			})) return;
			for (var columnIndex1 = this.startColumnIndex; columnIndex1 <= this.endColumnIndex; columnIndex1++) if (columnHandler(columnIndex1, {
				start: this.startColumnIndex,
				end: this.endColumnIndex
			})) return;
		};
		/**
		* 遍历当前渲染区间的行
		* @param rowHandler
		*/ _proto.doRowRange = function doRowRange(rowHandler) {
			for (var rowIndex = this.startRowIndex; rowIndex <= this.endRowIndex; rowIndex++) if (rowHandler(rowIndex, {
				start: this.startRowIndex,
				end: this.endRowIndex
			})) return;
		};
		_proto.getRowRange = function getRowRange() {
			return {
				start: this.startRowIndex,
				end: this.endRowIndex
			};
		};
		_proto.getColumnRange = function getColumnRange() {
			return {
				start: this.startColumnIndex,
				end: this.endColumnIndex
			};
		};
		_proto.getFrozenColumnRange = function getFrozenColumnRange() {
			return {
				start: this.frozenColumns[0],
				end: this.frozenColumns[this.frozenColumns.length - 1]
			};
		};
		_proto.getVisibleColumnRange = function getVisibleColumnRange() {
			return {
				start: this.frozenColumns[1],
				end: this.endColumnIndex
			};
		};
		_proto.savePosition = function savePosition() {
			var _a;
			if ((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.notReuseScrollPosition) return;
			if (this.dataUtil.isGantt()) {
				setStorageValue(this.dataUtil.getContext(), GridStorageType.GridInGanttPosition, JSON.stringify([this.scrollTop, this.scrollLeft]));
				return;
			}
			setStorageValue(this.dataUtil.getContext(), GridStorageType.Position, JSON.stringify([this.scrollTop, this.scrollLeft]));
		};
		_proto.restorePosition = function restorePosition() {
			var _a;
			if ((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.notReuseScrollPosition) return;
			var [scrollTop, scrollLeft] = JSON.parse(getStorageValue(this.dataUtil.getContext(), GridStorageType.Position) || "[]");
			this.setScrollPosition({
				scrollLeft,
				scrollTop
			});
		};
		_proto.getScrollStatus = function getScrollStatus() {
			return {
				x: this.scrollLeft,
				y: this.scrollTop,
				isTop: this.scrollTop < 1,
				isBottom: this.scrollTop >= this.maxScrollTop
			};
		};
		_proto.updateColumnRange = function updateColumnRange() {
			this.startColumnIndex = binarySearch(this.scrollLeft, this.minColumnIndex + 1, this.maxColumnIndex, this.getColumnX);
			this.calcEndColumnIndex();
			this.onRangeChangeEmitter.fire({ column: this.getColumnRange() });
		};
		_proto.updateRowRange = function updateRowRange() {
			this.startRowIndex = binarySearch(this.scrollTop, 0, this.maxRowIndex, this.getRowY);
			this.calcEndRowIndex();
			this.onRangeChangeEmitter.fire({ row: this.getRowRange() });
		};
		_proto.calcEndColumnIndex = function calcEndColumnIndex() {
			var endX = this.size.activityStartX + this.size.activityViewWidth;
			this.endColumnIndex = this.startColumnIndex;
			while (this.endColumnIndex < this.maxColumnIndex) {
				var columnInfo = this.columns.getInfos().get(this.endColumnIndex);
				if (!columnInfo || columnInfo.x + columnInfo.width - this.scrollLeft > endX) break;
				this.endColumnIndex += 1;
			}
			this.endColumnIndex = Math.min(this.endColumnIndex, this.maxColumnIndex);
		};
		_proto.calcEndRowIndex = function calcEndRowIndex() {
			var endY = this.size.activityStartY + this.size.activityViewHeight;
			this.endRowIndex = this.startRowIndex;
			while (this.endRowIndex < this.maxRowIndex) {
				var rowInfo = this.rows.getInfo(this.endRowIndex);
				if (!rowInfo || rowInfo.y + rowInfo.height - this.scrollTop > endY) break;
				this.endRowIndex += 1;
			}
			this.endRowIndex = Math.min(this.endRowIndex, this.maxRowIndex);
		};
		_proto.setScrollPosition = function setScrollPosition(position) {
			var { scrollTop, scrollLeft } = position;
			if (typeof scrollLeft !== "undefined") {
				this.scrollLeft = Math.min(Math.max(scrollLeft, 0), this.maxScrollLeft);
				this.updateColumnRange();
			}
			if (typeof scrollTop !== "undefined") {
				this.scrollTop = Math.min(Math.max(scrollTop, 0), this.maxScrollTop);
				this.updateRowRange();
			}
			this.onScrollEmitter.fire();
		};
		_create_class$19(RangeCollector, [
			{
				key: "maxScrollTop",
				get: function() {
					return Math.max(0, this.size.scrollHeight - this.size.activityViewHeight);
				}
			},
			{
				key: "maxScrollLeft",
				get: function() {
					return Math.max(0, this.size.scrollWidth - this.size.activityViewWidth);
				}
			},
			{
				key: "minColumnIndex",
				get: function() {
					return this.state.getColumnFrozenCount();
				}
			},
			{
				key: "maxColumnIndex",
				get: function() {
					return this.columns.getInfos().size - 1;
				}
			},
			{
				key: "maxRowIndex",
				get: function() {
					return this.rows.rowCount - 1;
				}
			}
		]);
		return RangeCollector;
	}(import_main$4.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/size.js
function _defineProperties$18(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$18(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$18(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$18(Constructor, staticProps);
	return Constructor;
}
function _inherits$46(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$46(subClass, superClass);
}
function _set_prototype_of$46(o, p) {
	_set_prototype_of$46 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$46(o, p);
}
/**
* 计算行高的实际像素值
* @param rhl
* @param size
* @returns
*/ function calcRowHeightPx(rhl) {
	if (!RecordHeightMap.has(rhl)) {
		var maxBreakLines = MaxBreakLines.get(rhl) || 1;
		var multiDelta = maxBreakLines === 1 ? 0 : style.size.cellPadding / (maxBreakLines === 6 ? 1 : 2);
		var contentTakes = maxBreakLines * (style.size.fontSizeNormal + style.size.cellLineSpacing) - multiDelta;
		var paddingTakes = style.size.cellPadding * 2;
		RecordHeightMap.set(rhl, Math.round(contentTakes + paddingTakes));
	}
	return RecordHeightMap.get(rhl) || 0;
}
function getMinOperatorWidth(recordCount) {
	var _a, _b;
	var minOperatorFieldWidth = ua.isMobile ? 10 : 50;
	var customMinOperatorFieldWidth = (_b = (_a = renderAppConfigService.getConfig()[RenderAppConfigKey.SIZE_CONFIG]) === null || _a === void 0 ? void 0 : _a[ViewType.GRID]) === null || _b === void 0 ? void 0 : _b.minOperatorFieldWidth;
	if (customMinOperatorFieldWidth !== void 0) minOperatorFieldWidth = customMinOperatorFieldWidth;
	if (recordCount < 1e3) return minOperatorFieldWidth;
	return minOperatorFieldWidth + (String(recordCount).length - 3) * OneNumberCharWidth;
}
var RecordHeightMap, OneNumberCharWidth, SizeCollector;
var init_size = __esmMin((() => {
	init_esm$1();
	init_es$1();
	init_pen();
	init_render_app_config();
	init_index_interface$1();
	init_style();
	init_interface$21();
	init_constants();
	init_storage_key();
	init_size$1();
	init_storage_sync$1();
	RecordHeightMap = /* @__PURE__ */ new Map();
	OneNumberCharWidth = pen.util.measureTextWidth("9", style.size.fontSizeUltraSmall);
	SizeCollector = /* @__PURE__ */ function(BaseSizeCollector) {
		"use strict";
		_inherits$46(SizeCollector, BaseSizeCollector);
		function SizeCollector(dataUtil, state) {
			var _this;
			var _a;
			_this = BaseSizeCollector.call(this, dataUtil) || this;
			_this.dataUtil = dataUtil;
			_this.state = state;
			_this.statHeight = ua.isMobile ? 32 : 45;
			_this.spacingHeight = ua.isMobile ? 8 : 12;
			_this.groupHeadHeight = 40;
			_this.foldIconSize = style.size.iconSmall;
			_this.cellPaddingTop = style.size.cellPadding;
			_this.cellPaddingLeft = style.size.cellPadding;
			_this.cellLineHeight = 1.5;
			_this.minRowHeight = calcRowHeightPx(RowHeightLevel.Short);
			_this.levelIndent = ua.isMobile ? 6 : 12;
			_this.minOperatorFieldWidth = getMinOperatorWidth(_this.isHideRowNumber ? 0 : _this.dataUtil.getDisplayedRecordIds().length);
			_this.minAdditionFieldWidth = 40;
			_this.fieldGroupHeaderHeight = 37;
			_this.fieldHeightGantt = 76;
			_this.fieldIconSize = 14;
			_this.fieldIconMarginLeft = 8;
			_this.fieldTitleMarginLeft = 4 + (ua.isMobile ? style.size.tagMargin : 0);
			_this.fieldTitleMarginRight = 4;
			_this.fieldTopTextMarginBottom = 32;
			_this.$frozenWidth = 0;
			_this.$scrollWidth = 0;
			_this.$scrollHeight = 0;
			_this.$globalWidth = 0;
			_this.$globalHeight = 0;
			_this.rootWidthLocal = 0;
			_this.rootWidthDefaultRate = _this.dataUtil.isGantt() ? .4 : 1;
			_this.rootWidthLocal = Number(JSON.parse((_a = getStorageValue(_this.dataUtil.getContext(), GridStorageType.RootWidth)) !== null && _a !== void 0 ? _a : "0"));
			return _this;
		}
		var _proto = SizeCollector.prototype;
		/**
		* 更新操作列最小宽度
		*/ _proto.patchMinOperatorFieldWidth = function patchMinOperatorFieldWidth(mutations) {
			if (ua.isMobile || this.isHideRowNumber || !(mutations === null || mutations === void 0 ? void 0 : mutations.some((mutation) => mutation.id === MutationId.APPEND_RECORDS_MUTATION))) return;
			this.minOperatorFieldWidth = getMinOperatorWidth(this.dataUtil.getDisplayedRecordIds().length);
		};
		/**
		* 设置本地存储的表格区域宽度
		* @param width
		*/ _proto.setRootWidthStorage = function setRootWidthStorage(width) {
			if (typeof width === "number" && !isNaN(width)) {
				this.rootWidthLocal = width;
				setStorageValue(this.dataUtil.getContext(), GridStorageType.RootWidth, String(width));
			}
		};
		/**
		* 设置冻结列宽度
		* @param width
		* @param override
		*/ _proto.setFrozenWidth = function setFrozenWidth(width, override = false) {
			if (override) this.$frozenWidth = width;
			else this.$frozenWidth += width;
		};
		/**
		* 设置可滚动宽度
		* @param width
		* @param override
		*/ _proto.setScrollWidth = function setScrollWidth(width, override = false) {
			if (override) this.$scrollWidth = width;
			else this.$scrollWidth += width;
		};
		/**
		* 设置可滚动高度
		* @param height
		* @param override
		*/ _proto.setScrollHeight = function setScrollHeight(height, override = false) {
			if (override) this.$scrollHeight = height;
			else this.$scrollHeight += height;
		};
		/**
		* 设置全局宽度
		* @param width
		*/ _proto.setGlobalWidth = function setGlobalWidth(width) {
			this.$globalWidth = width;
		};
		/**
		* 设置全局高度
		* @param height
		*/ _proto.setGlobalHeight = function setGlobalHeight(height) {
			this.$globalHeight = height;
		};
		_create_class$18(SizeCollector, [
			{
				key: "fieldHeightGrid",
				get: function() {
					return this.dataUtil.hasVisibleFieldGroup() ? 37 : 45;
				}
			},
			{
				key: "fieldHeight",
				get: function() {
					if (this.dataUtil.isGantt()) return this.fieldHeightGantt;
					return this.dataUtil.hasVisibleFieldGroup() ? this.fieldGroupHeaderHeight + this.fieldHeightGrid : this.fieldHeightGrid;
				}
			},
			{
				key: "lite",
				get: function() {
					return !!this.dataUtil.getContext().customConfig;
				}
			},
			{
				key: "isHideRowNumber",
				get: function() {
					var _a;
					return !((_a = this.dataUtil.getContext().customConfig) === null || _a === void 0 ? void 0 : _a.layoutConfig[LayoutConfigKey.HIDE_RECORD_SELECT_ICON]);
				}
			},
			{
				key: "globalPaddingLeft",
				get: function() {
					if (this.lite) return 0;
					var { globalPaddingLeft } = this.sizeConfig;
					if (globalPaddingLeft !== void 0) return globalPaddingLeft;
					return ua.isMobile ? 0 : 16;
				}
			},
			{
				key: "globalPaddingRight",
				get: function() {
					if (this.lite) return 0;
					var { globalPaddingRight } = this.sizeConfig;
					if (globalPaddingRight !== void 0) return globalPaddingRight;
					if (ua.isMobile) return 20;
					return this.dataUtil.isGantt() ? 0 : 16;
				}
			},
			{
				key: "globalPaddingTop",
				get: function() {
					var { globalPaddingTop } = this.sizeConfig;
					if (globalPaddingTop !== void 0) return globalPaddingTop;
					return ua.isMobile ? 0 : 1;
				}
			},
			{
				key: "globalPaddingBottom",
				get: function() {
					if (this.lite) return ua.isMobile ? 100 : this.bodyReduceHeight;
					var { globalPaddingBottom } = this.sizeConfig;
					if (globalPaddingBottom !== void 0) return globalPaddingBottom;
					return ua.isMobile ? 100 : 16;
				}
			},
			{
				key: "frozenWidth",
				get: function() {
					return this.$frozenWidth;
				}
			},
			{
				key: "scrollWidth",
				get: function() {
					return this.$scrollWidth;
				}
			},
			{
				key: "scrollHeight",
				get: function() {
					return this.$scrollHeight;
				}
			},
			{
				key: "globalWidth",
				get: function() {
					return this.$globalWidth;
				}
			},
			{
				key: "globalHeight",
				get: function() {
					return this.$globalHeight;
				}
			},
			{
				key: "rootWidth",
				get: function() {
					if (this.state.isHideGrid) return 0;
					var gridWidth = this.rootWidthLocal || this.globalOriginRootWidth * this.rootWidthDefaultRate / this.scale;
					if (this.state.isExporting()) gridWidth = this.globalWidth;
					return Math.ceil(gridWidth);
				}
			},
			{
				key: "ganttRootWidth",
				get: function() {
					return Math.ceil(this.globalOriginRootWidth / this.scale - this.rootWidth);
				}
			},
			{
				key: "rootHeight",
				get: function() {
					return Math.ceil(this.globalOriginRootHeight / this.scale);
				}
			},
			{
				key: "activityStartX",
				get: function() {
					return this.globalPaddingLeft + this.frozenWidth;
				}
			},
			{
				key: "activityStartY",
				get: function() {
					return this.globalPaddingTop + this.fieldHeight;
				}
			},
			{
				key: "activityViewWidth",
				get: function() {
					return this.rootWidth - this.activityStartX;
				}
			},
			{
				key: "ganttActivityViewWidth",
				get: function() {
					return this.globalOriginRootWidth - this.activityStartX;
				}
			},
			{
				key: "activityViewHeight",
				get: function() {
					return this.rootHeight - this.activityStartY;
				}
			},
			{
				key: "globalRect",
				get: function() {
					return {
						x: 0,
						y: 0,
						width: this.rootWidth,
						height: this.rootHeight
					};
				}
			},
			{
				key: "globalViewRect",
				get: function() {
					return {
						x: 0,
						y: 0,
						width: this.globalOriginRootWidth / this.scale,
						height: this.rootHeight
					};
				}
			},
			{
				key: "globalViewBodyRect",
				get: function() {
					return {
						x: 0,
						y: this.activityStartY,
						width: this.globalOriginRootWidth / this.scale,
						height: this.activityViewHeight
					};
				}
			},
			{
				key: "bodyReduceHeight",
				get: function() {
					return this.scrollHeight > this.activityViewHeight && this.dataUtil.getContext().isDashboardLite ? 16 : 0;
				}
			},
			{
				key: "sizeConfig",
				get: function() {
					var _a, _b;
					return (_b = (_a = renderAppConfigService.getConfig()[RenderAppConfigKey.SIZE_CONFIG]) === null || _a === void 0 ? void 0 : _a[ViewType.GRID]) !== null && _b !== void 0 ? _b : {};
				}
			}
		]);
		return SizeCollector;
	}(BaseSizeCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/row.js
function _inherits$45(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$45(subClass, superClass);
}
function _set_prototype_of$45(o, p) {
	_set_prototype_of$45 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$45(o, p);
}
/**
* 将一个范围拆分成多个等长的范围
* 如 [1, 10] 拆分成 [1, 5], [6, 10]
* @param range
* @param unit
* @returns
*/ function splitRange(range, unit) {
	var result = [];
	var start = range[0];
	while (start <= range[1]) {
		var end = Math.min(start + unit - 1, range[1]);
		result.push([start, end]);
		start = end + 1;
	}
	return result;
}
var import_dist$1, import_main$3, RowCollector;
var init_row$1 = __esmMin((() => {
	init_event();
	import_dist$1 = require_dist();
	import_main$3 = require_main();
	init_esm$1();
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_interface$21();
	init_interface$23();
	init_run_group();
	init_size();
	RowCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$45(RowCollector, Disposable);
		function RowCollector(dataUtil, size, state, status) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.size = size;
			_this.state = state;
			_this.status = status;
			_this.rowCount = 0;
			_this.recordCount = 0;
			_this.currentRecordHeight = 0;
			_this.rowInfos = /* @__PURE__ */ new Map();
			_this.indexKeys = [];
			_this.groupAsyncTask = null;
			_this.groupAsyncThreshold = 2e3;
			_this.onRowInfoChangeEmitter = _this._register(new Emitter());
			_this.calcCurrentRecordHeight();
			_this.onRowInfoChange = _this.onRowInfoChangeEmitter.event;
			return _this;
		}
		var _proto = RowCollector.prototype;
		_proto.dispose = function dispose() {
			var _a;
			(_a = this.groupAsyncTask) === null || _a === void 0 || _a.abort();
			Disposable.prototype.dispose.call(this);
		};
		_proto.getTypeRows = function getTypeRows(rowType) {
			return Array.from(this.rowInfos.values()).filter((info) => info.type === rowType);
		};
		_proto.forEachRowInfo = function forEachRowInfo(callback) {
			this.rowInfos.forEach(callback);
		};
		_proto.getRowSize = function getRowSize(type) {
			return this.getRowHeight(type);
		};
		_proto.getRecordSize = function getRecordSize() {
			return this.currentRecordHeight;
		};
		_proto.getRecordRange = function getRecordRange(index) {
			if (index >= this.rowCount) return;
			var rowInfo = this.rowInfos.get(index);
			if (rowInfo && rowInfo.type === RowType.RecordRange) return rowInfo;
		};
		_proto.getInfo = function getInfo(index) {
			if (index >= this.rowCount) return;
			var rowInfo = this.rowInfos.get(index);
			if (rowInfo) {
				if (rowInfo.type === RowType.RecordRange) return this.createRecordRowInfo(rowInfo, index);
				return rowInfo;
			}
			var closestIndex = this.getClosestRecordRangeIndex(index);
			var closestRowInfo = this.rowInfos.get(closestIndex);
			if ((closestRowInfo === null || closestRowInfo === void 0 ? void 0 : closestRowInfo.type) === RowType.RecordRange) return this.createRecordRowInfo(closestRowInfo, index);
		};
		_proto.getInfoByRecordId = function getInfoByRecordId(recordId) {
			if (!recordId) return;
			var recordRangeInfo = this.getTypeRows(RowType.RecordRange).find((info) => info.recordIds.includes(recordId));
			if (recordRangeInfo) return this.createRecordRowInfo(recordRangeInfo, recordRangeInfo.index + recordRangeInfo.recordIds.indexOf(recordId));
			return this.createFakeRecordRowInfo(recordId);
		};
		_proto.isHiddenRow = function isHiddenRow(parentIndex) {
			var parent = parentIndex;
			while (parent > -1) {
				var parentRow = this.rowInfos.get(parent);
				if (!parentRow) break;
				if (parentRow.type === RowType.GroupHead && parentRow.fold) return true;
				parent = parentRow.parent;
			}
			return false;
		};
		_proto.getGlobalBottomStatRowInfo = function getGlobalBottomStatRowInfo() {
			var height = this.getRowSize(RowType.Stat);
			var viewEndY = this.size.rootHeight - this.size.activityStartY;
			return {
				type: RowType.Stat,
				level: 0,
				index: -1,
				parent: -1,
				x: 0,
				y: viewEndY - height,
				height
			};
		};
		_proto.collect = function collect() {
			this.beforeCollect();
			this.collectPresets();
			this.collectRows();
			this.collectPostsets();
			this.afterCollect();
		};
		_proto.patch = function patch(_mutations) {
			this.calcCurrentRecordHeight();
			this.collect();
		};
		_proto.beforeCollect = function beforeCollect() {
			this.rowCount = 0;
			this.recordCount = 0;
			this.indexKeys = [];
			this.rowInfos.clear();
			this.size.setScrollHeight(0, true);
		};
		_proto.afterCollect = function afterCollect() {
			this.size.setScrollHeight(this.size.globalPaddingBottom);
			this.size.setGlobalHeight(this.size.activityStartY + this.size.scrollHeight);
			this.indexKeys = Array.from(this.rowInfos.keys());
		};
		_proto.collectPresets = function collectPresets() {
			var hasStat = this.dataUtil.isFieldStatEnabled();
			var hasGroup = this.dataUtil.hasGroup();
			if (this.dataUtil.isEmpty()) return;
			if (hasStat && !this.dataUtil.isGantt()) this.createRowInfo(RowType.Stat, -1);
			if (hasGroup) this.createRowInfo(RowType.Spacing, -1);
		};
		/**
		* 收集尾部行：分组场景下，在行序列末尾追加 Spacing + GroupStat 行，用于底部吸附显示全局列统计（新视觉）。
		* Spacing 用于与上方分组内容分隔。无分组场景下，全局列统计绘制到 RecordAddWidget（见 record-add.ts），不需要追加。
		*/ _proto.collectPostsets = function collectPostsets() {
			if (ua.isMobile) return;
			if (!this.dataUtil.hasGlobalStat()) return;
			if (!this.dataUtil.hasGroup()) return;
			this.createRowInfo(RowType.Spacing, -1);
			this.createRowInfo(RowType.GroupStat, -1);
		};
		_proto.collectRows = function collectRows() {
			if (ua.isMobile) {
				this.collectFromGroupFlatten();
				if (!this.dataUtil.hasGroup()) this.size.setScrollHeight(this.size.spacingHeight * this.recordCount);
			} else this.collectFromGroupTree();
		};
		_proto.collectFromGroupFlatten = function collectFromGroupFlatten() {
			var groupFlattenInfos = this.dataUtil.getGroupFlatten();
			if (groupFlattenInfos.length) {
				if (groupFlattenInfos.length <= this.groupAsyncThreshold) {
					runGroupFlatten(this.state, this.dataUtil, this.rowInfos, this.createRowInfo.bind(this), groupFlattenInfos);
					return;
				}
				runGroupFlatten(this.state, this.dataUtil, this.rowInfos, this.createRowInfo.bind(this), groupFlattenInfos.slice(0, this.groupAsyncThreshold));
				if (this.groupAsyncTask) this.groupAsyncTask.abort();
				var batchRanges = splitRange([this.groupAsyncThreshold, groupFlattenInfos.length - 1], this.groupAsyncThreshold);
				this.groupAsyncTask = (0, import_dist$1.executeAsync)({
					length: batchRanges.length,
					initialValue: void 0,
					unitCallback: () => {
						var range = batchRanges.shift();
						if (range) {
							runGroupFlatten(this.state, this.dataUtil, this.rowInfos, this.createRowInfo.bind(this), groupFlattenInfos.slice(range[0], range[1]));
							this.onRowInfoChangeEmitter.fire();
						}
					},
					finishCallback: () => {
						this.onRowInfoChangeEmitter.fire();
					}
				});
				this.groupAsyncTask.promise.catch(() => {});
				return;
			}
			this.createRowInfo(RowType.RecordRange, -1, { recordIds: this.dataUtil.getDisplayedRecordIds().slice(0) });
		};
		_proto.collectFromGroupTree = function collectFromGroupTree() {
			var groupTree = this.dataUtil.getGroupTree();
			if (groupTree.length) {
				if (groupTree.length <= this.groupAsyncThreshold) {
					runGroupTree(this.status, this.state, this.rowInfos, this.createRowInfo.bind(this), groupTree, 0);
					return;
				}
				runGroupTree(this.status, this.state, this.rowInfos, this.createRowInfo.bind(this), groupTree.slice(0, this.groupAsyncThreshold), 0);
				if (this.groupAsyncTask) this.groupAsyncTask.abort();
				var batchRanges = splitRange([this.groupAsyncThreshold, groupTree.length - 1], this.groupAsyncThreshold);
				this.groupAsyncTask = (0, import_dist$1.executeAsync)({
					length: batchRanges.length,
					initialValue: void 0,
					unitCallback: () => {
						var range = batchRanges.shift();
						if (range) {
							runGroupTree(this.status, this.state, this.rowInfos, this.createRowInfo.bind(this), groupTree.slice(range[0], range[1]), 0);
							this.onRowInfoChangeEmitter.fire();
						}
					},
					finishCallback: () => {
						this.onRowInfoChangeEmitter.fire();
					}
				});
				this.groupAsyncTask.promise.catch(() => {});
				return;
			}
			if (this.dataUtil.isEmpty()) {
				this.createRowInfo(RowType.RecordAdd, -1);
				return;
			}
			this.createRowInfo(RowType.RecordRange, -1, { recordIds: this.dataUtil.getDisplayedRecordIds().slice(0) });
			this.createRowInfo(RowType.RecordAdd, -1);
		};
		_proto.createRowInfo = function createRowInfo(type, parent, param) {
			var _a, _b, _c;
			if (!!((_a = this.dataUtil.getCustomConfig()) === null || _a === void 0 ? void 0 : _a.layoutConfig[LayoutConfigKey.HIDE_RECORD_ADD]) && type === RowType.RecordAdd) return -1;
			var index = this.rowCount;
			var rowInfo;
			switch (type) {
				case RowType.Record:
					rowInfo = this.createRecordRowInfo(parent);
					this.rowCount += 1;
					this.recordCount += 1;
					break;
				case RowType.RecordRange:
					rowInfo = this.createRecordRangeRowInfo(parent, param);
					this.rowCount += rowInfo.recordIds.length;
					this.recordCount += rowInfo.recordIds.length;
					break;
				case RowType.GroupHead:
					rowInfo = this.createGroupHeadRowInfo(parent, param);
					this.rowCount += 1;
					break;
				default:
					rowInfo = {
						type,
						level: (_c = (_b = this.rowInfos.get(parent)) === null || _b === void 0 ? void 0 : _b.level) !== null && _c !== void 0 ? _c : 0,
						index,
						parent,
						x: this.size.globalPaddingLeft,
						y: this.size.scrollHeight,
						height: this.getRowHeight(type)
					};
					this.rowCount += 1;
			}
			if (type === RowType.Stat && rowInfo.parent === -1 && !ua.isMobile) rowInfo.height = 0;
			if (this.isHiddenRow(parent)) rowInfo.height = 0;
			this.rowInfos.set(index, rowInfo);
			this.size.setScrollHeight(rowInfo.height);
			return index;
		};
		_proto.createRecordRowInfo = function createRecordRowInfo(parent, rowIndex) {
			var _a, _b;
			var recordHeight = this.getRecordSize();
			var parentIndex = typeof parent === "number" ? parent : parent.parent;
			var recordId = "";
			var recordIndex = -1;
			var y = this.size.scrollHeight;
			if (typeof rowIndex === "number" && typeof parent !== "number") {
				var inRangeIndex = rowIndex - parent.index;
				if (parent.height === 0) recordHeight = 0;
				y = parent.y + inRangeIndex * recordHeight;
				if (ua.isMobile && !this.dataUtil.hasGroup() && !this.dataUtil.isGantt()) y += (inRangeIndex + 1) * this.size.spacingHeight;
				recordId = parent.recordIds[inRangeIndex];
				recordIndex = parent.recordCountBefore + rowIndex - parent.index;
			}
			var recordRowInfo = {
				type: RowType.Record,
				level: (_b = (_a = this.rowInfos.get(parentIndex)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0,
				index: rowIndex !== null && rowIndex !== void 0 ? rowIndex : this.rowCount,
				parent: parentIndex,
				x: this.size.globalPaddingLeft,
				y,
				height: recordHeight,
				recordId,
				recordIndex
			};
			var { customConfig } = this.dataUtil.getContext();
			if (customConfig && !customConfig.layoutConfig[LayoutConfigKey.HIDE_RECORD_SELECT_ICON]) {
				var checkboxAlias = getCheckboxIconAlias(this.state.isSelectRecord(recordId));
				recordRowInfo.liteSelectedIcon = pen.config.icon(checkboxAlias, {
					x: recordRowInfo.x + style.size.iconNormal / 2,
					y: recordRowInfo.y + recordRowInfo.height / 2 - style.size.iconNormal / 2,
					width: style.size.iconNormal,
					height: style.size.iconNormal
				});
			}
			return recordRowInfo;
		};
		_proto.createFakeRecordRowInfo = function createFakeRecordRowInfo(recordId) {
			return {
				type: RowType.Record,
				level: Math.max(0, this.dataUtil.getGroupFields().length - 1),
				index: -1,
				x: this.size.globalPaddingLeft,
				y: 0,
				height: 0,
				parent: -1,
				recordId,
				recordIndex: -1
			};
		};
		_proto.createRecordRangeRowInfo = function createRecordRangeRowInfo(parent, param) {
			var _a, _b;
			var recordIds = (param === null || param === void 0 ? void 0 : param.recordIds) || [];
			var recordHeight = this.getRecordSize();
			return {
				type: RowType.RecordRange,
				level: (_b = (_a = this.rowInfos.get(parent)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0,
				index: this.rowCount,
				parent,
				x: this.size.globalPaddingLeft,
				y: this.size.scrollHeight,
				height: recordHeight * recordIds.length,
				recordIds,
				recordCountBefore: this.recordCount
			};
		};
		_proto.createGroupHeadRowInfo = function createGroupHeadRowInfo(parent, param) {
			var _a;
			var headInfo = param === null || param === void 0 ? void 0 : param.headInfo;
			var rowHeight = this.getRowHeight(RowType.GroupHead);
			var rowInfo = {
				type: RowType.GroupHead,
				level: (_a = param === null || param === void 0 ? void 0 : param.level) !== null && _a !== void 0 ? _a : 0,
				index: this.rowCount,
				parent,
				x: this.size.globalPaddingLeft,
				y: this.size.scrollHeight,
				height: rowHeight,
				fold: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.fold) || false,
				count: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.count) || 0,
				path: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.path) || [],
				groupValue: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.groupValue) || null
			};
			if (ua.isMobile) {
				var fontSize = style.size.fontSizeNormal;
				var countText = i18n.t("{{count}}项", { count: rowInfo.count });
				var countTextWidth = pen.util.measureTextWidth(countText, fontSize);
				rowInfo.countText = pen.config.text({
					text: countText,
					x: this.size.rootWidth - countTextWidth - style.size.tagPaddingLeft,
					y: rowInfo.y,
					width: pen.util.measureTextWidth(countText, fontSize),
					height: rowHeight,
					fontSize,
					color: style.color.lightUltraFontColor
				});
			}
			return rowInfo;
		};
		_proto.getRowHeight = function getRowHeight(type) {
			switch (type) {
				case RowType.GroupHead:
				case RowType.GroupAdd: return this.size.groupHeadHeight;
				case RowType.Stat:
				case RowType.GroupStat: return this.size.statHeight;
				case RowType.GroupFoot:
				case RowType.Spacing: return this.size.spacingHeight;
				case RowType.Record:
				case RowType.RecordRange: return this.currentRecordHeight;
				case RowType.RecordAdd: return this.dataUtil.hasGlobalStat() && !this.dataUtil.hasGroup() ? this.size.statHeight : this.size.minRowHeight;
			}
		};
		_proto.calcCurrentRecordHeight = function calcCurrentRecordHeight() {
			this.currentRecordHeight = calcRowHeightPx(this.dataUtil.getRowHeightLevel());
		};
		_proto.getClosestRecordRangeIndex = function getClosestRecordRangeIndex(rowIndex) {
			var left = 0;
			var right = this.indexKeys.length - 1;
			var index = -1;
			while (left <= right) {
				var middle = Math.floor((left + right) / 2);
				if (this.indexKeys[middle] < rowIndex) {
					index = middle;
					left = middle + 1;
				} else right = middle - 1;
			}
			return this.indexKeys[index];
		};
		return RowCollector;
	}(import_main$3.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/structure/state.js
function _defineProperties$17(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$17(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$17(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$17(Constructor, staticProps);
	return Constructor;
}
function _inherits$44(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$44(subClass, superClass);
}
function _set_prototype_of$44(o, p) {
	_set_prototype_of$44 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$44(o, p);
}
function getHiddenCellKey(fieldId, recordId) {
	return `${fieldId}::${recordId}`;
}
var StateCenter;
var init_state = __esmMin((() => {
	init_esm$1();
	init_interface$21();
	init_storage_key();
	init_string_group_path();
	init_state$1();
	init_storage_sync$1();
	StateCenter = /* @__PURE__ */ function(BaseStateCollector) {
		"use strict";
		_inherits$44(StateCenter, BaseStateCollector);
		function StateCenter(dataUtil, rangeModel) {
			var _this = BaseStateCollector.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.rangeModel = rangeModel;
			_this.foldGroups = /* @__PURE__ */ new Set();
			_this.tempFoldGroups = /* @__PURE__ */ new Set();
			_this.highlightInfo = /* @__PURE__ */ new Map();
			_this.highlightActive = {
				fieldId: "",
				recordId: ""
			};
			_this.columnFrozenCount = _this.dataUtil.getFrozenFieldCount() + 1;
			_this.hideGridArea = false;
			_this.addFieldHighlightInfo = "";
			_this.hiddenCells = /* @__PURE__ */ new Set();
			if (ua.isMobile && _this.dataUtil.isGantt()) _this.hideGridArea = true;
			else _this.hideGridArea = JSON.parse(getStorageValue(_this.dataUtil.getContext(), GridStorageType.HideGrid) || "false");
			_this.foldGroups = new Set(JSON.parse(getStorageValue(_this.dataUtil.getContext(), GridStorageType.FoldGroup) || "[]"));
			return _this;
		}
		var _proto = StateCenter.prototype;
		/**
		* 获取操作列数
		*/ _proto.getOperatorFieldNum = function getOperatorFieldNum() {
			var { customConfig } = this.dataUtil.getContext();
			return (customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_OPERATOR_FIELD]) ? 0 : 1;
		};
		/**
		* 保存状态信息到本地存储
		*/ _proto.saveState = function saveState() {
			setStorageValue(this.dataUtil.getContext(), GridStorageType.FoldGroup, JSON.stringify(Array.from(this.foldGroups)));
		};
		_proto.setGroupFoldState = function setGroupFoldState(groupPath, fold) {
			var path = stringifyGroupPath(groupPath);
			if (fold) this.foldGroups.add(path);
			else this.foldGroups.delete(path);
		};
		_proto.clearGroupFold = function clearGroupFold() {
			this.foldGroups.clear();
		};
		_proto.getFoldGroup = function getFoldGroup() {
			return this.foldGroups;
		};
		_proto.setTempGroupFold = function setTempGroupFold(groupPath) {
			var path = stringifyGroupPath(groupPath);
			this.tempFoldGroups.add(path);
		};
		_proto.clearTempGroupFoldState = function clearTempGroupFoldState() {
			this.tempFoldGroups.clear();
		};
		_proto.isGroupFold = function isGroupFold(groupPath) {
			if (this.tempFoldGroups.size) return this.tempFoldGroups.has(stringifyGroupPath(groupPath));
			return this.foldGroups.has(stringifyGroupPath(groupPath));
		};
		/**
		* 是否所有顶层分组都处于折叠态。
		*
		* 语义：顶层分组全部折叠即视为「全部折叠」——顶层折叠后其所有子分组 / 记录都不可见，
		* 无需再判断更深层级。当前无分组时返回 false。
		*
		* 顶层分组由 `getGroupFlatten()`（叶子分组，携带完整 path）按 `path[0]` 去重得到。
		*/ _proto.isAllGroupFold = function isAllGroupFold() {
			var _a;
			var flatten = this.dataUtil.getGroupFlatten();
			var seen = /* @__PURE__ */ new Set();
			for (var info of flatten) {
				var top = (_a = info.path) === null || _a === void 0 ? void 0 : _a[0];
				if (top === void 0) continue;
				var key = stringifyGroupPath([top]);
				if (seen.has(key)) continue;
				seen.add(key);
				if (!this.isGroupFold([top])) return false;
			}
			return seen.size > 0;
		};
		_proto.isSelectAll = function isSelectAll() {
			var selection = this.rangeModel.getCurrentSelection();
			if (!selection.isRowSelection()) return false;
			if (this.rowCount < 1) return false;
			return selection.isRangeInSelection({
				startRow: 0,
				endRow: this.rowCount - 1
			});
		};
		_proto.setAllSelect = function setAllSelect(isSelect) {
			if (isSelect) this.rangeModel.selectRow({
				startRow: 0,
				endRow: this.rowCount - 1
			});
			else this.rangeModel.resetSelection();
		};
		_proto.isSelectRecord = function isSelectRecord(recordId) {
			var rowIndex = this.getRecordIndex(recordId);
			if (rowIndex < 0) return false;
			return this.isSelectRowIndex(rowIndex);
		};
		_proto.isSelectRowIndex = function isSelectRowIndex(rowIndex) {
			var selection = this.rangeModel.getCurrentSelection();
			if (!selection.isRowSelection()) return false;
			return selection.isRangeInSelection({
				startRow: rowIndex,
				endRow: rowIndex
			});
		};
		_proto.isSelectedField = function isSelectedField(fieldId) {
			var columnIndex = this.getFieldIndex(fieldId);
			if (columnIndex < 0) return false;
			var selection = this.rangeModel.getCurrentSelection();
			if (!selection.isColumnSelection()) return false;
			return selection.isRangeInSelection({
				startColumn: columnIndex,
				endColumn: columnIndex
			});
		};
		_proto.addSelectRecord = function addSelectRecord(startRecordId, endRecordId) {
			var rowStart = this.getRecordIndex(startRecordId);
			var rowEnd = endRecordId ? this.getRecordIndex(endRecordId) : rowStart;
			if (rowStart < 0 || rowEnd < 0) return;
			if (rowEnd < rowStart) [rowEnd, rowStart] = [rowStart, rowEnd];
			this.rangeModel.selectRow({
				startRow: rowStart,
				endRow: rowEnd
			});
		};
		_proto.removeSelectRecord = function removeSelectRecord(recordId) {
			var rowIndex = this.getRecordIndex(recordId);
			if (rowIndex < 0) return;
			this.rangeModel.unselectRow({
				startRow: rowIndex,
				endRow: rowIndex
			});
		};
		_proto.toggleSelectRecord = function toggleSelectRecord(recordId) {
			if (this.isSelectRecord(recordId)) this.removeSelectRecord(recordId);
			else this.addSelectRecord(recordId);
		};
		_proto.clearHighlight = function clearHighlight() {
			this.highlightInfo.clear();
			this.highlightActive = {
				fieldId: "",
				recordId: ""
			};
		};
		_proto.setHighlightInfos = function setHighlightInfos(info) {
			var recordMap = this.highlightInfo.get(info.recordId) || /* @__PURE__ */ new Map();
			recordMap.set(info.fieldId, info);
			this.highlightInfo.set(info.recordId, recordMap);
		};
		_proto.getHighlightRecordInfo = function getHighlightRecordInfo(recordId) {
			return this.highlightInfo.get(recordId);
		};
		_proto.setHighlightActive = function setHighlightActive(info) {
			var _a;
			this.highlightActive = Object.assign(Object.assign({}, info), { fieldId: (_a = info.fieldId) !== null && _a !== void 0 ? _a : "" });
		};
		_proto.getHighlightActive = function getHighlightActive() {
			return this.highlightActive;
		};
		_proto.setColumnFrozenCount = function setColumnFrozenCount(count) {
			this.columnFrozenCount = count;
		};
		_proto.getColumnFrozenCount = function getColumnFrozenCount() {
			return this.columnFrozenCount;
		};
		_proto.toggleHideGrid = function toggleHideGrid() {
			this.hideGridArea = !this.hideGridArea;
			setStorageValue(this.dataUtil.getContext(), GridStorageType.HideGrid, String(this.hideGridArea));
		};
		/**
		* 设置添加列按钮高亮信息
		*/ _proto.setAddFieldHighlightInfo = function setAddFieldHighlightInfo(info) {
			this.addFieldHighlightInfo = info;
		};
		/**
		* 设置添加列按钮高亮信息
		*/ _proto.getAddFieldHighlightInfo = function getAddFieldHighlightInfo() {
			return this.addFieldHighlightInfo;
		};
		/**
		* 标记一个单元格在当前交互中不渲染内容（如进度条拖拽）
		* 交互结束后需调用 removeHiddenCell 清除
		*/ _proto.setHiddenCell = function setHiddenCell(fieldId, recordId) {
			this.hiddenCells.add(getHiddenCellKey(fieldId, recordId));
		};
		/** 取消单元格的"不渲染内容"标记 */ _proto.removeHiddenCell = function removeHiddenCell(fieldId, recordId) {
			this.hiddenCells.delete(getHiddenCellKey(fieldId, recordId));
		};
		/** 判断单元格是否处于"不渲染内容"状态 */ _proto.isHiddenCell = function isHiddenCell(fieldId, recordId) {
			if (this.hiddenCells.size === 0) return false;
			return this.hiddenCells.has(getHiddenCellKey(fieldId, recordId));
		};
		_proto.getRecordIndex = function getRecordIndex(recordId) {
			return this.dataUtil.getRecordIndexFromVisibleRecordIds(recordId);
		};
		_proto.getFieldIndex = function getFieldIndex(fieldId) {
			return this.dataUtil.getVisibleFieldIds().indexOf(fieldId);
		};
		_create_class$17(StateCenter, [{
			key: "isHideGrid",
			get: function() {
				return this.hideGridArea;
			}
		}, {
			key: "rowCount",
			get: function() {
				return this.dataUtil.getDisplayedRecordIds().length;
			}
		}]);
		return StateCenter;
	}(BaseStateCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/get-addition-field-show-width.js
/**
* 动态计算 additionField 在当前可视区中暴露的宽度，取值范围 [0, additionFieldWidth]。
*
* 背景：
* - 行的完整宽度（未被视口截断）= size.frozenWidth + size.scrollWidth - size.globalPaddingRight - range.scrollLeft
* - innerRectWidth 为 collector.getInnerRect 返回的被视口截断后的实际绘制宽度（含 levelIndent 处理）
* - additionField 始终位于行末尾，水平未滚到最右时可能部分或完全不可见
*
* 该方法用于在依赖「行实际可视宽度减去 additionField 宽度」的场景（右侧边框、
* 行选中态高亮、hover 区域等），避免当 additionField 未在可视区时仍然固定扣减
* additionFieldWidth，造成错位。
*
* 注意：Gantt 视图以及 customConfig 场景下行末不渲染 additionField（见 GridCollector.getRenderFieldIds），
* 此时直接返回 0。
*/ function getAdditionFieldShowWidth({ size, profile, range, dataUtil, innerRectWidth, rowInfo }) {
	if (dataUtil.isGantt() || dataUtil.getContext().customConfig) return 0;
	var afw = profile.additionFieldWidth;
	if (afw <= 0 || innerRectWidth <= 0) return 0;
	var fullRowWidth = size.frozenWidth + size.scrollWidth - size.globalPaddingRight - range.scrollLeft;
	var level = rowInfo && rowInfo.level > 0 ? rowInfo.level : 0;
	var levelIndent = Math.max(0, size.levelIndent * level);
	var additionLeftInRect = fullRowWidth - afw - levelIndent;
	var additionRightInRect = fullRowWidth - levelIndent;
	var visible = Math.min(innerRectWidth, additionRightInRect) - additionLeftInRect;
	return Math.max(0, Math.min(afw, visible));
}
var init_get_addition_field_show_width = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/widget-collector.js
var WidgetCollector, getOffset;
var init_widget_collector = __esmMin((() => {
	init_esm$1();
	init_es();
	init_lib();
	init_pen();
	init_render_app_config();
	init_index_interface$1();
	init_utils$2();
	init_resources();
	init_style();
	init_interface$21();
	init_util_group_value();
	init_interface$23();
	init_get_addition_field_show_width();
	init_get_group_path();
	WidgetCollector = /* @__PURE__ */ function() {
		"use strict";
		function WidgetCollector(dataUtil, state, size, profile, columns, rows, range, contents, status, floatState, getInnerRect, getRowOuterWidth) {
			this.dataUtil = dataUtil;
			this.state = state;
			this.size = size;
			this.profile = profile;
			this.columns = columns;
			this.rows = rows;
			this.range = range;
			this.contents = contents;
			this.status = status;
			this.floatState = floatState;
			this.getInnerRect = getInnerRect;
			this.getRowOuterWidth = getRowOuterWidth;
			this.stickyContext = null;
		}
		var _proto = WidgetCollector.prototype;
		/**
		* 是否支持 GroupHead sticky top。
		* - 返回 true：分组头在滚动时 sticky 吸顶
		* - 返回 false：按以前的流式滚动方式渲染，分组头跟随滚动消失
		*
		* 启用条件：当前视图存在分组，且不是甘特视图
		*/ _proto.isGroupHeadStickyEnabled = function isGroupHeadStickyEnabled() {
			return this.dataUtil.hasGroup() && !this.dataUtil.isGantt();
		};
		/**
		* 该行是否是 GroupHead 并且当前处于 sticky 状态（走 sticky 通道、body 通道应跳过）。
		*/ _proto.isGroupHeadInStickyMode = function isGroupHeadInStickyMode(rowInfo) {
			if (rowInfo.type !== RowType.GroupHead) return false;
			if (!this.isGroupHeadStickyEnabled()) return false;
			return this.computeGroupHeadSticky(rowInfo).isSticking;
		};
		/**
		* 计算一个 GroupHead 的 sticky 状态（递归考虑外层祖先 head 的 sticky 占用）。
		* 规则（详见需求说明）：
		*   阶段A  naturalY >= stickyTopY                 → 正常滚动，isSticking=false
		*   阶段B  naturalY <  stickyTopY 且 anchorY > stickyTopY  → sticky，finalY=stickyTopY
		*   阶段C  anchorY  <= stickyTopY                 → 被尾锚推离，finalY=anchorY；若 finalY<outerOccupyBottom 需要 clipArea
		* 其中：
		*   naturalY = rowInfo.y - scrollTop
		*   anchorY  = stickyEndRow.y - scrollTop - rowInfo.height（对最内层只读场景，stickyEndRow 取 RecordRange 最后一条 Record 的 y，y 使用 rowInfo.y 即可，其 height 对应 RecordRange 中单条 record height，以 anchor 行尾为准不影响判定）
		*   stickyTopY = outerOccupyBottom（祖先 sticky 占用底部，最外层为 0）
		*/ _proto.computeGroupHeadSticky = function computeGroupHeadSticky(rowInfo) {
			if (!this.isGroupHeadStickyEnabled()) return {
				finalY: rowInfo.y - this.range.scrollTop,
				isSticking: false,
				outerOccupyBottom: 0,
				effectiveScrollTop: this.range.scrollTop
			};
			var outerOccupyBottom = this.getOuterOccupyBottom(rowInfo);
			var naturalY1 = rowInfo.y - this.range.scrollTop;
			if (naturalY1 >= outerOccupyBottom) return {
				finalY: naturalY1,
				isSticking: false,
				outerOccupyBottom,
				effectiveScrollTop: this.range.scrollTop
			};
			var anchorY = this.getStickyAnchorY(rowInfo);
			var finalY;
			if (anchorY === void 0 || anchorY > outerOccupyBottom) finalY = outerOccupyBottom;
			else finalY = anchorY;
			var clipArea;
			if (finalY < outerOccupyBottom) {
				var clipY = outerOccupyBottom;
				var clipHeight = finalY + rowInfo.height - outerOccupyBottom;
				clipArea = {
					x: 0,
					y: clipY,
					width: this.size.globalOriginRootWidth || this.size.rootWidth,
					height: Math.max(0, clipHeight)
				};
			}
			return {
				finalY,
				isSticking: true,
				outerOccupyBottom,
				clipArea,
				effectiveScrollTop: rowInfo.y - finalY
			};
		};
		/**
		* 从 rowInfo 出发，沿 parent 链向上查找 GroupHead 祖先，取最近一个 sticky 中祖先的
		* "占用底部"（finalY + height）；无 sticky 祖先则返回 0（表示顶到 bodyLayer 顶部）。
		*/ _proto.getOuterOccupyBottom = function getOuterOccupyBottom(rowInfo) {
			var parentIndex = rowInfo.parent;
			while (parentIndex >= 0) {
				var parent = this.rows.getInfo(parentIndex);
				if (!parent) break;
				if (parent.type === RowType.GroupHead) {
					var parentSticky = this.computeGroupHeadSticky(parent);
					if (parentSticky.isSticking) return parentSticky.finalY + parent.height;
					return 0;
				}
				parentIndex = parent.parent;
			}
			return 0;
		};
		/**
		* 取 sticky 尾锚行的 y（相对 bodyLayer 顶部），结合本 head 的高度换算成
		* "当尾锚贴近 head 时本 head 即将开始离场" 的 anchorY：
		*   anchorY = stickyEndRow.y - scrollTop - head.height
		*
		* - 非最内层：stickyEndIndex 指向 GroupFoot；直接取 rowInfo.y 即可
		* - 最内层有 RecordAdd：stickyEndIndex 指向 RecordAdd；同上
		* - 最内层只读/hide RecordAdd：stickyEndIndex 指向 RecordRange 内最后一条 record 的 row index；
		*   rows.getInfo 会按 RecordRange 反算该 record 的 y，直接用
		*/ _proto.getStickyAnchorY = function getStickyAnchorY(rowInfo) {
			if (rowInfo.stickyEndIndex === void 0) return;
			var endRow = this.rows.getInfo(rowInfo.stickyEndIndex);
			if (!endRow) return;
			return endRow.y - this.range.scrollTop - rowInfo.height;
		};
		/**
		* 设置当前正在 sticky 绘制的 GroupHead 上下文，使 GroupHead 相关 collector 输出按 sticky 位置对齐。
		* 由 MainRenderer.renderStickyGroupHeads 在每个 head 绘制前调用；绘制完成后必须调用 clearStickyContext。
		*/ _proto.setStickyContext = function setStickyContext(context) {
			this.stickyContext = context;
		};
		_proto.clearStickyContext = function clearStickyContext() {
			this.stickyContext = null;
		};
		/**
		* 计算当前所有 sticky GroupHead 共同占用的最底部（相对 bodyLayer 顶部的 y）。
		* 用于 hover 场景裁剪：被 sticky head 遮挡的区域上 hover 时不应渲染到该条带内。
		*
		* 实现：遍历所有 GroupHead，取 isSticking 为 true 的 head 中 (finalY + height) 的最大值。
		* 若无 sticky head 或未启用，返回 0（表示无占用）。
		*/ _proto.getStickyOccupyBottom = function getStickyOccupyBottom() {
			if (!this.isGroupHeadStickyEnabled()) return 0;
			var occupyBottom = 0;
			this.rows.forEachRowInfo((rowInfo) => {
				if (rowInfo.type !== RowType.GroupHead) return;
				var stickyInfo = this.computeGroupHeadSticky(rowInfo);
				if (!stickyInfo.isSticking) return;
				var bottom = stickyInfo.finalY + rowInfo.height;
				if (bottom > occupyBottom) occupyBottom = bottom;
			});
			return occupyBottom;
		};
		/**
		* 获取任意行的屏幕 y 坐标（canvas 全局坐标系）：
		* - sticky 态 GroupHead：按 finalY + activityStartY
		* - 其它行：按自然 y（rowInfo.y - scrollTop + activityStartY）
		*
		* 用于 hover/交互场景统一获取"这一行当前在屏幕上画到了哪里"，避免重复判断。
		*/ _proto.getRowScreenY = function getRowScreenY(rowInfo) {
			var { activityStartY } = this.size;
			if (rowInfo.type === RowType.GroupHead && this.isGroupHeadStickyEnabled()) {
				var stickyInfo = this.computeGroupHeadSticky(rowInfo);
				if (stickyInfo.isSticking) return activityStartY + stickyInfo.finalY;
			}
			return activityStartY + rowInfo.y - this.range.scrollTop;
		};
		/**
		* 获取 hover 绘制用的裁剪矩形（屏幕坐标系），避免 hover 内容侵入 sticky GroupHead 可视区
		* 以及底部吸附的 pinned 行（RecordAdd 新视觉 / GroupStat）区域。
		*
		* 顶部规则（与 sticky GroupHead 相关）：
		* - 未启用 sticky / 无任何 sticky head 占用 → 顶部不裁
		* - rowInfo 不是 sticky head → 基线为全量 getStickyOccupyBottom()（所有 sticky 下方）
		* - rowInfo 是 sticky head 本身 → 基线为其 outerOccupyBottom（只裁外层 sticky 区域，
		*   允许在自身范围绘制；覆盖 C 阶段被外层推离时内层仍不会侵入外层）
		*
		* 底部规则（与底部吸附 pinned 行相关）：
		* - 无任何 pinned 行实际吸附 → 底部不裁
		* - rowInfo 本身是 pinned 行（如正在 hover 吸附的 RecordAdd / GroupStat）→ 允许在自身范围绘制，底部不裁
		* - 否则 → 裁掉底部 pinned 行占据的屏幕区域
		*
		* 若顶部/底部都不需要裁剪，返回 undefined。
		*
		* baseRect：可选，裁剪结果会与其求交。未传则默认覆盖整个 globalRect。
		*/ _proto.getStickyHoverClipRect = function getStickyHoverClipRect(rowInfo, baseRect) {
			var occupyBottom = 0;
			if (this.isGroupHeadStickyEnabled()) if (rowInfo.type === RowType.GroupHead) {
				var stickyInfo = this.computeGroupHeadSticky(rowInfo);
				if (stickyInfo.isSticking) occupyBottom = stickyInfo.outerOccupyBottom;
				else occupyBottom = this.getStickyOccupyBottom();
			} else occupyBottom = this.getStickyOccupyBottom();
			var pinnedTopY = this.isPinnedRowInfo(rowInfo) ? Infinity : this.getPinnedOccupyTopY();
			if (occupyBottom <= 0 && !Number.isFinite(pinnedTopY)) return;
			return this.buildBandClipRect(occupyBottom, pinnedTopY, baseRect);
		};
		/**
		* 获取 feature 层（featureLayer）绘制用的裁剪矩形（屏幕坐标系，canvas 全局坐标），
		* 不依赖 rowInfo。所有 feature 的绘制都位于 featureLayer，天然叠在 bodyLayer（含 sticky GroupHead、
		* 底部吸附的 pinned 行）之上，需要统一裁剪以避免 feature 绘制内容侵入这些区域。
		*
		* 裁剪范围：[顶部 sticky 占用之下, 底部 pinned 占用之上]，与 baseRect 求交
		* - 未启用 sticky / 无任何 sticky head 占用 → 顶部不裁
		* - 无任何 pinned 行实际吸附（RecordAdd 新视觉 / GroupStat 都在自然位置跟随滚动）→ 底部不裁
		* - 两者均无 → 返回 undefined（表示无需裁剪）
		*
		* 与 {@link getStickyHoverClipRect} 的区别：
		* - getStickyHoverClipRect 针对 area-interactive 内部 hover 绘制，会对"rowInfo 本身是 sticky head
		*   或 pinned 行"的场景允许在自身范围绘制，适合 hover 态
		* - getStickyFeatureClipRect 不区分 rowInfo，一律按全量占用裁剪，适合 featureLayer
		*   上独立于某一行的 feature 绘制（selection / active-point / collaborator / search-cursor / smart-fill / record-float 等）
		*/ _proto.getStickyFeatureClipRect = function getStickyFeatureClipRect(baseRect) {
			var occupyBottom = this.isGroupHeadStickyEnabled() ? this.getStickyOccupyBottom() : 0;
			var pinnedTopY = this.getPinnedOccupyTopY();
			if (occupyBottom <= 0 && !Number.isFinite(pinnedTopY)) return;
			return this.buildBandClipRect(occupyBottom, pinnedTopY, baseRect);
		};
		/**
		* 计算所有"实际吸附到底部"的 pinned 行在屏幕坐标系下的最小顶部 y，
		* 用作 feature 层/hover 绘制的底部裁剪边界，避免 feature 绘制内容覆盖到底部吸附的 RecordAdd / GroupStat 上。
		*
		* - 若没有任何 pinned 行实际吸附（均在自然位置跟随滚动），返回 Infinity（表示无需底部裁剪）
		* - 否则返回 pinned 行在屏幕坐标系的顶部 y（screen y = activityStartY + pinY），
		*   多行吸附时取最小值（最靠上的一行的 top），裁掉 [y, rootHeight) 这段区域
		*
		* 性能：本方法会被同一帧内多个 feature 文件反复调用（selection / active-point / collaborator /
		* record-float / search-cursor / smart-fill / record-active / hover 等），为避免每次都做
		* 全量 rowInfos 遍历，按帧内稳定的三个量（scrollTop / rootHeight / rowCount）做 memo。
		*/ _proto.getPinnedOccupyTopY = function getPinnedOccupyTopY() {
			var { scrollTop } = this.range;
			var { rootHeight } = this.size;
			var { rowCount } = this.rows;
			var cache = this.pinnedOccupyTopYCache;
			if (cache && cache.scrollTop === scrollTop && cache.rootHeight === rootHeight && cache.rowCount === rowCount) return cache.value;
			var minPinScreenY = Infinity;
			this.rows.forEachRowInfo((rowInfo) => {
				if (!this.isPinnedRowInfo(rowInfo)) return;
				var naturalY = rowInfo.y - scrollTop;
				var pinY = rootHeight - this.size.activityStartY - rowInfo.height - this.size.globalPaddingBottom;
				if (naturalY > pinY) {
					var screenY = this.size.activityStartY + pinY;
					if (screenY < minPinScreenY) minPinScreenY = screenY;
				}
			});
			this.pinnedOccupyTopYCache = {
				scrollTop,
				rootHeight,
				rowCount,
				value: minPinScreenY
			};
			return minPinScreenY;
		};
		/**
		* 构造一条"介于顶部 sticky 占用底部 与 底部 pinned 占用顶部之间"的屏幕裁剪矩形。
		* - occupyBottom：顶部 sticky（GroupHead）向下占用的高度（相对于 activityStartY），0 表示不裁顶部
		* - pinnedTopY：底部 pinned 行占用的顶部屏幕 y，Infinity 表示不裁底部
		* - baseRect：可选底图区域，默认整 globalRect
		*/ _proto.buildBandClipRect = function buildBandClipRect(occupyBottom, pinnedTopY, baseRect) {
			var rect = baseRect !== null && baseRect !== void 0 ? baseRect : this.size.globalRect;
			var baseTop = rect.y;
			var baseBottom = rect.y + rect.height;
			var clipTop = occupyBottom > 0 ? this.size.activityStartY + occupyBottom : baseTop;
			var clipBottom = Number.isFinite(pinnedTopY) ? pinnedTopY : baseBottom;
			var top = Math.max(baseTop, clipTop);
			var bottom = Math.min(baseBottom, clipBottom);
			if (bottom <= top) return {
				x: rect.x,
				y: top,
				width: rect.width,
				height: 0
			};
			return {
				x: rect.x,
				y: top,
				width: rect.width,
				height: bottom - top
			};
		};
		/**
		* 当前生效的 scrollTop：sticky 绘制上下文下使用 effectiveScrollTop，否则使用实际 scrollTop。
		*/ _proto.getEffectiveScrollTop = function getEffectiveScrollTop() {
			var _a, _b;
			return (_b = (_a = this.stickyContext) === null || _a === void 0 ? void 0 : _a.effectiveScrollTop) !== null && _b !== void 0 ? _b : this.range.scrollTop;
		};
		/**
		* 供 GroupHead 相关 collector 使用的 innerRect：sticky 上下文下 y 替换为 finalY 对齐的屏幕 y，
		* x/width/height 与 getInnerRect 一致（仅 y 与 scrollTop 相关）。
		*/ _proto.getGroupHeadInnerRect = function getGroupHeadInnerRect(rowInfo, level) {
			var rect = this.getInnerRect(rowInfo, level);
			if (!this.stickyContext) return rect;
			return Object.assign(Object.assign({}, rect), { y: rowInfo.y - this.stickyContext.effectiveScrollTop });
		};
		/**
		* 计算相对 bodyLayer 的两个矩形相交区域。若无交集（或相交为空），返回 undefined。
		* 用于 sticky clipArea 与原本 clipArea（如 groupValue 的 valueRect 裁剪区）叠加。
		*/ _proto.intersectClipArea = function intersectClipArea(a, b) {
			if (!a) return b;
			if (!b) return a;
			var x = Math.max(a.x, b.x);
			var y = Math.max(a.y, b.y);
			var right = Math.min(a.x + a.width, b.x + b.width);
			var bottom = Math.min(a.y + a.height, b.y + b.height);
			var width = right - x;
			var height = bottom - y;
			if (width <= 0 || height <= 0) return {
				x,
				y,
				width: 0,
				height: 0
			};
			return {
				x,
				y,
				width,
				height
			};
		};
		_proto.otherLevelContentsCollector = function otherLevelContentsCollector(rowInfo, background, level) {
			var innerRect = this.getInnerRect(rowInfo, level);
			var rectConfig = pen.config.rect(Object.assign(Object.assign({}, innerRect), { background }));
			var verticalLineOption = Object.assign({
				x: innerRect.x,
				y: innerRect.y
			}, style.defaultLineConfig);
			return {
				rectConfig,
				verticalLineConfig: pen.config.line(Object.assign(Object.assign({}, verticalLineOption), { points: [
					0,
					0,
					0,
					innerRect.height
				] })),
				horizonLineConfig: pen.config.line(Object.assign(Object.assign({}, verticalLineOption), { points: [
					innerRect.width,
					0,
					innerRect.width,
					innerRect.height
				] }))
			};
		};
		_proto.fieldWidgetDrawStartCollector = function fieldWidgetDrawStartCollector(columnInfo) {
			var rectConfig = pen.config.rect({
				x: columnInfo.x,
				y: columnInfo.y,
				width: this.getRowOuterWidth(),
				height: columnInfo.height,
				background: style.color.normalBackground,
				borderWidth: style.size.borderWidth,
				borderRadius: ua.isMobile ? 0 : this.profile.headRadius
			});
			var fieldIconConfig;
			var verticalLineConfig = void 0;
			var customConfig = this.dataUtil.getCustomConfig();
			if (!(customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_OPERATOR_FIELD])) {
				fieldIconConfig = this.fieldWidgetDrawFieldIconCollector(columnInfo);
				verticalLineConfig = this.fieldWidgetDrawVerticalLineCollector(columnInfo);
			}
			return {
				rectConfig,
				fieldIconConfig,
				verticalLineConfig,
				offsetX: getOffset(columnInfo, this.range).offsetX
			};
		};
		_proto.fieldWidgetDrawBodyCollector = function fieldWidgetDrawBodyCollector(columnInfo) {
			var _a;
			var { isDashboardLite } = this.dataUtil.getContext();
			var drawConfigs = (columnInfo.isSelected || columnInfo.isHover) && !isDashboardLite ? columnInfo.activeDrawConfig : columnInfo.normalDrawConfig;
			var fieldIconConfig = this.fieldWidgetDrawFieldIconCollector(columnInfo);
			var config = void 0;
			if (drawConfigs) {
				var { text, markIcon, aiLoadings, filterIcon, rightIcon } = drawConfigs;
				config = {
					text,
					markIcon,
					aiLoadings,
					filterIcon,
					rightIcon,
					topText: columnInfo.topText
				};
			}
			var { customConfig } = this.dataUtil.getContext();
			var hideFieldAdd = customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_FIELD_ADD];
			var verticalLineConfig = void 0;
			if (!(columnInfo.isLast && hideFieldAdd)) verticalLineConfig = this.fieldWidgetDrawVerticalLineCollector(columnInfo);
			var colHeaderFillColor = columnInfo.isField ? this.dataUtil.getColHeaderBackgroundColor(columnInfo.id) : void 0;
			var colHeaderFillColorRectConfig = colHeaderFillColor ? pen.config.rect({
				x: columnInfo.x + style.size.borderWidth,
				y: columnInfo.y + style.size.borderWidth,
				width: columnInfo.width - style.size.borderWidth * 2,
				height: columnInfo.height - style.size.borderWidth * 2,
				background: colHeaderFillColor,
				level: Level.L1
			}) : void 0;
			return {
				config,
				fieldIconConfig,
				verticalLineConfig,
				colHeaderFillColorRectConfig,
				isDrawEndField: columnInfo.isField,
				drawEndTextConfig: (_a = columnInfo.normalDrawConfig) === null || _a === void 0 ? void 0 : _a.text,
				offsetX: getOffset(columnInfo, this.range).offsetX
			};
		};
		/**
		* 编组头绘制配置。按每个编组一次调用，返回：
		* - 背景矩形（跨编组全宽）
		* - 编组名文本
		* - 底部水平分割线（编组头与字段头之间的横线）
		* 绘制 y = globalPaddingTop，height = fieldGroupHeaderHeight，宽度 = 组内所有列宽之和。
		*/ _proto.fieldGroupHeaderDrawCollector = function fieldGroupHeaderDrawCollector(columnInfo) {
			var rect = columnInfo.fieldGroupRect;
			if (!rect || !columnInfo.fieldGroupId) return;
			var rectConfig = pen.config.rect({
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height,
				background: style.color.normalBackground,
				borderWidth: style.size.borderWidth,
				borderColor: style.color.normalBorderColor
			});
			var groupFillColor = this.dataUtil.getColHeaderBackgroundColor(columnInfo.id);
			return {
				rectConfig,
				groupFillColorRectConfig: groupFillColor ? pen.config.rect({
					x: rect.x + style.size.borderWidth,
					y: rect.y + style.size.borderWidth,
					width: rect.width - style.size.borderWidth * 2,
					height: rect.height - style.size.borderWidth * 2,
					background: groupFillColor,
					level: Level.L1
				}) : void 0,
				textConfig: pen.config.text({
					text: (columnInfo.fieldGroupName || "").replace(/[\r\n]+/g, ""),
					x: rect.x + this.size.fieldIconMarginLeft,
					y: rect.y + (ua.isWindows ? 2 : 0),
					width: rect.width - this.size.fieldIconMarginLeft * 2,
					height: rect.height,
					color: style.color.normalFontColor,
					align: "center",
					verticalAlign: "middle",
					wrap: "none",
					ellipsis: true
				}),
				bottomLineConfig: pen.config.line({
					x: rect.x,
					y: rect.y + rect.height,
					borderWidth: style.size.borderWidth,
					borderColor: style.color.normalBorderColor,
					points: [
						0,
						0,
						rect.width,
						0
					]
				}),
				offsetX: getOffset(columnInfo, this.range).offsetX
			};
		};
		_proto.groupAddWidgetDrawStartCollector = function groupAddWidgetDrawStartCollector(columnInfo, rowInfo) {
			var { offsetY } = getOffset(columnInfo, this.range);
			if (rowInfo.parent !== -1) return {
				rectConfig: void 0,
				iconConfig: void 0,
				offsetY: void 0
			};
			var rect = {
				x: columnInfo.x,
				y: rowInfo.y,
				width: this.getRowOuterWidth(),
				height: rowInfo.height
			};
			var { borderRadius } = style.size;
			var rectConfig = pen.config.rect(Object.assign(Object.assign(Object.assign({}, rect), style.defaultLineConfig), {
				background: style.color.normalBackground,
				borderRadius: this.dataUtil.isGantt() ? [
					borderRadius,
					0,
					0,
					borderRadius
				] : borderRadius
			}));
			var iconSize = 14;
			return {
				rectConfig,
				iconConfig: pen.config.icon(NormalIconAlias.GROUPBY, {
					x: rect.x + (this.profile.operatorFieldWidth - iconSize) / 2,
					y: rect.y + (rect.height - iconSize) / 2,
					width: iconSize,
					height: iconSize,
					opacity: this.status.getShouldDisableGroupInsert() ? .1 : .3
				}),
				offsetY
			};
		};
		_proto.groupAddWidgetDrawBodyCollector = function groupAddWidgetDrawBodyCollector(columnInfo, rowInfo) {
			var { offsetY } = getOffset(columnInfo, this.range);
			if (rowInfo.parent !== -1 || !columnInfo.isFirst) return {
				textConfig: void 0,
				offsetY: void 0
			};
			var shouldDisableGroupInsert = this.status.getShouldDisableGroupInsert();
			return {
				textConfig: pen.config.text({
					x: columnInfo.x + style.size.cellPadding,
					y: rowInfo.y,
					width: this.getRowOuterWidth(),
					height: rowInfo.height,
					fontSize: style.size.fontSizeNormal,
					color: style.color.weakFontColor,
					text: i18n.t("新建分组"),
					opacity: shouldDisableGroupInsert ? .5 : 1
				}),
				offsetY
			};
		};
		_proto.groupFootWidgetDrawStartCollector = function groupFootWidgetDrawStartCollector(rowInfo) {
			var backgrounds = this.profile.groupLevelBackgrounds.get(rowInfo.level);
			if (!backgrounds) return {
				rectConfig: void 0,
				bottomLeftCornerConfig: void 0,
				bottomCornerConfig: void 0
			};
			var isGantt = this.dataUtil.isGantt();
			var innerRect = this.getInnerRect(rowInfo);
			var { borderRadius } = style.size;
			return {
				rectConfig: pen.config.rect(Object.assign(Object.assign({}, innerRect), {
					background: backgrounds[backgrounds.length - 1],
					borderRadius: isGantt ? [
						0,
						0,
						0,
						borderRadius
					] : [
						0,
						0,
						borderRadius,
						borderRadius
					]
				})),
				bottomLeftCornerConfig: isGantt ? pen.config.bottomLeftCorner(innerRect) : void 0,
				bottomCornerConfig: !isGantt ? pen.config.bottomCorner(innerRect) : void 0
			};
		};
		_proto.groupFootWidgetMobileDrawStartCollector = function groupFootWidgetMobileDrawStartCollector(rowInfo) {
			var innerRect = this.getInnerRect(rowInfo);
			var rectOptions = Object.assign(Object.assign({}, innerRect), { width: this.getRowOuterWidth() });
			return {
				rectConfig: pen.config.rect(Object.assign(Object.assign({}, rectOptions), { background: style.color.lightCanvasBackground })),
				lineConfig: pen.config.line({
					x: rectOptions.x,
					y: rectOptions.y,
					points: [
						0,
						rectOptions.height,
						rectOptions.width,
						rectOptions.height
					]
				})
			};
		};
		_proto.groupHeadWidgetMobileDrawStartCollector = function groupHeadWidgetMobileDrawStartCollector(rowInfo) {
			var _a;
			if (!rowInfo.path) return {
				rectConfig: void 0,
				lineConfig: void 0,
				clipArea: void 0
			};
			var innerRect = this.getGroupHeadInnerRect(rowInfo);
			var rectOptions = Object.assign(Object.assign({}, innerRect), {
				width: this.getRowOuterWidth(),
				background: style.color.lightCanvasBackground
			});
			var isFold = rowInfo.fold;
			if (isFold) rectOptions.borderWidth = style.size.borderWidth;
			return {
				rectConfig: pen.config.rect(rectOptions),
				lineConfig: !isFold ? pen.config.line({
					x: rectOptions.x,
					y: rectOptions.y,
					points: [
						0,
						0,
						rectOptions.width,
						0
					]
				}) : void 0,
				clipArea: (_a = this.stickyContext) === null || _a === void 0 ? void 0 : _a.clipArea
			};
		};
		_proto.groupHeadWidgetMobileGroupValueCollector = function groupHeadWidgetMobileGroupValueCollector(columnInfo, rowInfo) {
			var _a;
			var { path: pathArray, height: rowHeight, y: rowY } = rowInfo;
			var { size: arrowSize, margin: arrowMargin } = getFlattenArrowInfo();
			var offsetY = -this.getEffectiveScrollTop();
			var stickyClipArea = (_a = this.stickyContext) === null || _a === void 0 ? void 0 : _a.clipArea;
			this.contents.ensureGroupHeadContent(columnInfo, rowInfo);
			return {
				drawConfigs: pathArray.map((path, index) => {
					var _a;
					var isLastPath = index === pathArray.length - 1;
					var groupPath = pathArray.slice(0, index + 1);
					var groupValueInfo = this.contents.getGroupValueInfo(groupPath);
					if (!groupValueInfo) return null;
					var [valueRect, valueConfigs] = groupValueInfo;
					var deltaY = (rowHeight - valueRect.height) / 2;
					var baseClipArea = Object.assign(Object.assign({}, valueRect), { y: rowY + offsetY + deltaY });
					var clipArea = (_a = this.intersectClipArea(baseClipArea, stickyClipArea)) !== null && _a !== void 0 ? _a : baseClipArea;
					return {
						groupValueConfigs: valueConfigs.map((config) => {
							if ("height" in config) return {
								config: Object.assign(Object.assign({}, config), { y: rowY + (rowHeight - config.height) / 2 }),
								clipArea
							};
							return null;
						}),
						arrowConfig: isLastPath ? null : pen.config.icon(NormalIconAlias.ARROW_RIGHT, {
							x: baseClipArea.x + baseClipArea.width + arrowMargin,
							y: baseClipArea.y + (baseClipArea.height - arrowSize) / 2,
							width: arrowSize,
							height: arrowSize
						})
					};
				}),
				countTextConfig: rowInfo.countText,
				offsetY
			};
		};
		_proto.groupHeadWidgetStateInfoCollector = function groupHeadWidgetStateInfoCollector(columnInfo, rowInfo) {
			var _a, _b;
			var globalStatInfoConfigs = void 0;
			var groupValueInfoConfigs = void 0;
			if (!rowInfo.path) return {
				globalStatInfoConfigs,
				groupValueInfoConfigs
			};
			var offsetX = columnInfo.isFrozen ? 0 : -this.range.scrollLeft;
			var offsetY = -this.getEffectiveScrollTop();
			var stickyClipArea = (_a = this.stickyContext) === null || _a === void 0 ? void 0 : _a.clipArea;
			var globalStatInfos = this.contents.getStatInfo(columnInfo.id, rowInfo.path);
			globalStatInfoConfigs = globalStatInfos === null || globalStatInfos === void 0 ? void 0 : globalStatInfos.map((statInfo) => ({
				statInfo,
				offsetX,
				offsetY,
				clipArea: stickyClipArea
			}));
			var statPadding = globalStatInfos ? style.size.cellPadding : 0;
			if (columnInfo.isFirst) this.contents.ensureGroupHeadContent(columnInfo, rowInfo);
			var groupValueInfo = this.contents.getGroupValueInfo(rowInfo.path);
			if (groupValueInfo && columnInfo.isFirst) {
				var [valueRect, valueConfigs] = groupValueInfo;
				var valueClipArea = Object.assign(Object.assign({}, valueRect), {
					x: valueRect.x + offsetX,
					y: valueRect.y + offsetY,
					width: valueRect.width - statPadding
				});
				var clipArea = (_b = this.intersectClipArea(valueClipArea, stickyClipArea)) !== null && _b !== void 0 ? _b : valueClipArea;
				groupValueInfoConfigs = valueConfigs.map((config) => ({
					config,
					offsetX,
					offsetY,
					clipArea
				}));
			}
			return {
				globalStatInfoConfigs,
				groupValueInfoConfigs
			};
		};
		_proto.groupHeadWidgetDrawFoldIconCollector = function groupHeadWidgetDrawFoldIconCollector(columnInfo, rowInfo) {
			var _a;
			if (!rowInfo) return { iconConfig: void 0 };
			var { foldIconSize } = this.size;
			var foldIconX = columnInfo.x + (this.profile.groupFoldStarts.get(rowInfo.level) || 0);
			var foldIconY = rowInfo.y + (rowInfo.height - foldIconSize) / 2;
			var iconAlias = rowInfo.fold ? NormalIconAlias.DROPDOWN_FOLD : NormalIconAlias.DROPDOWN;
			return {
				iconConfig: pen.config.icon(iconAlias, {
					x: foldIconX,
					y: foldIconY,
					width: foldIconSize,
					height: foldIconSize
				}),
				offsetY: -this.getEffectiveScrollTop(),
				clipArea: (_a = this.stickyContext) === null || _a === void 0 ? void 0 : _a.clipArea
			};
		};
		_proto.groupHeadWidgetDrawBackgroundsCollector = function groupHeadWidgetDrawBackgroundsCollector(rowInfo) {
			var _a;
			if (!rowInfo) return [];
			var { fold: isFold, level } = rowInfo;
			var backgrounds = this.profile.groupLevelBackgrounds.get(level);
			if (!(backgrounds === null || backgrounds === void 0 ? void 0 : backgrounds.length)) return [];
			var isGantt = this.dataUtil.isGantt();
			var { borderRadius, borderWidth } = style.size;
			var stickyClipArea = (_a = this.stickyContext) === null || _a === void 0 ? void 0 : _a.clipArea;
			return backgrounds.reduce((acc, background, level) => {
				var _a;
				var isBottomGroup = level === backgrounds.length - 1;
				var innerRect = this.getGroupHeadInnerRect(rowInfo, level);
				if (isFold && isBottomGroup) {
					var rectConfig = pen.config.rect(Object.assign(Object.assign({}, innerRect), {
						y: innerRect.y + borderWidth,
						height: innerRect.height - borderWidth,
						background,
						borderWidth,
						borderRadius: isGantt ? [
							borderRadius,
							0,
							0,
							borderRadius
						] : borderRadius,
						borderColor: style.color.normalBorderColor
					}));
					return [...acc, {
						rectConfig,
						clipArea: stickyClipArea
					}];
				}
				var radius = 0;
				var isUnFoldBottomGroup = !isFold && isBottomGroup;
				if (isUnFoldBottomGroup) radius = isGantt ? [
					borderRadius,
					0,
					0,
					0
				] : [
					borderRadius,
					borderRadius,
					0,
					0
				];
				var baseConfigs = [...acc, {
					rectConfig: pen.config.rect(Object.assign(Object.assign({}, innerRect), {
						background,
						borderRadius: radius,
						level: isBottomGroup ? Level.L1 : void 0
					})),
					clipArea: stickyClipArea
				}];
				if (isBottomGroup) {
					var isShowBottomLine = ((_a = this.rows.getInfo(rowInfo.index + 1)) === null || _a === void 0 ? void 0 : _a.type) === RowType.Record;
					return isUnFoldBottomGroup ? [
						...baseConfigs,
						{
							cornerConfig: isGantt ? pen.config.topLeftCorner(innerRect) : pen.config.topCorner(innerRect),
							clipArea: stickyClipArea
						},
						...isShowBottomLine ? [{
							endLineConfig: this.createBottomLine(innerRect),
							clipArea: stickyClipArea
						}] : []
					] : [
						...baseConfigs,
						{
							startLineConfig: this.createLine(innerRect, 0),
							clipArea: stickyClipArea
						},
						{
							endLineConfig: this.createLine(innerRect, innerRect.width),
							clipArea: stickyClipArea
						}
					];
				}
				return [
					...baseConfigs,
					{
						startLineConfig: this.createLine(innerRect, 0),
						clipArea: stickyClipArea
					},
					{
						endLineConfig: this.createLine(innerRect, innerRect.width),
						clipArea: stickyClipArea
					}
				];
			}, []);
		};
		_proto.recordAddWidgetDrawStartCollector = function recordAddWidgetDrawStartCollector(columnInfo, rowInfo) {
			var innerRect = this.getPinnedInnerRect(rowInfo);
			var { borderRadius } = style.size;
			var isEmpty = this.dataUtil.isEmpty();
			var isGantt = this.dataUtil.isGantt();
			var { levelIndent } = this.size;
			return {
				rectConfig: pen.config.rect(Object.assign(Object.assign({}, innerRect), {
					background: style.color.normalBackground,
					borderRadius: [
						0,
						0,
						isGantt ? 0 : borderRadius,
						borderRadius
					],
					borderWidth: isEmpty ? style.size.borderWidth : void 0,
					level: Level.L1
				})),
				lineConfig: !isEmpty ? pen.config.line({
					x: innerRect.x,
					y: innerRect.y,
					points: [
						0,
						0,
						innerRect.width,
						0
					]
				}) : void 0,
				cornerConfig: isGantt ? pen.config.bottomLeftCorner(innerRect) : pen.config.bottomCorner(innerRect),
				iconConfig: pen.config.icon(NormalIconAlias.ADD, {
					x: innerRect.x + (columnInfo.width - levelIndent * rowInfo.level - style.size.iconSmall) / 2,
					y: innerRect.y + (innerRect.height - style.size.iconSmall) / 2,
					width: style.size.iconSmall,
					height: style.size.iconSmall,
					opacity: this.status.canInsertRecordInGroup ? 1 : style.consts.disabledOpacity
				})
			};
		};
		_proto.recordAddWidgetDrawBodyCollector = function recordAddWidgetDrawBodyCollector(columnInfo, rowInfo) {
			if (!this.shouldDrawGlobalStatInRecordAdd()) return {
				statInfoConfigs: void 0,
				verticalLineConfigs: void 0
			};
			var statInfoConfigs = this.getGlobalStatInfoConfigs(columnInfo, rowInfo);
			if (!statInfoConfigs) return {
				statInfoConfigs: void 0,
				verticalLineConfigs: void 0
			};
			return {
				statInfoConfigs,
				verticalLineConfigs: this.getPinnedCellVerticalLineConfigs(columnInfo, rowInfo)
			};
		};
		_proto.groupStatWidgetDrawStartCollector = function groupStatWidgetDrawStartCollector(rowInfo) {
			var innerRect = this.getPinnedInnerRect(rowInfo);
			var width = this.getRowOuterWidth();
			var rect = {
				x: innerRect.x,
				y: innerRect.y,
				width: width > 0 ? width : 0,
				height: innerRect.height
			};
			var { borderRadius } = style.size;
			return {
				rectConfig: pen.config.rect(Object.assign(Object.assign(Object.assign({}, rect), style.defaultLineConfig), {
					background: style.color.normalBackground,
					borderRadius: this.dataUtil.isGantt() ? [
						borderRadius,
						0,
						0,
						borderRadius
					] : borderRadius,
					level: Level.L1
				})),
				labelTextConfig: pen.config.text({
					text: i18n.t("统计"),
					x: rect.x,
					y: rect.y,
					width: this.profile.operatorFieldWidth,
					height: rect.height,
					color: style.color.weakFontColor,
					fontSize: style.size.fontSizeUltraSmall,
					align: "center",
					verticalAlign: "middle",
					wrap: "none",
					ellipsis: true
				}),
				labelRightLineConfig: pen.config.line({
					x: rect.x,
					y: rect.y,
					borderWidth: style.size.borderWidth,
					points: [
						this.profile.operatorFieldWidth,
						0,
						this.profile.operatorFieldWidth,
						rect.height
					]
				})
			};
		};
		_proto.groupStatWidgetDrawBodyCollector = function groupStatWidgetDrawBodyCollector(columnInfo, rowInfo) {
			var statInfoConfigs = this.getGlobalStatInfoConfigs(columnInfo, rowInfo);
			if (!statInfoConfigs) return {
				statInfoConfigs: void 0,
				verticalLineConfigs: void 0
			};
			return {
				statInfoConfigs,
				verticalLineConfigs: this.getPinnedCellVerticalLineConfigs(columnInfo, rowInfo)
			};
		};
		_proto.shouldDrawGlobalStatInRecordAdd = function shouldDrawGlobalStatInRecordAdd() {
			return this.dataUtil.hasGlobalStat() && !this.dataUtil.hasGroup();
		};
		/**
		* 计算吸附到底部的行的 innerRect（用于 RecordAdd 新视觉及 GroupStat）：
		* - 可视区可容纳时跟随 rowInfo.y 位置（y = rowInfo.y - scrollTop）
		* - 内容超出时吸附到底部（y = rootHeight - activityStartY - rowInfo.height）
		* 注意：该 rect 的 y 是相对于 bodyLayer（不再叠加 scrollTop 偏移），用于 bodyFixedArea 绘制
		*/ _proto.getPinnedInnerRect = function getPinnedInnerRect(rowInfo) {
			var innerRect = this.getInnerRect(rowInfo);
			if (!this.isPinnedRowInfo(rowInfo)) return innerRect;
			var naturalY = rowInfo.y - this.range.scrollTop;
			var pinY = this.size.rootHeight - this.size.activityStartY - rowInfo.height - this.size.globalPaddingBottom;
			return Object.assign(Object.assign({}, innerRect), { y: Math.min(naturalY, pinY) });
		};
		/**
		* 该行是否需要吸附到底部绘制到 bodyFixedArea（内聚到 widget 内部决策吸附行为时使用）
		*/ _proto.isPinnedRowInfo = function isPinnedRowInfo(rowInfo) {
			if (rowInfo.type === RowType.GroupStat) return true;
			if (rowInfo.type === RowType.RecordAdd && this.shouldDrawGlobalStatInRecordAdd()) return true;
			return false;
		};
		_proto.recordWidgetMobileDrawStartCollector = function recordWidgetMobileDrawStartCollector(rowInfo) {
			var innerRect = this.getInnerRect(rowInfo);
			var { profile, rows, dataUtil } = this;
			var baseOptions = Object.assign(Object.assign({}, innerRect), { x: innerRect.x + profile.operatorFieldWidth });
			if (!dataUtil.hasGroup()) return { rectConfig: this.generateNormalRowConfig(baseOptions) };
			var defaultRectConfig = this.generateDefaultGroupConfig(innerRect);
			var nextRow = rows.getInfo(rowInfo.index + 1);
			var prevRow = rows.getInfo(rowInfo.index - 1);
			switch (true) {
				case (prevRow === null || prevRow === void 0 ? void 0 : prevRow.type) === RowType.GroupHead && (nextRow === null || nextRow === void 0 ? void 0 : nextRow.type) === RowType.GroupFoot: return {
					defaultRectConfig,
					singleInGroupConfig: this.generateSingleInGroupConfig(baseOptions)
				};
				case (nextRow === null || nextRow === void 0 ? void 0 : nextRow.type) === RowType.GroupFoot: return {
					defaultRectConfig,
					groupFooterConfig: this.generateBeforeGroupFooterConfig(baseOptions, prevRow)
				};
				case (prevRow === null || prevRow === void 0 ? void 0 : prevRow.type) === RowType.Stat: return {
					defaultRectConfig,
					statRectConfig: this.generateAfterStatConfig(baseOptions)
				};
				case (prevRow === null || prevRow === void 0 ? void 0 : prevRow.type) === RowType.GroupHead: return {
					defaultRectConfig,
					groupHeadConfig: this.generateAfterGroupHeadConfig(baseOptions)
				};
				case (prevRow === null || prevRow === void 0 ? void 0 : prevRow.type) === RowType.Record: return {
					defaultRectConfig,
					recordRectConfig: this.generateAfterRecordConfig(baseOptions)
				};
				default: return { defaultRectConfig };
			}
		};
		_proto.recordWidgetDrawStartCollector = function recordWidgetDrawStartCollector(columnInfo, rowInfo) {
			var _a, _b, _c, _d, _e, _f, _g;
			var { size, dataUtil, state, rows } = this;
			var innerRect = this.getInnerRect(rowInfo);
			var { borderRadius } = style.size;
			var isFirstRecord = rowInfo.recordIndex === 0;
			var isLastRecord = rowInfo.recordIndex === rows.recordCount - 1;
			var isFirstTopCorner = isFirstRecord && !dataUtil.hasGroup() && dataUtil.isFieldStatEnabled();
			var isFirstNoTopLine = isFirstRecord && !dataUtil.hasGroup() && !dataUtil.isFieldStatEnabled();
			var showAllCorner = (_b = ((_a = dataUtil.getCustomConfig()) === null || _a === void 0 ? void 0 : _a.layoutConfig[LayoutConfigKey.SHOW_BORDER_RADIUS]) || !this.status.getPermissionStatus("canInsertRecord", {})) !== null && _b !== void 0 ? _b : false;
			var isLastBottomCorner = isLastRecord && !dataUtil.hasGroup() && showAllCorner;
			var isGroupFirstRecord = ((_c = rows.getInfo(rowInfo.index - 1)) === null || _c === void 0 ? void 0 : _c.type) === RowType.GroupHead;
			var isGroupLastRecord = ((_d = rows.getInfo(rowInfo.index + 1)) === null || _d === void 0 ? void 0 : _d.type) !== RowType.Record;
			var hideBottomBorder = (_e = dataUtil.getCustomConfig()) === null || _e === void 0 ? void 0 : _e.layoutConfig[LayoutConfigKey.HIDE_RECORD_BOTTOM_BORDER];
			var isLastBottomLine = ((_f = dataUtil.getCustomConfig()) === null || _f === void 0 ? void 0 : _f.layoutConfig[LayoutConfigKey.HIDE_RECORD_ADD]) || isLastRecord || isGroupLastRecord && !hideBottomBorder;
			var rectConfig = pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				borderRadius: isFirstTopCorner ? [
					borderRadius,
					borderRadius,
					0,
					0
				] : 0,
				background: style.color.normalBackground,
				level: Level.L1
			}));
			var rowFillColor = dataUtil.getRowHeaderBackgroundColor(rowInfo.recordId);
			var rowFillColorRectConfig = rowFillColor ? pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				width: this.getRowOuterWidth(),
				background: rowFillColor,
				level: Level.L1
			})) : void 0;
			var operatorBackground = "";
			if (state.getHighlightRecordInfo(rowInfo.recordId)) operatorBackground = style.color.searchHighlightBackground;
			var customConfig = dataUtil.getCustomConfig();
			var showOperatorField = !(customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_OPERATOR_FIELD]);
			var backgroundRectConfig;
			if (operatorBackground && !rowInfo.liteSelectedIcon && showOperatorField) backgroundRectConfig = pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				width: size.minOperatorFieldWidth,
				background: operatorBackground,
				level: Level.L1
			}));
			var isShowRecordIndex = rowInfo.recordId !== ((_g = this.floatState.getPosition()) === null || _g === void 0 ? void 0 : _g.recordId) && showOperatorField;
			var { offsetY } = getOffset(columnInfo, this.range);
			var liteSelectedIconConfig;
			var recordIndexConfig;
			if (rowInfo.liteSelectedIcon) liteSelectedIconConfig = {
				iconConfig: rowInfo.liteSelectedIcon,
				offsetY
			};
			else if (isShowRecordIndex) recordIndexConfig = {
				textConfig: pen.config.text({
					x: size.globalPaddingLeft + rowInfo.level * size.levelIndent,
					y: size.cellPaddingTop + rowInfo.y,
					text: `${rowInfo.recordIndex + 1}`,
					width: size.minOperatorFieldWidth,
					height: rowInfo.height - size.cellPaddingTop,
					color: style.color.lightUltraFontColor,
					verticalAlign: "top",
					align: "center"
				}),
				offsetY
			};
			var { lastBottomLineConfig, firstNoTopLineConfig, rightCloseLineConfig } = this.recordWidgetDrawCornerOrLinesCollector({
				innerRect,
				rowInfo,
				isLastBottomCorner,
				isFirstNoTopLine,
				isLastBottomLine,
				showOperatorField,
				isGroupFirstRecord
			});
			var bottomCornerConfig = isLastBottomCorner && (lastBottomLineConfig === null || lastBottomLineConfig === void 0 ? void 0 : lastBottomLineConfig.cornerConfig) ? lastBottomLineConfig.cornerConfig : void 0;
			var bottomLineConfig = !isLastBottomCorner && (lastBottomLineConfig === null || lastBottomLineConfig === void 0 ? void 0 : lastBottomLineConfig.lineConfig) ? lastBottomLineConfig.lineConfig : void 0;
			var { startLineConfig, endLineConfig } = firstNoTopLineConfig;
			return {
				rectConfig,
				rowFillColorRectConfig,
				backgroundRectConfig,
				liteSelectedIconConfig,
				recordIndexConfig,
				lastBottomLineConfig,
				firstNoTopLineConfig,
				bottomCornerConfig,
				bottomLineConfig,
				startLineConfig,
				endLineConfig,
				rightCloseLineConfig
			};
		};
		_proto.recordWidgetDrawBodyCollector = function recordWidgetDrawBodyCollector(columnInfo, rowInfo) {
			var _a, _b;
			var { x } = columnInfo;
			var { y } = rowInfo;
			var cellFillColor = columnInfo.isField ? this.dataUtil.getCellFillColor(rowInfo.recordId, columnInfo.id) : void 0;
			var cellFillColorRectConfig = cellFillColor ? pen.config.rect({
				x: x + style.size.borderWidth,
				y: y + style.size.borderWidth,
				width: columnInfo.width - style.size.borderWidth * 2,
				height: rowInfo.height - style.size.borderWidth * 2,
				background: cellFillColor,
				level: Level.L1
			}) : void 0;
			var cellRectConfig = ((_a = this.state.getHighlightRecordInfo(rowInfo.recordId)) === null || _a === void 0 ? void 0 : _a.get(columnInfo.id)) ? pen.config.rect({
				x: x + style.size.borderWidth,
				y: y + style.size.borderWidth,
				width: columnInfo.width - style.size.borderWidth * 2,
				height: rowInfo.height - style.size.borderWidth * 2,
				background: style.color.searchHighlightBackground,
				level: Level.L1
			}) : void 0;
			var cellInfoConfigs;
			var mobileEmptyContentLineConfig;
			var floatRecordId = (_b = this.floatState.getPosition()) === null || _b === void 0 ? void 0 : _b.recordId;
			var { offsetX, offsetY } = getOffset(columnInfo, this.range);
			var isHiddenCell = this.state.isHiddenCell(columnInfo.id, rowInfo.recordId);
			if (floatRecordId !== rowInfo.recordId && !isHiddenCell) {
				var clipArea = {
					x: x + offsetX,
					y: y + offsetY,
					width: columnInfo.width,
					height: rowInfo.height
				};
				var cellInfos = this.contents.getCellInfo(columnInfo.id, rowInfo.recordId);
				if (cellInfos === null || cellInfos === void 0 ? void 0 : cellInfos.length) cellInfoConfigs = cellInfos.map((info) => ({
					info,
					offsetX,
					offsetY,
					clipArea
				}));
				else if (ua.isMobile) {
					var seizeWidth = 10;
					var startY = rowInfo.height / 2;
					mobileEmptyContentLineConfig = pen.config.line({
						x: clipArea.x + this.size.cellPaddingLeft,
						y: clipArea.y,
						borderWidth: 1,
						borderColor: style.color.weakFontColor,
						points: [
							0,
							startY,
							0 + seizeWidth,
							startY
						]
					});
				}
			}
			var { dataUtil } = this;
			var verticalLineWidth = this.getVerticalLineWidth(columnInfo);
			var mobileContentLineConfig = verticalLineWidth && (!dataUtil.getContext().customConfig || !columnInfo.isLast) ? pen.config.line({
				x,
				y,
				borderWidth: verticalLineWidth,
				points: [
					columnInfo.width,
					0,
					columnInfo.width,
					rowInfo.height
				]
			}) : void 0;
			return {
				cellFillColorRectConfig,
				cellRectConfig,
				cellInfoConfigs,
				mobileEmptyContentLineConfig,
				mobileContentLineConfig,
				offsetX,
				offsetY
			};
		};
		_proto.recordWidgetDrawCornerOrLinesCollector = function recordWidgetDrawCornerOrLinesCollector(param) {
			var { innerRect, rowInfo, isLastBottomCorner, isFirstNoTopLine, isLastBottomLine, showOperatorField, isGroupFirstRecord } = param;
			var { width, height } = innerRect;
			var opw = showOperatorField ? this.size.minOperatorFieldWidth : 0;
			var lastBottomLineConfig = isLastBottomLine ? {
				lineConfig: !isLastBottomCorner ? pen.config.line({
					x: innerRect.x,
					y: innerRect.y,
					points: [
						opw,
						height,
						width,
						height
					]
				}) : void 0,
				cornerConfig: isLastBottomCorner ? pen.config.bottomCorner(innerRect) : void 0
			} : void 0;
			var isFirstNoTopLineConfig = {
				startLineConfig: pen.config.line({
					x: innerRect.x,
					y: innerRect.y,
					points: [
						0,
						0,
						0,
						height,
						opw,
						height,
						opw,
						0
					]
				}),
				endLineConfig: pen.config.line({
					x: innerRect.x,
					y: innerRect.y,
					points: [
						width,
						0,
						width,
						height
					]
				})
			};
			var recordEndX = width - getAdditionFieldShowWidth({
				size: this.size,
				profile: this.profile,
				range: this.range,
				dataUtil: this.dataUtil,
				innerRectWidth: width,
				rowInfo
			});
			var finalPoints = showOperatorField ? [
				opw,
				0,
				opw,
				height,
				0,
				height,
				0,
				0,
				recordEndX,
				0,
				recordEndX,
				height
			] : [
				opw,
				height,
				opw,
				0,
				recordEndX,
				0,
				recordEndX,
				height
			];
			var isNotFirstNoTopLineConfig = {
				startLineConfig: pen.config.line({
					x: innerRect.x,
					y: innerRect.y,
					points: finalPoints
				}),
				endLineConfig: void 0
			};
			var rightCloseLineConfig = pen.config.line({
				x: innerRect.x,
				y: innerRect.y,
				points: isGroupFirstRecord ? [
					recordEndX,
					0,
					width,
					0,
					width,
					height
				] : [
					width,
					0,
					width,
					height
				]
			});
			return {
				lastBottomLineConfig,
				firstNoTopLineConfig: isFirstNoTopLine ? isFirstNoTopLineConfig : isNotFirstNoTopLineConfig,
				rightCloseLineConfig
			};
		};
		_proto.spacingWidgetDrawStartCollector = function spacingWidgetDrawStartCollector(rowInfo) {
			if (rowInfo.parent === -1) return [];
			var backgrounds = this.profile.groupLevelBackgrounds.get(rowInfo.level);
			if (!(backgrounds === null || backgrounds === void 0 ? void 0 : backgrounds.length)) return [];
			return backgrounds.map((background, level) => {
				var innerRect = this.getInnerRect(rowInfo, level);
				return {
					rectConfig: pen.config.rect(Object.assign(Object.assign({}, innerRect), { background })),
					startLineConfig: pen.config.line({
						x: innerRect.x,
						y: innerRect.y,
						points: [
							0,
							0,
							0,
							innerRect.height
						]
					}),
					endLineConfig: pen.config.line({
						x: innerRect.x,
						y: innerRect.y,
						points: [
							innerRect.width,
							0,
							innerRect.width,
							innerRect.height
						]
					})
				};
			});
		};
		_proto.statWidgetMobileDrawStartCollector = function statWidgetMobileDrawStartCollector(columnInfo, rowInfo) {
			var { borderRadius, borderWidth } = style.size;
			var innerRect = this.getInnerRect(rowInfo);
			var rowOuterWidth = this.getRowOuterWidth();
			var isGroupHead = rowInfo.parent === -1;
			var { offsetY } = getOffset(columnInfo, this.range);
			var rectConfig = isGroupHead ? pen.config.rect({
				x: rowInfo.x,
				y: rowInfo.y - borderWidth + offsetY,
				width: rowOuterWidth,
				height: rowInfo.height + borderWidth,
				borderWidth,
				background: style.color.normalBackground,
				borderRadius: ua.isMobile ? 0 : [
					0,
					0,
					borderRadius,
					borderRadius
				]
			}) : pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				width: rowOuterWidth,
				background: style.color.lightCanvasBackground
			}));
			if (isGroupHead) return { rectConfig };
			var rectOptions = Object.assign(Object.assign({}, innerRect), { x: innerRect.x + this.profile.operatorFieldWidth });
			return {
				rectConfig,
				groupRectConfig: pen.config.rect(Object.assign(Object.assign({}, rectOptions), {
					borderRadius: style.size.borderRadius,
					background: style.color.normalBackground
				})),
				cornerConfig: pen.config.topCorner(rectOptions),
				lineConfig: pen.config.line({
					x: rectOptions.x,
					y: rectOptions.y,
					points: [
						0,
						rectOptions.height,
						rectOptions.width,
						rectOptions.height
					]
				})
			};
		};
		_proto.statWidgetDrawStartCollector = function statWidgetDrawStartCollector(rowInfo) {
			var _a;
			if (rowInfo.parent !== -1 && ua.isMobile) return;
			var width = this.size.rootWidth;
			var mainWidth = getMainWidth(this.dataUtil.getContext().getId());
			if (mainWidth) width = Math.min(this.size.rootWidth, Math.max(mainWidth, this.size.activityStartX + this.size.scrollWidth));
			var { borderWidth } = style.size;
			if ((_a = renderAppConfigService.getConfig()[RenderAppConfigKey.STAT_CONFIG]) === null || _a === void 0 ? void 0 : _a.onlyShowTopBorder) {
				if (this.size.rootHeight + this.range.scrollTop === this.size.globalHeight + this.size.statHeight) return [pen.config.rect({
					x: rowInfo.x,
					y: rowInfo.y,
					width,
					height: rowInfo.height,
					background: this.getStatBackground()
				})];
				return [pen.config.line({
					x: rowInfo.x,
					y: rowInfo.y,
					borderWidth,
					points: [
						0,
						0,
						width,
						0
					],
					borderColor: style.color.normalBorderColor
				}), pen.config.rect({
					x: rowInfo.x,
					y: rowInfo.y + borderWidth,
					width,
					height: rowInfo.height - borderWidth,
					background: this.getStatBackground()
				})];
			}
			return [pen.config.rect({
				x: rowInfo.x,
				y: rowInfo.y,
				width,
				height: rowInfo.height,
				borderWidth,
				background: style.color.defaultCanvasBackground
			})];
		};
		_proto.statWidgetDrawBodyCollector = function statWidgetDrawBodyCollector(columnInfo, rowInfo) {
			var isTop = rowInfo.parent === -1;
			var isGlobalBottom = isTop && !ua.isMobile;
			var { borderWidth } = style.size;
			var { offsetX, offsetY } = getOffset(columnInfo, this.range);
			var rectConfig = isGlobalBottom ? pen.config.rect({
				x: columnInfo.x + offsetX - borderWidth,
				y: rowInfo.y + borderWidth,
				width: columnInfo.width + borderWidth,
				height: rowInfo.height - borderWidth,
				background: this.getStatBackground()
			}) : void 0;
			var groupPath = isTop ? [] : getRowInfoGroupPath(rowInfo, this.rows);
			var globalStatInfos = this.contents.getStatInfo(columnInfo.id, groupPath);
			var statInfoConfigs = void 0;
			if (globalStatInfos) {
				var deltaY = 0;
				if (ua.isMobile && !isTop) deltaY = this.rows.getRowSize(RowType.GroupHead) / 2 + rowInfo.height / 2;
				statInfoConfigs = globalStatInfos.map((statInfo) => ({
					statInfo,
					offsetX,
					offsetY: (isGlobalBottom ? rowInfo.y : offsetY) + deltaY - (ua.isMobile ? 0 : style.size.tagMargin)
				}));
			}
			var verticalLineWidth = this.getVerticalLineWidth(columnInfo);
			var lineConfigs = ua.isMobile && verticalLineWidth ? {
				lineConfig: pen.config.line({
					x: columnInfo.x,
					y: columnInfo.y,
					borderWidth: verticalLineWidth,
					points: [
						columnInfo.width,
						0,
						columnInfo.width,
						columnInfo.height - 4 * verticalLineWidth
					]
				}),
				offsetX,
				offsetY
			} : void 0;
			return {
				rectConfig,
				statInfoConfigs,
				lineConfigs
			};
		};
		_proto.getVerticalLineWidth = function getVerticalLineWidth(columnInfo) {
			if (ua.isMobile) {
				var fronzenCount = this.state.getColumnFrozenCount();
				var hasScroll = this.size.scrollWidth > this.size.activityViewWidth;
				var isFronzenEdge = fronzenCount !== 1 && columnInfo.index === fronzenCount - 1;
				return hasScroll && isFronzenEdge ? style.size.borderWidth : 0;
			}
			return style.size.borderWidth;
		};
		_proto.getGlobalStatInfoConfigs = function getGlobalStatInfoConfigs(columnInfo, rowInfo) {
			var globalStatInfos = this.contents.getStatInfo(columnInfo.id, []);
			if (!globalStatInfos) return;
			var innerRect = this.getPinnedInnerRect(rowInfo);
			var offsetX = columnInfo.isFrozen ? 0 : -this.range.scrollLeft;
			var offsetY = innerRect.y;
			return globalStatInfos.map((statInfo) => ({
				statInfo,
				offsetX,
				offsetY
			}));
		};
		_proto.getPinnedCellVerticalLineConfigs = function getPinnedCellVerticalLineConfigs(columnInfo, rowInfo) {
			var innerRect = this.getPinnedInnerRect(rowInfo);
			var verticalLineWidth = this.getVerticalLineWidth(columnInfo);
			var offsetX = columnInfo.isFrozen ? 0 : -this.range.scrollLeft;
			return {
				leftLineConfig: pen.config.line({
					x: columnInfo.x,
					y: innerRect.y,
					borderWidth: verticalLineWidth,
					points: [
						0,
						0,
						0,
						innerRect.height
					]
				}),
				rightLineConfig: pen.config.line({
					x: columnInfo.x,
					y: innerRect.y,
					borderWidth: verticalLineWidth,
					points: [
						columnInfo.width,
						0,
						columnInfo.width,
						innerRect.height
					]
				}),
				offsetX
			};
		};
		_proto.fieldWidgetDrawFieldIconCollector = function fieldWidgetDrawFieldIconCollector(columnInfo) {
			var drawConfigs = columnInfo.isSelected || columnInfo.isHover ? columnInfo.activeDrawConfig : columnInfo.normalDrawConfig;
			return drawConfigs === null || drawConfigs === void 0 ? void 0 : drawConfigs.leftIcon;
		};
		_proto.fieldWidgetDrawVerticalLineCollector = function fieldWidgetDrawVerticalLineCollector(columnInfo) {
			var verticalLineWidth = this.getVerticalLineWidth(columnInfo);
			return {
				verticalLineWidth,
				lineConfig: pen.config.line({
					x: columnInfo.x,
					y: columnInfo.y,
					borderWidth: verticalLineWidth,
					points: [
						columnInfo.width,
						0,
						columnInfo.width,
						columnInfo.height
					]
				})
			};
		};
		_proto.createLine = function createLine(innerRect, xPos) {
			return pen.config.line(Object.assign(Object.assign({
				x: innerRect.x,
				y: innerRect.y
			}, style.defaultLineConfig), { points: [
				xPos,
				0,
				xPos,
				innerRect.height
			] }));
		};
		_proto.createBottomLine = function createBottomLine(innerRect) {
			return pen.config.line({
				x: innerRect.x,
				y: innerRect.y,
				points: [
					0,
					innerRect.height,
					innerRect.width,
					innerRect.height
				]
			});
		};
		_proto.generateNormalRowConfig = function generateNormalRowConfig(baseOptions) {
			return pen.config.rect(Object.assign(Object.assign({}, baseOptions), {
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.borderRadius,
				background: style.color.normalBackground,
				level: Level.L1
			}));
		};
		_proto.generateSingleInGroupConfig = function generateSingleInGroupConfig(baseOptions) {
			return pen.config.rect(Object.assign(Object.assign({}, baseOptions), {
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.borderRadius,
				background: style.color.normalBackground,
				level: Level.L1
			}));
		};
		_proto.generateBeforeGroupFooterConfig = function generateBeforeGroupFooterConfig(baseOptions, prevRow) {
			return {
				rectConfig: pen.config.rect(Object.assign(Object.assign({}, baseOptions), {
					borderRadius: style.size.borderRadius,
					background: style.color.normalBackground,
					level: Level.L1
				})),
				cornerConfig: pen.config.bottomCorner(baseOptions),
				lineConfig: (prevRow === null || prevRow === void 0 ? void 0 : prevRow.type) === RowType.Record ? pen.config.line({
					x: baseOptions.x,
					y: baseOptions.y,
					points: [
						0,
						0,
						baseOptions.width,
						0
					]
				}) : void 0
			};
		};
		_proto.generateAfterStatConfig = function generateAfterStatConfig(baseOptions) {
			return pen.config.rect(Object.assign(Object.assign({}, baseOptions), {
				borderWidth: style.size.borderWidth,
				background: style.color.normalBackground,
				level: Level.L1
			}));
		};
		_proto.generateAfterGroupHeadConfig = function generateAfterGroupHeadConfig(baseOptions) {
			return {
				groupHeadRectConfig: pen.config.rect(Object.assign(Object.assign({}, baseOptions), {
					borderRadius: style.size.borderRadius,
					background: style.color.normalBackground,
					level: Level.L1
				})),
				groupHeadCornerConfig: pen.config.topCorner(baseOptions)
			};
		};
		_proto.generateAfterRecordConfig = function generateAfterRecordConfig(baseOptions) {
			return pen.config.rect(Object.assign(Object.assign({}, baseOptions), {
				borderWidth: style.size.borderWidth,
				background: style.color.normalBackground,
				level: Level.L1
			}));
		};
		_proto.generateDefaultGroupConfig = function generateDefaultGroupConfig(innerRect) {
			return pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				width: this.getRowOuterWidth(),
				background: style.color.lightCanvasBackground
			}));
		};
		_proto.getStatBackground = function getStatBackground() {
			var statConfig = renderAppConfigService.getConfig()[RenderAppConfigKey.STAT_CONFIG];
			return (statConfig === null || statConfig === void 0 ? void 0 : statConfig.backgroundTokenKey) ? getThemeTokenValue(statConfig.backgroundTokenKey) : style.color.defaultCanvasBackground;
		};
		return WidgetCollector;
	}();
	getOffset = (columnInfo, range) => ({
		offsetX: columnInfo.isFrozen ? 0 : -range.scrollLeft,
		offsetY: -range.scrollTop
	});
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/index.js
function _inherits$43(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$43(subClass, superClass);
}
function _set_prototype_of$43(o, p) {
	_set_prototype_of$43 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$43(o, p);
}
var GridCollector;
var init_collector = __esmMin((() => {
	init_esm$1();
	init_performance();
	init_resources();
	init_style();
	init_constants();
	init_content();
	init_data_util();
	init_interface$23();
	init_column$1();
	init_profile();
	init_range();
	init_row$1();
	init_size();
	init_state();
	init_widget_collector();
	init_get_addition_field_show_width();
	init_storage_key();
	init_collector$1();
	init_storage_sync$1();
	GridCollector = /* @__PURE__ */ function(BaseCollector) {
		"use strict";
		_inherits$43(GridCollector, BaseCollector);
		function GridCollector(context, statCounter, rangeModel, groupableStatus, floatState) {
			var _this = BaseCollector.call(this, context) || this;
			_this.context = context;
			_this.statCounter = statCounter;
			_this.rangeModel = rangeModel;
			_this.groupableStatus = groupableStatus;
			_this.floatState = floatState;
			/**
			* 获取整行的外宽度（背景色）
			*/ _this.getRowOuterWidth = () => {
				if (ua.isMobile) return _this.size.rootWidth;
				return _this.getRowOuterWidthWithIndent();
			};
			/**
			* 获取包含一行的内宽度的矩形范围（边框线所包含的）
			*/ _this.getInnerRect = (rowInfo, assignLevel) => {
				var width = _this.getRowOuterWidth();
				var innerRect = {
					x: rowInfo.x,
					y: rowInfo.y - _this.range.scrollTop,
					width: width > 0 ? width : 0,
					height: rowInfo.height
				};
				var level = assignLevel !== null && assignLevel !== void 0 ? assignLevel : rowInfo.level;
				if (level === -1) return innerRect;
				var levelIndent = Math.max(0, _this.size.levelIndent * level);
				innerRect.x += levelIndent;
				if (_this.dataUtil.isGantt()) innerRect.width -= levelIndent;
				else innerRect.width = _this.getRowOuterWidthWithIndent(levelIndent);
				return innerRect;
			};
			/**
			* 获取 additionField 在当前可视区中暴露的宽度，取值范围 [0, additionFieldWidth]。
			* 详见 {@link getAdditionFieldShowWidth}。
			*/ _this.getAdditionFieldShowWidth = (rowInfo) => {
				var innerRectWidth = rowInfo ? _this.getInnerRect(rowInfo).width : _this.getRowOuterWidth();
				return getAdditionFieldShowWidth({
					size: _this.size,
					profile: _this.profile,
					range: _this.range,
					dataUtil: _this.dataUtil,
					innerRectWidth,
					rowInfo
				});
			};
			_this.dataUtil = _this._register(new DataUtil(_this.context, _this.statCounter, groupableStatus));
			_this.state = _this._register(new StateCenter(_this.dataUtil, rangeModel));
			_this.size = _this._register(new SizeCollector(_this.dataUtil, _this.state));
			_this.profile = new ProfileCollector(_this.dataUtil, _this.size);
			_this.columns = new ColumnCollector(_this.dataUtil, _this.size, _this.profile, _this.state, groupableStatus);
			_this.rows = _this._register(new RowCollector(_this.dataUtil, _this.size, _this.state, groupableStatus));
			_this.range = _this._register(new RangeCollector(_this.dataUtil, _this.size, _this.columns, _this.rows, _this.state));
			_this.contents = _this._register(new ContentCollector(_this.dataUtil, _this.columns, _this.rows, _this.size, _this.range, _this.state, _this.profile));
			_this.widgetCollector = new WidgetCollector(_this.dataUtil, _this.state, _this.size, _this.profile, _this.columns, _this.rows, _this.range, _this.contents, groupableStatus, floatState, _this.getInnerRect, _this.getRowOuterWidth);
			return _this;
		}
		var _proto = GridCollector.prototype;
		_proto.handleCollect = function handleCollect() {
			this.size.collect();
			this.profile.collect();
			performanceReport.grid.markColumnCollectInitStart();
			this.columns.collect();
			performanceReport.grid.markColumnCollectInitEnd(this.context);
			performanceReport.grid.markRowCollectInitStart();
			this.rows.collect();
			performanceReport.grid.markRowCollectInitEnd(this.context);
			this.range.collect();
			performanceReport.grid.markContentCollectInitStart();
			this.contents.collect();
			performanceReport.grid.markContentCollectInitEnd(this.context);
			this.updateLocalRootWidth();
		};
		_proto.handlePatch = function handlePatch(mutations) {
			this.size.patchMinOperatorFieldWidth(mutations);
			this.profile.patch(mutations);
			performanceReport.grid.markColumnCollectPatchStart();
			this.columns.patch(mutations);
			performanceReport.grid.markColumnCollectPatchEnd(this.context);
			performanceReport.grid.markRowCollectPatchStart();
			this.rows.patch(mutations);
			performanceReport.grid.markRowCollectPatchEnd(this.context);
			this.range.patch(mutations);
			performanceReport.grid.markContentCollectPatchStart();
			this.contents.patch(mutations);
			performanceReport.grid.markContentCollectPatchEnd(this.context);
			if (this.dataUtil.isGantt()) this.updateLocalRootWidth();
		};
		_proto.handleResize = function handleResize(scale) {
			if (this.state.isExporting()) resourceLoader.refreshLoadingCount();
			if (ua.isMobile || this.state.isExporting()) {
				this.rows.patch();
				this.contents.patch();
			}
			this.size.setScale(scale);
			this.size.patch();
			this.range.patch();
			this.updateLocalRootWidth();
		};
		_proto.getRecordHeight = function getRecordHeight() {
			return this.rows.getRowSize(RowType.Record);
		};
		_proto.getField = function getField(fieldId) {
			var _a;
			return (_a = this.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getFieldByFieldId(fieldId);
		};
		_proto.getFieldWidth = function getFieldWidth(fieldId) {
			return this.columns.getWidth(fieldId);
		};
		_proto.getFieldX = function getFieldX(fieldId) {
			var columnInfo = this.columns.getInfoByFieldId(fieldId);
			if (!columnInfo) return 0;
			var srollWidth = columnInfo.isFrozen ? 0 : this.range.scrollLeft;
			return columnInfo.x - srollWidth;
		};
		/**
		* 获取所有渲染的 fieldIds，包括 operator 和 addition
		*/ _proto.getRenderFieldIds = function getRenderFieldIds() {
			var fieldIds = this.dataUtil.getVisibleFieldIds();
			fieldIds.unshift(OperatorField);
			if (!(this.dataUtil.isGantt() || this.context.customConfig)) fieldIds.push(AdditionField);
			return fieldIds;
		};
		_proto.getRowOuterWidthWithIndent = function getRowOuterWidthWithIndent(levelIndent = 0) {
			var { size, range, dataUtil } = this;
			var radiusTakeWidth = dataUtil.isGantt() ? 0 : style.size.borderRadius;
			var maxDrawableContentWidthInViewport = size.frozenWidth + size.activityViewWidth + radiusTakeWidth;
			var contentMaxWidth = size.frozenWidth + size.scrollWidth - size.globalPaddingRight - range.scrollLeft;
			return Math.min(contentMaxWidth - 2 * levelIndent, maxDrawableContentWidthInViewport);
		};
		_proto.updateLocalRootWidth = function updateLocalRootWidth() {
			if (!this.dataUtil.isGantt()) return;
			var { globalWidth } = this.size;
			var storageRootWidth = Number(getStorageValue(this.context, GridStorageType.RootWidth));
			if (storageRootWidth) this.size.setRootWidthStorage(Math.min(storageRootWidth, globalWidth));
			else if (globalWidth < this.size.rootWidth) this.size.setRootWidthStorage(globalWidth);
		};
		return GridCollector;
	}(BaseCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer-model/index.js
function _inherits$42(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$42(subClass, superClass);
}
function _set_prototype_of$42(o, p) {
	_set_prototype_of$42 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$42(o, p);
}
function getFieldFullVisibleX(columnInfo, collector) {
	var { range, size } = collector;
	if (columnInfo.isFrozen) return;
	if (columnInfo.x - range.scrollLeft < size.activityStartX) return columnInfo.x - size.activityStartX;
	var endX = size.activityStartX + size.activityViewWidth;
	if (columnInfo.x + columnInfo.width - range.scrollLeft > endX) {
		var visibleFieldIds = collector.dataUtil.getVisibleFieldIds();
		if (columnInfo.id === visibleFieldIds[visibleFieldIds.length - 1]) return collector.range.maxScrollLeft;
		var { size: size1, marginEdge } = style.consts.scrollBarStyle;
		var scrollBarTakeWidth = size1 + marginEdge * 2;
		return columnInfo.x + columnInfo.width - endX + scrollBarTakeWidth;
	}
}
function getRecordFullVisibleY(rowInfo, collector) {
	var { range, size, rows, widgetCollector } = collector;
	var { activityStartY } = size;
	var topStickyOccupy = 0;
	if ((widgetCollector === null || widgetCollector === void 0 ? void 0 : widgetCollector.isGroupHeadStickyEnabled()) && rowInfo.type !== RowType.GroupHead) {
		var parentIndex = rowInfo.parent;
		while (parentIndex >= 0) {
			var parent = rows.getInfo(parentIndex);
			if (!parent) break;
			if (parent.type === RowType.GroupHead) topStickyOccupy += parent.height;
			parentIndex = parent.parent;
		}
	}
	var bottomPinnedOccupy = 0;
	if (widgetCollector && !widgetCollector.isPinnedRowInfo(rowInfo)) {
		var pinnedTopY = widgetCollector.getPinnedOccupyTopY();
		if (Number.isFinite(pinnedTopY)) {
			var viewBottomY = activityStartY + size.activityViewHeight;
			bottomPinnedOccupy = Math.max(0, viewBottomY - pinnedTopY);
		}
	}
	if (rowInfo.y + activityStartY - range.scrollTop < activityStartY + topStickyOccupy) return rowInfo.y - topStickyOccupy;
	var endY = activityStartY + size.activityViewHeight - bottomPinnedOccupy;
	if (rowInfo.y + rowInfo.height + activityStartY - range.scrollTop > endY) {
		var { size: scrollBarSize, marginEdge } = style.consts.scrollBarStyle;
		var scrollBarTakeWidth = scrollBarSize + marginEdge * 2;
		return rowInfo.y + rowInfo.height + activityStartY - endY + scrollBarTakeWidth;
	}
}
var import_clamp, import_isEqual, GridRendererModel;
var init_renderer_model = __esmMin((() => {
	import_clamp = /* @__PURE__ */ __toESM(require_clamp());
	import_isEqual = /* @__PURE__ */ __toESM(require_isEqual());
	init_event();
	init_es();
	init_float_state();
	init_range_model();
	init_utils$2();
	init_stat_counter();
	init_groupable_status();
	init_style();
	init_collector();
	init_interface$23();
	init_base_renderer_model();
	init_get_group_path();
	init_fix_scroll_delta();
	GridRendererModel = /* @__PURE__ */ function(BaseRendererModel) {
		"use strict";
		_inherits$42(GridRendererModel, BaseRendererModel);
		function GridRendererModel(context) {
			var _this = BaseRendererModel.call(this, context) || this;
			_this.context = context;
			_this.onDataChangeEmitter = _this._register(new Emitter());
			_this.onRenderModelChangeEmitter = _this._register(new Emitter());
			_this.onDataChange = _this.onDataChangeEmitter.event;
			_this.onRenderModelChange = _this.onRenderModelChangeEmitter.event;
			var activeTable = _this.context.getCurrentTable();
			var activeView = _this.context.getCurrentView();
			_this.status = new GroupableStatus(activeTable, activeView, context.getCore());
			_this.rangeModel = _this._register(new RangeModel(activeTable, activeView));
			_this.statCounter = _this._register(new StatCounter(_this.context));
			_this.floatState = _this._register(new FloatState(_this.context.emitter));
			_this.collector = _this._register(new GridCollector(_this.context, _this.statCounter, _this.rangeModel, _this.status, _this.floatState));
			_this.collector.collect();
			_this._register(_this.floatState.onFloatLayerPositionChange((floatLayerPosition) => {
				_this.context.emitter.service.onFloatLayerPositionChange.fire(floatLayerPosition);
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this.statCounter.register(() => {
				_this.collector.contents.patch([]);
			});
			_this._register(_this.collector.contents.onContentChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.range.onRangeChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.range.onScroll(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.rows.onRowInfoChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			return _this;
		}
		var _proto = GridRendererModel.prototype;
		_proto.getStatus = function getStatus() {
			return this.status;
		};
		_proto.getRangeModel = function getRangeModel() {
			return this.rangeModel;
		};
		_proto.getFloatState = function getFloatState() {
			return this.floatState;
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			var _a, _b;
			var { deltaX, deltaY, offsetX } = scrollInfo;
			var { size, range } = this.collector;
			var isInGrid = offsetX / size.scale <= size.rootWidth;
			var x = fixScrollDelta(deltaX, range.scrollLeft, size.scrollWidth, size.activityViewWidth, (_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.scrollerFactor);
			var y = fixScrollDelta(deltaY, range.scrollTop, size.scrollHeight, size.activityViewHeight, (_b = getScrollConfig(this.context.getId())) === null || _b === void 0 ? void 0 : _b.scrollerFactor);
			if (!x && !y || !isInGrid && !y) return;
			if (isInGrid) range.updateScrollLeft(range.scrollLeft + x);
			range.updateScrollTop(range.scrollTop + y);
		};
		_proto.scrollToX = function scrollToX(scrollLeft) {
			var _a, _b;
			if (((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterHorizontalScroll) && ((_b = this.context.getCurrentView()) === null || _b === void 0 ? void 0 : _b.type) !== ViewType$1.GANTT) {
				var validScrollLeft = (0, import_clamp.default)(scrollLeft, 0, this.collector.range.maxScrollLeft);
				if (validScrollLeft !== this.collector.range.scrollLeft) fireEvent.execute(SmartSheetEventName.INNER_TO_OUTER_VIEWPORT_SCROLL, {
					deltaX: validScrollLeft - this.collector.range.scrollLeft,
					deltaY: 0,
					editorId: this.context.getId()
				});
				return;
			}
			this.collector.range.updateScrollLeft(scrollLeft !== null && scrollLeft !== void 0 ? scrollLeft : 0);
		};
		_proto.scrollToY = function scrollToY(scrollTop) {
			var _a;
			if ((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll) {
				var validScrollTop = (0, import_clamp.default)(scrollTop, 0, this.collector.range.maxScrollTop);
				if (validScrollTop !== this.collector.range.scrollTop) fireEvent.execute(SmartSheetEventName.INNER_TO_OUTER_VIEWPORT_SCROLL, {
					deltaY: validScrollTop - this.collector.range.scrollTop,
					deltaX: 0,
					editorId: this.context.getId()
				});
				return;
			}
			this.collector.range.updateScrollTop(scrollTop !== null && scrollTop !== void 0 ? scrollTop : 0);
		};
		_proto.scrollToVisibility = function scrollToVisibility(cellPosition, delta) {
			var { fieldId = "", recordId = "" } = cellPosition;
			var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
			var rowInfo = this.collector.rows.getInfoByRecordId(recordId);
			var deltaX = (delta === null || delta === void 0 ? void 0 : delta.x) || 0;
			var deltaY = (delta === null || delta === void 0 ? void 0 : delta.y) || 0;
			if (columnInfo) {
				var toX = getFieldFullVisibleX(columnInfo, this.collector);
				if (toX !== void 0) this.scrollToX(toX + deltaX);
				else if (deltaX) this.scrollToX(this.collector.range.scrollLeft + deltaX);
			}
			if (rowInfo) {
				var toY = getRecordFullVisibleY(rowInfo, this.collector);
				if (toY !== void 0) this.scrollToY(toY + deltaY);
				else if (deltaY) this.scrollToY(this.collector.range.scrollTop + deltaY);
			}
		};
		_proto.setTimeline = function setTimeline(timeline) {
			this.timeline = timeline;
		};
		_proto.getTimeLine = function getTimeLine() {
			return this.timeline;
		};
		_proto.setGroupFold = function setGroupFold(option) {
			if (!this.collector.dataUtil.hasGroup()) return;
			var { rows, state, range, contents } = this.collector;
			var { fold, groupKeys } = option;
			var groupHeads = rows.getTypeRows(RowType.GroupHead);
			if (fold) this.resetSelectionIfActivePointInFoldGroups(groupKeys);
			if (!groupKeys) {
				state.clearGroupFold();
				groupHeads.forEach((rowInfo) => {
					var { path } = rowInfo;
					if (path) state.setGroupFoldState(path, fold);
				});
			} else groupHeads.forEach((rowInfo) => {
				var { path } = rowInfo;
				if (path && groupKeys.some((keys) => (0, import_isEqual.default)(keys, path))) state.setGroupFoldState(path, fold);
			});
			rows.patch();
			range.patch();
			contents.patch([]);
			this.onRenderModelChangeEmitter.fire();
		};
		/**
		* 折叠分组前检查：如果当前选区的 ActivePoint 对应记录位于任一被折叠分组（或其子分组）内，则重置选区。
		* groupKeys 为空时表示折叠所有分组，此时任何 ActivePoint 都会被折起来，直接重置。
		*/ _proto.resetSelectionIfActivePointInFoldGroups = function resetSelectionIfActivePointInFoldGroups(groupKeys) {
			var activePoint = this.rangeModel.getCurrentSelection().getActivePoint();
			if (!activePoint) return;
			if (!groupKeys || groupKeys.length === 0) {
				this.rangeModel.resetSelection();
				return;
			}
			var recordId = this.collector.dataUtil.getDisplayedRecordIds()[activePoint.row];
			if (!recordId) return;
			var recordGroupPath = getGroupPathByRecordId(recordId, this.collector);
			if (!recordGroupPath) return;
			if (groupKeys.some((foldPath) => {
				if (recordGroupPath.length < foldPath.length) return false;
				return foldPath.every((key, idx) => key === recordGroupPath[idx]);
			})) this.rangeModel.resetSelection();
		};
		_proto.handleModelChange = function handleModelChange(mutations) {
			this.collector.patch(mutations);
			this.onDataChangeEmitter.fire(mutations);
		};
		return GridRendererModel;
	}(BaseRendererModel);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/get-cell-rect.js
/**
* 获取单元格的位置信息（不包含滚动偏移）
* @param fieldId
* @param recordId
* @returns
*/ function getCellRect(fieldId, recordId, collector) {
	var rowInfo = collector.rows.getInfoByRecordId(recordId);
	var columnInfo = collector.columns.getInfoByFieldId(fieldId);
	if (!rowInfo || !columnInfo) return;
	var { range, size } = collector;
	return {
		x: columnInfo.x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
		y: rowInfo.y + size.activityStartY - range.scrollTop,
		width: columnInfo.width,
		height: rowInfo.height
	};
}
var init_get_cell_rect = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/interface.js
var IGridSelection;
var init_interface$19 = __esmMin((() => {
	init_module();
	IGridSelection = createDecorator("IGridSelection");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/renderer/base.js
function _defineProperties$16(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$16(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$16(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$16(Constructor, staticProps);
	return Constructor;
}
var SelectionType, BaseSelectionRenderer;
var init_base = __esmMin((() => {
	init_pen();
	init_style();
	(function(SelectionType) {
		SelectionType[SelectionType["ROW"] = 0] = "ROW";
		SelectionType[SelectionType["COLUMN"] = 1] = "COLUMN";
		SelectionType[SelectionType["NORMAL"] = 2] = "NORMAL";
	})(SelectionType || (SelectionType = {}));
	BaseSelectionRenderer = /* @__PURE__ */ function() {
		"use strict";
		function BaseSelectionRenderer(frozenGroup, activeGroup, renderer, collector) {
			this.frozenGroup = frozenGroup;
			this.activeGroup = activeGroup;
			this.renderer = renderer;
			this.collector = collector;
		}
		var _proto = BaseSelectionRenderer.prototype;
		_proto.update = function update() {
			this.draw();
			this.clip();
		};
		_proto.mergeRects = function mergeRects(rects) {
			if (this.type === SelectionType.NORMAL) return rects;
			var composeRects = [];
			rects.forEach((rect) => {
				var prevRect = composeRects[composeRects.length - 1];
				if (prevRect) {
					if (this.type === SelectionType.ROW) if (rect.y === prevRect.y + prevRect.height) prevRect.height += rect.height;
					else composeRects.push(rect);
					else if (this.type === SelectionType.COLUMN) if (rect.x === prevRect.x + prevRect.width && rect.y === prevRect.y && rect.height === prevRect.height) prevRect.width += rect.width;
					else composeRects.push(rect);
				} else composeRects.push(rect);
			});
			return composeRects;
		};
		_proto.clipFrozenBoard = function clipFrozenBoard(x, y, width, height) {
			this.frozenGroup.setAttrs({
				x,
				y,
				width,
				height
			});
		};
		_proto.clipActiveBoard = function clipActiveBoard(x, y, width, height) {
			this.activeGroup.setAttrs({
				x,
				y,
				width,
				height
			});
		};
		_proto.rangeColumnToColumnInfo = function rangeColumnToColumnInfo(columnIndex) {
			var columnId = this.collector.dataUtil.getVisibleFieldIds()[columnIndex];
			return this.collector.columns.getInfoByFieldId(columnId);
		};
		_proto.rangeRowToRowInfo = function rangeRowToRowInfo(rowIndex) {
			var recordId = this.collector.dataUtil.getDisplayedRecordIds()[rowIndex];
			return this.collector.rows.getInfoByRecordId(recordId);
		};
		_proto.isHiddenRow = function isHiddenRow(rowIndex) {
			var rowInfo = this.rangeRowToRowInfo(rowIndex);
			if (!rowInfo || rowInfo.height === 0) return true;
			if (rowInfo.parent !== -1) return this.collector.rows.isHiddenRow(rowInfo.parent);
			return false;
		};
		_proto.getFrozenDivisionColumns = function getFrozenDivisionColumns(startColumn, endColumn) {
			var frozenColumns = [];
			var activeColumns = [];
			for (var columnIndex = startColumn; columnIndex <= endColumn; columnIndex++) if (columnIndex < this.frozenMaxIndex) frozenColumns.push(columnIndex);
			else activeColumns.push(columnIndex);
			return {
				frozenColumns,
				activeColumns
			};
		};
		_proto.drawRectWithBorder = function drawRectWithBorder(container, rect) {
			container.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: this.backgroundColor,
				borderColor: this.borderColor,
				borderWidth: this.borderWidth
			})), 0, 0, this.getStickyClipArea());
		};
		_proto.drawRectWithoutBorder = function drawRectWithoutBorder(container, rect) {
			container.add(pen.config.rect(Object.assign(Object.assign({}, rect), { background: this.backgroundColor })), 0, 0, this.getStickyClipArea());
		};
		_proto.drawFrozenEdgeSideBorder = function drawFrozenEdgeSideBorder(container, rect, points) {
			container.add(pen.config.line({
				x: rect.x,
				y: rect.y,
				points,
				borderColor: this.borderColor,
				borderWidth: this.borderWidth
			}), 0, 0, this.getStickyClipArea());
		};
		/**
		* 本选区类型绘制时使用的 sticky 裁剪区域。默认走全量 sticky 裁剪，
		* 列选区（跨表头 + body）会覆盖为 undefined 避免表头部分被误裁。
		*/ _proto.getStickyClipArea = function getStickyClipArea() {
			return this.collector.widgetCollector.getStickyFeatureClipRect();
		};
		_create_class$16(BaseSelectionRenderer, [
			{
				key: "currentSelection",
				get: function() {
					return this.renderer.getRangeModel().getCurrentSelection();
				}
			},
			{
				key: "frozenMaxIndex",
				get: function() {
					return this.collector.state.getColumnFrozenCount() - this.collector.state.getOperatorFieldNum();
				}
			},
			{
				key: "offsetX",
				get: function() {
					return this.collector.range.scrollLeft;
				}
			},
			{
				key: "borderColor",
				get: function() {
					return style.color.selectionBorderColor;
				}
			},
			{
				key: "borderWidth",
				get: function() {
					return style.size.borderWidth;
				}
			},
			{
				key: "backgroundColor",
				get: function() {
					return style.color.selectionBackground;
				}
			}
		]);
		return BaseSelectionRenderer;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/renderer/column.js
function _defineProperties$15(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$15(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$15(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$15(Constructor, staticProps);
	return Constructor;
}
function _inherits$41(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$41(subClass, superClass);
}
function _set_prototype_of$41(o, p) {
	_set_prototype_of$41 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$41(o, p);
}
var ColumnSelectionRenderer;
var init_column = __esmMin((() => {
	init_es();
	init_style();
	init_base();
	init_get_frozen_end_y();
	ColumnSelectionRenderer = /* @__PURE__ */ function(BaseSelectionRenderer) {
		"use strict";
		_inherits$41(ColumnSelectionRenderer, BaseSelectionRenderer);
		function ColumnSelectionRenderer() {
			var _this = BaseSelectionRenderer.apply(this, arguments) || this;
			_this.type = SelectionType.COLUMN;
			return _this;
		}
		var _proto = ColumnSelectionRenderer.prototype;
		/**
		* 列选区跨越"表头 + body"两段区域：表头段不受 sticky 影响，body 段即便被 sticky GroupHead 覆盖，
		* 本身也仅为 0.08 透明度的背景色（与覆盖普通分组头效果一致），因此列选区整体不应用 sticky 裁剪，
		* 以免把表头部分一起裁掉。
		*/ _proto.getStickyClipArea = function getStickyClipArea() {};
		_proto.draw = function draw() {
			if (!this.currentSelection.isColumnSelection()) return;
			var frozenColumnIndexs = [];
			var activeColumnIndexs = [];
			this.currentSelection.getRanges().forEach((columnRange) => {
				var { frozenColumns, activeColumns } = this.getFrozenDivisionColumns(columnRange.startColumn, columnRange.endColumn);
				slicePush(frozenColumnIndexs, frozenColumns);
				slicePush(activeColumnIndexs, activeColumns);
			});
			var selectedFieldIndexSet = new Set([...frozenColumnIndexs, ...activeColumnIndexs]);
			this.clip();
			this.drawBackgroundAndBorder(frozenColumnIndexs, activeColumnIndexs, selectedFieldIndexSet);
		};
		_proto.getSelectionRect = function getSelectionRect(columnRanges) {
			var { frozenColumns, activeColumns } = this.getFrozenDivisionColumns(columnRanges[0].startColumn, columnRanges[0].endColumn);
			var { range, rows, size } = this.collector;
			var emptySet = /* @__PURE__ */ new Set();
			var frozenRects = this.toRects(frozenColumns, 0, emptySet);
			var activeRects = this.toRects(activeColumns, this.collector.range.scrollLeft, emptySet);
			var defaultRectX = size.activityStartX + size.activityViewWidth;
			var rowInfo = rows.getInfo(rows.rowCount - 1);
			var endY = size.globalPaddingTop;
			if (rowInfo) endY = rowInfo.y - range.scrollTop;
			return {
				frozenRect: {
					x: frozenRects.length ? frozenRects[0].x : defaultRectX,
					y: size.activityStartY,
					width: frozenRects.length ? frozenRects[0].width : 0,
					height: endY
				},
				activeRect: {
					x: activeRects.length ? activeRects[0].x : defaultRectX,
					y: size.activityStartY,
					width: activeRects.length ? activeRects[0].width : 0,
					height: endY
				}
			};
		};
		_proto.clip = function clip() {
			var { borderWidth } = style.size;
			var { globalPaddingLeft, activityStartX, activityViewWidth, globalPaddingTop } = this.collector.size;
			var height = this.realHeight + globalPaddingTop + borderWidth;
			this.clipFrozenBoard(globalPaddingLeft, 0, activityStartX + borderWidth, height);
			this.clipActiveBoard(activityStartX - borderWidth, 0, activityViewWidth, height);
		};
		_proto.drawBackgroundAndBorder = function drawBackgroundAndBorder(frozenColumnIndexs, activeColumnIndexs, selectedFieldIndexSet) {
			var frozenRects = this.toRects(frozenColumnIndexs, 0, selectedFieldIndexSet);
			var activeRects = this.toRects(activeColumnIndexs, this.collector.range.scrollLeft, selectedFieldIndexSet);
			var frozenLastRect = frozenRects[frozenRects.length - 1];
			var activeFirstRect = activeRects[0];
			if (!(frozenLastRect && activeFirstRect && frozenLastRect.x + frozenLastRect.width - this.offsetX === activeFirstRect.x)) {
				frozenRects.forEach((rect) => this.drawRectWithBorder(this.frozenGroup, rect));
				activeRects.forEach((rect) => this.drawRectWithBorder(this.activeGroup, rect));
				return;
			}
			[...frozenRects, ...activeRects].forEach((rect) => {
				if (rect === frozenLastRect) {
					this.drawRectWithoutBorder(this.frozenGroup, rect);
					var points = [
						rect.width,
						0,
						0,
						0,
						0,
						rect.height,
						rect.width,
						rect.height
					];
					this.drawFrozenEdgeSideBorder(this.frozenGroup, rect, points);
					return;
				}
				if (rect === activeFirstRect) {
					this.drawRectWithoutBorder(this.activeGroup, rect);
					var points1 = [
						0,
						0,
						rect.width,
						0,
						rect.width,
						rect.height,
						0,
						rect.height
					];
					this.drawFrozenEdgeSideBorder(this.activeGroup, rect, points1);
					return;
				}
				this.drawRectWithBorder(frozenRects.includes(rect) ? this.frozenGroup : this.activeGroup, rect);
			});
		};
		_proto.toRects = function toRects(columnIndexs, offsetX, selectedFieldIndexSet) {
			var rects = [];
			var { globalPaddingTop, fieldGroupHeaderHeight } = this.collector.size;
			var baseHeight = getFrozenEndY(this.collector) - globalPaddingTop;
			var operatorFieldNum = this.collector.state.getOperatorFieldNum();
			var hasVisibleFieldGroup = this.collector.dataUtil.hasVisibleFieldGroup();
			columnIndexs.forEach((columnIndex) => {
				var columnXAndWidth = this.getColumnXAndWidth(columnIndex + operatorFieldNum);
				if (!columnXAndWidth) return;
				var { x, width } = columnXAndWidth;
				var y = globalPaddingTop;
				var height = baseHeight;
				if (hasVisibleFieldGroup) {
					var columnInfo = this.collector.columns.getInfos().get(columnIndex + operatorFieldNum);
					var fieldGroupId = columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.fieldGroupId;
					if (fieldGroupId && !this.isFieldGroupFullySelected(fieldGroupId, selectedFieldIndexSet)) {
						y = globalPaddingTop + fieldGroupHeaderHeight;
						height = baseHeight - fieldGroupHeaderHeight;
					}
				}
				rects.push({
					y,
					height,
					x: x - offsetX,
					width
				});
			});
			return this.mergeRects(rects);
		};
		/**
		* 判断指定编组是否被"完整选中"（编组内所有可见字段都在当前选区内）
		*/ _proto.isFieldGroupFullySelected = function isFieldGroupFullySelected(fieldGroupId, selectedFieldIndexSet) {
			var indexes = this.collector.dataUtil.getFieldIndexesInFieldGroup(fieldGroupId);
			if (indexes.length === 0) return false;
			return indexes.every((idx) => selectedFieldIndexSet.has(idx));
		};
		_proto.getColumnXAndWidth = function getColumnXAndWidth(columnIndex) {
			var columnInfo = this.collector.columns.getInfos().get(columnIndex);
			if (!columnInfo) return;
			return {
				x: columnInfo.x,
				width: columnInfo.width
			};
		};
		_create_class$15(ColumnSelectionRenderer, [{
			key: "realHeight",
			get: function() {
				var { globalPaddingTop, activityStartY, activityViewHeight } = this.collector.size;
				return Math.min(getFrozenEndY(this.collector) - globalPaddingTop, activityStartY + activityViewHeight);
			}
		}]);
		return ColumnSelectionRenderer;
	}(BaseSelectionRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/renderer/normal.js
function _inherits$40(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$40(subClass, superClass);
}
function _set_prototype_of$40(o, p) {
	_set_prototype_of$40 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$40(o, p);
}
var NormalSelectionRenderer;
var init_normal = __esmMin((() => {
	init_style();
	init_interface$23();
	init_base();
	NormalSelectionRenderer = /* @__PURE__ */ function(BaseSelectionRenderer) {
		"use strict";
		_inherits$40(NormalSelectionRenderer, BaseSelectionRenderer);
		function NormalSelectionRenderer() {
			var _this = BaseSelectionRenderer.apply(this, arguments) || this;
			_this.type = SelectionType.NORMAL;
			return _this;
		}
		var _proto = NormalSelectionRenderer.prototype;
		_proto.draw = function draw() {
			if (!this.currentSelection.isRangeSelection()) return;
			var range = this.currentSelection.getRanges();
			if (!range) return;
			this.drawRange(range);
		};
		_proto.drawRange = function drawRange(range) {
			var selectionRect = this.getSelectionRect(range);
			if (!selectionRect) return;
			this.clip();
			this.drawSelection(selectionRect.frozenRect, selectionRect.activeRect);
		};
		_proto.getSelectionRect = function getSelectionRect(range) {
			var { startColumn, endColumn, startRow, endRow } = range;
			if (this.isHiddenRow(startRow) || this.isHiddenRow(endRow)) return;
			var startRowInfo = this.rangeRowToRowInfo(startRow);
			var endRowInfo = this.rangeRowToRowInfo(endRow);
			if (!startRowInfo || !endRowInfo) return;
			var { size, rows } = this.collector;
			var { activityStartY } = size;
			var { scrollTop, scrollLeft } = this.collector.range;
			var startY = startRowInfo.y + activityStartY - scrollTop;
			var endY = endRowInfo.y + activityStartY - scrollTop;
			var recordHeight = rows.getRowSize(RowType.Record);
			var y = startY;
			var height = endY + recordHeight - y;
			var frozenRect = {
				x: 0,
				width: 0,
				y,
				height
			};
			var activeRect = {
				x: 0,
				width: 0,
				y,
				height
			};
			var { frozenColumns, activeColumns } = this.getFrozenDivisionColumns(startColumn, endColumn);
			var { x: activeStartX, width: activeWidth } = this.getColumnsXAndWidth(activeColumns);
			activeRect.x = activeStartX;
			activeRect.width = activeWidth;
			if (frozenColumns.length) {
				var { x: frozenStartX, width: frozenWidth } = this.getColumnsXAndWidth(frozenColumns);
				frozenRect.x = frozenStartX;
				frozenRect.width = frozenWidth;
			}
			if (activeColumns.length) activeRect.x -= scrollLeft;
			return {
				frozenRect,
				activeRect
			};
		};
		_proto.clip = function clip() {
			var { borderWidth } = style.size;
			var { globalPaddingLeft, activityStartX, frozenWidth, activityViewWidth, activityStartY, activityViewHeight } = this.collector.size;
			this.clipFrozenBoard(globalPaddingLeft, activityStartY - borderWidth, frozenWidth + borderWidth, activityViewHeight);
			this.clipActiveBoard(activityStartX - borderWidth, activityStartY - borderWidth, activityViewWidth + 2 * borderWidth, activityViewHeight);
		};
		_proto.drawSelection = function drawSelection(frozenRect, activeRect) {
			if (frozenRect.width && !activeRect.width) {
				this.drawRectWithBorder(this.frozenGroup, frozenRect);
				return;
			}
			if (!frozenRect.width && activeRect.width) {
				this.drawRectWithBorder(this.activeGroup, activeRect);
				return;
			}
			if (frozenRect.width && activeRect.width) {
				var frozenLinePoints = [
					frozenRect.width,
					0,
					0,
					0,
					0,
					frozenRect.height,
					frozenRect.width,
					frozenRect.height
				];
				this.drawRectWithoutBorder(this.frozenGroup, frozenRect);
				this.drawFrozenEdgeSideBorder(this.frozenGroup, frozenRect, frozenLinePoints);
				var activeLinePoints = [
					0,
					0,
					activeRect.width,
					0,
					activeRect.width,
					activeRect.height,
					0,
					activeRect.height
				];
				this.drawRectWithoutBorder(this.activeGroup, activeRect);
				this.drawFrozenEdgeSideBorder(this.activeGroup, activeRect, activeLinePoints);
			}
		};
		_proto.getColumnsXAndWidth = function getColumnsXAndWidth(columns) {
			var result = {
				x: 0,
				width: 0
			};
			if (!columns.length) return result;
			var firstColumnInfo = this.rangeColumnToColumnInfo(columns[0]);
			var lastColumnInfo = this.rangeColumnToColumnInfo(columns[columns.length - 1]);
			if (!firstColumnInfo || !lastColumnInfo) return result;
			result.x = firstColumnInfo.x;
			result.width = lastColumnInfo.x + lastColumnInfo.width - result.x;
			return result;
		};
		return NormalSelectionRenderer;
	}(BaseSelectionRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/renderer/row.js
function _inherits$39(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$39(subClass, superClass);
}
function _set_prototype_of$39(o, p) {
	_set_prototype_of$39 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$39(o, p);
}
var RowSelectionRenderer;
var init_row = __esmMin((() => {
	init_style();
	init_interface$23();
	init_base();
	RowSelectionRenderer = /* @__PURE__ */ function(BaseSelectionRenderer) {
		"use strict";
		_inherits$39(RowSelectionRenderer, BaseSelectionRenderer);
		function RowSelectionRenderer() {
			var _this = BaseSelectionRenderer.apply(this, arguments) || this;
			_this.type = SelectionType.ROW;
			return _this;
		}
		var _proto = RowSelectionRenderer.prototype;
		_proto.draw = function draw() {
			if (!this.currentSelection.isRowSelection()) return;
			var rowRanges = this.currentSelection.getRanges();
			if (!rowRanges.length) return;
			var rects = [];
			rowRanges.forEach((rowRange) => {
				rects.push(...this.toRects(rowRange));
			});
			this.clip();
			rects.forEach((rect) => this.drawSelection(rect));
		};
		_proto.clip = function clip() {
			var { borderWidth } = style.size;
			var { globalPaddingLeft, activityStartY, activityViewWidth, activityStartX, activityViewHeight } = this.collector.size;
			this.clipFrozenBoard(globalPaddingLeft, activityStartY - borderWidth, activityStartX + activityViewWidth, activityViewHeight);
		};
		_proto.drawSelection = function drawSelection(rect) {
			if (!rect.height) return;
			var { customConfig } = this.renderer.context;
			if (customConfig && !customConfig.featureServiceConfig.record_move) this.drawRectWithoutBorder(this.frozenGroup, rect);
			else this.drawRectWithBorder(this.frozenGroup, rect);
		};
		_proto.toRects = function toRects(range) {
			var displayedRecordIds = this.collector.dataUtil.getDisplayedRecordIds();
			var startRecordId = displayedRecordIds[range.startRow];
			var endRecordId = displayedRecordIds[range.endRow];
			var startRecordRowInfo = this.collector.rows.getInfoByRecordId(startRecordId);
			var endRecordRowInfo = this.collector.rows.getInfoByRecordId(endRecordId);
			if (!startRecordRowInfo || !endRecordRowInfo) return [];
			var startRowIndex = startRecordRowInfo.index;
			var endRowIndex = endRecordRowInfo.index;
			var { start: renderRowStart, end: renderRowEnd } = this.collector.range.getRowRange();
			var recordRects = [];
			for (var renderRow = renderRowStart - 1; renderRow <= renderRowEnd + 1; renderRow++) {
				if (renderRow < startRowIndex || renderRow > endRowIndex) continue;
				var rowInfo = this.collector.rows.getInfo(renderRow);
				if (!rowInfo || rowInfo.type !== RowType.Record) continue;
				if (rowInfo.height && !this.collector.rows.isHiddenRow(rowInfo.parent)) {
					var innerRect = this.collector.getInnerRect(rowInfo);
					var rect = {
						x: innerRect.x + style.size.borderWidth,
						y: innerRect.y + this.collector.size.activityStartY,
						width: innerRect.width - this.collector.getAdditionFieldShowWidth(rowInfo),
						height: innerRect.height
					};
					var prevRect = recordRects[recordRects.length - 1];
					if (prevRect && Math.abs(prevRect.y + prevRect.height - rect.y) < .01) {
						prevRect.height += rect.height;
						continue;
					}
					recordRects.push(rect);
				}
			}
			return recordRects;
		};
		return RowSelectionRenderer;
	}(BaseSelectionRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/renderer/index.js
function _defineProperties$14(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$14(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$14(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$14(Constructor, staticProps);
	return Constructor;
}
function _inherits$38(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$38(subClass, superClass);
}
function _set_prototype_of$38(o, p) {
	_set_prototype_of$38 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$38(o, p);
}
function activeRecordToRange(activeRecordInfo, helper) {
	if (!(activeRecordInfo === null || activeRecordInfo === void 0 ? void 0 : activeRecordInfo.fieldId)) return null;
	var { fieldId, recordId } = activeRecordInfo;
	var fieldIndex = helper.getFieldIndex(fieldId);
	var recordIndex = helper.getRecordIndex(recordId);
	return {
		startColumn: fieldIndex,
		endColumn: fieldIndex,
		startRow: recordIndex,
		endRow: recordIndex
	};
}
var import_main$2, SelectionRenderer;
var init_renderer$1 = __esmMin((() => {
	import_main$2 = require_main();
	init_esm$1();
	init_pen();
	init_column();
	init_normal();
	init_row();
	SelectionRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$38(SelectionRenderer, Disposable);
		function SelectionRenderer(renderer, helper) {
			var _this = Disposable.call(this) || this;
			_this.renderer = renderer;
			_this.helper = helper;
			_this.isSelectAll = false;
			_this.activeRecordRange = null;
			_this.onActiveRecordChanged = (activeRecordInfo) => {
				var view = _this.renderer.collector.dataUtil.getCurrentView();
				if (!view) return;
				var range = activeRecordToRange(activeRecordInfo, {
					getFieldIndex: view.getFieldIndexFromVisibleFieldIds.bind(view),
					getRecordIndex: view.getRecordIndexFromVisibleRecordIds.bind(view)
				});
				_this.clearSelection();
				_this.activeRecordRange = range;
				if (range) _this.normalRenderer.drawRange(range);
			};
			_this.onSelectionChanged = () => {
				if (_this.activeRecordRange) return;
				_this.clearSelection();
				if (_this.isHideSelection) return;
				if (_this.currentRenderer) _this.currentRenderer.draw();
				_this.updateLayoutSelectStatus();
			};
			var groupOption = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			_this.frozenGroup = _this._register(pen.group(Object.assign({}, groupOption)));
			_this.activeGroup = _this._register(pen.group(Object.assign({}, groupOption)));
			_this.renderer.getFeatureLayer().addGroup(_this.frozenGroup);
			_this.renderer.getFeatureLayer().addGroup(_this.activeGroup);
			_this.rowRenderer = new RowSelectionRenderer(_this.frozenGroup, _this.activeGroup, _this.renderer, _this.renderer.collector);
			_this.columnRenderer = new ColumnSelectionRenderer(_this.frozenGroup, _this.activeGroup, _this.renderer, _this.renderer.collector);
			_this.normalRenderer = new NormalSelectionRenderer(_this.frozenGroup, _this.activeGroup, _this.renderer, _this.renderer.collector);
			_this._register(_this.rangeModel.onSelectionChanged(_this.onSelectionChanged));
			_this._register(_this.renderer.context.emitter.service.activedRecordChanged.event(_this.onActiveRecordChanged));
			return _this;
		}
		var _proto = SelectionRenderer.prototype;
		_proto.update = function update() {
			var _a;
			if (this.activeRecordRange) {
				this.clearSelection();
				this.normalRenderer.drawRange(this.activeRecordRange);
				return;
			}
			if (!this.isHideSelection) {
				this.clearSelection();
				(_a = this.currentRenderer) === null || _a === void 0 || _a.update();
			}
		};
		_proto.getCurrentSelectionRect = function getCurrentSelectionRect() {
			var currentSelection = this.rangeModel.getCurrentSelection();
			if (currentSelection.isRangeSelection()) {
				var range = currentSelection.getRanges();
				if (!range) return;
				return this.normalRenderer.getSelectionRect(range);
			}
			if (currentSelection.isColumnSelection()) {
				var range1 = currentSelection.getRanges();
				if (!range1) return;
				return this.columnRenderer.getSelectionRect(range1);
			}
		};
		_proto.clearSelection = function clearSelection() {
			this.frozenGroup.clear();
			this.activeGroup.clear();
		};
		_proto.updateLayoutSelectStatus = function updateLayoutSelectStatus() {
			var _a;
			var isSelectAll = this.renderer.collector.state.isSelectAll();
			var isLiteRowChanged = ((_a = this.renderer.context.customConfig) === null || _a === void 0 ? void 0 : _a.featureServiceConfig.selection) && this.currentRenderer === this.rowRenderer;
			if (isSelectAll !== this.isSelectAll || isLiteRowChanged) {
				this.renderer.collector.columns.patch();
				this.renderer.collector.rows.patch();
				this.renderer.renderMain();
			}
			if (ua.isMobile) {
				this.renderer.collector.columns.patch();
				this.renderer.renderMain();
			}
			this.isSelectAll = isSelectAll;
		};
		_create_class$14(SelectionRenderer, [
			{
				key: "isHideSelection",
				get: function() {
					return this.helper.isInVisible() || this.renderer.getFloatState().isShow();
				}
			},
			{
				key: "rangeModel",
				get: function() {
					return this.renderer.getRangeModel();
				}
			},
			{
				key: "currentRenderer",
				get: function() {
					var selection = this.rangeModel.getCurrentSelection();
					if (!selection.getRanges()) return null;
					if (selection.isRowSelection()) return this.rowRenderer;
					if (selection.isColumnSelection()) return this.columnRenderer;
					return this.normalRenderer;
				}
			}
		]);
		return SelectionRenderer;
	}(import_main$2.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/active-point/interface.js
var IGridActivePoint;
var init_interface$18 = __esmMin((() => {
	init_module();
	IGridActivePoint = createDecorator("IGridActivePoint");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/active-point/utils/config.js
function getInitActivePointRect() {
	return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}
/**
* 获取收集内容的高度，有些列类型高度是跟随内容的，不能用 Infinity
*/ function getCollectHeight(field, originHeight, standardCell) {
	if (isAttachmentGridMode(field)) return originHeight;
	var { type } = field;
	if (isFormulaLikeField(field)) {
		var targetField = field.getResultFieldAttributes();
		type = (targetField === null || targetField === void 0 ? void 0 : targetField.getType()) || type;
		if (type === FieldType.CHECKBOX) return Infinity;
		if (getFormulaError(standardCell.data)) return originHeight;
	}
	if ([
		FieldType.CHECKBOX,
		FieldType.PROGRESS,
		FieldType.IMAGE
	].includes(type)) return originHeight;
	return Infinity;
}
/**
* 获取收集内容的配置
*
* @param isMultiCellSelection 是否处于多单元格选区（行选/列选/跨格 range）。
*   为 true 时选中态浮层不按内容撑开，锁在当前行高内单行显示，
*   因此内容也必须相应收敛为「单行 + 不换行 + 省略号」，避免多行文本溢出裁切。
*   与 `main.ts` 中 `shrinkToCell` 逻辑（totalHeight 锁到 minHeight）保持一致语义。
*/ function getActivePointCollectConfig(field, canEditCell, dataUtil, isMultiCellSelection = false) {
	var config = getDefaultContentCollectConfig();
	config.maxLines = Infinity;
	var { type } = field;
	if (isFormulaLikeField(field)) {
		var targetField = field.getResultFieldAttributes();
		type = (targetField === null || targetField === void 0 ? void 0 : targetField.getType()) || type;
	}
	if (ContentCollector.AlignRightFieldTypes.includes(type)) config.textConfig.align = "right";
	if (LabelTypes.includes(type)) {
		config.textConfig.wrap = "none";
		config.textConfig.ellipsis = true;
		config.labelConfig.canWrap = true;
		config.labelConfig.canDelete = canEditCell && !NOT_EDITABLE_FIELD.includes(field.type);
	}
	if (isAttachmentGridMode(field)) {
		config.maxLines = 1;
		config.attachmentConfig.thumbnailMode = true;
	}
	if (dataUtil.isAIFiled(field.getId())) config.aiConfig = {
		isGroupAi: dataUtil.isGroupAI(),
		aiFieldStyle: dataUtil.getAiFieldStyle(field.getId()),
		isAiDirty: false
	};
	if (domainConfig.getIsWb()) config.labelConfig.canDelete = true;
	if (isMultiCellSelection) {
		config.maxLines = 1;
		config.textConfig.wrap = "none";
		config.textConfig.ellipsis = true;
	}
	return config;
}
var init_config = __esmMin((() => {
	init_es();
	init_es$1();
	init_constants$1();
	init_content();
	init_config$2();
	init_is_attachment_grid_mode();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/active-point/utils/pre-do.js
/**
* 预处理选中态数据
* 权限检查、内容变换、所需按钮等
* @returns
*/ function preDoActivePointData(field, recordId, columnWidth, minRowHeight, standardCell, collectConfig, canEditCell, dataUtil) {
	var info = {
		canEditCell,
		assembleCell: null,
		disableAddition: !canEditCell,
		disableDropdown: false,
		disableAI: dataUtil.getAiFieldStyle(field.getId()) !== "SumAI",
		isCurrentUserFollowAI: dataUtil.isCurrentUserFollowAI(recordId)
	};
	switch (field.type) {
		case FieldType.LOOKUP:
		case FieldType.FORMULA:
			var lookupCollector = fieldCollector.getCollector(FieldType.LOOKUP);
			if (!!!lookupCollector.getError(standardCell.data)) {
				info.assembleCell = lookupCollector.getAssembleCell(standardCell.data);
				info.disableAddition = true;
				info.disableDropdown = !EnableDropdownLookupDerivationTypes.includes(info.assembleCell.sourceType);
			}
			break;
		case FieldType.LINK_RECORDS:
		case FieldType.TWO_WAY_LINK_RECORDS:
			if (field.isAutoLinkMode() || !field.getProperty().isMultiple && standardCell.data.length !== 0) info.disableAddition = true;
			break;
		case FieldType.URL:
		case FieldType.USER:
		case FieldType.USER_C:
		case FieldType.GROUP_B:
			info.disableDropdown = !canEditCell;
			break;
		case FieldType.EMAIL:
			if (standardCell.data.length === 0 && canEditCell) info.assembleCell = transformToPlaceHolderCell(i18n.t("输入邮箱"), collectConfig);
			break;
		case FieldType.PHONE:
			if (standardCell.data.length === 0 && canEditCell) info.assembleCell = transformToPlaceHolderCell(i18n.t("输入电话号"), collectConfig);
			break;
		case FieldType.SINGLE_SELECT:
		case FieldType.MULTIPLE_SELECT:
			if (standardCell.data.length === 0 && canEditCell) info.assembleCell = transformToPlaceHolderCell(i18n.t("请选择"), collectConfig);
			info.disableDropdown = !canEditCell;
			break;
		case FieldType.LOCATION:
			if (standardCell.data.length === 0 && canEditCell) info.assembleCell = transformToPlaceHolderCell(i18n.t("插入位置"), collectConfig);
			break;
	}
	if (dataUtil.getContext().customConfig) {
		info.disableAddition = true;
		info.disableDropdown = true;
		collectConfig.labelConfig.canDelete = false;
	}
	handlePermission(info, standardCell);
	return Object.assign({ assembleCell: info.assembleCell }, collectButtons(info, field, columnWidth, minRowHeight, standardCell.data.length === 0));
}
/**
* 将绘制参数转为绘制 placeholder 的内容
* @param placeholder
* @param collectConfig
* @returns
*/ function transformToPlaceHolderCell(placeholder, collectConfig) {
	var cellData = [{ text: placeholder }];
	var standardTextCell = {
		sourceType: FieldType.TEXT,
		data: cellData
	};
	collectConfig.textConfig.color = style.color.lightUltraFontColor;
	return standardTextCell;
}
/**
* 处理权限
* @param standardCell
*/ function handlePermission(info, standardCell) {
	var isWecomDoc = domainConfig.getIsWeCom();
	var isWecomUser = !!domainConfig.getSpreadConfig().getConfig("corpId");
	if (isWecomDoc && !isWecomUser && CheckAdditionCustomerTypes.includes(standardCell.sourceType)) info.disableAddition = true;
}
/**
* 收集按钮
*/ function collectButtons(info, field, columnWidth, minRowHeight, isValueEmpty) {
	if (domainConfig.getIsWb()) return {
		buttons: [],
		iconTakeWidth: 0
	};
	var iconRect = {
		x: columnWidth,
		y: (minRowHeight - IconStyle.size) / 2,
		width: IconStyle.size,
		height: IconStyle.size
	};
	var fieldType = field.type;
	if (isFormulaLikeField(field)) {
		var targetField = field.getResultFieldAttributes();
		if (targetField) fieldType = targetField.getType();
	}
	var buttons = [];
	if (DropDownTypes.includes(fieldType) && !info.disableDropdown) {
		iconRect.x -= IconStyle.size + IconStyle.marginRight;
		buttons.unshift({
			alias: NormalIconAlias.DROPDOWN,
			rect: Object.assign({}, iconRect),
			iconSize: style.size.iconSmall
		});
	}
	if (PhoneTypes.includes(fieldType)) {
		iconRect.x -= IconStyle.size + IconStyle.marginRight;
		buttons.unshift({
			alias: getFieldTypeIconAlias(FieldType.PHONE, isDarkMode()),
			rect: Object.assign({}, iconRect),
			iconSize: style.size.iconSmall
		});
	}
	if (EmailTypes.includes(field.type) && !isValueEmpty) {
		iconRect.x -= IconStyle.size + IconStyle.marginRight;
		buttons.unshift({
			alias: getFieldTypeIconAlias(FieldType.EMAIL, isDarkMode()),
			rect: Object.assign({}, iconRect),
			iconSize: style.size.iconSmall
		});
	}
	if (!info.disableAI && info.canEditCell && !ua.isWeChat && columnWidth > style.size.fieldMinWidthToB) {
		if (isValueEmpty) {
			var text = i18n.t("开始总结");
			var textTakeWidth = pen.util.measureTextWidth(text, style.size.fontSizeNormal) + 2 * style.size.tagMargin;
			var textConfig = pen.config.text({
				text,
				x: iconRect.x - textTakeWidth,
				y: iconRect.y,
				width: textTakeWidth,
				height: iconRect.height,
				fontSize: style.size.fontSizeNormal
			});
			iconRect.x -= IconStyle.size + textTakeWidth + IconStyle.marginRight;
			iconRect.width += textTakeWidth;
			buttons.unshift({
				alias: NormalIconAlias.LINES_AI_BOLD_COLORED,
				rect: Object.assign({}, iconRect),
				iconSize: style.size.iconSmall,
				text: textConfig
			});
		} else if (info.isCurrentUserFollowAI) {
			iconRect.x -= IconStyle.size + IconStyle.marginRight;
			buttons.unshift({
				alias: NormalIconAlias.DROPDOWN,
				rect: Object.assign({}, iconRect),
				iconSize: style.size.iconSmall,
				id: ActivePointButtonType.AI_DROPDOWN
			});
		}
	}
	return {
		buttons,
		iconTakeWidth: columnWidth - iconRect.x
	};
}
var DropDownTypes, PhoneTypes, EmailTypes, EnableDropdownLookupDerivationTypes, CheckAdditionCustomerTypes, IconStyle;
var init_pre_do = __esmMin((() => {
	init_esm$1();
	init_es();
	init_es$1();
	init_interface$22();
	init_field_collector();
	init_pen();
	init_resources();
	init_style();
	DropDownTypes = [
		FieldType.SINGLE_SELECT,
		FieldType.MULTIPLE_SELECT,
		FieldType.URL,
		FieldType.ATTACHMENT,
		FieldType.IMAGE,
		FieldType.LINK_RECORDS,
		FieldType.USER,
		FieldType.USER_C,
		FieldType.TWO_WAY_LINK_RECORDS,
		FieldType.LOCATION,
		FieldType.GROUP_B
	];
	PhoneTypes = [FieldType.PHONE];
	EmailTypes = [FieldType.EMAIL];
	EnableDropdownLookupDerivationTypes = [
		FieldType.IMAGE,
		FieldType.ATTACHMENT,
		FieldType.LINK_RECORDS,
		FieldType.TWO_WAY_LINK_RECORDS
	];
	CheckAdditionCustomerTypes = [FieldType.ATTACHMENT];
	IconStyle = {
		marginRight: 4,
		size: style.size.iconLarge
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-float/interface.js
var IGridRecordFloat, RecordMovedLabel;
var init_interface$17 = __esmMin((() => {
	init_module();
	IGridRecordFloat = createDecorator("IGridRecordFloat");
	(function(RecordMovedLabel) {
		RecordMovedLabel[RecordMovedLabel["IS_SORT"] = 1] = "IS_SORT";
		RecordMovedLabel[RecordMovedLabel["IS_GROUP"] = 2] = "IS_GROUP";
		RecordMovedLabel[RecordMovedLabel["IS_FILTER"] = 3] = "IS_FILTER";
	})(RecordMovedLabel || (RecordMovedLabel = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/docs-keymap/lib/esm/platform-utils.js
var PlatformUtil;
var init_platform_utils = __esmMin((() => {
	PlatformUtil = class {
		static isMobile() {
			return /(mobile)/i.test(navigator.userAgent);
		}
		static isAndroid() {
			return /(android)/i.test(navigator.userAgent);
		}
		static isIOS() {
			return /(iphone|ipad|ipod)/i.test(navigator.userAgent);
		}
		static isIPad() {
			return /(ipad)/i.test(navigator.userAgent);
		}
		static isMac() {
			return !this.isMobile() && /Mac OS X/i.test(navigator.userAgent);
		}
		static isFireFox() {
			return /firefox/i.test(navigator.userAgent);
		}
		static isChrome() {
			return /chrome/i.test(navigator.userAgent);
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/docs-keymap/lib/esm/key-code.js
var KeyCode, KeyCodeFireFox, KeyAssist, MOUSE_EVENT_TIMES, MouseCode, WheelCode, KeyType;
var init_key_code = __esmMin((() => {
	(function(KeyCode) {
		KeyCode[KeyCode["EMPTY"] = -1] = "EMPTY";
		KeyCode[KeyCode["BREAK"] = 3] = "BREAK";
		KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
		KeyCode[KeyCode["TAB"] = 9] = "TAB";
		KeyCode[KeyCode["CLEAR"] = 12] = "CLEAR";
		KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
		KeyCode[KeyCode["SHIFT"] = 16] = "SHIFT";
		KeyCode[KeyCode["CTRL"] = 17] = "CTRL";
		KeyCode[KeyCode["ALT"] = 18] = "ALT";
		KeyCode[KeyCode["PAUSE"] = 19] = "PAUSE";
		KeyCode[KeyCode["CAPS_LOCK"] = 20] = "CAPS_LOCK";
		KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
		KeyCode[KeyCode["SPACE"] = 32] = "SPACE";
		KeyCode[KeyCode["PAGE_UP"] = 33] = "PAGE_UP";
		KeyCode[KeyCode["PAGE_DOWN"] = 34] = "PAGE_DOWN";
		KeyCode[KeyCode["END"] = 35] = "END";
		KeyCode[KeyCode["HOME"] = 36] = "HOME";
		KeyCode[KeyCode["ARROW_LEFT"] = 37] = "ARROW_LEFT";
		KeyCode[KeyCode["ARROW_UP"] = 38] = "ARROW_UP";
		KeyCode[KeyCode["ARROW_RIGHT"] = 39] = "ARROW_RIGHT";
		KeyCode[KeyCode["ARROW_DOWN"] = 40] = "ARROW_DOWN";
		KeyCode[KeyCode["SELECT"] = 41] = "SELECT";
		KeyCode[KeyCode["PRINT"] = 42] = "PRINT";
		KeyCode[KeyCode["EXECUTE"] = 43] = "EXECUTE";
		KeyCode[KeyCode["PRINT_SCREEN"] = 44] = "PRINT_SCREEN";
		KeyCode[KeyCode["INSERT"] = 45] = "INSERT";
		KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
		KeyCode[KeyCode["HELP"] = 47] = "HELP";
		KeyCode[KeyCode["NUM_0"] = 48] = "NUM_0";
		KeyCode[KeyCode["NUM_1"] = 49] = "NUM_1";
		KeyCode[KeyCode["NUM_2"] = 50] = "NUM_2";
		KeyCode[KeyCode["NUM_3"] = 51] = "NUM_3";
		KeyCode[KeyCode["NUM_4"] = 52] = "NUM_4";
		KeyCode[KeyCode["NUM_5"] = 53] = "NUM_5";
		KeyCode[KeyCode["NUM_6"] = 54] = "NUM_6";
		KeyCode[KeyCode["NUM_7"] = 55] = "NUM_7";
		KeyCode[KeyCode["NUM_8"] = 56] = "NUM_8";
		KeyCode[KeyCode["NUM_9"] = 57] = "NUM_9";
		KeyCode[KeyCode["A"] = 65] = "A";
		KeyCode[KeyCode["B"] = 66] = "B";
		KeyCode[KeyCode["C"] = 67] = "C";
		KeyCode[KeyCode["D"] = 68] = "D";
		KeyCode[KeyCode["E"] = 69] = "E";
		KeyCode[KeyCode["F"] = 70] = "F";
		KeyCode[KeyCode["G"] = 71] = "G";
		KeyCode[KeyCode["H"] = 72] = "H";
		KeyCode[KeyCode["I"] = 73] = "I";
		KeyCode[KeyCode["J"] = 74] = "J";
		KeyCode[KeyCode["K"] = 75] = "K";
		KeyCode[KeyCode["L"] = 76] = "L";
		KeyCode[KeyCode["M"] = 77] = "M";
		KeyCode[KeyCode["N"] = 78] = "N";
		KeyCode[KeyCode["O"] = 79] = "O";
		KeyCode[KeyCode["P"] = 80] = "P";
		KeyCode[KeyCode["Q"] = 81] = "Q";
		KeyCode[KeyCode["R"] = 82] = "R";
		KeyCode[KeyCode["S"] = 83] = "S";
		KeyCode[KeyCode["T"] = 84] = "T";
		KeyCode[KeyCode["U"] = 85] = "U";
		KeyCode[KeyCode["V"] = 86] = "V";
		KeyCode[KeyCode["W"] = 87] = "W";
		KeyCode[KeyCode["X"] = 88] = "X";
		KeyCode[KeyCode["Y"] = 89] = "Y";
		KeyCode[KeyCode["Z"] = 90] = "Z";
		KeyCode[KeyCode["META_LEFT"] = 91] = "META_LEFT";
		KeyCode[KeyCode["META_RIGHT"] = 93] = "META_RIGHT";
		KeyCode[KeyCode["NUM_TIMES"] = 106] = "NUM_TIMES";
		KeyCode[KeyCode["NUM_PLUS"] = 107] = "NUM_PLUS";
		KeyCode[KeyCode["NUM_MINUS"] = 109] = "NUM_MINUS";
		KeyCode[KeyCode["NUM_POINT"] = 110] = "NUM_POINT";
		KeyCode[KeyCode["NUM_DIVIDE"] = 111] = "NUM_DIVIDE";
		KeyCode[KeyCode["F1"] = 112] = "F1";
		KeyCode[KeyCode["F2"] = 113] = "F2";
		KeyCode[KeyCode["F3"] = 114] = "F3";
		KeyCode[KeyCode["F4"] = 115] = "F4";
		KeyCode[KeyCode["F5"] = 116] = "F5";
		KeyCode[KeyCode["F6"] = 117] = "F6";
		KeyCode[KeyCode["F7"] = 118] = "F7";
		KeyCode[KeyCode["F8"] = 119] = "F8";
		KeyCode[KeyCode["F9"] = 120] = "F9";
		KeyCode[KeyCode["F10"] = 121] = "F10";
		KeyCode[KeyCode["F11"] = 122] = "F11";
		KeyCode[KeyCode["F12"] = 123] = "F12";
		KeyCode[KeyCode["SEMI"] = 186] = "SEMI";
		KeyCode[KeyCode["EQUAL"] = 187] = "EQUAL";
		KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
		KeyCode[KeyCode["MINUS"] = 189] = "MINUS";
		KeyCode[KeyCode["PERIOD"] = 190] = "PERIOD";
		KeyCode[KeyCode["SLASH"] = 191] = "SLASH";
		KeyCode[KeyCode["BACKQUOTE"] = 192] = "BACKQUOTE";
		KeyCode[KeyCode["BRACKET_LEFT"] = 219] = "BRACKET_LEFT";
		KeyCode[KeyCode["BACK_SLASH"] = 220] = "BACK_SLASH";
		KeyCode[KeyCode["BRACKET_RIGHT"] = 221] = "BRACKET_RIGHT";
		KeyCode[KeyCode["QUOTATION_MARK"] = 222] = "QUOTATION_MARK";
	})(KeyCode || (KeyCode = {}));
	(function(KeyCodeFireFox) {
		KeyCodeFireFox[KeyCodeFireFox["EQUAL"] = 61] = "EQUAL";
		KeyCodeFireFox[KeyCodeFireFox["MINUS"] = 173] = "MINUS";
		KeyCodeFireFox[KeyCodeFireFox["META_FIREFOX"] = 224] = "META_FIREFOX";
	})(KeyCodeFireFox || (KeyCodeFireFox = {}));
	(function(KeyAssist) {
		KeyAssist[KeyAssist["SHIFT"] = 1e3] = "SHIFT";
		KeyAssist[KeyAssist["ALT"] = 1e4] = "ALT";
		KeyAssist[KeyAssist["CTRL_WIN"] = 1e5] = "CTRL_WIN";
		KeyAssist[KeyAssist["CTRL_MAC"] = 2e5] = "CTRL_MAC";
		KeyAssist[KeyAssist["WIN"] = 1e6] = "WIN";
		KeyAssist[KeyAssist["COMMAND"] = 2e6] = "COMMAND";
	})(KeyAssist || (KeyAssist = {}));
	MOUSE_EVENT_TIMES = 1e7;
	(function(MouseCode) {
		MouseCode[MouseCode["PRIMARY_BUTTON"] = 1e7] = "PRIMARY_BUTTON";
		MouseCode[MouseCode["SECONDARY_BUTTON"] = 2e7] = "SECONDARY_BUTTON";
		MouseCode[MouseCode["MIDDLE_BUTTON"] = 4e7] = "MIDDLE_BUTTON";
	})(MouseCode || (MouseCode = {}));
	(function(WheelCode) {
		WheelCode[WheelCode["WHEEL_ANTICLOCKWISE"] = 1e8] = "WHEEL_ANTICLOCKWISE";
		WheelCode[WheelCode["WHEEL_CLOCKWISE"] = 2e8] = "WHEEL_CLOCKWISE";
	})(WheelCode || (WheelCode = {}));
	(function(KeyType) {
		KeyType["KEY_UP"] = "keyup";
		KeyType["KEY_PRESS"] = "keypress";
		KeyType["KEY_DOWN"] = "keydown";
	})(KeyType || (KeyType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/docs-keymap/lib/esm/key-helper.js
var KeyHelper;
var init_key_helper = __esmMin((() => {
	init_platform_utils();
	init_key_code();
	KeyHelper = class {
		/**
		* 获取keyCode，对FireFox进行兼容处理
		* @param keyEvent - 键盘事件
		*/
		static getKeyCode(keyEvent) {
			let { keyCode } = keyEvent;
			if (PlatformUtil.isFireFox()) {
				if (keyCode === KeyCodeFireFox.EQUAL) keyCode = KeyCode.EQUAL;
				else if (keyCode === KeyCodeFireFox.MINUS) keyCode = KeyCode.MINUS;
			}
			return keyCode;
		}
		static getMouseCode(mouseEvent) {
			return mouseEvent.buttons * MOUSE_EVENT_TIMES;
		}
		static getWheelCode(wheelEvent) {
			let wheelCode = 0;
			if (wheelEvent.deltaY > 0) wheelCode = WheelCode.WHEEL_CLOCKWISE;
			else if (wheelEvent.deltaY < 0) wheelCode = WheelCode.WHEEL_ANTICLOCKWISE;
			return wheelCode;
		}
		/**
		* 获取ctrl, shift, alt, meta状态，区分mac/win
		* @param keyEvent - 键盘事件
		*/
		static getAssistKey(keyEvent) {
			let assitKey = 0;
			if (PlatformUtil.isMac() || PlatformUtil.isIPad()) {
				assitKey += keyEvent.altKey ? KeyAssist.ALT : 0;
				assitKey += keyEvent.shiftKey ? KeyAssist.SHIFT : 0;
				assitKey += keyEvent.ctrlKey ? KeyAssist.CTRL_MAC : 0;
				assitKey += keyEvent.metaKey ? KeyAssist.COMMAND : 0;
			} else {
				assitKey += keyEvent.altKey ? KeyAssist.ALT : 0;
				assitKey += keyEvent.shiftKey ? KeyAssist.SHIFT : 0;
				assitKey += keyEvent.ctrlKey ? KeyAssist.CTRL_WIN : 0;
				assitKey += keyEvent.metaKey ? KeyAssist.WIN : 0;
			}
			return assitKey;
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/docs-keymap/lib/esm/keymap-service.js
var KeymapService;
var init_keymap_service = __esmMin((() => {
	init_platform_utils();
	init_key_helper();
	init_key_code();
	KeymapService = class {
		constructor(node, useCapture = false) {
			this.keymap = /* @__PURE__ */ new Map();
			this.onKeyEvent = (keyEvent) => {
				const keyCode = KeyHelper.getKeyCode(keyEvent);
				const keys = KeyHelper.getAssistKey(keyEvent) + keyCode;
				this.run(keys, keyEvent);
			};
			this.onMouseEvent = (mouseEvent) => {
				const mouseCode = KeyHelper.getMouseCode(mouseEvent);
				const keys = KeyHelper.getAssistKey(mouseEvent) + mouseCode;
				this.run(keys, mouseEvent);
			};
			this.onWheelEvent = (wheelEvent) => {
				const wheelCode = KeyHelper.getWheelCode(wheelEvent);
				const keys = KeyHelper.getAssistKey(wheelEvent) + wheelCode;
				this.run(keys, wheelEvent);
			};
			this.sorter = (a, b) => {
				var _a, _b;
				return ((_a = b.weight) !== null && _a !== void 0 ? _a : 0) - ((_b = a.weight) !== null && _b !== void 0 ? _b : 0);
			};
			this.useCapture = useCapture;
			this.targetNode = node !== null && node !== void 0 ? node : document;
			this.targetNode.addEventListener("keydown", this.onKeyEvent, { capture: useCapture });
			this.targetNode.addEventListener("mousedown", this.onMouseEvent, { capture: useCapture });
			this.targetNode.addEventListener("wheel", this.onWheelEvent, { passive: false });
		}
		/**
		* 注册快捷键
		* @param keymap - 快捷键配置
		*/
		register(keymap) {
			if (!this.isValidContributedKeyBinding(keymap)) return;
			const platform = PlatformUtil.isMac() || PlatformUtil.isIOS() ? "mac" : "win";
			[].concat(keymap.keyBindings[platform]).forEach((value) => {
				if (value === KeyCode.EMPTY) return;
				let map = [keymap];
				if (this.keymap.has(value)) {
					const keymapValue = this.keymap.get(value);
					if (keymapValue) map = map.concat(keymapValue);
				}
				this.keymap.set(value, map);
			});
		}
		/**
		* 根据 handler 来移除所有此 handler 注册的快捷键
		* @param handler - 需要移除的 handler
		*/
		removeByFeature(handler) {
			const needDeleteKey = [];
			const needDeleteHandler = [];
			this.keymap.forEach((value, key) => {
				value.forEach((keymapItem) => {
					if (keymapItem.handler === handler) if (value.length === 1) needDeleteKey.push(key);
					else needDeleteHandler.push([key, keymapItem]);
				});
			});
			needDeleteKey.forEach((key) => {
				this.keymap.delete(key);
			});
			needDeleteHandler.forEach((item) => {
				const [key, keymapItem] = item;
				const keys = this.keymap.get(key);
				this.keymap.set(key, keys.filter((keymap) => keymap.handler !== keymapItem.handler));
			});
		}
		destroy() {
			this.targetNode.removeEventListener("keydown", this.onKeyEvent, { capture: this.useCapture });
			this.targetNode.removeEventListener("mousedown", this.onMouseEvent, { capture: this.useCapture });
			this.targetNode.removeEventListener("wheel", this.onWheelEvent);
		}
		remove(keymap) {
			if (!this.isValidContributedKeyBinding(keymap)) return;
			const platform = PlatformUtil.isMac() || PlatformUtil.isIOS() ? "mac" : "win";
			[].concat(keymap.keyBindings[platform]).forEach((value) => {
				if (value === KeyCode.EMPTY) return;
				if (this.keymap.has(value)) {
					const map = this.keymap.get(value);
					const targetIndex = map.findIndex((originKeymap) => originKeymap.keyBindings.win.join("") === keymap.keyBindings.win.join("") && originKeymap.keyBindings.mac.join("") === keymap.keyBindings.mac.join("") && originKeymap.handler === keymap.handler && originKeymap.when === keymap.when && originKeymap.shouldPreventDefault === keymap.shouldPreventDefault && originKeymap.weight === keymap.weight);
					if (targetIndex !== -1) {
						const temp = map.concat();
						temp.splice(targetIndex, 1);
						this.keymap.set(value, temp);
					}
				}
			});
		}
		get(keyBinding) {
			let keys;
			if (typeof keyBinding === "number") keys = [keyBinding];
			else keys = keyBinding[PlatformUtil.isMac() || PlatformUtil.isIOS() ? "mac" : "win"];
			return keys.reduce((acc, key) => {
				var _a;
				return acc.concat(...(_a = this.keymap.get(key)) !== null && _a !== void 0 ? _a : []);
			}, []);
		}
		isValidContributedKeyBinding(keyBinding) {
			if (!keyBinding) return false;
			if (typeof keyBinding.handler !== "function") return false;
			if (keyBinding.when && typeof keyBinding.when !== "function") return false;
			if (keyBinding.keyBindings.mac && !Array.isArray(keyBinding.keyBindings.mac)) return false;
			if (keyBinding.keyBindings.win && !Array.isArray(keyBinding.keyBindings.win)) return false;
			if (keyBinding.description && !Array.isArray(keyBinding.description)) return false;
			return true;
		}
		/**
		* 执行快捷键
		* @param keyCode - 快捷键组合的键值
		* @param event - UI 事件
		*/
		run(keyCode, event) {
			const keymapConfig = this.keymap.get(keyCode);
			keymapConfig === null || keymapConfig === void 0 || keymapConfig.sort(this.sorter);
			keymapConfig === null || keymapConfig === void 0 || keymapConfig.forEach((keymapConfigItem) => {
				const { handler, when, strict = true, shouldPreventDefault = true } = keymapConfigItem;
				if (strict && event instanceof KeyboardEvent && (event.location === 1 || event.location === 2 || event.repeat)) {
					if (shouldPreventDefault) event.preventDefault();
					return;
				}
				if ((when === null || when === void 0 ? void 0 : when(event)) || !when) {
					if (shouldPreventDefault) event.preventDefault();
					handler(event);
				}
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/docs-keymap/lib/esm/index.js
var init_esm = __esmMin((() => {
	init_keymap_service();
	init_key_code();
	init_key_helper();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/area-interactive/interface.js
var IGridAreaInteractive;
var init_interface$16 = __esmMin((() => {
	init_module();
	IGridAreaInteractive = createDecorator("IGridAreaInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/scroller/interface.js
var IGridScroller;
var init_interface$15 = __esmMin((() => {
	init_module();
	IGridScroller = createDecorator("IGridScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/scroller/main.js
function _defineProperties$13(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$13(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$13(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$13(Constructor, staticProps);
	return Constructor;
}
function _inherits$37(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$37(subClass, superClass);
}
function _set_prototype_of$37(o, p) {
	_set_prototype_of$37 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$37(o, p);
}
var verticalScrollerId, horizontalScrollerId, GridScroller;
var init_main$19 = __esmMin((() => {
	init_esm$1();
	init_es();
	init_utils$2();
	init_scroller$1();
	init_interface$15();
	init_grid_feature();
	init_scroll_info();
	verticalScrollerId = "v-scroller";
	horizontalScrollerId = "h-scroller";
	GridScroller = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$37(GridScroller, GridFeatureBase);
		function GridScroller() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.updatePosition();
			};
			_this.isHovering = () => {
				var _a, _b, _c, _d;
				return ((_a = _this.vertical) === null || _a === void 0 ? void 0 : _a.isHovering()) || ((_b = _this.horizontal) === null || _b === void 0 ? void 0 : _b.isHovering()) || ((_c = _this.vertical) === null || _c === void 0 ? void 0 : _c.isDragging()) || ((_d = _this.horizontal) === null || _d === void 0 ? void 0 : _d.isDragging()) || false;
			};
			return _this;
		}
		var _proto = GridScroller.prototype;
		_proto.getHorizontalId = function getHorizontalId() {
			return horizontalScrollerId;
		};
		_proto.bootstrap = function bootstrap() {
			var _a, _b;
			if (!((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll)) this.vertical = this._register(new CommonScroller({
				vertical: true,
				autoHide: ua.isMobile,
				id: verticalScrollerId,
				root: this.root,
				getViewRect: () => {
					var viewRect = Object.assign({}, this.viewRect);
					if (this.collector.dataUtil.isGantt()) viewRect.width = this.collector.size.ganttActivityViewWidth;
					return viewRect;
				},
				getScrollTop: () => this.collector.range.scrollTop * this.collector.size.scale,
				getScrollHeight: () => this.collector.size.scrollHeight * this.collector.size.scale,
				scrollToY: (y) => {
					this.action.hideToolTip();
					this.parentApi.scrollToY(y / this.collector.size.scale);
					requestAnimationFrame(() => {
						this.context.emitter.global.scroll.fire({
							x: this.collector.range.scrollLeft,
							y: y / this.collector.size.scale
						});
					});
				}
			}));
			if (this.parentApi.getType() === ViewType$1.GANTT || !((_b = getScrollConfig(this.context.getId())) === null || _b === void 0 ? void 0 : _b.useOuterHorizontalScroll)) this.horizontal = this._register(new CommonScroller({
				horizontal: true,
				autoHide: ua.isMobile,
				id: horizontalScrollerId,
				root: this.root,
				getViewRect: () => this.viewRect,
				getScrollLeft: () => this.collector.range.scrollLeft * this.collector.size.scale,
				getScrollWidth: () => this.collector.size.scrollWidth * this.collector.size.scale,
				scrollToX: (x) => {
					this.action.hideToolTip();
					this.parentApi.scrollToX(x / this.collector.size.scale);
					requestAnimationFrame(() => {
						this.context.emitter.global.scroll.fire({
							x: x / this.collector.size.scale,
							y: this.collector.range.scrollTop
						});
					});
				},
				onMouseEnter: (event) => {
					var targetRect = event.target.getBoundingClientRect();
					var scrollTip = getScrollTipInfo(this.getAbsolutePosition(targetRect.x, targetRect.y), targetRect);
					this.action.showToolTip(scrollTip.hoverTip, scrollTip.tipRect, { props: { placement: "top" } });
				},
				onMouseLeave: () => this.action.hideToolTip()
			}));
			var SCROLL_PADDINGLEFT = 3;
			var SCROLL_PADDINGBOTTOM = 2;
			this.vertical = this._register(new CommonScroller({
				vertical: true,
				autoHide: ua.isMobile,
				id: verticalScrollerId,
				root: this.root,
				getViewRect: () => {
					var viewRect = Object.assign({}, this.viewRect);
					if (this.collector.dataUtil.isGantt()) viewRect.width = this.collector.size.ganttActivityViewWidth;
					viewRect.x = viewRect.x - SCROLL_PADDINGLEFT;
					return viewRect;
				},
				getScrollTop: () => this.collector.range.scrollTop * this.collector.size.scale,
				getScrollHeight: () => this.collector.size.scrollHeight * this.collector.size.scale,
				scrollToY: (y) => {
					this.action.hideToolTip();
					this.parentApi.scrollToY(y / this.collector.size.scale);
					requestAnimationFrame(() => {
						this.context.emitter.global.scroll.fire({
							x: this.collector.range.scrollLeft,
							y: y / this.collector.size.scale
						});
					});
				}
			}));
			this.horizontal = this._register(new CommonScroller({
				horizontal: true,
				autoHide: ua.isMobile,
				id: horizontalScrollerId,
				root: this.root,
				getViewRect: () => {
					var viewRect = Object.assign({}, this.viewRect);
					viewRect.y = viewRect.y - SCROLL_PADDINGBOTTOM;
					return viewRect;
				},
				getScrollLeft: () => this.collector.range.scrollLeft * this.collector.size.scale,
				getScrollWidth: () => this.collector.size.scrollWidth * this.collector.size.scale,
				scrollToX: (x) => {
					this.action.hideToolTip();
					this.parentApi.scrollToX(x / this.collector.size.scale);
					requestAnimationFrame(() => {
						this.context.emitter.global.scroll.fire({
							x: x / this.collector.size.scale,
							y: this.collector.range.scrollTop
						});
					});
				},
				onMouseEnter: (event) => {
					var targetRect = event.target.getBoundingClientRect();
					var scrollTip = getScrollTipInfo(this.getAbsolutePosition(targetRect.x, targetRect.y), targetRect);
					this.action.showToolTip(scrollTip.hoverTip, scrollTip.tipRect, { props: { placement: "top" } });
				},
				onMouseLeave: () => this.action.hideToolTip()
			}));
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { high: {
				id: IGridScroller,
				isLock: () => this.isHovering()
			} };
		};
		_proto.updatePosition = function updatePosition() {
			var _a, _b;
			(_a = this.vertical) === null || _a === void 0 || _a.updatePosition();
			(_b = this.horizontal) === null || _b === void 0 || _b.updatePosition();
		};
		_create_class$13(GridScroller, [{
			key: "viewRect",
			get: function() {
				var { size } = this.collector;
				return {
					x: size.activityStartX * size.scale,
					y: size.activityStartY * size.scale,
					width: size.activityViewWidth * size.scale,
					height: (size.rootHeight - size.activityStartY) * size.scale
				};
			}
		}]);
		return GridScroller;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/scroller/index.js
var init_scroller = __esmMin((() => {
	init_interface$15();
	init_main$19();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/area-interactive/cell-interactive.js
function _defineProperties$12(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$12(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$12(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$12(Constructor, staticProps);
	return Constructor;
}
function _inherits$36(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$36(subClass, superClass);
}
function _set_prototype_of$36(o, p) {
	_set_prototype_of$36 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$36(o, p);
}
function _type_of$1(obj) {
	"@swc/helpers - typeof";
	return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
/**
* 获取 ActivePoint 操作的按钮类型
* @todo 最好是不要依赖收集中的定义
* @param button
* @returns
*/ function getActivePointButtonType(button) {
	if (button.id === ActivePointButtonType.AI_DROPDOWN) return ActivePointButtonType.AI_DROPDOWN;
	switch (button.alias) {
		case NormalIconAlias.DROPDOWN: return ActivePointButtonType.DROPDOWN;
		case NormalIconAlias.CELL_ADD:
		case NormalIconAlias.CELL_ADD_DARK: return ActivePointButtonType.ADD;
		case getFieldTypeIconAlias(FieldType.PHONE, isDarkMode()): return ActivePointButtonType.PHONE;
		case getFieldTypeIconAlias(FieldType.EMAIL, isDarkMode()): return ActivePointButtonType.EMAIL;
		case NormalIconAlias.LINES_AI_BOLD_COLORED: return ActivePointButtonType.AI_CREATE;
	}
}
/**
* 是否是标签类的删除按钮
* @todo 最好是不要依赖收集中的定义
* @param bitmapConfig
* @returns
*/ function isLabelCloseIcon(bitmapConfig) {
	var iconAlias = bitmapConfig.id;
	return [NormalIconAlias.CLOSE_DARK, NormalIconAlias.CLOSE_WHITE].includes(iconAlias);
}
var import_main$1, NEED_POINTER_FIELD_TYPE, NEED_PRESS_FIELD_TYPE, CellInteractive;
var init_cell_interactive = __esmMin((() => {
	import_main$1 = require_main();
	init_es();
	init_es$1();
	init_interface$22();
	init_constants$1();
	init_lib();
	init_pen();
	init_resources();
	init_style();
	init_active_point();
	init_cursor();
	init_is_in_rect();
	init_url_hot_rect();
	NEED_POINTER_FIELD_TYPE = [
		FieldType.URL,
		FieldType.IMAGE,
		FieldType.LOCATION,
		FieldType.CHECKBOX
	];
	NEED_PRESS_FIELD_TYPE = [
		FieldType.USER,
		FieldType.LINK_RECORDS,
		FieldType.TWO_WAY_LINK_RECORDS,
		FieldType.CREATED_USER,
		FieldType.MODIFIED_USER,
		FieldType.GROUP_B,
		FieldType.ATTACHMENT
	];
	CellInteractive = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$36(CellInteractive, Disposable);
		function CellInteractive(collector, emitter, renderer, action, dependApi) {
			var _this = Disposable.call(this) || this;
			_this.collector = collector;
			_this.emitter = emitter;
			_this.renderer = renderer;
			_this.action = action;
			_this.dependApi = dependApi;
			_this.mouseDownOnFeature = false;
			_this.hoverLabelIndex = -1;
			_this.pressTimer = null;
			return _this;
		}
		var _proto = CellInteractive.prototype;
		/**
		* hover 到常规的单元格（非选中）
		* @param columnInfo
		* @param rowInfo
		* @returns
		*/ _proto.hoverNormal = function hoverNormal(columnInfo, rowInfo) {
			var fieldId = columnInfo.id;
			var { recordId } = rowInfo;
			var field = this.collector.dataUtil.getFieldByFieldId(fieldId);
			if (!field) return;
			var cellContents = this.collector.contents.getCellInfo(fieldId, recordId);
			if (!cellContents) return;
			switch (field.getType()) {
				case FieldType.CHECKBOX:
					this.hoverCheckbox(cellContents, fieldId, recordId);
					break;
				case FieldType.URL:
					this.hoverUrl(cellContents, fieldId, recordId);
					break;
				case FieldType.FORMULA:
				case FieldType.LOOKUP:
					this.hoverFormulaOrLookupError(cellContents, fieldId, recordId);
					break;
			}
		};
		/**
		* hover 到 ActivePoint 选中态的单元格
		* 处理按钮 hover 态、内容 hover 操作
		*/ _proto.hoverActivePoint = function hoverActivePoint() {
			var _this, _loop = function(button) {
				var drawRect = Object.assign(Object.assign({}, button.rect), {
					x: rect.x + button.rect.x,
					y: rect.y + button.rect.y
				});
				if (isHitRect(offsetX, offsetY, drawRect)) {
					var buttonType = getActivePointButtonType(button);
					_this.dependApi.getTopGroup().add(pen.config.rect(Object.assign(Object.assign({}, drawRect), {
						borderRadius: style.size.borderRadius,
						background: style.color.hoverBackground,
						onMouseDown: (event, stopPropagation) => {
							var param = {
								type: ActivePointType.BUTTON_CLICK,
								buttonType
							};
							_this.emitter.service.activePointEditor.fire(param);
							stopPropagation();
							logger.info("[xview] active point button click", param);
						}
					})));
					_this.dependApi.setCursor(Cursor.POINTER);
					_this.showButtonTip(drawRect, buttonType);
					return { v: void 0 };
				}
			};
			var _a, _b;
			var activePointInfo = (_a = this.renderer.getFeature(IGridActivePoint)) === null || _a === void 0 ? void 0 : _a.getActivePointInfo(true);
			if (!activePointInfo) return;
			var { fieldId, recordId, rect, buttons, contents } = activePointInfo;
			if (!rect) return;
			var { offsetX, offsetY } = this.dependApi.getMouseOffset();
			this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, rect), { onMouseDown: () => {
				this.emitter.service.activePointEditor.fire({ type: ActivePointType.CONTENT_CLICK });
				logger.info("[xview] active point container click");
			} })));
			for (var button of buttons) {
				var _ret = (_this = this, _loop(button));
				if (_type_of$1(_ret) === "object") return _ret.v;
			}
			var field = this.collector.dataUtil.getFieldByFieldId(fieldId);
			if (!field) return;
			if (isFormulaLikeField(field)) {
				var resultField = field.getResultFieldAttributes();
				var resultFieldType = resultField.getType();
				if (resultFieldType === FieldType.URL || resultFieldType === FieldType.IMAGE || resultFieldType === FieldType.ATTACHMENT || resultFieldType === FieldType.LINK_RECORDS || resultFieldType === FieldType.TWO_WAY_LINK_RECORDS) field = resultField;
			}
			switch (field.getType()) {
				case FieldType.CHECKBOX:
					this.hoverCheckbox(contents, fieldId, recordId, activePointInfo);
					break;
				case FieldType.URL:
					this.hoverUrl(contents, fieldId, recordId, activePointInfo);
					break;
				case FieldType.IMAGE:
					this.hoverImage(contents, fieldId, recordId, activePointInfo);
					break;
				case FieldType.ATTACHMENT:
					this.hoverAttachment(contents, fieldId, recordId, activePointInfo);
					break;
				case FieldType.LOOKUP:
				case FieldType.FORMULA:
					if (this.hoverFormulaOrLookupError(contents, fieldId, recordId, activePointInfo)) break;
					if (((_b = field.getResultFieldAttributes()) === null || _b === void 0 ? void 0 : _b.getType()) === FieldType.LOCATION) this.hoverLocation(contents, fieldId, recordId, activePointInfo);
					break;
				case FieldType.LINK_RECORDS:
				case FieldType.TWO_WAY_LINK_RECORDS:
					this.hoverLinkRecord(contents, fieldId, recordId, activePointInfo);
					break;
				case FieldType.USER:
				case FieldType.CREATED_USER:
				case FieldType.MODIFIED_USER:
				case FieldType.GROUP_B:
					this.hoverUser(contents, fieldId, recordId, activePointInfo);
					break;
				default: if (LabelTypes.includes(field.getType())) this.hoverLabelTypes(contents, fieldId, recordId, activePointInfo);
			}
		};
		/**
		* 对于一些列类型，需要将鼠标变为 cursor 样式
		* @param columnInfo
		* @param rowInfo
		*/ _proto.handleHoverCursor = function handleHoverCursor(columnInfo, rowInfo, activePointInfo) {
			var fieldId = columnInfo.id;
			var { recordId } = rowInfo;
			var field = this.collector.dataUtil.getFieldByFieldId(fieldId);
			if (!field) return;
			if (field && NOT_EDITABLE_FIELD.includes(field.getType()) && !isFormulaLikeFieldType(field.getType())) this.dependApi.setCursor(Cursor.NOT_ALLOW);
			if (isFormulaLikeField(field)) {
				var resultField = field.getResultFieldAttributes();
				var resultFieldType = resultField.getType();
				if (resultFieldType === FieldType.URL || resultFieldType === FieldType.IMAGE || resultFieldType === FieldType.ATTACHMENT || resultFieldType === FieldType.LINK_RECORDS || resultFieldType === FieldType.TWO_WAY_LINK_RECORDS) field = resultField;
			}
			var cellContents;
			if (activePointInfo) cellContents = activePointInfo.contents;
			else cellContents = this.collector.contents.getCellInfo(fieldId, recordId);
			if (!cellContents) return;
			var fieldType = field.getType();
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			if (this.collector.dataUtil.getContext().customConfig && fieldType === FieldType.CHECKBOX) return;
			cellContents.forEach((content) => {
				if (content.type === DrawType.Rect || content.type === DrawType.Bitmap) {
					var { x, y, width, height } = content;
					var rect = {
						x,
						y,
						width,
						height
					};
					if (isHitRect(offsetX, offsetY, rect)) {
						if (NEED_POINTER_FIELD_TYPE.includes(fieldType)) this.dependApi.setCursor(Cursor.POINTER);
						var clipRect = !columnInfo.isFrozen ? this.frozenRect : void 0;
						if (activePointInfo && NEED_PRESS_FIELD_TYPE.includes(fieldType)) this.dependApi.getTopGroup().add(pen.config.rect(Object.assign(Object.assign({}, rect), {
							x: rect.x + contentX,
							y: rect.y + contentY,
							background: style.color.hoverBackground,
							borderRadius: style.size.borderRadius,
							onMouseDown: () => {
								this.dependApi.getTopGroup().add(pen.config.rect(Object.assign(Object.assign({}, rect), {
									x: rect.x + contentX,
									y: rect.y + contentY,
									background: style.color.activedBackground,
									borderRadius: style.size.borderRadius
								})));
							},
							onMouseUp: () => {
								this.dependApi.getTopGroup().clear();
							}
						})), 0, 0, clipRect);
						if (content.extraInfo) {
							var { range } = this.collector;
							var toolTipRect = Object.assign(Object.assign({}, rect), {
								x: columnInfo.isFrozen ? rect.x : rect.x - range.scrollLeft,
								y: rect.y - range.scrollTop
							});
							var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
							var extraList = standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.slice(-content.extraInfo).map((cellInfo) => cellInfo.text);
							this.action.showToolTip(extraList, toolTipRect, { props: { placement: "right" } });
						}
					}
				}
			});
		};
		_proto.showButtonTip = function showButtonTip(buttonRect, buttonType) {
			var tipText = "";
			if (buttonType === ActivePointButtonType.PHONE) tipText = this.dependApi.getTipText().getActivePointPhoneTip();
			if (buttonType === ActivePointButtonType.EMAIL) tipText = this.dependApi.getTipText().getActivePointEmailTip();
			if (tipText) this.dependApi.showToolTip(tipText, buttonRect);
		};
		_proto.hoverCheckbox = function hoverCheckbox(contents, fieldId, recordId, activePointInfo) {
			if ((contents === null || contents === void 0 ? void 0 : contents.length) !== 1) return;
			var bitmapOptions = contents[0];
			if (bitmapOptions.type !== DrawType.Bitmap) return;
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			if (isHitRect(offsetX, offsetY, bitmapOptions)) this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, bitmapOptions), {
				x: bitmapOptions.x + contentX,
				y: bitmapOptions.y + contentY,
				onMouseDown: () => this.mouseDownOnFeature = true,
				onClick: () => {
					this.action.toggleCellCheckbox(fieldId, recordId);
				}
			})));
		};
		_proto.hoverUrl = function hoverUrl(contents, fieldId, recordId, activePointInfo) {
			var hotRects = getUrlHotRects(contents);
			if (!hotRects.length) return;
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			for (var hotRect of hotRects) if (isHitRect(offsetX, offsetY, hotRect)) {
				this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, hotRect), {
					x: hotRect.x + contentX,
					y: hotRect.y + contentY,
					onMouseDown: () => this.mouseDownOnFeature = true,
					onClick: () => this.action.openCellLink(fieldId, recordId)
				})));
				this.dependApi.setCursor(Cursor.POINTER);
				return;
			}
		};
		_proto.hoverAttachment = function hoverAttachment(contents, fieldId, recordId, activePointInfo) {
			var _this, _loop = function(i) {
				var { x, y, width, height } = rectContents[i];
				var rect = {
					x,
					y,
					width,
					height
				};
				if (isHitRect(offsetX, offsetY, rect)) {
					_this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, rect), {
						x: rect.x + contentX,
						y: rect.y + contentY,
						onMouseDown: (event, stopPropagation) => {
							stopPropagation();
							var param = {
								type: ActivePointType.CONTENT_CLICK,
								cellData: standardCell.data[i],
								fieldId,
								recordId
							};
							_this.emitter.service.activePointEditor.fire(param);
							logger.info("[xview] active point content click", param.cellData);
						}
					})));
					return { v: void 0 };
				}
			};
			var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
			if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) return;
			if (this.hoverDeleteLabel(standardCell, contents, activePointInfo, fieldId, recordId)) return;
			var rectContents = contents.filter((content) => content.type === DrawType.Rect);
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			for (var i = 0; i < rectContents.length; i++) {
				var _ret = (_this = this, _loop(i));
				if (_type_of$1(_ret) === "object") return _ret.v;
			}
		};
		_proto.hoverLocation = function hoverLocation(contents, fieldId, recordId, activePointInfo) {
			var _this, _loop = function(i) {
				var content = contents[i];
				var rect = getUrlCombineHotRect([content]);
				if (isHitRect(offsetX, offsetY, rect)) {
					var pointX = rect.x + contentX;
					var pointY = rect.y + contentY;
					_this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, rect), {
						x: pointX,
						y: pointY,
						onMouseDown: (event, stopPropogation) => {
							var _a, _b;
							stopPropogation();
							var offset = {
								x: pointX,
								y: pointY
							};
							if (content.text === ",") return;
							var contentIndex = contents.filter((content, index) => index <= i).map((currentContent) => {
								var layoutContent = currentContent.layouts;
								if (!layoutContent) return "";
								return layoutContent[0].text;
							}).join("").split((_b = (_a = content.layouts) === null || _a === void 0 ? void 0 : _a[0].text) !== null && _b !== void 0 ? _b : "").length - 1;
							var satisfyData = standardCell.data.filter((locationData) => content.text && locationData.text.includes(content.text));
							if (!satisfyData.length) return;
							var { location } = satisfyData[contentIndex - 1];
							_this.emitter.service.locationPreview.fire({
								location,
								offset,
								fieldId,
								recordId
							});
						}
					})));
					return { v: void 0 };
				}
			};
			var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
			if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) return;
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			for (var i = 0; i < contents.length; i++) {
				var _ret = (_this = this, _loop(i));
				if (_type_of$1(_ret) === "object") return _ret.v;
			}
		};
		_proto.hoverImage = function hoverImage(contents, fieldId, recordId, activePointInfo) {
			var _this, _loop = function(i) {
				var { x, y, width, height } = contents[i];
				var rect = {
					x,
					y,
					width,
					height
				};
				if (isHitRect(offsetX, offsetY, rect)) {
					_this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, rect), {
						x: rect.x + contentX,
						y: rect.y + contentY,
						onMouseDown: (event, stopPropagation) => {
							stopPropagation();
							var param = {
								type: ActivePointType.CONTENT_CLICK,
								cellData: standardCell.data[i]
							};
							_this.emitter.service.activePointEditor.fire(param);
							logger.info("[xview] active point content click", param);
						}
					})));
					return { v: void 0 };
				}
			};
			var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
			if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) return;
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			for (var i = 0; i < contents.length; i++) {
				var _ret = (_this = this, _loop(i));
				if (_type_of$1(_ret) === "object") return _ret.v;
			}
		};
		_proto.hoverLinkRecord = function hoverLinkRecord(contents, fieldId, recordId, activePointInfo) {
			var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
			if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) return;
			if (this.hoverDeleteLabel(standardCell, contents, activePointInfo, fieldId, recordId)) return;
			this.hoverLinkRecordLabel(standardCell, contents, activePointInfo);
		};
		_proto.hoverLabelTypes = function hoverLabelTypes(contents, fieldId, recordId, activePointInfo) {
			var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
			if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) return;
			this.hoverDeleteLabel(standardCell, contents, activePointInfo, fieldId, recordId);
		};
		_proto.hoverDeleteLabel = function hoverDeleteLabel(standardCell, contents, activePointInfo, fieldId, recordId) {
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			var iconContents = contents.filter((content) => content.type === DrawType.Bitmap);
			if (iconContents.length) {
				var deleteIcons = iconContents.filter((iconContent) => isLabelCloseIcon(iconContent));
				if (deleteIcons) {
					var _this, _loop = function(i) {
						var { x, y, width, height } = deleteIcons[i];
						var deleteIconRect = {
							x,
							y,
							width,
							height
						};
						if (isHitRect(offsetX, offsetY, deleteIconRect)) {
							_this.dependApi.setCursor(Cursor.POINTER);
							_this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, deleteIconRect), {
								x: deleteIconRect.x + contentX,
								y: deleteIconRect.y + contentY,
								onMouseDown: (event, stopPropagation) => {
									var param = {
										type: ActivePointType.BUTTON_CLICK,
										buttonType: ActivePointButtonType.DELETE,
										cellData: standardCell.data[i],
										fieldId,
										recordId
									};
									_this.emitter.service.activePointEditor.fire(param);
									stopPropagation();
									logger.info("[xview] delete icon click", param);
								}
							})));
							return { v: true };
						}
					};
					for (var i = 0; i < deleteIcons.length; i++) {
						var _ret = (_this = this, _loop(i));
						if (_type_of$1(_ret) === "object") return _ret.v;
					}
				}
			}
		};
		_proto.hoverLinkRecordLabel = function hoverLinkRecordLabel(standardCell, contents, activePointInfo) {
			var { offsetX, offsetY } = this.getHitContentOffsetInfo(activePointInfo);
			var { rect } = activePointInfo;
			var { scrollLeft, scrollTop } = this.collector.range;
			var rectContents = contents.filter((content) => content.type === DrawType.Rect);
			if (rectContents.length) {
				var _this, _loop = function(i) {
					var { x, y, width, height } = rectContents[i];
					var rectRect = {
						x,
						y,
						width,
						height
					};
					if (isHitRect(offsetX, offsetY, rectRect)) {
						var { contentX, contentY } = _this.getHitContentOffsetInfo(activePointInfo);
						_this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, rectRect), {
							x: rectRect.x + contentX,
							y: rectRect.y + contentY,
							onClick: (event, stopPropagation) => {
								var param = {
									type: ActivePointType.CONTENT_CLICK,
									cellData: standardCell.data[i]
								};
								_this.emitter.service.activePointEditor.fire(param);
								stopPropagation();
								logger.info("[xview] active point content click", param);
							}
						})));
						if (_this.hoverLabelIndex === i) return { v: void 0 };
						_this.hoverLabelIndex = i;
						var param = {
							type: ActivePointType.CONTENT_HOVER,
							cellData: standardCell.data[i],
							cellDataRect: Object.assign(Object.assign({}, rectRect), {
								x: rectRect.x - rect.x - scrollLeft,
								y: rectRect.y - rect.y - scrollTop
							})
						};
						_this.emitter.service.activePointEditor.fire(param);
						logger.info("[xview] active point content hover", param);
						return { v: void 0 };
					}
				};
				for (var i = 0; i < rectContents.length; i++) {
					var _ret = (_this = this, _loop(i));
					if (_type_of$1(_ret) === "object") return _ret.v;
				}
				this.hoverLabelIndex = -1;
			}
		};
		_proto.hoverFormulaOrLookupError = function hoverFormulaOrLookupError(contents, fieldId, recordId, activePointInfo) {
			if ((contents === null || contents === void 0 ? void 0 : contents.length) !== 1) return;
			var bitmapOptions = contents[0];
			if (bitmapOptions.type !== DrawType.Bitmap) return;
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			if (isHitRect(offsetX, offsetY, bitmapOptions)) {
				var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
				if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) return;
				var error = getFormulaError(standardCell.data);
				if (!error) return;
				this.dependApi.showToolTip(this.dependApi.getTipText().getFormulaOrLookupErrorTip(error), Object.assign(Object.assign({}, bitmapOptions), {
					x: bitmapOptions.x + contentX,
					y: bitmapOptions.y + contentY
				}));
				return true;
			}
		};
		_proto.hoverUser = function hoverUser(contents, fieldId, recordId, activePointInfo) {
			var _this, _loop = function(i) {
				var { x, y, width, height } = rectContents[i];
				var rectRect = {
					x,
					y,
					width,
					height
				};
				if (isHitRect(offsetX, offsetY, rectRect)) {
					var cellRect = Object.assign(Object.assign({}, rectRect), {
						x: rectRect.x + contentX,
						y: rectRect.y + contentY
					});
					_this.dependApi.getGroup().add(pen.config.rect(Object.assign(Object.assign({}, cellRect), { onMouseDown: (event, stopPropagation) => {
						stopPropagation();
						var param = {
							type: ActivePointType.CONTENT_CLICK,
							cellData: standardCell.data[i],
							cellDataRect: Object.assign(Object.assign({}, rectRect), {
								x: rectRect.x - rect.x - scrollLeft,
								y: rectRect.y - rect.y - scrollTop
							})
						};
						_this.emitter.service.activePointEditor.fire(param);
						logger.info("[xview] active point content click user rect", param);
					} })));
					return { v: void 0 };
				}
			};
			var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
			if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) return;
			if (this.hoverDeleteLabel(standardCell, contents, activePointInfo, fieldId, recordId)) return;
			var { rect } = activePointInfo;
			var { scrollLeft, scrollTop } = this.collector.range;
			var rectContents = contents.filter((content) => content.type === DrawType.Rect);
			var { offsetX, offsetY, contentX, contentY } = this.getHitContentOffsetInfo(activePointInfo);
			for (var i = 0; i < rectContents.length; i++) {
				var _ret = (_this = this, _loop(i));
				if (_type_of$1(_ret) === "object") return _ret.v;
			}
		};
		/**
		* 获取当前鼠标位置和内容的偏移信息
		* 排版和 ActivePoint 的收集渲染的垂直坐标系不一样
		* 所以需要视具体情况加上 activityStartY
		* @todo contents 最好是统一坐标系
		* @param activePointInfo
		* @returns
		*/ _proto.getHitContentOffsetInfo = function getHitContentOffsetInfo(activePointInfo) {
			var isActivePoint = !!activePointInfo;
			var { range, size } = this.collector;
			var offsetDeltaX = range.scrollLeft;
			var contentDeltaX = offsetDeltaX;
			var offsetDeltaY = isActivePoint ? range.scrollTop : range.scrollTop - size.activityStartY;
			var contentDeltaY = (isActivePoint ? 0 : size.activityStartY) - range.scrollTop;
			var { offsetX, offsetY } = this.dependApi.getMouseOffset();
			return {
				offsetX: offsetX + offsetDeltaX,
				offsetY: offsetY + offsetDeltaY,
				contentX: -contentDeltaX,
				contentY: contentDeltaY
			};
		};
		_create_class$12(CellInteractive, [{
			key: "frozenRect",
			get: function() {
				var { globalRect, activityStartX } = this.collector.size;
				return Object.assign(Object.assign({}, globalRect), { x: activityStartX });
			}
		}]);
		return CellInteractive;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/exclude-frozen-x.js
/**
* 获取排除横向冻结区域的外的 x 和 width
* 因为可能会被横向滚动冻结区域盖住一段，比如列头被横向冻结盖住一半的情况下的 hover 态应该是排除冻结区域的
*/ function excludeFrozenX(x, columnInfo, collector) {
	var { width } = columnInfo;
	var { activityStartX } = collector.size;
	if (!columnInfo.isFrozen && x < activityStartX) return {
		x: activityStartX,
		width: width - (activityStartX - x)
	};
	return {
		x,
		width
	};
}
var init_exclude_frozen_x = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/utils/get-field-rect.js
function getFieldRect(columnInfo, collector) {
	var { size, range } = collector;
	return {
		x: columnInfo.x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
		y: size.globalPaddingTop,
		width: columnInfo.width,
		height: getFrozenEndY(collector) - size.globalPaddingTop
	};
}
var init_get_field_rect = __esmMin((() => {
	init_get_frozen_end_y();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/area-interactive/main.js
function _defineProperties$11(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _create_class$11(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties$11(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties$11(Constructor, staticProps);
	return Constructor;
}
function _inherits$35(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$35(subClass, superClass);
}
function _set_prototype_of$35(o, p) {
	_set_prototype_of$35 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$35(o, p);
}
/**
* 获取行展开按钮的信息
* @param recordRect
* @returns
*/ function getRecordExpandIconInfo(recordRect, globalPaddingLeft, firstColumnRight) {
	var iconPadding = 2;
	var iconSize = firstColumnRight != null ? style.size.iconSmall : style.size.iconUltraSmall;
	var expandWrapperSize = iconSize + iconPadding * 2;
	return {
		x: firstColumnRight != null ? firstColumnRight - style.size.cellPadding - expandWrapperSize : recordRect.x - Math.min(expandWrapperSize / 2, globalPaddingLeft),
		y: recordRect.y + (recordRect.height - expandWrapperSize) / 2,
		iconSize,
		wrapperSize: expandWrapperSize
	};
}
var GridAreaInteractive;
var init_main$18 = __esmMin((() => {
	init_es();
	init_es$1();
	init_pen();
	init_render_app_config();
	init_index_interface$1();
	init_production();
	init_resources();
	init_style();
	init_interface$21();
	init_constants();
	init_util_group_value();
	init_interface$23();
	init_scroller();
	init_grid_feature();
	init_active_point();
	init_cell_interactive();
	init_interface$16();
	init_exclude_frozen_x();
	init_get_cell_rect();
	init_get_field_rect();
	init_get_frozen_end_y();
	init_get_group_path();
	init_head_right_dropdown_rect();
	init_cursor();
	init_is_in_rect();
	GridAreaInteractive = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$35(GridAreaInteractive, GridFeatureBase);
		function GridAreaInteractive() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.offsetX = 0;
			_this.offsetY = 0;
			_this.expandElement = document.createElement("div");
			_this.wbExpandIconShown = false;
			/**
			* 当前鼠标是否 hover 在"选中态列的标题文字"区域上。
			* 用于通过 FeatureLock 锁住该状态下的其他 feature（如 GridFieldMove）对 cursor 的覆盖，
			* 避免选中列表头上的 TEXT cursor 被 GridFieldMove 设置的 GRAB cursor 覆盖。
			*/ _this.isHoveringColumnTitleText = false;
			/**
			* wb 宿主下 `onRecordClick` 的 mousedown → mouseup 之间的"点击意向"暂存。
			*
			* 为什么不在 mousedown 直接 fire：mousedown 会与拖拽（record-move / 选区拖选 / 列宽拖拽等）
			* 共存，此时若立即 fire onRecordClick，宿主可能过早打开 record 详情浮层、拦截后续拖拽。
			* 改为 mouseup 侧确认：只有当 mouseup 命中的 target 与 mousedown 同格、且鼠标位移小于阈值
			* （视为"点击而非拖拽"）才 fire——语义上贴合浏览器 click 事件、又不依赖 stage 层的 onClick。
			*/ _this.pendingWbRecordClick = null;
			_this.cellInteractive = _this._register(new CellInteractive(_this.collector, _this.emitter, _this.renderer, _this.action, {
				getTipText: () => _this.tipText,
				showToolTip: (title, rect) => _this.action.showToolTip(title, rect),
				getGroup: () => _this.group,
				getTopGroup: () => _this.topGroup,
				setCursor: _this.setCursor.bind(_this),
				getMouseOffset: () => ({
					offsetX: _this.offsetX,
					offsetY: _this.offsetY
				})
			}));
			_this.onStageResize = () => {
				_this.group.setAttrs(_this.globalHoverRect);
				_this.topGroup.setAttrs(_this.globalHoverRect);
				_this.rowGroup.setAttrs(_this.collector.size.globalViewBodyRect);
			};
			_this.onStageMouseLeave = () => {
				if (_this.collector.columns.checkColumnNeedClearHover()) {
					_this.renderer.render();
					return;
				}
				_this.render();
			};
			_this.onStageMouseMove = (evt) => {
				var _a;
				var targetElement = evt.event.target;
				if (!_this.context.getRenderRoot().contains(targetElement) || !isHitRect(evt.x, evt.y, _this.globalHoverRect)) {
					_this.target = void 0;
					return;
				}
				_this.clearBeforeAnyHover(targetElement.id === ((_a = _this.renderer.getFeature(IGridScroller)) === null || _a === void 0 ? void 0 : _a.getHorizontalId()));
				_this.target = evt.target;
				_this.offsetX = evt.x;
				_this.offsetY = evt.y;
				_this.handleHover();
			};
			_this.onStageMouseDown = (evt) => {
				_this.target = evt.target;
				if (!_this.target) return;
				var { rowInfo, columnInfo, isBlank } = _this.target;
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record && (rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.RecordAdd) _this.action.hideExpandRow();
				var resolved = _this.resolveWbRecordTargetAt(evt.x, evt.y, {
					rowInfo,
					columnInfo,
					isBlank
				});
				if (resolved) _this.pendingWbRecordClick = {
					recordId: resolved.recordId,
					fieldId: resolved.fieldId,
					downX: evt.x,
					downY: evt.y
				};
				else _this.pendingWbRecordClick = null;
			};
			/**
			* wb 宿主下的 `onRecordClick` 触发时机：在 mouseup 阶段判定"是否为一次 click"。
			*
			* 判定规则（三者全部满足才 fire）：
			*   1. 存在 mousedown 时保存的 pending 意向（说明 mousedown 命中的是可点击单元格）；
			*   2. 左键松开（右键用于唤起上下文菜单，不应触发 record 打开）；
			*   3. mouseup 命中的单元格与 mousedown 完全一致（同 recordId + 同 fieldId），并且
			*      鼠标位移在 `CLICK_MOVE_THRESHOLD` 以内 —— 视为"点击"而非拖拽/框选。
			* 无论是否 fire，走完本次 mouseup 后都清空 pending，避免跨次 mouse cycle 残留。
			*
			* 注意：mouseup 侧同样走 `resolveWbRecordTargetAt` 解析目标——保证「点击已展开的
			* active-point」时 mousedown / mouseup 两次解析都拿到 active-point 自身的 recordId，
			* 而不是被展开浮层覆盖到的下一行 recordId。
			*/ _this.onStageMouseUp = (evt) => {
				var _a;
				var pending = _this.pendingWbRecordClick;
				_this.pendingWbRecordClick = null;
				if (!pending) return;
				var resolved = _this.resolveWbRecordTargetAt(evt.x, evt.y, (_a = evt.target) !== null && _a !== void 0 ? _a : {});
				if (!resolved || resolved.recordId !== pending.recordId || resolved.fieldId !== pending.fieldId) return;
				var CLICK_MOVE_THRESHOLD = 4;
				if (Math.abs(evt.x - pending.downX) > CLICK_MOVE_THRESHOLD || Math.abs(evt.y - pending.downY) > CLICK_MOVE_THRESHOLD) return;
				var cellRect = getCellRect(resolved.fieldId, resolved.recordId, _this.collector);
				_this.context.emitter.wbService.onRecordClick.fire({
					recordId: resolved.recordId,
					fieldId: resolved.fieldId,
					cellRect
				});
			};
			_this.clearBeforeAnyHover = (ignoreTooltip = false) => {
				_this.group.clear();
				_this.topGroup.clear();
				_this.rowGroup.clear();
				if (!ignoreTooltip) _this.action.hideToolTip();
				if (domainConfig.getIsWb()) {
					if (_this.wbExpandIconShown && !_this.parentApi.getFloatState().isShow()) {
						_this.context.emitter.wbService.onGridExpandChange.fire(null);
						_this.wbExpandIconShown = false;
					}
					return;
				}
				if (_this.expandElement.parentElement && !_this.parentApi.getFloatState().isShow()) _this.expandElement.remove();
			};
			return _this;
		}
		var _proto = GridAreaInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			var { size } = this.collector;
			this.group = this._register(pen.group(this.globalHoverRect));
			this.topGroup = this._register(pen.group(this.globalHoverRect));
			this.rowGroup = this._register(pen.group(size.globalViewBodyRect));
			this.layer.addGroup(this.group);
			this.layer.addGroup(this.topGroup);
			this.layer.addGroup(this.rowGroup);
			this._register(this.UIEvent.document.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.document.onMouseUp(() => {
				this.cellInteractive.mouseDownOnFeature = false;
				this.pendingWbRecordClick = null;
			}));
			this._register(this.UIEvent.stage.onMouseLeave(this.onStageMouseLeave));
			this._register(this.UIEvent.stage.onResize(this.onStageResize));
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMouseDown));
			this._register(this.UIEvent.stage.onMouseUp(this.onStageMouseUp));
			this._register(this.collector.range.onScroll(() => {
				this.target = void 0;
			}));
		};
		_proto.dispose = function dispose(trace) {
			GridFeatureBase.prototype.dispose.call(this, trace);
			this.expandElement.remove();
		};
		_proto.render = function render() {
			var _a;
			this.clearBeforeAnyHover();
			if (!((_a = this.target) === null || _a === void 0 ? void 0 : _a.columnInfo) || !this.target.rowInfo) return;
			this.handleHover();
		};
		_proto.isExpandElement = function isExpandElement(target) {
			return target === this.expandElement || this.expandElement.contains(target);
		};
		_proto.showRecordExpand = function showRecordExpand(recordRect, recordId) {
			this.showRecordExpandIcon(recordRect, recordId);
		};
		_proto.isMouseDownOnFeature = function isMouseDownOnFeature() {
			return this.cellInteractive.mouseDownOnFeature;
		};
		_proto.reset = function reset() {
			this.setCursor(Cursor.DEFAULT);
			this.clearBeforeAnyHover();
			this.action.hideToolTip();
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGridAreaInteractive,
				isLock: () => this.isHoveringColumnTitleText
			} };
		};
		/**
		* 解析当前鼠标坐标下 wb `onRecordClick` 的目标单元格 `(recordId, fieldId)`。
		*
		* 【为什么要引入这层解析】当选中态浮层（active-point）按内容撑开、高度超过单元格行高时，
		* 浮层在视觉上会覆盖到下一行区域。此时 stage 的 hit-test 会把命中的 `rowInfo` 判成下一行 —
		* 若直接用 `target.rowInfo.recordId`，「点击已展开的选中格」就会错误地 fire 成"下一行的
		* recordId + cellRect"（对应 issue：截图中 rWTR7b 展开后点浮层内部触发了 rSmk9C）。
		*
		* 修复策略：先看鼠标坐标是否落在 active-point 的展开 rect 内。若是，则把目标改写为
		* active-point 自身的 `(fieldId, recordId)`——即用户视觉上真正点击的那个已选中单元格。
		* 否则回退到 target 提供的 rowInfo/columnInfo。
		*
		* @returns 命中「可 fire onRecordClick 的单元格」时返回 `{recordId, fieldId}`；否则返回 null。
		*/ _proto.resolveWbRecordTargetAt = function resolveWbRecordTargetAt(x, y, target) {
			var _a;
			if (!domainConfig.getIsWb()) return null;
			var activePointInfo = (_a = this.renderer.getFeature(IGridActivePoint)) === null || _a === void 0 ? void 0 : _a.getActivePointInfo(true);
			if ((activePointInfo === null || activePointInfo === void 0 ? void 0 : activePointInfo.rect) && activePointInfo.recordId && isHitRect(x, y, activePointInfo.rect)) {
				var columnInfo = this.collector.columns.getInfoByFieldId(activePointInfo.fieldId);
				if ((columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.isField) && columnInfo.id !== "Operator" && columnInfo.id !== "Addition") return {
					recordId: activePointInfo.recordId,
					fieldId: activePointInfo.fieldId
				};
				return null;
			}
			var { rowInfo, columnInfo: columnInfo1, isBlank } = target;
			if (!isBlank && (rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) === RowType.Record && (columnInfo1 === null || columnInfo1 === void 0 ? void 0 : columnInfo1.isField) && columnInfo1.id !== "Operator" && columnInfo1.id !== "Addition") return {
				recordId: rowInfo.recordId,
				fieldId: columnInfo1.id
			};
			return null;
		};
		_proto.handleHover = function handleHover() {
			this.isHoveringColumnTitleText = false;
			if (this.isPreventFromOtherFeature()) return;
			this.action.hideToolTip();
			this.setCursor(Cursor.DEFAULT);
			if (this.collector.state.isHideGrid) return;
			var activePointFeature = this.renderer.getFeature(IGridActivePoint);
			var activePointInfo = activePointFeature === null || activePointFeature === void 0 ? void 0 : activePointFeature.getActivePointInfo(true);
			if (activePointInfo && isHitRect(this.offsetX, this.offsetY, activePointInfo.rect)) {
				this.topGroup.toTop();
				this.hoverActivePoint(activePointInfo);
				return;
			}
			if (!this.target || this.target.isBlank || this.parentApi.getFloatState().isShow()) return;
			if (this.target) if (this.context.customConfig && !this.context.customConfig.featureServiceConfig.record_hover) this.handleLiteTargetHover();
			else this.handleTargetHover();
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGridAreaInteractive);
		};
		_proto.handleLiteTargetHover = function handleLiteTargetHover() {
			var _a;
			var { target } = this;
			if (!(target === null || target === void 0 ? void 0 : target.columnInfo)) return;
			var { activityStartY } = this.collector.size;
			if (target.columnInfo && this.offsetY < activityStartY) {
				this.group.setAttr("y", 0);
				this.hoverLiteColumn(target.columnInfo);
				return;
			}
			this.group.setAttr("y", activityStartY);
			if (((_a = target.rowInfo) === null || _a === void 0 ? void 0 : _a.type) === RowType.Record) {
				this.hoverLiteRecord(target.columnInfo, target.rowInfo);
				return;
			}
		};
		_proto.handleTargetHover = function handleTargetHover() {
			var _a, _b, _c, _d, _e, _f;
			var { target } = this;
			if (!(target === null || target === void 0 ? void 0 : target.columnInfo)) return;
			var { activityStartY } = this.collector.size;
			if (target.columnInfo && this.offsetY < activityStartY) {
				this.group.setAttr("y", 0);
				this.hoverColumn(target.columnInfo);
				return;
			}
			if (this.collector.columns.checkColumnNeedClearHover()) this.renderer.render();
			this.group.setAttr("y", activityStartY);
			if (((_a = target.rowInfo) === null || _a === void 0 ? void 0 : _a.type) === RowType.Stat) {
				this.hoverStat(target.columnInfo, target.rowInfo);
				return;
			}
			this.action.openStatOperatorPanel(target.columnInfo, target.rowInfo, false);
			if (((_b = target.rowInfo) === null || _b === void 0 ? void 0 : _b.type) === RowType.GroupStat) {
				this.hoverGlobalStat(target.columnInfo, target.rowInfo);
				return;
			}
			if (((_c = target.rowInfo) === null || _c === void 0 ? void 0 : _c.type) === RowType.GroupHead) {
				this.hoverGroupHead(target.columnInfo, target.rowInfo);
				return;
			}
			if (((_d = target.rowInfo) === null || _d === void 0 ? void 0 : _d.type) === RowType.Record) {
				this.hoverRecord(target.columnInfo, target.rowInfo);
				return;
			}
			if (((_e = target.rowInfo) === null || _e === void 0 ? void 0 : _e.type) === RowType.RecordAdd) {
				if (this.collector.widgetCollector.isPinnedRowInfo(target.rowInfo) && target.columnInfo.isField) {
					this.hoverGlobalStat(target.columnInfo, target.rowInfo);
					return;
				}
				this.hoverRecordAdd(target.rowInfo);
				return;
			}
			if (((_f = target.rowInfo) === null || _f === void 0 ? void 0 : _f.type) === RowType.GroupAdd) {
				this.hoverGroupAdd(target.rowInfo);
				return;
			}
		};
		_proto.hoverActivePoint = function hoverActivePoint(activePointInfo) {
			var { fieldId, recordId } = activePointInfo;
			var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
			var rowInfo = this.collector.rows.getInfoByRecordId(recordId);
			if (!columnInfo || !rowInfo) return;
			this.cellInteractive.hoverActivePoint();
			this.cellInteractive.handleHoverCursor(columnInfo, rowInfo, activePointInfo);
			this.hoverRecord(columnInfo, rowInfo);
		};
		_proto.hoverLiteColumn = function hoverLiteColumn(columnInfo) {
			if (columnInfo.id === "Operator") {
				this.hoverColumnOperator(columnInfo);
				return;
			}
		};
		_proto.hoverColumn = function hoverColumn(columnInfo) {
			var _a, _b, _c;
			if (this.isHoveringFieldGroupHeader()) {
				if (this.hoverFieldGroupHeader(columnInfo)) return;
			}
			if (this.collector.state.isSelectedField(columnInfo.id)) {
				this.checkFieldHover(columnInfo);
				return;
			}
			var { x, width } = this.getXAndWidth(columnInfo);
			var columnRect = {
				x,
				y: columnInfo.y,
				width,
				height: columnInfo.height
			};
			if (columnInfo.id === "Operator") {
				this.hoverColumnOperator(columnInfo);
				return;
			}
			if (columnInfo.id === "Addition") {
				this.hoverColumnAddition(columnRect);
				return;
			}
			if (columnInfo.isHover === false) {
				this.collector.columns.setColumnHovering(columnInfo.index);
				this.renderer.render();
			}
			if (!this.context.isDashboardLite) this.group.add(pen.config.rect(Object.assign(Object.assign(Object.assign({}, columnRect), style.defaultLineConfig), {
				height: getFrozenEndY(this.collector) - columnInfo.y,
				background: style.color.hoverBackground
			})));
			var { isField, isFrozen } = columnInfo;
			var leftIcon = (_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.leftIcon;
			if (isField && leftIcon && this.canEditField) {
				var fieldType = this.collector.dataUtil.getFieldByFieldId(columnInfo.id).type;
				var fieldExplanation = (_c = (_b = fieldHelper.get(fieldType)).getExplanation) === null || _c === void 0 ? void 0 : _c.call(_b);
				var leftIconRect = {
					x: leftIcon.x - (isFrozen ? 0 : this.collector.range.scrollLeft),
					y: leftIcon.y,
					width: leftIcon.width,
					height: leftIcon.height
				};
				if (fieldExplanation && isHitRect(this.offsetX, this.offsetY, leftIconRect)) this.action.showToolTip(fieldExplanation, leftIconRect);
			}
			this.checkFieldHover(columnInfo);
		};
		/**
		* 鼠标是否悬停在编组头行（表头上半行）上。
		* 仅在存在可见列编组时成立；否则认为所有表头都是字段头行。
		*/ _proto.isHoveringFieldGroupHeader = function isHoveringFieldGroupHeader() {
			var { dataUtil, size } = this.collector;
			if (!dataUtil.hasVisibleFieldGroup()) return false;
			return this.offsetY < size.globalPaddingTop + size.fieldGroupHeaderHeight;
		};
		/**
		* 鼠标悬停在编组头行时的处理：
		* - 若当前位置属于某个编组 → 绘制覆盖整个编组矩形的 hover 背景（不触发单列 hover，避免错位高亮）
		*   同时在右侧绘制 dropdown 图标，点击后通知上层显示「编组」右键面板
		* - 若不属于编组（如独立列的上半行空白区） → 清除已有的列 hover 态
		*/ /**
		* 鼠标悬停在编组头行时的处理。
		* @returns true 表示已消费（属于某个编组），false 表示独立列上半区，需继续走单列 hover
		*/ _proto.hoverFieldGroupHeader = function hoverFieldGroupHeader(columnInfo) {
			if (this.context.isDashboardLite) return true;
			var rect = columnInfo.fieldGroupRect;
			if (!columnInfo.fieldGroupId || !rect) return false;
			if (this.collector.columns.checkColumnNeedClearHover()) this.renderer.render();
			var { range, size } = this.collector;
			var offsetX = columnInfo.isFrozen ? 0 : range.scrollLeft;
			var clipRect = !columnInfo.isFrozen ? Object.assign(Object.assign({}, size.globalRect), { x: size.activityStartX }) : void 0;
			this.group.add(pen.config.rect(Object.assign(Object.assign({
				x: rect.x - offsetX,
				y: rect.y,
				width: rect.width,
				height: rect.height
			}, style.defaultLineConfig), { background: style.color.hoverBackground })), 0, 0, clipRect);
			var isHitDropdown = false;
			if (!domainConfig.getIsWb()) {
				var dropdownInfo = getHeadRightDropdownInfo({
					x: rect.x - offsetX,
					y: rect.y,
					width: rect.width,
					height: rect.height
				});
				if (!dropdownInfo) return true;
				isHitDropdown = isHitRect(this.offsetX, this.offsetY, dropdownInfo.rect);
				if (isHitDropdown) {
					this.group.add(pen.config.rect(Object.assign(Object.assign({}, dropdownInfo.rect), {
						background: style.color.hoverBackground,
						borderRadius: style.size.borderRadius,
						onMouseDown: (event) => {
							if (event.button === 0) this.action.clickFieldGroupDropdown(event, columnInfo);
							this.action.hideToolTip();
						}
					})), 0, 0, clipRect);
					this.action.showToolTip(this.tipText.getFieldSettingTip(), dropdownInfo.rect);
				}
				this.group.add(pen.config.icon(NormalIconAlias.DROPDOWN, dropdownInfo.icon), 0, 0, clipRect);
			}
			var fieldGroupScreenRect = {
				x: rect.x - offsetX,
				y: rect.y,
				width: rect.width,
				height: rect.height
			};
			this.checkHoverFieldGroupTitleText(columnInfo, fieldGroupScreenRect, clipRect, isHitDropdown);
			return true;
		};
		/**
		* 编组标题文字 hover：与列标题文字 hover 对齐（见 checkHoverColumnTitleText）。
		* - 仅在编组已被整组选中时支持（对齐 jumper-view checkFieldGroupSelected 的语义）
		* - 命中时：绘制高亮背景 + setCursor(TEXT) + 点击触发编组标题重命名
		*   点击时先 setFieldGroupTitleRect 再 selectRange({row:-1,column:firstIndex})，
		*   以便 GridActivePoint.getActivePointInfo 输出 clickFieldGroupTitleRect，
		*   上层 edit-cell.service 据此走 fieldGroup 编辑器
		*/ _proto.checkHoverFieldGroupTitleText = function checkHoverFieldGroupTitleText(columnInfo, fieldGroupScreenRect, clipRect, isHitDropdown) {
			if (domainConfig.getIsWb()) return;
			if (!this.canEditField) return;
			if (isHitDropdown) return;
			var { fieldGroupId, fieldGroupName } = columnInfo;
			if (!fieldGroupId) return;
			if (!this.isFieldGroupFullySelected(fieldGroupId)) return;
			var text = (fieldGroupName || "").replace(/[\r\n]+/g, "");
			if (!text) return;
			var fontSize = style.size.fontSizeNormal;
			var textWidth = pen.util.measureTextWidth(text, fontSize);
			var maxWidth = fieldGroupScreenRect.width - this.collector.size.fieldIconMarginLeft * 2;
			var displayWidth = Math.min(textWidth, maxWidth);
			if (displayWidth <= 0) return;
			var titleRect = {
				x: fieldGroupScreenRect.x + (fieldGroupScreenRect.width - displayWidth) / 2,
				y: fieldGroupScreenRect.y + (fieldGroupScreenRect.height - style.size.iconNormal) / 2,
				width: displayWidth,
				height: style.size.iconNormal
			};
			if (!isHitRect(this.offsetX, this.offsetY, titleRect)) return;
			this.isHoveringColumnTitleText = true;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, titleRect), {
				background: style.color.tspMediumBackground,
				borderRadius: style.size.borderRadius,
				onMouseDown: (_event) => {
					var _a;
					var indexes = this.collector.dataUtil.getFieldIndexesInFieldGroup(fieldGroupId);
					if (indexes.length === 0) return;
					var firstIndex = Math.min(...indexes);
					(_a = this.renderer.getFeature(IGridActivePoint)) === null || _a === void 0 || _a.setFieldGroupTitleRect(fieldGroupScreenRect);
					this.rangeModel.selectRange({
						startRow: -1,
						endRow: -1,
						startColumn: firstIndex,
						endColumn: firstIndex
					}, {
						row: -1,
						column: firstIndex
					});
				}
			})), 0, 0, clipRect);
			this.setCursor(Cursor.TEXT);
			if (textWidth > maxWidth) this.action.showToolTip(text, titleRect);
		};
		/**
		* 判断编组是否被"整组选中"：编组内所有可见字段都在当前列选区内
		* 对齐 field-move 中同名方法的语义
		*/ _proto.isFieldGroupFullySelected = function isFieldGroupFullySelected(fieldGroupId) {
			var indexes = this.collector.dataUtil.getFieldIndexesInFieldGroup(fieldGroupId);
			if (indexes.length === 0) return false;
			var visibleFieldIds = this.collector.dataUtil.getVisibleFieldIds();
			return indexes.every((idx) => {
				var fId = visibleFieldIds[idx];
				return !!fId && this.collector.state.isSelectedField(fId);
			});
		};
		_proto.checkFieldHover = function checkFieldHover(columnInfo) {
			var _a;
			if (this.collector.dataUtil.getContext().isDashboardLite) return;
			this.checkHoverRightDropdownArea(columnInfo);
			this.checkHoverColumnTopText(columnInfo);
			this.checkHoverColumnAICloseIcon(columnInfo);
			this.checkHoverColumnAIErrorIcon(columnInfo);
			this.checkHoverColumnFilterIcon(columnInfo);
			this.checkHoverColumnTitleText(columnInfo);
			var field = this.collector.getField(columnInfo.id);
			if (field && field.getType() === FieldType.FORMULA) {
				if (!field.isCalculateEnd()) {
					var fieldRect = getFieldRect(columnInfo, this.collector);
					fieldRect.y += 4;
					(_a = this.modelChangeDisposer) === null || _a === void 0 || _a.dispose();
					this.modelChangeDisposer = this.collector.dataUtil.getContext().getCore().behaviorApi.onDidChangeModel(() => {
						if (field.isCalculateEnd()) this.action.hideToolTip();
					});
					this.action.showToolTip(this.tipText.getFormulaLoadingFieldTip(field), fieldRect);
					return;
				}
			}
		};
		/**
		* 选中态下，hover 到列标题文字区域时，显示高亮背景并设置 text cursor，
		* 与 xtable-jumper-view 中 FieldTitle.tsx 的 containerDecoration 逻辑对齐。
		*/ _proto.checkHoverColumnTitleText = function checkHoverColumnTitleText(columnInfo) {
			var _a, _b, _c, _d;
			if (domainConfig.getIsWb()) return;
			if (!this.canEditField) return;
			if (!this.collector.state.isSelectedField(columnInfo.id)) return;
			var text = (_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.text;
			if (!text) return;
			var { isFrozen } = columnInfo;
			var { range } = this.collector;
			var clipRect = !isFrozen ? Object.assign(Object.assign({}, this.collector.size.globalRect), { x: this.collector.size.activityStartX }) : void 0;
			var textWidth = ((_b = text === null || text === void 0 ? void 0 : text.layouts) === null || _b === void 0 ? void 0 : _b[0].width) || text.width;
			var titleRect = {
				x: text.x - (isFrozen ? 0 : range.scrollLeft),
				y: text.y + (text.height - style.size.iconNormal) / 2,
				width: textWidth,
				height: style.size.iconNormal
			};
			if (isHitRect(this.offsetX, this.offsetY, titleRect)) {
				this.isHoveringColumnTitleText = true;
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, titleRect), {
					background: style.color.tspMediumBackground,
					borderRadius: style.size.borderRadius,
					onMouseDown: (_event) => {
						var columnIndex = this.collector.dataUtil.getVisibleFieldIds().indexOf(columnInfo.id);
						if (columnIndex < 0) return;
						this.rangeModel.selectRange({
							startRow: -1,
							endRow: -1,
							startColumn: columnIndex,
							endColumn: columnIndex
						}, {
							row: -1,
							column: columnIndex
						});
					}
				})), 0, 0, clipRect);
				this.setCursor(Cursor.TEXT);
				if ((_c = columnInfo.activeDrawConfig) === null || _c === void 0 ? void 0 : _c.hasEllipsis) {
					var fullTitle = ((_d = this.collector.dataUtil.getFieldByFieldId(columnInfo.id)) === null || _d === void 0 ? void 0 : _d.getTitle()) || "";
					if (fullTitle) this.action.showToolTip(fullTitle, titleRect);
				}
			}
		};
		_proto.checkHoverRightDropdownArea = function checkHoverRightDropdownArea(columnInfo) {
			var _a;
			if (domainConfig.getIsWb()) return;
			if (!((_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.rightIconRect)) return;
			var { range } = this.collector;
			var { x, y, width, height } = columnInfo.activeDrawConfig.rightIconRect;
			var clipRect = !columnInfo.isFrozen ? Object.assign(Object.assign({}, this.collector.size.globalRect), { x: this.collector.size.activityStartX }) : void 0;
			var dropdownRect = {
				x: x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
				y,
				width,
				height
			};
			if (isHitRect(this.offsetX, this.offsetY, dropdownRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, dropdownRect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius,
					onMouseDown: (event) => {
						if (event.button === 0) this.action.clickFieldDropdown(event, columnInfo);
						this.action.hideToolTip();
					}
				})), 0, 0, clipRect);
				this.action.showToolTip(this.tipText.getFieldSettingTip(), dropdownRect);
			}
		};
		_proto.checkHoverColumnTopText = function checkHoverColumnTopText(columnInfo) {
			if (!this.canEditField) return;
			var { topText, isFrozen } = columnInfo;
			if (topText) {
				var topTextRect = {
					x: topText.x - (isFrozen ? 0 : this.collector.range.scrollLeft),
					y: topText.y,
					width: topText.width,
					height: topText.height
				};
				if (isHitRect(this.offsetX, this.offsetY, topTextRect)) {
					this.group.add(pen.config.rect(Object.assign(Object.assign({}, topTextRect), {
						background: style.color.hoverBackground,
						borderRadius: style.size.borderRadius,
						onMouseDown: () => {
							this.action.clickOpenGanttSetting();
							this.action.hideToolTip();
						}
					})));
					this.action.showToolTip(this.tipText.getGanttFieldTip(columnInfo.id), topTextRect);
				}
			}
		};
		_proto.checkHoverColumnAICloseIcon = function checkHoverColumnAICloseIcon(columnInfo) {
			var _a, _b;
			if (!((_b = (_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.aiLoadings) === null || _b === void 0 ? void 0 : _b.length)) return;
			var { range } = this.collector;
			var { x, y, width, height } = columnInfo.activeDrawConfig.aiLoadings[2];
			var clipRect = !columnInfo.isFrozen ? Object.assign(Object.assign({}, this.collector.size.globalRect), { x: this.collector.size.activityStartX }) : void 0;
			var aiCloseRect = {
				x: x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
				y,
				width,
				height
			};
			if (isHitRect(this.offsetX, this.offsetY, aiCloseRect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, aiCloseRect), {
				background: style.color.hoverBackground,
				onMouseDown: () => {
					this.action.clickAIStop(columnInfo.id);
				}
			})), 0, 0, clipRect);
		};
		_proto.checkHoverColumnAIErrorIcon = function checkHoverColumnAIErrorIcon(columnInfo) {
			var _a, _b;
			if (((_b = (_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.markIcon) === null || _b === void 0 ? void 0 : _b.id) !== NormalIconAlias.MINITAG_AI_ERROR) return;
			var { range } = this.collector;
			var { x, y, width, height } = columnInfo.activeDrawConfig.markIcon;
			var aiErrorRect = {
				x: x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
				y,
				width,
				height
			};
			var fieldId = columnInfo.id;
			if (isHitRect(this.offsetX, this.offsetY, aiErrorRect)) {
				var errorCode = this.collector.dataUtil.getAIErrCode(fieldId);
				var columnRect = {
					x: columnInfo.x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
					y: columnInfo.y,
					width: columnInfo.width,
					height: columnInfo.height
				};
				this.action.showToolTip(this.tipText.getAIErrorTip(errorCode, () => {
					this.emitter.service.fieldEditor.fire({
						fieldId,
						rect: columnRect
					});
				}), aiErrorRect, { delayHide: 1e3 });
			}
		};
		_proto.checkHoverColumnFilterIcon = function checkHoverColumnFilterIcon(columnInfo) {
			var _a, _b, _c;
			if (!((_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.filterIcon)) return;
			var { range } = this.collector;
			var { x, y, width, height } = columnInfo.activeDrawConfig.filterIcon;
			var clipRect = !columnInfo.isFrozen ? Object.assign(Object.assign({}, this.collector.size.globalRect), { x: this.collector.size.activityStartX }) : void 0;
			var filterRect = {
				x: x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
				y,
				width,
				height
			};
			if (isHitRect(this.offsetX, this.offsetY, filterRect)) {
				this.group.add(pen.config.icon(NormalIconAlias.FIELD_FILTER_ACTIVE, Object.assign(Object.assign({}, filterRect), { onMouseDown: () => {
					this.action.openFilterPanel(columnInfo.id);
				} })), 0, 0, clipRect);
				this.action.showToolTip(this.tipText.getFilterColumnTip({
					title: (_b = columnInfo.activeDrawConfig.text) === null || _b === void 0 ? void 0 : _b.text,
					isFilter: this.collector.dataUtil.isFieldHasFilter(columnInfo.id),
					hasEllipsis: (_c = columnInfo.activeDrawConfig) === null || _c === void 0 ? void 0 : _c.hasEllipsis
				}), filterRect);
			}
		};
		_proto.hoverColumnOperator = function hoverColumnOperator(columnInfo) {
			var _a;
			var leftIcon = (_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.leftIcon;
			if (!leftIcon) return;
			var { x, y, width, height } = leftIcon;
			var iconRect = {
				x,
				y,
				width,
				height
			};
			if (leftIcon && isHitRect(this.offsetX, this.offsetY, iconRect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, iconRect), {
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onMouseUp: () => this.action.clickOperatorCheckbox()
			})));
		};
		_proto.hoverColumnAddition = function hoverColumnAddition(columnRect) {
			if (!this.canInsertField) return;
			var { borderRadius } = style.size;
			var additionRadius = [
				0,
				borderRadius,
				borderRadius,
				0
			];
			if (Array.isArray(this.collector.profile.headRadius)) additionRadius[2] = 0;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, columnRect), {
				background: style.color.hoverBackground,
				borderRadius: additionRadius,
				onMouseUp: () => this.action.clickFieldAdd(columnRect)
			})));
			this.action.showToolTip(this.tipText.getFieldAddTip(), columnRect);
		};
		_proto.hoverStat = function hoverStat(columnInfo, rowInfo) {
			if (columnInfo.id === "Operator") {
				this.action.openStatOperatorPanel(columnInfo, rowInfo, true);
				return;
			}
			if (!columnInfo.isField) return;
			this.hoverStatCell(columnInfo, rowInfo, { isGlobal: true });
		};
		/**
		* 新视觉：全局列统计（GroupStat 行 / 吸附模式下的 RecordAdd 行）的 per-cell hover
		*/ _proto.hoverGlobalStat = function hoverGlobalStat(columnInfo, rowInfo) {
			if (columnInfo.id === "Operator") {
				this.action.openStatOperatorPanel(columnInfo, rowInfo, true);
				return;
			}
			if (columnInfo.id === "Addition" || !columnInfo.isField) return;
			this.hoverStatCell(columnInfo, rowInfo, { isGlobal: true });
		};
		/**
		* 列统计单元格的 hover 绘制（全局统计 / 分组头统计 复用）
		* - 有统计值：整个单元格 hoverBackground + 在 label 右侧叠加 DROPDOWN_STAT 图标（通过覆盖原 label 后重绘，避免与右对齐布局冲突）
		* - 无统计值：整个单元格 hoverBackground + "统计" 占位文案 + DROPDOWN_STAT 图标
		*/ _proto.hoverStatCell = function hoverStatCell(columnInfo, rowInfo, options) {
			if (!this.canEditStat) return;
			if (!this.collector.dataUtil.isFieldStatEnabled()) return;
			var { isGlobal } = options;
			var groupPath = getRowInfoGroupPath(rowInfo, this.collector.rows);
			var statResult = this.collector.dataUtil.getStatResult(columnInfo.id, groupPath);
			var cellRect = this.getStatCellRect(columnInfo, rowInfo);
			if (!isHitRect(this.offsetX, this.offsetY, cellRect)) return;
			var layoutIndex = rowInfo.index;
			var parentLayoutIndex = rowInfo.parent;
			var onClick = () => {
				this.action.clickStat(columnInfo.id, cellRect, isGlobal, layoutIndex, parentLayoutIndex, statResult);
			};
			var statHoverClipRect = this.getHoverClipRectForRow(rowInfo);
			if (statResult) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, this.getStatHoverRect(cellRect)), {
					background: style.color.hoverBackground,
					onMouseUp: onClick
				})), 0, 0, statHoverClipRect);
				this.drawStatHoverDropdownOnly(columnInfo, rowInfo, { anchor: isGlobal ? "label" : "value" }, statHoverClipRect);
			} else {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, this.getStatHoverRect(cellRect)), {
					background: style.color.hoverBackground,
					onMouseUp: onClick
				})), 0, 0, statHoverClipRect);
				this.drawStatHoverEmptyPlaceholder(cellRect, statHoverClipRect);
			}
		};
		/**
		* 统计单元格 hover 背景矩形：相对 cellRect 上下各收缩一个 borderWidth，
		* 避免 hover 色块覆盖单元格上下边框线
		*/ _proto.getStatHoverRect = function getStatHoverRect(cellRect) {
			var { borderWidth } = style.size;
			return {
				x: cellRect.x,
				y: cellRect.y + borderWidth,
				width: cellRect.width,
				height: Math.max(0, cellRect.height - borderWidth * 2)
			};
		};
		/**
		* 垂直布局（全局列统计新视觉，左对齐）的 hover 效果：
		* 原 label/value 未被背景遮挡，只需在 label 右侧叠加一个 dropdown 图标即可
		*/ _proto.drawStatHoverDropdownOnly = function drawStatHoverDropdownOnly(columnInfo, rowInfo, options = { anchor: "label" }, clipArea) {
			var _a, _b;
			var groupPath = getRowInfoGroupPath(rowInfo, this.collector.rows);
			var statInfo = this.collector.contents.getStatInfo(columnInfo.id, groupPath);
			if (!statInfo || statInfo.length < 2) return;
			var [labelConfig, valueConfig] = statInfo;
			var labelLayout = (_a = labelConfig === null || labelConfig === void 0 ? void 0 : labelConfig.layouts) === null || _a === void 0 ? void 0 : _a[0];
			var valueLayout = (_b = valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.layouts) === null || _b === void 0 ? void 0 : _b[0];
			if (!labelLayout || !valueLayout) return;
			var { range, size, widgetCollector } = this.collector;
			var scrollLeftOffset = columnInfo.isFrozen ? 0 : range.scrollLeft;
			var rowYOffset = widgetCollector.isPinnedRowInfo(rowInfo) ? widgetCollector.getPinnedInnerRect(rowInfo).y + size.activityStartY : size.activityStartY - this.getEffectiveScrollTopForRow(rowInfo);
			var iconSize = style.size.iconSmall;
			var iconMarginLeft = 2;
			var anchorConfig = options.anchor === "value" ? valueConfig : labelConfig;
			var anchorLayout = options.anchor === "value" ? valueLayout : labelLayout;
			var anchorScreenRightX = anchorConfig.x + anchorLayout.x + anchorLayout.width - scrollLeftOffset;
			var labelScreenY = labelConfig.y + labelLayout.y + rowYOffset;
			this.group.add(pen.config.icon(NormalIconAlias.DROPDOWN_STAT, {
				x: anchorScreenRightX + iconMarginLeft,
				y: labelScreenY + (labelLayout.height - iconSize) / 2,
				width: iconSize,
				height: iconSize
			}), 0, 0, clipArea);
		};
		/**
		* 水平布局（分组统计，右对齐）的 hover 内容：
		* dropdown 要放在 value 之后，整体可能左移让位 → 用不透明背景覆盖原 label/value，再重绘 label+value+dropdown
		* @param cellRect 用于判断是否需要左移的边界矩形（屏幕坐标）；默认使用整个单元格
		*/ _proto.drawStatHoverValueContent = function drawStatHoverValueContent(columnInfo, rowInfo, cellRect, clipArea) {
			var _a, _b;
			var groupPath = getRowInfoGroupPath(rowInfo, this.collector.rows);
			var statInfo = this.collector.contents.getStatInfo(columnInfo.id, groupPath);
			if (!statInfo || statInfo.length < 2) return;
			var [labelConfig, valueConfig] = statInfo;
			var labelLayout = (_a = labelConfig === null || labelConfig === void 0 ? void 0 : labelConfig.layouts) === null || _a === void 0 ? void 0 : _a[0];
			var valueLayout = (_b = valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.layouts) === null || _b === void 0 ? void 0 : _b[0];
			if (!labelLayout || !valueLayout) return;
			var { range, size, widgetCollector } = this.collector;
			var scrollLeftOffset = columnInfo.isFrozen ? 0 : range.scrollLeft;
			var rowYOffset = widgetCollector.isPinnedRowInfo(rowInfo) ? widgetCollector.getPinnedInnerRect(rowInfo).y + size.activityStartY : size.activityStartY - this.getEffectiveScrollTopForRow(rowInfo);
			var iconSize = style.size.iconSmall;
			var iconMarginLeft = 2;
			var originLabelScreenLeftX = labelConfig.x + labelLayout.x - scrollLeftOffset;
			var labelScreenY = labelConfig.y + labelLayout.y + rowYOffset;
			var originValueScreenLeftX = valueConfig.x + valueLayout.x - scrollLeftOffset;
			var originValueScreenRightX = originValueScreenLeftX + valueLayout.width;
			var valueScreenY = valueConfig.y + valueLayout.y + rowYOffset;
			var boundaryRect = cellRect !== null && cellRect !== void 0 ? cellRect : this.getStatCellRect(columnInfo, rowInfo);
			var boundaryRightX = boundaryRect.x + boundaryRect.width - style.size.cellPadding;
			var desiredDropdownRight = originValueScreenRightX + iconMarginLeft + iconSize;
			var contentShiftLeft = Math.max(0, desiredDropdownRight - boundaryRightX);
			var newLabelScreenLeftX = originLabelScreenLeftX - contentShiftLeft;
			var newValueScreenLeftX = originValueScreenLeftX - contentShiftLeft;
			var newValueScreenRightX = originValueScreenRightX - contentShiftLeft;
			var dropdownY = labelScreenY + (labelLayout.height - iconSize) / 2;
			var redrawTextCommonProps = {
				verticalAlign: "top",
				align: "left",
				lineHeight: 1,
				wrap: "none",
				ellipsis: true
			};
			this.group.add(pen.config.text(Object.assign(Object.assign({}, redrawTextCommonProps), {
				x: newLabelScreenLeftX,
				y: labelScreenY,
				width: labelLayout.width,
				height: labelLayout.height,
				text: labelConfig.text,
				fontSize: labelConfig.fontSize,
				color: labelConfig.color,
				fontStyle: labelConfig.fontStyle
			})), 0, 0, clipArea);
			this.group.add(pen.config.text(Object.assign(Object.assign({}, redrawTextCommonProps), {
				x: newValueScreenLeftX,
				y: valueScreenY,
				width: valueLayout.width,
				height: valueLayout.height,
				text: valueConfig.text,
				fontSize: valueConfig.fontSize,
				color: valueConfig.color,
				fontStyle: valueConfig.fontStyle
			})), 0, 0, clipArea);
			this.group.add(pen.config.icon(NormalIconAlias.DROPDOWN_STAT, {
				x: newValueScreenRightX + iconMarginLeft,
				y: dropdownY,
				width: iconSize,
				height: iconSize
			}), 0, 0, clipArea);
		};
		/**
		* 无值的统计单元格：在单元格左侧绘制"统计"占位 + DROPDOWN_STAT 图标
		*/ _proto.drawStatHoverEmptyPlaceholder = function drawStatHoverEmptyPlaceholder(cellRect, clipArea) {
			var text = i18n.t("统计");
			var fontSize = style.size.fontSizeSmall;
			var iconSize = style.size.iconSmall;
			var iconMarginLeft = 2;
			var sidePadding = style.size.cellPadding;
			var textWidth = pen.util.measureTextWidth(text, fontSize);
			var totalWidth = textWidth + iconMarginLeft + iconSize;
			if (cellRect.width < totalWidth + sidePadding) return;
			var textX = cellRect.x + sidePadding;
			var textY = cellRect.y;
			this.group.add(pen.config.text({
				x: textX,
				y: textY,
				width: textWidth,
				height: cellRect.height,
				text,
				fontSize,
				color: style.color.lightUltraFontColor,
				verticalAlign: "middle",
				align: "left",
				wrap: "none",
				ellipsis: true
			}), 0, 0, clipArea);
			this.group.add(pen.config.icon(NormalIconAlias.DROPDOWN_STAT, {
				x: textX + textWidth + iconMarginLeft,
				y: textY + (cellRect.height - iconSize) / 2,
				width: iconSize,
				height: iconSize
			}), 0, 0, clipArea);
		};
		/**
		* 获取统计单元格在屏幕上的矩形（适配吸附行与分组头行）
		*/ _proto.getStatCellRect = function getStatCellRect(columnInfo, rowInfo) {
			var { x, width } = this.getXAndWidth(columnInfo);
			return {
				x,
				y: this.getStatRowScreenY(rowInfo),
				width,
				height: rowInfo.height
			};
		};
		/**
		* 获取统计行在屏幕上的 y（吸附行使用吸附后的位置，sticky 分组头使用 sticky 后的位置）
		*/ _proto.getStatRowScreenY = function getStatRowScreenY(rowInfo) {
			return this.getRowScreenY(rowInfo);
		};
		/**
		* 行在屏幕上的 y 统一入口：
		*   - pinned 吸底行：使用 getPinnedInnerRect(rowInfo).y + activityStartY
		*   - sticky 态 GroupHead：使用 computeGroupHeadSticky(rowInfo).finalY + activityStartY
		*   - 其它：rowInfo.y + activityStartY - scrollTop（普通滚动位置）
		* 所有依赖行屏幕 y 的 hover/点击热区都应通过此方法，确保 sticky/吸底 场景下交互跟随视觉。
		*/ _proto.getRowScreenY = function getRowScreenY(rowInfo) {
			var { widgetCollector, size, range } = this.collector;
			if (widgetCollector.isPinnedRowInfo(rowInfo)) return widgetCollector.getPinnedInnerRect(rowInfo).y + size.activityStartY;
			if (rowInfo.type === RowType.GroupHead && widgetCollector.isGroupHeadStickyEnabled()) {
				var stickyInfo = widgetCollector.computeGroupHeadSticky(rowInfo);
				if (stickyInfo.isSticking) return stickyInfo.finalY + size.activityStartY;
			}
			return rowInfo.y + size.activityStartY - range.scrollTop;
		};
		/**
		* 返回该行在绘制/对齐上的等效 scrollTop：
		* - sticky 态 GroupHead 返回 effectiveScrollTop = rowInfo.y - stickyFinalY
		* - 其它情况返回实际 scrollTop
		* 主要用于已包含 rowInfo.y 的全局 y 转屏幕 y（如分组统计 textConfig.y 本身已含 rowInfo.y）。
		*/ _proto.getEffectiveScrollTopForRow = function getEffectiveScrollTopForRow(rowInfo) {
			var { widgetCollector, range } = this.collector;
			if (rowInfo.type === RowType.GroupHead && widgetCollector.isGroupHeadStickyEnabled()) {
				var stickyInfo = widgetCollector.computeGroupHeadSticky(rowInfo);
				if (stickyInfo.isSticking) return stickyInfo.effectiveScrollTop;
			}
			return range.scrollTop;
		};
		/**
		* 被 sticky GroupHead 遮挡时使用的 clipArea：屏幕坐标下从 sticky 占用底部向下可见的矩形，
		* 避免 hover 绘制（如 Record 行 hover、非 sticky GroupHead 中的统计 hover）侵入到 sticky 分组头可视区。
		* 非 sticky 场景下返回 undefined（等价于不裁剪）。
		*
		* 注意：传入 baseRect 保证非 sticky 场景 rowGroup/group 自身不会被过度裁剪。
		*/ _proto.getStickyClipRect = function getStickyClipRect(baseRect) {
			return this.buildStickyClipRect(this.collector.widgetCollector.getStickyOccupyBottom(), baseRect);
		};
		/**
		* 针对某一行的 hover 绘制用 clipArea：
		* - 当前行是 sticky GroupHead：裁剪基线为其 outerOccupyBottom（允许绘制在自身范围
		*   但不侵入更外层 sticky head），C 阶段被外层推离时能裁掉侵入外层的部分；
		* - 其它行（非 sticky 分组头、Record 等）：裁剪基线为所有 sticky 的 getStickyOccupyBottom()。
		*/ _proto.getHoverClipRectForRow = function getHoverClipRectForRow(rowInfo, baseRect) {
			return this.collector.widgetCollector.getStickyHoverClipRect(rowInfo, baseRect);
		};
		/**
		* 根据指定的 occupyBottom（bodyLayer 内相对顶部偏移）构造裁剪矩形：返回 clipTop 以下与 baseRect 的交集。
		*/ _proto.buildStickyClipRect = function buildStickyClipRect(occupyBottom, baseRect) {
			var { size } = this.collector;
			if (occupyBottom <= 0) return;
			var clipTop = size.activityStartY + occupyBottom;
			var rect = baseRect !== null && baseRect !== void 0 ? baseRect : size.globalRect;
			var clipBottom = rect.y + rect.height;
			if (clipBottom <= clipTop) return {
				x: rect.x,
				y: clipTop,
				width: rect.width,
				height: 0
			};
			return {
				x: rect.x,
				y: Math.max(rect.y, clipTop),
				width: rect.width,
				height: clipBottom - Math.max(rect.y, clipTop)
			};
		};
		_proto.hoverGroupHead = function hoverGroupHead(columnInfo, rowInfo) {
			var _a;
			var { dataUtil } = this.collector;
			var statColumnId = columnInfo.id;
			if (columnInfo.id === "Operator") statColumnId = dataUtil.getVisibleFieldIds()[0];
			var groupPath = getRowInfoGroupPath(rowInfo, this.collector.rows);
			var groupStatInfo = this.collector.contents.getStatInfo(statColumnId, groupPath);
			var firstStatExpandX = style.size.iconSmall;
			var isFirstWithStat = columnInfo.isFirst && (groupStatInfo === null || groupStatInfo === void 0 ? void 0 : groupStatInfo.length) === 2 && this.canEditStat && dataUtil.isFieldStatEnabled();
			var isHitFirstWithStat = false;
			if (isFirstWithStat) {
				var [labelConfig, valueConfig] = groupStatInfo;
				var labelStartX = labelConfig.x + (((_a = labelConfig.layouts) === null || _a === void 0 ? void 0 : _a[0].x) || 0) - firstStatExpandX;
				var statTakeWidth = valueConfig.x + valueConfig.layouts[0].x + valueConfig.layouts[0].width - labelStartX;
				var statRect = {
					x: labelStartX - style.size.cellPadding,
					y: this.getRowScreenY(rowInfo),
					width: statTakeWidth + style.size.cellPadding * 2,
					height: rowInfo.height
				};
				var layoutIndex = rowInfo.index;
				var parentLayoutIndex = rowInfo.parent;
				if (isHitRect(this.offsetX, this.offsetY, statRect)) {
					var firstWithStatClipRect = this.getHoverClipRectForRow(rowInfo);
					this.group.add(pen.config.rect(Object.assign(Object.assign({}, statRect), {
						background: style.color.hoverBackgroundNoAlpha,
						onMouseUp: () => {
							var statResult = this.collector.dataUtil.getStatResult(columnInfo.id, groupPath);
							this.action.clickStat(columnInfo.id, statRect, false, layoutIndex, parentLayoutIndex, statResult);
						}
					})), 0, 0, firstWithStatClipRect);
					this.drawStatHoverValueContent(columnInfo, rowInfo, statRect, firstWithStatClipRect);
					isHitFirstWithStat = true;
				}
			}
			this.updateGroupHeadHover(rowInfo, { iconShiftLeftBy: isFirstWithStat && isHitFirstWithStat ? firstStatExpandX : 0 });
			if (!columnInfo.isFirst && columnInfo.isField) {
				this.hoverStatCell(columnInfo, rowInfo, { isGlobal: false });
				return;
			}
			if (columnInfo.id === "Operator") this.hoverGroupHeadFoldIcon(columnInfo, rowInfo);
		};
		_proto.updateGroupHeadHover = function updateGroupHeadHover(rowInfo, options = { iconShiftLeftBy: 0 }) {
			var { rows } = this.collector;
			var groupPath = getRowInfoGroupPath(rowInfo, rows);
			var groupValueInfo = this.collector.contents.getGroupValueInfo(groupPath);
			var groupValueRect = groupValueInfo === null || groupValueInfo === void 0 ? void 0 : groupValueInfo[0];
			if (!groupValueRect || !rowInfo.groupValue || Array.isArray(rowInfo.groupValue)) return;
			var groupFieldIndex = rowInfo.level;
			var groupField = this.collector.dataUtil.getGroupFields()[groupFieldIndex];
			var hoverPaddingVertical = 5;
			var rowScreenY = this.getRowScreenY(rowInfo);
			var groupBackgroundRect = Object.assign(Object.assign({}, groupValueRect), {
				y: rowScreenY + style.size.borderWidth,
				height: groupValueRect.height - 2 * style.size.borderWidth
			});
			var activeGroupRect = {
				x: groupValueRect.x,
				y: rowScreenY + hoverPaddingVertical,
				height: rowInfo.height - hoverPaddingVertical * 2,
				width: groupValueRect.width - 2 * style.size.cellPadding - style.size.iconLarge
			};
			var activeGroupInfo = collectGroupValueInfos(rowInfo.groupValue, activeGroupRect, groupField, { ellipsis: false });
			if (!activeGroupInfo) return;
			var iconRect = {
				x: activeGroupInfo[0].x + activeGroupInfo[0].width + style.size.tagMargin - options.iconShiftLeftBy,
				y: activeGroupInfo[0].y + (activeGroupInfo[0].height - style.size.iconLarge) / 2,
				width: style.size.iconLarge,
				height: style.size.iconLarge
			};
			this.renderActiveGroupHead(activeGroupInfo, iconRect, rowInfo);
			var groupHeadHoverClipRect = this.getHoverClipRectForRow(rowInfo);
			if (!domainConfig.getIsWb() && isHitRect(this.offsetX, this.offsetY, activeGroupRect)) {
				if (!this.canEditGroup) {
					this.action.showToolTip(this.tipText.getNotSupportGroupEditTip(), activeGroupRect);
					return;
				}
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, activeGroupRect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius,
					onMouseUp: () => {
						this.action.clickGroupValue(groupPath, Object.assign({}, groupBackgroundRect));
					}
				})), 0, 0, groupHeadHoverClipRect);
				this.setCursor(Cursor.POINTER);
			}
			if (!domainConfig.getIsWb() && isHitRect(this.offsetX, this.offsetY, iconRect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, iconRect), {
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius
			})), 0, 0, groupHeadHoverClipRect);
		};
		_proto.renderActiveGroupHead = function renderActiveGroupHead(activeGroupInfo, iconRect, rowInfo) {
			var backgroundColor = this.collector.profile.groupLevelBackgrounds.get(rowInfo.level);
			if (!backgroundColor) return;
			var stickyClipRect = this.getHoverClipRectForRow(rowInfo);
			var valueClipArea = this.collector.widgetCollector.intersectClipArea(activeGroupInfo[0], stickyClipRect);
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, activeGroupInfo[0]), {
				width: iconRect.x + iconRect.width - activeGroupInfo[0].x + 3,
				background: backgroundColor[rowInfo.level]
			})), 0, 0, stickyClipRect);
			if (!valueClipArea || (valueClipArea === null || valueClipArea === void 0 ? void 0 : valueClipArea.width) && valueClipArea.width > 20) activeGroupInfo[1].forEach((drawConfig) => {
				this.group.add(drawConfig, 0, 0, valueClipArea);
			});
			if (domainConfig.getIsWb()) return;
			this.group.add(pen.config.icon(NormalIconAlias.MENU_MORE, Object.assign(Object.assign({}, iconRect), { onClick: (event) => {
				this.action.clickGroupMoreMenu(event, iconRect);
			} })), 0, 0, stickyClipRect);
		};
		_proto.hoverGroupHeadFoldIcon = function hoverGroupHeadFoldIcon(columnInfo, rowInfo) {
			var { size } = this.collector;
			var foldIconRect = {
				x: columnInfo.x + (this.collector.profile.groupFoldStarts.get(rowInfo.level) || 0),
				y: this.getRowScreenY(rowInfo) + (rowInfo.height - size.foldIconSize) / 2,
				width: size.foldIconSize,
				height: size.foldIconSize
			};
			if (isHitRect(this.offsetX, this.offsetY, foldIconRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, foldIconRect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius,
					onMouseUp: () => this.action.clickFoldGroup(rowInfo.index)
				})), 0, 0, this.getHoverClipRectForRow(rowInfo));
				this.action.showToolTip(this.tipText.getFoldTip(rowInfo.fold), foldIconRect);
			}
		};
		_proto.hoverLiteRecord = function hoverLiteRecord(columnInfo, rowInfo) {
			var { customConfig } = this.context;
			if (!customConfig) return;
			if (!customConfig.featureServiceConfig[FeatureServiceConfigKey.AREA_INTERACTIVE]) return;
			if (columnInfo.id === "Operator" && rowInfo.liteSelectedIcon) {
				var leftIconRect = {
					x: rowInfo.liteSelectedIcon.x,
					y: rowInfo.liteSelectedIcon.y + this.collector.size.activityStartY - this.collector.range.scrollTop,
					width: rowInfo.liteSelectedIcon.width,
					height: rowInfo.liteSelectedIcon.height
				};
				if (isHitRect(this.offsetX, this.offsetY, leftIconRect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, leftIconRect), {
					background: style.color.hoverBackground,
					onClick: () => this.collector.state.toggleSelectRecord(rowInfo.recordId)
				})));
			}
			var innerRect = this.getInnerRect(rowInfo);
			this.rowGroup.add(pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				width: innerRect.width + this.getGanttWidth(this.parentApi),
				background: style.color.hoverBackground,
				onClick: () => {
					var _a, _b;
					if (((_b = (_a = this.target) === null || _a === void 0 ? void 0 : _a.columnInfo) === null || _b === void 0 ? void 0 : _b.id) !== "Operator") this.collector.state.toggleSelectRecord(rowInfo.recordId);
				}
			})), 0, 0, this.getHoverClipRectForRow(rowInfo, this.collector.size.globalViewBodyRect));
		};
		_proto.hoverRecord = function hoverRecord(columnInfo, rowInfo) {
			var _a;
			var recordRect = this.getInnerRect(rowInfo);
			this.showRecordExpandIcon(recordRect, rowInfo.recordId);
			this.cellInteractive.handleHoverCursor(columnInfo, rowInfo);
			var activePointRow = (_a = this.rangeModel.getCurrentSelection().getActivePoint()) === null || _a === void 0 ? void 0 : _a.row;
			var recordIds = this.collector.dataUtil.getDisplayedRecordIds();
			var activeRecordId = typeof activePointRow === "number" ? recordIds[activePointRow] : void 0;
			if (!isHitRect(this.offsetX, this.offsetY, recordRect) || activeRecordId === rowInfo.recordId) return;
			this.showRecordHover(rowInfo);
			this.cellInteractive.hoverNormal(columnInfo, rowInfo);
		};
		_proto.showRecordHover = function showRecordHover(rowInfo) {
			var innerRect = this.getInnerRect(rowInfo);
			this.rowGroup.add(pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				width: innerRect.width + this.getGanttWidth(this.parentApi),
				background: style.color.hoverBackground
			})), 0, 0, this.getHoverClipRectForRow(rowInfo, this.collector.size.globalViewBodyRect));
		};
		_proto.showRecordExpandIcon = function showRecordExpandIcon(recordRect, recordId) {
			if (!!domainConfig.getSpreadConfig().getConfig("isHistory")) return;
			if (renderAppConfigService.getConfig()[RenderAppConfigKey.SHOULD_HIDE_RECORD_EXPAND_ICON]) return;
			if (this.context.isDashboardLite && recordId) {
				this.context.emitter.service.onDashboardLiteExpandIconChanged.fire({
					recordId,
					rect: recordRect,
					hideCallBack: () => {}
				});
				return;
			}
			var firstColumnRight;
			if (domainConfig.getIsWb()) {
				var firstFieldId = this.collector.dataUtil.getVisibleFieldIds()[0];
				var firstColumnInfo = firstFieldId ? this.collector.columns.getInfoByFieldId(firstFieldId) : void 0;
				if (firstColumnInfo) {
					var { x, width } = this.getXAndWidth(firstColumnInfo);
					firstColumnRight = x + width;
				}
			}
			var iconInfo = getRecordExpandIconInfo(recordRect, this.collector.size.globalPaddingLeft, firstColumnRight);
			if (domainConfig.getIsWb()) {
				this.context.emitter.wbService.onGridExpandChange.fire({
					rect: {
						x: iconInfo.x,
						y: iconInfo.y,
						width: iconInfo.wrapperSize,
						height: iconInfo.wrapperSize
					},
					recordId
				});
				this.wbExpandIconShown = true;
				return;
			}
			var normalBackground = "var(--bg-lv4-default, rgb(255, 255, 255))";
			var hoverBackgroundNoAlpha = "var(--bg-lv1-weak, rgb(249, 250, 251))";
			var borderColor = "var(--border-strong, rgba(0, 0, 0, 0.12))";
			var iconElement = this.expandElement.firstElementChild;
			if (!iconElement) {
				Object.assign(this.expandElement.style, {
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: normalBackground,
					border: `1px solid ${borderColor}`,
					boxShadow: `0 0 4px ${borderColor}`,
					borderRadius: `${style.size.borderRadius}px`,
					zIndex: `20`
				});
				iconElement = document.createElement("img");
				iconElement.classList.add("darkmode-compact-icon");
				iconElement.src = NormalIconSrc[NormalIconAlias.EXPEND_RECORD];
				this.expandElement.appendChild(iconElement);
				this.expandElement.onmouseenter = () => {
					this.setCursor(Cursor.DEFAULT);
					this.expandElement.style.backgroundColor = hoverBackgroundNoAlpha;
					var { x, y, width, height } = this.expandElement.getBoundingClientRect();
					var position = this.getAbsolutePosition(x, y);
					this.action.showToolTip(this.tipText.getExpandRowTip(), Object.assign(Object.assign({}, position), {
						width,
						height
					}), { stopAutoScale: true });
				};
				this.expandElement.onmouseleave = () => {
					this.expandElement.style.backgroundColor = normalBackground;
				};
				this.register(dom.addDisposableListener(this.expandElement, "mousemove", (event) => event.stopPropagation()));
				this.register(dom.addDisposableListener(this.expandElement, "mousedown", (event) => {
					event.stopPropagation();
					this.parentApi.getFloatState().hide();
					this.action.expandRow(this.expandElement.id, { toggle: true });
					productReport.grid.recordExpanded();
				}));
			}
			var { scale } = this.collector.size;
			this.expandElement.id = recordId;
			Object.assign(this.expandElement.style, {
				top: `${iconInfo.y * scale}px`,
				left: `${iconInfo.x * scale}px`,
				width: `${iconInfo.wrapperSize * scale}px`,
				height: `${iconInfo.wrapperSize * scale}px`
			});
			Object.assign(iconElement.style, {
				width: `${iconInfo.iconSize * scale}px`,
				height: `${iconInfo.iconSize * scale}px`
			});
			if (this.root.firstChild) this.root.insertBefore(this.expandElement, this.root.firstChild);
			else this.root.appendChild(this.expandElement);
		};
		_proto.hoverRecordAdd = function hoverRecordAdd(rowInfo) {
			var { isAtOperator, actionRect, blankRect } = this.getRecordAddActionInfo(rowInfo);
			var rowScreenY = this.getRowScreenY(rowInfo);
			if (!this.canInserRecord) {
				if (this.isSupportContentPermission && isHitRect(this.offsetX, this.offsetY, actionRect)) this.action.showToolTip(this.tipText.getNoPermissionInsertRecordInGroupTip(), {
					x: this.offsetX,
					y: rowScreenY - style.size.cellPadding,
					width: 0,
					height: rowInfo.height
				});
				return;
			}
			var background = style.color.hoverBackground;
			var borderRadius = [
				0,
				0,
				style.size.borderRadius,
				style.size.borderRadius
			];
			var onAddAction = () => {
				this.action.clickRecordAdd(rowInfo);
			};
			var recordAddHoverClipRect = this.getHoverClipRectForRow(rowInfo);
			if (isAtOperator) {
				if (isHitRect(this.offsetX, this.offsetY, actionRect)) {
					this.rowGroup.add(pen.config.rect(Object.assign(Object.assign({}, actionRect), {
						background,
						borderRadius,
						onMouseDown: onAddAction
					})), 0, 0, recordAddHoverClipRect);
					this.action.showToolTip(this.tipText.getAddOneRowTip(), {
						x: this.offsetX,
						y: rowScreenY - style.size.cellPadding,
						width: 0,
						height: rowInfo.height
					});
				}
				if (isHitRect(this.offsetX, this.offsetY, blankRect)) this.rowGroup.add(pen.config.rect(Object.assign(Object.assign({}, blankRect), { onMouseDown: () => {
					this.resetSelection();
				} })), 0, 0, recordAddHoverClipRect);
			} else if (isHitRect(this.offsetX, this.offsetY, actionRect)) {
				this.rowGroup.add(pen.config.rect(Object.assign(Object.assign({}, actionRect), {
					width: actionRect.width + this.getGanttWidth(this.parentApi),
					background,
					borderRadius,
					onMouseDown: onAddAction
				})), 0, 0, recordAddHoverClipRect);
				this.action.showToolTip(this.tipText.getAddOneRowTip(), {
					x: this.offsetX,
					y: rowScreenY - style.size.cellPadding,
					width: 0,
					height: rowInfo.height
				});
			}
		};
		_proto.getRecordAddActionInfo = function getRecordAddActionInfo(rowInfo) {
			var innerRect = this.getInnerRect(rowInfo);
			var actionRect = Object.assign({}, innerRect);
			var blankRect = Object.assign(Object.assign({}, innerRect), { width: 0 });
			var isAtOperator = !!this.parentApi.getRangeModel().getCurrentSelection().getRanges();
			var isPinnedWithGlobalStat = this.collector.widgetCollector.isPinnedRowInfo(rowInfo);
			if (isAtOperator || isPinnedWithGlobalStat) {
				actionRect.width = this.collector.size.minOperatorFieldWidth;
				blankRect.x = actionRect.x + actionRect.width;
				blankRect.width = innerRect.width - actionRect.width;
			}
			return {
				isAtOperator: isAtOperator || isPinnedWithGlobalStat,
				actionRect,
				blankRect
			};
		};
		_proto.hoverGroupAdd = function hoverGroupAdd(rowInfo) {
			var groupAddRect = {
				x: rowInfo.x,
				y: rowInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop,
				width: this.collector.getRowOuterWidth(),
				height: rowInfo.height
			};
			var groupAddHoverClipRect = this.getHoverClipRectForRow(rowInfo);
			this.rowGroup.add(pen.config.rect(Object.assign(Object.assign({}, groupAddRect), {
				width: groupAddRect.width + this.getGanttWidth(this.parentApi),
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onMouseUp: () => {
					if (!this.canInsertGroup) return;
					this.action.clickGroupAdd([], groupAddRect, true);
				}
			})), 0, 0, groupAddHoverClipRect);
			if (!this.canInsertGroup) this.action.showToolTip(this.tipText.getNoPermissionInsertGroupTip(), groupAddRect, { props: { alignment: "start" } });
			this.setCursor(Cursor.POINTER);
		};
		_proto.getXAndWidth = function getXAndWidth(columnInfo) {
			var { range } = this.collector;
			return excludeFrozenX(columnInfo.x - (columnInfo.isFrozen ? 0 : range.scrollLeft), columnInfo, this.collector);
		};
		_proto.getInnerRect = function getInnerRect(rowInfo) {
			var innerRect = this.collector.getInnerRect(rowInfo);
			var screenY = this.getRowScreenY(rowInfo);
			return {
				x: innerRect.x,
				y: screenY,
				width: innerRect.width - this.collector.getAdditionFieldShowWidth(rowInfo),
				height: innerRect.height
			};
		};
		_proto.register = function register(t) {
			if (!t) return;
			this._register(t);
		};
		_create_class$11(GridAreaInteractive, [
			{
				key: "canInsertField",
				get: function() {
					return this.parentApi.getStatus().getPermissionStatus("canInsertField", {});
				}
			},
			{
				key: "canEditField",
				get: function() {
					return this.parentApi.getStatus().getPermissionStatus("canEditFieldConfig", {});
				}
			},
			{
				key: "canEditStat",
				get: function() {
					return this.parentApi.getStatus().getPermissionStatus("canEditViewConfig", {});
				}
			},
			{
				key: "canInserRecord",
				get: function() {
					return this.parentApi.getStatus().canInsertRecordInGroup;
				}
			},
			{
				key: "canEditGroup",
				get: function() {
					return this.parentApi.getStatus().canEditGroup;
				}
			},
			{
				key: "canInsertGroup",
				get: function() {
					return this.parentApi.getStatus().canInsertGroup;
				}
			},
			{
				key: "globalHoverRect",
				get: function() {
					return this.collector.size.globalRect;
				}
			},
			{
				key: "isSupportContentPermission",
				get: function() {
					return this.parentApi.getStatus().isSupportContentPermission;
				}
			}
		]);
		return GridAreaInteractive;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/area-interactive/index.js
var init_area_interactive = __esmMin((() => {
	init_interface$16();
	init_main$18();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-float/main.js
function _inherits$34(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$34(subClass, superClass);
}
function _set_prototype_of$34(o, p) {
	_set_prototype_of$34 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$34(o, p);
}
var defaultStyle$3, LayerTipText, ReportField, GridRecordFloat;
var init_main$17 = __esmMin((() => {
	init_esm();
	init_es();
	init_es$1();
	init_pen();
	init_production();
	init_resources();
	init_style();
	init_grid_feature();
	init_area_interactive();
	init_interface$17();
	init_is_in_rect();
	defaultStyle$3 = {
		tipHeight: 24,
		tipPadding: 8,
		tipTextFontSize: style.size.fontSizeNormal,
		tipTextColor: style.color.whiteFontColor,
		borderWidth: 2,
		borderColor: style.color.searchHighlightBorderColor,
		background: style.color.searchHighlightBackground
	};
	LayerTipText = {
		[RecordMovedLabel.IS_SORT]: { DEFAULT: i18n.t("此记录将按照排序规则调整至其他位置") },
		[RecordMovedLabel.IS_GROUP]: { DEFAULT: i18n.t("此记录将按照分组规则调整至其他分组") },
		[RecordMovedLabel.IS_FILTER]: {
			DEFAULT: i18n.t("此记录不符合筛选条件，将被隐藏"),
			[RequestId.INSERT_RECORD_REQUEST]: i18n.t("已设置筛选，修改记录符合筛选条件才会显示")
		}
	};
	ReportField = {
		[RecordMovedLabel.IS_SORT]: "rank_hint",
		[RecordMovedLabel.IS_GROUP]: "group_hint",
		[RecordMovedLabel.IS_FILTER]: "filter_hint"
	};
	GridRecordFloat = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$34(GridRecordFloat, GridFeatureBase);
		function GridRecordFloat() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.recordId = "";
			_this.fromRangeIndex = -1;
			_this.actionRecordIndex = -1;
			_this.trulyFieldIndex = -1;
			_this.tipRect = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			_this.contentRect = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			_this.tipAreaWidth = 0;
			_this.onDocumentMouseDown = (evt) => {
				var isHitTip = isHitRect(evt.x, evt.y, _this.tipRect);
				var isHitBody = isHitRect(evt.x, evt.y, _this.contentRect);
				if (evt.target.isBlank || !isHitTip && !isHitBody) {
					if (clickIgnoreEle(evt.event.composedPath())) return;
					_this.hideFloat();
					return;
				}
				if (isHitBody) {
					var { columnInfo } = evt.target;
					if (columnInfo) {
						_this.setActivePoint(columnInfo.id);
						_this.parentApi.getFloatState().show({
							fieldId: columnInfo.id,
							recordId: _this.recordId
						});
					}
				}
			};
			return _this;
		}
		var _proto = GridRecordFloat.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onResize(() => this.group.setAttrs(this.collector.size.globalRect)));
		};
		_proto.dispose = function dispose(trace) {
			GridFeatureBase.prototype.dispose.call(this, trace);
			this.cancelClickReady();
		};
		_proto.render = function render() {
			var _a, _b;
			if (!this.parentApi.getFloatState().isShow() || !this.recordId) {
				this.hideFloat();
				return;
			}
			if (!((_b = (_a = this.context.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getAllRecordIds()) === null || _b === void 0 ? void 0 : _b.includes(this.recordId))) {
				this.hideFloat();
				return;
			}
			var recordIds = this.collector.dataUtil.getDisplayedRecordIds();
			if (this.tipLabel === RecordMovedLabel.IS_FILTER && recordIds.includes(this.recordId)) {
				this.selectOriginRow(this.recordId);
				this.hideFloat();
				return;
			}
			if (this.tipLabel === RecordMovedLabel.IS_SORT && recordIds.indexOf(this.recordId) === this.fromRangeIndex) {
				this.selectOriginRow(this.recordId);
				this.hideFloat();
				return;
			}
			this.showLayer();
		};
		_proto.getY = function getY() {
			return this.contentRect.y;
		};
		_proto.showFloat = function showFloat(recordMoveInfo, addRecordRowIndex) {
			var _a;
			var { type, recordId, fieldIds, requestId } = recordMoveInfo;
			var activeField = (fieldIds === null || fieldIds === void 0 ? void 0 : fieldIds[0]) || this.collector.dataUtil.getVisibleFieldIds()[0];
			this.parentApi.getFloatState().show({
				recordId,
				fieldId: activeField
			});
			this.recordId = recordId;
			this.tipLabel = type;
			this.tipAction = requestId;
			this.actionRecordIndex = addRecordRowIndex;
			this.fromRangeIndex = ((_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getOldDisplayedRecordIds().indexOf(recordId)) || -1;
			this.showLayer();
			this.setActivePoint(activeField);
			this.listenClickReady();
		};
		_proto.hideFloat = function hideFloat() {
			if (!this.recordId) return;
			this.recordId = "";
			this.group.clear();
			if (this.parentApi.getFloatState().isShow()) {
				this.cancelClickReady();
				this.parentApi.getFloatState().hide();
			}
		};
		_proto.listenClickReady = function listenClickReady() {
			this.cancelClickReady();
			var { COMMAND, CTRL_WIN } = KeyAssist;
			var { ESCAPE, SHIFT, H, F, Z } = KeyCode;
			this.keymapService = new KeymapService();
			this.keymapService.register({
				keyBindings: {
					mac: [
						ESCAPE,
						COMMAND + Z,
						COMMAND + F,
						COMMAND + H,
						COMMAND + SHIFT + H
					],
					win: [
						ESCAPE,
						CTRL_WIN + Z,
						CTRL_WIN + F,
						CTRL_WIN + H,
						COMMAND + SHIFT + H
					]
				},
				shouldPreventDefault: true,
				handler: () => this.hideFloat(),
				when: () => true
			});
			this.mousedownDispose = this.UIEvent.document.onMouseDownCapture(this.onDocumentMouseDown);
		};
		_proto.cancelClickReady = function cancelClickReady() {
			var _a, _b;
			(_a = this.keymapService) === null || _a === void 0 || _a.destroy();
			(_b = this.mousedownDispose) === null || _b === void 0 || _b.dispose();
		};
		_proto.showLayer = function showLayer() {
			var { rows, contents } = this.collector;
			var rowInfo = rows.getInfoByRecordId(this.recordId);
			if (!rowInfo) return;
			if (rowInfo.index !== -1) this.contentRect = Object.assign(Object.assign({}, this.collector.getInnerRect(rowInfo)), { y: this.getFloatY() });
			else this.contentRect = Object.assign(Object.assign({}, this.collector.getInnerRect(rowInfo)), {
				y: this.getFloatY(),
				height: rows.getRecordSize()
			});
			contents.patchByRecordId(this.recordId);
			this.paintLayer();
			productReport.grid.showFloatLayer(ReportField[this.tipLabel]);
		};
		_proto.paintLayer = function paintLayer() {
			this.group.clear();
			this.paintAppearance();
			this.paintOperator();
			this.paintContent();
		};
		_proto.paintAppearance = function paintAppearance() {
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, this.contentRect), {
				borderWidth: defaultStyle$3.borderWidth,
				borderColor: defaultStyle$3.borderColor,
				background: defaultStyle$3.background
			})));
			var tipText = this.getTipText();
			var tipTextWidth = pen.util.measureTextWidth(tipText, defaultStyle$3.tipTextFontSize);
			var iconSize = style.size.iconSmall;
			this.tipAreaWidth = iconSize + tipTextWidth + 2 * defaultStyle$3.tipPadding;
			this.tipRect = Object.assign(Object.assign({}, this.contentRect), {
				x: this.contentRect.x - defaultStyle$3.borderWidth / 2,
				width: this.tipAreaWidth,
				y: this.contentRect.y - defaultStyle$3.tipHeight,
				height: defaultStyle$3.tipHeight
			});
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, this.tipRect), {
				background: defaultStyle$3.borderColor,
				borderRadius: [
					style.size.borderRadius,
					style.size.borderRadius,
					0,
					0
				]
			})));
			var iconX = this.tipRect.x + defaultStyle$3.tipPadding;
			this.group.add(pen.config.icon(NormalIconAlias.TIP_DARK, Object.assign(Object.assign({}, this.tipRect), {
				x: iconX,
				y: this.tipRect.y + (this.tipRect.height - iconSize) / 2,
				width: iconSize,
				height: iconSize
			})));
			this.group.add(pen.config.text(Object.assign(Object.assign({ text: tipText }, this.tipRect), {
				x: iconX + iconSize,
				color: defaultStyle$3.tipTextColor,
				fontSize: defaultStyle$3.tipTextFontSize
			})));
		};
		_proto.paintOperator = function paintOperator() {
			if (this.tipLabel !== RecordMovedLabel.IS_FILTER) {
				var recordIndex = this.collector.dataUtil.getDisplayedRecordIds().indexOf(this.recordId);
				this.group.add(pen.config.text(Object.assign(Object.assign({ text: String(recordIndex + 1) }, this.contentRect), {
					width: this.collector.size.minOperatorFieldWidth,
					color: style.color.lightUltraFontColor,
					fontSize: defaultStyle$3.tipTextFontSize,
					align: "center"
				})));
			}
			var interactiveFeature = this.renderer.getFeature(IGridAreaInteractive);
			interactiveFeature === null || interactiveFeature === void 0 || interactiveFeature.showRecordExpand(this.contentRect, this.recordId);
		};
		_proto.paintContent = function paintContent() {
			var { size, dataUtil, state, contents, rows } = this.collector;
			var activeGroup = pen.group(Object.assign(Object.assign({}, this.contentRect), { x: size.activityStartX }));
			this.group.addGroup(activeGroup);
			var frozenGroup = pen.group(Object.assign(Object.assign({}, this.contentRect), { width: size.frozenWidth + style.size.borderWidth }));
			this.group.addGroup(frozenGroup);
			dataUtil.getVisibleFieldIds().forEach((fieldId) => {
				var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
				var rowInfo = this.collector.rows.getInfoByRecordId(this.recordId);
				if (!columnInfo || !rowInfo) return;
				var offsetX = columnInfo.isFrozen ? 0 : -this.collector.range.scrollLeft;
				var cellRect = {
					x: columnInfo.x + offsetX,
					y: this.contentRect.y,
					width: columnInfo.width,
					height: rows.getRecordSize()
				};
				var areaContainer = columnInfo.isFrozen ? frozenGroup : activeGroup;
				var cellInfos = contents.getCellInfo(fieldId, this.recordId);
				if (cellInfos) {
					var cellContainer = pen.group(cellRect);
					areaContainer.addGroup(cellContainer);
					var normalY = rowInfo.y;
					var offsetY = this.contentRect.y - normalY;
					cellInfos.forEach((info) => cellContainer.add(info, offsetX, offsetY));
				}
				var isFrozenLastColumn = columnInfo.isFrozen && columnInfo.index === state.getColumnFrozenCount();
				areaContainer.add(pen.config.line({
					x: cellRect.x + cellRect.width,
					y: cellRect.y,
					points: [
						0,
						0,
						0,
						cellRect.height
					],
					borderColor: style.color.strongBorderColor,
					borderWidth: style.size.borderWidth * (isFrozenLastColumn ? 2 : 1)
				}));
			});
		};
		_proto.getTipText = function getTipText() {
			var _a;
			var labelText = LayerTipText[this.tipLabel];
			return (_a = labelText[this.tipAction]) !== null && _a !== void 0 ? _a : labelText.DEFAULT;
		};
		_proto.setActivePoint = function setActivePoint(fieldId) {
			var trulyFieldIndex = this.collector.dataUtil.getVisibleFieldIds().indexOf(fieldId);
			this.trulyFieldIndex = trulyFieldIndex;
			if (trulyFieldIndex < 0) return;
			var rangeModel = this.parentApi.getRangeModel();
			if (!rangeModel) return;
			var currentActivePoint = rangeModel.getCurrentSelection().getActivePoint();
			if ((currentActivePoint === null || currentActivePoint === void 0 ? void 0 : currentActivePoint.column) === trulyFieldIndex) return;
			var activePoint = {
				row: 0,
				column: trulyFieldIndex
			};
			var range = {
				startRow: 0,
				endRow: 0,
				startColumn: trulyFieldIndex,
				endColumn: trulyFieldIndex
			};
			rangeModel.selectRange(range, activePoint);
		};
		_proto.getFloatY = function getFloatY() {
			var _a, _b;
			var { size, rows } = this.collector;
			var recordHeight = rows.getRecordSize();
			var y = 0;
			if (this.fromRangeIndex === -1) if (this.actionRecordIndex !== -1) y = ((_a = rows.getInfo(this.actionRecordIndex)) === null || _a === void 0 ? void 0 : _a.y) || 0;
			else y = size.activityStartY;
			else {
				var recordId = this.collector.dataUtil.getDisplayedRecordIds()[this.fromRangeIndex];
				y = (((_b = rows.getInfoByRecordId(recordId)) === null || _b === void 0 ? void 0 : _b.y) || 0) - recordHeight;
			}
			var minY = size.activityStartY;
			var maxY = size.activityViewHeight - 2 * recordHeight;
			y = Math.max(minY, y);
			y = Math.min(maxY, y);
			return y;
		};
		_proto.selectOriginRow = function selectOriginRow(recordId) {
			var recordIndex = this.collector.dataUtil.getDisplayedRecordIds().indexOf(recordId);
			if (recordIndex === -1) return;
			var fieldIndex = this.trulyFieldIndex === -1 ? 0 : this.trulyFieldIndex;
			var activePoint = {
				row: recordIndex,
				column: fieldIndex
			};
			var range = {
				startRow: recordIndex,
				endRow: recordIndex,
				startColumn: fieldIndex,
				endColumn: fieldIndex
			};
			this.parentApi.getRangeModel().selectRange(range, activePoint);
		};
		return GridRecordFloat;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-float/index.js
var init_record_float = __esmMin((() => {
	init_interface$17();
	init_main$17();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/smart-fill/interface.js
var IGridSmartFill;
var init_interface$14 = __esmMin((() => {
	init_module();
	IGridSmartFill = createDecorator("IGridSmartFill");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/smart-fill/main.js
function _inherits$33(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$33(subClass, superClass);
}
function _set_prototype_of$33(o, p) {
	_set_prototype_of$33 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$33(o, p);
}
var import_Snackbar$1, defaultStyle$2, GridSmartFill;
var init_main$16 = __esmMin((() => {
	import_Snackbar$1 = /* @__PURE__ */ __toESM(require_Snackbar());
	init_es();
	init_es$1();
	init_pen();
	init_production();
	init_style();
	init_interface$23();
	init_auto_scroll();
	init_grid_feature();
	init_active_point();
	init_interface$14();
	init_get_cell_rect();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	defaultStyle$2 = {
		outerSize: 8,
		cornerSize: 4,
		cornerBackground: style.color.selectionBorderColor
	};
	GridSmartFill = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$33(GridSmartFill, GridFeatureBase);
		function GridSmartFill() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.fieldId = "";
			_this.recordId = "";
			_this.hotRect = null;
			_this.isActivePointAtLast = false;
			_this.isHit = false;
			_this.isBackStage = false;
			_this.isDragging = false;
			_this.mouseDownParent = -1;
			_this.direction = null;
			_this.overRowIndex = -1;
			_this.onWindowMouseMove = (evt) => {
				if (!_this.hotRect || !isHitRect(evt.x, evt.y, _this.collector.size.globalViewRect) || !evt.target.rowInfo || _this.isPreventFromOtherFeature()) return;
				if (_this.isDragging) {
					_this.handleDragging(evt.target);
					return;
				}
				_this.isHit = false;
				if (isHitRect(evt.x, evt.y, _this.hotRect)) {
					_this.isHit = true;
					_this.setCursor(Cursor.CROSS_HAIR);
					return;
				}
			};
			_this.onStageMouseDown = () => {
				var _a, _b;
				_this.isDragging = _this.isHit;
				if (_this.isHit) {
					_this.oldRange = _this.rangeModel.getCurrentSelection().getRanges();
					_this.mouseDownParent = ((_a = _this.collector.rows.getInfoByRecordId(_this.recordId)) === null || _a === void 0 ? void 0 : _a.parent) || -1;
					(_b = _this.renderer.getFeature(IGridAutoScroll)) === null || _b === void 0 || _b.readyY();
				}
			};
			_this.onDocumentMouseUp = () => {
				if (!_this.isDragging) return;
				_this.isDragging = false;
				_this.setCursor(Cursor.DEFAULT);
				var newRange = _this.rangeModel.getCurrentSelection().getRanges();
				if (newRange.startRow === _this.oldRange.startRow && newRange.endRow === _this.oldRange.endRow) return;
				_this.done(newRange);
			};
			_this.onStageDbClick = () => {
				if (_this.isHit) _this.doFillDown();
			};
			_this.onSelectionChanged = () => {
				if (_this.isInVisible) return;
				if (_this.parentApi.getFloatState().isShow()) {
					_this.reset();
					return;
				}
				var selection = _this.rangeModel.getCurrentSelection();
				if (selection.isColumnSelection() || selection.isRowSelection()) {
					_this.reset();
					return;
				}
				var range = selection.getRanges();
				if (!range) {
					_this.reset();
					return;
				}
				var { endRow, endColumn } = range;
				var endFieldId = _this.collector.dataUtil.getVisibleFieldIds()[endColumn];
				var field = _this.collector.dataUtil.getFieldByFieldId(endFieldId);
				if (!field || field.fieldErrorType || NOT_EDITABLE_FIELD.includes(field.type) || !_this.parentApi.getStatus().getPermissionStatus("canEditField", { fieldId: endFieldId })) {
					_this.reset();
					return;
				}
				var activePoint = selection.getActivePoint();
				_this.isActivePointAtLast = (activePoint === null || activePoint === void 0 ? void 0 : activePoint.row) === endRow && activePoint.column === endColumn;
				_this.fieldId = endFieldId;
				_this.recordId = _this.collector.dataUtil.getDisplayedRecordIds()[endRow];
				_this.toFrontStage();
			};
			return _this;
		}
		var _proto = GridSmartFill.prototype;
		_proto.bootstrap = function bootstrap() {
			var { size } = this.collector;
			this.group = this._register(pen.group(Object.assign(Object.assign({}, size.globalRect), { y: size.activityStartY })));
			this.layer.addGroup(this.group);
			this._register(this.rangeModel.onSelectionChanged(this.onSelectionChanged));
		};
		_proto.dispose = function dispose(trace) {
			this.cancelDragReady();
			GridFeatureBase.prototype.dispose.call(this, trace);
		};
		_proto.render = function render() {
			this.renderCorner();
		};
		_proto.isHovering = function isHovering() {
			return this.isHit || this.isDragging;
		};
		_proto.toBackStage = function toBackStage() {
			this.isBackStage = true;
			this.group.clear();
		};
		_proto.toFrontStage = function toFrontStage() {
			this.isBackStage = false;
			this.renderCorner();
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { high: {
				id: IGridSmartFill,
				isLock: () => this.isHovering()
			} };
		};
		_proto.listenDragReady = function listenDragReady() {
			this.cancelDragReady();
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.mouseDownDisposable = this.UIEvent.stage.onMouseDown(this.onStageMouseDown);
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseUp);
			this.doubleClickDisposable = this.UIEvent.stage.onDoubleClick(this.onStageDbClick);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => this.abortDragging());
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a, _b, _c, _d, _e;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseDownDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.mouseUpDisposable) === null || _c === void 0 || _c.dispose();
			(_d = this.doubleClickDisposable) === null || _d === void 0 || _d.dispose();
			(_e = this.escDisposable) === null || _e === void 0 || _e.dispose();
		};
		/**
		* ESC 中断填充拖拽：仅在真正拖拽中响应，把选区还原回拖拽前的 {@link oldRange}，
		* 并复位拖拽态、光标；**不调用 `done()`**，因此不触发 fillRecords 落库。
		*/ _proto.abortDragging = function abortDragging() {
			if (!this.isDragging) return;
			this.isDragging = false;
			var activePoint = this.rangeModel.getCurrentSelection().getActivePoint() || void 0;
			this.rangeModel.selectRange(this.oldRange, activePoint);
			this.setCursor(Cursor.DEFAULT);
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGridSmartFill);
		};
		_proto.done = function done(newRange) {
			var _a, _b;
			var { dataUtil } = this.collector;
			var allFieldIds = dataUtil.getVisibleFieldIds();
			var allRecordIds = dataUtil.getDisplayedRecordIds();
			var sourceFieldIds = [];
			for (var i = this.oldRange.startColumn; i <= this.oldRange.endColumn; i++) sourceFieldIds.push(allFieldIds[i]);
			var sourceRecordIds = [];
			for (var i1 = Math.max(this.oldRange.startRow, 0); i1 <= Math.min(this.oldRange.endRow, allRecordIds.length - 1); i1++) sourceRecordIds.push(allRecordIds[i1]);
			var targetRecordIds = [];
			for (var i2 = newRange.startRow; i2 <= newRange.endRow; i2++) {
				var recordId = allRecordIds[i2];
				if (!sourceRecordIds.includes(recordId)) targetRecordIds.push(recordId);
			}
			var result = this.context.getBehaviorApi().fillRecords({
				tableId: dataUtil.getCurrentTable().id,
				viewId: dataUtil.getCurrentView().id,
				delta: {
					sourceFieldIds,
					sourceRecordIds,
					targetRecordIds,
					fillDirection: this.direction
				}
			});
			logger.info(`[xview][智能填充]成功`, result.isSuccess);
			if (!result.isSuccess) return;
			if (!!((_a = result.data) === null || _a === void 0 ? void 0 : _a.unfilledFieldIds.length)) import_Snackbar$1.default.show({
				message: i18n.t("包含不能填充的单元格，因为这些单元格的内容是自动生成的"),
				type: "info",
				autoClose: true
			});
			if (sourceFieldIds.length === 1) {
				var fieldType = (_b = dataUtil.getFieldByFieldId(sourceFieldIds[0])) === null || _b === void 0 ? void 0 : _b.type;
				productReport.grid.smartFillSuccess(fieldType);
			}
		};
		_proto.doFillDown = function doFillDown() {
			this.oldRange = this.rangeModel.getCurrentSelection().getRanges();
			var lastRecordIndex = this.collector.dataUtil.getDisplayedRecordIds().length - 1;
			if (this.oldRange.endRow === lastRecordIndex) return;
			var activePoint = this.rangeModel.getCurrentSelection().getActivePoint();
			if (!activePoint) return;
			var newRange = Object.assign(Object.assign({}, this.oldRange), { endRow: lastRecordIndex });
			this.done(newRange);
			this.rangeModel.selectRange(newRange, activePoint);
			this.oldRange = this.rangeModel.getCurrentSelection().getRanges();
		};
		_proto.handleDragging = function handleDragging(target) {
			var { rowInfo } = target;
			if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record) return;
			if (this.collector.dataUtil.hasGroup() && rowInfo.parent !== this.mouseDownParent) return;
			var { recordId } = rowInfo;
			this.overRowIndex = this.collector.dataUtil.getDisplayedRecordIds().indexOf(recordId);
			this.direction = null;
			if (this.overRowIndex < this.oldRange.startRow) this.direction = Direction.UP;
			if (this.overRowIndex > this.oldRange.endRow) this.direction = Direction.DOWN;
			if (!this.direction) {
				this.expandRange(this.oldRange);
				return;
			}
			var rowRange = this.direction === Direction.UP ? this.getUpRange() : this.getDownRange();
			var newRange = Object.assign(Object.assign({}, this.oldRange), rowRange);
			this.expandRange(newRange);
		};
		_proto.getUpRange = function getUpRange() {
			return { startRow: Math.max(0, this.overRowIndex) };
		};
		_proto.getDownRange = function getDownRange() {
			return { endRow: Math.min(this.collector.dataUtil.getDisplayedRecordIds().length - 1, this.overRowIndex) };
		};
		_proto.expandRange = function expandRange(newRange) {
			var activePoint = this.rangeModel.getCurrentSelection().getActivePoint() || void 0;
			this.rangeModel.selectRange(newRange, activePoint);
		};
		_proto.reset = function reset() {
			this.fieldId = "";
			this.recordId = "";
			this.isHit = false;
			this.hotRect = null;
			this.group.clear();
			this.cancelDragReady();
		};
		_proto.renderCorner = function renderCorner() {
			var _a;
			this.group.clear();
			if (this.isBackStage) return;
			var cellRect;
			if (this.isActivePointAtLast) {
				var activePointInfo = (_a = this.renderer.getFeature(IGridActivePoint)) === null || _a === void 0 ? void 0 : _a.getActivePointInfo(true);
				if (activePointInfo) cellRect = activePointInfo.rect;
			}
			if (!cellRect) cellRect = getCellRect(this.fieldId, this.recordId, this.collector);
			if (!cellRect) return;
			var { rows, columns, size } = this.collector;
			var rowInfo = rows.getInfoByRecordId(this.recordId);
			var columnInfo = columns.getInfoByFieldId(this.fieldId);
			if (!columnInfo || !rowInfo || rows.isHiddenRow(rowInfo.parent)) return;
			this.group.setAttrs({
				y: size.activityStartY,
				x: columnInfo.isFrozen ? 0 : size.activityStartX,
				width: columnInfo.isFrozen ? size.activityStartX + defaultStyle$2.outerSize / 2 : size.globalRect.width - size.activityStartX,
				height: size.activityViewHeight
			});
			this.hotRect = {
				x: cellRect.x + cellRect.width - defaultStyle$2.outerSize / 2,
				y: cellRect.y + cellRect.height - defaultStyle$2.outerSize / 2,
				width: defaultStyle$2.outerSize,
				height: defaultStyle$2.outerSize
			};
			var stickyClipArea = this.collector.widgetCollector.getStickyFeatureClipRect();
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, this.hotRect), { background: style.color.normalBackground })), 0, 0, stickyClipArea);
			this.group.add(pen.config.rect({
				x: cellRect.x + cellRect.width - defaultStyle$2.cornerSize / 2,
				y: cellRect.y + cellRect.height - defaultStyle$2.cornerSize / 2,
				width: defaultStyle$2.cornerSize,
				height: defaultStyle$2.cornerSize,
				background: defaultStyle$2.cornerBackground
			}), 0, 0, stickyClipArea);
			this.listenDragReady();
		};
		return GridSmartFill;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/smart-fill/index.js
var init_smart_fill = __esmMin((() => {
	init_interface$14();
	init_main$16();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/active-point/main.js
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
function _inherits$32(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$32(subClass, superClass);
}
function _set_prototype_of$32(o, p) {
	_set_prototype_of$32 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$32(o, p);
}
var FixMaxHeight, ShowAllContentFieldTypes, GridActivePoint;
var init_main$15 = __esmMin((() => {
	init_es();
	init_es$1();
	init_interface$22();
	init_field_collector();
	init_pen();
	init_utils$2();
	init_scroller$1();
	init_resources();
	init_style();
	init_grid_feature();
	init_interface$18();
	init_config();
	init_pre_do();
	init_record_float();
	init_smart_fill();
	init_is_in_rect();
	init_wb_cell();
	FixMaxHeight = 160;
	ShowAllContentFieldTypes = [];
	GridActivePoint = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$32(GridActivePoint, GridFeatureBase);
		function GridActivePoint() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.activePointRect = getInitActivePointRect();
			_this.maxHeight = FixMaxHeight;
			_this.minHeight = _this.collector.rows.getRecordSize();
			_this.totalHeight = 0;
			_this.scrollTop = 0;
			_this.dropdownRotate = 0;
			_this.buttonInfos = [];
			_this.contents = [];
			_this.isBackStage = false;
			_this.onActivePointChanged = () => {
				if (_this.isInVisible) return;
				var hasChange = false;
				var activePoint = _this.rangeModel.getCurrentSelection().getActivePoint();
				if (!activePoint) {
					hasChange = !!(_this.fieldId || _this.recordId);
					_this.fieldId = "";
					_this.recordId = "";
					_this.activePointRect = getInitActivePointRect();
					_this.fieldGroupTitleRect = void 0;
				} else {
					var { row, column } = activePoint;
					var fieldId = _this.collector.dataUtil.getVisibleFieldIds()[column];
					var recordId = row === -1 ? "" : _this.collector.dataUtil.getDisplayedRecordIds()[row];
					if (row !== -1) _this.fieldGroupTitleRect = void 0;
					if (_this.parentApi.getFloatState().isShow()) {
						var position = _this.parentApi.getFloatState().getPosition();
						if (position) {
							fieldId = position.fieldId;
							recordId = position.recordId;
						}
					}
					hasChange = _this.fieldId !== fieldId || _this.recordId !== recordId;
					_this.fieldId = fieldId;
					_this.recordId = recordId;
				}
				if (hasChange) {
					_this.scrollTop = 0;
					_this.dropdownRotate = 0;
					_this.temporaryCell = void 0;
					_this.scrollBar.updatePosition();
				}
				_this.toFrontStage();
			};
			return _this;
		}
		var _proto = GridActivePoint.prototype;
		_proto.bootstrap = function bootstrap() {
			this.wrapperGroup = this._register(pen.group({
				x: 0,
				y: 0,
				width: 0,
				height: 0
			}));
			this.layer.addGroup(this.wrapperGroup);
			this.scrollBar = this._register(new CommonScroller({
				vertical: true,
				id: "cell-scroller",
				root: this.root,
				getViewRect: () => ({
					x: this.activePointRect.x * this.collector.size.scale,
					y: this.activePointRect.y * this.collector.size.scale,
					width: this.activePointRect.width * this.collector.size.scale,
					height: this.activePointRect.height * this.collector.size.scale
				}),
				getScrollTop: () => this.scrollTop * this.collector.size.scale,
				getScrollHeight: () => this.totalHeight * this.collector.size.scale,
				scrollToY: (y) => this.handleScrollY(y / this.collector.size.scale),
				getMaxTop: () => this.collector.size.activityStartY * this.collector.size.scale,
				style: {
					size: 6,
					marginEdge: 3
				}
			}));
			this._register(this.rangeModel.onActivePointChanged(this.onActivePointChanged));
			this._register(this.emitter.service.setTemporaryCell.event(this.setTemporaryCell.bind(this)));
		};
		_proto.render = function render() {
			if (this.isInVisible) return;
			this.handleScrollY(this.scrollTop);
		};
		_proto.getActivePointInfo = function getActivePointInfo(internal = false) {
			if (!this.fieldId) return null;
			var columnInfo = this.collector.columns.getInfoByFieldId(this.fieldId);
			if (!columnInfo) return null;
			this.isFrozen = columnInfo.isFrozen;
			var { range } = this.collector;
			var scale = internal ? 1 : this.collector.size.scale;
			if (!this.recordId) {
				var rect = {
					x: (columnInfo.x - (this.isFrozen ? 0 : range.scrollLeft)) * scale,
					y: columnInfo.y * scale,
					width: columnInfo.width * scale,
					height: columnInfo.height * scale
				};
				var clickFieldGroupTitleRect = this.fieldGroupTitleRect ? {
					x: this.fieldGroupTitleRect.x * scale,
					y: this.fieldGroupTitleRect.y * scale,
					width: this.fieldGroupTitleRect.width * scale,
					height: this.fieldGroupTitleRect.height * scale
				} : void 0;
				return {
					fieldId: this.fieldId,
					recordId: this.recordId,
					rect,
					buttons: this.buttonInfos,
					contents: this.contents,
					clickFieldGroupTitleRect
				};
			}
			var rowInfo = this.collector.rows.getInfoByRecordId(this.recordId);
			if (!rowInfo) return null;
			var activePointY = this.getActivePointScreenY(rowInfo);
			var rect1 = {
				x: (columnInfo.x - (this.isFrozen ? 0 : range.scrollLeft)) * scale,
				y: activePointY * scale,
				width: this.activePointRect.width * scale,
				height: this.activePointRect.height * scale
			};
			return {
				fieldId: this.fieldId,
				recordId: this.recordId,
				rect: rect1,
				buttons: this.buttonInfos,
				contents: this.contents
			};
		};
		_proto.toBackStage = function toBackStage() {
			var _a;
			this.isBackStage = true;
			this.wrapperGroup.clear();
			(_a = this.renderer.getFeature(IGridSmartFill)) === null || _a === void 0 || _a.toBackStage();
			this.scrollBar.hide();
		};
		_proto.toFrontStage = function toFrontStage() {
			var _a;
			this.isBackStage = false;
			(_a = this.renderer.getFeature(IGridSmartFill)) === null || _a === void 0 || _a.toFrontStage();
			this.showActivePoint();
			this.scrollBar.show();
		};
		_proto.setFocus = function setFocus(toFocus) {
			var rotate = toFocus ? 180 : 0;
			if (this.dropdownRotate !== rotate) {
				this.dropdownRotate = rotate;
				this.showActivePoint();
			}
		};
		_proto.setTemporaryCell = function setTemporaryCell(cell) {
			if (cell && (cell.fieldId !== this.fieldId || cell.recordId !== this.recordId)) return;
			this.temporaryCell = cell === null || cell === void 0 ? void 0 : cell.standardCell;
			this.showActivePoint();
		};
		_proto.isInteracting = function isInteracting() {
			return this.scrollBar.isDragging() || this.scrollBar.isHovering();
		};
		_proto.isClickOnExtendArea = function isClickOnExtendArea(offsetX, offsetY) {
			if (this.activePointRect.height === this.minHeight) return false;
			var { scale } = this.collector.size;
			if (isHitRect(offsetX, offsetY, {
				x: this.activePointRect.x * scale,
				y: (this.activePointRect.y + this.minHeight) * scale,
				width: this.activePointRect.width * scale,
				height: (this.activePointRect.height - this.minHeight) * scale
			})) return true;
			return false;
		};
		_proto.isClickButtonArea = function isClickButtonArea(offsetX, offsetY) {
			if (this.buttonInfos.length === 0) return false;
			return this.buttonInfos.some((button) => {
				var { rect } = button;
				return isHitRect(offsetX, offsetY, {
					x: this.activePointRect.x + rect.x,
					y: this.activePointRect.y + rect.y,
					width: rect.width,
					height: rect.height
				});
			});
		};
		_proto.setFieldGroupTitleRect = function setFieldGroupTitleRect(rect) {
			this.fieldGroupTitleRect = rect;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGridActivePoint,
				isLock: () => this.isInteracting()
			} };
		};
		_proto.getActivePointScreenY = function getActivePointScreenY(rowInfo) {
			var _a;
			if (this.parentApi.getFloatState().isShow()) return ((_a = this.renderer.getFeature(IGridRecordFloat)) === null || _a === void 0 ? void 0 : _a.getY()) || 0;
			var { size, range } = this.collector;
			return rowInfo.y + size.activityStartY - range.scrollTop;
		};
		_proto.handleScrollDeltaY = function handleScrollDeltaY(deltaY) {
			this.scrollTop += deltaY / this.scrollFactor;
			this.handleScrollY(this.scrollTop);
		};
		_proto.handleScrollY = function handleScrollY(y) {
			this.scrollTop = y;
			this.scrollTop = Math.min(this.totalHeight - this.activePointRect.height, this.scrollTop);
			this.scrollTop = Math.max(0, this.scrollTop);
			this.showActivePoint();
		};
		_proto.showActivePoint = function showActivePoint() {
			var _a;
			this.wrapperGroup.clear();
			if (!this.fieldId || !this.recordId) return;
			var columnInfo = this.collector.columns.getInfoByFieldId(this.fieldId);
			var rowInfo = this.collector.rows.getInfoByRecordId(this.recordId);
			if (!columnInfo || !rowInfo || this.collector.state.isHideGrid) return;
			this.isFrozen = columnInfo.isFrozen;
			var { borderWidth } = style.size;
			var { size, range } = this.collector;
			if (this.isFrozen) this.wrapperGroup.setAttrs({
				x: size.globalPaddingLeft,
				y: size.activityStartY - borderWidth,
				width: size.frozenWidth + borderWidth,
				height: size.activityViewHeight + borderWidth * 2
			});
			else this.wrapperGroup.setAttrs({
				x: size.activityStartX - borderWidth,
				y: size.activityStartY - borderWidth,
				width: size.activityViewWidth + 2 * borderWidth,
				height: size.activityViewHeight + borderWidth * 2
			});
			var normalY = rowInfo.y + size.activityStartY - range.scrollTop;
			var activePointY = 0;
			if (this.parentApi.getFloatState().isShow()) activePointY = ((_a = this.renderer.getFeature(IGridRecordFloat)) === null || _a === void 0 ? void 0 : _a.getY()) || 0;
			else activePointY = normalY;
			var info = this.collectContentInfo(columnInfo.width, activePointY - normalY);
			if (!info) return;
			this.minHeight = this.collector.rows.getRecordSize();
			var field = this.collector.dataUtil.getFieldByFieldId(this.fieldId);
			this.totalHeight = domainConfig.getIsWb() && !isWbTextLikeField(field) && (field === null || field === void 0 ? void 0 : field.getType()) !== FieldType.ATTACHMENT || this.isMultiCellSelection() ? this.minHeight : info.contentHeight + this.defaultStyle.cellPadding * 2;
			this.maxHeight = this.getMaxHeight(this.totalHeight);
			this.setActivePointInfo({
				x: columnInfo.x - (this.isFrozen ? 0 : range.scrollLeft),
				y: activePointY,
				width: columnInfo.width,
				height: Math.min(this.totalHeight, this.maxHeight)
			});
			if (!this.isBackStage) {
				this.drawActivePointWrapper();
				this.drawActivePointContent(info.contents);
				this.drawButtons(info.buttons);
				this.scrollBar.updatePosition();
			}
			this.contents = info.contents;
			this.buttonInfos = info.buttons;
			this.checkRangeVaild();
		};
		/**
		* 兜底修正 range 与 activePoint 不一致的异常态。
		*
		* 背景：某些外部路径（如后端选区回放、批量数据变更后的重算、跨视图同步等）会
		* 分别更新 range 与 activePoint，理论上应保证两者指向同一格，但实际存在偶发
		* 错位（表现为 activePoint 高亮框落在 range 蓝色选区之外，见用户截图）。此时
		* 后续依赖两者一致的逻辑（复制/填充/键盘扩选）都会出错。
		
		*/ _proto.checkRangeVaild = function checkRangeVaild() {
			if (!domainConfig.getIsWb()) return;
			var selection = this.rangeModel.getCurrentSelection();
			if (!selection.isRangeSelection()) return;
			var range = selection.getRanges();
			if (!range || range.startRow !== range.endRow || range.startColumn !== range.endColumn) return;
			var viewActivePoint = this.resolveViewActivePoint();
			if (!viewActivePoint) {
				this.rangeModel.resetSelection();
				return;
			}
			var { row, column } = viewActivePoint;
			if (row === range.startRow && column === range.startColumn) return;
			logger.warn("[GridActivePoint] range/activePoint mismatch, correct range to activePoint", {
				range,
				viewActivePoint,
				fieldId: this.fieldId,
				recordId: this.recordId
			});
			this.rangeModel.selectRange({
				startRow: row,
				endRow: row,
				startColumn: column,
				endColumn: column
			}, {
				row,
				column
			});
		};
		/**
		* 把 feature 当前持有的 `fieldId/recordId` 反查为 `{row, column}`。
		* - recordId/fieldId 为空（未落定 / 列标题态）→ 返回 null
		* - 反查失败（当前行/列已被隐藏或筛除，属于数据变更过渡态）→ 返回 null
		*/ _proto.resolveViewActivePoint = function resolveViewActivePoint() {
			if (!this.fieldId || !this.recordId) return null;
			var { dataUtil } = this.collector;
			var column = dataUtil.getVisibleFieldIds().indexOf(this.fieldId);
			var row = dataUtil.getDisplayedRecordIds().indexOf(this.recordId);
			if (row < 0 || column < 0) return null;
			return {
				row,
				column
			};
		};
		/**
		* 当前选区是否覆盖多个单元格。
		* - 行选 / 列选：只要非空即视为多格（选区跨了一整行 / 一整列）；
		* - 分区选区：只要跨行或跨列即视为多格；
		* - 空选区：视为单格 / 无选区。
		*/ _proto.isMultiCellSelection = function isMultiCellSelection() {
			var selection = this.rangeModel.getCurrentSelection();
			if (selection.isEmptyRanges()) return false;
			if (selection.isRowSelection() || selection.isColumnSelection()) return true;
			if (selection.isRangeSelection()) {
				var range = selection.getRanges();
				if (!range) return false;
				return range.startRow !== range.endRow || range.startColumn !== range.endColumn;
			}
			return false;
		};
		_proto.collectContentInfo = function collectContentInfo(columnWidth, deltaY) {
			var field = this.collector.dataUtil.getFieldByFieldId(this.fieldId);
			var standardCell = this.temporaryCell || this.collector.dataUtil.getStandardCell(this.fieldId, this.recordId);
			if (!field || !standardCell) return;
			var { contents, size } = this.collector;
			var layoutRect = contents.getCellRect(this.fieldId, this.recordId);
			if (!layoutRect) return;
			layoutRect.y += deltaY;
			var canEditCell = this.parentApi.getStatus().getPermissionStatus("canEditCell", {
				fieldId: this.fieldId,
				recordId: this.recordId
			}) && !this.context.customConfig;
			var collectConfig = getActivePointCollectConfig(field, canEditCell, this.collector.dataUtil, this.isMultiCellSelection());
			var { minRowHeight } = this.collector.size;
			var preDoInfo = preDoActivePointData(field, this.recordId, columnWidth, minRowHeight, standardCell, collectConfig, canEditCell, this.collector.dataUtil);
			layoutRect.width -= preDoInfo.iconTakeWidth;
			layoutRect.y += size.activityStartY;
			layoutRect.height = getCollectHeight(field, layoutRect.height, standardCell);
			var assembleCell = preDoInfo.assembleCell || standardCell;
			var drawConfigs;
			var wbMeasureFieldType;
			if (domainConfig.getIsWb()) {
				var fieldTitle = field.getTitle();
				if (isWbSpecialField(fieldTitle, ViewType.GRID)) {
					drawConfigs = collectWbSpecialCell({
						fieldTitle,
						viewScope: ViewType.GRID,
						rect: layoutRect,
						collectConfig,
						standardCell,
						field
					});
					wbMeasureFieldType = getWbSpecialMeasureFieldType(fieldTitle, ViewType.GRID);
				}
			}
			if (!drawConfigs) drawConfigs = fieldCollector.collect(layoutRect, collectConfig, assembleCell, field);
			if (!drawConfigs) return null;
			return {
				contentHeight: drawConfigs.length === 0 ? 0 : fieldCollector.measureHeight(wbMeasureFieldType !== null && wbMeasureFieldType !== void 0 ? wbMeasureFieldType : field, drawConfigs),
				contents: drawConfigs,
				buttons: preDoInfo.buttons
			};
		};
		_proto.drawActivePointWrapper = function drawActivePointWrapper() {
			var { dataUtil } = this.collector;
			var fillBackground = dataUtil.getCellFillColor(this.recordId, this.fieldId) || dataUtil.getRowHeaderBackgroundColor(this.recordId) || this.defaultStyle.backgroundColor;
			this.wrapperGroup.add(pen.config.rect(Object.assign(Object.assign({}, this.activePointRect), {
				borderWidth: this.defaultStyle.borderWidth,
				background: fillBackground,
				borderColor: this.defaultStyle.borderColor,
				onDoubleClick: () => {
					var param = { type: ActivePointType.DBL_CLICK };
					this.emitter.service.activePointEditor.fire(param);
					logger.info("[xview] active point double click", param);
				},
				onWheel: (event, stopPropagation) => {
					if (this.totalHeight <= this.activePointRect.height) return;
					stopPropagation();
					this.handleScrollDeltaY(event.deltaY);
				}
			})), 0, 0, this.collector.widgetCollector.getStickyFeatureClipRect());
		};
		_proto.drawActivePointContent = function drawActivePointContent(contents) {
			var { range } = this.collector;
			var { x, y, width, height } = this.activePointRect;
			var contentGroup = pen.group({
				x: x + this.defaultStyle.borderWidth,
				y: y + this.defaultStyle.borderWidth,
				width: width - this.defaultStyle.borderWidth * 2,
				height: height - this.defaultStyle.borderWidth * 2
			});
			this.wrapperGroup.addGroup(contentGroup);
			var stickyClipArea = this.collector.widgetCollector.getStickyFeatureClipRect();
			contents.forEach((config) => contentGroup.add(config, this.isFrozen ? 0 : -range.scrollLeft, -range.scrollTop - this.scrollTop, stickyClipArea));
		};
		_proto.drawButtons = function drawButtons(buttons) {
			var buttonGroup = pen.group({
				x: this.activePointRect.x,
				y: this.activePointRect.y,
				width: this.activePointRect.width,
				height: this.activePointRect.height
			});
			var stickyClipArea = this.collector.widgetCollector.getStickyFeatureClipRect();
			buttons.forEach(({ alias, rect, iconSize, text }) => {
				var backgroundRect = Object.assign(Object.assign({}, rect), {
					x: this.activePointRect.x + rect.x,
					y: this.activePointRect.y + rect.y
				});
				buttonGroup.add(pen.config.rect(Object.assign(Object.assign({}, backgroundRect), {
					background: text ? style.color.heavyCanvasBackground : style.color.normalBackground,
					borderRadius: style.size.borderRadius
				})), 0, 0, stickyClipArea);
				var delta = (rect.height - iconSize) / 2;
				buttonGroup.add(pen.config.icon(alias, {
					x: backgroundRect.x + delta,
					y: backgroundRect.y + delta,
					width: iconSize,
					height: iconSize,
					rotate: alias === NormalIconAlias.DROPDOWN ? this.dropdownRotate : 0
				}), 0, 0, stickyClipArea);
				if (text) buttonGroup.add(Object.assign(Object.assign({}, text), {
					x: backgroundRect.x + iconSize + style.size.tagMargin,
					y: backgroundRect.y
				}), 0, 0, stickyClipArea);
			});
			this.wrapperGroup.addGroup(buttonGroup);
		};
		_proto.setActivePointInfo = function setActivePointInfo(rect) {
			this.activePointRect = rect;
			if (this.totalHeight <= this.minHeight) {
				this.activePointRect.height = this.minHeight;
				return;
			}
			this.activePointRect.height = Math.min(this.maxHeight || this.totalHeight, this.totalHeight, this.activePointRect.height);
		};
		_proto.getMaxHeight = function getMaxHeight(totalHeight) {
			var field = this.collector.dataUtil.getFieldByFieldId(this.fieldId);
			if (!field) return this.fixedMaxHeight;
			var fieldType = field.getType();
			if (isFormulaLikeField(field)) {
				var resultFiled = field.getResultFieldAttributes();
				if (!resultFiled) return this.fixedMaxHeight;
				fieldType = resultFiled.getType();
			}
			if (field && ShowAllContentFieldTypes.includes(fieldType)) return totalHeight;
			return this.fixedMaxHeight;
		};
		_create_class$10(GridActivePoint, [
			{
				key: "scrollFactor",
				get: function() {
					var _a, _b;
					return (_b = (_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.scrollerFactor) !== null && _b !== void 0 ? _b : 2;
				}
			},
			{
				key: "fixedMaxHeight",
				get: function() {
					var { size } = this.collector;
					var dynamicHeight = size.globalViewBodyRect.y + size.globalViewBodyRect.height - this.activePointRect.y;
					return Math.max(this.minHeight, Math.min(dynamicHeight, FixMaxHeight, this.collector.size.activityViewHeight) - 2);
				}
			},
			{
				key: "defaultStyle",
				get: function() {
					return {
						cellPadding: style.size.cellPadding,
						borderWidth: style.size.borderWidth * 2,
						borderColor: style.color.selectionBorderColor,
						backgroundColor: style.color.normalBackground
					};
				}
			}
		]);
		return GridActivePoint;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/active-point/index.js
var init_active_point = __esmMin((() => {
	init_interface$18();
	init_main$15();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/main.js
function _inherits$31(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$31(subClass, superClass);
}
function _set_prototype_of$31(o, p) {
	_set_prototype_of$31 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$31(o, p);
}
var GridSelection;
var init_main$14 = __esmMin((() => {
	init_es();
	init_config$1();
	init_index_interface$2();
	init_constants();
	init_interface$23();
	init_auto_scroll();
	init_interface$19();
	init_renderer$1();
	init_grid_feature();
	init_active_point();
	init_area_interactive();
	init_get_group_path();
	init_string_group_path();
	init_is_in_rect();
	GridSelection = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$31(GridSelection, GridFeatureBase);
		function GridSelection() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.mousedownGroupPath = "";
			_this.isSelectReady = false;
			_this.selecting = false;
			_this.activePoint = null;
			_this.start = {
				rowIndex: -1,
				columnIndex: -1
			};
			_this.end = {
				rowIndex: -1,
				columnIndex: -1
			};
			_this.onDocumentMouseUp = () => {
				_this.selecting = false;
				_this.isSelectReady = false;
				_this.mousedownGroupPath = "";
				_this.unRegisterWindowMousemove();
			};
			_this.onDocumentMouseDown = (evt) => {
				var _a;
				var { event, target } = evt;
				_this.emitter.service.tooltip.fire({
					forceVisible: false,
					hide: true
				});
				if (_this.isPrevantFromOtherFeature(evt) || _this.isInVisible) return;
				var { columnInfo, rowInfo, isBlank, isOutStage } = target;
				var isField = columnInfo && !rowInfo && !isBlank;
				var isRecordOperator = rowInfo && rowInfo.type === RowType.Record && (columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.id) === "Operator";
				if (isField || isRecordOperator) return;
				if (isOutStage || isBlank) {
					if (clickIgnoreEle(event.composedPath())) return;
					if (!_this.parentApi.getFloatState().isShow()) _this.resetSelection(NotifySourceType.OTHERS);
					return;
				}
				var fieldId = columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.id;
				var { rowIndex, columnIndex, groupPath } = _this.getTargetInfo(columnInfo, rowInfo);
				if (rowIndex === -1 || columnIndex === -1) return;
				if (_this.checkContextMenuValid(event, rowIndex, columnIndex)) return;
				if (event.shiftKey && _this.rangeModel.getCurrentSelection() && _this.currentSelection.getActivePoint()) {
					_this.handleShiftSelecting(rowIndex, columnIndex);
					return;
				}
				_this.start.rowIndex = rowIndex;
				_this.start.columnIndex = columnIndex;
				_this.end.rowIndex = rowIndex;
				_this.end.columnIndex = columnIndex;
				_this.mousedownGroupPath = groupPath;
				_this.activePoint = {
					row: rowIndex,
					column: columnIndex
				};
				_this.isSelectReady = true;
				_this.updateRangeModelSelection();
				_this.registerWindowMousemove();
				(_a = _this.renderer.getFeature(IGridAutoScroll)) === null || _a === void 0 || _a.readyBoth();
				if (rowInfo && "recordId" in rowInfo) _this.parentApi.scrollToVisibility({
					fieldId,
					recordId: rowInfo.recordId
				});
			};
			_this.onWindowMouseMove = (evt) => {
				if (_this.isSelectReady) _this.handleMouseSelecting(evt.target);
			};
			return _this;
		}
		var _proto = GridSelection.prototype;
		_proto.bootstrap = function bootstrap() {
			this.selectionRenderer = this._register(new SelectionRenderer(this.renderer, { isInVisible: () => this.isInVisible }));
			if (!this.context.customConfig || this.context.customConfig.featureServiceConfig.active_point) {
				this._register(this.UIEvent.document.onMouseUp(this.onDocumentMouseUp));
				this._register(this.UIEvent.document.onMouseDown(this.onDocumentMouseDown));
			}
		};
		_proto.render = function render() {
			if (this.isInVisible) return;
			this.selectionRenderer.update();
		};
		_proto.isSelecting = function isSelecting() {
			return this.isSelectReady && this.selecting;
		};
		_proto.getCurrentSelectionRect = function getCurrentSelectionRect() {
			return this.selectionRenderer.getCurrentSelectionRect();
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGridSelection,
				isLock: () => this.isSelecting()
			} };
		};
		_proto.isPrevantFromOtherFeature = function isPrevantFromOtherFeature(evt) {
			var { target, clientX, clientY } = evt.event;
			if (!this.root.contains(target) && isHitRect(clientX, clientY, this.root.getBoundingClientRect())) return true;
			if (this.featureLock.isPreventFromOtherFeature(IGridSelection)) return true;
			var activePointFeature = this.renderer.getFeature(IGridActivePoint);
			if (activePointFeature === null || activePointFeature === void 0 ? void 0 : activePointFeature.isClickOnExtendArea(evt.x, evt.y)) return true;
			if (activePointFeature === null || activePointFeature === void 0 ? void 0 : activePointFeature.isClickButtonArea(evt.x, evt.y)) return true;
			var areaFeature = this.renderer.getFeature(IGridAreaInteractive);
			if (areaFeature === null || areaFeature === void 0 ? void 0 : areaFeature.isMouseDownOnFeature()) return true;
			return false;
		};
		_proto.checkContextMenuValid = function checkContextMenuValid(event, rowIndex, columnIndex) {
			if (!(event.button === 2)) return false;
			return this.currentSelection.isRangeInSelection({
				startRow: rowIndex,
				endRow: rowIndex,
				startColumn: columnIndex,
				endColumn: columnIndex
			});
		};
		_proto.handleShiftSelecting = function handleShiftSelecting(endRowIndex, endColumnIndex) {
			var activePoint = this.currentSelection.getActivePoint();
			var { row: activeRecordIndex, column: activeFieldIndex } = activePoint;
			if (this.getGroupPathByRecordVisibleIndex(endRowIndex) !== this.getGroupPathByRecordVisibleIndex(activeRecordIndex)) return;
			var range = {
				startRow: Math.min(activeRecordIndex, endRowIndex),
				endRow: Math.max(activeRecordIndex, endRowIndex),
				startColumn: Math.min(activeFieldIndex, endColumnIndex),
				endColumn: Math.max(activeFieldIndex, endColumnIndex)
			};
			this.rangeModel.selectRange(range, activePoint);
		};
		_proto.getGroupPathByRecordVisibleIndex = function getGroupPathByRecordVisibleIndex(recordIndx) {
			var { dataUtil } = this.collector;
			return dataUtil.getCurrentView().getGroupPathByRecordVisibleIndex(recordIndx).toString();
		};
		_proto.registerWindowMousemove = function registerWindowMousemove() {
			if (!this.windowMouseMove) this.windowMouseMove = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
		};
		_proto.unRegisterWindowMousemove = function unRegisterWindowMousemove() {
			if (this.windowMouseMove) {
				this.windowMouseMove.dispose();
				this.windowMouseMove = void 0;
			}
		};
		_proto.handleMouseSelecting = function handleMouseSelecting(target) {
			var { rowIndex, columnIndex, groupPath } = this.getTargetInfo(target.columnInfo, target.rowInfo);
			if (this.mousedownGroupPath === groupPath) {
				if (rowIndex !== -1) this.end.rowIndex = rowIndex;
			}
			if (columnIndex !== -1) this.end.columnIndex = columnIndex;
			this.updateRangeModelSelection();
			this.selecting = true;
		};
		_proto.getTargetInfo = function getTargetInfo(columnInfo, rowInfo) {
			var recordId = rowInfo && "recordId" in rowInfo ? rowInfo.recordId : "";
			var fieldId = columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.id;
			var { dataUtil, rows } = this.collector;
			var rowIndex = -1;
			var columnIndex = -1;
			var groupPath = rowInfo ? getRowInfoGroupPath(rowInfo, rows) : [];
			if (recordId) rowIndex = dataUtil.getRecordIndexFromVisibleRecordIds(recordId);
			if (fieldId) columnIndex = dataUtil.getVisibleFieldIds().indexOf(fieldId);
			return {
				rowIndex,
				columnIndex,
				groupPath: stringifyGroupPath(groupPath)
			};
		};
		_proto.updateRangeModelSelection = function updateRangeModelSelection() {
			this.rangeModel.selectRange(this.getToRange(), this.activePoint);
		};
		_proto.getToRange = function getToRange() {
			var range = {
				startRow: this.start.rowIndex,
				startColumn: this.start.columnIndex,
				endRow: this.end.rowIndex,
				endColumn: this.end.columnIndex
			};
			if (this.start.rowIndex > this.end.rowIndex) {
				range.startRow = this.end.rowIndex;
				range.endRow = this.start.rowIndex;
			}
			if (this.start.columnIndex > this.end.columnIndex) {
				range.startColumn = this.end.columnIndex;
				range.endColumn = this.start.columnIndex;
			}
			return range;
		};
		return GridSelection;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/selection/index.js
var init_selection = __esmMin((() => {
	init_interface$19();
	init_main$14();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/collaborator/interface.js
var IGridCollaborator;
var init_interface$13 = __esmMin((() => {
	init_module();
	IGridCollaborator = createDecorator("IGridCollaborator");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/collaborator/main.js
function _inherits$30(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$30(subClass, superClass);
}
function _set_prototype_of$30(o, p) {
	_set_prototype_of$30 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$30(o, p);
}
var getCellId, tipConfig$1, GridCollaborator;
var init_main$13 = __esmMin((() => {
	init_es();
	init_pen();
	init_production();
	init_style();
	init_grid_feature();
	getCellId = (fieldId, recordId) => `${fieldId}-${recordId}`;
	tipConfig$1 = {
		paddingH: 5,
		tipBoxHeight: 20,
		fontSize: style.size.fontSizeSmall,
		fontColor: style.color.whiteFontColor,
		borderWidth: style.size.borderWidth * 2
	};
	GridCollaborator = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$30(GridCollaborator, GridFeatureBase);
		function GridCollaborator() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.showDuration = 5e3;
			_this.editingUserIds = [];
			_this.showTipUserIds = [];
			_this.userNameMap = /* @__PURE__ */ new Map();
			_this.renderInfoMap = /* @__PURE__ */ new Map();
			_this.onActivePointChanged = ({ activePoint }) => {
				if (activePoint && !_this.isInVisible) _this.showTipOnActivePoint(activePoint.column, activePoint.row);
			};
			_this.add = (collabCursor) => {
				var _a;
				var { tableId, fieldId, recordId } = collabCursor.cell;
				var columnInfo = _this.collector.columns.getInfoByFieldId(fieldId);
				var rowInfo = _this.collector.rows.getInfoByRecordId(recordId);
				if (!columnInfo || !rowInfo || ((_a = _this.collector.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id) !== tableId) return;
				var cellRect = {
					x: columnInfo.x,
					y: rowInfo.y,
					width: columnInfo.width,
					height: rowInfo.height
				};
				var { bgcolor = "black", userId } = collabCursor.userInfo;
				_this.userNameMap.set(userId, collabCursor.userInfo.name);
				var cellId = getCellId(fieldId, recordId);
				var renderInfo = _this.renderInfoMap.get(cellId);
				if (!renderInfo) renderInfo = {
					cellRect,
					bgcolor,
					fieldId,
					recordId,
					userIds: [userId],
					isFrozen: columnInfo.isFrozen
				};
				else renderInfo.userIds.push(userId);
				if (collabCursor.isEditing) _this.editingUserIds.push(userId);
				else if (_this.editingUserIds.includes(userId)) {
					var index = _this.editingUserIds.indexOf(userId);
					if (index !== -1) _this.editingUserIds.splice(index, 1);
				}
				_this.autoHide(userId);
				_this.updateTipInfo(renderInfo, userId);
				_this.renderInfoMap.set(cellId, renderInfo);
				_this.renderCollaborators();
				if (collabCursor.isEditing) productReport.grid.showCollaboratorEdit();
				else productReport.grid.showCollaboratorSelect();
			};
			_this.remove = (userId) => {
				var idIndex = _this.showTipUserIds.indexOf(userId);
				if (idIndex !== -1) _this.showTipUserIds.splice(idIndex, 1);
				var editIndex = _this.editingUserIds.indexOf(userId);
				if (editIndex !== -1) _this.editingUserIds.splice(editIndex, 1);
				_this.userNameMap.delete(userId);
				_this.renderInfoMap.forEach((renderInfo) => {
					var userIdIndex = renderInfo.userIds.indexOf(userId);
					if (userIdIndex !== -1) {
						renderInfo.userIds.splice(userIdIndex, 1);
						_this.updateTipInfo(renderInfo, userId);
					}
					if (renderInfo.userIds.length === 0) _this.renderInfoMap.delete(getCellId(renderInfo.fieldId, renderInfo.recordId));
				});
				_this.renderCollaborators();
			};
			return _this;
		}
		var _proto = GridCollaborator.prototype;
		_proto.bootstrap = function bootstrap() {
			var groupOption = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			this.frozenGroup = this._register(pen.group(Object.assign({}, groupOption)));
			this.activeGroup = this._register(pen.group(Object.assign({}, groupOption)));
			this.layer.addGroup(this.frozenGroup);
			this.layer.addGroup(this.activeGroup);
			this._register(CollabEvent.onCollabCursorAddedEmitter.event(this.add));
			this._register(CollabEvent.onCollabCursorRemovedEmitter.event(this.remove));
			this._register(this.rangeModel.onActivePointChanged(this.onActivePointChanged));
		};
		_proto.render = function render() {
			if (this.isInVisible) return;
			this.updatePosition();
			this.renderCollaborators();
		};
		_proto.updatePosition = function updatePosition() {
			this.renderInfoMap.forEach((renderInfo) => {
				var columnInfo = this.collector.columns.getInfoByFieldId(renderInfo.fieldId);
				var rowInfo = this.collector.rows.getInfoByRecordId(renderInfo.recordId);
				if (!columnInfo || !rowInfo) {
					this.renderInfoMap.delete(getCellId(renderInfo.fieldId, renderInfo.recordId));
					return;
				}
				renderInfo.cellRect = {
					x: columnInfo.x,
					y: rowInfo.y,
					width: columnInfo.width,
					height: rowInfo.height
				};
			});
		};
		_proto.showTipOnActivePoint = function showTipOnActivePoint(columnIndex, rowIndex) {
			var fieldId = this.collector.dataUtil.getVisibleFieldIds()[columnIndex];
			var recordId = this.collector.dataUtil.getDisplayedRecordIds()[rowIndex];
			var cellId = getCellId(fieldId, recordId);
			var renderInfo = this.renderInfoMap.get(cellId);
			if (!renderInfo) return;
			var lastUserId = renderInfo.userIds[renderInfo.userIds.length - 1];
			this.autoHide(lastUserId);
			this.renderInfoMap.forEach((renderInfo) => this.updateTipInfo(renderInfo, lastUserId));
			this.renderCollaborators();
		};
		_proto.renderCollaborators = function renderCollaborators() {
			this.frozenGroup.clear();
			this.activeGroup.clear();
			this.clip();
			this.renderInfoMap.forEach((renderInfo) => {
				this.renderCollabInfo(renderInfo.isFrozen ? this.frozenGroup : this.activeGroup, renderInfo);
			});
		};
		_proto.clip = function clip() {
			var { globalPaddingLeft, activityStartX, frozenWidth, activityViewWidth, activityStartY, activityViewHeight } = this.collector.size;
			this.frozenGroup.setAttrs({
				x: globalPaddingLeft,
				y: activityStartY - tipConfig$1.borderWidth,
				width: frozenWidth + activityViewWidth,
				height: activityViewHeight
			});
			this.activeGroup.setAttrs({
				x: activityStartX,
				y: activityStartY - tipConfig$1.borderWidth,
				width: activityViewWidth + 2 * tipConfig$1.borderWidth,
				height: activityViewHeight
			});
		};
		_proto.updateTipInfo = function updateTipInfo(renderInfo, userId) {
			if (!this.showTipUserIds.includes(userId)) {
				renderInfo.tipInfo = void 0;
				return;
			}
			var { cellRect, userIds } = renderInfo;
			var tipInfo = { rect: pen.config.rect({
				x: cellRect.x - tipConfig$1.borderWidth,
				y: cellRect.y,
				width: 0,
				height: tipConfig$1.tipBoxHeight
			}) };
			var text = this.getTextContent(userId, userIds);
			var tipBoxWidth = pen.util.measureTextWidth(text, tipConfig$1.fontSize) + 2 * tipConfig$1.paddingH;
			tipInfo.rect.width = tipBoxWidth;
			if (tipInfo.rect.y <= 0) tipInfo.rect.y += cellRect.height;
			else tipInfo.rect.y -= tipInfo.rect.height;
			tipInfo.rect.x += style.size.borderWidth;
			tipInfo.text = pen.config.text(Object.assign(Object.assign({}, tipInfo.rect), {
				text,
				fontSize: tipConfig$1.fontSize,
				color: tipConfig$1.fontColor,
				align: "center"
			}));
			renderInfo.tipInfo = tipInfo;
		};
		_proto.getTextContent = function getTextContent(userId, currentCellUserIds) {
			if (this.editingUserIds.includes(userId)) return this.userNameMap.get(userId) + i18n.t("正在输入…");
			return currentCellUserIds.slice(0, 2).map((userId) => this.userNameMap.get(userId)).join("、") + (currentCellUserIds.length > 2 ? i18n.t(" 等 {{userCount}} 人", { userCount: currentCellUserIds.length }) : "");
		};
		_proto.renderCollabInfo = function renderCollabInfo(group, collabInfo) {
			var { size, range } = this.collector;
			var { cellRect, tipInfo, bgcolor, isFrozen } = collabInfo;
			var deltaX = -(isFrozen ? 0 : range.scrollLeft);
			var deltaY = size.activityStartY - range.scrollTop;
			var stickyClipArea = this.collector.widgetCollector.getStickyFeatureClipRect();
			group.add(pen.config.rect(Object.assign(Object.assign({}, cellRect), {
				x: cellRect.x + deltaX,
				y: cellRect.y + deltaY,
				borderWidth: tipConfig$1.borderWidth,
				borderColor: bgcolor
			})), 0, 0, stickyClipArea);
			if (!tipInfo) return;
			group.add(pen.config.rect(Object.assign(Object.assign({}, tipInfo.rect), {
				x: tipInfo.rect.x + deltaX,
				y: tipInfo.rect.y + deltaY,
				background: bgcolor
			})), 0, 0, stickyClipArea);
			if (tipInfo.text) group.add(tipInfo.text, deltaX, deltaY, stickyClipArea);
		};
		_proto.autoHide = function autoHide(userId) {
			if (this.showTipUserIds.includes(userId)) return;
			this.showTipUserIds.push(userId);
			setTimeout(() => {
				var index = this.showTipUserIds.indexOf(userId);
				if (index !== -1) this.showTipUserIds.splice(index, 1);
				this.renderInfoMap.forEach((renderInfo) => this.updateTipInfo(renderInfo, userId));
				this.renderCollaborators();
			}, this.showDuration);
		};
		return GridCollaborator;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/collaborator/index.js
var init_collaborator = __esmMin((() => {
	init_interface$13();
	init_main$13();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/frozen-line/interface.js
var IGridFrozenLine;
var init_interface$12 = __esmMin((() => {
	init_module();
	IGridFrozenLine = createDecorator("IGridFrozenLine");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/frozen-line/main.js
function _inherits$29(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$29(subClass, superClass);
}
function _set_prototype_of$29(o, p) {
	_set_prototype_of$29 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$29(o, p);
}
function _type_of(obj) {
	"@swc/helpers - typeof";
	return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var GridFrozenLine;
var init_main$12 = __esmMin((() => {
	init_esm$1();
	init_pen();
	init_style();
	init_grid_feature();
	init_get_frozen_end_y();
	GridFrozenLine = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$29(GridFrozenLine, GridFeatureBase);
		function GridFrozenLine() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.frozenLineRate = ua.isMobile ? .5 : .9;
			_this.onResize = () => {
				_this.group.setAttrs(_this.collector.size.globalRect);
				_this.checkMaxLocalFrozen();
				_this.render();
			};
			return _this;
		}
		var _proto = GridFrozenLine.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.parentApi.onDataChange(() => {
				this.checkMaxLocalFrozen();
			}));
			this._register(this.UIEvent.stage.onResize(this.onResize));
		};
		_proto.render = function render() {
			if (this.isInVisible) return;
			this.paintFrozenLine();
		};
		_proto.checkMaxLocalFrozen = function checkMaxLocalFrozen() {
			var { size, state, columns } = this.collector;
			var operatorFieldNum = state.getOperatorFieldNum();
			var dataSetFrozenCount = this.findFrozenFieldIndex() + operatorFieldNum;
			if (dataSetFrozenCount === 1) {
				this.updateFrozenCount(dataSetFrozenCount);
				return;
			}
			var maxFrozenWidth = size.rootWidth * this.frozenLineRate;
			var dataSetColumnInfo = columns.getInfos().get(dataSetFrozenCount);
			if (!dataSetColumnInfo) dataSetColumnInfo = columns.getInfos().get(columns.getInfos().size - 1);
			if (!dataSetColumnInfo || dataSetColumnInfo.x + dataSetColumnInfo.width <= maxFrozenWidth) {
				if (!this.isFrozenCountInsideFieldGroup(dataSetFrozenCount)) {
					this.updateFrozenCount(dataSetFrozenCount);
					return;
				}
			}
			var maxFrozenCount = operatorFieldNum;
			while (maxFrozenCount < columns.getInfos().size) {
				var columnInfo = columns.getInfos().get(maxFrozenCount);
				if (!columnInfo) continue;
				if (columnInfo.x + columnInfo.width >= maxFrozenWidth) break;
				if (dataSetFrozenCount <= maxFrozenCount) break;
				maxFrozenCount += 1;
			}
			var frozenEdgeColumn = columns.getInfos().get(maxFrozenCount - 1);
			if (frozenEdgeColumn === null || frozenEdgeColumn === void 0 ? void 0 : frozenEdgeColumn.fieldGroupId) {
				var lastFrozenColumn = columns.getInfos().get(maxFrozenCount);
				if ((lastFrozenColumn === null || lastFrozenColumn === void 0 ? void 0 : lastFrozenColumn.fieldGroupId) === frozenEdgeColumn.fieldGroupId) while (maxFrozenCount < columns.getInfos().size) {
					var nextColumn = columns.getInfos().get(maxFrozenCount);
					if ((nextColumn === null || nextColumn === void 0 ? void 0 : nextColumn.fieldGroupId) !== frozenEdgeColumn.fieldGroupId) break;
					maxFrozenCount += 1;
				}
			}
			this.updateFrozenCount(maxFrozenCount);
		};
		_proto.findFrozenFieldIndex = function findFrozenFieldIndex() {
			var _loop = function(index) {
				var frozenFieldId = allFieldIds[index];
				var fieldIndex = visibleFieldIds.findIndex((fieldId) => fieldId === frozenFieldId);
				if (fieldIndex >= 0) return { v: fieldIndex + 1 };
			};
			var { dataUtil } = this.collector;
			var frozenCount = dataUtil.getFrozenFieldCount();
			var allFieldIds = dataUtil.getAllFieldIds();
			var visibleFieldIds = dataUtil.getVisibleFieldIds();
			for (var index = frozenCount - 1; index >= 0; index--) {
				var _ret = _loop(index);
				if (_type_of(_ret) === "object") return _ret.v;
			}
			return 0;
		};
		/**
		* 判断冻结位置是否落在列编组中间（即冻结线会截断编组）。
		* frozenCount 是冻结列数（含操作列），冻结线画在第 frozenCount-1 列与第 frozenCount 列之间。
		* 如果这两列属于同一个编组，说明冻结线截断了编组。
		*/ _proto.isFrozenCountInsideFieldGroup = function isFrozenCountInsideFieldGroup(frozenCount) {
			var { columns } = this.collector;
			var lastFrozenColumn = columns.getInfos().get(frozenCount - 1);
			var firstActivityColumn = columns.getInfos().get(frozenCount);
			if (!(lastFrozenColumn === null || lastFrozenColumn === void 0 ? void 0 : lastFrozenColumn.fieldGroupId) || !(firstActivityColumn === null || firstActivityColumn === void 0 ? void 0 : firstActivityColumn.fieldGroupId)) return false;
			return lastFrozenColumn.fieldGroupId === firstActivityColumn.fieldGroupId;
		};
		_proto.updateFrozenCount = function updateFrozenCount(forzenCount) {
			if (forzenCount !== this.collector.state.getColumnFrozenCount()) {
				this.collector.state.setColumnFrozenCount(forzenCount);
				this.collector.patch();
				this.parentApi.renderMain();
			}
		};
		_proto.paintFrozenLine = function paintFrozenLine() {
			this.group.clear();
			if (ua.isMobile || this.isInVisible) return;
			var { size, range } = this.collector;
			var borderWidth = style.size.borderWidth * 2;
			var points = [
				size.activityStartX,
				size.globalPaddingTop,
				size.activityStartX,
				getFrozenEndY(this.collector)
			];
			this.group.add(pen.config.line({
				x: 0,
				y: 0,
				points,
				borderWidth
			}));
			if (range.scrollLeft > 0) this.group.add(pen.config.rect({
				x: points[0],
				y: points[1],
				width: 4,
				height: points[3] - points[1],
				background: style.color.hoverBackground
			}));
		};
		return GridFrozenLine;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/frozen-line/index.js
var init_frozen_line = __esmMin((() => {
	init_interface$12();
	init_main$12();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/search-cursor/interface.js
var IGridSearchCursor;
var init_interface$11 = __esmMin((() => {
	init_module();
	IGridSearchCursor = createDecorator("IGridSearchCursor");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/search-cursor/main.js
function _inherits$28(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$28(subClass, superClass);
}
function _set_prototype_of$28(o, p) {
	_set_prototype_of$28 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$28(o, p);
}
var GridSearchCursor;
var init_main$11 = __esmMin((() => {
	init_esm$1();
	init_pen();
	init_style();
	init_grid_feature();
	GridSearchCursor = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$28(GridSearchCursor, GridFeatureBase);
		function GridSearchCursor() {
			return GridFeatureBase.apply(this, arguments) || this;
		}
		var _proto = GridSearchCursor.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group({
				x: 0,
				y: 0,
				width: 0,
				height: 0
			}));
			this.layer.addGroup(this.group);
		};
		_proto.render = function render() {
			if (this.isPreventFromOtherFeature()) return;
			this.group.clear();
			var highlightActive = this.collector.state.getHighlightActive();
			if (!highlightActive) return;
			var { fieldId, recordId } = highlightActive;
			if (!fieldId || !recordId) return;
			var rowInfo = this.collector.rows.getInfoByRecordId(recordId);
			var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
			if (!rowInfo || !columnInfo) return;
			var { range, size } = this.collector;
			var borderWidth = style.size.borderWidth * 2;
			if (columnInfo.isFrozen) this.group.setAttrs({
				x: 0,
				y: size.activityStartY,
				width: size.activityStartX + borderWidth,
				height: size.activityViewHeight
			});
			else this.group.setAttrs({
				x: size.activityStartX - borderWidth,
				y: size.activityStartY,
				width: size.activityViewWidth,
				height: size.activityViewHeight
			});
			this.group.add(pen.config.rect({
				x: columnInfo.x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
				y: rowInfo.y + size.activityStartY - range.scrollTop,
				width: columnInfo.width,
				height: rowInfo.height,
				borderWidth,
				borderColor: style.color.searchHighlightBorderColor
			}), 0, 0, this.collector.widgetCollector.getStickyFeatureClipRect());
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			if (this.isInVisible || this.collector.dataUtil.isGantt() && ua.isMobile) return true;
			return false;
		};
		return GridSearchCursor;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/search-cursor/index.js
var init_search_cursor = __esmMin((() => {
	init_interface$11();
	init_main$11();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/storage-sync/interface.js
var IGridStorageSync;
var init_interface$10 = __esmMin((() => {
	init_module();
	IGridStorageSync = createDecorator("IGridStorageSync");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/storage-sync/main.js
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
function _inherits$27(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$27(subClass, superClass);
}
function _set_prototype_of$27(o, p) {
	_set_prototype_of$27 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$27(o, p);
}
var GridStorageSync;
var init_main$10 = __esmMin((() => {
	init_storage_sync$2();
	GridStorageSync = /* @__PURE__ */ function(StorageSync) {
		"use strict";
		_inherits$27(GridStorageSync, StorageSync);
		function GridStorageSync() {
			var _this = StorageSync.apply(this, arguments) || this;
			_this.syncToStorage = () => {
				_this.renderer.collector.state.saveState();
				_this.renderer.collector.range.savePosition();
			};
			return _this;
		}
		var _proto = GridStorageSync.prototype;
		_proto.bootstrap = function bootstrap() {
			this._register(this.renderer.context.getCore().chunkManager.onAllChunkApplied((tableId) => {
				var _a;
				if (tableId === ((_a = this.renderer.context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id)) this.renderer.collector.range.restorePosition();
			}));
			StorageSync.prototype.bootstrap.call(this);
		};
		_create_class$9(GridStorageSync, [{
			key: "UIEvent",
			get: function() {
				return this.renderer.UIEvent;
			}
		}]);
		return GridStorageSync;
	}(StorageSync);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/common/storage-sync/index.js
var init_storage_sync = __esmMin((() => {
	init_interface$10();
	init_main$10();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/mobile/tap-interactive/interface.js
var IGridMobileTapInteractive;
var init_interface$9 = __esmMin((() => {
	init_module();
	IGridMobileTapInteractive = createDecorator("IGridMobileTapInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/mobile/tap-interactive/main.js
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
var GridMobileTapInteractive;
var init_main$9 = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_interface$23();
	init_grid_feature();
	init_get_group_path();
	GridMobileTapInteractive = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$26(GridMobileTapInteractive, GridFeatureBase);
		function GridMobileTapInteractive() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.autoHideTooltipDuration = 3e3;
			_this.onTouchStart = () => {
				_this.clearAll();
			};
			_this.onTap = (evt) => {
				var _a, _b, _c;
				var { target } = evt;
				if (!target || _this.isInVisible) return;
				_this.clearAll();
				if (((_a = target.rowInfo) === null || _a === void 0 ? void 0 : _a.type) === RowType.Stat) {
					_this.showStatTooltip(target);
					return;
				}
				if (((_b = target.rowInfo) === null || _b === void 0 ? void 0 : _b.type) === RowType.Record) {
					_this.tapRecord(target.rowInfo);
					return;
				}
				if (((_c = target.rowInfo) === null || _c === void 0 ? void 0 : _c.type) === RowType.GroupHead) {
					_this.tapGroupHead(target.rowInfo);
					return;
				}
			};
			return _this;
		}
		var _proto = GridMobileTapInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onTap(this.onTap));
			this._register(this.UIEvent.stage.onTouchStart(this.onTouchStart));
		};
		_proto.render = function render() {
			this.clearAll();
		};
		_proto.tapRecord = function tapRecord(rowInfo) {
			var innerRect = this.collector.getInnerRect(rowInfo);
			var { profile, size } = this.collector;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				x: innerRect.x + profile.operatorFieldWidth,
				y: innerRect.y + size.activityStartY,
				background: style.color.hoverBackground
			})));
			this.action.expandRow(rowInfo.recordId);
			logger.info("[xview] tapRecord", rowInfo.recordId);
		};
		_proto.tapGroupHead = function tapGroupHead(rowInfo) {
			this.action.clickFoldGroup(rowInfo.index);
			logger.info("[xview] tapGroupHead");
		};
		_proto.showStatTooltip = function showStatTooltip(target) {
			if (!target.columnInfo || !target.rowInfo) return;
			var groupPath = getRowInfoGroupPath(target.rowInfo, this.collector.rows);
			var statResult = this.collector.dataUtil.getStatResult(target.columnInfo.id, groupPath);
			if (!statResult) return;
			var statWidth = pen.util.measureTextWidth(statResult.label + statResult.value);
			var rect = {
				x: target.columnInfo.x - (target.columnInfo.isFrozen ? 0 : this.collector.range.scrollLeft),
				y: target.rowInfo.y - this.collector.range.scrollTop + this.collector.size.activityStartY,
				width: statWidth,
				height: target.rowInfo.height
			};
			this.action.showToolTip(statResult.label + statResult.value, rect, { props: { placement: "bottom" } });
			this.autoHideTooltipTimer = setTimeout(() => {
				this.action.hideToolTip();
			}, this.autoHideTooltipDuration);
		};
		_proto.clearAll = function clearAll() {
			this.group.clear();
			clearTimeout(this.autoHideTooltipTimer);
			this.action.hideToolTip();
		};
		return GridMobileTapInteractive;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/mobile/tap-interactive/index.js
var init_tap_interactive = __esmMin((() => {
	init_interface$9();
	init_main$9();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/mobile/entries.js
function getMobileFeatures() {
	return [
		{
			ctor: GridStorageSync,
			id: IGridStorageSync,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridFrozenLine,
			id: IGridFrozenLine,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridMobileTapInteractive,
			id: IGridMobileTapInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridSelection,
			id: IGridSelection,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridScroller,
			id: IGridScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridCollaborator,
			id: IGridCollaborator,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridSearchCursor,
			id: IGridSearchCursor,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries$1 = __esmMin((() => {
	init_collaborator();
	init_frozen_line();
	init_scroller();
	init_search_cursor();
	init_selection();
	init_storage_sync();
	init_tap_interactive();
	init_feature_single();
})), FIXED_WIDTH_FIELDS, SINGLE_LINE_FIELDs, COMPLEX_FIELDS, FieldShardNum, AdjustType, MIN_COLUMN_WIDTH, MAX_COLUMN_WIDTH, IAdaptiveColumnWidth;
var init_index_interface = __esmMin((() => {
	init_module();
	init_es$1();
	FIXED_WIDTH_FIELDS = [
		FieldType.CHECKBOX,
		FieldType.PROGRESS,
		FieldType.DATE_TIME,
		FieldType.CREATED_TIME,
		FieldType.MODIFIED_TIME
	];
	SINGLE_LINE_FIELDs = [
		FieldType.URL,
		FieldType.EMAIL,
		FieldType.PHONE,
		FieldType.NUMBER,
		FieldType.AUTO_NUMBER,
		FieldType.CURRENCY,
		FieldType.LOCATION
	];
	COMPLEX_FIELDS = [
		FieldType.TEXT,
		FieldType.MULTIPLE_SELECT,
		FieldType.GROUP_B,
		FieldType.USER,
		FieldType.USER_C,
		FieldType.ATTACHMENT,
		FieldType.LINK_RECORDS,
		FieldType.LOOKUP,
		FieldType.FORMULA
	];
	(function(FieldShardNum) {
		FieldShardNum[FieldShardNum["COMPLEX_FIELD"] = 5] = "COMPLEX_FIELD";
		FieldShardNum[FieldShardNum["COMMON_FIELD"] = 100] = "COMMON_FIELD";
	})(FieldShardNum || (FieldShardNum = {}));
	FieldType.ATTACHMENT, FieldType.USER, FieldType.USER_C, FieldType.CREATED_USER, FieldType.MODIFIED_USER, FieldType.GROUP_B;
	(function(AdjustType) {
		AdjustType["MANUAL"] = "manual";
		AdjustType["MENU"] = "menu";
		AdjustType["DBCLICK"] = "dbclick";
	})(AdjustType || (AdjustType = {}));
	MIN_COLUMN_WIDTH = DefaultConfig.COLUMN_MIN_WIDTH;
	MAX_COLUMN_WIDTH = DefaultConfig.COLUMN_MAX_WIDTH;
	IAdaptiveColumnWidth = createDecorator("IAdaptiveColumnWidth");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/adaptive-col-width/index.js
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
var import_dist, import_Snackbar, LOGGER_TAG, adaptiveLogger, HIT_DISTANCE, AdaptiveColumnWidth, paddingWidth;
var init_adaptive_col_width = __esmMin((() => {
	init_tslib_es6();
	import_dist = require_dist();
	import_Snackbar = /* @__PURE__ */ __toESM(require_Snackbar());
	init_es();
	init_es$1();
	init_field_collector();
	init_pen();
	init_style();
	init_constants();
	init_config$2();
	init_grid_feature();
	init_index_interface();
	init_field_title();
	init_wb_cell();
	LOGGER_TAG = "[xtable-view|views]";
	adaptiveLogger = "adaptive col width";
	HIT_DISTANCE = 5;
	AdaptiveColumnWidth = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$25(AdaptiveColumnWidth, GridFeatureBase);
		function AdaptiveColumnWidth() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.hitFieldId = null;
			_this.completeMode = false;
			_this.asyncTask = null;
			_this.asyncTaskMap = /* @__PURE__ */ new Map();
			_this.handleDoubleClick = (event) => {
				if (!_this.parentApi.getStatus().getPermissionStatus("canEditViewConfig", {})) return;
				var recordNum = _this.collector.dataUtil.getDisplayedRecordIds().length;
				if (_this.checkHit(event)) {
					_this.emitter.service.showfieldEditPanel.fire(false);
					if (recordNum > 1e4) {
						import_Snackbar.default.show({
							message: i18n.t("超过1万行上限，可拖动列宽调整"),
							type: "info",
							autoClose: true,
							duration: 1500
						});
						return;
					}
					if (_this.hitFieldId) {
						var currentSelection = _this.parentApi.getRangeModel().getCurrentSelection();
						var fieldIdArray = currentSelection.isColumnSelection() ? Array.from(currentSelection.getFieldIds()) : void 0;
						var fieldIds = (fieldIdArray === null || fieldIdArray === void 0 ? void 0 : fieldIdArray.includes(_this.hitFieldId)) ? fieldIdArray : [_this.hitFieldId];
						_this.adjustType = AdjustType.DBCLICK;
						_this.done(fieldIds);
					}
				}
			};
			/**
			* 执行列宽处理
			*/ _this.done = (fieldIds) => __awaiter(_this, void 0, void 0, function* () {
				var _a, _b;
				var result = void 0;
				var showSnackbarInstance = null;
				logger.info(LOGGER_TAG, `${adaptiveLogger} start`);
				setTimeout(() => {
					if (result === void 0) showSnackbarInstance = import_Snackbar.default.show({
						message: i18n.t("调整中"),
						type: "loading",
						autoClose: false
					});
				}, 1e3);
				try {
					result = yield Promise.all(fieldIds.map((fieldId) => __awaiter(this, void 0, void 0, function* () {
						var field = this.collector.getField(fieldId);
						if (!field) return 0;
						return yield this.getColWidth(field, fieldId);
					})));
					this.setColWidthAndLog(fieldIds, result);
					reporter.metricsWDocs({
						module: "adaptive-col-width",
						action: "success"
					});
				} catch (error) {
					logger.error("列宽调整失败", error);
					reporter.metricsWDocs({
						module: "adaptive-col-width",
						action: "failed",
						str1: error === null || error === void 0 ? void 0 : error.message
					});
				}
				if (showSnackbarInstance && result !== void 0) (_b = (_a = showSnackbarInstance).close) === null || _b === void 0 || _b.call(_a);
				logger.info(LOGGER_TAG, `${adaptiveLogger} end`);
			});
			/**
			* 检查是否命中
			*/ _this.checkHit = (event) => {
				var { x, target } = event;
				var { size } = _this.collector;
				if (!target.columnInfo || target.rowInfo || target.isBlank) return false;
				_this.hitFieldId = _this.getHitFieldId(x, target.columnInfo.id);
				if (!_this.hitFieldId) return false;
				if (_this.getFieldEndX(_this.hitFieldId) > size.activityStartX + size.activityViewWidth) return false;
				return true;
			};
			/**
			* 获取事件命中的 fieldId
			*/ _this.getHitFieldId = (evtOffsetX, fieldId) => {
				if (_this.collector.dataUtil.getVisibleFieldIds()[0] === fieldId) {
					if (evtOffsetX < _this.collector.getFieldX(fieldId) + _this.collector.getFieldWidth(fieldId) - HIT_DISTANCE) return null;
				}
				var endX = _this.getFieldEndX(fieldId);
				var width = _this.collector.getFieldWidth(fieldId);
				var offset = endX - evtOffsetX;
				var hitCurrent = offset <= HIT_DISTANCE;
				var hitRight = Math.abs(width - offset) <= HIT_DISTANCE;
				var hitFieldId;
				if (hitRight) {
					var allFields = _this.collector.getRenderFieldIds();
					hitFieldId = allFields[allFields.indexOf(fieldId) - 1];
				} else if (hitCurrent) hitFieldId = fieldId;
				else return null;
				if (!hitFieldId || hitFieldId === "Addition") return null;
				return hitFieldId;
			};
			/**
			* 获取 field 最右侧的坐标
			*/ _this.getFieldEndX = (fieldId) => _this.collector.getFieldX(fieldId) + _this.collector.getFieldWidth(fieldId);
			return _this;
		}
		var _proto = AdaptiveColumnWidth.prototype;
		/**
		* 执行初始化
		*/ _proto.bootstrap = function bootstrap() {
			this._register(this.UIEvent.stage.onDoubleClick(this.handleDoubleClick));
		};
		_proto.dispose = function dispose() {
			var _a;
			(_a = this.asyncTask) === null || _a === void 0 || _a.abort();
			GridFeatureBase.prototype.dispose.call(this);
		};
		_proto.render = function render() {};
		_proto.autoAdaptColWidth = function autoAdaptColWidth(fieldIds) {
			this.adjustType = AdjustType.MENU;
			this.done(fieldIds);
		};
		/**
		* 设置列宽并且上报
		*/ _proto.setColWidthAndLog = function setColWidthAndLog(fieldIds, fieldColWidthArr) {
			var _a, _b;
			var tableId = (_a = this.context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			var viewId = (_b = this.context.getCurrentView()) === null || _b === void 0 ? void 0 : _b.id;
			var colLen = fieldIds.length;
			if (!tableId || !viewId) return;
			this.context.getCore().behaviorApi.setColWidth({
				tableId,
				viewId,
				fieldIds,
				delta: { widthArray: fieldColWidthArr.map((colWidth) => Math.ceil(colWidth)) }
			});
			fieldIds.forEach((fieldId, index) => {
				var _a;
				var fieldType = (_a = this.collector.getField(fieldId)) === null || _a === void 0 ? void 0 : _a.getType();
				fieldType && reporter.metricsKVR({
					biz: "wecomDocs",
					itemname: "smartsheet_field_drag_column",
					Channel1: FieldType[fieldType],
					Channel2: this.adjustType,
					value: fieldColWidthArr[index],
					Extra1: colLen.toString()
				});
			});
		};
		/**
		* 获取自适应列宽
		*/ _proto.getColWidth = function getColWidth(field, fieldId) {
			return __awaiter(this, void 0, void 0, function* () {
				var maxWidth = MAX_COLUMN_WIDTH;
				var fieldTitle = mapWbFieldTitle(field.getTitle());
				var titleIconTakeWidth = domainConfig.getIsWb() ? 0 : 4 * style.size.iconPadding + style.size.iconNormal + style.size.iconSmall;
				var titleWidth = this.measureTextWidth(fieldTitle) + titleIconTakeWidth;
				if (titleWidth >= maxWidth) return maxWidth;
				var fieldType = field.getType();
				var isFixedContentField = FIXED_WIDTH_FIELDS.includes(fieldType);
				var fieldProperty = field.getProperty();
				var defaultColumnWidth = fieldHelper.get(fieldType).getDefaultWidth(fieldProperty);
				if (isFixedContentField) return Math.max(titleWidth, defaultColumnWidth);
				var maxCellWidth = yield this.calcAdaptiveColumnWidth(fieldType, fieldId);
				return Math.min(maxWidth, Math.max(titleWidth, maxCellWidth, MIN_COLUMN_WIDTH));
			});
		};
		/**
		* 根据单元格内容获取最大宽度
		*/ _proto.calcAdaptiveColumnWidth = function calcAdaptiveColumnWidth(fieldType, fieldId) {
			return __awaiter(this, void 0, void 0, function* () {
				var recordIds = this.collector.dataUtil.getAllRecordIds();
				var recordNum = recordIds.length;
				if (!recordNum) return 0;
				var field = this.collector.dataUtil.getFieldByFieldId(fieldId);
				if (!field) return 0;
				var rowHeight = this.collector.getRecordHeight();
				var isSingleLineField = SINGLE_LINE_FIELDs.includes(fieldType);
				var rowInfo = {
					rowHeight,
					currentColumnWidth: this.collector.getFieldWidth(fieldId),
					isSingleLineField,
					isDefaultHeight: MaxBreakLines.get(this.collector.dataUtil.getRowHeightLevel()) === 1
				};
				this.completeMode = recordNum <= 1e3;
				if (this.completeMode) return recordIds.reduce((maxValue, currentRecordId) => {
					var cellWidth = this.getCellWidth(field, currentRecordId, fieldId, rowInfo);
					return Math.max(maxValue, cellWidth);
				}, 0);
				var asyncRecordIds = [...recordIds];
				return yield this.calcAsyncBatchCloumnWidth(field, fieldId, asyncRecordIds, rowInfo);
			});
		};
		/**
		* 异步收集计算列宽
		*/ _proto.calcAsyncBatchCloumnWidth = function calcAsyncBatchCloumnWidth(field, fieldId, recordIds, rowInfo) {
			var asyncTask = this.asyncTaskMap.get(fieldId);
			if (asyncTask) asyncTask.abort();
			var fieldType = field.type;
			var shardNum = this.getShardingNum(fieldType);
			this.asyncTask = (0, import_dist.executeAsync)({
				length: recordIds.length / shardNum,
				initialValue: [],
				unitCallback: (index, accumulator) => {
					for (var shardRecordId of recordIds.slice(shardNum * index, shardNum * index + shardNum)) accumulator.push(this.getCellWidth(field, shardRecordId, fieldId, rowInfo));
					return accumulator;
				},
				finishCallback: (result) => {
					if (!result || result.length !== recordIds.length) return 0;
					return result.reduce((maxValue, currentCellWidth) => Math.max(maxValue, currentCellWidth), 0);
				}
			});
			this.asyncTaskMap.set(fieldId, this.asyncTask);
			this.asyncTask.promise.catch((error) => {
				logger.warn(LOGGER_TAG, error);
			});
			return this.asyncTask.promise;
		};
		/**
		* 根据列类型获取分片粒度
		*/ _proto.getShardingNum = function getShardingNum(fieldType) {
			return COMPLEX_FIELDS.includes(fieldType) ? FieldShardNum.COMPLEX_FIELD : FieldShardNum.COMMON_FIELD;
		};
		/**
		* 获取单元格内容宽度
		*/ _proto.getCellWidth = function getCellWidth(field, recordId, fieldId, rowInfo) {
			var { rowHeight, currentColumnWidth, isSingleLineField, isDefaultHeight } = rowInfo;
			var fieldType = field.type;
			var contentRect = {
				x: 0,
				y: 0,
				width: Infinity,
				height: fieldType === FieldType.IMAGE ? rowHeight - paddingWidth : Infinity
			};
			var contentConfig = this.getCollectConfig(isDefaultHeight);
			var standardCell = this.collector.dataUtil.getStandardCell(fieldId, recordId);
			if (!standardCell) return 0;
			var drawConfigs;
			if (domainConfig.getIsWb()) {
				var fieldTitle = field.getTitle();
				if (isWbSpecialField(fieldTitle, ViewType.GRID)) drawConfigs = collectWbSpecialCell({
					fieldTitle,
					viewScope: ViewType.GRID,
					rect: contentRect,
					collectConfig: contentConfig,
					standardCell,
					field
				});
			}
			if (!drawConfigs) drawConfigs = fieldCollector.collect(contentRect, contentConfig, standardCell, field);
			try {
				return fieldCollector.measureWidth(fieldType, drawConfigs, {
					rowHeight,
					currentColumnWidth,
					isSingleLineField,
					isDefaultHeight,
					contentConfig,
					standardCell
				});
			} catch (error) {
				logger.info(`${adaptiveLogger} getCellWidth error`, error);
				reporter.metricsWDocs({
					module: "adaptive-col-width",
					action: "cell-width-failed",
					str1: error === null || error === void 0 ? void 0 : error.message
				});
				return 0;
			}
		};
		_proto.getCollectConfig = function getCollectConfig(isDefaultHeight) {
			var collectConfig = getDefaultContentCollectConfig();
			return Object.assign(Object.assign({}, collectConfig), { maxLines: isDefaultHeight ? 1 : Infinity });
		};
		/**
		* 计算文本长度
		*/ _proto.measureTextWidth = function measureTextWidth(text, fontSize = style.size.fontSizeNormal, fontStyle = "normal") {
			return pen.util.measureTextWidth(text, fontSize, fontStyle);
		};
		return AdaptiveColumnWidth;
	}(GridFeatureBase);
	paddingWidth = 2 * style.size.cellPadding;
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/field-move/interface.js
var IGridFieldMove;
var init_interface$8 = __esmMin((() => {
	init_module();
	IGridFieldMove = createDecorator("IGridFieldMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/field-move/main.js
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
var GridFieldMove;
var init_main$8 = __esmMin((() => {
	init_es();
	init_es$1();
	init_pen();
	init_production();
	init_style();
	init_constants();
	init_auto_scroll();
	init_grid_feature();
	init_interface$8();
	init_get_frozen_end_y();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	GridFieldMove = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$24(GridFieldMove, GridFeatureBase);
		function GridFieldMove() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.isSelecting = false;
			_this.selectReady = false;
			_this.startFieldId = "";
			_this.selects = [];
			_this.dragDownX = 0;
			_this.moveRect = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			_this.mouseX = 0;
			_this.mouseY = 0;
			_this.targetFieldIndex = -1;
			_this.onSelectionChanged = ({ selection }) => {
				var ranges = selection.getRanges();
				var noSelectionRange = Array.isArray(ranges) && !ranges.length || !selection.isColumnSelection();
				if (_this.selects.length && noSelectionRange) {
					_this.reset();
					_this.selects.length = 0;
					_this.cancelDragReady();
					_this.collector.columns.patch();
					_this.parentApi.renderMain();
				}
				if (!_this.isSelecting && selection.isColumnSelection()) {
					_this.selects = [];
					selection.getFieldIds().forEach((fieldId) => {
						_this.selects.push(fieldId);
					});
					_this.doSelectUp();
					_this.collector.columns.patch();
					_this.parentApi.renderMain();
				}
			};
			_this.onStageMouseDown = (evt) => {
				var _a;
				var { event, target, x: offsetX, y: offsetY } = evt;
				if (target.isBlank || !(target === null || target === void 0 ? void 0 : target.columnInfo) || !target.columnInfo.isField || target.rowInfo || _this.isPreventFromOtherFeature()) return;
				if (event.shiftKey && _this.selects.length) {
					_this.quickSelect(target.columnInfo);
					return;
				}
				_this.handleMouseDown(offsetX, offsetY, target.columnInfo);
				_this.listenDragReady();
				(_a = _this.renderer.getFeature(IGridAutoScroll)) === null || _a === void 0 || _a.readyX();
			};
			_this.onWindowMouseMove = (evt) => {
				var { target, x: offsetX, y: offsetY } = evt;
				_this.mouseX = offsetX;
				_this.mouseY = offsetY;
				var isInField = target.columnInfo && !target.rowInfo && !target.isBlank;
				if (!_this.isSelecting && _this.dragDownX === 0 && !isInField) return;
				if (!_this.selects.length || !target.columnInfo || _this.isPreventFromOtherFeature(target.columnInfo)) return;
				_this.handleMouseMove(offsetX, target.columnInfo);
			};
			_this.onDocumentMouseUp = (evt) => {
				var _a, _b;
				var { event, target } = evt;
				if (target.isBlank || ((_a = target.columnInfo) === null || _a === void 0 ? void 0 : _a.id) === "Addition") {
					_this.reset();
					_this.doSelectUp();
					return;
				}
				if (event.shiftKey) return;
				if (!((_b = target === null || target === void 0 ? void 0 : target.columnInfo) === null || _b === void 0 ? void 0 : _b.isField)) return;
				_this.handleMouseUp();
			};
			/**
			* 响应列编组右键事件：把编组内所有字段设置为当前列选区。
			* 仅在 payload 携带 fieldGroupId 时处理（区分普通字段右键菜单）。
			*/ _this.onFieldTitleContextMenu = ({ columnInfo }) => {
				if (!columnInfo.fieldGroupId) return;
				_this.selectFieldGroup(columnInfo.fieldGroupId);
			};
			return _this;
		}
		var _proto = GridFieldMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMouseDown));
			this._register(this.rangeModel.onSelectionChanged(this.onSelectionChanged));
			this._register(this.UIEvent.stage.onResize(() => this.group.setAttrs(this.collector.size.globalRect)));
			this._register(this.emitter.service.fieldTitleContextMenuEmitter.event(this.onFieldTitleContextMenu));
		};
		_proto.render = function render() {};
		_proto.isMoving = function isMoving() {
			return !!(this.selects.length && this.dragDownX) || this.isSelecting;
		};
		_proto.getSelects = function getSelects() {
			return [...this.selects];
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGridFieldMove,
				isLock: () => this.isMoving()
			} };
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature(columnInfo) {
			var _a, _b;
			if (this.featureLock.isPreventFromOtherFeature(IGridFieldMove)) return true;
			if ((_a = columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.rightIconRect) {
				var { range } = this.collector;
				var { x, y, width, height } = columnInfo.activeDrawConfig.rightIconRect;
				var dropdownRect = {
					x: x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
					y,
					width,
					height
				};
				if (isHitRect(this.mouseX, this.mouseY, dropdownRect)) return true;
			}
			if ((_b = columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.activeDrawConfig) === null || _b === void 0 ? void 0 : _b.filterIcon) {
				var { range: range1 } = this.collector;
				var { x: x1, y: y1, width: width1, height: height1 } = columnInfo.activeDrawConfig.filterIcon;
				var filterRect = {
					x: x1 - (columnInfo.isFrozen ? 0 : range1.scrollLeft),
					y: y1,
					width: width1,
					height: height1
				};
				if (isHitRect(this.mouseX, this.mouseY, filterRect)) return true;
			}
			return false;
		};
		/**
		* 鼠标按下位置是否落在列编组头行上（上半行）。仅当存在可见编组时才有意义。
		*/ _proto.isMouseDownOnFieldGroupHeader = function isMouseDownOnFieldGroupHeader(offsetY) {
			var { dataUtil, size } = this.collector;
			if (!dataUtil.hasVisibleFieldGroup()) return false;
			return offsetY < size.globalPaddingTop + size.fieldGroupHeaderHeight;
		};
		/**
		* 把编组内所有字段设置为列选区（供鼠标点击编组头、监听编组右键事件共用）
		*/ _proto.selectFieldGroup = function selectFieldGroup(fieldGroupId) {
			var indexes = this.collector.dataUtil.getFieldIndexesInFieldGroup(fieldGroupId);
			if (indexes.length === 0) return;
			var startIndex = Math.min(...indexes);
			var endIndex = Math.max(...indexes);
			this.selects = this.collector.dataUtil.getVisibleFieldIds().slice(startIndex, endIndex + 1);
			this.setSelection(startIndex, endIndex);
		};
		_proto.listenDragReady = function listenDragReady() {
			this.cancelDragReady();
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseUp);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => {
				if (this.dragDownX) this.reset();
			});
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
		};
		_proto.handleMouseDown = function handleMouseDown(offsetX, offsetY, columnInfo) {
			var { fieldGroupId } = columnInfo;
			if (fieldGroupId && this.isMouseDownOnFieldGroupHeader(offsetY)) {
				if (this.selectReady && this.canMoveField && this.isFieldGroupFullySelected(fieldGroupId)) this.doDragDown(offsetX, columnInfo);
				else this.selectFieldGroup(fieldGroupId);
				return;
			}
			if (this.selectReady && this.canMoveField) this.doDragDown(offsetX, columnInfo);
			else this.doSelectDown(columnInfo);
		};
		/**
		* 当前列选区是否恰好是"整个编组"（用于判断点击编组头时是否进入拖拽准备）
		*/ _proto.isFieldGroupFullySelected = function isFieldGroupFullySelected(fieldGroupId) {
			var indexes = this.collector.dataUtil.getFieldIndexesInFieldGroup(fieldGroupId);
			if (indexes.length === 0 || indexes.length !== this.selects.length) return false;
			var visibleFieldIds = this.collector.dataUtil.getVisibleFieldIds();
			return indexes.every((idx) => this.selects.includes(visibleFieldIds[idx]));
		};
		/**
		* 是否为"整组拖拽"：整个编组被选中 **且** 组内列数 > 1。
		*
		* 为什么排除单列编组？
		* - 单列编组在结构上"整组=唯一一列"，把它当作整组拖拽会让用户无法将这列拖出编组：
		*   既不会显示移出基准线（computeDragTargetState 会判定编组未变化而直接返回），
		*   也不会触发 REMOVE_FROM_GROUP（done 会强制 extraFieldGroupOperation=undefined）。
		* - 因此单列编组拖拽按普通单列处理，允许移出/移入，拖走后编组自然消失。
		*/ _proto.isDraggingWholeFieldGroup = function isDraggingWholeFieldGroup(sourceFieldGroupId) {
			if (!sourceFieldGroupId) return false;
			if (!this.isFieldGroupFullySelected(sourceFieldGroupId)) return false;
			return this.collector.dataUtil.getFieldIndexesInFieldGroup(sourceFieldGroupId).length > 1;
		};
		/**
		* 获取拖拽阴影/基准线的起始 y 坐标和高度
		*
		* 规则：
		* - 拖拽整个编组（选中的正好是一整个编组） → 覆盖表头顶部起（两行：编组头 + 字段头）
		* - 其他情况（单列 / 编组部分列）：
		*   - 未开始拖动（无 targetIndex） → 以"源"的 y 为准，避免阴影穿透到编组头
		*   - 拖动中（有 targetIndex）   → 以"目标位置"所属编组决定：
		*       * 目标在编组内 → 只覆盖字段头行及数据区（y 下移 fieldGroupHeaderHeight）
		*       * 目标在编组外 → 覆盖两行（从 globalPaddingTop 开始）
		*     从而让用户直观看到"将要落入编组内/外"
		*/ _proto.getDragRectYAndHeight = function getDragRectYAndHeight() {
			var { size, columns, dataUtil } = this.collector;
			var topY = size.globalPaddingTop;
			var frozenEndY = getFrozenEndY(this.collector);
			var fullHeight = frozenEndY - topY;
			var afterGroupHeaderY = topY + size.fieldGroupHeaderHeight;
			var afterGroupHeaderHeight = frozenEndY - afterGroupHeaderY;
			if (this.selects.length === 0) return {
				y: topY,
				height: fullHeight
			};
			var firstFieldId = this.selects[0];
			var firstFieldInfo = columns.getInfoByFieldId(firstFieldId);
			if (!firstFieldInfo) return {
				y: topY,
				height: fullHeight
			};
			var sourceFieldGroupId = firstFieldInfo.fieldGroupId;
			if (this.isDraggingWholeFieldGroup(sourceFieldGroupId)) return {
				y: topY,
				height: fullHeight
			};
			if (this.targetFieldIndex < 0) return {
				y: firstFieldInfo.y,
				height: frozenEndY - firstFieldInfo.y
			};
			if (!dataUtil.hasVisibleFieldGroup()) return {
				y: topY,
				height: fullHeight
			};
			if (this.targetFieldGroupId) return {
				y: afterGroupHeaderY,
				height: afterGroupHeaderHeight
			};
			return {
				y: topY,
				height: fullHeight
			};
		};
		/**
		* 判断"插入到 baseLineIndex 位置后"会属于哪个编组：
		* - baseLineIndex 左右两侧的列同属某编组 G → 目标编组 = G
		* - 否则 → undefined（在编组外/编组之间的空隙）
		*
		* 注意：baseLineIndex 的取值与 showLine 中一致，代表"新插入位置的下标"
		* （插入在 visibleFieldIds[baseLineIndex] 这列的前面）。
		*/ _proto.resolveTargetFieldGroupId = function resolveTargetFieldGroupId(baseLineIndex) {
			var _a, _b;
			var { dataUtil, columns } = this.collector;
			if (!dataUtil.hasVisibleFieldGroup()) return void 0;
			var visibleFieldIds = dataUtil.getVisibleFieldIds();
			var leftId = visibleFieldIds[baseLineIndex - 1];
			var rightId = visibleFieldIds[baseLineIndex];
			var leftGroupId = leftId ? (_a = columns.getInfoByFieldId(leftId)) === null || _a === void 0 ? void 0 : _a.fieldGroupId : void 0;
			var rightGroupId = rightId ? (_b = columns.getInfoByFieldId(rightId)) === null || _b === void 0 ? void 0 : _b.fieldGroupId : void 0;
			if (leftGroupId && leftGroupId === rightGroupId) return leftGroupId;
		};
		_proto.doDragDown = function doDragDown(offsetX, columnInfo) {
			if (!this.selects.includes(columnInfo.id)) {
				this.doSelectDown(columnInfo);
				return;
			}
			this.dragDownX = offsetX;
			var { dataUtil, columns, range } = this.collector;
			var width = this.selects.map((fieldId) => dataUtil.getColumnWidth(fieldId)).reduce((accumulator, currentValue) => accumulator + currentValue);
			var firstFieldId = this.selects[0];
			var firstFieldInfo = columns.getInfoByFieldId(firstFieldId);
			if (!firstFieldInfo) return;
			var firstFieldX = firstFieldInfo.x;
			var { y: rectY, height } = this.getDragRectYAndHeight();
			this.moveRect = {
				x: firstFieldX - range.scrollLeft,
				y: rectY,
				width,
				height
			};
			if (this.canMoveField) this.setCursor(Cursor.GRABBING);
		};
		_proto.doSelectDown = function doSelectDown(columnInfo) {
			this.selectReady = false;
			this.isSelecting = true;
			this.selects.length = 0;
			this.selects.push(columnInfo.id);
			this.startFieldId = columnInfo.id;
			this.doSelection();
		};
		_proto.handleMouseMove = function handleMouseMove(offsetX, columnInfo) {
			if (this.selectReady) this.doDragMove(offsetX, columnInfo);
			else this.doSelectMove(columnInfo);
		};
		_proto.doDragMove = function doDragMove(offsetX, columnInfo) {
			if (!this.canMoveField) return;
			if (this.dragDownX) {
				this.checkFrozenFieldGrab(columnInfo);
				this.showMoveRect(offsetX, columnInfo);
				this.setCursor(Cursor.GRABBING);
			} else {
				var { globalPaddingTop, activityStartY } = this.collector.size;
				if (this.selects.includes(columnInfo.id) && this.mouseY < activityStartY && this.mouseY > globalPaddingTop) this.setCursor(Cursor.GRAB);
			}
		};
		_proto.doSelectMove = function doSelectMove(columnInfo) {
			var visibleFieldIds = this.collector.dataUtil.getVisibleFieldIds();
			var startIndex = visibleFieldIds.indexOf(this.startFieldId);
			var endIndex = visibleFieldIds.indexOf(columnInfo.id);
			if (endIndex < 0) return;
			endIndex = Math.max(endIndex, 0);
			if (startIndex > endIndex) [startIndex, endIndex] = [endIndex, startIndex];
			this.selects = visibleFieldIds.slice(startIndex, endIndex + 1);
			this.doSelection();
			this.setCursor(Cursor.DEFAULT);
		};
		_proto.checkFrozenFieldGrab = function checkFrozenFieldGrab(columnInfo) {
			if (columnInfo.isFrozen) this.parentApi.scrollToX(0);
		};
		_proto.handleMouseUp = function handleMouseUp() {
			if (!this.selects.length) return;
			if (this.selectReady) this.doDragUp();
			else this.doSelectUp();
		};
		_proto.doDragUp = function doDragUp() {
			this.done();
			this.setCursor(Cursor.GRAB);
		};
		_proto.quickSelect = function quickSelect(columnInfo) {
			var fieldIds = this.collector.dataUtil.getVisibleFieldIds();
			var firstIndex = fieldIds.indexOf(this.selects[0]);
			var lastIndex = fieldIds.indexOf(this.selects[this.selects.length - 1]);
			var toIndex = fieldIds.indexOf(columnInfo.id);
			var isFrontFirst = false;
			var from = 0;
			var to = 0;
			if (firstIndex < toIndex) {
				from = lastIndex + 1;
				to = toIndex;
			} else {
				from = toIndex;
				to = firstIndex - 1;
				isFrontFirst = true;
			}
			var newSelects = [];
			for (var i = from; i <= to; i++) {
				var newSelectId = fieldIds[i];
				if (newSelectId) newSelects.push(newSelectId);
			}
			if (isFrontFirst) this.selects = newSelects.concat(this.selects);
			else this.selects = this.selects.concat(newSelects);
			this.doSelectUp();
			this.doSelection();
		};
		_proto.showMoveRect = function showMoveRect(offsetX, columnInfo) {
			this.group.clear();
			if (!this.moveRect) return;
			var lineDrawInfo = this.computeDragTargetState(offsetX, columnInfo);
			var { y: rectY, height } = this.getDragRectYAndHeight();
			var deltaX = offsetX - this.dragDownX;
			var rectX = this.moveRect.x + deltaX;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, this.moveRect), {
				x: rectX,
				y: rectY,
				height,
				background: style.color.dragShadowBackground,
				opacity: .5
			})));
			if (lineDrawInfo) this.drawBaseLine(lineDrawInfo.startX, rectY, height);
		};
		/**
		* 根据鼠标位置计算拖拽目标状态：
		* - 更新 this.targetFieldIndex / this.targetFieldGroupId
		* - 返回基准线绘制所需的 startX；若无有效目标则返回 undefined
		*
		* 列编组场景下的判定规则：
		* 1) 鼠标 Y 在"编组头行"（上半行）且鼠标 X 落在某编组的 X 范围内：
		*    → 视为"落在编组外侧"。以整组中点为界，决定基准线 / 插入下标：
		*      - X 在整组左半 → 插在整组前
		*      - X 在整组右半 → 插在整组后
		*    → targetFieldGroupId = undefined
		* 2) 其它情况（下半行，或上半行但不在任何编组上）：
		*    → 按经过列的左右半判定（与传统单列表格一致）
		*    → 若悬停列本身属于某编组 G，则目标编组 = G（覆盖两侧列的推断）
		*      这样能保证：
		*      - 编组最左列（如 c）的左半、最右列（如 e）的右半都视为"组内"
		*      - 鼠标在编组列的下半行任何位置都视为"组内"
		*/ _proto.computeDragTargetState = function computeDragTargetState(offsetX, columnInfo) {
			var _a;
			var { dataUtil, columns } = this.collector;
			var visibleFieldIds = dataUtil.getVisibleFieldIds();
			if (!columnInfo.isField) {
				this.targetFieldIndex = -1;
				this.targetFieldGroupId = void 0;
				return;
			}
			var [baseField] = this.selects;
			var baseFieldIndex = visibleFieldIds.indexOf(baseField);
			var selectEndIndex = visibleFieldIds.indexOf(this.selects[this.selects.length - 1]);
			var sourceFieldGroupId = (_a = columns.getInfoByFieldId(baseField)) === null || _a === void 0 ? void 0 : _a.fieldGroupId;
			var { baseLineIndex, targetFieldGroupId } = this.resolveBaseLineAndFieldGroup(offsetX, columnInfo);
			if (baseLineIndex < 0) {
				this.targetFieldIndex = -1;
				this.targetFieldGroupId = void 0;
				return;
			}
			var isDraggingWholeFieldGroup = this.isDraggingWholeFieldGroup(sourceFieldGroupId);
			var isPositionUnchanged = baseLineIndex >= baseFieldIndex && baseLineIndex <= selectEndIndex + 1;
			if (isPositionUnchanged && (isDraggingWholeFieldGroup || targetFieldGroupId === sourceFieldGroupId)) {
				this.targetFieldIndex = -1;
				this.targetFieldGroupId = void 0;
				return;
			}
			var targetIndex;
			if (isPositionUnchanged) targetIndex = baseFieldIndex;
			else if (baseLineIndex <= baseFieldIndex) targetIndex = baseLineIndex;
			else targetIndex = baseLineIndex - 1;
			this.targetFieldIndex = targetIndex;
			this.targetFieldGroupId = targetFieldGroupId;
			return this.calcBaseLineStartX(baseLineIndex);
		};
		/**
		* 计算 baseLineIndex 和 targetFieldGroupId：
		* - 上半行规则命中 → 外侧位置 + undefined
		* - 否则按悬停列左右半 + 悬停列所属编组推断
		*/ _proto.resolveBaseLineAndFieldGroup = function resolveBaseLineAndFieldGroup(offsetX, columnInfo) {
			var _a;
			var headerRuleResult = this.tryResolveByFieldGroupHeaderRule(columnInfo);
			if (headerRuleResult) return {
				baseLineIndex: headerRuleResult.baseLineIndex,
				targetFieldGroupId: void 0
			};
			var xIndex = this.collector.dataUtil.getVisibleFieldIds().indexOf(columnInfo.id);
			var baseLineIndex = offsetX < columnInfo.x - this.collector.range.scrollLeft + columnInfo.width / 2 ? xIndex : xIndex + 1;
			return {
				baseLineIndex,
				targetFieldGroupId: (_a = columnInfo.fieldGroupId) !== null && _a !== void 0 ? _a : this.resolveTargetFieldGroupId(baseLineIndex)
			};
		};
		/**
		* 计算基准线的 X 坐标：插在 visibleFieldIds[baseLineIndex] 前；若溢出取最后一列右边
		*/ _proto.calcBaseLineStartX = function calcBaseLineStartX(baseLineIndex) {
			var { dataUtil, columns } = this.collector;
			var visibleFieldIds = dataUtil.getVisibleFieldIds();
			var isLastField = false;
			var baseLineFieldId = visibleFieldIds[baseLineIndex];
			if (!baseLineFieldId) {
				isLastField = true;
				baseLineFieldId = visibleFieldIds[visibleFieldIds.length - 1];
			}
			var baseLineColumnInfo = columns.getInfoByFieldId(baseLineFieldId);
			if (!baseLineColumnInfo) return void 0;
			return { startX: isLastField ? baseLineColumnInfo.x + baseLineColumnInfo.width : baseLineColumnInfo.x };
		};
		/**
		* 上半行规则：鼠标 Y 在"编组头行"内，且鼠标 X 落在悬停列所属编组的 X 范围中，
		* 则以整个编组的中点为界判定插入位置，意图是"把列移到编组外侧"。
		* 返回 undefined 表示本次不适用上半行规则。
		*/ _proto.tryResolveByFieldGroupHeaderRule = function tryResolveByFieldGroupHeaderRule(columnInfo) {
			var { dataUtil, range, size } = this.collector;
			if (!dataUtil.hasVisibleFieldGroup()) return void 0;
			if (!(this.mouseY >= size.globalPaddingTop && this.mouseY < size.globalPaddingTop + size.fieldGroupHeaderHeight)) return void 0;
			var { fieldGroupId, fieldGroupRect } = columnInfo;
			if (!fieldGroupId || !fieldGroupRect) return void 0;
			var groupFieldIndexes = dataUtil.getFieldIndexesInFieldGroup(fieldGroupId);
			if (groupFieldIndexes.length === 0) return void 0;
			var groupStartIndex = Math.min(...groupFieldIndexes);
			var groupEndIndex = Math.max(...groupFieldIndexes);
			var groupMidX = fieldGroupRect.x - (columnInfo.isFrozen ? 0 : range.scrollLeft) + fieldGroupRect.width / 2;
			return { baseLineIndex: this.mouseX < groupMidX ? groupStartIndex : groupEndIndex + 1 };
		};
		_proto.drawBaseLine = function drawBaseLine(startX, y, height) {
			var { range } = this.collector;
			var lineWidth = style.size.borderWidth * 2;
			this.group.add(pen.config.line({
				x: startX - range.scrollLeft,
				y,
				points: [
					0,
					0,
					0,
					height
				],
				borderWidth: lineWidth,
				borderColor: style.color.selectionBorderColor
			}));
		};
		_proto.doSelectUp = function doSelectUp(fieldId) {
			this.isSelecting = false;
			this.selectReady = true;
			if (fieldId) this.selects.push(fieldId);
		};
		_proto.doSelection = function doSelection() {
			var fieldIds = this.collector.dataUtil.getVisibleFieldIds();
			var startIndex = fieldIds.indexOf(this.selects[0]);
			var endIndex = fieldIds.indexOf(this.selects[this.selects.length - 1]);
			this.setSelection(startIndex, endIndex);
		};
		_proto.setSelection = function setSelection(startIndex, endIndex) {
			this.rangeModel.setActiveColumnSelection({
				startColumn: startIndex,
				endColumn: endIndex
			});
			this.collector.columns.patch();
			this.parentApi.renderMain();
		};
		_proto.done = function done() {
			var _a;
			var { dataUtil, columns } = this.collector;
			var targetIndex = this.targetFieldIndex;
			var { targetFieldGroupId } = this;
			this.reset();
			if (targetIndex < 0) return;
			var targetFieldId = dataUtil.getVisibleFieldIds()[targetIndex];
			var inAllFieldIndex = dataUtil.getAllFieldIds().indexOf(targetFieldId);
			var sourceFieldGroupId = (_a = columns.getInfoByFieldId(this.selects[0])) === null || _a === void 0 ? void 0 : _a.fieldGroupId;
			var extraFieldGroupOperation = this.isDraggingWholeFieldGroup(sourceFieldGroupId) ? void 0 : this.buildExtraFieldGroupOperation(sourceFieldGroupId, targetFieldGroupId);
			logger.info(`[xview][移动列] inAllFieldIndex=${inAllFieldIndex}, targetFieldId=${targetFieldId}, sourceFieldGroupId=${sourceFieldGroupId}, targetFieldGroupId=${targetFieldGroupId}, extraFieldGroupOperation=${JSON.stringify(extraFieldGroupOperation)}`);
			var currentTable = dataUtil.getCurrentTable();
			var currentView = dataUtil.getCurrentView();
			if (!currentTable || !currentView) return;
			this.context.getBehaviorApi().moveField({
				tableId: currentTable.id,
				viewId: currentView.id,
				fieldIds: this.selects,
				delta: {
					target: inAllFieldIndex,
					extraFieldGroupOperation
				}
			});
			var startIndex = dataUtil.getVisibleFieldIds().indexOf(this.selects[0]);
			var endIndex = dataUtil.getVisibleFieldIds().indexOf(this.selects[this.selects.length - 1]);
			this.setSelection(startIndex, endIndex);
			productReport.grid.fileMoveSuccess();
		};
		/**
		* 根据源/目标编组 id 构造 moveField 的 extraFieldGroupOperation：
		* - 目标与源不同 且 目标有值 → 移入目标编组
		* - 源有值 且 目标无值             → 从源编组移出
		* - 相同（含都无）                  → 不涉及编组（undefined）
		*/ _proto.buildExtraFieldGroupOperation = function buildExtraFieldGroupOperation(sourceFieldGroupId, targetFieldGroupId) {
			if (targetFieldGroupId && targetFieldGroupId !== sourceFieldGroupId) return {
				type: FieldGroupOperationType.MOVE_TO_GROUP,
				targetFieldGroupId
			};
			if (sourceFieldGroupId && !targetFieldGroupId) return { type: FieldGroupOperationType.REMOVE_FROM_GROUP };
		};
		_proto.reset = function reset() {
			this.dragDownX = 0;
			this.targetFieldIndex = -1;
			this.targetFieldGroupId = void 0;
			this.group.clear();
			this.setCursor(Cursor.DEFAULT);
		};
		_create_class$8(GridFieldMove, [{
			key: "canMoveField",
			get: function() {
				return this.renderer.getStatus().getPermissionStatus("canEditViewConfig", {});
			}
		}]);
		return GridFieldMove;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/field-move/index.js
var init_field_move = __esmMin((() => {
	init_interface$8();
	init_main$8();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/field-width/interface.js
var IGridFieldWidth;
var init_interface$7 = __esmMin((() => {
	init_module();
	IGridFieldWidth = createDecorator("IGridFieldWidth");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/field-width/main.js
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
var defaultStyle$1, GridFieldWidth;
var init_main$7 = __esmMin((() => {
	init_es();
	init_es$1();
	init_pen();
	init_style();
	init_grid_feature();
	init_interface$8();
	init_interface$7();
	init_get_frozen_end_y();
	init_cursor();
	init_register_esc_to_cancel();
	defaultStyle$1 = {
		bodyLineWidth: style.size.borderWidth,
		headLineWidth: style.size.borderWidth * 4,
		lineColor: style.color.selectionBorderColor,
		tipPaddingV: 4,
		tipPaddingH: 6
	};
	GridFieldWidth = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$23(GridFieldWidth, GridFeatureBase);
		function GridFieldWidth() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.hoverLineX = 0;
			_this.hotAreaWidth = 5;
			_this.isDragging = false;
			_this.mouseDownX = 0;
			_this.targetId = "";
			_this.targetNewWidth = 0;
			_this.targetOriginX = 0;
			_this.targetOriginWidth = 0;
			/**
			* 本次调整是否为"编组宽度调整"
			* - true  → 基准线覆盖整个表头 + 数据区；提示文案用 field_group_with_px；
			*          应用时按"比例"同步缩放编组内每一列
			* - false → 单列调整（沿用原有逻辑）
			*/ _this.isResizingFieldGroup = false;
			_this.targetFieldGroupFieldIds = [];
			_this.targetFieldGroupOriginWidths = [];
			_this.onStageMouseMove = (evt) => {
				_this.group.clear();
				if (!(evt.target.columnInfo && !evt.target.rowInfo && !evt.target.isBlank) || _this.isDragging || _this.isPreventFromOtherFeature()) {
					if (!_this.isDragging && _this.hoverLineX) {
						_this.reset();
						_this.cancelDragReady();
					}
					_this.clearHoverDebounce();
					return;
				}
				if (_this.hoverLineX) _this.handleHovering(evt);
				else _this.scheduleHovering(evt);
			};
			_this.onStageMouseDown = (evt) => {
				var offsetX = evt.x;
				_this.isDragging = true;
				_this.mouseDownX = offsetX;
				_this.handleDragging(offsetX);
				_this.registerDragging();
			};
			_this.onWindowMouseMove = (evt) => {
				if (_this.isDragging) _this.handleDragging(evt.x);
			};
			_this.onDocumentMouseUp = () => {
				_this.cancelDragReady();
				_this.cancelDraggingEvent();
				_this.applyBehavior();
				if (_this.hasChangeData) _this.reset();
				else setTimeout(() => _this.reset(), 500);
			};
			_this.reset = () => {
				_this.isDragging = false;
				_this.hoverLineX = 0;
				_this.mouseDownX = 0;
				_this.targetId = "";
				_this.targetNewWidth = 0;
				_this.targetOriginWidth = 0;
				_this.isResizingFieldGroup = false;
				_this.targetFieldGroupId = void 0;
				_this.targetFieldGroupFieldIds = [];
				_this.targetFieldGroupOriginWidths = [];
				_this.group.clear();
				_this.setCursor(Cursor.DEFAULT);
			};
			return _this;
		}
		var _proto = GridFieldWidth.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalViewRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.stage.onResize(() => this.group.setAttrs(this.collector.size.globalViewRect)));
		};
		_proto.dispose = function dispose(trace) {
			GridFeatureBase.prototype.dispose.call(this, trace);
			this.cancelDragReady();
			this.cancelDraggingEvent();
			this.clearHoverDebounce();
		};
		_proto.render = function render() {
			this.group.clear();
		};
		_proto.isHovering = function isHovering() {
			return !!this.targetId && this.hoverLineX !== 0;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return {
				default: {
					id: IGridFieldWidth,
					isLock: () => this.isDragging
				},
				high: {
					id: IGridFieldWidth,
					isLock: () => this.isHovering()
				}
			};
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGridFieldWidth);
		};
		/**
		* 防抖入口：鼠标在热区附近停留 500ms 后才真正激活 hover 基准线。
		* 快速经过时 timer 会被持续重置，不会触发 handleHovering。
		* 注意：仅在基准线未激活时调用，激活后直接走 handleHovering。
		*/ _proto.scheduleHovering = function scheduleHovering(evt) {
			if (!this.isNearFieldEdge(evt)) {
				this.clearHoverDebounce();
				return;
			}
			this.clearHoverDebounce();
			this.hoverDebounceTimer = setTimeout(() => {
				this.hoverDebounceTimer = void 0;
				this.handleHovering(evt);
			}, 50);
		};
		_proto.clearHoverDebounce = function clearHoverDebounce() {
			if (this.hoverDebounceTimer !== void 0) {
				clearTimeout(this.hoverDebounceTimer);
				this.hoverDebounceTimer = void 0;
			}
		};
		/**
		* 轻量预判：鼠标是否在某列边缘的热区范围内。
		* 用于防抖前的快速过滤，避免对所有 mousemove 都启动 timer。
		*/ _proto.isNearFieldEdge = function isNearFieldEdge(evt) {
			var { target, x: offsetX, y: offsetY } = evt;
			if (!(target === null || target === void 0 ? void 0 : target.columnInfo) || !target.columnInfo.isField || target.rowInfo) return false;
			var { columnInfo } = target;
			var { range } = this.collector;
			if (this.isHoveringFieldGroupHeader(offsetY) && columnInfo.fieldGroupId) {
				var { fieldGroupRect } = columnInfo;
				if (!fieldGroupRect) return false;
				var groupEndX = fieldGroupRect.x - (columnInfo.isFrozen ? 0 : range.scrollLeft) + fieldGroupRect.width;
				return Math.abs(offsetX - groupEndX) <= this.hotAreaWidth;
			}
			var fieldStartX = columnInfo.isFrozen ? columnInfo.x : columnInfo.x - range.scrollLeft;
			var fieldEndX = fieldStartX + columnInfo.width;
			return Math.abs(offsetX - fieldStartX) <= this.hotAreaWidth || Math.abs(offsetX - fieldEndX) <= this.hotAreaWidth;
		};
		_proto.handleHovering = function handleHovering(evt) {
			if (!this.parentApi.getStatus().getPermissionStatus("canEditViewConfig", {})) return;
			var { target, x: offsetX } = evt;
			this.hoverLineX = 0;
			if (!(target === null || target === void 0 ? void 0 : target.columnInfo) || !target.columnInfo.isField || target.rowInfo) {
				this.cancelDragReady();
				return;
			}
			var { columnInfo } = target;
			if (this.isHoveringFieldGroupHeader(evt.y) && columnInfo.fieldGroupId) {
				if (!this.tryHoverFieldGroupRightEdge(columnInfo, offsetX)) {
					this.cancelDragReady();
					return;
				}
			} else if (!this.tryHoverSingleFieldEdge(columnInfo, offsetX)) {
				this.cancelDragReady();
				return;
			}
			var { y: lineY, height: lineHeight } = this.getHeadLineYAndHeight();
			this.group.add(pen.config.line({
				x: this.hoverLineX,
				y: lineY,
				points: [
					0,
					0,
					0,
					lineHeight
				],
				borderWidth: defaultStyle$1.headLineWidth,
				borderColor: defaultStyle$1.lineColor
			}));
			this.setCursor(Cursor.COL_RESIZE);
			this.listenDragReady();
		};
		/**
		* 单列边界命中：命中则设置 targetId / hoverLineX / isBoundaryInsideFieldGroup 等，
		* 并初始化 targetOriginX / targetOriginWidth。
		*/ _proto.tryHoverSingleFieldEdge = function tryHoverSingleFieldEdge(columnInfo, offsetX) {
			var fieldStartX = this.getFieldScreenStartX(columnInfo);
			var fieldEndX = this.getFieldScreenEndX(columnInfo);
			var hoverLineX = 0;
			var targetId = "";
			if (Math.abs(offsetX - fieldEndX) <= this.hotAreaWidth) {
				hoverLineX = fieldEndX;
				targetId = columnInfo.isField ? columnInfo.id : "";
			} else if (Math.abs(offsetX - fieldStartX) <= this.hotAreaWidth) {
				targetId = this.getPreFieldId(columnInfo.id);
				hoverLineX = targetId ? this.getPreFieldEndX(targetId, fieldStartX) : 0;
			}
			if (!hoverLineX || !targetId) return false;
			this.hoverLineX = hoverLineX;
			this.targetId = targetId;
			this.isResizingFieldGroup = false;
			this.targetFieldGroupId = void 0;
			this.targetFieldGroupFieldIds = [];
			this.targetFieldGroupOriginWidths = [];
			var targetColumnInfo = this.collector.columns.getInfoByFieldId(targetId);
			this.targetOriginX = targetColumnInfo ? this.getFieldScreenStartX(targetColumnInfo) : hoverLineX;
			this.targetOriginWidth = this.collector.dataUtil.getColumnWidth(targetId);
			return true;
		};
		/**
		* 编组右边界命中（上半行）：命中则激活"编组宽度调整"，
		* 设置编组相关状态用于 drag / applyBehavior。
		*/ _proto.tryHoverFieldGroupRightEdge = function tryHoverFieldGroupRightEdge(columnInfo, offsetX) {
			var { range, dataUtil } = this.collector;
			var { fieldGroupId, fieldGroupRect } = columnInfo;
			if (!fieldGroupId || !fieldGroupRect) return false;
			var groupStartX = fieldGroupRect.x - (columnInfo.isFrozen ? 0 : range.scrollLeft);
			var groupEndX = groupStartX + fieldGroupRect.width;
			if (Math.abs(offsetX - groupEndX) > this.hotAreaWidth) return false;
			var group = dataUtil.getFieldGroupByFieldId(columnInfo.id);
			if (!group) return false;
			var groupFieldIds = [];
			var groupOriginWidths = [];
			var visibleFieldIds = dataUtil.getVisibleFieldIds();
			group.fieldList.forEach((field) => {
				var fieldId = field.getId();
				if (!visibleFieldIds.includes(fieldId)) return;
				groupFieldIds.push(fieldId);
				groupOriginWidths.push(dataUtil.getColumnWidth(fieldId));
			});
			if (groupFieldIds.length === 0) return false;
			this.hoverLineX = groupEndX;
			this.targetId = groupFieldIds[groupFieldIds.length - 1];
			this.isResizingFieldGroup = true;
			this.targetFieldGroupId = fieldGroupId;
			this.targetFieldGroupFieldIds = groupFieldIds;
			this.targetFieldGroupOriginWidths = groupOriginWidths;
			this.targetOriginX = groupStartX;
			this.targetOriginWidth = fieldGroupRect.width;
			return true;
		};
		_proto.handleDragging = function handleDragging(offsetX) {
			this.group.clear();
			var { size } = this.collector;
			var viewEndX = size.globalRect.x + size.globalRect.width;
			var fieldCount = this.isResizingFieldGroup ? Math.max(this.targetFieldGroupFieldIds.length, 1) : 1;
			var minWidth = DefaultConfig.COLUMN_MIN_WIDTH * fieldCount;
			var maxWidth = DefaultConfig.COLUMN_MAX_WIDTH * fieldCount;
			var minX = this.targetOriginX + minWidth;
			var maxX = this.targetOriginX + maxWidth;
			var moveDistance = Math.round(offsetX - this.mouseDownX);
			var lineX = this.hoverLineX + moveDistance;
			if (lineX > maxX) {
				lineX = maxX;
				moveDistance = maxX - this.hoverLineX;
			} else if (lineX < minX) {
				lineX = minX;
				moveDistance = minX - this.hoverLineX;
			}
			this.targetNewWidth = Math.max(0, this.targetOriginWidth + moveDistance);
			if (this.targetNewWidth > maxWidth) {
				this.targetNewWidth = maxWidth;
				moveDistance = this.targetNewWidth - this.targetOriginWidth;
				lineX = this.hoverLineX + moveDistance;
			} else if (this.targetNewWidth < minWidth) {
				this.targetNewWidth = minWidth;
				moveDistance = this.targetNewWidth - this.targetOriginWidth;
				lineX = this.hoverLineX + moveDistance;
			}
			var { y: lineY, height: headLineHeight } = this.getHeadLineYAndHeight();
			this.group.add(pen.config.line({
				x: lineX,
				y: lineY,
				points: [
					0,
					0,
					0,
					headLineHeight
				],
				borderWidth: defaultStyle$1.headLineWidth,
				borderColor: defaultStyle$1.lineColor
			}));
			this.group.add(pen.config.line({
				x: lineX,
				y: lineY,
				points: [
					0,
					0,
					0,
					getFrozenEndY(this.collector) - lineY
				],
				borderWidth: defaultStyle$1.bodyLineWidth,
				borderColor: defaultStyle$1.lineColor
			}));
			var tipTextFontSize = style.size.fontSizeNormal;
			var tipText = this.isResizingFieldGroup ? i18n.t("列编组宽度：{{newWidth}} 像素", { newWidth: this.targetNewWidth }) : i18n.t("列宽度：{{newWidth}} 像素", { newWidth: this.targetNewWidth });
			var tipTextWidth = pen.util.measureTextWidth(tipText, tipTextFontSize);
			var tipX = lineX + defaultStyle$1.tipPaddingH;
			var tipWidth = tipTextWidth + defaultStyle$1.tipPaddingH * 2;
			if (tipX + tipWidth > viewEndX) tipX = lineX - tipWidth - defaultStyle$1.tipPaddingH;
			var tipRect = {
				x: tipX,
				y: size.activityStartY + style.size.cellPadding,
				width: tipWidth,
				height: tipTextFontSize + defaultStyle$1.tipPaddingV * 2
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, tipRect), {
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.tagBorderRadius,
				background: style.color.normalBackground
			})));
			this.group.add(pen.config.text(Object.assign(Object.assign({}, tipRect), {
				x: tipRect.x + defaultStyle$1.tipPaddingH,
				text: tipText,
				color: style.color.normalFontColor,
				fontSize: tipTextFontSize
			})));
			this.setCursor(Cursor.COL_RESIZE);
			if (this.isRealTimeMode()) {
				this.collector.columns.patchWidth(this.targetId, this.targetNewWidth);
				this.collector.patch();
				this.parentApi.renderMain();
			}
		};
		_proto.listenDragReady = function listenDragReady() {
			var _a;
			(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
			this.mouseDownDisposable = this.UIEvent.stage.onMouseDown(this.onStageMouseDown);
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a;
			(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
		};
		_proto.registerDragging = function registerDragging() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseUp);
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
			this.escDisposable = registerEscToCancel(this.UIEvent, () => {
				if (!this.isDragging) return;
				this.cancelDragReady();
				this.cancelDraggingEvent();
				this.reset();
			});
		};
		_proto.cancelDraggingEvent = function cancelDraggingEvent() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
			this.escDisposable = void 0;
		};
		_proto.getPreFieldId = function getPreFieldId(id) {
			var columnInfos = [...this.collector.columns.getInfos().values()];
			var targetColumnInfo = columnInfos[columnInfos.findIndex((columnInfo) => columnInfo.id === id) - 1];
			if (targetColumnInfo.isField) return targetColumnInfo.id;
			return "";
		};
		_proto.getFieldScreenStartX = function getFieldScreenStartX(info) {
			return info.isFrozen ? info.x : info.x - this.collector.range.scrollLeft;
		};
		_proto.getFieldScreenEndX = function getFieldScreenEndX(info) {
			return info.isFrozen ? info.x + info.width : info.x + info.width - this.collector.range.scrollLeft;
		};
		/** 获取前一列右边界的屏幕 x，用于命中左边界时精确定位基准线 */ _proto.getPreFieldEndX = function getPreFieldEndX(preFieldId, fallback) {
			var prevColumnInfo = this.collector.columns.getInfoByFieldId(preFieldId);
			return prevColumnInfo ? this.getFieldScreenEndX(prevColumnInfo) : fallback;
		};
		/**
		* 有列编组时，鼠标 Y 是否落在"编组头行"（表头上半行）。
		* 该区域不响应单列列宽调整。
		*/ _proto.isHoveringFieldGroupHeader = function isHoveringFieldGroupHeader(offsetY) {
			var { dataUtil, size } = this.collector;
			if (!dataUtil.hasVisibleFieldGroup()) return false;
			return offsetY >= size.globalPaddingTop && offsetY < size.globalPaddingTop + size.fieldGroupHeaderHeight;
		};
		/**
		* 表头段基准线的 y 起点和高度：
		* - 编组宽度调整（上半区）→ 覆盖完整表头（编组头 + 字段头）
		* - 单列宽度调整：基准线贴合"被调整列"自身的列头高度
		*   - 被调整列在编组中 → 列头 y 下移 fieldGroupHeaderHeight、height = fieldHeightGrid（只画字段头行）
		*   - 被调整列在编组外（或无编组） → 列头 y = globalPaddingTop、height = fieldHeight（全高）
		*/ _proto.getHeadLineYAndHeight = function getHeadLineYAndHeight() {
			var { size, columns } = this.collector;
			if (this.isResizingFieldGroup) return {
				y: size.globalPaddingTop,
				height: size.fieldHeight
			};
			var targetColumnInfo = this.targetId ? columns.getInfoByFieldId(this.targetId) : void 0;
			if (targetColumnInfo) return {
				y: targetColumnInfo.y,
				height: targetColumnInfo.height
			};
			return {
				y: size.globalPaddingTop,
				height: size.fieldHeight
			};
		};
		_proto.applyBehavior = function applyBehavior() {
			var viewModel = this.collector.dataUtil.getCurrentView();
			var table = this.collector.dataUtil.getCurrentTable();
			if (!viewModel || !table || !this.targetId || !this.targetNewWidth || !this.hasChangeData) return;
			if (this.isResizingFieldGroup) {
				this.applyBehaviorForFieldGroup(table.id, viewModel.id);
				return;
			}
			var fieldIds = [this.targetId];
			logger.info(`[xview][修改列宽] targetNewWidth=${this.targetNewWidth}`);
			var fieldMoveFeature = this.renderer.getFeature(IGridFieldMove);
			var selectFieldIds = fieldMoveFeature === null || fieldMoveFeature === void 0 ? void 0 : fieldMoveFeature.getSelects();
			if (selectFieldIds === null || selectFieldIds === void 0 ? void 0 : selectFieldIds.includes(this.targetId)) fieldIds = selectFieldIds;
			var params = {
				tableId: table.id,
				viewId: viewModel.id,
				fieldIds
			};
			var targetWidth = Math.max(this.targetNewWidth, this.collector.columns.getFieldTempWidth(this.targetId));
			if (!this.context.customConfig) this.context.getBehaviorApi().setColWidth(Object.assign(Object.assign({}, params), { delta: { width: targetWidth } }));
			else if (this.context.isDashboardLite) this.context.emitter.service.onDashboardLiteColumnWidthChanged.fire(Object.assign(Object.assign({}, params), { width: targetWidth }));
		};
		/**
		* 编组宽度调整：将"编组宽度变化的比例"应用到组内每个列
		* newWidth_i = round(originWidth_i * (targetNewWidth / targetOriginWidth))
		* 同时对每列做 [COLUMN_MIN_WIDTH, COLUMN_MAX_WIDTH] 限制。
		*/ _proto.applyBehaviorForFieldGroup = function applyBehaviorForFieldGroup(tableId, viewId) {
			var fieldIds = [...this.targetFieldGroupFieldIds];
			var originWidths = [...this.targetFieldGroupOriginWidths];
			if (fieldIds.length === 0 || this.targetOriginWidth <= 0) return;
			var ratio = this.targetNewWidth / this.targetOriginWidth;
			var widthArray = originWidths.map((w) => {
				var scaled = Math.round(w * ratio);
				return Math.min(DefaultConfig.COLUMN_MAX_WIDTH, Math.max(DefaultConfig.COLUMN_MIN_WIDTH, scaled));
			});
			logger.info(`[xview][修改编组宽度] groupId=${this.targetFieldGroupId}, originWidth=${this.targetOriginWidth}, newWidth=${this.targetNewWidth}, ratio=${ratio}, widthArray=${widthArray}`);
			if (!this.context.customConfig) this.context.getBehaviorApi().setColWidth({
				tableId,
				viewId,
				fieldIds,
				delta: { widthArray }
			});
			else if (this.context.isDashboardLite) fieldIds.forEach((fieldId, index) => {
				this.context.emitter.service.onDashboardLiteColumnWidthChanged.fire({
					tableId,
					viewId,
					fieldIds: [fieldId],
					width: widthArray[index]
				});
			});
		};
		_proto.isRealTimeMode = function isRealTimeMode() {
			return false;
		};
		_create_class$7(GridFieldWidth, [{
			key: "hasChangeData",
			get: function() {
				return this.targetOriginWidth !== this.targetNewWidth;
			}
		}]);
		return GridFieldWidth;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/field-width/index.js
var init_field_width = __esmMin((() => {
	init_interface$7();
	init_main$7();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/formula-layer/interface.js
var IGridFormulaLayer;
var init_interface$6 = __esmMin((() => {
	init_module();
	IGridFormulaLayer = createDecorator("IGridFormulaLayer");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/formula-layer/main.js
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
var GridFormulaLayer;
var init_main$6 = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_grid_feature();
	init_interface$6();
	init_get_field_rect();
	GridFormulaLayer = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$22(GridFormulaLayer, GridFeatureBase);
		function GridFormulaLayer() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.visible = false;
			_this.states = [];
			_this.onStageMouseDown = (evt) => {
				if (evt.target.columnInfo && !evt.target.rowInfo && !evt.target.isBlank && _this.clickField) _this.clickField(evt.target.columnInfo.id);
			};
			_this.onStageMouseMove = (evt) => {
				_this.hoverGroup.clear();
				var { columnInfo } = evt.target;
				if (columnInfo && !evt.target.rowInfo && !evt.target.isBlank) _this.hoverGroup.add(pen.config.rect(Object.assign(Object.assign({}, _this.getFieldRect(columnInfo)), { background: style.color.hoverBackground })));
			};
			return _this;
		}
		var _proto = GridFormulaLayer.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.stateGroup = this._register(pen.group(this.collector.size.globalRect));
			this.hoverGroup = this._register(pen.group(this.collector.size.globalRect));
			this.group.addGroup(this.stateGroup);
			this.group.addGroup(this.hoverGroup);
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onResize(() => {
				this.group.setAttrs(this.collector.size.globalRect);
				this.stateGroup.setAttrs(this.collector.size.globalRect);
				this.hoverGroup.setAttrs(this.collector.size.globalRect);
			}));
		};
		_proto.render = function render() {
			this.renderStates();
		};
		_proto.isVisible = function isVisible() {
			return this.visible;
		};
		_proto.showLayer = function showLayer(visible, clickField, getStates, onStateChanged) {
			this.visible = visible;
			this.clickField = clickField;
			this.onStateChanged = onStateChanged;
			if (!visible) {
				this.stateGroup.clear();
				this.hoverGroup.clear();
				this.cancelReady();
				this.clickField = void 0;
				this.onStateChanged = void 0;
				this.states = [];
				return;
			}
			this.states = getStates();
			this.renderStates();
			this.registerReady();
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGridFormulaLayer,
				isLock: () => this.isVisible()
			} };
		};
		_proto.renderStates = function renderStates() {
			this.stateGroup.clear();
			this.states.forEach(({ fieldId, style: style$1 }) => {
				var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
				if (!columnInfo) return;
				var styleConfig = getFormulaTagStyleConfig(style$1);
				var clipArea = columnInfo.isFrozen ? this.frozenRect : this.activeRect;
				this.stateGroup.add(pen.config.rect(Object.assign(Object.assign({}, this.getFieldRect(columnInfo)), {
					borderWidth: style.size.borderWidth,
					borderColor: styleConfig.borderColor,
					background: styleConfig.background,
					clipArea
				})));
			});
		};
		_proto.registerReady = function registerReady() {
			var _a;
			this.cancelReady();
			this.mouseDownDisposable = this.UIEvent.stage.onMouseDown(this.onStageMouseDown);
			this.mouseMoveDisposable = this.UIEvent.stage.onMouseMove(this.onStageMouseMove);
			(_a = this.onStateChanged) === null || _a === void 0 || _a.call(this, (states) => {
				this.states = states;
				this.renderStates();
			});
		};
		_proto.cancelReady = function cancelReady() {
			var _a, _b;
			(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseMoveDisposable) === null || _b === void 0 || _b.dispose();
		};
		_proto.getFieldRect = function getFieldRect1(columnInfo) {
			return getFieldRect(columnInfo, this.collector);
		};
		_create_class$6(GridFormulaLayer, [{
			key: "frozenRect",
			get: function() {
				var { activityStartX, activityViewHeight } = this.collector.size;
				return {
					x: 0,
					y: 0,
					width: activityStartX,
					height: activityViewHeight
				};
			}
		}, {
			key: "activeRect",
			get: function() {
				var { activityStartX, activityViewWidth, activityViewHeight } = this.collector.size;
				return {
					x: activityStartX,
					y: 0,
					width: activityViewWidth,
					height: activityViewHeight
				};
			}
		}]);
		return GridFormulaLayer;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/formula-layer/index.js
var init_formula_layer = __esmMin((() => {
	init_interface$6();
	init_main$6();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/frozen-line-drag/interface.js
var IGridFrozenLineDrag;
var init_interface$5 = __esmMin((() => {
	init_module();
	IGridFrozenLineDrag = createDecorator("IGridFrozenLineDrag");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/frozen-line-drag/main.js
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
var defaultStyle, tipConfig, GridFrozenLineDrag;
var init_main$5 = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_constants();
	init_grid_feature();
	init_interface$5();
	init_get_frozen_end_y();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	defaultStyle = {
		dragLineWidth: style.size.borderWidth * 3,
		hotAreaWidth: 3,
		lineColor: "#9DA0A3",
		tipRectHeight: 28,
		opacityStep: .02,
		frozenLineMaxRate: .9
	};
	tipConfig = {
		fontSize: 12,
		rectWidth: 110,
		paddingLeft: 8,
		margin: 12
	};
	GridFrozenLineDrag = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$21(GridFrozenLineDrag, GridFeatureBase);
		function GridFrozenLineDrag() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.hoverLineX = 0;
			_this.isDragging = false;
			_this.frozenLineIndex = 0;
			_this.onStageMouseMove = (evt) => {
				_this.group.clear();
				if (_this.isPreventFromOtherFeature()) return;
				var { size } = _this.collector;
				var hotRect = {
					x: size.activityStartX - defaultStyle.hotAreaWidth,
					y: size.globalPaddingTop,
					width: 2 * defaultStyle.hotAreaWidth,
					height: _this.frozenLineHeight
				};
				var { canEditViewConfig } = _this.parentApi.getStatus();
				if (isHitRect(evt.x, evt.y, hotRect) && canEditViewConfig) {
					if (_this.hoverLineX) _this.handleHovering(evt.y);
					else _this.scheduleHovering(evt.y);
					return;
				}
				_this.hoverLineX = 0;
				_this.clearHoverDebounce();
			};
			_this.onStageMouseDown = () => {
				if (!_this.hoverLineX || _this.isPreventFromOtherFeature()) return;
				_this.isDragging = true;
				_this.collector.range.updateScrollLeft(0);
				_this.frozenLineIndex = _this.collector.state.getColumnFrozenCount() - _this.collector.state.getOperatorFieldNum();
				_this.renderer.renderMain();
				_this.registerDragging();
			};
			_this.onWindowMouseMove = (evt) => {
				if (_this.isDragging) {
					_this.group.clear();
					var { x, y, target } = evt;
					_this.updateFrozenFieldIndex(target, x);
					var frozenColumnsInfo = _this.collector.columns.getInfoByIndex(_this.frozenLineIndex);
					if (frozenColumnsInfo) {
						var frozenLineOffsetX = frozenColumnsInfo.x + frozenColumnsInfo.width;
						_this.renderDragLineAndRect(x, y);
						_this.renderCanFrozenLine(frozenLineOffsetX);
					}
					_this.setCursor(Cursor.GRABBING);
				}
			};
			_this.onDocumentMouseUp = () => {
				_this.cancelDragReady();
				_this.cancelDraggingEvent();
				_this.applyBehavior();
				_this.disappearWidthAnimation();
				_this.clearAllStatus();
				_this.setCursor(Cursor.DEFAULT);
			};
			_this.clearAllStatus = () => {
				_this.isDragging = false;
				_this.hoverLineX = 0;
				_this.frozenLineIndex = 0;
				_this.group.clear();
			};
			return _this;
		}
		var _proto = GridFrozenLineDrag.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.animationGroup = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this.layer.addGroup(this.animationGroup);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.stage.onResize(() => {
				this.group.setAttrs(this.collector.size.globalRect);
				this.animationGroup.setAttrs(this.collector.size.globalRect);
			}));
		};
		_proto.dispose = function dispose(trace) {
			GridFeatureBase.prototype.dispose.call(this, trace);
			this.cancelDragReady();
			this.cancelDraggingEvent();
			this.clearHoverDebounce();
		};
		_proto.render = function render() {};
		_proto.isHovering = function isHovering() {
			return this.hoverLineX !== 0 || this.isDragging;
		};
		_proto.showFrozenLineFadeOut = function showFrozenLineFadeOut(fieldId) {
			var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
			if (!columnInfo) return;
			this.frozenLineIndex = columnInfo.index;
			this.disappearWidthAnimation();
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return {
				default: {
					id: IGridFrozenLineDrag,
					isLock: () => this.isDragging
				},
				low: {
					id: IGridFrozenLineDrag,
					isLock: () => this.isHovering()
				}
			};
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGridFrozenLineDrag);
		};
		/**
		* 防抖入口：鼠标在冻结线热区停留 500ms 后才真正激活 hover 基准线。
		* 快速经过时 timer 会被持续重置，不会触发 handleHovering。
		* 注意：仅在基准线未激活时调用，激活后直接走 handleHovering。
		*/ _proto.scheduleHovering = function scheduleHovering(y) {
			this.clearHoverDebounce();
			this.hoverDebounceTimer = setTimeout(() => {
				this.hoverDebounceTimer = void 0;
				this.handleHovering(y);
			}, 50);
		};
		_proto.clearHoverDebounce = function clearHoverDebounce() {
			if (this.hoverDebounceTimer !== void 0) {
				clearTimeout(this.hoverDebounceTimer);
				this.hoverDebounceTimer = void 0;
			}
		};
		_proto.handleHovering = function handleHovering(y) {
			var { size } = this.collector;
			this.hoverLineX = size.activityStartX;
			this.renderDragLineAndRect(this.hoverLineX, y);
			this.renderDragTips(this.hoverLineX, y);
			this.setCursor(Cursor.GRAB);
			this.listenDragReady();
		};
		_proto.renderDragLineAndRect = function renderDragLineAndRect(x, y) {
			this.group.add(pen.config.line({
				x,
				y: this.collector.size.globalPaddingTop,
				points: [
					0,
					0,
					0,
					this.frozenLineHeight
				],
				borderWidth: defaultStyle.dragLineWidth,
				borderColor: defaultStyle.lineColor
			}));
			this.group.add(pen.config.rect({
				x: x - defaultStyle.hotAreaWidth,
				y: y - defaultStyle.tipRectHeight / 2,
				width: 2 * defaultStyle.hotAreaWidth,
				height: defaultStyle.tipRectHeight,
				background: style.color.selectionBorderColor,
				borderRadius: style.size.borderRadius
			}));
		};
		_proto.renderDragTips = function renderDragTips(x, y) {
			var tipRect = {
				x: x + tipConfig.margin,
				y: y - defaultStyle.tipRectHeight / 2,
				width: tipConfig.rectWidth,
				height: defaultStyle.tipRectHeight
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, tipRect), {
				background: style.color.normalBackground,
				borderColor: style.color.normalBorderColor,
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.borderRadius
			})));
			var tipText = i18n.t("拖拽调整冻结区域");
			this.group.add(pen.config.text(Object.assign(Object.assign({}, tipRect), {
				x: tipRect.x + tipConfig.paddingLeft,
				text: tipText,
				color: style.color.normalFontColor,
				fontSize: tipConfig.fontSize
			})));
		};
		_proto.renderCanFrozenLine = function renderCanFrozenLine(offsetX) {
			var { size } = this.collector;
			this.group.add(pen.config.line({
				x: offsetX,
				y: size.globalPaddingTop,
				points: [
					0,
					0,
					0,
					this.frozenLineHeight
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: defaultStyle.dragLineWidth
			}));
		};
		_proto.listenDragReady = function listenDragReady() {
			var _a;
			(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
			this.mouseDownDisposable = this.UIEvent.stage.onMouseDown(this.onStageMouseDown);
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a;
			(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
		};
		_proto.registerDragging = function registerDragging() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseUp);
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
			this.escDisposable = registerEscToCancel(this.UIEvent, () => {
				if (!this.isDragging) return;
				this.cancelDragReady();
				this.cancelDraggingEvent();
				this.clearAllStatus();
				this.setCursor(Cursor.DEFAULT);
			});
		};
		_proto.cancelDraggingEvent = function cancelDraggingEvent() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
			this.escDisposable = void 0;
		};
		_proto.updateFrozenFieldIndex = function updateFrozenFieldIndex(target, offsetX) {
			var { size } = this.collector;
			var { columnInfo } = target;
			if (!columnInfo) return;
			if (columnInfo.id === "Operator" && columnInfo.index === 0) return;
			if (columnInfo.id === "Addition" || columnInfo.x + columnInfo.width > size.globalRect.width * defaultStyle.frozenLineMaxRate) return;
			if (columnInfo.fieldGroupId && columnInfo.fieldGroupRect) {
				this.updateFrozenFieldIndexForFieldGroup(columnInfo, offsetX);
				return;
			}
			if (offsetX > columnInfo.x + columnInfo.width / 2) this.frozenLineIndex = columnInfo.index;
			else this.frozenLineIndex = columnInfo.index - 1;
		};
		/**
		* 鼠标悬停列在某个编组中时，按编组中点决定冻结线落在编组左外侧还是右外侧。
		* 例：ab[cde]fg
		* - 鼠标在 [cde] 左半 → 冻结到 b 右侧，即 ab|[cde]fg
		* - 鼠标在 [cde] 右半 → 冻结到 e 右侧，即 ab[cde]|fg
		*/ _proto.updateFrozenFieldIndexForFieldGroup = function updateFrozenFieldIndexForFieldGroup(columnInfo, offsetX) {
			var { size, dataUtil, state } = this.collector;
			var { fieldGroupId, fieldGroupRect } = columnInfo;
			if (!fieldGroupId || !fieldGroupRect) return;
			if (fieldGroupRect.x + fieldGroupRect.width > size.globalRect.width * defaultStyle.frozenLineMaxRate) return;
			var indexes = dataUtil.getFieldIndexesInFieldGroup(fieldGroupId);
			if (indexes.length === 0) return;
			var groupStartIndex = Math.min(...indexes);
			var groupEndIndex = Math.max(...indexes);
			var operatorFieldNum = state.getOperatorFieldNum();
			if (offsetX < fieldGroupRect.x + fieldGroupRect.width / 2) this.frozenLineIndex = groupStartIndex + operatorFieldNum - 1;
			else this.frozenLineIndex = groupEndIndex + operatorFieldNum;
		};
		_proto.checkIsUnChange = function checkIsUnChange(index) {
			var _a, _b, _c;
			return ((_c = (_b = (_a = this.collector.dataUtil).getFrozenFieldCount) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : 0) === index;
		};
		_proto.disappearWidthAnimation = function disappearWidthAnimation() {
			var opacity = 1;
			var frozenColumnsInfo = this.collector.columns.getInfoByIndex(this.frozenLineIndex);
			if (!frozenColumnsInfo) return;
			var frozenLineOffsetX = frozenColumnsInfo.x + frozenColumnsInfo.width;
			var doDisappearAnimation = () => {
				if (opacity <= 0) {
					this.animationGroup.clear();
					return;
				}
				this.animationGroup.clear();
				var { size } = this.collector;
				opacity = Math.floor((opacity - defaultStyle.opacityStep) * 100) / 100;
				this.animationGroup.add(pen.config.line({
					x: frozenLineOffsetX,
					y: size.globalPaddingTop,
					points: [
						0,
						0,
						0,
						this.frozenLineHeight
					],
					borderWidth: defaultStyle.dragLineWidth,
					borderColor: style.color.selectionBorderColor,
					opacity
				}));
				requestAnimationFrame(doDisappearAnimation);
			};
			doDisappearAnimation();
		};
		_proto.applyBehavior = function applyBehavior() {
			var _a, _b;
			var frozenColumnsInfo = this.collector.columns.getInfoByIndex(this.frozenLineIndex);
			if (!frozenColumnsInfo) return;
			var realFrozenCount = this.collector.dataUtil.getAllFieldIds().findIndex((id) => id === frozenColumnsInfo.id) + 1;
			if (this.checkIsUnChange(realFrozenCount)) return;
			var context = this.collector.dataUtil.getContext();
			context.getCore().behaviorApi.setFrozenFieldCount({
				tableId: ((_a = context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id) || "",
				viewId: ((_b = context.getCurrentView()) === null || _b === void 0 ? void 0 : _b.id) || "",
				delta: { count: realFrozenCount }
			});
			logger.info(`[xview][拖拽修改冻结列] frozenLineIndex=${frozenColumnsInfo.index}`);
		};
		_create_class$5(GridFrozenLineDrag, [{
			key: "frozenLineHeight",
			get: function() {
				return getFrozenEndY(this.collector) - this.collector.size.globalPaddingTop;
			}
		}]);
		return GridFrozenLineDrag;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/frozen-line-drag/index.js
var init_frozen_line_drag = __esmMin((() => {
	init_interface$5();
	init_main$5();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/group-move/interface.js
var IGridGroupMove;
var init_interface$4 = __esmMin((() => {
	init_module();
	IGridGroupMove = createDecorator("IGridGroupMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/group-move/utils.js
/**
* 获取父级分组
*/ function getFatherGroups(groupRowIndex, rows) {
	var groupPath = getGroupPath(groupRowIndex, rows);
	if (!groupPath) return [];
	var rowInfo = rows.getInfo(groupRowIndex);
	var groups = [];
	groupPath.forEach(() => {
		var parent = rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.parent;
		if (!parent || !rowInfo || rowInfo.type !== RowType.GroupHead) return;
		groups.push(rowInfo);
		rowInfo = rows.getInfo(parent);
	});
	return groups;
}
/**
* 获取分组的兄弟分组
*/ function getBrotherGroups(groupRowIndex, rows) {
	var rowInfo = getGroupHeadRowInfo(groupRowIndex, rows);
	if (!rowInfo) return [];
	return rows.getTypeRows(RowType.GroupHead).filter((groupHeadRowInfo) => groupHeadRowInfo.parent === rowInfo.parent && groupHeadRowInfo.index !== groupRowIndex);
}
/**
* 是否支持分组移动
*/ function isSupportGroupMove(groupRowIndex, rows, viewHelper) {
	var rowInfo = rows.getInfo(groupRowIndex);
	if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.GroupHead) return false;
	var field = getGroupFieldByGroupIndex(groupRowIndex, rows, viewHelper);
	var fieldType = field === null || field === void 0 ? void 0 : field.getType();
	return SUPPORT_GROUP_MOVE_FIELD.includes(fieldType);
}
/**
* 获取分组头的列
*/ function getGroupFieldByGroupIndex(groupRowIndex, rows, viewHelper) {
	var _a;
	var path = getGroupPath(groupRowIndex, rows);
	if (!path || path.length === 0) return null;
	var { fieldId } = viewHelper.getGroupInfos()[path.length - 1];
	return (_a = viewHelper.getAllFields().find((field) => field.getId() === fieldId)) !== null && _a !== void 0 ? _a : null;
}
function getGroupHeadRowInfo(groupRowIndex, rows) {
	var row = rows.getInfo(groupRowIndex);
	if ((row === null || row === void 0 ? void 0 : row.type) !== RowType.GroupHead) return null;
	return row;
}
function getGroupPath(groupRowIndex, rows) {
	var rowInfo = getGroupHeadRowInfo(groupRowIndex, rows);
	if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.GroupHead) return null;
	return rowInfo.path;
}
var SUPPORT_GROUP_MOVE_FIELD;
var init_utils = __esmMin((() => {
	init_es$1();
	init_interface$23();
	SUPPORT_GROUP_MOVE_FIELD = [FieldType.SINGLE_SELECT];
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/group-move/main.js
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
var GridGroupMove;
var init_main$4 = __esmMin((() => {
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_interface$23();
	init_grid_feature();
	init_interface$4();
	init_utils();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	GridGroupMove = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$20(GridGroupMove, GridFeatureBase);
		function GridGroupMove() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.restoreFoldState = true;
			_this.mouseMoveX = 0;
			_this.mouseMoveY = 0;
			_this.mouseDownX = 0;
			_this.hoverRowIndex = -1;
			_this.dragRowIndex = -1;
			_this.dropRowIndex = -1;
			_this.iconRect = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			_this.isDragging = false;
			_this.isToTop = false;
			_this.onStageMouseMove = (evt) => {
				_this.group.clear();
				if (!_this.parentApi.getStatus().canEditGroup || _this.isPreventFromOtherFeature() || _this.collector.state.isHideGrid) return;
				_this.mouseMoveX = evt.x;
				_this.mouseMoveY = evt.y;
				var { columnInfo, rowInfo } = evt.target;
				_this.hoverRowIndex = columnInfo && (rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) === RowType.GroupHead && (rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.index) || -1;
				_this.show();
			};
			_this.onStageMouseDown = (evt) => {
				if (isHitRect(evt.x, evt.y, _this.iconRect)) {
					_this.startDrag();
					_this.registerDone();
					_this.setCursor(Cursor.GRABBING);
				}
			};
			_this.onStageMouseUp = () => {
				_this.cancelDone();
				_this.done();
				_this.cancelFold();
				_this.dragRowIndex = -1;
				_this.dropRowIndex = -1;
				_this.isDragging = false;
			};
			return _this;
		}
		var _proto = GridGroupMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(Object.assign(Object.assign({}, this.collector.size.globalRect), { y: this.collector.size.activityStartY })));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
		};
		_proto.render = function render() {
			this.hoverRowIndex = -1;
			this.show();
		};
		_proto.isActived = function isActived() {
			return this.isDragging;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGridGroupMove,
				isLock: () => this.isActived()
			} };
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGridGroupMove) || this.parentApi.getFloatState().isShow();
		};
		_proto.show = function show() {
			this.group.clear();
			if (this.isDragging) {
				this.showDragContent();
				return;
			}
			if (this.hoverRowIndex !== -1) this.showDragIcon();
			else this.hideDisableTooltip();
		};
		_proto.showDragIcon = function showDragIcon() {
			var rowInfo = this.collector.rows.getInfo(this.hoverRowIndex);
			if (!rowInfo) return;
			var { profile, widgetCollector } = this.collector;
			var iconMarginLeft = 3;
			var iconSize = style.size.iconSmall;
			var foldStart = profile.groupFoldStarts.get(rowInfo.level) || 0;
			var rowScreenY = widgetCollector.getRowScreenY(rowInfo);
			this.iconRect = {
				x: rowInfo.x + foldStart - iconSize + iconMarginLeft,
				y: rowScreenY + (rowInfo.height - iconSize) / 2,
				width: iconSize,
				height: iconSize
			};
			this.group.add(pen.config.icon(NormalIconAlias.GROUP_DRAG, this.iconRect), 0, 0, widgetCollector.getStickyHoverClipRect(rowInfo));
			if (isHitRect(this.mouseMoveX, this.mouseMoveY, this.iconRect)) {
				if (this.isDisabledDrag) {
					this.setCursor(Cursor.NOT_ALLOW);
					this.showDisableTooltip();
					return;
				}
				this.setCursor(Cursor.GRAB);
				this.registerDragReady();
			} else this.cancelDragReady();
		};
		_proto.registerDragReady = function registerDragReady() {
			this.cancelDragReady();
			this.mouseDownDisposable = this.UIEvent.stage.onMouseDown(this.onStageMouseDown);
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a;
			if (this.mouseDownDisposable) {
				(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
				this.mouseDownDisposable = void 0;
			}
		};
		_proto.registerDone = function registerDone() {
			this.cancelDone();
			this.mouseUpDisposable = this.UIEvent.stage.onMouseUp(this.onStageMouseUp);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => this.abortDrag());
		};
		_proto.cancelDone = function cancelDone() {
			var _a, _b;
			if (this.mouseUpDisposable) {
				(_a = this.mouseUpDisposable) === null || _a === void 0 || _a.dispose();
				this.mouseUpDisposable = void 0;
			}
			(_b = this.escDisposable) === null || _b === void 0 || _b.dispose();
			this.escDisposable = void 0;
		};
		/**
		* ESC 中断拖拽：与 {@link onStageMouseUp} 的清理路径一致，但**不调用 `done()`**（不派发 moveGroup），
		* 因此分组保持原位；同时 `cancelFold` 还原临时折叠、清空拖影、复位光标。
		*/ _proto.abortDrag = function abortDrag() {
			if (!this.isDragging) return;
			this.cancelDone();
			this.cancelFold();
			this.dragRowIndex = -1;
			this.dropRowIndex = -1;
			this.isDragging = false;
			this.group.clear();
			this.setCursor(Cursor.DEFAULT);
		};
		_proto.startDrag = function startDrag() {
			this.isDragging = true;
			this.mouseDownX = this.mouseMoveX;
			this.dragRowIndex = this.hoverRowIndex;
			this.foldGroup();
		};
		_proto.foldGroup = function foldGroup() {
			var groupHeadRowInfo = this.collector.rows.getInfo(this.dragRowIndex);
			if (!groupHeadRowInfo || groupHeadRowInfo.type !== RowType.GroupHead) return;
			var selfGroupPath = groupHeadRowInfo.path || [];
			this.setFold(selfGroupPath);
			getBrotherGroups(this.dragRowIndex, this.collector.rows).forEach((rowInfo) => {
				this.setFold(rowInfo.path);
			});
			var fatherGroups = getFatherGroups(this.dragRowIndex, this.collector.rows);
			this.collector.rows.getTypeRows(RowType.GroupHead).forEach((rowInfo) => {
				if (rowInfo.type === RowType.GroupHead && !fatherGroups.includes(rowInfo)) this.setFold(rowInfo.path);
			});
			this.updateMain();
		};
		_proto.setFold = function setFold(groupPath) {
			if (this.restoreFoldState) this.collector.state.setTempGroupFold(groupPath || []);
			else this.collector.state.setGroupFoldState(groupPath || [], true);
		};
		_proto.cancelFold = function cancelFold() {
			if (this.restoreFoldState) {
				this.collector.state.clearTempGroupFoldState();
				this.updateMain();
			}
		};
		_proto.updateMain = function updateMain() {
			this.collector.rows.collect();
			this.collector.range.collect();
			this.collector.contents.collect();
			this.parentApi.renderMain();
		};
		_proto.showDragContent = function showDragContent() {
			var groupHeadRowInfo = this.collector.rows.getInfo(this.dragRowIndex);
			if ((groupHeadRowInfo === null || groupHeadRowInfo === void 0 ? void 0 : groupHeadRowInfo.type) !== RowType.GroupHead) return;
			this.setCursor(Cursor.GRABBING);
			var { size, range } = this.collector;
			var innerRect = this.collector.getInnerRect(groupHeadRowInfo);
			var groupRect = Object.assign(Object.assign({}, innerRect), { y: innerRect.y + size.activityStartY - range.scrollTop });
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, groupRect), {
				background: style.color.normalBackground,
				borderRadius: style.size.borderRadius,
				opacity: .8
			})));
			var rectY = this.mouseMoveY - groupRect.height / 2;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, groupRect), {
				x: this.mouseMoveX,
				y: rectY,
				background: style.color.normalBackground,
				borderRadius: style.size.borderRadius,
				shadowBlur: 30,
				shadowColor: "rgb(200, 200, 200)"
			})));
			var groupValueInfo = this.collector.contents.getGroupValueInfo(groupHeadRowInfo.path);
			if (groupValueInfo) {
				var [valueRect, valueConfigs] = groupValueInfo;
				var offsetX = this.mouseMoveX - this.mouseDownX;
				var offsetY = this.mouseMoveY - valueRect.y - groupRect.height / 4 - style.size.borderWidth * 2;
				valueConfigs.forEach((config) => {
					this.group.add(Object.assign({}, config), offsetX, offsetY, size.globalRect);
				});
			}
			this.showDropLine();
		};
		_proto.showDropLine = function showDropLine() {
			var dragRowInfo = this.collector.rows.getInfo(this.dragRowIndex);
			var hoverRowInfo = this.collector.rows.getInfo(this.hoverRowIndex);
			if (!hoverRowInfo || !dragRowInfo || hoverRowInfo === dragRowInfo) return;
			var { size, rows } = this.collector;
			var allGroups = [dragRowInfo, ...getBrotherGroups(this.dragRowIndex, this.collector.rows)].sort((info1, info2) => info1.index - info2.index);
			var dragIndex = allGroups.findIndex((info) => info.index === this.dragRowIndex);
			var dropResult = this.computeDropPosition(allGroups, size.activityStartY, rows.getRowSize(RowType.Spacing));
			if (!dropResult || dropResult.dropIndex === dragIndex) return;
			this.isToTop = dropResult.isToTop;
			var dropRowInfo = allGroups[dropResult.dropIndex];
			if (!dropRowInfo) return;
			this.dropRowIndex = dropRowInfo.index;
			var innerRect = this.collector.getInnerRect(dropRowInfo);
			this.group.add(pen.config.line({
				x: dropRowInfo.x + dropRowInfo.level * size.levelIndent,
				y: dropResult.lineY,
				points: [
					0,
					0,
					innerRect.width,
					0
				],
				borderWidth: style.size.borderWidth * 2,
				borderColor: style.color.selectionBorderColor
			}));
		};
		_proto.computeDropPosition = function computeDropPosition(allGroups, activityStartY, spacingHeight) {
			for (var index = 0; index < allGroups.length; index++) {
				var brotherRowInfo = allGroups[index];
				var rowTopY = brotherRowInfo.y + activityStartY;
				var midY = rowTopY + brotherRowInfo.height / 2;
				var topStartY = rowTopY - spacingHeight / 2;
				if (this.mouseMoveY > topStartY && this.mouseMoveY <= midY) return {
					dropIndex: index,
					lineY: topStartY,
					isToTop: true
				};
				var bottomEndY = midY + brotherRowInfo.height / 2 + spacingHeight / 2;
				if (this.mouseMoveY > midY && this.mouseMoveY < bottomEndY) return {
					dropIndex: index,
					lineY: bottomEndY,
					isToTop: false
				};
			}
			return null;
		};
		_proto.done = function done() {
			var fromInfo = this.collector.rows.getInfo(this.dragRowIndex);
			var toInfo = this.collector.rows.getInfo(this.dropRowIndex);
			if (!fromInfo || fromInfo.type !== RowType.GroupHead || !toInfo || toInfo.type !== RowType.GroupHead) return;
			var fromPath = fromInfo.path;
			var toPath = toInfo.path;
			if (!fromPath || !toPath) return;
			this.emitter.service.moveGroupEmitter.fire({
				fromPath,
				toPath,
				isTop: this.isToTop
			});
			logger.info(`[xview][拖动分组]成功`);
		};
		_proto.showDisableTooltip = function showDisableTooltip() {
			var _a;
			var hoverRowInfo = this.collector.rows.getInfo(this.hoverRowIndex);
			if ((hoverRowInfo === null || hoverRowInfo === void 0 ? void 0 : hoverRowInfo.type) !== RowType.GroupHead) return;
			var fieldType = (_a = getGroupFieldByGroupIndex(this.hoverRowIndex, this.collector.rows, this.collector.dataUtil.getCurrentView())) === null || _a === void 0 ? void 0 : _a.getType();
			if (!fieldType) return;
			var { size, range } = this.collector;
			var rect = {
				x: hoverRowInfo.x + hoverRowInfo.level * size.levelIndent,
				y: hoverRowInfo.y + size.activityStartY - range.scrollTop,
				width: style.size.iconSmall,
				height: style.size.iconSmall
			};
			this.emitter.service.moveGroupTooltip.fire({
				rect,
				fieldType,
				isShow: true
			});
		};
		_proto.hideDisableTooltip = function hideDisableTooltip() {
			this.emitter.service.moveGroupTooltip.fire({ isShow: false });
		};
		_create_class$4(GridGroupMove, [{
			key: "isDisabledDrag",
			get: function() {
				return !isSupportGroupMove(this.hoverRowIndex, this.collector.rows, this.collector.dataUtil.getCurrentView());
			}
		}]);
		return GridGroupMove;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/group-move/index.js
var init_group_move = __esmMin((() => {
	init_interface$4();
	init_main$4();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/progress-set/interface.js
var IGridProgressSet;
var init_interface$3 = __esmMin((() => {
	init_module();
	IGridProgressSet = createDecorator("IGridProgressSet");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/progress-set/main.js
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
/**
* 按 property.decimalPlaces / useDefaultDecimal 对进度 cellValue 做取整，
* 使保存精度与列格式化展示精度保持一致。
*
* 量纲说明：
* - percentage 模式：展示值 = cellValue（如 19.5% → cellValue 19.5）
* - number     模式：展示值 = cellValue / MULTIPLE_NUMBER（如展示 19.5 → cellValue 1950）
* decimalPlaces 作用在"展示值"上，因此两种模式需要分别处理。
*
* 当 useDefaultDecimal=true 或 decimalPlaces<0 时表示默认精度，跳过取整，保持 rawValue。
*/ function roundProgressCellValue(cellValue, numberFormat, property) {
	var { decimalPlaces, useDefaultDecimal } = property;
	if (useDefaultDecimal || typeof decimalPlaces !== "number" || decimalPlaces < 0) return cellValue;
	var factor = Math.pow(10, decimalPlaces);
	if (numberFormat === NumberFormat.Number) {
		var display = cellValue / 100;
		return Math.round(display * factor) / factor * 100;
	}
	return Math.round(cellValue * factor) / factor;
}
var SLIDER_WIDTH, SLIDER_HEIGHT, SLIDER_BORDER_RADIUS, SLIDER_BORDER_WIDTH, PROGRESS_RADIUS, GridProgressSet;
var init_main$3 = __esmMin((() => {
	init_es();
	init_es$1();
	init_lib();
	init_pen();
	init_style();
	init_interface$23();
	init_grid_feature();
	init_interface$3();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	SLIDER_WIDTH = 8;
	SLIDER_HEIGHT = 18;
	SLIDER_BORDER_RADIUS = 5;
	SLIDER_BORDER_WIDTH = 1;
	PROGRESS_RADIUS = 2;
	GridProgressSet = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$19(GridProgressSet, GridFeatureBase);
		function GridProgressSet() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.hoverFieldId = "";
			_this.hoverRecordId = "";
			_this.hoverItemIndex = -1;
			/** 进度外框矩形（显示坐标系） */ _this.hoverBarRect = null;
			/** 当前 hover 进度项的文本排版信息（用于拖拽时复用位置/样式）；整条信息整体保存以便一次性复制 */ _this.hoverItem = null;
			/** 当前 hover 的滑块矩形（显示坐标系，作为下次 hit test 的热区） */ _this.hoverSliderRect = null;
			_this.tipOpacity = 0;
			_this.tipFadeTimer = null;
			_this.isDragging = false;
			/** 拖拽起始的百分比 [0, 1]（相对于 numberRange） */ _this.dragStartPercent = 0;
			/** 拖拽过程中的百分比 [0, 1] */ _this.dragPercent = 0;
			/** 拖拽 mousedown 时鼠标位置，以便计算相对位移 */ _this.dragDownX = 0;
			_this.onStageMouseMove = (evt) => {
				if (_this.isDragging) return;
				if (_this.isPreventFromOtherFeature()) {
					_this.resetHover();
					return;
				}
				var hit = _this.computeHit(evt);
				if (!hit) {
					_this.resetHover();
					return;
				}
				var { target, itemHit } = hit;
				var { columnInfo } = target;
				if (!columnInfo) {
					_this.resetHover();
					return;
				}
				_this.hoverFieldId = columnInfo.id;
				_this.hoverRecordId = target.rowInfo.recordId;
				_this.hoverItemIndex = itemHit.itemIndex;
				_this.hoverBarRect = itemHit.displayRect;
				_this.hoverItem = itemHit;
				_this.renderSlider();
				if (_this.hoverSliderRect && isHitRect(evt.x, evt.y, _this.hoverSliderRect)) {
					_this.setCursor(Cursor.EW_RESIZE);
					_this.listenDragReady();
				} else {
					_this.setCursor(Cursor.DEFAULT);
					_this.cancelDragReady();
				}
			};
			_this.onStageMouseDown = (evt) => {
				if (!_this.hoverBarRect || !_this.hoverSliderRect) return;
				if (!isHitRect(evt.x, evt.y, _this.hoverSliderRect)) return;
				_this.isDragging = true;
				_this.dragStartPercent = _this.getCurrentPercent();
				_this.dragPercent = _this.dragStartPercent;
				_this.dragDownX = evt.x;
				_this.setCursor(Cursor.EW_RESIZE);
				_this.registerDragging();
				_this.collector.state.setHiddenCell(_this.hoverFieldId, _this.hoverRecordId);
				_this.parentApi.renderMain();
				_this.renderSlider();
			};
			_this.onWindowMouseMove = (evt) => {
				if (!_this.isDragging || !_this.hoverBarRect) return;
				var availableWidth = Math.max(0, _this.hoverBarRect.width - SLIDER_WIDTH);
				if (availableWidth <= 0) _this.dragPercent = 0;
				else {
					var sliderX = _this.hoverBarRect.x + availableWidth * _this.dragStartPercent + (evt.x - _this.dragDownX);
					sliderX = Math.min(_this.hoverBarRect.x + availableWidth, Math.max(_this.hoverBarRect.x, sliderX));
					_this.dragPercent = (sliderX - _this.hoverBarRect.x) / availableWidth;
				}
				_this.setCursor(Cursor.EW_RESIZE);
				_this.renderSlider();
			};
			_this.onDocumentMouseUp = () => {
				if (!_this.isDragging) return;
				var appliedPercent = _this.dragPercent;
				var draggingFieldId = _this.hoverFieldId;
				var draggingRecordId = _this.hoverRecordId;
				_this.cancelDraggingEvent();
				_this.applyBehavior(appliedPercent);
				_this.isDragging = false;
				if (draggingFieldId && draggingRecordId) {
					_this.collector.state.removeHiddenCell(draggingFieldId, draggingRecordId);
					_this.parentApi.renderMain();
				}
				_this.resetHover();
				_this.setCursor(Cursor.DEFAULT);
			};
			return _this;
		}
		var _proto = GridProgressSet.prototype;
		_proto.bootstrap = function bootstrap() {
			var { size } = this.collector;
			this.group = this._register(pen.group(Object.assign(Object.assign({}, size.globalRect), { y: size.activityStartY })));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.stage.onResize(() => {
				var { size } = this.collector;
				this.group.setAttrs(Object.assign(Object.assign({}, size.globalRect), { y: size.activityStartY }));
			}));
		};
		_proto.render = function render() {
			if (this.isDragging) return;
			this.renderSlider();
		};
		_proto.isHovering = function isHovering() {
			return this.isDragging || !!this.hoverBarRect;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return {
				default: {
					id: IGridProgressSet,
					isLock: () => this.isDragging
				},
				high: {
					id: IGridProgressSet,
					isLock: () => this.isHovering()
				}
			};
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGridProgressSet);
		};
		/**
		* 判断当前鼠标位置是否命中某个进度项的进度矩形
		*/ _proto.computeHit = function computeHit(evt) {
			var cellCtx = this.resolveProgressCellContext(evt.target);
			if (!cellCtx) return null;
			var { target, columnInfo, cellInfos } = cellCtx;
			for (var item of this.collectProgressItems(cellInfos, columnInfo)) if (isHitRect(evt.x, evt.y, item.displayRect)) return {
				target,
				itemHit: item
			};
			return null;
		};
		/**
		* 解析一个鼠标目标是否落在"可编辑的进度单元格"，并返回相关上下文
		*/ _proto.resolveProgressCellContext = function resolveProgressCellContext(target) {
			var columnInfo = this.getHitProgressColumn(target);
			if (!columnInfo) return null;
			var { recordId } = target.rowInfo;
			if (!this.canEditCell(columnInfo.id, recordId)) return null;
			var cellInfos = this.collector.contents.getCellInfo(columnInfo.id, recordId);
			if (!cellInfos || cellInfos.length === 0) return null;
			return {
				target,
				columnInfo,
				rowInfo: target.rowInfo,
				cellInfos
			};
		};
		_proto.getHitProgressColumn = function getHitProgressColumn(target) {
			var { columnInfo, rowInfo, isBlank } = target;
			if (!columnInfo || !columnInfo.isField || isBlank) return null;
			if (!rowInfo || rowInfo.type !== RowType.Record) return null;
			var field = this.collector.dataUtil.getFieldByFieldId(columnInfo.id);
			if (!field || field.getType() !== FieldType.PROGRESS) return null;
			return columnInfo;
		};
		/**
		* 从 cell 的 DrawConfig 列表中识别每个进度项：
		* 进度字段收集时，每个进度项先 push 一个全宽"外框矩形"（高度 = progressHeight），
		* 可能跟随一个"前景色"矩形，最后（若存在文字）push 一个 text。
		* 顺序扫描：遇到 progressHeight 的 rect 且与上一项 y 不同 → 新开一项；其间遇到的 text 归属到最近一项。
		*/ _proto.collectProgressItems = function collectProgressItems(cellInfos, columnInfo) {
			var { range, size } = this.collector;
			var deltaX = columnInfo.isFrozen ? 0 : range.scrollLeft;
			var deltaY = range.scrollTop;
			/**
			* 收集坐标 → 显示坐标(root)：x 减去 scrollLeft（冻结列不减），y 减去 scrollTop 再加上表头高度。
			* 这里保持与当前生效的 hit test / 滑块绘制约定一致（供 group 绘制与 isHitRect 使用）。
			*/ var toDisplayY = (y) => y - deltaY + size.activityStartY;
			var cellDisplayRightX = columnInfo.x - deltaX + columnInfo.width;
			var result = [];
			var currentBarY = NaN;
			for (var cfg of cellInfos) {
				if (cfg.type === DrawType.Rect) {
					var rect = cfg;
					if (rect.height !== style.size.progressHeight) continue;
					if (rect.y === currentBarY) continue;
					currentBarY = rect.y;
					var displayRect = {
						x: rect.x - deltaX,
						y: toDisplayY(rect.y),
						width: rect.width,
						height: rect.height
					};
					result.push({
						itemIndex: result.length,
						displayRect,
						textDrawConfig: void 0,
						textDisplayY: displayRect.y - 6,
						textDisplayLeftX: displayRect.x + displayRect.width,
						textDisplayRightX: cellDisplayRightX
					});
					continue;
				}
				if (cfg.type === DrawType.Text && result.length > 0) {
					var last = result[result.length - 1];
					if (!last.textDrawConfig) {
						last.textDrawConfig = cfg;
						last.textDisplayY = toDisplayY(cfg.y);
					}
				}
			}
			return result;
		};
		_proto.canEditCell = function canEditCell(fieldId, recordId) {
			return this.parentApi.getStatus().getPermissionStatus("canEditCell", {
				fieldId,
				recordId
			});
		};
		_proto.renderSlider = function renderSlider() {
			this.group.clear();
			if (!this.hoverBarRect) {
				this.hoverSliderRect = null;
				return;
			}
			var currentPercent = this.isDragging ? this.dragPercent : this.getCurrentPercent();
			if (this.isDragging && this.hoverItem) this.renderProgressBar(this.hoverItem, currentPercent);
			var sliderRect = this.buildSliderRect(this.hoverBarRect, currentPercent);
			this.hoverSliderRect = sliderRect;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, sliderRect), {
				background: style.color.normalBackground,
				borderColor: style.color.normalBorderColor,
				borderWidth: SLIDER_BORDER_WIDTH,
				borderRadius: SLIDER_BORDER_RADIUS
			})));
			if (this.isDragging && this.hoverItem && this.hasHoverCellValue()) this.renderTipText(currentPercent, this.hoverItem);
			if (!this.isDragging) this.showOutOfRangeTooltip(sliderRect);
		};
		/**
		* 拖拽中实时绘制进度矩形（底框 + 前景色），视觉参考 field-collector 中进度字段的收集规则：
		* - 底框：tspStrongBackground，整条 bar 宽度，圆角 PROGRESS_RADIUS
		* - 前景：按 percent 的宽度，左侧圆角；percent 接近 1 时退化为全圆角
		* - 颜色按 property.colorConfig 随百分比动态取色，与 ProgressField.getColorByProgress 一致
		*/ _proto.renderProgressBar = function renderProgressBar(hoverItem, percent) {
			var { property, minValue, maxValue } = this.getProgressRange();
			var rawValue = minValue + (maxValue - minValue) * Math.min(1, Math.max(0, percent));
			var color = ProgressField.getColorByProgress(rawValue, property.numberRange, property.colorConfig);
			var activePointBg = this.getActivePointBackground();
			if (activePointBg) this.group.add(pen.config.rect(Object.assign(Object.assign({}, hoverItem.displayRect), { background: activePointBg })));
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, hoverItem.displayRect), {
				background: style.color.tspStrongBackground,
				borderRadius: PROGRESS_RADIUS
			})));
			var clamped = Math.min(1, Math.max(0, percent));
			if (clamped <= 0) return;
			var fgWidth = Math.ceil(hoverItem.displayRect.width * clamped);
			var isFull = clamped >= 1 || fgWidth >= hoverItem.displayRect.width;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, hoverItem.displayRect), {
				width: fgWidth,
				background: color,
				borderRadius: isFull ? PROGRESS_RADIUS : [
					PROGRESS_RADIUS,
					0,
					0,
					PROGRESS_RADIUS
				]
			})));
		};
		/**
		* 根据进度外框矩形和百分比计算滑块位置（显示坐标）
		* 滑块的 x 限制在外框矩形内：[barRect.x, barRect.x + barRect.width - SLIDER_WIDTH]
		*/ _proto.buildSliderRect = function buildSliderRect(barRect, percent) {
			var clamped = Math.min(1, Math.max(0, percent));
			var availableWidth = Math.max(0, barRect.width - SLIDER_WIDTH);
			return {
				x: barRect.x + availableWidth * clamped,
				y: barRect.y + (barRect.height - SLIDER_HEIGHT) / 2,
				width: SLIDER_WIDTH,
				height: SLIDER_HEIGHT
			};
		};
		/**
		* 获取 hover 的进度项当前 value 对应的百分比 [0, 1]
		*/ _proto.getCurrentPercent = function getCurrentPercent() {
			var standardCell = this.collector.dataUtil.getStandardCell(this.hoverFieldId, this.hoverRecordId);
			if (!standardCell) return 0;
			var item = standardCell.data[this.hoverItemIndex];
			var { minValue, maxValue } = this.getProgressRange();
			if (!item || typeof item.number !== "number") return 0;
			var total = maxValue - minValue;
			if (total <= 0) return 0;
			return Math.min(1, Math.max(0, (item.number - minValue) / total));
		};
		/** 当前 hover 的进度单元格是否有值（cellData 非空） */ _proto.hasHoverCellValue = function hasHoverCellValue() {
			var standardCell = this.collector.dataUtil.getStandardCell(this.hoverFieldId, this.hoverRecordId);
			return !!standardCell && standardCell.data.length > 0;
		};
		/** 获取当前进度数据层的原始数值 */ _proto.getRawValue = function getRawValue() {
			var standardCell = this.collector.dataUtil.getStandardCell(this.hoverFieldId, this.hoverRecordId);
			if (!standardCell) return 0;
			var item = standardCell.data[this.hoverItemIndex];
			if (!item || typeof item.number !== "number") return 0;
			return item.number;
		};
		/** 当进度值超出 [0, 1] 范围时，在滑块上方显示 tooltip 提示 */ /** 当进度值超出 [0, 1] 范围时，在滑块上方绘制 canvas tooltip 提示 */ _proto.showOutOfRangeTooltip = function showOutOfRangeTooltip(sliderRect) {
			var rawValue = this.getRawValue();
			var tipText = "";
			if (rawValue < 0) tipText = i18n.t("当前数值小于进度条起始值");
			else if (rawValue > 1) tipText = i18n.t("当前数值大于进度条目标值");
			if (!tipText) return;
			if (this.tipOpacity < 1) {
				this.tipOpacity = Math.min(1, this.tipOpacity + .05);
				this.scheduleTipFade();
			}
			var fontSize = style.size.fontSizeSmall;
			var textWidth = pen.util.measureTextWidth(tipText, fontSize);
			var padding = 10;
			var tipWidth = textWidth + padding * 2;
			var tipHeight = fontSize + padding * 2;
			var gap = 4;
			var { size, widgetCollector } = this.collector;
			var stickyOccupy = widgetCollector.isGroupHeadStickyEnabled() ? widgetCollector.getStickyOccupyBottom() : 0;
			var topBoundary = size.activityStartY + stickyOccupy;
			var showBelow = sliderRect.y - topBoundary < tipHeight + gap;
			var tipX = sliderRect.x + sliderRect.width / 2 - tipWidth / 2;
			var tipY = showBelow ? sliderRect.y + sliderRect.height + gap : sliderRect.y - tipHeight - gap;
			var opacity = this.tipOpacity;
			this.group.add(pen.config.rect({
				x: tipX,
				y: tipY,
				width: tipWidth,
				height: tipHeight,
				background: style.color.normalBackground,
				borderRadius: 4,
				borderColor: style.color.normalBorderColor,
				borderWidth: 1,
				shadowBlur: 10,
				shadowColor: "rgba(0, 0, 0, 0.08)",
				opacity
			}));
			this.group.add(pen.config.text({
				x: tipX,
				y: tipY,
				width: tipWidth,
				height: tipHeight,
				text: tipText,
				fontSize,
				color: style.color.normalFontColor,
				verticalAlign: "middle",
				align: "center",
				lineHeight: 1,
				opacity
			}));
		};
		_proto.scheduleTipFade = function scheduleTipFade() {
			if (this.tipFadeTimer) return;
			this.tipFadeTimer = requestAnimationFrame(() => {
				this.tipFadeTimer = null;
				if (this.tipOpacity < 1 && this.hoverBarRect) this.renderSlider();
			});
		};
		/**
		* 在进度项的文本位置实时绘制百分比文案：
		* - y / fontSize / 字体等样式优先复用 cellInfos 中原生 text 的 DrawConfig，避免跳变
		* - 空态（原生没 text）回落到 field-collector 的默认规则：y = bar.y - 6，fontSize = 默认字号
		* - 宽度按实时文案宽度计算，右对齐到 cell 右边缘
		* 拖拽期间 bodyLayer 已经不绘制该 cell 的内容；但若该 cell 为 ActivePoint 激活态，
		* ActivePoint 层会绘制一个背景色，所以这里先按 getActivePointBackground 覆盖一次，再绘制文本。
		*/ _proto.renderTipText = function renderTipText(percent, hoverItem) {
			var tipText = this.formatPercentText(percent);
			var originText = hoverItem.textDrawConfig;
			var availableWidth = Math.max(0, hoverItem.textDisplayRightX - hoverItem.textDisplayLeftX);
			var textRect = {
				x: hoverItem.displayRect.x + hoverItem.displayRect.width,
				y: hoverItem.textDisplayY,
				width: availableWidth - style.size.cellPadding,
				height: Math.round(hoverItem.displayRect.height * 2)
			};
			var activePointBg = this.getActivePointBackground();
			if (activePointBg) this.group.add(pen.config.rect(Object.assign(Object.assign({}, textRect), { background: activePointBg })));
			var columnInfo = this.collector.columns.getInfoByFieldId(this.hoverFieldId);
			var scrollLeft = (columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.isFrozen) ? 0 : this.collector.range.scrollLeft;
			var originTextDisplayX = originText ? originText.x - scrollLeft : void 0;
			this.group.add(pen.config.text(Object.assign(Object.assign(Object.assign({}, textRect), originText), {
				x: originTextDisplayX !== null && originTextDisplayX !== void 0 ? originTextDisplayX : textRect.x,
				y: textRect.y,
				width: (originText === null || originText === void 0 ? void 0 : originText.width) || textRect.width,
				height: textRect.height,
				text: tipText,
				layouts: void 0,
				clipArea: void 0
			})));
		};
		/**
		* 当前交互的 cell 如果正好是 ActivePoint 激活态，ActivePoint 层会绘制一层背景色，
		* 此时拖拽绘制前需要先覆盖一次背景，避免透出 ActivePoint 背景。
		* 返回 undefined 表示当前不是 ActivePoint，无需覆盖。
		*/ _proto.getActivePointBackground = function getActivePointBackground() {
			var activePoint = this.rangeModel.getCurrentSelection().getActivePoint();
			if (!activePoint) return void 0;
			var { dataUtil } = this.collector;
			var rowIndex = dataUtil.getRecordIndexFromVisibleRecordIds(this.hoverRecordId);
			var columnIndex = dataUtil.getVisibleFieldIds().indexOf(this.hoverFieldId);
			if (rowIndex < 0 || columnIndex < 0) return void 0;
			if (activePoint.row !== rowIndex || activePoint.column !== columnIndex) return void 0;
			return dataUtil.getCellFillColor(this.hoverRecordId, this.hoverFieldId) || dataUtil.getRowHeaderBackgroundColor(this.hoverRecordId) || style.color.normalBackground;
		};
		_proto.formatPercentText = function formatPercentText(percent) {
			var _a;
			var { minValue, maxValue, numberFormat, property } = this.getProgressRange();
			var cellValue = multiply(minValue + (maxValue - minValue) * Math.min(1, Math.max(0, percent)), 100);
			var formatted = (_a = ProgressField.getFormattedValueByCellValue(cellValue, property)) !== null && _a !== void 0 ? _a : "";
			return numberFormat === NumberFormat.Number ? formatted : `${formatted}%`;
		};
		_proto.getProgressRange = function getProgressRange() {
			var _a;
			var field = this.collector.dataUtil.getFieldByFieldId(this.hoverFieldId);
			var property = ((_a = field === null || field === void 0 ? void 0 : field.getProperty) === null || _a === void 0 ? void 0 : _a.call(field)) || ProgressField.getDefaultProperty();
			var [minValue, maxValue] = property.numberRange;
			return {
				minValue,
				maxValue,
				numberFormat: property.numberFormat,
				property
			};
		};
		_proto.listenDragReady = function listenDragReady() {
			var _a;
			(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
			this.mouseDownDisposable = this.UIEvent.stage.onMouseDown(this.onStageMouseDown);
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a;
			(_a = this.mouseDownDisposable) === null || _a === void 0 || _a.dispose();
			this.mouseDownDisposable = void 0;
		};
		_proto.registerDragging = function registerDragging() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseUp);
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
			this.escDisposable = registerEscToCancel(this.UIEvent, () => this.abortDragging());
		};
		_proto.cancelDraggingEvent = function cancelDraggingEvent() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
			this.mouseMoveDisposable = void 0;
			this.mouseUpDisposable = void 0;
			this.escDisposable = void 0;
		};
		/**
		* ESC 中断拖拽：清理拖拽事件监听、复位拖拽态，并恢复该单元格的正文渲染；
		* 与 {@link onDocumentMouseUp} 的差异在于**不调用 `applyBehavior`**，因此进度值保持拖拽前不变。
		*/ _proto.abortDragging = function abortDragging() {
			if (!this.isDragging) return;
			var draggingFieldId = this.hoverFieldId;
			var draggingRecordId = this.hoverRecordId;
			this.cancelDraggingEvent();
			this.isDragging = false;
			if (draggingFieldId && draggingRecordId) {
				this.collector.state.removeHiddenCell(draggingFieldId, draggingRecordId);
				this.parentApi.renderMain();
			}
			this.resetHover();
			this.setCursor(Cursor.DEFAULT);
		};
		/**
		* 应用拖拽结果：通过 behavior API 写入新进度值
		* 进度字段的 cellValue 是一个数值（百分比模式下是 0-100 区间的数值，value * MULTIPLE_NUMBER）
		*/ _proto.applyBehavior = function applyBehavior(percent) {
			if (this.hoverItemIndex !== 0) {
				logger.info("[xview][拖拽进度] 多值进度暂不支持修改非首项");
				return;
			}
			if (Math.abs(percent - this.dragStartPercent) < 1e-6) return;
			var table = this.collector.dataUtil.getCurrentTable();
			var view = this.collector.dataUtil.getCurrentView();
			if (!table || !view || !this.hoverFieldId || !this.hoverRecordId) return;
			if (this.context.customConfig) return;
			var { minValue, maxValue, numberFormat, property } = this.getProgressRange();
			var cellValue = roundProgressCellValue(multiply(minValue + (maxValue - minValue) * Math.min(1, Math.max(0, percent)), 100), numberFormat, property);
			var delta = {};
			delta[this.hoverFieldId] = { value: cellValue };
			logger.info(`[xview][拖拽进度] fieldId=${this.hoverFieldId}, recordId=${this.hoverRecordId}, percent=${percent}, cellValue=${cellValue}`);
			this.context.getBehaviorApi().setRecord({
				recordId: this.hoverRecordId,
				tableId: table.id,
				viewId: view.id,
				delta
			});
		};
		_proto.resetHover = function resetHover() {
			var hadHover = !!this.hoverBarRect;
			this.hoverFieldId = "";
			this.hoverRecordId = "";
			this.hoverItemIndex = -1;
			this.hoverBarRect = null;
			this.hoverItem = null;
			this.hoverSliderRect = null;
			this.tipOpacity = 0;
			if (this.tipFadeTimer) {
				cancelAnimationFrame(this.tipFadeTimer);
				this.tipFadeTimer = null;
			}
			this.cancelDragReady();
			if (hadHover) {
				requestAnimationFrame(() => {
					this.group.clear();
				});
				this.setCursor(Cursor.DEFAULT);
			}
		};
		return GridProgressSet;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/progress-set/index.js
var init_progress_set = __esmMin((() => {
	init_interface$3();
	init_main$3();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-active/interface.js
var IGridRecordActive;
var init_interface$2 = __esmMin((() => {
	init_module();
	IGridRecordActive = createDecorator("IGridRecordActive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-active/main.js
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
var GridRecordActive;
var init_main$2 = __esmMin((() => {
	init_pen();
	init_style();
	init_grid_feature();
	GridRecordActive = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$18(GridRecordActive, GridFeatureBase);
		function GridRecordActive() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.activePointRecordId = "";
			_this.recordDetailRecordId = "";
			_this.onResize = () => {
				_this.group.setAttrs(_this.collector.size.globalViewBodyRect);
			};
			_this.onActiveRecordChanged = (info) => {
				var recordId = (info === null || info === void 0 ? void 0 : info.recordId) || _this.activePointRecordId;
				if (_this.recordDetailRecordId === recordId) return;
				_this.recordDetailRecordId = recordId;
				var rowInfo = _this.collector.rows.getInfoByRecordId(recordId);
				if (rowInfo && _this.collector.rows.isHiddenRow(rowInfo.parent)) return;
				if (recordId) _this.action.expandRow(recordId, { isCheckUpdate: true });
				_this.parentApi.scrollToVisibility({ recordId });
				_this.renderActive();
			};
			_this.onActivePointChanged = ({ activePoint }) => {
				if (activePoint) _this.activePointRecordId = _this.collector.dataUtil.getDisplayedRecordIds()[activePoint.row];
				else _this.activePointRecordId = "";
				_this.renderActive();
			};
			return _this;
		}
		var _proto = GridRecordActive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalViewBodyRect));
			this.layer.addGroup(this.group);
			this._register(this.rangeModel.onActivePointChanged(this.onActivePointChanged));
			this._register(this.emitter.service.activedRecordChanged.event(this.onActiveRecordChanged));
			this._register(this.UIEvent.stage.onResize(this.onResize));
		};
		_proto.render = function render() {
			this.renderActive();
		};
		_proto.renderActive = function renderActive() {
			this.group.clear();
			if (this.parentApi.getFloatState().isShow() || this.isInVisible) return;
			var recordId = this.recordDetailRecordId || this.activePointRecordId;
			if (!recordId) return;
			var rowInfo = this.collector.rows.getInfoByRecordId(recordId);
			if (!rowInfo) return;
			var recordRect = this.collector.getInnerRect(rowInfo);
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, recordRect), {
				y: recordRect.y + this.collector.size.activityStartY,
				width: recordRect.width + this.getGanttWidth(this.parentApi) - this.collector.getAdditionFieldShowWidth(rowInfo),
				background: style.color.activedBackground
			})), 0, 0, this.collector.widgetCollector.getStickyFeatureClipRect());
		};
		return GridRecordActive;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-active/index.js
var init_record_active = __esmMin((() => {
	init_interface$2();
	init_main$2();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-move/interface.js
var IGridRecordMove;
var init_interface$1 = __esmMin((() => {
	init_module();
	IGridRecordMove = createDecorator("IGridRecordMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-move/main.js
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
/**
* 浅比较两个 recordId 列表是否等价（长度相同且对应位置严格相等）。
*
* 用于 wb 宿主下 `onRecordSelectChange` 的去重：拖选/框选中 rangeModel 会在
* 每一格 mousemove 都触发 `onSelectionChanged`，但快照往往未变（例如 shift 起点
* 到落点已覆盖的稳态帧），无需重复对外推送。
*
* `prev === undefined` 表示尚未 fire 过，视为不等价，让首帧一定 fire 出去。
*/ function isSameRecordIdList(prev, next) {
	if (!prev) return false;
	if (prev.length !== next.length) return false;
	for (var i = 0; i < prev.length; i++) if (prev[i] !== next[i]) return false;
	return true;
}
var GridRecordMove;
var init_main$1 = __esmMin((() => {
	init_es();
	init_pen();
	init_production();
	init_style();
	init_constants();
	init_interface$23();
	init_auto_scroll();
	init_grid_feature();
	init_area_interactive();
	init_interface$1();
	init_util();
	init_get_info_by_offset();
	init_is_same_group();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	GridRecordMove = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$17(GridRecordMove, GridFeatureBase);
		function GridRecordMove() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.mouseDownRecordId = "";
			_this.mouseDownOffsetY = 0;
			_this.mouseDownOffsetX = 0;
			_this.mouseMoveOffsetY = 0;
			_this.mouseMoveOffsetX = 0;
			_this.lineRowIndex = -1;
			_this.dropRowIndex = -1;
			_this.isReadyToSelect = false;
			_this.isReadyToDrag = false;
			_this.isInDragging = false;
			_this.dragRectY = 0;
			_this.dragRectHeight = 0;
			_this.isRowSelection = false;
			_this.onSelectionChanged = () => {
				var isRowSelection = _this.currentSelection.isRowSelection();
				if (!isRowSelection && _this.isRowSelection) _this.rowPatchAndRender();
				_this.isRowSelection = isRowSelection;
				_this.fireWbRecordSelectChange(isRowSelection);
			};
			_this.onStageMousedown = (evt) => {
				var _a;
				if (_this.isPreventFromOtherFeature()) return;
				var { event, target } = evt;
				var { rowInfo, columnInfo } = target;
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record) return;
				var { state } = _this.collector;
				var targetRecordId = rowInfo.recordId;
				var isRecordOperator = rowInfo && rowInfo.type === RowType.Record && (columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.id) === "Operator";
				var areaInteractive = _this.renderer.getFeature(IGridAreaInteractive);
				var isClickExpanIcon = areaInteractive === null || areaInteractive === void 0 ? void 0 : areaInteractive.isExpandElement(event.target);
				if (!isRecordOperator || !targetRecordId || isClickExpanIcon) return;
				_this.isReadyToDrag = state.isSelectRecord(targetRecordId);
				_this.mouseDownRecordId = targetRecordId;
				_this.isReadyToSelect = !_this.isReadyToDrag;
				_this.isInDragging = _this.isReadyToDrag && _this.canEditRecordInView;
				_this.mouseDownOffsetY = evt.y;
				_this.mouseDownOffsetX = evt.x;
				_this.clickRowInfo = rowInfo;
				_this.updateCursorStatus();
				_this.listenDragReady();
				(_a = _this.renderer.getFeature(IGridAutoScroll)) === null || _a === void 0 || _a.readyY();
			};
			_this.onWindowMousemove = (evt) => {
				var { columnInfo, rowInfo } = evt.target;
				if (rowInfo && rowInfo.type === RowType.Record && (columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.id) === "Operator") _this.updateCursorStatus();
				_this.mouseMoveOffsetY = evt.y;
				_this.mouseMoveOffsetX = evt.x;
				_this.hoverRowInfo = evt.target.rowInfo;
				if (_this.isInDragging) {
					_this.doMousemoveDragging();
					_this.updateCursorStatus();
					return;
				}
				var targetRecordId = rowInfo && "recordId" in rowInfo ? rowInfo.recordId : "";
				if (!targetRecordId) return;
				_this.isReadyToDrag = _this.collector.state.isSelectRecord(targetRecordId);
				var offsetX = Math.abs(evt.x - _this.mouseDownOffsetX);
				var offsetY = Math.abs(evt.y - _this.mouseDownOffsetY);
				if (_this.isReadyToSelect && (offsetX > 5 || offsetY > 5)) {
					_this.doMousemoveSelecting(targetRecordId);
					return;
				}
			};
			_this.onDocumentMouseup = (evt) => {
				if (_this.isInDragging && _this.dropRowIndex !== -1 && _this.canEditRecordInView) {
					_this.doneMoved();
					_this.clearAllStatus();
					return;
				}
				var targetRowInfo = evt.target.rowInfo;
				var targetRecordId = targetRowInfo && "recordId" in targetRowInfo ? targetRowInfo.recordId : "";
				if (evt.target.isBlank || !targetRecordId) {
					_this.clearAllStatus();
					return;
				}
				var { event } = evt;
				var { metaKey, shiftKey, ctrlKey } = event;
				var { state } = _this.collector;
				if (shiftKey) {
					_this.handleShiftSelecting(targetRecordId);
					productReport.grid.recordBatchSelected();
				} else if (_this.mouseDownRecordId === targetRecordId) {
					if (!metaKey && !ctrlKey) state.setAllSelect(false);
					if ((metaKey || ctrlKey) && state.isSelectRecord(targetRecordId)) state.removeSelectRecord(targetRecordId);
					else state.addSelectRecord(targetRecordId);
					_this.rowPatchAndRender();
					productReport.grid.recordSelected();
				}
				_this.clearAllStatus();
				if (state.isSelectRecord(targetRecordId) && _this.canEditRecordInView) _this.setCursor(Cursor.GRAB);
			};
			return _this;
		}
		var _proto = GridRecordMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
			this._register(this.rangeModel.onSelectionChanged(this.onSelectionChanged));
			this._register(this.UIEvent.stage.onResize(() => this.group.setAttrs(this.collector.size.globalRect)));
		};
		_proto.dispose = function dispose(trace) {
			GridFeatureBase.prototype.dispose.call(this, trace);
			this.cancelDragReady();
		};
		_proto.render = function render() {
			if (this.isInDragging && isHitRect(this.mouseMoveOffsetX, this.mouseMoveOffsetY, this.collector.size.globalViewRect)) {
				this.hoverRowInfo = getRowInfoByOffset(this.mouseMoveOffsetY, this.collector);
				this.doMousemoveDragging();
			}
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGridRecordMove,
				isLock: () => this.isDragging()
			} };
		};
		/**
		* wb 宿主下把当前行选区映射为 recordId 列表并对外 fire `onRecordSelectChange`。
		*
		* 触发口径：
		* - 行选区变化（内部范围增减、跨范围切换）→ 按最新快照 fire；
		* - 由行选区切到非行选区（列选/单元格选/清空）→ fire 空数组，语义为「行选被清空」；
		* - 非行选 → 非行选：不 fire（无语义）；
		* - 与上一次 fire 的快照浅比较等价时跳过，避免拖选中高频重复推送。
		*
		* 只在 wb 宿主启用；非 wb 场景零开销。
		*/ _proto.fireWbRecordSelectChange = function fireWbRecordSelectChange(isRowSelection) {
			if (!domainConfig.getIsWb()) return;
			if (!isRowSelection) {
				if (this.lastFiredSelectedIds && this.lastFiredSelectedIds.length > 0) {
					this.lastFiredSelectedIds = [];
					this.emitter.wbService.onRecordSelectChange.fire([]);
				}
				return;
			}
			var selectedIds = getSelectionRecordIds(this.rangeModel, this.collector);
			if (isSameRecordIdList(this.lastFiredSelectedIds, selectedIds)) return;
			this.lastFiredSelectedIds = selectedIds;
			this.emitter.wbService.onRecordSelectChange.fire(selectedIds);
		};
		_proto.listenDragReady = function listenDragReady() {
			this.cancelDragReady();
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseup);
			if (!this.context.isDashboardLite) this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMousemove);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => {
				if (this.isInDragging) this.clearAllStatus();
			});
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a, _b, _c;
			(_a = this.mouseUpDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseMoveDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
		};
		_proto.doMousemoveSelecting = function doMousemoveSelecting(targetRecordId) {
			if (isInSameGroup(this.mouseDownRecordId, targetRecordId, this.collector.dataUtil.getCurrentView())) this.setNewRowRange(this.mouseDownRecordId, targetRecordId);
		};
		_proto.doMousemoveDragging = function doMousemoveDragging() {
			this.group.clear();
			this.updateDragRect();
			this.updateDragLine();
		};
		_proto.updateDragLine = function updateDragLine() {
			var _a;
			if (!this.clickRowInfo) return;
			var beforeRecord = true;
			if (!this.hoverRowInfo) {
				this.dropRowIndex = -1;
				this.lineRowIndex = -1;
				if (this.mouseMoveOffsetY < this.collector.size.activityStartY && !this.collector.dataUtil.hasGroup()) {
					this.dropRowIndex = 0;
					this.lineRowIndex = 0;
				}
			} else {
				if (this.mouseMoveOffsetY > this.hoverRowInfo.y + ((_a = this.hoverRowInfo) === null || _a === void 0 ? void 0 : _a.height) / 2 - this.collector.range.scrollTop + this.collector.size.activityStartY) beforeRecord = false;
				var targetInfo = getDragLineYAndTarget(this.clickRowInfo, this.hoverRowInfo, beforeRecord, this.rangeModel, this.collector);
				this.dropRowIndex = targetInfo.dropRowIndex;
				this.lineRowIndex = targetInfo.lineRowIndex;
			}
			if (this.dropRowIndex !== -1) {
				var rowInfo = this.collector.rows.getInfo(this.lineRowIndex);
				if (rowInfo) {
					var y = rowInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop;
					this.group.add(pen.config.line({
						x: this.rectX,
						y: beforeRecord ? y : y + rowInfo.height,
						points: [
							0,
							0,
							this.rectWidth,
							0
						],
						borderColor: style.color.selectionBorderColor,
						borderWidth: style.size.borderWidth * 2
					}));
				}
			}
		};
		_proto.updateDragRect = function updateDragRect() {
			if (!this.dragRectY) {
				var dragRectInfo = getDragRectYAndHeight(this.clickRowInfo, this.rangeModel, this.collector);
				this.dragRectY = dragRectInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop;
				this.dragRectHeight = dragRectInfo.height;
			}
			this.group.add(pen.config.rect({
				x: this.rectX,
				y: this.dragRectY + this.mouseMoveDelta,
				width: this.rectWidth,
				height: this.dragRectHeight,
				background: style.color.dragShadowBackground,
				opacity: .5
			}));
		};
		_proto.clearSelectStatus = function clearSelectStatus() {
			this.isReadyToSelect = false;
		};
		_proto.clearDragStatus = function clearDragStatus() {
			this.isReadyToDrag = false;
			this.isInDragging = false;
			this.dragRectY = 0;
			this.dragRectHeight = 0;
		};
		_proto.clearOtherStatus = function clearOtherStatus() {
			this.mouseDownRecordId = "";
			this.mouseDownOffsetY = 0;
			this.mouseDownOffsetX = 0;
			this.mouseMoveOffsetX = 0;
			this.mouseMoveOffsetY = 0;
			this.lineRowIndex = -1;
			this.dropRowIndex = -1;
			this.clickRowInfo = void 0;
			this.hoverRowInfo = void 0;
		};
		_proto.clearAllStatus = function clearAllStatus() {
			this.group.clear();
			this.clearOtherStatus();
			this.clearSelectStatus();
			this.clearDragStatus();
		};
		_proto.setNewRowRange = function setNewRowRange(startRecordId, endRecordId) {
			var { state } = this.collector;
			state.setAllSelect(false);
			state.addSelectRecord(startRecordId, endRecordId);
			this.rowPatchAndRender();
		};
		_proto.updateCursorStatus = function updateCursorStatus() {
			if (this.isReadyToDrag && this.canEditRecordInView) {
				this.setCursor(this.mouseDownRecordId ? Cursor.GRABBING : Cursor.GRAB);
				return;
			}
			if (this.isInDragging && this.canEditRecordInView) {
				this.setCursor(Cursor.GRABBING);
				return;
			}
			if (this.isReadyToSelect) this.setCursor(Cursor.DEFAULT);
		};
		_proto.handleShiftSelecting = function handleShiftSelecting(targetRecordId) {
			if (!this.currentSelection.isRowSelection()) return;
			var rowRanges = this.currentSelection.getRanges();
			if (!rowRanges.length) return;
			var { startRow } = rowRanges[0];
			var startRecordId = this.collector.dataUtil.getDisplayedRecordIds()[startRow];
			if (isInSameGroup(startRecordId, targetRecordId, this.collector.dataUtil.getCurrentView())) {
				this.setNewRowRange(startRecordId, targetRecordId);
				return;
			}
		};
		_proto.doneMoved = function doneMoved() {
			if (this.collector.state.isSelectAll()) return;
			var targetRowIndo = this.collector.rows.getInfo(this.lineRowIndex);
			if (!targetRowIndo) return;
			if (this.context.customConfig) return;
			applyMovedRecordBehavior(this.dropRowIndex, targetRowIndo, this.context, this.rangeModel, this.collector);
			this.rowPatchAndRender();
			productReport.grid.recordMoveSuccess();
		};
		_proto.rowPatchAndRender = function rowPatchAndRender() {
			var _a;
			this.collector.rows.patch();
			this.parentApi.renderMain();
			if (this.collector.dataUtil.isGantt()) (_a = this.parentApi.getGanttTimeLine()) === null || _a === void 0 || _a.renderMain();
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGridRecordMove);
		};
		_create_class$3(GridRecordMove, [
			{
				key: "mouseMoveDelta",
				get: function() {
					return this.mouseMoveOffsetY - this.mouseDownOffsetY;
				}
			},
			{
				key: "rectX",
				get: function() {
					if (!this.clickRowInfo) return 0;
					return this.collector.getInnerRect(this.clickRowInfo).x;
				}
			},
			{
				key: "rectWidth",
				get: function() {
					if (!this.clickRowInfo) return 0;
					return this.collector.getInnerRect(this.clickRowInfo).width;
				}
			},
			{
				key: "canEditRecordInView",
				get: function() {
					return this.parentApi.getStatus().canEditRecordInView;
				}
			}
		]);
		return GridRecordMove;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/record-move/index.js
var init_record_move = __esmMin((() => {
	init_interface$1();
	init_main$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/selection-stat-trigger/copyright.js
/**
* 获取选区数量的显示文案
*/ function getSelectionCountLabel(selectionType) {
	switch (selectionType) {
		case SelectionType$1.ROWS: return i18n.t("已选择记录");
		case SelectionType$1.COLUMNS: return i18n.t("已选择字段");
		case SelectionType$1.RANGE: return i18n.t("已选择单元格");
		default: return "";
	}
}
var getStatOperatorsMap, getSelectionStatOperatorsMap;
var init_copyright = __esmMin((() => {
	init_es();
	init_es$1();
	getStatOperatorsMap = () => ({
		[StatType.NONE]: i18n.t("不展示"),
		[StatType.COUNT]: i18n.t("行数"),
		[StatType.EMPTY]: i18n.t("未填写"),
		[StatType.FILLED]: i18n.t("已填写"),
		[StatType.UNIQUE]: i18n.t("去重计数"),
		[StatType.EMPTY_PERCENT]: i18n.t("未填写占比"),
		[StatType.FILLED_PERCENT]: i18n.t("已填写占比"),
		[StatType.UNIQUE_PERCENT]: i18n.t("去重占比"),
		[StatType.UNCHECKED]: i18n.t("未勾选"),
		[StatType.CHECKED]: i18n.t("已勾选"),
		[StatType.UNCHECKED_PERCENT]: i18n.t("未勾选占比"),
		[StatType.CHECKED_PERCENT]: i18n.t("已勾选占比"),
		[StatType.LATEST]: i18n.t("最晚时间"),
		[StatType.EARLIEST]: i18n.t("最早时间"),
		[StatType.DAY_RANGE]: i18n.t("时间范围（日）"),
		[StatType.MONTH_RANGE]: i18n.t("时间范围（月）"),
		[StatType.SUM]: i18n.t("求和"),
		[StatType.AVERAGE]: i18n.t("平均值"),
		[StatType.MAX]: i18n.t("最大值"),
		[StatType.MIN]: i18n.t("最小值"),
		[StatType.GROUP_EARLIEST]: "",
		[StatType.GROUP_LATEST]: "",
		[StatType.IMAGE_COUNT]: i18n.t("图片数"),
		[StatType.FILE_COUNT]: i18n.t("文件数")
	});
	getSelectionStatOperatorsMap = () => Object.assign({}, getStatOperatorsMap(), {
		[StatType.FILLED]: i18n.t("计数"),
		[StatType.AVERAGE]: i18n.t("平均"),
		[StatType.SUM]: i18n.t("求和")
	});
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/selection-stat-trigger/interface.js
var IGridSelectionStatTrigger;
var init_interface = __esmMin((() => {
	init_module();
	IGridSelectionStatTrigger = createDecorator("IGridSelectionStatTrigger");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/selection-stat-trigger/index.js
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
/**
* 格式化统计数字的显示
*/ function formatStatNumber(value, isExp) {
	var _a, _b;
	var nonDigitBefore = ((_a = value.match(/^[^\d.]+/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
	var nonDigitAfter = ((_b = value.match(/[^\d.]+$/)) === null || _b === void 0 ? void 0 : _b[0]) || "";
	var [beforeDot, afterDot] = value.slice(nonDigitBefore.length, value.length - nonDigitAfter.length).split(".");
	var num = Number(value.replace(/,|%/g, ""));
	if (isNaN(num)) return value;
	if (Math.abs(num) >= 1e8 && !isExp) return `${nonDigitBefore}${beforeDot}${nonDigitAfter}`;
	var hasDecimal = beforeDot.length < 9 && afterDot;
	return `${nonDigitBefore}${beforeDot}${hasDecimal ? "." : ""}${hasDecimal ? isExp ? afterDot.slice(0, 9 - beforeDot.length) : afterDot.slice(0, Math.min(5, 9 - beforeDot.length)) : ""}${nonDigitAfter}`;
}
function processStatValue(value) {
	if (value === null || value === void 0) return "-";
	var strValue = String(value);
	var res = /e[+-]\d+$/i.exec(strValue);
	if (res) return formatStatNumber(strValue.slice(0, res.index), true) + res[0];
	return formatStatNumber(strValue, false);
}
/**
* 将 xtable-view 的 UnionSelectionModel 转换为 xtable-core 的 Selection 接口
*/ function createSelection(unionSelection, allFieldIds, allRecordIds) {
	var ranges = unionSelection.getRanges();
	var getSelectionType = () => {
		if (unionSelection.isEmptyRanges()) return SelectionType$1.EMPTY;
		if (unionSelection.isRowSelection()) return SelectionType$1.ROWS;
		if (unionSelection.isColumnSelection()) return SelectionType$1.COLUMNS;
		if (unionSelection.isRangeSelection()) return SelectionType$1.RANGE;
		return SelectionType$1.EMPTY;
	};
	var selectionType = getSelectionType();
	var getRangeInfo = () => {
		if (selectionType === SelectionType$1.EMPTY) return {
			type: SelectionType$1.EMPTY,
			rowRanges: [],
			columnRanges: []
		};
		if (selectionType === SelectionType$1.ROWS) {
			var rowRanges = ranges;
			return {
				type: SelectionType$1.ROWS,
				rowRanges: rowRanges.map((r) => ({
					startRow: r.startRow,
					endRow: r.endRow
				}))
			};
		}
		if (selectionType === SelectionType$1.COLUMNS) {
			var colRanges = ranges;
			return {
				type: SelectionType$1.COLUMNS,
				columnRanges: colRanges.map((r) => ({
					startColumn: r.startColumn,
					endColumn: r.endColumn
				}))
			};
		}
		var range = ranges;
		if (!range) return {
			type: SelectionType$1.RANGE,
			rowRanges: [],
			columnRanges: []
		};
		return {
			type: SelectionType$1.RANGE,
			rangeInfo: {
				startRow: range.startRow,
				endRow: range.endRow,
				startColumn: range.startColumn,
				endColumn: range.endColumn
			}
		};
	};
	var getFieldIds = () => {
		if (selectionType === SelectionType$1.EMPTY) return [];
		if (selectionType === SelectionType$1.ROWS) return [...allFieldIds];
		if (selectionType === SelectionType$1.COLUMNS) {
			var colRanges = ranges;
			var fieldIds = [];
			colRanges.forEach((r) => {
				for (var col = r.startColumn; col <= r.endColumn; col++) if (allFieldIds[col]) fieldIds.push(allFieldIds[col]);
			});
			return fieldIds;
		}
		var range = ranges;
		if (!range) return [];
		var fieldIds1 = [];
		for (var col = range.startColumn; col <= range.endColumn; col++) if (allFieldIds[col]) fieldIds1.push(allFieldIds[col]);
		return fieldIds1;
	};
	var getRecordIdsByField = (fieldId) => {
		if (selectionType === SelectionType$1.EMPTY) return [];
		if (selectionType === SelectionType$1.ROWS) {
			var rowRanges = ranges;
			var recordIds = [];
			rowRanges.forEach((r) => {
				for (var row = r.startRow; row <= r.endRow; row++) if (allRecordIds[row]) recordIds.push(allRecordIds[row]);
			});
			return recordIds;
		}
		if (selectionType === SelectionType$1.COLUMNS) {
			var colRanges = ranges;
			var isFieldSelected = false;
			for (var r of colRanges) {
				for (var col = r.startColumn; col <= r.endColumn; col++) if (allFieldIds[col] === fieldId) {
					isFieldSelected = true;
					break;
				}
				if (isFieldSelected) break;
			}
			return isFieldSelected ? [...allRecordIds] : [];
		}
		var range = ranges;
		if (!range) return [];
		var isFieldInRange = false;
		for (var col1 = range.startColumn; col1 <= range.endColumn; col1++) if (allFieldIds[col1] === fieldId) {
			isFieldInRange = true;
			break;
		}
		if (!isFieldInRange) return [];
		var recordIds1 = [];
		for (var row = range.startRow; row <= range.endRow; row++) if (allRecordIds[row]) recordIds1.push(allRecordIds[row]);
		return recordIds1;
	};
	return {
		isEmptyRanges: () => unionSelection.isEmptyRanges(),
		getRangeInfo,
		getFieldIds,
		getRecordIdsByField
	};
}
var GridSelectionStatTrigger;
var init_selection_stat_trigger = __esmMin((() => {
	init_es();
	init_es$1();
	init_grid_feature();
	init_copyright();
	init_interface();
	GridSelectionStatTrigger = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$16(GridSelectionStatTrigger, GridFeatureBase);
		function GridSelectionStatTrigger() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.onSelectionChanged = () => {
				var unionSelection = _this.rangeModel.getCurrentSelection();
				if (unionSelection.isEmptyRanges()) {
					_this.fireEmptyEvent();
					return;
				}
				_this.calculateAndFireStat(unionSelection);
			};
			return _this;
		}
		var _proto = GridSelectionStatTrigger.prototype;
		_proto.bootstrap = function bootstrap() {
			this._register(this.rangeModel.onSelectionChanged(this.onSelectionChanged));
		};
		_proto.render = function render() {};
		_proto.fireEmptyEvent = function fireEmptyEvent() {
			var emptyEvent = { statistics: {
				selectionInfo: {
					type: SelectionType$1.EMPTY,
					count: 0
				},
				availableStatTypes: [],
				mainStatResults: [],
				moreStatResults: void 0,
				isLoading: false
			} };
			this.emitter.service.selectionStat.fire(emptyEvent);
		};
		_proto.calculateAndFireStat = function calculateAndFireStat(unionSelection) {
			try {
				var selection = createSelection(unionSelection, this.collector.dataUtil.getVisibleFieldIds(), this.collector.dataUtil.getDisplayedRecordIds());
				var rangeInfo = selection.getRangeInfo();
				var selectionInfo = SelectionUtils.getSelectionInfo(rangeInfo);
				var fields = selection.getFieldIds().map((id) => this.collector.dataUtil.getFieldByFieldId(id)).filter(Boolean);
				var { mainStatTypes, moreStatTypes } = SelectionUtils.selectStatTypesByPriority(fields, selection);
				var mainStatResults = [];
				if (selectionInfo.type !== SelectionType$1.EMPTY && selectionInfo.count > 0) {
					var countLabel = getSelectionCountLabel(selectionInfo.type);
					if (countLabel) mainStatResults.push({
						statType: StatType.NONE,
						shortLabel: countLabel,
						fullLabel: countLabel,
						value: selectionInfo.count,
						isLoading: false
					});
				}
				var viewModel = this.context.getCurrentView();
				slicePush(mainStatResults, this.generateStatItems(mainStatTypes, selection, viewModel, "main"));
				var moreItems = this.generateStatItems(moreStatTypes, selection, viewModel, "more");
				var moreStatResults = moreItems.length > 0 ? moreItems : void 0;
				var allAvailableStatTypes = [...mainStatTypes, ...moreStatTypes];
				var eventData = { statistics: {
					selectionInfo: {
						type: selectionInfo.type,
						count: selectionInfo.count
					},
					availableStatTypes: allAvailableStatTypes,
					mainStatResults,
					moreStatResults,
					isLoading: false
				} };
				this.emitter.service.selectionStat.fire(eventData);
			} catch (e) {
				console.error("[GridSelectionStatTrigger] calculateAndFireStat error:", e);
			}
		};
		_proto.generateStatItems = function generateStatItems(statTypes, selection, viewModel, mode) {
			var _a;
			var results = [];
			var statOperatorsMap = getStatOperatorsMap();
			var selectionStatOperatorsMap = getSelectionStatOperatorsMap();
			for (var statType of statTypes) {
				var result = (_a = viewModel === null || viewModel === void 0 ? void 0 : viewModel.getSelectionStatResult) === null || _a === void 0 ? void 0 : _a.call(viewModel, selection, statType);
				if (!result) continue;
				var shortLabel = void 0;
				var fullLabel = void 0;
				if (mode === "main") {
					shortLabel = selectionStatOperatorsMap[statType] || statOperatorsMap[statType];
					fullLabel = statOperatorsMap[statType];
					if (statType === StatType.FILLED) fullLabel = i18n.t("已填写计数");
				} else {
					fullLabel = statOperatorsMap[statType];
					shortLabel = fullLabel;
					if (statType === StatType.FILLED) {
						fullLabel = i18n.t("已填写计数");
						shortLabel = statOperatorsMap[statType];
					}
				}
				results.push({
					statType,
					shortLabel,
					fullLabel,
					value: processStatValue(result.value),
					isLoading: false
				});
			}
			return results;
		};
		return GridSelectionStatTrigger;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/features/pc/entries.js
function getPcFeatures() {
	var all = [
		{
			ctor: GridAutoScroll,
			id: IGridAutoScroll,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridStorageSync,
			id: IGridStorageSync,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridAreaInteractive,
			id: IGridAreaInteractive,
			config: {
				auth: FeatureAuth.None,
				key: FeatureServiceConfigKey.AREA_INTERACTIVE
			}
		},
		{
			ctor: GridFrozenLine,
			id: IGridFrozenLine,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridRecordActive,
			id: IGridRecordActive,
			config: {
				auth: FeatureAuth.None,
				key: FeatureServiceConfigKey.RECORD_ACTIVE
			}
		},
		{
			ctor: GridSelection,
			id: IGridSelection,
			config: {
				auth: FeatureAuth.None,
				key: FeatureServiceConfigKey.SELECTION
			}
		},
		{
			ctor: GridScroller,
			id: IGridScroller,
			config: {
				auth: FeatureAuth.None,
				key: FeatureServiceConfigKey.SCROLLER
			}
		},
		{
			ctor: GridCollaborator,
			id: IGridCollaborator,
			config: { auth: FeatureAuth.Record }
		},
		{
			ctor: GridSearchCursor,
			id: IGridSearchCursor,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GridRecordFloat,
			id: IGridRecordFloat,
			config: { auth: FeatureAuth.Record }
		},
		{
			ctor: GridActivePoint,
			id: IGridActivePoint,
			config: {
				auth: FeatureAuth.None,
				key: FeatureServiceConfigKey.ACTIVE_POINT
			}
		},
		{
			ctor: GridFieldWidth,
			id: IGridFieldWidth,
			config: {
				auth: FeatureAuth.Field,
				key: FeatureServiceConfigKey.FIELD_WIDTH
			}
		},
		{
			ctor: GridFieldMove,
			id: IGridFieldMove,
			config: {
				auth: FeatureAuth.None,
				key: FeatureServiceConfigKey.FIELD_MOVE
			}
		},
		{
			ctor: GridSmartFill,
			id: IGridSmartFill,
			config: { auth: FeatureAuth.Record }
		},
		{
			ctor: GridGroupMove,
			id: IGridGroupMove,
			config: { auth: FeatureAuth.Record }
		},
		{
			ctor: GridRecordMove,
			id: IGridRecordMove,
			config: {
				auth: FeatureAuth.None,
				key: FeatureServiceConfigKey.RECORD_MOVE
			}
		},
		{
			ctor: GridFormulaLayer,
			id: IGridFormulaLayer,
			config: { auth: FeatureAuth.Field }
		},
		{
			ctor: GridFrozenLineDrag,
			id: IGridFrozenLineDrag,
			config: { auth: FeatureAuth.Field }
		},
		{
			ctor: AdaptiveColumnWidth,
			id: IAdaptiveColumnWidth,
			config: { auth: FeatureAuth.Field }
		},
		{
			ctor: GridProgressSet,
			id: IGridProgressSet,
			config: { auth: FeatureAuth.Record }
		},
		{
			ctor: GridSelectionStatTrigger,
			id: IGridSelectionStatTrigger,
			config: { auth: FeatureAuth.None }
		}
	];
	if (domainConfig.getIsWb()) return all.filter((opt) => !WB_DISABLED_FEATURE_IDS.has(opt.id.toLegacyString()));
	return all;
}
var WB_DISABLED_FEATURE_IDS;
var init_entries = __esmMin((() => {
	init_es();
	init_interface$21();
	init_auto_scroll();
	init_collaborator();
	init_frozen_line();
	init_scroller();
	init_search_cursor();
	init_selection();
	init_storage_sync();
	init_active_point();
	init_adaptive_col_width();
	init_index_interface();
	init_area_interactive();
	init_field_move();
	init_field_width();
	init_formula_layer();
	init_frozen_line_drag();
	init_group_move();
	init_progress_set();
	init_record_active();
	init_record_float();
	init_record_move();
	init_selection_stat_trigger();
	init_smart_fill();
	init_feature_single();
	WB_DISABLED_FEATURE_IDS = new Set([
		IGridFormulaLayer.toLegacyString(),
		IGridSelectionStatTrigger.toLegacyString(),
		IGridGroupMove.toLegacyString()
	]);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/event-handler/index.js
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
var import_main, GridEventHandler;
var init_event_handler = __esmMin((() => {
	import_main = require_main();
	init_feature_event();
	init_get_info_by_offset();
	init_is_in_rect();
	GridEventHandler = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$15(GridEventHandler, Disposable);
		function GridEventHandler(stage, root, rendererModel) {
			var _this = Disposable.call(this) || this;
			_this.stage = stage;
			_this.root = root;
			_this.rendererModel = rendererModel;
			_this.getTarget = (offset) => {
				var { x: offsetX, y: offsetY } = offset;
				var { globalRect, rootWidth, rootHeight } = _this.rendererModel.collector.size;
				var { isHideGrid } = _this.rendererModel.collector.state;
				var isOutsideStage = !isHideGrid && !isHitRect(offsetX, offsetY, globalRect);
				var useEdgeX = offsetX < 0 || offsetX > rootWidth;
				var useEdgeY = offsetY < 0 || offsetY > rootHeight;
				var columnInfo = useEdgeX ? _this.getEdgeColumnInfo(offsetX) : getColumnInfoByOffset(offsetX, _this.rendererModel.collector);
				var rowInfo = useEdgeY ? _this.getEdgeRowInfo(offsetY) : getRowInfoByOffset(offsetY, _this.rendererModel.collector);
				var isFieldGroupHeader = _this.isInFieldGroupHeader(offsetY, columnInfo);
				var target = {
					isBlank: isOutsideStage,
					isOutStage: isOutsideStage,
					columnInfo,
					rowInfo,
					isFieldGroupHeader,
					isColumnHeader: _this.isInColumnHeader(offsetY, columnInfo, isFieldGroupHeader)
				};
				if (!isHideGrid) _this.checkBlankValue(target, offsetX, offsetY);
				if (_this.rendererModel.collector.dataUtil.isGantt() && offsetX > rootWidth) {
					var timeLine = _this.rendererModel.getTimeLine();
					if (timeLine) target.timeInfo = timeLine.getTimeInfo(offsetX, target.rowInfo);
				}
				return target;
			};
			_this.UIEvent = _this._register(new FeatureUIEvent({
				root: _this.root,
				stage: _this.stage,
				getScale: () => _this.rendererModel.collector.size.scale,
				targetGetter: (offset) => _this.getTarget(offset)
			}));
			return _this;
		}
		var _proto = GridEventHandler.prototype;
		/**
		* 事件位置是否落在"列编组头"（表头上半行，且当前列属于某编组）
		* 与 area-interactive / field-width / field-move 的判定口径保持一致。
		*/ _proto.isInFieldGroupHeader = function isInFieldGroupHeader(offsetY, columnInfo) {
			if (!(columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.fieldGroupId)) return false;
			var { size, dataUtil } = this.rendererModel.collector;
			if (!dataUtil.hasVisibleFieldGroup()) return false;
			return offsetY >= size.globalPaddingTop && offsetY < size.globalPaddingTop + size.fieldGroupHeaderHeight;
		};
		/**
		* 事件位置是否落在"列头"上（表头区域，且命中具体某一列）
		* 口径与 jumper-view 保持一致：在 [globalPaddingTop, activityStartY) 之间，且不是 fieldGroupHeader。
		*/ _proto.isInColumnHeader = function isInColumnHeader(offsetY, columnInfo, isFieldGroupHeader) {
			if (!columnInfo || isFieldGroupHeader) return false;
			var { size } = this.rendererModel.collector;
			return offsetY >= size.globalPaddingTop && offsetY < size.activityStartY;
		};
		_proto.getEdgeColumnInfo = function getEdgeColumnInfo(offsetX) {
			if (this.rendererModel.collector.state.isHideGrid) return;
			var { start, end } = this.rendererModel.collector.range.getVisibleColumnRange();
			if (offsetX < this.rendererModel.collector.size.rootWidth / 2) return this.rendererModel.collector.columns.getInfos().get(start);
			return this.rendererModel.collector.columns.getInfos().get(end);
		};
		_proto.getEdgeRowInfo = function getEdgeRowInfo(offsetY) {
			var { start, end } = this.rendererModel.collector.range.getRowRange();
			if (offsetY < this.rendererModel.collector.size.rootHeight / 2) return this.rendererModel.collector.rows.getInfo(start);
			return this.rendererModel.collector.rows.getInfo(end);
		};
		_proto.checkBlankValue = function checkBlankValue(target, offsetX, offsetY) {
			var { size, range } = this.rendererModel.collector;
			if (!target.columnInfo && !target.rowInfo) {
				target.isBlank = true;
				return;
			}
			if (offsetX < size.globalPaddingLeft || offsetY < size.globalPaddingTop) {
				target.isBlank = true;
				return;
			}
			if (!target.columnInfo && target.rowInfo && offsetX > Math.min(size.rootWidth - size.globalPaddingRight, size.globalWidth)) {
				target.isBlank = true;
				return;
			}
			if (target.columnInfo && !target.rowInfo) {
				var lastRowInfo = this.rendererModel.collector.rows.getInfo(this.rendererModel.collector.rows.rowCount - 1);
				if (!lastRowInfo || offsetY > lastRowInfo.y + lastRowInfo.height + size.activityStartY - range.scrollTop) {
					target.isBlank = true;
					return;
				}
			}
		};
		return GridEventHandler;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/abstract.js
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
var BaseWidget;
var init_abstract = __esmMin((() => {
	init_interface$21();
	BaseWidget = /* @__PURE__ */ function() {
		"use strict";
		function BaseWidget(rendererModel) {
			this.rendererModel = rendererModel;
		}
		var _proto = BaseWidget.prototype;
		_proto.draw = function draw(area, columnInfo, rowInfo) {
			var container = this.getContainer(area, columnInfo);
			if (columnInfo.isFrozen && columnInfo.index === 0) {
				this.drawStart(container, columnInfo, rowInfo);
				var customConfig = this.rendererModel.collector.dataUtil.getCustomConfig();
				if (customConfig === null || customConfig === void 0 ? void 0 : customConfig.layoutConfig[LayoutConfigKey.HIDE_OPERATOR_FIELD]) this.drawBody(container, columnInfo, rowInfo);
				return;
			}
			if (columnInfo.index === this.collector.columns.getInfos().size - 1) {
				this.drawEnd(container, columnInfo, rowInfo);
				return;
			}
			this.drawBody(container, columnInfo, rowInfo);
		};
		_proto.getContainer = function getContainer(area, columnInfo) {
			return columnInfo.isFrozen ? area.frozen : area.activity;
		};
		_proto.getOffsetX = function getOffsetX(frozen) {
			return frozen ? 0 : -this.collector.range.scrollLeft;
		};
		_proto.getOffsetY = function getOffsetY() {
			return -this.collector.range.scrollTop;
		};
		_proto.drawOtherLevelContents = function drawOtherLevelContents(container, columnInfo, rowInfo) {
			var backgrounds = this.collector.profile.groupLevelBackgrounds.get(rowInfo.level);
			if (backgrounds) backgrounds.forEach((background, level) => {
				if (level !== rowInfo.level) {
					var { rectConfig, verticalLineConfig, horizonLineConfig } = this.collector.widgetCollector.otherLevelContentsCollector(rowInfo, background, level);
					container.add(rectConfig);
					container.add(verticalLineConfig);
					container.add(horizonLineConfig);
				}
			});
		};
		_create_class$2(BaseWidget, [{
			key: "collector",
			get: function() {
				return this.rendererModel.collector;
			}
		}]);
		return BaseWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/field.js
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
var FieldWidget;
var init_field = __esmMin((() => {
	init_abstract();
	FieldWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$14(FieldWidget, BaseWidget);
		function FieldWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = FieldWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo) {
			var { rectConfig, fieldIconConfig, verticalLineConfig, offsetX } = this.collector.widgetCollector.fieldWidgetDrawStartCollector(columnInfo);
			container.add(rectConfig);
			if (fieldIconConfig) container.add(fieldIconConfig, offsetX);
			if (verticalLineConfig) {
				var { verticalLineWidth, lineConfig } = verticalLineConfig;
				if (!verticalLineWidth) return;
				container.add(lineConfig, offsetX);
			}
		};
		_proto.drawBody = function drawBody(container, columnInfo) {
			var _a, _b;
			var { config, fieldIconConfig, verticalLineConfig, colHeaderFillColorRectConfig, offsetX } = this.collector.widgetCollector.fieldWidgetDrawBodyCollector(columnInfo);
			if (colHeaderFillColorRectConfig) container.add(colHeaderFillColorRectConfig, offsetX);
			if (fieldIconConfig) {
				container.add(fieldIconConfig, offsetX);
				var leftIconCornerIcon = ((_a = columnInfo.activeDrawConfig) === null || _a === void 0 ? void 0 : _a.leftIconCornerIcon) || ((_b = columnInfo.normalDrawConfig) === null || _b === void 0 ? void 0 : _b.leftIconCornerIcon);
				if (leftIconCornerIcon) container.add(leftIconCornerIcon, offsetX);
			}
			if (config) {
				var { text, markIcon, filterIcon, rightIcon, topText, aiLoadings } = config;
				if (text) container.add(text, offsetX);
				if (markIcon) container.add(markIcon, offsetX);
				if (aiLoadings) aiLoadings.forEach((item) => {
					container.add(item, offsetX);
				});
				if (filterIcon) container.add(filterIcon, offsetX);
				if (rightIcon) container.add(rightIcon, offsetX);
				if (topText) container.add(topText, offsetX);
			}
			if (verticalLineConfig) {
				var { verticalLineWidth, lineConfig } = verticalLineConfig;
				if (!verticalLineWidth) return;
				container.add(lineConfig, offsetX);
			}
		};
		_proto.drawEnd = function drawEnd(container, columnInfo) {
			var { fieldIconConfig, isDrawEndField, drawEndTextConfig, offsetX } = this.collector.widgetCollector.fieldWidgetDrawBodyCollector(columnInfo);
			if (isDrawEndField) {
				this.drawBody(container, columnInfo);
				return;
			}
			if (fieldIconConfig) container.add(fieldIconConfig, offsetX);
			if (drawEndTextConfig) container.add(drawEndTextConfig, offsetX);
		};
		return FieldWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/field-group-header.js
var FieldGroupHeaderWidget;
var init_field_group_header = __esmMin((() => {
	FieldGroupHeaderWidget = /* @__PURE__ */ function() {
		"use strict";
		function FieldGroupHeaderWidget(rendererModel) {
			this.rendererModel = rendererModel;
		}
		var _proto = FieldGroupHeaderWidget.prototype;
		/**
		* 绘制编组头。仅在 columnInfo 属于某个编组、且为该编组内第一个可见列时调用一次。
		* @param container 目标图层 Group（frozen 或 activity）
		* @param columnInfo 编组起始列的列信息（fieldGroupRect / fieldGroupName 已由 column.ts 填充）
		*/ _proto.draw = function draw(container, columnInfo) {
			var config = this.rendererModel.collector.widgetCollector.fieldGroupHeaderDrawCollector(columnInfo);
			if (!config) return;
			var { rectConfig, groupFillColorRectConfig, textConfig, bottomLineConfig, offsetX } = config;
			container.add(rectConfig, offsetX);
			if (groupFillColorRectConfig) container.add(groupFillColorRectConfig, offsetX);
			if (textConfig) container.add(textConfig, offsetX);
			container.add(bottomLineConfig, offsetX);
		};
		return FieldGroupHeaderWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/group-add.js
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
var GroupAddWidget;
var init_group_add = __esmMin((() => {
	init_abstract();
	GroupAddWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$13(GroupAddWidget, BaseWidget);
		function GroupAddWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = GroupAddWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var { rectConfig, iconConfig, offsetY } = this.collector.widgetCollector.groupAddWidgetDrawStartCollector(columnInfo, rowInfo);
			if (!rectConfig || !iconConfig) return;
			container.add(rectConfig, 0, offsetY);
			container.add(iconConfig, 0, offsetY);
		};
		_proto.drawBody = function drawBody(container, columnInfo, rowInfo) {
			var { textConfig, offsetY } = this.collector.widgetCollector.groupAddWidgetDrawBodyCollector(columnInfo, rowInfo);
			if (!textConfig) return;
			container.add(textConfig, 0, offsetY);
		};
		_proto.drawEnd = function drawEnd() {};
		return GroupAddWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/group-foot.js
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
var GroupFootWidget;
var init_group_foot = __esmMin((() => {
	init_abstract();
	GroupFootWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$12(GroupFootWidget, BaseWidget);
		function GroupFootWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = GroupFootWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var { rectConfig, bottomLeftCornerConfig, bottomCornerConfig } = this.collector.widgetCollector.groupFootWidgetDrawStartCollector(rowInfo);
			this.drawOtherLevelContents(container, columnInfo, rowInfo);
			if (!rectConfig) return;
			container.add(rectConfig);
			if (bottomLeftCornerConfig) container.add(bottomLeftCornerConfig);
			if (bottomCornerConfig) container.add(bottomCornerConfig);
		};
		_proto.drawBody = function drawBody() {};
		_proto.drawEnd = function drawEnd() {};
		return GroupFootWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/group-foot.m.js
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
var GroupFootWidgetMobile;
var init_group_foot_m = __esmMin((() => {
	init_group_foot();
	GroupFootWidgetMobile = /* @__PURE__ */ function(GroupFootWidget) {
		"use strict";
		_inherits$11(GroupFootWidgetMobile, GroupFootWidget);
		function GroupFootWidgetMobile() {
			return GroupFootWidget.apply(this, arguments) || this;
		}
		var _proto = GroupFootWidgetMobile.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var { rectConfig, lineConfig } = this.collector.widgetCollector.groupFootWidgetMobileDrawStartCollector(rowInfo);
			container.add(rectConfig);
			container.add(lineConfig);
		};
		return GroupFootWidgetMobile;
	}(GroupFootWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/group-head.js
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
var GroupHeadWidget;
var init_group_head = __esmMin((() => {
	init_abstract();
	GroupHeadWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$10(GroupHeadWidget, BaseWidget);
		function GroupHeadWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = GroupHeadWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			this.drawGroupLevelBackgrounds(container, columnInfo, rowInfo);
			this.drawFoldIcon(container, columnInfo, rowInfo);
		};
		_proto.drawBody = function drawBody(container, columnInfo, rowInfo) {
			var { globalStatInfoConfigs, groupValueInfoConfigs } = this.collector.widgetCollector.groupHeadWidgetStateInfoCollector(columnInfo, rowInfo);
			if (!globalStatInfoConfigs && !groupValueInfoConfigs) return;
			if (globalStatInfoConfigs) globalStatInfoConfigs.forEach(({ statInfo, offsetX, offsetY, clipArea }) => {
				container.add(statInfo, offsetX, offsetY, clipArea);
			});
			if (groupValueInfoConfigs) groupValueInfoConfigs.forEach(({ config, offsetX, offsetY, clipArea }) => container.add(config, offsetX, offsetY, clipArea));
		};
		_proto.drawEnd = function drawEnd(container, columnInfo, rowInfo) {
			if (this.collector.dataUtil.isGantt() && this.collector.columns.getInfos().size === 2) this.drawBody(container, columnInfo, rowInfo);
		};
		_proto.drawFoldIcon = function drawFoldIcon(container, columnInfo, rowInfo) {
			var { iconConfig, offsetY, clipArea } = this.collector.widgetCollector.groupHeadWidgetDrawFoldIconCollector(columnInfo, rowInfo);
			iconConfig && container.add(iconConfig, 0, offsetY, clipArea);
		};
		_proto.drawGroupLevelBackgrounds = function drawGroupLevelBackgrounds(container, columnInfo, rowInfo) {
			var configs = this.collector.widgetCollector.groupHeadWidgetDrawBackgroundsCollector(rowInfo);
			if (!configs.length) return;
			configs.forEach((config) => {
				var { rectConfig, cornerConfig, startLineConfig, endLineConfig, clipArea } = config;
				if (rectConfig) container.add(rectConfig, 0, 0, clipArea);
				if (cornerConfig) container.add(cornerConfig, 0, 0, clipArea);
				if (startLineConfig) container.add(startLineConfig, 0, 0, clipArea);
				if (endLineConfig) container.add(endLineConfig, 0, 0, clipArea);
			});
		};
		return GroupHeadWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/group-head.m.js
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
var GroupHeadWidgetMobile;
var init_group_head_m = __esmMin((() => {
	init_group_head();
	GroupHeadWidgetMobile = /* @__PURE__ */ function(GroupHeadWidget) {
		"use strict";
		_inherits$9(GroupHeadWidgetMobile, GroupHeadWidget);
		function GroupHeadWidgetMobile() {
			return GroupHeadWidget.apply(this, arguments) || this;
		}
		var _proto = GroupHeadWidgetMobile.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var { rectConfig, lineConfig, clipArea } = this.collector.widgetCollector.groupHeadWidgetMobileDrawStartCollector(rowInfo);
			if (!rectConfig) return;
			container.add(rectConfig, 0, 0, clipArea);
			if (lineConfig) container.add(lineConfig, 0, 0, clipArea);
			this.drawFoldIcon(container, columnInfo, rowInfo);
			var { drawConfigs, countTextConfig, offsetY } = this.collector.widgetCollector.groupHeadWidgetMobileGroupValueCollector(columnInfo, rowInfo);
			for (var drawConfig of drawConfigs) {
				if (!drawConfig) continue;
				var { groupValueConfigs, arrowConfig } = drawConfig;
				if (groupValueConfigs === null || groupValueConfigs === void 0 ? void 0 : groupValueConfigs.length) {
					for (var groupValueConfig of groupValueConfigs) {
						if (!groupValueConfig) continue;
						var { config, clipArea: valueClipArea } = groupValueConfig;
						container.add(config, 0, offsetY, valueClipArea);
					}
					if (arrowConfig) container.add(arrowConfig, 0, 0, clipArea);
				}
			}
			if (countTextConfig) container.add(countTextConfig, 0, offsetY, clipArea);
		};
		_proto.drawBody = function drawBody() {};
		_proto.drawEnd = function drawEnd() {};
		return GroupHeadWidgetMobile;
	}(GroupHeadWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/group-stat.js
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
var GroupStatWidget;
var init_group_stat = __esmMin((() => {
	init_abstract();
	GroupStatWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$8(GroupStatWidget, BaseWidget);
		function GroupStatWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = GroupStatWidget.prototype;
		_proto.drawStart = function drawStart(container, _columnInfo, rowInfo) {
			var { rectConfig, labelTextConfig, labelRightLineConfig } = this.collector.widgetCollector.groupStatWidgetDrawStartCollector(rowInfo);
			container.add(rectConfig);
			container.add(labelTextConfig);
			container.add(labelRightLineConfig);
		};
		_proto.drawBody = function drawBody(container, columnInfo, rowInfo) {
			var { statInfoConfigs, verticalLineConfigs } = this.collector.widgetCollector.groupStatWidgetDrawBodyCollector(columnInfo, rowInfo);
			if (!statInfoConfigs) return;
			statInfoConfigs.forEach(({ statInfo, offsetX, offsetY }) => {
				container.add(statInfo, offsetX, offsetY);
			});
			if (verticalLineConfigs) {
				var { leftLineConfig, rightLineConfig, offsetX } = verticalLineConfigs;
				container.add(leftLineConfig, offsetX);
				container.add(rightLineConfig, offsetX);
			}
		};
		_proto.drawEnd = function drawEnd() {};
		return GroupStatWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/record.js
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
var RecordWidget;
var init_record = __esmMin((() => {
	init_abstract();
	RecordWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$7(RecordWidget, BaseWidget);
		function RecordWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = RecordWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			this.drawOtherLevelContents(container, columnInfo, rowInfo);
			var { rectConfig, rowFillColorRectConfig, backgroundRectConfig, liteSelectedIconConfig, recordIndexConfig, bottomCornerConfig, bottomLineConfig, startLineConfig, endLineConfig, rightCloseLineConfig } = this.collector.widgetCollector.recordWidgetDrawStartCollector(columnInfo, rowInfo);
			container.add(rectConfig);
			if (rowFillColorRectConfig) container.add(rowFillColorRectConfig);
			if (backgroundRectConfig) container.add(backgroundRectConfig);
			if (liteSelectedIconConfig) {
				var { iconConfig, offsetY } = liteSelectedIconConfig;
				container.add(iconConfig, 0, offsetY);
			}
			if (recordIndexConfig) {
				var { textConfig, offsetY: offsetY1 } = recordIndexConfig;
				container.add(textConfig, 0, offsetY1);
			}
			if (bottomCornerConfig) container.add(bottomCornerConfig);
			if (bottomLineConfig) container.add(bottomLineConfig);
			if (startLineConfig) container.add(startLineConfig);
			if (rightCloseLineConfig) container.add(rightCloseLineConfig);
			if (endLineConfig) container.add(endLineConfig);
		};
		_proto.drawBody = function drawBody(container, columnInfo, rowInfo) {
			var configs = this.collector.widgetCollector.recordWidgetDrawBodyCollector(columnInfo, rowInfo);
			if (!configs) return;
			var { cellFillColorRectConfig, cellRectConfig, cellInfoConfigs, mobileEmptyContentLineConfig, mobileContentLineConfig, offsetX, offsetY } = configs;
			if (cellFillColorRectConfig) container.add(cellFillColorRectConfig, offsetX, offsetY);
			if (cellRectConfig) container.add(cellRectConfig, offsetX, offsetY);
			if (cellInfoConfigs) for (var { info, offsetX: offsetX1, offsetY: offsetY1, clipArea } of cellInfoConfigs) container.add(info, offsetX1, offsetY1, clipArea);
			if (mobileEmptyContentLineConfig) container.add(mobileEmptyContentLineConfig);
			if (mobileContentLineConfig) container.add(mobileContentLineConfig, offsetX, offsetY);
		};
		_proto.drawEnd = function drawEnd(container, columnInfo, rowInfo) {
			if (columnInfo.isField) {
				this.drawBody(container, columnInfo, rowInfo);
				return;
			}
		};
		return RecordWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/record.m.js
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
var RecordWidgetMobile;
var init_record_m = __esmMin((() => {
	init_record();
	RecordWidgetMobile = /* @__PURE__ */ function(RecordWidget) {
		"use strict";
		_inherits$6(RecordWidgetMobile, RecordWidget);
		function RecordWidgetMobile() {
			return RecordWidget.apply(this, arguments) || this;
		}
		var _proto = RecordWidgetMobile.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var { rectConfig, defaultRectConfig, singleInGroupConfig, groupFooterConfig, statRectConfig, groupHeadConfig, recordRectConfig } = this.collector.widgetCollector.recordWidgetMobileDrawStartCollector(rowInfo);
			if (rectConfig) {
				container.add(rectConfig);
				return;
			}
			if (defaultRectConfig) container.add(defaultRectConfig);
			if (singleInGroupConfig) {
				container.add(singleInGroupConfig);
				return;
			}
			if (groupFooterConfig) {
				var { rectConfig: rectConfig1, cornerConfig, lineConfig } = groupFooterConfig;
				container.add(rectConfig1);
				container.add(cornerConfig);
				if (lineConfig) container.add(lineConfig);
				return;
			}
			if (statRectConfig) {
				container.add(statRectConfig);
				return;
			}
			if (groupHeadConfig) {
				var { groupHeadRectConfig, groupHeadCornerConfig } = groupHeadConfig;
				container.add(groupHeadRectConfig);
				container.add(groupHeadCornerConfig);
				return;
			}
			if (recordRectConfig) {
				container.add(recordRectConfig);
				return;
			}
		};
		return RecordWidgetMobile;
	}(RecordWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/record-add.js
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
var RecordAddWidget;
var init_record_add = __esmMin((() => {
	init_abstract();
	RecordAddWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$5(RecordAddWidget, BaseWidget);
		function RecordAddWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = RecordAddWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			this.drawOtherLevelContents(container, columnInfo, rowInfo);
			var { rectConfig, lineConfig, cornerConfig, iconConfig } = this.collector.widgetCollector.recordAddWidgetDrawStartCollector(columnInfo, rowInfo);
			container.add(rectConfig);
			if (lineConfig) container.add(lineConfig);
			container.add(cornerConfig);
			container.add(iconConfig);
		};
		_proto.drawBody = function drawBody(container, columnInfo, rowInfo) {
			var { statInfoConfigs, verticalLineConfigs } = this.collector.widgetCollector.recordAddWidgetDrawBodyCollector(columnInfo, rowInfo);
			if (!statInfoConfigs) return;
			statInfoConfigs.forEach(({ statInfo, offsetX, offsetY }) => {
				container.add(statInfo, offsetX, offsetY);
			});
			if (verticalLineConfigs) {
				var { leftLineConfig, rightLineConfig, offsetX } = verticalLineConfigs;
				container.add(leftLineConfig, offsetX);
				container.add(rightLineConfig, offsetX);
			}
		};
		_proto.drawEnd = function drawEnd() {};
		return RecordAddWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/spacing.js
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
var SpacingWidget;
var init_spacing = __esmMin((() => {
	init_abstract();
	SpacingWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$4(SpacingWidget, BaseWidget);
		function SpacingWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = SpacingWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var configs = this.collector.widgetCollector.spacingWidgetDrawStartCollector(rowInfo);
			if (!configs.length) return;
			for (var config of configs) {
				var { rectConfig, startLineConfig, endLineConfig } = config;
				container.add(rectConfig);
				container.add(startLineConfig);
				container.add(endLineConfig);
			}
		};
		_proto.drawBody = function drawBody() {};
		_proto.drawEnd = function drawEnd() {};
		return SpacingWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/stat.js
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
var StatWidget;
var init_stat = __esmMin((() => {
	init_esm$1();
	init_abstract();
	StatWidget = /* @__PURE__ */ function(BaseWidget) {
		"use strict";
		_inherits$3(StatWidget, BaseWidget);
		function StatWidget() {
			return BaseWidget.apply(this, arguments) || this;
		}
		var _proto = StatWidget.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var rectConfig = this.collector.widgetCollector.statWidgetDrawStartCollector(rowInfo);
			if (rectConfig) rectConfig.forEach((config) => {
				container.add(config);
			});
		};
		_proto.drawBody = function drawBody(container, columnInfo, rowInfo) {
			var { rectConfig, statInfoConfigs, lineConfigs } = this.collector.widgetCollector.statWidgetDrawBodyCollector(columnInfo, rowInfo);
			if (rectConfig) container.add(rectConfig);
			if (statInfoConfigs) statInfoConfigs.forEach((statInfoConfig) => {
				var { statInfo, offsetX, offsetY } = statInfoConfig;
				container.add(statInfo, offsetX, offsetY);
			});
			if (ua.isMobile && lineConfigs) {
				var { lineConfig, offsetX, offsetY } = lineConfigs;
				container.add(lineConfig, offsetX, offsetY);
			}
		};
		_proto.drawEnd = function drawEnd() {};
		return StatWidget;
	}(BaseWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/widgets/stat.m.js
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
var StatWidgetMobile;
var init_stat_m = __esmMin((() => {
	init_stat();
	StatWidgetMobile = /* @__PURE__ */ function(StatWidget) {
		"use strict";
		_inherits$2(StatWidgetMobile, StatWidget);
		function StatWidgetMobile() {
			return StatWidget.apply(this, arguments) || this;
		}
		var _proto = StatWidgetMobile.prototype;
		_proto.drawStart = function drawStart(container, columnInfo, rowInfo) {
			var { rectConfig, groupRectConfig, cornerConfig, lineConfig } = this.collector.widgetCollector.statWidgetMobileDrawStartCollector(columnInfo, rowInfo);
			container.add(rectConfig);
			if (groupRectConfig) container.add(groupRectConfig);
			if (cornerConfig) container.add(cornerConfig);
			if (lineConfig) container.add(lineConfig);
		};
		return StatWidgetMobile;
	}(StatWidget);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/main/index.js
var MainRenderer;
var init_main = __esmMin((() => {
	init_esm$1();
	init_pen();
	init_style();
	init_interface$23();
	init_field();
	init_field_group_header();
	init_group_add();
	init_group_foot();
	init_group_foot_m();
	init_group_head();
	init_group_head_m();
	init_group_stat();
	init_record();
	init_record_m();
	init_record_add();
	init_spacing();
	init_stat();
	init_stat_m();
	MainRenderer = /* @__PURE__ */ function() {
		"use strict";
		function MainRenderer(rendererModel) {
			this.rendererModel = rendererModel;
			this.renderHead = (headArea, columnIndex) => {
				var columnInfo = this.collector.columns.getInfos().get(columnIndex);
				if (columnInfo) this.fieldWidget.draw(headArea, columnInfo);
			};
			this.renderBody = (bodyArea, columnIndex, rowIndex) => {
				var columnInfo = this.collector.columns.getInfos().get(columnIndex);
				var rowInfo = this.collector.rows.getInfo(rowIndex);
				if (!columnInfo || !rowInfo || rowInfo.height === 0) return;
				if (this.collector.widgetCollector.isPinnedRowInfo(rowInfo)) return;
				if (this.collector.widgetCollector.isGroupHeadInStickyMode(rowInfo)) return;
				var widget = this.getWidget(rowInfo.type);
				if (widget) widget.draw(bodyArea, columnInfo, rowInfo);
				if (rowInfo.type === RowType.Record) this.collector.range.addVisibleRecordId(rowInfo.recordId);
			};
			this.collector = rendererModel.collector;
			this.groupFootWidget = new (ua.isMobile ? GroupFootWidgetMobile : GroupFootWidget)(rendererModel);
			this.groupHeadWidget = new (ua.isMobile ? GroupHeadWidgetMobile : GroupHeadWidget)(rendererModel);
			this.recordWidget = new (ua.isMobile ? RecordWidgetMobile : RecordWidget)(rendererModel);
			this.statWidget = new (ua.isMobile ? StatWidgetMobile : StatWidget)(rendererModel);
			this.fieldWidget = new FieldWidget(rendererModel);
			this.fieldGroupHeaderWidget = new FieldGroupHeaderWidget(rendererModel);
			this.recordAddWidget = new RecordAddWidget(rendererModel);
			this.groupAddWidget = new GroupAddWidget(rendererModel);
			this.spacingWidget = new SpacingWidget(rendererModel);
			this.groupStatWidget = new GroupStatWidget(rendererModel);
		}
		var _proto = MainRenderer.prototype;
		_proto.render = function render(headArea, bodyArea, bodyFixedArea, bodyStickyArea) {
			this.collector.range.clearVisibleRecordIds();
			this.collector.range.doRange(this.renderBody.bind(this, bodyArea), this.renderHead.bind(this, headArea));
			this.renderFieldGroupHeaders(headArea);
			this.renderPinnedRows(bodyFixedArea);
			this.renderStickyGroupHeads(bodyStickyArea);
		};
		/**
		* 渲染所有在当前可视区域内的编组头。每个编组只渲染一次（由起始列触发）。
		*/ _proto.renderFieldGroupHeaders = function renderFieldGroupHeaders(headArea) {
			if (!this.collector.dataUtil.hasVisibleFieldGroup()) return;
			var drawnGroupIds = /* @__PURE__ */ new Set();
			var drawOne = (columnIndex) => {
				var columnInfo = this.collector.columns.getInfos().get(columnIndex);
				if (!(columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.fieldGroupId) || !columnInfo.fieldGroupRect) return;
				if (drawnGroupIds.has(columnInfo.fieldGroupId)) return;
				drawnGroupIds.add(columnInfo.fieldGroupId);
				var container = columnInfo.isFrozen ? headArea.frozen : headArea.activity;
				this.fieldGroupHeaderWidget.draw(container, columnInfo);
			};
			this.collector.range.doColumnRange((columnIndex) => {
				drawOne(columnIndex);
			});
		};
		/**
		* 渲染所有吸附到底部的行（由 widgetCollector.isPinnedRowInfo 决定，目前是 GroupStat 和吸附模式下的 RecordAdd）。
		* 这些行统一绘制到 bodyFixedArea，由 widget 内部决定最终的 y 位置（跟随 / 吸附）。
		*/ _proto.renderPinnedRows = function renderPinnedRows(bodyFixedArea) {
			var { rows, widgetCollector, size } = this.collector;
			rows.forEachRowInfo((rowInfo) => {
				if (!widgetCollector.isPinnedRowInfo(rowInfo)) return;
				var widget = this.getWidget(rowInfo.type);
				if (!widget) return;
				this.collector.range.doColumnRange((columnIndex) => {
					var columnInfo = this.collector.columns.getInfos().get(columnIndex);
					if (columnInfo) widget.draw(bodyFixedArea, columnInfo, rowInfo);
				});
			});
			var pinnedTopY = widgetCollector.getPinnedOccupyTopY();
			if (Number.isFinite(pinnedTopY) && size.globalPaddingBottom > 0) {
				var coverY = size.rootHeight - size.activityStartY - size.globalPaddingBottom;
				var coverRect = pen.config.rect({
					x: 0,
					y: coverY - style.size.borderRadius / 2,
					width: size.rootWidth,
					height: size.globalPaddingBottom + style.size.borderRadius / 2,
					background: style.color.defaultCanvasBackground
				});
				bodyFixedArea.frozen.add(coverRect);
			}
		};
		/**
		* 渲染所有处于 sticky top 状态的 GroupHead（由 widgetCollector.isGroupHeadInStickyMode 决定）。
		* 对每个 sticky GroupHead：
		*   1. 调用 widgetCollector.computeGroupHeadSticky 计算 effectiveScrollTop 及重叠 clipArea
		*   2. setStickyContext 设置上下文，使 GroupHead 相关 collector 输出按 finalY 对齐
		*   3. 按列绘制到 bodyStickyArea（和 bodyFixedArea 类似）
		*   4. clearStickyContext 清理现场
		*
		* 层叠规则：外层 sticky 占用底部作为内层的 stickyTop。内层与外层重叠时用 clipArea 裁剪内层重叠部分，
		* 确保外层内容始终在上层不被内层覆盖。
		*/ _proto.renderStickyGroupHeads = function renderStickyGroupHeads(bodyStickyArea) {
			var { rows, widgetCollector } = this.collector;
			if (!widgetCollector.isGroupHeadStickyEnabled()) return;
			rows.forEachRowInfo((rowInfo) => {
				if (rowInfo.type !== RowType.GroupHead) return;
				var stickyInfo = widgetCollector.computeGroupHeadSticky(rowInfo);
				if (!stickyInfo.isSticking) return;
				widgetCollector.setStickyContext({
					effectiveScrollTop: stickyInfo.effectiveScrollTop,
					clipArea: stickyInfo.clipArea
				});
				try {
					this.collector.range.doColumnRange((columnIndex) => {
						var columnInfo = this.collector.columns.getInfos().get(columnIndex);
						if (columnInfo) this.groupHeadWidget.draw(bodyStickyArea, columnInfo, rowInfo);
					});
				} finally {
					widgetCollector.clearStickyContext();
				}
			});
		};
		_proto.getWidget = function getWidget(rowType) {
			switch (rowType) {
				case RowType.GroupAdd: return this.groupAddWidget;
				case RowType.GroupFoot: return this.groupFootWidget;
				case RowType.GroupHead: return this.groupHeadWidget;
				case RowType.GroupStat: return this.groupStatWidget;
				case RowType.Record: return this.recordWidget;
				case RowType.RecordAdd: return this.recordAddWidget;
				case RowType.Spacing: return this.spacingWidget;
				case RowType.Stat: return this.statWidget;
				default: return null;
			}
		};
		return MainRenderer;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/util-area.js
function getHeadFrozenOptions(size) {
	return {
		x: 0,
		y: 0,
		width: size.activityStartX,
		height: size.activityStartY,
		overflow: "visible",
		batch: true
	};
}
function getHeadActivityOptions(size) {
	return {
		x: size.activityStartX,
		y: 0,
		width: size.activityViewWidth,
		height: size.activityStartY,
		batch: true
	};
}
function getBodyFrozenOptions(size) {
	return {
		x: 0,
		y: 0,
		width: size.activityStartX,
		height: size.rootHeight,
		overflow: "visible",
		batch: true
	};
}
function getBodyActivityOptions(size) {
	return {
		x: size.activityStartX,
		y: 0,
		width: size.activityViewWidth,
		height: size.rootHeight,
		batch: true
	};
}
var init_util_area = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/renderer/index.js
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
var GridRenderer;
var init_renderer = __esmMin((() => {
	init_es$1();
	init_pen();
	init_performance();
	init_event_handler();
	init_main();
	init_util_area();
	init_base_renderer();
	GridRenderer = /* @__PURE__ */ function(BaseRenderer) {
		"use strict";
		_inherits$1(GridRenderer, BaseRenderer);
		function GridRenderer(rendererModel, root) {
			var _this = BaseRenderer.call(this, root, rendererModel.collector.dataUtil.getContext()) || this;
			_this.rendererModel = rendererModel;
			_this.root = root;
			_this.raf = null;
			_this.collector = _this.rendererModel.collector;
			_this.headLayer = _this._register(pen.layer(_this.headLayerConfig));
			_this.bodyLayer = _this._register(pen.layer(_this.bodyLayerConfig));
			_this.featureLayer = _this._register(pen.layer(_this.featureLayerConfig));
			if (_this.collector.dataUtil.getContext().customConfig) _this.featureLayer.getElement().style.zIndex = "10";
			var initGroupConfig = {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				batch: true
			};
			_this.headArea = {
				frozen: _this._register(pen.group(Object.assign({}, initGroupConfig))),
				activity: _this._register(pen.group(Object.assign({}, initGroupConfig)))
			};
			_this.bodyArea = {
				frozen: _this._register(pen.group(Object.assign({}, initGroupConfig))),
				activity: _this._register(pen.group(Object.assign({}, initGroupConfig)))
			};
			_this.bodyFixedArea = {
				frozen: _this._register(pen.group(Object.assign({}, initGroupConfig))),
				activity: _this._register(pen.group(Object.assign({}, initGroupConfig)))
			};
			_this.bodyStickyArea = {
				frozen: _this._register(pen.group(Object.assign({}, initGroupConfig))),
				activity: _this._register(pen.group(Object.assign({}, initGroupConfig)))
			};
			_this.headLayer.addGroup(_this.headArea.frozen);
			_this.headLayer.addGroup(_this.headArea.activity);
			_this.bodyLayer.addGroup(_this.bodyArea.frozen);
			_this.bodyLayer.addGroup(_this.bodyArea.activity);
			_this.bodyLayer.addGroup(_this.bodyFixedArea.frozen);
			_this.bodyLayer.addGroup(_this.bodyFixedArea.activity);
			_this.bodyLayer.addGroup(_this.bodyStickyArea.frozen);
			_this.bodyLayer.addGroup(_this.bodyStickyArea.activity);
			_this.stage.addLayer(_this.bodyLayer);
			_this.stage.addLayer(_this.headLayer);
			_this.stage.addLayer(_this.featureLayer);
			_this.mainRenderer = new MainRenderer(_this.rendererModel);
			_this._register(_this.rendererModel.onRenderModelChange(() => {
				_this.render();
			}));
			_this.eventHandler = _this._register(new GridEventHandler(_this.stage, _this.root, _this.rendererModel));
			_this.UIEvent = _this.eventHandler.UIEvent;
			_this._register({ dispose: () => {
				if (_this.raf) cancelAnimationFrame(_this.raf);
			} });
			return _this;
		}
		var _proto = GridRenderer.prototype;
		/**
		* @deprecated 目前甘特视图需要用到，后续调整为组合方式
		*/ _proto.getHeadLayer = function getHeadLayer() {
			return this.headLayer;
		};
		/**
		* @deprecated 目前甘特视图需要用到，后续调整为组合方式
		*/ _proto.getBodyLayer = function getBodyLayer() {
			return this.bodyLayer;
		};
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.featureLayer;
		};
		_proto.render = function render() {
			var _a;
			if (!this.raf) this.raf = requestAnimationFrame(() => {
				var _a;
				var viewType = (_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type;
				if (viewType !== ViewType.GRID && viewType !== ViewType.GANTT) return;
				this.collector.contents.collectVisibleBeforeRender();
				performanceReport.common.markRenderStart();
				this.renderMain();
				this.renderFeature();
				performanceReport.common.markRenderEnd(this.collector.dataUtil.getContext());
				this.raf = null;
			});
			(_a = this.rendererModel.getTimeLine()) === null || _a === void 0 || _a.render();
		};
		_proto.renderMain = function renderMain() {
			this.headLayer.setAttrs(this.headLayerConfig);
			this.bodyLayer.setAttrs(this.bodyLayerConfig);
			this.headArea.frozen.clear();
			this.headArea.activity.clear();
			this.bodyArea.frozen.clear();
			this.bodyArea.activity.clear();
			this.bodyFixedArea.frozen.clear();
			this.bodyFixedArea.activity.clear();
			this.bodyStickyArea.frozen.clear();
			this.bodyStickyArea.activity.clear();
			this.headArea.frozen.setAttrs(getHeadFrozenOptions(this.collector.size));
			this.bodyArea.frozen.setAttrs(getBodyFrozenOptions(this.collector.size));
			this.headArea.activity.setAttrs(getHeadActivityOptions(this.collector.size));
			this.bodyArea.activity.setAttrs(getBodyActivityOptions(this.collector.size));
			this.bodyFixedArea.frozen.setAttrs(getBodyFrozenOptions(this.collector.size));
			this.bodyFixedArea.activity.setAttrs(getBodyActivityOptions(this.collector.size));
			this.bodyStickyArea.frozen.setAttrs(getBodyFrozenOptions(this.collector.size));
			this.bodyStickyArea.activity.setAttrs(getBodyActivityOptions(this.collector.size));
			if (!this.collector.state.isHideGrid) this.mainRenderer.render(this.headArea, this.bodyArea, this.bodyFixedArea, this.bodyStickyArea);
		};
		_proto.renderFeature = function renderFeature() {
			this.featureRenderer.render();
		};
		_proto.resize = function resize() {
			this.headLayer.setAttrs(this.headLayerConfig);
			this.bodyLayer.setAttrs(this.bodyLayerConfig);
			this.featureLayer.setAttrs(this.featureLayerConfig);
			this.render();
		};
		_proto.getTarget = function getTarget(offset) {
			return this.eventHandler.getTarget(offset);
		};
		_create_class$1(GridRenderer, [
			{
				key: "headLayerConfig",
				get: function() {
					var { size } = this.collector;
					var { scale } = size;
					return {
						id: "head-layer",
						scale,
						x: 0,
						y: 0,
						width: size.globalOriginRootWidth,
						height: size.activityStartY * scale
					};
				}
			},
			{
				key: "bodyLayerConfig",
				get: function() {
					var { size } = this.collector;
					var { scale } = size;
					var startY = size.activityStartY * scale;
					return {
						id: "body-layer",
						scale,
						x: 0,
						y: startY,
						width: size.globalOriginRootWidth,
						height: size.globalOriginRootHeight - startY - size.bodyReduceHeight
					};
				}
			},
			{
				key: "featureLayerConfig",
				get: function() {
					var { size } = this.collector;
					var { scale } = size;
					return {
						id: "feature-layer",
						listening: true,
						scale,
						x: 0,
						y: 0,
						width: size.globalOriginRootWidth,
						height: size.globalOriginRootHeight
					};
				}
			}
		]);
		return GridRenderer;
	}(BaseRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/index.js
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
var GridView;
var init_grid = __esmMin((() => {
	init_esm$1();
	init_es();
	init_es$1();
	init_common();
	init_style();
	init_get_cell_rect();
	init_constants();
	init_interface$23();
	init_selection();
	init_entries$1();
	init_active_point();
	init_index_interface();
	init_area_interactive();
	init_entries();
	init_formula_layer();
	init_frozen_line_drag();
	init_record_float();
	init_renderer();
	init_renderer_model();
	init_storage_key();
	init_canvas_view();
	init_storage_sync$1();
	GridView = /* @__PURE__ */ function(BaseCanvasView) {
		"use strict";
		_inherits(GridView, BaseCanvasView);
		function GridView(context) {
			var _this = BaseCanvasView.call(this, context) || this;
			_this.unfoldedGroupHeads = (headLayoutIndex) => {
				var rowInfo = _this.collector.rows.getInfo(headLayoutIndex);
				if (rowInfo && "path" in rowInfo) _this.setGroupFold({
					fold: false,
					groupKeys: [rowInfo.path]
				});
			};
			_this.resetGroupInteractive = () => {
				var targetNewFeature = _this.renderer.featureRenderer.getFeature(IGridAreaInteractive);
				if (targetNewFeature) targetNewFeature.reset();
			};
			_this.onDataChange = _this.rendererModel.onDataChange;
			_this.initFeatures();
			return _this;
		}
		var _proto = GridView.prototype;
		_proto.getType = function getType() {
			return ViewType.GRID;
		};
		_proto.initFeatures = function initFeatures() {
			(ua.isPC ? getPcFeatures() : getMobileFeatures()).forEach((featureOption) => this.installFeature(featureOption));
		};
		_proto.getStatus = function getStatus() {
			return this.rendererModel.getStatus();
		};
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.renderer.getFeatureLayer();
		};
		_proto.renderMain = function renderMain() {
			this.renderer.renderMain();
		};
		_proto.getRangeModel = function getRangeModel() {
			return this.rendererModel.getRangeModel();
		};
		_proto.getFloatState = function getFloatState() {
			return this.rendererModel.getFloatState();
		};
		_proto.getGanttTimeLine = function getGanttTimeLine() {};
		_proto.scrollToX = function scrollToX(scrollLeft) {
			this.rendererModel.scrollToX(scrollLeft);
		};
		_proto.scrollToY = function scrollToY(scrollTop) {
			this.rendererModel.scrollToY(scrollTop);
		};
		_proto.scrollToVisibility = function scrollToVisibility(cellPosition, delta) {
			this.rendererModel.scrollToVisibility(cellPosition, delta);
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			this.rendererModel.scrollByDelta(scrollInfo);
		};
		_proto.isGroupFolded = function isGroupFolded(groupKey) {
			return this.rendererModel.collector.state.isGroupFold(groupKey);
		};
		/**
		* 是否所有（顶层）分组都处于折叠态。
		* 供外层判断「全部折叠 / 全部展开」按钮的当前态；无分组时返回 false。
		*/ _proto.isAllGroupFold = function isAllGroupFold() {
			return this.rendererModel.collector.state.isAllGroupFold();
		};
		_proto.setGroupFold = function setGroupFold(option) {
			return this.rendererModel.setGroupFold(option);
		};
		_proto.beforeExport = function beforeExport() {
			var { size, state } = this.rendererModel.collector;
			var ganttAreaWidth = size.ganttRootWidth;
			BaseCanvasView.prototype.beforeExport.call(this);
			var targetWidth = state.isHideGrid ? ganttAreaWidth : size.globalWidth + ganttAreaWidth;
			var targetHeight = size.globalHeight + size.statHeight;
			this.setRootSize(targetWidth, targetHeight);
			if (state.isHideGrid) this.handleResize();
			return true;
		};
		_proto.getHeadLayer = function getHeadLayer() {
			return this.renderer.getHeadLayer();
		};
		_proto.getBodyLayer = function getBodyLayer() {
			return this.renderer.getBodyLayer();
		};
		_proto.renderFeature = function renderFeature() {
			this.renderer.renderFeature();
		};
		_proto.getFieldRect = function getFieldRect(fieldId) {
			var { size, range } = this.collector;
			var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
			if (!columnInfo) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			return {
				x: columnInfo.x - (columnInfo.isFrozen ? 0 : range.scrollLeft),
				y: size.globalPaddingTop,
				width: columnInfo.width,
				height: size.fieldHeight
			};
		};
		_proto.setAddFieldHighlightInfo = function setAddFieldHighlightInfo(info) {
			this.collector.state.setAddFieldHighlightInfo(info);
		};
		_proto.getVisibleFields = function getVisibleFields() {
			var { collector } = this;
			var columnRange = collector.range.getColumnRange();
			var frozenRange = collector.range.getFrozenColumnRange();
			var fieldIds = [];
			for (var columnIndex = frozenRange.start; columnIndex <= frozenRange.end; columnIndex++) {
				var columnInfo = collector.columns.getInfoByIndex(columnIndex);
				if (columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.id) fieldIds.push(columnInfo.id);
			}
			for (var columnIndex1 = columnRange.start; columnIndex1 <= columnRange.end; columnIndex1++) {
				var columnInfo1 = collector.columns.getInfoByIndex(columnIndex1);
				if (columnInfo1 === null || columnInfo1 === void 0 ? void 0 : columnInfo1.id) fieldIds.push(columnInfo1.id);
			}
			return fieldIds;
		};
		_proto.getVisibleRecords = function getVisibleRecords() {
			var { collector } = this;
			var rowRange = collector.range.getRowRange();
			var records = [];
			for (var rowIndex = rowRange.start; rowIndex <= rowRange.end; rowIndex++) {
				var rowInfo = collector.rows.getInfo(rowIndex);
				if (rowInfo && rowInfo.type === RowType.Record) records.push(rowInfo.recordId);
			}
			return records;
		};
		_proto.getOffset = function getOffset() {
			return {
				offsetX: this.collector.range.scrollLeft,
				offsetY: this.collector.range.scrollTop
			};
		};
		_proto.getActivityRect = function getActivityRect() {
			var { activityStartX, activityStartY, activityViewWidth, activityViewHeight } = this.collector.size;
			return {
				activityStartX,
				activityStartY,
				activityViewWidth,
				activityViewHeight
			};
		};
		/**
		* 判断是否新版布局(甘特和表格)
		* @returns bool
		*/ _proto.isGridNewLayout = function isGridNewLayout() {
			return supportNewLayout() && !this.collector.dataUtil.getContext().customConfig;
		};
		_proto.scrollVisibilityByActivePoint = function scrollVisibilityByActivePoint(row, column) {
			var viewModel = this.context.getCurrentView();
			var recordId = viewModel === null || viewModel === void 0 ? void 0 : viewModel.getDisplayedRecordIds()[row];
			var fieldId = viewModel === null || viewModel === void 0 ? void 0 : viewModel.getVisibleFieldIds()[column];
			this.scrollToVisibility({
				fieldId,
				recordId
			});
		};
		_proto.isHiddenRecord = function isHiddenRecord(recordId) {
			var rowInfo = this.collector.rows.getInfoByRecordId(recordId);
			if (!rowInfo || rowInfo.index < 0) return true;
			return this.collector.rows.isHiddenRow(rowInfo.parent);
		};
		_proto.getSelectionSize = function getSelectionSize() {
			var selection = this.getRangeModel().getCurrentSelection();
			var ranges = selection.getRanges();
			if (!ranges || selection.isEmptyRanges()) return;
			var allFieldIds = this.collector.dataUtil.getVisibleFieldIds();
			var allRecordIds = this.collector.dataUtil.getDisplayedRecordIds();
			var size;
			var handleRange = (range) => {
				var _a, _b, _c, _d;
				var { startRow = 0, endRow = allRecordIds.length - 1, startColumn = 0, endColumn = allFieldIds.length - 1 } = range;
				var startFieldId = allFieldIds[startColumn];
				var endFieldId = endColumn === allFieldIds.length - 1 ? AdditionField : allFieldIds[endColumn + 1];
				var startX = this.getFieldX(startFieldId);
				var endX = this.getFieldX(endFieldId);
				var startY = (_b = (_a = this.getRowInfo(startRow)) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0;
				var endY = (_d = (_c = this.getRowInfo(endRow + 1)) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : 0;
				if (!size) size = {
					startX,
					endX,
					startY,
					endY
				};
				else size = {
					startX: Math.min(size.startX, startX),
					endX: Math.max(size.endX, endX),
					startY: Math.min(size.startY, startY),
					endY: Math.max(size.endY, endY)
				};
			};
			if (Array.isArray(ranges)) ranges.forEach((range) => {
				handleRange(range);
			});
			else handleRange(ranges);
			return size;
		};
		_proto.getFieldX = function getFieldX(fieldId) {
			var columnInfo = this.collector.columns.getInfoByFieldId(fieldId);
			if (!columnInfo) return 0;
			return columnInfo.x - (columnInfo.isFrozen ? 0 : this.collector.range.scrollLeft);
		};
		_proto.getActivePointFeature = function getActivePointFeature() {
			return this.renderer.getFeatureRenderer().getFeature(IGridActivePoint);
		};
		_proto.getGridRecordFloatFeature = function getGridRecordFloatFeature() {
			return this.renderer.getFeatureRenderer().getFeature(IGridRecordFloat);
		};
		_proto.getGridFormulaLayerFeature = function getGridFormulaLayerFeature() {
			return this.renderer.getFeatureRenderer().getFeature(IGridFormulaLayer);
		};
		_proto.getGridFrozenLineDragFeature = function getGridFrozenLineDragFeature() {
			return this.renderer.getFeatureRenderer().getFeature(IGridFrozenLineDrag);
		};
		_proto.getTarget = function getTarget(x, y) {
			return this.renderer.getTarget({
				x,
				y
			});
		};
		_proto.getFrozenFields = function getFrozenFields() {
			return this.collector.dataUtil.getFrozenFields();
		};
		_proto.getFrozenEndX = function getFrozenEndX() {
			return this.collector.size.frozenWidth + this.collector.size.globalPaddingLeft;
		};
		_proto.getActivityViewHeight = function getActivityViewHeight() {
			return this.collector.size.activityViewHeight;
		};
		_proto.getGroupHeadRect = function getGroupHeadRect(recordId) {
			var _a;
			var recordInfo = this.collector.rows.getInfoByRecordId(recordId);
			if (!recordInfo) return;
			var groupInfo = recordInfo;
			for (var nowLevel = groupInfo.parent; nowLevel !== -1; nowLevel = (_a = groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.parent) !== null && _a !== void 0 ? _a : -1) if (groupInfo) {
				var parentIndex = groupInfo.parent;
				groupInfo = this.collector.rows.getInfo(parentIndex);
			}
			if ((groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.type) !== RowType.GroupHead) return;
			var hoverPaddingVertical = 5;
			return {
				x: groupInfo.x,
				y: groupInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop + hoverPaddingVertical,
				height: groupInfo.height - hoverPaddingVertical * 2,
				width: 0
			};
		};
		_proto.getGroupHeaderInfo = function getGroupHeaderInfo(recordId) {
			var _a, _b, _c, _d, _e, _f, _g, _h;
			var recordInfo = this.collector.rows.getInfoByRecordId(recordId);
			if (!recordInfo) return;
			var groupInfo = recordInfo;
			for (var nowLevel = groupInfo.parent; nowLevel !== -1; nowLevel = (_a = groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.parent) !== null && _a !== void 0 ? _a : -1) if (groupInfo) {
				var parentIndex = groupInfo.parent;
				groupInfo = this.collector.rows.getInfo(parentIndex);
			}
			if ((groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.type) !== RowType.GroupHead) return;
			var groupValueInfo = this.collector.contents.getGroupValueInfo(groupInfo.path);
			var groupValueRect = groupValueInfo === null || groupValueInfo === void 0 ? void 0 : groupValueInfo[0];
			if (groupValueRect) {
				var hoverPaddingVertical = 5;
				var textConfig = groupValueInfo[1][0];
				return {
					x: (_d = (_c = (_b = textConfig === null || textConfig === void 0 ? void 0 : textConfig.layouts) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : 0 + groupValueInfo[1][0].x - groupValueRect.x,
					y: groupInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop + hoverPaddingVertical,
					height: groupInfo.height - hoverPaddingVertical,
					width: (_h = (_g = (_f = (_e = textConfig === null || textConfig === void 0 ? void 0 : textConfig.layouts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.width) !== null && _g !== void 0 ? _g : textConfig.width) !== null && _h !== void 0 ? _h : 0
				};
			}
		};
		_proto.getRowSize = function getRowSize(type) {
			return this.collector.rows.getRowSize(type);
		};
		_proto.getRowParentIndex = function getRowParentIndex(recordId) {
			var _a;
			return (_a = this.collector.rows.getInfoByRecordId(recordId)) === null || _a === void 0 ? void 0 : _a.parent;
		};
		_proto.getVisibleFieldIds = function getVisibleFieldIds() {
			return this.collector.dataUtil.getVisibleFieldIds();
		};
		_proto.isAdditionField = function isAdditionField(fieldId) {
			return fieldId === AdditionField;
		};
		_proto.getFieldWidth = function getFieldWidth(fieldId) {
			return this.collector.columns.getWidth(fieldId);
		};
		_proto.getGroupEditRect = function getGroupEditRect(layoutIndex) {
			var { size } = this.collector;
			var lineSize = 1;
			var newInfo = this.collector.rows.getInfo(layoutIndex);
			if (!newInfo || newInfo.type !== RowType.GroupHead) return null;
			var groupValueInfo = this.collector.contents.getGroupValueInfo(newInfo.path);
			var rect = groupValueInfo === null || groupValueInfo === void 0 ? void 0 : groupValueInfo[0];
			if (!rect) return null;
			return {
				x: rect.x,
				width: rect.width / size.scale,
				y: rect.y - lineSize * 2,
				height: size.groupHeadHeight / size.scale - lineSize * 2
			};
		};
		_proto.isFold = function isFold(path) {
			if (path === "") path = JSON.stringify(null);
			return this.collector.state.isGroupFold([path]);
		};
		_proto.getRowInfo = function getRowInfo(index) {
			return this.collector.rows.getInfo(index);
		};
		_proto.getRecordIndex = function getRecordIndex(recordId) {
			return this.collector.dataUtil.getDisplayedRecordIds().indexOf(recordId);
		};
		_proto.getRecordRect = function getRecordRect(recordId) {
			var rowInfo = this.collector.rows.getInfoByRecordId(recordId);
			if (!rowInfo) return;
			return {
				x: rowInfo.x,
				y: rowInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop,
				height: rowInfo.height,
				width: this.collector.getRowOuterWidth()
			};
		};
		_proto.getGroupHeadInfo = function getGroupHeadInfo(layoutIndex) {
			var newInfo = this.collector.rows.getInfo(layoutIndex);
			if ((newInfo === null || newInfo === void 0 ? void 0 : newInfo.type) === RowType.GroupHead) return Object.assign(Object.assign({}, newInfo), {
				folded: newInfo.fold,
				opacity: 1
			});
		};
		_proto.getGroupAddInfo = function getGroupAddInfo() {
			return this.collector.rows.getTypeRows(RowType.GroupAdd)[0];
		};
		_proto.flushLayoutY = function flushLayoutY() {
			this.collector.rows.patch();
		};
		_proto.getGroupInfos = function getGroupInfos() {
			var _a;
			return ((_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroupInfos()) || [];
		};
		_proto.getRowPath = function getRowPath(layoutIndex) {
			var rowInfo = this.collector.rows.getInfo(layoutIndex);
			if (!rowInfo || rowInfo.type !== RowType.GroupHead) return;
			return rowInfo.path;
		};
		_proto.hasGroup = function hasGroup() {
			return this.getMaxGroupLevel() !== -1;
		};
		_proto.getMaxGroupLevel = function getMaxGroupLevel() {
			var _a;
			return (((_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroupFields().length) || 0) - 1;
		};
		_proto.isInSameGroupLevel = function isInSameGroupLevel(targetRecordId, otherRecordId) {
			if (!this.collector.dataUtil.hasGroup()) return true;
			var targetGroupPath = this.getGroupPathByRecordId(targetRecordId);
			var otherGroupPath = this.getGroupPathByRecordId(otherRecordId);
			return targetGroupPath.toString() === otherGroupPath.toString();
		};
		_proto.getGroupPathByLayoutIndex = function getGroupPathByLayoutIndex(layoutIndex) {
			var rowInfo = this.collector.rows.getInfo(layoutIndex);
			if (!rowInfo) return [];
			if (rowInfo.type === RowType.GroupHead) return rowInfo.path || [];
			return this.getGroupPathByLayoutIndex(rowInfo.parent);
		};
		_proto.getGroupPathByRecordId = function getGroupPathByRecordId(recordId) {
			var _a;
			var layoutIndex = ((_a = this.collector.rows.getInfoByRecordId(recordId)) === null || _a === void 0 ? void 0 : _a.index) || -1;
			return this.getGroupPathByLayoutIndex(layoutIndex);
		};
		_proto.getGoupRangeRecordIds = function getGoupRangeRecordIds(groupPath) {
			var _a;
			var targetGroupHeadInfo = this.collector.rows.getTypeRows(RowType.GroupHead).find((groupHeadInfo) => groupHeadInfo.path.toString() === groupPath.toString());
			if (!targetGroupHeadInfo) return [];
			var recordRangeInfo = this.collector.rows.getRecordRange(targetGroupHeadInfo.index + 1);
			return (_a = recordRangeInfo === null || recordRangeInfo === void 0 ? void 0 : recordRangeInfo.recordIds) !== null && _a !== void 0 ? _a : [];
		};
		_proto.getAdaptColWidthFeature = function getAdaptColWidthFeature() {
			var _a;
			return (_a = this.getFeature(IAdaptiveColumnWidth)) !== null && _a !== void 0 ? _a : null;
		};
		_proto.getRenderFieldIds = function getRenderFieldIds() {
			var fieldIds = this.collector.dataUtil.getVisibleFieldIds();
			fieldIds.unshift(OperatorField);
			if (!(this.collector.dataUtil.isGantt() || this.collector.context.customConfig)) fieldIds.push(AdditionField);
			return fieldIds;
		};
		_proto.getMaxFrozenWidth = function getMaxFrozenWidth() {
			var frozenLimitRate = ua.isMobile ? .5 : .9;
			return (this.collector.dataUtil.isGantt() ? this.collector.size.globalWidth : this.collector.size.rootWidth) * frozenLimitRate;
		};
		_proto.getSelectionData = function getSelectionData() {
			var selection = this.rendererModel.getRangeModel().getCurrentSelection();
			var ranges = selection.getRanges();
			if (!ranges || selection.isEmptyRanges()) return;
			var allFieldIds = this.getVisibleFieldIds();
			var allRecordIds = this.collector.dataUtil.getDisplayedRecordIds();
			var toIds = (range) => {
				var { startRow = 0, endRow = allRecordIds.length - 1, startColumn = 0, endColumn = allFieldIds.length - 1 } = range;
				var fieldIds = [];
				var recordIds = [];
				for (var row = startRow; row <= endRow; row++) recordIds.push(allRecordIds[row]);
				for (var column = startColumn; column <= endColumn; column++) fieldIds.push(allFieldIds[column]);
				return [fieldIds, recordIds];
			};
			var selectFieldIds = [];
			var selectRecordIds = [];
			var handleRange = (range) => {
				var [fieldIds, recordIds] = toIds(range);
				selectFieldIds.push(...fieldIds);
				selectRecordIds.push(...recordIds);
			};
			if (Array.isArray(ranges)) ranges.forEach((range) => {
				handleRange(range);
			});
			else handleRange(ranges);
			return {
				selectFieldIds,
				selectRecordIds
			};
		};
		_proto.setAllSelect = function setAllSelect() {
			return this.collector.state.setAllSelect(true);
		};
		_proto.getGroupPathByLayoutInfo = function getGroupPathByLayoutInfo(layoutIndex, parentLayoutIndex) {
			var rowInfo = this.collector.rows.getInfo(layoutIndex);
			if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) === RowType.GroupHead) return rowInfo.path;
			var parentRowInfo = this.collector.rows.getInfo(parentLayoutIndex);
			if ((parentRowInfo === null || parentRowInfo === void 0 ? void 0 : parentRowInfo.type) === RowType.GroupHead) return parentRowInfo.path;
			return [];
		};
		_proto.recordIndexToLayoutIndex = function recordIndexToLayoutIndex(recordIndex) {
			var rangeList = this.collector.rows.getTypeRows(RowType.RecordRange);
			for (var index = 0; index < rangeList.length; index++) if (rangeList[index].recordCountBefore < recordIndex && (!rangeList[index + 1] || rangeList[index + 1].recordCountBefore >= recordIndex)) return recordIndex - rangeList[index].recordCountBefore + rangeList[index].index;
		};
		_proto.scrollVisibilityByRectInGrid = function scrollVisibilityByRectInGrid(rect, isFieldFrozen, isRecordFrozen, isScrollToTop = false) {
			var { isVisible, xDirection, yDirection } = this.getRectVisibleInfo(rect, isFieldFrozen, isRecordFrozen);
			if (isVisible && !isScrollToTop) return;
			var { x, y, width, height } = rect;
			var offsetX = this.collector.range.scrollLeft;
			var offsetY = this.collector.range.scrollTop;
			var { activityStartX, activityStartY, activityViewWidth, activityViewHeight } = this.collector.size;
			var scrollX = offsetX;
			var scrollY = offsetY;
			if (xDirection === XDirection.LEFT) scrollX = offsetX - (activityStartX - x);
			else if (xDirection === XDirection.RIGHT) scrollX = offsetX + (x + width - (activityStartX + activityViewWidth)) + 25;
			if (yDirection === YDirection.UP) scrollY = offsetY - (activityStartY - y);
			else if (yDirection === YDirection.DOWN) scrollY = offsetY + (y + height - (activityStartY + activityViewHeight)) + 25;
			this.scrollToX(scrollX);
			this.scrollToY(scrollY);
		};
		/**
		* 计算 rect 与可视区域的关系
		* isVisible 表示是否完整在可视区域内
		* xDirection 表示 x 轴上与可视区域的关系
		* yDirection 表示 y 轴上与可视区域的关系
		*/ _proto.getRectVisibleInfo = function getRectVisibleInfo(rect, isFieldFrozen, isRecordFrozen) {
			var { activityStartX, activityStartY, activityViewWidth, activityViewHeight } = this.collector.size;
			var { x, y, width, height } = rect;
			var xDirection = XDirection.NONE;
			var yDirection = YDirection.NONE;
			if (!isFieldFrozen) {
				if (x < activityStartX) xDirection = XDirection.LEFT;
				else if (x + width > activityStartX + activityViewWidth) xDirection = XDirection.RIGHT;
			}
			if (!isRecordFrozen) {
				if (y < activityStartY) yDirection = YDirection.UP;
				else if (y + height > activityStartY + activityViewHeight) yDirection = YDirection.DOWN;
			}
			return {
				xDirection,
				yDirection,
				isVisible: xDirection === XDirection.NONE && yDirection === YDirection.NONE
			};
		};
		_proto.isOperator = function isOperator(target) {
			var _a;
			return !target.isBlank && ((_a = target.columnInfo) === null || _a === void 0 ? void 0 : _a.id) === "Operator";
		};
		_proto.isRecord = function isRecord(target) {
			var _a;
			return !target.isBlank && ((_a = target.rowInfo) === null || _a === void 0 ? void 0 : _a.type) === RowType.Record;
		};
		_proto.isField = function isField(target) {
			var _a, _b;
			return !target.isBlank && !target.rowInfo && ((_a = target.columnInfo) === null || _a === void 0 ? void 0 : _a.isField) && ((_b = target.columnInfo) === null || _b === void 0 ? void 0 : _b.id) !== "Operator";
		};
		/**
		* 是否命中"列编组头"（存在可见编组 + 鼠标 Y 在编组头行内 + 悬停列属于某编组）
		* 用于业务层右键菜单分支判断：命中则显示"编组"类型的菜单，而非单列菜单
		*/ _proto.isFieldGroup = function isFieldGroup(target, y) {
			if (target.isBlank || target.rowInfo) return false;
			var { columnInfo } = target;
			if (!(columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.fieldGroupId) || !(columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.isField)) return false;
			var { size, dataUtil } = this.collector;
			if (!dataUtil.hasVisibleFieldGroup()) return false;
			return y >= size.globalPaddingTop && y < size.globalPaddingTop + size.fieldGroupHeaderHeight;
		};
		_proto.isGroupHead = function isGroupHead(target) {
			var { rowInfo, isBlank } = target;
			if (!rowInfo || isBlank) return false;
			return [
				RowType.GroupHead,
				RowType.GroupFoot,
				RowType.RecordAdd
			].includes(rowInfo.type);
		};
		_proto.getCellRect = function getCellRect1(fieldId, recordId) {
			return getCellRect(fieldId, recordId, this.collector);
		};
		_proto.getCellRectBatch = function getCellRectBatch(items) {
			var visibleRecordIds = this.collector.range.getVisibleRecordIds();
			var frozenFieldIdsSet = new Set(this.getFrozenFields());
			var result = [];
			items.forEach((item) => {
				var { fieldId } = item;
				item.recordIds.forEach((recordId) => {
					if (!visibleRecordIds.includes(recordId)) return;
					var rect = getCellRect(fieldId, recordId, this.collector);
					if (!rect) return;
					var cellRect = Object.assign(Object.assign({}, rect), {
						fieldId,
						recordId,
						isFrozen: frozenFieldIdsSet.has(fieldId)
					});
					result.push(cellRect);
				});
			});
			return result;
		};
		_proto.getRecordHeight = function getRecordHeight() {
			return this.collector.rows.getRecordSize();
		};
		_proto.getHighlightInfos = function getHighlightInfos(recordId) {
			return this.collector.state.getHighlightRecordInfo(recordId);
		};
		_proto.removeHighlightInfos = function removeHighlightInfos() {
			return this.collector.state.clearHighlight();
		};
		_proto.getFolds = function getFolds() {
			return this.collector.state.getFoldGroup();
		};
		_proto.setFold = function setFold(groupPath, fold) {
			this.collector.state.setGroupFoldState(groupPath, fold);
			var foldGroups = this.collector.state.getFoldGroup();
			setStorageValue(this.collector.dataUtil.getContext(), GridStorageType.FoldGroup, JSON.stringify(Array.from(foldGroups)));
		};
		_proto.getCurrentSelectionRect = function getCurrentSelectionRect() {
			var selectionFeature = this.renderer.getFeatureRenderer().getFeature(IGridSelection);
			return selectionFeature === null || selectionFeature === void 0 ? void 0 : selectionFeature.getCurrentSelectionRect();
		};
		_proto.getPadding = function getPadding() {
			return {
				left: this.collector.size.globalPaddingLeft,
				top: this.collector.size.globalPaddingTop,
				right: this.collector.size.globalPaddingRight,
				bottom: this.collector.size.globalPaddingBottom
			};
		};
		/**
		* 截取规则：
		* 1. 不需要截取新建列按钮
		* 2. 保持列完成，不应该被截断
		* 3. Puppeteer 窗口尺寸 1920 * 934
		* 4. 需要截取到表公告
		* 5. 允许分组被截断
		* 6. 如果出现了滚动条，需要去除两侧的滚动条
		*/ _proto.getPreviewTplRect = function getPreviewTplRect() {
			var _a;
			var clientRect = this.getTableDescRect();
			var x = this.globalPaddingLeft;
			var y = ((_a = clientRect === null || clientRect === void 0 ? void 0 : clientRect.y) !== null && _a !== void 0 ? _a : 0) + this.globalPaddingTop;
			var height = this.getPreviewTplHeight(clientRect);
			return {
				x,
				y,
				width: this.getPreviewTplWidth(),
				height
			};
		};
		_proto.setBatchSelectMode = function setBatchSelectMode(enable) {
			if (!enable) this.getRangeModel().resetSelection();
		};
		_proto.createRendererModel = function createRendererModel() {
			return new GridRendererModel(this.context);
		};
		_proto.createRenderer = function createRenderer() {
			return new GridRenderer(this.rendererModel, this.context.getRenderRoot());
		};
		/**
		* 获取预览模板的宽度
		* @returns
		*/ _proto.getPreviewTplWidth = function getPreviewTplWidth() {
			if (this.collector.dataUtil.isGantt()) return this.getGanttPreviewWidth();
			var { columns, size, range } = this.collector;
			var columnsCount = columns.getInfos().size;
			var endColumnInfo;
			for (var index = 0; index < columnsCount; index++) {
				endColumnInfo = columns.getInfoByIndex(index);
				var isExistYScrollBar = range.maxScrollTop > 0;
				var viewWidth = size.activityViewWidth + size.activityStartX - (isExistYScrollBar ? style.size.scrollBarSize : 0);
				if (endColumnInfo && endColumnInfo.x >= viewWidth) break;
			}
			return endColumnInfo ? endColumnInfo.x : 0;
		};
		/**
		* 获取预览模板的高度
		* @returns
		*/ _proto.getPreviewTplHeight = function getPreviewTplHeight(clientRect) {
			var _a;
			var { rows, size } = this.collector;
			var { rowCount } = rows;
			var endRowInfo;
			for (var index = 0; index < rowCount; index++) {
				endRowInfo = rows.getInfo(index);
				var viewHeight = size.activityViewHeight;
				if (endRowInfo && endRowInfo.y >= viewHeight) break;
			}
			return endRowInfo ? endRowInfo.y + ((_a = clientRect === null || clientRect === void 0 ? void 0 : clientRect.height) !== null && _a !== void 0 ? _a : 0) + endRowInfo.height + this.fieldFooterHeight : 0;
		};
		_proto.getGanttPreviewWidth = function getGanttPreviewWidth() {
			var _a;
			return ((_a = this.context.getRenderRoot().getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.width) - this.globalPaddingLeft * 2;
		};
		_create_class(GridView, [
			{
				key: "fieldHeight",
				get: function() {
					return this.collector.size.fieldHeight;
				}
			},
			{
				key: "headerHeight",
				get: function() {
					return this.collector.size.globalPaddingTop + this.collector.size.fieldHeight;
				}
			},
			{
				key: "fieldFooterHeight",
				get: function() {
					return this.collector.size.statHeight;
				}
			},
			{
				key: "frozenWidth",
				get: function() {
					return this.collector.size.frozenWidth;
				}
			},
			{
				key: "globalHeight",
				get: function() {
					return this.collector.size.globalHeight;
				}
			},
			{
				key: "operatorFieldWidth",
				get: function() {
					return this.collector.profile.operatorFieldWidth;
				}
			},
			{
				key: "groupHeadHeight",
				get: function() {
					return this.collector.size.groupHeadHeight;
				}
			}
		]);
		return GridView;
	}(BaseCanvasView);
}));
//#endregion
export { ActivePointButtonType as C, init_config$1 as S, init_get_frozen_end_y as _, getRowInfoByOffset as a, isCalcHoliday as b, getDragLineYAndTarget as c, IGridAutoScroll as d, GridFeatureBase as f, getFrozenEndY as g, init_storage_key as h, init_renderer_model as i, init_util as l, GridStorageType as m, init_grid as n, init_get_info_by_offset as o, init_grid_feature as p, getRecordFullVisibleY as r, applyMovedRecordBehavior as s, GridView as t, init_auto_scroll as u, hasStatutoryHoliday as v, init_interface$22 as w, init_copyright$1 as x, init_util$1 as y };
