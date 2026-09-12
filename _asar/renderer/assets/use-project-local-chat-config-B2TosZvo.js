import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Bl as init_use_oneid_connector_gate, Di as useFileMentionProvider, Ei as init_use_file_mention_provider, Fc as useVisibleMcpConnectors, Ju as useTencentLexiangEnabled, Nc as init_connector, Ti as init_wb_mention_panel, Vl as useOneidConnectorGate, au as useProjectFacade, bt as resolveAvatarUrl, cd as useKnowledgeBaseFeature, du as useLexiangLibraryMode, id as useTencentDocsKnowledgeFeature, iu as init_use_project_facade, ld as init_use_ima_enabled, nd as init_use_tencent_docs_knowledge_feature, qu as init_use_tencent_lexiang_enabled, sd as init_use_knowledge_base_feature, ud as useImaEnabled, uu as init_use_lexiang_library_mode, vt as getAvatarFallbackBackground, wi as WB_MENTION_PANEL_COLLAB_CLASS, yt as init_avatar_url } from "./agent-mail-CiuzbR2o.js";
import { G as decodeInputTextToAcpContentBlocks, W as init_common } from "./common-CwB_VqKR.js";
import { Gs as createPhraseBlock, To as mergeAdjacentTextBlocks, Yr as toast, Ys as getBlockStatus, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { p as init_environment, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { U as extractHttpStatus, W as init_errors } from "./contexts-D7XKqa2J.js";
import { A as message, J as Popover, lt as Avatar, t as init_foundation } from "./foundation-QOglV606.js";
import { $ as TencentLexiangIcon, Sn as ImaKnowledgeIcon, at as TencentDocsIcon } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { O as useConnectorStore, y as connectorStore } from "./ima-auth-store-Cq8i4JCG.js";
import { t as init_common$1 } from "./common-Czfscgga.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
import { M as MyFilesIcon, ct as WbAddIcon, r as init_icons } from "./oauth-callback-IQ0UCaVX.js";
import { D as getTdocIconUrl, O as init_file_type_icon } from "./use-tdoc-check-auth-gate-x9L7eHnu.js";
import { i as isInteractiveQuestionTool, n as init_acp_message_accumulator, r as init_interactive_question_tools, t as ACPMessageAccumulator } from "./acp-message-accumulator-DFww5ygX.js";
import { a as init_netdrive_block_utils$1, d as init_use_tencent_netdrive_knowledge_feature, i as getFileType, n as createNetDriveFileBlock, o as NetDriveStoreProvider, p as useTencentNetDriveKnowledgeFeature, r as getExtFromName, s as init_netdrive_store_context } from "./cloud-file-constants-C5UBSGVB.js";
import { C as ensureSmartsheetService, a as getProjectStores, c as useProjectNetDriveReady, d as TeamsUserAvatar, f as useTeamMember, i as init_netdrive_selector_modal$1, l as init_teams_user_display, n as useConnectorActions, o as init_project_netdrive_store, r as NetDriveSelectorModal, t as init_use_connector_actions, u as TeamsUserLabel, v as init_smart_sheet } from "./use-connector-actions-itiUtXCz.js";
import { at as resolvePriorityOption } from "./smartsheet-view-renderer-qTXK-_ue.js";
import { i as init_beacon_report, n as TEAMS_EVENT, o as useTeamsReport, s as init_context, t as TEAMS_ELEMENT } from "./beacon-report-tRFsdxrK.js";
import { n as getLexiangIconUrl, r as init_lexiang_file_type_icon } from "./lexiang-file-type-icon-BHHdkoaP.js";
import { a as ImaFileSelector, t as init_ima } from "./ima-CX4f7ak2.js";
import { c as lexiangAuthStore, s as init_lexiang_auth_store } from "./auth-guide-DhEAKsIJ.js";
import { n as DocSelectorModal, t as init_doc_selector_modal } from "./doc-selector-modal-ga8kVQpX.js";
import { n as processImageUrisFromCache, t as init_upload_utils } from "./upload-utils-KM3L54A-.js";
import { n as init_lexiang_content_picker, t as LexiangContentPicker } from "./lexiang-content-picker-CYCM3GQu.js";
import { c as isCompactInternalNotification, f as resolveCompactDividerStatus, i as classifyCompactFrameFromAssistant, n as CompactType, o as getCompactType, p as shouldSkipLivePreMessageAutoCompact, r as buildCompactDividerExtra, s as init_compact_divider_utils$1, t as CompactDividerTracker, u as isCompactUserPromptNotification } from "./compact-divider-utils-CEUReIJo.js";
import { a as buildProjectInviteApplyPayload, o as buildProjectInviteViewPayload, s as init_teams_telemetry_fields } from "./teams-telemetry-fields-DjnPE9Hg.js";
import { n as init_message_linked_list, r as isTurnTerminated, t as MessageLinkedList } from "./message-linked-list-BGm1uCci.js";
import { n as LocalTaskResourceService, t as init_project } from "./project-X3IGS9h0.js";
//#region ../../packages/agent-ui/src/modules/collab/assets/no-access.svg
var no_access_default;
var init_no_access = __esmMin((() => {
	no_access_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='56.0702'%20height='56.0702'%3e%3cpath%20fill='%23000'%20fill-opacity='0.06'%20transform='matrix(1%200%200%201%200.0350952%200.0351028)'%20d='M0%2024C0%2012.7331%20-0.0351%207.0645%203.5147%203.5147C7.0645%20-0.0351%2012.7331%200%2024%200L32%200C43.2669%200%2048.9355%20-0.0351%2052.4853%203.5147C56.0351%207.0645%2056%2012.7331%2056%2024L56%2032C56%2043.2669%2056.0351%2048.9355%2052.4853%2052.4853C48.9355%2056.0351%2043.2669%2056%2032%2056L24%2056C12.7331%2056%207.0645%2056.0351%203.5147%2052.4853C-0.0351%2048.9355%200%2043.2669%200%2032L0%2024Z'/%3e%3cpath%20fill='%23000'%20fill-opacity='0.9'%20transform='matrix(1%200%200%201%2013.0352%2013.1661)'%20d='M27.3356%202.6643C24.6714%200%2020.3519%200%2017.6877%202.6643L13.367%206.985L15.0899%208.7079L19.4106%204.3872C21.1232%202.6745%2023.9%202.6745%2025.6127%204.3872C27.3254%206.0999%2027.3254%208.8768%2025.6127%2010.5895L20.2847%2015.9176C18.572%2017.6303%2015.7952%2017.6303%2014.0825%2015.9176L12.3596%2017.6405C15.0238%2020.3048%2019.3434%2020.3048%2022.0076%2017.6405L27.3356%2012.3124C29.9998%209.6481%2029.9998%205.3285%2027.3356%202.6643ZM2.6642%2027.0737C5.3284%2029.738%209.648%2029.738%2012.3122%2027.0737L16.6328%2022.753L14.9099%2021.0301L10.5893%2025.3508C8.8766%2027.0635%206.0998%2027.0635%204.3871%2025.3508C2.6744%2023.6381%202.6744%2020.8612%204.3871%2019.1485L9.7151%2013.8204C11.4278%2012.1077%2014.2046%2012.1077%2015.9173%2013.8204L17.6402%2012.0975C14.976%209.4332%2010.6565%209.4332%207.9922%2012.0975L2.6642%2017.4256C0%2020.0899%200%2024.4095%202.6642%2027.0737Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/apply-join-page/apply-join-page.less
var init_apply_join_page$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/assets/project_apply.svg
var project_apply_default;
var init_project_apply = __esmMin((() => {
	project_apply_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='56.0702'%20height='56.0702'%3e%3cpath%20fill='%23000'%20fill-opacity='0.06'%20transform='matrix(1%200%200%201%200.0350952%200.0351028)'%20d='M0%2024C0%2012.7331%20-0.0351%207.0645%203.5147%203.5147C7.0645%20-0.0351%2012.7331%200%2024%200L32%200C43.2669%200%2048.9355%20-0.0351%2052.4853%203.5147C56.0351%207.0645%2056%2012.7331%2056%2024L56%2032C56%2043.2669%2056.0351%2048.9355%2052.4853%2052.4853C48.9355%2056.0351%2043.2669%2056%2032%2056L24%2056C12.7331%2056%207.0645%2056.0351%203.5147%2052.4853C-0.0351%2048.9355%200%2043.2669%200%2032L0%2024Z'/%3e%3cclipPath%20id='clip_0'%3e%3cpath%20d='M12.0351%2023.7478L18.7974%2012.0351L32.3213%2012.0351L44.0351%2018.798L44.0351%2032.3222L37.2726%2044.0351L23.747%2044.0351L12.0351%2037.2733L12.0351%2023.7478Z'%20clip-rule='evenodd'/%3e%3c/clipPath%3e%3cg%20clip-path='url(%23clip_0)'%3e%3cpath%20fill='%23000'%20fill-opacity='0.9'%20transform='matrix(0.866025%200.5%20-0.5%200.866025%2023.2671%207.1535)'%20d='M17.8934%201.3766Q16.5168%200%2014.57%200Q12.6232%200%2011.2466%201.3766Q9.87%202.7532%209.87%204.7Q9.87%206.6468%2011.2466%208.0234Q12.6232%209.4%2014.57%209.4Q16.5168%209.4%2017.8934%208.0234Q18.4412%207.4756%2018.771%206.8375Q20.6884%207.7369%2022.0958%209.4219Q23.9876%2011.687%2024.3105%2014.6104L26.696%2014.3469Q26.2937%2010.704%2023.9378%207.8834Q21.9933%205.5554%2019.2633%204.4319Q19.1742%202.6574%2017.8934%201.3766ZM12.9437%203.0737Q13.6173%202.4%2014.57%202.4Q15.5227%202.4%2016.1963%203.0737Q16.87%203.7473%2016.87%204.7Q16.87%205.6527%2016.1963%206.3263Q15.5227%207%2014.57%207Q13.6173%207%2012.9437%206.3263Q12.27%205.6527%2012.27%204.7Q12.27%203.7473%2012.9437%203.0737ZM6.2602%2016.6601Q5.5157%2016.4607%204.8017%2016.4927Q4.7703%2016.0988%204.7703%2015.6999Q4.7703%2013.3675%205.8105%2011.3008Q6.8174%209.3%208.5981%207.9292L7.1341%206.0274Q4.9197%207.7321%203.6667%2010.2219Q2.3703%2012.7976%202.3703%2015.6999Q2.3703%2016.4905%202.4699%2017.2663Q0.9735%2018.231%200.5039%2019.9835Q0%2021.864%200.9734%2023.55Q1.9468%2025.236%203.8273%2025.7399Q5.7077%2026.2437%207.3937%2025.2703Q9.0797%2024.2969%209.5836%2022.4165Q10.0874%2020.536%209.114%2018.85Q8.1406%2017.164%206.2602%2016.6601ZM22.8798%2016.6601Q20.9994%2017.164%2020.026%2018.85Q19.0526%2020.536%2019.5564%2022.4164Q19.7569%2023.1647%2020.1446%2023.7694Q17.6903%2025.4999%2014.5703%2025.4999Q12.5465%2025.4999%2010.7045%2024.7082L9.7568%2026.9132Q12.0526%2027.8999%2014.5703%2027.8999Q16.8776%2027.8999%2019.0094%2027.0668Q20.6174%2026.4384%2021.9768%2025.396Q23.5603%2026.2094%2025.3127%2025.7398Q27.1932%2025.236%2028.1666%2023.55Q29.14%2021.864%2028.6361%2019.9835Q28.1323%2018.1031%2026.4463%2017.1297Q24.7603%2016.1563%2022.8798%2016.6601ZM21.8746%2021.7953Q21.6281%2020.8751%2022.1044%2020.05Q22.5808%2019.2249%2023.501%2018.9784Q24.4212%2018.7318%2025.2463%2019.2081Q26.0713%2019.6845%2026.3179%2020.6047Q26.5645%2021.5249%2026.0881%2022.35Q25.6118%2023.1751%2024.6916%2023.4216Q23.7713%2023.6682%2022.9463%2023.1919Q22.1212%2022.7155%2021.8746%2021.7953ZM7.0356%2020.05Q6.5592%2019.2249%205.639%2018.9784Q4.7188%2018.7318%203.8937%2019.2081Q3.0687%2019.6845%202.8221%2020.6047Q2.5755%2021.5249%203.0519%2022.35Q3.5282%2023.1751%204.4484%2023.4216Q5.3687%2023.6682%206.1937%2023.1919Q7.0188%2022.7155%207.2653%2021.7953Q7.5119%2020.8751%207.0356%2020.05Z'%20fill-rule='evenodd'/%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/types/message-reference.ts
/**
* 构造 chip block 的 uri —— 沿用 `message://` schema。
* 引用回复时把 replyId 挂到 query，方便肉眼调试。
*/
function buildMessageUri(payload) {
	const base = `message://${payload.messageId}`;
	return payload.replyId ? `${base}?replyId=${payload.replyId}` : base;
}
var MESSAGE_REFERENCE_MENTION_TYPE;
var init_message_reference = __esmMin((() => {
	MESSAGE_REFERENCE_MENTION_TYPE = "message";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/utils/strip-injected-context.ts
/**
* Strip injected context XML from user-visible text.
*
* Removes `<project-instructions>`, `<ticket-context>`, `<system-reminder>` blocks
* that are injected by the frontend (resolve-and-send-prompt → buildTeamsContextBlocks)
* before sending to the ACP session. These should never be shown in chat bubbles or
* queue previews.
*
* Note: `<user_message uid="xxx"/>` marker is NOT stripped here — it is handled
* separately by extractUserIdFromMarker + stripUserIdMarker in buildUserMessage.
*/
function stripInjectedContext(text) {
	return text.replace(/<system-reminder[^>]*>[\s\S]*?<\/system-reminder>\s*/g, "").replace(/<project-instructions>[\s\S]*?<\/project-instructions>\s*/g, "").replace(/<ticket-context>[\s\S]*?<\/ticket-context>\s*/g, "").trim();
}
/**
* 从 `<ticket-context>` / `<reference-suggestions>` 中提取被引用 todo 的标题（降级兜底）。
*
* 用于 buildUserMessage：sourceContentBlocks 中无 resource_link 时（旧会话 / resolveMessage 新路径），
* 把 todo 标题还原为 resource_link chip。
*
* 格式（新范式：resolve-and-send-prompt.buildTeamsContextBlocks 生成 <todo-reference>；
*   旧会话回放兜底：injected <reference-suggestions>）：
*   <reference-suggestions>
*   The following are suggestions...（header，跳过）
*
*   todoTitle          ← header 后第一个非空行即为 todo 标题
*   todoDescription    ← 其余内容为 todo 描述，可能含有空行，不作为标题
*   </reference-suggestions>
*
* 只取 header 后第一个非空行，避免 todo description 中的空行或多行内容被误识别为多个 todo。
*/
function extractTodoTitlesFromTicketContext(text) {
	const todoRefMatch = text.match(/<todo-reference>([\s\S]*?)<\/todo-reference>/);
	if (todoRefMatch) {
		const titles = [];
		const titleRe = /<todo\b[^>]*\btitle="([^"]*)"/g;
		let m;
		while ((m = titleRe.exec(todoRefMatch[1])) !== null) if (m[1]) titles.push(m[1]);
		if (titles.length > 0) return titles;
	}
	const titles = [];
	const refMatch = text.match(/<reference-suggestions>([\s\S]*?)<\/reference-suggestions>/);
	if (!refMatch) return titles;
	const lines = refMatch[1].split("\n");
	let contentStart = 0;
	for (let i = 0; i < lines.length; i++) if (lines[i].trim().startsWith("The following")) {
		contentStart = i + 1;
		break;
	}
	for (let i = contentStart; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line) {
			titles.push(line);
			break;
		}
	}
	return titles;
}
var init_strip_injected_context = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/utils/compact-divider-utils.ts
function buildCompactDividerCollabMessage(params) {
	const { id, conversationId, timestamp, compactStatus } = params;
	return {
		id,
		type: "system",
		sender: null,
		content: "",
		timestamp,
		status: "sent",
		conversationId,
		extra: buildCompactDividerExtra(compactStatus)
	};
}
function createCompactDividerFromAssistant(params) {
	const frameKind = classifyCompactFrameFromAssistant(params.message);
	const dividerId = params.tracker.resolveDividerMessageId(params.rawMessageId, frameKind);
	const compactStatus = resolveCompactDividerStatus(frameKind);
	params.tracker.record(dividerId, compactStatus);
	return buildCompactDividerCollabMessage({
		id: dividerId,
		conversationId: params.conversationId,
		timestamp: params.timestamp,
		compactStatus
	});
}
var init_compact_divider_utils = __esmMin((() => {
	init_compact_divider_utils$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/hooks/use-chat-messages/notification-stream/helpers.ts
var isCancelledTurn, buildSentAssistant, buildHistorySentAssistant, defaultYield, SandboxEpochTracker;
var init_helpers = __esmMin((() => {
	init_chat_message_utils();
	isCancelledTurn = (turnState) => turnState.interruptedByUser;
	buildSentAssistant = (flushed, conversationId, firstTimestamp) => {
		const msg = assistantResultToCollab(flushed.message, conversationId);
		if (firstTimestamp) msg.timestamp = firstTimestamp;
		msg.status = "sent";
		msg.finishTimeMs = Date.now();
		return msg;
	};
	buildHistorySentAssistant = (flushed, conversationId, firstTimestamp, finishTimeMs) => {
		const msg = assistantResultToCollab(flushed.message, conversationId);
		if (firstTimestamp) msg.timestamp = firstTimestamp;
		msg.status = "sent";
		if (finishTimeMs != null) msg.finishTimeMs = finishTimeMs;
		return msg;
	};
	defaultYield = () => new Promise((resolve) => {
		setTimeout(resolve, 0);
	});
	SandboxEpochTracker = class {
		constructor(initial) {
			this.anchor = initial;
		}
		/** 当前锚点（供调用方传递给下游，如 history → live）。 */
		get current() {
			return this.anchor;
		}
		/**
		* 记录帧的 sandboxEpoch 并判定该帧是否权威（应驱动 status 状态机）。
		*
		* 副作用：带 sandboxEpoch 的帧会更新 anchor（首次确立 / epoch 迁移）。
		*/
		observe(sandboxEpoch) {
			if (sandboxEpoch) {
				this.anchor = sandboxEpoch;
				return true;
			}
			return this.anchor === void 0;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/hooks/use-chat-messages/notification-stream/process-loop.ts
async function processNotificationLoop(stream, opts, callbacks, signal) {
	const { sessionId, conversationId, currentUser, members, logPrefix, seedAssistant, initialSandboxEpoch } = opts;
	const { setMessages, setIsStreaming, setStreamingMessageId, listRef, onToolCallCompleted, onOpenResultViewRequest, onTurnCompleted, onProgressUpdate, onError, onModeChanged, endTurnFallbackTimerRef, onEndTurnFallback, onLateFrameAfterTerminated, onFrameError } = callbacks;
	const accumulator = new ACPMessageAccumulator({ logPrefix });
	let currentAiMsgId;
	let firstStreamTimestamp;
	const openResultViewFiredToolCalls = /* @__PURE__ */ new Set();
	const planModeSyncedKeys = /* @__PURE__ */ new Set();
	const exitPlanModeToolCallIds = /* @__PURE__ */ new Set();
	const compactTracker = new CompactDividerTracker();
	let compactProgressActive = false;
	const claimedOptUserIds = /* @__PURE__ */ new Set();
	const seenUserMessageIds = /* @__PURE__ */ new Set();
	const epochTracker = new SandboxEpochTracker(initialSandboxEpoch);
	if (seedAssistant?.id) {
		accumulator.hydrateFromAssistantMessage(sessionId, seedAssistant);
		currentAiMsgId = seedAssistant.id;
		if (typeof seedAssistant.createTime === "number") firstStreamTimestamp = new Date(seedAssistant.createTime).toISOString();
	}
	console.warn(`[processNotificationLoop] ${logPrefix} live loop start`, seedAssistant?.id ? {
		replay: "seeded-from-history",
		seedMsgId: seedAssistant.id
	} : { replay: "fresh-accumulator" });
	/**
	* issue #44596：基于 session/endTurn 的精确 turn 结束判断。
	*
	* turn 状态（completedBeforeEndTurn / endTurnReceived / onTurnCompletedFired）
	* 挂在 MessageLinkedList 的 UserNode.turnState 上，随链表节点绑定，语义清晰。
	* 通过 listRef.current.getTurnState() / updateTurnState() 访问。
	*
	* endTurnSupported：全局标志，见到第一个 session_end_turn 后永久为 true，
	* 表示 sandbox-proxy 支持 endTurn 协议，不需要挂在某个 turn 上。
	*/
	let endTurnSupported = false;
	const END_TURN_FALLBACK_DELAY_MS = 5e3;
	/** 清理 endTurn fallback timer（如果有） */
	const clearEndTurnFallbackTimer = () => {
		if (endTurnFallbackTimerRef?.current !== null && endTurnFallbackTimerRef?.current !== void 0) {
			clearTimeout(endTurnFallbackTimerRef.current);
			endTurnFallbackTimerRef.current = null;
		}
	};
	/** 便捷访问当前 turn 状态（lastUserNode.turnState） */
	const ts = () => listRef.current?.getTurnState();
	const flushAssistant = () => {
		const flushed = accumulator.flush(sessionId);
		if (flushed && currentAiMsgId) {
			const finalMsg = buildSentAssistant(flushed, conversationId, firstStreamTimestamp);
			listRef.current.updateAssistant(finalMsg);
			setMessages(() => listRef.current.toArray());
		}
		firstStreamTimestamp = void 0;
	};
	const finalizeAssistant = (kind) => {
		if (kind !== "normal") accumulator.markPendingToolsAsFailed(sessionId, {
			stopReason: "cancelled",
			targetStatus: "cancelled"
		});
		flushAssistant();
		if (!currentAiMsgId) return;
		const list = listRef.current;
		const lastAssistant = list.getLastAssistant();
		if (kind === "failed") {
			if (lastAssistant && lastAssistant.status === "sending") {
				list.updateAssistant({
					...lastAssistant,
					status: "sent",
					isCancelled: true,
					finishTimeMs: Date.now()
				});
				setMessages(() => list.toArray());
			} else if (!lastAssistant) {
				list.setAssistant({
					id: currentAiMsgId,
					type: "assistant",
					sender: {
						id: "",
						name: "",
						role: "viewer"
					},
					content: "",
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					finishTimeMs: Date.now(),
					status: "sent",
					isCancelled: true,
					conversationId
				});
				setMessages(() => list.toArray());
			}
			return;
		}
		if (kind === "cancelled") {
			if (lastAssistant) list.updateAssistant({
				...lastAssistant,
				status: "sent",
				isCancelled: true,
				finishTimeMs: Date.now()
			});
			else list.setAssistant({
				id: currentAiMsgId,
				type: "assistant",
				sender: {
					id: "",
					name: "",
					role: "viewer"
				},
				content: "",
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				finishTimeMs: Date.now(),
				status: "sent",
				isCancelled: true,
				conversationId
			});
			setMessages(() => list.toArray());
			return;
		}
		if (lastAssistant && lastAssistant.status === "sending") {
			list.updateAssistant({
				...lastAssistant,
				status: "sent",
				finishTimeMs: Date.now()
			});
			setMessages(() => list.toArray());
		}
	};
	/**
	* Turn 终态的对外副作用：清 streaming 标志、灭 progress、触发 onTurnCompleted（每轮一次）。
	*
	* 4 个 turn 终态分支（session_end_turn / completed-fallback / failed/error）都要做这 4 件
	* 事，抽出来确保未来新增副作用（埋点、日志等）只改一处，且不会漏掉某个分支。
	*
	* onTurnCompletedFired 用 turnState 的字段记，跨多次进入同一 turn（理论上不该发生，
	* 但 endTurn + fallback completed 同时出现在旧版协议下可能两次进入）也只触发一次。
	*/
	const finalizeTurnSideEffects = () => {
		setIsStreaming(false);
		setStreamingMessageId(void 0);
		onProgressUpdate?.(null);
		if (!ts()?.onTurnCompletedFired) {
			listRef.current?.updateTurnState({ onTurnCompletedFired: true });
			onTurnCompleted?.();
		}
	};
	const _seenOffsets = /* @__PURE__ */ new Set();
	let _firstLiveLogged = false;
	for await (const notification of stream) {
		if (!_firstLiveLogged) {
			_firstLiveLogged = true;
			console.warn(`[processNotificationLoop] ${logPrefix} first live ACP notification`, { type: notification.update?.sessionUpdate ?? "unknown" });
		}
		const _offset = notification._meta?.["codebuddy.ai"]?.offset;
		const _isDuplicate = typeof _offset === "number" && _seenOffsets.has(_offset);
		if (typeof _offset === "number") _seenOffsets.add(_offset);
		if (_isDuplicate) {
			const _updateType = notification.update?.sessionUpdate ?? "unknown";
			console.warn(`[processNotificationLoop] ⚠️ DUPLICATE offset=${_offset} type=${_updateType} ${logPrefix} — 消息可能重复渲染！`);
		}
		if (signal?.cancelled) break;
		const updateType = getUpdateType(notification);
		try {
			const isHistoryReplay = (notification._meta?.["codebuddy.ai"])?.mode === "history";
			if (updateType === "current_mode_update" && onModeChanged) {
				const update = notification.update;
				if (update?.currentModeId) onModeChanged(update.currentModeId);
			}
			{
				const notifMeta = notification._meta;
				const updateMeta = notification.update?._meta;
				const nestedNotifCb = notifMeta?.["codebuddy.ai"];
				const nestedUpdateCb = updateMeta?.["codebuddy.ai"];
				const progress = notifMeta?.["codebuddy.ai/progress"] ?? updateMeta?.["codebuddy.ai/progress"] ?? nestedNotifCb?.progress ?? nestedUpdateCb?.progress;
				if (progress !== void 0) {
					onProgressUpdate?.(progress === null ? null : { type: progress.type });
					const progressType = typeof progress === "string" ? progress : progress && typeof progress === "object" ? progress.type : void 0;
					if ((progressType === "compacting" || typeof progressType === "string" && progressType.includes("Compacting context")) && !compactProgressActive) {
						compactProgressActive = true;
						flushAssistant();
						const ts = getMetaTimestamp(notification) ?? (/* @__PURE__ */ new Date()).toISOString();
						const dividerId = `msg-compact-progress-${conversationId}-${Date.now()}`;
						compactTracker.record(dividerId, "compacting");
						listRef.current.upsertSystem(buildCompactDividerCollabMessage({
							id: dividerId,
							conversationId,
							timestamp: ts,
							compactStatus: "compacting"
						}));
						setMessages(() => listRef.current.toArray());
					}
					if (progress === null || progress === void 0) {
						if (compactProgressActive) {
							compactProgressActive = false;
							const lastId = compactTracker.getLastDividerId();
							if (lastId) {
								const ts = getMetaTimestamp(notification) ?? (/* @__PURE__ */ new Date()).toISOString();
								listRef.current.upsertSystem(buildCompactDividerCollabMessage({
									id: lastId,
									conversationId,
									timestamp: ts,
									compactStatus: "completed"
								}));
								setMessages(() => listRef.current.toArray());
							}
						}
					}
				}
				const phase = notifMeta?.["codebuddy.ai/agentPhase"] ?? updateMeta?.["codebuddy.ai/agentPhase"] ?? nestedNotifCb?.agentPhase ?? nestedUpdateCb?.agentPhase;
				if (phase && typeof phase === "object") {
					const phaseObj = phase;
					if (phaseObj.phase === "idle") onProgressUpdate?.(null);
					else {
						let phaseType = `phase.${phaseObj.phase}`;
						if (phaseObj.phase === "tool_executing" && phaseObj.toolName) phaseType = `phase.tool_executing.${phaseObj.toolName}`;
						else if (phaseObj.phase === "model_streaming" && phaseObj.streamingToolName) phaseType = `phase.model_streaming.${phaseObj.streamingToolName}`;
						onProgressUpdate?.({ type: phaseType });
					}
				}
			}
			if (isCompactInternalNotification(notification)) {
				if (shouldSkipLivePreMessageAutoCompact(getCompactType(notification))) continue;
				if (updateType === "user_message_chunk") {
					flushAssistant();
					accumulator.clear(sessionId);
					currentAiMsgId = void 0;
					continue;
				}
				if (updateType === "agent_message_chunk" || updateType === "agent_thought_chunk") {
					if (!firstStreamTimestamp) firstStreamTimestamp = getMetaTimestamp(notification);
					const result = accumulator.handleUpdate(sessionId, notification);
					const timestamp = firstStreamTimestamp ?? getMetaTimestamp(notification) ?? (/* @__PURE__ */ new Date()).toISOString();
					const dividerMsg = createCompactDividerFromAssistant({
						tracker: compactTracker,
						rawMessageId: result.messageId || currentAiMsgId || `msg-compact-${conversationId}-${Date.now()}`,
						message: result.message,
						conversationId,
						timestamp
					});
					listRef.current.upsertSystem(dividerMsg);
					setMessages(() => listRef.current.toArray());
					if (classifyCompactFrameFromAssistant(result.message) !== "streaming") {
						accumulator.clear(sessionId);
						currentAiMsgId = void 0;
						setStreamingMessageId(void 0);
					}
					continue;
				}
				continue;
			}
			if (isUserNotification(notification)) {
				if (isCompactUserPromptNotification(notification)) {
					flushAssistant();
					accumulator.clear(sessionId);
					currentAiMsgId = void 0;
					continue;
				}
				clearEndTurnFallbackTimer();
				flushAssistant();
				const serverMessageId = extractMessageId(notification);
				const userMsg = buildUserMessage(notification, `msg-user-${conversationId}-${Date.now()}`, conversationId, currentUser, members);
				if (userMsg) {
					const existing = listRef.current.toArray();
					let isDuplicate = false;
					if (serverMessageId && seenUserMessageIds.has(serverMessageId)) isDuplicate = true;
					else if (userMsg.requestId && existing.some((m) => m.type === "member" && m.requestId === userMsg.requestId)) isDuplicate = true;
					else for (const m of existing) {
						if (m.type !== "member") continue;
						if (m.sender?.id !== userMsg.sender?.id) continue;
						if (typeof m.id === "string" && m.id.startsWith("msg-user-opt-") && !claimedOptUserIds.has(m.id)) {
							claimedOptUserIds.add(m.id);
							if (serverMessageId) seenUserMessageIds.add(serverMessageId);
							listRef.current.updateUser({
								...m,
								timestamp: userMsg.timestamp
							});
							setMessages(() => listRef.current.toArray());
							isDuplicate = true;
							break;
						}
						if (m.content === userMsg.content) {
							if (Math.abs(new Date(m.timestamp || 0).getTime() - new Date(userMsg.timestamp || 0).getTime()) < 3e3) {
								isDuplicate = true;
								break;
							}
						}
					}
					if (!isDuplicate) {
						listRef.current.appendUser(userMsg);
						setMessages(() => listRef.current.toArray());
						if (serverMessageId) seenUserMessageIds.add(serverMessageId);
					}
				}
				currentAiMsgId = `msg-ai-${conversationId}-${Date.now()}`;
				if (!isHistoryReplay) {
					setIsStreaming(true);
					setStreamingMessageId(currentAiMsgId);
				}
				continue;
			}
			if (updateType === "session_end_turn") {
				endTurnSupported = true;
				clearEndTurnFallbackTimer();
				listRef.current?.updateTurnState({ endTurnReceived: true });
				const turn = ts();
				const stopReason = ((notification.update?._meta)?.["codebuddy.ai"])?.stopReason;
				if (turn?.interruptedByUser || stopReason === "cancelled") finalizeAssistant("cancelled");
				else finalizeAssistant("normal");
				finalizeTurnSideEffects();
				continue;
			}
			if (updateType === "session_info_update") {
				const cbMeta = (notification.update?._meta)?.["codebuddy.ai"];
				if (cbMeta?.isSnapshot === true) continue;
				const sandboxEpoch = cbMeta?.sandboxEpoch;
				if (!epochTracker.observe(sandboxEpoch)) continue;
				const status = cbMeta?.status;
				if (status === "completed") {
					if (endTurnSupported) {
						const turn = ts();
						if (!turn?.endTurnReceived) {
							if (!turn?.completedBeforeEndTurn) {
								listRef.current?.updateTurnState({ completedBeforeEndTurn: true });
								finalizeAssistant("tools-cancelled");
							}
							if (endTurnFallbackTimerRef && endTurnFallbackTimerRef.current === null) endTurnFallbackTimerRef.current = setTimeout(() => {
								endTurnFallbackTimerRef.current = null;
								onEndTurnFallback?.({
									sessionId,
									fallbackDelayMs: END_TURN_FALLBACK_DELAY_MS
								});
								finalizeTurnSideEffects();
							}, END_TURN_FALLBACK_DELAY_MS);
						}
						continue;
					}
					listRef.current?.updateTurnState({ completedBeforeEndTurn: true });
					finalizeAssistant("tools-cancelled");
					finalizeTurnSideEffects();
					continue;
				}
				if (status === "failed" || status === "error") {
					const structuredErrorMsg = cbMeta?.error || cbMeta?.errorMessage || cbMeta?.reason || void 0;
					const errorCode = cbMeta?.code || cbMeta?.errorCode || void 0;
					const errorCategory = cbMeta?.category || (cbMeta?.data)?.category || void 0;
					if (status === "failed" && !structuredErrorMsg && !errorCode && !errorCategory) continue;
					clearEndTurnFallbackTimer();
					listRef.current?.updateTurnState({ completedBeforeEndTurn: true });
					finalizeAssistant("failed");
					const errorMsg = structuredErrorMsg || `Agent execution ${status}`;
					const notifCb = notification._meta?.["codebuddy.ai"];
					const requestId = notifCb?.requestId || cbMeta?.requestId || void 0;
					const traceId = notifCb?.traceId || cbMeta?.traceId || void 0;
					onError?.({
						message: errorMsg,
						code: errorCode,
						requestId,
						traceId,
						category: errorCategory
					});
					finalizeTurnSideEffects();
					continue;
				}
			}
			if (isLegacyUserAsAgentChunk(notification)) continue;
			if (!accumulator.isAccumulatableUpdate(updateType)) continue;
			if (updateType === "agent_message_chunk") {
				if ((notification.update?.content)?.text === "Interrupted by user") {
					listRef.current?.updateTurnState({ interruptedByUser: true });
					continue;
				}
				listRef.current?.updateTurnState({ hasAssistantContent: true });
			}
			{
				const terminatedTurn = ts();
				if (terminatedTurn && (terminatedTurn.endTurnReceived || terminatedTurn.completedBeforeEndTurn)) {
					const blocks = (listRef.current?.getLastAssistant())?.assistantContent;
					const priorAssistantLen = Array.isArray(blocks) ? blocks.filter((b) => b?.type === "text").map((b) => b.text ?? "").join("").length : 0;
					onLateFrameAfterTerminated?.({
						sessionId,
						updateType,
						offset: typeof _offset === "number" ? _offset : void 0,
						priorAssistantLen
					});
					continue;
				}
			}
			if (updateType === "tool_call" || updateType === "tool_call_update") {
				const update = notification.update;
				const status = update?.status;
				if (status === "completed" || status === "in_progress") onToolCallCompleted?.();
				if (onOpenResultViewRequest) {
					const toolName = (notification._meta?.["codebuddy.ai"] ?? {}).toolName ?? update?.title;
					if (toolName === "open_result_view") {
						const toolCallId = update?.toolCallId;
						const rawInput = update?.rawInput;
						const targetFile = rawInput?.target_file;
						if (toolCallId && targetFile && !openResultViewFiredToolCalls.has(toolCallId)) {
							openResultViewFiredToolCalls.add(toolCallId);
							onOpenResultViewRequest({
								targetFile,
								explanation: rawInput?.explanation,
								viewType: rawInput?.view_type
							});
						}
					} else if (toolName === "present_files") {
						const toolCallId = update?.toolCallId;
						const rawInput = update?.rawInput;
						const files = rawInput?.files;
						if (toolCallId && Array.isArray(files) && !openResultViewFiredToolCalls.has(toolCallId)) {
							const firstLocal = files.find((f) => {
								if (typeof f !== "string") return false;
								const trimmed = f.trim();
								if (!trimmed) return false;
								if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return false;
								if (trimmed.startsWith("file://")) return false;
								return true;
							});
							if (firstLocal) {
								openResultViewFiredToolCalls.add(toolCallId);
								onOpenResultViewRequest({
									targetFile: firstLocal,
									explanation: rawInput?.explanation,
									viewType: void 0
								});
							}
						}
					}
				}
				if (onModeChanged) {
					const cbMeta = notification._meta?.["codebuddy.ai"] ?? {};
					const planToolName = (cbMeta.toolName ?? update?.title ?? "").toLowerCase();
					const toolCallId = update?.toolCallId ?? cbMeta.parentToolUseId;
					if (toolCallId && (planToolName === "enterplanmode" || planToolName === "enter_plan_mode")) {
						const key = `${toolCallId}:plan`;
						if (!planModeSyncedKeys.has(key)) {
							planModeSyncedKeys.add(key);
							onModeChanged("plan");
						}
					} else if (toolCallId && (planToolName === "exitplanmode" || planToolName === "exit_plan_mode")) exitPlanModeToolCallIds.add(toolCallId);
					if (toolCallId && status === "completed" && exitPlanModeToolCallIds.has(toolCallId)) {
						const key = `${toolCallId}:craft`;
						if (!planModeSyncedKeys.has(key)) {
							planModeSyncedKeys.add(key);
							onModeChanged("bypassPermissions");
						}
					}
				}
			}
			if (!firstStreamTimestamp) firstStreamTimestamp = getMetaTimestamp(notification);
			if (!isHistoryReplay) setIsStreaming(true);
			const result = accumulator.handleUpdate(sessionId, notification);
			const aiMsg = result.message;
			const msgId = result.messageId || currentAiMsgId || `msg-ai-${conversationId}-${Date.now()}`;
			currentAiMsgId = msgId;
			setStreamingMessageId(msgId);
			const collabMsg = assistantResultToCollab(aiMsg, conversationId);
			collabMsg.id = msgId;
			collabMsg.status = "sending";
			if (firstStreamTimestamp) collabMsg.timestamp = firstStreamTimestamp;
			listRef.current.updateAssistant(collabMsg);
			setMessages(() => listRef.current.toArray());
		} catch (frameError) {
			onFrameError?.({
				sessionId,
				updateType,
				offset: typeof _offset === "number" ? _offset : void 0,
				message: String(frameError?.message ?? frameError)
			});
			continue;
		}
	}
	clearEndTurnFallbackTimer();
	flushAssistant();
}
var init_process_loop = __esmMin((() => {
	init_acp_message_accumulator();
	init_chat_message_utils();
	init_compact_divider_utils();
	init_helpers();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/hooks/use-chat-messages/notification-stream/process-history.ts
/**
* 从 notification `_meta.timestamp`（ISO string）取毫秒时间戳，非法时返回 undefined。
* 用于把历史终态帧（session_end_turn / completed / failed）的真实完成时刻沉淀成
* assistant `finishTimeMs`，供 conversation-render 计算精确耗时（issue #59036 续报）。
*/
function getNotifFinishTimeMs(notification) {
	const iso = getMetaTimestamp(notification);
	if (!iso) return;
	const ms = new Date(iso).getTime();
	return Number.isFinite(ms) ? ms : void 0;
}
/**
* Process a raw ACP notification stream into CollabMessage[].
* User notifications become 'member' messages; assistant notifications are accumulated
* via ACPMessageAccumulator into 'assistant' messages with full content blocks.
*/
async function processNotificationStream(notifications, sessionId, conversationId, currentUser, members, options = {}) {
	const { chunkSize = 200, signal, yieldImpl = defaultYield } = options;
	const accumulator = new ACPMessageAccumulator({ logPrefix: "[useChatMessages:history]" });
	const list = new MessageLinkedList();
	const compactTracker = new CompactDividerTracker();
	let compactProgressActive = false;
	let userIndex = 0;
	let firstAssistantTimestamp;
	let currentTurnFinishTimeMs;
	let pendingAssistantSnapshot;
	const epochTracker = new SandboxEpochTracker();
	const flushCancelledTurn = () => {
		const turnState = list.getTurnState();
		const lastUserNode = list.getLastUserNode();
		if (!lastUserNode || !turnState) return;
		if (turnState.hasAssistantContent) {
			accumulator.markPendingToolsAsFailed(sessionId, {
				stopReason: "cancelled",
				targetStatus: "cancelled"
			});
			const flushed = accumulator.flushAndReset(sessionId);
			if (flushed) {
				const msg = buildHistorySentAssistant(flushed, conversationId, firstAssistantTimestamp, currentTurnFinishTimeMs);
				msg.isCancelled = true;
				list.setAssistant(msg);
			}
		} else list.setAssistant({
			id: `msg-ai-cancelled-${lastUserNode.message.id}`,
			type: "assistant",
			sender: {
				id: "",
				name: "",
				role: "viewer"
			},
			content: "",
			timestamp: lastUserNode.message.timestamp,
			status: "sent",
			isCancelled: true,
			conversationId
		});
		firstAssistantTimestamp = void 0;
		currentTurnFinishTimeMs = void 0;
	};
	let processed = 0;
	for (const notification of notifications) {
		if (chunkSize > 0 && processed > 0 && processed % chunkSize === 0) {
			await yieldImpl();
			if (signal?.cancelled) break;
		}
		if (signal?.cancelled) break;
		processed++;
		const isFromCliResume = (notification._meta?.["codebuddy.ai"])?.isFromCliResume === true;
		if (isUserNotification(notification)) {
			if (isCompactUserPromptNotification(notification)) {
				const flushed = accumulator.flush(sessionId);
				if (flushed) list.setAssistant(buildHistorySentAssistant(flushed, conversationId, firstAssistantTimestamp, currentTurnFinishTimeMs));
				firstAssistantTimestamp = void 0;
				currentTurnFinishTimeMs = void 0;
				accumulator.clear(sessionId);
				continue;
			}
			const turnState = list.getTurnState();
			if (turnState) if (!isCancelledTurn(turnState)) {
				const flushed = accumulator.flushAndReset(sessionId);
				if (flushed) {
					cancelAllPendingToolCalls(flushed.message);
					list.setAssistant(buildHistorySentAssistant(flushed, conversationId, firstAssistantTimestamp, currentTurnFinishTimeMs));
				}
				firstAssistantTimestamp = void 0;
				currentTurnFinishTimeMs = void 0;
			} else flushCancelledTurn();
			const userMsg = buildUserMessage(notification, extractMessageId(notification) || `msg-history-user-${userIndex++}`, conversationId, currentUser, members);
			if (userMsg) list.appendUser(userMsg);
		} else {
			const updateType = getUpdateType(notification);
			if (isLegacyUserAsAgentChunk(notification)) continue;
			{
				const notifMeta = notification._meta;
				const nestedNotifCb = notifMeta?.["codebuddy.ai"];
				const progressVal = notifMeta?.["codebuddy.ai/progress"] ?? nestedNotifCb?.progress;
				if (progressVal !== void 0) {
					const progressType = typeof progressVal === "string" ? progressVal : progressVal && typeof progressVal === "object" ? progressVal.type : void 0;
					if ((progressType === "compacting" || typeof progressType === "string" && progressType.includes("Compacting context")) && !compactProgressActive) {
						compactProgressActive = true;
						const flushed = accumulator.flushAndReset(sessionId);
						if (flushed) list.setAssistant(buildHistorySentAssistant(flushed, conversationId, firstAssistantTimestamp, currentTurnFinishTimeMs));
						firstAssistantTimestamp = void 0;
						currentTurnFinishTimeMs = void 0;
						const ts = getMetaTimestamp(notification) ?? (/* @__PURE__ */ new Date()).toISOString();
						const dividerId = `msg-compact-progress-${conversationId}-${Date.now()}-${processed}`;
						compactTracker.record(dividerId, "compacting");
						list.upsertSystem(buildCompactDividerCollabMessage({
							id: dividerId,
							conversationId,
							timestamp: ts,
							compactStatus: "compacting"
						}));
					}
					if (progressVal === null || progressVal === void 0) {
						if (compactProgressActive) {
							compactProgressActive = false;
							const lastId = compactTracker.getLastDividerId();
							if (lastId) {
								const ts = getMetaTimestamp(notification) ?? (/* @__PURE__ */ new Date()).toISOString();
								list.upsertSystem(buildCompactDividerCollabMessage({
									id: lastId,
									conversationId,
									timestamp: ts,
									compactStatus: "completed"
								}));
							}
						}
					}
				}
			}
			if (isCompactInternalNotification(notification)) {
				if (getCompactType(notification) === CompactType.PRE_MESSAGE_AUTO) continue;
				if (updateType === "user_message_chunk") {
					const flushed = accumulator.flush(sessionId);
					if (flushed) list.setAssistant(buildHistorySentAssistant(flushed, conversationId, firstAssistantTimestamp, currentTurnFinishTimeMs));
					firstAssistantTimestamp = void 0;
					currentTurnFinishTimeMs = void 0;
					accumulator.clear(sessionId);
					continue;
				}
				if (updateType === "agent_message_chunk" || updateType === "agent_thought_chunk") {
					const result = accumulator.handleUpdate(sessionId, notification);
					const timestamp = firstAssistantTimestamp ?? getMetaTimestamp(notification) ?? (/* @__PURE__ */ new Date()).toISOString();
					const dividerMsg = createCompactDividerFromAssistant({
						tracker: compactTracker,
						rawMessageId: result.messageId || `msg-compact-${conversationId}-${Date.now()}`,
						message: result.message,
						conversationId,
						timestamp
					});
					list.upsertSystem(dividerMsg);
					if (classifyCompactFrameFromAssistant(result.message) !== "streaming") accumulator.clear(sessionId);
					continue;
				}
				continue;
			}
			if (isFromCliResume) list.updateTurnState({ fromCliResume: true });
			if (updateType === "session_end_turn") {
				list.updateTurnState({ endTurnReceived: true });
				currentTurnFinishTimeMs = getNotifFinishTimeMs(notification) ?? currentTurnFinishTimeMs;
				continue;
			}
			if (accumulator.isAccumulatableUpdate(updateType)) {
				if (!list.getTurnState()?.hasAssistantContent) firstAssistantTimestamp = firstAssistantTimestamp ?? getMetaTimestamp(notification);
				const chunkText = notification.update?.content;
				if (chunkText?.type === "text" && typeof chunkText.text === "string" && chunkText.text.includes("Interrupted by user")) {
					list.updateTurnState({ interruptedByUser: true });
					continue;
				}
				accumulator.handleUpdate(sessionId, notification);
				list.updateTurnState({ hasAssistantContent: true });
			} else if (updateType === "session_info_update") {
				const cbMeta = (notification.update?._meta)?.["codebuddy.ai"];
				if (cbMeta?.isSnapshot === true) continue;
				const sandboxEpoch = cbMeta?.sandboxEpoch;
				if (!epochTracker.observe(sandboxEpoch)) continue;
				const status = cbMeta?.status;
				if (status === "completed" || status === "failed") {
					if (!list.getTurnState()?.endTurnReceived) {
						if (status === "failed") list.updateTurnState({
							completedBeforeEndTurn: true,
							failedBeforeEndTurn: true
						});
						else list.updateTurnState({ completedBeforeEndTurn: true });
						currentTurnFinishTimeMs = getNotifFinishTimeMs(notification) ?? currentTurnFinishTimeMs;
					}
				}
			}
		}
	}
	let lastAssistantMessageId;
	const finalTurnState = list.getTurnState();
	const finalTurnTerminated = isTurnTerminated(finalTurnState);
	if (finalTurnState && isCancelledTurn(finalTurnState) && finalTurnTerminated) flushCancelledTurn();
	else if (finalTurnState && !isCancelledTurn(finalTurnState) && finalTurnState.hasAssistantContent) {
		const snapshot = finalTurnTerminated ? accumulator.flush(sessionId) : accumulator.peek(sessionId);
		if (snapshot) {
			if (finalTurnTerminated) {
				const finalMessage = snapshot.message;
				cancelAllPendingToolCalls(finalMessage, { preserveInteractiveQuestions: finalTurnState?.fromCliResume === true || !finalTurnState?.failedBeforeEndTurn && hasPendingInteractiveQuestion(finalMessage) });
			}
			const msg = assistantResultToCollab(snapshot.message, conversationId);
			if (firstAssistantTimestamp) msg.timestamp = firstAssistantTimestamp;
			if (finalTurnTerminated && currentTurnFinishTimeMs != null) msg.finishTimeMs = currentTurnFinishTimeMs;
			list.setAssistant(msg);
			lastAssistantMessageId = msg.id;
			if (!finalTurnTerminated) pendingAssistantSnapshot = snapshot.message;
		}
	}
	return {
		messages: list.toArray(),
		lastAssistantMessageId,
		sessionTerminated: finalTurnTerminated,
		pendingAssistantSnapshot,
		sandboxEpochAnchor: epochTracker.current
	};
}
/**
* Runtime type guard: 判定 content block 是否为 tool-call 类型。
*
* message.content 是跨 SDK 边界的 payload（history replay），不能仅靠 TS 的
* discriminated union narrowing 假定结构完整——运行时 block 可能缺少 tool 字段、
* tool 为 null、或 name/status 类型异常。这里补充运行时校验：
* - block.type === 'tool-call'（判别字段）
* - 'tool' in block 且 tool 为非空对象（结构字段）
* - typeof tool.name === 'string'（必需字段，后续 isInteractiveQuestionTool 依赖）
*
* 注意：tool.status 允许为 undefined（PENDING_STATUSES 已包含 undefined，
* 代表"未初始化"的合法 pending 工具），因此不做 typeof === 'string' 校验，
* 避免误过滤交互类问题工具导致 #61152 / #61460 回归。
*/
function isToolCallBlock(block) {
	if (block.type !== "tool-call") return false;
	if (!("tool" in block) || !block.tool || typeof block.tool !== "object") return false;
	return typeof block.tool.name === "string";
}
/**
* issue #52049 / #52151：将 assistant message 中所有仍处于 pending/in_progress 状态的
* tool_call 标记为 cancelled。
*
* 场景：历史回放中 session 已终止（completed/failed），末轮有未完成的 tool_call
* （如 Agent/Task 仍在运行、或其他工具被用户消息打断）。session 已结束不可能再处理
* 这些 tool，继续显示交互态/进行中卡片会误导用户。标记 cancelled 后，renderer 会
* 显示"已取消"中性提示。
*
* issue #61152 / #61460：CLI --resume 回放导致的 session 终止兜底中，AskUserQuestion
* 等交互类问题工具例外。它们的 pending 是等用户输入的合法状态，跨 session 恢复后
* 仍应保持等待，否则重进任务页时 picker 会被错误取消、侧栏"待确认"无法清除。
*/
function cancelAllPendingToolCalls(message, options) {
	if (!message.content || !Array.isArray(message.content)) return;
	const preserveInteractive = options?.preserveInteractiveQuestions ?? false;
	for (const block of message.content) {
		if (!isToolCallBlock(block)) continue;
		const tool = block.tool;
		if (preserveInteractive && isInteractiveQuestionTool(tool.name)) continue;
		if (PENDING_STATUSES.has(tool.status)) {
			tool.status = TOOL_STATUS_CANCELLED;
			tool.ready = true;
			if (!tool.metaData) tool.metaData = {};
			tool.metaData.cancelledBySessionExpiry = true;
		}
	}
}
/**
* issue #61460：检测末轮 assistant message 是否含有仍处于 pending 的交互类问题工具。
*
* 末轮终止兜底（endTurn+completed 或 CLI --resume）时，若末轮仍有 pending 的
* AskUserQuestion / ask_followup_question / pick_location，说明 Agent 已把问题抛出、
* 正等用户回答——这是"等待输入"的合法长态，不应被强制 cancelled。
* 用户退出任务页重进 / 换设备查看时，应继续看到等待回答的问题而非"已取消"。
*/
function hasPendingInteractiveQuestion(message) {
	if (!message.content || !Array.isArray(message.content)) return false;
	for (const block of message.content) {
		if (!isToolCallBlock(block)) continue;
		const tool = block.tool;
		if (isInteractiveQuestionTool(tool.name) && PENDING_STATUSES.has(tool.status)) return true;
	}
	return false;
}
var TOOL_STATUS_CANCELLED, PENDING_STATUSES;
var init_process_history = __esmMin((() => {
	init_acp_message_accumulator();
	init_interactive_question_tools();
	init_chat_message_utils();
	init_compact_divider_utils();
	init_message_linked_list();
	init_helpers();
	TOOL_STATUS_CANCELLED = "cancelled";
	PENDING_STATUSES = new Set([
		"stream_executing",
		"in_progress",
		"pending",
		void 0
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/hooks/use-chat-messages/notification-stream/index.ts
var init_notification_stream = __esmMin((() => {
	init_process_loop();
	init_process_history();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/hooks/use-chat-messages/process-notification-loop.ts
var init_process_notification_loop = __esmMin((() => {
	init_notification_stream();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/utils/chat-message-utils.ts
/**
* 发送侧：在 blocks 中第一个 text block 的 text 前面拼上 uid marker。
* 例：`"我爱你"` → `"<user_message uid="xxx"/>我爱你"`
*/
function injectUserIdMarker(blocks, uid) {
	if (!uid) return blocks;
	const marker = `<user_message uid="${uid}"/>`;
	const result = [...blocks];
	for (let i = 0; i < result.length; i++) if (result[i].type === "text" && result[i].text) {
		result[i] = {
			...result[i],
			text: marker + result[i].text
		};
		return result;
	}
	return [{
		type: "text",
		text: marker
	}, ...blocks];
}
/**
* 接收侧：从 text 中提取 `<user_message uid="xxx"/>` 的 uid。
* 返回 uid 或 undefined（无匹配时 fallback 到老协议 turnSenderUserId）。
*/
function extractUserIdFromMarker(text) {
	const match = text.match(USER_ID_MARKER_REGEX);
	return match ? match[1] : void 0;
}
/**
* 从 text 中剥离所有 `<user_message uid="xxx"/>` marker（不显示在 UI 中）。
* 使用全局正则确保即使重复注入（如 sandbox-proxy 回推历史时叠加）也能全部清除。
*/
function stripUserIdMarker(text) {
	return text.replace(USER_ID_MARKER_REGEX_GLOBAL, "").trim();
}
/** Extract sessionUpdate type from a raw ACP notification. */
function getUpdateType(notification) {
	return notification.update?.sessionUpdate ?? "";
}
/** Extract text from a notification's content field. Filters out local command stdout. */
function getTextContent(notification) {
	const content = notification.update?.content;
	if (content?.type !== "text") return;
	const text = content.text || void 0;
	if (text && /^\s*<local-command-stdout>/.test(text)) return;
	return text;
}
/**
* Extract original content blocks from notification _meta.
* ACP 回推的 user_message_chunk 在 `_meta.codebuddy.ai.extra.sourceContentBlocks`
* 里携带了完整的原始输入（包括 image / text 等），用于在 UI 回显图片等非文本内容。
*/
function getSourceContentBlocks(notification) {
	const blocks = ((notification._meta?.["codebuddy.ai"])?.extra)?.sourceContentBlocks;
	return blocks && blocks.length > 0 ? blocks : void 0;
}
/** Extract server-side timestamp from notification _meta.timestamp (ISO string). */
function getMetaTimestamp(notification) {
	const meta = notification._meta;
	return typeof meta?.timestamp === "string" ? meta.timestamp : void 0;
}
/**
* Check whether a notification represents a user message.
* Only user_message / user_message_chunk are considered user messages.
*/
function isUserNotification(notification) {
	const type = getUpdateType(notification);
	return type === "user_message" || type === "user_message_chunk";
}
/**
* 检测旧协议中后端用 agent_message_chunk + turnSenderUserId 伪装的用户消息。
* 新协议下这种消息不应该再出现，遇到时应直接丢弃（不累积到 assistant 消息中）。
*/
function isLegacyUserAsAgentChunk(notification) {
	if (getUpdateType(notification) !== "agent_message_chunk") return false;
	return !!(notification._meta?.["codebuddy.ai"])?.turnSenderUserId;
}
/** Extract messageId from notification _meta['codebuddy.ai'] or update.messageId. */
function extractMessageId(notification) {
	const update = notification.update;
	if (typeof update?.messageId === "string" && update.messageId) return update.messageId;
	return (notification._meta?.["codebuddy.ai"])?.messageId;
}
/**
* 将 sourceContentBlocks 转换为展示用的 ContentBlock[]（纯展示，不改动原始数据）。
*
* 处理规则（按 block 类型）：
* - `resource_link`：直接保留（新消息走 displayBlocks 机制，chip 已在其中）
* - `image`：直接保留
* - `text` 含 `<ticket-context>`：提取 reference-suggestions 中的 todo 标题，
*   转为 resource_link chip 前插（旧会话降级兜底），原 ticket-context XML 被 strip 掉
* - `text` 其他：剥离 system-reminder / project-instructions / user_message marker 后保留；
*   清空则过滤掉
*/
function convertSourceBlocksForDisplay(blocks) {
	const result = [];
	for (const block of blocks) {
		const type = block.type;
		if (type === "resource_link" || type === "image") {
			result.push(block);
			continue;
		}
		if (type === "text") {
			const raw = block.text || "";
			const blockMeta = block._meta;
			const bareTodoMatch = !blockMeta?.agentserverResourceType ? raw.match(/^@todo:(\S+)[ \t]*(.*)$/) : null;
			if (blockMeta?.agentserverResourceType === "todo" || bareTodoMatch) {
				const resourceValue = blockMeta?.agentserverResourceValue;
				const todoId = resourceValue?.todoId ?? bareTodoMatch?.[1];
				const projectId = resourceValue?.projectId;
				const displayName = (bareTodoMatch ? bareTodoMatch[2]?.trim() : raw.replace(/^@todo:[^\s]+\s*/, "").trim()) || todoId || "";
				result.push(createPhraseBlock(displayName, `todo://${todoId || displayName}`, {
					icon: "docs",
					meta: {
						mentionType: "todo",
						displayText: displayName,
						todoId,
						projectId
					}
				}));
				continue;
			}
			const bareMsgQuotedMatch = raw.match(/^@msg:([^"·]+?)·?"((?:\\.|[^"\\])*)"\s*$/);
			const bareMsgAuthorOnlyMatch = !bareMsgQuotedMatch ? raw.match(/^@msg:(.+)$/) : null;
			if (bareMsgQuotedMatch || bareMsgAuthorOnlyMatch) {
				const author = (bareMsgQuotedMatch?.[1] ?? bareMsgAuthorOnlyMatch?.[1] ?? "").trim();
				const snippet = (bareMsgQuotedMatch?.[2] ? bareMsgQuotedMatch[2].replace(/\\(["\\])/g, "$1") : "").trim();
				const displayName = author ? `${author}的留言` : "留言";
				result.push(createPhraseBlock(displayName, buildMessageUri({ messageId: "" }), {
					icon: "message",
					meta: {
						mentionType: MESSAGE_REFERENCE_MENTION_TYPE,
						displayText: displayName,
						messageId: "",
						author,
						snippet
					}
				}));
				continue;
			}
			if (raw.includes("<ticket-context>")) {
				const titles = extractTodoTitlesFromTicketContext(raw);
				for (const title of titles) result.push(createPhraseBlock(title, `todo://${title}`, {
					icon: "docs",
					meta: {
						mentionType: "todo",
						displayText: title
					}
				}));
				const cleaned = stripInjectedContext(stripUserIdMarker(raw));
				if (cleaned) result.push({
					...block,
					text: cleaned
				});
				continue;
			}
			if ((raw.includes("data-role=\"additional-data\"") || raw.includes("data-role=\"user-content\"")) && (raw.includes("<todo-reference>") || raw.includes("<reference-suggestions>"))) {
				const titles = extractTodoTitlesFromTicketContext(raw);
				for (const title of titles) result.push(createPhraseBlock(title, `todo://${title}`, {
					icon: "docs",
					meta: {
						mentionType: "todo",
						displayText: title
					}
				}));
				continue;
			}
			if (/^\n+$/.test(raw)) {
				result.push(block);
				continue;
			}
			const cleaned = stripInjectedContext(stripUserIdMarker(raw));
			if (cleaned) {
				const decoded = decodeInputTextToAcpContentBlocks(cleaned);
				if (decoded && decoded.length > 0 && decoded.some((b) => b.type === "resource_link")) {
					const filtered = decoded.map((b) => {
						if (b.type === "resource_link" && typeof b.uri === "string" && b.uri.startsWith("file://")) return {
							type: "text",
							text: `@${b.name || ""}`
						};
						return b;
					});
					result.push(...filtered);
				} else result.push({
					...block,
					text: cleaned
				});
			}
			continue;
		}
		result.push(block);
	}
	return result;
}
/** Build a user CollabMessage from a raw notification. */
function buildUserMessage(notification, id, conversationId, currentUser, members) {
	const text = getTextContent(notification);
	const rawContentBlocks = getSourceContentBlocks(notification);
	if (!text && !rawContentBlocks) return null;
	let markerUid = text ? extractUserIdFromMarker(text) : void 0;
	if (!markerUid && rawContentBlocks) {
		for (const block of rawContentBlocks) if (block.type === "text") {
			const uid = extractUserIdFromMarker(block.text || "");
			if (uid) {
				markerUid = uid;
				break;
			}
		}
	}
	const displayText = text ? stripInjectedContext(stripUserIdMarker(text)) : "";
	const contentBlocks = rawContentBlocks ? convertSourceBlocksForDisplay(rawContentBlocks) : void 0;
	const hasBlocks = contentBlocks && contentBlocks.length > 0;
	if (!displayText && !hasBlocks) return null;
	const senderId = markerUid;
	let sender;
	if (!senderId || senderId === currentUser.id) sender = currentUser;
	else sender = members.find((m) => m.id === senderId) ?? {
		id: senderId,
		name: senderId,
		role: "viewer"
	};
	return {
		id,
		type: "member",
		sender,
		content: displayText,
		contentBlocks: hasBlocks ? contentBlocks : void 0,
		timestamp: getMetaTimestamp(notification) || (/* @__PURE__ */ new Date()).toISOString(),
		status: "sent",
		conversationId
	};
}
/** Convert an AssistantMessage from the accumulator to a CollabMessage. */
function assistantResultToCollab(msg, conversationId) {
	return {
		id: msg.id,
		type: "assistant",
		sender: null,
		content: "",
		assistantContent: msg.content,
		timestamp: new Date(msg.createTime).toISOString(),
		status: msg.complete ? "sent" : "sending",
		requestId: msg.requestId,
		conversationId
	};
}
/** 把 work-summary 片段拼成完整 `<work-summary>` XML（空数组返回空串）。 */
function formatWorkSummaryXml(parts) {
	if (!parts || parts.length === 0) return "";
	return `<work-summary>\n${WORK_SUMMARY_HEADER}\n\n${parts.join("\n")}\n</work-summary>`;
}
/**
* 把结构化 todo 引用拼成 `<todo-reference>` XML（Teams 上下文策略 §11.1）。
*
* - 每个 entry 输出为 `<todo id="..." title="..." />`（无 suggestions）或
*   `<todo id title><suggestions>...</suggestions></todo>`（有 suggestions）；
* - suggestions 内容按自然语言原文写入（保持换行），XML 敏感字符会被转义避免破坏结构；
* - 空数组返回空串（不产出空 `<todo-reference>` 外壳）。
*/
function formatTodoReferenceXml(entries) {
	if (!entries || entries.length === 0) return "";
	const lines = ["<todo-reference>", TODO_REFERENCE_HEADER];
	for (const e of entries) {
		const id = escapeXmlAttr(e.todoId);
		const title = escapeXmlAttr(e.title);
		const suggestions = (e.suggestions ?? "").trim();
		if (suggestions) {
			lines.push(`<todo id="${id}" title="${title}">`);
			lines.push("  <suggestions>");
			lines.push(`  ${escapeXmlText(suggestions)}`);
			lines.push("  </suggestions>");
			lines.push("</todo>");
		} else lines.push(`<todo id="${id}" title="${title}" />`);
	}
	lines.push("</todo-reference>");
	return lines.join("\n");
}
/**
* 把本轮 @todo 引用关联的网盘附件拼成 `<tdrive_attachments>` XML（Teams 上下文策略 §4.2）。
*
* 对齐旧后端 `msgresolve/resolver.go::formatTodoContext` 的
* `<file id="{ExternalID}" title="{Name}" item_type="file" />` 形态。空数组返回空串
* （调用方跳过 additional-data 里的该段）。
*/
function formatTdriveAttachmentsXml(entries) {
	if (!entries || entries.length === 0) return "";
	const lines = ["<tdrive_attachments>", TDRIVE_ATTACHMENTS_HEADER];
	for (const e of entries) lines.push(`<file id="${escapeXmlAttr(e.id)}" title="${escapeXmlAttr(e.title)}" item_type="file" />`);
	lines.push("</tdrive_attachments>");
	return lines.join("\n");
}
/** XML 属性转义。 */
function escapeXmlAttr(s) {
	return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
/** XML 文本内容转义（不转 `"` 因为不在属性里）。 */
function escapeXmlText(s) {
	return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/**
* 前端本地拼装 `<message-reference>` XML（Teams 上下文策略 §12.1 · issue #69878 post-W+）。
*
* 与 daemon `additional-data-section.ts::renderMessageReferenceXml` 结构等价（一套逻辑
* 两边落地）：`<message-reference>` 容器 + 每条被引用留言一行自闭合 `<message id author snippet />`。
* `id` 属性优先取 replyId（被 @ 主体的稳定唯一键 —— `project_message_show` 入参），
* 缺失时回落 messageId；author / snippet 缺失时对应属性整体缺席。
*
* (messageId, replyId) 组合去重：允许同一 thread 内顶层 + 回复各出一行，与 chip
* 数一致；纯重复的 chip 则合并。
*
* 空输入返回空串（调用方跳过 additional-data 段注入）。
*/
function renderMessageReferenceXml(entries) {
	if (!entries || entries.length === 0) return "";
	const seen = /* @__PURE__ */ new Set();
	const uniq = [];
	for (const e of entries) {
		const messageId = typeof e.messageId === "string" ? e.messageId.trim() : "";
		if (!messageId) continue;
		const key = `${messageId}\u0000${e.replyId ?? ""}`;
		if (seen.has(key)) continue;
		seen.add(key);
		uniq.push(e);
	}
	if (uniq.length === 0) return "";
	const lines = ["<message-reference>", MESSAGE_REFERENCE_HEADER];
	for (const entry of uniq) {
		const attrs = [`id="${escapeXmlAttr((entry.replyId ?? "").trim() || entry.messageId)}"`];
		const author = (entry.author ?? "").trim();
		if (author) attrs.push(`author="${escapeXmlAttr(author)}"`);
		const snippet = (entry.snippet ?? "").trim();
		if (snippet) attrs.push(`snippet="${escapeXmlAttr(snippet)}"`);
		lines.push(`<message ${attrs.join(" ")} />`);
	}
	lines.push("</message-reference>");
	return lines.join("\n");
}
/**
* 从 blocks 中抽取 todo 引用的结构化上下文（Teams 上下文策略 §11）。
* 不拼任何外层 XML —— 由 `formatWorkSummaryXml` / `formatTodoReferenceXml` 二次拼装。
* 网盘文件等非 todo 的 resource_link 保持原样进 remainingBlocks。
*/
function extractTodoContext(blocks) {
	const workSummaryParts = [];
	const todoReferences = [];
	const remainingBlocks = [];
	const todoDisplayNames = [];
	const extractedTagsSet = /* @__PURE__ */ new Set();
	for (const block of blocks) if (block.type === "resource_link") {
		const meta = block._meta;
		if (meta?.mentionType === "todo") {
			const todoTitle = meta?.todoTitle || block.name || "";
			const suggestions = meta?.todoSuggestions || meta?.todoSummary || "";
			const workSummary = meta?.workSummary || "";
			const todoId = meta?.todoId || parseTodoIdFromUri(block.uri) || todoTitle;
			if (todoTitle) todoDisplayNames.push(todoTitle);
			if (workSummary) workSummaryParts.push(workSummary);
			if (todoId && todoTitle) todoReferences.push({
				todoId,
				title: todoTitle,
				suggestions: suggestions || void 0
			});
			const todoTags = meta?.todoTags;
			if (Array.isArray(todoTags)) for (const tag of todoTags) {
				if (!tag) continue;
				const colonIdx = tag.indexOf(":");
				if (colonIdx > 0 && CONVERSATION_TAG_KEYS.has(tag.slice(0, colonIdx))) extractedTagsSet.add(tag);
			}
		} else remainingBlocks.push(block);
	} else remainingBlocks.push(block);
	return {
		workSummaryParts,
		todoReferences,
		remainingBlocks,
		todoDisplayNames,
		extractedTags: [...extractedTagsSet]
	};
}
/** 从 `todo://<id>` uri 中解析 todo id（兜底路径）。 */
function parseTodoIdFromUri(uri) {
	if (!uri || !uri.startsWith("todo://")) return;
	return uri.slice(7).split(/[?#]/, 1)[0]?.trim() || void 0;
}
/**
* 从 blocks 中抽取 @msg 引用的结构化上下文（Teams 上下文策略 §12）。
*
* 产出扁平 chip 原始条目 `entries`，供前端 `renderMessageReferenceXml` 本地拼
* `<message-reference>` XML（issue #69878 · post-W+ · §12.1 自闭合三属性形态）。
* 归并 / thread 结构由 `project_message_show` 返回体承担，本函数只做无副作用的
* "抽 chip → 扁平条目" 转换，不做去重、也不做顶层/回复的桶合并。
*/
function extractMessageReferences(blocks) {
	const entries = [];
	const remainingBlocks = [];
	const messageDisplayNames = [];
	const seenDisplayKeys = /* @__PURE__ */ new Set();
	for (const block of blocks) {
		if (block.type === "resource_link") {
			const meta = block._meta;
			if (meta?.mentionType === "message") {
				const messageId = meta?.messageId;
				const author = meta?.author;
				if (messageId && author) {
					const replyId = meta?.replyId;
					entries.push({
						messageId,
						replyId,
						author,
						snippet: meta?.snippet ?? ""
					});
					const dedupKey = `${messageId}\u0000${replyId ?? ""}`;
					if (!seenDisplayKeys.has(dedupKey)) {
						seenDisplayKeys.add(dedupKey);
						messageDisplayNames.push(`${author}的留言`);
					}
					continue;
				}
			}
		}
		remainingBlocks.push(block);
	}
	return {
		entries,
		remainingBlocks,
		messageDisplayNames
	};
}
/**
* 发送前处理附件：等待上传完成、填充图片 URI、过滤未完成的 block。
* 如果传入 uid，会在第一个 text block 前注入 `<user_message uid="xxx"/>` marker。
* 返回 null 表示过滤后没有有效内容。
*/
async function prepareBlocksForSend(blocks, waitForAllUploads, uid, options) {
	if (waitForAllUploads) {
		const unresolvedImageNames = await processImageUrisFromCache(blocks, waitForAllUploads, { requireUploadedUrl: options?.requireUploadedUrl });
		if (unresolvedImageNames.length > 0) options?.onUploadIncomplete?.(unresolvedImageNames);
	}
	const filtered = blocks.filter((block) => {
		const status = getBlockStatus(block);
		if (!status) return true;
		return status === "completed";
	});
	const hasContent = filtered.some((b) => b.type === "text" ? !!b.text?.trim() : true);
	if (filtered.length === 0 || !hasContent) return null;
	return injectUserIdMarker(mergeAdjacentTextBlocks(structuredClone(filtered)), uid);
}
/**
* @msg 占位 snippet 转义：`\` → `\\`、`"` → `\"`（与 daemon
* `packages/workbuddy-server/src/prompts/user-prompt-service.ts` 里同名
* 内部函数严格对偶 / release/5.3.0 权威格式）。
*
* 语义边界：占位符 `@msg:<author>"<snippet>"` 里 snippet 用双引号包裹作为终止符。
* snippet 内如果含裸引号 / 反斜杠，会破坏引号边界，让 replay 侧 `bareMsgQuotedMatch`
* 正则误吞后续内容。encode 阶段把这两种转义掉，正则里 `((?:\\.|[^"\\])*)"` 结构
* 对应反向解析：`\"` → `"`、`\\` → `\`。
*
* 由 `resolve-and-send-prompt.ts` 拼 <user_query> 前缀时复用，与 daemon 占位符
* 严格同构（MEMORY.md「占位符前缀单一权威铁律」）。
*/
function encodeMsgSnippetForOccupier(snippet) {
	return snippet.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}
var USER_ID_MARKER_REGEX, USER_ID_MARKER_REGEX_GLOBAL, CONVERSATION_TAG_KEYS, WORK_SUMMARY_HEADER, TODO_REFERENCE_HEADER, TDRIVE_ATTACHMENTS_HEADER, MESSAGE_REFERENCE_HEADER;
var init_chat_message_utils = __esmMin((() => {
	init_common();
	init_src();
	init_upload_utils();
	init_message_reference();
	init_strip_injected_context();
	init_process_notification_loop();
	USER_ID_MARKER_REGEX = /<user_message\s+uid="([^"]+)"\s*\/>/;
	USER_ID_MARKER_REGEX_GLOBAL = /<user_message\s+uid="[^"]+"\s*\/>/g;
	CONVERSATION_TAG_KEYS = new Set([
		"agent",
		"template",
		"skill",
		"plugin",
		"scene",
		"expert",
		"locale"
	]);
	WORK_SUMMARY_HEADER = "The following is a summary of work completed before this task was assigned to you. Use it as background context when you need to understand prior progress. Do NOT re-execute any of the work described here.";
	TODO_REFERENCE_HEADER = "The user has attached project todos below. MUST call `todo_show` with the id to fetch full details. suggestions carries advice from the previous handler — for reference only, always prioritize the current user's query.";
	TDRIVE_ATTACHMENTS_HEADER = "The user has attached Tencent NetDrive resources as netdrive://, with metadata in the block below. Look up each id there and call the netdrive__tdrive MCP — never use Read/Glob/Grep/Bash on netdrive:// URIs.";
	MESSAGE_REFERENCE_HEADER = "The user has attached project messages below. MUST call `project_message_show` with the id to fetch full details. See <user_query> for which specific message the user is asking about.";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/collaborator-avatar-stack.less
var init_collaborator_avatar_stack$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/collaborator-avatar-stack.tsx
function normalizeMembers(members) {
	return members.map((member, index) => ({
		userId: member.userId || member.id || `collaborator-${index}`,
		fallbackName: (member.nickname?.trim() || member.name?.trim() || "").toString(),
		fallbackAvatar: member.avatarUrl || member.avatar
	}));
}
var import_react$9, import_jsx_runtime$2, VisibleAvatar, OverflowItem, CollaboratorAvatarStack;
var init_collaborator_avatar_stack = __esmMin((() => {
	init_collaborator_avatar_stack$1();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	init_teams_user_display();
	import_jsx_runtime$2 = require_jsx_runtime();
	VisibleAvatar = ({ collaborator, index, avatarSize, stackBase, onAvatarEvent }) => {
		const t = useTranslation();
		const { name, isResolved } = useTeamMember(collaborator.userId, {
			fallbackName: collaborator.fallbackName,
			fallbackAvatar: collaborator.fallbackAvatar
		});
		const popoverText = !isResolved && name === collaborator.userId ? t("collab.task.collaborators.unknown") : name;
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Popover, {
			trigger: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TeamsUserAvatar, {
				userId: collaborator.userId,
				fallbackName: collaborator.fallbackName,
				fallbackAvatar: collaborator.fallbackAvatar,
				size: avatarSize,
				onClick: onAvatarEvent,
				onKeyDown: onAvatarEvent,
				className: "collaborator-avatar-stack__avatar",
				style: { zIndex: stackBase - index }
			}),
			placement: "top",
			triggerMode: "hover",
			hasArrow: true,
			offsetDistance: 8,
			className: "collaborator-avatar-stack-name-popover",
			role: "tooltip",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: popoverText })
		});
	};
	OverflowItem = ({ collaborator }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "collaborator-avatar-stack-popover__item",
			role: "listitem",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TeamsUserAvatar, {
				userId: collaborator.userId,
				fallbackName: collaborator.fallbackName,
				fallbackAvatar: collaborator.fallbackAvatar,
				size: 20,
				className: "collaborator-avatar-stack-popover__avatar"
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TeamsUserLabel, {
				userId: collaborator.userId,
				fallbackName: collaborator.fallbackName,
				unknownLabel: t("collab.task.collaborators.unknown"),
				className: "collaborator-avatar-stack-popover__name"
			})]
		});
	};
	CollaboratorAvatarStack = ({ members, maxVisible = 2, avatarSize = 24, className, stopEventPropagation = true }) => {
		const t = useTranslation();
		const [overflowOpen, setOverflowOpen] = (0, import_react$9.useState)(false);
		const normalizedMembers = (0, import_react$9.useMemo)(() => normalizeMembers(members), [members]);
		if (normalizedMembers.length === 0) return null;
		const visibleMembers = normalizedMembers.slice(0, maxVisible);
		const hasOverflow = normalizedMembers.length > visibleMembers.length;
		const stackBase = visibleMembers.length + (hasOverflow ? 1 : 0);
		const fallbackAriaLabel = normalizedMembers.map((m) => m.fallbackName || m.userId).filter(Boolean).join(t("collab.task.collaborators.separator"));
		const mergedClassName = ["collaborator-avatar-stack", className].filter(Boolean).join(" ");
		const stopPropagation = (event) => {
			if (stopEventPropagation) event.stopPropagation();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", {
			className: mergedClassName,
			"aria-label": fallbackAriaLabel,
			children: [visibleMembers.map((collaborator, index) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(VisibleAvatar, {
				collaborator,
				index,
				avatarSize,
				stackBase,
				onAvatarEvent: stopPropagation
			}, collaborator.userId)), hasOverflow && (stopEventPropagation === false ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Avatar, {
				size: avatarSize,
				"aria-label": fallbackAriaLabel,
				className: "collaborator-avatar-stack__avatar collaborator-avatar-stack__avatar--more",
				style: { zIndex: 1 },
				children: String(normalizedMembers.length)
			}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Popover, {
				trigger: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Avatar, {
					size: avatarSize,
					role: "button",
					tabIndex: 0,
					"aria-label": fallbackAriaLabel,
					onClick: stopPropagation,
					onKeyDown: stopPropagation,
					className: "collaborator-avatar-stack__avatar collaborator-avatar-stack__avatar--more",
					style: { zIndex: 1 },
					children: overflowOpen ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
						className: "collaborator-avatar-stack__more-chevron",
						"aria-hidden": "true"
					}) : String(normalizedMembers.length)
				}),
				placement: "top",
				offsetDistance: 6,
				open: overflowOpen,
				onOpenChange: setOverflowOpen,
				className: "collaborator-avatar-stack-popover",
				role: "dialog",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "collaborator-avatar-stack-popover__list",
					"aria-label": fallbackAriaLabel,
					role: "list",
					children: normalizedMembers.map((collaborator) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(OverflowItem, { collaborator }, collaborator.userId))
				})
			}))]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/apply-join-page/use-apply-join.ts
/**
* 申请加入项目/任务/待办的逻辑 hook
*
* 数据来源：
* - J0 GET /projects/:projectId/join-entry — 获取项目引导信息（项目名、审批人列表）
* - T0 GET /tasks/:conversationId/join-entry — 获取任务引导信息（任务名、task.owner）
* - J1 POST /projects/:projectId/join-requests — 提交项目加入申请
* - T1 POST /tasks/:conversationId/join-requests — 提交任务协作申请
*/
function useApplyJoin(options) {
	const { type, projectId, taskId, externalProjectName, externalTaskName, externalTodoName, pendingRequestId, approvers: externalApprovers, taskApprover: externalTaskApprover } = options;
	const projectFacade = useProjectFacade();
	const teamsReport = useTeamsReport();
	const t = useTranslation();
	const [selectedRole, setSelectedRole] = (0, import_react$8.useState)("viewer");
	const [applyStatus, setApplyStatus] = (0, import_react$8.useState)(pendingRequestId ? "pending" : "none");
	const [submitting, setSubmitting] = (0, import_react$8.useState)(false);
	const [loading, setLoading] = (0, import_react$8.useState)(true);
	const [notFound, setNotFound] = (0, import_react$8.useState)(false);
	const [entryProjectName, setEntryProjectName] = (0, import_react$8.useState)("");
	const [entryApprovers, setEntryApprovers] = (0, import_react$8.useState)([]);
	const [entryTaskName, setEntryTaskName] = (0, import_react$8.useState)("");
	const [entryTaskApprover, setEntryTaskApprover] = (0, import_react$8.useState)(void 0);
	(0, import_react$8.useEffect)(() => {
		let cancelled = false;
		const fetchEntry = async () => {
			try {
				if ((type === "taskMember" || type === "taskOutsider") && taskId) {
					const [taskEntry, projectEntry] = await Promise.all([projectFacade.getTaskJoinEntry(taskId), projectFacade.getProjectJoinEntry(projectId)]);
					if (cancelled) return;
					setEntryTaskName(taskEntry.taskName || "");
					if (taskEntry.taskOwner) setEntryTaskApprover({
						userId: taskEntry.taskOwner.uid,
						name: taskEntry.taskOwner.name
					});
					setEntryProjectName(projectEntry.name || "");
					setEntryApprovers((projectEntry.approvers || []).map((a) => ({
						userId: a.uid,
						name: a.name
					})));
					if (taskEntry.myPendingTaskReqId) setApplyStatus("pending");
				} else {
					const projectEntry = await projectFacade.getProjectJoinEntry(projectId);
					if (cancelled) return;
					setEntryProjectName(projectEntry.name || "");
					setEntryApprovers((projectEntry.approvers || []).map((a) => ({
						userId: a.uid,
						name: a.name
					})));
					if (projectEntry.myPendingRequestId) setApplyStatus("pending");
				}
			} catch (err) {
				const httpStatus = extractHttpStatus(err);
				const bizCode = err?.code;
				if (httpStatus === 404 || bizCode === 14284 || String(err?.message ?? "").toLowerCase().includes("not found")) {
					if (!cancelled) setNotFound(true);
				} else console.warn("[ApplyJoin] 获取引导信息失败，使用 fallback:", err);
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		fetchEntry();
		return () => {
			cancelled = true;
		};
	}, [
		type,
		projectId,
		taskId,
		projectFacade
	]);
	const showRoleSelect = type === "project" || type === "todo";
	return {
		info: (0, import_react$8.useMemo)(() => ({
			projectId,
			projectName: entryProjectName || externalProjectName || "",
			approvers: entryApprovers.length > 0 ? entryApprovers : externalApprovers ?? [],
			applyStatus: pendingRequestId ? "pending" : "none",
			isEnterpriseMember: true,
			...type === "taskMember" || type === "taskOutsider" ? {
				taskTitle: entryTaskName || externalTaskName || "任务协作",
				taskApprover: entryTaskApprover ?? externalTaskApprover
			} : {},
			...type === "todo" ? { todoTitle: externalTodoName || "" } : {}
		}), [
			projectId,
			entryProjectName,
			externalProjectName,
			entryApprovers,
			externalApprovers,
			entryTaskName,
			externalTaskName,
			entryTaskApprover,
			externalTaskApprover,
			externalTodoName,
			pendingRequestId,
			type
		]),
		selectedRole,
		setSelectedRole,
		applyStatus,
		submitting,
		loading,
		notFound,
		submitApply: (0, import_react$8.useCallback)(async () => {
			if (submitting || applyStatus === "pending") return;
			setSubmitting(true);
			try {
				if ((type === "taskMember" || type === "taskOutsider") && taskId) {
					if ((await projectFacade.submitTaskJoinRequest(taskId)).status === "already_member") {
						window.location.reload();
						return;
					}
					setApplyStatus("pending");
					teamsReport(TEAMS_EVENT.ELEMENT_CLICK, {
						elementName: TEAMS_ELEMENT.PROJECT_INVITE_LINK_APPLY,
						...buildProjectInviteApplyPayload({
							type,
							selectedRole
						})
					});
				} else {
					const roleId = ROLE_TO_BACKEND_ID[selectedRole];
					if ((await projectFacade.submitJoinRequest(projectId, { roleId })).status === "already_member") {
						window.location.reload();
						return;
					}
					setApplyStatus("pending");
					teamsReport(TEAMS_EVENT.ELEMENT_CLICK, {
						elementName: TEAMS_ELEMENT.PROJECT_INVITE_LINK_APPLY,
						...buildProjectInviteApplyPayload({
							type,
							selectedRole
						})
					});
				}
			} catch (err) {
				const code = err?.code;
				const is404 = extractHttpStatus(err) === 404 || code === 14284 || String(err?.message ?? "").toLowerCase().includes("not found");
				if (code) console.error(`[ApplyJoin] submit failed: ${code}`, err.message);
				if (is404) {
					const isTaskScene = type === "taskMember" || type === "taskOutsider";
					message.error(isTaskScene ? t("collab.apply.error.taskNotFound") : t("collab.apply.error.projectNotFound"), 3e3);
				} else message.error(t("collab.apply.error.submitFailed"), 3e3);
			} finally {
				setSubmitting(false);
			}
		}, [
			submitting,
			applyStatus,
			projectId,
			taskId,
			type,
			projectFacade,
			selectedRole,
			teamsReport
		]),
		showRoleSelect
	};
}
var import_react$8, ROLE_TO_BACKEND_ID;
var init_use_apply_join = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	init_use_project_facade();
	init_errors();
	init_beacon_report();
	init_teams_telemetry_fields();
	ROLE_TO_BACKEND_ID = {
		editor: "project.admin",
		viewer: "project.member"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/apply-join-page/apply-join-page.tsx
/** 状态提示文案 */
function getStatusHint(type, isPending, info, t) {
	if (isPending) return t("collab.apply.hint.pending");
	switch (type) {
		case "project": return t("collab.apply.hint.project");
		case "taskMember": return `所属项目「${info.projectName}」· 已是项目成员`;
		case "taskOutsider": return `所属项目「${info.projectName}」· 尚未加入项目`;
		case "todo": return t("collab.apply.hint.todo");
	}
}
/** 按钮文案 */
function getButtonText(type, role, submitting, t) {
	if (submitting) return t("collab.apply.submitting");
	if (type === "taskMember") return t("collab.apply.btn.taskMember");
	if (type === "taskOutsider") return t("collab.apply.btn.taskOutsider");
	return role === "editor" ? t("collab.apply.btn.editor") : t("collab.apply.btn.viewer");
}
var import_react$7, import_jsx_runtime$1, ApplyJoinPage, ApprovalFlow, RoleCard, ArrowRightIcon;
var init_apply_join_page$1 = __esmMin((() => {
	init_apply_join_page$2();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_no_access();
	init_project_apply();
	init_beacon_report();
	init_chat_message_utils();
	init_teams_telemetry_fields();
	init_collaborator_avatar_stack();
	init_use_apply_join();
	import_jsx_runtime$1 = require_jsx_runtime();
	ApplyJoinPage = ({ type, projectId, taskId, todoId, projectName: externalProjectName, taskName: externalTaskName, todoName: externalTodoName, pendingRequestId, approvers, taskApprover }) => {
		const t = useTranslation();
		const teamsReport = useTeamsReport();
		const { info, selectedRole, setSelectedRole, applyStatus, submitting, loading, notFound, submitApply, showRoleSelect } = useApplyJoin({
			type,
			projectId,
			taskId,
			todoId,
			externalProjectName,
			externalTaskName,
			externalTodoName,
			pendingRequestId,
			approvers,
			taskApprover
		});
		const reportedInviteViewKeyRef = (0, import_react$7.useRef)(null);
		(0, import_react$7.useEffect)(() => {
			const key = `${type}:${projectId}`;
			if (reportedInviteViewKeyRef.current === key) return;
			reportedInviteViewKeyRef.current = key;
			teamsReport(TEAMS_EVENT.PAGE_SHOW, {
				pageName: TEAMS_ELEMENT.PROJECT_INVITE_LINK_VIEW,
				...buildProjectInviteViewPayload({ type })
			});
		}, [
			teamsReport,
			type,
			projectId
		]);
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "apply-join-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "apply-join-page__card",
				style: {
					minHeight: 200,
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					style: {
						color: "rgba(0,0,0,0.4)",
						fontSize: 14
					},
					children: t("common.loading") || "加载中..."
				})
			})
		});
		if (notFound) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "apply-join-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "apply-join-page__card apply-join-page__card--no-access",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
						src: no_access_default,
						className: "apply-join-page__no-access-icon",
						alt: ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
						className: "apply-join-page__no-access-title",
						children: t("collab.noAccess.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
						className: "apply-join-page__no-access-desc",
						children: t("collab.noAccess.description")
					})
				]
			})
		});
		const isPending = applyStatus === "pending";
		const rawResourceName = type === "taskMember" || type === "taskOutsider" ? info.taskTitle : info.projectName;
		const resourceName = rawResourceName ? stripUserIdMarker(rawResourceName) : "";
		const statusHint = getStatusHint(type, isPending, info, t);
		const buttonText = getButtonText(type, selectedRole, submitting, t);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "apply-join-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "apply-join-page__card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "apply-join-page__header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
								className: "apply-join-page__icon",
								src: project_apply_default,
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h1", {
								className: "apply-join-page__title",
								children: resourceName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
								className: "apply-join-page__status-hint",
								children: statusHint
							})
						]
					}),
					showRoleSelect && !isPending && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "apply-join-page__role-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "apply-join-page__section-label",
							children: t("collab.apply.label.selectRole")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "apply-join-page__roles",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RoleCard, {
								role: "viewer",
								title: t("collab.apply.role.viewer"),
								description: t("collab.apply.role.viewerDesc"),
								selected: selectedRole === "viewer",
								disabled: isPending,
								onSelect: setSelectedRole
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RoleCard, {
								role: "editor",
								title: t("collab.apply.role.editor"),
								description: t("collab.apply.role.editorDesc"),
								selected: selectedRole === "editor",
								disabled: isPending,
								onSelect: setSelectedRole
							})]
						})]
					}),
					isPending && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "apply-join-page__pending-info",
						children: [showRoleSelect && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "apply-join-page__info-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "apply-join-page__info-label",
								children: t("collab.apply.pending.appliedRole")
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "apply-join-page__info-value",
								children: selectedRole === "editor" ? t("collab.apply.role.editor") : t("collab.apply.role.viewer")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ApprovalFlow, {
							type,
							info,
							isPending: true,
							t
						})]
					}),
					!isPending && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ApprovalFlow, {
						type,
						info,
						isPending: false,
						t
					}),
					!isPending && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "apply-join-page__footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "apply-join-page__submit-btn",
							onClick: submitApply,
							disabled: submitting,
							children: buttonText
						}), type === "taskOutsider" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
							className: "apply-join-page__footer-hint",
							children: t("collab.apply.hint.taskOutsiderFooter")
						})]
					})
				]
			})
		});
	};
	ApprovalFlow = ({ type, info, isPending, t }) => {
		const approvers = info.approvers;
		const taskApproverInfo = info.taskApprover;
		const isTaskFlow = type === "taskOutsider" || type === "taskMember";
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "apply-join-page__approval-flow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "apply-join-page__flow-label",
				children: isPending && !isTaskFlow ? t("collab.apply.flow.progressLabel") : t("collab.apply.flow.label")
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: `apply-join-page__flow-content${isTaskFlow ? " apply-join-page__flow-content--inline" : ""}`,
				children: [
					type !== "taskMember" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "apply-join-page__flow-step",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CollaboratorAvatarStack, {
							members: approvers.map((a) => ({
								userId: a.userId,
								name: a.name,
								avatarUrl: a.avatar
							})),
							maxVisible: 3,
							className: "apply-join-page__approvers"
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "apply-join-page__flow-desc",
							children: isPending ? t("collab.apply.flow.projectPending", { name: approvers[0]?.name || "管理员" }) : approvers.length === 1 ? t("collab.apply.flow.projectSingle", { name: approvers[0]?.name || "管理员" }) : t("collab.apply.flow.project")
						})]
					}),
					isTaskFlow && type !== "taskMember" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "apply-join-page__flow-arrow",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArrowRightIcon, {})
					}),
					isTaskFlow && taskApproverInfo && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "apply-join-page__flow-step",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CollaboratorAvatarStack, {
							members: [{
								userId: taskApproverInfo.userId,
								name: taskApproverInfo.name,
								avatarUrl: taskApproverInfo.avatar
							}],
							maxVisible: 3,
							className: "apply-join-page__approvers"
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "apply-join-page__flow-desc",
							children: isPending ? t("collab.apply.flow.taskOwnerPending", { name: taskApproverInfo.name }) : t("collab.apply.flow.taskMember", { name: taskApproverInfo.name })
						})]
					})
				]
			})]
		});
	};
	RoleCard = ({ role, title, description, selected, disabled, onSelect }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "apply-join-page__role-card",
		onClick: () => !disabled && onSelect(role),
		role: "radio",
		"aria-checked": selected,
		tabIndex: disabled ? -1 : 0,
		onKeyDown: (e) => {
			if (!disabled && (e.key === "Enter" || e.key === " ")) {
				e.preventDefault();
				onSelect(role);
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "apply-join-page__role-card-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: `apply-join-page__radio${selected ? " apply-join-page__radio--checked" : ""}`,
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "apply-join-page__radio-dot" })
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "apply-join-page__role-title",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
				className: "apply-join-page__role-desc",
				children: description
			})] })]
		})
	});
	ArrowRightIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M6 3L11 8L6 13",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/members/apply-join-page/index.tsx
