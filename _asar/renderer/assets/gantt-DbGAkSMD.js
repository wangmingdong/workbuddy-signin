import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_throttle } from "./throttle-mAPE4S6V.js";
import { Dn as require_main, Sn as init_module, kn as createDecorator, xn as require_dayjs_min } from "./esm-cVQVEiWG.js";
import { $l as init_es, Ac as getFormulaError, Fc as isPrimaryFormulaError, Is as require_zh_cn, Tc as FieldStatResultType, Vl as ViewType, Vu as require_dist, Xu as domainConfig, Zu as isTemplatePreview, au as getI18nMonthText, ql as FieldType, wd as i18n, zc as isFormulaLikeFieldType } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { _ as init_get_frozen_end_y, a as getRowInfoByOffset, b as isCalcHoliday, c as getDragLineYAndTarget, d as IGridAutoScroll, f as GridFeatureBase, g as getFrozenEndY, h as init_storage_key, i as init_renderer_model, l as init_util$1, m as GridStorageType, n as init_grid, o as init_get_info_by_offset, p as init_grid_feature, r as getRecordFullVisibleY, s as applyMovedRecordBehavior, t as GridView, u as init_auto_scroll$1, v as hasStatutoryHoliday, y as init_util } from "./grid-58U_qx7D.js";
import { B as init_feature_single, Bt as performanceReport, D as getBlockStyle, F as init_scroller$1, H as pen, I as init_register_esc_to_cancel, K as init_lib, L as registerEscToCancel, P as CommonScroller, U as init_resources, V as init_pen, X as DrawType, Y as Level, Z as init_interface$8, a as BaseCollector, d as getStorageValue, et as init_is_in_rect, f as init_storage_sync, k as init_get_block_style, o as init_collector$1, ot as Cursor, p as setStorageValue, pt as NormalIconAlias, st as init_cursor, tt as isHitRect, vt as init_style, yt as style, z as FeatureAuth, zt as init_performance } from "./canvas-view-DDuMsrmC.js";
import { a as init_format_time, c as toMonthLastDateTime, i as getToday, l as toSundayTime, n as fixRange, o as toMondayTime, r as init_time_util, s as toMonthFirstDateTime } from "./time-util-BfGHaEiB.js";
import { n as init_auto_scroll$2, t as AutoScroll } from "./auto-scroll-Cn43Kqkt.js";
import { i as init_work_day, n as init_get_primary_title, r as WorkDayService, t as getRecordPrimaryTitle } from "./get-primary-title-B9E0hwv1.js";
import { i as init_scroll_info, n as init_fix_scroll_delta, r as getScrollTipInfo, t as fixScrollDelta } from "./fix-scroll-delta-C4NjXGCK.js";
import { c as RowType, l as init_interface$9, o as init_string_group_path, s as stringifyGroupPath } from "./storage-sync-CZ5zDwyE.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/get-goupvalue-text.js
/**
* 获取分组值的文本形式
* 如果是多选等多个值的，用逗号连接起来
* @param groupValue
* @returns
*/ function getGroupValueText(groupValue) {
	if (!groupValue) return "";
	if (Array.isArray(groupValue)) return groupValue.map((value) => getGroupValueText(value)).join(",");
	var { data } = groupValue;
	if (!(data === null || data === void 0 ? void 0 : data.length)) return "";
	return data.map((value) => value.text).join(",");
}
var init_get_goupvalue_text = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/is-groupvalue-error.js
/**
* 分组值是否异常
* @param groupValue
* @returns
*/ function isGroupValueError(groupValue) {
	if (!groupValue) return false;
	if (Array.isArray(groupValue)) return false;
	var { data, sourceType } = groupValue;
	if (!(data === null || data === void 0 ? void 0 : data.length) || !isFormulaLikeFieldType(sourceType)) return false;
	return !!getFormulaError(data);
}
var init_is_groupvalue_error = __esmMin((() => {
	init_es$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/is-time.js
/**
* 判断两个时间是否在同一个月内
* @param thatTime
* @param otherTime
*/ function isSameMonth(thatTime, otherTime) {
	var that = new Date(thatTime);
	var other = new Date(otherTime);
	return that.getMonth() === other.getMonth() && that.getFullYear() === other.getFullYear();
}
var init_is_time = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/constants/time.js
var TimeType, oneDayTimeStamp, TimeBuffers, TimeUnitWidths, getWeekNames;
var init_time$1 = __esmMin((() => {
	init_esm();
	init_es();
	(function(TimeType) {
		TimeType[TimeType["Week"] = 0] = "Week";
		TimeType[TimeType["Month"] = 1] = "Month";
		TimeType[TimeType["Quarter"] = 2] = "Quarter";
		TimeType[TimeType["Year"] = 3] = "Year";
	})(TimeType || (TimeType = {}));
	oneDayTimeStamp = 1440 * 60 * 1e3;
	TimeBuffers = {
		[TimeType.Week]: 7 * oneDayTimeStamp * 2,
		[TimeType.Month]: 30 * oneDayTimeStamp * 2,
		[TimeType.Quarter]: 90 * oneDayTimeStamp * 2,
		[TimeType.Year]: 360 * oneDayTimeStamp * 2
	};
	TimeUnitWidths = {
		[TimeType.Week]: ua.isMobile ? 80 : 128,
		[TimeType.Month]: 56,
		[TimeType.Quarter]: 100,
		[TimeType.Year]: 80
	};
	getWeekNames = () => ({
		0: i18n.t("日"),
		1: i18n.t("一"),
		2: i18n.t("二"),
		3: i18n.t("三"),
		4: i18n.t("四"),
		5: i18n.t("五"),
		6: i18n.t("六")
	});
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/transform-time.js
/**
* 获取两个时间之间的单位数量
* 如果是同一个单位下标，返回 0
* @param start
* @param end
* @param timeCollector
* @returns
*/ function getUnitsBetween(start, end, timeCollector) {
	var timeType = timeCollector.getType();
	var startDayjs = toInitDayjs(start);
	var endDayjs = toInitDayjs(end);
	switch (timeType) {
		case TimeType.Week:
		case TimeType.Month: return endDayjs.diff(startDayjs, "day");
		case TimeType.Quarter: return endDayjs.diff(startDayjs, "week");
		case TimeType.Year: return endDayjs.diff(startDayjs, "month");
		default: return endDayjs.diff(startDayjs, "day");
	}
}
/**
* 时间转下标
* @param time
* @param timeType
* @returns
*/ function timeToIndex(time, timeCollector) {
	var globalStart = timeCollector.getGlobalRange().start;
	return getUnitsBetween(globalStart, time, timeCollector);
}
/**
* 下标转时间
* @param index
* @param timeType
* @param globalStart
* @returns
*/ function indexToTime(index, timeCollector) {
	var timeType = timeCollector.getType();
	var globalStart = timeCollector.getGlobalRange().start;
	switch (timeType) {
		case TimeType.Week:
		case TimeType.Month: return getAfterDaysTime(globalStart, index);
		case TimeType.Quarter: return toInitDayjs(globalStart).add(index, "week").valueOf();
		case TimeType.Year: return toInitDayjs(globalStart).add(index, "month").valueOf();
		default: return getAfterDaysTime(globalStart, index);
	}
}
/**
* 两个时间之间（含着两个时间）有多少天
* 如果是同一天，算一天
* @param timeFrom
* @param timeTo
* @returns
*/ function getDaysBetween(timeFrom, timeTo) {
	return Math.abs(toInitDayjs(timeTo).diff(toInitDayjs(timeFrom), "day")) + 1;
}
/**
* 获取指定时间之后 days 天的时间
* @param time
* @param days
* @returns
*/ function getAfterDaysTime(time, days) {
	return toInitDayjs(time).add(days, "day").valueOf();
}
/**
* 获取指定时间所在月份的天数
* @param time
* @returns
*/ function getDaysInMonth(time) {
	return toInitDayjs(time).daysInMonth();
}
/**
* 获取指定时间所在月份的下标
* @param time
* @returns
*/ function getTimeInMonthIndex(time) {
	return toInitDayjs(time).date();
}
/**
* 周日下标变为 6
* 一二三四五六日
* 0123456
* @param day
* @returns
*/ function fixDayIndex(day) {
	return day === 0 ? 6 : day - 1;
}
function toInitDayjs(time) {
	return (0, import_dayjs_min$4.default)(time).startOf("day");
}
var import_dayjs_min$4;
var init_transform_time = __esmMin((() => {
	import_dayjs_min$4 = /* @__PURE__ */ __toESM(require_dayjs_min());
	init_time$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/collector/block.js
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
var BlockCollector;
var init_block$1 = __esmMin((() => {
	init_es();
	init_es$1();
	init_pen();
	init_work_day();
	init_util();
	init_resources();
	init_style();
	init_get_goupvalue_text();
	init_is_groupvalue_error();
	init_is_time();
	init_transform_time();
	init_interface$9();
	init_string_group_path();
	init_time$1();
	init_get_block_style();
	init_get_primary_title();
	BlockCollector = /* @__PURE__ */ function() {
		"use strict";
		function BlockCollector(size, time, range, gridExtendApi) {
			this.size = size;
			this.time = time;
			this.range = range;
			this.gridExtendApi = gridExtendApi;
			this.groupBlocks = /* @__PURE__ */ new Map();
			this.recordBlocks = /* @__PURE__ */ new Map();
		}
		var _proto = BlockCollector.prototype;
		_proto.collect = function collect() {
			this.beforeCollect();
			this.collectGroupBlocks();
			if (this.gridExtendApi.collector.state.isExporting()) this.collectAllRecordBlocks();
			else this.collectVisibleRecordBlocks();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.getGroupBlockRenderInfo = function getGroupBlockRenderInfo(groupPath, rowInfo) {
			var block = this.groupBlocks.get(stringifyGroupPath(groupPath));
			if (block) return this.getRenderInfo(block, rowInfo);
		};
		_proto.getRecordBlockRenderInfo = function getRecordBlockRenderInfo(recordId, rowInfo) {
			var block = this.recordBlocks.get(recordId);
			if (block) return this.getRenderInfo(block, rowInfo);
		};
		_proto.setBlockHidden = function setBlockHidden(recordId, hidden) {
			var block = this.recordBlocks.get(recordId);
			if (block) this.recordBlocks.set(recordId, Object.assign(Object.assign({}, block), { hidden }));
		};
		_proto.setBlockWidth = function setBlockWidth(recordId, width, widthBeforeExpand) {
			var block = this.recordBlocks.get(recordId);
			if (block) this.recordBlocks.set(recordId, Object.assign(Object.assign({}, block), {
				width,
				widthBeforeExpand
			}));
		};
		_proto.getWorkDays = function getWorkDays(range) {
			var dateConfig = this.gridExtendApi.collector.dataUtil.getGanttDateConfig();
			if (!range) return 0;
			return WorkDayService.getWorkDayCount(range[0], range[1], {
				isCalcHoliday: isCalcHoliday(dateConfig),
				hasStatutoryHoliday: hasStatutoryHoliday(dateConfig)
			}) || 0;
		};
		_proto.collectVisibleRecordBlocks = function collectVisibleRecordBlocks() {
			var { start, end } = this.gridExtendApi.collector.range.getRowRange();
			for (var index = start; index <= end; index++) {
				var rowInfo = this.gridExtendApi.collector.rows.getInfo(index);
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record) continue;
				var range = this.gridExtendApi.collector.dataUtil.getRecordRangeTime(rowInfo.recordId);
				var block = this.collectRecordBlock(rowInfo.recordId, range);
				if (block) this.recordBlocks.set(rowInfo.recordId, block);
			}
		};
		_proto.beforeCollect = function beforeCollect() {
			this.groupBlocks.clear();
			this.recordBlocks.clear();
		};
		_proto.getRenderInfo = function getRenderInfo(block, rowInfo) {
			var { startX, outerWidth } = this.size;
			var renderRect = this.getBlockRenderRect(block, rowInfo);
			return {
				block,
				renderRect,
				isOutViewport: renderRect.x + renderRect.width < startX || renderRect.x > startX + outerWidth,
				headIcon: this.getHeadIcon(renderRect, block, rowInfo),
				tailIcon: this.getTailIcon(renderRect, block)
			};
		};
		_proto.getBlockRenderRect = function getBlockRenderRect(block, rowInfo) {
			return {
				x: this.size.startX + block.x - this.range.scrollLeft,
				y: rowInfo.y + (rowInfo.height - block.height) / 2 - this.gridExtendApi.collector.range.scrollTop,
				width: block.width,
				height: block.height
			};
		};
		_proto.getHeadIcon = function getHeadIcon(renderRect, block, rowInfo) {
			var iconRect = Object.assign(Object.assign({}, renderRect), {
				x: this.size.startX + this.size.arrowIconMargin,
				y: renderRect.y + (renderRect.height - this.size.arrowIconSize) / 2,
				width: this.size.arrowIconSize,
				height: this.size.arrowIconSize
			});
			if (block.isInValid && rowInfo.type === RowType.Record) return pen.config.icon(NormalIconAlias.TIP_BLUE, iconRect);
			if (block.width && renderRect.x < this.size.startX) return pen.config.icon(NormalIconAlias.TIME_PREV, iconRect);
		};
		_proto.getTailIcon = function getTailIcon(renderRect, block) {
			if (!block.width) return;
			if (renderRect.x + renderRect.width > this.size.startX + this.size.outerWidth) return pen.config.icon(NormalIconAlias.TIME_NEXT, Object.assign(Object.assign({}, renderRect), {
				x: this.size.startX + this.size.outerWidth - this.size.arrowIconSize - this.size.arrowIconMargin,
				y: renderRect.y + (renderRect.height - this.size.arrowIconSize) / 2,
				width: this.size.arrowIconSize,
				height: this.size.arrowIconSize
			}));
		};
		_proto.collectGroupBlocks = function collectGroupBlocks() {
			this.time.getGroups().forEach(([range, groupValue], groupPath) => {
				var block = this.collectGroupBlock(groupValue, range);
				if (block) this.groupBlocks.set(groupPath, block);
			});
		};
		_proto.collectGroupBlock = function collectGroupBlock(groupValue, range) {
			var groupBlock = this.getInitBlock(range);
			this.updateBlockXAndWidth(groupBlock, range);
			var title = getGroupValueText(groupValue);
			var isError = isGroupValueError(groupValue);
			this.updateBlockTitles(groupBlock, title, isError, { fontStyle: "bold" });
			return groupBlock;
		};
		_proto.getInitBlock = function getInitBlock(range) {
			var _a, _b;
			var isUnsetTime = range === null;
			var isInValid = this.isInValidTime(range);
			return {
				x: 0,
				width: 0,
				height: this.size.recordBlockHeight,
				background: style.color.timebarHeadBackground,
				days: isUnsetTime || isInValid ? 0 : this.getWorkDays(range),
				isInValid,
				isUnsetTime,
				titleTotalWidth: 0,
				startTime: (_a = range === null || range === void 0 ? void 0 : range[0]) !== null && _a !== void 0 ? _a : null,
				endTime: (_b = range === null || range === void 0 ? void 0 : range[1]) !== null && _b !== void 0 ? _b : null,
				hidden: false
			};
		};
		_proto.collectAllRecordBlocks = function collectAllRecordBlocks() {
			this.gridExtendApi.collector.dataUtil.getDisplayedRecordIds().forEach((recordId) => {
				var range = this.gridExtendApi.collector.dataUtil.getRecordRangeTime(recordId);
				var block = this.collectRecordBlock(recordId, range);
				if (block) this.recordBlocks.set(recordId, block);
			});
		};
		_proto.collectRecordBlock = function collectRecordBlock(recordId, range) {
			var recordBlock = this.getInitBlock(range);
			this.updateBlockXAndWidth(recordBlock, range);
			var colorInfo = getBlockStyle(recordId, this.blockColorHelper);
			recordBlock.background = colorInfo.background;
			recordBlock.borderColor = colorInfo.borderColor;
			var title = getRecordPrimaryTitle(recordId, this.recordTitleHelper);
			var isError = isPrimaryFormulaError(recordId, this.recordTitleHelper);
			this.updateBlockTitles(recordBlock, title, isError);
			return recordBlock;
		};
		_proto.updateBlockXAndWidth = function updateBlockXAndWidth(block, range) {
			if (block.isInValid || block.isUnsetTime || !range) return;
			var size = this.time.getTimeSize();
			var [start, end] = range;
			var days = getDaysBetween(start, end);
			var startIndex = timeToIndex(start, this.time);
			var endIndex = timeToIndex(end, this.time);
			var x = startIndex * size;
			var width = 0;
			switch (this.time.getType()) {
				case TimeType.Week:
				case TimeType.Month:
					width = (endIndex - startIndex + 1) * size;
					break;
				case TimeType.Quarter:
					var oneDayWidth = size / 7;
					var startDay = fixDayIndex(new Date(start).getDay());
					x += Math.floor(startDay * oneDayWidth);
					width = Math.floor(days * oneDayWidth);
					break;
				case TimeType.Year:
					if (isSameMonth(start, end)) {
						var monthDays = getDaysInMonth(start);
						var startInMonthIndex = getTimeInMonthIndex(start);
						x += Math.floor((startInMonthIndex - 1) / monthDays * size);
						width = Math.floor(days / monthDays * size);
					} else {
						var startMonthDays = getDaysInMonth(start);
						var startInMonthIndex1 = getTimeInMonthIndex(start);
						var startWidth = Math.floor((startMonthDays - startInMonthIndex1 + 1) / startMonthDays * size);
						var endMonthDays = getDaysInMonth(end);
						var endInMonthIndex = getTimeInMonthIndex(end);
						var endWidth = Math.floor(endInMonthIndex / endMonthDays * size);
						x += size - startWidth;
						width = startWidth + (endIndex - startIndex - 1) * size + endWidth;
					}
					break;
			}
			block.x = x;
			block.width = width;
		};
		_proto.updateBlockTitles = function updateBlockTitles(block, title, isError, titleStyle) {
			var _a, _b;
			var padding = style.size.timePadding;
			var iconSize = style.size.iconNormal;
			var iconWidth = iconSize + style.size.iconPadding;
			if (isError) block.iconConfig = pen.config.icon(NormalIconAlias.FAILED_ICON_GRAY, {
				x: block.x + padding,
				y: (block.height - iconSize) / 2,
				width: iconSize,
				height: iconSize,
				opacity: style.consts.errorOpacity
			});
			block.titleConfig = pen.config.text(Object.assign(Object.assign({
				text: title,
				x: isError ? block.x + padding + iconWidth : block.x + padding,
				y: 0,
				width: this.titleMaxWidth,
				height: block.height
			}, titleStyle), {
				color: block.isUnsetTime ? style.color.lightUltraFontColor : style.color.normalFontColor,
				opacity: isError ? style.consts.errorOpacity : titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.opacity,
				fontSize: style.size.fontSizeSmall
			}));
			var titleWidth = ((_b = (_a = block.titleConfig.layouts) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.width) || 0;
			block.titleTotalWidth = isError ? titleWidth + iconWidth : titleWidth;
			if (block.isInValid) return;
			var isIncludeHoliday = isCalcHoliday(this.gridExtendApi.collector.dataUtil.getGanttDateConfig());
			var subTitle = block.isUnsetTime ? i18n.t("（未设置时间）") : ` · ${block.days}${isIncludeHoliday ? i18n.t("天") : i18n.t("工作日")}`;
			var subTitleWidth = pen.util.measureTextWidth(subTitle);
			block.subTitleConfig = pen.config.text({
				text: subTitle,
				x: block.titleConfig.x + titleWidth,
				y: 0,
				width: subTitleWidth,
				height: this.size.recordBlockHeight,
				color: style.color.lightUltraFontColor,
				fontSize: style.size.fontSizeSmall
			});
			block.titleTotalWidth += subTitleWidth;
		};
		_proto.isInValidTime = function isInValidTime(range) {
			if (!range) return false;
			return range[0] > range[1];
		};
		_create_class$9(BlockCollector, [
			{
				key: "titleMaxWidth",
				get: function() {
					return Math.ceil(this.size.outerWidth / 4);
				}
			},
			{
				key: "recordTitleHelper",
				get: function() {
					var { dataUtil } = this.gridExtendApi.collector;
					return {
						getPrimaryFieldId: () => dataUtil.getPrimaryFieldId(),
						getCell: (fieldId, recordId) => dataUtil.getStandardCell(fieldId, recordId)
					};
				}
			},
			{
				key: "blockColorHelper",
				get: function() {
					var { dataUtil } = this.gridExtendApi.collector;
					return {
						getDateConfig: () => dataUtil.getGanttDateConfig(),
						getCell: (fieldId, recordId) => dataUtil.getStandardCell(fieldId, recordId)
					};
				}
			}
		]);
		return BlockCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/copyright.js
/**
* 获取单元格日期标题文案
* @param timeIndex
* @param timeCollector
* @returns
*/ function getUtitTitle(timeIndex, timeCollector) {
	var time = indexToTime(timeIndex, timeCollector);
	switch (timeCollector.getType()) {
		case TimeType.Week:
		case TimeType.Month:
			var day = (0, import_dayjs_min$3.default)(time);
			return `${day.date()} ${getWeekNames()[day.day()]}`;
		case TimeType.Quarter:
			var monday = (0, import_dayjs_min$3.default)(time).startOf("week");
			var sunday = (0, import_dayjs_min$3.default)(time).endOf("week");
			return i18n.t("{{dayFrom}}日 - {{dayTo}}日", {
				dayFrom: monday.date(),
				dayTo: sunday.date()
			});
		case TimeType.Year: return getI18nMonthText({ month: (0, import_dayjs_min$3.default)(time).month() + 1 });
	}
}
var import_dayjs_min$3, getTimeTypeTextMap;
var init_copyright = __esmMin((() => {
	import_dayjs_min$3 = /* @__PURE__ */ __toESM(require_dayjs_min());
	init_esm();
	init_es();
	init_transform_time();
	init_time$1();
	getTimeTypeTextMap = () => ({
		[TimeType.Week]: i18n.t(ua.isMobile ? "按周查看" : "周"),
		[TimeType.Month]: i18n.t(ua.isMobile ? "按月查看" : "月"),
		[TimeType.Quarter]: i18n.t(ua.isMobile ? "按季查看" : "季"),
		[TimeType.Year]: i18n.t(ua.isMobile ? "按年查看" : "年")
	});
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/collector/profile.js
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
var ProfileCollector;
var init_profile = __esmMin((() => {
	init_esm();
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_copyright();
	init_get_frozen_end_y();
	init_time$1();
	init_format_time();
	ProfileCollector = /* @__PURE__ */ function() {
		"use strict";
		function ProfileCollector(size, time, range, gridExtendApi) {
			this.size = size;
			this.time = time;
			this.range = range;
			this.gridExtendApi = gridExtendApi;
			this.headRadius = style.size.borderRadius;
			this.typeSwitchers = [];
			this.todaySwitchers = [];
			this.floatTitleRect = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			this.contentX = 0;
			this.contentY = 0;
			this.todayButtonWidth = 37;
			this.switchButtonWidth = 51;
			this.mobileButtonPadding = 28;
			this.minSwitchersWidth = 460;
			this.iconSize = ua.isMobile ? style.size.iconSmall : style.size.iconNormal;
			this.textFontSize = ua.isMobile ? style.size.fontSizeSmall : style.size.fontSizeNormal;
		}
		var _proto = ProfileCollector.prototype;
		_proto.collect = function collect() {
			this.collectExpandIcon();
			this.collectHeadRadius();
			if (ua.isMobile || this.size.outerWidth >= this.minSwitchersWidth) {
				this.collectTypeSwitchers();
				this.collectTodaySwitchers();
			}
			this.collectFloatTitleRect();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.collectExpandIcon = function collectExpandIcon() {
			var { size: gridSize, state } = this.gridExtendApi.collector;
			var { startX, startY, headPadding } = this.size;
			this.contentX = startX + style.size.timePadding;
			this.contentY = startY + headPadding + gridSize.fieldHeightGantt - gridSize.fieldHeightGrid - gridSize.fieldTopTextMarginBottom;
			if (ua.isMobile) return;
			this.expandIcon = pen.config.icon(state.isHideGrid ? NormalIconAlias.SUPER_NEXT : NormalIconAlias.SUPER_PREV, {
				x: this.contentX,
				y: this.contentY,
				width: this.iconSize,
				height: this.iconSize
			});
		};
		_proto.collectHeadRadius = function collectHeadRadius() {
			var gridHeadRadius = this.gridExtendApi.collector.profile.headRadius;
			if (ua.isMobile || !Array.isArray(gridHeadRadius)) return;
			var { borderRadius } = style.size;
			var { isHideGrid } = this.gridExtendApi.collector.state;
			if (gridHeadRadius[3] === 0) this.headRadius = [
				isHideGrid ? borderRadius : 0,
				borderRadius,
				0,
				0
			];
			else this.headRadius = [
				isHideGrid ? borderRadius : 0,
				borderRadius,
				borderRadius,
				isHideGrid ? borderRadius : 0
			];
		};
		_proto.collectTypeSwitchers = function collectTypeSwitchers() {
			this.typeSwitchers = [];
			var fixY = this.contentY;
			var delta = style.size.borderWidth * 3;
			var endX = this.size.startX + this.size.outerWidth - style.size.cellPadding - this.size.headPadding;
			if (ua.isMobile) {
				var dropDownRect = {
					x: endX - this.iconSize + this.size.headPadding,
					y: fixY,
					width: this.iconSize,
					height: this.iconSize
				};
				this.typeSwitchers.unshift(pen.config.icon(NormalIconAlias.DROPDOWN, dropDownRect));
				endX -= this.iconSize;
				var text = getTimeTypeTextMap()[this.time.getType()];
				var textWidth = pen.util.measureTextWidth(text);
				var textRect = {
					x: endX - textWidth + style.size.iconPadding,
					y: fixY,
					width: textWidth,
					height: this.iconSize
				};
				this.typeSwitchers.unshift(pen.config.text(Object.assign(Object.assign({ text }, textRect), { fontSize: this.textFontSize })));
				return;
			}
			var types = [
				TimeType.Week,
				TimeType.Month,
				TimeType.Quarter,
				TimeType.Year
			];
			var timeTypeTextMap = getTimeTypeTextMap();
			types.reverse().forEach((type) => {
				var buttonRect = {
					x: endX - this.switchButtonWidth,
					y: fixY,
					width: this.switchButtonWidth,
					height: this.iconSize
				};
				if (type === this.time.getType()) this.typeSwitchers.push(pen.config.rect(Object.assign(Object.assign({}, buttonRect), {
					borderRadius: style.size.borderRadius,
					background: style.color.normalBackground
				})));
				this.typeSwitchers.push(pen.config.text(Object.assign(Object.assign({
					id: type,
					text: timeTypeTextMap[type]
				}, buttonRect), { align: "center" })));
				endX -= this.switchButtonWidth;
			});
			this.typeSwitchers.unshift(pen.config.rect({
				x: endX - delta,
				y: fixY - delta,
				width: types.length * this.switchButtonWidth + delta * 2,
				height: this.iconSize + delta * 2,
				borderRadius: style.size.borderRadius,
				background: style.color.activedBackground
			}));
		};
		_proto.collectTodaySwitchers = function collectTodaySwitchers() {
			this.todaySwitchers = [];
			var { iconSize } = this;
			var fixY = this.contentY;
			var endX = this.typeSwitchers[0].x;
			var todayText = i18n.t("今天");
			var todayButtonWidth = Math.max(this.todayButtonWidth, pen.util.measureTextWidth(todayText, this.textFontSize) + style.size.cellPadding * 2);
			if (!ua.isMobile) {
				endX -= style.size.cellPadding * 2;
				this.todaySwitchers.push(pen.config.icon(NormalIconAlias.ARROW_NEXT, {
					id: NormalIconAlias.ARROW_NEXT,
					x: endX - iconSize,
					y: fixY,
					width: iconSize,
					height: iconSize
				}));
				endX -= iconSize;
			}
			this.todaySwitchers.push(pen.config.text({
				text: todayText,
				x: endX - todayButtonWidth - (ua.isMobile ? this.mobileButtonPadding : 0),
				y: fixY,
				width: todayButtonWidth,
				height: iconSize,
				align: "center",
				fontSize: this.textFontSize
			}));
			endX -= todayButtonWidth;
			if (!ua.isMobile) this.todaySwitchers.push(pen.config.icon(NormalIconAlias.ARROW_PREV, {
				id: NormalIconAlias.ARROW_PREV,
				x: endX - iconSize,
				y: fixY,
				width: iconSize,
				height: iconSize
			}));
		};
		_proto.collectFloatTitleRect = function collectFloatTitleRect() {
			var startX = this.contentX + (this.expandIcon ? this.iconSize + 2 * style.size.cellPadding : 0);
			var endX = (this.todaySwitchers.length ? this.todaySwitchers[this.todaySwitchers.length - 1].x : this.size.startX + this.size.outerWidth) - style.size.cellPadding;
			this.floatTitleRect = {
				x: startX,
				y: this.contentY,
				width: endX - startX,
				height: this.iconSize
			};
		};
		/**
		* 获取今日线在今日列中 x 轴的百分比
		*/ _proto.getLineRateInToday = function getLineRateInToday() {
			var today = getToday();
			switch (this.time.getType()) {
				case TimeType.Week:
				case TimeType.Month: return .5;
				case TimeType.Quarter: return (this.fixDayIndex(today.getDay()) * 2 + 1) / 14;
				case TimeType.Year:
					var days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
					return today.getDate() / days;
			}
		};
		/**
		* 周日下标变为 6
		* 一二三四五六日
		* 0123456
		* @param day
		* @returns
		*/ _proto.fixDayIndex = function fixDayIndex(day) {
			return day === 0 ? 6 : day - 1;
		};
		_create_class$8(ProfileCollector, [{
			key: "todayLineOffset",
			get: function() {
				var { todayRectSize } = this.size;
				var timeSize = this.time.getTimeSize();
				var todayIndex = this.range.getTodayIndex();
				var todayX = this.time.getTimeXByIndex(todayIndex) - this.range.scrollLeft;
				var todayXRate = this.getLineRateInToday();
				return todayX + (timeSize - todayRectSize) * todayXRate;
			}
		}, {
			key: "todayLineEndY",
			get: function() {
				var { collector: gridCollector } = this.gridExtendApi;
				return getFrozenEndY(gridCollector) - gridCollector.size.activityStartY;
			}
		}]);
		return ProfileCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/collector/range.js
var GanttLastTimeKey, GanttLastTimeOffsetKey, RangeCollector;
var init_range = __esmMin((() => {
	init_transform_time();
	init_format_time();
	GanttLastTimeKey = "GANTT_LAST_TIME";
	GanttLastTimeOffsetKey = "GANTT_LAST_TIME_OFFSET";
	RangeCollector = /* @__PURE__ */ function() {
		"use strict";
		function RangeCollector(size, time, gridExtendApi) {
			this.size = size;
			this.time = time;
			this.gridExtendApi = gridExtendApi;
			this.scrollLeft = 0;
			this.total = 0;
			this.views = 0;
			this.start = 0;
			this.end = 0;
			this.lastStartTime = 0;
			this.lastStartTimeOffset = 0;
			var lastGanttTime = this.gridExtendApi.context.liveState.get(GanttLastTimeKey);
			var lastGanttTimeOffset = this.gridExtendApi.context.liveState.get(GanttLastTimeOffsetKey);
			if (typeof lastGanttTime === "number" && typeof lastGanttTimeOffset === "number") {
				this.lastStartTime = lastGanttTime;
				this.lastStartTimeOffset = lastGanttTimeOffset;
			}
		}
		var _proto = RangeCollector.prototype;
		_proto.collect = function collect() {
			this.collectTotal();
			this.collectViews();
			this.collectScrollWidth();
			this.collectStart();
		};
		_proto.patch = function patch() {
			this.collect();
		};
		_proto.doRange = function doRange(callback) {
			for (var index = this.start; index < this.end; index++) {
				var { size: gridSize } = this.gridExtendApi.collector;
				var timeSize = this.time.getTimeSize();
				var unitRect = {
					x: this.size.startX + timeSize * index - this.scrollLeft,
					y: gridSize.globalPaddingTop + gridSize.fieldHeightGantt - gridSize.fieldHeightGrid,
					width: timeSize,
					height: gridSize.fieldHeightGrid
				};
				callback(index, unitRect);
			}
		};
		_proto.updateScrollLeft = function updateScrollLeft(scrollLeft) {
			var timeSize = this.time.getTimeSize();
			this.scrollLeft = Math.max(0, scrollLeft);
			this.scrollLeft = Math.min(this.size.scrollWidth - this.size.outerWidth, this.scrollLeft);
			var starts = Math.floor(this.scrollLeft / timeSize);
			this.lastStartTime = indexToTime(starts, this.time);
			this.lastStartTimeOffset = scrollLeft % timeSize;
			this.gridExtendApi.context.liveState.set(GanttLastTimeKey, this.lastStartTime);
			this.gridExtendApi.context.liveState.set(GanttLastTimeOffsetKey, this.lastStartTimeOffset);
			this.start = starts;
			this.end = starts + this.views;
		};
		_proto.getIndexByOffsetX = function getIndexByOffsetX(offsetX) {
			var timeSize = this.time.getTimeSize();
			var index = Math.floor((offsetX + this.scrollLeft - this.size.startX) / timeSize);
			return Math.max(0, Math.min(this.total - 1, index));
		};
		_proto.getTodayIndex = function getTodayIndex() {
			return timeToIndex(getToday().getTime(), this.time);
		};
		/**
		* 展示到今天
		*/ _proto.toToday = function toToday() {
			this.lastStartTime = 0;
			this.lastStartTimeOffset = 0;
			this.collectStart();
		};
		/**
		* 展示到上一个区间
		*/ _proto.toPrevRange = function toPrevRange() {
			this.start = Math.max(0, this.start - this.views + 1);
			this.end = this.start + this.views;
			this.updateScrollLeft(this.start * this.time.getTimeSize());
		};
		/**
		* 展示到下一个区间
		*/ _proto.toNextRange = function toNextRange() {
			this.end = Math.min(this.total, this.end + this.views - 1);
			if (this.end === this.total) {
				this.updateScrollLeft(this.total * this.time.getTimeSize() - this.size.globalRect.width);
				return;
			}
			this.start = this.end - this.views;
			this.updateScrollLeft(this.start * this.time.getTimeSize());
		};
		_proto.collectTotal = function collectTotal() {
			var { start, end } = this.time.getGlobalRange();
			this.total = getUnitsBetween(start, end, this.time);
		};
		_proto.collectScrollWidth = function collectScrollWidth() {
			this.size.setScrollWidth(this.time.getTimeSize() * this.total);
		};
		_proto.collectViews = function collectViews() {
			this.views = Math.ceil(this.size.outerWidth / this.time.getTimeSize()) + 1;
		};
		_proto.collectStart = function collectStart() {
			var start = this.lastStartTime;
			var startOffset = this.lastStartTime === 0 ? 0 : this.lastStartTimeOffset;
			if (this.lastStartTime === 0 && this.lastStartTimeOffset === 0) start = this.getTodayIndex() - Math.ceil(this.views / 2) + 1;
			else start = timeToIndex(this.lastStartTime, this.time);
			this.start = Math.max(0, Math.min(start, this.total - this.views));
			this.end = Math.min(this.total, this.start + this.views);
			if (start > this.total - this.views) {
				this.scrollLeft = this.total * this.time.getTimeSize() - this.size.globalRect.width;
				return;
			}
			this.scrollLeft = this.start * this.time.getTimeSize() + startOffset;
		};
		return RangeCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/collector/size.js
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
var SizeCollector;
var init_size = __esmMin((() => {
	init_style();
	SizeCollector = /* @__PURE__ */ function() {
		"use strict";
		function SizeCollector(gridExtendApi) {
			this.gridExtendApi = gridExtendApi;
			this.scrollWidth = 0;
		}
		var _proto = SizeCollector.prototype;
		/**
		* 设置滚动宽度
		* @param width
		*/ _proto.setScrollWidth = function setScrollWidth(width) {
			this.scrollWidth = width;
		};
		_proto.collect = function collect() {};
		_proto.patch = function patch() {};
		_create_class$7(SizeCollector, [
			{
				key: "startX",
				get: function() {
					var { state, size } = this.gridExtendApi.collector;
					return state.isHideGrid ? size.globalPaddingLeft : size.rootWidth;
				}
			},
			{
				key: "startY",
				get: function() {
					var { size: gridSize } = this.gridExtendApi.collector;
					return gridSize.globalPaddingTop;
				}
			},
			{
				key: "headPadding",
				get: function() {
					return 8;
				}
			},
			{
				key: "outerWidth",
				get: function() {
					var { size: gridSize, state } = this.gridExtendApi.collector;
					return gridSize.ganttRootWidth - gridSize.globalPaddingLeft - (state.isHideGrid ? gridSize.globalPaddingLeft : 0);
				}
			},
			{
				key: "headRect",
				get: function() {
					var { size: gridSize } = this.gridExtendApi.collector;
					return {
						x: this.startX,
						y: this.startY,
						width: this.outerWidth,
						height: gridSize.fieldHeightGantt
					};
				}
			},
			{
				key: "bodyRect",
				get: function() {
					var { size: gridSize } = this.gridExtendApi.collector;
					return {
						x: this.startX,
						y: 0,
						width: this.outerWidth,
						height: gridSize.globalRect.height - gridSize.activityStartY
					};
				}
			},
			{
				key: "globalRect",
				get: function() {
					return {
						x: this.startX,
						y: this.startY,
						width: this.outerWidth,
						height: this.gridExtendApi.collector.size.globalRect.height
					};
				}
			},
			{
				key: "groupBlockHeight",
				get: function() {
					return 6;
				}
			},
			{
				key: "recordBlockHeight",
				get: function() {
					return this.gridExtendApi.collector.size.minRowHeight - style.size.cellPadding;
				}
			},
			{
				key: "arrowIconSize",
				get: function() {
					return style.size.iconNormal;
				}
			},
			{
				key: "arrowIconMargin",
				get: function() {
					return 12;
				}
			},
			{
				key: "todayRectSize",
				get: function() {
					return 6;
				}
			},
			{
				key: "dragRectWidth",
				get: function() {
					return 9;
				}
			}
		]);
		return SizeCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/collector/time.js
function genEarliestTaskKey(groupPath) {
	return `FieldStatResult-earliestDate-${stringifyGroupPath(groupPath)}`;
}
function genLatestTaskKey(groupPath) {
	return `FieldStatResult-latestDate-${stringifyGroupPath(groupPath)}`;
}
function formatGlobalStart(time, type) {
	switch (type) {
		case TimeType.Week:
		case TimeType.Month: return time;
		case TimeType.Quarter: return toMondayTime(time);
		case TimeType.Year: return toMonthFirstDateTime(time);
	}
}
function formatGlobalEnd(time, type) {
	switch (type) {
		case TimeType.Week:
		case TimeType.Month: return time;
		case TimeType.Quarter: return toSundayTime(time);
		case TimeType.Year: return toMonthLastDateTime(time);
	}
}
var import_dayjs_min$2, TimeCollector;
var init_time = __esmMin((() => {
	import_dayjs_min$2 = /* @__PURE__ */ __toESM(require_dayjs_min());
	init_es$1();
	init_interface$9();
	init_storage_key();
	init_string_group_path();
	init_time$1();
	init_time_util();
	init_format_time();
	init_storage_sync();
	require_zh_cn();
	TimeCollector = /* @__PURE__ */ function() {
		"use strict";
		function TimeCollector(size, rangeAsyncTask, gridExtendApi) {
			this.size = size;
			this.rangeAsyncTask = rangeAsyncTask;
			this.gridExtendApi = gridExtendApi;
			this.type = TimeType.Month;
			this.startFieldId = "";
			this.endFieldId = "";
			this.groups = /* @__PURE__ */ new Map();
			this.hasChangeTypeBeforeUpdateGlobal = false;
			import_dayjs_min$2.default.locale("zh-cn");
			this.type = JSON.parse(getStorageValue(this.gridExtendApi.context, GridStorageType.TimeType) || String(TimeType.Month));
			this.initGlobalRange();
		}
		var _proto = TimeCollector.prototype;
		_proto.getFieldId = function getFieldId() {
			return {
				startFieldId: this.startFieldId,
				endFieldId: this.endFieldId
			};
		};
		_proto.setType = function setType(type) {
			this.type = type;
			this.hasChangeTypeBeforeUpdateGlobal = true;
			setStorageValue(this.gridExtendApi.context, GridStorageType.TimeType, String(this.type));
		};
		_proto.getType = function getType() {
			return this.type;
		};
		_proto.getTimeSize = function getTimeSize() {
			return TimeUnitWidths[this.type];
		};
		_proto.getGlobalRange = function getGlobalRange() {
			return {
				start: this.global[0],
				end: this.global[1]
			};
		};
		_proto.getGroups = function getGroups() {
			return this.groups;
		};
		/**
		* 获取指定时间单位的 x 坐标
		* @param timeIndex
		* @returns
		*/ _proto.getTimeXByIndex = function getTimeXByIndex(timeIndex) {
			return this.size.startX + timeIndex * this.getTimeSize();
		};
		_proto.collect = function collect() {
			this.beforeCollect();
			this.updateField();
			this.collectGlobalRange();
			this.collectGroupRange();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.beforeCollect = function beforeCollect() {
			this.groups.clear();
		};
		_proto.updateField = function updateField() {
			var dateConfig = this.gridExtendApi.collector.dataUtil.getGanttDateConfig();
			if (!dateConfig) return;
			var { startDateFieldId, endDateFieldId } = dateConfig;
			if (!startDateFieldId || !endDateFieldId) return;
			this.startFieldId = startDateFieldId;
			this.endFieldId = endDateFieldId;
		};
		_proto.collectGlobalRange = function collectGlobalRange() {
			var _a;
			var buffers = TimeBuffers[this.type];
			var range = (_a = this.calcGroupRange([])) !== null && _a !== void 0 ? _a : [this.global[0] + buffers, this.global[1] - buffers];
			var [start, end] = fixRange(range[0], range[1], true);
			var globalStart = formatGlobalStart(start - buffers, this.type);
			var today = getToday().getTime();
			var globalEnd = formatGlobalEnd(end < today ? today + buffers : end + buffers, this.type);
			if (globalStart < this.global[0] || this.hasChangeTypeBeforeUpdateGlobal) this.global[0] = globalStart;
			if (globalEnd > this.global[1] || this.hasChangeTypeBeforeUpdateGlobal) this.global[1] = globalEnd;
			this.hasChangeTypeBeforeUpdateGlobal = false;
		};
		_proto.initGlobalRange = function initGlobalRange() {
			var today = getToday().getTime();
			var buffers = TimeBuffers[this.type];
			this.global = [formatGlobalStart(today - buffers, this.type), formatGlobalEnd(today + buffers, this.type)];
		};
		_proto.collectGroupRange = function collectGroupRange() {
			if (!this.gridExtendApi.collector.dataUtil.hasGroup()) return;
			this.gridExtendApi.collector.rows.getTypeRows(RowType.GroupHead).forEach((groupHeadRowInfo) => {
				if (groupHeadRowInfo.type !== RowType.GroupHead) return;
				var { path, groupValue } = groupHeadRowInfo;
				var pathString = stringifyGroupPath(path);
				if (!this.groups.has(pathString)) this.groups.set(pathString, [this.calcGroupRange(path), groupValue]);
			});
		};
		_proto.calcGroupRange = function calcGroupRange(groupPath) {
			var _a, _b;
			var currentView = this.gridExtendApi.collector.dataUtil.getCurrentView();
			if ((currentView === null || currentView === void 0 ? void 0 : currentView.type) !== ViewType.GANTT) return null;
			var startTime = null;
			var endTime = null;
			var earliestDate = currentView.getEarliestDate(groupPath);
			if ((earliestDate === null || earliestDate === void 0 ? void 0 : earliestDate.resultType) === FieldStatResultType.SYNC) startTime = earliestDate.value ? earliestDate.value : null;
			else if ((earliestDate === null || earliestDate === void 0 ? void 0 : earliestDate.resultType) === FieldStatResultType.ASYNC) (_a = this.rangeAsyncTask) === null || _a === void 0 || _a.addTask(genEarliestTaskKey(groupPath), earliestDate.value);
			var latestDate = currentView.getLatestDate(groupPath);
			if ((latestDate === null || latestDate === void 0 ? void 0 : latestDate.resultType) === FieldStatResultType.SYNC) endTime = latestDate.value ? latestDate.value : null;
			else if ((latestDate === null || latestDate === void 0 ? void 0 : latestDate.resultType) === FieldStatResultType.ASYNC) (_b = this.rangeAsyncTask) === null || _b === void 0 || _b.addTask(genLatestTaskKey(groupPath), latestDate.value);
			return fixRange(startTime, endTime, false);
		};
		return TimeCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/collector/index.js
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
var import_throttle, import_dist, TimeLineCollector;
var init_collector = __esmMin((() => {
	import_throttle = /* @__PURE__ */ __toESM(require_throttle());
	import_dist = require_dist();
	init_block$1();
	init_profile();
	init_range();
	init_size();
	init_time();
	init_collector$1();
	TimeLineCollector = /* @__PURE__ */ function(BaseCollector) {
		"use strict";
		_inherits$17(TimeLineCollector, BaseCollector);
		function TimeLineCollector(context, gridExtendApi) {
			var _this = BaseCollector.call(this, context) || this;
			_this.context = context;
			_this.gridExtendApi = gridExtendApi;
			_this.rangeAsyncTask = _this._register(new import_dist.AsyncTaskManager());
			_this.size = new SizeCollector(_this.gridExtendApi);
			_this.time = new TimeCollector(_this.size, _this.rangeAsyncTask, _this.gridExtendApi);
			_this.range = new RangeCollector(_this.size, _this.time, _this.gridExtendApi);
			_this.profile = new ProfileCollector(_this.size, _this.time, _this.range, _this.gridExtendApi);
			_this.block = new BlockCollector(_this.size, _this.time, _this.range, _this.gridExtendApi);
			_this.rangeAsyncTask.registerTaskFinishCallback((0, import_throttle.default)(() => {
				_this.patch();
			}, 200));
			return _this;
		}
		var _proto = TimeLineCollector.prototype;
		_proto.handleCollect = function handleCollect() {
			this.time.collect();
			this.range.collect();
			this.profile.collect();
			this.block.collect();
		};
		_proto.handlePatch = function handlePatch(mutations) {
			this.time.patch(mutations);
			this.range.patch();
			this.profile.patch(mutations);
			this.block.patch(mutations);
		};
		_proto.handleResize = function handleResize() {
			this.size.patch();
			this.range.patch();
			this.profile.patch();
			this.block.patch();
		};
		return TimeLineCollector;
	}(BaseCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/common/scroller/interface.js
var IGanttScroller;
var init_interface$7 = __esmMin((() => {
	init_module();
	IGanttScroller = createDecorator("IGanttScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/get-fill-time-delta.js
function getFillTimeDelta(timeInfo, collector) {
	var { startFieldId, endFieldId } = collector.time.getFieldId();
	if (!startFieldId || !endFieldId) return null;
	var timeRange = getUnitTimeRange(timeInfo.timeStamp, collector.time);
	if (!timeRange) return null;
	return {
		[startFieldId]: timeRange[0],
		[endFieldId]: timeRange[1]
	};
}
function getUnitTimeRange(timeStamp, time) {
	var startTime = timeStamp;
	var endTime = 0;
	switch (time.getType()) {
		case TimeType.Week:
		case TimeType.Month:
			endTime = (0, import_dayjs_min$1.default)(startTime).endOf("day").valueOf();
			break;
		case TimeType.Quarter:
			endTime = (0, import_dayjs_min$1.default)(startTime).endOf("week").valueOf();
			break;
		case TimeType.Year:
			endTime = (0, import_dayjs_min$1.default)(startTime).endOf("month").valueOf();
			break;
	}
	return [startTime, endTime];
}
var import_dayjs_min$1;
var init_get_fill_time_delta = __esmMin((() => {
	import_dayjs_min$1 = /* @__PURE__ */ __toESM(require_dayjs_min());
	init_time$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/action.js
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
var import_main$6, GanttAction;
var init_action = __esmMin((() => {
	import_main$6 = require_main();
	init_resources();
	init_interface$7();
	init_get_fill_time_delta();
	init_interface$9();
	GanttAction = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$16(GanttAction, Disposable);
		function GanttAction(collector, timelineCollector, parentApi, timeline, emitter) {
			var _this = Disposable.call(this) || this;
			_this.collector = collector;
			_this.timelineCollector = timelineCollector;
			_this.parentApi = parentApi;
			_this.timeline = timeline;
			_this.emitter = emitter;
			return _this;
		}
		var _proto = GanttAction.prototype;
		_proto.clickGanttExpandIcon = function clickGanttExpandIcon() {
			var _a;
			this.collector.state.toggleHideGrid();
			this.collector.patch();
			(_a = this.timelineCollector) === null || _a === void 0 || _a.patch();
			this.parentApi.render();
		};
		_proto.clickTimeTypeSwitch = function clickTimeTypeSwitch(typeSwitcher) {
			var _a;
			if (typeof typeSwitcher.id !== "number") return;
			this.timelineCollector.time.setType(typeSwitcher.id);
			this.timelineCollector.patch();
			this.timeline.renderMain();
			(_a = this.parentApi.getFeature(IGanttScroller)) === null || _a === void 0 || _a.render();
		};
		_proto.clickTodayBarSwitch = function clickTodayBarSwitch(typeSwitcher) {
			var _a;
			switch (typeSwitcher.id) {
				case NormalIconAlias.ARROW_NEXT:
					this.timelineCollector.range.toNextRange();
					break;
				case NormalIconAlias.ARROW_PREV:
					this.timelineCollector.range.toPrevRange();
					break;
				default: this.timelineCollector.range.toToday();
			}
			this.timeline.renderMain();
			(_a = this.parentApi.getFeature(IGanttScroller)) === null || _a === void 0 || _a.render();
		};
		_proto.clickEmptyTimeBar = function clickEmptyTimeBar(timeInfo, rowInfo) {
			var delta = getFillTimeDelta(timeInfo, this.timelineCollector);
			if (!delta) return;
			var recordId = "";
			if (rowInfo.type === RowType.Record) {
				recordId = rowInfo.recordId;
				if (!recordId) return;
				this.emitter.service.ganttRecordFillTime.fire({
					recordId,
					cellValue: delta
				});
				this.updateRange(recordId);
			}
			if (rowInfo.type === RowType.RecordAdd) {
				var preRowInfo = this.collector.rows.getInfo(rowInfo.index - 1);
				var preRecordId = (preRowInfo === null || preRowInfo === void 0 ? void 0 : preRowInfo.type) === RowType.Record ? preRowInfo.recordId : "";
				this.emitter.service.addRecordClickEmitter.fire({
					recordId: preRecordId,
					cellValue: delta
				});
			}
		};
		_proto.clickHeadIcon = function clickHeadIcon(timeBlock) {
			var { time } = this.timelineCollector;
			this.timeline.scrollToX(timeBlock.block.x - time.getTimeSize());
		};
		_proto.clickTailIcon = function clickTailIcon(timeBlock) {
			var { time, size } = this.timelineCollector;
			this.timeline.scrollToX(timeBlock.block.x + timeBlock.renderRect.width - size.globalRect.width + time.getTimeSize());
		};
		_proto.clickGroupHead = function clickGroupHead(rowInfo) {
			this.parentApi.setGroupFold({
				fold: !rowInfo.fold,
				groupKeys: [rowInfo.path]
			});
			this.parentApi.renderMain();
		};
		_proto.updateRange = function updateRange(recordId) {
			var _a;
			var rowIndex = (_a = this.collector.rows.getInfoByRecordId(recordId)) === null || _a === void 0 ? void 0 : _a.index;
			if (!rowIndex) return;
			var range = {
				startRow: rowIndex,
				endRow: rowIndex,
				startColumn: 0,
				endColumn: 0
			};
			var activePoint = {
				row: rowIndex,
				column: 0
			};
			this.parentApi.getRangeModel().selectRange(range, activePoint);
		};
		return GanttAction;
	}(import_main$6.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/gantt-feature.js
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
var GanttFeatureBase;
var init_gantt_feature = __esmMin((() => {
	init_action();
	init_grid_feature();
	GanttFeatureBase = /* @__PURE__ */ function(GridFeatureBase) {
		"use strict";
		_inherits$15(GanttFeatureBase, GridFeatureBase);
		function GanttFeatureBase() {
			var _this = GridFeatureBase.apply(this, arguments) || this;
			_this.ganttAction = _this._register(new GanttAction(_this.collector, _this.timelineCollector, _this.parentApi, _this.timeline, _this.emitter));
			return _this;
		}
		_create_class$6(GanttFeatureBase, [{
			key: "timeline",
			get: function() {
				return this.parentApi.getGanttTimeLine();
			}
		}, {
			key: "timelineCollector",
			get: function() {
				return this.timeline.collector;
			}
		}]);
		return GanttFeatureBase;
	}(GridFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/common/scroller/main.js
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
var GanttScroller;
var init_main$8 = __esmMin((() => {
	init_esm();
	init_scroller$1();
	init_interface$7();
	init_gantt_feature();
	init_scroll_info();
	GanttScroller = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$14(GanttScroller, GanttFeatureBase);
		function GanttScroller() {
			var _this = GanttFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.updatePosition();
			};
			_this.isHovering = () => _this.horizontal.isHovering() || _this.horizontal.isDragging();
			return _this;
		}
		var _proto = GanttScroller.prototype;
		_proto.bootstrap = function bootstrap() {
			this.horizontal = this._register(new CommonScroller({
				horizontal: true,
				autoHide: ua.isMobile,
				id: "gantt-scroller",
				root: this.root,
				getViewRect: () => this.viewRect,
				getScrollLeft: () => this.timelineCollector.range.scrollLeft,
				getScrollWidth: () => this.timelineCollector.size.scrollWidth,
				scrollToX: (x) => {
					var _a;
					this.action.hideToolTip();
					(_a = this.timeline) === null || _a === void 0 || _a.scrollToX(x);
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
				id: IGanttScroller,
				isLock: () => this.isHovering()
			} };
		};
		_proto.updatePosition = function updatePosition() {
			this.horizontal.updatePosition();
		};
		_create_class$5(GanttScroller, [{
			key: "viewRect",
			get: function() {
				var { size: gridSize } = this.collector;
				var { size } = this.timelineCollector;
				return {
					x: size.globalRect.x * gridSize.scale,
					width: size.globalRect.width * gridSize.scale,
					y: gridSize.activityStartY * gridSize.scale,
					height: gridSize.activityViewHeight * gridSize.scale
				};
			}
		}]);
		return GanttScroller;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/common/scroller/index.js
var init_scroller = __esmMin((() => {
	init_main$8();
	init_interface$7();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/mobile/search/interface.js
var IGanttMobileSearch;
var init_interface$6 = __esmMin((() => {
	init_module();
	IGanttMobileSearch = createDecorator("IGanttMobileSearch");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/mobile/search/main.js
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
var GanttMobileSearch;
var init_main$7 = __esmMin((() => {
	init_pen();
	init_style();
	init_gantt_feature();
	GanttMobileSearch = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$13(GanttMobileSearch, GanttFeatureBase);
		function GanttMobileSearch() {
			return GanttFeatureBase.apply(this, arguments) || this;
		}
		var _proto = GanttMobileSearch.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.timelineCollector.size.globalRect));
			this.layer.addGroup(this.group);
		};
		_proto.render = function render() {
			this.group.clear();
			var highlightActive = this.collector.state.getHighlightActive();
			if (!highlightActive) return;
			var { fieldId, recordId } = highlightActive;
			if (!fieldId || !recordId) return;
			var rowInfo = this.collector.rows.getInfoByRecordId(recordId);
			if (!rowInfo) return;
			var blockInfo = this.timelineCollector.block.getRecordBlockRenderInfo(recordId, rowInfo);
			if (!blockInfo) return;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, blockInfo === null || blockInfo === void 0 ? void 0 : blockInfo.renderRect), {
				y: (blockInfo === null || blockInfo === void 0 ? void 0 : blockInfo.renderRect.y) + this.collector.size.activityStartY,
				borderWidth: style.size.borderWidth,
				borderColor: style.color.searchHighlightBorderColor,
				borderRadius: style.size.borderRadius
			})));
		};
		return GanttMobileSearch;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/mobile/search/index.js
var init_search = __esmMin((() => {
	init_interface$6();
	init_main$7();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/mobile/tap-interactive/main.js
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
var GanttMobileTapInteractive;
var init_main$6 = __esmMin((() => {
	init_es();
	init_es$1();
	init_lib();
	init_pen();
	init_style();
	init_gantt_feature();
	init_copyright();
	init_get_fill_time_delta();
	init_interface$9();
	init_is_in_rect();
	GanttMobileTapInteractive = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$12(GanttMobileTapInteractive, GanttFeatureBase);
		function GanttMobileTapInteractive() {
			var _this = GanttFeatureBase.apply(this, arguments) || this;
			_this.onTouchStart = () => {
				_this.group.clear();
			};
			_this.onTap = (evt) => {
				if (evt.target.isBlank) return;
				var { size } = _this.timelineCollector;
				var bodyStartY = size.startY + size.headRect.height;
				if (evt.y < bodyStartY) {
					_this.tapHead(evt.x, evt.y);
					return;
				}
				if (evt.target.rowInfo && evt.target.timeInfo && evt.y > bodyStartY) {
					_this.tapBody(evt.x, evt.y - bodyStartY, evt.target.timeInfo, evt.target.rowInfo);
					return;
				}
			};
			return _this;
		}
		var _proto = GanttMobileTapInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.timelineCollector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onTap(this.onTap));
			this._register(this.UIEvent.stage.onTouchStart(this.onTouchStart));
		};
		_proto.render = function render() {
			this.group.clear();
		};
		_proto.tapHead = function tapHead(x, y) {
			var expendDelta = 3;
			var { profile, time } = this.timelineCollector;
			var todayTextConfig = profile.todaySwitchers[0];
			if (todayTextConfig.type === DrawType.Text && isHitRect(x, y, todayTextConfig)) {
				this.group.add(pen.config.rect({
					x: todayTextConfig.x,
					y: todayTextConfig.y - expendDelta,
					width: todayTextConfig.width,
					height: todayTextConfig.height + expendDelta * 2,
					borderRadius: style.size.borderRadius,
					background: style.color.hoverBackground
				}));
				this.ganttAction.clickTodayBarSwitch(todayTextConfig);
				this.cancelTap();
			}
			if (profile.typeSwitchers.length === 2) {
				var textConfig = profile.typeSwitchers[0];
				var iconConfig = profile.typeSwitchers[1];
				var startX = textConfig.x;
				var endX = iconConfig.x + iconConfig.width;
				var typeSwitchRect = {
					x: textConfig.x - expendDelta * 2,
					y: iconConfig.y - expendDelta,
					width: endX - startX + expendDelta * 4,
					height: iconConfig.height + expendDelta * 2
				};
				if (isHitRect(x, y, typeSwitchRect)) {
					this.group.add(pen.config.rect({
						x: typeSwitchRect.x,
						y: typeSwitchRect.y,
						width: typeSwitchRect.width,
						height: typeSwitchRect.height,
						borderRadius: style.size.borderRadius,
						background: style.color.hoverBackground
					}));
					var timeTypeTextMap = getTimeTypeTextMap();
					this.emitter.service.ganttOpenDimensionSwitch.fire({
						selected: timeTypeTextMap[time.getType()],
						dimensions: Object.values(timeTypeTextMap)
					});
					this.cancelTap();
				}
			}
		};
		_proto.tapBody = function tapBody(x, y, timeInfo, rowInfo) {
			var { blockRenderInfo } = timeInfo;
			if (!blockRenderInfo) return;
			if (blockRenderInfo.headIcon && isHitRect(x, y, blockRenderInfo.headIcon)) {
				this.ganttAction.clickHeadIcon(blockRenderInfo);
				return;
			}
			if (blockRenderInfo.tailIcon && isHitRect(x, y, blockRenderInfo.tailIcon)) {
				this.ganttAction.clickTailIcon(blockRenderInfo);
				return;
			}
			if (rowInfo.type === RowType.Record && (blockRenderInfo === null || blockRenderInfo === void 0 ? void 0 : blockRenderInfo.block.isUnsetTime) === true) {
				this.recordFillTime(timeInfo, rowInfo);
				return;
			}
			if (!blockRenderInfo.isOutViewport && isHitRect(x, y, blockRenderInfo.renderRect) && rowInfo.type === RowType.Record) {
				this.action.expandRow(rowInfo.recordId);
				return;
			}
		};
		_proto.cancelTap = function cancelTap() {
			setTimeout(() => this.group.clear(), 300);
		};
		/**
		* @description 记录填充时间
		* @param {IActionTarget} actionTarget
		*/ _proto.recordFillTime = function recordFillTime(timeInfo, rowInfo) {
			var _a, _b;
			if (isTemplatePreview()) return;
			var context = this.collector.dataUtil.getContext();
			if (context.customConfig) return;
			var { recordId } = rowInfo;
			if (!recordId) return;
			var tableId = (_a = this.collector.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			var viewId = (_b = this.collector.dataUtil.getCurrentView()) === null || _b === void 0 ? void 0 : _b.id;
			if (!tableId || !viewId) return;
			var fillTimeDelta = getFillTimeDelta(timeInfo, this.timelineCollector);
			if (!fillTimeDelta) return;
			var delta = {};
			Object.keys(fillTimeDelta).forEach((fieldId) => {
				var _a;
				var field = (_a = this.collector.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getFieldByFieldId(fieldId);
				if ((field === null || field === void 0 ? void 0 : field.type) !== FieldType.DATE_TIME) return;
				delta[fieldId] = { value: fillTimeDelta[fieldId] };
			});
			if (!this.parentApi.getStatus().getPermissionStatus("canEditSelection", {
				fieldIds: Object.keys(delta),
				recordIds: [recordId]
			})) return;
			context.getBehaviorApi().setRecord({
				tableId,
				viewId,
				recordId,
				delta
			});
		};
		return GanttMobileTapInteractive;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/mobile/tap-interactive/interface.js
var IGanttMobileTapInteractive;
var init_interface$5 = __esmMin((() => {
	init_module();
	IGanttMobileTapInteractive = createDecorator("IGanttMobileTapInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/mobile/tap-interactive/index.js
var init_tap_interactive = __esmMin((() => {
	init_main$6();
	init_interface$5();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/mobile/entries.js
function getGanttMobileFeatures() {
	return [
		{
			ctor: GanttScroller,
			id: IGanttScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GanttMobileTapInteractive,
			id: IGanttMobileTapInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GanttMobileSearch,
			id: IGanttMobileSearch,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries$1 = __esmMin((() => {
	init_scroller();
	init_search();
	init_tap_interactive();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/common/auto-scroll/interface.js
var IGanttAutoScroll;
var init_interface$4 = __esmMin((() => {
	init_module();
	IGanttAutoScroll = createDecorator("IGanttAutoScroll");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/common/auto-scroll/main.js
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
var GanttAutoScroll;
var init_main$5 = __esmMin((() => {
	init_auto_scroll$2();
	init_gantt_feature();
	GanttAutoScroll = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$11(GanttAutoScroll, GanttFeatureBase);
		function GanttAutoScroll() {
			var _this = GanttFeatureBase.apply(this, arguments) || this;
			_this.preventAutoX = false;
			return _this;
		}
		var _proto = GanttAutoScroll.prototype;
		_proto.bootstrap = function bootstrap() {
			this.autoScroll = this._register(new AutoScroll({
				scrollToX: (scrollX) => {
					var _a;
					return (_a = this.timeline) === null || _a === void 0 ? void 0 : _a.scrollToX(scrollX);
				},
				scrollToY: () => {},
				getRoot: () => this.context.getRenderRoot(),
				getScrollLeft: () => this.timelineCollector.range.scrollLeft,
				getScrollTop: () => this.collector.range.scrollTop,
				getScale: () => this.collector.size.scale,
				getBoundRect: () => {
					var { size } = this.timelineCollector;
					return {
						left: size.globalRect.x,
						right: size.globalRect.x + size.globalRect.width,
						top: size.startY,
						bottom: size.startY + size.globalRect.height
					};
				},
				preventX: () => this.preventAutoX
			}));
		};
		_proto.togglePreventAutoScroll = function togglePreventAutoScroll(prevent) {
			this.preventAutoX = prevent;
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
		return GanttAutoScroll;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/common/auto-scroll/index.js
var init_auto_scroll = __esmMin((() => {
	init_interface$4();
	init_main$5();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/area-interactive/interface.js
var IGanttAreaInteractive;
var init_interface$3 = __esmMin((() => {
	init_module();
	IGanttAreaInteractive = createDecorator("IGanttAreaInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/area-interactive/main.js
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
var GanttAreaInteractive;
var init_main$4 = __esmMin((() => {
	init_es();
	init_interface$8();
	init_pen();
	init_work_day();
	init_resources();
	init_style();
	init_gantt_feature();
	init_interface$3();
	init_interface$9();
	init_cursor();
	init_time$1();
	init_is_in_rect();
	GanttAreaInteractive = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$10(GanttAreaInteractive, GanttFeatureBase);
		function GanttAreaInteractive() {
			var _this = GanttFeatureBase.apply(this, arguments) || this;
			_this.offsetX = 0;
			_this.offsetY = 0;
			_this.isHoverIcon = false;
			_this.clearBeforeAnyHover = () => {
				_this.setCursor(Cursor.DEFAULT);
				_this.group.clear();
				_this.rowGroup.clear();
			};
			_this.onStageMouseMove = (evt) => {
				var _a;
				var { size: timelineSize } = _this.timelineCollector;
				if (evt.x < timelineSize.startX || _this.isPreventFromOtherFeature()) {
					_this.group.clear();
					_this.rowGroup.clear();
					return;
				}
				_this.clearBeforeAnyHover();
				_this.action.hideToolTip();
				_this.offsetX = evt.x;
				_this.offsetY = evt.y;
				var { timeInfo, rowInfo } = evt.target;
				if (!timeInfo) return;
				_this.group.setAttrs(timelineSize.globalRect);
				_this.rowGroup.setAttrs(_this.collector.size.globalViewBodyRect);
				_this.hoverFestival(timeInfo);
				_this.hoverHoliday(timeInfo);
				if ((_a = _this.expandHoverInfo) === null || _a === void 0 ? void 0 : _a.timeInfo.blockRenderInfo) {
					var bodyRect = Object.assign(Object.assign({}, _this.timelineCollector.size.bodyRect), { y: _this.collector.size.activityStartY });
					var { renderRect } = _this.expandHoverInfo.timeInfo.blockRenderInfo;
					var minBlockWidth = _this.timelineCollector.time.getTimeSize() / 2;
					var blockRect = Object.assign(Object.assign({}, renderRect), {
						y: renderRect.y + _this.collector.size.activityStartY,
						width: minBlockWidth
					});
					if (!isHitRect(_this.offsetX, _this.offsetY, bodyRect) || !isHitRect(_this.offsetX, _this.offsetY, blockRect)) _this.recoverBlock();
				}
				if (isHitRect(_this.offsetX, _this.offsetY, timelineSize.headRect)) {
					_this.hoverHead(timeInfo);
					return;
				}
				var bodyRect1 = Object.assign(Object.assign({}, timelineSize.bodyRect), { y: _this.collector.size.activityStartY });
				if (isHitRect(_this.offsetX, _this.offsetY, bodyRect1) && rowInfo) {
					_this.hoverBody(timeInfo, rowInfo);
					return;
				}
			};
			_this.onResize = () => {
				_this.group.setAttrs(_this.timelineCollector.size.globalRect);
				_this.rowGroup.setAttrs(_this.collector.size.globalViewBodyRect);
				_this.render();
			};
			_this.recoverBlock = () => {
				var _a, _b, _c;
				if (!((_a = _this.expandHoverInfo) === null || _a === void 0 ? void 0 : _a.timeInfo.blockRenderInfo) || ((_b = _this.expandHoverInfo) === null || _b === void 0 ? void 0 : _b.rowInfo.type) !== RowType.Record) return;
				_this.timelineCollector.block.setBlockWidth(_this.expandHoverInfo.rowInfo.recordId, _this.expandHoverInfo.timeInfo.blockRenderInfo.renderRect.width);
				_this.expandHoverInfo = void 0;
				(_c = _this.timeline) === null || _c === void 0 || _c.renderMain();
			};
			return _this;
		}
		var _proto = GanttAreaInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.timelineCollector.size.globalRect));
			this.rowGroup = this._register(pen.group(this.collector.size.globalViewBodyRect));
			this.layer.addGroup(this.group);
			this.layer.addGroup(this.rowGroup);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.stage.onMouseLeave(this.clearBeforeAnyHover));
			this._register(this.UIEvent.stage.onResize(this.onResize));
			this._register(this.UIEvent.stage.onMouseDown(this.recoverBlock));
		};
		_proto.render = function render() {
			this.clearBeforeAnyHover();
			this.action.hideToolTip();
			this.recoverBlock();
		};
		_proto.hoverHead = function hoverHead(_timeInfo) {
			var { expandIcon, typeSwitchers, todaySwitchers } = this.timelineCollector.profile;
			if (expandIcon && isHitRect(this.offsetX, this.offsetY, expandIcon)) this.hoverExpandIcon(expandIcon);
			var timeTypeSwitchArea = typeSwitchers[0];
			if (timeTypeSwitchArea && isHitRect(this.offsetX, this.offsetY, timeTypeSwitchArea)) this.hoverTimeTypeSwitchers(typeSwitchers);
			if (todaySwitchers) todaySwitchers.forEach((todaySwitcher) => {
				if (todaySwitcher.type === DrawType.Line) return;
				if (isHitRect(this.offsetX, this.offsetY, todaySwitcher)) this.hoverTodayBarSwitchers(todaySwitcher);
			});
		};
		_proto.hoverExpandIcon = function hoverExpandIcon(expandIcon) {
			this.group.add(pen.config.rect({
				x: expandIcon.x,
				y: expandIcon.y,
				width: expandIcon.width,
				height: expandIcon.height,
				borderRadius: style.size.borderRadius,
				background: style.color.hoverBackground,
				onClick: () => {
					this.ganttAction.clickGanttExpandIcon();
					this.UIEvent.stage.forceTriggerResize();
				}
			}));
			this.setCursor(Cursor.POINTER);
			this.action.showToolTip(this.tipText.getGanttExpandAreaTip(this.collector.state.isHideGrid), expandIcon);
		};
		_proto.hoverTimeTypeSwitchers = function hoverTimeTypeSwitchers(typeSwitchers) {
			var { time } = this.timelineCollector;
			typeSwitchers.forEach((typeSwitcher) => {
				if (typeSwitcher.type !== DrawType.Text || typeSwitcher.id === time.getType()) return;
				if (!isHitRect(this.offsetX, this.offsetY, typeSwitcher)) return;
				this.group.add(pen.config.rect({
					x: typeSwitcher.x,
					y: typeSwitcher.y,
					width: typeSwitcher.width,
					height: typeSwitcher.height,
					onClick: () => this.ganttAction.clickTimeTypeSwitch(typeSwitcher)
				}));
				this.setCursor(Cursor.POINTER);
			});
		};
		_proto.hoverTodayBarSwitchers = function hoverTodayBarSwitchers(todaySwitcher) {
			var hoverRect = {
				x: todaySwitcher.x,
				y: todaySwitcher.y,
				width: todaySwitcher.width,
				height: todaySwitcher.height,
				borderRadius: style.size.borderRadius,
				background: style.color.hoverBackground,
				onClick: () => this.ganttAction.clickTodayBarSwitch(todaySwitcher)
			};
			this.group.add(pen.config.rect(hoverRect));
			this.setCursor(Cursor.POINTER);
			var todayBarToolTip = this.tipText.getGanttTodayBarTip(todaySwitcher);
			if (todayBarToolTip) this.action.showToolTip(todayBarToolTip, hoverRect);
		};
		_proto.hoverBody = function hoverBody(timeInfo, rowInfo) {
			this.isHoverIcon = false;
			this.hoverGanttBody(rowInfo);
			var { blockRenderInfo } = timeInfo;
			if (rowInfo.type === RowType.Record && (blockRenderInfo === null || blockRenderInfo === void 0 ? void 0 : blockRenderInfo.block.isUnsetTime) === true || rowInfo.type === RowType.RecordAdd) this.hoverEmptyTimeBar(timeInfo, rowInfo);
			if (rowInfo.type === RowType.GroupHead) this.hoverGroupHead(rowInfo);
			if (!blockRenderInfo) return;
			if (blockRenderInfo.headIcon && isHitRect(this.offsetX, this.offsetY, Object.assign(Object.assign({}, blockRenderInfo.headIcon), { y: blockRenderInfo.headIcon.y + this.collector.size.activityStartY }))) {
				this.hoverHeadIcon(blockRenderInfo, rowInfo);
				this.isHoverIcon = true;
				return;
			}
			if (blockRenderInfo.tailIcon && isHitRect(this.offsetX, this.offsetY, Object.assign(Object.assign({}, blockRenderInfo.tailIcon), { y: blockRenderInfo.tailIcon.y + this.collector.size.activityStartY }))) {
				this.hoverTailIcon(blockRenderInfo);
				this.isHoverIcon = true;
				return;
			}
			if (rowInfo.type === RowType.Record && (blockRenderInfo === null || blockRenderInfo === void 0 ? void 0 : blockRenderInfo.isOutViewport) === false) this.hoverRecordBlock(timeInfo, rowInfo);
		};
		_proto.hoverGanttBody = function hoverGanttBody(rowInfo) {
			if (![RowType.Record, RowType.RecordAdd].includes(rowInfo.type)) return;
			var innerRect = this.collector.getInnerRect(rowInfo);
			this.rowGroup.add(pen.config.rect(Object.assign(Object.assign({}, innerRect), {
				y: innerRect.y + this.collector.size.activityStartY,
				width: innerRect.width + this.timelineCollector.size.outerWidth,
				background: style.color.hoverBackground
			})));
		};
		_proto.hoverEmptyTimeBar = function hoverEmptyTimeBar(timeInfo, rowInfo) {
			var { borderRadius } = style.size;
			var { time, size, range } = this.timelineCollector;
			var emptyRect = {
				x: size.startX - range.scrollLeft + timeInfo.index * time.getTimeSize() + style.size.iconPadding,
				y: rowInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop + style.size.iconPadding,
				width: time.getTimeSize() - style.size.iconPadding * 2,
				height: rowInfo.height - style.size.iconPadding * 2
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, emptyRect), {
				borderRadius,
				borderDash: true,
				borderWidth: style.size.borderWidth,
				onClick: () => {
					var _a;
					var recordId = rowInfo.type === RowType.Record ? (_a = rowInfo.recordId) !== null && _a !== void 0 ? _a : "" : "";
					if (this.tryFireWbTodoCardClick({
						recordId,
						time: timeInfo.timeStamp
					})) return;
					this.ganttAction.clickEmptyTimeBar(timeInfo, rowInfo);
				}
			})));
			var addIconSize = style.size.iconSmall;
			this.group.add(pen.config.icon(NormalIconAlias.BASE_ADD, {
				x: emptyRect.x + emptyRect.width / 2 - addIconSize / 2,
				y: emptyRect.y + emptyRect.height / 2 - addIconSize / 2,
				width: addIconSize,
				height: addIconSize
			}));
			this.setCursor(Cursor.POINTER);
			var tipText = "";
			if (rowInfo.type === RowType.RecordAdd) tipText = this.tipText.getAddOneRowTip();
			else tipText = this.tipText.getGanttEmptyRecordTip();
			this.action.showToolTip(tipText, emptyRect);
		};
		_proto.hoverGroupHead = function hoverGroupHead(rowInfo) {
			var groupRect = {
				x: this.timelineCollector.size.startX,
				y: rowInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop,
				width: this.timelineCollector.size.globalRect.width,
				height: rowInfo.height
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, groupRect), { onClick: () => {
				if (!this.isHoverIcon) this.ganttAction.clickGroupHead(rowInfo);
			} })));
			this.setCursor(Cursor.POINTER);
		};
		_proto.hoverHeadIcon = function hoverHeadIcon(timeBlock, rowInfo) {
			var _a, _b;
			if (((_a = timeBlock.headIcon) === null || _a === void 0 ? void 0 : _a.id) === NormalIconAlias.TIME_PREV) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, timeBlock.headIcon), {
					y: timeBlock.headIcon.y + this.collector.size.activityStartY,
					borderRadius: style.size.borderRadius,
					background: style.color.activedBackground,
					onClick: () => this.ganttAction.clickHeadIcon(timeBlock)
				})));
				this.action.hideToolTip();
			}
			if (((_b = timeBlock.headIcon) === null || _b === void 0 ? void 0 : _b.id) === NormalIconAlias.TIP_BLUE) {
				if (rowInfo.type !== RowType.Record) return;
				var { recordId } = rowInfo;
				var headIconRect = Object.assign(Object.assign({}, timeBlock.headIcon), { y: timeBlock.headIcon.y + this.collector.size.activityStartY });
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, headIconRect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius,
					onClick: () => this.action.expandRow(recordId)
				})));
				this.action.showToolTip(this.tipText.getGanttTimeError(), headIconRect);
			}
			this.setCursor(Cursor.POINTER);
		};
		_proto.hoverTailIcon = function hoverTailIcon(timeBlock) {
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, timeBlock.tailIcon), {
				y: timeBlock.tailIcon.y + this.collector.size.activityStartY,
				background: style.color.activedBackground,
				borderRadius: style.size.borderRadius,
				onClick: () => this.ganttAction.clickTailIcon(timeBlock)
			})));
			this.setCursor(Cursor.POINTER);
			this.action.hideToolTip();
		};
		_proto.hoverFestival = function hoverFestival(timeInfo) {
			var timeType = this.timelineCollector.time.getType();
			if (timeType === TimeType.Quarter || timeType === TimeType.Year) return;
			var festival = WorkDayService.getTimestampFestival(timeInfo.timeStamp);
			if (!festival || festival.dayIndex !== 1) return;
			var { size, time, range } = this.timelineCollector;
			var { size: gridSize } = this.collector;
			var textRect = {
				x: size.startX + time.getTimeSize() * timeInfo.index - range.scrollLeft,
				y: gridSize.globalPaddingTop + gridSize.fieldHeightGantt - gridSize.fieldHeightGrid,
				width: time.getTimeSize(),
				height: gridSize.fieldHeightGrid - style.size.borderWidth
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, textRect), { background: style.color.normalBackground })));
			this.group.add(pen.config.text(Object.assign(Object.assign({}, textRect), {
				text: festival.festivalName,
				align: "center"
			})));
		};
		_proto.hoverHoliday = function hoverHoliday(timeInfo) {
			var timeType = this.timelineCollector.time.getType();
			if (timeType === TimeType.Quarter || timeType === TimeType.Year) return;
			var holiday = WorkDayService.getTimestampHoliday(timeInfo.timeStamp);
			if (!(holiday === null || holiday === void 0 ? void 0 : holiday.holidayName)) return;
			var { size, time, range } = this.timelineCollector;
			var { size: gridSize } = this.collector;
			this.action.showToolTip(holiday.holidayName, {
				x: size.startX + time.getTimeSize() * timeInfo.index - range.scrollLeft,
				y: gridSize.globalPaddingTop + gridSize.fieldHeightGantt - gridSize.fieldHeightGrid,
				width: time.getTimeSize(),
				height: gridSize.fieldHeightGrid - style.size.borderWidth
			});
		};
		_proto.hoverRecordBlock = function hoverRecordBlock(timeInfo, rowInfo) {
			var _a;
			if (!timeInfo.blockRenderInfo || rowInfo.type !== RowType.Record) return;
			var { renderRect, block } = timeInfo.blockRenderInfo;
			var { time } = this.timelineCollector;
			var minBlockWidth = time.getTimeSize() / 2;
			var blockRect = Object.assign(Object.assign({}, renderRect), {
				y: renderRect.y + this.collector.size.activityStartY,
				width: renderRect.width < minBlockWidth ? minBlockWidth : renderRect.width
			});
			if (!isHitRect(this.offsetX, this.offsetY, blockRect)) return;
			if (renderRect.width < minBlockWidth) {
				this.expandHoverInfo = {
					timeInfo,
					rowInfo
				};
				this.timelineCollector.block.setBlockWidth(rowInfo.recordId, minBlockWidth, timeInfo.blockRenderInfo.block.width);
				(_a = this.timeline) === null || _a === void 0 || _a.renderMain();
			}
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, blockRect), { onClick: () => {
				var _a;
				if (this.tryFireWbTodoCardClick({
					recordId: (_a = rowInfo.recordId) !== null && _a !== void 0 ? _a : "",
					time: timeInfo.timeStamp
				})) return;
				this.action.expandRow(rowInfo.recordId);
			} })));
			var tooltipRect = {
				x: this.offsetX,
				y: blockRect.y - rowInfo.height + renderRect.height,
				width: 0,
				height: rowInfo.height
			};
			this.action.showToolTip(this.tipText.getTooltipTitle(block.startTime, block.endTime, timeInfo.blockRenderInfo.block.days), tooltipRect);
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGanttAreaInteractive);
		};
		/**
		* wb 模式下，将"空白时间槽点击（添加记录）"和"时间条点击"代理给外部业务侧。
		* @param payload.recordId 时间条/已存在记录上的空白槽传 recordId；末行 RecordAdd 等无 recordId 场景传空串
		* @param payload.time 该交互对应的时间戳（毫秒），用于外部新建记录时预填时间字段
		* @returns 是否已被 wb 拦截（true 表示调用方应 return，不再执行原有点击逻辑）
		*/ _proto.tryFireWbTodoCardClick = function tryFireWbTodoCardClick(payload) {
			if (!domainConfig.getIsWb()) return false;
			this.emitter.wbService.onRecordClick.fire(payload);
			return true;
		};
		return GanttAreaInteractive;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/area-interactive/index.js
var init_area_interactive = __esmMin((() => {
	init_main$4();
	init_interface$3();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/block-drag/interface.js
var IGanttBlockDrag;
var init_interface$2 = __esmMin((() => {
	init_module();
	IGanttBlockDrag = createDecorator("IGanttBlockDrag");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/get-time-by-block-x.js
function getExactTimeByBlockX(x, timeCollector) {
	var timeType = timeCollector.getType();
	var timeSize = timeCollector.getTimeSize();
	if (timeType === TimeType.Week || timeType === TimeType.Month) return indexToTime(Math.round(x / timeSize), timeCollector);
	if (timeType === TimeType.Quarter) {
		var startIndex1 = Math.floor(x / timeSize);
		var offsetDay = Math.floor((x - startIndex1 * timeSize) / timeSize * 7);
		return getAfterDaysTime(indexToTime(startIndex1, timeCollector), offsetDay);
	}
	var startIndex2 = Math.floor(x / timeSize);
	var startIndexTime = indexToTime(startIndex2, timeCollector);
	var daysInMonth = getDaysInMonth(startIndexTime);
	return getAfterDaysTime(startIndexTime, Math.floor((x - startIndex2 * timeSize) / timeSize * daysInMonth));
}
var init_get_time_by_block_x = __esmMin((() => {
	init_transform_time();
	init_time$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/is-hover-gantt-feature.js
function isHoverGanttBlockIcon(x, y, timeInfo, collector) {
	var { blockRenderInfo } = timeInfo;
	if ((blockRenderInfo === null || blockRenderInfo === void 0 ? void 0 : blockRenderInfo.headIcon) && isHitRect(x, y, Object.assign(Object.assign({}, blockRenderInfo.headIcon), { y: blockRenderInfo.headIcon.y + collector.size.activityStartY }))) return true;
	if ((blockRenderInfo === null || blockRenderInfo === void 0 ? void 0 : blockRenderInfo.tailIcon) && isHitRect(x, y, Object.assign(Object.assign({}, blockRenderInfo.tailIcon), { y: blockRenderInfo.tailIcon.y + collector.size.activityStartY }))) return true;
	return false;
}
function isInBlockBody(x, y, rowInfo, timeInfo, collector, timelineCollector) {
	var bodyRect = Object.assign(Object.assign({}, timelineCollector.size.bodyRect), { y: collector.size.activityStartY });
	if (!(timeInfo === null || timeInfo === void 0 ? void 0 : timeInfo.blockRenderInfo) || !isHitRect(x, y, bodyRect)) return false;
	var { block } = timeInfo.blockRenderInfo;
	var { range } = timelineCollector;
	if (isHitRect(x, y, {
		x: block.x - range.scrollLeft + timelineCollector.size.startX,
		y: rowInfo.y + collector.size.activityStartY - collector.range.scrollTop,
		width: block.width,
		height: rowInfo.height
	})) return true;
	return false;
}
function isInBlockHeadDrag(x, y, timeInfo, collector, timelineCollector) {
	var bodyRect = Object.assign(Object.assign({}, timelineCollector.size.bodyRect), { y: collector.size.activityStartY });
	if (!(timeInfo === null || timeInfo === void 0 ? void 0 : timeInfo.blockRenderInfo) || !isHitRect(x, y, bodyRect)) return false;
	var { dragRectWidth } = timelineCollector.size;
	var { renderRect } = timeInfo.blockRenderInfo;
	if (isHitRect(x, y, Object.assign(Object.assign({}, renderRect), {
		y: renderRect.y + collector.size.activityStartY,
		width: dragRectWidth
	}))) return true;
	return false;
}
function isInBlockTailDrag(x, y, timeInfo, collector, timelineCollector) {
	var bodyRect = Object.assign(Object.assign({}, timelineCollector.size.bodyRect), { y: collector.size.activityStartY });
	if (!(timeInfo === null || timeInfo === void 0 ? void 0 : timeInfo.blockRenderInfo) || !isHitRect(x, y, bodyRect)) return false;
	var { dragRectWidth } = timelineCollector.size;
	var { block, renderRect } = timeInfo.blockRenderInfo;
	if (isHitRect(x, y, {
		x: renderRect.x + block.width - dragRectWidth,
		y: renderRect.y + collector.size.activityStartY,
		width: dragRectWidth,
		height: renderRect.height
	})) return true;
	return false;
}
var init_is_hover_gantt_feature = __esmMin((() => {
	init_is_in_rect();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/utils/render-block-titles.js
function renderTitles(container, info, collector, rect) {
	var { block } = info;
	var renderRect = rect ? rect : info.renderRect;
	if (!block.titleConfig) return;
	var offsetX = renderRect.x - block.x;
	var titleX = block.iconConfig ? block.iconConfig.x : block.titleConfig.x;
	var { size } = collector;
	var textMariginLeft = block.isUnsetTime && !info.headIcon ? size.arrowIconMargin : size.arrowIconMargin * 2 + size.arrowIconSize;
	var minX = size.startX + textMariginLeft;
	var maxX = size.startX + size.outerWidth - textMariginLeft - block.titleTotalWidth + style.size.tagMargin;
	var titleAcutalX = titleX + offsetX;
	if (titleAcutalX < minX) offsetX = minX - titleX;
	else if (titleAcutalX > maxX) offsetX = maxX - titleX;
	var offsetY = renderRect.y;
	if (block.iconConfig) container.add(block.iconConfig, offsetX, offsetY);
	container.add(block.titleConfig, offsetX, offsetY);
	if (block.subTitleConfig) container.add(block.subTitleConfig, offsetX, offsetY);
}
var init_render_block_titles = __esmMin((() => {
	init_style();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/block-drag/main.js
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
var GanttBlockDrag;
var init_main$3 = __esmMin((() => {
	init_pen();
	init_style();
	init_auto_scroll();
	init_gantt_feature();
	init_interface$2();
	init_get_time_by_block_x();
	init_is_hover_gantt_feature();
	init_render_block_titles();
	init_transform_time();
	init_interface$9();
	init_cursor();
	init_time$1();
	init_register_esc_to_cancel();
	GanttBlockDrag = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$9(GanttBlockDrag, GanttFeatureBase);
		function GanttBlockDrag() {
			var _this = GanttFeatureBase.apply(this, arguments) || this;
			_this.dragBuffer = 6;
			_this.isInDragging = false;
			_this.isReadyToDrag = false;
			_this.isHeadDragging = false;
			_this.isTailDragging = false;
			_this.onStageMousemove = (evt) => {
				_this.group.clear();
				if (_this.isReadyToDrag || _this.isPreventFromOtherFeature()) return;
				var { rowInfo, timeInfo } = evt.target;
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record || !(timeInfo === null || timeInfo === void 0 ? void 0 : timeInfo.blockRenderInfo)) return;
				if (isHoverGanttBlockIcon(evt.x, evt.y, timeInfo, _this.collector)) return;
				if (isInBlockBody(evt.x, evt.y, rowInfo, timeInfo, _this.collector, _this.timelineCollector)) _this.showBlockDragRect(Object.assign(Object.assign({}, timeInfo.blockRenderInfo.renderRect), { y: timeInfo.blockRenderInfo.renderRect.y + _this.collector.size.activityStartY }));
				if (isInBlockHeadDrag(evt.x, evt.y, timeInfo, _this.collector, _this.timelineCollector) || isInBlockTailDrag(evt.x, evt.y, timeInfo, _this.collector, _this.timelineCollector)) {
					_this.setCursor(Cursor.EW_RESIZE);
					return;
				}
			};
			_this.onStageMousedown = (evt) => {
				var { target } = evt;
				var { rowInfo, timeInfo } = target;
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record || !timeInfo || isHoverGanttBlockIcon(evt.x, evt.y, timeInfo, _this.collector) || !_this.canEditTime()) return;
				if (isInBlockHeadDrag(evt.x, evt.y, timeInfo, _this.collector, _this.timelineCollector)) {
					_this.isHeadDragging = true;
					_this.readyToDrag(timeInfo, rowInfo, evt.x);
				}
				if (isInBlockTailDrag(evt.x, evt.y, timeInfo, _this.collector, _this.timelineCollector)) {
					_this.isTailDragging = true;
					_this.readyToDrag(timeInfo, rowInfo, evt.x);
				}
			};
			_this.onWindowMouseMove = (evt) => {
				var _a, _b, _c;
				if (((_a = _this.clickInfo) === null || _a === void 0 ? void 0 : _a.rowInfo.type) !== RowType.Record || !((_b = _this.clickInfo) === null || _b === void 0 ? void 0 : _b.timeInfo.blockRenderInfo)) return;
				_this.mouseMoveOffsetX = evt.x;
				var deltaX = evt.x - _this.mouseDownOffsetX;
				if (_this.isReadyToDrag && Math.abs(deltaX) > _this.dragBuffer && !_this.isInDragging) {
					_this.isInDragging = true;
					_this.timelineCollector.block.setBlockHidden(_this.clickInfo.rowInfo.recordId, true);
					(_c = _this.timeline) === null || _c === void 0 || _c.renderMain();
				}
				if (_this.isReadyToDrag && _this.isInDragging) {
					_this.group.clear();
					if (_this.isHeadDragging) _this.doHeadDragging();
					if (_this.isTailDragging) _this.doTailDragging();
				}
			};
			_this.onDocumentMouseup = () => {
				var _a;
				if (!_this.isDragging()) {
					_this.clearAllStatus();
					return;
				}
				if (!((_a = _this.clickInfo) === null || _a === void 0 ? void 0 : _a.timeInfo)) return;
				var { range, size } = _this.timelineCollector;
				var mouseUpOffsetX = range.scrollLeft + _this.mouseMoveOffsetX - size.startX;
				_this.doSetRecord(mouseUpOffsetX);
				_this.clearAllStatus();
			};
			return _this;
		}
		var _proto = GanttBlockDrag.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.timelineCollector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMousemove));
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
			this._register(this.UIEvent.stage.onResize(() => this.group.setAttrs(this.timelineCollector.size.globalRect)));
		};
		_proto.dispose = function dispose(trace) {
			GanttFeatureBase.prototype.dispose.call(this, trace);
			this.cancelDragReady();
		};
		_proto.render = function render() {
			this.group.clear();
			if (this.isDragging()) {
				if (this.isHeadDragging) this.doHeadDragging();
				if (this.isTailDragging) this.doTailDragging();
			}
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging && this.isReadyToDrag;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGanttBlockDrag,
				isLock: () => this.isDragging()
			} };
		};
		_proto.listenDragReady = function listenDragReady() {
			this.cancelDragReady();
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseup);
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => this.abortDrag());
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a, _b, _c;
			(_a = this.mouseUpDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseMoveDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
		};
		/**
		* ESC 中断拖拽：与 {@link onDocumentMouseup} 的清理路径一致，但**不调用 `doSetRecord`**（时间不变）；
		* 需额外恢复拖拽期间隐藏的原 block（setBlockHidden false）、隐藏 tooltip、解除自动滚动阻止。
		*/ _proto.abortDrag = function abortDrag() {
			var _a, _b, _c;
			if (!this.isDragging()) return;
			var recordId = ((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.rowInfo.type) === RowType.Record ? this.clickInfo.rowInfo.recordId : void 0;
			this.cancelDragReady();
			this.action.hideToolTip();
			(_b = this.renderer.getFeature(IGanttAutoScroll)) === null || _b === void 0 || _b.togglePreventAutoScroll(false);
			this.clearAllStatus();
			if (recordId) {
				this.timelineCollector.block.setBlockHidden(recordId, false);
				(_c = this.timeline) === null || _c === void 0 || _c.renderMain();
			}
		};
		_proto.canEditTime = function canEditTime() {
			var dateConfig = this.collector.dataUtil.getGanttDateConfig();
			if (!dateConfig) return false;
			var { startDateFieldId, endDateFieldId } = dateConfig;
			return this.parentApi.getStatus().getPermissionStatus("canEditField", { fieldId: startDateFieldId !== null && startDateFieldId !== void 0 ? startDateFieldId : "" }) && this.parentApi.getStatus().getPermissionStatus("canEditField", { fieldId: endDateFieldId !== null && endDateFieldId !== void 0 ? endDateFieldId : "" });
		};
		_proto.showBlockDragRect = function showBlockDragRect(renderRect) {
			var { borderRadius } = style.size;
			var { dragRectWidth } = this.timelineCollector.size;
			var headRect = Object.assign(Object.assign({}, renderRect), {
				y: renderRect.y,
				width: dragRectWidth,
				background: style.color.activedBackground,
				borderRadius: [
					borderRadius,
					0,
					0,
					borderRadius
				]
			});
			this.group.add(pen.config.rect(Object.assign({}, headRect)));
			this.drawRectLine(headRect.x, headRect.y, renderRect);
			var tailRect = {
				x: renderRect.x + renderRect.width - dragRectWidth,
				y: renderRect.y,
				width: dragRectWidth,
				height: renderRect.height,
				background: style.color.activedBackground,
				borderRadius: [
					0,
					borderRadius,
					borderRadius,
					0
				]
			};
			this.group.add(pen.config.rect(Object.assign({}, tailRect)));
			this.drawRectLine(tailRect.x, tailRect.y, renderRect);
		};
		_proto.drawRectLine = function drawRectLine(x, y, blockRect) {
			var { dragRectWidth } = this.timelineCollector.size;
			for (var nowLineX = dragRectWidth / 3; nowLineX < dragRectWidth; nowLineX += dragRectWidth / 3) this.group.add(pen.config.line({
				x: x + nowLineX,
				y: y + blockRect.height / 4,
				points: [
					0,
					0,
					0,
					blockRect.height / 2
				],
				borderColor: style.color.activedBackground,
				borderWidth: style.size.borderWidth
			}));
		};
		_proto.readyToDrag = function readyToDrag(timeInfo, rowInfo, mouseDownOffsetX) {
			var _a;
			if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record) return;
			this.isReadyToDrag = true;
			var blockInfo = this.timelineCollector.block.getRecordBlockRenderInfo(rowInfo.recordId, rowInfo);
			this.clickInfo = {
				timeInfo: Object.assign(Object.assign({}, timeInfo), { blockRenderInfo: blockInfo }),
				rowInfo
			};
			this.mouseDownOffsetX = mouseDownOffsetX;
			this.listenDragReady();
			(_a = this.renderer.getFeature(IGanttAutoScroll)) === null || _a === void 0 || _a.readyX();
		};
		_proto.doHeadDragging = function doHeadDragging() {
			var _a, _b, _c;
			if (!((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.timeInfo.blockRenderInfo) || this.clickInfo.rowInfo.type !== RowType.Record) return;
			var { rowInfo } = this.clickInfo;
			var { blockRenderInfo } = this.clickInfo.timeInfo;
			var { range, size, time } = this.timelineCollector;
			var offsetX = range.scrollLeft + this.mouseMoveOffsetX - size.startX;
			var dragOffsetX = this.fixDraggingX(offsetX, blockRenderInfo);
			var renderRect = {
				x: size.startX + dragOffsetX - range.scrollLeft,
				y: rowInfo.y + (rowInfo.height - blockRenderInfo.block.height) / 2 - this.collector.range.scrollTop + this.collector.size.activityStartY,
				width: blockRenderInfo.block.x + blockRenderInfo.block.width - dragOffsetX,
				height: blockRenderInfo.block.height
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, renderRect), {
				background: blockRenderInfo.block.background,
				borderRadius: style.size.borderRadius,
				borderWidth: style.size.borderWidth
			})));
			renderTitles(this.group, blockRenderInfo, this.timelineCollector, renderRect);
			if (offsetX !== dragOffsetX && renderRect && renderRect.x + renderRect.width < size.startX + size.outerWidth - time.getTimeSize()) (_b = this.renderer.getFeature(IGanttAutoScroll)) === null || _b === void 0 || _b.togglePreventAutoScroll(true);
			else (_c = this.renderer.getFeature(IGanttAutoScroll)) === null || _c === void 0 || _c.togglePreventAutoScroll(false);
			this.showBlockDragRect(renderRect);
			this.showDragToolTip(renderRect);
			this.showDragLine(renderRect);
		};
		_proto.doTailDragging = function doTailDragging() {
			var _a, _b, _c;
			if (!((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.timeInfo.blockRenderInfo) || this.clickInfo.rowInfo.type !== RowType.Record) return;
			var { rowInfo } = this.clickInfo;
			var { blockRenderInfo } = this.clickInfo.timeInfo;
			var { range, size, time } = this.timelineCollector;
			var offsetX = range.scrollLeft + this.mouseMoveOffsetX - size.startX;
			var dragOffsetX = this.fixDraggingX(offsetX, blockRenderInfo);
			var renderRect = {
				x: size.startX + blockRenderInfo.block.x - range.scrollLeft,
				y: rowInfo.y + (rowInfo.height - blockRenderInfo.block.height) / 2 - this.collector.range.scrollTop + this.collector.size.activityStartY,
				width: dragOffsetX - blockRenderInfo.block.x,
				height: blockRenderInfo.block.height
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, renderRect), {
				background: blockRenderInfo.block.background,
				borderRadius: style.size.borderRadius,
				borderWidth: style.size.borderWidth
			})));
			renderTitles(this.group, blockRenderInfo, this.timelineCollector, renderRect);
			if (offsetX !== dragOffsetX && renderRect.x > size.startX + time.getTimeSize()) (_b = this.renderer.getFeature(IGanttAutoScroll)) === null || _b === void 0 || _b.togglePreventAutoScroll(true);
			else (_c = this.renderer.getFeature(IGanttAutoScroll)) === null || _c === void 0 || _c.togglePreventAutoScroll(false);
			this.showBlockDragRect(renderRect);
			this.showDragToolTip(renderRect);
			this.showDragLine(renderRect);
		};
		_proto.showDragToolTip = function showDragToolTip(showRect) {
			var { range, size } = this.timelineCollector;
			var mouseOffsetX = range.scrollLeft + this.mouseMoveOffsetX - size.startX;
			var dragTime = this.getDragTimeByOffset(mouseOffsetX);
			if (!dragTime) return;
			var { startTime, endTime } = dragTime;
			this.action.showToolTip(this.tipText.getTooltipTitle(startTime, endTime, this.timelineCollector.block.getWorkDays([startTime, endTime])), showRect);
		};
		_proto.showDragLine = function showDragLine(showRect) {
			var line = {
				x: showRect.x,
				y: this.collector.size.activityStartY - style.size.borderWidth,
				points: [
					0,
					0,
					showRect.width,
					0
				]
			};
			this.group.add(pen.config.line(Object.assign(Object.assign({}, line), {
				borderColor: style.color.selectionBorderColor,
				borderWidth: style.size.borderWidth
			})));
		};
		_proto.fixDraggingX = function fixDraggingX(x, blockRenderInfo) {
			var { block } = blockRenderInfo;
			var { time, size } = this.timelineCollector;
			var { dragRectWidth } = size;
			if (x < 0) return 0;
			if (x > size.scrollWidth) return size.scrollWidth;
			if (time.getType() === TimeType.Month || time.getType() === TimeType.Week) {
				if (this.isHeadDragging) {
					if (x > block.x + block.width - time.getTimeSize() / 2 - dragRectWidth) return block.x + block.width - time.getTimeSize() / 2 - dragRectWidth;
				}
				if (this.isTailDragging) {
					if (x < block.x + time.getTimeSize() / 2 + dragRectWidth) return block.x + time.getTimeSize() / 2 + dragRectWidth;
				}
			}
			if (time.getType() === TimeType.Quarter) {
				if (this.isHeadDragging) {
					if (x > block.x + block.width - time.getTimeSize() / 7) return block.x + block.width - Math.floor(time.getTimeSize() / 7) + 1;
				}
				if (this.isTailDragging) {
					if (x < block.x + time.getTimeSize() / 7) return block.x + Math.floor(time.getTimeSize() / 7) + 1;
				}
			}
			if (time.getType() === TimeType.Year) {
				if (this.isHeadDragging) {
					var days = getDaysInMonth(blockRenderInfo.block.endTime);
					if (x > block.x + block.width - time.getTimeSize() / days) return block.x + block.width - Math.floor(time.getTimeSize() / days) + 1;
				}
				if (this.isTailDragging) {
					var days1 = getDaysInMonth(blockRenderInfo.block.startTime);
					if (x < block.x + time.getTimeSize() / days1) return block.x + Math.floor(time.getTimeSize() / days1) + 1;
				}
			}
			return x;
		};
		_proto.doSetRecord = function doSetRecord(mouseOffsetX) {
			var _a;
			var { context } = this.renderer;
			if (context.customConfig || ((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.rowInfo.type) !== RowType.Record) return;
			var tableId = context.getCurrentTable().id;
			var viewId = context.getCurrentView().id;
			var behaviorApi = context.getBehaviorApi();
			var { startFieldId, endFieldId } = this.timelineCollector.time.getFieldId();
			var dragTime = this.getDragTimeByOffset(mouseOffsetX);
			if (!dragTime) return;
			var { startTime, endTime } = dragTime;
			var delta = {
				[startFieldId]: { value: startTime },
				[endFieldId]: { value: endTime }
			};
			behaviorApi.setRecord({
				tableId,
				viewId,
				recordId: this.clickInfo.rowInfo.recordId,
				delta
			});
			this.timelineCollector.block.setBlockHidden(this.clickInfo.rowInfo.recordId, false);
		};
		_proto.getDragTimeByOffset = function getDragTimeByOffset(mouseOffsetX) {
			var _a;
			if (!((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.timeInfo.blockRenderInfo)) return;
			var { startTime } = this.clickInfo.timeInfo.blockRenderInfo.block;
			var { endTime } = this.clickInfo.timeInfo.blockRenderInfo.block;
			if (this.isHeadDragging) startTime = getExactTimeByBlockX(this.fixDraggingX(mouseOffsetX, this.clickInfo.timeInfo.blockRenderInfo), this.timelineCollector.time);
			if (this.isTailDragging) endTime = getExactTimeByBlockX(this.fixDraggingX(mouseOffsetX, this.clickInfo.timeInfo.blockRenderInfo), this.timelineCollector.time) - 1;
			return {
				startTime,
				endTime
			};
		};
		/**
		* 重置拖动状态
		*/ _proto.clearAllStatus = function clearAllStatus() {
			this.group.clear();
			this.mouseDownOffsetX = 0;
			this.mouseMoveOffsetX = 0;
			this.clickInfo = void 0;
			this.isReadyToDrag = false;
			this.isInDragging = false;
			this.isHeadDragging = false;
			this.isTailDragging = false;
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGanttBlockDrag) || !this.canEditTime();
		};
		return GanttBlockDrag;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/block-drag/index.js
var init_block_drag = __esmMin((() => {
	init_main$3();
	init_interface$2();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/block-move/interface.js
var IGanttBlockMove;
var init_interface$1 = __esmMin((() => {
	init_module();
	IGanttBlockMove = createDecorator("IGanttBlockMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/block-move/main.js
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
var GanttBlockMove;
var init_main$2 = __esmMin((() => {
	init_pen();
	init_style();
	init_auto_scroll();
	init_gantt_feature();
	init_interface$1();
	init_get_time_by_block_x();
	init_is_hover_gantt_feature();
	init_interface$9();
	init_auto_scroll$1();
	init_util$1();
	init_get_info_by_offset();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	GanttBlockMove = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$8(GanttBlockMove, GanttFeatureBase);
		function GanttBlockMove() {
			var _this = GanttFeatureBase.apply(this, arguments) || this;
			_this.dragBuffer = 6;
			_this.lineRowIndex = -1;
			_this.dropRowIndex = -1;
			_this.isInDragging = false;
			_this.isReadyToDrag = false;
			_this.onStageMousemove = (evt) => {
				if (_this.isReadyToDrag || _this.isPreventFromOtherFeature()) return;
				var { rowInfo, timeInfo } = evt.target;
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record || !timeInfo || isHoverGanttBlockIcon(evt.x, evt.y, timeInfo, _this.collector)) return;
				if (isInBlockBody(evt.x, evt.y, rowInfo, timeInfo, _this.collector, _this.timelineCollector)) {
					_this.setCursor(Cursor.MOVE);
					return;
				}
			};
			_this.onStageMousedown = (evt) => {
				var _a, _b;
				if (_this.isPreventFromOtherFeature()) return;
				var { target } = evt;
				var { rowInfo, timeInfo } = target;
				if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) !== RowType.Record || !timeInfo || !isInBlockBody(evt.x, evt.y, rowInfo, timeInfo, _this.collector, _this.timelineCollector) || isHoverGanttBlockIcon(evt.x, evt.y, timeInfo, _this.collector) || isInBlockHeadDrag(evt.x, evt.y, timeInfo, _this.collector, _this.timelineCollector) || isInBlockTailDrag(evt.x, evt.y, timeInfo, _this.collector, _this.timelineCollector)) return;
				_this.isReadyToDrag = true;
				_this.clickInfo = {
					rowInfo,
					timeInfo
				};
				_this.mouseDownOffset = {
					x: evt.x,
					y: evt.y
				};
				_this.mouseDownScrollLeft = _this.timelineCollector.range.scrollLeft;
				_this.listenDragReady();
				(_a = _this.renderer.getFeature(IGridAutoScroll)) === null || _a === void 0 || _a.readyY();
				(_b = _this.renderer.getFeature(IGanttAutoScroll)) === null || _b === void 0 || _b.readyX();
			};
			_this.onWindowMouseMove = (evt) => {
				if (!_this.isReadyToDrag) return;
				_this.mouseMoveOffset = {
					x: evt.x,
					y: evt.y
				};
				var deltaX = evt.x - _this.mouseDownOffset.x;
				var deltaY = evt.y - _this.mouseDownOffset.y;
				_this.isInDragging = _this.isInDragging || Math.abs(deltaX) > _this.dragBuffer || Math.abs(deltaY) > _this.dragBuffer;
				if (_this.isReadyToDrag && _this.isInDragging) {
					_this.hoverRowInfo = evt.target.rowInfo;
					_this.doMousemoveDragging();
				}
			};
			_this.onDocumentMouseup = (evt) => {
				var _a, _b;
				if (!_this.isDragging()) {
					_this.clearAllStatus();
					return;
				}
				var { context } = _this.renderer;
				if (context.customConfig) return;
				if (!((_a = _this.clickInfo) === null || _a === void 0 ? void 0 : _a.timeInfo)) return;
				var dragOffsetX = evt.x - _this.mouseDownOffset.x;
				if (((_b = _this.clickInfo) === null || _b === void 0 ? void 0 : _b.rowInfo.index) !== void 0 && _this.dropRowIndex !== -1) {
					_this.doMoveRecord(_this.clickInfo.timeInfo, dragOffsetX);
					return;
				}
				_this.doSetRecord(_this.clickInfo.timeInfo, dragOffsetX);
			};
			return _this;
		}
		var _proto = GanttBlockMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.globalGroup = this._register(pen.group(this.collector.size.globalViewRect));
			this.group = this._register(pen.group(this.timelineCollector.size.globalRect));
			this.layer.addGroup(this.globalGroup);
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMousemove));
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
			this._register(this.UIEvent.stage.onResize(() => {
				this.group.setAttrs(this.timelineCollector.size.globalRect);
				this.globalGroup.setAttrs(this.collector.size.globalViewRect);
			}));
		};
		_proto.dispose = function dispose(trace) {
			this.cancelDragReady();
			GanttFeatureBase.prototype.dispose.call(this, trace);
		};
		_proto.render = function render() {
			if (this.isInDragging && isHitRect(this.mouseMoveOffset.x, this.mouseMoveOffset.y, this.collector.size.globalViewRect)) {
				this.hoverRowInfo = getRowInfoByOffset(this.mouseMoveOffset.y, this.collector);
				this.doMousemoveDragging();
			}
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging && this.isReadyToDrag;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IGanttBlockMove,
				isLock: () => this.isDragging()
			} };
		};
		_proto.listenDragReady = function listenDragReady() {
			this.cancelDragReady();
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseup);
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => {
				if (this.isDragging()) {
					this.cancelDragReady();
					this.action.hideToolTip();
					this.clearAllStatus();
				}
			});
		};
		_proto.cancelDragReady = function cancelDragReady() {
			var _a, _b, _c;
			(_a = this.mouseUpDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseMoveDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
		};
		_proto.doMousemoveDragging = function doMousemoveDragging() {
			this.globalGroup.clear();
			this.group.clear();
			this.drawOriginRecordBackground();
			this.updateDragBlock();
			this.updateDragLine();
		};
		_proto.drawOriginRecordBackground = function drawOriginRecordBackground() {
			if (!this.clickInfo) return;
			this.globalGroup.add(pen.config.rect({
				x: this.rectX,
				y: this.clickInfo.rowInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop,
				width: this.rectWidth,
				height: this.clickInfo.rowInfo.height,
				background: style.color.activedBackground
			}), 0, 0, this.collector.size.globalViewBodyRect);
		};
		_proto.updateDragLine = function updateDragLine() {
			var _a, _b, _c;
			var renderRect = (_b = (_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.timeInfo.blockRenderInfo) === null || _b === void 0 ? void 0 : _b.renderRect;
			if (!renderRect || !this.clickInfo || !this.hoverRowInfo) return;
			var deltaX = this.mouseMoveOffset.x - this.mouseDownOffset.x;
			this.group.add(pen.config.line({
				x: renderRect.x + deltaX,
				y: this.collector.size.activityStartY - style.size.borderWidth,
				points: [
					0,
					0,
					renderRect.width,
					0
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: style.size.borderWidth
			}));
			var beforeRecord = this.mouseMoveOffset.y <= this.hoverRowInfo.y + ((_c = this.hoverRowInfo) === null || _c === void 0 ? void 0 : _c.height) / 2 - this.collector.range.scrollTop + this.collector.size.activityStartY;
			var targetInfo = getDragLineYAndTarget(this.clickInfo.rowInfo, this.hoverRowInfo, beforeRecord, this.rangeModel, this.collector);
			this.dropRowIndex = targetInfo.dropRowIndex;
			this.lineRowIndex = targetInfo.lineRowIndex;
			if (targetInfo.dropRowIndex !== -1) {
				var rowInfo = this.collector.rows.getInfo(targetInfo.lineRowIndex);
				if (rowInfo) {
					var y = rowInfo.y + this.collector.size.activityStartY - this.collector.range.scrollTop;
					this.globalGroup.add(pen.config.line({
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
					}), 0, 0, this.collector.size.globalViewBodyRect);
				}
			}
		};
		_proto.updateDragBlock = function updateDragBlock() {
			var _a;
			if (!((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.timeInfo.blockRenderInfo)) return;
			var { renderRect, block } = this.clickInfo.timeInfo.blockRenderInfo;
			var deltaX = this.mouseMoveOffset.x - this.mouseDownOffset.x;
			var deltaY = this.mouseMoveOffset.y - this.mouseDownOffset.y;
			var dragBlockY = renderRect.y + this.collector.size.activityStartY + deltaY;
			this.globalGroup.add(pen.config.rect({
				x: this.rectX,
				y: dragBlockY - (this.clickInfo.rowInfo.height - renderRect.height) / 2,
				width: this.rectWidth,
				height: this.clickInfo.rowInfo.height,
				background: style.color.dragShadowBackground,
				opacity: .5
			}));
			var timeBlock = {
				x: renderRect.x + deltaX,
				y: dragBlockY,
				width: renderRect.width,
				height: renderRect.height,
				background: block.background,
				borderColor: block.borderColor,
				borderRadius: style.size.borderRadius,
				opacity: .5
			};
			this.group.add(pen.config.rect(timeBlock));
			var { startTime, endTime } = this.getDragTimeByOffset(this.clickInfo.timeInfo, this.mouseMoveOffset.x - this.mouseDownOffset.x);
			this.action.showToolTip(this.tipText.getTooltipTitle(startTime, endTime, this.timelineCollector.block.getWorkDays([startTime, endTime])), Object.assign({}, this.mouseMoveOffset));
		};
		_proto.doMoveRecord = function doMoveRecord(timeInfo, dragOffsetX) {
			var _a;
			var targetRowIndo = this.collector.rows.getInfo(this.lineRowIndex);
			if (!targetRowIndo) return;
			applyMovedRecordBehavior(this.dropRowIndex, targetRowIndo, this.context, this.rangeModel, this.collector, (_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.rowInfo.index);
			this.doSetRecord(timeInfo, dragOffsetX);
		};
		_proto.doSetRecord = function doSetRecord(timeInfo, dragOffsetX) {
			if (this.context.customConfig || !this.clickInfo || !("recordId" in this.clickInfo.rowInfo)) return;
			var tableId = this.context.getCurrentTable().id;
			var viewId = this.context.getCurrentView().id;
			var behaviorApi = this.context.getBehaviorApi();
			var { startTime, endTime } = this.getDragTimeByOffset(timeInfo, dragOffsetX);
			var { startFieldId, endFieldId } = this.timelineCollector.time.getFieldId();
			var delta = {
				[startFieldId]: { value: startTime },
				[endFieldId]: { value: endTime }
			};
			behaviorApi.setRecord({
				tableId,
				viewId,
				recordId: this.clickInfo.rowInfo.recordId,
				delta
			});
			this.clearAllStatus();
		};
		_proto.getDragTimeByOffset = function getDragTimeByOffset(timeInfo, dragOffsetX) {
			var { startTime: originStartTime, endTime: originEndTime, x } = timeInfo.blockRenderInfo.block;
			var startTime = getExactTimeByBlockX(x + (this.timelineCollector.range.scrollLeft - this.mouseDownScrollLeft + dragOffsetX), this.timelineCollector.time);
			return {
				startTime,
				endTime: startTime + originEndTime - originStartTime
			};
		};
		/**
		* 重置拖动状态
		*/ _proto.clearAllStatus = function clearAllStatus() {
			this.globalGroup.clear();
			this.group.clear();
			this.mouseDownOffset = {
				x: 0,
				y: 0
			};
			this.mouseMoveOffset = {
				x: 0,
				y: 0
			};
			this.mouseDownScrollLeft = 0;
			this.dropRowIndex = -1;
			this.lineRowIndex = -1;
			this.clickInfo = void 0;
			this.hoverRowInfo = void 0;
			this.isReadyToDrag = false;
			this.isInDragging = false;
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGanttBlockMove);
		};
		_create_class$4(GanttBlockMove, [{
			key: "rectX",
			get: function() {
				if (!this.clickInfo) return 0;
				return this.collector.getInnerRect(this.clickInfo.rowInfo).x;
			}
		}, {
			key: "rectWidth",
			get: function() {
				if (!this.clickInfo) return 0;
				return this.collector.getInnerRect(this.clickInfo.rowInfo).width + this.getGanttWidth(this.parentApi);
			}
		}]);
		return GanttBlockMove;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/block-move/index.js
var init_block_move = __esmMin((() => {
	init_main$2();
	init_interface$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/gantt-width/interface.js
var IGanttViewWidth;
var init_interface = __esmMin((() => {
	init_module();
	IGanttViewWidth = createDecorator("IGanttViewWidth");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/gantt-width/main.js
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
var defaultStyle, GanttViewWidth;
var init_main$1 = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_gantt_feature();
	init_interface();
	init_get_frozen_end_y();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	defaultStyle = {
		bodyLineWidth: style.size.borderWidth,
		headLineWidth: style.size.borderWidth * 4,
		lineColor: style.color.selectionBorderColor,
		tipPaddingV: 4,
		tipPaddingH: 6
	};
	GanttViewWidth = /* @__PURE__ */ function(GanttFeatureBase) {
		"use strict";
		_inherits$7(GanttViewWidth, GanttFeatureBase);
		function GanttViewWidth() {
			var _this = GanttFeatureBase.apply(this, arguments) || this;
			_this.hoverLineX = 0;
			_this.hotAreaWidth = 4;
			_this.minGanttWidth = 450;
			_this.isDragging = false;
			_this.onStageMouseMove = (evt) => {
				if (_this.isDragging) return;
				_this.clearAllStatus();
				_this.cancelDragReady();
				if (_this.isPreventFromOtherFeature() || _this.collector.state.isHideGrid) return;
				var hotRect = {
					x: _this.timelineCollector.size.startX - _this.hotAreaWidth,
					y: _this.collector.size.globalPaddingTop,
					width: 2 * _this.hotAreaWidth,
					height: _this.gridLineHeight
				};
				_this.hoverLineX = 0;
				if (isHitRect(evt.x, evt.y, hotRect)) {
					_this.handleHovering();
					return;
				}
			};
			_this.onStageMouseDown = (evt) => {
				if (!_this.hoverLineX) return;
				var offsetX = evt.x;
				_this.isDragging = true;
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
				_this.clearAllStatus();
				_this.setCursor(Cursor.DEFAULT);
			};
			_this.clearAllStatus = () => {
				_this.isDragging = false;
				_this.hoverLineX = 0;
				_this.group.clear();
			};
			return _this;
		}
		var _proto = GanttViewWidth.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalViewRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.stage.onResize(() => this.group.setAttrs(this.collector.size.globalViewRect)));
		};
		_proto.dispose = function dispose(trace) {
			GanttFeatureBase.prototype.dispose.call(this, trace);
			this.cancelDragReady();
			this.cancelDraggingEvent();
		};
		_proto.render = function render() {};
		_proto.isHovering = function isHovering() {
			return this.hoverLineX !== 0 || this.isDragging;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return {
				default: {
					id: IGanttViewWidth,
					isLock: () => this.isDragging
				},
				low: {
					id: IGanttViewWidth,
					isLock: () => this.isHovering()
				}
			};
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IGanttViewWidth);
		};
		_proto.handleHovering = function handleHovering() {
			var { size } = this.timelineCollector;
			this.hoverLineX = size.startX;
			this.group.add(pen.config.line({
				x: this.hoverLineX,
				y: this.collector.size.globalPaddingTop,
				points: [
					0,
					0,
					0,
					this.gridLineHeight
				],
				borderWidth: defaultStyle.headLineWidth,
				borderColor: defaultStyle.lineColor
			}));
			this.setCursor(Cursor.COL_RESIZE);
			this.listenDragReady();
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
		_proto.handleDragging = function handleDragging(offsetX) {
			this.group.clear();
			var { size } = this.collector;
			this.gridNewWidth = offsetX;
			if (offsetX > size.globalViewRect.width - this.minGanttWidth) this.gridNewWidth = Math.round(size.globalViewRect.width - this.minGanttWidth);
			if (offsetX < size.activityStartX) this.gridNewWidth = size.activityStartX;
			var lineX = this.gridNewWidth;
			this.group.add(pen.config.line({
				x: lineX,
				y: size.globalPaddingTop,
				points: [
					0,
					0,
					0,
					this.gridLineHeight
				],
				borderWidth: defaultStyle.headLineWidth,
				borderColor: defaultStyle.lineColor
			}));
			var tipTextFontSize = style.size.fontSizeNormal;
			var tipText = i18n.t("表格宽度：{{newWidth}} 像素", { newWidth: this.gridNewWidth });
			var tipTextWidth = pen.util.measureTextWidth(tipText, tipTextFontSize);
			var tipRect = {
				x: lineX - defaultStyle.tipPaddingH / 2,
				y: size.activityStartY + style.size.cellPadding,
				width: tipTextWidth + defaultStyle.tipPaddingH * 2,
				height: tipTextFontSize + defaultStyle.tipPaddingV * 2
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, tipRect), {
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.tagBorderRadius,
				background: style.color.hoverBackgroundNoAlpha
			})));
			this.group.add(pen.config.text(Object.assign(Object.assign({}, tipRect), {
				x: tipRect.x + defaultStyle.tipPaddingH,
				text: tipText,
				color: style.color.normalFontColor,
				fontSize: tipTextFontSize
			})));
			this.setCursor(Cursor.COL_RESIZE);
		};
		_proto.applyBehavior = function applyBehavior() {
			var _a;
			var viewModel = this.collector.dataUtil.getCurrentView();
			var table = this.collector.dataUtil.getCurrentTable();
			if (!viewModel || !table) return;
			var oldGridWidth = this.collector.size.globalWidth;
			if (this.gridNewWidth > oldGridWidth) {
				var { end } = this.collector.range.getVisibleColumnRange();
				var lastColumnInfo = this.collector.columns.getInfos().get(end);
				if (lastColumnInfo) {
					var params = {
						tableId: table.id,
						viewId: viewModel.id,
						fieldIds: [lastColumnInfo.id]
					};
					this.context.getBehaviorApi().setColWidth(Object.assign(Object.assign({}, params), { delta: { width: lastColumnInfo.width + this.gridNewWidth - oldGridWidth } }));
				}
			}
			this.collector.size.setRootWidthStorage(this.gridNewWidth);
			this.collector.patch();
			(_a = this.timelineCollector) === null || _a === void 0 || _a.patch();
			this.parentApi.render();
			this.UIEvent.stage.forceTriggerResize();
		};
		_create_class$3(GanttViewWidth, [{
			key: "gridLineHeight",
			get: function() {
				return getFrozenEndY(this.collector) - this.collector.size.globalPaddingTop;
			}
		}]);
		return GanttViewWidth;
	}(GanttFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/gantt-width/index.js
var init_gantt_width = __esmMin((() => {
	init_main$1();
	init_interface();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/feature/pc/entries.js
function getGanttPcFeatures() {
	return [
		{
			ctor: GanttAutoScroll,
			id: IGanttAutoScroll,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GanttAreaInteractive,
			id: IGanttAreaInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GanttScroller,
			id: IGanttScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			ctor: GanttBlockMove,
			id: IGanttBlockMove,
			config: { auth: FeatureAuth.Record }
		},
		{
			ctor: GanttBlockDrag,
			id: IGanttBlockDrag,
			config: { auth: FeatureAuth.Record }
		},
		{
			ctor: GanttViewWidth,
			id: IGanttViewWidth,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries = __esmMin((() => {
	init_scroller();
	init_auto_scroll();
	init_area_interactive();
	init_block_drag();
	init_block_move();
	init_gantt_width();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/main/block/index.js
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
var import_main$5, GanttBlockRenderer;
var init_block = __esmMin((() => {
	import_main$5 = require_main();
	init_lib();
	init_pen();
	init_style();
	init_render_block_titles();
	init_interface$9();
	GanttBlockRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$6(GanttBlockRenderer, Disposable);
		function GanttBlockRenderer(gridExtendApi, collector) {
			var _this = Disposable.call(this) || this;
			_this.gridExtendApi = gridExtendApi;
			_this.collector = collector;
			return _this;
		}
		var _proto = GanttBlockRenderer.prototype;
		_proto.render = function render(container) {
			var { range, rows } = this.gridExtendApi.collector;
			range.doRowRange((rowIndex) => this.renderRowBlock(container, rows.getInfo(rowIndex)));
		};
		_proto.renderRowBlock = function renderRowBlock(container, rowInfo) {
			if (!rowInfo || rowInfo.height === 0) return;
			if (rowInfo.type === RowType.GroupHead) {
				this.renderGroupHeadBlock(container, rowInfo);
				return;
			}
			if (rowInfo.type === RowType.Record) {
				this.renderRecordBlock(container, rowInfo);
				return;
			}
		};
		_proto.renderGroupHeadBlock = function renderGroupHeadBlock(container, rowInfo) {
			var info = this.collector.block.getGroupBlockRenderInfo(rowInfo.path, rowInfo);
			if (!info) return;
			if (!info.isOutViewport) container.add(pen.config.rect(Object.assign(Object.assign({ level: Level.L2 }, info.renderRect), {
				height: this.collector.size.groupBlockHeight,
				y: info.renderRect.y + (info.renderRect.height - this.collector.size.groupBlockHeight),
				background: info.block.background,
				borderRadius: style.size.borderRadius / 2
			})), 0, 0, this.clipRect);
			this.renderIcons(container, info);
			renderTitles(container, info, this.collector);
		};
		_proto.renderRecordBlock = function renderRecordBlock(container, rowInfo) {
			var info = this.collector.block.getRecordBlockRenderInfo(rowInfo.recordId, rowInfo);
			if (!info || !rowInfo.recordId) return;
			var isSelected = this.gridExtendApi.collector.state.isSelectRowIndex(rowInfo.recordIndex);
			if (info.block.hidden) return;
			if (!info.isOutViewport) container.add(pen.config.rect(Object.assign(Object.assign({ level: Level.L2 }, info.renderRect), {
				background: isSelected ? style.color.normalBackground : info.block.background,
				borderColor: isSelected ? style.color.selectionBackground : info.block.borderColor,
				borderRadius: style.size.borderRadius,
				borderWidth: isSelected ? 4 * style.size.borderWidth : style.size.borderWidth
			})), 0, 0, this.clipRect);
			if (!this.gridExtendApi.collector.state.isHideGrid && info.block.isUnsetTime) return;
			this.renderIcons(container, info);
			renderTitles(container, info, this.collector);
		};
		_proto.renderIcons = function renderIcons(container, info) {
			if (info.headIcon) container.add(info.headIcon);
			if (info.tailIcon) container.add(info.tailIcon);
		};
		_create_class$2(GanttBlockRenderer, [{
			key: "clipRect",
			get: function() {
				var { bodyRect } = this.collector.size;
				return Object.assign(Object.assign({}, bodyRect), {
					x: bodyRect.x + style.size.borderWidth,
					width: bodyRect.width - 2 * style.size.borderWidth
				});
			}
		}]);
		return GanttBlockRenderer;
	}(import_main$5.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/main/body/index.js
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
var import_main$4, GanttBodyRenderer;
var init_body = __esmMin((() => {
	import_main$4 = require_main();
	init_esm();
	init_lib();
	init_pen();
	init_work_day();
	init_style();
	init_transform_time();
	init_interface$9();
	init_time$1();
	GanttBodyRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$5(GanttBodyRenderer, Disposable);
		function GanttBodyRenderer(gridExtendApi, collector) {
			var _this = Disposable.call(this) || this;
			_this.gridExtendApi = gridExtendApi;
			_this.collector = collector;
			return _this;
		}
		var _proto = GanttBodyRenderer.prototype;
		_proto.render = function render(container) {
			this.renderRows(container);
			this.renderTodayLine(container);
		};
		_proto.renderRows = function renderRows(container) {
			var { range, rows } = this.gridExtendApi.collector;
			range.doRowRange((rowIndex) => this.renderRow(container, rows.getInfo(rowIndex)));
		};
		_proto.renderTodayLine = function renderTodayLine(container) {
			var x = this.collector.profile.todayLineOffset;
			var endY = this.collector.profile.todayLineEndY;
			var { todayRectSize } = this.collector.size;
			container.add(pen.config.line({
				level: Level.L2,
				x: x + todayRectSize / 2,
				y: 0,
				points: [
					0,
					0,
					0,
					endY
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: style.size.borderWidth
			}));
		};
		_proto.renderRow = function renderRow(container, rowInfo) {
			if (!rowInfo || rowInfo.height === 0) return;
			var { size } = this.collector;
			var rowRect = {
				x: size.startX,
				y: rowInfo.y - this.gridExtendApi.collector.range.scrollTop,
				width: size.outerWidth,
				height: rowInfo.height
			};
			var isDrawColumn = true;
			switch (rowInfo.type) {
				case RowType.Spacing:
					isDrawColumn = this.renderSpacing(container, rowRect, rowInfo);
					break;
				case RowType.GroupHead:
					this.renderGroupHead(container, rowRect, rowInfo);
					break;
				case RowType.GroupFoot:
					this.renderGroupFoot(container, rowRect, rowInfo);
					break;
				case RowType.GroupAdd:
					this.renderGroupAdd(container, rowRect);
					break;
				case RowType.RecordAdd:
					this.renderRecordAdd(container, rowRect, rowInfo);
					break;
				case RowType.Record:
					this.renderRecord(container, rowRect, rowInfo);
					break;
				default:
					this.renderNormal(container, rowRect);
					break;
			}
			if (isDrawColumn) this.drawColumnBackgroundAndLines(container, rowRect);
		};
		_proto.renderSpacing = function renderSpacing(container, rowRect, rowInfo) {
			if (rowInfo.parent === -1) return false;
			this.drawRowBackgroundAndBorders(container, rowRect);
			return true;
		};
		_proto.renderGroupHead = function renderGroupHead(container, rowRect, rowInfo) {
			var { borderRadius } = style.size;
			var { isHideGrid } = this.gridExtendApi.collector.state;
			if (rowInfo.parent === -1) {
				if (rowInfo.fold) container.add(pen.config.rect(Object.assign(Object.assign({}, rowRect), {
					borderWidth: style.size.borderWidth,
					background: style.color.normalBackground,
					borderRadius: isHideGrid ? borderRadius : [
						0,
						borderRadius,
						borderRadius,
						0
					]
				})));
				else {
					container.add(pen.config.rect(Object.assign(Object.assign({}, rowRect), {
						background: style.color.normalBackground,
						borderRadius: ua.isMobile ? 0 : [
							isHideGrid ? borderRadius : 0,
							borderRadius,
							0,
							0
						]
					})));
					if (ua.isMobile) container.add(pen.config.line({
						x: rowRect.x,
						y: rowRect.y,
						points: [
							0,
							0,
							rowRect.width,
							0,
							rowRect.width,
							rowRect.height
						]
					}));
					else container.add(pen.config[isHideGrid ? "topCorner" : "topRightCorner"](Object.assign(Object.assign({}, rowRect), { borderWidth: style.size.borderWidth })));
				}
				return;
			}
			this.drawRowBackgroundAndBorders(container, rowRect);
		};
		_proto.renderGroupFoot = function renderGroupFoot(container, rowRect, rowInfo) {
			var parentRowInfo = this.gridExtendApi.collector.rows.getInfo(rowInfo.parent);
			if (!parentRowInfo) return;
			var { isHideGrid } = this.gridExtendApi.collector.state;
			if (parentRowInfo.parent === -1) {
				container.add(pen.config.rect(Object.assign(Object.assign({}, rowRect), {
					background: style.color.normalBackground,
					borderRadius: ua.isMobile ? 0 : [
						0,
						0,
						style.size.borderRadius,
						isHideGrid ? style.size.borderRadius : 0
					]
				})));
				if (ua.isMobile) container.add(pen.config.line({
					x: rowRect.x,
					y: rowRect.y,
					points: [
						0,
						rowRect.height,
						rowRect.width,
						rowRect.height,
						rowRect.width,
						0
					]
				}));
				else container.add(pen.config[isHideGrid ? "bottomCorner" : "bottomRightCorner"](Object.assign(Object.assign({}, rowRect), { borderWidth: style.size.borderWidth })));
				return;
			}
			this.drawRowBackgroundAndBorders(container, rowRect);
		};
		_proto.renderGroupAdd = function renderGroupAdd(container, rowRect) {
			var { borderRadius } = style.size;
			var { isHideGrid } = this.gridExtendApi.collector.state;
			container.add(pen.config.rect(Object.assign(Object.assign({}, rowRect), {
				background: style.color.normalBackground,
				borderWidth: isHideGrid ? style.size.borderWidth : void 0,
				borderRadius: isHideGrid ? borderRadius : [
					0,
					borderRadius,
					borderRadius,
					0
				]
			})));
			if (!isHideGrid) container.add(pen.config.rightCorner(rowRect));
		};
		_proto.renderRecordAdd = function renderRecordAdd(container, rowRect, rowInfo) {
			if (!this.gridExtendApi.collector.rows.getInfo(rowInfo.index + 1) || rowInfo.level === 0 || !this.gridExtendApi.collector.dataUtil.hasGroup()) {
				var { isHideGrid } = this.gridExtendApi.collector.state;
				var prevRowInfo = this.gridExtendApi.collector.rows.getInfo(rowInfo.index - 1);
				var needBorder = (prevRowInfo === null || prevRowInfo === void 0 ? void 0 : prevRowInfo.index) === 0 && prevRowInfo.type === RowType.Spacing;
				container.add(pen.config.rect(Object.assign(Object.assign({}, rowRect), {
					background: style.color.normalBackground,
					borderWidth: needBorder ? style.size.borderWidth : 0,
					borderRadius: [
						0,
						0,
						style.size.borderRadius,
						isHideGrid ? style.size.borderRadius : 0
					]
				})));
				container.add(pen.config[isHideGrid ? "bottomCorner" : "bottomRightCorner"](Object.assign(Object.assign({}, rowRect), { borderWidth: style.size.borderWidth })));
				return;
			}
			this.drawRowBackgroundAndBorders(container, rowRect);
		};
		_proto.renderRecord = function renderRecord(container, rowRect, rowInfo) {
			this.renderNormal(container, rowRect);
			var gridCollector = this.gridExtendApi.collector;
			if (ua.isMobile && !gridCollector.dataUtil.hasGroup() && rowInfo.index === gridCollector.rows.rowCount - 1) container.add(pen.config.line({
				x: rowRect.x,
				y: rowRect.y,
				points: [
					0,
					rowRect.height,
					rowRect.width,
					rowRect.height
				]
			}));
		};
		_proto.renderNormal = function renderNormal(container, rowRect) {
			this.drawRowBackgroundAndBorders(container, rowRect);
		};
		_proto.drawColumnBackgroundAndLines = function drawColumnBackgroundAndLines(container, rowRect) {
			this.collector.range.doRange((index, unitRect) => {
				this.drawWeekendOrHolidayBackground(container, index, unitRect, rowRect);
				container.add(pen.config.line({
					level: Level.L1,
					x: unitRect.x,
					y: rowRect.y,
					points: [
						unitRect.width,
						0,
						unitRect.width,
						rowRect.height
					]
				}));
			});
		};
		_proto.drawWeekendOrHolidayBackground = function drawWeekendOrHolidayBackground(container, index, columnRect, rowRect) {
			var type = this.collector.time.getType();
			if (type === TimeType.Year) return;
			var indexTime = indexToTime(index, this.collector.time);
			if (type === TimeType.Week || type === TimeType.Month) {
				if (!WorkDayService.isTimestampWorkDay(indexTime)) container.add(pen.config.rect({
					level: Level.L1,
					x: columnRect.x,
					y: rowRect.y,
					width: columnRect.width,
					height: rowRect.height,
					background: style.color.lightCanvasBackground
				}));
				return;
			}
			if (type === TimeType.Quarter) {
				var dayWidth = Math.floor(columnRect.width / 7);
				for (var day = 0; day < 7; day++) {
					var computeTimestamp = getAfterDaysTime(indexTime, day);
					if (WorkDayService.isTimestampWorkDay(computeTimestamp)) continue;
					container.add(pen.config.rect({
						level: Level.L1,
						x: columnRect.x + dayWidth * day,
						y: rowRect.y,
						width: dayWidth - style.size.borderWidth,
						height: rowRect.height,
						background: style.color.lightCanvasBackground
					}));
				}
			}
		};
		_proto.drawRowBackgroundAndBorders = function drawRowBackgroundAndBorders(container, rowRect) {
			container.add(pen.config.rect(Object.assign(Object.assign({}, rowRect), { background: style.color.normalBackground })));
			container.add(pen.config.line({
				x: rowRect.x,
				y: rowRect.y,
				points: [
					0,
					0,
					0,
					rowRect.height
				]
			}));
			container.add(pen.config.line({
				x: rowRect.x,
				y: rowRect.y,
				points: [
					rowRect.width,
					0,
					rowRect.width,
					rowRect.height
				]
			}));
		};
		return GanttBodyRenderer;
	}(import_main$4.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/main/head/time-float.js
var import_dayjs_min, TimeFloat;
var init_time_float = __esmMin((() => {
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
	init_es();
	init_pen();
	init_style();
	init_transform_time();
	init_time$1();
	TimeFloat = /* @__PURE__ */ function() {
		"use strict";
		function TimeFloat(gridExtendApi, collector) {
			this.gridExtendApi = gridExtendApi;
			this.collector = collector;
			this.timeFloatInfo = [];
		}
		var _proto = TimeFloat.prototype;
		_proto.render = function render(container) {
			this.timeFloatInfo = [];
			var timeFloatGroup = pen.group(Object.assign({}, this.collector.profile.floatTitleRect));
			container.addGroup(timeFloatGroup);
			this.renderTimeFloat(timeFloatGroup);
		};
		_proto.renderTimeFloat = function renderTimeFloat(timeFloatGroup) {
			this.collectTimeFloat();
			if (!this.timeFloatInfo) return;
			this.renderFloat(timeFloatGroup);
		};
		_proto.collectTimeFloat = function collectTimeFloat() {
			var { range, profile, size, time } = this.collector;
			var type = time.getType();
			var startOffset = profile.floatTitleRect.x - size.startX + range.scrollLeft;
			var endOffset = startOffset + profile.floatTitleRect.width;
			var start = Math.floor(startOffset / time.getTimeSize());
			var end = Math.ceil(endOffset / time.getTimeSize());
			switch (type) {
				case TimeType.Week:
				case TimeType.Month:
					this.collectDayTimeFloat(start, end);
					break;
				case TimeType.Quarter:
					this.collectWeekTimeFloat(start, end);
					break;
				case TimeType.Year: this.collectMonthTimeFloat(start, end);
			}
		};
		_proto.collectDayTimeFloat = function collectDayTimeFloat(start, end) {
			var { range, profile, size, time } = this.collector;
			var floatTitleRectStartX = profile.floatTitleRect.x - size.startX;
			for (var index = start; index <= end; index++) {
				var year = (0, import_dayjs_min.default)(indexToTime(index, time)).get("year");
				var month = (0, import_dayjs_min.default)(indexToTime(index, time)).get("month") + 1;
				if (!this.timeFloatInfo.length || month !== this.timeFloatInfo[this.timeFloatInfo.length - 1].month) {
					var nextMonthOffset = timeToIndex((0, import_dayjs_min.default)(indexToTime(index, time)).add(1, "month").startOf("month").valueOf(), time) * time.getTimeSize() - range.scrollLeft - floatTitleRectStartX;
					var nowIndexOffset = Math.max(index * time.getTimeSize() - range.scrollLeft - floatTitleRectStartX, 0);
					var textString = getI18nMonthText({
						year,
						month
					});
					this.timeFloatInfo.push({
						x: nowIndexOffset,
						year,
						month,
						textString,
						canUseWidth: nextMonthOffset - nowIndexOffset,
						textWidth: pen.util.measureTextWidth(textString)
					});
				}
			}
		};
		_proto.collectWeekTimeFloat = function collectWeekTimeFloat(start, end) {
			var { range, profile, size, time } = this.collector;
			var timeSize = time.getTimeSize();
			var floatTitleRectStartX = profile.floatTitleRect.x - size.startX;
			for (var index = start; index <= end; index++) {
				var year = (0, import_dayjs_min.default)(indexToTime(index, time)).get("year");
				var month = (0, import_dayjs_min.default)(indexToTime(index, time)).get("month") + 1;
				if (!this.timeFloatInfo.length || month !== this.timeFloatInfo[this.timeFloatInfo.length - 1].month) {
					var nextMonthStart = (0, import_dayjs_min.default)(indexToTime(index, time)).add(1, "month").startOf("month");
					var nextMonthIndex = timeToIndex(nextMonthStart.valueOf(), time);
					var exactNextMonthOffset = fixDayIndex(nextMonthStart.get("day")) * (timeSize / 7);
					var nextMonthOffset = nextMonthIndex * timeSize - range.scrollLeft - floatTitleRectStartX + exactNextMonthOffset;
					var exactMonthStartOffset = ((0, import_dayjs_min.default)(indexToTime(index, time)).get("date").valueOf() - 1) * (timeSize / 7);
					var nowMonthOffset = Math.max(index * timeSize - range.scrollLeft - floatTitleRectStartX - exactMonthStartOffset, 0);
					var textString = getI18nMonthText({
						year,
						month
					});
					this.timeFloatInfo.push({
						x: nowMonthOffset,
						year,
						month,
						textString,
						canUseWidth: nextMonthOffset - nowMonthOffset,
						textWidth: pen.util.measureTextWidth(textString)
					});
				}
			}
		};
		_proto.collectMonthTimeFloat = function collectMonthTimeFloat(start, end) {
			var { range, profile, size, time } = this.collector;
			var floatTitleRectStartX = profile.floatTitleRect.x - size.startX;
			for (var index = start; index <= end; index++) {
				var year = (0, import_dayjs_min.default)(indexToTime(index, time)).get("year");
				var month = (0, import_dayjs_min.default)(indexToTime(index, time)).get("month") + 1;
				if (!this.timeFloatInfo.length || year !== this.timeFloatInfo[this.timeFloatInfo.length - 1].year) {
					var nextYearOffset = timeToIndex((0, import_dayjs_min.default)(indexToTime(index, time)).add(1, "year").startOf("year").valueOf(), time) * time.getTimeSize() - range.scrollLeft - floatTitleRectStartX;
					var nowIndexOffset = Math.max(index * time.getTimeSize() - range.scrollLeft - floatTitleRectStartX, 0);
					var textString = getI18nMonthText({ year });
					this.timeFloatInfo.push({
						x: nowIndexOffset,
						year,
						month,
						textString,
						canUseWidth: nextYearOffset - nowIndexOffset,
						textWidth: pen.util.measureTextWidth(textString)
					});
				}
			}
		};
		_proto.renderFloat = function renderFloat(timeFloatGroup) {
			this.timeFloatInfo.forEach((timeFloatInfo) => {
				var { canUseWidth, textString, textWidth } = timeFloatInfo;
				var { floatTitleRect } = this.collector.profile;
				var offset = canUseWidth < textWidth ? textWidth - canUseWidth : 0;
				timeFloatGroup.add(pen.config.text({
					text: textString,
					x: floatTitleRect.x + timeFloatInfo.x - offset,
					y: floatTitleRect.y,
					width: timeFloatInfo.textWidth,
					height: floatTitleRect.height,
					fontSize: style.size.fontSizeSmall
				}));
			});
		};
		return TimeFloat;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/main/head/index.js
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
var import_main$3, GanttHeadRenderer;
var init_head = __esmMin((() => {
	import_main$3 = require_main();
	init_esm();
	init_pen();
	init_work_day();
	init_style();
	init_time_float();
	init_copyright();
	init_transform_time();
	init_time$1();
	GanttHeadRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$4(GanttHeadRenderer, Disposable);
		function GanttHeadRenderer(gridExtendApi, collector) {
			var _this = Disposable.call(this) || this;
			_this.gridExtendApi = gridExtendApi;
			_this.collector = collector;
			_this.renderHeadOutside = (container) => {
				var { headRect } = _this.collector.size;
				if (ua.isMobile) {
					container.add(pen.config.line({
						x: headRect.x,
						y: headRect.y + headRect.height,
						points: [
							0,
							0,
							headRect.width,
							0
						]
					}));
					return;
				}
				var { headRadius } = _this.collector.profile;
				container.add(pen.config.rect(Object.assign(Object.assign({}, headRect), {
					background: style.color.normalBackground,
					borderRadius: headRadius,
					borderWidth: style.size.borderWidth
				})));
			};
			_this.timeFloat = new TimeFloat(_this.gridExtendApi, _this.collector);
			return _this;
		}
		var _proto = GanttHeadRenderer.prototype;
		_proto.render = function render(container) {
			this.renderHeadOutside(container);
			this.renderHeadExpandIcon(container);
			this.renderHeadDates(container);
			this.renderHeadTypeSwitchers(container);
			this.renderHeadTodaySwitchers(container);
			this.renderTodayLineMark(container);
			this.timeFloat.render(container);
		};
		_proto.renderHeadExpandIcon = function renderHeadExpandIcon(container) {
			var { expandIcon } = this.collector.profile;
			if (expandIcon) container.add(expandIcon);
		};
		_proto.renderHeadDates = function renderHeadDates(container) {
			var { headRect } = this.collector.size;
			var clipContainer = pen.group(Object.assign(Object.assign({}, headRect), {
				x: headRect.x + style.size.borderWidth,
				width: headRect.width - 2 * style.size.borderWidth
			}));
			this.collector.range.doRange((index, rect) => {
				clipContainer.add(pen.config.text(Object.assign(Object.assign({}, rect), {
					text: getUtitTitle(index, this.collector.time),
					align: "center"
				})));
				this.renderFestivalLine(index, container);
			});
			container.addGroup(clipContainer);
		};
		_proto.renderHeadTypeSwitchers = function renderHeadTypeSwitchers(container) {
			this.collector.profile.typeSwitchers.forEach((switcherDrawConfig) => container.add(switcherDrawConfig));
		};
		_proto.renderHeadTodaySwitchers = function renderHeadTodaySwitchers(container) {
			this.collector.profile.todaySwitchers.forEach((switcherDrawConfig) => container.add(switcherDrawConfig));
		};
		_proto.renderFestivalLine = function renderFestivalLine(index, container) {
			var { time: timeCollector, size, range } = this.collector;
			var timeType = timeCollector.getType();
			var timeSize = timeCollector.getTimeSize();
			var { size: gridSize } = this.gridExtendApi.collector;
			if (timeType === TimeType.Year) return;
			if (timeType === TimeType.Week || timeType === TimeType.Month) {
				var time = indexToTime(index, this.collector.time);
				if (!WorkDayService.getTimestampHoliday(time)) return;
				var line = {
					x: size.startX + timeSize * index - range.scrollLeft,
					y: gridSize.globalPaddingTop + gridSize.fieldHeightGantt,
					points: [
						0,
						0,
						timeSize,
						0
					]
				};
				container.add(pen.config.line(Object.assign(Object.assign({}, line), {
					borderColor: style.color.selectionBorderColor,
					borderWidth: style.size.borderWidth * 2
				})));
			}
			if (timeType === TimeType.Quarter) {
				var dayWidth = Math.floor(timeSize / 7);
				for (var day = 0; day < 7; day++) {
					var computeTimestamp = getAfterDaysTime(indexToTime(index, this.collector.time), day);
					var holiday1 = WorkDayService.getTimestampHoliday(computeTimestamp);
					if (!holiday1 || holiday1.dayIndex !== 1) continue;
					var line1 = {
						x: size.startX + timeSize * index - range.scrollLeft + day * dayWidth,
						y: gridSize.globalPaddingTop + gridSize.fieldHeightGantt,
						points: [
							0,
							0,
							holiday1.totalDays * dayWidth,
							0
						]
					};
					container.add(pen.config.line(Object.assign(Object.assign({}, line1), {
						borderColor: style.color.selectionBorderColor,
						borderWidth: style.size.borderWidth * 2
					})));
				}
			}
		};
		_proto.renderTodayLineMark = function renderTodayLineMark(container) {
			var { todayRectSize } = this.collector.size;
			var { size: gridSize } = this.gridExtendApi.collector;
			var arcRect = {
				x: this.collector.profile.todayLineOffset,
				y: gridSize.globalPaddingTop + gridSize.fieldHeightGantt - todayRectSize,
				width: todayRectSize,
				height: todayRectSize
			};
			container.add(pen.config.rect(Object.assign(Object.assign({}, arcRect), {
				background: style.color.selectionBorderColor,
				borderRadius: todayRectSize / 2
			})));
		};
		return GanttHeadRenderer;
	}(import_main$3.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/main/index.js
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
var import_main$2, MainRenderer;
var init_main = __esmMin((() => {
	import_main$2 = require_main();
	init_block();
	init_body();
	init_head();
	MainRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$3(MainRenderer, Disposable);
		function MainRenderer(gridExtendApi, collector) {
			var _this = Disposable.call(this) || this;
			_this.gridExtendApi = gridExtendApi;
			_this.collector = collector;
			_this.head = _this._register(new GanttHeadRenderer(_this.gridExtendApi, _this.collector));
			_this.body = _this._register(new GanttBodyRenderer(_this.gridExtendApi, _this.collector));
			_this.block = _this._register(new GanttBlockRenderer(_this.gridExtendApi, _this.collector));
			return _this;
		}
		var _proto = MainRenderer.prototype;
		_proto.render = function render(headGroup, bodyGroup) {
			this.head.render(headGroup);
			this.body.render(bodyGroup);
			this.block.render(bodyGroup);
		};
		return MainRenderer;
	}(import_main$2.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/renderer/index.js
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
var import_main$1, TimeLineRenderer;
var init_renderer = __esmMin((() => {
	import_main$1 = require_main();
	init_esm();
	init_pen();
	init_performance();
	init_style();
	init_entries$1();
	init_entries();
	init_main();
	TimeLineRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$2(TimeLineRenderer, Disposable);
		function TimeLineRenderer(gridExtendApi, collector) {
			var _this = Disposable.call(this) || this;
			_this.gridExtendApi = gridExtendApi;
			_this.collector = collector;
			_this.raf = null;
			_this.headGroup = _this._register(pen.group(Object.assign(Object.assign({}, _this.headClipRect), { batch: true })));
			_this.bodyGroup = _this._register(pen.group(Object.assign(Object.assign({}, _this.bodyClipRect), { batch: true })));
			_this.gridExtendApi.getHeadLayer().addGroup(_this.headGroup);
			_this.gridExtendApi.getBodyLayer().addGroup(_this.bodyGroup);
			_this.mainRenderer = _this._register(new MainRenderer(_this.gridExtendApi, _this.collector));
			(ua.isPC ? getGanttPcFeatures() : getGanttMobileFeatures()).forEach((featureOption) => _this.gridExtendApi.installFeature(featureOption));
			_this._register({ dispose: () => {
				if (_this.raf) cancelAnimationFrame(_this.raf);
			} });
			return _this;
		}
		var _proto = TimeLineRenderer.prototype;
		_proto.render = function render() {
			if (!this.raf) this.raf = requestAnimationFrame(() => {
				performanceReport.common.markRenderStart();
				this.collector.block.collectVisibleRecordBlocks();
				this.renderMain();
				this.renderFeature();
				performanceReport.common.markRenderEnd(this.gridExtendApi.collector.dataUtil.getContext());
				this.raf = null;
			});
		};
		_proto.renderMain = function renderMain() {
			this.headGroup.clear();
			this.bodyGroup.clear();
			this.headGroup.setAttrs(this.headClipRect);
			this.bodyGroup.setAttrs(this.bodyClipRect);
			this.mainRenderer.render(this.headGroup, this.bodyGroup);
		};
		_proto.renderFeature = function renderFeature() {
			this.gridExtendApi.renderFeature();
		};
		_proto.resize = function resize() {
			this.headGroup.setAttrs(this.headClipRect);
			this.bodyGroup.setAttrs(this.bodyClipRect);
			this.render();
		};
		_create_class$1(TimeLineRenderer, [{
			key: "headClipRect",
			get: function() {
				var { borderWidth } = style.size;
				var { headRect } = this.collector.size;
				return {
					x: headRect.x - borderWidth,
					y: headRect.y - borderWidth,
					width: headRect.width + borderWidth * 2,
					height: headRect.height + borderWidth * 2
				};
			}
		}, {
			key: "bodyClipRect",
			get: function() {
				var { borderWidth } = style.size;
				var { bodyRect } = this.collector.size;
				return {
					x: bodyRect.x - borderWidth,
					y: bodyRect.y - borderWidth,
					width: bodyRect.width + borderWidth * 2,
					height: bodyRect.height + borderWidth * 2
				};
			}
		}]);
		return TimeLineRenderer;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/time-line/index.js
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
var import_main, TimeLine;
var init_time_line = __esmMin((() => {
	import_main = require_main();
	init_collector();
	init_renderer();
	init_transform_time();
	init_interface$9();
	init_renderer_model();
	init_fix_scroll_delta();
	TimeLine = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$1(TimeLine, Disposable);
		function TimeLine(gridExtendApi) {
			var _this = Disposable.call(this) || this;
			_this.gridExtendApi = gridExtendApi;
			return _this;
		}
		var _proto = TimeLine.prototype;
		_proto.bootstrap = function bootstrap() {
			this.collector = this._register(new TimeLineCollector(this.gridExtendApi.context, this.gridExtendApi));
			this.collector.collect();
			this.renderer = this._register(new TimeLineRenderer(this.gridExtendApi, this.collector));
			this.renderer.render();
		};
		_proto.render = function render() {
			this.renderer.render();
		};
		_proto.renderMain = function renderMain() {
			this.renderer.renderMain();
		};
		_proto.resize = function resize() {
			this.collector.resize();
			this.renderer.resize();
		};
		_proto.handleModelChange = function handleModelChange(mutations) {
			this.collector.patch(mutations);
			this.render();
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			var { offsetX, deltaX } = scrollInfo;
			var { size } = this.gridExtendApi.collector;
			if (offsetX / size.scale > size.rootWidth && deltaX) {
				var fixDeltaX = fixScrollDelta(deltaX, this.collector.range.scrollLeft, this.collector.size.scrollWidth, this.collector.size.outerWidth);
				var scrollLeft = this.collector.range.scrollLeft + fixDeltaX;
				this.collector.range.updateScrollLeft(scrollLeft);
			}
			this.render();
		};
		_proto.scrollToX = function scrollToX(scrollLeft) {
			this.collector.range.updateScrollLeft(scrollLeft);
			this.render();
		};
		_proto.scrollToVisibility = function scrollToVisibility(cellPosition) {
			var { recordId = "" } = cellPosition;
			var rowInfo = this.gridExtendApi.collector.rows.getInfoByRecordId(recordId);
			if (!rowInfo) return;
			var blockInfo = this.collector.block.getRecordBlockRenderInfo(recordId, rowInfo);
			if (!blockInfo) return;
			if (blockInfo.renderRect.x < 0 || blockInfo.renderRect.x > this.collector.size.globalRect.width) {
				this.collector.range.updateScrollLeft(blockInfo.block.x - this.collector.time.getTimeSize());
				return;
			}
			var toY = getRecordFullVisibleY(rowInfo, this.gridExtendApi.collector);
			if (toY !== void 0) this.gridExtendApi.scrollToY(toY);
		};
		_proto.getTimeInfo = function getTimeInfo(offsetX, rowInfo) {
			var index = this.collector.range.getIndexByOffsetX(offsetX);
			var info = {
				index,
				timeStamp: indexToTime(index, this.collector.time)
			};
			if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) === RowType.Record) info.blockRenderInfo = this.collector.block.getRecordBlockRenderInfo(rowInfo.recordId, rowInfo);
			if ((rowInfo === null || rowInfo === void 0 ? void 0 : rowInfo.type) === RowType.GroupHead) info.blockRenderInfo = this.collector.block.getGroupBlockRenderInfo(rowInfo.path, rowInfo);
			return info;
		};
		return TimeLine;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/gantt/index.js
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
var GanttView;
var init_gantt = __esmMin((() => {
	init_esm();
	init_es$1();
	init_time_line();
	init_tap_interactive();
	init_copyright();
	init_grid();
	init_interface$9();
	init_get_info_by_offset();
	GanttView = /* @__PURE__ */ function(GridView) {
		"use strict";
		_inherits(GanttView, GridView);
		function GanttView(context) {
			var _this = GridView.call(this, context) || this;
			_this.changeDimension = (selectedId) => {
				var timeTypeTextMap = getTimeTypeTextMap();
				var typeIndex = Object.values(timeTypeTextMap).findIndex((value) => value === selectedId);
				var typeId = Object.keys(timeTypeTextMap)[typeIndex];
				var targetNewFeature = _this.renderer.featureRenderer.getFeature(IGanttMobileTapInteractive);
				if (targetNewFeature) targetNewFeature.ganttAction.clickTimeTypeSwitch({ id: Number(typeId) });
			};
			_this.isHitInGrid = (offsetX) => offsetX <= _this.collector.size.activityStartX + _this.collector.size.activityViewWidth;
			_this.isHitInGanttActivityX = (offsetX) => {
				if (!_this.timeline) return false;
				var { collector } = _this.timeline;
				return offsetX >= collector.size.startX && offsetX <= collector.size.startX + collector.size.outerWidth;
			};
			_this.isHitInGanttTimeBar = (offsetX, offsetY) => {
				if (!_this.timeline) return false;
				var { collector } = _this.timeline;
				var rowInfo = getRowInfoByOffset(offsetY, _this.collector);
				if (!rowInfo || !("recordId" in rowInfo)) return false;
				var blockInfo = collector.block.getRecordBlockRenderInfo(rowInfo.recordId, rowInfo);
				if (!blockInfo) return false;
				var { x, y: blockY, width, height } = blockInfo.renderRect;
				var y = blockY + _this.collector.size.activityStartY;
				if (offsetX >= x && offsetX <= x + width && offsetY > y && offsetY < y + height) return true;
				return false;
			};
			_this.timeline = _this._register(new TimeLine(_this));
			_this.timeline.bootstrap();
			_this.rendererModel.setTimeline(_this.timeline);
			_this._register(_this.rendererModel.onDataChange((mutations) => {
				var _a;
				(_a = _this.timeline) === null || _a === void 0 || _a.handleModelChange(mutations);
			}));
			return _this;
		}
		var _proto = GanttView.prototype;
		_proto.getType = function getType() {
			return ViewType.GANTT;
		};
		/**
		* 是否是全屏状态（隐藏表格区域）
		*/ _proto.isFullMode = function isFullMode() {
			return this.collector.size.rootWidth === 0;
		};
		_proto.getRecordIdByOffsetY = function getRecordIdByOffsetY(offsetY) {
			var rowinfo = getRowInfoByOffset(offsetY, this.collector);
			if (rowinfo && rowinfo.type === RowType.Record) return rowinfo.recordId;
		};
		_proto.getGanttTimeLine = function getGanttTimeLine() {
			return this.timeline;
		};
		_proto.recollect = function recollect() {
			var _a;
			GridView.prototype.recollect.call(this);
			(_a = this.timeline) === null || _a === void 0 || _a.collector.collect();
		};
		_proto.render = function render() {
			var _a;
			GridView.prototype.render.call(this);
			(_a = this.timeline) === null || _a === void 0 || _a.render();
		};
		_proto.scrollToY = function scrollToY(scrollTop) {
			var _a;
			GridView.prototype.scrollToY.call(this, scrollTop);
			(_a = this.timeline) === null || _a === void 0 || _a.renderMain();
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			var _a;
			GridView.prototype.scrollByDelta.call(this, scrollInfo);
			(_a = this.timeline) === null || _a === void 0 || _a.scrollByDelta(scrollInfo);
		};
		/**
		* 获取时间轴裁剪区域
		*/ _proto.getBodyClipRect = function getBodyClipRect() {
			if (!this.timeline) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			var { size } = this.collector;
			var { x, width, height } = this.timeline.collector.size.bodyRect;
			return {
				x: x + 1,
				y: size.activityStartY + 1,
				width,
				height
			};
		};
		_proto.scrollToVisibility = function scrollToVisibility(cellPosition, delta) {
			var _a;
			if (ua.isMobile) {
				(_a = this.timeline) === null || _a === void 0 || _a.scrollToVisibility(cellPosition);
				return;
			}
			this.rendererModel.scrollToVisibility(cellPosition, delta);
		};
		_proto.handleResize = function handleResize(scale) {
			var _a;
			GridView.prototype.handleResize.call(this, scale);
			(_a = this.timeline) === null || _a === void 0 || _a.resize();
		};
		_create_class(GanttView, [{
			key: "ganttWidth",
			get: function() {
				return this.collector.size.ganttRootWidth;
			}
		}]);
		return GanttView;
	}(GridView);
}));
//#endregion
export { init_gantt as n, GanttView as t };
