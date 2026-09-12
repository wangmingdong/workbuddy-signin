import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/ardot-canvas.ts
/**
* 从正式 Ardot artifact 中提取 fileId。
*
* 仅识别 `ardot://canvas/<fileId>`(由 `gateway.onArdotReady` 写入,
* 也是 `useArtifactsManager` 映射 `customType==='ardot/canvas'` 时
* 用作 `ArtifactItem.id` / `.uri` 的字符串)。synthetic「新画布」item 的
* id (`design-new-canvas:<sessionId>`) 不会进入这里。
*
* 不传 / 非 Ardot artifact / 解析失败 → undefined,调用方据此决定
* 是否走"按 fileId 打开画布"的快路径。
*/
function extractArdotCanvasFileId(input) {
	if (!input) return;
	const candidates = [typeof input.uri === "string" ? input.uri : void 0, typeof input.id === "string" ? input.id : void 0];
	for (const candidate of candidates) {
		if (!candidate || !candidate.startsWith("ardot://canvas/")) continue;
		const fileId = candidate.slice(15).trim();
		if (fileId.length > 0) return fileId;
	}
}
/**
* 根据 fileId 构造 Ardot 站点的公开访问 URL。
*
* 用于分享场景：ardot 产物（`ardot://canvas/<fileId>`）是虚拟 URI，
* 无法直接在浏览器打开。分享卡片需要构造一个可公开访问的 http URL，
* 让用户点击后跳转到 Ardot 站点查看画布。
*
* 选用 `/file/<id>` 直链（而非 `/embed`）：
* - `/embed` 需要 postMessage 握手 + 授权 token 注入，仅适用于内嵌预览；
* - `/file/<id>` 是 Ardot 编辑器/查看器直链，适合分享页外部跳转。
*/
function buildArdotWebFileUrl(fileId) {
	return `${ARDOT_WEB_FILE_BASE_URL}${encodeURIComponent(fileId)}?from=workbuddy`;
}
/**
* 从 `ardot/open_design` 的 `fileUrl` 入参解析 fileId。
*
* Ardot MCP server 的 open_design schema 是 `{ fileUrl: string }`,
* 其中 `fileUrl` 可以是纯数字 fileId,也可以是 `<host>/file/<id>`
* 形式的 URL。这里不校验 host,只抽取路径中的 `/file/<id>`,
* 供 UI 侧把 Agent live tool_call 的目标画布同步到已有正式 artifact。
*/
function extractArdotOpenDesignFileId(fileUrl) {
	if (typeof fileUrl !== "string") return;
	const trimmed = fileUrl.trim();
	if (!trimmed) return;
	if (/^\d+$/.test(trimmed)) return trimmed;
	try {
		const url = new URL(trimmed);
		return /^\/file\/(\d+)\/?$/.exec(url.pathname)?.[1];
	} catch {
		return;
	}
}
function normalizeArdotReadyFileId(fileId) {
	if (typeof fileId === "string") {
		const trimmed = fileId.trim();
		return trimmed.length > 0 ? trimmed : void 0;
	}
	if (typeof fileId === "number" && Number.isFinite(fileId)) return String(fileId);
	if (typeof fileId === "bigint") return fileId.toString();
}
/**
* 判断一个 URL 是否是可直接嵌入的 ardot embed URL。
*
* 后端约定灵感 link 类型的 ardot 稿件下发格式：
*   `https://<ardot|test.ardot>.tencent.com/embed?host=workbuddy-playbook&viewer=0&file_id=<id>[&m=slide]`
*
* 只接受 pathname === '/embed'、hostname 命中白名单、协议为 https；
* 其他 link（普通外部网页 / 老 `/file/<id>` 编辑器直链 / 非灵感场景）不走
* 内嵌 ardot 分支，保留裸 iframe 预览路径。
*/
function isArdotEmbedUrl(url) {
	if (typeof url !== "string" || url.trim().length === 0) return false;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== "https:") return false;
		if (!ARDOT_EMBED_HOSTNAMES.has(parsed.hostname)) return false;
		if (parsed.pathname !== "/embed") return false;
		const fileId = parsed.searchParams.get("file_id");
		return !!fileId && /^\d+$/.test(fileId);
	} catch {
		return false;
	}
}
function resolveArdotLastOpenedTarget(input) {
	if (input.appId !== "ardot/open_design" && input.appId !== "ardot/create_design") return;
	const fileId = extractArdotOpenDesignFileId(input.toolInput?.fileUrl);
	if (fileId) return {
		kind: "canvas",
		appId: "ardot/open_design",
		fileId,
		...input.targetArtifactId ? { artifactId: input.targetArtifactId } : {}
	};
	return {
		kind: "synthetic",
		appId: input.appId
	};
}
var ARDOT_CANVAS_ARTIFACT_CUSTOM_TYPE, ARDOT_CANVAS_URI_PREFIX, ARDOT_WEB_FILE_BASE_URL, ARDOT_EMBED_HOSTNAMES;
var init_ardot_canvas = __esmMin((() => {
	ARDOT_CANVAS_ARTIFACT_CUSTOM_TYPE = "ardot/canvas";
	ARDOT_CANVAS_URI_PREFIX = "ardot://canvas/";
	ARDOT_WEB_FILE_BASE_URL = "https://ardot.tencent.com/file/";
	ARDOT_EMBED_HOSTNAMES = new Set(["ardot.tencent.com", "test.ardot.tencent.com"]);
}));
//#endregion
export { extractArdotOpenDesignFileId as a, normalizeArdotReadyFileId as c, extractArdotCanvasFileId as i, resolveArdotLastOpenedTarget as l, ARDOT_CANVAS_URI_PREFIX as n, init_ardot_canvas as o, buildArdotWebFileUrl as r, isArdotEmbedUrl as s, ARDOT_CANVAS_ARTIFACT_CUSTOM_TYPE as t };
