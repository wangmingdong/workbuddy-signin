import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event } from "./esm-cVQVEiWG.js";
import { $l as init_es, Ed as require_isNumber, Vl as ViewType$1, _o as isUserField, ql as FieldType, qu as ViewType, wd as i18n } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { c as require_cloneDeep } from "./merge-vXYl4M0x.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { At as init_utils, B as init_feature_single, Bt as performanceReport, Ft as Direction, G as resourceLoader, H as pen, I as init_register_esc_to_cancel, K as init_lib, L as registerEscToCancel, M as BaseRenderer, Mt as renderAppConfigService, N as init_base_renderer, Nt as RenderAppConfigKey, Pt as init_index_interface, Rt as init_common, U as init_resources, V as init_pen, X as DrawType, a as BaseCollector, et as init_is_in_rect, i as init_base_renderer_model, jt as init_render_app_config, kt as getScrollConfig, l as BaseSizeCollector, nt as FeatureUIEvent, o as init_collector$1, ot as Cursor, pt as NormalIconAlias, r as BaseRendererModel, rt as init_feature_event, st as init_cursor, tt as isHitRect, u as init_size$1, vt as init_style, yt as style, z as FeatureAuth, zt as init_performance } from "./canvas-view-DDuMsrmC.js";
import { S as init_field_collector, x as fieldCollector } from "./auto-scroll-Cn43Kqkt.js";
import { a as init_binary_search, i as binarySearch } from "./common-action-BPA9xdl-.js";
import { c as init_groupable_status, s as GroupableStatus } from "./fix-scroll-delta-C4NjXGCK.js";
import { c as init_field_fixed_height, d as init_card_single, l as CardSingleCollector, s as fieldFixedContent } from "./view-DGZEPJsr.js";
import { n as init_content_hover, t as CardContentHover } from "./content-hover-DdfS9wKa.js";
import { C as IKanbanGroupVerticalScroller, D as KanbanFeatureBase, E as KanbanCardActive, M as KanbanCommonView, N as init_common_view, O as init_kanban_feature, S as init_main$4, T as init_card_active, _ as IKanbanAutoScroll, a as DataUtil, b as IKanbanHorizontalScroller, c as KanbanCardMove, d as IKanbanCardMove, g as KanbanAutoScroll, h as init_auto_scroll, i as init_range, j as IKanbanCardActive, l as getCardRecordId, m as init_get_add_card_rect, n as init_state, o as init_data_util, p as getAddCardButtonRect, r as RangeCollector, s as init_card_move, t as StateCenter, u as init_get_target_by_offset, v as init_h_scroller, w as init_interface$3, x as KanbanGroupVerticalScroller, y as KanbanHorizontalScroller } from "./state-t2amB7bn.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/mobile/tap-interactive/interface.js
var IKanbanTapInteractive;
var init_interface$2 = __esmMin((() => {
	init_module();
	IKanbanTapInteractive = createDecorator("IKanbanTapInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/utils/get-head-content-width.js
function getHeadContentWidth(contents, collector) {
	var _a;
	var contentWidth = 0;
	var [first, last] = [contents[0], contents[contents.length - 1]];
	if (last.type === DrawType.Text) {
		var layouts = last.layouts || [];
		contentWidth = last.x + ((_a = layouts[0]) === null || _a === void 0 ? void 0 : _a.width) - first.x;
	} else contentWidth = last.x + ("width" in last ? last.width : 0) - first.x;
	return Math.max(contentWidth, collector.size.cardFoldWidth) + 2 * collector.size.headFoldPadding;
}
var init_get_head_content_width = __esmMin((() => {
	init_lib();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/mobile/tap-interactive/main.js
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
var KanbanTapInteractive;
var init_main$3 = __esmMin((() => {
	init_pen();
	init_resources();
	init_style();
	init_kanban_feature();
	init_get_head_content_width();
	init_content_hover();
	init_is_in_rect();
	KanbanTapInteractive = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$9(KanbanTapInteractive, KanbanFeatureBase);
		function KanbanTapInteractive() {
			var _this = KanbanFeatureBase.apply(this, arguments) || this;
			_this.onGroupCollapse = (param) => {
				_this.action.updateGroupFoldStatus(param.groupIndex);
			};
			_this.onStageTap = (evt) => {
				_this.group.clear();
				var { groupIndex, recordId, isHead } = evt.target;
				if (isHead) {
					_this.tapHead(evt.x, evt.y, groupIndex);
					return;
				}
				if (_this.collector.state.isFoldGroup(groupIndex)) {
					_this.checkTapFoldGroup(evt.x, evt.y, groupIndex);
					return;
				}
				if (groupIndex > -1 && recordId) _this.tapCard(evt.x, evt.y, groupIndex, recordId);
			};
			return _this;
		}
		var _proto = KanbanTapInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this.contentHover = new CardContentHover(this.action, this.collector.dataUtil);
			this._register(this.UIEvent.stage.onTap(this.onStageTap));
			this._register(this.emitter.service.collapseKanbanGroup.event(this.onGroupCollapse));
		};
		_proto.render = function render() {
			this.group.clear();
		};
		_proto.tapHead = function tapHead(x, y, groupIndex) {
			var headInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!headInfo) return;
			var moreIcon = headInfo.contents.find((content) => content.id === NormalIconAlias.MENU_MORE);
			if (!moreIcon || !("width" in moreIcon) || !("height" in moreIcon)) return;
			var iconRect = Object.assign(Object.assign({}, moreIcon), { x: moreIcon.x - this.collector.range.scrollLeft });
			if (isHitRect(x, y, iconRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, iconRect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius
				})));
				this.action.showHeadMoreMenu(groupIndex);
				this.cancelTap();
			}
		};
		_proto.checkTapFoldGroup = function checkTapFoldGroup(x, y, groupIndex) {
			var headInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!headInfo) return;
			var { size, range } = this.collector;
			var headContentWidth = getHeadContentWidth(headInfo.contents, this.collector);
			var foldRect = {
				x: headInfo.rect.x - range.scrollLeft,
				y: size.groupCardVisibleStartY + style.size.borderWidth,
				width: headInfo.rect.height,
				height: headContentWidth
			};
			if (isHitRect(x, y, foldRect)) this.group.add(pen.config.rect(Object.assign(Object.assign({}, foldRect), {
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onTap: () => {
					this.action.updateGroupFoldStatus(groupIndex);
				}
			})));
		};
		_proto.tapCard = function tapCard(x, y, groupIndex, recordId) {
			var cardInfo = this.collector.card.getCardInfo(groupIndex, recordId);
			if (!cardInfo) return;
			var { scrollLeft } = this.collector.range;
			var { groupCardVisibleStartY } = this.collector.size;
			var groupScrollTop = this.collector.range.getGroupScrollTop(groupIndex);
			var isHitPart = cardInfo.contents.some((content) => this.contentHover.hover(this.group, content, {
				x,
				y,
				recordId,
				startY: groupCardVisibleStartY,
				offsetX: -scrollLeft,
				offsetY: groupScrollTop
			}));
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, cardInfo.rect), {
				x: cardInfo.rect.x - scrollLeft,
				y: cardInfo.rect.y + groupCardVisibleStartY - groupScrollTop,
				background: style.color.hoverBackground,
				borderRadius: style.size.borderRadius,
				onTap: () => {
					if (!isHitPart) this.action.expandRow(recordId);
					this.cancelTap();
				}
			})));
		};
		_proto.cancelTap = function cancelTap() {
			setTimeout(() => this.group.clear(), 300);
		};
		return KanbanTapInteractive;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/mobile/tap-interactive/index.js
