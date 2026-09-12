import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Hu as SkillConflictDialog, Ku as useAgentMail, Tc as useAgentServices, Uu as ActivationCard, Vu as SwitchBindingDialog, Wu as useActivationConflictGuard, Xl as init_services, gi as isPickLocationTool, mi as getPoiResult, mo as useQrDataUrl, pi as init_poi, po as init_use_qr_data_url, t as init_agent_mail$1, vi as isPoiToolPending } from "./agent-mail-CiuzbR2o.js";
import { Ba as Tooltip, Cn as ToolArgsValidator, Ct as createImageGenRenderer, Dt as FetchMcpResourceRenderer, Et as McpMatchToolRenderer, Gt as init_plan_task$1, Jt as normalizePlanTaskText, Kt as PlanTask, Lt as createPlanUpdateRenderer, Mn as init_lib, Nr as QuestionAnswerDisplay, Ot as createMcpToolRenderer, Pt as createTaskToolRenderer, Qt as createWebFetchRenderer, Ss as toStringOrEmpty, Tt as McpIntegrationRenderer, Ut as createSearchReferenceRenderer, Vn as LoadingDots, Vr as WidgetRenderer, Yt as createWebSearchRenderer, _n as createWriteFileRenderer, ba as InputContextTag, bt as createSkillRenderer, cn as createListFileRenderer, gt as createConnectCloudServiceRenderer, in as isImageGenToolName, jn as diffLines, mn as createDeleteFileRenderer, oi as MarkdownRenderer, on as createReadLintsRenderer, qt as TaskStatus, t as init_src, tn as createUnknownToolRenderer, un as createExecuteCommandRenderer, vt as createOpenResultViewRenderer, xn as createReadFileRenderer, xs as toRecordOrEmpty, zt as createPlanCreateRenderer } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { a as init_i18n, n as i18n } from "./i18n-DH8xcldp.js";
import { t as require_classnames } from "./classnames-BYn3_ESJ.js";
import { Ht as Camera, I as PencilLine, It as ChevronUp, Jt as BookOpenCheck, L as PackageCheck, Lt as ChevronRight, Nt as CircleAlert, Ot as CloudUpload, Z as LayoutPanelTop, _ as SwatchBook, at as Grid2x2Plus, d as Type, et as KeyRound, ft as Files, gt as Eye, h as Tags, ht as FileCodeCorner, jt as CircleCheck, k as ScanSearch, m as ToolCase, mt as FilePlusCorner, nt as ImageDown, o as Variable, p as Trash2, q as LoaderCircle, qt as BookOpen, s as Users, t as init_lucide_react, ut as FolderOpen, zt as ChevronDown } from "./lucide-react-CmX0JwWL.js";
import { a as init_i18n$1, n as getLocale, u as t } from "./i18n-Bt_Wap4p.js";
import { a as formatAutomationCwdLabel, u as init_file_path } from "./file-path-DzzGeaqx.js";
import { ct as useQuestionContextOptional, t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { A as message, dt as AvatarGroup, lt as Avatar, t as init_foundation } from "./foundation-QOglV606.js";
import { Cr as init_ArtifactFileTypeIcon, Mn as FailedIcon, Sr as ArtifactFileTypeIcon, n as init_icons, nr as ChevronRightIcon } from "./icons-Cj3UopO9.js";
import { n as useI18n, r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { S as useRouterContextSafe, t as init_router } from "./router-O5ZnP5xt.js";
import { D as chatStateStore, O as init_chat_state_store, T as ChatState, a as SearchToolAdapter, o as init_search_tool_adapter } from "./message-converter-CCG28Swi.js";
import { n as todoStatusStore, t as init_todo_status_store } from "./todo-status-store-ElN_35v9.js";
import { C as WarnIcon, D as ToolRendererPriority, E as init_tool_icons, O as init_tool_protocol, S as ViewedIcon, T as WidgetIcon, _ as SearchIcon, a as CheckCircleIcon, b as TerminalIcon, c as DebugIcon, d as FailedIcon$1, f as FolderIcon, g as PlanIcon, h as LocationIcon, i as ArrowIcon$1, l as DeleteIcon, m as LoadingIcon, n as PoiResultRenderer, o as CloudIcon, p as ImageIcon, r as AgentIcon, s as DatabaseIcon, t as init_poi_result, u as EditIcon, v as SkillIcon, w as WebIcon, x as ToolIcon, y as SuccessIcon } from "./poi-result-CZqkqeUY.js";
import { n as parsePayload, t as init_visualizer_show_widget_payload } from "./visualizer-show-widget-payload-BO60iXXM.js";
//#region ../../packages/agent-ui/src/utils/html-artifact-preview.ts
/**
* HTML 类 media-artifact 的统一预览判定：命中则返回其 url，供调用方走
* openArtifact('preview', { url }) 只开一个 preview（网页）tab。
*
* 判定口径：type=media-artifact + category=artifact + url 后缀 .html/.htm。
*
* 这是 HTML→BrowserPreview 重定向的**单一事实来源**：
*   - App.tsx::onOpenResultView（open_result_view 工具自动弹出）
*   - main-content-core.tsx::dispatchArtifactSlotSelect（ArtifactSlotPanel 点击）
*   - detail-panel-wrapper.tsx::performArtifactSelectCore（DetailPanel 列表/tab 点击）
* 三处统一 import 本函数，避免各自维护同一份判定导致漏改分叉。
*
* 注：`@genie/context-viewer-components` 里 DetailPanel handleItemSelect 的 HTML 守卫
* 位于另一个包，无法反向依赖 agent-ui，仍为独立副本；改判定口径时需一并同步。
*/
function getHtmlArtifactPreviewUrl(artifact) {
	if (!artifact || artifact.type !== "media-artifact" || artifact.category !== "artifact") return;
	const url = artifact.url;
	if (!url || !/\.(?:html|htm)(?:[?#].*)?$/i.test(url)) return;
	return url;
}
/**
* 是否应跳过 BrowserPreview（即 HTML 产物不重定向到 preview，保持 artifacts/srcDoc 路径）。
*
* 通过 duck-type 检查 adapter 是否有 `resolvePreviewUrl` 能力来判断是否可解析
* `agent://` 沙箱 URL：
*   - Desktop 适配器实现了 resolvePreviewUrl（daemon sandboxPreview:registerMount RPC
*     将 agent:// 转换为本地代理 HTTP URL）→ BrowserPreview webview 可正常加载 → 不跳过。
*   - Web Agent 的 CloudAgentAdapter 未实现此方法 → agent:// URL 无法解析 → 跳过
*     BrowserPreview，回退到 artifacts 视图的 iframe srcDoc 兜底
*     （media-preview/index.tsx 已有此渲染逻辑）。
*
* `isProjectSession` / `forceCloudEnvironment` / `adapter.environmentType` 参数保留接口
* 兼容但不再影响决策，实际由 resolvePreviewUrl 能力决定。
*/
function shouldSkipBrowserPreview(params) {
	const adapter = params.adapter;
	return !(typeof adapter === "object" && adapter !== null && typeof adapter.resolvePreviewUrl === "function");
}
/**
* HTML 产物卡片右上角 🌐 按钮点击的统一入口：agent:// 沙箱路径先经
* resolvePreviewUrl 解析为 sandbox-preview 本地代理 URL，再走 openExternal
* 在系统外部浏览器打开。非 agent:// URL 直接打开。
*/
async function openArtifactUrlInExternalBrowser(url, adapter, sessionId) {
	let targetUrl = url;
	if (url.startsWith("agent://")) {
		const resolver = adapter?.resolvePreviewUrl?.bind(adapter);
		if (resolver && sessionId) try {
			const resolved = await resolver(sessionId, url);
			if (resolved && !resolved.startsWith("agent://")) targetUrl = resolved;
		} catch (error) {
			console.warn("[openArtifactUrlInExternalBrowser] resolvePreviewUrl failed:", error);
		}
	}
	adapter?.openExternal?.(targetUrl);
}
var init_html_artifact_preview = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/agent-mail/agent-mail-renderer.less
var init_agent_mail_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/agent-mail/agent-mail-activation-card.tsx
function isFirstCardForSession(sessionId, toolId) {
	if (!sessionId) return true;
	const existing = firstCardBySession.get(sessionId);
	return !existing || existing === toolId;
}
function claimFirstCard(sessionId, toolId) {
	if (!sessionId) return;
	if (!firstCardBySession.has(sessionId)) firstCardBySession.set(sessionId, toolId);
}
var import_react$53, import_jsx_runtime$51, firstCardBySession, AgentMailPendingCard, AgentMailDuplicateHint, AgentMailActivationCard;
var init_agent_mail_activation_card = __esmMin((() => {
	init_agent_mail_renderer$1();
	import_react$53 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_foundation();
	init_useI18n();
	init_agent_mail$1();
	init_services();
	import_jsx_runtime$51 = require_jsx_runtime();
	firstCardBySession = /* @__PURE__ */ new Map();
	AgentMailPendingCard = ({ toolId, sessionId }) => {
		const t = useTranslation();
		const facades = useAgentServices();
		const adapter = useAdapter();
		(0, import_react$53.useEffect)(() => {
			claimFirstCard(sessionId, toolId);
		}, [sessionId, toolId]);
		const verificationKey = `agent-mail:tool:${sessionId || ""}:${toolId}`;
		const { state, loading, codeSent, activating, countdown, error, maskedPhone, sendCode, bind, reuse } = useAgentMail(facades?.agentMail, { persistKey: verificationKey });
		const [activated, setActivated] = (0, import_react$53.useState)(false);
		const [showSwitchDialog, setShowSwitchDialog] = (0, import_react$53.useState)(false);
		const [switchDialogData, setSwitchDialogData] = (0, import_react$53.useState)(null);
		const resumePromptSentRef = (0, import_react$53.useRef)(false);
		const markAsActivated = (0, import_react$53.useCallback)((email, shouldResume = false) => {
			setActivated(true);
			if (shouldResume && !resumePromptSentRef.current && sessionId && adapter?.requestSendPrompt) {
				resumePromptSentRef.current = true;
				adapter.requestSendPrompt({
					sessionId,
					prompt: [{
						type: "text",
						text: t("agentMail.activatedResume", { email })
					}]
				});
			}
		}, [
			adapter,
			sessionId,
			t
		]);
		(0, import_react$53.useEffect)(() => {
			if (state?.status === "active" && state.alias) markAsActivated(state.alias);
		}, [
			state?.status,
			state?.alias,
			markAsActivated
		]);
		const handleSendCode = (0, import_react$53.useCallback)(() => {
			sendCode();
		}, [sendCode]);
		const { guardedActivate, conflictDialogProps } = useActivationConflictGuard({ onProceed: (0, import_react$53.useCallback)(async (func, code) => {
			const result = await bind(func, code);
			if (result && "alias" in result) markAsActivated(result.alias, true);
			else if (result && "reachLimit" in result) {
				setSwitchDialogData({
					availableAgentMails: result.availableAgentMails,
					reuseTicket: result.reuseTicket,
					reachMaxLimit: result.reachMaxLimit
				});
				setShowSwitchDialog(true);
			}
		}, [bind, markAsActivated]) });
		const handleReuse = (0, import_react$53.useCallback)(async (email, reuseTicket) => {
			const result = await reuse(email, reuseTicket);
			if (result && "alias" in result) {
				message.success(t("agentMail.toast.bindSuccess"));
				return true;
			}
			if (result && "ticketExpired" in result) return true;
			return false;
		}, [reuse, t]);
		if (activated) return /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
			className: "agent-mail-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime$51.jsxs)("div", {
				className: "agent-mail-card__success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("span", {
					className: "agent-mail-card__success-icon",
					children: "✓"
				}), /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("span", { children: t("agentMail.activatedSuccess", { alias: state?.alias || "" }) })]
			})
		});
		const userType = state?.userType;
		if (!userType) {
			if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {});
			return /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
				className: "agent-mail-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
					className: "agent-mail-card__unsupported",
					children: t("agentMail.error.unsupportedUserType")
				})
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$51.jsxs)("div", {
			className: "agent-mail-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
					className: "agent-mail-card__activation-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(ActivationCard, {
						userType,
						phone: maskedPhone,
						codeSent,
						activating,
						error,
						countdown,
						onSendCode: handleSendCode,
						onActivate: guardedActivate
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(SwitchBindingDialog, {
					open: showSwitchDialog,
					onOpenChange: setShowSwitchDialog,
					availableAgentMails: switchDialogData?.availableAgentMails ?? [],
					reuseTicket: switchDialogData?.reuseTicket ?? "",
					reachMaxLimit: switchDialogData?.reachMaxLimit ?? false,
					onReuse: handleReuse
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(SkillConflictDialog, { ...conflictDialogProps })
			]
		});
	};
	AgentMailDuplicateHint = () => {
		return /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("div", {
			className: "agent-mail-duplicate-hint",
			children: useTranslation()("agentMail.duplicateHintActivate")
		});
	};
	AgentMailActivationCard = ({ toolId, sessionId, status }) => {
		if (status !== "not_bound") return null;
		if (!isFirstCardForSession(sessionId, toolId)) return /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(AgentMailDuplicateHint, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)(AgentMailPendingCard, {
			toolId,
			sessionId
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/agent-mail/agent-mail-renderer.tsx
/**
* 从 text 中提取 _agentmail_meta JSON 并转为 AgentMailErrorPayload。
*
* 后端拼装格式（agent-gateway agentmail-mcp.go writeAgentmailUnavailableResponse）：
*   "<中文文案 + deeplink 提示>\n{\"_agentmail_meta\":{\"status\":\"not_bound\"}}"
*
* 仅 not_bound 状态会在 text 末尾追加此标记，供本 renderer 触发开通卡片；
* 其他状态后端只在 text 里返成品文案，renderer 走默认渲染（见 priority/render 的早返）。
*
* 判定依据是 `_agentmail_meta` 这个 key 名本身 —— 它就是端后端约定的业务专属标识，
* 不再校验 errorReason / alias 等冗余字段。
*/
function tryExtractErrorPayload(text) {
	const metaMatch = text.match(/\{"_agentmail_meta"\s*:\s*\{[^}]*\}\s*\}/);
	if (!metaMatch) return;
	try {
		const status = JSON.parse(metaMatch[0])?._agentmail_meta?.status;
		if (typeof status === "string") return { status };
	} catch {}
}
/**
* 递归在任意嵌套结构中查找 `_agentmail_meta` 字符串并提取 payload。
*
* 后端的 tool result 在不同链路上形态多变：
*   - defer_execute_tool 包装：`tool.result.result.data[].text`
*   - 历史回放裸 MCP 工具：`tool.result.result.result.text`（嵌套 result）
*   - 字符串化的 raw output：`tool.result.result` 直接是字符串
*   - 还可能 `tool.result` 自己就是字符串
*
* 与其穷举每种结构，不如深度遍历所有 string 节点，命中 `_agentmail_meta` 即可。
* 深度 ≤6 防御性限制（实际嵌套很少超过 4 层），避免循环结构爆栈。
*/
function deepFindErrorPayload(value, depth = 0) {
	if (depth > 6 || value == null) return;
	if (typeof value === "string") return value.includes("_agentmail_meta") ? tryExtractErrorPayload(value) : void 0;
	if (Array.isArray(value)) {
		for (const item of value) {
			const found = deepFindErrorPayload(item, depth + 1);
			if (found) return found;
		}
		return;
	}
	if (typeof value === "object") for (const v of Object.values(value)) {
		const found = deepFindErrorPayload(v, depth + 1);
		if (found) return found;
	}
}
/**
* 从 ToolCall 的 MCP result 中解析 agent-mail 业务错误。
* 走深度遍历兼容所有已知与未知的形态，唯一判定依据是 text 里的 `_agentmail_meta` 标记。
*/
function parseAgentMailError(tool) {
	return deepFindErrorPayload(tool.result);
}
/**
* 深度遍历查找任意 string 节点是否包含给定子串。
*/
function deepFindString(value, needle, depth = 0) {
	if (depth > 6 || value == null) return false;
	if (typeof value === "string") return value.includes(needle);
	if (Array.isArray(value)) return value.some((item) => deepFindString(item, needle, depth + 1));
	if (typeof value === "object") return Object.values(value).some((v) => deepFindString(v, needle, depth + 1));
	return false;
}
/**
* 判断一个 ToolCall 是否属于 agent-mail 系统。
*
* 不再依赖具体形态，统一深度搜：tool name / args / result 任一处出现 agent-mail
* 标识就认。这样不管经过 defer_execute_tool 包装、还是历史回放被裸展开、还是被截断
* 成字符串，都能命中。
*/
function isAgentMailTool(tool) {
	const name = toStringOrEmpty(tool.name);
	if (name.startsWith("agent-mail_") || name.includes("__agent-mail__") || name.includes("agent-mail")) return true;
	return deepFindString(tool.args, "agent-mail") || deepFindString(tool.result, "agent-mail") || deepFindString(tool.result, "_agentmail_meta");
}
var import_jsx_runtime$50, AgentMailRenderer;
var init_agent_mail_renderer = __esmMin((() => {
	init_agent_mail_renderer$1();
	init_src();
	require_react();
	init_tool_protocol();
	init_agent_mail_activation_card();
	import_jsx_runtime$50 = require_jsx_runtime();
	AgentMailRenderer = class {
		constructor() {
			this.theme = "none";
		}
		canHandle(tool) {
			if (!isAgentMailTool(tool)) return ToolRendererPriority.NONE;
			if (parseAgentMailError(tool)?.status !== "not_bound") return ToolRendererPriority.NONE;
			return ToolRendererPriority.EXACT + 1;
		}
		render(tool, _config, _context) {
			const sessionId = _context?.sessionId;
			const errorPayload = parseAgentMailError(tool);
			if (errorPayload?.status !== "not_bound") return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)(AgentMailActivationCard, {
				toolId: tool.id,
				sessionId,
				status: errorPayload.status
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/agent-mail/agent-mail-fold-predicate.ts
/**
* 深度遍历查找任意 string 节点是否包含给定子串。
*
* 历史会话/当前会话的 tool result 形态在不同链路上千变万化：
*   - defer_execute_tool 包装：`tool.result.result.data[].text`
*   - 历史回放裸 MCP 工具：`tool.result.result.result.text`
*   - 字符串化的 raw output：`tool.result.result` 或 `tool.result` 直接是字符串
*
* 与其穷举每一种结构，不如递归到所有 string 上判关键字。
*/
function deepIncludesString(value, needle, depth = 0) {
	if (depth > 6 || value == null) return false;
	if (typeof value === "string") return value.includes(needle);
	if (Array.isArray(value)) return value.some((item) => deepIncludesString(item, needle, depth + 1));
	if (typeof value === "object") return Object.values(value).some((v) => deepIncludesString(v, needle, depth + 1));
	return false;
}
/**
* 检测 tool-call 是否包含 agent-mail 业务错误（需要渲染开通/激活卡片，不应折叠）。
*
* 涵盖所有 status（not_bound / deactivated / auth_failed / suspended / banned / deleted / revoked），
* 这些 status 都会被 agent-mail-renderer 渲染成需要用户操作的卡片，因此都需要豁免折叠。
*
* 此判定与 agent-mail-renderer.tsx 保持一致：只要 renderer 会把这条 tool-call
* 渲染成开通/激活卡片，折叠豁免就必须命中，二者绝不能漏配。
*/
function isAgentMailUnfoldable(tool) {
	return deepIncludesString(tool?.result, AGENT_MAIL_META_KEYWORD);
}
var AGENT_MAIL_META_KEYWORD;
var init_agent_mail_fold_predicate = __esmMin((() => {
	AGENT_MAIL_META_KEYWORD = "_agentmail_meta";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/agent-mail/index.ts
var init_agent_mail = __esmMin((() => {
	init_agent_mail_renderer();
	init_agent_mail_activation_card();
	init_agent_mail_fold_predicate();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/ask-followup-question/ask-followup-question-renderer.less
var init_ask_followup_question_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/ask-followup-question/ask-followup-question-renderer.tsx
/**
* 检查是否为 ask_followup_question 工具调用
* 注意：askuserquestion 由独立的 AskUserQuestionRenderer 处理
*/
function isAskFollowupQuestionToolCall(tool) {
	const toolName = toStringOrEmpty(tool.name).toLowerCase();
	return toolName === "ask_followup_question" || toolName === "askfollowupquestion" || toolName === "ask-followup-question";
}
/**
* 判断工具是否正在执行中
*/
function isToolExecuting(status) {
	return [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(status);
}
/**
* 判断工具是否执行成功
*/
function isToolSuccess$1(status) {
	return status === "executed";
}
/**
* 判断工具是否执行失败
*/
function isToolFailed$1(status) {
	return [
		"failed",
		"cancelled",
		"skipped",
		"destroyed"
	].includes(status);
}
/**
* 解析 questions JSON 字符串
*/
function parseQuestions(questionsJson) {
	if (!questionsJson) return [];
	try {
		const parsed = JSON.parse(questionsJson);
		if (!Array.isArray(parsed)) return [];
		return parsed.map((q, index) => {
			let options = q.options;
			if (typeof options === "string") try {
				options = JSON.parse(options);
			} catch {
				options = [];
			}
			return {
				id: q.id || `q-${index}`,
				question: q.question || "",
				options: Array.isArray(options) ? options : [],
				multiSelect: q.multiSelect === true
			};
		});
	} catch {
		return [];
	}
}
/**
* 判断工具执行完成但结果实际是错误的（兜底检查）
*
* 工具框架中，fullExecute 正常 return（即使 setResult status='error'）
* 状态机仍然会将工具标记为 EXECUTED，只有抛出异常才会变为 FAILED。
* 因此需要检查 result.success 和 questions 是否有效来兜底。
*/
function isToolExecutedButFailed(tool, questions) {
	if (tool.result?.success === false) return true;
	if (!questions || questions.length === 0) return true;
	return false;
}
var import_react$51, import_jsx_runtime$49, QuestionsGeneratingComponent, QuestionsFailedComponent, AskFollowQuestionComponent, AskFollowupQuestionRenderer;
var init_ask_followup_question_renderer = __esmMin((() => {
	init_ask_followup_question_renderer$1();
	init_src();
	import_react$51 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_icons();
	init_useI18n();
	init_tool_protocol();
	import_jsx_runtime$49 = require_jsx_runtime();
	QuestionsGeneratingComponent = (0, import_react$51.memo)(() => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("div", {
			className: "ask-follow-question ask-follow-question--loading",
			children: /* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("div", {
				className: "loading-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("span", { className: "loading-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("span", {
					className: "loading-text",
					children: t("tool.askFollowup.generating")
				})]
			})
		});
	});
	QuestionsGeneratingComponent.displayName = "QuestionsGeneratingComponent";
	QuestionsFailedComponent = (0, import_react$51.memo)(({ status, errorMessage }) => {
		const t = useTranslation();
		const getStatusText = () => {
			if (errorMessage) return errorMessage;
			switch (status) {
				case "cancelled": return t("tool.askFollowup.cancelled");
				case "skipped": return t("tool.askFollowup.skipped");
				default: return t("tool.askFollowup.failed");
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("div", {
			className: "ask-follow-question ask-follow-question--failed",
			children: /* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("div", {
				className: "failed-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(FailedIcon, { className: "failed-icon" }), /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("span", {
					className: "failed-text",
					children: getStatusText()
				})]
			})
		});
	});
	QuestionsFailedComponent.displayName = "QuestionsFailedComponent";
	AskFollowQuestionComponent = (0, import_react$51.memo)((props) => {
		const { tool } = props;
		const questionContext = useQuestionContextOptional();
		const args = (0, import_react$51.useMemo)(() => tool.args || {}, [tool.args]);
		const questions = (0, import_react$51.useMemo)(() => {
			return parseQuestions(args?.questions);
		}, [args?.questions]);
		const title = args?.title;
		const floatingConfig = (0, import_react$51.useMemo)(() => {
			if (!isToolSuccess$1(tool.status)) return null;
			if (!questions || questions.length === 0) return null;
			return {
				questions: questions.map((q) => ({
					id: q.id,
					question: q.question,
					options: q.options,
					multiSelect: q.multiSelect
				})),
				title,
				toolCallId: tool.id
			};
		}, [
			tool.status,
			tool.id,
			questions,
			title
		]);
		(0, import_react$51.useEffect)(() => {
			if (floatingConfig && questionContext) questionContext.setActiveConfig(floatingConfig);
		}, [floatingConfig, questionContext]);
		if (isToolExecuting(tool.status)) return /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(QuestionsGeneratingComponent, {});
		if (isToolFailed$1(tool.status)) return /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(QuestionsFailedComponent, { status: tool.status });
		if (isToolSuccess$1(tool.status)) {
			if (isToolExecutedButFailed(tool, questions)) {
				const errorMessage = tool.result?.error;
				return /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(QuestionsFailedComponent, {
					status: "failed",
					errorMessage
				});
			}
			return null;
		}
		return null;
	});
	AskFollowQuestionComponent.displayName = "AskFollowQuestionComponent";
	AskFollowupQuestionRenderer = class {
		constructor() {
			this.className = "ask-follow-question";
			this.theme = "border";
		}
		canHandle(tool) {
			const canHandle = isAskFollowupQuestionToolCall(tool);
			if (canHandle) {}
			return canHandle ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool) {
			return /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(AskFollowQuestionComponent, { tool });
		}
	};
}));
var init_arrow_large_icon = __esmMin((() => {
	require_react();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/ask-followup-question/index.ts
var init_ask_followup_question = __esmMin((() => {
	init_ask_followup_question_renderer();
	init_arrow_large_icon();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/ask-user-question/ask-user-question-renderer.scss
var init_ask_user_question_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/tool-icon-registry.ts
/**
* 标准化工具名：小写 + 去除下划线/连字符
* 使 "ToolSearch" / "tool_search" / "tool-search" 统一为 "toolsearch"
*/
function normalizeName(name) {
	return name.toLowerCase().replace(/[_-]/g, "");
}
/**
* 根据工具名获取对应的图标组件
*
* 匹配策略：
* 1. 精确匹配（大小写不敏感）
* 2. 前缀匹配（大小写不敏感，最长前缀优先）
* 3. 兜底返回 undefined（调用方可自行处理默认图标）
*
* 注意：精确匹配优先于前缀匹配，如 CloudStudioExecuteCommand 精确匹配到 TerminalIcon，
* 不会被 CloudStudio 前缀匹配到 CloudIcon
*/
function getToolIcon(toolName, props) {
	if (!toolName) return;
	const normalized = normalizeName(toolName);
	const iconProps = props || {};
	const exactIcon = exactMatchMap.get(normalized);
	if (exactIcon) return import_react$49.createElement(exactIcon, iconProps);
	for (const { prefix, icon } of prefixEntries) if (normalized.startsWith(prefix)) return import_react$49.createElement(icon, iconProps);
	return import_react$49.createElement(ToolIcon, iconProps);
}
/**
* 根据状态类型获取对应的状态图标
* 用于替换 cb-chat-ui 内置的 Loading/Success/Failed/Warn/Arrow 等状态图标
*/
function getStatusIcon$2(status, props) {
	const icon = statusIconMap[status];
	if (icon) return import_react$49.createElement(icon, props || {});
}
var import_react$49, toolIconEntries, exactMatchMap, prefixEntries, statusIconMap;
var init_tool_icon_registry = __esmMin((() => {
	import_react$49 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icons();
	toolIconEntries = [
		{
			icon: ViewedIcon,
			toolNames: [
				"Read",
				"read_file",
				"NotebookRead",
				"read_lints",
				"preview_url",
				"PreviewUrl",
				"OpenResultView",
				"present_files",
				"PresentFiles",
				"ReadMcpResource",
				"FetchMcpResource",
				"ListMcpResources",
				"ConversationSearch"
			]
		},
		{
			icon: EditIcon,
			toolNames: [
				"Write",
				"Edit",
				"MultiEdit",
				"write_to_file",
				"replace_in_file",
				"append_to_file",
				"NotebookEdit",
				"NotebookWrite",
				"IDEWriteFile",
				"IDEReplaceFile",
				"ReplaceFile",
				"SaveMemory",
				"UpdateMemory"
			]
		},
		{
			icon: TerminalIcon,
			toolNames: [
				"Bash",
				"PowerShell",
				"execute_command",
				"run_terminal_cmd",
				"BashOutput",
				"KillShell",
				"TerminalExecutor",
				"CloudStudioExecuteCommand",
				"InstallBinary"
			]
		},
		{
			icon: SearchIcon,
			toolNames: [
				"Glob",
				"Grep",
				"search_files",
				"search_file",
				"search_content",
				"CodebaseSearch",
				"ToolSearch",
				"tool_search",
				"list_code_definition_names",
				"SearchIntegration",
				"RgSearchContent",
				"LSP"
			]
		},
		{
			icon: FolderIcon,
			toolNames: [
				"list_files",
				"list_dir",
				"FileUpload",
				"EnterWorktree",
				"LeaveWorktree"
			]
		},
		{
			icon: WebIcon,
			toolNames: [
				"WebFetch",
				"WebSearch",
				"web_fetch",
				"web_search"
			]
		},
		{
			icon: DeleteIcon,
			toolNames: [
				"DeleteFiles",
				"delete_files",
				"delete_file",
				"CronDelete",
				"TeamDelete"
			]
		},
		{
			icon: SkillIcon,
			toolNames: [
				"Skill",
				"SkillManage",
				"UseSkill",
				"use_skill",
				"SlashCommand"
			]
		},
		{
			icon: CheckCircleIcon,
			toolNames: [
				"completion",
				"plan_attempt_completion",
				"DeliverAttachments"
			]
		},
		{
			icon: PlanIcon,
			toolNames: [
				"plan_task",
				"PlanCreate",
				"plan_create",
				"PlanUpdate",
				"plan_update",
				"TaskCreate",
				"create_tasks",
				"TaskGet",
				"TaskUpdate",
				"update_task",
				"TaskList",
				"list_tasks",
				"TaskStop",
				"TaskOutput",
				"append_task",
				"EnterPlanMode",
				"ExitPlanMode",
				"TodoWrite",
				"todo_write",
				"CronCreate",
				"CronList",
				"PdcCreate",
				"pdc_create",
				"PdcUpdate",
				"pdc_update",
				"AutomationUpdate"
			]
		},
		{
			icon: AgentIcon,
			toolNames: [
				"Agent",
				"TeamCreate",
				"SendMessage",
				"AskUserQuestion"
			]
		},
		{
			icon: ImageIcon,
			toolNames: ["ImageGen", "ImageEdit"]
		},
		{
			icon: WidgetIcon,
			toolNames: ["ShowWidget", "ReadMe"]
		},
		{
			icon: DatabaseIcon,
			toolNames: [
				"SupabaseExecuteSql",
				"SupabaseGetLogs",
				"SupabaseApplyMigration",
				"SupabaseListMigration",
				"SupabaseListTables"
			],
			prefixes: ["Supabase"]
		},
		{
			icon: CloudIcon,
			toolNames: [
				"CloudStudioDeploy",
				"CloudStudioFetchLog",
				"connect_cloud_service",
				"ConnectCloudService"
			],
			prefixes: ["CloudStudio"]
		},
		{
			icon: DebugIcon,
			toolNames: ["DebugIssueReproduction", "DebugIssueConfirm"],
			prefixes: ["Debug"]
		},
		{
			icon: LocationIcon,
			toolNames: [
				"get_location",
				"GetLocation",
				"poi_query",
				"PoiQuery",
				"pick_location",
				"PickLocation",
				"mcp__connector-proxy__pick_location"
			]
		}
	];
	exactMatchMap = /* @__PURE__ */ new Map();
	prefixEntries = [];
	for (const entry of toolIconEntries) {
		for (const name of entry.toolNames) exactMatchMap.set(normalizeName(name), entry.icon);
		if (entry.prefixes) for (const prefix of entry.prefixes) prefixEntries.push({
			prefix: normalizeName(prefix),
			icon: entry.icon
		});
	}
	prefixEntries.sort((a, b) => b.prefix.length - a.prefix.length);
	statusIconMap = {
		loading: LoadingIcon,
		success: SuccessIcon,
		failed: FailedIcon$1,
		warn: WarnIcon,
		arrow: ArrowIcon$1
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/ask-user-question/ask-user-question-renderer.tsx
/**
* 检查是否为 askuserquestion 工具调用
*/
function isAskUserQuestionToolCall(tool) {
	const toolName = toStringOrEmpty(tool.name).toLowerCase();
	return toolName === "askuserquestion" || toolName === "ask_user_question";
}
/**
* 判断工具是否在等待用户输入
*/
function isToolPending(status) {
	return [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing",
		"executing"
	].includes(status);
}
/**
* 判断工具是否执行成功
*/
function isToolSuccess(status) {
	return status === "executed" || status === "completed";
}
/**
* 判断工具是否执行失败
*/
function isToolFailed(status) {
	return [
		"failed",
		"cancelled",
		"destroyed"
	].includes(status);
}
var import_classnames$8, import_react$48, import_jsx_runtime$47, WaitingForAnswerComponent, QuestionSkippedComponent, QuestionFailedComponent, QuestionCompletedComponent, AskUserQuestionComponent, AskUserQuestionRenderer;
var init_ask_user_question_renderer = __esmMin((() => {
	init_ask_user_question_renderer$1();
	init_src();
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$48 = /* @__PURE__ */ __toESM(require_react());
	init_icons();
	init_useI18n();
	init_tool_icon_registry();
	init_tool_icons();
	init_tool_protocol();
	import_jsx_runtime$47 = require_jsx_runtime();
	WaitingForAnswerComponent = (0, import_react$48.memo)(() => {
		return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("div", {
			className: "ask-user-question ask-user-question--waiting",
			children: /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("span", {
				className: "waiting-text cb-shining-text",
				children: useTranslation()("tool.askUserQuestion.waiting")
			})
		});
	});
	WaitingForAnswerComponent.displayName = "WaitingForAnswerComponent";
	QuestionSkippedComponent = (0, import_react$48.memo)(() => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("div", {
			className: "ask-user-question ask-user-question--skipped",
			children: /* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("div", {
				className: "skipped-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("span", {
					className: "skipped-icon",
					children: "↷"
				}), /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("span", {
					className: "skipped-text",
					children: t("tool.askUserQuestion.skipped")
				})]
			})
		});
	});
	QuestionSkippedComponent.displayName = "QuestionSkippedComponent";
	QuestionFailedComponent = (0, import_react$48.memo)(({ status }) => {
		const t = useTranslation();
		const isCancelled = status === "cancelled";
		const text = isCancelled ? t("tool.askUserQuestion.cancelled") : t("tool.askUserQuestion.failed");
		const modifierClass = isCancelled ? "ask-user-question--cancelled" : "ask-user-question--failed";
		const contentClass = isCancelled ? "cancelled-content" : "failed-content";
		const iconClass = isCancelled ? "cancelled-icon" : "failed-icon";
		const textClass = isCancelled ? "cancelled-text" : "failed-text";
		return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("div", {
			className: `ask-user-question ${modifierClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("div", {
				className: contentClass,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(FailedIcon, { className: iconClass }), /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("span", {
					className: textClass,
					children: text
				})]
			})
		});
	});
	QuestionFailedComponent.displayName = "QuestionFailedComponent";
	QuestionCompletedComponent = (0, import_react$48.memo)(({ questionAnswer, contentSettled }) => {
		const t = useTranslation();
		const [expanded, setExpanded] = (0, import_react$48.useState)(() => contentSettled === false);
		const prevSettledRef = (0, import_react$48.useRef)(contentSettled);
		(0, import_react$48.useEffect)(() => {
			if (contentSettled && prevSettledRef.current === false) setExpanded(false);
			prevSettledRef.current = contentSettled;
		}, [contentSettled]);
		return /* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("div", {
			className: (0, import_classnames$8.default)("ask-user-question", "ask-user-question--completed", { "ask-user-question--expanded": expanded }),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("div", {
				className: "ask-user-question__header",
				onClick: () => {
					const sel = window.getSelection();
					if (sel) sel.removeAllRanges();
					setExpanded((prev) => !prev);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("span", {
						className: "ask-user-question__icon",
						children: getToolIcon("AskUserQuestion")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("span", {
						className: "ask-user-question__title",
						children: t("tool.askUserQuestion.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(ArrowIcon$1, { className: (0, import_classnames$8.default)("ask-user-question__arrow", { "ask-user-question__arrow--expanded": expanded }) })
				]
			}), expanded && /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("div", {
				className: "ask-user-question__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(QuestionAnswerDisplay, { questionAnswer })
			})]
		});
	});
	QuestionCompletedComponent.displayName = "QuestionCompletedComponent";
	AskUserQuestionComponent = (0, import_react$48.memo)((props) => {
		const { tool, contentSettled } = props;
		if (isToolPending(tool.status)) return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(WaitingForAnswerComponent, {});
		if (isToolSuccess(tool.status)) {
			if (tool.metaData?.questionSkipped === true) return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(QuestionSkippedComponent, {});
			const questionAnswer = tool.metaData?.questionAnswer;
			if (questionAnswer) return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(QuestionCompletedComponent, {
				questionAnswer,
				contentSettled
			});
			return null;
		}
		if (isToolFailed(tool.status)) return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(QuestionFailedComponent, { status: tool.status });
		return null;
	});
	AskUserQuestionComponent.displayName = "AskUserQuestionComponent";
	AskUserQuestionRenderer = class {
		constructor() {
			this.className = "ask-user-question";
			this.theme = "border";
		}
		canHandle(tool) {
			return isAskUserQuestionToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$47.jsx)(AskUserQuestionComponent, {
				tool,
				contentSettled: context?.contentSettled
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/ask-user-question/index.ts
var init_ask_user_question = __esmMin((() => {
	init_ask_user_question_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/automation-update/automation-update-renderer.less
var init_automation_update_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/automation-update/automation-update-renderer.tsx
/**
* Determine whether the current i18n locale is Chinese.
* Uses the i18n system's `getLocale()` (returns 'zh-cn' or 'en') so the result
* respects the user's IDE language preference rather than the OS language, which
* fixes the international-version bug where a Chinese OS locale caused English
* UI to render Chinese text.
*/
function isZhLocale$1() {
	return getLocale().startsWith("zh");
}
function isCreateResultMode(mode) {
	return mode === "suggested create" || mode === "create";
}
function isUpdateResultMode(mode) {
	return mode === "suggested update" || mode === "update";
}
function getAutomationApplyModeForResult(mode) {
	return isUpdateResultMode(mode) ? "suggested update" : "suggested create";
}
function parseRRule(rrule) {
	const map = /* @__PURE__ */ new Map();
	for (const pair of (rrule || "").split(";")) {
		const [key, value] = pair.split("=");
		if (key && value) map.set(key.trim().toUpperCase(), value.trim().toUpperCase());
	}
	const rawFreq = map.get("FREQ") || "DAILY";
	const parsedInterval = Math.max(1, Number.parseInt(map.get("INTERVAL") || "1", 10) || 1);
	const byhour = Math.max(0, Math.min(23, Number.parseInt(map.get("BYHOUR") || "0", 10) || 0));
	const byminute = Math.max(0, Math.min(59, Number.parseInt(map.get("BYMINUTE") || "0", 10) || 0));
	const byday = (map.get("BYDAY") || "").split(",").map((d) => d.trim()).filter((d) => ALL_DAYS.includes(d));
	const bymonthday = (map.get("BYMONTHDAY") || "").split(",").map((part) => Number.parseInt(part.trim(), 10)).filter(Number.isFinite).filter((d) => d >= 1 && d <= 31);
	const bymonth = (map.get("BYMONTH") || "").split(",").map((part) => Number.parseInt(part.trim(), 10)).filter(Number.isFinite).filter((m) => m >= 1 && m <= 12);
	if (rawFreq === "HOURLY") return {
		freq: "HOURLY",
		interval: parsedInterval,
		byday: byday.length > 0 ? byday : ALL_DAYS.slice(),
		bymonthday: [],
		bymonth: [],
		byhour,
		byminute,
		intervalHours: parsedInterval
	};
	if (rawFreq === "MONTHLY") return {
		freq: "MONTHLY",
		interval: parsedInterval,
		byday: [],
		bymonthday,
		bymonth: [],
		byhour,
		byminute,
		intervalHours: 1
	};
	if (rawFreq === "YEARLY") return {
		freq: "YEARLY",
		interval: parsedInterval,
		byday: [],
		bymonthday,
		bymonth,
		byhour,
		byminute,
		intervalHours: 1
	};
	if (rawFreq === "WEEKLY") return {
		freq: "WEEKLY",
		interval: parsedInterval,
		byday,
		bymonthday: [],
		bymonth: [],
		byhour,
		byminute,
		intervalHours: 1
	};
	return {
		freq: "DAILY",
		interval: 1,
		byday: ALL_DAYS.slice(),
		bymonthday: [],
		bymonth: [],
		byhour,
		byminute,
		intervalHours: 1
	};
}
function buildRRule(schedule) {
	if (schedule.freq === "HOURLY") {
		const byday = schedule.byday.length > 0 ? schedule.byday.join(",") : ALL_DAYS.join(",");
		return `FREQ=HOURLY;INTERVAL=${schedule.intervalHours};BYDAY=${byday}`;
	}
	if (schedule.freq === "DAILY") return `FREQ=DAILY;BYHOUR=${schedule.byhour};BYMINUTE=${schedule.byminute}`;
	if (schedule.freq === "MONTHLY") return `FREQ=MONTHLY;BYMONTHDAY=${schedule.bymonthday.length > 0 ? schedule.bymonthday.join(",") : "1"};BYHOUR=${schedule.byhour};BYMINUTE=${schedule.byminute}`;
	if (schedule.freq === "YEARLY") return `FREQ=YEARLY;BYMONTH=${schedule.bymonth.length > 0 ? schedule.bymonth.join(",") : "1"};BYMONTHDAY=${schedule.bymonthday.length > 0 ? schedule.bymonthday.join(",") : "1"};BYHOUR=${schedule.byhour};BYMINUTE=${schedule.byminute}`;
	return `FREQ=WEEKLY${schedule.interval > 1 ? `;INTERVAL=${schedule.interval}` : ""};BYDAY=${schedule.byday.join(",")};BYHOUR=${schedule.byhour};BYMINUTE=${schedule.byminute}`;
}
function describeSchedule(rrule, isZh) {
	try {
		const s = parseRRule(rrule);
		const pad = (n) => String(n).padStart(2, "0");
		const time = `${pad(s.byhour)}:${pad(s.byminute)}`;
		if (s.freq === "HOURLY") return isZh ? `每 ${s.intervalHours} 小时` : `Every ${s.intervalHours}h`;
		if (s.freq === "DAILY") return isZh ? `每天 ${time}` : `Daily at ${time}`;
		if (s.freq === "MONTHLY") {
			if (s.bymonthday.length === 0) return rrule;
			const days = s.bymonthday.map((day) => isZh ? `${day}日` : `${day}`).join(isZh ? "、" : ", ");
			return isZh ? `每月 ${days} ${time}` : `Monthly on ${days} at ${time}`;
		}
		if (s.freq === "YEARLY") {
			const month = s.bymonth[0];
			const day = s.bymonthday[0];
			if (month && day) return isZh ? `每年 ${month}月${day}日 ${time}` : `Yearly on ${month}/${day} at ${time}`;
			return rrule;
		}
		const labels = isZh ? DAY_LABELS_ZH : DAY_LABELS;
		const days = s.byday.map((d) => labels[d] || d).join(isZh ? "、" : ", ");
		if (s.interval === 2) return isZh ? `每两周 ${days} · ${time}` : `Biweekly ${days} · ${time}`;
		return `${days} · ${time}`;
	} catch {
		return rrule;
	}
}
function parseIsoDate(value) {
	if (!value) return;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? void 0 : date;
}
function buildIsoFromDateTimeInput(dateValue, timeValue) {
	if (!dateValue) return;
	const candidate = /* @__PURE__ */ new Date(`${dateValue}T${timeValue || DEFAULT_ONCE_TIME}:00`);
	return Number.isNaN(candidate.getTime()) ? void 0 : candidate.toISOString();
}
function buildValidityBoundaryIso(dateValue, boundary) {
	if (!dateValue) return;
	const candidate = /* @__PURE__ */ new Date(`${dateValue}T${boundary === "start" ? "00:00:00.000" : "23:59:59.999"}`);
	return Number.isNaN(candidate.getTime()) ? void 0 : candidate.toISOString();
}
function formatDateTimeLabel(value) {
	if (typeof value === "number") return new Date(value).toLocaleString();
	const date = parseIsoDate(value);
	return date ? date.toLocaleString() : "";
}
function formatDateLabel(value) {
	const date = parseIsoDate(value);
	return date ? date.toLocaleDateString() : "";
}
function describeAutomationCardSchedule(automation, isZh) {
	if (automation._cronHumanSchedule) return automation._cronHumanSchedule;
	if (automation.scheduleType === "once") {
		const scheduledLabel = formatDateTimeLabel(automation.scheduledAt);
		return scheduledLabel ? isZh ? `单次 · ${scheduledLabel}` : `One-time · ${scheduledLabel}` : isZh ? "单次" : "One-time";
	}
	return automation.rrule ? describeSchedule(automation.rrule, isZh) : "";
}
function describeValidityLabel(automation, isZh) {
	const from = formatDateLabel(automation.validFrom);
	const until = formatDateLabel(automation.validUntil);
	if (from && until) return isZh ? `生效期 ${from} - ${until}` : `Active ${from} - ${until}`;
	if (from) return isZh ? `自 ${from} 生效` : `Active from ${from}`;
	if (until) return isZh ? `至 ${until} 截止` : `Active until ${until}`;
	return "";
}
function getAutomationStatusLabel(status) {
	if (status === "ACTIVE") return t("automation.modal.statusActive");
	if (status === "PAUSED") return t("automation.modal.statusPaused");
	return "-";
}
function buildAutomationPayload(mode, draft, id) {
	const payload = {
		mode,
		id,
		name: draft.name.trim(),
		prompt: draft.prompt.trim(),
		scheduleType: draft.scheduleType,
		cwds: draft.cwds.split(",").map((s) => s.trim()).filter(Boolean),
		status: draft.status
	};
	if (draft.scheduleType === "once") {
		payload.scheduledAt = buildIsoFromDateTimeInput(draft.scheduledDate, draft.scheduledTime);
		payload.validFrom = "";
		payload.validUntil = "";
	} else {
		payload.rrule = buildRRule(draft.schedule);
		payload.validFrom = draft.validFromDate ? buildValidityBoundaryIso(draft.validFromDate, "start") : "";
		payload.validUntil = draft.validUntilDate ? buildValidityBoundaryIso(draft.validUntilDate, "end") : "";
	}
	return payload;
}
function summarizePrompt(prompt, maxLen = 120) {
	const normalized = (prompt || "").replace(/\s+/g, " ").trim();
	if (!normalized) return "";
	return normalized.length > maxLen ? `${normalized.slice(0, maxLen)}...` : normalized;
}
function getProjectName(cwd) {
	return formatAutomationCwdLabel(cwd, t);
}
function parseCwdsString(cwds) {
	if (!cwds) return [];
	try {
		const parsed = JSON.parse(cwds);
		if (Array.isArray(parsed)) return parsed.map(String);
	} catch {}
	return cwds.split(",").map((s) => s.trim()).filter(Boolean);
}
function normalizeCwds(cwds) {
	return (Array.isArray(cwds) ? cwds : parseCwdsString(cwds)).map((value) => value.trim()).filter(Boolean).sort();
}
function findMatchingAutomationId(snapshot, automationData) {
	const expectedCwds = normalizeCwds(automationData.cwds);
	return snapshot.automations.find((automation) => {
		const actualCwds = normalizeCwds(automation.cwds);
		return automation.name === automationData.name && automation.prompt === automationData.prompt && (automation.scheduleType || "recurring") === automationData.scheduleType && automation.rrule === automationData.rrule && (automation.scheduledAt || "") === (automationData.scheduledAt || "") && (automation.validFrom || "") === (automationData.validFrom || "") && (automation.validUntil || "") === (automationData.validUntil || "") && automation.status === automationData.status && actualCwds.length === expectedCwds.length && actualCwds.every((cwd, index) => cwd === expectedCwds[index]);
	})?.id;
}
/**
* Read the effective automation tool payload from a tool call.
*
* Different transports wrap the MCP tool result differently:
*
* 1. **Fast path** — old in-process invocations store the parsed object directly on
*    `tool.result.result` (shape: `{ type: 'automation_update_tool_result', mode, pending, ... }`).
*
* 2. **Desktop adapter unwrap path** — `WorkbuddyAgentAdapterNext.transformAutomationToolResults`
*    replaces `tool.result.result` with the parsed payload after accumulation. Same shape as (1).
*
* 3. **ACP MCP streaming path** — when the desktop adapter's unwrap has NOT yet run (or the
*    message is still streaming), `tool.result.result` is a `McpCallToolResult`:
*
*      {
*        type: 'mcp_call_tool_result',
*        data: [
*          { type: 'text', text: '"'   }, // streaming JSON tokens, often single chars
*          { type: 'text', text: 's'   },
*          { type: 'text', text: 'uggested' },
*          ...
*          { type: 'text', text: '[{"type":"input_text","text":"{..actual JSON..}"}]' },
*        ]
*      }
*
*    The real payload is hidden inside one (or several nested) `data[].text` strings.
*    This helper therefore recursively walks every text block, concatenates the streaming
*    tokens, and looks for any JSON node whose `type === 'automation_update_tool_result'`.
*/
function findAutomationResultNode(input, depth = 0) {
	if (depth > 8 || input == null) return;
	if (typeof input === "string") {
		const trimmed = input.trim();
		if (!trimmed) return;
		if (trimmed.startsWith("{") || trimmed.startsWith("[")) try {
			return findAutomationResultNode(JSON.parse(trimmed), depth + 1);
		} catch {
			return;
		}
		return;
	}
	if (Array.isArray(input)) {
		for (const item of input) {
			const found = findAutomationResultNode(item, depth + 1);
			if (found) return found;
		}
		if (input.every((it) => it && typeof it === "object" && "text" in it)) {
			const joined = input.map((it) => (it.text ?? "").toString()).join("");
			if (joined.trim().startsWith("{") || joined.trim().startsWith("[")) try {
				return findAutomationResultNode(JSON.parse(joined), depth + 1);
			} catch {}
		}
		return;
	}
	if (typeof input === "object") {
		const obj = input;
		if (obj.type === "automation_update_tool_result") return obj;
		for (const key of [
			"data",
			"content",
			"result",
			"text",
			"value"
		]) if (key in obj) {
			const found = findAutomationResultNode(obj[key], depth + 1);
			if (found) return found;
		}
	}
}
function readAutomationToolPayload(tool) {
	const direct = tool.result?.result;
	if (direct && (direct.type === "automation_update_tool_result" || typeof direct.pending === "boolean" || typeof direct.mode === "string" || typeof direct.success === "boolean" || typeof direct.deletedAutomationId === "string")) return direct;
	const node = findAutomationResultNode(direct);
	if (node) return node;
	return direct;
}
function extractAutomationToolMessage(tool) {
	const payload = readAutomationToolPayload(tool);
	const outer = tool.result;
	return [
		payload?.message,
		outer?.message,
		payload?.error,
		outer?.error,
		outer?.errorMessage,
		payload?.errorMessage
	].find((item) => typeof item === "string" && item.trim().length > 0);
}
/**
* issue #42250 起的删除模式判定。
*
* 删除链路改为"工具一次性返回终态"，因此 renderer 只需要识别两种情况：
*  1) 删除模式 + tool 已回到 executed/failed —— 由 `AutomationDeleteResultCard`
*     渲染最终态；
*  2) 历史会话回放出来的、仍带 `pending: true` 的旧 payload —— 同样按结果卡
*     渲染，会借 `payload.success === false` 退化为"删除失败"提示，让用户
*     知道那次旧的删除尝试并未生效，重新让 AI 触发一次即可。
*/
function isAutomationDeleteFinalCard(tool) {
	if (tool.args?.mode !== "delete") return false;
	if (tool.status === "executed" || tool.status === "failed") return true;
	return readAutomationToolPayload(tool)?.pending === true;
}
function describeListItemSchedule(item, isZh) {
	if (item.scheduleType === "once") {
		if (!item.scheduledAt) return isZh ? "一次性任务" : "One-time";
		return isZh ? `一次性 · ${item.scheduledAt}` : `Once · ${item.scheduledAt}`;
	}
	if (item.scheduleType === "recurring") return item.rrule ? isZh ? `循环 · ${item.rrule}` : `Recurring · ${item.rrule}` : isZh ? "循环任务" : "Recurring";
	return "";
}
var import_react$47, import_jsx_runtime$46, ALL_DAYS, DAY_LABELS, DAY_LABELS_ZH, DEFAULT_ONCE_TIME, CreateEditModal, AutomationUpdateCard, AUTOMATION_LIST_DISPLAY_LIMIT, AutomationListCard, AutomationDeleteResultCard, AutomationUpdateRenderer;
var init_automation_update_renderer = __esmMin((() => {
	init_automation_update_renderer$1();
	import_react$47 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_i18n$1();
	init_router();
	init_file_path();
	init_tool_protocol();
	import_jsx_runtime$46 = require_jsx_runtime();
	ALL_DAYS = [
		"MO",
		"TU",
		"WE",
		"TH",
		"FR",
		"SA",
		"SU"
	];
	DAY_LABELS = {
		MO: "Mo",
		TU: "Tu",
		WE: "We",
		TH: "Th",
		FR: "Fr",
		SA: "Sa",
		SU: "Su"
	};
	DAY_LABELS_ZH = {
		MO: "周一",
		TU: "周二",
		WE: "周三",
		TH: "周四",
		FR: "周五",
		SA: "周六",
		SU: "周日"
	};
	DEFAULT_ONCE_TIME = "09:00";
	CreateEditModal = ({ draft, setDraft, saving, isZh, onSave, onClose }) => {
		const overlayRef = (0, import_react$47.useRef)(null);
		const [workspaceFolders, setWorkspaceFolders] = (0, import_react$47.useState)([]);
		const [showRepoDropdown, setShowRepoDropdown] = (0, import_react$47.useState)(false);
		let adapter;
		try {
			adapter = useAdapter();
		} catch {
			adapter = void 0;
		}
		(0, import_react$47.useEffect)(() => {
			adapter?.getCurrentWorkspaces().then((folders) => {
				setWorkspaceFolders(folders);
			}).catch(() => {
				setWorkspaceFolders([]);
			});
		}, [adapter]);
		const handleOverlayClick = (e) => {
			if (e.target === overlayRef.current) onClose();
		};
		const scheduleMode = draft.schedule.freq === "HOURLY" ? "interval" : "daily";
		const pad = (n) => String(n).padStart(2, "0");
		const toggleDay = (day) => {
			const byday = draft.schedule.byday.includes(day) ? draft.schedule.byday.filter((d) => d !== day) : [...draft.schedule.byday, day];
			setDraft({
				...draft,
				schedule: {
					...draft.schedule,
					byday,
					freq: byday.length === 7 ? "DAILY" : "WEEKLY"
				}
			});
		};
		const selectedCwds = draft.cwds.split(",").map((c) => c.trim()).filter(Boolean);
		const availableFolders = workspaceFolders.filter((folder) => !selectedCwds.includes(folder.path));
		const addRepo = (path) => {
			const newCwds = [...selectedCwds, path].join(", ");
			setDraft({
				...draft,
				cwds: newCwds
			});
			setShowRepoDropdown(false);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
			className: "atm-modal-overlay",
			ref: overlayRef,
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
				className: "atm-modal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
						className: "atm-modal-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("h2", {
							className: "atm-modal-title",
							children: isZh ? "创建自动化任务" : "Create automation"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
						className: "atm-modal-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("label", {
								className: "atm-modal-label",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("input", {
								className: "atm-modal-input",
								value: draft.name,
								onChange: (e) => setDraft({
									...draft,
									name: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("label", {
								className: "atm-modal-label",
								children: "Projects"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
								className: "atm-modal-tags",
								children: [selectedCwds.map((cwd) => /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("span", {
									className: "atm-modal-tag",
									children: [getProjectName(cwd), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("span", {
										className: "atm-modal-tag-remove",
										onClick: () => {
											const newCwds = selectedCwds.filter((c) => c !== cwd).join(", ");
											setDraft({
												...draft,
												cwds: newCwds
											});
										},
										children: "×"
									})]
								}, cwd)), availableFolders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
									className: "atm-repo-dropdown-container",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
										type: "button",
										className: "atm-repo-add-btn",
										onClick: () => setShowRepoDropdown(!showRepoDropdown),
										children: "+"
									}), showRepoDropdown && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
										className: "atm-repo-dropdown",
										children: availableFolders.map((folder) => /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
											className: "atm-repo-dropdown-item",
											onClick: () => addRepo(folder.path),
											children: formatAutomationCwdLabel(folder.path, t)
										}, folder.path))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("label", {
								className: "atm-modal-label",
								children: "Prompt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("textarea", {
								className: "atm-modal-textarea",
								value: draft.prompt,
								onChange: (e) => setDraft({
									...draft,
									prompt: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("label", {
								className: "atm-modal-label",
								children: "Schedule"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
								className: "atm-schedule-tabs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
									type: "button",
									className: `atm-schedule-tab ${scheduleMode === "daily" ? "active" : ""}`,
									onClick: () => setDraft({
										...draft,
										schedule: {
											...draft.schedule,
											freq: "DAILY",
											byday: ALL_DAYS.slice()
										}
									}),
									children: "Daily"
								}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
									type: "button",
									className: `atm-schedule-tab ${scheduleMode === "interval" ? "active" : ""}`,
									onClick: () => setDraft({
										...draft,
										schedule: {
											...draft.schedule,
											freq: "HOURLY",
											byday: draft.schedule.byday.length > 0 ? draft.schedule.byday : ALL_DAYS.slice()
										}
									}),
									children: "Interval"
								})]
							}),
							scheduleMode === "daily" ? /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
								className: "atm-schedule-daily",
								children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
									className: "atm-schedule-time-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("input", {
										type: "time",
										className: "atm-modal-input atm-schedule-time-input",
										value: `${pad(draft.schedule.byhour)}:${pad(draft.schedule.byminute)}`,
										onChange: (e) => {
											const [h, m] = e.target.value.split(":").map(Number);
											setDraft({
												...draft,
												schedule: {
													...draft.schedule,
													byhour: h || 0,
													byminute: m || 0
												}
											});
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
										className: "atm-schedule-days",
										children: ALL_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
											type: "button",
											className: `atm-schedule-day ${draft.schedule.byday.includes(day) ? "active" : ""}`,
											onClick: () => toggleDay(day),
											children: (isZh ? DAY_LABELS_ZH : DAY_LABELS)[day]
										}, day))
									})]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
								className: "atm-schedule-interval",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("span", {
										className: "atm-schedule-interval-label",
										children: isZh ? "每隔" : "Run every"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("input", {
										type: "number",
										className: "atm-modal-input atm-schedule-interval-input",
										min: 1,
										value: draft.schedule.intervalHours,
										onChange: (e) => setDraft({
											...draft,
											schedule: {
												...draft.schedule,
												intervalHours: Math.max(1, Number(e.target.value) || 1)
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("span", {
										className: "atm-schedule-interval-unit",
										children: isZh ? "小时" : "hours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("span", {
										className: "atm-schedule-interval-on",
										children: isZh ? "在" : "On"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
										className: "atm-schedule-days",
										children: ALL_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
											type: "button",
											className: `atm-schedule-day ${draft.schedule.byday.includes(day) ? "active" : ""}`,
											onClick: () => toggleDay(day),
											children: (isZh ? DAY_LABELS_ZH : DAY_LABELS)[day]
										}, day))
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
						className: "atm-modal-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", { className: "atm-modal-footer-left" }), /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
							className: "atm-modal-footer-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
								type: "button",
								className: "atm-btn atm-btn-secondary",
								disabled: saving,
								onClick: onClose,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
								type: "button",
								className: "atm-btn atm-btn-primary",
								disabled: saving,
								onClick: onSave,
								children: isZh ? "保存" : "Save"
							})]
						})]
					})
				]
			})
		});
	};
	AutomationUpdateCard = ({ tool }) => {
		const isZh = isZhLocale$1();
		const router = useRouterContextSafe();
		let adapter;
		try {
			adapter = useAdapter();
		} catch {
			adapter = void 0;
		}
		const result = readAutomationToolPayload(tool);
		const isPending = result?.pending === true;
		const resultMode = result?.mode ?? (isPending ? "suggested create" : void 0);
		const [saved, setSaved] = (0, import_react$47.useState)(false);
		const [savedAutomationId, setSavedAutomationId] = (0, import_react$47.useState)(void 0);
		const [saving, setSaving] = (0, import_react$47.useState)(false);
		const [showModal, setShowModal] = (0, import_react$47.useState)(false);
		const [draft, setDraft] = (0, import_react$47.useState)(void 0);
		const [matchedAutomationId, setMatchedAutomationId] = (0, import_react$47.useState)(void 0);
		const draftRef = (0, import_react$47.useRef)(draft);
		(0, import_react$47.useEffect)(() => {
			draftRef.current = draft;
		}, [draft]);
		const automationData = (0, import_react$47.useMemo)(() => {
			if (result?.proposedAutomation) {
				const proposed = result.proposedAutomation;
				const cwdsParsed = normalizeCwds(proposed.cwds || "");
				const scheduleType = proposed.scheduleType === "once" ? "once" : "recurring";
				return {
					id: proposed.id || void 0,
					name: proposed.name || "",
					prompt: proposed.prompt || "",
					scheduleType,
					rrule: proposed.rrule || "",
					scheduledAt: proposed.scheduledAt || void 0,
					validFrom: proposed.validFrom || void 0,
					validUntil: proposed.validUntil || void 0,
					nextRunAt: typeof proposed.nextRunAt === "number" ? proposed.nextRunAt : void 0,
					cwds: cwdsParsed.join(", "),
					status: proposed.status || "ACTIVE"
				};
			}
			if (result?.automation) {
				const a = result.automation;
				const scheduleType = a.scheduleType === "once" ? "once" : "recurring";
				return {
					id: a.id || void 0,
					name: a.name || "",
					prompt: a.prompt || "",
					scheduleType,
					rrule: a.rrule || "",
					scheduledAt: a.scheduledAt || void 0,
					validFrom: a.validFrom || void 0,
					validUntil: a.validUntil || void 0,
					nextRunAt: typeof a.nextRunAt === "number" ? a.nextRunAt : void 0,
					cwds: normalizeCwds(Array.isArray(a.cwds) ? a.cwds : a.cwds || "").join(", "),
					status: a.status || "ACTIVE"
				};
			}
			return null;
		}, [result]);
		(0, import_react$47.useEffect)(() => {
			if (!isPending || !automationData || !adapter || !isCreateResultMode(resultMode)) {
				setMatchedAutomationId(void 0);
				return;
			}
			let cancelled = false;
			const syncMatchedAutomation = (snapshot) => {
				if (cancelled) return;
				setMatchedAutomationId(findMatchingAutomationId(snapshot, automationData));
			};
			adapter.getAutomationSnapshot().then(syncMatchedAutomation).catch(() => {
				if (cancelled) return;
				setMatchedAutomationId(void 0);
			});
			const unsubscribe = adapter.onAutomationSnapshotUpdate?.(syncMatchedAutomation);
			return () => {
				cancelled = true;
				unsubscribe?.();
			};
		}, [
			isPending,
			automationData,
			adapter,
			resultMode
		]);
		const scheduleLabel = (0, import_react$47.useMemo)(() => automationData ? describeAutomationCardSchedule(automationData, isZh) : "", [automationData, isZh]);
		const validityLabel = (0, import_react$47.useMemo)(() => automationData ? describeValidityLabel(automationData, isZh) : "", [automationData, isZh]);
		const promptSummary = (0, import_react$47.useMemo)(() => automationData?.prompt ? summarizePrompt(automationData.prompt) : "", [automationData]);
		const handleCloseModal = (0, import_react$47.useCallback)(() => {
			setShowModal(false);
		}, []);
		const applyAutomation = (0, import_react$47.useCallback)(async (automationDraft) => {
			if (!adapter || !resultMode || resultMode === "view" || resultMode === "list") return false;
			setSaving(true);
			try {
				const applyMode = getAutomationApplyModeForResult(resultMode);
				const payload = buildAutomationPayload(applyMode, automationDraft, applyMode === "suggested update" ? automationData?.id : void 0);
				const updateResult = await adapter.updateAutomation(payload);
				if (updateResult.success) {
					const appliedAutomationId = updateResult.automation?.id || automationData?.id || updateResult.snapshot && findMatchingAutomationId(updateResult.snapshot, {
						id: automationData?.id,
						name: automationDraft.name,
						prompt: automationDraft.prompt,
						scheduleType: automationDraft.scheduleType,
						rrule: automationDraft.scheduleType === "once" ? "" : buildRRule(automationDraft.schedule),
						scheduledAt: automationDraft.scheduleType === "once" ? buildIsoFromDateTimeInput(automationDraft.scheduledDate, automationDraft.scheduledTime) : void 0,
						validFrom: buildValidityBoundaryIso(automationDraft.validFromDate, "start"),
						validUntil: buildValidityBoundaryIso(automationDraft.validUntilDate, "end"),
						nextRunAt: automationData?.nextRunAt,
						cwds: automationDraft.cwds,
						status: automationDraft.status
					});
					setSaved(true);
					setSavedAutomationId(appliedAutomationId);
					setMatchedAutomationId(appliedAutomationId);
					setShowModal(false);
					return true;
				}
				console.error(`[AutomationUpdateCard] ${applyMode} failed:`, updateResult.message);
				return false;
			} catch (error) {
				console.error("[AutomationUpdateCard] Save error:", error);
				return false;
			} finally {
				setSaving(false);
			}
		}, [
			adapter,
			automationData,
			resultMode
		]);
		const handleSave = (0, import_react$47.useCallback)(async () => {
			const currentDraft = draftRef.current;
			if (!currentDraft) return;
			await applyAutomation(currentDraft);
		}, [applyAutomation]);
		const showPending = !!automationData && isPending && !saved && !!!matchedAutomationId;
		const pendingActionLabel = isZh ? "历史建议，需重新执行创建" : "Historical proposal, re-run to create";
		if (!automationData) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)(import_jsx_runtime$46.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
			className: "automation-update-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
				className: "automation-update-card-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
					className: "automation-update-card-info",
					children: [
						scheduleLabel && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-schedule",
							children: scheduleLabel
						}),
						validityLabel && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-validity",
							children: validityLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-name",
							children: automationData.name
						}),
						promptSummary && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-prompt",
							children: promptSummary
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
					className: "automation-update-card-action",
					children: showPending ? /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
						type: "button",
						className: "automation-update-btn create-btn",
						disabled: true,
						children: pendingActionLabel
					}) : /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("button", {
						type: "button",
						className: "automation-update-btn open-btn",
						onClick: () => {
							const editId = savedAutomationId || matchedAutomationId || automationData.id || (result?.automation)?.id;
							router?.navigateToPath(editId ? `/automation?editId=${editId}` : "/automation");
						},
						children: isZh ? "打开" : "Open"
					})
				})]
			})
		}), showModal && draft && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(CreateEditModal, {
			draft,
			setDraft,
			saving,
			isZh,
			onSave: handleSave,
			onClose: handleCloseModal
		})] });
	};
	AUTOMATION_LIST_DISPLAY_LIMIT = 10;
	AutomationListCard = ({ automations }) => {
		const isZh = isZhLocale$1();
		const total = automations.length;
		const headerText = isZh ? `自动化任务列表（共 ${total} 条）` : `Automations (${total})`;
		if (total === 0) return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
			className: "automation-list-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
				className: "automation-list-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
					className: "automation-list-header",
					children: headerText
				}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
					className: "automation-list-empty",
					children: isZh ? "暂无自动化任务" : "No automations yet."
				})]
			})
		});
		const visible = automations.slice(0, AUTOMATION_LIST_DISPLAY_LIMIT);
		const hidden = total - visible.length;
		return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
			className: "automation-list-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
				className: "automation-list-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
						className: "automation-list-header",
						children: headerText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
						className: "automation-list-items",
						children: visible.map((item, idx) => {
							const scheduleText = describeListItemSchedule(item, !!isZh);
							const statusClass = item.status === "PAUSED" ? "status-paused" : "";
							const statusLabel = getAutomationStatusLabel(item.status);
							return /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
								className: "automation-list-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
									className: "automation-list-item-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
										className: "automation-list-item-name",
										children: item.name || (isZh ? "（未命名）" : "(untitled)")
									}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
										className: `automation-list-item-status ${statusClass}`,
										children: statusLabel
									})]
								}), (scheduleText || item.id) && /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
									className: "automation-list-item-meta",
									children: [scheduleText && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
										className: "automation-list-item-schedule",
										children: scheduleText
									}), item.id && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
										className: "automation-list-item-id",
										title: item.id,
										children: item.id
									})]
								})]
							}, item.id ?? `row-${idx}`);
						})
					}),
					hidden > 0 && /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
						className: "automation-list-more",
						children: isZh ? `还有 ${hidden} 条未显示，可使用 view 查看具体任务` : `+${hidden} more (use view for details)`
					})
				]
			})
		});
	};
	AutomationDeleteResultCard = ({ tool }) => {
		const isZh = isZhLocale$1();
		const payload = readAutomationToolPayload(tool);
		const outer = tool.result;
		const isFailed = tool.status === "failed" || outer?.success === false || payload?.success === false;
		const deletedAutomationId = typeof payload?.deletedAutomationId === "string" ? payload.deletedAutomationId : typeof tool.args?.id === "string" ? tool.args.id : void 0;
		const statusLabel = isFailed ? isZh ? "删除失败" : "Delete failed" : isZh ? "删除成功" : "Deleted";
		const title = deletedAutomationId ? `${isZh ? "自动化任务 ID" : "Automation ID"}: ${deletedAutomationId}` : isZh ? "自动化任务删除结果" : "Automation delete result";
		const message = extractAutomationToolMessage(tool) || (isFailed ? isZh ? "删除自动化任务失败" : "Failed to delete automation" : isZh ? "自动化任务已删除" : "Automation deleted");
		return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
			className: "automation-update-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
				className: "automation-update-card-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", {
					className: "automation-update-card-info",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-schedule",
							children: statusLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-name",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-prompt",
							children: message
						})
					]
				})
			})
		});
	};
	AutomationUpdateRenderer = class {
		constructor() {
			this.theme = "none";
		}
		canHandle(tool) {
			const name = tool.name;
			if (name !== "automation_update" && !(typeof name === "string" && name.endsWith("__automation_update"))) return ToolRendererPriority.NONE;
			return ToolRendererPriority.EXACT;
		}
		render(tool, _config, _context) {
			if (isAutomationDeleteFinalCard(tool)) return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(AutomationDeleteResultCard, { tool });
			if (tool.status !== "executed" && tool.status !== "failed") {
				const isZh = isZhLocale$1();
				const argsMode = tool.args?.mode;
				const isExecuting = tool.status === "full_executing" || tool.status === "stream_executing";
				return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
					className: "automation-update-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
						className: "automation-update-card-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
							className: "automation-update-card-info",
							children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("div", {
								className: "automation-update-name",
								children: (() => {
									if (!isExecuting) return isZh ? "自动化任务" : "Automation";
									if (argsMode === "list") return isZh ? "读取自动化任务中..." : "Listing automations...";
									if (argsMode === "view") return isZh ? "查看自动化任务中..." : "Loading automation...";
									if (argsMode === "update" || argsMode === "suggested update") return isZh ? "更新自动化任务中..." : "Updating automation...";
									if (argsMode === "delete") return isZh ? "删除自动化任务中..." : "Deleting automation...";
									return isZh ? "创建自动化任务中..." : "Creating automation...";
								})()
							})
						})
					})
				});
			}
			const listPayload = readAutomationToolPayload(tool);
			if (listPayload?.mode === "list") {
				const raw = listPayload.automations;
				return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(AutomationListCard, { automations: Array.isArray(raw) ? raw : [] });
			}
			if (tool.args?.mode === "delete") return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(AutomationDeleteResultCard, { tool });
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(AutomationUpdateCard, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/automation-update/index.ts
var init_automation_update = __esmMin((() => {
	init_automation_update_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/tool-icon-render-config.ts
var toolIconRenderConfig;
var init_tool_icon_render_config = __esmMin((() => {
	init_tool_icon_registry();
	toolIconRenderConfig = {
		renderIcon: (toolName, attrs) => getToolIcon(toolName, {
			size: 14,
			className: attrs?.className,
			style: attrs?.style
		}),
		renderStatusIcon: (status, attrs) => getStatusIcon$2(status, {
			className: attrs?.className,
			style: attrs?.style
		})
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/connect-cloud-service/connect-cloud-service-renderer.tsx
function isConnectCloudServiceToolCall(tool) {
	return tool.name === "connect_cloud_service" || tool.name === "ConnectCloudService";
}
var import_jsx_runtime$45, ConnectCloudServiceRendererFactory, ConnectCloudServiceRenderer;
var init_connect_cloud_service_renderer = __esmMin((() => {
	init_src();
	require_react();
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$45 = require_jsx_runtime();
	ConnectCloudServiceRendererFactory = createConnectCloudServiceRenderer(toolIconRenderConfig);
	ConnectCloudServiceRenderer = class {
		canHandle(tool) {
			return isConnectCloudServiceToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, _context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)(ConnectCloudServiceRendererFactory, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/connect-cloud-service/index.ts
var init_connect_cloud_service = __esmMin((() => {
	init_connect_cloud_service_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/mcp-tool-display.ts
function isZhLocale(locale) {
	return locale.toLowerCase().startsWith("zh");
}
function getRawMcpToolPart(rawName) {
	return rawName.match(/^mcp__(.+?)__(.+)$/)?.[2] || rawName;
}
function humanizeToolName(rawName, locale) {
	const toolPart = getRawMcpToolPart(rawName).replace(/[_-]+/g, " ").trim();
	if (!toolPart) return isZhLocale(locale) ? "执行延迟工具" : "Running deferred tool";
	if (isZhLocale(locale)) return toolPart;
	return toolPart.replace(/\b\w/g, (char) => char.toUpperCase());
}
function getFallbackIcon(rawName) {
	if (rawName.startsWith("mcp__")) return {
		iconName: "BookOpen",
		Icon: BookOpen
	};
	return {
		iconName: "ToolCase",
		Icon: ToolCase
	};
}
function isRecord$4(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function parseRecord$1(value) {
	if (isRecord$4(value)) return value;
	if (typeof value !== "string" || !value.trim()) return;
	try {
		const parsed = JSON.parse(value);
		return isRecord$4(parsed) ? parsed : void 0;
	} catch {
		return;
	}
}
function collectArgRecords(args, depth = 0) {
	if (depth > 4) return [];
	const record = parseRecord$1(args);
	if (!record) return [];
	return [
		record,
		...collectArgRecords(record.arguments, depth + 1),
		...collectArgRecords(record.params, depth + 1)
	];
}
function parseJsonValue(value) {
	if (typeof value !== "string" || !value.trim()) return value;
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
}
function getArgValue(args, keys) {
	for (const record of collectArgRecords(args)) for (const key of keys) if (Object.prototype.hasOwnProperty.call(record, key)) {
		const value = record[key];
		if (value !== void 0 && value !== null && (typeof value !== "string" || value.trim())) return value;
	}
}
function toDisplayString(value) {
	const parsed = parseJsonValue(value);
	if (typeof parsed === "string") return parsed.trim() || void 0;
	if (typeof parsed === "number" || typeof parsed === "boolean") return String(parsed);
}
function getCount(value) {
	const parsed = parseJsonValue(value);
	if (Array.isArray(parsed)) return parsed.length;
	if (isRecord$4(parsed)) return Object.keys(parsed).length;
	if (typeof parsed === "string" && parsed.trim()) {
		const lines = parsed.split(/\r?\n/g).map((line) => line.trim()).filter(Boolean);
		return Math.max(lines.length, 1);
	}
}
function getList(value, locale, maxItems = 3) {
	const parsed = parseJsonValue(value);
	const items = (Array.isArray(parsed) ? parsed : typeof parsed === "string" ? parsed.split(/[,，]/g) : []).map((item) => toDisplayString(item)).filter((item) => !!item);
	if (items.length === 0) return;
	const separator = isZhLocale(locale) ? "、" : ", ";
	const visible = items.slice(0, maxItems).join(separator);
	const hiddenCount = items.length - maxItems;
	return hiddenCount > 0 ? `${visible} +${hiddenCount}` : visible;
}
function formatCount(count, unitZh, unitEn, locale) {
	return isZhLocale(locale) ? `${count} ${unitZh}` : `${count} ${unitEn}`;
}
function summarizeArgs(config, args, locale) {
	if (!config) return;
	switch (config.type) {
		case "string": return toDisplayString(getArgValue(args, config.keys));
		case "list": return getList(getArgValue(args, config.keys), locale, config.maxItems);
		case "count": {
			const count = getCount(getArgValue(args, config.keys));
			return count === void 0 ? void 0 : formatCount(count, config.unitZh, config.unitEn, locale);
		}
		case "dimension": {
			const width = toDisplayString(getArgValue(args, [config.widthKey]));
			const height = toDisplayString(getArgValue(args, [config.heightKey]));
			return width && height ? `${width} x ${height}` : void 0;
		}
		case "flag": {
			const value = getArgValue(args, [config.key]);
			return value === true || value === "true" ? isZhLocale(locale) ? config.label : config.labelEn : void 0;
		}
		case "first": return config.items.map((item) => summarizeArgs(item, args, locale)).find((summary) => !!summary);
		case "join": {
			const summaries = config.items.map((item) => summarizeArgs(item, args, locale)).filter((summary) => !!summary);
			return summaries.length > 0 ? summaries.join(config.separator || " · ") : void 0;
		}
		default: return;
	}
}
function getKnownMcpToolDisplayDefinition(rawName) {
	if (!rawName) return;
	return MCP_TOOL_DISPLAY_MAP.get(rawName);
}
function hasKnownMcpToolDisplayInfo(rawName) {
	return !!getKnownMcpToolDisplayDefinition(rawName);
}
function getMcpToolDisplayInfo(rawName, locale, args) {
	const definition = getKnownMcpToolDisplayDefinition(rawName);
	const isZh = isZhLocale(locale);
	if (definition) return {
		rawName,
		label: isZh ? definition.label : definition.labelEn,
		summary: summarizeArgs(definition.summary, args, locale),
		iconName: definition.iconName,
		Icon: definition.Icon
	};
	const fallback = getFallbackIcon(rawName);
	return {
		rawName,
		label: humanizeToolName(rawName, locale),
		iconName: fallback.iconName,
		Icon: fallback.Icon
	};
}
var stringSummary, listSummary, countSummary, dimensionSummary, flagSummary, firstSummary, joinSummary, ARDOT_MCP_TOOL_DISPLAY_DEFINITIONS, BUILTIN_MCP_TOOL_DISPLAY_DEFINITIONS, MCP_TOOL_DISPLAY_DEFINITIONS, MCP_TOOL_DISPLAY_MAP;
var init_mcp_tool_display$1 = __esmMin((() => {
	init_lucide_react();
	stringSummary = (...keys) => ({
		type: "string",
		keys
	});
	listSummary = (...keys) => ({
		type: "list",
		keys,
		maxItems: 3
	});
	countSummary = (keys, unitZh, unitEn) => ({
		type: "count",
		keys,
		unitZh,
		unitEn
	});
	dimensionSummary = (widthKey, heightKey) => ({
		type: "dimension",
		widthKey,
		heightKey
	});
	flagSummary = (key, label, labelEn) => ({
		type: "flag",
		key,
		label,
		labelEn
	});
	firstSummary = (...items) => ({
		type: "first",
		items
	});
	joinSummary = (...items) => ({
		type: "join",
		items
	});
	ARDOT_MCP_TOOL_DISPLAY_DEFINITIONS = [
		{
			toolName: "mcp__ardot__create_design",
			label: "创建设计文件",
			labelEn: "Creating design file",
			summary: stringSummary("filename", "fileName", "name", "title"),
			iconName: "FilePlus2",
			Icon: FilePlusCorner
		},
		{
			toolName: "mcp__ardot__open_design",
			label: "打开设计文件",
			labelEn: "Opening design file",
			summary: stringSummary("fileUrl", "fileURL", "fileId", "id"),
			iconName: "FolderOpen",
			Icon: FolderOpen
		},
		{
			toolName: "mcp__ardot__fetch_editor_state",
			label: "读取编辑器状态",
			labelEn: "Reading editor state",
			summary: stringSummary("fileId"),
			iconName: "Eye",
			Icon: Eye
		},
		{
			toolName: "mcp__ardot__fetch_guidelines",
			label: "获取设计规范",
			labelEn: "Fetching design guidelines",
			summary: stringSummary("topic"),
			iconName: "BookOpenCheck",
			Icon: BookOpenCheck
		},
		{
			toolName: "mcp__ardot__fetch_style_guide_tags",
			label: "获取可用风格",
			labelEn: "Fetching styles",
			iconName: "Tags",
			Icon: Tags
		},
		{
			toolName: "mcp__ardot__fetch_style_guide",
			label: "加载风格指南",
			labelEn: "Loading style guide",
			summary: firstSummary(stringSummary("name"), listSummary("tags")),
			iconName: "SwatchBook",
			Icon: SwatchBook
		},
		{
			toolName: "mcp__ardot__get_available_fonts",
			label: "获取可用字体",
			labelEn: "Fetching fonts",
			iconName: "Type",
			Icon: Type
		},
		{
			toolName: "mcp__ardot__batch_edit",
			label: "正在编辑画布",
			labelEn: "Editing canvas",
			summary: countSummary(["operations"], "个操作", "operations"),
			iconName: "PencilLine",
			Icon: PencilLine
		},
		{
			toolName: "mcp__ardot__batch_read",
			label: "读取设计节点",
			labelEn: "Reading design nodes",
			summary: firstSummary(listSummary("patterns"), countSummary(["nodeIds", "nodeIDs"], "个节点", "nodes")),
			iconName: "Files",
			Icon: Files
		},
		{
			toolName: "mcp__ardot__locate_available_space",
			label: "寻找可用空间",
			labelEn: "Finding available space",
			summary: dimensionSummary("width", "height"),
			iconName: "Grid2X2Plus",
			Icon: Grid2x2Plus
		},
		{
			toolName: "mcp__ardot__capture_screenshot",
			label: "截图检查设计效果",
			labelEn: "Checking design screenshot",
			summary: stringSummary("nodeId"),
			iconName: "Camera",
			Icon: Camera
		},
		{
			toolName: "mcp__ardot__capture_layout",
			label: "检查布局结构",
			labelEn: "Inspecting layout",
			summary: firstSummary(stringSummary("parentId"), flagSummary("problemsOnly", "仅问题节点", "Problems only")),
			iconName: "LayoutPanelTop",
			Icon: LayoutPanelTop
		},
		{
			toolName: "mcp__ardot__fetch_variables",
			label: "读取设计变量",
			labelEn: "Reading design variables",
			summary: stringSummary("fileId"),
			iconName: "Variable",
			Icon: Variable
		},
		{
			toolName: "mcp__ardot__apply_variables",
			label: "更新设计变量",
			labelEn: "Updating design variables",
			summary: countSummary(["variables"], "个变量", "variables"),
			iconName: "PackageCheck",
			Icon: PackageCheck
		},
		{
			toolName: "mcp__ardot__export_nodes",
			label: "导出设计资源",
			labelEn: "Exporting design assets",
			summary: joinSummary(stringSummary("format"), countSummary(["nodeIds", "nodeIDs"], "个节点", "nodes")),
			iconName: "ImageDown",
			Icon: ImageDown
		},
		{
			toolName: "mcp__ardot__upload_images",
			label: "上传并应用图片",
			labelEn: "Uploading images",
			summary: countSummary(["items"], "张图片", "images"),
			iconName: "UploadCloud",
			Icon: CloudUpload
		},
		{
			toolName: "mcp__ardot__scan_exportable_resources",
			label: "扫描可导出资源",
			labelEn: "Scanning exportable resources",
			summary: stringSummary("nodeId"),
			iconName: "ScanSearch",
			Icon: ScanSearch
		},
		{
			toolName: "mcp__ardot__save_tokens",
			label: "保存平台令牌",
			labelEn: "Saving platform tokens",
			iconName: "KeyRound",
			Icon: KeyRound
		},
		{
			toolName: "mcp__ardot__export_to_code",
			label: "导出设计代码",
			labelEn: "Exporting design code",
			iconName: "FileCode2",
			Icon: FileCodeCorner
		}
	];
	BUILTIN_MCP_TOOL_DISPLAY_DEFINITIONS = [{
		toolName: "ListMcpResources",
		label: "列出 MCP 资源",
		labelEn: "Listing MCP resources",
		summary: stringSummary("serverName"),
		iconName: "BookOpen",
		Icon: BookOpen
	}, {
		toolName: "ReadMcpResource",
		label: "读取 MCP 资源",
		labelEn: "Reading MCP resource",
		summary: stringSummary("uri", "serverName"),
		iconName: "BookOpenCheck",
		Icon: BookOpenCheck
	}];
	MCP_TOOL_DISPLAY_DEFINITIONS = [...ARDOT_MCP_TOOL_DISPLAY_DEFINITIONS, ...BUILTIN_MCP_TOOL_DISPLAY_DEFINITIONS];
	MCP_TOOL_DISPLAY_MAP = new Map(MCP_TOOL_DISPLAY_DEFINITIONS.map((definition) => [definition.toolName, definition]));
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/mcp-tool-display-list.scss
var init_mcp_tool_display_list$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/mcp-tool-display-list.tsx
function formatDetail(detail) {
	if (typeof detail === "string") return detail;
	try {
		return JSON.stringify(detail, null, 2);
	} catch {
		return String(detail);
	}
}
var import_classnames$7, import_react$45, import_jsx_runtime$44, McpToolDisplayList;
var init_mcp_tool_display_list = __esmMin((() => {
	init_mcp_tool_display_list$1();
	import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
	init_lucide_react();
	import_react$45 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$44 = require_jsx_runtime();
	McpToolDisplayList = ({ items, detail, detailKey, progress, isRunning, renderIcon }) => {
		const [expanded, setExpanded] = (0, import_react$45.useState)(false);
		const hasDetail = detail !== void 0;
		const detailText = (0, import_react$45.useMemo)(() => hasDetail ? formatDetail(detail) : "", [detail, hasDetail]);
		const t = useTranslation();
		const progressText = (0, import_react$45.useMemo)(() => {
			if (!progress) return "";
			const hasTotal = typeof progress.total === "number" && progress.total > 0;
			const hasMessage = typeof progress.message === "string" && progress.message.length > 0;
			if (hasTotal) {
				const currentPart = `${progress.progress}/${progress.total}`;
				return hasMessage ? `${currentPart} - ${progress.message}` : currentPart;
			}
			const message = hasMessage ? progress.message : t("tool.mcp.progress.defaultMessage");
			return `${progress.progress} - ${message}`;
		}, [progress, t]);
		const showProgress = !!(isRunning && progressText);
		(0, import_react$45.useEffect)(() => {
			setExpanded(false);
		}, [detailKey]);
		return /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", {
			className: "assistant-message-tools",
			children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", {
				className: "assistant-message-tool-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", {
					className: "assistant-message-tool mcp-tool-display",
					children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
						className: "tool-inner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", {
								className: (0, import_classnames$7.default)("mcp-tool-display-list", { "mcp-tool-display-list--clickable": hasDetail }),
								role: "list",
								onClick: hasDetail ? () => {
									const sel = window.getSelection();
									if (sel) sel.removeAllRanges();
									setExpanded((prev) => !prev);
								} : void 0,
								children: items.map((item) => {
									const Icon = item.Icon;
									const externalIconNode = renderIcon?.(item.rawName, { className: "mcp-tool-display-list__icon-svg" });
									return /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
										className: "mcp-tool-display-list__item",
										role: "listitem",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", {
												className: "mcp-tool-display-list__rail",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", {
													className: "mcp-tool-display-list__icon",
													children: externalIconNode || /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)(Icon, {
														size: 14,
														strokeWidth: 2.2
													})
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("span", {
												className: "mcp-tool-display-list__text",
												title: item.summary ? `${item.label} · ${item.summary}` : item.rawName,
												children: [/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", {
													className: "mcp-tool-display-list__label",
													children: item.label
												}), item.summary ? /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", {
													className: "mcp-tool-display-list__summary",
													children: item.summary
												}) : null]
											}),
											hasDetail ? /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", {
												className: "mcp-tool-display-list__chevron",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)(ChevronRight, {
													size: 13,
													strokeWidth: 2,
													className: (0, import_classnames$7.default)("mcp-tool-display-list__chevron-icon", { "mcp-tool-display-list__chevron-icon--expanded": expanded })
												})
											}) : null
										]
									}, item.rawName);
								})
							}),
							showProgress ? /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
								className: "mcp-tool-display-list__progress",
								role: "status",
								"aria-live": "polite",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", {
									className: "mcp-tool-display-list__progress-spinner",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("span", {
									className: "mcp-tool-display-list__progress-text",
									children: progressText
								})]
							}) : null,
							hasDetail && expanded ? /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("pre", {
								className: "mcp-tool-display-list__detail",
								children: detailText
							}) : null
						]
					})
				})
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/defer-execute/defer-execute-utils.ts
function isRecord$3(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function safeJsonParse$3(value) {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
function parseRecord(value) {
	if (isRecord$3(value)) return value;
	const parsed = typeof value === "string" ? safeJsonParse$3(value) : void 0;
	return isRecord$3(parsed) ? parsed : void 0;
}
function normalizeToolName$3(value) {
	return String(value || "").trim().toLowerCase().replace(/[-\s]/g, "_");
}
function isDeferExecuteToolName(name) {
	return DEFER_EXECUTE_TOOL_NAMES.has(normalizeToolName$3(name));
}
function isDeferExecuteToolCall(tool) {
	return isDeferExecuteToolName(tool.name);
}
function addToolName(name, state) {
	const trimmed = name.trim();
	if (!trimmed || isDeferExecuteToolName(trimmed) || state.seen.has(trimmed)) return;
	state.seen.add(trimmed);
	state.names.push(trimmed);
}
function extractMcpToolNamesFromText(text, state) {
	text.match(MCP_TOOL_NAME_PATTERN)?.forEach((name) => addToolName(name, state));
}
function collectExplicitToolNameFromArgs(args, state, depth = 0) {
	if (depth > 4) return;
	const record = parseRecord(args);
	if (!record) return;
	const targetToolName = record.toolName ?? record.tool_name;
	if (typeof targetToolName === "string") addToolName(targetToolName, state);
	if (record.arguments !== void 0) collectExplicitToolNameFromArgs(record.arguments, state, depth + 1);
}
function collectMcpToolNamesFromValue(value, state, depth = 0, keyName) {
	if (depth > 8 || value === void 0 || value === null) return;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return;
		if (!keyName || /^(text|content|message)$/i.test(keyName)) state.joinedTextParts.push(trimmed);
		extractMcpToolNamesFromText(trimmed, state);
		const parsed = safeJsonParse$3(trimmed);
		if (parsed !== void 0) collectMcpToolNamesFromValue(parsed, state, depth + 1);
		return;
	}
	if (Array.isArray(value)) {
		value.forEach((item) => collectMcpToolNamesFromValue(item, state, depth + 1, keyName));
		return;
	}
	if (!isRecord$3(value)) return;
	for (const [key, nestedValue] of Object.entries(value)) collectMcpToolNamesFromValue(nestedValue, state, depth + 1, key);
}
function extractDeferredToolNames(tool) {
	const state = {
		names: [],
		seen: /* @__PURE__ */ new Set(),
		joinedTextParts: []
	};
	collectExplicitToolNameFromArgs(tool.args, state);
	collectMcpToolNamesFromValue(tool.result, state);
	collectMcpToolNamesFromValue(tool.metaData, state);
	extractMcpToolNamesFromText(state.joinedTextParts.join(""), state);
	extractMcpToolNamesFromText(state.joinedTextParts.join("\n"), state);
	return state.names;
}
function extractDeferredToolArgs(tool) {
	const args = parseRecord(tool.args);
	if (!args) return;
	const params = parseRecord(args.params);
	if (params) return params;
	const argumentArgs = parseRecord(args.arguments);
	if (argumentArgs) return parseRecord(argumentArgs.params) || argumentArgs;
	return args;
}
var MCP_TOOL_NAME_PATTERN, DEFER_EXECUTE_TOOL_NAMES;
var init_defer_execute_utils = __esmMin((() => {
	init_mcp_tool_display$1();
	MCP_TOOL_NAME_PATTERN = /mcp__[A-Za-z0-9_.-]+__[A-Za-z0-9_.:/-]+/g;
	DEFER_EXECUTE_TOOL_NAMES = new Set(["defer_execute_tool", "deferexecutetool"]);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/defer-execute/defer-execute-renderer.tsx
function normalizeDetailArgs(args) {
	if (!args || typeof args !== "object") return args;
	const record = args;
	if (record.params && typeof record.params === "object") return record.params;
	if (record.arguments && typeof record.arguments === "object") {
		const nested = record.arguments;
		return nested.params && typeof nested.params === "object" ? nested.params : nested;
	}
	return record;
}
function tryParseJsonText(text) {
	const trimmed = text.trim();
	if (!trimmed || !trimmed.startsWith("{") && !trimmed.startsWith("[")) return text;
	try {
		return JSON.parse(trimmed);
	} catch {
		return text;
	}
}
function normalizeDetailResult(result) {
	if (result.error) return {
		error: result.error,
		data: normalizeDetailResult({
			...result,
			error: void 0
		})
	};
	const data = result.data;
	if (!Array.isArray(data)) return data ?? result;
	const textItems = data.filter((item) => item && typeof item === "object" && item.type === "text");
	if (textItems.length === data.length) return tryParseJsonText(textItems.map((item) => item.text).filter((value) => typeof value === "string").join(""));
	return data;
}
function buildToolNameSource(tool) {
	const resultWrapper = tool.result;
	const result = resultWrapper?.result;
	const rawData = result?.rawData;
	if (!Array.isArray(rawData)) return tool;
	return {
		...tool,
		result: {
			...resultWrapper,
			result: {
				...result,
				data: rawData
			}
		}
	};
}
function buildToolDetail$1(tool) {
	const result = tool.result?.result || {};
	return {
		parameters: normalizeDetailArgs(tool.args),
		result: normalizeDetailResult(result)
	};
}
function extractMcpProgress$1(tool) {
	const raw = tool.metaData?.mcpProgress;
	if (!raw || typeof raw.progress !== "number") return;
	return {
		progress: raw.progress,
		total: typeof raw.total === "number" ? raw.total : void 0,
		message: typeof raw.message === "string" ? raw.message : void 0
	};
}
function DeferExecuteRendererContent(props) {
	const { tool } = props;
	const { locale } = useI18n();
	const items = (0, import_react$44.useMemo)(() => {
		const names = extractDeferredToolNames(buildToolNameSource(tool));
		const args = extractDeferredToolArgs(tool);
		return (names.length > 0 ? names : ["defer_execute_tool"]).map((name) => getMcpToolDisplayInfo(name, locale, args));
	}, [tool, locale]);
	const progress = (0, import_react$44.useMemo)(() => extractMcpProgress$1(tool), [tool]);
	const isRunning = RUNNING_STATUSES$1.has(tool.status);
	return /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(McpToolDisplayList, {
		items,
		detail: buildToolDetail$1(tool),
		detailKey: tool.id,
		progress,
		isRunning,
		renderIcon: (rawName, attrs) => {
			if (hasKnownMcpToolDisplayInfo(rawName)) return;
			return getToolIcon(rawName, {
				size: 14,
				className: attrs?.className,
				style: attrs?.style
			});
		}
	});
}
var import_react$44, import_jsx_runtime$43, RUNNING_STATUSES$1, DeferExecuteRenderer;
var init_defer_execute_renderer = __esmMin((() => {
	import_react$44 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_icon_registry();
	init_tool_protocol();
	init_mcp_tool_display$1();
	init_mcp_tool_display_list();
	init_defer_execute_utils();
	import_jsx_runtime$43 = require_jsx_runtime();
	RUNNING_STATUSES$1 = new Set([
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	]);
	DeferExecuteRenderer = class {
		constructor() {
			this.className = "defer-execute";
			this.theme = "none";
		}
		canHandle(tool) {
			return isDeferExecuteToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			if (!isDeferExecuteToolCall(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(DeferExecuteRendererContent, {
				tool,
				context
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/defer-execute/index.ts
var init_defer_execute = __esmMin((() => {
	init_defer_execute_renderer();
	init_defer_execute_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/delete-files/delete-files-renderer.scss
var init_delete_files_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/delete-files/delete-files-renderer.tsx
/**
* 检查是否为 DeleteFile 工具调用
*/
function isDeleteFileToolCall(tool) {
	return tool.name === "delete_files" || tool.name === "delete-files" || tool.name === "delete_file";
}
var import_react$43, import_jsx_runtime$42, DeleteFileToolAdapter, DeleteFileRendererWithContext, DeleteFilesRenderer;
var init_delete_files_renderer = __esmMin((() => {
	init_delete_files_renderer$1();
	init_src();
	import_react$43 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$42 = require_jsx_runtime();
	DeleteFileToolAdapter = class {
		constructor(tool) {
			if (!isDeleteFileToolCall(tool)) throw new Error(`Invalid tool type for DeleteFileToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 收敛 args：orphan tool-call（仅带 result、无输入 args，来自 Mock 注入 / history
		* 回放 / ACP 边界）运行时 args 可能为 undefined，直读成员会抛
		* "Cannot read properties of undefined" 导致整页 crash。恒返回对象。
		*/
		get safeArgs() {
			return toRecordOrEmpty(this.tool.args);
		}
		/**
		* 获取要删除的文件路径，支持多种参数格式
		*/
		getFilePath() {
			return this.safeArgs.target_file || this.safeArgs.filePath || this.safeArgs.file_path || this.safeArgs.path || this.safeArgs.file || "";
		}
		/**
		* 获取说明信息
		*/
		getExplanation() {
			return this.safeArgs.explanation || "";
		}
		/**
		* 获取删除结果
		*/
		getSuccess() {
			return this.tool.result?.success ?? this.tool.status === "executed";
		}
		/**
		* 获取错误信息
		*/
		getErrorMessage() {
			return this.tool.result?.error;
		}
		/**
		* 转换为 DeleteFileData 格式
		*/
		toDeleteFileData() {
			return {
				filePath: this.getFilePath(),
				explanation: this.getExplanation(),
				success: this.getSuccess(),
				errorMessage: this.getErrorMessage()
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	DeleteFileRendererWithContext = ({ tool, context }) => {
		const contextRef = (0, import_react$43.useRef)(context);
		(0, import_react$43.useEffect)(() => {
			contextRef.current = context;
		}, [context]);
		const isCompact = context?.compact ?? false;
		return (0, import_react$43.useMemo)(() => createDeleteFileRenderer({
			compact: isCompact,
			converter: (t) => {
				return new DeleteFileToolAdapter(t).toDeleteFileData();
			},
			onFileClick: (filePath) => {
				contextRef.current?.onFileClick?.(filePath);
			},
			...toolIconRenderConfig
		}), [isCompact])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	DeleteFilesRenderer = class {
		constructor(_config) {
			this.className = "delete-files";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isDeleteFileToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, _config, context) {
			if (!isDeleteFileToolCall(tool)) {
				console.warn("[DeleteFilesRenderer] Invalid tool type:", tool.name, "- expected: delete_files, delete-files, or delete_file");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(DeleteFileRendererWithContext, {
					tool,
					context
				});
			} catch (error) {
				console.error("[DeleteFilesRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
					className: "delete-file-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
							className: "error-message",
							children: ["Error processing delete file tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/delete-files/index.ts
var init_delete_files = __esmMin((() => {
	init_delete_files_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/dispatch-specialist/dispatch-specialist-renderer.scss
var init_dispatch_specialist_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/dispatch-specialist/dispatch-specialist-renderer.tsx
function isDispatchSpecialistTool(tool) {
	return SPECIALIST_TOOL_NAMES.has(tool.name);
}
function getStringValue$1(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function getSpecialistAgentId(tool) {
	return getStringValue$1(tool.args?.specialistAgentId) || getStringValue$1(tool.args?.specialist_agent_id) || getStringValue$1(tool.metaData?.specialistAgentId) || getStringValue$1(tool.metaData?.specialist_agent_id);
}
function getSpecialistNameFromTool(tool) {
	return getStringValue$1(tool.args?.specialistAgentName) || getStringValue$1(tool.args?.specialist_agent_name) || getStringValue$1(tool.args?.agentName) || getStringValue$1(tool.metaData?.specialistAgentName) || getStringValue$1(tool.metaData?.agentName);
}
function formatFallbackName(agentId) {
	if (!agentId) return "";
	return `#${agentId.slice(-6)}`;
}
function isRunningStatus$3(status) {
	return [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(status);
}
function getToolPayload(tool) {
	const direct = tool.result?.result;
	return extractToolPayload(direct?.data) ?? extractToolPayload(direct) ?? extractToolPayload(tool.rawOutput) ?? extractToolPayload(tool.result);
}
function extractToolPayload(value, depth = 0) {
	if (depth > 6 || value === void 0 || value === null) return;
	if (typeof value === "string") {
		const parsed = parseJsonFromText$1(value);
		return parsed === void 0 ? void 0 : extractToolPayload(parsed, depth + 1);
	}
	if (Array.isArray(value)) {
		for (let index = value.length - 1; index >= 0; index -= 1) {
			const parsed = extractToolPayload(value[index], depth + 1);
			if (parsed) return parsed;
		}
		return;
	}
	if (typeof value !== "object") return;
	const record = value;
	if ((record.type === "text" || record.type === "input_text") && typeof record.text === "string") return extractToolPayload(record.text, depth + 1);
	const nested = extractToolPayload(record.data, depth + 1) ?? extractToolPayload(record.content, depth + 1) ?? extractToolPayload(record.result, depth + 1);
	if (nested) return nested;
	return "status" in record || "error" in record || "sessionId" in record ? record : void 0;
}
function parseJsonFromText$1(text) {
	const trimmed = text.trim();
	if (!trimmed) return;
	try {
		return JSON.parse(trimmed);
	} catch {}
	for (let index = trimmed.length - 1; index >= 0; index -= 1) {
		const char = trimmed[index];
		if (char !== "{" && char !== "[") continue;
		try {
			return JSON.parse(trimmed.slice(index));
		} catch {}
	}
}
function getPayloadError$1(payload) {
	if (!payload) return;
	if (typeof payload.error === "string" && payload.error.trim()) return payload.error.trim();
	if (typeof payload.message === "string" && String(payload.status).toLowerCase() === "error") return payload.message.trim();
	return String(payload.status).toLowerCase() === "error" ? "工具执行失败" : void 0;
}
function DispatchSpecialistRendererContent(props) {
	const { tool } = props;
	const t = useTranslation();
	let adapter;
	try {
		adapter = useAdapter();
	} catch {
		adapter = void 0;
	}
	const agentId = getSpecialistAgentId(tool);
	const directName = getSpecialistNameFromTool(tool);
	const [resolvedName, setResolvedName] = (0, import_react$42.useState)(directName);
	(0, import_react$42.useEffect)(() => {
		if (directName || !agentId || !adapter?.listGrantedCloudAgents) {
			setResolvedName(directName);
			return;
		}
		let cancelled = false;
		adapter.listGrantedCloudAgents({
			page: 1,
			pageSize: 100,
			agentRole: "specialist",
			withInstances: true
		}).then((result) => {
			if (cancelled) return;
			const matched = result.items?.find((item) => item.id === agentId || item.agentId === agentId);
			setResolvedName(matched?.agentName || matched?.agentId || void 0);
		}).catch(() => {
			if (!cancelled) setResolvedName(void 0);
		});
		return () => {
			cancelled = true;
		};
	}, [
		adapter,
		agentId,
		directName
	]);
	const specialistName = resolvedName || directName || formatFallbackName(agentId) || t("tool.dispatchSpecialist.unknown");
	const prompt = getStringValue$1(tool.args?.prompt);
	const context = getStringValue$1(tool.args?.context);
	const errorText = getPayloadError$1(getToolPayload(tool)) || getStringValue$1(tool.result?.error) || getStringValue$1((tool.result?.result)?.error);
	const view = (0, import_react$42.useMemo)(() => {
		if (tool.status === "failed" || errorText) return {
			title: t("tool.dispatchSpecialist.failed", { name: specialistName }),
			dot: "failed"
		};
		if (tool.status === "cancelled" || tool.status === "skipped") return {
			title: t(tool.status === "cancelled" ? "tool.dispatchSpecialist.cancelled" : "tool.dispatchSpecialist.skipped", { name: specialistName }),
			dot: "waiting"
		};
		if (isRunningStatus$3(tool.status)) return {
			title: t("tool.dispatchSpecialist.running", { name: specialistName }),
			dot: "running"
		};
		return {
			title: t("tool.dispatchSpecialist.waiting", { name: specialistName }),
			dot: "success"
		};
	}, [
		errorText,
		specialistName,
		t,
		tool.status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("div", {
		className: "assistant-message-tools",
		children: /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("div", {
			className: "assistant-message-tool-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("div", {
				className: "assistant-message-tool dispatch-specialist",
				children: /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
					className: "tool-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
						className: "dispatch-specialist-tool__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
							className: (0, import_classnames$6.default)("dispatch-specialist-tool__dot", {
								"dispatch-specialist-tool__dot--failed": view.dot === "failed",
								"dispatch-specialist-tool__dot--waiting": view.dot === "waiting"
							}),
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
							className: "dispatch-specialist-tool__title",
							title: view.title,
							children: view.title
						})]
					}), (prompt || context || errorText) && /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
						className: "dispatch-specialist-tool__detail",
						children: [
							prompt && /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
								className: "dispatch-specialist-tool__detail-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
									className: "dispatch-specialist-tool__detail-label",
									children: t("tool.dispatchSpecialist.prompt")
								}), /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
									className: "dispatch-specialist-tool__detail-value",
									children: prompt
								})]
							}),
							context && /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
								className: "dispatch-specialist-tool__detail-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
									className: "dispatch-specialist-tool__detail-label",
									children: t("tool.dispatchSpecialist.context")
								}), /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
									className: "dispatch-specialist-tool__detail-value",
									children: context
								})]
							}),
							errorText && /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
								className: "dispatch-specialist-tool__detail-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
									className: "dispatch-specialist-tool__detail-label",
									children: t("tool.dispatchSpecialist.error")
								}), /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("span", {
									className: "dispatch-specialist-tool__detail-value",
									children: errorText
								})]
							})
						]
					})]
				})
			})
		})
	});
}
var import_classnames$6, import_react$42, import_jsx_runtime$41, SPECIALIST_TOOL_NAMES, DispatchSpecialistRenderer;
var init_dispatch_specialist_renderer = __esmMin((() => {
	init_dispatch_specialist_renderer$1();
	import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$42 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_tool_protocol();
	import_jsx_runtime$41 = require_jsx_runtime();
	SPECIALIST_TOOL_NAMES = new Set([
		"send_to_specialist",
		"dispatch_to_specialist",
		"dispatch_specialist"
	]);
	DispatchSpecialistRenderer = class {
		constructor() {
			this.className = "dispatch-specialist";
			this.theme = "border";
		}
		canHandle(tool) {
			return isDispatchSpecialistTool(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool) {
			if (!isDispatchSpecialistTool(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(DispatchSpecialistRendererContent, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/dispatch-specialist/index.ts
var init_dispatch_specialist = __esmMin((() => {
	init_dispatch_specialist_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/enter-plan-mode/enter-plan-mode-renderer.less
var init_enter_plan_mode_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/enter-plan-mode/enter-plan-mode-renderer.tsx
function isEnterPlanModeToolCall(tool) {
	const name = toStringOrEmpty(tool.name).toLowerCase();
	return name === "enterplanmode" || name === "enter_plan_mode";
}
var import_react$41, import_jsx_runtime$40, EXECUTING_STATUSES, EnterPlanModeContent, EnterPlanModeRenderer;
var init_enter_plan_mode_renderer = __esmMin((() => {
	init_enter_plan_mode_renderer$1();
	init_src();
	import_react$41 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_protocol();
	import_jsx_runtime$40 = require_jsx_runtime();
	EXECUTING_STATUSES = [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	];
	EnterPlanModeContent = ({ tool }) => {
		const t = useTranslation();
		const [localStatus, setLocalStatus] = (0, import_react$41.useState)(tool.status);
		(0, import_react$41.useEffect)(() => {
			setLocalStatus(tool.status);
		}, [tool.status]);
		const isExecuting = (0, import_react$41.useMemo)(() => EXECUTING_STATUSES.includes(localStatus), [localStatus]);
		const isDeclined = localStatus === "failed" || localStatus === "cancelled";
		return /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
			className: "enter-plan-mode-renderer",
			children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsxs)("div", {
				className: "enter-plan-mode-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("span", {
					className: `enter-plan-mode-icon ${isExecuting ? "loading" : isDeclined ? "declined" : "success"}`,
					children: "●"
				}), /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("span", {
					className: "enter-plan-mode-title",
					children: isExecuting ? t("tool.enterPlanMode.entering") : isDeclined ? t("tool.enterPlanMode.declined") : t("tool.enterPlanMode.entered")
				})]
			})
		});
	};
	EnterPlanModeRenderer = class {
		constructor() {
			this.className = "enter-plan-mode";
			this.theme = "border";
		}
		canHandle(tool) {
			return isEnterPlanModeToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			if (!isEnterPlanModeToolCall(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(EnterPlanModeContent, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/enter-plan-mode/index.ts
var init_enter_plan_mode = __esmMin((() => {
	init_enter_plan_mode_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/execute-command/execute-command-renderer.less
var init_execute_command_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/execute-command/execute-command-tool-adapter.ts
/**
* 检查是否为 ExecuteCommand 工具调用。
*/
function isExecuteCommandToolCall(tool) {
	const name = tool.name;
	return [
		"Bash",
		"BashOutput",
		"KillShell",
		"execute_command",
		"execute"
	].includes(name);
}
/**
* 将工具调用里的未知运行时字段收敛为可安全渲染的字符串。
*/
function toSafeString$2(value) {
	return typeof value === "string" ? value : "";
}
var ExecuteCommandToolAdapter;
var init_execute_command_tool_adapter = __esmMin((() => {
	ExecuteCommandToolAdapter = class {
		constructor(tool) {
			if (!isExecuteCommandToolCall(tool)) throw new Error(`Invalid tool type for ExecuteCommandToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 获取命令文本。
		*/
		getCommand() {
			return toSafeString$2(this.tool.args?.command);
		}
		/**
		* 获取模型给出的工具自描述（bash tool 的 description 入参）。
		* 用于 compact 模式下替代 header 上的命令文本展示。
		*/
		getDescription() {
			return toSafeString$2(this.tool.args?.description);
		}
		/**
		* 是否需要审批（来自 requires_approval 参数）。
		*/
		getRequiresApproval() {
			return this.tool.args?.requires_approval || false;
		}
		/**
		* 获取权限选项。
		* 兼容真实 adapter 设置的 metaData 与旧版 mock 数据。
		*/
		getPermissionOptions() {
			const { permissionOptions } = this.tool.metaData?.["acp_request_permission"] || {};
			if (permissionOptions) return permissionOptions;
		}
		/**
		* 获取标准输出。
		* 后端可能返回 "(empty)" 表示空输出，需要转换为空字符串。
		*/
		getStdout() {
			const result = this.tool.result;
			const stdout = toSafeString$2(result?.result?.stdout);
			return stdout === "(empty)" ? "" : stdout;
		}
		/**
		* 获取标准错误输出。
		* 后端可能返回 "(empty)" 表示空输出，需要转换为空字符串。
		*/
		getStderr() {
			const result = this.tool.result;
			const stderr = toSafeString$2(result?.result?.stderr);
			return stderr === "(empty)" ? "" : stderr;
		}
		/**
		* 获取退出码。
		*/
		getExitCode() {
			const result = this.tool.result;
			const exitCode = result?.result?.exitCode ?? result?.result?.exit_code;
			return typeof exitCode === "number" ? exitCode : void 0;
		}
		/**
		* 是否使用独立终端。
		*/
		isStandaloneTerminal() {
			return this.tool.result?.result?.use_standalone_terminal === true;
		}
		/**
		* 转换为 ExecuteCommandData 格式。
		*/
		toExecuteCommandData() {
			return {
				command: this.getCommand(),
				description: this.getDescription(),
				stdout: this.getStdout(),
				stderr: this.getStderr(),
				exitCode: this.getExitCode(),
				requiresApproval: this.getRequiresApproval()
			};
		}
		/**
		* 获取 ToolCall 对象。
		*/
		getToolCall() {
			return this.tool;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/execute-command/execute-command-renderer.tsx
var import_react$40, import_jsx_runtime$39, ExecuteCommandRendererContent, ExecuteCommandRenderer;
var init_execute_command_renderer = __esmMin((() => {
	init_execute_command_renderer$1();
	init_src();
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_icon_render_config();
	init_tool_protocol();
	init_execute_command_tool_adapter();
	import_jsx_runtime$39 = require_jsx_runtime();
	ExecuteCommandRendererContent = ({ tool, context }) => {
		const adapter = context?.adapter;
		const sessionId = context?.sessionId;
		const t = useTranslation();
		const [localToolStatus, setLocalToolStatus] = import_react$40.useState(tool.status);
		import_react$40.useEffect(() => {
			setLocalToolStatus(tool.status);
		}, [tool.status]);
		const toolAdapter = new ExecuteCommandToolAdapter(tool);
		const shouldShowApprovalMenu = !!toolAdapter.getPermissionOptions() && (localToolStatus === "pending" || localToolStatus === "idle");
		const isCloudMode = adapter?.environmentType === "cloud";
		const shouldHideSkipEntryForDesktop = adapter?.isWorkbuddyDesktop === true;
		const onSkipCommand = async (_command, toolCall) => {
			try {
				const actualSessionId = sessionId || toolCall?.id;
				const toolCallId = toolCall?.id;
				const toolName = toolCall?.name || tool.name;
				if (adapter && actualSessionId && toolCallId) {
					const requestPermission = tool.metaData?.["acp_request_permission"];
					if (requestPermission?.requestId && adapter.respondToPermission) {
						const skipResult = await adapter.toolCallback(actualSessionId, toolCallId, toolName, "skip");
						if (!skipResult.success) console.error("[ExecuteCommandRenderer] Skip toolCallback failed:", skipResult.error);
						await adapter.respondToPermission(actualSessionId, requestPermission.requestId, []);
					} else {
						const result = await adapter.toolCallback(actualSessionId, toolCallId, toolName, "skip");
						if (!result.success) console.error("[ExecuteCommandRenderer] Skip action failed:", result.error);
					}
					tool.status = "skipped";
					setLocalToolStatus("skipped");
				} else console.warn("[ExecuteCommandRenderer] Missing adapter/sessionId/toolCallId for skip action", {
					adapter,
					sessionId: actualSessionId,
					toolCallId
				});
			} catch (err) {
				console.error("[ExecuteCommandRenderer] Skip action failed", err);
			}
		};
		const rendererConfig = (0, import_react$40.useMemo)(() => {
			return {
				showOutput: true,
				showApprovalMenu: shouldShowApprovalMenu,
				autoRun: isCloudMode,
				useStandaloneTerminal: toolAdapter.isStandaloneTerminal() || localToolStatus === "pending" || localToolStatus === "idle",
				...!isCloudMode && { onCancelCommand: async (_command, toolCall) => {
					try {
						const actualSessionId = sessionId || toolCall?.id;
						const toolCallId = toolCall?.id;
						const toolName = toolCall?.name || tool.name;
						if (adapter && actualSessionId && toolCallId) {
							const result = await adapter.toolCallback(actualSessionId, toolCallId, toolName, "cancel");
							if (result.success) {
								tool.status = "cancelled";
								setLocalToolStatus("cancelled");
							} else console.error("[ExecuteCommandRenderer] Cancel action failed:", result.error);
						} else console.warn("[ExecuteCommandRenderer] Missing adapter/sessionId/toolCallId for cancel action", {
							adapter,
							sessionId: actualSessionId,
							toolCallId
						});
					} catch (err) {
						console.error("[ExecuteCommandRenderer] Cancel action failed", err);
					}
				} },
				...!isCloudMode && !shouldHideSkipEntryForDesktop && { onIgnoreCommand: async (_command, toolCall) => {
					try {
						const actualSessionId = sessionId || toolCall?.id;
						const toolCallId = toolCall?.id;
						const toolName = toolCall?.name || tool.name;
						if (adapter && actualSessionId && toolCallId) {
							const result = await adapter.toolCallback(actualSessionId, toolCallId, toolName, "skip");
							if (result.success) {
								tool.status = "skipped";
								setLocalToolStatus("skipped");
							} else console.error("[ExecuteCommandRenderer] Ignore action failed:", result.error);
						} else console.warn("[ExecuteCommandRenderer] Missing adapter/sessionId/toolCallId for ignore action", {
							adapter,
							sessionId: actualSessionId,
							toolCallId
						});
					} catch (err) {
						console.error("[ExecuteCommandRenderer] Ignore action failed", err);
					}
				} },
				onSetAutoRun: async (_autoRun, _toolCall) => {},
				onRunCommand: async (_command, toolCall) => {
					try {
						const actualSessionId = sessionId || toolCall?.id;
						const toolCallId = toolCall?.id;
						if (adapter && actualSessionId && toolCallId && tool.metaData?.["acp_request_permission"]) {
							const requestPermission = tool.metaData?.["acp_request_permission"];
							const allowOption = requestPermission?.permissionOptions?.find((option) => option.kind === "allow_once");
							if (!allowOption) {
								console.warn("[ExecuteCommandRenderer] No allow permission option found for run action", {
									sessionId: actualSessionId,
									toolCallId,
									permissionOptions: requestPermission?.permissionOptions
								});
								return;
							}
							const approveResult = await adapter.toolCallback(actualSessionId, toolCallId, toolCall?.name || tool.name, "approve");
							if (!approveResult.success) console.error("[ExecuteCommandRenderer] Run toolCallback failed:", approveResult.error);
							await adapter.respondToPermission(actualSessionId, requestPermission?.requestId ?? "", [allowOption]);
							if (approveResult.success) {
								tool.status = "stream_executing";
								setLocalToolStatus("stream_executing");
							}
						} else console.warn("[ExecuteCommandRenderer] Missing adapter/sessionId/toolCallId for approve action", {
							adapter,
							sessionId: actualSessionId,
							toolCallId
						});
					} catch (err) {
						console.error("[ExecuteCommandRenderer] Run action failed", err);
					}
				},
				onAlwaysAllowCommand: async (_command, toolCall) => {
					try {
						const actualSessionId = sessionId || toolCall?.id;
						const toolCallId = toolCall?.id;
						if (adapter && actualSessionId && toolCallId && tool.metaData?.["acp_request_permission"]) {
							const requestPermission = tool.metaData?.["acp_request_permission"];
							const alwaysAllowOption = requestPermission?.permissionOptions?.find((option) => option.kind === "allow_always");
							if (!alwaysAllowOption) {
								console.warn("[ExecuteCommandRenderer] No allow_always permission option found", {
									sessionId: actualSessionId,
									toolCallId,
									permissionOptions: requestPermission?.permissionOptions
								});
								return;
							}
							const approveResult = await adapter.toolCallback(actualSessionId, toolCallId, toolCall?.name || tool.name, "approve");
							if (!approveResult.success) console.error("[ExecuteCommandRenderer] AlwaysAllow toolCallback failed:", approveResult.error);
							await adapter.respondToPermission(actualSessionId, requestPermission?.requestId ?? "", [alwaysAllowOption]);
							if (approveResult.success) {
								tool.status = "stream_executing";
								setLocalToolStatus("stream_executing");
							}
						} else console.warn("[ExecuteCommandRenderer] Missing adapter/sessionId/toolCallId for always-allow action", {
							adapter,
							sessionId: actualSessionId,
							toolCallId
						});
					} catch (err) {
						console.error("[ExecuteCommandRenderer] AlwaysAllow action failed", err);
					}
				},
				...!shouldHideSkipEntryForDesktop && { onSkipCommand },
				onRejectCommand: async (_command, toolCall) => {
					try {
						const actualSessionId = sessionId || toolCall?.id;
						const toolCallId = toolCall?.id;
						const toolName = toolCall?.name || tool.name;
						if (adapter && actualSessionId && toolCallId) {
							const requestPermission = tool.metaData?.["acp_request_permission"];
							if (requestPermission?.requestId && adapter.respondToPermission) {
								const cancelResult = await adapter.toolCallback(actualSessionId, toolCallId, toolName, "cancel");
								if (!cancelResult.success) console.error("[ExecuteCommandRenderer] Reject toolCallback failed:", cancelResult.error);
								await adapter.respondToPermission(actualSessionId, requestPermission.requestId, []);
							} else {
								const result = await adapter.toolCallback(actualSessionId, toolCallId, toolName, "cancel");
								if (!result.success) console.error("[ExecuteCommandRenderer] Reject action failed:", result.error);
							}
							tool.status = "cancelled";
							setLocalToolStatus("cancelled");
						} else console.warn("[ExecuteCommandRenderer] Missing adapter/sessionId/toolCallId for reject action", {
							adapter,
							sessionId: actualSessionId,
							toolCallId
						});
					} catch (err) {
						console.error("[ExecuteCommandRenderer] Reject action failed", err);
					}
				}
			};
		}, [
			adapter,
			sessionId,
			tool,
			shouldShowApprovalMenu,
			isCloudMode,
			localToolStatus,
			toolAdapter,
			shouldHideSkipEntryForDesktop,
			onSkipCommand
		]);
		const toolWithUpdatedStatus = (0, import_react$40.useMemo)(() => ({
			...tool,
			status: localToolStatus
		}), [tool, localToolStatus]);
		const isCompact = context?.compact ?? false;
		if (!!(tool.metaData?.["acp_request_permission"])?.toolCallMeta?.["codebuddy.ai/sandboxIntercept"] && shouldShowApprovalMenu) {
			const interceptMeta = (tool.metaData?.["acp_request_permission"])?.toolCallMeta || {};
			const requestPermission = tool.metaData?.["acp_request_permission"];
			const interceptTitle = interceptMeta["codebuddy.ai/interceptType"] === "network" ? t("sandbox.intercept.networkTitle") : t("sandbox.intercept.permissionTitle");
			const interceptDescription = interceptMeta["codebuddy.ai/description"] || t("sandbox.intercept.description");
			return /* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
				className: "sandbox-intercept-card",
				style: {
					padding: "12px 16px",
					background: "var(--cb-bg-secondary, #1e1e1e)",
					border: "1px solid var(--cb-warning, #e5a100)",
					borderLeftWidth: "3px",
					borderRadius: "6px",
					display: "flex",
					flexDirection: "column",
					gap: "10px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "6px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("span", {
							style: {
								fontSize: "16px",
								color: "var(--cb-warning, #e5a100)"
							},
							children: "⚠"
						}), /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("span", {
							style: {
								fontSize: "14px",
								fontWeight: 600,
								color: "var(--cb-text-primary, #ccc)"
							},
							children: interceptTitle
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("div", {
						style: {
							fontSize: "13px",
							color: "var(--cb-text-secondary, #999)"
						},
						children: interceptDescription
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
						style: {
							padding: "8px 10px",
							background: "var(--cb-bg-primary, #252526)",
							borderRadius: "4px",
							fontSize: "12px",
							display: "flex",
							flexDirection: "column",
							gap: "4px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
							style: {
								display: "flex",
								gap: "12px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("span", {
								style: {
									color: "var(--cb-text-tertiary, #666)",
									minWidth: "48px"
								},
								children: t("sandbox.intercept.action")
							}), /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("span", {
								style: { color: "var(--cb-text-primary, #ccc)" },
								children: interceptMeta["codebuddy.ai/operation"] || t("sandbox.intercept.fileAccess")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
							style: {
								display: "flex",
								gap: "12px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("span", {
								style: {
									color: "var(--cb-text-tertiary, #666)",
									minWidth: "48px"
								},
								children: t("sandbox.intercept.scope")
							}), /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("span", {
								style: {
									color: "var(--cb-text-primary, #ccc)",
									wordBreak: "break-all"
								},
								children: interceptMeta["codebuddy.ai/target"] || toolAdapter.getCommand()
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
						style: {
							display: "flex",
							gap: "8px",
							paddingTop: "4px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("button", {
								style: {
									all: "unset",
									cursor: "pointer",
									padding: "4px 12px",
									fontSize: "12px",
									lineHeight: "20px",
									borderRadius: "4px",
									background: "var(--cb-button-primary, #0078d4)",
									color: "var(--cb-button-primary-foreground, #fff)"
								},
								onClick: async () => {
									if (adapter && sessionId && requestPermission?.requestId) {
										const allowOption = requestPermission?.permissionOptions?.find((o) => o.optionId === "allow_once");
										if (allowOption) await adapter.respondToPermission(sessionId, requestPermission.requestId, [allowOption]);
									}
								},
								children: t("sandbox.intercept.allow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("button", {
								style: {
									all: "unset",
									cursor: "pointer",
									padding: "4px 12px",
									fontSize: "12px",
									lineHeight: "20px",
									borderRadius: "4px",
									background: "var(--cb-button-secondary-background, #333)",
									color: "var(--cb-text-primary, #ccc)"
								},
								onClick: async () => {
									if (adapter && sessionId && requestPermission?.requestId) {
										const sessionOption = requestPermission?.permissionOptions?.find((o) => o.optionId === "allow_session");
										if (sessionOption) await adapter.respondToPermission(sessionId, requestPermission.requestId, [sessionOption]);
									}
								},
								children: t("sandbox.intercept.allowSession")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("button", {
								style: {
									all: "unset",
									cursor: "pointer",
									padding: "4px 12px",
									fontSize: "12px",
									lineHeight: "20px",
									borderRadius: "4px",
									border: "1px solid var(--cb-border, #444)",
									color: "var(--cb-text-secondary, #999)"
								},
								onClick: async () => {
									if (adapter && sessionId && requestPermission?.requestId) await adapter.respondToPermission(sessionId, requestPermission.requestId, []);
								},
								children: t("sandbox.intercept.deny")
							})
						]
					})
				]
			});
		}
		return (0, import_react$40.useMemo)(() => createExecuteCommandRenderer({
			...rendererConfig,
			compact: isCompact,
			converter: (t) => {
				return new ExecuteCommandToolAdapter(t).toExecuteCommandData();
			},
			...toolIconRenderConfig
		}), [rendererConfig, isCompact])({
			content: {
				type: "tool",
				tool: toolWithUpdatedStatus
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	ExecuteCommandRenderer = class {
		constructor(_config) {
			this.className = "execute-command";
			this.defaultShowResult = true;
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isExecuteCommandToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, _config, context) {
			if (!isExecuteCommandToolCall(tool)) {
				console.warn("[ExecuteCommandRenderer] Invalid tool type:", tool.name, "- expected: execute_command");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(ExecuteCommandRendererContent, {
					tool,
					context
				});
			} catch (error) {
				console.error("[ExecuteCommandRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
					className: "execute-command-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$39.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/execute-command/index.ts
var init_execute_command = __esmMin((() => {
	init_execute_command_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/exit-plan-mode/exit-plan-mode-renderer.less
var init_exit_plan_mode_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/exit-plan-mode/exit-plan-mode-renderer.tsx
function isExitPlanModeToolCall(tool) {
	const name = toStringOrEmpty(tool.name).toLowerCase();
	return name === "exitplanmode" || name === "exit_plan_mode";
}
var import_react$39, import_jsx_runtime$38, ExitPlanModeContent, ExitPlanModeRenderer;
var init_exit_plan_mode_renderer = __esmMin((() => {
	init_exit_plan_mode_renderer$1();
	init_src();
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_protocol();
	import_jsx_runtime$38 = require_jsx_runtime();
	ExitPlanModeContent = ({ tool, context }) => {
		const t = useTranslation();
		const adapter = context?.adapter;
		const sessionId = context?.sessionId;
		const [localStatus, setLocalStatus] = (0, import_react$39.useState)(tool.status);
		const [decision, setDecision] = (0, import_react$39.useState)("pending");
		const [isSubmitting, setIsSubmitting] = (0, import_react$39.useState)(false);
		(0, import_react$39.useEffect)(() => {
			setLocalStatus(tool.status);
		}, [tool.status]);
		const requestPermission = (0, import_react$39.useMemo)(() => tool.metaData?.["acp_request_permission"], [tool.metaData]);
		const showButtons = (0, import_react$39.useMemo)(() => !!requestPermission?.permissionOptions && decision === "pending" && (localStatus === "pending" || localStatus === "idle"), [
			requestPermission,
			decision,
			localStatus
		]);
		const handleDecision = (0, import_react$39.useCallback)(async (optionId) => {
			if (!adapter || !sessionId || !requestPermission?.permissionOptions) return;
			if (isSubmitting) return;
			const option = requestPermission.permissionOptions.find((o) => o.optionId === optionId);
			if (!option) {
				console.warn("[ExitPlanModeRenderer] No option found for optionId:", optionId);
				return;
			}
			setIsSubmitting(true);
			try {
				await adapter.respondToPermission(sessionId, requestPermission.requestId, [option]);
				if (optionId === "allow" || optionId === "allow_always") {
					setDecision("approved");
					setLocalStatus("executed");
				} else if (optionId === "reject_and_exit_plan") {
					setDecision("exited");
					tool.status = "cancelled";
					setLocalStatus("cancelled");
				} else {
					setDecision("keep-planning");
					tool.status = "cancelled";
					setLocalStatus("cancelled");
				}
			} catch (err) {
				console.error("[ExitPlanModeRenderer] Failed to respond:", err);
			} finally {
				setIsSubmitting(false);
			}
		}, [
			adapter,
			sessionId,
			requestPermission,
			isSubmitting,
			tool
		]);
		const decisionText = (0, import_react$39.useMemo)(() => {
			switch (decision) {
				case "approved": return t("tool.exitPlanMode.approved");
				case "keep-planning": return t("tool.exitPlanMode.keepPlanning");
				case "exited": return t("tool.exitPlanMode.exited");
				default: return "";
			}
		}, [decision, t]);
		return /* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
			className: "exit-plan-mode-renderer",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
					className: "exit-plan-mode-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("span", {
						className: "exit-plan-mode-icon",
						children: "●"
					}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("span", {
						className: "exit-plan-mode-title",
						children: t("tool.exitPlanMode.planReady")
					})]
				}),
				showButtons && /* @__PURE__ */ (0, import_jsx_runtime$38.jsxs)("div", {
					className: "exit-plan-mode-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("button", {
						className: "exit-plan-mode-btn primary-btn",
						disabled: isSubmitting,
						onClick: () => handleDecision("allow"),
						children: t("tool.exitPlanMode.yes")
					}), /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("button", {
						className: "exit-plan-mode-btn secondary-btn",
						disabled: isSubmitting,
						onClick: () => handleDecision("reject"),
						children: t("tool.exitPlanMode.keepPlanningBtn")
					})]
				}),
				decision !== "pending" && /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
					className: `exit-plan-mode-decision ${decision}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("span", {
						className: "decision-text",
						children: decisionText
					})
				})
			]
		});
	};
	ExitPlanModeRenderer = class {
		constructor() {
			this.className = "exit-plan-mode";
			this.theme = "border";
		}
		canHandle(tool) {
			return isExitPlanModeToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			if (!isExitPlanModeToolCall(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(ExitPlanModeContent, {
				tool,
				context
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/exit-plan-mode/index.ts
var init_exit_plan_mode = __esmMin((() => {
	init_exit_plan_mode_renderer();
})), import_jsx_runtime$37, WarningIcon;
var init_warning_icon = __esmMin((() => {
	require_react();
	import_jsx_runtime$37 = require_jsx_runtime();
	WarningIcon = ({ className, style, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime$37.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		style,
		...rest,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("path", { d: "M12 9v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("path", { d: "M12 17h.01" })
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/image-gen/image-gen-renderer.tsx
/**
* 检查是否为 ImageGen 工具调用
* 兼容 image_gen 正名为 ImageGen 的两个别名
*/
function isImageGenToolCall(tool) {
	return isImageGenToolName(tool.name);
}
var import_react$37, import_jsx_runtime$36, ImageGenToolAdapter, ImageGenRendererContent, ImageGenRenderer;
var init_image_gen_renderer = __esmMin((() => {
	init_src();
	import_react$37 = /* @__PURE__ */ __toESM(require_react());
	init_i18n$1();
	init_tool_icon_render_config();
	init_tool_protocol();
	init_warning_icon();
	import_jsx_runtime$36 = require_jsx_runtime();
	ImageGenToolAdapter = class {
		constructor(tool) {
			if (!isImageGenToolCall(tool)) throw new Error(`Invalid tool type for ImageGenToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 转换为 ImageGenData 格式
		*/
		toImageGenData() {
			const result = this.tool.result?.result;
			const args = this.tool.args;
			let status = "generating";
			if (result?.status === "completed" || this.tool.status === "executed") status = "completed";
			else if (result?.status === "error" || this.tool.status === "failed") status = "error";
			return {
				prompt: result?.prompt || args?.prompt || "",
				status,
				images: result?.images || [],
				errorMessage: result?.error || this.tool.result?.error
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	ImageGenRendererContent = ({ tool, context }) => {
		const handlePathClick = (0, import_react$37.useCallback)((path) => {
			try {
				if (context?.adapter) context.adapter.executeCommand?.("vscode.open", path);
			} catch (error) {
				console.error("[ImageGenRenderer] Failed to open file:", error);
			}
		}, [context]);
		return /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
			className: "image-gen-wrapper",
			children: (0, import_react$37.useMemo)(() => createImageGenRenderer({
				onPathClick: handlePathClick,
				converter: (t) => {
					return new ImageGenToolAdapter(t).toImageGenData();
				},
				...toolIconRenderConfig
			}), [handlePathClick])({
				content: {
					type: "tool",
					tool
				},
				message: {
					id: tool.id,
					role: "assistant",
					content: []
				},
				isSessionActive: false
			})
		});
	};
	ImageGenRenderer = class {
		constructor(_config) {
			this.className = "image-gen";
			this.clickHeader = false;
			this.theme = "";
		}
		canHandle(tool) {
			return isImageGenToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, _config, context) {
			if (!isImageGenToolCall(tool)) {
				console.warn("[ImageGenRenderer] Invalid tool type:", tool.name, "- expected: image_gen / ImageGen");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(ImageGenRendererContent, {
					tool,
					context
				});
			} catch (error) {
				console.error("[ImageGenRenderer] Failed to process tool:", error);
				const errorMessage = error instanceof Error ? error.message : t("common.unknown");
				return /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
					className: "image-gen-error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
						className: "error-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(WarningIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
						className: "error-message",
						children: t("tool.error.imageGenFailed", { message: errorMessage })
					})]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/image-gen/index.ts
var init_image_gen = __esmMin((() => {
	init_image_gen_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/list-files/list-files-renderer.tsx
/**
* 检查是否为 ListFiles 相关工具调用
*/
function isListFilesToolCall(tool) {
	const name = tool.name;
	return name === "list_dir" || name === "list-dir" || name === "list_files" || name === "list-files" || name === "search_file" || name === "search-file" || name === "search_content" || name === "search-content";
}
/**
* 检查是否为 list_dir 工具（区别于 search 工具）
*/
function isListDirToolCall(tool) {
	const name = tool.name;
	return name === "list_dir" || name === "list-dir";
}
var import_react$36, import_jsx_runtime$35, ListFileToolAdapter, ListFilesRendererContent, ListFilesRenderer;
var init_list_files_renderer = __esmMin((() => {
	init_src();
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	init_search_tool_adapter();
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$35 = require_jsx_runtime();
	ListFileToolAdapter = class {
		constructor(tool) {
			if (!isListFilesToolCall(tool)) throw new Error(`Invalid tool type for ListFileToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 转换为 ListFileData 格式
		*/
		toListFileData() {
			if (isListDirToolCall(this.tool)) return this.toListFileDataFromListDir();
			const chatSdkTool = this.tool;
			const searchData = SearchToolAdapter.extractFromToolCall(chatSdkTool);
			if (!searchData) return {
				query: this.tool.args?.pattern || this.tool.args?.key || "",
				directory: this.tool.args?.directory || this.tool.args?.target_directory || ".",
				files: []
			};
			const uiData = SearchToolAdapter.toUI(searchData);
			const files = uiData.results.map((item) => ({
				path: item.filePath,
				line: item.startLine,
				column: void 0,
				matches: item.content ? 1 : void 0
			}));
			return {
				query: uiData.pattern,
				directory: uiData.directory,
				files,
				total: uiData.totalCount > 0 ? uiData.totalCount : void 0
			};
		}
		/**
		* 从 list_dir 工具提取 ListFileData
		*
		* list_dir 的数据结构 (来自 tool-schemas.ts):
		* - Input: ListDirInput = { target_directory: string; ignore_globs?: string; }
		* - Output: ListFilesResult = {
		*     type: 'list_files_result';
		*     files: Array<{filePath: string; size: string; modifyTime: string}>;
		*     root: string;
		*     listing?: string;
		*   }
		*/
		toListFileDataFromListDir() {
			const args = this.tool.args;
			const result = this.tool.result?.result;
			const directory = args?.target_directory || result?.root || ".";
			const files = (result?.files || []).map((file) => ({
				path: file.filePath,
				line: void 0,
				column: void 0,
				matches: void 0
			}));
			return {
				query: "",
				directory,
				files,
				total: files.length > 0 ? files.length : void 0
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	ListFilesRendererContent = ({ tool, context }) => {
		const contextRef = (0, import_react$36.useRef)(context);
		(0, import_react$36.useEffect)(() => {
			contextRef.current = context;
		}, [context]);
		return /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)((0, import_react$36.useMemo)(() => createListFileRenderer({
			maxResults: 50,
			onFileClick: (filePath, line, _column) => {
				contextRef.current?.onFileClick?.(filePath);
			},
			converter: (t) => {
				return new ListFileToolAdapter(t).toListFileData();
			},
			...toolIconRenderConfig
		}), []), {
			tool,
			isSessionActive: false
		});
	};
	ListFilesRenderer = class {
		constructor(config) {
			this.className = "list-files";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isListFilesToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, config, context) {
			if (!isListFilesToolCall(tool)) {
				console.warn("[ListFilesRenderer] Invalid tool type:", tool.name, "- expected: list_files, search_file, or search_content");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(ListFilesRendererContent, {
					tool,
					context
				});
			} catch (error) {
				console.error("[ListFilesRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
					className: "list-files-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/list-files/index.ts
var init_list_files = __esmMin((() => {
	init_list_files_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/mcp/mcp-tool-renderer.tsx
var import_react$35, import_jsx_runtime$34, MCP_CALL_TOOL_NAME, McpToolRendererWithContext, McpToolRendererWrapper;
var init_mcp_tool_renderer = __esmMin((() => {
	init_src();
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$34 = require_jsx_runtime();
	MCP_CALL_TOOL_NAME = "mcp_call_tool";
	McpToolRendererWithContext = (0, import_react$35.memo)(function McpToolRendererWithContext({ tool, context }) {
		const adapter = context?.adapter;
		const sessionId = context?.sessionId;
		const isCompact = context?.compact ?? false;
		return (0, import_react$35.useMemo)(() => createMcpToolRenderer({
			compact: isCompact,
			onSamplingRespond: async (response) => {
				await adapter?.respondToSampling?.(sessionId, response);
			},
			onRootsRespond: async (response) => {
				await adapter?.respondToRoots?.(sessionId, response);
			},
			subscribeSamplingRequests: (serverName, callback) => adapter?.subscribeSamplingRequests?.(serverName, callback) ?? (() => {}),
			subscribeRootsRequests: (serverName, callback) => adapter?.subscribeRootsRequests?.(serverName, callback) ?? (() => {}),
			...toolIconRenderConfig
		}), [
			adapter,
			sessionId,
			isCompact
		])({
			tool,
			isSessionActive: false
		});
	});
	McpToolRendererWrapper = class {
		constructor() {
			this.className = "mcp-tool";
			this.theme = "border";
		}
		canHandle(tool) {
			return tool.name === MCP_CALL_TOOL_NAME ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, config, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(McpToolRendererWithContext, {
				tool,
				context
			});
		}
	};
})), import_jsx_runtime$33, FETCH_MCP_RESOURCE_TOOL_NAME, FetchMcpResourceRendererWrapper;
var init_fetch_mcp_resource_renderer = __esmMin((() => {
	init_src();
	require_react();
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$33 = require_jsx_runtime();
	FETCH_MCP_RESOURCE_TOOL_NAME = "fetch_mcp_resource";
	FetchMcpResourceRendererWrapper = class {
		constructor(config) {
			this.className = "fetch-mcp-resource";
			this.theme = "border";
			this.config = config;
		}
		canHandle(tool) {
			return tool.name === FETCH_MCP_RESOURCE_TOOL_NAME ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, config, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(FetchMcpResourceRenderer, {
				tool,
				config: {
					...toolIconRenderConfig,
					...this.config
				}
			});
		}
	};
})), import_jsx_runtime$32, MCP_GET_TOOL_DESCRIPTION_NAME, McpMatchToolRendererWrapper;
var init_mcp_match_tool_renderer = __esmMin((() => {
	init_src();
	require_react();
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$32 = require_jsx_runtime();
	MCP_GET_TOOL_DESCRIPTION_NAME = "mcp_get_tool_description";
	McpMatchToolRendererWrapper = class {
		constructor(config) {
			this.className = "mcp-match-tool";
			this.theme = "border";
			this.config = config;
		}
		canHandle(tool) {
			return tool.name === MCP_GET_TOOL_DESCRIPTION_NAME ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, config, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(McpMatchToolRenderer, {
				tool,
				config: {
					...toolIconRenderConfig,
					...this.config
				}
			});
		}
	};
})), import_jsx_runtime$31, INTEGRATION_TOOL_NAMES, McpIntegrationRendererWrapper;
var init_mcp_integration_renderer = __esmMin((() => {
	init_src();
	require_react();
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$31 = require_jsx_runtime();
	INTEGRATION_TOOL_NAMES = [
		"call_tcb_integration",
		"call_eop_integration",
		"call_anydev_integration",
		"call_lighthouse_integration",
		"call_integration",
		"search_integration_tool"
	];
	McpIntegrationRendererWrapper = class {
		constructor(config) {
			this.className = "mcp-integration";
			this.theme = "border";
			this.config = config;
		}
		canHandle(tool) {
			return INTEGRATION_TOOL_NAMES.includes(tool.name) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, config, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(McpIntegrationRenderer, {
				tool,
				config: {
					...toolIconRenderConfig,
					...this.config
				}
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/mcp/index.ts
var init_mcp = __esmMin((() => {
	init_mcp_tool_renderer();
	init_fetch_mcp_resource_renderer();
	init_mcp_match_tool_renderer();
	init_mcp_integration_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/mcp-tool-display/mcp-tool-display-renderer.tsx
function extractMcpProgress(tool) {
	const raw = tool.metaData?.mcpProgress;
	if (!raw || typeof raw.progress !== "number") return;
	return {
		progress: raw.progress,
		total: typeof raw.total === "number" ? raw.total : void 0,
		message: typeof raw.message === "string" ? raw.message : void 0
	};
}
function buildToolDetail(tool) {
	return {
		name: tool.name,
		args: tool.args,
		status: tool.status,
		result: tool.result,
		metaData: tool.metaData
	};
}
function McpToolDisplayRendererContent(props) {
	const { tool } = props;
	const { locale } = useI18n();
	const items = (0, import_react$31.useMemo)(() => [getMcpToolDisplayInfo(tool.name, locale, tool.args)], [
		tool.args,
		tool.name,
		locale
	]);
	const progress = (0, import_react$31.useMemo)(() => extractMcpProgress(tool), [tool]);
	const isRunning = RUNNING_STATUSES.has(tool.status);
	return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(McpToolDisplayList, {
		items,
		detail: buildToolDetail(tool),
		detailKey: tool.id,
		progress,
		isRunning,
		renderIcon: (rawName, attrs) => {
			if (hasKnownMcpToolDisplayInfo(rawName)) return;
			return getToolIcon(rawName, {
				size: 14,
				className: attrs?.className,
				style: attrs?.style
			});
		}
	});
}
var import_react$31, import_jsx_runtime$30, RUNNING_STATUSES, McpToolDisplayRenderer;
var init_mcp_tool_display_renderer = __esmMin((() => {
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_icon_registry();
	init_tool_protocol();
	init_mcp_tool_display$1();
	init_mcp_tool_display_list();
	import_jsx_runtime$30 = require_jsx_runtime();
	RUNNING_STATUSES = new Set([
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	]);
	McpToolDisplayRenderer = class {
		constructor() {
			this.className = "mcp-tool-display";
			this.theme = "none";
		}
		canHandle(tool) {
			return hasKnownMcpToolDisplayInfo(tool.name) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, _context) {
			if (!hasKnownMcpToolDisplayInfo(tool.name)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(McpToolDisplayRendererContent, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/mcp-tool-display/index.ts
var init_mcp_tool_display = __esmMin((() => {
	init_mcp_tool_display_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/open-result-view/open-result-view-renderer.tsx
/**
* 检查是否为 OpenResultView 工具调用
*/
function isOpenResultViewToolCall(tool) {
	return tool.name === "open_result_view" || tool.name === "open-result-view" || tool.name === "OpenResultView";
}
var import_react$30, import_jsx_runtime$29, OpenResultViewRendererWithContext, OpenResultViewToolRenderer;
var init_open_result_view_renderer = __esmMin((() => {
	init_src();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$29 = require_jsx_runtime();
	OpenResultViewRendererWithContext = ({ tool, context }) => {
		const contextRef = (0, import_react$30.useRef)(context);
		(0, import_react$30.useEffect)(() => {
			contextRef.current = context;
		}, [context]);
		const config = (0, import_react$30.useMemo)(() => ({
			converter: (t) => {
				const converted = {
					target: t.args?.target || t.args?.target_file || t.args?.filePath || "",
					viewType: t.args?.viewType || "artifacts"
				};
				console.log("[OpenResultViewRenderer] Converter result:", converted);
				return converted;
			},
			onTargetClick: (target) => {
				contextRef.current?.onFileClick?.(target);
			},
			...toolIconRenderConfig
		}), []);
		return (0, import_react$30.useMemo)(() => createOpenResultViewRenderer(config), [config])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	OpenResultViewToolRenderer = class {
		constructor() {
			this.className = "open-result-view";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isOpenResultViewToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, config, context) {
			console.log("[OpenResultViewToolRenderer] render called:", {
				id: tool.id,
				name: tool.name,
				args: tool.args,
				config
			});
			if (!isOpenResultViewToolCall(tool)) {
				console.warn("[OpenResultViewToolRenderer] Invalid tool type:", tool.name, "- expected: open_result_view");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(OpenResultViewRendererWithContext, {
					tool,
					context
				});
			} catch (error) {
				console.error("[OpenResultViewToolRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
					className: "open-result-view-error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						className: "error-message",
						children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						className: "error-details",
						children: [
							"Tool ID: ",
							tool.id,
							", Name: ",
							tool.name
						]
					})]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/open-result-view/index.ts
var init_open_result_view = __esmMin((() => {
	init_open_result_view_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/plan/plan-create-renderer.scss
var init_plan_create_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/plan/plan-create-renderer.tsx
/**
* 检查是否为 PlanCreate 工具调用
*/
function isPlanCreateToolCall(tool) {
	return tool.name === "plan_create" || tool.name === "PLAN_CREATE";
}
var import_react$29, import_jsx_runtime$28, PlanCreateToolAdapter, PlanCreateRendererWithContext, PlanCreateRenderer;
var init_plan_create_renderer = __esmMin((() => {
	init_plan_create_renderer$1();
	init_src();
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_todo_status_store();
	init_chat_state_store();
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$28 = require_jsx_runtime();
	PlanCreateToolAdapter = class {
		constructor(tool) {
			if (!isPlanCreateToolCall(tool)) throw new Error(`Invalid tool type for PlanCreateToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 转换为 PlanCreateData 格式
		*/
		toPlanCreateData() {
			try {
				const jsonStr = this.tool.result?.result?.data || "";
				if (!jsonStr.trim()) return {
					id: "",
					name: ""
				};
				const parsed = JSON.parse(jsonStr);
				let todolist = parsed.todolist;
				if (Array.isArray(todolist)) todolist = todolist.map((item) => ({
					id: item.id,
					content: item.content || item.title || "",
					status: item.status || "pending",
					dependencies: item.dependencies || []
				}));
				return {
					id: parsed.id || "",
					name: parsed.name || "",
					overview: parsed.overview,
					parts: parsed.parts || [],
					todolist,
					status: parsed.status || "ready",
					explorationStatus: parsed.explorationStatus
				};
			} catch (e) {
				console.warn("[PlanCreateToolAdapter] Failed to parse tool result:", e);
				return {
					id: "",
					name: ""
				};
			}
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	PlanCreateRendererWithContext = ({ tool, context }) => {
		const adapter = context?.adapter;
		const sessionId = context?.sessionId;
		const [liveTasks, setLiveTasks] = (0, import_react$29.useState)(sessionId ? todoStatusStore.getTaskDataList(sessionId) : []);
		(0, import_react$29.useEffect)(() => {
			if (!sessionId) return;
			const unsubscribe = todoStatusStore.subscribeTaskData(sessionId, (tasks) => {
				setLiveTasks(tasks);
			});
			return () => {
				unsubscribe();
			};
		}, [sessionId]);
		const [derivedPlanStatus, setDerivedPlanStatus] = (0, import_react$29.useState)(sessionId ? todoStatusStore.getDerivedPlanStatus(sessionId) : void 0);
		(0, import_react$29.useEffect)(() => {
			if (!sessionId) return;
			const unsubscribe = todoStatusStore.subscribePlanStatus(sessionId, (status) => {
				setDerivedPlanStatus(status);
			});
			return () => {
				unsubscribe();
			};
		}, [sessionId]);
		(0, import_react$29.useEffect)(() => {
			if (!sessionId) return;
			const unsubscribe = chatStateStore.subscribe(sessionId, (state) => {
				if (state === ChatState.TALKING) todoStatusStore.notifyChatStarted(sessionId);
				else todoStatusStore.notifyChatStopped(sessionId);
			});
			return () => {
				unsubscribe();
			};
		}, [sessionId]);
		const basePlanData = (0, import_react$29.useMemo)(() => {
			return new PlanCreateToolAdapter(tool).toPlanCreateData();
		}, [tool]);
		const mergedPlanData = (0, import_react$29.useMemo)(() => {
			let result = basePlanData;
			if (liveTasks.length > 0) {
				const liveTodolist = liveTasks.map((task) => ({
					id: task.id,
					content: task.content,
					status: task.status,
					dependencies: task.dependencies || []
				}));
				result = {
					...result,
					todolist: liveTodolist
				};
			}
			if (derivedPlanStatus) result = {
				...result,
				status: derivedPlanStatus
			};
			return result;
		}, [
			basePlanData,
			liveTasks,
			derivedPlanStatus
		]);
		return (0, import_react$29.useMemo)(() => createPlanCreateRenderer({
			converter: () => mergedPlanData,
			...toolIconRenderConfig,
			onViewPlan: (planId, planName, part) => {
				if (!adapter) return;
				adapter.viewPlan({
					id: planId,
					name: planName,
					part
				});
				if (part === "todolist" && adapter.viewTask) adapter.viewTask({ taskId: "" });
			},
			onTaskClick: (_planId, taskId) => {
				if (adapter?.viewTask) adapter.viewTask({ taskId });
			},
			onBuildPlan: async (planId, planName) => {
				if (!adapter || !sessionId) return;
				try {
					const tasks = (mergedPlanData.todolist || []).map((item) => ({
						id: String(item.id),
						status: item.status,
						title: item.content
					}));
					await adapter.buildPlan({
						sessionId,
						plan: {
							id: planId,
							title: planName,
							content: mergedPlanData.overview
						},
						tasks
					});
				} catch (err) {
					console.error("[PlanCreateRenderer] Build plan failed:", err);
				}
			}
		}), [
			adapter,
			sessionId,
			mergedPlanData
		])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	PlanCreateRenderer = class {
		constructor() {
			this.className = "plan-create";
			this.clickHeader = false;
			this.theme = "border";
			this.defaultShowResult = true;
		}
		canHandle(tool) {
			return isPlanCreateToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法
		*/
		render(tool, config, context) {
			if (!isPlanCreateToolCall(tool)) {
				console.warn("[PlanCreateRenderer] Invalid tool type:", tool.name);
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(PlanCreateRendererWithContext, {
					tool,
					context
				});
			} catch (error) {
				console.error("[PlanCreateRenderer] Failed to render:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("div", {
					className: "plan-create-error",
					children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
						className: "error-message",
						children: ["Error rendering plan: ", error instanceof Error ? error.message : "Unknown error"]
					})
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/plan/plan-update-renderer.tsx
/**
* 检查是否为 PlanUpdate 工具调用
*/
function isPlanUpdateToolCall(tool) {
	return tool.name === "plan_update" || tool.name === "PLAN_UPDATE";
}
var import_react$28, import_jsx_runtime$27, PlanUpdateToolAdapter, PlanUpdateRendererWithContext, PlanUpdateRenderer;
var init_plan_update_renderer = __esmMin((() => {
	init_src();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$27 = require_jsx_runtime();
	PlanUpdateToolAdapter = class {
		constructor(tool) {
			if (!isPlanUpdateToolCall(tool)) throw new Error(`Invalid tool type for PlanUpdateToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 转换为 PlanUpdateData 格式
		*/
		toPlanUpdateData() {
			try {
				const args = this.tool.args;
				const jsonStr = this.tool.result?.result?.data || "";
				let name = "plan";
				let id = "";
				if (jsonStr.trim()) {
					const parsed = JSON.parse(jsonStr);
					name = parsed.name || name;
					id = parsed.id || "";
				}
				return {
					id,
					name,
					status: args?.status
				};
			} catch (e) {
				console.warn("[PlanUpdateToolAdapter] Failed to parse tool result:", e);
				return {
					id: "",
					name: "plan"
				};
			}
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	PlanUpdateRendererWithContext = ({ tool }) => {
		return (0, import_react$28.useMemo)(() => createPlanUpdateRenderer({
			converter: (t) => {
				return new PlanUpdateToolAdapter(t).toPlanUpdateData();
			},
			...toolIconRenderConfig
		}), [])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	PlanUpdateRenderer = class {
		constructor() {
			this.className = "plan-update";
			this.clickHeader = false;
			this.theme = "border";
		}
		canHandle(tool) {
			return isPlanUpdateToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法
		*/
		render(tool, config, context) {
			if (!isPlanUpdateToolCall(tool)) {
				console.warn("[PlanUpdateRenderer] Invalid tool type:", tool.name);
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(PlanUpdateRendererWithContext, { tool });
			} catch (error) {
				console.error("[PlanUpdateRenderer] Failed to render:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
					className: "plan-update-error",
					children: ["Error rendering plan update: ", error instanceof Error ? error.message : "Unknown error"]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/plan/index.ts
var init_plan = __esmMin((() => {
	init_plan_create_renderer();
	init_plan_update_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/plan-task/plan-task-renderer.scss
var init_plan_task_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/plan-task/plan-task-renderer.tsx
/**
* 使用共享 store 中的最新状态更新 todos
*/
function mergeTodosWithLatestStatus(todos, latestStatusMap) {
	if (latestStatusMap.size === 0) return todos;
	return todos.map((todo) => {
		const todoId = String(todo.id);
		const latestStatus = latestStatusMap.get(todoId);
		if (latestStatus && latestStatus !== todo.status) return {
			...todo,
			status: latestStatus
		};
		return todo;
	});
}
/**
* 检查是否为 PlanTask 工具调用
*/
function isPlanTaskToolCall(tool) {
	return tool.name === "todo_write" || tool.name === "TodoWrite";
}
/**
* 将 todo status 映射到 TaskStatus
*/
function mapTodoStatusToTaskStatus(status) {
	switch (status) {
		case "pending": return TaskStatus.PENDING;
		case "in_progress": return TaskStatus.IN_PROGRESS;
		case "completed": return TaskStatus.COMPLETED;
		case "cancelled": return TaskStatus.CANCELLED;
		default: return TaskStatus.PENDING;
	}
}
var import_react$27, import_jsx_runtime$26, PlanTaskToolAdapter, PlanTaskRendererWithContext, PlanTaskRenderer;
var init_plan_task_renderer = __esmMin((() => {
	init_plan_task_renderer$1();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_plan_task$1();
	init_i18n();
	init_todo_status_store();
	init_chat_state_store();
	init_tool_icon_registry();
	init_tool_protocol();
	import_jsx_runtime$26 = require_jsx_runtime();
	PlanTaskToolAdapter = class {
		constructor(tool) {
			if (!isPlanTaskToolCall(tool)) throw new Error(`Invalid tool type for PlanTaskToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 获取 todos 列表
		*/
		getTodos() {
			const args = this.tool.args;
			const result = this.tool.result;
			if (result?.result?.todos && Array.isArray(result.result.todos)) return result.result.todos;
			if (args?.todos) {
				if (typeof args.todos === "string") try {
					const parsed = JSON.parse(args.todos);
					if (Array.isArray(parsed)) return parsed;
				} catch (e) {
					console.warn("[PlanTaskToolAdapter] Failed to parse todos string:", e);
				}
				else if (Array.isArray(args.todos)) return args.todos;
			}
			const newTodos = args?.newTodos || [];
			const oldTodos = args?.oldTodos || [];
			if (newTodos.length > 0 || oldTodos.length > 0) {
				const todosMap = /* @__PURE__ */ new Map();
				oldTodos.forEach((todo, index) => {
					const id = todo.id !== void 0 ? String(todo.id) : String(index + 1);
					todosMap.set(id, {
						...todo,
						id
					});
				});
				newTodos.forEach((todo, index) => {
					const id = todo.id !== void 0 ? String(todo.id) : String(oldTodos.length + index + 1);
					todosMap.set(id, {
						...todo,
						id
					});
				});
				return Array.from(todosMap.values());
			}
			return [];
		}
		/**
		* 转换为 PlanTaskData 格式
		*/
		toPlanTaskData() {
			return { todos: this.getTodos() };
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	PlanTaskRendererWithContext = ({ tool, adapter, sessionId, contentSettled, headerIcon }) => {
		const [sharedStatusMap, setSharedStatusMap] = (0, import_react$27.useState)(/* @__PURE__ */ new Map());
		const toolAdapter = (0, import_react$27.useMemo)(() => new PlanTaskToolAdapter(tool), [tool]);
		const originalTodos = (0, import_react$27.useMemo)(() => toolAdapter.getTodos(), [toolAdapter]);
		(0, import_react$27.useEffect)(() => {
			if (!sessionId) return;
			const unsubscribe = todoStatusStore.subscribe(sessionId, (statusMap) => {
				setSharedStatusMap(new Map(statusMap));
			});
			return () => {
				unsubscribe();
			};
		}, [sessionId]);
		const [chatState, setChatState] = (0, import_react$27.useState)(sessionId ? chatStateStore.getState(sessionId) : ChatState.IDLE);
		const [wasEverTalking, setWasEverTalking] = (0, import_react$27.useState)(false);
		(0, import_react$27.useEffect)(() => {
			if (!sessionId) {
				setChatState(ChatState.IDLE);
				setWasEverTalking(false);
				return;
			}
			const unsubscribe = chatStateStore.subscribe(sessionId, (state) => {
				setChatState(state);
				if (state === ChatState.TALKING) setWasEverTalking(true);
			});
			return () => {
				unsubscribe();
			};
		}, [sessionId]);
		const updatedTodos = (0, import_react$27.useMemo)(() => mergeTodosWithLatestStatus(originalTodos, sharedStatusMap), [originalTodos, sharedStatusMap]);
		const isMerge = (0, import_react$27.useMemo)(() => {
			const args = tool.args;
			const result = tool.result;
			if (result?.result && "merge" in result.result) return result.result.merge === true;
			if (args?.merge !== void 0) return args.merge === "true" || args.merge === true;
			return false;
		}, [tool]);
		const totalTaskCount = (0, import_react$27.useMemo)(() => {
			const todos = originalTodos;
			if (isMerge) {
				if (sharedStatusMap.size > 0) return sharedStatusMap.size;
			}
			const maxId = todos.reduce((max, todo) => {
				const idNum = parseInt(String(todo.id), 10);
				return !isNaN(idNum) && idNum > max ? idNum : max;
			}, 0);
			return Math.max(maxId, todos.length);
		}, [
			isMerge,
			originalTodos,
			sharedStatusMap
		]);
		const tasks = (0, import_react$27.useMemo)(() => updatedTodos.map((todo, index) => {
			const activeForm = normalizePlanTaskText(todo.activeForm);
			return {
				id: todo.id !== void 0 ? String(todo.id) : String(index + 1),
				content: normalizePlanTaskText(todo.content),
				activeForm: activeForm || void 0,
				status: mapTodoStatusToTaskStatus(todo.status)
			};
		}), [updatedTodos]);
		const hasRunningTask = (0, import_react$27.useMemo)(() => tasks.some((t) => t.status === TaskStatus.IN_PROGRESS), [tasks]);
		const toolStatus = tool.status || "idle";
		const isToolCallEnd = [
			"executed",
			"failed",
			"cancelled",
			"skipped"
		].includes(toolStatus);
		const isAgentStopped = wasEverTalking && chatState === ChatState.IDLE;
		const isFailed = (0, import_react$27.useMemo)(() => toolStatus === "cancelled" || isAgentStopped && hasRunningTask && isToolCallEnd, [
			toolStatus,
			isAgentStopped,
			hasRunningTask,
			isToolCallEnd
		]);
		const currentTask = (0, import_react$27.useMemo)(() => tasks.find((t) => t.status === TaskStatus.IN_PROGRESS), [tasks]);
		const currentIndex = (0, import_react$27.useMemo)(() => {
			if (!currentTask) {
				const lastCompleted = [...tasks].reverse().find((t) => t.status === TaskStatus.COMPLETED);
				if (lastCompleted) {
					const idNum = parseInt(lastCompleted.id, 10);
					return !isNaN(idNum) ? idNum : tasks.findIndex((t) => t.id === lastCompleted.id) + 1;
				}
				return 1;
			}
			const idNum = parseInt(currentTask.id, 10);
			if (!isNaN(idNum)) return idNum;
			const index = tasks.findIndex((t) => t.id === currentTask.id);
			return index >= 0 ? index + 1 : 1;
		}, [tasks, currentTask]);
		const handleTaskClick = (0, import_react$27.useMemo)(() => {
			if (!adapter?.viewTask) return;
			return (taskId) => {
				console.log("[PlanTaskRenderer] Task clicked:", taskId);
				adapter.viewTask?.({ taskId });
			};
		}, [adapter]);
		const titleText = (0, import_react$27.useMemo)(() => {
			if (!isMerge) return;
			const completedCount = tasks.filter((t) => t.status === TaskStatus.COMPLETED).length;
			return `${i18n["taskList.progressUpdate"]} ${completedCount}/${totalTaskCount}`;
		}, [
			isMerge,
			tasks,
			totalTaskCount
		]);
		const [graceExpired, setGraceExpired] = (0, import_react$27.useState)(!(chatState === ChatState.TALKING || chatState === ChatState.PLAN));
		(0, import_react$27.useEffect)(() => {
			if (graceExpired) return;
			const timer = setTimeout(() => setGraceExpired(true), 1e3);
			return () => clearTimeout(timer);
		}, [graceExpired]);
		const shouldExpand = !graceExpired || contentSettled === false;
		if (tasks.length === 0) {
			const isRunning = [
				"idle",
				"pending",
				"parsing",
				"stream_executing",
				"full_executing",
				"running"
			].includes(tool.status || "idle");
			return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
				className: "cb-plan-task-renderer cb-plan-task-renderer-empty",
				children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: "cb-plan-task-status-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", { children: i18n["taskList.title"] }), isRunning && /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("span", {
						className: "cb-plan-task-status-loading",
						children: i18n["taskList.receiving"]
					})]
				})
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
			className: "cb-plan-task-renderer",
			children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(PlanTask, {
				viewMode: true,
				failed: isFailed,
				tasks,
				total: totalTaskCount,
				currentTask,
				currentIndex,
				expand: shouldExpand,
				onTaskClick: handleTaskClick,
				titleText,
				headerIcon,
				renderStatusIcon: (status, attrs) => getStatusIcon$2(status, {
					className: attrs?.className,
					style: attrs?.style
				})
			})
		});
	};
	PlanTaskRenderer = class {
		constructor() {
			this.className = "plan-task";
			this.clickHeader = false;
			this.theme = "border";
		}
		canHandle(tool) {
			return isPlanTaskToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, config, context) {
			if (!isPlanTaskToolCall(tool)) {
				console.warn("[PlanTaskRenderer] Invalid tool type:", tool.name, "- expected: todo_write or TodoWrite");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(PlanTaskRendererWithContext, {
					tool,
					adapter: context?.adapter,
					sessionId: context?.sessionId,
					contentSettled: context?.contentSettled,
					headerIcon: getToolIcon(tool.name)
				});
			} catch (error) {
				console.error("[PlanTaskRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
					className: "plan-task-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/plan-task/index.ts
var init_plan_task = __esmMin((() => {
	init_plan_task_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/poi-pick/PoiDialogFlowInline.tsx
var import_react$26, import_jsx_runtime$25, PoiAnsweredView, PoiDialogFlowInline;
var init_PoiDialogFlowInline = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_poi();
	import_jsx_runtime$25 = require_jsx_runtime();
	PoiAnsweredView = (0, import_react$26.memo)(({ tool }) => {
		const t = useTranslation();
		const result = getPoiResult(tool);
		if (result?.status === "success" && result.location) return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "poi-pick-answered poi-pick-answered--success",
			children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
				className: "poi-pick-answered__text",
				children: t("poi.dialog.answered.success", { name: result.location.name })
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "poi-pick-answered poi-pick-answered--cancelled",
			children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
				className: "poi-pick-answered__text",
				children: t("poi.dialog.answered.cancelled")
			})
		});
	});
	PoiAnsweredView.displayName = "PoiAnsweredView";
	PoiDialogFlowInline = (0, import_react$26.memo)(({ tool }) => {
		const t = useTranslation();
		if (getPoiResult(tool)) return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(PoiAnsweredView, { tool });
		return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "poi-pick-inline-loading",
			children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("span", {
				className: "cb-shining-text",
				children: t("poi.dialog.locating")
			})
		});
	});
	PoiDialogFlowInline.displayName = "PoiDialogFlowInline";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/poi-pick/poi-pick-renderer.tsx
/** 安全解析 tool.args，不抛异常 */
function parseToolArgs(tool) {
	try {
		const args = typeof tool.args === "string" ? JSON.parse(tool.args) : tool.args;
		return args && typeof args === "object" ? args : void 0;
	} catch {
		return;
	}
}
var import_jsx_runtime$24, PoiPickRenderer;
var init_poi_pick_renderer = __esmMin((() => {
	require_react();
	init_poi();
	init_tool_protocol();
	init_PoiDialogFlowInline();
	import_jsx_runtime$24 = require_jsx_runtime();
	PoiPickRenderer = class {
		constructor() {
			this.className = "poi-pick";
		}
		canHandle(tool) {
			if (!isPickLocationTool(tool)) return ToolRendererPriority.NONE;
			if (getPoiResult(tool)) return ToolRendererPriority.NONE;
			if (parseToolArgs(tool)?.poiPick) return 11;
			if (isPoiToolPending(tool)) return ToolRendererPriority.EXACT;
			return ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(PoiDialogFlowInline, {
				tool,
				context
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/poi-pick/index.ts
var init_poi_pick = __esmMin((() => {
	init_poi_pick_renderer();
	init_PoiDialogFlowInline();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/read-file/read-file-renderer.scss
var init_read_file_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/utils/file-access.ts
/**
* 判断文件路径是否允许用户在侧边栏打开。
* @param filePath - 文件路径（支持 Windows / Unix 分隔符）
*/
function isOpenableFilePath(filePath) {
	if (typeof filePath !== "string" || !filePath.trim()) return false;
	const normalized = filePath.replace(/\\/g, "/");
	if (SYSTEM_PATH_RE.test(normalized)) return false;
	const segments = normalized.split("/");
	const hiddenIndex = segments.findIndex((s) => s.length > 1 && s.startsWith(".") && s !== "..");
	if (hiddenIndex >= 0) {
		const subPath = segments.slice(hiddenIndex).join("/");
		if (OPENABLE_HIDDEN_PREFIXES.some((prefix) => subPath.startsWith(prefix))) return true;
		return false;
	}
	if (segments.includes("node_modules")) return false;
	return true;
}
var SYSTEM_PATH_RE, OPENABLE_HIDDEN_PREFIXES;
var init_file_access = __esmMin((() => {
	SYSTEM_PATH_RE = /^\/(etc|proc|sys|dev|tmp)(\/|$)/i;
	OPENABLE_HIDDEN_PREFIXES = [
		".codebuddy/brain/",
		".codebuddy/plans/",
		".codebuddy/tasks/",
		".codebuddy/todos/",
		".codebuddy/memory/",
		".workbuddy/brain/",
		".workbuddy/plans/",
		".workbuddy/tasks/",
		".workbuddy/todos/",
		".workbuddy/memory/",
		".workbuddy/artifact-index/"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/read-file/read-file-tool-adapter.ts
/**
* 检查是否为 ReadFile 工具调用
*/
function isReadFileToolCall(tool) {
	return tool.name === "read_file" || tool.name === "read-file" || tool.name === "Read";
}
var ReadFileToolAdapter;
var init_read_file_tool_adapter = __esmMin((() => {
	init_src();
	ReadFileToolAdapter = class {
		constructor(tool) {
			if (!isReadFileToolCall(tool)) throw new Error(`Invalid tool type for ReadFileToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 收敛 args：orphan tool-call（仅带 result、无输入 args，来自 Mock 注入 / history
		* 回放 / ACP 边界）运行时 args 可能为 undefined，直读成员会抛
		* "Cannot read properties of undefined" 导致整页 crash。恒返回对象。
		*/
		get safeArgs() {
			return toRecordOrEmpty(this.tool.args);
		}
		/**
		* 获取文件路径，支持多种参数格式
		*
		* 每个候选值都过 toStringOrEmpty 做 runtime 收敛：ACP/history/MCP 边界可能传入
		* 非字符串的 filePath（对象/数组/数字等），若直接 `as string` 返回脏值，下游
		* isOpenableFilePath / filePath.trim() 会抛 "filePath.trim is not a function"
		* 导致整页 crash（issue #62819）。这里保证返回值恒为 string。
		*/
		getFilePath() {
			return toStringOrEmpty(this.safeArgs.filePath) || toStringOrEmpty(this.safeArgs.file_path) || toStringOrEmpty(this.safeArgs.name) || toStringOrEmpty(this.safeArgs.file) || toStringOrEmpty(this.safeArgs.path) || "";
		}
		/**
		* 获取起始行号
		*/
		getStartLine() {
			return this.safeArgs.startLine || this.safeArgs.start || this.safeArgs.offset || void 0;
		}
		/**
		* 获取结束行号
		*/
		getEndLine() {
			return this.safeArgs.endLine || this.safeArgs.end || void 0;
		}
		/**
		* 获取文件内容
		*/
		getContent() {
			const result = this.tool.result;
			return result?.result?.content || result?.result;
		}
		/**
		* 判断是否为图片文件
		*/
		isImage() {
			const filePath = this.getFilePath();
			const isImageBySuffix = /\.(png|jpe?g|gif|bmp|svg|webp|tiff?|ico)$/i.test(filePath);
			const result = this.tool.result;
			return !!(result?.result && typeof result.result === "object" && result.result.image) || isImageBySuffix;
		}
		/**
		* 转换为 ReadFileData 格式
		*/
		toReadFileData() {
			return {
				filePath: this.getFilePath(),
				startLine: this.getStartLine(),
				endLine: this.getEndLine(),
				content: this.getContent(),
				isImage: this.isImage()
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/read-file/read-file-renderer.tsx
var import_react$24, import_jsx_runtime$23, ReadFileRendererWithContext, ReadFileRenderer;
var init_read_file_renderer = __esmMin((() => {
	init_read_file_renderer$1();
	init_src();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_file_access();
	init_tool_icon_render_config();
	init_tool_protocol();
	init_read_file_tool_adapter();
	import_jsx_runtime$23 = require_jsx_runtime();
	ReadFileRendererWithContext = ({ tool, context }) => {
		const contextRef = (0, import_react$24.useRef)(context);
		(0, import_react$24.useEffect)(() => {
			contextRef.current = context;
		}, [context]);
		const filePath = (0, import_react$24.useMemo)(() => new ReadFileToolAdapter(tool).getFilePath(), [tool]);
		const config = (0, import_react$24.useMemo)(() => {
			const openable = isOpenableFilePath(filePath);
			return {
				showLineNumbers: true,
				enableSyntaxHighlight: true,
				converter: (t) => {
					return new ReadFileToolAdapter(t).toReadFileData();
				},
				onFileClick: openable ? (path, _startLine, _endLine) => {
					contextRef.current?.onFileClick?.(path);
				} : void 0,
				primaryClassName: openable ? void 0 : "",
				...toolIconRenderConfig
			};
		}, [filePath]);
		return (0, import_react$24.useMemo)(() => createReadFileRenderer(config), [config])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	ReadFileRenderer = class {
		constructor(_config) {
			this.className = "read-file";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isReadFileToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, _config, context) {
			if (!isReadFileToolCall(tool)) {
				console.warn("[ReadFileRenderer] Invalid tool type:", tool.name, "- expected: read_file");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(ReadFileRendererWithContext, {
					tool,
					context
				});
			} catch (error) {
				console.error("[ReadFileRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "read-file-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/read-file/index.ts
var init_read_file = __esmMin((() => {
	init_read_file_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/read-lints/read-lints-renderer.scss
var init_read_lints_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/read-lints/read-lints-renderer.tsx
/**
* 检查是否为 ReadLints 工具调用
*/
function isReadLintsToolCall(tool) {
	const name = tool.name;
	return name === "read_lints" || name === "read-lints";
}
var import_react$23, import_jsx_runtime$22, ReadLintsToolAdapter, ReadLintsRendererContent, ReadLintsRenderer;
var init_read_lints_renderer = __esmMin((() => {
	init_read_lints_renderer$1();
	init_src();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$22 = require_jsx_runtime();
	ReadLintsToolAdapter = class {
		constructor(tool) {
			if (!isReadLintsToolCall(tool)) throw new Error(`Invalid tool type for ReadLintsToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 获取检查的路径列表
		*/
		getPaths() {
			const rawPaths = this.tool.args?.paths;
			if (typeof rawPaths === "string") return rawPaths ? [rawPaths] : [];
			if (Array.isArray(rawPaths)) return rawPaths;
			return [];
		}
		/**
		* 获取显示的路径文本
		*/
		getPathText(workspace) {
			const paths = this.getPaths();
			if (!paths || paths.length === 0) return "workspace";
			if (paths.length === 1) {
				const path = this.getRelativeFilePath(paths[0], workspace);
				return path.split("/").pop() || path;
			}
			return `${paths.length} files`;
		}
		/**
		* 获取相对路径
		*/
		getRelativeFilePath(filePath, workspace) {
			if (!workspace || !filePath.startsWith(workspace)) return filePath;
			const relativePath = filePath.slice(workspace.length);
			return relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
		}
		/**
		* 获取 diagnostics 数组
		*/
		getDiagnostics() {
			return this.tool.result?.result?.diagnostics || [];
		}
		/**
		* 从结果中计算错误数量
		*/
		getErrorCount() {
			const diagnostics = this.getDiagnostics();
			if (!diagnostics || diagnostics.length === 0) return 0;
			const diagnosticsText = diagnostics.join("\n");
			if (!diagnosticsText || diagnosticsText.trim().length === 0) return 0;
			const issuePattern = /(?:ERROR|WARNING|HINT)\s*\((\d+)\s+issues?\)/gi;
			let totalCount = 0;
			let match;
			while ((match = issuePattern.exec(diagnosticsText)) !== null) totalCount += parseInt(match[1], 10);
			if (totalCount > 0) return totalCount;
			return 1;
		}
		/**
		* 解析错误列表
		*/
		parseErrors() {
			const diagnostics = this.getDiagnostics();
			if (!diagnostics || diagnostics.length === 0) return [];
			const diagnosticsText = diagnostics[0] || "";
			const errorList = [];
			const errorPattern = /\[(ERROR|WARNING|HINT)\]\s+Line\s+(\d+)(?:,\s+Column\s+(\d+))?:\s+(.+?)(?=\n|$)/g;
			let match;
			while ((match = errorPattern.exec(diagnosticsText)) !== null) {
				const [, , line, column, message] = match;
				errorList.push({
					message: message.trim().replace(/\.{3}.*$/, "..."),
					location: column ? `L${line}:${column}` : `L${line}`
				});
			}
			return errorList;
		}
		/**
		* 是否被截断
		*/
		isTruncated() {
			return this.tool.result?.result?.isTruncated === true;
		}
		/**
		* 转换为 ReadLintsData 格式
		*/
		toReadLintsData(workspace) {
			const errorCount = this.getErrorCount();
			const errors = this.parseErrors();
			return {
				paths: this.getPaths(),
				pathText: this.getPathText(workspace),
				errorCount,
				hasErrors: errorCount > 0,
				errors,
				diagnostics: this.getDiagnostics(),
				isTruncated: this.isTruncated()
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	ReadLintsRendererContent = ({ tool }) => {
		const rendererConfig = (0, import_react$23.useMemo)(() => ({
			maxDisplayErrors: 20,
			onErrorClick: (error) => {}
		}), []);
		return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)((0, import_react$23.useMemo)(() => createReadLintsRenderer({ maxDisplayErrors: 20 }), []), {
			tool,
			config: (0, import_react$23.useMemo)(() => ({
				...rendererConfig,
				converter: (t) => {
					return new ReadLintsToolAdapter(t).toReadLintsData();
				},
				...toolIconRenderConfig
			}), [rendererConfig]),
			isSessionActive: false
		});
	};
	ReadLintsRenderer = class {
		constructor(_config) {
			this.className = "read-lints";
			this.defaultShowResult = true;
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isReadLintsToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, _config, _context) {
			if (!isReadLintsToolCall(tool)) {
				console.warn("[ReadLintsRenderer] Invalid tool type:", tool.name, "- expected: read_lints");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(ReadLintsRendererContent, { tool });
			} catch (error) {
				console.error("[ReadLintsRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
					className: "read-lints-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/read-lints/index.ts
var init_read_lints = __esmMin((() => {
	init_read_lints_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/search-reference/search-reference-renderer.scss
var init_search_reference_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/search-reference/search-reference-renderer.tsx
/**
* 检查是否为 SearchReference 工具调用
*/
function isSearchReferenceToolCall(tool) {
	return tool.name === "codebase_search" || tool.name === "RAG_search";
}
var import_react$22, import_jsx_runtime$21, SearchReferenceToolAdapter, SearchReferenceRendererWithContext, SearchReferenceRenderer;
var init_search_reference_renderer = __esmMin((() => {
	init_search_reference_renderer$1();
	init_src();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$21 = require_jsx_runtime();
	SearchReferenceToolAdapter = class {
		constructor(tool) {
			if (!isSearchReferenceToolCall(tool)) throw new Error(`Invalid tool type for SearchReferenceToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 获取引用类型
		*/
		getType() {
			return this.tool.name === "RAG_search" ? "knowledge" : "codebase";
		}
		/**
		* 获取引用列表
		* 数据结构: tool.result.result 包含实际的引用数据（数字键 "0","1",... 为引用项）
		*/
		getReferences() {
			const resultData = this.tool.result?.result;
			const references = [];
			if (resultData && typeof resultData === "object") Object.entries(resultData).forEach(([key, item]) => {
				if (!/^\d+$/.test(key)) return;
				if (item?.metadata) references.push({
					fileName: item.metadata.file_name || "",
					source: item.metadata.source || "",
					sourceType: item.metadata.source_type || "",
					startPos: item.metadata.start_pos,
					endPos: item.metadata.end_pos,
					knowledgeBaseId: item.knowledgeBaseId,
					chunk: item.chunk
				});
			});
			return references;
		}
		/**
		* 转换为 SearchReferenceData 格式
		*/
		toSearchReferenceData() {
			return {
				type: this.getType(),
				references: this.getReferences()
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	SearchReferenceRendererWithContext = ({ tool }) => {
		return (0, import_react$22.useMemo)(() => createSearchReferenceRenderer({
			converter: (t) => {
				return new SearchReferenceToolAdapter(t).toSearchReferenceData();
			},
			onReferenceClick: (ref, index) => {},
			...toolIconRenderConfig
		}), [])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	SearchReferenceRenderer = class {
		constructor(config) {
			this.className = "search-reference";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isSearchReferenceToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, config, context) {
			if (!isSearchReferenceToolCall(tool)) {
				console.warn("[SearchReferenceRenderer] Invalid tool type:", tool.name, "- expected: codebase_search or RAG_search");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(SearchReferenceRendererWithContext, { tool });
			} catch (error) {
				console.error("[SearchReferenceRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
					className: "search-reference-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/search-reference/index.ts
var init_search_reference = __esmMin((() => {
	init_search_reference_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/send-message/send-message-renderer.scss
var init_send_message_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/use-specialist-agent-directory.ts
async function loadDirectory(adapter) {
	if (cache && Date.now() - cachedAt < TTL_MS) return cache;
	if (inflight) return inflight;
	if (!adapter?.listGrantedCloudAgents) return EMPTY_DIRECTORY;
	const pending = adapter.listGrantedCloudAgents({
		agentRole: "specialist",
		pageSize: 100,
		withManifest: true
	}).then((res) => {
		const map = /* @__PURE__ */ new Map();
		for (const item of res.items ?? []) map.set(item.id, item);
		cache = map;
		cachedAt = Date.now();
		inflight = null;
		return map;
	}).catch((err) => {
		inflight = null;
		console.warn("[SpecialistTools] load specialist agents failed:", String(err));
		return EMPTY_DIRECTORY;
	});
	inflight = pending;
	return pending;
}
function useAdapterSafe() {
	try {
		return useAdapter();
	} catch {
		return;
	}
}
/**
* 返回 specialist 云 agent 目录（id → CloudAgentListItem）。
* 首次渲染可能是空 Map，拉取完成后自动更新；失败/不支持时保持空 Map。
*
* @param enabled 是否需要目录数据。传 false 时不发请求（如团队模式的 send_message 卡，
*   没有 expert_id，无需匹配 specialist agent），保证改动严格锁定在云助理场景。
*/
function useSpecialistAgentDirectory(enabled = true) {
	const adapter = useAdapterSafe();
	const [directory, setDirectory] = (0, import_react$21.useState)(cache ?? EMPTY_DIRECTORY);
	(0, import_react$21.useEffect)(() => {
		if (!enabled) return;
		let alive = true;
		loadDirectory(adapter).then((map) => {
			if (alive) setDirectory(map);
		});
		return () => {
			alive = false;
		};
	}, [adapter, enabled]);
	return directory;
}
var import_react$21, EMPTY_DIRECTORY, TTL_MS, cache, cachedAt, inflight;
var init_use_specialist_agent_directory = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	EMPTY_DIRECTORY = /* @__PURE__ */ new Map();
	TTL_MS = 5 * 6e4;
	cache = null;
	cachedAt = 0;
	inflight = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/send-message/send-message-utils.ts
function isRecord$2(value) {
	return typeof value === "object" && value !== null;
}
function safeJsonParse$2(value) {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
function normalizeToolName$2(name) {
	return String(name || "").trim().toLowerCase().replace(/-/g, "_");
}
function isSendMessageType(value) {
	return value === "message" || value === "broadcast" || value === "shutdown_request" || value === "shutdown_response" || value === "plan_approval_response";
}
function addResultMessage(state, value) {
	if (typeof value !== "string") return;
	const trimmed = value.trim();
	if (!trimmed || state.seenResultMessages.has(trimmed)) return;
	state.seenResultMessages.add(trimmed);
	state.resultMessages.push(trimmed);
}
function normalizeAgentName(name) {
	if (typeof name !== "string") return;
	const trimmed = name.trim();
	if (!trimmed) return;
	if (trimmed === "@team") return trimmed;
	if (trimmed === "main" || trimmed === "@main") return "@team-lead";
	return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}
function normalizeAgentNameFromCandidates(...candidates) {
	for (const candidate of candidates) {
		const normalized = normalizeAgentName(candidate);
		if (normalized) return normalized;
	}
}
function isLikelyOpaqueAgentLabel(label) {
	const normalized = String(label || "").replace(/^@+/, "").trim();
	return /^\d{8,}$/.test(normalized) || /^[0-9a-f]{8}-[0-9a-f-]{18,}$/i.test(normalized) || /^(expert|agent|specialist)[-_]?\d+/i.test(normalized);
}
function inferRecipientFromMessage(message) {
	if (!message) return;
	const quotedMatch = message.match(/sent to\s+"([^"]+)"/i);
	if (quotedMatch?.[1]) return normalizeAgentName(quotedMatch[1]);
	const inboxMatch = message.match(/to\s+([@\w.-]+)'s inbox/i);
	if (inboxMatch?.[1]) return normalizeAgentName(inboxMatch[1]);
}
function inferSenderFromMessage(message) {
	if (!message) return;
	const byMatch = message.match(/\bby\s+([@\w.-]+)/i);
	if (byMatch?.[1]) return normalizeAgentName(byMatch[1]);
}
function scoreResultMessage(message) {
	const normalized = message.toLowerCase();
	if (normalized.includes("wait for their shutdown_response")) return 1e3 + message.length;
	if (normalized.includes("message sent to") || normalized.includes("broadcast to")) return 900 + message.length;
	if (normalized.includes("shutdown response sent") || normalized.includes("plan approval")) return 850 + message.length;
	if (normalized.includes("error:") || normalized.includes("not found")) return 950 + message.length;
	return 100 + message.length;
}
function pickPrimaryResultMessage(state) {
	if (state.resultMessages.length === 0) return;
	return state.resultMessages.slice().sort((a, b) => scoreResultMessage(b) - scoreResultMessage(a))[0];
}
function collectStructuredInfo$2(value, state, depth = 0) {
	if (depth > 10 || value === void 0 || value === null) return;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return;
		const parsed = safeJsonParse$2(trimmed);
		if (parsed !== void 0) {
			collectStructuredInfo$2(parsed, state, depth + 1);
			return;
		}
		addResultMessage(state, trimmed);
		return;
	}
	if (Array.isArray(value)) {
		value.forEach((item) => collectStructuredInfo$2(item, state, depth + 1));
		return;
	}
	if (!isRecord$2(value)) return;
	if (!state.type && isSendMessageType(value.type)) state.type = value.type;
	const senderName = normalizeAgentNameFromCandidates(value.senderName, value.sender_name, value.fromName, value.from_name);
	if (senderName && (!state.sender || isLikelyOpaqueAgentLabel(state.sender))) state.sender = senderName;
	const sender = normalizeAgentName(value.sender ?? value.from);
	if (!state.sender && sender) state.sender = sender;
	const recipientName = normalizeAgentNameFromCandidates(value.recipientName, value.recipient_name, value.targetName, value.target_name, value.toName, value.to_name, value.expert_name, value.expertName, value.specialist_agent_name, value.specialistAgentName, value.agent_name, value.agentName, value.displayName);
	if (recipientName && (!state.recipient || isLikelyOpaqueAgentLabel(state.recipient))) state.recipient = recipientName;
	const recipient = normalizeAgentName(value.recipient ?? value.target ?? value.to ?? value.expert_id ?? value.expertId ?? value.expertAgentId ?? value.specialistAgentId);
	if (!state.recipient && recipient) state.recipient = recipient;
	if (!state.recipientExpertId) {
		const expertId = value.expert_id ?? value.expertId ?? value.specialistAgentId ?? value.expertAgentId;
		if (typeof expertId === "string" && expertId.trim()) state.recipientExpertId = expertId.trim();
	}
	if (!state.recipientName) {
		const cleanName = value.expert_name ?? value.expertName ?? value.recipient_name ?? value.recipientName ?? value.agent_name ?? value.agentName ?? value.displayName;
		if (typeof cleanName === "string" && cleanName.trim()) state.recipientName = cleanName.trim();
	}
	if (!state.summary && typeof value.summary === "string" && value.summary.trim()) state.summary = value.summary.trim();
	const contentCandidate = value.content ?? value.prompt ?? value.feedback ?? value.reason;
	if (!state.content && typeof contentCandidate === "string" && contentCandidate.trim()) state.content = contentCandidate.trim();
	if (state.approved === void 0 && typeof value.approved === "boolean") state.approved = value.approved;
	if (state.approved === void 0 && typeof value.approve === "boolean") state.approved = value.approve;
	if (state.recipientCount === void 0 && typeof value.recipientCount === "number") state.recipientCount = value.recipientCount;
	addResultMessage(state, value.resultMessage);
	addResultMessage(state, value.message);
	addResultMessage(state, value.error);
	if (typeof value.text === "string" && !safeJsonParse$2(value.text)) addResultMessage(state, value.text);
	collectStructuredInfo$2(value.renderer, state, depth + 1);
	collectStructuredInfo$2(value.value, state, depth + 1);
	collectStructuredInfo$2(value.routing, state, depth + 1);
	collectStructuredInfo$2(value.result, state, depth + 1);
	collectStructuredInfo$2(value.data, state, depth + 1);
	collectStructuredInfo$2(value.text, state, depth + 1);
}
function getNestedArgs$2(tool) {
	const args = isRecord$2(tool.args) ? tool.args : {};
	if (isRecord$2(args.arguments)) return {
		...args,
		...args.arguments
	};
	return args;
}
function inferOutcome$2(tool, type, resultMessage) {
	const status = String(tool.status || "");
	if ([
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(status)) return "running";
	if ([
		"failed",
		"cancelled",
		"destroyed"
	].includes(status)) return "error";
	if (resultMessage && /\berror:|not found|failed\b/i.test(resultMessage)) return "error";
	if (type === "shutdown_request" && resultMessage && /shutdown_response/i.test(resultMessage)) return "waiting";
	return "success";
}
function isSendMessageToolName(name) {
	const normalized = normalizeToolName$2(name);
	return normalized === "send_message" || normalized === "sendmessage";
}
function isSendMessageToolCall(tool) {
	return isSendMessageToolName(tool.name);
}
function extractSendMessageViewData(tool) {
	const args = getNestedArgs$2(tool);
	const argsRecipientName = normalizeAgentNameFromCandidates(args.recipientName, args.recipient_name, args.targetName, args.target_name, args.toName, args.to_name, args.expert_name, args.expertName, args.specialist_agent_name, args.specialistAgentName, args.agent_name, args.agentName, args.displayName);
	const argsExpertId = args.expert_id ?? args.expertId ?? args.specialistAgentId ?? args.expertAgentId;
	const argsCleanName = args.expert_name ?? args.expertName ?? args.recipient_name ?? args.recipientName ?? args.agent_name ?? args.agentName ?? args.displayName;
	const state = {
		type: isSendMessageType(args.type) ? args.type : "message",
		sender: normalizeAgentName(args.sender),
		recipient: argsRecipientName || normalizeAgentName(args.recipient ?? args.target ?? args.to ?? args.expert_id ?? args.expertId ?? args.expertAgentId ?? args.specialistAgentId),
		recipientExpertId: typeof argsExpertId === "string" && argsExpertId.trim() ? argsExpertId.trim() : void 0,
		recipientName: typeof argsCleanName === "string" && argsCleanName.trim() ? argsCleanName.trim() : void 0,
		summary: typeof args.summary === "string" ? args.summary.trim() : void 0,
		content: typeof args.content === "string" ? args.content.trim() : typeof args.message === "string" ? args.message.trim() : typeof args.prompt === "string" ? args.prompt.trim() : void 0,
		approved: typeof args.approve === "boolean" ? args.approve : void 0,
		resultMessages: [],
		seenResultMessages: /* @__PURE__ */ new Set()
	};
	collectStructuredInfo$2(tool.result?.result, state);
	collectStructuredInfo$2(tool.result, state);
	const resultMessage = pickPrimaryResultMessage(state);
	const recipient = state.recipient || inferRecipientFromMessage(resultMessage);
	const sender = state.sender || inferSenderFromMessage(resultMessage);
	const type = state.type || "message";
	return {
		type,
		sender,
		recipient,
		recipientExpertId: state.recipientExpertId,
		recipientName: state.recipientName,
		summary: state.summary,
		content: state.content,
		resultMessage,
		approved: state.approved,
		recipientCount: state.recipientCount,
		outcome: inferOutcome$2(tool, type, resultMessage)
	};
}
var init_send_message_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/send-message/send-message-renderer.tsx
/** 把 "已成功把消息发送给 {recipient}" 模板中的 recipient 占位符替换为 [头像][名字]。 */
function renderTitleWithInlineAvatar(template, avatar, name) {
	const [before, after = ""] = template.split(TITLE_RECIPIENT_PLACEHOLDER);
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [
		before,
		avatar,
		name,
		after
	] });
}
function formatParticipantLabel(t, rawLabel, role) {
	const normalized = String(rawLabel || "").trim();
	if (!normalized) return role === "sender" ? t("tool.sendMessage.currentAgent") : t("tool.sendMessage.unknownRecipient");
	const lower = normalized.toLowerCase();
	if (lower === "@team-lead" || lower === "@main" || lower === "main") return t("tool.sendMessage.currentAgent");
	if (lower === "@team") return t("tool.sendMessage.teamRecipient");
	return normalized;
}
function getRouteText(t, senderLabel, recipientLabel, type) {
	switch (type) {
		case "broadcast": return `${senderLabel} → ${recipientLabel}`;
		case "shutdown_request": return t("tool.sendMessage.route.shutdownRequest", {
			sender: senderLabel,
			recipient: recipientLabel
		});
		case "shutdown_response": return t("tool.sendMessage.route.shutdownResponse", {
			sender: senderLabel,
			recipient: recipientLabel
		});
		case "plan_approval_response": return t("tool.sendMessage.route.planApprovalResponse", {
			sender: senderLabel,
			recipient: recipientLabel
		});
		default: return `${senderLabel} → ${recipientLabel}`;
	}
}
function formatResultText(t, type, outcome, recipientLabel, rawResultText) {
	const normalizedRawResultText = String(rawResultText || "").trim();
	if (outcome === "error") return normalizedRawResultText || t("tool.sendMessage.status.failed");
	if (type === "broadcast") return t("tool.sendMessage.result.broadcastDelivered");
	if (type === "shutdown_request") return outcome === "waiting" ? t("tool.sendMessage.result.shutdownRequestWaiting", { recipient: recipientLabel }) : t("tool.sendMessage.result.shutdownRequestDelivered", { recipient: recipientLabel });
	if (type === "shutdown_response") return t("tool.sendMessage.result.shutdownResponseDelivered", { recipient: recipientLabel });
	if (type === "plan_approval_response") return t("tool.sendMessage.result.planApprovalResponseDelivered", { recipient: recipientLabel });
	return t("tool.sendMessage.result.deliveredTo", { recipient: recipientLabel });
}
function formatCollapsedTitle(t, type, outcome, recipientLabel, resultText) {
	if (outcome === "running") return t("tool.sendMessage.title.sending");
	if (outcome === "error") return t("tool.sendMessage.status.failed");
	if (type === "message") return t("tool.sendMessage.title.sentTo", { recipient: recipientLabel });
	if (type === "broadcast") return t("tool.sendMessage.title.broadcastSent");
	return resultText || t("tool.sendMessage.status.success");
}
function SendMessageRendererContent(props) {
	const { tool } = props;
	const t = useTranslation();
	const viewData = (0, import_react$20.useMemo)(() => extractSendMessageViewData(tool), [tool]);
	const directory = useSpecialistAgentDirectory(Boolean(viewData.recipientExpertId));
	const [detailVisible, setDetailVisible] = (0, import_react$20.useState)(false);
	(0, import_react$20.useEffect)(() => {
		setDetailVisible(false);
	}, [tool.id]);
	const senderLabel = formatParticipantLabel(t, viewData.sender, "sender");
	const recipientLabel = formatParticipantLabel(t, viewData.recipient, "recipient");
	const resultText = formatResultText(t, viewData.type, viewData.outcome, recipientLabel, viewData.resultMessage);
	const routeText = getRouteText(t, senderLabel, recipientLabel, viewData.type);
	const contentText = viewData.content?.trim();
	const shouldShowContentLine = Boolean(contentText && contentText !== viewData.summary);
	const shouldShowResultLine = Boolean(resultText);
	const hasDetail = Boolean(viewData.summary || viewData.content || viewData.recipientCount || resultText);
	const collapsedTitle = formatCollapsedTitle(t, viewData.type, viewData.outcome, recipientLabel, resultText);
	const recipientAgent = viewData.recipientExpertId ? directory.get(viewData.recipientExpertId) : void 0;
	const cleanRecipientName = viewData.recipientName || recipientLabel.replace(/^@+/, "");
	const useInlineAvatar = viewData.type === "message" && viewData.outcome !== "running" && viewData.outcome !== "error" && Boolean(viewData.recipientExpertId);
	const collapsedTitleNode = useInlineAvatar ? renderTitleWithInlineAvatar(t("tool.sendMessage.title.sentTo", { recipient: TITLE_RECIPIENT_PLACEHOLDER }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(Avatar, {
		className: "send-message-tool__inline-avatar",
		size: 18,
		src: recipientAgent?.avatar,
		children: cleanRecipientName
	}), cleanRecipientName) : collapsedTitle;
	const collapsedTitleText = useInlineAvatar ? t("tool.sendMessage.title.sentTo", { recipient: cleanRecipientName }) : collapsedTitle;
	const detailLines = [
		{
			key: "route",
			label: t("tool.sendMessage.route"),
			value: routeText
		},
		typeof viewData.recipientCount === "number" && viewData.recipientCount > 0 ? {
			key: "recipientCount",
			label: t("tool.sendMessage.recipientCountLabel"),
			value: t("tool.sendMessage.recipientCount", { count: viewData.recipientCount })
		} : null,
		viewData.summary ? {
			key: "summary",
			label: t("tool.sendMessage.summary"),
			value: viewData.summary
		} : null,
		shouldShowContentLine && contentText ? {
			key: "content",
			label: t("tool.sendMessage.content"),
			value: contentText,
			preserveWhitespace: true
		} : null,
		shouldShowResultLine ? {
			key: "result",
			label: t("tool.sendMessage.result"),
			value: resultText,
			preserveWhitespace: true
		} : null
	].filter((line) => Boolean(line));
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
		className: "assistant-message-tools",
		children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
			className: "assistant-message-tool-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
				className: "assistant-message-tool send-message",
				children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
					className: "tool-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("button", {
						type: "button",
						className: (0, import_classnames$5.default)("send-message-tool__header", { "send-message-tool__header--clickable": hasDetail }),
						onClick: hasDetail ? () => setDetailVisible((prev) => !prev) : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
							className: "send-message-tool__header-main",
							children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
								className: "send-message-tool__title",
								title: collapsedTitleText,
								children: collapsedTitleNode
							})
						}), hasDetail ? /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
							className: "send-message-tool__chevron",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(ChevronRight, {
								className: (0, import_classnames$5.default)("send-message-tool__chevron-icon", { "send-message-tool__chevron-icon--expanded": detailVisible }),
								size: 14
							})
						}) : null]
					}), hasDetail && detailVisible ? /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
						className: "send-message-tool__details",
						children: detailLines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
							className: "send-message-tool__detail-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
								className: "send-message-tool__detail-label",
								children: line.label
							}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
								className: (0, import_classnames$5.default)("send-message-tool__detail-value", { "send-message-tool__detail-value--prewrap": line.preserveWhitespace }),
								children: line.value
							})]
						}, line.key))
					}) : null]
				})
			})
		})
	});
}
var import_classnames$5, import_react$20, import_jsx_runtime$20, TITLE_RECIPIENT_PLACEHOLDER, SendMessageRenderer;
var init_send_message_renderer = __esmMin((() => {
	init_send_message_renderer$1();
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	init_lucide_react();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	init_tool_protocol();
	init_use_specialist_agent_directory();
	init_send_message_utils();
	import_jsx_runtime$20 = require_jsx_runtime();
	TITLE_RECIPIENT_PLACEHOLDER = "";
	SendMessageRenderer = class {
		constructor() {
			this.className = "send-message";
			this.theme = "border";
		}
		canHandle(tool) {
			return isSendMessageToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool) {
			if (!isSendMessageToolCall(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(SendMessageRendererContent, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/send-message/index.ts
var init_send_message = __esmMin((() => {
	init_send_message_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/skill/skill-renderer.scss
var init_skill_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/skill/skill-renderer.tsx
/**
* 检查是否为 Skill 工具调用
*/
function isSkillToolCall(tool) {
	const name = tool.name;
	return SKILL_TOOL_NAMES.includes(name);
}
var import_react$19, import_jsx_runtime$19, SKILL_TOOL_NAMES, SkillToolAdapter, SkillRendererContent, SkillRenderer;
var init_skill_renderer = __esmMin((() => {
	init_skill_renderer$1();
	init_src();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$19 = require_jsx_runtime();
	SKILL_TOOL_NAMES = [
		"use_skill",
		"use-skill",
		"Skill"
	];
	SkillToolAdapter = class {
		constructor(tool) {
			if (!isSkillToolCall(tool)) throw new Error(`Invalid tool type for SkillToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 转换为 SkillData 格式
		* 支持两种参数格式：
		* - Local 模式: { command: "skill-name" }
		* - Cloud 模式: { skill: "skill-name" }
		*/
		toSkillData() {
			const args = this.tool.args;
			const raw = args?.skill ?? args?.command;
			return { skillName: typeof raw === "string" ? raw : "" };
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	SkillRendererContent = ({ tool, context }) => {
		const isCompact = context?.compact ?? false;
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)((0, import_react$19.useMemo)(() => createSkillRenderer({
			compact: isCompact,
			converter: (t) => {
				return new SkillToolAdapter(t).toSkillData();
			},
			...toolIconRenderConfig
		}), [isCompact]), {
			tool,
			isSessionActive: false
		});
	};
	SkillRenderer = class {
		constructor(_config) {
			this.className = "skill";
			this.clickHeader = false;
			this.theme = "border";
		}
		canHandle(tool) {
			return isSkillToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, _config, context) {
			if (!isSkillToolCall(tool)) {
				console.warn("[SkillRenderer] Invalid tool type:", tool.name, "- expected one of:", SKILL_TOOL_NAMES.join(", "));
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(SkillRendererContent, {
					tool,
					context
				});
			} catch (error) {
				console.error("[SkillRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
					className: "skill-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/skill/index.ts
var init_skill = __esmMin((() => {
	init_skill_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/specialist-tools/specialist-tools-renderer.scss
var init_specialist_tools_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/utils/session-status.ts
/** 将不同来源的会话状态统一归一化为 UI 可消费状态。 */
function normalizeColleagueSessionStatus(status) {
	const normalized = normalizeStatusToken(status);
	if (!normalized) return "unknown";
	if (RUNNING_STATUS_SET.has(normalized)) return "running";
	if (IDLE_STATUS_SET.has(normalized)) return "idle";
	if (COMPLETED_STATUS_SET.has(normalized)) return "completed";
	if (FAILED_STATUS_SET.has(normalized)) return "failed";
	if (DELETED_STATUS_SET.has(normalized)) return "deleted";
	return "unknown";
}
/** 判断当前 ACP session 是否仍在运行，用于恢复输入框停止状态。 */
function isColleagueSessionRunning(status) {
	return normalizeColleagueSessionStatus(status) === "running";
}
/** 判断当前 ACP session 是否已经进入终态，用于收敛流式 UI 状态。 */
function isColleagueSessionTerminal(status) {
	const uiStatus = normalizeColleagueSessionStatus(status);
	return uiStatus === "completed" || uiStatus === "failed" || uiStatus === "deleted";
}
function shouldActivateQueueAfterSessionStatus(status) {
	const token = normalizeStatusToken(status);
	if (!token) return false;
	return QUEUE_ACTIVATABLE_RAW_TOKENS.has(token);
}
function shouldDetachColleagueConnectionForRestart(status, pendingQuestionResolutionCount) {
	return status === "streaming" || pendingQuestionResolutionCount > 0;
}
/**
* 判断网盘历史返回后是否可以提前把 chatStatus 推进到 ready，
* 不必等 ACP session/load 返回。
*
* 网盘与 ACP 读取的是同一份持久化历史（hibernate_resume 场景下两者状态基本一致），
* 因此网盘返回终态时可以安全地提前启用输入框；ACP 返回后再用权威状态覆盖。
*
* 条件：
*   - 无未完成 assistant 消息（pendingAssistantSnapshot 为空）
*   - 且 sessionTerminated（runtime replay 后的终止判定）
*     或 latestSessionStatus 归一化为终态（completed/failed/deleted）
*
* 最新状态为 running/working 时不提前 ready：上次 session 可能异常中断，
* 需 ACP 确认是恢复 streaming 还是已结束。
*/
function canEarlyReadyFromNetdriveHistory(args) {
	const { latestSessionStatus, sessionTerminated, hasPendingAssistant } = args;
	if (hasPendingAssistant) return false;
	if (sessionTerminated && !isColleagueSessionRunning(latestSessionStatus)) return true;
	return isColleagueSessionTerminal(latestSessionStatus);
}
function normalizeStatusToken(status) {
	if (typeof status !== "string") return;
	const trimmed = status.trim();
	if (!trimmed) return;
	return trimmed.toLowerCase().replace(/[\s-]+/g, "_");
}
/**
* 从一批 ACP history notifications 中提取最新的 `session_info_update` 状态。
*
* 网盘返回的 notifications 可能包含分段的 session_info_update（如 working→complete），
* 本函数遍历所有 notification，后者覆盖前者，返回最后一个 session_info_update 的状态。
*
* 参数为 `ReadonlyArray<unknown>` 以兼容 SDK 的 `SessionNotification[]` 与网盘回放的
* 通知结构，内部统一 cast 为 `SessionUpdateNotificationLike` 读取字段。
*/
function getLatestSessionStatusFromHistory(notifications) {
	let latestSessionStatus = null;
	for (const notification of notifications) {
		const routedNotification = notification;
		if (routedNotification.update?.sessionUpdate !== "session_info_update") continue;
		latestSessionStatus = extractSessionStatusFromNotification(routedNotification) ?? latestSessionStatus;
	}
	return latestSessionStatus;
}
function getSessionUpdateMeta(notification) {
	const update = notification.update;
	const updateMeta = update?._meta;
	return {
		update,
		updateMeta,
		updateCodebuddyMeta: updateMeta?.["codebuddy.ai"],
		notificationCodebuddyMeta: notification._meta?.["codebuddy.ai"]
	};
}
function extractSessionStatusFromNotification(notification) {
	const { update, updateCodebuddyMeta, notificationCodebuddyMeta } = getSessionUpdateMeta(notification);
	const status = update?.status ?? update?.sessionStatus ?? updateCodebuddyMeta?.status ?? updateCodebuddyMeta?.sessionStatus ?? notificationCodebuddyMeta?.status ?? notificationCodebuddyMeta?.sessionStatus;
	return typeof status === "string" && status.trim() ? status : null;
}
/**
* 从 ACP 通知的 _meta['codebuddy.ai'].mode 中提取 session 模式标记。
*
* ACPI session-replay.ts 在所有历史回放通知上打 `mode: 'history'` 标记，
* live 流式通知可能带 `mode: 'stream'` 或完全不带此标记。
* 本函数在通知层和 update 层双层级兜底读取。
*
* 返回 'history'（历史回放）、'stream'（实时流）或 undefined（无模式标记）。
*/
function extractSessionMode(notification) {
	const { updateCodebuddyMeta, notificationCodebuddyMeta } = getSessionUpdateMeta(notification);
	const mode = notificationCodebuddyMeta?.mode ?? updateCodebuddyMeta?.mode;
	return mode === "history" || mode === "stream" ? mode : void 0;
}
var RUNNING_STATUS_SET, IDLE_STATUS_SET, COMPLETED_STATUS_SET, FAILED_STATUS_SET, DELETED_STATUS_SET, QUEUE_ACTIVATABLE_RAW_TOKENS;
var init_session_status = __esmMin((() => {
	RUNNING_STATUS_SET = new Set([
		"creating",
		"running",
		"working",
		"planning",
		"preparing",
		"connecting",
		"in_progress",
		"stopping",
		"model_requesting",
		"model_streaming",
		"model_done",
		"tool_start",
		"tool_end",
		"tool_executing",
		"summarizing",
		"handoff",
		"waiting_team_members",
		"pending",
		"await_input",
		"awaitinput",
		"waiting_input",
		"waiting_user_input",
		"waiting_for_user",
		"waiting_for_permission"
	]);
	IDLE_STATUS_SET = new Set([
		"idle",
		"connected",
		"hibernating",
		"stopped",
		"active"
	]);
	COMPLETED_STATUS_SET = new Set([
		"completed",
		"complete",
		"done",
		"cancelled",
		"canceled"
	]);
	FAILED_STATUS_SET = new Set([
		"failed",
		"error",
		"terminated",
		"archived"
	]);
	DELETED_STATUS_SET = new Set(["deleted"]);
	QUEUE_ACTIVATABLE_RAW_TOKENS = new Set([
		"completed",
		"complete",
		"done"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/claw-workspace/create-assistant-drawer/assistant-profile-detail-utils.ts
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function getAgentManifest(agent) {
	return agent?.currentVersion?.manifest;
}
function getAgentName(agent) {
	if (!agent) return "";
	return agent.agentName || agent.agentId || `Agent ${agent.id}`;
}
function getAgentTitle(agent) {
	const title = asRecord(asRecord(getAgentManifest(agent)).annotations)[AGENT_TITLE_ANNOTATION_KEY];
	return typeof title === "string" && title.trim() ? title.trim() : "\xA0";
}
function getAgentDescription(agent) {
	const manifestDescription = asRecord(getAgentManifest(agent)).description;
	return agent?.description || (typeof manifestDescription === "string" ? manifestDescription : "");
}
function getDaysOnDuty(value) {
	if (!value) return 1;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return 1;
	return Math.max(1, Math.ceil((Date.now() - date.getTime()) / 864e5));
}
function formatProfileDateTime(value) {
	if (!value) return "--";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function abbreviateId(value) {
	if (value.length <= 12) return value;
	return `${value.slice(0, 6)}...${value.slice(-4)}`;
}
function getTaskStatusVariant(status) {
	const uiStatus = normalizeColleagueSessionStatus(status);
	if (uiStatus === "completed") return "completed";
	if (uiStatus === "running") return "working";
	return "idle";
}
function getTaskStatusTextKey(statusVariant) {
	switch (statusVariant) {
		case "completed": return "colleagues.detail.status.completed";
		case "working": return "colleagues.detail.status.inProgress";
		default: return "colleagues.detail.status.idle";
	}
}
function buildTaskRows(tasks) {
	return tasks.filter((task) => normalizeColleagueSessionStatus(task.status) !== "deleted").map((task) => {
		const statusVariant = getTaskStatusVariant(task.status);
		return {
			id: task.id,
			shortId: abbreviateId(task.sessionId),
			title: task.sessionName || task.title,
			source: "colleagues.detail.taskSourceCloud",
			statusVariant,
			statusTextKey: getTaskStatusTextKey(statusVariant),
			createdAtText: formatProfileDateTime(task.createdAt ?? task.lastActivityAt),
			agentId: task.agentId,
			instanceId: task.instanceId,
			sessionId: task.sessionId,
			sessionStatus: task.status
		};
	});
}
function getRepoProviderLabelKey(repoUrl) {
	return {
		github: "colleagues.createDialog.codeRepo.provider.github",
		cnb: "colleagues.createDialog.codeRepo.provider.cnb",
		gongfeng: "colleagues.createDialog.codeRepo.provider.gongfeng"
	}[inferRepoProviderFromUrl(repoUrl)];
}
function getWorkspaceRepoLabelKeys(manifest) {
	const workspaces = asRecord(manifest).workspaces;
	if (!Array.isArray(workspaces)) return [];
	const labels = /* @__PURE__ */ new Set();
	workspaces.forEach((workspace) => {
		const repo = asRecord(workspace).repository;
		if (typeof repo === "string" && repo.trim()) labels.add(getRepoProviderLabelKey(repo));
	});
	return Array.from(labels);
}
function getHiredExpertLabel(manifest) {
	const plugins = asRecord(manifest).plugins;
	if (!Array.isArray(plugins) || plugins.length === 0) return null;
	const first = asRecord(plugins[0]);
	const label = [
		first.displayName,
		first.agentName,
		first.title,
		first.expertId,
		first.name,
		first.enterpriseAgentId
	].find((item) => typeof item === "string" && item.trim());
	return typeof label === "string" ? label : null;
}
function inferRepoProviderFromUrl(repoUrl) {
	try {
		const host = new URL(repoUrl).hostname.toLowerCase();
		if (host === "github.com" || host.endsWith(".github.com")) return "github";
		if (host === "git.woa.com") return "gongfeng";
	} catch {
		if (/^https?:\/\/([^/]*\.)?github\.com\//i.test(repoUrl)) return "github";
		if (/^https?:\/\/git\.woa\.com\//i.test(repoUrl)) return "gongfeng";
	}
	return "cnb";
}
var AGENT_TITLE_ANNOTATION_KEY;
var init_assistant_profile_detail_utils = __esmMin((() => {
	init_session_status();
	AGENT_TITLE_ANNOTATION_KEY = "agent-title";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/specialist-tools/experts-list-card.tsx
function ExpertsListCard({ experts }) {
	const [expanded, setExpanded] = (0, import_react$18.useState)(false);
	const [openRows, setOpenRows] = (0, import_react$18.useState)(/* @__PURE__ */ new Set());
	const directory = useSpecialistAgentDirectory();
	const rows = (0, import_react$18.useMemo)(() => experts.map((expert, index) => {
		const agent = expert.expertId ? directory.get(expert.expertId) : void 0;
		const description = (agent ? getAgentDescription(agent) : expert.description ?? "").trim();
		return {
			key: expert.expertId || `${expert.name}-${index}`,
			name: agent ? getAgentName(agent) || expert.name : expert.name,
			title: agent ? getAgentTitle(agent).trim() : "",
			description,
			avatar: agent?.avatar || void 0
		};
	}), [experts, directory]);
	const toggleRow = (key) => {
		const sel = window.getSelection();
		if (sel) sel.removeAllRanges();
		setOpenRows((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
		className: "assistant-message-tools",
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
			className: "assistant-message-tool-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "assistant-message-tool specialist-tools-renderer experts-list-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("button", {
					type: "button",
					className: "experts-list-card__header",
					"aria-expanded": expanded,
					onClick: () => {
						const sel = window.getSelection();
						if (sel) sel.removeAllRanges();
						setExpanded((prev) => !prev);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(AvatarGroup, {
							size: "small",
							maxCount: AVATAR_MAX,
							children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Avatar, {
								src: row.avatar,
								children: row.name
							}, row.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
							className: "experts-list-card__count",
							children: `共 ${rows.length} 位可用助理`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ChevronRightIcon, {
							size: "sm",
							className: (0, import_classnames$4.default)("experts-list-card__chevron", { "experts-list-card__chevron--expanded": expanded })
						})
					]
				}), expanded && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
					className: "experts-list-card__list",
					children: rows.map((row) => {
						const rowOpen = openRows.has(row.key);
						const hasDescription = Boolean(row.description);
						return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
							className: "experts-list-card__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
								className: "experts-list-card__item-header",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Avatar, {
										size: "small",
										src: row.avatar,
										children: row.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
										className: "experts-list-card__item-name",
										title: row.name,
										children: row.name
									}),
									row.title && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
										className: "experts-list-card__item-title",
										title: row.title,
										children: row.title
									}),
									hasDescription && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
										type: "button",
										className: "experts-list-card__item-toggle-btn",
										"aria-expanded": rowOpen,
										"aria-label": rowOpen ? "收起助理描述" : "展开助理描述",
										onClick: () => toggleRow(row.key),
										children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ChevronRightIcon, {
											size: "sm",
											className: (0, import_classnames$4.default)("experts-list-card__item-toggle", { "experts-list-card__item-toggle--expanded": rowOpen })
										})
									})
								]
							}), hasDescription && rowOpen && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
								className: "experts-list-card__item-desc",
								children: row.description
							})]
						}, row.key);
					})
				})]
			})
		})
	});
}
var import_classnames$4, import_react$18, import_jsx_runtime$18, AVATAR_MAX;
var init_experts_list_card = __esmMin((() => {
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_assistant_profile_detail_utils();
	init_use_specialist_agent_directory();
	import_jsx_runtime$18 = require_jsx_runtime();
	AVATAR_MAX = 4;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/specialist-tools/specialist-tools-view-data.ts
function isExpertTool(tool) {
	return typeof tool.name === "string" && EXPERT_TOOL_NAMES.has(tool.name);
}
function isRunningStatus$2(status) {
	return [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(status);
}
function getStringValue(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function getResultPayload$2(tool) {
	const direct = tool.result?.result;
	return extractExpertPayload(direct?.data) ?? extractExpertPayload(direct) ?? extractExpertPayload(tool.rawOutput) ?? extractExpertPayload(tool.result);
}
function extractExpertPayload(value, depth = 0) {
	if (depth > 6 || value === void 0 || value === null) return;
	if (typeof value === "string") {
		const parsed = parseJsonFromText(value);
		return parsed === void 0 ? void 0 : extractExpertPayload(parsed, depth + 1);
	}
	if (Array.isArray(value)) {
		for (let index = value.length - 1; index >= 0; index -= 1) {
			const parsed = extractExpertPayload(value[index], depth + 1);
			if (parsed) return parsed;
		}
		return;
	}
	if (typeof value !== "object") return;
	const record = value;
	if ((record.type === "text" || record.type === "input_text") && typeof record.text === "string") return extractExpertPayload(record.text, depth + 1);
	const nested = extractExpertPayload(record.data, depth + 1) ?? extractExpertPayload(record.content, depth + 1) ?? extractExpertPayload(record.result, depth + 1);
	if (nested) return nested;
	return isExpertPayloadRecord(record) ? record : void 0;
}
function isExpertPayloadRecord(record) {
	return "experts" in record || "specialists" in record || "environments" in record || "sessions" in record || "session_id" in record || "sessionId" in record || "expert_instance_id" in record || "expert_id" in record || "specialistInstanceId" in record || "specialistAgentId" in record || "status" in record || "error" in record;
}
function getPayloadError(payload) {
	if (!payload) return;
	if (typeof payload.error === "string" && payload.error.trim()) return payload.error.trim();
	if (typeof payload.message === "string" && String(payload.status).toLowerCase() === "error") return payload.message.trim();
	return String(payload.status).toLowerCase() === "error" ? "工具执行失败" : void 0;
}
function parseJsonFromText(text) {
	const trimmed = text.trim();
	if (!trimmed) return;
	try {
		return JSON.parse(trimmed);
	} catch {}
	for (let index = trimmed.length - 1; index >= 0; index -= 1) {
		const char = trimmed[index];
		if (char !== "{" && char !== "[") continue;
		try {
			return JSON.parse(trimmed.slice(index));
		} catch {}
	}
}
function getExpertId(item) {
	return getStringValue(item.expert_id) || getStringValue(item.expertId) || getStringValue(item.specialistAgentId);
}
function getExpertName(item) {
	return getStringValue(item.name) || getStringValue(item.agentName) || getExpertId(item);
}
function getSessionId(value) {
	return getStringValue(value?.session_id) || getStringValue(value?.sessionId);
}
function getEnvironmentId(item) {
	return getStringValue(item.environment_id) || getStringValue(item.environmentId);
}
function getToolArgsRecord(tool) {
	return tool.args && typeof tool.args === "object" ? tool.args : {};
}
function getNestedToolArgs(tool) {
	const args = getToolArgsRecord(tool);
	return args.arguments && typeof args.arguments === "object" ? args.arguments : {};
}
function getSessionToolArg(tool, ...keys) {
	const args = getToolArgsRecord(tool);
	const nestedArgs = getNestedToolArgs(tool);
	for (const key of keys) {
		const value = getStringValue(args[key]) || getStringValue(nestedArgs[key]);
		if (value) return value;
	}
}
function getSessionToolAction(tool) {
	return getSessionToolArg(tool, "action")?.toLowerCase() || (tool.name === "create_specialist_session" ? "create" : tool.name === "list_specialist_sessions" ? "list" : void 0);
}
function getSessionToolSessionId(tool) {
	return getSessionToolArg(tool, "session_id", "sessionId");
}
/**
* 从 list_experts / list_specialists 的 payload 中提取可展示的助理列表。
* 方案 A：只消费 tool 自带字段，头像由 UI 层用首字母兜底。
*/
function extractExpertList(payload) {
	return (Array.isArray(payload?.experts) ? payload.experts : Array.isArray(payload?.specialists) ? payload.specialists : []).map((item) => ({
		expertId: getExpertId(item),
		name: getExpertName(item) || "未命名助理",
		description: getStringValue(item.description) || getStringValue(item.model)
	}));
}
var EXPERT_TOOL_NAMES, STOP_SESSION_ACTIONS;
var init_specialist_tools_view_data = __esmMin((() => {
	EXPERT_TOOL_NAMES = new Set([
		"list_experts",
		"list_environments",
		"session",
		"list_specialists",
		"list_specialist_sessions",
		"create_specialist_session"
	]);
	STOP_SESSION_ACTIONS = new Set([
		"stop",
		"cancel",
		"terminate"
	]);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/specialist-tools/specialist-tools-renderer.tsx
/**
* 会话工具标题：用 expert_id 匹配 agent 目录，命中则在标题里插入「头像 + 助理名 + 的」。
* 未命中或无 expert_id 时回退纯文案（不猜助理）。
*/
function buildAssistantTitle(directory, expertId, verb, suffix, plainFallback) {
	const agent = expertId ? directory.get(expertId) : void 0;
	const agentName = agent ? getAgentName(agent) : void 0;
	if (!agentName) return plainFallback;
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("span", {
		className: "specialist-tools-renderer__title-assistant",
		children: [
			verb,
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Avatar, {
				className: "specialist-tools-renderer__title-avatar",
				size: 18,
				src: agent?.avatar,
				children: agentName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
				className: "specialist-tools-renderer__title-name",
				children: agentName
			}),
			suffix
		]
	});
}
function ExpertToolContent({ tool }) {
	const payload = getResultPayload$2(tool);
	const payloadError = getPayloadError(payload);
	const failed = tool.status === "failed" || Boolean(payloadError);
	const running = !failed && isRunningStatus$2(tool.status);
	const directory = useSpecialistAgentDirectory();
	if (tool.name === "list_experts" || tool.name === "list_specialists") {
		const experts = extractExpertList(payload);
		if (running || failed || experts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertCard, {
			title: running ? "正在查询可用助理" : failed ? "查询可用助理失败" : "已查询可用助理",
			dot: failed ? "failed" : running ? "running" : "success",
			summary: running ? "正在获取在线助理" : failed ? payloadError : "没有可用助理"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertsListCard, { experts });
	}
	if (tool.name === "list_environments") {
		const environments = Array.isArray(payload?.environments) ? payload?.environments : [];
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertCard, {
			title: running ? "正在查询可用环境" : failed ? "查询可用环境失败" : "已查询可用环境",
			dot: failed ? "failed" : running ? "running" : "success",
			summary: running ? "正在获取助理运行环境" : failed ? payloadError : `共 ${environments.length} 个可用环境`,
			children: !failed && environments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "specialist-tools-renderer__list",
				children: environments.slice(0, 6).map((item, index) => {
					const environmentId = getEnvironmentId(item);
					return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "specialist-tools-renderer__item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
							className: "specialist-tools-renderer__item-main",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
								className: "specialist-tools-renderer__item-title",
								children: item.name || environmentId || "未命名环境"
							}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
								className: "specialist-tools-renderer__item-subtitle",
								children: environmentId || item.runtime
							})]
						}), item.status && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "specialist-tools-renderer__badge",
							children: item.status
						})]
					}, environmentId || index);
				})
			}) : !running && !failed && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "specialist-tools-renderer__empty",
				children: "没有可用环境"
			})
		});
	}
	const action = getSessionToolAction(tool);
	if (action === "list") {
		const sessions = Array.isArray(payload?.sessions) ? payload?.sessions : [];
		const instanceId = payload?.expert_instance_id || payload?.specialistInstanceId || tool.args?.expert_instance_id || tool.args?.specialistInstanceId || tool.args?.specialist_instance_id;
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertCard, {
			title: buildAssistantTitle(directory, getSessionToolArg(tool, "expert_id", "expertId"), running ? "正在查询" : failed ? "查询" : "已查询", failed ? " 的助理会话失败" : " 的助理会话", running ? "正在查询助理会话" : failed ? "查询助理会话失败" : "已查询助理会话"),
			dot: failed ? "failed" : running ? "running" : "success",
			summary: running ? `实例 ${instanceId || ""} 会话查询中` : failed ? payloadError : `共 ${sessions.length} 个会话`,
			children: !failed && sessions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "specialist-tools-renderer__list",
				children: sessions.slice(0, 6).map((item, index) => {
					const sessionId = getSessionId(item);
					const sessionName = getStringValue(item.session_name) || getStringValue(item.sessionName);
					const sessionStatus = item.status || item.sessionStatus;
					return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "specialist-tools-renderer__item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
							className: "specialist-tools-renderer__session-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
								className: "specialist-tools-renderer__session-name",
								children: sessionName || "未命名会话"
							}), sessionId && /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("span", {
								className: "specialist-tools-renderer__session-id",
								children: ["会话id ", sessionId]
							})]
						}), sessionStatus && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "specialist-tools-renderer__badge",
							children: sessionStatus
						})]
					}, sessionId || index);
				})
			}) : !running && !failed && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "specialist-tools-renderer__empty",
				children: "没有历史会话"
			})
		});
	}
	if (action === "get") {
		const sessionId = getSessionId(payload) || getSessionToolSessionId(tool);
		const sessionName = getStringValue(payload?.session_name) || getStringValue(payload?.sessionName);
		const sessionStatus = getStringValue(payload?.status);
		const lastError = getStringValue(payload?.last_error);
		const lastActivity = getStringValue(payload?.last_activity_at);
		const getFailed = failed || Boolean(lastError);
		const summaryParts = [];
		if (getFailed) {
			if (lastError) summaryParts.push(lastError);
			else if (payloadError) summaryParts.push(payloadError);
		} else {
			if (sessionName) summaryParts.push(sessionName);
			if (sessionStatus) summaryParts.push(sessionStatus);
			if (summaryParts.length === 0 && sessionId) summaryParts.push(`会话 ${sessionId}`);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertCard, {
			title: running ? "正在查询助理会话状态" : getFailed ? "查询助理会话状态失败" : "已查询助理会话状态",
			dot: getFailed ? "failed" : running ? "running" : "success",
			summary: summaryParts.length > 0 ? summaryParts.join(" · ") : void 0,
			children: !getFailed && !running && (sessionId || sessionName) ? /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "specialist-tools-renderer__list",
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "specialist-tools-renderer__item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "specialist-tools-renderer__item-main",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "specialist-tools-renderer__item-title",
							children: sessionName || "未命名会话"
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "specialist-tools-renderer__item-subtitle",
							children: [sessionId, lastActivity && `最近活跃 ${lastActivity}`].filter(Boolean).join(" · ")
						})]
					}), sessionStatus && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
						className: "specialist-tools-renderer__badge",
						children: sessionStatus
					})]
				})
			}) : null
		});
	}
	if (action && STOP_SESSION_ACTIONS.has(action)) {
		const sessionId = getSessionId(payload) || getSessionToolSessionId(tool);
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertCard, {
			title: running ? "正在停止助理会话" : failed ? "停止助理会话失败" : "已停止助理会话",
			dot: failed ? "failed" : running ? "running" : "success",
			summary: failed ? payloadError : sessionId ? `会话 ${sessionId}` : void 0
		});
	}
	const sessionName = getStringValue(tool.args?.session_name) || getStringValue(tool.args?.sessionName);
	const sessionId = getSessionId(payload);
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertCard, {
		title: running ? "正在创建助理会话" : failed ? "创建助理会话失败" : sessionName ? `已创建助理会话：${sessionName}` : "已创建助理会话",
		dot: failed ? "failed" : running ? "running" : "success",
		summary: failed ? payloadError : sessionId ? `会话 ${sessionId}` : void 0
	});
}
function ExpertCard({ title, dot, summary, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
		className: "assistant-message-tools",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
			className: "assistant-message-tool-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "assistant-message-tool specialist-tools-renderer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "specialist-tools-renderer__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: `specialist-tools-renderer__dot specialist-tools-renderer__dot--${dot}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: title })]
					}),
					summary && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "specialist-tools-renderer__summary",
						children: summary
					}),
					children
				]
			})
		})
	});
}
var import_jsx_runtime$17, SpecialistToolsRenderer;
var init_specialist_tools_renderer = __esmMin((() => {
	init_specialist_tools_renderer$1();
	require_react();
	init_foundation();
	init_assistant_profile_detail_utils();
	init_tool_protocol();
	init_use_specialist_agent_directory();
	init_experts_list_card();
	init_specialist_tools_view_data();
	import_jsx_runtime$17 = require_jsx_runtime();
	SpecialistToolsRenderer = class {
		constructor() {
			this.className = "specialist-tools-renderer";
			this.theme = "border";
		}
		canHandle(tool) {
			return isExpertTool(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool) {
			if (!isExpertTool(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ExpertToolContent, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/specialist-tools/index.ts
var init_specialist_tools = __esmMin((() => {
	init_specialist_tools_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/task/task-renderer.scss
var init_task_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/task/task-renderer.tsx
/**
* 检查是否为 Task 工具调用
*/
function isTaskToolCall(tool) {
	return tool.name === "task" || tool.name === "Task";
}
var import_react$16, import_jsx_runtime$16, TaskToolAdapter, TaskRendererWithContext, TaskRenderer;
var init_task_renderer = __esmMin((() => {
	init_task_renderer$1();
	init_src();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$16 = require_jsx_runtime();
	TaskToolAdapter = class {
		constructor(tool) {
			if (!isTaskToolCall(tool)) throw new Error(`Invalid tool type for TaskToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 转换为 TaskToolData 格式
		*/
		toTaskToolData() {
			const args = this.tool.args;
			const toolResult = this.tool.result?.result;
			if (!args) return null;
			return {
				description: args.description || "",
				subagentName: args.subagent_name || "",
				prompt: args.prompt || "",
				toolInfo: toolResult?.toolInfo,
				finalResult: toolResult?.finalResult,
				startCallTool: toolResult?.startCallTool,
				toolCallBrief: toolResult?.toolCallBrief
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	TaskRendererWithContext = ({ tool, context }) => {
		const adapter = context?.adapter;
		const sessionId = context?.sessionId;
		const disableCreditsConsumed = context?.disableCreditsConsumed;
		const [localToolStatus, setLocalToolStatus] = import_react$16.useState(tool.status);
		import_react$16.useEffect(() => {
			setLocalToolStatus(tool.status);
		}, [tool.status]);
		const markdownRenderer = (0, import_react$16.useMemo)(() => (content) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(MarkdownRenderer, { children: content }), []);
		const isCompact = context?.compact ?? false;
		return (0, import_react$16.useMemo)(() => createTaskToolRenderer({
			compact: isCompact,
			converter: (t) => {
				return new TaskToolAdapter(t).toTaskToolData();
			},
			onApprove: async (index, toolCallId, t) => {
				try {
					const actualSessionId = sessionId || t.id;
					if (adapter && actualSessionId && toolCallId) {
						const permissionRequestId = (new TaskToolAdapter(t).toTaskToolData()?.toolInfo?.[index])?.permissionRequestId || toolCallId;
						const approveResult = await adapter.toolCallback(actualSessionId, toolCallId, t.name, "approve");
						if (!approveResult.success) console.error("[TaskRenderer] Approve toolCallback failed:", approveResult.error);
						await adapter.respondToPermission(actualSessionId, permissionRequestId, [{
							optionId: "approve",
							name: "批准",
							kind: "allow_once"
						}]);
						if (approveResult.success) {
							tool.status = "full_executing";
							setLocalToolStatus("full_executing");
						}
					} else console.warn("[TaskRenderer] Missing adapter/sessionId/toolCallId for approve action", {
						adapter,
						sessionId: actualSessionId,
						toolCallId
					});
				} catch (err) {
					console.error("[TaskRenderer] Approve action failed", err);
				}
			},
			onReject: async (index, toolCallId, t) => {
				try {
					const actualSessionId = sessionId || t.id;
					if (adapter && actualSessionId && toolCallId) {
						const permissionRequestId = (new TaskToolAdapter(t).toTaskToolData()?.toolInfo?.[index])?.permissionRequestId || toolCallId;
						await adapter.respondToPermission(actualSessionId, permissionRequestId, [{
							optionId: "reject",
							name: "拒绝",
							kind: "reject_once"
						}]);
						tool.status = "cancelled";
						setLocalToolStatus("cancelled");
					} else console.warn("[TaskRenderer] Missing adapter/sessionId/toolCallId for reject action", {
						adapter,
						sessionId: actualSessionId,
						toolCallId
					});
				} catch (err) {
					console.error("[TaskRenderer] Reject action failed", err);
				}
			},
			markdownRenderer,
			disableCreditsConsumed,
			...toolIconRenderConfig
		}), [
			isCompact,
			adapter,
			sessionId,
			tool,
			markdownRenderer,
			disableCreditsConsumed
		])({
			content: {
				type: "tool",
				tool: (0, import_react$16.useMemo)(() => ({
					...tool,
					status: localToolStatus
				}), [tool, localToolStatus])
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	TaskRenderer = class {
		constructor(config) {
			this.className = "task";
			this.clickHeader = false;
			this.theme = "border";
		}
		canHandle(tool) {
			return isTaskToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, config, context) {
			if (!isTaskToolCall(tool)) {
				console.warn("[TaskRenderer] Invalid tool type:", tool.name, "- expected: task or Task");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(TaskRendererWithContext, {
					tool,
					context
				});
			} catch (error) {
				console.error("[TaskRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
					className: "task-renderer-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/task/index.ts
var init_task = __esmMin((() => {
	init_task_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-create/team-create-renderer.scss
var init_team_create_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-create/team-create-utils.ts
function isRecord$1(value) {
	return typeof value === "object" && value !== null;
}
function safeJsonParse$1(value) {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
function normalizeToolName$1(name) {
	return String(name || "").trim().toLowerCase().replace(/-/g, "_");
}
function isDefaultTeamCreateNextStep(nextStep) {
	return DEFAULT_TEAM_CREATE_NEXT_STEP_PATTERN.test(String(nextStep || "").trim());
}
function isTeamCreateToolName(name) {
	const normalizedToolName = normalizeToolName$1(name);
	return normalizedToolName === "team_create" || normalizedToolName === "teamcreate";
}
function isTeamCreateToolCall(tool) {
	return isTeamCreateToolName(tool.name);
}
function getNestedArgs$1(tool) {
	const args = isRecord$1(tool.args) ? tool.args : {};
	if (isRecord$1(args.arguments)) return {
		...args,
		...args.arguments
	};
	return args;
}
function collectStructuredInfo$1(value, state, depth = 0) {
	if (depth > 8 || value === void 0 || value === null) return;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return;
		const parsed = safeJsonParse$1(trimmed);
		if (parsed !== void 0) {
			collectStructuredInfo$1(parsed, state, depth + 1);
			return;
		}
		trimmed.split("\n").forEach((rawLine) => {
			const line = rawLine.trim();
			if (!line) return;
			const descriptionMatch = line.match(/^Description:\s*(.+)$/i);
			if (descriptionMatch?.[1]?.trim()) {
				if (!state.description) state.description = descriptionMatch[1].trim();
				return;
			}
			const leadMatch = line.match(/^Lead:\s*(.+)$/i);
			if (leadMatch?.[1]?.trim()) {
				if (!state.lead) state.lead = leadMatch[1].trim();
				return;
			}
			const successMatch = line.match(/^Team\s+"([^"]+)"\s+created\.$/i);
			if (successMatch?.[1]?.trim()) {
				if (!state.teamName) state.teamName = successMatch[1].trim();
				return;
			}
			if (isDefaultTeamCreateNextStep(line)) {
				if (!state.nextStep) state.nextStep = line;
				return;
			}
			if (!state.seenMessages.has(line)) {
				state.seenMessages.add(line);
				state.messages.push(line);
			}
		});
		return;
	}
	if (Array.isArray(value)) {
		value.forEach((item) => collectStructuredInfo$1(item, state, depth + 1));
		return;
	}
	if (!isRecord$1(value)) return;
	const candidateTeamName = value.teamName ?? value.team_name;
	if (!state.teamName && typeof candidateTeamName === "string" && candidateTeamName.trim()) state.teamName = candidateTeamName.trim();
	if (!state.description && typeof value.description === "string" && value.description.trim()) state.description = value.description.trim();
	const candidateLead = value.lead ?? value.owner ?? value.teamLead ?? value.team_lead;
	if (!state.lead && typeof candidateLead === "string" && candidateLead.trim()) state.lead = candidateLead.trim();
	const candidateNextStep = value.nextStep ?? value.next_step ?? value.instructions ?? value.instruction;
	if (!state.nextStep && typeof candidateNextStep === "string" && candidateNextStep.trim()) state.nextStep = candidateNextStep.trim();
	collectStructuredInfo$1(value.value, state, depth + 1);
	collectStructuredInfo$1(value.result, state, depth + 1);
	collectStructuredInfo$1(value.data, state, depth + 1);
	collectStructuredInfo$1(value.content, state, depth + 1);
	collectStructuredInfo$1(value.message, state, depth + 1);
	collectStructuredInfo$1(value.error, state, depth + 1);
	collectStructuredInfo$1(value.text, state, depth + 1);
}
function inferTeamNameFromMessage(message) {
	if (!message) return;
	const match = message.match(/team\s+"([^"]+)"/i);
	if (match?.[1]?.trim()) return match[1].trim();
}
function scoreMessage$1(message) {
	const normalized = message.toLowerCase();
	if (normalized.includes("failed to create team") || normalized.includes("already in team") || normalized.includes("already exists")) return 1e3 + message.length;
	if (normalized.includes("team \"") && normalized.includes(" created")) return 900 + message.length;
	if (message.includes("\n")) return 500 + message.length;
	return 100 + message.length;
}
function pickPrimaryMessage$1(messages, teamName, description) {
	const filtered = messages.filter((message) => {
		const normalizedMessage = message.trim();
		if (!normalizedMessage) return false;
		if (teamName && normalizedMessage === teamName.trim()) return false;
		if (description && normalizedMessage === description.trim()) return false;
		return true;
	});
	if (filtered.length === 0) return;
	return filtered.slice().sort((a, b) => scoreMessage$1(b) - scoreMessage$1(a))[0];
}
function inferLead(teamName, lead) {
	if (lead?.trim()) return lead.trim();
	if (!teamName?.trim()) return;
	return `team-lead@${teamName.trim()}`;
}
function inferOutcome$1(tool, message) {
	if ([
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(String(tool.status || ""))) return "running";
	if ([
		"failed",
		"cancelled",
		"destroyed"
	].includes(String(tool.status || ""))) return "error";
	if (message && /(failed to create team|already in team|already exists)/i.test(message)) return "error";
	return "success";
}
function extractTeamCreateViewData(tool) {
	const args = getNestedArgs$1(tool);
	const state = {
		teamName: typeof args.team_name === "string" ? args.team_name.trim() : void 0,
		description: typeof args.description === "string" ? args.description.trim() : void 0,
		lead: void 0,
		nextStep: void 0,
		messages: [],
		seenMessages: /* @__PURE__ */ new Set()
	};
	collectStructuredInfo$1(tool.result?.result, state);
	collectStructuredInfo$1(tool.result, state);
	const message = pickPrimaryMessage$1(state.messages, state.teamName, state.description);
	const inferredTeamName = inferTeamNameFromMessage(message);
	const teamName = state.teamName || inferredTeamName;
	const outcome = inferOutcome$1(tool, message);
	const lead = state.lead?.trim() ? state.lead.trim() : outcome === "success" ? inferLead(teamName, state.lead) : void 0;
	return {
		teamName,
		description: state.description,
		lead,
		nextStep: state.nextStep,
		message,
		outcome
	};
}
var DEFAULT_TEAM_CREATE_NEXT_STEP_PATTERN;
var init_team_create_utils = __esmMin((() => {
	DEFAULT_TEAM_CREATE_NEXT_STEP_PATTERN = /^Spawn teammates with the Agent tool using\s+`name`\s+and\s+`team_name`\s+parameters\.?$/i;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-create/team-create-renderer.tsx
function getStatusLabel$1(t, outcome) {
	switch (outcome) {
		case "running": return t("tool.teamCreate.status.running");
		case "error": return t("tool.teamCreate.status.failed");
		default: return t("tool.teamCreate.status.success");
	}
}
function getStatusIcon$1(outcome) {
	switch (outcome) {
		case "running": return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(LoaderCircle, {
			size: 12,
			className: "team-create-card__status-icon team-create-card__status-icon--spinning"
		});
		case "error": return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(CircleAlert, {
			size: 12,
			className: "team-create-card__status-icon"
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(CircleCheck, {
			size: 12,
			className: "team-create-card__status-icon"
		});
	}
}
function TeamCreateRendererContent(props) {
	const { tool } = props;
	const t = useTranslation();
	const viewData = (0, import_react$15.useMemo)(() => extractTeamCreateViewData(tool), [tool]);
	const [expanded, setExpanded] = import_react$15.useState(false);
	import_react$15.useEffect(() => {
		setExpanded(false);
	}, [tool.id]);
	const teamName = viewData.teamName || t("tool.teamCreate.unknownTeam");
	const descriptionText = viewData.description?.trim();
	const leadText = viewData.lead?.trim();
	const secondaryText = viewData.outcome === "error" ? viewData.message || t("tool.teamCreate.message.failed") : descriptionText || t("tool.teamCreate.message.success");
	const detailRows = [{
		key: "teamName",
		label: t("tool.teamCreate.teamName"),
		value: teamName
	}, leadText ? {
		key: "lead",
		label: t("tool.teamCreate.lead"),
		value: leadText
	} : null].filter((row) => Boolean(row));
	const hasDetail = detailRows.length > 0 || Boolean(descriptionText);
	return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
		className: "team-create-card-wrapper",
		children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
			className: (0, import_classnames$3.default)("team-create-card", {
				"team-create-card--running": viewData.outcome === "running",
				"team-create-card--error": viewData.outcome === "error",
				"team-create-card--expanded": expanded,
				"team-create-card--clickable": hasDetail
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "team-create-card__header",
				onClick: hasDetail ? () => {
					const sel = window.getSelection();
					if (sel) sel.removeAllRanges();
					setExpanded((prev) => !prev);
				} : void 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "team-create-card__icon-area",
						children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Users, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
						className: "team-create-card__body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
							className: "team-create-card__title-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
								className: "team-create-card__label",
								children: t("tool.teamCreate")
							}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
								className: "team-create-card__name",
								children: teamName
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "team-create-card__subtitle",
							title: secondaryText,
							children: secondaryText
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
						className: (0, import_classnames$3.default)("team-create-card__status", `team-create-card__status--${viewData.outcome}`),
						children: [getStatusIcon$1(viewData.outcome), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
							className: "team-create-card__status-text",
							children: getStatusLabel$1(t, viewData.outcome)
						})]
					}),
					hasDetail ? /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "team-create-card__chevron",
						children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(ChevronUp, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(ChevronDown, { size: 14 })
					}) : null
				]
			}), hasDetail && expanded ? /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "team-create-card__detail",
				children: [
					detailRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("section", {
						className: "team-create-card__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "team-create-card__section-title",
							children: t("tool.shared.basicInfo")
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "team-create-card__kv-list",
							children: detailRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
								className: "team-create-card__kv-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("span", {
									className: "team-create-card__kv-label",
									children: [row.label, "："]
								}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
									className: "team-create-card__kv-value",
									children: row.value
								})]
							}, row.key))
						})]
					}) : null,
					descriptionText ? /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("section", {
						className: "team-create-card__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "team-create-card__section-title",
							children: t("tool.teamCreate.description")
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "team-create-card__section-body",
							children: descriptionText
						})]
					}) : null,
					viewData.outcome === "error" && viewData.message ? /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("section", {
						className: "team-create-card__section team-create-card__section--error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "team-create-card__section-title",
							children: t("tool.teamCreate.result")
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
							className: "team-create-card__section-body",
							children: viewData.message
						})]
					}) : null
				]
			}) : null]
		})
	});
}
var import_classnames$3, import_react$15, import_jsx_runtime$15, TeamCreateRenderer;
var init_team_create_renderer = __esmMin((() => {
	init_team_create_renderer$1();
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
	init_lucide_react();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_protocol();
	init_team_create_utils();
	import_jsx_runtime$15 = require_jsx_runtime();
	TeamCreateRenderer = class {
		constructor() {
			this.className = "team-create";
			this.theme = "none";
		}
		canHandle(tool) {
			return isTeamCreateToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			if (!isTeamCreateToolCall(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(TeamCreateRendererContent, {
				tool,
				context
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-create/index.ts
var init_team_create = __esmMin((() => {
	init_team_create_renderer();
	init_team_create_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-delete/team-delete-renderer.scss
var init_team_delete_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/structured-detail.scss
var init_structured_detail$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/shared/structured-detail.tsx
var import_classnames$2, import_react$14, import_jsx_runtime$14, StructuredDetailTable, StructuredDetailBlock;
var init_structured_detail = __esmMin((() => {
	init_structured_detail$1();
	import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$14 = require_jsx_runtime();
	StructuredDetailTable = ({ title, rows, className }) => {
		if (rows.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: (0, import_classnames$2.default)("tool-structured-detail", className),
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "tool-structured-detail__panel",
				children: [title ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
					className: "tool-structured-detail__panel-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
						className: "tool-structured-detail__section-title",
						children: title
					})
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
					className: "tool-structured-detail__table",
					children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
						className: (0, import_classnames$2.default)("tool-structured-detail__row", { "tool-structured-detail__row--last": index === rows.length - 1 }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
							className: "tool-structured-detail__label",
							children: row.label
						}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
							className: "tool-structured-detail__value",
							children: row.value
						})]
					}, row.key || `${row.label}-${index}`))
				})]
			})
		});
	};
	StructuredDetailBlock = ({ title, children, className, preserveWhitespace = false, tone = "default", collapsible = false, defaultCollapsed = false }) => {
		const t = useTranslation();
		const [collapsed, setCollapsed] = (0, import_react$14.useState)(collapsible && defaultCollapsed);
		(0, import_react$14.useEffect)(() => {
			setCollapsed(collapsible && defaultCollapsed);
		}, [
			collapsible,
			defaultCollapsed,
			title,
			children
		]);
		if (!children) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: (0, import_classnames$2.default)("tool-structured-detail", className),
			children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
				className: "tool-structured-detail__panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: (0, import_classnames$2.default)("tool-structured-detail__panel-header", { "tool-structured-detail__panel-header--clickable": collapsible }),
					onClick: collapsible ? () => setCollapsed((prev) => !prev) : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
						className: "tool-structured-detail__section-title",
						children: title
					}), collapsible ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("button", {
						type: "button",
						className: "tool-structured-detail__toggle",
						onClick: (event) => {
							event.stopPropagation();
							setCollapsed((prev) => !prev);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { children: collapsed ? t("common.showMore") : t("common.showLess") }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("svg", {
							className: (0, import_classnames$2.default)("tool-structured-detail__toggle-icon", { "tool-structured-detail__toggle-icon--collapsed": collapsed }),
							width: "12",
							height: "12",
							viewBox: "0 0 12 12",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("path", {
								d: "M3 4.5L6 7.5L9 4.5",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					}) : null]
				}), !collapsed ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
					className: (0, import_classnames$2.default)("tool-structured-detail__block", { [`tool-structured-detail__block--${tone}`]: tone !== "default" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
						className: (0, import_classnames$2.default)("tool-structured-detail__block-body", { "tool-structured-detail__block-body--prewrap": preserveWhitespace }),
						children
					})
				}) : null]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-delete/team-delete-utils.ts
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
function safeJsonParse(value) {
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
function normalizeToolName(name) {
	return String(name || "").trim().toLowerCase().replace(/-/g, "_");
}
function isTeamDeleteToolName(name) {
	const normalizedToolName = normalizeToolName(name);
	return normalizedToolName === "team_delete" || normalizedToolName === "teamdelete";
}
function isTeamDeleteToolCall(tool) {
	return isTeamDeleteToolName(tool.name);
}
function getNestedArgs(tool) {
	const args = isRecord(tool.args) ? tool.args : {};
	if (isRecord(args.arguments)) return {
		...args,
		...args.arguments
	};
	return args;
}
function addMessageLine(line, state) {
	const trimmed = line.trim();
	if (!trimmed || state.seenMessages.has(trimmed)) return;
	state.seenMessages.add(trimmed);
	state.messages.push(trimmed);
}
function collectStructuredInfo(value, state, depth = 0) {
	if (depth > 8 || value === void 0 || value === null) return;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return;
		const parsed = safeJsonParse(trimmed);
		if (parsed !== void 0) {
			collectStructuredInfo(parsed, state, depth + 1);
			return;
		}
		trimmed.split("\n").forEach((rawLine) => {
			const line = rawLine.trim();
			if (!line) return;
			const removedMatch = line.match(/^Removed:\s*(.+)$/i);
			if (removedMatch?.[1]?.trim()) {
				const removedPath = removedMatch[1].trim();
				if (!state.seenRemovedPaths.has(removedPath)) {
					state.seenRemovedPaths.add(removedPath);
					state.removedPaths.push(removedPath);
				}
				return;
			}
			addMessageLine(line, state);
		});
		return;
	}
	if (Array.isArray(value)) {
		value.forEach((item) => collectStructuredInfo(item, state, depth + 1));
		return;
	}
	if (!isRecord(value)) return;
	const candidateTeamName = value.teamName ?? value.team_name;
	if (!state.teamName && typeof candidateTeamName === "string" && candidateTeamName.trim()) state.teamName = candidateTeamName.trim();
	collectStructuredInfo(value.value, state, depth + 1);
	collectStructuredInfo(value.result, state, depth + 1);
	collectStructuredInfo(value.data, state, depth + 1);
	collectStructuredInfo(value.content, state, depth + 1);
	collectStructuredInfo(value.message, state, depth + 1);
	collectStructuredInfo(value.error, state, depth + 1);
	collectStructuredInfo(value.text, state, depth + 1);
}
function inferTeamName(message) {
	if (!message) return;
	const quotedMatch = message.match(/team\s+"([^"]+)"/i);
	if (quotedMatch?.[1]?.trim()) return quotedMatch[1].trim();
}
function scoreMessage(message) {
	const normalized = message.toLowerCase();
	if (normalized.includes("cannot delete team")) return 1e3 + message.length;
	if (normalized.includes("failed to delete team")) return 950 + message.length;
	if (normalized.includes("deleted successfully")) return 900 + message.length;
	if (normalized.includes("nothing to delete")) return 800 + message.length;
	return 100 + message.length;
}
function pickPrimaryMessage(messages) {
	if (messages.length === 0) return;
	return messages.slice().sort((a, b) => scoreMessage(b) - scoreMessage(a))[0];
}
function inferOutcome(tool, message) {
	const status = String(tool.status || "");
	if ([
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(status)) return "running";
	if ([
		"failed",
		"cancelled",
		"destroyed"
	].includes(status)) return "error";
	if (message && /(cannot delete team|failed to delete team|active member)/i.test(message)) return "error";
	return "success";
}
function extractTeamDeleteViewData(tool) {
	const args = getNestedArgs(tool);
	const state = {
		teamName: typeof args.team_name === "string" ? args.team_name.trim() : void 0,
		messages: [],
		removedPaths: [],
		seenMessages: /* @__PURE__ */ new Set(),
		seenRemovedPaths: /* @__PURE__ */ new Set()
	};
	collectStructuredInfo(tool.result?.result, state);
	collectStructuredInfo(tool.result, state);
	const message = pickPrimaryMessage(state.messages);
	const teamName = state.teamName || inferTeamName(message);
	const outcome = inferOutcome(tool, message);
	return {
		teamName,
		message,
		removedPaths: state.removedPaths,
		outcome
	};
}
var init_team_delete_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-delete/team-delete-renderer.tsx
function getStatusLabel(t, outcome) {
	switch (outcome) {
		case "running": return t("tool.teamDelete.status.running");
		case "error": return t("tool.teamDelete.status.failed");
		default: return t("tool.teamDelete.status.success");
	}
}
function getStatusIcon(outcome) {
	switch (outcome) {
		case "running": return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(LoaderCircle, {
			size: 14,
			className: "team-delete-tool__status-icon tool-call-hierarchy__status-icon team-delete-tool__status-icon--spinning"
		});
		case "error": return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(CircleAlert, {
			size: 14,
			className: "team-delete-tool__status-icon tool-call-hierarchy__status-icon"
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(CircleCheck, {
			size: 14,
			className: "team-delete-tool__status-icon tool-call-hierarchy__status-icon"
		});
	}
}
function TeamDeleteRendererContent(props) {
	const { tool } = props;
	const t = useTranslation();
	const viewData = (0, import_react$13.useMemo)(() => extractTeamDeleteViewData(tool), [tool]);
	const [detailVisible, setDetailVisible] = import_react$13.useState(false);
	import_react$13.useEffect(() => {
		setDetailVisible(false);
	}, [tool.id]);
	const fallbackMessage = viewData.outcome === "running" ? t("tool.teamDelete.message.running") : viewData.outcome === "error" ? t("tool.teamDelete.message.failed") : t("tool.teamDelete.message.success");
	const teamName = viewData.teamName || t("tool.teamDelete.unknownTeam");
	const detailText = viewData.message || fallbackMessage;
	const secondaryText = viewData.removedPaths.length > 0 ? t("tool.teamDelete.removedPathsSummary", { count: viewData.removedPaths.length }) : detailText;
	const structuredRows = [{
		key: "teamName",
		label: t("tool.teamDelete.teamName"),
		value: teamName
	}];
	const shouldShowResult = viewData.outcome !== "success" || viewData.removedPaths.length === 0;
	const hasDetail = Boolean(structuredRows.length > 0 || detailText || viewData.removedPaths.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
		className: "assistant-message-tools",
		children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			className: "assistant-message-tool-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
				className: "assistant-message-tool team-delete",
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
					className: (0, import_classnames$1.default)("tool-inner", "tool-call-hierarchy__secondary-card", { "tool-visual-pending": viewData.outcome === "running" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: (0, import_classnames$1.default)("card-header", { "click-header": hasDetail }),
						onClick: hasDetail ? () => setDetailVisible((prev) => !prev) : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
							className: "card-header-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
								className: "left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
									className: "tool-icon team-delete-tool__icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Trash2, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
									className: "title-wrapper team-delete-tool__title-wrapper tool-call-hierarchy__title-wrapper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
										className: "team-delete-tool__primary-line tool-call-hierarchy__primary-line",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
											className: "tool-name tool-call-hierarchy__eyebrow",
											children: t("tool.teamDelete")
										}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
											className: "team-delete-tool__headline tool-call-hierarchy__headline",
											title: teamName,
											children: teamName
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
										className: "team-delete-tool__subline tool-call-hierarchy__subline",
										title: secondaryText,
										children: secondaryText
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
								className: "right",
								children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
									className: (0, import_classnames$1.default)("control", "team-delete-tool__control", "tool-call-hierarchy__status", "tool-call-hierarchy__status-card", `tool-call-hierarchy__status-card--${viewData.outcome}`, `team-delete-tool__control--${viewData.outcome}`),
									children: [getStatusIcon(viewData.outcome), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
										className: "tool-call-hierarchy__status-text",
										children: getStatusLabel(t, viewData.outcome)
									})]
								})
							})]
						})
					}), hasDetail ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: (0, import_classnames$1.default)("card-content", "team-delete-tool__content", "tool-call-hierarchy__content", { hidden: !detailVisible }),
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
							className: "team-delete-tool__detail-stack tool-call-hierarchy__detail-stack",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(StructuredDetailTable, {
									title: t("tool.shared.basicInfo"),
									rows: structuredRows
								}),
								viewData.removedPaths.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(StructuredDetailBlock, {
									title: t("tool.teamDelete.removedPaths"),
									children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("ul", {
										className: "team-delete-tool__detail-list",
										children: viewData.removedPaths.map((path) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("li", {
											className: "team-delete-tool__detail-list-item",
											children: path
										}, path))
									})
								}) : null,
								shouldShowResult ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(StructuredDetailBlock, {
									title: t("tool.teamDelete.result"),
									preserveWhitespace: true,
									tone: viewData.outcome === "error" ? "error" : "default",
									children: detailText
								}) : null
							]
						})
					}) : null]
				})
			})
		})
	});
}
var import_classnames$1, import_react$13, import_jsx_runtime$13, TeamDeleteRenderer;
var init_team_delete_renderer = __esmMin((() => {
	init_team_delete_renderer$1();
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
	init_lucide_react();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_protocol();
	init_structured_detail();
	init_team_delete_utils();
	import_jsx_runtime$13 = require_jsx_runtime();
	TeamDeleteRenderer = class {
		constructor() {
			this.className = "team-delete";
			this.theme = "border";
		}
		canHandle(tool) {
			return isTeamDeleteToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			if (!isTeamDeleteToolCall(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(TeamDeleteRendererContent, {
				tool,
				context
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/team-delete/index.ts
var init_team_delete = __esmMin((() => {
	init_team_delete_renderer();
	init_team_delete_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/unknown-tool/unknown-tool-renderer.less
var init_unknown_tool_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/unknown-tool/unknown-tool-renderer.tsx
var import_classnames, import_react$12, import_jsx_runtime$12, toolNameI18nMap, formatToolName, createRenderTitle, createRenderControl, UnknownToolRendererContent, UnknownToolRenderer;
var init_unknown_tool_renderer = __esmMin((() => {
	init_unknown_tool_renderer$1();
	init_src();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$12 = require_jsx_runtime();
	toolNameI18nMap = {
		"preview_url": "tool.previewWeb",
		"list_code_definition_names": "tool.readCodeDefinition",
		"supabase_get_logs": "tool.getSupabaseLogs",
		"supabase_execute_sql": "tool.executeSupabaseSQL",
		"supabase_apply_migration": "tool.supabaseApplyMigration",
		"supabase_list_migration": "tool.supabaseListMigration",
		"supabase_list_tables": "tool.supabaseListTables",
		"upload_file": "tool.uploadFile",
		"team_create": "tool.teamCreate",
		"team_delete": "tool.teamDelete",
		"send_message": "tool.sendMessage"
	};
	formatToolName = (name) => name?.split("_").filter(Boolean).map((s) => s[0].toUpperCase() + s.slice(1)).join("") || "Unknown";
	createRenderTitle = (t) => (data, isExecuting) => {
		const { toolName } = data;
		const i18nKey = toolNameI18nMap[toolName];
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			className: (0, import_classnames.default)("title-wrapper", { "loading-text": isExecuting }),
			children: i18nKey ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", { children: t(i18nKey) }) : /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("span", { children: [t("tool.calledToolPrefix"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
				className: "text-primary",
				children: formatToolName(toolName)
			})] })
		});
	};
	createRenderControl = (t) => (data, tool) => {
		const isExecuting = [
			"idle",
			"pending",
			"parsing",
			"stream_executing",
			"full_executing"
		].includes(tool.status);
		const isFailed = tool.status === "failed" || tool.status === "cancelled";
		const isSkipped = tool.status === "skipped";
		const getStatusText = () => {
			if (isSkipped) return t("tool.status.skipped");
			if (isFailed) return t("tool.status.failed");
			if (isExecuting) return t("tool.status.processing");
			return t("tool.status.success");
		};
		const getStatusIconClass = () => {
			if (tool.status === "executed") return "accept";
			return "reject";
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			className: "status-text-control status-common",
			children: isExecuting ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("span", {
				className: "status-pending",
				children: [getStatusText(), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(LoadingDots, {})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("span", {
				className: "status-executed",
				children: [getStatusText(), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", { className: (0, import_classnames.default)("status-icon", getStatusIconClass()) })]
			})
		});
	};
	UnknownToolRendererContent = ({ tool, config, context }) => {
		const t = useTranslation();
		const isCompact = context?.compact ?? false;
		const mergedConfig = (0, import_react$12.useMemo)(() => ({
			...config,
			compact: isCompact,
			renderTitle: createRenderTitle(t),
			renderControl: createRenderControl(t),
			onPreviewUrlClick: context?.onPreviewUrlClick,
			...toolIconRenderConfig
		}), [
			config,
			t,
			isCompact,
			context?.onPreviewUrlClick
		]);
		return (0, import_react$12.useMemo)(() => createUnknownToolRenderer(mergedConfig), [mergedConfig])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	UnknownToolRenderer = class {
		constructor(config) {
			this.className = "unknown-tool";
			this.theme = "border";
			this.config = config;
		}
		canHandle(tool) {
			return ToolRendererPriority.DEFAULT;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, config, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(UnknownToolRendererContent, {
				tool,
				config: this.config,
				context
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/unknown-tool/index.ts
var init_unknown_tool = __esmMin((() => {
	init_unknown_tool_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/video-gen/video-gen-renderer.tsx
function isVideoGenToolName(name) {
	return name === "video_gen" || name === "VideoGen";
}
function toVideoGenData(tool) {
	const result = tool.result?.result;
	const args = tool.args;
	let status = "generating";
	if (result?.status === "completed" || tool.status === "executed") status = "completed";
	else if (result?.status === "error" || tool.status === "failed") status = "error";
	const videos = Array.isArray(result?.videos) ? result.videos.map((v) => typeof v === "string" ? v : v?.localPath).filter(Boolean) : [];
	const rawError = result?.error || tool.result?.error;
	return {
		prompt: typeof result?.prompt === "string" ? result.prompt : typeof args?.prompt === "string" ? args.prompt : "",
		status,
		videos,
		errorMessage: typeof rawError === "string" ? rawError : void 0
	};
}
var import_react$11, import_jsx_runtime$11, VideoGenRendererContent, VideoGenRenderer;
var init_video_gen_renderer = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_i18n$1();
	init_tool_protocol();
	init_warning_icon();
	import_jsx_runtime$11 = require_jsx_runtime();
	VideoGenRendererContent = ({ tool, context }) => {
		const data = (0, import_react$11.useMemo)(() => toVideoGenData(tool), [tool]);
		const handlePathClick = (path) => {
			try {
				if (context?.adapter) context.adapter.executeCommand?.("vscode.open", path);
			} catch (error) {
				console.error("[VideoGenRenderer] Failed to open file:", error);
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
			className: "video-gen-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "video-gen-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
						className: "video-gen-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
							className: "video-gen-title",
							children: t("tool.approval.videoGenHint")
						}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
							className: `video-gen-status video-gen-status--${data.status}`,
							children: [
								data.status === "generating" && t("tool.approval.videoGenGenerating"),
								data.status === "completed" && t("tool.approval.videoGenCompleted"),
								data.status === "error" && t("tool.approval.videoGenFailed")
							]
						})]
					}),
					data.prompt && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "video-gen-prompt",
						children: data.prompt
					}),
					data.status === "completed" && data.videos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "video-gen-result",
						children: data.videos.map((path, idx) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							className: "video-gen-path",
							onClick: () => handlePathClick(path),
							children: path
						}, idx))
					}),
					data.status === "error" && data.errorMessage && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
						className: "video-gen-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							className: "error-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(WarningIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							className: "error-message",
							children: data.errorMessage
						})]
					})
				]
			})
		});
	};
	VideoGenRenderer = class {
		constructor() {
			this.className = "video-gen";
			this.clickHeader = false;
			this.theme = "";
		}
		canHandle(tool) {
			return isVideoGenToolName(tool.name) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			if (!isVideoGenToolName(tool.name)) {
				console.warn("[VideoGenRenderer] Invalid tool type:", tool.name, "- expected: video_gen / VideoGen");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(VideoGenRendererContent, {
					tool,
					context
				});
			} catch (error) {
				console.error("[VideoGenRenderer] Failed to process tool:", error);
				const errorMessage = error instanceof Error ? error.message : t("common.unknown");
				return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: "video-gen-error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "error-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(WarningIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "error-message",
						children: errorMessage
					})]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/video-gen/index.ts
var init_video_gen = __esmMin((() => {
	init_video_gen_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/visualizer/visualizer-read-me-renderer.scss
var init_visualizer_read_me_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/visualizer/visualizer-read-me-renderer.tsx
function isVisualizerReadMe(tool) {
	return tool.name === "visualize:read_me" || tool.name === "read_me" || tool.name === "visualizer:read_me" || tool.name === "visualizer:read_me_tool";
}
function isRunningStatus$1(status) {
	return [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(status);
}
var import_react$10, import_jsx_runtime$10, DocIcon, ArrowIcon, VisualizerReadMeCompactContent, VisualizerReadMeRenderer;
var init_visualizer_read_me_renderer = __esmMin((() => {
	init_visualizer_read_me_renderer$1();
	init_src();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_tool_protocol();
	import_jsx_runtime$10 = require_jsx_runtime();
	DocIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
		className,
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", {
			d: "M7.7407 13.66Q10.4983 13.66 12.6655 11.7478Q14.8326 9.8356 15.4815 6.83Q15.4809 6.8274 15.4803 6.8247Q15.4798 6.8221 15.4792 6.8194L14.2476 6.8194Q14.2489 6.8247 14.2502 6.83Q13.6517 9.2773 11.8715 10.848Q10.0446 12.46 7.7407 12.46Q5.4369 12.46 3.61 10.848Q1.8298 9.2773 1.2312 6.83Q1.8298 4.3827 3.61 2.812Q5.4369 1.2 7.7407 1.2Q10.0446 1.2 11.8715 2.812Q13.1087 3.9036 13.7751 5.4186L15.0632 5.4186Q14.1228 2.9534 12.1272 1.4767Q10.1316 0 7.7407 0Q4.9832 0 2.816 1.9122Q0.6488 3.8244 0 6.83Q0.6488 9.8356 2.816 11.7478Q4.9832 13.66 7.7407 13.66ZM11.0757 6.8301Q11.0757 5.4487 10.0989 4.4719Q9.1221 3.4951 7.7407 3.4951Q6.3593 3.4951 5.3825 4.4719Q4.4057 5.4487 4.4057 6.8301Q4.4057 8.2115 5.3825 9.1883Q6.3593 10.1651 7.7407 10.1651Q9.1221 10.1651 10.0989 9.1883Q11.0757 8.2115 11.0757 6.8301ZM6.231 5.3204Q6.8564 4.6951 7.7407 4.6951Q8.6251 4.6951 9.2504 5.3204Q9.8757 5.9457 9.8757 6.8301Q9.8757 7.7144 9.2504 8.3398Q8.6251 8.9651 7.7407 8.9651Q6.8564 8.9651 6.231 8.3398Q5.6057 7.9457 5.6057 6.8301Q5.6057 5.9457 6.231 5.3204Z",
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.100567 1.1451)"
		})
	});
	ArrowIcon = ({ className, onClick }) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
		className,
		onClick,
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", {
			d: "M4 6L8 10L12 6",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	VisualizerReadMeCompactContent = ({ tool }) => {
		const [expanded, setExpanded] = (0, import_react$10.useState)(false);
		const isExecuting = isRunningStatus$1(tool.status);
		const isCompleted = tool.status === "executed";
		const resultStr = (0, import_react$10.useMemo)(() => {
			const result = tool.result?.result;
			if (!result) return "";
			if (typeof result === "string") return result;
			return JSON.stringify(result, null, 2);
		}, [tool.result]);
		const hasResult = !!resultStr;
		(0, import_react$10.useEffect)(() => {
			if ([
				"executed",
				"failed",
				"cancelled"
			].includes(tool.status)) setExpanded(false);
		}, [tool.status]);
		const canExpand = isCompleted && hasResult;
		const handleToggle = (e) => {
			e.stopPropagation();
			if (canExpand) {
				const sel = window.getSelection();
				if (sel) sel.removeAllRanges();
				setExpanded(!expanded);
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "visualizer-read-me-compact",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: `visualizer-read-me-compact__header ${canExpand ? "expandable" : ""}`,
				onClick: canExpand ? handleToggle : void 0,
				children: [
					!isExecuting && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(DocIcon, { className: "visualizer-read-me-compact__icon" }),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
						className: `visualizer-read-me-compact__action${isExecuting ? " cb-shining-text" : ""}`,
						children: i18n["tool.visualizer.readMe.title"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
						className: "visualizer-read-me-compact__sub-text",
						children: isExecuting ? i18n["tool.visualizer.readMe.loading"] : i18n["tool.visualizer.readMe.loaded"]
					}),
					canExpand && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ArrowIcon, {
						className: `visualizer-read-me-compact__arrow ${expanded ? "expanded" : ""}`,
						onClick: handleToggle
					})
				]
			}), expanded && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				className: "visualizer-read-me-compact__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "visualizer-read-me-compact__content-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("pre", { children: resultStr })
				})
			})]
		});
	};
	VisualizerReadMeRenderer = class {
		canHandle(tool) {
			return isVisualizerReadMe(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool) {
			if (!isVisualizerReadMe(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(VisualizerReadMeCompactContent, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/visualizer/inline-loading-line.scss
var init_inline_loading_line$1 = __esmMin((() => {})), import_jsx_runtime$9, DefaultSpinner, InlineLoadingLine;
var init_inline_loading_line = __esmMin((() => {
	init_inline_loading_line$1();
	require_react();
	import_jsx_runtime$9 = require_jsx_runtime();
	DefaultSpinner = () => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
		className: "inline-loading-line__spinner",
		"aria-hidden": "true"
	});
	InlineLoadingLine = ({ message, icon }) => {
		if (!message) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "inline-loading-line",
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
				className: "inline-loading-line__icon",
				children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(DefaultSpinner, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
				className: "inline-loading-line__text",
				children: message
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/visualizer/visualizer-show-widget-renderer.tsx
function isVisualizerShowWidget(tool) {
	return tool.name === "visualize:show_widget" || tool.name === "visualizer:show_widget" || tool.name === "show_widget";
}
function isRunningStatus(status) {
	return [
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing"
	].includes(status);
}
function extractToolError(tool) {
	const resultObj = tool.result?.result;
	const outer = tool.result;
	if (!(tool.status === "failed" || outer?.success === false || resultObj?.success === false)) return;
	return [
		resultObj?.error,
		outer?.error,
		outer?.errorMessage,
		resultObj?.errorMessage,
		resultObj?.message,
		outer?.message
	].find((item) => typeof item === "string" && item.trim().length > 0);
}
/**
* 从工具名称中提取显示名称
*/
function getDisplayToolName(toolName) {
	const parts = toolName.split(":");
	return parts[parts.length - 1] || toolName;
}
var import_react$8, import_jsx_runtime$8, DEFAULT_LOADING_MESSAGES, VisualizerShowWidgetView, VisualizerShowWidgetRenderer;
var init_visualizer_show_widget_renderer = __esmMin((() => {
	init_src();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_tool_protocol();
	init_inline_loading_line();
	init_visualizer_show_widget_payload();
	import_jsx_runtime$8 = require_jsx_runtime();
	DEFAULT_LOADING_MESSAGES = ["Preparing interactive preview"];
	VisualizerShowWidgetView = ({ tool }) => {
		const payload = (0, import_react$8.useMemo)(() => parsePayload(tool), [tool]);
		const isRunning = isRunningStatus(tool.status);
		const toolError = extractToolError(tool);
		const loadingMessages = payload.loading_messages && payload.loading_messages.length > 0 ? payload.loading_messages : DEFAULT_LOADING_MESSAGES;
		const [loadingIndex, setLoadingIndex] = (0, import_react$8.useState)(0);
		(0, import_react$8.useEffect)(() => {
			if (!isRunning || loadingMessages.length <= 1) return;
			const timer = window.setInterval(() => {
				setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
			}, 1400);
			return () => window.clearInterval(timer);
		}, [isRunning, loadingMessages]);
		const displayToolName = getDisplayToolName(tool.name);
		if (isRunning) {
			if (payload.widget_code) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WidgetRenderer, {
				widgetCode: payload.widget_code,
				title: payload.title,
				toolName: displayToolName,
				isStreaming: true,
				chromeless: true,
				showOverlay: false,
				loadingLabel: loadingMessages[loadingIndex]
			}, tool.id);
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(InlineLoadingLine, { message: loadingMessages[loadingIndex] || DEFAULT_LOADING_MESSAGES[0] });
		}
		if (toolError) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "tool-error-fallback",
			children: toolError
		});
		if (!payload.widget_code) return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
			className: "tool-error-fallback",
			children: "Widget content is missing."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(WidgetRenderer, {
			widgetCode: payload.widget_code,
			title: payload.title,
			toolName: displayToolName,
			isStreaming: false,
			chromeless: true,
			showOverlay: false,
			loadingLabel: loadingMessages[loadingIndex]
		}, tool.id);
	};
	VisualizerShowWidgetRenderer = class {
		canHandle(tool) {
			return isVisualizerShowWidget(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool) {
			if (!isVisualizerShowWidget(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(VisualizerShowWidgetView, { tool });
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/visualizer/index.ts
var init_visualizer = __esmMin((() => {
	init_visualizer_read_me_renderer();
	init_visualizer_show_widget_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/web-fetch/web-fetch-renderer.scss
var init_web_fetch_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/web-fetch/web-fetch-renderer.tsx
/**
* 检查是否为 WebFetch 工具调用
*/
function isWebFetchToolCall(tool) {
	return tool.name === "web_fetch" || tool.name === "WebFetch";
}
function toSafeString$1(value) {
	return typeof value === "string" ? value : "";
}
function getResultPayload$1(tool) {
	const result = tool.result?.result;
	return result && typeof result === "object" ? result : {};
}
var import_react$7, import_jsx_runtime$7, WebFetchToolAdapter, WebFetchRendererWithContext, WebFetchRenderer;
var init_web_fetch_renderer = __esmMin((() => {
	init_web_fetch_renderer$1();
	init_src();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$7 = require_jsx_runtime();
	WebFetchToolAdapter = class {
		constructor(tool) {
			if (!isWebFetchToolCall(tool)) throw new Error(`Invalid tool type for WebFetchToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 获取 URL
		*/
		getUrl() {
			return toSafeString$1(this.tool.args?.url);
		}
		/**
		* 获取标题
		*/
		getTitle() {
			return toSafeString$1(getResultPayload$1(this.tool).title);
		}
		/**
		* 获取 Favicon
		*/
		getFavicon() {
			return toSafeString$1(getResultPayload$1(this.tool).favicon);
		}
		/**
		* 获取内容
		*/
		getContent() {
			const payload = getResultPayload$1(this.tool);
			const raw = payload.data ?? payload.content;
			if (raw == null) return "";
			return typeof raw === "string" ? raw : JSON.stringify(raw);
		}
		/**
		* 获取加载状态文本
		*/
		getLoading() {
			return toSafeString$1(getResultPayload$1(this.tool).loading);
		}
		/**
		* 转换为 WebFetchData 格式
		*/
		toWebFetchData() {
			return {
				url: this.getUrl(),
				title: this.getTitle(),
				favicon: this.getFavicon(),
				content: this.getContent(),
				loading: this.getLoading()
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	WebFetchRendererWithContext = ({ tool, context }) => {
		const isCompact = context?.compact ?? false;
		return (0, import_react$7.useMemo)(() => createWebFetchRenderer({
			compact: isCompact,
			converter: (t) => {
				return new WebFetchToolAdapter(t).toWebFetchData();
			},
			onLinkClick: () => {},
			...toolIconRenderConfig
		}), [isCompact])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	WebFetchRenderer = class {
		constructor(_config) {
			this.className = "web-fetch";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isWebFetchToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, _config, context) {
			if (!isWebFetchToolCall(tool)) {
				console.warn("[WebFetchRenderer] Invalid tool type:", tool.name, "- expected: web_fetch");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WebFetchRendererWithContext, {
					tool,
					context
				});
			} catch (error) {
				console.error("[WebFetchRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "web-fetch-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/web-fetch/index.ts
var init_web_fetch = __esmMin((() => {
	init_web_fetch_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/web-search/web-search-renderer.scss
var init_web_search_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/web-search/web-search-renderer.tsx
/**
* 从 ACP 文本块 markdown 中解析搜索结果（历史数据 fallback）
*/
function parseSearchResultsFromMarkdown(text) {
	const results = [];
	const entries = text.split(/\n## \d+\.\s+/);
	for (const entry of entries) {
		if (!entry.trim() || entry.includes("# Search Results for")) continue;
		const linkMatch = entry.match(/^\[([^\]]+)\]\(([^)]+)\)/);
		if (!linkMatch) continue;
		const title = linkMatch[1];
		const url = linkMatch[2];
		let snippet = "";
		const afterLink = entry.slice(linkMatch[0].length);
		const urlLabelIndex = afterLink.indexOf("**URL:**");
		const dividerIndex = afterLink.indexOf("---");
		let snippetEnd = afterLink.length;
		if (dividerIndex !== -1) snippetEnd = dividerIndex;
		if (urlLabelIndex !== -1 && urlLabelIndex < snippetEnd) snippetEnd = urlLabelIndex;
		snippet = afterLink.slice(0, snippetEnd).trim().replace(/^\n+/, "");
		results.push({
			title,
			url,
			snippet: snippet || void 0
		});
	}
	return results;
}
/**
* 检查是否为 WebSearch 工具调用
*/
function isWebSearchToolCall(tool) {
	return tool.name === "web_search" || tool.name === "WebSearch";
}
function toSafeString(value) {
	return typeof value === "string" ? value : "";
}
function getResultPayload(tool) {
	const result = tool.result?.result;
	return result && typeof result === "object" ? result : {};
}
var import_react$6, import_jsx_runtime$6, WebSearchToolAdapter, WebSearchRendererWithContext, WebSearchRenderer;
var init_web_search_renderer = __esmMin((() => {
	init_web_search_renderer$1();
	init_src();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$6 = require_jsx_runtime();
	WebSearchToolAdapter = class {
		constructor(tool) {
			if (!isWebSearchToolCall(tool)) throw new Error(`Invalid tool type for WebSearchToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 获取搜索查询
		* 优先从结构化 result 读取；缺失时从 ACP 文本块 markdown 解析
		*/
		getQuery() {
			const payload = getResultPayload(this.tool);
			const storedQuery = toSafeString(payload.query);
			if (storedQuery) return storedQuery;
			if (payload.type === "text" && typeof payload.text === "string") {
				const match = payload.text.match(/# Search Results for "([^"]+)"/);
				if (match) return match[1];
			}
			return toSafeString(this.tool.args?.query);
		}
		/**
		* 获取网页搜索结果
		* 优先从结构化 result 读取；缺失时从 ACP 文本块 markdown 解析
		*/
		getResults() {
			const payload = getResultPayload(this.tool);
			const storedResults = payload.results;
			if (Array.isArray(storedResults) && storedResults.length > 0) return storedResults;
			if (payload.type === "text" && typeof payload.text === "string") return parseSearchResultsFromMarkdown(payload.text);
			return [];
		}
		/**
		* 获取图片搜索结果
		*/
		getImages() {
			const images = getResultPayload(this.tool).images;
			return Array.isArray(images) ? images : [];
		}
		/**
		* 获取搜索类型
		*/
		getSearchType() {
			return "text2text";
		}
		/**
		* 转换为 WebSearchData 格式
		*/
		toWebSearchData() {
			return {
				query: this.getQuery(),
				searchType: this.getSearchType(),
				results: this.getResults(),
				images: this.getImages()
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	WebSearchRendererWithContext = ({ tool, context }) => {
		const isCompact = context?.compact ?? false;
		const adapter = context?.adapter;
		return (0, import_react$6.useMemo)(() => createWebSearchRenderer({
			compact: isCompact,
			converter: (t) => {
				return new WebSearchToolAdapter(t).toWebSearchData();
			},
			onResultClick: (url, index) => {
				try {
					const elementKey = `${index}-${tool.id ?? ""}`;
					adapter?.reportTelemetry?.("web_element_click", {
						pageURL: url || "",
						elementId: elementKey,
						elementName: elementKey
					});
				} catch (error) {
					console.warn("[WebSearchRenderer] reportTelemetry failed:", error);
				}
				adapter?.openExternal?.(url).catch((error) => {
					console.error("[WebSearchRenderer] openExternal failed, falling back to window.open:", error);
					window.open(url, "_blank");
				});
			},
			...toolIconRenderConfig
		}), [
			isCompact,
			adapter,
			tool.id
		])({
			content: {
				type: "tool",
				tool
			},
			message: {
				id: tool.id,
				role: "assistant",
				content: []
			},
			isSessionActive: false
		});
	};
	WebSearchRenderer = class {
		constructor(config) {
			this.className = "web-search";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isWebSearchToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, config, context) {
			if (!isWebSearchToolCall(tool)) {
				console.warn("[WebSearchRenderer] Invalid tool type:", tool.name, "- expected: web_search");
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(WebSearchRendererWithContext, {
					tool,
					context
				});
			} catch (error) {
				console.error("[WebSearchRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
					className: "web-search-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/web-search/index.ts
var init_web_search = __esmMin((() => {
	init_web_search_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/weixinpay/weixinpay-renderer.less
var init_weixinpay_renderer$1 = __esmMin((() => {}));
var init_wechatpay_logo = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/weixinpay/wechatpay-qr-logo.ts
var WECHATPAY_QR_LOGO_DATA_URL;
var init_wechatpay_qr_logo = __esmMin((() => {
	WECHATPAY_QR_LOGO_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDYwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPiA8cGF0aCBkPSJNMCAzMEMwIDEzLjQzMTUgMTMuNDMxNSAwIDMwIDBDNDYuNTY4NSAwIDYwIDEzLjQzMTUgNjAgMzBDNjAgNDYuNTY4NSA0Ni41Njg1IDYwIDMwIDYwQzEzLjQzMTUgNjAgMCA0Ni41Njg1IDAgMzBaIiBmaWxsPSIjZmZmZmZmIi8+IDxwYXRoIGQ9Ik0zMCAxQzQ2LjAxNjMgMSA1OSAxMy45ODM3IDU5IDMwQzU5IDQ2LjAxNjMgNDYuMDE2MyA1OSAzMCA1OUMxMy45ODM3IDU5IDEgNDYuMDE2MyAxIDMwQzEgMTMuOTgzNyAxMy45ODM3IDEgMzAgMVoiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIyIi8+IDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjM3NiAxMi4xODgpIj4gPHBhdGggZD0iTTIuMzQzNzUgMjkuMzc0N0MyLjA4NDg3IDI5LjM3NDcgMS44NzUzMSAyOS4xNjUxIDEuODc1MzEgMjguOTA2MlY4LjU5Mzc1QzEuODc1MzEgOC4zMzQ4NyAyLjA4NDg3IDguMTI1MzEgMi4zNDM3NSA4LjEyNTMxTDE2LjQwNjIgOC4xMjUzMVY2LjI1SDIuMzQzNzVDMS4wNDkzMyA2LjI1IDAgNy4yOTkzMyAwIDguNTkzNzVWMjguOTA2MkMwIDMwLjIwMDcgMS4wNDkzMyAzMS4yNSAyLjM0Mzc1IDMxLjI1TDI4LjkwNjIgMzEuMjVMMjkuMTQ1OCAzMS4yMzc4QzMwLjMyNzUgMzEuMTE3NiAzMS4yNSAzMC4xMTk2IDMxLjI1IDI4LjkwNjJWMTYuNjQ3M0gyOS4zNzQ3VjI4LjkwNjJDMjkuMzc0NyAyOS4xNjUgMjkuMTY1IDI5LjM3NDUgMjguOTA2MiAyOS4zNzQ3TDIuMzQzNzUgMjkuMzc0N1oiIGZpbGw9IiMwN0MxNjAiLz4gPHBhdGggZD0iTTI0LjEwNjYgMC4yNjQwNDhDMjQuMjUyMyAwLjAxODI2NDcgMjQuNTY0NiAtMC4wNzEyOTg0IDI0LjgxNzcgMC4wNjExMDYyQzI0Ljk3NDkgMC4xNDQwMjMgMjUuMjA2NiAwLjYyNzIwNyAyNS42Njc2IDEuNTkwMDRDMjYuMTg2OSAyLjY3NDg4IDI2LjQ0NjcgMy4yMTgyIDI2LjgxMiAzLjYyODYxQzI3LjM4OTggNC4yNzc2NiAyOC4xNjk0IDQuNzE0MzYgMjkuMDI0NSA0Ljg2OTE1QzI5LjU2NTEgNC45NjY5NCAzMC4xNzA3IDQuOTA1NjYgMzEuMzgwNSA0Ljc4MjE4QzMyLjUzODcgNC42NjM5NCAzMy4xMTgyIDQuNjA0MDkgMzMuMjc1NiA0LjcwNDM2QzMzLjUwODYgNC44NTI5IDMzLjU4OTcgNS4xNTM3MyAzMy40NjQ4IDUuNDAwMTZDMzMuMzggNS41NjY1OCAzMi44NTk1IDUuODA4MTggMzEuODE4NCA2LjI4ODIyTDMxLjY2NzMgNi4zNTg0MUMzMC42NTU2IDYuODI0OTEgMzAuMTQ5MiA3LjA1ODM5IDI5Ljc1NjkgNy4zODM4QzI5LjA1MjEgNy45Njg5NSAyOC41NzUxIDguNzg0OCAyOC40MTI2IDkuNjg2MzVDMjguMzIyMyAxMC4xODgxIDI4LjM2ODQgMTAuNzUxMiAyOC40NjE1IDExLjg3NkMyOC41Mzg0IDEyLjgwNjIgMjguNTc4MSAxMy4yNzMyIDI4LjUwNDIgMTMuNDE0MUMyOC4zNTc4IDEzLjY4OCAyOC4wMDggMTMuNzgyNSAyNy43NDQzIDEzLjYxODVDMjcuNjA5OCAxMy41MzQzIDI3LjQxMzUgMTMuMTE2NCAyNy4wMjEgMTIuMjg0OUMyNi41NTI3IDExLjI5MjggMjYuMzE4MSAxMC43OTYyIDI1Ljk5NzIgMTAuNDEyN0MyNS4zODI5IDkuNjc5MDkgMjQuNTE5NSA5LjE5NzcxIDIzLjU3MjUgOS4wNjA3NEMyMy4wNzc1IDguOTg5MTggMjIuNTIyOSA5LjA1MTY3IDIxLjQxNDkgOS4xNzY3MUMyMC40MDA0IDkuMjkxMiAxOS44OTIgOS4zNDg3NyAxOS43NDQxIDkuMjY5NzhDMTkuNDc5NCA5LjEyNzg4IDE5LjM4MjYgOC43OTUgMTkuNTI5IDguNTMyNzhDMTkuNjExOCA4LjM4NjU2IDIwLjA2MTQgOC4xNjUwMiAyMC45NTg3IDcuNzI0MDdMMjEuMDQ4NyA3LjY4MTM0QzIyLjExNTIgNy4xNTcyOCAyMi42NDg1IDYuODk0MTQgMjMuMDUyMiA2LjUyOTMxQzIzLjY5NDkgNS45NDgzNSAyNC4xMjQ5IDUuMTY4NjIgMjQuMjc0NCA0LjMxNTI2QzI0LjM2ODIgMy43Nzk0MyAyNC4zMDU1IDMuMTg4MDQgMjQuMTgxNCAyLjAwNjZDMjQuMDcwMSAwLjk0NzM3MiAyNC4wMTYyIDAuNDE3MjI0IDI0LjEwNjYgMC4yNjQwNDhaIiBmaWxsPSIjMDdDMTYwIi8+IDxwYXRoIGQ9Ik0yMC4wMDAxIDI1SDIxLjg3NTFMMjEuODc1IDE0LjA2MjVIMjBMMjAuMDAwMSAyNVoiIGZpbGw9IiMwN0MxNjAiLz4gPHBhdGggZD0iTTEzLjYxMTMgMTQuMDYyNUwxNy41NCAyNS4wNzEzSDE1LjcxNjhMMTQuNjI5OSAyMS43ODUySDEwLjc1MUw5LjY2NjAyIDI1LjA3MTNINy44MTI1TDExLjc0MTIgMTQuMDYyNUgxMy42MTEzWk0xMi42NjUgMTUuOTg1NEwxMS4yMzYzIDIwLjMxMjVIMTQuMTQyNkwxMi43MTA5IDE1Ljk4NTRIMTIuNjY1WiIgZmlsbD0iIzA3QzE2MCIvPiA8L2c+IDwvc3ZnPg==";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/weixinpay/weixinpay-renderer.tsx
function isWeixinpayToolCall(tool) {
	return toStringOrEmpty(tool.name).toLowerCase() === "weixinpay";
}
function parseArgs(tool) {
	const raw = tool.args;
	if (typeof raw === "string") try {
		return JSON.parse(raw);
	} catch {
		return {};
	}
	return raw || {};
}
var import_react$5, import_jsx_runtime$5, WechatPaySuccessIcon, PENDING_STATUSES, WeixinPayCard, WeixinPayRenderer;
var init_weixinpay_renderer = __esmMin((() => {
	init_weixinpay_renderer$1();
	init_src();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_use_qr_data_url();
	init_useI18n();
	init_tool_protocol();
	init_wechatpay_logo();
	init_wechatpay_qr_logo();
	import_jsx_runtime$5 = require_jsx_runtime();
	WechatPaySuccessIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
		className: "weixinpay-card-result-icon",
		viewBox: "0 0 28.3333 25.5",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			fill: "#07C160",
			d: "M10.3043 16.1304C10.1763 16.1956 10.0323 16.2341 9.87966 16.2341C9.52529 16.2341 9.21722 16.0351 9.05554 15.7413L8.99392 15.6036L6.41442 9.83036C6.38656 9.76751 6.36929 9.69625 6.36929 9.627C6.36929 9.36119 6.58081 9.14583 6.84139 9.14583C6.94814 9.14583 7.04507 9.18146 7.12434 9.2415L10.1677 11.4516C10.3894 11.5997 10.6559 11.687 10.9416 11.687C11.1115 11.687 11.2744 11.655 11.4255 11.5985L25.7381 5.10112C23.1728 2.01635 18.9474 0 14.1663 0C6.34182 0 0 5.39174 0 12.0429C0 15.6712 1.90765 18.9382 4.8945 21.1459C5.13428 21.32 5.29087 21.6062 5.29087 21.9305C5.29087 22.0377 5.26928 22.1346 5.24103 22.2371C5.00282 23.145 4.62097 24.5981 4.60331 24.6666C4.57349 24.7798 4.52679 24.8991 4.52679 25.0188C4.52679 25.2842 4.73792 25.5 4.99968 25.5C5.10171 25.5 5.1853 25.4612 5.27203 25.4107L8.37348 23.5837C8.60659 23.4464 8.85343 23.3616 9.12578 23.3616C9.27059 23.3616 9.41069 23.3844 9.54216 23.4256C10.9891 23.8499 12.5502 24.0857 14.1663 24.0857C21.9903 24.0857 28.3333 18.694 28.3333 12.0429C28.3333 10.0289 27.7482 8.13145 26.7192 6.46297L10.4079 16.0692L10.3043 16.1304Z"
		})
	});
	PENDING_STATUSES = new Set([
		"idle",
		"pending",
		"parsing",
		"stream_executing",
		"full_executing",
		"executing"
	]);
	WeixinPayCard = ({ tool, context }) => {
		const args = (0, import_react$5.useMemo)(() => parseArgs(tool), [tool]);
		const payload = args.weixinpay || {};
		const isRegistered = payload.isRegistered === true;
		const qrDataUrl = useQrDataUrl(payload.webUrl || "", "H", WECHATPAY_QR_LOGO_DATA_URL);
		const adapter = context?.adapter;
		const sessionId = context?.sessionId;
		const elicitationId = args.elicitationId || tool.id;
		const [decision, setDecision] = (0, import_react$5.useState)("pending");
		const [step, setStep] = (0, import_react$5.useState)("authorize");
		const [isSubmitting, setIsSubmitting] = (0, import_react$5.useState)(false);
		const outcome = tool.metaData?.["paymentOutcome"];
		const payResult = tool.metaData?.["weixinpayResult"];
		const isPendingStatus = PENDING_STATUSES.has(tool.status);
		const handleAction = (0, import_react$5.useCallback)(async (action) => {
			if (!adapter?.respondElicitation || !sessionId || !elicitationId || isSubmitting) return;
			setIsSubmitting(true);
			try {
				await adapter.respondElicitation(sessionId, elicitationId, action);
				setDecision(action === "accept" ? "accepted" : "cancelled");
			} catch (err) {
				console.error("[WeixinPayRenderer] respondElicitation failed:", err);
			} finally {
				setIsSubmitting(false);
			}
		}, [
			adapter,
			sessionId,
			elicitationId,
			isSubmitting
		]);
		const t = useTranslation();
		const showCompleted = decision === "accepted" || outcome === "accept";
		const showCancelled = decision === "cancelled" || outcome === "decline" || outcome === "cancel" || tool.status === "cancelled" || tool.status === "failed";
		const pending = !showCompleted && !showCancelled && isPendingStatus;
		const caption = payload.scanTip || t(isRegistered ? "weixinpay.scanTip.registered" : "weixinpay.scanTip.unregistered");
		const authorizeTip = isRegistered ? t("weixinpay.authorizeTip.registered") : payload.unregisteredText || t("weixinpay.authorizeTip.unregistered");
		const cardTitle = payload.title || "AI专属卡";
		const confirmLabel = payload.confirmText || t(isRegistered ? "weixinpay.confirm.registered" : "weixinpay.confirm.unregistered");
		const cancelLabel = payload.cancelText || t("weixinpay.cancel");
		const completedText = t(isRegistered ? "weixinpay.completed.registered" : "weixinpay.completed.unregistered");
		const cancelledText = payResult?.kind === "failed" ? t("weixinpay.cancelled.failed") : payResult?.kind === "pending" ? t("weixinpay.cancelled.pending") : t(isRegistered ? "weixinpay.cancelled.registered" : "weixinpay.cancelled.unregistered");
		const stateClass = showCompleted || showCancelled ? "state-result" : step === "qr" && pending ? "state-qr" : "state-authorize";
		const isPaidSuccess = showCompleted && payResult?.kind === "paid";
		if ((showCompleted || showCancelled) && !isPaidSuccess) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: `weixinpay-card ${stateClass}`,
			children: [!(showCompleted || showCancelled) && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "weixinpay-card-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("img", {
					className: "weixinpay-card-brand",
					src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANcAAABECAYAAAASj6BYAAAS30lEQVR42u1debRV1Xn/ffde5tEYEdREnHAK1gSqJs1CQ3QpahSrVdMaY5rY5ZC4ksZFTKuuGI0TukwwiloxqWhKa2vFASiKcUhFcQpO0VLQKlXrgMJ7CLx37/n1j/Pb8Hm8w7nv3Qu8lf1b66w77bPPPvvsb/6+fYGIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIvgrbGgdFcuO4zIzxMUVE4uoZERmAgr5KzCyp0q7g2wBgJLqISFzViaoAoGBm5Rq/99PYaGbdNdqUahFjRMQfHXGJqMzMKu7zeAAHAvgCgD0AbA9gsCRVAmAtgLcBLAPwDIDHzewF12dRRJhsQQlc1FxWaknUcO9iCOztHObpR5pBsZ5W0Ia5KG2O6/X0ubv5Q1iHfR6ajPB+HMmLSD7H5pGQfJbkBSR3q9Z/O5gCyaK3Bf37RnZjRPts8j9qyRUmwsxIchyA8wCcDGCQa1Z246k2JuoAgJL7fi2A2wBcYWaviiu11B4jaTkkxAkARgO418xe8+eE9yQnAhgD4GkzezNPv1kCN7OE5EEA+gF4EsCGan24aw4DcJTm7AkzW9bsdZuZI5KDARwNoD+AV8zsyXZcT9c8EcCr0mZySXGNcS9pSBsAPGxmG/oqhym49z8i2eEkUDfJSg8lV0XnB3xA8vvVrtsKFYfkRJLXSYJZOFy7FRrHX4bzwu9hLCQfU5tLM+pT7gWs67+kfu6TNO2n6xXd0V+vE9wcXaDvBmbabjx6+5xJ7umud4ezn1upQRjJ3d11bsyjubhneYs7d5dWrpcsCu1UA8VpR5FcAOByAEMlpShuWuihtC3ofKq/kQCuITmX5Da6bqG3hGVmZZI7ApgD4CwAt+r6DwF4meTn1Hy1xhGcL3P0+0Eay3AAOwGoAHipFyr1nwIYp/dPmlnFzLrNrKz34eiSPbEKQJfGtkq/rc+03XjUIeq6B4DwmgBYp+utdQzGcvbTcL1KQn1H1wKAxU1qYRv0HDqdNtQWlNolscysQnIsgPkA9tLCK7X4muaIrALgGAAPkPxaT1SvGoS1EECw7X6ra44HsI0OuPsKD3gfEcGn9HkPERcAvOA4vWcAddVZqTTfloOiA8D1JPfVdcoZRhUW+lg3rokkj9H5SUblNi26RVnvbM75Cw6qbvVfcud2t9C8qJAcCeBbGvNyALeH35pYM8V2Cpa2EVewe0huD+B+ALtrgvuh/UjkdVxI8osA1pGsNGnbmAhrPIA7NX4AONfMZpEcqsU9QhzbqyMFfV6nsYRFPFEP9TUASzWepIn5TDSfJ+jruWb2DskZAE7KeWun6aiHHQG86ey7gQDuALCdI8J6GOie81EkHw8hlQaEWdQ9XSaNpxqhFPVcvgdglL67Voylnwiv3tiKTBtYledVcJIzaZWNWGpTUNgA/IsWZrmNhJXowQVu2SmVbDaALj0Mazb+JgfF9U4yTTOzq8NCF9crAPhIEjoQiv/sOeNX9DoUwP3ORR44bgLgbDN7JSzsjCpUJvkdjacbwLXq4wMA651WUEuFDhIqqeEsKohhZBf1ADkoeoJP68iL92qpd47BjAbwA435LQC/EiF0NSFdfdsOEXKlL0iuoA6eD2BSGyVWJbNw3gDwawC/NrMV7qHsZmbLm2AMBDAEwE0AhokxfNfMbiQ50MzWizsGqXQIyf46JwEwnuT7IoIEQLf6neQW3FdrDGEHAK/4xeVUoeGy+Siv3xL99mMAV2oeeur5DURXBvCO+w6SwD8HsK3aWB1ViwCGSzUvAFgB4HcuXlmPQZYALMpcG1UYzOWO4f3CzNaQPBfAwVoThQb+hQTAfo5x/BPJj5wabQDOM7OXqjC5LesZlGG6C8l1JMvy7LUKifr0eIbkGdLD/Vi+QHK+vJNjgqctr+NAff4vycOqtBlM8sOcY55Ecj/3eQHJ23Ss1P08R3J2iNllPKzBw/Vj18f8dnq4erkGtie5QeO8uZXxUZJHqN8uvU7Vc32QrcWUVsVNSy2WWmVxkoHihJZD6uThrBWNNdzwAqlt93nuIrvkRwDOVqwFAH5gZtM0WXU5kdP1bwJwp+yanQFcDeA5AJdIDbsTwBedI8Ec9w4qYSeAFzUeAHgdwBQX/3pQNs5tZnalG0OSUYU+DeBcZ5sUq4QcTgOwbw7unZUYRQBLZFdVTUdz2Sf1PMxBKng1cKCkesnFMbPX/9jnrKTIzMHNGalWkpPnQV2/7OemhnRNAOwpLSHRva/POHZW1pGgWy5iTnIkyfckZRpJrXKD3yuZNh0kZ5E8oEp8pUTyLEkbOg6XkHyT5JBmIvuOW44m+aKTnKO9VKlxFENsRzGolTr/xUy7pfr+HH9OFak1U+3W6fU/whjd/b/YC079QKs4NckdnOSa1ds15eZgvouNhjUxtYf9Xqfz1/rnuTXbXAVxzUnSzysZLhK4wvsAzpT9cIjLvCg0sKf+EcAtZvZqWLSK7yQkDwdwsWJAcBysn7jTGABfkuey0Mh4dW74UQDmya1eFocrOAlTbmQ8S4Lu6Nzi25nZWyL2EWrzruxUy8QIyyQPBPA3mqOBda43B8CEHkquRXk5tYh5gsbCKpLrM07K7Ujyy7pGJSNB1pjZ0pya0BUAjnCx0Uq1BG4fynBaimXWejmz5ge5ioskT0hkSxBXuIkvZ1KVsupdfwAPAPg3ABcBOF/nlt14AlH+HsCNAOaY2YeatAFmtsHMuknuDeAnAE50C7qQuacwwX8m4rIc8bmyIvf3SNWCC3gHSfHnAP6iChOB816+AWAN0hStIUiTkXeTl2sbMSFknQghGCtJ9g8a84fy5n3Wze3GpFUzu7jXD7CO8e7ihUM1jyNydHm4jlp9nmJmt1dzvYfv5CGdpnleLSZyZq2xk/ymmNW8bL8kEzFjZmKLCUlstdUVTo2aW0flC+lK17jzJpP8r0y7BSSPyST69ncq0EiSP5NYD+pjrTSqcM05jVQf55A5hOQbro/XnBqxs9remlPlGkxyV5J/0OezsCmdKox934yKG9KRrnX9fJ/kXXo/r5pDo1ZKU6OjSbV/OMl3XfpZuUkVtCy1MSF5dbU0MDcPf5JxYBxB8muur6nuvoeRXKzv3yO5nZ5nNefQDe55jm2nc6hVkitwg23qBfHU7lSSl0g1eFCqz9/K9f0bM1uCj9d10cy69PlbAC6UioUakqOaRB2ZQ/UJUusb2JRN8XdyTMyQdA2c8HZJpaSKGuZV4IKZrSD5KNIslQNIzgSwi9qukiTT7W2Mo+2ENMUHSBN0fwHg+Oy9uWDvTEnnpAm1sKLA6j1m9vd1grchOyQ4aVZI6hLAqUjTubzqZ1XWRQnAR7qPQ9VmYY1nEq7135LcpyvOuIDk6TXW1VoAjwM4SGObYWZfb2elxGZP0CX5aANnRZAk5waJVEOClDxHI3kwyUcy/SQ5OSVJLmzEodw9jBJ3vgybEo5JcjXJHZqV6Lqfs9XHK/r+An1+qkoSsOfc85xkeywjubxD49leODTm50x8DdrJV52DZ14Tc7E/yU6du7heeCQzH0e7dXFaFclVUl9FhTWSrGTr65IrTEZHDscHAXyX5HUA1mdK+KliyrJueldJqm9mnB3NjruzUXKns1/eITnRzP7HF9bVcHp8qsrvFTP7UA8z6PRLdG97kPwsgL3V9gVJhY3uajeOpQCOrOIkqVaGM03SsCcOjZdquMY/EaaQdFtE8iY5WqaQvMDMLiY5AJ/MIwzPe4TCF0P0/Q+dNKwqKd37e0n2N7OuGulNdMkLZyhwnQD4JcmHAKzp07V1jitcK87RnUOafCNzbsFx4qEkz3fB2qQH+r2XcNPzlnk4+6J/PclF8kKS75B8i+TbOt7S8UvPmUkOcrbbpa5I9Ixa4wrzUUUrmJeRcLY5Qy6SEEOcHZmQPC5bXuLGb7KjAy7P6/p31wtrpJrkykqmG12b65yU3+ySq9XE9Vc5YlhlV01cCPVIrq+TSb7cRDwsj1p4QjM1VEE1bUBcC+tcd61SlvzczNZ9r9G4yirca6SuWi3icr8NILkXyb2bPPZ0i9OaNAHGO6fSRyS/4mJ7ninMzjirPlHV3cT6qkdcod5tWzG9ipwhn88wyz5HXAUXRFybI4gcvHuHuz4OzCzY7l6mT4Vz15Dcrlkun4O47tQ1HiF5rDxZM/Td21IZ4QLKUzN259N56pjqEFdR5w8n+biItcsRbqOjS2OZL+K0JggszM1xbq47SB6aYVCesJbIq2fNSts8xJUhtNNdu/sDA9rcxNWSTmVXFM3sTQVe89TXUHrxKSRvQFr0dpjLEi/1chuCcP27zexdjY8triUzAMvMbK6Z3YO0iNIyZRYhQPwA0pKT4DW9WeMp9iLdjLLfDnSB82LOo5/m+AgAO6kvy/m8y7I7/11xJ5M9dR/JE0lui7SO7xQXszzSzDpkU7crtSgUyc5Cmtr0GIBLXCHnZkU7iiWvQFp3ZDmIenek5SHI6VpvJjQQJnR6m+Yu7AHSz3HPoXUM7k6S/6kwAgEsbWEOWwiWXyQXd7EOcwu/nQTgHKTlGoUeMNRAYDeoxm060iSBOUh36xqjps+IsN6r5+5vEZOnAsIkeZiZrclUPPRN4nLepKdI3gLgr6ukm9SqxwoEV2xhSUoJwA1mtrTVD1UPKySprnZbxSW1FjPJPZCWY4T0rMuQlkpYCzWQJWa2OOc97FlnQ6BmTIGCmV2lz5fr/sbodRmAL5nZhuA9bdeGNVlPoyOsEAvc7OZSoU1i+YdId+YpNVAPC05NsRYT1jIA01xgtpUhhxFIcwaBTVnUXhX1ZeRhMc1EGigP6u4kkucECdCi8Q2RLTagTlbGAEnawT3cIKckAkkUMhlE8kwAX9f993OMewekZfgHu30+6MZSaLNn06qkNVmfJC7HNT5EmlHQ2UBFQRuKKIvKnjheOn4r95sPD2ZXbCo1f9n9vlqvg7XQC8qDPA+biiSnAXhCEvtKkhNEYMUW2oF5jtyZ6cFeDQQlAtmH5E9kT10PYH8R1MOSyl1iQscDeIjkInmTR7hNcRJ/jTZsG1hwaV7BQ1nuszaXc248qw1R7pYtkrR5U5Cggq4BcLSZPd8GHT+Mf4LerwfwfBXiGghgpJm9TvJYAJfq+4fNbDrJxQAekY3yr9ol6v9aUP26WtKk3GCeQLIjJ7MM7QcD+ByAyQCmADggk6m/HMBVAG7SGvhn2YDH6vfJOt5Qxsx8VVWvbMeCrzKPQXXfuS87NIL9VTKz35KcjHQ/jbE5Nznp6T4aJaT5aCeKsEsNykJ6mj8JldZQUus1RxQd3plCcn8Av9HnVUjzKotm9juSFyItlRkL4C6FJTp7YJMUXObKSXIvl+qowqH9oa6N1Ug/GgfgOBHS511Op8fTAG4BMDtoCpr7pQCmkjwEwPdEkIOQlqV8W8dqki+LQT1qZrf21iZzGfUnS2qWndkxRvcStsH7YKsqjOxhfGJ7FfQlPdwItFbJvw8w3yYXcKsK/8LYz3PB39FSYcImoDPw8QDlrq5I8zSS77vxHemz1/X+Dvf7vTWy3X2cK3G5gCF+NqEF8zk2m5mv1yk12i9XEefkbB1aNkPDfd5bWS1PuoLKXDmOmThXUivOVSOhoRZ+1e5t0EvtJC7ZEv2l8jyBtPCw4uJgBZcj5wskq2VWJ66dL3dfAuBiM7vX75nYwtvodmPrRLp1W8hqn5vJy+tAuqnLcKSZ2hcBuAbppifzXE5iSI06VdJgdwA/bxBcZSZ+mKj9C5KOk9zcNmOX3C1VreDyGiv6PJ/kU0j3aXxW9tRCqXNrMwv6YxuLuhqr8IcJfwDwUwA/VTLywRrzfrJhZ7ZoC/aK2wpiqTNJwtyt0j1Mb3f8yzaTBOunRTCuRTtCdSLdoHOWgsRs9T7xbm/xEVr867Qr0EikRY9lAM9n9vAwMZCBSPdK7yS5v5n9PmtPORfxKAAjau3j7sYxVu7/t81sZbYtyUE9eJ6Jma1vcP+7aL+KZTV2Ac61z1+tv43S2tgZwOuhtKjBswiMbbmZddRTI3XNklfVW2wqbDnicgtoH3GRIHW65GG6SxMbONhnkNaEDXDdrEdaifs60k1iHpFj4PWsnr01FpGGEv56f5jg56o389zOc91ei2zR3yAFZlhplyu+1pwHD3a7/0CxhPa7+hOkaU0lp0pdYGbey3arbnyYiGuYJqAsKbXKzDpr/ddXOwlLD6PgykfM/b9T0uD/syr1Fq+4sek+kp7+L5cbV0vL+70dpnblFnryEr+RbBMEbk1s/231PKDo40WUwbi8iuQLJI/K7J5UdLshWc6YS2mrzmKOiNjMNtcAAOXAyetw/Zr/zxX/AzkiIue/S0ZERLQwzyvORERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERF/A/wOMCwW0MkkXBQAAAABJRU5ErkJggg==",
					alt: t("weixinpay.brandAlt")
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "weixinpay-card-title",
					children: cardTitle
				})]
			}), showCompleted ? payResult?.kind === "paid" ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "weixinpay-card-result-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(WechatPaySuccessIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
					className: "weixinpay-card-result-title",
					children: payResult.title || t("weixinpay.paySuccess")
				})]
			}), payResult.payAmount && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "weixinpay-card-result-amount",
				children: ["¥", payResult.payAmount]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "weixinpay-card-resolved",
				children: completedText
			}) : showCancelled ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "weixinpay-card-resolved",
				children: cancelledText
			}) : pending && step === "qr" ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "weixinpay-card-qrwrap",
				children: [qrDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("img", {
					className: "weixinpay-card-qr",
					src: qrDataUrl,
					alt: t("weixinpay.qrAlt")
				}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "weixinpay-card-qr weixinpay-card-qr-loading",
					children: t("weixinpay.qrLoading")
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "weixinpay-card-caption",
					children: caption
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "weixinpay-card-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
					className: "weixinpay-card-btn secondary",
					disabled: isSubmitting,
					onClick: () => handleAction("cancel"),
					children: cancelLabel
				})
			})] }) : pending ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: `weixinpay-card-authtip${isRegistered ? " is-registered" : ""}`,
				children: authorizeTip
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "weixinpay-card-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
					className: "weixinpay-card-btn secondary",
					disabled: isSubmitting,
					onClick: () => handleAction("cancel"),
					children: cancelLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
					className: "weixinpay-card-btn primary",
					disabled: isSubmitting,
					onClick: () => setStep("qr"),
					children: confirmLabel
				})]
			})] }) : null]
		});
	};
	WeixinPayRenderer = class {
		constructor() {
			this.className = "weixinpay";
			this.theme = "border";
		}
		canHandle(tool) {
			return isWeixinpayToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		render(tool, _config, context) {
			if (!isWeixinpayToolCall(tool)) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(WeixinPayCard, {
				tool,
				context
			});
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/weixinpay/index.ts
var init_weixinpay = __esmMin((() => {
	init_weixinpay_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/write-to-file/write-to-file-renderer.scss
var init_write_to_file_renderer$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/write-to-file/write-to-file-renderer.tsx
/**
* 检查是否为 WriteFile 工具调用
*/
function isWriteFileToolCall(tool) {
	return [
		"write_to_file",
		"replace_in_file",
		"append_to_file",
		"Write",
		"Edit",
		"MultiEdit"
	].includes(tool.name);
}
var import_react$4, import_jsx_runtime$4, WRITE_FILE_VALIDATION_RULES, WriteFileToolAdapter, WriteFileRendererWithContext, WriteToFileRenderer;
var init_write_to_file_renderer = __esmMin((() => {
	init_write_to_file_renderer$1();
	init_src();
	init_lib();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_tool_icon_render_config();
	init_tool_protocol();
	import_jsx_runtime$4 = require_jsx_runtime();
	WRITE_FILE_VALIDATION_RULES = [{
		names: ["filePath", "file_path"],
		type: "string",
		required: false,
		nonEmpty: false
	}, {
		names: [
			"content",
			"new_str",
			"old_str"
		],
		type: "string",
		required: false,
		nonEmpty: false
	}];
	WriteFileToolAdapter = class {
		constructor(tool) {
			if (!isWriteFileToolCall(tool)) throw new Error(`Invalid tool type for WriteFileToolAdapter: ${tool.name}`);
			this.tool = tool;
		}
		/**
		* 收敛 args：orphan tool-call（仅带 result、无输入 args，来自 Mock 注入 / history
		* 回放 / ACP 边界）运行时 args 可能为 undefined，直读成员会抛
		* "Cannot read properties of undefined" 导致整页 crash。恒返回对象。
		*/
		get safeArgs() {
			return toRecordOrEmpty(this.tool.args);
		}
		/**
		* 获取文件路径，支持多种参数格式
		*
		* 每个候选值都过 toStringOrEmpty 做 runtime 收敛，保证返回值恒为 string，
		* 避免非字符串脏参数（对象/数组/数字）透传到下游 string 消费方（与 read-file 一致，
		* 参见 issue #62819）。
		*/
		getFilePath() {
			return toStringOrEmpty(this.safeArgs.filePath) || toStringOrEmpty(this.safeArgs.file_path) || toStringOrEmpty(this.safeArgs.name) || toStringOrEmpty(this.safeArgs.file) || toStringOrEmpty(this.safeArgs.path) || "";
		}
		/**
		* 获取新内容
		*/
		getContent() {
			return toStringOrEmpty(this.safeArgs.content) || toStringOrEmpty(this.safeArgs.new_str) || toStringOrEmpty(this.safeArgs.newContent) || "";
		}
		/**
		* 获取旧内容
		*/
		getOldContent() {
			const result = this.tool.result;
			return toStringOrEmpty(result?.result?.oldContent) || toStringOrEmpty(this.safeArgs.old_str) || toStringOrEmpty(this.safeArgs.oldContent) || "";
		}
		/**
		* 获取是否为新文件
		*/
		getIsNewFile() {
			return this.tool.result?.result?.isNewFile || this.getOldContent() === "" || this.getOldContent() === null;
		}
		/**
		* 获取添加的行数
		* 优先从结构化 result 读取；缺失时（历史数据）从 oldContent/content 计算 diff
		*/
		getAddedLines() {
			const storedCount = this.tool.result?.result?.addLineCount;
			if (storedCount !== void 0 && storedCount !== null) return storedCount;
			return this.computeDiffFromContent().addedLines;
		}
		/**
		* 获取删除的行数
		* 优先从结构化 result 读取；缺失时（历史数据）从 oldContent/content 计算 diff
		*/
		getRemovedLines() {
			const storedCount = this.tool.result?.result?.removedLines;
			if (storedCount !== void 0 && storedCount !== null) return storedCount;
			return this.computeDiffFromContent().removedLines;
		}
		/**
		* Fallback: 从 oldContent / content 调用 diffLines 计算增删行数
		* 仅当 result 中不含 addLineCount/removedLines 时被调用（历史数据场景）
		*/
		computeDiffFromContent() {
			const oldStr = this.getOldContent();
			const newStr = this.getContent();
			if (!oldStr || !newStr) return {
				addedLines: 0,
				removedLines: 0
			};
			const diffs = diffLines(oldStr, newStr, { ignoreNewlineAtEof: true });
			let addedLines = 0;
			let removedLines = 0;
			for (const part of diffs) if (part.added) addedLines += part.count && part.count > 0 ? part.count : part.value.endsWith("\n") ? part.value.split("\n").length - 1 : part.value.split("\n").length;
			else if (part.removed) removedLines += part.count && part.count > 0 ? part.count : part.value.endsWith("\n") ? part.value.split("\n").length - 1 : part.value.split("\n").length;
			return {
				addedLines,
				removedLines
			};
		}
		/**
		* 获取权限选项
		* 兼容多种数据源：
		* 1. tool.permissionOptions - 由真实 adapter 的 handlePermissionRequest 设置
		* 2. tool.args.permissionRequest.options - 由 mock 数据或旧版 adapter 设置
		* 3. tool.args._rawInput.permissionRequest.options - 由 EditToolAdapter 转换后的数据
		*/
		getPermissionOptions() {
			const { permissionOptions } = this.tool.metaData?.["acp_request_permission"] || {};
			if (permissionOptions) return permissionOptions;
		}
		/**
		* 获取 MultiEdit 的 edits 数组
		*/
		getEdits() {
			const edits = this.safeArgs.edits;
			if (!Array.isArray(edits) || edits.length === 0) return;
			return edits.map((edit) => ({
				oldString: toStringOrEmpty(edit.old_string) || toStringOrEmpty(edit.old_str) || "",
				newString: toStringOrEmpty(edit.new_string) || toStringOrEmpty(edit.new_str) || ""
			}));
		}
		/**
		* 转换为 WriteFileData 格式
		*/
		toWriteFileData() {
			return {
				filePath: this.getFilePath(),
				content: this.getContent(),
				oldContent: this.getOldContent(),
				isNewFile: this.getIsNewFile(),
				addedLines: this.getAddedLines(),
				removedLines: this.getRemovedLines(),
				edits: this.getEdits()
			};
		}
		/**
		* 获取 ToolCall 对象
		*/
		getToolCall() {
			return this.tool;
		}
	};
	WriteFileRendererWithContext = (0, import_react$4.memo)(function WriteFileRendererWithContext({ tool, context }) {
		const adapter = context?.adapter;
		const sessionId = context?.sessionId;
		const toolAdapter = (0, import_react$4.useMemo)(() => new WriteFileToolAdapter(tool), [tool]);
		const [localToolStatus, setLocalToolStatus] = import_react$4.useState(tool.status);
		const permissionMetaData = tool.metaData?.["acp_request_permission"];
		import_react$4.useEffect(() => {
			setLocalToolStatus(tool.status);
		}, [tool.status, permissionMetaData]);
		const shouldShowApprovalMenu = !!toolAdapter.getPermissionOptions() && (localToolStatus === "pending" || localToolStatus === "idle");
		const rendererConfig = (0, import_react$4.useMemo)(() => ({
			showApprovalMenu: shouldShowApprovalMenu,
			onFileClick: (filePath) => {
				context?.onFileClick?.(filePath);
			},
			onViewDiff: (filePath) => {
				context?.onFileClick?.(filePath);
			},
			onAccept: async (toolCall) => {
				try {
					const actualSessionId = sessionId || toolCall.id;
					const toolCallId = toolCall.id;
					if (adapter && actualSessionId && tool.metaData?.["acp_request_permission"]) {
						const requestPermission = tool.metaData?.["acp_request_permission"];
						const allowOption = requestPermission?.permissionOptions?.find((option) => option.kind === "allow_once");
						if (!allowOption) {
							console.warn("[WriteToFileRenderer] No allow permission option found for approve action", {
								sessionId: actualSessionId,
								toolCallId,
								permissionOptions: requestPermission?.permissionOptions
							});
							return;
						}
						const approveResult = await adapter.toolCallback(actualSessionId, toolCallId, toolCall.name, "approve");
						if (!approveResult.success) console.error("[WriteToFileRenderer] Approve toolCallback failed:", approveResult.error);
						await adapter.respondToPermission(actualSessionId, requestPermission?.requestId ?? "", [allowOption]);
						if (approveResult.success) {
							tool.status = "stream_executing";
							setLocalToolStatus("stream_executing");
						}
					} else console.warn("[WriteToFileRenderer] Missing adapter/sessionId/toolCallId for approve action", {
						adapter,
						sessionId: actualSessionId,
						toolCallId
					});
				} catch (err) {
					console.error("[WriteToFileRenderer] Approve action failed", err);
				}
			},
			onReject: async (toolCall) => {
				try {
					const actualSessionId = sessionId || toolCall.id;
					const toolCallId = toolCall.id;
					if (adapter && actualSessionId && toolCallId) {
						const requestPermission = tool.metaData?.["acp_request_permission"];
						await adapter.respondToPermission(actualSessionId, requestPermission?.requestId ?? "", [{
							optionId: "reject",
							name: "拒绝",
							kind: "reject_once"
						}]);
						tool.status = "cancelled";
						setLocalToolStatus("cancelled");
					} else console.warn("[WriteToFileRenderer] Missing adapter/sessionId/toolCallId for reject action", {
						adapter,
						sessionId: actualSessionId,
						toolCallId
					});
				} catch (err) {
					console.error("[WriteToFileRenderer] Reject action failed", err);
				}
			}
		}), [
			adapter,
			sessionId,
			tool,
			shouldShowApprovalMenu
		]);
		const isCompact = context?.compact ?? false;
		const cbRenderer = (0, import_react$4.useMemo)(() => createWriteFileRenderer({
			showDiff: true,
			compact: isCompact,
			...toolIconRenderConfig
		}), [isCompact]);
		const mergedConfig = (0, import_react$4.useMemo)(() => ({
			...rendererConfig,
			compact: isCompact,
			converter: (t) => {
				return new WriteFileToolAdapter(t).toWriteFileData();
			}
		}), [rendererConfig, isCompact]);
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(cbRenderer, {
			tool: (0, import_react$4.useMemo)(() => ({
				...tool,
				status: localToolStatus
			}), [tool, localToolStatus]),
			config: mergedConfig,
			isSessionActive: false
		});
	});
	WriteToFileRenderer = class {
		constructor(config) {
			this.className = "write-to-file";
			this.clickHeader = true;
			this.theme = "border";
		}
		canHandle(tool) {
			return isWriteFileToolCall(tool) ? ToolRendererPriority.EXACT : ToolRendererPriority.NONE;
		}
		/**
		* 主要的 render 方法 - 返回包装组件
		*/
		render(tool, config, context) {
			if (!isWriteFileToolCall(tool)) {
				console.warn("[WriteToFileRenderer] Invalid tool type:", tool.name, "- expected one of:", [
					"write_to_file",
					"replace_in_file",
					"append_to_file"
				]);
				return null;
			}
			try {
				return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ToolArgsValidator, {
					args: tool.args,
					rules: WRITE_FILE_VALIDATION_RULES,
					toolName: tool.name,
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(WriteFileRendererWithContext, {
						tool,
						context
					})
				});
			} catch (error) {
				console.error("[WriteToFileRenderer] Failed to process tool:", error);
				return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "write-to-file-error",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "error-icon",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "error-message",
							children: ["Error processing tool: ", error instanceof Error ? error.message : "Unknown error"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "error-details",
							children: [
								"Tool ID: ",
								tool.id,
								", Name: ",
								tool.name
							]
						})
					]
				});
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/write-to-file/index.ts
var init_write_to_file = __esmMin((() => {
	init_write_to_file_renderer();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/renderers/index.ts
var toolRenderers;
var init_renderers = __esmMin((() => {
	init_agent_mail();
	init_ask_followup_question();
	init_ask_user_question();
	init_automation_update();
	init_connect_cloud_service();
	init_defer_execute();
	init_delete_files();
	init_dispatch_specialist();
	init_enter_plan_mode();
	init_execute_command();
	init_exit_plan_mode();
	init_image_gen();
	init_list_files();
	init_mcp();
	init_mcp_tool_display();
	init_open_result_view();
	init_plan();
	init_plan_task();
	init_poi_pick();
	init_poi_result();
	init_read_file();
	init_read_lints();
	init_search_reference();
	init_send_message();
	init_skill();
	init_specialist_tools();
	init_task();
	init_team_create();
	init_team_delete();
	init_unknown_tool();
	init_video_gen();
	init_visualizer();
	init_web_fetch();
	init_web_search();
	init_weixinpay();
	init_write_to_file();
	toolRenderers = [
		new ReadFileRenderer(),
		new WriteToFileRenderer(),
		new DeleteFilesRenderer(),
		new ListFilesRenderer(),
		new ExecuteCommandRenderer(),
		new ConnectCloudServiceRenderer(),
		new DeferExecuteRenderer(),
		new DispatchSpecialistRenderer(),
		new SpecialistToolsRenderer(),
		new McpToolDisplayRenderer(),
		new ReadLintsRenderer(),
		new AskFollowupQuestionRenderer(),
		new AskUserQuestionRenderer(),
		new WeixinPayRenderer(),
		new WebFetchRenderer(),
		new WebSearchRenderer(),
		new SearchReferenceRenderer(),
		new SendMessageRenderer(),
		new PlanTaskRenderer(),
		new PlanCreateRenderer(),
		new PlanUpdateRenderer(),
		new TaskRenderer(),
		new TeamCreateRenderer(),
		new TeamDeleteRenderer(),
		new McpToolRendererWrapper(),
		new FetchMcpResourceRendererWrapper(),
		new McpMatchToolRendererWrapper(),
		new McpIntegrationRendererWrapper(),
		new SkillRenderer(),
		new ImageGenRenderer(),
		new VideoGenRenderer(),
		new OpenResultViewToolRenderer(),
		new AutomationUpdateRenderer(),
		new EnterPlanModeRenderer(),
		new ExitPlanModeRenderer(),
		new VisualizerReadMeRenderer(),
		new VisualizerShowWidgetRenderer(),
		new AgentMailRenderer(),
		new PoiPickRenderer(),
		new PoiResultRenderer(),
		new UnknownToolRenderer()
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/tool-registry.ts
var ToolRendererRegistry, toolRendererRegistry;
var init_tool_registry = __esmMin((() => {
	ToolRendererRegistry = class {
		constructor() {
			this.renderers = [];
		}
		/**
		* 注册工具渲染器
		*/
		register(renderer) {
			this.renderers.push(renderer);
		}
		/**
		* 获取适合的工具渲染器
		*/
		getRenderer(tool) {
			const candidates = this.renderers.map((renderer) => {
				return {
					priority: renderer.canHandle(tool) || 0,
					renderer
				};
			}).filter((candidate) => candidate.priority > 0).sort((a, b) => b.priority - a.priority);
			return candidates.length > 0 ? candidates[0].renderer : null;
		}
		/**
		* 获取所有注册的渲染器
		*/
		getAllRenderers() {
			return [...this.renderers];
		}
		/**
		* 移除所有渲染器
		*/
		clear() {
			this.renderers = [];
		}
	};
	toolRendererRegistry = new ToolRendererRegistry();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/tool-utils.ts
/**
* 计算 tool 卡片上方应展示的 explanation 文本。
*
* 通用规则（多处 wrapper 共享）：
* 1. 优先取模型显式给出的 `tool.args.explanation`（部分工具的标准入参）；
* 2. 兜底用 `tool.args.description`（多数业务工具的"自描述"入参）；
* 3. **例外**：execute_command 类工具已把 description 搬到 chip header 内显示，
*    本函数直接返回 `undefined`，避免外层再渲染重复内容。
*
* 与 `main-content-core.tsx` 旧实现完全等价，抽出后供 collab task-chat、colleague
* panel、detail panel wrapper 共用，避免多份手抄的去重逻辑漂移。
*/
function resolveToolExplanation(tool) {
	if (tool?.name && EXECUTE_COMMAND_TOOL_NAMES.has(tool.name)) return;
	const fromExplanation = tool?.args?.explanation;
	if (typeof fromExplanation === "string" && fromExplanation.trim()) return fromExplanation;
	const fromDescription = tool?.args?.description;
	if (typeof fromDescription === "string" && fromDescription.trim()) return fromDescription;
}
var EXECUTE_COMMAND_TOOL_NAMES;
var init_tool_utils = __esmMin((() => {
	EXECUTE_COMMAND_TOOL_NAMES = new Set([
		"Bash",
		"BashOutput",
		"KillShell",
		"execute_command",
		"execute"
	]);
}));
var init_tool_header_with_icon = __esmMin((() => {
	init_src();
	require_react();
	init_tool_icon_registry();
	require_jsx_runtime();
}));
var init_status_text = __esmMin((() => {
	require_react();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/tools/index.ts
var init_tools = __esmMin((() => {
	init_renderers();
	init_tool_registry();
	init_tool_protocol();
	init_tool_utils();
	init_tool_registry();
	init_tool_icon_registry();
	init_tool_header_with_icon();
	init_status_text();
	toolRenderers.forEach((renderer) => {
		toolRendererRegistry.register(renderer);
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/selection-quote/build-selection-quote-phrase-block.tsx
function buildSelectionQuotePhraseBlock({ name, selectedText, uri: sourceFile, title: fileName, quoteRef }) {
	return {
		type: "resource_link",
		name,
		uri: sourceFile ? `selection://${sourceFile}` : "selection://document-selection",
		_meta: {
			displayAsPhrase: true,
			displayAsContext: false,
			displayText: name,
			selectionQuote: true,
			mentionType: "selection",
			selectedText,
			title: fileName || name,
			quoteRef
		}
	};
}
var init_build_selection_quote_phrase_block = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/selection-quote/selection-quote-phrase-tag.less
var init_selection_quote_phrase_tag$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/selection-quote/selection-quote-phrase-tag.tsx
var import_react$1, import_jsx_runtime$1, SELECTION_QUOTE_TAG_CLASS, LocateIcon, TextSelectionIcon, SelectionQuotePopoverContent, SelectionQuotePhraseTag;
var init_selection_quote_phrase_tag = __esmMin((() => {
	init_selection_quote_phrase_tag$1();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_ArtifactFileTypeIcon();
	import_jsx_runtime$1 = require_jsx_runtime();
	SELECTION_QUOTE_TAG_CLASS = "slate-selection-quote-sceneTag";
	LocateIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillOpacity: "0.7",
			transform: "matrix(1 0 0 1 0 -0.00128174)",
			d: "M6.475 1.5315L6.475 0L7.525 0L7.525 1.5315Q9.4657 1.6983 10.8868 3.1196Q12.3054 4.5384 12.474 6.475L14 6.475L14 7.525L12.4752 7.525Q12.3104 9.4703 10.8868 10.8941Q9.4737 12.3074 7.5468 12.4803L7.547 14.5688L6.453 14.5689L6.4529 11.9574Q6.4462 11.7281 6.613 11.5706Q6.7705 11.4038 6.9998 11.4104Q8.8236 11.4104 10.1132 10.1207Q11.4028 8.8309 11.4028 7.0069Q11.4028 5.1828 10.1132 3.893Q8.8236 2.6033 6.9998 2.6033Q5.176 2.6033 3.8864 3.893Q2.5968 5.1828 2.5968 7.0069Q2.5968 8.3198 3.3116 9.4132Q4.0089 10.4798 5.1633 11.0104L4.7065 12.0044Q3.2658 11.3421 2.396 10.0118Q1.6459 8.8645 1.5258 7.525L0 7.525L0 6.475L1.5256 6.475Q1.6942 4.5384 3.1129 3.1196Q4.5341 1.6982 6.475 1.5315ZM8.2993 5.7007Q7.7611 5.1625 7 5.1625Q6.2389 5.1625 5.7007 5.7007Q5.1625 6.2389 5.1625 7Q5.1625 7.7611 5.7007 8.2993Q6.2389 8.8375 7 8.8375Q7.7611 8.8375 8.2993 8.2993Q8.8375 7.7611 8.8375 7Q8.8375 6.2389 8.2993 5.7007ZM6.4432 6.4432Q6.6738 6.2125 7 6.2125Q7.3262 6.2125 7.5568 6.4432Q7.7875 6.6738 7.7875 7Q7.7875 7.3262 7.5568 7.5568Q7.3262 7.7875 7 7.7875Q6.6738 7.7875 6.4432 7.5568Q6.2125 7.3262 6.2125 7Q6.2125 6.6738 6.4432 6.4432Z",
			fillRule: "evenodd"
		})
	});
	TextSelectionIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			fillOpacity: "0.9",
			transform: "matrix(1 0 0 1 1.04996 1.04992)",
			d: "M0.0001 5.4644L0.0001 5.5328L0.0001 6.3674L0.0001 6.4357Q0 8.4923 0.0965 9.1992Q0.2582 10.3839 0.8872 11.0129Q1.5162 11.6419 2.7009 11.8036Q3.4078 11.9001 5.4644 11.9001L5.5328 11.9001L6.3674 11.9001L6.4357 11.9001Q8.4923 11.9001 9.1992 11.8036Q10.3839 11.6419 11.0129 11.0129Q11.6419 10.3839 11.8036 9.1992Q11.9001 8.4923 11.9001 6.4357L11.9001 6.3674L11.9001 5.5328L11.9001 5.4644Q11.9001 3.4078 11.8036 2.7009Q11.6419 1.5162 11.0129 0.8872Q10.3839 0.2582 9.1992 0.0965Q8.4923 0 6.4357 0.0001L6.3674 0.0001L5.5328 0.0001L5.4644 0.0001Q3.4078 0 2.7009 0.0965Q1.5162 0.2582 0.8872 0.8872Q0.2582 1.5162 0.0965 2.7009Q0 3.4078 0.0001 5.4644ZM1.0501 6.3674L1.0501 5.5328L1.0501 5.4644Q1.05 3.4792 1.1368 2.8429Q1.2507 2.0086 1.6297 1.6297Q2.0086 1.2507 2.8429 1.1368Q3.4792 1.05 5.4644 1.0501L5.5328 1.0501L6.3674 1.0501L6.4358 1.0501Q8.421 1.05 9.0573 1.1368Q9.8915 1.2507 10.2705 1.6297Q10.6494 2.0086 10.7633 2.8429Q10.8501 3.4792 10.8501 5.4644L10.8501 5.5328L10.8501 6.3674L10.8501 6.4358Q10.8501 8.421 10.7633 9.0572Q10.6494 9.8915 10.2705 10.2705Q9.8915 10.6494 9.0572 10.7633Q8.421 10.8501 6.4358 10.8501L6.3674 10.8501L5.5328 10.8501L5.4644 10.8501Q3.4792 10.8501 2.8429 10.7633Q2.0086 10.6494 1.6297 10.2705Q1.2507 9.8915 1.1368 9.0572Q1.05 8.421 1.0501 6.4358L1.0501 6.3674ZM2.9118 3.6981L9.0368 3.6981L9.0368 4.7481L6.4993 4.7481L6.4993 9.3428L5.4493 9.3428L5.4493 4.7481L2.9118 4.7481L2.9118 3.6981Z",
			fillRule: "evenodd"
		})
	});
	SelectionQuotePopoverContent = ({ fileName, selectedText, showLocate, onLocate }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "sq-popover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "sq-popover__row sq-popover__row--title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "sq-popover__icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArtifactFileTypeIcon, {
					fileName,
					type: "solid",
					size: 14
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "sq-popover__filename",
				children: fileName
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "sq-popover__row sq-popover__row--selection",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "sq-popover__preview",
				children: selectedText
			}), showLocate && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				className: "sq-popover__locate-btn",
				"aria-label": "定位到文档",
				onMouseDown: (e) => {
					e.preventDefault();
					e.stopPropagation();
				},
				onClick: (e) => {
					e.stopPropagation();
					onLocate();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LocateIcon, {})
			})]
		})]
	});
	SelectionQuotePhraseTag = ({ block, onRemove, onClick, selected, focused, readOnly }) => {
		const meta = block._meta ?? {};
		const rawTitle = (typeof meta.title === "string" ? meta.title : "") || "";
		const fileName = rawTitle.includes("/") || rawTitle.includes("\\") ? rawTitle.split(/[/\\]/).pop() || rawTitle : rawTitle;
		const selectedText = meta.selectedText ?? "";
		const quoteRef = meta.quoteRef;
		const dispatchLocateEvent = (0, import_react$1.useCallback)((action) => {
			window.dispatchEvent(new CustomEvent("genie:locate-selection-quote", { detail: {
				quoteRef,
				selectedText,
				action,
				fileName
			} }));
		}, [
			quoteRef,
			selectedText,
			fileName
		]);
		const handleLocate = (0, import_react$1.useCallback)(() => {
			dispatchLocateEvent("locate");
		}, [dispatchLocateEvent]);
		const handleMouseEnter = (0, import_react$1.useCallback)(() => {
			if (!quoteRef || readOnly) return;
			dispatchLocateEvent("highlight");
		}, [
			quoteRef,
			readOnly,
			dispatchLocateEvent
		]);
		const tag = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InputContextTag, {
			block: (0, import_react$1.useMemo)(() => {
				const icon = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TextSelectionIcon, {});
				return {
					...block,
					_meta: {
						...block._meta ?? {},
						icon
					}
				};
			}, [block]),
			onRemove,
			onClick: onClick || handleLocate,
			selected: selected && focused,
			showCloseIcon: !readOnly,
			tooltipEnabled: false,
			className: `${SELECTION_QUOTE_TAG_CLASS}${readOnly ? "__readOnly" : ""}`,
			inline: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
			content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SelectionQuotePopoverContent, {
				fileName,
				selectedText,
				showLocate: !readOnly,
				onLocate: handleLocate
			}),
			placement: "top",
			interactive: !readOnly,
			noPadding: true,
			className: "sq-tooltip-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				onMouseEnter: handleMouseEnter,
				children: tag
			})
		});
	};
})), import_jsx_runtime, selectionQuotePhraseRenderer;
var init_selection_quote_phrase_renderer = __esmMin((() => {
	require_react();
	init_selection_quote_phrase_tag();
	import_jsx_runtime = require_jsx_runtime();
	selectionQuotePhraseRenderer = (props) => {
		if (!props.block._meta?.selectionQuote) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionQuotePhraseTag, {
			block: props.block,
			onRemove: props.onRemove,
			selected: props.selected,
			focused: props.focused,
			readOnly: props.readOnly
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/selection-quote/index.ts
var init_selection_quote = __esmMin((() => {
	init_build_selection_quote_phrase_block();
	init_selection_quote_phrase_tag();
	init_selection_quote_phrase_renderer();
}));
//#endregion
export { getToolIcon as A, getLatestSessionStatusFromHistory as C, normalizeColleagueSessionStatus as D, isColleagueSessionTerminal as E, init_html_artifact_preview as F, openArtifactUrlInExternalBrowser as I, shouldSkipBrowserPreview as L, isAgentMailUnfoldable as M, AgentMailActivationCard as N, shouldActivateQueueAfterSessionStatus as O, getHtmlArtifactPreviewUrl as P, extractSessionStatusFromNotification as S, isColleagueSessionRunning as T, getHiredExpertLabel as _, resolveToolExplanation as a, canEarlyReadyFromNetdriveHistory as b, init_renderers as c, formatProfileDateTime as d, getAgentDescription as f, getDaysOnDuty as g, getAgentTitle as h, init_tools as i, init_agent_mail as j, shouldDetachColleagueConnectionForRestart as k, toolRenderers as l, getAgentName as m, selectionQuotePhraseRenderer as n, init_tool_registry as o, getAgentManifest as p, buildSelectionQuotePhraseBlock as r, toolRendererRegistry as s, init_selection_quote as t, buildTaskRows as u, getWorkspaceRepoLabelKeys as v, init_session_status as w, extractSessionMode as x, init_assistant_profile_detail_utils as y };
