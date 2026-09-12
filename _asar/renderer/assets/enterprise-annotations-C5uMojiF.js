import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/enterprise-annotations.ts
/**
* 企业智能体注解读取。
*
* 数据来源：企业智能体（/agents/enterprise-published）在列表 item 顶层返回 annotations，
* 与普通助理放在 manifest.annotations 内不同——这里只读顶层，且每个企业智能体各自不同，
* 缺省时返回 undefined / []，由调用方决定兜底（身份→「产品经理」，欢迎语→「有什么可以帮你？」）。
*/
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function firstNonEmptyString(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
/** 企业智能体身份，如「经管助理」；无则 undefined。 */
function getEnterpriseAgentTitle(agent) {
	return firstNonEmptyString(asRecord(agent?.annotations)["agent-title"]);
}
/** 企业智能体空态欢迎语，替换「有什么可以帮你？」；无则 undefined。 */
function getEnterpriseWelcomeMessage(agent) {
	return firstNonEmptyString(asRecord(agent?.annotations)["welcome-message"]);
}
/** 企业智能体空态推荐问题（建议气泡）；无则空数组。 */
function getEnterpriseFollowUpQuestions(agent) {
	const raw = asRecord(agent?.annotations)["follow-up-questions"];
	return Array.isArray(raw) ? raw.map((item) => typeof item === "string" ? item.trim() : "").filter((item) => item.length > 0) : [];
}
var init_enterprise_annotations = __esmMin((() => {}));
//#endregion
export { init_enterprise_annotations as i, getEnterpriseFollowUpQuestions as n, getEnterpriseWelcomeMessage as r, getEnterpriseAgentTitle as t };
