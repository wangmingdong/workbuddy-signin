import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Bu as useMacFullscreen, Fn as init_tab_registry, Kd as init_task_starter_store, Ld as automationExpertSummon$, Mn as writeClawSidebarActiveTabPreference, Or as useLoadingState, Pn as CLAW_LOCAL_TAB_KEY, Sc as init_app_providers, Tc as useAgentServices, U as init_expert, Uc as getModelIcon, Wc as init_icons, Yl as useNamedPageShow, aa as FolderIcon, bt as resolveAvatarUrl, ct as loadLegacyAdapterExperts, cu as useOpenSettings, i as SidebarNewTaskButton, kn as init_use_sidebar_state, lt as SHARED_RECENT_EXPERTS_KEY, o as init_workbuddy_topbar, oa as init_TaskStarterIcons, qd as isAutomationPayloadExpired, ql as init_use_named_page_show, r as SidebarExpandButton, sl as init_telemetry, su as init_SettingsContext, u as isMac, ul as useAgentTelemetry, xt as init_hooks, zu as init_use_mac_fullscreen } from "./agent-mail-CiuzbR2o.js";
import { Ga as FloatingPortal, Gs as createPhraseBlock, Ja as useClick, Lo as getExpertGradient, Qa as useInteractions, Ro as getExpertInitial, Ui as AddIcon, Uo as BottomSlotPositions, Ya as useDismiss, Yr as toast, _r as ChatInput, eo as useRole, io as shift, no as flip, oo as autoUpdate, pn as Dropdown, ro as offset, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { p as init_environment, y as isWorkBuddy } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { f as useNavigate, i as useSearchParams, r as init_dist } from "./dist-BlOCCi14.js";
import { a as formatAutomationCwdLabel, d as isClawWorkspacePath, u as init_file_path } from "./file-path-DzzGeaqx.js";
import { D as useAccountService, E as init_auth_context, bt as isClawPath, t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { c as init_auth_expired_detector, l as notifyIfAuthExpired } from "./chat-types-BMkaZPiE.js";
import { A as message, H as Modal, I as Dropdown$1, O as Switch, S as Segmented, T as Checkbox, X as Loading, Z as Card, ct as Button, et as Tag, g as Tooltip, lt as Avatar, rt as Search, t as init_foundation, tt as Input, v as Breadcrumb } from "./foundation-QOglV606.js";
import { Ar as AtmBatchManageIcon, Bn as ErrorCircleIcon, Dt as RunningStatusIcon, E as XCloseIcon, Ot as init_RunningStatusIcon, Vn as init_ErrorCircleIcon, br as AutomationEmptyAlarmIcon, cr as CheckBoldIcon, ir as ChevronDownIcon, jr as AtmAddFromTemplateIcon, jt as ResumeCircleIcon, lr as init_CheckBoldIcon, n as init_icons$1, o as WarningOutlineIcon, or as CheckIcon, sr as init_CheckIcon, tr as ChevronsUpDownIcon, vr as AutomationEmptyRecordsIcon, vt as ShieldCheckIcon, wr as ArchiveIcon } from "./icons-Cj3UopO9.js";
import { n as useFloating, t as init_floating } from "./floating-1_OFz6f-.js";
import { n as useI18n, r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { S as useRouterContextSafe, i as buildClawLocalSessionPath, t as init_router } from "./router-O5ZnP5xt.js";
import { _t as useWechatMiniProgramIntegrationFeature, t as init_product_features, vt as useWecomBotIntegrationFeature } from "./product-features-N4Z0q4SS.js";
import { O as useConnectorStore, x as init_store, y as connectorStore } from "./ima-auth-store-Cq8i4JCG.js";
import { t as init_common } from "./common-Czfscgga.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
import { $ as DeleteIcon, A as PlayIcon, F as MoreDotsIcon, _ as TemplateFilmIcon, c as TemplateWeeklyReportIcon, ct as WbAddIcon, d as TemplateMessagesSquareIcon, f as TemplateListTodoIcon, g as TemplateHospitalIcon, h as TemplateImageIcon, ht as AlarmClockIcon, l as TemplateNewsIcon, m as TemplateLanguagesIcon, p as TemplateLightbulbIcon, pt as CirclePauseIcon, r as init_icons$2, u as TemplateMoonIcon, ut as WbFilterIcon, v as TemplateCalendarIcon, y as TemplateAlarmClockIcon } from "./oauth-callback-IQ0UCaVX.js";
import { r as useExpertAvatar } from "./center-Cjtv6Q1N.js";
import { n as SkillSelector, t as init_chat_skill_selector } from "./chat-skill-selector-Bu3ENuzv.js";
//#region ../../packages/agent-ui/src/components/automation-panel/index.less
var init_automation_panel$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-inbox-detail.less
var init_automation_inbox_detail$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/inbox-conversation.ts
function resolveInboxConversation(item) {
	const run = item.runs.find((entry) => !!entry.conversationId);
	if (!run?.conversationId) return {};
	return {
		conversationId: run.conversationId,
		cwd: run.cwd
	};
}
var init_inbox_conversation = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/inbox-detail-utils.ts
/**
* 运行中的记录（IN_PROGRESS 或虚拟 running record）尚未产生最终结果，
* 不能用 item.success 判定成功/失败 —— 否则 success:false 会被误显示成“失败”。
*/
function isInboxRunningItem(item) {
	if (item.isRunningRecord === true) return true;
	return item.status === "IN_PROGRESS" && !item.finishedAt;
}
function isInboxDeliveredLike(item) {
	const resultState = getInboxResultState(item);
	if (item.runKind === "interrupted" || resultState === "failed") return false;
	if (resultState === "partial_delivered" || resultState === "side_effect_only" || resultState === "delivered") return true;
	return item.success;
}
function isInboxFailedLike(item) {
	if (!item.finishedAt) return false;
	if (item.runKind === "interrupted") return true;
	const resultState = getInboxResultState(item);
	if (resultState === "failed") return true;
	if (resultState === "partial_delivered" || resultState === "side_effect_only" || resultState === "delivered") return false;
	return !item.success;
}
function shouldOpenInboxDetailFirst(item) {
	if (item.runKind === "interrupted") return true;
	if (getInboxResultState(item) === "partial_delivered") return true;
	return !isInboxDeliveredLike(item);
}
function getInboxStatusLabel(item, t) {
	if (isInboxRunningItem(item)) return t("automation.row.inProgress");
	const resultState = getInboxResultState(item);
	if (item.runKind === "interrupted") return t("automation.result.interrupted");
	if (resultState === "partial_delivered") return t("automation.result.partialDelivered");
	if (resultState === "side_effect_only") return t("automation.result.sideEffectOnly");
	if (item.runKind === "missed") return item.success ? t("automation.result.catchUpSucceeded") : t("automation.result.catchUpFailed");
	if (item.runKind === "manual_test") return isInboxDeliveredLike(item) ? t("automation.result.manualTest") : t("automation.row.failed");
	return item.success ? t("automation.row.succeeded") : t("automation.row.failed");
}
/**
* 详情弹层顶部状态色需要和列表状态保持一致，避免“中断”显示成成功态。
*/
function getInboxDetailStatusClass(item) {
	if (isInboxRunningItem(item)) return "running";
	if (item.runKind === "interrupted") return "failed";
	const resultState = getInboxResultState(item);
	if (resultState === "partial_delivered") return "neutral";
	if (resultState === "side_effect_only" || resultState === "delivered") return "success";
	if (resultState === "failed") return "failed";
	return item.success ? "success" : "failed";
}
function getInboxDetailSubtitleKey(item) {
	if (getInboxResultState(item) === "partial_delivered") return "automation.detail.partialDeliveredHint";
	return shouldOpenInboxDetailFirst(item) ? "automation.detail.failureHint" : "automation.detail.historyMissingHint";
}
/**
* 详情弹层首屏先讲“人话原因”，原始异常字符串放进技术详情。
* 这样既能承接失败体验，也不丢排障信息。
*/
function getInboxDetailReasonKey(item, rawText) {
	if (isInboxRunningItem(item)) return "automation.detail.reason.running";
	if (getInboxResultState(item) === "partial_delivered") return "automation.detail.reason.partialDelivered";
	if (!shouldOpenInboxDetailFirst(item)) return "automation.detail.reason.historyMissing";
	const normalizedRawText = rawText?.trim();
	if (normalizedRawText && NETWORK_ERROR_PATTERN.test(normalizedRawText)) return "automation.detail.reason.network";
	if (item.runKind === "interrupted" || normalizedRawText && INTERRUPTED_ERROR_PATTERN.test(normalizedRawText)) return "automation.detail.reason.interrupted";
	return "automation.detail.reason.failed";
}
/**
* 详情弹层里的“查看关联会话”需要给用户明确反馈：
* 没有关联会话时不打开；打开失败时保留当前详情并提示重试。
*/
async function openLinkedInboxConversation({ conversationId, cwd, title, onOpenConversation, onMissingConversation, onOpenFailed }) {
	if (!conversationId) {
		onMissingConversation();
		return false;
	}
	try {
		await onOpenConversation(conversationId, cwd, title);
		return true;
	} catch (error) {
		onOpenFailed(error);
		return false;
	}
}
var NETWORK_ERROR_PATTERN, INTERRUPTED_ERROR_PATTERN, getInboxResultState;
var init_inbox_detail_utils = __esmMin((() => {
	NETWORK_ERROR_PATTERN = /(econnrefused|econnreset|enotfound|eai_again|etimedout|timed out|timeout|502|503|504|network error|proxy:|http_proxy|https_proxy|socket hang up|fetch failed|connection reset)/i;
	INTERRUPTED_ERROR_PATTERN = /(cancelled|canceled|refusal|aborted|interrupted|stopped before completion)/i;
	getInboxResultState = (item) => item.resultState;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-inbox-detail.tsx
var import_react$10, import_jsx_runtime$9, MAX_RUN_ERROR_DISPLAY_LENGTH, formatTime, getDisplayText, decodeJsonString, findErrorMessage, getConciseTechnicalSummary, getRunResultLabel, getRunResultStatusClass, collectArtifacts, getEvidenceLabel, AutomationInboxDetail;
var init_automation_inbox_detail = __esmMin((() => {
	init_automation_inbox_detail$1();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_inbox_conversation();
	init_inbox_detail_utils();
	import_jsx_runtime$9 = require_jsx_runtime();
	MAX_RUN_ERROR_DISPLAY_LENGTH = 4096;
	formatTime = (value) => value ? new Date(value).toLocaleString() : "-";
	getDisplayText = (value, maxLength = MAX_RUN_ERROR_DISPLAY_LENGTH) => {
		if (!value) return;
		return value.length > maxLength ? {
			text: `${value.slice(0, maxLength)}…`,
			isTruncated: true
		} : {
			text: value,
			isTruncated: false
		};
	};
	decodeJsonString = (value) => {
		try {
			return JSON.parse(`"${value}"`);
		} catch {
			return value;
		}
	};
	findErrorMessage = (value) => {
		if (!value || typeof value !== "object") return;
		const record = value;
		return typeof record.message === "string" ? record.message : typeof record.data?.details === "string" ? record.data.details : void 0;
	};
	getConciseTechnicalSummary = (value) => {
		const trimmed = value?.trim();
		if (!trimmed) return;
		const jsonStart = trimmed.indexOf("{");
		if (jsonStart >= 0) try {
			const message = findErrorMessage(JSON.parse(trimmed.slice(jsonStart)));
			if (message) return message;
		} catch {
			const match = trimmed.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);
			if (match?.[1]) return decodeJsonString(match[1]);
		}
		const readable = trimmed.replace(/^Automation prompt stopped before completion:\s*/i, "").replace(/^refusal:\s*/i, "").split("\n").map((line) => line.trim()).find(Boolean);
		return readable && readable.length > 160 ? `${readable.slice(0, 159)}…` : readable;
	};
	getRunResultLabel = (run, t) => {
		if (run.resultState === "partial_delivered") return t("automation.result.partialDelivered");
		if (run.resultState === "side_effect_only") return t("automation.result.sideEffectOnly");
		return run.success ? t("automation.row.succeeded") : t("automation.row.failed");
	};
	getRunResultStatusClass = (run) => {
		if (run.resultState === "partial_delivered") return "neutral";
		if (run.resultState === "side_effect_only" || run.resultState === "delivered") return "success";
		if (run.resultState === "failed") return "failed";
		return run.success ? "success" : "failed";
	};
	collectArtifacts = (item) => {
		const artifacts = [];
		const seen = /* @__PURE__ */ new Set();
		for (const run of item.runs || []) for (const artifact of run.artifacts || []) {
			const key = artifact.localPath || artifact.url || artifact.objectKey || artifact.fileName;
			if (seen.has(key)) continue;
			seen.add(key);
			artifacts.push(artifact);
		}
		return artifacts;
	};
	getEvidenceLabel = (evidence, t) => {
		if (!evidence || evidence === "none") return;
		switch (evidence) {
			case "assistant_output": return t("automation.evidence.assistantOutput");
			case "artifact": return t("automation.evidence.artifact");
			case "local_file_mutation": return t("automation.evidence.localFileMutation");
			case "external_action": return t("automation.evidence.externalAction");
			default: return;
		}
	};
	AutomationInboxDetail = ({ item, t, onClose, onRetryConversation }) => {
		const [expandedRunErrors, setExpandedRunErrors] = import_react$10.useState({});
		const { conversationId, cwd } = resolveInboxConversation(item);
		const artifacts = collectArtifacts(item);
		const representativeError = (item.runs || []).find((run) => !!run.error)?.error;
		const technicalSummary = (item.summary && item.summary !== "Interrupted" ? item.summary : representativeError)?.trim();
		const detailEvidenceLabel = getEvidenceLabel(item.resultEvidence, t);
		const subtitleKey = getInboxDetailSubtitleKey(item);
		const statusClass = getInboxDetailStatusClass(item);
		const statusLabel = getInboxStatusLabel(item, t);
		const opensDetailFirst = shouldOpenInboxDetailFirst(item);
		const userFacingReason = t(getInboxDetailReasonKey(item, technicalSummary));
		const primarySummary = opensDetailFirst ? userFacingReason : technicalSummary;
		const conciseTechnicalSummary = getConciseTechnicalSummary(technicalSummary);
		const technicalSummarySupplement = opensDetailFirst && conciseTechnicalSummary && conciseTechnicalSummary !== userFacingReason ? conciseTechnicalSummary : void 0;
		const canRetryConversation = Boolean(conversationId && onRetryConversation);
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(Modal, {
			open: true,
			onOpenChange: (nextOpen) => {
				if (!nextOpen) onClose();
			},
			size: "medium",
			footer: canRetryConversation ? void 0 : null,
			okText: canRetryConversation ? t("automation.detail.retryConversation") : void 0,
			cancelText: canRetryConversation ? t("common.cancel") : void 0,
			onOk: canRetryConversation ? () => {
				Promise.resolve(onRetryConversation?.(conversationId, cwd, item.automationName)).catch(() => void 0);
			} : void 0,
			onCancel: canRetryConversation ? onClose : void 0,
			title: item.automationName,
			closeAriaLabel: t("common.close"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
					className: "atm-detail-subtitle-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: "atm-detail-subtitle",
						children: t(subtitleKey)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "atm-detail-status-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
							className: `atm-detail-status ${statusClass}`,
							children: statusLabel
						}),
						detailEvidenceLabel && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
							className: "atm-detail-evidence",
							children: detailEvidenceLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
							className: "atm-detail-time",
							children: formatTime(item.finishedAt)
						})
					]
				}),
				(primarySummary || technicalSummarySupplement) && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("section", {
					className: "atm-detail-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "atm-detail-section-title",
						children: t("automation.detail.summary")
					}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: "atm-detail-text",
						children: [primarySummary && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
							className: "atm-detail-summary-main",
							children: primarySummary
						}), technicalSummarySupplement && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("pre", {
							className: "atm-detail-summary-technical",
							children: technicalSummarySupplement
						})]
					})]
				}),
				artifacts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("section", {
					className: "atm-detail-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "atm-detail-section-title",
						children: t("automation.detail.artifacts")
					}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "atm-detail-artifacts",
						children: artifacts.map((artifact) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
							className: "atm-detail-artifact",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
								className: "atm-detail-artifact-name",
								children: artifact.fileName
							}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
								className: "atm-detail-artifact-path",
								children: artifact.localPath || artifact.url || artifact.objectKey
							})]
						}, artifact.localPath || artifact.url || artifact.objectKey || artifact.fileName))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("section", {
					className: "atm-detail-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "atm-detail-section-title",
						children: t("automation.detail.runs")
					}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
						className: "atm-detail-runs",
						children: (item.runs || []).map((run, index) => {
							const runKey = `${item.id}-${index}-${run.cwd ?? ""}`;
							const runEvidenceLabel = getEvidenceLabel(run.resultEvidence, t);
							const displayRunError = getDisplayText(run.error);
							const showFullRunError = Boolean(displayRunError?.isTruncated && expandedRunErrors[runKey]);
							return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
								className: "atm-detail-run",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
										className: "atm-detail-run-header",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
											className: "atm-detail-run-path",
											title: run.cwd || "-",
											children: run.cwd || "-"
										}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
											className: getRunResultStatusClass(run),
											children: getRunResultLabel(run, t)
										})]
									}),
									run.output && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("pre", {
										className: "atm-detail-run-block",
										children: run.output
									}),
									displayRunError && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
										className: "atm-detail-run-error",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("pre", {
											className: "atm-detail-run-block error",
											children: displayRunError.text
										}), displayRunError.isTruncated && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
											className: "atm-detail-run-truncated",
											children: t("automation.detail.errorTruncated", { count: MAX_RUN_ERROR_DISPLAY_LENGTH })
										}), !showFullRunError && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Button, {
											type: "button",
											variant: "secondary",
											size: "small",
											className: "atm-detail-run-expand-btn",
											onClick: () => {
												setExpandedRunErrors((prev) => ({
													...prev,
													[runKey]: true
												}));
											},
											children: t("automation.detail.viewFullError")
										})] })]
									}),
									showFullRunError && run.error && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
										className: "atm-detail-run-technical",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
											className: "atm-detail-run-technical-title",
											children: t("automation.detail.technicalDetails")
										}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("pre", {
											className: "atm-detail-run-block",
											children: run.error
										})]
									}),
									runEvidenceLabel && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
										className: "atm-detail-run-evidence",
										children: runEvidenceLabel
									})
								]
							}, runKey);
						})
					})]
				})
			]
		});
	};
})), import_jsx_runtime$8, AutomationEditModeView;
var init_automation_edit_mode_view = __esmMin((() => {
	require_react();
	init_automation_inbox_detail();
	import_jsx_runtime$8 = require_jsx_runtime();
	AutomationEditModeView = ({ children, t, selectedInboxItem, onCloseInboxDetail, onRetryInboxConversation, permissionConfirmDialog }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "automation-panel code-buddy-automation",
			children: [
				children,
				permissionConfirmDialog,
				selectedInboxItem ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(AutomationInboxDetail, {
					item: selectedInboxItem,
					t,
					onClose: onCloseInboxDetail,
					onRetryConversation: onRetryInboxConversation
				}) : null
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-model-options.ts
/** 判断模型是否来自用户自定义配置，避免 custom-local 模型误归到 Built-In。 */
function isAutomationCustomModel(model) {
	return model.configurable === true || model.tags?.includes("custom") === true || model.id.startsWith(CUSTOM_LOCAL_PREFIX) || model.trustLevel === "custom";
}
/** 去掉本地自定义模型前缀，用于展示稳定、可识别的模型 ID。 */
function stripAutomationCustomLocalPrefix(id) {
	return id.startsWith(CUSTOM_LOCAL_PREFIX) ? id.slice(13) : id;
}
function isAutoRouteModel(model) {
	return AUTO_ROUTE_MODEL_IDS.has(model.id);
}
function getAutomationModelDisplayName(model, isCustom) {
	if (isCustom) {
		const rawId = stripAutomationCustomLocalPrefix(model.id);
		const labelId = MODEL_LABEL_MAP[rawId] || rawId;
		if (!model.name || model.name === labelId) return labelId;
		return `${model.name}:${labelId}`;
	}
	return (model.name || model.id).replace(/\s*\(\s*1M\s+context\s*\)/i, " (1M)");
}
/**
* 对历史 Auto 路由做语义去重：`auto` 与 `auto-chat` 表达同一类自动路由，列表只保留一个。
*/
function dedupeAutomationAutoRouteModels(models, selectedModelId) {
	const autoModels = models.filter(isAutoRouteModel);
	if (autoModels.length <= 1) return models;
	const preferred = (selectedModelId ? autoModels.find((model) => model.id === selectedModelId) : void 0) || autoModels.find((model) => model.id === "auto") || autoModels.find((model) => model.isDefault) || autoModels.find((model) => !model.disabled) || autoModels[0];
	let inserted = false;
	return models.flatMap((model) => {
		if (!isAutoRouteModel(model)) return [model];
		if (!inserted) {
			inserted = true;
			return [preferred];
		}
		return [];
	});
}
function disambiguateDuplicateLabels(entries) {
	const labelCounts = /* @__PURE__ */ new Map();
	entries.forEach((entry) => {
		const key = entry.label.trim().toLowerCase();
		labelCounts.set(key, (labelCounts.get(key) || 0) + 1);
	});
	return entries.map((entry) => {
		const key = entry.label.trim().toLowerCase();
		if ((labelCounts.get(key) || 0) <= 1) return entry;
		const suffix = stripAutomationCustomLocalPrefix(entry.model.id);
		if (!suffix || entry.label.includes(suffix)) return entry;
		return {
			...entry,
			label: `${entry.label} (${suffix})`
		};
	});
}
function getAutomationModelGroupId(model, isCustom) {
	if (isCustom) return "custom";
	if (model.modelType === "enterprise") return "enterprise";
	return "built-in";
}
function toBaseModelOption(entry) {
	const { model, label, isCustom } = entry;
	return {
		id: model.id,
		label,
		description: model.description,
		icon: model.iconUrl ? {
			url: model.iconUrl,
			alt: label
		} : getModelIcon(label, void 0, void 0, model.id),
		credits: model.credits,
		isDefault: model.isDefault,
		configurable: model.configurable,
		configured: model.configured,
		supportsImages: model.supportsImages,
		supportsReasoning: model.supportsReasoning,
		groupId: getAutomationModelGroupId(model, isCustom),
		disabled: model.disabled || model.configurable && !model.configured,
		disabledReason: model.disabledReason,
		disabledAction: model.disabledAction,
		isThinking: false
	};
}
/**
* 将后端模型列表转换为自动化面板可展示选项，并防御 Auto 路由重复和同名模型误导。
*/
function toAutomationModelOptions(models, options = {}) {
	return disambiguateDuplicateLabels(dedupeAutomationAutoRouteModels(models, options.selectedModelId).map((model) => {
		const isCustom = isAutomationCustomModel(model);
		return {
			model,
			isCustom,
			label: getAutomationModelDisplayName(model, isCustom)
		};
	})).flatMap((entry) => {
		const baseOption = toBaseModelOption(entry);
		const model = entry.model;
		if (!model.supportsReasoning) return [baseOption];
		if (model.onlyReasoning) return [{
			...baseOption,
			isThinking: true
		}];
		return [baseOption, {
			...baseOption,
			isThinking: true
		}];
	});
}
var CUSTOM_LOCAL_PREFIX, AUTO_ROUTE_MODEL_IDS, MODEL_LABEL_MAP;
var init_automation_model_options = __esmMin((() => {
	init_icons();
	CUSTOM_LOCAL_PREFIX = "custom-local:";
	AUTO_ROUTE_MODEL_IDS = new Set(["auto", "auto-chat"]);
	MODEL_LABEL_MAP = {
		"deepseek-reasoner": "deepseek-r1",
		"deepseek-chat": "deepseek-v3"
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-permission-confirm-dialog.less
var init_automation_permission_confirm_dialog$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-permission-confirm-dialog.tsx
var import_react$8, import_jsx_runtime$7, WarningIcon, AutomationPermissionConfirmDialog;
var init_automation_permission_confirm_dialog = __esmMin((() => {
	init_automation_permission_confirm_dialog$1();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	import_jsx_runtime$7 = require_jsx_runtime();
	WarningIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "12",
				y1: "9",
				x2: "12",
				y2: "13"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "12",
				y1: "17",
				x2: "12.01",
				y2: "17"
			})
		]
	});
	AutomationPermissionConfirmDialog = ({ open, onConfirm, onCancel, onFallbackToDefault }) => {
		const t = useTranslation();
		const [acknowledged, setAcknowledged] = (0, import_react$8.useState)(false);
		const handleAcknowledgeChange = (0, import_react$8.useCallback)((event) => {
			setAcknowledged(event.currentTarget.checked);
		}, []);
		const handleConfirm = (0, import_react$8.useCallback)(() => {
			if (!acknowledged) return;
			onConfirm();
			setAcknowledged(false);
		}, [acknowledged, onConfirm]);
		const handleCancel = (0, import_react$8.useCallback)(() => {
			onCancel();
			setAcknowledged(false);
		}, [onCancel]);
		const handleFallback = (0, import_react$8.useCallback)(() => {
			onFallbackToDefault?.();
			setAcknowledged(false);
		}, [onFallbackToDefault]);
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(Modal, {
			open,
			onOpenChange: (nextOpen) => {
				if (!nextOpen) handleCancel();
			},
			className: "automation-permission-confirm__dialog",
			width: 440,
			centered: true,
			closable: false,
			footer: null,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "automation-permission-confirm__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
						className: "automation-permission-confirm__icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WarningIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h3", {
						className: "automation-permission-confirm__title",
						children: t("automation.permission.confirmTitle")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", {
					className: "automation-permission-confirm__desc",
					children: t("automation.permission.confirmDesc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("ul", {
					className: "automation-permission-confirm__list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", { children: t("automation.permission.confirmItem1") }),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", { children: t("automation.permission.confirmItem2") }),
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", { children: t("automation.permission.confirmItem3") })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Checkbox, {
					className: "automation-permission-confirm__checkbox",
					checked: acknowledged,
					onChange: handleAcknowledgeChange,
					label: t("automation.permission.confirmCheckbox")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "automation-permission-confirm__actions",
					children: [onFallbackToDefault && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "small",
						className: "automation-permission-confirm__fallback-link",
						onClick: handleFallback,
						children: t("automation.permission.confirmFallback")
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
						className: "automation-permission-confirm__actions-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: handleCancel,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Button, {
							type: "button",
							variant: "primary",
							danger: true,
							disabled: !acknowledged,
							onClick: handleConfirm,
							children: t("automation.permission.confirmButton")
						})]
					})]
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-permission-picker.less
var init_automation_permission_picker$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-permission-picker.tsx
var import_react$7, import_jsx_runtime$6, AutomationPermissionPicker;
var init_automation_permission_picker = __esmMin((() => {
	init_automation_permission_picker$1();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	import_jsx_runtime$6 = require_jsx_runtime();
	AutomationPermissionPicker = ({ value, onChange, disabled = false }) => {
		const t = useTranslation();
		const items = (0, import_react$7.useMemo)(() => [{
			key: "fullAccess",
			label: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: "automation-permission-picker__item",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						className: "automation-permission-picker__check-col",
						children: value === "fullAccess" && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CheckIcon, { size: "md" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						className: "automation-permission-picker__icon-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(WarningOutlineIcon, { size: "md" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "automation-permission-picker__option",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
							className: "automation-permission-picker__option-title",
							children: [t("automation.permission.fullAccess"), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
								className: "automation-permission-picker__option-recommend",
								children: t("automation.permission.fullAccessRecommend")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "automation-permission-picker__option-desc",
							children: t("automation.permission.fullAccessDesc")
						})]
					})
				]
			}),
			selected: value === "fullAccess"
		}, {
			key: "default",
			label: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: "automation-permission-picker__item",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						className: "automation-permission-picker__check-col",
						children: value === "default" && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CheckIcon, { size: "md" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
						className: "automation-permission-picker__icon-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ShieldCheckIcon, { size: "md" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "automation-permission-picker__option",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "automation-permission-picker__option-title",
							children: t("automation.permission.default")
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "automation-permission-picker__option-desc",
							children: t("automation.permission.defaultDesc")
						})]
					})
				]
			}),
			selected: value === "default",
			divider: true
		}], [t, value]);
		const handleSelect = (0, import_react$7.useCallback)((key) => {
			if (key === "fullAccess" || key === "default") onChange(key);
		}, [onChange]);
		const isFullAccess = value === "fullAccess";
		const chipLabel = isFullAccess ? t("automation.permission.fullAccess") : t("automation.permission.default");
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "automation-permission-picker",
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Dropdown$1, {
				items,
				placement: "bottom-start",
				onSelect: handleSelect,
				disabled,
				className: "automation-permission-picker__dropdown",
				trigger: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					className: `automation-permission-picker__trigger ${isFullAccess ? "automation-permission-picker__trigger--warning" : "automation-permission-picker__trigger--safe"}`,
					disabled,
					children: [
						isFullAccess ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(WarningOutlineIcon, { size: "sm" }) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ShieldCheckIcon, { size: "sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "automation-permission-picker__label",
							children: chipLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "automation-permission-picker__caret",
							children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ChevronsUpDownIcon, { size: "sm" })
						})
					]
				})
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/automation-task-utils.ts
/**
* 将任务定义列表按执行态优先投影为任务页分组，避免运行中的 ACTIVE 任务继续混在“当前”组里。
*/
function splitAutomationTasks(automations, runtimeState) {
	const groups = {
		running: [],
		current: [],
		paused: []
	};
	for (const automation of automations) {
		if (runtimeState[automation.id]?.running) {
			groups.running.push(automation);
			continue;
		}
		if (automation.status === "ACTIVE") {
			groups.current.push(automation);
			continue;
		}
		if (automation.status === "PAUSED") groups.paused.push(automation);
	}
	return groups;
}
/**
* 任务页各分组共用的名称搜索过滤，保持运行中、当前、暂停三组过滤语义一致。
*/
function filterAutomationTasksByQuery(automations, searchQuery) {
	if (!searchQuery) return automations;
	const query = searchQuery.toLowerCase();
	return automations.filter((automation) => automation.name.toLowerCase().includes(query));
}
/**
* 运行中行的右侧文案；有进度时展示“执行中 done/total”，否则退化为“运行中”。
*/
function getAutomationRunningStatusLabel(runtimeState, t) {
	if (!runtimeState?.running) return;
	const { progressDone, progressTotal } = runtimeState;
	if (Number.isFinite(progressDone) && Number.isFinite(progressTotal) && typeof progressTotal === "number" && progressTotal > 0) return t("automation.row.inProgressWithProgress", {
		done: typeof progressDone === "number" ? Math.max(0, Math.min(progressDone, progressTotal)) : 0,
		total: progressTotal
	});
	return t("automation.row.inProgress");
}
var init_automation_task_utils = __esmMin((() => {})), import_jsx_runtime$5, AutomationTemplateGrid;
var init_automation_template_grid = __esmMin((() => {
	require_react();
	init_foundation();
	import_jsx_runtime$5 = require_jsx_runtime();
	AutomationTemplateGrid = ({ sectionTitle, templates, getText, onSelectTemplate, variant = "list", getScheduleSummary, addButtonLabel, AddButtonIcon }) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: `atm-template-section atm-template-section--${variant}`,
		children: [sectionTitle ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "atm-section-title",
			children: sectionTitle
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: `atm-template-list atm-template-list--${variant}`,
			children: templates.map((template) => {
				const title = getText(template.titleKey);
				const content = getText(template.contentKey);
				if (variant === "card") {
					const scheduleSummary = getScheduleSummary?.(template) ?? "";
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(Card, {
						hoverable: true,
						padding: "none",
						className: "atm-template-card atm-template-card--card",
						"data-track-id": "automation_add_from_template",
						"data-track-name": "模板添加自动化",
						"data-track-props": JSON.stringify({
							source: template.id,
							type: "template"
						}),
						onClick: () => onSelectTemplate(template),
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
							className: "atm-template-card-main",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
								className: "atm-template-card-header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tooltip, {
									content: title,
									placement: "top",
									maxWidth: 280,
									children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
										className: "atm-template-card-title",
										children: title
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
									className: "atm-template-card-add",
									"aria-hidden": true,
									children: [AddButtonIcon ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(AddButtonIcon, { className: "atm-template-card-add-icon" }) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
										className: "atm-template-card-add-plus",
										children: "+"
									}), addButtonLabel ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: addButtonLabel }) : null]
								})]
							}), scheduleSummary ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
								className: "atm-template-card-schedule",
								children: scheduleSummary
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tooltip, {
							content,
							placement: "bottom",
							maxWidth: 280,
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
								className: "atm-template-card-desc",
								children: content
							})
						})]
					}, template.id);
				}
				if (variant === "compact") return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(Card, {
					hoverable: true,
					padding: "none",
					className: "atm-template-card atm-template-card--compact",
					"data-track-id": "automation_add_from_template",
					"data-track-name": "模板添加自动化",
					"data-track-props": JSON.stringify({
						source: template.id,
						type: "template"
					}),
					onClick: () => onSelectTemplate(template),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "atm-template-compact-avatar",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(template.Icon, { className: "atm-template-compact-icon" })
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
						className: "atm-template-compact-texts",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tooltip, {
							content: title,
							placement: "top",
							maxWidth: 280,
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "atm-template-compact-title",
								children: title
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Tooltip, {
							content,
							placement: "bottom",
							maxWidth: 280,
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "atm-template-compact-desc",
								children: content
							})
						})]
					})]
				}, template.id);
				return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(Card, {
					hoverable: true,
					padding: "none",
					className: "atm-template-card",
					"data-track-id": "automation_add_from_template",
					"data-track-name": "模板添加自动化",
					"data-track-props": JSON.stringify({
						source: template.id,
						type: "template"
					}),
					onClick: () => onSelectTemplate(template),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "atm-template-icon-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(template.Icon, { className: "atm-template-icon" })
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
						className: "atm-template-texts",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
							className: "atm-template-name",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
							className: "atm-template-content",
							children: content
						})]
					})]
				}, template.id);
			})
		})]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/connector-selector.less
