import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $l as init_es, Xu as domainConfig } from "./execution-result-erkS5q1j.js";
import { v as WbSharedConfig, y as init_wb_config } from "./canvas-view-DDuMsrmC.js";
//#region ../../node_modules/@tencent/xtable-view/es/wb_views/shared/field-title.js
/**
* wb 宿主下将「原始字段 title」映射为业务侧约定的展示文案。
*
* - 非 wb 宿主：原样返回；
* - wb 宿主：命中 `fieldTitleMap` 用映射后的文案，未命中保持原 title；
* - rawTitle 为空时原样返回（保留 undefined / 空串语义）。
*/ function mapWbFieldTitle(rawTitle) {
	var _a;
	if (!rawTitle || !domainConfig.getIsWb()) return rawTitle;
	var mapped = (_a = WbSharedConfig.fieldTitleMap) === null || _a === void 0 ? void 0 : _a[rawTitle];
	return mapped !== null && mapped !== void 0 ? mapped : rawTitle;
}
var init_field_title = __esmMin((() => {
	init_es();
	init_wb_config();
}));
//#endregion
export { mapWbFieldTitle as n, init_field_title as t };
