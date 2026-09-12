import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as __awaiter, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { Dn as require_main } from "./esm-cVQVEiWG.js";
import { $l as init_es, Au as getClipImageUrl, Nu as getThumbnailFixedHeight, Rc as isFormulaLikeField, Vl as ViewType, Xu as domainConfig, ju as getCoverImageRect, o as UserInteractionType, ql as FieldType, wd as i18n } from "./execution-result-erkS5q1j.js";
import { t as init_es$1 } from "./es-BQsslXL1.js";
import { H as pen, U as init_resources, V as init_pen, c as init_state, n as init_canvas_view, pt as NormalIconAlias, s as BaseStateCollector, t as BaseCanvasView, vt as init_style, yt as style } from "./canvas-view-DDuMsrmC.js";
import { E as init_constants, S as init_field_collector, T as LabelTypes, d as getWbSpecialMeasureFieldType, f as init_wb_cell, l as collectWbSpecialCell, m as isWbSpecialField, x as fieldCollector } from "./auto-scroll-Cn43Kqkt.js";
import { n as init_common_action, r as require_Snackbar, t as CommonAction } from "./common-action-BPA9xdl-.js";
import { a as init_production, o as productReport } from "./fix-scroll-delta-C4NjXGCK.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/action.js
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
var import_Snackbar, CardAction;
var init_action = __esmMin((() => {
	init_tslib_es6();
	import_Snackbar = /* @__PURE__ */ __toESM(require_Snackbar());
	init_es();
	init_es$1();
	init_production();
	init_common_action();
	CardAction = /* @__PURE__ */ function(CommonAction) {
		"use strict";
		_inherits$3(CardAction, CommonAction);
		function CardAction() {
			return CommonAction.apply(this, arguments) || this;
		}
		var _proto = CardAction.prototype;
		/**
		* 点赞、取消点赞
		* @param recordId
		*/ _proto.toggleLike = function toggleLike(recordId) {
			var _a;
			return __awaiter(this, void 0, void 0, function* () {
				var table = this.dataUtil.getCurrentTable();
				var view = this.dataUtil.getCurrentView();
				if (!table || !view || !((_a = domainConfig === null || domainConfig === void 0 ? void 0 : domainConfig.getSpreadConfig()) === null || _a === void 0 ? void 0 : _a.getConfig("isLogin"))) return;
				var { userInteractionService } = this.dataUtil.getContext().getCore();
				if (!userInteractionService.isUserInteractionDataLoaded(table.id)) return;
				var result = yield userInteractionService.doInteractionOperation(table.id, recordId, UserInteractionType.LIKE);
				if (!(result === null || result === void 0 ? void 0 : result.isSuccess)) {
					import_Snackbar.Snackbar.show({
						message: i18n.t("点赞失败，请再试一下"),
						type: "info",
						autoClose: true,
						closable: true,
						duration: 3e3
					});
					productReport.kanbanGallery.toggleLike(view.type);
				}
			});
		};
		_proto.getScale = function getScale() {
			return 1;
		};
		return CardAction;
	}(CommonAction);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/card-active.js
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
var import_main$1, CommonCardActive;
var init_card_active = __esmMin((() => {
	import_main$1 = require_main();
	init_pen();
	init_style();
	CommonCardActive = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$2(CommonCardActive, Disposable);
		function CommonCardActive(emitter, helper) {
			var _this = Disposable.call(this) || this;
			_this.emitter = emitter;
			_this.helper = helper;
			_this.activeBorderColor = style.color.selectionBorderColor;
			_this.show = () => {
				var highlightRecordId = _this.helper.getHighlightActiveRecordId();
				if (highlightRecordId) _this.activeBorderColor = style.color.searchHighlightBorderColor;
				_this.highlightRecordId = highlightRecordId;
				_this.showCardActive();
			};
			_this.onActiveRecordChanged = (info) => {
				_this.activeRecordId = (info === null || info === void 0 ? void 0 : info.recordId) || "";
				_this.activeBorderColor = style.color.selectionBorderColor;
				_this.show();
				_this.scrollToVisibility(_this.activeRecordId);
			};
			_this.registerEvents();
			return _this;
		}
		var _proto = CommonCardActive.prototype;
		_proto.registerEvents = function registerEvents() {
			this.group = this._register(pen.group(this.helper.getClipRect()));
			this._register(this.emitter.service.activedRecordChanged.event(this.onActiveRecordChanged));
		};
		_proto.showCardActive = function showCardActive() {
			this.group.clear();
			this.group.setAttrs(this.helper.getClipRect());
			var rectInfoList = this.helper.getCardRectInfos(this.highlightRecordId || this.activeRecordId);
			if (!rectInfoList || rectInfoList.length === 0) return;
			rectInfoList.forEach((rectInfo) => {
				this.group.add(pen.config.rect(Object.assign(Object.assign({}, rectInfo.renderRect), {
					borderRadius: style.size.borderRadius,
					borderWidth: style.size.borderWidth * 2,
					borderColor: this.activeBorderColor
				})), 0, 0, rectInfo.clipRect);
			});
		};
		_proto.scrollToVisibility = function scrollToVisibility(recordId) {
			if (!recordId) return;
			this.helper.scrollCardToVisibility(recordId);
		};
		return CommonCardActive;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/card-single.js
var SpecailContentID, CardSingleCollector;
var init_card_single = __esmMin((() => {
	init_es();
	init_es$1();
	init_field_collector();
	init_pen();
	init_resources();
	init_style();
	init_wb_cell();
	SpecailContentID = {
		Like: "CARD_LIKE_ID",
		Cover: "CARD_COVER_ID"
	};
	CardSingleCollector = /* @__PURE__ */ function() {
		"use strict";
		function CardSingleCollector(dataUtil, status, collectConfig) {
			this.dataUtil = dataUtil;
			this.status = status;
			this.collectConfig = collectConfig;
		}
		var _proto = CardSingleCollector.prototype;
		_proto.collectCover = function collectCover(coverFieldId, startY, option) {
			var coverField = this.dataUtil.getFieldByFieldId(coverFieldId);
			if ((coverField === null || coverField === void 0 ? void 0 : coverField.getType()) !== FieldType.IMAGE || !this.status.getPermissionStatus("canReadField", { fieldId: coverFieldId })) return {
				contents: [],
				takeHeight: option.coverHeight
			};
			var coverStandardCell = this.dataUtil.getStandardCell(coverFieldId, option.recordId);
			var coverValue = coverStandardCell === null || coverStandardCell === void 0 ? void 0 : coverStandardCell.data[0];
			if (!coverValue) return {
				contents: [],
				takeHeight: option.coverHeight
			};
			var contentRect = {
				x: option.collectStartX,
				y: startY,
				width: option.cardWidth,
				height: option.coverHeight
			};
			var clipRect = getCoverImageRect(coverValue.imageUrl, contentRect.width, contentRect.height, coverValue);
			var coverUrl = getClipImageUrl(coverValue.imageUrl, clipRect, getThumbnailFixedHeight(contentRect.height));
			return {
				contents: [[
					contentRect,
					[pen.config.image(coverUrl, Object.assign(Object.assign({}, contentRect), { borderRadius: [
						style.size.borderRadius,
						style.size.borderRadius,
						0,
						0
					] }))],
					SpecailContentID.Cover
				]],
				takeHeight: option.coverHeight
			};
		};
		_proto.collectPrimaryTitle = function collectPrimaryTitle(startY, option, contentHeightGetter, textOverride) {
			var primaryFieldId = this.dataUtil.getPrimaryFieldId();
			var primaryField = this.dataUtil.getFieldByFieldId(primaryFieldId);
			var standardCell = this.dataUtil.getStandardCell(primaryFieldId, option.recordId);
			if (!primaryField) return;
			var contentRect = {
				x: option.collectStartX + option.cardPadding,
				y: startY,
				width: option.cardWidth - option.cardPadding * 2,
				height: (contentHeightGetter === null || contentHeightGetter === void 0 ? void 0 : contentHeightGetter(primaryField)) || option.collectHeight || style.size.tagLarge
			};
			var collectConfig = Object.assign(Object.assign({}, this.collectConfig), { textConfig: Object.assign(Object.assign({}, this.collectConfig.textConfig), {
				fontSize: style.size.fontSizeLarge,
				fontStyle: "500"
			}) });
			if (textOverride) standardCell = {
				sourceType: FieldType.TEXT,
				data: [{ text: textOverride }]
			};
			else if (!(standardCell === null || standardCell === void 0 ? void 0 : standardCell.data.length)) {
				standardCell = {
					sourceType: FieldType.TEXT,
					data: [{ text: i18n.t("未命名记录") }]
				};
				collectConfig.textConfig.color = style.color.lightUltraFontColor;
			}
			var measureConfigs = fieldCollector.collect(contentRect, collectConfig, standardCell, primaryField);
			if (option.collectHeight) return {
				contents: [[
					contentRect,
					measureConfigs,
					primaryFieldId
				]],
				takeHeight: option.collectHeight
			};
			var takeHeight = fieldCollector.measureHeight(primaryField, measureConfigs);
			contentRect.height = takeHeight;
			return {
				contents: [[
					contentRect,
					fieldCollector.collect(contentRect, collectConfig, standardCell, primaryField),
					primaryFieldId
				]],
				takeHeight
			};
		};
		_proto.collectCellContents = function collectCellContents(startY, option, isShowFieldTitle, contentHeightGetter, fieldIdsOverride) {
			var _a, _b;
			var y = startY;
			var takeHeight = 0;
			var contents = [];
			for (var fieldId of fieldIdsOverride !== null && fieldIdsOverride !== void 0 ? fieldIdsOverride : this.dataUtil.getVisibleFieldIds()) {
				var field = this.dataUtil.getFieldByFieldId(fieldId);
				var standardCell = this.dataUtil.getStandardCell(fieldId, option.recordId);
				if (!field || !standardCell || fieldId === this.dataUtil.getPrimaryFieldId()) continue;
				if (standardCell.data.length === 0) continue;
				if (isShowFieldTitle) {
					var title = field.getTitle();
					var titleRect = {
						x: option.collectStartX + option.cardPadding,
						y,
						width: option.cardWidth - option.cardPadding * 2,
						height: option.cardFieldTitleHeight
					};
					contents.push([titleRect, [pen.config.text(Object.assign(Object.assign({ text: title }, titleRect), {
						fontSize: style.size.fontSizeUltraSmall,
						color: style.color.lightFontColor,
						wrap: "none",
						ellipsis: true
					}))]]);
					var titleTakeHeight = option.cardFieldTitleHeight + option.cardFieldTitleGap;
					y += titleTakeHeight;
					takeHeight += titleTakeHeight;
				}
				var assignContentHeight = contentHeightGetter === null || contentHeightGetter === void 0 ? void 0 : contentHeightGetter(field);
				var contentRect = {
					x: option.collectStartX + option.cardPadding,
					y,
					width: option.cardWidth - option.cardPadding * 2,
					height: assignContentHeight || this.getMeasureContentHeight(field)
				};
				this.updateMeasureContentRect(field, contentRect);
				var wbSpecialConfigs = void 0;
				var wbMeasureFieldType = void 0;
				if (domainConfig.getIsWb()) {
					var fieldTitle = field.getTitle();
					var viewScope = (_b = (_a = this.dataUtil.getCurrentView()) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : ViewType.KANBAN;
					if (isWbSpecialField(fieldTitle, viewScope)) {
						wbSpecialConfigs = collectWbSpecialCell({
							fieldTitle,
							viewScope,
							rect: contentRect,
							collectConfig: this.collectConfig,
							standardCell,
							field
						});
						wbMeasureFieldType = getWbSpecialMeasureFieldType(fieldTitle, viewScope);
					}
				}
				if (wbSpecialConfigs && wbSpecialConfigs.length > 0) {
					var wbHeight = assignContentHeight || fieldCollector.measureHeight(wbMeasureFieldType !== null && wbMeasureFieldType !== void 0 ? wbMeasureFieldType : FieldType.TEXT, wbSpecialConfigs) + 2;
					contentRect.height = wbHeight;
					contents.push([
						contentRect,
						wbSpecialConfigs,
						fieldId
					]);
					y += wbHeight + option.cardContentGap;
					takeHeight += wbHeight + option.cardContentGap;
					continue;
				}
				if (wbSpecialConfigs) continue;
				var measureConfigs = fieldCollector.collect(contentRect, this.collectConfig, standardCell, field);
				var contentHeight = 0;
				if (assignContentHeight) {
					contents.push([
						contentRect,
						measureConfigs,
						fieldId
					]);
					contentHeight = assignContentHeight;
				} else {
					contentHeight = fieldCollector.measureHeight(field, measureConfigs) + 2;
					contentRect.height = contentHeight;
					contents.push([
						contentRect,
						fieldCollector.collect(contentRect, this.collectConfig, standardCell, field),
						fieldId
					]);
				}
				y += contentHeight + option.cardContentGap;
				takeHeight += contentHeight + option.cardContentGap;
			}
			return {
				contents,
				takeHeight
			};
		};
		_proto.collectInteraction = function collectInteraction(startY, option) {
			var data = this.dataUtil.getInteractionData(UserInteractionType.LIKE, option.recordId);
			if (!data) return;
			var configs = [];
			var interactionRect = {
				x: option.collectStartX + option.cardPadding,
				y: startY,
				width: style.size.iconLarge,
				height: style.size.iconLarge
			};
			configs.push(pen.config.icon(data.isSelfInteractived ? NormalIconAlias.LIKE_CHECKED : NormalIconAlias.LIKE, interactionRect));
			var likeCount = data.count;
			if (likeCount) {
				var likeText = likeCount.toLocaleString();
				var iconTakeWidth = interactionRect.width + style.size.iconPadding;
				configs.push(pen.config.text({
					text: likeText,
					x: interactionRect.x + iconTakeWidth,
					y: startY,
					width: option.cardWidth - option.cardPadding * 2 - iconTakeWidth,
					height: interactionRect.height,
					color: style.color.lightFontColor,
					fontSize: style.size.fontSizeNormal
				}));
				interactionRect.width += pen.util.measureTextWidth(likeText, style.size.fontSizeNormal) + style.size.iconPadding * 2;
			}
			return {
				contents: [[
					interactionRect,
					configs,
					SpecailContentID.Like
				]],
				takeHeight: interactionRect.height
			};
		};
		_proto.getMeasureContentHeight = function getMeasureContentHeight(field) {
			if (field.getType() === FieldType.IMAGE) return style.size.iconLarge;
			var { defaultTextConfig } = style;
			var { fontSize, lineHeight } = this.collectConfig.textConfig;
			return Math.ceil((fontSize || defaultTextConfig.fontSize) * (lineHeight || defaultTextConfig.lineHeight) * this.collectConfig.maxLines);
		};
		_proto.updateMeasureContentRect = function updateMeasureContentRect(field, contentRect) {
			if (field.getType() === FieldType.CHECKBOX) contentRect.width = style.size.iconNormal;
		};
		return CardSingleCollector;
	}();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/field-collector/utils/field-fixed-height.js
var SingleLineTextFields, FieldFixedContent, fieldFixedContent;
var init_field_fixed_height = __esmMin((() => {
	init_es$1();
	init_constants();
	init_style();
	SingleLineTextFields = [
		FieldType.NUMBER,
		FieldType.EMAIL,
		FieldType.PHONE,
		FieldType.FORMULA,
		FieldType.DATE_TIME,
		FieldType.CREATED_TIME,
		FieldType.MODIFIED_TIME,
		FieldType.CURRENCY
	];
	FieldFixedContent = /* @__PURE__ */ function() {
		"use strict";
		function FieldFixedContent() {
			this.heightGetter = /* @__PURE__ */ new Map();
			this.singleLineTextHeight = 20;
			this.multiLineTextHeight = 76;
			this.defaultHeight = 24;
			this.heightGetter.set(FieldType.TEXT, () => this.multiLineTextHeight);
			this.heightGetter.set(FieldType.URL, () => this.multiLineTextHeight);
			this.heightGetter.set(FieldType.LOCATION, () => this.multiLineTextHeight);
			this.heightGetter.set(FieldType.IMAGE, () => style.size.tagLarge);
			this.heightGetter.set(FieldType.PROGRESS, () => this.defaultHeight);
		}
		var _proto = FieldFixedContent.prototype;
		_proto.getFixedContentDrawHeight = function getFixedContentDrawHeight(field) {
			var fieldType = field.type;
			if (isFormulaLikeField(field)) {
				var targetField = field.getResultFieldAttributes();
				if (!targetField) return this.defaultHeight;
				return this.getDrawHeightByFieldType(targetField.getType());
			}
			return this.getDrawHeightByFieldType(fieldType);
		};
		_proto.getDrawHeightByFieldType = function getDrawHeightByFieldType(fieldType) {
			if (!fieldType) return this.defaultHeight;
			if (SingleLineTextFields.includes(fieldType)) return this.singleLineTextHeight;
			if (this.heightGetter.has(fieldType)) return this.heightGetter.get(fieldType)();
			if (LabelTypes.includes(fieldType)) return style.size.tagNormal + style.size.tagPaddingTop * 2;
			return this.defaultHeight;
		};
		return FieldFixedContent;
	}();
	fieldFixedContent = new FieldFixedContent();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/calc-card-heigth.js
function calcCardHeight(dataUtil, size) {
	var { cardCoverHeight, cardContentGap, cardPadding, cardPrimaryFieldHeight, cardInteractionSize } = size;
	var cardConfig = dataUtil.getCardConfig();
	if (!cardConfig) return 0;
	var cardHeight = 0;
	if (cardConfig.isShowCover) cardHeight += cardCoverHeight + cardContentGap;
	else cardHeight += cardPadding;
	cardHeight += cardPrimaryFieldHeight + cardContentGap;
	var contentHeight = calcContentHeight(dataUtil, size, cardConfig.isShowFieldTitle);
	cardHeight += contentHeight;
	if (cardConfig.isShowInteractionData) {
		cardHeight += cardInteractionSize;
		cardHeight += cardPadding;
	}
	cardHeight = Math.ceil(cardHeight);
	return cardHeight;
}
function calcContentHeight(dataUtil, size, isShowFieldTitle) {
	var { cardFieldTitleHeight, cardContentGap, cardFieldTitleGap } = size;
	var height = 0;
	dataUtil.getVisibleFieldIds().forEach((fieldId) => {
		if (dataUtil.getPrimaryFieldId() === fieldId) return;
		if (isShowFieldTitle) height += cardFieldTitleHeight + cardFieldTitleGap;
		height += fieldFixedContent.getFixedContentDrawHeight(dataUtil.getFieldByFieldId(fieldId));
		height += cardContentGap;
	});
	return height;
}
var init_calc_card_heigth = __esmMin((() => {
	init_field_fixed_height();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/collector-state.js
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
var BaseStateCenter;
var init_collector_state = __esmMin((() => {
	init_state();
	BaseStateCenter = /* @__PURE__ */ function(BaseStateCollector) {
		"use strict";
		_inherits$1(BaseStateCenter, BaseStateCollector);
		function BaseStateCenter() {
			var _this = BaseStateCollector.call(this) || this;
			_this.contextMenuRecordId = "";
			_this.contextMenuGroupIndex = 0;
			_this.highlightActiveRecordId = "";
			_this.highlightRecords = /* @__PURE__ */ new Set();
			return _this;
		}
		var _proto = BaseStateCenter.prototype;
		_proto.clearHighlight = function clearHighlight() {
			this.highlightActiveRecordId = "";
			this.highlightRecords.clear();
		};
		_proto.setHighlightInfos = function setHighlightInfos(info) {
			if (info.recordId) this.highlightRecords.add(info.recordId);
		};
		_proto.setHighlightActive = function setHighlightActive(info) {
			this.highlightActiveRecordId = info.recordId;
		};
		_proto.getHighlightActiveRecordId = function getHighlightActiveRecordId() {
			return this.highlightActiveRecordId;
		};
		_proto.isHighlightRecord = function isHighlightRecord(recordId) {
			return this.highlightRecords.has(recordId);
		};
		_proto.getContextMenuActivePoint = function getContextMenuActivePoint() {
			return {
				recordId: this.contextMenuRecordId,
				groupIndex: this.contextMenuGroupIndex
			};
		};
		_proto.setContextMenuActivePoint = function setContextMenuActivePoint(recordId, contextMenuGroupIndex = 0) {
			this.contextMenuRecordId = recordId;
			this.contextMenuGroupIndex = contextMenuGroupIndex;
		};
		return BaseStateCenter;
	}(BaseStateCollector);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/view.js
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
var import_main, KanbanGalleryView;
var init_view = __esmMin((() => {
	import_main = require_main();
	init_canvas_view();
	KanbanGalleryView = /* @__PURE__ */ function(BaseCanvasView) {
		"use strict";
		_inherits(KanbanGalleryView, BaseCanvasView);
		function KanbanGalleryView(context) {
			var _this = BaseCanvasView.call(this, context) || this;
			_this.disposableStore = _this._register(new import_main.DisposableStore());
			_this.onInteractionDataChanged = () => {
				_this.recollect();
				_this.render();
			};
			_this.disposableStore.add(context.getCore().userInteractionService.onInteractionDataChanged(_this.onInteractionDataChanged));
			return _this;
		}
		var _proto = KanbanGalleryView.prototype;
		_proto.setActiveRecordId = function setActiveRecordId(_recordId) {};
		_proto.setSearchSelectedRecordId = function setSearchSelectedRecordId(recordId) {
			this.collector.state.setHighlightActive({ recordId });
		};
		_proto.getHighlightInfos = function getHighlightInfos() {
			var { highlightRecords } = this.collector.state;
			var map = /* @__PURE__ */ new Map();
			highlightRecords.forEach((recordId) => {
				map.set(recordId, { recordId });
			});
			return map;
		};
		_create_class(KanbanGalleryView, [{
			key: "cardWidth",
			get: function() {
				return this.collector.size.cardWidth;
			}
		}]);
		return KanbanGalleryView;
	}(BaseCanvasView);
}));
//#endregion
export { calcCardHeight as a, init_field_fixed_height as c, init_card_single as d, CommonCardActive as f, init_action as h, init_collector_state as i, CardSingleCollector as l, CardAction as m, init_view as n, init_calc_card_heigth as o, init_card_active as p, BaseStateCenter as r, fieldFixedContent as s, KanbanGalleryView as t, SpecailContentID as u };
