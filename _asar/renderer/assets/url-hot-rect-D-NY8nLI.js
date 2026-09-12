import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { K as init_lib, X as DrawType } from "./canvas-view-DDuMsrmC.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/shared/utils/url-hot-rect.js
/**
* 获取 url 内容的热区（各自单独，不合并）
* @param contents
* @returns
*/ function getUrlHotRects(contents) {
	var hotRects = [];
	for (var content of contents) if (content.type === DrawType.Bitmap) {
		var { x, y, width, height } = content;
		hotRects.push({
			x,
			y,
			width,
			height
		});
	} else if (content.type === DrawType.Text) {
		var { layouts = [], x: x1, y: y1 } = content;
		for (var layout of layouts) hotRects.push({
			x: x1 + layout.x,
			y: y1 + layout.y,
			width: layout.width,
			height: layout.height
		});
	}
	return hotRects;
}
/**
* 获取 url 内容的热区（所有热区合并）
* @param contents
*/ function getUrlCombineHotRect(contents) {
	var hotRects = getUrlHotRects(contents);
	var resultRect = {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	if (hotRects.length === 0) return resultRect;
	resultRect = Object.assign({}, hotRects[0]);
	var sameLineOffset = 6;
	if (hotRects.length > 1) {
		var startX = resultRect.x;
		for (var i = 1; i < hotRects.length; i++) {
			var hotRect = hotRects[i];
			if (Math.abs(hotRect.y - resultRect.y) < sameLineOffset) {
				resultRect.width = hotRect.x + hotRect.width - startX;
				resultRect.height = Math.max(resultRect.height, hotRect.height);
			} else {
				resultRect.height = Math.ceil(hotRect.y + hotRect.height - resultRect.y);
				resultRect.width = Math.max(resultRect.width, hotRect.width);
			}
		}
	}
	resultRect.width += sameLineOffset / 2;
	resultRect.height += sameLineOffset;
	return resultRect;
}
var init_url_hot_rect = __esmMin((() => {
	init_lib();
}));
//#endregion
export { getUrlHotRects as n, init_url_hot_rect as r, getUrlCombineHotRect as t };
