import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event } from "./esm-cVQVEiWG.js";
import { $l as init_es, Kc as isLinkField, Vl as ViewType$1, Yu as logger, _o as isUserField, ql as FieldType, qu as ViewType, uu as slicePush, wd as i18n } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { c as require_cloneDeep } from "./merge-vXYl4M0x.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { At as init_utils, B as init_feature_single, Bt as performanceReport, E as wbColors, G as resourceLoader, H as pen, K as init_lib, M as BaseRenderer, N as init_base_renderer, R as BaseFeature, S as init_icon, T as init_color, U as init_resources, V as init_pen, Y as Level, _ as WB_SOURCE_FIELD_TITLE, a as BaseCollector, b as shouldShowGroupAddButton, et as init_is_in_rect, g as WB_SOURCE_DEFAULT_VISIBLE_VALUES, i as init_base_renderer_model, kt as getScrollConfig, l as BaseSizeCollector, nt as FeatureUIEvent, o as init_collector$1, ot as Cursor, r as BaseRendererModel, rt as init_feature_event, st as init_cursor, tt as isHitRect, u as init_size$1, v as WbSharedConfig, vt as init_style, w as toThemedKanbanTodoIconAlias, x as KanbanTodoIconAlias, y as init_wb_config, yt as style, z as FeatureAuth, zt as init_performance } from "./canvas-view-DDuMsrmC.js";
import { C as getAvatarColor, S as init_field_collector, _ as ensureRelativeTimePlugin, b as init_avatar_time_utils, c as collectTagsPillsInRect, f as init_wb_cell, g as resolveTagsCellItems, o as SYS_TAGS_FIELD_TITLE, p as isSameTagPillHit, r as BODY_TAG_PILL_GEOMETRY, s as collectBodyTag, u as formatFieldTooltipLabel, v as formatRelativeTime, w as getAvatarText, x as fieldCollector, y as getDateCellFullText } from "./auto-scroll-Cn43Kqkt.js";
import { c as init_groupable_status, s as GroupableStatus } from "./fix-scroll-delta-C4NjXGCK.js";
import { c as init_field_fixed_height, d as init_card_single, l as CardSingleCollector, s as fieldFixedContent } from "./view-DGZEPJsr.js";
import { A as init_action, C as IKanbanGroupVerticalScroller, E as KanbanCardActive, M as KanbanCommonView, N as init_common_view, S as init_main$4, T as init_card_active, _ as IKanbanAutoScroll, a as DataUtil$1, b as IKanbanHorizontalScroller, c as KanbanCardMove, d as IKanbanCardMove, f as init_interface$3, g as KanbanAutoScroll, h as init_auto_scroll, i as init_range, j as IKanbanCardActive, k as KanbanAction, l as getCardRecordId, n as init_state$1, o as init_data_util$1, r as RangeCollector, s as init_card_move, t as StateCenter$1, u as init_get_target_by_offset, v as init_h_scroller, w as init_interface$4, x as KanbanGroupVerticalScroller, y as KanbanHorizontalScroller } from "./state-t2amB7bn.js";
import { S as makeHoverTooltipDisposable, a as collectRichGroupValue, b as HoverTooltipController, c as collectGroupKeyDecoration, d as mapGroupValueToDisplayTitle, f as resolveGroupHeadTitle, g as collectRelativeTimeText, h as collectAvatarGroup, i as init_batch_selection, m as applyAvatarSlotsFieldTitlePrefix, n as readCellText, o as init_group_value_rich, r as BatchSelection, s as applyGroupTextMap, t as init_source_field, u as init_group_key_config, v as init_bottom_collectors, x as init_hover_tooltip_controller } from "./source-field-zJ5uL8Af.js";
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/pc/group-menu/interface.js
var IKanbanTodoGroupMenu;
var init_interface$2 = __esmMin((() => {
	init_module();
	IKanbanTodoGroupMenu = createDecorator("IKanbanTodoGroupMenu");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/kanban-todo-feature.js
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
var KanbanTodoFeatureBase;
var init_kanban_todo_feature = __esmMin((() => {
	init_action();
	init_feature_single();
	KanbanTodoFeatureBase = /* @__PURE__ */ function(BaseFeature) {
		"use strict";
		_inherits$12(KanbanTodoFeatureBase, BaseFeature);
		function KanbanTodoFeatureBase() {
			var _this = BaseFeature.apply(this, arguments) || this;
			_this.action = _this._register(new KanbanAction(_this.context, _this.collector.dataUtil, _this.collector, _this.parentApi));
			return _this;
		}
		var _proto = KanbanTodoFeatureBase.prototype;
		/**
		* 重收集 head + range + card 然后触发渲染。
		*
		* 状态（active / selected / batchMode / 全选切换）变化后，多个 collector 都需要刷新：
		* - head：「全选/取消全选」文案、加号/三点按钮显隐都依赖 batchMode；
		* - range：CardCollector 内部用 `virtualList[index].startY += offset` 的累加方式
		*   把真实卡片高度回填到虚拟列表；若不先 patch 重置 virtualList，连续操作会让
		*   累加的 offset 不断叠加，表现为「卡片整体下移一段」；
		* - card：刷新 checkbox 选中态、active/selected 背景等卡片内部内容。
		*
		* 该方法在 hover / group-menu 等多个 feature 中被复用，因此抽到基类。
		*/ _proto.triggerRecollectAndRender = function triggerRecollectAndRender() {
			this.collector.head.collect();
			this.collector.range.patch();
			this.collector.card.patch();
			this.parentApi.render();
		};
		_create_class$3(KanbanTodoFeatureBase, [
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
		return KanbanTodoFeatureBase;
	}(BaseFeature);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/pc/group-menu/main.js
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
var KanbanTodoGroupMenu;
var init_main$3 = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_cursor();
	init_is_in_rect();
	init_kanban_todo_feature();
	KanbanTodoGroupMenu = /* @__PURE__ */ function(KanbanTodoFeatureBase) {
		"use strict";
		_inherits$11(KanbanTodoGroupMenu, KanbanTodoFeatureBase);
		function KanbanTodoGroupMenu() {
			var _this = KanbanTodoFeatureBase.apply(this, arguments) || this;
			_this.menuGroup = null;
			/** 当前打开的菜单状态（来自 state），关闭态为 null */ _this.current = null;
			/** 菜单浮层在 stage 内的整体矩形（用于「点击外部」判定） */ _this.panelRect = null;
			/** 当前 hover 命中的菜单项 id（''=未命中） */ _this.hoverItemId = "";
			/** 菜单项列表；目前仅「全选」，后续可在此扩展 */ _this.items = [{
				id: "select-all",
				label: i18n.t("全选"),
				run: (groupIndex) => {
					_this.collector.state.setBatchSelectMode(true, groupIndex);
					_this.collector.state.selectAllInGroup(groupIndex, true);
					_this.emitter.wbService.onRecordSelectChange.fire(_this.collector.state.getSelectedRecordIds());
					_this.triggerRecollectAndRender();
				}
			}];
			_this.render = () => {
				var _a, _b;
				(_a = _this.menuGroup) === null || _a === void 0 || _a.setAttrs(_this.collector.size.globalRect);
				if (!_this.current) {
					(_b = _this.menuGroup) === null || _b === void 0 || _b.clear();
					return;
				}
				_this.draw();
			};
			/** state 主导菜单开关；本 feature 仅响应 */ _this.onMenuChange = (next) => {
				_this.current = next;
				_this.hoverItemId = "";
				if (!_this.menuGroup) return;
				_this.menuGroup.clear();
				if (next) _this.draw();
				else _this.panelRect = null;
			};
			/**
			* 「点击外部关闭」：
			* - 命中三点按钮 anchorRect 时不关——hover.drawGroupMoreHover.onClick 会在 mouseup 后 toggle 处理；
			*   这里若先关，紧随其后的 toggle 又会重新打开，体验上等同没反应（不必要的开关闪烁）；
			* - 命中菜单 panel 时不关——交给菜单项自身的 onClick 决定关闭；
			* - 其它任何位置（含 stage 之外）→ 关闭。
			*/ _this.onDocumentMouseDown = (evt) => {
				if (!_this.current) return;
				var { x, y } = evt;
				var anchor = _this.current.anchorRect;
				if (isHitRect(x, y, anchor)) return;
				if (_this.panelRect && isHitRect(x, y, _this.panelRect)) return;
				_this.collector.state.closeGroupMenu();
			};
			/** 鼠标移动时切换菜单项 hover 态；命中区使用 panelRect 范围内的逐项判断 */ _this.onStageMouseMove = (evt) => {
				if (!_this.current || !_this.panelRect) return;
				var { x, y } = evt;
				if (!isHitRect(x, y, _this.panelRect)) {
					if (_this.hoverItemId !== "") {
						_this.hoverItemId = "";
						_this.draw();
					}
					return;
				}
				var hitId = _this.findItemAtY(y);
				if (hitId !== _this.hoverItemId) {
					_this.hoverItemId = hitId;
					_this.draw();
					if (hitId) _this.setCursor(Cursor.POINTER);
				}
			};
			_this.onScroll = () => {
				if (_this.current) _this.collector.state.closeGroupMenu();
			};
			return _this;
		}
		var _proto = KanbanTodoGroupMenu.prototype;
		_proto.bootstrap = function bootstrap() {
			this.menuGroup = pen.group(Object.assign(Object.assign({}, this.collector.size.globalRect), { batch: true }));
			this.layer.addGroup(this.menuGroup);
			this._register(this.collector.state.onGroupMenuChange(this.onMenuChange));
			this._register(this.UIEvent.document.onMouseDown(this.onDocumentMouseDown));
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.collector.range.onScroll(this.onScroll));
			this._register({ dispose: () => this.closeMenuSilently() });
		};
		/** 仅在 dispose 时使用：直接清自身资源，不再 fire onGroupMenuChange */ _proto.closeMenuSilently = function closeMenuSilently() {
			var _a;
			this.current = null;
			this.panelRect = null;
			this.hoverItemId = "";
			(_a = this.menuGroup) === null || _a === void 0 || _a.clear();
		};
		/** 计算 panelRect（每次 draw 都重算，便于 anchor 切换时无残留） */ _proto.computePanelRect = function computePanelRect(menu) {
			var { size } = this.collector;
			var itemsHeight = this.items.length * size.groupMenuItemHeight;
			var totalHeight = size.groupMenuPaddingY * 2 + itemsHeight;
			var width = size.groupMenuWidth;
			var x = menu.anchorRect.x + menu.anchorRect.width - width;
			if (x < 0) x = menu.anchorRect.x;
			var y = menu.anchorRect.y + menu.anchorRect.height + size.groupMenuTopGap;
			return {
				x,
				y,
				width,
				height: totalHeight
			};
		};
		_proto.findItemAtY = function findItemAtY(y) {
			var _a, _b;
			if (!this.panelRect) return "";
			var { groupMenuPaddingY, groupMenuItemHeight } = this.collector.size;
			var innerY = y - this.panelRect.y - groupMenuPaddingY;
			if (innerY < 0) return "";
			var index = Math.floor(innerY / groupMenuItemHeight);
			return (_b = (_a = this.items[index]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "";
		};
		_proto.draw = function draw() {
			if (!this.menuGroup || !this.current) return;
			this.menuGroup.clear();
			this.panelRect = this.computePanelRect(this.current);
			var { size } = this.collector;
			var { x, y, width, height } = this.panelRect;
			this.menuGroup.add(pen.config.rect({
				x,
				y,
				width,
				height,
				background: style.color.normalBackground,
				borderColor: style.color.lightBorderColor,
				borderWidth: 1,
				borderRadius: size.groupMenuRadius,
				shadowBlur: size.groupMenuShadowBlur,
				shadowColor: "rgba(0, 0, 0, 0.12)"
			}));
			var { groupIndex } = this.current;
			this.items.forEach((item, index) => {
				var itemRect = {
					x,
					y: y + size.groupMenuPaddingY + index * size.groupMenuItemHeight,
					width,
					height: size.groupMenuItemHeight
				};
				if (this.hoverItemId === item.id) this.menuGroup.add(pen.config.rect({
					x: itemRect.x + 4,
					y: itemRect.y,
					width: itemRect.width - 8,
					height: itemRect.height,
					background: style.color.hoverBackground,
					borderRadius: 4
				}));
				this.menuGroup.add(pen.config.text({
					text: item.label,
					x: itemRect.x + size.groupMenuItemPaddingX,
					y: itemRect.y,
					width: itemRect.width - size.groupMenuItemPaddingX * 2,
					height: itemRect.height,
					fontSize: size.groupMenuItemFontSize,
					color: style.color.normalFontColor,
					wrap: "none",
					ellipsis: true
				}));
				this.menuGroup.add(pen.config.rect(Object.assign(Object.assign({}, itemRect), {
					opacity: 1,
					onClick: (event) => this.onItemClick(item, groupIndex, event)
				})));
			});
		};
		/** 菜单项点击：先执行 run 再关闭菜单（关闭里 fire onGroupMenuChange(null) 触发本 feature 自清） */ _proto.onItemClick = function onItemClick(item, groupIndex, event) {
			item.run(groupIndex);
			this.collector.state.closeGroupMenu();
		};
		return KanbanTodoGroupMenu;
	}(KanbanTodoFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/pc/hover/interface.js
var IKanbanTodoHover;
var init_interface$1 = __esmMin((() => {
	init_module();
	IKanbanTodoHover = createDecorator("IKanbanTodoHover");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/pc/hover/main.js
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
var EMPTY_STATE, FADE_IN_STEP, KanbanTodoHover;
var init_main$2 = __esmMin((() => {
	init_pen();
	init_style();
	init_interface$3();
	init_cursor();
	init_is_in_rect();
	init_kanban_todo_feature();
	init_interface$1();
	init_wb_cell();
	EMPTY_STATE = {
		kind: "none",
		key: ""
	};
	FADE_IN_STEP = .1;
	KanbanTodoHover = /* @__PURE__ */ function(KanbanTodoFeatureBase) {
		"use strict";
		_inherits$10(KanbanTodoHover, KanbanTodoFeatureBase);
		function KanbanTodoHover() {
			var _this = KanbanTodoFeatureBase.apply(this, arguments) || this;
			_this.hoverGroup = null;
			_this.state = EMPTY_STATE;
			/** 渐入动画的 raf 句柄；状态变更/卸载时必须取消，避免叠加或漏 clear */ _this.fadeRaf = null;
			/**
			* 「本次 mousedown 落在卡片本体（且未被子层 stopPropagation 拦截）」的 recordId。
			*
			* 用于在卡片 hit rect 的 `onMouseUp` 里判定"这次 up 是否与 down 属于同一张卡片本体"：
			* - 点子层（头像 / tag pill）：子层 `onMouseUp` 会先命中并 `stopPropagation`，卡片 hit rect
			*   的 `onMouseUp` 不会执行 → 该字段仍是 null；随后 mouseup 冒泡到卡片 hit rect 时
			*   `!== recordId` → 跳过 `onCardClick`，避免把子层点击当成卡片点击。
			* - 点卡片空白处：卡片 hit rect 的 `onMouseUp` 记录 recordId → mouseup 时匹配 → 触发 `onCardClick`。
			* - 拖拽卡片：mousedown 时记录 recordId，mouseup 时虽然 recordId 匹配但 `IKanbanCardMove.isDragging()`
			*   为 true（hover 层 onMouseUp 早于 KanbanCardMove.onDocumentMouseup 执行，dragging 态未清），
			*   进入拖拽守门 → 跳过 `onCardClick`。
			*
			* 为什么用 mouseup 触发 click（而非传统 mousedown）：
			* `KanbanCardMove` 从 stage 层监听 mousedown 启动拖拽，若卡片 hit rect 在 mousedown 就 fire click，
			* 会与拖拽产生双语义（点击 + 拖动）；改到 mouseup 判定，能干净地用 `isDragging()` 排除拖拽路径。
			*
			* 所有涉及 hover 上下文丢弃的路径（scroll / mouseleave / 菜单打开等）都通过 `resetHoverCaches`
			* 同步清空该字段，避免跨 down/up 会话残留（例如 mousedown 后滚动/切菜单，随后的 mouseup 不应误触）。
			*/ _this.cardMouseDownRecordId = null;
			/**
			* 由 parentApi.render() 调用：底层数据 / 几何变化后重画 hover 反馈。
			*
			* 不能简单 clearHover —— 鼠标若未移动，stage 不会再 fire mousemove，hoverGroup 上挂着的 onMouseUp
			* 闭包也丢失了，导致同位连续点击失效（典型场景：批量模式下点击卡片 checkbox 触发 render，下次
			* 同位点击无反应；外部 props 更新数据回灌触发的额外 render 同理）。基于 lastHoverTarget 重新
			* resolve + applyState，相当于模拟"鼠标仍在原位 hover"。
			*
			* 与 grid-list/features/pc/hover 同款范式。
			*/ _this.render = () => {
				var _a;
				(_a = _this.hoverGroup) === null || _a === void 0 || _a.setAttrs(_this.collector.size.globalRect);
				if (_this.isPreventFromOtherFeature()) {
					_this.resetHoverCaches();
					_this.clearHover();
					return;
				}
				var target = _this.lastHoverTarget;
				if (_this.collector.state.getGroupMenu() !== null) {
					var next = _this.resolveMenuAllowedState(target);
					if (next.kind === "none") _this.clearHover();
					else _this.applyState(next, target);
					return;
				}
				var next1 = target ? _this.resolveState(target) : EMPTY_STATE;
				_this.applyState(next1, target);
			};
			_this.onMouseMove = (evt) => {
				if (_this.isPreventFromOtherFeature()) {
					_this.resetHoverCaches();
					_this.clearHover();
					return;
				}
				if (_this.collector.state.getGroupMenu() !== null) {
					_this.lastHoverTarget = evt.target;
					_this.lastHoverOwnerAvatarHit = void 0;
					_this.lastHoverTagPillHit = void 0;
					var next = _this.resolveMenuAllowedState(evt.target);
					if (next.kind === "none") {
						_this.clearHover();
						return;
					}
					if (next.key === _this.state.key) return;
					_this.applyState(next, evt.target);
					return;
				}
				_this.lastHoverTarget = evt.target;
				var prevOverlayKey = _this.cellOverlayHitKey();
				_this.lastHoverOwnerAvatarHit = _this.resolveOwnerAvatarHit(evt.target, evt.x, evt.y);
				_this.lastHoverTagPillHit = _this.resolveTagPillHit(evt.target, evt.x, evt.y);
				var nextOverlayKey = _this.cellOverlayHitKey();
				var next1 = _this.resolveState(evt.target);
				if (next1.key === _this.state.key) {
					if (next1.kind === "card" && prevOverlayKey !== nextOverlayKey) _this.applyState(next1, evt.target);
					return;
				}
				_this.applyState(next1, evt.target);
			};
			_this.onMouseLeave = () => {
				_this.resetHoverCaches();
				_this.clearHoverKeepCursor();
			};
			/**
			* 批量编辑态下「点击非卡片空白处」自动退出批量模式：
			* - 仅在批量模式下处理（普通态此监听是 no-op）；
			* - 菜单打开期间不退出：mousedown 顺序早于 click，菜单 feature 的「点击外部关闭」/ 菜单项 onMouseUp
			*   会负责关菜单和后续动作；这里贸然 setBatchSelectMode(false) 会把刚通过「全选」菜单进入的批量态立刻撤销；
			* - 点击「全选/取消全选」按钮（仅批量模式下出现）属于批量编辑链路，不能视作"空白"；
			* - 命中卡片（target.recordId 存在）→ 走 toggle 选中流程，不退出。
			* 其余命中（head 空白、body 卡片之间间隙、stage 之外）都触发退出。
			*
			* 退出后立即 triggerRecollectAndRender：head 上的"全选/取消全选"文字、card 上的 checkbox 都需要重收集。
			*/ _this.onMouseUp = (evt) => {
				if (!_this.collector.state.isBatchSelectMode()) return;
				if (_this.collector.state.getGroupMenu() !== null) return;
				var t = evt.target;
				if (t.recordId || t.isSelectAllBtn) return;
				_this.collector.state.setBatchSelectMode(false);
				_this.emitter.wbService.onRecordSelectChange.fire(_this.collector.state.getSelectedRecordIds());
				_this.triggerRecollectAndRender();
			};
			/**
			* 滚动时强制清空 hover：
			* 滚动会让 head/range/card 的渲染坐标整体平移，但 hoverGroup 中的 rect 仍是滚动前的全局坐标，
			* 表现为「卡片移走了，边框/hit rect 留在原位」——既错位又会拦截到错位置的点击。
			* 直接走 applyState(EMPTY_STATE) 复用「none 态」的统一清理路径（cancelFade + group.clear + 重置 cursor）。
			* 滚动停止后用户下一次 mousemove 会以新坐标自然重建 hover。
			*/ _this.onScroll = () => {
				_this.resetHoverCaches();
				_this.clearHover();
			};
			return _this;
		}
		var _proto = KanbanTodoHover.prototype;
		_proto.bootstrap = function bootstrap() {
			this.hoverGroup = pen.group(Object.assign(Object.assign({}, this.collector.size.globalRect), { batch: true }));
			this.layer.addGroup(this.hoverGroup);
			this._register(this.UIEvent.stage.onMouseMove(this.onMouseMove));
			this._register(this.UIEvent.stage.onMouseLeave(this.onMouseLeave));
			this._register(this.UIEvent.stage.onMouseUp(this.onMouseUp));
			this._register(this.collector.range.onScroll(this.onScroll));
			this._register(this.collector.state.onGroupMenuChange((menu) => {
				var target = this.lastHoverTarget;
				if (menu === null) {
					this.resetHoverCaches();
					this.clearHover();
					if (!target) return;
					var next = this.resolveState(target);
					if (next.kind !== "none") {
						this.lastHoverTarget = target;
						this.applyState(next, target);
					}
					return;
				}
				this.clearHover();
				if (!target) return;
				var next1 = this.resolveMenuAllowedState(target);
				if (next1.kind !== "none") this.applyState(next1, target);
			}));
			this._register({ dispose: () => this.cancelFade() });
		};
		/**
		* 重置所有 hover 相关的命中缓存。在「锁定 / 离开 stage / 滚动 / 菜单变化」等需要丢弃 hover
		* 上下文的路径必须同步清空，避免缓存的命中态（如 owner 头像组）跨上下文残留导致 cursor / 反馈错位。
		*/ _proto.resetHoverCaches = function resetHoverCaches() {
			this.lastHoverTarget = void 0;
			this.lastHoverOwnerAvatarHit = void 0;
			this.lastHoverTagPillHit = void 0;
			this.cardMouseDownRecordId = null;
		};
		/** mouseleave / scroll 等场景共用的清理入口：当前已是 none 态时短路，避免重复 clear/setCursor。 */ _proto.clearHover = function clearHover() {
			if (this.state.kind === "none") return;
			this.applyState(EMPTY_STATE);
		};
		/**
		* mouseleave 专用清理：清掉 hover 层绘制 + 复位内部 state，但不动 cursor。
		*
		* 与 clearHover 的差异：走 applyState(EMPTY_STATE) 会在末尾 setCursor(Cursor.DEFAULT)。
		* 但 mouseleave 常见于「点击头像/tag → 弹层遮挡鼠标」这种伪离开，此时把 cursor 强制置 DEFAULT
		* 会让用户体感 pointer 突然跳成 default（尤其鼠标停在头像上不动时最明显）。
		* cursor 交给后续 mousemove / render → applyCardHover 里基于 lastHoverOwnerAvatarHit /
		* lastHoverTagPillHit 的判定自然纠正即可。
		*/ _proto.clearHoverKeepCursor = function clearHoverKeepCursor() {
			var _a;
			if (this.state.kind === "none") return;
			this.cancelFade();
			(_a = this.hoverGroup) === null || _a === void 0 || _a.clear();
			this.state = EMPTY_STATE;
		};
		_proto.resolveState = function resolveState(t) {
			if (!t || t.isOutStage || t.isBlank) return EMPTY_STATE;
			if (t.isSelectAllBtn && t.selectAllRenderRect) return {
				kind: "selectAll",
				key: `selectAll:${t.groupIndex}`
			};
			if (t.isGroupMoreBtn && t.groupMoreRenderRect) return {
				kind: "groupMore",
				key: `groupMore:${t.groupIndex}`
			};
			if (t.isGroupAddBtn && t.groupAddRenderRect) return {
				kind: "groupAdd",
				key: `groupAdd:${t.groupIndex}`
			};
			if (t.recordId && t.cardRenderRect) return {
				kind: "card",
				key: `card:${t.recordId}`
			};
			return EMPTY_STATE;
		};
		/**
		* 菜单打开期间的允许集：仅「三点更多按钮」的 hover 反馈可以继续绘制——保留其 onMouseUp
		* 闭包让用户能再次点击收起菜单；命中其它区域（卡片 / 加号 / 全选 / 头像 pill）在菜单期间
		* 都不产出 hover 反馈（这些区域点击关闭菜单交由 GroupMenu 的 `onDocumentMouseDown` 处理）。
		*/ _proto.resolveMenuAllowedState = function resolveMenuAllowedState(t) {
			if (!t || t.isOutStage || t.isBlank) return EMPTY_STATE;
			if (t.isGroupMoreBtn && t.groupMoreRenderRect) return {
				kind: "groupMore",
				key: `groupMore:${t.groupIndex}`
			};
			return EMPTY_STATE;
		};
		_proto.applyState = function applyState(next, target) {
			var sameKey = next.key !== "" && next.key === this.state.key;
			this.state = next;
			if (!this.hoverGroup) return;
			this.cancelFade();
			this.hoverGroup.clear();
			if (next.kind === "card" && (target === null || target === void 0 ? void 0 : target.cardRenderRect) && target.recordId) this.applyCardHover(target.cardRenderRect, target.recordId, target.groupIndex, sameKey);
			else if (next.kind === "selectAll" && (target === null || target === void 0 ? void 0 : target.selectAllRenderRect)) {
				var { selectAllRenderRect: rect, groupIndex } = target;
				this.drawSelectAllHover(rect, groupIndex);
				this.setCursor(Cursor.POINTER);
			} else if (next.kind === "groupMore" && (target === null || target === void 0 ? void 0 : target.groupMoreRenderRect)) {
				var { groupMoreRenderRect: rect1, groupIndex: groupIndex1 } = target;
				var draw = (opacity) => this.drawGroupMoreHover(rect1, groupIndex1, opacity);
				if (sameKey) draw(1);
				else this.runFadeIn(draw);
				this.setCursor(Cursor.POINTER);
			} else if (next.kind === "groupAdd" && (target === null || target === void 0 ? void 0 : target.groupAddRenderRect)) {
				var { groupAddRenderRect: rect2, groupIndex: groupIndex2 } = target;
				var draw1 = (opacity) => this.drawGroupAddHover(rect2, groupIndex2, opacity);
				if (sameKey) draw1(1);
				else this.runFadeIn(draw1);
				this.setCursor(Cursor.POINTER);
			} else this.setCursor(Cursor.DEFAULT);
		};
		/**
		* 卡片 hover 落地：
		* - active / 选中态：卡片本身已有视觉强调，不画 1px 边框，仅放透明 hit rect 接住点击；
		* - 普通态：渐入绘制 1px 主题色边框（`sameKey` 时跳过渐入，直接 opacity=1 静默重画）；
		* - 任一分支都在最后追加一层 owner 头像组的命中/反馈层（覆盖 hit rect + 命中时叠 hoverBackground 圆角），
		*   语义对齐 grid-list `ListHover.addCellHitRect`：点击头像组 stopPropagation + fire
		*   `onRecordClick({ recordId, fieldId, cellRect })`，让 wb 上层弹出人员编辑器。
		*
		* ⚠️ `runFadeIn` 每帧都会 `hoverGroup.clear()` 重画，因此 owner 头像层不能放在 fadeIn 之外
		* 一次性 add，否则第二帧起就被清掉。这里把"卡片层 + 头像层"打包成同一 draw 闭包传给 runFadeIn，
		* 保证渐入过程中头像 hit rect / hover 反馈始终在位。
		*
		* 卡片层的 cursor 默认 POINTER；若 owner 头像未命中、cursor 也保持 POINTER 即可（与卡片本体一致）。
		*/ _proto.applyCardHover = function applyCardHover(rect, recordId, groupIndex, sameKey = false) {
			var suppressHoverBorder = this.collector.state.getActiveRecordId() === recordId || this.collector.state.isRecordSelected(recordId);
			var inBatchGroup = this.collector.state.isGroupInBatchIndices(groupIndex);
			var drawOverlays = () => {
				if (inBatchGroup) return;
				this.drawCardOwnerAvatar(recordId);
				this.drawCardTagPills(recordId, rect);
			};
			if (suppressHoverBorder) {
				this.drawCardHitRect(rect, recordId, groupIndex);
				drawOverlays();
			} else if (sameKey) {
				this.drawCardHover(rect, recordId, groupIndex, 1);
				drawOverlays();
			} else this.runFadeIn((opacity) => {
				this.drawCardHover(rect, recordId, groupIndex, opacity);
				drawOverlays();
			});
			var tagPillHit = this.lastHoverTagPillHit;
			var tagPillPoint = tagPillHit && !this.collector.state.isSourceFieldId(tagPillHit.fieldId);
			this.setCursor(this.lastHoverOwnerAvatarHit || tagPillPoint ? Cursor.POINTER : Cursor.DEFAULT);
		};
		/**
		* opacity 从 0 渐增到 1 的逐帧重绘。
		* 每帧 group.clear() + 重新 add（参考 frozen-line-drag/disappearWidthAnimation 的范式），
		* 避免直接对 DrawConfig 引用做就地改属性 —— 当前 pool 没有提供「找到旧 config 改属性后重绘」的
		* 公开 API，重新 add 是最稳妥也是项目里已有的通行做法。
		*/ _proto.runFadeIn = function runFadeIn(draw) {
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
		/**
		* 卡片点击：批量模式 toggle 选中；常规模式仅对外通知，不维护内部 active 态。
		*
		* 注：批量模式下 `triggerRecollectAndRender()` 会触发 `this.render()`，render 内部基于
		* `lastHoverTarget` 自动「原地重画」hover 反馈（含新的 onMouseUp 闭包），确保鼠标停在原位也能
		* 连续点击。无需在这里再做手动 re-apply。
		*/ _proto.onCardClick = function onCardClick(recordId, groupIndex, event) {
			if (this.collector.state.isBatchSelectMode()) {
				if (!this.collector.state.isGroupInBatchIndices(groupIndex)) return;
				this.collector.state.toggleRecordSelected(recordId);
				this.emitter.wbService.onRecordSelectChange.fire(this.collector.state.getSelectedRecordIds());
				this.triggerRecollectAndRender();
			} else this.emitter.wbService.onRecordClick.fire({ recordId });
		};
		/**
		* 卡片 hit rect 事件通道的守门 + fire 中枢。共用给 `drawCardHover` / `drawCardHitRect` 两个卡片
		* 层，避免两处重复写 mousedown-record / mouseup-guard 逻辑。
		*
		* - `onMouseDown`：仅记录本次 mousedown 归属的 recordId。**只有当 mousedown 事件冒泡到卡片 hit rect
		*   时才会执行**——头像 / tag pill 等子层如果在自己的 `onMouseDown` 里 `stopPropagation` 后，本
		*   回调不会触发，`cardMouseDownRecordId` 保持 null，用于后续 mouseup 阶段辨别"点击子层"vs"点击卡片"。
		*   注：即便宿主把「fire 点击」的时机统一到 mouseup，这个 down 锚点也必须保留 —— 它是"一次完整
		*   down→up 会话是否落在同一卡片"的唯一判据，去掉后守门 1 会退化成永远命中，导致点击子层（头像 /
		*   pill）时同时触发卡片点击、以及跨卡片拖动误触。
		* - `onMouseUp`：两道守门（下述均不满足才 fire `onCardClick`）：
		*     1) `cardMouseDownRecordId !== recordId`：本次 mouseup 与 mousedown 不匹配——要么 mousedown
		*        被子层吞掉（点子层），要么 mousedown 落在别的卡片后拖到本卡片再 up，都不应视作对本卡片的点击；
		*     2) `IKanbanCardMove.isDragging()` 为 true：正在拖拽（超过 6px 阈值），此次 mouseup 属于
		*        拖拽收尾语义，不应触发点击。事件顺序上 hover 层 mouseup（stage container 冒泡）早于
		*        `KanbanCardMove.onDocumentMouseup`（document 冒泡）执行，`isDragging()` 此时仍为 true。
		*   无论是否 fire，最后都会清空 `cardMouseDownRecordId`（一次 down→up 会话结束）。
		*/ _proto.buildCardHitHandlers = function buildCardHitHandlers(recordId, groupIndex) {
			return {
				onMouseDown: (event) => {
					this.cardMouseDownRecordId = recordId;
				},
				onMouseUp: (event) => {
					var _a;
					var downRecordId = this.cardMouseDownRecordId;
					this.cardMouseDownRecordId = null;
					if (downRecordId !== recordId) return;
					if ((_a = this.renderer.getFeature(IKanbanCardMove)) === null || _a === void 0 ? void 0 : _a.isDragging()) return;
					this.onCardClick(recordId, groupIndex, event);
				}
			};
		};
		_proto.drawCardHover = function drawCardHover(rect, recordId, groupIndex, opacity) {
			var _a;
			var clipArea = this.getCardClipArea();
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign({
				x: rect.x - .5,
				y: rect.y - .5,
				width: rect.width + style.size.borderWidth + .5,
				height: rect.height + style.size.borderWidth + .5,
				borderColor: style.color.normalBorderColor,
				borderWidth: style.size.borderWidth * 1.5,
				borderRadius: this.collector.size.todoCardRadius,
				opacity
			}, this.buildCardHitHandlers(recordId, groupIndex))), 0, 0, clipArea);
		};
		/**
		* 卡片处于 active / selected 态时使用：不画 hover 边框，仅放一层透明 rect 接住 onMouseDown / onMouseUp + hit-test。
		* 与 drawSelectAllHover 思路一致——视觉规范不要 hover 反馈，但点击行为不能丢。
		*/ _proto.drawCardHitRect = function drawCardHitRect(rect, recordId, groupIndex) {
			var _a;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign(Object.assign({}, rect), { opacity: 1 }), this.buildCardHitHandlers(recordId, groupIndex))));
		};
		/**
		* 「全选/取消全选」hover 区域：
		* 视觉规范要求不绘制 hover 背景（文字本身已有 linkColor 区分），
		* 但仍需要一层透明 rect 来承接 onMouseUp 命中——纯文字 DrawConfig 的可点区域是文字 bbox，
		* 不一定与 selectAllRect 一致，且会被同 group 的其它 hover 层级覆盖。
		*/ _proto.drawSelectAllHover = function drawSelectAllHover(rect, groupIndex) {
			var _a;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				opacity: 1,
				onMouseUp: (event, stopPropagation) => {
					stopPropagation === null || stopPropagation === void 0 || stopPropagation();
					var isAllSelected = this.collector.state.isGroupAllSelected(groupIndex);
					this.collector.state.selectAllInGroup(groupIndex, !isAllSelected);
					this.emitter.wbService.onRecordSelectChange.fire(this.collector.state.getSelectedRecordIds());
					this.triggerRecollectAndRender();
				}
			})));
		};
		_proto.drawGroupAddHover = function drawGroupAddHover(rect, groupIndex, opacity) {
			var _a;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.hoverBackground,
				borderRadius: Math.min(rect.width, rect.height) / 2,
				opacity,
				onMouseUp: (event) => {
					var groups = this.collector.dataUtil.getGroups();
					var groupId = groups === null || groups === void 0 ? void 0 : groups.groupIds[groupIndex];
					var groupPath = groupId !== void 0 ? [groupId] : [];
					this.emitter.wbService.onGroupAddClick.fire({ groupPath });
				}
			})));
		};
		/**
		* 「更多」三点按钮的 hover 反馈：
		* - 视觉与加号一致（hoverBackground + 圆角胶囊背景），保证两个按钮观感统一；
		* - 点击行为是 toggle 分组菜单——open/close 状态由 `state.toggleGroupMenu` 内部维护，
		*   下游 `KanbanTodoGroupMenu` feature 监听 `onGroupMenuChange` 渲染 / 清理菜单浮层。
		*
		* 注意 anchorRect 用的是 stage 内的渲染矩形（屏幕坐标，已减去 scrollLeft），
		* 而非 head 全局坐标。横向滚动 / 全选模式切换 / 卸载等场景，菜单 feature 会
		* 自行关闭菜单（详见 group-menu/main.ts），因此这里不需要在 hover 层做兜底。
		*/ _proto.drawGroupMoreHover = function drawGroupMoreHover(rect, groupIndex, opacity) {
			var _a;
			(_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, rect), {
				background: style.color.hoverBackground,
				borderRadius: Math.min(rect.width, rect.height) / 2,
				opacity,
				onMouseUp: (event) => {
					this.collector.state.toggleGroupMenu({
						groupIndex,
						anchorRect: Object.assign({}, rect)
					});
				}
			})));
		};
		/**
		* 卡片 owner 头像组的命中 / 反馈层：
		*
		* 始终绘制一层覆盖整组头像 rect 的透明 hit rect，承接 onMouseUp —— stopPropagation + fire
		* `onRecordClick({ recordId, fieldId, cellRect })`，让 wb 上层在头像组锚点处弹出人员编辑器；
		* 若当前 mousemove 命中了头像组，则在透明 hit rect 之前再画一层 hoverBackground 圆角矩形作为
		* hover 视觉反馈（borderRadius 取 rect.height/2 让其呈胶囊形，与单头像/默认头像的圆形观感一致），
		* 同时把 cursor 升级为 POINTER（命中后再设置，覆盖 applyCardHover 末尾的 POINTER 也无差异）。
		*
		* 「hit rect 始终绘制 / hover 反馈按需绘制」与 grid-list `ListHover.addCellHitRect` 行为对称：
		* - hit rect 不依赖鼠标当前位置，保证 owner 头像区域内任意像素点击都能被命中；
		* - cursor / hover 反馈则依赖 mousemove 精确命中（`lastHoverOwnerAvatarHit`）。
		*
		* 坐标系：`card.getOwnerAvatarRect` 返回的已是 stage 视口坐标，hoverGroup 也是 stage 视口坐标，
		* 无需再做偏移换算。clipArea 与 `drawCardHover` 同款（`groupCardVisibleStartY` 起的卡片可视区），
		* 避免滚动到边缘时 hover 反馈 / hit rect 越过分组背景。
		*
		* ⚠️ onMouseUp 必须调用 stopPropagation：hoverGroup 内卡片 hit rect / hover 边框先 add、owner 头像层
		* 后 add，stage.findAndCallHit 默认从顶到底遍历命中并依次触发 onClick；不阻止则会再触发卡片本体的
		* `onCardClick`，与点击头像组应只 fire `onRecordClick({fieldId, cellRect})` 的语义冲突。
		*/ _proto.drawCardOwnerAvatar = function drawCardOwnerAvatar(recordId) {
			var _a, _b;
			var target = this.lastHoverTarget;
			if (!target || target.recordId !== recordId) return;
			var avatarRect = this.collector.card.getOwnerAvatarRect(target.groupIndex, recordId);
			if (!avatarRect) return;
			var fieldId = this.collector.state.getOwnerFieldId();
			if (!fieldId) return;
			var clipArea = this.getCardClipArea();
			var isHover = this.lastHoverOwnerAvatarHit !== void 0;
			if (isHover) (_a = this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, avatarRect), {
				background: style.color.hoverBackground,
				borderRadius: avatarRect.height / 2,
				opacity: 1
			})), 0, 0, clipArea);
			(_b = this.hoverGroup) === null || _b === void 0 || _b.add(pen.config.rect(Object.assign(Object.assign({}, avatarRect), {
				opacity: 1,
				onMouseUp: (event, stopPropagation) => {
					stopPropagation === null || stopPropagation === void 0 || stopPropagation();
					this.emitter.wbService.onRecordClick.fire({
						recordId,
						fieldId,
						cellRect: Object.assign({}, avatarRect)
					});
				}
			})), 0, 0, clipArea);
			if (isHover) this.setCursor(Cursor.POINTER);
		};
		/**
		* 判定 (stageX, stageY) 是否落在卡片 owner 头像组的视觉 rect 上；命中则返回 `{ rect, fieldId }`。
		*
		* 与 grid-list `ListHover.resolveCellHit` 同款，但坐标系处理不同：
		* - kanban-todo 的 `card.getOwnerAvatarRect` 内部已把卡片局部坐标换算到 stage 视口坐标
		*   （见 `card.resolveCardStageBase` + `shiftRect`），mousemove 提供的 (evt.x, evt.y) 也是
		*   stage 视口坐标，直接 isHitRect 即可，**无需** 加 scrollTop（grid-list 那边 rect 是全局坐标
		*   所以才需要 `absY = stageY + scrollTop`）。
		*
		* 仅 `target.recordId` 与该卡片几何 / owner 字段齐备时才视为命中候选。
		*/ _proto.resolveOwnerAvatarHit = function resolveOwnerAvatarHit(target, stageX, stageY) {
			if (!(target === null || target === void 0 ? void 0 : target.recordId) || target.isOutStage || target.isBlank) return void 0;
			var rect = this.collector.card.getOwnerAvatarRect(target.groupIndex, target.recordId);
			if (!rect) return void 0;
			var fieldId = this.collector.state.getOwnerFieldId();
			if (!fieldId) return void 0;
			if (!isHitRect(stageX, stageY, rect)) return void 0;
			return {
				rect,
				fieldId
			};
		};
		/**
		* 把单个命中信息序列化成稳定 key（无命中 → 空串）。
		*/ _proto.hitInfoKey = function hitInfoKey(hit) {
			if (!hit) return "";
			return `${hit.fieldId}:${hit.rect.x},${hit.rect.y},${hit.rect.width},${hit.rect.height}`;
		};
		/**
		* 综合「owner 头像组 + tag pill」两路子区域命中态，产出一个聚合 key。
		* mousemove 中前后对比该 key 即可判定"任一子区域命中态是否切换"，触发 reapply。
		*/ _proto.cellOverlayHitKey = function cellOverlayHitKey() {
			return `avatar:${this.hitInfoKey(this.lastHoverOwnerAvatarHit)}|tag:${this.hitInfoKey(this.lastHoverTagPillHit)}`;
		};
		/**
		* 判定 (stageX, stageY) 是否落在卡片 body 区标签组某颗 pill 上；命中则返回 `{ rect, fieldId }`。
		*
		* 遍历 `card.getBodyTagPillRects`（stage 视口坐标），对每颗 pill 做 isHitRect；
		* 命中第一颗即返回（pill 不重叠，无需优先级排序）。
		*/ _proto.resolveTagPillHit = function resolveTagPillHit(target, stageX, stageY) {
			if (!(target === null || target === void 0 ? void 0 : target.recordId) || target.isOutStage || target.isBlank) return void 0;
			var pillRects = this.collector.card.getBodyTagPillRects(target.groupIndex, target.recordId);
			if (!(pillRects === null || pillRects === void 0 ? void 0 : pillRects.length)) return void 0;
			for (var pill of pillRects) if (isHitRect(stageX, stageY, pill.rect)) return {
				rect: pill.rect,
				fieldId: pill.fieldId
			};
		};
		/**
		* 卡片 body 区标签组的命中 / 反馈层：
		*
		* 为每颗 pill 绘制透明 hit rect 承接 onClick（stopPropagation + fire `onRecordClick`）；
		* 若当前 mousemove 命中了某颗 pill（`lastHoverTagPillHit`），则在该 pill 上叠一层
		* hoverBackground 圆角矩形作为 hover 视觉反馈，并升级 cursor 为 POINTER。
		*
		* 与 `drawCardOwnerAvatar` 完全对称的设计。
		*/ _proto.drawCardTagPills = function drawCardTagPills(recordId, cardRect) {
			var _this, _loop = function(pill) {
				var isHover = isSameTagPillHit(hoveredHit, pill);
				var pillFieldId = pill.fieldId;
				var pillRect = pill.rect;
				var isSource = _this.collector.state.isSourceFieldId(pillFieldId);
				if (isHover && !isSource) (_a = _this.hoverGroup) === null || _a === void 0 || _a.add(pen.config.rect(Object.assign(Object.assign({}, pillRect), {
					background: style.color.hoverBackground,
					borderRadius: pillRect.height / 2,
					opacity: 1
				})), 0, 0, clipArea);
				(_b = _this.hoverGroup) === null || _b === void 0 || _b.add(pen.config.rect(Object.assign(Object.assign({}, pillRect), {
					opacity: 1,
					onMouseUp: (event, stopPropagation) => {
						stopPropagation === null || stopPropagation === void 0 || stopPropagation();
						_this.emitter.wbService.onRecordClick.fire(isSource ? { recordId } : {
							recordId,
							fieldId: pillFieldId,
							cellRect: Object.assign({}, pillRect)
						});
					}
				})), 0, 0, clipArea);
				if (isHover && !isSource) _this.setCursor(Cursor.POINTER);
			};
			var _a, _b;
			var target = this.lastHoverTarget;
			if (!target || target.recordId !== recordId) return;
			var pillRects = this.collector.card.getBodyTagPillRects(target.groupIndex, recordId);
			if (!(pillRects === null || pillRects === void 0 ? void 0 : pillRects.length)) return;
			var baseClip = this.getCardClipArea();
			var padding = this.collector.size.cardPadding;
			var clipArea = {
				x: cardRect.x + padding,
				y: baseClip.y,
				width: cardRect.width - padding * 2,
				height: baseClip.height
			};
			var hoveredHit = this.lastHoverTagPillHit;
			for (var pill of pillRects) _this = this, _loop(pill);
		};
		/**
		* 卡片 hover 相关绘制共用的 clipArea。
		*
		* 必须与 MainRenderer 渲染卡片时使用的 clip 口径一致（详见 `drawCardHover` 注释 / renderer/main/index.ts），
		* 否则滚到底时最后一张卡的 hover 反馈 / 头像 hit rect 会越过分组背景下沿。
		* 抽出来给 `drawCardHover` 与 `drawCardOwnerAvatar` 共用，避免两份几乎相同的 clipArea 漂移。
		*/ _proto.getCardClipArea = function getCardClipArea() {
			var { groupCardVisibleStartY, groupCardVisibleHeight, rootWidth } = this.collector.size;
			return {
				x: 0,
				y: groupCardVisibleStartY,
				width: rootWidth,
				height: groupCardVisibleHeight
			};
		};
		/**
		* 是否被其它 feature 锁住（典型：KanbanCardMove 拖拽期间 default 优先级锁）。
		* 用于在 onMouseMove / render 入口短路 hover 反馈，避免拖动卡片时仍叠加边框 / 加号背景。
		*/ _proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IKanbanTodoHover);
		};
		return KanbanTodoHover;
	}(KanbanTodoFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/pc/tooltip/interface.js
var IKanbanTodoTooltip;
var init_interface = __esmMin((() => {
	init_module();
	IKanbanTodoTooltip = createDecorator("IKanbanTodoTooltip");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/pc/tooltip/main.js
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
var KanbanTodoTooltip;
var init_main$1 = __esmMin((() => {
	init_is_in_rect();
	init_kanban_todo_feature();
	init_hover_tooltip_controller();
	KanbanTodoTooltip = /* @__PURE__ */ function(KanbanTodoFeatureBase) {
		"use strict";
		_inherits$9(KanbanTodoTooltip, KanbanTodoFeatureBase);
		function KanbanTodoTooltip() {
			var _this = KanbanTodoFeatureBase.apply(this, arguments) || this;
			_this.controller = null;
			/**
			* 由 parentApi.render() 调用：底层数据 / 几何 / 滚动变化后保证 tooltip group 自身的 clip 与
			* 当前 stage 一致，并强制 hide 一次避免旧锚点错位停留（与 `KanbanTodoHover.render` 同款语义）。
			*/ _this.render = () => {
				var _a;
				(_a = _this.controller) === null || _a === void 0 || _a.syncStageRect();
			};
			return _this;
		}
		var _proto = KanbanTodoTooltip.prototype;
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
		* 命中分发：必须命中卡片（target.recordId 存在，非 head/blank/outStage）。
		*/ _proto.resolveHit = function resolveHit(stageX, stageY, target) {
			var _a, _b;
			if (!target || target.isOutStage || target.isBlank || !target.recordId) return null;
			return (_b = (_a = this.resolveAvatarHit(target.groupIndex, target.recordId, stageX, stageY)) !== null && _a !== void 0 ? _a : this.resolveTagPillHit(target.groupIndex, target.recordId, stageX, stageY)) !== null && _b !== void 0 ? _b : this.resolveDateHit(target.groupIndex, target.recordId, stageX, stageY);
		};
		/**
		* 单头像粒度命中：
		* 1) 拉该卡片的 `ownerAvatarSlots`（已是 stage 视口坐标），倒序遍历做 `isHitRect`；
		* 2) `id = card:<recordId>/avatar:<i>`：同一槽内 mousemove 不重画；跨槽 / 跨卡 id 变化触发淡出+淡入；
		* 3) anchorRect 直接用 slot.rect（已是 stage 坐标）。
		*/ _proto.resolveAvatarHit = function resolveAvatarHit(groupIndex, recordId, stageX, stageY) {
			var slots = this.collector.card.getOwnerAvatarSlots(groupIndex, recordId);
			if (!(slots === null || slots === void 0 ? void 0 : slots.length)) return null;
			for (var i = slots.length - 1; i >= 0; i--) {
				var slot = slots[i];
				if (!isHitRect(stageX, stageY, slot.rect)) continue;
				return {
					id: `card:${recordId}/avatar:${i}`,
					anchorRect: slot.rect,
					label: slot.tooltipLabel
				};
			}
			return null;
		};
		/**
		* sys_tags pill 单颗命中：
		*
		* 遍历 `getBodyTagPillRects`（stage 视口坐标，已 shift；tooltipLabel 由共享层根据「文本被截断」
		* 自动写入）。策略与 grid-list `resolveTagPillHit` 一致：
		* - `!pill.tooltipLabel` 直接跳过 —— 未截断 / +N pill 保持 undefined，不弹 tooltip；
		* - id = `card:<recordId>/pill:<i>`：同颗内 mousemove 不重画；跨颗 / 跨卡触发淡出+淡入。
		*
		* 与 `KanbanTodoHover.resolveTagPillHit` 独立：hover 分支即便 tooltipLabel 为空也需要
		* cursor 升级 + hover 反馈；tooltip 分支只在有 label 时命中。两者互不干扰。
		*/ _proto.resolveTagPillHit = function resolveTagPillHit(groupIndex, recordId, stageX, stageY) {
			var pillRects = this.collector.card.getBodyTagPillRects(groupIndex, recordId);
			if (!(pillRects === null || pillRects === void 0 ? void 0 : pillRects.length)) return null;
			for (var i = 0; i < pillRects.length; i++) {
				var pill = pillRects[i];
				if (!pill.tooltipLabel) continue;
				if (!isHitRect(stageX, stageY, pill.rect)) continue;
				return {
					id: `card:${recordId}/pill:${i}`,
					anchorRect: pill.rect,
					label: pill.tooltipLabel
				};
			}
			return null;
		};
		/**
		* 底部相对时间粒度命中：
		* 相对时间文本本身只显示「5 分钟前 / 刚刚」这类简写，用户 hover 时需要展开为「完整时间」
		* （field.format 已格式化好的绝对时间，如 `2026-06-25 19:53`）核对。
		*
		* `getDateHit` 内已把卡片局部坐标换算到 stage 视口坐标，命中直接用即可（与 avatar 分支同款）。
		*/ _proto.resolveDateHit = function resolveDateHit(groupIndex, recordId, stageX, stageY) {
			var hit = this.collector.card.getDateHit(groupIndex, recordId);
			if (!hit) return null;
			if (!isHitRect(stageX, stageY, hit.rect)) return null;
			return {
				id: `card:${recordId}/date`,
				anchorRect: hit.rect,
				label: hit.label
			};
		};
		return KanbanTodoTooltip;
	}(KanbanTodoFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/features/pc/entries.js
/**
* Kanban-Todo PC 端 features：
* - auto-scroll：直接复用 kanban 自动滚动；card-move 拖到分组边缘时需要它触发滚动
* - card-active：直接复用 kanban 现成实现（KanbanTodoView 与 KanbanPublicApi 结构兼容）
* - card-move：直接复用 kanban 卡片拖拽移动；todo 无「加号添加卡片」按钮（cardAddButtonHeight=0），
*   `getAddCardButtonRect` 自然返回 undefined，card-move 内部在该分支会额外把指示线画在
*   「最后一张卡片下沿」并将 nextRecordId 置 null，与 todo「拖到分组末尾」语义一致；
*   移动通过 behaviorApi.moveGroupRecord 下发，行为与 kanban 完全相同。
*   auth 用 Record（与 kanban 一致，无编辑权限时不启用）。
* - group-scroller：直接复用纵向分组滚动
* - h-scroller：直接复用横向滚动条；auto 模式下 globalWidth === rootWidth 时自动隐藏，
*   仅 fixed 模式（globalWidth > rootWidth）触发渲染与滚动
* - hover：todo 视图独有——卡片 hover 边框 + 分组头加号 hover 背景
*
* 注：active 态（点击选中卡片的绿色高亮）和批量选中态（checkbox 选中卡片的绿色高亮）
* 共用同一套 cardActiveBg / cardActiveBorder 配色，在 renderer/main/index.ts 的
* renderBody 中统一渲染，不再作为独立 feature。
*
* 类型说明：
* `KanbanTodoPublicApi = Omit<KanbanPublicApi, 'collector'> & { collector: KanbanTodoCollector }`，
* 在结构上是 KanbanPublicApi 的子类型。kanban 共用 features 的 ctor 签名为
* `new (renderer: KanbanPublicApi) => BaseFeature<KanbanPublicApi>`，
* 而我们注册到 todo 视图后实际传入的 renderer 是 KanbanTodoPublicApi 实例——这是「逆变位置」，
* 子类型实参可安全传给基类型形参，因此运行时无风险。
* 但 TS 在严格模式下无法直接对函数泛型做这种推断，因此对共用 features 与最终数组类型做一次显式 cast。
*/ function getPcFeatures() {
	var shared = [
		{
			id: IKanbanAutoScroll,
			ctor: KanbanAutoScroll,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IKanbanHorizontalScroller,
			ctor: KanbanHorizontalScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IKanbanGroupVerticalScroller,
			ctor: KanbanGroupVerticalScroller,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IKanbanCardActive,
			ctor: KanbanCardActive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IKanbanCardMove,
			ctor: KanbanCardMove,
			config: { auth: FeatureAuth.Record }
		}
	];
	var todoOnly = [
		{
			id: IKanbanTodoHover,
			ctor: KanbanTodoHover,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IKanbanTodoTooltip,
			ctor: KanbanTodoTooltip,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IKanbanTodoGroupMenu,
			ctor: KanbanTodoGroupMenu,
			config: { auth: FeatureAuth.None }
		}
	];
	return [...shared, ...todoOnly];
}
var init_entries = __esmMin((() => {
	init_auto_scroll();
	init_card_active();
	init_interface$4();
	init_main$4();
	init_h_scroller();
	init_card_move();
	init_feature_single();
	init_interface$2();
	init_main$3();
	init_interface$1();
	init_main$2();
	init_interface();
	init_main$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/event-handler/index.js
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
var import_main$1, KanbanTodoEventHandler;
var init_event_handler = __esmMin((() => {
	import_main$1 = require_main();
	init_feature_event();
	init_get_target_by_offset();
	init_is_in_rect();
	KanbanTodoEventHandler = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$8(KanbanTodoEventHandler, Disposable);
		function KanbanTodoEventHandler(stage, root, rendererModel) {
			var _this = Disposable.call(this) || this;
			_this.stage = stage;
			_this.root = root;
			_this.rendererModel = rendererModel;
			_this.getTarget = (offset) => {
				var { x: offsetX, y: offsetY } = offset;
				var { size, head, range } = _this.rendererModel.collector;
				var isOutsideStage = !isHitRect(offsetX, offsetY, size.globalRect);
				var groupIndex = range.getGroupIndexByOffsetX(offsetX);
				var target = {
					isBlank: isOutsideStage,
					isOutStage: isOutsideStage,
					groupIndex,
					isHead: false,
					isBody: false
				};
				if (offsetY < size.bodyRect.y) target.isHead = true;
				else target.isBody = true;
				var groupHeadInfo = head.getGroupInfo(groupIndex);
				var groupHeadRect = groupHeadInfo === null || groupHeadInfo === void 0 ? void 0 : groupHeadInfo.rect;
				var groupHeadX = ((groupHeadRect === null || groupHeadRect === void 0 ? void 0 : groupHeadRect.x) || 0) - range.scrollLeft;
				if (groupHeadRect && offsetX >= groupHeadX && offsetX <= groupHeadX + groupHeadRect.width) target.isBlank = false;
				else {
					target.isBlank = true;
					target.groupIndex = -1;
				}
				if (!target.isBlank && target.isHead && groupHeadInfo) {
					if (groupHeadInfo.groupAddRect) {
						var addRect = groupHeadInfo.groupAddRect;
						var addRenderRect = {
							x: addRect.x - range.scrollLeft,
							y: addRect.y,
							width: addRect.width,
							height: addRect.height
						};
						if (isHitRect(offsetX, offsetY, addRenderRect)) {
							target.isGroupAddBtn = true;
							target.groupAddRenderRect = addRenderRect;
						}
					}
					if (groupHeadInfo.groupMoreRect) {
						var moreRect = groupHeadInfo.groupMoreRect;
						var moreRenderRect = {
							x: moreRect.x - range.scrollLeft,
							y: moreRect.y,
							width: moreRect.width,
							height: moreRect.height
						};
						if (isHitRect(offsetX, offsetY, moreRenderRect)) {
							target.isGroupMoreBtn = true;
							target.groupMoreRenderRect = moreRenderRect;
						}
					}
					if (groupHeadInfo.selectAllRect) {
						var saRect = groupHeadInfo.selectAllRect;
						var selectAllRenderRect = {
							x: saRect.x - range.scrollLeft,
							y: saRect.y,
							width: saRect.width,
							height: saRect.height
						};
						if (isHitRect(offsetX, offsetY, selectAllRenderRect)) {
							target.isSelectAllBtn = true;
							target.selectAllRenderRect = selectAllRenderRect;
						}
					}
				}
				if (!target.isBlank && target.isBody) {
					var recordId = getCardRecordId(offsetY, target.groupIndex, _this.rendererModel.collector);
					if (recordId) {
						var cardInfo = _this.rendererModel.collector.card.getCardInfo(target.groupIndex, recordId);
						if (cardInfo) {
							var scrollTop = range.getGroupScrollTop(target.groupIndex);
							var cardRenderRect = {
								x: cardInfo.rect.x - range.scrollLeft,
								y: cardInfo.rect.y + size.groupCardVisibleStartY - scrollTop,
								width: cardInfo.rect.width,
								height: cardInfo.rect.height
							};
							if (isHitRect(offsetX, offsetY, cardRenderRect)) {
								target.recordId = recordId;
								target.cardRenderRect = cardRenderRect;
							}
						}
					}
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
		return KanbanTodoEventHandler;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/collector/card.js
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
var import_cloneDeep, import_main, BODY_TAG_CONTENT_ID, AVATAR_GROUP_CONTENT_ID, CardCollector;
var init_card = __esmMin((() => {
	import_cloneDeep = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_event();
	import_main = require_main();
	init_es();
	init_field_collector();
	init_field_fixed_height();
	init_pen();
	init_utils();
	init_card_single();
	init_icon();
	init_bottom_collectors();
	init_wb_cell();
	init_wb_config();
	BODY_TAG_CONTENT_ID = "__wb_kanban_todo_body_tag__";
	AVATAR_GROUP_CONTENT_ID = "__wb_kanban_todo_avatar_group__";
	CardCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$7(CardCollector, Disposable);
		function CardCollector(dataUtil, state, size, head, range, status) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.state = state;
			_this.size = size;
			_this.head = head;
			_this.range = range;
			_this.status = status;
			_this.groupInfos = /* @__PURE__ */ new Map();
			_this.onContentChangeEmitter = _this._register(new Emitter());
			_this.onContentChange = _this.onContentChangeEmitter.event;
			_this.cardSingle = new CardSingleCollector(_this.dataUtil, _this.status, fieldCollector.getDefaultConfig({
				maxLines: 2,
				textConfig: {
					wrap: "word",
					ellipsis: true,
					verticalAlign: "top"
				},
				formulaConfig: { errorType: "withText" }
			}));
			return _this;
		}
		var _proto = CardCollector.prototype;
		_proto.dispose = function dispose() {
			Disposable.prototype.dispose.call(this);
			this.groupInfos.clear();
		};
		_proto.collect = function collect() {
			this.groupInfos.clear();
			this.collectCards();
		};
		_proto.patch = function patch() {
			this.collect();
		};
		_proto.getCardInfo = function getCardInfo(groupIndex, recordId) {
			var groupInfo = this.getGroupInfo(groupIndex);
			var virtualList = this.range.getVirtualList(groupIndex);
			if (!recordId || !groupInfo || !virtualList) return;
			var cardInfo = groupInfo.get(recordId);
			if (!cardInfo) return;
			if (!(cardInfo === null || cardInfo === void 0 ? void 0 : cardInfo.card)) {
				var headInfo = this.head.getGroupInfo(groupIndex);
				if (!headInfo) return;
				cardInfo.card = this.collectCardInfo(recordId, headInfo, cardInfo, groupIndex);
				groupInfo.set(recordId, cardInfo);
				var offset = cardInfo.card.rect.height - this.range.virtualHeight;
				for (var index = cardInfo.recordIndex + 1; index < virtualList.length; index++) virtualList[index].startY += offset;
				if (offset !== 0) this.updateGroupYInfoAfterCollect(groupIndex, groupInfo);
			}
			var offsetY = virtualList[cardInfo.recordIndex].startY;
			var copyCard = {
				index: cardInfo.recordIndex,
				rect: Object.assign(Object.assign({}, cardInfo.card.rect), { y: offsetY }),
				contents: (0, import_cloneDeep.default)(cardInfo.card.contents)
			};
			copyCard.contents.forEach((cardContent) => {
				cardContent[0].y += offsetY;
				cardContent[1].forEach((drawConfig) => {
					drawConfig.y += offsetY;
				});
			});
			return copyCard;
		};
		/**
		* 获取「指定卡片 owner 头像组」的单槽命中信息，rect 已换算到 **stage 视口坐标系**
		* （即与 `cardRenderRect` 同坐标系）。
		*
		* 返回 `undefined` 的几种情况：
		* - 分组 / 记录不存在；
		* - 卡片尚未触发 `getCardInfo` 收集（首屏外的虚拟卡片）—— 由调用方按需先调一次 `getCardInfo`
		*   或在 hover 命中时由 `event-handler` 自动触发；
		* - 该卡片 owner 列未配置 / 头像组未产出（owners 段被整体跳过）。
		*
		* 坐标换算公式（与 `getOwnerAvatarRect` 共用 `resolveCardStageBase`）：
		* - 局部 y（与 `card.contents` 内 drawConfig.y 同源、相对卡片顶部）
		*   → stage y = `localY + virtualList[recordIndex].startY + groupCardVisibleStartY - groupScrollTop`；
		* - 局部 x 直接减 `range.scrollLeft` 即可。
		*
		* 命中遍历建议倒序：slots 顺序为 z 低→z 高（先 +N 槽、再倒序真头像），倒序遍历对应「左压右」高 z 优先。
		*/ _proto.getOwnerAvatarSlots = function getOwnerAvatarSlots(groupIndex, recordId) {
			var base = this.resolveCardStageBase(groupIndex, recordId);
			if (!base) return void 0;
			var slots = base.cardInfo.ownerAvatarSlots;
			if (!(slots === null || slots === void 0 ? void 0 : slots.length)) return void 0;
			return slots.map((slot) => Object.assign(Object.assign({}, slot), { rect: this.shiftRect(slot.rect, base.baseX, base.baseY) }));
		};
		/**
		* 获取「指定卡片 owner 头像组」的**整组矩形**，rect 已换算到 stage 视口坐标系
		* （与 `getOwnerAvatarSlots` 共用同一套换算基准 `resolveCardStageBase`）。
		*
		* 供 `KanbanTodoHover` 做整组级命中：
		* - mousemove 命中头像组 → cursor 升级 POINTER + 画 hover 反馈；
		* - mouseDown 命中头像组 → fire `onRecordClick({ recordId, fieldId, cellRect })`，
		*   让 wb 上层弹出人员列编辑器（与 grid-list 行右侧 owner 头像点击同语义）。
		*
		* 返回 `undefined` 的判定与 `getOwnerAvatarSlots` 完全对称：分组/记录不存在 / 卡片未收集 /
		* owner 列未配置 / 头像组未产出。
		*/ _proto.getOwnerAvatarRect = function getOwnerAvatarRect(groupIndex, recordId) {
			var base = this.resolveCardStageBase(groupIndex, recordId);
			if (!base) return void 0;
			var rect = base.cardInfo.ownerAvatarRect;
			if (!rect) return void 0;
			return this.shiftRect(rect, base.baseX, base.baseY);
		};
		/**
		* 获取「指定卡片 body 区标签组」中每颗 pill 的 fieldId + rect，rect 已换算到 stage 视口坐标系。
		*
		* 供 `KanbanTodoHover` 做单 pill 粒度命中：
		* - mousemove 命中某颗 pill → cursor 升级 POINTER + 画 hover 反馈（圆角胶囊背景）；
		* - click → fire `onRecordClick({ recordId, fieldId, cellRect })`，让 wb 上层弹出对应字段编辑器。
		*
		* 返回 `undefined`：分组/记录不存在 / 卡片未收集 / 标签组未配置或无可绘 pill。
		*/ _proto.getBodyTagPillRects = function getBodyTagPillRects(groupIndex, recordId) {
			var base = this.resolveCardStageBase(groupIndex, recordId);
			if (!base) return void 0;
			var pillRects = base.cardInfo.bodyTagPillRects;
			if (!(pillRects === null || pillRects === void 0 ? void 0 : pillRects.length)) return void 0;
			return pillRects.map((pill) => Object.assign({
				fieldId: pill.fieldId,
				rect: this.shiftRect(pill.rect, base.baseX, base.baseY),
				tooltipLabel: pill.tooltipLabel
			}, pill.overflowItems ? { overflowItems: pill.overflowItems } : {}));
		};
		/**
		* 获取「指定卡片底部相对时间段」的命中信息（rect 已换算到 stage 视口坐标系）+ 完整时间 tooltip 文案。
		*
		* 与 `getOwnerAvatarSlots` / `getBodyTagPillRects` 共用 `resolveCardStageBase` 换算基准；
		* 供 `KanbanTodoTooltip` 做「hover 相对时间 → 显示完整时间」命中：
		* - `rect`：date 段实际绘制的视觉矩形（stage 视口坐标，已扣 scrollLeft / groupScrollTop）；
		* - `label`：field.format 已格式化好的完整时间（如 `2026-06-25 19:53`）。
		*
		* 返回 `undefined` 的情况：分组/记录不存在 / 卡片未收集 / date 段未绘制 / 完整时间文本为空。
		*/ _proto.getDateHit = function getDateHit(groupIndex, recordId) {
			var base = this.resolveCardStageBase(groupIndex, recordId);
			if (!base) return void 0;
			var { dateRect, dateTooltipLabel } = base.cardInfo;
			if (!dateRect || !dateTooltipLabel) return void 0;
			return {
				rect: this.shiftRect(dateRect, base.baseX, base.baseY),
				label: dateTooltipLabel
			};
		};
		_proto.getScrollTopRecordIndex = function getScrollTopRecordIndex(groupIndex) {
			var groupScrollTop = this.range.getGroupScrollTop(groupIndex);
			var virtualList = this.range.getVirtualList(groupIndex);
			if (!virtualList) return 0;
			return this.range.findRecordByScrollTop(virtualList, groupScrollTop);
		};
		_proto.collectVisible = function collectVisible() {
			this.range.doGroupRange((groupIndex) => {
				this.collectByGroup(groupIndex);
			});
		};
		/**
		* 解析「卡片局部坐标 → stage 视口坐标」的偏移基准。
		*
		* 返回的 `(baseX, baseY)` 与 `card.contents` / `ownerAvatarSlots` / `ownerAvatarRect`
		* 这些「卡片局部坐标」字段同源；调用方对任意局部 rect 应用 `(x+baseX, y+baseY)` 即可换算到
		* stage 视口坐标。抽出来给 slots / rect 两路公开 API 共用，避免两份几乎相同的换算实现漂移。
		*
		* 任一前置条件不满足（分组 / 记录 / 卡片 / 虚拟列表项缺失）返回 undefined，调用方据此短路。
		*/ _proto.resolveCardStageBase = function resolveCardStageBase(groupIndex, recordId) {
			var groupInfo = this.groupInfos.get(groupIndex);
			if (!groupInfo) return void 0;
			var cardInfo = groupInfo.get(recordId);
			if (!(cardInfo === null || cardInfo === void 0 ? void 0 : cardInfo.card)) return void 0;
			var virtualList = this.range.getVirtualList(groupIndex);
			if (!(virtualList === null || virtualList === void 0 ? void 0 : virtualList[cardInfo.recordIndex])) return void 0;
			var baseY = virtualList[cardInfo.recordIndex].startY + this.size.groupCardVisibleStartY - this.range.getGroupScrollTop(groupIndex);
			return {
				cardInfo,
				baseX: -this.range.scrollLeft,
				baseY
			};
		};
		/** 将一个局部 rect 应用 `(baseX, baseY)` 偏移返回新 rect（不修改入参）。 */ _proto.shiftRect = function shiftRect(rect, baseX, baseY) {
			return {
				x: rect.x + baseX,
				y: rect.y + baseY,
				width: rect.width,
				height: rect.height
			};
		};
		_proto.collectCards = function collectCards() {
			var _a;
			if (this.state.isExporting() || ((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll)) this.collectAll();
			else this.collectVisible();
		};
		_proto.collectAll = function collectAll() {
			for (var groupIndex = 0; groupIndex < this.head.getGroupCount(); groupIndex++) this.collectByGroup(groupIndex, true);
		};
		_proto.collectByGroup = function collectByGroup(groupIndex, collectAll = false) {
			var groups = this.dataUtil.getGroups();
			if (!groups || groupIndex >= groups.groupIds.length) return;
			var groupId = groups.groupIds[groupIndex];
			var recordIds = groups.groupRecordIds.get(groupId);
			if (!(recordIds === null || recordIds === void 0 ? void 0 : recordIds.length)) return;
			var groupInfo = this.getGroupInfo(groupIndex);
			if (!groupInfo) return;
			this.collectCardInfoByGroup(groupIndex, groupInfo, recordIds, collectAll);
		};
		_proto.getGroupInfo = function getGroupInfo(groupIndex) {
			var groupInfo = this.groupInfos.get(groupIndex);
			if (!groupInfo) {
				var cardInfos = /* @__PURE__ */ new Map();
				var groups = this.dataUtil.getGroups();
				if (!groups || groupIndex >= groups.groupIds.length) return;
				var groupId = groups.groupIds[groupIndex];
				var recordIds = groups.groupRecordIds.get(groupId);
				if (!(recordIds === null || recordIds === void 0 ? void 0 : recordIds.length)) return;
				recordIds.forEach((recordId, index) => {
					cardInfos.set(recordId, { recordIndex: index });
				});
				groupInfo = cardInfos;
				this.groupInfos.set(groupIndex, groupInfo);
				this.range.updateGroupTotalHeight(groupIndex, 0);
			}
			return groupInfo;
		};
		_proto.collectCardInfoByGroup = function collectCardInfoByGroup(groupIndex, groupInfo, recordIds, collectAll) {
			var headInfo = this.head.getGroupInfo(groupIndex);
			if (!headInfo) return;
			var groupScrollTop = this.range.getGroupScrollTop(groupIndex);
			var virtualList = this.range.getVirtualList(groupIndex);
			if (!virtualList) return;
			var visibleEndY = groupScrollTop + this.size.groupCardVisibleHeight;
			var startIndex = collectAll ? 0 : this.range.findRecordByScrollTop(virtualList, groupScrollTop);
			var offset = 0;
			for (var index = startIndex; index < recordIds.length; index++) {
				if (!virtualList[index]) break;
				virtualList[index].startY += offset;
				if (!collectAll && virtualList[index].startY > visibleEndY) continue;
				var recordId = recordIds[index];
				var recordCardInfo = groupInfo.get(recordId);
				if (!recordCardInfo || recordCardInfo.card) continue;
				recordCardInfo.card = this.collectCardInfo(recordId, headInfo, recordCardInfo, groupIndex);
				groupInfo.set(recordId, recordCardInfo);
				offset += recordCardInfo.card.rect.height - this.range.virtualHeight;
			}
			if (groupInfo.size) this.groupInfos.set(groupIndex, groupInfo);
			this.updateGroupYInfoAfterCollect(groupIndex, groupInfo);
			if (offset === 0) return;
			this.collectCardInfoByGroup(groupIndex, groupInfo, recordIds, collectAll);
		};
		/**
		* 收集单张卡片：cover/primary/cellContents 复用 kanban 的 CardSingleCollector，
		* 然后追加 todo 专属底部（头像组 / 相对时间）。
		*
		* @param outInfo - 可选的「外部 `KanbanTodoCardInfo` 引用」：本函数会在收集到 owner 头像组时把
		*   `AvatarSlotHit[]` 回写到 `outInfo.ownerAvatarSlots` 上，给 hover-tooltip feature 提供单头像粒度命中。
		*   不传则不回写（即 slots 信息丢失）；调用方在主收集路径（`collectByGroup` / 首次 `getCardInfo`）
		*   都已透传 recordCardInfo 引用，保证 slots 与 card 同生命周期被缓存。
		*/ _proto.collectCardInfo = function collectCardInfo(recordId, headInfo, outInfo, groupIndex) {
			var _a, _b;
			var groupHeadRect = headInfo.rect;
			var cardStartX = groupHeadRect.x + this.size.groupBodyPaddingX;
			var cardWidth = groupHeadRect.width - this.size.groupBodyPaddingX * 2;
			var option = this.getCollectOption(recordId, cardStartX, cardWidth);
			var cardInfo = {
				rect: {
					x: option.collectStartX,
					y: option.collectStartY,
					width: option.cardWidth,
					height: 0
				},
				contents: []
			};
			var contentStartY = option.collectStartY;
			var cardConfig = this.dataUtil.getCardConfig();
			if ((cardConfig === null || cardConfig === void 0 ? void 0 : cardConfig.isShowCover) && cardConfig.coverFieldId) {
				var coverInfo = this.cardSingle.collectCover(cardConfig.coverFieldId, contentStartY, option);
				if (coverInfo === null || coverInfo === void 0 ? void 0 : coverInfo.contents.length) {
					slicePush(cardInfo.contents, coverInfo.contents);
					contentStartY += coverInfo.takeHeight + option.cardContentGap;
					cardInfo.rect.height += coverInfo.takeHeight + option.cardContentGap;
				} else {
					contentStartY += option.cardPadding;
					cardInfo.rect.height += option.cardPadding;
				}
			} else {
				contentStartY += option.cardPadding;
				cardInfo.rect.height += option.cardPadding;
			}
			var isBatchMode = groupIndex !== void 0 && this.state.isGroupInBatchMode(groupIndex);
			var checkboxReserved = isBatchMode ? this.size.checkboxSize + this.size.checkboxGap : 0;
			var primaryOption = isBatchMode ? Object.assign(Object.assign({}, option), {
				collectStartX: option.collectStartX + checkboxReserved,
				cardWidth: option.cardWidth - checkboxReserved
			}) : option;
			var primaryInfo = this.cardSingle.collectPrimaryTitle(contentStartY, primaryOption, fieldFixedContent.getFixedContentDrawHeight.bind(fieldFixedContent), this.state.getPrimaryTitleWithParents(recordId));
			if (primaryInfo) {
				if (isBatchMode) {
					var cbAlias = toThemedKanbanTodoIconAlias(this.state.isRecordSelected(recordId) ? KanbanTodoIconAlias.CHECKBOX_CHECKED : KanbanTodoIconAlias.CHECKBOX_UNCHECKED);
					var cbSize = this.size.checkboxSize;
					var cbRect = {
						x: option.collectStartX + option.cardPadding,
						y: contentStartY + (primaryInfo.takeHeight - cbSize) / 2 + 2,
						width: cbSize,
						height: cbSize
					};
					cardInfo.contents.push([cbRect, [pen.config.icon(cbAlias, cbRect)]]);
				}
				slicePush(cardInfo.contents, primaryInfo.contents);
				contentStartY += primaryInfo.takeHeight + option.cardContentGap + this.size.primaryPaddingBottom;
				cardInfo.rect.height += primaryInfo.takeHeight + this.size.primaryPaddingBottom;
			}
			var isShowFieldTitle = (_a = cardConfig === null || cardConfig === void 0 ? void 0 : cardConfig.isShowFieldTitle) !== null && _a !== void 0 ? _a : false;
			var bodyShowFieldIds = this.state.getVisibleBodyShowFieldIds();
			var cellInfo = bodyShowFieldIds.length ? this.cardSingle.collectCellContents(contentStartY, option, isShowFieldTitle, void 0, bodyShowFieldIds) : void 0;
			if (cellInfo === null || cellInfo === void 0 ? void 0 : cellInfo.contents.length) {
				slicePush(cardInfo.contents, cellInfo.contents);
				cardInfo.rect.height += cellInfo.takeHeight;
				contentStartY += cellInfo.takeHeight;
			}
			var bodyTagFieldIds = this.state.getVisibleBodyTagFieldIds();
			if (bodyTagFieldIds.length) {
				var tagRowY = contentStartY + this.size.tagRowGap;
				var tagRowX = option.collectStartX + option.cardPadding;
				var tagRowAvailableWidth = option.cardWidth - option.cardPadding * 2;
				var { configs: tagConfigs, width: tagsTotalWidth, pillRects: tagPillRects } = collectBodyTag({
					fieldIds: bodyTagFieldIds,
					recordId,
					getField: (fieldId) => this.dataUtil.getFieldByFieldId(fieldId),
					getStandardCell: (fieldId, rid) => this.dataUtil.getStandardCell(fieldId, rid),
					startX: tagRowX,
					y: tagRowY,
					itemGap: this.size.tagItemGap,
					expandIconOnly: true
				});
				if (tagConfigs.length > 0 && tagsTotalWidth > 0) {
					var tagRowRect = {
						x: tagRowX,
						y: tagRowY,
						width: Math.min(tagsTotalWidth, tagRowAvailableWidth),
						height: BODY_TAG_PILL_GEOMETRY.itemHeight
					};
					cardInfo.contents.push([
						tagRowRect,
						tagConfigs,
						BODY_TAG_CONTENT_ID
					]);
					var tagSegmentHeight = this.size.tagRowGap + BODY_TAG_PILL_GEOMETRY.itemHeight;
					cardInfo.rect.height += tagSegmentHeight;
					contentStartY += tagSegmentHeight;
					if (outInfo && tagPillRects.length > 0) outInfo.bodyTagPillRects = tagPillRects;
				}
			}
			if (this.state.isSysTagsFieldVisible()) {
				var sysTagsItems = resolveTagsCellItems(this.state.getSysTagsCell(recordId));
				if (sysTagsItems.length > 0) {
					var rowY = contentStartY + this.size.tagRowGap;
					var rowX = option.collectStartX + option.cardPadding;
					var rowAvailableWidth = option.cardWidth - option.cardPadding * 2;
					var { configs: sysTagsConfigs, pillRects: sysTagsPillRects, width: sysTagsWidth } = collectTagsPillsInRect({
						x: rowX,
						y: rowY,
						width: rowAvailableWidth,
						height: BODY_TAG_PILL_GEOMETRY.itemHeight
					}, sysTagsItems, this.state.getSysTagsFieldId(), false, SYS_TAGS_FIELD_TITLE);
					if (sysTagsConfigs.length > 0 && sysTagsWidth > 0) {
						var segRect = {
							x: rowX,
							y: rowY,
							width: Math.min(sysTagsWidth, rowAvailableWidth),
							height: BODY_TAG_PILL_GEOMETRY.itemHeight
						};
						cardInfo.contents.push([
							segRect,
							sysTagsConfigs,
							BODY_TAG_CONTENT_ID
						]);
						var segHeight = this.size.tagRowGap + BODY_TAG_PILL_GEOMETRY.itemHeight;
						cardInfo.rect.height += segHeight;
						contentStartY += segHeight;
						if (outInfo && sysTagsPillRects.length > 0) outInfo.bodyTagPillRects = outInfo.bodyTagPillRects ? [...outInfo.bodyTagPillRects, ...sysTagsPillRects] : sysTagsPillRects;
					}
				}
			}
			var bottomInfo = this.collectCardBottom(recordId, contentStartY, option);
			if (bottomInfo) {
				slicePush(cardInfo.contents, bottomInfo.contents);
				cardInfo.rect.height += bottomInfo.takeHeight;
				contentStartY += bottomInfo.takeHeight;
				if (outInfo && ((_b = bottomInfo.avatarSlots) === null || _b === void 0 ? void 0 : _b.length)) outInfo.ownerAvatarSlots = bottomInfo.avatarSlots;
				if (outInfo && bottomInfo.avatarRect) outInfo.ownerAvatarRect = bottomInfo.avatarRect;
				if (outInfo && bottomInfo.dateRect) {
					outInfo.dateRect = bottomInfo.dateRect;
					outInfo.dateTooltipLabel = bottomInfo.dateTooltipLabel;
				}
			} else {
				cardInfo.rect.height += this.size.bottomRowGap;
				contentStartY += this.size.bottomRowGap;
			}
			cardInfo.rect.height += this.size.cardPaddingBottom;
			return cardInfo;
		};
		/**
		* 收集卡片底部内容：用户头像组 + 相对时间
		* 严格按 collect 阶段产出最终 DrawConfig，render 阶段不再计算。
		*/ _proto.collectCardBottom = function collectCardBottom(recordId, startY, option) {
			var ownerTitle = WbSharedConfig.card.bottom.ownerFieldTitle;
			var dateTitle = WbSharedConfig.card.bottom.dateFieldTitle;
			if (!ownerTitle && !dateTitle) return;
			var owners = this.state.getOwnerUsers(recordId);
			var isOwnerVisible = this.state.isOwnerFieldVisible();
			var ts = this.state.isDateFieldVisible() ? this.state.getDateTimestamp(recordId) : void 0;
			var dateText = ts ? this.state.formatRelativeTime(ts) : "";
			var hasOwners = isOwnerVisible;
			var hasDate = Boolean(dateText);
			if (!hasOwners && !hasDate) return;
			var rowGap = this.size.bottomRowGap;
			var rowHeight = this.size.bottomRowHeight;
			var totalY = startY + rowGap;
			var contents = [];
			var rowRect = {
				x: option.collectStartX + option.cardPadding,
				y: totalY,
				width: option.cardWidth - option.cardPadding * 2,
				height: rowHeight
			};
			var cursorX = rowRect.x;
			var avatarSlots;
			var avatarRect;
			var dateRect;
			var dateTooltipLabel;
			if (hasOwners) {
				var { avatarSize } = this.size;
				var { configs: avatarConfigs, width: groupWidth, slots } = collectAvatarGroup({
					users: owners,
					startX: cursorX,
					centerY: rowRect.y + rowHeight / 2,
					avatarSize,
					textFontSize: this.size.avatarTextFontSize,
					drawEmptyPlaceholder: true
				});
				if (groupWidth > 0) {
					var groupRect = {
						x: cursorX,
						y: rowRect.y + (rowHeight - avatarSize) / 2,
						width: groupWidth,
						height: avatarSize
					};
					contents.push([
						groupRect,
						avatarConfigs,
						AVATAR_GROUP_CONTENT_ID
					]);
					cursorX += groupWidth + this.size.avatarStatusGap;
					applyAvatarSlotsFieldTitlePrefix(slots, ownerTitle);
					avatarSlots = slots;
					avatarRect = groupRect;
				}
			}
			if (hasDate) {
				var measuredWidth = pen.util.measureTextWidth(dateText, this.size.bottomDateFontSize);
				if (measuredWidth > 0) {
					var dateStartX = rowRect.x + rowRect.width - measuredWidth;
					var { configs: dateConfigs, width: dateWidth } = collectRelativeTimeText({
						text: dateText,
						startX: dateStartX,
						y: rowRect.y,
						rowHeight,
						fontSize: this.size.bottomDateFontSize,
						align: "right"
					});
					if (dateWidth > 0) {
						var dateSegRect = {
							x: dateStartX,
							y: rowRect.y,
							width: dateWidth,
							height: rowHeight
						};
						contents.push([dateSegRect, dateConfigs]);
						dateRect = dateSegRect;
						var fullText = this.state.getDateFullText(recordId);
						if (fullText) dateTooltipLabel = formatFieldTooltipLabel(dateTitle, fullText);
					}
				}
			}
			if (contents.length === 0) return;
			return {
				contents,
				takeHeight: rowHeight + rowGap,
				avatarSlots,
				avatarRect,
				dateRect,
				dateTooltipLabel
			};
		};
		/**
		* 重新计算分组总高度 / 稳定区间。
		*
		* 这里 totalHeight 直接取「最后一张卡的 endY」，**不再额外加 bottomPadding**：
		* 分组底部的留白通过 `size.groupCardVisibleEndY` 内置减去 `groupBodyPaddingBottom`
		* 来实现（见 size.ts），那样 clip / scroll / bodyBg 三者口径自然一致——
		* 滚到底时最后一张卡屏幕底正好顶到 visibleEndY，而 visibleEndY 距分组背景下沿天然
		* 留出 `groupBodyPaddingBottom`。
		*/ _proto.updateGroupYInfoAfterCollect = function updateGroupYInfoAfterCollect(groupIndex, groupInfo) {
			var virtualList = this.range.getVirtualList(groupIndex);
			if (!virtualList || virtualList.length === 0) return;
			var lastCardInfo = groupInfo.get(virtualList[virtualList.length - 1].recordId);
			if (lastCardInfo === null || lastCardInfo === void 0 ? void 0 : lastCardInfo.card) this.range.updateGroupTotalHeight(groupIndex, virtualList[virtualList.length - 1].startY + lastCardInfo.card.rect.height);
			else this.range.updateGroupTotalHeight(groupIndex, virtualList[virtualList.length - 1].startY + this.range.virtualHeight);
			var fixInfo = this.range.getGroupFixOffset(groupIndex);
			if (fixInfo && virtualList[fixInfo.recordIndex]) {
				var { recordIndex, recordOffset } = fixInfo;
				var { startY } = virtualList[recordIndex];
				var recordHeight = virtualList[recordIndex + 1] ? virtualList[recordIndex + 1].startY - startY - this.size.cardMarginTop : this.range.virtualHeight;
				this.range.updateGroupScrollTop(groupIndex, startY + recordHeight - recordOffset);
			}
		};
		_proto.getCollectOption = function getCollectOption(recordId, startX, cardWidth) {
			return {
				recordId,
				collectStartX: startX,
				collectStartY: 0,
				cardWidth,
				cardPadding: this.size.cardPadding,
				coverHeight: this.size.cardCoverHeight,
				cardContentGap: this.size.cardContentGap,
				cardFieldTitleGap: this.size.cardFieldTitleGap,
				cardFieldTitleHeight: this.size.cardFieldTitleHeight
			};
		};
		return CardCollector;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/config.js
var KanbanTodoConfig;
var init_config = __esmMin((() => {
	KanbanTodoConfig = {
		group: { bodyBackgroundHeightMode: "fill" },
		parentFieldTitle: "sys_parent_id"
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/renderer/main/index.js
/**
* 计算两个矩形的相交区域（屏幕坐标系）。无交集时返回 undefined。
*
* 用于 tagRow 段把 segRect（kanban-todo 卡片可用宽矩形）与 groupClipArea（分组可视区）
* 求交后作为 canvas clip——既保证不超出卡片右边界，也保证不超出分组可视区。
*/ function intersectRect(a, b) {
	var x = Math.max(a.x, b.x);
	var y = Math.max(a.y, b.y);
	var right = Math.min(a.x + a.width, b.x + b.width);
	var bottom = Math.min(a.y + a.height, b.y + b.height);
	if (right <= x || bottom <= y) return void 0;
	return {
		x,
		y,
		width: right - x,
		height: bottom - y
	};
}
/**
* 把 css 颜色字符串转为指定 alpha 的 rgba 字符串，供渐变 stops 直接使用。
*
* 支持入参：
* - `#rgb` / `#rrggbb` / `#rrggbbaa` 十六进制
* - `rgb(r,g,b)` / `rgba(r,g,b,a)` 函数式
* - 其它格式：兜底用 alpha=0 / alpha=1 之间最接近的关键字（保底行为，不抛错）。
*
* 兼容性原则：尽量原地解析，避免引入额外依赖；解析失败时退化为半透明白色，
* 让上层至少能看到一个温和的渐变，而不是整块消失。
*/ function toRgba(color, alpha) {
	if (!color) return `rgba(255, 255, 255, ${alpha})`;
	var trimmed = color.trim();
	if (trimmed.startsWith("#")) {
		var hex = trimmed.slice(1);
		var parse = (start, len) => {
			var chunk = len === 1 ? hex[start].repeat(2) : hex.slice(start, start + len);
			return parseInt(chunk, 16);
		};
		if (hex.length === 3 || hex.length === 4) return `rgba(${parse(0, 1)}, ${parse(1, 1)}, ${parse(2, 1)}, ${alpha})`;
		if (hex.length === 6 || hex.length === 8) return `rgba(${parse(0, 2)}, ${parse(2, 2)}, ${parse(4, 2)}, ${alpha})`;
	}
	var rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
	if (rgbMatch) return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
	return `rgba(255, 255, 255, ${alpha})`;
}
var SEG_CLIP_VERTICAL_PAD, MainRenderer;
var init_main = __esmMin((() => {
	init_es();
	init_lib();
	init_pen();
	init_style();
	init_card();
	init_config();
	init_color();
	SEG_CLIP_VERTICAL_PAD = 1;
	MainRenderer = /* @__PURE__ */ function() {
		"use strict";
		function MainRenderer(rendererModel) {
			this.collector = rendererModel.collector;
		}
		var _proto = MainRenderer.prototype;
		_proto.render = function render(headContainer, bodyContainer) {
			this.collector.range.doGroupRange((groupIndex) => {
				this.renderGroupHeadBackground(headContainer, groupIndex);
				this.renderGroupBodyBackground(bodyContainer, groupIndex);
				this.renderHead(headContainer, groupIndex);
				this.renderBody(bodyContainer, groupIndex);
				this.renderBottomScrollHint(bodyContainer, groupIndex);
			});
		};
		_proto.renderHead = function renderHead(headContainer, groupIndex, x, y) {
			var groupInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!groupInfo) return;
			var offsetX = x !== null && x !== void 0 ? x : -this.collector.range.scrollLeft;
			var offsetY = y !== null && y !== void 0 ? y : 0;
			groupInfo.contents.forEach((content) => headContainer.add(Object.assign({}, content), offsetX, offsetY));
		};
		_proto.renderBody = function renderBody(bodyContainer, groupIndex, x, _headY, bodyY) {
			var { range, size } = this.collector;
			var offsetX = x !== null && x !== void 0 ? x : -range.scrollLeft;
			var offsetY = bodyY !== null && bodyY !== void 0 ? bodyY : -range.getGroupScrollTop(groupIndex);
			var groupHeadInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!groupHeadInfo) return;
			groupHeadInfo.rect;
			var bodyStartY = 0;
			var bodyAvailableHeight = size.groupCardVisibleHeight;
			var groupClipArea = {
				x: groupHeadInfo.containerRect.x + offsetX,
				y: bodyStartY,
				width: groupHeadInfo.containerRect.width,
				height: bodyAvailableHeight
			};
			var cardList = range.getVirtualList(groupIndex);
			if (!cardList || cardList.length === 0) {
				this.renderEmptyTip(bodyContainer, groupHeadInfo.containerRect, offsetX, bodyStartY);
				return;
			}
			for (var index = this.collector.card.getScrollTopRecordIndex(groupIndex); index < cardList.length; index++) {
				var { recordId, startY } = cardList[index];
				if (startY + offsetY > bodyAvailableHeight) break;
				var cardInfo = this.collector.card.getCardInfo(groupIndex, recordId);
				if (!cardInfo) continue;
				var isHighlight = this.collector.state.isHighlightRecord(recordId);
				var isActive = recordId === this.collector.state.getActiveRecordId();
				var isSelected = this.collector.state.isRecordSelected(recordId);
				var isAccented = isActive || isSelected;
				var cardBox = pen.config.rect(Object.assign(Object.assign({}, cardInfo.rect), {
					borderRadius: size.todoCardRadius,
					background: isHighlight ? style.color.searchHighlightBackground : isAccented ? wbColors.cardActiveBg : style.color.normalBackground,
					borderColor: isAccented ? wbColors.cardActiveBorder : void 0,
					borderWidth: isAccented ? style.size.borderWidth : 0,
					level: Level.L1
				}));
				bodyContainer.add(cardBox, offsetX, offsetY, groupClipArea);
				cardInfo.contents.forEach((contents) => {
					if (contents[0].y + offsetY > bodyAvailableHeight || offsetY + contents[0].y + contents[0].height < 0) return;
					if (contents[2] === "__wb_kanban_todo_avatar_group__") {
						var bodyRect = bodyContainer.getAttrs();
						var avatarGroup = pen.group({
							x: bodyRect.x,
							y: bodyRect.y,
							width: bodyRect.width,
							height: bodyRect.height,
							batch: false,
							overflow: "visible"
						});
						contents[1].forEach((drawConfig) => {
							avatarGroup.add(Object.assign({}, drawConfig), offsetX, offsetY, groupClipArea);
						});
						bodyContainer.addGroup(avatarGroup);
						return;
					}
					var segClip = contents[2] === "__wb_kanban_todo_body_tag__" ? intersectRect({
						x: contents[0].x + offsetX,
						y: contents[0].y + offsetY - SEG_CLIP_VERTICAL_PAD,
						width: contents[0].width,
						height: contents[0].height + SEG_CLIP_VERTICAL_PAD * 2
					}, groupClipArea) : groupClipArea;
					if (!segClip) return;
					contents[1].forEach((drawConfig) => {
						bodyContainer.add(Object.assign({}, drawConfig), offsetX, offsetY, segClip);
					});
				});
			}
			if (!(() => {
				var groups = this.collector.dataUtil.getGroups();
				var groupId = groups === null || groups === void 0 ? void 0 : groups.groupIds[groupIndex];
				var ids = groupId !== void 0 ? groups === null || groups === void 0 ? void 0 : groups.groupRecordIds.get(groupId) : void 0;
				return !!ids && ids.length > 0;
			})()) this.renderEmptyTip(bodyContainer, groupHeadInfo.containerRect, offsetX, bodyStartY);
		};
		/**
		* 绘制分组头部区域的背景（head layer 上半段圆角）。
		* head-layer 和 body-layer 是两个独立的 Canvas，因此需要在各自 layer 中分别绘制背景拼接。
		*/ _proto.renderGroupHeadBackground = function renderGroupHeadBackground(headContainer, groupIndex) {
			var headInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!headInfo) return;
			var { size, range } = this.collector;
			var headBg = pen.config.rect({
				x: headInfo.containerRect.x - range.scrollLeft,
				y: size.globalPaddingTop,
				width: headInfo.containerRect.width,
				height: size.headHeight,
				background: headInfo.background,
				borderRadius: [
					size.groupBgRadius,
					size.groupBgRadius,
					0,
					0
				],
				borderWidth: 0
			});
			headContainer.add(headBg);
		};
		/**
		* 绘制分组 body 区域的背景（body layer 下半段圆角）。
		*
		* 高度策略由 `KanbanTodoConfig.group.bodyBackgroundHeightMode` 决定：
		* - 'fill'：始终撑满可视区，分组之间底边对齐（空分组也撑满）
		* - 'fit' ：取卡片总高度与可视区高度的较小值；空分组退化为「暂无事项」提示所需最小高度
		*/ _proto.renderGroupBodyBackground = function renderGroupBodyBackground(bodyContainer, groupIndex) {
			var headInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!headInfo) return;
			var { size, range } = this.collector;
			var contentTotalHeight = range.getGroupTotalHeight(groupIndex);
			var bgBottomPadding = size.groupBodyPaddingBottom;
			var bodyBgHeight;
			if (KanbanTodoConfig.group.bodyBackgroundHeightMode === "fill") bodyBgHeight = size.groupCardVisibleHeight + bgBottomPadding;
			else if (contentTotalHeight <= 0) {
				var emptyTipBgHeight = size.groupBodyPaddingTop + size.emptyTipHeight + size.groupBodyPaddingBottom;
				bodyBgHeight = Math.min(emptyTipBgHeight, size.groupCardVisibleHeight + bgBottomPadding);
			} else bodyBgHeight = Math.min(contentTotalHeight + bgBottomPadding, size.groupCardVisibleHeight + bgBottomPadding);
			var bodyBg = pen.config.rect({
				x: headInfo.containerRect.x - range.scrollLeft,
				y: 0,
				width: headInfo.containerRect.width,
				height: bodyBgHeight,
				background: headInfo.background,
				borderRadius: [
					0,
					0,
					size.groupBgRadius,
					size.groupBgRadius
				],
				borderWidth: 0
			});
			bodyContainer.add(bodyBg);
		};
		_proto.renderEmptyTip = function renderEmptyTip(bodyContainer, containerRect, offsetX, bodyStartY) {
			var { size } = this.collector;
			var tipRect = {
				x: containerRect.x,
				y: bodyStartY + size.bottomRowGap,
				width: containerRect.width,
				height: size.emptyTipHeight
			};
			bodyContainer.add(pen.config.text(Object.assign(Object.assign({ text: i18n.t("暂无事项") }, tipRect), {
				color: style.color.lightFontColor,
				align: "center",
				wrap: "none",
				verticalAlign: "top"
			})), offsetX);
		};
		/**
		* 在分组 body 底部绘制「可继续向下滚动」的渐变提示蒙层。
		*
		* 视觉契约：
		* - 仅当分组内容比可视区高且尚未滚到底时显示（已在底部 / 不可滚则不绘制，零视觉负担）；
		* - 渐变方向：top → bottom = `transparent` → 分组底色（`headInfo.background`），
		*   被裁切的卡片底部会「淡入到分组底色」，自然暗示下方还有内容；
		* - 蒙层贴在 `bodyContainer` 坐标系底部一段（高度 = `size.bottomScrollHintHeight`），
		*   配合 `renderBody` 中已设置的 `groupClipArea`（height = `groupCardVisibleHeight`），
		*   蒙层不会越过分组背景下沿；
		* - 蒙层水平跟随 `containerRect.x - scrollLeft` 移动，与分组背景同步横向滚动。
		*
		* 选择叠在卡片之上（而非画在背景里）的原因：
		* - 背景被卡片覆盖看不见渐变；只有叠在卡片上，才能产生"卡片向下淡出"的效果。
		* - 用渐变 rect 而非阴影/Image：rect 走 lib `backgroundGradient` 路径，无额外资源加载，
		*   且 batching 自然隔离（lib RectApi 中 gradient rect 独占 batchKey）。
		*/ _proto.renderBottomScrollHint = function renderBottomScrollHint(bodyContainer, groupIndex) {
			var { size, range, head } = this.collector;
			var headInfo = head.getGroupInfo(groupIndex);
			if (!headInfo) return;
			var totalHeight = range.getGroupTotalHeight(groupIndex);
			var visibleHeight = size.groupCardVisibleHeight;
			if (totalHeight <= visibleHeight) return;
			if (range.getGroupScrollTop(groupIndex) >= totalHeight - visibleHeight - .5) return;
			var hintHeight = size.bottomScrollHintHeight;
			if (hintHeight <= 0) return;
			bodyContainer.add(pen.config.rect({
				x: headInfo.containerRect.x - range.scrollLeft,
				y: visibleHeight - hintHeight,
				width: headInfo.containerRect.width,
				height: hintHeight,
				backgroundGradient: {
					type: "linear",
					start: {
						x: 0,
						y: 0
					},
					end: {
						x: 0,
						y: 1
					},
					stops: [[0, toRgba(headInfo.background, 0)], [1, toRgba(headInfo.background, 1)]]
				},
				level: Level.L2
			}));
		};
		return MainRenderer;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/renderer/index.js
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
var KanbanTodoRenderer;
var init_renderer = __esmMin((() => {
	init_es();
	init_pen();
	init_performance();
	init_event_handler();
	init_main();
	init_base_renderer();
	KanbanTodoRenderer = /* @__PURE__ */ function(BaseRenderer) {
		"use strict";
		_inherits$6(KanbanTodoRenderer, BaseRenderer);
		function KanbanTodoRenderer(rendererModel, root) {
			var _this = BaseRenderer.call(this, root, rendererModel.collector.dataUtil.getContext()) || this;
			_this.rendererModel = rendererModel;
			_this.root = root;
			_this.isRendering = false;
			_this.collector = _this.rendererModel.collector;
			_this.headLayer = _this._register(pen.layer(_this.headLayerConfig));
			_this.bodyLayer = _this._register(pen.layer(_this.bodyLayerConfig));
			_this.featureLayer = _this._register(pen.layer(_this.featureLayerConfig));
			_this.headContainer = _this._register(pen.group(_this.headContainerConfig));
			_this.bodyContainer = _this._register(pen.group(_this.bodyContainerConfig));
			_this.headLayer.addGroup(_this.headContainer);
			_this.bodyLayer.addGroup(_this.bodyContainer);
			_this.stage.addLayer(_this.headLayer);
			_this.stage.addLayer(_this.bodyLayer);
			_this.stage.addLayer(_this.featureLayer);
			_this.mainRenderer = new MainRenderer(_this.rendererModel);
			_this._register(_this.rendererModel.onRenderModelChange(() => {
				_this.render();
			}));
			_this.eventHandler = _this._register(new KanbanTodoEventHandler(_this.stage, _this.root, _this.rendererModel));
			_this.UIEvent = _this.eventHandler.UIEvent;
			return _this;
		}
		var _proto = KanbanTodoRenderer.prototype;
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.featureLayer;
		};
		_proto.render = function render() {
			if (this.isRendering) return;
			this.isRendering = true;
			requestAnimationFrame(() => {
				var _a;
				if (((_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) !== ViewType.KANBAN) {
					this.isRendering = false;
					return;
				}
				performanceReport.common.markRenderStart();
				this.collector.card.collectVisible();
				this.renderMain();
				this.renderFeature();
				performanceReport.common.markRenderEnd(this.collector.dataUtil.getContext());
				this.isRendering = false;
			});
		};
		_proto.renderMain = function renderMain() {
			this.headContainer.clear();
			this.bodyContainer.clear();
			this.mainRenderer.render(this.headContainer, this.bodyContainer);
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
		_proto.renderGroupHead = function renderGroupHead(headContainer, groupIndex, x, y) {
			this.mainRenderer.renderHead(headContainer, groupIndex, x, y);
		};
		_proto.renderGroupBody = function renderGroupBody(bodyContainer, groupIndex, x, headY, bodyY) {
			this.mainRenderer.renderBody(bodyContainer, groupIndex, x, headY, bodyY);
		};
		_proto.getTarget = function getTarget(x, y) {
			return this.eventHandler.getTarget({
				x,
				y
			});
		};
		_create_class$2(KanbanTodoRenderer, [
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
						height: size.headRect.height * scale
					};
				}
			},
			{
				key: "headContainerConfig",
				get: function() {
					return Object.assign(Object.assign({}, this.collector.size.headRect), { batch: true });
				}
			},
			{
				key: "bodyLayerConfig",
				get: function() {
					var { size } = this.collector;
					var { scale } = size;
					return {
						id: "body-layer",
						scale,
						x: 0,
						y: size.headRect.height * scale - 1,
						width: size.globalOriginRootWidth,
						height: size.bodyRect.height * scale + 1
					};
				}
			},
			{
				key: "bodyContainerConfig",
				get: function() {
					return Object.assign(Object.assign({}, this.collector.size.bodyRect), {
						y: 0,
						batch: true
					});
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
		return KanbanTodoRenderer;
	}(BaseRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/collector/data-util.js
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
/**
* 从分组单元格中取标题文本（用于匹配 groupBys[xxx].groupKeys[].matchValue）。
*
* 独立的纯函数，便于复用（normalize 与 head 渲染逻辑共用同一套语义）。
*
* 注意：对 placeholder 分组，单独传入 groupId 即可从 id 反解 matchValue，
* 兼容上游 core 层 groupValues 被重建 / 拦截导致 set 进去的 cell.data 丢失的情况。
*/ function getGroupTitleText(groupValue, groupId) {
	var _a, _b;
	if (groupId !== void 0) {
		var placeholderMatchValue = parsePlaceholderTitle(groupId);
		if (placeholderMatchValue !== void 0) return placeholderMatchValue;
	}
	if (!groupValue) return "";
	var first = (_a = groupValue.data) === null || _a === void 0 ? void 0 : _a[0];
	if (!first) return "";
	return (_b = first.text) !== null && _b !== void 0 ? _b : "";
}
/**
* 如果是 placeholder id，从中反解出 matchValue；否则返回 undefined。
*
* 函数名保持 parsePlaceholderTitle 以减少调用方传染，但反解出的字符串语义为 "matchValue"，
* 与 groupBys[xxx].groupKeys[].matchValue 对齐，供 head 渲染时反查 keyConf。
*/ function parsePlaceholderTitle(groupId) {
	if (typeof groupId !== "string") return;
	if (!groupId.startsWith(PLACEHOLDER_PREFIX)) return;
	return groupId.slice(PLACEHOLDER_PREFIX.length);
}
/**
* 用现有数据建立 matchValue → groupId 索引。
*/ function buildMatchValueIndex(groupIds, groupValues) {
	var matchValueToGroupId = /* @__PURE__ */ new Map();
	for (var groupId of groupIds) {
		var text = getGroupTitleText(groupValues.get(groupId), groupId);
		if (text && !matchValueToGroupId.has(text)) matchValueToGroupId.set(text, groupId);
	}
	return matchValueToGroupId;
}
/**
* 缺失分组使用稳定的 placeholder id，避免与真实 GroupKey 碰撞。
*/ function makePlaceholderId(matchValue) {
	return `${PLACEHOLDER_PREFIX}${matchValue}`;
}
/**
* 给缺失分组补齐兜底 groupValue 与空 recordIds。
*
* 适用于两类情况，处理方式一致：
* - placeholder GroupKey（关联表/字段层都查不到对应值）；
* - 反查到的真实 GroupKey 但当前表没有 record 命中（典型：LINK_RECORD 关联表里"暂停"
*   那行没有任何记录关联到，super.getGroups() 不会给出该 recordId 的 groupValue）。
*
* 两种情况下，head 渲染都需要从 groupValues 拿到标题文本 = matchValue。
*/ function fillMissingGroup(groupId, matchValue, fieldType, groupValues, groupRecordIds) {
	if (!groupValues.has(groupId)) {
		var emptyCell = {
			sourceType: fieldType,
			data: [{ text: matchValue }]
		};
		groupValues.set(groupId, emptyCell);
	}
	if (!groupRecordIds.has(groupId)) groupRecordIds.set(groupId, []);
}
var DataUtil, PLACEHOLDER_PREFIX;
var init_data_util = __esmMin((() => {
	init_es();
	init_es$1();
	init_data_util$1();
	init_wb_config();
	DataUtil = /* @__PURE__ */ function(KanbanDataUtil) {
		"use strict";
		_inherits$5(DataUtil, KanbanDataUtil);
		function DataUtil() {
			var _this = KanbanDataUtil.apply(this, arguments) || this;
			_this.normalized = false;
			return _this;
		}
		var _proto = DataUtil.prototype;
		_proto.patch = function patch() {
			KanbanDataUtil.prototype.patch.call(this);
			this.normalized = false;
			this.activeGroupByConfig = void 0;
			this.normalizeGroupsByConfig();
		};
		_proto.getGroups = function getGroups() {
			var groups = KanbanDataUtil.prototype.getGroups.call(this);
			if (groups && !this.normalized) this.normalizeGroupsByConfig();
			return groups;
		};
		/**
		* 当前生效的特殊 groupBy 配置；未命中（普通分组）为 undefined。
		* 在 normalize 阶段一次性算出并缓存，size / head 共享。
		*/ _proto.getActiveGroupByConfig = function getActiveGroupByConfig() {
			this.getGroups();
			return this.activeGroupByConfig;
		};
		/**
		* 判断给定 GroupKey 是否为本视图自造的 placeholder（关联表/字段层都查不到 matchValue 的兜底）。
		*
		* placeholder 仅用于渲染补齐（在配置里列出但实际数据缺失的分组列），不能下发给 core 的
		* moveGroupRecord —— 否则 cellvalue 会被写成 `__todo_placeholder__:xxx`，造成脏数据。
		* 调用方（card-move）在发起移动前调用本方法，命中就提示并中止。
		*/ _proto.isVirtualGroupKey = function isVirtualGroupKey(groupKey) {
			return parsePlaceholderTitle(groupKey) !== void 0;
		};
		/**
		* 按命中的 groupBys[xxx].groupKeys 顺序重排 / 补齐分组数据。
		*
		* 注意：原地修改 `getGroups()` 返回对象的 groupIds / groupValues / groupRecordIds，
		* 因为下游 collector 都引用同一份对象。
		*/ _proto.normalizeGroupsByConfig = function normalizeGroupsByConfig() {
			this.normalized = true;
			this.activeGroupByConfig = void 0;
			var groups = KanbanDataUtil.prototype.getGroups.call(this);
			if (!groups) return;
			var groupField = this.getFieldByFieldId(this.getGroupFieldId());
			if (!groupField) return;
			var fieldTitle = groupField.getTitle();
			var groupByConfig = WbSharedConfig.head.groupBys[fieldTitle];
			if (groupByConfig && groupByConfig.groupKeys.length > 0) {
				var matchValues = groupByConfig.groupKeys.map((keyConf) => keyConf.matchValue);
				this.reorderAndFillGroups(groups, groupField, matchValues);
				this.activeGroupByConfig = groupByConfig;
				return;
			}
			if (fieldTitle === "sys_source") {
				this.filterAndFillSourceGroups(groups, groupField);
				return;
			}
		};
		/**
		* 按 matchValues 顺序对 groups 原地重排 + 缺失分组补齐（不做过滤）。
		*
		* 用于「命中 head.groupBys 特殊配置」路径：配置里声明了几项，视图就要展示几项，
		* 配置外的分组保留在末尾（不丢数据）。
		*/ _proto.reorderAndFillGroups = function reorderAndFillGroups(groups, groupField, matchValues) {
			var { groupIds, groupValues, groupRecordIds } = groups;
			var matchValueToGroupId = buildMatchValueIndex(groupIds, groupValues);
			var orderedIds = this.buildOrderedGroupIds(matchValues, groupIds, groupValues, groupRecordIds, matchValueToGroupId, groupField.getType());
			groupIds.length = 0;
			slicePush(groupIds, orderedIds);
		};
		/**
		* sys_source 分组专属规范化：白名单固定置顶 + 补齐；白名单外过滤掉空分组。
		*
		* 结果顺序：
		*   1. WB_SOURCE_DEFAULT_VISIBLE_VALUES 按声明顺序（`manual`, `handoff`），
		*      有数据用真实 GroupKey，无数据用真实 GroupKey（反查关联表 / SELECT 全集）
		*      或 placeholder 兜底；
		*   2. 白名单外分组：仅保留 groupRecordIds 非空的（有数据的）真实分组，按原顺序追加。
		*/ _proto.filterAndFillSourceGroups = function filterAndFillSourceGroups(groups, groupField) {
			var { groupIds, groupValues, groupRecordIds } = groups;
			var matchValueToGroupId = buildMatchValueIndex(groupIds, groupValues);
			var fieldType = groupField.getType();
			var orderedIds = [];
			var usedIds = /* @__PURE__ */ new Set();
			for (var matchValue of WB_SOURCE_DEFAULT_VISIBLE_VALUES) {
				var existedId = matchValueToGroupId.get(matchValue);
				if (existedId !== void 0) {
					orderedIds.push(existedId);
					usedIds.add(existedId);
					continue;
				}
				var realGroupId = this.lookupRealGroupKeyByMatchValue(matchValue);
				var targetId = realGroupId !== null && realGroupId !== void 0 ? realGroupId : makePlaceholderId(matchValue);
				orderedIds.push(targetId);
				usedIds.add(targetId);
				fillMissingGroup(targetId, matchValue, fieldType, groupValues, groupRecordIds);
			}
			for (var groupId of groupIds) {
				if (usedIds.has(groupId)) continue;
				var records = groupRecordIds.get(groupId);
				if (records && records.length > 0) orderedIds.push(groupId);
			}
			groupIds.length = 0;
			slicePush(groupIds, orderedIds);
		};
		/**
		* 按 matchValues 顺序生成新的 groupIds，并对缺失分组补齐空 groupValue / 空 recordIds。
		*
		* 缺失分组的填充策略（优先用真实 GroupKey，反查失败才退回 placeholder）：
		* 1) 当前数据里已有该 matchValue 的 GroupKey → 直接复用；
		* 2) 否则按 matchValue 反查真实 GroupKey（LINK_RECORD 查关联表 record、SELECT 查 option…）
		*    - 命中 → 用真实 GroupKey，并给 groupValues 写一份以 matchValue 为 text 的兜底 cell
		*      （关联表 record 在当前表没有 cell，head 渲染需要靠这份兜底拿到标题）；
		*    - 没命中 → 用 `__todo_placeholder__:<matchValue>` 占位（关联表里也确实没有这行，
		*      或字段类型反查能力不可用），head 仍能从 id 反解出标题，移动行为会在 core 校验失败；
		* 3) matchValues 列表外的分组追加在末尾，避免数据丢失。
		*
		* 这样下游（card-move / head / persist）拿到的绝大多数情况下都是真实 GroupKey，
		* 不再需要"渲染用 placeholder、移动时再反查"的分裂。
		*/ _proto.buildOrderedGroupIds = function buildOrderedGroupIds(matchValues, groupIds, groupValues, groupRecordIds, matchValueToGroupId, fieldType) {
			var orderedIds = [];
			var usedIds = /* @__PURE__ */ new Set();
			for (var matchValue of matchValues) {
				var existedId = matchValueToGroupId.get(matchValue);
				if (existedId !== void 0) {
					orderedIds.push(existedId);
					usedIds.add(existedId);
					continue;
				}
				var realGroupId = this.lookupRealGroupKeyByMatchValue(matchValue);
				var targetId = realGroupId !== null && realGroupId !== void 0 ? realGroupId : makePlaceholderId(matchValue);
				orderedIds.push(targetId);
				usedIds.add(targetId);
				fillMissingGroup(targetId, matchValue, fieldType, groupValues, groupRecordIds);
			}
			for (var groupId of groupIds) if (!usedIds.has(groupId)) orderedIds.push(groupId);
			return orderedIds;
		};
		/**
		* 按 matchValue 在分组列对应数据源中反查真实 GroupKey；找不到返回 undefined。
		*
		* 用途：`buildOrderedGroupIds` 收集阶段把"配置里存在但数据中没 record 命中"的分组
		* 直接以真实 GroupKey（而非 placeholder）落入 groupIds，保证下游 card-move /
		* head / persist 拿到的就是 core 层认识的 GroupKey，无需运行时再做一次还原。
		*
		* 反查策略（按分组列类型分支，因为不同类型的 GroupKey 语义不同）：
		* - 分组列是 LINK_RECORD：GroupKey === 关联表 recordId，从关联表的 primary 字段按
		*   cell.text 等于 matchValue 反查 recordId（关联表所有 record 都是候选，无论当前
		*   表是否 link 到它）；
		* - 其他可分组列（SELECT / USER 等）：GroupKey 作为字段维度的 id（option id /
		*   user id），即便当前表没有 record 落在该 GroupKey 下，字段层 `getGroups` 也会把
		*   全集 id 返回（select 走 IFieldGroups 的 valueAdapter，由 field 提供全 option）。
		*   按 matchValue 在全量 groupValues 中找文本匹配。
		*/ _proto.lookupRealGroupKeyByMatchValue = function lookupRealGroupKeyByMatchValue(matchValue) {
			var _a, _b, _c, _d, _e;
			var groupField = this.getFieldByFieldId(this.getGroupFieldId());
			if (!groupField) return;
			if (isLinkField(groupField)) {
				var linkTable = groupField.getLinkTableModel();
				if (!linkTable) return;
				var primaryFieldId = linkTable.getPrimaryFieldId();
				var primaryField = linkTable.getFieldByFieldId(primaryFieldId);
				if (!primaryField) return;
				for (var recordId of linkTable.getRecordIdList()) if (((_d = (_c = (_b = (_a = primaryField.getStandardCell(recordId)) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : "") === matchValue) return recordId;
				return;
			}
			var fullGroups = (_e = this.getCurrentView()) === null || _e === void 0 ? void 0 : _e.getGroups();
			if (!fullGroups) return;
			for (var realGroupId of fullGroups.groupIds) {
				if (realGroupId === null || parsePlaceholderTitle(realGroupId) !== void 0) continue;
				if (getGroupTitleText(fullGroups.groupValues.get(realGroupId), realGroupId) === matchValue) return realGroupId;
			}
		};
		return DataUtil;
	}(DataUtil$1);
	PLACEHOLDER_PREFIX = "__todo_placeholder__:";
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/collector/head.js
/**
* 为「命中 head.groupBys 但 matchValue 未在配置中声明」的分组构造一份降级 KeyConf。
* 仅展示原始 text 文本与默认配色，保证 head 始终为「每个 groupId」都产出 GroupInfo，
* 与下游 range/card/size 共用的「groupIndex === dataUtil 原始下标」假设保持一致。
*/ function buildFallbackKeyConf(text) {
	return {
		title: text || "",
		matchValue: text || "",
		icon: "",
		color: style.color.lightFontColor,
		background: wbColors.groupBgDefault
	};
}
var HeadCollector;
var init_head = __esmMin((() => {
	init_es();
	init_es$1();
	init_pen();
	init_style();
	init_data_util();
	init_color();
	init_icon();
	init_group_key_config();
	init_group_value_rich();
	init_wb_config();
	HeadCollector = /* @__PURE__ */ function() {
		"use strict";
		function HeadCollector(dataUtil, state, size) {
			this.dataUtil = dataUtil;
			this.state = state;
			this.size = size;
			this.groupInfos = /* @__PURE__ */ new Map();
		}
		var _proto = HeadCollector.prototype;
		_proto.collect = function collect() {
			this.groupInfos.clear();
			this.collectGroupInfos();
		};
		_proto.patch = function patch(_mutations) {
			this.collect();
		};
		_proto.getGroupInfo = function getGroupInfo(groupIndex) {
			return this.groupInfos.get(groupIndex);
		};
		_proto.getGroupInfos = function getGroupInfos() {
			return this.groupInfos;
		};
		_proto.getGroupCount = function getGroupCount() {
			return this.groupInfos.size;
		};
		_proto.collectGroupInfos = function collectGroupInfos() {
			var _a, _b;
			var groups = this.dataUtil.getGroups();
			var groupField = this.dataUtil.getFieldByFieldId(this.dataUtil.getGroupFieldId());
			if (!groupField || !groups) return;
			var { groupIds, groupValues, groupRecordIds } = groups;
			var activeConfig = this.dataUtil.getActiveGroupByConfig();
			var xCursor = this.size.globalPaddingLeft;
			var groupWidth = this.size.cardWidth;
			if (activeConfig) {
				var matchValueToConf = /* @__PURE__ */ new Map();
				for (var keyConf of activeConfig.groupKeys) matchValueToConf.set(keyConf.matchValue, keyConf);
				for (var index = 0; index < groupIds.length; index++) {
					var groupId = groupIds[index];
					var groupValue = groupValues.get(groupId);
					var recordIds = groupRecordIds.get(groupId);
					var counts = (_a = recordIds === null || recordIds === void 0 ? void 0 : recordIds.length) !== null && _a !== void 0 ? _a : 0;
					var rawText = getGroupTitleText(groupValue, groupId);
					var text = applyGroupTextMap(groupField, rawText);
					var keyConf1 = (_b = matchValueToConf.get(text)) !== null && _b !== void 0 ? _b : buildFallbackKeyConf(text);
					var showAddBtn = shouldShowGroupAddButton(groupField, rawText);
					var info = this.collectSingleGroupByConfig(index, groupId, keyConf1, counts, xCursor, groupWidth, void 0, showAddBtn);
					if (info) this.groupInfos.set(index, info);
					xCursor += groupWidth + this.size.groupGap;
				}
				return;
			}
			for (var index1 = 0; index1 < groupIds.length; index1++) {
				var groupId1 = groupIds[index1];
				var groupValue1 = groupValues.get(groupId1);
				var recordIds1 = groupRecordIds.get(groupId1);
				if (groupValue1 === void 0 || !recordIds1) continue;
				var rawText1 = getGroupTitleText(groupValue1, groupId1);
				var { text: titleText, isEmpty: isEmptyGroup } = resolveGroupHeadTitle(groupField, applyGroupTextMap(groupField, rawText1));
				var showAddBtn1 = shouldShowGroupAddButton(groupField, rawText1);
				var info1 = this.collectSingleGroupByConfig(index1, groupId1, void 0, recordIds1.length, xCursor, groupWidth, titleText, showAddBtn1, groupValue1 !== null && groupValue1 !== void 0 ? groupValue1 : void 0, groupField, isEmptyGroup);
				if (info1) this.groupInfos.set(index1, info1);
				xCursor += groupWidth + this.size.groupGap;
			}
		};
		/**
		* 单分组头收集：被「命中 activeConfig」与「普通分组」两条分支共用。
		*
		* 设计要点（与 grid-list 普通分组头一致的渲染规则）：
		* - 命中 keyConf：标题文案使用 `keyConf.title`，背景使用 `keyConf.background`，并在标题左侧
		*   收集 keyConf 的装饰段（icon / 圆点）；
		* - 未命中 keyConf（普通分组分支）：调用方传 `keyConf=undefined` + `titleOverride=<分组值文本>`，
		*   此时不画装饰段、背景回退到 `wbColors.groupBgDefault`，标题左对齐到 headPaddingX。
		*   若同时传入 `richValueCell + richField`，普通分支会先尝试走「富渲染」——由 shared 层
		*   `collectRichGroupValue` 产出与 content 单元格 1:1 的 tag pill / 头像 / 圆点 / 图片
		*   / 日期等 DrawConfig；富渲染成功则跳过 titleOverride 纯文本；失败/为空回落到 titleOverride。
		*
		* @param showAddBtn 是否渲染「+ 新增」按钮。默认 true；业务规则（例如按 sys_source 分组时
		*   只有 'manual' 分组允许新增）由调用方通过 `shouldShowGroupAddButton` 计算后传入。
		*   false 时非批量分支只画「更多(三点)」按钮，跳过 add 图标与 groupAddRect，
		*   下游 hover / 命中层因 `groupAddRect === undefined` 自动不响应点击，无需额外改动。
		* @param richValueCell 富渲染分组单元格。仅在 `keyConf === undefined` 分支生效；
		*   为空或 data 为空时自动回落到 titleOverride 纯文本。
		* @param richField    富渲染字段（配合 richValueCell 使用）。
		* @param isEmpty      是否为「空分组」兜底文案（"{列名}: 空"）。为 true 时标题切成
		*   不加粗 + `lightUltraFontColor` 浅色，与 grid-list / grid 视图空分组视觉规则一致。
		*   仅当命中"普通分组分支"（keyConf === undefined）且未走富渲染时才会体现；命中
		*   keyConf 时标题走 keyConf.title，与空态兜底无关。
		*/ _proto.collectSingleGroupByConfig = function collectSingleGroupByConfig(groupIndex, groupId, keyConf, counts, x, width, titleOverride, showAddBtn = true, richValueCell, richField, isEmpty = false) {
			var _a, _b, _c, _d;
			var { headHeight } = this.size;
			var contents = [];
			var background = (_a = keyConf === null || keyConf === void 0 ? void 0 : keyConf.background) !== null && _a !== void 0 ? _a : wbColors.groupBgDefault;
			var titleText = (_b = titleOverride !== null && titleOverride !== void 0 ? titleOverride : keyConf === null || keyConf === void 0 ? void 0 : keyConf.title) !== null && _b !== void 0 ? _b : "";
			var containerRect = {
				x,
				y: this.size.globalPaddingTop,
				width,
				height: this.size.groupCardVisibleEndY - this.size.globalPaddingTop
			};
			var headRect = {
				x,
				y: this.size.globalPaddingTop,
				width,
				height: headHeight
			};
			var iconCenterY = headRect.y + headHeight / 2;
			var decorationWidth = 0;
			if (keyConf) {
				var decoration = collectGroupKeyDecoration({
					keyConf,
					startX: headRect.x + this.size.headPaddingX,
					centerY: iconCenterY,
					iconSize: 22,
					dotSize: this.size.headDotSize,
					trailingGap: this.size.headTitleGap
				});
				contents.push(...decoration.configs);
				decorationWidth = decoration.width;
			}
			var leftCursor = headRect.x + this.size.headPaddingX + decorationWidth;
			var trailingButtonsWidth = this.size.headMoreBtnSize + this.size.headMoreAddGap + this.size.headAddBtnSize;
			var richValueWidth = 0;
			if (!keyConf && richField && richValueCell && ((_d = (_c = richValueCell.data) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0) {
				var availableWidth = Math.max(0, width - (leftCursor - headRect.x) - trailingButtonsWidth - this.size.headPaddingX * 2);
				if (availableWidth > 0) {
					var contentHeight = style.size.tagLarge + style.size.borderWidth * 2;
					var { configs: richConfigs, width: richWidth } = collectRichGroupValue(richValueCell, richField, {
						x: leftCursor,
						y: headRect.y + (headHeight - contentHeight) / 2,
						width: availableWidth,
						height: contentHeight
					}, ViewType$1.KANBAN);
					if (richConfigs.length) {
						contents.push(...richConfigs);
						richValueWidth = richWidth;
					}
				}
			}
			var titleMeasured = 0;
			if (richValueWidth === 0) {
				var titleWidth = Math.max(0, width - (leftCursor - headRect.x) - trailingButtonsWidth - this.size.headPaddingX * 2);
				var titleFontSize = isEmpty ? this.size.headEmptyTitleFontSize : this.size.headTitleFontSize;
				var titleConfig = pen.config.text({
					text: titleText,
					x: leftCursor,
					y: headRect.y,
					width: titleWidth,
					height: headHeight,
					fontSize: titleFontSize,
					fontStyle: isEmpty ? "" : "600",
					color: isEmpty ? style.color.lightUltraFontColor : style.color.normalFontColor,
					wrap: "none",
					ellipsis: true
				});
				contents.push(titleConfig);
				titleMeasured = Math.min(pen.util.measureTextWidth(titleText, titleFontSize), titleWidth);
			}
			var countX = leftCursor + (richValueWidth > 0 ? richValueWidth : titleMeasured) + this.size.headCountGap;
			var countText = String(counts);
			var countWidth = pen.util.measureTextWidth(countText, this.size.headCountFontSize);
			contents.push(pen.config.text({
				text: countText,
				x: countX,
				y: headRect.y,
				width: countWidth + 4,
				height: headHeight,
				fontSize: this.size.headCountFontSize,
				color: style.color.lightFontColor,
				wrap: "none",
				ellipsis: true
			}));
			var groupAddRect;
			var groupMoreRect;
			var selectAllRect;
			var isAllSelected;
			if (this.state.isGroupInBatchMode(groupIndex)) {
				isAllSelected = this.state.isGroupAllSelected(groupIndex);
				var selectAllText = isAllSelected ? i18n.t("取消全选") : i18n.t("全选");
				var fontSize = this.size.headSelectAllFontSize;
				var btnWidth = pen.util.measureTextWidth(selectAllText, fontSize) + 4;
				selectAllRect = {
					x: headRect.x + width - this.size.headPaddingX - btnWidth,
					y: headRect.y,
					width: btnWidth,
					height: headHeight
				};
				contents.push(pen.config.text(Object.assign(Object.assign({ text: selectAllText }, selectAllRect), {
					fontSize,
					fontStyle: "500",
					color: wbColors.cardActiveBorder,
					wrap: "none",
					ellipsis: true,
					align: "right"
				})));
			} else {
				var addBtnSize = this.size.headAddBtnSize;
				var moreBtnSize = this.size.headMoreBtnSize;
				var rightEdge = headRect.x + width - this.size.headPaddingX;
				if (showAddBtn) {
					groupAddRect = {
						x: rightEdge - addBtnSize,
						y: iconCenterY - addBtnSize / 2,
						width: addBtnSize,
						height: addBtnSize
					};
					groupMoreRect = {
						x: groupAddRect.x - this.size.headMoreAddGap - moreBtnSize,
						y: iconCenterY - moreBtnSize / 2,
						width: moreBtnSize,
						height: moreBtnSize
					};
				} else groupMoreRect = {
					x: rightEdge - moreBtnSize,
					y: iconCenterY - moreBtnSize / 2,
					width: moreBtnSize,
					height: moreBtnSize
				};
				var moreIconSize = groupMoreRect.width * .7;
				var moreIconRect = {
					x: groupMoreRect.x + (groupMoreRect.width - moreIconSize) / 2,
					y: groupMoreRect.y + (groupMoreRect.height - moreIconSize) / 2,
					width: moreIconSize,
					height: moreIconSize
				};
				contents.push(pen.config.icon(toThemedKanbanTodoIconAlias(KanbanTodoIconAlias.GROUP_MORE), moreIconRect));
				if (groupAddRect) {
					var iconSize = groupAddRect.width * .5;
					var iconRect = {
						x: groupAddRect.x + (groupAddRect.width - iconSize) / 2,
						y: groupAddRect.y + (groupAddRect.height - iconSize) / 2,
						width: iconSize,
						height: iconSize
					};
					contents.push(pen.config.icon(toThemedKanbanTodoIconAlias(KanbanTodoIconAlias.GROUP_ADD), iconRect));
				}
			}
			return {
				counts,
				fold: false,
				rect: headRect,
				contents,
				groupId,
				containerRect,
				background,
				groupAddRect,
				groupMoreRect,
				selectAllRect,
				isAllSelected,
				titleKey: keyConf === null || keyConf === void 0 ? void 0 : keyConf.title
			};
		};
		return HeadCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/collector/size.js
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
	init_size$1();
	SizeCollector = /* @__PURE__ */ function(BaseSizeCollector) {
		"use strict";
		_inherits$4(SizeCollector, BaseSizeCollector);
		function SizeCollector(dataUtil) {
			var _this = BaseSizeCollector.call(this, dataUtil) || this;
			_this.dataUtil = dataUtil;
			/** 根容器内左右内边距 */ _this.globalPaddingX = 16;
			/** 分组之间的横向间距 */ _this.groupGap = 15;
			/** 分组容器圆角 */ _this.groupBgRadius = 12;
			/** 分组容器与可视区域顶部的距离 */ _this.groupOffsetTop = 12;
			_this.headHeight = 44;
			/** 分组头部左右内边距 */ _this.headPaddingX = 12;
			/** 头部 icon / 实心圆尺寸 */ _this.headIconSize = 16;
			/** 无 icon 时实心圆直径 */ _this.headDotSize = 10;
			/** 头部 icon/圆 与 title 间距 */ _this.headTitleGap = 8;
			/** title 字号 */ _this.headTitleFontSize = 14;
			/**
			* 空分组标题字号（"{列名}: 空" 兜底文案专用，与 grid-list headEmptyTitleFontSize 对齐）。
			* 视觉上比正常分组标题小一号，配合 `lightUltraFontColor` 呈弱化态。
			*/ _this.headEmptyTitleFontSize = 14;
			/** 数量字号 */ _this.headCountFontSize = 12;
			/** title 与 count 间距（与 grid-list headCountGap 对齐） */ _this.headCountGap = 15;
			/** 添加按钮尺寸 */ _this.headAddBtnSize = 20;
			/** 「更多」三点按钮尺寸（与添加按钮等高，便于在头部并排居中） */ _this.headMoreBtnSize = 20;
			/** 「更多」按钮与「添加」按钮的横向间距 */ _this.headMoreAddGap = 4;
			/** 菜单整体宽度 */ _this.groupMenuWidth = 160;
			/** 菜单顶部与触发器（三点按钮）底边的距离；留出一点空隙，避免鼠标从按钮往下微动时立刻扫入 panel 触发关闭 */ _this.groupMenuTopGap = 8;
			/** 菜单内边距（上下） */ _this.groupMenuPaddingY = 4;
			/** 菜单单项高度 */ _this.groupMenuItemHeight = 32;
			/** 菜单单项左右内边距 */ _this.groupMenuItemPaddingX = 12;
			/** 菜单字号 */ _this.groupMenuItemFontSize = 13;
			/** 菜单圆角 */ _this.groupMenuRadius = 8;
			/** 菜单阴影模糊半径 */ _this.groupMenuShadowBlur = 16;
			/** 分组顶部内边距（header 下方到第一张卡片） */ _this.groupBodyPaddingTop = 12;
			/** 分组左右内边距 */ _this.groupBodyPaddingX = 12;
			/**
			* 分组底部内边距。
			*
			* 同时承担两个语义：
			* 1. 在 `groupCardVisibleEndY` 中**预扣**——让 clip / scroll 的可视区在分组背景内部
			*    天然留出这段空白，最后一张卡不会被裁；
			* 2. 在 `MainRenderer.renderGroupBodyBackground` 中**补回**到分组背景高度上——
			*    分组背景仍延伸到 `rootHeight - globalPaddingBottom`，视觉上"卡片距分组背景下沿
			*    留出 `groupBodyPaddingBottom` 间距"。
			*/ _this.groupBodyPaddingBottom = 12;
			/**
			* 分组底部「可滚动渐变提示」蒙层高度。
			*
			* 当分组内容超出可视区且尚未滚到底时，会在分组 body 底部叠一层透明 → 分组底色的纵向渐变，
			* 让被裁切的卡片底部「淡入到分组底色」，暗示下方还有内容可滚。该高度不影响布局，
			* 仅是视觉装饰；改这一个值即可整体调整渐变蒙层厚度。
			*/ _this.bottomScrollHintHeight = 28;
			/** 卡片宽度（运行时按 fixedCardWidth 赋值，初始为 0） */ _this.cardWidth = 0;
			/** 固定分组宽度：所有分组等宽，累计超过 rootWidth 时触发横滚 */ _this.fixedCardWidth = 320;
			/** 折叠态卡片宽度（todo 视图未使用，保留兼容） */ _this.cardFoldWidth = 50;
			/** 卡片上间距 */ _this.cardMarginTop = 12;
			/** 不开放添加卡片按钮 */ _this.cardAddButtonHeight = 0;
			/** 卡片封面高度（todo 复用现有封面收集） */ _this.cardCoverHeight = 120;
			/** 卡片内边距 */ _this.cardPadding = 12;
			/**
			* 卡片**底部** padding（仅作用于卡片最后一段内容到卡片底沿之间的留白）。
			*
			* 与 `cardPadding` 解耦的原因：`cardPadding` 同时承担左右内边距、各 cell rect 的横向
			* 内 padding，以及无封面时的顶部 padding；如果把底部留白也共用 `cardPadding`，调一次
			* 会牵动一片视觉。底部留白通常希望**比四周 padding 略小**——卡片底部已经有 `bottomRowGap`
			* 与上一段内容拉开（或在无 bottom 段时补齐等价间距，见 `card.ts` 末尾），再叠 12px 会显得
			* 「下沉空白过多」。本字段独立后可单独收紧而不影响其他位置。
			*
			* 仅在 `card.ts` 末尾的「底部 padding」一处生效；不参与 `option.cardPadding` 注入链路，
			* 共享 calc-card-heigth 等通用路径无感。
			*/ _this.cardPaddingBottom = 16;
			/** 卡片内部上下内容之间的间距 */ _this.cardContentGap = 8;
			/** 卡片字段标题与内容间距 */ _this.cardFieldTitleGap = 6;
			/** 卡片之间的纵向间距 */ _this.cardGap = 12;
			/** 卡片字段标题高度 */ _this.cardFieldTitleHeight = 14;
			/** 卡片主列标题高度 */ _this.cardPrimaryFieldHeight = 26;
			/** 点赞图标大小（todo 未使用，保留兼容） */ _this.cardInteractionSize = 16;
			/** 卡片圆角 */ _this.todoCardRadius = 8;
			/** hover 时的边框宽度 */ _this.hoverBorderWidth = 1;
			/** 空分组「暂无事项」提示行高 */ _this.emptyTipHeight = 30;
			/** 卡片左侧 checkbox 图标尺寸 */ _this.checkboxSize = 24;
			/** checkbox 与主列标题之间的间距 */ _this.checkboxGap = 6;
			/** 分组头「全选/取消全选」文字字号 */ _this.headSelectAllFontSize = 12;
			/** 底部行高 */ _this.bottomRowHeight = 30;
			/** 底部行与上方内容的间距 */ _this.bottomRowGap = 10;
			/** 头像直径（外环含 1px 描边 + 1px 留白，内层真实头像视觉 = 22px） */ _this.avatarSize = 26;
			/** 头像段之后的水平间距（与下一段拉开距离） */ _this.avatarStatusGap = 8;
			/** 默认头像内文字字号 */ _this.avatarTextFontSize = 12;
			/** 日期字号 */ _this.bottomDateFontSize = 12;
			/**
			* 标签行与上方内容（cellContents）之间的纵向间距。
			* 与 `cardContentGap` 同源 12px 区分开 —— tag 行视觉上更贴近上方字段值组，
			* 故略小，避免「字段值 → tag 行」之间出现过宽缝隙。
			*/ _this.tagRowGap = 8;
			/** 标签行下方与 bottom 段（status + owner + date）之间的间距。 */ _this.tagRowBottomGap = 8;
			/** 相邻 pill 之间的间距。 */ _this.tagItemGap = 8;
			/** 主列字号 */ _this.primaryFontSize = 15;
			_this.primaryPaddingBottom = 0;
			/** 折叠态头部 padding（兼容 kanban head 内 utils 使用） */ _this.headFoldPadding = 12;
			/** 全局宽度（可写 state）：按分组数累计的固定宽度总和，可超过 rootWidth 触发横滚 */ _this.$globalWidth = 0;
			return _this;
		}
		var _proto = SizeCollector.prototype;
		/**
		* 重写 collect：除了基类的 dom offset 缓存外，按当前分组数等分计算 cardWidth
		*/ _proto.collect = function collect() {
			BaseSizeCollector.prototype.collect.call(this);
			this.updateGroupWidth();
		};
		_proto.patch = function patch() {
			BaseSizeCollector.prototype.patch.call(this);
			this.updateGroupWidth();
		};
		/**
		* setGlobalWidth：实际写入 $globalWidth，供横滚场景由外部覆盖。
		* 与 kanban SizeCollector 同名以保持接口兼容。
		*/ _proto.setGlobalWidth = function setGlobalWidth(width) {
			this.$globalWidth = width;
		};
		/**
		* 统一按固定宽度布局：cardWidth = fixedCardWidth，globalWidth = 累计总宽（不小于 rootWidth）。
		* 可视区右侧空间不足时由外层滚动容器接管横向滚动。
		*/ _proto.updateGroupWidth = function updateGroupWidth() {
			var _a;
			var groups = this.dataUtil.getGroups();
			var groupCount = (_a = groups === null || groups === void 0 ? void 0 : groups.groupIds.length) !== null && _a !== void 0 ? _a : 0;
			if (groupCount <= 0) {
				this.cardWidth = 0;
				this.$globalWidth = this.rootWidth;
				return;
			}
			this.cardWidth = this.fixedCardWidth;
			var total = this.globalPaddingX * 2 + groupCount * this.fixedCardWidth + Math.max(0, groupCount - 1) * this.groupGap;
			this.$globalWidth = Math.max(total, this.rootWidth);
		};
		_create_class$1(SizeCollector, [
			{
				key: "cardBorderRadius",
				get: function() {
					return this.todoCardRadius;
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
					return 0;
				}
			},
			{
				key: "globalPaddingBottom",
				get: function() {
					return this.groupOffsetTop;
				}
			},
			{
				key: "globalWidth",
				get: function() {
					return this.$globalWidth || this.rootWidth;
				}
			},
			{
				key: "headRect",
				get: function() {
					return {
						x: 0,
						y: 0,
						width: this.rootWidth,
						height: this.groupCardVisibleStartY
					};
				}
			},
			{
				key: "bodyRect",
				get: function() {
					return {
						x: 0,
						y: this.groupCardVisibleStartY,
						width: this.rootWidth,
						height: this.rootHeight - this.groupCardVisibleStartY
					};
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
				key: "groupCardVisibleStartY",
				get: function() {
					return this.globalPaddingTop + this.headHeight;
				}
			},
			{
				key: "groupCardVisibleEndY",
				get: function() {
					return this.rootHeight - this.globalPaddingBottom - this.groupBodyPaddingBottom;
				}
			},
			{
				key: "groupCardVisibleHeight",
				get: function() {
					return this.groupCardVisibleEndY - this.groupCardVisibleStartY;
				}
			}
		]);
		return SizeCollector;
	}(BaseSizeCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/collector/state.js
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
var PARENT_TITLE_SEPARATOR, PARENT_TITLE_MAX_DEPTH, StateCenter;
var init_state = __esmMin((() => {
	init_event();
	init_es();
	init_es$1();
	init_state$1();
	init_config();
	init_avatar_time_utils();
	init_batch_selection();
	init_group_key_config();
	init_source_field();
	init_wb_cell();
	init_wb_config();
	PARENT_TITLE_SEPARATOR = " › ";
	PARENT_TITLE_MAX_DEPTH = 10;
	StateCenter = /* @__PURE__ */ function(KanbanStateCenter) {
		"use strict";
		_inherits$3(StateCenter, KanbanStateCenter);
		function StateCenter(dataUtil) {
			var _this = KanbanStateCenter.call(this, dataUtil) || this;
			_this.ownerFieldId = "";
			_this.dateFieldId = "";
			_this.bottomStatusFieldId = "";
			_this.hasOwnerField = false;
			_this.hasDateField = false;
			_this.hasBottomStatusField = false;
			/**
			* 父记录关联列 fieldId（按 `KanbanTodoConfig.parentFieldTitle` 反查）。
			* 必须为 LINK_RECORDS / TWO_WAY_LINK_RECORDS 列，命中后供 `getPrimaryTitleWithParents`
			* 沿父子链向上回溯拼接「自身 › 父 › 祖父 …」标题文本。
			*
			* 命中规则：title 完全匹配且 `isLinkField(field) === true`。
			* 不做"是否关联本表"的额外校验：当前业务约定该列就是关联本表，
			* 万一指向其它表，因为父 recordId 在本表 `getStandardCell` 取不到，
			* 会自然在 `getPrimaryTitleWithParents` 里以"父记录无标题"中止回溯，不会读到错位数据。
			*/ _this.parentFieldId = "";
			_this.hasParentField = false;
			/**
			* 卡片 body 区参与值渲染的 fieldId 列表（按 `WbSharedConfig.card.body.showFieldTitles` 顺序解析）。
			* 仅在 `buildIndex` 时刷新；尚未叠加 visible 过滤。
			*/ _this.bodyShowFieldIds = [];
			/**
			* 卡片 body 区「标签组」字段的 fieldId 列表（按 `WbSharedConfig.card.body.tagFieldTitles` 顺序解析）。
			*
			* 与 `bodyShowFieldIds` 的差异：
			* - 走独立的 `collectBodyTag`（`wb_views/shared/wb-cell`）联合渲染为标签组；
			* - 渲染时仍需 ∩ `visibleFieldIdSet`（visible 闸门）；
			* - 不识别的 fieldTitle 或数据为空的 sys_source 会在 `collectBodyTag` 内部静默跳过。
			*/ _this.bodyTagFieldIds = [];
			/**
			* sys_tags 列 fieldId 索引。sys_tags 是 MULTIPLE_SELECT 多值列，与 sys_source /
			* sys_priority 等单值 pill 的排布语义不同，采用「独立段 + `collectTagsPillsInRect`」渲染
			* （见 `card.collectSysTagsRow`），不与 `bodyTagFieldIds` 混排到 tag row。
			*
			* `hasSysTagsField=false` 表示 `tagFieldTitles` 未配置 sys_tags 或列未匹配上；
			* 卡片内 sys_tags row 段仅在 `hasSysTagsField && isFieldVisible(sysTagsFieldId) && data.length > 0`
			* 时占位（空数据不占任何高度，避免撑高卡片）。
			*/ _this.sysTagsFieldId = "";
			_this.hasSysTagsField = false;
			/**
			* sys_source（来源）字段专用索引：来源列同样以 body tag pill 形式随 `bodyTagFieldIds`
			* 渲染在卡片 body tag 段中，但它是**只读**列（不支持修改 / 编辑）。此处单独持有其 fieldId，
			* 供 hover feature 判定「命中的 pill 是否为来源列」——命中来源 pill 时 cursor 保持 DEFAULT、
			* 不叠 hover 态，点击也不 fire 带 cellRect 的 `onRecordClick`（与 grid-list 对齐）。
			*/ _this.sourceFieldId = "";
			_this.hasSourceField = false;
			/**
			* 当前 visible 字段集合的缓存（来自 `dataUtil.getVisibleFieldIds()`）。
			* 用于 `isFieldVisible` 等 O(1) 判断。
			*/ _this.visibleFieldIdSet = /* @__PURE__ */ new Set();
			/**
			* 当前「显示中」的 recordId 集合（来自 `dataUtil.getDisplayedRecordIds()`，
			* 已扣除被筛选 / 隐藏的记录）。
			*
			* 用途：父记录链回溯（`getPrimaryTitleWithParents`）时过滤掉被筛掉的父记录——
			* 业务约定：父 record 一旦不在显示集中，链路即视为断裂，不再纳入级联标题。
			*
			* 注意：与 `getDisplayedRecordIds` 一样，集合内容跟随筛选 / 隐藏 / 折叠等条件变化，
			* 因此每次 `buildIndex` 都重建（buildIndex 在每次 collect / patch 时被调用）。
			*/ _this.displayedRecordIdSet = /* @__PURE__ */ new Set();
			/** 当前激活（被选中）的卡片 recordId；'' 表示无激活 */ _this.activeRecordId = "";
			/** activeRecordId 变化的订阅源；外部通过 `onActiveRecordIdChange` 监听 */ _this.onActiveRecordIdChangeEmitter = _this._register(new Emitter());
			/** 当前打开的分组「更多」菜单状态；null 表示无菜单。 */ _this.groupMenu = null;
			/** 菜单状态变化的订阅源；外部通过 `onGroupMenuChange` 监听 */ _this.onGroupMenuChangeEmitter = _this._register(new Emitter());
			/** 跨视图共享的批量选择容器（mode + selected ids + emitter） */ _this.batch = _this._register(new BatchSelection());
			/**
			* 当前处于批量选择模式的分组下标集合；空集合表示全局批量模式（所有分组都可选）或未开启。
			*
			* 配合 `isGroupInBatchMode(groupIndex)` 使用：
			* - 从分组菜单「全选」进入时，仅目标分组进入可选态（head 显示全选/取消全选、card 显示 checkbox）；
			* - 多个分组可独立进入批量模式，互不影响；
			* - 从外部 `setBatchSelectMode(true)` 不传 groupIndex 时，所有分组都进入可选态（向后兼容）。
			*/ _this.batchGroupIndices = /* @__PURE__ */ new Set();
			/** 是否为全局批量模式（不限分组） */ _this.batchGlobal = false;
			_this._dataUtil = dataUtil;
			_this.onActiveRecordIdChange = _this.onActiveRecordIdChangeEmitter.event;
			_this.onSelectedRecordIdsChange = _this.batch.onChange;
			_this.onGroupMenuChange = _this.onGroupMenuChangeEmitter.event;
			ensureRelativeTimePlugin();
			return _this;
		}
		var _proto = StateCenter.prototype;
		/**
		* 在 collect 阶段调用，重建 title → fieldId 索引。
		*
		* 索引内容：
		* 1) bottom 区：owner / date / status 三列；
		* 2) body 区：参与值渲染的 showFieldTitles → fieldId 列表；
		* 3) visible 字段集合（来自 `dataUtil.getVisibleFieldIds()`）：上层各处 helper
		*    （`isOwnerFieldVisible` 等）会基于此做"必须可见才显示"的过滤。
		*/ _proto.buildIndex = function buildIndex() {
			var _a, _b;
			var ownerTitle = WbSharedConfig.card.bottom.ownerFieldTitle;
			var dateTitle = WbSharedConfig.card.bottom.dateFieldTitle;
			var bottomStatusTitle = WbSharedConfig.card.bottom.statusFieldTitle;
			var showFieldTitles = (_a = WbSharedConfig.card.body.showFieldTitles) !== null && _a !== void 0 ? _a : [];
			var tagFieldTitles = (_b = WbSharedConfig.card.body.tagFieldTitles) !== null && _b !== void 0 ? _b : [];
			var parentTitle = KanbanTodoConfig.parentFieldTitle;
			this.ownerFieldId = "";
			this.dateFieldId = "";
			this.bottomStatusFieldId = "";
			this.parentFieldId = "";
			this.hasOwnerField = false;
			this.hasDateField = false;
			this.hasBottomStatusField = false;
			this.hasParentField = false;
			this.bodyShowFieldIds = [];
			this.bodyTagFieldIds = [];
			this.sysTagsFieldId = "";
			this.hasSysTagsField = false;
			this.sourceFieldId = "";
			this.hasSourceField = false;
			var dataUtil = this._dataUtil;
			this.visibleFieldIdSet = new Set(dataUtil.getVisibleFieldIds());
			this.displayedRecordIdSet = new Set(dataUtil.getDisplayedRecordIds());
			if (!ownerTitle && !dateTitle && !bottomStatusTitle && !parentTitle && showFieldTitles.length === 0 && tagFieldTitles.length === 0) return;
			var showTitleToFieldId = /* @__PURE__ */ new Map();
			var tagTitleToFieldId = /* @__PURE__ */ new Map();
			for (var fieldId of dataUtil.getAllFieldIds()) {
				var field = dataUtil.getFieldByFieldId(fieldId);
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
				if (parentTitle && !this.hasParentField && title === parentTitle && isLinkField(field)) {
					this.parentFieldId = fieldId;
					this.hasParentField = true;
				}
				if (showFieldTitles.length > 0 && showFieldTitles.includes(title) && !showTitleToFieldId.has(title)) showTitleToFieldId.set(title, fieldId);
				if (tagFieldTitles.length > 0 && tagFieldTitles.includes(title) && !tagTitleToFieldId.has(title)) tagTitleToFieldId.set(title, fieldId);
			}
			this.bodyShowFieldIds = showFieldTitles.map((title) => showTitleToFieldId.get(title)).filter((id) => Boolean(id));
			this.bodyTagFieldIds = tagFieldTitles.filter((title) => title !== SYS_TAGS_FIELD_TITLE).map((title) => tagTitleToFieldId.get(title)).filter((id) => Boolean(id));
			if (tagFieldTitles.includes("sys_tags")) {
				var sysTagsId = tagTitleToFieldId.get(SYS_TAGS_FIELD_TITLE);
				if (sysTagsId) {
					this.sysTagsFieldId = sysTagsId;
					this.hasSysTagsField = true;
				}
			}
			if (tagFieldTitles.includes("sys_source")) {
				var sourceId = tagTitleToFieldId.get(WB_SOURCE_FIELD_TITLE);
				if (sourceId) {
					this.sourceFieldId = sourceId;
					this.hasSourceField = true;
				}
			}
			if (ownerTitle && !this.hasOwnerField) logger.warn("kanban-todo", `owner field not found by title: ${ownerTitle}`);
			if (dateTitle && !this.hasDateField) logger.warn("kanban-todo", `date field not found by title: ${dateTitle}`);
			if (bottomStatusTitle && !this.hasBottomStatusField) logger.warn("kanban-todo", `bottom status field not found by title: ${bottomStatusTitle}`);
			if (parentTitle && !this.hasParentField) logger.warn("kanban-todo", `parent field not found by title or not a link field: ${parentTitle}`);
			showFieldTitles.forEach((title) => {
				if (!showTitleToFieldId.has(title)) logger.warn("kanban-todo", `body show field not found by title: ${title}`);
			});
			tagFieldTitles.forEach((title) => {
				if (!tagTitleToFieldId.has(title)) logger.warn("kanban-todo", `body tag field not found by title: ${title}`);
			});
		};
		/** 指定 fieldId 当前是否在 visible 集合中（fieldId 为空时返回 false） */ _proto.isFieldVisible = function isFieldVisible(fieldId) {
			if (!fieldId) return false;
			return this.visibleFieldIdSet.has(fieldId);
		};
		/**
		* 卡片 body 区参与值渲染的 fieldId 列表，按 `showFieldTitles` 声明顺序，
		* 并已与 `dataUtil.getVisibleFieldIds()` 取交集。`collectCellContents` 应使用此结果。
		*/ _proto.getVisibleBodyShowFieldIds = function getVisibleBodyShowFieldIds() {
			return this.bodyShowFieldIds.filter((id) => this.visibleFieldIdSet.has(id));
		};
		/**
		* 卡片 body 区「标签组」字段的 fieldId 列表，按 `tagFieldTitles` 声明顺序，
		* 并已与 `dataUtil.getVisibleFieldIds()` 取交集。`collectBodyTag` 应使用此结果。
		*
		* 与 `getVisibleBodyShowFieldIds()` 解耦：tagFieldTitles 不参与 showFieldTitles 的
		* 默认值渲染循环，专供 wb-cell.collectBodyTag 联合产出标签组。
		*/ _proto.getVisibleBodyTagFieldIds = function getVisibleBodyTagFieldIds() {
			return this.bodyTagFieldIds.filter((id) => this.visibleFieldIdSet.has(id));
		};
		/** bottom 区状态文案字段是否在 visible 集合中 */ _proto.isBottomStatusFieldVisible = function isBottomStatusFieldVisible() {
			return this.hasBottomStatusField && this.isFieldVisible(this.bottomStatusFieldId);
		};
		/** bottom 区人员（owner）字段是否在 visible 集合中 */ _proto.isOwnerFieldVisible = function isOwnerFieldVisible() {
			return this.hasOwnerField && this.isFieldVisible(this.ownerFieldId);
		};
		/**
		* owner 列「是否已配置且匹配到本表字段」。
		*
		* 与 `isOwnerFieldVisible` 的区别：本方法不叠加 `dataUtil.getVisibleFieldIds()` 过滤——
		* 只要 `WbSharedConfig.card.bottom.ownerFieldTitle` 配置非空、且能反查到对应的 UserField 列，
		* 就返回 true，即便该列被用户在视图中隐藏。
		*
		* 业务用途：kanban-todo 卡片底部需要在「owner 列已配置 / 已找到，但本卡片暂无人员」时
		* 显式绘制一个空头像占位（与 grid-list 行右侧 owner 列空态对齐）；此时不能用
		* `isOwnerFieldVisible`（会把"列被隐藏"误判为"未配置"），只能用本方法。
		*/ _proto.hasOwnerFieldConfigured = function hasOwnerFieldConfigured() {
			return this.hasOwnerField;
		};
		/**
		* owner 列字段 id。未配置 owner 列时为空串。
		*
		* 与 `hasOwnerFieldConfigured()` 配对：调用前应先确认 owner 列已配置，否则拿到的是空串。
		* 供 hover feature 在 fire `onRecordClick` 时携带 fieldId，让 wb 上层定位到人员列编辑器
		* （与 grid-list 行右侧 owner 头像点击同语义）。
		*/ _proto.getOwnerFieldId = function getOwnerFieldId() {
			return this.ownerFieldId;
		};
		/** bottom 区日期字段是否在 visible 集合中 */ _proto.isDateFieldVisible = function isDateFieldVisible() {
			return this.hasDateField && this.isFieldVisible(this.dateFieldId);
		};
		/**
		* sys_tags 列是否已配置 + 命中当前 visible 集合。
		*
		* 卡片 sys_tags row 段的可见性判定：仅当本方法返回 true 且当前 record 的
		* sys_tags cell 数据非空时才占位（避免空数据撑高卡片，见 `card.collectSysTagsRow`）。
		*/ _proto.isSysTagsFieldVisible = function isSysTagsFieldVisible() {
			return this.hasSysTagsField && this.isFieldVisible(this.sysTagsFieldId);
		};
		/** sys_tags 列 fieldId（未配置 / 未命中时返回空串）。 */ _proto.getSysTagsFieldId = function getSysTagsFieldId() {
			return this.sysTagsFieldId;
		};
		/**
		* 判定 `fieldId` 是否为来源列（sys_source）。来源列只读，hover 命中其 body tag pill 时
		* cursor 应保持 DEFAULT、不叠 hover 态，点击不 fire 带 cellRect 的 `onRecordClick`
		* （不支持修改 / 编辑）。未命中来源字段时恒为 false。
		*/ _proto.isSourceFieldId = function isSourceFieldId(fieldId) {
			return this.hasSourceField && fieldId === this.sourceFieldId;
		};
		/**
		* 取 sys_tags 列在指定 record 上的 standardCell（未命中列 / cell 空时返回 undefined）。
		*
		* 调用方一般再走 `resolveTagsCellItems(cell)` 展开为 BodyTagItem[] 供
		* `collectTagsPillsInRect` 排布，无需自行解析 `cell.data`。
		*/ _proto.getSysTagsCell = function getSysTagsCell(recordId) {
			if (!this.hasSysTagsField) return;
			return this._dataUtil.getStandardCell(this.sysTagsFieldId, recordId);
		};
		/** 读取当前激活卡片 recordId（''=无激活） */ _proto.getActiveRecordId = function getActiveRecordId() {
			return this.activeRecordId;
		};
		/**
		* 设置激活卡片 recordId；同值再次写入会被去重忽略。
		* 触发后下游 feature（KanbanTodoActive）会收到通知并重绘高亮态。
		*/ _proto.setActiveRecordId = function setActiveRecordId(recordId) {
			var next = recordId || "";
			if (next === this.activeRecordId) return;
			this.activeRecordId = next;
			this.onActiveRecordIdChangeEmitter.fire(next);
		};
		/** 是否处于批量选择模式 */ _proto.isBatchSelectMode = function isBatchSelectMode() {
			return this.batch.isMode();
		};
		/**
		* 判断指定分组是否处于批量选择模式。
		*
		* 规则：
		* - 全局未开启批量模式 → false；
		* - 全局开启 + batchGlobal === true → 所有分组都处于批量模式（向后兼容）；
		* - 全局开启 + batchGroupIndices.has(groupIndex) → 该分组处于批量模式。
		*/ _proto.isGroupInBatchMode = function isGroupInBatchMode(groupIndex) {
			if (!this.batch.isMode()) return false;
			return this.batchGlobal || this.batchGroupIndices.has(groupIndex);
		};
		/** 获取当前批量选择模式绑定的分组下标（undefined=全局）——向后兼容，多分组时返回 undefined */ _proto.getBatchSelectGroupIndex = function getBatchSelectGroupIndex() {
			if (this.batchGlobal || this.batchGroupIndices.size === 0) return;
			if (this.batchGroupIndices.size === 1) return [...this.batchGroupIndices][0];
		};
		/** 判断指定分组是否在批量选择的分组集合中 */ _proto.isGroupInBatchIndices = function isGroupInBatchIndices(groupIndex) {
			return this.batchGlobal || this.batchGroupIndices.has(groupIndex);
		};
		/** 是否有任何分组级批量模式（非全局） */ _proto.hasBatchGroupIndices = function hasBatchGroupIndices() {
			return this.batchGroupIndices.size > 0;
		};
		/**
		* 进入 / 退出批量选择模式。
		* 退出时自动清空已选集合，并 fire 一次空数组通知。
		*
		* @param enable - true=进入批量模式，false=退出
		* @param groupIndex - 可选，指定仅该分组进入/退出可选态；不传则所有分组都进入/退出（向后兼容）。
		*
		* 切换前若有「分组更多菜单」处于打开状态，一并关闭：
		* 批量模式下 head 右侧画的是「全选/取消全选」文字，三点按钮被隐藏，
		* 残留的菜单浮层既无锚点又无意义，必须主动清掉。
		*/ _proto.setBatchSelectMode = function setBatchSelectMode(enable, groupIndex) {
			if (this.groupMenu !== null) this.closeGroupMenu();
			if (enable) {
				if (groupIndex !== void 0) {
					this.batchGroupIndices.add(groupIndex);
					this.batchGlobal = false;
				} else if (!this.batch.isMode()) {
					this.batchGlobal = true;
					this.batchGroupIndices.clear();
				}
				this.batch.setMode(true);
			} else if (groupIndex !== void 0) {
				this.batchGroupIndices.delete(groupIndex);
				if (this.batchGroupIndices.size === 0 && !this.batchGlobal) this.batch.setMode(false);
			} else {
				this.batchGroupIndices.clear();
				this.batchGlobal = false;
				this.batch.setMode(false);
			}
		};
		/**
		* 退出「卡片数量为 0」的分组级批量模式。
		*
		* 场景：某分组从菜单「全选」进入批量模式后，其卡片被全部移出 / 删除（数量归 0），
		* 此时分组头仍残留「全选」文字按钮，但分组内已无任何可选卡片。调用本方法把这些
		* 空分组从 `batchGroupIndices` 中剔除；若剔除后再无任何分组处于批量模式（且非全局
		* 模式），则整体退出批量模式。
		*
		* 仅处理分组级（batchGroupIndices）批量模式；全局模式（batchGlobal）语义为"所有分组
		* 可选"，不在此清理。
		*
		* @returns 是否发生了变更（调用方据此决定是否重渲染）
		*/ _proto.exitEmptyBatchGroups = function exitEmptyBatchGroups() {
			if (this.batchGroupIndices.size === 0) return false;
			var changed = false;
			for (var groupIndex of [...this.batchGroupIndices]) if (this.getGroupRecordIds(groupIndex).length === 0) {
				this.batchGroupIndices.delete(groupIndex);
				changed = true;
			}
			if (changed && this.batchGroupIndices.size === 0 && !this.batchGlobal) this.batch.setMode(false);
			return changed;
		};
		/** 某张卡片是否被选中 */ _proto.isRecordSelected = function isRecordSelected(recordId) {
			return this.batch.isSelected(recordId);
		};
		/** 获取当前选中的 recordIds 数组 */ _proto.getSelectedRecordIds = function getSelectedRecordIds() {
			return this.batch.getSelectedIds();
		};
		/** 切换单张卡片的选中状态 */ _proto.toggleRecordSelected = function toggleRecordSelected(recordId) {
			this.batch.toggle(recordId);
		};
		/**
		* 全选 / 取消全选某个分组内的所有卡片。
		*
		* ⚠️ 多值字段分组场景（USER / MULTIPLE_SELECT 等）下，同一 recordId 可能同时归属多个分组
		* （xtable-core `BaseSelectField.getGroupRecordIds` 按 cellValue 数组元素展开，一条 record
		* 有 N 个值就会被 push 到 N 个分组）。因此 select=false 时不能盲目把该分组的所有 recordIds
		* 从全局 selected 集合中删除——那样会连带取消掉「其他仍处于批量模式且已全选」的分组里的
		* 共享 record，导致其它分组的 head 从「取消全选」跳回「全选」文案。
		*
		* 处理方式：
		* - select=true：直接把该分组 recordIds 全部加入 selected（并集语义，跨分组共享 record
		*   本就要在其他分组里也保持选中态，不冲突）；
		* - select=false：仅取消「仅属于本分组、不属于其它仍处于批量模式的分组」的 recordIds；
		*   共享给其它 batchGroupIndices 分组的 record 保留在 selected，让其它分组仍显示「取消全选」。
		*
		* @param groupIndex 分组下标
		* @param select true=全选, false=取消全选
		*/ _proto.selectAllInGroup = function selectAllInGroup(groupIndex, select) {
			var recordIds = this.getGroupRecordIds(groupIndex);
			if (select) {
				this.batch.setIdsSelected(recordIds, true);
				return;
			}
			var sharedIds = this.collectRecordIdsSharedWithOtherBatchGroups(groupIndex);
			var idsToDeselect = sharedIds.size === 0 ? recordIds : recordIds.filter((id) => !sharedIds.has(id));
			this.batch.setIdsSelected(idsToDeselect, false);
		};
		/**
		* 收集「除 `excludeGroupIndex` 外，其它仍处于批量模式的分组」中的所有 recordIds，
		* 用于 `selectAllInGroup(excludeGroupIndex, false)` 判定哪些 record 因跨分组共享
		* 需要保留在 selected 中。
		*
		* - batchGlobal=true 时视为「所有分组都在批量模式」，遍历所有分组（除自身）；
		* - 否则仅遍历 batchGroupIndices 中的其它 index。
		*/ _proto.collectRecordIdsSharedWithOtherBatchGroups = function collectRecordIdsSharedWithOtherBatchGroups(excludeGroupIndex) {
			var shared = /* @__PURE__ */ new Set();
			var groups = this._dataUtil.getGroups();
			if (!groups) return shared;
			for (var idx of this.batchGlobal ? groups.groupIds.map((_, i) => i) : this.batchGroupIndices) {
				if (idx === excludeGroupIndex) continue;
				for (var id of this.getGroupRecordIds(idx)) shared.add(id);
			}
			return shared;
		};
		/** 某个分组是否全选 */ _proto.isGroupAllSelected = function isGroupAllSelected(groupIndex) {
			var recordIds = this.getGroupRecordIds(groupIndex);
			return this.batch.areAllSelected(recordIds);
		};
		/** 当前打开的分组菜单状态（null 表示无菜单） */ _proto.getGroupMenu = function getGroupMenu() {
			return this.groupMenu;
		};
		/**
		* 打开 / 切换 分组菜单。
		* - 若已经在同一 groupIndex 上打开，则关闭（toggle 语义，与「再次点击三点」直觉一致）；
		* - 若在另一分组上打开，则切换到新分组（旧菜单自动覆盖）。
		*
		* 同值（相同 groupIndex 且 anchorRect 完全相等）再次写入会被去重，避免无意义的渲染抖动。
		*/ _proto.toggleGroupMenu = function toggleGroupMenu(next) {
			var cur = this.groupMenu;
			if (cur && cur.groupIndex === next.groupIndex) {
				this.closeGroupMenu();
				return;
			}
			this.groupMenu = next;
			this.onGroupMenuChangeEmitter.fire(next);
		};
		/** 关闭分组菜单；当前已无菜单时短路。 */ _proto.closeGroupMenu = function closeGroupMenu() {
			if (this.groupMenu === null) return;
			this.groupMenu = null;
			this.onGroupMenuChangeEmitter.fire(null);
		};
		/**
		* 卡片主列展示文本：「自身主列 text › 父记录主列 text › 祖父主列 text › …」。
		*
		* 路径来源：`KanbanTodoConfig.parentFieldTitle` 命中的 LINK_RECORDS 列指向的父 recordId，
		* 顺着该链一直向上回溯，直到：
		* - 父记录列未配置 / 未命中 LINK 列 → 仅返回自身主列 text；
		* - 当前 record 的父记录列单元格为空 / `recordId` 缺失 → 停止回溯；
		* - 父 recordId 已在 visited 中（脏数据成环）→ 立即停止，避免无限回溯；
		* - 链长达到 `PARENT_TITLE_MAX_DEPTH` → 停止（最后一段标题仍被纳入结果）；
		* - 父 record 在当前表 `getStandardCell` 取不到主列 cell → 停止（关联跨表的兜底）。
		*
		* 空标题段处理：某一段 cell 为空时，跳过该段（不插入空字符串），不在此处补"未命名记录"——
		* 调用方（`collectPrimaryTitle`）拿到空串会自然回落到自己的「未命名记录」兜底，与原行为一致。
		*/ _proto.getPrimaryTitleWithParents = function getPrimaryTitleWithParents(recordId) {
			var dataUtil = this._dataUtil;
			var primaryFieldId = dataUtil.getPrimaryFieldId();
			if (!primaryFieldId || !recordId) return "";
			var titles = [];
			var visited = /* @__PURE__ */ new Set();
			var cursor = recordId;
			var depth = 0;
			while (cursor && depth < PARENT_TITLE_MAX_DEPTH) {
				if (visited.has(cursor)) break;
				visited.add(cursor);
				var text = readCellText(dataUtil, primaryFieldId, cursor);
				if (text) titles.push(text);
				if (!this.hasParentField) break;
				cursor = this.readParentRecordId(cursor);
				depth += 1;
			}
			return titles.join(PARENT_TITLE_SEPARATOR);
		};
		/**
		* 卡片底部状态列单元格的展示文本（按 `WbSharedConfig.card.bottom.statusFieldTitle`
		* 对应列读取 `cell.data[0].text`），并经 `mapGroupValueToDisplayTitle` 把 matchValue
		* （如 `pending/running/...`）映射为 head 分组头同款展示 title（如「待开始」「进行中」）。
		*
		* 未配置 / 找不到列 / 单元格为空时返回 ''；status 列虽以分组形式声明 keyConf，但
		* 当 cell 文本未命中 `groupKeys[*].matchValue`（也无 `groupTextMap` 命中）时回落到原始文本。
		*/ _proto.getBottomStatusText = function getBottomStatusText(recordId) {
			if (!this.hasBottomStatusField) return "";
			var rawText = readCellText(this._dataUtil, this.bottomStatusFieldId, recordId);
			if (!rawText) return "";
			return mapGroupValueToDisplayTitle(this._dataUtil.getFieldByFieldId(this.bottomStatusFieldId), rawText);
		};
		/**
		* 取得人员列单元格中的用户列表，找不到列时返回 []
		*/ _proto.getOwnerUsers = function getOwnerUsers(recordId) {
			var _a;
			if (!this.hasOwnerField) return [];
			var cell = this._dataUtil.getStandardCell(this.ownerFieldId, recordId);
			return (_a = cell === null || cell === void 0 ? void 0 : cell.data) !== null && _a !== void 0 ? _a : [];
		};
		/**
		* 取得日期列时间戳，找不到列或单元格为空时返回 undefined
		*/ _proto.getDateTimestamp = function getDateTimestamp(recordId) {
			var _a;
			if (!this.hasDateField) return;
			var cell = this._dataUtil.getStandardCell(this.dateFieldId, recordId);
			var first = (_a = cell === null || cell === void 0 ? void 0 : cell.data) === null || _a === void 0 ? void 0 : _a[0];
			if (!first) return;
			if (typeof first.timestamp === "number" && first.timestamp > 0) return first.timestamp;
		};
		/**
		* 取 date 列单元格「完整时间展示文本」（field.format 已格式化好的绝对时间，如 `2026-06-25 19:53`）。
		*
		* 用于卡片底部相对时间 hover-tooltip：hover 时展开为「完整时间」核对。
		* 与 grid-list state 同名方法、`wb-cell.ts` 绝对时间收集路径同源（都读 `standardCell.data[0].text`），
		* 保证 tooltip 展示与列原生 DateTime 渲染视觉一致。
		*
		* 未命中 date 列 / cell 空 / text 空时返回 ''。
		*/ _proto.getDateFullText = function getDateFullText(recordId) {
			if (!this.hasDateField) return "";
			return getDateCellFullText(this._dataUtil.getStandardCell(this.dateFieldId, recordId));
		};
		/**
		* 相对时间格式化：1 分钟内显示"刚刚"，其余走 dayjs.fromNow()。
		* 实现已下沉到 `wb_views/shared/avatar-time-utils.formatRelativeTime`，本方法仅为兼容历史外部调用而保留。
		*/ _proto.formatRelativeTime = function formatRelativeTime$1(timestamp) {
			return formatRelativeTime(timestamp);
		};
		/**
		* 根据 userId 稳定 hash 到预设头像色板。
		* 实现已下沉到 `wb_views/shared/avatar-time-utils.getAvatarColor`，本方法仅为兼容历史外部调用而保留。
		*/ _proto.getAvatarColor = function getAvatarColor$1(userId) {
			return getAvatarColor(userId);
		};
		/**
		* 获取用户名首字符（fallback 头像文字）。
		* 实现已下沉到 `wb_views/shared/avatar-time-utils.getAvatarText`，本方法仅为兼容历史外部调用而保留。
		*/ _proto.getAvatarText = function getAvatarText$1(user) {
			return getAvatarText(user);
		};
		_proto.isDateLikeField = function isDateLikeField(field) {
			var type = field.getType();
			return type === FieldType.DATE_TIME || type === FieldType.CREATED_TIME || type === FieldType.MODIFIED_TIME;
		};
		/**
		* 从父类 `dataUtil.getGroups()` 取出 groupIndex 对应分组的所有 recordIds，
		* 找不到时返回 []。供 `selectAllInGroup` / `isGroupAllSelected` 共用。
		*/ _proto.getGroupRecordIds = function getGroupRecordIds(groupIndex) {
			var _a;
			var groups = this._dataUtil.getGroups();
			if (!groups || groupIndex < 0 || groupIndex >= groups.groupIds.length) return [];
			var groupId = groups.groupIds[groupIndex];
			return (_a = groups.groupRecordIds.get(groupId)) !== null && _a !== void 0 ? _a : [];
		};
		/**
		* 读取 `recordId` 在父记录列上的关联值，取第 1 条 LINK_RECORDS data 的 `recordId`
		* 作为父 record id；无值 / 列缺失 / 未启用父记录列时返回 undefined。
		*
		* 仅取第 1 条的语义与父子记录的 SubTreeManager 一致（`readRawParentRecordId`）：
		* 多对多 LINK 列即便存在多个关联值，业务上也只把首条视为 parent。
		*
		* 额外约束：父 recordId 必须在当前「显示集」`displayedRecordIdSet` 中——若其因
		* 筛选 / 隐藏被排除，则父记录链视为断裂，本次回溯到此结束（返回 undefined）。
		*/ _proto.readParentRecordId = function readParentRecordId(recordId) {
			var _a;
			if (!this.hasParentField) return;
			var cell = this._dataUtil.getStandardCell(this.parentFieldId, recordId);
			var first = (_a = cell === null || cell === void 0 ? void 0 : cell.data) === null || _a === void 0 ? void 0 : _a[0];
			if (!(first === null || first === void 0 ? void 0 : first.recordId)) return;
			if (!this.displayedRecordIdSet.has(first.recordId)) return;
			return first.recordId;
		};
		return StateCenter;
	}(StateCenter$1);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/collector/index.js
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
var KanbanTodoCollector;
var init_collector = __esmMin((() => {
	init_resources();
	init_range();
	init_card();
	init_data_util();
	init_head();
	init_size();
	init_state();
	init_collector$1();
	KanbanTodoCollector = /* @__PURE__ */ function(BaseCollector) {
		"use strict";
		_inherits$2(KanbanTodoCollector, BaseCollector);
		function KanbanTodoCollector(context, status) {
			var _this = BaseCollector.call(this, context) || this;
			_this.context = context;
			_this.status = status;
			_this.dataUtil = _this._register(new DataUtil(_this.context, _this.status));
			_this.state = new StateCenter(_this.dataUtil);
			_this.size = _this._register(new SizeCollector(_this.dataUtil));
			_this.head = new HeadCollector(_this.dataUtil, _this.state, _this.size);
			_this.range = _this._register(new RangeCollector(_this.dataUtil, _this.state, _this.size, _this.head));
			_this.card = _this._register(new CardCollector(_this.dataUtil, _this.state, _this.size, _this.head, _this.range, _this.status));
			return _this;
		}
		var _proto = KanbanTodoCollector.prototype;
		/**
		* 提供给 features 使用的 KanbanCollector 兼容引用
		*/ _proto.asKanbanCollector = function asKanbanCollector() {
			return this;
		};
		_proto.handleCollect = function handleCollect() {
			this.state.buildIndex();
			this.size.collect();
			this.head.collect();
			this.range.collect();
			this.card.collect();
		};
		_proto.handlePatch = function handlePatch(mutations) {
			this.dataUtil.patch();
			this.state.buildIndex();
			this.size.patch();
			this.head.patch(mutations);
			this.range.patch(mutations);
			this.card.patch();
		};
		_proto.handleResize = function handleResize(scale) {
			this.size.setScale(scale);
			if (this.state.isExporting()) resourceLoader.refreshLoadingCount();
			this.size.patch();
			this.head.collect();
			this.range.patch();
			this.card.patch();
		};
		return KanbanTodoCollector;
	}(BaseCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/renderer-model/index.js
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
var KanbanTodoRendererModel;
var init_renderer_model = __esmMin((() => {
	init_event();
	init_groupable_status();
	init_collector();
	init_base_renderer_model();
	KanbanTodoRendererModel = /* @__PURE__ */ function(BaseRendererModel) {
		"use strict";
		_inherits$1(KanbanTodoRendererModel, BaseRendererModel);
		function KanbanTodoRendererModel(context) {
			var _this = BaseRendererModel.call(this, context) || this;
			_this.context = context;
			_this.onRenderModelChangeEmitter = _this._register(new Emitter());
			_this.status = new GroupableStatus(context.getCurrentTable(), context.getCurrentView(), context.getCore());
			_this.onRenderModelChange = _this.onRenderModelChangeEmitter.event;
			_this.collector = _this._register(new KanbanTodoCollector(_this.context, _this.status));
			_this.collector.collect();
			_this._register(_this.collector.card.onContentChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.range.onScroll(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			return _this;
		}
		var _proto = KanbanTodoRendererModel.prototype;
		_proto.scrollToGroupY = function scrollToGroupY(groupIndex, scrollTop) {
			var { range } = this.collector;
			var virtualList = range.getVirtualList(groupIndex);
			if (virtualList) {
				var recordIndex = range.findRecordByScrollTop(virtualList, scrollTop);
				var { startY } = virtualList[recordIndex];
				var recordHeight = virtualList[recordIndex + 1] ? virtualList[recordIndex + 1].startY - startY - this.collector.size.cardMarginTop : range.virtualHeight;
				range.setGroupFixOffset(groupIndex, recordIndex, startY + recordHeight - scrollTop);
			}
			range.updateGroupScrollTop(groupIndex, scrollTop);
		};
		_proto.getStatus = function getStatus() {
			return this.status;
		};
		_proto.handleModelChange = function handleModelChange(mutations) {
			this.collector.patch(mutations);
			this.onRenderModelChangeEmitter.fire();
		};
		return KanbanTodoRendererModel;
	}(BaseRendererModel);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/kanban-todo/index.js
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
var KanbanTodoView;
var init_kanban_todo = __esmMin((() => {
	init_esm();
	init_common_view();
	init_entries();
	init_renderer();
	init_renderer_model();
	KanbanTodoView = /* @__PURE__ */ function(KanbanCommonView) {
		"use strict";
		_inherits(KanbanTodoView, KanbanCommonView);
		function KanbanTodoView(context) {
			var _this = KanbanCommonView.call(this, context) || this;
			_this.initFeatures();
			return _this;
		}
		var _proto = KanbanTodoView.prototype;
		_proto.initFeatures = function initFeatures() {
			if (!ua.isPC) return;
			getPcFeatures().forEach((featureOption) => this.installFeature(featureOption));
		};
		/**
		* 进入 / 退出批量选择模式。
		*
		* - 进入（enable=true）：分组头右侧「加号」变为「全选/取消全选」文字按钮，
		*   卡片主列标题左侧出现 checkbox；
		* - 退出（enable=false）：清空所有选中状态，恢复常规 UI。
		*
		* 方法内部会重新收集 + 重渲染，调用方无需再手动 render。
		*/ _proto.setBatchSelectMode = function setBatchSelectMode(enable) {
			if (!enable) {
				var removedEmptyGroups = this.collector.state.exitEmptyBatchGroups();
				if (this.collector.state.isBatchSelectMode() && this.collector.state.hasBatchGroupIndices()) {
					if (removedEmptyGroups) this.recollectAndRender();
					return;
				}
			}
			this.collector.state.setBatchSelectMode(enable);
			if (!enable) this.collector.state.setActiveRecordId("");
			this.recollectAndRender();
		};
		/**
		* 设置 active 态卡片（外部主动高亮某条记录）。
		* - 传入有效 recordId：将该卡片置为 active；
		* - 传入 ''：清除 active 态。
		*
		* 与 `setBatchSelectMode(false)` 共用同一个 state 入口（setActiveRecordId），
		* 仅触发一次 render，无需调用方再手动刷新。
		*/ _proto.setActiveCard = function setActiveCard(recordId) {
			this.collector.state.setActiveRecordId(recordId);
			this.render();
		};
		_proto.createRendererModel = function createRendererModel() {
			return new KanbanTodoRendererModel(this.context);
		};
		_proto.createRenderer = function createRenderer() {
			return new KanbanTodoRenderer(this.rendererModel, this.context.getRenderRoot());
		};
		/**
		* KanbanTodoCollector 与 KanbanCollector 是兄弟类（结构等价但无继承关系），
		* `getRectVisibleInfo` 第三参类型锁死为 KanbanCollector，
		* 把这次唯一的结构化转换收敛到此钩子，避免污染主流程。
		*/ _proto.getCollectorForVisibility = function getCollectorForVisibility() {
			return this.collector;
		};
		_create_class(KanbanTodoView, [{
			key: "groupMargin",
			get: function() {
				return this.collector.size.groupGap;
			}
		}]);
		return KanbanTodoView;
	}(KanbanCommonView);
}));
//#endregion
export { init_kanban_todo as n, KanbanTodoView as t };
