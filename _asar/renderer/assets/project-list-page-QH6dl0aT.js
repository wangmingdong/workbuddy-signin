import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { In as emitProjectChange, Jc as useDebouncedValue, Kn as LeaveProjectDialog, Ln as init_project_change_bus, Rl as init_use_vpc_connector_policy, Rn as subscribeProjectChange, Sc as init_app_providers, Tc as useAgentServices, U as init_expert, Xn as getProjectCardMenuItems, Zn as init_permissions, a as WorkBuddyTopBar, au as useProjectFacade, b as ChevronDownIcon, bt as resolveAvatarUrl, d as init_components, h as CollabModal, iu as init_use_project_facade, m as ConnectorIcon, o as init_workbuddy_topbar, qc as init_use_debounced_value, qn as init_leave_project_dialog, yt as init_avatar_url, zl as useVpcConnectorPolicy } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { c as getProductName, p as init_environment, v as isOverseas } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { D as useAccountService, E as init_auth_context } from "./contexts-D7XKqa2J.js";
import { A as message, H as Modal, I as Dropdown, ct as Button, et as Tag, t as init_foundation, tt as Input } from "./foundation-QOglV606.js";
import { It as ProjectIconV2, n as init_icons$1 } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { t as init_common } from "./common-Czfscgga.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
import { i as init_beacon_report, n as TEAMS_EVENT, o as useTeamsReport, t as TEAMS_ELEMENT } from "./beacon-report-tRFsdxrK.js";
import { o as init_constants, r as clampProjectInstruction, t as PROJECT_INSTRUCTION_MAX_INPUT_LENGTH } from "./constants-CqrIfquh.js";
import { _ as isExclusivePlanError, h as ProjectQuotaExceededError, p as ExclusivePlanNotSupportedError, y as tryParseProjectQuotaError } from "./project-chat-service-BzKCqmVb.js";
import { t as init_browser } from "./browser-CBnZQLfk.js";
import { r as init_SkillAvatar, t as SkillAvatar } from "./SkillAvatar-CEySvDFr.js";
import { i as init_utils, r as getLocalizedText } from "./utils-CV8kqybT.js";
import { a as QuotaToast, i as init_quota_toast, r as useQuotaErrorPresenter, t as init_use_quota_error } from "./use-quota-error-CGeMUbAO.js";
import { r as buildProjectCreateSubmitPayload, s as init_teams_telemetry_fields } from "./teams-telemetry-fields-DjnPE9Hg.js";
import { n as useBusyAction, t as init_use_busy_action } from "./use-busy-action-CV-mCi-n.js";
import { t as init_project } from "./project-X3IGS9h0.js";
import { i as init_mock_data, n as MOCK_DETAIL_ACTIVITIES, r as MOCK_DETAIL_TASKS, t as MOCK_AVAILABLE_CONNECTORS } from "./mock-data-u-SNMci3.js";
//#region ../../packages/agent-ui/src/modules/collab/assets/landing-hero.png
var landing_hero_default;
var init_landing_hero = __esmMin((() => {
	landing_hero_default = "" + new URL("landing-hero-BN7xOj3l.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/hooks/use-project-quota-guard.ts
function useProjectQuotaGuard() {
	const facade = useProjectFacade();
	const [quotaError, setQuotaError] = (0, import_react$11.useState)(null);
	const inFlightRef = (0, import_react$11.useRef)(false);
	return {
		quotaError,
		dismiss: (0, import_react$11.useCallback)(() => {
			setQuotaError(null);
		}, []),
		runWithQuotaGuard: (0, import_react$11.useCallback)(async (proceed) => {
			if (inFlightRef.current) return;
			if (!facade?.checkProjectQuota) {
				await proceed();
				return;
			}
			inFlightRef.current = true;
			try {
				const info = await facade.checkProjectQuota();
				if (!info.canCreate) {
					setQuotaError({
						version: info.version,
						projectLimit: info.projectLimit,
						projectCount: info.projectCount
					});
					return;
				}
				setQuotaError(null);
				await proceed();
			} catch (err) {
				if (err instanceof ProjectQuotaExceededError) {
					setQuotaError(err.data);
					return;
				}
				if (err instanceof ExclusivePlanNotSupportedError) throw err;
				console.warn("[useProjectQuotaGuard] checkProjectQuota failed, falling through:", err);
				await proceed();
			} finally {
				inFlightRef.current = false;
			}
		}, [facade]),
		setQuotaError
	};
}
var import_react$11;
var init_use_project_quota_guard = __esmMin((() => {
	init_browser();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_use_project_facade();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/create-project-dialog.less
var init_create_project_dialog$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/create-project-dialog.override.less
var init_create_project_dialog_override = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/connector-picker-dialog.less
var init_connector_picker_dialog$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/connector-picker-dialog.tsx
var import_react$10, import_jsx_runtime$9, CheckIcon, normalizePersonalSelections, ConnectorPickerDialog;
var init_connector_picker_dialog = __esmMin((() => {
	init_connector_picker_dialog$1();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_use_vpc_connector_policy();
	init_useI18n();
	init_components();
	import_jsx_runtime$9 = require_jsx_runtime();
	CheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("svg", {
		width: "11",
		height: "11",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "3",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("polyline", { points: "20 6 9 17 4 12" })
	});
	normalizePersonalSelections = (items, allowedIds) => {
		const seen = /* @__PURE__ */ new Set();
		return items.filter((item) => {
			if (!allowedIds.has(item.id) || seen.has(item.id)) return false;
			seen.add(item.id);
			return true;
		});
	};
	ConnectorPickerDialog = ({ items, picked, onCancel, onConfirm }) => {
		const t = useTranslation();
		const vpcConnectorPolicy = useVpcConnectorPolicy();
		const visibleItems = (0, import_react$10.useMemo)(() => vpcConnectorPolicy.filterAllowed(items), [items, vpcConnectorPolicy]);
		const allowedIds = (0, import_react$10.useMemo)(() => new Set(visibleItems.map((item) => item.id)), [visibleItems]);
		const [draft, setDraft] = (0, import_react$10.useState)(() => normalizePersonalSelections(picked, allowedIds));
		(0, import_react$10.useEffect)(() => {
			const handleKey = (e) => {
				if (e.key !== "Escape") return;
				onCancel();
			};
			document.addEventListener("keydown", handleKey);
			return () => document.removeEventListener("keydown", handleKey);
		}, [onCancel]);
		const pickedSet = (0, import_react$10.useMemo)(() => new Set(draft.map((item) => item.id)), [draft]);
		const toggle = (id) => {
			setDraft((prev) => {
				if (prev.some((item) => item.id === id)) return prev.filter((item) => item.id !== id);
				return [...prev, {
					id,
					scope: "personal"
				}];
			});
		};
		const desc = t("collab.connectorPicker.desc.personal");
		const footerContent = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Button, {
			variant: "primary",
			size: "medium",
			onClick: () => onConfirm(draft),
			children: t("collab.connectorPicker.done")
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(CollabModal, {
			visible: true,
			title: t("collab.connectorPicker.title"),
			width: 640,
			footer: footerContent,
			onClose: onCancel,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", {
				className: "connector-picker-dialog__desc",
				children: desc
			}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: "connector-picker-dialog__list",
				children: visibleItems.map((item) => {
					const selected = pickedSet.has(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
						className: `connector-picker-row${selected ? " is-picked" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("button", {
							type: "button",
							className: "connector-picker-row__main",
							onClick: () => toggle(item.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
								className: "connector-picker-row__avatar",
								children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ConnectorIcon, { connector: {
									connectorName: item.id,
									displayName: item.name,
									iconUrl: item.iconUrl ?? null
								} })
							}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("span", {
								className: "connector-picker-row__text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("strong", { children: item.name }), item.description && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("small", { children: item.description })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
							type: "button",
							className: "connector-picker-row__checkbox",
							"aria-label": selected ? t("collab.connectorPicker.unselectAria", { name: item.name }) : t("collab.connectorPicker.selectAria", { name: item.name }),
							onClick: () => toggle(item.id),
							children: selected && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(CheckIcon, {})
						})]
					}, item.id);
				})
			})]
		});
	};
})), import_jsx_runtime$8, ChipCloseIcon, ConfigRow;
var init_create_project_config_row = __esmMin((() => {
	require_react();
	init_SkillAvatar();
	init_useI18n();
	import_jsx_runtime$8 = require_jsx_runtime();
	ChipCloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("path", { d: "M3.25 3.25L8.75 8.75M8.75 3.25L3.25 8.75" })
	});
	ConfigRow = (props) => {
		const { title, subtitle, pickedItems = [], groups, onAdd, onRemove } = props;
		const t = useTranslation();
		const visibleGroups = groups?.filter((group) => group.items.length > 0);
		const selectedItems = visibleGroups?.length ? visibleGroups.flatMap((group) => group.items) : pickedItems;
		const hasPicked = selectedItems.length > 0;
		const renderChip = (item) => {
			const key = item.key ?? item.id;
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("span", {
				className: "cp-chip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: "cp-chip__avatar",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillAvatar, {
							name: item.name,
							iconUrl: item.iconUrl,
							size: 20
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
						className: "cp-chip__name",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
						type: "button",
						className: "cp-chip__x",
						"aria-label": t("collab.createProject.config.removeAria", { name: item.name }),
						onClick: (e) => {
							e.stopPropagation();
							onRemove(key);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ChipCloseIcon, {})
					})
				]
			}, key);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: `cp-row${hasPicked ? " cp-row--picked" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					className: "cp-row__head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
						className: "cp-row__title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", {
							className: "cp-row__tag",
							children: t("collab.createProject.config.optional")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
						type: "button",
						className: "cp-row__action",
						onClick: onAdd,
						children: t("collab.createProject.config.add")
					})]
				}),
				subtitle && !hasPicked && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "cp-row__subtitle",
					children: subtitle
				}),
				hasPicked && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "cp-row__chips",
					children: selectedItems.map(renderChip)
				})
			]
		});
	};
})), import_jsx_runtime$7, I_SUMMARY, I_PRD, I_RESEARCH, I_REVIEW, I_TASK;
var init_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$7 = require_jsx_runtime();
	I_SUMMARY = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
				d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("rect", {
				x: "9",
				y: "3",
				width: "6",
				height: "4",
				rx: "1",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "9",
				y1: "12",
				x2: "15",
				y2: "12",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "9",
				y1: "16",
				x2: "13",
				y2: "16",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	});
	I_PRD = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "3",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "3",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "12",
				y1: "3",
				x2: "12",
				y2: "9",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "12",
				y1: "15",
				x2: "12",
				y2: "21",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	});
	I_RESEARCH = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("circle", {
				cx: "10",
				cy: "10",
				r: "7",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "15",
				y1: "15",
				x2: "21",
				y2: "21",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "10",
				y1: "7",
				x2: "10",
				y2: "13",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "7",
				y1: "10",
				x2: "13",
				y2: "10",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	});
	I_REVIEW = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
				d: "M16 18l6-6-6-6",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
				d: "M8 6l-6 6 6 6",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("line", {
				x1: "14",
				y1: "4",
				x2: "10",
				y2: "20",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	});
	I_TASK = /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		width: "22",
		height: "22",
		viewBox: "0 0 24 24",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M8 12l3 3 5-6",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/templates/bug-tracking-qa.ts
