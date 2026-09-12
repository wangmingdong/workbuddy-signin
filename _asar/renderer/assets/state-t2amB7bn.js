import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { Dn as require_main, Sn as init_module, _n as Emitter, kn as createDecorator, vn as init_event } from "./esm-cVQVEiWG.js";
import { $i as MutationId, $l as init_es, Iu as WeblogReportKey, Vl as ViewType, Yu as logger, _o as isUserField, bd as SmartSheetEventName, ql as FieldType, wd as i18n, yd as fireEvent } from "./execution-result-erkS5q1j.js";
import { n as init_esm, r as ua } from "./esm-mgJiqgJI.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { At as init_utils, B as init_feature_single, F as init_scroller, H as pen, I as init_register_esc_to_cancel, It as XDirection, L as registerEscToCancel, Lt as YDirection, P as CommonScroller, R as BaseFeature, Rt as init_common, V as init_pen, d as getStorageValue, f as init_storage_sync, h as init_data_util$1, kt as getScrollConfig, m as BaseCollectorDataUtil, ot as Cursor, p as setStorageValue, st as init_cursor, vt as init_style, yt as style } from "./canvas-view-DDuMsrmC.js";
import { n as init_auto_scroll$1, t as AutoScroll } from "./auto-scroll-Cn43Kqkt.js";
import { a as init_binary_search, i as binarySearch } from "./common-action-BPA9xdl-.js";
import { i as init_scroll_info, n as init_fix_scroll_delta, r as getScrollTipInfo, t as fixScrollDelta } from "./fix-scroll-delta-C4NjXGCK.js";
import { a as calcCardHeight, f as CommonCardActive, h as init_action$1, i as init_collector_state, m as CardAction, n as init_view, o as init_calc_card_heigth, p as init_card_active$1, r as BaseStateCenter, t as KanbanGalleryView } from "./view-DGZEPJsr.js";
import { n as Snackbar_default, t as init_esm$1 } from "./esm-F18mgxoZ.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/utils/get-groupindex-by-record.js
function getGroupIndexByRecordId(recordId, dataUtil) {
	var groups = dataUtil.getGroups();
	if (!recordId || !groups) return -1;
	var groupId = null;
	for (var [key, recordIds] of groups.groupRecordIds) if (recordIds.includes(recordId)) {
		groupId = key;
		break;
	}
	if (groupId === void 0) return -1;
	return groups.groupIds.indexOf(groupId);
}
function getGroupIndexListByRecordId(recordId, dataUtil) {
	var groups = dataUtil.getGroups();
	var groupIndexList = [];
	if (!recordId || !groups) return groupIndexList;
	for (var [key, recordIds] of groups.groupRecordIds) if (recordIds.includes(recordId)) groupIndexList.push(groups.groupIds.indexOf(key));
	return groupIndexList;
}
var init_get_groupindex_by_record = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/utils/get-rect-visible-info.js
var getRectVisibleInfo;
var init_get_rect_visible_info = __esmMin((() => {
	init_common();
	getRectVisibleInfo = (rect, groupIndex, collector) => {
		var activityViewWidth = collector.size.globalRect.width;
		var activityViewHeight = collector.size.groupCardVisibleHeight;
		var { x, y, width, height } = rect;
		var xDirection = XDirection.NONE;
		var yDirection = YDirection.NONE;
		var offsetX = collector.range.scrollLeft;
		var offsetY = collector.range.getGroupScrollTop(groupIndex);
		if (x < offsetX) xDirection = XDirection.LEFT;
		if (x + width >= activityViewWidth + offsetX) xDirection = XDirection.RIGHT;
		if (y <= offsetY) yDirection = YDirection.UP;
		if (y + height > offsetY + activityViewHeight) if (height > activityViewHeight) yDirection = YDirection.UP;
		else yDirection = YDirection.DOWN;
		return {
			xDirection,
			yDirection,
			isVisible: xDirection === XDirection.NONE && yDirection === YDirection.NONE
		};
	};
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/common-view.js
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
var KanbanCommonView;
var init_common_view = __esmMin((() => {
	init_es();
	init_es$1();
	init_common();
	init_utils();
	init_get_groupindex_by_record();
	init_get_rect_visible_info();
	init_view();
	init_fix_scroll_delta();
	KanbanCommonView = /* @__PURE__ */ function(KanbanGalleryView) {
		"use strict";
		_inherits$10(KanbanCommonView, KanbanGalleryView);
		function KanbanCommonView() {
			var _this = KanbanGalleryView.apply(this, arguments) || this;
			_this.scrollGroupIndex = -1;
			return _this;
		}
		var _proto = KanbanCommonView.prototype;
		_proto.getType = function getType() {
			return ViewType.KANBAN;
		};
		_proto.getStatus = function getStatus() {
			return this.rendererModel.getStatus();
		};
		_proto.getFeatureLayer = function getFeatureLayer() {
			return this.renderer.getFeatureLayer();
		};
		_proto.getScrollGroupIndex = function getScrollGroupIndex() {
			return this.scrollGroupIndex;
		};
		_proto.renderGroupHead = function renderGroupHead(headContainer, groupIndex, x, y) {
			this.renderer.renderGroupHead(headContainer, groupIndex, x, y);
		};
		_proto.renderGroupBody = function renderGroupBody(bodyContainer, groupIndex, x, headY, bodyY) {
			this.renderer.renderGroupBody(bodyContainer, groupIndex, x, headY, bodyY);
		};
		_proto.scrollToX = function scrollToX(scrollLeft) {
			this.rendererModel.collector.range.updateScrollLeft(scrollLeft);
			this.render();
		};
		_proto.scrollToGroupY = function scrollToGroupY(groupIndex, scrollTop) {
			this.rendererModel.scrollToGroupY(groupIndex, scrollTop);
			this.render();
		};
		_proto.scrollCardToVisibility = function scrollCardToVisibility(recordId) {
			var _a, _b;
			var groupIndex = getGroupIndexByRecordId(recordId, this.rendererModel.collector.dataUtil);
			var cardInfo = this.rendererModel.collector.card.getCardInfo(groupIndex, recordId);
			if (!cardInfo) return;
			var { isVisible, xDirection, yDirection } = getRectVisibleInfo(cardInfo.rect, groupIndex, this.getCollectorForVisibility());
			if (isVisible) return;
			var { x, y, width, height } = cardInfo.rect;
			var offsetX = this.rendererModel.collector.range.scrollLeft;
			var offsetY = this.rendererModel.collector.range.getGroupScrollTop(groupIndex);
			var activityViewWidth = this.rendererModel.collector.size.globalRect.width;
			var activityViewHeight = this.rendererModel.collector.size.groupCardVisibleHeight;
			var scrollX = offsetX;
			var scrollY = offsetY;
			if (xDirection === XDirection.LEFT) scrollX = x;
			else if (xDirection === XDirection.RIGHT) scrollX = x + width - activityViewWidth;
			if (yDirection === YDirection.UP) scrollY = y;
			else if (yDirection === YDirection.DOWN) scrollY = y + height - activityViewHeight;
			if ((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterHorizontalScroll) fireEvent.execute(SmartSheetEventName.INNER_TO_OUTER_VIEWPORT_SCROLL, {
				deltaX: scrollX - this.rendererModel.collector.range.scrollLeft,
				deltaY: 0,
				editorId: this.context.getId()
			});
			else this.rendererModel.collector.range.updateScrollLeft(scrollX);
			if ((_b = getScrollConfig(this.context.getId())) === null || _b === void 0 ? void 0 : _b.useOuterVerticalScroll) fireEvent.execute(SmartSheetEventName.INNER_TO_OUTER_VIEWPORT_SCROLL, {
				deltaY: scrollY - this.rendererModel.collector.range.getGroupScrollTop(groupIndex),
				deltaX: 0,
				editorId: this.context.getId()
			});
			else this.rendererModel.collector.range.updateGroupScrollTop(groupIndex, scrollY);
			this.rendererModel.collector.range.setGroupFixOffset(groupIndex, cardInfo.index, cardInfo.rect.y + cardInfo.rect.height - scrollY);
		};
		_proto.getContextMenuActivePoint = function getContextMenuActivePoint() {
			var { collector } = this;
			var { recordId, groupIndex } = collector.state.getContextMenuActivePoint();
			var groups = collector.dataUtil.getGroups();
			return {
				recordId,
				groupPath: [groups === null || groups === void 0 ? void 0 : groups.groupIds[groupIndex]]
			};
		};
		_proto.isGroupFieldMultiple = function isGroupFieldMultiple() {
			var { collector } = this;
			var fieldId = collector.dataUtil.getGroupFieldId();
			var field = collector.dataUtil.getFieldByFieldId(fieldId);
			if (!field) return false;
			var fieldType = field.getType();
			if (fieldType === FieldType.LINK_RECORDS || fieldType === FieldType.TWO_WAY_LINK_RECORDS || fieldType === FieldType.MULTIPLE_SELECT) return true;
			if (fieldType === FieldType.SINGLE_SELECT) return false;
			if (isUserField(fieldType)) return field.getProperty().isMultiple;
			return false;
		};
		_proto.getFirstGroupFieldId = function getFirstGroupFieldId() {
			return this.collector.dataUtil.getGroupFieldId();
		};
		_proto.getGroupIndexes = function getGroupIndexes(recordId) {
			var groups = this.collector.dataUtil.getGroups();
			if (!groups) return [];
			var indexes = [];
			for (var [groupPath, recordIds] of groups.groupRecordIds.entries()) if (recordIds.includes(recordId)) indexes.push(groups.groupIds.indexOf(groupPath));
			return indexes;
		};
		_proto.getCardIndex = function getCardIndex(recordId, groupPosition) {
			var _a, _b, _c;
			var groups = this.collector.dataUtil.getGroups();
			if (!((_a = groups === null || groups === void 0 ? void 0 : groups.groupRecordIds) === null || _a === void 0 ? void 0 : _a.size)) return -1;
			var recordIds = [];
			if (groupPosition.groupKey !== void 0) recordIds = (_b = groups.groupRecordIds.get(groupPosition.groupKey)) !== null && _b !== void 0 ? _b : [];
			else if (groupPosition.groupIndex !== void 0) recordIds = [...groups.groupRecordIds.values()][groupPosition.groupIndex];
			return (_c = recordIds === null || recordIds === void 0 ? void 0 : recordIds.indexOf(recordId)) !== null && _c !== void 0 ? _c : -1;
		};
		_proto.getGroupCardY = function getGroupCardY(groupIndex, cardIndex) {
			var _a;
			var cardList = (_a = this.collector.range.getVirtualList(groupIndex)) !== null && _a !== void 0 ? _a : [];
			if (!cardList[cardIndex]) {
				logger.error("getGroupCardY", `Cannot read properties of undefined (reading 'startY') ${groupIndex} ${cardIndex}`);
				logger.report(WeblogReportKey.JS_ERROR, {}, { message: `Cannot read properties of undefined (reading 'startY')` });
				return [0];
			}
			return [cardList[cardIndex].startY];
		};
		_proto.getGroupX = function getGroupX(groupIndex) {
			var _a, _b;
			return [(_b = (_a = this.collector.head.getGroupInfo(groupIndex)) === null || _a === void 0 ? void 0 : _a.rect.x) !== null && _b !== void 0 ? _b : 0];
		};
		_proto.getGroupOffsetY = function getGroupOffsetY(groupIndex) {
			return this.collector.range.getGroupScrollTop(groupIndex);
		};
		_proto.getOffsetX = function getOffsetX() {
			return this.collector.range.scrollLeft;
		};
		_proto.getCardHeight = function getCardHeight(groupIndex, cardIndex) {
			var _a;
			var cardList = this.collector.range.getVirtualList(groupIndex);
			if (!(cardList === null || cardList === void 0 ? void 0 : cardList[cardIndex])) return 0;
			var cardInfo = this.collector.card.getCardInfo(groupIndex, cardList[cardIndex].recordId);
			return (_a = cardInfo === null || cardInfo === void 0 ? void 0 : cardInfo.rect.height) !== null && _a !== void 0 ? _a : 0;
		};
		_proto.getGroupHeadInfo = function getGroupHeadInfo(layoutIndex) {
			var newInfo = this.collector.head.getGroupInfo(layoutIndex);
			if (newInfo) return Object.assign(Object.assign({}, newInfo), { path: newInfo.groupId ? [newInfo.groupId] : [] });
		};
		_proto.isHiddenRecord = function isHiddenRecord(recordId) {
			return this.collector.state.isFoldGroup(recordId);
		};
		_proto.getTarget = function getTarget(evtOffsetX, evtOffsetY) {
			return this.renderer.getTarget(evtOffsetX, evtOffsetY);
		};
		_proto.getGroupInfo = function getGroupInfo(groupIndex) {
			return {
				scrollHeight: this.collector.range.getGroupTotalHeight(groupIndex),
				viewHeight: this.collector.size.groupCardVisibleHeight
			};
		};
		_proto.getGroupCollapsePath = function getGroupCollapsePath(groupIndex) {
			return groupIndex;
		};
		_proto.isFoldedInStorage = function isFoldedInStorage(groupIndex) {
			return this.collector.state.isFoldGroup(groupIndex);
		};
		_proto.updateFoldedStatusInStorage = function updateFoldedStatusInStorage(groupIndex, newFoldStatus) {
			var groups = this.collector.dataUtil.getGroups();
			if (!(groups === null || groups === void 0 ? void 0 : groups.groupIds)) return;
			var groupId = groups.groupIds[groupIndex];
			this.collector.state.setFoldGroup(groupId, newFoldStatus);
			this.collector.collect();
		};
		_proto.getDisplayGroups = function getDisplayGroups() {
			return this.collector.dataUtil.getGroups();
		};
		_proto.getXAxis = function getXAxis() {
			var { scale } = this.collector.size;
			var headInfos = this.collector.head.getGroupInfos();
			var infoValues = Array.from(headInfos.values()).filter((info) => info.groupId !== void 0);
			return headInfos.size ? infoValues.map((info) => [info.rect.x * scale, (info.rect.x + info.rect.width) * scale]) : [];
		};
		_proto.getGroupId = function getGroupId(groupIndex) {
			var _a;
			return (_a = this.collector.dataUtil.getGroups()) === null || _a === void 0 ? void 0 : _a.groupIds[groupIndex];
		};
		_proto.getActivityRect = function getActivityRect() {
			var { globalRect } = this.collector.size;
			return {
				activityStartX: globalRect.x,
				activityStartY: globalRect.y,
				activityViewWidth: globalRect.width,
				activityViewHeight: globalRect.height
			};
		};
		_proto.beforeExport = function beforeExport() {
			KanbanGalleryView.prototype.beforeExport.call(this);
			this.collector.patch();
			var groups = this.rendererModel.collector.dataUtil.getGroups();
			if (!groups) return false;
			var totalHeights = [];
			var totalHeight = 0;
			groups.groupIds.forEach((_, groupIndex) => {
				var groupHeight = this.rendererModel.collector.range.getGroupTotalHeight(groupIndex);
				totalHeights.push(groupHeight);
			});
			var maxGroupHeight = Math.max(...totalHeights);
			var totalWidth = this.rendererModel.collector.size.globalWidth;
			var { size } = this.rendererModel.collector;
			totalHeight = maxGroupHeight + size.groupCardVisibleStartY + size.globalPaddingTop + size.globalPaddingBottom + size.cardAddButtonHeight + size.cardMarginTop;
			if (totalHeight > 2e4) return false;
			this.setRootSize(totalWidth, totalHeight);
			return true;
		};
		/**
		* 截取规则：
		* 1. 不需要到截取新建分组
		* 2. 如果分组或者卡片比较少，不需要截取空白区域
		* 3. Puppeteer 窗口尺寸 1920 * 934
		* 4. 需要截取到表公告
		*/ _proto.getPreviewTplRect = function getPreviewTplRect() {
			var _a, _b, _c;
			var x = this.globalPaddingLeft;
			var clientRect = this.getTableDescRect();
			var y = (_a = clientRect === null || clientRect === void 0 ? void 0 : clientRect.y) !== null && _a !== void 0 ? _a : 0 + this.globalPaddingTop;
			var height = this.getPreviewTplHeight(clientRect);
			var xAxis = this.getXAxis();
			var index = xAxis.findIndex((axis) => axis[1] > this.collector.size.globalRect.width);
			if (index < 0) index = xAxis.length - 1;
			else index -= 1;
			return {
				x,
				y,
				width: (_c = (_b = xAxis[index]) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : this.collector.size.globalRect.width,
				height
			};
		};
		_proto.scrollByDelta = function scrollByDelta(scrollInfo) {
			var _a, _b;
			var { range, size } = this.rendererModel.collector;
			var { deltaX, deltaY } = scrollInfo;
			if (deltaX) {
				var x = fixScrollDelta(deltaX, range.scrollLeft, size.globalWidth, size.rootWidth, (_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.scrollerFactor);
				range.updateScrollLeft(range.scrollLeft + x);
			}
			if (deltaY) {
				var groupIndex = range.getGroupIndexByOffsetX(Math.ceil(scrollInfo.offsetX / size.scale));
				if (groupIndex >= 0) {
					var y = fixScrollDelta(deltaY, range.getGroupScrollTop(groupIndex), range.getGroupTotalHeight(groupIndex), size.groupCardVisibleEndY - size.groupCardVisibleStartY, (_b = getScrollConfig(this.context.getId())) === null || _b === void 0 ? void 0 : _b.scrollerFactor);
					this.scrollGroupIndex = groupIndex;
					var newScrollTop = this.rendererModel.collector.range.getGroupScrollTop(groupIndex) + y;
					this.rendererModel.scrollToGroupY(groupIndex, newScrollTop);
				}
			}
		};
		_proto.scrollToTop = function scrollToTop(scrollTop) {
			var _a;
			var { range, size, dataUtil } = this.rendererModel.collector;
			var maxHeight = range.getGroupMaxTotalHeight();
			(_a = dataUtil.getGroups()) === null || _a === void 0 || _a.groupIds.forEach((_, groupIndex) => {
				var _a;
				var y = fixScrollDelta(scrollTop - this.rendererModel.collector.range.getGroupScrollTop(groupIndex), range.getGroupScrollTop(groupIndex), maxHeight, size.groupCardVisibleEndY - size.groupCardVisibleStartY, (_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.scrollerFactor);
				var newScrollTop = this.rendererModel.collector.range.getGroupScrollTop(groupIndex) + y;
				this.rendererModel.scrollToGroupY(groupIndex, newScrollTop);
			});
		};
		/**
		* 看板的高度截取比较特殊
		* 如果所有分组的高度都比窗口高度小，那就需要计算高度最大的分组高度来截取
		* 如果有分组高度比窗口高度大，那就截取窗口的高度
		* @param clientRect
		*/ _proto.getPreviewTplHeight = function getPreviewTplHeight(clientRect) {
			var _a;
			var height = (_a = clientRect === null || clientRect === void 0 ? void 0 : clientRect.height) !== null && _a !== void 0 ? _a : 0;
			var { range, size } = this.collector;
			var groupHeightMap = range.getAllGroupHeight();
			var maxHeight = 0;
			for (var index = 0; index < groupHeightMap.size; index++) {
				var groupHeight = groupHeightMap.get(index);
				if (!groupHeight) continue;
				var groupTotalHeight = groupHeight + size.cardAddButtonHeight + size.headRect.height + this.globalPaddingTop + height;
				if (groupHeight > size.groupCardVisibleHeight) return size.globalRect.height + height;
				if (groupTotalHeight <= size.groupCardVisibleHeight && groupTotalHeight >= maxHeight) maxHeight = groupHeight;
			}
			return maxHeight;
		};
		_create_class$4(KanbanCommonView, [{
			key: "groupHeadHeight",
			get: function() {
				return this.collector.size.headHeight;
			}
		}, {
			key: "groupTitleHeight",
			get: function() {
				return 24;
			}
		}]);
		return KanbanCommonView;
	}(KanbanGalleryView);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/card-active/interface.js
var IKanbanCardActive;
var init_interface$4 = __esmMin((() => {
	init_module();
	IKanbanCardActive = createDecorator("IKanbanCardActive");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/action.js
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
var KanbanAction;
var init_action = __esmMin((() => {
	init_esm();
	init_action$1();
	KanbanAction = /* @__PURE__ */ function(CardAction) {
		"use strict";
		_inherits$9(KanbanAction, CardAction);
		function KanbanAction(context, dataUtil, collector, parentApi) {
			var _this = CardAction.call(this, context, dataUtil) || this;
			_this.context = context;
			_this.dataUtil = dataUtil;
			_this.collector = collector;
			_this.parentApi = parentApi;
			return _this;
		}
		var _proto = KanbanAction.prototype;
		_proto.showHeadMoreMenu = function showHeadMoreMenu(groupIndex) {
			if (ua.isMobile) {
				this.context.emitter.service.kanbanMobileGroupMenuEditor.fire({ groupIndex });
				return;
			}
			var groups = this.dataUtil.getGroups();
			if (!(groups === null || groups === void 0 ? void 0 : groups.groupIds)) return;
			var groupId = groups.groupIds[groupIndex];
			var isUnGrouped = this.collector.state.isFoldGroup(groupId) || !groupId;
			this.context.emitter.service.kanbanGroupMenuEditor.fire({
				groupId,
				groupIndex,
				isUnGrouped
			});
		};
		_proto.addGroup = function addGroup() {
			if (this.parentApi.getStatus().canInsertGroup) this.context.emitter.service.kanbanGroupTitleEditor.fire({
				groupIndex: -1,
				isAdd: true
			});
		};
		_proto.editGroup = function editGroup(groupIndex) {
			if (this.parentApi.getStatus().canEditGroup) this.context.emitter.service.kanbanGroupTitleEditor.fire({ groupIndex });
		};
		_proto.addRecord = function addRecord(groupIndex) {
			var _a;
			if (this.parentApi.getStatus().canInsertRecordInGroup) {
				var groupPath = [(((_a = this.dataUtil.getGroups()) === null || _a === void 0 ? void 0 : _a.groupIds) || [])[groupIndex]];
				var index = this.dataUtil.getAllRecordIds().length;
				this.context.emitter.service.addRecordClickEmitter.fire({
					insertIndex: index,
					groupPath
				});
			}
		};
		_proto.updateGroupFoldStatus = function updateGroupFoldStatus(groupIndex) {
			var groups = this.dataUtil.getGroups();
			if (!(groups === null || groups === void 0 ? void 0 : groups.groupIds)) return;
			var groupId = groups.groupIds[groupIndex];
			this.collector.state.toggleFoldGroup(groupId);
			this.collector.patch();
			this.parentApi.render();
		};
		_proto.getScale = function getScale() {
			return this.collector.size.scale;
		};
		return KanbanAction;
	}(CardAction);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/kanban-feature.js
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
var KanbanFeatureBase;
var init_kanban_feature = __esmMin((() => {
	init_action();
	init_feature_single();
	KanbanFeatureBase = /* @__PURE__ */ function(BaseFeature) {
		"use strict";
		_inherits$8(KanbanFeatureBase, BaseFeature);
		function KanbanFeatureBase() {
			var _this = BaseFeature.apply(this, arguments) || this;
			_this.action = _this._register(new KanbanAction(_this.context, _this.collector.dataUtil, _this.collector, _this.parentApi));
			return _this;
		}
		_create_class$3(KanbanFeatureBase, [
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
		return KanbanFeatureBase;
	}(BaseFeature);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/card-active/main.js
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
var KanbanCardActive;
var init_main$4 = __esmMin((() => {
	init_style();
	init_kanban_feature();
	init_get_groupindex_by_record();
	init_card_active$1();
	KanbanCardActive = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$7(KanbanCardActive, KanbanFeatureBase);
		function KanbanCardActive() {
			var _this = KanbanFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.cardActive.show();
			};
			_this.getCardRectInfos = (recordId) => {
				var groupIndexList = getGroupIndexListByRecordId(recordId, _this.collector.dataUtil);
				if (groupIndexList.length === 0) return;
				var cardRectList = [];
				groupIndexList.forEach((groupIndex) => {
					var cardInfo = _this.collector.card.getCardInfo(groupIndex, recordId);
					if (!cardInfo) return;
					var { groupCardVisibleStartY, groupCardVisibleHeight } = _this.collector.size;
					var scrollTop = _this.collector.range.getGroupScrollTop(groupIndex);
					var renderRect = Object.assign(Object.assign({}, cardInfo.rect), {
						x: cardInfo.rect.x - _this.collector.range.scrollLeft,
						y: cardInfo.rect.y + groupCardVisibleStartY - scrollTop
					});
					var clipRect = {
						x: renderRect.x - style.size.borderWidth,
						y: groupCardVisibleStartY,
						width: renderRect.width + style.size.borderWidth * 2,
						height: groupCardVisibleHeight + style.size.borderWidth * 2
					};
					cardRectList.push({
						renderRect,
						clipRect
					});
				});
				return cardRectList;
			};
			return _this;
		}
		var _proto = KanbanCardActive.prototype;
		_proto.bootstrap = function bootstrap() {
			this.cardActive = this._register(new CommonCardActive(this.emitter, {
				getClipRect: () => this.collector.size.globalRect,
				getCardRectInfos: (recordId) => this.getCardRectInfos(recordId),
				getHighlightActiveRecordId: () => this.collector.state.getHighlightActiveRecordId(),
				scrollCardToVisibility: (recordId) => this.parentApi.scrollCardToVisibility(recordId)
			}));
			this.layer.addGroup(this.cardActive.group);
		};
		return KanbanCardActive;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/card-active/index.js
var init_card_active = __esmMin((() => {
	init_interface$4();
	init_main$4();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/group-scroller/interface.js
var IKanbanGroupVerticalScroller;
var init_interface$3 = __esmMin((() => {
	init_module();
	IKanbanGroupVerticalScroller = createDecorator("IKanbanGroupVerticalScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/group-scroller/main.js
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
var KanbanGroupVerticalScroller;
var init_main$3 = __esmMin((() => {
	init_esm();
	init_utils();
	init_scroller();
	init_style();
	init_interface$3();
	init_kanban_feature();
	KanbanGroupVerticalScroller = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$6(KanbanGroupVerticalScroller, KanbanFeatureBase);
		function KanbanGroupVerticalScroller() {
			var _this = KanbanFeatureBase.apply(this, arguments) || this;
			_this.hoverGroupIndex = -1;
			_this.showDelay = 100;
			_this.delayTimer = null;
			_this.render = () => {
				if (ua.isMobile) {
					_this.hoverGroupIndex = _this.parentApi.getScrollGroupIndex();
					_this.updatePosition();
					return;
				}
				if (_this.hoverGroupIndex !== -1) _this.updatePosition();
			};
			_this.isHovering = () => {
				var _a, _b;
				return ((_a = _this.vertical) === null || _a === void 0 ? void 0 : _a.isHovering()) || ((_b = _this.vertical) === null || _b === void 0 ? void 0 : _b.isDragging()) || false;
			};
			_this.onTap = (_evt) => {};
			_this.onDocumentMouseMove = (evt) => {
				var _a, _b, _c;
				if ((_a = _this.vertical) === null || _a === void 0 ? void 0 : _a.isDragging()) return;
				if (evt.target.isOutStage) {
					(_b = _this.vertical) === null || _b === void 0 || _b.hide();
					_this.hoverGroupIndex = -1;
					return;
				}
				if (evt.target.groupIndex >= 0 && _this.hoverGroupIndex !== evt.target.groupIndex) {
					(_c = _this.vertical) === null || _c === void 0 || _c.hide();
					_this.hoverGroupIndex = evt.target.groupIndex;
				}
				if (_this.delayTimer) clearTimeout(_this.delayTimer);
				_this.delayTimer = setTimeout(() => {
					_this.showGroupScroller();
				}, _this.showDelay);
			};
			return _this;
		}
		var _proto = KanbanGroupVerticalScroller.prototype;
		_proto.bootstrap = function bootstrap() {
			var _a;
			if ((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll) return;
			this.vertical = this._register(new CommonScroller({
				vertical: true,
				autoHide: ua.isMobile,
				id: "v-scroller",
				root: this.root,
				getViewRect: () => this.getGroupRect(),
				getScrollTop: () => this.getScrollTop(),
				getScrollHeight: () => this.getScrollHeight(),
				scrollToY: (y) => this.scrollToGroupY(y)
			}));
			this._register(this.UIEvent.document.onMouseMove(this.onDocumentMouseMove));
			this._register(this.UIEvent.stage.onTap(this.onTap));
		};
		_proto.dispose = function dispose(trace) {
			KanbanFeatureBase.prototype.dispose.call(this, trace);
			if (this.delayTimer) clearTimeout(this.delayTimer);
		};
		_proto.getFeatureLockConfig = function getFeatureLockConfig() {
			return { default: {
				id: IKanbanGroupVerticalScroller,
				isLock: () => {
					var _a, _b;
					return ((_a = this.vertical) === null || _a === void 0 ? void 0 : _a.isDragging()) || ((_b = this.vertical) === null || _b === void 0 ? void 0 : _b.isHovering()) || false;
				}
			} };
		};
		_proto.updatePosition = function updatePosition() {
			var _a, _b;
			(_a = this.vertical) === null || _a === void 0 || _a.show();
			(_b = this.vertical) === null || _b === void 0 || _b.updatePosition();
		};
		_proto.showGroupScroller = function showGroupScroller() {
			this.render();
		};
		_proto.getGroupRect = function getGroupRect() {
			var { size, range } = this.collector;
			var groupInfo = this.collector.head.getGroupInfo(this.hoverGroupIndex);
			if (!groupInfo || this.isDisabled) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			return {
				x: ((groupInfo.rect.x || 0) - range.scrollLeft) * size.scale,
				y: size.bodyRect.y * size.scale,
				width: (groupInfo.rect.width + style.consts.scrollBarStyle.size + style.consts.scrollBarStyle.marginEdge * 2) * size.scale,
				height: size.groupCardVisibleHeight * size.scale
			};
		};
		_proto.getScrollTop = function getScrollTop() {
			if (this.isDisabled) return 0;
			return this.collector.range.getGroupScrollTop(this.hoverGroupIndex) * this.collector.size.scale;
		};
		_proto.getScrollHeight = function getScrollHeight() {
			if (this.isDisabled) return 0;
			return this.collector.range.getGroupTotalHeight(this.hoverGroupIndex) * this.collector.size.scale;
		};
		_proto.scrollToGroupY = function scrollToGroupY(y) {
			if (this.isDisabled) return;
			this.parentApi.scrollToGroupY(this.hoverGroupIndex, y);
		};
		_create_class$2(KanbanGroupVerticalScroller, [{
			key: "isDisabled",
			get: function() {
				return this.hoverGroupIndex === -1 || this.collector.state.isFoldGroup(this.hoverGroupIndex);
			}
		}]);
		return KanbanGroupVerticalScroller;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/h-scroller/interface.js
var IKanbanHorizontalScroller;
var init_interface$2 = __esmMin((() => {
	init_module();
	IKanbanHorizontalScroller = createDecorator("IKanbanHorizontalScroller");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/h-scroller/main.js
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
var KanbanHorizontalScroller;
var init_main$2 = __esmMin((() => {
	init_utils();
	init_scroller();
	init_kanban_feature();
	init_scroll_info();
	KanbanHorizontalScroller = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$5(KanbanHorizontalScroller, KanbanFeatureBase);
		function KanbanHorizontalScroller() {
			var _this = KanbanFeatureBase.apply(this, arguments) || this;
			_this.render = () => {
				_this.updatePosition();
			};
			_this.isHovering = () => {
				var _a, _b;
				return ((_a = _this.horizontal) === null || _a === void 0 ? void 0 : _a.isHovering()) || ((_b = _this.horizontal) === null || _b === void 0 ? void 0 : _b.isDragging()) || false;
			};
			return _this;
		}
		var _proto = KanbanHorizontalScroller.prototype;
		_proto.bootstrap = function bootstrap() {
			var _a;
			if ((_a = getScrollConfig(this.context.getId())) === null || _a === void 0 ? void 0 : _a.useOuterHorizontalScroll) return;
			this.horizontal = this._register(new CommonScroller({
				horizontal: true,
				autoHide: false,
				id: "h-scroller",
				root: this.root,
				getViewRect: () => this.viewRect,
				getScrollLeft: () => this.collector.range.scrollLeft * this.collector.size.scale,
				getScrollWidth: () => this.collector.size.globalWidth * this.collector.size.scale,
				scrollToX: (x) => {
					this.action.hideToolTip();
					this.parentApi.scrollToX(x / this.collector.size.scale);
				},
				onMouseEnter: (event) => {
					var targetRect = event.target.getBoundingClientRect();
					var scrollTip = getScrollTipInfo(this.getAbsolutePosition(targetRect.x, targetRect.y), targetRect);
					this.action.showToolTip(scrollTip.hoverTip, scrollTip.tipRect, { props: { placement: "top" } });
				},
				onMouseLeave: () => this.action.hideToolTip()
			}));
		};
		_proto.updatePosition = function updatePosition() {
			var _a;
			(_a = this.horizontal) === null || _a === void 0 || _a.updatePosition();
		};
		_create_class$1(KanbanHorizontalScroller, [{
			key: "viewRect",
			get: function() {
				var { size } = this.collector;
				return {
					x: 0,
					y: 0,
					width: size.rootWidth * size.scale,
					height: size.rootHeight * size.scale
				};
			}
		}]);
		return KanbanHorizontalScroller;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/h-scroller/index.js
var init_h_scroller = __esmMin((() => {
	init_interface$2();
	init_main$2();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/auto-scroll/interface.js
var IKanbanAutoScroll;
var init_interface$1 = __esmMin((() => {
	init_module();
	IKanbanAutoScroll = createDecorator("IKanbanAutoScroll");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/auto-scroll/main.js
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
var KanbanAutoScroll;
var init_main$1 = __esmMin((() => {
	init_auto_scroll$1();
	init_kanban_feature();
	KanbanAutoScroll = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$4(KanbanAutoScroll, KanbanFeatureBase);
		function KanbanAutoScroll() {
			return KanbanFeatureBase.apply(this, arguments) || this;
		}
		var _proto = KanbanAutoScroll.prototype;
		_proto.bootstrap = function bootstrap() {
			this.autoScroll = this._register(new AutoScroll({
				scrollToX: (scrollX) => this.renderer.scrollToX(scrollX),
				scrollToY: (scrollY) => this.renderer.scrollToGroupY(this.autoScrollGroupIndex, scrollY),
				getRoot: () => this.root,
				getScrollLeft: () => this.collector.range.scrollLeft,
				getScrollTop: () => this.collector.range.getGroupScrollTop(this.autoScrollGroupIndex),
				getScale: () => this.collector.size.scale,
				getBoundRect: () => {
					var { size } = this.collector;
					return {
						left: size.globalRect.x,
						right: size.globalRect.x + size.globalRect.width,
						top: size.groupCardVisibleStartY,
						bottom: size.groupCardVisibleEndY
					};
				}
			}));
		};
		_proto.setAutoScrollGroupIndex = function setAutoScrollGroupIndex(groupIndex) {
			this.autoScrollGroupIndex = groupIndex;
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
		return KanbanAutoScroll;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/common/auto-scroll/index.js
var init_auto_scroll = __esmMin((() => {
	init_interface$1();
	init_main$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/utils/get-add-card-rect.js
/**
* 获取添加卡片按钮的位置
* @param groupIndex
* @param collector
* @returns
*/ function getAddCardButtonRect(groupIndex, collector) {
	if (collector.state.isFoldGroup(groupIndex)) return;
	var groupHeadInfo = collector.head.getGroupInfo(groupIndex);
	if (!groupHeadInfo) return;
	var groupHeadRect = groupHeadInfo.rect;
	var { size } = collector;
	if (!groupHeadRect || !size.cardAddButtonHeight) return;
	var groupInfo = collector.head.getGroupInfo(groupIndex);
	if (!(groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.groupId) && groupIndex !== 0) return;
	var { borderWidth } = style.size;
	var totalHeight = collector.range.getGroupTotalHeight(groupIndex) - collector.range.getGroupScrollTop(groupIndex);
	var visibleHeight = size.groupCardVisibleHeight + 2 * borderWidth;
	return {
		x: groupHeadRect.x,
		y: Math.max(Math.min(totalHeight, visibleHeight) + (totalHeight ? size.cardFieldTitleGap : borderWidth), 0),
		width: groupHeadRect.width,
		height: size.cardAddButtonHeight
	};
}
var init_get_add_card_rect = __esmMin((() => {
	init_style();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/card-move/interface.js
var IKanbanCardMove;
var init_interface = __esmMin((() => {
	init_module();
	IKanbanCardMove = createDecorator("IKanbanCardMove");
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/utils/get-target-by-offset.js
function getCardRecordId(offsetY, groupIndex, collector) {
	var groupInfos = collector.range.getVirtualList(groupIndex);
	if (!groupInfos) return;
	var groupInfo = collector.dataUtil.getGroups();
	if (!groupInfo) return;
	var groupId = groupInfo.groupIds[groupIndex];
	var recordIds = groupInfo.groupRecordIds.get(groupId);
	if (!(recordIds === null || recordIds === void 0 ? void 0 : recordIds.length)) return;
	var groupScrollTop = collector.range.getGroupScrollTop(groupIndex);
	var cardIndex = binarySearch(offsetY - collector.size.groupCardVisibleStartY, 0, groupInfos.length - 1, (index) => groupInfos[index].startY - groupScrollTop);
	if (cardIndex >= 0) return recordIds[cardIndex];
}
var init_get_target_by_offset = __esmMin((() => {
	init_binary_search();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/get-visible-contents.js
/**
* 获取垂直方向指定可见区域的绘制内容
* @param startY
* @param endY
* @param contents 默认不会有高度过大的内容
*/ function getVisibleDrawContents(startY, endY, contents) {
	var startIndex = binarySearch(startY, 0, contents.length - 1, (index) => {
		var contentRect = contents[index][0];
		return contentRect.y + contentRect.height;
	});
	var endIndex = binarySearch(endY, 0, contents.length - 1, (index) => {
		return contents[index][0].y;
	});
	if (startIndex === -1 || endIndex === -1) return [];
	if (startIndex === endIndex) return contents.slice(startIndex, startIndex + 1);
	return contents.slice(startIndex, endIndex + 1);
}
var init_get_visible_contents = __esmMin((() => {
	init_binary_search();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/card-move/main.js
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
var KanbanCardMove;
var init_main = __esmMin((() => {
	init_esm$1();
	init_es();
	init_pen();
	init_style();
	init_auto_scroll();
	init_kanban_feature();
	init_interface();
	init_get_add_card_rect();
	init_get_target_by_offset();
	init_cursor();
	init_get_visible_contents();
	init_register_esc_to_cancel();
	KanbanCardMove = /* @__PURE__ */ function(KanbanFeatureBase) {
		"use strict";
		_inherits$3(KanbanCardMove, KanbanFeatureBase);
		function KanbanCardMove() {
			var _this = KanbanFeatureBase.apply(this, arguments) || this;
			_this.dragBuffer = 6;
			_this.draglineBorder = style.size.borderWidth * 2;
			_this.isInDragging = false;
			_this.isReadyToDrag = false;
			_this.onStageMousedown = (evt) => {
				var _a;
				var { target } = evt;
				var { size, range, card } = _this.collector;
				if (!target.recordId || evt.target.isHead) return;
				var cardInfo = card.getCardInfo(target.groupIndex, target.recordId);
				if (!cardInfo) return;
				var totalHeight = range.getGroupTotalHeight(target.groupIndex) + size.headRect.height;
				var visibleHeight = size.groupCardVisibleHeight;
				if (evt.y > Math.min(totalHeight, visibleHeight)) return;
				_this.isReadyToDrag = true;
				var groupScrollTop = range.getGroupScrollTop(evt.target.groupIndex);
				var { scrollLeft } = range;
				_this.clickInfo = Object.assign(Object.assign({}, target), {
					cardInfo,
					scrollTop: groupScrollTop,
					scrollLeft
				});
				_this.mouseDownOffset = {
					x: evt.x,
					y: evt.y
				};
				_this.listenDragReady();
				(_a = _this.renderer.getFeature(IKanbanAutoScroll)) === null || _a === void 0 || _a.readyBoth();
			};
			_this.onWindowMouseMove = (evt) => {
				var _a;
				if (!_this.isReadyToDrag) return;
				var deltaX = evt.x - _this.mouseDownOffset.x;
				var deltaY = evt.y - _this.mouseDownOffset.y;
				_this.isInDragging = _this.isInDragging || Math.abs(deltaX) > _this.dragBuffer || Math.abs(deltaY) > _this.dragBuffer;
				if (_this.isReadyToDrag && _this.isInDragging) {
					_this.mouseMoveOffset = {
						x: evt.x,
						y: evt.y
					};
					(_a = _this.renderer.getFeature(IKanbanAutoScroll)) === null || _a === void 0 || _a.setAutoScrollGroupIndex(evt.target.groupIndex);
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
		var _proto = KanbanCardMove.prototype;
		_proto.bootstrap = function bootstrap() {
			this.group = this._register(pen.group(this.collector.size.globalRect));
			this.layer.addGroup(this.group);
			this._register(this.UIEvent.stage.onMouseDown(this.onStageMousedown));
		};
		_proto.render = function render() {
			if (this.isDragging()) {
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
				id: IKanbanCardMove,
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
			this.group.clear();
			this.group.setAttrs(this.collector.size.globalRect);
			this.drawOriginRecordBackground();
			this.updateCard();
			this.updateDragLineAndTargetInfo(groupIndex);
			this.setCursor(Cursor.GRABBING);
		};
		_proto.drawOriginRecordBackground = function drawOriginRecordBackground() {
			var _a;
			if (!((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.cardInfo)) return;
			var { range, size } = this.collector;
			var { groupCardVisibleStartY } = size;
			var { cardInfo } = this.clickInfo;
			var { scrollLeft } = range;
			var groupScrollTop = this.collector.range.getGroupScrollTop(this.clickInfo.groupIndex);
			var cardRect = Object.assign(Object.assign({}, cardInfo.rect), {
				x: cardInfo.rect.x - scrollLeft,
				y: cardInfo.rect.y + groupCardVisibleStartY - groupScrollTop - style.size.borderWidth
			});
			this.group.add(pen.config.rect(Object.assign(Object.assign({}, cardRect), {
				borderRadius: size.cardBorderRadius,
				borderWidth: style.size.borderWidth,
				borderColor: style.color.strongBorderColor,
				background: style.color.activedBackground
			})), 0, 0, this.kanbanBodyClipArea);
		};
		_proto.updateCard = function updateCard() {
			if (!this.clickInfo) return;
			var { groupCardVisibleStartY, cardBorderRadius } = this.collector.size;
			var offsetX = -this.clickInfo.scrollLeft + this.mouseMoveOffset.x - this.mouseDownOffset.x;
			var offsetY = -this.clickInfo.scrollTop + this.mouseMoveOffset.y - this.mouseDownOffset.y;
			var cardBox = pen.config.rect(Object.assign(Object.assign({}, this.clickInfo.cardInfo.rect), {
				borderWidth: style.size.borderWidth,
				borderRadius: cardBorderRadius,
				background: style.color.normalBackground
			}));
			this.group.add(cardBox, offsetX, offsetY + groupCardVisibleStartY, this.kanbanBodyClipArea);
			getVisibleDrawContents(-offsetY, -offsetY + this.collector.size.groupCardVisibleHeight, this.clickInfo.cardInfo.contents).forEach((contents) => {
				contents[1].forEach((drawConfig) => this.group.add(Object.assign({}, drawConfig), offsetX, offsetY + groupCardVisibleStartY, this.kanbanBodyClipArea));
			});
		};
		_proto.updateDragLineAndTargetInfo = function updateDragLineAndTargetInfo(groupIndex) {
			var _a;
			var recordId = getCardRecordId(this.mouseMoveOffset.y, groupIndex, this.collector);
			var addCardRect = getAddCardButtonRect(groupIndex, this.collector);
			if (recordId === ((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId)) {
				this.targetInfo = {
					groupIndex,
					recordId,
					isLast: false
				};
				return;
			}
			if (!recordId) {
				this.targetInfo = {
					groupIndex,
					isLast: true
				};
				this.drawLineBeforeAddRecordButton(addCardRect);
				return;
			}
			var cardInfo = this.collector.card.getCardInfo(groupIndex, recordId);
			var scrollTop = this.collector.range.getGroupScrollTop(groupIndex);
			var { range, size } = this.collector;
			var { y } = this.mouseMoveOffset;
			var isAfterCard = !!cardInfo && cardInfo.rect.y + cardInfo.rect.height + size.groupCardVisibleStartY - scrollTop < y;
			if (!cardInfo || addCardRect && isAfterCard && addCardRect.y < y) {
				this.targetInfo = {
					groupIndex,
					recordId,
					isLast: true
				};
				this.drawLineBeforeAddRecordButton(addCardRect);
				return;
			}
			if (!addCardRect && isAfterCard) {
				this.targetInfo = {
					groupIndex,
					recordId: void 0,
					isLast: true
				};
				var belowCardLineOffset = cardInfo.rect.y + cardInfo.rect.height + size.cardFieldTitleGap / 2 - this.draglineBorder / 2 + size.groupCardVisibleStartY - scrollTop;
				this.group.add(pen.config.line({
					x: cardInfo.rect.x - range.scrollLeft,
					y: belowCardLineOffset,
					points: [
						0,
						0,
						cardInfo.rect.width,
						0
					],
					borderColor: style.color.selectionBorderColor,
					borderWidth: this.draglineBorder
				}), 0, 0, this.dragLineClipArea);
				return;
			}
			this.targetInfo = {
				groupIndex,
				recordId,
				isLast: false
			};
			var cardLineOffset = cardInfo.rect.y - size.cardFieldTitleGap / 2 - this.draglineBorder / 2 + size.groupCardVisibleStartY - scrollTop;
			var headLineOffset = size.groupCardVisibleStartY - size.cardFieldTitleGap / 2 - this.draglineBorder / 2;
			this.group.add(pen.config.line({
				x: cardInfo.rect.x - range.scrollLeft,
				y: cardInfo.rect.y - scrollTop < 0 ? headLineOffset : cardLineOffset,
				points: [
					0,
					0,
					cardInfo.rect.width,
					0
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: this.draglineBorder
			}), 0, 0, this.dragLineClipArea);
		};
		_proto.drawLineBeforeAddRecordButton = function drawLineBeforeAddRecordButton(addCardRect) {
			if (!addCardRect) return;
			var { size, range } = this.collector;
			this.group.add(pen.config.line({
				x: (addCardRect === null || addCardRect === void 0 ? void 0 : addCardRect.x) - range.scrollLeft,
				y: addCardRect.y - size.cardFieldTitleGap / 2 - this.draglineBorder / 2 + size.groupCardVisibleStartY,
				points: [
					0,
					0,
					addCardRect.width,
					0
				],
				borderColor: style.color.selectionBorderColor,
				borderWidth: this.draglineBorder
			}), 0, 0, this.dragLineClipArea);
		};
		_proto.moveCard = function moveCard() {
			var _a, _b, _c;
			var view = this.collector.dataUtil.getContext().getCurrentView();
			var tableId = (_a = this.collector.dataUtil.getContext().getCurrentTable()) === null || _a === void 0 ? void 0 : _a.id;
			if (!view || !tableId || !this.targetInfo || !this.clickInfo) return;
			var { groupIndex } = this.targetInfo;
			var groupPath = this.getGroupPath(groupIndex);
			var startGroupPath = this.getGroupPath(this.clickInfo.groupIndex);
			if (this.targetInfo.recordId) {
				if (this.checkAllowMoveIfSort(startGroupPath.toString(), groupPath.toString())) {
					this.showSnackbar();
					return;
				}
				if (((_b = this.clickInfo) === null || _b === void 0 ? void 0 : _b.recordId) === ((_c = this.targetInfo) === null || _c === void 0 ? void 0 : _c.recordId)) return;
				this.moveRecordWithCheck(startGroupPath, groupPath);
				return;
			}
			this.moveRecordWithCheck(startGroupPath, groupPath);
		};
		/**
		* 移动 record 的时候检查一下
		*/ _proto.moveRecordWithCheck = function moveRecordWithCheck(startPath, targetPath) {
			var _a, _b, _c, _d;
			var context = this.collector.dataUtil.getContext();
			if (context.customConfig) return;
			var behaviorApi = context.getBehaviorApi();
			var tableId = context.getCurrentTable().id;
			var view = context.getCurrentView();
			if (!((_a = this.clickInfo) === null || _a === void 0 ? void 0 : _a.recordId)) return;
			var nextRecordId;
			if ((_b = this.targetInfo) === null || _b === void 0 ? void 0 : _b.isLast) nextRecordId = null;
			else nextRecordId = (_d = (_c = this.targetInfo) === null || _c === void 0 ? void 0 : _c.recordId) !== null && _d !== void 0 ? _d : null;
			var sourceGroupKey = startPath[0];
			var targetGroupKey = targetPath[0];
			var util = this.collector.dataUtil;
			if (util.isVirtualGroupKey(sourceGroupKey) || util.isVirtualGroupKey(targetGroupKey)) {
				Snackbar_default.show({
					message: i18n.t("该分组对应的数据不存在，无法移动到此处。"),
					closable: false,
					duration: 1500,
					id: "card_move"
				});
				return;
			}
			behaviorApi.moveGroupRecord({
				tableId,
				viewId: view.id,
				recordId: this.clickInfo.recordId,
				delta: {
					sourceGroupKey,
					targetGroupKey,
					nextRecordId
				}
			});
		};
		/**
		* 排序情况下检测是否允许移动
		* @param startGroupPath
		* @param endGroupPath
		* @returns
		*/ _proto.checkAllowMoveIfSort = function checkAllowMoveIfSort(startGroupPath, endGroupPath) {
			var view = this.collector.dataUtil.getContext().getCurrentView();
			return (view === null || view === void 0 ? void 0 : view.isAutoSort()) && (view === null || view === void 0 ? void 0 : view.getSortInfos().length) && startGroupPath.toString() === endGroupPath.toString();
		};
		_proto.showSnackbar = function showSnackbar() {
			Snackbar_default.show({
				message: i18n.t("开启了自动排序，记录无法移动。"),
				closable: false,
				duration: 1500,
				id: "card_move"
			});
		};
		_proto.getGroupPath = function getGroupPath(groupIndex) {
			var _a, _b;
			return [((_b = (_a = this.collector.dataUtil.getGroups()) === null || _a === void 0 ? void 0 : _a.groupIds) !== null && _b !== void 0 ? _b : [])[groupIndex]];
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
			this.targetInfo = void 0;
			this.isReadyToDrag = false;
			this.isInDragging = false;
			this.setCursor(Cursor.DEFAULT);
		};
		_create_class(KanbanCardMove, [{
			key: "kanbanBodyClipArea",
			get: function() {
				return {
					x: 0,
					y: this.collector.size.groupCardVisibleStartY,
					width: this.collector.size.globalWidth,
					height: this.collector.size.groupCardVisibleHeight + 2 * style.size.borderWidth
				};
			}
		}, {
			key: "dragLineClipArea",
			get: function() {
				return {
					x: 0,
					y: this.collector.size.groupCardVisibleStartY - this.collector.size.cardFieldTitleGap,
					width: this.collector.size.globalWidth,
					height: this.collector.size.globalRect.height
				};
			}
		}]);
		return KanbanCardMove;
	}(KanbanFeatureBase);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/features/pc/card-move/index.js
var init_card_move = __esmMin((() => {
	init_interface();
	init_main();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/collector/data-util.js
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
var DataUtil;
var init_data_util = __esmMin((() => {
	init_data_util$1();
	DataUtil = /* @__PURE__ */ function(BaseCollectorDataUtil) {
		"use strict";
		_inherits$2(DataUtil, BaseCollectorDataUtil);
		function DataUtil(context, status) {
			var _this = BaseCollectorDataUtil.call(this, context) || this;
			_this.context = context;
			_this.status = status;
			return _this;
		}
		var _proto = DataUtil.prototype;
		_proto.patch = function patch() {
			this.groupInfos = this.getGroupInfos();
		};
		/**
		* 获取看板分组信息
		* @returns
		*/ _proto.getGroups = function getGroups() {
			if (!this.groupInfos) this.groupInfos = this.getGroupInfos();
			return this.groupInfos;
		};
		_proto.getStatus = function getStatus() {
			return this.status;
		};
		/**
		* 获取看板分组依据字段 id（看板只有一个分组依据，所以直接取第一个）
		*/ _proto.getGroupFieldId = function getGroupFieldId() {
			var _a, _b, _c;
			return ((_c = (_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroupInfos()) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.fieldId) || "";
		};
		/**
		* 获取看板卡片配置
		*/ _proto.getCardConfig = function getCardConfig() {
			var _a, _b;
			return (_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getCardConfig) === null || _b === void 0 ? void 0 : _b.call(_a);
		};
		/**
		* 获取看板卡片点赞数据
		*/ _proto.getInteractionData = function getInteractionData(type, recordId) {
			var _a;
			return (_a = this.getCurrentTable()) === null || _a === void 0 ? void 0 : _a.getRecordInteractionData(type, recordId);
		};
		/**
		* 判断给定的 GroupKey 是否是 collector 层"自造"的虚拟分组（core 层无法识别）。
		*
		* 默认实现是 false —— 普通看板的 groupIds 都直接来自 viewModel.getGroups()，全部是真实 key；
		* 子类（如 kanban-todo `DataUtil`）会在配置中存在但数据/关联表里都查不到对应值时，把分组以
		* `__todo_placeholder__:xxx` 占位写进 groupIds 用于渲染补齐。这类占位 key 不能下发给 core 的
		* moveGroupRecord —— 否则 cellvalue 会被写成占位字符串，造成脏数据。
		*
		* 调用方（card-move）在发起移动前查询本方法，命中虚拟分组就提示用户而不发 mutation。
		*/ _proto.isVirtualGroupKey = function isVirtualGroupKey(_groupKey) {
			return false;
		};
		_proto.getGroupInfos = function getGroupInfos() {
			var _a, _b;
			var groups = (_b = (_a = this.getCurrentView()) === null || _a === void 0 ? void 0 : _a.getGroups) === null || _b === void 0 ? void 0 : _b.call(_a);
			if (!groups) return;
			if (this.status.canInsertRecordInGroup) return groups;
			var { groupIds, groupRecordIds } = groups;
			var newGroupIds = groupIds.filter((groupId) => {
				var _a;
				return (_a = groupRecordIds.get(groupId)) === null || _a === void 0 ? void 0 : _a.length;
			});
			return Object.assign(Object.assign({}, groups), { groupIds: newGroupIds });
		};
		return DataUtil;
	}(BaseCollectorDataUtil);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/collector/range.js
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
var import_main, PatchEffectMutations, VIRTUAL_HEIGHT_MULTIPLIER, RangeCollector;
var init_range = __esmMin((() => {
	init_event();
	import_main = require_main();
	init_es$1();
	init_utils();
	init_calc_card_heigth();
	init_binary_search();
	PatchEffectMutations = [
		MutationId.SET_FILTER_MUTATION,
		MutationId.SET_GROUP_MUTATION,
		MutationId.MOVE_GROUP_ORDER,
		MutationId.SET_RECORDS_MUTATION,
		MutationId.SORT_RECORDS_MUTATION
	];
	VIRTUAL_HEIGHT_MULTIPLIER = .3;
	RangeCollector = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$1(RangeCollector, Disposable);
		function RangeCollector(dataUtil, state, size, head) {
			var _this = Disposable.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.state = state;
			_this.size = size;
			_this.head = head;
			_this.scrollLeft = 0;
			_this.groupStart = 0;
			_this.groupEnd = 0;
			_this.groupYInfos = /* @__PURE__ */ new Map();
			_this.groupTotalHeight = /* @__PURE__ */ new Map();
			_this.groupVirtualList = /* @__PURE__ */ new Map();
			_this.onScrollEmitter = _this._register(new Emitter());
			_this.getGroupOffsetX = (groupIndex) => {
				var _a;
				return ((_a = _this.head.getGroupInfo(groupIndex)) === null || _a === void 0 ? void 0 : _a.rect.x) || 0;
			};
			_this.onScroll = _this.onScrollEmitter.event;
			return _this;
		}
		var _proto = RangeCollector.prototype;
		_proto.collect = function collect() {
			this.clearAll();
			this.initVirtualHeight();
			this.collectGroupXRange();
			this.collectGroupYInfos();
		};
		_proto.patch = function patch(mutations) {
			var _a;
			if (typeof mutations !== "undefined" && mutations.some((mutation) => PatchEffectMutations.includes(mutation.id)) && !((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll)) {
				this.collect();
				return;
			}
			this.groupTotalHeight.clear();
			this.groupVirtualList.clear();
			this.fixScrollLeft();
			this.collectGroupXRange();
		};
		_proto.getXRange = function getXRange() {
			return {
				start: this.groupStart,
				end: this.groupEnd
			};
		};
		_proto.updateScrollLeft = function updateScrollLeft(scrollLeft) {
			if (scrollLeft === this.scrollLeft) return;
			this.scrollLeft = scrollLeft;
			this.fixScrollLeft();
			this.onScrollEmitter.fire();
			this.collectGroupXRange();
		};
		_proto.getGroupIndexByOffsetX = function getGroupIndexByOffsetX(offsetX) {
			return this.calcGroupStart(offsetX + this.scrollLeft);
		};
		_proto.resetGroupTotalHeight = function resetGroupTotalHeight(groupIndex) {
			this.groupTotalHeight.set(groupIndex, 0);
		};
		_proto.updateGroupScrollTop = function updateGroupScrollTop(groupIndex, scrollTop) {
			var _a;
			var info = this.groupYInfos.get(groupIndex);
			if (!info || info.scrollTop === scrollTop) return;
			info.scrollTop = scrollTop;
			info.scrollTop = Math.min((((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll) ? this.getGroupMaxTotalHeight() : this.getGroupTotalHeight(groupIndex)) - this.size.groupCardVisibleHeight, info.scrollTop);
			info.scrollTop = Math.max(0, info.scrollTop);
			this.groupYInfos.set(groupIndex, info);
			this.onScrollEmitter.fire();
		};
		_proto.updateGroupTotalHeight = function updateGroupTotalHeight(groupIndex, groupHeight) {
			this.groupTotalHeight.set(groupIndex, groupHeight);
		};
		_proto.getGroupScrollTop = function getGroupScrollTop(groupIndex) {
			var _a, _b;
			return Math.max(Math.min((((_a = getScrollConfig(this.dataUtil.getContext().getId())) === null || _a === void 0 ? void 0 : _a.useOuterVerticalScroll) ? this.getGroupMaxTotalHeight() : this.getGroupTotalHeight(groupIndex)) - this.size.groupCardVisibleHeight, ((_b = this.groupYInfos.get(groupIndex)) === null || _b === void 0 ? void 0 : _b.scrollTop) || 0), 0);
		};
		/**
		* 获取分组总高度
		* @param groupIndex
		* @param exact 传 true 返回精确的当前已收集的总高度，传 false 则在没有收集完的情况下返回预计总高度
		* @returns
		*/ _proto.getGroupTotalHeight = function getGroupTotalHeight(groupIndex) {
			var info = this.groupTotalHeight.get(groupIndex);
			var groupInfo = this.head.getGroupInfo(groupIndex);
			if (!info || !groupInfo) return 0;
			return info;
		};
		_proto.getGroupFixOffset = function getGroupFixOffset(groupIndex) {
			var info = this.groupYInfos.get(groupIndex);
			return info === null || info === void 0 ? void 0 : info.fixOffset;
		};
		_proto.setGroupFixOffset = function setGroupFixOffset(groupIndex, recordIndex, recordOffset) {
			var info = this.groupYInfos.get(groupIndex);
			if (info) info.fixOffset = {
				recordIndex,
				recordOffset
			};
		};
		_proto.getVirtualList = function getVirtualList(groupIndex) {
			var virtualList = this.groupVirtualList.get(groupIndex);
			if (!virtualList) return this.initVirtualList(groupIndex);
			return virtualList;
		};
		_proto.doGroupRange = function doGroupRange(callback) {
			for (var groupIndex = this.groupStart; groupIndex <= this.groupEnd; groupIndex++) callback(groupIndex);
		};
		_proto.findRecordByScrollTop = function findRecordByScrollTop(virtualList, scrollTop) {
			return binarySearch(scrollTop, 0, virtualList.length - 1, (index) => virtualList[index].startY);
		};
		_proto.getScrollStatus = function getScrollStatus() {
			return {
				x: 0,
				y: this.getGroupScrollTop(0),
				isTop: true,
				isBottom: true
			};
		};
		/**
		* 获取分组最大高度
		*/ _proto.getGroupMaxTotalHeight = function getGroupMaxTotalHeight() {
			var maxHeight = 0;
			this.groupTotalHeight.forEach((height) => {
				maxHeight = Math.max(maxHeight, height);
			});
			return maxHeight;
		};
		_proto.getAllGroupHeight = function getAllGroupHeight() {
			return this.groupTotalHeight;
		};
		_proto.clearAll = function clearAll() {
			this.groupYInfos.clear();
			this.groupTotalHeight.clear();
			this.groupVirtualList.clear();
		};
		_proto.collectGroupXRange = function collectGroupXRange() {
			var maxIndex = this.head.getGroupCount() - 1;
			this.groupStart = this.calcGroupStart(this.scrollLeft);
			var endX = this.size.rootWidth;
			this.groupEnd = this.groupStart;
			while (this.groupEnd < maxIndex) {
				var groupInfo = this.head.getGroupInfo(this.groupEnd);
				if (!groupInfo || groupInfo.rect.x + groupInfo.rect.width - this.scrollLeft > endX) break;
				this.groupEnd += 1;
			}
			this.groupEnd = Math.min(this.groupEnd, maxIndex);
		};
		_proto.calcGroupStart = function calcGroupStart(offsetX) {
			return binarySearch(offsetX, 0, this.head.getGroupCount() - 1, this.getGroupOffsetX);
		};
		_proto.collectGroupYInfos = function collectGroupYInfos() {
			for (var groupIndex = 0; groupIndex < this.head.getGroupCount(); groupIndex++) {
				var groupInfo = this.head.getGroupInfo(groupIndex);
				if (groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.counts) {
					this.groupYInfos.set(groupIndex, { scrollTop: 0 });
					this.groupTotalHeight.set(groupIndex, 0);
				}
			}
		};
		_proto.fixScrollLeft = function fixScrollLeft() {
			this.scrollLeft = Math.min(this.size.globalWidth - this.size.rootWidth, this.scrollLeft);
			this.scrollLeft = Math.max(0, this.scrollLeft);
		};
		_proto.initVirtualHeight = function initVirtualHeight() {
			this.virtualHeight = Math.floor(calcCardHeight(this.dataUtil, this.size) * VIRTUAL_HEIGHT_MULTIPLIER);
		};
		_proto.initVirtualList = function initVirtualList(groupIndex) {
			var groups = this.dataUtil.getGroups();
			if (!groups || groupIndex > groups.groupIds.length || this.state.isFoldGroup(groupIndex)) return;
			var groupId = groups.groupIds[groupIndex];
			var recordIds = groups.groupRecordIds.get(groupId);
			if (!(recordIds === null || recordIds === void 0 ? void 0 : recordIds.length)) return;
			var startY = 1;
			var virtualList = new Array(recordIds.length);
			recordIds.forEach((recordId, index) => {
				virtualList[index] = {
					startY,
					recordId
				};
				startY = this.virtualHeight + this.size.cardGap + startY;
			});
			this.groupVirtualList.set(groupIndex, virtualList);
			return virtualList;
		};
		return RangeCollector;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/utils/storage-key.js
var KanbanStorageType;
var init_storage_key = __esmMin((() => {
	(function(KanbanStorageType) {
		KanbanStorageType["FoldGroup"] = "KanbanFoldGroups";
	})(KanbanStorageType || (KanbanStorageType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/kanban/collector/state.js
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
var StateCenter;
var init_state = __esmMin((() => {
	init_storage_key();
	init_collector_state();
	init_storage_sync();
	StateCenter = /* @__PURE__ */ function(BaseStateCenter) {
		"use strict";
		_inherits(StateCenter, BaseStateCenter);
		function StateCenter(dataUtil) {
			var _this = BaseStateCenter.call(this) || this;
			_this.dataUtil = dataUtil;
			_this.foldGroups = /* @__PURE__ */ new Set();
			_this.foldGroups = new Set(JSON.parse(getStorageValue(_this.dataUtil.getContext(), KanbanStorageType.FoldGroup) || "[]"));
			return _this;
		}
		var _proto = StateCenter.prototype;
		/**
		* 分组是否是折叠状态
		* @param groupIdOrIndex
		* @returns
		*/ _proto.isFoldGroup = function isFoldGroup(groupIdOrIndex) {
			var _a;
			var groupId;
			if (typeof groupIdOrIndex === "number") {
				var id = (_a = this.dataUtil.getGroups()) === null || _a === void 0 ? void 0 : _a.groupIds[groupIdOrIndex];
				if (id !== void 0) groupId = id;
			} else groupId = groupIdOrIndex;
			if (groupId !== void 0) return this.foldGroups.has(groupId);
			return false;
		};
		/**
		* 切换分组折叠状态
		* @param groupId
		*/ _proto.toggleFoldGroup = function toggleFoldGroup(groupId) {
			if (this.isFoldGroup(groupId)) this.foldGroups.delete(groupId);
			else this.foldGroups.add(groupId);
			setStorageValue(this.dataUtil.getContext(), KanbanStorageType.FoldGroup, JSON.stringify(Array.from(this.foldGroups)));
		};
		/**
		* 设置分组折叠状态
		* @param groupId
		*/ _proto.setFoldGroup = function setFoldGroup(groupId, isFold) {
			if (isFold && !this.isFoldGroup(groupId)) this.foldGroups.add(groupId);
			if (!isFold && this.isFoldGroup(groupId)) this.foldGroups.delete(groupId);
			setStorageValue(this.dataUtil.getContext(), KanbanStorageType.FoldGroup, JSON.stringify(Array.from(this.foldGroups)));
		};
		return StateCenter;
	}(BaseStateCenter);
}));
//#endregion
export { init_action as A, IKanbanGroupVerticalScroller as C, KanbanFeatureBase as D, KanbanCardActive as E, KanbanCommonView as M, init_common_view as N, init_kanban_feature as O, init_main$3 as S, init_card_active as T, IKanbanAutoScroll as _, DataUtil as a, IKanbanHorizontalScroller as b, KanbanCardMove as c, IKanbanCardMove as d, init_interface as f, KanbanAutoScroll as g, init_auto_scroll as h, init_range as i, IKanbanCardActive as j, KanbanAction as k, getCardRecordId as l, init_get_add_card_rect as m, init_state as n, init_data_util as o, getAddCardButtonRect as p, RangeCollector as r, init_card_move as s, StateCenter as t, init_get_target_by_offset as u, init_h_scroller as v, init_interface$3 as w, KanbanGroupVerticalScroller as x, KanbanHorizontalScroller as y };