var init_tap_interactive = __esmMin((() => {
	init_interface$2();
	init_main$3();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/mobile/entries.js
function getMobileFeatures() {
	return [
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
			id: IKanbanTapInteractive,
			ctor: KanbanTapInteractive,
			config: { auth: FeatureAuth.None }
		},
		{
			id: IKanbanCardActive,
			ctor: KanbanCardActive,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries$1 = __esmMin((() => {
	init_card_active();
	init_interface$3();
	init_main$4();
	init_h_scroller();
	init_tap_interactive();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/area-interactive/interface.js
var IKanbanAreaInteractive;
var init_interface$1 = __esmMin((() => {
	init_module();
	IKanbanAreaInteractive = createDecorator("IKanbanAreaInteractive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/area-interactive/main.js
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
var KanbanAreaInteractive;
var init_main$2 = __esmMin((() => {
	init_pen();
	init_resources();
	init_style();
	init_kanban_feature();
	init_interface$1();
	init_get_add_card_rect();
	init_get_head_content_width();
	init_cursor();
	init_content_hover();
	init_binary_search();
	init_is_in_rect();
	KanbanAreaInteractive = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$8(KanbanAreaInteractive, KanbanFeatureBase);
		function KanbanAreaInteractive() {
			var _this = KanbanFeatureBase.apply(this, arguments) || this;
			_this.clearBeforeAnyHover = () => {
				_this.group.clear();
				_this.group.setAttrs(_this.collector.size.globalRect);
				_this.isHoverIconOrTag = false;
				_this.setCursor(Cursor.DEFAULT);
			};
			_this.onGroupCollapse = (param) => {
				_this.action.updateGroupFoldStatus(param.groupIndex);
			};
			_this.onStageMouseMove = (evt) => {
				if (evt.target.isBlank || _this.isPreventFromOtherFeature()) {
					_this.group.clear();
					_this.isHoverIconOrTag = false;
					return;
				}
				_this.clearBeforeAnyHover();
				var { groupIndex, recordId } = evt.target;
				if (groupIndex === -1) return;
				if (evt.target.isHead) {
					_this.hoverHead(evt.x, evt.y, groupIndex);
					return;
				}
				if (evt.target.isBody) {
					_this.hoverBody(evt.x, evt.y, groupIndex, recordId);
					return;
				}
			};
			return _this;
		}
		var _proto = KanbanAreaInteractive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this.contentHover = new CardContentHover(this.action, this.collector.dataUtil);
			this._register(this.emitter.service.collapseKanbanGroup.event(this.onGroupCollapse));
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
			this._register(this.UIEvent.stage.onMouseLeave(this.clearBeforeAnyHover));
		};
		_proto.render = function render() {
			this.clearBeforeAnyHover();
		};
		_proto.isHovering = function isHovering() {
			return this.isHoverIconOrTag;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { high: {
				id: IKanbanAreaInteractive,
				isLock: () => this.isHovering()
			} };
		};
		_proto.hoverHead = function hoverHead(x, y, groupIndex) {
			var groupInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!groupInfo) return;
			if (groupInfo.groupId === void 0) {
				this.hoverHeadAddGroup(x, y, groupInfo);
				return;
			}
			if (groupInfo.fold) return;
			var { rect } = groupInfo;
			var iconSize = style.size.iconLarge;
			var moreIconRect = {
				x: rect.x + rect.width - iconSize - this.collector.range.scrollLeft,
				y: rect.y + (rect.height - iconSize) / 2,
				width: iconSize,
				height: iconSize
			};
			this.group.add(pen.config.icon(NormalIconAlias.MENU_MORE, moreIconRect));
			var rectConfig = groupInfo.contents[0];
			var tagRect = Object.assign(Object.assign({}, rectConfig), { x: rectConfig.x - this.collector.range.scrollLeft });
			if (isHitRect(x, y, tagRect) && !groupInfo.fold) this.hoverHeadTag(tagRect, groupIndex, groupInfo);
			if (isHitRect(x, y, moreIconRect)) this.hoverMoreIcon(moreIconRect, groupIndex);
		};
		_proto.hoverHeadTag = function hoverHeadTag(tagRect, groupIndex, groupInfo) {
			if (!groupInfo.groupId) return;
			this.isHoverIconOrTag = true;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, tagRect), {
				borderRadius: style.size.borderRadius,
				background: style.color.hoverBackground,
				onClick: () => {
					this.action.editGroup(groupIndex);
				}
			})));
			this.setCursor(Cursor.POINTER);
		};
		_proto.hoverMoreIcon = function hoverMoreIcon(moreIconRect, groupIndex) {
			this.isHoverIconOrTag = true;
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, moreIconRect), {
				borderRadius: style.size.borderRadius,
				background: style.color.hoverBackground,
				onClick: () => {
					this.action.showHeadMoreMenu(groupIndex);
				}
			})));
			this.setCursor(Cursor.POINTER);
		};
		_proto.hoverBody = function hoverBody(x, y, groupIndex, recordId) {
			if (this.checkHoverAddCard(x, y, groupIndex)) return;
			if (this.collector.state.isFoldGroup(groupIndex)) {
				this.checkFoldGroupHover(x, y, groupIndex);
				return;
			}
			if (!recordId) return;
			var cardInfo = this.collector.card.getCardInfo(groupIndex, recordId);
			if (!cardInfo) return;
			var { groupCardVisibleStartY, groupCardVisibleHeight } = this.collector.size;
			var { scrollLeft } = this.collector.range;
			var groupScrollTop = this.collector.range.getGroupScrollTop(groupIndex);
			var cardRect = Object.assign(Object.assign({}, cardInfo.rect), {
				x: cardInfo.rect.x - scrollLeft,
				y: cardInfo.rect.y + groupCardVisibleStartY - groupScrollTop
			});
			var cardClipArea = {
				x: cardRect.x,
				y: groupCardVisibleStartY,
				width: cardRect.width,
				height: groupCardVisibleHeight + 2 * style.size.borderWidth
			};
			if (isHitRect(x, y, cardRect)) {
				this.setCursor(Cursor.POINTER);
				var isHitContent = this.checkHoverCardContent(cardInfo, x, y, recordId, groupScrollTop, cardClipArea);
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, cardRect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius,
					onMouseUpWithRight: () => {
						this.collector.state.setContextMenuActivePoint(recordId, groupIndex);
					},
					onClick: () => {
						if (!isHitContent) this.action.expandRow(recordId);
					}
				})), 0, 0, cardClipArea);
			}
		};
		_proto.checkFoldGroupHover = function checkFoldGroupHover(x, y, groupIndex) {
			var headInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!headInfo) return;
			var { size, range } = this.collector;
			var headContentWidth = getHeadContentWidth(headInfo.contents, this.collector);
			var foldRect = {
				x: headInfo.rect.x - range.scrollLeft,
				y: size.groupCardVisibleStartY + style.size.borderWidth,
				width: headInfo.rect.height,
				height: headContentWidth
			};
			if (isHitRect(x, y, foldRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, foldRect), {
					background: style.color.hoverBackground,
					borderRadius: style.size.borderRadius,
					onClick: () => {
						this.action.updateGroupFoldStatus(groupIndex);
					}
				})));
				this.setCursor(Cursor.POINTER);
			}
		};
		_proto.checkHoverAddCard = function checkHoverAddCard(x, y, groupIndex) {
			var addButtonRect = getAddCardButtonRect(groupIndex, this.collector);
			if (!addButtonRect) return false;
			addButtonRect.x -= this.collector.range.scrollLeft;
			addButtonRect.y += this.collector.size.groupCardVisibleStartY;
			if (isHitRect(x, y, addButtonRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, addButtonRect), {
					x: addButtonRect.x,
					borderRadius: style.size.borderRadius,
					background: style.color.hoverBackground,
					onClick: () => {
						this.action.addRecord(groupIndex);
					}
				})));
				this.setCursor(Cursor.POINTER);
				return true;
			}
			return false;
		};
		_proto.hoverHeadAddGroup = function hoverHeadAddGroup(x, y, groupInfo) {
			var iconConfig = groupInfo.contents[0];
			var textConfig = groupInfo.contents[1];
			if (!iconConfig || !(textConfig === null || textConfig === void 0 ? void 0 : textConfig.layouts)) return;
			var deltaX = 2;
			var iconStartX = iconConfig.x;
			var contentRect = {
				x: iconStartX - this.collector.range.scrollLeft - deltaX,
				y: iconConfig.y,
				width: textConfig.x + textConfig.layouts[0].width - iconStartX + deltaX * 3,
				height: iconConfig.height
			};
			if (isHitRect(x, y, contentRect)) {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, contentRect), {
					borderRadius: style.size.borderRadius,
					background: style.color.hoverBackground,
					onClick: () => {
						this.action.addGroup();
					}
				})));
				this.isHoverIconOrTag = true;
				this.setCursor(Cursor.POINTER);
			}
		};
		_proto.checkHoverCardContent = function checkHoverCardContent(cardInfo, x, y, recordId, groupScrollTop, clipRect) {
			var { groupCardVisibleStartY } = this.collector.size;
			var hitIndex = binarySearch(y, 0, cardInfo.contents.length - 1, (index) => {
				return cardInfo.contents[index][0].y + groupCardVisibleStartY - groupScrollTop;
			});
			if (hitIndex === -1) return false;
			var cardContent = cardInfo.contents[hitIndex];
			return this.contentHover.hover(this.group, cardContent, {
				x,
				y,
				recordId,
				startY: groupCardVisibleStartY,
				offsetX: -this.collector.range.scrollLeft,
				offsetY: groupScrollTop,
				clipRect
			});
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IKanbanAreaInteractive);
		};
		return KanbanAreaInteractive;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/area-interactive/index.js
