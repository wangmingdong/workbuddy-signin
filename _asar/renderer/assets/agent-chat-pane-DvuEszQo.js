import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Fs as ClawWorkspaceTitle, Is as init_workspace_title, hc as useClawWorkspaceChrome, mc as init_context, o as init_workbuddy_topbar, r as SidebarExpandButton, s as useDesktopWindowState } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { ct as Button, t as init_foundation } from "./foundation-QOglV606.js";
import { Pr as AddConversationIcon, Vt as PanelIcon } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { n as init_colleague_chat_page, s as init_colleagues_panel, t as ColleagueChatPage } from "./colleague-chat-page-0V48cBjA.js";
import { i as init_colleague_navigation_bus, n as colleagueConversationPatches$ } from "./colleague-navigation-bus-dCc--1VH.js";
import { i as init_enterprise_annotations, n as getEnterpriseFollowUpQuestions, r as getEnterpriseWelcomeMessage } from "./enterprise-annotations-C5uMojiF.js";
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/agent-chat-pane.less
var init_agent_chat_pane$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/claw-agent-chat-topbar.less
var init_claw_agent_chat_topbar$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/claw-agent-chat-topbar.tsx
/** 云/普通助理对话顶栏：复用 Claw 标题入口，并提供添加对话和主对话同款产物列开关。 */
function ClawAgentChatTopbar({ showDetailPanel, onToggleDetailPanel, onCreateConversation, creatingConversation = false }) {
	const t = useTranslation();
	const chrome = useClawWorkspaceChrome();
	const createConversationLabel = t("clawWorkspace.addConversation");
	const toggleLabel = showDetailPanel ? t("panel.hideDetailPanel") : t("panel.showDetailPanel");
	const { isDesktopMac, sidebarCollapsed, isFullscreen } = useDesktopWindowState();
	const showSidebarExpandInContent = !chrome?.showAssistantSwitcher || !chrome.pinned;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: `claw-agent-chat-topbar${showSidebarExpandInContent && isDesktopMac && sidebarCollapsed && !showDetailPanel && !isFullscreen ? " claw-agent-chat-topbar--mac-padding" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "claw-agent-chat-topbar__left",
			children: [showSidebarExpandInContent && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ClawWorkspaceTitle, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "claw-agent-chat-topbar__actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
				variant: "ghost",
				size: "medium",
				iconOnly: true,
				"aria-label": createConversationLabel,
				title: createConversationLabel,
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddConversationIcon, {}),
				disabled: creatingConversation,
				onClick: onCreateConversation
			}), !showDetailPanel && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
				variant: "ghost",
				size: "medium",
				iconOnly: true,
				"aria-label": toggleLabel,
				title: toggleLabel,
				leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PanelIcon, {}),
				onClick: onToggleDetailPanel
			})]
		})]
	});
}
var import_jsx_runtime$1;
var init_claw_agent_chat_topbar = __esmMin((() => {
	init_claw_agent_chat_topbar$1();
	require_react();
	init_foundation();
	init_useI18n();
	init_workbuddy_topbar();
	init_context();
	init_workspace_title();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/claw-workspace/tabs/agent-chat-pane.tsx
/** 按主对话同款规则计算内容最大宽度，避免宽屏下消息和输入框铺满整行。 */
function computeAgentChatMaxContentWidth(containerWidth) {
	if (containerWidth <= 1200) return DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH;
	if (containerWidth <= 1600) return containerWidth * .65;
	if (containerWidth <= 2e3) return containerWidth * .6;
	return Math.min(containerWidth * .55, 1400);
}
/** 云助理 / 普通助理 tab 的真实对话区，复用老同事对话页和产物预览能力。 */
function AgentChatPane({ agent, kind, isActive, specialists, avatar, avatarVariant, openTarget, onChatTargetReady, onSessionDeleted, showModelSelector, enterpriseAgentIds }) {
	const t = useTranslation();
	const specialistDisplayMap = import_react.useMemo(() => buildAgentDisplayInfoMap(specialists), [specialists]);
	const resolveExpertName = import_react.useCallback((expertId) => specialistDisplayMap.get(expertId)?.name, [specialistDisplayMap]);
	const resolveExpertDisplayInfo = import_react.useCallback((expertId) => specialistDisplayMap.get(expertId), [specialistDisplayMap]);
	const paneRef = import_react.useRef(null);
	const chatPageRef = import_react.useRef(null);
	const initialTargetRef = import_react.useRef(isSameAgentTarget(agent, openTarget?.agentId) ? openTarget : void 0);
	const appliedTargetSeqRef = import_react.useRef(initialTargetRef.current?.seq);
	const [chatInstanceId, setChatInstanceId] = import_react.useState(initialTargetRef.current?.instanceId ?? null);
	const [chatSessionId, setChatSessionId] = import_react.useState(initialTargetRef.current?.sessionId ?? null);
	const [chatSessionStatus, setChatSessionStatus] = import_react.useState(initialTargetRef.current?.sessionStatus ?? null);
	const isEnterprise = kind === "enterprise";
	const name = getAgentName(agent);
	const title = getAgentTitle(agent);
	const welcomeMessage = isEnterprise ? getEnterpriseWelcomeMessage(agent) : void 0;
	const followUpQuestions = isEnterprise ? getEnterpriseFollowUpQuestions(agent) : void 0;
	const description = getAgentDescription(agent);
	const tags = getAgentTags(agent);
	const isCloudAssistant = kind === "cloud";
	const [contentMaxWidth, setContentMaxWidth] = import_react.useState(DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH);
	const [creatingConversation, setCreatingConversation] = import_react.useState(false);
	import_react.useEffect(() => {
		const el = paneRef.current;
		if (!el || typeof ResizeObserver === "undefined") return;
		const updateContentMaxWidth = (width) => {
			const nextWidth = computeAgentChatMaxContentWidth(width);
			setContentMaxWidth((prev) => Math.abs(prev - nextWidth) < 1 ? prev : nextWidth);
		};
		updateContentMaxWidth(el.getBoundingClientRect().width);
		const observer = new ResizeObserver((entries) => {
			const width = entries[0]?.contentRect.width;
			if (typeof width === "number") updateContentMaxWidth(width);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	const paneStyle = import_react.useMemo(() => ({ "--claw-agent-chat-content-max-width": `${contentMaxWidth}px` }), [contentMaxWidth]);
	import_react.useEffect(() => {
		if (!openTarget || !isSameAgentTarget(agent, openTarget.agentId) || appliedTargetSeqRef.current === openTarget.seq) return;
		appliedTargetSeqRef.current = openTarget.seq;
		setChatInstanceId(openTarget.instanceId ?? null);
		setChatSessionId(openTarget.sessionId ?? null);
		setChatSessionStatus(openTarget.sessionStatus ?? null);
		const restartTarget = openTarget.instanceId ? {
			agentId: agent.id,
			instanceId: openTarget.instanceId,
			sessionId: openTarget.sessionId,
			sessionStatus: openTarget.sessionStatus ?? null
		} : {
			agentId: agent.id,
			target: "new"
		};
		chatPageRef.current?.restart(restartTarget).catch((error) => {
			console.warn("[AgentChatPane] restart from open target failed", error);
		});
	}, [agent, openTarget]);
	const handleCreateConversation = import_react.useCallback(() => {
		if (creatingConversation) return;
		setCreatingConversation(true);
		setChatInstanceId(null);
		setChatSessionId(null);
		setChatSessionStatus(null);
		const restartPromise = chatPageRef.current?.restart({
			agentId: agent.id,
			target: "new"
		});
		if (!restartPromise) {
			setCreatingConversation(false);
			return;
		}
		restartPromise.catch((error) => {
			console.warn("[AgentChatPane] create conversation failed", error);
		}).finally(() => {
			setCreatingConversation(false);
		});
	}, [agent.id, creatingConversation]);
	import_react.useEffect(() => {
		const sub = colleagueConversationPatches$.subscribe((patch) => {
			if (patch.type !== "remove-session") return;
			if (!chatSessionId || patch.sessionId !== chatSessionId) return;
			setChatInstanceId(null);
			setChatSessionId(null);
			setChatSessionStatus(null);
			onSessionDeleted?.({
				agentId: agent.id,
				instanceId: chatInstanceId ?? void 0,
				sessionId: patch.sessionId
			});
		});
		return () => sub.unsubscribe();
	}, [
		agent.id,
		chatInstanceId,
		chatSessionId,
		onSessionDeleted
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: paneRef,
		className: "claw-agent-chat-pane",
		style: paneStyle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueChatPage, {
			ref: chatPageRef,
			agentId: agent.id,
			model: agent.model || DEFAULT_CLOUD_AGENT_MODEL,
			name,
			title,
			description,
			tags,
			avatar: avatar ?? agent.avatar,
			avatarLabel: name.slice(0, 1),
			avatarVariant,
			initialInstanceId: chatInstanceId ?? void 0,
			initialSessionId: chatSessionId ?? void 0,
			initialSessionStatus: chatSessionStatus,
			enableColleagueMention: isCloudAssistant,
			isCloudAssistant,
			colleagueSuggestionAgents: isCloudAssistant ? specialists : void 0,
			resolveExpertName,
			resolveExpertDisplayInfo,
			showPreparingOverlayOnFirstSend: true,
			isEnterprise,
			welcomeMessage,
			followUpQuestions,
			showModelSelector,
			enterpriseAgentIds,
			onInstanceReady: ({ instanceId, sessionId }) => {
				setChatInstanceId(instanceId);
				if (sessionId) {
					setChatSessionId(sessionId);
					colleagueConversationPatches$.next({
						type: "append-session",
						instanceId,
						agentId: agent.id,
						session: {
							sessionId,
							sessionStatus: "ACTIVE"
						},
						pendingUntil: Date.now() + 8e3
					});
				}
				onChatTargetReady?.({
					agentId: agent.id,
					instanceId,
					sessionId,
					sessionStatus: chatSessionStatus
				});
			},
			onBack: () => {},
			variant: "floating",
			artifactPanelMode: "app-global",
			appDetailPanelActive: isActive,
			renderTopbar: ({ showDetailPanel, toggleDetailPanel }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClawAgentChatTopbar, {
				showDetailPanel,
				onToggleDetailPanel: toggleDetailPanel,
				onCreateConversation: handleCreateConversation,
				creatingConversation
			}),
			placeholder: t("colleagues.chat.placeholder", { name })
		})
	});
}
function isSameAgentTarget(agent, targetAgentId) {
	if (!targetAgentId) return false;
	return targetAgentId === agent.id || targetAgentId === agent.agentId;
}
function asRecord(value) {
	return value && typeof value === "object" ? value : {};
}
function firstNonEmptyString(...values) {
	for (const value of values) if (typeof value === "string" && value.trim()) return value.trim();
}
function getAgentNickname(agent) {
	const raw = agent;
	return firstNonEmptyString(raw.nickname, raw.nickName, raw.displayName, agent.agentName);
}
function buildAgentDisplayInfoMap(agents) {
	const map = /* @__PURE__ */ new Map();
	for (const agent of agents ?? []) {
		const info = {
			name: getAgentNickname(agent),
			avatarUrl: agent.avatar || void 0
		};
		for (const id of [agent.id, agent.agentId]) if (id) map.set(id, info);
	}
	return map;
}
function getAgentManifest(agent) {
	return agent.currentVersion?.manifest;
}
function getAgentName(agent) {
	return getAgentNickname(agent) || agent.agentId || `Agent ${agent.id}`;
}
function getAgentTitle(agent) {
	const title = asRecord(asRecord(getAgentManifest(agent)).annotations)[COLLEAGUE_TITLE_ANNOTATION_KEY];
	return typeof title === "string" && title.trim() ? title.trim() : "\xA0";
}
function getAgentDescription(agent) {
	const manifestDescription = asRecord(getAgentManifest(agent)).description;
	return agent.description || (typeof manifestDescription === "string" ? manifestDescription : "");
}
function getAgentTags(agent) {
	const tags = [agent.model, agent.currentVersionNumber].filter((tag) => Boolean(tag));
	return tags.length > 0 ? tags : ["Cloud Agent"];
}
var import_react, import_jsx_runtime, DEFAULT_CLOUD_AGENT_MODEL, COLLEAGUE_TITLE_ANNOTATION_KEY, DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH;
//#endregion
__esmMin((() => {
	init_colleagues_panel();
	init_agent_chat_pane$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_colleague_chat_page();
	init_colleague_navigation_bus();
	init_claw_agent_chat_topbar();
	init_enterprise_annotations();
	import_jsx_runtime = require_jsx_runtime();
	DEFAULT_CLOUD_AGENT_MODEL = "claude-4";
	COLLEAGUE_TITLE_ANNOTATION_KEY = "agent-title";
	DEFAULT_AGENT_CHAT_MAX_CONTENT_WIDTH = 832;
}))();
export { AgentChatPane };
