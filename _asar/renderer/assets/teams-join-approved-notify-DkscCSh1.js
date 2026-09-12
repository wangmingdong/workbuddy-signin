import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { n as getExtText, r as init_project_task_source_chip, t as ProjectTaskSourceChip } from "./project-task-source-chip-BmBkkeq5.js";
//#region ../../packages/agent-ui/src/modules/collab/message-cards/teams-join-approved-notify.tsx
function isLegacyApprovedSummary(text) {
	return text.includes("项目加入申请已通过") || text.includes("任务协作申请已通过");
}
/** 消息 ext 是否携带项目/任务标识（新版消息带 project_id，旧消息没有） */
function hasProjectExt(message) {
	return !!getExtText(message.ext || {}, [
		"project_id",
		"projectId",
		"project_name",
		"projectName"
	]);
}
function getApprovedViewPath(message) {
	const ext = message.ext || {};
	const projectId = getExtText(ext, ["project_id", "projectId"]);
	const taskId = getExtText(ext, [
		"conversation_id",
		"conversationId",
		"collabTaskId",
		"task_id",
		"taskId"
	]);
	if (projectId && taskId) return `/projects?projectId=${encodeURIComponent(projectId)}&collabTaskId=${encodeURIComponent(taskId)}`;
	if (projectId) return `/projects?projectId=${encodeURIComponent(projectId)}`;
	return "/projects";
}
var import_jsx_runtime, TeamsJoinApprovedBody, TeamsJoinApprovedNotify;
//#endregion
__esmMin((() => {
	require_react();
	init_useI18n();
	init_project_task_source_chip();
	import_jsx_runtime = require_jsx_runtime();
	TeamsJoinApprovedBody = ({ message }) => {
		const t = useTranslation();
		const isTask = message.biz_type === "teams.task_join_request.approved";
		const rawFallbackSummary = message.summary || message.content;
		const fallbackSummary = rawFallbackSummary && !isLegacyApprovedSummary(rawFallbackSummary) ? rawFallbackSummary : "";
		const showChip = hasProjectExt(message);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "notification-line",
			children: isTask ? t("collab.joinApproved.taskTitle") : t("collab.joinApproved.projectTitle")
		}), showChip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTaskSourceChip, {
			message,
			isTask,
			fallbackProjectName: fallbackSummary,
			fallbackTaskName: fallbackSummary
		})] });
	};
	TeamsJoinApprovedNotify = ({ message, onMarkRead, onClose, onNavigate }) => {
		const t = useTranslation();
		if (!hasProjectExt(message)) return null;
		const viewPath = getApprovedViewPath(message);
		const handleView = (event) => {
			event.stopPropagation();
			onMarkRead();
			if (onNavigate) {
				onNavigate(viewPath);
				return;
			}
			onClose?.();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "notification-actions",
			onClick: (event) => event.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "notification-action primary",
				onClick: handleView,
				children: t("collab.joinApproved.view")
			})
		});
	};
}))();
export { TeamsJoinApprovedBody, TeamsJoinApprovedNotify as default };