var init_area_interactive = __esmMin((() => {
	init_interface$1();
	init_main$2();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/group-move/interface.js
var IKanbanGroupMove;
var init_interface = __esmMin((() => {
	init_module();
	IKanbanGroupMove = createDecorator("IKanbanGroupMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/group-move/main.js
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
var import_isNumber, KanbanGroupMove;
var init_main$1 = __esmMin((() => {
	import_isNumber = /* @__PURE__ */ __toESM(require_isNumber());
	init_common();
	init_pen();
	init_style();
	init_auto_scroll();
	init_kanban_feature();
	init_interface();
	init_cursor();
	init_register_esc_to_cancel();
	KanbanGroupMove = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$7(KanbanGroupMove, KanbanFeatureBase);
		function KanbanGroupMove() {
			var _this = KanbanFeatureBase.apply(this, arguments) || this;
			_this.dragBuffer = 6;
			_this.draglineBorder = style.size.borderWidth * 2;
			_this.isInDragging = false;
			_this.isReadyToDrag = false;
			_this.moveDirection = Direction.RIGHT;
			_this.onStageMouseMove = (evt) => {
				if (_this.isDragging() || _this.isPreventFromOtherFeature() || !evt.target.isHead) return;
				var { target } = evt;
				var groupHeadInfo = _this.collector.head.getGroupInfo(target.groupIndex);
				if (!(groupHeadInfo === null || groupHeadInfo === void 0 ? void 0 : groupHeadInfo.groupId) || groupHeadInfo.fold) return;
				_this.setCursor(Cursor.GRAB);
			};
			_this.onStageMousedown = (evt) => {
				var _a;
				if (_this.isPreventFromOtherFeature() || !evt.target.isHead) return;
				var { target } = evt;
				var groupHeadInfo = _this.collector.head.getGroupInfo(target.groupIndex);
				if (!(groupHeadInfo === null || groupHeadInfo === void 0 ? void 0 : groupHeadInfo.groupId) || groupHeadInfo.fold) return;
				_this.isReadyToDrag = true;
				var groupScrollTop = _this.collector.range.getGroupScrollTop(evt.target.groupIndex);
				var { scrollLeft } = _this.collector.range;
				_this.clickInfo = Object.assign(Object.assign({}, target), {
					scrollTop: groupScrollTop,
					scrollLeft
				});
				_this.mouseDownOffset = {
					x: evt.x,
					y: evt.y
				};
				_this.listenDragReady();
				(_a = _this.renderer.getFeature(IKanbanAutoScroll)) === null || _a === void 0 || _a.readyX();
			};
			_this.onWindowMouseMove = (evt) => {
				if (!_this.isReadyToDrag) return;
				var deltaX = evt.x - _this.mouseDownOffset.x;
				var deltaY = evt.y - _this.mouseDownOffset.y;
				_this.isInDragging = _this.isInDragging || Math.abs(deltaX) > _this.dragBuffer || Math.abs(deltaY) > _this.dragBuffer;
				if (_this.isReadyToDrag && _this.isInDragging) {
					_this.mouseMoveOffset = {
						x: evt.x,
						y: evt.y
					};
					_this.doMousemoveDragging(evt.target.groupIndex);
				}
			};
			_this.onDocumentMouseup = () => {
				if (!_this.isDragging()) {
					_this.clearAllStatus();
					return;
				}
				_this.moveCard();
				_this.clearAllStatus();
			};
			return _this;
		}
		var _proto = KanbanGroupMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
			this._register(this.UIEvent.stage.onMouseMove(this.onStageMouseMove));
		};
		_proto.render = function render() {
			if (this.isReadyToDrag && this.isInDragging) {
				this.group.clear();
				var groupIndex = this.collector.range.getGroupIndexByOffsetX(this.mouseMoveOffset.x);
				this.doMousemoveDragging(groupIndex);
			}
		};
		_proto.isDragging = function isDragging() {
			return this.isInDragging && this.isReadyToDrag;
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IKanbanGroupMove,
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
		_proto.doMousemoveDragging = function doMousemoveDragging(groupIndex) {
			var _a;
			if (!this.clickInfo) return;
			this.group.clear();
			this.group.setAttrs(this.collector.size.globalRect);
			this.moveDirection = this.mouseMoveOffset.x + this.collector.range.scrollLeft - this.mouseDownOffset.x - ((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.scrollLeft) > 0 ? Direction.RIGHT : Direction.LEFT;
			this.drawOriginRecordBackground();
			this.updateGroup();
			this.updateDragLineAndTargetInfo(groupIndex);
			this.setCursor(Cursor.GRABBING);
		};
		_proto.drawOriginRecordBackground = function drawOriginRecordBackground() {
			var _a;
			if (!this.clickInfo) return;
			var { size, range } = this.collector;
			var rect = (_a = this.collector.head.getGroupInfo(this.clickInfo.groupIndex)) === null || _a === void 0 ? void 0 : _a.rect;
			if (!rect) return;
			var groupRect = {
				x: rect.x - range.scrollLeft,
				y: size.globalRect.y,
				height: size.globalRect.height,
				width: rect === null || rect === void 0 ? void 0 : rect.width
			};
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, groupRect), { background: style.color.activedBackground })));
		};
		_proto.updateGroup = function updateGroup() {
			if (!this.clickInfo) return;
			var { size, head } = this.collector;
			if (!head.getGroupInfo(this.clickInfo.groupIndex)) return;
			var offsetX = -this.clickInfo.scrollLeft + this.mouseMoveOffset.x - this.mouseDownOffset.x;
			var headOffsetY = this.mouseMoveOffset.y - this.mouseDownOffset.y;
			var bodyOffsetY = -this.clickInfo.scrollTop + this.mouseMoveOffset.y - this.mouseDownOffset.y + size.groupCardVisibleStartY;
			this.parentApi.renderGroupHead(this.group, this.clickInfo.groupIndex, offsetX, headOffsetY);
			this.parentApi.renderGroupBody(this.group, this.clickInfo.groupIndex, offsetX, headOffsetY + size.groupCardVisibleStartY, bodyOffsetY);
		};
		_proto.updateDragLineAndTargetInfo = function updateDragLineAndTargetInfo(groupIndex) {
			var _a;
			var groupHeadInfo = this.collector.head.getGroupInfo(groupIndex);
			var targetIndex = (groupHeadInfo === null || groupHeadInfo === void 0 ? void 0 : groupHeadInfo.groupId) ? groupIndex : this.targetGroupIndex;
			this.targetGroupIndex = targetIndex;
			if (!(0, import_isNumber.default)(targetIndex) || targetIndex === ((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.groupIndex)) return;
			var groupInfo = this.collector.head.getGroupInfo(targetIndex);
			if (!groupInfo) return;
			var { size, range } = this.collector;
			var groupLineOffset = this.moveDirection === Direction.LEFT ? groupInfo.rect.x - size.cardPadding / 2 - this.draglineBorder / 2 - range.scrollLeft : groupInfo.rect.x + groupInfo.rect.width + size.cardPadding / 2 + 2 * style.size.borderWidth - this.draglineBorder / 2 - range.scrollLeft;
			this.group.add(pen.config.line({
				x: groupLineOffset,
				y: size.globalRect.y,
				points: [
					0,
					0,
					0,
					size.globalRect.height
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: this.draglineBorder
			}));
		};
		_proto.moveCard = function moveCard() {
			var context = this.collector.dataUtil.getContext();
			if (context.customConfig || !this.clickInfo || !(0, import_isNumber.default)(this.targetGroupIndex)) return;
			if (this.clickInfo.groupIndex === this.targetGroupIndex) return;
			var view = context.getCurrentView();
			var table = context.getCurrentTable();
			if (!view.getGroupField() || !view || !table) return;
			var { newGroupOrder, targetGroupId } = this.getMoveGroupOrder(this.targetGroupIndex);
			context.getBehaviorApi().moveGroupOrder({
				tableId: table.id,
				viewId: view.id,
				groupOrder: newGroupOrder,
				changeOrder: targetGroupId
			});
		};
		_proto.getMoveGroupOrder = function getMoveGroupOrder(groupIndex) {
			var _a;
			var { groupIds: currentGroupOrder } = this.collector.dataUtil.getGroups();
			var maxIndex = ((_a = currentGroupOrder.length) !== null && _a !== void 0 ? _a : 0) - 1;
			var isLast = false;
			if (groupIndex > maxIndex) isLast = true;
			var targetGroupId = currentGroupOrder[this.clickInfo.groupIndex];
			var newGroupOrder = currentGroupOrder.map((groupKey) => groupKey);
			newGroupOrder.splice(this.clickInfo.groupIndex, 1);
			if (isLast) newGroupOrder.push(targetGroupId);
			else newGroupOrder.splice(groupIndex, 0, targetGroupId);
			return {
				newGroupOrder,
				targetGroupId
			};
		};
		_proto.clearAllStatus = function clearAllStatus() {
			this.group.clear();
			this.mouseDownOffset = {
				x: 0,
				y: 0
			};
			this.mouseMoveOffset = {
				x: 0,
				y: 0
			};
			this.clickInfo = void 0;
			this.targetGroupIndex = void 0;
			this.isReadyToDrag = false;
			this.isInDragging = false;
			this.setCursor(Cursor.DEFAULT);
		};
		_proto.isPreventFromOtherFeature = function isPreventFromOtherFeature() {
			return this.featureLock.isPreventFromOtherFeature(IKanbanGroupMove) || !this.collector.dataUtil.getStatus().canEditFieldInView;
		};
		return KanbanGroupMove;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/group-move/index.js
var init_group_move = __esmMin((() => {
	init_interface();
	init_main$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/entries.js
function getPcFeatures() {
	return [
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
			id: IKanbanAreaInteractive,
			ctor: KanbanAreaInteractive,
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
		},
		{
			id: IKanbanGroupMove,
			ctor: KanbanGroupMove,
			config: { auth: FeatureAuth.None }
		}
	];
}
var init_entries = __esmMin((() => {
	init_auto_scroll();
	init_card_active();
	init_interface$3();
	init_main$4();
	init_h_scroller();
	init_area_interactive();
	init_card_move();
	init_group_move();
	init_feature_single();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/event-handler/index.js
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
var import_main$1, KanbanEventHandler;
var init_event_handler = __esmMin((() => {
	import_main$1 = require_main();
	init_feature_event();
	init_get_target_by_offset();
	init_is_in_rect();
	KanbanEventHandler = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$6(KanbanEventHandler, Disposable);
		function KanbanEventHandler(stage, root, rendererModel) {
			var _this = Disposable.call(this) || this;
			_this.stage = stage;
			_this.root = root;
			_this.rendererModel = rendererModel;
			_this.getTarget = (offset) => {
				var _a;
				var { x: offsetX, y: offsetY } = offset;
				var { size } = _this.rendererModel.collector;
				var isOutsideStage = !isHitRect(offsetX, offsetY, size.globalRect);
				var groupIndex = _this.rendererModel.collector.range.getGroupIndexByOffsetX(offset.x);
				var target = {
					isBlank: isOutsideStage,
					isOutStage: isOutsideStage,
					groupIndex,
					isHead: false,
					isBody: false
				};
				if (offsetY < size.bodyRect.y) target.isHead = true;
				else target.isBody = true;
				var groupHeadRect = (_a = _this.rendererModel.collector.head.getGroupInfo(groupIndex)) === null || _a === void 0 ? void 0 : _a.rect;
				var groupHeadX = ((groupHeadRect === null || groupHeadRect === void 0 ? void 0 : groupHeadRect.x) || 0) - _this.rendererModel.collector.range.scrollLeft;
				if (groupHeadRect && offsetX >= groupHeadX && offsetX <= groupHeadX + groupHeadRect.width) target.isBlank = false;
				else {
					target.isBlank = true;
					target.groupIndex = -1;
				}
				if (!target.isBlank && target.isBody) {
					var recordId = getCardRecordId(offsetY, target.groupIndex, _this.rendererModel.collector);
					if (recordId) target.recordId = recordId;
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
		return KanbanEventHandler;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/renderer/main/index.js
var MainRenderer;
var init_main = __esmMin((() => {
	init_esm();
	init_es();
	init_pen();
	init_resources();
	init_style();
	init_get_add_card_rect();
	init_get_head_content_width();
	MainRenderer = /* @__PURE__ */ function() {
		"use strict";
		function MainRenderer(rendererModel) {
			this.rendererModel = rendererModel;
			this.cardStyle = {
				borderWidth: style.size.borderWidth,
				borderRadius: style.size.borderRadius,
				background: style.color.normalBackground
			};
			this.collector = rendererModel.collector;
		}
		var _proto = MainRenderer.prototype;
		_proto.render = function render(headContainer, bodyContainer) {
			this.collector.range.doGroupRange((groupIndex) => {
				this.renderHead(headContainer, groupIndex);
				this.renderBody(bodyContainer, groupIndex);
			});
		};
		_proto.renderHead = function renderHead(headContainer, groupIndex, x, y) {
			var { range, head } = this.collector;
			var groupInfo = head.getGroupInfo(groupIndex);
			var offsetX = x !== null && x !== void 0 ? x : -range.scrollLeft;
			var offsetY = y !== null && y !== void 0 ? y : 0;
			if (groupInfo && !groupInfo.fold) groupInfo.contents.forEach((content) => headContainer.add(Object.assign({}, content), offsetX, offsetY));
		};
		_proto.renderBody = function renderBody(bodyContainer, groupIndex, x, headY, bodyY) {
			if (this.collector.state.isFoldGroup(groupIndex)) {
				this.renderFoldBody(bodyContainer, groupIndex);
				return;
			}
			var { range, size } = this.collector;
			var { borderWidth } = style.size;
			var offsetX = x !== null && x !== void 0 ? x : -range.scrollLeft;
			var offsetY = bodyY !== null && bodyY !== void 0 ? bodyY : -range.getGroupScrollTop(groupIndex);
			var groupHeadInfo = this.collector.head.getGroupInfo(groupIndex);
			if (!groupHeadInfo) return;
			var groupHeadRect = groupHeadInfo.rect;
			if (offsetY !== 0) bodyContainer.add(pen.config.line({
				x: groupHeadRect.x,
				y: borderWidth,
				points: [
					0,
					0,
					groupHeadRect.width,
					0
				]
			}), offsetX, headY);
			var groupClipArea = {
				x: groupHeadRect.x - borderWidth + offsetX,
				y: headY !== null && headY !== void 0 ? headY : 0,
				width: groupHeadRect.width + 2 * borderWidth,
				height: size.groupCardVisibleHeight + 2 * borderWidth
			};
			var cardList = range.getVirtualList(groupIndex);
			if (!cardList) {
				this.checkGroupHeadInfo(bodyContainer, groupHeadInfo, groupIndex, offsetX, headY);
				return;
			}
			var startIndex = this.collector.card.getScrollTopRecordIndex(groupIndex);
			var clipRect = Object.assign(Object.assign({}, groupClipArea), { width: groupHeadRect.width });
			for (var index = startIndex; index < cardList.length; index++) {
				var { recordId, startY } = cardList[index];
				if (startY + offsetY > groupClipArea.height) break;
				var cardInfo = this.collector.card.getCardInfo(groupIndex, recordId);
				if (!cardInfo) continue;
				var background = this.collector.state.isHighlightRecord(recordId) ? style.color.searchHighlightBackground : style.color.normalBackground;
				var cardBox = pen.config.rect(Object.assign(Object.assign(Object.assign({}, cardInfo.rect), this.cardStyle), { background }));
				bodyContainer.add(cardBox, offsetX, offsetY, groupClipArea);
				cardInfo.contents.forEach((contents) => {
					if (contents[0].y + offsetY > groupClipArea.height || offsetY + contents[0].y + contents[0].height < 0) return;
					contents[1].forEach((drawConfig) => {
						bodyContainer.add(Object.assign({}, drawConfig), offsetX, offsetY, clipRect);
					});
				});
			}
			var totalHeight = range.getGroupTotalHeight(groupIndex);
			var scrollTop = range.getGroupScrollTop(groupIndex);
			if (totalHeight > groupClipArea.height && scrollTop < totalHeight - groupClipArea.height - size.cardMarginTop) bodyContainer.add(pen.config.line({
				x: groupHeadRect.x,
				y: groupClipArea.height,
				points: [
					0,
					0,
					groupHeadRect.width,
					0
				]
			}), offsetX, headY);
			this.renderAddButton(bodyContainer, groupIndex, offsetX, headY);
		};
		_proto.checkGroupHeadInfo = function checkGroupHeadInfo(bodyContainer, groupHeadInfo, groupIndex, offsetX, offsetY) {
			if (groupHeadInfo === null || groupHeadInfo === void 0 ? void 0 : groupHeadInfo.groupId) if (ua.isMobile) this.renderEmptyTips(bodyContainer, groupHeadInfo.rect, offsetX);
			else this.renderAddButton(bodyContainer, groupIndex, offsetX, offsetY);
		};
		_proto.renderEmptyTips = function renderEmptyTips(bodyContainer, groupHeadRect, offsetX) {
			var { size } = this.collector;
			var emptyRect = Object.assign(Object.assign({}, groupHeadRect), {
				y: style.size.borderWidth,
				width: groupHeadRect.width,
				height: size.cardAddButtonHeight
			});
			bodyContainer.add(pen.config.rect(Object.assign(Object.assign({}, emptyRect), {
				borderRadius: style.size.borderRadius,
				borderColor: style.color.strongBorderColor,
				borderDash: true
			})), offsetX);
			bodyContainer.add(pen.config.text(Object.assign(Object.assign({ text: i18n.t("当前暂无数据") }, emptyRect), {
				color: style.color.lightFontColor,
				align: "center"
			})), offsetX);
		};
		_proto.renderAddButton = function renderAddButton(bodyContainer, groupIndex, offsetX, offsetY) {
			if (ua.isMobile) return;
			var addButtonRect = getAddCardButtonRect(groupIndex, this.collector);
			if (!addButtonRect || !this.rendererModel.getStatus().canInsertRecordInGroup) return;
			var { borderWidth } = style.size;
			bodyContainer.add(pen.config.rect(Object.assign(Object.assign({}, addButtonRect), {
				borderWidth,
				borderRadius: style.size.borderRadius,
				background: style.color.normalBackground
			})), offsetX, offsetY);
			var addIconSize = style.size.iconNormal;
			var addIconRect = {
				x: addButtonRect.x + style.size.cellPadding,
				y: addButtonRect.y + addButtonRect.height / 2 - addIconSize / 2,
				width: addIconSize,
				height: addIconSize
			};
			bodyContainer.add(pen.config.icon(NormalIconAlias.ADD, addIconRect), offsetX, offsetY);
			var textConfig = Object.assign(Object.assign({}, pen.config.text({
				text: i18n.t("添加卡片"),
				x: 0,
				y: 0,
				width: this.collector.size.cardWidth,
				height: this.collector.size.cardAddButtonHeight,
				fontSize: style.size.fontSizeSmall
			})), {
				x: addIconRect.x + style.size.tagPaddingLeft + addIconSize,
				y: addButtonRect.y
			});
			bodyContainer.add(textConfig, offsetX, offsetY);
		};
		_proto.renderFoldBody = function renderFoldBody(bodyContainer, groupIndex) {
			var groupInfo = this.collector.head.getGroupInfo(groupIndex);
			if (groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.fold) {
				var contentTotalWidth = getHeadContentWidth(groupInfo.contents, this.collector);
				var { scrollLeft } = this.collector.range;
				var groupRect = {
					x: groupInfo.rect.x - scrollLeft + style.size.borderWidth,
					y: groupInfo.rect.y + style.size.borderWidth,
					width: contentTotalWidth,
					height: groupInfo.rect.height
				};
				var rotateGroup = pen.group(Object.assign(Object.assign({}, groupRect), {
					rotate: 90,
					overflow: "visible"
				}));
				var rotateOffset = (groupRect.width - groupRect.height) / 2;
				rotateGroup.add(pen.config.rect(Object.assign(Object.assign({}, groupRect), {
					background: style.color.normalBackground,
					borderRadius: style.size.borderRadius,
					borderWidth: style.size.borderWidth
				})), rotateOffset, rotateOffset);
				groupInfo.contents.forEach((content) => rotateGroup.add(content, rotateOffset - scrollLeft, rotateOffset + this.collector.size.cardGap));
				bodyContainer.addGroup(rotateGroup);
			}
		};
		return MainRenderer;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/renderer/index.js
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
var KanbanRenderer;
var init_renderer = __esmMin((() => {
	init_es();
	init_pen();
	init_performance();
	init_event_handler();
	init_main();
	init_base_renderer();
	KanbanRenderer = /* @__PURE__ */ function(BaseRenderer) {
		"use strict";
		_inherits$5(KanbanRenderer, BaseRenderer);
		function KanbanRenderer(rendererModel, root) {
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
			_this.stage.addLayer(_this.bodyLayer);
			_this.stage.addLayer(_this.headLayer);
			_this.stage.addLayer(_this.featureLayer);
			_this.mainRenderer = new MainRenderer(_this.rendererModel);
			_this._register(_this.rendererModel.onRenderModelChange(() => {
				_this.render();
			}));
			_this.eventHandler = _this._register(new KanbanEventHandler(_this.stage, _this.root, _this.rendererModel));
			_this.UIEvent = _this.eventHandler.UIEvent;
			return _this;
		}
		var _proto = KanbanRenderer.prototype;
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.featureLayer;
		};
		_proto.render = function render() {
			if (!this.isRendering) {
				this.isRendering = true;
				requestAnimationFrame(() => {
					var _a;
					if (((_a = this.collector.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) !== ViewType.KANBAN) return;
					performanceReport.common.markRenderStart();
					this.rendererModel.collector.card.collectVisible();
					this.renderMain();
					this.renderFeature();
					performanceReport.common.markRenderEnd(this.collector.dataUtil.getContext());
					this.isRendering = false;
				});
			}
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
		_create_class$2(KanbanRenderer, [
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
						y: size.headRect.height * scale,
						width: size.globalOriginRootWidth,
						height: size.bodyRect.height * scale
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
		return KanbanRenderer;
	}(BaseRenderer);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/collector/card.js
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
var import_cloneDeep, import_main, CardCollector;
var init_card = __esmMin((() => {
	import_cloneDeep = /* @__PURE__ */ __toESM(require_cloneDeep());
	init_event();
	import_main = require_main();
	init_field_collector();
	init_field_fixed_height();
	init_utils();
	init_card_single();
	CardCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$4(CardCollector, Disposable);
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
				maxLines: 4,
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
			this.beforeCollect();
		};
		_proto.collect = function collect() {
			this.beforeCollect();
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
				var { x, width } = this.head.getGroupInfo(groupIndex).rect;
				cardInfo.card = this.collectCardInfo(recordId, x, width);
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
		_proto.beforeCollect = function beforeCollect() {
			this.groupInfos.clear();
		};
		_proto.collectCards = function collectCards() {
			var _a;
			if (this.state.isExporting() || ((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll)) this.collectAll();
			else this.collectVisible();
		};
		_proto.collectAll = function collectAll() {
			for (var groupIndex = 0; groupIndex < this.head.getGroupCount(); groupIndex++) this.collectByGroup(groupIndex, true);
		};
		/**
		* 按分组收集可视的卡片信息
		* @param groupIndex 分组下标
		* @param collectAll 是否全量收集
		*/ _proto.collectByGroup = function collectByGroup(groupIndex, collectAll = false) {
			var groups = this.dataUtil.getGroups();
			if (!groups || groupIndex > groups.groupIds.length || this.state.isFoldGroup(groupIndex)) return;
			var groupId = groups.groupIds[groupIndex];
			var recordIds = groups.groupRecordIds.get(groupId);
			if (!(recordIds === null || recordIds === void 0 ? void 0 : recordIds.length)) return;
			var groupInfo = this.getGroupInfo(groupIndex);
			this.collectCardInfoByGroup(groupIndex, groupInfo, recordIds, collectAll);
		};
		_proto.getGroupInfo = function getGroupInfo(groupIndex) {
			var groupInfo = this.groupInfos.get(groupIndex);
			if (!groupInfo) {
				var cardInfos = /* @__PURE__ */ new Map();
				var groups = this.dataUtil.getGroups();
				if (!groups || groupIndex > groups.groupIds.length) return;
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
			var { x: startX, width: cardWidth } = this.head.getGroupInfo(groupIndex).rect;
			var groupScrollTop = this.range.getGroupScrollTop(groupIndex);
			var virtualList = this.range.getVirtualList(groupIndex);
			if (!virtualList) return;
			var visibleEndY = groupScrollTop + this.size.groupCardVisibleHeight;
			var startIndex = collectAll ? 0 : this.range.findRecordByScrollTop(virtualList, groupScrollTop);
			var offset = 0;
			for (var index = startIndex; index < recordIds.length; index++) {
				virtualList[index].startY += offset;
				if (!collectAll && virtualList[index].startY > visibleEndY) continue;
				var recordId = recordIds[index];
				var recordCardInfo = groupInfo.get(recordId);
				if (!recordCardInfo || (recordCardInfo === null || recordCardInfo === void 0 ? void 0 : recordCardInfo.card)) continue;
				recordCardInfo.card = this.collectCardInfo(recordId, startX, cardWidth);
				groupInfo.set(recordId, recordCardInfo);
				offset += recordCardInfo.card.rect.height - this.range.virtualHeight;
			}
			if (groupInfo.size) this.groupInfos.set(groupIndex, groupInfo);
			this.updateGroupYInfoAfterCollect(groupIndex, groupInfo);
			if (offset === 0) return;
			this.collectCardInfoByGroup(groupIndex, groupInfo, recordIds, collectAll);
		};
		_proto.collectCardInfo = function collectCardInfo(recordId, startX, cardWidth) {
			var option = this.getCollectOption(recordId, startX, cardWidth);
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
			var coverInfo;
			if (cardConfig.isShowCover) coverInfo = this.cardSingle.collectCover(cardConfig.coverFieldId, contentStartY, option);
			if (coverInfo === null || coverInfo === void 0 ? void 0 : coverInfo.contents.length) {
				cardInfo.contents.push(...coverInfo.contents);
				contentStartY += coverInfo.takeHeight + option.cardContentGap;
				cardInfo.rect.height += coverInfo.takeHeight + option.cardContentGap;
			} else {
				contentStartY += option.cardPadding;
				cardInfo.rect.height += option.cardPadding;
			}
			var primaryInfo = this.cardSingle.collectPrimaryTitle(contentStartY, option, fieldFixedContent.getFixedContentDrawHeight.bind(fieldFixedContent));
			if (primaryInfo) {
				cardInfo.contents.push(...primaryInfo.contents);
				contentStartY += primaryInfo.takeHeight + option.cardContentGap;
				cardInfo.rect.height += primaryInfo.takeHeight;
			}
			var cellInfo = this.cardSingle.collectCellContents(contentStartY, option, cardConfig.isShowFieldTitle);
			if (cellInfo === null || cellInfo === void 0 ? void 0 : cellInfo.contents.length) {
				cardInfo.contents.push(...cellInfo.contents);
				cardInfo.rect.height += cellInfo.takeHeight;
				contentStartY += cellInfo.takeHeight;
			}
			this.collectLastContent(cardInfo, cardConfig, contentStartY, option);
			return cardInfo;
		};
		/**
		* 收集最后固定的内容（点赞和内边距）
		*/ _proto.collectLastContent = function collectLastContent(cardInfo, cardConfig, contentStartY, option) {
			if (cardConfig.isShowInteractionData) {
				var interactionInfo = this.cardSingle.collectInteraction(contentStartY, option);
				if (interactionInfo) {
					cardInfo.contents.push(...interactionInfo.contents);
					cardInfo.rect.height += interactionInfo.takeHeight + option.cardContentGap;
				}
			}
			cardInfo.rect.height += option.cardPadding;
		};
		_proto.updateGroupYInfoAfterCollect = function updateGroupYInfoAfterCollect(groupIndex, groupInfo) {
			var virtualList = this.range.getVirtualList(groupIndex);
			if (!virtualList) return;
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
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/collector/head.js
var HeadCollector;
var init_head = __esmMin((() => {
	init_esm();
	init_es();
	init_es$1();
	init_field_collector();
	init_pen();
	init_resources();
	init_style();
	HeadCollector = /* @__PURE__ */ function() {
		"use strict";
		function HeadCollector(dataUtil, state, size, status) {
			this.dataUtil = dataUtil;
			this.state = state;
			this.size = size;
			this.status = status;
			this.groupInfos = /* @__PURE__ */ new Map();
			this.collectConfig = fieldCollector.getDefaultConfig({ labelConfig: {
				tagHeight: style.size.iconLarge,
				fontSize: style.size.fontSizeLarge
			} });
		}
		var _proto = HeadCollector.prototype;
		_proto.collect = function collect() {
			this.beforeCollect();
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
		/**
		* 获取总列数（卡片数量 + 添加分组）
		* @returns
		*/ _proto.getGroupCount = function getGroupCount() {
			return this.groupInfos.size;
		};
		_proto.beforeCollect = function beforeCollect() {
			this.groupInfos.clear();
		};
		_proto.collectGroupInfos = function collectGroupInfos() {
			var groupInfo = this.dataUtil.getGroups();
			var groupField = this.dataUtil.getFieldByFieldId(this.dataUtil.getGroupFieldId());
			if (!groupInfo || !groupField) return;
			var globalWidth = this.size.globalPaddingLeft;
			var { groupIds, groupValues, groupRecordIds } = groupInfo;
			var groupLength = groupIds.length;
			for (var index = 0; index < groupLength; index++) {
				var groupId = groupIds[index];
				var groupValue = groupValues.get(groupId);
				var groupRecordId = groupRecordIds.get(groupId);
				if (groupValue === void 0 || !groupRecordId) continue;
				var groupInfo1 = this.collectGroupInfo(groupId, groupField, groupValue, groupRecordId.length, globalWidth);
				if (groupInfo1) this.groupInfos.set(index, groupInfo1);
				globalWidth += groupInfo1.rect.width + this.size.headGroupMarginRight;
			}
			var insertInfo = this.collectInsertInfo(globalWidth, groupField.type);
			if (insertInfo) {
				this.groupInfos.set(groupLength, insertInfo);
				globalWidth += insertInfo.rect.width;
			}
			globalWidth += this.size.globalPaddingRight;
			this.size.setGlobalWidth(globalWidth);
		};
		_proto.collectGroupInfo = function collectGroupInfo(groupId, groupField, groupValue, counts, globalWidth) {
			var groupInfo = {
				counts,
				fold: this.state.isFoldGroup(groupId),
				rect: {
					x: globalWidth,
					y: this.size.globalPaddingTop,
					width: this.size.cardWidth,
					height: this.size.headHeight
				},
				contents: [],
				groupId
			};
			var labelContentRect = Object.assign(Object.assign({}, groupInfo.rect), {
				x: groupInfo.fold ? groupInfo.rect.x + this.size.headFoldPadding : groupInfo.rect.x + this.size.headLabelMarginLeft,
				width: this.size.headLabelMaxWidth
			});
			var contentHeight = this.collectConfig.labelConfig.tagHeight || style.size.iconLarge;
			labelContentRect.y = labelContentRect.y + (labelContentRect.height - contentHeight) / 2;
			labelContentRect.height = contentHeight;
			var ungroupAssembleCell;
			if (groupValue === null || groupValue.data.length === 0) ungroupAssembleCell = {
				sourceType: FieldType.TEXT,
				data: [{ text: i18n.t("未分组") }]
			};
			var fontStyle = ungroupAssembleCell ? "bold" : "normal";
			this.collectConfig.textConfig.fontStyle = fontStyle;
			this.collectConfig.labelConfig.fontStyle = fontStyle;
			var contents = fieldCollector.collect(labelContentRect, this.collectConfig, ungroupAssembleCell || groupValue, groupField);
			if (contents.length === 0) return groupInfo;
			groupInfo.contents.push(...contents);
			var contentWidth = fieldCollector.measureWidth((ungroupAssembleCell === null || ungroupAssembleCell === void 0 ? void 0 : ungroupAssembleCell.sourceType) || groupField, contents);
			var countTextRect = Object.assign(Object.assign({}, labelContentRect), {
				x: labelContentRect.x + contentWidth + this.size.headCountTextMarginLeft,
				width: groupInfo.rect.width - contentWidth - this.size.headCountTextMarginLeft * 2
			});
			groupInfo.contents.push(pen.config.text(Object.assign(Object.assign({ text: i18n.t("{{count}}项", { count: counts.toLocaleString() }) }, countTextRect), {
				color: style.color.lightUltraFontColor,
				fontSize: style.size.fontSizeSmall
			})));
			if (ua.isMobile && !this.state.isFoldGroup(groupId)) groupInfo.contents.push(pen.config.icon(NormalIconAlias.MENU_MORE, {
				x: groupInfo.rect.x + groupInfo.rect.width - style.size.iconNormal,
				y: labelContentRect.y + (labelContentRect.height - style.size.iconNormal) / 2,
				width: style.size.iconNormal,
				height: style.size.iconNormal
			}));
			if (groupInfo.fold) {
				groupInfo.rect.width = this.size.cardFoldWidth;
				groupInfo.rect.height += this.size.cardGap;
			}
			return groupInfo;
		};
		_proto.collectInsertInfo = function collectInsertInfo(startX, groupFieldType) {
			if (!this.status.canInsertGroup || ua.isMobile || isUserField(groupFieldType)) return;
			var groupInfo = {
				counts: 0,
				fold: false,
				rect: {
					x: startX,
					y: this.size.globalPaddingTop,
					width: this.size.cardWidth,
					height: this.size.headHeight
				},
				contents: []
			};
			var iconRect = {
				x: startX + this.size.headLabelMarginLeft,
				y: this.size.globalPaddingTop + (this.size.headHeight - style.size.iconNormal) / 2,
				width: style.size.iconNormal,
				height: style.size.iconNormal
			};
			groupInfo.contents.push(pen.config.icon(NormalIconAlias.ADD, iconRect));
			groupInfo.contents.push(pen.config.text({
				text: i18n.t("新建分组"),
				x: iconRect.x + iconRect.width + this.size.headLabelMarginLeft,
				y: this.size.globalPaddingTop,
				width: this.size.cardWidth - iconRect.width,
				height: this.size.headHeight,
				color: style.color.lightFontColor
			}));
			return groupInfo;
		};
		return HeadCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/collector/size.js
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
var SizeCollector;
var init_size = __esmMin((() => {
	init_esm();
	init_es$1();
	init_render_app_config();
	init_index_interface();
	init_style();
	init_size$1();
	SizeCollector = /* @__PURE__ */ function(BaseSizeCollector) {
		"use strict";
		_inherits$3(SizeCollector, BaseSizeCollector);
		function SizeCollector(dataUtil) {
			var _this = BaseSizeCollector.call(this, dataUtil) || this;
			_this.dataUtil = dataUtil;
			_this.headHeight = 42;
			_this.headLabelMaxWidth = 150;
			_this.headLabelMarginLeft = 4;
			_this.headCountTextMarginLeft = 10;
			_this.headGroupMarginRight = ua.isMobile ? 12 : 16;
			_this.cardWidth = ua.isMobile ? 250 : 232;
			_this.cardFoldWidth = 50;
			_this.cardMarginTop = 10;
			_this.cardAddButtonHeight = _this.dataUtil.getStatus().canInsertRecordInGroup ? 38 : 0;
			_this.cardCoverHeight = ua.isMobile ? 180 : 120;
			_this.cardPadding = 12;
			_this.cardContentGap = 12;
			_this.cardFieldTitleGap = 8;
			_this.cardGap = ua.isMobile ? 8 : 6;
			_this.cardFieldTitleHeight = 14;
			_this.cardPrimaryFieldHeight = 20;
			_this.cardInteractionSize = style.size.iconLarge;
			_this.$globalWidth = 0;
			return _this;
		}
		var _proto = SizeCollector.prototype;
		/**
		* 设置全局宽度
		* @param width
		*/ _proto.setGlobalWidth = function setGlobalWidth(width) {
			this.$globalWidth = width;
		};
		_create_class$1(SizeCollector, [
			{
				key: "cardBorderRadius",
				get: function() {
					return style.size.borderRadius;
				}
			},
			{
				key: "globalPaddingLeft",
				get: function() {
					var { globalPaddingLeft } = this.sizeConfig;
					if (globalPaddingLeft !== void 0) return globalPaddingLeft;
					return 16;
				}
			},
			{
				key: "globalPaddingRight",
				get: function() {
					var { globalPaddingRight } = this.sizeConfig;
					if (globalPaddingRight !== void 0) return globalPaddingRight;
					return 16;
				}
			},
			{
				key: "globalPaddingTop",
				get: function() {
					var { globalPaddingTop } = this.sizeConfig;
					if (globalPaddingTop !== void 0) return globalPaddingTop;
					return 0;
				}
			},
			{
				key: "globalPaddingBottom",
				get: function() {
					var { globalPaddingBottom } = this.sizeConfig;
					if (globalPaddingBottom !== void 0) return globalPaddingBottom;
					return ua.isMobile ? 80 : 10;
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
				key: "globalWidth",
				get: function() {
					return this.$globalWidth;
				}
			},
			{
				key: "groupCardVisibleStartY",
				get: function() {
					return this.globalPaddingTop + this.headHeight - (ua.isMobile ? style.size.tagPaddingTop : 0);
				}
			},
			{
				key: "groupCardVisibleEndY",
				get: function() {
					return this.rootHeight - this.cardPadding - this.cardAddButtonHeight - this.globalPaddingBottom;
				}
			},
			{
				key: "groupCardVisibleHeight",
				get: function() {
					return this.groupCardVisibleEndY - this.groupCardVisibleStartY;
				}
			},
			{
				key: "headFoldPadding",
				get: function() {
					return 12;
				}
			},
			{
				key: "sizeConfig",
				get: function() {
					var _a, _b;
					return (_b = (_a = renderAppConfigService.getConfig()[RenderAppConfigKey.SIZE_CONFIG]) === null || _a === void 0 ? void 0 : _a[ViewType$1.KANBAN]) !== null && _b !== void 0 ? _b : {};
				}
			}
		]);
		return SizeCollector;
	}(BaseSizeCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/collector/index.js
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
var KanbanCollector;
var init_collector = __esmMin((() => {
	init_resources();
	init_card();
	init_data_util();
	init_head();
	init_range();
	init_size();
	init_state();
	init_collector$1();
	KanbanCollector = /* @__PURE__ */ function(BaseCollector) {
		"use strict";
		_inherits$2(KanbanCollector, BaseCollector);
		function KanbanCollector(context, status) {
			var _this = BaseCollector.call(this, context) || this;
			_this.context = context;
			_this.status = status;
			_this.dataUtil = _this._register(new DataUtil(_this.context, _this.status));
			_this.state = new StateCenter(_this.dataUtil);
			_this.size = _this._register(new SizeCollector(_this.dataUtil));
			_this.head = new HeadCollector(_this.dataUtil, _this.state, _this.size, _this.status);
			_this.range = _this._register(new RangeCollector(_this.dataUtil, _this.state, _this.size, _this.head));
			_this.card = _this._register(new CardCollector(_this.dataUtil, _this.state, _this.size, _this.head, _this.range, _this.status));
			return _this;
		}
		var _proto = KanbanCollector.prototype;
		_proto.handleCollect = function handleCollect() {
			this.size.collect();
			this.head.collect();
			this.range.collect();
			this.card.collect();
		};
		_proto.handlePatch = function handlePatch(mutations) {
			this.dataUtil.patch();
			this.size.patch();
			this.head.patch(mutations);
			this.range.patch(mutations);
			this.card.patch();
		};
		_proto.handleResize = function handleResize(scale) {
			this.size.setScale(scale);
			if (this.state.isExporting()) resourceLoader.refreshLoadingCount();
			this.size.patch();
			this.range.patch();
			this.card.patch();
		};
		return KanbanCollector;
	}(BaseCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/renderer-model/index.js
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
var KanbanRendererModel;
var init_renderer_model = __esmMin((() => {
	init_event();
	init_groupable_status();
	init_collector();
	init_base_renderer_model();
	KanbanRendererModel = /* @__PURE__ */ function(BaseRendererModel) {
		"use strict";
		_inherits$1(KanbanRendererModel, BaseRendererModel);
		function KanbanRendererModel(context) {
			var _this = BaseRendererModel.call(this, context) || this;
			_this.context = context;
			_this.onRenderModelChangeEmitter = _this._register(new Emitter());
			_this.status = new GroupableStatus(context.getCurrentTable(), context.getCurrentView(), context.getCore());
			_this.onRenderModelChange = _this.onRenderModelChangeEmitter.event;
			_this.collector = _this._register(new KanbanCollector(_this.context, _this.status));
			_this.collector.collect();
			_this._register(_this.collector.card.onContentChange(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			_this._register(_this.collector.range.onScroll(() => {
				_this.onRenderModelChangeEmitter.fire();
			}));
			return _this;
		}
		var _proto = KanbanRendererModel.prototype;
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
		return KanbanRendererModel;
	}(BaseRendererModel);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/index.js
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
var KanbanView;
var init_kanban = __esmMin((() => {
	init_esm();
	init_common_view();
	init_entries$1();
	init_entries();
	init_renderer();
	init_renderer_model();
	KanbanView = /* @__PURE__ */ function(KanbanCommonView) {
		"use strict";
		_inherits(KanbanView, KanbanCommonView);
		function KanbanView(context) {
			var _this = KanbanCommonView.call(this, context) || this;
			_this.initFeatures();
			return _this;
		}
		var _proto = KanbanView.prototype;
		_proto.initFeatures = function initFeatures() {
			(ua.isPC ? getPcFeatures() : getMobileFeatures()).forEach((featureOption) => this.installFeature(featureOption));
		};
		_proto.createRendererModel = function createRendererModel() {
			return new KanbanRendererModel(this.context);
		};
		_proto.createRenderer = function createRenderer() {
			return new KanbanRenderer(this.rendererModel, this.context.getRenderRoot());
		};
		/** kanban 的 collector 类型与 getRectVisibleInfo 的预期一致，无需做兄弟类适配。 */ _proto.getCollectorForVisibility = function getCollectorForVisibility() {
			return this.collector;
		};
		_create_class(KanbanView, [{
			key: "groupMargin",
			get: function() {
				return this.collector.size.headGroupMarginRight;
			}
		}]);
		return KanbanView;
	}(KanbanCommonView);
}));
//#endregion
export { init_kanban as n, KanbanView as t };