var init_apply_join_page = __esmMin((() => {
	init_apply_join_page$1();
	init_use_apply_join();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/connectors/connector-menu-model.ts
/**
* 按 authMode+connectorName 唯一去重（同名团队 + 个人都保留），并四段排序（对齐非项目输入框
* `sortConnectorsLikeCapsule` 的"已连接 → 曾连接 → 未连接"语义，团队按 #63314 仍强制最前）：
*   1. 团队（source=project）—— 始终最前，带"团队"标识
*   2. 个人已开启（开关 on = isConnected && enabled !== false，绿色开关）
*   3. 个人曾连接但当前关闭（everConnected/isConnected 为真但未开启，灰色关闭态开关）
*   4. 个人从未连接（渲染"连接"按钮）
*
* 第 3 段的存在是为了让"曾连过、当前关"的开关行与"已开启"行一起置顶分组，而不是散落在
* "连接"按钮之间（issue #63314：本机 MCP toggle off = 断开会把 isConnected 翻 false，
* 若只按 isConnected 分段会把它误排进未连接组，与非项目输入框视觉不一致）。
*
* 互斥 toggle 由 use-project-local-resource-injections `handleToggleConnector`（同名 authMode 切换）
* 兜底（参考 issue #50672）。
*
* 注意：team 段以 `source === 'project'` 判定。调用方需保证"项目未挂入的 public registry 条目"
* 已在 {@link filterConnectorsForTaskContext} 里被剔除，否则会把非团队 public 误并入团队段。
*/
function mergeConnectorsForMenu(selected, available) {
	const byIdentity = /* @__PURE__ */ new Map();
	for (const connector of available) byIdentity.set(connectorKey(connector), connector);
	for (const connector of selected) byIdentity.set(connectorKey(connector), connector);
	const allItems = Array.from(byIdentity.values());
	const isOn = (item) => !!item.isConnected && item.enabled !== false;
	const isToggleable = (item) => !!item.everConnected || !!item.isConnected;
	const teamConnected = [];
	const personalOn = [];
	const personalEverConnected = [];
	const personalUnconnected = [];
	for (const item of allItems) if (item.source === "project") teamConnected.push(item);
	else if (isOn(item)) personalOn.push(item);
	else if (isToggleable(item)) personalEverConnected.push(item);
	else personalUnconnected.push(item);
	return [
		...teamConnected,
		...personalOn,
		...personalEverConnected,
		...personalUnconnected
	];
}
/**
* 按"当前任务情境"过滤连接器列表（issue #63314）：
*   - 本机 MCP（source=local）：不受项目白名单约束，全部保留。
*   - 个人连接器（authMode=personal）：项目白名单仅作推荐，**不过滤**，全部保留。
*   - 团队连接器（authMode=public）：仅保留挂进项目白名单且已完成授权（isConnected）的条目。
*     与项目配置抽屉 public tab（`projectByMode.public`）对齐：白名单存在但 connect_status=0
*     的孤儿记录不出现在对话框 + 菜单 / chip；授权入口留在项目配置抽屉。
*/
function filterConnectorsForTaskContext(items, projectWhitelistKeys) {
	return items.filter((connector) => {
		if (connector.source === "local") return true;
		if (connector.authMode === "personal") return true;
		return projectWhitelistKeys.has(connectorKey(connector)) && !!connector.isConnected;
	});
}
/**
* Teams 本地任务对话框（加号菜单 + 工具栏 chip）暂不支持团队连接器，剔除 source=project 条目。
* 云端任务对话框不走此过滤，仍展示项目挂入的团队连接器。
*/
function excludeTeamConnectors(items) {
	return items.filter((connector) => connector.source !== "project");
}
/**
* 从入口 1 的菜单项派生入口 2（工具栏 chip）浮层要展示的"已配置/已连接"子集：
*   - 取已连接 / 曾连接过的连接器（开 + 关都在），**不含**"从未连接过"的个人连接器。
*   - 团队（source=project，带"团队"标识）在前，个人在后；段内保持入口 1 的原始顺序。
*
* 注意：chip **图标叠层**只显示其中"已开启(on)"的（由 chip 组件内再按 isItemOn 过滤），
* 本函数返回的是**浮层完整列表**（含关闭态）—— 让用户能在浮层里对已配置连接器来回开关，
* 关掉某项时它不会从列表消失（与 McpConnectorChip 浮层一致）。
*/
function buildConnectorChipItems(menuItems) {
	const configured = menuItems.filter(isConnectorMenuItemConfigured);
	const team = configured.filter((item) => item.source === "project");
	const personal = configured.filter((item) => item.source !== "project");
	return [...team, ...personal];
}
var connectorKey, connectorBaseKey, toConnectorMenuItem, fromConnectorMenuItem, isConnectorMenuItemConfigured;
var init_connector_menu_model = __esmMin((() => {
	connectorKey = (connector) => `${connector.authMode}:${connector.connectorName}`;
	connectorBaseKey = (connector) => connector.connectorName.replace(/[-_](personal|public|global|project)$/i, "");
	toConnectorMenuItem = (connector, canToggle, tagText) => ({
		id: connector.connectorName,
		name: connector.displayName || connector.connectorName,
		description: connector.description,
		icon: connector.iconUrl,
		authMode: connector.authMode,
		source: connector.source,
		isConnected: connector.isConnected,
		everConnected: connector.everConnected,
		enabled: connector.enabled,
		canToggle,
		raw: connector,
		tag: connector.source === "project" ? tagText.team : void 0
	});
	fromConnectorMenuItem = (item) => item.raw;
	isConnectorMenuItemConfigured = (item) => !!item.isConnected || !!item.everConnected;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/netdrive-selector-modal/index.ts
var init_netdrive_selector_modal = __esmMin((() => {
	init_netdrive_selector_modal$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/mention/netdrive-block-utils.ts
var init_netdrive_block_utils = __esmMin((() => {
	init_netdrive_block_utils$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/mention/use-netdrive-mention-provider.ts
function getPathCache(_client) {
	return pathCache;
}
/** 将网盘 entry 转为 MentionSuggestion。parentPath 为其所在目录路径（根目录为空）。 */
function entryToSuggestion(entry, parentPath) {
	const fileId = entry.fileID || entry.id || "";
	const rawName = entry.name || "未命名";
	const isFolder = entry.kind === 2 || entry.type === "dir";
	const rawExt = entry.ext || entry.extension || "";
	const entryExt = rawExt.startsWith(".") ? rawExt.slice(1) : rawExt;
	const alreadyHasExt = entryExt && rawName.toLowerCase().endsWith(`.${entryExt.toLowerCase()}`);
	const name = !isFolder && entryExt && !alreadyHasExt ? `${rawName}.${entryExt}` : rawName;
	const filePath = entry.path || entry.filePath || name;
	const ext = entryExt || getExtFromName(name);
	return {
		id: fileId,
		label: name,
		description: parentPath ? parentPath : "项目资料",
		icon: "file",
		insertText: name,
		group: NETDRIVE_GROUP,
		metadata: {
			type: "file",
			fileId,
			fileName: name,
			filePath,
			fileSize: entry.size || 0,
			fileType: getFileType(ext),
			extension: ext,
			isFolder: entry.kind === 2 || entry.type === "dir",
			source: "project-assets"
		},
		convertToContentBlock: () => createNetDriveFileBlock({
			fileName: name,
			filePath,
			fileId,
			fileSize: entry.size || 0,
			extension: ext,
			source: "project-assets"
		})
	};
}
/**
* 递归遍历网盘目录树，平铺收集文件和文件夹，直到达到 limit 为止。
* BFS 策略：先列当前层所有 entry，遇到文件夹则入队继续展开。
* 每个 entry 附带其所在目录路径（根目录为空）。
*
* 用于一次性拉取场景（如 use-collab-mention 的 todo+netdrive 聚合）。
* 滚动分页场景请使用 createNetdrivePager。
*/
async function flatListEntries(client, limit) {
	const results = [];
	const queue = [{
		parentID: void 0,
		path: ""
	}];
	const pathCache = getPathCache(client);
	while (queue.length > 0 && results.length < limit) {
		const { parentID, path } = queue.shift();
		try {
			const res = await client.dir.list({
				parentID,
				limit: 20
			});
			for (const entry of res.entries || []) {
				if (results.length >= limit) break;
				results.push({
					entry,
					parentPath: path
				});
				const entryId = entry.fileID || entry.id || "";
				if (entryId) pathCache.set(entryId, path);
				if (entry.kind === 2 || entry.type === "dir") {
					const folderName = entry.name || "";
					const childPath = path ? `${path}/${folderName}` : folderName;
					queue.push({
						parentID: entry.fileID || entry.id,
						path: childPath
					});
				}
			}
		} catch {}
	}
	return results;
}
function createNetdrivePager(client) {
	const queue = [{
		parentID: void 0,
		path: ""
	}];
	const buffer = [];
	let exhausted = false;
	const pathCache = getPathCache(client);
	/** 把 buffer 灌满到至少 minSize 条；不够就继续 shift 队列 list 下一目录。 */
	async function fillBuffer(minSize) {
		while (buffer.length < minSize && queue.length > 0) {
			const { parentID, path } = queue.shift();
			try {
				const res = await client.dir.list({
					parentID,
					limit: 20
				});
				for (const entry of res.entries || []) {
					buffer.push({
						entry,
						parentPath: path
					});
					const entryId = entry.fileID || entry.id || "";
					if (entryId) pathCache.set(entryId, path);
					if (entry.kind === 2 || entry.type === "dir") {
						const folderName = entry.name || "";
						const childPath = path ? `${path}/${folderName}` : folderName;
						queue.push({
							parentID: entry.fileID || entry.id,
							path: childPath
						});
					}
				}
			} catch {}
		}
	}
	return {
		async pull(limit) {
			if (exhausted) return [];
			await fillBuffer(limit);
			const taken = buffer.splice(0, limit);
			if (buffer.length === 0 && queue.length === 0) exhausted = true;
			return taken;
		},
		get hasMore() {
			return !exhausted;
		}
	};
}
/**
* 获取网盘文件列表的纯函数（不是 hook，可被 useCollabMention 直接调用）
*
* - 有关键词时：走 search.file 搜索所有层级
* - 无关键词时：BFS 递归遍历目录树，平铺展示文件和文件夹（前 limit 个）
*
* 一次性返回，不分页；分页场景见 useNetdriveMentionProvider 内部。
*/
async function fetchNetdriveSuggestions(getClient, ready, keyword, limit = NETDRIVE_PAGE_SIZE$1) {
	if (!ready) return [];
	const client = getClient();
	if (!client) return [];
	try {
		if (keyword) {
			const result = await client.search.file({
				keywords: [keyword],
				limit
			});
			const pathCache = getPathCache(client);
			return (result.hits || []).map((hit) => {
				const entry = hit.entry || hit;
				const entryId = entry.fileID || entry.id || "";
				return entryToSuggestion(entry, entryId ? pathCache.get(entryId) : void 0);
			});
		}
		return (await flatListEntries(client, limit)).map(({ entry, parentPath }) => entryToSuggestion(entry, parentPath));
	} catch (err) {
		console.warn("[NetdriveMentionProvider] fetchNetdriveSuggestions failed:", err);
		return [];
	}
}
/**
* 把网盘 entry 转 MentionSuggestion 的导出版本，给聚合 provider（use-collab-mention）复用。
*/
function netdriveEntryToSuggestion(entry, parentPath) {
	return entryToSuggestion(entry, parentPath);
}
/**
* 用 pager 拉一批 + 包装成 MentionResult，loadMore 闭包持有同一个 pager。
* 失败时返回空批 + hasMore=false，避免触底卡死。
*/
async function pullNetdrivePageAsMentionResult(pager) {
	return pullPageAsMentionResult(pager);
}
async function pullPageAsMentionResult(pager) {
	let suggestions = [];
	try {
		suggestions = (await pager.pull(NETDRIVE_PAGE_SIZE$1)).map(({ entry, parentPath }) => entryToSuggestion(entry, parentPath));
	} catch (err) {
		console.warn("[NetdriveMentionProvider] pull page failed:", err);
		return {
			suggestions: [],
			hasMore: false
		};
	}
	if (!pager.hasMore) return {
		suggestions,
		hasMore: false
	};
	return {
		suggestions,
		hasMore: true,
		loadMore: () => pullPageAsMentionResult(pager)
	};
}
var NETDRIVE_GROUP, NETDRIVE_PAGE_SIZE$1, pathCache;
var init_use_netdrive_mention_provider = __esmMin((() => {
	require_react();
	init_netdrive_block_utils();
	NETDRIVE_GROUP = {
		id: "netdrive",
		label: "项目资料库",
		order: 1
	};
	NETDRIVE_PAGE_SIZE$1 = 5;
	pathCache = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/mention/create-local-todo-chip.ts
/**
* 构造项目待办 chip resource_link。
*
* 三条上游触发路径都必须走这个函数产出 chip，禁止再手写 chip 结构，避免形态漂移。
*/
function createLocalTodoChip(input) {
	const description = input.statusName ?? "";
	return createPhraseBlock(input.title, `todo://${input.todoId}`, {
		icon: "docs",
		description,
		meta: {
			mentionType: "todo",
			todoId: input.todoId,
			projectId: input.projectId,
			statusType: input.statusType,
			displayText: input.title,
			todoTitle: input.title,
			todoDescription: input.description,
			todoSummary: input.summary,
			snapshotSessionId: input.snapshotSessionId,
			todoTags: input.tags
		}
	});
}
var init_create_local_todo_chip = __esmMin((() => {
	init_src();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/mention/use-todo-mention-provider.ts
/**
* 状态类型 → 展示文案。
*
* 标准枚举（pending / in_progress / paused / completed）一律走 i18n key，
* 与 STATUS_OPTIONS（detail-modal/project-plan-detail-utils.ts）的 4 类口径对齐。
* ⚠️ 不要 fallback 到 status.name —— 智能表迁移后 name 是英文选项原文
* （'pending'/'running'/'paused'/'done'），fallback 会把英文 raw 渲染出来（#56172）。
*/
function getTodoStatusLabel(statusType, t) {
	switch (statusType) {
		case "pending": return t("collab.plan.status.label.pending");
		case "in_progress": return t("collab.plan.status.label.in_progress");
		case "paused": return t("collab.plan.status.shortLabel.paused");
		case "completed": return t("collab.plan.status.shortLabel.completed");
		default: return "";
	}
}
/** 将 ProjectTodo 转为 MentionSuggestion */
function todoToSuggestion(todo, t) {
	const statusLabel = getTodoStatusLabel(todo.status?.type || "", t) || todo.status?.name || "";
	return {
		id: todo.id,
		label: todo.title,
		description: statusLabel,
		icon: "docs",
		insertText: todo.title,
		group: TODO_GROUP,
		metadata: {
			type: "todo",
			todoId: todo.id,
			projectId: todo.projectId,
			statusType: todo.status?.type,
			priority: resolvePriorityOption(todo),
			todoTitle: todo.title,
			todoDescription: todo.description,
			todoSummary: todo.summary,
			snapshotSessionId: todo.snapshotSessionId,
			todoTags: todo.tags
		},
		convertToContentBlock: (suggestion) => createLocalTodoChip({
			todoId: todo.id,
			title: todo.title,
			projectId: todo.projectId,
			statusType: todo.status?.type,
			statusName: suggestion.description,
			description: todo.description,
			summary: todo.summary,
			snapshotSessionId: todo.snapshotSessionId,
			tags: todo.tags
		})
	};
}
/**
* 获取 Todo 列表的纯函数（不是 hook，可被 useCollabMention 直接调用）。
*
* 走 SmartsheetService.listAllTodos——取的是全量表数据（不走视图筛选，
* @候选要的是"项目内全部未完成"，视图筛选只反映 UI 当前可见，与 @候选无关）。
* service 由项目入口 ProjectDetailView 注册的 bootstrap 按需创建。
*/
async function fetchTodoSuggestions(projectId, keyword, limit, t, options) {
	const effectiveLimit = limit ?? TODO_DEFAULT_LIMIT;
	const keywordLower = keyword?.trim().toLowerCase();
	const filterUnfinished = (todo) => todo.status?.type === "pending" || todo.status?.type === "in_progress" || todo.status?.type === "paused";
	const filterKeyword = (todo) => !keywordLower || todo.title?.toLowerCase().includes(keywordLower) || (todo.summary?.toLowerCase().includes(keywordLower) ?? false);
	try {
		return (await (await ensureSmartsheetService(projectId)).listAllTodos()).filter(filterUnfinished).filter(filterKeyword).filter((todo) => !options?.excludeHandoff || todo.source !== "handoff").sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "")).slice(0, effectiveLimit).map((todo) => todoToSuggestion(todo, t));
	} catch (err) {
		console.warn("[TodoMentionProvider] fetchTodoSuggestions failed:", err);
		return [];
	}
}
var TODO_GROUP, TODO_DEFAULT_LIMIT;
var init_use_todo_mention_provider = __esmMin((() => {
	require_react();
	init_useI18n();
	init_smart_sheet();
	init_create_local_todo_chip();
	TODO_GROUP = {
		id: "todo",
		label: "我的待办计划",
		order: 0
	};
	TODO_DEFAULT_LIMIT = 5;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/capabilities/project-skill-mapping.ts
function mapProjectSkillItemToSkillItem(s) {
	const isEn = getLocale() === "en";
	const rawIcon = s.icon?.trim() || "";
	const iconUrl = /^https?:\/\//i.test(rawIcon) ? rawIcon : void 0;
	const name = isEn ? s.displayNameEn || s.displayNameZh || s.title || s.name || s.descriptionEn || s.skillId : s.displayNameZh || s.displayNameEn || s.title || s.name || s.descriptionZh || s.skillId;
	const description = isEn ? s.descriptionEn || s.descriptionZh || s.description || "" : s.descriptionZh || s.descriptionEn || s.description || "";
	return {
		id: s.skillId,
		name,
		nameEn: s.displayNameEn || void 0,
		description,
		enabled: true,
		provider: s.provider,
		iconUrl,
		icon: s.icon
	};
}
function mapProjectSkillItemsToSkillItems(items) {
	return (items ?? []).map(mapProjectSkillItemToSkillItem);
}
var init_project_skill_mapping = __esmMin((() => {
	init_i18n();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/use-project-local-attachment-actions.tsx
/** 项目本地任务附件入口与 Picker，保持 ProjectDetailContent 只做最小接入。 */
function useProjectLocalAttachmentActions(options) {
	const { adapter, projectId, onInsertBlocks } = options;
	const t = useTranslation();
	const { ready: netDriveReady } = useProjectNetDriveReady(adapter, projectId);
	const knowledgeBaseEnabled = useKnowledgeBaseFeature();
	const tencentDocsKnowledgeEnabled = useTencentDocsKnowledgeFeature();
	const tdocOneidGate = useOneidConnectorGate("doc");
	const lexiangOneidGate = useOneidConnectorGate("lexiang");
	const { enabled: tencentLexiangBaseEnabled } = useTencentLexiangEnabled();
	const { enabled: imaEnabledBase } = useImaEnabled();
	const lexiangLibraryMode = useLexiangLibraryMode();
	const tencentDocsEnabled = isWorkBuddy() && knowledgeBaseEnabled && tencentDocsKnowledgeEnabled && !tdocOneidGate.enterpriseGate;
	const tencentLexiangEnabled = isWorkBuddy() && knowledgeBaseEnabled && tencentLexiangBaseEnabled && (!lexiangOneidGate.enterpriseGate || lexiangOneidGate.status === "enabled");
	const imaEnabled = isWorkBuddy() && imaEnabledBase;
	const [showNetDriveSelector, setShowNetDriveSelector] = (0, import_react$4.useState)(false);
	const [showDocSelector, setShowDocSelector] = (0, import_react$4.useState)(false);
	const [showImaSelector, setShowImaSelector] = (0, import_react$4.useState)(false);
	const [showLexiangPicker, setShowLexiangPicker] = (0, import_react$4.useState)(false);
	const netDriveContextValue = (0, import_react$4.useMemo)(() => {
		const stores = getProjectStores(projectId);
		return {
			netDriveStore: stores.netDriveServiceStore,
			filesStore: stores.myFilesStore
		};
	}, [projectId]);
	const handleNetDriveFilesSelected = (0, import_react$4.useCallback)((files, currentPath) => {
		onInsertBlocks(files.map((file) => {
			const filePath = currentPath ? `${currentPath}/${file.name}` : file.name;
			return createNetDriveFileBlock({
				fileName: file.name,
				filePath,
				fileId: file.id,
				fileSize: file.size ?? 0,
				extension: file.extension || getExtFromName(file.name),
				isFolder: file.isFolder,
				source: "project-assets"
			});
		}));
		setShowNetDriveSelector(false);
	}, [onInsertBlocks]);
	const handleOpenLexiang = (0, import_react$4.useCallback)(() => {
		if (adapter) lexiangAuthStore.getState().setAdapter(adapter);
		setShowLexiangPicker(true);
	}, [adapter]);
	return {
		extraActionItems: (0, import_react$4.useMemo)(() => {
			const items = [];
			if (netDriveReady) items.push({
				kind: "action",
				id: "add-netdrive",
				label: t("action.addNetDriveProject"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyFilesIcon, {
					width: 16,
					height: 16
				}),
				onSelect: () => setShowNetDriveSelector(true)
			});
			items.push(...tencentDocsEnabled ? [{
				kind: "action",
				id: "add-tencent-docs",
				label: t("action.addTencentDocs"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentDocsIcon, {
					width: 16,
					height: 16
				}),
				onSelect: () => setShowDocSelector(true)
			}] : [], ...imaEnabled ? [{
				kind: "action",
				id: "add-ima",
				label: t("action.addIma"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaKnowledgeIcon, {
					width: 16,
					height: 16
				}),
				onSelect: () => setShowImaSelector(true)
			}] : [], ...tencentLexiangEnabled ? [{
				kind: "action",
				id: "add-tencent-lexiang",
				label: t("action.addTencentLexiang"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentLexiangIcon, {
					width: 16,
					height: 16
				}),
				onSelect: handleOpenLexiang
			}] : []);
			return items;
		}, [
			handleOpenLexiang,
			imaEnabled,
			netDriveReady,
			t,
			tencentDocsEnabled,
			tencentLexiangEnabled
		]),
		pickerNodes: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			netDriveReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDriveStoreProvider, {
				value: netDriveContextValue,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDriveSelectorModal, {
					visible: showNetDriveSelector,
					onClose: () => setShowNetDriveSelector(false),
					onSelect: handleNetDriveFilesSelected,
					title: t("myFiles.selector.titleProject"),
					rootFolderLabel: t("myFiles.selector.rootFolderProject")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocSelectorModal, {
				visible: showDocSelector,
				onClose: () => setShowDocSelector(false),
				onSelect: (files) => {
					onInsertBlocks(files.map(toTencentDocBlock));
					setShowDocSelector(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaFileSelector, {
				open: showImaSelector,
				onClose: () => setShowImaSelector(false),
				onSelected: (blocks) => {
					if (blocks.length > 0) onInsertBlocks(blocks);
					setShowImaSelector(false);
				}
			}),
			showLexiangPicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LexiangContentPicker, {
				visible: showLexiangPicker,
				bypassConnectorAuth: lexiangLibraryMode === "iframe",
				onClose: () => setShowLexiangPicker(false),
				onConfirm: (picked) => {
					onInsertBlocks(toLexiangBlocks(picked));
					setShowLexiangPicker(false);
				}
			})
		] }),
		triggerIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WbAddIcon, {})
	};
}
var import_react$4, import_jsx_runtime, toTencentDocBlock, toLexiangBlocks;
var init_use_project_local_attachment_actions = __esmMin((() => {
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_icons();
	init_ima();
	init_netdrive_selector_modal();
	init_netdrive_store_context();
	init_doc_selector_modal();
	init_file_type_icon();
	init_lexiang_auth_store();
	init_lexiang_file_type_icon();
	init_lexiang_content_picker();
	init_use_lexiang_library_mode();
	init_use_ima_enabled();
	init_use_knowledge_base_feature();
	init_use_oneid_connector_gate();
	init_use_tencent_docs_knowledge_feature();
	init_use_tencent_lexiang_enabled();
	init_useI18n();
	init_environment();
	init_netdrive_block_utils();
	init_project_netdrive_store();
	import_jsx_runtime = require_jsx_runtime();
	toTencentDocBlock = (file) => {
		const iconUrl = getTdocIconUrl(file.type);
		return createPhraseBlock(file.title, `tdoc://${file.file_id}`, {
			icon: iconUrl ? {
				url: iconUrl,
				alt: file.title
			} : "file",
			description: file.owner_name || void 0,
			meta: {
				timestamp: Date.now(),
				mentionType: "tencent-doc",
				type: "tencent-doc",
				title: file.title,
				displayText: file.title,
				fileId: file.file_id,
				fileType: file.type,
				fileExt: file.ext,
				fileUrl: file.url,
				fileSize: file.size,
				ownerName: file.owner_name
			}
		});
	};
	toLexiangBlocks = (picked) => picked.map((node) => {
		const makeUri = (id, type, params = {}) => {
			const query = new URLSearchParams({ type });
			Object.entries(params).forEach(([key, value]) => {
				if (value) query.set(key, value);
			});
			return `lexiang://${id}?${query.toString()}`;
		};
		if (node.type === "team") {
			const team = node.team;
			return createPhraseBlock(team.name, makeUri(team.id, "team"), {
				icon: "tencent-lexiang",
				meta: {
					timestamp: Date.now(),
					mentionType: "tencent-lexiang",
					type: "tencent-lexiang",
					entityType: "team",
					title: team.name,
					displayText: team.name,
					teamId: team.id,
					teamName: team.name
				}
			});
		}
		if (node.type === "kb") {
			const kb = node.kb;
			const teamId = kb.teamId ?? node.team?.id;
			return createPhraseBlock(kb.name, makeUri(kb.id, "kb", { teamId }), {
				icon: "tencent-lexiang",
				meta: {
					timestamp: Date.now(),
					mentionType: "tencent-lexiang",
					type: "tencent-lexiang",
					entityType: "kb",
					title: kb.name,
					displayText: kb.name,
					kbId: kb.id,
					kbName: kb.name,
					teamId,
					teamName: kb.teamName ?? node.team?.name
				}
			});
		}
		const doc = node.doc;
		const isFolder = doc.kind === "folder";
		const entityType = isFolder ? "folder" : "doc";
		const iconUrl = getLexiangIconUrl(doc.kind, doc.extension, isFolder);
		return createPhraseBlock(doc.name, makeUri(doc.id, entityType, {
			kbId: doc.kbId,
			teamId: doc.teamId
		}), {
			icon: {
				url: iconUrl,
				alt: doc.name
			},
			meta: {
				timestamp: Date.now(),
				mentionType: "tencent-lexiang",
				type: "tencent-lexiang",
				entityType,
				title: doc.name,
				displayText: doc.name,
				docId: doc.id,
				kbId: doc.kbId,
				kbName: doc.kbName,
				teamId: doc.teamId,
				teamName: doc.teamName,
				kind: doc.kind
			}
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/use-project-resources-collector.ts
/**
* 收集项目公共 connector 资源 + 项目 skill manifest。
* 返回一个 collectResources 函数，在 createConversation 前调用。
*/
function useProjectResourcesCollector() {
	const host = useModuleHost();
	const service = (0, import_react$3.useMemo)(() => new LocalTaskResourceService({ getRecent: (params) => host.facades.expert.getRecent(params) }, { listExperts: (projectId) => host.facades.project.listExperts(projectId) }, host.facades.connector?.listRegistry ? { listRegistry: (params) => host.facades.connector.listRegistry(params) } : void 0, host.facades.project?.getSkillManifestPreview ? { getManifestPreview: (projectId) => host.facades.project.getSkillManifestPreview(projectId) } : void 0, host.facades.connector?.listProjectUserConnectorPreferences ? { listProjectUserConnectorPreferences: (projectId) => host.facades.connector.listProjectUserConnectorPreferences(projectId) } : void 0), [host.facades]);
	return { collectResources: (0, import_react$3.useCallback)(async (projectId) => service.getProjectSessionResources(projectId), [service]) };
}
var import_react$3;
var init_use_project_resources_collector = __esmMin((() => {
	init_project();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_common$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/use-project-local-resource-injections.tsx
function useProjectLocalResourceInjections(input) {
	const { cwd, projectId, currentBlocks, projectSkills, useLocalSkills, connectors, availableConnectors, canEditPublicConnector = true, canEditPersonalConnector = true, onToggleConnector, onConnectConnector, onOpenConnectorDrawer } = input;
	const host = useModuleHost();
	const t = useTranslation();
	const { collectResources } = useProjectResourcesCollector();
	const [enabledOverrides, setEnabledOverrides] = (0, import_react$2.useState)({});
	const connectorTagText = (0, import_react$2.useMemo)(() => ({
		team: t("input.wbAdd.connectors.teamTag"),
		personal: ""
	}), [t]);
	const skillTeamTagText = t("input.wbAdd.skills.teamTag");
	const refreshProjectResourceFiles = (0, import_react$2.useCallback)(async (pid) => {
		const resources = await collectResources(pid);
		try {
			await host.facades?.project?.refreshLocalTaskResources?.(pid, resources);
		} catch (err) {
			console.error("[ProjectLocalResourceInjections] refreshProjectResourceFiles failed:", err);
		}
	}, [collectResources, host.facades?.project]);
	(0, import_react$2.useEffect)(() => {
		if (!projectId || !host.facades?.connector?.listProjectUserConnectorPreferences) return;
		let cancelled = false;
		host.facades.connector.listProjectUserConnectorPreferences(projectId).then((result) => {
			if (cancelled) return;
			const next = {};
			for (const preference of result.connectors ?? []) next[`${preference.authMode}:${preference.name}`] = preference.activeStatus;
			setEnabledOverrides(next);
			refreshProjectResourceFiles(projectId).catch(() => void 0);
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [
		host.facades?.connector,
		projectId,
		refreshProjectResourceFiles
	]);
	const displayConnectors = (0, import_react$2.useMemo)(() => connectors.map((connector) => ({
		...connector,
		enabled: connector.source === "project" ? enabledOverrides[connectorKey(connector)] ?? connector.enabled : connector.enabled
	})), [connectors, enabledOverrides]);
	const injectedProjectSkills = (0, import_react$2.useMemo)(() => (projectSkills ?? []).map((skill) => toProjectSkill(skill, skillTeamTagText)).filter((skill) => !!skill), [projectSkills, skillTeamTagText]);
	const [teamPriorityClosedPersonalKeys, setTeamPriorityClosedPersonalKeys] = (0, import_react$2.useState)(/* @__PURE__ */ new Set());
	const notifyConnectorEnabled = (0, import_react$2.useCallback)((connector) => {
		toast.success(t("connectorPanel.connectSuccess", { name: connector.displayName || connector.connectorName }));
	}, [t]);
	const handleToggleConnector = (0, import_react$2.useCallback)(async (item, enabled) => {
		const connector = fromConnectorMenuItem(item);
		if (connector.source !== "project") setTeamPriorityClosedPersonalKeys((prev) => {
			const k = connectorKey(connector);
			if (!prev.has(k)) return prev;
			const next = new Set(prev);
			next.delete(k);
			return next;
		});
		if (connector.source === "local") {
			if (enabled) {
				if ((await connectorStore.getState().connectMcpConnector(connector.connectorName)).success) notifyConnectorEnabled(connector);
			} else await connectorStore.getState().disconnectMcpConnector(connector.connectorName);
			return;
		}
		if (onToggleConnector) {
			const key = connectorKey(connector);
			setEnabledOverrides((prev) => {
				const next = { ...prev };
				if (connector.source === "project") next[key] = enabled;
				if (enabled) {
					const baseKey = connectorBaseKey(connector);
					for (const c of connectors) if (connectorKey(c) !== key && connectorBaseKey(c) === baseKey && c.source === "project") next[connectorKey(c)] = false;
				}
				return next;
			});
			try {
				await onToggleConnector(connector, enabled);
				if (enabled) notifyConnectorEnabled(connector);
			} catch {}
			return;
		}
		if (connector.source === "project") {
			const key = connectorKey(connector);
			setEnabledOverrides((prev) => ({
				...prev,
				[key]: enabled
			}));
			try {
				await host.facades?.connector?.updateProjectUserConnectorPreferences?.(projectId, { connectors: [{
					name: connector.connectorName,
					authMode: connector.authMode,
					activeStatus: enabled
				}] });
				refreshProjectResourceFiles(projectId).catch(() => void 0);
				if (enabled) notifyConnectorEnabled(connector);
			} catch {
				setEnabledOverrides((prev) => ({
					...prev,
					[key]: !enabled
				}));
			}
		}
	}, [
		connectors,
		host.facades?.connector,
		notifyConnectorEnabled,
		onToggleConnector,
		projectId,
		refreshProjectResourceFiles
	]);
	const { handleConnect } = useConnectorActions();
	const handleConnectConnector = (0, import_react$2.useCallback)(async (item) => {
		const connector = fromConnectorMenuItem(item);
		if (connector.source === "local") {
			await handleConnect({
				id: connector.connectorName,
				name: connector.displayName || connector.connectorName,
				description: connector.description,
				icon: connector.iconUrl || void 0
			}, !connector.everConnected);
			return;
		}
		await onConnectConnector?.(connector);
	}, [handleConnect, onConnectConnector]);
	const canToggleConnector = (0, import_react$2.useCallback)((connector) => connector.authMode === "public" ? canEditPublicConnector : canEditPersonalConnector, [canEditPersonalConnector, canEditPublicConnector]);
	const connectorMenuItems = (0, import_react$2.useMemo)(() => mergeConnectorsForMenu(displayConnectors, availableConnectors), [availableConnectors, displayConnectors]);
	(0, import_react$2.useEffect)(() => {
		const enabledTeamBaseKeys = /* @__PURE__ */ new Set();
		for (const c of connectorMenuItems) if (c.source === "project" && !!c.isConnected && c.enabled !== false) enabledTeamBaseKeys.add(connectorBaseKey(c));
		if (enabledTeamBaseKeys.size === 0) return;
		setTeamPriorityClosedPersonalKeys((prev) => {
			const next = new Set(prev);
			let changed = false;
			for (const c of connectorMenuItems) if (c.source !== "project" && !!c.isConnected && c.enabled !== false && enabledTeamBaseKeys.has(connectorBaseKey(c))) {
				const k = connectorKey(c);
				if (!next.has(k)) {
					next.add(k);
					changed = true;
				}
			}
			return changed ? next : prev;
		});
	}, [connectorMenuItems]);
	const projectWhitelistKeys = (0, import_react$2.useMemo)(() => new Set(connectors.map(connectorKey)), [connectors]);
	return (0, import_react$2.useMemo)(() => {
		const contextFiltered = filterConnectorsForTaskContext(connectorMenuItems, projectWhitelistKeys);
		const menuItems = (useLocalSkills ? excludeTeamConnectors(contextFiltered) : contextFiltered).map((connector) => connector.source !== "project" && teamPriorityClosedPersonalKeys.has(connectorKey(connector)) ? {
			...connector,
			enabled: false
		} : connector).map((connector) => toConnectorMenuItem(connector, canToggleConnector(connector), connectorTagText));
		return {
			skillsInjection: {
				cwd: cwd || "",
				useCloud: !useLocalSkills,
				projectId: useLocalSkills ? projectId : void 0,
				projectSkills: injectedProjectSkills,
				currentBlocks,
				uploadTarget: useLocalSkills ? "local" : "cloud"
			},
			connectorsInjection: {
				items: menuItems,
				allItems: menuItems,
				onToggleItem: handleToggleConnector,
				onConnectItem: handleConnectConnector,
				onSummonMore: onOpenConnectorDrawer,
				hideManageEntry: true
			},
			connectorChipInjection: {
				items: buildConnectorChipItems(menuItems),
				onToggleItem: handleToggleConnector,
				onConnectItem: handleConnectConnector
			}
		};
	}, [
		canToggleConnector,
		connectorMenuItems,
		connectorTagText,
		currentBlocks,
		cwd,
		handleConnectConnector,
		handleToggleConnector,
		injectedProjectSkills,
		onOpenConnectorDrawer,
		projectId,
		projectWhitelistKeys,
		teamPriorityClosedPersonalKeys,
		useLocalSkills
	]);
}
var import_react$2, toProjectSkill;
var init_use_project_local_resource_injections = __esmMin((() => {
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_use_connector_actions();
	init_useI18n();
	init_common$1();
	init_connector();
	init_connector_menu_model();
	init_use_project_resources_collector();
	toProjectSkill = (skill, teamTagText) => {
		const name = skill.name || skill.id;
		if (!name) return null;
		return {
			id: name,
			name,
			nameEn: skill.nameEn,
			description: skill.description,
			iconUrl: skill.iconUrl,
			marketplaceSource: skill.marketplaceSource,
			tag: teamTagText
		};
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-detail/connectors/connector-mappers.ts
var AUTH_MODES, PUBLIC_AUTH_CAPABILITY, connectorItemKey, normalizeConnectorSource, mapProjectConnectorToItem, mapRegistryConnectorToItem, buildAvailableConnectorItems;
var init_connector_mappers = __esmMin((() => {
	AUTH_MODES = ["personal", "public"];
	PUBLIC_AUTH_CAPABILITY = "public_auth_supported";
	connectorItemKey = (connector) => `${connector.authMode}:${connector.connectorName}`;
	normalizeConnectorSource = (connectors) => connectors.map((connector) => ({
		...connector,
		source: connector.source ?? (connector.authMode === "public" ? "project" : "personal")
	}));
	mapProjectConnectorToItem = (connector) => ({
		connectorName: connector.connectorName,
		displayName: connector.displayName || connector.connectorName,
		description: connector.description || "",
		iconUrl: connector.iconUrl ?? null,
		authMode: connector.authMode,
		configuredBy: connector.configuredBy,
		configuredByName: connector.configuredByName,
		connectedAccount: connector.connectedAccount,
		isConnected: connector.isConnected
	});
	mapRegistryConnectorToItem = (connector, authMode, userConnectedNames) => {
		const isConnected = authMode === "personal" && userConnectedNames ? userConnectedNames.has(connector.name) : connector.isConnected;
		return {
			connectorName: connector.name,
			displayName: connector.displayName || connector.name,
			description: connector.description || "",
			iconUrl: connector.iconUrl ?? null,
			authMode,
			configuredBy: null,
			configuredByName: null,
			connectedAccount: null,
			isConnected,
			enabled: authMode === "personal" ? isConnected : void 0
		};
	};
	buildAvailableConnectorItems = (registry, projectConnectors, userConnectedNames) => {
		const byKey = new Map(projectConnectors.map((connector) => [connectorItemKey(connector), connector]));
		return registry.flatMap((connector) => {
			return (connector.capabilities?.includes(PUBLIC_AUTH_CAPABILITY) ? AUTH_MODES : ["personal"]).map((authMode) => {
				const registryItem = mapRegistryConnectorToItem(connector, authMode, userConnectedNames);
				return byKey.get(connectorItemKey(registryItem)) ?? registryItem;
			});
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-input-resources.ts
function useProjectInputResources(input) {
	const { projectId, taskMode, projectSkills, projectConnectors = [], availableConnectors = [], listProjectConnectors } = input;
	const localMcpConfigs = useVisibleMcpConnectors();
	const localMcpStates = useConnectorStore((s) => s.mcpConnectorStates);
	const localMcpEverConnectedIds = useConnectorStore((s) => s.mcpEverConnectedIds);
	(0, import_react$1.useEffect)(() => {
		if (taskMode !== "local") return;
		connectorStore.getState().loadMcpConnectors();
	}, [taskMode]);
	const hasLocalConnecting = (0, import_react$1.useMemo)(() => taskMode === "local" && Object.values(localMcpStates).some((s) => s?.status === "connecting"), [taskMode, localMcpStates]);
	(0, import_react$1.useEffect)(() => {
		if (!hasLocalConnecting) return;
		const timer = setInterval(() => {
			connectorStore.getState().loadMcpConnectors();
		}, 3e3);
		return () => clearInterval(timer);
	}, [hasLocalConnecting]);
	const localConnectorItems = (0, import_react$1.useMemo)(() => {
		if (taskMode !== "local") return [];
		return localMcpConfigs.map((c) => {
			const isConnected = localMcpStates[c.id]?.status === "connected";
			return {
				connectorName: c.id,
				displayName: c.name,
				description: c.description || "",
				iconUrl: c.icon || null,
				authMode: "personal",
				configuredBy: null,
				configuredByName: null,
				connectedAccount: null,
				isConnected,
				enabled: isConnected,
				everConnected: localMcpEverConnectedIds.has(c.id),
				source: "local"
			};
		});
	}, [
		taskMode,
		localMcpConfigs,
		localMcpStates,
		localMcpEverConnectedIds
	]);
	const effectiveConnectors = (0, import_react$1.useMemo)(() => {
		if (taskMode !== "local") return normalizeConnectorSource(projectConnectors);
		const publicOnly = projectConnectors.filter((c) => c.authMode === "public").map((c) => ({
			...c,
			source: c.source ?? "project"
		}));
		const existing = new Set(publicOnly.map((c) => c.connectorName));
		const additional = localConnectorItems.filter((c) => !existing.has(c.connectorName));
		return [...publicOnly, ...additional];
	}, [
		taskMode,
		projectConnectors,
		localConnectorItems
	]);
	const effectiveAvailableConnectors = (0, import_react$1.useMemo)(() => {
		if (taskMode !== "local") return normalizeConnectorSource(availableConnectors);
		return localConnectorItems;
	}, [
		taskMode,
		availableConnectors,
		localConnectorItems
	]);
	const effectiveSkills = (0, import_react$1.useMemo)(() => {
		if (taskMode !== "local") return projectSkills;
		return (projectSkills ?? []).map((skill) => ({
			...skill,
			source: "project"
		}));
	}, [projectSkills, taskMode]);
	const [projectPublicConnectorConfigs, setProjectPublicConnectorConfigs] = (0, import_react$1.useState)([]);
	(0, import_react$1.useEffect)(() => {
		if (!projectId || !listProjectConnectors) {
			setProjectPublicConnectorConfigs([]);
			return;
		}
		let cancelled = false;
		listProjectConnectors(projectId).then((res) => {
			if (cancelled) return;
			setProjectPublicConnectorConfigs((res.connectors ?? []).filter((c) => c.authMode === "public" && c.isConnected).map((c) => {
				const id = c.connectorName || c.name || "";
				return {
					id,
					name: c.displayName || id,
					description: c.description || "",
					icon: c.iconUrl || ""
				};
			}).filter((c) => c.id));
		}).catch(() => {
			if (!cancelled) setProjectPublicConnectorConfigs([]);
		});
		return () => {
			cancelled = true;
		};
	}, [projectId, listProjectConnectors]);
	return {
		effectiveSkills,
		effectiveConnectors,
		effectiveAvailableConnectors,
		projectPublicConnectorConfigs
	};
}
var import_react$1;
var init_project_input_resources = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_connector();
	init_connector_mappers();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/utils/custom-expert-avatar.ts
function addLookupKey(map, key, avatar) {
	const k = key?.trim();
	if (k && !map.has(k)) map.set(k, avatar);
}
function addI18nLookupKeys(map, profession, avatar) {
	if (!profession) return;
	if (typeof profession === "string") addLookupKey(map, profession, avatar);
	else {
		addLookupKey(map, profession.zh, avatar);
		addLookupKey(map, profession.en, avatar);
	}
}
/** 从本地已安装专家列表构建 多key → avatar 映射。 */
function buildLocalCustomExpertAvatarMap(experts) {
	const map = /* @__PURE__ */ new Map();
	for (const e of experts) {
		const avatar = e.avatar?.trim();
		if (!avatar) continue;
		addLookupKey(map, e.id, avatar);
		addI18nLookupKeys(map, e.name, avatar);
		addLookupKey(map, e.folderName, avatar);
		addI18nLookupKeys(map, e.profession, avatar);
	}
	return map;
}
/** 尝试用多种 key 从本地映射中查找 avatar。 */
function resolveCustomExpertAvatarFromLocal(map, keys) {
	return map.get(keys.sourceId ?? "") || map.get(keys.name ?? "") || map.get(keys.expertId ?? "") || void 0;
}
function normalizeInitPrompt(raw) {
	if (!raw) return;
	if (typeof raw === "string") {
		const trimmed = raw.trim();
		return trimmed ? {
			zh: trimmed,
			en: trimmed
		} : void 0;
	}
	const zh = raw.zh?.trim();
	const en = raw.en?.trim();
	return zh || en ? {
		zh,
		en
	} : void 0;
}
function addInitPromptLookupKey(map, key, prompt) {
	const k = key?.trim();
	if (k && !map.has(k)) map.set(k, prompt);
}
function addInitPromptI18nKeys(map, field, prompt) {
	if (!field) return;
	if (typeof field === "string") addInitPromptLookupKey(map, field, prompt);
	else {
		addInitPromptLookupKey(map, field.zh, prompt);
		addInitPromptLookupKey(map, field.en, prompt);
	}
}
/** 从本地已安装专家列表构建 多key → defaultInitPrompt 映射。 */
function buildLocalCustomExpertInitPromptMap(experts) {
	const map = /* @__PURE__ */ new Map();
	for (const e of experts) {
		const prompt = normalizeInitPrompt(e.defaultInitPrompt);
		if (!prompt) continue;
		addInitPromptLookupKey(map, e.id, prompt);
		addInitPromptI18nKeys(map, e.name, prompt);
		addInitPromptLookupKey(map, e.folderName, prompt);
		addInitPromptI18nKeys(map, e.profession, prompt);
	}
	return map;
}
/** 尝试用多种 key 从本地映射中查找 defaultInitPrompt。 */
function resolveCustomExpertInitPromptFromLocal(map, keys) {
	return map.get(keys.sourceId ?? "") || map.get(keys.name ?? "") || map.get(keys.expertId ?? "") || void 0;
}
var init_custom_expert_avatar = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/task-chat/utils/project-expert-mapping.ts
/**
* 项目专家列表的统一数据链路。
*
* 背景（bug 对齐）：项目页「新建任务」与项目「本地任务续聊输入框」两处专家列表
* 此前走不同代码：前者 listExperts + listCustomExperts 合并并过滤专家团，
* 后者只调 listExperts、不含自定义专家、也不过滤专家团，导致两处列表不一致。
* 现统一到本文件，保证两处内容与字段映射完全对齐。
*/
/** 官方专家后端响应项 → ExpertItem（与 project-detail-page 加载逻辑一致）。 */
function mapOfficialExpertToItem(e, isEn) {
	const rawIcon = e.icon?.trim() || "";
	const iconUrl = /^(https?:\/\/|data:image\/)/i.test(rawIcon) ? rawIcon : void 0;
	return {
		id: e.expertId,
		name: isEn ? e.professionEn || e.displayNameEn || e.professionZh || e.displayNameZh || e.expertId : e.professionZh || e.professionEn || e.displayNameZh || e.displayNameEn || e.expertId,
		avatar: iconUrl,
		description: isEn ? e.descriptionEn || e.descriptionZh || "" : e.descriptionZh || e.descriptionEn || "",
		categoryId: e.categories?.[0],
		expertType: e.expertType,
		quickPrompt: e.quickPrompts?.[0]
	};
}
/** 自定义专家后端响应项 → ExpertItem（与 project-detail-page 加载逻辑一致）。 */
function mapCustomExpertToItem(e, localAvatarMap, localInitPromptMap) {
	const backendAvatar = resolveAvatarUrl(e.icon);
	const lookupKeys = {
		sourceId: e.sourceId,
		name: e.name,
		expertId: e.expertId
	};
	const localAvatar = localAvatarMap ? resolveCustomExpertAvatarFromLocal(localAvatarMap, lookupKeys) : void 0;
	const defaultInitPrompt = localInitPromptMap ? resolveCustomExpertInitPromptFromLocal(localInitPromptMap, lookupKeys) : void 0;
	const desc = e.description || "";
	const rawSourceId = e.sourceId || "";
	const safePluginName = /^[a-zA-Z0-9._-]+$/.test(rawSourceId) && rawSourceId !== "." && rawSourceId !== ".." ? rawSourceId : e.expertId || "";
	return {
		id: e.expertId,
		name: e.name || e.expertId,
		description: desc,
		avatar: backendAvatar || localAvatar,
		localExpertName: safePluginName,
		quickPrompt: void 0,
		defaultInitPrompt
	};
}
/** 双语文本按当前 locale 解析，回退方向与非项目任务链路一致（zh 缺失回退 en，反之亦然）。 */
function localizeExpertI18nText(value, isEn) {
	if (!value) return "";
	return ((isEn ? value.en ?? value.zh : value.zh ?? value.en) ?? "").trim();
}
/**
* 解析专家召唤时预填输入框的默认提示词，对齐非项目任务（顶级对话）链路的取值方式。
*
* - 市场/官方专家（无 localExpertName）：调 ExpertFacade.getExpert 拿权威 defaultInitPrompt，
*   与 main-content-core.handleSelectRecentExpert 完全同源（同一后端字段 + 同一 locale 回退），
*   修复此前项目流直接读 quickPrompts[0] 导致的中英不一致。
* - 项目自定义专家（有 localExpertName，op-platform 查不到）：getExpert 会 404，
*   回退用列表项 quickPrompt（后端仅提供 name/description，无 defaultInitPrompt）。
*/
async function resolveExpertDefaultPrompt(expertFacade, item, isEn, enterpriseId) {
	if (item && !item.localExpertName && expertFacade?.getExpert) try {
		const resolved = localizeExpertI18nText((await expertFacade.getExpert({
			expertId: item.id,
			locale: isEn ? "en" : "zh",
			...enterpriseId ? { enterpriseId } : {}
		}))?.expert?.defaultInitPrompt, isEn);
		if (resolved) return resolved;
	} catch (err) {
		console.warn("[projectExpertMapping] getExpert for defaultInitPrompt failed, fallback to quickPrompt:", err);
	}
	return localizeExpertI18nText(item?.quickPrompt, isEn);
}
/** ExpertItem → cb-chat-ui RecentExpert（与新建任务选择器展示字段一致）。 */
function expertItemToRecentExpert(item) {
	const avatarUrl = item.avatar && /^(https?:\/\/|data:image\/)/i.test(item.avatar) ? item.avatar : void 0;
	return {
		id: item.id,
		profession: item.name,
		name: item.description || item.name,
		avatarUrl,
		summonedAt: Date.now(),
		industryId: item.categoryId,
		fallbackBackground: getAvatarFallbackBackground(item.name),
		initial: item.name.slice(0, 1)
	};
}
/**
* 拉取项目专家列表（官方 + 自定义），并过滤专家团（#46348）。
* 与 project-detail-page 的加载 + use-collab-expert-selector 的过滤逻辑对齐，
* 保证「项目页新建任务」与「本地任务续聊输入框」两处专家列表一致。
*/
async function fetchProjectExpertItems(facade, projectId, locale, expertFacade) {
	if (!facade?.listExperts || !projectId) return [];
	const isEn = String(locale ?? getLocale()).toLowerCase() === "en";
	const officialPromise = facade.listExperts(projectId).catch(() => ({ items: [] }));
	const customPromise = facade.listCustomExperts?.(projectId).catch(() => ({ items: [] })) ?? Promise.resolve({ items: [] });
	const localExpertsPromise = expertFacade?.getCustomExperts ? expertFacade.getCustomExperts({}).then((res) => res.experts ?? []).catch(() => []) : Promise.resolve([]);
	const [officialRes, customRes, localExperts] = await Promise.all([
		officialPromise,
		customPromise,
		localExpertsPromise
	]);
	const localAvatarMap = buildLocalCustomExpertAvatarMap(localExperts);
	const localInitPromptMap = buildLocalCustomExpertInitPromptMap(localExperts);
	const officialItems = (officialRes?.items ?? []).map((e) => mapOfficialExpertToItem(e, isEn));
	const customItems = (customRes?.items ?? []).map((e) => mapCustomExpertToItem(e, localAvatarMap, localInitPromptMap));
	return [...officialItems, ...customItems].filter((item) => item.expertType !== "team");
}
var init_project_expert_mapping = __esmMin((() => {
	init_i18n();
	init_avatar_url();
	init_custom_expert_avatar();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/use-project-local-chat-config.tsx
/**
* 项目本地任务的聊天配置中间层。
* MainContentCore 只消费返回的通用 provider/slot，不直接理解项目专家和资源拼装细节。
*/
function useProjectLocalChatConfig(input) {
	const { projectId, cwd, currentBlocks, locale, projectPublicConnectorConfigs, onOpenConnectorDrawer, onInsertBlocks } = input;
	const host = useModuleHost();
	const t = useTranslation();
	const adapter = host.adapter;
	const projectConnectorItems = (0, import_react.useMemo)(() => projectPublicConnectorConfigs.map((connector) => ({
		connectorName: connector.id,
		displayName: connector.name || connector.id,
		description: connector.description || "",
		iconUrl: connector.icon || null,
		authMode: "public",
		configuredBy: null,
		configuredByName: null,
		connectedAccount: null,
		isConnected: true,
		enabled: true,
		source: "project"
	})), [projectPublicConnectorConfigs]);
	const { effectiveConnectors, effectiveAvailableConnectors } = useProjectInputResources({
		taskMode: projectId ? "local" : void 0,
		projectConnectors: projectConnectorItems,
		availableConnectors: []
	});
	const [projectSkills, setProjectSkills] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		if (!projectId) {
			setProjectSkills(void 0);
			return;
		}
		let cancelled = false;
		host.facades?.project?.listSkills?.(projectId).then((res) => {
			if (!cancelled) setProjectSkills(mapProjectSkillItemsToSkillItems((res?.items ?? []).filter((s) => !s.status || s.status === "ready")));
		}).catch(() => {
			if (!cancelled) setProjectSkills([]);
		});
		return () => {
			cancelled = true;
		};
	}, [host.facades?.project, projectId]);
	const { skillsInjection, connectorsInjection, connectorChipInjection } = useProjectLocalResourceInjections({
		cwd: cwd || "",
		projectId: projectId || "",
		currentBlocks,
		projectSkills,
		useLocalSkills: true,
		connectors: effectiveConnectors,
		availableConnectors: effectiveAvailableConnectors,
		onConnectConnector: async () => void 0,
		onOpenConnectorDrawer
	});
	const recentProvider = (0, import_react.useMemo)(() => {
		if (!projectId) return;
		return { getRecentExperts: async () => {
			return { experts: (await fetchProjectExpertItems(host.facades.project, projectId, locale, host.facades.expert)).map(expertItemToRecentExpert) };
		} };
	}, [
		host.facades.project,
		host.facades.expert,
		locale,
		projectId
	]);
	const resolveExpertSelection = (0, import_react.useCallback)(async (expertId, targetLocale) => {
		if (!projectId) return null;
		const matched = (await fetchProjectExpertItems(host.facades.project, projectId, targetLocale, host.facades.expert)).find((item) => item.id === expertId);
		if (!matched) return null;
		const expert = expertItemToRecentExpert(matched);
		const isEn = targetLocale.toLowerCase() === "en";
		const cachedDip = matched.defaultInitPrompt;
		const defaultInitPrompt = (cachedDip ? (isEn ? cachedDip.en ?? cachedDip.zh : cachedDip.zh ?? cachedDip.en)?.trim() : void 0) || await resolveExpertDefaultPrompt(host.facades?.expert, matched, isEn, host.accountInfo?.enterpriseId);
		return {
			...expert,
			prompt: expert.name || expert.id,
			isProjectExpert: true,
			...defaultInitPrompt ? { defaultInitPrompt } : {}
		};
	}, [
		host.facades.project,
		host.facades?.expert,
		host.accountInfo?.enterpriseId,
		projectId
	]);
	const fileProvider = useFileMentionProvider((0, import_react.useCallback)((id) => t(id), [t]), adapter ?? void 0, cwd || void 0);
	const { ready: netdriveReady } = useProjectNetDriveReady(adapter, projectId, useTencentNetDriveKnowledgeFeature());
	const netdriveSource = useNetdriveClientSource(projectId, netdriveReady);
	const localMentionProvider = useLocalTaskAggregatedProvider(projectId || "", fileProvider, netdriveSource);
	const mentionConfig = (0, import_react.useMemo)(() => {
		if (!projectId) return;
		return {
			providers: [localMentionProvider],
			panelClassName: WB_MENTION_PANEL_COLLAB_CLASS
		};
	}, [projectId, localMentionProvider]);
	const insertBlocks = (0, import_react.useCallback)((blocks) => {
		onInsertBlocks?.(blocks);
	}, [onInsertBlocks]);
	const { extraActionItems: additionalActionItems, pickerNodes: attachmentPickerNodes } = useProjectLocalAttachmentActions({
		adapter,
		projectId: projectId || "",
		onInsertBlocks: insertBlocks
	});
	const addFileItems = (0, import_react.useMemo)(() => additionalActionItems.map((item) => ({
		id: item.id,
		label: item.label,
		icon: item.icon,
		onSelect: item.onSelect
	})), [additionalActionItems]);
	return {
		recentProvider,
		resourceSlots: [],
		resolveExpertSelection,
		mentionConfig: projectId ? mentionConfig : void 0,
		additionalActionItems: projectId ? additionalActionItems : [],
		addFileItems: projectId ? addFileItems : [],
		skillsInjection: projectId ? skillsInjection : void 0,
		connectorsInjection: projectId ? connectorsInjection : void 0,
		connectorChipInjection: projectId ? connectorChipInjection : void 0,
		attachmentPickerNodes: projectId ? attachmentPickerNodes : null
	};
}
/**
* 给一组 mention suggestion 的 group.label 追加 count（issue #55666 第 7 条）。
* 例如 "我的待办计划" → "我的待办计划 (3)"。
* 不修改原 group 常量；count 为空时保留原 label，避免 "(0)"。
*/
function withGroupCount(items) {
	if (items.length === 0) return items;
	const groupBase = items[0].group;
	if (!groupBase) return items;
	const newGroup = {
		...groupBase,
		label: `${groupBase.label} (${items.length})`
	};
	return items.map((item) => ({
		...item,
		group: newGroup
	}));
}
/**
* 把 projectId + ready 转成一个稳定的 NetdriveMentionSource。
* 与 useCollabMention 内同款写法对齐：通过 getProjectStores 拿到按 projectId 索引的实例池，
* 单例在资产 Tab / 动态 Tab 间共用，避免重复发起 access-token。
*
* 导出供 project-detail-content.tsx 本地模式调用点共用（issue #55666）。
*/
function useNetdriveClientSource(projectId, ready) {
	const storeRef = (0, import_react.useRef)(projectId ? getProjectStores(projectId).netDriveServiceStore : null);
	(0, import_react.useEffect)(() => {
		storeRef.current = projectId ? getProjectStores(projectId).netDriveServiceStore : null;
	}, [projectId]);
	const getClient = (0, import_react.useCallback)(() => {
		if (!ready || !storeRef.current) return null;
		try {
			return storeRef.current.getState().getClient();
		} catch {
			return null;
		}
	}, [ready]);
	return (0, import_react.useMemo)(() => ({
		ready,
		getClient
	}), [ready, getClient]);
}
function useLocalTaskAggregatedProvider(projectId, fileProvider, netdriveSource) {
	const t = useTranslation();
	const netdriveReady = !!netdriveSource?.ready;
	const getNetdriveClient = (0, import_react.useCallback)(() => netdriveSource?.getClient() ?? null, [netdriveSource]);
	return (0, import_react.useMemo)(() => ({
		id: "local-aggregated",
		name: "待办计划与文件",
		icon: "docs",
		showInMenu: true,
		hasSubList: false,
		placeholder: "搜索待办事项或文件...",
		searchEmptyText: "没有找到匹配的内容",
		convertToContentBlock: (suggestion) => {
			const meta = suggestion.metadata;
			if (meta?.type === "todo") return createLocalTodoChip({
				todoId: (typeof meta.todoId === "string" ? meta.todoId : void 0) ?? suggestion.id,
				title: suggestion.label,
				projectId: (typeof meta.projectId === "string" ? meta.projectId : projectId) || projectId,
				statusType: typeof meta.statusType === "string" ? meta.statusType : void 0,
				statusName: suggestion.description,
				description: typeof meta.todoDescription === "string" ? meta.todoDescription : void 0,
				summary: typeof meta.todoSummary === "string" ? meta.todoSummary : void 0,
				snapshotSessionId: typeof meta.snapshotSessionId === "string" ? meta.snapshotSessionId : void 0,
				tags: Array.isArray(meta.todoTags) ? meta.todoTags : void 0
			});
			if (suggestion.convertToContentBlock) return suggestion.convertToContentBlock(suggestion, { text: "" });
			return {
				type: "text",
				text: `@${suggestion.label}`
			};
		},
		fetchMenuSuggestions: async () => {
			const netdrivePager = netdriveReady && getNetdriveClient() ? createNetdrivePager(getNetdriveClient()) : null;
			const [todoResult, netdriveBatch, fileResult] = await Promise.all([
				projectId ? fetchTodoSuggestions(projectId, void 0, void 0, t) : Promise.resolve([]),
				netdrivePager ? netdrivePager.pull(NETDRIVE_PAGE_SIZE) : Promise.resolve([]),
				fileProvider.fetchMenuSuggestions?.() ?? Promise.resolve({ suggestions: [] })
			]);
			const todoItems = todoResult.map(({ convertToContentBlock: _cb, ...s }) => ({
				...s,
				group: LOCAL_TODO_GROUP
			}));
			const netdriveItems = netdriveBatch.map(({ entry, parentPath }) => netdriveEntryToSuggestion(entry, parentPath));
			const workspaceItems = fileResult.suggestions ?? [];
			const suggestions = [
				...withGroupCount(todoItems),
				...withGroupCount(netdriveItems),
				...withGroupCount(workspaceItems)
			];
			if (!netdrivePager || !netdrivePager.hasMore) return { suggestions };
			return {
				suggestions,
				hasMore: true,
				loadMore: () => pullNetdrivePageAsMentionResult(netdrivePager)
			};
		},
		fetchSuggestions: async (request) => {
			const keyword = request.text.startsWith("@") ? request.text.substring(1).trim() : request.text.trim();
			if (keyword) {
				const [todoResult, netdriveItems, fileResult] = await Promise.all([
					projectId ? fetchTodoSuggestions(projectId, keyword, void 0, t) : Promise.resolve([]),
					fetchNetdriveSuggestions(getNetdriveClient, netdriveReady, keyword),
					fileProvider.fetchSuggestions?.(request) ?? Promise.resolve({ suggestions: [] })
				]);
				const todoItems = todoResult.map(({ convertToContentBlock: _cb, ...s }) => ({
					...s,
					group: LOCAL_TODO_GROUP
				}));
				const workspaceItems = fileResult.suggestions ?? [];
				return { suggestions: [
					...withGroupCount(todoItems),
					...withGroupCount(netdriveItems),
					...withGroupCount(workspaceItems)
				] };
			}
			const netdrivePager = netdriveReady && getNetdriveClient() ? createNetdrivePager(getNetdriveClient()) : null;
			const [todoResult, netdriveBatch, fileResult] = await Promise.all([
				projectId ? fetchTodoSuggestions(projectId, void 0, void 0, t) : Promise.resolve([]),
				netdrivePager ? netdrivePager.pull(NETDRIVE_PAGE_SIZE) : Promise.resolve([]),
				fileProvider.fetchSuggestions?.(request) ?? Promise.resolve({ suggestions: [] })
			]);
			const todoItems = todoResult.map(({ convertToContentBlock: _cb, ...s }) => ({
				...s,
				group: LOCAL_TODO_GROUP
			}));
			const netdriveItems = netdriveBatch.map(({ entry, parentPath }) => netdriveEntryToSuggestion(entry, parentPath));
			const workspaceItems = fileResult.suggestions ?? [];
			const suggestions = [
				...withGroupCount(todoItems),
				...withGroupCount(netdriveItems),
				...withGroupCount(workspaceItems)
			];
			if (!netdrivePager || !netdrivePager.hasMore) return { suggestions };
			return {
				suggestions,
				hasMore: true,
				loadMore: () => pullNetdrivePageAsMentionResult(netdrivePager)
			};
		}
	}), [
		projectId,
		t,
		fileProvider,
		netdriveReady,
		getNetdriveClient
	]);
}
var import_react, LOCAL_TODO_GROUP, NETDRIVE_PAGE_SIZE;
var init_use_project_local_chat_config = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_use_file_mention_provider();
	init_wb_mention_panel();
	init_use_tencent_netdrive_knowledge_feature();
	init_useI18n();
	init_context();
	init_create_local_todo_chip();
	init_use_netdrive_mention_provider();
	init_use_todo_mention_provider();
	init_project_skill_mapping();
	init_project_netdrive_store();
	init_use_project_local_attachment_actions();
	init_use_project_local_resource_injections();
	init_project_input_resources();
	init_project_expert_mapping();
	LOCAL_TODO_GROUP = {
		id: "todo",
		label: "我的待办计划",
		order: 0
	};
	NETDRIVE_PAGE_SIZE = 5;
}));
//#endregion
export { prepareBlocksForSend as $, init_use_todo_mention_provider as A, connectorBaseKey as B, useProjectResourcesCollector as C, mapProjectSkillItemToSkillItem as D, init_project_skill_mapping as E, init_use_netdrive_mention_provider as F, init_collaborator_avatar_stack as G, init_apply_join_page as H, netdriveEntryToSuggestion as I, extractTodoContext as J, encodeMsgSnippetForOccupier as K, pullNetdrivePageAsMentionResult as L, init_create_local_todo_chip as M, createNetdrivePager as N, mapProjectSkillItemsToSkillItems as O, fetchNetdriveSuggestions as P, init_chat_message_utils as Q, init_netdrive_block_utils as R, init_use_project_resources_collector as S, useProjectLocalAttachmentActions as T, ApplyJoinPage as U, init_connector_menu_model as V, CollaboratorAvatarStack as W, formatTodoReferenceXml as X, formatTdriveAttachmentsXml as Y, formatWorkSummaryXml as Z, init_connector_mappers as _, expertItemToRecentExpert as a, buildCompactDividerCollabMessage as at, init_use_project_local_resource_injections as b, buildLocalCustomExpertAvatarMap as c, stripInjectedContext as ct, resolveCustomExpertAvatarFromLocal as d, init_message_reference as dt, renderMessageReferenceXml as et, resolveCustomExpertInitPromptFromLocal as f, init_no_access as ft, connectorItemKey as g, buildAvailableConnectorItems as h, useProjectLocalChatConfig as i, processNotificationLoop as it, createLocalTodoChip as j, fetchTodoSuggestions as k, buildLocalCustomExpertInitPromptMap as l, MESSAGE_REFERENCE_MENTION_TYPE as lt, useProjectInputResources as m, useLocalTaskAggregatedProvider as n, init_process_notification_loop as nt, init_project_expert_mapping as o, init_compact_divider_utils as ot, init_project_input_resources as p, no_access_default as pt, extractMessageReferences as q, useNetdriveClientSource as r, processNotificationStream as rt, resolveExpertDefaultPrompt as s, init_strip_injected_context as st, init_use_project_local_chat_config as t, stripUserIdMarker as tt, init_custom_expert_avatar as u, buildMessageUri as ut, mapProjectConnectorToItem as v, init_use_project_local_attachment_actions as w, useProjectLocalResourceInjections as x, normalizeConnectorSource as y, init_netdrive_selector_modal as z };
