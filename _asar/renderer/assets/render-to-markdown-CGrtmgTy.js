import { p as init_environment, t as getBrandName } from "./environment-DKqg3f0G.js";
//#region ../../packages/agent-ui/src/components/share-preview/task/html-generator/render-to-markdown.ts
init_environment();
/**
* 从消息列表生成 Markdown 字符串。
*
* 格式：
* - user 消息：`## 用户\n\n{text}`
* - assistant 消息：`## CodeBuddy\n\n{text}`（仅 text 块，跳过 tool-call / reasoning）
* - 产物链接：消息末尾附加 `[文件名](url)` 列表
*/
function renderToMarkdown(messages, name, artifactUrlMap) {
	const lines = [];
	const brand = getBrandName();
	lines.push(`# ${name || `${brand} 对话记录`}`);
	lines.push("");
	lines.push(`> 导出自 ${brand}`);
	lines.push("");
	lines.push("---");
	lines.push("");
	const processedRequestIds = /* @__PURE__ */ new Set();
	for (const msg of messages) if (msg.messageType === "user") {
		const text = extractUserText(msg);
		if (!text) continue;
		lines.push("## 👤 用户");
		lines.push("");
		lines.push(text);
		lines.push("");
		lines.push("---");
		lines.push("");
	} else if (msg.messageType === "assistant") {
		const reqId = msg.requestId || msg.id || "";
		if (reqId && processedRequestIds.has(reqId)) continue;
		if (reqId) processedRequestIds.add(reqId);
		const siblingMessages = reqId ? messages.filter((m) => m.messageType === "assistant" && (m.requestId || m.id) === reqId) : [msg];
		const text = siblingMessages.map((m) => extractAssistantText(m)).filter(Boolean).join("\n\n");
		if (!text) continue;
		lines.push("## 🤖 CodeBuddy");
		lines.push("");
		lines.push(text);
		if (artifactUrlMap && artifactUrlMap.size > 0) {
			const presentedFiles = getPresentedFiles(siblingMessages, artifactUrlMap);
			if (presentedFiles.length > 0) {
				lines.push("");
				lines.push("**产物：**");
				lines.push("");
				for (const { name: fileName, url } of presentedFiles) lines.push(`- [${fileName}](${url})`);
			}
		}
		lines.push("");
		lines.push("---");
		lines.push("");
	}
	return lines.join("\n");
}
/** 提取 user 消息的文本内容 */
function extractUserText(msg) {
	const parts = [];
	for (const block of msg.content ?? []) if (block.type === "text" && block.text) {
		const cleaned = block.text.replace(/<question_answer>[\s\S]*?<\/question_answer>/g, "").replace(/<\/?question_answer>/g, "").replace(/<\/?question_item[^>]*>/g, "").replace(/<\/?question>/g, "").replace(/<\/?answers>/g, "").replace(/<\/?questions>/g, "").trim();
		if (cleaned) parts.push(cleaned);
	}
	return parts.join("\n\n");
}
/** 提取 assistant 消息的纯文本内容（跳过 tool-call / reasoning） */
function extractAssistantText(msg) {
	const parts = [];
	for (const block of msg.content ?? []) if (block.type === "text" && block.text?.trim()) parts.push(block.text.trim());
	return parts.join("\n\n");
}
/** 找消息里 present_files 工具调用声明的产物，与 artifactUrlMap 匹配 */
function getPresentedFiles(msgs, artifactUrlMap) {
	const result = [];
	const seen = /* @__PURE__ */ new Set();
	for (const msg of msgs) for (const block of msg.content ?? []) {
		if (block.type !== "tool-call" || !block.tool) continue;
		const toolName = block.tool.name || "";
		if (toolName !== "present_files" && toolName !== "PresentFiles") continue;
		const args = block.tool.args || {};
		const filePaths = [...Array.isArray(args.files) ? args.files : [], ...Array.isArray(args.paths) ? args.paths : []];
		for (const filePath of filePaths) {
			if (filePath.startsWith("http://") || filePath.startsWith("https://") || filePath.startsWith("file://")) continue;
			const basename = filePath.split("/").pop() || filePath.split("\\").pop() || filePath;
			if (seen.has(basename)) continue;
			for (const [mapPath, { url }] of artifactUrlMap.entries()) if ((mapPath.split("/").pop() || mapPath.split("\\").pop() || mapPath) === basename) {
				result.push({
					name: basename,
					url
				});
				seen.add(basename);
				break;
			}
		}
	}
	return result;
}
//#endregion
export { renderToMarkdown };
