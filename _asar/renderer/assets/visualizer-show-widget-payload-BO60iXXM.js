import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/tools/renderers/visualizer/visualizer-show-widget-payload.ts
function parseStringArray(value) {
	if (Array.isArray(value)) return value.map((item) => typeof item === "string" ? item : String(item)).map((item) => item.trim()).filter(Boolean);
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return [];
		if (trimmed.startsWith("[")) try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed)) return parsed.map((item) => typeof item === "string" ? item : String(item)).map((item) => item.trim()).filter(Boolean);
		} catch {}
		return trimmed.replace(/^\[/, "").replace(/\]$/, "").split(/[\n,，]/g).map((item) => item.trim()).map((item) => item.replace(/^["'“”‘’]+/, "").replace(/["'“”‘’]+$/, "").trim()).filter(Boolean);
	}
	return [];
}
function parseJsonSafe(value) {
	if (typeof value !== "string" || !value.trim()) return;
	try {
		const parsed = JSON.parse(value);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
	} catch {}
}
function mergeArgsPayload(args) {
	const argsRecord = args && typeof args === "object" && !Array.isArray(args) ? args : {};
	const nestedArgs = argsRecord.arguments && typeof argsRecord.arguments === "object" && !Array.isArray(argsRecord.arguments) ? argsRecord.arguments : {};
	const source = {
		...argsRecord,
		...nestedArgs
	};
	return {
		title: typeof source.title === "string" ? source.title : void 0,
		widget_code: typeof source.widget_code === "string" && source.widget_code !== "" ? source.widget_code : typeof source.widgetCode === "string" && source.widgetCode !== "" ? source.widgetCode : void 0,
		loading_messages: parseStringArray(source.loading_messages ?? source.loadingMessages)
	};
}
function tryExtractFromMcpLikeResult(rawResult) {
	if (!rawResult || typeof rawResult !== "object" || Array.isArray(rawResult)) return;
	const data = rawResult.data;
	if (!Array.isArray(data)) return;
	return parseJsonSafe(data.filter((item) => item && typeof item === "object" && item.type === "text").map((item) => item.text).find((text) => typeof text === "string" && text.trim().length > 0));
}
function extractShowWidgetResult(rawResult) {
	const stack = [rawResult];
	while (stack.length > 0) {
		const current = stack.pop();
		if (!current || typeof current !== "object") continue;
		if (Array.isArray(current)) {
			stack.push(...current);
			continue;
		}
		const obj = current;
		if (obj.type === "visualizer_show_widget_result") return obj;
		const mcpLike = tryExtractFromMcpLikeResult(obj);
		if (mcpLike) stack.push(mcpLike);
		if (typeof obj.result === "string") {
			const parsed = parseJsonSafe(obj.result);
			if (parsed) stack.push(parsed);
		}
		Object.values(obj).forEach((value) => {
			if (value && typeof value === "object") stack.push(value);
		});
	}
}
function parsePayload(tool) {
	const argsPayload = mergeArgsPayload(tool.args);
	const rawResult = tool.result?.result;
	const direct = extractShowWidgetResult(rawResult);
	if (!direct) return argsPayload;
	const resultMessages = parseStringArray(direct.loading_messages ?? direct.loadingMessages);
	return {
		title: typeof direct.title === "string" ? direct.title : argsPayload.title,
		widget_code: typeof direct.widget_code === "string" && direct.widget_code !== "" ? direct.widget_code : typeof direct.widgetCode === "string" && direct.widgetCode !== "" ? direct.widgetCode : argsPayload.widget_code,
		loading_messages: resultMessages.length > 0 ? resultMessages : argsPayload.loading_messages
	};
}
var init_visualizer_show_widget_payload = __esmMin((() => {}));
//#endregion
export { parsePayload as n, init_visualizer_show_widget_payload as t };
