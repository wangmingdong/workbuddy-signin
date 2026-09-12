import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { f as getWebsiteUrl, g as isInternationalVersion, p as init_environment } from "./environment-DKqg3f0G.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { b as tryUseNormalizedMemberQuotaData, m as MemberQuotaExceededError, v as tryParseMemberQuotaError } from "./project-chat-service-BzKCqmVb.js";
import { t as init_browser } from "./browser-CBnZQLfk.js";
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/quota-toast.less
var init_quota_toast$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/quota-toast.tsx
function emitQuotaToastSingleton(key, instanceId) {
	window.dispatchEvent(new CustomEvent(QUOTA_TOAST_SINGLETON_EVENT, { detail: {
		key,
		instanceId
	} }));
}
var import_react$1, import_jsx_runtime$1, QUOTA_TOAST_SINGLETON_EVENT, WarningIcon, CloseIcon, QuotaToast;
var init_quota_toast$1 = __esmMin((() => {
	init_quota_toast$2();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$1 = require_jsx_runtime();
	QUOTA_TOAST_SINGLETON_EVENT = "workbuddy:quota-toast-singleton";
	WarningIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		className: "quota-toast__icon",
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
				x1: "12",
				y1: "9",
				x2: "12",
				y2: "13"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
				x1: "12",
				y1: "17",
				x2: "12.01",
				y2: "17"
			})
		]
	});
	CloseIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	});
	QuotaToast = ({ title, message, action, onClose, className, style, singletonKey }) => {
		const instanceId = (0, import_react$1.useRef)(Date.now() + Math.random()).current;
		const onCloseRef = (0, import_react$1.useRef)(onClose);
		const [visible, setVisible] = import_react$1.useState(true);
		(0, import_react$1.useEffect)(() => {
			onCloseRef.current = onClose;
		}, [onClose]);
		(0, import_react$1.useEffect)(() => {
			if (!singletonKey) return;
			const handleSingleton = (event) => {
				const detail = event.detail;
				if (detail?.key === singletonKey && detail.instanceId !== instanceId) {
					setVisible(false);
					onCloseRef.current();
				}
			};
			window.addEventListener(QUOTA_TOAST_SINGLETON_EVENT, handleSingleton);
			emitQuotaToastSingleton(singletonKey, instanceId);
			return () => window.removeEventListener(QUOTA_TOAST_SINGLETON_EVENT, handleSingleton);
		}, [instanceId, singletonKey]);
		const handleClose = () => {
			setVisible(false);
			onClose();
		};
		const renderAction = () => {
			if (!action) return null;
			const buttonClass = `quota-toast__action-btn quota-toast__action-btn--${action.variant}`;
			if (action.href) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
				className: buttonClass,
				href: action.href,
				target: "_blank",
				rel: "noopener noreferrer",
				onClick: action.onClick,
				children: action.label
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				className: buttonClass,
				onClick: action.onClick,
				children: action.label
			});
		};
		if (!visible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: `quota-toast${className ? ` ${className}` : ""}`,
			style,
			role: "alert",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "quota-toast__head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WarningIcon, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "quota-toast__title",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							type: "button",
							className: "quota-toast__close",
							onClick: handleClose,
							"aria-label": "close",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(CloseIcon, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
					className: "quota-toast__body",
					children: message
				}),
				action && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "quota-toast__actions",
					children: renderAction()
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/quota-banner-inline.less
var init_quota_banner_inline$1 = __esmMin((() => {}));
var init_quota_banner_inline = __esmMin((() => {
	init_quota_banner_inline$1();
	require_react();
	require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/components/quota-toast/index.ts
var init_quota_toast = __esmMin((() => {
	init_quota_toast$1();
	init_quota_banner_inline();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/collab/hooks/use-quota-error.ts
/**
* 解析升级 CTA 外链 —— 按环境区分海外 / 国内，避免海外版误跳国内 url。
* 与 `components/account/PlanActionButton` 口径一致，origin 交给 getWebsiteUrl 统一处理。
*/
function resolveUpgradeUrl() {
	return isInternationalVersion() ? getWebsiteUrl(PLAN_PATH_OVERSEA) : getWebsiteUrl(PRICING_PATH_DOMESTIC);
}
/** 判定该 tier 是否走「去升级」CTA 分组（否则只显示关闭按钮）。 */
function canUpgrade(tier) {
	return TIERS_WITH_UPGRADE_CTA.has(tier);
}
function useQuotaErrorPresenter() {
	const t = useTranslation();
	const dismissAction = (onDismiss) => ({
		label: t("collab.quota.action.dismiss"),
		variant: "secondary",
		onClick: onDismiss
	});
	const upgradeAction = () => ({
		label: t("collab.quota.action.upgrade"),
		variant: "primary",
		href: resolveUpgradeUrl()
	});
	/** 取版本显示名（i18n label），6 档全量。 */
	const versionLabel = (tier) => t(`collab.quota.version.${tier}`);
	/**
	* 格式化 limit 数字 — V2.5 限免态下追加「（限免）」后缀，并按资源类型拼单位。
	*
	* 设计：
	*   - 区分 `member`（成员=人）与 `project`（项目=个），单位走中文 i18n
	*   - 仅依赖 freeTrial 标志，不判 tier；后端在 ultimate 档不会下发 freeTrial=true，
	*     因此本函数对企业档天然 no-op
	*
	* @param resource 'member' | 'project'，决定单位（人 / 个）
	* @param limit    后端下发的成员/项目上限
	* @param freeTrial data.freeTrial（V2.5 字段，可选）
	* @returns 渲染用的字符串：「5 人」/ 「5 人（限免）」/ 「10 个」/ 「5 个（限免）」
	*/
	const formatLimit = (resource, limit, freeTrial) => {
		return t(freeTrial === true ? `collab.quota.${resource}.limit.freeTrial` : `collab.quota.${resource}.limit.normal`, { limit: String(limit) });
	};
	/** 非 owner 成员触顶文案（沿用 v1 结构，仅同步「已超上限」口径）。 */
	const buildMemberNonOwner = (data) => {
		const title = t("collab.quota.member.title");
		const ownerName = data.ownerName && data.ownerName.length > 0 ? data.ownerName : t("collab.quota.member.fallbackOwnerLabel");
		const message = t("collab.quota.member.body.nonOwner", { ownerName });
		return {
			title,
			message,
			action: dismissAction(),
			bannerCompactMessage: t("collab.quota.member.banner.nonOwner", { ownerName }),
			bannerBlock: {
				title,
				message
			}
		};
	};
	/** owner 成员触顶文案（按 tier 派生 CTA 分组）。 */
	const buildMemberOwner = (data) => {
		const title = t("collab.quota.member.title");
		const tier = data.version;
		const isUpgradable = canUpgrade(tier);
		const interp = {
			version: versionLabel(tier),
			limit: formatLimit("member", data.memberLimit, data.freeTrial)
		};
		const message = t(isUpgradable ? "collab.quota.member.upgradable.owner" : "collab.quota.member.terminal.owner", interp);
		return {
			title,
			message,
			action: isUpgradable ? upgradeAction() : dismissAction(),
			bannerCompactMessage: message,
			bannerBlock: {
				title,
				message
			}
		};
	};
	/** 成员数触顶（场景 1）入口分发。 */
	const presentMemberQuota = (data) => data.isOwner ? buildMemberOwner(data) : buildMemberNonOwner(data);
	/** 项目数触顶（场景 3）· 仅按 tier 派生 CTA 分组（项目数没有非 owner 视角）。 */
	const presentProjectQuota = (data) => {
		const title = t("collab.quota.project.title");
		const tier = data.version;
		const isUpgradable = canUpgrade(tier);
		const interp = {
			version: versionLabel(tier),
			limit: formatLimit("project", data.projectLimit, data.freeTrial)
		};
		const message = t(isUpgradable ? "collab.quota.project.upgradable" : "collab.quota.project.terminal", interp);
		return {
			title,
			message,
			action: isUpgradable ? upgradeAction() : void 0,
			bannerCompactMessage: message,
			bannerBlock: {
				title,
				message
			}
		};
	};
	return {
		presentMemberQuota,
		presentProjectQuota
	};
}
/**
* 从任意异常中提取成员 quota 数据。
* Web 直连通常保留 MemberQuotaExceededError 原型；Desktop RPC 跨 contextBridge 后会变成带 code/data 的普通 Error，
* 这里统一兼容，避免审批触顶时退化成普通错误 toast。
*
* 顺序很重要（issue #55563 回归修复）：
*   1. instanceof 命中（Web 同 realm）→ 直接用归一化后的 error.data
*   2. Desktop RPC 退化成 RpcError 时，error.data 已是 daemon 侧归一化过的
*      MemberQuotaErrorData（含 version/memberLimit），必须 tryUseNormalizedMemberQuotaData
*      原样复用；**不能**再交给 tryParseMemberQuotaError 当原始 envelope 二次解析，
*      否则缺 ownerPlan/personalTier → planToTier 兜底 experience，标准版被误显示成体验版
*   3. 都不命中才按原始 envelope 解析（灰度 / 未归一化路径兜底）
*/
function resolveMemberQuotaErrorData(error, currentUid) {
	if (error instanceof MemberQuotaExceededError) return error.data;
	const normalized = tryUseNormalizedMemberQuotaData(error);
	if (normalized) return normalized;
	return tryParseMemberQuotaError(error, currentUid);
}
var PLAN_PATH_OVERSEA, PRICING_PATH_DOMESTIC, TIERS_WITH_UPGRADE_CTA;
var init_use_quota_error = __esmMin((() => {
	init_browser();
	init_useI18n();
	init_environment();
	PLAN_PATH_OVERSEA = "/profile/plan";
	PRICING_PATH_DOMESTIC = "/pricing/";
	TIERS_WITH_UPGRADE_CTA = new Set([
		"experience",
		"youth",
		"standard",
		"advanced"
	]);
}));
//#endregion
export { QuotaToast as a, init_quota_toast as i, resolveMemberQuotaErrorData as n, useQuotaErrorPresenter as r, init_use_quota_error as t };
