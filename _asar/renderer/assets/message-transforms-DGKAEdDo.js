import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/components/share-preview/task/utils/message-transforms.ts
var message_transforms_exports = /* @__PURE__ */ __exportAll({
	correctAssistantCreateTimeFromTools: () => correctAssistantCreateTimeFromTools,
	enhanceMessages: () => enhanceMessages,
	mergeAssistantMessagesByRequestId: () => mergeAssistantMessagesByRequestId,
	normalizeMessages: () => normalizeMessages,
	reorderSubMessages: () => reorderSubMessages,
	sortByCreateTime: () => sortByCreateTime,
	stripQuestionAnswerXml: () => stripQuestionAnswerXml
});
/**
* 清理用户消息文本中的 <question_answer> XML 结构
* 分享预览中不应显示这些内部 XML 标签
*/
function stripQuestionAnswerXml(text) {
	if (!text) return text;
	let cleaned = text.replace(/<question_answer>[\s\S]*?<\/question_answer>\s*/g, "");
	cleaned = cleaned.replace(/<\/?question_answer>/g, "");
	cleaned = cleaned.replace(/<\/?question_item[^>]*>/g, "");
	cleaned = cleaned.replace(/<\/?question>/g, "");
	cleaned = cleaned.replace(/<\/?answers>/g, "");
	cleaned = cleaned.replace(/<\/?questions>/g, "");
	return cleaned.trim();
}
/**
* 稳定排序消息，恢复会话真实顺序。
*
* 服务端返回的消息有时并非按会话顺序（例如 user 与 assistant 被分别批量返回、
* 导致所有 user 消息堆在前面、assistant 消息堆在后面）。为了正确展示
* 用户/助手交替的对话，需要重排。
*
* 排序键优先级：`_offset` > `createTime` > 原索引。
* - `_offset` 是服务端存储偏移量，即消息在会话中的真实顺序 source of truth，
*   天然保证 user/assistant 交替正确。
* - 不能只用 `createTime`：IM 转发/回放类消息（如微信机器人 claw-im-*）的
*   createTime 是同步/回放入库时刻（常是同一毫秒、且晚于真实发生时间），
*
* 注意：为避免「一部分消息有 _offset、一部分没有」时两种键混排导致的错位，
* 仅当**所有**消息都带有效 `_offset` 时才用 `_offset` 排序，否则退回 `createTime`。
*/
function sortByCreateTime(messages) {
	const hasOffset = (m) => typeof m._offset === "number";
	const useOffset = messages.length > 0 && messages.every(hasOffset);
	const indexed = messages.map((msg, i) => ({
		msg,
		i
	}));
	indexed.sort((a, b) => {
		const ka = useOffset ? a.msg._offset : typeof a.msg.createTime === "number" ? a.msg.createTime : 0;
		const kb = useOffset ? b.msg._offset : typeof b.msg.createTime === "number" ? b.msg.createTime : 0;
		if (ka !== kb) return ka - kb;
		return a.i - b.i;
	});
	return indexed.map((item) => item.msg);
}
/**
* 重排序消息：确保同一 base message id 的子消息连续排列。
*
* 服务端返回的消息中，同一 message 的多个 sub-message（id 格式为 `{baseId}-{index}`）
* 可能因为 createTime 不同而被分散到不同位置。例如 `abc-0`（reasoning）在位置 5，
* 而 `abc-1`（tool-call）在位置 50。这会导致 plan_create 卡片等内容无法在正确位置渲染。
*
* 此函数将同一 baseId 的子消息聚合到该 baseId 首次出现的位置，按 index 排序。
*/
function reorderSubMessages(messages) {
	const parseId = (id) => {
		const match = id.match(/^(.+)-(\d{1,4})$/);
		if (!match) return null;
		const baseId = match[1];
		const lastSegment = baseId.slice(baseId.lastIndexOf("-") + 1);
		if (lastSegment === "user" || lastSegment === "assistant") return null;
		return {
			baseId,
			index: parseInt(match[2], 10)
		};
	};
	const baseIdFirstIndex = /* @__PURE__ */ new Map();
	const baseIdMessages = /* @__PURE__ */ new Map();
	for (let i = 0; i < messages.length; i++) {
		const msg = messages[i];
		const parsed = parseId(msg.id);
		const baseId = parsed ? parsed.baseId : msg.id;
		if (!baseIdFirstIndex.has(baseId)) baseIdFirstIndex.set(baseId, i);
		if (!baseIdMessages.has(baseId)) baseIdMessages.set(baseId, []);
		baseIdMessages.get(baseId).push(msg);
	}
	for (const [, msgs] of baseIdMessages) msgs.sort((a, b) => {
		const parsedA = parseId(a.id);
		const parsedB = parseId(b.id);
		return (parsedA?.index ?? 0) - (parsedB?.index ?? 0);
	});
	const result = [];
	const visited = /* @__PURE__ */ new Set();
	for (const msg of messages) {
		const parsed = parseId(msg.id);
		const baseId = parsed ? parsed.baseId : msg.id;
		if (visited.has(baseId)) continue;
		visited.add(baseId);
		result.push(...baseIdMessages.get(baseId));
	}
	return result;
}
/**
* 为 TaskChatList 增强消息：标记 isEnd / complete，
* 并清理用户消息中的 <question_answer> XML 内容。
*
* 说明：不论是否处于重放状态，消息数据结构保持一致；
* 重放和静态浏览使用同一结构，避免两种数据形态产生展示差异。
*/
function enhanceMessages(messages) {
	const len = messages.length;
	return messages.map((msg, i) => {
		const isLast = i === len - 1;
		const nextMsg = messages[i + 1];
		const isEnd = msg.messageType === "assistant" ? isLast ? true : nextMsg?.messageType === "user" : void 0;
		let content = msg.content;
		if (msg.messageType === "user" && Array.isArray(content)) content = content.map((block) => {
			if (block.type === "text" && block.text) return {
				...block,
				text: stripQuestionAnswerXml(block.text)
			};
			return block;
		}).filter((block) => block.type !== "text" || block.text && block.text.trim().length > 0);
		return {
			...msg,
			content,
			complete: true,
			...isEnd !== void 0 ? { isEnd } : {}
		};
	});
}
/**
* 合并同一 requestId 的多条 assistant 消息。
*
* 分享数据后端按 _offset 分段存储 assistant 消息，同一 AI 回复可能对应多条
* messageType='assistant' 记录，它们共享相同的 requestId（但 id 不同）。
* 若直接传给对话流，会触发 turn 级折叠逻辑，
* 导致只有首条（或 lastBodyText 那条）渲染，其余内容丢失。
*
* 合并策略：
* - 按 _offset（优先）或 createTime（兜底）升序排列子消息
* - 将所有子消息的 content 按顺序拼接
* - 以 requestId 首次出现的位置、第一条的 id/requestId 作为代表消息
* - createTime 取所有子消息中最大的（保证 isEnd 判断正确）
*
* 注意：user 消息不做合并（requestId 通常唯一）。
*/
function mergeAssistantMessagesByRequestId(messages) {
	const groups = /* @__PURE__ */ new Map();
	const nonAssistantOrNoReqId = [];
	for (let i = 0; i < messages.length; i++) {
		const msg = messages[i];
		if (msg.messageType !== "assistant" || !msg.requestId) {
			nonAssistantOrNoReqId.push({
				idx: i,
				msg
			});
			continue;
		}
		const group = groups.get(msg.requestId);
		if (!group) groups.set(msg.requestId, {
			firstIdx: i,
			msgs: [msg]
		});
		else group.msgs.push(msg);
	}
	let hasMultiple = false;
	for (const { msgs } of groups.values()) if (msgs.length > 1) {
		hasMultiple = true;
		break;
	}
	if (!hasMultiple) return messages;
	const resultItems = [];
	for (const { idx, msg } of nonAssistantOrNoReqId) resultItems.push({
		firstIdx: idx,
		msg
	});
	for (const { firstIdx, msgs } of groups.values()) {
		const sorted = [...msgs].sort((a, b) => {
			return (a._offset ?? a.createTime ?? 0) - (b._offset ?? b.createTime ?? 0);
		});
		const mergedContent = [];
		for (const sub of sorted) if (Array.isArray(sub.content)) mergedContent.push(...sub.content);
		const maxCreateTime = Math.max(...msgs.map((m) => m.createTime ?? 0));
		const representative = {
			...sorted[0],
			content: mergedContent,
			createTime: maxCreateTime,
			complete: true
		};
		resultItems.push({
			firstIdx,
			msg: representative
		});
	}
	resultItems.sort((a, b) => a.firstIdx - b.firstIdx);
	return resultItems.map((item) => item.msg);
}
/**
* 取 content 内所有 tool-call block 的最大 createTime（即该轮工具执行的真实完成时刻）。
* 无 tool-call 或均无 createTime 时返回 undefined。
*/
function getContentMaxToolCreateTime(content) {
	if (!Array.isArray(content)) return;
	let max;
	for (const block of content) {
		const t = block?.tool?.createTime;
		if (typeof t === "number" && Number.isFinite(t) && (max === void 0 || t > max)) max = t;
	}
	return max;
}
/**
* 订正 assistant 消息外层 createTime。
*
* 历史消息经会话重放（sessions.load → sessionUpdate）转换时，纯文本 agent_message
* 事件的 _meta 不带原始时间戳，MessageConverter.resolveCreateTime 会兜底 Date.now()，
* 导致 assistant 外层 createTime 变成「重放当下」（可能比真实回复时刻晚数十小时）。
* 而 content 内 tool-call 的 createTime 由工具事件携带，是真实执行时刻。
*
* conversation-render 的 getAssistantEndTime 取的正是外层 createTime，
* 不订正会使「已完成 XX」耗时严重偏大。这里用 content 内 tool-call 的最大 createTime
* 覆盖外层值（仅当它更早时），让耗时回归真实。
*
* 边界：纯文本回复（无 tool-call）拿不到内部时间戳，保持原值不动。
*/
function correctAssistantCreateTimeFromTools(messages) {
	return messages.map((msg) => {
		if (msg.messageType !== "assistant") return msg;
		const toolMax = getContentMaxToolCreateTime(msg.content);
		if (toolMax !== void 0 && (msg.createTime == null || toolMax < msg.createTime)) return {
			...msg,
			createTime: toolMax
		};
		return msg;
	});
}
function normalizeMessages(messages) {
	return pipe(messages, sortByCreateTime, reorderSubMessages, mergeAssistantMessagesByRequestId, correctAssistantCreateTimeFromTools, enhanceMessages);
}
var pipe;
var init_message_transforms = __esmMin((() => {
	pipe = (x, ...fns) => fns.reduce((acc, fn) => fn(acc), x);
}));
//#endregion
export { message_transforms_exports as n, normalizeMessages as r, init_message_transforms as t };
