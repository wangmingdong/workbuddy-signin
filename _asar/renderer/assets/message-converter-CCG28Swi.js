import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { G as decodeInputTextToAcpContentBlocks, K as decodePersistedUserContentToAcpContentBlocks, W as init_common, et as stripPromptContextXml } from "./common-CwB_VqKR.js";
import { Gs as createPhraseBlock, t as init_src } from "./src-DRGoWjIu.js";
import { r as init_chat_types, t as MessageType } from "./chat-types-BMkaZPiE.js";
import { i as BehaviorSubject, n as init__esm5 } from "./_esm5-RYAsZ7Wr.js";
//#region ../../packages/agent-ui/src/modules/poi/data/city-tree.ts
/**
* 设置城市树 CDN 数据源 URL。
* 应在 adapter 拿到产品配置后调用一次（如 _fetchProductConfiguration 时）。
*/
function setCityTreeUrl(url) {
	_cdnUrl = url;
	const resolvers = _urlReadyResolvers;
	_urlReadyResolvers = [];
	for (const resolve of resolvers) resolve();
}
/**
* 等待城市树 CDN URL 被注入，最多等待指定毫秒数。
* URL 已就绪时立即 resolve；超时后也 resolve（让调用方尝试加载并在失败时降级）。
*/
function waitForCityTreeUrl(timeoutMs = 3e3) {
	if (_cdnUrl) return Promise.resolve();
	return new Promise((resolve) => {
		const timer = setTimeout(() => {
			_urlReadyResolvers = _urlReadyResolvers.filter((r) => r !== resolver);
			resolve();
		}, timeoutMs);
		const resolver = () => {
			clearTimeout(timer);
			resolve();
		};
		_urlReadyResolvers.push(resolver);
	});
}
/** 同步获取缓存的城市树（尚未加载时返回 undefined） */
function getCachedCityTree() {
	return cached;
}
/**
* 懒加载城市树。
* 多次并发调用共享同一个 in-flight Promise，加载完成后命中缓存同步返回。
* 失败时清空 in-flight，使后续调用可重新发起（避免 rejected Promise 被永久缓存）。
*
* @param loader 仅供测试注入；生产走默认 fetch。
*/
async function loadCityTree(loader = defaultLoader) {
	if (cached) return cached;
	if (!pending) pending = loader().then((data) => {
		cached = data;
		return data;
	}).catch((err) => {
		pending = void 0;
		throw err;
	});
	return pending;
}
var cached, pending, _cdnUrl, _urlReadyResolvers, defaultLoader;
var init_city_tree = __esmMin((() => {
	_urlReadyResolvers = [];
	defaultLoader = async () => {
		if (!_cdnUrl) await waitForCityTreeUrl(3e3);
		if (!_cdnUrl) return Promise.reject(/* @__PURE__ */ new Error("[CityTree] poiCityTreeUrl 未配置，城市树暂不可用"));
		const resp = await fetch(_cdnUrl);
		if (!resp.ok) throw new Error(`[CityTree] fetch failed: ${resp.status} ${resp.statusText}`);
		return resp.json();
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/hooks/chat-state-store.ts
/**
* 获取或创建会话状态条目
*/
function getOrCreateEntry(sessionId) {
	let entry = sessionStateMap.get(sessionId);
	if (!entry) {
		entry = {
			state: ChatState.IDLE,
			subscribers: /* @__PURE__ */ new Set(),
			changeCallbacks: /* @__PURE__ */ new Set(),
			lastUpdateTimestamp: 0,
			lastUpdateSource: "self"
		};
		sessionStateMap.set(sessionId, entry);
	}
	return entry;
}
/**
* 通知所有订阅者
*/
function notifySubscribers(entry, source, timestamp) {
	entry.subscribers.forEach((cb) => {
		try {
			cb(entry.state);
		} catch (e) {
			console.error("[ChatStateStore] Subscriber error:", e);
		}
	});
	entry.changeCallbacks.forEach((cb) => {
		try {
			cb(entry.state, source, timestamp);
		} catch (e) {
			console.error("[ChatStateStore] ChangeCallback error:", e);
		}
	});
}
var ChatState, ChatStateEvent, STATE_TRANSITIONS, sessionStateMap, chatStateStore;
var init_chat_state_store = __esmMin((() => {
	ChatState = /* @__PURE__ */ function(ChatState) {
		/** 空闲状态 - 可以发送消息 */
		ChatState["IDLE"] = "idle";
		/** 对话中 - 正在等待或接收 AI 响应 */
		ChatState["TALKING"] = "talking";
		/** 规划中 - Agent 正在做计划 */
		ChatState["PLAN"] = "plan";
		return ChatState;
	}({});
	ChatStateEvent = /* @__PURE__ */ function(ChatStateEvent) {
		/** 用户输入/发送消息 -> TALKING */
		ChatStateEvent["INPUT"] = "input";
		/** 收到响应完成 -> IDLE */
		ChatStateEvent["RESPONSE"] = "response";
		/** 停止/取消 -> IDLE */
		ChatStateEvent["STOP"] = "stop";
		/** 发生错误 -> IDLE */
		ChatStateEvent["ERROR"] = "error";
		return ChatStateEvent;
	}({});
	STATE_TRANSITIONS = {
		[ChatState.IDLE]: { [ChatStateEvent.INPUT]: ChatState.TALKING },
		[ChatState.TALKING]: {
			[ChatStateEvent.RESPONSE]: ChatState.IDLE,
			[ChatStateEvent.STOP]: ChatState.IDLE,
			[ChatStateEvent.ERROR]: ChatState.IDLE
		},
		[ChatState.PLAN]: {
			[ChatStateEvent.RESPONSE]: ChatState.IDLE,
			[ChatStateEvent.STOP]: ChatState.IDLE,
			[ChatStateEvent.ERROR]: ChatState.IDLE
		}
	};
	sessionStateMap = /* @__PURE__ */ new Map();
	chatStateStore = {
		getState(sessionId) {
			return sessionStateMap.get(sessionId)?.state ?? ChatState.IDLE;
		},
		getStateMeta(sessionId) {
			const entry = sessionStateMap.get(sessionId);
			return {
				state: entry?.state ?? ChatState.IDLE,
				timestamp: entry?.lastUpdateTimestamp ?? 0,
				source: entry?.lastUpdateSource ?? "self"
			};
		},
		setState(sessionId, state) {
			this.setStateWithMeta(sessionId, state, "self", Date.now());
		},
		setStateWithMeta(sessionId, state, source, timestamp) {
			const entry = getOrCreateEntry(sessionId);
			if (timestamp < entry.lastUpdateTimestamp) return false;
			if (entry.state === state && timestamp === entry.lastUpdateTimestamp) return false;
			const oldState = entry.state;
			entry.state = state;
			entry.lastUpdateTimestamp = timestamp;
			entry.lastUpdateSource = source;
			if (oldState !== state) {}
			notifySubscribers(entry, source, timestamp);
			return true;
		},
		triggerEvent(sessionId, event) {
			this.triggerEventWithMeta(sessionId, event, "self", Date.now());
		},
		triggerEventWithMeta(sessionId, event, source, timestamp) {
			const entry = getOrCreateEntry(sessionId);
			if (timestamp < entry.lastUpdateTimestamp) return false;
			const nextState = STATE_TRANSITIONS[entry.state]?.[event];
			if (nextState && nextState !== entry.state) {
				entry.state = nextState;
				entry.lastUpdateTimestamp = timestamp;
				entry.lastUpdateSource = source;
				notifySubscribers(entry, source, timestamp);
				return true;
			}
			return false;
		},
		subscribe(sessionId, callback) {
			const entry = getOrCreateEntry(sessionId);
			entry.subscribers.add(callback);
			callback(entry.state);
			return () => {
				entry.subscribers.delete(callback);
			};
		},
		subscribeWithMeta(sessionId, callback) {
			const entry = getOrCreateEntry(sessionId);
			entry.changeCallbacks.add(callback);
			callback(entry.state, entry.lastUpdateSource, entry.lastUpdateTimestamp);
			return () => {
				entry.changeCallbacks.delete(callback);
			};
		},
		cleanup(sessionId) {
			const entry = sessionStateMap.get(sessionId);
			if (entry) {
				entry.subscribers.clear();
				entry.changeCallbacks.clear();
				sessionStateMap.delete(sessionId);
			}
		},
		cleanupMany(sessionIds) {
			sessionIds.forEach((id) => this.cleanup(id));
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/subscriptions.ts
var commandSubject, subagentsSubject, modelsSubject;
var init_subscriptions = __esmMin((() => {
	init__esm5();
	commandSubject = new BehaviorSubject(null);
	subagentsSubject = new BehaviorSubject(null);
	modelsSubject = new BehaviorSubject(null);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/colleague-mention-context.ts
function escapeXmlAttribute(value) {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function decodeXmlAttribute$2(value) {
	return value.replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function parseXmlAttributes$2(rawAttrs) {
	const attrs = {};
	rawAttrs.replace(/([\w:-]+)="([^"]*)"/g, (match, key, value) => {
		attrs[key] = decodeXmlAttribute$2(value);
		return match;
	});
	return attrs;
}
function hasMentionedSpecialistsContextText(text) {
	return text.includes("<mentioned_experts>") || text.includes("<mentioned_specialists>") || text.includes("<mentioned_colleagues>");
}
function isMentionedSpecialistsContextMeta(value) {
	return value === "mentioned_experts" || value === LEGACY_MENTIONED_SPECIALISTS_CONTEXT || value === LEGACY_MENTIONED_COLLEAGUES_CONTEXT;
}
function decodeUriComponentSafe(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function getFileReferenceName(uri) {
	const trimmed = decodeUriComponentSafe(uri.startsWith(FILE_URI_PREFIX) ? uri.slice(7) : uri).replace(/\/+$/, "");
	return trimmed.split("/").pop() || trimmed || uri;
}
function findNextInlineReferenceStart(text, from) {
	let next = -1;
	for (const prefix of INLINE_REFERENCE_PREFIXES) {
		const index = text.indexOf(prefix, from);
		if (index >= 0 && (next < 0 || index < next)) next = index;
	}
	return next;
}
function getInlineReferenceBounds(text, valueStart) {
	const nextReferenceStart = findNextInlineReferenceStart(text, valueStart);
	const whitespaceMatch = /\s/u.exec(text.slice(valueStart));
	const whitespaceIndex = whitespaceMatch ? valueStart + whitespaceMatch.index : -1;
	let valueEnd = text.length;
	if (nextReferenceStart >= 0) valueEnd = Math.min(valueEnd, nextReferenceStart);
	if (whitespaceIndex >= 0) valueEnd = Math.min(valueEnd, whitespaceIndex);
	while (valueEnd > valueStart && TRAILING_INLINE_FILE_REFERENCE_PUNCTUATION.has(text[valueEnd - 1])) valueEnd -= 1;
	return valueEnd > valueStart ? { valueEnd } : void 0;
}
function getImageMimeType(filename) {
	const dotIndex = filename.lastIndexOf(".");
	return IMAGE_MIME_TYPE_BY_EXTENSION[dotIndex >= 0 ? filename.slice(dotIndex + 1).toLowerCase() : ""] || "image/png";
}
function createInlineFileReferenceBlock(uri) {
	const filename = getFileReferenceName(uri);
	const isFolder = uri.endsWith("/");
	return {
		type: "resource_link",
		uri,
		name: filename,
		title: filename,
		_meta: {
			displayAsContext: false,
			displayAsPhrase: true,
			type: isFolder ? "folder" : "file",
			mentionType: isFolder ? "folder" : "file",
			icon: isFolder ? "folder" : "file",
			displayText: filename,
			filename,
			fileName: filename,
			filePath: decodeUriComponentSafe(uri.slice(7))
		}
	};
}
function createInlineImageReferenceBlock(imageRef) {
	const filename = getFileReferenceName(imageRef);
	return {
		type: "image",
		data: "",
		uri: imageRef,
		mimeType: getImageMimeType(filename),
		_meta: {
			displayAsContext: false,
			displayAsPhrase: true,
			type: "image",
			mentionType: "image",
			icon: "image",
			displayText: filename,
			filename,
			fileName: filename
		}
	};
}
function createTextBlockFromSource(source, text) {
	return {
		...source,
		type: "text",
		text
	};
}
function expandInlineFileReferencesFromTextBlock(block) {
	const text = block.text;
	if (!INLINE_REFERENCE_PREFIXES.some((prefix) => text.includes(prefix))) return;
	const blocks = [];
	let cursor = 0;
	let parsedAny = false;
	while (cursor < text.length) {
		const start = findNextInlineReferenceStart(text, cursor);
		if (start < 0) break;
		if (start > cursor) blocks.push(createTextBlockFromSource(block, text.slice(cursor, start)));
		const isImageReference = text.startsWith(INLINE_IMAGE_REFERENCE_PREFIX, start);
		const valueStart = isImageReference ? start + 7 : start + 1;
		const bounds = getInlineReferenceBounds(text, valueStart);
		if (!bounds) {
			blocks.push(createTextBlockFromSource(block, text[start]));
			cursor = start + 1;
			continue;
		}
		const value = text.slice(valueStart, bounds.valueEnd);
		blocks.push(isImageReference ? createInlineImageReferenceBlock(value) : createInlineFileReferenceBlock(value));
		parsedAny = true;
		cursor = bounds.valueEnd;
	}
	if (cursor < text.length) blocks.push(createTextBlockFromSource(block, text.slice(cursor)));
	return parsedAny ? blocks : void 0;
}
function isHiddenPromptContextBlock(block) {
	return Boolean(block?._meta?.[HIDDEN_PROMPT_CONTEXT_META_KEY]);
}
function getMentionedColleagueAgentIdFromBlock(block) {
	const candidate = block;
	if (candidate?.type !== "resource_link") return;
	const meta = candidate._meta || {};
	const metaAgentId = meta.expertAgentId || meta.specialistAgentId || meta.agentId;
	if (typeof metaAgentId === "string" && metaAgentId.trim()) return metaAgentId.trim();
	if (typeof candidate.uri === "string" && candidate.uri.startsWith(COLLEAGUE_URI_PREFIX)) return decodeURIComponent(candidate.uri.slice(12));
}
function extractMentionedColleaguesFromContextText(text) {
	if (!text || !hasMentionedSpecialistsContextText(text)) return [];
	const colleagues = [];
	MENTIONED_SPECIALIST_TAG_REGEX.lastIndex = 0;
	let match;
	while (match = MENTIONED_SPECIALIST_TAG_REGEX.exec(text)) {
		const attrs = parseXmlAttributes$2(match[1] || "");
		const agentId = (attrs.agent_id || attrs.agentId || "").trim();
		if (!agentId) continue;
		const name = (attrs.name || attrs.agent_name || attrs.agentName || agentId).trim();
		const profile = (attrs.profile || attrs.description || "").trim();
		const businessAgentId = (attrs.business_agent_id || attrs.businessAgentId || "").trim();
		colleagues.push({
			agentId,
			name,
			...profile ? { profile } : {},
			...businessAgentId ? { businessAgentId } : {}
		});
	}
	return colleagues;
}
function extractMentionedColleagueResourceLinksFromText(text) {
	return extractMentionedColleaguesFromContextText(text).map((colleague) => ({
		type: "resource_link",
		uri: `${COLLEAGUE_URI_PREFIX}${encodeURIComponent(colleague.agentId)}`,
		name: colleague.name,
		title: colleague.name,
		_meta: {
			displayAsContext: false,
			displayAsPhrase: true,
			type: "colleague",
			mentionType: "colleague",
			displayText: colleague.name,
			expertAgentId: colleague.agentId,
			specialistAgentId: colleague.agentId,
			agentId: colleague.agentId,
			agentName: colleague.name,
			icon: "agent",
			...colleague.profile ? { profile: colleague.profile } : {},
			...colleague.businessAgentId ? { businessAgentId: colleague.businessAgentId } : {}
		}
	}));
}
function stripMentionedColleaguesContextText(text) {
	if (!text || !hasMentionedSpecialistsContextText(text)) return text;
	const stripped = text.replace(/<auxiliary>[\s\S]*?<\/auxiliary>\s*/g, "").replace(/<\/?user_query>\s*/g, "").replace(LEAKED_MENTIONED_SPECIALISTS_CONTEXT_REGEX, "").replace(MENTIONED_SPECIALISTS_XML_REGEX, "");
	return stripped === text ? text : stripped.replace(/^\s+/, "");
}
function restoreMentionedColleaguesDisplayText(text) {
	const colleagues = extractMentionedColleaguesFromContextText(text);
	if (colleagues.length === 0) return stripMentionedColleaguesContextText(text);
	const stripped = stripMentionedColleaguesContextText(text).trim();
	return [colleagues.map((colleague) => `@${colleague.name}`).join(" "), stripped].filter(Boolean).join(" ");
}
function sanitizeMentionedColleaguesContextTextBlock(block) {
	const isHiddenContext = isHiddenPromptContextBlock(block);
	if (isHiddenContext && !hasMentionedSpecialistsContextText(block.text)) return;
	const stripped = stripMentionedColleaguesContextText(block.text);
	if (!stripped || stripped === block.text) return isHiddenContext ? void 0 : block;
	const nextBlock = {
		...block,
		text: stripped
	};
	if (isHiddenContext) {
		const nextMeta = { ...block._meta || {} };
		delete nextMeta[HIDDEN_PROMPT_CONTEXT_META_KEY];
		if (Object.keys(nextMeta).length > 0) nextBlock._meta = nextMeta;
		else delete nextBlock._meta;
	}
	return nextBlock;
}
/**
* 从用户发送的 contentBlocks 中提取 @同事信息。
*
* 识别条件（三选一）：
* - meta.mentionType === 'colleague'
* - meta.type === 'colleague'
* - uri 以 colleague:// 开头
*/
function extractMentionedColleagues(blocks) {
	const seen = /* @__PURE__ */ new Set();
	const colleagues = [];
	for (const block of blocks) {
		if (block.type !== "resource_link") continue;
		const meta = block._meta || {};
		const uri = typeof block.uri === "string" ? block.uri : "";
		if (meta.mentionType !== "colleague" && meta.type !== "colleague" && !uri.startsWith("colleague://")) continue;
		const agentId = String(meta.expertAgentId || meta.specialistAgentId || meta.agentId || uri.replace(/^colleague:\/\//, "") || "").trim();
		if (!agentId || seen.has(agentId)) continue;
		const name = String(meta.agentName || meta.displayText || block.name || agentId).trim();
		const profile = typeof meta.profile === "string" ? meta.profile : typeof meta.description === "string" ? meta.description : typeof meta.roleHint === "string" ? meta.roleHint : void 0;
		const businessAgentId = typeof meta.businessAgentId === "string" ? meta.businessAgentId : void 0;
		seen.add(agentId);
		colleagues.push({
			agentId,
			name,
			profile,
			businessAgentId
		});
	}
	return colleagues;
}
/**
* 构造包含 <mentioned_experts> XML 的隐藏 prompt 上下文 block。
*
* 如果 blocks 中没有 @同事，返回 undefined。
*/
function buildMentionedColleaguesContextBlock(blocks) {
	const colleagues = extractMentionedColleagues(blocks);
	if (colleagues.length === 0) return;
	const expertLines = colleagues.map((colleague) => {
		return `  <expert ${[`agent_id="${escapeXmlAttribute(colleague.agentId)}"`, `name="${escapeXmlAttribute(colleague.name)}"`].join(" ")} />`;
	});
	return {
		type: "text",
		text: [
			`用户本轮消息中显式 @ 了以下同事。需要同事协同时，优先调用 ${SEND_TO_SPECIALIST_TOOL_NAME}，并将 expert_id 设置为对应 agent_id。不要把这段上下文原样展示给用户。<mentioned_experts>`,
			...expertLines,
			"</mentioned_experts>"
		].join("\n"),
		_meta: { [HIDDEN_PROMPT_CONTEXT_META_KEY]: MENTIONED_SPECIALISTS_CONTEXT }
	};
}
function extractUserInputText(blocks) {
	return blocks.filter((block) => !isMentionedSpecialistsContextMeta(block?._meta?.[HIDDEN_PROMPT_CONTEXT_META_KEY])).filter((block) => block.type === "text" && typeof block.text === "string").map((block) => stripMentionedColleaguesContextText(block.text)).join("").replace(/^\s+/, "");
}
/**
* 判断 block 是否是 @同事 mention 本身（resource_link + colleague:// / mentionType=colleague）。
* 这类 block 的信息已经被编码进 <mentioned_experts> 隐藏上下文文本里，withMentionedColleaguesContext
* 的输出中不需要重复保留，避免同一个同事引用在 prompt 里出现两次。
*/
function isMentionedColleagueBlock(block) {
	const candidate = block;
	if (candidate?.type !== "resource_link") return false;
	const meta = candidate._meta || {};
	const uri = typeof candidate.uri === "string" ? candidate.uri : "";
	return meta.mentionType === "colleague" || meta.type === "colleague" || uri.startsWith(COLLEAGUE_URI_PREFIX);
}
/**
* 幂等地将 @同事上下文注入到单个 text block 中，并保留原始 blocks 中的非文本内容
* （文件 / 图片 / 其他 resource_link 等），避免 @同事 时一并拖入的文件被整段丢弃。
*
* 背景（bug）：旧实现只把所有 text block 拼成一段文本返回，原 blocks 中的非文本
* block（拖拽进来的文件、图片等）会被整体丢弃，导致 @同事 后发出的 prompt 里完全
* 没有文件内容——这不是"识别不到"，而是文件在发送前的这一步就已经被丢弃了。
*
* 如果 blocks 中已包含 mentioned_experts 上下文，不会重复注入。
*/
function withMentionedColleaguesContext(blocks) {
	if (blocks.some((block) => isMentionedSpecialistsContextMeta(block?._meta?.["codebuddy.ai/hiddenPromptContext"]))) return blocks;
	const contextBlock = buildMentionedColleaguesContextBlock(blocks);
	if (!contextBlock) return blocks;
	const userInputText = extractUserInputText(blocks);
	const mergedTextBlock = {
		...contextBlock,
		text: [
			"",
			"<user_query>",
			"  <auxiliary>",
			contextBlock.text,
			"  </auxiliary>",
			userInputText,
			"</user_query>"
		].filter((line, index) => index === 0 || Boolean(line)).join("\n")
	};
	return [...blocks.filter((block) => {
		if (isMentionedSpecialistsContextMeta(block?._meta?.["codebuddy.ai/hiddenPromptContext"])) return false;
		if (block.type === "text") return false;
		return !isMentionedColleagueBlock(block);
	}), mergedTextBlock];
}
var HIDDEN_PROMPT_CONTEXT_META_KEY, MENTIONED_SPECIALISTS_CONTEXT, SEND_TO_SPECIALIST_TOOL_NAME, LEGACY_MENTIONED_COLLEAGUES_CONTEXT, LEGACY_MENTIONED_SPECIALISTS_CONTEXT, SPECIALIST_TOOL_NAME_PATTERN, COLLEAGUE_URI_PREFIX, FILE_URI_PREFIX, INLINE_FILE_REFERENCE_PREFIX, INLINE_IMAGE_REFERENCE_PREFIX, INLINE_REFERENCE_PREFIXES, TRAILING_INLINE_FILE_REFERENCE_PUNCTUATION, IMAGE_MIME_TYPE_BY_EXTENSION, MENTIONED_CONTEXT_TAG_PATTERN, MENTIONED_SPECIALISTS_XML_REGEX, MENTIONED_SPECIALIST_TAG_REGEX, LEAKED_MENTIONED_SPECIALISTS_CONTEXT_REGEX;
var init_colleague_mention_context = __esmMin((() => {
	HIDDEN_PROMPT_CONTEXT_META_KEY = "codebuddy.ai/hiddenPromptContext";
	MENTIONED_SPECIALISTS_CONTEXT = "mentioned_experts";
	SEND_TO_SPECIALIST_TOOL_NAME = "send_message";
	LEGACY_MENTIONED_COLLEAGUES_CONTEXT = "mentioned_colleagues";
	LEGACY_MENTIONED_SPECIALISTS_CONTEXT = "mentioned_specialists";
	SPECIALIST_TOOL_NAME_PATTERN = `(?:${SEND_TO_SPECIALIST_TOOL_NAME}|send_to_specialist|dispatch_to_specialist)`;
	COLLEAGUE_URI_PREFIX = "colleague://";
	FILE_URI_PREFIX = "file://";
	INLINE_FILE_REFERENCE_PREFIX = "@file://";
	INLINE_IMAGE_REFERENCE_PREFIX = "@image:";
	INLINE_REFERENCE_PREFIXES = [INLINE_FILE_REFERENCE_PREFIX, INLINE_IMAGE_REFERENCE_PREFIX];
	TRAILING_INLINE_FILE_REFERENCE_PUNCTUATION = new Set([
		",",
		";",
		"!",
		"?",
		")",
		"]",
		"}",
		"，",
		"。",
		"；",
		"！",
		"？",
		"）",
		"】",
		"》"
	]);
	IMAGE_MIME_TYPE_BY_EXTENSION = {
		png: "image/png",
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		gif: "image/gif",
		webp: "image/webp",
		bmp: "image/bmp",
		svg: "image/svg+xml",
		ico: "image/x-icon"
	};
	MENTIONED_CONTEXT_TAG_PATTERN = "(?:mentioned_experts|mentioned_specialists|mentioned_colleagues)";
	MENTIONED_SPECIALISTS_XML_REGEX = new RegExp(`<(${MENTIONED_CONTEXT_TAG_PATTERN})>[\\s\\S]*?</\\1>\\s*`, "g");
	MENTIONED_SPECIALIST_TAG_REGEX = /<(?:expert|specialist|colleague)\b([^>]*)\/?\s*>/g;
	LEAKED_MENTIONED_SPECIALISTS_CONTEXT_REGEX = new RegExp([`用户本轮消息中显式[\\s\\S]*?优先调用 ${SPECIALIST_TOOL_NAME_PATTERN}[\\s\\S]*?不要把这段上下文原样展示给用户。[\\s\\S]*?`, `<${MENTIONED_CONTEXT_TAG_PATTERN}>[\\s\\S]*?</${MENTIONED_CONTEXT_TAG_PATTERN}>\\s*`].join(""), "g");
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/tools/edit-tool-adapter.ts
var EditToolAdapter;
var init_edit_tool_adapter = __esmMin((() => {
	EditToolAdapter = class EditToolAdapter {
		/**
		* 解析 ACP 工具调用数据为 EditToolData
		*/
		static parseACPToolCall(update) {
			const payload = update ?? {};
			const toolCallId = update?.toolCallId ?? payload?.toolCallId ?? payload?.id;
			const kind = payload?.kind ?? update?.kind;
			if (!toolCallId || kind !== "edit") return null;
			const content = payload?.content ?? update?.content ?? [];
			const locations = payload?.locations ?? update?.locations ?? [];
			const status = payload?.status ?? update?.status ?? "pending";
			return {
				toolCallId,
				title: payload?.title ?? "Edit File",
				status,
				kind: "edit",
				diffs: this.extractDiffs(content),
				locations,
				content,
				rawInput: payload?.rawInput ?? "",
				rawOutput: payload?.rawOutput ?? ""
			};
		}
		/**
		* 从 chat-sdk ToolCall 中提取 EditToolData
		* 用于从 Message 的 tool-call 内容中获取 edit 信息
		*/
		static extractFromToolCall(toolCall) {
			if (!this.isEditToolCall(toolCall)) return null;
			const diffs = [];
			const locations = [];
			const filePath = toolCall.args.filePath || toolCall.args.file_path || toolCall.args.path || toolCall.args.name || "";
			const oldText = toolCall.args.old_str || toolCall.args.oldContent || null;
			const newText = toolCall.args.new_str || toolCall.args.content || toolCall.args.newContent || "";
			const line = toolCall.args.line;
			if (filePath) {
				diffs.push({
					path: filePath,
					oldText,
					newText,
					line
				});
				locations.push({
					path: filePath,
					line
				});
			}
			if (toolCall.result?.result) {
				const result = toolCall.result.result;
				if (result.oldContent !== void 0) diffs[0].oldText = result.oldContent;
				if (result.path) {
					diffs[0].path = result.path;
					locations[0].path = result.path;
				}
			}
			return {
				toolCallId: toolCall.id,
				title: "Edit File",
				status: this.mapToolStateToACPStatus(toolCall.status),
				kind: "edit",
				diffs,
				locations,
				content: [],
				rawInput: toolCall.args,
				rawOutput: toolCall.result
			};
		}
		/**
		* 解析 ACP 工具调用更新数据
		*/
		static parseACPSessionUpdate(update) {
			const result = {};
			if (update.status) result.status = update.status;
			if (update.content) {
				result.content = update.content;
				result.diffs = this.extractDiffs(update.content);
			}
			if (update.rawInput) result.rawInput = update.rawInput;
			if (update.rawOutput) result.rawOutput = update.rawOutput;
			if (update.locations) result.locations = update.locations;
			return result;
		}
		/**
		* 从内容块中提取 diff 信息
		*/
		static extractDiffs(content) {
			return content.filter((block) => block.type === "diff").map((block) => ({
				path: block.path,
				oldText: block.oldText || null,
				newText: block.newText,
				line: block.line
			}));
		}
		/**
		* 将 ToolState 映射为 ACP 状态
		*/
		static mapToolStateToACPStatus(toolState) {
			switch (toolState) {
				case "idle":
				case "pending": return "pending";
				case "stream_executing":
				case "full_executing": return "in_progress";
				case "executed": return "completed";
				case "failed": return "failed";
				case "cancelled": return "completed";
				default: return "pending";
			}
		}
		/**
		* 从 ACP update 创建 ToolCall 的 args 和 result
		* 用于 MessageConverter.createToolCallContent 调用
		*
		* @param update ACP session update 数据
		* @param toolName 工具名称（用于区分 write_to_file 和 replace_in_file）
		* @returns { args, result } 符合 chat-sdk ToolCall 格式的数据
		*/
		static createToolCallData(update, toolName) {
			const normalizedToolName = toolName.replace(/-/g, "_");
			const rawInput = update.rawInput || update.toolCall?.arguments || {};
			const rawOutput = update.rawOutput || update.content;
			const locations = update.locations || [];
			const resolvedFilePath = rawInput.filePath || rawInput.file_path || locations[0]?.path;
			if (!(!!resolvedFilePath || (normalizedToolName === "replace_in_file" || normalizedToolName === "Edit" ? !!(rawInput.old_str || rawInput.old_string || rawInput.new_str || rawInput.new_string) : rawInput.content !== void 0 && rawInput.content !== null))) return {
				args: {},
				...rawOutput && { result: {
					success: update.status === "completed",
					result: rawOutput
				} }
			};
			const filePath = resolvedFilePath || "unknown";
			if (normalizedToolName === "replace_in_file" || normalizedToolName === "Edit") return {
				args: {
					filePath,
					old_str: rawInput.old_str || rawInput.old_string || "",
					new_str: rawInput.new_str || rawInput.new_string || "",
					_rawInput: rawInput
				},
				...rawOutput && { result: {
					success: update.status === "completed",
					result: rawOutput
				} }
			};
			else return {
				args: {
					filePath,
					content: rawInput.content || "",
					_rawInput: rawInput
				},
				...rawOutput && { result: {
					success: update.status === "completed",
					result: rawOutput
				} }
			};
		}
		/**
		* 检查工具调用是否为 edit 类型
		*/
		static isEditToolCall(toolCall) {
			if ([
				"edit",
				"write_to_file",
				"replace_in_file",
				"edit_file"
			].includes(toolCall.name)) return true;
			if (toolCall.args.old_str || toolCall.args.oldText || toolCall.args.new_str || toolCall.args.newText) return true;
			return false;
		}
		/**
		* 应用 ACP session update 到 ToolCall 对象
		* 用于处理 edit 工具调用的状态更新
		*
		* 与 tool-schemas.ts 对齐：
		* - WriteToFileInput: { filePath, content }
		* - ReplaceInFileInput: { filePath, old_str, new_str }
		* - WriteToFileResult / ReplaceInFileResult
		*/
		static applyUpdateToToolCall(toolCall, update, _meta) {
			const updateData = EditToolAdapter.parseACPSessionUpdate(update);
			if (!updateData) return;
			const toolName = EditToolAdapter.getToolName(update, _meta);
			if (toolName === "replace_in_file" || toolName === "replace-in-file") EditToolAdapter.applyReplaceInFileUpdate(toolCall, update, updateData, _meta);
			else EditToolAdapter.applyWriteToFileUpdate(toolCall, update, updateData, _meta);
		}
		/**
		* 获取工具名称
		* 优先级：_meta.toolName > update.toolCall.name > toolCall.name > 'write_to_file' (默认)
		*/
		static getToolName(update, _meta) {
			const metaToolName = _meta?.["codebuddy.ai"]?.toolName;
			if (metaToolName && typeof metaToolName === "string") return metaToolName;
			if (update.toolCall?.name && typeof update.toolCall.name === "string") return update.toolCall.name;
			if (update.name && typeof update.name === "string") return update.name;
			return "write_to_file";
		}
		/**
		* 处理 WriteToFileInput 类型的更新
		* 与 tool-schemas.ts 中的 WriteToFileInput 对齐：{ filePath, content }
		* 与 tool-schemas.ts 中的 WriteToFileResult 对齐
		*/
		static applyWriteToFileUpdate(toolCall, update, updateData, _meta) {
			const newStatus = update.toolCallUpdate?.status ?? updateData.status;
			const hasMeta = !!_meta?.["codebuddy.ai"]?.toolName;
			if (hasMeta && updateData.rawInput && Object.keys(updateData.rawInput).length > 0) {
				const rawInput = updateData.rawInput;
				const filePath = rawInput.filePath || toolCall.args?.filePath || updateData.locations?.[0]?.path || "unknown";
				toolCall.args = {
					...toolCall.args,
					filePath,
					content: rawInput.content,
					_rawInput: rawInput
				};
			}
			if (hasMeta && updateData.rawOutput && Object.keys(updateData.rawOutput).length > 0) {
				const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
				toolCall.result = {
					success: newStatus === "completed" || toolCall.result?.success === true,
					result: {
						...existingResult,
						...updateData.rawOutput
					}
				};
			}
			if (!hasMeta) {
				let incomingContent = "";
				let oldContent = null;
				let hasDiff = false;
				if (updateData.diffs && updateData.diffs.length > 0) {
					const primaryDiff = updateData.diffs[0];
					incomingContent = primaryDiff.newText || "";
					oldContent = primaryDiff.oldText ?? null;
					hasDiff = true;
					const existingContent = toolCall.args?.content;
					const mergedContent = newStatus === "completed" ? incomingContent : (existingContent || "") + incomingContent;
					if (!toolCall.args.filePath) {
						const primaryLocation = updateData.locations?.[0];
						toolCall.args.filePath = primaryLocation?.path || primaryDiff.path;
					}
					toolCall.args.content = mergedContent;
				} else if (updateData.content && updateData.content.length > 0) {
					const contentBlocks = updateData.content.filter((block) => block.type === "content");
					for (const block of contentBlocks) if (block.content && block.content.type === "text") incomingContent += block.content.text;
					const existingContent = toolCall.args?.content;
					const mergedContent = newStatus === "completed" ? incomingContent : (existingContent || "") + incomingContent;
					const primaryLocation = updateData.locations?.[0];
					if (!toolCall.args.filePath) toolCall.args.filePath = primaryLocation?.path || "unknown";
					toolCall.args.content = mergedContent;
				}
				if (incomingContent || hasDiff) {
					const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
					const existingNewContent = existingResult.newContent || existingResult.content || "";
					const updatedNewContent = newStatus === "completed" ? incomingContent : (existingNewContent || "") + incomingContent;
					const oldLines = oldContent ? oldContent.split("\n").length : 0;
					const newLines = incomingContent.split("\n").length;
					const addLineCount = oldContent === null ? newLines : Math.max(0, newLines - oldLines);
					const removedLines = oldContent === null ? 0 : Math.max(0, oldLines - newLines);
					toolCall.result = {
						success: newStatus === "completed" || toolCall.result?.success === true,
						result: {
							...existingResult,
							type: "write_to_file_result",
							path: toolCall.args.filePath,
							oldContent: oldContent ?? existingResult.oldContent ?? "",
							newContent: updatedNewContent,
							content: updatedNewContent,
							addLineCount,
							removedLines,
							bytesWritten: updatedNewContent.length,
							isNewFile: oldContent === null
						}
					};
				}
			}
			if (updateData.locations && updateData.locations.length > 0) {
				const primaryLocation = updateData.locations[0];
				if (primaryLocation?.path && !toolCall.args?.filePath) toolCall.args.filePath = primaryLocation.path;
			}
			if (newStatus) toolCall.status = this.mapACPStatusToToolState(newStatus);
		}
		/**
		* 处理 ReplaceInFileInput 类型的更新
		* 与 tool-schemas.ts 中的 ReplaceInFileInput 对齐：{ filePath, old_str, new_str }
		* 与 tool-schemas.ts 中的 ReplaceInFileResult 对齐
		*/
		static applyReplaceInFileUpdate(toolCall, update, updateData, _meta) {
			const newStatus = update.toolCallUpdate?.status ?? updateData.status;
			const hasMeta = !!_meta?.["codebuddy.ai"]?.toolName;
			if (hasMeta && updateData.rawInput && Object.keys(updateData.rawInput).length > 0) {
				const rawInput = updateData.rawInput;
				const filePath = rawInput.filePath || toolCall.args?.filePath || updateData.locations?.[0]?.path || "unknown";
				toolCall.args = {
					...toolCall.args,
					filePath,
					old_str: rawInput.old_str,
					new_str: rawInput.new_str,
					_rawInput: rawInput
				};
			}
			if (hasMeta && updateData.rawOutput && Object.keys(updateData.rawOutput).length > 0) {
				const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
				toolCall.result = {
					success: newStatus === "completed" || toolCall.result?.success === true,
					result: {
						...existingResult,
						...updateData.rawOutput
					}
				};
			}
			if (!hasMeta && updateData.diffs && updateData.diffs.length > 0) {
				const primaryDiff = updateData.diffs[0];
				const primaryLocation = updateData.locations?.[0];
				const existingContent = toolCall.args?.new_str;
				const incomingChunk = primaryDiff.newText || "";
				const mergedContent = newStatus === "completed" ? incomingChunk : (existingContent || "") + incomingChunk;
				if (!toolCall.args.filePath) toolCall.args.filePath = primaryLocation?.path || primaryDiff.path;
				toolCall.args.new_str = mergedContent;
				if (primaryDiff.oldText !== void 0) toolCall.args.old_str = primaryDiff.oldText;
				const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
				const existingNewContent = existingResult.newContent || existingResult.content || "";
				const updatedNewContent = newStatus === "completed" ? incomingChunk : (existingNewContent || "") + incomingChunk;
				toolCall.result = {
					success: newStatus === "completed" || toolCall.result?.success === true,
					result: {
						...existingResult,
						type: "replace_in_file_result",
						path: toolCall.args.filePath,
						oldContent: primaryDiff.oldText ?? existingResult.oldContent ?? "",
						newContent: updatedNewContent,
						content: updatedNewContent,
						addLineCount: (existingResult.addLineCount || 0) + this.calculateAddedLines(primaryDiff),
						removedLines: (existingResult.removedLines || 0) + this.calculateRemovedLines(primaryDiff)
					}
				};
			}
			if (updateData.locations && updateData.locations.length > 0) {
				const primaryLocation = updateData.locations[0];
				if (primaryLocation?.path && !toolCall.args?.filePath) toolCall.args.filePath = primaryLocation.path;
			}
			if (newStatus) toolCall.status = this.mapACPStatusToToolState(newStatus);
		}
		/**
		* 获取文件修改统计信息
		*/
		static getFileStats(data) {
			const stats = {
				totalFiles: data.diffs.length,
				totalAdded: 0,
				totalRemoved: 0,
				totalModified: 0
			};
			data.diffs.forEach((diff) => {
				const oldLines = diff.oldText ? diff.oldText.split("\n").length : 0;
				const newLines = diff.newText.split("\n").length;
				if (diff.oldText === null) stats.totalAdded += newLines;
				else {
					stats.totalAdded += Math.max(0, newLines - oldLines);
					stats.totalRemoved += Math.max(0, oldLines - newLines);
					stats.totalModified += Math.min(oldLines, newLines);
				}
			});
			return stats;
		}
		/**
		* 计算添加的行数
		*/
		static calculateAddedLines(diff) {
			if (!diff) return 0;
			if (diff.oldText === null) return diff.newText.split("\n").length;
			const oldLines = diff.oldText.split("\n").length;
			const newLines = diff.newText.split("\n").length;
			return Math.max(0, newLines - oldLines);
		}
		/**
		* 计算删除的行数
		*/
		static calculateRemovedLines(diff) {
			if (!diff || diff.oldText === null) return 0;
			const oldLines = diff.oldText.split("\n").length;
			const newLines = diff.newText.split("\n").length;
			return Math.max(0, oldLines - newLines);
		}
		/**
		* 映射 ACP 状态到 ToolState
		*/
		static mapACPStatusToToolState(status) {
			if (!status) return "pending";
			const s = status.toString().toLowerCase();
			switch (s) {
				case "pending": return "pending";
				case "in_progress":
				case "running": return "stream_executing";
				case "completed":
				case "success":
				case "executed": return "executed";
				case "failed":
				case "error": return "failed";
				case "cancelled":
				case "canceled": return "cancelled";
				default: return s;
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/tools/read-tool-adapter.ts
var ReadToolAdapter;
var init_read_tool_adapter = __esmMin((() => {
	ReadToolAdapter = class ReadToolAdapter {
		/**
		* 解析 ACP 工具调用数据为 ReadToolData
		*/
		static parseACPToolCall(update) {
			const payload = update ?? {};
			const toolCallId = update?.toolCallId ?? payload?.toolCallId ?? payload?.id;
			const kind = payload?.kind ?? update?.kind;
			if (!toolCallId || kind !== "read") return null;
			const content = payload?.content ?? update?.content ?? [];
			const locations = payload?.locations ?? update?.locations ?? [];
			const status = payload?.status ?? update?.status ?? "pending";
			return {
				toolCallId,
				title: payload?.title ?? "Read File",
				status,
				kind: "read",
				content,
				locations,
				rawInput: payload?.rawInput ?? "",
				rawOutput: payload?.rawOutput ?? ""
			};
		}
		/**
		* 从 chat-sdk ToolCall 中提取 ReadToolData
		* 用于从 Message 的 tool-call 内容中获取 read 信息
		*/
		static extractFromToolCall(toolCall) {
			if (!this.isReadToolCall(toolCall)) return null;
			const locations = [];
			const filePath = toolCall.args.filePath || toolCall.args.file_path || toolCall.args.path || toolCall.args.name || toolCall.args.file || "";
			const startLine = toolCall.args.startLine || toolCall.args.start || toolCall.args.offset;
			if (filePath) locations.push({
				path: filePath,
				line: startLine
			});
			const content = [];
			let fileContent = "";
			if (toolCall.result?.result) {
				const result = toolCall.result.result;
				if (result.type === "read_file_result" && typeof result.content === "string") fileContent = result.content;
				else if (typeof result === "string") fileContent = result;
				else if (result.content && typeof result.content === "string") fileContent = result.content;
				else if (result._acpContent && Array.isArray(result._acpContent)) fileContent = result._acpContent.filter((block) => block.type === "text" || block.type === "content" && block.content?.type === "text").map((block) => {
					if (block.type === "text") return block.text || "";
					if (block.type === "content" && block.content?.type === "text") return block.content.text || "";
					return "";
				}).join("");
				else if (typeof result === "object") fileContent = JSON.stringify(result, null, 2);
				content.push({
					type: "content",
					content: {
						type: "text",
						text: fileContent
					}
				});
			}
			return {
				toolCallId: toolCall.id,
				title: "Read File",
				status: this.mapToolStateToACPStatus(toolCall.status),
				kind: "read",
				content,
				locations,
				rawInput: toolCall.args,
				rawOutput: toolCall.result
			};
		}
		/**
		* 解析 ACP 工具调用更新数据
		*/
		static parseACPSessionUpdate(update) {
			const result = {};
			if (update.status) result.status = update.status;
			if (update.content) result.content = update.content;
			if (update.rawInput) result.rawInput = update.rawInput;
			if (update.rawOutput) result.rawOutput = update.rawOutput;
			if (update.locations) result.locations = update.locations;
			return result;
		}
		/**
		* 将 ToolState 映射为 ACP 状态
		*/
		static mapToolStateToACPStatus(toolState) {
			switch (toolState) {
				case "idle":
				case "pending": return "pending";
				case "stream_executing":
				case "full_executing": return "in_progress";
				case "executed": return "completed";
				case "failed": return "failed";
				case "cancelled": return "completed";
				default: return "pending";
			}
		}
		/**
		* 从 ACP update 创建 ToolCall 的 args 和 result
		* 用于 MessageConverter.createToolCallContent 调用
		*
		* @param update ACP session update 数据
		* @returns { args, result } 符合 chat-sdk ToolCall 格式的数据
		*/
		static createToolCallData(update) {
			const rawInput = update.rawInput || update.toolCall?.arguments || {};
			const rawOutput = update.rawOutput || update.content;
			const locations = update.locations || [];
			const args = {
				filePath: rawInput.filePath || rawInput.file_path || locations[0]?.path || "",
				_rawInput: rawInput
			};
			if (rawInput.offset !== void 0) args.offset = rawInput.offset;
			if (rawInput.limit !== void 0) args.limit = rawInput.limit;
			return {
				args,
				...rawOutput && { result: {
					success: update.status === "completed",
					result: rawOutput
				} }
			};
		}
		/**
		* 检查工具调用是否为 read 类型
		*/
		static isReadToolCall(toolCall) {
			if ([
				"read",
				"read_file",
				"read-file",
				"readfile"
			].includes(toolCall.name)) return true;
			const hasFilePath = toolCall.args.filePath || toolCall.args.file_path || toolCall.args.path || toolCall.args.name;
			const noEditFields = !toolCall.args.old_str && !toolCall.args.oldText && !toolCall.args.new_str && !toolCall.args.newText && !toolCall.args.content;
			if (hasFilePath && noEditFields) return true;
			return false;
		}
		/**
		* 应用 ACP session update 到 ToolCall 对象
		* 用于处理 read 工具调用的状态更新
		*
		* 与 tool-schemas.ts 对齐：
		* - ReadFileInput: { filePath, offset?, limit? }
		* - ReadFileResult
		*/
		static applyUpdateToToolCall(toolCall, update, _meta) {
			const updateData = ReadToolAdapter.parseACPSessionUpdate(update);
			if (!updateData) return;
			const newStatus = update.toolCallUpdate?.status ?? updateData.status;
			const hasMeta = !!_meta?.["codebuddy.ai"]?.toolName;
			if (hasMeta && updateData.rawInput && Object.keys(updateData.rawInput).length > 0) {
				const rawInput = updateData.rawInput;
				const filePath = rawInput.filePath || toolCall.args?.filePath || "";
				const offset = rawInput.offset !== void 0 ? rawInput.offset : toolCall.args?.offset;
				const limit = rawInput.limit !== void 0 ? rawInput.limit : toolCall.args?.limit;
				toolCall.args = {
					...toolCall.args,
					filePath,
					_rawInput: rawInput
				};
				if (offset !== void 0) toolCall.args.offset = offset;
				if (limit !== void 0) toolCall.args.limit = limit;
			}
			if (hasMeta && updateData.rawOutput && Object.keys(updateData.rawOutput).length > 0) {
				const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
				toolCall.result = {
					success: newStatus === "completed" || toolCall.result?.success === true,
					result: {
						...existingResult,
						...updateData.rawOutput
					}
				};
			}
			if (!hasMeta && updateData.content && updateData.content.length > 0) {
				const contentBlocks = updateData.content.filter((block) => block.type === "content");
				if (contentBlocks.length > 0) {
					const primaryLocation = updateData.locations?.[0];
					let incomingText = "";
					for (const block of contentBlocks) if (block.content && block.content.type === "text") incomingText += block.content.text;
					const existingContent = toolCall.args?.content;
					const mergedContent = newStatus === "completed" ? incomingText : (existingContent || "") + incomingText;
					if (mergedContent) toolCall.args.content = mergedContent;
					if (primaryLocation?.path && !toolCall.args?.filePath) toolCall.args.filePath = primaryLocation.path;
					const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
					const existingResultContent = existingResult.content || "";
					const updatedContent = newStatus === "completed" ? incomingText : (existingResultContent || "") + incomingText;
					toolCall.result = {
						success: newStatus === "completed" || toolCall.result?.success === true,
						result: {
							...existingResult,
							type: "read_file_result",
							path: toolCall.args.filePath,
							content: updatedContent
						}
					};
				}
			}
			if (updateData.locations && updateData.locations.length > 0) {
				const primaryLocation = updateData.locations[0];
				if (primaryLocation?.path && !toolCall.args?.filePath) toolCall.args.filePath = primaryLocation.path;
			}
			if (newStatus) toolCall.status = this.mapACPStatusToToolState(newStatus);
		}
		/**
		* 映射 ACP 状态到 ToolState
		*/
		static mapACPStatusToToolState(status) {
			if (!status) return "pending";
			const s = status.toString().toLowerCase();
			switch (s) {
				case "pending": return "pending";
				case "in_progress":
				case "running": return "stream_executing";
				case "completed":
				case "success":
				case "executed": return "executed";
				case "failed":
				case "error": return "failed";
				case "cancelled":
				case "canceled": return "cancelled";
				default: return s;
			}
		}
		/**
		* 获取文件读取统计信息
		*/
		static getFileStats(data) {
			const stats = {
				totalFiles: data.locations.length,
				totalCharacters: 0,
				totalLines: 0
			};
			const fileContent = data.content.filter((block) => block.type === "content" && block.content?.type === "text").map((block) => block.content?.text || "").join("");
			stats.totalCharacters = fileContent.length;
			stats.totalLines = fileContent.split("\n").length;
			return stats;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/tools/search-tool-adapter.ts
var SearchToolAdapter;
var init_search_tool_adapter = __esmMin((() => {
	SearchToolAdapter = class SearchToolAdapter {
		/**
		* 解析 ACP 工具调用数据为 SearchToolData
		*/
		static parseACPToolCall(update) {
			const payload = update ?? {};
			const toolCallId = update?.toolCallId ?? payload?.toolCallId ?? payload?.id;
			const kind = payload?.kind ?? update?.kind;
			if (!toolCallId || kind !== "search") return null;
			const content = payload?.content ?? update?.content ?? [];
			const locations = payload?.locations ?? update?.locations ?? [];
			const status = payload?.status ?? update?.status ?? "pending";
			const toolName = payload?._meta?.["codebuddy.ai"]?.toolName ?? "search_file";
			return {
				toolCallId,
				title: payload?.title ?? "Search",
				status,
				kind: "search",
				toolName,
				locations,
				content,
				rawInput: payload?.rawInput ?? update?.rawInput ?? {},
				rawOutput: payload?.rawOutput ?? update?.rawOutput ?? {}
			};
		}
		/**
		* 从 chat-sdk ToolCall 中提取 SearchToolData
		*/
		static extractFromToolCall(toolCall) {
			if (!this.isSearchToolCall(toolCall)) return null;
			const toolName = toolCall.name === "search_content" ? "search_content" : "search_file";
			const rawInput = toolCall.args;
			const rawOutput = toolCall.result?.result || {};
			return {
				toolCallId: toolCall.id,
				title: toolName === "search_content" ? "Search Content" : "Search File",
				status: this.mapToolStateToACPStatus(toolCall.status),
				kind: "search",
				toolName,
				locations: [],
				content: [],
				rawInput,
				rawOutput
			};
		}
		/**
		* 从 ACP update 创建 ToolCall 的 args 和 result
		* 用于 MessageConverter.createToolCallContent 调用
		*
		* @param update ACP session update 数据
		* @param toolName 工具名称（用于区分 search_file 和 search_content）
		* @returns { args, result } 符合 chat-sdk ToolCall 格式的数据
		*/
		static createToolCallData(update, toolName) {
			const rawInput = update.rawInput || update.toolCall?.arguments || {};
			const rawOutput = update.rawOutput || update.content;
			const locations = update.locations || [];
			const searchPath = rawInput.path || rawInput.directory || rawInput.target_directory || locations[0]?.path || ".";
			const args = {
				pattern: rawInput.pattern || "",
				path: searchPath,
				_rawInput: rawInput
			};
			if (rawInput.glob !== void 0) args.glob = rawInput.glob;
			else if (rawInput.fileTypes !== void 0) args.glob = rawInput.fileTypes;
			if (rawInput.contextBefore !== void 0) args.contextBefore = rawInput.contextBefore;
			if (rawInput.contextAfter !== void 0) args.contextAfter = rawInput.contextAfter;
			if (rawInput.contextAround !== void 0) args.contextAround = rawInput.contextAround;
			if (rawInput.outputMode !== void 0) args.outputMode = rawInput.outputMode;
			if (rawInput.caseSensitive !== void 0) args.caseSensitive = rawInput.caseSensitive;
			return {
				args,
				...rawOutput && { result: {
					success: update.status === "completed",
					result: rawOutput
				} }
			};
		}
		/**
		* 检查工具调用是否为 search 类型
		*/
		static isSearchToolCall(toolCall) {
			const name = toolCall.name;
			return name === "search_file" || name === "search-file" || name === "search_content" || name === "search-content" || name === "list_files" || name === "list-files" || name === "list_dir" || name === "list-dir";
		}
		/**
		* 将 SearchToolData 转换为 UI 友好的格式
		*/
		static toUI(data) {
			const pattern = data.rawInput?.pattern || data.rawOutput?.pattern || "";
			const searchPath = data.rawInput?.path || data.rawInput?.directory || data.rawInput?.target_directory || data.rawOutput?.path || data.rawOutput?.directory || ".";
			const results = this.extractResults(data);
			const totalCount = data.rawOutput?.totalCount ?? results.length;
			const hasMore = data.rawOutput?.hasMore ?? false;
			const isContentSearch = data.toolName === "search_content";
			let description = "";
			if (isContentSearch) description = `Searching for "${pattern}" in ${searchPath}`;
			else description = `Searching for files matching "${pattern}" in ${searchPath}`;
			let error;
			if (data.status === "failed") error = (data.content?.find((block) => block.type === "content" && block.content?.type === "text"))?.content?.text;
			return {
				toolCallId: data.toolCallId,
				title: data.title,
				status: this.mapACPStatusToUI(data.status),
				toolName: data.toolName,
				description,
				pattern,
				directory: searchPath,
				results,
				totalCount,
				hasMore,
				isContentSearch,
				error
			};
		}
		/**
		* 从 SearchToolData 中提取结果列表
		*/
		static extractResults(data) {
			if (data.rawOutput?.matches && Array.isArray(data.rawOutput.matches)) return data.rawOutput.matches;
			if (data.rawOutput?.results && Array.isArray(data.rawOutput.results)) return data.rawOutput.results;
			const textContent = data.content?.find((block) => block.type === "content" && block.content?.type === "text");
			if (textContent?.content?.text) return this.parseTextResults(textContent.content.text, data.toolName === "search_content");
			return [];
		}
		/**
		* 解析文本格式的搜索结果
		*/
		static parseTextResults(text, isContentSearch) {
			const results = [];
			const lines = text.split("\n");
			for (const line of lines) {
				if (!line.trim()) continue;
				if (isContentSearch) {
					const match = line.match(/^([\w./-]+)\s+(\d+)\|\s*(.*)$/);
					if (match) results.push({
						filePath: match[1],
						fileName: match[1].split("/").pop(),
						startLine: parseInt(match[2], 10),
						endLine: parseInt(match[2], 10),
						content: match[3]
					});
				} else {
					const match = line.match(/^([\w./-]+)\s+\(([\d.]+\s*\w+)\)$/);
					if (match) results.push({
						filePath: match[1],
						fileName: match[1].split("/").pop(),
						size: match[2]
					});
					else if (!line.includes("(")) results.push({
						filePath: line,
						fileName: line.split("/").pop()
					});
				}
			}
			return results;
		}
		/**
		* 应用 ACP session update 到 ToolCall 对象
		* 用于处理 search 工具调用的状态更新
		*
		* 与 tool-schemas.ts 对齐：
		* - SearchContentInput: { pattern, path, glob?, ... }
		* - SearchContentResult
		*/
		static applyUpdateToToolCall(toolCall, update, _meta) {
			const updateData = SearchToolAdapter.parseACPSessionUpdate(update);
			if (!updateData) return;
			const newStatus = update.status ?? updateData.status;
			const hasMeta = !!_meta?.["codebuddy.ai"]?.toolName;
			if (hasMeta && updateData.rawInput && Object.keys(updateData.rawInput).length > 0) {
				const rawInput = updateData.rawInput;
				toolCall.args = {
					...toolCall.args,
					pattern: rawInput.pattern || toolCall.args?.pattern,
					path: rawInput.path || rawInput.directory || toolCall.args?.path,
					...rawInput.glob !== void 0 && { glob: rawInput.glob },
					...rawInput.fileTypes !== void 0 && { glob: rawInput.fileTypes },
					...rawInput.contextBefore !== void 0 && { contextBefore: rawInput.contextBefore },
					...rawInput.contextAfter !== void 0 && { contextAfter: rawInput.contextAfter },
					...rawInput.contextAround !== void 0 && { contextAround: rawInput.contextAround },
					...rawInput.outputMode !== void 0 && { outputMode: rawInput.outputMode },
					...rawInput.caseSensitive !== void 0 && { caseSensitive: rawInput.caseSensitive },
					_rawInput: rawInput
				};
			}
			if (hasMeta && updateData.rawOutput && Object.keys(updateData.rawOutput).length > 0) {
				const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
				toolCall.result = {
					success: newStatus === "completed" || toolCall.result?.success === true,
					result: {
						...existingResult,
						...updateData.rawOutput
					}
				};
			}
			if (!hasMeta && updateData.content && updateData.content.length > 0) {
				const contentBlocks = updateData.content.filter((block) => block.type === "content");
				if (contentBlocks.length > 0) {
					let incomingText = "";
					for (const block of contentBlocks) if (block.content && block.content.type === "text") incomingText += block.content.text;
					const toolName = toolCall.name === "search_content" ? "search_content" : "search_file";
					const results = this.parseTextResults(incomingText, toolName === "search_content");
					const primaryLocation = updateData.locations?.[0];
					if (primaryLocation?.path && !toolCall.args?.path) toolCall.args.path = primaryLocation.path;
					const existingResult = toolCall.result && toolCall.result.result ? toolCall.result.result : {};
					const existingResults = existingResult.results || existingResult.matches || [];
					const mergedResults = newStatus === "completed" ? results : [...existingResults, ...results];
					toolCall.result = {
						success: newStatus === "completed" || toolCall.result?.success === true,
						result: {
							...existingResult,
							type: "search_content_result",
							results: mergedResults,
							matches: mergedResults,
							totalCount: mergedResults.length
						}
					};
				}
			}
			if (updateData.locations && updateData.locations.length > 0) {
				const primaryLocation = updateData.locations[0];
				if (primaryLocation?.path && !toolCall.args?.path) toolCall.args.path = primaryLocation.path;
			}
			if (newStatus) toolCall.status = this.mapACPStatusToToolState(newStatus);
		}
		/**
		* 解析 ACP 工具调用更新数据
		*/
		static parseACPSessionUpdate(update) {
			const result = {};
			if (update.status) result.status = update.status;
			if (update.content) result.content = update.content;
			if (update.rawInput) result.rawInput = update.rawInput;
			if (update.rawOutput) result.rawOutput = update.rawOutput;
			if (update.locations) result.locations = update.locations;
			return Object.keys(result).length > 0 ? result : null;
		}
		/**
		* 将 ACP 状态映射为 UI 状态
		*/
		static mapACPStatusToUI(acpStatus) {
			switch (acpStatus) {
				case "pending": return "pending";
				case "in_progress": return "full_executing";
				case "completed": return "executed";
				case "failed": return "failed";
				default: return "idle";
			}
		}
		/**
		* 将 ToolState 映射为 ACP 状态
		*/
		static mapToolStateToACPStatus(toolState) {
			switch (toolState) {
				case "idle":
				case "pending": return "pending";
				case "stream_executing":
				case "full_executing": return "in_progress";
				case "executed": return "completed";
				case "failed": return "failed";
				case "cancelled": return "completed";
				default: return "pending";
			}
		}
		/**
		* 映射 ACP 状态到 ToolState
		*/
		static mapACPStatusToToolState(status) {
			if (!status) return "pending";
			const s = status.toString().toLowerCase();
			switch (s) {
				case "pending": return "pending";
				case "in_progress":
				case "running": return "stream_executing";
				case "completed":
				case "success":
				case "executed": return "executed";
				case "failed":
				case "error": return "failed";
				case "cancelled":
				case "canceled": return "cancelled";
				default: return s;
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/utils/acp-timestamp.ts
function parseTimestamp(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string" && value.trim()) {
		const numeric = Number(value);
		if (Number.isFinite(numeric)) return numeric;
		const parsed = Date.parse(value);
		return Number.isFinite(parsed) ? parsed : void 0;
	}
}
function resolveAcpMetaTimestamp(...metaSources) {
	for (const meta of metaSources) {
		if (!meta) continue;
		const timestamp = parseTimestamp(meta.timestamp);
		if (timestamp !== void 0) return timestamp;
	}
}
var init_acp_timestamp = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/utils/artifact-links-normalizer.ts
function decodeXmlAttribute$1(value) {
	return value.replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function parseXmlAttributes$1(rawAttrs) {
	const attrs = {};
	rawAttrs.replace(/([\w:-]+)="([^"]*)"/g, (_match, key, value) => {
		attrs[key] = decodeXmlAttribute$1(value);
		return _match;
	});
	return attrs;
}
function normalizeArtifactUrl(rawUrl) {
	let url = decodeXmlAttribute$1(rawUrl).trim();
	if (url.startsWith("<") && url.endsWith(">")) url = url.slice(1, -1).trim();
	return url.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function getFilenameFromUrl(url) {
	try {
		const pathname = new URL(url).pathname.split("/").filter(Boolean).pop();
		return pathname ? decodeURIComponent(pathname) : void 0;
	} catch {
		const pathname = url.split("?")[0]?.split("/").filter(Boolean).pop();
		return pathname ? decodeURIComponent(pathname) : void 0;
	}
}
function escapeMarkdownLinkText(text) {
	return text.replace(/[[\]]/g, "\\$&");
}
function addArtifactLink(links, seenUrls, link) {
	if (!link.url || seenUrls.has(link.url)) return;
	seenUrls.add(link.url);
	links.push(link);
}
function extractXmlArtifactLinks(body, links, seenUrls) {
	ARTIFACT_TAG_REGEX.lastIndex = 0;
	let match;
	while (match = ARTIFACT_TAG_REGEX.exec(body)) {
		const attrs = parseXmlAttributes$1(match[1] || "");
		const url = normalizeArtifactUrl(match[2] || "");
		if (!url) continue;
		addArtifactLink(links, seenUrls, {
			name: (attrs.name || attrs.filename || attrs.fileName || getFilenameFromUrl(url) || url).trim(),
			url
		});
	}
}
function extractMarkdownArtifactLinks(body, links, seenUrls) {
	for (const line of body.split(/\r?\n/)) {
		const match = line.match(/^\s*[-*]\s+(?:\*\*([^*]+)\*\*|([^:]+?))\s*[:：]\s*(https?:\/\/\S+)\s*$/i);
		if (!match) continue;
		const url = normalizeArtifactUrl(match[3]);
		if (!url) continue;
		addArtifactLink(links, seenUrls, {
			name: (match[1] || match[2] || getFilenameFromUrl(url) || url).trim(),
			url
		});
	}
}
function extractArtifactLinks(body) {
	const links = [];
	const seenUrls = /* @__PURE__ */ new Set();
	extractXmlArtifactLinks(body, links, seenUrls);
	extractMarkdownArtifactLinks(body, links, seenUrls);
	return links;
}
function formatArtifactLinks(body) {
	const links = extractArtifactLinks(body);
	if (links.length === 0) return body.trim();
	return ["**产物文件**", ...links.map((link) => `- [${escapeMarkdownLinkText(link.name)}](${link.url})`)].join("\n");
}
function normalizeArtifactLinksText(text) {
	if (!text || !text.includes("<artifacts")) return text;
	return text.replace(ARTIFACTS_BLOCK_REGEX, (_match, body) => `\n${formatArtifactLinks(body || "")}\n`).replace(/\n{3,}/g, "\n\n").trim();
}
var ARTIFACTS_BLOCK_REGEX, ARTIFACT_TAG_REGEX;
var init_artifact_links_normalizer = __esmMin((() => {
	ARTIFACTS_BLOCK_REGEX = /<artifacts\b[^>]*>([\s\S]*?)<\/artifacts>/gi;
	ARTIFACT_TAG_REGEX = /<artifact\b([^>]*)>([\s\S]*?)<\/artifact>/gi;
}));
//#endregion
//#region ../../packages/agent-ui/src/adapters/message-converter.ts
function decodeXmlAttribute(value) {
	return value.replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function parseXmlAttributes(rawAttrs) {
	const attrs = {};
	rawAttrs.replace(/([\w:-]+)="([^"]*)"/g, (_match, key, value) => {
		attrs[key] = decodeXmlAttribute(value);
		return _match;
	});
	return attrs;
}
function decodeXmlAttributeValue(value) {
	return value.replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function formatSpecialistResultBlock(attrs, content, options) {
	const agentId = attrs.expert_id || attrs.expertId || attrs.specialist_agent_id || attrs.specialistAgentId || attrs.agent_id || attrs.agentId;
	const source = attrs.expert_name || attrs.expertName || attrs.specialist_agent_name || attrs.specialistAgentName || attrs.agent_name || attrs.agentName || attrs.name || (agentId ? options?.resolveExpertName?.(agentId) : void 0) || agentId || "未知助理";
	const body = content.trim();
	return [`**助理 ${source} 发来消息**`, body].filter(Boolean).join("\n\n");
}
function normalizeSpecialistResultText(text, options) {
	if (!text || !text.includes("<expert_result") && !text.includes("<specialist_result")) return text;
	return text.replace(SPECIALIST_RESULT_REGEX, (_match, _tagName, rawAttrs, content) => {
		return formatSpecialistResultBlock(parseXmlAttributes(rawAttrs || ""), content || "", options);
	});
}
function hasMentionedColleaguesContext(text) {
	return text.includes("<mentioned_experts") || text.includes("<mentioned_specialists") || text.includes("<mentioned_colleagues");
}
/**
* 小程序注入的 context 用 `<system_reminder>`（下划线），Desktop/IDE 用 `<system-reminder>`（连字符）。
* 统一为连字符，让下游 stripPromptContextXml 正则能正确匹配。
*/
function normalizeSystemReminderTag(text) {
	return text.replace(/<system_reminder\b/g, "<system-reminder").replace(/<\/system_reminder>/g, "</system-reminder>");
}
function normalizeUserDisplayText(rawText) {
	const withoutMarker = rawText.replace(USER_ID_MARKER_GLOBAL_RE, "");
	return restoreMentionedColleaguesDisplayText(hasMentionedColleaguesContext(withoutMarker) ? withoutMarker : withoutMarker.includes("<user_query>") || withoutMarker.includes("<system-reminder") || withoutMarker.includes("<system_reminder") ? stripPromptContextXml(normalizeSystemReminderTag(withoutMarker)) : withoutMarker);
}
function makePromptContextVisible(block) {
	if (!isHiddenPromptContextBlock(block)) return block;
	const nextBlock = { ...block };
	const nextMeta = { ...block._meta || {} };
	delete nextMeta[HIDDEN_PROMPT_CONTEXT_META_KEY];
	if (Object.keys(nextMeta).length > 0) nextBlock._meta = nextMeta;
	else delete nextBlock._meta;
	return nextBlock;
}
var SPECIALIST_RESULT_REGEX, USER_ID_MARKER_GLOBAL_RE, MessageConverter;
var init_message_converter = __esmMin((() => {
	init_common();
	init_src();
	init_colleague_mention_context();
	init_chat_types();
	init_edit_tool_adapter();
	init_read_tool_adapter();
	init_search_tool_adapter();
	init_acp_timestamp();
	init_artifact_links_normalizer();
	SPECIALIST_RESULT_REGEX = /<(expert_result|specialist_result)\b([^>]*)>([\s\S]*?)<(?:\/\1|\1)>/g;
	USER_ID_MARKER_GLOBAL_RE = /<user_message\s+uid="[^"]+"\s*\/>/g;
	MessageConverter = class {
		static normalizeSpecialistResultText(text, options) {
			return normalizeArtifactLinksText(normalizeSpecialistResultText(text, options));
		}
		static normalizeUserContentBlocksForDisplay(blocks, options) {
			return this.normalizeUserTextContentBlocks(blocks, options);
		}
		/**
		* 兼容旧本地任务 history：历史持久化/回放链路曾把 Teams 的
		* `@todo:<id> <title>` / `@msg:<author>"<snippet>"` 裸占位再次当成普通
		* `@xxx` 文件 badge 解码，形成：
		*
		*   [{ type: 'resource_link', uri: 'file://todo', name: 'todo' },
		*    { type: 'text', text: ':td-123456 标题' }]
		*
		* 或纯文本拆块 `@todo` + `:td-123456 标题`。这时后续单块 normalize 已经看不到
		* 完整的 `@todo:` 前缀，会把 `:td-123456` 直接展示给用户。这里在进入逐块
		* normalize 前做一次极窄的相邻块修复。
		*/
		static extractTeamsReferenceHints(blocks) {
			const todoTitleById = /* @__PURE__ */ new Map();
			for (const block of blocks) {
				if (block.type !== "text" || typeof block.text !== "string") continue;
				const text = block.text;
				if (!text.includes("<todo-reference") || !text.includes("<todo")) continue;
				text.replace(/<todo\b([^>]*)>/g, (_match, rawAttrs) => {
					const attrs = parseXmlAttributes(rawAttrs || "");
					const id = attrs.id ? decodeXmlAttributeValue(attrs.id) : "";
					const title = attrs.title ? decodeXmlAttributeValue(attrs.title) : "";
					if (id && title && !todoTitleById.has(id)) todoTitleById.set(id, title);
					return _match;
				});
			}
			return { todoTitleById };
		}
		static createTodoPhraseBlock(todoId, displayName) {
			return createPhraseBlock(displayName, `todo://${todoId}`, {
				icon: "docs",
				meta: {
					mentionType: "todo",
					displayText: displayName,
					todoId
				}
			});
		}
		static isTeamsReferenceContextTextBlock(block) {
			if (block.type !== "text" || typeof block.text !== "string") return false;
			const text = block.text;
			return text.includes("<system-reminder") && (text.includes("<todo-reference") || text.includes("<message-reference"));
		}
		static appendRepairedTodoOccupier(result, todoId, rawRest, todoTitleById) {
			const hintedTitle = todoTitleById.get(todoId);
			if (hintedTitle) {
				const rest = rawRest || "";
				const trimmedStartLength = rest.length - rest.trimStart().length;
				const restWithoutLeading = rest.slice(trimmedStartLength);
				if (restWithoutLeading.startsWith(hintedTitle)) {
					result.push(this.createTodoPhraseBlock(todoId, hintedTitle));
					const trailing = restWithoutLeading.slice(hintedTitle.length);
					if (trailing) result.push({
						type: "text",
						text: trailing
					});
					return true;
				}
			}
			const rest = rawRest || "";
			const trimmedStartLength = rest.length - rest.trimStart().length;
			const restWithoutLeading = rest.slice(trimmedStartLength);
			const firstWhitespace = restWithoutLeading.search(/[ \t]/);
			if (firstWhitespace > 0) {
				const displayName = restWithoutLeading.slice(0, firstWhitespace) || todoId;
				const trailing = restWithoutLeading.slice(firstWhitespace);
				result.push(this.createTodoPhraseBlock(todoId, displayName));
				if (trailing) result.push({
					type: "text",
					text: trailing
				});
				return true;
			}
			const displayName = restWithoutLeading || rawRest.trim() || todoId;
			result.push(this.createTodoPhraseBlock(todoId, displayName));
			return true;
		}
		static repairLegacyDecodedTeamsOccupierBlocks(blocks) {
			if (blocks.length < 2) return blocks;
			const { todoTitleById } = this.extractTeamsReferenceHints(blocks);
			const result = [];
			for (let index = 0; index < blocks.length; index += 1) {
				const block = blocks[index];
				if (this.isTeamsReferenceContextTextBlock(block)) continue;
				if (block.type === "text" && typeof block.text === "string") {
					const todoTextMatch = block.text.match(/^@todo:(\S+)[ \t]*(.*)$/);
					if (todoTextMatch && todoTitleById.has(todoTextMatch[1])) {
						this.appendRepairedTodoOccupier(result, todoTextMatch[1], todoTextMatch[2] ?? "", todoTitleById);
						continue;
					}
				}
				const next = blocks[index + 1];
				if (!next || next.type !== "text" || typeof next.text !== "string") {
					result.push(block);
					continue;
				}
				if (this.isLegacyTeamsOccupierMarkerBlock(block, "todo")) {
					const todoMatch = next.text.match(/^:(\S+)[ \t]*(.*)$/);
					if (todoMatch) {
						const todoId = todoMatch[1];
						this.appendRepairedTodoOccupier(result, todoId, todoMatch[2] ?? "", todoTitleById);
						index += 1;
						continue;
					}
				}
				if (this.isLegacyTeamsOccupierMarkerBlock(block, "msg")) {
					const msgMatch = next.text.match(/^:([^"·]+?)·?"((?:\\.|[^"\\])*)"\s*$/);
					if (msgMatch) {
						const author = msgMatch[1]?.trim() ?? "";
						const snippet = msgMatch[2] ? msgMatch[2].replace(/\\(["\\])/g, "$1") : "";
						const displayName = author ? `${author}的留言` : "留言";
						result.push(createPhraseBlock(displayName, "message://__unknown__", {
							icon: "message",
							meta: {
								mentionType: "message",
								displayText: displayName,
								author,
								snippet
							}
						}));
						index += 1;
						continue;
					}
				}
				result.push(block);
			}
			return result;
		}
		static isLegacyTeamsOccupierMarkerBlock(block, kind) {
			if (block.type === "text" && typeof block.text === "string") return block.text.trim() === `@${kind}`;
			if (block.type !== "resource_link") return false;
			const anyBlock = block;
			return anyBlock.uri === `file://${kind}` && anyBlock.name === kind;
		}
		static normalizeUserTextContentBlocks(blocks, options) {
			const normalizedBlocks = [];
			const repairedBlocks = this.repairLegacyDecodedTeamsOccupierBlocks(blocks);
			for (const block of repairedBlocks) {
				if (block.type !== "text" || typeof block.text !== "string") {
					if (block.type === "resource_link") {
						const enriched = { ...block };
						enriched._meta = {
							...enriched._meta || {},
							displayAsPhrase: true
						};
						normalizedBlocks.push(enriched);
					} else normalizedBlocks.push(block);
					continue;
				}
				normalizedBlocks.push(...this.normalizeUserTextContentBlock(block, options));
			}
			return normalizedBlocks;
		}
		static normalizeUserTextContentBlock(block, options) {
			const sanitizedBlock = sanitizeMentionedColleaguesContextTextBlock(makePromptContextVisible({
				...block,
				type: "text",
				text: normalizeUserDisplayText(block.text)
			}));
			if (!sanitizedBlock) return [];
			const normalizedBlock = {
				...sanitizedBlock,
				type: "text",
				text: this.normalizeSpecialistResultText(sanitizedBlock.text, options)
			};
			const expanded = expandInlineFileReferencesFromTextBlock(normalizedBlock) ?? [normalizedBlock];
			const result = [];
			for (const b of expanded) {
				if (b.type !== "text" || typeof b.text !== "string") {
					result.push(b);
					continue;
				}
				const decoded = decodeInputTextToAcpContentBlocks(b.text);
				if (decoded && decoded.length > 0 && decoded.some((d) => d.type === "resource_link")) for (const db of decoded) if (db.type === "resource_link" && typeof db.uri === "string" && db.uri.startsWith("file://")) result.push({
					type: "text",
					text: `@${db.name || ""}`
				});
				else if (db.type === "resource_link") {
					const enriched = { ...db };
					enriched._meta = {
						...enriched._meta || {},
						displayAsPhrase: true
					};
					result.push(enriched);
				} else result.push(db);
				else result.push(b);
			}
			return result;
		}
		static buildMessageExtra(options) {
			const cbMeta = options._meta?.["codebuddy.ai"] || {};
			const extra = cbMeta.extra || {};
			const ownerHistoryMode = cbMeta.mode;
			const traceId = cbMeta.traceId || options._meta?.["codebuddy.ai/traceId"] || options._meta?.traceId;
			const modelId = cbMeta.modelId || options._meta?.["codebuddy.ai/requestModelId"];
			const modelName = cbMeta.modelName || options._meta?.["codebuddy.ai/requestModelName"];
			const responseModelId = cbMeta.responseModelId || options._meta?.["codebuddy.ai/responseModelId"];
			const responseModelName = cbMeta.responseModelName;
			const contentFilterNotice = cbMeta.contentFilterNotice || options._meta?.["codebuddy.ai/contentFilterNotice"];
			const result = {
				...extra,
				...traceId ? { traceId } : {},
				...modelId ? { modelId } : {},
				...modelName ? { modelName } : {},
				...responseModelId ? { responseModelId } : {},
				...responseModelName ? { responseModelName } : {},
				...contentFilterNotice ? { isContentFilterNotice: true } : {}
			};
			if (Array.isArray(result.sourceContentBlocks)) result.sourceContentBlocks = this.normalizeUserTextContentBlocks(result.sourceContentBlocks);
			if (ownerHistoryMode === "history" || ownerHistoryMode === "stream") result.ownerHistoryMode = ownerHistoryMode;
			return result;
		}
		/**
		* 从 _meta['codebuddy.ai'].extra.sourceContentBlocks 提取原始 content blocks。
		* ACP user_message_chunk 的 update.content 只含文本（convertUserMessageToAcpEvent
		* 丢弃了 resource_link 等非文本块），而 _meta 中携带了完整的 sourceContentBlocks。
		*/
		static extractSourceContentBlocks(_meta) {
			if (!_meta) return;
			const cbMeta = _meta["codebuddy.ai"];
			if (!cbMeta) return;
			const extra = cbMeta.extra;
			if (!extra) return;
			const blocks = extra.sourceContentBlocks;
			return blocks && blocks.length > 0 ? blocks : void 0;
		}
		static resolveCreateTime(options) {
			return resolveAcpMetaTimestamp(options._meta) ?? Date.now();
		}
		/**
		* 将 ACP 协议的 session update 转换为 chat-sdk Message
		* 注意：'plan' 类型应在 adapter 层拦截处理，不应到达此处
		*/
		static convertACPUpdateToMessage(update, options) {
			switch (update.sessionUpdate) {
				case "agent_message_chunk": return this.convertAgentMessageChunk(update, options);
				case "agent_thought_chunk": return this.convertAgentThoughtChunk(update, options);
				case "user_message_chunk": return this.convertUserMessageChunk(update, options);
				case "tool_call": return this.convertToolCall(update, options);
				case "tool_call_update": return this.convertToolCallUpdate(update, options);
				case "plan":
					console.warn("[MessageConverter] Received plan update, should be handled by adapter");
					return {
						message: {
							id: options.messageId || `plan-${Date.now()}`,
							requestId: options.requestId || "",
							conversationId: options.sessionId,
							messageType: "assistant",
							content: [],
							timestamp: new Date(this.resolveCreateTime(options)).toISOString()
						},
						messageId: options.messageId || `plan-${Date.now()}`,
						isNew: false,
						isComplete: true
					};
				default:
					if (update.sessionUpdate === "state_update") {
						console.warn("[MessageConverter] Received state_update, should be handled by adapter");
						return null;
					}
					throw new Error(`Unknown session update type: ${update.sessionUpdate}`);
			}
		}
		/**
		* 转换 agent_message_chunk 为 AssistantMessage
		*
		* 注意：根据 ACP 协议，agent_message_chunk 的 content 可能包含：
		* - text: 文本内容（最常见）
		* - image: 图片内容（多模态模型输出）
		* - audio: 音频内容（罕见）
		* - resource, resource_link: 资源引用（罕见）
		*
		* 当前实现主要处理 text 内容，其他类型会记录警告并跳过
		*/
		static convertAgentMessageChunk(update, options) {
			const { sessionId, messageId, isStreaming = false } = options;
			const msgId = messageId || `${sessionId}-assistant-${Date.now()}`;
			let text = "";
			let hasNonTextContent = false;
			if (update.content) {
				const contentBlocks = Array.isArray(update.content) ? update.content : [update.content];
				for (const block of contentBlocks) if (block.type === "text" && "text" in block) text += block.text || "";
				else if (block.type === "resource" && block.resource) {
					const resource = block.resource;
					const fileText = typeof resource.text === "string" ? resource.text : void 0;
					const uri = resource.uri;
					const mimeType = resource.mimeType;
					const detectLanguage = (mime, uriStr) => {
						if (!mime && !uriStr) return;
						const m = (mime || "").toLowerCase();
						if (m.includes("python") || uriStr && uriStr.endsWith(".py")) return "python";
						if (m.includes("javascript") || m.includes("ecmascript") || uriStr && uriStr.endsWith(".js")) return "javascript";
						if (m.includes("typescript") || uriStr && uriStr.endsWith(".ts")) return "typescript";
						if (m.includes("json") || uriStr && uriStr.endsWith(".json")) return "json";
						if (m.includes("html") || uriStr && uriStr.endsWith(".html")) return "html";
						if (m.includes("css") || uriStr && uriStr.endsWith(".css")) return "css";
						if (m.includes("xml") || uriStr && uriStr.endsWith(".xml")) return "xml";
					};
					const lang = detectLanguage(mimeType, uri);
					if (fileText !== void 0) if (lang) text += `\n\`\`\`${lang}\n${fileText}\n\`\`\`\n`;
					else text += `\n\`\`\`\n${fileText}\n\`\`\`\n`;
					else if (uri) {
						const filename = this.extractFilenameFromUri(uri) || uri;
						text += `\n[Embedded file: ${filename}](${uri})\n`;
					} else {
						hasNonTextContent = true;
						console.warn("[MessageConverter] Resource block without text or uri in agent_message_chunk");
					}
				} else if (block.type === "resource_link") {
					const uri = block.uri || "";
					const name = block.name || uri;
					text += `\n[Resource link: ${name}](${uri})\n`;
				} else {
					hasNonTextContent = true;
					console.warn("[MessageConverter] Non-text content in agent_message_chunk:", block.type);
				}
				if (hasNonTextContent) console.warn("[MessageConverter] Some non-text content found in agent_message_chunk; best-effort converted to text where possible");
			}
			text = this.normalizeSpecialistResultText(text);
			const textContent = {
				type: "text",
				text
			};
			return {
				message: {
					id: msgId,
					requestId: options.requestId || "",
					conversationId: sessionId,
					messageType: MessageType.ASSISTANT,
					createTime: this.resolveCreateTime(options),
					complete: !isStreaming,
					content: [textContent],
					extra: this.buildMessageExtra(options)
				},
				isNew: !messageId,
				messageId: msgId
			};
		}
		/**
		* 转换 agent_thought_chunk 为 AssistantMessage（包含 reasoning 内容）
		*
		* 根据 ACP 协议（https://agentclientprotocol.com/protocol/prompt-turn#2-agent-processing）：
		* agent_thought_chunk 用于流式传输 Agent 的思考过程（Thinking/Reasoning）
		* 与 agent_message_chunk 的区别：
		* - agent_message_chunk: 正常的响应内容
		* - agent_thought_chunk: Agent 的内部思考过程，通常以不同的 UI 样式展示
		*
		* 转换策略：
		* - 将 content 转换为 { type: 'reasoning', text: string } 格式
		* - cb-chat-ui 的 MessageTimeline 会自动使用 ReasoningRenderer 渲染此类内容
		*/
		static convertAgentThoughtChunk(update, options) {
			const { sessionId, messageId, isStreaming = false } = options;
			const msgId = messageId || `${sessionId}-thought-${Date.now()}`;
			let text = "";
			if (update.content) {
				const contentBlocks = Array.isArray(update.content) ? update.content : [update.content];
				for (const block of contentBlocks) if (block.type === "text" && "text" in block) text += block.text || "";
			}
			const reasoningContent = {
				type: "reasoning",
				text
			};
			return {
				message: {
					id: msgId,
					requestId: options.requestId || "",
					conversationId: sessionId,
					messageType: MessageType.ASSISTANT,
					createTime: this.resolveCreateTime(options),
					complete: !isStreaming,
					content: [reasoningContent],
					extra: this.buildMessageExtra(options)
				},
				isNew: !messageId,
				messageId: msgId
			};
		}
		/**
		* 转换 user_message_chunk 为 UserMessage
		*
		* 根据 ACP 协议，user_message_chunk 用于流式传输用户消息
		* 这通常用于会话加载时回放用户的历史消息
		*
		* 支持 ContentBlock 类型：
		* - text: 文本内容
		* - image: 图片内容（带 mimeType 和 data 或 uri）
		* - audio, resource, resource_link: 其他类型（保留，但当前 UI 不渲染）
		*/
		static convertUserMessageChunk(update, options) {
			const { sessionId, messageId, _meta, cwd } = options;
			const cbOffset = (_meta?.["codebuddy.ai"])?.offset;
			const msgId = messageId || (typeof cbOffset === "number" ? `${sessionId}-user-${cbOffset}` : `${sessionId}-user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
			const contentBlocks = [];
			const sourceContentBlocks = this.extractSourceContentBlocks(_meta);
			if (sourceContentBlocks && sourceContentBlocks.length > 0) {
				for (const block of this.repairLegacyDecodedTeamsOccupierBlocks(sourceContentBlocks)) if (block.type === "text" && "text" in block) {
					const normalized = this.normalizeUserTextContentBlock(block);
					for (const nb of normalized) {
						if (nb.type !== "text" || typeof nb.text !== "string") {
							contentBlocks.push(nb);
							continue;
						}
						const decoded = decodeInputTextToAcpContentBlocks(nb.text);
						if (decoded && decoded.length > 0 && decoded.some((b) => b.type === "resource_link")) for (const db of decoded) if (db.type === "resource_link" && typeof db.uri === "string" && db.uri.startsWith("file://")) contentBlocks.push({
							type: "text",
							text: `@${db.name || ""}`
						});
						else if (db.type === "resource_link") {
							const enriched = { ...db };
							enriched._meta = {
								...enriched._meta || {},
								displayAsPhrase: true
							};
							contentBlocks.push(enriched);
						} else contentBlocks.push(db);
						else contentBlocks.push(nb);
					}
				} else if (block.type === "image") {
					const imgBlock = { ...block };
					imgBlock._meta = imgBlock._meta || {};
					imgBlock._meta.displayAsPhrase = true;
					contentBlocks.push(imgBlock);
				} else if (block.type === "resource_link") {
					const enriched = { ...block };
					enriched._meta = {
						...enriched._meta || {},
						displayAsPhrase: true
					};
					contentBlocks.push(enriched);
				} else if (block.type === "audio" || block.type === "resource") contentBlocks.push(block);
			} else if (update.content) {
				const blocks = Array.isArray(update.content) ? update.content : [update.content];
				for (const block of this.repairLegacyDecodedTeamsOccupierBlocks(blocks)) if (block.type === "text" && "text" in block) {
					const normalized = this.normalizeUserTextContentBlock(block);
					for (const normalizedBlock of normalized) {
						if (normalizedBlock.type !== "text" || typeof normalizedBlock.text !== "string") {
							contentBlocks.push(normalizedBlock);
							continue;
						}
						const stripped = normalizedBlock.text;
						const decoded = decodeInputTextToAcpContentBlocks(stripped);
						if (decoded && decoded.length > 0 && decoded.some((b) => b.type === "resource_link")) for (const db of decoded) if (db.type === "resource_link" && typeof db.uri === "string" && db.uri.startsWith("file://")) contentBlocks.push({
							type: "text",
							text: `@${db.name || ""}`
						});
						else contentBlocks.push(db);
						else contentBlocks.push(normalizedBlock);
					}
				} else if (isHiddenPromptContextBlock(block)) continue;
				else if (block.type === "image") {
					const imgBlock = { ...block };
					imgBlock._meta = imgBlock._meta || {};
					imgBlock._meta.displayAsPhrase = true;
					contentBlocks.push(imgBlock);
				} else if (block.type === "resource_link") {
					const enriched = { ...block };
					enriched._meta = {
						...enriched._meta || {},
						displayAsPhrase: true
					};
					contentBlocks.push(enriched);
				} else if (block.type === "audio" || block.type === "resource") contentBlocks.push(block);
			}
			const metaImages = _meta?.["codebuddy.ai/images"] || (_meta?.["codebuddy.ai"])?.images;
			if (Array.isArray(metaImages)) {
				for (const img of metaImages) if (img && typeof img === "object" && img.mimeType) {
					const imageBlock = {
						type: "image",
						mimeType: img.mimeType
					};
					if (img.data) imageBlock.data = img.data;
					else if (img.blobPath) {
						imageBlock.data = img.blobPath;
						imageBlock._meta = { blobPath: img.blobPath };
					}
					if (!contentBlocks.some((b) => b.data === imageBlock.data)) contentBlocks.push(imageBlock);
				}
			}
			const normalizedContentBlocks = this.resolveWorkspaceFileBlocks(contentBlocks, cwd);
			return {
				message: {
					id: msgId,
					requestId: options.requestId || msgId,
					conversationId: sessionId,
					messageType: MessageType.USER,
					createTime: this.resolveCreateTime(options),
					complete: true,
					content: normalizedContentBlocks,
					references: [],
					extra: this.buildMessageExtra(options)
				},
				isNew: !messageId,
				messageId: msgId
			};
		}
		/**
		* 转换 tool_call 为 AssistantMessage（包含 tool-call 内容）
		*/
		static convertToolCall(update, options) {
			const { sessionId, messageId, _meta } = options;
			const msgId = messageId || `${sessionId}-assistant-${Date.now()}`;
			const toolCallId = update.toolCallId || `tool-${Date.now()}`;
			const createTime = this.resolveCreateTime(options);
			const toolCallContent = this.createToolCallContent(update, toolCallId, _meta, createTime);
			return {
				message: {
					id: msgId,
					requestId: options.requestId || "",
					conversationId: sessionId,
					messageType: MessageType.ASSISTANT,
					createTime,
					complete: false,
					content: [toolCallContent],
					extra: this.buildMessageExtra(options)
				},
				isNew: !messageId,
				messageId: msgId
			};
		}
		/**
		* 转换 tool_call_update 为 AssistantMessage 更新
		*/
		static convertToolCallUpdate(update, options) {
			const { sessionId, messageId, _meta } = options;
			if (!messageId) throw new Error("tool_call_update requires messageId");
			const toolCallId = update.toolCallId;
			if (!toolCallId) throw new Error("tool_call_update requires toolCallId");
			const tu = update.toolCallUpdate;
			const tc = update.toolCall;
			const normalizedUpdate = {
				...update,
				status: update.status ?? (tu && tu.status),
				content: update.content ?? (tu && tu.content) ?? (tc && tc.content),
				rawInput: update.rawInput ?? (tc && tc.arguments),
				rawOutput: update.rawOutput ?? (tc && tc.rawOutput),
				title: update.title ?? (tu && tu.title) ?? (tc && tc.name),
				kind: update.kind ?? (tu && tu.kind) ?? (tc && tc.kind),
				locations: update.locations ?? (tu && tu.locations) ?? (tc && tc.locations)
			};
			const createTime = this.resolveCreateTime(options);
			const toolCallContent = this.createToolCallContent(normalizedUpdate, toolCallId, _meta, createTime);
			return {
				message: {
					id: messageId,
					requestId: options.requestId || "",
					conversationId: sessionId,
					messageType: MessageType.ASSISTANT,
					createTime,
					complete: normalizedUpdate.status === "completed",
					content: [toolCallContent],
					extra: this.buildMessageExtra(options)
				},
				isNew: false,
				messageId
			};
		}
		/**
		* 创建 tool-call 类型的 AssistantMessageContent
		*
		* 参考 ACP Tool Call 协议（https://agentclientprotocol.com/protocol/tool-calls）：
		* - toolCallId: 唯一标识符
		* - title: 人类可读的标题
		* - kind: 工具类别（read, edit, delete, move, search, execute, think, fetch, other）
		* - status: 执行状态（pending, in_progress, completed, failed）
		* - content: 工具调用产生的内容（content, diff, terminal）
		* - locations: 受影响的文件位置
		* - rawInput: 输入参数
		* - rawOutput: 输出结果
		*
		* 注意：此方法根据 toolName 调用对应的 ToolAdapter 获取 args 和 result
		*/
		static createToolCallContent(update, toolCallId, _meta, createTime = Date.now()) {
			const acpStatus = update.status;
			const status = this.mapACPStatusToToolState(acpStatus);
			const toolName = this.mapACPKindToToolName(update, _meta);
			const normalizedToolName = toolName.replace(/-/g, "_");
			let args = {};
			let result = void 0;
			if ("read_file" === normalizedToolName) ({args, result} = ReadToolAdapter.createToolCallData(update));
			else if ("search_file" === normalizedToolName || "search_content" === normalizedToolName) ({args, result} = SearchToolAdapter.createToolCallData(update, toolName));
			else if ("write_to_file" === normalizedToolName || "replace_in_file" === normalizedToolName) ({args, result} = EditToolAdapter.createToolCallData(update, toolName));
			else {
				args = update.rawInput || update.toolCall?.arguments || {};
				const resultData = update.rawOutput || update?.content;
				if (resultData !== void 0) result = {
					status: this.mapACPStatusToResultStatus(acpStatus),
					success: acpStatus === "completed",
					result: resultData
				};
			}
			const toolMetaData = (_meta?.["codebuddy.ai"])?.toolMetaData;
			return {
				type: "tool-call",
				tool: {
					id: toolCallId,
					name: toolName,
					status,
					args,
					result,
					metaData: toolMetaData,
					createTime,
					ready: acpStatus === "completed" || acpStatus === "failed"
				}
			};
		}
		/**
		* 映射 ACP Tool Call Status 到 chat-sdk ToolState
		*
		* ACP Status（https://agentclientprotocol.com/protocol/tool-calls）：
		* - pending: 工具调用尚未开始运行（输入流式传输或等待批准）
		* - in_progress: 工具调用正在运行
		* - completed: 工具调用成功完成
		* - failed: 工具调用失败
		*
		* 映射到 chat-sdk ToolState：
		* - pending -> pending
		* - in_progress -> stream_executing
		* - completed -> executed
		* - failed -> failed
		*/
		static mapACPStatusToToolState(status) {
			switch (status) {
				case "pending": return "pending";
				case "in_progress": return "stream_executing";
				case "completed": return "executed";
				case "failed": return "failed";
				case "cancelled":
				case "canceled": return "cancelled";
				default: return "pending";
			}
		}
		/**
		* 映射 ACP Status 到 ToolResult status
		*/
		static mapACPStatusToResultStatus(status) {
			switch (status) {
				case "completed": return "success";
				case "failed": return "error";
				case "cancelled":
				case "canceled": return "cancelled";
				case "in_progress": return "running";
				default: return "idle";
			}
		}
		/**
		* 将 ACP 的 kind 映射为渲染器期望的 canonical tool name
		* 优先级：
		* 1. _meta 中的 toolName（来自 provider 的元数据）
		* 2. update.toolCall.name（来自 ACP 协议）
		* 3. kind 映射（默认映射规则）
		*/
		static mapACPKindToToolName(update, _meta) {
			if (_meta) {
				const codebuddyToolName = _meta["codebuddy.ai"]?.toolName;
				if (codebuddyToolName) return codebuddyToolName;
			}
			const updateMeta = update?._meta;
			if (updateMeta) {
				const flatToolName = updateMeta["codebuddy.ai/toolName"];
				if (flatToolName) return flatToolName;
			}
			if (update?.toolCall?.name) return update.toolCall.name;
			const title = update?.title;
			const kind = update?.kind;
			if (!kind || kind === "other") return title || kind || "other";
			switch (kind) {
				case "edit": return "write_to_file";
				case "read": return "read_file";
				case "delete": return "delete_file";
				case "move": return "move_file";
				case "execute": return "execute";
				case "fetch": return "fetch";
				case "search": return "search_file";
				default: return kind;
			}
		}
		/**
		* 将 ContentBlock 数组转换为 CBUserMessage
		*
		* 注意：此方法返回 CBUserMessage 而不是 UserMessage
		* CBUserMessage 的 content 直接使用 ContentBlock[]（ACP 协议格式）
		* 这样可以直接与 CBChat 组件兼容，无需额外转换
		*
		* 支持的 ContentBlock 类型：
		* - text: { type: "text", text: string }
		* - image: { type: "image", mimeType: string, data: base64 string }
		* - audio: { type: "audio", mimeType: string, data: base64 string }
		* - resource: { type: "resource", resource: { uri, mimeType, text? } }
		* - resource_link: { type: "resource_link", uri, name?, mimeType?, size? }
		*/
		static convertContentBlocksToUserMessage(contentBlocks, options) {
			const { sessionId, requestId } = options;
			const msgId = `${sessionId}-user-${Date.now()}`;
			return {
				id: msgId,
				requestId: requestId || msgId,
				conversationId: sessionId,
				messageType: "user",
				createTime: this.resolveCreateTime(options),
				complete: true,
				content: contentBlocks,
				extra: {}
			};
		}
		/**
		* 将 SDK UserMessage 转换为 CBUserMessage
		*
		* 转换策略（按优先级）：
		* 1. 兼容旧消息时读取 extra.sourceContentBlocks（只读 legacy fallback）
		* 2. 如果 content 已经是 ACP ContentBlock[]，直接使用（优先于 inputPhrase，
		*    避免 inputPhrase→selectionContexts 转换丢失 _meta.icon/fileType 等已
		*    由 UI 写入的字段，导致历史消息 phrase pill 图标无法正确还原）
		* 3. 如果 content 是非 ACP 数组且无 inputPhrase，按旧格式解析
		* 4. 从 extra.inputPhrase 转换（仅当 content 不是数组时）- 兼容旧消息
		* 5. 如果 content 是 string，转为 text block（降级处理）
		*
		* @param sdkMessage - SDK 的 UserMessage
		* @returns CBUserMessage - cb-chat-ui 使用的类型
		*/
		static convertSDKUserMessageToCBUserMessage(sdkMessage, cwd) {
			let content;
			const extra = sdkMessage.extra;
			if (extra?.sourceContentBlocks && Array.isArray(extra.sourceContentBlocks)) content = this.resolveWorkspaceFileBlocks(this.shallowCloneSkipImageData(extra.sourceContentBlocks), cwd);
			else if (Array.isArray(sdkMessage.content) && this.isACPContentBlockArray(sdkMessage.content)) content = this.resolveWorkspaceFileBlocks(this.shallowCloneSkipImageData(sdkMessage.content), cwd);
			else if (Array.isArray(sdkMessage.content) && !extra?.inputPhrase) content = this.convertPersistedUserContentToContentBlocks(sdkMessage.content, cwd);
			else if (extra?.inputPhrase && Array.isArray(extra.inputPhrase)) content = this.convertInputPhraseToContentBlocks(extra.inputPhrase, extra.selectionContexts);
			else if (typeof sdkMessage.content === "string") content = [{
				type: "text",
				text: sdkMessage.content
			}];
			else content = [{
				type: "text",
				text: JSON.stringify(sdkMessage.content)
			}];
			content = this.normalizeUserTextContentBlocks(content);
			const { inputPhrase, selectionContexts, ...restExtra } = extra || {};
			let questionAnswer = restExtra.questionAnswer;
			if (!questionAnswer && content.length > 0) {
				const firstTextBlock = content.find((block) => block.type === "text");
				if (firstTextBlock && firstTextBlock._meta?.questionAnswer) questionAnswer = firstTextBlock._meta.questionAnswer;
			}
			return {
				...sdkMessage,
				messageType: "user",
				content,
				extra: {
					...restExtra,
					questionAnswer
				}
			};
		}
		static isACPContentBlock(block) {
			if (!block || typeof block !== "object" || typeof block.type !== "string") return false;
			switch (block.type) {
				case "text": return typeof block.text === "string";
				case "image": return typeof block.mimeType === "string" && (typeof block.data === "string" || typeof block.uri === "string");
				case "audio": return typeof block.mimeType === "string" && typeof block.data === "string";
				case "resource_link": return typeof block.uri === "string";
				case "resource": return !!block.resource || typeof block.uri === "string";
				default: return false;
			}
		}
		static isACPContentBlockArray(content) {
			return content.every((block) => this.isACPContentBlock(block));
		}
		static convertPersistedUserContentToContentBlocks(content, cwd) {
			const blocks = decodePersistedUserContentToAcpContentBlocks(content, { convertPersistedImageBlock: (block) => this.convertPersistedUserImageBlock(block) });
			return this.resolveWorkspaceFileBlocks(blocks, cwd);
		}
		static convertPersistedUserImageBlock(block) {
			if (block.type === "image_blob_ref" && block.blob_path && block.mime) return {
				type: "image",
				mimeType: block.mime,
				data: block.blob_path,
				uri: block.original_filename || block.blob_path.split("/").pop() || block.blob_path,
				_meta: {
					blobPath: block.blob_path,
					displayAsPhrase: true,
					filename: block.original_filename || block.blob_path.split("/").pop() || block.blob_path
				}
			};
			if (block.type !== "input_image" || !block.image) return;
			const imageBlock = {
				type: "image",
				_meta: { displayAsPhrase: true }
			};
			if (block.original_filename) imageBlock._meta.filename = block.original_filename;
			if (typeof block.image === "string") {
				const parsed = this.parseDataUri(block.image);
				if (!parsed) return;
				imageBlock.mimeType = parsed.mimeType;
				imageBlock.data = parsed.data;
				return imageBlock;
			}
			if (typeof block.image === "object" && block.image) {
				if (block.image.type === "image_blob_ref" && block.image.blob_path) {
					imageBlock.mimeType = block.image.mime;
					imageBlock.data = block.image.blob_path;
					imageBlock.uri = block.image.original_filename || block.image.blob_path.split("/").pop() || block.image.blob_path;
					imageBlock._meta.blobPath = block.image.blob_path;
					if (!imageBlock._meta.filename && block.image.original_filename) imageBlock._meta.filename = block.image.original_filename;
					return imageBlock;
				}
				if (typeof block.image.data === "string") {
					imageBlock.mimeType = block.image.mediaType || "image/png";
					imageBlock.data = block.image.data;
					return imageBlock;
				}
			}
		}
		/**
		* 对 content blocks 数组做浅拷贝，但跳过 image 类型 block 的深拷贝。
		*
		* 背景：convertSDKUserMessageToCBUserMessage 在每次 streaming re-render 时都会被调用
		* （通过 useEnhancedMessages），如果对包含大图片 base64 的 content 做 structuredClone，
		* 会产生大量不可被 GC 的图片字符串副本（被 React fiber / 闭包持有），导致 OOM。
		*
		* image block 在下游 resolveWorkspaceFileBlocks 中不会被 mutate（只有 resource_link
		* 类型才做路径归一化），因此共享引用是安全的。
		*/
		static shallowCloneSkipImageData(blocks) {
			return blocks.map((block) => block.type === "image" ? block : structuredClone(block));
		}
		static resolveWorkspaceFileBlocks(blocks, cwd) {
			const normalizedCwd = cwd?.replace(/\\/g, "/").replace(/\/+$/, "");
			return blocks.map((block) => this.normalizeWorkspaceFileBlock(block, normalizedCwd));
		}
		static normalizeWorkspaceFileBlock(block, normalizedCwd) {
			if (block.type !== "resource_link") return block;
			const meta = block._meta || {};
			if (meta.mentionType !== "file" && meta.mentionType !== "folder") return block;
			const rawRelativePath = typeof meta.relativePath === "string" ? meta.relativePath : this.decodeFilePathFromUri(block.uri);
			const rawFilePath = typeof meta.filePath === "string" ? meta.filePath : rawRelativePath;
			if (!rawRelativePath && !rawFilePath) return block;
			let normalizedRelativePath = rawRelativePath?.replace(/\\/g, "/");
			let normalizedFilePath = rawFilePath?.replace(/\\/g, "/");
			if (normalizedFilePath && normalizedFilePath.startsWith("file://")) normalizedFilePath = normalizedFilePath.slice(7);
			if (normalizedCwd && normalizedRelativePath && this.isAbsolutePath(normalizedRelativePath) && normalizedRelativePath.startsWith(`${normalizedCwd}/`)) normalizedRelativePath = normalizedRelativePath.slice(normalizedCwd.length + 1);
			if (normalizedCwd && normalizedFilePath && !this.isAbsolutePath(normalizedFilePath)) normalizedFilePath = this.joinWorkspacePath(normalizedCwd, normalizedFilePath);
			if (!normalizedRelativePath && normalizedCwd && normalizedFilePath && normalizedFilePath.startsWith(`${normalizedCwd}/`)) normalizedRelativePath = normalizedFilePath.slice(normalizedCwd.length + 1);
			const nextMeta = {
				...meta,
				...normalizedRelativePath ? { relativePath: normalizedRelativePath } : {},
				...normalizedFilePath ? { filePath: normalizedFilePath } : {}
			};
			return {
				...block,
				_meta: nextMeta
			};
		}
		static decodeFilePathFromUri(uri) {
			if (!uri || !uri.startsWith("file://")) return;
			try {
				const parsed = new URL(uri);
				if (parsed.protocol !== "file:") return;
				let pathname = decodeURIComponent(parsed.pathname);
				if (/^\/[A-Za-z]:[/\\]/.test(pathname) || /^\/[A-Za-z]:$/.test(pathname)) pathname = pathname.slice(1);
				return pathname;
			} catch {
				const path = uri.slice(7);
				try {
					return decodeURIComponent(path);
				} catch {
					return path;
				}
			}
		}
		static isAbsolutePath(path) {
			return path.startsWith("/") || /^[A-Za-z]:\//.test(path);
		}
		static joinWorkspacePath(basePath, relativePath) {
			return `${basePath.replace(/\/+$/, "")}/${relativePath.replace(/^\/+/, "")}`;
		}
		static parseDataUri(dataUri) {
			const match = dataUri.match(/^data:([^;]+);base64,(.+)$/);
			if (!match) return;
			return {
				mimeType: match[1],
				data: match[2]
			};
		}
		/**
		* 将 inputPhrase 和 selectionContexts 转换为 ContentBlock[]（反向转换）
		*
		* @param inputPhrase - inputPhrase 数组
		* @param selectionContexts - selectionContexts 数组（可选，用于补充元数据）
		* @returns ContentBlock[] - UI 层使用的 ContentBlock 数组
		*/
		static convertInputPhraseToContentBlocks(inputPhrase, selectionContexts) {
			if (!inputPhrase || inputPhrase.length === 0) return [];
			const blocks = [];
			const contextMap = /* @__PURE__ */ new Map();
			if (selectionContexts) for (const context of selectionContexts) {
				if (context.value) contextMap.set(context.value, context);
				if (context.label && context.label !== context.value) contextMap.set(context.label, context);
			}
			for (const phrase of inputPhrase) if (phrase.type === "normal") {
				if (phrase.content) blocks.push({
					type: "text",
					text: phrase.content
				});
			} else if (phrase.type === "command") {
				const commandName = phrase.expandContent || phrase.content?.replace(/^\//, "") || "";
				blocks.push({
					type: "resource_link",
					uri: `command://${commandName}`,
					name: commandName,
					_meta: {
						displayAsPhrase: true,
						mentionType: "command",
						type: "command",
						commandName,
						displayText: commandName
					}
				});
			} else {
				const mentionType = phrase.type;
				if (!mentionType) {
					if (phrase.content) blocks.push({
						type: "text",
						text: phrase.content
					});
					continue;
				}
				const contextInfo = contextMap.get(phrase.expandContent) || contextMap.get(phrase.content);
				if (mentionType === "img") {
					const previewDataUrl = contextInfo?.previewDataUrl;
					let imageData = "";
					let imageMimeType = "image/png";
					if (previewDataUrl) {
						const match = previewDataUrl.match(/^data:([^;]+);base64,(.+)$/);
						imageData = match ? match[2] : previewDataUrl;
						imageMimeType = match ? match[1] : "image/png";
					}
					blocks.push({
						type: "image",
						data: imageData,
						mimeType: imageMimeType,
						uri: phrase.content,
						_meta: {
							displayAsPhrase: true,
							mentionType,
							filename: phrase.expandContent || phrase.content
						}
					});
					continue;
				}
				const uri = phrase.expandContent || phrase.content || "";
				const name = phrase.content || uri.split("/").pop() || "";
				const block = {
					type: "resource_link",
					uri,
					name,
					_meta: {
						displayAsPhrase: true,
						icon: mentionType === "folder" ? "folder" : mentionType || "file",
						mentionType,
						type: mentionType,
						displayText: name,
						fileName: name,
						filePath: uri
					}
				};
				if (contextInfo) {
					const meta = block._meta || {};
					if (contextInfo.selection) meta.selection = contextInfo.selection;
					if (contextInfo.code) meta.code = contextInfo.code;
					if (contextInfo.filePath) meta.filePath = contextInfo.filePath;
					if (contextInfo.fileType) meta.fileType = contextInfo.fileType;
					block._meta = meta;
				}
				blocks.push(block);
			}
			return blocks;
		}
		/**
		* 从 URI 中提取文件名
		*/
		static extractFilenameFromUri(uri) {
			try {
				if (uri.startsWith("file://")) {
					const parts = uri.slice(7).split("/");
					return parts[parts.length - 1] || void 0;
				}
				const parts = uri.split("/");
				return parts[parts.length - 1] || void 0;
			} catch {
				return;
			}
		}
		/**
		* 合并流式消息内容
		* 用于处理 agent_message_chunk 和 agent_thought_chunk 的增量更新
		*/
		static mergeStreamingMessage(existingMessage, newChunk) {
			const mergedContent = [...existingMessage.content];
			for (const newContent of newChunk.content) if (newContent.type === "text" || newContent.type === "reasoning") {
				const targetType = newContent.type;
				let lastMatchingContent = null;
				let lastMatchingIndex = -1;
				for (let i = mergedContent.length - 1; i >= 0; i--) {
					const c = mergedContent[i];
					if (c.type === targetType) {
						lastMatchingContent = c;
						lastMatchingIndex = i;
						break;
					}
				}
				if (lastMatchingContent && "text" in lastMatchingContent && lastMatchingIndex >= 0) {
					const mergedText = lastMatchingContent.text + newContent.text;
					mergedContent[lastMatchingIndex] = {
						...lastMatchingContent,
						text: targetType === "text" ? this.normalizeSpecialistResultText(mergedText) : mergedText
					};
				} else {
					const nextContent = { ...newContent };
					if (targetType === "text") nextContent.text = this.normalizeSpecialistResultText(nextContent.text || "");
					mergedContent.push(nextContent);
				}
			} else mergedContent.push(newContent);
			return {
				...existingMessage,
				createTime: Math.max(existingMessage.createTime, newChunk.createTime),
				content: mergedContent,
				complete: newChunk.complete
			};
		}
	};
}));
//#endregion
export { init_city_tree as A, modelsSubject as C, chatStateStore as D, ChatStateEvent as E, setCityTreeUrl as M, init_chat_state_store as O, init_subscriptions as S, ChatState as T, restoreMentionedColleaguesDisplayText as _, SearchToolAdapter as a, withMentionedColleaguesContext as b, init_read_tool_adapter as c, HIDDEN_PROMPT_CONTEXT_META_KEY as d, expandInlineFileReferencesFromTextBlock as f, isHiddenPromptContextBlock as g, init_colleague_mention_context as h, resolveAcpMetaTimestamp as i, loadCityTree as j, getCachedCityTree as k, EditToolAdapter as l, getMentionedColleagueAgentIdFromBlock as m, init_message_converter as n, init_search_tool_adapter as o, extractMentionedColleagueResourceLinksFromText as p, init_acp_timestamp as r, ReadToolAdapter as s, MessageConverter as t, init_edit_tool_adapter as u, sanitizeMentionedColleaguesContextTextBlock as v, subagentsSubject as w, commandSubject as x, stripMentionedColleaguesContextText as y };
