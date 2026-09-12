import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { ql as FieldType } from "./execution-result-erkS5q1j.js";
import { t as init_es } from "./es-BQsslXL1.js";
import { H as pen, V as init_pen, et as init_is_in_rect, tt as isHitRect, vt as init_style, yt as style } from "./canvas-view-DDuMsrmC.js";
import { d as init_card_single, u as SpecailContentID } from "./view-DGZEPJsr.js";
import { r as init_url_hot_rect, t as getUrlCombineHotRect } from "./url-hot-rect-D-NY8nLI.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/kanban-gallery/content-hover.js
var CardContentHover;
var init_content_hover = __esmMin((() => {
	init_es();
	init_pen();
	init_style();
	init_card_single();
	init_is_in_rect();
	init_url_hot_rect();
	CardContentHover = /* @__PURE__ */ function() {
		"use strict";
		function CardContentHover(action, dataUtil) {
			this.action = action;
			this.dataUtil = dataUtil;
		}
		var _proto = CardContentHover.prototype;
		_proto.hover = function hover(container, cardContent, param) {
			var [rect, contents, contentId] = cardContent;
			if (!contentId) return false;
			var field = this.dataUtil.getFieldByFieldId(contentId);
			if (!field) return this.checkHoverSpecailContent(container, contentId, rect, param);
			return this.checkHoverFieldContent(container, field, rect, contents, param);
		};
		_proto.checkHoverSpecailContent = function checkHoverSpecailContent(container, contentId, rect, param) {
			switch (contentId) {
				case SpecailContentID.Like:
					var likeIconRect = Object.assign(Object.assign({}, rect), {
						x: rect.x + param.offsetX,
						y: rect.y + param.startY - param.offsetY
					});
					if (isHitRect(param.x, param.y, likeIconRect)) {
						container.add(pen.config.rect(Object.assign(Object.assign({}, likeIconRect), {
							borderRadius: style.size.borderRadius,
							background: style.color.hoverBackground,
							onClick: () => {
								this.action.toggleLike(param.recordId);
							},
							onTap: () => {
								this.action.toggleLike(param.recordId);
							}
						})));
						return true;
					}
					break;
			}
			return false;
		};
		_proto.checkHoverFieldContent = function checkHoverFieldContent(container, field, rect, contents, param) {
			var contentRect = Object.assign(Object.assign({}, rect), {
				x: rect.x + param.offsetX,
				y: rect.y + param.startY - param.offsetY
			});
			var fieldId = field.getId();
			switch (field.getType()) {
				case FieldType.URL:
				case FieldType.LOCATION:
					var combineRect = getUrlCombineHotRect(contents);
					combineRect.x = contentRect.x;
					combineRect.y = contentRect.y;
					if (isHitRect(param.x, param.y, combineRect)) {
						container.add(pen.config.rect(Object.assign(Object.assign({}, combineRect), {
							borderRadius: style.size.borderRadius,
							background: style.color.hoverBackground,
							onClick: () => {
								this.action.openCellLink(fieldId, param.recordId);
							},
							onTap: () => {
								this.action.openCellLink(fieldId, param.recordId);
							}
						})), 0, 0, param.clipRect);
						return true;
					}
					break;
				case FieldType.CHECKBOX:
					if (isHitRect(param.x, param.y, contentRect)) {
						container.add(pen.config.rect(Object.assign(Object.assign({}, contentRect), {
							borderRadius: style.size.borderRadius,
							background: style.color.hoverBackground,
							onClick: () => {
								this.action.toggleCellCheckbox(fieldId, param.recordId);
							}
						})));
						return true;
					}
					break;
			}
			return false;
		};
		return CardContentHover;
	}();
}));
//#endregion
export { init_content_hover as n, CardContentHover as t };
