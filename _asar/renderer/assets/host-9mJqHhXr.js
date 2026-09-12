import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/main-content-core/utils/new-task-draft.ts
/** 构建新建任务输入框 draft key，必须与 use-input-draft.ts 的 tasks 面板 key 保持一致。 */
function buildNewTaskDraftKey(uid) {
	return uid ? `${NEW_TASK_DRAFT_BASE_KEY}:${uid}` : NEW_TASK_DRAFT_BASE_KEY;
}
/** 提取 resource_link block 的 URI，用于跨资料库添加到任务时去重。 */
function getBlockUri(block) {
	if (block.type === "resource_link") return block.uri;
}
/** 读取指定 draft key 下已保存的输入框 blocks。 */
function readBlocksFromDraft(draftKey) {
	try {
		const raw = localStorage.getItem(draftKey);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
/** 按 URI 去重，过滤掉 draft 中已存在的 resource_link block。 */
function deduplicateBlocksByUri(blocks, draftKey) {
	const existingUris = new Set(readBlocksFromDraft(draftKey).map(getBlockUri).filter((uri) => Boolean(uri)));
	if (existingUris.size === 0) return blocks;
	return blocks.filter((block) => {
		const uri = getBlockUri(block);
		return !uri || !existingUris.has(uri);
	});
}
/** 在多个输入框 block 之间插入空格，保持 phrase chip 的自然 inline 排列。 */
function interleaveWithSpaces(blocks) {
	if (blocks.length <= 1) return blocks;
	const result = [];
	for (let i = 0; i < blocks.length; i++) {
		if (i > 0) result.push({
			type: "text",
			text: " "
		});
		result.push(blocks[i]);
	}
	return result;
}
/** 规范化写入内容：block 间补空格，末尾补一个空格作为 Slate 光标锚点。 */
function normalizeDraftBlocks(blocks) {
	if (blocks.length === 0) return [];
	return [...interleaveWithSpaces(blocks), {
		type: "text",
		text: " "
	}];
}
/** 覆盖新建任务 draft，用于 clearFirst 语义的资料库添加到任务。 */
function overwriteBlocksToDraft(blocks, draftKey) {
	try {
		localStorage.setItem(draftKey, JSON.stringify(normalizeDraftBlocks(blocks)));
	} catch {}
}
/**
* 追加新建任务 draft。
* 调用方应先用 deduplicateBlocksByUri 过滤重复 resource_link，避免多次添加重复 chip。
*/
function appendBlocksToDraft(blocks, draftKey) {
	if (blocks.length === 0) return;
	const existing = readBlocksFromDraft(draftKey);
	const spacedBlocks = interleaveWithSpaces(blocks);
	const withTrailingSpace = [...existing.length > 0 ? [
		...existing,
		{
			type: "text",
			text: " "
		},
		...spacedBlocks
	] : spacedBlocks, {
		type: "text",
		text: " "
	}];
	try {
		localStorage.setItem(draftKey, JSON.stringify(withTrailingSpace));
	} catch {}
}
var NEW_TASK_DRAFT_BASE_KEY;
var init_new_task_draft = __esmMin((() => {
	NEW_TASK_DRAFT_BASE_KEY = "cb-draft:panel:tasks";
}));
//#endregion
//#region ../../packages/iframe-sdk/src/protocol.ts
var BRIDGE_PROTOCOL_VERSION, HostToClientMessageType;
var init_protocol = __esmMin((() => {
	BRIDGE_PROTOCOL_VERSION = "1.2.0";
	HostToClientMessageType = /* @__PURE__ */ function(HostToClientMessageType) {
		/** 宿主已就绪，下发宿主上下文（theme/locale/…） */
		HostToClientMessageType["HostReady"] = "host:ready";
		/** 宿主主题变化 */
		HostToClientMessageType["ThemeChanged"] = "host:theme:changed";
		/** 宿主语言变化 */
		HostToClientMessageType["LocaleChanged"] = "host:locale:changed";
		/** 宿主请求 iframe 刷新授权态 */
		HostToClientMessageType["AuthRefreshRequest"] = "host:auth:refresh-request";
		/** 宿主通知 iframe 授权已完成（用户在独立浏览器完成，回跳后宿主广播给 iframe） */
		HostToClientMessageType["AuthChanged"] = "host:auth:changed";
		/** 宿主通知 iframe 面板可见性变化 */
		HostToClientMessageType["VisibilityChanged"] = "host:visibility:changed";
		/** 宿主请求 iframe 打开文件预览 */
		HostToClientMessageType["PreviewOpen"] = "host:preview:open";
		/** JSAPI 响应 */
		HostToClientMessageType["JsApiResponse"] = "host:jsapi:response";
		return HostToClientMessageType;
	}({});
}));
//#endregion
//#region ../../packages/iframe-sdk/src/host-bridge.ts
/** 构建 host 消息的 meta 字段 */
function buildHostMeta() {
	return {
		protocolVersion: BRIDGE_PROTOCOL_VERSION,
		timestamp: Date.now()
	};
}
var DEFAULT_ALLOWED_ORIGINS, ImaHostBridge;
var init_host_bridge = __esmMin((() => {
	init_protocol();
	DEFAULT_ALLOWED_ORIGINS = ["https://ima.qq.com", "https://ima-preview.qq.com"];
	ImaHostBridge = class {
		constructor(options = {}) {
			this.attached = false;
			this.targetWindow = null;
			this.lastOrigin = "*";
			this.boundHandler = null;
			this.allowedOrigins = new Set(options.allowedOrigins ?? DEFAULT_ALLOWED_ORIGINS);
			this.handlers = options.handlers ?? {};
		}
		/** 挂载 message 监听器 */
		attach() {
			if (this.attached || typeof window === "undefined") return;
			this.boundHandler = this.onMessage.bind(this);
			window.addEventListener("message", this.boundHandler);
			this.attached = true;
			console.log(`[IMA-Host] bridge attached, allowedOrigins=[${[...this.allowedOrigins].join(",")}]`);
		}
		/** 卸载 message 监听器 */
		detach() {
			if (!this.attached || !this.boundHandler) return;
			window.removeEventListener("message", this.boundHandler);
			this.boundHandler = null;
			this.attached = false;
		}
		/** 是否已挂载 */
		isAttached() {
			return this.attached;
		}
		/** 更新 handler（上层 ref 变化时调用） */
		setHandlers(handlers) {
			this.handlers = handlers;
		}
		/** 更新允许的 origin 列表 */
		setAllowedOrigins(origins) {
			this.allowedOrigins = new Set(origins);
		}
		/** 设置发送消息的目标 window（iframe contentWindow） */
		setTarget(target) {
			this.targetWindow = target;
		}
		/** 获取当前发送 origin */
		getLastOrigin() {
			return this.lastOrigin;
		}
		/** 获取 ImaHostSender 对象，可绑定到上层 UI 组件 */
		get sender() {
			return {
				sendHostReady: (payload) => this.send("host:ready", {
					...payload,
					code: payload.code ?? 0,
					msg: payload.msg ?? "ok"
				}),
				sendThemeChanged: (theme) => this.send("host:theme:changed", {
					code: 0,
					msg: "ok",
					theme
				}),
				sendLocaleChanged: (locale) => this.send("host:locale:changed", {
					code: 0,
					msg: "ok",
					locale
				}),
				sendAuthChanged: (authed, userId) => this.send("host:auth:changed", {
					code: 0,
					msg: "ok",
					authed,
					userId
				}),
				sendAuthRefreshRequest: (reason) => this.send("host:auth:refresh-request", {
					code: 0,
					msg: "ok",
					reason
				}),
				sendVisibilityChanged: (visible) => this.send(HostToClientMessageType.VisibilityChanged, {
					code: 0,
					msg: "ok",
					visible
				}),
				sendPreviewOpen: (payload) => this.send(HostToClientMessageType.PreviewOpen, {
					...payload,
					code: payload.code ?? 0,
					msg: payload.msg ?? "ok"
				})
			};
		}
		/** 通用发送：host → iframe */
		send(type, payload) {
			const target = this.targetWindow;
			if (!target) {
				console.warn(`[IMA-Host] send: targetWindow is null, message dropped: type=${type}`);
				return;
			}
			const origin = this.getSendOrigin();
			const message = {
				type,
				payload,
				meta: buildHostMeta()
			};
			try {
				target.postMessage(message, origin);
			} catch (e) {
				console.error(`[IMA-Host] send FAILED: type=${type}, origin=${origin}, error=`, e);
			}
		}
		/** 构建发送 origin（优先已记录的可信 origin，fallback 首个允许的 origin） */
		getSendOrigin() {
			if (this.lastOrigin !== "*") return this.lastOrigin;
			const first = this.allowedOrigins.values().next();
			return first.done ? "*" : first.value;
		}
		/** 消息监听核心逻辑 */
		onMessage(event) {
			if (!this.allowedOrigins.has(event.origin)) {
				const d = event.data;
				if (d && (d.source === "ima" || typeof d.type === "string" && d.type.startsWith("ima:"))) console.warn(`[IMA-Host] ORIGIN REJECTED: event.origin="${event.origin}", allowedOrigins=[${[...this.allowedOrigins].join(",")}], msgType=${d.type}`);
				return;
			}
			const data = event.data;
			if (!data || typeof data.type !== "string") return;
			if (data.source && data.source !== "ima") return;
			this.lastOrigin = event.origin;
			this.dispatch(data, event);
		}
		/** 消息路由 */
		dispatch(msg, event) {
			switch (msg.type) {
				case "ima:ready": {
					const payload = msg.payload;
					this.handlers.onImaReady?.({
						imaSdkVersion: payload?.imaSdkVersion,
						supportedProtocolVersions: payload?.supportedProtocolVersions
					});
					break;
				}
				case "ima:jsapi:request": {
					const payload = msg.payload;
					if (!payload || !payload.requestId || !payload.method) {
						console.warn("[IMA-Host] dispatch: ima:jsapi:request missing requestId or method, payload:", JSON.stringify(payload));
						break;
					}
					const { requestId, method, params } = payload;
					if (!this.handlers.onJsApiRequest) {
						console.warn(`[IMA-Host] dispatch: no onJsApiRequest handler registered for method=${method}`);
						this.sendJsApiResponse(event, requestId, false, void 0, {
							code: "NOT_IMPLEMENTED",
							message: `JSAPI method '${method}' is not implemented by the host`
						});
						break;
					}
					const context = { origin: event.origin };
					this.handlers.onJsApiRequest(method, params, context).then((data) => {
						this.sendJsApiResponse(event, requestId, true, data);
					}).catch((err) => {
						console.error(`[IMA-Host] dispatch: JSAPI handler rejected — method=${method}, requestId=${requestId}, error=`, err);
						this.sendJsApiResponse(event, requestId, false, void 0, {
							code: "JSAPI_ERROR",
							message: err instanceof Error ? err.message : String(err)
						});
					});
					break;
				}
				default: break;
			}
		}
		/** 回传 JSAPI 响应 */
		sendJsApiResponse(event, requestId, success, data, error) {
			const targetWindow = event.source ?? this.targetWindow;
			if (!targetWindow) {
				console.warn("[IMA-Host] sendJsApiResponse: no target window, response dropped for requestId:", requestId);
				return;
			}
			const targetOrigin = event.origin ?? "*";
			const responsePayload = {
				requestId,
				success,
				code: success ? 0 : -1,
				msg: success ? "ok" : error?.message ?? "Unknown error",
				...data !== void 0 ? { data } : {},
				...error ? { error } : {}
			};
			const response = {
				type: HostToClientMessageType.JsApiResponse,
				payload: responsePayload,
				meta: buildHostMeta()
			};
			try {
				targetWindow.postMessage(response, targetOrigin);
			} catch (e) {
				console.error("[IMA-Host] sendJsApiResponse: postMessage failed:", e);
			}
		}
	};
}));
//#endregion
//#region ../../packages/iframe-sdk/src/host.ts
var init_host = __esmMin((() => {
	init_protocol();
	init_host_bridge();
}));
//#endregion
export { appendBlocksToDraft as a, init_new_task_draft as c, HostToClientMessageType as i, overwriteBlocksToDraft as l, ImaHostBridge as n, buildNewTaskDraftKey as o, BRIDGE_PROTOCOL_VERSION as r, deduplicateBlocksByUri as s, init_host as t };
