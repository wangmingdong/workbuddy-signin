import { a as extractArdotOpenDesignFileId, i as extractArdotCanvasFileId, o as init_ardot_canvas, r as buildArdotWebFileUrl } from "./ardot-canvas-BbVvf1Ta.js";
//#region ../../packages/agent-ui/src/utils/share/common/share-ardot-virtual.ts
init_ardot_canvas();
/**
* 从会话产物列表中提取 ardot 画布等虚拟产物，构造为可直接注入 artifactUrlMap 的条目。
*
* ardot 产物的 uri 是 `ardot://canvas/<fileId>`（虚拟 URI，不在 cwd 文件系统中），
* 无法通过 readCwdArtifacts 扫描或 uploadArtifacts 上传。但它们已有公开访问 URL
*（`https://ardot.tencent.com/file/<fileId>`），可直接作为分享卡片的跳转链接。
*
* 返回的条目由 createTemplateShare / createStaticShare 在 uploadArtifacts 之后
* merge 进 artifactUrlMap，使分享模板的 groupShareArtifacts 能将其归入 bottom 区展示。
*/
function collectArdotVirtualArtifacts(artifacts, messages) {
	const fileIdToRequestId = buildArdotFileIdRequestIdMap(messages);
	const result = [];
	for (const artifact of artifacts) {
		if (artifact.type !== "ardot_canvas") continue;
		const fileId = extractArdotCanvasFileId({ uri: artifact.uri });
		if (!fileId) continue;
		const requestId = fileIdToRequestId.get(fileId) ?? (artifact.title ? fileIdToRequestId.get(`__fileName__${artifact.title}`) : void 0) ?? pickArtifactRequestId(artifact._meta);
		result.push({
			path: artifact.uri,
			name: artifact.title || artifact.name || "Ardot 画布",
			url: buildArdotWebFileUrl(fileId),
			type: "ardot",
			iconKind: "ardot",
			size: artifact.size,
			requestId
		});
	}
	return result;
}
/** 扫描 mcp__ardot__* 工具调用，建立 fileId/fileName → requestId 映射 */
function buildArdotFileIdRequestIdMap(messages) {
	const map = /* @__PURE__ */ new Map();
	const fileNameToRequestId = /* @__PURE__ */ new Map();
	if (!messages) return map;
	for (const raw of messages) {
		const msg = raw;
		if (!msg.requestId || !Array.isArray(msg.content)) continue;
		for (const block of msg.content) {
			if (block.type !== "tool-call" || !block.tool) continue;
			const toolName = block.tool.name || "";
			if (!toolName.startsWith("mcp__ardot__")) continue;
			const argsFileName = block.tool.args?.fileName;
			const hasFileName = typeof argsFileName === "string" && argsFileName.length > 0;
			const fileId = extractArdotToolCallFileId(toolName, block.tool);
			if (fileId != null && map.has(fileId) && (!hasFileName || fileNameToRequestId.has(argsFileName))) continue;
			if (fileId && !map.has(fileId)) map.set(fileId, msg.requestId);
			if (hasFileName && !fileNameToRequestId.has(argsFileName)) fileNameToRequestId.set(argsFileName, msg.requestId);
		}
	}
	for (const [name, rid] of fileNameToRequestId.entries()) map.set(`__fileName__${name}`, rid);
	return map;
}
/** 从 ardot 工具调用提取 fileId：create_design 取 result.fileId，open_design 取 args.fileUrl */
function extractArdotToolCallFileId(toolName, tool) {
	if (toolName === "mcp__ardot__create_design") {
		const result = tool.result;
		if (typeof result?.fileId === "string" || typeof result?.fileId === "number") return String(result.fileId);
	}
	if (toolName === "mcp__ardot__open_design") {
		const fileUrl = tool.args?.fileUrl;
		if (typeof fileUrl === "string") return extractArdotOpenDesignFileId(fileUrl);
		if (typeof fileUrl === "number") return String(fileUrl);
	}
}
/** 从 _meta 提取 requestId（容错 requestId / codebuddy.ai/requestId 两种 key） */
function pickArtifactRequestId(meta) {
	if (!meta) return;
	const candidate = meta.requestId ?? meta["codebuddy.ai/requestId"];
	return typeof candidate === "string" && candidate ? candidate : void 0;
}
//#endregion
export { collectArdotVirtualArtifacts as t };
