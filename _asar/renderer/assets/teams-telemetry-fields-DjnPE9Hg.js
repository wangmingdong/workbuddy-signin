import { n as __esmMin } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/modules/collab/utils/teams-telemetry-fields.ts
function joinIds(items, getter) {
	return items?.map(getter).filter(Boolean).join(", ") || "";
}
function pickStringField(record, keys) {
	if (!record) return;
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "string" && value.trim()) return value.trim();
	}
}
/** 构造 project_create_submit 的业务字段，模板来源以弹窗最终选择为准。 */
function buildProjectCreateSubmitPayload(input) {
	const templateId = input.templateId?.trim();
	return {
		type: templateId ? "template" : "custom",
		source: templateId ? "template" : "new_project",
		action: templateId || "",
		promptLength: input.instruction?.length ?? 0,
		ext1: joinIds(input.connectors, (connector) => connector.connectorName),
		skills: joinIds(input.skills, (skill) => skill.skillId),
		expertId: joinIds(input.experts, (expert) => expert.expertId)
	};
}
/** 将项目进入来源归一到数据字典枚举。 */
function normalizeProjectDetailSource(source) {
	if (source === "new_project") return "new_project";
	if (source === "invitation_url" || source === "url_link" || source === "invite_link") return "invitation_url";
	return "existing_project";
}
/** 将项目角色归一到 project_detail_view.mode。 */
function resolveProjectDetailMode(input) {
	if (input.roleId) {
		if (OWNER_ROLE_IDS.has(input.roleId)) return "owner_view";
		if (MEMBER_ROLE_IDS.has(input.roleId)) return "member_view";
	}
	if (input.permissions?.some((permission) => OWNER_PERMISSION_HINTS.has(permission))) return "owner_view";
	return input.role === "admin" || input.role === "editor" ? "owner_view" : "member_view";
}
function readBooleanFlag(value) {
	if (!value || typeof value !== "object") return;
	const record = value;
	for (const key of ONBOARDING_KEYS) if (typeof record[key] === "boolean") return record[key];
}
/**
* 推导新手引导项目标记。
*
* 后端字段可能随灰度出现在根对象或 extraInfo/metadata/meta/onboarding 中，前端按优先级读取；没有信号时降级为 false。
*/
function resolveProjectIsNewFile(project) {
	const direct = readBooleanFlag(project);
	if (typeof direct === "boolean") return direct;
	if (!project || typeof project !== "object") return false;
	const record = project;
	const nestedCandidates = [
		record.extraInfo,
		record.metadata,
		record.meta,
		record.onboarding
	];
	for (const candidate of nestedCandidates) {
		const resolved = readBooleanFlag(candidate);
		if (typeof resolved === "boolean") return resolved;
	}
	return false;
}
/** 构造 project_detail_view 的业务字段。 */
function buildProjectDetailViewPayload(input) {
	return {
		ext6: resolveProjectDetailMode(input),
		isNewFile: resolveProjectIsNewFile(input.project),
		source: normalizeProjectDetailSource(input.entrySource)
	};
}
/** 复制邀请链接时写入复制时间，用于打开/申请耗时计算；不影响埋点上报通道。 */
function appendInviteCopiedAt(url, copiedAt = Date.now()) {
	try {
		const parsed = new URL(url);
		parsed.searchParams.set(INVITE_COPIED_AT_QUERY_KEY, String(copiedAt));
		return parsed.toString();
	} catch {
		return url;
	}
}
function readInviteCopiedAt(url) {
	const href = url ?? (typeof window !== "undefined" ? window.location.href : "");
	if (!href) return;
	try {
		const value = new URL(href).searchParams.get(INVITE_COPIED_AT_QUERY_KEY);
		if (!value) return;
		const copiedAt = Number(value);
		return Number.isFinite(copiedAt) && copiedAt > 0 ? copiedAt : void 0;
	} catch {
		return;
	}
}
/** 将申请页场景归一为埋点邀请类型。 */
function normalizeProjectInviteType(type) {
	if (type === "todo") return "todo";
	if (type === "task" || TASK_APPLY_TYPES.has(type)) return "task";
	return "project";
}
/** 当前用户是否已在项目内：只有 taskMember 场景是项目内成员申请任务协作。 */
function resolveProjectInviteIsBuiltIn(type) {
	return type === "taskMember";
}
/** 将 UI/后端角色归一到数据字典的 admin/member。 */
function normalizeProjectInviteApplyRole(role) {
	if (role === "editor" || role === "admin" || role === "project.admin") return "admin";
	return "member";
}
/** 计算复制链接到当前行为的耗时；缺少复制时间信号时只能降级为 0。 */
function resolveProjectInviteCost(input) {
	const copiedAt = readInviteCopiedAt(input.currentURL);
	if (copiedAt == null) return 0;
	const now = input.now ?? Date.now();
	return Math.max(0, now - copiedAt);
}
/** 构造 project_invite_link_view 的业务字段。 */
function buildProjectInviteViewPayload(input) {
	return {
		ext1: normalizeProjectInviteType(input.type),
		isBuiltIn: resolveProjectInviteIsBuiltIn(input.type),
		cost: resolveProjectInviteCost(input)
	};
}
/** 构造 project_invite_link_apply 的业务字段。 */
function buildProjectInviteApplyPayload(input) {
	return {
		...buildProjectInviteViewPayload(input),
		ext2: normalizeProjectInviteApplyRole(input.selectedRole)
	};
}
function parseTimestamp(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (value instanceof Date) {
		const time = value.getTime();
		return Number.isFinite(time) ? time : void 0;
	}
	if (typeof value === "string" && value.trim()) {
		const numeric = Number(value);
		if (Number.isFinite(numeric)) return numeric;
		const parsed = Date.parse(value);
		return Number.isFinite(parsed) ? parsed : void 0;
	}
}
function resolveApprovalCreatedAt(input) {
	return parseTimestamp(input.requestedAt) ?? parseTimestamp(pickStringField(input.ext, APPROVAL_CREATED_AT_KEYS));
}
function resolveApprovalType(input) {
	return normalizeProjectInviteType(pickStringField(input.ext, APPROVAL_TYPE_KEYS) ?? input.kind ?? "project");
}
function resolveApprovalRole(input) {
	return normalizeProjectInviteApplyRole(input.role ?? pickStringField(input.ext, APPROVAL_ROLE_KEYS));
}
function resolveApprovalCost(input) {
	const createdAt = resolveApprovalCreatedAt(input);
	if (createdAt == null) return;
	return Math.max(0, (input.now ?? Date.now()) - createdAt);
}
/**
* 构造 project_application_approval_click 的业务字段。
*
* 字段语义（收口，避免各审批入口手写字面量散落）：
* - `ext1` = 被审批资源类型（project/task/todo），从 ext.request_type 等派生 —— 看板「资源类型」维度取此字段
* - `source` = 审批入口渠道（activity/message_center），由调用点传入 —— 表达「从哪个页面审批」
* 二者语义不同：从消息中心审批 project 申请时，`source=message_center` 且 `ext1=project`。
*/
function buildProjectApplicationApprovalPayload(input) {
	const cost = resolveApprovalCost(input);
	return {
		ext1: resolveApprovalType(input),
		ext2: input.result,
		ext3: resolveApprovalRole(input),
		source: input.source,
		...cost == null ? {} : { cost }
	};
}
var INVITE_COPIED_AT_QUERY_KEY, OWNER_ROLE_IDS, MEMBER_ROLE_IDS, OWNER_PERMISSION_HINTS, ONBOARDING_KEYS, TASK_APPLY_TYPES, APPROVAL_TYPE_KEYS, APPROVAL_ROLE_KEYS, APPROVAL_CREATED_AT_KEYS;
var init_teams_telemetry_fields = __esmMin((() => {
	INVITE_COPIED_AT_QUERY_KEY = "wb_invite_copied_at";
	OWNER_ROLE_IDS = new Set(["project.owner", "project.admin"]);
	MEMBER_ROLE_IDS = new Set(["project.member"]);
	OWNER_PERMISSION_HINTS = new Set([
		"project.update",
		"project.rename",
		"project.archive",
		"project.delete"
	]);
	ONBOARDING_KEYS = [
		"isNewFile",
		"isNew",
		"isDemo",
		"isOnboarding",
		"isOnboardingProject"
	];
	TASK_APPLY_TYPES = new Set(["taskMember", "taskOutsider"]);
	APPROVAL_TYPE_KEYS = [
		"request_type",
		"invite_type",
		"approval_type",
		"type",
		"resource_type"
	];
	APPROVAL_ROLE_KEYS = [
		"requested_role",
		"apply_role",
		"role",
		"role_id"
	];
	APPROVAL_CREATED_AT_KEYS = [
		"request_created_at",
		"created_at",
		"createdAt",
		"apply_created_at"
	];
}));
//#endregion
export { buildProjectInviteApplyPayload as a, resolveProjectIsNewFile as c, buildProjectDetailViewPayload as i, buildProjectApplicationApprovalPayload as n, buildProjectInviteViewPayload as o, buildProjectCreateSubmitPayload as r, init_teams_telemetry_fields as s, appendInviteCopiedAt as t };
