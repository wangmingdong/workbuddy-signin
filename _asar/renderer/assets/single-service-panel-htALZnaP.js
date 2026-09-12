import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Sc as init_app_providers, Tc as useAgentServices, dd as init_use_is_enterprise_admin, fd as useEffectiveEdition, fu as init_use_oneid_app_status, gu as init_use_oneid_applications, hu as findOneidApp, mu as fetchOneidApplications, pd as useIsEnterpriseEdition, pu as useOneidAppStatus, vu as refreshOneidApplications } from "./agent-mail-CiuzbR2o.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { f as useNavigate, r as init_dist } from "./dist-BlOCCi14.js";
import { _t as useAccount, t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { b as TencentDocsBrandIcon, x as init_TencentDocsBrandIcon } from "./oauth-callback-IQ0UCaVX.js";
import { L as reportTDocOneidLoginAuthClickAdmin, R as reportTDocOneidLoginModalShowAdmin, c as reportTDocActivateButtonClickAdmin, d as reportTDocActivatePageShowMember, f as reportTDocActivateSuccessAdminFirst, l as reportTDocActivateButtonClickMember, t as init_telemetry, u as reportTDocActivatePageShowAdmin } from "./telemetry-DmUpjlLA.js";
import { Ct as reportOneidLoginAuthClickAdmin, dt as reportActivateButtonClickAdmin, ft as reportActivateButtonClickMember, ht as reportActivateSuccessAdminFirst, mt as reportActivatePageShowMember, pt as reportActivatePageShowAdmin, ut as init_telemetry$1, wt as reportOneidLoginModalShowAdmin } from "./lexiang-file-type-icon-BHHdkoaP.js";
import { n as init_header_workbuddy, t as header_workbuddy_default } from "./header-workbuddy-UO2zaYBA.js";
import { i as init_oneid_env, n as init_lazy_oneid_app_activation, r as ONEID_ENV, t as LazyOneidAppActivation } from "./lazy-oneid-app-activation-BEI6P8Nb.js";
import { c as lexiangAuthStore, d as hasPassedPostActivation } from "./auth-guide-DhEAKsIJ.js";
import { t as init_auth } from "./auth-DpImsS3d.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-onboarding-panel/style.scss
var init_style = __esmMin((() => {})), import_jsx_runtime$2, Bar, KnowledgeBaseOnboardingSkeleton;
var init_onboarding_skeleton = __esmMin((() => {
	require_react();
	init_useI18n();
	import_jsx_runtime$2 = require_jsx_runtime();
	Bar = ({ modifier }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
		className: `kb-onboarding-skeleton__bar kb-onboarding-skeleton__bar--${modifier}`,
		"aria-hidden": "true"
	});
	KnowledgeBaseOnboardingSkeleton = ({ cardCount, withBrands = false }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "kb-onboarding-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: [
					"kb-onboarding-panel__content",
					cardCount === 1 ? "kb-onboarding-panel__content--single" : "",
					"kb-onboarding-skeleton"
				].filter(Boolean).join(" "),
				role: "status",
				"aria-label": t("common.loading"),
				children: [
					withBrands && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "kb-onboarding-skeleton__brands",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { className: "kb-onboarding-skeleton__brand" }),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", {
								className: "kb-onboarding-skeleton__brand-connect",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { className: "kb-onboarding-skeleton__brand-arrow" }),
									/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { className: "kb-onboarding-skeleton__brand-arrow" }),
									/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { className: "kb-onboarding-skeleton__brand-arrow" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { className: "kb-onboarding-skeleton__brand" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "kb-onboarding-skeleton__header",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "title" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "subtitle" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "kb-onboarding-skeleton__cards",
						"aria-hidden": "true",
						children: Array.from({ length: cardCount }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "kb-onboarding-skeleton__card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
									className: "kb-onboarding-skeleton__card-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { className: "kb-onboarding-skeleton__card-icon" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
										className: "kb-onboarding-skeleton__card-heading",
										children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "card-title" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "card-desc" })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
									className: "kb-onboarding-skeleton__card-body",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "line-main" }),
										/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "line-sub" }),
										/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "line-short" })
									]
								}),
								cardCount === 2 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "btn" })
							]
						}, idx))
					}),
					cardCount === 1 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "kb-onboarding-skeleton__btn-row",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "btn" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "kb-onboarding-skeleton__footnote",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Bar, { modifier: "footnote" })
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/logos/lexiang.png
var lexiang_default;
var init_lexiang = __esmMin((() => {
	lexiang_default = "" + new URL("lexiang-DvYlzGjp.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-onboarding-panel/service-card.tsx
function getLexiangActivateSuccessFirstKey(enterpriseId, accountUid) {
	return `${LEXIANG_ACTIVATE_SUCCESS_FIRST_KEY_PREFIX}${enterpriseId}:${accountUid}`;
}
/** 是否已记录过「乐享首次开通成功」幂等标记。读失败按"未记录"处理（保守上报） */
function hasReportedLexiangActivateFirst(enterpriseId, accountUid) {
	if (!enterpriseId || !accountUid) return false;
	try {
		return window.localStorage.getItem(getLexiangActivateSuccessFirstKey(enterpriseId, accountUid)) === "1";
	} catch {
		return false;
	}
}
/** 标记「乐享首次开通成功」已上报（写失败静默：埋点不应阻塞业务） */
function markLexiangActivateFirstReported(enterpriseId, accountUid) {
	if (!enterpriseId || !accountUid) return;
	try {
		window.localStorage.setItem(getLexiangActivateSuccessFirstKey(enterpriseId, accountUid), "1");
	} catch {}
}
function getTDocActivateSuccessFirstKey(enterpriseId, accountUid) {
	return `${TDOC_ACTIVATE_SUCCESS_FIRST_KEY_PREFIX}${enterpriseId}:${accountUid}`;
}
/** 是否已记录过「腾讯文档首次开通成功」幂等标记。读失败按"未记录"处理（保守上报） */
function hasReportedTDocActivateFirst(enterpriseId, accountUid) {
	if (!enterpriseId || !accountUid) return false;
	try {
		return window.localStorage.getItem(getTDocActivateSuccessFirstKey(enterpriseId, accountUid)) === "1";
	} catch {
		return false;
	}
}
/** 标记「腾讯文档首次开通成功」已上报（写失败静默：埋点不应阻塞业务） */
function markTDocActivateFirstReported(enterpriseId, accountUid) {
	if (!enterpriseId || !accountUid) return;
	try {
		window.localStorage.setItem(getTDocActivateSuccessFirstKey(enterpriseId, accountUid), "1");
	} catch {}
}
/** 按 service key 查找配置（找不到返回 undefined） */
function findServiceConfig(key) {
	return SERVICE_LIST.find((s) => s.key === key);
}
/**
* OneID 官方授权成功后的后端流程
*/
async function finalizeAuthorization(service) {
	if (service.key === "tencentLexiang") lexiangAuthStore.setState({
		authStatus: "connected",
		authError: null,
		authorizeUrl: null,
		connectedAt: (/* @__PURE__ */ new Date()).toISOString(),
		expireAt: null
	});
}
var import_react$1, import_jsx_runtime$1, LEXIANG_ACTIVATE_SUCCESS_FIRST_KEY_PREFIX, TDOC_ACTIVATE_SUCCESS_FIRST_KEY_PREFIX, LEARN_MORE_URLS, SERVICE_LIST, ServiceCard;
var init_service_card = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_lexiang();
	init_contexts();
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_use_oneid_applications();
	init_useI18n();
	init_app_providers();
	init_TencentDocsBrandIcon();
	init_oneid_env();
	init_telemetry();
	init_auth();
	init_telemetry$1();
	init_lazy_oneid_app_activation();
	import_jsx_runtime$1 = require_jsx_runtime();
	LEXIANG_ACTIVATE_SUCCESS_FIRST_KEY_PREFIX = "wb:lexiang:activate-success-first:";
	TDOC_ACTIVATE_SUCCESS_FIRST_KEY_PREFIX = "wb:tdoc:activate-success-first:";
	LEARN_MORE_URLS = {
		tencentDocs: "https://docs.qq.com/home/price",
		tencentLexiang: "https://lexiang.tencent.com/"
	};
	SERVICE_LIST = [{
		key: "tencentDocs",
		appType: "doc",
		titleKey: "libraryOnboarding.tencentDocs.title",
		descKey: "libraryOnboarding.tencentDocs.desc",
		icon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TencentDocsBrandIcon, {
			width: 32,
			height: 28
		}),
		capabilityKeys: [
			"libraryOnboarding.tencentDocs.capability.collaboration",
			"libraryOnboarding.tencentDocs.capability.search",
			"libraryOnboarding.tencentDocs.capability.context",
			"libraryOnboarding.tencentDocs.capability.preview"
		]
	}, {
		key: "tencentLexiang",
		appType: "lexiang",
		titleKey: "libraryOnboarding.tencentLexiang.title",
		descKey: "libraryOnboarding.tencentLexiang.desc",
		icon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
			src: lexiang_default,
			alt: "",
			"aria-hidden": "true",
			draggable: false
		}),
		capabilityKeys: [
			"libraryOnboarding.tencentLexiang.capability.knowledge",
			"libraryOnboarding.tencentLexiang.capability.permission",
			"libraryOnboarding.tencentLexiang.capability.sync",
			"libraryOnboarding.tencentLexiang.capability.reference"
		]
	}];
	ServiceCard = ({ service, badgeKey, badgeTone, actionKey, actionType, onContactAdmin, showLearnMore = false, buttonOutside = false, purchaseUrl }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const services = useAgentServices();
		const tencentLexiangFacade = services?.tencentLexiang ?? null;
		const { account } = useAccount();
		const enterpriseId = account?.enterpriseId ?? "";
		const accountUid = account?.uid ?? "";
		const isEnterpriseEdition = useIsEnterpriseEdition();
		const { setTencentDocsPanelConnectorId } = useConversations();
		const navigate = useNavigate();
		const oneidStatus = useOneidAppStatus(service.appType);
		const [oneidActive, setOneidActive] = (0, import_react$1.useState)(false);
		const [approving, setApproving] = (0, import_react$1.useState)(false);
		const [activeOneidCode, setActiveOneidCode] = (0, import_react$1.useState)("");
		const finalizeGuardRef = (0, import_react$1.useRef)(false);
		const isEnabled = oneidStatus.status === "enabled";
		const isChecking = oneidStatus.status === "checking";
		const isAdmin = isEnabled || oneidStatus.isAdmin;
		const cardClassName = `kb-onboarding-card${isEnabled ? " kb-onboarding-card--enabled" : ""}`;
		const badgeClassName = `kb-onboarding-card__badge kb-onboarding-card__badge--${badgeTone}`;
		const closeOneid = (0, import_react$1.useCallback)(() => {
			setOneidActive(false);
			setActiveOneidCode("");
			document.documentElement.classList.remove("dark");
		}, []);
		const handleAuthorizeClick = (0, import_react$1.useCallback)(() => {
			if (oneidStatus.activationCode) {
				setActiveOneidCode(oneidStatus.activationCode);
				finalizeGuardRef.current = false;
				setOneidActive(true);
				return;
			}
			const diagnostic = {
				serviceKey: service.key,
				appType: service.appType,
				status: oneidStatus.status,
				appName: oneidStatus.appName,
				error: oneidStatus.error,
				hasActivationCode: false
			};
			console.error("[KnowledgeBaseOnboardingPanel] missing OneID activation code:", diagnostic);
			toast({
				message: t("libraryOnboarding.authFailed"),
				type: "error"
			});
			oneidStatus.refresh().catch((error) => {
				console.error("[KnowledgeBaseOnboardingPanel] refresh OneID app status failed:", {
					...diagnostic,
					refreshError: error
				});
			});
		}, [
			oneidStatus,
			service.appType,
			service.key,
			t
		]);
		const handleAdminActivateClick = (0, import_react$1.useCallback)(() => {
			if (actionType !== "purchase") {
				if (service.key === "tencentLexiang") reportActivateButtonClickAdmin(adapter);
				else if (service.key === "tencentDocs") reportTDocActivateButtonClickAdmin(adapter);
			}
			if (actionType === "purchase") {
				const targetPurchaseUrl = purchaseUrl ?? "https://docs.qq.com/form/page/DUFJqZm9CeHVJS2ZZ?clickStart=1782208776275&nlc=1#/fill";
				if (adapter.openExternal) adapter.openExternal(targetPurchaseUrl).catch((error) => {
					console.error("[KnowledgeBaseOnboardingPanel] open purchase url failed:", error);
					window.open(targetPurchaseUrl, "_blank", "noopener,noreferrer");
				});
				else window.open(targetPurchaseUrl, "_blank", "noopener,noreferrer");
				return;
			}
			handleAuthorizeClick();
		}, [
			adapter,
			handleAuthorizeClick,
			actionType,
			service.key,
			purchaseUrl
		]);
		/**
		* B-4：乐享开通页点击「提醒管理员开通」（非管理员）。
		*
		* 包一层是为了在调用 `onContactAdmin`（弹 toast）前先上报埋点；
		* 仅 lexiang 上报，腾讯文档复用同一组件但不需要本埋点。
		*/
		const handleContactAdminClick = (0, import_react$1.useCallback)(() => {
			if (service.key === "tencentLexiang") reportActivateButtonClickMember(adapter);
			else if (service.key === "tencentDocs") reportTDocActivateButtonClickMember(adapter);
			onContactAdmin();
		}, [
			adapter,
			onContactAdmin,
			service.key
		]);
		const handleLearnMoreClick = (0, import_react$1.useCallback)((event) => {
			event.preventDefault();
			const url = LEARN_MORE_URLS[service.key];
			if (!url) return;
			if (adapter.openExternal) adapter.openExternal(url).catch((error) => {
				console.error("[KnowledgeBaseOnboardingPanel] open learn-more url failed:", error);
				window.open(url, "_blank", "noopener,noreferrer");
			});
			else window.open(url, "_blank", "noopener,noreferrer");
		}, [adapter, service.key]);
		/**
		* 开通成功后的收尾：
		*   1. 触发对应 store 的"已授权"流程（startAuthorization / setAuthStatus）
		*   2. 关闭开通页 + 直接打开对应资料库面板（腾讯文档 / 乐享）
		*
		* 注意：成功 toast 不在这里弹——OneID 官方组件 onSuccess 之前会自渲染一个
		* "开通成功"提示，与 finalizeAuthorization 是同一语义，重复弹 toast 会让
		* 用户看到两个提示（"开通成功" + "腾讯文档授权成功"）。失败 toast 仍保留。
		*/
		const runFinalize = (0, import_react$1.useCallback)(async () => {
			setApproving(true);
			try {
				await finalizeAuthorization(service);
				if (service.key === "tencentDocs") await refreshOneidApplications(services?.tencentDocs, enterpriseId, accountUid);
				if (service.key === "tencentDocs") {
					setTencentDocsPanelConnectorId?.("tencent-docs-oa");
					navigate("/library/tencent-docs");
				} else if (service.key === "tencentLexiang") navigate("/library/lexiang");
			} catch (err) {
				console.error("[KnowledgeBaseOnboardingPanel] finalizeAuthorization failed:", err);
				toast({
					message: t("libraryOnboarding.authFailed"),
					type: "error"
				});
			} finally {
				setApproving(false);
			}
		}, [
			service,
			t,
			navigate,
			setTencentDocsPanelConnectorId,
			services,
			enterpriseId,
			accountUid
		]);
		const handleOneidSuccess = (0, import_react$1.useCallback)(() => {
			if (finalizeGuardRef.current) return;
			finalizeGuardRef.current = true;
			closeOneid();
			if (oneidStatus.isAdmin) {
				if (service.key === "tencentLexiang") {
					reportOneidLoginAuthClickAdmin(adapter);
					if (!hasReportedLexiangActivateFirst(enterpriseId, accountUid)) {
						reportActivateSuccessAdminFirst(adapter);
						markLexiangActivateFirstReported(enterpriseId, accountUid);
					}
				} else if (service.key === "tencentDocs") {
					reportTDocOneidLoginAuthClickAdmin(adapter);
					if (!hasReportedTDocActivateFirst(enterpriseId, accountUid)) {
						reportTDocActivateSuccessAdminFirst(adapter);
						markTDocActivateFirstReported(enterpriseId, accountUid);
					}
				}
			}
			if (service.key === "tencentLexiang" && oneidStatus.isAdmin && isEnterpriseEdition && !!enterpriseId && !!accountUid && !!tencentLexiangFacade && !hasPassedPostActivation(enterpriseId, accountUid) && tencentLexiangFacade) {
				const tencentDocsFacade = services?.tencentDocs ?? null;
				lexiangAuthStore.getState().enterPostActivationGate({
					enterpriseId,
					uid: accountUid,
					checkOneidEnabled: async () => {
						if (!tencentDocsFacade) return false;
						try {
							return findOneidApp(await fetchOneidApplications(tencentDocsFacade, enterpriseId, accountUid), "lexiang")?.enabled === true;
						} catch {
							return false;
						}
					},
					checkCompanyStatus: () => tencentLexiangFacade.checkCompanyStatus()
				});
				navigate("/library/lexiang");
				return;
			}
			runFinalize().catch(() => void 0);
		}, [
			accountUid,
			adapter,
			closeOneid,
			enterpriseId,
			isEnterpriseEdition,
			oneidStatus.isAdmin,
			runFinalize,
			service.appType,
			service.key,
			services,
			navigate,
			tencentLexiangFacade
		]);
		const handleOneidFail = (0, import_react$1.useCallback)((event) => {
			const { phase, errCode, errMessage, id } = event.detail ?? {};
			console.error("[KnowledgeBaseOnboardingPanel] OneID activation failed", {
				appType: service.appType,
				phase,
				errCode,
				errMessage,
				traceId: id
			});
		}, [service.appType]);
		const buttonLabel = isChecking ? t("libraryOnboarding.checking") : isEnabled ? t("libraryOnboarding.activated") : isAdmin ? t(actionKey) : t("libraryOnboarding.contactAdmin");
		const actionButton = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: `kb-onboarding-card__btn ${isEnabled ? "kb-onboarding-card__btn--done" : "kb-onboarding-card__btn--primary"}`,
			onClick: isEnabled || isChecking ? void 0 : isAdmin ? handleAdminActivateClick : handleContactAdminClick,
			disabled: isEnabled || approving || isChecking,
			"aria-label": `${t(service.titleKey)} ${buttonLabel}`,
			children: buttonLabel
		});
		const hasReportedOneidShowRef = (0, import_react$1.useRef)(false);
		(0, import_react$1.useEffect)(() => {
			if (!oneidActive || !oneidStatus.activationCode || !oneidStatus.isAdmin || hasReportedOneidShowRef.current) return;
			if (service.key === "tencentLexiang") {
				hasReportedOneidShowRef.current = true;
				reportOneidLoginModalShowAdmin(adapter);
			} else if (service.key === "tencentDocs") {
				hasReportedOneidShowRef.current = true;
				reportTDocOneidLoginModalShowAdmin(adapter);
			}
		}, [
			adapter,
			oneidActive,
			oneidStatus.activationCode,
			oneidStatus.isAdmin,
			service.key
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
				className: cardClassName,
				"aria-label": t(service.titleKey),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "kb-onboarding-card__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "kb-onboarding-card__icon",
							children: service.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "kb-onboarding-card__heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "kb-onboarding-card__title-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", {
									className: "kb-onboarding-card__title",
									children: t(service.titleKey)
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
									className: badgeClassName,
									children: t(badgeKey)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "kb-onboarding-card__desc-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
									className: "kb-onboarding-card__desc",
									children: t(service.descKey)
								}), showLearnMore && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("a", {
									className: "kb-onboarding-card__learn-link",
									href: LEARN_MORE_URLS[service.key],
									onClick: handleLearnMoreClick,
									rel: "noopener noreferrer",
									children: [t("libraryOnboarding.learnMore"), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
										"aria-hidden": "true",
										children: [" ", ">"]
									})]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "kb-onboarding-card__section-title",
						children: t("libraryOnboarding.aiCapabilityTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", {
						className: "kb-onboarding-card__capabilities",
						children: service.capabilityKeys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("li", {
							className: "kb-onboarding-card__capability",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "kb-onboarding-card__check",
								"aria-hidden": "true",
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t(key) })]
						}, key))
					}),
					!buttonOutside && actionButton
				]
			}),
			buttonOutside && actionButton,
			oneidActive && activeOneidCode && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "kb-onboarding-card__oneid-host",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(LazyOneidAppActivation, {
					code: activeOneidCode,
					env: ONEID_ENV,
					language: "zh-CN",
					theme: "light",
					onSuccess: handleOneidSuccess,
					onFail: handleOneidFail,
					onClose: closeOneid
				})
			})
		] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-onboarding-panel/single-service-panel.tsx