var BUG_TRACKING_QA_TEMPLATE;
var init_bug_tracking_qa = __esmMin((() => {
	init_icons();
	BUG_TRACKING_QA_TEMPLATE = {
		id: "bug-tracking-qa",
		title: "collab.list.template.bugTrackingQa.title",
		desc: "collab.list.template.bugTrackingQa.desc",
		icon: I_REVIEW,
		prompt: "collab.list.template.bugTrackingQa.instruction",
		connectors: [{
			id: "cnb-apikey",
			name: "CNB"
		}, {
			id: "github",
			name: "GitHub"
		}],
		skills: [{
			id: "skill_2057443344813191168",
			name: "diagnose"
		}, {
			id: "skill_2057443411905277952",
			name: "tdd"
		}],
		experts: [
			{
				id: "ex_cZfiyuET9UQP",
				name: "性能测试专家",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/PerformanceTestingExpert.png"
			},
			{
				id: "ex_aG1kvKbq8lPx",
				name: "高级开发工程师",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/SeniorDeveloper.png"
			},
			{
				id: "ex_uZzSAScSy7FZ",
				name: "代码审查专家",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/CodeReviewExpert.png"
			}
		]
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/templates/market-research.ts
var MARKET_RESEARCH_TEMPLATE;
var init_market_research = __esmMin((() => {
	init_icons();
	MARKET_RESEARCH_TEMPLATE = {
		id: "market-research",
		title: "collab.list.template.marketResearch.title",
		desc: "collab.list.template.marketResearch.desc",
		icon: I_RESEARCH,
		prompt: "collab.list.template.marketResearch.instruction",
		connectors: [{
			id: "tdocs-app",
			name: "腾讯文档"
		}, {
			id: "lexiang-ol",
			name: "乐享知识库"
		}],
		skills: [
			{
				id: "skill_2053082035566706688",
				name: "Deep Research"
			},
			{
				id: "skill_2053085047000309760",
				name: "元宝搜索标准版",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/tencent-yuanbao-standard-search.svg"
			},
			{
				id: "skill_2053082339107885056",
				name: "市场调研"
			},
			{
				id: "skill_2053082907836022784",
				name: "腾讯新闻",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/tencent-news.svg"
			},
			{
				id: "skill_2053083197624082432",
				name: "腾讯问卷",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/tencent-survey.png"
			},
			{
				id: "skill_2053078982015520769",
				name: "AdMapix"
			},
			{
				id: "skill_2053082401071824896",
				name: "Excel 文件处理",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/minimax-xlsx.svg"
			},
			{
				id: "skill_2053082606165762048",
				name: "PPT 演示文稿",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/pptx-generator.svg"
			}
		],
		experts: [
			{
				id: "ex_mMbwwmFA9n9P",
				name: "深度研究专家",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/DeepResearchExpert.png"
			},
			{
				id: "ex_KzqKQguubrNQ",
				name: "反馈综合分析师",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/FeedbackSynthesisAnalyst.png"
			},
			{
				id: "ex_DdCsaoq4AtcO",
				name: "行业趋势专家",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/TrendResearcher.png"
			}
		]
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/templates/product-requirements.ts
var PRODUCT_REQUIREMENTS_TEMPLATE;
var init_product_requirements = __esmMin((() => {
	init_icons();
	PRODUCT_REQUIREMENTS_TEMPLATE = {
		id: "product-requirements",
		title: "collab.list.template.productRequirements.title",
		desc: "collab.list.template.productRequirements.desc",
		icon: I_PRD,
		prompt: "collab.list.template.productRequirements.instruction",
		connectors: [{
			id: "tapd-apikey",
			name: "TAPD"
		}, {
			id: "tdocs-app",
			name: "腾讯文档"
		}],
		skills: [{
			id: "skill_2053084099650080768",
			name: "腾讯会议",
			iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/tencent-meeting-skill.png"
		}, {
			id: "skill_2053082035566706688",
			name: "Deep Research"
		}],
		experts: [
			{
				id: "ex_KzqKQguubrNQ",
				name: "反馈综合分析师",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/FeedbackSynthesisAnalyst.png"
			},
			{
				id: "ex_SMUnl0nJbPix",
				name: "用户体验研究员",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/UserExperienceResearcher.png"
			},
			{
				id: "ex_hSwsQjkSKnkX",
				name: "快速原型工程师",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/RapidPrototypingEngineer.png"
			}
		]
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/templates/project-delivery.ts
var PROJECT_DELIVERY_TEMPLATE;
var init_project_delivery = __esmMin((() => {
	init_icons();
	PROJECT_DELIVERY_TEMPLATE = {
		id: "project-delivery",
		title: "collab.list.template.projectDelivery.title",
		desc: "collab.list.template.projectDelivery.desc",
		icon: I_TASK,
		prompt: "collab.list.template.projectDelivery.instruction",
		connectors: [{
			id: "tdocs-app",
			name: "腾讯文档"
		}, {
			id: "lexiang-ol",
			name: "乐享知识库"
		}],
		skills: [
			{
				id: "skill_2053084099650080768",
				name: "腾讯会议",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/tencent-meeting-skill.png"
			},
			{
				id: "skill_2053082606165762048",
				name: "PPT 演示文稿",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/pptx-generator.svg"
			},
			{
				id: "skill_2053082401071824896",
				name: "Excel 文档处理",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/minimax-xlsx.svg"
			},
			{
				id: "skill_2053082396193849344",
				name: "Word 文档生成",
				iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/minimax-docx.svg"
			}
		],
		experts: [
			{
				id: "ex_uAQE5POfk7Zh",
				name: "品牌策略师",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/BrandGuardian.png"
			},
			{
				id: "ex_NX5C8GBciVed",
				name: "PPT 制作专家",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/KdocsPptCreator.png"
			},
			{
				id: "ex_PZw8Gu81HfN4",
				name: "方案策划师",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/ProposalStrategist.png"
			},
			{
				id: "ex_a3sSSFBy8qaC",
				name: "大客户策略师",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/EnterpriseAccountStrategist.png"
			},
			{
				id: "ex_ROsDtJbzADFV",
				name: "高级项目经理",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/SeniorProjectManager.png"
			},
			{
				id: "ex_eggOvQuVP0hq",
				name: "客户合规官",
				iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/KycScreener.png"
			}
		]
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/templates/team-knowledge-base.ts
var TEAM_KNOWLEDGE_BASE_TEMPLATE;
var init_team_knowledge_base = __esmMin((() => {
	init_icons();
	TEAM_KNOWLEDGE_BASE_TEMPLATE = {
		id: "team-knowledge-base",
		title: "collab.list.template.teamKnowledgeBase.title",
		desc: "collab.list.template.teamKnowledgeBase.desc",
		icon: I_SUMMARY,
		prompt: "collab.list.template.teamKnowledgeBase.instruction",
		connectors: [
			{
				id: "lexiang-ol",
				name: "乐享知识库"
			},
			{
				id: "tdocs-app",
				name: "腾讯文档"
			},
			{
				id: "notion",
				name: "Notion"
			}
		],
		skills: [{
			id: "skill_2053084099650080768",
			name: "腾讯会议",
			iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/tencent-meeting-skill.png"
		}, {
			id: "skill_2053083151135014912",
			name: "企业微信套件",
			iconUrl: "https://openplatform-cdn.codebuddy.cn/public/skills/icons/wecom-unified.svg"
		}],
		experts: [{
			id: "ex_ZTR062oVBOCW",
			name: "知识管理专家",
			iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/LlmWiki.png"
		}, {
			id: "ex_al1vxtUOYQ10",
			name: "文档生成专家",
			iconUrl: "https://codebuddy-platform-1258344699.cos.accelerate.myqcloud.com/public/experts/avatars/DocumentGenerationExpert.png"
		}]
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/templates/index.ts
var PROJECT_TEMPLATES$1;
var init_templates = __esmMin((() => {
	init_bug_tracking_qa();
	init_market_research();
	init_product_requirements();
	init_project_delivery();
	init_team_knowledge_base();
	PROJECT_TEMPLATES$1 = [
		PRODUCT_REQUIREMENTS_TEMPLATE,
		MARKET_RESEARCH_TEMPLATE,
		TEAM_KNOWLEDGE_BASE_TEMPLATE,
		PROJECT_DELIVERY_TEMPLATE,
		BUG_TRACKING_QA_TEMPLATE
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/create-project-data.ts
/**
* 把落地页模板（`templates/*.ts` 定义，含 SVG 图标等 UI 字段）
* 降维到弹窗消费的纯数据结构：去掉 icon，把 connectors 平铺成 scope 形式。
*
* 约定：
*   - landing 模板的 connectors 默认以 `personal` scope 接入（当前无公共/个人区分语义）
*   - skills / experts 保留 `{ id, name, iconUrl }`：name / iconUrl 用作 chip 离线 fallback
*   - title / prompt 字段已经是 i18n key（见 `templates/product-requirements.ts`），
*     映射到弹窗 ProjectTemplate 的 name / instruction（也都是 key）。
*/
function fromLandingTemplate(tpl) {
	const overseas = isOverseas();
	return {
		id: tpl.id,
		name: tpl.title,
		instruction: tpl.prompt,
		connectors: overseas ? void 0 : tpl.connectors?.map((c) => ({
			id: c.id,
			scope: "personal"
		})),
		skills: overseas ? void 0 : tpl.skills?.map((s) => ({
			id: s.id,
			name: s.name,
			iconUrl: s.iconUrl
		})),
		experts: overseas ? void 0 : tpl.experts?.map((e) => ({
			id: e.id,
			name: e.name,
			iconUrl: e.iconUrl
		}))
	};
}
var CUSTOM_TEMPLATE_ID, PROJECT_TEMPLATES;
var init_create_project_data = __esmMin((() => {
	init_environment();
	init_templates();
	CUSTOM_TEMPLATE_ID = "custom";
	PROJECT_TEMPLATES = [{
		id: CUSTOM_TEMPLATE_ID,
		name: "collab.list.template.custom.name",
		instruction: ""
	}, ...PROJECT_TEMPLATES$1.map(fromLandingTemplate)];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/create-project-dialog.tsx
var import_react$7, import_jsx_runtime$6, MAX_NAME_LEN, filterKnownConnectors, CreateProjectDialog;
var init_create_project_dialog = __esmMin((() => {
	init_create_project_dialog$1();
	init_create_project_dialog_override();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_utils();
	init_foundation();
	init_i18n();
	init_useI18n();
	init_environment();
	init_common();
	init_expert();
	init_components();
	init_constants();
	init_connector_picker_dialog();
	init_create_project_config_row();
	init_create_project_data();
	import_jsx_runtime$6 = require_jsx_runtime();
	MAX_NAME_LEN = 15;
	filterKnownConnectors = (items, options) => {
		const knownIds = new Set(options.map((c) => c.id));
		return items.filter((c) => knownIds.has(c.id));
	};
	CreateProjectDialog = ({ onConfirm, onCancel, initialName = "", initialInstruction = "", initialTemplateId, busy = false }) => {
		const host = useModuleHost();
		const connectorFacade = host.facades.connector;
		const t = useTranslation();
		/**
		* 项目可选连接器候选列表 — 来自 registry（A1 `/connector/registry2c/list?scope=all`），
		* 与项目详情页「添加连接器」抽屉共用同一接口。
		*
		* 设计原则：
		*   - **不再 fallback 到本地静态 mock**。原 `CONNECTOR_OPTIONS` 里的 id 是占位（如
		*     'tencent-docs'），与后端真实 `connector_name` 不一致；让用户选了 mock 会导致
		*     创建项目时被后端拒，或后续详情页查不到。
		*   - 加载中 / 失败时禁用「添加连接器」入口，并展示对应文案。
		*   - registry 回来后剔除模板预置但 registry 不存在的 id，避免提交报错。
		*/
		const [connectorOptions, setConnectorOptions] = (0, import_react$7.useState)([]);
		const [connectorRegistryStatus, setConnectorRegistryStatus] = (0, import_react$7.useState)("idle");
		/**
		* 初始模板只来自外部显式传入。
		* 直接点「新建项目」时保持未选模板状态：按钮显示「选择模板」，表单保持空白。
		*/
		const initialTemplate = (0, import_react$7.useMemo)(() => {
			if (!initialTemplateId) return null;
			return PROJECT_TEMPLATES.find((t) => t.id === initialTemplateId) ?? null;
		}, [initialTemplateId]);
		const [name, setName] = (0, import_react$7.useState)(initialName);
		const [instruction, setInstruction] = (0, import_react$7.useState)(() => clampProjectInstruction(initialInstruction || (initialTemplate?.instruction ? t(initialTemplate.instruction) : "")));
		const [templateId, setTemplateId] = (0, import_react$7.useState)(initialTemplate?.id ?? null);
		const [connectors, setConnectors] = (0, import_react$7.useState)(initialTemplate?.connectors ?? []);
		const [pickedSkills, setPickedSkills] = (0, import_react$7.useState)(() => (initialTemplate?.skills ?? []).map((s) => ({
			id: s.id,
			name: s.name,
			iconUrl: s.iconUrl
		})));
		const [pickedExperts, setPickedExperts] = (0, import_react$7.useState)(() => (initialTemplate?.experts ?? []).map((e) => ({
			id: e.id,
			name: e.name,
			iconUrl: e.iconUrl
		})));
		const [pickerOpen, setPickerOpen] = (0, import_react$7.useState)(null);
		const nameInputRef = (0, import_react$7.useRef)(null);
		const handleCancel = (0, import_react$7.useCallback)(() => {
			if (busy) return;
			onCancel();
		}, [busy, onCancel]);
		(0, import_react$7.useEffect)(() => {
			nameInputRef.current?.focus();
		}, []);
		(0, import_react$7.useEffect)(() => {
			const handleKey = (e) => {
				if (pickerOpen) return;
				if (e.key === "Escape") handleCancel();
			};
			document.addEventListener("keydown", handleKey);
			return () => document.removeEventListener("keydown", handleKey);
		}, [handleCancel, pickerOpen]);
		(0, import_react$7.useEffect)(() => {
			let cancelled = false;
			const loadRegistry = async () => {
				if (!connectorFacade) {
					setConnectorOptions([]);
					setConnectorRegistryStatus("error");
					return;
				}
				setConnectorRegistryStatus("loading");
				try {
					const result = await connectorFacade.listRegistry({ scope: "all" });
					if (cancelled) return;
					const list = result?.list ?? [];
					if (!Array.isArray(list)) throw new Error("Invalid connector registry response: list is not an array");
					const items = list.map((c) => ({
						id: c.name,
						name: c.displayName || c.name,
						description: c.description || "",
						iconUrl: c.iconUrl || void 0,
						avatar: (c.displayName || c.name).slice(0, 1)
					}));
					setConnectorOptions(items);
					setConnectorRegistryStatus("ready");
					setConnectors((prev) => filterKnownConnectors(prev, items));
				} catch (err) {
					if (cancelled) return;
					console.warn("[CreateProjectDialog] listRegistry failed:", err);
					setConnectorOptions([]);
					setConnectorRegistryStatus("error");
					message.error(t("collab.createProject.connectors.registryLoadFailed"), 2400);
				}
			};
			loadRegistry();
			return () => {
				cancelled = true;
			};
		}, [connectorFacade, t]);
		const valid = name.trim().length > 0;
		const applyTemplate = (0, import_react$7.useCallback)((id) => {
			const tpl = PROJECT_TEMPLATES.find((item) => item.id === id);
			if (!tpl) return;
			if (id === "custom") {
				setTemplateId(null);
				setInstruction("");
				setConnectors([]);
				setPickedSkills([]);
				setPickedExperts([]);
				return;
			}
			setTemplateId(id);
			if (tpl.instruction) setInstruction(clampProjectInstruction(t(tpl.instruction)));
			const presetConnectors = tpl.connectors ?? [];
			setConnectors(connectorRegistryStatus === "ready" ? filterKnownConnectors(presetConnectors, connectorOptions) : presetConnectors);
			setPickedSkills((tpl.skills ?? []).map((s) => ({
				id: s.id,
				name: s.name,
				iconUrl: s.iconUrl
			})));
			setPickedExperts((tpl.experts ?? []).map((e) => ({
				id: e.id,
				name: e.name,
				iconUrl: e.iconUrl
			})));
		}, [t]);
		const selectedTemplate = (0, import_react$7.useMemo)(() => templateId ? PROJECT_TEMPLATES.find((item) => item.id === templateId) ?? null : null, [templateId]);
		const selectedTemplateName = selectedTemplate ? t(selectedTemplate.name) : t("collab.list.createDialog.selectTemplate");
		const templateMenuItems = (0, import_react$7.useMemo)(() => {
			const normalTemplates = PROJECT_TEMPLATES.filter((tpl) => tpl.id !== CUSTOM_TEMPLATE_ID);
			const customTemplate = PROJECT_TEMPLATES.find((tpl) => tpl.id === CUSTOM_TEMPLATE_ID);
			const normalItems = normalTemplates.map((tpl) => ({
				key: tpl.id,
				label: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					title: t(tpl.name),
					children: t(tpl.name)
				}),
				selected: tpl.id === templateId
			}));
			if (!customTemplate) return normalItems;
			return [...normalItems, {
				key: customTemplate.id,
				label: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
					title: t(customTemplate.name),
					children: t(customTemplate.name)
				}),
				selected: templateId === null || customTemplate.id === templateId,
				divider: normalItems.length > 0
			}];
		}, [templateId, t]);
		const handleSubmit = () => {
			if (!valid || busy) return;
			if (connectors.length > 0 && connectorRegistryStatus !== "ready") {
				message.error(t("collab.createProject.connectors.registryRequiredBeforeSubmit"), 2400);
				return;
			}
			const submitConnectors = filterKnownConnectors(connectors, connectorOptions);
			const rawExperts = pickedExpertsRawRef.current;
			const rawExpertsMap = new Map(rawExperts.map((e) => [e.marketExpertId || e.id, e]));
			const marketExperts = [];
			const customExperts = [];
			const locale = getLocale() === "en" ? "en" : "zh";
			for (let i = 0; i < pickedExperts.length; i++) {
				const item = pickedExperts[i];
				const raw = rawExpertsMap.get(item.id);
				if (raw && raw.isCustomExpert && raw.expertRootDir) customExperts.push({
					id: raw.id,
					name: getLocalizedText(raw.profession, locale, raw.name),
					expertRootDir: raw.expertRootDir,
					profession: raw.profession,
					description: raw.displayDescription || raw.description,
					avatar: raw.avatar
				});
				else marketExperts.push({
					expertId: item.id,
					displayOrder: i
				});
			}
			const rawSkills = pickedSkillsRawRef.current;
			const rawSkillsMap = new Map(rawSkills.map((s) => [s.id, s]));
			const marketSkills = [];
			const customSkills = [];
			for (let i = 0; i < pickedSkills.length; i++) {
				const item = pickedSkills[i];
				const raw = rawSkillsMap.get(item.id);
				if (raw && raw.provider === "custom" && raw.filePath) customSkills.push({
					id: raw.id,
					name: raw.name,
					filePath: raw.filePath,
					description: raw.description,
					iconUrl: raw.iconUrl
				});
				else marketSkills.push({
					skillId: item.id,
					provider: item.provider,
					displayOrder: i,
					name: item.name,
					description: item.description,
					iconUrl: item.iconUrl
				});
			}
			onConfirm({
				name: name.trim(),
				instruction: instruction.trim() || void 0,
				templateId: templateId || void 0,
				skills: marketSkills.length > 0 ? marketSkills : void 0,
				experts: marketExperts.length > 0 ? marketExperts : void 0,
				connectors: submitConnectors.length > 0 ? submitConnectors.map((c) => ({
					connectorName: c.id,
					authMode: "personal"
				})) : void 0,
				customExperts: customExperts.length > 0 ? customExperts : void 0,
				customSkills: customSkills.length > 0 ? customSkills : void 0
			});
		};
		const connectorItems = (0, import_react$7.useMemo)(() => connectors.map((item) => connectorOptions.find((x) => x.id === item.id)).filter(Boolean), [connectors, connectorOptions]);
		const handleConnectorConfirm = (picked) => {
			setConnectors(filterKnownConnectors(picked, connectorOptions));
			setPickerOpen(null);
		};
		const handleOpenConnectorPicker = () => {
			if (connectorRegistryStatus === "loading") {
				message.info(t("collab.createProject.connectors.registryLoading"), 1800);
				return;
			}
			if (connectorRegistryStatus === "error") {
				message.error(t("collab.createProject.connectors.registryLoadFailed"), 2400);
				return;
			}
			if (connectorOptions.length === 0) {
				message.info(t("collab.createProject.connectors.noAvailable"), 2e3);
				return;
			}
			setPickerOpen("connector");
		};
		const handleRemoveConnector = (id) => {
			setConnectors((items) => items.filter((item) => item.id !== id));
		};
		const pickedExpertsRawRef = (0, import_react$7.useRef)([]);
		const handlePickExperts = (0, import_react$7.useCallback)(async () => {
			const result = await host.invokePicker("experts.pick", {
				selectedIds: pickedExperts.map((e) => e.id),
				hideTeamTab: true
			});
			if (result && result.length > 0) {
				pickedExpertsRawRef.current = result;
				const locale = getLocale() === "en" ? "en" : "zh";
				const prevMap = new Map(pickedExperts.map((e) => [e.id, e]));
				setPickedExperts(result.map((e) => {
					const profession = getLocalizedText(e.profession, locale);
					const name = getLocalizedText(e.name, locale, e.id);
					const resolvedId = e.marketExpertId || e.id;
					const resolvedName = profession || name;
					const prev = prevMap.get(resolvedId);
					return {
						id: resolvedId,
						name: resolvedName === resolvedId && prev?.name ? prev.name : resolvedName,
						description: "",
						iconUrl: resolveAvatarUrl(e.avatar) || prev?.iconUrl || ""
					};
				}));
			}
		}, [host, pickedExperts]);
		const pickedSkillsRawRef = (0, import_react$7.useRef)([]);
		const handlePickSkills = (0, import_react$7.useCallback)(async () => {
			const result = await host.invokePicker("skills.pick", {
				selectedIds: pickedSkills.map((s) => s.id),
				selectedItems: pickedSkills.map((s) => ({
					id: s.id,
					name: s.name,
					description: s.description,
					iconUrl: s.iconUrl,
					provider: s.provider
				})),
				markets: [
					"recommend",
					"skillhub",
					"installed"
				]
			});
			if (result && result.length > 0) {
				pickedSkillsRawRef.current = result;
				const existingMap = new Map(pickedSkills.map((s) => [s.id, s]));
				setPickedSkills(result.map((s) => {
					const existing = existingMap.get(s.id);
					if (existing && s.name === s.id) return {
						...existing,
						provider: s.provider ?? existing.provider
					};
					return {
						id: s.id,
						name: s.name,
						description: s.description,
						iconUrl: s.iconUrl,
						provider: s.provider
					};
				}));
			}
		}, [host, pickedSkills]);
		const footerContent = /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
				className: "create-project-dialog__version-note",
				children: t("collab.list.createDialog.versionNote")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
				className: "create-project-dialog__action-btn",
				variant: "secondary",
				size: "medium",
				onClick: handleCancel,
				disabled: busy,
				children: t("collab.list.createDialog.cancel")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Button, {
				className: "create-project-dialog__action-btn",
				variant: "primary",
				size: "medium",
				disabled: !valid || busy,
				onClick: handleSubmit,
				children: t("collab.list.createDialog.confirm")
			})
		] });
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CollabModal, {
			visible: true,
			title: t("collab.list.createDialog.title"),
			width: 640,
			maxHeight: "min(560px, calc(100vh - 48px))",
			footer: footerContent,
			showClose: !busy,
			backdrop: !busy,
			onClose: handleCancel,
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: "create-project-dialog__body create-project-dialog__body--compact",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("section", {
						className: "cp-field",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
								className: "cp-field__label",
								children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("collab.list.createDialog.nameLabel") })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Input, {
								ref: nameInputRef,
								className: "cp-field__input",
								placeholder: t("collab.list.createDialog.namePlaceholder"),
								value: name,
								maxLength: MAX_NAME_LEN,
								onChange: (e) => setName(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
								className: `cp-field__counter${name.length >= MAX_NAME_LEN ? " cp-field__counter--overflow" : ""}`,
								children: [
									name.length,
									"/",
									MAX_NAME_LEN
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("section", {
						className: "cp-field cp-field--instruction",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
							className: "cp-field__label cp-field__label--with-action",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("collab.list.createDialog.instructionLabel") }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Dropdown, {
								items: templateMenuItems,
								placement: "bottom-end",
								className: "cp-template-dropdown",
								onSelect: (key) => applyTemplate(key),
								trigger: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
									type: "button",
									className: "cp-template-select",
									title: selectedTemplateName,
									children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
										className: "cp-template-select__label",
										children: selectedTemplateName
									}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ChevronDownIcon, {})]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Input.TextArea, {
							className: "cp-field__textarea",
							placeholder: t("collab.list.createDialog.instructionPlaceholder", { productName: getProductName() }),
							value: instruction,
							maxLength: PROJECT_INSTRUCTION_MAX_INPUT_LENGTH,
							onChange: (e) => setInstruction(clampProjectInstruction(e.target.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("section", {
						className: "cp-field cp-field--rows",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ConfigRow, {
								title: t("collab.connectors.title"),
								pickedItems: connectorItems,
								onAdd: handleOpenConnectorPicker,
								onRemove: handleRemoveConnector
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ConfigRow, {
								title: t("collab.list.createDialog.expertTitle"),
								pickedItems: pickedExperts,
								onAdd: handlePickExperts,
								onRemove: (id) => setPickedExperts((items) => items.filter((x) => x.id !== id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ConfigRow, {
								title: t("collab.list.createDialog.skillTitle"),
								pickedItems: pickedSkills,
								onAdd: handlePickSkills,
								onRemove: (id) => setPickedSkills((items) => items.filter((x) => x.id !== id))
							})
						]
					})
				]
			})
		}), pickerOpen === "connector" && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ConnectorPickerDialog, {
			items: connectorOptions,
			picked: connectors,
			onCancel: () => setPickerOpen(null),
			onConfirm: handleConnectorConfirm
		})] });
	};
})), import_jsx_runtime$5, DeleteProjectDialog;
var init_delete_project_dialog = __esmMin((() => {
	require_react();
	init_foundation();
	init_useI18n();
	import_jsx_runtime$5 = require_jsx_runtime();
	DeleteProjectDialog = ({ projectName, onCancel, onConfirm, busy = false }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Modal, {
			open: true,
			size: "small",
			variant: "confirm",
			title: t("collab.list.deleteDialog.title"),
			okText: t("collab.list.deleteDialog.confirm"),
			cancelText: t("collab.list.deleteDialog.cancel"),
			okType: "danger",
			okButtonProps: {
				disabled: busy,
				"data-track-id": "collab_project_delete_confirm",
				"data-track-name": "确认删除项目"
			},
			confirmLoading: busy,
			closeOnOverlayClick: !busy,
			closeOnEscape: !busy,
			onOpenChange: (next) => {
				if (!next && !busy) onCancel();
			},
			onOk: () => {
				if (!busy) onConfirm();
				return false;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "project-list-dialog-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "project-dialog__name",
					children: projectName
				}), t("collab.list.deleteDialog.message")]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/project-grid.less
var init_project_grid$1 = __esmMin((() => {})), import_jsx_runtime$4, ProjectListIcon;
var init_project_list_icon = __esmMin((() => {
	require_react();
	init_icons$1();
	import_jsx_runtime$4 = require_jsx_runtime();
	ProjectListIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ProjectIconV2, {
		className,
		size: "lg",
		"aria-hidden": "true"
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/project-grid.tsx
/**
* 计算相对时间文案。
* 由调用方传入翻译函数 `t`（v1.3 A.3 第 10 条：mapper / utils 不在模块顶层执行 `t()`，
* 由 React 组件或调用方传入，确保 locale 切换时能 re-render）。
*/
function timeAgo(dateStr, t) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const minutes = Math.floor(diff / 6e4);
	if (minutes < 1) return t("collab.list.grid.timeJustNow");
	if (minutes < 60) return t("collab.list.grid.timeMinutesAgo", { count: minutes });
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return t("collab.list.grid.timeHoursAgo", { count: hours });
	const days = Math.floor(hours / 24);
	if (days < 30) return t("collab.list.grid.timeDaysAgo", { count: days });
	return t("collab.list.grid.timeMonthsAgo", { count: Math.floor(days / 30) });
}
var import_react$4, import_jsx_runtime$3, SearchIcon, MoreIcon, ExpandToggleIcon, RenameIcon, LeaveIcon, DeleteIcon, COLLAPSED_PROJECT_RENDER_COUNT, LOAD_MORE_SKELETON_COUNT, ProjectGrid;
var init_project_grid = __esmMin((() => {
	init_project_grid$1();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	init_permissions();
	init_project_list_icon();
	import_jsx_runtime$3 = require_jsx_runtime();
	SearchIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
			cx: "11",
			cy: "11",
			r: "8"
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", { d: "m21 21-4.3-4.3" })]
	});
	MoreIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		stroke: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
				cx: "12",
				cy: "5",
				r: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
				cx: "12",
				cy: "19",
				r: "1.6"
			})
		]
	});
	ExpandToggleIcon = ({ expanded }) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("polyline", { points: "18 15 12 9 6 15" }) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("polyline", { points: "6 9 12 15 18 9" })
	});
	RenameIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", { d: "M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" })
	});
	LeaveIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("polyline", { points: "16 17 21 12 16 7" }),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
				x1: "21",
				y1: "12",
				x2: "9",
				y2: "12"
			})
		]
	});
	DeleteIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
	});
	COLLAPSED_PROJECT_RENDER_COUNT = 12;
	LOAD_MORE_SKELETON_COUNT = 4;
	ProjectGrid = ({ projects, searchQuery, onSearchChange, onSelect, onRename, onDelete, onLeave, loading, loadingMore, hasMore, onLoadMore }) => {
		const t = useTranslation();
		const [menuOpenId, setMenuOpenId] = (0, import_react$4.useState)(null);
		const [isExpanded, setIsExpanded] = (0, import_react$4.useState)(false);
		const [collapsedOverflow, setCollapsedOverflow] = (0, import_react$4.useState)(false);
		const cardsRef = (0, import_react$4.useRef)(null);
		const sentinelRef = (0, import_react$4.useRef)(null);
		const loadingMoreRef = (0, import_react$4.useRef)(false);
		loadingMoreRef.current = !!loadingMore;
		(0, import_react$4.useLayoutEffect)(() => {
			if (isExpanded || loading) {
				setCollapsedOverflow(false);
				return;
			}
			const el = cardsRef.current;
			if (!el) {
				setCollapsedOverflow(false);
				return;
			}
			const update = () => {
				setCollapsedOverflow(el.scrollHeight > el.clientHeight + 1);
			};
			update();
			const observer = new ResizeObserver(update);
			observer.observe(el);
			window.addEventListener("resize", update);
			return () => {
				observer.disconnect();
				window.removeEventListener("resize", update);
			};
		}, [
			isExpanded,
			loading,
			projects.length
		]);
		(0, import_react$4.useEffect)(() => {
			const sentinel = sentinelRef.current;
			if (!isExpanded || !sentinel || !onLoadMore || !hasMore) return;
			const observer = new IntersectionObserver((entries) => {
				if (entries[0]?.isIntersecting && !loadingMoreRef.current) onLoadMore();
			}, {
				threshold: 0,
				rootMargin: "0px 0px 300px 0px"
			});
			observer.observe(sentinel);
			return () => observer.disconnect();
		}, [
			isExpanded,
			onLoadMore,
			hasMore,
			projects.length
		]);
		const buildMenuItems = (0, import_react$4.useCallback)((project) => {
			const allowed = getProjectCardMenuItems({
				role: project.members[0]?.role ?? "viewer",
				roleId: project.roleId,
				permissions: project.permissions
			});
			const items = [];
			if (allowed.includes("rename")) items.push({
				key: "rename",
				label: t("collab.list.grid.menuRename"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(RenameIcon, {})
			});
			if (onLeave && allowed.includes("leave")) items.push({
				key: "leave",
				label: t("collab.list.grid.menuLeave"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(LeaveIcon, {}),
				danger: true
			});
			if (allowed.includes("delete")) items.push({
				key: "delete",
				label: t("collab.list.grid.menuDelete"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DeleteIcon, {}),
				danger: true
			});
			return items;
		}, [t, onLeave]);
		const handleMenuSelect = (0, import_react$4.useCallback)((project, key) => {
			if (key === "rename") onRename(project);
			else if (key === "leave") onLeave?.(project);
			else if (key === "delete") onDelete(project);
		}, [
			onRename,
			onLeave,
			onDelete
		]);
		const visibleProjects = isExpanded ? projects : projects.slice(0, COLLAPSED_PROJECT_RENDER_COUNT);
		const showExpandToggle = !loading && (isExpanded || hasMore || collapsedOverflow || projects.length > COLLAPSED_PROJECT_RENDER_COUNT);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("section", {
			className: "project-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "project-grid__section-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h2", {
						className: "project-grid__section-title",
						children: t("collab.list.grid.sectionTitle")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input, {
						className: "project-grid__search",
						prefix: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SearchIcon, {}),
						placeholder: t("collab.list.grid.searchPlaceholder"),
						value: searchQuery,
						onChange: (e) => onSearchChange(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "project-grid__body",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "project-grid__cards project-grid__cards--collapsed",
						ref: cardsRef,
						"aria-hidden": "true",
						children: Array.from({ length: COLLAPSED_PROJECT_RENDER_COUNT }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "project-grid__card project-grid__card--loading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "project-grid__loading-icon" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "project-grid__loading-lines",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { className: "project-grid__loading-line project-grid__loading-line--title" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { className: "project-grid__loading-line project-grid__loading-line--desc" })]
							})]
						}, `project-initial-loading-${index}`))
					}) : projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "project-grid__empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "project-grid__empty-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" })
							})
						}), searchQuery ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
							className: "project-grid__empty-text",
							children: t("collab.list.grid.empty")
						}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "project-grid__empty-text-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
								className: "project-grid__empty-title",
								children: t("collab.list.grid.emptyTitle")
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
								className: "project-grid__empty-subtitle",
								children: t("collab.list.grid.emptySubtitle")
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: `project-grid__cards${isExpanded ? "" : " project-grid__cards--collapsed"}`,
						ref: cardsRef,
						children: [visibleProjects.map((project) => {
							const menuOpen = menuOpenId === project.id;
							const menuItems = buildMenuItems(project);
							return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: `project-grid__card${menuOpen ? " project-grid__card--menu-open" : ""}`,
								onClick: () => onSelect(project.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "project-grid__card-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ProjectListIcon, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
										className: "project-grid__card-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
											className: "project-grid__card-name",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
												className: "project-grid__card-name-text",
												children: project.name
											}), project.isExternal && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tag, {
												tone: "info",
												size: "small",
												className: "project-grid__card-external-tag",
												children: t("collab.list.grid.externalBadge")
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
											className: "project-grid__card-desc",
											children: t("collab.list.grid.cardJoinedAt", { time: timeAgo(project.joinedAt ?? project.updatedAt, t) })
										})]
									}),
									menuItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "project-grid__card-more-wrap",
										onMouseDown: (e) => e.stopPropagation(),
										onClick: (e) => e.stopPropagation(),
										children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Dropdown, {
											items: menuItems,
											placement: "bottom-end",
											portalRoot: "body",
											onOpenChange: (open) => setMenuOpenId(open ? project.id : null),
											onSelect: (key) => handleMenuSelect(project, key),
											trigger: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
												className: `project-grid__card-more${menuOpen ? " project-grid__card-more--active" : ""}`,
												onMouseDown: (e) => e.stopPropagation(),
												onClick: (e) => e.stopPropagation(),
												"aria-label": t("collab.list.grid.menuMore"),
												children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(MoreIcon, {})
											})
										})
									})
								]
							}, project.id);
						}), isExpanded && loadingMore && Array.from({ length: LOAD_MORE_SKELETON_COUNT }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "project-grid__card project-grid__card--loading",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { className: "project-grid__loading-icon" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
								className: "project-grid__loading-lines",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { className: "project-grid__loading-line project-grid__loading-line--title" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { className: "project-grid__loading-line project-grid__loading-line--desc" })]
							})]
						}, `project-loading-${index}`))]
					}), isExpanded && hasMore && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						ref: sentinelRef,
						className: "project-grid__load-more",
						children: loadingMore && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
							className: "project-grid__load-more-text",
							children: t("collab.list.grid.loadMore")
						})
					})]
				}),
				showExpandToggle && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
					type: "button",
					className: "project-grid__toggle",
					onClick: () => setIsExpanded((prev) => !prev),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: t(isExpanded ? "collab.list.grid.collapse" : "collab.list.grid.expandAll") }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ExpandToggleIcon, { expanded: isExpanded })]
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/rename-project-dialog.less
var init_rename_project_dialog$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/rename-project-dialog.tsx
var import_react$3, import_jsx_runtime$2, MAX_LEN, RenameProjectDialog;
var init_rename_project_dialog = __esmMin((() => {
	init_rename_project_dialog$1();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	import_jsx_runtime$2 = require_jsx_runtime();
	MAX_LEN = 15;
	RenameProjectDialog = ({ project, onCancel, onConfirm, busy = false }) => {
		const t = useTranslation();
		const [value, setValue] = (0, import_react$3.useState)(project.name);
		const inputRef = (0, import_react$3.useRef)(null);
		const trimmed = value.trim();
		const valid = trimmed.length > 0 && trimmed !== project.name;
		const atLimit = value.length >= MAX_LEN;
		const focusAndSelectInput = (0, import_react$3.useCallback)(() => {
			const el = inputRef.current;
			if (!el) return;
			el.focus({ preventScroll: true });
			el.setSelectionRange(0, el.value.length);
		}, []);
		const focusAndSelectInitialValue = (0, import_react$3.useCallback)(() => {
			if (inputRef.current?.value !== project.name) return;
			focusAndSelectInput();
		}, [focusAndSelectInput, project.name]);
		(0, import_react$3.useEffect)(() => {
			const timers = [];
			const raf = window.requestAnimationFrame(() => {
				focusAndSelectInitialValue();
				timers.push(window.setTimeout(focusAndSelectInitialValue, 0));
				timers.push(window.setTimeout(focusAndSelectInitialValue, 50));
			});
			return () => {
				window.cancelAnimationFrame(raf);
				timers.forEach((timer) => window.clearTimeout(timer));
			};
		}, [focusAndSelectInitialValue]);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Modal, {
			open: true,
			size: "small",
			width: 400,
			variant: "confirm",
			title: t("collab.list.renameDialog.title"),
			okText: t("collab.list.renameDialog.confirm"),
			cancelText: t("collab.list.renameDialog.cancel"),
			okButtonProps: { disabled: !valid || busy },
			confirmLoading: busy,
			closeOnOverlayClick: !busy,
			closeOnEscape: !busy,
			onOpenChange: (next) => {
				if (!next && !busy) onCancel();
			},
			onOk: () => {
				if (valid && !busy) onConfirm(trimmed);
				return false;
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "rename-project-dialog",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "rename-project-dialog__hint",
						children: [t("collab.list.renameDialog.originalNameLabel"), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: project.name })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Input, {
						ref: inputRef,
						className: "rename-project-dialog__input",
						value,
						maxLength: MAX_LEN,
						variant: "filled",
						placeholder: t("collab.list.renameDialog.placeholder"),
						onChange: (e) => setValue(e.target.value),
						onPressEnter: () => {
							if (valid && !busy) onConfirm(trimmed);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: `rename-project-dialog__counter${atLimit ? " rename-project-dialog__counter--overflow" : ""}`,
						children: [
							value.length,
							"/",
							MAX_LEN
						]
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/templates-grid.less
var init_templates_grid$1 = __esmMin((() => {})), import_jsx_runtime$1, TemplatesGrid;
var init_templates_grid = __esmMin((() => {
	init_templates_grid$1();
	require_react();
	init_useI18n();
	init_project_list_icon();
	init_templates();
	import_jsx_runtime$1 = require_jsx_runtime();
	TemplatesGrid = ({ onPick }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
			className: "landing-templates",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "landing-templates-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("strong", { children: t("collab.list.templatesGrid.head") })
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "landing-templates-list",
				children: PROJECT_TEMPLATES$1.map((tpl) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
					type: "button",
					className: "landing-template-card",
					onClick: () => onPick(tpl),
					"data-track-id": "collab_project_template_pick",
					"data-track-name": "选择项目模板",
					"data-track-props": JSON.stringify({ templateId: tpl.id }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "landing-template-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ProjectListIcon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
						className: "landing-template-text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("strong", {
							title: t(tpl.title),
							children: t(tpl.title)
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("small", {
							title: t(tpl.desc),
							children: t(tpl.desc)
						})]
					})]
				}, tpl.id))
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/project-list/use-projects.ts
/**
* 计算「是否还有更多数据」。
*
* 三条触底规则（任一命中即为「无更多」）：
*   1. 当前页返回空（emptyPage）：哪怕 total 还显示更大，前端也立即停止，
*      避免遇到后端 total 滞后/异常时陷入 page=53 这种无意义请求；
*   2. 已持有数量 ≥ total（reachedTotal）：标准触底；
*   3. 当前页号已经超过 total 能装下的最大页（pageBeyondTotal）：兜底防御，
*      如果某次返回 items 非空但 page 已越界，也强制结束。
*
* @param currentLen   合并后列表长度
* @param total        后端最新 total
* @param lastPageItems 最近一次返回的 items 数量
* @param page         最近一次请求的页号
* @param size         每页条数
*/
function computeHasMore(currentLen, total, lastPageItems, page, size) {
	if (lastPageItems === 0) return false;
	if (total > 0 && currentLen >= total) return false;
	if (total > 0 && page * size >= total) return false;
	return true;
}
function useProjects(options = {}) {
	const { params, fallback, pageSize = DEFAULT_PAGE_SIZE } = options;
	const t = useTranslation();
	const facade = useAgentServices()?.project;
	const { account, isInitialized: accountInitialized } = useAccountService();
	const [items, setItems] = (0, import_react$1.useState)([]);
	const [loading, setLoading] = (0, import_react$1.useState)(true);
	const [loadingMore, setLoadingMore] = (0, import_react$1.useState)(false);
	const [hasMore, setHasMore] = (0, import_react$1.useState)(false);
	const [usingFallback, setUsingFallback] = (0, import_react$1.useState)(false);
	const [error, setError] = (0, import_react$1.useState)(null);
	/** 跟踪最后一次 params 序列化形态，避免 useEffect 无限触发 */
	const paramsKey = JSON.stringify(params ?? {});
	/** 为了让命令方法看到最新的 usingFallback 状态 */
	const usingFallbackRef = (0, import_react$1.useRef)(false);
	usingFallbackRef.current = usingFallback;
	/** 避免 IntersectionObserver 在短时间内重复触发并发 loadMore */
	const loadMoreInFlightRef = (0, import_react$1.useRef)(false);
	/** 当前页码（从 1 开始） */
	const currentPageRef = (0, import_react$1.useRef)(1);
	/** 当前已持有的列表数量，用于按 total 做请求上限保护 */
	const itemsCountRef = (0, import_react$1.useRef)(0);
	/** 后端返回的总数，用于防止超过 total 后继续请求 */
	const totalRef = (0, import_react$1.useRef)(0);
	/**
	* refresh 序号 token：每次 refresh 自增，loadMore 在请求前后比对该值。
	* 若期间 params 变化触发了新的 refresh，老的 loadMore 响应将被丢弃，
	* 避免把旧 params 的尾页 append 到新列表上。
	*/
	const refreshTokenRef = (0, import_react$1.useRef)(0);
	/** 首次 + params 变更时从第一页拉取 */
	const refresh = (0, import_react$1.useCallback)(async () => {
		const token = ++refreshTokenRef.current;
		if (!facade) {
			const nextItems = fallback ?? [];
			itemsCountRef.current = nextItems.length;
			totalRef.current = nextItems.length;
			setItems(nextItems);
			setUsingFallback(true);
			setLoading(false);
			setHasMore(false);
			return;
		}
		setLoading(true);
		setError(null);
		currentPageRef.current = 1;
		loadMoreInFlightRef.current = false;
		try {
			const result = await facade.list({
				...params,
				page: 1,
				size: pageSize,
				autoOnboarding: true
			});
			if (token !== refreshTokenRef.current) return;
			itemsCountRef.current = result.items.length;
			totalRef.current = result.total;
			setItems(result.items);
			setUsingFallback(false);
			setHasMore(computeHasMore(result.items.length, result.total, result.items.length, 1, pageSize));
		} catch (e) {
			if (token !== refreshTokenRef.current) return;
			const msg = e instanceof Error ? e.message : String(e);
			const nextItems = fallback ?? [];
			itemsCountRef.current = nextItems.length;
			totalRef.current = nextItems.length;
			setError(msg);
			setItems(nextItems);
			setUsingFallback(true);
			setHasMore(false);
		} finally {
			if (token === refreshTokenRef.current) setLoading(false);
		}
	}, [
		facade,
		paramsKey,
		fallback,
		pageSize
	]);
	/** 加载下一页（追加到列表后） */
	const loadMore = (0, import_react$1.useCallback)(async () => {
		if (!facade || usingFallbackRef.current || !hasMore || loadMoreInFlightRef.current) return;
		if (totalRef.current > 0 && itemsCountRef.current >= totalRef.current) {
			setHasMore(false);
			return;
		}
		loadMoreInFlightRef.current = true;
		const token = refreshTokenRef.current;
		setLoadingMore(true);
		const nextPage = currentPageRef.current + 1;
		try {
			const result = await facade.list({
				...params,
				page: nextPage,
				size: pageSize
			});
			if (token !== refreshTokenRef.current) return;
			currentPageRef.current = nextPage;
			totalRef.current = result.total;
			setItems((prev) => {
				const merged = [...prev, ...result.items];
				itemsCountRef.current = merged.length;
				setHasMore(computeHasMore(merged.length, result.total, result.items.length, nextPage, pageSize));
				return merged;
			});
		} catch (e) {
			if (token !== refreshTokenRef.current) return;
			message.error(e instanceof Error ? e.message : t("collab.list.errors.loadMoreFailed"));
		} finally {
			if (token === refreshTokenRef.current) {
				loadMoreInFlightRef.current = false;
				setLoadingMore(false);
			}
		}
	}, [
		facade,
		params,
		pageSize,
		hasMore
	]);
	(0, import_react$1.useEffect)(() => {
		if (!accountInitialized) return;
		if (!account) {
			itemsCountRef.current = 0;
			totalRef.current = 0;
			setItems([]);
			setUsingFallback(false);
			setHasMore(false);
			setError(null);
			setLoading(false);
			return;
		}
		refresh().catch(() => void 0);
	}, [
		accountInitialized,
		account,
		refresh
	]);
	(0, import_react$1.useEffect)(() => subscribeProjectChange(() => {
		if (usingFallbackRef.current) return;
		refresh().catch(() => void 0);
	}), [refresh]);
	return {
		items,
		loading,
		loadingMore,
		hasMore,
		usingFallback,
		error,
		refresh,
		loadMore,
		create: (0, import_react$1.useCallback)(async (p) => {
			if (!facade || usingFallbackRef.current) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				const mock = {
					projectId: `local_${Date.now()}`,
					name: p.name,
					instructions: p.instructions,
					role: "admin",
					createdAt: now,
					updatedAt: now,
					joinedAt: now
				};
				itemsCountRef.current += 1;
				totalRef.current += 1;
				setItems((prev) => [mock, ...prev]);
				return mock;
			}
			try {
				const created = await facade.create(p);
				itemsCountRef.current += 1;
				totalRef.current += 1;
				setItems((prev) => [created, ...prev]);
				emitProjectChange();
				return created;
			} catch (e) {
				if (e instanceof ProjectQuotaExceededError || e instanceof ExclusivePlanNotSupportedError) throw e;
				const projectQuota = tryParseProjectQuotaError(e);
				if (projectQuota) throw new ProjectQuotaExceededError(projectQuota);
				if (isExclusivePlanError(e)) throw new ExclusivePlanNotSupportedError();
				const msg = e instanceof Error ? e.message : t("collab.list.errors.createFailed");
				message.error(msg);
				return null;
			}
		}, [facade]),
		rename: (0, import_react$1.useCallback)(async (projectId, name) => {
			const prev = items;
			setItems((cur) => cur.map((it) => it.projectId === projectId ? {
				...it,
				name
			} : it));
			if (!facade || usingFallbackRef.current) return true;
			try {
				await facade.update(projectId, { name });
				emitProjectChange();
				return true;
			} catch (e) {
				setItems(prev);
				message.error(e instanceof Error ? e.message : t("collab.list.errors.renameFailed"));
				return false;
			}
		}, [facade, items]),
		updateInstructions: (0, import_react$1.useCallback)(async (projectId, instructions) => {
			const patch = { instructions };
			const prev = items;
			setItems((cur) => cur.map((it) => it.projectId === projectId ? {
				...it,
				instructions
			} : it));
			if (!facade || usingFallbackRef.current) return;
			try {
				await facade.update(projectId, patch);
			} catch (e) {
				setItems(prev);
				message.error(e instanceof Error ? e.message : t("collab.list.errors.saveFailed"));
			}
		}, [facade, items]),
		remove: (0, import_react$1.useCallback)(async (projectId) => {
			const prev = items;
			const prevCount = itemsCountRef.current;
			const prevTotal = totalRef.current;
			setItems((cur) => cur.filter((it) => it.projectId !== projectId));
			itemsCountRef.current = Math.max(0, prevCount - 1);
			totalRef.current = Math.max(0, prevTotal - 1);
			if (!facade || usingFallbackRef.current) return true;
			try {
				await facade.delete(projectId);
				emitProjectChange();
				return true;
			} catch (e) {
				setItems(prev);
				itemsCountRef.current = prevCount;
				totalRef.current = prevTotal;
				message.error(e instanceof Error ? e.message : t("collab.list.errors.deleteFailed"));
				return false;
			}
		}, [facade, items]),
		archive: (0, import_react$1.useCallback)(async (projectId) => {
			const prev = items;
			const prevCount = itemsCountRef.current;
			const prevTotal = totalRef.current;
			setItems((cur) => cur.filter((it) => it.projectId !== projectId));
			itemsCountRef.current = Math.max(0, prevCount - 1);
			totalRef.current = Math.max(0, prevTotal - 1);
			if (!facade || usingFallbackRef.current) return true;
			try {
				await facade.archive(projectId);
				emitProjectChange();
				return true;
			} catch (e) {
				setItems(prev);
				itemsCountRef.current = prevCount;
				totalRef.current = prevTotal;
				message.error(e instanceof Error ? e.message : t("collab.list.errors.archiveFailed"));
				return false;
			}
		}, [facade, items]),
		leave: (0, import_react$1.useCallback)(async (projectId) => {
			const prev = items;
			const prevCount = itemsCountRef.current;
			const prevTotal = totalRef.current;
			setItems((cur) => cur.filter((it) => it.projectId !== projectId));
			itemsCountRef.current = Math.max(0, prevCount - 1);
			totalRef.current = Math.max(0, prevTotal - 1);
			if (!facade || usingFallbackRef.current) return true;
			try {
				await facade.leave(projectId);
				emitProjectChange();
				return true;
			} catch (e) {
				setItems(prev);
				itemsCountRef.current = prevCount;
				totalRef.current = prevTotal;
				message.error(e instanceof Error ? e.message : t("collab.list.errors.leaveFailed"));
				return false;
			}
		}, [facade, items])
	};
}
var import_react$1, DEFAULT_PAGE_SIZE;
var init_use_projects = __esmMin((() => {
	init_project();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_auth_context();
	init_foundation();
	init_useI18n();
	init_app_providers();
	init_project_change_bus();
	DEFAULT_PAGE_SIZE = 20;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/pages/project-list-page.tsx
function domainToLegacyProject(p) {
	return {
		id: p.projectId,
		name: p.name,
		description: p.instructions ?? "",
		members: [{
			id: "__current__",
			name: "我",
			role: p.role
		}],
		role: p.role,
		roleId: p.roleId,
		permissions: p.permissions,
		isExternal: p.isExternal,
		instructions: p.instructions ?? "",
		documents: [],
		connectors: MOCK_AVAILABLE_CONNECTORS,
		experts: [],
		skills: [],
		automations: [],
		tracks: [],
		tasks: MOCK_DETAIL_TASKS,
		activities: MOCK_DETAIL_ACTIVITIES,
		createdAt: p.createdAt,
		updatedAt: p.updatedAt ?? p.createdAt,
		joinedAt: p.joinedAt
	};
}
var import_react, import_react_dom, import_jsx_runtime, ProjectListPage, QuotaToastPortal;
//#endregion
__esmMin((() => {
	init_project();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_workbuddy_topbar();
	init_auth_context();
	init_foundation();
	init_use_debounced_value();
	init_i18n();
	init_useI18n();
	init_app_providers();
	init_avatar_url();
	init_landing_hero();
	init_beacon_report();
	init_quota_toast();
	init_use_project_quota_guard();
	init_use_quota_error();
	init_mock_data();
	init_create_project_dialog();
	init_delete_project_dialog();
	init_leave_project_dialog();
	init_project_grid();
	init_rename_project_dialog();
	init_templates_grid();
	init_use_projects();
	init_use_busy_action();
	init_teams_telemetry_fields();
	import_jsx_runtime = require_jsx_runtime();
	ProjectListPage = ({ onSelectProject }) => {
		const t = useTranslation();
		const teamsReport = useTeamsReport();
		const { account, isInitialized: accountInitialized } = useAccountService();
		const accountReady = accountInitialized && !!account;
		const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
		const debouncedKeyword = useDebouncedValue(searchQuery.trim(), 300);
		const { items: domainProjects, loading, loadingMore, hasMore, loadMore, usingFallback, refresh, create, rename, remove, leave } = useProjects({ params: (0, import_react.useMemo)(() => ({
			status: "active",
			order: "joined",
			...debouncedKeyword ? { keyword: debouncedKeyword } : {}
		}), [debouncedKeyword]) });
		const services = useAgentServices();
		const reportedListViewRef = (0, import_react.useRef)(false);
		(0, import_react.useEffect)(() => {
			if (reportedListViewRef.current) return;
			reportedListViewRef.current = true;
			teamsReport(TEAMS_EVENT.PAGE_SHOW, { pageName: TEAMS_ELEMENT.PROJECT_LIST_VIEW });
		}, [teamsReport]);
		const [createDialogVisible, setCreateDialogVisible] = (0, import_react.useState)(false);
		const [createDefaults, setCreateDefaults] = (0, import_react.useState)(null);
		const [renameTargetId, setRenameTargetId] = (0, import_react.useState)(null);
		const [deleteTargetId, setDeleteTargetId] = (0, import_react.useState)(null);
		const [leaveTargetId, setLeaveTargetId] = (0, import_react.useState)(null);
		const createAction = useBusyAction();
		const renameAction = useBusyAction();
		const deleteAction = useBusyAction();
		const leaveAction = useBusyAction();
		const quotaGuard = useProjectQuotaGuard();
		const { presentProjectQuota } = useQuotaErrorPresenter();
		const legacyGridProjects = (0, import_react.useMemo)(() => domainProjects.map(domainToLegacyProject), [domainProjects]);
		const findDomain = (0, import_react.useCallback)((id) => domainProjects.find((p) => p.projectId === id), [domainProjects]);
		const renameTarget = renameTargetId ? findDomain(renameTargetId) : null;
		const deleteTarget = deleteTargetId ? findDomain(deleteTargetId) : null;
		const leaveTarget = leaveTargetId ? findDomain(leaveTargetId) : null;
		const showSuccessToast = (0, import_react.useCallback)((message$1) => {
			message.success(message$1, 2400);
		}, []);
		/** Exclusive 用户（17261）全局拦截：所有 quota 接口都可能抛，统一 toast 提示。 */
		const handleExclusiveBlocked = (0, import_react.useCallback)(() => {
			message.error(t("collab.quota.exclusive.blocked"));
		}, [t]);
		const openCreateDialog = (0, import_react.useCallback)(() => {
			if (!accountReady) return;
			quotaGuard.runWithQuotaGuard(() => {
				setCreateDefaults(null);
				setCreateDialogVisible(true);
			}).catch((err) => {
				if (err instanceof ExclusivePlanNotSupportedError) handleExclusiveBlocked();
			});
		}, [
			accountReady,
			quotaGuard,
			handleExclusiveBlocked
		]);
		const handlePickTemplate = (0, import_react.useCallback)((template) => {
			if (!accountReady) return;
			quotaGuard.runWithQuotaGuard(() => {
				setCreateDefaults({
					templateId: template.id,
					instruction: t(template.prompt)
				});
				setCreateDialogVisible(true);
			}).catch((err) => {
				if (err instanceof ExclusivePlanNotSupportedError) handleExclusiveBlocked();
			});
		}, [
			accountReady,
			t,
			quotaGuard,
			handleExclusiveBlocked
		]);
		const handleCreateProject = (0, import_react.useCallback)(async (params) => {
			await createAction.run(async () => {
				const createParams = {
					name: params.name,
					instructions: params.instruction,
					skills: params.skills,
					experts: params.experts,
					connectors: params.connectors
				};
				try {
					const created = await create(createParams);
					if (!created) return;
					const uploadFailures = [];
					if (params.customExperts?.length || params.customSkills?.length) {
						const projectFacade = services?.project;
						const expertFacade = services?.expert;
						const personalSkillsFacade = services?.personalSkills;
						if (params.customExperts?.length && expertFacade?.exportZip && projectFacade?.uploadCustomExpert) for (const ce of params.customExperts) try {
							const zipResult = await expertFacade.exportZip({
								expertRootDir: ce.expertRootDir,
								expertId: ce.id
							});
							if (!zipResult.success || !zipResult.zipPath) {
								uploadFailures.push(ce.name);
								continue;
							}
							const uploadOptions = {
								name: ce.name,
								sourceId: ce.id
							};
							if (ce.description) {
								const desc = typeof ce.description === "string" ? ce.description : ce.description.zh || ce.description.en || "";
								if (desc) uploadOptions.description = desc;
							}
							await projectFacade.uploadCustomExpert(created.projectId, {
								filePath: zipResult.zipPath,
								name: `${ce.id}.zip`
							}, uploadOptions);
						} catch (err) {
							console.warn("[ProjectListPage] custom expert upload failed:", ce.name, err);
							uploadFailures.push(ce.name);
						}
						else if (params.customExperts?.length) uploadFailures.push(...params.customExperts.map((e) => e.name));
						if (params.customSkills?.length && personalSkillsFacade?.exportZip && projectFacade?.uploadSkill) for (const cs of params.customSkills) try {
							let skillRootDir = cs.filePath;
							const lastSlash = cs.filePath.lastIndexOf("/");
							if (lastSlash > 0 && cs.filePath.includes(".", lastSlash)) skillRootDir = cs.filePath.substring(0, lastSlash);
							const zipResult = await personalSkillsFacade.exportZip({
								skillRootDir,
								skillName: cs.name
							});
							if (!zipResult.success || !zipResult.zipPath) {
								uploadFailures.push(cs.name);
								continue;
							}
							await projectFacade.uploadSkill(created.projectId, {
								filePath: zipResult.zipPath,
								name: `${cs.name}.zip`
							}, {
								name: cs.name,
								sourceId: cs.id,
								description: cs.description
							});
						} catch (err) {
							console.warn("[ProjectListPage] custom skill upload failed:", cs.name, err);
							uploadFailures.push(cs.name);
						}
						else if (params.customSkills?.length) uploadFailures.push(...params.customSkills.map((s) => s.name));
						if (uploadFailures.length > 0) message.warning(t("collab.createProject.customUploadPartialFail", { names: uploadFailures.join(", ") }), 4e3);
					}
					teamsReport(TEAMS_EVENT.ELEMENT_CLICK, {
						elementName: TEAMS_ELEMENT.PROJECT_CREATE_SUBMIT,
						...buildProjectCreateSubmitPayload({
							templateId: params.templateId,
							instruction: params.instruction,
							connectors: params.connectors,
							skills: params.skills,
							experts: params.experts
						})
					});
					setCreateDialogVisible(false);
					setCreateDefaults(null);
					const legacyProject = domainToLegacyProject(created);
					if (params.customExperts?.length) {
						const locale = getLocale() === "en" ? "en" : "zh";
						legacyProject.experts = params.customExperts.filter((ce) => !uploadFailures.includes(ce.name)).map((ce) => {
							const desc = typeof ce.description === "string" ? ce.description : locale === "en" ? ce.description?.en || ce.description?.zh || "" : ce.description?.zh || ce.description?.en || "";
							return {
								id: `custom-pending-${ce.id}`,
								name: ce.name,
								description: desc,
								avatar: resolveAvatarUrl(ce.avatar),
								localExpertName: ce.id,
								quickPrompt: void 0
							};
						});
					}
					{
						const initialSkills = [];
						if (params.skills?.length) {
							initialSkills.push(...params.skills.map((s) => ({
								id: s.skillId,
								name: s.name || s.skillId,
								description: s.description || "",
								enabled: true,
								provider: s.provider,
								iconUrl: s.iconUrl
							})));
							const projectFacade = services?.project;
							if (projectFacade?.updateSkills) projectFacade.updateSkills(created.projectId, { skills: params.skills.map((s) => ({
								skillId: s.skillId,
								provider: s.provider,
								displayNameZh: s.name,
								displayNameEn: s.name,
								descriptionZh: s.description,
								descriptionEn: s.description,
								icon: s.iconUrl
							})) }).catch((err) => {
								console.warn("[ProjectListPage] updateSkills display metadata cache failed:", err);
							});
						}
						if (params.customSkills?.length) {
							const successCustom = params.customSkills.filter((cs) => !uploadFailures.includes(cs.name));
							initialSkills.push(...successCustom.map((cs) => ({
								id: cs.id,
								name: cs.name,
								description: cs.description || "",
								enabled: true,
								provider: "custom",
								iconUrl: cs.iconUrl,
								localSkillName: cs.name
							})));
						}
						if (initialSkills.length > 0) legacyProject.skills = initialSkills;
					}
					onSelectProject(legacyProject, "new_project");
				} catch (e) {
					if (e instanceof ProjectQuotaExceededError) {
						quotaGuard.setQuotaError(e.data);
						refresh().catch(() => void 0);
						return;
					}
					if (e instanceof ExclusivePlanNotSupportedError) {
						setCreateDialogVisible(false);
						setCreateDefaults(null);
						handleExclusiveBlocked();
						return;
					}
					throw e;
				}
			});
		}, [
			create,
			createAction,
			onSelectProject,
			quotaGuard,
			handleExclusiveBlocked,
			refresh,
			services,
			t
		]);
		const handleRenameConfirm = (0, import_react.useCallback)(async (newName) => {
			if (!renameTargetId) return;
			await renameAction.run(async () => {
				if (!await rename(renameTargetId, newName)) return;
				showSuccessToast(t("collab.list.toast.renamed", { name: newName }));
				setRenameTargetId(null);
			});
		}, [
			renameTargetId,
			rename,
			renameAction,
			showSuccessToast,
			t
		]);
		const handleDeleteConfirm = (0, import_react.useCallback)(async () => {
			if (!deleteTargetId) return;
			await deleteAction.run(async () => {
				const target = findDomain(deleteTargetId);
				if (!await remove(deleteTargetId)) return;
				showSuccessToast(t("collab.list.toast.deleted", { name: target?.name ?? "" }));
				setDeleteTargetId(null);
			});
		}, [
			deleteTargetId,
			deleteAction,
			findDomain,
			remove,
			showSuccessToast,
			t
		]);
		const handleLeaveConfirm = (0, import_react.useCallback)(async () => {
			if (!leaveTargetId) return;
			await leaveAction.run(async () => {
				const target = findDomain(leaveTargetId);
				if (!await leave(leaveTargetId)) return;
				showSuccessToast(t("collab.list.toast.left", { name: target?.name ?? "" }));
				setLeaveTargetId(null);
			});
		}, [
			leaveTargetId,
			leaveAction,
			findDomain,
			leave,
			showSuccessToast,
			t
		]);
		const newBtnRef = (0, import_react.useRef)(null);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "workbuddy-collab",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkBuddyTopBar, {
					showUserPromptList: false,
					hideNewTask: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "landing",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "landing-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "landing-header__content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "landing-title-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "landing-title",
										children: t("collab.list.title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "landing-subtitle",
										children: t("collab.list.subtitle")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "primary",
									size: "medium",
									className: "landing-new-btn",
									onClick: openCreateDialog,
									disabled: !accountReady,
									ref: newBtnRef,
									leftIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "5",
											x2: "12",
											y2: "19"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "5",
											y1: "12",
											x2: "19",
											y2: "12"
										})]
									}),
									children: t("collab.list.newProject")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "landing-hero",
								src: landing_hero_default,
								alt: t("collab.list.heroAlt")
							})]
						}),
						quotaGuard.quotaError && (() => {
							const presentation = presentProjectQuota(quotaGuard.quotaError);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotaToastPortal, {
								anchorRef: newBtnRef,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotaToast, {
									className: "quota-toast--from-left",
									title: presentation.title,
									message: presentation.message,
									action: presentation.action,
									onClose: quotaGuard.dismiss
								})
							});
						})(),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "landing-main",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectGrid, {
								projects: legacyGridProjects,
								searchQuery,
								onSearchChange: setSearchQuery,
								loading: loading && domainProjects.length === 0 && !usingFallback && !debouncedKeyword,
								loadingMore,
								hasMore,
								onLoadMore: loadMore,
								onSelect: (id) => {
									const target = domainProjects.find((p) => p.projectId === id);
									if (target) onSelectProject(domainToLegacyProject(target));
								},
								onCreate: openCreateDialog,
								onRename: (p) => setRenameTargetId(p.id),
								onDelete: (p) => setDeleteTargetId(p.id),
								onLeave: (p) => setLeaveTargetId(p.id)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatesGrid, { onPick: handlePickTemplate })]
						})
					]
				}),
				createDialogVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateProjectDialog, {
					initialName: createDefaults?.name,
					initialInstruction: createDefaults?.instruction,
					initialTemplateId: createDefaults?.templateId,
					onConfirm: handleCreateProject,
					onCancel: () => {
						setCreateDialogVisible(false);
						setCreateDefaults(null);
					},
					busy: createAction.busy
				}),
				renameTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenameProjectDialog, {
					project: domainToLegacyProject(renameTarget),
					onCancel: () => setRenameTargetId(null),
					onConfirm: handleRenameConfirm,
					busy: renameAction.busy
				}),
				deleteTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteProjectDialog, {
					projectName: deleteTarget.name,
					onCancel: () => setDeleteTargetId(null),
					onConfirm: handleDeleteConfirm,
					busy: deleteAction.busy
				}),
				leaveTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaveProjectDialog, {
					projectName: leaveTarget.name,
					onCancel: () => setLeaveTargetId(null),
					onConfirm: handleLeaveConfirm,
					busy: leaveAction.busy
				})
			]
		}, "project-list");
	};
	QuotaToastPortal = ({ anchorRef, children }) => {
		const [pos, setPos] = (0, import_react.useState)(null);
		const updatePos = (0, import_react.useCallback)(() => {
			const el = anchorRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const GAP = 8;
			const maxLeft = Math.max(0, window.innerWidth - 320 - GAP);
			setPos({
				top: Math.max(0, rect.bottom + GAP),
				left: Math.min(Math.max(0, rect.left), maxLeft)
			});
		}, [anchorRef]);
		(0, import_react.useLayoutEffect)(() => {
			updatePos();
		}, [updatePos]);
		(0, import_react.useEffect)(() => {
			const handler = () => updatePos();
			window.addEventListener("resize", handler);
			window.addEventListener("scroll", handler, true);
			let observer = null;
			if (typeof ResizeObserver !== "undefined" && anchorRef.current) {
				observer = new ResizeObserver(handler);
				observer.observe(anchorRef.current);
			}
			return () => {
				window.removeEventListener("resize", handler);
				window.removeEventListener("scroll", handler, true);
				observer?.disconnect();
			};
		}, [anchorRef, updatePos]);
		if (!pos || typeof document === "undefined") return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "fixed",
				top: pos.top,
				left: pos.left,
				zIndex: 10050
			},
			children
		}), document.body);
	};
}))();
export { ProjectListPage, ProjectListPage as default };
