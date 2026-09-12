import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/utils/compact-divider-utils.ts
function asRecord(value) {
	return value && typeof value === "object" ? value : void 0;
}
function getCompactNotificationMeta(notification) {
	const notifMeta = asRecord(notification._meta);
	const updateMeta = asRecord(notification.update?._meta);
	return {
		notifMeta,
		updateMeta,
		notifCbMeta: asRecord(notifMeta?.["codebuddy.ai"]),
		updateCbMeta: asRecord(updateMeta?.["codebuddy.ai"])
	};
}
function extractCompactTextFromContent(content) {
	if (Array.isArray(content)) return content.map((block) => extractCompactTextFromContent(block)).join("");
	if (typeof content === "string") return content;
	const record = asRecord(content);
	if (record?.type === "text" && typeof record.text === "string") return record.text;
	return "";
}
function isCompactInternalNotification(notification, options = {}) {
	const { notifMeta, updateMeta, notifCbMeta, updateCbMeta } = getCompactNotificationMeta(notification);
	if (notifMeta?.[ACP_META_COMPACT_INTERNAL] || updateMeta?.[ACP_META_COMPACT_INTERNAL] || notifCbMeta?.isCompactInternal || updateCbMeta?.isCompactInternal || notifCbMeta?.[ACP_META_COMPACT_INTERNAL] || updateCbMeta?.[ACP_META_COMPACT_INTERNAL]) return true;
	if (!(options.allowTextFallback ?? true)) return false;
	const fallbackUpdateTypes = options.fallbackUpdateTypes ?? ["agent_message_chunk"];
	const updateType = notification.update?.sessionUpdate;
	if (updateType && fallbackUpdateTypes.includes(updateType)) return CONVERSATION_HISTORY_SUMMARY_AT_START_RE.test(extractCompactTextFromContent(notification.update?.content));
	return false;
}
function getCompactType(notification) {
	const { notifMeta, updateMeta, notifCbMeta, updateCbMeta } = getCompactNotificationMeta(notification);
	const value = notifMeta?.[ACP_META_COMPACT_TYPE] ?? updateMeta?.[ACP_META_COMPACT_TYPE] ?? notifCbMeta?.compactType ?? updateCbMeta?.compactType ?? notifCbMeta?.[ACP_META_COMPACT_TYPE] ?? updateCbMeta?.[ACP_META_COMPACT_TYPE];
	return typeof value === "string" ? value : void 0;
}
function shouldSkipLivePreMessageAutoCompact(compactType) {
	return compactType === CompactType.PRE_MESSAGE_AUTO;
}
function isCompactUserPromptContent(content) {
	const text = extractCompactTextFromContent(content);
	if (!text) return false;
	return COMPACT_REQUEST_AT_START_RE.test(text) || CONVERSATION_HISTORY_SUMMARY_AT_START_RE.test(text) || CB_SUMMARY_AT_START_RE.test(text) || LEGACY_COMPACT_PROMPT_RE.test(text) || SUMMARY_COMPACT_PROMPT_RE.test(text) || CONTINUE_PROMPT_AT_START_RE.test(text) || PLEASE_SUMMARIZE_PROMPT_AT_START_RE.test(text);
}
function isCompactUserPromptNotification(notification) {
	const content = notification.update?.content;
	if (isCompactUserPromptContent(content)) return true;
	if (Array.isArray(content)) return content.some((block) => isCompactUserPromptContent([block]));
	return false;
}
function isPromptTooLongErrorContent(content) {
	const text = extractCompactTextFromContent(content);
	if (!text) return false;
	return PROMPT_TOO_LONG_ERROR_PATTERNS.some((pattern) => pattern.test(text));
}
function isPromptTooLongErrorNotification(notification) {
	const { notifMeta, updateMeta, notifCbMeta, updateCbMeta } = getCompactNotificationMeta(notification);
	if ([
		notifCbMeta,
		updateCbMeta,
		notifMeta,
		updateMeta
	].flatMap((meta) => meta ? [
		meta.errorCode,
		meta.code,
		meta.category,
		meta.errorCategory,
		meta.type,
		meta.errorType,
		meta.reason,
		meta.error,
		meta.errorMessage,
		meta.message
	] : []).filter((value) => typeof value === "string" && value.length > 0).some((value) => PROMPT_TOO_LONG_META_RE.test(value) || PROMPT_TOO_LONG_ERROR_PATTERNS.some((pattern) => pattern.test(value)))) return true;
	return isPromptTooLongErrorContent(notification.update?.content);
}
function classifyCompactFrameFromAssistant(message) {
	const text = extractCompactTextFromContent(message.content);
	if (COMPACT_SUMMARY_REMINDER_RE.test(text)) return "replay";
	if (text.includes("</summary>") || text.includes("</conversation_history_summary>")) return "completed";
	if (text.includes("<summary>") || text.includes("<conversation_history_summary>")) return "streaming";
	return text.length === 0 ? "streaming" : "replay";
}
function resolveCompactDividerStatus(frameKind) {
	return frameKind === "streaming" ? "compacting" : "completed";
}
function buildCompactDividerExtra(compactStatus) {
	return {
		isCompactDivider: true,
		isCompacting: compactStatus === "compacting",
		compactStatus
	};
}
var COMPACT_SUMMARY_REMINDER_RE, COMPACT_REQUEST_AT_START_RE, CONVERSATION_HISTORY_SUMMARY_AT_START_RE, CB_SUMMARY_AT_START_RE, LEGACY_COMPACT_PROMPT_RE, SUMMARY_COMPACT_PROMPT_RE, CONTINUE_PROMPT_AT_START_RE, PLEASE_SUMMARIZE_PROMPT_AT_START_RE, ACP_META_COMPACT_INTERNAL, ACP_META_COMPACT_TYPE, PROMPT_TOO_LONG_ERROR_PATTERNS, PROMPT_TOO_LONG_META_RE, CompactType, CompactDividerTracker;
var init_compact_divider_utils = __esmMin((() => {
	COMPACT_SUMMARY_REMINDER_RE = /<system-reminder[^>]*data-role=["']compact-summary["']/;
	COMPACT_REQUEST_AT_START_RE = /^\s*<compact-request\b/i;
	CONVERSATION_HISTORY_SUMMARY_AT_START_RE = /^\s*<conversation_history_summary\b/i;
	CB_SUMMARY_AT_START_RE = /^\s*<cb_summary\b/i;
	LEGACY_COMPACT_PROMPT_RE = /^\s*Your task is to write a detailed and structured summary[\s\S]*<conversation_history_summary\b/i;
	SUMMARY_COMPACT_PROMPT_RE = /(?:\*\*IMPORTANT CONSTRAINTS:\*\*|Your ONLY output should be the\s+<conversation_history_summary>|Your task is to create a detailed summary of the conversation so far)[\s\S]*<conversation_history_summary\b/i;
	CONTINUE_PROMPT_AT_START_RE = /^\s*Please continue with the conversation based on the summarized context above\b/i;
	PLEASE_SUMMARIZE_PROMPT_AT_START_RE = /^\s*Please\s+summarize\s+the\s+conversation\s+above/i;
	ACP_META_COMPACT_INTERNAL = "codebuddy.ai/isCompactInternal";
	ACP_META_COMPACT_TYPE = "codebuddy.ai/compactType";
	PROMPT_TOO_LONG_ERROR_PATTERNS = [
		/^\s*(?:400\s+)?(?:input length too long|prompt is too long|maximum context length)\b/i,
		/(?:输入|提示词|上下文|context|prompt)[\s\S]{0,16}(?:过长|超长|超过|超出)[\s\S]{0,16}(?:限制|上限|长度|窗口|limit|length)/i,
		/(?:超过|超出)[\s\S]{0,16}(?:最大|模型)[\s\S]{0,16}(?:上下文|输入|token|tokens)/i
	];
	PROMPT_TOO_LONG_META_RE = /prompt[_-]?too[_-]?long|input[_-]?length|context[_-]?length|payload[_-]?too[_-]?large|maximum[_-]?context/i;
	CompactType = {
		PRE_MESSAGE_AUTO: "pre-message-auto",
		USER_COMMAND: "user-command",
		EMERGENCY_AUTO: "emergency-auto"
	};
	CompactDividerTracker = class {
		resolveDividerMessageId(rawMessageId, frameKind) {
			return this.lastDividerId !== void 0 && this.lastDividerStatus !== "cancelled" && !(this.lastDividerStatus === "completed" && frameKind === "streaming") ? this.lastDividerId : rawMessageId;
		}
		record(dividerMessageId, compactStatus) {
			this.lastDividerId = dividerMessageId;
			this.lastDividerStatus = compactStatus;
		}
		getLastDividerId() {
			return this.lastDividerId;
		}
		getLastDividerStatus() {
			return this.lastDividerStatus;
		}
	};
}));
//#endregion
export { getCompactNotificationMeta as a, isCompactInternalNotification as c, isPromptTooLongErrorNotification as d, resolveCompactDividerStatus as f, classifyCompactFrameFromAssistant as i, isCompactUserPromptContent as l, CompactType as n, getCompactType as o, shouldSkipLivePreMessageAutoCompact as p, buildCompactDividerExtra as r, init_compact_divider_utils as s, CompactDividerTracker as t, isCompactUserPromptNotification as u };
