import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { bt as createProductFeatureHook, xt as init_create_product_feature_hook } from "./product-features-N4Z0q4SS.js";
//#region ../../packages/agent-ui/src/hooks/use-tencent-docs-ai-edit-enterprise-feature.ts
/**
* 获取腾讯文档企业版「AI 编辑」入口灰度开关状态。
*
* @returns true 表示远端配置 TencentDocsAiEditEnterprise 已启用；false 表示关闭 / 未配置 / 未决态
*/
function useTencentDocsAiEditEnterpriseFeature() {
	return feature.useFeature() ?? false;
}
var feature, resetTencentDocsAiEditEnterpriseFeatureCache;
var init_use_tencent_docs_ai_edit_enterprise_feature = __esmMin((() => {
	init_create_product_feature_hook();
	feature = createProductFeatureHook({
		featureKey: "TencentDocsAiEditEnterprise",
		resolve: (features) => features.TencentDocsAiEditEnterprise === true
	});
	resetTencentDocsAiEditEnterpriseFeatureCache = feature.resetFeatureCache;
}));
//#endregion
export { resetTencentDocsAiEditEnterpriseFeatureCache as n, useTencentDocsAiEditEnterpriseFeature as r, init_use_tencent_docs_ai_edit_enterprise_feature as t };
