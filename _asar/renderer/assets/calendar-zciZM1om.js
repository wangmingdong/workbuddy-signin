import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as require_debounce } from "./throttle-mAPE4S6V.js";
import { n as __awaiter, o as __metadata, p as init_tslib_es6, r as __decorate } from "./tslib.es6-8NkKEYUK.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event, xn as require_dayjs_min } from "./esm-cVQVEiWG.js";
import { $i as MutationId, $l as init_es, Fc as isPrimaryFormulaError, Is as require_zh_cn, Ku as throttle, Lc as isDateLikeField, Od as getSpecialDayValidRange, Vl as ViewType$1, Vu as require_dist, Wl as RowHeightLevel, Xu as domainConfig, Yu as logger, au as getI18nMonthText, id as isSmartCanvas, kd as getLunarCalendarDay, kl as ASYNC_THRESHOLD_COUNT, nu as getDayHourText, ou as getI18nMonthTextByTime, qu as ViewType, su as showNotAllEditableToast, uu as slicePush, vs as EditableStatus, wd as i18n, zs as CALENDAR_TIME_TYPES } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { c as require_cloneDeep } from "./merge-vXYl4M0x.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { A as Status, At as init_utils$1, B as init_feature_single, Bt as performanceReport, D as getBlockStyle, F as init_scroller, H as pen, I as init_register_esc_to_cancel, J as init_config, K as init_lib, L as registerEscToCancel, M as BaseRenderer, Mt as renderAppConfigService, N as init_base_renderer, Nt as RenderAppConfigKey, Ot as getMainWidth, P as CommonScroller, Pt as init_index_interface$1, R as BaseFeature, U as init_resources, V as init_pen, Y as Level, a as BaseCollector, c as init_state$1, d as getStorageValue, et as init_is_in_rect, f as init_storage_sync, h as init_data_util$1, i as init_base_renderer_model, j as init_base_status, jt as init_render_app_config, k as init_get_block_style, kt as getScrollConfig, l as BaseSizeCollector, m as BaseCollectorDataUtil, n as init_canvas_view, nt as FeatureUIEvent, o as init_collector$1, ot as Cursor, p as setStorageValue, pt as NormalIconAlias, q as DrawType, r as BaseRendererModel, rt as init_feature_event, s as BaseStateCollector, st as init_cursor, t as BaseCanvasView, tt as isHitRect, u as init_size$1, vt as init_style, yt as style, z as FeatureAuth, zt as init_performance } from "./canvas-view-DDuMsrmC.js";
import { a as init_format_time, d as init_range_model, o as toMondayTime, r as init_time_util, t as TimeUtil, u as RangeModel } from "./time-util-BfGHaEiB.js";
import { a as init_binary_search, i as binarySearch, n as init_common_action, t as CommonAction } from "./common-action-BPA9xdl-.js";
import { i as init_work_day, n as init_get_primary_title, r as WorkDayService, t as getRecordPrimaryTitle } from "./get-primary-title-B9E0hwv1.js";
import { n as mapWbFieldTitle, t as init_field_title } from "./field-title-CxPwqqcd.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/interface.js
var TargetType;
var init_interface$9 = __esmMin((() => {
	(function(TargetType) {
		TargetType["TIME_BAR"] = "timeBar";
		TargetType["SIDEBAR_SCHEDULE"] = "sidebarSchedule";
		TargetType["CELL"] = "cell";
		TargetType["HEAD"] = "head";
		TargetType["BLANK"] = "blank";
	})(TargetType || (TargetType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/event-handler/index.js
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
function getCalendarTarget(offset, collector) {
	var { x: offsetX, y: offsetY } = offset;
	var { timeBar } = collector;
	var isOutsideStage = !isHitRect(offsetX, offsetY, collector.size.viewRect);
	var target = {
		type: isOutsideStage ? TargetType.BLANK : TargetType.HEAD,
		isBlank: isOutsideStage,
		isOutStage: isOutsideStage
	};
	if (isHitRect(offsetX, offsetY, collector.size.bodyRect)) {
		var target1 = Object.assign(Object.assign({}, getCellTargetByOffset(offsetX, offsetY, collector)), { type: TargetType.CELL });
		var hitRecord = timeBar.getBlockList().find((timeBlock) => isHitRect(offsetX, offsetY, timeBlock.rect));
		if (!hitRecord) return target1;
		return Object.assign(Object.assign(Object.assign({}, target1), hitRecord), { type: TargetType.TIME_BAR });
	}
	if (isHitRect(offsetX, offsetY, collector.size.sidebarRect)) {
		var target2 = {
			type: TargetType.SIDEBAR_SCHEDULE,
			isBlank: false,
			isOutStage: false
		};
		if (isHitRect(offsetX, offsetY, collector.size.sidebarBodyRect)) {
			var recordInfo = getSideBarInfoByOffset(offsetX, offsetY, collector);
			if (recordInfo) return Object.assign(Object.assign({}, target2), recordInfo);
		}
		return target2;
	}
	return target;
}
/**
* 根据纵坐标获取侧边栏信息
* @param offsetY
* @param collector
* @returns
*/ function getSideBarInfoByOffset(offsetX, offsetY, collector) {
	var { sidebar } = collector;
	if (sidebar.getRecords().length === 0) return;
	var recordIndex = binarySearch(offsetY, 0, sidebar.getRecords().length - 1, (index) => sidebar.getRecord(index).rect.y);
	var recordInfo = sidebar.getRecord(recordIndex);
	if (!isHitRect(offsetX, offsetY, recordInfo.rect)) return;
	return Object.assign(Object.assign({}, recordInfo), { index: recordIndex });
}
function getCellTargetByOffset(offsetX, offsetY, collector) {
	var rowIndex = collector.row.getRowIndexByOffsetY(offsetY);
	var columnIndex = Math.floor((offsetX - collector.size.bodyRect.x) / collector.size.cellWidth);
	return {
		rowIndex,
		columnIndex,
		cellTime: collector.time.getUnitTime(rowIndex, columnIndex),
		isBlank: false,
		isOutStage: false
	};
}
var import_main$8, CalendarEventHandler;
var init_event_handler = __esmMin((() => {
	import_main$8 = require_main();
	init_feature_event();
	init_interface$9();
	init_binary_search();
	init_is_in_rect();
	CalendarEventHandler = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$27(CalendarEventHandler, Disposable);
		function CalendarEventHandler(stage, root, rendererModel) {
			var _this = Disposable.call(this) || this;
			_this.stage = stage;
			_this.root = root;
			_this.rendererModel = rendererModel;
			_this.UIEvent = _this._register(new FeatureUIEvent({
				root: _this.root,
				stage: _this.stage,
				getScale: () => _this.rendererModel.collector.size.scale,
				targetGetter: (offset) => getCalendarTarget(offset, _this.rendererModel.collector)
			}));
			return _this;
		}
		return CalendarEventHandler;
	}(import_main$8.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/action.js
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
var ScheduleOperation, CalendarAction;
var init_action = __esmMin((() => {
	init_es();
	init_common_action();
	(function(ScheduleOperation) {
		ScheduleOperation[ScheduleOperation["EDIT"] = 1] = "EDIT";
		ScheduleOperation[ScheduleOperation["ADD"] = 2] = "ADD";
		ScheduleOperation[ScheduleOperation["SET"] = 3] = "SET";
		ScheduleOperation[ScheduleOperation["CLEAR"] = 4] = "CLEAR";
	})(ScheduleOperation || (ScheduleOperation = {}));
	CalendarAction = /* @__PURE__ */ function(CommonAction) {
		"use strict";
		_inherits$26(CalendarAction, CommonAction);
		function CalendarAction(context, dataUtil, collector, parentApi) {
			var _this = CommonAction.call(this, context, dataUtil) || this;
			_this.context = context;
			_this.dataUtil = dataUtil;
			_this.collector = collector;
			_this.parentApi = parentApi;
			return _this;
		}
		var _proto = CalendarAction.prototype;
		_proto.getScale = function getScale() {
			return this.collector.size.scale;
		};
		/**
		* 切换侧边栏
		*/ _proto.toggleSidebar = function toggleSidebar() {
			this.collector.dataUtil.toggleSidebarOpen();
			this.collector.collect();
			this.parentApi.render();
		};
		/**
		* 添加日程
		* @param time 为空则是空白，不为空是指定的时间单位
		*/ _proto.addSchedule = function addSchedule(rect, time) {
			var addTime = void 0;
			if (time) {
				var date = new Date(time);
				var currentDate = /* @__PURE__ */ new Date();
				date.setHours(currentDate.getHours());
				date.setMinutes(currentDate.getMinutes());
				addTime = date.getTime();
			}
			this.context.emitter.service.scheduleOperation.fire({
				type: ScheduleOperation.ADD,
				startTime: addTime,
				endTime: addTime,
				rect
			});
		};
		/**
		* 日程条点击事件响应
		* @param target
		* @returns
		*/ _proto.showSchedule = function showSchedule(target) {
			if (!target || !target.rect || !target.recordId) return;
			this.context.emitter.service.scheduleOperation.fire({
				type: ScheduleOperation.EDIT,
				recordId: target.recordId,
				rect: target.rect
			});
		};
		/**
		* 显示单元格的更多日程
		* @param rect
		* @param param 单元格对应的时间（天）
		*/ _proto.showMoreSchedule = function showMoreSchedule(rect, time, moreCount) {
			this.context.emitter.service.schedulePanel.fire({
				rect,
				time,
				moreCount
			});
			if (domainConfig.getIsWb()) this.context.emitter.wbService.onRecordMiniListShow.fire({
				recordIds: this.dataUtil.getDaySchedulesRecordIds(time),
				cellRect: rect,
				title: this.getMiniListTitle(time)
			});
		};
		/**
		* 构造 mini-list 浮层标题：`「{mm月dd日} {农历文本}」`。
		*
		* 农历文本口径与 `content/cell.ts#getLunarCalendarTitle` 保持一致（月初显示 `monthText`，其它显示 `dayText`），
		* 以避免与视图内部日期格头部展示口径漂移；不支持的年份则省略农历部分。
		*/ _proto.getMiniListTitle = function getMiniListTitle(time) {
			var date = new Date(time);
			var dateText = getI18nMonthText({
				month: date.getMonth() + 1,
				day: date.getDate()
			});
			var lunar = getLunarCalendarDay(time);
			if (!lunar) return dateText;
			return `${dateText} ${lunar.day === 1 ? lunar.monthText : lunar.dayText}`;
		};
		return CalendarAction;
	}(CommonAction);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/calendar-feature.js
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
var CalendarFeatureBase;
var init_calendar_feature = __esmMin((() => {
	init_action();
	init_feature_single();
	CalendarFeatureBase = /* @__PURE__ */ function(BaseFeature) {
		"use strict";
		_inherits$25(CalendarFeatureBase, BaseFeature);
		function CalendarFeatureBase() {
			var _this = BaseFeature.apply(this, arguments) || this;
			_this.action = _this._register(new CalendarAction(_this.context, _this.collector.dataUtil, _this.collector, _this.parentApi));
			return _this;
		}
		_create_class$17(CalendarFeatureBase, [
			{
				key: "root",
				get: function() {
					return this.renderer.root;
				}
			},
			{
				key: "context",
				get: function() {
					return this.renderer.context;
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
				key: "UIEvent",
				get: function() {
					return this.renderer.UIEvent;
				}
			},
			{
				key: "rangeModel",
				get: function() {
					return this.parentApi.getRangeModel();
				}
			}
		]);
		return CalendarFeatureBase;
	}(BaseFeature);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/mobile/cell-active/main.js
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
var CalendarCellActive;
var init_main$9 = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_calendar_feature();
	init_interface$9();
	CalendarCellActive = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$24(CalendarCellActive, CalendarFeatureBase);
		function CalendarCellActive() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.isActived = false;
			_this.actionTarget = null;
			_this.render = () => {
				_this.paint();
			};
			_this.hide = () => {
				_this.group.clear();
				_this.toDeactivated();
				_this.actionTarget = null;
			};
			_this.onCanvasScroll = () => {
				_this.group.clear();
				_this.paint();
			};
			_this.onCanvasTap = (event) => {
				var { target } = event;
				if (target.type === TargetType.CELL) _this.actionTarget = target;
				_this.paint();
				_this.openList();
			};
			_this.paint = () => {
				if (!_this.actionTarget) {
					_this.hide();
					return;
				}
				_this.group.clear();
				var { row } = _this.collector;
				var unitRect = row.getUnitRect(_this.actionTarget.rowIndex, _this.actionTarget.columnIndex);
				_this.group.add(pen.config.rect(Object.assign(Object.assign({}, unitRect), {
					background: style.color.selectionBackground,
					borderColor: style.color.selectionBorderColor,
					borderWidth: 2 * style.size.borderWidth
				})));
				_this.toActived();
			};
			return _this;
		}
		var _proto = CalendarCellActive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.bodyRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onTap(this.onCanvasTap));
		};
		_proto.dispose = function dispose(trace) {
			CalendarFeatureBase.prototype.dispose.call(this, trace);
			this.removeActivedEvents();
		};
		_proto.updated = function updated() {
			this.paint();
		};
		_proto.addActivedEvents = function addActivedEvents() {
			this.resizeDisposable = this.emitter.global.resize.event(this.paint);
			this.scrollDisposable = this.emitter.global.scroll.event(this.onCanvasScroll);
		};
		_proto.removeActivedEvents = function removeActivedEvents() {
			var _a, _b;
			(_a = this.scrollDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.resizeDisposable) === null || _b === void 0 || _b.dispose();
		};
		_proto.toDeactivated = function toDeactivated() {
			if (this.isActived) {
				this.isActived = false;
				this.group.clear();
				this.removeActivedEvents();
			}
		};
		_proto.toActived = function toActived() {
			if (!this.isActived) {
				this.isActived = true;
				this.addActivedEvents();
			}
		};
		_proto.openList = function openList() {
			if (!this.actionTarget) return;
			var { time, row } = this.collector;
			var unitTime = time.getUnitTime(this.actionTarget.rowIndex, this.actionTarget.columnIndex);
			this.emitter.service.schedulePanel.fire({ time: unitTime });
			if (isSmartCanvas()) return;
			row.toStart(this.actionTarget.rowIndex);
		};
		return CalendarCellActive;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/mobile/cell-active/interface.js
var ICalendarCellActive;
var init_interface$8 = __esmMin((() => {
	init_module();
	ICalendarCellActive = createDecorator("ICalendarCellActive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/mobile/cell-active/index.js
var init_cell_active = __esmMin((() => {
	init_main$9();
	init_interface$8();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/common/scroll-animation/main.js
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
var ScrollAnimation;
var init_main$8 = __esmMin((() => {
	init_pen();
	init_calendar_feature();
	ScrollAnimation = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$23(ScrollAnimation, CalendarFeatureBase);
		function ScrollAnimation() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.opacityStep = .02;
			_this.currentOpacity = 0;
			_this.duration = 300;
			_this.stopTimer = null;
			_this.isInRender = false;
			_this.handleOffsetChange = () => {
				_this.appearWidthAnimation();
			};
			return _this;
		}
		var _proto = ScrollAnimation.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.bodyRect));
			this.layer.addGroup(this.group);
			this._register(this.collector.onOffsetChange(this.handleOffsetChange));
		};
		_proto.render = function render() {};
		_proto.dispose = function dispose(trace) {
			CalendarFeatureBase.prototype.dispose.call(this, trace);
			if (this.stopTimer) clearTimeout(this.stopTimer);
		};
		_proto.drawMonthTitle = function drawMonthTitle() {
			var headMonthTitle = this.collector.head.getHeadMonthTitle();
			if (!headMonthTitle) return;
			this.group.clear();
			var { textConfig } = headMonthTitle;
			var { row } = this.collector;
			var range = row.getRange();
			for (var rowIndex = range.startRow; rowIndex <= range.endRow; rowIndex++) if (this.collector.time.isMonthStartRow(rowIndex)) this.drawMonthTitleByRowIndex(rowIndex, textConfig);
		};
		_proto.drawMonthTitleByRowIndex = function drawMonthTitleByRowIndex(rowIndex, textConfig) {
			var { row, size, head } = this.collector;
			var rowY = row.getRowY(rowIndex);
			var text = head.getMonthTitleByRowIndex(rowIndex);
			var width = pen.util.measureTextWidth(text, textConfig.fontSize, textConfig.fontStyle);
			this.group.add(pen.config.text({
				x: textConfig.x,
				height: textConfig.height,
				fontSize: textConfig.fontSize,
				fontStyle: textConfig.fontStyle,
				id: text,
				text,
				width,
				y: rowY + size.cellPaddingTop,
				opacity: this.currentOpacity
			}));
		};
		_proto.appearWidthAnimation = function appearWidthAnimation() {
			this.drawMonthTitle();
			if (this.currentOpacity >= 1) {
				this.isInRender = false;
				this.currentOpacity = 1;
				if (this.stopTimer) clearTimeout(this.stopTimer);
				this.stopTimer = setTimeout(() => {
					this.disappearWidthAnimation();
				}, this.duration);
				return;
			}
			this.isInRender = true;
			this.currentOpacity += this.opacityStep;
			requestAnimationFrame(() => this.appearWidthAnimation());
		};
		_proto.disappearWidthAnimation = function disappearWidthAnimation() {
			if (this.isInRender) return;
			this.currentOpacity -= this.opacityStep;
			if (this.currentOpacity <= 0) {
				this.group.clear();
				this.currentOpacity = 0;
				return;
			}
			this.drawMonthTitle();
			requestAnimationFrame(() => this.disappearWidthAnimation());
		};
		return ScrollAnimation;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/common/scroll-animation/interface.js
var IScrollAnimation;
var init_interface$7 = __esmMin((() => {
	init_module();
	IScrollAnimation = createDecorator("IScrollAnimation");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/common/scroll-animation/index.js
var init_scroll_animation = __esmMin((() => {
	init_main$8();
	init_interface$7();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/mobile/interactive/main.js
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
var CalendarMobileInteractive;
var init_main$7 = __esmMin((() => {
	init_pen();
	init_style();
	init_calendar_feature();
	init_interface$9();
	init_is_in_rect();
	CalendarMobileInteractive = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$22(CalendarMobileInteractive, CalendarFeatureBase);
		function CalendarMobileInteractive() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			/**
			* tap 事件监听入口
			* @param param
			*/ _this.onCanvasTap = (event) => {
				var { target } = event;
				if (target) {
					_this.doAsignActionTap(event);
					return;
				}
			};
			return _this;
		}
		var _proto = CalendarMobileInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.viewRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onTap(this.onCanvasTap));
		};
		_proto.render = function render() {};
		/**
		*  tap 处理
		* @param action
		*/ _proto.doAsignActionTap = function doAsignActionTap(event) {
			var _a;
			var { target, x, y } = event;
			if (target.type !== TargetType.HEAD) return;
			var todaySwitcher = this.collector.head.getTodaySwitcher();
			if (todaySwitcher && isHitRect(x, y, todaySwitcher.textConfig)) {
				this.collector.row.toToday();
				this.showPress(todaySwitcher.textConfig);
				return;
			}
			var sidebarButtonRect = (_a = this.collector.head.getHeadToggleButton()) === null || _a === void 0 ? void 0 : _a.rect;
			if (sidebarButtonRect && isHitRect(x, y, sidebarButtonRect)) {
				this.emitter.service.unplanSchedulePanel.fire();
				this.showPress(sidebarButtonRect);
			}
		};
		/**
		* 显示 press
		* @param rect
		*/ _proto.showPress = function showPress(rect) {
			this.group.clear();
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius
			})));
			setTimeout(() => {
				this.group.clear();
			}, 180);
		};
		return CalendarMobileInteractive;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/mobile/interactive/interface.js
var ICalendarMobileInteractive;
var init_interface$6 = __esmMin((() => {
	init_module();
	ICalendarMobileInteractive = createDecorator("ICalendarMobileInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/mobile/interactive/index.js
var init_interactive = __esmMin((() => {
	init_main$7();
	init_interface$6();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/search/index.js
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
var CalendarSearch;
var init_search = __esmMin((() => {
	init_pen();
	init_style();
	init_calendar_feature();
	CalendarSearch = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$21(CalendarSearch, CalendarFeatureBase);
		function CalendarSearch() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.isActived = false;
			_this.render = () => {
				_this.checkSearchState();
			};
			_this.showRecordRect = (recordId) => {
				var blockList = _this.collector.timeBar.getBlockListByRecord(recordId);
				var isSelected = _this.collector.state.getSearchSelectedRecordId() === recordId;
				blockList.forEach((block) => {
					_this.group.add(pen.config.rect(Object.assign(Object.assign(Object.assign({}, block.rect), _this.borderStyle), {
						borderRadius: style.size.borderRadius,
						opacity: isSelected ? 1 : .4
					})));
				});
			};
			_this.onScroll = () => {
				_this.showSearchResult();
			};
			_this.onHorizontalScroll = () => {
				_this.showSearchResult();
			};
			return _this;
		}
		var _proto = CalendarSearch.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.viewRect));
			this.layer.addGroup(this.group);
			this.showSearchResult();
		};
		_proto.dispose = function dispose(trace) {
			this.clearRect();
			this.removeActivedEvents();
			this.toDeactivated();
			CalendarFeatureBase.prototype.dispose.call(this, trace);
		};
		/**
		* 退出活跃态，会调用 removeActivedEvents
		*/ _proto.toDeactivated = function toDeactivated() {
			if (this.isActived) {
				this.isActived = false;
				this.group.clear();
				this.removeActivedEvents();
			}
		};
		/**
		* 进入活跃态，会调用 addActivedEvents
		*/ _proto.toActived = function toActived() {
			if (!this.isActived) {
				this.isActived = true;
				this.addActivedEvents();
			}
		};
		_proto.addActivedEvents = function addActivedEvents() {
			this.scrollDisposable = this.emitter.global.scroll.event(this.onScroll);
			this.horizontalScrollDisposable = this.emitter.service.calendarHorizontalScroll.event(this.onHorizontalScroll);
		};
		_proto.removeActivedEvents = function removeActivedEvents() {
			var _a, _b;
			(_a = this.scrollDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.horizontalScrollDisposable) === null || _b === void 0 || _b.dispose();
		};
		_proto.checkSearchState = function checkSearchState() {
			if (this.collector.state.getHighlightInfos().recordIds.size) this.showSearchResult();
			else this.hideSearchResult();
		};
		_proto.showSearchResult = function showSearchResult() {
			this.group.clear();
			var { recordIds } = this.collector.state.getHighlightInfos();
			recordIds.forEach(this.showRecordRect);
			this.toActived();
		};
		_proto.hideSearchResult = function hideSearchResult() {
			this.group.clear();
			this.toDeactivated();
		};
		_proto.clearRect = function clearRect() {
			this.group.clear();
		};
		_create_class$16(CalendarSearch, [{
			key: "borderStyle",
			get: function() {
				return {
					borderWidth: style.size.borderWidth,
					borderColor: style.color.searchHighlightBorderColor
				};
			}
		}]);
		return CalendarSearch;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/search/index.interface.js
var ICalendarSearch;
var init_index_interface = __esmMin((() => {
	init_module();
	ICalendarSearch = createDecorator("ICalendarSearch");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/mobile/entries.js
function getMobileFeatures() {
	return [
		{
			id: ICalendarCellActive,
			ctor: CalendarCellActive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: ICalendarSearch,
			ctor: CalendarSearch,
			config: { auth: FeatureAuth.None }
		},
		{
			id: ICalendarMobileInteractive,
			ctor: CalendarMobileInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IScrollAnimation,
			ctor: ScrollAnimation,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries$1 = __esmMin((() => {
	init_scroll_animation();
	init_cell_active();
	init_interactive();
	init_search();
	init_index_interface();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/area-interactive/interface.js
var ICalendarAreaInteractive;
var init_interface$5 = __esmMin((() => {
	init_module();
	ICalendarAreaInteractive = createDecorator("ICalendarAreaInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/get-cell-button-config.js
function getCellAddButtonConfig(rowIndex, columnIndex, collector) {
	var moreSchedules = collector.cell.getCellMoreSchedules(rowIndex, columnIndex);
	var padding = collector.size.buttonPadding;
	if (!(moreSchedules === null || moreSchedules === void 0 ? void 0 : moreSchedules.rect)) return { level: CellAddButtonLevel.NONE_BUTTON };
	var moreTextRect = moreSchedules.rect;
	var addButtonSize = style.size.iconSmall;
	var addTextWidth = pen.util.measureTextWidth(i18n.t("添加记录"), style.size.fontSizeSmall);
	if (collector.size.cellWidth < moreTextRect.width + 3 * padding + addButtonSize) return { level: CellAddButtonLevel.NONE_BUTTON };
	var cellRect = collector.row.getUnitRect(rowIndex, columnIndex);
	var buttonWidth = addButtonSize + 2 * padding;
	var buttonRect = {
		x: cellRect.x + cellRect.width - padding - buttonWidth,
		y: moreTextRect.y,
		width: buttonWidth,
		height: moreTextRect.height
	};
	var iconRect = {
		x: buttonRect.x + padding,
		y: moreTextRect.y + (moreTextRect.height - addButtonSize) / 2,
		width: addButtonSize,
		height: addButtonSize
	};
	if (collector.size.cellWidth < moreTextRect.width + 3 * padding + buttonRect.width + addTextWidth) return {
		level: CellAddButtonLevel.ONLY_ICON,
		config: [Object.assign({}, iconRect)],
		rect: Object.assign({}, buttonRect)
	};
	buttonRect.x -= addTextWidth;
	buttonRect.width += addTextWidth;
	iconRect.x -= addTextWidth;
	return {
		level: CellAddButtonLevel.ICON_AND_TEXT,
		config: [Object.assign({}, iconRect), {
			x: iconRect.x + iconRect.width,
			y: moreTextRect.y,
			width: addTextWidth,
			height: moreTextRect.height
		}],
		rect: Object.assign({}, buttonRect)
	};
}
var CellAddButtonLevel;
var init_get_cell_button_config = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	(function(CellAddButtonLevel) {
		CellAddButtonLevel[CellAddButtonLevel["NONE_BUTTON"] = 0] = "NONE_BUTTON";
		CellAddButtonLevel[CellAddButtonLevel["ONLY_ICON"] = 1] = "ONLY_ICON";
		CellAddButtonLevel[CellAddButtonLevel["ICON_AND_TEXT"] = 2] = "ICON_AND_TEXT";
	})(CellAddButtonLevel || (CellAddButtonLevel = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/area-interactive/main.js
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
var CalendarAreaInteractive;
var init_main$6 = __esmMin((() => {
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_calendar_feature();
	init_interface$9();
	init_interface$5();
	init_get_cell_button_config();
	init_cursor();
	init_is_in_rect();
	CalendarAreaInteractive = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$20(CalendarAreaInteractive, CalendarFeatureBase);
		function CalendarAreaInteractive() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.clearBeforeAnyHover();
				if (_this.target && _this.target.type === TargetType.HEAD) _this.hoverHead();
			};
			_this.onStageMouseMove = (evt) => {
				if (_this.isPreventFromOtherFeature()) return;
				_this.clearBeforeAnyHover();
				_this.setCursor(Cursor.DEFAULT);
				_this.offsetX = evt.x;
				_this.offsetY = evt.y;
				_this.target = evt.target;
				switch (evt.target.type) {
					case TargetType.HEAD:
						_this.hoverHead();
						break;
					case TargetType.SIDEBAR_SCHEDULE:
						_this.hoverSidebar();
						break;
					case TargetType.TIME_BAR:
					case TargetType.CELL: _this.hoverBody();
				}
			};
			_this.clearBeforeAnyHover = () => {
				_this.group.clear();
				_this.action.hideToolTip();
			};
			_this.onStageResize = () => {
				_this.group.setAttrs(_this.collector.size.viewRect);
			};
			return _this;
		}
		var _proto = CalendarAreaInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.viewRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.stage.onMouseLeave(this.clearBeforeAnyHover));
			this._register(this.UIEvent.stage.onResize(this.onStageResize));
		};
		_proto.hoverHead = function hoverHead() {
			var _a;
			var toggleButtonRect = (_a = this.collector.head.getHeadToggleButton()) === null || _a === void 0 ? void 0 : _a.rect;
			var todaySwitcher = this.collector.head.getTodaySwitcher();
			var { borderRadius } = style.size;
			if (toggleButtonRect && isHitRect(this.offsetX, this.offsetY, toggleButtonRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, toggleButtonRect), {
					background: style.color.hoverBackground,
					onClick: () => {
						this.action.toggleSidebar();
					}
				})));
				this.setCursor(Cursor.POINTER);
			}
			if (!todaySwitcher) return;
			var { leftIconConfig, textConfig, rightIconConfig } = todaySwitcher;
			if (leftIconConfig && isHitRect(this.offsetX, this.offsetY, leftIconConfig)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, leftIconConfig), {
					background: style.color.hoverBackground,
					borderRadius,
					onClick: () => {
						this.collector.row.toPrev();
					}
				})));
				this.setCursor(Cursor.POINTER);
				this.action.showToolTip(i18n.t("前一月"), leftIconConfig);
			}
			if (textConfig && isHitRect(this.offsetX, this.offsetY, textConfig)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, textConfig), {
					background: style.color.hoverBackground,
					borderRadius,
					onClick: () => {
						this.collector.row.toToday();
					}
				})));
				this.setCursor(Cursor.POINTER);
			}
			if (rightIconConfig && isHitRect(this.offsetX, this.offsetY, rightIconConfig)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, rightIconConfig), {
					background: style.color.hoverBackground,
					borderRadius,
					onClick: () => {
						this.collector.row.toNext();
					}
				})));
				this.setCursor(Cursor.POINTER);
				this.action.showToolTip(i18n.t("后一月"), rightIconConfig);
			}
		};
		_proto.hoverSidebar = function hoverSidebar() {
			var target = this.target;
			if (isHitRect(this.offsetX, this.offsetY, this.collector.size.sidebarHeadRect)) {
				var sidebarToggleButton = this.collector.sidebar.getFoldIcon();
				if (sidebarToggleButton && isHitRect(this.offsetX, this.offsetY, sidebarToggleButton.rect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, sidebarToggleButton.rect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius,
					onClick: () => {
						this.action.toggleSidebar();
					}
				})));
				return;
			}
			var sidebarAddRecordButton = this.collector.sidebar.getAddRecord();
			if (sidebarAddRecordButton && isHitRect(this.offsetX, this.offsetY, sidebarAddRecordButton.rect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, sidebarAddRecordButton.rect), {
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onClick: () => {
					if (this.tryFireWbTodoCardClick({ recordId: "" })) return;
					this.action.addSchedule(sidebarAddRecordButton.rect);
				}
			})));
			if (!target.rect) return;
			if (isHitRect(this.offsetX, this.offsetY, target.rect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, target.rect), {
				background: style.color.hoverBackground,
				onMouseUp: (e) => {
					var _a;
					if (this.tryFireWbTodoCardClick({ recordId: String((_a = target.recordId) !== null && _a !== void 0 ? _a : "") })) return;
					this.action.showSchedule(target);
				}
			})));
		};
		_proto.hoverBody = function hoverBody() {
			this.hoverCell();
			if (this.target.type === TargetType.TIME_BAR) {
				var target = this.target;
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, this.target.rect), {
					background: style.color.hoverBackground,
					onMouseUp: (e) => {
						var _a;
						if (this.tryFireWbTodoCardClick({
							recordId: String((_a = target.recordId) !== null && _a !== void 0 ? _a : ""),
							time: target.cellTime
						})) return;
						this.action.showSchedule(target);
					}
				})), 0, 0, this.collector.size.bodyRect);
			}
		};
		_proto.hoverCell = function hoverCell() {
			var { columnIndex, rowIndex, cellTime } = this.target;
			var cellRect = this.collector.row.getUnitRect(rowIndex, columnIndex);
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, cellRect), { background: style.color.hoverBackground })), 0, 0, this.collector.size.bodyRect);
			var moreSchedules = this.collector.cell.getCellMoreSchedules(rowIndex, columnIndex);
			if (!moreSchedules) return;
			var moreRecordCount = moreSchedules.recordCount;
			var { canInsertRecord } = this;
			if (moreRecordCount === 0) {
				canInsertRecord && this.showNoMoreMenuButton(rowIndex, columnIndex);
				return;
			}
			canInsertRecord && this.showHasMoreMenuButton(rowIndex, columnIndex);
			if (isHitRect(this.offsetX, this.offsetY, moreSchedules.rect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, moreSchedules.rect), {
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onClick: () => this.action.showMoreSchedule(moreSchedules.rect, cellTime, moreRecordCount)
			})));
		};
		_proto.showNoMoreMenuButton = function showNoMoreMenuButton(rowIndex, columnIndex) {
			var { size, row } = this.collector;
			var timeBarCount = this.collector.timeBar.getTimeBarCountInCell(rowIndex, columnIndex);
			var addButtonRect = {
				x: row.getUnitX(columnIndex) + size.cellPaddingLeft,
				y: row.getRowY(rowIndex) + size.cellPaddingTop + timeBarCount * (size.timeBarHeight + size.timeBarMarginTop),
				width: size.cellWidth - 2 * size.cellPaddingLeft,
				height: size.timeBarHeight
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, addButtonRect), {
				borderRadius: style.size.borderRadius,
				borderDash: true,
				borderWidth: style.size.borderWidth
			})), 0, 0, this.collector.size.bodyRect);
			var addText = i18n.t("添加记录");
			var textWidth = pen.util.measureTextWidth(addText);
			var textRect = {
				x: addButtonRect.x + (addButtonRect.width - textWidth) / 2,
				y: addButtonRect.y,
				width: textWidth,
				height: addButtonRect.height
			};
			this.group.add(pen.config.text(Object.assign(Object.assign({}, textRect), {
				verticalAlign: "middle",
				text: addText,
				color: style.color.normalFontColor
			})), 0, 0, this.collector.size.bodyRect);
			if (isHitRect(this.offsetX, this.offsetY, addButtonRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, addButtonRect), {
					background: style.color.hoverBackground,
					onClick: () => {
						if (this.tryFireWbTodoCardClick({
							recordId: "",
							time: this.target.cellTime
						})) return;
						this.action.addSchedule(addButtonRect, this.target.cellTime);
					}
				})), 0, 0, this.collector.size.bodyRect);
				this.setCursor(Cursor.POINTER);
			}
		};
		_proto.showHasMoreMenuButton = function showHasMoreMenuButton(rowIndex, columnIndex) {
			var addButtonInfo = getCellAddButtonConfig(rowIndex, columnIndex, this.collector);
			if (!addButtonInfo.rect) return;
			if (addButtonInfo.level === CellAddButtonLevel.ONLY_ICON) {
				var iconConfig = addButtonInfo.config[0];
				this.group.add(pen.config.icon(NormalIconAlias.ADD, Object.assign({}, iconConfig)), 0, 0, this.collector.size.bodyRect);
			}
			if (addButtonInfo.level === CellAddButtonLevel.ICON_AND_TEXT) {
				var iconConfig1 = addButtonInfo.config[0];
				var textConfig = addButtonInfo.config[1];
				var addText = i18n.t("添加记录");
				this.group.add(pen.config.icon(NormalIconAlias.ADD, Object.assign({}, iconConfig1)), 0, 0, this.collector.size.bodyRect);
				this.group.add(pen.config.text(Object.assign(Object.assign({}, textConfig), {
					verticalAlign: "middle",
					text: addText,
					color: style.color.normalFontColor,
					fontSize: style.size.fontSizeSmall
				})), 0, 0, this.collector.size.bodyRect);
			}
			if (isHitRect(this.offsetX, this.offsetY, addButtonInfo.rect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, addButtonInfo.rect), {
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onClick: () => {
					if (this.tryFireWbTodoCardClick({
						recordId: "",
						time: this.target.cellTime
					})) return;
					this.action.addSchedule(addButtonInfo.rect, this.target.cellTime);
				}
			})), 0, 0, this.collector.size.bodyRect);
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(ICalendarAreaInteractive);
		};
		/**
		* wb 模式下，将"添加记录"和"时间条"的点击代理给外部业务侧
		* @param payload.recordId 时间条/侧边栏日程传 recordId；添加记录场景传空串
		* @param payload.time 该交互对应的时间戳（毫秒），便于外部业务在新增记录时预填时间字段；侧边栏不传
		* @returns 是否已被 wb 拦截（true 表示调用方应 return，不再执行原有点击逻辑）
		*/ _proto.tryFireWbTodoCardClick = function tryFireWbTodoCardClick(payload) {
			if (!domainConfig.getIsWb()) return false;
			this.emitter.wbService.onRecordClick.fire(payload);
			return true;
		};
		_create_class$15(CalendarAreaInteractive, [{
			key: "canInsertRecord",
			get: function() {
				return this.parentApi.getStatus().canInsertRecord;
			}
		}]);
		return CalendarAreaInteractive;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/area-interactive/index.js
var init_area_interactive = __esmMin((() => {
	init_main$6();
	init_interface$5();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/block-drag/interface.js
var ICalendarBlockDrag;
var init_interface$4 = __esmMin((() => {
	init_module();
	ICalendarBlockDrag = createDecorator("ICalendarBlockDrag");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/apply-schedule-set.js
/**
* 「日历日程时间修改」直写数据通道。
*
* 背景：日历 `block-drag` / `block-move` 原本通过 `emitter.service.scheduleOperation.fire`
* 把 SET / CLEAR 事件抛给 SDK 兜底（`smartsheet-sdk/calendar-operation`）。
* 但 wb 宿主下没有这层 SDK，事件 fire 出去无人接听，导致拖拽 / 移动后数据未落库。
*
* 这里复用与 gantt `block-drag` / `block-move` 同源的「feature 内部直接调
* `behaviorApi.setRecord`」模式，让 wb 宿主无需借助 SDK 也能完成写入。
*
* 非 wb 宿主仍然走原 emitter 路径，确保 SDK 侧的 `formatEvent` / `showDateConfigToast` 等
* 额外业务逻辑继续生效；本工具的调用方在外层用 `domainConfig.getIsWb()` 做分支即可。
*
* 行为与 SDK `CalendarOperationService.setSchedule` / `DateConfigSettingService.timeRecordClean`
* 保持等价：
* - 取当前视图的 `dateConfig`，至少需要 `startDateFieldId`；
* - 按列粒度校验编辑权限（`canEditField`），无权限的字段不写入；
* - SET：startTime / endTime 任一为 undefined 时跳过对应字段；
* - CLEAR：startTime / endTime 显式传 `null` 即可。
*
* @returns 是否真的下发了写入请求；当 `customConfig` 视图、缺少 `behaviorApi`、缺少
*   `dateConfig` 或全部字段都不可编辑时返回 false，调用方可据此决定是否回退到 emit 路径。
*/ function applyScheduleSetInPlace(params) {
	var { context, dataUtil, parentApi, recordId, startTime, endTime } = params;
	if (context.customConfig || typeof context.getBehaviorApi !== "function") return false;
	var dateConfig = dataUtil.getDateConfig();
	if (!dateConfig) return false;
	var { startDateFieldId, endDateFieldId } = dateConfig;
	if (!startDateFieldId) return false;
	var status = parentApi.getStatus();
	var isStartEditable = status.getPermissionStatus("canEditField", { fieldId: startDateFieldId });
	var isEndEditable = !!endDateFieldId && status.getPermissionStatus("canEditField", { fieldId: endDateFieldId });
	var delta = {};
	if (startTime !== void 0 && isStartEditable) delta[startDateFieldId] = { value: startTime };
	if (endTime !== void 0 && isEndEditable && endDateFieldId && endDateFieldId !== startDateFieldId) delta[endDateFieldId] = { value: endTime };
	if (Object.keys(delta).length === 0) return false;
	var table = context.getCurrentTable();
	var view = context.getCurrentView();
	if (!table || !view) return false;
	context.getBehaviorApi().setRecord({
		tableId: table.id,
		viewId: view.id,
		recordId,
		delta
	});
	return true;
}
var init_apply_schedule_set = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/is-hover-calendar-feature.js
function getBlockHeadDrag(timeBlock, collector) {
	if (timeBlock.rowIndex !== collector.row.getRowIndexByTime(timeBlock.timeRange[0])) return;
	var { dragRectWidth } = collector.size;
	var { rect } = timeBlock;
	return Object.assign(Object.assign({}, rect), { width: dragRectWidth });
}
function getBlockTailDrag(timeBlock, collector) {
	if (timeBlock.rowIndex !== collector.row.getRowIndexByTime(timeBlock.timeRange[1])) return;
	var { dragRectWidth } = collector.size;
	var { rect } = timeBlock;
	return Object.assign(Object.assign({}, rect), {
		x: rect.x + rect.width - dragRectWidth,
		width: dragRectWidth
	});
}
var init_is_hover_calendar_feature = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/lines-by-layout.js
function getLinesByLayoutRange(layoutRange, specialRow) {
	var { startRow, startColumn, endColumn, endRow } = layoutRange;
	var lines = [];
	for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) if (specialRow && rowIndex === specialRow.rowIndex) lines.push({
		rowIndex,
		startColumn: 0,
		endColumn: 6,
		index: specialRow.index
	});
	else lines.push({
		rowIndex,
		startColumn: 0,
		endColumn: 6,
		index: 0
	});
	lines[0].startColumn = startColumn;
	lines[lines.length - 1].endColumn = endColumn;
	return lines;
}
function getLineByLayoutRange(layoutRange, rowIndex) {
	var { startRow, startColumn, endColumn, endRow } = layoutRange;
	if (rowIndex < startRow || rowIndex > endRow) return;
	var line = {
		rowIndex,
		startColumn: 0,
		endColumn: 6,
		index: 0
	};
	if (rowIndex === startRow) line.startColumn = startColumn;
	if (rowIndex === endRow) line.endColumn = endColumn;
	return line;
}
var init_lines_by_layout = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/block-drag/main.js
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
var import_cloneDeep$1, CalendarBlockDrag;
var init_main$5 = __esmMin((() => {
	import_cloneDeep$1 = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_es();
	init_es$1();
	init_pen();
	init_style();
	init_event_handler();
	init_action();
	init_calendar_feature();
	init_interface$9();
	init_interface$4();
	init_apply_schedule_set();
	init_is_hover_calendar_feature();
	init_lines_by_layout();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	CalendarBlockDrag = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$19(CalendarBlockDrag, CalendarFeatureBase);
		function CalendarBlockDrag() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.dragBuffer = 6;
			_this.isInDragging = false;
			_this.isReadyToDrag = false;
			_this.isHeadDragging = false;
			_this.isTailDragging = false;
			_this.onStageMousemove = (evt) => {
				_this.group.clear();
				if (_this.isReadyToDrag || _this.isPreventFromOtherFeature() || evt.target.type !== TargetType.TIME_BAR) return;
				var headDragRect = getBlockHeadDrag(evt.target, _this.collector);
				var tailDragRect = getBlockTailDrag(evt.target, _this.collector);
				if (headDragRect) {
					_this.showHeadDragRect(headDragRect);
					if (isHitRect(evt.x, evt.y, headDragRect)) _this.setCursor(Cursor.COL_RESIZE);
				}
				if (tailDragRect) {
					_this.showTailDragRect(tailDragRect);
					if (isHitRect(evt.x, evt.y, tailDragRect)) _this.setCursor(Cursor.COL_RESIZE);
				}
			};
			_this.onStageMousedown = (evt) => {
				if (_this.isPreventFromOtherFeature() || evt.target.type !== TargetType.TIME_BAR) return;
				var headDragRect = getBlockHeadDrag(evt.target, _this.collector);
				var tailDragRect = getBlockTailDrag(evt.target, _this.collector);
				if (headDragRect && isHitRect(evt.x, evt.y, headDragRect)) {
					_this.isHeadDragging = true;
					_this.readyToDrag(evt);
				}
				if (tailDragRect && isHitRect(evt.x, evt.y, tailDragRect)) {
					_this.isTailDragging = true;
					_this.readyToDrag(evt);
				}
			};
			_this.onWindowMouseMove = (evt) => {
				var _a;
				if (!_this.isReadyToDrag || !((_a = _this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId)) return;
				var deltaX = evt.x - _this.mouseDownOffset.x;
				var deltaY = evt.y - _this.mouseDownOffset.y;
				_this.mouseMoveOffset = {
					x: evt.x,
					y: evt.y
				};
				var isInDragging = Math.abs(deltaX) > _this.dragBuffer || Math.abs(deltaY) > _this.dragBuffer;
				if (!_this.isInDragging && isInDragging) {
					_this.isInDragging = isInDragging;
					_this.collector.timeBar.setRecordBlockHidden(_this.clickInfo.recordId, true);
					_this.renderer.render();
				}
				if (_this.isReadyToDrag && _this.isInDragging) {
					if (evt.target.type === TargetType.CELL || evt.target.type === TargetType.TIME_BAR) _this.lastCellTime = evt.target.cellTime;
					_this.group.clear();
					_this.updateDragBlock();
				}
			};
			_this.onDocumentMouseup = () => {
				if (!_this.isDragging()) {
					_this.clearAllStatus();
					return;
				}
				if (_this.context.getCore().editableStatusService.getTableStatus(_this.context.getCurrentTable().id) !== EditableStatus.ALL_EDITABLE) {
					showNotAllEditableToast();
					_this.clearAllStatus();
					return;
				}
				var { context } = _this.renderer;
				if (context.customConfig) return;
				_this.doSetRecord();
				_this.clearAllStatus();
			};
			return _this;
		}
		var _proto = CalendarBlockDrag.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.viewRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMousemove));
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
			this._register(this.UIEvent.stage.onResize(() => this.group.setAttrs(this.collector.size.viewRect)));
		};
		_proto.dispose = function dispose(trace) {
			CalendarFeatureBase.prototype.dispose.call(this, trace);
			this.cancelDragReady();
		};
		_proto.render = function render() {
			this.group.clear();
			if (this.isDragging() && isHitRect(this.mouseMoveOffset.x, this.mouseMoveOffset.y, this.collector.size.bodyRect)) {
				this.lastCellTime = getCellTargetByOffset(this.mouseMoveOffset.x, this.mouseMoveOffset.y, this.collector).cellTime;
				this.updateDragBlock();
			}
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging && this.isReadyToDrag;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: ICalendarBlockDrag,
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
		_proto.readyToDrag = function readyToDrag(evt) {
			var target = evt.target;
			this.clickInfo = (0, import_cloneDeep$1.default)(target);
			if (!this.clickInfo.recordId) {
				this.clearAllStatus();
				return;
			}
			this.isReadyToDrag = true;
			this.mouseDownOffset = {
				x: evt.x,
				y: evt.y
			};
			this.lastCellTime = this.clickInfo.cellTime;
			this.listenDragReady();
		};
		_proto.showHeadDragRect = function showHeadDragRect(rect) {
			var { borderRadius } = style.size;
			var headRect = Object.assign(Object.assign({}, rect), {
				background: style.color.activedBackground,
				borderRadius: [
					borderRadius,
					0,
					0,
					borderRadius
				]
			});
			this.group.add(pen.config.rect(Object.assign({}, headRect)));
			this.drawRectLine(rect);
		};
		_proto.showTailDragRect = function showTailDragRect(rect) {
			var { borderRadius } = style.size;
			var tailRect = Object.assign(Object.assign({}, rect), {
				background: style.color.activedBackground,
				borderRadius: [
					0,
					borderRadius,
					borderRadius,
					0
				]
			});
			this.group.add(pen.config.rect(Object.assign({}, tailRect)));
			this.drawRectLine(rect);
		};
		_proto.drawRectLine = function drawRectLine(rect) {
			var { dragRectWidth } = this.collector.size;
			for (var nowLineX = dragRectWidth / 3; nowLineX < dragRectWidth; nowLineX += dragRectWidth / 3) this.group.add(pen.config.line({
				x: rect.x + nowLineX,
				y: rect.y + rect.height / 4,
				points: [
					0,
					0,
					0,
					rect.height / 2
				],
				borderColor: style.color.ultraStrongBorderColor,
				borderWidth: style.size.borderWidth
			}));
		};
		_proto.updateDragBlock = function updateDragBlock() {
			if (!this.clickInfo || !this.lastCellTime) return;
			var layoutRange = {
				startRow: 0,
				endRow: 0,
				startColumn: 0,
				endColumn: 0
			};
			var [originStartTime, originEndTime] = this.clickInfo.timeRange;
			if (this.isHeadDragging) {
				if (this.lastCellTime > originEndTime) this.lastCellTime = originEndTime;
				var startColumn = this.collector.row.getColumnIndexByTime(this.lastCellTime);
				var startRow = this.collector.row.getRowIndexByTime(this.lastCellTime);
				layoutRange = Object.assign(Object.assign({}, this.clickInfo.layoutRange), {
					startColumn,
					startRow
				});
			}
			if (this.isTailDragging) {
				if (this.lastCellTime < originStartTime) this.lastCellTime = originStartTime;
				var endColumn = this.collector.row.getColumnIndexByTime(this.lastCellTime);
				var endRow = this.collector.row.getRowIndexByTime(this.lastCellTime);
				layoutRange = Object.assign(Object.assign({}, this.clickInfo.layoutRange), {
					endColumn,
					endRow
				});
			}
			var lines = getLinesByLayoutRange(layoutRange, {
				rowIndex: this.clickInfo.rowIndex,
				index: this.clickInfo.index
			});
			this.drawDragCell(lines);
			this.collector.timeBar.generateVisibleBlockConfigByRecord(this.clickInfo, lines).forEach((recordBlock) => {
				this.group.add(Object.assign(Object.assign({}, recordBlock.rectConfig), { opacity: .9 }), 0, 0, this.collector.size.bodyRect);
				if (recordBlock.iconConfig) this.group.add(recordBlock.iconConfig, 0, 0, this.collector.size.bodyRect);
				this.group.add(pen.config.text(recordBlock.textConfig[0]), 0, 0, this.collector.size.bodyRect);
			});
		};
		_proto.drawDragCell = function drawDragCell(lines) {
			lines.forEach((line) => {
				for (var index = line.startColumn; index <= line.endColumn; index++) {
					var cellRect = this.collector.row.getUnitRect(line.rowIndex, index);
					this.group.add(pen.config.rect(Object.assign(Object.assign({}, cellRect), { background: style.color.hoverBackground })));
				}
			});
		};
		_proto.doSetRecord = function doSetRecord() {
			if (!this.clickInfo) return;
			var { recordId } = this.clickInfo;
			var { startTime, endTime } = this.collector.dataUtil.getStartAndEndOriginTime(recordId);
			var setTimeHourAndMinuteByTime = (time, toTime) => {
				if (time === void 0) return;
				return toTime === null ? time : this.collector.time.setTimeHourAndMinuteByTime(time, toTime);
			};
			var timeInfo = this.isHeadDragging ? {
				startTime: setTimeHourAndMinuteByTime(this.lastCellTime, startTime),
				endTime: setTimeHourAndMinuteByTime(this.clickInfo.timeRange[1], endTime)
			} : {
				startTime: setTimeHourAndMinuteByTime(this.clickInfo.timeRange[0], startTime),
				endTime: setTimeHourAndMinuteByTime(this.lastCellTime, endTime)
			};
			if (domainConfig.getIsWb() && applyScheduleSetInPlace(Object.assign({
				context: this.context,
				dataUtil: this.collector.dataUtil,
				parentApi: this.parentApi,
				recordId
			}, timeInfo))) return;
			this.emitter.service.scheduleOperation.fire(Object.assign(Object.assign({ type: ScheduleOperation.SET }, timeInfo), { recordId }));
		};
		/**
		* 重置拖动状态
		*/ _proto.clearAllStatus = function clearAllStatus() {
			this.group.clear();
			this.mouseDownOffset = {
				x: 0,
				y: 0
			};
			this.mouseMoveOffset = {
				x: 0,
				y: 0
			};
			this.isReadyToDrag = false;
			this.isInDragging = false;
			this.isHeadDragging = false;
			this.isTailDragging = false;
			this.lastCellTime = 0;
			if (this.clickInfo) {
				this.collector.timeBar.setRecordBlockHidden(this.clickInfo.recordId, false);
				this.renderer.render();
			}
			this.clickInfo = void 0;
		};
		_proto.canEditTime = function canEditTime() {
			var dateConfig = this.collector.dataUtil.getDateConfig();
			if (!dateConfig) return false;
			var { startDateFieldId, endDateFieldId } = dateConfig;
			return this.parentApi.getStatus().getPermissionStatus("canEditField", { fieldId: startDateFieldId !== null && startDateFieldId !== void 0 ? startDateFieldId : "" }) && this.parentApi.getStatus().getPermissionStatus("canEditField", { fieldId: endDateFieldId !== null && endDateFieldId !== void 0 ? endDateFieldId : "" });
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(ICalendarBlockDrag) || !this.canEditTime();
		};
		return CalendarBlockDrag;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/block-drag/index.js
var init_block_drag = __esmMin((() => {
	init_main$5();
	init_interface$4();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/block-move/interface.js
var ICalendarBlockMove;
var init_interface$3 = __esmMin((() => {
	init_module();
	ICalendarBlockMove = createDecorator("ICalendarBlockMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/block-move/main.js
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
var import_cloneDeep, CalendarBlockMove;
var init_main$4 = __esmMin((() => {
	import_cloneDeep = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_es();
	init_es$1();
	init_pen();
	init_style();
	init_event_handler();
	init_action();
	init_calendar_feature();
	init_interface$9();
	init_interface$3();
	init_apply_schedule_set();
	init_is_hover_calendar_feature();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	CalendarBlockMove = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$18(CalendarBlockMove, CalendarFeatureBase);
		function CalendarBlockMove() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.dragBuffer = 6;
			_this.isInDragging = false;
			_this.isReadyToDrag = false;
			_this.onStageMousemove = (evt) => {
				if (_this.isReadyToDrag || _this.isPreventFromOtherFeature() || evt.target.type !== TargetType.SIDEBAR_SCHEDULE && evt.target.type !== TargetType.TIME_BAR || !evt.target.recordId) return;
				if (evt.target.type === TargetType.SIDEBAR_SCHEDULE) {
					_this.setCursor(Cursor.GRAB);
					return;
				}
			};
			_this.onStageMousedown = (evt) => {
				if (_this.isPreventFromOtherFeature() || evt.target.type !== TargetType.SIDEBAR_SCHEDULE && evt.target.type !== TargetType.TIME_BAR || !evt.target.recordId) return;
				if (evt.target.type === TargetType.TIME_BAR) {
					var headDragRect = getBlockHeadDrag(evt.target, _this.collector);
					var tailDragRect = getBlockTailDrag(evt.target, _this.collector);
					if (headDragRect && isHitRect(evt.x, evt.y, headDragRect) || tailDragRect && isHitRect(evt.x, evt.y, tailDragRect)) return;
				}
				_this.clickInfo = (0, import_cloneDeep.default)(evt.target);
				if (!_this.clickInfo.recordId) {
					_this.clearAllStatus();
					return;
				}
				_this.isReadyToDrag = true;
				_this.mouseDownOffset = {
					x: evt.x,
					y: evt.y
				};
				_this.listenDragReady();
			};
			_this.onWindowMouseMove = (evt) => {
				var _a;
				if (!_this.isReadyToDrag || !((_a = _this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId)) return;
				_this.mouseMoveOffset = {
					x: evt.x,
					y: evt.y
				};
				var deltaX = evt.x - _this.mouseDownOffset.x;
				var deltaY = evt.y - _this.mouseDownOffset.y;
				var isInDragging = Math.abs(deltaX) > _this.dragBuffer || Math.abs(deltaY) > _this.dragBuffer;
				if (!_this.isInDragging && isInDragging) {
					_this.isInDragging = isInDragging;
					_this.changeClickBlockOpacity(.4);
					_this.renderer.render();
				}
				if (_this.isReadyToDrag && _this.isInDragging) {
					_this.hoverInfo = evt.target;
					_this.doMousemoveDragging();
				}
			};
			_this.onDocumentMouseup = (evt) => {
				if (!_this.isDragging()) {
					_this.clearAllStatus();
					return;
				}
				if (_this.context.getCore().editableStatusService.getTableStatus(_this.context.getCurrentTable().id) !== EditableStatus.ALL_EDITABLE) {
					showNotAllEditableToast();
					_this.clearAllStatus();
					return;
				}
				var { context } = _this.renderer;
				if (context.customConfig) return;
				_this.doSetRecord(evt);
				_this.clearAllStatus();
			};
			return _this;
		}
		var _proto = CalendarBlockMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.viewRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMousemove));
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
			this._register(this.UIEvent.stage.onResize(() => {
				this.group.setAttrs(this.collector.size.viewRect);
			}));
		};
		_proto.dispose = function dispose(trace) {
			CalendarFeatureBase.prototype.dispose.call(this, trace);
			this.cancelDragReady();
		};
		_proto.render = function render() {
			if (this.isDragging() && isHitRect(this.mouseMoveOffset.x, this.mouseMoveOffset.y, this.collector.size.bodyRect)) {
				this.hoverInfo = Object.assign(Object.assign({}, getCellTargetByOffset(this.mouseMoveOffset.x, this.mouseMoveOffset.y, this.collector)), { type: TargetType.CELL });
				this.doMousemoveDragging();
			}
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging && this.isReadyToDrag;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: ICalendarBlockMove,
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
			this.group.clear();
			this.updateDragBackground();
			this.updateDragBlock();
		};
		_proto.updateDragBackground = function updateDragBackground() {
			var _a, _b;
			if (((_a = this.hoverInfo) === null || _a === void 0 ? void 0 : _a.type) !== TargetType.CELL && ((_b = this.hoverInfo) === null || _b === void 0 ? void 0 : _b.type) !== TargetType.TIME_BAR) return;
			var cellRect = this.collector.row.getUnitRect(this.hoverInfo.rowIndex, this.hoverInfo.columnIndex);
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, cellRect), { background: style.color.selectionBackground })), 0, 0, this.collector.size.bodyRect);
		};
		_proto.updateDragBlock = function updateDragBlock() {
			var _a, _b;
			var deltaX = this.mouseMoveOffset.x - this.mouseDownOffset.x;
			var deltaY = this.mouseMoveOffset.y - this.mouseDownOffset.y;
			if (((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.type) === TargetType.TIME_BAR || ((_b = this.clickInfo) === null || _b === void 0 ? void 0 : _b.type) === TargetType.SIDEBAR_SCHEDULE) {
				var blockRectConfig = this.clickInfo.rectConfig;
				var blockTextConfigList = this.clickInfo.textConfig;
				if (blockRectConfig) this.group.add(pen.config.rect(Object.assign(Object.assign({}, blockRectConfig), {
					x: blockRectConfig.x + deltaX,
					y: blockRectConfig.y + deltaY
				})));
				if ("iconConfig" in this.clickInfo && this.clickInfo.iconConfig) {
					var { iconConfig } = this.clickInfo;
					this.group.add(Object.assign(Object.assign({}, iconConfig), {
						x: iconConfig.x + deltaX,
						y: iconConfig.y + deltaY
					}));
				}
				if (blockTextConfigList) blockTextConfigList.forEach((textConfig) => {
					this.group.add(pen.config.text(Object.assign(Object.assign({}, textConfig), {
						x: textConfig.x + deltaX,
						y: textConfig.y + deltaY
					})));
				});
			}
		};
		_proto.doSetRecord = function doSetRecord(evt) {
			var _a;
			var endTarget = evt.target;
			if (endTarget.type === TargetType.BLANK || endTarget.type === TargetType.HEAD || !((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId)) return;
			var { recordId } = this.clickInfo;
			var isWb = domainConfig.getIsWb();
			if (endTarget.type === TargetType.SIDEBAR_SCHEDULE && this.clickInfo.type === TargetType.TIME_BAR && isHitRect(evt.x, evt.y, this.collector.size.sidebarBodyRect)) if (isWb && applyScheduleSetInPlace({
				context: this.context,
				dataUtil: this.collector.dataUtil,
				parentApi: this.parentApi,
				recordId,
				startTime: null,
				endTime: null
			})) {} else this.emitter.service.scheduleOperation.fire({
				type: ScheduleOperation.CLEAR,
				recordId
			});
			if (endTarget.type === TargetType.CELL || endTarget.type === TargetType.TIME_BAR) {
				if (this.clickInfo.type === TargetType.TIME_BAR && endTarget.cellTime === this.clickInfo.cellTime) return;
				var timeInfo = this.clickInfo.type === TargetType.TIME_BAR ? {
					startTime: endTarget.cellTime,
					endTime: endTarget.cellTime + this.clickInfo.timeRange[1] - this.clickInfo.timeRange[0]
				} : {
					startTime: endTarget.cellTime,
					endTime: endTarget.cellTime
				};
				if (isWb && applyScheduleSetInPlace(Object.assign({
					context: this.context,
					dataUtil: this.collector.dataUtil,
					parentApi: this.parentApi,
					recordId
				}, timeInfo))) return;
				this.emitter.service.scheduleOperation.fire(Object.assign(Object.assign({ type: ScheduleOperation.SET }, timeInfo), { recordId }));
			}
		};
		/**
		* 重置拖动状态
		*/ _proto.clearAllStatus = function clearAllStatus() {
			this.group.clear();
			this.mouseDownOffset = {
				x: 0,
				y: 0
			};
			this.mouseMoveOffset = {
				x: 0,
				y: 0
			};
			this.isReadyToDrag = false;
			this.isInDragging = false;
			this.changeClickBlockOpacity(1);
			this.clickInfo = void 0;
			this.hoverInfo = void 0;
		};
		_proto.changeClickBlockOpacity = function changeClickBlockOpacity(opacity) {
			var _a;
			if ((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId) {
				if (this.clickInfo.type === TargetType.TIME_BAR) this.collector.timeBar.setRecordBlockOpacity(this.clickInfo.recordId, opacity);
				else this.collector.sidebar.setRecordBlockOpacity(this.clickInfo.recordId, opacity);
				this.renderer.render();
			}
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(ICalendarBlockMove);
		};
		return CalendarBlockMove;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/block-move/index.js
var init_block_move = __esmMin((() => {
	init_main$4();
	init_interface$3();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/horizontal-scroller/interface.js
var IHorizontalScroller;
var init_interface$2 = __esmMin((() => {
	init_module();
	IHorizontalScroller = createDecorator("IHorizontalScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/horizontal-scroller/main.js
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
var HorizontalScroller;
var init_main$3 = __esmMin((() => {
	init_scroller();
	init_calendar_feature();
	HorizontalScroller = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$17(HorizontalScroller, CalendarFeatureBase);
		function HorizontalScroller() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.scroller.updatePosition();
			};
			_this.scrollToX = (scrollLeft) => {
				_this.parentApi.scrollToX(scrollLeft / _this.collector.size.scale);
			};
			return _this;
		}
		var _proto = HorizontalScroller.prototype;
		_proto.bootstrap = function bootstrap() {
			this.scroller = this._register(new CommonScroller({
				horizontal: true,
				autoHide: false,
				id: "calendar-horizontal-scroller",
				root: this.root,
				getViewRect: () => this.collector.size.viewRect,
				getScrollLeft: () => this.collector.size.offsetX,
				getScrollWidth: () => this.collector.size.fullContentWidth,
				scrollToX: this.scrollToX
			}));
		};
		return HorizontalScroller;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/horizontal-scroller/index.js
var init_horizontal_scroller = __esmMin((() => {
	init_interface$2();
	init_main$3();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/record-active/interface.js
var ICalendarRecordActive;
var init_interface$1 = __esmMin((() => {
	init_module();
	ICalendarRecordActive = createDecorator("ICalendarRecordActive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/get-record-by-selection.js
function getRowRecordIdBySelectionInfo(selection, displayedRecordIds) {
	if (!selection.isRowSelection()) return null;
	var range = (selection.getRanges() || [])[0];
	if (!range) return null;
	return displayedRecordIds[range.startRow];
}
var init_get_record_by_selection = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/record-active/main.js
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
var CalendarRecordActive;
var init_main$2 = __esmMin((() => {
	init_pen();
	init_style();
	init_calendar_feature();
	init_get_record_by_selection();
	CalendarRecordActive = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$16(CalendarRecordActive, CalendarFeatureBase);
		function CalendarRecordActive() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.activeRecordId = "";
			_this.expendRecordId = "";
			_this.activeBorderColor = style.color.selectionBorderColor;
			_this.render = () => {
				_this.show();
			};
			_this.isActive = () => !!_this.activeRecordId;
			_this.show = () => {
				if (_this.collector.state.getHighlightInfos().recordIds.has(_this.activeRecordId)) return;
				_this.activeBorderColor = style.color.selectionBorderColor;
				_this.showRecordActive();
			};
			_this.onStageResize = () => {
				_this.group.setAttrs(_this.activeBodyRect);
			};
			_this.onActiveRecordChanged = (info) => {
				var expandRecordId = (info === null || info === void 0 ? void 0 : info.recordId) || "";
				if (expandRecordId) {
					_this.activeRecordId = expandRecordId;
					_this.expendRecordId = expandRecordId;
					_this.show();
				} else _this.clearAll();
			};
			/**
			* 选区变化，这里只需要关心行选区
			*/ _this.onRecordSelectionChanged = ({ selection }) => {
				var activeRecordId = getRowRecordIdBySelectionInfo(selection, _this.collector.dataUtil.getDisplayedRecordIds());
				if (!activeRecordId && !_this.expendRecordId) {
					_this.clearAll();
					return;
				}
				if (activeRecordId) {
					_this.activeRecordId = activeRecordId;
					_this.show();
				}
			};
			return _this;
		}
		var _proto = CalendarRecordActive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.activeBodyRect));
			this.layer.addGroup(this.group);
			this._register(this.rangeModel.onSelectionChanged(this.onRecordSelectionChanged));
			this._register(this.emitter.service.activedRecordChanged.event(this.onActiveRecordChanged));
			this._register(this.UIEvent.stage.onResize(this.onStageResize));
		};
		_proto.showRecordActive = function showRecordActive() {
			this.group.clear();
			var blockList = this.collector.timeBar.getBlockListByRecord(this.activeRecordId);
			if (blockList && blockList.length !== 0) {
				blockList.forEach((blockInfo) => {
					this.group.add(pen.config.rect(Object.assign(Object.assign({}, blockInfo.rect), {
						borderRadius: style.size.borderRadius,
						borderWidth: style.size.borderWidth,
						borderColor: this.activeBorderColor
					})));
				});
				return;
			}
			var sideBarBlock = this.collector.sidebar.getRecords().find((record) => record.recordId === this.activeRecordId);
			if (sideBarBlock) this.group.add(pen.config.rect(Object.assign(Object.assign({}, sideBarBlock.rect), {
				borderRadius: style.size.borderRadius,
				borderWidth: style.size.borderWidth,
				borderColor: this.activeBorderColor
			})));
		};
		_proto.clearAll = function clearAll() {
			this.activeRecordId = "";
			this.expendRecordId = "";
			this.group.clear();
		};
		_create_class$14(CalendarRecordActive, [{
			key: "activeBodyRect",
			get: function() {
				var { bodyRect, sidebarBodyRect } = this.collector.size;
				return Object.assign(Object.assign({}, bodyRect), { width: bodyRect.width + sidebarBodyRect.width });
			}
		}]);
		return CalendarRecordActive;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/record-active/index.js
var init_record_active = __esmMin((() => {
	init_interface$1();
	init_main$2();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/sidebar-scroller/interface.js
var ISidebarScroller;
var init_interface = __esmMin((() => {
	init_module();
	ISidebarScroller = createDecorator("ISidebarScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/calculate-rect.js
/**
* @description rect 扩充，一般用于添加 padding
* @param {Rect} rect
* @param {number} extend
* @returns {Rect}
*/ function extendRect(rect, extend) {
	return {
		x: rect.x - extend,
		y: rect.y - extend,
		width: rect.width + extend * 2,
		height: rect.height + extend * 2
	};
}
/**
* @description 等比缩放 rect
* @param {Rect} rect
* @param {number} scale
* @returns {Rect}
*/ function scaleRect(rect, scale) {
	return Object.assign(Object.assign({}, rect), {
		width: rect.width * scale,
		height: rect.height * scale
	});
}
var init_calculate_rect = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/sidebar-scroller/main.js
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
var SidebarScroller;
var init_main$1 = __esmMin((() => {
	init_scroller();
	init_calendar_feature();
	init_calculate_rect();
	SidebarScroller = /* @__PURE__ */ function(CalendarFeatureBase) {
		"use strict";
		_inherits$15(SidebarScroller, CalendarFeatureBase);
		function SidebarScroller() {
			var _this = CalendarFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.scroller.updatePosition();
			};
			_this.setScrollerVisible = (visible) => {
				if (visible) {
					_this.scroller.show();
					return;
				}
				_this.scroller.hide();
			};
			return _this;
		}
		var _proto = SidebarScroller.prototype;
		_proto.bootstrap = function bootstrap() {
			this.scroller = this._register(new CommonScroller({
				vertical: true,
				autoHide: false,
				id: "sidebar-scroller",
				root: this.root,
				getViewRect: () => this.viewRect,
				getScrollTop: () => this.collector.sidebar.getScrollTop() * this.collector.size.scale,
				getScrollHeight: () => this.scrollHeight,
				scrollToY: (y) => {
					this.collector.sidebar.setScrollTop(y / this.collector.size.scale);
				}
			}));
			this.setScrollerVisible(this.collector.dataUtil.isSidebarOpen);
			this._register(this.collector.dataUtil.onSidebarToggle(this.setScrollerVisible));
		};
		_create_class$13(SidebarScroller, [{
			key: "viewRect",
			get: function() {
				var { scheduleListRect } = this.collector.sidebar;
				return scaleRect(scheduleListRect, this.collector.size.scale);
			}
		}, {
			key: "scrollHeight",
			get: function() {
				var sidebarScheduleCount = this.collector.calculator.getUnSchedules().length;
				if (sidebarScheduleCount === 0) return 0;
				return (sidebarScheduleCount * this.collector.size.sidebarSchedule.height + (sidebarScheduleCount - 1) * this.collector.size.sidebarItemMargin) * this.collector.size.scale;
			}
		}]);
		return SidebarScroller;
	}(CalendarFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/sidebar-scroller/index.js
var init_sidebar_scroller = __esmMin((() => {
	init_interface();
	init_main$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/features/pc/entries.js
function getPcFeatures() {
	return [
		{
			id: ICalendarAreaInteractive,
			ctor: CalendarAreaInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: ICalendarRecordActive,
			ctor: CalendarRecordActive,
			config: { auth: FeatureAuth.Record }
		},
		{
			id: ICalendarSearch,
			ctor: CalendarSearch,
			config: { auth: FeatureAuth.None }
		},
		{
			id: ISidebarScroller,
			ctor: SidebarScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IHorizontalScroller,
			ctor: HorizontalScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			id: ICalendarBlockMove,
			ctor: CalendarBlockMove,
			config: { auth: FeatureAuth.Record }
		},
		{
			id: ICalendarBlockDrag,
			ctor: CalendarBlockDrag,
			config: { auth: FeatureAuth.Record }
		},
		{
			id: IScrollAnimation,
			ctor: ScrollAnimation,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries = __esmMin((() => {
	init_scroll_animation();
	init_area_interactive();
	init_block_drag();
	init_block_move();
	init_horizontal_scroller();
	init_record_active();
	init_sidebar_scroller();
	init_search();
	init_index_interface();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/constant.js
var ROW_TIME_BAR_COUNT;
var init_constant = __esmMin((() => {
	init_es$1();
	ROW_TIME_BAR_COUNT = {
		[RowHeightLevel.Auto]: 0,
		[RowHeightLevel.Short]: 1,
		[RowHeightLevel.Medium]: 2,
		[RowHeightLevel.Tall]: 4,
		[RowHeightLevel.ExtraTall]: 6
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer/main/widgets/cell.js
var CellWidget;
var init_cell$1 = __esmMin((() => {
	init_pen();
	init_style();
	init_constant();
	CellWidget = /* @__PURE__ */ function() {
		"use strict";
		function CellWidget(collector) {
			this.collector = collector;
		}
		var _proto = CellWidget.prototype;
		_proto.draw = function draw(area) {
			this.drawRow(area);
		};
		_proto.drawRow = function drawRow(area) {
			var { row, rowLine } = this.collector;
			var { startRow, endRow } = row.getRange();
			for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
				var line = rowLine.getLine(rowIndex);
				line === null || line === void 0 || line.configList.forEach((config) => area.body.add(config));
				for (var columnIndex = 0; columnIndex < 7; columnIndex++) this.drawCell(area, rowIndex, columnIndex);
			}
		};
		_proto.drawCell = function drawCell(area, rowIndex, columnIndex) {
			var { cell, row, state, calculator } = this.collector;
			var cellRect = row.getUnitRect(rowIndex, columnIndex);
			area.body.add(pen.config.rect(Object.assign(Object.assign({}, cellRect), { background: cell.isCellShouldHighLight(rowIndex, columnIndex) ? style.color.searchHighlightBackground : style.color.normalBackground })));
			var background = cell.getCellBackground(rowIndex, columnIndex);
			background === null || background === void 0 || background.configList.forEach((config) => area.body.add(config));
			var moreSchedules = cell.getCellMoreSchedules(rowIndex, columnIndex);
			if (moreSchedules) {
				var recordId = state.getSearchSelectedRecordId();
				var recordsInRow = calculator.getShowRecordsInRow(rowIndex);
				var textColor = recordId && cell.checkRecordInCell(recordId, rowIndex, columnIndex) && recordsInRow && !recordsInRow.has(recordId) ? style.color.searchHighlightBorderColor : style.color.lightUltraFontColor;
				moreSchedules.textConfig.color = textColor;
				area.body.add(moreSchedules.textConfig);
			}
		};
		return CellWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer/main/widgets/head.js
var HeadWidget;
var init_head$1 = __esmMin((() => {
	HeadWidget = /* @__PURE__ */ function() {
		"use strict";
		function HeadWidget(collector) {
			this.collector = collector;
		}
		var _proto = HeadWidget.prototype;
		_proto.draw = function draw(area) {
			this.drawHeadMonthTitle(area);
			this.drawHeadToggleButton(area);
			this.drawTodaySwitcher(area);
		};
		_proto.drawHeadMonthTitle = function drawHeadMonthTitle(area) {
			var monthTitle = this.collector.head.getHeadMonthTitle();
			monthTitle === null || monthTitle === void 0 || monthTitle.configList.forEach((config) => area.head.add(config));
		};
		_proto.drawHeadToggleButton = function drawHeadToggleButton(area) {
			var toggleButton = this.collector.head.getHeadToggleButton();
			toggleButton === null || toggleButton === void 0 || toggleButton.configList.forEach((config) => area.head.add(config));
		};
		_proto.drawTodaySwitcher = function drawTodaySwitcher(area) {
			var todaySwitcher = this.collector.head.getTodaySwitcher();
			todaySwitcher === null || todaySwitcher === void 0 || todaySwitcher.configList.forEach((config) => area.head.add(config));
		};
		return HeadWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer/main/widgets/schedule.js
var ScheduleWidget;
var init_schedule = __esmMin((() => {
	ScheduleWidget = /* @__PURE__ */ function() {
		"use strict";
		function ScheduleWidget(collector) {
			this.collector = collector;
		}
		var _proto = ScheduleWidget.prototype;
		_proto.draw = function draw(area) {
			this.drawTimeBar(area);
		};
		_proto.drawTimeBar = function drawTimeBar(area) {
			this.collector.timeBar.getBlockList().forEach((block) => {
				if (block.hidden) return;
				block.configList.forEach((config) => area.body.add(config));
			});
		};
		return ScheduleWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer/main/widgets/sidebar.js
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
var import_main$7, SidebarWidget;
var init_sidebar = __esmMin((() => {
	import_main$7 = require_main();
	init_pen();
	SidebarWidget = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$14(SidebarWidget, Disposable);
		function SidebarWidget(collector) {
			var _this = Disposable.call(this) || this;
			_this.collector = collector;
			return _this;
		}
		var _proto = SidebarWidget.prototype;
		_proto.draw = function draw(area) {
			if (!this.collector.dataUtil.isSidebarOpen) return;
			this.drawSidebarHeadContent(area);
			this.drawSidebarBodyContent(area);
		};
		_proto.drawSidebarHeadContent = function drawSidebarHeadContent(area) {
			var foldIcon = this.sidebarCollector.getFoldIcon();
			foldIcon === null || foldIcon === void 0 || foldIcon.configList.forEach((config) => area.sidebarHead.add(config));
			var headText = this.sidebarCollector.getHeadText();
			headText === null || headText === void 0 || headText.configList.forEach((config) => area.sidebarHead.add(config));
		};
		_proto.drawSidebarBodyContent = function drawSidebarBodyContent(area) {
			var addRecord = this.sidebarCollector.getAddRecord();
			addRecord === null || addRecord === void 0 || addRecord.configList.forEach((config) => area.sidebarBody.add(config));
			var groupRect = this.sidebarCollector.scheduleListRect;
			var group = this._register(pen.group(Object.assign(Object.assign({}, groupRect), { batch: true })));
			area.sidebarBody.addGroup(group);
			this.sidebarCollector.getRecords().forEach((recordBlock) => {
				recordBlock === null || recordBlock === void 0 || recordBlock.configList.forEach((config) => group.add(config));
			});
		};
		_create_class$12(SidebarWidget, [{
			key: "sidebarCollector",
			get: function() {
				return this.collector.sidebar;
			}
		}]);
		return SidebarWidget;
	}(import_main$7.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer/main/widgets/static.js
/**
* @description 内容区背景色/竖向边框线/标题周一到周日
*/ function _defineProperties$11(target, props) {
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
var StaticWidget;
var init_static$1 = __esmMin((() => {
	StaticWidget = /* @__PURE__ */ function() {
		"use strict";
		function StaticWidget(collector) {
			this.collector = collector;
		}
		var _proto = StaticWidget.prototype;
		/**
		* 绘制静态的图形
		* 头部背景色，边框线，内容区域背景色和垂直边框线
		* 因为内容无需任何改变，所以只需要绘制一次即可
		*/ _proto.draw = function draw(area) {
			this.drawBodyStatic(area);
			this.drawHeadStatic(area);
			this.drawSidebarBodyBackground(area);
			this.drawSidebarHeadBackground(area);
		};
		_proto.drawHeadStatic = function drawHeadStatic(area) {
			var { head } = this.staticCollector.getBlocks();
			head === null || head === void 0 || head.configList.forEach((config) => area.head.add(config));
		};
		_proto.drawBodyStatic = function drawBodyStatic(area) {
			var { body } = this.staticCollector.getBlocks();
			body === null || body === void 0 || body.configList.forEach((config) => area.body.add(config));
		};
		_proto.drawSidebarBodyBackground = function drawSidebarBodyBackground(area) {
			var { sidebarBody } = this.staticCollector.getBlocks();
			sidebarBody === null || sidebarBody === void 0 || sidebarBody.configList.forEach((config) => area.sidebarBody.add(config));
		};
		_proto.drawSidebarHeadBackground = function drawSidebarHeadBackground(area) {
			var { sidebarHead } = this.staticCollector.getBlocks();
			sidebarHead === null || sidebarHead === void 0 || sidebarHead.configList.forEach((config) => area.sidebarHead.add(config));
		};
		_create_class$11(StaticWidget, [{
			key: "staticCollector",
			get: function() {
				return this.collector.static;
			}
		}]);
		return StaticWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer/main/index.js
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
var import_main$6, MainRenderer;
var init_main = __esmMin((() => {
	import_main$6 = require_main();
	init_cell$1();
	init_head$1();
	init_schedule();
	init_sidebar();
	init_static$1();
	MainRenderer = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$13(MainRenderer, Disposable);
		function MainRenderer(rendererModel) {
			var _this = Disposable.call(this) || this;
			var { collector } = rendererModel;
			_this.staticWidget = new StaticWidget(collector);
			_this.sidebarWidget = _this._register(new SidebarWidget(collector));
			_this.cellWidget = new CellWidget(collector);
			_this.scheduleWidget = new ScheduleWidget(collector);
			_this.headWidget = new HeadWidget(collector);
			return _this;
		}
		var _proto = MainRenderer.prototype;
		_proto.render = function render(area) {
			this.staticWidget.draw(area);
			this.sidebarWidget.draw(area);
			this.scheduleWidget.draw(area);
			this.cellWidget.draw(area);
			this.headWidget.draw(area);
		};
		return MainRenderer;
	}(import_main$6.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer/index.js
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
var import_debounce, CalendarRenderer;
var init_renderer = __esmMin((() => {
	import_debounce = /* @__PURE__ */ __toESM(require_debounce());
	init_es();
	init_pen();
	init_performance();
	init_style();
	init_event_handler();
	init_main();
	init_base_renderer();
	init_calculate_rect();
	CalendarRenderer = /* @__PURE__ */ function(BaseRenderer) {
		"use strict";
		_inherits$12(CalendarRenderer, BaseRenderer);
		function CalendarRenderer(rendererModel, root) {
			var _this = BaseRenderer.call(this, root, rendererModel.collector.dataUtil.getContext()) || this;
			_this.rendererModel = rendererModel;
			_this.root = root;
			_this.isRendering = false;
			_this.raf = null;
			_this.debounceResize = (0, import_debounce.default)(() => {
				_this.originResize();
			}, 100);
			_this.collector = _this.rendererModel.collector;
			_this.initLayer();
			_this.initArea();
			_this.initEvent();
			_this.mainRenderer = _this._register(new MainRenderer(_this.rendererModel));
			_this._register(_this.rendererModel.onScheduleChange(() => {
				_this.render();
			}));
			_this._register(_this.rendererModel.onRenderModelChange(() => {
				_this.render();
			}));
			return _this;
		}
		var _proto = CalendarRenderer.prototype;
		_proto.render = function render() {
			if (!this.raf) this.raf = requestAnimationFrame(() => {
				var _a;
				if (((_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) !== ViewType.CALENDAR) return;
				performanceReport.common.markRenderStart();
				this.renderMain();
				this.renderFeature();
				performanceReport.common.markRenderEnd(this.collector.dataUtil.getContext());
				this.raf = null;
			});
		};
		_proto.renderMain = function renderMain() {
			this.updateArea();
			this.mainRenderer.render(this.area);
		};
		_proto.renderFeature = function renderFeature() {
			this.featureRenderer.render();
		};
		_proto.resize = function resize() {
			if (this.collector.state.isExporting()) {
				this.originResize();
				return;
			}
			this.debounceResize();
		};
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.featureLayer;
		};
		_proto.originResize = function originResize() {
			this.mainLayer.setAttrs(this.mainLayerConfig);
			this.featureLayer.setAttrs(this.featureLayerConfig);
			this.render();
		};
		_proto.initLayer = function initLayer() {
			this.mainLayer = pen.layer(this.mainLayerConfig);
			this.featureLayer = pen.layer(this.featureLayerConfig);
			this.stage.addLayer(this.mainLayer);
			this.stage.addLayer(this.featureLayer);
		};
		_proto.initArea = function initArea() {
			var initGroupConfig = {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				batch: true
			};
			var area = {
				head: this._register(pen.group(Object.assign({}, initGroupConfig))),
				body: this._register(pen.group(Object.assign({}, initGroupConfig))),
				sidebarHead: this._register(pen.group(Object.assign({}, initGroupConfig))),
				sidebarBody: this._register(pen.group(Object.assign({}, initGroupConfig)))
			};
			this.area = area;
			this.mainLayer.addGroup(area.head);
			this.mainLayer.addGroup(area.body);
			this.mainLayer.addGroup(area.sidebarHead);
			this.mainLayer.addGroup(area.sidebarBody);
		};
		_proto.initEvent = function initEvent() {
			this.eventHandler = this._register(new CalendarEventHandler(this.stage, this.root, this.rendererModel));
			this.UIEvent = this.eventHandler.UIEvent;
		};
		_proto.updateArea = function updateArea() {
			this.area.body.clear();
			this.area.head.clear();
			this.area.sidebarBody.clear();
			this.area.sidebarHead.clear();
			var { size } = this.collector;
			this.area.head.setAttrs(this.addBorder(size.headRect));
			this.area.body.setAttrs(this.addBorder(size.bodyRect));
			this.area.sidebarHead.setAttrs(this.addBorder(size.sidebarHeadRect));
			this.area.sidebarBody.setAttrs(this.addBorder(size.sidebarBodyRect));
		};
		_proto.addBorder = function addBorder(rect) {
			var { borderWidth } = style.size;
			return extendRect(rect, borderWidth);
		};
		_create_class$10(CalendarRenderer, [{
			key: "mainLayerConfig",
			get: function() {
				var { size } = this.collector;
				var { scale } = size;
				return {
					id: "body-layer",
					scale,
					x: 0,
					y: 0,
					width: size.globalOriginRootWidth,
					height: size.globalOriginRootHeight
				};
			}
		}, {
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
		}]);
		return CalendarRenderer;
	}(BaseRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/status/date-status.js
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
var DateStatus;
var init_date_status = __esmMin((() => {
	init_es$1();
	init_base_status();
	DateStatus = /* @__PURE__ */ function(Status) {
		"use strict";
		_inherits$11(DateStatus, Status);
		function DateStatus() {
			return Status.apply(this, arguments) || this;
		}
		_create_class$9(DateStatus, [{
			key: "canInsertRecord",
			get: function() {
				var _a;
				var result = (_a = this.dateView) === null || _a === void 0 ? void 0 : _a.checkDateConfig(true);
				if (!result) return false;
				var { checkStartFieldResult, checkEndFieldResult } = result;
				return this.getPermissionStatus("canInsertRecord", {}) && !checkStartFieldResult && !checkEndFieldResult;
			}
		}, {
			key: "dateView",
			get: function() {
				var { view } = this;
				if ((view === null || view === void 0 ? void 0 : view.type) === ViewType$1.CALENDAR || (view === null || view === void 0 ? void 0 : view.type) === ViewType$1.GANTT) return view;
			}
		}]);
		return DateStatus;
	}(Status);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/calculator/utils/check-task.js
/**
* @description 分拣屏内任务和屏外任务
* @param {CollectScheduleTask[]} tasks 收集任务合集
* @param {IRowRange} inSideRowRange 屏内的 rowIndex 范围
* @returns {CheckTaskResult}
*/ function checkTask(tasks, inSideRowRange) {
	var inSideRowIndex = [];
	var intersectionStart = Math.max(tasks.startRow, inSideRowRange.startRow);
	var intersectionEnd = Math.min(tasks.endRow, inSideRowRange.endRow);
	if (intersectionStart <= intersectionEnd) for (var index = intersectionStart; index <= intersectionEnd; index++) inSideRowIndex.push(index);
	return {
		inSideRowIndex,
		hasOutSide: tasks.startRow < inSideRowRange.startRow || tasks.endRow > inSideRowRange.endRow
	};
}
var init_check_task = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/calculator/utils/get-delta-recordIds.js
/**
* @description 获取 mutation 变更的 recordId
* @param {Mutation} mutation
* @returns {(RecordId[] | null)}
*/ function getDeltaRecordIds(mutation) {
	var _a;
	var recordIds = (_a = mutationHelper.get(mutation.id)) === null || _a === void 0 ? void 0 : _a(mutation);
	if (recordIds) return recordIds;
	return null;
}
function setRecordMutation(mutation) {
	return [mutation.recordId];
}
function setRecordsMutation(mutation) {
	return Object.keys(mutation.delta);
}
function insertRecordMutation(mutation) {
	return [mutation.delta.recordId];
}
function insertRecordsMutation(mutation) {
	return mutation.delta.map((item) => item.recordId);
}
function deleteRecordMutation(mutation) {
	return [mutation.recordId];
}
function deleteRecordsMutation(mutation) {
	return mutation.delta.map((item) => item.recordId);
}
function moveRecordMutation(mutation) {
	return [mutation.recordId];
}
function appendRecordsMutation(mutation) {
	return Object.keys(mutation.delta.recordMap);
}
function emptyRecords() {
	return [];
}
var noEffectMutations, mutationHelper;
var init_get_delta_recordIds = __esmMin((() => {
	init_es$1();
	noEffectMutations = [
		MutationId.ADD_COMMENT_MUTATION,
		MutationId.DELETE_COMMENT_MUTATION,
		MutationId.DELETE_VIEW_MUTATION,
		MutationId.INSERT_FIELD_MUTATION,
		MutationId.INSERT_BLOCK_MUTATION,
		MutationId.INSERT_VIEW_MUTATION,
		MutationId.MOVE_FIELD_MUTATION,
		MutationId.MOVE_BLOCK_MUTATION,
		MutationId.MOVE_VIEW_MUTATION,
		MutationId.SET_CARD_CONFIG_MUTATION,
		MutationId.SET_COL_WIDTH_MUTATION,
		MutationId.SET_FIELD_HIDDEN_MUTATION,
		MutationId.SET_FIELD_STAT_STATUS_MUTATION,
		MutationId.SET_FIELD_STAT_TYPE_MUTATION,
		MutationId.SET_FROZEN_FIELD_COUNT_MUTATION,
		MutationId.SET_GROUP_MUTATION,
		MutationId.SET_BLOCK_ATTRIBUTES_MUTATION,
		MutationId.SET_TABLE_DESCRIPTION_MUTATION,
		MutationId.SET_VIEW_ATTRIBUTES_MUTATION
	];
	mutationHelper = /* @__PURE__ */ new Map();
	mutationHelper.set(MutationId.SET_RECORD_MUTATION, setRecordMutation);
	mutationHelper.set(MutationId.SET_RECORDS_MUTATION, setRecordsMutation);
	mutationHelper.set(MutationId.INSERT_RECORD_MUTATION, insertRecordMutation);
	mutationHelper.set(MutationId.INSERT_RECORDS_MUTATION, insertRecordsMutation);
	mutationHelper.set(MutationId.DELETE_RECORD_MUTATION, deleteRecordMutation);
	mutationHelper.set(MutationId.DELETE_RECORDS_MUTATION, deleteRecordsMutation);
	mutationHelper.set(MutationId.MOVE_RECORD_MUTATION, moveRecordMutation);
	mutationHelper.set(MutationId.APPEND_RECORDS_MUTATION, appendRecordsMutation);
	noEffectMutations.forEach((mutationId) => {
		mutationHelper.set(mutationId, emptyRecords);
	});
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/calculator/utils/get-lines.js
/**
* @description 获取时间范围的行布局
* @export
* @param {TimeRange} timeRange
* @param {Row} row
* @param {CollectScheduleTask} getLineIndex
* @param {number} [rowIndex] 可选，传入即为增量收集
* @returns {ScheduleLine[]}
*/ function getLines(recordId, timeRange, row, getLineIndex, rowIndex) {
	if (!timeRange) return [];
	var task = generateCollectScheduleTask(recordId, timeRange, row);
	if (!task) return [];
	if (rowIndex !== void 0) {
		var line = getLine(task, rowIndex, getLineIndex);
		if (line) return [line];
	}
	return getLinesByLayoutRange(task).map((defaultLine) => Object.assign(Object.assign({}, defaultLine), { index: getLineIndex(defaultLine, defaultLine.rowIndex, recordId) }));
}
/**
* @description 获取单行布局
* @param {CollectScheduleTask} task
* @param {(task: CollectScheduleTask) => number} getLineIndex
* @returns {ScheduleLine} 单行布局
*/ function getLine(task, rowIndex, getLineIndex) {
	var defaultLine = getLineByLayoutRange(task, rowIndex);
	if (!defaultLine) return;
	var index = getLineIndex(defaultLine, rowIndex, task.recordId);
	return Object.assign(Object.assign({}, defaultLine), { index });
}
/**
* @description 获取时间区间对应的布局区间
* @param {number} startTime
* @param {number} endTime
* @param {Row} row
* @returns {ILayoutRange} 布局区间
*/ function getLayoutRange(startTime, endTime, row) {
	return {
		startRow: row.getRowIndexByTime(startTime),
		endRow: row.getRowIndexByTime(endTime),
		startColumn: row.getColumnIndexByTime(startTime),
		endColumn: row.getColumnIndexByTime(endTime)
	};
}
/**
* @description 记录的收集任务
* @param {RecordId} recordId
* @param {TimeRange} timeRange
* @param {Row} row
* @returns {CollectScheduleTask[]}
*/ function generateCollectScheduleTask(recordId, timeRange, row) {
	if (!timeRange) return;
	var [startTime, endTime] = timeRange;
	var layoutRange = getLayoutRange(startTime, endTime, row);
	if (!(layoutRange.startRow !== layoutRange.endRow)) return {
		recordId,
		startRow: layoutRange.startRow,
		endRow: layoutRange.startRow,
		startColumn: layoutRange.startColumn,
		endColumn: layoutRange.endColumn
	};
	return Object.assign({ recordId }, layoutRange);
}
var ROW_UNIT_RANGE;
var init_get_lines = __esmMin((() => {
	init_lines_by_layout();
	ROW_UNIT_RANGE = [0, 6];
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/ranger.js
/**
* 获取日程在一行内的填充次序
* 找到第一个没有重叠的行为止
* @param startColumn
* @param endColumn
* @param arranges
* @returns
*/ function getFillToIndex(startColumn, endColumn, arranges) {
	var fillIndex = 0;
	for (var index = arranges.length - 1; index >= 0; index--) if (isOverlapArrange(startColumn, endColumn, arranges[index])) {
		fillIndex = index + 1;
		break;
	}
	return fillIndex;
}
/**
* 两个区间是否有重叠
* @param range1
* @param range2
*/ function hasOverlap(range1, range2) {
	var [start1, end1] = range1;
	var [start2, end2] = range2;
	if (start1 === start2 || end1 === end2) return true;
	var front = [];
	var behind = [];
	if (start1 < start2) {
		front = range1;
		behind = range2;
	} else {
		front = range2;
		behind = range1;
	}
	return Math.max(...front) >= Math.min(...behind);
}
function isOverlapArrange(startColumn, endColumn, arrange) {
	return arrange.some((range) => hasOverlap(range, [startColumn, endColumn]));
}
var init_ranger = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/calculator/index.js
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
var import_dist, import_main$5, defaultRowSpace, reCalculateCount, ScheduleCalculator;
var init_calculator = __esmMin((() => {
	init_tslib_es6();
	init_event();
	import_dist = require_dist();
	import_main$5 = require_main();
	init_es();
	init_es$1();
	init_check_task();
	init_get_delta_recordIds();
	init_get_lines();
	init_lines_by_layout();
	init_ranger();
	defaultRowSpace = Array.from({ length: ROW_UNIT_RANGE[1] + 1 }, (_v, i) => i);
	reCalculateCount = 100;
	ScheduleCalculator = /* @__PURE__ */ function() {
		"use strict";
		function ScheduleCalculator(size, row, dataUtil) {
			this.size = size;
			this.row = row;
			this.dataUtil = dataUtil;
			this.unSchedules = [];
			this.schedules = /* @__PURE__ */ new Map();
			this.scheduleArray = [];
			this.hiddenUnitRecords = /* @__PURE__ */ new Map();
			this.showRecordsInRow = /* @__PURE__ */ new Map();
			this.rowLayoutMap = /* @__PURE__ */ new Map();
			this.rowSpaceMap = /* @__PURE__ */ new Map();
			this.highLevelProcessor = null;
			this.lowLevelProcessor = null;
			this.displayedRecordIds = [];
			this.pendingRecordIds = /* @__PURE__ */ new Set();
			this.disposableStore = new import_main$5.DisposableStore();
			this.onScheduleChangeEmitter = new Emitter();
			/**
			* @description 根据 mutation 进行增量收集
			* @param {Mutation} mutation
			*/ this.collectScheduleByMutation = (mutation) => __awaiter(this, void 0, void 0, function* () {
				var _a;
				if (mutation.tableId !== ((_a = this.dataUtil.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id)) return;
				var recordIds = getDeltaRecordIds(mutation);
				if ((recordIds === null || recordIds === void 0 ? void 0 : recordIds.length) === 0) return;
				if (recordIds !== null) this.collectUnSchedules();
				if (!recordIds || recordIds.length > reCalculateCount || this.dataUtil.getDisplayedRecordIds().length < reCalculateCount) {
					this.collectAllRecords();
					this.update();
					return;
				}
				this.collectUnSchedules();
				this.update();
				if (this.isCollecting) {
					recordIds.forEach((recordId) => this.pendingRecordIds.add(recordId));
					return;
				}
				this.recollectRecords(recordIds);
			});
			/**
			* @description 收集记录（同步、有序）
			* @param {RecordId} recordId
			* @param {number} [rowIndex]
			*/ this.syncCollectRecord = (recordId, rowIndex) => {
				if (rowIndex !== void 0) {
					this.clearRecordInUnitHidden(rowIndex);
					this.showRecordsInRow.delete(rowIndex);
				}
				var timeRange = this.getTimeRange(recordId);
				if (!timeRange) return;
				this.collectSchedule(recordId, timeRange, rowIndex);
			};
			/**
			* @description (核心方法)先执行 highLevelProcessor，再执行 lowLevelProcessor
			* @template HighLevelProcessCollectUnit 高优先级进程收集单元
			* @template LowLevelTask 低优先级任务
			* @param {HighLevelProcessCollectUnit[]} delta 高优先级进程收集单元合集
			* @param {((delta: HighLevelProcessCollectUnit[]) => AsyncTaskValue<LowLevelTask[]> | null)} highLevelProcessCreator 高优先级进程创建者
			* @param {((tasks: LowLevelTask[]) => AsyncTaskValue<true> | null)} lowLevelProcessCreator 低优先级进程创建者
			* @param {() => void} afterProcess 每个进程结束时调用
			*/ this.scheduler = (delta, highLevelProcessCreator, lowLevelProcessCreator, afterProcess) => __awaiter(this, void 0, void 0, function* () {
				this.clearProcessor();
				this.taskRowRange = this.row.getRange();
				var highLevelProcessor = highLevelProcessCreator(delta);
				this.highLevelProcessor = highLevelProcessor;
				if (!highLevelProcessor) return false;
				var tasks = yield highLevelProcessor.promise.catch(() => {});
				if (!tasks) return false;
				afterProcess();
				var lowLevelProcessor = lowLevelProcessCreator(tasks);
				this.lowLevelProcessor = lowLevelProcessor;
				if (!lowLevelProcessor) return false;
				if (!(yield lowLevelProcessor.promise.catch(() => {}))) return false;
				afterProcess();
				return true;
			});
			/**
			* @description 创建记录收集进程
			* @param {RecordId[]} recordIds
			* @returns {(AsyncTaskValue<CollectScheduleTask[]> | null)} 屏外任务，null: 日期配置异常
			*/ this.recordProcessCreator = (recordIds) => {
				if (!this.dateConfig) return null;
				return (0, import_dist.executeAsync)({
					length: recordIds.length,
					initialValue: [],
					unitCallback: (index, accumulator) => this.collectRecordUnit(recordIds[index], accumulator),
					finishCallback: (result) => result !== null && result !== void 0 ? result : []
				});
			};
			/**
			* @description 创建收集时间条异步进程
			* @param {CollectScheduleTask[]} tasks
			* @returns {AsyncTaskValue<true>} true: 任务全部执行成功, undefined: 任务执行过程中被打断
			*/ this.lineProcessCreator = (tasks) => (0, import_dist.executeAsync)({
				length: tasks.length,
				initialValue: true,
				unitCallback: (index) => {
					var defaultLines = getLinesByLayoutRange(tasks[index]);
					var { inSideRowIndex } = checkTask(tasks[index], this.taskRowRange);
					defaultLines.forEach((defaultLine) => {
						if (inSideRowIndex.includes(defaultLine.rowIndex)) return;
						this.collectLineUnit(defaultLine, defaultLine.rowIndex, tasks[index].recordId);
					});
					return true;
				},
				finishCallback: () => true
			});
			/**
			* @description 创建重收集进程
			* @param {RecollectScheduleTask[]} tasks
			* @returns {AsyncTaskValue<true>} true: 任务全部执行成功, undefined: 任务执行过程中被打断
			*/ this.recollectRowProcessCreator = (tasks) => (0, import_dist.executeAsync)({
				length: tasks.length,
				initialValue: true,
				unitCallback: (index) => {
					this.recollectRecordByRow(tasks[index].recordId, tasks[index].rowIndex);
					return true;
				},
				finishCallback: () => true
			});
			/**
			* @description 根据记录进行单元处理
			* @param {RecordId} recordId
			* @param {CollectScheduleTask[]} tasks
			*/ this.collectRecordUnit = (recordId, tasks) => {
				var timeRange = this.dataUtil.getRecordRangeTime(recordId);
				if (!timeRange) return tasks;
				var unitTask = generateCollectScheduleTask(recordId, timeRange, this.row);
				if (!unitTask) return tasks;
				var layoutRange = getLayoutRange(timeRange[0], timeRange[1], this.row);
				this.schedules.set(recordId, {
					recordId,
					isAcrossWeek: layoutRange.startRow !== layoutRange.endRow,
					timeRange,
					layoutRange,
					lines: []
				});
				var { inSideRowIndex, hasOutSide } = checkTask(unitTask, this.taskRowRange);
				inSideRowIndex.forEach((rowIndex) => {
					var defaultLine = getLineByLayoutRange(unitTask, rowIndex);
					if (defaultLine) this.collectLineUnit(defaultLine, rowIndex, unitTask.recordId);
				});
				if (hasOutSide) tasks.push(unitTask);
				return tasks;
			};
			/**
			* @description 根据时间条收集任务进行单元处理
			* @param {CollectScheduleTask} task
			* @returns {boolean} 是否成功收集该时间条片段（不显示的不收集）
			*/ this.collectLineUnit = (defaultLine, rowIndex, recordId) => {
				var lineIndex = this.getLineIndex(defaultLine, rowIndex, recordId);
				var line = {
					rowIndex,
					startColumn: defaultLine.startColumn,
					endColumn: defaultLine.endColumn,
					index: lineIndex
				};
				var schedule = this.schedules.get(recordId);
				if (!schedule) {
					logger.debug("recordId 找不到对应日程 schedule", { recordId });
					return false;
				}
				if (lineIndex < this.maxShowTimeBarCount) {
					schedule.lines.push(line);
					return true;
				}
				return false;
			};
			/**
			* @description 获取时间条在行内应该放置的位置（有序）
			* @param {CollectScheduleTask} task
			*/ this.getLineIndex = (defaultLine, rowIndex, recordId) => {
				var _a;
				var { startColumn, endColumn } = defaultLine;
				var arranges = this.rowLayoutMap.get(rowIndex);
				var timeRange = [startColumn, endColumn];
				if (!arranges || arranges.length === 0) {
					this.rowLayoutMap.set(rowIndex, [[timeRange]]);
					this.updateRowSpaceType(rowIndex);
					return 0;
				}
				var fillIndex = getFillToIndex(startColumn, endColumn, arranges);
				if (this.getRowSpace(rowIndex).length === 0 || fillIndex === this.maxShowTimeBarCount) {
					this.collectHiddenUnit(rowIndex, startColumn, endColumn);
					this.updateRowSpaceType(rowIndex, timeRange);
					return this.maxShowTimeBarCount;
				}
				var records = (_a = this.showRecordsInRow.get(rowIndex)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
				records.add(recordId);
				this.showRecordsInRow.set(rowIndex, records);
				if (arranges[fillIndex]) arranges[fillIndex].push(timeRange);
				else arranges.push([timeRange]);
				this.rowLayoutMap.set(rowIndex, arranges);
				this.updateRowSpaceType(rowIndex);
				return fillIndex;
			};
			/**
			* @description 增量重收集记录
			* @param {RecordId} recordId
			*/ this.recollectRecord = (recordId) => {
				var timeRange = this.getTimeRange(recordId);
				var rowIndexes = /* @__PURE__ */ new Set();
				var schedule = this.schedules.get(recordId);
				if (schedule) {
					var { startRow, endRow } = schedule.layoutRange;
					for (var index = startRow; index <= endRow; index++) rowIndexes.add(index);
				}
				if (this.getRecordDisplayIndex(recordId) !== -1) {
					var task = generateCollectScheduleTask(recordId, timeRange, this.row);
					if (task) getLinesByLayoutRange(task).forEach((line) => rowIndexes.add(line.rowIndex));
				}
				var rowRange = this.row.getRange();
				var { inside, outside } = [...rowIndexes].reduce((categorizer, rowIndex) => {
					if (rowIndex >= rowRange.startRow && rowIndex <= rowRange.endRow) categorizer.inside.push(rowIndex);
					else categorizer.outside.push(rowIndex);
					return categorizer;
				}, {
					outside: [],
					inside: []
				});
				inside.forEach((rowIndex) => this.recollectRecordByRow(recordId, rowIndex));
				return outside;
			};
			/**
			* @description 重算记录在某一行的位置
			* @param {RecordId} recordId
			* @param {number} rowIndex
			*/ this.recollectRecordByRow = (recordId, rowIndex) => {
				var scheduleArray = this.getRowSchedules(rowIndex);
				var recordIds = scheduleArray.map((schedule) => schedule.recordId);
				var recordIndex = recordIds.indexOf(recordId);
				if (recordIndex !== -1) recordIds.splice(recordIndex, 1);
				var recordInsertIndex = this.getRecordInsertIndex(recordId, recordIds);
				if (recordInsertIndex !== -1) recordIds.splice(recordInsertIndex, 0, recordId);
				this.rowLayoutMap.delete(rowIndex);
				this.rowSpaceMap.delete(rowIndex);
				var shouldHidden = this.isRecordShouldHiddenInRow(recordId, rowIndex);
				var hasTemporarySchedule = false;
				if (!this.schedules.has(recordId) && !shouldHidden) {
					var timeRange = this.getTimeRange(recordId);
					if (timeRange) {
						var layoutRange = getLayoutRange(timeRange[0], timeRange[1], this.row);
						this.schedules.set(recordId, {
							recordId,
							isAcrossWeek: layoutRange.startRow !== layoutRange.endRow,
							timeRange,
							layoutRange,
							lines: []
						});
					}
					hasTemporarySchedule = true;
				}
				var collectedRecordIds = this.fillRowSpace(recordIds, rowIndex);
				if (!collectedRecordIds.has(recordId)) {
					this.reCollectHiddenRecord(rowIndex, recordId);
					if (hasTemporarySchedule) this.schedules.delete(recordId);
				}
				scheduleArray.filter((schedule) => !collectedRecordIds.has(schedule.recordId) && schedule.lines.some((line) => line.rowIndex === rowIndex && line.index < this.maxShowTimeBarCount)).forEach((schedule) => this.reCollectHiddenRecord(rowIndex, schedule.recordId));
			};
			/**
			* @description 获取行内所有日程
			* @param {number} rowIndex
			*/ this.getRowSchedules = (rowIndex) => this.scheduleArray.filter((schedule) => schedule.layoutRange.startRow <= rowIndex && schedule.layoutRange.endRow >= rowIndex);
			this.beforeCollect();
			this.disposableStore.add(this.context.getCore().editableStatusService.onTableEditableStatusChange(({ status }) => {
				if (status !== EditableStatus.ALL_EDITABLE) return;
				this.collectAllRecords();
			}));
			this.onScheduleChange = this.onScheduleChangeEmitter.event;
			this.disposableStore.add(this.size.onCellHeightChangeEvent(() => this.collectAllRecords()));
		}
		var _proto = ScheduleCalculator.prototype;
		_proto.dispose = function dispose() {
			this.disposableStore.clear();
			this.onScheduleChangeEmitter.dispose();
			this.clearProcessor();
		};
		_proto.patch = function patch(mutations) {
			if (!mutations.some((mutation) => {
				var recordIds = getDeltaRecordIds(mutation);
				if (recordIds === null || recordIds.length) return true;
				return false;
			})) return;
			return this.collectAllRecords();
		};
		/**
		* @description 重置状态
		*/ _proto.reset = function reset() {
			this.actualRange = [Infinity, -Infinity];
			this.scheduleArray = [];
			this.schedules.clear();
			this.unSchedules = [];
			this.rowLayoutMap.clear();
			this.rowSpaceMap.clear();
			this.hiddenUnitRecords.clear();
			this.pendingRecordIds.clear();
			this.clearProcessor();
			this.beforeCollect();
		};
		/**
		* @description 收集所有记录
		*/ _proto.collectAllRecords = function collectAllRecords() {
			return __awaiter(this, void 0, void 0, function* () {
				if (!this.dateConfig || !this.maxShowTimeBarCount) return;
				this.reset();
				var recordIds = this.displayedRecordIds;
				this.collectUnSchedules();
				var shouldRecollectRecordIds = recordIds.filter((recordId) => !this.unSchedules.includes(recordId));
				if (!this.shouldCalculateAsync(shouldRecollectRecordIds.length)) {
					shouldRecollectRecordIds.forEach((recordId) => this.syncCollectRecord(recordId));
					this.afterCollect();
					this.update();
					return;
				}
				this.update();
				yield this.asyncCollectAllRecords(shouldRecollectRecordIds);
				this.recollectPendingRecords();
			});
		};
		/**
		* @description 获取某个格子内未显示的数量
		* @param {number} rowIndex
		* @param {number} columnIndex
		* @returns {(Set<RecordId> | null)}
		*/ _proto.getHiddenUnitRecordCount = function getHiddenUnitRecordCount(rowIndex, columnIndex) {
			var _a, _b;
			return (_b = (_a = this.hiddenUnitRecords.get(rowIndex)) === null || _a === void 0 ? void 0 : _a.get(columnIndex)) !== null && _b !== void 0 ? _b : 0;
		};
		/**
		* @description 获取记录与日程的映射关系
		* @returns {Readonly<Map<RecordId, Schedule>>}
		*/ _proto.getSchedules = function getSchedules() {
			return this.schedules;
		};
		/**
		* @description 获取未显示的日程合集
		* @returns {RecordId[]}
		*/ _proto.getUnSchedules = function getUnSchedules() {
			return this.unSchedules;
		};
		/**
		* @description 获取行布局状态
		* @returns {Readonly<RowLayoutMap>}
		*/ _proto.getRowLayoutMap = function getRowLayoutMap() {
			return this.rowLayoutMap;
		};
		/**
		* 获取行布局
		* @param rowIndex
		* @returns
		*/ _proto.getRowLayout = function getRowLayout(rowIndex) {
			return this.rowLayoutMap.get(rowIndex) || [];
		};
		/**
		* @description 获取显示的日程合集
		* @returns {Readonly<Schedule[]>}
		*/ _proto.getScheduleArray = function getScheduleArray() {
			return this.scheduleArray;
		};
		_proto.getShowRecordsInRow = function getShowRecordsInRow(rowIndex) {
			var _a;
			return (_a = this.showRecordsInRow.get(rowIndex)) !== null && _a !== void 0 ? _a : null;
		};
		_proto.update = function update() {
			this.onScheduleChangeEmitter.fire();
		};
		/**
		* @description 清除所有异步进程
		*/ _proto.clearProcessor = function clearProcessor() {
			var _a, _b;
			(_a = this.highLevelProcessor) === null || _a === void 0 || _a.abort();
			this.highLevelProcessor = null;
			(_b = this.lowLevelProcessor) === null || _b === void 0 || _b.abort();
			this.lowLevelProcessor = null;
		};
		/**
		* @description (核心方法)异步收集记录，先执行屏内任务，再执行屏外任务
		* @param {RecordId[]} recordIds
		*/ _proto.asyncCollectAllRecords = function asyncCollectAllRecords(recordIds) {
			return __awaiter(this, void 0, void 0, function* () {
				return yield this.scheduler(recordIds, this.recordProcessCreator, this.lineProcessCreator, () => {
					this.clearProcessor();
					this.afterCollect();
					this.update();
				});
			});
		};
		/**
		* @description 增量收集记录
		* @param {RecordId[]} recordIds
		* @memberof ScheduleCalculator
		*/ _proto.recollectRecords = function recollectRecords(recordIds) {
			return __awaiter(this, void 0, void 0, function* () {
				this.beforeCollect();
				if (!this.shouldCalculateAsync(recordIds.length)) {
					yield this.syncRecollectRecords(recordIds);
					this.recollectPendingRecords();
					return;
				}
				yield this.collectAllRecords();
			});
		};
		/**
		* @description 重算增量等待队列
		*/ _proto.recollectPendingRecords = function recollectPendingRecords() {
			if (!this.pendingRecordIds.size) return;
			if (this.pendingRecordIds.size > reCalculateCount) {
				this.collectAllRecords();
				return;
			}
			var pendingRecordIds = [...this.pendingRecordIds];
			this.pendingRecordIds.clear();
			this.recollectRecords(pendingRecordIds);
		};
		/**
		* @description 增量计算，同步收集屏内布局，异步收集屏外布局
		* @param {RecordId[]} recordIds
		* @returns {Promise<boolean>} true: 记录全部计算完毕，false: 中途被打断
		*/ _proto.syncRecollectRecords = function syncRecollectRecords(recordIds) {
			return __awaiter(this, void 0, void 0, function* () {
				var tasks = recordIds.reduce((tasks, recordId) => {
					this.recollectRecord(recordId).forEach((rowIndex) => {
						tasks.push({
							recordId,
							rowIndex
						});
					});
					return tasks;
				}, []);
				this.clearProcessor();
				this.update();
				var lowLevelProcessor = this.recollectRowProcessCreator(tasks);
				this.lowLevelProcessor = lowLevelProcessor;
				if (!lowLevelProcessor) return false;
				if (!(yield lowLevelProcessor.promise.catch(() => {}))) return false;
				this.clearProcessor();
				this.update();
				return true;
			});
		};
		/**
		* @description 更新行内空隙状态
		* @param {number} rowIndex
		* @param {NonNullable<TimeRange>} [timeRange]
		*/ _proto.updateRowSpaceType = function updateRowSpaceType(rowIndex, timeRange) {
			if (this.maxShowTimeBarCount === 0) {
				this.rowSpaceMap.set(rowIndex, []);
				return;
			}
			var rowSpace = this.getRowSpace(rowIndex);
			if (rowSpace.length === 0) return;
			if (timeRange) {
				rowSpace = ScheduleCalculator.diffRowSpace(rowSpace, timeRange);
				this.rowSpaceMap.set(rowIndex, rowSpace);
				return;
			}
			var arranges = this.rowLayoutMap.get(rowIndex);
			var singleRow = arranges === null || arranges === void 0 ? void 0 : arranges[this.maxShowTimeBarCount - 1];
			if (!singleRow) {
				this.rowSpaceMap.set(rowIndex, defaultRowSpace);
				return;
			}
			rowSpace = singleRow.reduce((rowSpace, timeRange) => ScheduleCalculator.diffRowSpace(rowSpace, timeRange), rowSpace);
			this.rowSpaceMap.set(rowIndex, rowSpace);
		};
		/**
		* @description 收集无日期记录
		*/ _proto.collectUnSchedules = function collectUnSchedules() {
			var _a, _b;
			var startDateFieldId = (_a = this.dateConfig) === null || _a === void 0 ? void 0 : _a.startDateFieldId;
			var endDateFieldId = (_b = this.dateConfig) === null || _b === void 0 ? void 0 : _b.endDateFieldId;
			var startDateField = startDateFieldId ? this.dataUtil.getFieldByFieldId(startDateFieldId) : void 0;
			var endDateField = endDateFieldId ? this.dataUtil.getFieldByFieldId(endDateFieldId) : void 0;
			if (!startDateField && !endDateField) {
				this.unSchedules = Array.from(this.displayedRecordIds);
				return;
			}
			this.unSchedules = this.displayedRecordIds.filter((recordId) => {
				var startTime = startDateField ? this.dataUtil.getOriginTimeByField(recordId, startDateField) : null;
				var endTime = endDateField ? this.dataUtil.getOriginTimeByField(recordId, endDateField) : null;
				return startTime === null && endTime === null;
			});
		};
		/**
		* @description 收集日程
		* @param {RecordId} recordId
		* @param {NonNullable<TimeRange>} timeRange
		* @param {number} [rowIndex]
		*/ _proto.collectSchedule = function collectSchedule(recordId, timeRange, rowIndex) {
			this.actualRange[0] = Math.min(this.actualRange[0], timeRange[0]);
			this.actualRange[1] = Math.max(this.actualRange[1], timeRange[1]);
			var [startTime, endTime] = timeRange;
			var layoutRange = getLayoutRange(startTime, endTime, this.row);
			var isAcrossWeek = layoutRange.startRow !== layoutRange.endRow;
			var schedule = {
				lines: getLines(recordId, timeRange, this.row, this.getLineIndex, rowIndex),
				isAcrossWeek,
				layoutRange,
				recordId,
				timeRange
			};
			this.schedules.set(recordId, schedule);
		};
		/**
		* @description 获取记录时间区间
		* @param {RecordId} recordId
		* @returns {(TimeRange | null)}
		*/ _proto.getTimeRange = function getTimeRange(recordId) {
			if (!this.dateConfig) return null;
			var timeRange = this.dataUtil.getRecordRangeTime(recordId);
			if (!timeRange) return null;
			return timeRange;
		};
		/**
		* @description 收集格子内未显示的 unit
		* @param {number} rowIndex
		* @param {number} startColumn
		* @param {number} endColumn
		* @param {RecordId} recordId
		*/ _proto.collectHiddenUnit = function collectHiddenUnit(rowIndex, startColumn, endColumn) {
			var _a, _b;
			var recordsMap = (_a = this.hiddenUnitRecords.get(rowIndex)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Map();
			for (var index = startColumn; index <= endColumn; index++) {
				var recordCount = (_b = recordsMap.get(index)) !== null && _b !== void 0 ? _b : 0;
				recordCount += 1;
				recordsMap.set(index, recordCount);
			}
			this.hiddenUnitRecords.set(rowIndex, recordsMap);
		};
		/**
		* @description 重收集需要隐藏的记录
		* @param {number} rowIndex
		* @param {RecordId} recordId
		*/ _proto.reCollectHiddenRecord = function reCollectHiddenRecord(rowIndex, recordId) {
			this.clearRecordInUnitHidden(rowIndex);
			this.removeScheduleLine(recordId, rowIndex);
			var task = generateCollectScheduleTask(recordId, this.getTimeRange(recordId), this.row);
			if (!task) return;
			var defaultLine = getLineByLayoutRange(task, rowIndex);
			if (!defaultLine) return;
			var { startColumn, endColumn } = defaultLine;
			this.collectHiddenUnit(rowIndex, startColumn, endColumn);
		};
		/**
		* @description 增量更新日程相关状态
		* @param {Schedule} schedule
		*/ _proto.updateScheduleStatusByDiff = function updateScheduleStatusByDiff(schedule) {
			this.schedules.set(schedule.recordId, schedule);
			var recordIndex = this.scheduleArray.findIndex((searchSchedule) => searchSchedule.recordId === schedule.recordId);
			if (recordIndex !== -1) this.scheduleArray.splice(recordIndex, 1);
			var recordInsertIndex = this.getRecordInsertIndex(schedule.recordId);
			if (recordInsertIndex === -1) return;
			this.scheduleArray.splice(recordInsertIndex, 0, schedule);
		};
		/**
		* @description 移除日程相关缓存内容
		* @param {RecordId} recordId
		*/ /**
		* @description 移除日程相关缓存内容
		* @param {RecordId} recordId
		* @returns {layoutRange} 移除的区域
		*/ _proto.removeSchedule = function removeSchedule(recordId) {
			var schedule = this.schedules.get(recordId);
			var layoutRange = schedule === null || schedule === void 0 ? void 0 : schedule.layoutRange;
			this.schedules.delete(recordId);
			var index = this.scheduleArray.findIndex((schedule) => schedule.recordId === recordId);
			if (index === -1) return null;
			this.scheduleArray.splice(index, 1);
			return layoutRange !== null && layoutRange !== void 0 ? layoutRange : null;
		};
		_proto.removeScheduleLine = function removeScheduleLine(recordId, rowIndex) {
			var schedule = this.schedules.get(recordId);
			if (!schedule) return;
			schedule.lines = schedule.lines.filter((line) => line.rowIndex !== rowIndex);
			if (schedule.lines.length === 0) this.removeSchedule(recordId);
		};
		/**
		* @description 清除记录在格子内的未显示状态
		* @param {RecordId} recordId
		* @param {number} rowIndex
		*/ _proto.clearRecordInUnitHidden = function clearRecordInUnitHidden(rowIndex) {
			var hiddenUnitRecordMap = this.hiddenUnitRecords.get(rowIndex);
			if (!hiddenUnitRecordMap) return;
			for (var index = ROW_UNIT_RANGE[0]; index <= ROW_UNIT_RANGE[1]; index++) hiddenUnitRecordMap.delete(index);
		};
		/**
		* @description 获取记录插入位置
		* @param {RecordId} recordId
		* @param {RecordId[]} [recordIds=this.scheduleArray.map((schedule) => schedule.recordId)]
		* @returns {number}
		*/ _proto.getRecordInsertIndex = function getRecordInsertIndex(recordId, recordIds = this.scheduleArray.map((schedule) => schedule.recordId)) {
			var recordIndex = this.getRecordDisplayIndex(recordId);
			if (recordIndex === -1) return -1;
			var insertIndex = recordIds.findIndex((searchRecordId) => recordIndex < this.getRecordDisplayIndex(searchRecordId));
			if (insertIndex === -1) return recordIds.length;
			return insertIndex;
		};
		/**
		* @description 获取记录目前排序位置
		* @param {RecordId} recordId
		* @returns {number}
		*/ _proto.getRecordDisplayIndex = function getRecordDisplayIndex(recordId) {
			return this.displayedRecordIds.indexOf(recordId);
		};
		/**
		* @description 收集前相关操作
		*/ _proto.beforeCollect = function beforeCollect() {
			this.viewPortRange = this.row.getRange();
			this.maxShowTimeBarCount = this.getMaxShowLines();
			this.displayedRecordIds = this.dataUtil.getDisplayedRecordIds().slice(0);
		};
		/**
		* @description 收集后相关更新操作
		*/ _proto.afterCollect = function afterCollect() {
			this.scheduleArray = [...this.schedules.values()];
		};
		/**
		* @description 获取格子最大显示时间条数
		* @returns {number}
		*/ _proto.getMaxShowLines = function getMaxShowLines() {
			return this.size.maxShowTimeBarCount;
		};
		/**
		* @description 更新行空隙状态
		* @returns {Readonly<number[]>}
		*/ _proto.getRowSpace = function getRowSpace(rowIndex) {
			var _a;
			return (_a = this.rowSpaceMap.get(rowIndex)) !== null && _a !== void 0 ? _a : defaultRowSpace;
		};
		/**
		* @description 填充行间空隙，根据空隙找时间条，确保调用时，存在整行空隙
		* @param {RecordId[]} recordIds
		* @param {number} rowIndex
		* @returns {Set<RecordId>}
		*/ _proto.fillRowSpace = function fillRowSpace(recordIds, rowIndex) {
			var _this, _loop = function() {
				var [recollectRecordId] = iterator;
				_this.syncCollectRecord(recollectRecordId, rowIndex);
				collectedRecordIds.add(recollectRecordId);
				var rowSpace = _this.getRowSpace(rowIndex);
				isRowFull = rowSpace.length === 0;
				var rowFullStatus = defaultRowSpace.filter((columnIndex) => !rowSpace.includes(columnIndex));
				iterator = iterator.filter((iteratorRecordId) => {
					if (collectedRecordIds.has(iteratorRecordId)) return false;
					var iteratorSchedule = _this.schedules.get(iteratorRecordId);
					if (!iteratorSchedule) return false;
					var { layoutRange, isAcrossWeek } = iteratorSchedule;
					if (!isAcrossWeek) return rowFullStatus.every((columnIndex) => columnIndex < layoutRange.startColumn || columnIndex > layoutRange.startColumn);
					if (rowIndex > layoutRange.startRow && rowIndex < layoutRange.endRow) return rowFullStatus.length === 0;
					if (rowIndex === layoutRange.startRow) return rowFullStatus.every((columnIndex) => columnIndex < layoutRange.startColumn);
					if (rowIndex === layoutRange.endRow) return rowFullStatus.every((columnIndex) => columnIndex > layoutRange.endColumn);
					return false;
				});
			};
			var collectedRecordIds = /* @__PURE__ */ new Set();
			var isRowFull = false;
			var iterator = recordIds;
			while (!isRowFull && iterator.length) _this = this, _loop();
			return collectedRecordIds;
		};
		_proto.shouldCalculateAsync = function shouldCalculateAsync(recordCount) {
			if (isSmartCanvas()) return false;
			return recordCount > ASYNC_THRESHOLD_COUNT;
		};
		/**
		* @description 记录在该行是否应该隐藏
		* @param {RecordId} recordId
		* @param {number} rowIndex
		* @returns {boolean}
		*/ _proto.isRecordShouldHiddenInRow = function isRecordShouldHiddenInRow(recordId, rowIndex) {
			var timeRange = this.getTimeRange(recordId);
			if (!timeRange) return true;
			var layoutRange = getLayoutRange(timeRange[0], timeRange[1], this.row);
			var startColumn;
			var endColumn;
			var isAcrossWeek = layoutRange.startRow !== layoutRange.endRow;
			if (layoutRange.startRow === rowIndex) {
				startColumn = layoutRange.startColumn;
				endColumn = isAcrossWeek ? ROW_UNIT_RANGE[1] : layoutRange.endColumn;
			} else if (layoutRange.endRow === rowIndex) {
				[startColumn] = ROW_UNIT_RANGE;
				endColumn = layoutRange.endColumn;
			} else [startColumn, endColumn] = ROW_UNIT_RANGE;
			var recordIds = this.getRowSchedules(rowIndex).map((schedule) => schedule.recordId);
			var recordIndex = recordIds.indexOf(recordId);
			var shouldCheckRecordIds = recordIds.slice(0, recordIndex);
			var hiddenUnits = this.hiddenUnitRecords.get(rowIndex);
			return Array.from({ length: endColumn - startColumn + 1 }, (_v, i) => startColumn + i).some((columnIndex) => shouldCheckRecordIds.some(() => {
				var recordCount = hiddenUnits === null || hiddenUnits === void 0 ? void 0 : hiddenUnits.get(columnIndex);
				return recordCount && recordCount > 0;
			}));
		};
		/**
		* @description 计算行内空隙状态
		* @param {Readonly<number[]>} rowSpace
		* @param {NonNullable<TimeRange>} timeRange
		* @returns {number[]}
		*/ ScheduleCalculator.diffRowSpace = function diffRowSpace(rowSpace, timeRange) {
			return rowSpace.filter((columnIndex) => columnIndex < timeRange[0] || columnIndex > timeRange[1]);
		};
		_create_class$8(ScheduleCalculator, [
			{
				key: "isTableReady",
				get: function() {
					var _a;
					return !!((_a = this.context.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.isInited());
				}
			},
			{
				key: "isViewPortReady",
				get: function() {
					return !this.lowLevelProcessor && !this.highLevelProcessor && this.isTableReady;
				}
			},
			{
				key: "shouldRecollect",
				get: function() {
					var maxShowTimeBarCount = this.getMaxShowLines();
					return this.maxShowTimeBarCount !== maxShowTimeBarCount;
				}
			},
			{
				key: "isCollecting",
				get: function() {
					return !!this.highLevelProcessor || !!this.lowLevelProcessor;
				}
			},
			{
				key: "isAllReady",
				get: function() {
					return !this.isCollecting && this.isViewPortReady;
				}
			},
			{
				key: "dateConfig",
				get: function() {
					return this.dataUtil.getDateConfig();
				}
			},
			{
				key: "context",
				get: function() {
					return this.dataUtil.getContext();
				}
			}
		]);
		return ScheduleCalculator;
	}();
	__decorate([
		throttle(16),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0)
	], ScheduleCalculator.prototype, "update", null);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/cell.js
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
var import_main$4, minHolidayWidth, cellDatePaddingTop, cellDateMobilePaddingTop, todayIconPadding, holidayPaddingTop, CellCollector;
var init_cell = __esmMin((() => {
	import_main$4 = require_main();
	init_esm();
	init_es();
	init_pen();
	init_work_day();
	init_style();
	init_constant();
	minHolidayWidth = 120;
	cellDatePaddingTop = 10;
	cellDateMobilePaddingTop = 4;
	todayIconPadding = 2;
	holidayPaddingTop = 8;
	CellCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$10(CellCollector, Disposable);
		function CellCollector(size, row, time, calculator, state, dataUtil) {
			var _this = Disposable.call(this) || this;
			_this.size = size;
			_this.row = row;
			_this.time = time;
			_this.calculator = calculator;
			_this.state = state;
			_this.dataUtil = dataUtil;
			_this.moreSchedules = /* @__PURE__ */ new Map();
			_this.backgrounds = /* @__PURE__ */ new Map();
			_this.getCellMoreSchedules = (rowIndex, columnIndex) => {
				var _a;
				return (_a = _this.moreSchedules.get(rowIndex)) === null || _a === void 0 ? void 0 : _a.get(columnIndex);
			};
			_this.getCellBackground = (rowIndex, columnIndex) => {
				var _a;
				return (_a = _this.backgrounds.get(rowIndex)) === null || _a === void 0 ? void 0 : _a.get(columnIndex);
			};
			return _this;
		}
		var _proto = CellCollector.prototype;
		_proto.collect = function collect() {
			var range = this.row.getRange();
			this.moreSchedules.clear();
			this.backgrounds.clear();
			for (var rowIndex = range.startRow; rowIndex < range.endRow; rowIndex++) this.collectByRow(rowIndex);
		};
		_proto.patch = function patch() {
			this.collect();
		};
		/**
		* @description 单元格是否需要高亮
		* @param {number} rowIndex
		* @param {number} columnIndex
		* @returns {boolean}
		*/ _proto.isCellShouldHighLight = function isCellShouldHighLight(rowIndex, columnIndex) {
			var highLightRecordIds = this.state.getHighlightInfos().recordIds;
			if (highLightRecordIds.size === 0) return false;
			for (var recordId of [...highLightRecordIds]) if (this.checkRecordInCell(recordId, rowIndex, columnIndex)) return true;
			return false;
		};
		_proto.checkRecordInCell = function checkRecordInCell(recordId, rowIndex, columnIndex) {
			var cellTime = this.time.getUnitTime(rowIndex, columnIndex);
			var recordTimeRange = this.dataUtil.getRecordRangeTime(recordId);
			if (!recordTimeRange) return false;
			if (recordTimeRange[0] <= cellTime && cellTime <= recordTimeRange[1]) return true;
			return false;
		};
		_proto.collectByRow = function collectByRow(rowIndex) {
			this.moreSchedules.set(rowIndex, /* @__PURE__ */ new Map());
			this.backgrounds.set(rowIndex, /* @__PURE__ */ new Map());
			for (var columnIndex = 0; columnIndex < 7; columnIndex++) this.collectByCell(rowIndex, columnIndex);
		};
		_proto.collectByCell = function collectByCell(rowIndex, columnIndex) {
			var cellRect = this.row.getUnitRect(rowIndex, columnIndex);
			this.collectCellMoreSchedules(rowIndex, columnIndex, cellRect);
			this.collectTexts(rowIndex, columnIndex, cellRect);
		};
		_proto.collectCellMoreSchedules = function collectCellMoreSchedules(rowIndex, columnIndex, cellRect) {
			var _a;
			var recordCount = this.calculator.getHiddenUnitRecordCount(rowIndex, columnIndex);
			var text;
			if (this.calculator.isCollecting) text = i18n.t("加载中");
			else if (!recordCount) text = "";
			else text = i18n.t("还有{{count}}项", { count: recordCount });
			var { size } = this;
			var fontSize = style.size.fontSizeSmall;
			var textWidth = pen.util.measureTextWidth(text, fontSize);
			var width = textWidth + size.buttonPadding * 2;
			var rect = {
				x: cellRect.x + size.cellPaddingLeft - size.buttonPadding,
				y: cellRect.y + cellRect.height - size.cellPaddingBottom,
				height: fontSize + size.buttonPadding * 2,
				width
			};
			var textRect = {
				x: rect.x + size.buttonPadding,
				y: rect.y + size.buttonPadding,
				height: fontSize,
				width: textWidth
			};
			var textConfig = pen.config.text(Object.assign(Object.assign({}, textRect), {
				text,
				fontSize
			}));
			(_a = this.moreSchedules.get(rowIndex)) === null || _a === void 0 || _a.set(columnIndex, {
				rect,
				recordCount,
				textConfig
			});
		};
		/**
		* @description 收集「阳历日期，节假日，阴历日期」
		* @param {number} rowIndex
		* @param {number} columnIndex
		* @param {Rect} cellRect
		*/ _proto.collectTexts = function collectTexts(rowIndex, columnIndex, cellRect) {
			var { time, row } = this;
			var cellTime = time.getUnitTime(rowIndex, columnIndex);
			var isCurrent = row.viewingMonthText === time.getMonthTextByTime(cellTime);
			var isToday = time.getDiff(Date.now(), cellTime, "day") === 0;
			var fontColor = isToday ? style.color.whiteFontColor : this.getFontColor(isCurrent);
			if (ua.isMobile) this.collectMobileTexts(rowIndex, columnIndex, cellRect, cellTime, fontColor, isToday);
			else this.collectPcTexts(rowIndex, columnIndex, cellRect, cellTime, fontColor, isToday);
		};
		_proto.collectMobileTexts = function collectMobileTexts(rowIndex, columnIndex, rect, cellTime, fontColor, isToday) {
			var { size } = this;
			var [firstTitle, middleTitle, lastTitle] = this.getUnitTitles(cellTime);
			var { dateFontSize } = size;
			var firstDateConfig = pen.config.text(Object.assign(Object.assign({}, rect), {
				y: rect.y + cellDateMobilePaddingTop,
				height: dateFontSize,
				fontSize: dateFontSize,
				text: firstTitle,
				verticalAlign: "top",
				align: "center",
				color: fontColor
			}));
			this.addBackgroundConfig(rowIndex, columnIndex, firstDateConfig);
			var lastDateConfig = pen.config.text(Object.assign(Object.assign({}, rect), {
				y: firstDateConfig.y + dateFontSize + cellDateMobilePaddingTop,
				verticalAlign: "top",
				align: "center",
				fontSize: style.size.fontSizeSmall,
				color: style.color.lightUltraFontColor,
				text: middleTitle ? middleTitle : lastTitle
			}));
			this.addBackgroundConfig(rowIndex, columnIndex, lastDateConfig);
			if (isToday) {
				var firstDateFontWidth = pen.util.measureTextWidth(firstTitle, dateFontSize);
				var iconHeight = style.size.iconLarge;
				var iconWidth = Math.max(iconHeight, firstDateFontWidth + todayIconPadding * 2);
				this.addBackgroundConfig(rowIndex, columnIndex, pen.config.rect({
					x: rect.x + (rect.width - iconWidth) / 2,
					y: firstDateConfig.y,
					background: style.color.selectionBorderColor,
					width: iconWidth,
					height: iconHeight,
					borderRadius: iconHeight / 2
				}));
			}
		};
		_proto.collectPcTexts = function collectPcTexts(rowIndex, columnIndex, rect, cellTime, fontColor, isToday) {
			var { size } = this;
			var [firstTitle, middleTitle, lastTitle] = this.getUnitTitles(cellTime);
			var { dateFontSize } = size;
			var fontStyle = "bold";
			var leftDateWidth = pen.util.measureTextWidth(firstTitle, dateFontSize, fontStyle);
			var leftDateConfig = pen.config.text({
				x: rect.x + size.cellPaddingLeft,
				y: rect.y + cellDatePaddingTop,
				width: leftDateWidth,
				height: dateFontSize,
				text: firstTitle,
				fontSize: dateFontSize,
				color: fontColor,
				fontStyle
			});
			this.addBackgroundConfig(rowIndex, columnIndex, leftDateConfig);
			if (isToday) {
				var iconHeight = style.size.iconLarge;
				var iconWidth = Math.max(iconHeight, leftDateWidth + todayIconPadding * 2);
				this.addBackgroundConfig(rowIndex, columnIndex, pen.config.rect({
					x: leftDateConfig.x - (iconWidth - leftDateWidth) / 2,
					y: leftDateConfig.y - (iconHeight - dateFontSize) / 2,
					background: style.color.selectionBorderColor,
					width: iconWidth,
					height: iconHeight,
					borderRadius: iconHeight / 2
				}));
			}
			this.addBackgroundConfig(rowIndex, columnIndex, pen.config.text({
				x: rect.x,
				y: leftDateConfig.y,
				width: rect.width - size.cellPaddingLeft,
				height: rect.height,
				text: lastTitle,
				align: "right",
				verticalAlign: "top",
				fontSize: style.size.fontSizeSmall,
				color: style.color.lightUltraFontColor
			}));
			if (!(rect.width > minHolidayWidth)) return;
			this.addBackgroundConfig(rowIndex, columnIndex, pen.config.text(Object.assign(Object.assign({}, rect), {
				y: rect.y + holidayPaddingTop,
				text: middleTitle,
				align: "center",
				verticalAlign: "top",
				fontSize: style.size.fontSizeSmall,
				color: style.color.lightUltraFontColor
			})));
		};
		_proto.addBackgroundConfig = function addBackgroundConfig(rowIndex, columnIndex, config) {
			var _a, _b, _c;
			if (!this.backgrounds.has(rowIndex)) this.backgrounds.set(rowIndex, /* @__PURE__ */ new Map());
			var backgroundBlock = (_b = (_a = this.backgrounds.get(rowIndex)) === null || _a === void 0 ? void 0 : _a.get(columnIndex)) !== null && _b !== void 0 ? _b : {
				rect: this.row.getUnitRect(rowIndex, columnIndex),
				configList: []
			};
			backgroundBlock.configList.push(config);
			(_c = this.backgrounds.get(rowIndex)) === null || _c === void 0 || _c.set(columnIndex, backgroundBlock);
		};
		/**
		* @description 获取格子内文案
		* @param {number} unitTime
		* @returns {[string, string, string]} 「阳历日期，节假日，阴历日期」
		*/ _proto.getUnitTitles = function getUnitTitles(unitTime) {
			var unitDate = new Date(unitTime);
			var date = unitDate.getDate();
			var month = unitDate.getMonth() + 1;
			return [
				date === 1 ? getI18nMonthText({ month }) : `${date}`,
				this.getHolidayTitle(unitTime),
				this.getLunarCalendarTitle(unitTime)
			];
		};
		/**
		* 获取节假日
		* @returns {string}
		*/ _proto.getHolidayTitle = function getHolidayTitle(unitTime) {
			var _a;
			var range = getSpecialDayValidRange();
			if (unitTime < range[0] || unitTime > range[1]) return "";
			var specialDay = WorkDayService.getTimestampFestival(unitTime);
			return (_a = specialDay === null || specialDay === void 0 ? void 0 : specialDay.festivalName) !== null && _a !== void 0 ? _a : "";
		};
		/**
		* @description 获取阴历标题
		* @returns {string}
		*/ _proto.getLunarCalendarTitle = function getLunarCalendarTitle(unitTime) {
			var lunarCalendar = getLunarCalendarDay(unitTime);
			if (lunarCalendar === null) return "";
			if (lunarCalendar.day === 1) return lunarCalendar.monthText;
			return lunarCalendar.dayText;
		};
		/**
		* @description 返回字体颜色
		* @param {boolean} isCurrent 是否当前月份
		* @returns {string}
		*/ _proto.getFontColor = function getFontColor(isCurrent) {
			return isCurrent ? style.color.normalFontColor : style.color.lightUltraFontColor;
		};
		return CellCollector;
	}(import_main$4.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/utils.js
function generateBlock(params) {
	var block = {
		rect: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		configList: []
	};
	if (!params) return block;
	return Object.assign({
		rect: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		configList: []
	}, params);
}
var init_utils = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/head.js
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
var HeadCollector;
var init_head = __esmMin((() => {
	init_esm();
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_utils();
	HeadCollector = /* @__PURE__ */ function() {
		"use strict";
		function HeadCollector(size, time, row, dataUtil, calculator) {
			this.size = size;
			this.time = time;
			this.row = row;
			this.dataUtil = dataUtil;
			this.calculator = calculator;
			this.monthTitle = null;
			this.toggleButton = generateBlock();
			this.switchButtonWidth = 37;
			this.dividerHeight = 14;
			this.mobileOffsetMargin = -30;
			this.todaySwitcher = null;
		}
		var _proto = HeadCollector.prototype;
		_proto.collect = function collect() {
			this.collectHeadMonthTitle();
			this.collectorHeadToggleButton();
			this.collectTodaySwitchers();
		};
		_proto.patch = function patch() {
			this.collect();
		};
		_proto.getHeadMonthTitle = function getHeadMonthTitle() {
			return this.monthTitle;
		};
		_proto.getHeadToggleButton = function getHeadToggleButton() {
			return this.toggleButton;
		};
		_proto.getTodaySwitcher = function getTodaySwitcher() {
			return this.todaySwitcher;
		};
		_proto.getMonthTitleByRowIndex = function getMonthTitleByRowIndex(rowIndex) {
			var monthBaseRow = this.row.getMonthBaseRow(rowIndex);
			var monthText = this.time.getMonthTextByRowIndex(monthBaseRow);
			return getI18nMonthTextByTime(this.time.getTimeByMonthText(monthText));
		};
		/**
		* @description 标题时间
		*/ _proto.collectHeadMonthTitle = function collectHeadMonthTitle() {
			var { row, size } = this;
			var currentMonth = this.getMonthTitleByRowIndex(row.getRange().startRow);
			var fontSize = size.monthTitleFontSize;
			var fontStyle = size.monthTitleFontStyle;
			var width = pen.util.measureTextWidth(currentMonth, fontSize, fontStyle);
			var rect = {
				x: size.headRect.x + size.headItemMargin,
				y: size.headRect.y + size.headItemMargin + size.monthTitlePaddingTop,
				width,
				height: fontSize
			};
			var textConfig = pen.config.text(Object.assign(Object.assign({}, rect), {
				text: currentMonth,
				fontSize,
				fontStyle,
				color: style.color.normalFontColor
			}));
			this.monthTitle = {
				rect,
				textConfig,
				configList: [textConfig]
			};
		};
		_proto.collectTodaySwitchers = function collectTodaySwitchers() {
			var { size, switchButtonWidth } = this;
			var iconSize = style.size.iconNormal;
			var endX = this.toggleButton.configList.length ? this.toggleButton.rect.x - size.headItemMargin : this.size.headRect.x + this.size.headRect.width - size.headItemMargin;
			var leftIconConfig = void 0;
			var rightIconConfig = void 0;
			var width = ua.isMobile ? switchButtonWidth : switchButtonWidth + iconSize * 2;
			var rect = Object.assign(Object.assign({}, this.headItemTopAndHeight), {
				x: endX - width + (ua.isMobile ? size.headItemMargin * 2 : 0) - size.buttonPadding,
				y: this.headItemTopAndHeight.y + size.iconPadding,
				width
			});
			var configList = [];
			if (!ua.isMobile) {
				rightIconConfig = pen.config.icon(NormalIconAlias.ARROW_NEXT, {
					x: rect.x + rect.width - iconSize,
					y: rect.y + (rect.height - iconSize) / 2,
					width: iconSize,
					height: iconSize
				});
				configList.push(rightIconConfig);
				leftIconConfig = pen.config.icon(NormalIconAlias.ARROW_PREV, Object.assign(Object.assign({}, rightIconConfig), { x: rect.x }));
				configList.push(leftIconConfig);
			} else {
				var dividerConfig = pen.config.line({
					x: rect.x + style.size.iconNormal,
					y: rect.y + this.size.buttonPadding,
					points: [
						0,
						0,
						0,
						this.dividerHeight
					],
					borderColor: style.color.normalBorderColor
				});
				configList.push(dividerConfig);
			}
			var textConfig = pen.config.text(Object.assign(Object.assign({}, rect), {
				text: i18n.t("今天"),
				x: rect.x + (ua.isMobile ? this.mobileOffsetMargin : iconSize),
				width: this.switchButtonWidth,
				align: "center",
				fontSize: style.size.fontSizeSmall
			}));
			configList.push(textConfig);
			this.todaySwitcher = {
				rect,
				textConfig,
				leftIconConfig,
				rightIconConfig,
				configList
			};
		};
		_proto.collectorHeadToggleButton = function collectorHeadToggleButton() {
			if (this.dataUtil.isSidebarOpen) {
				this.toggleButton = generateBlock();
				return;
			}
			var { size } = this;
			var { paddingLeftAndRight } = size.headButton;
			var sidebarScheduleCount = this.calculator.getUnSchedules().length;
			var unplanText = `${i18n.t("无日期记录")}${i18n.t("：")}${sidebarScheduleCount}`;
			var unplanTextWidth = Math.round(pen.util.measureTextWidth(unplanText, style.size.fontSizeSmall));
			var buttonWidth = unplanTextWidth + 2 * paddingLeftAndRight;
			var rect = Object.assign(Object.assign({}, this.headItemTopAndHeight), {
				x: size.headRect.x + size.headRect.width - buttonWidth - size.headItemMargin,
				width: buttonWidth
			});
			var configList = [];
			var rectConfig = void 0;
			if (!ua.isMobile) {
				rectConfig = pen.config.rect(Object.assign(Object.assign({}, rect), {
					borderRadius: style.size.borderRadius,
					background: style.color.activedBackground
				}));
				configList.push(rectConfig);
			}
			var textConfig = pen.config.text(Object.assign(Object.assign({}, rect), {
				y: rect.y + this.size.headButton.paddingTopAndBottom,
				x: rect.x + paddingLeftAndRight,
				width: unplanTextWidth,
				color: style.color.lightFontColor,
				text: unplanText,
				fontSize: style.size.fontSizeSmall
			}));
			configList.push(textConfig);
			this.toggleButton = {
				rect,
				configList
			};
		};
		_create_class$7(HeadCollector, [{
			key: "headItemTopAndHeight",
			get: function() {
				var { headRect, headItemMargin, headButton } = this.size;
				return {
					y: headRect.y + headItemMargin,
					height: style.size.iconNormal + 2 * headButton.paddingTopAndBottom
				};
			}
		}]);
		return HeadCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/row-line.js
var RowLineCollector;
var init_row_line = __esmMin((() => {
	init_pen();
	init_style();
	RowLineCollector = /* @__PURE__ */ function() {
		"use strict";
		function RowLineCollector(row) {
			this.row = row;
			this.lines = /* @__PURE__ */ new Map();
		}
		var _proto = RowLineCollector.prototype;
		_proto.collect = function collect() {
			this.lines.clear();
			var range = this.row.getRange();
			for (var rowIndex = range.startRow; rowIndex < range.endRow; rowIndex++) this.collectRowLine(rowIndex);
		};
		_proto.patch = function patch() {
			this.collect();
		};
		_proto.getLine = function getLine(rowIndex) {
			return this.lines.get(rowIndex);
		};
		_proto.collectRowLine = function collectRowLine(rowIndex) {
			var rowRect = this.row.getRowRect(rowIndex);
			var lineSize = style.size.borderWidth;
			var rect = {
				x: rowRect.x,
				y: rowRect.y,
				width: rowRect.width,
				height: lineSize
			};
			var lineConfig = pen.config.line({
				x: rect.x,
				y: rect.y,
				points: [
					0,
					0,
					rect.width,
					0
				],
				borderWidth: lineSize,
				borderColor: style.color.normalBorderColor
			});
			this.lines.set(rowIndex, {
				rect,
				configList: [lineConfig]
			});
		};
		return RowLineCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/side-bar.js
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
var import_main$3, foldIconMarginTop, SidebarCollector;
var init_side_bar = __esmMin((() => {
	init_event();
	import_main$3 = require_main();
	init_es();
	init_config();
	init_pen();
	init_resources();
	init_style();
	init_utils();
	init_calculate_rect();
	init_get_block_style();
	init_get_primary_title();
	init_field_title();
	foldIconMarginTop = 4;
	SidebarCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$9(SidebarCollector, Disposable);
		function SidebarCollector(size, dataUtil, calculator, status) {
			var _this = Disposable.call(this) || this;
			_this.size = size;
			_this.dataUtil = dataUtil;
			_this.calculator = calculator;
			_this.status = status;
			_this.scrollTop = 0;
			_this.onSidebarScrollEmitter = _this._register(new Emitter());
			_this.onSideBarScheduleFilterEmitter = _this._register(new Emitter());
			_this.keyWord = "";
			_this.stopRaf = null;
			_this.scrollToTopWidthAnimation = (scrollTop, callback, lastDeltaY) => {
				var deltaY = scrollTop - _this.scrollTop;
				if (deltaY === 0 || lastDeltaY !== void 0 && lastDeltaY === deltaY) {
					callback === null || callback === void 0 || callback();
					return;
				}
				var scrollY = deltaY;
				if (Math.abs(deltaY) > 10) scrollY = deltaY / 3;
				_this.setScrollTop(_this.scrollTop + scrollY);
				if (_this.stopRaf) cancelAnimationFrame(_this.stopRaf);
				requestAnimationFrame(() => _this.scrollToTopWidthAnimation(scrollTop, callback, deltaY));
			};
			_this.setRecordBlockOpacity = (recordId, opacity) => {
				_this.records.forEach((record) => {
					if (record.recordId !== recordId) return;
					record.rectConfig = pen.config.rect(Object.assign(Object.assign({}, record.rectConfig), { opacity }));
				});
			};
			_this.filterByKeyword = (keyWord) => {
				_this.keyWord = keyWord;
				_this.patch();
				_this.onSideBarScheduleFilterEmitter.fire();
			};
			_this.init();
			_this.onSidebarScroll = _this.onSidebarScrollEmitter.event;
			_this.onSideBarScheduleFilter = _this.onSideBarScheduleFilterEmitter.event;
			return _this;
		}
		var _proto = SidebarCollector.prototype;
		_proto.dispose = function dispose(trace) {
			Disposable.prototype.dispose.call(this, trace);
			if (this.stopRaf) cancelAnimationFrame(this.stopRaf);
		};
		_proto.collect = function collect() {
			if (!this.dataUtil.isSidebarOpen) {
				this.init();
				return;
			}
			this.collectFoldIcon();
			this.collectHeadText();
			this.collectAddSchedule();
			this.collectSchedules();
		};
		_proto.patch = function patch() {
			this.collect();
		};
		_proto.getFoldIcon = function getFoldIcon() {
			return this.foldIcon;
		};
		_proto.getHeadText = function getHeadText() {
			return this.headText;
		};
		_proto.getAddRecord = function getAddRecord() {
			return this.addRecord;
		};
		_proto.getRecords = function getRecords() {
			return this.records;
		};
		_proto.getScrollTop = function getScrollTop() {
			return this.scrollTop;
		};
		_proto.setScrollTop = function setScrollTop(scrollTop) {
			var maxScrollTop = this.scrollHeight - this.scheduleListRect.height;
			var newScrollTop = Math.max(Math.min(scrollTop, maxScrollTop), 0);
			if (Number.isNaN(newScrollTop) || newScrollTop === this.scrollTop) return;
			this.scrollTop = newScrollTop;
			this.collectSchedules();
			this.onSidebarScrollEmitter.fire();
		};
		_proto.getRecord = function getRecord(index) {
			return this.records[index];
		};
		_proto.init = function init() {
			this.foldIcon = generateBlock();
			this.headText = generateBlock();
			this.addRecord = generateBlock();
			this.records = [];
		};
		_proto.collectFoldIcon = function collectFoldIcon() {
			var { iconRect, size } = this;
			var backgroundRect = extendRect(iconRect, size.iconPadding);
			var iconConfig = pen.config.icon(NormalIconAlias.SUPER_NEXT, iconRect);
			var backgroundConfig = pen.config.rect(Object.assign(Object.assign({}, backgroundRect), {
				background: style.color.activedBackground,
				borderRadius: style.size.borderRadius
			}));
			this.foldIcon = {
				rect: backgroundConfig,
				configList: [iconConfig, backgroundConfig]
			};
		};
		_proto.collectHeadText = function collectHeadText() {
			var sidebarScheduleCount = this.calculator.getUnSchedules().length;
			var unplanText = `${i18n.t("无日期记录")}${i18n.t("：")}${sidebarScheduleCount}`;
			var fontSize = style.size.fontSizeLarge;
			var width = pen.util.measureTextWidth(unplanText, fontSize);
			var rect = Object.assign(Object.assign({}, this.iconRect), {
				x: this.iconRect.x + this.iconRect.width + this.size.sidebarItemMargin,
				width
			});
			this.headText = {
				rect,
				configList: [pen.config.text(Object.assign({
					text: unplanText,
					color: style.color.normalFontColor,
					fontSize: style.size.fontSizeLarge
				}, rect))]
			};
		};
		_proto.collectAddSchedule = function collectAddSchedule() {
			if (!this.addRecordRect) return;
			var { textRect, iconRect, rect } = this.addRecordRect;
			this.addRecord = {
				rect,
				configList: [pen.config.text(Object.assign(Object.assign({}, textRect), {
					text: i18n.t("添加记录"),
					color: style.color.lightUltraFontColor,
					fontSize: style.size.fontSizeNormal
				})), pen.config.icon(NormalIconAlias.ADD, iconRect)]
			};
		};
		_proto.collectSchedules = function collectSchedules() {
			this.records = [];
			var schedules = this.getSchedules();
			var { size, addRecordRect } = this;
			var { x, y, width, height } = size.sidebarBodyRect;
			var { sidebarItemMargin, sidebarSchedule } = size;
			var { index, relativelyScrollTop } = this.getFirstScheduleByScrollTop();
			var renderSchedules = schedules.slice(index);
			var rect = null;
			for (var recordId of renderSchedules) {
				if (rect === null) {
					var baseY = addRecordRect ? addRecordRect.rect.y + addRecordRect.rect.height : y;
					rect = {
						x: x + sidebarItemMargin,
						y: baseY + sidebarItemMargin - relativelyScrollTop,
						height: sidebarSchedule.height,
						width: width - sidebarItemMargin * 2
					};
				} else rect.y += rect.height + sidebarItemMargin;
				if (rect.y > y + height) break;
				var scheduleConfig = this.collectScheduleConfig(recordId, rect);
				var rectConfig = this.collectScheduleRect(recordId, rect);
				this.records.push({
					recordId,
					rect: Object.assign({}, rect),
					rectConfig,
					configList: scheduleConfig.concat(rectConfig),
					textConfig: scheduleConfig.filter((scheduleConfig) => scheduleConfig.type === DrawType.Text)
				});
			}
		};
		_proto.collectScheduleConfig = function collectScheduleConfig(recordId, rect) {
			var blockStyle = getBlockStyle(recordId, this.methodHelper);
			var title = getRecordPrimaryTitle(recordId, this.methodHelper);
			var { paddingLeftAndRight, paddingTopAndBottom, textMarginTopAndBottom } = this.size.sidebarSchedule;
			var fontSize = style.size.fontSizeSmall;
			var titleConfig = pen.config.text({
				text: title,
				x: rect.x + paddingLeftAndRight,
				y: rect.y + paddingTopAndBottom,
				height: fontSize,
				fontSize,
				width: rect.width - paddingLeftAndRight * 2,
				color: blockStyle.textColor
			});
			var result = [titleConfig];
			var subTitleConfig = this.getSubTitleConfig({
				y: titleConfig.y + titleConfig.height + textMarginTopAndBottom,
				x: titleConfig.x,
				width: titleConfig.width,
				height: fontSize
			}, blockStyle);
			if (subTitleConfig) slicePush(result, subTitleConfig);
			return result;
		};
		/**
		* @description 背景及边框
		*/ _proto.collectScheduleRect = function collectScheduleRect(recordId, rect) {
			var blockStyle = getBlockStyle(recordId, this.methodHelper);
			return pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: blockStyle.background,
				borderColor: blockStyle.borderColor,
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.borderRadius
			}));
		};
		_proto.getSubTitleConfig = function getSubTitleConfig(rect, blockStyle) {
			var dateConfig = this.dataUtil.getDateConfig(true);
			if (!(dateConfig === null || dateConfig === void 0 ? void 0 : dateConfig.startDateFieldId)) return [];
			var { startDateFieldId } = dateConfig;
			var hasPermission = this.status.getPermissionStatus("canReadField", { fieldId: startDateFieldId });
			var fieldTitle;
			if (hasPermission) {
				var field = this.dataUtil.getFieldByFieldId(startDateFieldId);
				fieldTitle = mapWbFieldTitle((field === null || field === void 0 ? void 0 : field.getTitle()) || "");
			} else fieldTitle = i18n.t("无权限的字段");
			var suffix = `${i18n.t("：")}${i18n.t("未设置")}`;
			var fontSize = style.size.fontSizeSmall;
			var fieldTitleWith = pen.util.measureTextWidth(fieldTitle, fontSize);
			var suffixWidth = pen.util.measureTextWidth(suffix, fontSize);
			var errorIconWidth = 14;
			var errorIconMargin = 2;
			var remainWidth = hasPermission ? rect.width - suffixWidth : rect.width - suffixWidth - errorIconWidth - errorIconMargin;
			var fieldTitleFinalWidth = Math.min(fieldTitleWith, remainWidth);
			var subTitleConfig = [];
			var { x } = rect;
			if (!hasPermission) {
				subTitleConfig.push(pen.config.icon(NormalIconAlias.FAILED_ICON, {
					x,
					y: rect.y - 1,
					width: errorIconWidth,
					height: errorIconWidth
				}));
				x += errorIconWidth + errorIconMargin;
			}
			var textConfig = {
				fontSize,
				color: blockStyle.textColor,
				opacity: style.consts.errorOpacity
			};
			subTitleConfig.push(pen.config.text(Object.assign(Object.assign(Object.assign({}, rect), {
				x,
				width: fieldTitleFinalWidth,
				text: fieldTitle
			}), textConfig)));
			x += fieldTitleFinalWidth;
			subTitleConfig.push(pen.config.text(Object.assign(Object.assign(Object.assign({}, rect), {
				x,
				width: suffixWidth,
				text: suffix
			}), textConfig)));
			return subTitleConfig;
		};
		/**
		* @description 通过滚动位置获取侧边栏中展示的第一个日程
		*/ _proto.getFirstScheduleByScrollTop = function getFirstScheduleByScrollTop() {
			var { oneScheduleHeight } = this;
			var index = Math.floor(this.scrollTop / oneScheduleHeight);
			return {
				index,
				relativelyScrollTop: this.scrollTop - index * oneScheduleHeight
			};
		};
		_proto.getSchedules = function getSchedules() {
			return this.calculator.getUnSchedules().filter((recordId) => {
				return getRecordPrimaryTitle(recordId, this.methodHelper).includes(this.keyWord);
			});
		};
		_create_class$6(SidebarCollector, [
			{
				key: "scheduleListRect",
				get: function() {
					var addRecordBlock = this.getAddRecord();
					var { sidebarBodyRect } = this.size;
					if (!(addRecordBlock === null || addRecordBlock === void 0 ? void 0 : addRecordBlock.rect.height)) return sidebarBodyRect;
					var reduceHeight = addRecordBlock.rect.height + this.size.sidebarItemMargin * 2;
					return Object.assign(Object.assign({}, sidebarBodyRect), {
						y: sidebarBodyRect.y + reduceHeight,
						height: sidebarBodyRect.height - reduceHeight
					});
				}
			},
			{
				key: "scrollHeight",
				get: function() {
					var sidebarScheduleCount = this.getSchedules().length;
					if (sidebarScheduleCount === 0) return 0;
					return (sidebarScheduleCount * this.oneScheduleHeight + -1 * this.size.sidebarItemMargin) * this.size.scale;
				}
			},
			{
				key: "oneScheduleHeight",
				get: function() {
					return this.size.sidebarSchedule.height + this.size.sidebarItemMargin;
				}
			},
			{
				key: "iconRect",
				get: function() {
					var { size } = this;
					var { x, y } = size.sidebarHeadRect;
					var iconSize = style.size.iconNormal;
					return {
						x: x + size.headItemMargin,
						y: y + size.headItemMargin + foldIconMarginTop,
						width: iconSize,
						height: iconSize
					};
				}
			},
			{
				key: "addRecordRect",
				get: function() {
					if (!this.status.getPermissionStatus("canInsertRecord", {})) return null;
					var { size } = this;
					var { x, y } = size.sidebarBodyRect;
					var { sidebarItemMargin, iconPadding } = size;
					var iconSize = style.size.iconNormal;
					var textWidth = pen.util.measureTextWidth(i18n.t("添加记录"), style.size.fontSizeNormal);
					var rect = {
						x: x + sidebarItemMargin,
						y: y + sidebarItemMargin,
						width: textWidth + iconSize + iconPadding * 4,
						height: iconSize
					};
					var iconRect = {
						x: rect.x,
						y: rect.y,
						width: iconSize,
						height: iconSize
					};
					return {
						iconRect,
						textRect: Object.assign(Object.assign({}, rect), {
							x: iconRect.x + iconRect.width + iconPadding * 2,
							width: textWidth
						}),
						rect
					};
				}
			},
			{
				key: "methodHelper",
				get: function() {
					var { dataUtil } = this;
					return {
						getPrimaryFieldId: () => dataUtil.getPrimaryFieldId(),
						getDateConfig: () => dataUtil.getDateConfig(),
						getCell: (fieldId, recordId) => dataUtil.getStandardCell(fieldId, recordId)
					};
				}
			}
		]);
		return SidebarCollector;
	}(import_main$3.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/apply-offset-move.js
function ApplyOffsetMove(offset, delta) {
	var { x = 0, y = 0 } = delta;
	offset.x = Number((offset.x - x).toFixed(2));
	offset.y = Number((offset.y - y).toFixed(2));
}
var init_apply_offset_move = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/static.js
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
var StaticCollector;
var init_static = __esmMin((() => {
	init_esm();
	init_es();
	init_lib();
	init_pen();
	init_style();
	init_utils();
	init_apply_offset_move();
	StaticCollector = /* @__PURE__ */ function() {
		"use strict";
		function StaticCollector(size, dataUtil, row) {
			this.size = size;
			this.dataUtil = dataUtil;
			this.row = row;
			this.initStaticBlocks();
		}
		var _proto = StaticCollector.prototype;
		_proto.getBlocks = function getBlocks() {
			return this.staticBlocks;
		};
		_proto.collect = function collect() {
			this.initStaticBlocks();
			this.collectHeadBackground();
			this.collectHeadWeekNames();
			this.collectBodyBackground();
			this.collectSidebarHeadBackground();
			this.collectSidebarBodyBackground();
		};
		_proto.patch = function patch() {
			this.collect();
		};
		_proto.applyOffset = function applyOffset(delta) {
			var { x } = delta;
			if (!x) return;
			var { body, head, sidebarHead, sidebarBody } = this.staticBlocks;
			[
				...body.configList,
				...head.configList,
				...sidebarHead.configList,
				...sidebarBody.configList
			].forEach((config) => {
				ApplyOffsetMove(config, { x });
			});
			[
				body.rect,
				head.rect,
				sidebarHead.rect,
				sidebarBody.rect
			].forEach((rect) => {
				ApplyOffsetMove(rect, { x });
			});
		};
		_proto.initStaticBlocks = function initStaticBlocks() {
			this.staticBlocks = {
				body: generateBlock(),
				head: generateBlock(),
				sidebarBody: generateBlock(),
				sidebarHead: generateBlock()
			};
		};
		/**
		* 头部边框线和白色底色
		*/ _proto.collectHeadBackground = function collectHeadBackground() {
			var { size, dataUtil } = this;
			var { x, y, height, width } = size.headRect;
			var radius = style.defaultCornerConfig.borderRadius;
			var { isSidebarOpen } = dataUtil;
			var rectConfig = pen.config.rect(Object.assign(Object.assign({}, size.headRect), {
				borderRadius: [
					radius,
					isSidebarOpen ? 0 : radius,
					0,
					0
				],
				background: style.color.normalBackground,
				borderColor: style.color.lightBorderColor,
				borderWidth: style.defaultCornerConfig.borderWidth
			}));
			this.staticBlocks.head.configList.push(rectConfig);
			var lineConfig = pen.config.line({
				x,
				y: y + height,
				points: [
					0,
					0,
					width,
					0
				],
				borderColor: style.color.normalBorderColor
			});
			this.staticBlocks.head.configList.push(lineConfig);
		};
		/**
		* 头部周一至周日文案
		*/ _proto.collectHeadWeekNames = function collectHeadWeekNames() {
			var { size, row } = this;
			var textHeight = 3 * style.size.fontSizeSmall;
			var rect = Object.assign(Object.assign({}, size.headRect), {
				y: size.headRect.y + size.headRect.height - textHeight,
				height: textHeight
			});
			var textConfigList = this.i18nWeekNames.map((i18nWeekName, index) => {
				var weekAlias = ua.isMobile ? i18nWeekName.short : i18nWeekName.full;
				return pen.config.text(Object.assign(Object.assign({}, rect), {
					text: weekAlias,
					x: row.getUnitX(index),
					width: size.cellWidth,
					fontSize: style.size.fontSizeSmall,
					color: style.color.normalFontColor,
					align: "center"
				}));
			});
			this.staticBlocks.head.configList = this.staticBlocks.head.configList.concat(textConfigList);
		};
		/**
		* body 边框线和白色/灰色底色
		*/ _proto.collectBodyBackground = function collectBodyBackground() {
			var { size, row } = this;
			var { x, y, height, width } = size.bodyRect;
			this.staticBlocks.body.configList.push(pen.config.rect({
				x,
				y: y + 1,
				width,
				height,
				background: style.color.normalBackground
			}));
			this.staticBlocks.body.configList.push(pen.config.rect({
				x: row.getUnitX(5),
				y: y + 1,
				width: x + width - row.getUnitX(5),
				height,
				background: style.color.lightCanvasBackground
			}));
			this.staticBlocks.body.configList.push(pen.config.line({
				level: Level.L0,
				x,
				y,
				points: [
					0,
					0,
					0,
					height,
					width,
					height,
					width,
					0
				],
				borderColor: style.color.lightBorderColor,
				borderWidth: style.size.borderWidth
			}));
			for (var i = 1; i < this.i18nWeekNames.length; i++) {
				var lineX = row.getUnitX(i) - x;
				this.staticBlocks.body.configList.push(pen.config.line({
					level: Level.L0,
					x,
					y,
					points: [
						lineX,
						0,
						lineX,
						height
					],
					borderColor: style.color.lightBorderColor,
					borderWidth: style.size.borderWidth
				}));
			}
		};
		/**
		* 侧边栏头部边框线和白色底色
		*/ _proto.collectSidebarHeadBackground = function collectSidebarHeadBackground() {
			var { size } = this;
			var { x, y, width } = size.sidebarHeadRect;
			var headHeight = size.headRect.height;
			var radius = style.defaultCornerConfig.borderRadius;
			var rectConfig = pen.config.rect(Object.assign(Object.assign({}, size.sidebarHeadRect), {
				borderRadius: [
					0,
					radius,
					0,
					0
				],
				background: style.color.normalBackground,
				borderColor: style.color.lightBorderColor,
				borderWidth: style.defaultCornerConfig.borderWidth
			}));
			this.staticBlocks.sidebarHead.configList.push(rectConfig);
			var lineConfig = pen.config.line({
				x,
				y: y + headHeight,
				points: [
					0,
					0,
					width,
					0
				],
				borderColor: style.color.normalBorderColor
			});
			this.staticBlocks.sidebarHead.configList.push(lineConfig);
		};
		_proto.collectSidebarBodyBackground = function collectSidebarBodyBackground() {
			var { sidebarBodyRect } = this.size;
			var rectConfig = pen.config.rect(Object.assign(Object.assign({}, sidebarBodyRect), {
				x: sidebarBodyRect.x,
				background: style.color.normalBackground,
				borderColor: style.color.normalBorderColor,
				borderWidth: style.defaultCornerConfig.borderWidth
			}));
			this.staticBlocks.sidebarBody.configList.push(rectConfig);
		};
		_create_class$5(StaticCollector, [{
			key: "i18nWeekNames",
			get: function() {
				return [
					{
						short: i18n.t("一"),
						full: i18n.t("周一")
					},
					{
						short: i18n.t("二"),
						full: i18n.t("周二")
					},
					{
						short: i18n.t("三"),
						full: i18n.t("周三")
					},
					{
						short: i18n.t("四"),
						full: i18n.t("周四")
					},
					{
						short: i18n.t("五"),
						full: i18n.t("周五")
					},
					{
						short: i18n.t("六"),
						full: i18n.t("周六")
					},
					{
						short: i18n.t("日"),
						full: i18n.t("周日")
					}
				];
			}
		}]);
		return StaticCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/get-time-bar-rect.js
/**
* 获取日程条一行内的 rect
* 包括单元格最外层覆盖范围，不包括左右 padding
*/ function getTimeBarRect(line, row, size) {
	var { rowIndex, startColumn, endColumn, index } = line;
	if (index > size.maxShowTimeBarCount - 1) return null;
	var lineY = size.cellPaddingTop + index * (size.timeBarHeight + size.timeBarMarginTop);
	var unitStartX = row.getUnitX(startColumn);
	var width = row.getUnitX(endColumn + 1) - unitStartX;
	return {
		x: unitStartX,
		y: row.getRowY(rowIndex) + lineY,
		width,
		height: size.timeBarHeight
	};
}
/**
* 修正日程 rect 跨周的 padding
*/ function fixWeekPadding(rowIndex, startRow, endRow, rect, size) {
	var drawRect = Object.assign({}, rect);
	var isAcrossWeek = startRow !== endRow;
	var { cellPaddingLeft } = size;
	if (isAcrossWeek) {
		if (rowIndex === startRow) {
			drawRect.x += cellPaddingLeft;
			drawRect.width -= cellPaddingLeft;
		} else if (rowIndex === endRow) drawRect.width -= cellPaddingLeft;
	} else {
		drawRect.x += cellPaddingLeft;
		drawRect.width -= 2 * cellPaddingLeft;
	}
	return drawRect;
}
function getTimeBarRadius(rowIndex, startRow, endRow) {
	var radius = style.size.borderRadius;
	var cornerRadius = 0;
	if (startRow === endRow) return radius;
	if (rowIndex === startRow) cornerRadius = [
		radius,
		0,
		0,
		radius
	];
	else if (rowIndex === endRow) cornerRadius = [
		0,
		radius,
		radius,
		0
	];
	return cornerRadius;
}
var init_get_time_bar_rect = __esmMin((() => {
	init_style();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/content/time-bar.js
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
var import_main$2, TimeBarCollector;
var init_time_bar = __esmMin((() => {
	import_main$2 = require_main();
	init_esm();
	init_es();
	init_es$1();
	init_lib();
	init_pen();
	init_resources();
	init_style();
	init_get_time_bar_rect();
	init_apply_offset_move();
	init_get_block_style();
	init_get_primary_title();
	TimeBarCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$8(TimeBarCollector, Disposable);
		function TimeBarCollector(size, row, dataUtil, calculator) {
			var _this = Disposable.call(this) || this;
			_this.size = size;
			_this.row = row;
			_this.dataUtil = dataUtil;
			_this.calculator = calculator;
			_this.timeBlockMap = /* @__PURE__ */ new Map();
			_this.currentTimeBlockList = [];
			_this.allTimeBlockList = [];
			_this.getBlockList = () => _this.currentTimeBlockList;
			_this.getBlockListByRecord = (recordId) => _this.getBlockList().filter((timeBlock) => recordId === timeBlock.recordId);
			_this.getTimeBarListInCell = (rowIndex, columnIndex) => {
				var timeBlocks = _this.timeBlockMap.get(rowIndex);
				if (!timeBlocks) return [];
				return timeBlocks.filter((timeBlock) => timeBlock.endColumn >= columnIndex && timeBlock.startColumn <= columnIndex);
			};
			_this.getTimeBarCountInCell = (rowIndex, columnIndex) => {
				var timeBlocksInCell = _this.getTimeBarListInCell(rowIndex, columnIndex);
				var blockInCell = 0;
				timeBlocksInCell.forEach((timeBlock) => {
					blockInCell = Math.max(blockInCell, timeBlock.index + 1);
				});
				return blockInCell;
			};
			_this.setRecordBlockOpacity = (recordId, opacity) => {
				_this.getBlockListByRecord(recordId).forEach((timeBlock) => {
					if (timeBlock.recordId !== recordId) return;
					timeBlock.rectConfig = pen.config.rect(Object.assign(Object.assign({}, timeBlock.rectConfig), { opacity }));
				});
			};
			_this.setRecordBlockHidden = (recordId, hidden) => {
				_this.getBlockListByRecord(recordId).forEach((timeBlock) => {
					if (timeBlock.recordId !== recordId) return;
					timeBlock.hidden = hidden;
				});
			};
			_this.collectTimeBar = () => {
				_this.calculator.getSchedules().forEach((schedule) => _this.collectSchedule(schedule));
				_this.allTimeBlockList = [..._this.timeBlockMap.values()].reduce((result, timeBlocks) => [...result, ...timeBlocks], []);
			};
			_this.updateCurrentTimeBlockList = (range) => {
				var { startRow, endRow } = range;
				_this.currentTimeBlockList = _this.allTimeBlockList.filter((timeBlock) => timeBlock.rowIndex >= startRow && timeBlock.rowIndex <= endRow);
			};
			_this.updateCurrentTimeBlockList(_this.row.getRange());
			_this._register(_this.row.onRowChange(_this.updateCurrentTimeBlockList));
			return _this;
		}
		var _proto = TimeBarCollector.prototype;
		_proto.collect = function collect() {
			this.timeBlockMap.clear();
			this.collectTimeBar();
			this.updateCurrentTimeBlockList(this.row.getRange());
		};
		_proto.patch = function patch() {
			this.collect();
		};
		_proto.applyOffset = function applyOffset(delta) {
			this.allTimeBlockList.forEach((block) => {
				block.configList.forEach((config) => ApplyOffsetMove(config, delta));
				ApplyOffsetMove(block.rect, delta);
			});
		};
		_proto.generateVisibleBlockConfigByRecord = function generateVisibleBlockConfigByRecord(schedule, lines) {
			var blockStyle = getBlockStyle(schedule.recordId, this.methodHelper);
			var recordBlockList = [];
			var range = this.row.getRange();
			var startRow = lines[0].rowIndex;
			var endRow = lines[lines.length - 1].rowIndex;
			lines.forEach((line) => {
				var { rowIndex } = line;
				if (rowIndex < range.startRow || rowIndex > range.endRow) return;
				var timeBarRect = getTimeBarRect(line, this.row, this.size);
				if (!timeBarRect) return;
				var fixedDrawRect = fixWeekPadding(rowIndex, startRow, endRow, timeBarRect, this.size);
				var { textsConfig, iconConfig } = this.generateTextsConfig(schedule, rowIndex, fixedDrawRect, blockStyle);
				recordBlockList.push({
					rectConfig: this.generateRectConfig({
						startRow,
						endRow
					}, rowIndex, fixedDrawRect, blockStyle),
					textConfig: textsConfig,
					iconConfig,
					blockStyle
				});
			});
			return recordBlockList;
		};
		_proto.collectSchedule = function collectSchedule(schedule) {
			var blockStyle = getBlockStyle(schedule.recordId, this.methodHelper);
			schedule.lines.forEach((line) => {
				var _a;
				var { rowIndex } = line;
				var timeBlock = this.generateTimeBlock(schedule, line, blockStyle);
				if (!timeBlock) return;
				var timeBlocks = (_a = this.timeBlockMap.get(rowIndex)) !== null && _a !== void 0 ? _a : [];
				timeBlocks.push(timeBlock);
				this.timeBlockMap.set(rowIndex, timeBlocks);
			});
		};
		_proto.generateTimeBlock = function generateTimeBlock(schedule, line, blockStyle) {
			var { layoutRange } = schedule;
			var { rowIndex, index } = line;
			var { startRow, endRow } = layoutRange;
			if (index >= this.size.maxShowTimeBarCount) return null;
			var timeBarRect = getTimeBarRect(line, this.row, this.size);
			if (!timeBarRect) return null;
			var fixedDrawRect = fixWeekPadding(rowIndex, startRow, endRow, timeBarRect, this.size);
			var configList = [];
			var rectConfig = this.generateRectConfig(layoutRange, rowIndex, fixedDrawRect, blockStyle);
			configList.push(rectConfig);
			var { textsConfig, iconConfig } = this.generateTextsConfig(schedule, rowIndex, fixedDrawRect, blockStyle);
			if (iconConfig) configList.push(iconConfig);
			return Object.assign(Object.assign({
				rect: fixedDrawRect,
				textConfig: textsConfig,
				rectConfig,
				iconConfig,
				configList: [...configList, ...textsConfig],
				blockStyle
			}, schedule), line);
		};
		_proto.generateRectConfig = function generateRectConfig({ startRow, endRow }, rowIndex, rect, blockStyle) {
			var borderRadius = getTimeBarRadius(rowIndex, startRow, endRow);
			return pen.config.rect(Object.assign(Object.assign({}, rect), {
				borderRadius,
				background: blockStyle.background,
				borderColor: blockStyle.borderColor,
				level: Level.L1
			}));
		};
		_proto.generateTextsConfig = function generateTextsConfig(schedule, rowIndex, rect, blockStyle) {
			var { isMobile } = ua;
			var padding = this.size.timeBarTitlePaddingTop;
			var width = rect.width - 2 * padding;
			var isError = isPrimaryFormulaError(schedule.recordId, this.methodHelper);
			var textsConfig = [];
			if (!isMobile) textsConfig = this.collectStartAndEndTime(schedule, rowIndex, rect, blockStyle, isError);
			var retainWidth = textsConfig.reduce((width, config) => width - config.width, width);
			var iconSize = style.size.iconNormal;
			var iconWidth = style.size.iconNormal + style.size.iconPadding;
			var isNeedPenError = isError && retainWidth > iconWidth;
			textsConfig.unshift(pen.config.text(Object.assign(Object.assign({}, rect), {
				x: isNeedPenError ? rect.x + iconWidth + padding : rect.x + padding,
				width: isNeedPenError ? retainWidth - iconWidth : retainWidth,
				text: this.getTitle(schedule.recordId),
				color: blockStyle.textColor,
				fontSize: style.size.fontSizeSmall,
				ellipsis: !isMobile,
				opacity: isError ? style.consts.errorOpacity : void 0
			})));
			var iconConfig;
			if (isNeedPenError) iconConfig = pen.config.icon(NormalIconAlias.FAILED_ICON_GRAY, {
				x: rect.x + padding,
				y: rect.y + (rect.height - iconSize) / 2,
				width: iconSize,
				height: iconSize,
				opacity: style.consts.errorOpacity
			});
			return {
				textsConfig,
				iconConfig
			};
		};
		_proto.collectStartAndEndTime = function collectStartAndEndTime(schedule, rowIndex, rect, blockStyle, isError) {
			var _a;
			var rangeText = this.getRangeTexts(schedule, rowIndex);
			var result = [];
			if (!rangeText) return result;
			var startDateConfig = void 0;
			var padding = this.size.timeBarTitlePaddingTop;
			var { start: rawStart, end: rawEnd } = rangeText;
			var isWb = domainConfig.getIsWb();
			var start = isWb ? "" : rawStart;
			var end = isWb ? "" : rawEnd;
			var fontSize = style.size.fontSizeSmall;
			var startTextWidth = start ? Math.ceil(pen.util.measureTextWidth(start, fontSize) + padding) : 0;
			var endText = `${i18n.t("结束")} ${end}`;
			var endTextWidth = end ? Math.ceil(pen.util.measureTextWidth(endText, fontSize) + padding) : 0;
			var remainWidth = rect.width - 2 * padding - startTextWidth - endTextWidth;
			var primaryTitleWidth = pen.util.measureTextWidth(this.getTitle(schedule.recordId), fontSize) + padding * 2;
			var iconWidth = style.size.iconNormal + style.size.iconPadding;
			if (isError && remainWidth > iconWidth) primaryTitleWidth += iconWidth;
			if (start) {
				var x = Math.min(rect.x + rect.width - startTextWidth - this.size.cellPaddingLeft, Math.max(rect.x + this.size.cellWidth - startTextWidth - 2 * this.size.cellPaddingLeft, primaryTitleWidth + rect.x));
				startDateConfig = pen.config.text(Object.assign(Object.assign({}, rect), {
					text: start,
					x,
					width: startTextWidth,
					fontSize,
					color: style.color.lightUltraFontColor
				}));
				result.push(startDateConfig);
			}
			if (end) {
				var startWidth = (_a = startDateConfig === null || startDateConfig === void 0 ? void 0 : startDateConfig.width) !== null && _a !== void 0 ? _a : 0;
				if (primaryTitleWidth + startWidth + endTextWidth >= rect.width && startDateConfig) return result;
				var x1 = rect.x + rect.width - endTextWidth;
				var endDateConfig = pen.config.text(Object.assign(Object.assign({}, rect), {
					text: endText,
					x: x1,
					width: endTextWidth,
					fontSize,
					color: style.color.lightUltraFontColor
				}));
				result.push(endDateConfig);
			}
			return result;
		};
		_proto.getTitle = function getTitle(recordId) {
			return getRecordPrimaryTitle(recordId, this.methodHelper);
		};
		_proto.getRangeTexts = function getRangeTexts(schedule, rowIndex) {
			var dateConfig = this.dataUtil.getDateConfig();
			var { start, end } = this.shouldShowDeltaTime;
			if (!dateConfig || !start && !end) return;
			var { startDateFieldId, endDateFieldId } = dateConfig;
			if (!startDateFieldId || !endDateFieldId) return;
			var startTime = this.dataUtil.getOriginTimeByFieldId(schedule.recordId, startDateFieldId);
			var endTime = this.dataUtil.getOriginTimeByFieldId(schedule.recordId, endDateFieldId);
			return this.getStartAndEndText(startTime, endTime, schedule, rowIndex);
		};
		_proto.getStartAndEndText = function getStartAndEndText(startTime, endTime, schedule, rowIndex) {
			var start = startTime === null ? "" : getDayHourText(startTime);
			var end = endTime === null ? "" : getDayHourText(endTime);
			if (schedule.isAcrossWeek && rowIndex !== void 0) {
				var { startRow, endRow } = schedule.layoutRange;
				if (rowIndex === startRow) end = "";
				else if (rowIndex === endRow) start = "";
				else {
					end = "";
					start = "";
				}
			} else {
				var { startColumn, endColumn } = schedule.layoutRange;
				if (startTime && startColumn === endColumn) end = "";
			}
			return {
				start,
				end
			};
		};
		_create_class$4(TimeBarCollector, [{
			key: "methodHelper",
			get: function() {
				var { dataUtil } = this;
				return {
					getPrimaryFieldId: () => dataUtil.getPrimaryFieldId(),
					getDateConfig: () => dataUtil.getDateConfig(),
					getCell: (fieldId, recordId) => dataUtil.getStandardCell(fieldId, recordId)
				};
			}
		}, {
			key: "shouldShowDeltaTime",
			get: function() {
				var dateConfig = this.dataUtil.getDateConfig();
				var result = {
					start: false,
					end: false
				};
				if (!dateConfig) return {
					start: false,
					end: false
				};
				var startDateFieldId = dateConfig === null || dateConfig === void 0 ? void 0 : dateConfig.startDateFieldId;
				var endDateFieldId = dateConfig === null || dateConfig === void 0 ? void 0 : dateConfig.endDateFieldId;
				if (startDateFieldId) {
					var field = this.dataUtil.getFieldByFieldId(startDateFieldId);
					if (field && isDateLikeField(field)) {
						var property = field.getProperty();
						result.start = property ? CALENDAR_TIME_TYPES.includes(property.format) : false;
					}
				}
				if (endDateFieldId) {
					var field1 = this.dataUtil.getFieldByFieldId(endDateFieldId);
					if (field1 && isDateLikeField(field1)) {
						var property1 = field1.getProperty();
						result.end = property1 ? CALENDAR_TIME_TYPES.includes(property1.format) : false;
					}
				}
				return result;
			}
		}]);
		return TimeBarCollector;
	}(import_main$2.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/storage-key.js
var CalendarStorageType;
var init_storage_key = __esmMin((() => {
	(function(CalendarStorageType) {
		CalendarStorageType["SIDE_BAR"] = "CALENDAR_SIDEBAR";
	})(CalendarStorageType || (CalendarStorageType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/data-util.js
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
var DataUtil;
var init_data_util = __esmMin((() => {
	init_event();
	init_esm();
	init_es();
	init_es$1();
	init_storage_key();
	init_data_util$1();
	init_time_util();
	init_storage_sync();
	DataUtil = /* @__PURE__ */ function(BaseCollectorDataUtil) {
		"use strict";
		_inherits$7(DataUtil, BaseCollectorDataUtil);
		function DataUtil(context, status) {
			var _this = BaseCollectorDataUtil.call(this, context) || this;
			_this.context = context;
			_this.status = status;
			_this.onSidebarToggleEmitter = _this._register(new Emitter());
			_this.onSidebarToggle = _this.onSidebarToggleEmitter.event;
			_this.timeUtil = new TimeUtil(_this.context, _this.status);
			_this.setSidebarOpen();
			return _this;
		}
		var _proto = DataUtil.prototype;
		_proto.setSidebarOpen = function setSidebarOpen() {
			if (ua.isMobile) {
				this.sidebarOpen = false;
				return;
			}
			try {
				var isSidebarOpen = getStorageValue(this.context, CalendarStorageType.SIDE_BAR);
				if (!isSidebarOpen) {
					this.sidebarOpen = false;
					return;
				}
				this.sidebarOpen = JSON.parse(isSidebarOpen);
			} catch (err) {
				logger.error(err);
			}
		};
		_proto.toggleSidebarOpen = function toggleSidebarOpen() {
			this.sidebarOpen = !this.sidebarOpen;
			setStorageValue(this.context, CalendarStorageType.SIDE_BAR, JSON.stringify(this.sidebarOpen));
			this.onSidebarToggleEmitter.fire(this.sidebarOpen);
		};
		/**
		* 获取日期配置
		* @param ignorePermission 忽略权限判断, 默认为 false
		*/ _proto.getDateConfig = function getDateConfig(ignorePermission = false) {
			return this.timeUtil.getDateConfig(ignorePermission);
		};
		_proto.getRecordRangeTime = function getRecordRangeTime(recordId) {
			var range = this.timeUtil.getRecordRangeTime(recordId);
			if (!range) return range;
			var [startTime, endTime] = range;
			if (startTime > endTime) return [startTime, startTime];
			return range;
		};
		/**
		* 获取指定时间戳（通常是日历格子对应的「天」）所覆盖的**全部** recordId 列表。
		*
		* 判定口径：`record.rangeTime = [startTime, endTime]` 且 `startTime ≤ timestamp ≤ endTime`。
		* 未配置起止字段（`startDateFieldId` / `endDateFieldId` 均缺失）时视为无有效日期，返回空数组。
		*
		* 该方法此前由 `CalendarView.getDaySchedulesRecordIds` 承载，为便于 view / action / wb 侧宿主等
		* 多处复用，统一下沉到 dataUtil；`CalendarView` 上保留同名薄封装以维持既有对外调用兼容。
		*/ _proto.getDaySchedulesRecordIds = function getDaySchedulesRecordIds(timestamp) {
			var dateConfig = this.getDateConfig();
			var startDateFieldId = dateConfig === null || dateConfig === void 0 ? void 0 : dateConfig.startDateFieldId;
			var endDateFieldId = dateConfig === null || dateConfig === void 0 ? void 0 : dateConfig.endDateFieldId;
			var startDateField = startDateFieldId ? this.getFieldByFieldId(startDateFieldId) : void 0;
			var endDateField = endDateFieldId ? this.getFieldByFieldId(endDateFieldId) : void 0;
			if (!startDateField && !endDateField) return [];
			var schedules = [];
			this.getDisplayedRecordIds().forEach((recordId) => {
				var rangeTime = this.getRecordRangeTime(recordId);
				if (!rangeTime) return;
				var [startTime, endTime] = rangeTime;
				if (timestamp >= startTime && timestamp <= endTime) schedules.push(recordId);
			});
			return schedules;
		};
		_proto.getOriginTimeByField = function getOriginTimeByField(recordId, field) {
			return this.timeUtil.getOriginTimeByField(recordId, field);
		};
		_proto.getOriginTimeByFieldId = function getOriginTimeByFieldId(recordId, fieldId) {
			var field = this.getFieldByFieldId(fieldId);
			if (!field) return null;
			return this.timeUtil.getOriginTimeByField(recordId, field);
		};
		_proto.getStartAndEndOriginTime = function getStartAndEndOriginTime(recordId) {
			var dateConfig = this.getDateConfig();
			if (!dateConfig) return {
				startTime: null,
				endTime: null
			};
			var { startDateFieldId } = dateConfig;
			var { endDateFieldId } = dateConfig;
			return {
				startTime: startDateFieldId ? this.getOriginTimeByFieldId(recordId, startDateFieldId) : null,
				endTime: endDateFieldId ? this.getOriginTimeByFieldId(recordId, endDateFieldId) : null
			};
		};
		_proto.getRenderRoot = function getRenderRoot() {
			return this.context.getRenderRoot();
		};
		/**
		* 获取当前视图的自定义配置
		*/ _proto.getCustomConfig = function getCustomConfig() {
			return this.context.customConfig;
		};
		_create_class$3(DataUtil, [
			{
				key: "isSidebarOpen",
				get: function() {
					return this.sidebarOpen;
				}
			},
			{
				key: "isRowHeightAdaptation",
				get: function() {
					return this.rowHeightLevel === RowHeightLevel.Auto;
				}
			},
			{
				key: "rowHeightLevel",
				get: function() {
					var _a, _b;
					var view = this.getCurrentView();
					return (_b = (_a = view === null || view === void 0 ? void 0 : view.getRowHeightLevel) === null || _a === void 0 ? void 0 : _a.call(view)) !== null && _b !== void 0 ? _b : RowHeightLevel.Auto;
				}
			}
		]);
		return DataUtil;
	}(BaseCollectorDataUtil);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/structure/coordinate-system.js
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
var import_main$1, CoordinateSystem;
var init_coordinate_system = __esmMin((() => {
	init_event();
	import_main$1 = require_main();
	CoordinateSystem = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$6(CoordinateSystem, Disposable);
		function CoordinateSystem() {
			var _this = Disposable.call(this) || this;
			_this.onOffsetChangeEmitter = _this._register(new Emitter());
			_this.offsetY = 0;
			_this.offsetX = 0;
			_this.offsetXBuffer = 0;
			_this.onOffsetChange = _this.onOffsetChangeEmitter.event;
			return _this;
		}
		var _proto = CoordinateSystem.prototype;
		_proto.collect = function collect() {
			if (this.offsetXBuffer <= 0 && this.offsetX !== 0) this.scroll({ x: -this.offsetX });
		};
		_proto.patch = function patch() {
			this.collect();
		};
		/**
		* @description 设置 x 轴可滚动距离
		*/ _proto.setOffsetXBuffer = function setOffsetXBuffer(offsetXBuffer) {
			this.offsetXBuffer = offsetXBuffer;
		};
		_proto.scroll = function scroll(delta) {
			var _a, _b;
			var deltaX = (_a = delta.x) !== null && _a !== void 0 ? _a : 0;
			var deltaY = (_b = delta.y) !== null && _b !== void 0 ? _b : 0;
			if (!deltaX && !deltaY) return;
			var event = {
				offset: {
					x: this.offsetX,
					y: this.offsetY
				},
				delta: {
					x: deltaX,
					y: deltaY
				}
			};
			if (deltaX) {
				var newOffsetX = this.getOffsetXByDelta(deltaX);
				if (newOffsetX !== null) {
					event.offset.x = newOffsetX;
					event.delta.x = newOffsetX - this.offsetX;
					this.offsetX = newOffsetX;
				} else event.delta.x = 0;
			}
			if (deltaY) {
				this.offsetY = this.offsetY + deltaY;
				event.offset.y = this.offsetY;
			}
			this.onOffsetChangeEmitter.fire(event);
		};
		_proto.getOffsetX = function getOffsetX() {
			return this.offsetX;
		};
		_proto.getOffsetY = function getOffsetY() {
			return this.offsetY;
		};
		_proto.getOffsetXByDelta = function getOffsetXByDelta(deltaX) {
			if (!deltaX) return null;
			var { offsetXBuffer } = this;
			if (offsetXBuffer <= 0) {
				if (this.offsetX === 0) return null;
				return 0;
			}
			return Math.max(Math.min(this.offsetX + deltaX, offsetXBuffer), 0);
		};
		return CoordinateSystem;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/utils/fix-day-index.js
/**
* 周日下标变为 6
* 一二三四五六日
* 0123456
* @param day
* @returns
*/ function fixDayIndex(day) {
	return day === 0 ? 6 : day - 1;
}
var init_fix_day_index = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/structure/row.js
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
var import_main, RowCollector;
var init_row = __esmMin((() => {
	init_event();
	import_main = require_main();
	init_constant();
	init_fix_day_index();
	init_format_time();
	RowCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$5(RowCollector, Disposable);
		function RowCollector(coordinateSystem, size, time, dataUtil) {
			var _this = Disposable.call(this) || this;
			_this.coordinateSystem = coordinateSystem;
			_this.size = size;
			_this.time = time;
			_this.dataUtil = dataUtil;
			_this.viewRangeBufferCount = 1;
			_this.viewingRow = 0;
			_this.onRowChangeEmitter = _this._register(new Emitter());
			/**
			* 获取渲染区间
			* @returns
			*/ _this.getRange = () => ({
				startRow: _this.viewingRow - _this.viewRangeBufferCount,
				endRow: _this.endRow + _this.viewRangeBufferCount
			});
			/**
			* 根据时间获取行下标
			* @param time
			*/ _this.getRowIndexByTime = (time) => {
				var mondayTime = toMondayTime(time);
				return _this.time.getDiff(mondayTime, _this.time.getThisMonthTime(), "week");
			};
			_this.handleOffsetChange = (event) => {
				var offsetY = event.offset.y;
				if (offsetY === void 0) return;
				var rowIndex = Math.floor(offsetY / _this.size.cellHeight);
				var { viewingRow } = _this;
				_this.viewingRow = rowIndex;
				if (viewingRow !== rowIndex) _this.onRowChangeEmitter.fire(_this.getRange());
			};
			_this.onRowChange = _this.onRowChangeEmitter.event;
			_this._register(_this.coordinateSystem.onOffsetChange(_this.handleOffsetChange));
			_this._register(_this.size.onCellHeightChangeEvent(_this.toToday.bind(_this)));
			_this.bootstrap();
			return _this;
		}
		var _proto = RowCollector.prototype;
		/**
		* 重置为初始状态
		*/ _proto.toToday = function toToday() {
			var rowIndex = this.getRowIndexByTime(Date.now());
			var newRowIndex;
			if (rowIndex >= this.rowCount) newRowIndex = rowIndex - this.rowCount + 1;
			else newRowIndex = 0;
			this.setOffsetYByRowIndex(newRowIndex);
		};
		/**
		* 上一个月
		*/ _proto.toPrev = function toPrev() {
			var time = this.viewingMonthTime;
			var diff = this.time.getPreMonthDiffWeek(time);
			var newRowIndex = this.viewingRow + diff;
			this.setOffsetYByRowIndex(newRowIndex);
		};
		/**
		* 下一个月
		*/ _proto.toNext = function toNext() {
			var time = this.viewingMonthTime;
			var diff = this.time.getNextMonthDiffWeek(time);
			var newRowIndex = this.viewingRow + diff;
			this.setOffsetYByRowIndex(newRowIndex);
		};
		/**
		* 将起点设置为指定下标
		* @param startRowIndex
		*/ _proto.toStart = function toStart(startRowIndex) {
			this.setOffsetYByRowIndex(startRowIndex);
		};
		/**
		* 根据时间获取列下标
		* @param time
		*/ _proto.getColumnIndexByTime = function getColumnIndexByTime(time) {
			return fixDayIndex(new Date(time).getDay());
		};
		/**
		* 获取格子的 x 坐标
		* @param columnIndex
		* @returns
		*/ _proto.getUnitX = function getUnitX(columnIndex) {
			var { size } = this;
			return size.bodyRect.x + columnIndex * size.cellWidth;
		};
		/**
		* 获取单元格的 rect
		* @param rowIndex
		* @param columnIndex
		* @returns
		*/ _proto.getUnitRect = function getUnitRect(rowIndex, columnIndex) {
			var rowRect = this.getRowRect(rowIndex);
			return Object.assign(Object.assign({}, rowRect), {
				x: this.getUnitX(columnIndex),
				width: this.size.cellWidth
			});
		};
		/**
		* 获取格子的宽度
		* @returns
		*/ _proto.getUnitWidth = function getUnitWidth(columnIndex) {
			return Math.max(this.size.minColumWidth, this.getUnitX(columnIndex + 1) - this.getUnitX(columnIndex));
		};
		/**
		* 获取一行的 rect
		* @param rowIndex
		* @returns
		*/ _proto.getRowRect = function getRowRect(rowIndex) {
			return {
				x: this.getUnitX(0),
				y: this.getRowY(rowIndex),
				width: this.getRowWidth(),
				height: this.getRowHeight()
			};
		};
		/**
		* 获取行的 y 坐标
		* @param rowIndex
		* @returns
		*/ _proto.getRowY = function getRowY(rowIndex) {
			var { size } = this;
			var rowHeight = this.getRowHeight();
			return size.bodyRect.y + rowHeight * rowIndex - this.getOffsetY();
		};
		/**
		* 获取一行的高度
		* @returns
		*/ _proto.getRowHeight = function getRowHeight() {
			return this.size.cellHeight;
		};
		/**
		* 获取一行的宽度
		* @returns
		*/ _proto.getRowWidth = function getRowWidth() {
			return this.size.bodyRect.width;
		};
		/**
		* 获取一行的绘制单元
		* @param rowIndex
		* @returns
		*/ _proto.getRowUnits = function getRowUnits(rowIndex) {
			var units = [];
			for (var dayIndex = 0; dayIndex < 7; dayIndex++) units.push(this.time.getUnitTime(rowIndex, dayIndex));
			return units;
		};
		_proto.getRowIndexByOffsetY = function getRowIndexByOffsetY(offsetY) {
			return Math.floor((offsetY + this.coordinateSystem.getOffsetY() - this.size.bodyRect.y) / this.getRowHeight());
		};
		/**
		* 更新当前区间
		*/ _proto.update = function update() {
			this.updateRange();
		};
		/**
		* @description 月份基准行
		* @readonly
		*/ _proto.getMonthBaseRow = function getMonthBaseRow(rowIndex = this.viewingRow) {
			return rowIndex + 2;
		};
		_proto.getOffsetY = function getOffsetY() {
			return this.coordinateSystem.getOffsetY();
		};
		/**
		* 初始化
		*/ _proto.bootstrap = function bootstrap() {
			this.toToday();
		};
		/**
		* 根据 rowIndex 更新 offset
		*/ _proto.setOffsetYByRowIndex = function setOffsetYByRowIndex(rowIndex) {
			var nowOffsetY = this.getOffsetY();
			var newOffsetY = rowIndex * this.getRowHeight();
			if (newOffsetY === nowOffsetY) return;
			this.coordinateSystem.scroll({ y: newOffsetY - nowOffsetY });
		};
		/**
		* 更新区间
		*/ _proto.updateRange = function updateRange() {
			var viewingRow = Math.floor(this.getOffsetY() / this.getRowHeight());
			if (viewingRow === this.viewingRow) return;
			this.viewingRow = viewingRow;
		};
		_create_class$2(RowCollector, [
			{
				key: "centerRow",
				get: function() {
					var range = this.getRange();
					return Math.round((range.startRow + range.endRow) / 2);
				}
			},
			{
				key: "viewingMonthText",
				get: function() {
					return this.time.getMonthTextByRowIndex(this.getMonthBaseRow());
				}
			},
			{
				key: "viewingMonthTime",
				get: function() {
					return this.time.getTimeByMonthText(this.viewingMonthText);
				}
			},
			{
				key: "rowCount",
				get: function() {
					if (this.dataUtil.isRowHeightAdaptation) return this.size.defaultShowRowCount;
					return Math.floor(this.size.viewRect.height / this.size.cellHeight);
				}
			},
			{
				key: "endRow",
				get: function() {
					return this.viewingRow + this.rowCount;
				}
			}
		]);
		return RowCollector;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/structure/size.js
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
var SizeCollector;
var init_size = __esmMin((() => {
	init_event();
	init_esm();
	init_es$1();
	init_render_app_config();
	init_index_interface$1();
	init_utils$1();
	init_style();
	init_constant();
	init_size$1();
	SizeCollector = /* @__PURE__ */ function(BaseSizeCollector) {
		"use strict";
		_inherits$4(SizeCollector, BaseSizeCollector);
		function SizeCollector(dataUtil, coordinateSystem) {
			var _this = BaseSizeCollector.call(this, dataUtil) || this;
			_this.dataUtil = dataUtil;
			_this.coordinateSystem = coordinateSystem;
			_this.minColumWidth = ua.isMobile ? 45 : 80;
			_this.maxRowHeight = 280;
			_this.minRowHeight = 90;
			_this.defaultSidebarWidth = 240;
			_this.defaultShowRowCount = 5;
			_this.cellPaddingTop = ua.isMobile ? 46 : 36;
			_this.cellPaddingBottom = ua.isMobile ? 18 : 26;
			_this.cellPaddingLeft = ua.isMobile ? 3 : 10;
			_this.cellBottomHeight = ua.isMobile ? 18 : 26;
			_this.timeBarHeight = ua.isMobile ? 18 : 22;
			_this.timeBarMarginTop = ua.isMobile ? 2 : 4;
			_this.timeBarTitlePaddingTop = ua.isMobile ? 4 : 8;
			_this.defaultHeadHeight = 76;
			_this.headItemMargin = 12;
			_this.headButton = {
				paddingTopAndBottom: 2,
				paddingLeftAndRight: 8
			};
			_this.sidebarItemMargin = 12;
			_this.sidebarSchedule = {
				height: 50,
				paddingLeftAndRight: 8,
				paddingTopAndBottom: 12,
				textMarginTopAndBottom: 4
			};
			_this.monthTitlePaddingTop = 5;
			_this.monthTitleFontSize = 22;
			_this.monthTitleFontStyle = "bold";
			_this.dateFontSize = 16;
			_this.iconPadding = 2;
			_this.buttonPadding = 5;
			_this.dragRectWidth = 9;
			_this.cellHeightChangeEmitter = _this._register(new Emitter());
			_this.timeBarCountChangeEmitter = _this._register(new Emitter());
			_this.scale = 1;
			_this.lastCellHeight = _this.cellHeight;
			_this.lastTimeBarCount = _this.maxShowTimeBarCount;
			_this.onCellHeightChangeEvent = _this.cellHeightChangeEmitter.event;
			_this.onTimeBarCountChangeEvent = _this.timeBarCountChangeEmitter.event;
			return _this;
		}
		var _proto = SizeCollector.prototype;
		_proto.patch = function patch() {
			BaseSizeCollector.prototype.patch.call(this);
			if (this.cellHeight !== this.lastCellHeight) {
				this.lastCellHeight = this.cellHeight;
				this.cellHeightChangeEmitter.fire(this.cellHeight);
			}
			if (this.maxShowTimeBarCount !== this.lastTimeBarCount) {
				this.lastTimeBarCount = this.maxShowTimeBarCount;
				this.timeBarCountChangeEmitter.fire();
			}
		};
		_proto.setScale = function setScale() {
			this.scale = 1;
		};
		_create_class$1(SizeCollector, [
			{
				key: "globalPaddingLeft",
				get: function() {
					var { globalPaddingLeft } = this.sizeConfig;
					if (globalPaddingLeft !== void 0) return globalPaddingLeft;
					return ua.isMobile ? 0 : 16;
				}
			},
			{
				key: "globalPaddingRight",
				get: function() {
					var { globalPaddingRight } = this.sizeConfig;
					if (globalPaddingRight !== void 0) return globalPaddingRight;
					return ua.isMobile ? 0 : 16;
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
					var { globalPaddingBottom } = this.sizeConfig;
					if (globalPaddingBottom !== void 0) return globalPaddingBottom;
					return ua.isMobile ? 80 : 0;
				}
			},
			{
				key: "viewRect",
				get: function() {
					return {
						x: this.globalPaddingLeft,
						y: this.globalPaddingTop,
						width: this.globalOriginRootWidth - this.globalPaddingLeft - this.globalPaddingRight,
						height: this.globalOriginRootHeight - this.globalPaddingTop - this.globalPaddingBottom
					};
				}
			},
			{
				key: "bodyRect",
				get: function() {
					var { offsetX } = this;
					return {
						x: this.viewRect.x - offsetX,
						y: this.viewRect.y + this.defaultHeadHeight,
						width: Math.max(this.fullContentWidth, this.viewRect.width) - this.sidebarWidth + 2 * style.size.borderWidth,
						height: ua.isMobile ? this.viewRect.height : this.viewRect.height - this.defaultHeadHeight
					};
				}
			},
			{
				key: "headRect",
				get: function() {
					return Object.assign(Object.assign({}, this.bodyRect), {
						y: this.viewRect.y,
						height: this.defaultHeadHeight
					});
				}
			},
			{
				key: "sidebarWidth",
				get: function() {
					if (!this.dataUtil.isSidebarOpen) return 0;
					var mainWidth = getMainWidth(this.dataUtil.getContext().getId());
					if (mainWidth) {
						var maxSidebarWidth = mainWidth - this.minColumWidth * 7 - 4 * style.size.borderWidth;
						return Math.min(this.defaultSidebarWidth, maxSidebarWidth);
					}
					return this.defaultSidebarWidth;
				}
			},
			{
				key: "sidebarRect",
				get: function() {
					return {
						x: this.bodyRect.x + this.bodyRect.width,
						y: this.viewRect.y,
						width: this.sidebarWidth,
						height: this.viewRect.height
					};
				}
			},
			{
				key: "sidebarBodyRect",
				get: function() {
					return Object.assign(Object.assign({}, this.sidebarRect), {
						y: this.bodyRect.y,
						height: this.bodyRect.height
					});
				}
			},
			{
				key: "sidebarHeadRect",
				get: function() {
					return Object.assign(Object.assign({}, this.sidebarRect), {
						y: this.headRect.y,
						height: this.headRect.height
					});
				}
			},
			{
				key: "cellWidth",
				get: function() {
					return Math.max(this.minColumWidth, Math.ceil(this.bodyRect.width / 7));
				}
			},
			{
				key: "cellHeight",
				get: function() {
					if (this.dataUtil.isRowHeightAdaptation) {
						var cellHeight = Number((this.bodyRect.height / this.defaultShowRowCount).toFixed(3));
						return Math.max(Math.min(cellHeight + style.size.borderWidth, this.maxRowHeight), this.minRowHeight);
					}
					var { rowHeightLevel } = this.dataUtil;
					var timeBarCount = ROW_TIME_BAR_COUNT[rowHeightLevel];
					var timeBarTotalHeight = (this.timeBarHeight + this.timeBarMarginTop) * timeBarCount;
					return this.cellPaddingTop + timeBarTotalHeight + this.cellPaddingBottom;
				}
			},
			{
				key: "fullContentWidth",
				get: function() {
					return this.minColumWidth * 7 + this.sidebarWidth;
				}
			},
			{
				key: "maxShowTimeBarCount",
				get: function() {
					var { cellHeight, cellPaddingTop, cellPaddingBottom, timeBarMarginTop, timeBarHeight } = this;
					var oneTimeBarHeight = timeBarHeight + timeBarMarginTop;
					var availableHeight = cellHeight - cellPaddingTop - cellPaddingBottom + timeBarMarginTop;
					return Math.floor(availableHeight / oneTimeBarHeight);
				}
			},
			{
				key: "offsetXBuffer",
				get: function() {
					return Math.max(0, this.fullContentWidth - this.viewRect.width);
				}
			},
			{
				key: "offsetX",
				get: function() {
					return this.coordinateSystem.getOffsetX();
				}
			},
			{
				key: "offsetY",
				get: function() {
					return this.coordinateSystem.getOffsetY();
				}
			},
			{
				key: "sizeConfig",
				get: function() {
					var _a, _b;
					return (_b = (_a = renderAppConfigService.getConfig()[RenderAppConfigKey.SIZE_CONFIG]) === null || _a === void 0 ? void 0 : _a[ViewType$1.CALENDAR]) !== null && _b !== void 0 ? _b : {};
				}
			}
		]);
		return SizeCollector;
	}(BaseSizeCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/structure/state.js
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
var StateCollector;
var init_state = __esmMin((() => {
	init_state$1();
	StateCollector = /* @__PURE__ */ function(BaseStateCollector) {
		"use strict";
		_inherits$3(StateCollector, BaseStateCollector);
		function StateCollector() {
			var _this = BaseStateCollector.call(this) || this;
			_this.searchHighLightInfos = {
				selectedRecordId: null,
				highlightInfos: { recordIds: /* @__PURE__ */ new Set() },
				isShowSearch: false
			};
			return _this;
		}
		var _proto = StateCollector.prototype;
		_proto.clearHighlight = function clearHighlight() {
			this.searchHighLightInfos.highlightInfos.recordIds.clear();
			this.searchHighLightInfos.selectedRecordId = null;
		};
		/**
		* 设置高亮信息
		* @param {RecordId} recordId
		* @memberof Model
		*/ _proto.setHighlightInfos = function setHighlightInfos(hightLightInfo) {
			this.searchHighLightInfos.highlightInfos.recordIds.add(hightLightInfo.recordId);
		};
		_proto.setHighlightActive = function setHighlightActive(info) {
			this.searchHighLightInfos.highlightInfos.recordIds = info.recordIds;
		};
		/**
		* 获取搜索高亮信息
		* @return {Readonly<HighlightInfo>}
		* @memberof Model
		*/ _proto.getHighlightInfos = function getHighlightInfos() {
			return this.searchHighLightInfos.highlightInfos;
		};
		_proto.setSearchSelectedRecordId = function setSearchSelectedRecordId(recordId) {
			this.searchHighLightInfos.selectedRecordId = recordId;
		};
		_proto.getSearchSelectedRecordId = function getSearchSelectedRecordId() {
			return this.searchHighLightInfos.selectedRecordId;
		};
		return StateCollector;
	}(BaseStateCollector);
})), import_dayjs_min, TimeCollector;
var init_time = __esmMin((() => {
	import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
	require_zh_cn();
	TimeCollector = /* @__PURE__ */ function() {
		"use strict";
		function TimeCollector() {
			this.getThisMonthTime = () => this.thisMonthTime;
			import_dayjs_min.default.locale("zh-cn");
			this.thisMonthTime = this.getTargetMonthBeginTime(Date.now());
		}
		var _proto = TimeCollector.prototype;
		/**
		* @description 获取上个月与当前月份之间的周数
		* @param time
		*/ _proto.getPreMonthDiffWeek = function getPreMonthDiffWeek(time) {
			var currentTime = (0, import_dayjs_min.default)(time).startOf("week").valueOf();
			var preMonthTime = (0, import_dayjs_min.default)(time).add(-1, "month").startOf("month").startOf("week").valueOf();
			return Math.ceil(this.getDiff(preMonthTime, currentTime, "week"));
		};
		/**
		* @description 获取上个月与当前月份之间的周数
		* @param time
		*/ _proto.getNextMonthDiffWeek = function getNextMonthDiffWeek(time) {
			var currentTime = (0, import_dayjs_min.default)(time).startOf("week").valueOf();
			var nextMonthTime = (0, import_dayjs_min.default)(time).add(1, "month").startOf("month").startOf("week").valueOf();
			return Math.ceil(this.getDiff(nextMonthTime, currentTime, "week"));
		};
		/**
		* 获取指定 time 所在月份的第一行的周一的时间（不一定是当前月份）
		* @param time
		*/ _proto.getTargetMonthBeginTime = function getTargetMonthBeginTime(time) {
			return (0, import_dayjs_min.default)(time).startOf("month").startOf("week").valueOf();
		};
		_proto.getTimeByRowIndex = function getTimeByRowIndex(rowIndex) {
			return (0, import_dayjs_min.default)(this.thisMonthTime).add(rowIndex, "week").valueOf();
		};
		_proto.addDays = function addDays(time, dayCount) {
			return (0, import_dayjs_min.default)(time).add(dayCount, "day").valueOf();
		};
		_proto.getDiff = function getDiff(firstTime, secondTime, type) {
			return (0, import_dayjs_min.default)(firstTime).startOf("day").diff(secondTime, type);
		};
		_proto.getUnitTime = function getUnitTime(rowIndex, columnIndex) {
			return this.addDays(this.getTimeByRowIndex(rowIndex), columnIndex);
		};
		_proto.setTimeHourAndMinuteByTime = function setTimeHourAndMinuteByTime(firstTime, secondTime) {
			var hour = (0, import_dayjs_min.default)(secondTime).hour();
			var minute = (0, import_dayjs_min.default)(secondTime).minute();
			return (0, import_dayjs_min.default)(firstTime).hour(hour).minute(minute).valueOf();
		};
		/**
		* @description 是否为月份的起始行
		* @param {number} rowIndex
		* @returns {boolean}
		*/ _proto.isMonthStartRow = function isMonthStartRow(rowIndex) {
			var time = this.getTimeByRowIndex(rowIndex);
			return time === (0, import_dayjs_min.default)(time).endOf("week").startOf("month").startOf("week").valueOf();
		};
		/**
		* @description 根据 rowIndex 获取月份文案
		* @param {number} rowIndex
		* @returns {string}
		*/ _proto.getMonthTextByRowIndex = function getMonthTextByRowIndex(rowIndex) {
			var time = this.getTimeByRowIndex(rowIndex);
			return this.getMonthTextByTime(time);
		};
		/**
		* @description 根据 time 获取月份文案
		* @param {(number | Dayjs)} time
		* @returns {string}
		*/ _proto.getMonthTextByTime = function getMonthTextByTime(time) {
			return (0, import_dayjs_min.default)(time).format("YYYY-MM");
		};
		/**
		* @description 根据月份文案获取时间
		* @param {string} monthText
		* @returns {number}
		*/ _proto.getTimeByMonthText = function getTimeByMonthText(monthText) {
			return (0, import_dayjs_min.default)(monthText).startOf("month").valueOf();
		};
		return TimeCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/index.js
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
var CalendarCollector;
var init_collector = __esmMin((() => {
	init_calculator();
	init_cell();
	init_head();
	init_row_line();
	init_side_bar();
	init_static();
	init_time_bar();
	init_data_util();
	init_coordinate_system();
	init_row();
	init_size();
	init_state();
	init_time();
	init_collector$1();
	CalendarCollector = /* @__PURE__ */ function(BaseCollector) {
		"use strict";
		_inherits$2(CalendarCollector, BaseCollector);
		function CalendarCollector(context, status) {
			var _this = BaseCollector.call(this, context) || this;
			_this.context = context;
			_this.status = status;
			_this.handleCollect = () => {
				_this.size.collect();
				_this.coordinateSystem.setOffsetXBuffer(_this.size.offsetXBuffer);
				_this.coordinateSystem.collect();
				_this.sidebar.collect();
				_this.timeBar.collect();
				_this.cell.collect();
				_this.rowLine.collect();
				_this.head.collect();
				_this.static.collect();
			};
			_this.handleOffsetChange = (event) => {
				var { delta } = event;
				if (!delta.x && !delta.y) return;
				_this.timeBar.applyOffset(delta);
				_this.static.applyOffset(delta);
				_this.head.patch();
				_this.cell.patch();
				_this.rowLine.patch();
				if (delta.x) {
					_this.sidebar.patch();
					_this.head.patch();
				}
			};
			/**
			* @description 处理侧边栏开关
			*/ _this.handleSidebarToggle = () => {
				var { offsetXBuffer, offsetX } = _this.size;
				_this.coordinateSystem.setOffsetXBuffer(_this.size.offsetXBuffer);
				_this.coordinateSystem.scroll({ x: offsetXBuffer - offsetX });
				_this.context.emitter.global.resize.fire();
			};
			_this.dataUtil = _this._register(new DataUtil(_this.context, status));
			_this.time = new TimeCollector();
			_this.state = _this._register(new StateCollector());
			_this.coordinateSystem = _this._register(new CoordinateSystem());
			_this.size = _this._register(new SizeCollector(_this.dataUtil, _this.coordinateSystem));
			_this.row = _this._register(new RowCollector(_this.coordinateSystem, _this.size, _this.time, _this.dataUtil));
			_this.calculator = _this._register(new ScheduleCalculator(_this.size, _this.row, _this.dataUtil));
			_this.rowLine = new RowLineCollector(_this.row);
			_this.static = new StaticCollector(_this.size, _this.dataUtil, _this.row);
			_this.sidebar = _this._register(new SidebarCollector(_this.size, _this.dataUtil, _this.calculator, _this.status));
			_this.head = new HeadCollector(_this.size, _this.time, _this.row, _this.dataUtil, _this.calculator);
			_this.timeBar = _this._register(new TimeBarCollector(_this.size, _this.row, _this.dataUtil, _this.calculator));
			_this.cell = _this._register(new CellCollector(_this.size, _this.row, _this.time, _this.calculator, _this.state, _this.dataUtil));
			_this.registerEvent();
			_this.calculator.collectAllRecords();
			return _this;
		}
		var _proto = CalendarCollector.prototype;
		_proto.handlePatch = function handlePatch(mutations) {
			this.coordinateSystem.setOffsetXBuffer(this.size.offsetXBuffer);
			this.coordinateSystem.collect();
			this.calculator.patch(mutations !== null && mutations !== void 0 ? mutations : []);
			this.size.patch();
			this.sidebar.patch();
			this.cell.patch();
			this.rowLine.patch();
			this.head.patch();
			this.static.collect();
		};
		_proto.handleResize = function handleResize() {
			this.size.patch();
			this.coordinateSystem.setOffsetXBuffer(this.size.offsetXBuffer);
			this.coordinateSystem.patch();
			this.sidebar.patch();
			this.timeBar.patch();
			this.cell.patch();
			this.rowLine.patch();
			this.static.patch();
			this.head.patch();
		};
		/**
		* @description 暴露 coordinateSystem.scroll 方法
		*/ _proto.scroll = function scroll(...parameters) {
			this.coordinateSystem.scroll(...parameters);
		};
		/**
		* @description 监听导致排版变化的事件
		*/ _proto.registerEvent = function registerEvent() {
			this._register(this.coordinateSystem.onOffsetChange((offset) => this.handleOffsetChange(offset)));
			this._register(this.calculator.onScheduleChange(() => this.collect()));
			this._register(this.dataUtil.onSidebarToggle(this.handleSidebarToggle));
			this.onOffsetChange = this.coordinateSystem.onOffsetChange;
		};
		return CalendarCollector;
	}(BaseCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/renderer-model/index.js
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
var CalendarRendererModel;
var init_renderer_model = __esmMin((() => {
	init_event();
	init_range_model();
	init_date_status();
	init_collector();
	init_base_renderer_model();
	init_is_in_rect();
	CalendarRendererModel = /* @__PURE__ */ function(BaseRendererModel) {
		"use strict";
		_inherits$1(CalendarRendererModel, BaseRendererModel);
		function CalendarRendererModel(context) {
			var _this = BaseRendererModel.call(this, context) || this;
			_this.context = context;
			_this.onScheduleChangeEmitter = _this._register(new Emitter());
			_this.onRenderModelChangeEmitter = _this._register(new Emitter());
			_this.onDidChangeViewportRendererDataEmitter = _this._register(new Emitter());
			_this.duration = 300;
			_this.offsetStep = 4;
			_this.stopRaf = null;
			_this.stopTimer = null;
			/**
			* 滚动停止触发
			*/ _this.handleScrollYStop = () => {
				_this.stopTimer = null;
				var { row, size } = _this.collector;
				if (_this.stopRaf) cancelAnimationFrame(_this.stopRaf);
				var { offsetY } = size;
				var nearestRowIndex = Math.round(offsetY / size.cellHeight);
				var nearestRowOffset = row.getRowY(nearestRowIndex) - size.bodyRect.y;
				_this.scrollWithAnimation(nearestRowOffset);
			};
			_this.status = new DateStatus(context.getCurrentTable(), context.getCurrentView(), context.getCore());
			_this.onDidChangeViewportRendererData = _this.onDidChangeViewportRendererDataEmitter.event;
			var activeTable = _this.context.getCurrentTable();
			var activeView = _this.context.getCurrentView();
			_this.rangeModel = _this._register(new RangeModel(activeTable, activeView));
			_this.collector = _this._register(new CalendarCollector(_this.context, _this.status));
			_this.collector.collect();
			_this.onScheduleChange = _this.onScheduleChangeEmitter.event;
			_this.onRenderModelChange = _this.onRenderModelChangeEmitter.event;
			_this._register(_this.collector.calculator.onScheduleChange(() => _this.onScheduleChangeEmitter.fire()));
			_this._register(_this.collector.sidebar.onSidebarScroll(() => _this.onScheduleChangeEmitter.fire()));
			_this._register(_this.collector.sidebar.onSideBarScheduleFilter(() => _this.onScheduleChangeEmitter.fire()));
			_this._register(_this.collector.row.onRowChange(() => _this.onScheduleChangeEmitter.fire()));
			_this._register(_this.collector.onOffsetChange(() => _this.onRenderModelChangeEmitter.fire()));
			return _this;
		}
		var _proto = CalendarRendererModel.prototype;
		_proto.dispose = function dispose(trace) {
			BaseRendererModel.prototype.dispose.call(this, trace);
			if (this.stopTimer) clearTimeout(this.stopTimer);
		};
		_proto.getStatus = function getStatus() {
			return this.status;
		};
		_proto.getRangeModel = function getRangeModel() {
			return this.rangeModel;
		};
		/**
		* @description 滚动到 scrollLeft 位置，⚠️注意与 scrollY 方法区分
		* @param {number} scrollLeft
		* @memberof CalendarRendererModel
		*/ _proto.scrollToX = function scrollToX(scrollLeft) {
			var deltaX = scrollLeft - this.collector.size.offsetX;
			this.scrollX(deltaX);
		};
		/**
		* @description 滚动到 scrollTop 位置，⚠️注意与 scrollX 方法区分
		* @param {number} scrollTop
		* @memberof CalendarRendererModel
		*/ _proto.scrollToY = function scrollToY(scrollTop) {
			var deltaY = scrollTop - this.collector.size.offsetY;
			this.scrollY(deltaY);
		};
		/**
		* @description 滚动 offsetX 距离，⚠️注意与 scrollToX 方法区分
		* @param {number} offsetX
		* @memberof CalendarRendererModel
		*/ _proto.scrollX = function scrollX(offsetX) {
			this.collector.scroll({ x: offsetX });
		};
		/**
		* @description 滚动 offsetY 距离，⚠️注意与 scrollToY 方法区分
		* @param {number} offsetY
		* @memberof CalendarRendererModel
		*/ _proto.scrollY = function scrollY(offsetY) {
			this.collector.scroll({ y: offsetY });
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			var { deltaX, deltaY, offsetX, offsetY } = scrollInfo;
			if (deltaY && isHitRect(offsetX, offsetY, this.collector.size.sidebarBodyRect)) {
				var { sidebar } = this.collector;
				sidebar.setScrollTop(sidebar.getScrollTop() + deltaY);
				return;
			}
			if (deltaX) this.context.emitter.service.calendarHorizontalScroll.fire(offsetX);
			this.collector.scroll({
				x: deltaX,
				y: deltaY
			});
			if (deltaY) this.handleScrollYBegin();
		};
		_proto.handleModelChange = function handleModelChange(mutations) {
			this.collector.patch(mutations);
			this.onDidChangeViewportRendererDataEmitter.fire();
		};
		_proto.handleScrollYBegin = function handleScrollYBegin() {
			if (this.stopTimer) clearTimeout(this.stopTimer);
			this.stopTimer = setTimeout(this.handleScrollYStop, this.duration);
		};
		_proto.scrollWithAnimation = function scrollWithAnimation(offset) {
			var doAnimation = (offset) => {
				var step = Math.round(offset / 3);
				if (Math.abs(step) <= 1) {
					this.scrollY(offset);
					return;
				}
				this.scrollY(step);
				this.stopRaf = requestAnimationFrame(() => doAnimation(offset - step));
			};
			doAnimation(offset);
		};
		return CalendarRendererModel;
	}(BaseRendererModel);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/index.js
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
var CalendarView;
var init_calendar = __esmMin((() => {
	init_esm();
	init_es$1();
	init_utils$1();
	init_event_handler();
	init_cell_active();
	init_entries$1();
	init_entries();
	init_renderer();
	init_renderer_model();
	init_canvas_view();
	init_is_in_rect();
	CalendarView = /* @__PURE__ */ function(BaseCanvasView) {
		"use strict";
		_inherits(CalendarView, BaseCanvasView);
		function CalendarView(context) {
			var _this = BaseCanvasView.call(this, context) || this;
			_this.hideCalendarCellActive = () => {
				var _a;
				return (_a = _this.getFeature(ICalendarCellActive)) === null || _a === void 0 ? void 0 : _a.hide();
			};
			_this.initFeatures();
			return _this;
		}
		var _proto = CalendarView.prototype;
		_proto.getType = function getType() {
			return ViewType$1.CALENDAR;
		};
		_proto.beforeExport = function beforeExport() {
			BaseCanvasView.prototype.beforeExport.call(this);
			return true;
		};
		_proto.initFeatures = function initFeatures() {
			(ua.isPC ? getPcFeatures() : getMobileFeatures()).forEach((featureOption) => this.installFeature(featureOption));
		};
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.renderer.getFeatureLayer();
		};
		_proto.getRangeModel = function getRangeModel() {
			return this.rendererModel.getRangeModel();
		};
		_proto.scrollToX = function scrollToX(scrollLeft) {
			this.rendererModel.scrollToX(scrollLeft);
		};
		_proto.scrollToY = function scrollToY(scrollTop) {
			this.rendererModel.scrollToY(scrollTop);
		};
		_proto.getViewRect = function getViewRect() {
			return this.collector.size.viewRect;
		};
		_proto.updateSidebarFeature = function updateSidebarFeature() {
			var { collector } = this;
			return collector.sidebar.collect();
		};
		_proto.getSidebarContentItemRect = function getSidebarContentItemRect(index) {
			var { collector } = this;
			var { sidebar } = collector;
			return Object.assign(Object.assign({}, sidebar.getRecord(0).rect), { y: sidebar.scheduleListRect.y + index * sidebar.oneScheduleHeight });
		};
		_proto.scrollSidebarToOffsetY = function scrollSidebarToOffsetY(offsetY, callback) {
			var { collector } = this;
			var { sidebar } = collector;
			sidebar.scrollToTopWidthAnimation(offsetY, callback);
		};
		_proto.getSidebarScheduleListRect = function getSidebarScheduleListRect() {
			var { collector } = this;
			var { sidebar } = collector;
			return sidebar.scheduleListRect;
		};
		_proto.getSidebarOffset = function getSidebarOffset() {
			var { collector } = this;
			var { sidebar } = collector;
			return sidebar.getScrollTop();
		};
		_proto.getScheduleByRecordId = function getScheduleByRecordId(recordId) {
			return this.collector.calculator.getSchedules().get(recordId);
		};
		_proto.getUnSchedulesWithSortIndex = function getUnSchedulesWithSortIndex(recordId) {
			return this.collector.calculator.getUnSchedules().indexOf(recordId);
		};
		_proto.getUnSchedulesWithSort = function getUnSchedulesWithSort() {
			return this.collector.calculator.getUnSchedules();
		};
		_proto.canInsertRecord = function canInsertRecord() {
			return this.getStatus().canInsertRecord;
		};
		_proto.getDaySchedulesRecordIds = function getDaySchedulesRecordIds(timestamp) {
			return this.collector.dataUtil.getDaySchedulesRecordIds(timestamp);
		};
		_proto.getDateConfig = function getDateConfig() {
			return this.collector.dataUtil.getDateConfig();
		};
		_proto.getTarget = function getTarget(evtOffsetX, evtOffsetY) {
			return getCalendarTarget({
				x: evtOffsetX,
				y: evtOffsetY
			}, this.collector);
		};
		/**
		* 获取日历日程的矩形
		* @returns Rect
		*/ _proto.getScheduleRect = function getScheduleRect(line, outOfRange = false) {
			var { row } = this.collector;
			var { rowIndex, startColumn, endColumn, index } = line;
			var { startRow, endRow } = row.getRange();
			if (!outOfRange) {
				if (rowIndex < startRow || rowIndex > endRow) return null;
				if (index > this.collector.size.maxShowTimeBarCount - 1) return null;
			}
			var { cellPaddingTop, timeBarHeight, timeBarMarginTop } = this.collector.size;
			var lineY = cellPaddingTop + index * (timeBarHeight + timeBarMarginTop);
			var unitStartX = row.getUnitX(startColumn);
			var width = row.getUnitX(endColumn + 1) - unitStartX;
			return {
				x: unitStartX,
				y: row.getRowY(rowIndex) + lineY,
				width,
				height: timeBarHeight
			};
		};
		_proto.getSidebarHeaderArea = function getSidebarHeaderArea() {
			return this.collector.size.sidebarHeadRect;
		};
		_proto.filterByKeyword = function filterByKeyword(value) {
			return this.collector.sidebar.filterByKeyword(value);
		};
		_proto.getSearchState = function getSearchState() {
			return this.collector.state.searchHighLightInfos.isShowSearch;
		};
		_proto.getCalendarHighlightInfos = function getCalendarHighlightInfos() {
			return this.collector.state.getHighlightInfos();
		};
		_proto.getSearchSelectedRecordId = function getSearchSelectedRecordId() {
			return this.collector.state.getSearchSelectedRecordId();
		};
		_proto.setSearchSelectedRecordId = function setSearchSelectedRecordId(recordId) {
			this.collector.state.setSearchSelectedRecordId(recordId);
		};
		_proto.hasInUnSchedules = function hasInUnSchedules(recordId) {
			return this.collector.calculator.getUnSchedules().includes(recordId);
		};
		_proto.getRowIndexByTime = function getRowIndexByTime(time) {
			return this.collector.row.getRowIndexByTime(time);
		};
		_proto.getRowHeight = function getRowHeight(_rowIndex) {
			return this.collector.row.getRowHeight();
		};
		_proto.getActivityRect = function getActivityRect() {
			var { viewRect } = this.collector.size;
			return {
				activityStartX: viewRect.x,
				activityStartY: viewRect.y,
				activityViewWidth: viewRect.width,
				activityViewHeight: viewRect.height
			};
		};
		/**
		* 截取缩略图
		*/ _proto.getPreviewTplRect = function getPreviewTplRect() {
			var _a;
			var clientRect = this.getTableDescRect();
			var x = this.globalPaddingLeft;
			var y = ((_a = clientRect === null || clientRect === void 0 ? void 0 : clientRect.y) !== null && _a !== void 0 ? _a : 0) + this.globalPaddingTop;
			var { height } = clientRect;
			return {
				x,
				y,
				width: 0,
				height
			};
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			this.rendererModel.scrollByDelta(Object.assign(Object.assign({}, scrollInfo), {
				deltaX: scrollInfo.deltaX ? this.useFactor(scrollInfo.deltaX) : 0,
				deltaY: scrollInfo.deltaY ? this.useFactor(scrollInfo.deltaY) : 0
			}));
		};
		_proto.createRendererModel = function createRendererModel() {
			return new CalendarRendererModel(this.context);
		};
		_proto.createRenderer = function createRenderer() {
			return new CalendarRenderer(this.rendererModel, this.context.getRenderRoot());
		};
		_proto.useOuterVerticalScroll = function useOuterVerticalScroll(scrollInfo) {
			var _a;
			if (!((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll)) return false;
			var { deltaY, offsetX, offsetY } = scrollInfo;
			if (deltaY && isHitRect(offsetX, offsetY, this.collector.size.sidebarBodyRect)) return false;
			return true;
		};
		_proto.useFactor = function useFactor(delta) {
			return Math.ceil(delta / this.scrollFactor);
		};
		_create_class(CalendarView, [{
			key: "scrollFactor",
			get: function() {
				var _a, _b;
				return (_b = (_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.scrollerFactor) !== null && _b !== void 0 ? _b : 1.5;
			}
		}]);
		return CalendarView;
	}(BaseCanvasView);
}));
//#endregion
export { init_calendar as n, CalendarView as t };
