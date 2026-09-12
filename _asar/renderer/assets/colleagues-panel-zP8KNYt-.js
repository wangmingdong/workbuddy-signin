import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $u as init_utils, Ba as useModelSelector, Bs as reportAssistantCreateEntryClick, Gs as reportAssistantMoreMenuClick, Ls as init_telemetry, Md as init_purchase, Pd as openPurchaseModal, Tc as useAgentServices, U as init_expert, Us as reportAssistantMoreDeleteClick, V as init_hooks, Ws as reportAssistantMoreEditClick, X as init_use_expert_center, Xl as init_services, Xs as reportAssistantTrialClick, Z as useExpertCenter, Zl as useTencentDocsFacade, Zs as reportAssistantTrialLoadingShow, _n as groupUserConversationsByAgentId, a as WorkBuddyTopBar, ac as reportCreateTemplateMoreClick, bn as mergeTaskSources, bt as resolveAvatarUrl, cc as reportProfileEditClick, dc as reportRepositoryAuthResult, gn as buildTasksFromRawAgents, hn as buildTaskFromUserConversation, ic as reportCreateSubmitSuccess, lc as reportProfileTaskClick, lo as init_use_qq_bind_session, mn as applyPatches, mo as useQrDataUrl, nc as reportCreateExpertSelectClick, o as init_workbuddy_topbar, po as init_use_qr_data_url, rc as reportCreateModelSelectClick, sc as reportProfileChatClick, tc as reportCreateCancelClick, uc as reportRecommendAssistantChatClick, uo as useQQBindSession, vn as init_colleague_conversation_tasks, yn as isPatchAlive, yt as init_avatar_url, zs as reportAssistantCardProfileClick } from "./agent-mail-CiuzbR2o.js";
import { br as ModelSelect, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { D as Search, Et as Code, kt as CircleX, r as X, st as GitBranch, t as init_lucide_react } from "./lucide-react-CmX0JwWL.js";
import { u as useLocation } from "./dist-BlOCCi14.js";
import { $ as init_format, Q as formatRelativeTime, _t as useAccount, t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { A as message, F as init_Dropdown, H as Modal, I as Dropdown, ct as Button, k as init_Message, n as init_components, t as init_foundation, tt as Input } from "./foundation-QOglV606.js";
import { Bt as PhoneIcon, Ct as SearchIcon, E as XCloseIcon, Mr as AddIcon, Nt as RepoConnectIcon, Rt as QQIcon, dn as MailIcon, fr as BriefcaseIcon, n as init_icons, nr as ChevronRightIcon, or as CheckIcon, rr as ChevronLeftIcon, un as MemoryIcon, ur as ChatBubbleIcon, zt as PlaneIcon } from "./icons-Cj3UopO9.js";
import { i as useFloatingLayer, r as init_use_floating_layer } from "./floating-1_OFz6f-.js";
import { n as useI18n, r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { S as useRouterContextSafe, t as init_router } from "./router-O5ZnP5xt.js";
import { n as isIOAUser } from "./account-BDHahT9K.js";
import { R as init_constants, j as CONNECTOR_NO_AUTH } from "./ima-auth-store-Cq8i4JCG.js";
import { F as MoreDotsIcon, a as UserPlusIcon, r as init_icons$1 } from "./oauth-callback-IQ0UCaVX.js";
import { _ as getLocalizedText, h as useLocale, l as EXPERT_MARKETPLACE_BASE_URL, v as init_locale_text } from "./center-Cjtv6Q1N.js";
import { A as init_auth_guide, B as useTencentDocsStore, G as init_constants$1, R as init_store, T as init_empty_state, U as SELECTABLE_FILE_TYPES, Y as ListType, Z as init_types, a as init_use_file_list, b as VirtualList, c as init_folder_breadcrumb, i as useFileSearch, k as AuthGuide, l as init_tdoc_columns, n as useTdocCheckAuthGate, o as useFileList, r as init_use_file_search, s as FolderBreadcrumb, t as init_use_tdoc_check_auth_gate, u as useTDocColumns, w as EmptyState, x as init_file_list, z as tencentDocsStore } from "./use-tdoc-check-auth-gate-x9L7eHnu.js";
import { D as normalizeColleagueSessionStatus, w as init_session_status } from "./selection-quote-DtJWZOvE.js";
import { t as init_tencent_docs_panel } from "./tencent-docs-panel-DollW5xV.js";
import { t as init_upgrade_banner_character } from "./upgrade-banner-character-CQuD8aB4.js";
import { a as init_agent_status, i as resolveAvatarImageUrl, n as init_colleague_chat_page, o as mapAgentStatusToVariant, r as init_colleague_chat_page_helpers, s as init_colleagues_panel$1, t as ColleagueChatPage } from "./colleague-chat-page-0V48cBjA.js";
import { i as init_colleague_navigation_bus, n as colleagueConversationPatches$, r as colleagueConversationsChanged$, t as colleagueAgentListChanged$ } from "./colleague-navigation-bus-dCc--1VH.js";
//#region ../../packages/agent-ui/src/components/colleagues-panel/assistant-quota-limit-modal.less
var init_assistant_quota_limit_modal$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assistant-quota-utils.ts
/**
* 根据后端 quota plan 生成对应版本的上限弹窗文案（五档计费体系，Issue #59486）。
*
* 六档档位：default(体验版)/youth(青春版)/pro(标准版)/advanced(高级版)/flagship(旗舰版)/ultimate(企业版)。
* 旧值 `personal` 兼容映射到 `default`。
*/
function getAssistantQuotaLimitCopy(quota, t) {
	const limit = quota?.agentLimit ?? 0;
	switch (quota?.plan) {
		case "default":
		case "personal": return {
			content: t("colleagues.quotaLimit.trialContent", { limit }),
			okText: t("colleagues.quotaLimit.upgrade"),
			action: "upgrade"
		};
		case "youth": return {
			content: t("colleagues.quotaLimit.youthContent", { limit }),
			okText: t("colleagues.quotaLimit.upgrade"),
			action: "upgrade"
		};
		case "pro": return {
			content: t("colleagues.quotaLimit.standardContent", { limit }),
			okText: t("colleagues.quotaLimit.upgrade"),
			action: "upgrade"
		};
		case "advanced": return {
			content: t("colleagues.quotaLimit.advancedContent", { limit }),
			okText: t("colleagues.quotaLimit.upgrade"),
			action: "upgrade"
		};
		case "flagship": return {
			content: t("colleagues.quotaLimit.flagshipContent", { limit }),
			okText: t("colleagues.quotaLimit.confirm"),
			action: "close"
		};
		case "ultimate": return {
			content: t("colleagues.quotaLimit.enterpriseContent", { limit }),
			okText: t("colleagues.quotaLimit.confirm"),
			action: "close"
		};
		default: return {
			content: t("colleagues.quotaLimit.defaultContent", { limit }),
			okText: t("colleagues.quotaLimit.confirm"),
			action: "close"
		};
	}
}
function isAssistantQuotaExceeded(quota) {
	return Boolean(quota && quota.agentRemaining <= 0);
}
/**
* 助理配额上限弹窗“去升级”统一动作：端内打开购买套餐弹窗（复用 `PurchaseModal`）。
*
* 同事面板（`colleagues-panel`）和 `/claw` 创建入口（`use-assistant-quota-gate`）都调用此函数，
* 避免两处各自实现 `openWebWithLogin` 外跳逻辑导致行为不一致。
*/
function openAssistantPlanUpgrade(options) {
	openPurchaseModal({
		url: "/pricing?embed=1",
		source: "assistant_quota",
		onSuccess: options?.onSuccess
	});
}
var init_assistant_quota_utils = __esmMin((() => {
	init_purchase();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assistant-quota-limit-modal.tsx
/** 助理创建额度达到版本上限时的统一拦截弹窗。 */
function AssistantQuotaLimitModal({ open, quota, onClose, onUpgrade }) {
	const t = useTranslation();
	const copy = getAssistantQuotaLimitCopy(quota, t);
	const handlePrimaryClick = import_react$19.useCallback(() => {
		if (copy.action === "upgrade") {
			onUpgrade?.();
			return;
		}
		onClose();
	}, [
		copy.action,
		onClose,
		onUpgrade
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Modal, {
		open,
		onOpenChange: (nextOpen) => {
			if (!nextOpen) onClose();
		},
		title: t("colleagues.quotaLimit.title"),
		variant: "confirm",
		width: 480,
		centered: true,
		className: "assistant-quota-limit-modal",
		footer: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(Button, {
			variant: "primary",
			size: "small",
			onClick: handlePrimaryClick,
			children: copy.okText
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "assistant-quota-limit-modal__content",
			children: copy.content
		})
	});
}
var import_react$19, import_jsx_runtime$14;
var init_assistant_quota_limit_modal = __esmMin((() => {
	init_assistant_quota_limit_modal$1();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	init_assistant_quota_utils();
	import_jsx_runtime$14 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assets/cloud-assistant-illustration.png
var cloud_assistant_illustration_default;
var init_cloud_assistant_illustration = __esmMin((() => {
	cloud_assistant_illustration_default = "" + new URL("cloud-assistant-illustration-CovbOgaO.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/bind-channel-icons.tsx
var init_bind_channel_icons = __esmMin((() => {
	init_icons();
})), import_jsx_runtime$13, QQChannelDetail;
var init_qq_channel_detail = __esmMin((() => {
	require_react();
	init_components();
	init_icons();
	import_jsx_runtime$13 = require_jsx_runtime();
	QQChannelDetail = ({ qqState, qrSrc, isBound, qqBindTab, onSetQQBindTab, qqManualAppId, onSetQQManualAppId, qqManualAppSecret, onSetQQManualAppSecret, onQQManualSubmit, t }) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
		className: "bind-channel-qq-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "bind-channel-qq-tabs",
				role: "tablist",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": qqBindTab === "scan",
					className: `bind-channel-qq-tab${qqBindTab === "scan" ? " is-active" : ""}`,
					onClick: () => onSetQQBindTab("scan"),
					children: t("colleagues.bindChannel.channel.qq.tabScan")
				}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": qqBindTab === "manual",
					className: `bind-channel-qq-tab${qqBindTab === "manual" ? " is-active" : ""}`,
					onClick: () => onSetQQBindTab("manual"),
					children: t("colleagues.bindChannel.channel.qq.tabManual")
				})]
			}),
			qqBindTab === "scan" && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
				className: "bind-channel-qq-scan",
				children: isBound && qqState.binding ? /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
					className: "bind-channel-qq-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						className: "bind-channel-qq-success-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(CheckIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: t("colleagues.bindChannel.channel.qq.bindSuccess") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						className: "bind-channel-qq-credential",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("label", { children: t("colleagues.bindChannel.channel.qq.botIdLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("code", { children: qqState.binding.botId || "-" })]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [qrSrc && /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
					className: "bind-channel-qq-qrcode",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("img", {
						src: qrSrc,
						alt: t("colleagues.bindChannel.channel.qq.qrcodeAlt")
					}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("strong", { children: t("colleagues.bindChannel.channel.qq.scanTitle") }),
						/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: t("colleagues.bindChannel.channel.qq.scanDesc") }),
						qqState.bindToken && /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", {
							className: "bind-channel-qq-token",
							children: [t("colleagues.bindChannel.channel.qq.bindTokenLabel"), qqState.bindToken]
						})
					] })]
				}), qqState.error && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("p", {
					className: "bind-channel-qq-error",
					children: qqState.error
				})] })
			}),
			qqBindTab === "manual" && /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "bind-channel-qq-manual",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						className: "bind-channel-qq-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("label", { children: t("colleagues.bindChannel.channel.qq.appIdLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Input, {
							placeholder: t("colleagues.bindChannel.channel.qq.appIdPlaceholder"),
							value: qqManualAppId,
							onChange: (e) => onSetQQManualAppId(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
						className: "bind-channel-qq-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("label", { children: t("colleagues.bindChannel.channel.qq.appSecretLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Input, {
							type: "password",
							placeholder: t("colleagues.bindChannel.channel.qq.appSecretPlaceholder"),
							value: qqManualAppSecret,
							onChange: (e) => onSetQQManualAppSecret(e.target.value)
						})]
					}),
					qqState.manualError && /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("p", {
						className: "bind-channel-qq-error",
						children: qqState.manualError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Button, {
						variant: "primary",
						size: "small",
						disabled: qqState.isLoading || !qqManualAppId.trim() || !qqManualAppSecret.trim(),
						onClick: onQQManualSubmit,
						children: t("colleagues.bindChannel.channel.qq.manualSubmit")
					})
				]
			})
		]
	});
})), import_jsx_runtime$12, WechatBotDetail;
var init_wechat_bot_detail = __esmMin((() => {
	require_react();
	import_jsx_runtime$12 = require_jsx_runtime();
	WechatBotDetail = ({ wechatBotState, qrSrc, isBound, t }) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		className: "bind-channel-wechatbot-detail",
		children: [
			qrSrc && /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
				className: "bind-channel-wechatbot-qrcode",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
					src: qrSrc,
					alt: t("colleagues.bindChannel.channel.wechatBot.qrcodeAlt")
				}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: t("colleagues.bindChannel.channel.wechatBot.scanTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", { children: t("colleagues.bindChannel.channel.wechatBot.scanDesc") })] })]
			}),
			isBound && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", {
				className: "bind-channel-wechatbot-status",
				children: t("colleagues.bindChannel.channel.wechatBot.boundTo", { name: wechatBotState.binding?.displayName || wechatBotState.binding?.accountId || "-" })
			}),
			wechatBotState.error && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", {
				className: "bind-channel-wechatbot-error",
				children: wechatBotState.error
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/bind-channel-modal.tsx
var import_react$16, import_jsx_runtime$11, CONFIG_TABS, CHANNELS, normalizeInitialTab, toQrSrc, BindChannelModal;
var init_bind_channel_modal = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_bind_channel_icons();
	init_qq_channel_detail();
	init_wechat_bot_detail();
	import_jsx_runtime$11 = require_jsx_runtime();
	CONFIG_TABS = [{
		id: "assistant",
		labelKey: "colleagues.imConfig.tab.bindChannel"
	}, {
		id: "memory",
		labelKey: "colleagues.imConfig.tab.memory"
	}];
	CHANNELS = [
		{
			id: "wechatbot",
			labelKey: "colleagues.bindChannel.channel.wechatBot.name",
			descKey: "colleagues.bindChannel.channel.wechatBot.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ChatBubbleIcon, {})
		},
		{
			id: "wecom",
			labelKey: "colleagues.bindChannel.channel.wecom.name",
			descKey: "colleagues.bindChannel.channel.wecom.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(BriefcaseIcon, {})
		},
		{
			id: "dingtalk",
			labelKey: "colleagues.bindChannel.channel.dingtalk.name",
			descKey: "colleagues.bindChannel.channel.dingtalk.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(PhoneIcon, {})
		},
		{
			id: "feishu",
			labelKey: "colleagues.bindChannel.channel.feishu.name",
			descKey: "colleagues.bindChannel.channel.feishu.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(PlaneIcon, {})
		},
		{
			id: "qq",
			labelKey: "colleagues.bindChannel.channel.qq.name",
			descKey: "colleagues.bindChannel.channel.qq.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(QQIcon, {})
		},
		{
			id: "email",
			labelKey: "colleagues.bindChannel.channel.email.name",
			descKey: "colleagues.bindChannel.channel.email.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(MailIcon, {})
		}
	];
	normalizeInitialTab = (initialTab, initialSection) => {
		if (initialTab === "assistant" || initialSection === "assistant" || !initialTab) return "memory";
		if (initialTab) return initialTab;
		if (initialSection === "memory" || initialSection === "evolution" || initialSection === "usage") return "memory";
		return "assistant";
	};
	toQrSrc = (raw) => {
		if (!raw) return;
		if (raw.startsWith("data:") || raw.startsWith("http")) return raw;
		return `data:image/png;base64,${raw}`;
	};
	BindChannelModal = ({ open, colleagueName, colleagueTitle, colleagueAvatarLabel, colleagueAvatarVariant = 1, initialTab, initialSection, restrictedChannelIds = [], colleagues = [], selectedColleagueId, onSelectColleague, selectedMemoryColleagueId, onSelectMemoryColleague, onToggleColleagueMemory, isTogglingColleagueMemory = false, colleagueMemoryError, onActiveTabChange, wechatMiniState, onOpenWechatMini, onCloseWechatMiniQrcode, wechatBotState, qqState, onClose, onBindChannel, onUnbindWechatBot, onUnbindQQ, onQQManualSubmit, onEditProfile }) => {
		const t = useTranslation();
		const [activeTab, setActiveTab] = import_react$16.useState(() => normalizeInitialTab(initialTab, initialSection));
		const [qqBindTab, setQQBindTab] = import_react$16.useState("scan");
		const [qqManualAppId, setQQManualAppId] = import_react$16.useState("");
		const [qqManualAppSecret, setQQManualAppSecret] = import_react$16.useState("");
		const wechatBotBinding = wechatBotState?.binding;
		const isWechatBotBound = Boolean(wechatBotBinding?.enabled && wechatBotBinding.status === "bound");
		const wechatBotQrSrc = toQrSrc(wechatBotState?.qrcodeImgContent);
		const wechatMiniQrSrc = toQrSrc(wechatMiniState?.qrcodeImgContent);
		const isQQBound = Boolean(qqState?.binding?.enabled && qqState.binding.status === "bound");
		const qqQrSrc = toQrSrc(qqState?.qrcodeImgContent);
		import_react$16.useEffect(() => {
			if (!open) return;
			const nextTab = normalizeInitialTab(initialTab, initialSection);
			setActiveTab(nextTab);
			onActiveTabChange?.(nextTab);
			const handleKeyDown = (event) => {
				if (event.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [
			open,
			initialTab,
			initialSection,
			onActiveTabChange,
			onClose
		]);
		import_react$16.useEffect(() => {
			if (!open || activeTab !== "colleague" || selectedColleagueId || colleagues.length === 0) return;
			onSelectColleague?.(colleagues[0].id);
		}, [
			activeTab,
			colleagues,
			onSelectColleague,
			open,
			selectedColleagueId
		]);
		import_react$16.useEffect(() => {
			if (!open || activeTab !== "memory" || selectedMemoryColleagueId || colleagues.length === 0) return;
			onSelectMemoryColleague?.(colleagues[0].id);
		}, [
			activeTab,
			colleagues,
			onSelectMemoryColleague,
			open,
			selectedMemoryColleagueId
		]);
		const handleOverlayMouseDown = import_react$16.useCallback((event) => {
			if (event.target === event.currentTarget) onClose();
		}, [onClose]);
		const handlePickTab = import_react$16.useCallback((tab) => {
			setActiveTab(tab);
			onActiveTabChange?.(tab);
		}, [onActiveTabChange]);
		const selectedMemoryColleague = import_react$16.useMemo(() => colleagues.find((item) => item.id === selectedMemoryColleagueId) ?? colleagues[0] ?? null, [colleagues, selectedMemoryColleagueId]);
		const selectedMemoryEnabled = selectedMemoryColleague?.memoryEnabled !== false;
		const handleToggleColleagueMemory = import_react$16.useCallback(() => {
			if (!selectedMemoryColleague || isTogglingColleagueMemory) return;
			onToggleColleagueMemory?.(selectedMemoryColleague.id, !selectedMemoryEnabled);
		}, [
			isTogglingColleagueMemory,
			onToggleColleagueMemory,
			selectedMemoryColleague,
			selectedMemoryEnabled
		]);
		const renderColleagueAvatar = (item) => {
			if (item.avatar) return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("img", {
				src: item.avatar,
				alt: "",
				"aria-hidden": "true"
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { children: item.avatarLabel ?? item.name.slice(0, 1) });
		};
		const handleQQManualSubmit = import_react$16.useCallback(() => {
			if (!qqManualAppId.trim() || !qqManualAppSecret.trim()) return;
			onQQManualSubmit?.(qqManualAppId.trim(), qqManualAppSecret.trim());
		}, [
			onQQManualSubmit,
			qqManualAppId,
			qqManualAppSecret
		]);
		const renderChannelList = () => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("ul", {
			className: "bind-channel-list",
			"aria-label": t("colleagues.bindChannel.section.channel"),
			children: CHANNELS.filter((channel) => !restrictedChannelIds.includes(channel.id)).map((channel) => {
				const isWechatBot = channel.id === "wechatbot";
				const isQQ = channel.id === "qq";
				return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("li", {
					className: "bind-channel-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
							className: "bind-channel-row-icon",
							"aria-hidden": "true",
							children: channel.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							className: "bind-channel-row-main",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
								className: "bind-channel-row-title-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("strong", { children: t(channel.labelKey) }), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
									className: "bind-channel-row-dot",
									"aria-hidden": "true"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
								className: "bind-channel-row-desc",
								children: t(channel.descKey)
							})]
						}),
						isWechatBot && isWechatBotBound ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							className: "bind-channel-row-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
									className: "bind-channel-row-default",
									"aria-label": t("colleagues.bindChannel.channel.bound"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(CheckIcon, {}), t("colleagues.bindChannel.channel.bound")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
									type: "button",
									className: "bind-channel-row-action is-secondary",
									disabled: wechatBotState?.isLoading,
									onClick: () => onBindChannel?.(channel.id),
									children: t("colleagues.bindChannel.channel.rebind")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
									type: "button",
									className: "bind-channel-row-action is-danger",
									disabled: wechatBotState?.isLoading,
									onClick: () => onUnbindWechatBot?.(),
									children: t("colleagues.bindChannel.channel.unbind")
								})
							]
						}) : isQQ && isQQBound ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
							className: "bind-channel-row-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
									className: "bind-channel-row-default",
									"aria-label": t("colleagues.bindChannel.channel.bound"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(CheckIcon, {}), t("colleagues.bindChannel.channel.bound")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
									type: "button",
									className: "bind-channel-row-action is-secondary",
									disabled: qqState?.isLoading,
									onClick: () => onBindChannel?.(channel.id),
									children: t("colleagues.bindChannel.channel.rebind")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
									type: "button",
									className: "bind-channel-row-action is-danger",
									disabled: qqState?.isLoading,
									onClick: () => onUnbindQQ?.(),
									children: t("colleagues.bindChannel.channel.unbind")
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
							type: "button",
							className: "bind-channel-row-action",
							disabled: isWechatBot && wechatBotState?.isLoading || isQQ && qqState?.isLoading,
							onClick: () => onBindChannel?.(channel.id),
							children: isWechatBot && wechatBotState?.isLoading || isQQ && qqState?.isLoading ? t("colleagues.bindChannel.channel.processing") : t("colleagues.bindChannel.channel.bind")
						}),
						isWechatBot && wechatBotState && (wechatBotQrSrc || wechatBotBinding || wechatBotState.error) && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(WechatBotDetail, {
							wechatBotState,
							qrSrc: wechatBotQrSrc,
							isBound: isWechatBotBound,
							t
						}),
						isQQ && qqState && (qqQrSrc || qqState.binding || qqState.error) && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(QQChannelDetail, {
							qqState,
							qrSrc: qqQrSrc,
							isBound: isQQBound,
							qqBindTab,
							onSetQQBindTab: setQQBindTab,
							qqManualAppId,
							onSetQQManualAppId: setQQManualAppId,
							qqManualAppSecret,
							onSetQQManualAppSecret: setQQManualAppSecret,
							onQQManualSubmit: handleQQManualSubmit,
							t
						})
					]
				}, channel.id);
			})
		});
		if (!open) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
			className: "bind-channel-overlay",
			onMouseDown: handleOverlayMouseDown,
			children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("section", {
				className: "bind-channel-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "bind-channel-title",
				onMouseDown: (event) => event.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("header", {
					className: "bind-channel-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("h2", {
						id: "bind-channel-title",
						children: t("colleagues.imConfig.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
						type: "button",
						className: "bind-channel-close",
						"aria-label": t("common.close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(XCloseIcon, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: "bind-channel-layout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("aside", {
						className: "bind-channel-sidebar",
						"aria-label": t("colleagues.imConfig.sidebarLabel"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							className: "bind-channel-sidebar-title",
							children: t("colleagues.imConfig.sidebarTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("nav", {
							className: "bind-channel-nav",
							role: "tablist",
							"aria-orientation": "vertical",
							children: CONFIG_TABS.map((tab) => {
								const isActive = tab.id === activeTab;
								const isHidden = tab.id === "assistant" && true;
								return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
									type: "button",
									role: "tab",
									"aria-selected": isActive,
									"aria-hidden": isHidden,
									tabIndex: isHidden ? -1 : void 0,
									className: `bind-channel-nav-item${isActive ? " is-active" : ""}`,
									style: { display: isHidden ? "none" : void 0 },
									onClick: () => handlePickTab(tab.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
										className: "bind-channel-nav-label",
										children: t(tab.labelKey)
									})
								}, tab.id);
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("section", {
						className: "bind-channel-content",
						"aria-labelledby": "bind-channel-content-title",
						children: [
							activeTab === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("header", {
									className: "bind-channel-content-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("h3", {
										id: "bind-channel-content-title",
										children: t("colleagues.imConfig.assistant.heading")
									}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("p", { children: t("colleagues.imConfig.assistant.subtitle") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("ul", {
									className: "bind-channel-list",
									"aria-label": t("colleagues.bindChannel.section.channel"),
									children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("li", {
										className: "bind-channel-row",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
												className: "bind-channel-row-icon bind-channel-row-icon--wechat-mini",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ChatBubbleIcon, {})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
												className: "bind-channel-row-main",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
													className: "bind-channel-row-title-line",
													children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("strong", { children: t("colleagues.bindChannel.channel.wechatMini.name") })
												}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: "bind-channel-row-desc",
													children: t("colleagues.bindChannel.channel.wechatMini.desc")
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
												type: "button",
												className: "bind-channel-row-action",
												disabled: wechatMiniState?.isLoading,
												onClick: () => onOpenWechatMini?.(),
												children: t("colleagues.bindChannel.channel.wechatMini.open")
											})
										]
									})
								}),
								wechatMiniQrSrc && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
									className: "bind-channel-wechat-mini-qrcode-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("img", {
										className: "bind-channel-wechat-mini-qrcode-img",
										src: wechatMiniQrSrc,
										alt: t("colleagues.bindChannel.channel.wechatMini.qrcodeAlt")
									}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
										className: "bind-channel-wechat-mini-qrcode-info",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("strong", { children: t("colleagues.bindChannel.channel.wechatMini.scanTitle") }),
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("p", { children: t("colleagues.bindChannel.channel.wechatMini.scanDesc") }),
											wechatMiniState?.scanStatusText && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
												className: "bind-channel-wechat-mini-scan-status",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: "bind-channel-row-dot",
													"aria-hidden": "true"
												}), wechatMiniState.scanStatusText]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
												type: "button",
												className: "bind-channel-wechat-mini-cancel",
												onClick: () => onCloseWechatMiniQrcode?.(),
												children: t("common.cancel")
											})
										]
									})]
								}),
								colleagues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
									className: "bind-channel-colleague-status-section",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
										className: "bind-channel-colleague-status-header",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
											className: "bind-channel-colleague-status-title",
											children: t("colleagues.imConfig.assistant.colleagueListTitle")
										}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
											className: "bind-channel-colleague-status-summary",
											children: t("colleagues.imConfig.assistant.colleagueListSummary", { total: colleagues.length })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("ul", {
										className: "bind-channel-colleague-status-list",
										children: colleagues.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("li", {
											className: "bind-channel-colleague-status-row",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: "bind-channel-colleague-status-avatar",
													"aria-hidden": "true",
													children: renderColleagueAvatar(item)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
													className: "bind-channel-colleague-status-main",
													children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
														className: "bind-channel-colleague-status-name",
														children: item.name
													}), item.title && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
														className: "bind-channel-colleague-status-title-text",
														children: item.title
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: `bind-channel-colleague-status-badge${item.connected ? " is-connected" : ""}`,
													children: item.connected ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
														className: "bind-channel-row-dot",
														"aria-hidden": "true"
													}), t("colleagues.imConfig.assistant.connected")] }) : t("colleagues.imConfig.assistant.notConnected")
												})
											]
										}, item.id))
									})]
								})
							] }),
							activeTab === "colleague" && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("header", {
									className: "bind-channel-content-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("h3", {
										id: "bind-channel-content-title",
										children: t("colleagues.imConfig.colleague.heading")
									}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("p", { children: t("colleagues.imConfig.colleague.subtitle") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
									className: "bind-channel-colleague-switch",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
										className: "bind-channel-colleague-switch-label",
										children: t("colleagues.imConfig.colleague.switchLabel")
									}), colleagues.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
										className: "bind-channel-colleague-tabs",
										role: "list",
										children: colleagues.map((item) => {
											return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("button", {
												type: "button",
												className: `bind-channel-colleague-tab${item.id === selectedColleagueId ? " is-active" : ""}`,
												onClick: () => onSelectColleague?.(item.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: "bind-channel-colleague-tab-avatar",
													"aria-hidden": "true",
													children: renderColleagueAvatar(item)
												}), item.name]
											}, item.id);
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
										className: "bind-channel-colleague-empty",
										children: t("colleagues.imConfig.colleague.empty")
									})]
								}),
								renderChannelList()
							] }),
							activeTab === "memory" && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("header", {
									className: "bind-channel-content-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("h3", {
										id: "bind-channel-content-title",
										children: t("colleagues.imConfig.memory.heading")
									}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("p", { children: t("colleagues.imConfig.memory.subtitle") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
									className: "bind-channel-colleague-switch",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
										className: "bind-channel-colleague-switch-label",
										children: t("colleagues.imConfig.colleague.switchLabel")
									}), colleagues.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
										className: "bind-channel-colleague-tabs",
										role: "list",
										children: colleagues.map((item) => {
											return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("button", {
												type: "button",
												className: `bind-channel-colleague-tab${item.id === selectedMemoryColleague?.id ? " is-active" : ""}`,
												onClick: () => onSelectMemoryColleague?.(item.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: "bind-channel-colleague-tab-avatar",
													"aria-hidden": "true",
													children: renderColleagueAvatar(item)
												}), item.name]
											}, item.id);
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
										className: "bind-channel-colleague-empty",
										children: t("colleagues.imConfig.colleague.empty")
									})]
								}),
								selectedMemoryColleague && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("ul", {
									className: "bind-channel-list",
									"aria-label": t("colleagues.imConfig.memory.heading"),
									children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("li", {
										className: "bind-channel-row",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
												className: "bind-channel-row-icon",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(MemoryIcon, {})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
												className: "bind-channel-row-main",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
													className: "bind-channel-row-title-line",
													children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("strong", { children: t("colleagues.imConfig.memory.switch.name") }), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
														className: "bind-channel-row-dot",
														"aria-hidden": "true"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: "bind-channel-row-desc",
													children: t("colleagues.imConfig.memory.switch.desc")
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
												type: "button",
												role: "switch",
												"aria-checked": selectedMemoryEnabled,
												"aria-label": t("colleagues.imConfig.memory.switch.aria"),
												className: `bind-channel-switch${selectedMemoryEnabled ? " is-on" : ""}`,
												disabled: isTogglingColleagueMemory || !onToggleColleagueMemory,
												onClick: handleToggleColleagueMemory,
												children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
													className: "bind-channel-switch-thumb",
													"aria-hidden": "true"
												})
											})
										]
									})
								}),
								colleagueMemoryError && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("p", {
									className: "bind-channel-memory-error",
									children: colleagueMemoryError
								})
							] })
						]
					})]
				})]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/colleague-conversation-delete-confirm-dialog.tsx
var import_react$15, import_jsx_runtime$10, AlertCircleIcon, ColleagueConversationDeleteConfirmDialog;
var init_colleague_conversation_delete_confirm_dialog = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$10 = require_jsx_runtime();
	AlertCircleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("svg", {
		width: "38",
		height: "38",
		viewBox: "0 0 38 38",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("circle", {
				cx: "19",
				cy: "19",
				r: "17",
				stroke: "currentColor",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", {
				d: "M19 10.5v11",
				stroke: "currentColor",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("circle", {
				cx: "19",
				cy: "27",
				r: "1.8",
				fill: "currentColor"
			})
		]
	});
	ColleagueConversationDeleteConfirmDialog = ({ visible, title, loading = false, onCancel, onConfirm }) => {
		const t = useTranslation();
		(0, import_react$15.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (event) => {
				if (event.key === "Escape" && !loading) onCancel();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [
			loading,
			onCancel,
			visible
		]);
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "colleague-conversation-delete-confirm-overlay",
			onMouseDown: () => !loading && onCancel(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("section", {
				className: "colleague-conversation-delete-confirm-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "colleague-conversation-delete-confirm-title",
				"aria-describedby": "colleague-conversation-delete-confirm-description",
				onMouseDown: (event) => event.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "colleague-conversation-delete-confirm-icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AlertCircleIcon, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
					className: "colleague-conversation-delete-confirm-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h2", {
							id: "colleague-conversation-delete-confirm-title",
							children: t("colleagues.conversation.deleteConfirmTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
							className: "colleague-conversation-delete-confirm-question",
							children: t("colleagues.conversation.deleteConfirmQuestion", { title })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
							id: "colleague-conversation-delete-confirm-description",
							children: t("colleagues.conversation.deleteConfirmDescription")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
							className: "colleague-conversation-delete-confirm-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
								type: "button",
								className: "colleague-conversation-delete-confirm-cancel",
								onClick: onCancel,
								disabled: loading,
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
								type: "button",
								className: "colleague-conversation-delete-confirm-delete",
								onClick: onConfirm,
								disabled: loading,
								children: t("common.delete")
							})]
						})
					]
				})]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/colleagues-chat-float-colleague-rail.less
var init_colleagues_chat_float_colleague_rail$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/colleagues-chat-float-colleague-rail.tsx
var import_react$14, import_jsx_runtime$9, COLLEAGUE_RAIL_PAGE_SIZE, ColleaguesChatFloatColleagueRail;
var init_colleagues_chat_float_colleague_rail = __esmMin((() => {
	init_colleagues_chat_float_colleague_rail$1();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$9 = require_jsx_runtime();
	COLLEAGUE_RAIL_PAGE_SIZE = 8;
	ColleaguesChatFloatColleagueRail = ({ orchestratorAgent, colleagues, activeColleagueId, getColleagueName, getColleagueTitle, renderAvatar, onSelect, onRefreshSessions, onCreateNew, activeTaskList, hasHistorySessionsFor }) => {
		const t = useTranslation();
		const [pageIndex, setPageIndex] = import_react$14.useState(0);
		const pageCount = Math.max(1, Math.ceil(colleagues.length / COLLEAGUE_RAIL_PAGE_SIZE));
		const boundedPageIndex = Math.min(pageIndex, pageCount - 1);
		const pageStart = boundedPageIndex * COLLEAGUE_RAIL_PAGE_SIZE;
		const visibleColleagues = import_react$14.useMemo(() => colleagues.slice(pageStart, pageStart + COLLEAGUE_RAIL_PAGE_SIZE), [colleagues, pageStart]);
		/**
		* 用户「显式收起」过的激活同事 id。
		* 用 Set 做记忆，使「点击当前激活同事头像 → 收起会话列表」之后再回到该同事
		* 仍然保持收起态，直到用户再次点头像展开。
		*/
		const [collapsedActiveIds, setCollapsedActiveIds] = import_react$14.useState(/* @__PURE__ */ new Set());
		/** 已经为哪个激活同事执行过自动翻页，避免数据刷新覆盖用户当前页。 */
		const autoPagedActiveIdRef = import_react$14.useRef(null);
		/** 当前激活同事是否处于「展开会话列表」状态。 */
		const isActiveExpanded = activeColleagueId !== null && !collapsedActiveIds.has(activeColleagueId);
		/** 切换激活同事时如果新激活同事之前是「收起态」，自动重置为展开（默认展开）。 */
		import_react$14.useEffect(() => {
			if (!activeColleagueId) return;
			setCollapsedActiveIds((prev) => {
				if (!prev.has(activeColleagueId)) return prev;
				const next = new Set(prev);
				next.delete(activeColleagueId);
				return next;
			});
		}, [activeColleagueId]);
		import_react$14.useEffect(() => {
			setPageIndex((current) => Math.min(current, pageCount - 1));
		}, [pageCount]);
		import_react$14.useEffect(() => {
			if (!activeColleagueId) {
				autoPagedActiveIdRef.current = null;
				return;
			}
			if (activeColleagueId === orchestratorAgent?.id) {
				autoPagedActiveIdRef.current = activeColleagueId;
				return;
			}
			if (autoPagedActiveIdRef.current === activeColleagueId) return;
			const activeIndex = colleagues.findIndex((colleague) => colleague.id === activeColleagueId);
			if (activeIndex < 0) return;
			setPageIndex(Math.floor(activeIndex / COLLEAGUE_RAIL_PAGE_SIZE));
			autoPagedActiveIdRef.current = activeColleagueId;
		}, [
			activeColleagueId,
			colleagues,
			orchestratorAgent?.id
		]);
		const handleItemClick = import_react$14.useCallback((colleague, kind) => {
			const isActive = colleague.id === activeColleagueId;
			const hasHistory = hasHistorySessionsFor?.(colleague) ?? false;
			if (!isActive) {
				onSelect(colleague);
				return;
			}
			if (kind === "assistant") {
				onCreateNew?.();
				return;
			}
			onRefreshSessions?.(colleague);
			if (!hasHistory) return;
			setCollapsedActiveIds((prev) => {
				const next = new Set(prev);
				if (next.has(colleague.id)) next.delete(colleague.id);
				else next.add(colleague.id);
				return next;
			});
		}, [
			activeColleagueId,
			hasHistorySessionsFor,
			onCreateNew,
			onRefreshSessions,
			onSelect
		]);
		const renderRailItem = import_react$14.useCallback((colleague, avatarVariant, kind = "colleague") => {
			const colleagueName = kind === "assistant" ? "云助理" : getColleagueName(colleague);
			const colleagueTitle = kind === "assistant" ? "" : getColleagueTitle(colleague).trim();
			const isActive = colleague.id === activeColleagueId;
			const hasHistory = hasHistorySessionsFor?.(colleague) ?? false;
			const isExpanded = kind === "assistant" ? isActive : isActive && isActiveExpanded;
			const showTaskList = kind === "assistant" ? isActive && isExpanded && Boolean(activeTaskList) : isActive && isExpanded && hasHistory && Boolean(activeTaskList);
			const showChevron = kind !== "assistant" && hasHistory;
			const item = /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
				type: "button",
				className: `colleagues-chat-float__expert-item${isActive ? " is-active" : ""}${showTaskList ? " is-expanded" : ""}`,
				"data-kind": kind,
				"aria-label": colleagueName,
				"aria-current": isActive ? "true" : void 0,
				"aria-expanded": showChevron ? showTaskList : void 0,
				title: colleagueName,
				onClick: () => handleItemClick(colleague, kind),
				children: [
					renderAvatar(colleague, avatarVariant, "colleagues-chat-float__expert-avatar"),
					/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("span", {
						className: "colleagues-chat-float__expert-meta",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("strong", { children: colleagueName }), colleagueTitle && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
							className: "colleagues-chat-float__expert-role",
							children: colleagueTitle
						})]
					}),
					showChevron && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: `colleagues-chat-float__expert-chevron${showTaskList ? " is-expanded" : ""}`,
						"aria-hidden": "true"
					})
				]
			});
			if (kind === "assistant") return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [item, showTaskList && activeTaskList && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: "colleagues-chat-float__expert-tasks",
				children: activeTaskList
			})] });
			return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
				className: `colleagues-chat-float__expert-group${isActive ? " is-active" : ""}`,
				role: "listitem",
				children: [item, showTaskList && activeTaskList && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "colleagues-chat-float__expert-tasks",
					children: activeTaskList
				})]
			}, colleague.id);
		}, [
			activeColleagueId,
			activeTaskList,
			getColleagueName,
			getColleagueTitle,
			handleItemClick,
			hasHistorySessionsFor,
			isActiveExpanded,
			renderAvatar
		]);
		const hasPagination = colleagues.length > COLLEAGUE_RAIL_PAGE_SIZE;
		const canGoPrevious = boundedPageIndex > 0;
		const canGoNext = boundedPageIndex < pageCount - 1;
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("nav", {
			className: "colleagues-chat-float__expert-rail",
			"aria-label": t("conversation.experts"),
			children: [
				orchestratorAgent && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "colleagues-chat-float__expert-pin",
					children: renderRailItem(orchestratorAgent, 0, "assistant")
				}),
				orchestratorAgent && colleagues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "colleagues-chat-float__expert-divider",
					role: "separator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "colleagues-chat-float__expert-list",
					role: "list",
					children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "colleagues-chat-float__expert-page",
						role: "group",
						"aria-label": t("colleagues.chat.expertRail.currentPage"),
						children: visibleColleagues.map((colleague, index) => renderRailItem(colleague, pageStart + index + 1))
					})
				}),
				hasPagination && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "colleagues-chat-float__expert-pager",
					"aria-label": t("colleagues.chat.expertRail.pagination"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
							type: "button",
							className: "colleagues-chat-float__expert-pager-btn",
							"aria-label": t("colleagues.chat.expertRail.previousPage"),
							title: t("colleagues.chat.expertRail.previousPage"),
							disabled: !canGoPrevious,
							onClick: () => setPageIndex(Math.max(0, boundedPageIndex - 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
								className: "colleagues-chat-float__expert-pager-chevron is-up",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("span", {
							className: "colleagues-chat-float__expert-pager-status",
							"aria-label": t("colleagues.chat.expertRail.pageStatus", {
								current: boundedPageIndex + 1,
								total: pageCount
							}),
							children: [
								boundedPageIndex + 1,
								"/",
								pageCount
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
							type: "button",
							className: "colleagues-chat-float__expert-pager-btn",
							"aria-label": t("colleagues.chat.expertRail.nextPage"),
							title: t("colleagues.chat.expertRail.nextPage"),
							disabled: !canGoNext,
							onClick: () => setPageIndex(Math.min(pageCount - 1, boundedPageIndex + 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
								className: "colleagues-chat-float__expert-pager-chevron is-down",
								"aria-hidden": "true"
							})
						})
					]
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/colleagues-chat-float-session-picker.tsx
function getSessionTaskTitle(task, fallback) {
	return task.sessionName || fallback;
}
var import_react$13, import_react_dom$2, import_jsx_runtime$8, PlusIcon, TrashIcon, MoreIcon, ColleaguesChatFloatTaskList;
var init_colleagues_chat_float_session_picker = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_Message();
	init_useI18n();
	init_format();
	init_colleague_conversation_delete_confirm_dialog();
	init_session_status();
	import_jsx_runtime$8 = require_jsx_runtime();
	PlusIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("path", {
			d: "M6 2.5v7M2.5 6h7",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
	TrashIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("path", {
			d: "M2.5 3.5h9M5.5 3.5V2.5h3v1M3.5 3.5l.5 7.5h6l.5-7.5",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	MoreIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("circle", {
				cx: "3.5",
				cy: "7",
				r: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("circle", {
				cx: "7",
				cy: "7",
				r: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("circle", {
				cx: "10.5",
				cy: "7",
				r: "1",
				fill: "currentColor"
			})
		]
	});
	ColleaguesChatFloatTaskList = ({ chatSessionId, conversations, onSelect, onCreateNew }) => {
		const t = useTranslation();
		const [deleteConfirmTask, setDeleteConfirmTask] = (0, import_react$13.useState)(null);
		const [deletingTaskId, setDeletingTaskId] = (0, import_react$13.useState)(null);
		const [actionMenuState, setActionMenuState] = (0, import_react$13.useState)(null);
		const actionMenuTaskId = actionMenuState?.taskId ?? null;
		const { instances, isLoading, deleteSession } = conversations;
		(0, import_react$13.useEffect)(() => {
			if (!actionMenuTaskId) return;
			const handleCloseActionMenu = () => setActionMenuState(null);
			document.addEventListener("mousedown", handleCloseActionMenu);
			window.addEventListener("resize", handleCloseActionMenu);
			window.addEventListener("scroll", handleCloseActionMenu, true);
			return () => {
				document.removeEventListener("mousedown", handleCloseActionMenu);
				window.removeEventListener("resize", handleCloseActionMenu);
				window.removeEventListener("scroll", handleCloseActionMenu, true);
			};
		}, [actionMenuTaskId]);
		const handleRequestDelete = (0, import_react$13.useCallback)((event, task) => {
			event.preventDefault();
			event.stopPropagation();
			setActionMenuState(null);
			setDeleteConfirmTask({
				instanceId: task.instanceId,
				sessionId: task.sessionId,
				title: getSessionTaskTitle(task, t("colleagues.conversation.untitled"))
			});
		}, [t]);
		const handleCancelDelete = (0, import_react$13.useCallback)(() => {
			if (deletingTaskId) return;
			setDeleteConfirmTask(null);
		}, [deletingTaskId]);
		const handleConfirmDelete = (0, import_react$13.useCallback)(async () => {
			if (!deleteConfirmTask || deletingTaskId) return;
			const { instanceId, sessionId } = deleteConfirmTask;
			const isDeletingCurrent = Boolean(chatSessionId) && chatSessionId === sessionId;
			setDeletingTaskId(sessionId);
			try {
				const result = await deleteSession({
					instanceId,
					sessionId
				});
				if (!result.ok) {
					console.warn("[ColleaguesChatFloatTaskList] delete failed:", result.error);
					message.error(t("colleagues.conversation.deleteFailed"));
					return;
				}
				if (isDeletingCurrent) onCreateNew();
			} catch (error) {
				console.warn("[ColleaguesChatFloatTaskList] delete failed:", error);
				message.error(t("colleagues.conversation.deleteFailed"));
			} finally {
				setDeleteConfirmTask(null);
				setDeletingTaskId(null);
			}
		}, [
			chatSessionId,
			deleteConfirmTask,
			deleteSession,
			deletingTaskId,
			onCreateNew,
			t
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("aside", {
			className: "colleagues-chat-float__task-list",
			"aria-label": t("colleagues.chat.sessionPicker.listTitle"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ColleagueConversationDeleteConfirmDialog, {
					visible: deleteConfirmTask !== null,
					title: deleteConfirmTask?.title ?? "",
					loading: deletingTaskId !== null,
					onCancel: handleCancelDelete,
					onConfirm: handleConfirmDelete
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
					type: "button",
					className: "colleagues-chat-float__task-list-new",
					onClick: onCreateNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(PlusIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: t("colleagues.chat.sessionPicker.newSession") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
					className: "colleagues-chat-float__task-list-title",
					children: t("colleagues.chat.sessionPicker.listTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					className: "colleagues-chat-float__task-list-scroll",
					children: [
						instances.length === 0 && isLoading && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
							className: "colleagues-chat-float__task-list-empty",
							children: t("common.loading")
						}),
						instances.length === 0 && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
							className: "colleagues-chat-float__task-list-empty",
							children: t("colleagues.chat.sessionPicker.empty")
						}),
						instances.map((task) => {
							const isActive = Boolean(chatSessionId) && task.sessionId === chatSessionId;
							const title = getSessionTaskTitle(task, t("colleagues.conversation.untitled"));
							const timeText = task.lastActivityAt || task.createdAt ? formatRelativeTime(new Date(task.lastActivityAt ?? task.createdAt ?? Date.now()), t) : "";
							const statusVariant = normalizeColleagueSessionStatus(task.status);
							return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
								className: `colleagues-chat-float__task-list-item${isActive ? " is-active" : ""}`,
								"data-status": statusVariant,
								children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
									type: "button",
									className: "colleagues-chat-float__task-list-item-main",
									"aria-current": isActive ? "true" : void 0,
									"aria-disabled": isActive ? true : void 0,
									onClick: () => {
										if (isActive) return;
										onSelect({
											agentId: task.agentId,
											instanceId: task.instanceId,
											sessionId: task.sessionId,
											sessionStatus: task.status
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
										className: "colleagues-chat-float__task-list-item-status",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
										className: "colleagues-chat-float__task-list-item-title",
										title,
										children: title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("span", {
									className: "colleagues-chat-float__task-list-item-meta",
									children: [timeText && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
										className: "colleagues-chat-float__task-list-item-time",
										"aria-hidden": "true",
										children: timeText
									}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
										type: "button",
										className: "colleagues-chat-float__task-list-item-delete",
										"aria-label": t("common.showMore"),
										title: t("common.showMore"),
										"aria-haspopup": "menu",
										"aria-expanded": actionMenuTaskId === task.id,
										onMouseDown: (event) => event.stopPropagation(),
										onClick: (event) => {
											event.preventDefault();
											event.stopPropagation();
											if (actionMenuTaskId === task.id) {
												setActionMenuState(null);
												return;
											}
											const rect = event.currentTarget.getBoundingClientRect();
											setActionMenuState({
												taskId: task.id,
												anchor: {
													top: rect.top,
													right: rect.right,
													bottom: rect.bottom
												}
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(MoreIcon, {})
									})]
								})]
							}, task.id);
						})
					]
				}),
				actionMenuState && typeof document !== "undefined" && (() => {
					const targetTask = instances.find((item) => item.id === actionMenuState.taskId);
					if (!targetTask) return null;
					const { top, right, bottom } = actionMenuState.anchor;
					const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
					const viewportWidth = typeof window !== "undefined" ? window.innerWidth : right;
					const menuRight = Math.max(8, viewportWidth - right);
					return (0, import_react_dom$2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
						className: "colleagues-chat-float__task-list-item-menu colleagues-chat-float__task-list-item-menu--portal",
						role: "menu",
						style: bottom + 4 + 36 + 8 < viewportHeight ? {
							top: bottom + 4,
							right: menuRight
						} : {
							bottom: viewportHeight - top + 4,
							right: menuRight
						},
						onMouseDown: (event) => event.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("button", {
							type: "button",
							role: "menuitem",
							className: "colleagues-chat-float__task-list-item-menu-action",
							onClick: (event) => handleRequestDelete(event, targetTask),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(TrashIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: t("common.delete") })]
						})
					}), document.body);
				})()
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/default-model-picker.tsx
function toSelectableModelOptions(options) {
	const seenIds = /* @__PURE__ */ new Set();
	const selectableOptions = [];
	for (const option of options) {
		if (!option.id || seenIds.has(option.id) || option.disabled) continue;
		seenIds.add(option.id);
		selectableOptions.push(option);
	}
	return selectableOptions;
}
var import_react$12, import_jsx_runtime$7, DefaultModelPicker;
var init_default_model_picker = __esmMin((() => {
	init_src();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_hooks();
	import_jsx_runtime$7 = require_jsx_runtime();
	DefaultModelPicker = ({ adapter, selectedModelId, onSelect, onUserSelect, enableIoaGrouping, isEnterpriseAccount }) => {
		const t = useTranslation();
		const { locale } = useI18n();
		const { modelSelectorConfig } = useModelSelector(selectedModelId || void 0, adapter, void 0, locale, void 0, void 0, void 0, void 0, false, {
			enableIoaGrouping,
			isEnterpriseAccount
		});
		const rawOptions = modelSelectorConfig?.options ?? [];
		const selectableOptions = import_react$12.useMemo(() => toSelectableModelOptions(rawOptions), [rawOptions]);
		const fallbackModelId = import_react$12.useMemo(() => selectableOptions.find((option) => option.isDefault)?.id ?? selectableOptions[0]?.id, [selectableOptions]);
		const selectedModelIsSelectable = selectableOptions.some((option) => option.id === selectedModelId);
		const effectiveSelectedModelId = selectedModelIsSelectable ? selectedModelId : fallbackModelId;
		import_react$12.useEffect(() => {
			if (!effectiveSelectedModelId || selectedModelIsSelectable) return;
			onSelect(effectiveSelectedModelId);
		}, [
			effectiveSelectedModelId,
			onSelect,
			selectedModelIsSelectable
		]);
		const handleModelChange = import_react$12.useCallback((id) => {
			onSelect(id);
			if (id) onUserSelect?.(id);
		}, [onSelect, onUserSelect]);
		const compactModelSelector = import_react$12.useMemo(() => {
			if (!modelSelectorConfig || selectableOptions.length === 0 || !effectiveSelectedModelId) return;
			const selector = {
				options: selectableOptions,
				selectedId: effectiveSelectedModelId,
				onChange: handleModelChange,
				portalRoot: "inline",
				disableSubMenu: true
			};
			if (modelSelectorConfig.groups !== void 0) selector.groups = modelSelectorConfig.groups;
			if (modelSelectorConfig.selectedModel !== void 0) selector.selectedModel = modelSelectorConfig.selectedModel;
			return selector;
		}, [
			effectiveSelectedModelId,
			handleModelChange,
			modelSelectorConfig,
			selectableOptions
		]);
		const isLoading = !modelSelectorConfig;
		if (!compactModelSelector) return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "create-colleague-model-picker",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: `create-colleague-model-select-fallback${isLoading ? " is-loading" : ""}`,
				children: isLoading ? t("common.loading") : t("colleagues.createDialog.model.empty")
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "create-colleague-model-picker",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ModelSelect, {
				className: "create-colleague-model-select",
				modelSelector: compactModelSelector
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hire-expert-modal.tsx
/**
* TODO: 临时隐藏「专家团」tab（team），后续恢复时移除下方 filter(tab => tab.id !== 'team') 即可。
*/
function getVisibleTabs() {
	return TAB_LIST.filter((tab) => tab.id !== "team");
}
/**
* 把后端 ExpertInfo 还原成弹窗内部使用的 HiredExpertSource。
*
* 同时导出供 colleagues-panel/index.tsx 在「编辑档案」回显时调用：
* 详情接口只回传 plugin name / expertId，需要拿 expertId 在 expert-center
* 全量数据中 lookup 出展示名、头像等，再走这个统一映射，避免字段不一致。
*/
function getSourceFromExpert(expert, type, locale) {
	const name = getLocalizedText(expert.displayName, locale) || getLocalizedText(expert.name, locale, expert.id);
	const title = getLocalizedText(expert.profession, locale);
	const description = getLocalizedText(expert.displayDescription || expert.description, locale);
	return {
		id: expert.id,
		type,
		name,
		title,
		description,
		avatarUrl: resolveAvatarUrl(expert.avatar),
		plugin: expert.plugin,
		agentName: expert.agentName,
		expertType: expert.expertType
	};
}
function filterByCategory(experts, categoryId) {
	if (categoryId === null) return experts;
	if (categoryId === "00-OPC") return experts.filter((expert) => expert.isOPC === true);
	return experts.filter((expert) => expert.categoryId === categoryId);
}
/** 专家模糊搜索：匹配显示名、本地名、职业、描述（按当前 locale 取文本后大小写不敏感子串匹配）。 */
function expertMatchesKeyword(expert, keyword, locale) {
	if (!keyword) return true;
	return `${getLocalizedText(expert.displayName, locale) || getLocalizedText(expert.name, locale, expert.id)} ${getLocalizedText(expert.profession, locale)} ${getLocalizedText(expert.displayDescription || expert.description, locale)}`.toLowerCase().includes(keyword.toLowerCase());
}
function buildExpertPageCategories(categories, allExperts, activeTab) {
	if (activeTab === "team") {
		const baseCategories = categories.filter((category) => allExperts.some((expert) => expert.expertType === "team" && expert.categoryId === category.id));
		if (allExperts.some((expert) => expert.expertType === "team" && expert.isOPC === true)) baseCategories.unshift({
			id: "00-OPC",
			name: {
				zh: "OPC·一人公司",
				en: "OPC"
			},
			description: {
				zh: "OPC 专家团",
				en: "OPC Expert Teams"
			},
			order: 0
		});
		return baseCategories;
	}
	const baseCategories = categories.filter((category) => allExperts.some((expert) => expert.expertType !== "team" && expert.categoryId === category.id));
	if (allExperts.some((expert) => expert.expertType !== "team" && expert.isOPC === true) && !baseCategories.some((category) => category.id === "00-OPC")) baseCategories.unshift({
		id: "00-OPC",
		name: {
			zh: "OPC·一人公司",
			en: "OPC"
		},
		description: {
			zh: "OPC 专家",
			en: "OPC Experts"
		},
		order: 0
	});
	return baseCategories;
}
var import_react$11, import_jsx_runtime$6, TAB_LIST, HireExpertTabs, HireExpertCategoryFilters, HireExpertListItem, HireExpertList, HireExpertModal;
var init_hire_expert_modal = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_expert();
	init_use_expert_center();
	init_avatar_url();
	init_locale_text();
	import_jsx_runtime$6 = require_jsx_runtime();
	TAB_LIST = [{
		id: "expert",
		labelKey: "colleagues.createDialog.hireExpert.tab.expert"
	}, {
		id: "team",
		labelKey: "colleagues.createDialog.hireExpert.tab.team"
	}];
	HireExpertTabs = ({ activeTab, tabs, onChange }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "hire-expert-tabs",
			role: "tablist",
			"aria-label": t("colleagues.createDialog.hireExpert.title"),
			children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": activeTab === tab.id,
				className: `hire-expert-tab${activeTab === tab.id ? " is-active" : ""}`,
				onClick: () => onChange(tab.id),
				children: t(tab.labelKey)
			}, tab.id))
		});
	};
	HireExpertCategoryFilters = ({ categories, selectedCategoryId, onChange }) => {
		const t = useTranslation();
		const locale = useLocale();
		const [expanded, setExpanded] = import_react$11.useState(false);
		const [needsToggle, setNeedsToggle] = import_react$11.useState(false);
		const filtersRef = import_react$11.useRef(null);
		import_react$11.useLayoutEffect(() => {
			if (expanded) return;
			const el = filtersRef.current;
			if (!el) return;
			const measure = () => {
				setNeedsToggle(el.scrollHeight > el.clientHeight + 1);
			};
			measure();
			const observer = new ResizeObserver(measure);
			observer.observe(el);
			return () => observer.disconnect();
		}, [expanded, categories]);
		import_react$11.useEffect(() => {
			setExpanded(false);
		}, [categories]);
		const toggleExpanded = import_react$11.useCallback(() => {
			setExpanded((prev) => !prev);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "hire-expert-category-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				ref: filtersRef,
				className: `hire-expert-category-filters${expanded ? " is-expanded" : " is-collapsed"}`,
				"aria-label": t("colleagues.createDialog.hireExpert.categoryFilter"),
				children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					type: "button",
					className: selectedCategoryId === category.id ? "is-active" : "",
					onClick: () => onChange(category.id),
					children: getLocalizedText(category.name, locale, category.id)
				}, category.id))
			}), needsToggle && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
				type: "button",
				className: `hire-expert-category-toggle${expanded ? " is-expanded" : ""}`,
				"aria-label": expanded ? t("common.showLess") : t("common.showMore"),
				"aria-expanded": expanded,
				onClick: toggleExpanded,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					"aria-hidden": "true",
					focusable: "false",
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
						d: "M4 6 L8 10 L12 6",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			})]
		});
	};
	HireExpertListItem = ({ expert, active, type, onSelect }) => {
		const locale = useLocale();
		const source = import_react$11.useMemo(() => getSourceFromExpert(expert, type, locale), [
			expert,
			locale,
			type
		]);
		const [imageBroken, setImageBroken] = import_react$11.useState(false);
		const initial = source.name.charAt(0).toUpperCase();
		const handleSelect = import_react$11.useCallback(() => {
			onSelect(source);
		}, [onSelect, source]);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
			type: "button",
			className: `hire-expert-list-item${active ? " is-selected" : ""}`,
			onClick: handleSelect,
			"aria-pressed": active,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
				className: "hire-expert-item-avatar",
				"aria-hidden": "true",
				children: source.avatarUrl && !imageBroken ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("img", {
					src: source.avatarUrl,
					alt: "",
					loading: "lazy",
					onError: () => setImageBroken(true)
				}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: initial })
			}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
				className: "hire-expert-item-main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("strong", {
					className: "hire-expert-item-name",
					children: source.name
				}), (source.title || source.description) && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("em", {
					className: "hire-expert-item-subtitle",
					children: source.title || source.description
				})]
			})]
		});
	};
	HireExpertList = ({ activeTab, experts, selectedSource, onSelect }) => {
		const t = useTranslation();
		if (experts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "hire-expert-empty-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("h3", { children: t("colleagues.createDialog.hireExpert.emptyTitle") }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: t("colleagues.createDialog.hireExpert.emptyDesc") })]
		});
		const type = activeTab === "team" ? "team" : "expert";
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "hire-expert-list",
			role: "listbox",
			"aria-label": t("colleagues.createDialog.hireExpert.title"),
			children: experts.map((expert) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(HireExpertListItem, {
				expert,
				type,
				active: selectedSource?.id === expert.id && selectedSource.type === type,
				onSelect
			}, expert.id))
		});
	};
	HireExpertModal = ({ open, selectedSource, onConfirm, onClose }) => {
		const t = useTranslation();
		const locale = useLocale();
		const visibleTabs = import_react$11.useMemo(() => getVisibleTabs(), []);
		const [activeTab, setActiveTab] = import_react$11.useState("expert");
		const [selectedCategoryId, setSelectedCategoryId] = import_react$11.useState(null);
		const [draftSource, setDraftSource] = import_react$11.useState(selectedSource);
		const [searchKeyword, setSearchKeyword] = import_react$11.useState("");
		const { categories, experts, allExperts, isLoading } = useExpertCenter(null);
		import_react$11.useEffect(() => {
			if (open) {
				setDraftSource(selectedSource);
				const desired = selectedSource?.type === "team" ? "team" : "expert";
				setActiveTab(visibleTabs.some((tab) => tab.id === desired) ? desired : "expert");
				setSelectedCategoryId(null);
				setSearchKeyword("");
			}
		}, [
			open,
			selectedSource,
			visibleTabs
		]);
		const expertCenterSource = allExperts.length > 0 ? allExperts : experts;
		const tabSourceExperts = import_react$11.useMemo(() => expertCenterSource.filter((expert) => activeTab === "team" ? expert.expertType === "team" : expert.expertType !== "team"), [activeTab, expertCenterSource]);
		const categoryTabs = import_react$11.useMemo(() => buildExpertPageCategories(categories, expertCenterSource, activeTab), [
			activeTab,
			categories,
			expertCenterSource
		]);
		import_react$11.useEffect(() => {
			if (!open) return;
			setSelectedCategoryId((currentCategoryId) => {
				if (currentCategoryId && categoryTabs.some((category) => category.id === currentCategoryId)) return currentCategoryId;
				return categoryTabs[0]?.id ?? null;
			});
		}, [
			activeTab,
			categoryTabs,
			open
		]);
		const filteredExperts = import_react$11.useMemo(() => {
			const trimmed = searchKeyword.trim();
			if (trimmed) return tabSourceExperts.filter((expert) => expertMatchesKeyword(expert, trimmed, locale));
			return filterByCategory(tabSourceExperts, selectedCategoryId);
		}, [
			selectedCategoryId,
			tabSourceExperts,
			searchKeyword,
			locale
		]);
		const handleOverlayMouseDown = import_react$11.useCallback((event) => {
			if (event.target === event.currentTarget) onClose();
		}, [onClose]);
		const handleConfirm = import_react$11.useCallback(() => {
			onConfirm(draftSource);
		}, [draftSource, onConfirm]);
		const handleTabChange = import_react$11.useCallback((tab) => {
			setActiveTab(tab);
			setSelectedCategoryId(null);
			setSearchKeyword("");
		}, []);
		const searchPlaceholderKey = activeTab === "team" ? "colleagues.createDialog.hireExpert.searchPlaceholderTeam" : "colleagues.createDialog.hireExpert.searchPlaceholder";
		if (!open) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "hire-expert-overlay",
			onMouseDown: handleOverlayMouseDown,
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("section", {
				className: "hire-expert-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": t("colleagues.createDialog.hireExpert.title"),
				onMouseDown: (event) => event.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("header", {
						className: "hire-expert-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(HireExpertTabs, {
							activeTab,
							tabs: visibleTabs,
							onChange: handleTabChange
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
							type: "button",
							className: "hire-expert-close",
							"aria-label": t("common.close"),
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								"aria-hidden": "true",
								focusable: "false",
								children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
									d: "M2 2 L12 12 M12 2 L2 12",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "hire-expert-body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "hire-expert-filter-panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
								className: "hire-expert-search",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
										className: "hire-expert-search-icon",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 14 14",
											focusable: "false",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("circle", {
												cx: "6",
												cy: "6",
												r: "4.25",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.4"
											}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
												d: "M9.2 9.2 L12 12",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.4",
												strokeLinecap: "round"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("input", {
										type: "text",
										className: "hire-expert-search-input",
										placeholder: t(searchPlaceholderKey),
										value: searchKeyword,
										onChange: (event) => setSearchKeyword(event.target.value),
										"aria-label": t(searchPlaceholderKey)
									}),
									searchKeyword && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
										type: "button",
										className: "hire-expert-search-clear",
										"aria-label": t("common.clear"),
										onClick: () => setSearchKeyword(""),
										children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("svg", {
											width: "12",
											height: "12",
											viewBox: "0 0 12 12",
											"aria-hidden": "true",
											focusable: "false",
											children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
												d: "M2 2 L10 10 M10 2 L2 10",
												stroke: "currentColor",
												strokeWidth: "1.4",
												strokeLinecap: "round"
											})
										})
									})
								]
							}), !searchKeyword.trim() && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(HireExpertCategoryFilters, {
								categories: categoryTabs,
								selectedCategoryId,
								onChange: setSelectedCategoryId
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
							className: "hire-expert-scroll-area",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
								className: "hire-expert-empty-panel",
								children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: t("common.loading") })
							}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(HireExpertList, {
								activeTab,
								experts: filteredExperts,
								selectedSource: draftSource,
								onSelect: setDraftSource
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("footer", {
						className: "hire-expert-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
							type: "button",
							className: "hire-expert-cancel",
							onClick: onClose,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
							type: "button",
							className: "hire-expert-confirm",
							disabled: !draftSource,
							onClick: handleConfirm,
							children: t("common.confirm")
						})]
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-agent-templates.ts
function getErrorMessage(error) {
	return error instanceof Error ? error.message : String(error ?? "Unknown error");
}
/** 创建同事模板加载：通过 ExpertFacade 拉取远端 agent-tpl.json，并在 UI 层缓存成功结果。 */
function useAgentTemplates(enabled) {
	const expertFacade = useAgentServices()?.expert;
	const [templates, setTemplates] = import_react$10.useState(() => cachedTemplates ?? []);
	const [loading, setLoading] = import_react$10.useState(false);
	const [error, setError] = import_react$10.useState(null);
	const reload = import_react$10.useCallback(async () => {
		if (!expertFacade?.getAgentTemplates) {
			setTemplates([]);
			setError("ExpertFacade.getAgentTemplates is not available");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			if (!inflightTemplates) inflightTemplates = expertFacade.getAgentTemplates().then((result) => result.templates ?? []).finally(() => {
				inflightTemplates = null;
			});
			const nextTemplates = await inflightTemplates;
			cachedTemplates = nextTemplates;
			setTemplates(nextTemplates);
		} catch (err) {
			setError(getErrorMessage(err));
			if (cachedTemplates) setTemplates(cachedTemplates);
		} finally {
			setLoading(false);
		}
	}, [expertFacade]);
	import_react$10.useEffect(() => {
		if (!enabled) return;
		if (cachedTemplates) {
			setTemplates(cachedTemplates);
			return;
		}
		reload();
	}, [enabled, reload]);
	return {
		templates,
		loading,
		error,
		reload
	};
}
var import_react$10, cachedTemplates, inflightTemplates;
var init_use_agent_templates = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_services();
	cachedTemplates = null;
	inflightTemplates = null;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-cloud-agent-quota.ts
function isQuotaSnapshot(value) {
	const item = value;
	return Boolean(item && typeof item.plan === "string" && typeof item.agentLimit === "number" && typeof item.agentUsed === "number" && typeof item.agentRemaining === "number");
}
function resolveQuotaErrorReason(error) {
	const record = error;
	const status = Number(record?.httpStatus ?? record?.status);
	if (status === 401) return "unauthorized";
	if (status === 403) return "unsupported";
	if (status >= 500) return "server";
	const message = String(record?.message ?? error ?? "").toLowerCase();
	if (message.includes("network") || message.includes("fetch") || message.includes("timeout")) return "network";
	return "server";
}
/** 查询当前账号的 Cloud Agent 创建额度快照。 */
function useCloudAgentQuota() {
	const facade = useAgentServices()?.cloudAgent;
	const [quota, setQuota] = (0, import_react$9.useState)(null);
	const [loading, setLoading] = (0, import_react$9.useState)(false);
	const [error, setError] = (0, import_react$9.useState)(null);
	const [errorReason, setErrorReason] = (0, import_react$9.useState)(facade ? null : "missingFacade");
	const refresh = (0, import_react$9.useCallback)(async () => {
		if (!facade?.getQuota) {
			setError(null);
			setErrorReason("missingFacade");
			return {
				quota: null,
				errorReason: "missingFacade"
			};
		}
		setLoading(true);
		try {
			const nextQuota = await facade.getQuota();
			if (!isQuotaSnapshot(nextQuota)) {
				setQuota(null);
				setError("Invalid quota response");
				setErrorReason("invalidResponse");
				return {
					quota: null,
					errorReason: "invalidResponse"
				};
			}
			setQuota(nextQuota);
			setError(null);
			setErrorReason(null);
			return {
				quota: nextQuota,
				errorReason: null
			};
		} catch (err) {
			const nextReason = resolveQuotaErrorReason(err);
			setError(err instanceof Error ? err.message : String(err));
			setErrorReason(nextReason);
			return {
				quota: null,
				errorReason: nextReason
			};
		} finally {
			setLoading(false);
		}
	}, [facade]);
	(0, import_react$9.useEffect)(() => {
		refresh().catch(() => void 0);
	}, [refresh]);
	(0, import_react$9.useEffect)(() => {
		const subscription = colleagueAgentListChanged$.subscribe(() => {
			refresh().catch(() => void 0);
		});
		return () => subscription.unsubscribe();
	}, [refresh]);
	return {
		quota,
		loading,
		error,
		errorReason,
		canCreate: (0, import_react$9.useMemo)(() => quota ? quota.agentRemaining > 0 : true, [quota]),
		refresh
	};
}
var import_react$9;
var init_use_cloud_agent_quota = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_services();
	init_colleague_navigation_bus();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/colleague-field-moderation.ts
/**
* 为同事助理创建/编辑弹窗提供局部文本安全审核能力。
*
* 策略说明：
* - 输入态（`checkOne`）采用 fail-open：基础服务抖动时不打断用户输入；
* - 提交态（`checkBatch`）采用 fail-closed：接口缺失/异常/组合违规均阻断，避免违规内容落库（#49617）。
*/
function createColleagueFieldModerationChecker(adapter) {
	const probeText = async (text) => {
		const trimmed = text.trim();
		if (!trimmed) return "pass";
		if (!adapter?.checkModeration) return "unavailable";
		try {
			const result = await adapter.checkModeration({
				text: trimmed,
				scene: COLLEAGUE_MODERATION_SCENE
			});
			if (result.pass === false) return "blocked";
			if (typeof result.error === "string" && result.error.trim().length > 0) {
				console.warn("[ColleagueModeration] adapter returned pass=true with error; treating as unavailable", { error: result.error });
				return "unavailable";
			}
			return "pass";
		} catch (error) {
			console.warn("[ColleagueModeration] check failed", error);
			return "unavailable";
		}
	};
	return {
		async checkOne(field) {
			if (await probeText(field.text) === "blocked") return {
				pass: false,
				blockedKey: field.key,
				blockedText: field.text,
				reason: "blocked"
			};
			return { pass: true };
		},
		async checkBatch(fields) {
			const normalizedFields = fields.map((field) => ({
				key: field.key,
				text: field.text.trim()
			})).filter((field) => field.text.length > 0);
			if (normalizedFields.length === 0) return { pass: true };
			const combinedStatus = await probeText(normalizedFields.map((field) => field.text).join("\n"));
			if (combinedStatus === "pass") return { pass: true };
			if (combinedStatus === "unavailable") {
				console.warn("[ColleagueModeration] combined check unavailable; blocking submit");
				return {
					pass: false,
					reason: "serviceUnavailable"
				};
			}
			for (const field of normalizedFields) {
				const status = await probeText(field.text);
				if (status === "blocked") return {
					pass: false,
					blockedKey: field.key,
					blockedText: field.text,
					reason: "blocked"
				};
				if (status === "unavailable") {
					console.warn("[ColleagueModeration] per-field check unavailable; blocking submit");
					return {
						pass: false,
						reason: "serviceUnavailable"
					};
				}
			}
			console.warn("[ColleagueModeration] combined check blocked but single-field checks passed; blocking submit");
			return {
				pass: false,
				reason: "combinedBlocked"
			};
		}
	};
}
var COLLEAGUE_MODERATION_SCENE;
var init_colleague_field_moderation = __esmMin((() => {
	COLLEAGUE_MODERATION_SCENE = "nickname";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-colleague-field-moderation.ts
function useColleagueFieldModeration() {
	const adapter = useAdapter();
	return (0, import_react$8.useMemo)(() => createColleagueFieldModerationChecker(adapter), [adapter]);
}
var import_react$8;
var init_use_colleague_field_moderation = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_colleague_field_moderation();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-colleague-name-unique-validation.ts
function getValidationCacheKey(name, excludeAgentId) {
	return `${excludeAgentId ?? ""}\n${name.trim()}`;
}
/** 校验创建/编辑助理名称是否和当前用户已有助理重复。 */
function useColleagueNameUniqueValidation({ excludeAgentId, debounceMs = 600 } = {}) {
	const t = useTranslation();
	const cloudAgentFacade = useAgentServices()?.cloudAgent;
	const [status, setStatus] = import_react$7.useState("idle");
	const [error, setError] = import_react$7.useState(null);
	const requestSeqRef = import_react$7.useRef(0);
	const lastPassedCacheKeyRef = import_react$7.useRef("");
	const timerRef = import_react$7.useRef(null);
	const clearScheduled = import_react$7.useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);
	const reset = import_react$7.useCallback(() => {
		clearScheduled();
		requestSeqRef.current += 1;
		setStatus("idle");
		setError(null);
	}, [clearScheduled]);
	const validate = import_react$7.useCallback(async (rawName, options = {}) => {
		clearScheduled();
		const name = rawName.trim();
		const requestSeq = requestSeqRef.current + 1;
		requestSeqRef.current = requestSeq;
		if (!name) {
			setStatus("idle");
			setError(null);
			return true;
		}
		const cacheKey = getValidationCacheKey(name, excludeAgentId);
		if (!options.force && lastPassedCacheKeyRef.current === cacheKey) {
			setStatus("idle");
			setError(null);
			return true;
		}
		if (!cloudAgentFacade?.validateField) {
			if (options.blockOnError) {
				setStatus("error");
				setError(t("colleagues.createDialog.nameUniqueServiceUnavailable"));
				return false;
			}
			setStatus("idle");
			setError(null);
			return true;
		}
		setStatus("checking");
		setError(null);
		try {
			const result = await cloudAgentFacade.validateField({
				field: "agentName",
				value: name,
				...excludeAgentId ? { excludeAgentId } : {}
			});
			if (requestSeqRef.current !== requestSeq) return true;
			if (result.validated) {
				lastPassedCacheKeyRef.current = cacheKey;
				setStatus("idle");
				setError(null);
				return true;
			}
			setStatus("duplicated");
			setError(t("colleagues.createDialog.nameDuplicated"));
			return false;
		} catch {
			if (requestSeqRef.current !== requestSeq) return true;
			if (options.blockOnError) {
				setStatus("error");
				setError(t("colleagues.createDialog.nameUniqueServiceUnavailable"));
				return false;
			}
			setStatus("idle");
			setError(null);
			return true;
		}
	}, [
		clearScheduled,
		cloudAgentFacade,
		excludeAgentId,
		t
	]);
	const schedule = import_react$7.useCallback((rawName) => {
		clearScheduled();
		requestSeqRef.current += 1;
		const name = rawName.trim();
		if (!name) {
			setStatus("idle");
			setError(null);
			return;
		}
		const cacheKey = getValidationCacheKey(name, excludeAgentId);
		if (lastPassedCacheKeyRef.current === cacheKey) {
			setStatus("idle");
			setError(null);
			return;
		}
		setStatus("idle");
		setError(null);
		timerRef.current = setTimeout(() => {
			validate(rawName);
		}, debounceMs);
	}, [
		clearScheduled,
		debounceMs,
		excludeAgentId,
		validate
	]);
	import_react$7.useEffect(() => () => clearScheduled(), [clearScheduled]);
	return {
		status,
		error,
		validate,
		schedule,
		reset,
		clearScheduled
	};
}
var import_react$7;
var init_use_colleague_name_unique_validation = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_services();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/hooks/use-my-colleague-conversations.ts
function useMyColleagueConversations(options) {
	const { adapter, rawAgents, agentId, enabled = true, refresh: refreshRawAgents } = options;
	const [patches, setPatches] = (0, import_react$6.useState)([]);
	const [remoteTasks, setRemoteTasks] = (0, import_react$6.useState)([]);
	const remoteTaskScopeRef = (0, import_react$6.useRef)(null);
	const [isLoading, setIsLoading] = (0, import_react$6.useState)(false);
	const [error, setError] = (0, import_react$6.useState)(null);
	(0, import_react$6.useEffect)(() => {
		const sub = colleagueConversationPatches$.subscribe((patch) => {
			setPatches((prev) => [...prev.filter((item) => isPatchAlive(item, Date.now())), patch]);
		});
		return () => sub.unsubscribe();
	}, []);
	const useConversationApi = Boolean(adapter.listCloudAgentUserConversations);
	const baseTasks = (0, import_react$6.useMemo)(() => {
		if (!enabled || useConversationApi) return [];
		return buildTasksFromRawAgents(rawAgents, agentId);
	}, [
		agentId,
		enabled,
		rawAgents,
		useConversationApi
	]);
	const fetchRemoteTasks = (0, import_react$6.useCallback)(async () => {
		const listConversations = adapter.listCloudAgentUserConversations?.bind(adapter);
		if (!enabled || !agentId || !listConversations) return [];
		let remoteConversations = [];
		try {
			remoteConversations = (await listConversations({
				agentId,
				page: 1,
				pageSize: 100
			})).items ?? [];
		} catch {
			remoteConversations = [];
		}
		return remoteConversations.filter((conv) => !(conv.runtimeId && conv.sessionId && conv.runtimeId === conv.sessionId)).map((conv) => buildTaskFromUserConversation(agentId, conv));
	}, [
		adapter,
		agentId,
		enabled
	]);
	(0, import_react$6.useEffect)(() => {
		let cancelled = false;
		const scopeKey = enabled && agentId ? agentId : null;
		if (remoteTaskScopeRef.current !== scopeKey) {
			remoteTaskScopeRef.current = scopeKey;
			setRemoteTasks([]);
		}
		if (!enabled || !agentId || !adapter.listCloudAgentUserConversations) return () => {
			cancelled = true;
		};
		setIsLoading(true);
		setError(null);
		fetchRemoteTasks().then((tasks) => {
			if (!cancelled) setRemoteTasks(tasks);
		}).catch((err) => {
			if (!cancelled) {
				setRemoteTasks([]);
				setError(err instanceof Error ? err.message : String(err));
			}
		}).finally(() => {
			if (!cancelled) setIsLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		adapter,
		agentId,
		enabled,
		fetchRemoteTasks
	]);
	const mergedTasks = (0, import_react$6.useMemo)(() => mergeTaskSources(baseTasks, remoteTasks), [baseTasks, remoteTasks]);
	const instances = (0, import_react$6.useMemo)(() => enabled ? applyPatches(mergedTasks, rawAgents, patches, agentId) : [], [
		agentId,
		enabled,
		mergedTasks,
		patches,
		rawAgents
	]);
	const refresh = (0, import_react$6.useCallback)(async () => {
		setIsLoading(true);
		setError(null);
		try {
			await refreshRawAgents?.();
			setRemoteTasks(await fetchRemoteTasks());
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setIsLoading(false);
		}
	}, [fetchRemoteTasks, refreshRawAgents]);
	const removeLocal = (0, import_react$6.useCallback)((taskId) => {
		const task = instances.find((item) => item.id === taskId || item.sessionId === taskId);
		if (!task) return;
		setPatches((prev) => [...prev.filter((item) => isPatchAlive(item, Date.now())), {
			type: "remove-session",
			agentId: task.agentId,
			instanceId: task.instanceId,
			sessionId: task.sessionId,
			pendingUntil: Date.now() + PENDING_PATCH_TTL_MS
		}]);
	}, [instances]);
	const refreshAfterDeleteSession = (0, import_react$6.useCallback)(async (removePatch) => {
		if (removePatch) setPatches((prev) => [...prev.filter((item) => isPatchAlive(item, Date.now())), removePatch]);
		try {
			await refreshRawAgents?.();
			setRemoteTasks(await fetchRemoteTasks());
		} catch (refreshErr) {
			setError(refreshErr instanceof Error ? refreshErr.message : String(refreshErr));
			if (!removePatch) setRemoteTasks([]);
		}
	}, [fetchRemoteTasks, refreshRawAgents]);
	const deleteSession = (0, import_react$6.useCallback)(async (target) => {
		const targetId = typeof target === "string" ? target : target.instanceId || target.sessionId;
		const task = instances.find((item) => item.id === targetId || item.instanceId === targetId || item.sessionId === targetId);
		const sessionIdToDelete = task?.instanceId ?? targetId;
		const asConversationId = task?.runtimeId ?? task?.sessionId ?? sessionIdToDelete;
		if (!sessionIdToDelete) return {
			ok: false,
			error: "delete target not found"
		};
		if (!adapter.deleteCloudAgentConversationSession) return {
			ok: false,
			error: "deleteCloudAgentConversationSession not supported"
		};
		const removePatch = {
			type: "remove-session",
			agentId: task?.agentId,
			instanceId: asConversationId,
			sessionId: sessionIdToDelete,
			pendingUntil: Date.now() + PENDING_PATCH_TTL_MS
		};
		try {
			await adapter.deleteCloudAgentConversationSession({
				asConversationId,
				sessionId: sessionIdToDelete
			});
			refreshAfterDeleteSession(removePatch);
			return { ok: true };
		} catch (err) {
			refreshAfterDeleteSession();
			return {
				ok: false,
				error: err instanceof Error ? err.message : String(err)
			};
		}
	}, [
		adapter,
		instances,
		refreshAfterDeleteSession
	]);
	return {
		instances,
		total: instances.length,
		isLoading,
		error,
		refresh,
		removeLocal,
		deleteSession
	};
}
var import_react$6, PENDING_PATCH_TTL_MS;
var init_use_my_colleague_conversations = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_colleague_navigation_bus();
	init_colleague_conversation_tasks();
	PENDING_PATCH_TTL_MS = 8e3;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assets/pro-badge-green.svg
var pro_badge_green_default;
var init_pro_badge_green = __esmMin((() => {
	pro_badge_green_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='49.7419'%20height='35'%20viewBox='0%200%2049.7419%2035'%3e%3cdefs%3e%3cfilter%20id='proBadgeInnerShadowGreen'%20x='0'%20y='26'%20width='47'%20height='10'%20filterUnits='userSpaceOnUse'%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0'%20dy='0'/%3e%3cfeGaussianBlur%20stdDeviation='0.5'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.2471%200'/%3e%3c/filter%3e%3c/defs%3e%3crect%20fill='%23F1F1F1'%20x='0'%20y='26'%20width='47'%20height='9'%20rx='4.5'%20ry='4.5'/%3e%3cg%20filter='url(%23proBadgeInnerShadowGreen)'%3e%3crect%20fill='%23FFFFFF'%20x='0'%20y='26'%20width='47'%20height='9'%20rx='4.5'%20ry='4.5'/%3e%3c/g%3e%3cpath%20fill='%2391ECE2'%20transform='translate(4%200)'%20d='M6.656%201.5726C6.8568%200.6544%207.6699%200%208.6098%200L43.5152%200C44.792%200%2045.7419%201.1801%2045.469%202.4274L39.344%2030.4274C39.1432%2031.3456%2038.3301%2032%2037.3902%2032L2.4848%2032C1.208%2032%200.2581%2030.8199%200.531%2029.5726L6.656%201.5726Z'/%3e%3cpath%20fill='%23289280'%20transform='translate(11.0166%2014.9999)'%20d='M5.2438%200.968C5.3919%200.6107%205.898%200.6107%206.0461%200.968L7.0328%203.3489C7.0953%203.4997%207.2371%203.6027%207.3998%203.6155L9.9691%203.8182C10.3546%203.8486%2010.511%204.3299%2010.217%204.5812L8.2575%206.2553C8.1334%206.3614%208.0792%206.528%208.1173%206.6868L8.7185%209.1929C8.8088%209.569%208.3993%209.8665%208.0695%209.6645L5.8718%208.3183C5.7326%208.233%205.5573%208.233%205.4181%208.3183L3.2204%209.6645C2.8906%209.8665%202.4811%209.569%202.5714%209.1929L3.1726%206.6868C3.2107%206.528%203.1565%206.3614%203.0324%206.2553L1.0729%204.5812C0.7789%204.3299%200.9353%203.8486%201.3208%203.8182L3.8901%203.6155C4.0528%203.6027%204.1946%203.4997%204.2571%203.3489L5.2438%200.968Z'/%3e%3cpath%20fill='%23289280'%20transform='translate(24.3526%2015.9531)'%20d='M0.6534%201.3358L0.6534%208L1.7454%208L1.7454%205.4426L3.3975%205.4426C5.0215%205.4426%205.8336%204.7519%205.8336%203.3798C5.8336%202.0171%205.0215%201.3358%203.4161%201.3358L0.6534%201.3358ZM1.7454%202.2691L3.3321%202.2691C3.8081%202.2691%204.1628%202.3531%204.3868%202.5305C4.6108%202.6985%204.7322%202.9785%204.7322%203.3798C4.7322%203.7812%204.6202%204.0705%204.3962%204.2479C4.1722%204.4159%203.8175%204.5092%203.3321%204.5092L1.7454%204.5092L1.7454%202.2691ZM8.951%203.0438C8.6523%203.0438%208.4003%203.1278%208.1856%203.3052C8.0083%203.4358%207.859%203.6225%207.7283%203.8652L7.7283%203.1745L6.6736%203.1745L6.6736%208L7.7283%208L7.7283%205.4426C7.7283%205.0319%207.8496%204.7052%208.111%204.4532C8.335%204.2292%208.587%204.1265%208.867%204.1265C9.091%204.1265%209.315%204.1545%209.5577%204.2292L9.5577%203.1652C9.3897%203.0811%209.1843%203.0438%208.951%203.0438ZM12.4045%203.0438C11.6671%203.0438%2011.0791%203.2772%2010.6404%203.7625C10.1924%204.2385%209.9777%204.8452%209.9777%205.5919C9.9777%206.3293%2010.1924%206.936%2010.6311%207.4026C11.0791%207.888%2011.6671%208.1307%2012.4045%208.1307C13.1325%208.1307%2013.7298%207.888%2014.1779%207.4026C14.6072%206.936%2014.8312%206.3293%2014.8312%205.5919C14.8312%204.8452%2014.6072%204.2385%2014.1685%203.7625C13.7205%203.2772%2013.1325%203.0438%2012.4045%203.0438ZM12.4045%203.9118C12.8431%203.9118%2013.1885%204.0799%2013.4312%204.4345C13.6365%204.7332%2013.7485%205.1252%2013.7485%205.5919C13.7485%206.0493%2013.6365%206.4319%2013.4312%206.74C13.1885%207.0853%2012.8431%207.2626%2012.4045%207.2626C11.9564%207.2626%2011.6204%207.0853%2011.3778%206.74C11.1724%206.4413%2011.0697%206.0586%2011.0697%205.5919C11.0697%205.1252%2011.1724%204.7332%2011.3778%204.4345C11.6204%204.0799%2011.9564%203.9118%2012.4045%203.9118Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assets/pro-badge-green-back.svg
var pro_badge_green_back_default;
var init_pro_badge_green_back = __esmMin((() => {
	pro_badge_green_back_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='45.4837'%20height='32'%20viewBox='0%200%2045.4837%2032'%3e%3cpath%20fill='%237BDDD2'%20transform='matrix(-1%200%200%201%2045.7418%200)'%20d='M6.656%201.5726C6.8568%200.6544%207.6699%200%208.6098%200L43.5152%200C44.792%200%2045.7419%201.1801%2045.469%202.4274L39.344%2030.4274C39.1432%2031.3456%2038.3301%2032%2037.3902%2032L2.4848%2032C1.208%2032%200.2581%2030.8199%200.531%2029.5726L6.656%201.5726Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assets/pro-badge-purple.svg
var pro_badge_purple_default;
var init_pro_badge_purple = __esmMin((() => {
	pro_badge_purple_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='47.8288'%20height='35'%20viewBox='0%200%2047.8288%2035'%3e%3cdefs%3e%3cfilter%20id='proBadgeInnerShadowPurple'%20x='0'%20y='25'%20width='48'%20height='10'%20filterUnits='userSpaceOnUse'%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0'%20dy='0'/%3e%3cfeGaussianBlur%20stdDeviation='0.5'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.2471%200'/%3e%3c/filter%3e%3c/defs%3e%3crect%20fill='%23F1F1F1'%20x='0'%20y='26'%20width='47'%20height='9'%20rx='4.5'%20ry='4.5'/%3e%3cg%20filter='url(%23proBadgeInnerShadowPurple)'%3e%3crect%20fill='%23FFFFFF'%20x='0'%20y='26'%20width='47'%20height='9'%20rx='4.5'%20ry='4.5'/%3e%3c/g%3e%3cpath%20fill='%23D5CBF5'%20transform='translate(4%200)'%20d='M6.656%201.5726C6.8568%200.6544%207.6699%200%208.6098%200L43.5152%200C44.792%200%2045.7419%201.1801%2045.469%202.4274L39.344%2030.4274C39.1432%2031.3456%2038.3301%2032%2037.3902%2032L2.4848%2032C1.208%2032%200.2581%2030.8199%200.531%2029.5726L6.656%201.5726Z'/%3e%3cpath%20fill='%23777CD0'%20transform='translate(11.0166%2014.9999)'%20d='M5.2438%200.968C5.3919%200.6107%205.898%200.6107%206.0461%200.968L7.0328%203.3489C7.0953%203.4997%207.2371%203.6027%207.3998%203.6155L9.9691%203.8182C10.3546%203.8486%2010.511%204.3299%2010.217%204.5812L8.2575%206.2553C8.1334%206.3614%208.0792%206.528%208.1173%206.6868L8.7185%209.1929C8.8088%209.569%208.3993%209.8665%208.0695%209.6645L5.8718%208.3183C5.7326%208.233%205.5573%208.233%205.4181%208.3183L3.2204%209.6645C2.8906%209.8665%202.4811%209.569%202.5714%209.1929L3.1726%206.6868C3.2107%206.528%203.1565%206.3614%203.0324%206.2553L1.0729%204.5812C0.7789%204.3299%200.9353%203.8486%201.3208%203.8182L3.8901%203.6155C4.0528%203.6027%204.1946%203.4997%204.2571%203.3489L5.2438%200.968Z'/%3e%3cpath%20fill='%23777CD0'%20transform='translate(24.3526%2015.9531)'%20d='M0.6534%201.3358L0.6534%208L1.7454%208L1.7454%205.4426L3.3975%205.4426C5.0215%205.4426%205.8336%204.7519%205.8336%203.3798C5.8336%202.0171%205.0215%201.3358%203.4161%201.3358L0.6534%201.3358ZM1.7454%202.2691L3.3321%202.2691C3.8081%202.2691%204.1628%202.3531%204.3868%202.5305C4.6108%202.6985%204.7322%202.9785%204.7322%203.3798C4.7322%203.7812%204.6202%204.0705%204.3962%204.2479C4.1722%204.4159%203.8175%204.5092%203.3321%204.5092L1.7454%204.5092L1.7454%202.2691ZM8.951%203.0438C8.6523%203.0438%208.4003%203.1278%208.1856%203.3052C8.0083%203.4358%207.859%203.6225%207.7283%203.8652L7.7283%203.1745L6.6736%203.1745L6.6736%208L7.7283%208L7.7283%205.4426C7.7283%205.0319%207.8496%204.7052%208.111%204.4532C8.335%204.2292%208.587%204.1265%208.867%204.1265C9.091%204.1265%209.315%204.1545%209.5577%204.2292L9.5577%203.1652C9.3897%203.0811%209.1843%203.0438%208.951%203.0438ZM12.4045%203.0438C11.6671%203.0438%2011.0791%203.2772%2010.6404%203.7625C10.1924%204.2385%209.9777%204.8452%209.9777%205.5919C9.9777%206.3293%2010.1924%206.936%2010.6311%207.4026C11.0791%207.888%2011.6671%208.1307%2012.4045%208.1307C13.1325%208.1307%2013.7298%207.888%2014.1779%207.4026C14.6072%206.936%2014.8312%206.3293%2014.8312%205.5919C14.8312%204.8452%2014.6072%204.2385%2014.1685%203.7625C13.7205%203.2772%2013.1325%203.0438%2012.4045%203.0438ZM12.4045%203.9118C12.8431%203.9118%2013.1885%204.0799%2013.4312%204.4345C13.6365%204.7332%2013.7485%205.1252%2013.7485%205.5919C13.7485%206.0493%2013.6365%206.4319%2013.4312%206.74C13.1885%207.0853%2012.8431%207.2626%2012.4045%207.2626C11.9564%207.2626%2011.6204%207.0853%2011.3778%206.74C11.1724%206.4413%2011.0697%206.0586%2011.0697%205.5919C11.0697%205.1252%2011.1724%204.7332%2011.3778%204.4345C11.6204%204.0799%2011.9564%203.9118%2012.4045%203.9118Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assets/pro-badge-purple-back.svg
var pro_badge_purple_back_default;
var init_pro_badge_purple_back = __esmMin((() => {
	pro_badge_purple_back_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='45.4837'%20height='32'%20viewBox='0%200%2045.4837%2032'%3e%3cpath%20fill='%23C3B5F0'%20transform='matrix(-1%200%200%201%2045.7418%200)'%20d='M6.656%201.5726C6.8568%200.6544%207.6699%200%208.6098%200L43.5152%200C44.792%200%2045.7419%201.1801%2045.469%202.4274L39.344%2030.4274C39.1432%2031.3456%2038.3301%2032%2037.3902%2032L2.4848%2032C1.208%2032%200.2581%2030.8199%200.531%2029.5726L6.656%201.5726Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assets/pro-badge-yellow.svg
var pro_badge_yellow_default;
var init_pro_badge_yellow = __esmMin((() => {
	pro_badge_yellow_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='47.8288'%20height='35'%20viewBox='0%200%2047.8288%2035'%3e%3cdefs%3e%3cfilter%20id='proBadgeInnerShadowYellow'%20x='0'%20y='25'%20width='48'%20height='10'%20filterUnits='userSpaceOnUse'%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dx='0'%20dy='0'/%3e%3cfeGaussianBlur%20stdDeviation='0.5'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.2471%200'/%3e%3c/filter%3e%3c/defs%3e%3crect%20fill='%23F1F1F1'%20x='0'%20y='26'%20width='47'%20height='9'%20rx='4.5'%20ry='4.5'/%3e%3cg%20filter='url(%23proBadgeInnerShadowYellow)'%3e%3crect%20fill='%23FFFFFF'%20x='0'%20y='26'%20width='47'%20height='9'%20rx='4.5'%20ry='4.5'/%3e%3c/g%3e%3cpath%20fill='%23FFE379'%20transform='translate(4%200)'%20d='M6.656%201.5726C6.8568%200.6544%207.6699%200%208.6098%200L43.5152%200C44.792%200%2045.7419%201.1801%2045.469%202.4274L39.344%2030.4274C39.1432%2031.3456%2038.3301%2032%2037.3902%2032L2.4848%2032C1.208%2032%200.2581%2030.8199%200.531%2029.5726L6.656%201.5726Z'/%3e%3cpath%20fill='%23B69D5B'%20transform='translate(11.0166%2014.9999)'%20d='M5.2438%200.968C5.3919%200.6107%205.898%200.6107%206.0461%200.968L7.0328%203.3489C7.0953%203.4997%207.2371%203.6027%207.3998%203.6155L9.9691%203.8182C10.3546%203.8486%2010.511%204.3299%2010.217%204.5812L8.2575%206.2553C8.1334%206.3614%208.0792%206.528%208.1173%206.6868L8.7185%209.1929C8.8088%209.569%208.3993%209.8665%208.0695%209.6645L5.8718%208.3183C5.7326%208.233%205.5573%208.233%205.4181%208.3183L3.2204%209.6645C2.8906%209.8665%202.4811%209.569%202.5714%209.1929L3.1726%206.6868C3.2107%206.528%203.1565%206.3614%203.0324%206.2553L1.0729%204.5812C0.7789%204.3299%200.9353%203.8486%201.3208%203.8182L3.8901%203.6155C4.0528%203.6027%204.1946%203.4997%204.2571%203.3489L5.2438%200.968Z'/%3e%3cpath%20fill='%23B69D5B'%20transform='translate(24.3526%2015.9531)'%20d='M0.6534%201.3358L0.6534%208L1.7454%208L1.7454%205.4426L3.3975%205.4426C5.0215%205.4426%205.8336%204.7519%205.8336%203.3798C5.8336%202.0171%205.0215%201.3358%203.4161%201.3358L0.6534%201.3358ZM1.7454%202.2691L3.3321%202.2691C3.8081%202.2691%204.1628%202.3531%204.3868%202.5305C4.6108%202.6985%204.7322%202.9785%204.7322%203.3798C4.7322%203.7812%204.6202%204.0705%204.3962%204.2479C4.1722%204.4159%203.8175%204.5092%203.3321%204.5092L1.7454%204.5092L1.7454%202.2691ZM8.951%203.0438C8.6523%203.0438%208.4003%203.1278%208.1856%203.3052C8.0083%203.4358%207.859%203.6225%207.7283%203.8652L7.7283%203.1745L6.6736%203.1745L6.6736%208L7.7283%208L7.7283%205.4426C7.7283%205.0319%207.8496%204.7052%208.111%204.4532C8.335%204.2292%208.587%204.1265%208.867%204.1265C9.091%204.1265%209.315%204.1545%209.5577%204.2292L9.5577%203.1652C9.3897%203.0811%209.1843%203.0438%208.951%203.0438ZM12.4045%203.0438C11.6671%203.0438%2011.0791%203.2772%2010.6404%203.7625C10.1924%204.2385%209.9777%204.8452%209.9777%205.5919C9.9777%206.3293%2010.1924%206.936%2010.6311%207.4026C11.0791%207.888%2011.6671%208.1307%2012.4045%208.1307C13.1325%208.1307%2013.7298%207.888%2014.1779%207.4026C14.6072%206.936%2014.8312%206.3293%2014.8312%205.5919C14.8312%204.8452%2014.6072%204.2385%2014.1685%203.7625C13.7205%203.2772%2013.1325%203.0438%2012.4045%203.0438ZM12.4045%203.9118C12.8431%203.9118%2013.1885%204.0799%2013.4312%204.4345C13.6365%204.7332%2013.7485%205.1252%2013.7485%205.5919C13.7485%206.0493%2013.6365%206.4319%2013.4312%206.74C13.1885%207.0853%2012.8431%207.2626%2012.4045%207.2626C11.9564%207.2626%2011.6204%207.0853%2011.3778%206.74C11.1724%206.4413%2011.0697%206.0586%2011.0697%205.5919C11.0697%205.1252%2011.1724%204.7332%2011.3778%204.4345C11.6204%204.0799%2011.9564%203.9118%2012.4045%203.9118Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/assets/pro-badge-yellow-back.svg
var pro_badge_yellow_back_default;
var init_pro_badge_yellow_back = __esmMin((() => {
	pro_badge_yellow_back_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='45.4837'%20height='32'%20viewBox='0%200%2045.4837%2032'%3e%3cpath%20fill='%23F2D35C'%20transform='matrix(-1%200%200%201%2045.7419%200)'%20d='M6.656%201.5726C6.8568%200.6544%207.6699%200%208.6098%200L43.5152%200C44.792%200%2045.7419%201.1801%2045.469%202.4274L39.344%2030.4274C39.1432%2031.3456%2038.3301%2032%2037.3902%2032L2.4848%2032C1.208%2032%200.2581%2030.8199%200.531%2029.5726L6.656%201.5726Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/pro-badge.tsx
/**
* 根据卡片在列表中的位置（0-based index）映射徽章配色。
*
* 设计规则与 `colleagues-panel.less` 中
* `.colleagues-panel--dashboard .colleague-card-wrapper:nth-child(...)` 的 4 色循环对齐：
* - 4n+1（index%4===0）青色卡片  → green 徽章
* - 4n+2（index%4===1）深黄卡片  → yellow 徽章（黄系两挡共用同一份徽章）
* - 4n+3（index%4===2）紫色卡片  → purple 徽章
* - 4n  （index%4===3）亮黄卡片  → yellow 徽章
*
* 抽出独立函数便于：
* 1. 单元测试；
* 2. 后续如果改成按 `colleague.id` hash 或后端字段决定配色，可在此一处替换。
*/
function proBadgeVariantByIndex(index) {
	switch ((index % 4 + 4) % 4) {
		case 0: return "green";
		case 2: return "purple";
		default: return "yellow";
	}
}
var import_jsx_runtime$5, VARIANT_TO_ASSETS, PRO_BADGE_FRONT_WIDTH, PRO_BADGE_FRONT_HEIGHT, PRO_BADGE_BACK_WIDTH, PRO_BADGE_BACK_HEIGHT, ProBadgeBack, ProBadgeFront;
var init_pro_badge = __esmMin((() => {
	require_react();
	init_pro_badge_green();
	init_pro_badge_green_back();
	init_pro_badge_purple();
	init_pro_badge_purple_back();
	init_pro_badge_yellow();
	init_pro_badge_yellow_back();
	import_jsx_runtime$5 = require_jsx_runtime();
	VARIANT_TO_ASSETS = {
		green: {
			back: pro_badge_green_back_default,
			front: pro_badge_green_default
		},
		yellow: {
			back: pro_badge_yellow_back_default,
			front: pro_badge_yellow_default
		},
		purple: {
			back: pro_badge_purple_back_default,
			front: pro_badge_purple_default
		}
	};
	PRO_BADGE_FRONT_WIDTH = 47.83;
	PRO_BADGE_FRONT_HEIGHT = 35;
	PRO_BADGE_BACK_WIDTH = 45.4837;
	PRO_BADGE_BACK_HEIGHT = 32;
	ProBadgeBack = ({ variant, className, style }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("img", {
			className: className ? `pro-badge-back ${className}` : "pro-badge-back",
			src: VARIANT_TO_ASSETS[variant].back,
			alt: "",
			"aria-hidden": "true",
			width: PRO_BADGE_BACK_WIDTH,
			height: PRO_BADGE_BACK_HEIGHT,
			draggable: false,
			style
		});
	};
	ProBadgeBack.displayName = "ProBadgeBack";
	ProBadgeFront = ({ variant, className, style }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("img", {
			className: className ? `pro-badge-front ${className}` : "pro-badge-front",
			src: VARIANT_TO_ASSETS[variant].front,
			alt: "",
			"aria-hidden": "true",
			width: PRO_BADGE_FRONT_WIDTH,
			height: PRO_BADGE_FRONT_HEIGHT,
			draggable: false,
			style
		});
	};
	ProBadgeFront.displayName = "ProBadgeFront";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/publish-colleague-modal.tsx
var import_react$4, import_jsx_runtime$4, CloseIcon$2, PersonIcon, ProjectIcon, GlobeIcon, VISIBILITY_OPTIONS, PublishColleagueModal;
var init_publish_colleague_modal = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$4 = require_jsx_runtime();
	CloseIcon$2 = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 20 20",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M5 5L15 15M15 5L5 15",
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round"
		})
	});
	PersonIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 22 22",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
			cx: "11",
			cy: "8",
			r: "3.4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M4.5 17.4c1.4-2.6 3.9-3.9 6.5-3.9s5.1 1.3 6.5 3.9",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
	ProjectIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 22 22",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("rect", {
			x: "3.5",
			y: "4.5",
			width: "15",
			height: "13",
			rx: "1.6",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M3.5 8h15M7 4.5v13M11 4.5v13M15 4.5v13M3.5 12h15",
			stroke: "currentColor",
			strokeWidth: "1"
		})]
	});
	GlobeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 22 22",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("circle", {
				cx: "11",
				cy: "11",
				r: "7.5",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
				d: "M3.5 11h15",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
				d: "M11 3.5c2 2.4 3 5.1 3 7.5s-1 5.1-3 7.5c-2-2.4-3-5.1-3-7.5s1-5.1 3-7.5Z",
				stroke: "currentColor",
				strokeWidth: "1.5"
			})
		]
	});
	VISIBILITY_OPTIONS = [
		{
			id: "personal",
			nameKey: "colleagues.publishDialog.option.personal.name",
			descKey: "colleagues.publishDialog.option.personal.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(PersonIcon, {}),
			submitKey: "colleagues.publishDialog.submit.personal"
		},
		{
			id: "project",
			nameKey: "colleagues.publishDialog.option.project.name",
			descKey: "colleagues.publishDialog.option.project.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ProjectIcon, {}),
			submitKey: "colleagues.publishDialog.submit.project"
		},
		{
			id: "public",
			nameKey: "colleagues.publishDialog.option.public.name",
			descKey: "colleagues.publishDialog.option.public.desc",
			icon: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(GlobeIcon, {}),
			submitKey: "colleagues.publishDialog.submit.public"
		}
	];
	PublishColleagueModal = ({ open, colleagueName, colleagueTitle, colleagueAvatarLabel, colleagueAvatarVariant = 1, visibility, defaultVisibility = "personal", onClose, onConfirm }) => {
		const t = useTranslation();
		/** 非受控时本地维护当前选中可见性 */
		const [internalVisibility, setInternalVisibility] = import_react$4.useState(defaultVisibility);
		const currentVisibility = visibility ?? internalVisibility;
		import_react$4.useEffect(() => {
			if (!open) return;
			if (visibility === void 0) setInternalVisibility(defaultVisibility);
			const handleKeyDown = (event) => {
				if (event.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [
			open,
			defaultVisibility,
			visibility,
			onClose
		]);
		const handleOverlayMouseDown = import_react$4.useCallback((event) => {
			if (event.target === event.currentTarget) onClose();
		}, [onClose]);
		const handlePick = import_react$4.useCallback((next) => {
			if (visibility === void 0) setInternalVisibility(next);
		}, [visibility]);
		const handleSubmit = import_react$4.useCallback(() => {
			onConfirm?.(currentVisibility);
		}, [currentVisibility, onConfirm]);
		if (!open) return null;
		const submitKey = VISIBILITY_OPTIONS.find((item) => item.id === currentVisibility)?.submitKey ?? "colleagues.publishDialog.submit.personal";
		const colleagueLabelText = colleagueTitle ? `${colleagueName} · ${colleagueTitle}` : colleagueName;
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "publish-colleague-overlay",
			onMouseDown: handleOverlayMouseDown,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("section", {
				className: "publish-colleague-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "publish-colleague-title",
				onMouseDown: (event) => event.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("header", {
						className: "publish-colleague-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", {
							id: "publish-colleague-title",
							children: t("colleagues.publishDialog.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
							type: "button",
							className: "publish-colleague-close",
							"aria-label": t("common.close"),
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CloseIcon$2, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
						className: "publish-colleague-body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "publish-colleague-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("label", {
								className: "publish-colleague-field-label",
								children: t("colleagues.publishDialog.colleagueLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "publish-colleague-summary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: `publish-colleague-summary-avatar colleague-card-avatar--${colleagueAvatarVariant}`,
									"aria-hidden": "true",
									children: colleagueAvatarLabel ?? colleagueName.slice(0, 1)
								}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "publish-colleague-summary-text",
									children: colleagueLabelText
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "publish-colleague-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("label", {
								className: "publish-colleague-field-label",
								children: t("colleagues.publishDialog.scopeLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "publish-colleague-options",
								role: "radiogroup",
								"aria-label": t("colleagues.publishDialog.scopeLabel"),
								children: VISIBILITY_OPTIONS.map((option) => {
									const isSelected = option.id === currentVisibility;
									return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("button", {
										type: "button",
										role: "radio",
										"aria-checked": isSelected,
										className: `publish-colleague-option${isSelected ? " is-selected" : ""}`,
										onClick: () => handlePick(option.id),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
												className: "publish-colleague-option-icon",
												"aria-hidden": "true",
												children: option.icon
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
												className: "publish-colleague-option-text",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("strong", { children: t(option.nameKey) }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: t(option.descKey) })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
												className: "publish-colleague-option-radio",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "publish-colleague-option-radio-dot" })
											})
										]
									}, option.id);
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("footer", {
						className: "publish-colleague-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
							type: "button",
							className: "publish-colleague-cancel",
							onClick: onClose,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
							type: "button",
							className: "publish-colleague-submit",
							onClick: handleSubmit,
							children: t(submitKey)
						})]
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/searchable-select-icons.tsx
/** 选项行前缀图标：仓库用 `</>` 代码图标，分支用 git-branch 图标。 */
function renderOptionIcon(optionIcon) {
	if (optionIcon === "repo") return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Code, { "aria-hidden": "true" });
	if (optionIcon === "branch") return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(GitBranch, { "aria-hidden": "true" });
	return null;
}
/**
* resetOption 的图标：resetIcon='clear' 时展示「取消/不选择」的 X（如「不选择仓库」）；
* 缺省时沿用 optionIcon（如分支选择器的「默认分支（main）」本质仍是一个分支，用分支图标而非 X）。
*/
function renderResetIcon(resetIcon, optionIcon) {
	if (resetIcon === "clear") return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(X, { "aria-hidden": "true" });
	return renderOptionIcon(optionIcon);
}
var import_jsx_runtime$3;
var init_searchable_select_icons = __esmMin((() => {
	init_lucide_react();
	require_react();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/searchable-select.tsx
function fuzzyMatch(option, keyword) {
	if (!keyword) return true;
	const lower = keyword.toLowerCase();
	return option.label.toLowerCase().includes(lower) || option.value.toLowerCase().includes(lower);
}
/** Walk up the DOM to find the nearest scrollable ancestor. */
function findScrollParent(element) {
	let parent = element.parentElement;
	while (parent && parent !== document.documentElement) {
		const { overflowY } = getComputedStyle(parent);
		if (overflowY === "auto" || overflowY === "scroll") return parent;
		parent = parent.parentElement;
	}
	return null;
}
function computePopoverPosition(triggerRect) {
	const spaceBelow = (typeof window === "undefined" ? 0 : window.innerHeight) - triggerRect.bottom;
	const spaceAbove = triggerRect.top;
	const placement = spaceBelow < POPOVER_MAX_HEIGHT && spaceAbove > spaceBelow ? "top" : "bottom";
	const width = Math.max(POPOVER_MIN_WIDTH, triggerRect.width);
	const left = triggerRect.left;
	return {
		top: placement === "bottom" ? triggerRect.bottom + POPOVER_GAP : triggerRect.top - POPOVER_GAP,
		left,
		width,
		placement
	};
}
var import_react$2, import_react_dom$1, import_jsx_runtime$2, NO_HIGHLIGHT_INDEX, POPOVER_GAP, POPOVER_MAX_HEIGHT, POPOVER_MIN_WIDTH, SearchableSelect;
var init_searchable_select = __esmMin((() => {
	init_lucide_react();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_icons();
	init_searchable_select_icons();
	import_jsx_runtime$2 = require_jsx_runtime();
	NO_HIGHLIGHT_INDEX = -1;
	POPOVER_GAP = 4;
	POPOVER_MAX_HEIGHT = 260;
	POPOVER_MIN_WIDTH = 160;
	SearchableSelect = ({ value, options, onChange, placeholder, searchPlaceholder, emptyText, noMatchText, disabled, loading, loadingText, ariaLabel, optionIcon, resetOption, clearAriaLabel }) => {
		const [open, setOpen] = import_react$2.useState(false);
		const [keyword, setKeyword] = import_react$2.useState("");
		const [highlight, setHighlight] = import_react$2.useState(NO_HIGHLIGHT_INDEX);
		const [position, setPosition] = import_react$2.useState(null);
		const triggerRef = import_react$2.useRef(null);
		const popoverRef = import_react$2.useRef(null);
		const inputRef = import_react$2.useRef(null);
		const listRef = import_react$2.useRef(null);
		/**
		* 控制 highlight 变化是否需要触发 scrollIntoView。
		* 仅键盘导航 / 弹层首次打开时置 true；鼠标滚轮滑过列表项触发 onMouseEnter
		* 同样会改 highlight，但那时不应再把视口滚回去（否则用户根本无法手动滚动）。
		*/
		const shouldScrollOnHighlightRef = import_react$2.useRef(false);
		const isInteractive = !disabled && !loading;
		const filteredOptions = import_react$2.useMemo(() => options.filter((option) => fuzzyMatch(option, keyword)), [options, keyword]);
		const selectedOption = import_react$2.useMemo(() => options.find((option) => option.value === value), [options, value]);
		const triggerText = import_react$2.useMemo(() => {
			if (loading) return loadingText ?? "";
			if (selectedOption) return selectedOption.label;
			return placeholder ?? "";
		}, [
			loading,
			loadingText,
			placeholder,
			selectedOption
		]);
		const closePopover = import_react$2.useCallback(() => {
			setOpen(false);
			setKeyword("");
			setHighlight(NO_HIGHLIGHT_INDEX);
		}, []);
		const updatePosition = import_react$2.useCallback(() => {
			if (!triggerRef.current) return;
			setPosition(computePopoverPosition(triggerRef.current.getBoundingClientRect()));
		}, []);
		const handleToggle = import_react$2.useCallback(() => {
			if (!isInteractive) return;
			setOpen((prev) => {
				const next = !prev;
				if (next) updatePosition();
				return next;
			});
		}, [isInteractive, updatePosition]);
		const handleSelect = import_react$2.useCallback((option) => {
			if (option.disabled) return;
			onChange(option.value);
			closePopover();
		}, [closePopover, onChange]);
		const handleReset = import_react$2.useCallback(() => {
			onChange("");
			closePopover();
		}, [closePopover, onChange]);
		import_react$2.useEffect(() => {
			if (!open) return;
			const handleClickOutside = (event) => {
				const target = event.target;
				if (triggerRef.current?.contains(target)) return;
				if (popoverRef.current?.contains(target)) return;
				closePopover();
			};
			const handleKey = (event) => {
				if (event.key === "Escape") closePopover();
			};
			const handleViewportChange = () => {
				if (!triggerRef.current) return;
				if (triggerRef.current.offsetParent === null) {
					closePopover();
					return;
				}
				const triggerRect = triggerRef.current.getBoundingClientRect();
				const scrollParent = findScrollParent(triggerRef.current);
				if (scrollParent) {
					const containerRect = scrollParent.getBoundingClientRect();
					if (triggerRect.bottom < containerRect.top || triggerRect.top > containerRect.bottom) {
						closePopover();
						return;
					}
				}
				updatePosition();
			};
			document.addEventListener("mousedown", handleClickOutside, true);
			document.addEventListener("keydown", handleKey);
			window.addEventListener("scroll", handleViewportChange, true);
			window.addEventListener("resize", handleViewportChange);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside, true);
				document.removeEventListener("keydown", handleKey);
				window.removeEventListener("scroll", handleViewportChange, true);
				window.removeEventListener("resize", handleViewportChange);
			};
		}, [
			open,
			closePopover,
			updatePosition
		]);
		import_react$2.useEffect(() => {
			if (!open || !triggerRef.current) return;
			if (triggerRef.current.offsetParent === null) closePopover();
		});
		import_react$2.useEffect(() => {
			if (!open) return;
			inputRef.current?.focus();
			const idx = options.findIndex((option) => option.value === value && !option.disabled);
			shouldScrollOnHighlightRef.current = true;
			setHighlight(idx);
		}, [open]);
		import_react$2.useEffect(() => {
			if (!open) return;
			const idx = filteredOptions.findIndex((option) => !option.disabled);
			shouldScrollOnHighlightRef.current = false;
			setHighlight(idx);
		}, [
			keyword,
			open,
			filteredOptions
		]);
		const handleInputKeyDown = (event) => {
			if (event.key === "ArrowDown" || event.key === "ArrowUp") {
				event.preventDefault();
				if (filteredOptions.length === 0) return;
				shouldScrollOnHighlightRef.current = true;
				setHighlight((prev) => {
					const direction = event.key === "ArrowDown" ? 1 : -1;
					let next = prev < 0 ? direction === 1 ? -1 : 0 : prev;
					for (let step = 0; step < filteredOptions.length; step += 1) {
						next = (next + direction + filteredOptions.length) % filteredOptions.length;
						if (!filteredOptions[next]?.disabled) return next;
					}
					return prev;
				});
				return;
			}
			if (event.key === "Enter") {
				event.preventDefault();
				const target = filteredOptions[highlight];
				if (target && !target.disabled) handleSelect(target);
			}
		};
		import_react$2.useEffect(() => {
			if (!open || highlight < 0) return;
			if (!shouldScrollOnHighlightRef.current) return;
			shouldScrollOnHighlightRef.current = false;
			(listRef.current?.children[highlight])?.scrollIntoView({ block: "nearest" });
		}, [highlight, open]);
		const showEmpty = options.length === 0;
		const showNoMatch = !showEmpty && filteredOptions.length === 0;
		const isPlaceholderShown = !loading && !selectedOption;
		const popoverNode = open && position ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			ref: popoverRef,
			className: "create-colleague-searchable-popover",
			role: "dialog",
			style: {
				position: "fixed",
				top: position.placement === "bottom" ? position.top : void 0,
				bottom: position.placement === "top" ? window.innerHeight - position.top : void 0,
				left: position.left,
				width: position.width,
				maxHeight: POPOVER_MAX_HEIGHT
			},
			onMouseDown: (event) => {
				if (event.target !== inputRef.current) event.preventDefault();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "create-colleague-searchable-search",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SearchIcon, { "aria-hidden": "true" }),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("input", {
							ref: inputRef,
							type: "text",
							value: keyword,
							placeholder: searchPlaceholder,
							onChange: (event) => setKeyword(event.target.value),
							onKeyDown: handleInputKeyDown,
							"aria-label": searchPlaceholder ?? ariaLabel
						}),
						keyword ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							type: "button",
							className: "create-colleague-searchable-clear",
							"aria-label": clearAriaLabel,
							onMouseDown: (event) => {
								event.preventDefault();
								setKeyword("");
								inputRef.current?.focus();
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(X, { "aria-hidden": "true" })
						}) : null
					]
				}),
				showEmpty ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "create-colleague-searchable-empty",
					children: emptyText
				}) : showNoMatch ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "create-colleague-searchable-empty",
					children: noMatchText
				}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", {
					ref: listRef,
					className: "create-colleague-searchable-list",
					role: "listbox",
					children: filteredOptions.map((option, idx) => {
						const isSelected = option.value === value;
						const isHighlight = idx === highlight;
						return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("li", {
							role: "option",
							"aria-selected": isSelected,
							"aria-disabled": option.disabled,
							className: `create-colleague-searchable-item${isSelected ? " is-selected" : ""}${isHighlight ? " is-active" : ""}${option.disabled ? " is-disabled" : ""}`,
							onMouseEnter: () => !option.disabled && setHighlight(idx),
							onMouseDown: (event) => {
								event.preventDefault();
								handleSelect(option);
							},
							title: option.label,
							children: [
								renderOptionIcon(optionIcon),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
									className: "create-colleague-searchable-item-label",
									children: option.label
								}),
								isSelected ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CheckIcon, {
									className: "create-colleague-searchable-item-check",
									"aria-hidden": "true"
								}) : null
							]
						}, `${option.value}::${idx}`);
					})
				}),
				resetOption ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("hr", { className: "create-colleague-searchable-divider" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", {
					type: "button",
					className: `create-colleague-searchable-reset${value === "" ? " is-selected" : ""}`,
					onMouseDown: (event) => {
						event.preventDefault();
						handleReset();
					},
					children: [
						renderResetIcon(resetOption.icon, optionIcon),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "create-colleague-searchable-item-label",
							children: resetOption.label
						}),
						value === "" ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CheckIcon, {
							className: "create-colleague-searchable-item-check",
							"aria-hidden": "true"
						}) : null
					]
				})] }) : null
			]
		}) : null;
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: `create-colleague-select-like create-colleague-inline-select create-colleague-searchable${loading ? " is-loading" : ""}${open ? " is-open" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				ref: triggerRef,
				type: "button",
				className: "create-colleague-searchable-trigger",
				"aria-label": ariaLabel,
				"aria-haspopup": "listbox",
				"aria-expanded": open,
				disabled: !isInteractive,
				onClick: handleToggle,
				title: selectedOption?.label ?? triggerText,
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					className: `create-colleague-searchable-trigger-text${isPlaceholderShown ? " is-placeholder" : ""}`,
					children: triggerText
				})
			}), typeof document !== "undefined" && popoverNode ? (0, import_react_dom$1.createPortal)(popoverNode, document.body) : null]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/tencent-docs-config-modal.tsx
function isFileSelectable(file) {
	if (file.is_folder) return false;
	return SELECTABLE_FILE_TYPES.has(file.type);
}
function toSelectedFile(file) {
	return {
		id: file.file_id,
		title: file.title,
		url: file.url,
		type: file.type,
		ext: file.ext,
		ownerName: file.owner_name
	};
}
function createSelectedMap(files) {
	return new Map(files.map((file) => [file.id, file]));
}
function mapSearchResultToFileInfo(file) {
	return {
		file_id: file.id,
		parent_id: file.parentId,
		title: file.name,
		url: file.url,
		type: file.type,
		ext: file.ext,
		create_time: 0,
		create_name: "",
		last_modify_time: Number(file.modifiedTimeRaw) || 0,
		last_modify_name: "",
		access_time: 0,
		owner_name: file.ownerName,
		is_folder: file.isFolder,
		is_link: file.isLink,
		size: file.sizeRaw,
		is_top: file.isTop,
		is_star: file.isStar,
		status: file.status
	};
}
var import_react$1, import_jsx_runtime$1, CloseIcon$1, TencentDocsFilePicker, TencentDocsConfigModal;
var init_tencent_docs_config_modal = __esmMin((() => {
	init_tencent_docs_panel();
	init_lucide_react();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_services();
	init_auth_guide();
	init_empty_state();
	init_file_list();
	init_tdoc_columns();
	init_folder_breadcrumb();
	init_constants$1();
	init_use_file_list();
	init_use_file_search();
	init_use_tdoc_check_auth_gate();
	init_store();
	init_types();
	import_jsx_runtime$1 = require_jsx_runtime();
	CloseIcon$1 = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 22 22",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round"
		})
	});
	TencentDocsFilePicker = ({ selectedFiles, onChange }) => {
		const t = useTranslation();
		const [activeTab, setActiveTab] = import_react$1.useState("recent");
		const [searchInput, setSearchInput] = import_react$1.useState("");
		const [searchKeyword, setSearchKeyword] = import_react$1.useState("");
		const fileList = useFileList({ listType: activeTab === "recent" ? ListType.RECENT : ListType.MY_DOC });
		const fileSearch = useFileSearch();
		const selectedMap = import_react$1.useMemo(() => createSelectedMap(selectedFiles), [selectedFiles]);
		const checkedKeys = import_react$1.useMemo(() => new Set(selectedMap.keys()), [selectedMap]);
		const tabs = import_react$1.useMemo(() => [{
			id: "recent",
			label: t("tdoc.tab.recent")
		}, {
			id: "myDoc",
			label: t("tdoc.tab.myDoc")
		}], [t]);
		const isSearchMode = searchKeyword.trim().length > 0;
		const searchFiles = import_react$1.useMemo(() => fileSearch.results.map(mapSearchResultToFileInfo), [fileSearch.results]);
		const visibleFiles = isSearchMode ? searchFiles : fileList.files;
		const checkableFiles = import_react$1.useMemo(() => visibleFiles.filter(isFileSelectable), [visibleFiles]);
		const checkedInVisibleCount = import_react$1.useMemo(() => checkableFiles.filter((file) => selectedMap.has(file.file_id)).length, [checkableFiles, selectedMap]);
		const allChecked = checkableFiles.length > 0 && checkedInVisibleCount === checkableFiles.length;
		const indeterminate = checkedInVisibleCount > 0 && checkedInVisibleCount < checkableFiles.length;
		const columns = useTDocColumns({
			hideRowActions: true,
			orderBy: fileList.orderBy,
			onOrderByChange: fileList.setOrderBy,
			desc: fileList.desc,
			onDescToggle: fileList.toggleDesc
		});
		const updateFileSelection = import_react$1.useCallback((file, checked) => {
			if (!isFileSelectable(file)) return;
			const nextMap = createSelectedMap(selectedFiles);
			if (checked ?? !nextMap.has(file.file_id)) nextMap.set(file.file_id, toSelectedFile(file));
			else nextMap.delete(file.file_id);
			onChange([...nextMap.values()]);
		}, [onChange, selectedFiles]);
		const handleRowClick = import_react$1.useCallback((file) => {
			if (file.is_folder) {
				setSearchInput("");
				setSearchKeyword("");
				fileSearch.reset();
				fileList.enterFolder(file.file_id, file.title);
				return;
			}
			updateFileSelection(file);
		}, [
			fileList,
			fileSearch,
			updateFileSelection
		]);
		const handleCheckChange = import_react$1.useCallback((key, checked) => {
			const file = visibleFiles.find((item) => item.file_id === key);
			if (file) updateFileSelection(file, checked);
		}, [updateFileSelection, visibleFiles]);
		const handleCheckAll = import_react$1.useCallback((checked) => {
			const nextMap = createSelectedMap(selectedFiles);
			checkableFiles.forEach((file) => {
				if (checked) nextMap.set(file.file_id, toSelectedFile(file));
				else nextMap.delete(file.file_id);
			});
			onChange([...nextMap.values()]);
		}, [
			checkableFiles,
			onChange,
			selectedFiles
		]);
		const handleSearch = import_react$1.useCallback(() => {
			const keyword = searchInput.trim();
			if (!keyword) {
				setSearchKeyword("");
				fileSearch.reset();
				return;
			}
			setSearchKeyword(keyword);
			fileSearch.search(keyword);
		}, [fileSearch, searchInput]);
		const handleClearSearch = import_react$1.useCallback(() => {
			setSearchInput("");
			setSearchKeyword("");
			fileSearch.reset();
		}, [fileSearch]);
		const handleTabChange = import_react$1.useCallback((tabId) => {
			setActiveTab(tabId);
			setSearchInput("");
			setSearchKeyword("");
			fileSearch.reset();
		}, [fileSearch]);
		const handleSortChange = import_react$1.useCallback((sortKey, desc) => {
			if (isSearchMode) return;
			fileList.setOrderBy(sortKey);
			fileList.setDesc(desc);
		}, [fileList, isSearchMode]);
		const loading = isSearchMode ? fileSearch.loading && searchFiles.length === 0 : fileList.loading;
		const loadingMore = isSearchMode ? fileSearch.loading && searchFiles.length > 0 : fileList.loadingMore;
		const error = isSearchMode ? fileSearch.error : fileList.error;
		const hasMore = isSearchMode ? fileSearch.hasMore : fileList.hasMore;
		const loadMore = isSearchMode ? fileSearch.loadMore : fileList.loadMore;
		const retry = isSearchMode ? () => fileSearch.search(searchKeyword) : fileList.loadFiles;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "create-tdocs-file-picker",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "create-tdocs-list-toolbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "create-tdocs-tabs",
						role: "tablist",
						"aria-label": t("colleagues.createDialog.tencentDocs.fileListTitle"),
						children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": activeTab === tab.id,
							className: `create-tdocs-tab${activeTab === tab.id ? " is-active" : ""}`,
							onClick: () => handleTabChange(tab.id),
							children: tab.label
						}, tab.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "create-tdocs-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Search, {
								size: 14,
								className: "create-tdocs-search__icon"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
								value: searchInput,
								onChange: (event) => setSearchInput(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter") handleSearch();
								},
								placeholder: t("knowledgeBase.search.placeholder")
							}),
							searchInput && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								"aria-label": t("common.close"),
								onClick: handleClearSearch,
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CircleX, { size: 14 })
							})
						]
					})]
				}),
				fileList.folderPath.length > 0 && !isSearchMode && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FolderBreadcrumb, {
					path: fileList.folderPath,
					onNavigate: fileList.navigateToFolder
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "create-tdocs-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(VirtualList, {
						data: visibleFiles,
						columns,
						rowKey: (file) => file.file_id,
						loading,
						loadingMore,
						hasMore,
						error,
						sortKey: fileList.orderBy,
						sortDesc: fileList.desc,
						checkedKeys,
						isCheckable: isFileSelectable,
						showDisabledCheckbox: true,
						checkboxDisabledTooltip: t("tdoc.selection.unsupportedType"),
						onCheckChange: handleCheckChange,
						onCheckAll: handleCheckAll,
						allChecked,
						indeterminate,
						onRowClick: handleRowClick,
						onSortChange: handleSortChange,
						onLoadMore: loadMore,
						onRetry: retry,
						loadingMoreText: t("common.loadingMore"),
						rowClassName: (file) => file.is_folder ? "tdoc-file-list-item--folder" : "",
						renderEmpty: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(EmptyState, {
							type: isSearchMode ? "no-results" : "no-files",
							keyword: searchKeyword
						}),
						renderError: (err, onRetry) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "tdoc-file-list__error",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: "tdoc-file-list__error-icon",
									children: "⚠️"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: "tdoc-file-list__error-message",
									children: err
								}),
								onRetry && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									className: "tdoc-file-list__error-retry",
									onClick: onRetry,
									children: t("tdoc.error.retry")
								})
							]
						})
					})
				})
			]
		});
	};
	TencentDocsConfigModal = ({ open, selectedFiles, onSave, onClose }) => {
		const adapter = useAdapter();
		const tencentDocs = useTencentDocsFacade();
		const t = useTranslation();
		const authStatus = useTencentDocsStore((state) => state.authStatus);
		const authError = useTencentDocsStore((state) => state.authError);
		const authorizeUrl = useTencentDocsStore((state) => state.authorizeUrl);
		const authTimedOut = useTencentDocsStore((state) => state.authTimedOut);
		const triggerCheckAuth = useTdocCheckAuthGate();
		const [draftFiles, setDraftFiles] = import_react$1.useState(selectedFiles);
		import_react$1.useEffect(() => {
			if (!open) return;
			setDraftFiles(selectedFiles);
			tencentDocsStore.getState().setAdapter(adapter);
			tencentDocsStore.getState().setFacade(tencentDocs);
			triggerCheckAuth();
			return () => {
				tencentDocsStore.getState().stopPolling();
			};
		}, [
			adapter,
			open,
			selectedFiles,
			tencentDocs,
			triggerCheckAuth
		]);
		import_react$1.useEffect(() => {
			if (open && authTimedOut) tencentDocsStore.getState().dismissTimeout();
		}, [authTimedOut, open]);
		const handleOverlayMouseDown = import_react$1.useCallback((event) => {
			if (event.target === event.currentTarget) onClose();
		}, [onClose]);
		const handleSave = import_react$1.useCallback(() => {
			onSave(draftFiles);
		}, [draftFiles, onSave]);
		if (!open) return null;
		const isConnected = authStatus === "connected";
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "create-tdocs-overlay",
			onMouseDown: handleOverlayMouseDown,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
				className: "create-tdocs-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "create-tdocs-title",
				onMouseDown: (event) => event.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", {
						className: "create-tdocs-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
							id: "create-tdocs-title",
							children: t("colleagues.createDialog.tencentDocs.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							"aria-label": t("common.close"),
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CloseIcon$1, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "create-tdocs-body",
						children: isConnected ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TencentDocsFilePicker, {
							selectedFiles: draftFiles,
							onChange: setDraftFiles
						}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "create-tdocs-auth-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AuthGuide, {
								authStatus,
								error: authError,
								authorizeUrl,
								onAuthorize: () => tencentDocsStore.getState().startAuthorization(),
								onRetry: triggerCheckAuth,
								authSource: "library"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("footer", {
						className: "create-tdocs-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "create-tdocs-footer-count",
							children: t("colleagues.createDialog.tencentDocs.selectedCount", { count: draftFiles.length })
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "create-tdocs-footer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "create-tdocs-cancel",
								onClick: onClose,
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "create-tdocs-save",
								onClick: handleSave,
								children: t("colleagues.createDialog.tencentDocs.save")
							})]
						})]
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/tencent-docs-manifest-mcp.ts
/**
* 把「是否选了腾讯文档」转成 manifest.mcp[] 配置。
*
* 选中任一文档（`docs.length > 0`）→ 注入一个 `user-mcp` 条目；
* 未选中 → 返回 undefined，调用方 spread 后 manifest 不包含 `mcp` 字段。
*/
function buildAgentManifestMcp(docs) {
	if (!docs || docs.length === 0) return;
	return [{
		name: TENCENT_DOCS_MCP_NAME,
		downloadUrl: TENCENT_DOCS_MCP_DOWNLOAD_URL,
		scope: "USER"
	}];
}
/**
* 编辑已有同事时仅替换腾讯文档的 user-mcp 条目，避免误删 manifest 中其它 MCP 配置。
*/
function mergeAgentManifestMcp(baseMcp, docs) {
	const preservedMcp = (baseMcp ?? []).filter((item) => item?.name !== TENCENT_DOCS_MCP_NAME);
	const tencentDocsMcp = buildAgentManifestMcp(docs) ?? [];
	const nextMcp = [...preservedMcp, ...tencentDocsMcp];
	return nextMcp.length > 0 ? nextMcp : void 0;
}
var TENCENT_DOCS_MCP_NAME, TENCENT_DOCS_MCP_DOWNLOAD_URL;
var init_tencent_docs_manifest_mcp = __esmMin((() => {
	TENCENT_DOCS_MCP_NAME = "user-mcp";
	TENCENT_DOCS_MCP_DOWNLOAD_URL = "https://codebuddy-clawbot-1328944842.cos.ap-beijing.myqcloud.com/attachments/3dcbcc11-a8a8-4fab-8e97-4935734bdc96/1779851082_12945954/user-mcp.json?q-sign-algorithm=sha1&q-ak=AKIDNcfV7XkopjZWLxNdTIuJl4C8uhJwSqBP&q-sign-time=1779851082;1787627082&q-key-time=1779851082;1787627082&q-header-list=host&q-url-param-list=&q-signature=c8bf0b3d92dad16db474812b60c4644e2ba69c0b";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/tencent-docs-system-prompt.ts
function dedupeTencentDocsFiles(files) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	files.forEach((file) => {
		const id = file.id?.trim();
		if (!id || seen.has(id)) return;
		seen.add(id);
		result.push(file);
	});
	return result;
}
function escapeXmlAttribute(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function buildTencentDocsContextXml(files) {
	const uniqueFiles = dedupeTencentDocsFiles(files);
	if (uniqueFiles.length === 0) return "";
	return [
		TENCENT_DOCS_CONTEXT_START,
		"<tencent_docs_context source=\"cloud-agent-colleague\" version=\"1\">",
		"  <purpose>",
		"These Tencent Docs are configured as persistent reference materials for this colleague.",
		"They are not local workspace files, and their contents are not embedded in this prompt.",
		"  </purpose>",
		"  <usage_policy>",
		"Use these documents only when the user's request is related to the configured reference materials,",
		"or when consulting them would improve factual accuracy.",
		"Before using information from a document, call the Tencent Docs MCP tool with the corresponding doc id as file_id.",
		"Do not claim that you have read or verified a document until the MCP tool has successfully returned its content.",
		"Never use local file tools such as Read, Glob, Grep, or Bash to access these Tencent Docs.",
		"If the Tencent Docs connector or authorization is unavailable, ask the user to enable Tencent Docs access instead of guessing.",
		"  </usage_policy>",
		"  <references>",
		...uniqueFiles.map((file) => {
			return `    <doc ${[
				`id="${escapeXmlAttribute(file.id)}"`,
				`title="${escapeXmlAttribute(file.title)}"`,
				file.type ? `type="${escapeXmlAttribute(file.type)}"` : "",
				file.ext ? `ext="${escapeXmlAttribute(file.ext)}"` : "",
				file.url ? `url="${escapeXmlAttribute(file.url)}"` : "",
				file.ownerName ? `owner="${escapeXmlAttribute(file.ownerName)}"` : ""
			].filter(Boolean).join(" ")} />`;
		}),
		"  </references>",
		"</tencent_docs_context>",
		TENCENT_DOCS_CONTEXT_END
	].join("\n");
}
function stripTencentDocsContext(systemPrompt) {
	return String(systemPrompt ?? "").replace(TENCENT_DOCS_CONTEXT_BLOCK_RE, "").replace(/\n{3,}/g, "\n\n").trim();
}
function mergeSystemPromptWithTencentDocs(basePrompt, files) {
	const cleanPrompt = stripTencentDocsContext(basePrompt).trim();
	const xml = buildTencentDocsContextXml(files);
	if (!xml) return cleanPrompt;
	if (!cleanPrompt) return xml;
	return `${cleanPrompt}\n\n${xml}`;
}
function parseTencentDocsFromSystemPrompt(systemPrompt) {
	const matches = String(systemPrompt ?? "").match(TENCENT_DOCS_CONTEXT_BLOCK_RE);
	if (!matches?.length) return [];
	const block = matches[matches.length - 1] ?? "";
	const xmlStart = block.indexOf("<tencent_docs_context");
	const xmlEnd = block.lastIndexOf(TENCENT_DOCS_CONTEXT_CLOSE_TAG);
	if (xmlStart < 0 || xmlEnd < 0) return [];
	const xml = block.slice(xmlStart, xmlEnd + 23);
	const doc = new DOMParser().parseFromString(xml, "application/xml");
	if (doc.querySelector("parsererror")) return [];
	return Array.from(doc.querySelectorAll("references > doc")).map((node) => ({
		id: node.getAttribute("id") || "",
		title: node.getAttribute("title") || "",
		url: node.getAttribute("url") || "",
		type: node.getAttribute("type") || "DOC",
		ext: node.getAttribute("ext") || void 0,
		ownerName: node.getAttribute("owner") || void 0
	})).filter((file) => file.id && file.title);
}
var TENCENT_DOCS_CONTEXT_START, TENCENT_DOCS_CONTEXT_END, TENCENT_DOCS_CONTEXT_BLOCK_RE, TENCENT_DOCS_CONTEXT_CLOSE_TAG;
var init_tencent_docs_system_prompt = __esmMin((() => {
	TENCENT_DOCS_CONTEXT_START = "<!-- codebuddy:tencent-docs-context:start version=\"1\" -->";
	TENCENT_DOCS_CONTEXT_END = "<!-- codebuddy:tencent-docs-context:end -->";
	TENCENT_DOCS_CONTEXT_BLOCK_RE = /<!--\s*codebuddy:tencent-docs-context:start\b[^>]*-->[\s\S]*?<!--\s*codebuddy:tencent-docs-context:end\s*-->/g;
	TENCENT_DOCS_CONTEXT_CLOSE_TAG = "</tencent_docs_context>";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/utils/agent-manifest-plugins.ts
/**
* 助理 manifest 最终写入前的专家插件安装策略：所有官方专家插件都强制刷新安装。
*/
function withForceInstallForExpertPlugins(plugins) {
	if (!plugins?.length) return;
	return plugins.map((plugin) => {
		if (plugin.marketplace !== "experts") return plugin;
		return {
			...plugin,
			forceInstall: true
		};
	});
}
var init_agent_manifest_plugins = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/utils/agent-template-mappers.ts
function buildTemplateAvatarPresets(templates) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	templates.forEach((template, index) => {
		if (!template.avatar || seen.has(template.avatar)) return;
		seen.add(template.avatar);
		const ordinal = String(result.length + 1).padStart(2, "0");
		result.push({
			id: template.avatar,
			label: template.title,
			initials: ordinal,
			variant: index % 20 + 1,
			imageUrl: template.avatar
		});
	});
	return result;
}
function findExpertForTemplatePlugin(allExperts, plugin) {
	if (!plugin?.name) return;
	return allExperts.find((expert) => expert.plugin === plugin.name || !!plugin.agentName && expert.agentName === plugin.agentName);
}
function buildFallbackHiredExpertSourceFromTemplate(template) {
	const plugin = template.manifest.plugins?.[0];
	if (!plugin?.name) return null;
	return {
		id: plugin.name,
		type: "expert",
		name: template.expertTitle || template.title,
		title: template.title,
		description: template.description,
		avatarUrl: template.avatar,
		plugin: plugin.name,
		agentName: plugin.agentName || plugin.name
	};
}
function resolveTemplateHiredExpertSource(template, allExperts, locale) {
	const matched = findExpertForTemplatePlugin(allExperts, template.manifest.plugins?.[0]);
	if (matched) return getSourceFromExpert(matched, matched.expertType === "team" ? "team" : "expert", locale);
	return buildFallbackHiredExpertSourceFromTemplate(template);
}
function normalizeTemplatePlugins(plugins) {
	const normalized = (plugins ?? []).filter((plugin) => plugin.name).map((plugin) => ({
		name: plugin.name,
		...plugin.agentName ? { agentName: plugin.agentName } : {},
		...plugin.downloadUrl ? { downloadUrl: plugin.downloadUrl } : {},
		marketplace: plugin.marketplace || "experts",
		...typeof plugin.forceInstall === "boolean" ? { forceInstall: plugin.forceInstall } : {}
	}));
	return normalized.length > 0 ? normalized : void 0;
}
var init_agent_template_mappers = __esmMin((() => {
	init_hire_expert_modal();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/colleagues-panel/index.tsx
function createEmptyModerationErrors() {
	return {
		roleNickname: null,
		description: null,
		name: null
	};
}
function createIdleModerationStatus() {
	return {
		roleNickname: "idle",
		description: "idle",
		name: "idle"
	};
}
function createEmptyModerationTextMap() {
	return {
		roleNickname: "",
		description: "",
		name: ""
	};
}
function isColleaguesFloatingChatGuideDismissed() {
	try {
		if (typeof window === "undefined" || !window.localStorage) return false;
		return window.localStorage.getItem(COLLEAGUES_FLOATING_CHAT_GUIDE_DISMISSED_KEY) === "1";
	} catch {
		return false;
	}
}
function markColleaguesFloatingChatGuideDismissed() {
	try {
		if (typeof window === "undefined" || !window.localStorage) return;
		window.localStorage.setItem(COLLEAGUES_FLOATING_CHAT_GUIDE_DISMISSED_KEY, "1");
	} catch {}
}
/**
* 将筛选项映射到状态指示点的视觉分组。
*
* 颜色定义对齐数字人工卡：空闲=绿、忙碌(工作中)=蓝、异常(离线)=灰。
* `all` 选项使用独立的黑色变体，区别于具体状态的彩色点，表达"全部"的中立语义。
*/
function getColleagueStatusFilterDotVariant(filter) {
	if (filter === "working") return "working";
	if (filter === "abnormal") return "abnormal";
	if (filter === "all") return "all";
	return "idle";
}
function writeRecentColleagueChatTarget(target) {
	if (typeof window === "undefined" || !target.agentId || !target.instanceId || !target.sessionId) return;
	try {
		window.localStorage.setItem(RECENT_COLLEAGUE_CHAT_STORAGE_KEY, JSON.stringify(target));
	} catch {}
}
function clearRecentColleagueChatTarget() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(RECENT_COLLEAGUE_CHAT_STORAGE_KEY);
	} catch {}
}
function getColleagueChatActionErrorMessage(error) {
	return error instanceof Error ? error.message : String(error ?? "Unknown error");
}
function handleColleagueChatActionError(action, error) {
	console.warn(`[ColleaguesPanel] ${action} failed`, error);
}
function getColleagueName(t, colleague) {
	return colleague.name ?? (colleague.nameKey ? t(colleague.nameKey) : "");
}
function getColleagueTitle(t, colleague) {
	return colleague.title ?? (colleague.titleKey ? t(colleague.titleKey) : "\xA0");
}
function getColleagueDescription(t, colleague) {
	return colleague.description ?? (colleague.descriptionKey ? t(colleague.descriptionKey) : "");
}
function getColleagueStatus(t, colleague) {
	return colleague.statusText ?? (colleague.statusKey ? t(colleague.statusKey) : t("colleagues.statusAvailable"));
}
function getColleagueTag(t, colleague, tag) {
	return colleague.tagsAreI18nKeys ? t(tag) : tag;
}
function matchesColleagueStatusFilter(colleague, filter) {
	switch (filter) {
		case "working": return colleague.statusVariant === "working";
		case "idle": return colleague.statusVariant === "idle";
		case "abnormal": return colleague.statusVariant === "abnormal";
		default: return true;
	}
}
function formatColleagueDateTime(value) {
	if (!value) return "--";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function getDaysOnDuty(value) {
	if (!value) return 48;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return 48;
	return Math.max(1, Math.ceil((Date.now() - date.getTime()) / 864e5));
}
function abbreviateDetailTaskId(value) {
	if (value.length <= 12) return value;
	return `${value.slice(0, 6)}...${value.slice(-4)}`;
}
function getDetailTaskStatusVariant(status) {
	const uiStatus = normalizeColleagueSessionStatus(status);
	if (uiStatus === "completed") return "completed";
	if (uiStatus === "running") return "working";
	return "idle";
}
function getDetailTaskStatusTextKey(statusVariant) {
	switch (statusVariant) {
		case "completed": return "colleagues.detail.status.completed";
		case "idle": return "colleagues.detail.status.idle";
		default: return "colleagues.detail.status.inProgress";
	}
}
function normalizeCloudAgentStatusToken(status) {
	return typeof status === "string" && status.trim() ? status.trim().toUpperCase().replace(/[\s-]+/g, "_") : void 0;
}
function isColleagueInstanceConnected(instance) {
	return normalizeCloudAgentStatusToken(instance?.status) === "RUNNING";
}
function getDerivedColleagueStatusTextKey(statusVariant) {
	switch (statusVariant) {
		case "abnormal": return "colleagues.detail.colleagueStatus.abnormal";
		case "working": return "colleagues.detail.colleagueStatus.working";
		default: return "colleagues.detail.colleagueStatus.idle";
	}
}
function slugifyAgentName(value) {
	return value.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || `agent-${Date.now()}`;
}
function sanitizeWorkspaceName(value, fallback) {
	return (value || fallback).trim().replace(/[\\/:*?"<>|\s]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64) || fallback;
}
function stripGitSuffix(value) {
	return value.replace(/\.git$/i, "");
}
function normalizeRepoUrlForCompare(value) {
	const raw = (value ?? "").trim();
	if (!raw) return "";
	try {
		const url = new URL(raw);
		const path = stripGitSuffix(url.pathname.replace(/\/+$/g, ""));
		return `${url.hostname.toLowerCase()}${path}`;
	} catch {
		return stripGitSuffix(raw.replace(/^https?:\/\//i, "").replace(/\/+$/g, ""));
	}
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
function parseRepoFullNameFromUrl(provider, repoUrl) {
	try {
		const path = stripGitSuffix(new URL(repoUrl).pathname.replace(/^\/+|\/+$/g, ""));
		if (!path) return;
		if (provider === "github") {
			const [owner, repo] = path.split("/");
			return owner && repo ? `${owner}/${repo}` : void 0;
		}
		return path;
	} catch {
		return;
	}
}
function getRepoNameFromFullName(fullName, fallback) {
	return fullName.split("/").filter(Boolean).pop() || fallback;
}
function isSameRepoSelection(selected, option) {
	if (selected.provider !== option.provider) return false;
	if (selected.id && option.id && selected.id === option.id) return true;
	const selectedUrl = normalizeRepoUrlForCompare(selected.cloneUrl);
	const optionUrl = normalizeRepoUrlForCompare(option.cloneUrl);
	return Boolean(selectedUrl && optionUrl && selectedUrl === optionUrl);
}
/**
* 计算落到 manifest.workspaces[].ref 的最终值。
*
* 取值优先级（与"方案 A"对齐）：
*   1. repo.ref —— 用户在仓库选择弹窗里手动选过的分支，最权威；
*   2. raw.default_branch —— 仅 GitHub / 工蜂 list-repos 接口提供，CNB 通常没有；
*
* 都没有就返回 undefined，**不再猜测** main/master，由后端用 `git ls-remote --symref` 解析。
*/
function resolveRepoRef(repo) {
	if (typeof repo.ref === "string" && repo.ref) return repo.ref;
	const raw = repo.raw;
	if (raw && typeof raw.default_branch === "string" && raw.default_branch) return raw.default_branch;
}
function buildAgentManifestWorkspaces(repos) {
	const workspaces = repos.map((repo) => {
		const name = sanitizeWorkspaceName(repo.fullName || repo.name, repo.name);
		const ref = resolveRepoRef(repo);
		return {
			name,
			repository: repo.cloneUrl,
			...ref ? { ref } : {}
		};
	});
	return workspaces.length > 0 ? workspaces : void 0;
}
/**
* 根据已选仓库计算 WB_CONNECTED_CONNECTOR 的 value：
*   - 取所有仓库的 provider，去重
*   - 按 INLINE_REPO_PROVIDERS 固定顺序输出，保证结果稳定可预测
*   - 逗号拼接；没有仓库返回空串
*/
function buildConnectedConnectorValue(repos) {
	const providers = new Set(repos.map((repo) => repo.provider));
	return INLINE_REPO_PROVIDERS.filter((provider) => providers.has(provider)).map((provider) => PROVIDER_CONNECTOR_ENV_VALUE[provider]).join(",");
}
/**
* 新建场景：从零构造 manifest.envs（仅含 WB_CONNECTED_CONNECTOR）。
* 没选仓库时返回 undefined，保持 manifest 干净。
*/
function buildAgentManifestEnvs(repos) {
	const value = buildConnectedConnectorValue(repos);
	if (!value) return;
	return [{
		key: WB_CONNECTED_CONNECTOR_ENV_KEY,
		value
	}];
}
/**
* 企业克隆场景：在 base manifest 已有 envs 基础上，替换/移除 WB_CONNECTED_CONNECTOR，
* 其它 env 原样保留。
*/
function mergeManifestEnvs(baseEnvs, repos) {
	const preserved = (baseEnvs ?? []).filter((env) => env.key !== WB_CONNECTED_CONNECTOR_ENV_KEY);
	const value = buildConnectedConnectorValue(repos);
	const merged = value ? [...preserved, {
		key: WB_CONNECTED_CONNECTOR_ENV_KEY,
		value
	}] : preserved;
	return merged.length > 0 ? merged : void 0;
}
/**
* 把雇佣的专家装配成 manifest.plugins[] 条目。
*
* 数据来源：本项目内置「专家 / 专家团」面板（`useExpertCenter`）的 ExpertInfo，
* 这些专家全部来自同一个公开 COS 桶 `expert-marketplace`，所以四个字段前端可以 100% 拼出来：
*
*   1. name        = ExpertInfo.plugin（缺失时回退 ExpertInfo.id），即 plugin bundle 名（kebab-case）
*   2. marketplace = 固定 'experts'，与后端 `services/.../manifest_strategy.go::expertsDir` 命名对齐
*   3. agentName   = ExpertInfo.agentName（缺失时回退 plugin 名），即 plugin 内的具体 agent 标识
*   4. downloadUrl = `${EXPERT_MARKETPLACE_BASE_URL}/bundles/${name}.tar.gz`，
*                    拼接规则跟主进程 `expert-plugin-service.ts::downloadAndExtract` 完全一致
*
* 单选：当前需求每次只能雇佣一位专家，所以最多一个条目。
*/
function buildAgentManifestPlugins(expert) {
	if (!expert) return;
	if (expert.type === "enterprise") {
		const enterpriseAgentId = expert.enterpriseAgentId || expert.id;
		if (!enterpriseAgentId) return;
		return [{
			name: enterpriseAgentId,
			marketplace: "enterprise-agents",
			agentName: expert.agentName || expert.name || enterpriseAgentId,
			sourceType: "enterprise-cloud-agent",
			enterpriseAgentId,
			displayName: expert.name,
			title: expert.title,
			description: expert.description,
			avatarUrl: expert.avatarUrl,
			publishedVersionId: expert.publishedVersionId,
			currentVersionNumber: expert.currentVersionNumber,
			model: expert.model,
			creatorName: expert.creatorName
		}];
	}
	const pluginName = expert.plugin || expert.id;
	if (!pluginName) return;
	return [{
		name: pluginName,
		marketplace: "experts",
		agentName: expert.agentName || pluginName,
		downloadUrl: `${EXPERT_MARKETPLACE_BASE_URL}/bundles/${pluginName}.tar.gz`
	}];
}
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function getManifestMemoryEnabled(manifest) {
	return asRecord(manifest?.memory).enable !== false;
}
function withManifestMemory(manifest, enabled) {
	return {
		...manifest,
		memory: {
			...asRecord(manifest.memory),
			enable: enabled
		}
	};
}
function normalizeManifestForMemoryUpdate(baseManifest, fallbackName) {
	const base = asRecord(baseManifest);
	const name = typeof base.name === "string" && base.name.trim() ? base.name : fallbackName.trim() || "Unnamed Agent";
	return {
		...base,
		id: typeof base.id === "string" && base.id ? base.id : slugifyAgentName(name),
		name,
		manifestVersion: typeof base.manifestVersion === "string" && base.manifestVersion ? base.manifestVersion : "1.0"
	};
}
/**
* 从 manifest.annotations["agent-title"] 读取已保存的同事昵称，用于编辑弹窗回显。
*/
function getColleagueProfessionalTitle(annotations) {
	const value = asRecord(annotations)[COLLEAGUE_TITLE_ANNOTATION_KEY];
	return typeof value === "string" && value.trim() ? value : void 0;
}
function firstNonEmptyString(...values) {
	for (const value of values) if (typeof value === "string" && value.trim()) return value.trim();
}
function getCloudAgentNickname(agent) {
	return firstNonEmptyString(agent.nickname, agent.nickName, agent.displayName, agent.agentName);
}
/**
* 将「同事昵称」写入 manifest.annotations["agent-title"]，同时保留 annotations 下其它业务扩展字段。
*/
function buildColleagueAnnotation(baseAnnotations, roleNickname) {
	const title = roleNickname.trim();
	const base = asRecord(baseAnnotations);
	if (!title) return Object.keys(base).length > 0 ? base : void 0;
	return {
		...base,
		[COLLEAGUE_TITLE_ANNOTATION_KEY]: title
	};
}
function buildCreateCloudAgentParams(options) {
	const agentName = options.name.trim();
	const description = stripTencentDocsContext(options.description).trim();
	const systemPrompt = mergeSystemPromptWithTencentDocs(description, options.docs);
	const manifestId = slugifyAgentName(agentName);
	const workspaces = buildAgentManifestWorkspaces(options.repos);
	const envs = buildAgentManifestEnvs(options.repos);
	const plugins = withForceInstallForExpertPlugins(options.plugins);
	const mcp = buildAgentManifestMcp(options.docs);
	const annotations = buildColleagueAnnotation(void 0, options.roleNickname);
	return {
		agentName,
		description,
		model: options.model,
		avatar: options.avatar,
		draft: false,
		manifest: {
			id: manifestId,
			name: agentName,
			manifestVersion: "1.0",
			...description ? { description } : {},
			...systemPrompt ? { system_prompt: systemPrompt } : {},
			...annotations ? { annotations } : {},
			...plugins ? { plugins } : {},
			...mcp ? { mcp } : {},
			...workspaces ? { workspaces } : {},
			...envs ? { envs } : {},
			memory: { enable: options.memoryEnabled }
		}
	};
}
/**
* 「编辑同事保存」专用的请求体构造函数。
*
* 与 buildCreateCloudAgentParams 的差异：
*  - 包含 `avatar`：确保编辑档案时的头像变更随版本发布请求透传给后端；
*  - 不再包含 `draft`：编辑保存始终发布新版本；
*  - 增加 `model` 入参：编辑模式下用户在第三步可重新选择模型，需要透传到接口；
*  - 返回类型对齐 CloudAgentPublishVersionParams（POST /v2/user/cloudagent/agents/:agentId/versions 请求体）。
*
* manifest 的拼装规则与「新建」一致：workspaces 只保存仓库，腾讯文档写入
* system_prompt 专用 XML，并在 manifest.mcp[] 中注入 user-mcp；plugins（雇佣专家）按原规则组装。
*/
function buildPublishVersionParams(options) {
	const agentName = options.name.trim();
	const description = stripTencentDocsContext(options.description).trim();
	const avatar = options.avatar?.trim();
	const systemPrompt = mergeSystemPromptWithTencentDocs(description, options.docs);
	const manifestId = slugifyAgentName(agentName);
	const workspaces = buildAgentManifestWorkspaces(options.repos);
	const envs = buildAgentManifestEnvs(options.repos);
	const plugins = withForceInstallForExpertPlugins(buildAgentManifestPlugins(options.hiredExpert));
	const mcp = buildAgentManifestMcp(options.docs);
	const annotations = buildColleagueAnnotation(void 0, options.roleNickname);
	return {
		agentName,
		description,
		...avatar ? { avatar } : {},
		model: options.model,
		manifest: {
			id: manifestId,
			name: agentName,
			manifestVersion: "1.0",
			...description ? { description } : {},
			...systemPrompt ? { system_prompt: systemPrompt } : {},
			...annotations ? { annotations } : {},
			...plugins ? { plugins } : {},
			...mcp ? { mcp } : {},
			...workspaces ? { workspaces } : {},
			...envs ? { envs } : {},
			memory: { enable: options.memoryEnabled }
		}
	};
}
function getWorkspaceMergeKey(workspace) {
	return [
		workspace.sourceType,
		workspace.repository,
		workspace.downloadUrl,
		workspace.name
	].filter((value) => typeof value === "string" && value.length > 0).join("|");
}
function mergeManifestWorkspaces(baseWorkspaces, appendedWorkspaces) {
	const result = [];
	const seen = /* @__PURE__ */ new Set();
	[...baseWorkspaces ?? [], ...appendedWorkspaces ?? []].forEach((workspace) => {
		const key = getWorkspaceMergeKey(workspace);
		if (key && seen.has(key)) return;
		if (key) seen.add(key);
		result.push(workspace);
	});
	return result.length > 0 ? result : void 0;
}
function buildPublishVersionParamsFromBaseManifest(options) {
	const agentName = options.name.trim();
	const description = stripTencentDocsContext(options.description).trim();
	const systemPrompt = mergeSystemPromptWithTencentDocs(description, options.docs);
	const baseManifest = options.baseManifest && typeof options.baseManifest === "object" ? options.baseManifest : void 0;
	const appendedWorkspaces = buildAgentManifestWorkspaces(options.repos);
	const workspaces = mergeManifestWorkspaces(Array.isArray(baseManifest?.workspaces) ? baseManifest.workspaces.filter((workspace) => workspace.sourceType !== "tencent-docs") : void 0, appendedWorkspaces);
	const mcp = mergeAgentManifestMcp(baseManifest?.mcp, options.docs);
	const annotations = buildColleagueAnnotation(baseManifest?.annotations, options.roleNickname);
	const plugins = withForceInstallForExpertPlugins(baseManifest?.plugins);
	const manifest = {
		...baseManifest ?? {},
		id: typeof baseManifest?.id === "string" && baseManifest.id ? baseManifest.id : slugifyAgentName(agentName),
		name: agentName,
		manifestVersion: typeof baseManifest?.manifestVersion === "string" && baseManifest.manifestVersion ? baseManifest.manifestVersion : "1.0",
		...description ? { description } : {},
		...systemPrompt ? { system_prompt: systemPrompt } : {},
		...annotations ? { annotations } : {},
		memory: {
			...asRecord(baseManifest?.memory),
			enable: getManifestMemoryEnabled(baseManifest)
		}
	};
	if (plugins) manifest.plugins = plugins;
	else delete manifest.plugins;
	if (workspaces) manifest.workspaces = workspaces;
	else delete manifest.workspaces;
	const envs = mergeManifestEnvs(baseManifest?.envs, options.repos);
	if (envs) manifest.envs = envs;
	else delete manifest.envs;
	if (mcp) manifest.mcp = mcp;
	else delete manifest.mcp;
	return {
		agentName,
		description,
		model: options.model || "claude-4",
		manifest
	};
}
function mapCloudAgentToColleague(agent, index) {
	const tags = [agent.model, agent.currentVersionNumber].filter((tag) => Boolean(tag));
	const manifest = agent.currentVersion?.manifest;
	const statusVariant = mapAgentStatusToVariant(agent.status);
	return {
		id: agent.id,
		businessAgentId: agent.agentId,
		name: getCloudAgentNickname(agent) || agent.agentId || `Agent ${agent.id}`,
		title: getColleagueProfessionalTitle(manifest?.annotations),
		description: agent.description || "",
		avatar: agent.avatar,
		model: agent.model,
		currentVersionNumber: agent.currentVersionNumber,
		publishedVersionId: agent.publishedVersionId,
		memoryEnabled: manifest ? getManifestMemoryEnabled(manifest) : DEFAULT_CLOUD_AGENT_MEMORY_ENABLED,
		memoryLoaded: Boolean(manifest),
		createdAt: agent.createdAt,
		updatedAt: agent.updatedAt,
		tags: tags.length > 0 ? tags : ["Cloud Agent"],
		usage: `${agent.instanceCount ?? 0} ${agent.instanceCount === 1 ? "instance" : "instances"}`,
		progress: Math.min(100, Math.max(8, (agent.instanceCount ?? 0) * 12 || 8 + index % 5 * 10)),
		connected: false,
		statusKey: getDerivedColleagueStatusTextKey(statusVariant),
		statusVariant
	};
}
function mergeCloudAgentListStatus(previous, next) {
	const previousById = new Map(previous.map((item) => [item.id, item]));
	return next.map((item) => {
		const oldItem = previousById.get(item.id);
		if (!oldItem) return item;
		return {
			...oldItem,
			...item,
			currentVersion: item.currentVersion ?? oldItem.currentVersion,
			instance: item.instance
		};
	});
}
function patchColleagueStatusFromRaw(colleague, raw) {
	const statusVariant = mapAgentStatusToVariant(raw.status);
	return {
		...colleague,
		usage: `${raw.instanceCount ?? 0} ${raw.instanceCount === 1 ? "instance" : "instances"}`,
		connected: raw.enabled !== false && isColleagueInstanceConnected(raw.instance),
		statusKey: getDerivedColleagueStatusTextKey(statusVariant),
		statusVariant,
		updatedAt: raw.updatedAt ?? colleague.updatedAt
	};
}
async function fetchGrantedColleaguesData(adapter) {
	if (!adapter.listGrantedCloudAgents) return {
		rawItems: [],
		colleagues: []
	};
	const data = await adapter.listGrantedCloudAgents({
		page: 1,
		pageSize: 100,
		agentRole: "specialist",
		withManifest: true
	});
	const first = data.items?.[0];
	console.info("[CloudAgent][list] items sample", {
		total: data.total,
		itemsCount: data.items?.length ?? 0,
		"items[0].id": {
			value: first?.id,
			type: typeof first?.id,
			length: typeof first?.id === "string" ? first.id.length : void 0
		},
		"items[0].agentId": {
			value: first?.agentId,
			type: typeof first?.agentId
		},
		"items[0].avatar": {
			value: first?.avatar,
			type: typeof first?.avatar
		},
		"items[0].publishedVersionId": {
			value: first?.publishedVersionId,
			type: typeof first?.publishedVersionId
		}
	});
	const rawItems = data.items ?? [];
	return {
		rawItems,
		colleagues: rawItems.map(mapCloudAgentToColleague)
	};
}
function normalizeOrchestratorColleague(agent) {
	return agent ? {
		...agent,
		name: "云助理",
		title: "",
		avatar: agent.avatar || "" + new URL("upgrade-banner-character-BhJsL3FN.png", import.meta.url).href,
		statusKey: getDerivedColleagueStatusTextKey(agent.statusVariant),
		tags: agent.tags.length > 0 ? agent.tags : ["Orchestrator"]
	} : null;
}
async function fetchOrchestrator(adapter) {
	if (!adapter.listGrantedCloudAgents) return null;
	const item = ((await adapter.listGrantedCloudAgents({
		page: 1,
		pageSize: 1,
		agentRole: "orchestrator",
		withManifest: true
	})).items ?? [])[0];
	return normalizeOrchestratorColleague(item ? mapCloudAgentToColleague(item, 0) : null);
}
function isAvatarImageUrl(avatar) {
	return /^(https?:|data:|blob:|file:|vscode-resource:|vscode-webview-resource:|\/)/i.test(avatar ?? "");
}
function getAvatarImageUrl(avatar) {
	const normalizedAvatar = avatar?.trim();
	if (!normalizedAvatar) return;
	if (isAvatarImageUrl(normalizedAvatar)) return normalizedAvatar;
	return AVATAR_PRESETS.find((preset) => preset.id === normalizedAvatar)?.imageUrl;
}
function parseBusinessErrorFromMessage(message) {
	if (typeof message !== "string") return;
	const jsonStart = message.indexOf("{");
	if (jsonStart < 0) return;
	try {
		const parsed = JSON.parse(message.slice(jsonStart));
		return {
			code: typeof parsed?.code === "number" ? parsed.code : void 0,
			msg: typeof parsed?.msg === "string" ? parsed.msg : void 0
		};
	} catch {
		return;
	}
}
function getInlineRepoErrorCode(error) {
	return error?.response?.data?.code ?? error?.data?.code ?? parseBusinessErrorFromMessage(error?.msg)?.code ?? parseBusinessErrorFromMessage(error?.message)?.code ?? error?.code;
}
function getInlineCnbConnectBackendMessage(error) {
	const candidates = [
		error?.response?.data?.msg,
		error?.response?.data?.message,
		error?.data?.msg,
		error?.data?.message,
		error?.error?.response?.data?.msg,
		error?.error?.response?.data?.message,
		error?.error?.data?.msg,
		error?.error?.data?.message,
		error?.error?.msg,
		error?.error?.message,
		error?.msg
	];
	for (const candidate of candidates) {
		const parsed = parseBusinessErrorFromMessage(candidate);
		if (parsed?.msg) return parsed.msg;
		if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
	}
}
function getInlineRepoErrorMessage(error) {
	const parsedFromMsg = parseBusinessErrorFromMessage(error?.msg);
	if (parsedFromMsg?.msg) return parsedFromMsg.msg;
	const parsedFromMessage = parseBusinessErrorFromMessage(error?.message);
	if (parsedFromMessage?.msg) return parsedFromMessage.msg;
	if (typeof error?.message === "string") return error.message;
	if (typeof error?.msg === "string") return error.msg;
	return String(error ?? "Unknown error");
}
function getInlineRepoKey(repo) {
	return `${repo.provider}:${repo.id}`;
}
function normalizeInlineRepos(provider, response) {
	if (provider === "github") return Object.values(response?.github_repos ?? {}).flat().map((repo) => ({
		provider,
		id: repo.full_name || repo.name,
		name: repo.name,
		fullName: repo.full_name || repo.name,
		cloneUrl: repo.clone_url,
		defaultBranch: typeof repo.default_branch === "string" ? repo.default_branch : void 0,
		raw: repo
	}));
	if (provider === "gongfeng") return (response?.gongfeng_repos ?? []).map((repo) => ({
		provider,
		id: String(repo.id),
		name: repo.name,
		fullName: repo.path_with_namespace || repo.name,
		cloneUrl: repo.https_url_to_repo,
		defaultBranch: typeof repo.default_branch === "string" ? repo.default_branch : void 0,
		projectId: repo.id != null ? String(repo.id) : void 0,
		raw: repo
	}));
	return (response?.cnb_repos ?? []).map((repo) => ({
		provider,
		id: repo.path || repo.name,
		name: repo.name,
		fullName: repo.path || repo.name,
		cloneUrl: repo.web_url,
		defaultBranch: typeof repo.default_branch === "string" ? repo.default_branch : void 0,
		raw: repo
	}));
}
function buildGitHubInstallURL(appName) {
	const state = encodeURIComponent(JSON.stringify({
		type: "github",
		event: "install"
	}));
	return `https://${GITHUB_DOMAIN}/apps/${appName || "CodeBuddy-Connector"}/installations/select_target?state=${state}`;
}
function openExternalUrl(adapter, url) {
	if (adapter.openExternal) {
		adapter.openExternal(url).catch((error) => console.error("[CreateColleague][repo] openExternal failed:", error));
		return;
	}
	window.open(url, "_blank");
}
var import_react, import_react_dom, import_jsx_runtime, CREATE_STEPS, INITIAL_VISIBLE_ROLE_PRESET_COUNT, INITIAL_VISIBLE_AVATAR_PRESET_COUNT, INLINE_REPO_PROVIDERS, GITHUB_DOMAIN, INLINE_REPO_POLL_INTERVAL, INLINE_REPO_MAX_POLL_ATTEMPTS, COLLEAGUES_FLOATING_CHAT_GUIDE_DISMISSED_KEY, COLLEAGUE_MODERATION_DEBOUNCE_MS, COLLEAGUE_MODERATION_FIELD_IDS, COLLEAGUE_MODERATION_ERROR_KEYS, AVATAR_PRESETS, DEFAULT_CLOUD_AGENT_MEMORY_ENABLED, RECENT_COLLEAGUE_CHAT_STORAGE_KEY, CUSTOM_AVATAR_MAX_SIZE, CUSTOM_AVATAR_ACCEPT, CUSTOM_AVATAR_ALLOWED_MIME_TYPES, COLLEAGUE_STATUS_FILTER_OPTIONS, COLLEAGUE_DETAIL_NAV_ITEMS, WB_CONNECTED_CONNECTOR_ENV_KEY, PROVIDER_CONNECTOR_ENV_VALUE, COLLEAGUE_TITLE_ANNOTATION_KEY, CloseIcon, HomeLineIcon, TaskListIcon, TrashLineIcon, ColleagueAvatar, FloatingChatIcon, CreateColleagueDialog, CHAT_FLOAT_EXIT_ANIMATION_MS, ColleaguesPanel;
var init_colleagues_panel = __esmMin((() => {
	init_colleagues_panel$1();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_foundation();
	init_Dropdown();
	init_icons();
	init_Message();
	init_use_floating_layer();
	init_use_qr_data_url();
	init_useI18n();
	init_constants();
	init_utils();
	init_expert();
	init_use_expert_center();
	init_avatar_url();
	init_router();
	init_services();
	init_format();
	init_upgrade_banner_character();
	init_icons$1();
	init_workbuddy_topbar();
	init_cloud_assistant_illustration();
	init_assistant_quota_limit_modal();
	init_assistant_quota_utils();
	init_bind_channel_modal();
	init_colleague_chat_page();
	init_colleague_chat_page_helpers();
	init_colleague_conversation_delete_confirm_dialog();
	init_colleagues_chat_float_colleague_rail();
	init_colleagues_chat_float_session_picker();
	init_default_model_picker();
	init_hire_expert_modal();
	init_colleague_conversation_tasks();
	init_use_agent_templates();
	init_use_cloud_agent_quota();
	init_use_colleague_field_moderation();
	init_use_colleague_name_unique_validation();
	init_use_my_colleague_conversations();
	init_use_qq_bind_session();
	init_pro_badge();
	init_publish_colleague_modal();
	init_searchable_select();
	init_colleague_navigation_bus();
	init_telemetry();
	init_tencent_docs_config_modal();
	init_tencent_docs_manifest_mcp();
	init_tencent_docs_system_prompt();
	init_agent_manifest_plugins();
	init_agent_status();
	init_agent_template_mappers();
	init_session_status();
	import_jsx_runtime = require_jsx_runtime();
	CREATE_STEPS = [{
		id: "basic",
		labelKey: "colleagues.createDialog.steps.basic"
	}];
	INITIAL_VISIBLE_ROLE_PRESET_COUNT = 3;
	INITIAL_VISIBLE_AVATAR_PRESET_COUNT = 9;
	INLINE_REPO_PROVIDERS = [
		"github",
		"cnb",
		"gongfeng"
	];
	GITHUB_DOMAIN = "github.com";
	INLINE_REPO_POLL_INTERVAL = 3e3;
	INLINE_REPO_MAX_POLL_ATTEMPTS = 100;
	COLLEAGUES_FLOATING_CHAT_GUIDE_DISMISSED_KEY = "cb.colleagues.floatingChatGuide.dismissed";
	COLLEAGUE_MODERATION_DEBOUNCE_MS = 600;
	COLLEAGUE_MODERATION_FIELD_IDS = {
		roleNickname: "create-colleague-role-nickname",
		description: "create-colleague-description",
		name: "create-colleague-name"
	};
	COLLEAGUE_MODERATION_ERROR_KEYS = {
		roleNickname: "colleagues.createDialog.moderationBlocked.roleNickname",
		description: "colleagues.createDialog.moderationBlocked.description",
		name: "colleagues.createDialog.moderationBlocked.name"
	};
	AVATAR_PRESETS = [
		{
			id: "avatar-01",
			labelKey: "colleagues.createDialog.avatar.preset01",
			initials: "01",
			variant: 1,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-1.png"
		},
		{
			id: "avatar-02",
			labelKey: "colleagues.createDialog.avatar.preset02",
			initials: "02",
			variant: 2,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-2.png"
		},
		{
			id: "avatar-03",
			labelKey: "colleagues.createDialog.avatar.preset03",
			initials: "03",
			variant: 3,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-3.png"
		},
		{
			id: "avatar-04",
			labelKey: "colleagues.createDialog.avatar.preset04",
			initials: "04",
			variant: 4,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-4.png"
		},
		{
			id: "avatar-05",
			labelKey: "colleagues.createDialog.avatar.preset05",
			initials: "05",
			variant: 5,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-5.png"
		},
		{
			id: "avatar-06",
			labelKey: "colleagues.createDialog.avatar.preset06",
			initials: "06",
			variant: 6,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-6.png"
		},
		{
			id: "avatar-07",
			labelKey: "colleagues.createDialog.avatar.preset07",
			initials: "07",
			variant: 7,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-7.png"
		},
		{
			id: "avatar-08",
			labelKey: "colleagues.createDialog.avatar.preset08",
			initials: "08",
			variant: 8,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-8.png"
		},
		{
			id: "avatar-09",
			labelKey: "colleagues.createDialog.avatar.preset09",
			initials: "09",
			variant: 9,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-9.png"
		},
		{
			id: "avatar-10",
			labelKey: "colleagues.createDialog.avatar.preset10",
			initials: "10",
			variant: 10,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/female-10.png"
		},
		{
			id: "avatar-11",
			labelKey: "colleagues.createDialog.avatar.preset11",
			initials: "11",
			variant: 11,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-1.png"
		},
		{
			id: "avatar-12",
			labelKey: "colleagues.createDialog.avatar.preset12",
			initials: "12",
			variant: 12,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-2.png"
		},
		{
			id: "avatar-13",
			labelKey: "colleagues.createDialog.avatar.preset13",
			initials: "13",
			variant: 13,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-3.png"
		},
		{
			id: "avatar-14",
			labelKey: "colleagues.createDialog.avatar.preset14",
			initials: "14",
			variant: 14,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-4.png"
		},
		{
			id: "avatar-15",
			labelKey: "colleagues.createDialog.avatar.preset15",
			initials: "15",
			variant: 15,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-5.png"
		},
		{
			id: "avatar-16",
			labelKey: "colleagues.createDialog.avatar.preset16",
			initials: "16",
			variant: 16,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-6.png"
		},
		{
			id: "avatar-17",
			labelKey: "colleagues.createDialog.avatar.preset17",
			initials: "17",
			variant: 17,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-7.png"
		},
		{
			id: "avatar-18",
			labelKey: "colleagues.createDialog.avatar.preset18",
			initials: "18",
			variant: 18,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-8.png"
		},
		{
			id: "avatar-19",
			labelKey: "colleagues.createDialog.avatar.preset19",
			initials: "19",
			variant: 19,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-9.png"
		},
		{
			id: "avatar-20",
			labelKey: "colleagues.createDialog.avatar.preset20",
			initials: "20",
			variant: 20,
			imageUrl: "https://download.codebuddy.cn/wb-zhuli/assets/avatars/male-10.png"
		}
	];
	DEFAULT_CLOUD_AGENT_MEMORY_ENABLED = true;
	RECENT_COLLEAGUE_CHAT_STORAGE_KEY = "workbuddy:colleague-chat:last-opened";
	CUSTOM_AVATAR_MAX_SIZE = 5 * 1024 * 1024;
	CUSTOM_AVATAR_ACCEPT = "image/png,image/jpeg,image/webp,image/gif";
	CUSTOM_AVATAR_ALLOWED_MIME_TYPES = new Set([
		"image/png",
		"image/jpeg",
		"image/webp",
		"image/gif"
	]);
	COLLEAGUE_STATUS_FILTER_OPTIONS = [
		{
			value: "all",
			labelKey: "colleagues.dashboard.filterAll"
		},
		{
			value: "idle",
			labelKey: "colleagues.dashboard.idle"
		},
		{
			value: "working",
			labelKey: "colleagues.statusAvailable"
		},
		{
			value: "abnormal",
			labelKey: "colleagues.dashboard.filterAbnormal"
		}
	];
	COLLEAGUE_DETAIL_NAV_ITEMS = [{
		id: "home",
		labelKey: "colleagues.detail.nav.home"
	}, {
		id: "tasks",
		labelKey: "colleagues.detail.nav.tasks"
	}];
	WB_CONNECTED_CONNECTOR_ENV_KEY = "WB_CONNECTED_CONNECTOR";
	PROVIDER_CONNECTOR_ENV_VALUE = {
		gongfeng: "enterprise_gongfeng",
		github: "github",
		cnb: "enterprise_cnb-apikey"
	};
	COLLEAGUE_TITLE_ANNOTATION_KEY = "agent-title";
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 20 20",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M5 5L15 15M15 5L5 15",
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round"
		})
	});
	HomeLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M3 8.1 9 3l6 5.1v6.4a1 1 0 0 1-1 1h-3.2v-4.2H7.2v4.2H4a1 1 0 0 1-1-1V8.1Z",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinejoin: "round"
		})
	});
	TaskListIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "4.2",
			y: "2.8",
			width: "9.6",
			height: "12.4",
			rx: "1.4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7.2 6.5h3.8M7.2 9h3.8M7.2 11.5h2.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
	TrashLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M2.5 3.5h9M5.5 3.5V2.5h3v1M3.5 3.5l.5 7.5h6l.5-7.5",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	ColleagueAvatar = ({ avatar, label, variant, className }) => {
		const imageUrl = getAvatarImageUrl(avatar);
		if (imageUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: `${className} colleague-card-avatar--image`,
			src: imageUrl,
			alt: "",
			"aria-hidden": "true"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `${className} colleague-card-avatar--${variant}`,
			"aria-hidden": "true",
			children: label
		});
	};
	FloatingChatIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "20",
		height: "20",
		viewBox: "-1 -1 22 22",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M19.3329 12.8061Q20.1702 10.9677 20.1702 8.9541Q20.1702 6.9404 19.3329 5.1021Q18.5275 3.3342 17.0632 1.9745Q15.6059 0.6212 13.7196 -0.1196Q11.7722 -0.8845 9.6429 -0.8845Q7.5136 -0.8845 5.5661 -0.1196Q3.6798 0.6212 2.2225 1.9745Q0.7582 3.3342 -0.0471 5.1021Q-0.8845 6.9404 -0.8845 8.9541Q-0.8845 12.4978 1.5311 15.2231L1.5312 15.2231Q2.5204 16.3391 2.6077 16.4829Q2.7877 16.7792 2.8495 17.1203Q2.8796 17.2858 2.8796 18.1661Q2.8796 18.864 3.0498 19.1627Q3.4256 19.8221 4.1846 19.8179Q4.5284 19.816 5.1328 19.467L5.3429 19.3457Q6.3318 18.7748 6.5565 18.7114Q6.6458 18.6861 6.7372 18.6699Q6.967 18.629 8.8172 18.7629Q9.2284 18.7926 9.6429 18.7926Q11.7722 18.7926 13.7196 18.0278Q15.6059 17.2869 17.0632 15.9337Q18.5275 14.574 19.3329 12.8061ZM15.8595 3.2707Q18.4012 5.6309 18.4012 8.9541Q18.4012 12.2773 15.8595 14.6374Q13.2897 17.0237 9.6429 17.0237Q9.2923 17.0237 8.9449 16.9985Q6.8745 16.8487 6.4273 16.9283Q6.2495 16.9599 6.0758 17.009Q5.6741 17.1224 4.6451 17.7068Q4.6345 17.0492 4.5901 16.8047Q4.4698 16.141 4.1196 15.5645Q3.9497 15.2848 2.8549 14.0497L2.8549 14.0497Q0.8845 11.8267 0.8845 8.9541Q0.8845 5.6309 3.4262 3.2707Q5.996 0.8845 9.6429 0.8845Q13.2897 0.8845 15.8595 3.2707Z",
			fill: "currentColor",
			fillRule: "evenodd"
		})
	});
	CreateColleagueDialog = ({ open, onClose, onCreated, presentation = "modal", editingAgentId, checkQuotaBeforeCreate, onQuotaExceeded }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const { account } = useAccount();
		const isIOA = isIOAUser(account?.enterpriseId ?? "");
		const isEnterpriseUser = !!account?.enterpriseId;
		const visibleInlineRepoProviders = import_react.useMemo(() => INLINE_REPO_PROVIDERS.filter((provider) => {
			if (provider === "gongfeng" && !isIOA) return false;
			if (provider === "cnb" && !isEnterpriseUser) return false;
			return true;
		}), [isIOA, isEnterpriseUser]);
		const isEditMode = !!editingAgentId;
		const isDrawerPresentation = presentation === "drawer";
		const zIndex = useFloatingLayer(open, { base: 1200 });
		/**
		* 全量专家列表 + locale：编辑模式下用 expertId lookup 回 ExpertInfo；新建模式下用模板 plugin
		* 反查真实专家，确保模板默认专家在 HireExpertModal 中尽量高亮。
		*/
		const locale = useLocale();
		const { allExperts } = useExpertCenter(null);
		const { templates: agentTemplates, loading: isLoadingTemplates, error: templatesError, reload: reloadAgentTemplates } = useAgentTemplates(open);
		const fileInputRef = import_react.useRef(null);
		const avatarRowRef = import_react.useRef(null);
		const createColleagueBodyRef = import_react.useRef(null);
		/** 创建/编辑提交开始时间戳，用于埋点 cost 计算 */
		const createStartTimeRef = import_react.useRef(0);
		const inlineRepoPollTimerRef = import_react.useRef(null);
		const inlineReposByProviderRef = import_react.useRef({
			github: [],
			cnb: [],
			gongfeng: []
		});
		const inlineLoadingReposRef = import_react.useRef(/* @__PURE__ */ new Set());
		const inlineRepoConnectorNameMapRef = import_react.useRef({
			github: "github",
			cnb: "cnb",
			gongfeng: "gongfeng"
		});
		const [currentStepIndex, setCurrentStepIndex] = import_react.useState(0);
		const [selectedTemplateId, setSelectedTemplateId] = import_react.useState(null);
		const [hasInitializedTemplate, setHasInitializedTemplate] = import_react.useState(false);
		const [roleNickname, setRoleNickname] = import_react.useState("");
		const [showAllRolePresets, setShowAllRolePresets] = import_react.useState(false);
		const [selectedAvatarId, setSelectedAvatarId] = import_react.useState("");
		const [customAvatarUrl, setCustomAvatarUrl] = import_react.useState(null);
		const [showAllAvatarPresets, setShowAllAvatarPresets] = import_react.useState(false);
		const [avatarScrollState, setAvatarScrollState] = import_react.useState({
			canScrollPrev: false,
			canScrollNext: false
		});
		const [isAdvancedConfigOpen, setIsAdvancedConfigOpen] = import_react.useState(false);
		const [isUploadingAvatar, setIsUploadingAvatar] = import_react.useState(false);
		const [avatarUploadError, setAvatarUploadError] = import_react.useState(null);
		const [name, setName] = import_react.useState("");
		const [description, setDescription] = import_react.useState("");
		const [hiredExpertSource, setHiredExpertSource] = import_react.useState(null);
		const [templatePlugins, setTemplatePlugins] = import_react.useState(null);
		const [isHiredExpertOverridden, setIsHiredExpertOverridden] = import_react.useState(false);
		const [selectedCodeRepos, setSelectedCodeRepos] = import_react.useState([]);
		const [inlineRepoStates, setInlineRepoStates] = import_react.useState({
			github: { stage: "unknown" },
			cnb: { stage: "unknown" },
			gongfeng: { stage: "unknown" }
		});
		const [inlineReposByProvider, setInlineReposByProvider] = import_react.useState({
			github: [],
			cnb: [],
			gongfeng: []
		});
		const [inlineRepoBranches, setInlineRepoBranches] = import_react.useState({});
		const [inlineLoadingBranches, setInlineLoadingBranches] = import_react.useState({});
		const [inlineRevokingProviders, setInlineRevokingProviders] = import_react.useState({});
		const [inlineCnbToken, setInlineCnbToken] = import_react.useState("");
		const [inlineCnbTokenError, setInlineCnbTokenError] = import_react.useState("");
		const [isInlineCnbTokenPanelOpen, setIsInlineCnbTokenPanelOpen] = import_react.useState(false);
		const [selectedTencentDocsFiles, setSelectedTencentDocsFiles] = import_react.useState([]);
		const [selectedModelId, setSelectedModelId] = import_react.useState("");
		const [memoryEnabled, setMemoryEnabled] = import_react.useState(DEFAULT_CLOUD_AGENT_MEMORY_ENABLED);
		const [isCreating, setIsCreating] = import_react.useState(false);
		const [isSubmitting, setIsSubmitting] = import_react.useState(false);
		const [createError, setCreateError] = import_react.useState(null);
		const [moderationErrors, setModerationErrors] = import_react.useState(createEmptyModerationErrors);
		const [moderationStatus, setModerationStatus] = import_react.useState(createIdleModerationStatus);
		const [isModeratingSubmit, setIsModeratingSubmit] = import_react.useState(false);
		const moderationTimersRef = import_react.useRef({
			roleNickname: null,
			description: null,
			name: null
		});
		const lastPassedModerationTextRef = import_react.useRef(createEmptyModerationTextMap());
		const moderationRequestSeqRef = import_react.useRef({
			roleNickname: 0,
			description: 0,
			name: 0
		});
		const [isHireExpertOpen, setIsHireExpertOpen] = import_react.useState(false);
		const [isTencentDocsConfigOpen, setIsTencentDocsConfigOpen] = import_react.useState(false);
		const [isLoadingDetail, setIsLoadingDetail] = import_react.useState(false);
		const { checkOne: checkModerationField, checkBatch: checkModerationFields } = useColleagueFieldModeration();
		const { status: nameUniqueStatus, error: nameUniqueError, validate: validateNameUnique, schedule: scheduleNameUniqueValidation, reset: resetNameUniqueValidation, clearScheduled: clearScheduledNameValidation } = useColleagueNameUniqueValidation({ excludeAgentId: editingAgentId });
		const avatarPresets = import_react.useMemo(() => buildTemplateAvatarPresets(agentTemplates), [agentTemplates]);
		const selectedAvatar = import_react.useMemo(() => avatarPresets.find((avatar) => avatar.id === selectedAvatarId) ?? avatarPresets[0], [avatarPresets, selectedAvatarId]);
		const selectedAvatarValue = customAvatarUrl ?? selectedAvatar?.imageUrl ?? selectedAvatar?.id ?? "";
		const currentStep = CREATE_STEPS[currentStepIndex] ?? CREATE_STEPS[0];
		const isLastStep = currentStepIndex === CREATE_STEPS.length - 1;
		const visibleRolePresets = showAllRolePresets ? agentTemplates : agentTemplates.slice(0, INITIAL_VISIBLE_ROLE_PRESET_COUNT);
		const visibleAvatarPresets = isDrawerPresentation ? avatarPresets : showAllAvatarPresets ? avatarPresets : avatarPresets.slice(0, INITIAL_VISIBLE_AVATAR_PRESET_COUNT);
		const canSubmitCurrentStep = currentStep.id !== "basic" || roleNickname.trim().length > 0 && name.trim().length > 0 && description.trim().length > 0;
		const nameFieldError = moderationErrors.name || nameUniqueError;
		const isNameUniqueChecking = nameUniqueStatus === "checking";
		const hasNameValidationError = Boolean(nameFieldError);
		const hasModerationError = Boolean(moderationErrors.roleNickname || moderationErrors.description || moderationErrors.name);
		const updateAvatarScrollState = import_react.useCallback(() => {
			const row = avatarRowRef.current;
			if (!row || !isDrawerPresentation) {
				setAvatarScrollState((prev) => prev.canScrollPrev || prev.canScrollNext ? {
					canScrollPrev: false,
					canScrollNext: false
				} : prev);
				return;
			}
			const maxLeft = Math.max(0, row.scrollWidth - row.clientWidth);
			const nextState = {
				canScrollPrev: row.scrollLeft > 1,
				canScrollNext: row.scrollLeft < maxLeft - 1
			};
			setAvatarScrollState((prev) => prev.canScrollPrev === nextState.canScrollPrev && prev.canScrollNext === nextState.canScrollNext ? prev : nextState);
		}, [isDrawerPresentation]);
		const handleAvatarPresetScroll = import_react.useCallback((direction) => {
			const row = avatarRowRef.current;
			if (!row) return;
			const maxLeft = Math.max(0, row.scrollWidth - row.clientWidth);
			const scrollDelta = row.clientWidth * .8;
			const nextLeft = direction === "prev" ? Math.max(0, row.scrollLeft - scrollDelta) : Math.min(maxLeft, row.scrollLeft + scrollDelta);
			row.scrollTo({
				left: nextLeft,
				behavior: "smooth"
			});
			requestAnimationFrame(updateAvatarScrollState);
		}, [updateAvatarScrollState]);
		import_react.useEffect(() => {
			if (!isDrawerPresentation) {
				updateAvatarScrollState();
				return;
			}
			const row = avatarRowRef.current;
			if (!row) return;
			const syncAvatarScrollState = () => updateAvatarScrollState();
			syncAvatarScrollState();
			row.addEventListener("scroll", syncAvatarScrollState, { passive: true });
			const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(syncAvatarScrollState);
			resizeObserver?.observe(row);
			window.addEventListener("resize", syncAvatarScrollState);
			return () => {
				row.removeEventListener("scroll", syncAvatarScrollState);
				resizeObserver?.disconnect();
				window.removeEventListener("resize", syncAvatarScrollState);
			};
		}, [
			avatarPresets.length,
			customAvatarUrl,
			isDrawerPresentation,
			updateAvatarScrollState
		]);
		import_react.useEffect(() => {
			if (!isEditMode || !customAvatarUrl || avatarPresets.length === 0) return;
			const matched = avatarPresets.find((avatar) => avatar.id === customAvatarUrl || avatar.imageUrl === customAvatarUrl);
			if (!matched) return;
			setSelectedAvatarId(matched.id);
			setCustomAvatarUrl(null);
		}, [
			avatarPresets,
			customAvatarUrl,
			isEditMode
		]);
		const clearModerationTimer = import_react.useCallback((key) => {
			const timer = moderationTimersRef.current[key];
			if (timer) {
				clearTimeout(timer);
				moderationTimersRef.current[key] = null;
			}
		}, []);
		const clearAllModerationTimers = import_react.useCallback(() => {
			Object.keys(moderationTimersRef.current).forEach(clearModerationTimer);
		}, [clearModerationTimer]);
		const resetModerationState = import_react.useCallback(() => {
			clearAllModerationTimers();
			setModerationErrors(createEmptyModerationErrors());
			setModerationStatus(createIdleModerationStatus());
			setIsModeratingSubmit(false);
			lastPassedModerationTextRef.current = createEmptyModerationTextMap();
			moderationRequestSeqRef.current = {
				roleNickname: 0,
				description: 0,
				name: 0
			};
		}, [clearAllModerationTimers]);
		/** 审核单个字段；使用请求序号避免旧请求覆盖用户后续输入。 */
		const validateModerationField = import_react.useCallback(async (key, value) => {
			clearModerationTimer(key);
			const trimmed = value.trim();
			const requestSeq = moderationRequestSeqRef.current[key] + 1;
			moderationRequestSeqRef.current[key] = requestSeq;
			if (!trimmed) {
				setModerationErrors((prev) => prev[key] ? {
					...prev,
					[key]: null
				} : prev);
				setModerationStatus((prev) => ({
					...prev,
					[key]: "idle"
				}));
				return true;
			}
			if (lastPassedModerationTextRef.current[key] === trimmed) {
				setModerationErrors((prev) => prev[key] ? {
					...prev,
					[key]: null
				} : prev);
				setModerationStatus((prev) => ({
					...prev,
					[key]: "idle"
				}));
				return true;
			}
			setModerationStatus((prev) => ({
				...prev,
				[key]: "checking"
			}));
			const result = await checkModerationField({
				key,
				text: trimmed
			});
			if (moderationRequestSeqRef.current[key] !== requestSeq) return true;
			if (result.pass) {
				lastPassedModerationTextRef.current[key] = trimmed;
				setModerationErrors((prev) => prev[key] ? {
					...prev,
					[key]: null
				} : prev);
				setModerationStatus((prev) => ({
					...prev,
					[key]: "idle"
				}));
				return true;
			}
			setModerationErrors((prev) => ({
				...prev,
				[key]: t(COLLEAGUE_MODERATION_ERROR_KEYS[key])
			}));
			setModerationStatus((prev) => ({
				...prev,
				[key]: "blocked"
			}));
			return false;
		}, [
			checkModerationField,
			clearModerationTimer,
			t
		]);
		const scheduleModerationField = import_react.useCallback((key, value) => {
			clearModerationTimer(key);
			const trimmed = value.trim();
			if (!trimmed || lastPassedModerationTextRef.current[key] === trimmed) {
				setModerationStatus((prev) => ({
					...prev,
					[key]: "idle"
				}));
				return;
			}
			moderationTimersRef.current[key] = setTimeout(() => {
				validateModerationField(key, value);
			}, COLLEAGUE_MODERATION_DEBOUNCE_MS);
		}, [clearModerationTimer, validateModerationField]);
		const handleModeratedFieldChange = import_react.useCallback((key, value) => {
			moderationRequestSeqRef.current[key] += 1;
			setModerationErrors((prev) => prev[key] ? {
				...prev,
				[key]: null
			} : prev);
			setModerationStatus((prev) => ({
				...prev,
				[key]: "idle"
			}));
			scheduleModerationField(key, value);
		}, [scheduleModerationField]);
		const handleNameBlur = import_react.useCallback(async (value) => {
			if (await validateModerationField("name", value)) await validateNameUnique(value);
		}, [validateModerationField, validateNameUnique]);
		const focusModerationField = import_react.useCallback((key) => {
			requestAnimationFrame(() => {
				const field = document.getElementById(COLLEAGUE_MODERATION_FIELD_IDS[key]);
				field?.focus();
				field?.scrollIntoView({
					block: "center",
					behavior: "smooth"
				});
			});
		}, []);
		const validateModerationBeforeSubmit = import_react.useCallback(async (fields) => {
			clearAllModerationTimers();
			fields.forEach((field) => {
				moderationRequestSeqRef.current[field.key] += 1;
			});
			setIsModeratingSubmit(true);
			setModerationStatus((prev) => ({
				...prev,
				roleNickname: "checking",
				description: "checking",
				name: "checking"
			}));
			try {
				const result = await checkModerationFields(fields);
				if (result.pass) {
					fields.forEach((field) => {
						lastPassedModerationTextRef.current[field.key] = field.text.trim();
					});
					setModerationErrors(createEmptyModerationErrors());
					setModerationStatus(createIdleModerationStatus());
					return true;
				}
				const blockedKey = result.blockedKey;
				setModerationStatus(createIdleModerationStatus());
				if (result.reason === "serviceUnavailable") setCreateError(t("colleagues.createDialog.moderationServiceUnavailable"));
				else if (!blockedKey || result.reason === "combinedBlocked") setCreateError(t("colleagues.createDialog.moderationCombinedBlocked"));
				if (blockedKey && result.reason !== "serviceUnavailable") {
					setModerationErrors((prev) => ({
						...prev,
						[blockedKey]: t(COLLEAGUE_MODERATION_ERROR_KEYS[blockedKey])
					}));
					setModerationStatus((prev) => ({
						...prev,
						[blockedKey]: "blocked"
					}));
					focusModerationField(blockedKey);
				}
				return false;
			} finally {
				setIsModeratingSubmit(false);
			}
		}, [
			checkModerationFields,
			clearAllModerationTimers,
			focusModerationField,
			t
		]);
		import_react.useEffect(() => {
			inlineReposByProviderRef.current = inlineReposByProvider;
		}, [inlineReposByProvider]);
		import_react.useEffect(() => () => clearAllModerationTimers(), [clearAllModerationTimers]);
		const applyTemplatePreset = import_react.useCallback((template) => {
			setSelectedTemplateId(template.id);
			setHasInitializedTemplate(true);
			setRoleNickname(template.title);
			if (!isDrawerPresentation) setName(template.manifest.name || template.title);
			setDescription(template.description);
			setSelectedAvatarId(template.avatar);
			setTemplatePlugins(template.manifest.plugins ?? null);
			setHiredExpertSource(resolveTemplateHiredExpertSource(template, allExperts, locale));
			setIsHiredExpertOverridden(false);
			setCustomAvatarUrl(null);
			setAvatarUploadError(null);
		}, [
			allExperts,
			isDrawerPresentation,
			locale
		]);
		import_react.useEffect(() => {
			if (!open) return;
			setCurrentStepIndex(0);
			setCreateError(null);
			setAvatarUploadError(null);
			setIsAdvancedConfigOpen(false);
			setIsUploadingAvatar(false);
			setIsCreating(false);
			resetModerationState();
			resetNameUniqueValidation();
			setMemoryEnabled(DEFAULT_CLOUD_AGENT_MEMORY_ENABLED);
			setIsHireExpertOpen(false);
			setIsTencentDocsConfigOpen(false);
			setTemplatePlugins(null);
			setIsHiredExpertOverridden(false);
			if (isEditMode && editingAgentId) if (!adapter.getCloudAgent) setCreateError(t("colleagues.editDialog.loadError"));
			else {
				let cancelled = false;
				setIsLoadingDetail(true);
				adapter.getCloudAgent({ agentId: editingAgentId }).then((detail) => {
					if (cancelled) return;
					console.info("[CloudAgent][edit] detail loaded", {
						requestedAgentId: {
							value: editingAgentId,
							type: typeof editingAgentId
						},
						"detail.id": {
							value: detail?.id,
							type: typeof detail?.id
						},
						"detail.agentId": {
							value: detail?.agentId,
							type: typeof detail?.agentId
						},
						"detail.publishedVersionId": {
							value: detail?.publishedVersionId,
							type: typeof detail?.publishedVersionId
						},
						"detail.currentVersion.id": {
							value: detail?.currentVersion?.id,
							type: typeof detail?.currentVersion?.id
						},
						roundTripMatches: String(detail?.id) === String(editingAgentId)
					});
					const manifest = detail.currentVersion?.manifest;
					setMemoryEnabled(getManifestMemoryEnabled(manifest));
					const rawSystemPrompt = typeof manifest?.system_prompt === "string" ? manifest.system_prompt : typeof manifest?.description === "string" ? manifest.description : detail.description ?? "";
					setSelectedTemplateId(null);
					setRoleNickname(getColleagueProfessionalTitle(manifest?.annotations) ?? detail.agentName ?? "");
					setShowAllRolePresets(false);
					setShowAllAvatarPresets(false);
					setName(detail.agentName ?? "");
					setDescription(stripTencentDocsContext(rawSystemPrompt));
					if (isAvatarImageUrl(detail.avatar)) setCustomAvatarUrl(detail.avatar ?? null);
					else if (detail.avatar && AVATAR_PRESETS.some((preset) => preset.id === detail.avatar)) {
						setSelectedAvatarId(detail.avatar);
						setCustomAvatarUrl(null);
					} else setCustomAvatarUrl(null);
					const detailModel = detail.currentVersion?.model ?? detail.model;
					if (detailModel) setSelectedModelId(detailModel);
					const workspaces = manifest?.workspaces;
					const docsFromSystemPrompt = parseTencentDocsFromSystemPrompt(rawSystemPrompt);
					if (Array.isArray(workspaces)) {
						const repos = [];
						const now = Date.now();
						workspaces.forEach((ws) => {
							if (ws?.repository) {
								const repoUrl = String(ws.repository);
								const provider = inferRepoProviderFromUrl(repoUrl);
								const persistedRef = typeof ws.ref === "string" && ws.ref ? ws.ref : void 0;
								const parsedFullName = parseRepoFullNameFromUrl(provider, repoUrl);
								const fallbackFullName = typeof ws.name === "string" && ws.name ? ws.name : repoUrl;
								const fullName = parsedFullName || fallbackFullName;
								repos.push({
									provider,
									id: fullName,
									name: getRepoNameFromFullName(fullName, String(ws.name ?? "")),
									fullName,
									cloneUrl: repoUrl,
									ref: persistedRef,
									selectedAt: now
								});
							}
						});
						setSelectedCodeRepos(repos);
					}
					setSelectedTencentDocsFiles(docsFromSystemPrompt);
					const plugins = manifest?.plugins;
					if (Array.isArray(plugins) && plugins.length > 0) {
						const first = plugins[0];
						const marketplace = typeof first?.marketplace === "string" ? first.marketplace : "";
						const sourceType = typeof first?.sourceType === "string" ? first.sourceType : "";
						if (marketplace === "enterprise-agents" || sourceType === "enterprise-cloud-agent") {
							const enterpriseAgentId = typeof first?.enterpriseAgentId === "string" && first.enterpriseAgentId || typeof first?.name === "string" && first.name || "";
							const agentName = typeof first?.agentName === "string" ? first.agentName : void 0;
							if (enterpriseAgentId) {
								const titleParts = [typeof first?.currentVersionNumber === "string" ? first.currentVersionNumber : void 0, typeof first?.model === "string" ? first.model : void 0].filter((part) => Boolean(part));
								setHiredExpertSource({
									id: enterpriseAgentId,
									type: "enterprise",
									name: agentName || enterpriseAgentId,
									title: titleParts.join(" · "),
									description: typeof first?.creatorName === "string" ? first.creatorName : "",
									agentName,
									enterpriseAgentId,
									publishedVersionId: typeof first?.publishedVersionId === "string" ? first.publishedVersionId : void 0,
									currentVersionNumber: typeof first?.currentVersionNumber === "string" ? first.currentVersionNumber : void 0,
									model: typeof first?.model === "string" ? first.model : void 0,
									creatorName: typeof first?.creatorName === "string" ? first.creatorName : void 0
								});
							}
						} else {
							const pluginName = typeof first?.name === "string" ? first.name : "";
							const initialId = typeof first?.expertId === "string" && first.expertId || pluginName;
							const rawType = typeof first?.expertType === "string" ? first.expertType : void 0;
							const expertType = rawType === "skill" || rawType === "agent" || rawType === "plugin" || rawType === "team" ? rawType : void 0;
							const agentName = typeof first?.agentName === "string" ? first.agentName : void 0;
							if (initialId) setHiredExpertSource({
								id: initialId,
								type: "expert",
								name: initialId,
								title: "",
								description: "",
								plugin: pluginName || void 0,
								agentName,
								expertType
							});
						}
					}
				}).catch((error) => {
					if (cancelled) return;
					setCreateError(error instanceof Error ? error.message : String(error));
				}).finally(() => {
					if (!cancelled) setIsLoadingDetail(false);
				});
				const handleKeyDown = (event) => {
					if (event.key === "Escape") onClose();
				};
				document.addEventListener("keydown", handleKeyDown);
				return () => {
					cancelled = true;
					document.removeEventListener("keydown", handleKeyDown);
				};
			}
			else {
				setSelectedTemplateId(null);
				setHasInitializedTemplate(false);
				setRoleNickname("");
				setShowAllRolePresets(false);
				setShowAllAvatarPresets(false);
				setName("");
				setDescription("");
				setSelectedAvatarId("");
				setTemplatePlugins(null);
				setIsHiredExpertOverridden(false);
				setCustomAvatarUrl(null);
				setAvatarUploadError(null);
				setSelectedCodeRepos([]);
				setSelectedTencentDocsFiles([]);
				setHiredExpertSource(null);
				setSelectedModelId("");
			}
			const handleKeyDown = (event) => {
				if (event.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [
			open,
			onClose,
			isEditMode,
			editingAgentId,
			adapter,
			resetModerationState,
			resetNameUniqueValidation,
			t
		]);
		import_react.useEffect(() => {
			if (!open || isEditMode || hasInitializedTemplate || agentTemplates.length === 0) return;
			if (name || roleNickname || description || customAvatarUrl) {
				setHasInitializedTemplate(true);
				return;
			}
			applyTemplatePreset(agentTemplates[0]);
		}, [
			agentTemplates,
			applyTemplatePreset,
			customAvatarUrl,
			description,
			hasInitializedTemplate,
			isEditMode,
			name,
			open,
			roleNickname
		]);
		/**
		* 雇佣专家展示信息升级：等 `allExperts` 加载好后，把仅有 expertId 的占位 hiredExpertSource
		* 升级成包含中文名 / 头像 / 职业的完整结构。
		*
		* 触发条件：
		*  1. allExperts 异步到货
		*  2. locale 切换
		*  3. 详情接口刚 set 出占位 hiredExpertSource
		*
		* 判断"是占位"：name === id 且 title 为空（避免反复覆盖用户在弹窗里刚选的新专家）。
		*/
		import_react.useEffect(() => {
			if (!hiredExpertSource || hiredExpertSource.type === "enterprise" || allExperts.length === 0) return;
			if (!isHiredExpertOverridden && templatePlugins?.[0]) {
				const matchedTemplateExpert = findExpertForTemplatePlugin(allExperts, templatePlugins[0]);
				if (matchedTemplateExpert && matchedTemplateExpert.id !== hiredExpertSource.id) setHiredExpertSource(getSourceFromExpert(matchedTemplateExpert, matchedTemplateExpert.expertType === "team" ? "team" : "expert", locale));
				return;
			}
			if (!(hiredExpertSource.name === hiredExpertSource.id && !hiredExpertSource.title)) return;
			let matched = allExperts.find((exp) => exp.id === hiredExpertSource.id);
			if (!matched && hiredExpertSource.plugin) matched = allExperts.find((exp) => exp.plugin === hiredExpertSource.plugin);
			if (!matched && hiredExpertSource.id) matched = allExperts.find((exp) => exp.plugin === hiredExpertSource.id);
			if (!matched) return;
			const sourceType = hiredExpertSource.type === "team" ? "team" : "expert";
			const upgraded = getSourceFromExpert(matched, sourceType, locale);
			setHiredExpertSource((prev) => {
				if (!prev) return prev;
				return upgraded;
			});
		}, [
			allExperts,
			hiredExpertSource,
			isHiredExpertOverridden,
			locale,
			templatePlugins
		]);
		/** 关闭/取消创建面板时上报埋点 #19 */
		const handleCancelOrClose = import_react.useCallback((action) => {
			reportCreateCancelClick(adapter, { action });
			onClose();
		}, [adapter, onClose]);
		const handleOverlayMouseDown = import_react.useCallback((event) => {
			if (event.target === event.currentTarget) handleCancelOrClose("close");
		}, [handleCancelOrClose]);
		const handleSelectTemplatePreset = import_react.useCallback((template) => {
			applyTemplatePreset(template);
		}, [applyTemplatePreset]);
		const handleSelectCustomRole = import_react.useCallback(() => {
			setSelectedTemplateId("");
			setHasInitializedTemplate(true);
			setTemplatePlugins(null);
			setIsHiredExpertOverridden(false);
			setHiredExpertSource(null);
		}, []);
		const handleSelectAvatarPreset = import_react.useCallback((avatarId) => {
			setSelectedAvatarId(avatarId);
			setCustomAvatarUrl(null);
			setAvatarUploadError(null);
		}, []);
		const handleUploadAvatarClick = import_react.useCallback(() => {
			if (isUploadingAvatar) return;
			fileInputRef.current?.click();
		}, [isUploadingAvatar]);
		const handleAvatarFileChange = import_react.useCallback((event) => {
			const file = event.currentTarget.files?.[0];
			event.currentTarget.value = "";
			if (!file) return;
			if (!adapter.uploadColleagueAvatar) {
				setAvatarUploadError(t("colleagues.createDialog.avatarUploadUnsupported"));
				return;
			}
			if (!CUSTOM_AVATAR_ALLOWED_MIME_TYPES.has(file.type)) {
				setAvatarUploadError(t("colleagues.createDialog.avatarUploadInvalidType"));
				return;
			}
			if (file.size > CUSTOM_AVATAR_MAX_SIZE) {
				setAvatarUploadError(t("colleagues.createDialog.avatarUploadTooLarge"));
				return;
			}
			setIsUploadingAvatar(true);
			setAvatarUploadError(null);
			adapter.uploadColleagueAvatar(file).then((result) => {
				setCustomAvatarUrl(result.avatarUrl);
				setAvatarUploadError(null);
			}).catch((error) => {
				console.error("[CloudAgent][avatar] upload failed", error);
				setAvatarUploadError(error instanceof Error ? error.message : String(error));
			}).finally(() => setIsUploadingAvatar(false));
		}, [adapter, t]);
		const handleConfirmHireExpert = import_react.useCallback((source) => {
			if (source) reportCreateExpertSelectClick(adapter, { expertId: source.id });
			setHiredExpertSource(source);
			setIsHiredExpertOverridden(true);
			setIsHireExpertOpen(false);
		}, [adapter]);
		const handleSaveTencentDocsConfig = import_react.useCallback((files) => {
			setSelectedTencentDocsFiles(files);
			setIsTencentDocsConfigOpen(false);
		}, []);
		const updateInlineRepoState = import_react.useCallback((provider, patch) => {
			setInlineRepoStates((prev) => ({
				...prev,
				[provider]: {
					...prev[provider],
					...patch
				}
			}));
		}, []);
		const resolveInlineConnectorName = import_react.useCallback((provider) => inlineRepoConnectorNameMapRef.current[provider] || provider, []);
		const resolveInlineConnectorNames = import_react.useCallback(async () => {
			if (!adapter.connectorRegistry2cList) return;
			try {
				const resp = await adapter.connectorRegistry2cList("all");
				if (resp?.code !== 0 || !resp.data?.list) return;
				const names = new Set(resp.data.list.map((item) => item.name));
				inlineRepoConnectorNameMapRef.current.gongfeng = !names.has("gongfeng") && names.has("enterprise_gongfeng") ? "enterprise_gongfeng" : "gongfeng";
			} catch (error) {
				console.warn("[CreateColleague][repo] resolve connector names failed:", error);
			}
		}, [adapter]);
		const loadInlineBranches = import_react.useCallback(async (repo) => {
			const key = getInlineRepoKey(repo);
			if (!adapter.getBranches || inlineLoadingBranches[key]) return;
			setInlineLoadingBranches((prev) => ({
				...prev,
				[key]: true
			}));
			try {
				let params;
				if (repo.provider === "github") {
					const raw = repo.raw;
					const [ownerFromName, repoFromName] = (repo.fullName || "").split("/");
					const owner = raw?.owner?.login || ownerFromName;
					const repoName = raw?.name || repoFromName || repo.name;
					if (!owner || !repoName) throw new Error("github branch params missing owner/repo");
					params = {
						owner,
						repo: repoName
					};
				} else if (repo.provider === "gongfeng") {
					const raw = repo.raw;
					const projectId = repo.projectId || (raw?.id != null ? String(raw.id) : "");
					if (!projectId) throw new Error("gongfeng branch params missing project_id");
					params = { project_id: projectId };
				} else {
					if (!repo.fullName) throw new Error("cnb branch params missing repo");
					params = { repo: repo.fullName };
				}
				const branches = await adapter.getBranches(resolveInlineConnectorName(repo.provider), params);
				const names = (Array.isArray(branches) ? branches : []).map((branch) => branch?.name).filter((name) => typeof name === "string" && name.length > 0);
				setInlineRepoBranches((prev) => ({
					...prev,
					[key]: names
				}));
			} catch (error) {
				console.warn("[CreateColleague][repo] load branches failed:", error);
				setInlineRepoBranches((prev) => ({
					...prev,
					[key]: []
				}));
			} finally {
				setInlineLoadingBranches((prev) => {
					const next = { ...prev };
					delete next[key];
					return next;
				});
			}
		}, [
			adapter,
			inlineLoadingBranches,
			resolveInlineConnectorName
		]);
		const loadInlineRepos = import_react.useCallback(async (provider, force = false) => {
			const cachedRepos = inlineReposByProviderRef.current[provider];
			if (!force && cachedRepos.length > 0) {
				updateInlineRepoState(provider, {
					stage: "repo_ready",
					error: void 0
				});
				return cachedRepos;
			}
			if (inlineLoadingReposRef.current.has(provider)) return cachedRepos;
			inlineLoadingReposRef.current.add(provider);
			updateInlineRepoState(provider, {
				stage: "repo_loading",
				error: void 0
			});
			try {
				if (!adapter.connectorOauthRepos) throw new Error("connectorOauthRepos not supported by current adapter");
				const resp = await adapter.connectorOauthRepos(resolveInlineConnectorName(provider));
				if (resp.code !== 0) throw resp;
				const repos = normalizeInlineRepos(provider, resp.data);
				inlineReposByProviderRef.current = {
					...inlineReposByProviderRef.current,
					[provider]: repos
				};
				setInlineReposByProvider((prev) => ({
					...prev,
					[provider]: repos
				}));
				if (provider === "github" && repos.length === 0) {
					updateInlineRepoState(provider, {
						stage: "repo_not_installed",
						error: void 0
					});
					return repos;
				}
				updateInlineRepoState(provider, {
					stage: "repo_ready",
					error: void 0
				});
				return repos;
			} catch (error) {
				const code = getInlineRepoErrorCode(error);
				console.warn("[ColleagueChat] connectorOauthRepos failed", {
					provider,
					code,
					error
				});
				if (provider === "github" && code === 10098) {
					updateInlineRepoState(provider, {
						stage: "repo_not_installed",
						error: void 0
					});
					return [];
				}
				if (CONNECTOR_NO_AUTH.includes(code) || code === 10102) {
					updateInlineRepoState(provider, {
						stage: "repo_unauthorized",
						error: getInlineRepoErrorMessage(error)
					});
					return [];
				}
				if (code === 10102) {
					updateInlineRepoState(provider, {
						stage: "repo_forbidden",
						error: getInlineRepoErrorMessage(error)
					});
					return [];
				}
				updateInlineRepoState(provider, {
					stage: "error",
					error: getInlineRepoErrorMessage(error)
				});
				return [];
			} finally {
				inlineLoadingReposRef.current.delete(provider);
			}
		}, [
			adapter,
			resolveInlineConnectorName,
			updateInlineRepoState
		]);
		const loadInlineConnectorStatus = import_react.useCallback(async () => {
			await Promise.all(visibleInlineRepoProviders.map(async (provider) => {
				if (adapter.connectorOauthStatus) try {
					await adapter.connectorOauthStatus(resolveInlineConnectorName(provider));
				} catch (error) {
					console.warn("[CreateColleague][repo] connector status check failed, fallback to repos:", provider, error);
				}
				await loadInlineRepos(provider, true);
			}));
		}, [
			adapter,
			loadInlineRepos,
			resolveInlineConnectorName,
			visibleInlineRepoProviders
		]);
		const pollInlineConnectorConnected = import_react.useCallback((provider, attempts = 0) => {
			if (inlineRepoPollTimerRef.current) clearTimeout(inlineRepoPollTimerRef.current);
			inlineRepoPollTimerRef.current = setTimeout(async () => {
				try {
					if (!adapter.connectorOauthStatus) throw new Error("connectorOauthStatus not supported by current adapter");
					const resp = await adapter.connectorOauthStatus(resolveInlineConnectorName(provider));
					if (resp.code === 0 && resp.data?.status === "connected") {
						reportRepositoryAuthResult(adapter, { status: "success" });
						await loadInlineRepos(provider, true);
						return;
					}
				} catch {}
				if (attempts + 1 >= INLINE_REPO_MAX_POLL_ATTEMPTS) {
					reportRepositoryAuthResult(adapter, {
						status: "failed",
						errorCode: "auth_timeout"
					});
					updateInlineRepoState(provider, {
						stage: "error",
						error: t("colleagues.createDialog.codeRepo.authTimeout")
					});
					return;
				}
				pollInlineConnectorConnected(provider, attempts + 1);
			}, INLINE_REPO_POLL_INTERVAL);
		}, [
			adapter,
			loadInlineRepos,
			resolveInlineConnectorName,
			t,
			updateInlineRepoState
		]);
		const pollInlineGitHubReposReady = import_react.useCallback((attempts = 0) => {
			if (inlineRepoPollTimerRef.current) clearTimeout(inlineRepoPollTimerRef.current);
			inlineRepoPollTimerRef.current = setTimeout(async () => {
				if ((await loadInlineRepos("github", true)).length > 0) return;
				if (attempts + 1 >= INLINE_REPO_MAX_POLL_ATTEMPTS) {
					updateInlineRepoState("github", { stage: "repo_not_installed" });
					return;
				}
				pollInlineGitHubReposReady(attempts + 1);
			}, INLINE_REPO_POLL_INTERVAL);
		}, [loadInlineRepos, updateInlineRepoState]);
		const handleInlineConnectOAuth = import_react.useCallback(async (provider) => {
			updateInlineRepoState(provider, {
				stage: "oauth_connecting",
				error: void 0
			});
			try {
				if (!adapter.connectorOauthStart) throw new Error("connectorOauthStart not supported by current adapter");
				const resp = await adapter.connectorOauthStart(resolveInlineConnectorName(provider));
				if (resp.code !== 0) throw resp;
				const data = resp.data;
				if (data?.next_action === "connected") {
					await loadInlineRepos(provider, true);
					return;
				}
				if (data?.next_action !== "redirect" || !data?.authorize_url) throw new Error(`unsupported connector oauth action: ${data?.next_action || "unknown"}`);
				openExternalUrl(adapter, data.authorize_url);
				pollInlineConnectorConnected(provider);
			} catch (error) {
				updateInlineRepoState(provider, {
					stage: "error",
					error: getInlineRepoErrorMessage(error)
				});
			}
		}, [
			adapter,
			loadInlineRepos,
			pollInlineConnectorConnected,
			resolveInlineConnectorName,
			updateInlineRepoState
		]);
		const handleInlineConnectCNB = import_react.useCallback(async () => {
			const token = inlineCnbToken.trim();
			if (!token) {
				setInlineCnbTokenError(t("connectors.input.required"));
				return;
			}
			setInlineCnbTokenError("");
			updateInlineRepoState("cnb", {
				stage: "oauth_connecting",
				error: void 0
			});
			try {
				if (!adapter.connectorOauthConnect) throw new Error("connectorOauthConnect not supported by current adapter");
				const resp = await adapter.connectorOauthConnect(resolveInlineConnectorName("cnb"), { code: token });
				if (resp.code !== 0 && resp.code !== 409) throw resp;
				setInlineCnbToken("");
				setIsInlineCnbTokenPanelOpen(false);
				reportRepositoryAuthResult(adapter, { status: "success" });
				await loadInlineRepos("cnb", true);
			} catch (error) {
				const code = getInlineRepoErrorCode(error);
				console.warn("[ColleagueChat] connectorOauthConnect failed", {
					code,
					error
				});
				const message = getInlineCnbConnectBackendMessage(error) ?? ([10100, 10102].includes(code) ? t("connectors.cnb.tokenInvalidOrNoAuth") : t("connectors.cnb.connectFail"));
				reportRepositoryAuthResult(adapter, {
					status: "failed",
					errorCode: String(code ?? "unknown")
				});
				setInlineCnbTokenError(message);
				updateInlineRepoState("cnb", {
					stage: "oauth_disconnected",
					error: message
				});
			}
		}, [
			adapter,
			inlineCnbToken,
			loadInlineRepos,
			resolveInlineConnectorName,
			t,
			updateInlineRepoState
		]);
		const handleInlineRevokeProvider = import_react.useCallback(async (provider) => {
			if (inlineRevokingProviders[provider]) return;
			setInlineRevokingProviders((prev) => ({
				...prev,
				[provider]: true
			}));
			try {
				if (!adapter.connectorOauthRevoke) throw new Error("connectorOauthRevoke not supported by current adapter");
				const resp = await adapter.connectorOauthRevoke(resolveInlineConnectorName(provider));
				if (resp.code !== 0) throw resp;
				inlineReposByProviderRef.current = {
					...inlineReposByProviderRef.current,
					[provider]: []
				};
				setInlineReposByProvider((prev) => ({
					...prev,
					[provider]: []
				}));
				setSelectedCodeRepos((prev) => prev.filter((repo) => repo.provider !== provider));
				setInlineRepoBranches((prev) => {
					const next = { ...prev };
					Object.keys(next).forEach((key) => {
						if (key.startsWith(`${provider}:`)) delete next[key];
					});
					return next;
				});
				setInlineCnbToken("");
				setInlineCnbTokenError("");
				if (provider === "cnb") setIsInlineCnbTokenPanelOpen(false);
				updateInlineRepoState(provider, {
					stage: "oauth_disconnected",
					error: void 0
				});
			} catch (error) {
				updateInlineRepoState(provider, {
					stage: "error",
					error: getInlineRepoErrorMessage(error)
				});
			} finally {
				setInlineRevokingProviders((prev) => {
					const next = { ...prev };
					delete next[provider];
					return next;
				});
			}
		}, [
			adapter,
			inlineRevokingProviders,
			resolveInlineConnectorName,
			updateInlineRepoState
		]);
		const handleInlineSelectGitHubRepos = import_react.useCallback(async () => {
			updateInlineRepoState("github", {
				stage: "repo_selecting",
				error: void 0
			});
			let appName;
			try {
				if (adapter.getUserConnector) appName = (await adapter.getUserConnector())?.connectors?.find((item) => item.name === "github")?.oauthAppName || void 0;
			} catch (error) {
				console.warn("[CreateColleague][repo] resolve github app failed:", error);
			}
			openExternalUrl(adapter, buildGitHubInstallURL(appName));
			pollInlineGitHubReposReady();
		}, [
			adapter,
			pollInlineGitHubReposReady,
			updateInlineRepoState
		]);
		const handleInlineRepoProviderAction = import_react.useCallback((provider) => {
			const stage = inlineRepoStates[provider].stage;
			const isBusy = stage === "unknown" || stage === "repo_loading" || stage === "oauth_connecting" || stage === "repo_selecting";
			const needsConnect = stage === "oauth_disconnected" || stage === "repo_unauthorized" || stage === "repo_not_installed";
			const needsRetry = stage === "repo_forbidden" || stage === "error";
			if (isBusy || inlineRevokingProviders[provider]) return;
			if (needsRetry) {
				if (provider === "cnb") {
					setInlineCnbTokenError("");
					setIsInlineCnbTokenPanelOpen(true);
				} else handleInlineConnectOAuth(provider);
				return;
			}
			if (provider === "github" && stage === "repo_not_installed") {
				handleInlineSelectGitHubRepos();
				return;
			}
			if (needsConnect) {
				if (provider === "cnb") {
					setInlineCnbTokenError("");
					setIsInlineCnbTokenPanelOpen(true);
					return;
				}
				handleInlineConnectOAuth(provider);
				return;
			}
			handleInlineRevokeProvider(provider);
		}, [
			handleInlineConnectCNB,
			handleInlineConnectOAuth,
			handleInlineRevokeProvider,
			handleInlineSelectGitHubRepos,
			inlineRepoStates,
			inlineRevokingProviders,
			loadInlineRepos
		]);
		const handleInlineAddRepo = import_react.useCallback((provider) => {
			const repo = inlineReposByProvider[provider].find((item) => !selectedCodeRepos.some((selected) => isSameRepoSelection(selected, item)));
			if (!repo) return;
			setSelectedCodeRepos((prev) => [...prev, {
				...repo,
				ref: void 0,
				selectedAt: Date.now()
			}]);
			loadInlineBranches(repo);
		}, [
			inlineReposByProvider,
			loadInlineBranches,
			selectedCodeRepos
		]);
		const handleInlineChangeRepo = import_react.useCallback((provider, previousRepoId, nextRepoId) => {
			const nextRepo = inlineReposByProvider[provider].find((item) => item.id === nextRepoId);
			setSelectedCodeRepos((prev) => {
				const withoutPrevious = previousRepoId ? prev.filter((item) => !(item.provider === provider && item.id === previousRepoId)) : prev;
				if (!nextRepo) return withoutPrevious;
				return [...withoutPrevious.filter((item) => !isSameRepoSelection(item, nextRepo)), {
					...nextRepo,
					ref: void 0,
					selectedAt: Date.now()
				}];
			});
			if (nextRepo) loadInlineBranches(nextRepo);
		}, [inlineReposByProvider, loadInlineBranches]);
		const handleInlineRemoveRepo = import_react.useCallback((provider, repoId) => {
			setSelectedCodeRepos((prev) => prev.filter((repo) => !(repo.provider === provider && repo.id === repoId)));
		}, []);
		const handleInlineSelectBranch = import_react.useCallback((provider, repoId, branch) => {
			setSelectedCodeRepos((prev) => prev.map((repo) => repo.provider === provider && repo.id === repoId ? {
				...repo,
				ref: branch || void 0
			} : repo));
		}, []);
		import_react.useEffect(() => {
			if (!open) return;
			setInlineCnbToken("");
			setInlineCnbTokenError("");
			setIsInlineCnbTokenPanelOpen(false);
			setInlineRepoBranches({});
			setInlineLoadingBranches({});
			setInlineRevokingProviders({});
			resolveInlineConnectorNames().then(loadInlineConnectorStatus).catch((error) => {
				const message = getInlineRepoErrorMessage(error);
				visibleInlineRepoProviders.forEach((provider) => updateInlineRepoState(provider, {
					stage: "error",
					error: message
				}));
			});
			return () => {
				if (inlineRepoPollTimerRef.current) {
					clearTimeout(inlineRepoPollTimerRef.current);
					inlineRepoPollTimerRef.current = null;
				}
			};
		}, [
			loadInlineConnectorStatus,
			open,
			resolveInlineConnectorNames,
			updateInlineRepoState
		]);
		import_react.useEffect(() => {
			if (!open) return;
			setSelectedCodeRepos((prev) => {
				let changed = false;
				const next = prev.map((selected) => {
					const matched = inlineReposByProvider[selected.provider].find((option) => isSameRepoSelection(selected, option));
					if (!matched) return selected;
					const hydrated = {
						...matched,
						ref: selected.ref,
						raw: selected.raw,
						selectedAt: selected.selectedAt
					};
					if (selected.id === hydrated.id && selected.name === hydrated.name && selected.fullName === hydrated.fullName && selected.cloneUrl === hydrated.cloneUrl && selected.defaultBranch === hydrated.defaultBranch && selected.projectId === hydrated.projectId) return selected;
					changed = true;
					return hydrated;
				});
				return changed ? next : prev;
			});
		}, [inlineReposByProvider, open]);
		import_react.useEffect(() => {
			if (!open) return;
			selectedCodeRepos.forEach((repo) => {
				const key = getInlineRepoKey(repo);
				if (!inlineRepoBranches[key] && !inlineLoadingBranches[key]) loadInlineBranches(repo);
			});
		}, [
			inlineLoadingBranches,
			inlineRepoBranches,
			loadInlineBranches,
			open,
			selectedCodeRepos
		]);
		const renderInlineRepoConfig = (provider) => {
			const providerLabel = t(`colleagues.createDialog.codeRepo.provider.${provider}`);
			const stage = inlineRepoStates[provider].stage;
			if (stage === "unknown" || stage === "repo_loading" || stage === "oauth_connecting" || stage === "repo_selecting") return null;
			if (provider === "github" && stage === "repo_not_installed") return null;
			if (stage === "oauth_disconnected" || stage === "repo_unauthorized") return null;
			if (stage === "repo_forbidden" || stage === "error") return null;
			const providerRepos = inlineReposByProvider[provider];
			const selectedProviderRepos = selectedCodeRepos.filter((repo) => repo.provider === provider);
			const rows = selectedProviderRepos.length > 0 ? selectedProviderRepos : [null];
			const hasSelectableRepo = providerRepos.some((repo) => !selectedCodeRepos.some((selected) => isSameRepoSelection(selected, repo)));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "create-colleague-inline-repo-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "create-colleague-inline-repo-card-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: providerLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "create-colleague-inline-repo-add",
							onClick: () => handleInlineAddRepo(provider),
							disabled: !hasSelectableRepo,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepoConnectIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("common.add") })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "create-colleague-repo-row-list",
						"aria-label": t("colleagues.createDialog.codeRepo.selectedRepos"),
						children: rows.map((repo, index) => {
							const repoKey = repo ? getInlineRepoKey(repo) : `${provider}:empty`;
							const branches = repo ? inlineRepoBranches[repoKey] ?? [] : [];
							const defaultBranch = repo?.defaultBranch;
							const branchOptions = Array.from(new Set([
								...branches,
								...repo?.ref ? [repo.ref] : [],
								...defaultBranch ? [defaultBranch] : []
							]));
							const isBranchLoading = Boolean(repo && inlineLoadingBranches[repoKey]);
							const matchedRepoOption = repo ? providerRepos.find((option) => isSameRepoSelection(repo, option)) : void 0;
							const repoOptions = repo && !matchedRepoOption ? [...providerRepos, repo] : providerRepos;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "create-colleague-selected-repo-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
										value: repo ? matchedRepoOption?.id ?? repo.id : "",
										options: repoOptions.map((option) => {
											const selectedByOtherRow = selectedCodeRepos.some((selected) => selected !== repo && isSameRepoSelection(selected, option));
											return {
												value: option.id,
												label: option.fullName || option.name,
												disabled: selectedByOtherRow
											};
										}),
										onChange: (nextValue) => handleInlineChangeRepo(provider, repo?.id ?? "", nextValue),
										placeholder: providerRepos.length === 0 ? t("colleagues.createDialog.codeRepo.empty") : t("colleagues.createDialog.codeRepo.placeholder"),
										searchPlaceholder: t("colleagues.createDialog.codeRepo.searchRepoPlaceholder"),
										emptyText: t("colleagues.createDialog.codeRepo.empty"),
										noMatchText: t("colleagues.createDialog.codeRepo.repoNoMatches"),
										ariaLabel: t("colleagues.createDialog.codeRepo.repoLabel"),
										optionIcon: "repo",
										resetOption: {
											label: t("colleagues.createDialog.codeRepo.notSelectRepo"),
											icon: "clear"
										},
										clearAriaLabel: t("common.clear")
									}),
									(() => {
										const branchSelectOptions = branchOptions.map((branch) => ({
											value: branch,
											label: branch
										}));
										const branchPlaceholder = t("colleagues.createDialog.codeRepo.branchPlaceholder");
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableSelect, {
											value: isBranchLoading ? "" : repo?.ref ?? "",
											options: branchSelectOptions,
											onChange: (nextValue) => repo && handleInlineSelectBranch(provider, repo.id, nextValue),
											placeholder: branchPlaceholder,
											searchPlaceholder: t("colleagues.createDialog.codeRepo.searchBranchPlaceholder"),
											noMatchText: t("colleagues.createDialog.codeRepo.branchNoMatches"),
											disabled: !repo,
											loading: isBranchLoading,
											loadingText: t("common.loading"),
											ariaLabel: `${t("colleagues.createDialog.codeRepo.branchLabel")} - ${repo?.fullName || repo?.name || index + 1}`,
											optionIcon: "branch",
											clearAriaLabel: t("common.clear")
										});
									})(),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "create-colleague-selected-repo-remove",
										"aria-label": t("common.delete"),
										disabled: !repo,
										onClick: () => repo && handleInlineRemoveRepo(provider, repo.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "12",
											height: "12",
											viewBox: "0 0 12.0327 12",
											xmlns: "http://www.w3.org/2000/svg",
											"aria-hidden": "true",
											focusable: "false",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												fill: "currentColor",
												d: "M11.9938 11.537L11.1732 6.8832L11.4503 6.8832C11.6733 6.8832 11.8529 6.7066 11.8529 6.4873L11.8529 3.5634C11.8529 3.3442 11.6733 3.1675 11.4503 3.1675L7.6413 3.1675L7.6413 0.3959C7.6413 0.1766 7.4617 0 7.2387 0L4.7613 0C4.5383 0 4.3587 0.1766 4.3587 0.3959L4.3587 3.1675L0.5497 3.1675C0.3267 3.1675 0.1471 3.3442 0.1471 3.5634L0.1471 6.4873C0.1471 6.7066 0.3267 6.8832 0.5497 6.8832L0.8268 6.8832L0.0062 11.537C0.0015 11.5599 0 11.5827 0 11.6041C0 11.8234 0.1796 12 0.4026 12L11.5974 12C11.6207 12 11.6439 11.9985 11.6656 11.9939C11.8854 11.9574 12.0325 11.7518 11.9938 11.537L11.9938 11.537ZM1.231 4.2335L5.4426 4.2335L5.4426 1.066L6.5574 1.066L6.5574 4.2335L10.769 4.2335L10.769 5.8173L1.231 5.8173L1.231 4.2335ZM8.4774 10.934L8.4774 8.5584C8.4774 8.4914 8.4217 8.4365 8.3535 8.4366L7.6103 8.4366C7.5422 8.4365 7.4865 8.4914 7.4865 8.5584L7.4865 10.934L4.5135 10.934L4.5135 8.5584C4.5136 8.4914 4.4578 8.4365 4.3897 8.4366L3.6465 8.4366C3.5783 8.4365 3.5226 8.4914 3.5226 8.5584L3.5226 10.934L1.2124 10.934L1.9107 6.9746L10.0877 6.9746L10.7861 10.934L8.4774 10.934Z"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.createDialog.codeRepo.removeRepo") })]
									})
								]
							}, repoKey);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "create-colleague-inline-repo-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.createDialog.codeRepo.selectedCount", { count: selectedProviderRepos.length }) })
					})
				]
			});
		};
		const handlePrevious = import_react.useCallback(() => {
			if (isCreating) return;
			setCreateError(null);
			setCurrentStepIndex((index) => Math.max(0, index - 1));
		}, [isCreating]);
		const handleNext = import_react.useCallback(async () => {
			if (isSubmitting || isCreating || isUploadingAvatar || isModeratingSubmit || isNameUniqueChecking) return;
			setCreateError(null);
			clearScheduledNameValidation();
			setIsSubmitting(true);
			const trimmedName = name.trim();
			const trimmedRoleNickname = roleNickname.trim();
			const trimmedDescription = description.trim();
			if (!trimmedRoleNickname || !trimmedName || !trimmedDescription) {
				setCurrentStepIndex(0);
				setCreateError(t("colleagues.createDialog.requiredError"));
				setIsSubmitting(false);
				return;
			}
			if (hasModerationError || hasNameValidationError) {
				setIsSubmitting(false);
				return;
			}
			if (!await validateModerationBeforeSubmit([
				{
					key: "roleNickname",
					text: trimmedRoleNickname
				},
				{
					key: "description",
					text: trimmedDescription
				},
				{
					key: "name",
					text: trimmedName
				}
			])) {
				setIsSubmitting(false);
				return;
			}
			if (!await validateNameUnique(trimmedName, { blockOnError: true })) {
				focusModerationField("name");
				setIsSubmitting(false);
				return;
			}
			if (!selectedModelId) {
				setCreateError(t("colleagues.createDialog.model.empty"));
				setIsSubmitting(false);
				return;
			}
			if (isEditMode && editingAgentId) {
				if (!adapter.publishCloudAgentVersion) {
					setCreateError(t("colleagues.editDialog.updateUnsupported"));
					setIsSubmitting(false);
					return;
				}
				const versionParams = buildPublishVersionParams({
					name: trimmedName,
					roleNickname: trimmedRoleNickname,
					description: trimmedDescription,
					avatar: selectedAvatarValue,
					model: selectedModelId,
					repos: selectedCodeRepos,
					docs: selectedTencentDocsFiles,
					hiredExpert: hiredExpertSource,
					memoryEnabled
				});
				console.info("[CloudAgent][edit] publishVersion start", {
					agentId: editingAgentId,
					model: versionParams.model,
					hasManifest: Boolean(versionParams.manifest),
					workspaces: versionParams.manifest?.workspaces?.length ?? 0,
					plugins: versionParams.manifest?.plugins?.length ?? 0
				});
				createStartTimeRef.current = Date.now();
				setIsSubmitting(false);
				setIsCreating(true);
				adapter.publishCloudAgentVersion({
					agentId: editingAgentId,
					...versionParams
				}).then((result) => {
					console.info("[CloudAgent][edit] publishVersion success", {
						versionId: result?.id,
						versionNumber: result?.versionNumber,
						isCurrent: result?.isCurrent
					});
					reportCreateSubmitSuccess(adapter, {
						type: "custom",
						assistantId: editingAgentId,
						cost: Date.now() - createStartTimeRef.current
					});
					onCreated?.();
					onClose();
				}).catch((error) => {
					console.error("[CloudAgent][edit] publishVersion failed", error);
					setCreateError(error instanceof Error ? error.message : String(error));
				}).finally(() => setIsCreating(false));
				return;
			}
			if (checkQuotaBeforeCreate) {
				const quota = await checkQuotaBeforeCreate();
				if (isAssistantQuotaExceeded(quota)) {
					onQuotaExceeded?.(quota);
					setIsSubmitting(false);
					return;
				}
			}
			if (hiredExpertSource?.type === "enterprise") {
				const sourceAgentId = hiredExpertSource.enterpriseAgentId || hiredExpertSource.id;
				if (!sourceAgentId || !adapter.cloneCloudAgent || !adapter.getCloudAgent || !adapter.publishCloudAgentVersion) {
					setCreateError(t("colleagues.createDialog.enterpriseCloneUnsupported"));
					setIsSubmitting(false);
					return;
				}
				createStartTimeRef.current = Date.now();
				setIsSubmitting(false);
				setIsCreating(true);
				adapter.cloneCloudAgent({
					agentId: sourceAgentId,
					agentName: trimmedName,
					description: trimmedDescription,
					avatar: selectedAvatarValue
				}).then(async (clonedAgent) => {
					const clonedAgentId = clonedAgent.id || clonedAgent.agentId;
					if (!clonedAgentId) throw new Error("cloneCloudAgent returned empty agent id");
					const versionParams = buildPublishVersionParamsFromBaseManifest({
						baseManifest: (await adapter.getCloudAgent({ agentId: clonedAgentId })).currentVersion?.manifest,
						name: trimmedName,
						roleNickname: trimmedRoleNickname,
						description: trimmedDescription,
						model: selectedModelId,
						repos: selectedCodeRepos,
						docs: selectedTencentDocsFiles
					});
					console.info("[CloudAgent][createFromEnterprise] publishVersion start", {
						sourceAgentId,
						clonedAgentId,
						model: versionParams.model,
						workspaces: versionParams.manifest?.workspaces?.length ?? 0,
						plugins: versionParams.manifest?.plugins?.length ?? 0
					});
					return adapter.publishCloudAgentVersion({
						agentId: clonedAgentId,
						...versionParams
					});
				}).then(() => {
					reportCreateSubmitSuccess(adapter, {
						type: "preset_template",
						templateId: sourceAgentId,
						cost: Date.now() - createStartTimeRef.current
					});
					onCreated?.();
					onClose();
				}).catch(async (error) => {
					console.error("[CloudAgent][createFromEnterprise] failed", error);
					const quota = await checkQuotaBeforeCreate?.();
					if (isAssistantQuotaExceeded(quota)) {
						onQuotaExceeded?.(quota);
						return;
					}
					setCreateError(error instanceof Error ? error.message : String(error));
				}).finally(() => setIsCreating(false));
				return;
			}
			if (!adapter.createCloudAgent) {
				setCreateError(t("colleagues.createDialog.createUnsupported"));
				setIsSubmitting(false);
				return;
			}
			const params = buildCreateCloudAgentParams({
				name: trimmedName,
				roleNickname: trimmedRoleNickname,
				description: trimmedDescription,
				model: selectedModelId,
				avatar: selectedAvatarValue,
				repos: selectedCodeRepos,
				docs: selectedTencentDocsFiles,
				plugins: isHiredExpertOverridden ? buildAgentManifestPlugins(hiredExpertSource) : normalizeTemplatePlugins(templatePlugins) ?? buildAgentManifestPlugins(hiredExpertSource),
				memoryEnabled
			});
			createStartTimeRef.current = Date.now();
			setIsSubmitting(false);
			setIsCreating(true);
			adapter.createCloudAgent(params).then(async (created) => {
				const newAgentId = created.id;
				if (adapter.createCloudAgentConversation && newAgentId) try {
					await adapter.createCloudAgentConversation({ agentId: String(newAgentId) });
				} catch (error) {
					console.warn("[CloudAgent][create] createConversation failed:", error);
				}
				reportCreateSubmitSuccess(adapter, {
					type: selectedTemplateId ? "preset_template" : "custom",
					templateId: selectedTemplateId ?? void 0,
					assistantId: String(newAgentId ?? ""),
					cost: Date.now() - createStartTimeRef.current
				});
				onCreated?.();
				onClose();
			}).catch(async (error) => {
				const quota = await checkQuotaBeforeCreate?.();
				if (isAssistantQuotaExceeded(quota)) {
					onQuotaExceeded?.(quota);
					return;
				}
				setCreateError(error instanceof Error ? error.message : String(error));
			}).finally(() => setIsCreating(false));
		}, [
			adapter,
			clearScheduledNameValidation,
			description,
			editingAgentId,
			focusModerationField,
			hasModerationError,
			hasNameValidationError,
			hiredExpertSource,
			isCreating,
			isEditMode,
			isHiredExpertOverridden,
			isModeratingSubmit,
			isNameUniqueChecking,
			isSubmitting,
			isUploadingAvatar,
			memoryEnabled,
			name,
			onClose,
			onCreated,
			roleNickname,
			selectedAvatarValue,
			selectedCodeRepos,
			selectedModelId,
			selectedTencentDocsFiles,
			t,
			templatePlugins,
			validateModerationBeforeSubmit,
			validateNameUnique
		]);
		if (!open || typeof document === "undefined") return null;
		const isInlineCnbConnecting = inlineRepoStates.cnb.stage === "oauth_connecting";
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: presentation === "drawer" ? "create-colleague-overlay create-colleague-overlay--drawer" : "create-colleague-overlay",
			style: { zIndex },
			onMouseDown: handleOverlayMouseDown,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: presentation === "drawer" ? "create-colleague-modal create-colleague-modal--drawer" : "create-colleague-modal",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "create-colleague-title",
					onMouseDown: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "create-colleague-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "create-colleague-title-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "create-colleague-title",
									children: t(isEditMode ? "colleagues.editDialog.title" : "colleagues.createDialog.title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "create-colleague-progress",
									"aria-label": t("colleagues.createDialog.progressLabel"),
									children: CREATE_STEPS.map((step, index) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `create-colleague-step create-colleague-step--${index < currentStepIndex ? "completed" : index === currentStepIndex ? "active" : "upcoming"}`,
											role: "listitem",
											"aria-current": index === currentStepIndex ? "step" : void 0,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "create-colleague-step-index",
												children: index + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "create-colleague-step-label",
												children: t(step.labelKey)
											})]
										}, step.id);
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "create-colleague-close",
								"aria-label": t("common.close"),
								onClick: () => handleCancelOrClose("close"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "create-colleague-body",
							ref: createColleagueBodyRef,
							children: [currentStep.id === "basic" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "create-colleague-basic-form",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field create-colleague-role-nickname-field",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: "create-colleague-role-nickname",
												children: [t("colleagues.createDialog.roleFunction"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "create-colleague-required-mark",
													"aria-hidden": "true",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "create-colleague-role-nickname",
												value: roleNickname,
												placeholder: t("colleagues.createDialog.roleNicknamePlaceholder"),
												"aria-invalid": !!moderationErrors.roleNickname,
												"aria-describedby": moderationErrors.roleNickname ? "create-colleague-role-nickname-error" : void 0,
												className: moderationErrors.roleNickname ? "is-invalid" : void 0,
												onChange: (event) => {
													setRoleNickname(event.target.value);
													handleModeratedFieldChange("roleNickname", event.target.value);
												},
												onBlur: (event) => {
													validateModerationField("roleNickname", event.target.value);
												}
											}),
											moderationStatus.roleNickname === "checking" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "create-colleague-field-hint",
												children: t("colleagues.createDialog.moderationChecking")
											}),
											moderationErrors.roleNickname && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												id: "create-colleague-role-nickname-error",
												className: "create-colleague-field-error",
												role: "alert",
												children: moderationErrors.roleNickname
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-role-presets",
										role: "group",
										"aria-label": t("colleagues.createDialog.rolePresetLabel"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: `create-colleague-role-custom${selectedTemplateId === "" ? " is-selected" : ""}`,
											"aria-pressed": selectedTemplateId === "",
											onClick: handleSelectCustomRole,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "create-colleague-role-custom-icon",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcon, {
													width: 18,
													height: 18
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "create-colleague-role-preset-copy",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("colleagues.createDialog.customRole") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.createDialog.customRoleDesc") })]
											})]
										}), visibleRolePresets.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: selectedTemplateId === template.id ? "is-selected" : "",
											"aria-pressed": selectedTemplateId === template.id,
											onClick: () => handleSelectTemplatePreset(template),
											children: [template.avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												className: "create-colleague-role-preset-avatar",
												src: template.avatar,
												alt: "",
												"aria-hidden": "true"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "create-colleague-role-preset-copy",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: template.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: template.description })]
											})]
										}, template.id))]
									}),
									isLoadingTemplates && agentTemplates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "create-colleague-field-hint",
										children: t("common.loading")
									}),
									templatesError && agentTemplates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "create-colleague-more-roles",
										onClick: reloadAgentTemplates,
										children: [t("common.retry"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, {
											width: 14,
											height: 14
										})]
									}),
									agentTemplates.length > INITIAL_VISIBLE_ROLE_PRESET_COUNT && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "create-colleague-more-roles",
										"aria-expanded": showAllRolePresets,
										onClick: () => {
											setShowAllRolePresets((value) => !value);
											if (!showAllRolePresets) reportCreateTemplateMoreClick(adapter);
										},
										children: [t(showAllRolePresets ? "colleagues.createDialog.viewLess" : "colleagues.createDialog.viewMore"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, {
											width: 14,
											height: 14
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field create-colleague-description-field",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: "create-colleague-description",
												children: [t("colleagues.createDialog.description"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "create-colleague-required-mark",
													"aria-hidden": "true",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												id: "create-colleague-description",
												rows: 4,
												value: description,
												placeholder: t("colleagues.createDialog.descriptionPlaceholder"),
												"aria-invalid": !!moderationErrors.description,
												"aria-describedby": moderationErrors.description ? "create-colleague-description-error" : void 0,
												className: moderationErrors.description ? "is-invalid" : void 0,
												onChange: (event) => {
													setDescription(event.target.value);
													handleModeratedFieldChange("description", event.target.value);
												},
												onBlur: (event) => {
													validateModerationField("description", event.target.value);
												}
											}),
											moderationStatus.description === "checking" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "create-colleague-field-hint",
												children: t("colleagues.createDialog.moderationChecking")
											}),
											moderationErrors.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												id: "create-colleague-description-error",
												className: "create-colleague-field-error",
												role: "alert",
												children: moderationErrors.description
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field create-colleague-name-field",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: "create-colleague-name",
												children: [t("colleagues.createDialog.name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "create-colleague-required-mark",
													"aria-hidden": "true",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "create-colleague-name",
												value: name,
												placeholder: t("colleagues.createDialog.namePlaceholder"),
												"aria-invalid": !!nameFieldError,
												"aria-describedby": nameFieldError ? "create-colleague-name-error" : void 0,
												className: nameFieldError ? "is-invalid" : void 0,
												onChange: (event) => {
													setName(event.target.value);
													scheduleNameUniqueValidation(event.target.value);
													handleModeratedFieldChange("name", event.target.value);
												},
												onBlur: (event) => handleNameBlur(event.target.value)
											}),
											(moderationStatus.name === "checking" || isNameUniqueChecking) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "create-colleague-field-hint",
												children: t("colleagues.createDialog.moderationChecking")
											}),
											nameFieldError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												id: "create-colleague-name-error",
												className: "create-colleague-field-error",
												role: "alert",
												children: nameFieldError
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field create-colleague-avatar-field",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "create-colleague-field-head",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: t("colleagues.createDialog.avatar") })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: [
													"create-colleague-avatar-row-shell",
													isDrawerPresentation ? "is-scrollable" : "",
													avatarScrollState.canScrollPrev ? "has-scroll-prev" : "",
													avatarScrollState.canScrollNext ? "has-scroll-next" : ""
												].filter(Boolean).join(" "),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														ref: avatarRowRef,
														className: [
															"create-colleague-avatar-row",
															showAllAvatarPresets && !isDrawerPresentation ? "is-expanded" : "",
															isDrawerPresentation ? "create-colleague-avatar-row--scrollable" : ""
														].filter(Boolean).join(" "),
														role: "listbox",
														"aria-label": t("colleagues.createDialog.avatar"),
														children: [
															visibleAvatarPresets.map((avatar) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																className: `create-colleague-avatar-option ${avatar.imageUrl ? "create-colleague-avatar-option--image" : `create-colleague-avatar--${avatar.variant}`}`,
																role: "option",
																"aria-selected": !customAvatarUrl && selectedAvatarId === avatar.id,
																title: avatar.label ?? (avatar.labelKey ? t(avatar.labelKey) : avatar.id),
																onClick: () => handleSelectAvatarPreset(avatar.id),
																children: avatar.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: avatar.imageUrl,
																	alt: ""
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: avatar.initials })
															}, avatar.id)),
															!isDrawerPresentation && avatarPresets.length > INITIAL_VISIBLE_AVATAR_PRESET_COUNT && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																className: `create-colleague-avatar-more${showAllAvatarPresets ? " is-expanded" : ""}`,
																"aria-label": t(showAllAvatarPresets ? "colleagues.createDialog.viewLessAvatar" : "colleagues.createDialog.moreAvatar"),
																title: t(showAllAvatarPresets ? "colleagues.createDialog.viewLessAvatar" : "colleagues.createDialog.moreAvatar"),
																onClick: () => setShowAllAvatarPresets((value) => !value),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, {
																	width: 14,
																	height: 14
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																className: `create-colleague-avatar-option create-colleague-avatar-upload-option${customAvatarUrl ? " is-selected" : ""}`,
																"aria-label": t(customAvatarUrl ? "colleagues.createDialog.avatarReplace" : "colleagues.createDialog.avatarUpload"),
																"aria-pressed": Boolean(customAvatarUrl),
																title: t(customAvatarUrl ? "colleagues.createDialog.avatarReplace" : "colleagues.createDialog.avatarUpload"),
																onClick: handleUploadAvatarClick,
																disabled: isUploadingAvatar,
																children: customAvatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: customAvatarUrl,
																	alt: ""
																}) : isUploadingAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "create-colleague-avatar-upload-spinner",
																	"aria-hidden": "true"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcon, {
																	width: 19,
																	height: 19
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																ref: fileInputRef,
																type: "file",
																accept: CUSTOM_AVATAR_ACCEPT,
																className: "create-colleague-avatar-file-input",
																onChange: handleAvatarFileChange
															})
														]
													}),
													isDrawerPresentation && avatarScrollState.canScrollPrev && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "create-colleague-avatar-more create-colleague-avatar-scroll-button create-colleague-avatar-scroll-prev",
														"aria-label": t("colleagues.createDialog.previousAvatar"),
														title: t("colleagues.createDialog.previousAvatar"),
														onClick: () => handleAvatarPresetScroll("prev"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftIcon, {
															width: 14,
															height: 14
														})
													}),
													isDrawerPresentation && avatarScrollState.canScrollNext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "create-colleague-avatar-more create-colleague-avatar-scroll-button create-colleague-avatar-scroll-next",
														"aria-label": t("colleagues.createDialog.moreAvatar"),
														title: t("colleagues.createDialog.moreAvatar"),
														onClick: () => handleAvatarPresetScroll("next"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, {
															width: 14,
															height: 14
														})
													})
												]
											}),
											avatarUploadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "create-colleague-avatar-error",
												role: "alert",
												children: avatarUploadError
											})
										]
									})
								]
							}), currentStep.id === "basic" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `create-colleague-config-form${isAdvancedConfigOpen ? " is-expanded" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: `create-colleague-advanced-title${isAdvancedConfigOpen ? " is-expanded" : ""}`,
										"aria-expanded": isAdvancedConfigOpen,
										onClick: () => setIsAdvancedConfigOpen((value) => {
											const next = !value;
											if (next) requestAnimationFrame(() => {
												const bodyEl = createColleagueBodyRef.current;
												if (!bodyEl) return;
												if (typeof bodyEl.scrollBy === "function") bodyEl.scrollBy({
													top: 100,
													behavior: "smooth"
												});
												else bodyEl.scrollTop += 100;
											});
											return next;
										}),
										children: [
											t("colleagues.createDialog.advancedConfig"),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, {
												width: 14,
												height: 14
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "create-colleague-advanced-title-hint",
												children: t("colleagues.createDialog.advancedConfigHint")
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "create-colleague-field-head create-colleague-field-head--inline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: t("colleagues.createDialog.hireExpert.entryTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.createDialog.optionalSimple") })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "create-colleague-expert-select",
											onClick: () => setIsHireExpertOpen(true),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hiredExpertSource ? t("colleagues.createDialog.hireExpert.selectedSource", { name: hiredExpertSource.name }) : t("colleagues.createDialog.hireExpert.entryDesc") })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "create-colleague-field-head create-colleague-field-head--inline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: t("colleagues.createDialog.connection.repo") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.createDialog.optionalSimple") })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "create-colleague-inline-repo-picker",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "create-colleague-repo-provider-tabs",
												role: "group",
												"aria-label": t("colleagues.createDialog.codeRepo.providerLabel"),
												children: visibleInlineRepoProviders.map((provider) => {
													const stage = inlineRepoStates[provider].stage;
													const isBusy = stage === "unknown" || stage === "repo_loading" || stage === "oauth_connecting" || stage === "repo_selecting";
													const isRevoking = Boolean(inlineRevokingProviders[provider]);
													const needsConnect = stage === "oauth_disconnected" || stage === "repo_unauthorized" || stage === "repo_not_installed";
													const needsRetry = stage === "repo_forbidden" || stage === "error";
													const actionLabel = isBusy ? t("common.loading") : isRevoking ? t("colleagues.createDialog.codeRepo.revoking") : needsRetry ? t("common.retry") : needsConnect ? t("colleagues.createDialog.codeRepo.connect") : t("colleagues.createDialog.codeRepo.revokeAuth");
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "create-colleague-repo-provider-tab",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "create-colleague-repo-provider-tab-main",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t(`colleagues.createDialog.codeRepo.provider.${provider}`) })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															className: `create-colleague-repo-provider-tab-action${needsConnect || needsRetry ? "" : " is-danger"}`,
															disabled: isBusy || isRevoking,
															onClick: () => handleInlineRepoProviderAction(provider),
															children: [needsConnect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepoConnectIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: actionLabel })]
														})]
													}, provider);
												})
											}), (() => {
												const repoPanels = visibleInlineRepoProviders.map((provider) => ({
													provider,
													content: renderInlineRepoConfig(provider)
												})).filter((panel) => Boolean(panel.content));
												return repoPanels.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "create-colleague-inline-repo-panels",
													children: repoPanels.map(({ provider, content }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "create-colleague-inline-repo-panel",
														children: content
													}, provider))
												}) : null;
											})()]
										})]
									}),
									!isIOA && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field",
										style: { display: "none" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "create-colleague-field-head create-colleague-field-head--inline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: t("colleagues.createDialog.knowledgeBase") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.createDialog.optionalSimple") })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "create-colleague-knowledge-card",
											onClick: () => setIsTencentDocsConfigOpen(true),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "create-colleague-knowledge-icon",
													"aria-hidden": "true",
													children: "腾"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("colleagues.createDialog.connection.docs") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: selectedTencentDocsFiles.length > 0 ? t("colleagues.createDialog.tencentDocs.configuredCount", { count: selectedTencentDocsFiles.length }) : t("colleagues.createDialog.knowledgeBaseDesc") })] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "create-colleague-knowledge-action",
													children: t("colleagues.createDialog.tencentDocs.select")
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: t("colleagues.createDialog.model.headerTitle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultModelPicker, {
											adapter,
											selectedModelId,
											onSelect: (id) => setSelectedModelId(id),
											onUserSelect: (id) => reportCreateModelSelectClick(adapter, { requestModelId: id }),
											enableIoaGrouping: isIOA,
											isEnterpriseAccount: isEnterpriseUser
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "create-colleague-memory-row",
										style: { display: "none" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.detail.nav.memory") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: `create-colleague-memory-switch${memoryEnabled ? " is-on" : ""}`,
											role: "switch",
											"aria-checked": memoryEnabled,
											"aria-label": t("colleagues.imConfig.memory.switch.aria"),
											onClick: () => setMemoryEnabled((value) => !value),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: `create-colleague-footer create-colleague-footer--${currentStep.id}`,
							children: [createError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "create-colleague-error",
								role: "alert",
								children: createError
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "create-colleague-footer-actions",
								children: [
									currentStepIndex > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "create-colleague-cancel",
										onClick: handlePrevious,
										disabled: isCreating,
										children: t("colleagues.createDialog.previousPage")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "create-colleague-next",
										onClick: handleNext,
										disabled: isSubmitting || isCreating || isLoadingDetail || isUploadingAvatar || isModeratingSubmit || hasModerationError || hasNameValidationError || !canSubmitCurrentStep,
										children: isSubmitting || isCreating || isLoadingDetail || isUploadingAvatar || isModeratingSubmit ? t("common.loading") : t(isLastStep ? isEditMode ? "colleagues.editDialog.finish" : "colleagues.createDialog.finish" : "colleagues.createDialog.next")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "create-colleague-cancel",
										onClick: () => handleCancelOrClose("cancel"),
										disabled: isCreating,
										children: t("common.cancel")
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HireExpertModal, {
					open: isHireExpertOpen,
					selectedSource: hiredExpertSource,
					onConfirm: handleConfirmHireExpert,
					onClose: () => setIsHireExpertOpen(false)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentDocsConfigModal, {
					open: isTencentDocsConfigOpen,
					selectedFiles: selectedTencentDocsFiles,
					onSave: handleSaveTencentDocsConfig,
					onClose: () => setIsTencentDocsConfigOpen(false)
				}),
				isInlineCnbTokenPanelOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "create-colleague-cnb-token-overlay",
					role: "presentation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "create-colleague-cnb-token-modal",
						role: "dialog",
						"aria-modal": "true",
						"aria-labelledby": "create-colleague-cnb-token-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "create-colleague-cnb-token-close",
								"aria-label": t("common.close"),
								disabled: isInlineCnbConnecting,
								onClick: () => setIsInlineCnbTokenPanelOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "create-colleague-cnb-token-title",
								children: t("connectors.cnb.modalTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("connectors.cnb.modalDesc") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: inlineCnbToken,
								placeholder: t("colleagues.createDialog.codeRepo.cnbTokenPlaceholder"),
								autoFocus: true,
								disabled: isInlineCnbConnecting,
								onChange: (event) => setInlineCnbToken(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter" && !isInlineCnbConnecting) handleInlineConnectCNB();
								}
							}),
							inlineCnbTokenError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								role: "alert",
								children: inlineCnbTokenError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "create-colleague-cnb-token-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "create-colleague-cnb-token-cancel",
									disabled: isInlineCnbConnecting,
									onClick: () => setIsInlineCnbTokenPanelOpen(false),
									children: t("common.cancel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "create-colleague-cnb-token-confirm",
									disabled: isInlineCnbConnecting,
									onClick: handleInlineConnectCNB,
									children: isInlineCnbConnecting ? t("common.loading") : t("connectors.cnb.modalButtonText")
								})]
							})
						]
					})
				})
			]
		}), document.body);
	};
	CHAT_FLOAT_EXIT_ANIMATION_MS = 220;
	ColleaguesPanel = () => {
		const t = useTranslation();
		const adapter = useAdapter();
		const facades = useAgentServices();
		const { account } = useAccount();
		const startQQBind = useQQBindSession(adapter, facades?.agentIm);
		const cloudAgentQuota = useCloudAgentQuota();
		const isTencentUser = isIOAUser(account?.enterpriseId ?? "");
		const [isIOAMachine, setIsIOAMachine] = import_react.useState(false);
		const shouldRestrictQQ = isTencentUser || isIOAMachine;
		import_react.useEffect(() => {
			if (!adapter) return;
			const unsub = adapter.on("claw:is-ioa-machine-result", (data) => {
				const { isIOAMachine: detected } = data;
				setIsIOAMachine(!!detected);
			});
			adapter.emit("claw:get-is-ioa-machine");
			return () => {
				unsub?.();
			};
		}, [adapter]);
		const [openMenuId, setOpenMenuId] = import_react.useState(null);
		const [selectedColleagueId, setSelectedColleagueId] = import_react.useState(null);
		const [activeDetailTab, setActiveDetailTab] = import_react.useState("home");
		const [colleagues, setColleagues] = import_react.useState([]);
		const [cloudAgentListRaw, setCloudAgentListRaw] = import_react.useState([]);
		/** 全量 conversations 按 agentId 分组，用于 connected 状态和历史会话 badge 判断。 */
		const [allConversationsByAgentId, setAllConversationsByAgentId] = import_react.useState(/* @__PURE__ */ new Map());
		/** 助理（orchestrator）agent，与同事分开管理；每用户最多 1 个 */
		const [orchestratorAgent, setOrchestratorAgent] = import_react.useState(null);
		const [statusFilter, setStatusFilter] = import_react.useState("all");
		const [isStatusFilterOpen, setIsStatusFilterOpen] = import_react.useState(false);
		const [isLoadingColleagues, setIsLoadingColleagues] = import_react.useState(false);
		const [colleaguesError, setColleaguesError] = import_react.useState(null);
		const [isChatOpen, setIsChatOpen] = import_react.useState(false);
		const [chatColleagueId, setChatColleagueId] = import_react.useState(null);
		/**
		* 已有对话 instance ID。
		*
		* - `null`：进入聊天页时新建 instance（默认行为）
		* - 字符串：复用已有 instance，hook 会走 ACP `loadSession` 自动回放历史。
		* - 来源：悬浮窗历史会话选择器。
		*/
		const [chatInstanceId, setChatInstanceId] = import_react.useState(null);
		/** 当前打开的 ACP session ID（真正任务 ID）。 */
		const [chatSessionId, setChatSessionId] = import_react.useState(null);
		/** 当前打开 ACP session 的后端状态，用于切回历史运行中会话时恢复停止按钮。 */
		const [chatSessionStatus, setChatSessionStatus] = import_react.useState(null);
		const [chatShellError, setChatShellError] = import_react.useState(null);
		const [dashboardPrompt, setDashboardPrompt] = import_react.useState("");
		const [dashboardAutoSendPrompt, setDashboardAutoSendPrompt] = import_react.useState(null);
		const [isChatFloatClosing, setIsChatFloatClosing] = import_react.useState(false);
		const [isFloatingChatGuideOpen, setIsFloatingChatGuideOpen] = import_react.useState(() => !isColleaguesFloatingChatGuideDismissed());
		const [isCreateModalOpen, setIsCreateModalOpen] = import_react.useState(false);
		const [quotaLimitSnapshot, setQuotaLimitSnapshot] = import_react.useState(null);
		const [isQuotaLimitOpen, setIsQuotaLimitOpen] = import_react.useState(false);
		const [deleteConfirmTarget, setDeleteConfirmTarget] = import_react.useState(null);
		const [isDeletingColleague, setIsDeletingColleague] = import_react.useState(false);
		const [deleteConversationConfirmTarget, setDeleteConversationConfirmTarget] = import_react.useState(null);
		const [isDeletingConversation, setIsDeletingConversation] = import_react.useState(false);
		/**
		* 编辑模式下保存当前正在编辑的 Cloud Agent ID（雪花字符串 ID）。
		* 为 null 时表示新建模式。
		*/
		const [editingAgentId, setEditingAgentId] = import_react.useState(null);
		/** 绑定渠道弹窗当前作用的同事；为 null 表示当前未选中同事 */
		const [bindChannelTarget, setBindChannelTarget] = import_react.useState(null);
		const [isBindChannelOpen, setIsBindChannelOpen] = import_react.useState(false);
		const [bindChannelInitialTab, setBindChannelInitialTab] = import_react.useState("assistant");
		const [bindChannelActiveTab, setBindChannelActiveTab] = import_react.useState("assistant");
		const dashboardAutoSendPromptSeqRef = import_react.useRef(0);
		const [wechatBotBinding, setWechatBotBinding] = import_react.useState(void 0);
		const [wechatBotQrcode, setWechatBotQrcode] = import_react.useState(void 0);
		const [wechatBotError, setWechatBotError] = import_react.useState(null);
		const [isWechatBotBindingLoading, setIsWechatBotBindingLoading] = import_react.useState(false);
		const [qqBinding, setQQBinding] = import_react.useState(void 0);
		const [qqQrcodeRawUrl, setQQQrcode] = import_react.useState(void 0);
		/** QR code data URL generated from the raw URL via qrcode library */
		const qqQrcode = useQrDataUrl(qqQrcodeRawUrl ?? "");
		const [qqBindToken, setQQBindToken] = import_react.useState(void 0);
		const [qqError, setQQError] = import_react.useState(null);
		const [qqManualError, setQQManualError] = import_react.useState(null);
		const [isQQBindingLoading, setIsQQBindingLoading] = import_react.useState(false);
		/** Dispose function for QQ bind event subscriptions; cleanup on dialog close to prevent memory leaks */
		const qqBindDisposeRef = import_react.useRef(void 0);
		/** Guard against duplicate QQ bind starts (ref avoids stale closure in useCallback) */
		const qqBindInProgressRef = import_react.useRef(false);
		const [togglingMemoryAgentId, setTogglingMemoryAgentId] = import_react.useState(null);
		const [colleagueMemoryError, setColleagueMemoryError] = import_react.useState(null);
		/** 发布同事弹窗的目标，为 null 表示弹窗关闭 */
		const [publishTarget, setPublishTarget] = import_react.useState(null);
		const panelRef = import_react.useRef(null);
		const memoryDetailLoadingIdsRef = import_react.useRef(/* @__PURE__ */ new Set());
		const statusRefreshSeqRef = import_react.useRef(0);
		const statusOverrideRefreshTimerRef = import_react.useRef(null);
		const chatFloatCloseTimerRef = import_react.useRef(null);
		const router = useRouterContextSafe();
		const location = useLocation();
		import_react.useEffect(() => {
			const state = location?.state;
			if (state?.editAgentId) {
				setEditingAgentId(state.editAgentId);
				setIsCreateModalOpen(true);
				router?.navigateToPath("/colleagues", { replace: true });
			}
		}, [location?.state, router]);
		const clearChatFloatCloseTimer = import_react.useCallback(() => {
			if (chatFloatCloseTimerRef.current !== null) {
				clearTimeout(chatFloatCloseTimerRef.current);
				chatFloatCloseTimerRef.current = null;
			}
		}, []);
		import_react.useEffect(() => () => {
			clearChatFloatCloseTimer();
		}, [clearChatFloatCloseTimer]);
		/**
		* 左下角"旧版/云端"切换器 — 点击"旧版"时回到 claw 主页。
		* "云端"段当前已激活（无需处理），仅在 active=false 时响应点击。
		*/
		const handleSwitchToLegacy = import_react.useCallback(() => {
			router?.navigateToPath("/claw", { replace: true });
		}, [router]);
		const selectedColleague = import_react.useMemo(() => colleagues.find((colleague) => colleague.id === selectedColleagueId) ?? null, [colleagues, selectedColleagueId]);
		/**
		* 同事详情页「能力配置」区需要展示真实的仓库 / 雇佣专家。
		*
		* 这些信息只在 `currentVersion.manifest` 里，列表接口不会返回，所以在选中某个同事打开详情面板时
		* 单独按 agentId 拉一次 `getCloudAgent` 并缓存到 detailManifestById；
		* 卡片切换/重开时直接复用缓存，不会重复发请求。
		*
		* 雇佣专家展示名走和「编辑档案」一样的 lookup 逻辑：
		*   manifest.plugins[0].name (plugin slug) → useExpertCenter().allExperts → 真实中文名 / i18n
		*/
		const detailLocale = useLocale();
		const { allExperts: detailAllExperts } = useExpertCenter(null);
		const [detailManifestById, setDetailManifestById] = import_react.useState({});
		const detailManifestLoadingRef = import_react.useRef(/* @__PURE__ */ new Set());
		import_react.useEffect(() => {
			if (!selectedColleagueId || !adapter.getCloudAgent) return;
			if (selectedColleagueId in detailManifestById) return;
			if (detailManifestLoadingRef.current.has(selectedColleagueId)) return;
			detailManifestLoadingRef.current.add(selectedColleagueId);
			let cancelled = false;
			adapter.getCloudAgent({ agentId: selectedColleagueId }).then((detail) => {
				if (cancelled) return;
				const manifest = detail.currentVersion?.manifest ?? null;
				setDetailManifestById((prev) => ({
					...prev,
					[selectedColleagueId]: manifest
				}));
			}).catch((error) => {
				if (cancelled) return;
				console.warn("[ColleaguesPanel] load detail manifest failed", error);
				setDetailManifestById((prev) => ({
					...prev,
					[selectedColleagueId]: null
				}));
			}).finally(() => {
				detailManifestLoadingRef.current.delete(selectedColleagueId);
			});
			return () => {
				cancelled = true;
			};
		}, [
			adapter,
			selectedColleagueId,
			detailManifestById
		]);
		const detailManifest = selectedColleagueId ? detailManifestById[selectedColleagueId] : null;
		const detailRepoLabel = import_react.useMemo(() => {
			if (!detailManifest) return null;
			const workspaces = detailManifest.workspaces;
			if (!Array.isArray(workspaces) || workspaces.length === 0) return null;
			const providers = /* @__PURE__ */ new Set();
			workspaces.forEach((ws) => {
				if (typeof ws?.repository === "string" && ws.repository) providers.add(inferRepoProviderFromUrl(ws.repository));
			});
			if (providers.size === 0) return null;
			const providerLabels = {
				github: t("colleagues.createDialog.codeRepo.provider.github"),
				cnb: t("colleagues.createDialog.codeRepo.provider.cnb"),
				gongfeng: t("colleagues.createDialog.codeRepo.provider.gongfeng")
			};
			return Array.from(providers).map((p) => providerLabels[p]).join("、");
		}, [detailManifest, t]);
		const detailExpertLabel = import_react.useMemo(() => {
			if (!detailManifest) return null;
			const plugins = detailManifest.plugins;
			if (!Array.isArray(plugins) || plugins.length === 0) return null;
			const first = plugins[0];
			const marketplace = typeof first?.marketplace === "string" ? first.marketplace : "";
			const sourceType = typeof first?.sourceType === "string" ? first.sourceType : "";
			if (marketplace === "enterprise-agents" || sourceType === "enterprise-cloud-agent") {
				const agentName = typeof first?.agentName === "string" ? first.agentName : "";
				const displayName = typeof first?.displayName === "string" ? first.displayName : "";
				const enterpriseAgentId = typeof first?.enterpriseAgentId === "string" ? first.enterpriseAgentId : "";
				return displayName || agentName || enterpriseAgentId || null;
			}
			const pluginName = typeof first?.name === "string" ? first.name : "";
			const expertId = typeof first?.expertId === "string" && first.expertId || pluginName;
			if (!expertId) return null;
			let matched = detailAllExperts.find((exp) => exp.id === expertId);
			if (!matched && pluginName) matched = detailAllExperts.find((exp) => exp.plugin === pluginName);
			if (!matched) matched = detailAllExperts.find((exp) => exp.plugin === expertId);
			if (matched) return getSourceFromExpert(matched, "expert", detailLocale).name || null;
			return typeof first?.displayName === "string" && first.displayName || typeof first?.agentName === "string" && first.agentName || pluginName || null;
		}, [
			detailManifest,
			detailAllExperts,
			detailLocale
		]);
		const chatColleague = import_react.useMemo(() => colleagues.find((colleague) => colleague.id === chatColleagueId) ?? (orchestratorAgent && orchestratorAgent.id === chatColleagueId ? orchestratorAgent : null) ?? null, [
			colleagues,
			chatColleagueId,
			orchestratorAgent
		]);
		const selectedColleagueIndex = selectedColleague ? colleagues.indexOf(selectedColleague) : -1;
		const chatColleagueIndex = chatColleague ? colleagues.indexOf(chatColleague) : -1;
		const findColleagueDisplaySource = import_react.useCallback((agentId) => {
			const colleague = colleagues.find((item) => item.id === agentId || item.businessAgentId === agentId);
			if (colleague) return {
				name: getColleagueName(t, colleague),
				avatar: colleague.avatar,
				source: "colleagues"
			};
			if (orchestratorAgent && (orchestratorAgent.id === agentId || orchestratorAgent.businessAgentId === agentId)) return {
				name: getColleagueName(t, orchestratorAgent),
				avatar: orchestratorAgent.avatar,
				source: "orchestrator"
			};
			const rawAgent = cloudAgentListRaw.find((item) => item.id === agentId || item.agentId === agentId);
			if (!rawAgent) return;
			return {
				name: getCloudAgentNickname(rawAgent) || rawAgent.agentId || rawAgent.id,
				avatar: rawAgent.avatar,
				source: "cloudAgentListRaw"
			};
		}, [
			cloudAgentListRaw,
			colleagues,
			orchestratorAgent,
			t
		]);
		const resolveColleagueNameById = import_react.useCallback((agentId) => findColleagueDisplaySource(agentId)?.name, [findColleagueDisplaySource]);
		/** 解析子助理展示信息（名称 + 头像 URL），用于 orchestrator 会话中按 IM 群聊方式展示多头像 */
		const resolveColleagueDisplayInfoById = import_react.useCallback((agentId) => {
			const source = findColleagueDisplaySource(agentId);
			if (!source) return;
			return {
				name: source.name,
				avatarUrl: resolveAvatarImageUrl(source.avatar)
			};
		}, [findColleagueDisplaySource]);
		const bindChannelColleagues = import_react.useMemo(() => colleagues.map((colleague, index) => ({
			id: colleague.id,
			name: getColleagueName(t, colleague),
			title: getColleagueTitle(t, colleague),
			avatar: colleague.avatar,
			avatarLabel: getColleagueName(t, colleague).slice(0, 1),
			avatarVariant: index + 1,
			connected: colleague.connected === true,
			memoryEnabled: colleague.memoryEnabled !== false
		})), [colleagues, t]);
		const refreshColleagueStatuses = import_react.useCallback(async () => {
			if (!adapter.listGrantedCloudAgents) return;
			const seq = ++statusRefreshSeqRef.current;
			const [data, nextOrchestrator, conversationResult] = await Promise.all([
				adapter.listGrantedCloudAgents({
					page: 1,
					pageSize: 100,
					agentRole: "specialist"
				}),
				fetchOrchestrator(adapter).catch((error) => {
					handleColleagueChatActionError("refresh orchestrator", error);
				}),
				adapter.listCloudAgentUserConversations?.({ pageSize: 1e3 }).catch(() => null)
			]);
			if (seq !== statusRefreshSeqRef.current) return;
			const convsByAgentId = groupUserConversationsByAgentId(conversationResult?.items);
			setAllConversationsByAgentId(convsByAgentId);
			const nextRawItems = data.items ?? [];
			const rawById = new Map(nextRawItems.map((item) => [item.id, item]));
			setCloudAgentListRaw((prev) => mergeCloudAgentListStatus(prev, nextRawItems));
			setColleagues((prev) => prev.map((colleague) => {
				const raw = rawById.get(colleague.id);
				if (!raw) return colleague;
				const agentConvs = convsByAgentId.get(colleague.id) ?? convsByAgentId.get(colleague.businessAgentId ?? "") ?? [];
				const connected = raw.enabled !== false && agentConvs.some((c) => c.status === "RUNNING");
				return {
					...patchColleagueStatusFromRaw(colleague, raw),
					connected
				};
			}));
			if (nextOrchestrator !== void 0) setOrchestratorAgent(nextOrchestrator);
		}, [adapter]);
		const clearStatusOverrideRefreshTimer = import_react.useCallback(() => {
			if (statusOverrideRefreshTimerRef.current === null) return;
			clearTimeout(statusOverrideRefreshTimerRef.current);
			statusOverrideRefreshTimerRef.current = null;
		}, []);
		const scheduleStatusOverrideRefresh = import_react.useCallback(() => {
			clearStatusOverrideRefreshTimer();
			statusOverrideRefreshTimerRef.current = setTimeout(() => {
				statusOverrideRefreshTimerRef.current = null;
				refreshColleagueStatuses().catch((error) => {
					handleColleagueChatActionError("refresh colleague statuses after status override", error);
				});
			}, 800);
		}, [clearStatusOverrideRefreshTimer, refreshColleagueStatuses]);
		import_react.useEffect(() => {
			const sub = colleagueConversationPatches$.subscribe((patch) => {
				if (patch.type === "status-override") scheduleStatusOverrideRefresh();
			});
			return () => sub.unsubscribe();
		}, [scheduleStatusOverrideRefresh]);
		import_react.useEffect(() => clearStatusOverrideRefreshTimer, [clearStatusOverrideRefreshTimer]);
		const detailConversations = useMyColleagueConversations({
			adapter,
			rawAgents: cloudAgentListRaw,
			refresh: refreshColleagueStatuses,
			agentId: selectedColleague?.id,
			enabled: Boolean(selectedColleague)
		});
		const floatingConversations = useMyColleagueConversations({
			adapter,
			rawAgents: cloudAgentListRaw,
			refresh: refreshColleagueStatuses,
			agentId: chatColleague?.id,
			enabled: Boolean(chatColleague && isChatOpen)
		});
		/**
		* 判定 sidebar rail 上每个 colleague 是否有可展开的历史会话。
		*
		* 数据源策略：
		*   - 激活同事：用 floatingConversations.instances（经过本地 normalize / pending patch 合并的最准列表）
		*   - 非激活同事：fallback 到 cloudAgentListRaw[i].instance?.sessions，这是后端 withInstances=true
		*     时回的当前实例 sessions 摘要，足以判断「有没有历史」。
		*
		* 判定规则：必须与 `normalizeSessionsForDisplay` 完全一致 ——
		*   有合法 sessionId 且 `sessionName !== 'new-session'`。
		*
		* 新体系：从 allConversationsByAgentId 判断——有任何 conversation 记录就算有历史，
		* 与 useMyColleagueConversations 的 fetchRemoteTasks（size=100）使用同一数据源，
		* 避免激活/未激活状态不一致（issue #45936 同类问题）。
		*/
		const hasHistorySessionsByAgentId = import_react.useMemo(() => {
			const result = {};
			for (const agent of cloudAgentListRaw) {
				const agentId = agent.agentId;
				const id = agent.id;
				const hasAny = ((agentId && allConversationsByAgentId.get(agentId)) ?? (id && allConversationsByAgentId.get(id)) ?? []).length > 0;
				const key = id ?? agentId;
				if (key) result[key] = hasAny;
				if (agentId && agentId !== id) result[agentId] = hasAny;
			}
			return result;
		}, [cloudAgentListRaw, allConversationsByAgentId]);
		const activeHasAnySession = import_react.useMemo(() => floatingConversations.instances.some((task) => typeof task.sessionId === "string" && task.sessionId.length > 0), [floatingConversations.instances]);
		const hasHistorySessionsFor = import_react.useCallback((colleague) => {
			if (chatColleague && colleague.id === chatColleague.id) return activeHasAnySession;
			return hasHistorySessionsByAgentId[colleague.id] ?? false;
		}, [
			activeHasAnySession,
			chatColleague,
			hasHistorySessionsByAgentId
		]);
		const detailTaskRows = import_react.useMemo(() => detailConversations.instances.filter((task) => normalizeColleagueSessionStatus(task.status) !== "deleted").map((task) => {
			const statusVariant = getDetailTaskStatusVariant(task.status);
			return {
				id: task.id,
				shortId: abbreviateDetailTaskId(task.sessionId),
				title: task.sessionName || t("colleagues.conversation.untitled"),
				source: t("colleagues.detail.taskSourceCloud"),
				statusVariant,
				statusText: t(getDetailTaskStatusTextKey(statusVariant)),
				createdAtText: formatColleagueDateTime(task.createdAt ?? task.lastActivityAt),
				agentId: task.agentId,
				instanceId: task.instanceId,
				sessionId: task.sessionId,
				rawStatus: task.status
			};
		}), [detailConversations.instances, t]);
		const detailRunningCount = detailTaskRows.filter((task) => task.statusVariant === "working").length;
		const detailCompletedCount = detailTaskRows.filter((task) => task.statusVariant === "completed").length;
		const detailTotalCount = detailTaskRows.length;
		const derivedDetailColleagueStatus = detailConversations.error ? "abnormal" : selectedColleague?.statusVariant ?? "idle";
		const derivedDetailColleagueStatusText = t(getDerivedColleagueStatusTextKey(derivedDetailColleagueStatus));
		const detailLastActiveText = detailConversations.instances[0]?.lastActivityAt || detailConversations.instances[0]?.createdAt ? formatRelativeTime(new Date(detailConversations.instances[0].lastActivityAt ?? detailConversations.instances[0].createdAt ?? Date.now()), t) : t("colleagues.detail.lastActiveFallback");
		/**
		* 命令式控制悬浮窗对话页的 ref。
		*
		* B 方案核心：所有「开启新对话 / 切换历史会话」入口都不再依赖父组件 state 变化 + key 重挂载，
		* 而是直接调 `chatPageRef.current?.restart(...)` 让 hook 内部完成断旧连接 / 清状态 / 跑新流程。
		*
		* 使用模式：
		* - 悬浮窗已经打开（isChatOpen && chatColleague）→ 直接调 ref.restart
		* - 悬浮窗未打开 → 走 setChatColleagueId + setIsChatOpen 让组件先挂载，
		*   挂载时 hook 内部的 effect 会自动调一次 start()
		*/
		const chatPageRef = import_react.useRef(null);
		const floatingChatSwitchGenRef = import_react.useRef(0);
		const [isChatBusy, setIsChatBusy] = import_react.useState(false);
		const resolveRecentChatTargetForAgent = import_react.useCallback((agentId, preferred) => {
			if (preferred?.agentId === agentId && preferred.instanceId && preferred.sessionId) return {
				agentId,
				instanceId: preferred.instanceId,
				sessionId: preferred.sessionId,
				sessionStatus: preferred.sessionStatus ?? null
			};
			return { agentId };
		}, []);
		const restartFloatingChat = import_react.useCallback((target) => {
			if (!target.instanceId) return chatPageRef.current.restart({
				agentId: target.agentId,
				target: "new"
			});
			return chatPageRef.current.restart({
				agentId: target.agentId,
				instanceId: target.instanceId,
				sessionId: target.sessionId ?? void 0,
				sessionStatus: target.sessionStatus ?? null
			});
		}, []);
		/**
		* 统一入口：根据当前状态决定走「ref 命令式重启」还是「setState 打开悬浮窗」。
		*
		* @param target - 与 hook restart 同语义的目标
		*   - 'new'：新建对话（不变 agentId）
		*   - { agentId, target: 'new' }：切到指定同事 + 新建对话
		*   - { agentId, instanceId }：打开已有 instance（loadSession）
		*/
		const openColleagueChat = import_react.useCallback(async (target, options) => {
			floatingChatSwitchGenRef.current += 1;
			clearChatFloatCloseTimer();
			setIsChatFloatClosing(false);
			setChatShellError(null);
			const wantInstanceId = target.instanceId ?? null;
			const wantSessionId = target.sessionId ?? null;
			const wantSessionStatus = target.sessionStatus ?? null;
			if (options?.persistRecent && wantInstanceId && wantSessionId) writeRecentColleagueChatTarget({
				agentId: target.agentId,
				instanceId: wantInstanceId,
				sessionId: wantSessionId,
				sessionStatus: wantSessionStatus
			});
			else if (!wantInstanceId || !wantSessionId) clearRecentColleagueChatTarget();
			if (isChatOpen && chatColleagueId === target.agentId && !!chatPageRef.current) {
				setChatInstanceId(wantInstanceId);
				setChatSessionId(wantSessionId);
				setChatSessionStatus(wantSessionStatus);
				await restartFloatingChat(target);
				return;
			}
			if (isChatOpen && chatColleagueId !== target.agentId && chatPageRef.current) {
				setChatColleagueId(target.agentId);
				setChatInstanceId(wantInstanceId);
				setChatSessionId(wantSessionId);
				setChatSessionStatus(wantSessionStatus);
				await restartFloatingChat(target);
				return;
			}
			setChatColleagueId(target.agentId);
			setChatInstanceId(wantInstanceId);
			setChatSessionId(wantSessionId);
			setChatSessionStatus(wantSessionStatus);
			setIsChatOpen(true);
		}, [
			chatColleagueId,
			clearChatFloatCloseTimer,
			isChatOpen,
			restartFloatingChat
		]);
		const openRecentOrNewColleagueChat = import_react.useCallback((agentId, preferred) => openColleagueChat(resolveRecentChatTargetForAgent(agentId, preferred)), [openColleagueChat, resolveRecentChatTargetForAgent]);
		const openColleagueChatRef = import_react.useRef(openColleagueChat);
		openColleagueChatRef.current = openColleagueChat;
		const pendingOpenChatTargetRef = import_react.useRef(null);
		const colleaguesLoadedRef = import_react.useRef(false);
		const consumePendingOpenTarget = import_react.useCallback(() => {
			if (!pendingOpenChatTargetRef.current) return;
			const { agentId, instanceId, sessionId } = pendingOpenChatTargetRef.current;
			pendingOpenChatTargetRef.current = null;
			if (instanceId && sessionId) openColleagueChatRef.current({
				agentId,
				instanceId,
				sessionId
			}, { persistRecent: true }).catch(() => void 0);
			else openColleagueChatRef.current({ agentId }).catch(() => void 0);
		}, []);
		import_react.useEffect(() => {
			const state = location?.state;
			if (state?.openChatAgentId) {
				pendingOpenChatTargetRef.current = {
					agentId: state.openChatAgentId,
					instanceId: state.instanceId,
					sessionId: state.sessionId
				};
				router?.navigateToPath("/colleagues", { replace: true });
				if (colleaguesLoadedRef.current) consumePendingOpenTarget();
			}
		}, [location?.state, consumePendingOpenTarget]);
		const loadColleagues = import_react.useCallback(async () => {
			statusRefreshSeqRef.current += 1;
			setIsLoadingColleagues(true);
			setColleaguesError(null);
			try {
				const [orchestratorResult, colleagueResult, conversationResult] = await Promise.all([
					fetchOrchestrator(adapter).catch((error) => {
						handleColleagueChatActionError("load orchestrator", error);
						return null;
					}),
					fetchGrantedColleaguesData(adapter),
					adapter.listCloudAgentUserConversations?.({ pageSize: 1e3 }).catch(() => null)
				]);
				const convsByAgentId = groupUserConversationsByAgentId(conversationResult?.items);
				setAllConversationsByAgentId(convsByAgentId);
				memoryDetailLoadingIdsRef.current.clear();
				setCloudAgentListRaw(colleagueResult.rawItems);
				setColleagues(colleagueResult.colleagues.map((colleague) => {
					const agentConvs = convsByAgentId.get(colleague.id) ?? convsByAgentId.get(colleague.businessAgentId ?? "") ?? [];
					const connected = colleague.connected === true || agentConvs.some((c) => c.status === "RUNNING");
					return connected === colleague.connected ? colleague : {
						...colleague,
						connected
					};
				}));
				setOrchestratorAgent(orchestratorResult);
			} catch (error) {
				setColleaguesError(error instanceof Error ? error.message : String(error));
				setCloudAgentListRaw([]);
				setColleagues([]);
				setOrchestratorAgent(null);
			} finally {
				setIsLoadingColleagues(false);
				colleaguesLoadedRef.current = true;
			}
		}, [adapter]);
		import_react.useEffect(() => {
			loadColleagues().then(() => {
				consumePendingOpenTarget();
			});
		}, [loadColleagues, consumePendingOpenTarget]);
		import_react.useEffect(() => {
			const sub = colleagueConversationsChanged$.subscribe(() => {
				loadColleagues().catch((error) => {
					handleColleagueChatActionError("refresh colleagues on change signal", error);
				});
			});
			return () => sub.unsubscribe();
		}, [loadColleagues]);
		import_react.useEffect(() => {
			if (colleagues.length === 0 || typeof window === "undefined") return;
			const timer = window.setInterval(() => {
				refreshColleagueStatuses().catch((error) => {
					handleColleagueChatActionError("poll colleague statuses", error);
				});
			}, 1e4);
			return () => window.clearInterval(timer);
		}, [colleagues.length, refreshColleagueStatuses]);
		import_react.useEffect(() => {
			if (typeof window === "undefined") return;
			const handleFocus = () => {
				refreshColleagueStatuses().catch((error) => {
					handleColleagueChatActionError("focus refresh colleague statuses", error);
				});
			};
			window.addEventListener("focus", handleFocus);
			return () => window.removeEventListener("focus", handleFocus);
		}, [refreshColleagueStatuses]);
		import_react.useEffect(() => {
			setActiveDetailTab("home");
		}, [selectedColleagueId]);
		import_react.useEffect(() => {
			if (selectedColleagueId && !selectedColleague) setSelectedColleagueId(null);
			if (chatColleagueId && !chatColleague) {
				setChatColleagueId(null);
				setDashboardAutoSendPrompt(null);
				setIsChatOpen(false);
			}
		}, [
			chatColleague,
			chatColleagueId,
			selectedColleague,
			selectedColleagueId
		]);
		import_react.useEffect(() => {
			if (!openMenuId) return;
			const handlePointerDown = (event) => {
				if (event.target?.closest(".colleague-card-menu, .colleague-card-more")) return;
				setOpenMenuId(null);
			};
			const handleKeyDown = (event) => {
				if (event.key === "Escape") setOpenMenuId(null);
			};
			document.addEventListener("pointerdown", handlePointerDown);
			document.addEventListener("keydown", handleKeyDown);
			return () => {
				document.removeEventListener("pointerdown", handlePointerDown);
				document.removeEventListener("keydown", handleKeyDown);
			};
		}, [openMenuId]);
		import_react.useEffect(() => {
			if (!deleteConfirmTarget) return;
			const handleKeyDown = (event) => {
				if (event.key === "Escape" && !isDeletingColleague) setDeleteConfirmTarget(null);
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [deleteConfirmTarget, isDeletingColleague]);
		const handleRequestDeleteColleague = import_react.useCallback((event, colleague) => {
			event.stopPropagation();
			setOpenMenuId(null);
			if (!adapter.deleteCloudAgent) return;
			reportAssistantMoreDeleteClick(adapter, { assistantId: colleague.id });
			setDeleteConfirmTarget(colleague);
		}, [adapter]);
		const handleCloseDeleteConfirm = import_react.useCallback(() => {
			if (isDeletingColleague) return;
			setDeleteConfirmTarget(null);
		}, [isDeletingColleague]);
		const refreshAfterDeleteColleague = import_react.useCallback(async (deletedSnapshots) => {
			const pendingUntil = Date.now() + 8e3;
			for (const snapshot of deletedSnapshots) colleagueConversationPatches$.next({
				type: "remove-session",
				agentId: snapshot.agentId,
				instanceId: snapshot.instanceId,
				sessionId: snapshot.sessionId,
				pendingUntil
			});
			await loadColleagues().catch((error) => handleColleagueChatActionError("refresh colleagues after delete", error));
			await cloudAgentQuota.refresh().catch((error) => handleColleagueChatActionError("refresh quota after delete", error));
			await Promise.all([floatingConversations.refresh().catch(() => void 0), detailConversations.refresh().catch(() => void 0)]);
			colleagueConversationsChanged$.next();
			colleagueAgentListChanged$.next();
		}, [
			cloudAgentQuota,
			detailConversations,
			floatingConversations,
			loadColleagues
		]);
		const handleConfirmDeleteColleague = import_react.useCallback(async () => {
			if (!deleteConfirmTarget || !adapter.deleteCloudAgent || isDeletingColleague) return;
			const targetId = deleteConfirmTarget.id || deleteConfirmTarget.businessAgentId;
			if (!targetId) {
				setDeleteConfirmTarget(null);
				return;
			}
			const matchIds = [deleteConfirmTarget.id, deleteConfirmTarget.businessAgentId].filter((v) => Boolean(v));
			const deletedSnapshots = [];
			for (const aid of matchIds) for (const conv of allConversationsByAgentId.get(aid) ?? []) deletedSnapshots.push({
				agentId: deleteConfirmTarget.id,
				instanceId: conv.id,
				sessionId: conv.runtimeId ?? conv.id
			});
			setIsDeletingColleague(true);
			try {
				await adapter.deleteCloudAgent({ agentId: targetId });
				if (selectedColleagueId === deleteConfirmTarget.id) setSelectedColleagueId(null);
				if (chatColleagueId === deleteConfirmTarget.id) {
					setChatColleagueId(null);
					setIsChatOpen(false);
				}
				setDeleteConfirmTarget(null);
				refreshAfterDeleteColleague(deletedSnapshots);
			} catch (error) {
				console.error("[ColleaguesPanel] deleteCloudAgent failed:", error);
			} finally {
				setIsDeletingColleague(false);
			}
		}, [
			adapter,
			allConversationsByAgentId,
			chatColleagueId,
			deleteConfirmTarget,
			isDeletingColleague,
			refreshAfterDeleteColleague,
			selectedColleagueId
		]);
		const handleColleagueCreated = import_react.useCallback(async () => {
			await loadColleagues();
			await cloudAgentQuota.refresh();
		}, [cloudAgentQuota, loadColleagues]);
		const handleQuotaExceeded = import_react.useCallback((quota) => {
			setQuotaLimitSnapshot(quota);
			setIsQuotaLimitOpen(true);
		}, []);
		const checkQuotaBeforeCreate = import_react.useCallback(async () => {
			return (await cloudAgentQuota.refresh()).quota;
		}, [cloudAgentQuota]);
		const handleOpenPlanUpgrade = import_react.useCallback(() => {
			setIsQuotaLimitOpen(false);
			openAssistantPlanUpgrade({ onSuccess: () => {
				cloudAgentQuota.refresh();
			} });
		}, [cloudAgentQuota]);
		const handleOpenCreateModal = import_react.useCallback(async () => {
			reportAssistantCreateEntryClick(adapter);
			const result = await cloudAgentQuota.refresh();
			if (isAssistantQuotaExceeded(result.quota)) {
				handleQuotaExceeded(result.quota);
				return;
			}
			if (result.errorReason === "unsupported" || result.errorReason === "unauthorized") {
				message.error(t("colleagues.quotaLimit.unsupported"));
				return;
			}
			setOpenMenuId(null);
			setIsChatOpen(false);
			setChatColleagueId(null);
			setEditingAgentId(null);
			setIsCreateModalOpen(true);
		}, [
			adapter,
			cloudAgentQuota,
			handleQuotaExceeded,
			t
		]);
		const handleEditColleague = import_react.useCallback((event, colleague, source = "more_menu") => {
			event.stopPropagation();
			setOpenMenuId(null);
			const targetId = colleague.id || colleague.businessAgentId;
			if (!targetId) return;
			if (source === "more_menu") reportAssistantMoreEditClick(adapter, { assistantId: targetId });
			else reportProfileEditClick(adapter, { assistantId: targetId });
			setEditingAgentId(targetId);
			setIsCreateModalOpen(true);
		}, [adapter]);
		const handleCloseCreateModal = import_react.useCallback(() => {
			setIsCreateModalOpen(false);
			setEditingAgentId(null);
		}, []);
		const handleOpenAssistantImConfig = import_react.useCallback(() => {
			setOpenMenuId(null);
			setBindChannelTarget(null);
			setBindChannelInitialTab("assistant");
			setBindChannelActiveTab("assistant");
			setIsBindChannelOpen(true);
		}, []);
		const handleBindChannel = import_react.useCallback((event, colleague) => {
			event.stopPropagation();
			setOpenMenuId(null);
			setBindChannelTarget(colleague);
			setBindChannelInitialTab("colleague");
			setBindChannelActiveTab("colleague");
			setIsBindChannelOpen(true);
		}, []);
		const handleCloseBindChannel = import_react.useCallback(() => {
			setIsBindChannelOpen(false);
			setBindChannelTarget(null);
			setWechatBotQrcode(void 0);
			setWechatBotError(null);
			setColleagueMemoryError(null);
			qqBindDisposeRef.current?.();
			qqBindDisposeRef.current = void 0;
			qqBindInProgressRef.current = false;
			setQQQrcode(void 0);
			setQQBindToken(void 0);
			setQQError(null);
			setQQManualError(null);
			setIsQQBindingLoading(false);
		}, []);
		const handleSelectBindChannelColleague = import_react.useCallback((id) => {
			const nextTarget = colleagues.find((colleague) => colleague.id === id || colleague.businessAgentId === id) ?? null;
			setColleagueMemoryError(null);
			setBindChannelTarget(nextTarget);
		}, [colleagues]);
		const resolveBindChannelTargetId = import_react.useCallback((colleague) => colleague?.id || colleague?.businessAgentId, []);
		const patchColleagueMemoryState = import_react.useCallback((agentId, enabled) => {
			const patch = (colleague) => colleague.id === agentId || colleague.businessAgentId === agentId ? {
				...colleague,
				memoryEnabled: enabled,
				memoryLoaded: true
			} : colleague;
			setColleagues((prev) => prev.map(patch));
			setBindChannelTarget((prev) => prev ? patch(prev) : prev);
		}, []);
		const loadColleagueMemoryState = import_react.useCallback(async (colleague) => {
			const targetId = resolveBindChannelTargetId(colleague);
			if (!targetId || colleague?.memoryLoaded || !adapter.getCloudAgent || memoryDetailLoadingIdsRef.current.has(targetId)) return;
			memoryDetailLoadingIdsRef.current.add(targetId);
			try {
				const manifest = (await adapter.getCloudAgent({ agentId: targetId })).currentVersion?.manifest;
				patchColleagueMemoryState(targetId, getManifestMemoryEnabled(manifest));
			} catch (error) {
				handleColleagueChatActionError("load colleague memory state", error);
			} finally {
				memoryDetailLoadingIdsRef.current.delete(targetId);
			}
		}, [
			adapter,
			patchColleagueMemoryState,
			resolveBindChannelTargetId
		]);
		const handleToggleColleagueMemory = import_react.useCallback(async (agentId, enabled) => {
			console.info("[CloudAgent][memory] toggle requested", {
				agentId,
				enabled
			});
			setColleagueMemoryError(null);
			if (togglingMemoryAgentId) {
				console.info("[CloudAgent][memory] toggle ignored: request in flight", {
					agentId,
					togglingMemoryAgentId
				});
				return;
			}
			if (!adapter.getCloudAgent || !adapter.publishCloudAgentVersion) {
				console.error("[CloudAgent][memory] toggle unsupported: adapter method missing", {
					hasGetCloudAgent: Boolean(adapter.getCloudAgent),
					hasPublishCloudAgentVersion: Boolean(adapter.publishCloudAgentVersion)
				});
				setColleagueMemoryError(t("colleagues.imConfig.memory.error.unsupported"));
				return;
			}
			setTogglingMemoryAgentId(agentId);
			try {
				const detail = await adapter.getCloudAgent({ agentId });
				const manifest = withManifestMemory(normalizeManifestForMemoryUpdate(detail.currentVersion?.manifest, detail.agentName ?? detail.agentId ?? agentId), enabled);
				await adapter.publishCloudAgentVersion({
					agentId,
					agentName: detail.agentName,
					description: detail.description,
					model: detail.currentVersion?.model ?? detail.model ?? "claude-4",
					manifest
				});
				console.info("[CloudAgent][memory] toggle success", {
					agentId,
					enabled
				});
				patchColleagueMemoryState(agentId, enabled);
			} catch (error) {
				console.error("[CloudAgent][memory] toggle failed", error);
				setColleagueMemoryError(t("colleagues.imConfig.memory.error.saveFailed", { message: error instanceof Error ? error.message : String(error) }));
				handleColleagueChatActionError("toggle colleague memory", error);
			} finally {
				setTogglingMemoryAgentId(null);
			}
		}, [
			adapter,
			patchColleagueMemoryState,
			t,
			togglingMemoryAgentId
		]);
		import_react.useEffect(() => {
			if (!isBindChannelOpen || bindChannelActiveTab !== "memory") return;
			loadColleagueMemoryState(bindChannelTarget ?? colleagues[0] ?? null);
		}, [
			bindChannelActiveTab,
			bindChannelTarget,
			colleagues,
			isBindChannelOpen,
			loadColleagueMemoryState
		]);
		const refreshWechatBotBinding = import_react.useCallback(async (colleague) => {
			const targetId = resolveBindChannelTargetId(colleague);
			if (!targetId || !facades?.agentIm) {
				setWechatBotBinding(void 0);
				return;
			}
			try {
				setWechatBotBinding((await facades.agentIm.getBinding({
					targetType: "colleague",
					targetId,
					backendMode: "local",
					channelType: "wechatbot"
				})).binding);
			} catch (error) {
				setWechatBotError(error instanceof Error ? error.message : String(error));
			}
		}, [facades, resolveBindChannelTargetId]);
		const refreshQQBinding = import_react.useCallback(async (colleague) => {
			const targetId = resolveBindChannelTargetId(colleague);
			if (!targetId || !facades?.agentIm) {
				setQQBinding(void 0);
				return;
			}
			try {
				const result = await facades.agentIm.getBinding({
					targetType: "colleague",
					targetId,
					backendMode: "local",
					channelType: "qq"
				});
				if (result.binding && result.binding.status === "bound") setQQBinding({
					enabled: result.binding.enabled,
					status: result.binding.status,
					botName: result.binding.displayName || "",
					botId: result.binding.accountId || ""
				});
				else setQQBinding(void 0);
			} catch (error) {
				setQQError(error instanceof Error ? error.message : String(error));
			}
		}, [facades, resolveBindChannelTargetId]);
		import_react.useEffect(() => {
			setWechatBotQrcode(void 0);
			setWechatBotError(null);
			setIsWechatBotBindingLoading(false);
			setQQQrcode(void 0);
			setQQError(null);
			setQQManualError(null);
			setIsQQBindingLoading(false);
			qqBindDisposeRef.current?.();
			qqBindDisposeRef.current = void 0;
			qqBindInProgressRef.current = false;
			if (!isBindChannelOpen || bindChannelActiveTab !== "colleague" || !bindChannelTarget) {
				setWechatBotBinding(void 0);
				setQQBinding(void 0);
				return;
			}
			refreshWechatBotBinding(bindChannelTarget).catch((error) => {
				setWechatBotError(error instanceof Error ? error.message : String(error));
			});
			refreshQQBinding(bindChannelTarget).catch((error) => {
				setQQError(error instanceof Error ? error.message : String(error));
			});
		}, [
			bindChannelActiveTab,
			bindChannelTarget,
			isBindChannelOpen,
			refreshWechatBotBinding,
			refreshQQBinding
		]);
		import_react.useEffect(() => () => {
			qqBindDisposeRef.current?.();
			qqBindDisposeRef.current = void 0;
		}, []);
		const handleBindChannelAction = import_react.useCallback(async (channelId) => {
			if (channelId === "qq") {
				if (shouldRestrictQQ) {
					setQQError(t("colleagues.bindChannel.channel.qq.ioaRestricted"));
					return;
				}
				if (qqBindInProgressRef.current) return;
				const targetId = resolveBindChannelTargetId(bindChannelTarget);
				if (!targetId) {
					setQQError(t("colleagues.bindChannel.channel.missingTarget"));
					return;
				}
				if (!facades?.agentIm) {
					setQQError(t("colleagues.bindChannel.channel.unsupported"));
					return;
				}
				qqBindDisposeRef.current?.();
				qqBindDisposeRef.current = void 0;
				qqBindInProgressRef.current = true;
				setIsQQBindingLoading(true);
				setQQError(null);
				setQQManualError(null);
				setQQQrcode(void 0);
				setQQBindToken(void 0);
				try {
					const { promise, dispose } = startQQBind({
						targetType: "colleague",
						targetId,
						backendMode: "local",
						onQrUpdate: (url) => {
							setQQQrcode(url);
						},
						onQrExpired: () => {
							setQQError(null);
						},
						onBindFailed: (message) => {
							qqBindDisposeRef.current?.();
							qqBindDisposeRef.current = void 0;
							setQQBinding({
								enabled: false,
								status: "bind_failed"
							});
							setQQQrcode(void 0);
							setQQBindToken(void 0);
							qqBindInProgressRef.current = false;
							setIsQQBindingLoading(false);
							setQQError(message);
						},
						onBindSuccess: (appId) => {
							qqBindDisposeRef.current?.();
							qqBindDisposeRef.current = void 0;
							setQQBinding({
								enabled: true,
								status: "bound",
								botName: `QQBot-${appId.slice(-6)}`,
								botId: appId
							});
							setQQQrcode(void 0);
							setQQBindToken(void 0);
							qqBindInProgressRef.current = false;
							setIsQQBindingLoading(false);
						}
					});
					qqBindDisposeRef.current = dispose;
					const result = await promise;
					if (result.cancelled) return;
					if (!result.success) throw new Error(result.message || t("colleagues.bindChannel.channel.qq.bindFailed"));
					setQQQrcode(result.qrcodeUrl || result.qrcodeImgContent || void 0);
					setQQBindToken(result.bindToken || void 0);
					setQQBinding({
						enabled: false,
						status: "pending"
					});
				} catch (error) {
					setQQError(error instanceof Error ? error.message : String(error));
				} finally {
					qqBindInProgressRef.current = false;
					setIsQQBindingLoading(false);
				}
				return;
			}
			if (channelId !== "wechatbot") {
				setWechatBotError(t("colleagues.bindChannel.channel.unsupported"));
				return;
			}
			const targetId = resolveBindChannelTargetId(bindChannelTarget);
			if (!targetId) {
				setWechatBotError(t("colleagues.bindChannel.channel.missingTarget"));
				return;
			}
			if (!facades?.agentIm) {
				setWechatBotError(t("colleagues.bindChannel.channel.unsupported"));
				return;
			}
			setIsWechatBotBindingLoading(true);
			setWechatBotError(null);
			setWechatBotQrcode(void 0);
			const baseParams = {
				targetType: "colleague",
				targetId,
				backendMode: "local"
			};
			try {
				const precheck = await facades.agentIm.wechatBotPrebindCheck(baseParams);
				let confirmDisableLocalClaw = false;
				if (precheck.requiresDisableLocalClaw) {
					if (!(typeof window === "undefined" || window.confirm(t("colleagues.bindChannel.channel.wechatBot.localClawConflict")))) return;
					confirmDisableLocalClaw = true;
				}
				const result = await facades.agentIm.wechatBotStartBind({
					...baseParams,
					confirmDisableLocalClaw
				});
				if (!result.success) throw new Error(result.message || t("colleagues.bindChannel.channel.wechatBot.bindFailed"));
				setWechatBotBinding(result.binding);
				setWechatBotQrcode(result.qrcodeImgContent);
			} catch (error) {
				setWechatBotError(error instanceof Error ? error.message : String(error));
			} finally {
				setIsWechatBotBindingLoading(false);
			}
		}, [
			adapter,
			facades,
			bindChannelTarget,
			resolveBindChannelTargetId,
			shouldRestrictQQ,
			startQQBind,
			t
		]);
		const handleUnbindWechatBot = import_react.useCallback(async () => {
			const targetId = resolveBindChannelTargetId(bindChannelTarget);
			if (!targetId || !facades?.agentIm) {
				setWechatBotError(t("colleagues.bindChannel.channel.unsupported"));
				return;
			}
			if (!(typeof window === "undefined" || window.confirm(t("colleagues.bindChannel.channel.wechatBot.unbindConfirm")))) return;
			setIsWechatBotBindingLoading(true);
			setWechatBotError(null);
			try {
				const result = await facades.agentIm.wechatBotUnbind({
					targetType: "colleague",
					targetId,
					backendMode: "local"
				});
				if (!result.success) throw new Error(result.message || t("colleagues.bindChannel.channel.wechatBot.unbindFailed"));
				setWechatBotBinding(result.binding);
				setWechatBotQrcode(void 0);
			} catch (error) {
				setWechatBotError(error instanceof Error ? error.message : String(error));
			} finally {
				setIsWechatBotBindingLoading(false);
			}
		}, [
			facades,
			bindChannelTarget,
			resolveBindChannelTargetId,
			t
		]);
		const handleQQManualSubmit = import_react.useCallback(async (appId, appSecret) => {
			if (shouldRestrictQQ) {
				setQQManualError(t("colleagues.bindChannel.channel.qq.ioaRestricted"));
				return;
			}
			const targetId = resolveBindChannelTargetId(bindChannelTarget);
			if (!targetId || !facades?.agentIm) {
				setQQError(t("colleagues.bindChannel.channel.unsupported"));
				return;
			}
			qqBindDisposeRef.current?.();
			qqBindDisposeRef.current = void 0;
			setIsQQBindingLoading(true);
			setQQManualError(null);
			setQQError(null);
			try {
				const result = await facades.agentIm.qqManualBind({
					targetType: "colleague",
					targetId,
					backendMode: "local",
					appId,
					appSecret
				});
				if (!result.success) {
					setQQManualError(result.message || t("colleagues.bindChannel.channel.qq.bindFailed"));
					return;
				}
				setQQBinding({
					enabled: true,
					status: "bound",
					botName: result.binding?.displayName || "QQBot",
					botId: appId
				});
				setQQQrcode(void 0);
				setQQBindToken(void 0);
			} catch (error) {
				setQQManualError(error instanceof Error ? error.message : String(error));
			} finally {
				setIsQQBindingLoading(false);
			}
		}, [
			facades,
			bindChannelTarget,
			resolveBindChannelTargetId,
			shouldRestrictQQ,
			t
		]);
		const handleUnbindQQ = import_react.useCallback(async () => {
			if (!(typeof window === "undefined" || window.confirm(t("colleagues.bindChannel.channel.qq.unbindConfirm")))) return;
			const targetId = resolveBindChannelTargetId(bindChannelTarget);
			if (!targetId || !facades?.agentIm) {
				setQQError(t("colleagues.bindChannel.channel.unsupported"));
				return;
			}
			setIsQQBindingLoading(true);
			setQQError(null);
			try {
				const result = await facades.agentIm.qqUnbind({
					targetType: "colleague",
					targetId,
					backendMode: "local"
				});
				if (!result.success) throw new Error(result.message || t("colleagues.bindChannel.channel.qq.unbindFailed"));
				setQQBinding(void 0);
				setQQQrcode(void 0);
				setQQBindToken(void 0);
			} catch (error) {
				setQQError(error instanceof Error ? error.message : String(error));
			} finally {
				setIsQQBindingLoading(false);
			}
		}, [
			facades,
			bindChannelTarget,
			resolveBindChannelTargetId,
			t
		]);
		const [wechatMiniQrcode, setWechatMiniQrcode] = import_react.useState(void 0);
		const handleOpenWechatMini = import_react.useCallback(() => {
			setWechatMiniQrcode("https://placehold.co/200x200/07c160/ffffff?text=QR");
		}, []);
		const handleCloseWechatMiniQrcode = import_react.useCallback(() => {
			setWechatMiniQrcode(void 0);
		}, []);
		import_react.useEffect(() => {
			if (!bindChannelTarget || !wechatBotQrcode || !facades?.agentIm) return;
			const targetId = resolveBindChannelTargetId(bindChannelTarget);
			if (!targetId) return;
			let disposed = false;
			let inFlight = false;
			const poll = async () => {
				if (disposed || inFlight) return;
				inFlight = true;
				try {
					const result = await facades.agentIm.wechatBotGetBindStatus({
						targetType: "colleague",
						targetId,
						backendMode: "local"
					});
					if (disposed) return;
					if (result.bound) {
						setWechatBotBinding(result.binding);
						setWechatBotQrcode(void 0);
						setWechatBotError(null);
					}
				} catch (error) {
					if (!disposed) setWechatBotError(error instanceof Error ? error.message : String(error));
				} finally {
					inFlight = false;
				}
			};
			const timer = window.setInterval(poll, 1e3);
			poll().catch((error) => {
				if (!disposed) setWechatBotError(error instanceof Error ? error.message : String(error));
			});
			return () => {
				disposed = true;
				window.clearInterval(timer);
			};
		}, [
			facades,
			bindChannelTarget,
			resolveBindChannelTargetId,
			wechatBotQrcode
		]);
		const handleOpenChat = import_react.useCallback(() => {
			if (!selectedColleague) return;
			reportProfileChatClick(adapter, { assistantId: selectedColleague.id });
			setOpenMenuId(null);
			openRecentOrNewColleagueChat(selectedColleague.id).catch((error) => {
				handleColleagueChatActionError("open detail chat", error);
			});
		}, [
			adapter,
			openRecentOrNewColleagueChat,
			selectedColleague
		]);
		const handleOpenDashboardChat = import_react.useCallback(() => {
			const targetAgentId = orchestratorAgent?.id;
			if (!targetAgentId) return;
			setOpenMenuId(null);
			openColleagueChat({ agentId: targetAgentId }).catch((error) => {
				handleColleagueChatActionError("open dashboard assistant chat", error);
			});
		}, [openColleagueChat, orchestratorAgent]);
		const handleSubmitDashboardPrompt = import_react.useCallback((event) => {
			event.preventDefault();
			const target = orchestratorAgent;
			if (!target) return;
			const promptText = dashboardPrompt.trim();
			setOpenMenuId(null);
			openRecentOrNewColleagueChat(target.id).then(() => {
				if (!promptText) return;
				const nextId = dashboardAutoSendPromptSeqRef.current + 1;
				dashboardAutoSendPromptSeqRef.current = nextId;
				setDashboardAutoSendPrompt({
					id: nextId,
					text: promptText
				});
				setDashboardPrompt("");
			}).catch((error) => {
				handleColleagueChatActionError("open dashboard assistant chat with prompt", error);
			});
		}, [
			dashboardPrompt,
			openRecentOrNewColleagueChat,
			orchestratorAgent
		]);
		const handleDismissFloatingChatGuide = import_react.useCallback(() => {
			markColleaguesFloatingChatGuideDismissed();
			setIsFloatingChatGuideOpen(false);
		}, []);
		const handleStartFloatingChatGuide = import_react.useCallback(() => {
			reportAssistantTrialClick(adapter);
			markColleaguesFloatingChatGuideDismissed();
			setIsFloatingChatGuideOpen(false);
			reportAssistantTrialLoadingShow(adapter);
			handleOpenDashboardChat();
		}, [adapter, handleOpenDashboardChat]);
		const finishCloseFloatingChat = import_react.useCallback(() => {
			setIsChatOpen(false);
			setChatColleagueId(null);
			setDashboardAutoSendPrompt(null);
			setChatInstanceId(null);
			setChatSessionId(null);
			setChatSessionStatus(null);
			setIsChatFloatClosing(false);
			chatFloatCloseTimerRef.current = null;
		}, []);
		const handleCloseFloatingChat = import_react.useCallback(() => {
			if (isChatFloatClosing) return;
			floatingChatSwitchGenRef.current += 1;
			clearChatFloatCloseTimer();
			setChatShellError(null);
			setIsChatFloatClosing(true);
			if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
				finishCloseFloatingChat();
				return;
			}
			chatFloatCloseTimerRef.current = setTimeout(finishCloseFloatingChat, CHAT_FLOAT_EXIT_ANIMATION_MS);
		}, [
			clearChatFloatCloseTimer,
			finishCloseFloatingChat,
			isChatFloatClosing
		]);
		const handleBackToDetail = import_react.useCallback(() => {
			handleCloseFloatingChat();
		}, [handleCloseFloatingChat]);
		const handleCreateFloatingChat = import_react.useCallback(() => {
			if (!chatColleagueId || isChatBusy) return;
			floatingChatSwitchGenRef.current += 1;
			setChatShellError(null);
			clearRecentColleagueChatTarget();
			setChatInstanceId(null);
			setChatSessionId(null);
			setChatSessionStatus(null);
			(chatPageRef.current ? chatPageRef.current.restart({
				agentId: chatColleagueId,
				target: "new"
			}) : openColleagueChat({ agentId: chatColleagueId })).catch((error) => {
				setChatShellError(t("colleagues.chat.restartFailed", { message: getColleagueChatActionErrorMessage(error) }));
				handleColleagueChatActionError("restart new floating chat", error);
			});
		}, [
			chatColleagueId,
			isChatBusy,
			openColleagueChat,
			t
		]);
		const handleSelectFloatingChatSession = import_react.useCallback((target) => {
			if (isChatBusy) return;
			const switchGen = floatingChatSwitchGenRef.current + 1;
			floatingChatSwitchGenRef.current = switchGen;
			setChatColleagueId(target.agentId);
			setChatInstanceId(target.instanceId);
			setChatSessionId(target.sessionId);
			setChatSessionStatus(target.sessionStatus ?? null);
			writeRecentColleagueChatTarget({
				agentId: target.agentId,
				instanceId: target.instanceId,
				sessionId: target.sessionId,
				sessionStatus: target.sessionStatus ?? null
			});
			(chatPageRef.current?.restart({
				agentId: target.agentId,
				instanceId: target.instanceId,
				sessionId: target.sessionId,
				sessionStatus: target.sessionStatus ?? null
			}))?.catch((error) => {
				if (switchGen !== floatingChatSwitchGenRef.current) return;
				handleColleagueChatActionError("restart selected floating chat", error);
			});
		}, [isChatBusy]);
		const canOpenDetailTask = import_react.useCallback((task) => Boolean(task.agentId && task.instanceId && task.sessionId), []);
		const handleOpenDetailTask = import_react.useCallback((task) => {
			const { agentId, instanceId, sessionId } = task;
			if (!agentId || !instanceId || !sessionId) return;
			reportProfileTaskClick(adapter, {
				assistantId: agentId,
				conversationId: sessionId
			});
			openColleagueChat({
				agentId,
				instanceId,
				sessionId,
				sessionStatus: task.rawStatus
			}, { persistRecent: true }).catch((error) => {
				handleColleagueChatActionError("open detail task", error);
			});
		}, [openColleagueChat]);
		const handleDetailTaskRowKeyDown = import_react.useCallback((event, task) => {
			if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			handleOpenDetailTask(task);
		}, [handleOpenDetailTask]);
		const handleDeleteDetailTask = import_react.useCallback((event, task) => {
			event.stopPropagation();
			if (!task.sessionId) return;
			setDeleteConversationConfirmTarget(task);
		}, []);
		const handleCloseDeleteConversationConfirm = import_react.useCallback(() => {
			if (isDeletingConversation) return;
			setDeleteConversationConfirmTarget(null);
		}, [isDeletingConversation]);
		const notifyAfterDeleteConversation = import_react.useCallback((target, sessionId, isDeletingCurrent) => {
			colleagueConversationPatches$.next({
				type: "remove-session",
				agentId: target.agentId,
				instanceId: target.instanceId ?? "",
				sessionId,
				pendingUntil: Date.now() + 8e3
			});
			if (isDeletingCurrent) handleCreateFloatingChat();
		}, [handleCreateFloatingChat]);
		const handleConfirmDeleteConversation = import_react.useCallback(async () => {
			const target = deleteConversationConfirmTarget;
			const sessionId = target?.sessionId;
			if (!target || !sessionId || isDeletingConversation) return;
			const { instanceId } = target;
			const isDeletingCurrent = Boolean(chatSessionId) && chatSessionId === sessionId;
			setIsDeletingConversation(true);
			try {
				const result = await detailConversations.deleteSession(instanceId ? {
					instanceId,
					sessionId
				} : sessionId);
				if (!result.ok) {
					console.warn("[ColleaguesPanel] delete detail task failed:", result.error);
					message.error(t("colleagues.conversation.deleteFailed"));
					setDeleteConversationConfirmTarget(null);
					return;
				}
				setDeleteConversationConfirmTarget(null);
				notifyAfterDeleteConversation(target, sessionId, isDeletingCurrent);
			} catch (error) {
				message.error(t("colleagues.conversation.deleteFailed"));
				setDeleteConversationConfirmTarget(null);
				handleColleagueChatActionError("delete detail task", error);
			} finally {
				setIsDeletingConversation(false);
			}
		}, [
			chatSessionId,
			deleteConversationConfirmTarget,
			detailConversations,
			isDeletingConversation,
			notifyAfterDeleteConversation,
			t
		]);
		const handleRefreshFloatingColleagueSessions = import_react.useCallback((colleague) => {
			refreshColleagueStatuses().catch((error) => {
				handleColleagueChatActionError("refresh floating colleague sessions", error);
			});
			if (colleague.id === chatColleagueId) floatingConversations.refresh().catch((error) => {
				handleColleagueChatActionError("refresh active floating conversations", error);
			});
		}, [
			chatColleagueId,
			floatingConversations,
			refreshColleagueStatuses
		]);
		const handleSwitchFloatingExpert = import_react.useCallback((colleague) => {
			if (colleague.id === chatColleagueId || isChatBusy) return;
			const switchGen = floatingChatSwitchGenRef.current + 1;
			floatingChatSwitchGenRef.current = switchGen;
			setOpenMenuId(null);
			openColleagueChat({ agentId: colleague.id }).catch((error) => {
				if (switchGen !== floatingChatSwitchGenRef.current) return;
				handleColleagueChatActionError("switch floating chat colleague", error);
			});
			refreshColleagueStatuses().catch((error) => {
				if (switchGen !== floatingChatSwitchGenRef.current) return;
				handleColleagueChatActionError("refresh after switch floating chat colleague", error);
			});
		}, [
			chatColleagueId,
			isChatBusy,
			openColleagueChat,
			refreshColleagueStatuses
		]);
		const dashboardColleagues = colleagues;
		/**
		* 供 @同事 mention 弹层共享的状态映射。
		* - 数据源：colleagues 已经由后端顶层 agent.status 派生出最终状态
		* - 同时按 colleague.id 与 businessAgentId 双键写入，兼容 mention provider 不同 id 维度的查询
		* - 输出 mention 三态（busy/idle/unavailable），让首页工卡与 mention 在视觉文案上对齐
		*/
		const colleagueStatusForMention = import_react.useMemo(() => {
			const variantToMentionStatus = {
				working: "busy",
				abnormal: "unavailable",
				idle: "idle"
			};
			const map = /* @__PURE__ */ new Map();
			dashboardColleagues.forEach((colleague) => {
				const mentionStatus = variantToMentionStatus[colleague.statusVariant];
				map.set(colleague.id, mentionStatus);
				if (colleague.businessAgentId) map.set(colleague.businessAgentId, mentionStatus);
			});
			return map;
		}, [dashboardColleagues]);
		const floatingChatColleague = chatColleague;
		const workingColleagueCount = dashboardColleagues.filter((colleague) => colleague.statusVariant === "working").length;
		const selectedStatusFilterOption = COLLEAGUE_STATUS_FILTER_OPTIONS.find((option) => option.value === statusFilter) ?? COLLEAGUE_STATUS_FILTER_OPTIONS[0];
		const statusFilterDropdownItems = import_react.useMemo(() => COLLEAGUE_STATUS_FILTER_OPTIONS.map((option) => ({
			key: option.value,
			selected: option.value === statusFilter,
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "colleagues-filter-menu-label",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `colleagues-filter-status-dot colleagues-filter-status-dot--${getColleagueStatusFilterDotVariant(option.value)}`,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "colleagues-filter-menu-text",
						children: t(option.labelKey)
					}),
					option.value === statusFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {
						className: "colleagues-filter-selected-icon",
						size: "md",
						"aria-hidden": "true"
					})
				]
			})
		})), [statusFilter, t]);
		const handleStatusFilterSelect = import_react.useCallback((key) => {
			setStatusFilter(key);
		}, []);
		const filteredColleagues = import_react.useMemo(() => dashboardColleagues.filter((colleague) => matchesColleagueStatusFilter(colleague, statusFilter)), [dashboardColleagues, statusFilter]);
		const shouldShowFloatingChatGuide = isFloatingChatGuideOpen && !isChatOpen && Boolean(colleagues[0]);
		const floatingChat = chatColleague && floatingChatColleague && isChatOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `colleagues-chat-float is-wide${isChatFloatClosing ? " is-closing" : ""}`,
			role: "dialog",
			"aria-modal": "false",
			"aria-label": t("colleagues.chat.headerTitle"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `colleagues-chat-float__sidebar${isChatBusy ? " is-busy" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleaguesChatFloatColleagueRail, {
					orchestratorAgent,
					colleagues,
					activeColleagueId: chatColleagueId,
					getColleagueName: (colleague) => getColleagueName(t, colleague),
					getColleagueTitle: (colleague) => getColleagueTitle(t, colleague),
					renderAvatar: (colleague, avatarVariant, className) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueAvatar, {
						avatar: colleague.avatar,
						label: getColleagueName(t, colleague).slice(0, 1),
						variant: avatarVariant,
						className
					}),
					onSelect: handleSwitchFloatingExpert,
					onCreateNew: handleCreateFloatingChat,
					onRefreshSessions: handleRefreshFloatingColleagueSessions,
					hasHistorySessionsFor,
					activeTaskList: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleaguesChatFloatTaskList, {
						chatSessionId,
						conversations: floatingConversations,
						onSelect: handleSelectFloatingChatSession,
						onCreateNew: handleCreateFloatingChat
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "colleagues-chat-float__main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "colleagues-chat-float__topbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "colleagues-chat-float__title-static",
						"aria-label": t("colleagues.chat.headerTitle"),
						children: (() => {
							const titleName = getColleagueName(t, floatingChatColleague);
							const titleRole = getColleagueTitle(t, floatingChatColleague).trim();
							const titleStatus = getColleagueStatus(t, floatingChatColleague);
							const titleStatusVariant = floatingChatColleague.statusVariant;
							const fullName = titleRole ? `${titleName}（${titleRole}）` : titleName;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "colleagues-chat-float__title-static-name",
								title: fullName,
								children: fullName
							}), titleStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `colleagues-chat-float__title-static-status colleagues-chat-float__title-static-status--${titleStatusVariant}`,
								children: titleStatus
							})] });
						})()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "colleagues-chat-float__window-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "colleagues-chat-float__icon-button",
							"aria-label": t("colleagues.chat.sessionPicker.newSession"),
							title: t("colleagues.chat.sessionPicker.newSession"),
							onClick: handleCreateFloatingChat,
							disabled: isChatBusy,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcon, {
								width: 14,
								height: 14
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "colleagues-chat-float__icon-button",
							"aria-label": t("common.close"),
							onClick: handleCloseFloatingChat,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "colleagues-chat-float__body",
					children: [chatShellError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "colleagues-chat-float__error",
						role: "alert",
						children: chatShellError
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueChatPage, {
						ref: chatPageRef,
						agentId: chatColleague.id,
						model: chatColleague.model || "claude-4",
						name: getColleagueName(t, chatColleague),
						title: getColleagueTitle(t, chatColleague),
						description: getColleagueDescription(t, chatColleague),
						tags: chatColleague.tags.map((tag) => getColleagueTag(t, chatColleague, tag)),
						avatar: getAvatarImageUrl(chatColleague.avatar) ?? chatColleague.avatar,
						avatarLabel: getColleagueName(t, chatColleague).slice(0, 1),
						avatarVariant: chatColleagueIndex + 1,
						initialInstanceId: chatInstanceId ?? void 0,
						initialSessionId: chatSessionId ?? void 0,
						initialSessionStatus: chatSessionStatus ?? void 0,
						enableColleagueMention: orchestratorAgent != null && chatColleague.id === orchestratorAgent.id,
						isCloudAssistant: orchestratorAgent != null && chatColleague.id === orchestratorAgent.id,
						colleagueStatusForMention,
						colleagueSuggestionAgents: cloudAgentListRaw,
						onInstanceReady: ({ agentId, instanceId, sessionId }) => {
							setChatColleagueId(agentId);
							setChatInstanceId(instanceId);
							if (sessionId) {
								setChatSessionId(sessionId);
								setChatSessionStatus(null);
								writeRecentColleagueChatTarget({
									agentId,
									instanceId,
									sessionId
								});
							}
						},
						onBack: handleBackToDetail,
						variant: "floating",
						placeholder: t("colleagues.chat.floatPlaceholder"),
						autoSendPrompt: dashboardAutoSendPrompt,
						onAutoSendPromptConsumed: (id) => {
							setDashboardAutoSendPrompt((current) => current?.id === id ? null : current);
						},
						resolveExpertName: resolveColleagueNameById,
						resolveExpertDisplayInfo: resolveColleagueDisplayInfoById,
						onBusyChange: setIsChatBusy
					})]
				})]
			})]
		}) : null;
		const deleteConfirmDialog = deleteConfirmTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "colleague-delete-confirm-overlay",
			onMouseDown: handleCloseDeleteConfirm,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "colleague-delete-confirm-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "colleague-delete-confirm-title",
				"aria-describedby": "colleague-delete-confirm-description",
				onMouseDown: (event) => event.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "colleague-delete-confirm-title",
						children: t("colleagues.action.deleteConfirmTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "colleague-delete-confirm-description",
						children: t("colleagues.action.deleteConfirmDescription", { name: getColleagueName(t, deleteConfirmTarget) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "colleague-delete-confirm-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "colleague-delete-confirm-cancel",
							onClick: handleCloseDeleteConfirm,
							disabled: isDeletingColleague,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "colleague-delete-confirm-delete",
							onClick: handleConfirmDeleteColleague,
							disabled: isDeletingColleague,
							children: t("common.delete")
						})]
					})
				]
			})
		}) : null;
		const conversationDeleteConfirmDialog = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueConversationDeleteConfirmDialog, {
			visible: deleteConversationConfirmTarget !== null,
			title: deleteConversationConfirmTarget?.title ?? "",
			loading: isDeletingConversation,
			onCancel: handleCloseDeleteConversationConfirm,
			onConfirm: handleConfirmDeleteConversation
		});
		const detailDialog = selectedColleague ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "colleagues-panel--detail",
			"aria-labelledby": "colleague-detail-title",
			onMouseDown: () => setSelectedColleagueId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "colleague-detail-float-card",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "colleague-detail-title",
				onMouseDown: (event) => event.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "colleague-detail-sidebar",
					"aria-label": t("colleagues.detail.profile"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "colleague-detail-profile",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueAvatar, {
									avatar: selectedColleague.avatar,
									label: getColleagueName(t, selectedColleague).slice(0, 1),
									variant: selectedColleagueIndex + 1,
									className: "colleague-detail-top-avatar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "colleague-detail-title",
									children: getColleagueName(t, selectedColleague)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "colleague-detail-profile-meta",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getColleagueTitle(t, selectedColleague) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `colleague-detail-online colleague-detail-online--${derivedDetailColleagueStatus}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }), derivedDetailColleagueStatusText]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: getColleagueDescription(t, selectedColleague) })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "colleague-detail-nav",
							"aria-label": t("colleagues.detail.tabs"),
							children: COLLEAGUE_DETAIL_NAV_ITEMS.map((item) => {
								const active = activeDetailTab === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: `colleague-detail-nav-item${active ? " is-active" : ""}`,
									"aria-current": active ? "page" : void 0,
									onClick: () => setActiveDetailTab(item.id),
									children: [
										item.id === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeLineIcon, {}),
										item.id === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskListIcon, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(item.labelKey) })
									]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "colleague-detail-sidebar-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "colleague-detail-chat-button",
								onClick: handleOpenChat,
								children: t("colleagues.detail.startChat")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "colleague-detail-secondary-button",
								onClick: (event) => handleEditColleague(event, selectedColleague, "profile"),
								children: t("colleagues.action.editProfile")
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "colleague-detail-main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "colleague-detail-close",
							"aria-label": t("common.close"),
							onClick: () => setSelectedColleagueId(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, {})
						}),
						activeDetailTab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "colleague-detail-page colleague-detail-page--home",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "colleague-detail-overview-card",
								"aria-labelledby": "colleague-detail-overview-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									id: "colleague-detail-overview-title",
									children: t("colleagues.detail.taskOverviewV2")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "colleague-detail-overview-metrics",
									"aria-label": t("colleagues.detail.metricsLabel"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: getDaysOnDuty(selectedColleague.createdAt) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.detail.daysOnDuty") })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: detailRunningCount }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.detail.metric.inProgress") })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: detailCompletedCount }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.detail.metric.completed") })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: detailTotalCount }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.detail.taskCount") })] })
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "colleague-detail-home-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "colleague-detail-card",
									"aria-labelledby": "colleague-detail-status-title",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										id: "colleague-detail-status-title",
										children: t("colleagues.detail.statusTitle")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "colleague-detail-kv-list",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("colleagues.detail.taskExecution") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: detailRunningCount > 0 ? t("colleagues.detail.status.inProgress") : t("colleagues.detail.idleNoTask") })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("colleagues.detail.imStatus") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t("colleagues.detail.notBound") })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("colleagues.detail.visibleScope") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t("colleagues.detail.personalVisible") })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("colleagues.detail.lastActive") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: detailLastActiveText })] })
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "colleague-detail-card",
									"aria-labelledby": "colleague-detail-capability-title",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										id: "colleague-detail-capability-title",
										children: t("colleagues.detail.capabilityConfig")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "colleague-detail-kv-list colleague-detail-capability-list",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("colleagues.detail.connectRepo") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "colleague-detail-config-pill",
											children: detailRepoLabel ?? t("colleagues.detail.notConfigured")
										}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("colleagues.detail.hiredExpert") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "colleague-detail-config-pill",
											children: detailExpertLabel ?? t("colleagues.detail.notConfigured")
										}) })] })]
									})]
								})]
							})]
						}),
						activeDetailTab === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "colleague-detail-page colleague-detail-page--tasks",
							"aria-labelledby": "colleague-detail-task-page-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "colleague-detail-page-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									id: "colleague-detail-task-page-title",
									children: t("colleagues.detail.nav.tasks")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("colleagues.detail.taskPageDesc", { name: getColleagueName(t, selectedColleague) }) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "colleague-detail-task-table-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "colleague-detail-task-table",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("colleagues.detail.taskTable.id") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("colleagues.detail.taskTable.name") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("colleagues.detail.taskTable.source") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("colleagues.detail.taskTable.status") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("colleagues.detail.taskTable.createdAt") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { "aria-label": t("colleagues.conversation.deleteAria") })
									] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [detailTaskRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "colleague-detail-task-empty",
										colSpan: 6,
										children: detailConversations.isLoading ? t("common.loading") : t("colleagues.chat.sessionPicker.empty")
									}) }), detailTaskRows.map((task) => {
										const canOpen = canOpenDetailTask(task);
										const isActive = Boolean(isChatOpen && chatSessionId && task.sessionId === chatSessionId);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: `colleague-detail-task-table-row${canOpen ? " is-clickable" : ""}${isActive ? " is-active" : ""}`,
											tabIndex: canOpen ? 0 : void 0,
											"aria-current": isActive ? "true" : void 0,
											"aria-disabled": canOpen ? void 0 : true,
											"aria-label": task.title,
											onClick: () => handleOpenDetailTask(task),
											onKeyDown: (event) => handleDetailTaskRowKeyDown(event, task),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: task.shortId }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "colleague-detail-task-name-button",
													disabled: !canOpen,
													onClick: (event) => {
														event.stopPropagation();
														handleOpenDetailTask(task);
													},
													children: task.title
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "colleague-detail-source-chip",
													children: task.source
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `colleague-detail-task-status colleague-detail-task-status--${task.statusVariant}`,
													children: task.statusText
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: task.createdAtText }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "colleague-detail-task-delete",
													"aria-label": t("colleagues.conversation.deleteAria"),
													disabled: !task.sessionId,
													onClick: (event) => handleDeleteDetailTask(event, task),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrashLineIcon, {})
												}) })
											]
										}, task.id);
									})] })]
								})
							})]
						})
					]
				})]
			})
		}) }) : null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "colleagues-panel-shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkBuddyTopBar, {
					showUserPromptList: false,
					hideNewTask: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					ref: panelRef,
					className: "colleagues-panel colleagues-panel--dashboard",
					"aria-labelledby": "colleagues-panel-section-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "colleagues-cloud-assistant-card",
							"aria-labelledby": "colleagues-cloud-assistant-title",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "colleagues-cloud-assistant-mode-switch",
									role: "tablist",
									"aria-label": t("colleagues.dashboard.modeSwitchLabel"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "tab",
										"aria-selected": "false",
										className: "colleagues-cloud-assistant-mode-switch__option",
										onClick: handleSwitchToLegacy,
										children: t("colleagues.dashboard.modeLegacy")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "tab",
										"aria-selected": "true",
										className: "colleagues-cloud-assistant-mode-switch__option is-active",
										children: t("colleagues.dashboard.modeCloud")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "colleagues-cloud-assistant-content",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "colleagues-cloud-assistant-title-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											id: "colleagues-cloud-assistant-title",
											children: t("colleagues.dashboard.welcomeTitle")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "colleagues-cloud-assistant-im-actions",
											style: { display: "none" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "colleagues-cloud-assistant-remote-mobile",
												onClick: handleOpenAssistantImConfig,
												"aria-label": t("colleagues.dashboard.remoteMobile"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "colleagues-cloud-assistant-remote-mobile__plus",
													"aria-hidden": "true",
													children: "+"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.dashboard.remoteMobile") })]
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: `colleagues-cloud-assistant-prompt${!orchestratorAgent ? " is-disabled" : ""}`,
										onSubmit: handleSubmitDashboardPrompt,
										"aria-label": t("colleagues.dashboard.scheduleWork"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "colleagues-cloud-assistant-prompt-input",
											value: dashboardPrompt,
											onChange: (event) => setDashboardPrompt(event.currentTarget.value),
											placeholder: t("colleagues.dashboard.assistantInputPlaceholder"),
											disabled: !orchestratorAgent,
											"aria-label": t("colleagues.dashboard.assistantInputPlaceholder")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "colleagues-cloud-assistant-prompt-cta",
											disabled: !orchestratorAgent,
											children: t("colleagues.dashboard.scheduleWork")
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									className: "colleagues-cloud-assistant-illustration",
									src: cloud_assistant_illustration_default,
									alt: "",
									"aria-hidden": "true"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "colleagues-panel-section",
							"aria-labelledby": "colleagues-panel-section-title",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "colleagues-panel-section-header colleagues-panel-section-header--dashboard",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										id: "colleagues-panel-section-title",
										children: [t("colleagues.myColleagues"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.dashboard.countStatus", {
											count: colleagues.length,
											working: workingColleagueCount
										}) })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "colleagues-panel-section-actions",
										children: [colleaguesError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "colleagues-retry-button",
											onClick: () => loadColleagues(),
											children: t("common.retry")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "colleagues-filter-select-wrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
												trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: `colleagues-filter-select-trigger${isStatusFilterOpen ? " is-open" : ""}`,
													"aria-label": t("colleagues.dashboard.filterLabel"),
													"aria-haspopup": "menu",
													"aria-expanded": isStatusFilterOpen,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `colleagues-filter-status-dot colleagues-filter-status-dot--${getColleagueStatusFilterDotVariant(statusFilter)}`,
															"aria-hidden": "true"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "colleagues-filter-select-label",
															children: t(selectedStatusFilterOption.labelKey)
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, {
															className: "colleagues-filter-select-chevron",
															width: 16,
															height: 16,
															"aria-hidden": "true"
														})
													]
												}),
												items: statusFilterDropdownItems,
												onSelect: handleStatusFilterSelect,
												placement: "bottom-start",
												offsetDistance: -1,
												open: isStatusFilterOpen,
												onOpenChange: setIsStatusFilterOpen,
												portalRoot: "body",
												className: "colleagues-filter-dropdown"
											})
										})]
									})]
								}),
								isLoadingColleagues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "colleagues-panel-state",
									role: "status",
									children: t("common.loading")
								}),
								!isLoadingColleagues && colleaguesError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "colleagues-panel-state colleagues-panel-state--error",
									role: "alert",
									children: t("colleagues.loadError")
								}),
								!isLoadingColleagues && !colleaguesError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "colleagues-card-grid",
									role: "list",
									"aria-label": t("colleagues.myColleagues"),
									children: [filteredColleagues.map((colleague, index) => {
										const isMenuOpen = openMenuId === colleague.id;
										const description = getColleagueDescription(t, colleague);
										const isImConnected = colleague.connected === true;
										const statusLabel = getColleagueStatus(t, colleague);
										const proBadgeVariant = proBadgeVariantByIndex(index);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "colleague-card-wrapper",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProBadgeBack, {
													variant: proBadgeVariant,
													className: "colleague-card-pro-ribbon-back"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
													className: `colleague-card${isMenuOpen ? " is-menu-open" : ""}`,
													role: "listitem",
													tabIndex: 0,
													onClick: () => {
														reportAssistantCardProfileClick(adapter, { assistantId: colleague.id });
														handleCloseFloatingChat();
														setSelectedColleagueId(colleague.id);
													},
													onKeyDown: (event) => {
														if (event.key === "Enter" || event.key === " ") {
															event.preventDefault();
															reportAssistantCardProfileClick(adapter, { assistantId: colleague.id });
															handleCloseFloatingChat();
															setSelectedColleagueId(colleague.id);
														}
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															className: "colleague-card-more",
															"aria-label": t("colleagues.moreActions"),
															title: t("colleagues.moreActions"),
															"aria-haspopup": "menu",
															"aria-expanded": isMenuOpen,
															onClick: (event) => {
																event.stopPropagation();
																reportAssistantMoreMenuClick(adapter, {
																	assistantId: colleague.id,
																	position: index
																});
																setOpenMenuId((current) => current === colleague.id ? null : colleague.id);
															},
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreDotsIcon, {
																width: 16,
																height: 16
															})
														}),
														isMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "colleague-card-menu",
															role: "menu",
															"aria-label": t("colleagues.moreActions"),
															onClick: (event) => event.stopPropagation(),
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	role: "menuitem",
																	"aria-hidden": true,
																	tabIndex: -1,
																	style: { display: "none" },
																	onClick: (event) => handleBindChannel(event, colleague),
																	children: t("colleagues.action.bindChannel")
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	role: "menuitem",
																	onClick: (event) => handleEditColleague(event, colleague),
																	children: t("colleagues.action.editProfile")
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "colleague-card-menu-separator",
																	role: "separator"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	role: "menuitem",
																	className: "is-danger",
																	disabled: !adapter.deleteCloudAgent,
																	onClick: (event) => handleRequestDeleteColleague(event, colleague),
																	children: t("colleagues.action.delete")
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "colleague-card-identity",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColleagueAvatar, {
																avatar: colleague.avatar,
																label: getColleagueName(t, colleague).slice(0, 1),
																variant: index + 1,
																className: "colleague-card-avatar"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "colleague-card-identity-text",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "colleague-card-name-row",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: getColleagueName(t, colleague) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: `colleague-card-status-pill colleague-card-status-pill--${colleague.statusVariant}`,
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }), statusLabel]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "colleague-card-role",
																	children: getColleagueTitle(t, colleague)
																})]
															})]
														}),
														description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "colleague-card-description",
															children: description
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: `colleague-card-im-status${isImConnected ? " is-connected" : ""}`,
															style: { display: "none" },
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }), isImConnected ? t("colleagues.dashboard.imConnected") : t("colleagues.dashboard.imDisconnected")]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															className: "colleague-card-chat-button",
															onClick: (event) => {
																event.stopPropagation();
																reportRecommendAssistantChatClick(adapter, {
																	assistantId: colleague.id,
																	position: index
																});
																openColleagueChat({ agentId: colleague.id }).catch((error) => {
																	handleColleagueChatActionError("open colleague card chat", error);
																});
															},
															children: t("colleagues.dashboard.chat")
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProBadgeFront, {
													variant: proBadgeVariant,
													className: "colleague-card-pro-ribbon"
												})
											]
										}, colleague.id);
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "colleagues-create-card",
										onClick: handleOpenCreateModal,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "colleagues-create-card-plus",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlusIcon, {
													width: 32,
													height: 32
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("colleagues.dashboard.createTitle") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("colleagues.dashboard.createDesc") })
										]
									})]
								})
							]
						}),
						shouldShowFloatingChatGuide && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "colleagues-floating-chat-guide",
							"aria-label": t("colleagues.dashboard.chatGuide.description"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "colleagues-floating-chat-guide__text",
								children: t("colleagues.dashboard.chatGuide.description")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "colleagues-floating-chat-guide__actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "colleagues-floating-chat-guide__skip",
									onClick: handleDismissFloatingChatGuide,
									children: t("colleagues.dashboard.chatGuide.skip")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "colleagues-floating-chat-guide__start",
									onClick: handleStartFloatingChatGuide,
									children: t("colleagues.dashboard.chatGuide.start")
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `colleagues-floating-chat${shouldShowFloatingChatGuide ? " has-guide" : ""}`,
							"aria-label": t("colleagues.dashboard.chat"),
							disabled: !orchestratorAgent,
							onClick: handleStartFloatingChatGuide,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingChatIcon, {})
						}),
						detailDialog,
						floatingChat
					]
				}),
				deleteConfirmDialog,
				conversationDeleteConfirmDialog,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishColleagueModal, {
					open: publishTarget !== null,
					colleagueName: publishTarget ? getColleagueName(t, publishTarget) : "",
					colleagueTitle: publishTarget ? getColleagueTitle(t, publishTarget) : "",
					colleagueAvatarLabel: publishTarget ? getColleagueName(t, publishTarget).slice(0, 1) : "",
					colleagueAvatarVariant: publishTarget ? colleagues.indexOf(publishTarget) + 1 : 1,
					onClose: () => setPublishTarget(null),
					onConfirm: () => setPublishTarget(null)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateColleagueDialog, {
					open: isCreateModalOpen,
					onClose: handleCloseCreateModal,
					onCreated: handleColleagueCreated,
					editingAgentId,
					checkQuotaBeforeCreate,
					onQuotaExceeded: handleQuotaExceeded
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantQuotaLimitModal, {
					open: isQuotaLimitOpen,
					quota: quotaLimitSnapshot,
					onClose: () => setIsQuotaLimitOpen(false),
					onUpgrade: handleOpenPlanUpgrade
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BindChannelModal, {
					open: isBindChannelOpen,
					initialTab: bindChannelInitialTab,
					restrictedChannelIds: shouldRestrictQQ ? ["qq"] : [],
					colleagues: bindChannelColleagues,
					selectedColleagueId: bindChannelTarget?.id,
					selectedMemoryColleagueId: bindChannelTarget?.id,
					colleagueName: bindChannelTarget ? getColleagueName(t, bindChannelTarget) : "",
					colleagueTitle: bindChannelTarget ? getColleagueTitle(t, bindChannelTarget) : "",
					colleagueAvatarLabel: bindChannelTarget ? getColleagueName(t, bindChannelTarget).slice(0, 1) : "",
					colleagueAvatarVariant: bindChannelTarget ? colleagues.indexOf(bindChannelTarget) + 1 : 1,
					wechatBotState: {
						binding: wechatBotBinding,
						qrcodeImgContent: wechatBotQrcode,
						isLoading: isWechatBotBindingLoading,
						error: wechatBotError
					},
					qqState: {
						binding: qqBinding,
						qrcodeImgContent: qqQrcode,
						bindToken: qqBindToken,
						isLoading: isQQBindingLoading,
						error: qqError,
						manualError: qqManualError
					},
					onActiveTabChange: setBindChannelActiveTab,
					onSelectColleague: handleSelectBindChannelColleague,
					onSelectMemoryColleague: handleSelectBindChannelColleague,
					onToggleColleagueMemory: handleToggleColleagueMemory,
					isTogglingColleagueMemory: Boolean(togglingMemoryAgentId),
					colleagueMemoryError,
					wechatMiniState: { qrcodeImgContent: wechatMiniQrcode },
					onOpenWechatMini: handleOpenWechatMini,
					onCloseWechatMiniQrcode: handleCloseWechatMiniQrcode,
					onBindChannel: handleBindChannelAction,
					onUnbindWechatBot: handleUnbindWechatBot,
					onUnbindQQ: handleUnbindQQ,
					onQQManualSubmit: handleQQManualSubmit,
					onClose: handleCloseBindChannel,
					onEditProfile: () => {
						if (!bindChannelTarget) return;
						const targetId = bindChannelTarget.id || bindChannelTarget.businessAgentId;
						if (!targetId) return;
						setIsBindChannelOpen(false);
						setBindChannelTarget(null);
						setEditingAgentId(targetId);
						setIsCreateModalOpen(true);
					}
				})
			]
		});
	};
}));
//#endregion
export { init_use_my_colleague_conversations as a, useCloudAgentQuota as c, init_assistant_quota_utils as d, isAssistantQuotaExceeded as f, init_colleagues_panel as i, AssistantQuotaLimitModal as l, CreateColleagueDialog as n, useMyColleagueConversations as o, openAssistantPlanUpgrade as p, getAvatarImageUrl as r, init_use_cloud_agent_quota as s, ColleaguesPanel as t, init_assistant_quota_limit_modal as u };
