import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { vt as init_style, yt as style } from "./canvas-view-DDuMsrmC.js";
import { S as init_field_collector, x as fieldCollector } from "./auto-scroll-Cn43Kqkt.js";
//#region ../../node_modules/@tencent/xtable-view/es/views/grid/collector/content/config.js
/**
* 默认单元格内容收集配置
* @returns
*/ function getDefaultContentCollectConfig() {
	return fieldCollector.getDefaultConfig({
		maxLines: 1,
		textConfig: { verticalAlign: "top" },
		labelConfig: {
			canWrap: false,
			canDelete: false,
			tagHeight: style.size.tagLarge
		},
		checkboxConfig: { hasTitle: false }
	});
}
/**
* 默认分组值收集配置
* @returns
*/ function getDefaultGroupValueCollectConfig() {
	var config = getDefaultContentCollectConfig();
	config.textConfig.fontStyle = "bold";
	config.textConfig.verticalAlign = "top";
	config.textConfig.lineHeight = 1.6;
	config.labelConfig.tagHeight = style.size.tagLarge;
	config.textConfig.fontSize = style.size.fontSizeLarge;
	config.checkboxConfig.hasTitle = true;
	return config;
}
var init_config = __esmMin((() => {
	init_field_collector();
	init_style();
}));
//#endregion
export { getDefaultGroupValueCollectConfig as n, init_config as r, getDefaultContentCollectConfig as t };