/**
* 腾讯文档单卡面板按 effectiveEdition 解析 badge / action 配置。
*
* - ultimate：badge=免费、按钮=立即开通、走 OneID 开通流程（与历史行为一致）。
* - exclusive / null（VPC）：badge=付费、按钮=购买并开通、点击跳腾讯云购买页
*   （ServiceCard 默认回退到 TENCENT_CLOUD_PURCHASE_URL，无需透传 purchaseUrl）。
*/
function resolveDocPresentation(effectiveEdition) {
	if (effectiveEdition === "ultimate") return {
		...DOC_TITLE,
		badgeKey: "libraryOnboarding.badge.free",
		badgeTone: "free",
		actionKey: "libraryOnboarding.activateNow",
		actionType: "activate"
	};
	return {
		...DOC_TITLE,
		badgeKey: "libraryOnboarding.badge.paid",
		badgeTone: "paid",
		actionKey: "libraryOnboarding.purchaseAndActivate",
		actionType: "purchase"
	};
}
/**
* 乐享单卡面板按 effectiveEdition 解析 badge / action 配置。
*
* - ultimate：badge=免费试用、按钮=立即试用、走 OneID 开通流程（与历史行为一致）。
* - exclusive / null（VPC）：badge=付费、按钮=购买并开通、点击跳腾讯云在线购买页
*   （透传 purchaseUrl = LEXIANG_EXCLUSIVE_PURCHASE_URL）。
*/
function resolveLexiangPresentation(effectiveEdition) {
	if (effectiveEdition === "ultimate") return {
		...LEXIANG_TITLE,
		badgeKey: "libraryOnboarding.badge.trial",
		badgeTone: "free",
		actionKey: "libraryOnboarding.tryNow",
		actionType: "activate"
	};
	return {
		...LEXIANG_TITLE,
		badgeKey: "libraryOnboarding.badge.paid",
		badgeTone: "paid",
		actionKey: "libraryOnboarding.purchaseAndActivate",
		actionType: "purchase"
	};
}
/**
* 按 target + effectiveEdition 解析单卡面板的完整展示配置。
*
* 腾讯文档 / 乐享均按 effectiveEdition 切换 badge / action：
*   - ultimate：走 OneID 开通流程
*   - exclusive / null（VPC）：走购买流程（腾讯文档跳腾讯云购买页、乐享跳腾讯云在线购买页）
*/
function resolveSingleServicePresentation(target, effectiveEdition) {
	return target === "lexiang" ? resolveLexiangPresentation(effectiveEdition) : resolveDocPresentation(effectiveEdition);
}
var import_react, import_jsx_runtime, LEXIANG_EXCLUSIVE_PURCHASE_URL, DOC_TITLE, LEXIANG_TITLE, ShieldCheckIcon, SingleServiceOnboardingPanel;
var init_single_service_panel = __esmMin((() => {
	init_style();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_header_workbuddy();
	init_contexts();
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_useI18n();
	init_telemetry();
	init_telemetry$1();
	init_onboarding_skeleton();
	init_service_card();
	import_jsx_runtime = require_jsx_runtime();
	LEXIANG_EXCLUSIVE_PURCHASE_URL = "https://buy.cloud.tencent.com/lexiangknowledgevpcwb";
	DOC_TITLE = {
		serviceKey: "tencentDocs",
		titleAdminKey: "libraryOnboarding.single.tencentDocs.title.admin",
		titleMemberKey: "libraryOnboarding.single.tencentDocs.title.member"
	};
	LEXIANG_TITLE = {
		serviceKey: "tencentLexiang",
		titleAdminKey: "libraryOnboarding.single.tencentLexiang.title.admin",
		titleMemberKey: "libraryOnboarding.single.tencentLexiang.title.member"
	};
	ShieldCheckIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.8,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 12 2 2 4-4" })]
	});
	SingleServiceOnboardingPanel = ({ target }) => {
		const t = useTranslation();
		const presentation = resolveSingleServicePresentation(target, useEffectiveEdition());
		const service = findServiceConfig(presentation.serviceKey);
		const oneidStatus = useOneidAppStatus(target);
		const isCheckingAdmin = oneidStatus.status === "checking";
		const isAdmin = oneidStatus.status === "enabled" || oneidStatus.isAdmin;
		const adapter = useAdapter();
		const hasReportedActivateShowRef = (0, import_react.useRef)(false);
		(0, import_react.useEffect)(() => {
			if (isCheckingAdmin || hasReportedActivateShowRef.current) return;
			if (target === "lexiang") {
				hasReportedActivateShowRef.current = true;
				if (isAdmin) reportActivatePageShowAdmin(adapter);
				else reportActivatePageShowMember(adapter);
			} else if (target === "doc") {
				hasReportedActivateShowRef.current = true;
				if (isAdmin) reportTDocActivatePageShowAdmin(adapter);
				else reportTDocActivatePageShowMember(adapter);
			}
		}, [
			target,
			isCheckingAdmin,
			isAdmin,
			adapter
		]);
		const handleContactAdmin = (0, import_react.useCallback)(() => {
			toast({
				message: t("libraryOnboarding.contactAdminToast"),
				type: "info"
			});
		}, [t]);
		if (!service) {
			console.error("[SingleServiceOnboardingPanel] service config not found for target:", target);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "kb-onboarding-panel",
				"aria-hidden": "true"
			});
		}
		if (isCheckingAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeBaseOnboardingSkeleton, {
			cardCount: 1,
			withBrands: true
		});
		const titleKey = isAdmin ? presentation.titleAdminKey : presentation.titleMemberKey;
		const purchaseUrl = target === "lexiang" && presentation.actionType === "purchase" ? LEXIANG_EXCLUSIVE_PURCHASE_URL : void 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "kb-onboarding-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "kb-onboarding-panel__content kb-onboarding-panel__content--single",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kb-onboarding-panel__brands",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "kb-onboarding-panel__brand-icon kb-onboarding-panel__brand-icon--wb",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: header_workbuddy_default,
									alt: "WorkBuddy",
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kb-onboarding-panel__brand-connect",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "kb-onboarding-panel__brand-arrow",
										children: "›"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "kb-onboarding-panel__brand-arrow",
										children: "›"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "kb-onboarding-panel__brand-arrow",
										children: "›"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `kb-onboarding-panel__brand-icon kb-onboarding-panel__brand-icon--${target}`,
								children: service.icon
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "kb-onboarding-panel__header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "kb-onboarding-panel__title",
							children: t(titleKey)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						service,
						badgeKey: presentation.badgeKey,
						badgeTone: presentation.badgeTone,
						actionKey: presentation.actionKey,
						actionType: presentation.actionType,
						onContactAdmin: handleContactAdmin,
						showLearnMore: true,
						buttonOutside: true,
						purchaseUrl
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "kb-onboarding-panel__footnote",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kb-onboarding-panel__footnote-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheckIcon, {})
						}), t("libraryOnboarding.single.footnote")]
					})
				]
			})
		});
	};
}));
//#endregion
export { init_single_service_panel as n, SingleServiceOnboardingPanel as t };
