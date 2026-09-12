import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as init_foundation } from "./foundation-QOglV606.js";
import { Or as AgentMailBrandIcon } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { t as init_common } from "./common-Czfscgga.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
//#region ../../packages/agent-ui/src/modules/agent-mail/message-cards/agentmail-card.tsx
/** 判断当前是否已经在"我的邮箱"页面，避免重复触发同路由跳转。 */
function isAgentMailRoute(path) {
	return path === AGENT_MAIL_INBOX_ROUTE || path.startsWith(`${AGENT_MAIL_INBOX_ROUTE}/`);
}
/** 从消息中心 ext 里读取 Agent Mail 侧真实邮件 ID，兼容不同后端字段名。 */
function getMailMessageId(message) {
	const ext = message.ext ?? {};
	const value = ext.message_id ?? ext.messageId ?? ext.mail_message_id;
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
/**
* 构造"我的邮箱"路由导航选项。
* - 非收件类通知：直接返回路由路径，无附加 state。
* - 收件类通知：通过 navigation state（而非 URL query）传递目标邮件 ID 和单调递增的 nonce，
*   确保每次点击都能触发 inbox-view 的 useEffect，即使路径或 messageId 与上次完全相同
*   （例如用户关闭弹窗后再次点击同一封邮件的通知）。
*/
function buildMailboxNavArgs(message) {
	if (message.biz_type !== "agentmail.received") return { path: AGENT_MAIL_INBOX_ROUTE };
	return {
		path: AGENT_MAIL_INBOX_ROUTE,
		state: {
			openMessageId: getMailMessageId(message),
			nonce: Date.now()
		}
	};
}
var import_react, import_jsx_runtime, EXPAND_ICON_PATH, COLLAPSE_ICON_PATH, AGENT_MAIL_INBOX_ROUTE, AgentMailCard;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_useI18n();
	init_common();
	import_jsx_runtime = require_jsx_runtime();
	EXPAND_ICON_PATH = "M2 3.5L5 6.5L8 3.5";
	COLLAPSE_ICON_PATH = "M2 6.5L5 3.5L8 6.5";
	AGENT_MAIL_INBOX_ROUTE = "/library/agent-mail";
	AgentMailCard = ({ message, onMarkRead }) => {
		const t = useTranslation();
		const host = useModuleHost();
		const [expanded, setExpanded] = import_react.useState(false);
		const contentText = message.content || message.summary;
		const handleToggle = (0, import_react.useCallback)(() => {
			setExpanded((prev) => !prev);
			if (!message.is_read) onMarkRead();
		}, [message.is_read, onMarkRead]);
		const handleGotoMailbox = (0, import_react.useCallback)(() => {
			if (!message.is_read) onMarkRead();
			if (isAgentMailRoute(host.navigation.currentPath)) {
				if (message.biz_type !== "agentmail.received") return;
			}
			const { path, state } = buildMailboxNavArgs(message);
			host.navigation.navigate(path, state ? { state } : void 0);
		}, [
			host.navigation,
			message,
			onMarkRead
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: `notification-card notification-card-mail${expanded ? " is-expanded" : ""}`,
			onClick: handleToggle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "notification-card-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMailBrandIcon, { size: 24 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notification-card-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "notification-line",
						dangerouslySetInnerHTML: { __html: message.title }
					}),
					!expanded && message.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "notification-desc-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "notification-desc",
							children: message.summary
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "notification-expand-icon",
							width: "12",
							height: "12",
							viewBox: "0 0 10 10",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: EXPAND_ICON_PATH,
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					}),
					expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "notification-expanded-content",
						children: [contentText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "notification-content-text",
							children: contentText
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "notification-expanded-actions",
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "notification-expand-btn is-primary",
								onClick: handleGotoMailbox,
								children: t("msgCenter.agentMail.gotoMailbox")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "notification-collapse-icon",
								width: "12",
								height: "12",
								viewBox: "0 0 10 10",
								fill: "none",
								onClick: (e) => {
									e.stopPropagation();
									setExpanded(false);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: COLLAPSE_ICON_PATH,
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})]
						})]
					})
				]
			})]
		});
	};
}))();
export { AgentMailCard as default };