var init_connector_selector$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/connector-selector.tsx
var import_react$5, import_jsx_runtime$4, ConnectorSelector;
var init_connector_selector = __esmMin((() => {
	init_connector_selector$1();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	import_jsx_runtime$4 = require_jsx_runtime();
	ConnectorSelector = ({ options, selectedIds, onChange, onManageConnectors, disabled = false }) => {
		const t = useTranslation();
		const [isOpen, setIsOpen] = (0, import_react$5.useState)(false);
		const containerRef = (0, import_react$5.useRef)(null);
		(0, import_react$5.useEffect)(() => {
			if (!isOpen) return;
			const handleClickOutside = (e) => {
				if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, [isOpen]);
		const optionIdSet = (0, import_react$5.useMemo)(() => new Set(options.map((o) => o.id)), [options]);
		const validSelectedIds = (0, import_react$5.useMemo)(() => selectedIds.filter((id) => optionIdSet.has(id)), [selectedIds, optionIdSet]);
		(0, import_react$5.useEffect)(() => {
			if (validSelectedIds.length < selectedIds.length) onChange(validSelectedIds);
		}, [
			selectedIds,
			validSelectedIds,
			onChange
		]);
		if (options.length === 0) return null;
		const handleToggle = (0, import_react$5.useCallback)((id) => {
			onChange(validSelectedIds.includes(id) ? validSelectedIds.filter((cid) => cid !== id) : [...validSelectedIds, id]);
		}, [validSelectedIds, onChange]);
		const handleTriggerClick = () => {
			if (!disabled) setIsOpen((prev) => !prev);
		};
		const triggerText = validSelectedIds.length > 0 ? options.filter((o) => validSelectedIds.includes(o.id)).map((o) => o.name).join(", ") : t("automation.modal.connectorPlaceholder");
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "connector-selector-field",
			ref: containerRef,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("label", {
					className: "atm-modal-label",
					children: [t("automation.modal.connectors"), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
						className: "atm-modal-hint atm-modal-hint-inline",
						children: [
							"(",
							t("automation.modal.connectorHint"),
							")"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					className: `connector-selector-field__trigger ${isOpen ? "connector-selector-field__trigger--open" : ""} ${disabled ? "connector-selector-field__trigger--disabled" : ""}`,
					onClick: handleTriggerClick,
					disabled,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: `connector-selector-field__trigger-text ${validSelectedIds.length === 0 ? "connector-selector-field__trigger-text--placeholder" : ""}`,
						children: triggerText
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: `connector-selector-field__arrow ${isOpen ? "connector-selector-field__arrow--open" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 12 12",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
								d: "M3 4.5L6 7.5L9 4.5",
								stroke: "currentColor",
								strokeWidth: "1.2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})]
				}),
				isOpen && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "connector-selector-field__dropdown",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "connector-selector-field__list",
						children: options.filter((c) => c.connected).length > 0 ? options.filter((c) => c.connected).map((connector) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "connector-selector-field__item",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Checkbox, {
								className: "connector-selector-field__checkbox",
								checked: validSelectedIds.includes(connector.id),
								onChange: () => handleToggle(connector.id),
								label: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "connector-selector-field__item-name",
									children: connector.name
								})
							})
						}, connector.id)) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "connector-selector-field__empty",
							children: t("automation.modal.connectorNoConnected")
						})
					}), onManageConnectors && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
						className: "connector-selector-field__manage",
						onClick: () => {
							setIsOpen(false);
							onManageConnectors();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 14 14",
							fill: "none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
									d: "M11 8.5V11.5C11 12.052 10.552 12.5 10 12.5H2.5C1.948 12.5 1.5 12.052 1.5 11.5V4C1.5 3.448 1.948 3 2.5 3H5.5",
									stroke: "currentColor",
									strokeWidth: "1.1",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
									d: "M8.5 1.5H12.5V5.5",
									stroke: "currentColor",
									strokeWidth: "1.1",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
									d: "M6 8L12.5 1.5",
									stroke: "currentColor",
									strokeWidth: "1.1",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: t("automation.modal.manageConnectors") })]
					})]
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/expert-selector.less
var init_expert_selector$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/expert-match-utils.ts
/**
* Resolves a selectedId to an ExpertOption by searching through official options
* and recent experts with exact, name, and fuzzy matching strategies.
*
* Matching priority:
*   1. Exact id match in official options
*   2. Name match in official options (case-insensitive)
*   3. Exact id match in recent experts
*   4. Name/profession exact match in recent experts (case-insensitive)
*   5. Fuzzy token match in recent experts
*   6. Fuzzy name match in official options (substring containment)
*   7. Fallback: returns an option using the raw selectedId as both id and name
*/
function resolveSelectedExpert(selectedId, options, recentExperts) {
	if (!selectedId) return;
	const fromOptions = options.find((e) => e.id === selectedId);
	if (fromOptions) return fromOptions;
	const selectedLCForOptions = selectedId.toLowerCase();
	const nameMatchOption = options.find((e) => e.name.toLowerCase() === selectedLCForOptions);
	if (nameMatchOption) return nameMatchOption;
	if (recentExperts) {
		const fromRecent = matchInRecentExperts(selectedId, recentExperts);
		if (fromRecent) return {
			id: fromRecent.id,
			name: fromRecent.profession || fromRecent.name,
			identityName: "",
			avatar: fromRecent.avatarUrl || ""
		};
	}
	const fuzzyOption = options.find((e) => {
		return e.name.toLowerCase().includes(selectedId.toLowerCase()) || selectedId.toLowerCase().includes(e.name.toLowerCase());
	});
	if (fuzzyOption) return fuzzyOption;
	return {
		id: selectedId,
		name: selectedId,
		avatar: ""
	};
}
/**
* Matches a selectedId against recent experts using exact, name/profession,
* and fuzzy token matching.
*/
function matchInRecentExperts(selectedId, recentExperts) {
	const exactMatch = recentExperts.find((e) => e.id === selectedId);
	if (exactMatch) return exactMatch;
	const selectedLC = selectedId.toLowerCase();
	const nameMatch = recentExperts.find((e) => e.name.toLowerCase() === selectedLC || (e.profession || "").toLowerCase() === selectedLC);
	if (nameMatch) return nameMatch;
	const idTokens = selectedId.toLowerCase().split(/[-_\s]+/).filter((t) => t.length > 2);
	if (idTokens.length === 0) return;
	let bestMatch;
	let bestScore = 0;
	let bestMatchCount = 0;
	for (const expert of recentExperts) {
		const nameLC = expert.name.toLowerCase();
		const profLC = (expert.profession || "").toLowerCase();
		const nameParts = expert.name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().split(/\s+/);
		let matchCount = 0;
		for (const token of idTokens) if (nameLC.includes(token) || profLC.includes(token) || nameParts.some((p) => p.includes(token) || token.includes(p))) matchCount++;
		const score = matchCount / idTokens.length;
		if (score > bestScore && matchCount >= 1) {
			bestScore = score;
			bestMatch = expert;
			bestMatchCount = matchCount;
		}
	}
	const minMatchCount = idTokens.length === 1 ? 1 : 2;
	if (bestMatch && bestScore >= FUZZY_MIN_SCORE && bestMatchCount >= minMatchCount) return bestMatch;
}
var FUZZY_MIN_SCORE;
var init_expert_match_utils = __esmMin((() => {
	FUZZY_MIN_SCORE = .6;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/expert-selector.tsx
var import_react$4, import_jsx_runtime$3, SummonExpertIcon, ArrowDownIcon, ExpertSelector;
var init_expert_selector = __esmMin((() => {
	init_expert_selector$1();
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_floating();
	init_useI18n();
	init_expert();
	init_expert_match_utils();
	import_jsx_runtime$3 = require_jsx_runtime();
	SummonExpertIcon = ({ gradientId }) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("linearGradient", {
				id: gradientId,
				x1: "0%",
				y1: "0%",
				x2: "100%",
				y2: "100%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("stop", {
					offset: "0%",
					stopColor: "#6366f1"
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("stop", {
					offset: "100%",
					stopColor: "#8b5cf6"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
				d: "M1.5 6.2L8 2.8L14.5 6.2L8 9.6L1.5 6.2Z",
				stroke: `url(#${gradientId})`,
				strokeWidth: "1.2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
				d: "M4.2 8.1V10.2C4.2 11.3 5.9 12.2 8 12.2C10.1 12.2 11.8 11.3 11.8 10.2V8.1",
				stroke: `url(#${gradientId})`,
				strokeWidth: "1.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
				d: "M13 7V10.6",
				stroke: `url(#${gradientId})`,
				strokeWidth: "1.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
				cx: "13",
				cy: "11.6",
				r: "0.9",
				fill: `url(#${gradientId})`
			})
		]
	});
	ArrowDownIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			d: "M4 6L8 10L12 6",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	ExpertSelector = ({ options, recentExperts, selectedId, selectedName, selectedIdentityName, selectedAvatarUrl, onChange, onSummonExpert }) => {
		const t = useTranslation();
		const [isOpen, setIsOpen] = (0, import_react$4.useState)(false);
		const gradientId = `atm-summonGradient-${(0, import_react$4.useId)().replace(/:/g, "")}`;
		const { refs, floatingStyles, context } = useFloating({
			open: isOpen,
			onOpenChange: setIsOpen,
			placement: "top-start",
			middleware: [
				offset(6),
				flip(),
				shift({ padding: 8 })
			],
			whileElementsMounted: autoUpdate,
			strategy: "fixed"
		});
		const { getReferenceProps, getFloatingProps } = useInteractions([
			useClick(context),
			useDismiss(context),
			useRole(context, { role: "menu" })
		]);
		const handleClear = (0, import_react$4.useCallback)(() => {
			onChange(void 0);
			setIsOpen(false);
		}, [onChange]);
		const handleSummon = (0, import_react$4.useCallback)(() => {
			setIsOpen(false);
			onSummonExpert?.();
		}, [onSummonExpert]);
		const handleSelectRecent = (0, import_react$4.useCallback)((expertId) => {
			onChange(expertId);
			setIsOpen(false);
		}, [onChange]);
		const selectedExpert = (0, import_react$4.useMemo)(() => resolveSelectedExpert(selectedId, options, recentExperts), [
			selectedId,
			options,
			recentExperts
		]);
		const isRecentExpertSelected = (0, import_react$4.useCallback)((expert) => {
			const normalize = (value) => (value || "").trim().toLowerCase();
			const selectedValues = [
				selectedId,
				selectedExpert?.id,
				selectedExpert?.name,
				selectedExpert?.identityName,
				selectedName,
				selectedIdentityName
			].map(normalize).filter(Boolean);
			const recentValues = [
				expert.id,
				expert.name,
				expert.profession
			].map(normalize).filter(Boolean);
			return selectedValues.some((value) => recentValues.includes(value));
		}, [
			selectedExpert,
			selectedId,
			selectedIdentityName,
			selectedName
		]);
		(0, import_react$4.useEffect)(() => {
			if (selectedExpert && selectedId && selectedExpert.id !== selectedId) onChange(selectedExpert.id);
		}, [
			selectedExpert,
			selectedId,
			onChange
		]);
		const { finalAvatarUrl, onAvatarError } = useExpertAvatar((0, import_react$4.useMemo)(() => selectedAvatarUrl || resolveAvatarUrl(selectedExpert?.avatar || ""), [selectedAvatarUrl, selectedExpert?.avatar]));
		const hasRecentExperts = recentExperts && recentExperts.length > 0;
		if (options.length === 0 && !onSummonExpert && !hasRecentExperts) return null;
		/**
		* Render expert avatar (image with fallback)
		*/
		const renderAvatar = (expert, size = "medium") => {
			const sizeClass = size === "small" ? "expert-selector__avatar--small" : "expert-selector__avatar--medium";
			const isSelected = expert.id === selectedExpert?.id;
			const avatarUrl = isSelected ? finalAvatarUrl : resolveAvatarUrl(expert.avatar || "");
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Avatar, {
				className: `expert-selector__avatar ${sizeClass}`,
				size: size === "small" ? 18 : 24,
				src: avatarUrl,
				alt: expert.name,
				onError: isSelected ? onAvatarError : void 0,
				children: getExpertInitial(expert.name)
			});
		};
		/**
		* Render recent expert avatar (handles avatarUrl or gradient fallback)
		*/
		const renderRecentAvatar = (expert) => {
			const gradient = getExpertGradient(expert.id);
			const initial = getExpertInitial(expert.name);
			const avatarUrl = resolveAvatarUrl(expert.avatarUrl || "");
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Avatar, {
				className: "expert-selector__avatar expert-selector__avatar--small",
				size: 18,
				src: avatarUrl || void 0,
				alt: expert.name,
				style: { background: avatarUrl ? void 0 : `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)` },
				children: initial
			});
		};
		if (!selectedExpert && hasRecentExperts) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "expert-selector",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(Button, {
				ref: refs.setReference,
				type: "button",
				variant: "ghost",
				size: "small",
				className: "expert-selector__btn",
				...getReferenceProps(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SummonExpertIcon, { gradientId }),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "expert-selector__label",
						children: t("automation.modal.summonExpert")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ArrowDownIcon, {})
				]
			}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FloatingPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				ref: refs.setFloating,
				className: "atm-floating-layer expert-selector__dropdown",
				style: floatingStyles,
				...getFloatingProps(),
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "expert-selector__list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "expert-selector__section-title",
							children: t("automation.modal.recentExperts")
						}),
						recentExperts.map((expert) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: `expert-selector__item ${isRecentExpertSelected(expert) ? "expert-selector__item--selected" : ""}`,
							onClick: () => handleSelectRecent(expert.id),
							children: [renderRecentAvatar(expert), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "expert-selector__item-info",
								children: [expert.profession && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
									className: "expert-selector__item-profession",
									children: expert.profession
								}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
									className: "expert-selector__item-name",
									children: expert.name
								})]
							})]
						}, expert.id)),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "expert-selector__divider" }),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "expert-selector__item",
							onClick: handleSummon,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SummonExpertIcon, { gradientId }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
								className: "expert-selector__item-name",
								children: t("automation.modal.summonOtherExpert")
							})]
						})
					]
				})
			}) })]
		});
		if (!selectedExpert) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "expert-selector",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				size: "small",
				className: "expert-selector__btn",
				onClick: handleSummon,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SummonExpertIcon, { gradientId }),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "expert-selector__label",
						children: t("automation.modal.summonExpert")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ArrowDownIcon, {})
				]
			})
		});
		const resolvedIdentityName = selectedIdentityName || selectedExpert.identityName;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "expert-selector",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(Button, {
				ref: refs.setReference,
				type: "button",
				variant: "ghost",
				size: "small",
				className: "expert-selector__btn expert-selector__btn--active",
				...getReferenceProps(),
				children: [
					renderAvatar(selectedExpert, "small"),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "expert-selector__label-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "expert-selector__label",
							children: selectedName || selectedExpert.name
						}), resolvedIdentityName && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "expert-selector__label-identity",
							children: resolvedIdentityName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ArrowDownIcon, {})
				]
			}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FloatingPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				ref: refs.setFloating,
				className: "atm-floating-layer expert-selector__dropdown",
				style: floatingStyles,
				...getFloatingProps(),
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "expert-selector__list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "expert-selector__item",
							onClick: handleClear,
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
								className: "expert-selector__item-name",
								children: t("automation.modal.expertNone")
							})
						}),
						hasRecentExperts && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "expert-selector__divider" }),
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "expert-selector__section-title",
								children: t("automation.modal.recentExperts")
							}),
							recentExperts.map((expert) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: `expert-selector__item ${isRecentExpertSelected(expert) ? "expert-selector__item--selected" : ""}`,
								onClick: () => handleSelectRecent(expert.id),
								children: [renderRecentAvatar(expert), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "expert-selector__item-info",
									children: [expert.profession && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
										className: "expert-selector__item-profession",
										children: expert.profession
									}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
										className: "expert-selector__item-name",
										children: expert.name
									})]
								})]
							}, expert.id))
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "expert-selector__divider" }),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "expert-selector__item",
							onClick: handleSummon,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SummonExpertIcon, { gradientId }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
								className: "expert-selector__item-name",
								children: t("automation.modal.summonOtherExpert")
							})]
						})
					]
				})
			}) })]
		});
	};
})), import_jsx_runtime$2, InboxStatusIcon;
var init_inbox_status_icon = __esmMin((() => {
	require_react();
	init_CheckBoldIcon();
	init_CheckIcon();
	init_ErrorCircleIcon();
	init_RunningStatusIcon();
	import_jsx_runtime$2 = require_jsx_runtime();
	InboxStatusIcon = ({ statusClass }) => {
		if (statusClass === "running") return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
			className: "atm-status-icon-spinning",
			style: { display: "inline-flex" },
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RunningStatusIcon, {
				size: 16,
				color: "#00C29A"
			})
		});
		if (statusClass === "success") return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CheckBoldIcon, {
			size: 16,
			color: "var(--wb-color-text-disabled, #000)"
		});
		if (statusClass === "failed") return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ErrorCircleIcon, { size: 16 });
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CheckIcon, {
			size: 16,
			color: "var(--atm-result-neutral-text)"
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/resolve-effective-cwd.ts
/**
* Resolve the effective cwd for opening an inbox item conversation.
*
* issue #62334: When the automation's current workspace (fallbackCwd) is a Claw
* path, we prefer it for routing to avoid the historical run's `automation-claw-*`
* cwd (which points to the old Claw agent view) from incorrectly taking priority.
*
* @param cwd - The cwd stored in the inbox item's run record (may be old format)
* @param fallbackCwd - The automation's current first cwd (from definition.cwds[0])
* @returns The effective cwd to use for conversation routing
*/
function resolveEffectiveCwd(cwd, fallbackCwd) {
	if (isClawWorkspacePath(fallbackCwd)) return fallbackCwd || cwd;
	return cwd || fallbackCwd;
}
var init_resolve_effective_cwd = __esmMin((() => {
	init_file_path();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/schedule-validation.ts
function buildIsoFromDateTimeInput(dateValue, timeValue, defaultTimeValue = DEFAULT_ONCE_TIME) {
	if (!dateValue) return;
	const candidate = /* @__PURE__ */ new Date(`${dateValue}T${timeValue || defaultTimeValue}:00`);
	return Number.isNaN(candidate.getTime()) ? void 0 : candidate.toISOString();
}
function isFutureDateTimeInput(dateValue, timeValue, nowMs = Date.now(), defaultTimeValue = DEFAULT_ONCE_TIME) {
	const scheduledAt = buildIsoFromDateTimeInput(dateValue, timeValue, defaultTimeValue);
	if (!scheduledAt) return false;
	const scheduledAtMs = Date.parse(scheduledAt);
	return Number.isFinite(scheduledAtMs) && scheduledAtMs > nowMs;
}
function shouldValidateFutureOneTimeSchedule(options) {
	if (options.isCreating) return true;
	if (options.existingScheduleType !== "once") return true;
	return options.nextScheduledAt !== options.existingScheduledAt;
}
var DEFAULT_ONCE_TIME;
var init_schedule_validation = __esmMin((() => {
	DEFAULT_ONCE_TIME = "09:00";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/template-config.ts
var FULL_WEEK, AUTOMATION_TEMPLATE_CONFIGS;
var init_template_config = __esmMin((() => {
	FULL_WEEK = [
		"MO",
		"TU",
		"WE",
		"TH",
		"FR",
		"SA",
		"SU"
	];
	AUTOMATION_TEMPLATE_CONFIGS = [
		{
			id: "daily-ai-news",
			titleKey: "automation.templates.dailyAiNews.title",
			contentKey: "automation.templates.dailyAiNews.content",
			prompt: "关注当天 AI 领域的重要动态，侧重 AI coding 与具身智能方向。筛选 3-5 条有价值的信息，简要说明事件内容及值得关注的原因。",
			promptKey: "automation.templates.dailyAiNews.prompt",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 9,
				byminute: 0,
				intervalHours: 1
			},
			iconKey: "news"
		},
		{
			id: "daily-english-words",
			titleKey: "automation.templates.dailyWords.title",
			contentKey: "automation.templates.dailyWords.content",
			prompt: "每天推荐 5 个实用英语单词，优先选取生活和职场中常见词汇。输出词义、音标、例句，以及一条便于记忆的小提示。",
			promptKey: "automation.templates.dailyWords.prompt",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 8,
				byminute: 30,
				intervalHours: 1
			},
			iconKey: "languages"
		},
		{
			id: "daily-bedtime-story",
			titleKey: "automation.templates.bedtimeStory.title",
			contentKey: "automation.templates.bedtimeStory.content",
			prompt: "写一个适合儿童的睡前故事，语言温和易懂，阅读时长约 3-5 分钟。故事需有完整情节，结尾附上简短寓意。",
			promptKey: "automation.templates.bedtimeStory.prompt",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 20,
				byminute: 30,
				intervalHours: 1
			},
			iconKey: "moon"
		},
		{
			id: "weekly-work-report",
			titleKey: "automation.templates.weeklyReport.title",
			contentKey: "automation.templates.weeklyReport.content",
			prompt: "梳理本周仓库中的 PR 与 Issue 情况，包括新增、已关闭及重点讨论。输出一份周报，涵盖主要进展、关键变更和待关注事项。",
			promptKey: "automation.templates.weeklyReport.prompt",
			schedule: {
				freq: "WEEKLY",
				byday: ["FR"],
				byhour: 17,
				byminute: 0,
				intervalHours: 1
			},
			iconKey: "weekly-report"
		},
		{
			id: "classic-movie-recommendation",
			titleKey: "automation.templates.classicMovie.title",
			contentKey: "automation.templates.classicMovie.content",
			prompt: "给我推荐一部公认的经典电影（评分高、口碑好），简要介绍剧情梗概、亮点所在，以及它为什么值得一看，但是不要剧透。",
			promptKey: "automation.templates.classicMovie.prompt",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 20,
				byminute: 0,
				intervalHours: 1
			},
			iconKey: "film"
		},
		{
			id: "history-today",
			titleKey: "automation.templates.historyToday.title",
			contentKey: "automation.templates.historyToday.content",
			prompt: "历史上的今天发生过什么有趣的事？从科技、电影、音乐等领域中挑一个，讲讲它的来龙去脉吧。控制在 200-300 字左右。",
			promptKey: "automation.templates.historyToday.prompt",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 9,
				byminute: 30,
				intervalHours: 1
			},
			iconKey: "calendar"
		},
		{
			id: "daily-why",
			titleKey: "automation.templates.dailyWhy.title",
			contentKey: "automation.templates.dailyWhy.content",
			prompt: "随机挑选一个有趣的冷知识或生活百科问题，并给出详细、有趣、通俗易懂的解答。每次问题尽量不重复，覆盖科学、生活、历史、自然、食物、文化、动物、人体等多个领域；先抛出问题再揭晓答案；语气轻松有趣；答案控制在 200-300 字。",
			promptKey: "automation.templates.dailyWhy.prompt",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 18,
				byminute: 30,
				intervalHours: 1
			},
			iconKey: "lightbulb"
		},
		{
			id: "parent-contact-reminder",
			titleKey: "automation.templates.parentContactReminder.title",
			contentKey: "automation.templates.parentContactReminder.content",
			prompt: "每周日十点提醒我给家人打电话或发消息，简单问候近况。",
			promptKey: "automation.templates.parentContactReminder.prompt",
			scheduleType: "recurring",
			schedule: {
				freq: "WEEKLY",
				byday: ["SU"],
				byhour: 10,
				byminute: 0,
				intervalHours: 1
			},
			validFromDate: "2026-03-18",
			validUntilDate: "2026-06-30",
			iconKey: "alarm-clock"
		},
		{
			id: "health-checkup-appointment-reminder",
			titleKey: "automation.templates.healthCheckupReminder.title",
			contentKey: "automation.templates.healthCheckupReminder.content",
			prompt: "4月8号七点提醒我确认体检时间、准备证件，提前空腹并留意注意事项。",
			promptKey: "automation.templates.healthCheckupReminder.prompt",
			scheduleType: "once",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 7,
				byminute: 0,
				intervalHours: 1
			},
			scheduledDate: "2026-04-08",
			scheduledTime: "07:00",
			iconKey: "hospital"
		},
		{
			id: "interview-preparation-reminder",
			titleKey: "automation.templates.interviewPreparationReminder.title",
			contentKey: "automation.templates.interviewPreparationReminder.content",
			prompt: "每两小时提醒我复习关于大模型的项目亮点、技术难点、常见问答，并生成 3 个模拟面试问题。",
			promptKey: "automation.templates.interviewPreparationReminder.prompt",
			scheduleType: "recurring",
			schedule: {
				freq: "HOURLY",
				byday: [
					"MO",
					"TU",
					"WE",
					"TH",
					"FR"
				],
				byhour: 9,
				byminute: 0,
				intervalHours: 2
			},
			validFromDate: "2026-03-18",
			validUntilDate: "2026-04-30",
			iconKey: "messages-square"
		},
		{
			id: "pre-meeting-preparation",
			titleKey: "automation.templates.preMeetingPreparation.title",
			contentKey: "automation.templates.preMeetingPreparation.content",
			prompt: "在会议开始前，提醒我整理议题、目标、需要确认的问题，以及要同步的关键结论。",
			promptKey: "automation.templates.preMeetingPreparation.prompt",
			scheduleType: "once",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 14,
				byminute: 30,
				intervalHours: 1
			},
			scheduledDate: "2026-03-22",
			scheduledTime: "14:30",
			iconKey: "list-todo"
		},
		{
			id: "cute-pet-phone-wallpaper",
			titleKey: "automation.templates.cutePetWallpaper.title",
			contentKey: "automation.templates.cutePetWallpaper.content",
			prompt: [
				"帮我生成一张手机壁纸，以下主题随机选一个就可以。",
				"主体：可爱萌宠。格式要求：手机壁纸、高清分辨率，size:576x1024，9:16 竖版比例。",
				"主题 1：毛绒绒云朵主题，精美边框，创意排版，漫画浪漫主义，复杂华丽，漂浮云朵元素，薄荷绿与天空蓝主色调，温柔可爱。",
				"主题 2：模糊感与笔触感结合的极简精致插画，深邃宝石蓝背景，超现实主义美学，层次丰富，光影与反射形成视觉张力，同时保持和谐高级感。",
				"主题 3：武政谅风格卡通手机壁纸，丝网印刷艺术风格，细腻颗粒肌理，柔和胶版印刷质感，极简纯扁平插画，主体为猫咪，高饱和多巴胺色系。",
				"主题 4：虚拟电子风格，体素块构成，乱码与数字故障纹理，轻微失真星环，全息炫彩半透明水晶质感，随机色彩断层与扫描线，高饱和克莱因蓝背景，蜜桃粉点缀。",
				"主题 5：精致绘本插画风格，线条简洁流畅，高级米色单色调与大面积留白，略仰视角，淡雅水彩渲染，精致可爱且有童趣。",
				"主题 6：复古主义风格，花卉布局错落有致，极繁细致，以自然柔和色系为主，线条勾勒清晰，高饱和色彩呈现华丽质感。",
				"主题 7：随手乱画的极简风，幼稚滑稽，潦草手绘，形象失真，稚拙可爱，同时带一点梦境、故事感与治愈氛围。",
				"请只选择其中一个主题来创作，不要混用多个主题。"
			].join("\n"),
			promptKey: "automation.templates.cutePetWallpaper.prompt",
			schedule: {
				freq: "DAILY",
				byday: FULL_WEEK.slice(),
				byhour: 21,
				byminute: 0,
				intervalHours: 1
			},
			iconKey: "image"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/use-permission-confirm.ts
function usePermissionConfirm({ currentMode, initialMode, onConfirmedSubmit, onFallbackToDefault }) {
	const [showConfirmDialog, setShowConfirmDialog] = (0, import_react$2.useState)(false);
	const pendingActionRef = (0, import_react$2.useRef)(null);
	const needsConfirmation = currentMode === "fullAccess" && (!initialMode || initialMode === "default");
	const requestAction = (0, import_react$2.useCallback)((action) => {
		if (needsConfirmation) {
			pendingActionRef.current = action;
			setShowConfirmDialog(true);
		} else action();
	}, [needsConfirmation]);
	return {
		showConfirmDialog,
		requestSubmit: (0, import_react$2.useCallback)(() => {
			requestAction(onConfirmedSubmit);
		}, [requestAction, onConfirmedSubmit]),
		requestAction,
		handleConfirm: (0, import_react$2.useCallback)(() => {
			setShowConfirmDialog(false);
			const action = pendingActionRef.current;
			pendingActionRef.current = null;
			if (action) action();
		}, []),
		handleCancel: (0, import_react$2.useCallback)(() => {
			setShowConfirmDialog(false);
			pendingActionRef.current = null;
		}, []),
		handleFallbackToDefault: (0, import_react$2.useCallback)(() => {
			setShowConfirmDialog(false);
			pendingActionRef.current = null;
			onFallbackToDefault?.();
		}, [onFallbackToDefault])
	};
}
var import_react$2;
var init_use_permission_confirm = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/automation-panel/index.tsx
function getCalendarWeekdays(sundayStart) {
	return sundayStart ? ALL_DAYS_SUNDAY_START : ALL_DAYS_MONDAY_START;
}
function getFirstWeekdayOffset(firstDayOfMonth, sundayStart) {
	if (sundayStart) return firstDayOfMonth.getDay();
	return (firstDayOfMonth.getDay() + 6) % 7;
}
function getDayLabel(day, t) {
	return t(`automation.day.${day}`);
}
function sortWeekdays(days) {
	return [...new Set(days.filter((day) => ALL_DAYS.includes(day)))].sort((left, right) => ALL_DAYS.indexOf(left) - ALL_DAYS.indexOf(right));
}
function sortMonthDays(days) {
	return [...new Set(days)].filter((day) => day >= 1 && day <= 31).sort((left, right) => left - right);
}
function sortMonths(months) {
	return [...new Set(months)].filter((month) => month >= 1 && month <= 12).sort((left, right) => left - right);
}
function getYearlyMaxDay(month) {
	if (month === 2) return 29;
	if ([
		4,
		6,
		9,
		11
	].includes(month)) return 30;
	return 31;
}
function inferPeriodicMode(schedule) {
	if (schedule.freq === "YEARLY") return "year";
	if (schedule.freq === "MONTHLY") return "month";
	if (schedule.freq === "WEEKLY") return schedule.interval === 2 ? "biweek" : "week";
	return "day";
}
function createSkillPhraseBlock(skillName) {
	return createPhraseBlock(skillName, `skill://${skillName}`, {
		title: `Use skill ${skillName}.`,
		meta: {
			type: "skill",
			mentionType: "skill",
			displayText: skillName
		},
		icon: "skill"
	});
}
function buildPromptBlocks(prompt, skills) {
	const blocks = [];
	const seen = /* @__PURE__ */ new Set();
	for (const rawSkill of skills || []) {
		const skillName = `${rawSkill || ""}`.trim();
		if (!skillName || seen.has(skillName)) continue;
		seen.add(skillName);
		blocks.push(createSkillPhraseBlock(skillName));
	}
	if (prompt) blocks.push({
		type: "text",
		text: prompt
	});
	return blocks;
}
function extractPromptFromBlocks(blocks) {
	return (blocks || []).map((block) => {
		if (block.type !== "text") return "";
		return block.text || "";
	}).join("");
}
function extractSkillsFromBlocks(blocks) {
	const result = [];
	const seen = /* @__PURE__ */ new Set();
	for (const block of blocks || []) {
		if (block.type !== "resource_link") continue;
		const uri = block.uri;
		if (!uri || !uri.startsWith("skill://")) continue;
		const skillName = decodeURIComponent(uri.slice(8)).trim();
		if (!skillName || seen.has(skillName)) continue;
		seen.add(skillName);
		result.push(skillName);
	}
	return result;
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
	const byday = sortWeekdays((map.get("BYDAY") || "").split(",").map((d) => d.trim()));
	const bymonthday = sortMonthDays((map.get("BYMONTHDAY") || "").split(",").map((part) => Number.parseInt(part.trim(), 10)).filter(Number.isFinite));
	const bymonth = sortMonths((map.get("BYMONTH") || "").split(",").map((part) => Number.parseInt(part.trim(), 10)).filter(Number.isFinite));
	if (rawFreq === "HOURLY") return {
		freq: "HOURLY",
		interval: parsedInterval,
		intervalHours: parsedInterval,
		byday: byday.length > 0 ? byday : ALL_DAYS.slice(),
		bymonthday: [],
		bymonth: [],
		byhour,
		byminute
	};
	if (rawFreq === "MONTHLY") return {
		freq: "MONTHLY",
		interval: parsedInterval,
		intervalHours: 1,
		byday: [],
		bymonthday,
		bymonth: [],
		byhour,
		byminute
	};
	if (rawFreq === "YEARLY") return {
		freq: "YEARLY",
		interval: parsedInterval,
		intervalHours: 1,
		byday: [],
		bymonthday,
		bymonth,
		byhour,
		byminute
	};
	if (rawFreq === "WEEKLY") return {
		freq: "WEEKLY",
		interval: parsedInterval,
		intervalHours: 1,
		byday,
		bymonthday: [],
		bymonth: [],
		byhour,
		byminute
	};
	return {
		freq: "DAILY",
		interval: 1,
		intervalHours: 1,
		byday: ALL_DAYS.slice(),
		bymonthday: [],
		bymonth: [],
		byhour,
		byminute
	};
}
function buildRRule(schedule) {
	if (schedule.freq === "HOURLY") {
		const byday = schedule.byday.length > 0 ? sortWeekdays(schedule.byday) : ALL_DAYS;
		return `FREQ=HOURLY;INTERVAL=${Math.max(1, schedule.intervalHours)};BYDAY=${byday.join(",")}`;
	}
	if (schedule.freq === "DAILY") return `FREQ=DAILY;BYHOUR=${schedule.byhour};BYMINUTE=${schedule.byminute}`;
	if (schedule.freq === "WEEKLY") {
		const byday = sortWeekdays(schedule.byday);
		const interval = schedule.interval === 2 ? 2 : 1;
		return `FREQ=WEEKLY${interval > 1 ? `;INTERVAL=${interval}` : ""};BYDAY=${byday.join(",")};BYHOUR=${schedule.byhour};BYMINUTE=${schedule.byminute}`;
	}
	if (schedule.freq === "MONTHLY") return `FREQ=MONTHLY;BYMONTHDAY=${sortMonthDays(schedule.bymonthday).join(",")};BYHOUR=${schedule.byhour};BYMINUTE=${schedule.byminute}`;
	return [
		"FREQ=YEARLY",
		`BYMONTH=${sortMonths(schedule.bymonth).join(",")}`,
		`BYMONTHDAY=${sortMonthDays(schedule.bymonthday).join(",")}`,
		`BYHOUR=${schedule.byhour}`,
		`BYMINUTE=${schedule.byminute}`
	].join(";");
}
function describeSchedule(rrule, t) {
	try {
		const s = parseRRule(rrule);
		const pad = (n) => String(n).padStart(2, "0");
		const time = `${pad(s.byhour)}:${pad(s.byminute)}`;
		if (s.freq === "HOURLY") return t("automation.schedule.everyNHours", { count: s.intervalHours });
		if (s.freq === "DAILY") return t("automation.schedule.dailyAt", { time });
		if (s.freq === "WEEKLY") {
			const days = sortWeekdays(s.byday).map((d) => getDayLabel(d, t)).join("、");
			return s.interval === 2 ? t("automation.schedule.biweeklyAt", {
				days,
				time
			}) : t("automation.schedule.weeklyAt", {
				days,
				time
			});
		}
		if (s.freq === "MONTHLY") return t("automation.schedule.monthlyAt", {
			days: sortMonthDays(s.bymonthday).map((day) => `${day}${t("automation.schedule.dayUnit")}`).join("、"),
			time
		});
		const month = sortMonths(s.bymonth)[0];
		const day = sortMonthDays(s.bymonthday)[0];
		if (!month || !day) return rrule;
		return t("automation.schedule.yearlyAt", {
			month,
			day,
			time
		});
	} catch {
		return rrule;
	}
}
function formatRelativeTime(ms, t) {
	if (!ms) return "";
	const diff = ms - Date.now();
	if (diff <= 0) return t("automation.time.soon");
	const minutes = Math.floor(diff / 6e4);
	const hours = Math.floor(diff / 36e5);
	const days = Math.floor(hours / 24);
	if (days > 0) return t("automation.time.days", { count: days });
	if (hours > 0) return t("automation.time.hours", { count: hours });
	return minutes > 0 ? t("automation.time.minutes", { count: minutes }) : t("automation.time.soon");
}
function pad2(n) {
	return String(n).padStart(2, "0");
}
function formatDateInputValue(date) {
	return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}
function formatTimeInputValue(date) {
	return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}
function getCreateScheduleDefaults(date = /* @__PURE__ */ new Date()) {
	const oneTimeDate = new Date(date.getTime() + 300 * 1e3);
	return {
		recurringHour: date.getHours(),
		recurringMinute: date.getMinutes(),
		onceDate: formatDateInputValue(oneTimeDate),
		onceTime: formatTimeInputValue(oneTimeDate)
	};
}
function parseIsoDate(value) {
	if (!value) return;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? void 0 : date;
}
function formatDateInputFromIso(value) {
	const date = parseIsoDate(value);
	return date ? formatDateInputValue(date) : "";
}
function parseDateInputDate(value) {
	if (!value) return;
	const [year, month, day] = value.split("-").map((part) => Number.parseInt(part, 10));
	if (!year || !month || !day) return;
	const date = new Date(year, month - 1, day);
	return Number.isNaN(date.getTime()) ? void 0 : date;
}
function compareDateInputValues(left, right) {
	const leftDate = parseDateInputDate(left);
	const rightDate = parseDateInputDate(right);
	return (leftDate?.getTime() || 0) - (rightDate?.getTime() || 0);
}
function getTodayDateInputValue() {
	return formatDateInputValue(/* @__PURE__ */ new Date());
}
function isDateBeforeToday(dateValue) {
	if (!dateValue) return false;
	return compareDateInputValues(dateValue, getTodayDateInputValue()) < 0;
}
function shiftCalendarMonth(viewMonth, deltaMonths) {
	return new Date(viewMonth.getFullYear(), viewMonth.getMonth() + deltaMonths, 1);
}
function formatDateSlashDisplay(value) {
	const date = parseDateInputDate(value);
	if (!date) return "";
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
}
function normalizeTimeValue(value) {
	if (!value) return DEFAULT_ONCE_TIME;
	const match = /^(\d{1,2}):(\d{1,2})$/.exec(value.trim());
	if (!match) return DEFAULT_ONCE_TIME;
	const hour = Math.max(0, Math.min(23, Number.parseInt(match[1], 10) || 0));
	const minute = Math.max(0, Math.min(59, Number.parseInt(match[2], 10) || 0));
	return `${pad2(hour)}:${pad2(minute)}`;
}
function parseTimeValue(value) {
	const [hour, minute] = normalizeTimeValue(value).split(":").map((part) => Number.parseInt(part, 10) || 0);
	return {
		hour,
		minute
	};
}
function formatTimeInputFromIso(value) {
	const date = parseIsoDate(value);
	if (!date) return DEFAULT_ONCE_TIME;
	return formatTimeInputValue(date);
}
function formatScheduledDateDisplay(dateValue, t) {
	if (!dateValue) return "";
	const date = parseDateInputDate(dateValue);
	if (!date) return "";
	const weekdayKey = WEEKDAY_KEYS_BY_JS_DAY[date.getDay()];
	const weekdayLabel = t(`automation.day.${weekdayKey}`);
	return `${formatDateSlashDisplay(dateValue)} ${weekdayLabel}`;
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
function describeAutomationSchedule(automation, t) {
	if (automation.scheduleType === "once") {
		const scheduledLabel = formatDateTimeLabel(automation.scheduledAt);
		return scheduledLabel ? t("automation.schedule.onceAt", { time: scheduledLabel }) : t("automation.schedule.once");
	}
	return automation.rrule ? describeSchedule(automation.rrule, t) : "";
}
function describeValidityRange(automation, t) {
	const from = formatDateLabel(automation.validFrom);
	const until = formatDateLabel(automation.validUntil);
	if (from && until) return t("automation.validity.range", {
		from,
		until
	});
	if (from) return t("automation.validity.from", { from });
	if (until) return t("automation.validity.until", { until });
	return "";
}
function validateDraftSchedule(draft, t, options) {
	if (draft.scheduleType === "once") {
		if (!draft.scheduledDate) return t("automation.schedule.validation.onceDateRequired");
		const nextScheduledAt = buildIsoFromDateTimeInput(draft.scheduledDate, draft.scheduledTime, DEFAULT_ONCE_TIME);
		if (shouldValidateFutureOneTimeSchedule({
			isCreating: options?.isCreating ?? false,
			nextScheduledAt,
			existingScheduledAt: options?.existingAutomation?.scheduledAt,
			existingScheduleType: options?.existingAutomation?.scheduleType
		}) && !isFutureDateTimeInput(draft.scheduledDate, draft.scheduledTime, Date.now(), "09:00")) return t("automation.schedule.validation.onceFutureRequired");
		return;
	}
	if (draft.schedule.freq === "HOURLY") {
		if (draft.schedule.intervalHours < 1) return t("automation.schedule.validation.intervalHours");
		if (draft.schedule.byday.length === 0) return t("automation.schedule.validation.weekdayRequired");
		return;
	}
	if (draft.schedule.freq === "WEEKLY") {
		if (draft.schedule.byday.length === 0) return t("automation.schedule.validation.weekdayRequired");
		return;
	}
	if (draft.schedule.freq === "MONTHLY") {
		if (draft.schedule.bymonthday.length === 0) return t("automation.schedule.validation.monthdayRequired");
		return;
	}
	if (draft.schedule.freq === "YEARLY") {
		if (draft.schedule.bymonth.length === 0) return t("automation.schedule.validation.monthRequired");
		if (draft.schedule.bymonthday.length === 0) return t("automation.schedule.validation.dateRequired");
	}
}
function buildAutomationPayload(mode, draft, id) {
	const payload = {
		mode,
		id,
		name: draft.name.trim(),
		prompt: draft.prompt.trim(),
		scheduleType: draft.scheduleType,
		cwds: draft.cwds.split(",").map((item) => item.trim()).filter(Boolean),
		status: draft.status,
		modelId: draft.modelId,
		modelIsThinking: draft.modelIsThinking,
		skills: draft.skills,
		pushToWeChat: draft.pushToWeChat ?? false,
		pushToWecomBot: draft.pushToWecomBot ?? false,
		expertId: draft.expertId || "",
		expertMarketplace: draft.expertMarketplace || "",
		connectorIds: draft.connectorIds !== void 0 ? draft.connectorIds : void 0,
		permissionMode: draft.permissionMode
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
function buildInProgressAutomations(automations, runtimeState) {
	const byId = new Map(automations.map((automation) => [automation.id, automation]));
	const rows = [];
	for (const [id, state] of Object.entries(runtimeState || {})) {
		if (!state?.running) continue;
		const automation = byId.get(id);
		if (!automation) continue;
		rows.push({
			automation,
			state,
			conversationId: state.runningConversationId,
			runningStartedAt: state.runningStartedAt || automation.updated_at
		});
	}
	return rows.sort((a, b) => b.runningStartedAt - a.runningStartedAt);
}
function buildRunningRecordItems(inProgressAutomations) {
	return inProgressAutomations.map(({ automation, state, conversationId, runningStartedAt }) => ({
		id: `running-${automation.id}`,
		automationId: automation.id,
		automationName: automation.name,
		status: "IN_PROGRESS",
		startedAt: runningStartedAt,
		finishedAt: 0,
		success: false,
		summary: "",
		runs: automation.cwds.map((cwd) => ({
			cwd,
			success: false,
			startedAt: runningStartedAt,
			finishedAt: 0,
			conversationId
		})),
		runtimeState: state,
		isRunningRecord: true
	}));
}
function buildValidityCalendarCells(viewMonth, startDate, endDate, hoverDateValue, sundayStart = false) {
	const firstWeekdayOffset = getFirstWeekdayOffset(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1), sundayStart);
	const gridStart = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1 - firstWeekdayOffset);
	const todayValue = formatDateInputValue(/* @__PURE__ */ new Date());
	const hasPreview = !!startDate && !endDate && !!hoverDateValue;
	const previewStart = hasPreview ? compareDateInputValues(hoverDateValue, startDate) < 0 ? hoverDateValue : startDate : void 0;
	const previewEnd = hasPreview ? compareDateInputValues(hoverDateValue, startDate) < 0 ? startDate : hoverDateValue : void 0;
	return Array.from({ length: 42 }, (_, index) => {
		const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
		const dateValue = formatDateInputValue(date);
		return {
			dateValue,
			dayNumber: date.getDate(),
			isCurrentMonth: date.getMonth() === viewMonth.getMonth(),
			isToday: dateValue === todayValue,
			isRangeStart: !!startDate && dateValue === startDate,
			isRangeEnd: !!endDate && dateValue === endDate,
			isInRange: !!startDate && !!endDate && compareDateInputValues(startDate, dateValue) < 0 && compareDateInputValues(dateValue, endDate) < 0,
			isPreviewStart: !!previewStart && dateValue === previewStart,
			isPreviewEnd: !!previewEnd && dateValue === previewEnd,
			isPreviewInRange: !!previewStart && !!previewEnd && compareDateInputValues(previewStart, dateValue) < 0 && compareDateInputValues(dateValue, previewEnd) < 0
		};
	});
}
function isEventInsideRef(ref, target) {
	return !!target && !!ref.current && ref.current.contains(target);
}
/**
* Render schedule pickers as fixed-position body portals so they are not clipped by
* the automation edit modal body, which must remain scrollable for small windows.
*/
function useFloatingDropdownStyle(triggerRef, floatingRef, isOpen, options = {}) {
	const { preferredPlacement = "top", offset = 6, width, minWidth, maxWidth, estimatedHeight = 240, horizontalMargin = 8, zIndex = FLOATING_DROPDOWN_DEFAULT_Z_INDEX } = options;
	const [style, setStyle] = (0, import_react$1.useState)();
	useIsomorphicLayoutEffect(() => {
		if (!isOpen || typeof window === "undefined") {
			setStyle(void 0);
			return;
		}
		const updateStyle = () => {
			const trigger = triggerRef.current;
			if (!trigger) return;
			const rect = trigger.getBoundingClientRect();
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const floatingWidth = floatingRef.current?.offsetWidth ?? (typeof width === "number" ? width : rect.width);
			const floatingHeight = floatingRef.current?.offsetHeight ?? estimatedHeight;
			const spaceAbove = rect.top - horizontalMargin - offset;
			const spaceBelow = viewportHeight - rect.bottom - horizontalMargin - offset;
			let placement = preferredPlacement;
			if (preferredPlacement === "top" && spaceAbove < Math.min(floatingHeight, 160) && spaceBelow > spaceAbove) placement = "bottom";
			else if (preferredPlacement === "bottom" && spaceBelow < Math.min(floatingHeight, 160) && spaceAbove > spaceBelow) placement = "top";
			const maxLeft = Math.max(horizontalMargin, viewportWidth - floatingWidth - horizontalMargin);
			const nextStyle = {
				position: "fixed",
				left: Math.min(Math.max(horizontalMargin, rect.left), maxLeft),
				zIndex,
				maxWidth: maxWidth ?? `calc(100vw - ${horizontalMargin * 2}px)`
			};
			if (width === "anchor") nextStyle.width = rect.width;
			else if (typeof width === "number") nextStyle.width = width;
			if (minWidth === "anchor") nextStyle.minWidth = rect.width;
			else if (typeof minWidth === "number") nextStyle.minWidth = minWidth;
			if (placement === "top") {
				nextStyle.top = "auto";
				nextStyle.bottom = Math.max(horizontalMargin, viewportHeight - rect.top + offset);
			} else {
				nextStyle.top = Math.min(viewportHeight - horizontalMargin, rect.bottom + offset);
				nextStyle.bottom = "auto";
			}
			setStyle(nextStyle);
		};
		updateStyle();
		const frame = window.requestAnimationFrame(updateStyle);
		window.addEventListener("resize", updateStyle);
		window.addEventListener("scroll", updateStyle, true);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("resize", updateStyle);
			window.removeEventListener("scroll", updateStyle, true);
		};
	}, [
		estimatedHeight,
		floatingRef,
		horizontalMargin,
		isOpen,
		maxWidth,
		minWidth,
		offset,
		preferredPlacement,
		triggerRef,
		width,
		zIndex
	]);
	return style;
}
function renderFloatingDropdown(dropdown) {
	if (typeof document === "undefined") return dropdown;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "atm-floating-layer",
		children: dropdown
	}), document.body);
}
var import_react$1, import_react_dom, import_jsx_runtime$1, ALL_DAYS_MONDAY_START, ALL_DAYS_SUNDAY_START, ALL_DAYS, MONTHS, MONTH_DAYS, TIME_PICKER_HOURS, TIME_PICKER_MINUTES, WEEKDAY_KEYS_BY_JS_DAY, TEMPLATE_ICON_MAP, AUTOMATION_TEMPLATES, AutomationPanel, AutomationRow, getAutomationDisplayStatusLabel, getInboxStatusClass, InboxRow, FLOATING_DROPDOWN_DEFAULT_Z_INDEX, useIsomorphicLayoutEffect, SingleDatePicker, ValidityRangePicker, TimePicker, CustomSelect, WeekdayMultiPicker, MonthdayMultiPicker, EditModal;
var init_automation_panel = __esmMin((() => {
	init_automation_panel$1();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_foundation();
	init_icons$1();
	init_product_features();
	init_use_mac_fullscreen();
	init_use_named_page_show();
	init_i18n();
	init_useI18n();
	init_store();
	init_expert();
	init_app_providers();
	init_telemetry();
	init_environment();
	init_file_path();
	init_chat_skill_selector();
	init_icons$2();
	init_task_starter_store();
	init_SettingsContext();
	init_TaskStarterIcons();
	init_workbuddy_topbar();
	init_automation_edit_mode_view();
	init_automation_inbox_detail();
	init_automation_model_options();
	init_automation_permission_confirm_dialog();
	init_automation_permission_picker();
	init_automation_task_utils();
	init_automation_template_grid();
	init_connector_selector();
	init_expert_selector();
	init_inbox_conversation();
	init_inbox_detail_utils();
	init_inbox_status_icon();
	init_resolve_effective_cwd();
	init_schedule_validation();
	init_template_config();
	init_use_permission_confirm();
	import_jsx_runtime$1 = require_jsx_runtime();
	ALL_DAYS_MONDAY_START = [
		"MO",
		"TU",
		"WE",
		"TH",
		"FR",
		"SA",
		"SU"
	];
	ALL_DAYS_SUNDAY_START = [
		"SU",
		"MO",
		"TU",
		"WE",
		"TH",
		"FR",
		"SA"
	];
	ALL_DAYS = ALL_DAYS_MONDAY_START;
	MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);
	MONTH_DAYS = Array.from({ length: 31 }, (_, index) => index + 1);
	TIME_PICKER_HOURS = Array.from({ length: 24 }, (_, index) => index);
	TIME_PICKER_MINUTES = Array.from({ length: 60 }, (_, index) => index);
	WEEKDAY_KEYS_BY_JS_DAY = [
		"SU",
		"MO",
		"TU",
		"WE",
		"TH",
		"FR",
		"SA"
	];
	TEMPLATE_ICON_MAP = {
		news: TemplateNewsIcon,
		languages: TemplateLanguagesIcon,
		moon: TemplateMoonIcon,
		"weekly-report": TemplateWeeklyReportIcon,
		film: TemplateFilmIcon,
		calendar: TemplateCalendarIcon,
		lightbulb: TemplateLightbulbIcon,
		image: TemplateImageIcon,
		"alarm-clock": TemplateAlarmClockIcon,
		hospital: TemplateHospitalIcon,
		"messages-square": TemplateMessagesSquareIcon,
		"list-todo": TemplateListTodoIcon
	};
	AUTOMATION_TEMPLATES = AUTOMATION_TEMPLATE_CONFIGS.map((template) => ({
		id: template.id,
		titleKey: template.titleKey,
		contentKey: template.contentKey,
		prompt: template.prompt,
		promptKey: template.promptKey,
		scheduleType: template.scheduleType || "recurring",
		schedule: {
			freq: template.schedule.freq,
			interval: template.schedule.freq === "HOURLY" ? template.schedule.intervalHours : 1,
			byday: template.schedule.byday,
			bymonthday: [],
			bymonth: [],
			byhour: template.schedule.byhour,
			byminute: template.schedule.byminute,
			intervalHours: template.schedule.intervalHours
		},
		scheduledDate: template.scheduledDate,
		scheduledTime: template.scheduledTime,
		validFromDate: template.validFromDate,
		validUntilDate: template.validUntilDate,
		Icon: TEMPLATE_ICON_MAP[template.iconKey]
	}));
	AutomationPanel = (props) => {
		const { adapter, onOpenConversation, workspaceFolders: externalWorkspaceFolders, initialEditId, onInitialEditHandled, onOpenConnectorSettings, onSummonExpert, expertFacade } = props;
		const t = useTranslation();
		const isLocalAutomation = adapter.environmentType === "local";
		const { reportEvent, Events } = useAgentTelemetry();
		const sidebarCollapsed = useConversations()?.sidebarCollapsed ?? false;
		const isMacFullscreen = useMacFullscreen(adapter);
		const needTrafficLightOffset = isMac && isLocalAutomation && sidebarCollapsed && !isMacFullscreen;
		useNamedPageShow({
			active: true,
			elementId: "automation_entry_click",
			elementName: "自动化入口"
		});
		const [snapshot, setSnapshot] = (0, import_react$1.useState)(void 0);
		const [loading, setLoading] = (0, import_react$1.useState)(true);
		const [loadError, setLoadError] = (0, import_react$1.useState)(void 0);
		const [isCreating, setIsCreating] = (0, import_react$1.useState)(false);
		const [editingAutomation, setEditingAutomation] = (0, import_react$1.useState)(void 0);
		const [draft, setDraft] = (0, import_react$1.useState)(void 0);
		const [saving, setSaving] = (0, import_react$1.useState)(false);
		const [showTemplatePage, setShowTemplatePage] = (0, import_react$1.useState)(false);
		const [selectedInboxItem, setSelectedInboxItem] = (0, import_react$1.useState)(void 0);
		const isCreatingRef = (0, import_react$1.useRef)(isCreating);
		(0, import_react$1.useEffect)(() => {
			isCreatingRef.current = isCreating;
		}, [isCreating]);
		const editingAutomationRef = (0, import_react$1.useRef)(editingAutomation);
		(0, import_react$1.useEffect)(() => {
			editingAutomationRef.current = editingAutomation;
		}, [editingAutomation]);
		const draftRef = (0, import_react$1.useRef)(draft);
		(0, import_react$1.useEffect)(() => {
			draftRef.current = draft;
		}, [draft]);
		const refresh = (0, import_react$1.useCallback)(async (silent = false) => {
			if (!isLocalAutomation) {
				setLoading(false);
				return;
			}
			if (!silent) setLoading(true);
			setLoadError(void 0);
			try {
				setSnapshot(await adapter.getAutomationSnapshot());
			} catch (error) {
				setLoadError(error?.message || t("automation.error.load"));
			} finally {
				if (!silent) setLoading(false);
			}
		}, [
			adapter,
			isLocalAutomation,
			t
		]);
		(0, import_react$1.useEffect)(() => {
			refresh().catch(() => void 0);
			if (!isLocalAutomation) return;
			let unsubscribe;
			if (adapter.onAutomationSnapshotUpdate) unsubscribe = adapter.onAutomationSnapshotUpdate((latest) => {
				setSnapshot(latest);
				setLoadError(void 0);
			});
			return () => {
				unsubscribe?.();
			};
		}, [
			refresh,
			isLocalAutomation,
			adapter
		]);
		const buildDraft = (0, import_react$1.useCallback)((automation) => ({
			name: automation.name,
			prompt: automation.prompt,
			cwds: automation.cwds.join(", "),
			status: automation.status,
			modelId: automation.modelId,
			modelIsThinking: automation.modelIsThinking,
			skills: automation.skills || [],
			scheduleType: automation.scheduleType || "recurring",
			pushToWeChat: automation.pushToWeChat ?? false,
			pushToWecomBot: automation.pushToWecomBot ?? false,
			schedule: parseRRule(automation.rrule),
			scheduledDate: formatDateInputFromIso(automation.scheduledAt),
			scheduledTime: formatTimeInputFromIso(automation.scheduledAt),
			validFromDate: formatDateInputFromIso(automation.validFrom),
			validUntilDate: formatDateInputFromIso(automation.validUntil),
			expertId: automation.expertId || void 0,
			expertMarketplace: automation.expertMarketplace || void 0,
			connectorIds: automation.connectorIds || [],
			permissionMode: automation.permissionMode ?? "fullAccess"
		}), []);
		const handleEdit = (0, import_react$1.useCallback)((automation) => {
			setIsCreating(false);
			setEditingAutomation(automation);
			setDraft(buildDraft(automation));
		}, [buildDraft]);
		(0, import_react$1.useEffect)(() => {
			if (!initialEditId || !snapshot) return;
			const payload = automationExpertSummon$.getValue();
			if (payload && !isAutomationPayloadExpired(payload)) return;
			const automation = snapshot.automations.find((a) => a.id === initialEditId);
			if (automation) {
				handleEdit(automation);
				onInitialEditHandled?.();
			}
		}, [
			initialEditId,
			snapshot,
			handleEdit,
			onInitialEditHandled
		]);
		/** Tracks whether payload has been consumed in this mount cycle */
		const draftRestoredRef = (0, import_react$1.useRef)(false);
		/** Set to true by saveDraftAndNavigate right before triggering navigation */
		const navigatingAwayRef = (0, import_react$1.useRef)(false);
		/** Stores the automationId from a consumed edit-mode payload; used by the deferred
		*  effect below to bind `editingAutomation` once snapshot loads. */
		const pendingEditAutomationIdRef = (0, import_react$1.useRef)(void 0);
		(0, import_react$1.useEffect)(() => {
			if (draftRestoredRef.current) return;
			const payload = automationExpertSummon$.getValue();
			if (!payload) return;
			if (isAutomationPayloadExpired(payload)) {
				automationExpertSummon$.next(null);
				message.info(t("automation.draftExpired"));
				return;
			}
			draftRestoredRef.current = true;
			const restoredDraft = {
				...payload.draft,
				...payload.selectedExpert ? {
					expertId: payload.selectedExpert.id,
					expertMarketplace: payload.selectedExpert.marketplace,
					expertName: payload.selectedExpert.profession || payload.selectedExpert.name || void 0,
					expertIdentityName: payload.selectedExpert.identityName || void 0,
					expertAvatarUrl: payload.selectedExpert.avatarUrl || void 0
				} : {}
			};
			if (payload.mode === "edit" && payload.automationId) if (snapshot) {
				const automation = snapshot.automations.find((a) => a.id === payload.automationId);
				if (automation) {
					setEditingAutomation(automation);
					setIsCreating(false);
				} else {
					setIsCreating(true);
					setEditingAutomation(void 0);
				}
			} else {
				pendingEditAutomationIdRef.current = payload.automationId;
				setIsCreating(true);
				setEditingAutomation(void 0);
			}
			else {
				setIsCreating(true);
				setEditingAutomation(void 0);
			}
			setDraft(restoredDraft);
			automationExpertSummon$.next(null);
			if (payload.selectedExpert && adapter.addExpertToHistory) {
				const expert = {
					id: payload.selectedExpert.id,
					name: payload.selectedExpert.name || payload.selectedExpert.id,
					profession: payload.selectedExpert.profession || payload.selectedExpert.name || "",
					avatarUrl: payload.selectedExpert.avatarUrl || void 0,
					summonedAt: Date.now()
				};
				adapter.addExpertToHistory(SHARED_RECENT_EXPERTS_KEY, expert).catch(() => {});
			}
		}, []);
		(0, import_react$1.useEffect)(() => {
			const pendingId = pendingEditAutomationIdRef.current;
			if (!pendingId || !snapshot) return;
			const automation = snapshot.automations.find((a) => a.id === pendingId);
			pendingEditAutomationIdRef.current = void 0;
			if (automation) {
				setEditingAutomation(automation);
				setIsCreating(false);
			}
		}, [snapshot]);
		(0, import_react$1.useEffect)(() => () => {
			if (navigatingAwayRef.current) return;
			if (automationExpertSummon$.getValue()) automationExpertSummon$.next(null);
		}, []);
		/**
		* Save current draft to Subject before navigating away from automation page.
		*
		* SYNC CONTRACT: navigateFn() MUST be synchronous (e.g. `navigate('/experts')`).
		* The unmount cleanup (above) checks `navigatingAwayRef.current` which is set
		* synchronously here before calling navigateFn(). If navigateFn were async
		* (e.g. awaiting a confirm dialog), the cleanup could run before navigatingAwayRef
		* is set, wiping the in-flight payload.
		*/
		const saveDraftAndNavigate = (0, import_react$1.useCallback)((source, navigateFn) => {
			if (!draft) return;
			navigatingAwayRef.current = true;
			automationExpertSummon$.next({
				source,
				draft: { ...draft },
				mode: isCreating ? "create" : "edit",
				automationId: editingAutomation?.id,
				createdAt: Date.now()
			});
			navigateFn();
		}, [
			draft,
			isCreating,
			editingAutomation
		]);
		const handleSummonExpertWithDraft = (0, import_react$1.useCallback)(() => {
			if (!onSummonExpert) return;
			saveDraftAndNavigate("expert", onSummonExpert);
		}, [onSummonExpert, saveDraftAndNavigate]);
		const handleOpenConnectorSettingsWithDraft = (0, import_react$1.useCallback)(() => {
			if (!onOpenConnectorSettings) return;
			saveDraftAndNavigate("connectors", onOpenConnectorSettings);
		}, [onOpenConnectorSettings, saveDraftAndNavigate]);
		const resolveWorkspaceFolders = (0, import_react$1.useCallback)(async () => {
			if (externalWorkspaceFolders && externalWorkspaceFolders.length > 0) return externalWorkspaceFolders.filter((folder) => !isClawPath(folder.path, folder.label));
			try {
				return (await adapter.getCurrentWorkspaces()).filter((folder) => !isClawPath(folder.path, folder.label));
			} catch {
				return [];
			}
		}, [adapter, externalWorkspaceFolders]);
		const handleCreate = (0, import_react$1.useCallback)(async (template) => {
			await resolveWorkspaceFolders();
			const createScheduleDefaults = getCreateScheduleDefaults();
			setIsCreating(true);
			setEditingAutomation(void 0);
			const resolvedPrompt = template ? t(template.promptKey) !== template.promptKey ? t(template.promptKey) : template.prompt : "";
			setDraft({
				name: template ? t(template.titleKey) : "",
				prompt: resolvedPrompt,
				cwds: "",
				status: "ACTIVE",
				modelId: void 0,
				modelIsThinking: false,
				skills: [],
				scheduleType: template?.scheduleType || "recurring",
				pushToWeChat: false,
				pushToWecomBot: false,
				expertId: void 0,
				expertMarketplace: void 0,
				connectorIds: [],
				permissionMode: "fullAccess",
				schedule: template?.schedule || {
					freq: "DAILY",
					interval: 1,
					byday: ALL_DAYS.slice(),
					bymonthday: [],
					bymonth: [],
					byhour: createScheduleDefaults.recurringHour,
					byminute: createScheduleDefaults.recurringMinute,
					intervalHours: 1
				},
				scheduledDate: template?.scheduledDate || createScheduleDefaults.onceDate,
				scheduledTime: template?.scheduledTime || createScheduleDefaults.onceTime,
				validFromDate: template?.validFromDate || "",
				validUntilDate: template?.validUntilDate || ""
			});
		}, [resolveWorkspaceFolders, t]);
		const handleCreateButtonClick = (0, import_react$1.useCallback)(() => {
			handleCreate().catch(() => void 0);
		}, [handleCreate]);
		const handleOpenTemplatePage = (0, import_react$1.useCallback)(() => {
			setShowTemplatePage(true);
		}, []);
		const handleBackToAutomationList = (0, import_react$1.useCallback)(() => {
			setShowTemplatePage(false);
		}, []);
		const handleTemplateSelect = (0, import_react$1.useCallback)((template) => {
			const fullTemplate = AUTOMATION_TEMPLATES.find((item) => item.id === template.id);
			if (!fullTemplate) return;
			setShowTemplatePage(false);
			handleCreate(fullTemplate).catch(() => void 0);
		}, [handleCreate]);
		const handleCloseModal = (0, import_react$1.useCallback)(() => {
			setIsCreating(false);
			setEditingAutomation(void 0);
			setDraft(void 0);
		}, []);
		const handleSave = (0, import_react$1.useCallback)(async () => {
			const currentEditing = editingAutomationRef.current;
			const currentDraft = draftRef.current;
			const currentIsCreating = isCreatingRef.current;
			if (!currentDraft) return;
			if (!currentDraft.name.trim()) {
				message.warning(t("automation.error.nameRequired"));
				return;
			}
			if (!currentDraft.prompt.trim()) {
				message.warning(t("automation.error.promptRequired"));
				return;
			}
			const scheduleValidationMessage = validateDraftSchedule(currentDraft, t, {
				isCreating: currentIsCreating,
				existingAutomation: currentEditing
			});
			if (scheduleValidationMessage) {
				message.warning(scheduleValidationMessage);
				return;
			}
			setSaving(true);
			try {
				const payload = currentIsCreating ? buildAutomationPayload("suggested create", currentDraft) : currentEditing ? buildAutomationPayload("suggested update", currentDraft, currentEditing.id) : void 0;
				if (!payload) return;
				const result = await adapter.updateAutomation(payload);
				if (result.success) {
					if (currentIsCreating) {
						const cwdArray = currentDraft.cwds ? currentDraft.cwds.split(",").filter(Boolean) : [];
						reportEvent(Events.AutomatedTaskCreateSuc, {
							name: currentDraft.name || "",
							source: "manually",
							modelId: currentDraft.modelId,
							modelIsThinking: currentDraft.modelIsThinking,
							expertId: currentDraft.expertId,
							expertMarketplace: currentDraft.expertMarketplace,
							connectorIds: currentDraft.connectorIds?.join(","),
							connectorCount: currentDraft.connectorIds?.length || 0,
							skills: currentDraft.skills?.join(","),
							skillCount: currentDraft.skills?.length || 0,
							scheduleType: currentDraft.scheduleType,
							pushToWeChat: currentDraft.pushToWeChat,
							pushToWecomBot: currentDraft.pushToWecomBot,
							cwdCount: cwdArray.length
						});
					}
					handleCloseModal();
					await refresh(true);
					return;
				}
				message.error(result.message || t("automation.error.save"));
			} catch (error) {
				message.error(error?.message || t("automation.error.save"));
			} finally {
				setSaving(false);
			}
		}, [
			adapter,
			handleCloseModal,
			refresh,
			t
		]);
		const handleFallbackToDefault = (0, import_react$1.useCallback)(() => {
			setDraft((current) => current ? {
				...current,
				permissionMode: "default"
			} : current);
		}, []);
		const { showConfirmDialog: showPermissionConfirm, requestSubmit: requestSaveWithPermissionCheck, requestAction: requestActionWithPermissionCheck, handleConfirm: handlePermissionConfirm, handleCancel: handlePermissionCancel, handleFallbackToDefault: handlePermissionFallback } = usePermissionConfirm({
			currentMode: draft?.permissionMode ?? "fullAccess",
			initialMode: editingAutomation?.permissionMode ?? (editingAutomation ? "fullAccess" : void 0),
			onConfirmedSubmit: handleSave,
			onFallbackToDefault: handleFallbackToDefault
		});
		/**
		* 编辑态点击"删除"：用命令式 `Modal.confirm` 唤起确认。
		* 历史上这里用 `showDeleteConfirm` state + `<DeleteConfirmModal>` 声明式渲染，
		* 跟 `pendingDeleteId` / `pendingDeleteInboxId` / `showBatchDeleteConfirm` 一起在面板里
		* 拼了 4 套独立 state + handler，删除按钮逻辑被切成 open/cancel/confirm 三段。
		* 改成命令式后整个删除链路（取 ref → 调 adapter → toast → close 编辑面板）收在一个回调里，
		* 删除失败时通过返回 `false` 让确认弹窗保留（Modal.confirm 协议）。
		*/
		const handleDelete = (0, import_react$1.useCallback)(() => {
			if (isCreatingRef.current) return;
			const currentEditing = editingAutomationRef.current;
			if (!currentEditing) return;
			Modal.confirm({
				title: t("automation.delete.title", { name: currentEditing.name }),
				content: t("automation.delete.description"),
				okText: t("automation.delete.confirm"),
				cancelText: t("common.cancel"),
				okType: "danger",
				onOk: async () => {
					const editing = editingAutomationRef.current;
					if (!editing) return;
					setSaving(true);
					try {
						const result = await adapter.deleteAutomation(editing.id);
						await refresh(true);
						if (result.success) {
							reportEvent(Events.AutomatedTaskDelete, {
								automationId: editing.id,
								name: editing.name || "",
								source: "manually",
								expertId: editing.expertId,
								expertMarketplace: editing.expertMarketplace,
								connectorIds: editing.connectorIds?.join(","),
								connectorCount: editing.connectorIds?.length || 0
							});
							handleCloseModal();
							message.success(t("automation.toast.deleted"));
							return;
						}
						message.error(result.message || t("automation.error.delete"));
						return false;
					} catch (error) {
						message.error(error?.message || t("automation.error.delete"));
						return false;
					} finally {
						setSaving(false);
					}
				}
			});
		}, [
			adapter,
			handleCloseModal,
			refresh,
			t,
			reportEvent,
			Events
		]);
		const handleTogglePause = (0, import_react$1.useCallback)(async () => {
			const currentEditing = editingAutomationRef.current;
			const currentDraft = draftRef.current;
			if (!currentEditing || !currentDraft || saving) return;
			const nextStatus = currentDraft.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
			setSaving(true);
			try {
				const result = await adapter.updateAutomation(buildAutomationPayload("suggested update", {
					...currentDraft,
					status: nextStatus
				}, currentEditing.id));
				if (!result.success) {
					message.error(result.message || t("automation.error.save"));
					return;
				}
				setEditingAutomation(result.automation || {
					...currentEditing,
					status: nextStatus
				});
				setDraft((current) => current ? {
					...current,
					status: nextStatus
				} : current);
				await refresh(true);
			} catch (error) {
				message.error(error?.message || t("automation.error.save"));
			} finally {
				setSaving(false);
			}
		}, [
			adapter,
			refresh,
			saving,
			t
		]);
		const handleArchive = (0, import_react$1.useCallback)(async (itemId) => {
			try {
				const result = await adapter.archiveAutomationInboxItem(itemId);
				if (!result.success) {
					message.error(result.message || t("automation.error.save"));
					return;
				}
				await refresh(true);
				message.success(t("automation.toast.archived"));
			} catch (error) {
				message.error(error?.message || t("automation.error.save"));
			}
		}, [
			adapter,
			refresh,
			t
		]);
		/**
		* 删除运行记录（inbox）：命令式 `Modal.confirm`，
		* 不再用 `pendingDeleteInboxId` state 当"显示弹窗"开关，删除目标 id 直接闭包。
		*/
		const handleDeleteArchived = (0, import_react$1.useCallback)((itemId) => {
			Modal.confirm({
				title: t("automation.record.delete.title"),
				content: t("automation.record.delete.description"),
				okText: t("common.delete"),
				cancelText: t("common.cancel"),
				okType: "danger",
				onOk: async () => {
					try {
						const result = await adapter.deleteAutomationInboxItem(itemId);
						if (!result.success) {
							message.error(result.message || t("automation.error.delete"));
							return false;
						}
						await refresh(true);
					} catch (error) {
						message.error(error?.message || t("automation.error.delete"));
						return false;
					}
				}
			});
		}, [
			adapter,
			refresh,
			t
		]);
		const handleOpenConversation = (0, import_react$1.useCallback)(async (conversationId, cwd, title) => {
			if (!conversationId) {
				message.warning(t("automation.error.missingConversation"));
				return;
			}
			await onOpenConversation(conversationId, cwd, title);
		}, [onOpenConversation, t]);
		const handleRetryInboxConversation = (0, import_react$1.useCallback)(async (conversationId, cwd, title) => {
			await openLinkedInboxConversation({
				conversationId,
				cwd,
				title,
				onOpenConversation,
				onMissingConversation: () => {
					message.warning(t("automation.error.missingConversation"));
				},
				onOpenFailed: (error) => {
					console.warn("[AutomationPanel] Linked conversation replay failed from inbox detail:", error);
					message.warning(t("automation.error.openConversationFailed"));
				}
			});
		}, [onOpenConversation, t]);
		const handleOpenInboxItem = (0, import_react$1.useCallback)(async (item, fallbackCwd) => {
			const { conversationId, cwd } = resolveInboxConversation(item);
			const effectiveCwd = resolveEffectiveCwd(cwd, fallbackCwd);
			if (isInboxRunningItem(item)) {
				if (conversationId) await onOpenConversation(conversationId, effectiveCwd, item.automationName);
				return;
			}
			if (shouldOpenInboxDetailFirst(item)) {
				setSelectedInboxItem(item);
				return;
			}
			if (!conversationId) {
				setSelectedInboxItem(item);
				return;
			}
			try {
				await onOpenConversation(conversationId, effectiveCwd, item.automationName);
			} catch (error) {
				console.warn("[AutomationPanel] Conversation replay failed, showing inbox fallback detail:", error);
				setSelectedInboxItem(item);
			}
		}, [onOpenConversation]);
		const handleCloseInboxDetail = (0, import_react$1.useCallback)(() => {
			setSelectedInboxItem(void 0);
		}, []);
		const executeTest = (0, import_react$1.useCallback)(async () => {
			const currentEditing = editingAutomationRef.current;
			const currentDraft = draftRef.current;
			if (!currentEditing || !currentDraft) return;
			setSaving(true);
			try {
				const updateResult = await adapter.updateAutomation(buildAutomationPayload("suggested update", currentDraft, currentEditing.id));
				if (!updateResult.success) {
					message.error(updateResult.message || t("automation.error.save"));
					return;
				}
				setEditingAutomation((prev) => prev ? {
					...prev,
					permissionMode: currentDraft.permissionMode
				} : prev);
				const testResult = await adapter.testAutomation(currentEditing.id);
				if (!testResult.success) {
					message.error(testResult.message || t("automation.error.test"));
					return;
				}
				message.success(t("automation.toast.testTriggered"));
			} catch (error) {
				message.error(error?.message || t("automation.error.test"));
			} finally {
				setSaving(false);
			}
		}, [adapter, t]);
		const handleTest = (0, import_react$1.useCallback)(() => {
			const currentEditing = editingAutomationRef.current;
			const currentDraft = draftRef.current;
			if (!currentEditing || !currentDraft || saving) return;
			const scheduleValidationMessage = validateDraftSchedule(currentDraft, t, {
				isCreating: false,
				existingAutomation: currentEditing
			});
			if (scheduleValidationMessage) {
				message.warning(scheduleValidationMessage);
				return;
			}
			requestActionWithPermissionCheck(executeTest);
		}, [
			executeTest,
			requestActionWithPermissionCheck,
			saving,
			t
		]);
		const automationTaskGroups = (0, import_react$1.useMemo)(() => splitAutomationTasks(snapshot?.automations || [], snapshot?.runtimeState || {}), [snapshot]);
		const runningAutomations = automationTaskGroups.running;
		const scheduledAutomations = automationTaskGroups.current;
		const pausedAutomations = automationTaskGroups.paused;
		const inProgressAutomations = (0, import_react$1.useMemo)(() => buildInProgressAutomations(snapshot?.automations || [], snapshot?.runtimeState || {}), [snapshot]);
		const runningRecordItems = (0, import_react$1.useMemo)(() => buildRunningRecordItems(inProgressAutomations), [inProgressAutomations]);
		const automationById = (0, import_react$1.useMemo)(() => new Map((snapshot?.automations || []).map((automation) => [automation.id, automation])), [snapshot]);
		const { completedItems, archivedItems } = (0, import_react$1.useMemo)(() => {
			const completed = [];
			const archived = [];
			for (const item of snapshot?.inbox || []) if (item.archived) archived.push(item);
			else completed.push(item);
			return {
				completedItems: completed,
				archivedItems: archived
			};
		}, [snapshot]);
		const getRunCount = (0, import_react$1.useCallback)((automationId) => (snapshot?.inbox.filter((item) => item.automationId === automationId).length || 0) + (snapshot?.runtimeState?.[automationId]?.running ? 1 : 0), [snapshot]);
		const showDefaultTemplateGrid = !!snapshot && scheduledAutomations.length === 0 && pausedAutomations.length === 0 && archivedItems.length === 0 && completedItems.length === 0 && runningRecordItems.length === 0;
		const showTemplateEntryButton = !showDefaultTemplateGrid && !showTemplatePage;
		const [activeTab, setActiveTab] = (0, import_react$1.useState)("tasks");
		const [searchQuery, setSearchQuery] = (0, import_react$1.useState)("");
		const [filterStatus, setFilterStatus] = (0, import_react$1.useState)("all");
		const [showFilterDropdown, setShowFilterDropdown] = (0, import_react$1.useState)(false);
		const [isBatchMode, setIsBatchMode] = (0, import_react$1.useState)(false);
		const [selectedIds, setSelectedIds] = (0, import_react$1.useState)(/* @__PURE__ */ new Set());
		const [collapsedGroups, setCollapsedGroups] = (0, import_react$1.useState)(/* @__PURE__ */ new Set());
		const [archivedGroupOpen, setArchivedGroupOpen] = (0, import_react$1.useState)(true);
		const filteredRunningAutomations = (0, import_react$1.useMemo)(() => filterAutomationTasksByQuery(runningAutomations, searchQuery), [runningAutomations, searchQuery]);
		const filteredScheduledAutomations = (0, import_react$1.useMemo)(() => filterAutomationTasksByQuery(scheduledAutomations, searchQuery), [scheduledAutomations, searchQuery]);
		const filteredPausedAutomations = (0, import_react$1.useMemo)(() => filterAutomationTasksByQuery(pausedAutomations, searchQuery), [pausedAutomations, searchQuery]);
		const filteredCompletedItems = (0, import_react$1.useMemo)(() => {
			let items = [
				...runningRecordItems,
				...completedItems,
				...archivedItems
			];
			if (filterStatus === "success") items = items.filter((item) => isInboxDeliveredLike(item));
			else if (filterStatus === "failed") items = items.filter((item) => isInboxFailedLike(item));
			else if (filterStatus === "running") items = items.filter(isInboxRunningItem);
			else if (filterStatus === "archived") items = items.filter((item) => item.archived);
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				items = items.filter((item) => {
					return (automationById.get(item.automationId)?.name || item.automationName || "").toLowerCase().includes(query);
				});
			}
			return items;
		}, [
			runningRecordItems,
			completedItems,
			archivedItems,
			filterStatus,
			searchQuery,
			automationById
		]);
		const groupedRecords = (0, import_react$1.useMemo)(() => {
			const groups = [];
			const groupMap = /* @__PURE__ */ new Map();
			const now = /* @__PURE__ */ new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const yesterday = /* @__PURE__ */ new Date(today.getTime() - 864e5);
			for (const item of filteredCompletedItems) {
				if (item.archived) continue;
				const finishedAt = item.finishedAt || item.startedAt;
				const date = new Date(finishedAt);
				const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
				let label;
				if (dateDay.getTime() === today.getTime()) label = t("automation.dateGroup.today");
				else if (dateDay.getTime() === yesterday.getTime()) label = t("automation.dateGroup.yesterday");
				else label = `${[
					t("automation.day.SU"),
					t("automation.day.MO"),
					t("automation.day.TU"),
					t("automation.day.WE"),
					t("automation.day.TH"),
					t("automation.day.FR"),
					t("automation.day.SA")
				][date.getDay()]} (${date.getMonth() + 1}/${date.getDate()})`;
				if (!groupMap.has(label)) groupMap.set(label, []);
				groupMap.get(label).push(item);
			}
			for (const [label, items] of groupMap) groups.push({
				label,
				items
			});
			return groups;
		}, [filteredCompletedItems, t]);
		const archivedRecords = (0, import_react$1.useMemo)(() => filteredCompletedItems.filter((item) => item.archived), [filteredCompletedItems]);
		const handleToggleBatchMode = (0, import_react$1.useCallback)(() => {
			setIsBatchMode((prev) => !prev);
			setSelectedIds(/* @__PURE__ */ new Set());
		}, []);
		const handleToggleSelect = (0, import_react$1.useCallback)((id) => {
			setSelectedIds((prev) => {
				const next = new Set(prev);
				if (next.has(id)) next.delete(id);
				else next.add(id);
				return next;
			});
		}, []);
		const handleSelectAll = (0, import_react$1.useCallback)(() => {
			const allIds = [...scheduledAutomations, ...pausedAutomations].map((a) => a.id);
			setSelectedIds((prev) => allIds.length > 0 && prev.size === allIds.length ? /* @__PURE__ */ new Set() : new Set(allIds));
		}, [scheduledAutomations, pausedAutomations]);
		/**
		* 批量删除：命令式 `Modal.confirm`。点击"删除"按钮即弹出确认，
		* 不再依赖 `showBatchDeleteConfirm` state 触发声明式弹窗。
		*/
		const handleBatchDelete = (0, import_react$1.useCallback)(() => {
			if (selectedIds.size === 0) return;
			const targetIds = new Set(selectedIds);
			Modal.confirm({
				title: t("automation.batch.deleteConfirm.title", { count: targetIds.size }),
				content: t("automation.batch.deleteConfirm.description"),
				okText: t("common.delete"),
				cancelText: t("common.cancel"),
				okType: "danger",
				onOk: async () => {
					let successCount = 0;
					let failCount = 0;
					for (const id of targetIds) try {
						if ((await adapter.deleteAutomation(id))?.success) successCount += 1;
						else failCount += 1;
					} catch {
						failCount += 1;
					}
					setSelectedIds(/* @__PURE__ */ new Set());
					setIsBatchMode(false);
					if (successCount > 0) message.success(t("automation.toast.deleted"));
					if (failCount > 0) message.error(t("automation.error.delete"));
					refresh(true);
				}
			});
		}, [
			adapter,
			selectedIds,
			refresh,
			t
		]);
		const handleRowRunTest = (0, import_react$1.useCallback)(async (automationId) => {
			try {
				const result = await adapter.testAutomation(automationId);
				if (!result.success) {
					message.error(result.message || t("automation.error.test"));
					return;
				}
				message.success(t("automation.toast.testTriggered"));
				refresh(true);
			} catch (error) {
				message.error(error?.message || t("automation.error.test"));
			}
		}, [
			adapter,
			t,
			refresh
		]);
		const handleRowTogglePause = (0, import_react$1.useCallback)(async (automationId, currentStatus) => {
			const nextStatus = currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE";
			try {
				const automation = snapshot?.automations.find((a) => a.id === automationId);
				if (!automation) return;
				const draftForToggle = buildDraft(automation);
				const result = await adapter.updateAutomation(buildAutomationPayload("suggested update", {
					...draftForToggle,
					status: nextStatus
				}, automationId));
				if (!result.success) {
					message.error(result.message || t("automation.error.save"));
					return;
				}
				refresh(true);
			} catch (error) {
				message.error(error?.message || t("automation.error.save"));
			}
		}, [
			adapter,
			snapshot,
			buildDraft,
			t,
			refresh
		]);
		/**
		* 列表行点击删除：命令式 `Modal.confirm`。
		* 不再用 `pendingDeleteId` state 当"显示弹窗"开关，被删任务 id 直接闭包到 onOk。
		* 弹窗标题里的任务名按当前 snapshot 即时解析（拿不到名字时退化为空串，
		* 与原 `<DeleteConfirmModal>` 行为一致）。
		*/
		const handleRowDelete = (0, import_react$1.useCallback)((automationId) => {
			const name = snapshot?.automations.find((a) => a.id === automationId)?.name || "";
			Modal.confirm({
				title: t("automation.delete.title", { name }),
				content: t("automation.delete.description"),
				okText: t("automation.delete.confirm"),
				cancelText: t("common.cancel"),
				okType: "danger",
				onOk: async () => {
					try {
						const result = await adapter.deleteAutomation(automationId);
						if (result?.success === false) {
							message.error(result.message || t("automation.error.delete"));
							return false;
						}
						refresh(true);
						message.success(t("automation.toast.deleted"));
					} catch (error) {
						message.error(error?.message || t("automation.error.delete"));
						return false;
					}
				}
			});
		}, [
			adapter,
			snapshot,
			t,
			refresh
		]);
		const allTasksEmpty = scheduledAutomations.length === 0 && pausedAutomations.length === 0;
		const allRecordsEmpty = completedItems.length === 0 && archivedItems.length === 0 && runningRecordItems.length === 0;
		const isToolbarRightHidden = !showTemplatePage && activeTab === "tasks" && allTasksEmpty && showDefaultTemplateGrid || !showTemplatePage && activeTab === "records" && allRecordsEmpty;
		const [isNarrowToolbar, setIsNarrowToolbar] = (0, import_react$1.useState)(false);
		const toolbarRoRef = (0, import_react$1.useRef)(null);
		const toolbarRef = (0, import_react$1.useCallback)((el) => {
			toolbarRoRef.current?.disconnect();
			toolbarRoRef.current = null;
			if (!el) return;
			const narrowThreshold = getLocale().startsWith("zh") ? 600 : 720;
			const ro = new ResizeObserver(([entry]) => {
				setIsNarrowToolbar(entry.contentRect.width < narrowThreshold);
			});
			ro.observe(el);
			toolbarRoRef.current = ro;
		}, []);
		if (!isLocalAutomation) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "automation-panel code-buddy-automation",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "atm-empty",
				children: t("automation.unsupported")
			})
		});
		if ((editingAutomation || isCreating) && draft) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationEditModeView, {
			t,
			selectedInboxItem,
			onCloseInboxDetail: handleCloseInboxDetail,
			onRetryInboxConversation: handleRetryInboxConversation,
			permissionConfirmDialog: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationPermissionConfirmDialog, {
				open: showPermissionConfirm,
				onConfirm: handlePermissionConfirm,
				onCancel: handlePermissionCancel,
				onFallbackToDefault: handlePermissionFallback
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(EditModal, {
				adapter,
				mode: isCreating ? "create" : "edit",
				draft,
				setDraft: (next) => setDraft(next),
				saving,
				t,
				runCount: editingAutomation ? getRunCount(editingAutomation.id) : 0,
				nextRunAt: editingAutomation?.nextRunAt,
				onSave: requestSaveWithPermissionCheck,
				onDelete: isCreating ? void 0 : handleDelete,
				onTogglePause: isCreating ? void 0 : handleTogglePause,
				onTest: isCreating ? void 0 : handleTest,
				onClose: handleCloseModal,
				automationId: editingAutomation?.id,
				createdAt: editingAutomation?.created_at,
				externalWorkspaceFolders,
				onOpenConnectorSettings: handleOpenConnectorSettingsWithDraft,
				onSummonExpert: handleSummonExpertWithDraft,
				inboxItems: [...runningRecordItems, ...snapshot?.inbox || []],
				onOpenConversation: handleOpenConversation,
				onOpenInboxItem: handleOpenInboxItem,
				onArchiveItem: handleArchive,
				onDeleteItem: handleDeleteArchived,
				expertFacade
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "automation-panel code-buddy-automation",
			children: [
				showTemplatePage ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: `atm-toolbar atm-toolbar--breadcrumb${needTrafficLightOffset ? " atm-toolbar--traffic-light-offset" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-toolbar-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarNewTaskButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Breadcrumb, {
								highlightLast: true,
								leadingIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-detail-status-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AlarmClockIcon, { className: "atm-task-status-icon atm-task-status-icon--scheduled" })
								}),
								items: [{
									key: "automation",
									label: t("automation.title"),
									onClick: (e) => {
										e.preventDefault();
										handleBackToAutomationList();
									}
								}, {
									key: "templates",
									label: t("automation.toolbar.addFromTemplate")
								}]
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					ref: toolbarRef,
					className: [
						"atm-toolbar",
						needTrafficLightOffset && "atm-toolbar--traffic-light-offset",
						isNarrowToolbar && "atm-toolbar--narrow"
					].filter(Boolean).join(" "),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-toolbar-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarNewTaskButton, {}),
							isBatchMode ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-batch-info",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
										type: "button",
										variant: "grey",
										size: "medium",
										onClick: handleSelectAll,
										children: selectedIds.size > 0 && selectedIds.size === scheduledAutomations.length + pausedAutomations.length ? t("automation.batch.deselectAll") : t("automation.batch.selectAll")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
										type: "button",
										variant: "primary",
										danger: true,
										size: "medium",
										disabled: selectedIds.size === 0,
										onClick: handleBatchDelete,
										children: t("automation.batch.delete")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
										className: "atm-batch-count",
										children: (() => {
											const [prefix, suffix = ""] = t("automation.batch.selected").split("{count}");
											return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
												prefix,
												/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
													className: "atm-batch-count-num",
													children: selectedIds.size
												}),
												suffix
											] });
										})()
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Segmented, {
								className: "atm-tabs",
								value: activeTab,
								onChange: setActiveTab,
								options: [{
									value: "tasks",
									label: t("automation.tab.scheduledTasks")
								}, {
									value: "records",
									label: t("automation.tab.runRecords")
								}]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-toolbar-right",
						children: isBatchMode ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							type: "button",
							variant: "grey",
							className: "atm-toolbar-btn",
							onClick: handleToggleBatchMode,
							children: t("automation.batch.exit")
						}) : isToolbarRightHidden ? null : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
							activeTab === "records" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "atm-filter-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Dropdown$1, {
									placement: "bottom-end",
									portalRoot: "body",
									trigger: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Button, {
										type: "button",
										variant: "ghost",
										iconOnly: true,
										className: `atm-filter-btn ${filterStatus !== "all" ? "atm-filter-btn--active" : ""}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbFilterIcon, { style: { color: "var(--wb-color-text-secondary)" } }), filterStatus !== "all" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "atm-filter-dot" })]
									}),
									items: [
										"all",
										"success",
										"failed",
										"running",
										"archived"
									].map((status) => ({
										key: status,
										label: t(`automation.filter.${status}`),
										selected: filterStatus === status
									})),
									open: showFilterDropdown,
									onOpenChange: setShowFilterDropdown,
									onSelect: (key) => setFilterStatus(key)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Search, {
								className: "atm-search-input",
								variant: "filled",
								placeholder: t("automation.toolbar.search"),
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value)
							}),
							activeTab === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
									type: "button",
									variant: "grey",
									className: "atm-toolbar-btn",
									iconOnly: isNarrowToolbar,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AtmBatchManageIcon, {}),
									"aria-label": t("automation.toolbar.batchManage"),
									onClick: handleToggleBatchMode,
									children: !isNarrowToolbar && t("automation.toolbar.batchManage")
								}),
								showTemplateEntryButton && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
									type: "button",
									variant: "grey",
									className: "atm-toolbar-btn",
									iconOnly: isNarrowToolbar,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AtmAddFromTemplateIcon, {}),
									"aria-label": t("automation.toolbar.addFromTemplate"),
									onClick: handleOpenTemplatePage,
									children: !isNarrowToolbar && t("automation.toolbar.addFromTemplate")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
									type: "button",
									variant: "primary",
									className: "atm-create-btn",
									iconOnly: isNarrowToolbar,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbAddIcon, {}),
									"aria-label": t("automation.toolbar.addAutomation"),
									"data-track-id": "automation_add",
									"data-track-name": "添加自动化",
									"data-track-props": "{\"type\":\"add\"}",
									onClick: handleCreateButtonClick,
									children: !isNarrowToolbar && t("automation.toolbar.addAutomation")
								})
							] })
						] })
					})]
				}),
				loading && !snapshot ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Loading, {
					className: "atm-loading",
					size: "small",
					tip: t("common.loading")
				}) : !snapshot && loadError ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-empty",
					children: t("automation.error.loadDetail", { error: loadError })
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children: showTemplatePage ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-template-page",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationTemplateGrid, {
						templates: AUTOMATION_TEMPLATES,
						getText: (key) => t(key),
						onSelectTemplate: handleTemplateSelect,
						variant: "compact"
					})
				}) : activeTab === "tasks" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children: allTasksEmpty && showDefaultTemplateGrid ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-empty-state",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-empty-state-hero",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "atm-empty-state-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationEmptyAlarmIcon, {
									width: 48,
									height: 48
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "atm-empty-state-text",
								children: t("automation.empty.firstTask")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "atm-empty-state-actions",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Button, {
									type: "button",
									variant: "secondary",
									className: "atm-empty-action-btn",
									onClick: handleCreateButtonClick,
									children: ["+ ", t("automation.toolbar.addAutomation")]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-empty-state-templates",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-empty-state-templates-title",
							children: t("automation.templates.sectionTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationTemplateGrid, {
							templates: AUTOMATION_TEMPLATES,
							getText: (key) => t(key),
							onSelectTemplate: handleTemplateSelect,
							variant: "compact"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-task-list",
					children: [
						filteredRunningAutomations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-task-group-label",
							children: t("automation.list.groupRunning")
						}),
						filteredRunningAutomations.map((automation) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationRow, {
							automation,
							runtimeState: snapshot?.runtimeState?.[automation.id],
							t,
							onEdit: handleEdit,
							onRunTest: handleRowRunTest,
							onTogglePause: handleRowTogglePause,
							onDelete: handleRowDelete,
							isBatchMode,
							isSelected: selectedIds.has(automation.id),
							onToggleSelect: handleToggleSelect
						}, automation.id)),
						filteredScheduledAutomations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-task-group-label",
							children: t("automation.list.groupCurrent")
						}),
						filteredScheduledAutomations.map((automation) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationRow, {
							automation,
							runtimeState: snapshot?.runtimeState?.[automation.id],
							t,
							onEdit: handleEdit,
							onRunTest: handleRowRunTest,
							onTogglePause: handleRowTogglePause,
							onDelete: handleRowDelete,
							isBatchMode,
							isSelected: selectedIds.has(automation.id),
							onToggleSelect: handleToggleSelect
						}, automation.id)),
						filteredPausedAutomations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-task-group-label",
							children: t("automation.list.groupPaused")
						}),
						filteredPausedAutomations.map((automation) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationRow, {
							automation,
							runtimeState: snapshot?.runtimeState?.[automation.id],
							t,
							onEdit: handleEdit,
							onRunTest: handleRowRunTest,
							onTogglePause: handleRowTogglePause,
							onDelete: handleRowDelete,
							isBatchMode,
							isSelected: selectedIds.has(automation.id),
							onToggleSelect: handleToggleSelect
						}, automation.id))
					]
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children: allRecordsEmpty || filteredCompletedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-empty-state atm-empty-state--records",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-empty-state-hero",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-empty-state-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationEmptyRecordsIcon, {
								width: 48,
								height: 48
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-empty-state-text",
							children: allRecordsEmpty ? t("automation.empty.noRecords") : t("automation.empty.noFilteredRecords")
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-records-list",
					children: [groupedRecords.map((group) => {
						const isCollapsed = collapsedGroups.has(group.label);
						return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "atm-records-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-records-group-label",
								onClick: () => setCollapsedGroups((prev) => {
									const next = new Set(prev);
									if (next.has(group.label)) next.delete(group.label);
									else next.add(group.label);
									return next;
								}),
								children: [group.label, /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronDownIcon, {
									width: 14,
									height: 14,
									className: `atm-records-group-chevron${isCollapsed ? " atm-records-group-chevron--collapsed" : ""}`
								})]
							}), !isCollapsed && group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InboxRow, {
								item,
								t,
								archived: !!item.archived,
								fallbackCwd: automationById.get(item.automationId)?.cwds?.[0],
								onArchive: handleArchive,
								onDelete: handleDeleteArchived,
								onOpenItem: handleOpenInboxItem
							}, item.id))]
						}, group.label);
					}), archivedRecords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-records-group atm-records-group--archived",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "atm-records-group-label",
							onClick: () => setArchivedGroupOpen((v) => !v),
							children: [t("automation.filter.archived"), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronDownIcon, {
								width: 14,
								height: 14,
								className: `atm-records-group-chevron${archivedGroupOpen ? "" : " atm-records-group-chevron--collapsed"}`
							})]
						}), archivedGroupOpen && archivedRecords.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InboxRow, {
							item,
							t,
							archived: !!item.archived,
							fallbackCwd: automationById.get(item.automationId)?.cwds?.[0],
							onArchive: handleArchive,
							onDelete: handleDeleteArchived,
							onOpenItem: handleOpenInboxItem
						}, item.id))]
					})]
				}) }) }),
				selectedInboxItem && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationInboxDetail, {
					item: selectedInboxItem,
					t,
					onClose: handleCloseInboxDetail,
					onRetryConversation: handleRetryInboxConversation
				})
			]
		});
	};
	AutomationRow = ({ automation, runtimeState, t, onEdit, onRunTest, onTogglePause, onDelete, isBatchMode, isSelected, onToggleSelect }) => {
		const nextRun = automation.nextRunAt;
		const scheduleDesc = describeAutomationSchedule(automation, t);
		const validityDesc = describeValidityRange(automation, t);
		const projectNames = automation.cwds.map((cwd) => formatAutomationCwdLabel(cwd, t));
		const isActive = automation.status === "ACTIVE";
		const displayStatus = runtimeState?.displayStatus;
		const displayStatusLabel = getAutomationDisplayStatusLabel(displayStatus, t);
		const runningStatusLabel = getAutomationRunningStatusLabel(runtimeState, t);
		const [menuOpen, setMenuOpen] = (0, import_react$1.useState)(false);
		const handleClick = (0, import_react$1.useCallback)(() => {
			if (isBatchMode && onToggleSelect) onToggleSelect(automation.id);
			else onEdit(automation);
		}, [
			isBatchMode,
			onToggleSelect,
			automation,
			onEdit
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: `atm-row ${isBatchMode ? "atm-row--batch" : ""} ${menuOpen ? "atm-row--menu-open" : ""}`,
			onClick: handleClick,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "atm-row-left",
				children: [isBatchMode && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "atm-row-leading",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Checkbox, {
						size: "medium",
						className: "atm-row-checkbox",
						checked: !!isSelected,
						readOnly: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-row-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-row-main",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-row-name",
							children: automation.name
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-row-meta",
						children: [
							projectNames.map((name) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "atm-row-project",
								title: name,
								children: name
							}, `${automation.id}-${name}`)),
							scheduleDesc && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "atm-row-schedule",
								title: scheduleDesc,
								children: scheduleDesc
							}),
							validityDesc && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "atm-row-validity",
								title: validityDesc,
								children: validityDesc
							})
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "atm-row-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "atm-row-right-text",
					children: displayStatusLabel ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: `atm-row-paused-label atm-row-display-status ${displayStatus || ""}`,
						children: displayStatusLabel
					}) : runningStatusLabel ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-row-paused-label atm-row-display-status running",
						children: runningStatusLabel
					}) : isActive && nextRun ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-row-next",
						children: t("automation.row.startsIn", { time: formatRelativeTime(nextRun, t) })
					}) : !isActive ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-row-paused-label",
						children: t("automation.row.paused")
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-row-paused-label",
						children: t("automation.row.noUpcomingRun")
					})
				}), !isBatchMode && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-row-hover-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
						content: t("automation.modal.test"),
						placement: "top",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							type: "button",
							variant: "ghost",
							iconOnly: true,
							className: "atm-row-action-btn",
							onClick: (e) => {
								e.stopPropagation();
								onRunTest?.(automation.id);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PlayIcon, {
								width: 16,
								height: 16
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Dropdown$1, {
						triggerMode: "click",
						placement: "bottom-end",
						portalRoot: "body",
						open: menuOpen,
						onOpenChange: setMenuOpen,
						trigger: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-row-more-hint",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MoreDotsIcon, {
								width: 16,
								height: 16
							})
						}),
						items: [{
							key: "toggle",
							icon: automation.status === "ACTIVE" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CirclePauseIcon, {
								width: 14,
								height: 14
							}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ResumeCircleIcon, {
								width: 14,
								height: 14
							}),
							label: automation.status === "ACTIVE" ? t("automation.modal.pause") : t("automation.modal.resume")
						}, {
							key: "delete",
							icon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {
								width: 14,
								height: 14
							}),
							label: t("common.delete")
						}],
						onSelect: (key) => {
							if (key === "toggle") onTogglePause?.(automation.id, automation.status);
							else if (key === "delete") onDelete?.(automation.id);
						}
					})]
				})]
			})]
		});
	};
	getAutomationDisplayStatusLabel = (status, tFn) => {
		if (!status) return;
		return tFn({
			missed_pending: "automation.row.missedPending",
			waiting_login: "automation.row.waitingLogin",
			queued: "automation.row.queued",
			expired: "automation.row.expired",
			interrupted: "automation.row.interrupted",
			ownership_conflict: "automation.row.ownershipConflict"
		}[status]);
	};
	getInboxStatusClass = (item) => getInboxDetailStatusClass(item);
	InboxRow = ({ item, t, archived, fallbackCwd, onArchive, onDelete, onOpenItem }) => {
		const statusClass = getInboxStatusClass(item);
		const statusLabel = getInboxStatusLabel(item, t);
		const isRunningRecord = isInboxRunningItem(item);
		const executionDate = new Date(item.finishedAt || item.startedAt);
		const executionTime = executionDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		});
		const executionDateTime = `${executionDate.toLocaleDateString([], {
			month: "2-digit",
			day: "2-digit"
		})} ${executionTime}`;
		const handleArchiveClick = (0, import_react$1.useCallback)((e) => {
			e.stopPropagation();
			onArchive?.(item.id);
		}, [item.id, onArchive]);
		const handleDeleteClick = (0, import_react$1.useCallback)((e) => {
			e.stopPropagation();
			onDelete?.(item.id);
		}, [item.id, onDelete]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: `atm-row atm-inbox-row ${archived ? "atm-archived" : ""} ${isRunningRecord ? "atm-inbox-row--running" : ""}`,
			onClick: () => onOpenItem(item, fallbackCwd),
			"data-track-id": "automation_view_logs",
			"data-track-name": "查看执行记录",
			"data-track-props": JSON.stringify({
				source: item.automationId,
				type: "view_logs"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "atm-row-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-row-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-row-main atm-row-main-inbox",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-row-name",
							children: item.automationName
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-row-result-label",
						title: statusLabel,
						children: statusLabel
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "atm-row-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
					className: "atm-row-right-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-row-time",
						children: archived ? executionDateTime : executionTime
					}), archived ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArchiveIcon, {
						size: 16,
						color: "var(--wb-color-text-disabled, #000)"
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InboxStatusIcon, { statusClass })]
				}), !isRunningRecord && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-row-hover-actions",
					children: [!archived && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
						type: "button",
						variant: "ghost",
						iconOnly: true,
						className: "atm-row-archive-btn",
						title: t("automation.action.archive"),
						"aria-label": t("automation.action.archive"),
						onClick: handleArchiveClick,
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArchiveIcon, {
							width: 14,
							height: 14
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
						type: "button",
						variant: "ghost",
						iconOnly: true,
						className: "atm-row-delete-btn",
						title: t("common.delete"),
						"aria-label": t("common.delete"),
						onClick: handleDeleteClick,
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {
							width: 14,
							height: 14
						})
					})]
				})]
			})]
		});
	};
	FLOATING_DROPDOWN_DEFAULT_Z_INDEX = 1100;
	useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react$1.useLayoutEffect : import_react$1.useEffect;
	SingleDatePicker = ({ value, t, disabled, onChange }) => {
		const rootRef = (0, import_react$1.useRef)(null);
		const dropdownRef = (0, import_react$1.useRef)(null);
		const [isOpen, setIsOpen] = (0, import_react$1.useState)(false);
		const [viewMonth, setViewMonth] = (0, import_react$1.useState)(() => {
			const baseDate = parseDateInputDate(value) || /* @__PURE__ */ new Date();
			return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
		});
		const isZh = getDayLabel("MO", t).startsWith("周");
		const sundayStart = !isZh;
		const todayDateValue = getTodayDateInputValue();
		const displayText = formatScheduledDateDisplay(value, t) || t("automation.datePicker.placeholder");
		const hintText = formatScheduledDateDisplay(value, t) || t("automation.datePicker.pickDate");
		const weekdayLabels = (0, import_react$1.useMemo)(() => getCalendarWeekdays(sundayStart).map((day) => {
			const label = getDayLabel(day, t);
			return label.startsWith("周") && label.length >= 2 ? label.slice(1) : label;
		}), [sundayStart, t]);
		const calendarCells = (0, import_react$1.useMemo)(() => buildValidityCalendarCells(viewMonth, value, value, void 0, sundayStart), [
			sundayStart,
			value,
			viewMonth
		]);
		const calendarTitle = (0, import_react$1.useMemo)(() => viewMonth.toLocaleDateString(isZh ? "zh-CN" : "en-US", {
			year: "numeric",
			month: "long"
		}), [isZh, viewMonth]);
		const dropdownStyle = useFloatingDropdownStyle(rootRef, dropdownRef, isOpen, {
			preferredPlacement: "top",
			width: 340,
			maxWidth: "min(340px, calc(100vw - 64px))",
			estimatedHeight: 360,
			horizontalMargin: 32
		});
		(0, import_react$1.useEffect)(() => {
			if (!isOpen) return;
			const handleClickOutside = (event) => {
				if (!isEventInsideRef(rootRef, event.target) && !isEventInsideRef(dropdownRef, event.target)) setIsOpen(false);
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [isOpen]);
		const openPicker = (0, import_react$1.useCallback)(() => {
			if (disabled) return;
			const baseDate = parseDateInputDate(value) || /* @__PURE__ */ new Date();
			setViewMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
			setIsOpen(true);
		}, [disabled, value]);
		const handleToggleOpen = (0, import_react$1.useCallback)(() => {
			if (isOpen) {
				setIsOpen(false);
				return;
			}
			openPicker();
		}, [isOpen, openPicker]);
		const handleTriggerKeyDown = (0, import_react$1.useCallback)((event) => {
			if (disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleToggleOpen();
			}
			if (event.key === "Escape") setIsOpen(false);
		}, [disabled, handleToggleOpen]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "atm-validity-picker atm-single-date-picker",
			ref: rootRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: `atm-validity-trigger ${isOpen ? "active" : ""} ${disabled ? "disabled" : ""}`,
				role: "button",
				tabIndex: disabled ? -1 : 0,
				onClick: handleToggleOpen,
				onKeyDown: handleTriggerKeyDown,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "atm-validity-value",
					children: displayText
				})
			}), isOpen && renderFloatingDropdown(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "atm-validity-dropdown",
				ref: dropdownRef,
				style: dropdownStyle,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-validity-calendar-header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-validity-nav-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, -12)),
									children: "«"
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, -1)),
									children: "‹"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "atm-validity-title",
								children: calendarTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-validity-nav-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, 1)),
									children: "›"
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, 12)),
									children: "»"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-validity-weekdays",
						children: weekdayLabels.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-validity-weekday",
							children: label
						}, `${label}-${index}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-validity-days",
						children: calendarCells.map((cell) => {
							const isDisabledDate = compareDateInputValues(cell.dateValue, todayDateValue) < 0;
							return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: [
									"atm-validity-day",
									cell.isCurrentMonth ? "" : "other-month",
									cell.isToday ? "today" : "",
									cell.isRangeStart ? "range-start" : "",
									cell.isRangeEnd ? "range-end" : ""
								].filter(Boolean).join(" "),
								disabled: isDisabledDate,
								onClick: () => {
									if (isDisabledDate) return;
									onChange(cell.dateValue);
									setIsOpen(false);
								},
								children: cell.dayNumber
							}, cell.dateValue);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-validity-calendar-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-validity-hint-text",
							children: hintText
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "atm-validity-today-btn",
							onClick: () => {
								const today = /* @__PURE__ */ new Date();
								const todayValue = formatDateInputValue(today);
								setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1));
								onChange(todayValue);
								setIsOpen(false);
							},
							children: t("automation.validity.today")
						})]
					})
				]
			}))]
		});
	};
	ValidityRangePicker = ({ startDate, endDate, t, disabled, onChange }) => {
		const rootRef = (0, import_react$1.useRef)(null);
		const dropdownRef = (0, import_react$1.useRef)(null);
		const [isOpen, setIsOpen] = (0, import_react$1.useState)(false);
		const [hoverDateValue, setHoverDateValue] = (0, import_react$1.useState)(void 0);
		const [viewMonth, setViewMonth] = (0, import_react$1.useState)(() => {
			const baseDate = parseDateInputDate(endDate || startDate) || /* @__PURE__ */ new Date();
			return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
		});
		const hasValue = !!startDate || !!endDate;
		const isZh = getDayLabel("MO", t).startsWith("周");
		const sundayStart = !isZh;
		const todayDateValue = getTodayDateInputValue();
		const displayText = (0, import_react$1.useMemo)(() => {
			if (startDate && endDate) return `${formatDateSlashDisplay(startDate)} — ${formatDateSlashDisplay(endDate)}`;
			if (startDate) return `${formatDateSlashDisplay(startDate)} —`;
			return t("automation.validity.placeholder");
		}, [
			endDate,
			startDate,
			t
		]);
		const hintText = (0, import_react$1.useMemo)(() => {
			if (!startDate) return t("automation.validity.pickStart");
			if (!endDate) return t("automation.validity.pickEnd");
			return `${formatDateSlashDisplay(startDate)} — ${formatDateSlashDisplay(endDate)}`;
		}, [
			endDate,
			startDate,
			t
		]);
		const weekdayLabels = (0, import_react$1.useMemo)(() => getCalendarWeekdays(sundayStart).map((day) => {
			const label = getDayLabel(day, t);
			return label.startsWith("周") && label.length >= 2 ? label.slice(1) : label;
		}), [sundayStart, t]);
		const calendarCells = (0, import_react$1.useMemo)(() => buildValidityCalendarCells(viewMonth, startDate, endDate, hoverDateValue, sundayStart), [
			endDate,
			hoverDateValue,
			startDate,
			sundayStart,
			viewMonth
		]);
		const calendarTitle = (0, import_react$1.useMemo)(() => viewMonth.toLocaleDateString(isZh ? "zh-CN" : "en-US", {
			year: "numeric",
			month: "long"
		}), [isZh, viewMonth]);
		const dropdownStyle = useFloatingDropdownStyle(rootRef, dropdownRef, isOpen, {
			preferredPlacement: "top",
			width: 340,
			maxWidth: "min(340px, calc(100vw - 64px))",
			estimatedHeight: 360,
			horizontalMargin: 32
		});
		(0, import_react$1.useEffect)(() => {
			if (!isOpen) {
				setHoverDateValue(void 0);
				return;
			}
			const handleClickOutside = (event) => {
				if (!isEventInsideRef(rootRef, event.target) && !isEventInsideRef(dropdownRef, event.target)) {
					setIsOpen(false);
					setHoverDateValue(void 0);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [isOpen]);
		const openPicker = (0, import_react$1.useCallback)(() => {
			if (disabled) return;
			const baseDate = parseDateInputDate(endDate || startDate) || /* @__PURE__ */ new Date();
			setViewMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
			setIsOpen(true);
		}, [
			disabled,
			endDate,
			startDate
		]);
		const handleToggleOpen = (0, import_react$1.useCallback)(() => {
			if (isOpen) {
				setIsOpen(false);
				setHoverDateValue(void 0);
				return;
			}
			openPicker();
		}, [isOpen, openPicker]);
		const handleSelectDate = (0, import_react$1.useCallback)((dateValue) => {
			if (isDateBeforeToday(dateValue)) return;
			if (!startDate || endDate) {
				onChange(dateValue, "");
				setHoverDateValue(void 0);
				return;
			}
			if (compareDateInputValues(dateValue, startDate) < 0) onChange(dateValue, startDate);
			else onChange(startDate, dateValue);
			setHoverDateValue(void 0);
			setIsOpen(false);
		}, [
			endDate,
			onChange,
			startDate
		]);
		const handleClear = (0, import_react$1.useCallback)((event) => {
			event.stopPropagation();
			onChange("", "");
			setHoverDateValue(void 0);
		}, [onChange]);
		const handleTriggerKeyDown = (0, import_react$1.useCallback)((event) => {
			if (disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleToggleOpen();
			}
			if (event.key === "Escape") {
				setIsOpen(false);
				setHoverDateValue(void 0);
			}
		}, [disabled, handleToggleOpen]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "atm-validity-picker",
			ref: rootRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: `atm-validity-trigger ${isOpen ? "active" : ""} ${hasValue ? "has-value" : ""} ${disabled ? "disabled" : ""}`,
				role: "button",
				tabIndex: disabled ? -1 : 0,
				onClick: handleToggleOpen,
				onKeyDown: handleTriggerKeyDown,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: hasValue ? "atm-validity-value" : "atm-validity-placeholder",
					children: displayText
				}), hasValue && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-validity-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
						type: "button",
						className: "atm-validity-clear",
						title: t("automation.validity.clear"),
						onClick: handleClear,
						disabled,
						children: "×"
					})
				})]
			}), isOpen && renderFloatingDropdown(/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "atm-validity-dropdown",
				ref: dropdownRef,
				style: dropdownStyle,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-validity-calendar-header",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-validity-nav-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, -12)),
									children: "«"
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, -1)),
									children: "‹"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "atm-validity-title",
								children: calendarTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-validity-nav-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, 1)),
									children: "›"
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-validity-nav-btn",
									onClick: () => setViewMonth((current) => shiftCalendarMonth(current, 12)),
									children: "»"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-validity-weekdays",
						children: weekdayLabels.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-validity-weekday",
							children: label
						}, `${label}-${index}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-validity-days",
						onMouseLeave: () => setHoverDateValue(void 0),
						children: calendarCells.map((cell) => {
							const isDisabledDate = compareDateInputValues(cell.dateValue, todayDateValue) < 0;
							return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: [
									"atm-validity-day",
									cell.isCurrentMonth ? "" : "other-month",
									cell.isToday ? "today" : "",
									cell.isRangeStart ? "range-start" : "",
									cell.isRangeEnd ? "range-end" : "",
									cell.isInRange ? "in-range" : "",
									cell.isPreviewStart ? "preview-start" : "",
									cell.isPreviewEnd ? "preview-end" : "",
									cell.isPreviewInRange ? "preview-in-range" : ""
								].filter(Boolean).join(" "),
								disabled: isDisabledDate,
								onClick: () => handleSelectDate(cell.dateValue),
								onMouseEnter: () => {
									if (isDisabledDate) return;
									if (startDate && !endDate) setHoverDateValue(cell.dateValue);
								},
								children: cell.dayNumber
							}, cell.dateValue);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-validity-calendar-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-validity-hint-text",
							children: hintText
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "atm-validity-today-btn",
							onClick: () => {
								const today = /* @__PURE__ */ new Date();
								setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1));
								handleSelectDate(formatDateInputValue(today));
							},
							children: t("automation.validity.today")
						})]
					})
				]
			}))]
		});
	};
	TimePicker = ({ value, t, disabled, onChange }) => {
		const rootRef = (0, import_react$1.useRef)(null);
		const dropdownRef = (0, import_react$1.useRef)(null);
		const hourListRef = (0, import_react$1.useRef)(null);
		const minuteListRef = (0, import_react$1.useRef)(null);
		const [isOpen, setIsOpen] = (0, import_react$1.useState)(false);
		const normalizedValue = (0, import_react$1.useMemo)(() => normalizeTimeValue(value), [value]);
		const { hour, minute } = (0, import_react$1.useMemo)(() => parseTimeValue(normalizedValue), [normalizedValue]);
		const dropdownStyle = useFloatingDropdownStyle(rootRef, dropdownRef, isOpen, {
			preferredPlacement: "top",
			width: 220,
			estimatedHeight: 280
		});
		(0, import_react$1.useEffect)(() => {
			if (!isOpen) return;
			const handleClickOutside = (event) => {
				if (!isEventInsideRef(rootRef, event.target) && !isEventInsideRef(dropdownRef, event.target)) setIsOpen(false);
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [isOpen]);
		(0, import_react$1.useEffect)(() => {
			if (!isOpen) return;
			hourListRef.current?.querySelector(".active")?.scrollIntoView({ block: "center" });
			minuteListRef.current?.querySelector(".active")?.scrollIntoView({ block: "center" });
		}, [
			hour,
			isOpen,
			minute
		]);
		const handleHourSelect = (0, import_react$1.useCallback)((nextHour) => {
			onChange(`${pad2(nextHour)}:${pad2(minute)}`);
		}, [minute, onChange]);
		const handleMinuteSelect = (0, import_react$1.useCallback)((nextMinute) => {
			onChange(`${pad2(hour)}:${pad2(nextMinute)}`);
			setIsOpen(false);
		}, [hour, onChange]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: `atm-time-picker ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}`,
			ref: rootRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
				type: "button",
				className: "atm-time-picker-trigger",
				disabled,
				onClick: () => setIsOpen((current) => !current),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "atm-time-picker-value",
					children: normalizedValue
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AlarmClockIcon, {
					width: 14,
					height: 14,
					className: "atm-time-picker-icon"
				})]
			}), isOpen && renderFloatingDropdown(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "atm-time-picker-dropdown",
				ref: dropdownRef,
				style: dropdownStyle,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-time-picker-columns",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-time-picker-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-time-picker-column-title",
							children: t("automation.timePicker.hour")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-time-picker-options",
							ref: hourListRef,
							children: TIME_PICKER_HOURS.map((optionHour) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: `atm-time-picker-option ${optionHour === hour ? "active" : ""}`,
								onClick: () => handleHourSelect(optionHour),
								children: pad2(optionHour)
							}, optionHour))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-time-picker-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-time-picker-column-title",
							children: t("automation.timePicker.minute")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-time-picker-options",
							ref: minuteListRef,
							children: TIME_PICKER_MINUTES.map((optionMinute) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: `atm-time-picker-option ${optionMinute === minute ? "active" : ""}`,
								onClick: () => handleMinuteSelect(optionMinute),
								children: pad2(optionMinute)
							}, optionMinute))
						})]
					})]
				})
			}))]
		});
	};
	CustomSelect = ({ value, options, placeholder, onChange }) => {
		const [isOpen, setIsOpen] = (0, import_react$1.useState)(false);
		const selectedOption = (0, import_react$1.useMemo)(() => options.find((o) => o.value === value), [options, value]);
		const displayText = selectedOption?.label || placeholder || "";
		const dropdownItems = (0, import_react$1.useMemo)(() => options.map((opt) => ({
			key: opt.value,
			label: opt.label,
			selected: opt.value === value
		})), [options, value]);
		const handleSelect = (0, import_react$1.useCallback)((key) => {
			onChange(key);
		}, [onChange]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: `atm-custom-select ${isOpen ? "open" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Dropdown$1, {
				trigger: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
					type: "button",
					className: `atm-custom-select-trigger ${isOpen ? "open" : ""} ${selectedOption ? "has-value" : "placeholder"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-custom-select-trigger-text",
						children: displayText
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChevronDownIcon, {
						className: "atm-custom-select-trigger-arrow",
						width: 14,
						height: 14
					})]
				}),
				items: dropdownItems,
				onSelect: handleSelect,
				placement: "top-start",
				open: isOpen,
				onOpenChange: setIsOpen,
				className: "atm-dropdown-menu",
				portalRoot: "body"
			})
		});
	};
	WeekdayMultiPicker = ({ values, t, disabled, requireOne, onChange }) => {
		const rootRef = (0, import_react$1.useRef)(null);
		const dropdownRef = (0, import_react$1.useRef)(null);
		const tagsRef = (0, import_react$1.useRef)(null);
		const [isOpen, setIsOpen] = (0, import_react$1.useState)(false);
		const [isOverflow, setIsOverflow] = (0, import_react$1.useState)(false);
		const selectedDays = (0, import_react$1.useMemo)(() => sortWeekdays(values), [values]);
		const hasValue = selectedDays.length > 0;
		const dropdownStyle = useFloatingDropdownStyle(rootRef, dropdownRef, isOpen, {
			preferredPlacement: "top",
			width: 220,
			estimatedHeight: 180
		});
		(0, import_react$1.useEffect)(() => {
			if (!isOpen) return;
			const handleClickOutside = (event) => {
				if (!isEventInsideRef(rootRef, event.target) && !isEventInsideRef(dropdownRef, event.target)) setIsOpen(false);
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [isOpen]);
		(0, import_react$1.useEffect)(() => {
			const el = tagsRef.current;
			if (!el) {
				setIsOverflow(false);
				return;
			}
			const check = () => setIsOverflow(el.scrollWidth > el.clientWidth);
			const id = requestAnimationFrame(check);
			return () => cancelAnimationFrame(id);
		}, [selectedDays]);
		const tooltipText = (0, import_react$1.useMemo)(() => selectedDays.map((d) => getDayLabel(d, t)).join(", "), [selectedDays, t]);
		const handleToggleOpen = (0, import_react$1.useCallback)(() => {
			if (disabled) return;
			setIsOpen((current) => !current);
		}, [disabled]);
		const handleTriggerKeyDown = (0, import_react$1.useCallback)((event) => {
			if (disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleToggleOpen();
			}
			if (event.key === "Escape") setIsOpen(false);
		}, [disabled, handleToggleOpen]);
		const handleToggleDay = (0, import_react$1.useCallback)((day) => {
			const exists = selectedDays.includes(day);
			if (exists && requireOne && selectedDays.length === 1) return;
			onChange(exists ? selectedDays.filter((candidate) => candidate !== day) : sortWeekdays([...selectedDays, day]));
		}, [
			onChange,
			selectedDays,
			requireOne
		]);
		const handleClear = (0, import_react$1.useCallback)((event) => {
			event.stopPropagation();
			onChange([]);
		}, [onChange]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: `atm-weekday-picker ${isOpen ? "open" : ""} ${isOpen ? "dropdown-open" : ""} ${disabled ? "disabled" : ""}`,
			ref: rootRef,
			children: [
				isOverflow && hasValue && !isOpen && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-weekday-picker-tooltip",
					children: tooltipText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: `atm-weekday-picker-trigger ${isOpen ? "active" : ""} ${isOverflow ? "has-overflow" : ""} ${disabled ? "disabled" : ""}`,
					role: "button",
					tabIndex: disabled ? -1 : 0,
					onClick: handleToggleOpen,
					onKeyDown: handleTriggerKeyDown,
					children: hasValue ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-weekday-picker-tags",
						ref: tagsRef,
						children: selectedDays.map((day) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
							className: "atm-weekday-picker-tag",
							children: [getDayLabel(day, t), !(requireOne && selectedDays.length === 1) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "atm-weekday-picker-tag-remove",
								onClick: (event) => {
									event.stopPropagation();
									handleToggleDay(day);
								},
								children: "×"
							})]
						}, day))
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-weekday-picker-placeholder",
						children: t("automation.schedule.selectWeekday")
					})
				}),
				hasValue && !requireOne && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: "atm-weekday-picker-clear",
					title: t("automation.validity.clear"),
					onClick: handleClear,
					disabled,
					children: "×"
				}),
				isOpen && renderFloatingDropdown(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-weekday-picker-dropdown",
					ref: dropdownRef,
					style: dropdownStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-weekday-grid",
						children: ALL_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: `atm-weekday-item ${selectedDays.includes(day) ? "active" : ""}`,
							onClick: () => handleToggleDay(day),
							children: getDayLabel(day, t)
						}, day))
					})
				}))
			]
		});
	};
	MonthdayMultiPicker = ({ values, t, disabled, onChange }) => {
		const rootRef = (0, import_react$1.useRef)(null);
		const dropdownRef = (0, import_react$1.useRef)(null);
		const tagsRef = (0, import_react$1.useRef)(null);
		const [isOpen, setIsOpen] = (0, import_react$1.useState)(false);
		const [isOverflow, setIsOverflow] = (0, import_react$1.useState)(false);
		const selectedDays = (0, import_react$1.useMemo)(() => sortMonthDays(values), [values]);
		const hasValue = selectedDays.length > 0;
		const dayUnit = t("automation.schedule.dayUnit");
		const dropdownStyle = useFloatingDropdownStyle(rootRef, dropdownRef, isOpen, {
			preferredPlacement: "top",
			width: 220,
			estimatedHeight: 180
		});
		(0, import_react$1.useEffect)(() => {
			if (!isOpen) return;
			const handleClickOutside = (event) => {
				if (!isEventInsideRef(rootRef, event.target) && !isEventInsideRef(dropdownRef, event.target)) setIsOpen(false);
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [isOpen]);
		(0, import_react$1.useEffect)(() => {
			const el = tagsRef.current;
			if (!el) {
				setIsOverflow(false);
				return;
			}
			const check = () => setIsOverflow(el.scrollWidth > el.clientWidth);
			const id = requestAnimationFrame(check);
			return () => cancelAnimationFrame(id);
		}, [selectedDays]);
		const formatLabel = (0, import_react$1.useCallback)((day) => `${day}${dayUnit}`, [dayUnit]);
		const tooltipText = (0, import_react$1.useMemo)(() => selectedDays.map((day) => `${day}${dayUnit}`).join(", "), [selectedDays, dayUnit]);
		const handleToggleOpen = (0, import_react$1.useCallback)(() => {
			if (disabled) return;
			setIsOpen((current) => !current);
		}, [disabled]);
		const handleTriggerKeyDown = (0, import_react$1.useCallback)((event) => {
			if (disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleToggleOpen();
			}
			if (event.key === "Escape") setIsOpen(false);
		}, [disabled, handleToggleOpen]);
		const handleToggleDay = (0, import_react$1.useCallback)((day) => {
			onChange(selectedDays.includes(day) ? selectedDays.filter((candidate) => candidate !== day) : sortMonthDays([...selectedDays, day]));
		}, [onChange, selectedDays]);
		const handleClear = (0, import_react$1.useCallback)((event) => {
			event.stopPropagation();
			onChange([]);
		}, [onChange]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: `atm-monthday-picker ${isOpen ? "open" : ""} ${isOpen ? "dropdown-open" : ""} ${disabled ? "disabled" : ""}`,
			ref: rootRef,
			children: [
				isOverflow && hasValue && !isOpen && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-monthday-picker-tooltip",
					children: tooltipText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: `atm-monthday-picker-trigger ${isOpen ? "active" : ""} ${isOverflow ? "has-overflow" : ""} ${disabled ? "disabled" : ""}`,
					role: "button",
					tabIndex: disabled ? -1 : 0,
					onClick: handleToggleOpen,
					onKeyDown: handleTriggerKeyDown,
					children: hasValue ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-monthday-picker-tags",
						ref: tagsRef,
						children: selectedDays.map((day) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
							className: "atm-monthday-picker-tag",
							children: [formatLabel(day), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								type: "button",
								className: "atm-monthday-picker-tag-remove",
								onClick: (event) => {
									event.stopPropagation();
									handleToggleDay(day);
								},
								children: "×"
							})]
						}, day))
					}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "atm-monthday-picker-placeholder",
						children: t("automation.schedule.selectDate")
					})
				}),
				hasValue && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					className: "atm-monthday-picker-clear",
					title: t("automation.validity.clear"),
					onClick: handleClear,
					disabled,
					children: "×"
				}),
				isOpen && renderFloatingDropdown(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "atm-monthday-picker-dropdown",
					ref: dropdownRef,
					style: dropdownStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-monthday-grid",
						children: MONTH_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: `atm-monthday-item ${selectedDays.includes(day) ? "active" : ""}`,
							onClick: () => handleToggleDay(day),
							children: formatLabel(day)
						}, day))
					})
				}))
			]
		});
	};
	EditModal = ({ adapter, mode, draft, setDraft, saving, t, runCount, nextRunAt, onSave, onDelete, onTogglePause, onTest, onClose, externalWorkspaceFolders, automationId, createdAt, onOpenConnectorSettings, onSummonExpert, inboxItems, onOpenConversation, onOpenInboxItem, onArchiveItem, onDeleteItem, expertFacade }) => {
		const overlayRef = (0, import_react$1.useRef)(null);
		const hasPersonalSkills = !!useAgentServices()?.personalSkills;
		const isLocalAutomation = adapter.environmentType === "local";
		const sidebarCollapsed = useConversations()?.sidebarCollapsed ?? false;
		const isMacFullscreen = useMacFullscreen(adapter);
		const needTrafficLightOffset = isMac && isLocalAutomation && sidebarCollapsed && !isMacFullscreen;
		const [internalWorkspaceFolders, setInternalWorkspaceFolders] = (0, import_react$1.useState)([]);
		const [modelOptions, setModelOptions] = (0, import_react$1.useState)([]);
		const [promptBlocks, setPromptBlocks] = (0, import_react$1.useState)(() => buildPromptBlocks(draft.prompt, draft.skills));
		const [isModelSelectorOpen, setIsModelSelectorOpen] = (0, import_react$1.useState)(false);
		const [historyFilter, setHistoryFilter] = (0, import_react$1.useState)("all");
		const [showHistoryFilter, setShowHistoryFilter] = (0, import_react$1.useState)(false);
		const [isExecutionNoticeDismissed, setIsExecutionNoticeDismissed] = (0, import_react$1.useState)(false);
		const selectedModelIdRef = (0, import_react$1.useRef)(draft.modelId);
		(0, import_react$1.useEffect)(() => {
			selectedModelIdRef.current = draft.modelId;
		}, [draft.modelId]);
		(0, import_react$1.useEffect)(() => {
			setIsExecutionNoticeDismissed(false);
		}, [mode, automationId]);
		(0, import_react$1.useEffect)(() => {
			if (externalWorkspaceFolders && externalWorkspaceFolders.length > 0) return;
			adapter.getCurrentWorkspaces().then((workspaces) => {
				setInternalWorkspaceFolders(workspaces);
			}).catch(() => {
				setInternalWorkspaceFolders([]);
			});
		}, [adapter, externalWorkspaceFolders]);
		(0, import_react$1.useEffect)(() => {
			if (!adapter.getModels) {
				setModelOptions([]);
				return;
			}
			const selectedCwd = draft.cwds.split(",").map((c) => c.trim()).filter(Boolean)[0];
			adapter.getModels(selectedCwd).then((models) => {
				setModelOptions(toAutomationModelOptions(models, { selectedModelId: selectedModelIdRef.current }));
			}).catch(() => {
				setModelOptions([]);
			});
		}, [adapter, draft.cwds]);
		const workspaceFolders = externalWorkspaceFolders && externalWorkspaceFolders.length > 0 ? externalWorkspaceFolders : internalWorkspaceFolders;
		(0, import_react$1.useEffect)(() => {
			if (draft.modelId || modelOptions.length === 0) return;
			const firstAvailable = modelOptions.find((option) => !option.disabled);
			if (!firstAvailable) return;
			setDraft({
				...draft,
				modelId: firstAvailable.id,
				modelIsThinking: firstAvailable.isThinking
			});
		}, [
			draft,
			modelOptions,
			setDraft
		]);
		const scheduleMode = draft.scheduleType === "once" ? "once" : draft.schedule.freq === "HOURLY" ? "interval" : "periodic";
		const periodicMode = inferPeriodicMode(draft.schedule);
		const isRecurringSelectionEmpty = scheduleMode === "periodic" ? periodicMode === "week" || periodicMode === "biweek" ? draft.schedule.byday.length === 0 : periodicMode === "month" ? draft.schedule.bymonthday.length === 0 : periodicMode === "year" ? draft.schedule.bymonth.length === 0 || draft.schedule.bymonthday.length === 0 : false : scheduleMode === "interval" ? draft.schedule.byday.length === 0 : false;
		const handleScheduleModeChange = (0, import_react$1.useCallback)((mode) => {
			if (mode === "periodic") {
				setDraft({
					...draft,
					scheduleType: "recurring",
					schedule: draft.schedule.freq === "HOURLY" ? {
						...draft.schedule,
						freq: "DAILY",
						interval: 1,
						byday: ALL_DAYS.slice()
					} : draft.schedule
				});
				return;
			}
			if (mode === "interval") {
				setDraft({
					...draft,
					scheduleType: "recurring",
					schedule: {
						...draft.schedule,
						freq: "HOURLY",
						interval: Math.max(1, draft.schedule.intervalHours || 1),
						intervalHours: Math.max(1, draft.schedule.intervalHours || 1),
						byday: draft.schedule.byday.length > 0 ? sortWeekdays(draft.schedule.byday) : ALL_DAYS.slice()
					}
				});
				return;
			}
			setDraft({
				...draft,
				scheduleType: "once",
				validFromDate: "",
				validUntilDate: ""
			});
		}, [draft, setDraft]);
		const selectedCwds = draft.cwds.split(",").map((c) => c.trim()).filter(Boolean);
		const availableFolders = (0, import_react$1.useMemo)(() => workspaceFolders.filter((folder) => !isClawPath(folder.path, folder.label)), [workspaceFolders]);
		const folderDropdownItems = (0, import_react$1.useMemo)(() => availableFolders.map((folder) => ({
			value: folder.path,
			label: formatAutomationCwdLabel(folder.path, t),
			leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FolderIcon, { size: 16 }),
			description: folder.path,
			track: {
				elementId: "automation_workspace_select",
				elementName: "选择任务空间"
			}
		})), [availableFolders, t]);
		const handleFolderSelect = (0, import_react$1.useCallback)((selectedValues) => {
			const uri = selectedValues[0];
			if (uri) setDraft({
				...draft,
				cwds: uri
			});
		}, [draft, setDraft]);
		const selectedModelOption = (0, import_react$1.useMemo)(() => modelOptions.find((option) => option.id === draft.modelId && option.isThinking === (draft.modelIsThinking || false)) || modelOptions.find((option) => option.id === draft.modelId), [
			modelOptions,
			draft.modelId,
			draft.modelIsThinking
		]);
		const automationModelGroups = (0, import_react$1.useMemo)(() => [
			{
				id: "built-in",
				label: t("model.builtIn"),
				order: 1
			},
			{
				id: "enterprise",
				label: t("model.enterprise"),
				order: 2
			},
			{
				id: "custom",
				label: t("model.custom"),
				order: 3
			}
		], [t]);
		const modelSelectorConfig = (0, import_react$1.useMemo)(() => {
			if (modelOptions.length === 0) return;
			return {
				options: modelOptions,
				groups: automationModelGroups,
				selectedId: draft.modelId,
				selectedIsThinking: draft.modelIsThinking,
				selectedModel: selectedModelOption ? {
					id: selectedModelOption.id,
					name: selectedModelOption.label,
					supportsImages: selectedModelOption.supportsImages,
					supportsReasoning: selectedModelOption.supportsReasoning,
					isThinking: selectedModelOption.isThinking
				} : void 0,
				onChange: (id, isThinking) => {
					setDraft({
						...draft,
						modelId: id,
						modelIsThinking: isThinking
					});
				},
				onOpenChange: setIsModelSelectorOpen,
				portalRoot: "inline"
			};
		}, [
			modelOptions,
			automationModelGroups,
			draft,
			selectedModelOption,
			setDraft
		]);
		const promptText = (0, import_react$1.useMemo)(() => extractPromptFromBlocks(promptBlocks), [promptBlocks]);
		const promptSkills = (0, import_react$1.useMemo)(() => extractSkillsFromBlocks(promptBlocks), [promptBlocks]);
		(0, import_react$1.useEffect)(() => {
			if (promptText === draft.prompt && JSON.stringify(promptSkills) === JSON.stringify(draft.skills || [])) return;
			setPromptBlocks(buildPromptBlocks(draft.prompt, draft.skills || []));
		}, [
			draft.prompt,
			draft.skills,
			promptText,
			promptSkills
		]);
		const handlePromptChange = (0, import_react$1.useCallback)((blocks) => {
			const nextPrompt = extractPromptFromBlocks(blocks);
			const nextSkills = extractSkillsFromBlocks(blocks);
			setPromptBlocks(blocks);
			setDraft({
				...draft,
				prompt: nextPrompt,
				skills: nextSkills
			});
		}, [draft, setDraft]);
		const handlePromptSubmit = (0, import_react$1.useCallback)(() => {}, []);
		const selectedCwd = selectedCwds[0] || "";
		const [expertOptions, setExpertOptions] = (0, import_react$1.useState)([]);
		(0, import_react$1.useEffect)(() => {
			if (!adapter.getExperts) return;
			loadLegacyAdapterExperts(adapter).then((experts) => {
				const lang = getLocale().startsWith("zh") ? "zh" : "en";
				setExpertOptions((experts || []).map((e) => {
					const profession = e.profession ? e.profession[lang] || e.profession.zh || e.profession.en || "" : "";
					const displayName = e.displayName ? e.displayName[lang] || e.displayName.zh || e.displayName.en || e.name || e.id : e.name || e.id;
					return {
						id: e.id,
						name: profession || displayName,
						identityName: "",
						avatar: e.avatar
					};
				}));
			}).catch(() => {
				setExpertOptions([]);
			});
		}, [adapter]);
		const [recentExperts, setRecentExperts] = (0, import_react$1.useState)([]);
		(0, import_react$1.useEffect)(() => {
			if (!adapter.getRecentExperts) return;
			let cancelled = false;
			const lang = getLocale().startsWith("zh") ? "zh" : "en";
			const recentP = adapter.getRecentExperts(SHARED_RECENT_EXPERTS_KEY).catch(() => []);
			const builtinP = loadLegacyAdapterExperts(adapter).catch(() => []);
			const customP = expertFacade?.getCustomExperts ? expertFacade.getCustomExperts({}).catch(() => ({ experts: [] })) : Promise.resolve({ experts: [] });
			Promise.all([
				recentP,
				builtinP,
				customP
			]).then(([experts, allExperts, customResult]) => {
				if (cancelled) return;
				if (!experts || experts.length === 0) {
					setRecentExperts([]);
					return;
				}
				const infoMap = /* @__PURE__ */ new Map();
				for (const e of allExperts || []) if (e.displayName) {
					const resolved = e.displayName[lang] || e.displayName.zh || e.displayName.en || "";
					if (resolved) {
						const profession = e.profession ? e.profession[lang] || e.profession.zh || e.profession.en || "" : void 0;
						infoMap.set(e.id, {
							name: resolved,
							profession,
							avatarUrl: e.avatar
						});
					}
				}
				for (const c of customResult.experts || []) {
					if (!c.id || infoMap.has(c.id)) continue;
					const localName = c.name && typeof c.name === "object" ? c.name[lang] ?? c.name.zh ?? c.name.en ?? "" : typeof c.name === "string" ? c.name : "";
					if (localName) {
						const localProfession = c.profession && typeof c.profession === "object" ? c.profession[lang] ?? c.profession.zh ?? c.profession.en ?? "" : typeof c.profession === "string" ? c.profession : "";
						infoMap.set(c.id, {
							name: localName,
							profession: localProfession || void 0,
							avatarUrl: c.avatar || void 0
						});
					}
				}
				setRecentExperts(experts.map((expert) => {
					const info = infoMap.get(expert.id);
					const isSlugName = expert.name && !/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\s]/.test(expert.name);
					if (!info) {
						if (isSlugName && expert.profession) return {
							...expert,
							name: expert.profession
						};
						return expert;
					}
					const professionFallback = isSlugName ? "" : expert.name;
					return {
						...expert,
						name: !expert.name || isSlugName ? info.name || expert.name : expert.name,
						profession: expert.profession || info.profession || professionFallback,
						avatarUrl: expert.avatarUrl || info.avatarUrl
					};
				}));
			});
			return () => {
				cancelled = true;
			};
		}, [adapter, expertFacade]);
		(0, import_react$1.useEffect)(() => {
			connectorStore.getState().loadMcpConnectors();
		}, []);
		const mcpConfigs = useConnectorStore((state) => state.mcpConnectorConfigs);
		const mcpStates = useConnectorStore((state) => state.mcpConnectorStates);
		const connectorOptions = (0, import_react$1.useMemo)(() => mcpConfigs.map((c) => ({
			id: c.id,
			name: c.name || c.id,
			icon: c.icon || void 0,
			connected: mcpStates[c.id]?.status === "connected"
		})), [mcpConfigs, mcpStates]);
		const handleOpenConnectorSettings = (0, import_react$1.useCallback)(() => {
			onOpenConnectorSettings?.();
		}, [onOpenConnectorSettings]);
		const promptBottomSlots = (0, import_react$1.useMemo)(() => {
			const slots = [];
			if (hasPersonalSkills) slots.push({
				position: BottomSlotPositions.AFTER_MODEL_SELECTOR,
				content: ({ addContentBlocks }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillSelector, {
					addContentBlocks,
					cwd: selectedCwd,
					className: "skill-selector--automation"
				}),
				key: "automation-skill-selector"
			});
			if (expertOptions.length > 0 || onSummonExpert || recentExperts.length > 0 || draft.expertId) slots.push({
				position: BottomSlotPositions.AFTER_MODEL_SELECTOR,
				content: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExpertSelector, {
					options: expertOptions,
					recentExperts,
					selectedId: draft.expertId,
					selectedName: draft.expertName,
					selectedIdentityName: draft.expertIdentityName,
					selectedAvatarUrl: draft.expertAvatarUrl,
					onChange: (expertId) => {
						let marketplace;
						if (expertId) marketplace = expertOptions.some((e) => e.id === expertId) ? "official" : "my-experts";
						setDraft({
							...draft,
							expertId: expertId || void 0,
							expertMarketplace: marketplace,
							expertName: void 0,
							expertIdentityName: void 0,
							expertAvatarUrl: void 0
						});
					},
					onSummonExpert
				}),
				key: "automation-expert-selector"
			});
			slots.push({
				position: BottomSlotPositions.AFTER_MODEL_SELECTOR,
				content: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AutomationPermissionPicker, {
					value: draft.permissionMode,
					onChange: (permissionMode) => setDraft({
						...draft,
						permissionMode
					}),
					disabled: saving
				}),
				key: "automation-permission-picker"
			});
			return slots;
		}, [
			hasPersonalSkills,
			selectedCwd,
			expertOptions,
			recentExperts,
			onSummonExpert,
			draft,
			setDraft,
			saving
		]);
		const isEditMode = mode === "edit";
		const isWechatMiniProgramEnabled = useWechatMiniProgramIntegrationFeature();
		const showPushToBotToggle = isWorkBuddy() && !!isWechatMiniProgramEnabled;
		const isWecomBotEnabled = useWecomBotIntegrationFeature();
		const showWecomBotToggle = isWorkBuddy() && !!isWecomBotEnabled;
		const { openSettings: openAssistantSettings } = useOpenSettings();
		const [wecomBotConfigured, setWecomBotConfigured] = (0, import_react$1.useState)(void 0);
		const pendingWecomAutoEnableRef = (0, import_react$1.useRef)(false);
		const draftRef = (0, import_react$1.useRef)(draft);
		draftRef.current = draft;
		(0, import_react$1.useEffect)(() => {
			if (!showWecomBotToggle || !adapter) return;
			const unsubPushConfig = adapter.on("claw:automation-wecom-push-config-result", (data) => {
				const config = data;
				let configured = false;
				if (config) if (config.mode === "websocket") configured = !!(config.botId && config.botSecret);
				else configured = !!(config.webhookUrl && config.webhookUrl.trim().length > 0);
				setWecomBotConfigured(configured);
				if (configured && pendingWecomAutoEnableRef.current) {
					pendingWecomAutoEnableRef.current = false;
					setDraft({
						...draftRef.current,
						pushToWecomBot: true
					});
				}
			});
			const unsubWebhookUrl = adapter.on("claw:automation-wecom-webhook-url-result", (data) => {
				const { url } = data;
				const configured = !!url && url.trim().length > 0;
				setWecomBotConfigured((prev) => prev === void 0 ? configured : prev);
			});
			adapter.emit("claw:get-automation-wecom-push-config");
			return () => {
				unsubPushConfig();
				unsubWebhookUrl();
			};
		}, [
			showWecomBotToggle,
			adapter,
			setDraft
		]);
		const handleWecomBotToggle = (0, import_react$1.useCallback)((event) => {
			const checked = event.currentTarget.checked;
			if (checked && wecomBotConfigured === false) {
				Modal.confirm({
					title: t("automation.modal.wecomBotNotConfiguredTitle"),
					content: t("automation.modal.wecomBotNotConfiguredDesc"),
					okText: t("automation.modal.wecomBotGoSettings"),
					cancelText: t("automation.modal.wecomBotDismiss"),
					onOk: () => {
						pendingWecomAutoEnableRef.current = true;
						openAssistantSettings("claw");
					}
				});
				return;
			}
			setDraft({
				...draft,
				pushToWecomBot: checked
			});
		}, [
			wecomBotConfigured,
			draft,
			setDraft,
			t,
			openAssistantSettings
		]);
		const yearlySelectedMonth = draft.schedule.bymonth[0] || 0;
		const yearlySelectedDay = draft.schedule.bymonthday[0] || 0;
		const yearlyMaxDay = getYearlyMaxDay(yearlySelectedMonth || 1);
		const handleIntervalWeekdayToggle = (0, import_react$1.useCallback)((day) => {
			const selectedDays = sortWeekdays(draft.schedule.byday);
			const exists = selectedDays.includes(day);
			if (exists && selectedDays.length === 1) return;
			const byday = exists ? selectedDays.filter((candidate) => candidate !== day) : sortWeekdays([...selectedDays, day]);
			setDraft({
				...draft,
				schedule: {
					...draft.schedule,
					byday
				}
			});
		}, [draft, setDraft]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "atm-detail-page",
			ref: overlayRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: `atm-detail-header${needTrafficLightOffset ? " atm-detail-header--traffic-light-offset" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-detail-header-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarExpandButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SidebarNewTaskButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Breadcrumb, {
							highlightLast: true,
							className: "atm-detail-breadcrumb",
							leadingIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "atm-detail-status-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AlarmClockIcon, { className: "atm-task-status-icon atm-task-status-icon--scheduled" })
							}),
							items: [{
								key: "automation",
								label: t("automation.detail.breadcrumb"),
								onClick: (e) => {
									e.preventDefault();
									onClose();
								}
							}, {
								key: "current",
								label: draft.name || (isEditMode ? t("automation.modal.title") : t("automation.modal.titleCreate"))
							}]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-detail-header-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-detail-icon-actions",
						children: [isEditMode && onTest && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
							content: t("automation.modal.test"),
							placement: "bottom",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								type: "button",
								variant: "ghost",
								iconOnly: true,
								className: "atm-detail-icon-btn",
								disabled: saving,
								onClick: onTest,
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PlayIcon, {
									width: 16,
									height: 16
								})
							})
						}), isEditMode && onDelete && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
							content: t("common.delete"),
							placement: "bottom",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
								type: "button",
								variant: "ghost",
								iconOnly: true,
								className: "atm-detail-icon-btn",
								disabled: saving,
								onClick: onDelete,
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {
									width: 16,
									height: 16
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-detail-btn-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							type: "button",
							variant: "grey",
							disabled: saving,
							onClick: onClose,
							children: t("automation.detail.action.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
							type: "button",
							variant: "primary",
							disabled: saving || isRecurringSelectionEmpty,
							onClick: onSave,
							children: t("automation.detail.action.save")
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "atm-detail-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: `atm-modal-body${isModelSelectorOpen ? " atm-model-selector-open" : ""}`,
					children: [
						isLocalAutomation && !isExecutionNoticeDismissed && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "atm-modal-notice",
							role: "status",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-modal-notice__badge",
									children: t("automation.modal.executionNoticeLabel")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-modal-notice__content",
									children: t("automation.modal.executionNoticeText")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									type: "button",
									className: "atm-modal-notice__close",
									"aria-label": t("common.close"),
									onClick: () => setIsExecutionNoticeDismissed(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(XCloseIcon, { size: 14 })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("label", {
							className: "atm-modal-label",
							children: t("automation.modal.name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
							className: "atm-modal-input",
							value: draft.name,
							onChange: (e) => setDraft({
								...draft,
								name: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("label", {
							className: "atm-modal-label",
							children: [t("automation.modal.projects"), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
								className: "atm-modal-hint atm-modal-hint-inline",
								children: [
									"(",
									t("automation.modal.optional"),
									")"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "atm-modal-tags",
							children: [selectedCwds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tag, {
								className: "atm-modal-tag",
								size: "small",
								closable: true,
								onClose: () => {
									setDraft({
										...draft,
										cwds: ""
									});
								},
								children: formatAutomationCwdLabel(selectedCwds[0], t)
							}), selectedCwds.length === 0 && availableFolders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Dropdown, {
								items: folderDropdownItems,
								onSelectionChange: handleFolderSelect,
								placement: "bottom-start",
								width: 240,
								className: "atm-folder-dropdown",
								menuClassName: "atm-dropdown-menu",
								searchable: true,
								searchPlaceholder: t("automation.modal.searchWorkspace"),
								emptyContent: t("automation.modal.noDirectories"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
									type: "button",
									variant: "ghost",
									iconOnly: true,
									className: "atm-repo-add-btn",
									"aria-label": t("common.add"),
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AddIcon, {
										width: 14,
										height: 14
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("label", {
							className: "atm-modal-label",
							children: t("automation.modal.prompt")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-modal-chat-input",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ChatInput, {
								value: promptBlocks,
								onChange: handlePromptChange,
								onSubmit: handlePromptSubmit,
								placeholder: "",
								disabled: saving,
								resizeDisabled: saving,
								interactionMode: "editor",
								modelSelector: modelSelectorConfig,
								bottomSlots: promptBottomSlots,
								minInputHeight: 120,
								rememberHeight: false,
								disableContextUsage: true,
								attachmentConfig: { enabled: false }
							})
						}),
						connectorOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConnectorSelector, {
							options: connectorOptions,
							selectedIds: draft.connectorIds || [],
							onChange: (connectorIds) => setDraft({
								...draft,
								connectorIds
							}),
							onManageConnectors: handleOpenConnectorSettings,
							disabled: saving
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("label", {
							className: "atm-modal-label",
							children: [t("automation.modal.schedule"), scheduleMode !== "interval" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
								className: "atm-modal-hint atm-modal-hint-inline atm-schedule-peak-hour-hint-inline",
								children: [
									"(",
									t("automation.schedule.peakHourHint"),
									")"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Segmented, {
							className: "atm-schedule-tabs",
							size: "small",
							value: scheduleMode,
							onChange: handleScheduleModeChange,
							options: [
								{
									value: "periodic",
									label: t("automation.schedule.periodic")
								},
								{
									value: "interval",
									label: t("automation.schedule.interval")
								},
								{
									value: "once",
									label: t("automation.schedule.onceTab")
								}
							]
						}),
						scheduleMode === "periodic" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-schedule-daily",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-frequency-controls atm-periodic-controls",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CustomSelect, {
										value: periodicMode,
										options: [
											{
												label: t("automation.schedule.periodicDay"),
												value: "day"
											},
											{
												label: t("automation.schedule.periodicWeek"),
												value: "week"
											},
											{
												label: t("automation.schedule.periodicBiweek"),
												value: "biweek"
											},
											{
												label: t("automation.schedule.periodicMonth"),
												value: "month"
											},
											{
												label: t("automation.schedule.periodicYear"),
												value: "year"
											}
										],
										onChange: (next) => {
											const val = next;
											if (val === "day") {
												setDraft({
													...draft,
													schedule: {
														...draft.schedule,
														freq: "DAILY",
														interval: 1,
														byday: ALL_DAYS.slice()
													}
												});
												return;
											}
											if (val === "week" || val === "biweek") {
												setDraft({
													...draft,
													schedule: {
														...draft.schedule,
														freq: "WEEKLY",
														interval: val === "biweek" ? 2 : 1,
														byday: sortWeekdays(draft.schedule.byday)
													}
												});
												return;
											}
											if (val === "month") {
												setDraft({
													...draft,
													schedule: {
														...draft.schedule,
														freq: "MONTHLY",
														interval: 1,
														bymonthday: sortMonthDays(draft.schedule.bymonthday)
													}
												});
												return;
											}
											setDraft({
												...draft,
												schedule: {
													...draft.schedule,
													freq: "YEARLY",
													interval: 1,
													bymonth: sortMonths(draft.schedule.bymonth),
													bymonthday: sortMonthDays(draft.schedule.bymonthday)
												}
											});
										}
									}),
									["week", "biweek"].includes(periodicMode) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WeekdayMultiPicker, {
										values: draft.schedule.byday,
										t,
										disabled: saving,
										onChange: (byday) => setDraft({
											...draft,
											schedule: {
												...draft.schedule,
												byday
											}
										})
									}),
									periodicMode === "month" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MonthdayMultiPicker, {
										values: draft.schedule.bymonthday,
										t,
										disabled: saving,
										onChange: (bymonthday) => setDraft({
											...draft,
											schedule: {
												...draft.schedule,
												bymonthday
											}
										})
									}),
									periodicMode === "year" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
										className: "atm-yearly-selectors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CustomSelect, {
											value: yearlySelectedMonth ? String(yearlySelectedMonth) : "",
											placeholder: t("automation.schedule.selectMonth"),
											options: [...MONTHS.map((month) => ({
												label: `${month}${t("automation.schedule.monthUnit")}`,
												value: String(month)
											}))],
											onChange: (val) => {
												const month = Number(val) || 0;
												const nextMax = getYearlyMaxDay(month || 1);
												const currentDay = draft.schedule.bymonthday[0] || 0;
												const normalizedDay = currentDay > nextMax ? nextMax : currentDay;
												setDraft({
													...draft,
													schedule: {
														...draft.schedule,
														bymonth: month ? [month] : [],
														bymonthday: normalizedDay ? [normalizedDay] : []
													}
												});
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CustomSelect, {
											value: yearlySelectedDay ? String(yearlySelectedDay) : "",
											placeholder: t("automation.schedule.selectDate"),
											options: [...MONTH_DAYS.filter((day) => day <= yearlyMaxDay).map((day) => ({
												label: `${day}${t("automation.schedule.dayUnit")}`,
												value: String(day)
											}))],
											onChange: (val) => {
												const day = Number(val) || 0;
												setDraft({
													...draft,
													schedule: {
														...draft.schedule,
														bymonthday: day ? [day] : []
													}
												});
											}
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TimePicker, {
										value: `${pad2(draft.schedule.byhour)}:${pad2(draft.schedule.byminute)}`,
										t,
										disabled: saving,
										onChange: (nextValue) => {
											const { hour, minute } = parseTimeValue(nextValue);
											setDraft({
												...draft,
												schedule: {
													...draft.schedule,
													byhour: hour,
													byminute: minute
												}
											});
										}
									})
								]
							})
						}),
						scheduleMode === "interval" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "atm-schedule-interval",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-schedule-interval-prefix",
									children: t("automation.schedule.every")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Input, {
									type: "number",
									className: "atm-modal-input atm-schedule-interval-input",
									min: 1,
									value: String(draft.schedule.intervalHours),
									onChange: (e) => {
										const intervalHours = Math.max(1, Number(e.target.value) || 1);
										setDraft({
											...draft,
											schedule: {
												...draft.schedule,
												freq: "HOURLY",
												interval: intervalHours,
												intervalHours,
												byday: draft.schedule.byday.length > 0 ? draft.schedule.byday : ALL_DAYS.slice()
											}
										});
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-schedule-interval-unit",
									children: t("automation.schedule.hours")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: "atm-schedule-days",
									children: ALL_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										role: "button",
										tabIndex: saving ? -1 : 0,
										"aria-pressed": draft.schedule.byday.includes(day),
										"aria-disabled": saving,
										className: `atm-schedule-day ${draft.schedule.byday.includes(day) ? "active" : ""} ${saving ? "disabled" : ""}`,
										onClick: () => {
											if (saving) return;
											handleIntervalWeekdayToggle(day);
										},
										onKeyDown: (e) => {
											if (saving) return;
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												handleIntervalWeekdayToggle(day);
											}
										},
										children: getDayLabel(day, t)
									}, day))
								})
							]
						}),
						scheduleMode === "once" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-schedule-once",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-frequency-controls",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TimePicker, {
									value: draft.scheduledTime,
									t,
									disabled: saving,
									onChange: (nextValue) => setDraft({
										...draft,
										scheduledTime: nextValue || "09:00"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SingleDatePicker, {
									value: draft.scheduledDate,
									t,
									disabled: saving,
									onChange: (scheduledDate) => setDraft({
										...draft,
										scheduledDate
									})
								})]
							})
						}),
						scheduleMode !== "once" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("label", {
							className: "atm-modal-label",
							children: [t("automation.validity.label"), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
								className: "atm-modal-hint atm-modal-hint-inline",
								children: [
									"(",
									t("automation.validity.hint"),
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ValidityRangePicker, {
							startDate: draft.validFromDate,
							endDate: draft.validUntilDate,
							t,
							disabled: saving,
							onChange: (validFromDate, validUntilDate) => setDraft({
								...draft,
								validFromDate,
								validUntilDate
							})
						})] }),
						showPushToBotToggle && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "atm-schedule-push-toggle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-push-toggle-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-toggle-text",
									children: t("automation.modal.pushToBot")
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
									content: t("automation.modal.pushToBotHint"),
									placement: "top",
									textAlign: "left",
									maxWidth: 320,
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
										className: "atm-push-info-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 16 16",
											fill: "currentColor",
											xmlns: "http://www.w3.org/2000/svg",
											children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
												opacity: "0.3",
												transform: "translate(0.667, 0.667)",
												d: "M7.3333 13.3333C10.647 13.3333 13.3333 10.647 13.3333 7.3333C13.3333 4.0196 10.647 1.3333 7.3333 1.3333C4.0196 1.3333 1.3333 4.0196 1.3333 7.3333C1.3333 10.647 4.0196 13.3333 7.3333 13.3333ZM14.6667 7.3333C14.6667 11.3834 11.3834 14.6667 7.3333 14.6667C3.2832 14.6667 0 11.3834 0 7.3333C0 3.2832 3.2832 0 7.3333 0C11.3834 0 14.6667 3.2832 14.6667 7.3333ZM6.6667 11L6.6667 6L8 6L8 11L6.6667 11ZM8 5L6.6641 5L6.6641 3.6641L8 3.6641L8 5Z"
											})
										})
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
								className: "atm-push-switch",
								checked: draft.pushToWeChat ?? false,
								onChange: (event) => setDraft({
									...draft,
									pushToWeChat: event.currentTarget.checked
								}),
								disabled: saving
							})]
						}),
						showWecomBotToggle && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "atm-schedule-push-toggle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "atm-push-toggle-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-toggle-text",
									children: t("automation.modal.pushToWecomBot")
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
									content: t("automation.modal.pushToWecomBotHint"),
									placement: "top",
									textAlign: "left",
									maxWidth: 320,
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
										className: "atm-push-info-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 16 16",
											fill: "currentColor",
											xmlns: "http://www.w3.org/2000/svg",
											children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
												opacity: "0.3",
												transform: "translate(0.667, 0.667)",
												d: "M7.3333 13.3333C10.647 13.3333 13.3333 10.647 13.3333 7.3333C13.3333 4.0196 10.647 1.3333 7.3333 1.3333C4.0196 1.3333 1.3333 4.0196 1.3333 7.3333C1.3333 10.647 4.0196 13.3333 7.3333 13.3333ZM14.6667 7.3333C14.6667 11.3834 11.3834 14.6667 7.3333 14.6667C3.2832 14.6667 0 11.3834 0 7.3333C0 3.2832 3.2832 0 7.3333 0C11.3834 0 14.6667 3.2832 14.6667 7.3333ZM6.6667 11L6.6667 6L8 6L8 11L6.6667 11ZM8 5L6.6641 5L6.6641 3.6641L8 3.6641L8 5Z"
											})
										})
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Switch, {
								className: "atm-push-switch",
								checked: draft.pushToWecomBot ?? false,
								onChange: handleWecomBotToggle,
								disabled: saving
							})]
						}),
						isEditMode && createdAt && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-detail-created-at",
							children: t("automation.detail.createdAt", { date: new Date(createdAt).toLocaleDateString(getLocale().startsWith("zh") ? "zh-CN" : "en-US", {
								year: "numeric",
								month: "numeric",
								day: "numeric"
							}) })
						})
					]
				}), isEditMode && automationId && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "atm-detail-run-history",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "atm-detail-run-history-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "atm-detail-run-history-title",
							children: t("automation.detail.runHistory", { count: runCount })
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "atm-filter-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Dropdown$1, {
								trigger: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									iconOnly: true,
									className: `atm-detail-filter-btn ${historyFilter !== "all" ? "atm-detail-filter-btn--active" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WbFilterIcon, {}), historyFilter !== "all" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { className: "atm-filter-dot" })]
								}),
								placement: "bottom-end",
								items: [
									{
										key: "all",
										label: t("automation.filter.all"),
										selected: historyFilter === "all"
									},
									{
										key: "success",
										label: t("automation.filter.success"),
										selected: historyFilter === "success"
									},
									{
										key: "failed",
										label: t("automation.filter.failed"),
										selected: historyFilter === "failed"
									},
									{
										key: "running",
										label: t("automation.filter.running"),
										selected: historyFilter === "running"
									},
									{
										key: "archived",
										label: t("automation.filter.archived"),
										selected: historyFilter === "archived"
									}
								],
								open: showHistoryFilter,
								onOpenChange: setShowHistoryFilter,
								onSelect: (key) => setHistoryFilter(key)
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "atm-detail-run-history-list",
						children: (inboxItems || []).filter((item) => item.automationId === automationId).filter((item) => {
							if (historyFilter === "all") return true;
							if (historyFilter === "success") return isInboxDeliveredLike(item);
							if (historyFilter === "failed") return isInboxFailedLike(item);
							if (historyFilter === "running") return isInboxRunningItem(item);
							if (historyFilter === "archived") return !!item.archived;
							return true;
						}).sort((a, b) => (a.archived ? 1 : 0) - (b.archived ? 1 : 0)).map((item) => {
							const statusClass = getInboxStatusClass(item);
							const isRunningRecord = isInboxRunningItem(item);
							const canArchive = !item.archived && !isRunningRecord;
							return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: `atm-run-history-item ${canArchive ? "atm-run-history-item--archivable" : ""} ${item.archived ? "atm-run-history-item--archived" : ""}`,
								onClick: () => onOpenInboxItem?.(item, selectedCwds[0]),
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: "atm-run-history-item-name",
									children: item.automationName
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
									className: "atm-run-history-item-right",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
											className: "atm-run-history-item-time",
											children: new Date(item.finishedAt || item.startedAt).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
											className: `atm-run-history-item-status ${statusClass}`,
											children: item.archived ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArchiveIcon, {
												size: 16,
												color: "var(--wb-color-text-disabled, #000)"
											}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InboxStatusIcon, { statusClass })
										}),
										canArchive && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
											type: "button",
											className: "atm-run-history-item-archive",
											onClick: (e) => {
												e.stopPropagation();
												onArchiveItem?.(item.id);
											},
											title: t("automation.action.archive"),
											children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArchiveIcon, {
												width: 16,
												height: 16
											})
										}),
										item.archived && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
											type: "button",
											className: "atm-run-history-item-delete",
											onClick: (e) => {
												e.stopPropagation();
												onDeleteItem?.(item.id);
											},
											title: t("common.delete"),
											children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DeleteIcon, {
												width: 16,
												height: 16
											})
										})
									]
								})]
							}, item.id);
						})
					})]
				})]
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/pages/automation.tsx
function isClawWorkspace(path) {
	if (!path) return false;
	return /(?:^|[/\\])claw(?:[/\\]|$)/i.test(path);
}
async function withTimeout(factory, timeoutMs, message) {
	let timeoutId;
	try {
		const timeoutPromise = new Promise((_, reject) => {
			timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
		});
		return await Promise.race([factory(), timeoutPromise]);
	} finally {
		if (timeoutId) clearTimeout(timeoutId);
	}
}
function useOpenAutomationConversation() {
	const adapter = useAdapter();
	const conversationsContext = useConversations();
	const { account } = useAccountService();
	const router = useRouterContextSafe();
	const { setIsLoadingData } = useLoadingState();
	const { t } = useI18n();
	return (0, import_react.useCallback)(async (conversationId, cwd, title) => {
		if (!adapter || !conversationId) return;
		const isCurrentConversation = conversationsContext.currentConversation?.id === conversationId;
		const existingFullConversation = conversationsContext.conversations?.find((conv) => conv.id === conversationId);
		let matchedConversation = existingFullConversation;
		if (!matchedConversation && account?.uid) try {
			matchedConversation = (await withTimeout(() => adapter.loadAllConversation(account.uid), 5e3, `loadAllConversation timeout for ${conversationId}`)).find((conv) => conv.id === conversationId);
		} catch (error) {
			console.warn("[AutomationPage] Failed to preload conversation metadata for automation item:", error);
		}
		const preferredCwd = cwd || matchedConversation?.cwd || "";
		const targetListView = isClawWorkspace(preferredCwd) ? "claw" : "tasks";
		const targetConversation = {
			id: conversationId,
			cwd: preferredCwd || matchedConversation?.cwd || "",
			title: title || matchedConversation?.title || existingFullConversation?.title || conversationId,
			timestamp: matchedConversation?.timestamp || existingFullConversation?.timestamp || /* @__PURE__ */ new Date(),
			status: matchedConversation?.status || existingFullConversation?.status || "pending",
			isPlayground: matchedConversation?.isPlayground ?? existingFullConversation?.isPlayground,
			messages: existingFullConversation?.messages || []
		};
		if (!isCurrentConversation) conversationsContext.setCurrentConversation?.(targetConversation);
		if (targetListView === "claw") writeClawSidebarActiveTabPreference(CLAW_LOCAL_TAB_KEY);
		adapter.getPendingMessageTracker().clearAll();
		setIsLoadingData(true);
		try {
			let sessionInfo;
			try {
				sessionInfo = await adapter.loadSession(conversationId, preferredCwd, []);
			} catch (primaryError) {
				if (preferredCwd) {
					console.warn("[AutomationPage] loadSession with preferred cwd failed, retry with empty cwd:", primaryError);
					sessionInfo = await adapter.loadSession(conversationId, "", []);
				} else throw primaryError;
			}
			if (!sessionInfo && preferredCwd) sessionInfo = await adapter.loadSession(conversationId, "", []);
			conversationsContext.setAvailableModes?.(sessionInfo?.modes?.availableModes);
			conversationsContext.setRemoteCurrentModeId?.(sessionInfo?.modes?.currentModeId);
			conversationsContext.setAvailableModels?.(sessionInfo?.models?.availableModels);
			conversationsContext.setRemoteCurrentModelId?.(sessionInfo?.models?.currentModelId);
			if (targetListView === "claw") router?.navigateToPath?.(buildClawLocalSessionPath(conversationId), { replace: true });
			else router?.updateUrl?.({ taskId: conversationId }, { replace: true });
		} catch (error) {
			if (notifyIfAuthExpired(error)) throw error;
			console.error("[AutomationPage] Failed to open automation conversation:", error);
			toast({
				type: "error",
				message: t("automation.error.missingConversation")
			});
			throw error;
		} finally {
			setIsLoadingData(false);
		}
	}, [
		adapter,
		account?.uid,
		conversationsContext,
		router,
		setIsLoadingData,
		t
	]);
}
function AutomationRoutePage({ initialEditId, onInitialEditHandled }) {
	const adapter = useAdapter();
	const { facades } = useModuleHost();
	const navigate = useNavigate();
	const handleAutomationConversationOpen = useOpenAutomationConversation();
	const handleSummonExpert = (0, import_react.useCallback)(() => {
		navigate("/experts");
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "main-content main-content--automation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "automation-main-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutomationPanel, {
				adapter,
				onOpenConversation: handleAutomationConversationOpen,
				initialEditId,
				onInitialEditHandled,
				onOpenConnectorSettings: (0, import_react.useCallback)(() => {
					navigate("/connectors");
				}, [navigate]),
				onSummonExpert: handleSummonExpert,
				expertFacade: facades?.expert
			})
		})
	});
}
function AutomationPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutomationRoutePage, {
		initialEditId: searchParams.get("editId") ?? void 0,
		onInitialEditHandled: (0, import_react.useCallback)(() => {
			const next = new URLSearchParams(searchParams);
			next.delete("editId");
			setSearchParams(next, { replace: true });
		}, [searchParams, setSearchParams])
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_automation_panel();
	init_use_sidebar_state();
	init_tab_registry();
	init_contexts();
	init_auth_context();
	init_hooks();
	init_useI18n();
	init_common();
	init_router();
	init_auth_expired_detector();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { AutomationPage };
