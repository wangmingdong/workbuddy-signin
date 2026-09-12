import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event } from "./esm-cVQVEiWG.js";
import { $l as init_es, $u as dom, Kc as isLinkField, Vl as ViewType, Xu as domainConfig, Yu as logger, _o as isUserField, dn as normalizeLeafChildrenToRecordIds, ql as FieldType, un as isFormattedTreeNode, uu as slicePush, wd as i18n } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { B as init_feature_single, E as wbColors, F as init_scroller, H as pen, I as init_register_esc_to_cancel, J as init_config$1, K as init_lib, L as registerEscToCancel, M as BaseRenderer, N as init_base_renderer, P as CommonScroller, R as BaseFeature, T as init_color, U as init_resources, V as init_pen, Y as Level, _ as WB_SOURCE_FIELD_TITLE, a as BaseCollector, b as shouldShowGroupAddButton, c as init_state$1, d as getStorageValue, et as init_is_in_rect, f as init_storage_sync$1, g as WB_SOURCE_DEFAULT_VISIBLE_VALUES, h as init_data_util$1, ht as getCheckboxIconAlias, i as init_base_renderer_model, l as BaseSizeCollector, m as BaseCollectorDataUtil, n as init_canvas_view, nt as FeatureUIEvent, o as init_collector$1, ot as Cursor, p as setStorageValue, pt as NormalIconAlias, q as DrawType, r as BaseRendererModel, rt as init_feature_event, s as BaseStateCollector, st as init_cursor, t as BaseCanvasView, tt as isHitRect, u as init_size$1, v as WbSharedConfig, vt as init_style, y as init_wb_config, yt as style, z as FeatureAuth } from "./canvas-view-DDuMsrmC.js";
import { S as init_field_collector, _ as ensureRelativeTimePlugin, a as SYS_STATUS_FIELD_TITLE, b as init_avatar_time_utils, c as collectTagsPillsInRect, d as getWbSpecialMeasureFieldType, f as init_wb_cell, g as resolveTagsCellItems, i as SYS_PRIORITY_FIELD_TITLE, l as collectWbSpecialCell, m as isWbSpecialField, n as init_auto_scroll$1, o as SYS_TAGS_FIELD_TITLE, p as isSameTagPillHit, r as BODY_TAG_PILL_GEOMETRY, s as collectBodyTag, t as AutoScroll, u as formatFieldTooltipLabel, v as formatRelativeTime, x as fieldCollector, y as getDateCellFullText } from "./auto-scroll-Cn43Kqkt.js";
import { a as runGroupTree, c as RowType, l as init_interface$6, n as init_storage_sync$2, o as init_string_group_path, r as init_run_group, s as stringifyGroupPath, t as StorageSync } from "./storage-sync-CZ5zDwyE.js";
import { r as init_config$2, t as getDefaultContentCollectConfig } from "./config-DWNn7aqz.js";
import { S as makeHoverTooltipDisposable, _ as collectStatusText, a as collectRichGroupValue, b as HoverTooltipController, c as collectGroupKeyDecoration, d as mapGroupValueToDisplayTitle, f as resolveGroupHeadTitle, g as collectRelativeTimeText, h as collectAvatarGroup, i as init_batch_selection, l as getGroupValueText, m as applyAvatarSlotsFieldTitlePrefix, n as readCellText, o as init_group_value_rich, p as resolveGroupKeyConf, r as BatchSelection, s as applyGroupTextMap, t as init_source_field, u as init_group_key_config, v as init_bottom_collectors, x as init_hover_tooltip_controller, y as measureRelativeTimeSlotWidth } from "./source-field-zJ5uL8Af.js";
import { t as require_lodash } from "./lodash-CQINZbUj.js";
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/common/auto-scroll/interface.js
var IListAutoScroll;
var init_interface$5 = __esmMin((() => {
	init_module();
	IListAutoScroll = createDecorator("IListAutoScroll");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/list-feature.js
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
var ListFeatureBase;
var init_list_feature = __esmMin((() => {
	init_feature_single();
	ListFeatureBase = /* @__PURE__ */ function(BaseFeature) {
		"use strict";
		_inherits$17(ListFeatureBase, BaseFeature);
		function ListFeatureBase() {
			return BaseFeature.apply(this, arguments) || this;
		}
		_create_class$5(ListFeatureBase, [
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
			}
		]);
		return ListFeatureBase;
	}(BaseFeature);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/common/auto-scroll/main.js
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
var ListAutoScroll;
var init_main$6 = __esmMin((() => {
	init_auto_scroll$1();
	init_list_feature();
	ListAutoScroll = /* @__PURE__ */ function(ListFeatureBase) {
		"use strict";
		_inherits$16(ListAutoScroll, ListFeatureBase);
		function ListAutoScroll() {
			return ListFeatureBase.apply(this, arguments) || this;
		}
		var _proto = ListAutoScroll.prototype;
		_proto.bootstrap = function bootstrap() {
			this.autoScroll = this._register(new AutoScroll({
				scrollToX: () => {},
				scrollToY: (scrollY) => this.renderer.scrollToY(scrollY),
				getRoot: () => this.root,
				getScrollLeft: () => 0,
				getScrollTop: () => this.collector.range.scrollTop,
				getScale: () => this.collector.size.scale,
				getBoundRect: () => {
					var { size } = this.collector;
					return {
						left: 0,
						right: size.rootWidth,
						top: 0,
						bottom: size.rootHeight
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
		return ListAutoScroll;
	}(ListFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/common/auto-scroll/index.js
var init_auto_scroll = __esmMin((() => {
	init_interface$5();
	init_main$6();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/common/storage-sync/interface.js
var IListStorageSync;
var init_interface$4 = __esmMin((() => {
	init_module();
	IListStorageSync = createDecorator("IListStorageSync");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/common/storage-sync/main.js
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
var ListStorageSync;
var init_main$5 = __esmMin((() => {
	init_storage_sync$2();
	ListStorageSync = /* @__PURE__ */ function(StorageSync) {
		"use strict";
		_inherits$15(ListStorageSync, StorageSync);
		function ListStorageSync() {
			var _this = StorageSync.apply(this, arguments) || this;
			_this.syncToStorage = () => {
				_this.renderer.collector.state.saveState();
			};
			return _this;
		}
		_create_class$4(ListStorageSync, [{
			key: "UIEvent",
			get: function() {
				return this.renderer.UIEvent;
			}
		}]);
		return ListStorageSync;
	}(StorageSync);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/common/storage-sync/index.js
var init_storage_sync = __esmMin((() => {
	init_interface$4();
	init_main$5();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/hover/interface.js
var IListHover;
var init_interface$3 = __esmMin((() => {
	init_module();
	IListHover = createDecorator("IListHover");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/placeholder-record.js
/**
* 生成 placeholder recordId
* @param status 分组匹配值（如 'pending' / 'running' / 'paused' / 'done'）
*/ function makePlaceholderRecordId(status) {
	return `${PLACEHOLDER_RECORD_PREFIX}${status}`;
}
/** 判断给定 recordId 是否是 placeholder */ function isPlaceholderRecordId(recordId) {
	return typeof recordId === "string" && recordId.startsWith("__list_placeholder__:");
}
/**
* 从 placeholder recordId 中解析出 status（分组匹配值）
*
* 若传入的不是 placeholder recordId，返回空字符串。
*/ function parsePlaceholderStatus(recordId) {
	if (!isPlaceholderRecordId(recordId)) return "";
	return recordId.slice(PLACEHOLDER_RECORD_PREFIX.length);
}
var PLACEHOLDER_RECORD_PREFIX;
var init_placeholder_record = __esmMin((() => {
	PLACEHOLDER_RECORD_PREFIX = "__list_placeholder__:";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/hover/main.js
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
var EMPTY_STATE, FADE_IN_STEP, ListHover;
var init_main$4 = __esmMin((() => {
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_cursor();
	init_is_in_rect();
	init_list_feature();
	init_interface$3();
	init_placeholder_record();
	init_wb_cell();
	EMPTY_STATE = {
		kind: "none",
		key: ""
	};
	FADE_IN_STEP = .15;
	ListHover = /* @__PURE__ */ function(ListFeatureBase) {
		"use strict";
		_inherits$14(ListHover, ListFeatureBase);
		function ListHover() {
			var _this = ListFeatureBase.apply(this, arguments) || this;
			_this.hoverGroup = null;
			_this.state = EMPTY_STATE;
			_this.fadeRaf = null;
			/**
			* 「右键菜单激活 record」flag：非 null 时，视觉上把 hover 反馈持续画在该 record 上，无视
			* 鼠标是否离开 canvas / 是否移到其它行。
			*
			* 生命周期完全在 hover feature 内部闭环，业务侧无需感知：
			*
			* **置位**：record 行背景 rect 上的 `onMouseUpWithRight` 触发时（用户在该行按下右键，
			* 宿主随即会弹出右键菜单）。placeholder record 不参与置位。
			*
			* **清除通道**（任一触发即清并 reapply）：
			* 1. `UIEvent.stage.onMouseDown`：stage 层的 mousedown 仅在**非右键**点击时 fire —— 右键
			*    会被 stage 改写为 `mousedownWithRight` 走另一通道。这条通道覆盖"用户点回表格 canvas"。
			* 2. `UIEvent.document.onMouseDownCapture`（capture 阶段）：覆盖"点 canvas 外任何 DOM"
			*    （含菜单项、菜单外空白、页面其它区域）。**例外**：若 mousedown target（或其祖先）是
			*    文本输入类控件（`<input>` 非按钮 type / `<textarea>` / `[contenteditable]` / `<select>`），
			*    跳过 —— 右键菜单里可能存在需要获焦的输入框，点它不应关菜单也不应清 hover。
			*    通过 `closest()` 覆盖大部分包裹层场景；label 外置等极少数边界仍会误清，可接受。
			* 3. `document.keydown ESC`：ESC 是关菜单的标准键位。`UIEvent.document` 未暴露 keydown
			*    通道，直接用 `dom.addDisposableListener` 挂原生监听。
			*
			* 上述监听全部在 bootstrap 常驻订阅，入口通过 `if (!activeId) return` 短路 —— 避免维护
			* 按需挂载 / 解除的生命周期，也与项目其它 feature 事件订阅风格保持一致。
			*
			* 生效路径：
			* - `onMouseMove`：命中的 recordId ≠ activeId 时短路（不 reapply、不清空），但仍更新
			*   lastHoverTarget，供清 flag 后无缝恢复到鼠标当前位置；
			* - `onMouseLeave`：直接短路，保留当前视觉；
			* - `onScroll` / `render`：以 activeId 的最新 rowRect（从 content collector 反查）
			*   重画，保证滚动 / patch 后视觉仍锁在正确位置；
			* - activeId 不在可见集合（滚出视口 / 数据被删）：默默降级为无 hover，但不清 flag，
			*   等下一次清除通道触发时统一收敛。
			*/ _this.rightMenuActiveRecordId = null;
			/**
			* 最近一次 mousemove 是否命中 record 行内"实际单元格内容"（leftConfigs /
			* rightConfigs / selectedCheckbox 任一 DrawConfig 的 bbox 内）。
			*
			* 用途：`onRecordBodyClick` 短路 —— 仅在命中实际内容时 fire `onRecordClick`，行内字段间空白
			* 区域不触发。判定放在 mousemove 阶段是因为：
			* 1) FeatureUIEvent 在 mousemove 提供 stage 内坐标 (evt.x, evt.y)，可直接与 DrawConfig 的全局
			*    坐标做命中（仅需加 scrollTop）；onClick 收到的是浏览器原生 MouseEvent，复算坐标需要重做
			*    `(clientX - container.left) / scale`，与 stage 内部逻辑重复一份；
			* 2) 状态稳定到下一次 mousemove 才会更新，覆盖"鼠标停在原位 → 点击"的常规交互；
			* 3) onScroll / 切换 record / 离开 stage 时随 lastHoverTarget 一并清空，不会跨上下文残留。
			*/ _this.lastHoverHitRecordContent = false;
			/**
			* 由 parentApi.render() 调用：底层数据/几何变化后重画 hover 反馈。
			*
			* 不能简单 clearHover —— 鼠标若未移动，stage 不会再 fire mousemove，hoverGroup 上的 onMouseUp handler
			* 也丢失了，导致同位连续点击失效（典型场景：checkbox 点击触发 render，下次点击无反应）。
			* 这里基于 lastHoverTarget 重新 resolve + apply，相当于模拟"鼠标仍在原位 hover"。
			*/ _this.render = () => {
				var _a;
				(_a = _this.hoverGroup) === null || _a === void 0 || _a.setAttrs(_this.collector.size.globalRect);
				if (_this.isPreventFromOtherFeature()) {
					_this.lastHoverTarget = void 0;
					_this.clearHover();
					return;
				}
				if (_this.rightMenuActiveRecordId) {
					var activeTarget = _this.buildActiveRecordTarget(_this.rightMenuActiveRecordId);
					var next = activeTarget ? _this.resolveState(activeTarget) : EMPTY_STATE;
					_this.applyState(next, activeTarget);
					return;
				}
				var target = _this.lastHoverTarget;
				var next1 = target ? _this.resolveState(target) : EMPTY_STATE;
				_this.applyState(next1, target);
			};
			_this.onMouseMove = (evt) => {
				if (_this.isPreventFromOtherFeature()) {
					_this.resetHoverCaches();
					_this.clearHover();
					return;
				}
				_this.lastHoverTarget = evt.target;
				_this.lastHoverHitRecordContent = _this.isHitRecordContent(evt.target, evt.x, evt.y);
				var prevCellHitKey = _this.combinedCellHitKey();
				_this.lastHoverStatusIconHit = _this.resolveCellHit(evt.target, evt.x, evt.y, "statusIcon");
				_this.lastHoverOwnerAvatarHit = _this.resolveCellHit(evt.target, evt.x, evt.y, "ownerAvatar");
				_this.lastHoverTagPillHit = _this.resolveTagPillHit(evt.target, evt.x, evt.y);
				var nextCellHitKey = _this.combinedCellHitKey();
				if (_this.rightMenuActiveRecordId) return;
				var next = _this.resolveState(evt.target);
				if (next.key === _this.state.key) {
					if ((next.kind === "recordRow" || next.kind === "checkbox") && prevCellHitKey !== nextCellHitKey) _this.applyState(next, evt.target);
					return;
				}
				_this.applyState(next, evt.target);
			};
			_this.onMouseLeave = () => {
				if (_this.rightMenuActiveRecordId) return;
				_this.resetHoverCaches();
				_this.clearHover();
			};
			_this.onScroll = () => {
				_this.resetHoverCaches();
				if (_this.rightMenuActiveRecordId) return;
				_this.clearHover();
			};
			/**
			* stage 层左键 / 中键 mousedown（右键已被 stage 改写为 mousedownWithRight 走另一通道，
			* 这里不会收到）：用户点回表格 canvas → 清除激活态。
			*/ _this.onStageMouseDown = () => {
				_this.clearRightMenuActive();
			};
			/**
			* 清除激活态：清 flag + 用 lastHoverTarget 重解一次 hover。
			*
			* 幂等：flag 未置位时直接返回，不重复 apply —— document 层监听常驻订阅时靠这一步短路。
			*/ _this.clearRightMenuActive = () => {
				if (!_this.rightMenuActiveRecordId) return;
				_this.rightMenuActiveRecordId = null;
				var target = _this.lastHoverTarget;
				var next = target ? _this.resolveState(target) : EMPTY_STATE;
				_this.applyState(next, target);
			};
			/**
			* document 层 mousedown（capture 阶段）：覆盖"点 canvas 外任何 DOM"。
			*
			* 短路顺序：
			* 1. flag 未置位 → 直接返回（无激活态时零成本）；
			* 2. 判定"点击是否属于要保留 hover 的输入类交互"：target 或其祖先命中以下选择器则跳过。
			*    `<input>` 排除按钮类 type（button/submit/reset/checkbox/radio/image/file/color/range/hidden），
			*    这些类型的 input 语义上是"点击执行"，与文本输入无关，应作为普通点击清 flag。
			*/ _this.onDocumentMouseDownCapture = (evt) => {
				if (!_this.rightMenuActiveRecordId) return;
				var target = evt.event.target;
				if (target instanceof Element) {
					if (target.closest("input:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"image\"]):not([type=\"file\"]):not([type=\"color\"]):not([type=\"range\"]):not([type=\"hidden\"]),textarea,select,[contenteditable=\"true\"],[contenteditable=\"\"]")) return;
				}
				_this.clearRightMenuActive();
			};
			/**
			* document 层 keydown（capture 阶段）：ESC 关菜单信号。
			* 未激活时短路，避免对全局键盘交互产生任何副作用。
			*/ _this.onDocumentKeyDown = (event) => {
				if (!_this.rightMenuActiveRecordId) return;
				if (event.key === "Escape") _this.clearRightMenuActive();
			};
			return _this;
		}
		var _proto = ListHover.prototype;
		_proto.bootstrap = function bootstrap() {
			this.hoverGroup = pen.group(Object.assign(Object.assign({}, this.collector.size.globalRect), { batch: true }));
			this.layer.addGroup(this.hoverGroup);
			this._register(this.UIEvent.stage.onMouseMove(this.onMouseMove));
			this._register(this.UIEvent.stage.onMouseLeave(this.onMouseLeave));
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMouseDown));
			this._register(this.collector.range.onScroll(this.onScroll));
			this._register({ dispose: () => this.cancelFade() });
			this._register(this.UIEvent.document.onMouseDownCapture(this.onDocumentMouseDownCapture));
			this._register(dom.addDisposableListener(document, "keydown", this.onDocumentKeyDown, true));
		};
		/**
		* 由 record 行背景 rect 的 `onMouseUpWithRight` 调用：把激活 recordId 置为该行，立即重画。
		*
		* placeholder record 不参与右键激活（直接 return，不置 flag）；行背景的 `onMouseUpWithRight`
		* 也在 `drawRecordHover` 里被跳过挂载 —— 这里的判断是双保险。
		*
		* 多次连续右键点不同行：直接切换到新 recordId。document 层监听在 bootstrap 已常驻订阅。
		*/ _proto.activateRightMenu = function activateRightMenu(recordId) {
			if (!recordId || isPlaceholderRecordId(recordId)) return;
			if (this.rightMenuActiveRecordId === recordId) {
				var activeTarget = this.buildActiveRecordTarget(recordId);
				var next = activeTarget ? this.resolveState(activeTarget) : EMPTY_STATE;
				this.applyState(next, activeTarget);
				return;
			}
			this.rightMenuActiveRecordId = recordId;
			var activeTarget1 = this.buildActiveRecordTarget(recordId);
			var next1 = activeTarget1 ? this.resolveState(activeTarget1) : EMPTY_STATE;
			this.applyState(next1, activeTarget1);
		};
		/**
		* 用 activeRecordId 从 content collector 的可见集合反查最新 rowRect，合成一个可复用现有
		* `applyState` / `drawRecordHover` 绘制路径的伪 ListTarget（stage 视口坐标）。
		*
		* 关键点：
		* - `RecordRenderInfo.rowRect` 是全局坐标（未扣 scrollTop），与 event-handler 中 `hitRecord`
		*   的转换保持一致：`y - scrollTop` 得到 stage 视口坐标；
		* - 只填 `isRecordRow` / `recordId` / `recordRowRenderRect` / `checkboxRenderRect`：
		*   足够走 `resolveState → recordRow` 分支 + `drawRecordHover` 常规绘制；`isCheckbox` 保持
		*   `false` 让状态稳定为 `recordRow`（不因激活误进 checkbox 状态而画额外描边）；
		* - 找不到（record 滚出视口 / 被删）：返回 undefined，上层 render() 自然降级为空 hover。
		*/ _proto.buildActiveRecordTarget = function buildActiveRecordTarget(recordId) {
			var info = this.collector.content.getRecordRenderInfo(recordId);
			if (!(info === null || info === void 0 ? void 0 : info.rowRect)) return void 0;
			var { size, range } = this.collector;
			var rowRect = {
				x: info.rowRect.x,
				y: info.rowRect.y - range.scrollTop,
				width: info.rowRect.width,
				height: info.rowRect.height
			};
			return {
				isOutStage: false,
				isBlank: false,
				isRecordRow: true,
				recordId,
				recordRowRenderRect: rowRect,
				checkboxRenderRect: {
					x: rowRect.x + size.checkboxPaddingLeft,
					y: rowRect.y + (rowRect.height - size.checkboxSize) / 2,
					width: size.checkboxSize,
					height: size.checkboxSize
				}
			};
		};
		/**
		* 重置所有 hover 相关的命中缓存。在「锁定 / 离开 stage / 滚动」三处必须同步清空，
		* 避免缓存的命中态跨上下文残留（导致 cursor / hit rect 错位）。
		*/ _proto.resetHoverCaches = function resetHoverCaches() {
			this.lastHoverTarget = void 0;
			this.lastHoverHitRecordContent = false;
			this.lastHoverStatusIconHit = void 0;
			this.lastHoverOwnerAvatarHit = void 0;
			this.lastHoverTagPillHit = void 0;
		};
		_proto.clearHover = function clearHover() {
			if (this.state.kind === "none") return;
			this.applyState(EMPTY_STATE);
		};
		_proto.resolveState = function resolveState(t) {
			if (!t || t.isOutStage) return EMPTY_STATE;
			if (t.isFoldBtn && t.foldBtnRenderRect) return {
				kind: "foldBtn",
				key: `foldBtn:${t.groupIndex}`
			};
			if (t.isSelectAllBtn && t.selectAllRenderRect) return {
				kind: "selectAll",
				key: `selectAll:${t.groupIndex}`
			};
			if (t.isGroupAddBtn && t.groupAddRenderRect) return {
				kind: "groupAdd",
				key: `groupAdd:${t.groupIndex}`
			};
			if (t.isGroupHead && t.recordRowRenderRect) return {
				kind: "groupHead",
				key: `groupHead:${t.groupIndex}`
			};
			if (t.isCheckbox && t.checkboxRenderRect && t.recordId) {
				if (isPlaceholderRecordId(t.recordId)) return t.recordRowRenderRect ? {
					kind: "recordRow",
					key: `row:${t.recordId}`
				} : EMPTY_STATE;
				return {
					kind: "checkbox",
					key: `checkbox:${t.recordId}`
				};
			}
			if (t.isRecordRow && t.recordRowRenderRect && t.recordId) return {
				kind: "recordRow",
				key: `row:${t.recordId}`
			};
			return EMPTY_STATE;
		};
		_proto.applyState = function applyState(next, target) {
			var sameKey = next.key !== "" && next.key === this.state.key;
			var sameGroup = this.isSameGroupHover(this.state, next);
			this.state = next;
			if (!this.hoverGroup) return;
			this.cancelFade();
			this.hoverGroup.clear();
			this.applyHoverGroupBounds(next.kind);
			if (next.kind === "foldBtn" && (target === null || target === void 0 ? void 0 : target.foldBtnRenderRect)) {
				var rect = target.foldBtnRenderRect;
				var drawer = (opacity) => {
					if (target.recordRowRenderRect) this.drawGroupHeadHover(target.recordRowRenderRect, 1, target);
					this.drawFoldBtnHover(rect, opacity, target);
				};
				if (sameKey || sameGroup) drawer(1);
				else this.runFadeIn(drawer);
			} else if (next.kind === "groupAdd" && (target === null || target === void 0 ? void 0 : target.groupAddRenderRect) && target.groupPath) {
				var rect1 = target.groupAddRenderRect;
				var { groupPath } = target;
				var drawer1 = (opacity) => {
					if (target.recordRowRenderRect) this.drawGroupHeadHover(target.recordRowRenderRect, 1, target);
					this.drawGroupAddHover(rect1, groupPath, opacity);
				};
				if (sameKey || sameGroup) drawer1(1);
				else this.runFadeIn(drawer1);
			} else if (next.kind === "selectAll" && (target === null || target === void 0 ? void 0 : target.selectAllRenderRect) && target.groupPath) {
				this.drawSelectAllHover(target.selectAllRenderRect, target.groupPath);
				this.setCursor(Cursor.POINTER);
			} else if (next.kind === "groupHead" && (target === null || target === void 0 ? void 0 : target.recordRowRenderRect)) {
				var rect2 = target.recordRowRenderRect;
				if (sameKey || sameGroup) this.drawGroupHeadHover(rect2, 1, target);
				else {
					var drawer2 = (opacity) => this.drawGroupHeadHover(rect2, opacity, target);
					this.runFadeIn(drawer2);
				}
				this.setCursor(Cursor.DEFAULT);
			} else if ((next.kind === "recordRow" || next.kind === "checkbox") && (target === null || target === void 0 ? void 0 : target.recordRowRenderRect) && target.recordId) {
				this.drawRecordHover(target);
				if (next.kind === "recordRow") {
					var isPlaceholderRow = (target === null || target === void 0 ? void 0 : target.recordId) && isPlaceholderRecordId(target.recordId);
					var tagPillHit = this.lastHoverTagPillHit;
					var shouldPoint = isPlaceholderRow || this.lastHoverStatusIconHit || this.lastHoverOwnerAvatarHit || tagPillHit && !this.collector.state.isSourceFieldId(tagPillHit.fieldId);
					this.setCursor(shouldPoint ? Cursor.POINTER : Cursor.DEFAULT);
				}
			} else this.setCursor(Cursor.DEFAULT);
		};
		/** 判断两个 HoverState 是否属于同一个 GroupHead 行（groupHead / foldBtn / groupAdd 共享同一行）。 */ _proto.isSameGroupHover = function isSameGroupHover(prev, next) {
			var GROUP_KINDS = new Set([
				"groupHead",
				"foldBtn",
				"groupAdd"
			]);
			if (!GROUP_KINDS.has(prev.kind) || !GROUP_KINDS.has(next.kind)) return false;
			var prevIdx = prev.key.split(":")[1];
			var nextIdx = next.key.split(":")[1];
			return prevIdx !== void 0 && prevIdx === nextIdx;
		};
		/**
		* 根据当前 hover 类型与 sticky head 状态，计算并应用 hoverGroup 自身的几何范围。
		*
		* 仅 record/checkbox 会因为 sticky head 视觉遮挡而需要顶部裁剪；其余类型（foldBtn/groupAdd/none）
		* 一律还原到 globalRect 以避免 sticky head 上的反馈被裁。
		*/ _proto.applyHoverGroupBounds = function applyHoverGroupBounds(kind) {
			if (!this.hoverGroup) return;
			var { size } = this.collector;
			var global = size.globalRect;
			if (kind !== "recordRow" && kind !== "checkbox") {
				this.hoverGroup.setAttrs(global);
				return;
			}
			var sticky = this.parentApi.getStickyHead();
			var stickyBottom = sticky.index >= 0 ? Math.max(0, sticky.offsetY + size.groupHeadHeight) : 0;
			if (stickyBottom <= 0) {
				this.hoverGroup.setAttrs(global);
				return;
			}
			this.hoverGroup.setAttrs({
				x: global.x,
				y: global.y + stickyBottom,
				width: global.width,
				height: Math.max(0, global.height - stickyBottom)
			});
		};
		_proto.runFadeIn = function runFadeIn(draw) {
			var opacity = 0;
			var tick = () => {
				this.fadeRaf = null;
				if (!this.hoverGroup) return;
				opacity = Math.min(1, Math.floor((opacity + FADE_IN_STEP) * 100) / 100);
				this.hoverGroup.clear();
				draw(opacity);
				if (opacity < 1) this.fadeRaf = requestAnimationFrame(tick);
			};
			this.fadeRaf = requestAnimationFrame(tick);
		};
		_proto.cancelFade = function cancelFade() {
			if (this.fadeRaf !== null) {
				cancelAnimationFrame(this.fadeRaf);
				this.fadeRaf = null;
			}
		};
		_proto.drawFoldBtnHover = function drawFoldBtnHover(rect, opacity, target) {
			var _a;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.hoverBackground,
				borderRadius: Math.min(rect.width, rect.height) / 2,
				opacity,
				onMouseUp: (event, stopPropagation) => {
					if (!(target === null || target === void 0 ? void 0 : target.groupPath)) return;
					stopPropagation === null || stopPropagation === void 0 || stopPropagation();
					this.collector.state.toggleGroupFold(target.groupPath);
					this.collector.rows.patch();
					this.collector.range.patch();
					this.collector.content.patch();
					this.parentApi.render();
				}
			})));
		};
		_proto.drawGroupAddHover = function drawGroupAddHover(rect, groupPath, opacity) {
			var _a;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.hoverBackground,
				borderRadius: Math.min(rect.width, rect.height) / 2,
				opacity,
				onMouseUp: (event, stopPropagation) => {
					stopPropagation === null || stopPropagation === void 0 || stopPropagation();
					this.emitter.wbService.onGroupAddClick.fire({ groupPath });
				}
			})));
		};
		/**
		* GroupHead 行 hover：整行叠浅色 hoverBackground，与 record 行 hover 视觉对齐。
		*
		* 承接整行折叠：点击行任意位置（除加号 / 全选文字按钮 / foldBtn 各自的 hit rect，
		* 它们通过 stopPropagation 拦截）都触发 toggleGroupFold，与点 foldBtn 完全同款。
		* hit rect 与 foldBtn / groupAdd / selectAll 位于同一 hoverGroup 内，后 add 的按钮
		* rect 命中优先级更高，只要按钮 handler stopPropagation 就不会走到这里。
		*/ _proto.drawGroupHeadHover = function drawGroupHeadHover(rect, opacity, target) {
			var _a;
			var { size } = this.collector;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.hoverBackground,
				borderRadius: size.headBgRadius,
				opacity,
				onMouseUp: (_event) => {
					if (!(target === null || target === void 0 ? void 0 : target.groupPath)) return;
					this.collector.state.toggleGroupFold(target.groupPath);
					this.collector.rows.patch();
					this.collector.range.patch();
					this.collector.content.patch();
					this.parentApi.render();
				}
			})));
		};
		/**
		* 「全选/取消全选」hover：与 kanban-todo 同款。
		* 视觉规范要求不绘制 hover 背景（文字本身用 cardActiveBorder 颜色区分），但仍需一层透明 rect 承接 onClick——
		* 纯文字 DrawConfig 的可点区域是文字 bbox，可能与 selectAllRect 不一致且会被同 group 其它 hover 层级覆盖。
		* 点击后：切换该分组（含子孙叶子分组）所有 record 的选中态 → fire onRecordSelectChange → 重收集可见区域 + 重绘。
		*
		* 入参 `path` 直接来自 target.groupPath（外层 / 叶子层都用同一份 path 表达），
		* state 内部按"路径前缀"聚合所有子孙叶子分组的 recordIds，因此最外层分组的全选也能覆盖全部子孙 records。
		*/ _proto.drawSelectAllHover = function drawSelectAllHover(rect, path) {
			var _a;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				opacity: 1,
				onMouseUp: (_event) => {
					var isAllSelected = this.collector.state.isGroupAllSelected(path);
					this.collector.state.selectAllInGroup(path, !isAllSelected);
					this.emitter.wbService.onRecordSelectChange.fire(this.collector.state.getSelectedRecordIds());
					this.collector.content.collectVisibleWithHeads();
					this.parentApi.render();
				}
			})));
		};
		/**
		* Record hover：
		* - 整行浅色 hoverBackground（已选中态由 content collector 绘制 selectionBackground，hover 时叠加更深一档）；
		* - 行最左侧绘制未选中态 checkbox（已选中态由 content collector 收集了 CHECKBOX_CHECK_GREEN）；
		* - 点击：checkbox 区域走 toggleRecordSelected，其它区域走 onRecordClick；
		* - sticky GroupHead 视觉占据顶部一块区域，会覆盖滚到此处的 Record；hover 绘制由 hoverGroup 自身的
		*   几何范围（applyHoverGroupBounds 中收缩到 stickyBottom 之下）通过 canvas clip 自动裁掉，
		*   不在此处再做坐标级裁剪，否则 onMouseUp 命中区会被错位破坏。
		*/ _proto.drawRecordHover = function drawRecordHover(target) {
			var _a, _b, _c, _d, _e;
			if (!target.recordRowRenderRect || !target.recordId) return;
			var rect = target.recordRowRenderRect;
			var { recordId } = target;
			var { size, state } = this.collector;
			var isPlaceholder = isPlaceholderRecordId(recordId);
			var isSelected = !isPlaceholder && state.isRecordSelected(recordId);
			var onRightUp = isPlaceholder ? void 0 : () => this.activateRightMenu(recordId);
			if (!isSelected) (_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.hoverBackground,
				borderRadius: size.recordBgRadius,
				opacity: 1,
				onMouseUp: (event) => this.onRecordBodyClick(event, target),
				onMouseUpWithRight: onRightUp
			})));
			else (_b = this.hoverGroup) === null || _b === void 0 || _b.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				opacity: 1,
				onMouseUp: (event) => this.onRecordBodyClick(event, target),
				onMouseUpWithRight: onRightUp
			})));
			if (isPlaceholder) return;
			var cbX = rect.x + size.checkboxPaddingLeft;
			var cbY = rect.y + (rect.height - size.checkboxSize) / 2;
			var isBatchMode = state.isBatchSelectMode();
			if (!isSelected && !isBatchMode) {
				var cbRect = {
					x: cbX,
					y: cbY,
					width: size.checkboxSize,
					height: size.checkboxSize
				};
				(_c = this.hoverGroup) === null || _c === void 0 || _c.add(pen.config.icon(getCheckboxIconAlias(false), Object.assign(Object.assign({}, cbRect), { onMouseUp: (event, stopPropagation) => {
					var _a;
					stopPropagation === null || stopPropagation === void 0 || stopPropagation();
					this.handleCheckboxClick(recordId, (_a = event === null || event === void 0 ? void 0 : event.shiftKey) !== null && _a !== void 0 ? _a : false);
				} })));
				if (this.state.kind === "checkbox") {
					var svgIconPadding = 3;
					(_d = this.hoverGroup) === null || _d === void 0 || _d.add(pen.config.rect({
						x: cbRect.x + svgIconPadding,
						y: cbRect.y + svgIconPadding,
						width: cbRect.width - svgIconPadding * 2,
						height: cbRect.height - svgIconPadding * 2,
						borderColor: style.color.strongBorderColor,
						borderRadius: 2
					}));
				}
			} else (_e = this.hoverGroup) === null || _e === void 0 || _e.add(pen.config.rect({
				x: cbX,
				y: cbY,
				width: size.checkboxSize,
				height: size.checkboxSize,
				opacity: 1,
				onMouseUp: (event, stopPropagation) => {
					var _a;
					stopPropagation === null || stopPropagation === void 0 || stopPropagation();
					this.handleCheckboxClick(recordId, (_a = event === null || event === void 0 ? void 0 : event.shiftKey) !== null && _a !== void 0 ? _a : false);
				}
			}));
			var info = this.collector.content.getRecordRenderInfo(recordId);
			if ((info === null || info === void 0 ? void 0 : info.statusIconRect) && info.statusIconFieldId) this.addCellHitRect(info.statusIconRect, recordId, info.statusIconFieldId, 10);
			if ((info === null || info === void 0 ? void 0 : info.ownerAvatarRect) && info.ownerAvatarFieldId) this.addCellHitRect(info.ownerAvatarRect, recordId, info.ownerAvatarFieldId, 0);
			if (info === null || info === void 0 ? void 0 : info.bodyTagPillRects) this.addTagPillHitRects(info.bodyTagPillRects, recordId);
		};
		/**
		* 在 hoverGroup 上叠一层覆盖 `cellRect` 的透明 hit rect，承接 onMouseUp：
		* - 停止冒泡，避免命中行背景的 `onRecordBodyClick` 把 `onRecordClick` 用「无 fieldId」再 fire 一次；
		* - fire `onRecordClick` 带 fieldId + cellRect。cellRect 为 stage 视口坐标系（y 已扣 scrollTop），
		*   与 grid 单元格点击同语义；`offsetX` 用于历史兼容（status icon 需要锚点偏移 10px 让浮层挂在 icon 右侧）。
		*
		* 抽出来给 status icon + owner 头像组复用，避免两段几乎相同的 fire 块漂移。
		*
		* ⚠️ 坐标系：入参 `rect` 来自 RecordRenderInfo（statusIconRect / ownerAvatarRect），是**全局坐标**
		* （未扣 scrollTop，详见 content.ts 中相应字段注释）。而 `hoverGroup` 是 stage 视口坐标系
		* （hit rect 的 onMouseUp 派发也按 stage 视口坐标匹配 mouse 位置）。
		* 因此画 hit rect 前必须先把 y 扣 scrollTop 转换到 stage 视口坐标系，
		* 否则有垂直滚动时 hit rect 会画到屏幕下方（甚至屏幕外），鼠标点击 icon 时不命中 hit rect，
		* 冒泡到行背景的 `onRecordBodyClick` 后 fire 的 `onRecordClick` 不带 cellRect / fieldId。
		* （cursor 升级 POINTER 走的是 `resolveCellHit` —— 用全局坐标 `absY = stageY + scrollTop` 命中
		* 全局坐标的 rect，自身正确，所以会出现「鼠标手势是 pointer 但点击丢 cellRect」的不一致现象。）
		*/ _proto.addCellHitRect = function addCellHitRect(rect, recordId, fieldId, offsetX) {
			var _a;
			var scrollTop = this.collector.range.scrollTop;
			var stageRect = {
				x: rect.x,
				y: rect.y - scrollTop,
				width: rect.width,
				height: rect.height
			};
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, stageRect), {
				opacity: 1,
				onMouseUp: (event, stopPropagation) => {
					stopPropagation === null || stopPropagation === void 0 || stopPropagation();
					this.emitter.wbService.onRecordClick.fire({
						recordId,
						fieldId,
						cellRect: {
							x: stageRect.x + offsetX,
							y: stageRect.y,
							width: stageRect.width,
							height: stageRect.height
						}
					});
				}
			})));
		};
		/**
		* Record body 点击：仅当鼠标当前停在"实际单元格内容"上时 fire `onRecordClick`。
		*
		* - checkbox 命中由 checkbox 自己的 onMouseUp 通过 stopPropagation 拦截，不会冒泡到这里；
		* - 行内字段之间 / 行两端的纯空白区域（`!lastHoverHitRecordContent`）按"未点到内容"处理直接 return，
		*   与「点击空白处不触发 Record 点击事件」的语义对齐；
		* - 命中信息由 `onMouseMove` 同步算好（复用 stage 坐标 evt.x/y + scrollTop 与 RecordRenderInfo
		*   里 leftConfigs / rightConfigs / selectedCheckbox 的真实 bbox 做命中），
		*   onMouseUp 这里只消费缓存值，避免在原生 MouseEvent 上重算 stage 坐标。
		*/ _proto.onRecordBodyClick = function onRecordBodyClick(event, target) {
			if (!target.recordId) return;
			if (isPlaceholderRecordId(target.recordId)) {
				var status = parsePlaceholderStatus(target.recordId);
				if (status) this.emitter.wbService.onGroupAddClick.fire({ groupPath: [status] });
				return;
			}
			if (target.isRecordLeftGutter) return;
			this.emitter.wbService.onRecordClick.fire({ recordId: target.recordId });
		};
		/**
		* 判定 (stageX, stageY) 是否落在 record 行内指定可点击单元格（status icon / owner 头像组）
		* 的视觉 rect 上；命中则返回 { rect, fieldId }。
		*
		* 与 `isHitRecordContent` 同款坐标转换：DrawConfig 的 y 为全局坐标（未扣 scrollTop），mousemove
		* 提供 stage 内坐标，因此 `absY = stageY + scrollTop`。
		*
		* 仅 `isRecordRow + 对应 rect + 对应 fieldId` 三者齐备时才视为命中候选；缺任一返回 undefined，
		* 状态机 cursor 自然落回默认指针。
		*
		* status icon 与 owner 头像组的处理完全对称，抽到同一方法里只在末尾按 kind 取不同字段，
		* 避免两份几乎一致的实现漂移。
		*/ _proto.resolveCellHit = function resolveCellHit(target, stageX, stageY, kind) {
			if (!(target === null || target === void 0 ? void 0 : target.isRecordRow) || !target.recordId) return void 0;
			var info = this.collector.content.getRecordRenderInfo(target.recordId);
			if (!info) return void 0;
			var rect;
			var fieldId;
			if (kind === "statusIcon") {
				rect = info.statusIconRect;
				fieldId = info.statusIconFieldId;
			} else {
				rect = info.ownerAvatarRect;
				fieldId = info.ownerAvatarFieldId;
			}
			if (!rect || !fieldId) return void 0;
			if (!isHitRect(stageX, stageY + this.collector.range.scrollTop, rect)) return void 0;
			return {
				rect,
				fieldId
			};
		};
		/**
		* 把单个命中信息序列化成稳定 key（无命中 → 空串），用于 mousemove 时判断"命中态是否切换"。
		*/ _proto.cellHitKey = function cellHitKey(hit) {
			if (!hit) return "";
			return `${hit.fieldId}:${hit.rect.x},${hit.rect.y},${hit.rect.width},${hit.rect.height}`;
		};
		/**
		* 把 status icon + owner 头像两路命中信息合成一个稳定 key，用于"两路任一切换就 reapply"。
		* 仅在 key 变化时触发 reapplyState，避免同 record 内每次 mousemove 都全量重画 hover。
		*/ _proto.combinedCellHitKey = function combinedCellHitKey() {
			return `${this.cellHitKey(this.lastHoverStatusIconHit)}|${this.cellHitKey(this.lastHoverOwnerAvatarHit)}|${this.cellHitKey(this.lastHoverTagPillHit)}`;
		};
		/**
		* 判定 (stageX, stageY) 是否落在 record 行内 body 区标签组某颗 pill 上；命中则返回 `{ rect, fieldId }`。
		*
		* 坐标语境与 `resolveCellHit` 一致：pill rect 为全局坐标（未扣 scrollTop），mousemove 提供 stage 内坐标，
		* 因此 `absY = stageY + scrollTop`。
		*
		* 遍历 `info.bodyTagPillRects`，命中第一颗即返回（pill 不重叠，无需优先级排序）。
		*/ _proto.resolveTagPillHit = function resolveTagPillHit(target, stageX, stageY) {
			var _a;
			if (!(target === null || target === void 0 ? void 0 : target.isRecordRow) || !target.recordId) return void 0;
			var info = this.collector.content.getRecordRenderInfo(target.recordId);
			if (!((_a = info === null || info === void 0 ? void 0 : info.bodyTagPillRects) === null || _a === void 0 ? void 0 : _a.length)) return void 0;
			var absY = stageY + this.collector.range.scrollTop;
			for (var pill of info.bodyTagPillRects) if (isHitRect(stageX, absY, pill.rect)) return {
				rect: pill.rect,
				fieldId: pill.fieldId
			};
		};
		/**
		* 在 hoverGroup 上为 body 区标签组每颗 pill 绘制透明 hit rect 承接点击 + hover 反馈。
		*
		* 与 `addCellHitRect` 同款坐标转换（全局坐标 → stage 视口坐标），并在当前 mousemove 命中的
		* pill 上叠一层 hoverBackground 圆角矩形作为视觉反馈。
		*/ _proto.addTagPillHitRects = function addTagPillHitRects(pillRects, recordId) {
			var _this, _loop = function(pill) {
				var stageRect = {
					x: pill.rect.x,
					y: pill.rect.y - scrollTop,
					width: pill.rect.width,
					height: pill.rect.height
				};
				var isHover = isSameTagPillHit(hoveredHit, pill);
				var pillFieldId = pill.fieldId;
				var isSource = _this.collector.state.isSourceFieldId(pillFieldId);
				if (isHover && !isSource) (_a = _this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, stageRect), {
					background: style.color.hoverBackground,
					borderRadius: stageRect.height / 2,
					opacity: 1
				})));
				(_b = _this.hoverGroup) === null || _b === void 0 || _b.add(pen.config.rect(Object.assign(Object.assign({}, stageRect), {
					opacity: 1,
					onMouseUp: (event, stopPropagation) => {
						stopPropagation === null || stopPropagation === void 0 || stopPropagation();
						_this.emitter.wbService.onRecordClick.fire(isSource ? { recordId } : {
							recordId,
							fieldId: pillFieldId,
							cellRect: Object.assign({}, stageRect)
						});
					}
				})));
			};
			var _a, _b;
			var scrollTop = this.collector.range.scrollTop;
			var hoveredHit = this.lastHoverTagPillHit;
			for (var pill of pillRects) _this = this, _loop(pill);
		};
		/**
		* 判定 (stageX, stageY) 是否落在 record 行内任一实际绘制内容（leftConfigs /
		* rightConfigs / selectedCheckbox）的视觉 bbox 内.
		*
		* 坐标语境：DrawConfig 的 (x, y) 是画布全局坐标（未扣 scrollTop），mousemove 提供的 (evt.x, evt.y)
		* 是 stage 内坐标，因此命中前把 stageY 还原到全局 `absY = stageY + scrollTop`。
		*
		* 文本类（Text）特殊处理：cfg.width/height 是字段**容器**几何（例如 Title 字段固定 386 宽，无论文字
		* 多短都铺满容器），直接用容器 bbox 命中会把字段内的视觉空白也算成命中（出现"行内左字段右侧空白
		* 也触发卡片点击"的 bug）。Text 提供了 `layouts: { x, y, width, height, text }[]`，是按字符排版后
		* 的实际占用区段（x/y 相对 cfg），这里改用 layouts 联合命中，更贴近视觉感知。
		*
		* 其它类型（Bitmap / Rect / Polygon / Corner）的容器 bbox ≈ 视觉 bbox（icon 满铺；rect 本身是绘制
		* 体），继续整体 bbox 命中。
		*
		* 仅在命中 record 行（非 checkbox）时才有意义；其它命中情况一律返回 false。
		*/ _proto.isHitRecordContent = function isHitRecordContent(target, stageX, stageY) {
			if (!(target === null || target === void 0 ? void 0 : target.isRecordRow) || !target.recordId) return false;
			var info = this.collector.content.getRecordRenderInfo(target.recordId);
			if (!info) return false;
			var absY = stageY + this.collector.range.scrollTop;
			var hits = (configs) => {
				if (!(configs === null || configs === void 0 ? void 0 : configs.length)) return false;
				for (var cfg of configs) if (this.hitDrawConfig(cfg, stageX, absY)) return true;
				return false;
			};
			if (hits(info.leftConfigs)) return true;
			if (hits(info.rightConfigs)) return true;
			if (info.selectedCheckbox && this.hitDrawConfig(info.selectedCheckbox, stageX, absY)) return true;
			return false;
		};
		/**
		* 单个 DrawConfig 的命中判定。
		*
		* - Text：用 `layouts` 联合命中（每个 layout 是「相对 cfg 偏移 + 行宽高」的真实文字 bbox）。
		*   layouts 缺失（理论不应发生）回退用容器 bbox，至少不丢命中；
		* - 其它类型：用容器 bbox（cfg.x/y/width/height）。LineConfig 无 width/height，由 toRect 守卫返回 null。
		*/ _proto.hitDrawConfig = function hitDrawConfig(cfg, x, y) {
			var _a;
			if (cfg.type === "Text") {
				var text = cfg;
				if ((_a = text.layouts) === null || _a === void 0 ? void 0 : _a.length) {
					for (var layout of text.layouts) if (layout.width > 0 && layout.height > 0 && isHitRect(x, y, {
						x: text.x + layout.x,
						y: text.y + layout.y,
						width: layout.width,
						height: layout.height
					})) return true;
					return false;
				}
			}
			var rect = this.toRect(cfg);
			return Boolean(rect && isHitRect(x, y, rect));
		};
		/**
		* 把任意 DrawConfig 还原成命中用的 Rect。
		*
		* 大多数 DrawConfig（Bitmap / Text / Rect / Polygon / Corner）都从 BaseConfig extends Rect，自带
		* x/y/width/height；唯一例外是 LineConfig（用 points 表达几何，无 width/height）。record 行的内容
		* 收集逻辑里（content collector 的 leftConfigs / rightConfigs / selectedCheckbox）
		* 产出的都是字段渲染产物，目前不会出现 Line —— 这里仍做 falsy 守卫，避免类型层 union 漏掉时静默命中失败。
		*/ _proto.toRect = function toRect(cfg) {
			var rect = cfg;
			if (typeof rect.x !== "number" || typeof rect.y !== "number") return null;
			if (typeof rect.width !== "number" || typeof rect.height !== "number") return null;
			if (rect.width <= 0 || rect.height <= 0) return null;
			return {
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height
			};
		};
		/**
		* 处理 checkbox 点选（支持 shift + 点选的连续选中 / 连续取消，跨分组）。
		*
		* shift + 点击（存在锚点且与当前 record 不同）：锚点始终保持不变，依据"当前 record 是否已选中"
		* 决定扩选还是缩选（详见 `RowCollector.getShiftSelectionChange`）：
		* - 目标未选中 → 扩选：把「锚点 → 目标」按 record 收集顺序（跨分组、跳过折叠分组与 placeholder）
		*   的整段置为选中；
		* - 目标已选中 → 缩选：保留「锚点 → 目标」，把目标之外、沿"背离锚点方向"紧邻且连续的选中段取消。
		*   例：锚点 record10，当前 10~20 选中，shift 点 record15 → 取消 16~20；再 shift 点 record5 →
		*   将 5~10 选中（11~15 保持），最终选中 5~15。
		* 端点缺失 / 不在可见有序序列中（分组折叠、record 已删）时退化为普通点击；缩选无可回收项时为
		* no-op（不改锚点、不翻转目标）。
		*
		* 普通点击：翻转当前 record 选中态，并把连续选中锚点更新为当前 record。
		*/ _proto.handleCheckboxClick = function handleCheckboxClick(recordId, shiftKey) {
			var { state, rows } = this.collector;
			var anchorId = state.getSelectAnchorRecordId();
			if (shiftKey && anchorId && anchorId !== recordId) {
				var change = rows.getShiftSelectionChange(anchorId, recordId, (id) => state.isRecordSelected(id));
				if (change) {
					if (change.recordIds.length) {
						state.setRecordsSelected(change.recordIds, change.select);
						this.afterRecordSelectChange();
					}
					return;
				}
			}
			state.toggleRecordSelected(recordId);
			state.setSelectAnchorRecordId(recordId);
			this.afterRecordSelectChange();
		};
		/**
		* 选中集合变化后的统一副作用：fire 事件 → 重收集可见内容 → 重绘。
		*
		* 选中态翻转影响：
		* 1) record 的 selectedBg / selectedCheckbox；
		* 2) 批量模式下，所属分组的 isAllSelected → head 右侧「全选/取消全选」文案翻转。
		* 因此 head 缓存也需要同步刷新。
		*/ _proto.afterRecordSelectChange = function afterRecordSelectChange() {
			this.emitter.wbService.onRecordSelectChange.fire(this.collector.state.getSelectedRecordIds());
			this.collector.content.collectVisibleWithHeads();
			this.parentApi.render();
		};
		/**
		* 是否被其它 feature 锁住（典型：拖动垂直滚动条期间 ListScroller 高优先级锁）。
		* 用于在交互入口短路，避免拖动滚动条时表格里再触发行/checkbox hover 反馈。
		*/ _proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IListHover);
		};
		return ListHover;
	}(ListFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/record-move/interface.js
var IListRecordMove;
var init_interface$2 = __esmMin((() => {
	init_module();
	IListRecordMove = createDecorator("IListRecordMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/record-move/util.js
/**
* 计算某个记录间隙 (prev, next) 下的候选新父深度区间。
*
* @param prevRecordId    间隙上一条 record id（禁止继承时应传 undefined）
* @param nextRecordId    间隙下一条 record id（禁止继承时应传 undefined）
* @param allowSubTreeInherit 是否允许从 prev/next 继承父子链
* @param collector
*/ function computeDropParentDepthRange(prevRecordId, nextRecordId, allowSubTreeInherit, collector) {
	if (!allowSubTreeInherit) return {
		lowerDepth: 0,
		upperDepth: 0
	};
	var prevLevel = getRecordLevel(prevRecordId, collector);
	var nextLevel = getRecordLevel(nextRecordId, collector);
	return {
		lowerDepth: nextRecordId !== void 0 && nextLevel !== void 0 ? nextLevel : 0,
		upperDepth: prevRecordId !== void 0 && prevLevel !== void 0 ? prevLevel + 1 : 0
	};
}
/**
* 根据用户指定的"目标父深度"和落点前后 record，反查目标父 record id。
*
* 反查规则（与 {@link DropParentDepthRange} 语义一致：upperDepth = prev.level + 1）：
* - `targetDepth === 0`：目标父 = null（顶层）；
* - 优先用 prev 侧反查（祖先链完整）：
*   - `targetDepth === level(prev) + 1` → 新父 = prev 本身（成为 prev 的最后一个子）；
*   - `targetDepth <= level(prev)` → 从 prev 沿祖先链回退到深度 = `targetDepth - 1` 的祖先
*     （例如 prev=a3(L1)、targetDepth=1 → 新父 = a3.parent = a）。
* - prev 侧未命中时用 next 侧回退（少见分支，仅在 lowerDepth 单点区间且 prev 缺失时用）；
*
* 环检查（自身/后代作为父）交由 `isDescendantOrSelf` 在 apply 阶段兜底，这里只做几何反查。
*/ function resolveTargetParentIdByDepth(targetDepth, prevRecordId, nextRecordId, collector) {
	if (targetDepth <= 0) return null;
	var viaPrev = resolveTargetParentByPrev(targetDepth, prevRecordId, collector);
	if (viaPrev !== void 0) return viaPrev;
	return resolveTargetParentByNext(targetDepth, nextRecordId, collector);
}
/**
* 从 `prev` 侧反查目标父：
* - 返回 `undefined` 表示 prev 缺失或深度超出 prev 侧可反查范围（调用方需回退到 next 侧）。
* - 返回 `RecordId | null` 表示命中。
*
* 分支：
* - `targetDepth === prevLevel + 1` → 新父 = prev 本身（作 prev 的子）。与 `computeDropParentDepthRange`
*   的 `upperDepth = prev.level + 1` 严格对应。
* - `targetDepth <= prevLevel` → 深度 D 的祖先在 `ancestorIds[prevLevel - D]`（ancestorIds[0] 是 prev
*   的直接父）。
*/ function resolveTargetParentByPrev(targetDepth, prevRecordId, collector) {
	var _a, _b;
	if (!prevRecordId) return void 0;
	var prevMeta = collector.dataUtil.getSubTreeRowMeta(prevRecordId);
	var prevLevel = (_a = prevMeta === null || prevMeta === void 0 ? void 0 : prevMeta.level) !== null && _a !== void 0 ? _a : 0;
	if (targetDepth === prevLevel + 1) return prevRecordId;
	if (targetDepth <= prevLevel && prevMeta) return (_b = prevMeta.ancestorIds[prevLevel - targetDepth]) !== null && _b !== void 0 ? _b : null;
}
/**
* 从 `next` 侧反查目标父：一般在 prev 侧无法命中（缺失或深度更浅）时才走到。
*/ function resolveTargetParentByNext(targetDepth, nextRecordId, collector) {
	var _a, _b, _c;
	if (!nextRecordId) return null;
	var nextMeta = collector.dataUtil.getSubTreeRowMeta(nextRecordId);
	var nextLevel = (_a = nextMeta === null || nextMeta === void 0 ? void 0 : nextMeta.level) !== null && _a !== void 0 ? _a : 0;
	if (!nextMeta) return null;
	if (targetDepth === nextLevel) return (_b = nextMeta.ancestorIds[0]) !== null && _b !== void 0 ? _b : null;
	if (targetDepth < nextLevel) return (_c = nextMeta.ancestorIds[nextLevel - 1 - targetDepth]) !== null && _c !== void 0 ? _c : null;
	return null;
}
/**
* 取 record 的 subTree 深度（顶层=0）；record 不在 subTreeMeta 中时返回 undefined（表示"未启用父子"或不存在）。
*/ function getRecordLevel(recordId, collector) {
	var _a, _b;
	if (!recordId) return void 0;
	return (_b = (_a = collector.dataUtil.getSubTreeRowMeta(recordId)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0;
}
/**
* 计算被拖 record 子树的**相对高度**：自身记 0，最深后代与自身的 level 差。
*
* 用途：拖拽落点会把整棵子树一起搬走，最终最深层级 = `dropParentDepth（被拖 record 的新 level）+ 子树相对高度`。
* 交互侧据此判定是否会突破 {@link MAX_SUB_TREE_LEVEL}。
*
* 实现：父子记录在 list 视图始终完整平铺（折叠 icon 仅占位、不真正隐藏后代），因此遍历
* `displayedRecordIds` 并用 `ancestorIds.includes(movingRecordId)` 命中所有后代即可，无遗漏。
* 子树在一次拖拽期间不变，调用方只需在 mousedown 计算一次。
*/ function computeMovingSubTreeHeight(movingRecordId, collector) {
	var _a, _b;
	var movingLevel = (_b = (_a = collector.dataUtil.getSubTreeRowMeta(movingRecordId)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0;
	var maxDescendantLevel = movingLevel;
	for (var recordId of collector.dataUtil.getDisplayedRecordIds()) {
		var meta = collector.dataUtil.getSubTreeRowMeta(recordId);
		if (!meta) continue;
		if (meta.ancestorIds.includes(movingRecordId) && meta.level > maxDescendantLevel) maxDescendantLevel = meta.level;
	}
	return maxDescendantLevel - movingLevel;
}
/**
* 从一条 record 上取父子字段（`view.getSubTreeFieldId()`）的当前 parentId（RecordId | null）。
*
* LINK_RECORDS 单元格值语义：`RecordId[] | null`。父子字段虽然是"单值"关联，但底层仍是数组，
* 空关联时可能是 null / 空数组 / 空 cell，统一收敛为 null。
*/ function readParentIdOfRecord(recordId, subTreeFieldId, collector) {
	var _a, _b;
	if (!recordId) return null;
	var table = collector.dataUtil.getCurrentTable();
	if (!table) return null;
	var cell = table.getCell(recordId, subTreeFieldId);
	var value = (_a = cell === null || cell === void 0 ? void 0 : cell.value) !== null && _a !== void 0 ? _a : null;
	if (!value || value.length === 0) return null;
	return (_b = value[0]) !== null && _b !== void 0 ? _b : null;
}
/**
* 根据落点前后两条 record 的 parentId 推导「被拖 record 的新父 id」。
*
* 规则（与用户约定的父子记录同步语义严格一致）：
* - 若 `next` 存在且有父 → newParent = next.parent（例：拖到 A/A1 之间，next=A1 的父是 A，则新父=A）；
* - 否则若 `prev` 存在且有父 → newParent = prev.parent（例：拖到 A3/B 之间，prev=A3 的父是 A，仍归为 A 的子）；
* - 否则 → null（拖到两条无父的 record 之间，或列表末尾/首位）。
*
* 反向语义（用户特别强调）：拖到没有父子关系的两个 record 之间时，`prev.parent === null && next.parent === null`
* → newParent = null，即"移除被拖记录的父记录"，与本推导自然吻合。
*/ function deriveNewParentId(prevRecordId, nextRecordId, movingRecordId, subTreeFieldId, collector) {
	var nextParent = readParentIdOfRecord(nextRecordId, subTreeFieldId, collector);
	if (nextParent) {
		if (nextParent === movingRecordId) return null;
		return nextParent;
	}
	var prevParent = readParentIdOfRecord(prevRecordId, subTreeFieldId, collector);
	if (prevParent) {
		if (prevParent === movingRecordId) return null;
		return prevParent;
	}
	return null;
}
/**
* 判断 `candidateParentId` 是否是 `movingRecordId` 的自身或后代。
*
* 用于阻止「把父记录挪到自己的子孙区间」造成的父子环。走 `subTreeMeta.ancestorIds` 反查最简单：
* 若 candidate 的祖先链上有 moving，则 candidate 是 moving 的后代。moving 本身也算 → 不允许。
*/ function isDescendantOrSelf(candidateParentId, movingRecordId, collector) {
	if (!candidateParentId) return false;
	if (candidateParentId === movingRecordId) return true;
	var meta = collector.dataUtil.getSubTreeRowMeta(candidateParentId);
	if (!meta) return false;
	return meta.ancestorIds.includes(movingRecordId);
}
/**
* 组装拖拽落点信息 → moveRecord 请求参数并派发。
*
* 关键设计：
* - **支持多条一起移动**：`movingRecordIds` 可为多条（批量勾选后一起拖），core 的 `moveRecord`
*   原生支持多 recordIds（内部按 source 顺序排序、连续插入到 `nextRecordId` 之前，相对顺序稳定）。
*   调用侧需保证入参已按展示顺序排列。所有被拖 record「统一落到同一个地方」——同一分组 / 同一新父，
*   与需求一致。
* - 跨分组：`groupPath` 使用**落点所在分组**的路径（不是起点分组）。core 层会根据 groupPath
*   自动改写记录的分组字段值，实现"拖到别的分组 → 分组字段值跟随变更"。调用侧需保证 prev / next
*   都限定在 groupPath 内，避免父子推导继承别分组的父子链。
* - **作为子记录落入时不改分组字段值**：若落点是「目标分组内某条记录的子记录」（最终新父为真实
*   record），则被拖 record 在父子扁平展示下跟随父记录归组，其自身分组字段值应保持不变 —— 拖拽
*   只调整父子关系。此时对 core 传空 `groupPath`（`effectiveGroupPath = []`），跳过分组字段自动
*   改写与空分组补写；仅当落到分组顶层（新父为 null）时才让分组字段值跟随目标分组。此规则对任意
*   分组字段通用（如按「状态」分组：拖成子记录 → 状态不变；拖到分组顶层 → 状态改为目标分组值）。
* - **空分组补写字段值**：当目标顶层 GroupKey 命中 `dataUtil.isEmptyRealGroupKey` 时，
*   core 的 `MoveRecordRequest.setRecordByGroupPath` 会因为 formattedTree 里没有对应节点而拿不到
*   `standardValueMap`，导致分组字段不会被写入 → 记录只挪 rank 不改字段值，视觉上"跳回原分组"。
*   此时由 view 层显式合成分组字段的 cell delta 塞进 `moveRecord.delta.records`，语义与 kanban
*   `MOVE_GROUP_RECORD` 一致：直接把 groupKey 翻译为该字段允许的最小合法 cellValue。
* - 父子关系同步：若视图启用了父子字段 (`getSubTreeFieldId()`)，且推导出的 newParentId 与当前不同，
*   则把 setRecord delta 塞进 `moveRecord.delta.records[recordId]`，一次请求内完成排序 + 父记录改写。
*   `records?` 是 core.moveRecord 的原生入参，双关处理已内置，无需额外一次 setRecord。
*   多条移动时逐条构造各自的 setRecord delta（父归属统一使用 `forcedNewParentId`，但当前父 id 逐条读取）。
* - **显式指定新父**：`forcedNewParentId` 非 undefined 时（包括 null 表示强制顶层），直接使用该值，
*   跳过 `deriveNewParentId` 的隐式推导。用于交互侧根据鼠标 X 判定的"缩进带"输出精确父归属，
*   避免推导规则与用户可见基准线的意图错位。仍然会走 `isDescendantOrSelf` 环检查。
*
* @param movingRecordIds 被拖动的 record id 列表（已按展示顺序排列；单条拖拽时长度为 1）
* @param prevRecordId   落点前一条 record id（**必须**与 groupPath 同分组；跨分组时传 undefined）
* @param nextRecordId   落点后一条 record id（**必须**与 groupPath 同分组；跨分组时传 null）
* @param groupPath      落点所在分组 path（无分组时为空数组）
* @param context
* @param collector
* @param forcedNewParentId 显式指定的新父 id：`undefined` = 走隐式推导；`null` = 强制顶层；
*                          `RecordId` = 指定该 record 为新父。
*/ function applyMovedRecordBehavior(movingRecordIds, prevRecordId, nextRecordId, groupPath, context, collector, forcedNewParentId) {
	var _a, _b;
	var view = collector.dataUtil.getCurrentView();
	var table = collector.dataUtil.getCurrentTable();
	if (!view || !table || movingRecordIds.length === 0) return;
	var subTreeFieldId = (_b = (_a = view.getSubTreeFieldId) === null || _a === void 0 ? void 0 : _a.call(view)) !== null && _b !== void 0 ? _b : null;
	var effectiveGroupPath = resolveFinalNewParentId(movingRecordIds[0], prevRecordId, nextRecordId, subTreeFieldId, collector, forcedNewParentId) !== null ? [] : groupPath;
	var delta = {
		recordIds: [...movingRecordIds],
		nextRecordId,
		groupPath: effectiveGroupPath
	};
	var records = {};
	for (var movingRecordId of movingRecordIds) {
		var setRecordDelta = buildRecordSetDelta(movingRecordId, prevRecordId, nextRecordId, effectiveGroupPath, view, collector, { forcedNewParentId });
		if (setRecordDelta) records[movingRecordId] = setRecordDelta;
	}
	if (Object.keys(records).length > 0) delta.records = records;
	context.getBehaviorApi().moveRecord({
		tableId: table.id,
		viewId: view.id,
		delta
	});
}
/**
* 合成 `moveRecord.delta.records[movingRecordId]`：把「父子字段同步」和「空分组字段补写」两类字段合入同一
* ISetRecordRequestDelta。任何一项命中就返回；两项都不命中时返回 undefined，让外部不塞 `records`。
*/ function buildRecordSetDelta(movingRecordId, prevRecordId, nextRecordId, groupPath, view, collector, options) {
	var setDelta = {};
	var hasEntry = false;
	var subTreeEntry = buildSubTreeParentEntry(movingRecordId, prevRecordId, nextRecordId, view, collector, options);
	if (subTreeEntry) {
		setDelta[subTreeEntry.fieldId] = { value: subTreeEntry.cellValue };
		hasEntry = true;
	}
	var targetTopGroupKey = groupPath[0];
	if (targetTopGroupKey !== void 0 && collector.dataUtil.isEmptyRealGroupKey(targetTopGroupKey)) {
		var override = collector.dataUtil.buildGroupFieldOverrideForTopGroupKey(targetTopGroupKey);
		if (override && !setDelta[override.fieldId]) {
			setDelta[override.fieldId] = { value: override.cellValue };
			hasEntry = true;
		}
	}
	return hasEntry ? setDelta : void 0;
}
/**
* 「父子字段同步」子步骤：视图挂了 subTreeFieldId 且推导出的新父与当前不同时，返回 `{ fieldId, cellValue }`；
* 否则返回 null。
*/ function buildSubTreeParentEntry(movingRecordId, prevRecordId, nextRecordId, view, collector, options) {
	var _a, _b;
	var subTreeFieldId = (_b = (_a = view.getSubTreeFieldId) === null || _a === void 0 ? void 0 : _a.call(view)) !== null && _b !== void 0 ? _b : null;
	if (!subTreeFieldId) return null;
	var currentParentId = readParentIdOfRecord(movingRecordId, subTreeFieldId, collector);
	var newParentId = resolveFinalNewParentId(movingRecordId, prevRecordId, nextRecordId, subTreeFieldId, collector, options.forcedNewParentId);
	if (newParentId === currentParentId) return null;
	return {
		fieldId: subTreeFieldId,
		cellValue: newParentId ? [newParentId] : null
	};
}
/**
* 解析被拖 record 的「最终新父 id」。
*
* - 视图未启用父子字段（无 `subTreeFieldId`）→ 恒为 `null`（不可能成为子记录）。
* - `forcedNewParentId` 非 `undefined` 时优先采用（`null` = 强制顶层）；否则按 prev/next 隐式推导。
* - 统一经 `isDescendantOrSelf` 环检查兜底：命中则退回 `null`（顶层），避免自引用 / 成环。
*
* 供「父子字段同步」(`buildSubTreeParentEntry`) 与「是否作为子记录落入」(决定是否改写分组字段)
* 两处共用同一套判定，保证二者结论一致。
*/ function resolveFinalNewParentId(movingRecordId, prevRecordId, nextRecordId, subTreeFieldId, collector, forcedNewParentId) {
	if (!subTreeFieldId) return null;
	var newParentId = forcedNewParentId !== void 0 ? forcedNewParentId : deriveNewParentId(prevRecordId, nextRecordId !== null && nextRecordId !== void 0 ? nextRecordId : void 0, movingRecordId, subTreeFieldId, collector);
	if (isDescendantOrSelf(newParentId, movingRecordId, collector)) newParentId = null;
	return newParentId;
}
var init_util = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/record-move/main.js
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
/**
* 两个分组路径是否等价（顺序相同 + 逐项相等）。
* 空数组 vs 空数组也视为相等（无分组场景）。
*/ function isSameGroupPath(a, b) {
	if (a.length !== b.length) return false;
	for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
/**
* 取单条 DrawConfig 的水平"宽度"（相对自身 `x`）：
* - Line 无 width，用 points 中最大 x 兜底（points 为 [x0,y0,x1,y1,...]）；
* - 其它 Rect 系 config 直接取 width；
* - 不可测量时返回 0。
*/ function getConfigWidth(config) {
	var _a;
	if (config.type === DrawType.Line) {
		var points = (_a = config.points) !== null && _a !== void 0 ? _a : [];
		var maxPx = 0;
		for (var i = 0; i < points.length; i += 2) if (points[i] > maxPx) maxPx = points[i];
		return maxPx;
	}
	var w = config.width;
	return typeof w === "number" ? w : 0;
}
/**
* 计算 `leftConfigs` 的水平包围盒（全局坐标）：`{ left, right }`。
*
* 忽略 `width <= 0` 的空 config（如占位不产生视觉宽度的段）；
* 数组为空 / 所有 config 都无法算宽时返回 `undefined`，由调用方走"回退简单基座"分支。
*/ function measureLeftConfigsBBox(configs) {
	var left = Number.POSITIVE_INFINITY;
	var right = Number.NEGATIVE_INFINITY;
	for (var config of configs) {
		var w = getConfigWidth(config);
		if (w <= 0) continue;
		var x = typeof config.x === "number" ? config.x : 0;
		if (x < left) left = x;
		if (x + w > right) right = x + w;
	}
	if (!Number.isFinite(left) || !Number.isFinite(right) || right <= left) return void 0;
	return {
		left,
		right
	};
}
var ListRecordMove;
var init_main$3 = __esmMin((() => {
	init_config$1();
	init_pen();
	init_style();
	init_interface$6();
	init_cursor();
	init_is_in_rect();
	init_register_esc_to_cancel();
	init_auto_scroll();
	init_list_feature();
	init_interface$2();
	init_util();
	init_placeholder_record();
	ListRecordMove = /* @__PURE__ */ function(ListFeatureBase) {
		"use strict";
		_inherits$13(ListRecordMove, ListFeatureBase);
		function ListRecordMove() {
			var _this = ListFeatureBase.apply(this, arguments) || this;
			_this.group = null;
			/**
			* 实际按下的那条 record id（拖拽起点）。仅用于：
			* - 拖影内容锚点（`clickRowInfo`）；
			* - 缩进档 `pickDropParentDepthByDragDx` 的 sourceLevel。
			* 落点邻居 / 环检查等「被移除的行集合」语义统一走 {@link movingRecordIds} / {@link movingRecordIdSet}。
			*/ _this.mouseDownRecordId = "";
			/**
			* 本次拖拽被移动的全部 record id（已按展示顺序排列）：
			* - 单条拖拽：仅 `[mouseDownRecordId]`；
			* - 多条拖拽：mousedown 命中某个已勾选行时，为全部勾选行（可不连续、跨分组）。
			* 落手时这些 record 会「统一落到同一个地方」（同分组 / 同新父）。
			*/ _this.movingRecordIds = [];
			/** {@link movingRecordIds} 的 Set 形态，供邻居查找 / 环检查 O(1) 判定「是否被拖行」。 */ _this.movingRecordIdSet = /* @__PURE__ */ new Set();
			/** 拖动起点 record 所在分组路径（落点限定在同分组内） */ _this.clickGroupPath = [];
			/**
			* 被拖子树的相对高度（自身=0，最深后代与自身的 level 差）。mousedown 计算一次即可
			* （子树在一次拖拽期间不变），用于落点层级超限校验：最终最深层级 = dropParentDepth + 该高度。
			* 多条拖拽时取**所有被拖 record 子树高度的最大值**（保守口径，保证任意被拖子树都不越限）。
			*/ _this.movingSubTreeHeight = 0;
			/**
			* 当前候选落点是否会使被拖子树最深层级超过 {@link MAX_SUB_TREE_LEVEL}。
			*
			* 与"无效落点"不同：超限时**照常绘制**基准线 / 父高亮（用户仍能看到将落到哪），只是松手时
			* 不应用数据、改为 fire `onSubDepthLimit` 通知宿主。每次 `updateDropTarget` 重新计算。
			*/ _this.isDropExceedLimit = false;
			_this.mouseDownX = 0;
			_this.mouseDownY = 0;
			_this.mouseMoveX = 0;
			_this.mouseMoveY = 0;
			/**
			* mousedown 时的 `range.scrollTop` 快照。拖影锚定它（而非实时 scrollTop）换算视口坐标：
			* 自动滚动期间鼠标可停在边缘不动，若拖影用实时 scrollTop 会随内容滚动一起漂移、脱离光标；
			* 用固定的按下时 scrollTop 可让拖影始终跟随光标（基准线 / 父高亮仍用实时 scrollTop，因它们锚定内容行）。
			*/ _this.mouseDownScrollTop = 0;
			/**
			* mousedown 时被拖起点行 `leftConfigs`（左侧字段绘制内容）的浅拷贝快照。
			*
			* 为何缓存而非每帧实时取：`content.getRecordRenderInfo` 只保留**当前渲染 range 内**的行，
			* 自动滚动超过一屏后被拖行离开 range → 实时查询返回 undefined → 拖影退化成空白基座。
			* mousedown 时被拖行必在 range 内，此刻快照即可（config 的 x/y 均为静态全局坐标，与滚动无关），
			* 之后无论滚多远拖影内容都保持完整。浅拷贝避免主层每帧 `add` 改写 offsetX/offsetY 污染快照。
			*/ _this.draggedLeftConfigs = [];
			/**
			* 落点：以行 index 表达，`dropBeforeRecord = true` 表示插在这一行的**上方**。
			* dropRowIndex = -1 时无有效落点，mouseup 直接清理。
			*/ _this.dropRowIndex = -1;
			_this.dropBeforeRecord = true;
			/**
			* 落点选定的"新父深度"（顶层 = 0）。由鼠标 X 与候选深度区间 `[lowerDepth, upperDepth]` 拟合得到。
			*
			* 与 anchor.level 解耦：同一个"记录间隙"下可能有多个候选深度（例如拖到 `a3` 和 `b` 之间时，
			* 深度 0 = 顶层、深度 1 = 作为 a 的子），基准线的左端 X 与最终父归属由此深度共同决定。
			*/ _this.dropParentDepth = 0;
			/**
			* 落点选定的"新父 record id"（null = 顶层）。由 `dropParentDepth` + 前后 record 反查得到。
			* `applyDrop` 时透传给 `applyMovedRecordBehavior` 的 `forcedNewParentId`，跳过隐式推导。
			*/ _this.dropParentId = null;
			/** 是否已越过启动阈值进入拖拽绘制 */ _this.isInDragging = false;
			_this.onStageMouseDown = (evt) => {
				var _a;
				if (_this.isPreventFromOtherFeature()) return;
				var { target } = evt;
				if (!target.isRecordRow || !target.recordId) return;
				if (isPlaceholderRecordId(target.recordId)) return;
				if (target.isRecordLeftGutter) return;
				var rowInfo = _this.collector.rows.getInfoByRecordId(target.recordId);
				if (!rowInfo) return;
				_this.mouseDownRecordId = target.recordId;
				_this.movingRecordIds = _this.resolveMovingRecordIds(target.recordId);
				_this.movingRecordIdSet = new Set(_this.movingRecordIds);
				_this.clickRowInfo = rowInfo;
				_this.clickGroupPath = _this.getRecordGroupPath(target.recordId);
				var clickRenderInfo = _this.collector.content.getRecordRenderInfo(target.recordId);
				_this.draggedLeftConfigs = ((_a = clickRenderInfo === null || clickRenderInfo === void 0 ? void 0 : clickRenderInfo.leftConfigs) !== null && _a !== void 0 ? _a : []).map((cfg) => Object.assign({}, cfg));
				_this.movingSubTreeHeight = _this.movingRecordIds.reduce((max, id) => Math.max(max, computeMovingSubTreeHeight(id, _this.collector)), 0);
				_this.mouseDownX = evt.x;
				_this.mouseDownY = evt.y;
				_this.mouseMoveX = evt.x;
				_this.mouseMoveY = evt.y;
				_this.mouseDownScrollTop = _this.collector.range.scrollTop;
				_this.dropRowIndex = -1;
				_this.setCursor(Cursor.GRAB);
				_this.attachListeners();
			};
			_this.onWindowMouseMove = (evt) => {
				var _a;
				_this.mouseMoveX = evt.x;
				_this.mouseMoveY = evt.y;
				if (!_this.mouseDownRecordId) return;
				if (!_this.isInDragging) {
					var dx = Math.abs(_this.mouseMoveX - _this.mouseDownX);
					var dy = Math.abs(_this.mouseMoveY - _this.mouseDownY);
					if (dx <= 5 && dy <= 5) return;
					_this.isInDragging = true;
					(_a = _this.parentApi.getFeature(IListAutoScroll)) === null || _a === void 0 || _a.readyY();
				}
				_this.setCursor(Cursor.GRABBING);
				_this.updateDropTarget(evt.target);
				_this.redraw();
			};
			_this.onDocumentMouseUp = (_evt) => {
				if (_this.isInDragging && _this.dropRowIndex !== -1 && _this.mouseDownRecordId) if (_this.isDropExceedLimit) _this.emitter.wbService.onSubDepthLimit.fire();
				else _this.applyDrop();
				_this.clearAll();
			};
			return _this;
		}
		var _proto = ListRecordMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMouseDown));
			this._register(this.UIEvent.stage.onResize(() => {
				var _a;
				return (_a = this.group) === null || _a === void 0 ? void 0 : _a.setAttrs(this.collector.size.globalRect);
			}));
			this._register(this.collector.range.onScroll(() => this.abortDragging()));
		};
		_proto.dispose = function dispose(trace) {
			ListFeatureBase.prototype.dispose.call(this, trace);
			this.cancelListeners();
		};
		_proto.render = function render() {
			if (!this.isInDragging) return;
			if (!isHitRect(this.mouseMoveX, this.mouseMoveY, this.collector.size.globalRect)) return;
			this.redraw();
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IListRecordMove,
				isLock: () => this.isDragging()
			} };
		};
		/**
		* 判定本次拖拽被移动的 record 集合：
		* - 若命中的行处于「批量勾选」集合内且勾选了 **多条** → 拖动全部勾选行（按展示顺序排列，
		*   与 core.moveRecord「按 source 顺序连续插入」的落库口径一致，保证相对顺序稳定）；
		* - 否则退化为单条拖动命中的这一行（即使当前有勾选，但命中的是未勾选行，也只拖这一行）。
		*/ _proto.resolveMovingRecordIds = function resolveMovingRecordIds(clickedRecordId) {
			var selectedIds = this.collector.state.getSelectedRecordIds();
			if (selectedIds.length > 1 && selectedIds.includes(clickedRecordId)) return this.sortByDisplayOrder(selectedIds);
			return [clickedRecordId];
		};
		/** 按 `getDisplayedRecordIds()` 的展示顺序对一组 recordId 排序（不在展示列表中的排到最前，容错兜底）。 */ _proto.sortByDisplayOrder = function sortByDisplayOrder(recordIds) {
			var displayed = this.collector.dataUtil.getDisplayedRecordIds();
			var indexOf = /* @__PURE__ */ new Map();
			displayed.forEach((id, i) => indexOf.set(id, i));
			return [...recordIds].sort((a, b) => {
				var _a, _b;
				return ((_a = indexOf.get(a)) !== null && _a !== void 0 ? _a : -1) - ((_b = indexOf.get(b)) !== null && _b !== void 0 ? _b : -1);
			});
		};
		/**
		* 根据鼠标当前命中的 target 计算 dropRowIndex + dropBeforeRecord。
		*
		* 判定策略：
		* - 命中 record 行：以该行"上下半区"决定插入到该行之前 / 之后；
		* - 命中 GroupHead / 空白：以鼠标 absY 兜底找最接近的 record 行作锚点；
		* - 被拖 record 自身及紧邻位置视为原位无效。
		*
		* 跨分组：允许落到不同 groupPath 下的 record 之间；分组字段值的联动由
		* `applyMovedRecordBehavior` 通过 `moveRecord.delta.groupPath` 交给 core 层完成
		* （core 会根据目标 groupPath 自动改写记录的分组字段值）。
		*
		* 父子归属（多候选）：
		* - 参考 grid `field-move` 里"列 vs 列编组"的临界处理思路：一个"记录间隙"往往对应多个父子归属
		*   候选（例如 `a3/b` 之间既可作 a 的子、也可作顶层），交互侧根据鼠标 X 落在哪个"缩进带"上
		*   选择目标深度。缩进带宽度 = `size.subIndentWidth`，起点 = 顶层主列起点。
		* - 候选区间由 {@link computeDropParentDepthRange} 依据落点前后 record 产出。**跨分组同样允许**
		*   继承父子链：`resolveDropNeighbors` 已把 prev/next 限定在目标分组 (anchorGroupPath) 内，
		*   因此继承的是**目标分组**的父子结构，语义正确（可把记录拖入别分组并作其中某记录的子）。
		* - 最终选定的 `dropParentDepth` / `dropParentId` 由 {@link resolveTargetParentIdByDepth} 反查，
		*   同时供 `drawDropLine`（缩进基准线）与 `applyDrop`（透传给 util 的 forcedNewParentId）复用。
		*/ _proto.updateDropTarget = function updateDropTarget(target) {
			this.dropRowIndex = -1;
			this.dropParentDepth = 0;
			this.dropParentId = null;
			this.isDropExceedLimit = false;
			if (!this.clickRowInfo) return;
			var anchor;
			var beforeRecord = true;
			if (target.isRecordRow && target.recordId) {
				var hover = this.collector.rows.getInfoByRecordId(target.recordId);
				if (hover) {
					var rowMidY = hover.y + hover.height / 2 - this.collector.range.scrollTop;
					beforeRecord = this.mouseMoveY <= rowMidY;
					anchor = hover;
				}
			} else {
				anchor = this.findClosestRecordByAbsY(this.mouseMoveY + this.collector.range.scrollTop);
				if (anchor) {
					var rowMidY1 = anchor.y + anchor.height / 2 - this.collector.range.scrollTop;
					beforeRecord = this.mouseMoveY <= rowMidY1;
				}
			}
			if (!anchor) return;
			var anchorGroupPath = this.getRecordGroupPath(anchor.recordId);
			var inSameGroup = isSameGroupPath(anchorGroupPath, this.clickGroupPath);
			this.dropRowIndex = anchor.index;
			this.dropBeforeRecord = beforeRecord;
			this.updateDropParent(anchor, beforeRecord, anchorGroupPath);
			if (this.isDropParentCyclic()) {
				this.resetDropTarget();
				return;
			}
			this.isDropExceedLimit = this.isDropExceedMaxLevel();
			if (inSameGroup && !this.isMultiMoving && this.isFinalSlotSameAsOrigin(anchor, beforeRecord, anchorGroupPath)) this.resetDropTarget();
		};
		/**
		* 把当前落点状态整体重置为「无效」：`dropRowIndex = -1` 使 redraw 不再绘制基准线 / 父高亮 /
		* 父归属传递到 apply 阶段。`dropParentDepth / dropParentId` 一并复位，避免残留态在下一次
		* `updateDropTarget` 早退分支里被读到造成绘制错乱。
		*/ _proto.resetDropTarget = function resetDropTarget() {
			this.dropRowIndex = -1;
			this.dropParentDepth = 0;
			this.dropParentId = null;
		};
		/**
		* 环检查：目标父不能是任一 movingRecord 自身或其后代。
		*
		* 触发场景：拖 c 到 c 自身下半区、且鼠标 X 右移触发 depth=1 时，`resolveDropNeighbors`
		* 会把 prev 定位为 self、`resolveTargetParentByPrev(depth=1, prev=self)` 直接返回 self，
		* 使 `dropParentId === movingRecordId`。若不拦下，会绘制出"父高亮虚线框画在自己身上、基准线
		* 也在自己身上"的错乱视觉（且实际 apply 侧 `isDescendantOrSelf` 兜底会把它抹为 null，
		* 用户松手后行不动，交互期望与结果不一致）。
		*
		* 多条拖拽：目标父只要落在**任一被拖 record**自身或其后代上，都会造成「被拖行成为自己/兄弟的父」
		* 的矛盾归属，一律判为无效落点，与 apply 侧逐条 `isDescendantOrSelf` 兜底口径统一。
		*/ _proto.isDropParentCyclic = function isDropParentCyclic() {
			if (this.dropParentId == null) return false;
			return this.movingRecordIds.some((id) => isDescendantOrSelf(this.dropParentId, id, this.collector));
		};
		/**
		* 层级超限检查：被拖 record 落到当前候选深度 `dropParentDepth`（即被拖 record 的新 level，顶层=0）后，
		* 它的整棵子树会一起下沉，最深层级 = `dropParentDepth + movingSubTreeHeight`（均为 0-based level）。
		* 换算成"层数"（顶层=第 1 层）即 `dropParentDepth + movingSubTreeHeight + 1`，超过 {@link MAX_SUB_TREE_LEVEL}
		* 时视为超限。超限时基准线 / 父高亮**照常绘制**，仅松手时不应用数据、改 fire `onSubDepthLimit`。
		*
		* 未启用父子字段时 `dropParentDepth` 恒 0、`movingSubTreeHeight` 恒 0，永不触发。
		*/ _proto.isDropExceedMaxLevel = function isDropExceedMaxLevel() {
			return this.dropParentDepth + this.movingSubTreeHeight + 1 > 5;
		};
		/**
		* 计算 `dropParentDepth` / `dropParentId`：
		* 1. 定位落点前后同分组 record（prev / next）；
		* 2. 由 {@link computeDropParentDepthRange} 产出候选深度区间；
		* 3. 用鼠标 X 拟合到 `[lowerDepth, upperDepth]` 内的整数深度；
		* 4. 反查得到父 id。
		*
		* 允许继承父子链的前提：视图启用了 subTreeFieldId。**跨分组同样允许**——`resolveDropNeighbors`
		* 已把 prev / next 限定在目标分组 (anchorGroupPath) 内，继承的是目标分组的父子链而非原分组，
		* 因此可把记录拖入别的分组并作其中某条记录的子记录。
		*/ _proto.updateDropParent = function updateDropParent(anchor, beforeRecord, anchorGroupPath) {
			var _a, _b;
			var view = this.collector.dataUtil.getCurrentView();
			if (!((_b = (_a = view === null || view === void 0 ? void 0 : view.getSubTreeFieldId) === null || _a === void 0 ? void 0 : _a.call(view)) !== null && _b !== void 0 ? _b : null)) return;
			var { prevRecordId, nextRecordId } = this.resolveDropNeighbors(anchor, beforeRecord, anchorGroupPath);
			var { lowerDepth, upperDepth } = computeDropParentDepthRange(prevRecordId, nextRecordId !== null && nextRecordId !== void 0 ? nextRecordId : void 0, true, this.collector);
			if (upperDepth <= lowerDepth) this.dropParentDepth = lowerDepth;
			else this.dropParentDepth = this.pickDropParentDepthByDragDx(lowerDepth, upperDepth);
			this.dropParentId = resolveTargetParentIdByDepth(this.dropParentDepth, prevRecordId, nextRecordId !== null && nextRecordId !== void 0 ? nextRecordId : void 0, this.collector);
		};
		/**
		* 根据用户拖拽产生的水平位移 `dx = mouseMoveX - mouseDownX` 拟合到 `[lowerDepth, upperDepth]`
		* 区间内的整数深度。
		*
		* 【为什么不用鼠标绝对 X】"用鼠标绝对 X 判缩进带"看似直观，实际用户在按下时的落点可能在
		* 行文字中央（远超所有 baselineX），导致永远命中 upperDepth，depth=0 的顶层基准线永远出不来
		* （拖 c 到 a3/b 之间 → 只见 depth=1 的短线，见不到顶层长线）。
		*
		* 【心智模型】"抓住行水平方向挪 = 改变缩进"：
		* - `sourceLevel = level(mouseDown record)` 起点深度；
		* - `dx / subIndentWidth` 四舍五入得到"挪动的层级数"，可正可负；
		* - `target = clamp(sourceLevel + steps, lowerDepth, upperDepth)`。
		*
		* 【全局左偏 `LEFT_SHIFT_PX`】
		* 对所有档位的判定线整体向右偏移 `LEFT_SHIFT_PX` px（等价于给 `dx` 无条件减 50），
		* 让"向左退层"更省手感：例如 L3 记录不再需要向左拖 3 * indent 才能到顶层，
		* 只需 `3 * indent - 50` px 即可。
		*
		* 代价：向右加深缩进的门槛也整体右移 50 px（原本 `dx ≥ indent/2` 触发变深、现在需要
		* `dx ≥ indent/2 + 50`）。这是用户明确接受的取舍：拖拽初期通常横向都在小范围抖动，
		* 让"回到顶层"的常见诉求更省力，比"极致精确变深"更重要。
		*
		* 【场景验证（indent 假设 16 px、LEFT_SHIFT_PX = 50）】
		* - c(L0) 拖到 a3(L1)/b(L0) 之间：区间 [0, 2]，sourceLevel=0。
		*   - dx=0 → effectiveDx=-50 → steps=-3 → target=-3 → clamp lowerDepth=0，顶层 ✓
		*   - dx=50 → effectiveDx=0 → steps=0 → target=0，顶层 ✓
		*   - dx=50 + indent → effectiveDx=indent → steps=1 → target=1，作 a 的子 ✓
		* - a3(L1) 拖到 a1(L1)/a2(L1) 之间：区间 [1, 2]，sourceLevel=1。
		*   - dx=0 → effectiveDx=-50 → steps=-3 → target=-2 → clamp lowerDepth=1（区间不含 0），仍作 a 的子 ✓
		*   - dx=50 + indent/2 ≈ 58 → target=2，作 a1 的子（需比原来多挪 50）✓
		*
		* 边界：`sourceLevel` 取 mouseDown record 的 subTree level；record 不在 subTreeMeta 中时按 0。
		*/ _proto.pickDropParentDepthByDragDx = function pickDropParentDepthByDragDx(lowerDepth, upperDepth) {
			var _a, _b;
			var indent = this.collector.size.subIndentWidth;
			if (indent <= 0) return lowerDepth;
			var sourceLevel = (_b = (_a = this.collector.dataUtil.getSubTreeRowMeta(this.mouseDownRecordId)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0;
			var effectiveDx = this.mouseMoveX - this.mouseDownX - 30;
			var target = sourceLevel + Math.round(effectiveDx / indent);
			if (target <= lowerDepth) return lowerDepth;
			if (target >= upperDepth) return upperDepth;
			return target;
		};
		/**
		* 定位落点前后**同分组**的 record id（与 applyDrop 一致的口径，提前到 updateDropTarget 供
		* 父归属计算与 applyDrop 共用）。
		*
		* anchor 侧同样跳过被拖行：当 anchor 自身也在被拖集合里（多条拖拽 hover 到某个被拖行、或单条拖
		* 到自己身上）时，直接用 anchor 作 prev/next 会把「正在被移除的行」当成落点邻居，落库时语义断裂。
		* 因此若 anchor 命中被拖行，则沿对应方向跨过所有被拖行找到真正的同组邻居。
		*/ _proto.resolveDropNeighbors = function resolveDropNeighbors(anchor, beforeRecord, anchorGroupPath) {
			var _a, _b;
			var displayedRecordIds = this.collector.dataUtil.getDisplayedRecordIds();
			var anchorIdx = displayedRecordIds.indexOf(anchor.recordId);
			if (anchorIdx < 0) return {
				prevRecordId: void 0,
				nextRecordId: null
			};
			var anchorIsMoving = this.movingRecordIdSet.has(anchor.recordId);
			if (beforeRecord) {
				var nextRecordId = anchorIsMoving ? this.getSameGroupNeighborId(displayedRecordIds, anchorIdx, anchorGroupPath, 1) : anchor.recordId;
				return {
					prevRecordId: (_a = this.getSameGroupNeighborId(displayedRecordIds, anchorIdx - 1, anchorGroupPath, -1)) !== null && _a !== void 0 ? _a : void 0,
					nextRecordId
				};
			}
			return {
				prevRecordId: anchorIsMoving ? (_b = this.getSameGroupNeighborId(displayedRecordIds, anchorIdx, anchorGroupPath, -1)) !== null && _b !== void 0 ? _b : void 0 : anchor.recordId,
				nextRecordId: this.getSameGroupNeighborId(displayedRecordIds, anchorIdx + 1, anchorGroupPath, 1)
			};
		};
		/**
		* 判断「本次拖拽产生的最终 slot」是否与被拖 record 的原始 slot 语义等价（= 原位）。
		*
		* 【为什么不能只看 displayedRecordIds 线性索引】父子层级维度会给同一个"记录间隙"提供多个候选深度。
		* 例：结构 `a { a1, a2, a3 }, b, c`，拖 a3 到 a3/b 间隙时，索引维度上 slot 就是 (a3, b) —— 但父深度
		* 有两档：depth=1（仍作 a 的子，与原位真等价）、depth=0（脱出 a 成为顶层，是有效"移出父"操作）。
		* 只按索引判就会把两档一起拦掉，导致用户无法把 a3 拖出父。
		*
		* 【最终 slot 三元组】(normalizedPrev, normalizedNext, dropParentId)：
		* - prev/next：本次落点的前后同分组邻居（`resolveDropNeighbors` 的产物）。当 anchor 是
		*   movingRecord 本身时，slot 里会含 self（`prev=self` 或 `next=self`），需要**用 self 反方向
		*   跨越 self 的同组邻居**代替 —— 这样归一化后的 slot 等价于「假设 movingRecord 已被从原位
		*   移除、再插入到 slot 时」slot 两侧真实的邻居。
		* - dropParentId：`updateDropParent` 已经算好的目标父 id。
		*
		* 【与原 slot 比较】movingRecord 的原始 slot：
		* - originPrev/originNext：`displayedRecordIds` 上 movingRecord 的**同分组**前后邻居；
		* - originParentId：`readParentIdOfRecord(movingRecordId, subTreeFieldId)`；未启用父子时视为 null。
		*
		* 【等价条件】三者同时命中：
		*   `normalizedPrev === originPrev` && `normalizedNext === originNext` && `dropParentId === originParentId`。
		*/ _proto.isFinalSlotSameAsOrigin = function isFinalSlotSameAsOrigin(anchor, beforeRecord, anchorGroupPath) {
			var _a, _b;
			var { prevRecordId, nextRecordId } = this.resolveDropNeighbors(anchor, beforeRecord, anchorGroupPath);
			var displayedRecordIds = this.collector.dataUtil.getDisplayedRecordIds();
			var selfIdx = displayedRecordIds.indexOf(this.mouseDownRecordId);
			var normalizedPrev = prevRecordId === this.mouseDownRecordId ? (_a = this.getSameGroupNeighborId(displayedRecordIds, selfIdx - 1, anchorGroupPath, -1)) !== null && _a !== void 0 ? _a : void 0 : prevRecordId;
			var normalizedNext = nextRecordId === this.mouseDownRecordId ? this.getSameGroupNeighborId(displayedRecordIds, selfIdx + 1, anchorGroupPath, 1) : nextRecordId;
			var originPrev = (_b = this.getSameGroupNeighborId(displayedRecordIds, selfIdx - 1, this.clickGroupPath, -1)) !== null && _b !== void 0 ? _b : void 0;
			var originNext = this.getSameGroupNeighborId(displayedRecordIds, selfIdx + 1, this.clickGroupPath, 1);
			var originParentId = this.readCurrentParentId(this.mouseDownRecordId);
			return normalizedPrev === originPrev && normalizedNext === originNext && this.dropParentId === originParentId;
		};
		/**
		* 读取 movingRecord 当前父 id（视图未启用父子字段时恒为 null）。
		*/ _proto.readCurrentParentId = function readCurrentParentId(recordId) {
			var _a, _b, _c, _d, _e;
			var subTreeFieldId = (_c = (_b = (_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getSubTreeFieldId) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : null;
			if (!subTreeFieldId) return null;
			var table = this.collector.dataUtil.getCurrentTable();
			if (!table) return null;
			var cell = table.getCell(recordId, subTreeFieldId);
			var value = (_d = cell === null || cell === void 0 ? void 0 : cell.value) !== null && _d !== void 0 ? _d : null;
			if (!value || value.length === 0) return null;
			return (_e = value[0]) !== null && _e !== void 0 ? _e : null;
		};
		/**
		* 遍历 rows 找到与 absY 最接近（且高度非 0）的 record 行；未找到返回 undefined。
		*/ _proto.findClosestRecordByAbsY = function findClosestRecordByAbsY(absY) {
			var { rows, size } = this.collector;
			var closest;
			var minDist = Number.POSITIVE_INFINITY;
			for (var i = 0; i < rows.rowCount; i++) {
				var info = rows.getInfo(i);
				if (!info || info.height === 0) continue;
				if (info.type !== RowType.Record) continue;
				var rowRecord = info;
				var rowMidY = rowRecord.y + size.recordHeight / 2;
				var dist = Math.abs(absY - rowMidY);
				if (dist < minDist) {
					minDist = dist;
					closest = rowRecord;
				}
			}
			return closest;
		};
		/**
		* 从 rows 反查 record 所在 GroupHead 路径；无分组时返回 []。
		*
		* 沿 rowInfo.parent 向上找到最近的 GroupHead 即可（RecordRange 的 parent 也可能指向 GroupHead）。
		*/ _proto.getRecordGroupPath = function getRecordGroupPath(recordId) {
			var info = this.collector.rows.getInfoByRecordId(recordId);
			if (!info) return [];
			var cursor = info.parent;
			while (cursor >= 0) {
				var row = this.collector.rows.getInfo(cursor);
				if (!row) return [];
				if (row.type === RowType.GroupHead) return row.path;
				cursor = row.parent;
			}
			return [];
		};
		_proto.redraw = function redraw() {
			if (!this.group) return;
			this.group.clear();
			this.drawParentHighlight();
			this.drawDropLine();
			this.drawDragShadow();
		};
		/**
		* 高亮拖拽落点对应的父记录整行区域，帮助用户在依赖缩进（indent）之外更直观地看清"我这次拖下去
		* 会成为哪条记录的子"。
		*
		* 绘制条件：
		* - `isInDragging = true`（redraw 已保证）；
		* - `dropRowIndex !== -1`（有有效落点）；
		* - `dropParentId !== null`（父归属为顶层时无需绘制）；
		* - 目标父行 rowInfo 存在。
		*
		* 视觉：`rowStartX / rowWidth / rowInfo.height` 区域画一个 `selectionBorderColor` 的蓝色 1px 虚线
		* 边框矩形，无填充；圆角复用 `size.recordBgRadius` 与拖影基座一致。虚线（相对基准线的实线）用来
		* 弱化视觉侵入感，避免与"插入位置基准线"这条主导视觉抢焦点。
		*
		* 坐标：`y = rowInfo.y - range.scrollTop`（全局 → 视口）。父行在视口外时依然会绘制，被父 group
		* 的 clipArea 自然裁剪掉，不需要额外可见性判断。
		*/ _proto.drawParentHighlight = function drawParentHighlight() {
			if (this.dropRowIndex === -1 || !this.group) return;
			if (this.dropParentId == null) return;
			var parentInfo = this.collector.rows.getInfoByRecordId(this.dropParentId);
			if (!parentInfo) return;
			var { size, range } = this.collector;
			var y = parentInfo.y - range.scrollTop;
			var rectLeftX = this.getDropIndentLineX() - 16;
			var rectRightX = size.rowStartX + size.rowWidth;
			var rectWidth = Math.max(0, rectRightX - rectLeftX);
			var highlightGroup = pen.group(Object.assign(Object.assign({}, size.globalRect), { overflow: "visible" }));
			highlightGroup.add(pen.config.rect({
				x: rectLeftX,
				y,
				width: rectWidth,
				height: parentInfo.height,
				borderColor: style.color.selectionBorderColor,
				borderWidth: 1,
				borderDash: [2, 2],
				borderRadius: size.recordBgRadius
			}));
			this.group.addGroup(highlightGroup);
		};
		/**
		* 计算"落点 slot 缩进基准线"的左端 X（视口坐标）。
		*
		* 公式来源：主列文本起点 `leftStartX = baseStartX + 2 + level * indent`（与 content.ts 同源），
		* 再左移半个 indent 到"父子第 level 层竖线的中心"，加上 `subLineCenterOffsetX` 微调
		* （与 content.collectSubTreeLines 的 `vertLineCenterX` 计算完全一致）。
		*
		* 被 `drawDropLine`（基准线）与 `drawParentHighlight`（父行高亮矩形左端）共同调用，
		* 保证两者视觉上处于同一根竖轴上——用户看到的"基准线起点"和"高亮矩形左边"是对齐的。
		*/ _proto.getDropIndentLineX = function getDropIndentLineX() {
			var { size, dataUtil } = this.collector;
			return (dataUtil.hasGroup() ? size.groupedRecordStartX : size.groupValueStartX) + 2 + this.dropParentDepth * size.subIndentWidth - size.subIndentWidth / 2 + size.subLineCenterOffsetX;
		};
		/**
		* 绘制被拖 record 的拖影：白底 + 边框基座 + 复用 `leftConfigs` 中的字段内容，跟随鼠标 x/y 位移。
		*
		* 复用策略：从 mousedown 时缓存的 `draggedLeftConfigs`（行预收集 `leftConfigs` 的浅拷贝，
		* 与主渲染 `RecordWidget.draw` 同源）取内容，把每条 config 按当前 (dx, dy) 位移平移到拖影 group 中。
		* 这样拖影的字段文本 / icon / 标签等与真实行左侧内容完全一致，且不受自动滚动滚出可视区影响。
		*
		* 视觉设计：
		* - 只保留 leftConfigs，不带 subTree / right / avatar / checkbox；
		* - 白底不透明（`normalBackground` 不透明纯色），以突出被拖行的信息、避免与下方内容混叠；
		* - 宽度按 leftConfigs 的**实际内容包围盒**收敛：`shadowWidth = maxRight - shadowLeft + padding * 2`，
		*   不是撑满整行 —— 让拖影更像"抓着几个字段跑"，而不是一整条厚重的行；
		* - 跟随鼠标：dx = mouseMoveX - mouseDownX，dy = mouseMoveY - mouseDownY，同时应用到基座和字段。
		*
		* 注意：
		* - `group.add(config, ...)` 会**原地修改** config 的 `offsetX/offsetY/clipArea` 属性，
		*   直接把原 DrawConfig 引用传入会污染主层的渲染缓存；因此对每条 config 都做浅拷贝 `{...config}`；
		* - 为避免拖到画布边缘时被 clip，拖影 group 走 `overflow: 'visible'`；
		* - 兜底：`renderInfo` / `leftConfigs` 缺失或空时，用行原始宽高绘制简单白底基座保底。
		*/ _proto.drawDragShadow = function drawDragShadow() {
			var info = this.clickRowInfo;
			if (!info || !this.group) return;
			var { size } = this.collector;
			var dx = this.mouseMoveX - this.mouseDownX;
			var dy = this.mouseMoveY - this.mouseDownY;
			var shadowOffsetX = dx;
			var shadowOffsetY = -this.mouseDownScrollTop + dy;
			var shadowGroup = pen.group(Object.assign(Object.assign({}, size.globalRect), {
				overflow: "visible",
				batch: false
			}));
			var leftConfigs = this.draggedLeftConfigs;
			var bbox = measureLeftConfigsBBox(leftConfigs);
			var padding = 8;
			var shadowLeft = (bbox ? bbox.left : size.rowStartX) - padding;
			var shadowWidth = bbox ? bbox.right - bbox.left + padding * 2 : Math.min(size.rowWidth, 120);
			var baseY = info.y + shadowOffsetY;
			var baseX = shadowLeft + shadowOffsetX;
			if (this.isMultiMoving) this.drawShadowStackLayers(shadowGroup, baseX, baseY, shadowWidth, info.height);
			shadowGroup.add(pen.config.rect({
				x: baseX,
				y: baseY,
				width: shadowWidth,
				height: info.height,
				background: style.color.normalBackground,
				borderColor: style.color.lightBorderColor,
				borderWidth: 1,
				borderRadius: size.recordBgRadius
			}));
			for (var config of leftConfigs) shadowGroup.add(Object.assign({}, config), shadowOffsetX, shadowOffsetY);
			if (this.isMultiMoving) this.drawShadowCountBadge(shadowGroup, baseX, baseY, shadowWidth);
			this.group.addGroup(shadowGroup);
		};
		/**
		* 绘制多条拖影下方的「层叠矩形」阶梯：`n-1` 个（`n` = 被拖条数），视觉上封顶 {@link MAX_STACK_LAYERS}
		* 个，避免条数很多时堆出过长的尾巴。第 `j` 层（1-based）相对主基座：两侧各内缩 `j * LAYER_INSET_X`、
		* 整体下移 `j * LAYER_PEEK_Y`，因此只有底部 `LAYER_PEEK_Y` 高的一条随层级递窄的 sliver 露出主基座之下。
		*
		* 绘制顺序：j 从大到小（最深/最窄/最靠下的先画），保证靠上的层叠盖在更深层之上；主基座随后由
		* 调用方绘制，覆盖所有层叠的顶部。
		*/ _proto.drawShadowStackLayers = function drawShadowStackLayers(shadowGroup, baseX, baseY, shadowWidth, height) {
			var { size } = this.collector;
			var MAX_STACK_LAYERS = 5;
			var LAYER_INSET_X = 5;
			var LAYER_PEEK_Y = 4;
			for (var j = Math.min(this.movingRecordIds.length - 1, MAX_STACK_LAYERS); j >= 1; j--) {
				var layerWidth = shadowWidth - j * LAYER_INSET_X * 2;
				if (layerWidth <= 0) continue;
				shadowGroup.add(pen.config.rect({
					x: baseX + j * LAYER_INSET_X,
					y: baseY + j * LAYER_PEEK_Y,
					width: layerWidth,
					height,
					background: style.color.normalBackground,
					borderColor: style.color.lightBorderColor,
					borderWidth: 1,
					borderRadius: size.recordBgRadius
				}));
			}
		};
		/**
		* 绘制多条拖影右上角的「总条数」badge：一个浅灰圆角胶囊（圆形/胶囊由 badge 高的一半圆角保证），
		* 中心显示被拖总条数。锚定在主基座右上角（badge 中心落在角点上，向外微溢出），与设计稿一致。
		*/ _proto.drawShadowCountBadge = function drawShadowCountBadge(shadowGroup, baseX, baseY, shadowWidth) {
			var countText = String(this.movingRecordIds.length);
			var BADGE_HEIGHT = 18;
			var BADGE_FONT_SIZE = style.size.fontSizeNormal;
			var textWidth = pen.util.measureTextWidth(countText, BADGE_FONT_SIZE);
			var badgeWidth = Math.max(BADGE_HEIGHT, textWidth + 10);
			var badgeX = baseX + shadowWidth - badgeWidth / 2;
			var badgeY = baseY - BADGE_HEIGHT / 2;
			shadowGroup.add(pen.config.rect({
				x: badgeX,
				y: badgeY,
				width: badgeWidth,
				height: BADGE_HEIGHT,
				background: style.color.tagBackground,
				borderColor: style.color.lightBorderColor,
				borderWidth: 1,
				borderRadius: BADGE_HEIGHT / 2
			}));
			shadowGroup.add(pen.config.text({
				text: countText,
				x: badgeX,
				y: badgeY,
				width: badgeWidth,
				height: BADGE_HEIGHT,
				fontSize: BADGE_FONT_SIZE,
				fontStyle: "500",
				color: style.color.normalFontColor,
				align: "center",
				verticalAlign: "middle",
				wrap: "none",
				ellipsis: true
			}));
		};
		/**
		* 绘制落点基准线；dropRowIndex = -1 时不绘制。
		*
		* z-order 说明：feature 主 `this.group` 在 draw 时先绘 pool 里的 DrawConfig、再绘 `groups`
		* 数组里的子 group（见 `Group.draw`：`this.pool.draw(context)` → `this.groups.forEach(...)`）。
		* 基准线通过独立 group + addGroup 承载；`redraw` 中先 push 基准线 group、后 push 拖影 group，
		* 保证拖影绘制在基准线之上（拖影视觉上"盖住"下方指示线的相交区域，更贴近原生拖拽反馈）。
		*
		* 基准线水平范围：
		* - 左端 = 「目标父深度所对应的第一层子记录竖线中心 X」。与 `content.collectSubTreeLines`
		*   的 `vertLineCenterX` 严格同源：
		*     leftStartX(depth) = baseStartX + 2 + depth * subIndentWidth
		*     lineCenterX(depth) = leftStartX(depth) - subIndentWidth/2 + subLineCenterOffsetX
		*   其中 `baseStartX = hasGroup ? groupedRecordStartX : groupValueStartX`。语义：
		*   - `depth = 0` → 顶层竖线位置（等价于旧行为，用户拖到 b 之上时的基准线）；
		*   - `depth = k` → 第 k 层缩进列的竖线中心（例如 depth=1 就是"作为 a 的子"时的红线位置）。
		*   目标深度由 {@link updateDropParent} 依鼠标 X 与候选区间拟合得到，跨父子层级的临界处理与
		*   `views/grid/features/pc/field-move` 里"列 vs 列编组"的临界思路一致。
		* - 右端 = `size.rowStartX + size.rowWidth` 行内容右沿。
		*/ _proto.drawDropLine = function drawDropLine() {
			if (this.dropRowIndex === -1 || !this.group) return;
			var anchor = this.collector.rows.getInfo(this.dropRowIndex);
			if (!anchor || anchor.type !== RowType.Record) return;
			var { size, range } = this.collector;
			var y = anchor.y - range.scrollTop + (this.dropBeforeRecord ? 0 : anchor.height);
			var lineLeftX = this.getDropIndentLineX();
			var lineRightX = size.rowStartX + size.rowWidth;
			var lineWidth = Math.max(0, lineRightX - lineLeftX);
			var lineGroup = pen.group(Object.assign(Object.assign({}, size.globalRect), { overflow: "visible" }));
			lineGroup.add(pen.config.line({
				x: lineLeftX,
				y,
				points: [
					0,
					0,
					lineWidth,
					0
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: 2
			}));
			this.group.addGroup(lineGroup);
		};
		_proto.applyDrop = function applyDrop() {
			var anchor = this.collector.rows.getInfo(this.dropRowIndex);
			if (!anchor || anchor.type !== RowType.Record) return;
			var dropGroupPath = this.getRecordGroupPath(anchor.recordId);
			var { prevRecordId, nextRecordId } = this.resolveDropNeighbors(anchor, this.dropBeforeRecord, dropGroupPath);
			applyMovedRecordBehavior(this.movingRecordIds, prevRecordId, nextRecordId, dropGroupPath, this.context, this.collector, this.dropParentId);
		};
		/**
		* 取指定索引处的 record id，仅当它属于 `expectedGroupPath` 且不是被拖 record 本身时返回；
		* 否则返回 null（用于 nextRecordId）/ undefined 兼容位（由调用侧转换）。
		*
		* 跨分组场景下常见：anchor 位于目标分组开头 → anchorIdx-1 是**上一分组**最后一条 record，
		* 它属于别的分组、也不应作为 movingRecord 新的父子邻居参与推导。
		*
		* 跳过被拖行的语义：命中任一被拖 record 时按 `direction` 继续向同方向前进，**跳过所有被拖行**——
		* 因为一次移动的语义是"先把被拖 record 从原位移除、再插入到 slot"，slot 的邻居应当是
		* "被拖行都不存在时的相邻 record"。若不跳过，`isFinalSlotSameAsOrigin` / core.moveRecord 会拿到
		* 断裂的邻居（例如 a2/a3 间隙 (anchor=a2, before=false) 时 next 命中被拖的 a3 就返回 null，
		* 但语义上真正的 next 是跨过 a3 之后的 b）。多条拖拽时同理跨过整个被拖集合。
		*/ _proto.getSameGroupNeighborId = function getSameGroupNeighborId(displayedRecordIds, idx, expectedGroupPath, direction = 1) {
			var cursor = idx;
			while (cursor >= 0 && cursor < displayedRecordIds.length) {
				var candidate = displayedRecordIds[cursor];
				if (!candidate) return null;
				if (this.movingRecordIdSet.has(candidate)) {
					cursor += direction;
					continue;
				}
				if (!isSameGroupPath(this.getRecordGroupPath(candidate), expectedGroupPath)) return null;
				return candidate;
			}
			return null;
		};
		_proto.attachListeners = function attachListeners() {
			this.cancelListeners();
			this.mouseMoveDisposable = this.UIEvent.window.onMouseMove(this.onWindowMouseMove);
			this.mouseUpDisposable = this.UIEvent.document.onMouseUp(this.onDocumentMouseUp);
			this.escDisposable = registerEscToCancel(this.UIEvent, () => this.clearAll());
		};
		_proto.cancelListeners = function cancelListeners() {
			var _a, _b, _c;
			(_a = this.mouseMoveDisposable) === null || _a === void 0 || _a.dispose();
			(_b = this.mouseUpDisposable) === null || _b === void 0 || _b.dispose();
			(_c = this.escDisposable) === null || _c === void 0 || _c.dispose();
			this.mouseMoveDisposable = void 0;
			this.mouseUpDisposable = void 0;
			this.escDisposable = void 0;
		};
		_proto.abortDragging = function abortDragging() {
			if (this.isInDragging) return;
			if (!this.mouseDownRecordId) return;
			this.clearAll();
		};
		_proto.clearAll = function clearAll() {
			var _a;
			this.cancelListeners();
			(_a = this.group) === null || _a === void 0 || _a.clear();
			this.mouseDownRecordId = "";
			this.movingRecordIds = [];
			this.movingRecordIdSet = /* @__PURE__ */ new Set();
			this.clickRowInfo = void 0;
			this.clickGroupPath = [];
			this.movingSubTreeHeight = 0;
			this.mouseDownScrollTop = 0;
			this.draggedLeftConfigs = [];
			this.isDropExceedLimit = false;
			this.dropRowIndex = -1;
			this.dropBeforeRecord = true;
			this.dropParentDepth = 0;
			this.dropParentId = null;
			this.isInDragging = false;
			this.setCursor(Cursor.DEFAULT);
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return Boolean(this.featureLock.isPreventFromOtherFeature(IListRecordMove));
		};
		_create_class$3(ListRecordMove, [{
			key: "isMultiMoving",
			get: function() {
				return this.movingRecordIds.length > 1;
			}
		}]);
		return ListRecordMove;
	}(ListFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/scroller/interface.js
var IListScroller;
var init_interface$1 = __esmMin((() => {
	init_module();
	IListScroller = createDecorator("IListScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/scroller/main.js
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
var ListScroller;
var init_main$2 = __esmMin((() => {
	init_esm();
	init_scroller();
	init_interface$6();
	init_list_feature();
	init_interface$1();
	ListScroller = /* @__PURE__ */ function(ListFeatureBase) {
		"use strict";
		_inherits$12(ListScroller, ListFeatureBase);
		function ListScroller() {
			var _this = ListFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				var _a;
				(_a = _this.vertical) === null || _a === void 0 || _a.updatePosition();
			};
			/**
			* 与 grid GridScroller 同款语义：滚动条 hover 或拖拽中，视为高优先级锁，
			* 阻断其他 feature（hover/area-interactive 等）的交互响应。
			* 通过 BaseFeature 构造时自动注册到 featureLock，业务 feature 在自身入口处
			* 调用 featureLock.isPreventFromOtherFeature(IXxx) 即可短路。
			*/ _this.isHovering = () => {
				var _a, _b;
				return ((_a = _this.vertical) === null || _a === void 0 ? void 0 : _a.isHovering()) || ((_b = _this.vertical) === null || _b === void 0 ? void 0 : _b.isDragging()) || false;
			};
			_this.onWheel = ({ scrollInfo }) => {
				var { deltaY } = scrollInfo;
				if (deltaY === 0) return;
				_this.collector.range.scrollByDelta(deltaY / _this.collector.size.scale);
			};
			/** range 滚动回调：同时驱动 sticky 计算与滚动条位置刷新 */ _this.onRangeScroll = () => {
				var _a;
				_this.updateSticky();
				(_a = _this.vertical) === null || _a === void 0 || _a.updatePosition();
			};
			/**
			* 找到当前应吸顶的 GroupHead 并计算 offsetY，转交给 renderer 绘制。
			*/ _this.updateSticky = () => {
				var _a, _b;
				var { rows, range, size } = _this.collector;
				var { scrollTop } = range;
				var headHeight = size.groupHeadHeight;
				var stickyIndex = -1;
				var nextHeadY = Infinity;
				var groupHeads = [];
				rows.forEachRowInfo((info) => {
					if (info.type === RowType.GroupHead && info.height > 0 && info.level === 0) groupHeads.push({
						index: info.index,
						y: info.y
					});
				});
				groupHeads.sort((a, b) => a.y - b.y);
				for (var i = 0; i < groupHeads.length; i++) {
					var head = groupHeads[i];
					if (head.y <= scrollTop) {
						stickyIndex = head.index;
						nextHeadY = (_b = (_a = groupHeads[i + 1]) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : Infinity;
					} else break;
				}
				if (stickyIndex < 0) {
					_this.parentApi.setStickyHead(-1, 0);
					return;
				}
				var offsetY = 0;
				if (nextHeadY < Infinity) {
					var overlap = scrollTop + headHeight - nextHeadY;
					if (overlap > 0) offsetY = -overlap;
				}
				_this.parentApi.setStickyHead(stickyIndex, offsetY);
			};
			return _this;
		}
		var _proto = ListScroller.prototype;
		_proto.bootstrap = function bootstrap() {
			this._register(this.UIEvent.stage.onWheel(this.onWheel));
			this._register(this.collector.range.onScroll(this.onRangeScroll));
			this.vertical = this._register(new CommonScroller({
				vertical: true,
				autoHide: ua.isMobile,
				id: "list-v-scroller",
				root: this.root,
				getViewRect: () => this.getViewRect(),
				getScrollTop: () => this.collector.range.scrollTop * this.collector.size.scale,
				getScrollHeight: () => this.collector.rows.scrollHeight * this.collector.size.scale,
				scrollToY: (y) => this.collector.range.scrollToY(y / this.collector.size.scale)
			}));
			this.updateSticky();
			this.vertical.updatePosition();
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { high: {
				id: IListScroller,
				isLock: () => this.isHovering()
			} };
		};
		/** list 全屏滚动，view rect = root 全画布像素区域（含 scale） */ _proto.getViewRect = function getViewRect() {
			var { size } = this.collector;
			var { scale } = size;
			var { x, y, width, height } = size.globalRect;
			return {
				x: x * scale,
				y: y * scale,
				width: width * scale,
				height: height * scale
			};
		};
		return ListScroller;
	}(ListFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/tooltip/interface.js
var IListTooltip;
var init_interface = __esmMin((() => {
	init_module();
	IListTooltip = createDecorator("IListTooltip");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/tooltip/main.js
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
var ListTooltip;
var init_main$1 = __esmMin((() => {
	init_is_in_rect();
	init_list_feature();
	init_hover_tooltip_controller();
	ListTooltip = /* @__PURE__ */ function(ListFeatureBase) {
		"use strict";
		_inherits$11(ListTooltip, ListFeatureBase);
		function ListTooltip() {
			var _this = ListFeatureBase.apply(this, arguments) || this;
			_this.controller = null;
			/**
			* 由 parentApi.render() 调用：底层数据 / 几何 / 滚动变化后保证 tooltip group 自身的 clip 与
			* 当前 stage 一致；并强制 hide 一次，避免旧锚点错位停留在屏幕上（与 ListHover.render 同款语义）。
			*/ _this.render = () => {
				var _a;
				(_a = _this.controller) === null || _a === void 0 || _a.syncStageRect();
			};
			return _this;
		}
		var _proto = ListTooltip.prototype;
		_proto.bootstrap = function bootstrap() {
			this.controller = new HoverTooltipController({
				layer: this.layer,
				getStageRect: () => this.collector.size.globalRect,
				uiEvent: this.UIEvent,
				onScroll: this.collector.range.onScroll,
				resolveHit: (stageX, stageY, target) => this.resolveHit(stageX, stageY, target)
			});
			this._register(makeHoverTooltipDisposable(this.controller));
		};
		/**
		* 命中分发：必须在 record 行才可能触发任何 tooltip。
		*/ _proto.resolveHit = function resolveHit(stageX, stageY, target) {
			var _a, _b, _c;
			if (!(target === null || target === void 0 ? void 0 : target.isRecordRow) || !target.recordId) return null;
			var info = this.collector.content.getRecordRenderInfo(target.recordId);
			if (!info) return null;
			var scrollTop = this.collector.range.scrollTop;
			var absY = stageY + scrollTop;
			return (_c = (_b = (_a = this.resolveBareIconHit(target.recordId, stageX, absY, scrollTop, info)) !== null && _a !== void 0 ? _a : this.resolveTagPillHit(target.recordId, stageX, absY, scrollTop, info.bodyTagPillRects)) !== null && _b !== void 0 ? _b : this.resolveAvatarHit(target.recordId, stageX, absY, scrollTop, info.ownerAvatarSlots)) !== null && _c !== void 0 ? _c : this.resolveDateHit(target.recordId, stageX, absY, scrollTop, info);
		};
		/**
		* 状态 icon 粒度命中：
		* icon rect 为全局坐标（未扣 scrollTop），命中后扣 scrollTop 转 stage 视口坐标。
		*
		* 优先级列的 tooltip 已合并进 body tag row 的 pill 命中链路（`resolveTagPillHit`），
		* 由 `collectBodyTag({ expandIconOnly: true })` 产出的 icon+文案 pill 自然承接。
		*/ _proto.resolveBareIconHit = function resolveBareIconHit(recordId, stageX, absY, scrollTop, info) {
			if (info.statusIconRect && info.statusIconTooltipLabel) {
				if (isHitRect(stageX, absY, info.statusIconRect)) return {
					id: `record:${recordId}/statusIcon`,
					anchorRect: {
						x: info.statusIconRect.x,
						y: info.statusIconRect.y - scrollTop,
						width: info.statusIconRect.width,
						height: info.statusIconRect.height
					},
					label: info.statusIconTooltipLabel
				};
			}
			return null;
		};
		/**
		* 标签组 pill 粒度命中（状态 / 优先级 iconOnly pill）：
		* pill rect 为全局坐标（未扣 scrollTop），命中后扣 scrollTop 转 stage 视口坐标。
		*/ _proto.resolveTagPillHit = function resolveTagPillHit(recordId, stageX, absY, scrollTop, pillRects) {
			if (!(pillRects === null || pillRects === void 0 ? void 0 : pillRects.length)) return null;
			for (var i = 0; i < pillRects.length; i++) {
				var pill = pillRects[i];
				if (!pill.tooltipLabel) continue;
				if (!isHitRect(stageX, absY, pill.rect)) continue;
				var anchorRect = {
					x: pill.rect.x,
					y: pill.rect.y - scrollTop,
					width: pill.rect.width,
					height: pill.rect.height
				};
				return {
					id: `record:${recordId}/pill:${i}`,
					anchorRect,
					label: pill.tooltipLabel
				};
			}
			return null;
		};
		/**
		* 单头像粒度命中：
		* 1) 从该 record 的 `ownerAvatarSlots` 倒序遍历（高 z 优先，还原「左压右」语义），
		*    把鼠标的「全局坐标 absY = stageY + scrollTop」与 slot.rect 做 isHitRect 命中；
		* 2) 命中 slot 后把其 rect 转 stage 视口坐标系（y - scrollTop）作为 tooltip anchorRect；
		* 3) `id` 使用 `recordId + slotIndex` 拼接，保证：
		*    - 跨 record 不同槽 id 必不同；
		*    - 同一行内移动鼠标在不同槽间切换时 id 变 → controller 触发淡出 + 淡入；
		*    - 在同一个槽内移动 mouseMove → id 不变 → 无重画（避免闪烁）。
		*/ _proto.resolveAvatarHit = function resolveAvatarHit(recordId, stageX, absY, scrollTop, slots) {
			if (!(slots === null || slots === void 0 ? void 0 : slots.length)) return null;
			for (var i = slots.length - 1; i >= 0; i--) {
				var slot = slots[i];
				if (!isHitRect(stageX, absY, slot.rect)) continue;
				var anchorRect = {
					x: slot.rect.x,
					y: slot.rect.y - scrollTop,
					width: slot.rect.width,
					height: slot.rect.height
				};
				return {
					id: `record:${recordId}/avatar:${i}`,
					anchorRect,
					label: slot.tooltipLabel
				};
			}
			return null;
		};
		/**
		* date 段（行右侧相对时间）粒度命中：
		* 相对时间文本本身只显示"5 分钟前 / 刚刚"这类简写，用户 hover 时需要展开为「完整时间」
		* （如 `2026-06-25 19:53`）核对。命中区用 `info.dateRect`（对齐槽宽），保证短文本时命中区
		* 不至于太窄；label 直接用 `info.dateTooltipLabel`（field.format 已格式化好的绝对时间，
		* 与列原生 DateTime 渲染同源）。
		*
		* `dateTooltipLabel` 空时（完整文本取不到）不弹 tooltip：与 statusIcon/priorityIcon 的处理对称。
		*/ _proto.resolveDateHit = function resolveDateHit(recordId, stageX, absY, scrollTop, info) {
			if (!info.dateRect || !info.dateTooltipLabel) return null;
			if (!isHitRect(stageX, absY, info.dateRect)) return null;
			return {
				id: `record:${recordId}/date`,
				anchorRect: {
					x: info.dateRect.x,
					y: info.dateRect.y - scrollTop,
					width: info.dateRect.width,
					height: info.dateRect.height
				},
				label: info.dateTooltipLabel
			};
		};
		return ListTooltip;
	}(ListFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/features/pc/entries.js
/**
* ListView PC 端 features：
* - storage-sync：分组折叠态本地记忆的兜底落盘时机（beforeunload / visibilitychange /
*   点击画布外），与 `StateCenter.setGroupFoldState` 的"每次点击及时落盘"互补；
* - auto-scroll：拖拽到可视区上下边缘时的自动滚屏（复用 grid 同款 AutoScroll 插件），仅 Y 向，
*   由 record-move 在进入拖拽时开启；无绘制、无交互监听（插件自管 window 事件），注册顺序不敏感；
* - scroller：垂直滚动 + GroupHead sticky；
* - hover：分组头折叠按钮 / 加号 / record 行 / checkbox 的 hover 反馈 + 点击事件；
* - record-move：record 行拖拽移动 + 落点父子记录（sys_parent_id）同步；
* - tooltip：通用 hover→tooltip 浮层（owner 头像单槽显示用户名 / 来源标签显示完整 displayName
*   等共用同一深色胶囊浮层 + 渐入渐出）。注册在 hover 之后：feature layer 后注册的 group
*   视觉位于上层，让 tooltip 永远盖在 hover 之上。
*
* 移动端 features 后续根据需求补充，本次不做。
*/ function getPcFeatures() {
	return [
		{
			id: IListStorageSync,
			ctor: ListStorageSync,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IListAutoScroll,
			ctor: ListAutoScroll,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IListScroller,
			ctor: ListScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IListHover,
			ctor: ListHover,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IListRecordMove,
			ctor: ListRecordMove,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IListTooltip,
			ctor: ListTooltip,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries = __esmMin((() => {
	init_auto_scroll();
	init_storage_sync();
	init_interface$3();
	init_main$4();
	init_interface$2();
	init_main$3();
	init_interface$1();
	init_main$2();
	init_interface();
	init_main$1();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/event-handler/index.js
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
var import_main$3, ListEventHandler;
var init_event_handler = __esmMin((() => {
	import_main$3 = require_main();
	init_feature_event();
	init_interface$6();
	init_is_in_rect();
	ListEventHandler = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$10(ListEventHandler, Disposable);
		function ListEventHandler(stage, root, rendererModel, getStickyHead = () => ({
			index: -1,
			offsetY: 0
		})) {
			var _this = Disposable.call(this) || this;
			_this.stage = stage;
			_this.root = root;
			_this.rendererModel = rendererModel;
			_this.getStickyHead = getStickyHead;
			_this.getTarget = (offset) => {
				var { x, y } = offset;
				var { size, range, rows } = _this.rendererModel.collector;
				var isOutStage = !isHitRect(x, y, size.globalRect);
				var target = {
					isOutStage,
					isBlank: true
				};
				if (isOutStage) return target;
				var sticky = _this.getStickyHead();
				if (sticky.index >= 0 && y >= sticky.offsetY && y < sticky.offsetY + size.groupHeadHeight) {
					var stickyRow = rows.getInfo(sticky.index);
					if ((stickyRow === null || stickyRow === void 0 ? void 0 : stickyRow.type) === RowType.GroupHead) {
						_this.hitStickyGroupHead(target, stickyRow, sticky.offsetY, x, y);
						target.isBlank = false;
						return target;
					}
				}
				var absY = y + range.scrollTop;
				var rowInfo = _this.findRowByAbsY(absY);
				if (!rowInfo) return target;
				target.rowInfo = rowInfo;
				target.isBlank = false;
				if (rowInfo.type === RowType.GroupHead) {
					_this.hitGroupHead(target, rowInfo, x, y);
					return target;
				}
				if (rowInfo.type === RowType.Record) {
					_this.hitRecord(target, rowInfo, x, y);
					return target;
				}
				return target;
			};
			_this.UIEvent = _this._register(new FeatureUIEvent({
				root,
				stage,
				getScale: () => _this.rendererModel.collector.size.scale,
				targetGetter: (offset) => _this.getTarget(offset)
			}));
			return _this;
		}
		var _proto = ListEventHandler.prototype;
		_proto.hitGroupHead = function hitGroupHead(target, rowInfo, x, y) {
			var { content, range } = this.rendererModel.collector;
			target.isGroupHead = true;
			var renderInfo = content.getGroupRenderInfo(rowInfo.path);
			if (!renderInfo) return;
			target.groupIndex = renderInfo.groupIndex;
			target.groupPath = rowInfo.path;
			target.recordRowRenderRect = {
				x: renderInfo.rect.x,
				y: renderInfo.rect.y - range.scrollTop,
				width: renderInfo.rect.width,
				height: renderInfo.rect.height
			};
			var foldHit = {
				x: renderInfo.foldIconRect.x,
				y: renderInfo.foldIconRect.y - range.scrollTop,
				width: renderInfo.foldIconRect.width,
				height: renderInfo.foldIconRect.height
			};
			if (isHitRect(x, y, foldHit)) {
				target.isFoldBtn = true;
				target.foldBtnRenderRect = foldHit;
				return;
			}
			if (renderInfo.addIconRect) {
				var addHit = {
					x: renderInfo.addIconRect.x,
					y: renderInfo.addIconRect.y - range.scrollTop,
					width: renderInfo.addIconRect.width,
					height: renderInfo.addIconRect.height
				};
				if (isHitRect(x, y, addHit)) {
					target.isGroupAddBtn = true;
					target.groupAddRenderRect = addHit;
				}
			}
			if (renderInfo.selectAllRect) {
				var selectAllHit = {
					x: renderInfo.selectAllRect.x,
					y: renderInfo.selectAllRect.y - range.scrollTop,
					width: renderInfo.selectAllRect.width,
					height: renderInfo.selectAllRect.height
				};
				if (isHitRect(x, y, selectAllHit)) {
					target.isSelectAllBtn = true;
					target.selectAllRenderRect = selectAllHit;
				}
			}
		};
		/**
		* 命中 sticky GroupHead：与普通 hitGroupHead 同语义，但渲染 rect 用 stickyOffsetY 而非 (y - scrollTop)，
		* 因为 sticky head 在 head 层是按「stickyOffsetY」摆放的，与 scrollTop 无关。
		* 复用 ContentCollector 收集的 foldIconRect/addIconRect 内的「行内相对偏移」做命中测试。
		*/ _proto.hitStickyGroupHead = function hitStickyGroupHead(target, rowInfo, stickyOffsetY, x, y) {
			var { content } = this.rendererModel.collector;
			target.isGroupHead = true;
			target.rowInfo = rowInfo;
			var renderInfo = content.getGroupRenderInfo(rowInfo.path);
			if (!renderInfo) return;
			target.groupIndex = renderInfo.groupIndex;
			target.groupPath = rowInfo.path;
			var stickyDeltaY = stickyOffsetY - renderInfo.rect.y;
			target.recordRowRenderRect = {
				x: renderInfo.rect.x,
				y: stickyOffsetY,
				width: renderInfo.rect.width,
				height: renderInfo.rect.height
			};
			var foldHit = {
				x: renderInfo.foldIconRect.x,
				y: renderInfo.foldIconRect.y + stickyDeltaY,
				width: renderInfo.foldIconRect.width,
				height: renderInfo.foldIconRect.height
			};
			if (isHitRect(x, y, foldHit)) {
				target.isFoldBtn = true;
				target.foldBtnRenderRect = foldHit;
				return;
			}
			if (renderInfo.addIconRect) {
				var addHit = {
					x: renderInfo.addIconRect.x,
					y: renderInfo.addIconRect.y + stickyDeltaY,
					width: renderInfo.addIconRect.width,
					height: renderInfo.addIconRect.height
				};
				if (isHitRect(x, y, addHit)) {
					target.isGroupAddBtn = true;
					target.groupAddRenderRect = addHit;
				}
			}
			if (renderInfo.selectAllRect) {
				var selectAllHit = {
					x: renderInfo.selectAllRect.x,
					y: renderInfo.selectAllRect.y + stickyDeltaY,
					width: renderInfo.selectAllRect.width,
					height: renderInfo.selectAllRect.height
				};
				if (isHitRect(x, y, selectAllHit)) {
					target.isSelectAllBtn = true;
					target.selectAllRenderRect = selectAllHit;
				}
			}
		};
		_proto.hitRecord = function hitRecord(target, rowInfo, x, y) {
			var { size, range, dataUtil } = this.rendererModel.collector;
			target.isRecordRow = true;
			target.recordId = rowInfo.recordId;
			target.recordRowRenderRect = {
				x: rowInfo.x,
				y: rowInfo.y - range.scrollTop,
				width: size.rowWidth,
				height: rowInfo.height
			};
			if (x < (dataUtil.hasGroup() ? size.groupLineCenterX : size.groupValueStartX)) target.isRecordLeftGutter = true;
			var cbHit = {
				x: rowInfo.x + size.checkboxPaddingLeft,
				y: rowInfo.y - range.scrollTop + (rowInfo.height - size.checkboxSize) / 2,
				width: size.checkboxSize,
				height: size.checkboxSize
			};
			if (isHitRect(x, y, cbHit)) {
				target.isCheckbox = true;
				target.checkboxRenderRect = cbHit;
			}
		};
		/** 通过绝对 y 找到命中行；O(行数)，对 list 视图常规规模够用 */ _proto.findRowByAbsY = function findRowByAbsY(absY) {
			var { rows } = this.rendererModel.collector;
			var hit;
			rows.forEachRowInfo((info) => {
				if (info.height === 0) return;
				if (info.type === RowType.RecordRange) {
					var range = info;
					if (absY >= range.y && absY < range.y + range.height) {
						var offset = Math.floor((absY - range.y) / this.rendererModel.collector.size.recordHeight);
						var clamped = Math.max(0, Math.min(range.recordIds.length - 1, offset));
						hit = rows.getInfo(range.index + clamped);
					}
					return;
				}
				if (absY >= info.y && absY < info.y + info.height) hit = info;
			});
			return hit;
		};
		return ListEventHandler;
	}(import_main$3.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/renderer/main/widgets/group-head.js
var GroupHeadWidget;
var init_group_head = __esmMin((() => {
	GroupHeadWidget = /* @__PURE__ */ function() {
		"use strict";
		function GroupHeadWidget() {}
		var _proto = GroupHeadWidget.prototype;
		/** scrollOffsetY：传入 -scrollTop，所有 DrawConfig 内置 y 已是绝对坐标，统一加偏移即可。 */ _proto.draw = function draw(container, info, scrollOffsetY) {
			container.add(info.background, 0, scrollOffsetY);
			container.add(info.foldIcon, 0, scrollOffsetY);
			for (var cfg of info.decorationConfigs) container.add(cfg, 0, scrollOffsetY);
			if (info.groupValueConfigs && info.groupValueConfigs.length > 0) for (var cfg1 of info.groupValueConfigs) container.add(cfg1, 0, scrollOffsetY);
			else container.add(info.groupValueText, 0, scrollOffsetY);
			if (info.countText) container.add(info.countText, 0, scrollOffsetY);
			if (info.addIcon) container.add(info.addIcon, 0, scrollOffsetY);
			if (info.selectAllText) container.add(info.selectAllText, 0, scrollOffsetY);
		};
		return GroupHeadWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/renderer/main/widgets/record.js
var RecordWidget;
var init_record = __esmMin((() => {
	init_pen();
	RecordWidget = /* @__PURE__ */ function() {
		"use strict";
		function RecordWidget() {}
		var _proto = RecordWidget.prototype;
		_proto.draw = function draw(container, info, scrollOffsetY) {
			var _a;
			if (info.selectedBg) container.add(info.selectedBg, 0, scrollOffsetY);
			for (var config of info.subTreeConfigs) container.add(config, 0, scrollOffsetY);
			for (var config1 of info.leftConfigs) container.add(config1, 0, scrollOffsetY);
			for (var config2 of info.rightConfigs) container.add(config2, 0, scrollOffsetY);
			if ((_a = info.ownerAvatarConfigs) === null || _a === void 0 ? void 0 : _a.length) {
				var containerAttrs = container.getAttrs();
				var avatarGroup = pen.group({
					x: containerAttrs.x,
					y: containerAttrs.y,
					width: containerAttrs.width,
					height: containerAttrs.height,
					batch: false,
					overflow: "visible"
				});
				for (var config3 of info.ownerAvatarConfigs) avatarGroup.add(Object.assign({}, config3), 0, scrollOffsetY);
				container.addGroup(avatarGroup);
			}
			if (info.selectedCheckbox) container.add(info.selectedCheckbox, 0, scrollOffsetY);
		};
		return RecordWidget;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/renderer/main/index.js
var MainRenderer;
var init_main = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_interface$6();
	init_group_head();
	init_record();
	MainRenderer = /* @__PURE__ */ function() {
		"use strict";
		function MainRenderer(rendererModel) {
			this.rendererModel = rendererModel;
			this.groupHeadWidget = new GroupHeadWidget();
			this.recordWidget = new RecordWidget();
		}
		var _proto = MainRenderer.prototype;
		/** 渲染 body 层：record 行 + 非吸顶的 GroupHead 行；整表无 record 时改为绘制空态文案 */ _proto.renderBody = function renderBody(bodyContainer, stickyHeadIndex) {
			var { rows, range, content, size, dataUtil } = this.rendererModel.collector;
			if (rows.recordCount === 0 && !dataUtil.hasWbVirtualGroups()) {
				this.renderEmptyTip(bodyContainer, size.rootWidth, size.emptyTipPaddingTop);
				return;
			}
			var { start, end } = range.getRowRange();
			if (end < start) return;
			var scrollOffsetY = -range.scrollTop;
			rows.forEachRowInfo((info) => {
				if (info.height === 0) return;
				if (info.type === RowType.GroupHead) {
					if (info.index === stickyHeadIndex) return;
					if (info.index < start || info.index > end) return;
					var renderInfo = content.getGroupRenderInfo(info.path);
					if (renderInfo) this.groupHeadWidget.draw(bodyContainer, renderInfo, scrollOffsetY);
					return;
				}
				if (info.type === RowType.RecordRange) {
					var rangeStart = info.index;
					if (info.index + info.recordIds.length - 1 < start || rangeStart > end) return;
					var firstOffset = Math.max(0, start - rangeStart);
					var lastOffset = Math.min(info.recordIds.length - 1, end - rangeStart);
					for (var offset = firstOffset; offset <= lastOffset; offset++) {
						var recordId = info.recordIds[offset];
						var renderInfo1 = content.getRecordRenderInfo(recordId);
						if (renderInfo1) this.recordWidget.draw(bodyContainer, renderInfo1, scrollOffsetY);
					}
					return;
				}
			});
		};
		/** 在 head 层绘制 sticky GroupHead（由 scroller feature 决定的 stickyOffsetY） */ _proto.renderStickyHead = function renderStickyHead(headContainer, groupHeadIndex, stickyOffsetY) {
			var { rows, content } = this.rendererModel.collector;
			var rowInfo = rows.getInfo(groupHeadIndex);
			if (!rowInfo || rowInfo.type !== RowType.GroupHead) return;
			var renderInfo = content.getGroupRenderInfo(rowInfo.path);
			if (!renderInfo) return;
			this.groupHeadWidget.draw(headContainer, renderInfo, stickyOffsetY - rowInfo.y);
		};
		/**
		* 整表零记录时的空态引导文案。
		*/ _proto.renderEmptyTip = function renderEmptyTip(bodyContainer, rootWidth, paddingTop) {
			var { size } = this.rendererModel.collector;
			bodyContainer.add(pen.config.text({
				text: i18n.t("伟大的计划从这里开始，快来新建待办吧"),
				x: 0,
				y: paddingTop,
				width: rootWidth,
				height: size.emptyTipHeight,
				fontSize: size.emptyTipFontSize,
				color: style.color.lightFontColor,
				align: "center",
				wrap: "none",
				verticalAlign: "top"
			}));
		};
		return MainRenderer;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/renderer/index.js
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
var ListRenderer;
var init_renderer = __esmMin((() => {
	init_pen();
	init_event_handler();
	init_main();
	init_base_renderer();
	ListRenderer = /* @__PURE__ */ function(BaseRenderer) {
		"use strict";
		_inherits$9(ListRenderer, BaseRenderer);
		function ListRenderer(rendererModel, root) {
			var _this = BaseRenderer.call(this, root, rendererModel.collector.dataUtil.getContext()) || this;
			_this.rendererModel = rendererModel;
			_this.stickyHeadIndex = -1;
			_this.stickyOffsetY = 0;
			_this.isRendering = false;
			_this.collector = _this.rendererModel.collector;
			_this.headLayer = _this._register(pen.layer(_this.headLayerConfig));
			_this.bodyLayer = _this._register(pen.layer(_this.bodyLayerConfig));
			_this.featureLayer = _this._register(pen.layer(_this.featureLayerConfig));
			_this.headContainer = _this._register(pen.group(_this.headContainerConfig));
			_this.bodyContainer = _this._register(pen.group(_this.bodyContainerConfig));
			_this.headLayer.addGroup(_this.headContainer);
			_this.bodyLayer.addGroup(_this.bodyContainer);
			_this.stage.addLayer(_this.bodyLayer);
			_this.stage.addLayer(_this.headLayer);
			_this.stage.addLayer(_this.featureLayer);
			_this.mainRenderer = new MainRenderer(_this.rendererModel);
			_this._register(_this.rendererModel.onRenderModelChange(() => {
				_this.render();
			}));
			_this.eventHandler = _this._register(new ListEventHandler(_this.stage, root, _this.rendererModel, () => _this.getStickyHead()));
			_this.UIEvent = _this.eventHandler.UIEvent;
			return _this;
		}
		var _proto = ListRenderer.prototype;
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.featureLayer;
		};
		_proto.getHeadLayer = function getHeadLayer() {
			return this.headLayer;
		};
		_proto.getBodyLayer = function getBodyLayer() {
			return this.bodyLayer;
		};
		/** scroller feature 调用此方法设置 sticky head 状态 */ _proto.setStickyHead = function setStickyHead(index, offsetY) {
			if (this.stickyHeadIndex === index && this.stickyOffsetY === offsetY) return;
			this.stickyHeadIndex = index;
			this.stickyOffsetY = offsetY;
			this.render();
		};
		/** 当前 sticky head 状态（index < 0 表示无 sticky） */ _proto.getStickyHead = function getStickyHead() {
			return {
				index: this.stickyHeadIndex,
				offsetY: this.stickyOffsetY
			};
		};
		_proto.render = function render() {
			if (this.isRendering) return;
			this.isRendering = true;
			requestAnimationFrame(() => {
				this.renderMain();
				this.renderFeature();
				this.isRendering = false;
			});
		};
		_proto.renderMain = function renderMain() {
			this.headContainer.clear();
			this.bodyContainer.clear();
			this.mainRenderer.renderBody(this.bodyContainer, this.stickyHeadIndex);
			if (this.stickyHeadIndex >= 0) this.mainRenderer.renderStickyHead(this.headContainer, this.stickyHeadIndex, this.stickyOffsetY);
		};
		_proto.renderFeature = function renderFeature() {
			this.featureRenderer.render();
		};
		_proto.resize = function resize() {
			this.headContainer.setAttrs(this.headContainerConfig);
			this.bodyContainer.setAttrs(this.bodyContainerConfig);
			this.headLayer.setAttrs(this.headLayerConfig);
			this.bodyLayer.setAttrs(this.bodyLayerConfig);
			this.featureLayer.setAttrs(this.featureLayerConfig);
			this.render();
		};
		_proto.getTarget = function getTarget(x, y) {
			return this.eventHandler.getTarget({
				x,
				y
			});
		};
		_create_class$2(ListRenderer, [
			{
				key: "headLayerConfig",
				get: function() {
					var { size } = this.collector;
					return {
						id: "list-head-layer",
						scale: size.scale,
						x: 0,
						y: 0,
						width: size.globalOriginRootWidth,
						height: size.groupHeadHeight * size.scale
					};
				}
			},
			{
				key: "bodyLayerConfig",
				get: function() {
					var { size } = this.collector;
					return {
						id: "list-body-layer",
						scale: size.scale,
						x: 0,
						y: 0,
						width: size.globalOriginRootWidth,
						height: size.globalOriginRootHeight
					};
				}
			},
			{
				key: "featureLayerConfig",
				get: function() {
					var { size } = this.collector;
					return {
						id: "list-feature-layer",
						listening: true,
						scale: size.scale,
						x: 0,
						y: 0,
						width: size.globalOriginRootWidth,
						height: size.globalOriginRootHeight
					};
				}
			},
			{
				key: "headContainerConfig",
				get: function() {
					var { size } = this.collector;
					return {
						x: 0,
						y: 0,
						width: size.rootWidth,
						height: size.groupHeadHeight,
						batch: true
					};
				}
			},
			{
				key: "bodyContainerConfig",
				get: function() {
					var { size } = this.collector;
					return {
						x: 0,
						y: 0,
						width: size.rootWidth,
						height: size.rootHeight,
						batch: true
					};
				}
			}
		]);
		return ListRenderer;
	}(BaseRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/content.js
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
var import_main$2, SYS_TAGS_MIN_RENDER_WIDTH, ContentCollector;
var init_content = __esmMin((() => {
	init_event();
	import_main$2 = require_main();
	init_es();
	init_es$1();
	init_field_collector();
	init_lib();
	init_pen();
	init_resources();
	init_style();
	init_config$2();
	init_interface$6();
	init_color();
	init_avatar_time_utils();
	init_bottom_collectors();
	init_group_key_config();
	init_group_value_rich();
	init_placeholder_record();
	init_wb_cell();
	init_wb_config();
	SYS_TAGS_MIN_RENDER_WIDTH = 30;
	ContentCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$8(ContentCollector, Disposable);
		function ContentCollector(dataUtil, state, size, rows, range) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.state = state;
			_this.size = size;
			_this.rows = rows;
			_this.range = range;
			/** 已收集的 recordId → RecordRenderInfo */ _this.recordInfos = /* @__PURE__ */ new Map();
			/** GroupHead path key → GroupHeadRenderInfo */ _this.groupInfos = /* @__PURE__ */ new Map();
			_this.onContentChangeEmitter = _this._register(new Emitter());
			/** 复用同一份 collectConfig，避免每次 patch 都重新建对象 */ _this.collectConfig = getDefaultContentCollectConfig();
			/**
			* 不同列类型的垂直 padding 覆盖配置；未配置的列类型回退到 size.recordCellPaddingY。
			* 用于解决部分字段（如带圆角徽标/标签的 SingleSelect、MultiSelect 等）在默认 padding 下视觉偏移的问题。
			*/ _this.fieldPaddingYMap = {
				[FieldType.SINGLE_SELECT]: 6,
				[FieldType.MULTIPLE_SELECT]: 6,
				[FieldType.USER_C]: 6
			};
			_this.onContentChange = _this.onContentChangeEmitter.event;
			return _this;
		}
		var _proto = ContentCollector.prototype;
		_proto.collect = function collect() {
			this.collectAllHeads();
			this.collectVisibleRecords();
			this.onContentChangeEmitter.fire();
		};
		_proto.patch = function patch() {
			this.collectAllHeads();
			this.collectVisibleRecords();
			this.onContentChangeEmitter.fire();
		};
		/**
		* 滚动 / 单选切换调用：只重收集可见区域 Record。
		*
		* 设计要点：**GroupHead 不参与本方法**。
		* - GroupHead 的渲染数据（fold/title/decoration/right/...）与 scrollTop 无关，
		*   仅在「结构变化（collect/patch）」「批量模式切换」「全选切换」时变；
		* - 因此本方法在滚动高频路径上对 groupInfos 完全只读，配合 sticky 在 head layer
		*   常驻使用 groupInfos[L0.path]，从根本上避免「滚动一帧重收集所有祖先 head」的 CPU 开销，
		*   也修复了多层分组下 sticky L0 head 因 visible 区间外而消失的问题。
		*/ _proto.collectVisible = function collectVisible() {
			this.collectVisibleRecords();
			this.onContentChangeEmitter.fire();
		};
		/**
		* 批量模式切换 / 全选切换调用：GroupHead 的右侧文案（全选/取消全选）会变，
		* 需要在重收集可见 Record 的同时同步刷新所有 GroupHead 缓存。
		*/ _proto.collectVisibleWithHeads = function collectVisibleWithHeads() {
			this.collectAllHeads();
			this.collectVisibleRecords();
			this.onContentChangeEmitter.fire();
		};
		_proto.getRecordRenderInfo = function getRecordRenderInfo(recordId) {
			return this.recordInfos.get(recordId);
		};
		_proto.getGroupRenderInfo = function getGroupRenderInfo(path) {
			return this.groupInfos.get(this.groupPathKey(path));
		};
		/**
		* 全量重收集**所有** GroupHead（含 L0 / 嵌套层）到 `groupInfos` 持久缓存。
		*
		* 调用时机：仅在「结构层面」发生变化时调用——
		* - collect / patch（数据变更、resize、折叠态变化导致 rows.patch）；
		* - collectVisibleWithHeads（批量模式 / 全选态切换，head 右侧文案变化）。
		*
		* 不在滚动路径上调用：head 渲染数据与 scrollTop 无关，无需随滚动重算。
		*
		* GroupHeadRenderInfo 通常只有十几个字段、分组数量级远小于 Record，
		* 全量常驻缓存内存占用可接受；换来的收益是：
		* - 滚动时零 head 计算；
		* - sticky L0 head 不再受可见区间约束，永远可取（修复 sticky L0 消失问题）。
		*/ _proto.collectAllHeads = function collectAllHeads() {
			var nextKeys = /* @__PURE__ */ new Set();
			this.rows.forEachRowInfo((info) => {
				if (info.type !== RowType.GroupHead || info.height === 0) return;
				this.collectGroupHead(info);
				nextKeys.add(this.groupPathKey(info.path));
			});
			for (var key of [...this.groupInfos.keys()]) if (!nextKeys.has(key)) this.groupInfos.delete(key);
		};
		/**
		* 重收集当前可见区间内的 Record DrawConfig，**不触碰 groupInfos**。
		* 注意：本方法依赖 RowCollector 已经 collect 完成；调用方负责 fire onContentChange。
		*/ _proto.collectVisibleRecords = function collectVisibleRecords() {
			var { start, end } = this.range.getRowRange();
			if (end < start) {
				this.recordInfos.clear();
				return;
			}
			var visibleRecordIds = /* @__PURE__ */ new Set();
			this.rows.forEachRowInfo((info) => {
				if (info.height === 0 || info.index > end) return;
				if (info.type !== RowType.RecordRange) return;
				var rangeStart = info.index;
				if (info.index + info.recordIds.length - 1 < start || rangeStart > end) return;
				var firstOffset = Math.max(0, start - rangeStart);
				var lastOffset = Math.min(info.recordIds.length - 1, end - rangeStart);
				for (var offset = firstOffset; offset <= lastOffset; offset++) {
					var recordId = info.recordIds[offset];
					var recordY = info.y + offset * this.size.recordHeight;
					var prevSelected = offset > 0 && this.state.isRecordSelected(info.recordIds[offset - 1]);
					var nextSelected = offset < info.recordIds.length - 1 && this.state.isRecordSelected(info.recordIds[offset + 1]);
					this.collectRecord(recordId, recordY, prevSelected, nextSelected);
					visibleRecordIds.add(recordId);
				}
			});
			for (var recordId of [...this.recordInfos.keys()]) if (!visibleRecordIds.has(recordId)) this.recordInfos.delete(recordId);
		};
		/**
		* 收集一个 GroupHead 的 DrawConfig。
		*
		* 按 level 分支：
		* - `level === 0`（最外层）：保持原渲染——带圆角灰色背景 + foldIcon + (可选装饰段) + groupValue + count
		*   + 右侧 addIcon 或 selectAll；sticky 候选；
		* - `level >= 1`（嵌套二三层）：无背景；foldIcon + groupValue + count，随后一条横向直线一直延伸到
		*   右侧按钮（addIcon / selectAll）左侧；视觉上与 Record 行齐高，不参与 sticky。
		*
		* 公共部分（fold/addIcon/selectAll 命中矩形与 DrawConfig）由 `collectHeadCommon` 抽出，
		* event-handler / hover feature 直接复用 GroupHeadRenderInfo 的 foldIconRect / addIconRect / selectAllRect
		* 做命中，二三层 head 也天然支持「折叠按钮 + 加号」两个交互点，与需求 4 一致。
		*/ _proto.collectGroupHead = function collectGroupHead(rowInfo) {
			var _a;
			if (((_a = rowInfo.level) !== null && _a !== void 0 ? _a : 0) >= 1) {
				this.collectNestedGroupHead(rowInfo);
				return;
			}
			this.collectTopGroupHead(rowInfo);
		};
		_proto.collectTopGroupHead = function collectTopGroupHead(rowInfo) {
			var _a;
			var { size } = this;
			var rect = {
				x: rowInfo.x,
				y: rowInfo.y,
				width: size.rowWidth,
				height: rowInfo.height
			};
			var currentGroupField = this.dataUtil.getGroupFields()[rowInfo.path.length - 1];
			var groupValueText = applyGroupTextMap(currentGroupField, getGroupValueText(rowInfo.groupValue));
			var keyConf = resolveGroupKeyConf(currentGroupField, groupValueText);
			var background = pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.normalBackground,
				borderRadius: size.headBgRadius
			}));
			var { foldIcon, foldIconRect } = this.collectHeadFoldIcon(rect, rowInfo.fold);
			var decorationConfigs = [];
			var decorationWidth = 0;
			if (keyConf) {
				var decoration = collectGroupKeyDecoration({
					keyConf,
					startX: foldIconRect.x + size.foldIconSize + size.foldIconGap,
					centerY: rect.y + rect.height / 2,
					iconSize: size.headKeyIconSize,
					dotSize: size.headKeyDotSize,
					trailingGap: size.headKeyTitleGap
				});
				decorationConfigs = decoration.configs;
				decorationWidth = decoration.width;
			}
			var { text: emptyOrRawTitle, isEmpty: isEmptyGroup } = resolveGroupHeadTitle(currentGroupField, groupValueText);
			var titleText = (_a = keyConf === null || keyConf === void 0 ? void 0 : keyConf.title) !== null && _a !== void 0 ? _a : emptyOrRawTitle;
			var groupValueX = size.groupValueStartX + decorationWidth;
			var richValue = this.tryCollectRichGroupValue(rowInfo, currentGroupField, keyConf, rect, groupValueX);
			var { groupValueText: groupValueDraw, countText } = this.collectHeadTitle(rect, titleText, groupValueX, String(rowInfo.count), richValue === null || richValue === void 0 ? void 0 : richValue.width, isEmptyGroup);
			var groupIndex = this.findGroupIndexByPath(rowInfo.path);
			var rawGroupText = getGroupValueText(rowInfo.groupValue);
			var headRight = this.collectHeadRight(rect, rowInfo.path, currentGroupField, rawGroupText);
			this.groupInfos.set(this.groupPathKey(rowInfo.path), Object.assign(Object.assign({
				rect,
				background,
				foldIcon,
				foldIconRect,
				decorationConfigs,
				groupValueText: groupValueDraw,
				groupValueConfigs: richValue === null || richValue === void 0 ? void 0 : richValue.configs,
				countText
			}, headRight), {
				groupIndex,
				path: rowInfo.path
			}));
		};
		/**
		* 二三层（level >= 1）GroupHead 渲染：
		* - 无背景 rect；
		* - foldIcon → groupValue + count → 中段一条横向直线 → 右侧 addIcon / selectAll；
		* - 直线颜色取 `style.color.normalBorderColor`，竖直居中、1px；
		* - 不收集 decoration（嵌套层用户无 keyConf 需求）。
		*
		* 复用：fold / right / title helper 与 top 层完全相同；只缺背景与直线。
		*/ _proto.collectNestedGroupHead = function collectNestedGroupHead(rowInfo) {
			var _a, _b, _c, _d;
			var { size } = this;
			var rect = {
				x: rowInfo.x,
				y: rowInfo.y,
				width: size.rowWidth,
				height: rowInfo.height
			};
			var background = pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: "transparent",
				borderRadius: 0
			}));
			var currentGroupField = this.dataUtil.getGroupFields()[rowInfo.path.length - 1];
			var groupValueText = applyGroupTextMap(currentGroupField, getGroupValueText(rowInfo.groupValue));
			var { foldIcon, foldIconRect } = this.collectHeadFoldIcon(rect, rowInfo.fold);
			var groupValueX = size.groupValueStartX;
			var richValue = this.tryCollectRichGroupValue(rowInfo, currentGroupField, void 0, rect, groupValueX);
			var { text: titleText, isEmpty: isEmptyGroup } = resolveGroupHeadTitle(currentGroupField, groupValueText);
			var { groupValueText: groupValueDraw, countText, titleEndX } = this.collectHeadTitle(rect, titleText, groupValueX, String(rowInfo.count), richValue === null || richValue === void 0 ? void 0 : richValue.width, isEmptyGroup);
			var groupIndex = this.findGroupIndexByPath(rowInfo.path);
			var rawGroupText = getGroupValueText(rowInfo.groupValue);
			var headRight = this.collectHeadRight(rect, rowInfo.path, currentGroupField, rawGroupText);
			var lineLeftX = titleEndX + size.nestedHeadLineSideGap;
			var lineRightX = ((_d = (_b = (_a = headRight.addIconRect) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : (_c = headRight.selectAllRect) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : rect.x + rect.width - size.headPaddingX) - size.nestedHeadLineSideGap;
			var decorationConfigs = [];
			if (lineRightX > lineLeftX) decorationConfigs = [pen.config.rect({
				x: lineLeftX,
				y: rect.y + rect.height / 2 - .5,
				width: lineRightX - lineLeftX,
				height: 1,
				background: style.color.lightBorderColor
			})];
			this.groupInfos.set(this.groupPathKey(rowInfo.path), Object.assign(Object.assign({
				rect,
				background,
				foldIcon,
				foldIconRect,
				decorationConfigs,
				groupValueText: groupValueDraw,
				groupValueConfigs: richValue === null || richValue === void 0 ? void 0 : richValue.configs,
				countText
			}, headRight), {
				groupIndex,
				path: rowInfo.path
			}));
		};
		/**
		* 尝试为分组值走「富渲染」（tag pill / 头像 / 单选圆点 / 图片等，与 content 单元格视觉一致）。
		*
		* 命中条件（全部满足）：
		* 1) 未命中 WbSharedConfig 特殊配置（keyConf）—— 命中时已由 keyConf.title + decorationConfigs
		*    组合出视觉，走原文本路径即可；
		* 2) `groupValue` 是**单 cell**（IStandardCell），非数组、非空；数组形态（移动端拍平结构）
		*    grid-list 视图当前不支持，直接回落纯文本兜底；
		* 3) `data.length > 0`——空分组值仍走原「未分组」纯文本；
		* 4) fieldCollector 能给出可绘产物（`configs.length > 0`）。
		*
		* 内容矩形几何：
		* - x = titleStartX；
		* - y = rect.y +（rect.height - 内容高度）/2，与 grid 视图 util-group-value 同源
		*   （tagHeight + borderWidth * 2，垂直居中）；
		* - width = 到右侧按钮左沿的剩余空间；富渲染宽度上限 = 该矩形宽度。
		*
		* 未命中任一条件时返回 undefined，调用方回落原纯文本路径（groupValueText）。
		*/ _proto.tryCollectRichGroupValue = function tryCollectRichGroupValue(rowInfo, groupField, keyConf, rect, titleStartX) {
			var _a;
			if (keyConf || !groupField) return;
			var { groupValue } = rowInfo;
			if (!groupValue || Array.isArray(groupValue)) return;
			if (!((_a = groupValue.data) === null || _a === void 0 ? void 0 : _a.length)) return;
			var { size } = this;
			var maxRight = rect.x + rect.width - size.headPaddingX - size.headAddBtnSize;
			var availableWidth = Math.max(0, maxRight - titleStartX);
			if (availableWidth <= 0) return;
			var contentHeight = style.size.tagLarge + style.size.borderWidth * 2;
			var { configs, width } = collectRichGroupValue(groupValue, groupField, {
				x: titleStartX,
				y: rect.y + (rect.height - contentHeight) / 2,
				width: availableWidth,
				height: contentHeight
			}, ViewType.LIST);
			if (!configs.length) return;
			return {
				configs,
				width
			};
		};
		/** 折叠按钮 DrawConfig + 命中矩形（top / nested 共用） */ _proto.collectHeadFoldIcon = function collectHeadFoldIcon(rect, fold) {
			var { size } = this;
			var foldIconAlias = fold ? NormalIconAlias.CHEVRON_RIGHT : NormalIconAlias.CHEVRON_DOWN;
			var foldIconRect = {
				x: rect.x + size.headPaddingX,
				y: rect.y + (rect.height - size.foldIconSize) / 2,
				width: size.foldIconSize,
				height: size.foldIconSize
			};
			return {
				foldIcon: pen.config.icon(foldIconAlias, Object.assign({}, foldIconRect)),
				foldIconRect
			};
		};
		/**
		* 分组标题（groupValue 文本 + count 文本）DrawConfig（top / nested 共用）。
		*
		* @param titleStartX 文本起点 x（top 层 = groupValueStartX + decorationWidth，nested = groupValueStartX）
		* @param richValueWidth 若分组值走了「富渲染」（tag pill / 头像 / 单选圆点等），传入其
		*   实际占用宽度；count 会紧跟富内容右沿，同时 groupValueText 兜底文本占位宽度收敛为 0
		*   避免与富渲染重叠。未走富渲染时传 undefined，退化到旧的「文本占宽 = 文本 measure」路径。
		* @param isEmpty 是否为「空分组」兜底文案（"{列名}: 空"）。为 true 时切成不加粗 +
		*   `lightUltraFontColor` 浅色，与 grid 视图 util-group-value 的 `isEmptyGroupValue` 分支
		*   同源。默认 false（走原加粗 + normalFontColor 分支）。
		* @returns groupValueText / countText DrawConfig + 内容右沿 X（供 nested 层画直线用）
		*/ _proto.collectHeadTitle = function collectHeadTitle(rect, titleText, titleStartX, countTextValue, richValueWidth, isEmpty = false) {
			var { size } = this;
			var maxTitleRight = rect.x + rect.width - size.headPaddingX - size.headAddBtnSize;
			var titleWidthBudget = richValueWidth !== void 0 ? 0 : Math.max(0, maxTitleRight - titleStartX);
			var titleFontSize = isEmpty ? size.headEmptyTitleFontSize : size.headTitleFontSize;
			var groupValueText = pen.config.text({
				text: titleText,
				x: titleStartX,
				y: rect.y,
				width: titleWidthBudget,
				height: rect.height,
				fontSize: titleFontSize,
				fontStyle: isEmpty ? "" : "500",
				color: isEmpty ? style.color.lightUltraFontColor : style.color.normalFontColor,
				verticalAlign: "middle",
				wrap: "none",
				ellipsis: true
			});
			var usedTitleWidth = richValueWidth !== void 0 ? richValueWidth : Math.min(pen.util.measureTextWidth(titleText, titleFontSize), groupValueText.width);
			var countWidth = pen.util.measureTextWidth(countTextValue, size.headCountFontSize);
			var countX = titleStartX + usedTitleWidth + size.headCountGap;
			return {
				groupValueText,
				countText: pen.config.text({
					text: countTextValue,
					x: countX,
					y: rect.y,
					width: countWidth + 4,
					height: rect.height,
					fontSize: size.headCountFontSize,
					color: style.color.lightUltraFontColor,
					verticalAlign: "middle",
					wrap: "none",
					ellipsis: true
				}),
				titleEndX: countX + countWidth
			};
		};
		/**
		* 右侧按钮区域（top / nested 共用）：
		* - 批量模式下产出 `selectAllText` + `selectAllRect` + `isAllSelected`，无 addIcon；
		* - 非批量模式下按 `shouldShowGroupAddButton(groupField, rawGroupText)` 决定是否产出
		*   `addIcon` + `addIconRect`；业务规则：按 `sys_source` 分组时只有 'manual'（人工手动创建）
		*   分组允许新增，其它来源不画 addIcon（返回空对象），nested 层中段直线会自动延伸到
		*   最右侧 padding 处，视觉上无缝退化。
		*
		* 入参 `path` 用于按"路径前缀"查询该分组（含子孙）的全选状态——多层分组下，
		* 外层 GroupHead 的 `path` 不会出现在 `getGroupFlatten` 里（flatten 只含叶子），
		* 因此全选/取消全选必须用 `path` 走前缀聚合而非 flatten 中的 groupIndex。
		*/ _proto.collectHeadRight = function collectHeadRight(rect, path, groupField, rawGroupText) {
			var { size } = this;
			if (this.state.isBatchSelectMode()) {
				var isAllSelected = this.state.isGroupAllSelected(path);
				var selectAllStr = isAllSelected ? i18n.t("取消全选") : i18n.t("全选");
				var fontSize = size.headSelectAllFontSize;
				var btnWidth = pen.util.measureTextWidth(selectAllStr, fontSize) + 4;
				var selectAllRect = {
					x: rect.x + rect.width - size.headPaddingX - btnWidth,
					y: rect.y,
					width: btnWidth,
					height: rect.height
				};
				return {
					selectAllText: pen.config.text(Object.assign(Object.assign({ text: selectAllStr }, selectAllRect), {
						fontSize,
						fontStyle: "500",
						color: wbColors.cardActiveBorder,
						verticalAlign: "middle",
						wrap: "none",
						ellipsis: true,
						align: "right"
					})),
					selectAllRect,
					isAllSelected
				};
			}
			if (!shouldShowGroupAddButton(groupField, rawGroupText)) return {};
			var addIconRect = {
				x: rect.x + rect.width - size.headPaddingX - size.headAddBtnSize,
				y: rect.y + (rect.height - size.headAddBtnSize) / 2,
				width: size.headAddBtnSize,
				height: size.headAddBtnSize
			};
			return {
				addIcon: pen.config.icon(NormalIconAlias.ADD, Object.assign({}, addIconRect)),
				addIconRect
			};
		};
		_proto.collectRecord = function collectRecord(recordId, y, prevSelected, nextSelected) {
			var _a;
			if (isPlaceholderRecordId(recordId)) {
				this.collectPlaceholderRecord(recordId, y);
				return;
			}
			var { size } = this;
			var rowRect = {
				x: size.rowStartX,
				y,
				width: size.rowWidth,
				height: size.recordHeight
			};
			var isSelected = this.state.isRecordSelected(recordId);
			var isBatchMode = this.state.isBatchSelectMode();
			var selectedBg;
			var selectedCheckbox;
			if (isSelected) {
				var r = size.recordBgRadius;
				var topMerged = prevSelected;
				var bottomMerged = nextSelected;
				var borderRadius;
				if (topMerged && bottomMerged) borderRadius = 0;
				else if (topMerged) borderRadius = [
					0,
					0,
					r,
					r
				];
				else if (bottomMerged) borderRadius = [
					r,
					r,
					0,
					0
				];
				else borderRadius = r;
				selectedBg = pen.config.rect(Object.assign(Object.assign({}, rowRect), {
					background: style.color.selectionBackground,
					borderRadius,
					level: Level.L0
				}));
			}
			if (isSelected || isBatchMode) {
				var cbX = rowRect.x + size.checkboxPaddingLeft;
				var cbY = rowRect.y + (rowRect.height - size.checkboxSize) / 2;
				var cbAlias = isSelected ? NormalIconAlias.CHECKBOX_CHECK_GREEN : getCheckboxIconAlias(false);
				selectedCheckbox = pen.config.icon(cbAlias, {
					x: cbX,
					y: cbY,
					width: size.checkboxSize,
					height: size.checkboxSize
				});
			}
			var rightFieldIds = this.dataUtil.getRightFieldIds();
			var rightContentHeight = rowRect.height;
			var rightConfigs = [];
			var rightTotalWidth = 0;
			var rightCells = [];
			for (var fieldId of rightFieldIds) {
				if (!this.state.isFieldVisible(fieldId)) continue;
				var field = this.dataUtil.getFieldByFieldId(fieldId);
				if (!field) continue;
				var cell = this.dataUtil.getStandardCell(fieldId, recordId);
				rightCells.push({
					field,
					cell,
					fieldId
				});
			}
			var cursorRightX = rowRect.x + rowRect.width - size.globalPaddingRight;
			var ownerAvatarRect;
			var ownerAvatarFieldId;
			var ownerAvatarConfigs;
			var ownerAvatarSlots;
			var dateRect;
			var dateTooltipLabel;
			for (var i = rightCells.length - 1; i >= 0; i--) {
				var { field: field1, cell: cell1, fieldId: fieldId1 } = rightCells[i];
				var special = this.tryCollectSpecialRight(fieldId1, recordId, rowRect, cursorRightX);
				if (special) {
					if (special.configs.length === 0) continue;
					if (special.avatarRect) {
						ownerAvatarRect = special.avatarRect;
						ownerAvatarFieldId = fieldId1;
						ownerAvatarConfigs = special.configs;
						ownerAvatarSlots = special.avatarSlots;
					} else {
						for (var j = special.configs.length - 1; j >= 0; j--) rightConfigs.unshift(special.configs[j]);
						if (special.dateRect) {
							dateRect = special.dateRect;
							dateTooltipLabel = special.dateTooltipLabel;
						}
					}
					cursorRightX -= special.width + size.rightFieldGap;
					rightTotalWidth += special.width + size.rightFieldGap;
					continue;
				}
				var paddingY = this.getFieldPaddingY(field1);
				var measureRect = {
					x: 0,
					y: rowRect.y + paddingY,
					width: 1e4,
					height: rightContentHeight - paddingY
				};
				var fieldConfigs = [];
				var cellWidth = 0;
				if (cell1) {
					fieldConfigs = fieldCollector.collect(measureRect, this.collectConfig, cell1, field1);
					cellWidth = fieldCollector.measureWidth(field1, fieldConfigs);
				}
				if (!cell1 || fieldConfigs.length === 0 || cellWidth === 0) {
					cellWidth = size.placeholderDotSize;
					var dotX = cursorRightX - cellWidth;
					var dotY = rowRect.y + (rowRect.height - size.placeholderDotSize) / 2;
					rightConfigs.unshift(this.createPlaceholderDot({
						x: dotX,
						y: dotY
					}));
				} else {
					var startX = cursorRightX - cellWidth;
					var shiftedConfigs = this.shiftConfigsX(fieldConfigs, startX);
					for (var j1 = shiftedConfigs.length - 1; j1 >= 0; j1--) rightConfigs.unshift(shiftedConfigs[j1]);
				}
				cursorRightX -= cellWidth + size.rightFieldGap;
				rightTotalWidth += cellWidth + size.rightFieldGap;
			}
			rightTotalWidth = Math.max(0, rightTotalWidth - size.rightFieldGap);
			var leftFieldIds = this.state.getVisibleLeftFieldIds();
			var primaryFieldId = this.dataUtil.getPrimaryFieldId();
			var bottomStatusFieldId = this.state.getBottomStatusFieldId();
			var subTreeMeta = this.dataUtil.getSubTreeRowMeta(recordId);
			var subTreeIndent = ((_a = subTreeMeta === null || subTreeMeta === void 0 ? void 0 : subTreeMeta.level) !== null && _a !== void 0 ? _a : 0) * size.subIndentWidth;
			var leftStartX = (this.dataUtil.hasGroup() ? size.groupedRecordStartX : size.groupValueStartX) + 2 + subTreeIndent;
			var leftMaxRightX = rowRect.x + rowRect.width - size.globalPaddingRight - rightTotalWidth - size.leftToRightMinGap;
			var leftMaxWidth = Math.max(0, leftMaxRightX - leftStartX);
			var perCellMaxWidth = Math.max(0, Math.floor(size.rootWidth / 2));
			var leftConfigs = [];
			var leftCursorX = leftStartX;
			var consumedWidth = 0;
			var statusKeyConf = this.state.isBottomStatusFieldVisible() ? this.state.getBottomStatusKeyConf(recordId) : void 0;
			var statusIconRect;
			var bodyTagPillRects;
			for (var fieldId2 of leftFieldIds) {
				var field2 = this.dataUtil.getFieldByFieldId(fieldId2);
				if (!field2) continue;
				var remaining = leftMaxWidth - consumedWidth;
				if (remaining <= 0) break;
				var cellBudget = Math.min(remaining, perCellMaxWidth);
				if (cellBudget <= 0) break;
				if (bottomStatusFieldId && fieldId2 === bottomStatusFieldId) {
					var statusText = this.state.getBottomStatusText(recordId);
					if (!statusText) continue;
					var { configs: statusConfigs, width: statusWidth } = collectStatusText({
						text: statusText,
						startX: leftCursorX,
						y: rowRect.y,
						rowHeight: rowRect.height,
						fontSize: size.bottomStatusFontSize,
						maxWidth: cellBudget
					});
					if (statusConfigs.length === 0 || statusWidth === 0) continue;
					slicePush(leftConfigs, statusConfigs);
					consumedWidth += statusWidth + size.leftFieldGap;
					leftCursorX += statusWidth + size.leftFieldGap;
					continue;
				}
				var cell2 = this.dataUtil.getStandardCell(fieldId2, recordId);
				if (!cell2 || cell2.data.length === 0) continue;
				var isPrimary = fieldId2 === primaryFieldId;
				if (isPrimary && statusKeyConf) {
					if (leftMaxWidth - consumedWidth > 0) {
						var iconStartX = leftCursorX;
						var iconCenterY = rowRect.y + rowRect.height / 2;
						var statusIconDecoration = collectGroupKeyDecoration({
							keyConf: statusKeyConf,
							startX: iconStartX,
							centerY: iconCenterY,
							iconSize: size.headKeyIconSize,
							dotSize: size.headKeyDotSize,
							trailingGap: size.primaryToStatusIconGap
						});
						if (statusIconDecoration.width > 0) {
							slicePush(leftConfigs, statusIconDecoration.configs);
							consumedWidth += statusIconDecoration.width;
							leftCursorX += statusIconDecoration.width;
							var drawnWidth = statusIconDecoration.width - size.primaryToStatusIconGap;
							var drawnSize = Boolean(statusKeyConf.icon) ? size.headKeyIconSize : size.headKeyDotSize;
							statusIconRect = {
								x: iconStartX,
								y: iconCenterY - drawnSize / 2,
								width: Math.max(0, drawnWidth),
								height: drawnSize
							};
						}
					}
				}
				var isText = this.isTextLikeField(field2.getType());
				var paddingY1 = this.getFieldPaddingY(field2);
				var adjustedBudget = Math.min(leftMaxWidth - consumedWidth, perCellMaxWidth);
				if (adjustedBudget <= 0) break;
				var fieldRect = {
					x: leftCursorX,
					y: rowRect.y + paddingY1,
					width: isText ? adjustedBudget : 1e4,
					height: rowRect.height - paddingY1
				};
				var originalFontStyle = this.collectConfig.textConfig.fontStyle;
				if (isPrimary) this.collectConfig.textConfig.fontStyle = "500";
				var fieldConfigsRaw = void 0;
				var wbMeasureFieldType = void 0;
				if (domainConfig.getIsWb()) {
					var fieldTitle = field2.getTitle();
					if (isWbSpecialField(fieldTitle, ViewType.LIST)) {
						fieldConfigsRaw = collectWbSpecialCell({
							fieldTitle,
							viewScope: ViewType.LIST,
							rect: fieldRect,
							collectConfig: this.collectConfig,
							standardCell: cell2,
							field: field2
						});
						if (fieldConfigsRaw) wbMeasureFieldType = getWbSpecialMeasureFieldType(fieldTitle, ViewType.LIST);
					}
				}
				if (!fieldConfigsRaw) fieldConfigsRaw = fieldCollector.collect(fieldRect, this.collectConfig, cell2, field2);
				if (isPrimary) this.collectConfig.textConfig.fontStyle = originalFontStyle;
				if (fieldConfigsRaw.length === 0) continue;
				var used = wbMeasureFieldType ? fieldCollector.measureWidth(wbMeasureFieldType, fieldConfigsRaw) : fieldCollector.measureWidth(field2, fieldConfigsRaw);
				if (used > adjustedBudget) used = adjustedBudget;
				slicePush(leftConfigs, fieldConfigsRaw);
				var trailingGap = size.leftFieldGap;
				consumedWidth += used + trailingGap;
				leftCursorX += used + trailingGap;
				if (isPrimary) {
					var tagFieldIds = this.state.getVisibleBodyTagFieldIds(recordId);
					if (tagFieldIds.length > 0) {
						consumedWidth -= trailingGap;
						leftCursorX -= trailingGap;
						consumedWidth += size.primaryToTagRowGap;
						leftCursorX += size.primaryToTagRowGap;
						var tagRemaining = leftMaxWidth - consumedWidth;
						if (tagRemaining > 0) {
							var tagY = rowRect.y + (rowRect.height - BODY_TAG_PILL_GEOMETRY.itemHeight) / 2;
							var { configs: tagConfigs, width: tagWidth, pillRects: tagPillRects } = collectBodyTag({
								fieldIds: tagFieldIds,
								recordId,
								getField: (id) => this.dataUtil.getFieldByFieldId(id),
								getStandardCell: (id, rid) => this.dataUtil.getStandardCell(id, rid),
								startX: leftCursorX,
								y: tagY,
								itemGap: size.tagItemGap
							});
							if (tagWidth > 0 && tagWidth <= tagRemaining) {
								slicePush(leftConfigs, tagConfigs);
								consumedWidth += tagWidth + size.leftFieldGap;
								leftCursorX += tagWidth + size.leftFieldGap;
								if (tagPillRects.length > 0) bodyTagPillRects = tagPillRects;
							} else {
								consumedWidth -= size.primaryToTagRowGap;
								leftCursorX -= size.primaryToTagRowGap;
								consumedWidth += trailingGap;
								leftCursorX += trailingGap;
							}
						}
					}
					if (this.state.isSysTagsFieldVisible()) {
						var sysTagsItems = resolveTagsCellItems(this.state.getSysTagsCell(recordId));
						if (sysTagsItems.length > 0) {
							var sysTagsRemaining = leftMaxWidth - consumedWidth;
							if (sysTagsRemaining >= SYS_TAGS_MIN_RENDER_WIDTH) {
								var sysTagsY = rowRect.y + (rowRect.height - BODY_TAG_PILL_GEOMETRY.itemHeight) / 2;
								var { configs: sysTagsConfigs, width: sysTagsWidth, pillRects: sysTagsPillRects } = collectTagsPillsInRect({
									x: leftCursorX,
									y: sysTagsY,
									width: sysTagsRemaining,
									height: BODY_TAG_PILL_GEOMETRY.itemHeight
								}, sysTagsItems, this.state.getSysTagsFieldId(), false, SYS_TAGS_FIELD_TITLE);
								if (sysTagsWidth > 0) {
									slicePush(leftConfigs, sysTagsConfigs);
									consumedWidth += sysTagsWidth + size.leftFieldGap;
									leftCursorX += sysTagsWidth + size.leftFieldGap;
									if (sysTagsPillRects.length > 0) bodyTagPillRects = bodyTagPillRects ? [...bodyTagPillRects, ...sysTagsPillRects] : sysTagsPillRects;
								}
							}
						}
					}
				}
			}
			var subTreeConfigs = subTreeMeta ? this.collectSubTreeLines(subTreeMeta, rowRect, leftStartX) : [];
			if (this.dataUtil.hasGroup()) for (var cfg of this.collectGroupLine(rowRect)) subTreeConfigs.push(cfg);
			this.recordInfos.set(recordId, {
				rowRect,
				selectedBg,
				subTreeConfigs,
				leftConfigs,
				rightConfigs,
				selectedCheckbox,
				recordId,
				statusIconRect,
				statusIconFieldId: statusIconRect ? bottomStatusFieldId : void 0,
				statusIconTooltipLabel: statusIconRect && (statusKeyConf === null || statusKeyConf === void 0 ? void 0 : statusKeyConf.title) ? formatFieldTooltipLabel(SYS_STATUS_FIELD_TITLE, statusKeyConf.title) : void 0,
				ownerAvatarRect,
				ownerAvatarFieldId,
				ownerAvatarConfigs,
				ownerAvatarSlots,
				dateRect,
				dateTooltipLabel,
				bodyTagPillRects
			});
		};
		/**
		* 收集虚拟 placeholder record 的 DrawConfig。
		*
		* 视觉契约（与真实 record 布局对齐）：
		* - 无选中态背景 / 无选中 checkbox / 无父子记录连线 / 无 tag 组；
		* - 左侧：优先级「低」themed icon（灰色）+ 灰色文案「输入待办标题」；
		* - 右侧：默认空头像占位（复用 `collectAvatarGroup(users:[], drawEmptyPlaceholder:true)`），
		*   与真实行 owner 空数据视觉完全一致；
		* - 分组竖线：与真实 record 保持一致，仍然绘制左侧贯穿的分组竖线（虚拟行也是分组内的一条视觉行）。
		*
		* 该行不参与选中 / 批量 / 单元格 hit rect / hover cell 反馈，
		* 但整行响应 hover + click（由 hover feature 独立处理）。
		*/ _proto.collectPlaceholderRecord = function collectPlaceholderRecord(recordId, y) {
			var { size } = this;
			var rowRect = {
				x: size.rowStartX,
				y,
				width: size.rowWidth,
				height: size.recordHeight
			};
			var leftConfigs = [];
			var leftCursorX = (this.dataUtil.hasGroup() ? size.groupedRecordStartX : size.groupValueStartX) + 2;
			var centerY = rowRect.y + rowRect.height / 2;
			var rightSlotWidth = size.avatarSize + size.globalPaddingRight + size.leftToRightMinGap;
			var textMaxRight = rowRect.x + rowRect.width - rightSlotWidth;
			var textMaxWidth = Math.max(0, textMaxRight - leftCursorX);
			if (textMaxWidth > 0) leftConfigs.push(pen.config.text({
				text: i18n.t("输入待办标题"),
				x: leftCursorX,
				y: rowRect.y,
				width: textMaxWidth,
				height: rowRect.height,
				fontSize: size.headTitleFontSize,
				color: style.color.lightUltraFontColor,
				verticalAlign: "middle",
				wrap: "none",
				ellipsis: true
			}));
			var rightConfigs = [];
			var ownerAvatarRect;
			var ownerAvatarConfigs;
			if (this.state.isOwnerFieldVisible()) {
				var cursorRightX = rowRect.x + rowRect.width - size.globalPaddingRight;
				var { configs: avatarConfigs, width: avatarWidth } = collectAvatarGroup({
					users: [],
					startX: cursorRightX - size.avatarSize,
					centerY,
					avatarSize: size.avatarSize,
					textFontSize: size.avatarTextFontSize,
					drawEmptyPlaceholder: true
				});
				if (avatarWidth > 0) {
					ownerAvatarRect = {
						x: cursorRightX - avatarWidth,
						y: centerY - size.avatarSize / 2,
						width: avatarWidth,
						height: size.avatarSize
					};
					ownerAvatarConfigs = avatarConfigs;
				}
			}
			var subTreeConfigs = this.dataUtil.hasGroup() ? this.collectGroupLine(rowRect) : [];
			this.recordInfos.set(recordId, {
				rowRect,
				subTreeConfigs,
				leftConfigs,
				rightConfigs,
				recordId,
				ownerAvatarRect,
				ownerAvatarConfigs
			});
		};
		/**
		* 收集分组竖线 DrawConfig：在 record 左侧绘制一条贯穿整行高度的垂直实线。
		* 多条 record 的竖线段视觉上拼接成一条从 GroupHead 下方到最后一条 record 的连续线。
		*/ _proto.collectGroupLine = function collectGroupLine(rowRect) {
			var { size } = this;
			var lineX = size.groupLineCenterX - size.groupLineWidth / 2;
			return [pen.config.rect({
				x: lineX,
				y: rowRect.y - size.lineTopExtend,
				width: size.groupLineWidth,
				height: rowRect.height,
				background: wbColors.treeIndicatorLine
			})];
		};
		/**
		* 收集父子记录的关联线 DrawConfig 列表。
		*
		* @param meta SubTreeRowMeta —— 由 DataUtil.buildSubTreeMeta() 一次性算好，render 阶段不再计算。
		* @param rowRect Record 行的全局矩形（含 globalPadding）。
		* @param leftStartX 当前行主列文本的起点 X（已经包含 level * subIndentWidth 偏移）。
		*
		* 几何契约（每一级缩进 = `size.subIndentWidth` 像素）：
		* - 第 k 个缩进列（k 从 0 起，距 N 越远 k 越大）占据 X ∈ [colLeftX(k), colLeftX(k) + indent)；
		*   其中 colLeftX(k) = leftStartX - (k + 1) * indent。
		* - 每一列的竖线 X = 该列中点 = colLeftX(k) + indent / 2。
		*
		* 绘制规则（与需求 q1 / q4 严格对应）：
		* - 自身列（k=0）：使用 `pen.config.line` 画折线，在转角处带 `subLineSlope` 大小的 45° 斜段；
		*   · `isLastChild` → (vx, top) → (vx, midY - slope) → (vx + slope, midY) → (rightX, midY)；
		*   · 非末位 → 主竖线 (vx, top) → (vx, bottom) 整段贯穿，另起一条同款斜拐角横向分叉线；
		* - 祖先列（k>=1）：
		*   · `pipeAncestors[k] === true` → 画从 row.top 到 row.bottom 的整段竖线（跨层连线）；
		*   · 否则留空。
		*/ _proto.collectSubTreeLines = function collectSubTreeLines(meta, rowRect, leftStartX) {
			var { size } = this;
			var configs = [];
			var { level } = meta;
			if (level === 0) return configs;
			var indent = size.subIndentWidth;
			var lineColor = wbColors.treeIndicatorLine;
			var lineW = size.subLineWidth;
			var rowTop = rowRect.y - size.lineTopExtend;
			var rowBottom = rowRect.y + rowRect.height;
			var rowMidY = rowRect.y + rowRect.height / 2;
			var vertLineCenterX = (k) => leftStartX - indent * (k + 1) + indent / 2 + size.subLineCenterOffsetX;
			for (var k = 1; k < level; k++) {
				if (!meta.pipeAncestors[k]) continue;
				configs.push(pen.config.rect({
					x: vertLineCenterX(k) - lineW / 2,
					y: rowTop,
					width: lineW,
					height: rowBottom - rowTop,
					background: lineColor
				}));
			}
			var selfVertX = vertLineCenterX(0);
			var horizRightX = leftStartX - size.subLineGapToText;
			var slope = Math.min(size.subLineSlope, rowRect.height / 2);
			var slopeStartY = rowMidY - slope;
			var slopeEndX = selfVertX + slope;
			if (meta.isLastChild) {
				var points = [
					selfVertX,
					rowTop,
					selfVertX,
					slopeStartY,
					slopeEndX,
					rowMidY,
					Math.max(horizRightX, slopeEndX),
					rowMidY
				];
				configs.push(pen.config.line({
					x: 0,
					y: 0,
					points,
					borderWidth: lineW,
					borderColor: lineColor
				}));
			} else {
				configs.push(pen.config.rect({
					x: selfVertX - lineW / 2,
					y: rowTop,
					width: lineW,
					height: rowBottom - rowTop,
					background: lineColor
				}));
				if (horizRightX > slopeEndX) {
					var branch = [
						selfVertX,
						slopeStartY,
						slopeEndX,
						rowMidY,
						horizRightX,
						rowMidY
					];
					configs.push(pen.config.line({
						x: 0,
						y: 0,
						points: branch,
						borderWidth: lineW,
						borderColor: lineColor
					}));
				}
			}
			return configs;
		};
		/** 根据字段类型取垂直 padding；未在 fieldPaddingYMap 中配置则回退到 size.recordCellPaddingY */ _proto.getFieldPaddingY = function getFieldPaddingY(field) {
			var override = this.fieldPaddingYMap[this.getEffectiveFieldType(field)];
			return override !== null && override !== void 0 ? override : this.size.recordCellPaddingY;
		};
		/**
		* 取字段「实际渲染用」的 FieldType：
		* - 对查找引用列（LOOKUP）/ 公式列（FORMULA），最终渲染由 result 字段决定，需要拿其 resultFieldAttributes 的 type；
		* - resultFieldAttributes 不存在（未配置 / 错误态）时回退原始 type。
		*/ _proto.getEffectiveFieldType = function getEffectiveFieldType(field) {
			var _a;
			var type = field.getType();
			if (type === FieldType.LOOKUP || type === FieldType.FORMULA) {
				var resultType = (_a = field.getResultFieldAttributes()) === null || _a === void 0 ? void 0 : _a.getType();
				if (resultType) return resultType;
			}
			return type;
		};
		_proto.isTextLikeField = function isTextLikeField(type) {
			return type === FieldType.TEXT || type === FieldType.PHONE || type === FieldType.EMAIL || type === FieldType.NUMBER || type === FieldType.PERCENT || type === FieldType.CURRENCY || type === FieldType.AUTO_NUMBER;
		};
		/** 把 DrawConfig 列表按 x 偏移整体平移（measure 阶段用 x=0，真实位置后再平移） */ _proto.shiftConfigsX = function shiftConfigsX(configs, deltaX) {
			if (deltaX === 0) return configs;
			return configs.map((c) => {
				var next = Object.assign({}, c);
				if (typeof next.x === "number") next.x = c.x + deltaX;
				return next;
			});
		};
		_proto.createPlaceholderDot = function createPlaceholderDot(rect) {
			var { size } = this;
			return pen.config.rect({
				x: rect.x,
				y: rect.y,
				width: size.placeholderDotSize,
				height: size.placeholderDotSize,
				background: style.color.lightUltraFontColor,
				borderRadius: size.placeholderDotSize / 2,
				opacity: .3
			});
		};
		/**
		* 行右侧字段命中 owner / date 列时，返回 shared collector 产出的 DrawConfig + 占用宽度；
		* 不命中（不是 owner/date，或对应列不可见）时返回 null，调用方退回到普通 fieldCollector 路径。
		*
		* 视觉与几何与 kanban-todo 卡片底部完全等价：
		* - owner 列：重叠头像组（{@link collectAvatarGroup}），垂直居中行内；
		* - date 列：相对时间（{@link formatRelativeTime} + {@link collectRelativeTimeText}），左对齐
		*   ——本视图右侧整体是反向布局，cursorRightX 推进已经把"贴右边"做好了，文本本身用 align='left'
		*   即可，无需再像 kanban-todo 那样做 row 右边强制对齐。
		*
		* 反向布局适配：调用方只需保证 `cursorRightX` 是「该单元格的右边界」；本函数返回 `width` 后，
		* 调用方按 `cursorRightX - width` 取得 startX 自行渲染。
		*
		* 空数据约定：返回 `{ configs: [], width: 0 }` 表示「命中但无数据」，
		* 调用方据此跳过本字段（不渲染、不占位、不推进 cursor）；返回 null 表示「未命中专用渲染」，
		* 调用方应退回到普通 fieldCollector 路径（普通字段空数据走占位灰圆兜底）。
		*/ _proto.tryCollectSpecialRight = function tryCollectSpecialRight(fieldId, recordId, rowRect, cursorRightX) {
			var { size, state } = this;
			if (state.isOwnerFieldVisible() && fieldId === state.getOwnerFieldId()) {
				var users = state.getOwnerUsers(recordId);
				var probe = collectAvatarGroup({
					users,
					startX: 0,
					centerY: 0,
					avatarSize: size.avatarSize,
					textFontSize: size.avatarTextFontSize,
					drawEmptyPlaceholder: true
				});
				if (probe.width === 0) return {
					configs: [],
					width: 0
				};
				var startX = cursorRightX - probe.width;
				var centerY = rowRect.y + rowRect.height / 2;
				var { configs, width, slots } = collectAvatarGroup({
					users,
					startX,
					centerY,
					avatarSize: size.avatarSize,
					textFontSize: size.avatarTextFontSize,
					drawEmptyPlaceholder: true
				});
				var avatarRect = {
					x: startX,
					y: centerY - size.avatarSize / 2,
					width,
					height: size.avatarSize
				};
				applyAvatarSlotsFieldTitlePrefix(slots, WbSharedConfig.card.bottom.ownerFieldTitle);
				return {
					configs,
					width,
					avatarRect,
					avatarSlots: slots
				};
			}
			if (state.isDateFieldVisible() && fieldId === state.getDateFieldId()) {
				var ts = state.getDateTimestamp(recordId);
				if (!ts) return {
					configs: [],
					width: 0
				};
				var text = formatRelativeTime(ts);
				if (!text) return {
					configs: [],
					width: 0
				};
				var slotWidth = size.relativeDateSlotWidth;
				var startX1 = cursorRightX - slotWidth;
				var { configs: configs1 } = collectRelativeTimeText({
					text,
					startX: startX1,
					y: rowRect.y,
					rowHeight: rowRect.height,
					fontSize: size.relativeDateFontSize,
					align: "right",
					slotWidth
				});
				var dateFullText = state.getDateFullText(recordId);
				return {
					configs: configs1,
					width: slotWidth,
					dateRect: {
						x: startX1,
						y: rowRect.y,
						width: slotWidth,
						height: rowRect.height
					},
					dateTooltipLabel: dateFullText ? formatFieldTooltipLabel(WbSharedConfig.card.bottom.dateFieldTitle, dateFullText) : void 0
				};
			}
			return null;
		};
		/** 通过分组 path 找到 groupIndex（在 dataUtil.getGroupFlatten 中的序号） */ _proto.findGroupIndexByPath = function findGroupIndexByPath(path) {
			return this.dataUtil.getGroupFlatten().findIndex((g) => this.groupPathKey(g.path) === this.groupPathKey(path));
		};
		_proto.groupPathKey = function groupPathKey(path) {
			return path.join("::");
		};
		return ContentCollector;
	}(import_main$2.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/sub-tree-flatten.js
/**
* 把 ISubNode 树按 DFS 顺序平铺为 `Map<recordId, SubTreeRowMeta>`。
*
* 算法关键不变量：
*   维护两个并行栈，栈底=顶层根方向，栈顶=最深节点方向，长度始终一致：
*   - `ancestorPath: string[]`：路径上每一层的 recordId（含当前节点 N 自身那一帧）；
*   - `pipeStack: boolean[]`：与 ancestorPath 同长，第 i 项 = 「ancestorPath[i] 在自己父中是否非末位」。
*     顶层根没有父，pipeStack[0] 仍按其在 roots 数组中的末位标志编码，但不会被任何后代读取。
*
* 进入节点 N（已知 N 在父中的 `isLastSibling`）时：
*   - **先**把"自己"入栈：ancestorPath push N.recordId；pipeStack push !isLastSibling；
*   - level = ancestorPath.length - 1（= 不含自身那一帧之前的祖先数；也是 N 的层级，
*     顶层根=0）；
*   - pipeAncestors / ancestorIds 长度 = level；
*   - 对每个 k ∈ [0, level)：
*       pipeAncestors[k] = pipeStack[level - k]
*         · k=0 → 栈顶（N 自身那一帧）→ N 在直接父中是否非末位，决定 N 直接父对应缩进列；
*         · k=level-1 → pipeStack[1]（顶层根的下一级那一帧）→ 决定顶层根对应缩进列。
*       ancestorIds[k] = ancestorPath[level - 1 - k] （k=0→直接父，k=level-1→顶层根）。
*   - 递归访问 children。
*   - 结束后弹出 ancestorPath / pipeStack 自身那一帧。
*
* 缩进列编号约定：第 k 列（k 从 0 起）对应 N 的第 k+1 层祖先（k=0 即距 N 最近的祖先=直接父）。
*
* 例：例二中 r5 的 pipeAncestors = [false, false, true]：
*   · 列 0（直接父 r3）：r5 是 r3.children 末位 → 不画（L 拐角）；
*   · 列 1（祖父 r2）：r3 是 r2.children 末位 → 不画；
*   · 列 2（顶层根 r1）：r2 是 r1.children[0] 非末位 → 画 │（跨层连线）。
*
* 字符串元素视为"无 children 的叶子节点"。
* 环保护：visited Set；遇环 warn 并跳过该节点（不递归其 children）。
* 复杂度：O(N)（N 为节点总数）。
*/ function flattenSubTree(roots) {
	var result = /* @__PURE__ */ new Map();
	var visited = /* @__PURE__ */ new Set();
	var ancestorPath = [];
	var pipeStack = [];
	function visit(node, isLastSibling) {
		var recordId = typeof node === "string" ? node : node.recordId;
		if (visited.has(recordId)) {
			logger.warn(LOGGER_TAG, `cycle detected at record ${recordId}; skip`);
			return;
		}
		visited.add(recordId);
		ancestorPath.push(recordId);
		pipeStack.push(!isLastSibling);
		var level = ancestorPath.length - 1;
		var ancestorIdsForRow = new Array(level);
		var pipeAncestors = new Array(level);
		for (var k = 0; k < level; k++) {
			ancestorIdsForRow[k] = ancestorPath[level - 1 - k];
			pipeAncestors[k] = pipeStack[level - k];
		}
		var children = typeof node === "string" ? [] : node.children;
		var hasChildren = children.length > 0;
		result.set(recordId, {
			level,
			ancestorIds: ancestorIdsForRow,
			hasChildren,
			isLastChild: isLastSibling,
			pipeAncestors
		});
		if (hasChildren) for (var i = 0; i < children.length; i++) visit(children[i], i === children.length - 1);
		pipeStack.pop();
		ancestorPath.pop();
	}
	for (var i = 0; i < roots.length; i++) visit(roots[i], i === roots.length - 1);
	return result;
}
var LOGGER_TAG;
var init_sub_tree_flatten = __esmMin((() => {
	init_es();
	LOGGER_TAG = "grid-list/sub-tree";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/config.js
var ListConfig;
var init_config = __esmMin((() => {
	init_wb_config();
	ListConfig = {
		recordLeftShowFieldTitles: [...WbSharedConfig.card.body.showFieldTitles],
		recordRightShowFieldTitles: [WbSharedConfig.card.bottom.ownerFieldTitle, WbSharedConfig.card.bottom.dateFieldTitle]
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/data-util.js
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
function makePlaceholderGroupKey(matchValue) {
	return `${PLACEHOLDER_GROUP_PREFIX}${matchValue}`;
}
function isPlaceholderGroupKey(groupKey) {
	return typeof groupKey === "string" && groupKey.startsWith(PLACEHOLDER_GROUP_PREFIX);
}
/**
* 从顶层分组节点的 value 中取文本，用于匹配 groupKeys[].matchValue。
* IFormattedTree.value 是单元格；取 `data[0].text`。
*/ function getTopGroupTitleText(value) {
	var _a, _b;
	if (!value) return "";
	var first = (_a = value.data) === null || _a === void 0 ? void 0 : _a[0];
	return (_b = first === null || first === void 0 ? void 0 : first.text) !== null && _b !== void 0 ? _b : "";
}
/**
* 构造一个虚拟顶层分组节点：
* - `field` 复用真实的顶层分组 field（供 head 反查 keyConf）；
* - `value` 塞一个只有 `text = matchValue` 的兜底 cell；
* - `children`：
*   - `withPlaceholderChild=true`（默认，head.groupBys 特殊配置场景）：塞一条 placeholder recordId，
*     让下游 rows / range / content 走「有一行」的路径，用户可点击占位行创建新任务；
*   - `withPlaceholderChild=false`（sys_source 白名单场景）：留空 `[]`，只渲染分组头，不产生
*     任何行级 UI 与事件响应（对应"转交 0"这类固定占位的空分组）；
* - `count = 0`：与 kanban-todo 补齐分组一致（count 用于分组头右侧显示数量）；
* - `path`：优先使用调用方反查到的 **真实 GroupKey**（SELECT 的 optionId / LINK_RECORD 的 recordId），
*   这样 `moveRecord.delta.groupPath` 下发给 core 时能命中真正的字段维度值，正常写入分组字段；
*   反查不到才落回 `makePlaceholderGroupKey(matchValue)`（`__list_group_placeholder__:xxx`），
*   record-move 侧对这种 placeholder key 会拿到 null override，不会污染 cellvalue。
*/ function buildVirtualTopNode(matchValue, topGroupField, realGroupKey, withPlaceholderChild = true) {
	var value = {
		sourceType: topGroupField.getType(),
		data: [{ text: matchValue }]
	};
	var pathKey = realGroupKey !== null && realGroupKey !== void 0 ? realGroupKey : makePlaceholderGroupKey(matchValue);
	return {
		level: 0,
		field: topGroupField,
		value,
		children: withPlaceholderChild ? [makePlaceholderRecordId(matchValue)] : [],
		count: 0,
		path: [pathKey]
	};
}
var PLACEHOLDER_GROUP_PREFIX, DataUtil;
var init_data_util = __esmMin((() => {
	init_es();
	init_es$1();
	init_data_util$1();
	init_sub_tree_flatten();
	init_config();
	init_placeholder_record();
	init_wb_config();
	PLACEHOLDER_GROUP_PREFIX = "__list_group_placeholder__:";
	DataUtil = /* @__PURE__ */ function(BaseCollectorDataUtil) {
		"use strict";
		_inherits$7(DataUtil, BaseCollectorDataUtil);
		function DataUtil(context) {
			var _this = BaseCollectorDataUtil.call(this, context) || this;
			_this.context = context;
			/** 左侧字段 fieldId（按 config 顺序，丢弃找不到的 title） */ _this.leftFieldIds = [];
			/** 右侧字段 fieldId（按 config 顺序，丢弃找不到的 title） */ _this.rightFieldIds = [];
			/**
			* 父子记录扁平 meta；视图未启用父子记录时为空 Map（render 阶段命中 undefined → 走普通分支）。
			* 在 buildSubTreeMeta() 中重建。
			*/ _this.subTreeMeta = /* @__PURE__ */ new Map();
			/**
			* 命中 `WbSharedConfig.head.groupBys[fieldTitle]` 时的规范化 groupTree 副本；
			* 未命中或无分组时为 null，`getGroupTree()` 走 super 原始数据。
			*
			* 副本策略：
			* - 不修改 core 层 `getFormattedTree()` 的返回对象（下游可能有别处直接引用 core 树）；
			* - 顶层节点按 `groupKeys` 顺序重排；
			* - 配置中存在但数据缺失的分组，追加 placeholder 节点；
			* - 任意分组的 record 数为 0 时，塞一条 placeholder recordId 供 collector 渲染虚拟行；
			* - 配置外的顶层分组保留在末尾（避免误删数据）。
			*/ _this.normalizedGroupTree = null;
			/**
			* 当前 `normalizedGroupTree` 是否包含虚拟分组或 placeholder record。
			* 主要用于 renderer 侧决定「recordCount === 0 时是否绕过空态提示」。
			*/ _this.wbVirtualGroupsFlag = false;
			/**
			* 规范化过程中「真实 GroupKey 但对应分组为空」的顶层 GroupKey 集合。
			*
			* 触发场景（`buildNormalizedTopNodes` 内维护）：
			* 1. 已存在于 core formattedTree 里、但 `children` 为空的顶层分组 → path[0] 就是真实 GroupKey；
			* 2. core formattedTree 里完全没有、但 `lookupRealGroupKeyByMatchValue` 反查到真实 GroupKey 的分组；
			*
			* 两者共同点：目标分组在 **core formattedTree 里没有对应节点**（或只有一条 placeholder record），
			* 直接把 `groupPath` 交给 core 的 `MoveRecordRequest.setRecordByGroupPath` 时，
			* `getStandardValueMapByPath` 会因为找不到节点返回 `{}`，导致**分组字段不会被写入**，
			* 记录只挪 rank 不改字段值，UI 上就表现为「拖入空分组失败、跳回原分组」。
			*
			* `record-move` 检测到目标 GroupKey 命中本集合时，会调用 {@link buildGroupFieldOverrideForTopGroupKey}
			* 自行合成分组字段的 cell delta 塞进 `moveRecord.delta.records`，绕开 `setRecordByGroupPath` 的
			* formattedTree 依赖 —— 语义与 kanban 的 `MOVE_GROUP_RECORD` 一致：直接把 groupKey 作为分组字段值写入。
			*/ _this.emptyRealGroupKeys = /* @__PURE__ */ new Set();
			/** 顶层分组字段（缓存，避免每次调用重新遍历 view.getGroupFields()） */ _this.topGroupFieldCache = null;
			return _this;
		}
		var _proto = DataUtil.prototype;
		_proto.getCurrentView = function getCurrentView() {
			return this.context.getCurrentView();
		};
		/** 顶层分组的扁平结构，与 grid DataUtil 同名同义 */ _proto.getGroupFlatten = function getGroupFlatten() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroupLayoutInfos()) || [];
		};
		/**
		* 嵌套分组树（多层），与 grid DataUtil 同名同义。
		* - 每个节点形如 `{ field, value, count, path, children, level? }`；
		* - children 为下一层分组列表，叶子层的 children 为 recordId 字符串数组；
		* - 无分组时返回空数组。
		* 用于 runGroupTree 递归布局多层 GroupHead / RecordRange。
		*
		* 类型说明：分组叶子层的 children 在启用「父子记录」时可能混入 ISubNode（与
		* IFormattedTree.children 类型一致），消费方（runGroupTree / walkGroupTreeForSubRoots）
		* 通过 isFormattedTreeNode 谓词区分中间层与叶子。
		*/ _proto.getGroupTree = function getGroupTree() {
			var _a;
			if (this.normalizedGroupTree) return this.normalizedGroupTree;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getFormattedTree()) || [];
		};
		/**
		* 是否存在由 `WbSharedConfig.head.groupBys` 补齐出的虚拟分组或 placeholder record。
		*
		* 供 renderer 使用：命中时即使 `rows.recordCount === 0` 也不应该绘制「空态提示」，
		* 而是让虚拟分组头与 placeholder record 正常绘制。
		*/ _proto.hasWbVirtualGroups = function hasWbVirtualGroups() {
			return this.wbVirtualGroupsFlag;
		};
		/**
		* 判断给定 GroupKey 是否为「真实但空」的顶层分组 key。
		*
		* 命中场景（详见 `emptyRealGroupKeys` 字段注释）：
		* - core formattedTree 里存在该 GroupKey 但 `children` 为空；
		* - core formattedTree 里完全没有，但通过字段维度反查到了真实 GroupKey（optionId / userId / recordId）。
		*
		* 两种场景下，core 的 `MoveRecordRequest.setRecordByGroupPath` 都无法从 formattedTree 反查到有效的
		* `standardValueMap` → 分组字段不会被写入。`record-move` 侧应在派发 moveRecord 前调用
		* {@link buildGroupFieldOverrideForTopGroupKey} 合成分组字段的 cell delta 塞进 `records`。
		*/ _proto.isEmptyRealGroupKey = function isEmptyRealGroupKey(groupKey) {
			return this.emptyRealGroupKeys.has(groupKey);
		};
		/**
		* 为「拖入空分组」场景合成顶层分组字段的 cell delta。
		*
		* @param topGroupKey 目标顶层分组的**真实** GroupKey（不是 placeholder）。语义按字段类型解释：
		*   - `SINGLE_SELECT / MULTIPLE_SELECT` → option.id
		*   - `USER / USER_C` → user.id
		*   - `LINK_RECORDS / TWO_WAY_LINK_RECORDS` → 关联表 recordId
		* @returns `{ fieldId, cellValue }` —— cellValue 是可直接写入 `ISetRecordRequestDelta[fieldId].value`
		*   的合法结构；无法合成（字段类型不支持 / 顶层分组字段不存在）时返回 null。
		*
		* 语义参考 core `generateRecordDeltaByGroupRecordPatch`（kanban 独占）：把 groupKey 直接翻译为
		* 「该字段允许的最小合法 cellValue」，等价于把该 record 的分组字段值改成"落到目标分组所需要的值"。
		*
		* 单值 vs 多值字段的取舍：目前 grid-list 场景（sys_status 单选、sys_owner 单人）只落单值。
		* MULTI 场景理论上应该走"合并 removes/adds"（参考 kanban 的 patch 逻辑），但当前 `WbSharedConfig.head.groupBys`
		* 只覆盖单值分组的用例，因此这里对多值字段也按"覆盖为单值"处理；后续如接入多选分组，
		* 需要在此扩展成合并 patch。
		*/ _proto.buildGroupFieldOverrideForTopGroupKey = function buildGroupFieldOverrideForTopGroupKey(topGroupKey) {
			var _a, _b;
			if (isPlaceholderGroupKey(topGroupKey)) return null;
			var field = (_b = (_a = this.topGroupFieldCache) !== null && _a !== void 0 ? _a : this.getGroupFields()[0]) !== null && _b !== void 0 ? _b : null;
			if (!field) return null;
			var fieldId = field.getId();
			var fieldType = field.getType();
			var cellValue = this.buildCellValueForTopGroupKey(field, fieldType, topGroupKey);
			if (cellValue === void 0) return null;
			return {
				fieldId,
				cellValue
			};
		};
		/**
		* 按 `WbSharedConfig.head.groupBys[fieldTitle]` 规范化 GroupTree：
		* - 命中特殊配置时构造 `normalizedGroupTree` 副本，重排顺序 + 补齐缺失分组 + 空分组塞 placeholder record；
		* - 分组依据为 `sys_source` 时按 `WB_SOURCE_DEFAULT_VISIBLE_VALUES` 白名单固定补齐 manual / handoff 两个
		*   分组置顶展示，白名单外的空分组（关联表 / 全集枚举带来的 count=0 的分组）**直接过滤掉**，
		*   避免 UI 上出现一堆无数据的空块；
		* - 未命中时清空缓存，`getGroupTree()` 回落到 super 数据。
		*
		* 应在 `handleCollect / handlePatch` 顶部（`buildSubTreeMeta` 之前）调用，
		* 后续所有下游（rows / range / content / renderer / event-handler）读到的均为规范化后的数据。
		*/ _proto.normalizeGroupTreeByWbConfig = function normalizeGroupTreeByWbConfig() {
			var _a;
			this.normalizedGroupTree = null;
			this.wbVirtualGroupsFlag = false;
			this.emptyRealGroupKeys = /* @__PURE__ */ new Set();
			this.topGroupFieldCache = null;
			var groupFields = this.getGroupFields();
			if (groupFields.length === 0) return;
			var topGroupField = groupFields[0];
			this.topGroupFieldCache = topGroupField;
			var fieldTitle = topGroupField.getTitle();
			var groupByConfig = WbSharedConfig.head.groupBys[fieldTitle];
			var hitConfig = !!groupByConfig && groupByConfig.groupKeys.length > 0;
			var hitSource = fieldTitle === WB_SOURCE_FIELD_TITLE;
			if (!hitConfig && !hitSource) return;
			var originalTree = ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getFormattedTree()) || [];
			var topNodes = [];
			for (var node of originalTree) {
				if (typeof node === "string" || !isFormattedTreeNode(node)) return;
				topNodes.push(node);
			}
			var matchValues = hitConfig ? groupByConfig.groupKeys.map((keyConf) => keyConf.matchValue) : WB_SOURCE_DEFAULT_VISIBLE_VALUES;
			var filterEmptyOutsiders = hitSource;
			var { normalized, hasVirtual, emptyRealGroupKeys } = this.buildNormalizedTopNodes(topNodes, matchValues, topGroupField, filterEmptyOutsiders);
			this.normalizedGroupTree = normalized;
			this.wbVirtualGroupsFlag = hasVirtual;
			this.emptyRealGroupKeys = emptyRealGroupKeys;
		};
		/**
		* 获取父子（树形）记录嵌套结构；视图未启用「父子记录」时返回 null。
		*
		* 纯透传 core 层 `getFormattedSub`，不在 view 层做视图类型卡口——
		* 哪些视图支持父子能力由 core 层「ViewModel 是否挂 ViewSubTreePartial」决定，
		* 且 core 层在 `subTreeFieldId` 未配置 / 字段失效 / 关联非本表 时已会返回 null。
		*/ _proto.getFormattedSub = function getFormattedSub() {
			var _a, _b;
			return (_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getFormattedSub()) !== null && _b !== void 0 ? _b : null;
		};
		/**
		* 获取「无分组」场景下用于逐行渲染的 recordId 顺序。
		*
		* - 未启用父子记录（`getFormattedSub()` 返回 null）：直接透传 `getDisplayedRecordIds()`
		*   的扁平顺序，与原行为完全一致；
		* - 启用父子记录：`getDisplayedRecordIds()` 只是「祖先链注入后的集合」，其相对顺序**不保证**
		*   父在前、子紧随（sort/group processor 只保证集合完整，不保证 DFS 拓扑序）。若直接按它逐行
		*   渲染，会出现「某条子记录的 level 正确、但排在了错误的行位置」——表现为嵌套关联线断裂、
		*   父子不连续。这里改用 `getFormattedSub()` 的完整 ISubNode 树、按 DFS（父在前、子紧随、
		*   兄弟按已排序顺序）打平，得到与「分组叶子层」`normalizeLeafChildrenToRecordIds` 完全一致
		*   的连续顺序，保证有/无分组两条路径的父子渲染顺序统一。
		*
		* 复用 core `normalizeLeafChildrenToRecordIds`（分组叶子层同款打平工具），避免重复实现 DFS。
		*/ _proto.getSubTreeOrderedRecordIds = function getSubTreeOrderedRecordIds() {
			var sub = this.getFormattedSub();
			if (!sub) return [...this.getDisplayedRecordIds()];
			return normalizeLeafChildrenToRecordIds(sub);
		};
		/** 分组字段列表 */ _proto.getGroupFields = function getGroupFields() {
			var _a;
			return ((_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroupFields()) || [];
		};
		/** 是否存在分组 */ _proto.hasGroup = function hasGroup() {
			return this.getGroupFields().length > 0;
		};
		/**
		* runGroupFlatten 需要这个 hook；list 视图永远不展示列统计，固定返回 false。
		*/ _proto.isFieldStatEnabled = function isFieldStatEnabled() {
			return false;
		};
		/**
		* 按 ListConfig.recordLeftShowFieldTitles / recordRightShowFieldTitles 反查 fieldId，缓存到 leftFieldIds / rightFieldIds。
		* 在 collect / patch 阶段调用，render 阶段直接读缓存即可。
		*/ _proto.buildShowFieldIds = function buildShowFieldIds() {
			this.leftFieldIds = this.resolveFieldIdsByTitles(ListConfig.recordLeftShowFieldTitles, "left");
			this.rightFieldIds = this.resolveFieldIdsByTitles(ListConfig.recordRightShowFieldTitles, "right");
		};
		_proto.getLeftFieldIds = function getLeftFieldIds() {
			return this.leftFieldIds;
		};
		_proto.getRightFieldIds = function getRightFieldIds() {
			return this.rightFieldIds;
		};
		/**
		* 构建 / 重建父子记录扁平 meta 映射。
		*
		* 来源（二选一，互斥；无分组优先）：
		* - 无分组：`getFormattedSub()` 直接拿到顶层 ISubNode 数组；
		* - 有分组：遍历 `getGroupTree()` 找到所有"叶子层"（children 全是 RecordId 字符串或 ISubNode），
		*   把其中所有 ISubNode 元素并入 roots 数组；纯 RecordId 字符串元素跳过（非父子树成员，
		*   不需要 meta，渲染时走普通分支）。
		*
		* 在 collect/patch 流程的 dataUtil 预处理阶段调用一次，配合 buildShowFieldIds。
		*/ _proto.buildSubTreeMeta = function buildSubTreeMeta() {
			var roots = this.collectSubTreeRoots();
			if (roots.length === 0) {
				if (this.subTreeMeta.size > 0) this.subTreeMeta = /* @__PURE__ */ new Map();
				return;
			}
			this.subTreeMeta = flattenSubTree(roots);
		};
		/**
		* 查询某条 record 的父子树 meta；未启用父子记录、或该 record 不在树里时返回 undefined。
		* render 阶段单次 Map 命中，零字符串匹配。
		*/ _proto.getSubTreeRowMeta = function getSubTreeRowMeta(recordId) {
			return this.subTreeMeta.get(recordId);
		};
		/**
		* 按字段类型分支构造顶层分组字段的 cellValue；不支持时返回 undefined。
		*
		* - SELECT：cellValue 就是 `[optionId]`；
		* - USER：需要从 field.getGroups 反查出 IUser（含 name 等 meta），构造 `IUser[]`；
		* - LINK_RECORDS：cellValue = `[linkRecordId]`；
		* - 其他类型：不支持（当前 grid-list 分组仅覆盖上述三类）。
		*/ _proto.buildCellValueForTopGroupKey = function buildCellValueForTopGroupKey(field, fieldType, topGroupKey) {
			var _a, _b, _c;
			if (fieldType === FieldType.SINGLE_SELECT || fieldType === FieldType.MULTIPLE_SELECT) return [topGroupKey];
			if (isLinkField(field)) return [topGroupKey];
			if (fieldType === FieldType.USER || fieldType === FieldType.USER_C) {
				var supportGroups = field;
				if (typeof supportGroups.getGroups !== "function" || typeof supportGroups.getGroupValues !== "function") return;
				var cell = supportGroups.getGroupValues([topGroupKey]).get(topGroupKey);
				var userData = (_a = cell === null || cell === void 0 ? void 0 : cell.data) === null || _a === void 0 ? void 0 : _a[0];
				if (!(userData === null || userData === void 0 ? void 0 : userData.id)) return void 0;
				return [{
					id: userData.id,
					name: (_c = (_b = userData.name) !== null && _b !== void 0 ? _b : userData.text) !== null && _c !== void 0 ? _c : ""
				}];
			}
		};
		/**
		* 按 matchValue 在分组列对应数据源中反查真实 GroupKey；找不到返回 undefined。
		*
		* 用途：`buildNormalizedTopNodes` 遇到「配置里列了但 core 层 formattedTree 完全没有该分组」时，
		* 优先用字段维度的真实 GroupKey（SELECT 的 optionId / 关联表的 recordId）填补，保证下游
		* `moveRecord.delta.groupPath` 拿到的就是 core 认识的 GroupKey，能正常写入分组字段值。
		*
		* 反查策略（按分组列类型分支，因为不同类型的 GroupKey 语义不同）：
		* - LINK_RECORD：GroupKey === 关联表 recordId。从关联表的 primary 字段按 cell.text === matchValue
		*   反查 recordId（关联表全部 record 是候选，无论当前表是否 link 到它）。
		* - 其他可分组字段（SELECT / USER / ...）：GroupKey === 字段维度 id（option.id / user.id）。
		*   通过 `field.getGroups([]).groupIds` 拿字段维度的**全集** id 列表：
		*     1) 优先按 id 直接匹配 matchValue（业务侧约定：sys_status_id 这类列 option.id 就是
		*        `'pending' / 'running'` 英文枚举，groupBys 里 matchValue 写英文枚举 → 直接命中）；
		*     2) 兜底走 `field.getGroupValues([...])` 里 cell.data[0].text 匹配（SELECT option.text
		*        与 matchValue 对齐；kanban-todo 现有实现走的也是这条路径）。
		*   命中即返回 GroupKey === id。
		*/ _proto.lookupRealGroupKeyByMatchValue = function lookupRealGroupKeyByMatchValue(matchValue, topGroupField) {
			var _a, _b, _c, _d, _e, _f;
			if (isLinkField(topGroupField)) {
				var linkTable = topGroupField.getLinkTableModel();
				if (!linkTable) return;
				var primaryFieldId = linkTable.getPrimaryFieldId();
				var primaryField = linkTable.getFieldByFieldId(primaryFieldId);
				if (!primaryField) return;
				for (var recordId of linkTable.getRecordIdList()) if (((_d = (_c = (_b = (_a = primaryField.getStandardCell(recordId)) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "") === matchValue) return recordId;
				return;
			}
			var supportGroups = topGroupField;
			if (typeof supportGroups.getGroups !== "function") return;
			var groupIds;
			try {
				groupIds = supportGroups.getGroups([]).groupIds;
			} catch (_g) {
				return;
			}
			for (var id of groupIds) if (id === matchValue) return id;
			if (typeof supportGroups.getGroupValues !== "function") return;
			var groupValues = supportGroups.getGroupValues(groupIds);
			for (var id1 of groupIds) {
				if (id1 === null) continue;
				var cell = groupValues.get(id1);
				var first = (_e = cell === null || cell === void 0 ? void 0 : cell.data) === null || _e === void 0 ? void 0 : _e[0];
				if (((_f = first === null || first === void 0 ? void 0 : first.text) !== null && _f !== void 0 ? _f : "") === matchValue) return id1;
			}
		};
		/**
		* 按 matchValues 顺序生成新的顶层节点列表，缺失分组补空节点，
		* 任意分组 record 为 0 时塞一条 placeholder recordId。
		*
		* 同时记录**真实但空**的顶层 GroupKey 到 `emptyRealGroupKeys` 供 record-move 侧读取，
		* 用来在派发 moveRecord 前合成分组字段的 cell override（绕开 core 对 formattedTree 的依赖）。
		*
		* @param matchValues 期望**固定按此顺序展示**的 rawText 列表。既可来自
		*   `WbGroupByConfig.groupKeys[].matchValue`（命中 head.groupBys 特殊配置），
		*   也可来自 `WB_SOURCE_DEFAULT_VISIBLE_VALUES`（sys_source 白名单）。
		* @param filterEmptyOutsiders 白名单外的分组处理策略：
		*   - `false`（默认）：全部保留在末尾，避免数据丢失 —— 用于 head.groupBys 场景，
		*     配置里没列出的分组只要在数据里存在（即便为空）也照常展示；
		*   - `true`：仅保留 children 非空的分组（有数据），过滤掉全部空分组 —— 用于 sys_source，
		*     避免关联表 / SELECT 全集枚举把一堆无数据的其它来源塞进 UI。
		*/ _proto.buildNormalizedTopNodes = function buildNormalizedTopNodes(topNodes, matchValues, topGroupField, filterEmptyOutsiders) {
			var _a;
			var matchValueToNode = /* @__PURE__ */ new Map();
			for (var node of topNodes) {
				var text = getTopGroupTitleText(node.value);
				if (text && !matchValueToNode.has(text)) matchValueToNode.set(text, node);
			}
			var ordered = [];
			var used = /* @__PURE__ */ new Set();
			var emptyRealGroupKeys = /* @__PURE__ */ new Set();
			var hasVirtual = false;
			var emptyGroupHasPlaceholder = !filterEmptyOutsiders;
			for (var matchValue of matchValues) {
				var existed = matchValueToNode.get(matchValue);
				if (existed) {
					used.add(existed);
					if (existed.children.length === 0) {
						ordered.push(Object.assign(Object.assign({}, existed), { children: emptyGroupHasPlaceholder ? [makePlaceholderRecordId(matchValue)] : [] }));
						var realKey = (_a = existed.path) === null || _a === void 0 ? void 0 : _a[0];
						if (realKey !== void 0 && !isPlaceholderGroupKey(realKey)) emptyRealGroupKeys.add(realKey);
						hasVirtual = true;
					} else ordered.push(existed);
					continue;
				}
				var realGroupKey = this.lookupRealGroupKeyByMatchValue(matchValue, topGroupField);
				ordered.push(buildVirtualTopNode(matchValue, topGroupField, realGroupKey, emptyGroupHasPlaceholder));
				if (realGroupKey !== void 0) emptyRealGroupKeys.add(realGroupKey);
				hasVirtual = true;
			}
			for (var node1 of topNodes) {
				if (used.has(node1)) continue;
				if (filterEmptyOutsiders && node1.children.length === 0) continue;
				ordered.push(node1);
			}
			return {
				normalized: ordered,
				hasVirtual,
				emptyRealGroupKeys
			};
		};
		/**
		* 收集所有需要参与父子平铺的 ISubNode 根。
		*
		* - 视图未启用父子记录：getFormattedSub() 返回 null，整体返回 []，调用方据此清空缓存；
		* - 启用 + 无分组：getFormattedSub() 即顶层 ISubNode 数组；
		* - 启用 + 有分组：遍历 getGroupTree() 找到所有叶子层中的 ISubNode 元素（按出现顺序追加），
		*   把每个 ISubNode 当作独立根传入 flattenSubTree。同一记录在多分组叶子层不会重复出现（由 core
		*   的 buildSubTreeForRecordIds 保证 scoped 隔离）。
		*/ _proto.collectSubTreeRoots = function collectSubTreeRoots() {
			var sub = this.getFormattedSub();
			if (!sub) return [];
			if (!this.hasGroup()) return sub;
			var groupTree = this.getGroupTree();
			if (groupTree.length === 0) return [];
			var roots = [];
			this.walkGroupTreeForSubRoots(groupTree, roots);
			return roots;
		};
		/**
		* DFS 遍历 GroupTree，找出叶子层（children 元素均非 IFormattedTree）中的 ISubNode 节点。
		* 字符串 RecordId 元素跳过 —— 它们是"非父子树成员的普通 record"，渲染层走普通分支即可。
		*/ _proto.walkGroupTreeForSubRoots = function walkGroupTreeForSubRoots(trees, out) {
			for (var node of trees) {
				if (typeof node === "string") continue;
				if (!isFormattedTreeNode(node)) {
					out.push(node);
					continue;
				}
				var { children } = node;
				if (children.every((c) => typeof c === "string" || !isFormattedTreeNode(c))) {
					for (var child of children) {
						if (typeof child === "string") continue;
						if (!isFormattedTreeNode(child)) out.push(child);
					}
					continue;
				}
				this.walkGroupTreeForSubRoots(children, out);
			}
		};
		/**
		* 按 title 列表顺序解析出 fieldId，找不到的 title 会被 warn 一次并丢弃。
		* 同一个 title 出现重复时取第一个匹配字段，避免 widthAdjuster 之类的下游因重复 fieldId 而出错。
		*/ _proto.resolveFieldIdsByTitles = function resolveFieldIdsByTitles(titles, side) {
			if (titles.length === 0) return [];
			var titleSet = new Set(titles);
			var titleToFieldId = /* @__PURE__ */ new Map();
			for (var fieldId of this.getAllFieldIds()) {
				var field = this.getFieldByFieldId(fieldId);
				if (!field) continue;
				var title = field.getTitle();
				if (titleSet.has(title) && !titleToFieldId.has(title)) titleToFieldId.set(title, fieldId);
			}
			var result = [];
			for (var title1 of titles) {
				var fieldId1 = titleToFieldId.get(title1);
				if (fieldId1) result.push(fieldId1);
				else logger.warn("grid-list", `[${side}] field not found by title: ${title1}`);
			}
			return result;
		};
		return DataUtil;
	}(BaseCollectorDataUtil);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/range.js
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
var import_main$1, RangeCollector;
var init_range = __esmMin((() => {
	init_event();
	import_main$1 = require_main();
	init_interface$6();
	RangeCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$6(RangeCollector, Disposable);
		function RangeCollector(size, rows) {
			var _this = Disposable.call(this) || this;
			_this.size = size;
			_this.rows = rows;
			_this.scrollTop = 0;
			_this.rowRange = {
				start: 0,
				end: -1
			};
			_this.onScrollEmitter = _this._register(new Emitter());
			_this.onScroll = _this.onScrollEmitter.event;
			return _this;
		}
		var _proto = RangeCollector.prototype;
		_proto.collect = function collect() {
			this.scrollTop = this.clampScrollTop(this.scrollTop);
			this.updateRowRange();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.getRowRange = function getRowRange() {
			return this.rowRange;
		};
		_proto.scrollByDelta = function scrollByDelta(deltaY) {
			if (deltaY === 0) return;
			this.scrollToY(this.scrollTop + deltaY);
		};
		_proto.scrollToY = function scrollToY(scrollTop) {
			var next = this.clampScrollTop(scrollTop);
			if (next === this.scrollTop) return;
			this.scrollTop = next;
			this.updateRowRange();
			this.onScrollEmitter.fire();
		};
		_proto.clampScrollTop = function clampScrollTop(value) {
			return Math.max(0, Math.min(value, this.maxScrollTop));
		};
		/**
		* 按 scrollTop + bodyHeight 找出当前可见的 row index 区间。
		* RecordRange 内部用线性 offset，外层 GroupHead/Spacing 行整体计入。
		*/ _proto.updateRowRange = function updateRowRange() {
			var viewTop = this.scrollTop;
			var viewBottom = this.scrollTop + this.size.rootHeight;
			var start = -1;
			var end = -1;
			var { rowCount } = this.rows;
			if (rowCount === 0) {
				this.rowRange = {
					start: 0,
					end: -1
				};
				return;
			}
			this.rows.forEachRowInfo((info) => {
				if (info.height === 0) return;
				if (info.type === RowType.RecordRange) {
					var range = info;
					var { recordHeight } = this.size;
					var recordCount = range.recordIds.length;
					var rangeTop = range.y;
					if (range.y + range.height < viewTop || rangeTop > viewBottom) return;
					var firstRelative = Math.max(0, viewTop - rangeTop);
					var lastRelative = Math.max(0, viewBottom - rangeTop);
					var firstOffset = Math.max(0, Math.floor(firstRelative / recordHeight) - 1);
					var lastOffset = Math.min(recordCount - 1, Math.floor(lastRelative / recordHeight));
					var firstIndex = range.index + firstOffset;
					var lastIndex = range.index + lastOffset;
					start = start === -1 ? firstIndex : Math.min(start, firstIndex);
					end = Math.max(end, lastIndex);
					return;
				}
				if (info.y + info.height < viewTop || info.y > viewBottom) return;
				start = start === -1 ? info.index : Math.min(start, info.index);
				end = Math.max(end, info.index);
			});
			this.rowRange = {
				start: Math.max(0, start),
				end: Math.min(rowCount - 1, end)
			};
		};
		_create_class$1(RangeCollector, [{
			key: "maxScrollTop",
			get: function() {
				return Math.max(0, this.rows.scrollHeight - this.size.rootHeight);
			}
		}]);
		return RangeCollector;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/row.js
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
	import_main = require_main();
	init_interface$6();
	init_run_group();
	init_placeholder_record();
	RowCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$5(RowCollector, Disposable);
		function RowCollector(dataUtil, size, state) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.size = size;
			_this.state = state;
			_this.rowCount = 0;
			_this.recordCount = 0;
			/** 当前所有行的总高度（含 Spacing），用于计算 maxScrollTop */ _this.scrollHeight = 0;
			_this.rowInfos = /* @__PURE__ */ new Map();
			/** 按 index 升序的所有 key，用于 RecordRange 内查找某个具体 record 的辅助索引 */ _this.indexKeys = [];
			/** 当前累加排版游标 Y，仅在 collect 期间使用 */ _this.cursorY = 0;
			/**
			* runGroupTree 的 handler 回调：根据 RowType 创建对应 RowInfo 并更新游标 Y。
			*
			* 收集策略：
			*   - GroupHead / RecordRange：进 rowInfos，rowCount 推进，cursorY 按真实高度推进；
			*   - Spacing：
			*       · parent === -1（顶层兄弟分组之间）→ cursorY += headRecordGap（5px 视觉间距）；
			*       · parent >= 0（嵌套分组之间 / 末位 GroupAdd 之前）→ 完全忽略（二三层视觉上紧贴）；
			*   - 其它（GroupFoot / RecordAdd / Stat / GroupAdd 等）→ 完全忽略，返回 -1。
			*
			* GroupHead 后的 gap（与下方第一行的间距）：
			*   - level === 0 非折叠 → cursorY += headRecordGap，与圆角背景的视觉分隔需求一致；
			*   - level >= 1 → 不补 gap，紧贴下一行（无论是子分组 head 还是 record）；
			*   - 折叠态一律不补 gap（折叠组只占自身高度，下一段 Spacing/兄弟分组自身已承担间隔）。
			*
			* 返回值是新行的 row index；对于不收集的类型返回 -1。
			* runGroupTree 中 setGroupHeadStickyEnd 在 endIndex < 0 时会安全跳过，
			* list 视图也不依赖 stickyEndIndex（sticky 由 scroller feature 自算），所以 -1 是安全的。
			*/ _this.createRowInfo = (type, parent, param) => {
				if (type === RowType.Spacing) {
					if (parent === -1) _this.cursorY += _this.size.headRecordGap;
					return -1;
				}
				var rowInfo;
				var index = _this.rowCount;
				if (type === RowType.GroupHead) {
					rowInfo = _this.createGroupHeadRowInfo(index, parent, param);
					_this.rowCount += 1;
				} else if (type === RowType.RecordRange) {
					rowInfo = _this.createRecordRangeRowInfo(index, parent, param);
					_this.rowCount += rowInfo.recordIds.length;
					_this.recordCount += rowInfo.recordIds.length;
				} else return -1;
				if (_this.isHiddenByFoldParent(parent)) rowInfo.height = 0;
				_this.rowInfos.set(index, rowInfo);
				_this.cursorY += rowInfo.height;
				if (rowInfo.type === RowType.GroupHead && !rowInfo.fold && rowInfo.level === 0) _this.cursorY += _this.size.headRecordGap;
				return index;
			};
			return _this;
		}
		var _proto = RowCollector.prototype;
		_proto.getTypeRows = function getTypeRows(rowType) {
			return Array.from(this.rowInfos.values()).filter((info) => info.type === rowType);
		};
		_proto.forEachRowInfo = function forEachRowInfo(callback) {
			this.rowInfos.forEach(callback);
		};
		_proto.getRecordSize = function getRecordSize() {
			return this.size.recordHeight;
		};
		/** 取出指定 index 对应的行（如果落在 RecordRange 内部，则展开为单条 Record） */ _proto.getInfo = function getInfo(index) {
			if (index < 0 || index >= this.rowCount) return;
			var rowInfo = this.rowInfos.get(index);
			if (rowInfo) {
				if (rowInfo.type === RowType.RecordRange) return this.expandRecordFromRange(rowInfo, index);
				return rowInfo;
			}
			var closest = this.getClosestRecordRangeIndex(index);
			var rangeInfo = closest >= 0 ? this.rowInfos.get(closest) : void 0;
			if ((rangeInfo === null || rangeInfo === void 0 ? void 0 : rangeInfo.type) === RowType.RecordRange) return this.expandRecordFromRange(rangeInfo, index);
		};
		/** 通过 recordId 反查行信息 */ _proto.getInfoByRecordId = function getInfoByRecordId(recordId) {
			if (!recordId) return;
			var ranges = this.getTypeRows(RowType.RecordRange);
			var range;
			for (var item of ranges) if (item.recordIds.includes(recordId)) {
				range = item;
				break;
			}
			if (!range) return;
			var offset = range.recordIds.indexOf(recordId);
			return this.expandRecordFromRange(range, range.index + offset);
		};
		/**
		* Returns the recordId sequence eligible for "range selection", following the record collection
		* order (RecordRanges flattened across groups, in ascending index order — i.e. top-to-bottom on
		* screen).
		*
		* - Iterates all RecordRanges by ascending index and concatenates their recordIds, yielding a
		*   linear sequence consistent with the on-screen / collection order and spanning across groups;
		* - Skips RecordRanges under a folded group (`height === 0`, rows invisible, must not join the
		*   shift range-selection);
		* - Skips placeholder virtual records (empty-group placeholder rows: not real data, not selectable).
		*
		* Used by the hover feature's checkbox "shift + click" continuous selection/deselection
		* (`getShiftSelectionChange`) to reason about ranges across groups.
		*/ _proto.getOrderedRecordIds = function getOrderedRecordIds() {
			var ranges = this.getTypeRows(RowType.RecordRange).slice().sort((a, b) => a.index - b.index);
			var ids = [];
			for (var range of ranges) {
				if (range.height === 0) continue;
				for (var id of range.recordIds) {
					if (isPlaceholderRecordId(id)) continue;
					ids.push(id);
				}
			}
			return ids;
		};
		/**
		* Computes the record set + action for a checkbox "shift + click", anchored at `anchorId` while
		* clicking `targetId`, following the record collection order (cross-group). The anchor itself is
		* never moved by this operation; the behaviour depends on whether the target is currently selected
		* (via the injected `isSelected` predicate — selection state lives in StateCenter, order lives here):
		*
		* - Target NOT selected → **extend**: select the whole `[anchor, target]` segment (order-independent).
		* - Target already selected → **shrink**: keep `[anchor, target]` selected and deselect the
		*   contiguous run of already-selected records immediately beyond the target, in the direction
		*   *away from the anchor*. (e.g. anchor=10, currently 10..20 selected, click 15 → deselect 16..20.)
		*
		* Returns `null` when either endpoint is missing from the ordered sequence (anchor's group folded,
		* record deleted, or degenerate anchor === target), so the caller can fall back to a plain toggle.
		* The shrink "nothing to peel off" case returns `{ recordIds: [], select: false }` (a valid no-op
		* shift action), so the caller does NOT degrade to a plain toggle (which would flip the target and
		* move the anchor).
		*/ _proto.getShiftSelectionChange = function getShiftSelectionChange(anchorId, targetId, isSelected) {
			if (!anchorId || !targetId) return null;
			var ordered = this.getOrderedRecordIds();
			var anchorIdx = ordered.indexOf(anchorId);
			var targetIdx = ordered.indexOf(targetId);
			if (anchorIdx === -1 || targetIdx === -1 || anchorIdx === targetIdx) return null;
			if (!isSelected(targetId)) {
				var [start, end] = anchorIdx <= targetIdx ? [anchorIdx, targetIdx] : [targetIdx, anchorIdx];
				return {
					recordIds: ordered.slice(start, end + 1),
					select: true
				};
			}
			var step = targetIdx > anchorIdx ? 1 : -1;
			var recordIds = [];
			for (var i = targetIdx + step; i >= 0 && i < ordered.length; i += step) {
				if (!isSelected(ordered[i])) break;
				recordIds.push(ordered[i]);
			}
			return {
				recordIds,
				select: false
			};
		};
		_proto.collect = function collect() {
			this.beforeCollect();
			this.collectRows();
			this.afterCollect();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.beforeCollect = function beforeCollect() {
			this.rowCount = 0;
			this.recordCount = 0;
			this.rowInfos.clear();
			this.indexKeys = [];
			this.cursorY = this.size.globalPaddingTop;
			this.scrollHeight = 0;
		};
		_proto.afterCollect = function afterCollect() {
			this.indexKeys = Array.from(this.rowInfos.keys()).sort((a, b) => a - b);
			this.scrollHeight = this.cursorY + this.size.globalPaddingBottom;
		};
		_proto.collectRows = function collectRows() {
			var groupTree = this.dataUtil.getGroupTree();
			if (groupTree.length > 0) {
				runGroupTree({ getShouldHideGroupInsert: () => true }, this.state, this.rowInfos, this.createRowInfo, groupTree, 0);
				return;
			}
			var recordIds = this.dataUtil.getSubTreeOrderedRecordIds();
			if (recordIds.length > 0) this.createRowInfo(RowType.RecordRange, -1, { recordIds });
		};
		_proto.createGroupHeadRowInfo = function createGroupHeadRowInfo(index, parent, param) {
			var _a;
			var headInfo = param === null || param === void 0 ? void 0 : param.headInfo;
			var level = (_a = param === null || param === void 0 ? void 0 : param.level) !== null && _a !== void 0 ? _a : 0;
			var height = level >= 1 ? this.size.nestedGroupHeadHeight : this.size.groupHeadHeight;
			return {
				type: RowType.GroupHead,
				level,
				index,
				parent,
				x: this.size.rowStartX,
				y: this.cursorY,
				height,
				fold: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.fold) || false,
				count: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.count) || 0,
				path: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.path) || [],
				groupValue: (headInfo === null || headInfo === void 0 ? void 0 : headInfo.groupValue) || null
			};
		};
		_proto.createRecordRangeRowInfo = function createRecordRangeRowInfo(index, parent, param) {
			var _a, _b;
			var recordIds = (param === null || param === void 0 ? void 0 : param.recordIds) || [];
			var { recordHeight } = this.size;
			return {
				type: RowType.RecordRange,
				level: (_b = (_a = this.rowInfos.get(parent)) === null || _a === void 0 ? void 0 : _a.level) !== null && _b !== void 0 ? _b : 0,
				index,
				parent,
				x: this.size.rowStartX,
				y: this.cursorY,
				height: recordHeight * recordIds.length,
				recordIds,
				recordCountBefore: this.recordCount
			};
		};
		/** 将某条 record 从所属 RecordRange 展开成一个真实 Record 行 */ _proto.expandRecordFromRange = function expandRecordFromRange(range, rowIndex) {
			var offset = rowIndex - range.index;
			var recordHeight = range.height === 0 ? 0 : this.size.recordHeight;
			var y = range.y + offset * recordHeight;
			return {
				type: RowType.Record,
				level: range.level,
				index: rowIndex,
				parent: range.parent,
				x: range.x,
				y,
				height: recordHeight,
				recordId: range.recordIds[offset],
				recordIndex: range.recordCountBefore + offset
			};
		};
		/** 向上递归判断是否处在折叠分组下（含本身） */ _proto.isHiddenByFoldParent = function isHiddenByFoldParent(parentIndex) {
			var cursor = parentIndex;
			while (cursor >= 0) {
				var row = this.rowInfos.get(cursor);
				if (!row) return false;
				if (row.type === RowType.GroupHead && row.fold) return true;
				cursor = row.parent;
			}
			return false;
		};
		/** 在 indexKeys 中二分查找小于 rowIndex 的最大 key */ _proto.getClosestRecordRangeIndex = function getClosestRecordRangeIndex(rowIndex) {
			if (this.indexKeys.length === 0) return -1;
			var left = 0;
			var right = this.indexKeys.length - 1;
			var result = -1;
			while (left <= right) {
				var mid = left + right >> 1;
				if (this.indexKeys[mid] < rowIndex) {
					result = this.indexKeys[mid];
					left = mid + 1;
				} else right = mid - 1;
			}
			return result;
		};
		return RowCollector;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/size.js
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
	init_size$1();
	init_bottom_collectors();
	SizeCollector = /* @__PURE__ */ function(BaseSizeCollector) {
		"use strict";
		_inherits$4(SizeCollector, BaseSizeCollector);
		function SizeCollector(dataUtil) {
			var _this = BaseSizeCollector.call(this, dataUtil) || this;
			_this.dataUtil = dataUtil;
			/** 容器左右内边距 */ _this.globalPaddingX = 16;
			/** 容器上下内边距 */ _this.globalPaddingY = 0;
			/** 最外层（level === 0，参与 sticky）分组头总高度 */ _this.groupHeadHeight = 36;
			/** 嵌套层（level >= 1，视觉等同 record）分组头总高度，比 L0 略矮以更贴近 record 行高 */ _this.nestedGroupHeadHeight = 36;
			/** 分组头左右内边距（与全局 paddingX 叠加用） */ _this.headPaddingX = 12;
			/** 折叠按钮尺寸 */ _this.foldIconSize = 16;
			/** 折叠按钮与分组值的间距 */ _this.foldIconGap = 6;
			/**
			* 命中特殊配置时左侧装饰图标尺寸。
			*
			* 状态列 svg viewBox 为 24×24，此处取 24 与视觉稿齐平（1:1 不缩放，减少小尺寸下描边模糊）。
			* 与 kanban-todo 卡片 body iconOnly 状态 pill 直径、`kanban-todo/collector/head.ts` 分组头
			* 装饰 icon 尺寸三处对齐；如需整体缩放请同步这三处。
			*/ _this.headKeyIconSize = 22;
			/** 命中特殊配置但无 icon 时绘制的圆点直径（与 kanban-todo headDotSize 对齐） */ _this.headKeyDotSize = 10;
			/** 装饰段（icon/dot）与标题之间的间距（与 kanban-todo headTitleGap 对齐） */ _this.headKeyTitleGap = 8;
			/** 分组值字号（与 kanban-todo headTitleFontSize 对齐） */ _this.headTitleFontSize = 14;
			/**
			* 空分组标题字号（\"{列名}: 空\" 兜底文案专用，与 kanban-todo headEmptyTitleFontSize 对齐）。
			* 视觉上比正常分组标题小一号，配合 `lightUltraFontColor` 呈弱化态。
			*/ _this.headEmptyTitleFontSize = 14;
			/** 分组值与数量的间距（与 kanban-todo headCountGap 对齐） */ _this.headCountGap = 15;
			/** 分组数量字号（与 kanban-todo headCountFontSize 对齐） */ _this.headCountFontSize = 12;
			/** 分组头右侧加号按钮尺寸 */ _this.headAddBtnSize = 20;
			/** 分组头「全选/取消全选」文字字号（与 kanban-todo headSelectAllFontSize 对齐） */ _this.headSelectAllFontSize = 12;
			/** 分组背景圆角 */ _this.headBgRadius = 8;
			/**
			* 嵌套层（level >= 1）GroupHead 中段直线两端留白：
			* 直线左端 = title/count 右沿 + 该值；直线右端 = 右侧按钮左沿 - 该值。
			*/ _this.nestedHeadLineSideGap = 8;
			/**
			* 存在分组时，Record 内容相对于 GroupHead 分组值起始位置的额外缩进（px）。
			* 竖线绘制在 groupValueStartX + groupIndentLineOffsetX 处，Record 内容从竖线右侧 + gap 开始。
			*/ _this.groupIndentWidth = 25;
			/** 分组竖线相对于 rowStartX 的 X 偏移（线中心 X = rowStartX + groupLineOffsetX） */ _this.groupLineOffsetX = 44;
			/** 分组竖线线宽 */ _this.groupLineWidth = 1;
			/** 竖线向上延伸的额外长度（穿透到上一条 record 的间隙区域，视觉上形成连续线） */ _this.lineTopExtend = 5;
			/** Record 行高 */ _this.recordHeight = 38;
			/** 分组之间 Spacing 行的高度（即相邻分组之间留白；用户要求 5px） */ _this.headRecordGap = 5;
			/** Record 行的圆角（hover / selected 背景） */ _this.recordBgRadius = 8;
			/** Record 内容上下 padding */ _this.recordCellPaddingY = 10;
			/** 左侧字段单元格之间的间距 */ _this.leftFieldGap = 25;
			/**
			* 主列（primaryTitle）→ 行 status icon 的间距。
			*
			* 该 icon 紧贴在主列文本之后，与"字段之间"的语义不同（视觉上是主列文本的装饰附属），
			* 故采用比 `leftFieldGap` 更紧凑的留白，强化与主列的从属关系。
			* icon 自身的尾部间距继续复用 `leftFieldGap`，保证 icon → 下一左侧字段与"字段之间"一致。
			*/ _this.primaryToStatusIconGap = 8;
			/** 右侧字段单元格之间的间距 */ _this.rightFieldGap = 25;
			/** 左侧字段与中间剩余空间 / 右侧字段的最小留白 */ _this.leftToRightMinGap = 15;
			/** 右侧无数据时的灰色占位圆直径 */ _this.placeholderDotSize = 18;
			/** 字段内容字号 */ _this.contentFontSize = 13;
			/**
			* 左侧 status 列文案字号（与 kanban-todo `SizeCollector.bottomStatusFontSize` 对齐）。
			* `ListConfig.recordLeftShowFieldTitles` 末尾追加了 `card.bottom.statusFieldTitle`，
			* 命中该列时 content collector 会短路通用 fieldCollector，
			* 直接调用 `shared/bottom-collectors.collectStatusText` 走与卡片底部 1:1 视觉。
			*/ _this.bottomStatusFontSize = 12;
			/** 同一行内相邻 pill 之间的横向间距 */ _this.tagItemGap = 8;
			/**
			* primary 段（含 statusIcon 装饰）之后、tag pill 段之前的横向间距。
			* 与 `primaryToStatusIconGap` 同语义层（紧贴主列附属内容），区别于
			* `leftFieldGap`（左侧字段之间的视觉等距间距）。
			*/ _this.primaryToTagRowGap = 20;
			/** owner 列重叠头像组：单个头像直径（与 kanban-todo SizeCollector.avatarSize 一致；外环含 1px 描边 + 1px 留白，内层视觉 = 22px） */ _this.avatarSize = 26;
			/** 默认头像（无图）首字母字号 */ _this.avatarTextFontSize = 12;
			/** 相对时间文本字号 */ _this.relativeDateFontSize = 12;
			/**
			* 空态文案字号；与 kanban-todo 空分组提示「暂无事项」保持同一视觉层级（轻量灰字）。
			*/ _this.emptyTipFontSize = 13;
			/**
			* 空态文案行高（用于 pen.config.text 的 height）；20px 内单行居中绘制即可，
			* 不需要预留多行空间——文案是一句简短引导语。
			*/ _this.emptyTipHeight = 20;
			/**
			* 空态文案距 body 顶部的内边距（视觉上不贴顶，给一点呼吸空间）。
			*/ _this.emptyTipPaddingTop = 80;
			/** Record hover 状态下左侧 checkbox 尺寸 */ _this.checkboxSize = 20;
			/** checkbox 距离 Record 行左边的留白 */ _this.checkboxPaddingLeft = 10;
			/** checkbox 与后续字段内容的间距 */ _this.checkboxGap = 6;
			/**
			* 每一层父子缩进的宽度（px）。
			*
			* 渲染时主列文本起点 X = `groupValueStartX + 2 + level * subIndentWidth`，
			* 左侧其他字段整体随之右移；右侧字段不受影响。
			* 顶层 record（level=0）退化为无缩进，与未启用父子记录时视觉一致。
			*/ _this.subIndentWidth = 28;
			/** 父子关联线线宽（px），实线 1px 与嵌套分组头中段直线一致 */ _this.subLineWidth = 1;
			/** 关联线横段右端到主列文本起点之间留白（px） */ _this.subLineGapToText = 6;
			/**
			* 父子关联线在转角处的斜段尺寸（px）—— 取 45°，水平投影 == 垂直投影。
			* 竖线到 (midY - subLineSlope) 处开始向右下倾斜，到 (vx + subLineSlope, midY) 结束，再水平延伸。
			*/ _this.subLineSlope = 8;
			/**
			* 父子关联线竖线相对"缩进列中点"的水平微调偏移（px，正右负左）。
			*
			* 默认竖线 X = 缩进列中点 = `leftStartX - indent * (k + 1) + indent / 2`。
			* 由于 `subIndentWidth` 大于父行主列前置图标（priority icon）的宽度，
			* 竖线中点会略偏离父行图标视觉中心；用此偏移把竖线拉回到与父行图标垂直居中对齐。
			*/ _this.subLineCenterOffsetX = -3;
			return _this;
		}
		_create_class(SizeCollector, [
			{
				key: "relativeDateSlotWidth",
				get: function() {
					return measureRelativeTimeSlotWidth(this.relativeDateFontSize);
				}
			},
			{
				key: "rootWidth",
				get: function() {
					return Math.ceil(this.globalOriginRootWidth / this.scale);
				}
			},
			{
				key: "rootHeight",
				get: function() {
					return Math.ceil(this.globalOriginRootHeight / this.scale);
				}
			},
			{
				key: "globalPaddingLeft",
				get: function() {
					return this.globalPaddingX;
				}
			},
			{
				key: "globalPaddingRight",
				get: function() {
					return this.globalPaddingX;
				}
			},
			{
				key: "globalPaddingTop",
				get: function() {
					return this.globalPaddingY;
				}
			},
			{
				key: "globalPaddingBottom",
				get: function() {
					return this.globalPaddingY;
				}
			},
			{
				key: "globalWidth",
				get: function() {
					return this.rootWidth;
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
				key: "rowWidth",
				get: function() {
					return this.rootWidth - this.globalPaddingLeft - this.globalPaddingRight;
				}
			},
			{
				key: "rowStartX",
				get: function() {
					return this.globalPaddingLeft;
				}
			},
			{
				key: "groupValueStartX",
				get: function() {
					return this.rowStartX + this.headPaddingX + this.foldIconSize + this.foldIconGap;
				}
			},
			{
				key: "groupLineCenterX",
				get: function() {
					return this.rowStartX + this.groupLineOffsetX;
				}
			},
			{
				key: "groupedRecordStartX",
				get: function() {
					return this.groupValueStartX + this.groupIndentWidth;
				}
			}
		]);
		return SizeCollector;
	}(BaseSizeCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/utils/storage-key.js
var GridListStorageType;
var init_storage_key = __esmMin((() => {
	(function(GridListStorageType) {
		/** 分组折叠态：value 为 `{ signature: string; paths: string[] }` 的 JSON 字符串 */ GridListStorageType["FoldGroup"] = "WbListFoldGroups";
	})(GridListStorageType || (GridListStorageType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/state.js
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
/** 保守判断 storage value 是否符合期望结构，防御 JSON 损坏 / 旧版本纯数组 payload / 手动改坏。 */ function isFoldStoragePayload(value) {
	if (!value || typeof value !== "object") return false;
	var record = value;
	return typeof record.signature === "string" && Array.isArray(record.paths) && record.paths.every((item) => typeof item === "string");
}
var StateCenter;
var init_state = __esmMin((() => {
	init_es();
	init_es$1();
	init_string_group_path();
	init_state$1();
	init_storage_sync$1();
	init_storage_key();
	init_avatar_time_utils();
	init_batch_selection();
	init_group_key_config();
	init_source_field();
	init_wb_cell();
	init_wb_config();
	StateCenter = /* @__PURE__ */ function(BaseStateCollector) {
		"use strict";
		_inherits$3(StateCenter, BaseStateCollector);
		function StateCenter(dataUtil) {
			var _this = BaseStateCollector.call(this) || this;
			_this.dataUtil = dataUtil;
			/** 折叠分组路径序列化后的 key 集合（与 grid/utils/string-group-path 共享算法） */ _this.foldGroups = /* @__PURE__ */ new Set();
			/**
			* 本地存储恢复门闩：`buildIndex` 每次 collect/patch 都会跑，但折叠态本地恢复
			* 只应在首个 `buildIndex` 里执行一次 —— 之后再跑就会把用户运行时的折叠改动覆盖掉。
			*
			* 这里选择在 `buildIndex` 里恢复（而不是构造函数）：构造时 `dataUtil.getCurrentView()`
			* 未必已就绪（`getGroupFields()` 依赖 view），且我们需要利用当时的 groupFlatten 做
			* 「分组数据不存在」的失效清洗；`buildIndex` 阶段两个前置条件都已满足。
			*/ _this.foldStateLoaded = false;
			/** 跨视图共享的批量选择容器（mode + selected ids + emitter） */ _this.batch = _this._register(new BatchSelection());
			/**
			* shift 连续选中的「锚点」recordId：记录最近一次非 shift 的 checkbox 点选。
			* shift + 点选时以此为起点、到当前 record 之间按 record 收集顺序（跨分组）整体置选。
			* 空串表示当前无锚点（尚未点选过 / 选中集已被清空 / 已退出批量模式）。
			*/ _this.selectAnchorRecordId = "";
			_this.ownerFieldId = "";
			_this.dateFieldId = "";
			_this.bottomStatusFieldId = "";
			_this.hasOwnerField = false;
			_this.hasDateField = false;
			_this.hasBottomStatusField = false;
			/**
			* sys_tags 字段专用索引：与其它 tag 字段（`bodyTagFieldIds`）解耦。
			*
			* 语义：`sys_tags` 是一个多值 tag 列，在 grid-list 中以「独立段」渲染
			* ——紧跟在主列附属的 `body tag row` 段（sys_source 等 pill）之后，
			* 使用 `collectTagsPillsInRect` 收集，实现"尽量摆下所有 tag，装不下时尾部合成 +N"的
			* 折叠行为，与 kanban-todo 卡片的独立 sys_tags 行同源。
			*
			* 因此需要从常规 `bodyTagFieldIds` 中剔除 sys_tags，避免被 collectBodyTag 重复渲染。
			*/ _this.sysTagsFieldId = "";
			_this.hasSysTagsField = false;
			/**
			* sys_priority 字段专用索引：仅供 `getVisibleBodyTagFieldIds(recordId)` 逐 record
			* 判定「优先级为无（rawText 为空）时不展示」使用（grid-list 特有业务约定；
			* 其他视图仍展示「无」pill —— 见 `wb-cell.resolveBodyTagItem` 的 sys_priority 分支）。
			*
			* sys_priority 本身仍属于 `bodyTagFieldIds` 常规成员（视觉上是 body tag row 一环），
			* 这里只是为过滤逻辑单独持有一个 fieldId 引用，避免逐次遍历 bodyTagFieldIds 反查 title。
			*/ _this.priorityFieldId = "";
			_this.hasPriorityField = false;
			/**
			* sys_source（来源）字段专用索引：来源列同样以 body tag pill 形式渲染在 body tag row 中，
			* 但它是**只读**列（不支持修改 / 编辑）。此处单独持有其 fieldId，供 hover feature 判定
			* 「命中的 pill 是否为来源列」——命中来源 pill 时 cursor 保持 DEFAULT，不升级为 POINTER。
			*/ _this.sourceFieldId = "";
			_this.hasSourceField = false;
			/**
			* 行内「标签组」字段的 fieldId 列表（按 `WbSharedConfig.card.body.tagFieldTitles` 顺序解析）。
			*
			* 与 `dataUtil.getLeftFieldIds()` 解耦：tagFieldTitles 不写在 `ListConfig.recordLeftShowFieldTitles`
			* 中，因此不会进入 leftFieldIds 的 flex 布局循环；而是由 content collector 在主列
			* 渲染（含 statusIcon 装饰）之后，作为独立段调用 `collectBodyTag` 联合产出 pill 行。
			*
			* 注意：`sys_tags` 走独立段渲染（`collectTagsPillsInRect`），不在此列表中；
			* 由 `sysTagsFieldId` / `hasSysTagsField` 单独持有。
			*/ _this.bodyTagFieldIds = [];
			/** 当前 visible 字段集合的缓存（来自 dataUtil.getVisibleFieldIds()），用于 O(1) 的 visible 判断 */ _this.visibleFieldIdSet = /* @__PURE__ */ new Set();
			_this.onSelectedRecordIdsChange = _this.batch.onChange;
			ensureRelativeTimePlugin();
			return _this;
		}
		var _proto = StateCenter.prototype;
		/** runGroupFlatten 直接调用此方法判断 GroupHead 初始 fold */ _proto.isGroupFold = function isGroupFold(groupPath) {
			return this.foldGroups.has(stringifyGroupPath(groupPath));
		};
		_proto.setGroupFoldState = function setGroupFoldState(groupPath, fold) {
			var key = stringifyGroupPath(groupPath);
			if (fold) this.foldGroups.add(key);
			else this.foldGroups.delete(key);
			this.saveState();
		};
		/**
		* 是否所有顶层分组都处于折叠态。
		*
		* 语义：顶层分组全部折叠即视为「全部折叠」——顶层折叠后其所有子分组 / 记录都不可见，
		* 无需再判断更深层级。当前无分组时返回 false。
		*
		* 顶层分组从规范化分组树 `getGroupTree()` 的根节点取（含记录数为 0 的空分组），
		* 与折叠 key 的产生源一致，避免空分组被漏判。
		*/ _proto.isAllGroupFold = function isAllGroupFold() {
			var _a;
			var hasTopGroup = false;
			for (var node of this.dataUtil.getGroupTree()) {
				if (typeof node === "string" || !isFormattedTreeNode(node)) continue;
				hasTopGroup = true;
				if (!((_a = node.path) === null || _a === void 0 ? void 0 : _a.length) || !this.isGroupFold(node.path)) return false;
			}
			return hasTopGroup;
		};
		/** 切换某分组的折叠态，返回切换后的新状态 */ _proto.toggleGroupFold = function toggleGroupFold(groupPath) {
			var next = !this.isGroupFold(groupPath);
			this.setGroupFoldState(groupPath, next);
			return next;
		};
		/**
		* 清空所有折叠态。
		*
		* 用于「批量设置全部分组折叠 / 展开」这类场景（renderer-model 的 setGroupFold 未指定
		* groupKeys 时先清空、再统一按新 fold 写入），语义与 grid 视图 StateCenter.clearGroupFold 对齐。
		* 内部立即落盘一次，与 setGroupFoldState 保持一致的持久化时机。
		*/ _proto.clearGroupFold = function clearGroupFold() {
			if (this.foldGroups.size === 0) return;
			this.foldGroups.clear();
			this.saveState();
		};
		/**
		* 把当前 `foldGroups` 快照写入 localStorage。
		*
		* value 结构：`{ signature, paths }`
		* - `signature`：当前分组签名（`getGroupFields()` 的 title 有序拼接），
		*   下次 load 时比对；签名不一致 → 分组依据已变，整条缓存作废（详见 `loadFoldStateIfNeeded`）。
		* - `paths`：已折叠分组的 `stringifyGroupPath` 序列化 key 数组。
		*
		* 由 `setGroupFoldState` 主动调用（每次点击）+ `GridListStorageSync` feature 的
		* beforeunload / visibilitychange / 点击画布外时机调用。同一个 storage key、同一份序列化，
		* 多次写只是覆盖，无一致性问题。
		*/ _proto.saveState = function saveState() {
			var payload = {
				signature: this.computeGroupSignature(),
				paths: Array.from(this.foldGroups)
			};
			setStorageValue(this.dataUtil.getContext(), GridListStorageType.FoldGroup, JSON.stringify(payload));
		};
		_proto.isRecordSelected = function isRecordSelected(recordId) {
			return this.batch.isSelected(recordId);
		};
		_proto.getSelectedRecordIds = function getSelectedRecordIds() {
			return this.batch.getSelectedIds();
		};
		/** 切换某条 record 的选中状态，fire 选中集合变化 */ _proto.toggleRecordSelected = function toggleRecordSelected(recordId) {
			this.batch.toggle(recordId);
		};
		/**
		* 批量设置一组 record 的选中态（供 shift 连续选中把区间整体置选使用）。
		* recordIds 为空时不触发事件（由底层 `BatchSelection.setIdsSelected` 保证）。
		*/ _proto.setRecordsSelected = function setRecordsSelected(recordIds, select) {
			this.batch.setIdsSelected(recordIds, select);
		};
		/** shift 连续选中的锚点 recordId（''=当前无锚点） */ _proto.getSelectAnchorRecordId = function getSelectAnchorRecordId() {
			return this.selectAnchorRecordId;
		};
		/** 更新 shift 连续选中的锚点（通常在非 shift 的 checkbox 点选后调用） */ _proto.setSelectAnchorRecordId = function setSelectAnchorRecordId(recordId) {
			this.selectAnchorRecordId = recordId;
		};
		/** 清空选中集合 */ _proto.clearSelected = function clearSelected() {
			this.batch.clear();
			this.selectAnchorRecordId = "";
		};
		/** 当前是否处于批量选择模式 */ _proto.isBatchSelectMode = function isBatchSelectMode() {
			return this.batch.isMode();
		};
		/**
		* 进入 / 退出批量选择模式。
		* 退出时自动清空已选集合并 fire 一次空数组事件（与 kanban-todo 行为一致），同时重置连续选中锚点。
		*/ _proto.setBatchSelectMode = function setBatchSelectMode(enable) {
			this.batch.setMode(enable);
			if (!enable) this.selectAnchorRecordId = "";
		};
		/**
		* 全选 / 取消全选某个分组内的所有 record（支持多层分组）。
		*
		* 入参 `path` 可以是任意层级（最外层 / 中间层 / 叶子层）的分组路径：
		* - `dataUtil.getGroupFlatten` 只返回叶子分组（最内层），其 `recordIds` 是该叶子分组直接持有的 records；
		* - 对非叶子层级，会把所有「以 `path` 为前缀」的叶子分组的 recordIds 全部收集起来，
		*   语义上等价于"该层下所有子孙叶子分组的 record 并集"。
		*/ _proto.selectAllInGroup = function selectAllInGroup(path, select) {
			var recordIds = this.collectRecordIdsByPathPrefix(path);
			this.batch.setIdsSelected(recordIds, select);
		};
		/** 某分组是否全选（语义同 `selectAllInGroup`，按 path 前缀聚合所有子孙叶子分组的 records） */ _proto.isGroupAllSelected = function isGroupAllSelected(path) {
			var recordIds = this.collectRecordIdsByPathPrefix(path);
			return this.batch.areAllSelected(recordIds);
		};
		/**
		* 在 collect / patch 阶段被 ListCollector 调用，重建以下索引：
		*
		* 1) owner / date / bottomStatus 三列：按 `WbSharedConfig.card.bottom.*` 反查 fieldId（同时校验列类型）；
		* 2) visible 字段集合（来自 `dataUtil.getVisibleFieldIds()`）：上层 `isOwnerFieldVisible` /
		*    `isDateFieldVisible` 等基于此做"必须可见才走特殊渲染"的过滤。
		*
		* title 与 kanban-todo 共用 `WbSharedConfig`：保证同一份配置控制两个视图，
		* 后续若想按视图独立配置，可在 `wb_views/grid-list/config.ts` 加 ListConfig.bottomFieldTitles 并在此读取。
		*/ _proto.buildIndex = function buildIndex() {
			var _a;
			this.loadFoldStateIfNeeded();
			var ownerTitle = WbSharedConfig.card.bottom.ownerFieldTitle;
			var dateTitle = WbSharedConfig.card.bottom.dateFieldTitle;
			var bottomStatusTitle = WbSharedConfig.card.bottom.statusFieldTitle;
			var tagFieldTitles = (_a = WbSharedConfig.card.body.tagFieldTitles) !== null && _a !== void 0 ? _a : [];
			this.ownerFieldId = "";
			this.dateFieldId = "";
			this.bottomStatusFieldId = "";
			this.hasOwnerField = false;
			this.hasDateField = false;
			this.hasBottomStatusField = false;
			this.sysTagsFieldId = "";
			this.hasSysTagsField = false;
			this.priorityFieldId = "";
			this.hasPriorityField = false;
			this.sourceFieldId = "";
			this.hasSourceField = false;
			this.bodyTagFieldIds = [];
			this.visibleFieldIdSet = new Set(this.dataUtil.getVisibleFieldIds());
			if (!ownerTitle && !dateTitle && !bottomStatusTitle && tagFieldTitles.length === 0) return;
			var tagTitleToFieldId = /* @__PURE__ */ new Map();
			for (var fieldId of this.dataUtil.getAllFieldIds()) {
				var field = this.dataUtil.getFieldByFieldId(fieldId);
				if (!field) continue;
				var title = field.getTitle();
				if (ownerTitle && !this.hasOwnerField && title === ownerTitle && isUserField(field.getType())) {
					this.ownerFieldId = fieldId;
					this.hasOwnerField = true;
				}
				if (dateTitle && !this.hasDateField && title === dateTitle && this.isDateLikeField(field)) {
					this.dateFieldId = fieldId;
					this.hasDateField = true;
				}
				if (bottomStatusTitle && !this.hasBottomStatusField && title === bottomStatusTitle) {
					this.bottomStatusFieldId = fieldId;
					this.hasBottomStatusField = true;
				}
				if (tagFieldTitles.length > 0 && tagFieldTitles.includes(title) && !tagTitleToFieldId.has(title)) tagTitleToFieldId.set(title, fieldId);
			}
			this.bodyTagFieldIds = tagFieldTitles.filter((title) => title !== SYS_TAGS_FIELD_TITLE).map((title) => tagTitleToFieldId.get(title)).filter((id) => Boolean(id));
			if (tagFieldTitles.includes("sys_tags")) {
				var sysTagsId = tagTitleToFieldId.get(SYS_TAGS_FIELD_TITLE);
				if (sysTagsId) {
					this.sysTagsFieldId = sysTagsId;
					this.hasSysTagsField = true;
				}
			}
			if (tagFieldTitles.includes("sys_priority")) {
				var priorityId = tagTitleToFieldId.get(SYS_PRIORITY_FIELD_TITLE);
				if (priorityId) {
					this.priorityFieldId = priorityId;
					this.hasPriorityField = true;
				}
			}
			if (tagFieldTitles.includes("sys_source")) {
				var sourceId = tagTitleToFieldId.get(WB_SOURCE_FIELD_TITLE);
				if (sourceId) {
					this.sourceFieldId = sourceId;
					this.hasSourceField = true;
				}
			}
			if (ownerTitle && !this.hasOwnerField) logger.warn("grid-list", `owner field not found by title: ${ownerTitle}`);
			if (dateTitle && !this.hasDateField) logger.warn("grid-list", `date field not found by title: ${dateTitle}`);
			if (bottomStatusTitle && !this.hasBottomStatusField) logger.warn("grid-list", `bottom status field not found by title: ${bottomStatusTitle}`);
			tagFieldTitles.forEach((title) => {
				if (!tagTitleToFieldId.has(title)) logger.warn("grid-list", `body tag field not found by title: ${title}`);
			});
			this.pruneSelectedRecordIds();
		};
		/** owner 列 fieldId（''=未命中） */ _proto.getOwnerFieldId = function getOwnerFieldId() {
			return this.ownerFieldId;
		};
		/** date 列 fieldId（''=未命中） */ _proto.getDateFieldId = function getDateFieldId() {
			return this.dateFieldId;
		};
		/** 指定 fieldId 当前是否在 visible 集合中（fieldId 为空时返回 false） */ _proto.isFieldVisible = function isFieldVisible(fieldId) {
			if (!fieldId) return false;
			return this.visibleFieldIdSet.has(fieldId);
		};
		/** owner 列是否同时命中且在 visible 集合中 */ _proto.isOwnerFieldVisible = function isOwnerFieldVisible() {
			return this.hasOwnerField && this.visibleFieldIdSet.has(this.ownerFieldId);
		};
		/** date 列是否同时命中且在 visible 集合中 */ _proto.isDateFieldVisible = function isDateFieldVisible() {
			return this.hasDateField && this.visibleFieldIdSet.has(this.dateFieldId);
		};
		/** 底部状态文案字段是否在 visible 集合中（grid-list 当前未在 UI 中使用，但保留与 kanban-todo 同源同义） */ _proto.isBottomStatusFieldVisible = function isBottomStatusFieldVisible() {
			return this.hasBottomStatusField && this.isFieldVisible(this.bottomStatusFieldId);
		};
		/** 底部状态文案 fieldId（''=未命中），用于 content collector 在 left 循环中识别 status 列并走专用渲染 */ _proto.getBottomStatusFieldId = function getBottomStatusFieldId() {
			return this.bottomStatusFieldId;
		};
		/**
		* 行内中段「配置序 ∩ visible」的字段列表：
		* - 主列（`dataUtil.getPrimaryFieldId()`）始终作为第一项强制出现，对齐 kanban-todo
		*   `collectPrimaryTitle` 把主列写死置顶的语义（业务约定主列在第一列默认必显示）；
		* - 其后追加 `dataUtil.getLeftFieldIds()`（已按 `ListConfig.recordLeftShowFieldTitles`
		*   顺序解析），并去掉与主列重复的项；
		* - 最后整体与 `dataUtil.getVisibleFieldIds()` 缓存（`visibleFieldIdSet`）取交集。
		*
		* 注：kanban-todo 的 `collectCellContents` 在内部把 primaryFieldId 跳过、由 `collectPrimaryTitle`
		* 单独渲染；grid-list 单行从左到右只有一段中段，无对应「primary 行」概念，所以采取
		* 「把主列塞到 visible 列表第一项」的方式由统一的左侧 flex 布局负责绘制，逻辑更收敛。
		*/ _proto.getVisibleLeftFieldIds = function getVisibleLeftFieldIds() {
			var primaryId = this.dataUtil.getPrimaryFieldId();
			var ordered = [];
			if (primaryId) ordered.push(primaryId);
			for (var id of this.dataUtil.getLeftFieldIds()) if (id !== primaryId) ordered.push(id);
			return ordered.filter((id) => this.visibleFieldIdSet.has(id));
		};
		/**
		* 行内「标签组」字段的 fieldId 列表，按 `tagFieldTitles` 声明顺序，
		* 并已与 `dataUtil.getVisibleFieldIds()` 取交集。`collectBodyTag` 应使用此结果。
		*
		* 与 `getVisibleLeftFieldIds()` 解耦：tagFieldTitles 不参与左侧 flex 布局循环，
		* 专供 content collector 在主列渲染（含 statusIcon 装饰）之后作为独立段插入。
		*
		* @param recordId 可选；传入时在结果末尾会额外剔除「当前 record 优先级为无（rawText 为空）」
		*   的 sys_priority fieldId —— 这是 grid-list 特有业务约定「优先级为无则不展示」；
		*   不传时则按列可见性给出完整列表（用于列级布局判断等无关 record 的场景）。
		*/ _proto.getVisibleBodyTagFieldIds = function getVisibleBodyTagFieldIds(recordId) {
			var excludeIds = /* @__PURE__ */ new Set();
			if (this.hasBottomStatusField) excludeIds.add(this.bottomStatusFieldId);
			if (recordId !== void 0 && this.hasPriorityField && this.isPriorityEmptyForRecord(recordId)) excludeIds.add(this.priorityFieldId);
			return this.bodyTagFieldIds.filter((id) => this.visibleFieldIdSet.has(id) && !excludeIds.has(id));
		};
		/**
		* sys_tags 字段是否配置且在 visible 集合中。
		*
		* content collector 据此判断当前行是否需要追加「独立 sys_tags 段」——
		* 命中且数据非空时，在主列附属的 body tag row 段之后再插入 `collectTagsPillsInRect` 收集的 pill 段；
		* 未命中 / 不可见 / 数据为空时整段跳过、不占位。
		*/ _proto.isSysTagsFieldVisible = function isSysTagsFieldVisible() {
			return this.hasSysTagsField && this.visibleFieldIdSet.has(this.sysTagsFieldId);
		};
		/** sys_tags 字段 fieldId（''=未命中） */ _proto.getSysTagsFieldId = function getSysTagsFieldId() {
			return this.sysTagsFieldId;
		};
		/**
		* 判定 `fieldId` 是否为来源列（sys_source）。来源列只读，hover 命中其 body tag pill 时
		* cursor 应保持 DEFAULT（不支持修改 / 编辑）。未命中来源字段时恒为 false。
		*/ _proto.isSourceFieldId = function isSourceFieldId(fieldId) {
			return this.hasSourceField && fieldId === this.sourceFieldId;
		};
		/**
		* 取 sys_tags 单元格（用于喂给 `resolveTagsCellItems` 解析出 BodyTagItem[]）。
		* 未命中 sys_tags 字段时返回 undefined，调用方按"无数据"分支处理（不渲染独立段）。
		*/ _proto.getSysTagsCell = function getSysTagsCell(recordId) {
			if (!this.hasSysTagsField) return;
			return this.dataUtil.getStandardCell(this.sysTagsFieldId, recordId);
		};
		/**
		* 取得人员列单元格中的用户列表，未命中 / cell 空时返回 []。
		* 与 kanban-todo state 等价。
		*/ _proto.getOwnerUsers = function getOwnerUsers(recordId) {
			var _a;
			if (!this.hasOwnerField) return [];
			var cell = this.dataUtil.getStandardCell(this.ownerFieldId, recordId);
			return (_a = cell === null || cell === void 0 ? void 0 : cell.data) !== null && _a !== void 0 ? _a : [];
		};
		/**
		* 取得日期列时间戳，未命中 / cell 空 / 时间戳非正时返回 undefined。
		* 与 kanban-todo state 等价。
		*/ _proto.getDateTimestamp = function getDateTimestamp(recordId) {
			var _a;
			if (!this.hasDateField) return;
			var cell = this.dataUtil.getStandardCell(this.dateFieldId, recordId);
			var first = (_a = cell === null || cell === void 0 ? void 0 : cell.data) === null || _a === void 0 ? void 0 : _a[0];
			if (!first) return;
			if (typeof first.timestamp === "number" && first.timestamp > 0) return first.timestamp;
		};
		/**
		* 取 date 列单元格「完整时间展示文本」（field.format 已格式化好的绝对时间，如 `2026-06-25 19:53`）。
		*
		* 用于 hover-tooltip：卡片底部/行右侧渲染的是"5 分钟前 / 刚刚"这类相对时间，hover 时需要
		* 展开为「完整时间」以帮用户核对。与 `wb-cell.ts` 的绝对时间收集路径同源
		* （都读 `standardCell.data[0].text`），保证 tooltip 展示与列原生 DateTime 渲染视觉一致。
		*
		* 未命中 date 列 / cell 空 / text 空时返回 ''。
		*/ _proto.getDateFullText = function getDateFullText(recordId) {
			if (!this.hasDateField) return "";
			return getDateCellFullText(this.dataUtil.getStandardCell(this.dateFieldId, recordId));
		};
		/**
		* 底部状态列单元格的展示文本：先读 `cell.data[0].text` 拿到 matchValue（如 `pending/running/...`），
		* 再经 `mapGroupValueToDisplayTitle` 映射为 head 分组头同款展示 title（如「待开始」「进行中」），
		* 与 kanban-todo 卡片底部 status 文案完全同源。
		*
		* 未配置 / 找不到列 / 单元格为空时返回 ''；未命中 keyConf.matchValue 也无 groupTextMap 命中时
		* 回落到原始文本。
		*/ _proto.getBottomStatusText = function getBottomStatusText(recordId) {
			if (!this.hasBottomStatusField) return "";
			var rawText = readCellText(this.dataUtil, this.bottomStatusFieldId, recordId);
			if (!rawText) return "";
			return mapGroupValueToDisplayTitle(this.dataUtil.getFieldByFieldId(this.bottomStatusFieldId), rawText);
		};
		/**
		* 行级 status 列对应的 keyConf（用于在行最左渲染状态装饰 icon / dot）。
		*
		* 与 head 分组头 `resolveGroupKeyConf` 走同一条链路：rawText → applyGroupTextMap → resolveGroupKeyConf，
		* 保证「行内 status icon」与「分组头同语义 group icon」颜色 / 图标完全一致。
		*
		* 未配置 status 列 / 行 rawText 为空 / 未命中 keyConf 时返回 undefined，调用方按"无 icon"分支处理。
		*/ _proto.getBottomStatusKeyConf = function getBottomStatusKeyConf(recordId) {
			if (!this.hasBottomStatusField) return;
			var rawText = readCellText(this.dataUtil, this.bottomStatusFieldId, recordId);
			if (!rawText) return;
			var field = this.dataUtil.getFieldByFieldId(this.bottomStatusFieldId);
			return resolveGroupKeyConf(field, applyGroupTextMap(field, rawText));
		};
		_proto.isDateLikeField = function isDateLikeField(field) {
			var type = field.getType();
			return type === FieldType.DATE_TIME || type === FieldType.CREATED_TIME || type === FieldType.MODIFIED_TIME;
		};
		/**
		* 把任意层级的分组 path 解析为"该层下所有子孙叶子分组的 record 并集"。
		*
		* `getGroupFlatten` 只产出叶子分组（最内层），其 path 长度等于分组层级总数。
		* 对外层 / 中间层 path，按"叶子.path 以 `path` 为前缀（同长度也算）"的规则聚合。
		* 越界 / 找不到时返回 []。
		*
		* 关于去重：同一个 recordId 不会出现在多个叶子分组里（叶子分组是「分组键值组合」的最细划分，
		* 每条 record 唯一归属一个叶子），所以这里直接 concat 即可，无需 Set。
		*/ _proto.collectRecordIdsByPathPrefix = function collectRecordIdsByPathPrefix(path) {
			var flatten = this.dataUtil.getGroupFlatten();
			if (path.length === 0) return flatten.flatMap((g) => {
				var _a;
				return (_a = g.recordIds) !== null && _a !== void 0 ? _a : [];
			});
			var ids = [];
			for (var g of flatten) if (this.isPathPrefix(path, g.path)) {
				var sub = g.recordIds;
				if (sub && sub.length) ids.push(...sub);
			}
			return ids;
		};
		/** `prefix` 是否是 `full` 的前缀（同长度也算）；逐项 `===` 比较。 */ _proto.isPathPrefix = function isPathPrefix(prefix, full) {
			if (prefix.length > full.length) return false;
			for (var i = 0; i < prefix.length; i++) if (prefix[i] !== full[i]) return false;
			return true;
		};
		/**
		* 从 localStorage 恢复折叠态；仅在首次 `buildIndex` 时执行一次（`foldStateLoaded` 门闩）。
		*
		* 三层失效校验（任一命中即视缓存无效、不恢复任何折叠态并清空存储 key）：
		*
		* 1) JSON 解析失败 / 结构不符（旧版本纯数组 payload、手动改坏等）：直接放弃。
		* 2) 分组签名不一致（用户改了「分组依据」字段）：旧 key 天然对不上，硬套会误折叠新分组，
		*    直接整条作废。
		* 3) 分组数据当前不存在（`stringifyGroupPath` 后对不上任何叶子/前缀）：说明对应分组值已被
		*    删除 / 隐藏 —— 与合法 path 集合取交集，剔除死 key。清洗后剩余非空的部分才进入内存。
		*
		* 清洗完成后立刻回写一次 storage，避免死 key 永久滞留（用户不再触发 save 也能收敛）。
		*/ _proto.loadFoldStateIfNeeded = function loadFoldStateIfNeeded() {
			if (this.foldStateLoaded) return;
			this.foldStateLoaded = true;
			var raw = getStorageValue(this.dataUtil.getContext(), GridListStorageType.FoldGroup);
			if (!raw) return;
			var payload;
			try {
				var parsed = JSON.parse(raw);
				if (isFoldStoragePayload(parsed)) payload = parsed;
			} catch (_e) {}
			if (!payload) {
				setStorageValue(this.dataUtil.getContext(), GridListStorageType.FoldGroup, "");
				return;
			}
			var currentSignature = this.computeGroupSignature();
			if (payload.signature !== currentSignature) {
				setStorageValue(this.dataUtil.getContext(), GridListStorageType.FoldGroup, "");
				return;
			}
			var validPathKeys = this.collectAllValidPathKeys();
			var changed = false;
			for (var key of payload.paths) if (validPathKeys.has(key)) this.foldGroups.add(key);
			else changed = true;
			if (changed) this.saveState();
		};
		/**
		* 当前「分组签名」：把 `dataUtil.getGroupFields()` 里每个字段的 title 按顺序用 `|` 拼接。
		*
		* 使用 title 而非某个内部 id：
		* - core 的 IField 稳定对外暴露的是 `getTitle()`；
		* - 分组维度换列 / 换顺序（真正的"分组依据变化"）必然导致 title 序列变化 → 缓存失效；
		* - 用户罕见的重命名场景下，改名后视为分组维度语义变化、缓存作废，也是可接受兜底
		*   （比自作聪明地在多种情况下坚持恢复更安全，避免"名字都变了还按老 key 折叠"的诡异体验）。
		*
		* 无分组时返回空串，其对应的 foldGroups 也天然是空，语义自洽。
		*/ _proto.computeGroupSignature = function computeGroupSignature() {
			return this.dataUtil.getGroupFields().map((f) => f.getTitle()).join("|");
		};
		/**
		* 枚举「当前分组树下所有可能被折叠的路径 key」集合，供 load 时做交集清洗。
		*
		* 必须遍历规范化分组树 `getGroupTree()` 而非 `getGroupFlatten()`：
		* - `getGroupFlatten()` 走 core 原始 `getGroupLayoutInfos()`，**不含记录数为 0 的空分组**
		*   （由 `WbSharedConfig.head.groupBys` 补齐出的虚拟分组 / placeholder 只存在于 normalizedGroupTree）；
		*   若沿用它清洗，空分组（如「已暂停 0」）的折叠 key 会被当成死 key 剔除，导致空分组折叠态
		*   无法本地记忆（刷新后又展开）。
		* - `getGroupTree()` 是渲染 GroupHead 时实际消费的规范化树，含空分组，与折叠 key 的产生源一致。
		*
		* 用户可以折叠任意层级（非叶子 GroupHead 也能点折叠按钮），所以对每个分组节点，
		* 把它 path 的所有非空前缀都算进去。
		*
		* 例：某节点 path = `['A', 'B', 'C']`，则合法 key 集合应包含 `stringify(['A'])`、
		* `stringify(['A','B'])`、`stringify(['A','B','C'])`。
		*
		* 无分组时返回空 Set。
		*/ _proto.collectAllValidPathKeys = function collectAllValidPathKeys() {
			var keys = /* @__PURE__ */ new Set();
			var walk = (nodes) => {
				for (var node of nodes) {
					if (typeof node === "string" || !isFormattedTreeNode(node)) continue;
					var { path, children } = node;
					if (path === null || path === void 0 ? void 0 : path.length) for (var i = 1; i <= path.length; i++) keys.add(stringifyGroupPath(path.slice(0, i)));
					walk(children);
				}
			};
			walk(this.dataUtil.getGroupTree());
			return keys;
		};
		/**
		* 当前 record 的 sys_priority 是否为空（rawText 空 / 数据缺失）。
		*
		* 用于 `getVisibleBodyTagFieldIds(recordId)` 的 grid-list 特有过滤，
		* 判定语义与 `wb-cell.resolveBodyTagItem` 的 sys_priority 空数据分支完全同源
		* （都是判定 `standardCell.data[0].text` 是否为空）。
		*/ _proto.isPriorityEmptyForRecord = function isPriorityEmptyForRecord(recordId) {
			if (!this.hasPriorityField) return true;
			return !readCellText(this.dataUtil, this.priorityFieldId, recordId);
		};
		/**
		* 用 `dataUtil.getAllRecordIds()` 剪裁 `batch` 中已不存在的 recordId。
		*
		* - 不会因删除某一条选中而影响其余仍存在的选中项；
		* - 有变化时会通过 `batch` 内的 emitter fire 一次最新选中数组，
		*   让外部订阅者（例如 SDK 底部工具栏「已选 N 项」显示）自然更新；
		* - 无 phantom 时静默返回，不搅动外部订阅者。
		*
		* 调用点：`buildIndex()` 末尾。collect / patch 完成后 view 层的 record 全集
		* 已反映最新状态（含批量删除结果），此时剪裁一次最经济且无遗漏。
		*/ _proto.pruneSelectedRecordIds = function pruneSelectedRecordIds() {
			var existing = new Set(this.dataUtil.getAllRecordIds());
			this.batch.pruneByExistingIds(existing);
		};
		return StateCenter;
	}(BaseStateCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/collector/index.js
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
var ListCollector;
var init_collector = __esmMin((() => {
	init_collector$1();
	init_content();
	init_data_util();
	init_range();
	init_row();
	init_size();
	init_state();
	ListCollector = /* @__PURE__ */ function(BaseCollector) {
		"use strict";
		_inherits$2(ListCollector, BaseCollector);
		function ListCollector(context) {
			var _this = BaseCollector.call(this, context) || this;
			_this.context = context;
			_this.dataUtil = _this._register(new DataUtil(_this.context));
			_this.state = _this._register(new StateCenter(_this.dataUtil));
			_this.size = _this._register(new SizeCollector(_this.dataUtil));
			_this.rows = _this._register(new RowCollector(_this.dataUtil, _this.size, _this.state));
			_this.range = _this._register(new RangeCollector(_this.size, _this.rows));
			_this.content = _this._register(new ContentCollector(_this.dataUtil, _this.state, _this.size, _this.rows, _this.range));
			return _this;
		}
		var _proto = ListCollector.prototype;
		_proto.handleCollect = function handleCollect() {
			this.dataUtil.buildShowFieldIds();
			this.dataUtil.normalizeGroupTreeByWbConfig();
			this.dataUtil.buildSubTreeMeta();
			this.state.buildIndex();
			this.size.collect();
			this.rows.collect();
			this.range.collect();
			this.content.collect();
		};
		_proto.handlePatch = function handlePatch(_mutations) {
			this.dataUtil.buildShowFieldIds();
			this.dataUtil.normalizeGroupTreeByWbConfig();
			this.dataUtil.buildSubTreeMeta();
			this.state.buildIndex();
			this.size.patch();
			this.rows.patch();
			this.range.patch();
			this.content.patch();
		};
		_proto.handleResize = function handleResize(scale) {
			this.size.setScale(scale);
			this.size.patch();
			this.rows.patch();
			this.range.patch();
			this.content.patch();
		};
		return ListCollector;
	}(BaseCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/renderer-model/index.js
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
var import_lodash, ListRendererModel;
var init_renderer_model = __esmMin((() => {
	init_event();
	import_lodash = /* @__PURE__ */ __toESM(require_lodash());
	init_interface$6();
	init_collector();
	init_base_renderer_model();
	ListRendererModel = /* @__PURE__ */ function(BaseRendererModel) {
		"use strict";
		_inherits$1(ListRendererModel, BaseRendererModel);
		function ListRendererModel(context) {
			var _this = BaseRendererModel.call(this, context) || this;
			_this.context = context;
			_this.onRenderModelChangeEmitter = _this._register(new Emitter());
			_this.collector = _this._register(new ListCollector(_this.context));
			_this.onRenderModelChange = _this.onRenderModelChangeEmitter.event;
			_this.collector.collect();
			_this._register(_this.collector.content.onContentChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.range.onScroll(() => {
				_this.collector.content.collectVisible();
				_this.onRenderModelChangeEmitter.fire();
			}));
			return _this;
		}
		var _proto = ListRendererModel.prototype;
		_proto.scrollToY = function scrollToY(scrollTop) {
			this.collector.range.scrollToY(scrollTop);
		};
		_proto.scrollByDelta = function scrollByDelta(deltaY) {
			this.collector.range.scrollByDelta(deltaY);
		};
		/**
		* 批量设置分组折叠态。
		*
		* 与 grid 视图 `GridRendererModel.setGroupFold` 语义对齐：
		* - 不带 `groupKeys` 时视为「操作所有分组」，先 clearGroupFold 清空当前折叠集合，
		*   再遍历所有 GroupHead 按 `fold` 统一写入；避免残留旧 key 造成状态漂移；
		* - 带 `groupKeys` 时只对匹配的 GroupHead path 执行 setGroupFoldState；
		* - 折叠状态变化会改变行高，与 hover feature 里点击折叠按钮的路径保持一致：
		*   rows/range/content 全量 patch，然后统一 fire 一次 render 事件。
		*
		* list 视图没有 grid 的选区 / ActivePoint 概念，因此不需要 grid 里
		* `resetSelectionIfActivePointInFoldGroups` 的前置处理。
		*/ _proto.setGroupFold = function setGroupFold(option) {
			if (!this.collector.dataUtil.hasGroup()) return;
			var { rows, state, range, content } = this.collector;
			var { fold, groupKeys } = option;
			var groupHeads = rows.getTypeRows(RowType.GroupHead);
			if (!groupKeys) {
				state.clearGroupFold();
				groupHeads.forEach((rowInfo) => {
					if (rowInfo.path) state.setGroupFoldState(rowInfo.path, fold);
				});
			} else groupHeads.forEach((rowInfo) => {
				if (rowInfo.path && groupKeys.some((keys) => (0, import_lodash.isEqual)(keys, rowInfo.path))) state.setGroupFoldState(rowInfo.path, fold);
			});
			rows.patch();
			range.patch();
			content.patch();
			this.onRenderModelChangeEmitter.fire();
		};
		_proto.handleModelChange = function handleModelChange(mutations) {
			this.collector.patch(mutations);
			this.onRenderModelChangeEmitter.fire();
		};
		return ListRendererModel;
	}(BaseRendererModel);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/grid-list/index.js
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
var ListView;
var init_grid_list = __esmMin((() => {
	init_esm();
	init_es$1();
	init_canvas_view();
	init_entries();
	init_renderer();
	init_renderer_model();
	ListView = /* @__PURE__ */ function(BaseCanvasView) {
		"use strict";
		_inherits(ListView, BaseCanvasView);
		function ListView(context) {
			var _this = BaseCanvasView.call(this, context) || this;
			_this.initFeatures();
			return _this;
		}
		var _proto = ListView.prototype;
		_proto.getType = function getType() {
			return ViewType.LIST;
		};
		_proto.initFeatures = function initFeatures() {
			if (!ua.isPC) return;
			getPcFeatures().forEach((featureOption) => this.installFeature(featureOption));
		};
		_proto.render = function render() {
			this.renderer.render();
		};
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.renderer.getFeatureLayer();
		};
		_proto.setStickyHead = function setStickyHead(index, offsetY) {
			this.renderer.setStickyHead(index, offsetY);
		};
		_proto.getStickyHead = function getStickyHead() {
			return this.renderer.getStickyHead();
		};
		_proto.scrollToY = function scrollToY(scrollTop) {
			this.rendererModel.scrollToY(scrollTop);
		};
		_proto.isGroupFolded = function isGroupFolded(groupKey) {
			return this.collector.state.isGroupFold(groupKey);
		};
		/**
		* 是否所有（顶层）分组都处于折叠态。
		* 供外层判断「全部折叠 / 全部展开」按钮的当前态；无分组时返回 false。
		*/ _proto.isAllGroupFold = function isAllGroupFold() {
			return this.collector.state.isAllGroupFold();
		};
		_proto.setGroupFold = function setGroupFold(option) {
			return this.rendererModel.setGroupFold(option);
		};
		/**
		* 读取当前批量选中的 recordId 列表（拷贝，外部改动不影响内部集合）。
		*
		* 供外部 SDK 读取「当前 grid-list 选中了哪些 record」；实际数据来自
		* `collector.state`（内部由 shared `BatchSelection` 维护），顺序为插入序、不保证与视觉行序一致。
		*/ _proto.getSelectedRecordIds = function getSelectedRecordIds() {
			return this.collector.state.getSelectedRecordIds();
		};
		/**
		* 进入 / 退出批量选择模式。与 kanban-todo `setBatchSelectMode` 行为对齐：
		*
		* - 进入（enable=true）：Record 行左侧无论是否 hover 都常驻 checkbox 占位；
		*   该状态由 content collector 在 `collectRecord` 中绘制 `getCheckboxIconAlias(false)`（未选）或
		*   `CHECKBOX_CHECK_GREEN`（已选），同时把中段字段整体右移 `checkboxSize + checkboxGap`；
		* - 退出（enable=false）：清空已选集合，回退到 hover-only 的 checkbox 行为。
		*
		* 方法内部会触发一次 collectVisible + render，调用方无需再手动刷新。
		*/ _proto.setBatchSelectMode = function setBatchSelectMode(enable) {
			this.collector.state.setBatchSelectMode(enable);
			this.collector.content.collectVisibleWithHeads();
			this.render();
		};
		/**
		* BaseCanvasView 抽象方法：命中 hit-test，直接转发到 renderer。
		* 在签名层面父类要求返回多种 Target 联合类型；list 返回 ListTarget，做一次结构转换以满足类型。
		*/ _proto.getTarget = function getTarget(x, y) {
			return this.renderer.getTarget(x, y);
		};
		_proto.createRendererModel = function createRendererModel() {
			return new ListRendererModel(this.context);
		};
		_proto.createRenderer = function createRenderer() {
			return new ListRenderer(this.rendererModel, this.context.getRenderRoot());
		};
		/**
		* BaseCanvasView 抽象方法：滚动 delta。
		* list 视图只关心 deltaY，deltaX 永远忽略（无横向滚动）。
		*/ _proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			var { deltaY } = scrollInfo;
			if (!deltaY) return;
			this.rendererModel.scrollByDelta(deltaY);
		};
		return ListView;
	}(BaseCanvasView);
}));
//#endregion
export { init_grid_list as n, ListView as t };
