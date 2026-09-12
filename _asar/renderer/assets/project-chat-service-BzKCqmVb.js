import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { A as FilesystemEventType, U as CloudAgentConnection, W as init_common, Y as ADDITIONAL_DATA_ROLE, k as FileType, n as init_common$1, tt as wrapHiddenContextXml } from "./common-CwB_VqKR.js";
var init_http = __esmMin((() => {
	Object.freeze({ "x-teams-collab-handoff-canary": "true" });
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-activity.ts
var init_cloud_activity = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-expert.ts
var init_cloud_expert = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/quota-errors.ts
/**
* 把后端 plan + V3.0 真 6 档字段 → 前端统一 tier。
*
* 派生优先级（V3.0 issue #55563）：
*   1. personalTier 是合法 6 档值 → 直接返回（启用真 6 档）
*   2. 否则走 plan v2.0 三档归一兜底：
*      - personal  → experience
*      - pro       → standard
*      - ultimate  → enterprise
*      - 老 envelope 字面量 'experience'/'youth'/.../'enterprise' → 原样返回
*      - 未识别 → experience（最严档）
*
* 设计动机：
*   - V2.0 阶段后端只下发 plan，前端通过本函数兜底到 3 档可达 tier
*   - V3.0 阶段后端额外下发 personalTier（experience/youth/standard/advanced/flagship），
*     前端优先用它直接获得真 6 档，无需 billing 改 GetPaymentType 接口
*   - 老前端读不到 personalTier 时也能正常工作（向前兼容）
*
* @param plan 后端 ownerPlan / plan 字段（personal/pro/ultimate）
* @param personalTier V3.0 BillingProbe 派生的真 6 档 tier 字符串（可选）
*/
function planToTier(plan, personalTier) {
	if (typeof personalTier === "string" && isValidTier(personalTier)) return personalTier;
	if (plan === "personal") return "experience";
	if (plan === "pro") return "standard";
	if (plan === "ultimate") return "enterprise";
	if (typeof plan === "string" && isValidTier(plan)) return plan;
	return "experience";
}
/** 判断字符串是否为合法的 6 档 ProjectVersionTier 之一（V3.0 校验 helper） */
function isValidTier(v) {
	return v === "experience" || v === "youth" || v === "standard" || v === "advanced" || v === "flagship" || v === "enterprise";
}
/** 提取 envelope.code（兼容数字 / 数字字符串 / 字符串 ecode / axios 包装错误） */
function extractEnvelopeCode(raw) {
	if (!raw || typeof raw !== "object") return;
	const err = raw;
	const direct = err.code;
	if (typeof direct === "number") return direct;
	if (typeof direct === "string") return /^\d+$/.test(direct) ? Number(direct) : direct;
	const fromAxios = err.response?.data?.code;
	if (typeof fromAxios === "number") return fromAxios;
	if (typeof fromAxios === "string") return /^\d+$/.test(fromAxios) ? Number(fromAxios) : fromAxios;
}
function isMemberQuotaCode(code) {
	return code === QUOTA_ERROR_CODES.member || code === QUOTA_ERROR_CODES.memberJoinRequest || code === QUOTA_ERROR_CODES.memberJoinRequestName;
}
/** 提取 envelope.data（兼容 axios 包装错误） */
function extractEnvelopeData(raw) {
	if (!raw || typeof raw !== "object") return;
	const err = raw;
	const direct = err.data;
	if (direct && typeof direct === "object") return direct;
	const fromAxios = err.response?.data?.data;
	if (fromAxios && typeof fromAxios === "object") return fromAxios;
}
function normalizeNumber(v, fallback) {
	if (typeof v === "number" && Number.isFinite(v)) return v;
	if (typeof v === "string" && v.trim() && !Number.isNaN(Number(v))) return Number(v);
	return fallback;
}
function normalizeString(v) {
	return typeof v === "string" ? v : void 0;
}
/**
* 把后端 17234 错误 envelope 解析成 `MemberQuotaErrorData`。
*
* 后端响应示例（feat/issue-41536-teams-commercialization-limits 分支）：
*   `{ code: 17234, msg: "...", data: { ownerUid, ownerName, ownerPlan, limit, used } }`
*
* 灰度兼容：老接口 `data` 可能为空 / 字段缺失，调用方传入 `currentUid` 由本函数自动判断 isOwner；
* 缺 ownerUid 时按"非 owner"兜底；缺 ownerName 时由 UI 用占位文案降级。
*
* @param raw         原始错误（throw 出来的对象 / axios error）
* @param currentUid  当前用户 uid（host.accountInfo.userId），用来比对 ownerUid → isOwner
*/
function tryParseMemberQuotaError(raw, currentUid) {
	if (!isMemberQuotaCode(extractEnvelopeCode(raw))) return null;
	const data = extractEnvelopeData(raw) ?? {};
	const ownerUid = normalizeString(data.ownerUid);
	const ownerName = normalizeString(data.ownerName);
	const isOwner = !!(currentUid && ownerUid && currentUid === ownerUid);
	const tier = planToTier(data.ownerPlan, data.personalTier);
	const defaultLimit = PROJECT_QUOTA_LIMITS[tier].member;
	const memberLimit = normalizeNumber(data.limit ?? data.memberLimit, defaultLimit);
	return {
		version: tier,
		memberLimit,
		memberCount: normalizeNumber(data.used ?? data.memberCount, memberLimit),
		isOwner,
		ownerName: ownerName && ownerName.length > 0 ? ownerName : void 0,
		ownerUid,
		freeTrial: typeof data.freeTrial === "boolean" ? data.freeTrial : void 0
	};
}
/**
* 复用「已归一化」的成员配额数据（Desktop RPC 跨进程兼容）。
*
* 背景（issue #55563 回归）：daemon 侧 `cloud-join-request` / `cloud-invitation`
* 捕获 409 后已用 `tryParseMemberQuotaError` 把**原始 envelope**
* （`ownerPlan/personalTier/limit`）归一化成 `MemberQuotaErrorData`
* （`version/memberLimit/...`），再包成 `MemberQuotaExceededError` 抛出。
* 跨 daemon IPC / contextBridge 后该错误退化成普通 `RpcError`，`error.data`
* 即这份**已归一化**的数据。此时若再喂给 `tryParseMemberQuotaError` 当原始
* envelope 二次解析，会因缺 `ownerPlan/personalTier` 让 `planToTier` 兜底成
* `experience`、`limit` 兜底成 5 —— 标准版被误显示成「体验版（5 人）」。
*
* 本函数识别这种「已归一化」负载（有合法 6 档 `version` + 数字 `memberLimit`，
* 原始 envelope 不具备这两个字段）并原样复用，避免二次解析。
*
* @param raw RPC 透传后的错误对象（带 `code` + `data`）
* @returns 命中则返回归一化数据；非成员配额错误 / 非归一化负载返回 null
*/
function tryUseNormalizedMemberQuotaData(raw) {
	if (!raw || typeof raw !== "object") return null;
	if (!isMemberQuotaCode(extractEnvelopeCode(raw))) return null;
	const data = raw.data;
	if (!data || typeof data !== "object") return null;
	const d = data;
	if (typeof d.version !== "string" || !isValidTier(d.version)) return null;
	if (typeof d.memberLimit !== "number" || !Number.isFinite(d.memberLimit)) return null;
	return {
		version: d.version,
		memberLimit: d.memberLimit,
		memberCount: typeof d.memberCount === "number" ? d.memberCount : d.memberLimit,
		isOwner: d.isOwner === true,
		ownerName: typeof d.ownerName === "string" ? d.ownerName : void 0,
		ownerUid: typeof d.ownerUid === "string" ? d.ownerUid : void 0,
		freeTrial: typeof d.freeTrial === "boolean" ? d.freeTrial : void 0
	};
}
/**
* 把后端 17260 错误 envelope 解析成 `ProjectQuotaErrorData`。
*
* 后端响应示例：
*   `{ code: 17260, msg: "...", data: { plan, limit, used } }`
*
* 灰度兼容：
*   - 老版本 / 网络层包装 / 跨进程边界后 `data` 可能整体缺失，或字段不全；
*   - 此时回退到 `PROJECT_QUOTA_LIMITS` 的 tier 默认上限（与 UI 文案预期对齐），
*     而不是把 limit/count 兜底成 0（避免 UI 出现"上限 0 个"的奇怪文案）；
*   - count 缺失时按"已触顶"语义取 limit（用户当前调用就是被 17260 拦截，count 至少等于 limit）。
*/
function tryParseProjectQuotaError(raw) {
	if (extractEnvelopeCode(raw) !== QUOTA_ERROR_CODES.project) return null;
	const data = extractEnvelopeData(raw) ?? {};
	const tier = planToTier(data.plan, data.personalTier);
	const defaultLimit = PROJECT_QUOTA_LIMITS[tier].project;
	const projectLimit = normalizeNumber(data.limit ?? data.projectLimit, defaultLimit);
	return {
		version: tier,
		projectLimit,
		projectCount: normalizeNumber(data.used ?? data.projectCount, projectLimit),
		freeTrial: typeof data.freeTrial === "boolean" ? data.freeTrial : void 0
	};
}
/** 检查是否为 17261 exclusive 错误 */
function isExclusivePlanError(raw) {
	return extractEnvelopeCode(raw) === QUOTA_ERROR_CODES.exclusive;
}
var PROJECT_QUOTA_LIMITS, QUOTA_ERROR_CODES, MemberQuotaExceededError, ProjectQuotaExceededError, ExclusivePlanNotSupportedError;
var init_quota_errors = __esmMin((() => {
	PROJECT_QUOTA_LIMITS = {
		experience: {
			project: 5,
			member: 5
		},
		youth: {
			project: 10,
			member: 5
		},
		standard: {
			project: 10,
			member: 5
		},
		advanced: {
			project: 15,
			member: 8
		},
		flagship: {
			project: 20,
			member: 10
		},
		enterprise: {
			project: 100,
			member: 1e3
		}
	};
	QUOTA_ERROR_CODES = {
		member: 17234,
		memberJoinRequest: 17273,
		memberJoinRequestName: "TeamsJoinRequestMemberCapacity",
		project: 17260,
		exclusive: 17261
	};
	MemberQuotaExceededError = class MemberQuotaExceededError extends Error {
		code = QUOTA_ERROR_CODES.member;
		data;
		constructor(data, message) {
			super(message ?? "Project member quota exceeded");
			this.name = "MemberQuotaExceededError";
			this.data = data;
			Object.setPrototypeOf(this, MemberQuotaExceededError.prototype);
		}
	};
	ProjectQuotaExceededError = class ProjectQuotaExceededError extends Error {
		code = QUOTA_ERROR_CODES.project;
		data;
		constructor(data, message) {
			super(message ?? "Project quota exceeded");
			this.name = "ProjectQuotaExceededError";
			this.data = data;
			Object.setPrototypeOf(this, ProjectQuotaExceededError.prototype);
		}
	};
	ExclusivePlanNotSupportedError = class ExclusivePlanNotSupportedError extends Error {
		code = QUOTA_ERROR_CODES.exclusive;
		constructor(message) {
			super(message ?? "Exclusive plan is not supported for Teams");
			this.name = "ExclusivePlanNotSupportedError";
			Object.setPrototypeOf(this, ExclusivePlanNotSupportedError.prototype);
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-invitation.ts
var init_cloud_invitation = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-join-request.ts
var init_cloud_join_request = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-manifest.ts
var init_cloud_manifest = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-member.ts
var init_cloud_member = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-project.ts
var init_cloud_project = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-todo-utils.ts
var init_cloud_todo_utils = __esmMin((() => {
	init_http();
})), MESSAGE_FIELDS;
var init_cloud_project_message = __esmMin((() => {
	init_cloud_todo_utils();
	MESSAGE_FIELDS = `
    id content author { id name } parentId editCount source createdAt updatedAt isDeleted
    attachments { 
    attachmentId provider externalId name fileType fileSize externalUrl
 }
`;
	`${MESSAGE_FIELDS}`;
	`${MESSAGE_FIELDS}`;
	`${MESSAGE_FIELDS}`;
	`${MESSAGE_FIELDS}`;
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-skill.ts
var init_cloud_skill = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-task.ts
var init_cloud_task = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-task-collaboration.ts
var init_cloud_task_collaboration = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-task-queue.ts
var init_cloud_task_queue = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/todo-errors.ts
function collectErrorMessages(reason) {
	if (typeof reason === "string") return [reason];
	if (!reason || typeof reason !== "object") return reason instanceof Error ? [reason.message] : [];
	const err = reason;
	const details = Array.isArray(err.details) ? err.details : [];
	return [
		err.message,
		err.response?.data?.message,
		err.response?.data?.msg,
		...details
	].filter((item) => typeof item === "string" && item.trim().length > 0);
}
function extractErrorCode(reason) {
	if (!reason || typeof reason !== "object") return;
	const err = reason;
	const code = err.code ?? err.response?.data?.code;
	if (typeof code === "number" || typeof code === "string") return code;
}
function isTodoNotFoundError(reason) {
	if (reason instanceof TodoNotFoundError) return true;
	const code = extractErrorCode(reason);
	if (code === TODO_ERROR_CODES.notFound || code === String(TODO_ERROR_CODES.notFound)) return true;
	return collectErrorMessages(reason).some((item) => /todo not found|get todo returned empty todo/i.test(item));
}
var TODO_ERROR_CODES, TodoNotFoundError;
var init_todo_errors = __esmMin((() => {
	TODO_ERROR_CODES = { notFound: 17301 };
	TodoNotFoundError = class TodoNotFoundError extends Error {
		code = TODO_ERROR_CODES.notFound;
		constructor(message = "Todo not found") {
			super(message);
			this.name = "TodoNotFoundError";
			Object.setPrototypeOf(this, TodoNotFoundError.prototype);
		}
	};
})), TODO_CORE_FIELDS, TODO_DETAIL_FIELDS;
var init_cloud_todo = __esmMin((() => {
	init_cloud_todo_utils();
	TODO_CORE_FIELDS = `
    id
    projectId
    title
    description
    priority
    source
    sourceExternalId
    sourceExternalUrl
    tags
    summary
    sessions { sessionId createdBy { id name } createdAt }
    dueDate
    startedAt
    completedAt
    pauseReason
    createdAt
    updatedAt
    status { id name type }
    creator { id name }
    assignees { id name }
    handoffFrom { id }
    handoffNote
    handoffSessionId
`;
	TODO_DETAIL_FIELDS = `
    ${TODO_CORE_FIELDS}
    snapshotSessionId
    subscribers { id name }
    allowedTransitions { id name type }
    attachments { id provider externalId name fileType fileSize externalUrl uploadedBy { id name } createdAt }
    history { nodes { id actorId field oldValue newValue createdAt } totalCount }
`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_DETAIL_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
	`${TODO_CORE_FIELDS}`;
})), COMMENT_FIELDS;
var init_cloud_todo_comment = __esmMin((() => {
	init_cloud_todo_utils();
	COMMENT_FIELDS = `
    id content source author { id name } parentId editCount createdAt updatedAt isDeleted
    replies { id content source author { id name } parentId editCount createdAt updatedAt isDeleted }
`;
	`${COMMENT_FIELDS}`;
	`${COMMENT_FIELDS}`;
	`${COMMENT_FIELDS}`;
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-todo-sync-source.ts
var init_cloud_todo_sync_source = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/cloud-todo-webhook.ts
var init_cloud_todo_webhook = __esmMin((() => {
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/cloud-repo.ts
var init_cloud_repo = __esmMin((() => {
	init_cloud_activity();
	init_cloud_expert();
	init_cloud_invitation();
	init_cloud_join_request();
	init_cloud_manifest();
	init_cloud_member();
	init_cloud_project();
	init_cloud_project_message();
	init_cloud_skill();
	init_cloud_task();
	init_cloud_task_collaboration();
	init_cloud_task_queue();
	init_cloud_todo();
	init_cloud_todo_comment();
	init_cloud_todo_sync_source();
	init_cloud_todo_webhook();
	init_http();
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/todo-netdisk-attachment-service.ts
async function findChildFolderId(client, parentId, folderName) {
	let cursor = "";
	do {
		const result = await client.dir.list({
			parentID: parentId || void 0,
			cursor,
			limit: 100,
			entryKind: 1
		});
		const matched = result.entries.find((entry) => entry.kind === 2 && entry.name === folderName);
		if (matched?.fileID) return matched.fileID;
		cursor = result.nextCursor || "";
	} while (cursor);
	return "";
}
async function ensureChildFolder(client, parentId, folderName, appId) {
	const existingId = await findChildFolderId(client, parentId, folderName);
	if (existingId) return existingId;
	try {
		const result = await client.dir.create({
			parentID: parentId || void 0,
			name: folderName,
			appId
		});
		if (result.fileID) return result.fileID;
	} catch (error) {
		const createdByConcurrentRequest = await findChildFolderId(client, parentId, folderName);
		if (createdByConcurrentRequest) return createdByConcurrentRequest;
		throw error;
	}
	const createdId = await findChildFolderId(client, parentId, folderName);
	if (createdId) return createdId;
	throw new Error(`创建网盘目录失败：${folderName}`);
}
/** 确保项目网盘中存在 `${rootFolderName ?? '待办附件'}/<todoId>`，返回 `<todoId>` 子目录 ID。 */
async function ensureProjectTodoNetdiskAttachmentFolder(client, params) {
	const todoId = params.todoId.trim();
	if (!todoId) throw new Error("创建待办附件目录失败：缺少待办 ID");
	return ensureChildFolder(client, await ensureChildFolder(client, params.rootFolderId ?? "", params.rootFolderName ?? DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME, params.appId), todoId, params.appId);
}
/**
* 确保项目网盘中存在 `${rootFolderName ?? '系统文件'}/<bucketName>`，返回 bucket 子目录 ID。
* 留言附件专用：不要求 todoId，所有未关联到 messageId 的上传统一进 draft 子目录。
*/
async function ensureProjectMessageNetdiskAttachmentFolder(client, params = {}) {
	const rootFolderId = params.rootFolderId ?? "";
	const rootFolderName = params.rootFolderName ?? DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME;
	const bucketName = (params.bucketName ?? DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME).trim() || DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME;
	return ensureChildFolder(client, await ensureChildFolder(client, rootFolderId, rootFolderName, params.appId), bucketName, params.appId);
}
var DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME, DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME;
var init_todo_netdisk_attachment_service = __esmMin((() => {
	DEFAULT_TODO_ATTACHMENT_ROOT_FOLDER_NAME = "系统文件";
	DEFAULT_MESSAGE_ATTACHMENT_BUCKET_NAME = "draft";
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/file-tree-utils.ts
function convertEntriesToTreeEntries(entries, basePath, depth) {
	const nodeMap = /* @__PURE__ */ new Map();
	const rootNodes = [];
	const normBasePath = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
	const normalizePath = (p) => p.endsWith("/") ? p.slice(0, -1) : p;
	const getDepthLevel = (p) => {
		return (p.startsWith(normBasePath) ? p.slice(normBasePath.length) : p).split("/").filter((s) => s.length > 0).length;
	};
	for (const entry of entries) {
		const fullPath = normalizePath(entry.path || `${normBasePath}/${entry.name}`);
		const isFile = entry.type === "file";
		const node = {
			path: fullPath,
			name: entry.name,
			type: isFile ? "file" : "dir",
			children: !isFile ? [] : void 0,
			isLoaded: isFile ? void 0 : false
		};
		nodeMap.set(fullPath, node);
	}
	const ensureParent = (childPath) => {
		const parentPath = childPath.substring(0, childPath.lastIndexOf("/"));
		if (parentPath === normBasePath || parentPath === "") return null;
		if (nodeMap.has(parentPath)) return nodeMap.get(parentPath);
		const implicitDir = {
			path: parentPath,
			name: parentPath.substring(parentPath.lastIndexOf("/") + 1),
			type: "dir",
			children: [],
			isLoaded: false
		};
		nodeMap.set(parentPath, implicitDir);
		const grandParent = ensureParent(parentPath);
		if (grandParent?.children) grandParent.children.push(implicitDir);
		else rootNodes.push(implicitDir);
		return implicitDir;
	};
	for (const entry of entries) {
		const fullPath = normalizePath(entry.path || `${normBasePath}/${entry.name}`);
		const node = nodeMap.get(fullPath);
		if (!node) continue;
		const parentPath = fullPath.substring(0, fullPath.lastIndexOf("/"));
		if (parentPath === normBasePath || parentPath === "") rootNodes.push(node);
		else {
			const parent = ensureParent(fullPath);
			if (parent?.children) parent.children.push(node);
			else rootNodes.push(node);
		}
	}
	for (const node of nodeMap.values()) if (node.type === "dir") node.isLoaded = getDepthLevel(node.path) < depth || !!(node.children && node.children.length > 0);
	const sortNodes = (nodes) => {
		nodes.sort((a, b) => {
			if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
			return a.name.localeCompare(b.name, void 0, {
				numeric: true,
				sensitivity: "base"
			});
		});
		for (const node of nodes) if (node.children) sortNodes(node.children);
	};
	sortNodes(rootNodes);
	return rootNodes;
}
var init_file_tree_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-server/src/my-files/netdrive-file-policy.ts
function normalizeExtension(input) {
	const explicit = input.extension?.replace(/^\./, "").toLowerCase().trim();
	if (explicit) return explicit;
	const last = input.name.split(".").pop();
	return last && last !== input.name ? last.toLowerCase() : "";
}
function isImageExtension(ext) {
	return IMAGE_EXTENSIONS.includes(ext);
}
function isTextDocumentExtension(ext) {
	return TEXT_DOCUMENT_EXTENSIONS.includes(ext);
}
function isCodeExtension(ext) {
	return CODE_EXTENSIONS.includes(ext);
}
function isOfficeDocumentExtension(ext) {
	return OFFICE_DOCUMENT_EXTENSIONS.includes(ext);
}
function sizeExceeded(size, maxSize) {
	return typeof size === "number" && Number.isFinite(size) && size > maxSize;
}
function formatMb(bytes) {
	return `${Math.round(bytes / 1024 / 1024)}MB`;
}
function classifyNetDriveItem(input) {
	if (input.isFolder) return {
		kind: "folder",
		canSelect: true
	};
	const extension = normalizeExtension(input);
	if (!extension) return {
		kind: "unsupported",
		canSelect: false,
		disabledReason: "暂不支持读取未知类型文件"
	};
	if (isImageExtension(extension)) {
		const maxSize = NETDRIVE_FILE_SIZE_LIMITS.IMAGE_MAX_SIZE;
		if (sizeExceeded(input.size, maxSize)) return {
			kind: "image",
			extension,
			mimeType: input.mimeType || IMAGE_MIME_TYPES[extension],
			maxSize,
			canSelect: false,
			disabledReason: `图片超过 ${formatMb(maxSize)}，暂不支持选择`
		};
		return {
			kind: "image",
			extension,
			mimeType: input.mimeType || IMAGE_MIME_TYPES[extension],
			maxSize,
			canSelect: true
		};
	}
	if (isTextDocumentExtension(extension) || isCodeExtension(extension)) {
		const maxSize = isCodeExtension(extension) ? NETDRIVE_FILE_SIZE_LIMITS.CODE_MAX_SIZE : NETDRIVE_FILE_SIZE_LIMITS.TEXT_DOCUMENT_MAX_SIZE;
		if (sizeExceeded(input.size, maxSize)) return {
			kind: "text",
			extension,
			mimeType: input.mimeType || TEXT_MIME_TYPES[extension],
			maxSize,
			canSelect: false,
			disabledReason: `文件超过 ${formatMb(maxSize)}，暂不支持选择`
		};
		return {
			kind: "text",
			extension,
			mimeType: input.mimeType || TEXT_MIME_TYPES[extension],
			maxSize,
			canSelect: true
		};
	}
	if (isOfficeDocumentExtension(extension)) {
		const maxSize = NETDRIVE_FILE_SIZE_LIMITS.OFFICE_DOCUMENT_MAX_SIZE;
		if (sizeExceeded(input.size, maxSize)) return {
			kind: "document",
			extension,
			mimeType: input.mimeType || OFFICE_MIME_TYPES[extension],
			maxSize,
			canSelect: false,
			disabledReason: `文件超过 ${formatMb(maxSize)}，暂不支持选择`
		};
		return {
			kind: "document",
			extension,
			mimeType: input.mimeType || OFFICE_MIME_TYPES[extension],
			maxSize,
			canSelect: true
		};
	}
	return {
		kind: "unsupported",
		extension,
		mimeType: input.mimeType,
		canSelect: false,
		disabledReason: `暂不支持读取 .${extension} 类型文件`
	};
}
var IMAGE_EXTENSIONS, TEXT_DOCUMENT_EXTENSIONS, CODE_EXTENSIONS, OFFICE_DOCUMENT_EXTENSIONS, IMAGE_MIME_TYPES, TEXT_MIME_TYPES, OFFICE_MIME_TYPES, NETDRIVE_FILE_SIZE_LIMITS;
var init_netdrive_file_policy = __esmMin((() => {
	IMAGE_EXTENSIONS = [
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp"
	];
	TEXT_DOCUMENT_EXTENSIONS = [
		"txt",
		"md",
		"json",
		"jsonl",
		"xml",
		"yaml",
		"yml",
		"csv",
		"tsv",
		"log"
	];
	CODE_EXTENSIONS = [
		"js",
		"ts",
		"jsx",
		"tsx",
		"py",
		"go",
		"java",
		"cpp",
		"c",
		"h",
		"css",
		"scss",
		"html"
	];
	OFFICE_DOCUMENT_EXTENSIONS = [
		"pdf",
		"doc",
		"docx",
		"xls",
		"xlsx",
		"ppt",
		"pptx"
	];
	IMAGE_MIME_TYPES = {
		png: "image/png",
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		gif: "image/gif",
		webp: "image/webp",
		bmp: "image/bmp"
	};
	TEXT_MIME_TYPES = {
		txt: "text/plain",
		md: "text/markdown",
		json: "application/json",
		jsonl: "application/jsonl",
		xml: "application/xml",
		yaml: "application/x-yaml",
		yml: "application/x-yaml",
		csv: "text/csv",
		tsv: "text/tab-separated-values",
		log: "text/plain",
		js: "application/javascript",
		ts: "application/typescript",
		jsx: "text/jsx",
		tsx: "text/tsx",
		py: "text/x-python",
		go: "text/x-go",
		java: "text/x-java",
		cpp: "text/x-c++src",
		c: "text/x-csrc",
		h: "text/x-chdr",
		css: "text/css",
		scss: "text/x-scss",
		html: "text/html"
	};
	OFFICE_MIME_TYPES = {
		pdf: "application/pdf",
		doc: "application/msword",
		docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		xls: "application/vnd.ms-excel",
		xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		ppt: "application/vnd.ms-powerpoint",
		pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
	};
	NETDRIVE_FILE_SIZE_LIMITS = {
		IMAGE_MAX_SIZE: 5 * 1024 * 1024,
		TEXT_DOCUMENT_MAX_SIZE: 10 * 1024 * 1024,
		CODE_MAX_SIZE: 1 * 1024 * 1024,
		OFFICE_DOCUMENT_MAX_SIZE: 10 * 1024 * 1024
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/tdrive-root-utils.ts
function escapeXmlAttribute(value) {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var init_tdrive_root_utils = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/_internal/netdrive-attachments.ts
/**
* 入口：扫描 prompt blocks，收集 netdrive resource_link，渲染成 system-reminder
* text block，返回新的 prompt。无附件或 prompt 是字符串时直接返回原值。
*/
function injectNetDriveAttachments(prompt) {
	if (typeof prompt === "string" || !Array.isArray(prompt)) return prompt;
	const items = collectNetDriveItems(prompt);
	if (items.length === 0) return prompt;
	return [{
		type: "text",
		text: wrapHiddenContextXml(renderNetDriveAttachments(items).join("\n"), ADDITIONAL_DATA_ROLE)
	}, ...prompt.map((block) => stripNetDriveUri(block))];
}
function isNetDriveResourceLink(block) {
	return block.type === "resource_link" && typeof block.uri === "string" && block.uri.startsWith("netdrive://");
}
function stripNetDriveUri(block) {
	const record = block;
	if (!isNetDriveResourceLink(record)) return block;
	const next = {
		...record,
		uri: ""
	};
	if (record._meta && typeof record._meta === "object") {
		const meta = { ...record._meta };
		if ("url" in meta) meta.url = "";
		if ("uri" in meta) meta.uri = "";
		next._meta = meta;
	}
	return next;
}
function collectNetDriveItems(blocks) {
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const block of blocks) {
		if (block.type !== "resource_link") continue;
		const link = block;
		if (typeof link.uri !== "string" || !link.uri.startsWith("netdrive://")) continue;
		const meta = link._meta ?? {};
		const parsed = parseNetDriveUri(link.uri);
		const fileId = readString(meta.fileId);
		if (!fileId) {
			console.warn("[ProjectChat] netdrive resource_link missing meta.fileId, skip", {
				uri: link.uri,
				name: link.name,
				parsedPath: parsed?.path,
				metaKeys: Object.keys(meta)
			});
			continue;
		}
		const isFolder = readBoolean(meta.isFolder) ?? readBoolean(meta.folder) ?? (parsed?.itemType === "folder" || readString(meta.itemType) === "folder" || readString(meta.type) === "folder");
		const itemType = isFolder ? "folder" : "file";
		const key = `${itemType}:${fileId.toLowerCase()}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const title = readString(meta.title) ?? readString(meta.fileName) ?? readString(meta.name) ?? (typeof link.name === "string" && link.name ? link.name : fileId);
		const numericSize = readNumber(meta.fileSize) ?? readNumber(meta.size);
		const policy = classifyNetDriveItem({
			name: title,
			size: numericSize,
			isFolder,
			extension: readString(meta.extension) ?? readString(meta.ext) ?? getExtension(title),
			mimeType: readString(meta.mimeType) ?? readString(meta.mime_type)
		});
		result.push({
			fileId,
			title,
			itemType,
			kind: policy.kind,
			extension: policy.extension,
			mimeType: policy.mimeType,
			size: numericSize !== void 0 ? String(numericSize) : void 0,
			canSelect: policy.canSelect,
			disabledReason: policy.disabledReason
		});
	}
	return result;
}
/**
* 渲染 `<tdrive_attachments>` 块（Teams 上下文策略 §4.2）。
*
* 输出形态：
* ```
* <tdrive_attachments>
* <导语>
* <file id="..." title="..." item_type="file|folder" />
* ...
* </tdrive_attachments>
* ```
*
* 按策略 §4.2 只保留三个属性（`id` / `title` / `item_type`）—— minimal addressable。
* `kind` / `readable` / `ext` / `mime_type` / `size` / `disabledReason` 等模型辅助字段
* 按「不同文件类型由 netdrive__tdrive MCP 内部按类型分发处理」的口径下沉到 MCP。
*/
function renderNetDriveAttachments(items) {
	const lines = ["<tdrive_attachments>", NETDRIVE_USAGE_HEADER];
	for (const item of items) {
		const attrs = [
			`id="${escapeXmlAttribute(item.fileId)}"`,
			`title="${escapeXmlAttribute(item.title)}"`,
			`item_type="${escapeXmlAttribute(item.itemType)}"`
		];
		lines.push(`<file ${attrs.join(" ")} />`);
	}
	lines.push("</tdrive_attachments>");
	return lines;
}
function parseNetDriveUri(uri) {
	if (!uri.startsWith("netdrive://")) return;
	const rest = uri.slice(11);
	const queryIndex = rest.indexOf("?");
	const path = decodeURIComponentSafe(queryIndex >= 0 ? rest.slice(0, queryIndex) : rest);
	const query = queryIndex >= 0 ? rest.slice(queryIndex + 1) : "";
	let itemType;
	for (const pair of query.split("&")) {
		const [rawKey, rawValue = ""] = pair.split("=");
		const key = decodeURIComponentSafe(rawKey);
		const value = decodeURIComponentSafe(rawValue);
		if (key === "type" && (value === "file" || value === "folder")) itemType = value;
	}
	return {
		path,
		itemType
	};
}
function decodeURIComponentSafe(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function readString(value) {
	if (typeof value === "string") return value.trim().length > 0 ? value.trim() : void 0;
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
}
function readBoolean(value) {
	if (typeof value === "boolean") return value;
	if (typeof value === "string") {
		const normalized = value.trim().toLowerCase();
		if (normalized === "true") return true;
		if (normalized === "false") return false;
	}
}
function readNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "string" && value.trim()) {
		const parsed = Number(value.trim());
		return Number.isFinite(parsed) ? parsed : void 0;
	}
}
function getExtension(name) {
	const last = name.split(".").pop();
	return last && last !== name ? last.toLowerCase() : void 0;
}
var NETDRIVE_USAGE_HEADER;
var init_netdrive_attachments = __esmMin((() => {
	init_common();
	init_netdrive_file_policy();
	init_tdrive_root_utils();
	NETDRIVE_USAGE_HEADER = "The user has attached Tencent NetDrive resources as `netdrive://`, with metadata in the block below. Look up each `id` there and call the `netdrive__tdrive` MCP — never use Read/Glob/Grep/Bash on `netdrive://` URIs.";
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/cloud-sandbox-telemetry.ts
function redactCloudSandboxText(value) {
	let text = value instanceof Error ? value.message : String(value ?? "");
	for (const [pattern, replacement] of TOKEN_PATTERNS) text = text.replace(pattern, replacement);
	text = text.replace(URL_PATTERN, (url) => {
		try {
			const parsed = new URL(url);
			return `${parsed.origin}${parsed.pathname.replace(/\/[^/]*$/, "/[REDACTED]")}`;
		} catch {
			return "[REDACTED_URL]";
		}
	}).replace(WINDOWS_PATH_PATTERN, "[REDACTED_PATH]").replace(UNIX_PATH_PATTERN, (path) => path.startsWith("/workspace") ? "/workspace/[REDACTED]" : "[REDACTED_PATH]");
	return text.length > ERROR_MESSAGE_MAX_LENGTH ? text.slice(0, ERROR_MESSAGE_MAX_LENGTH) : text;
}
function classifyCloudSandboxError(error) {
	const err = error;
	const status = typeof err?.status === "number" ? err.status : typeof err?.response?.status === "number" ? err.response.status : void 0;
	const code = typeof err?.code === "string" && err.code.length <= 64 ? err.code : status !== void 0 ? `HTTP_${status}` : void 0;
	let kind = "unknown";
	switch (true) {
		case code === "AbortError" || code === "ABORT_ERR":
			kind = "cancelled";
			break;
		case status === 401 || status === 403:
			kind = "auth";
			break;
		case status === 404:
			kind = "not_found";
			break;
		case status === 429:
			kind = "rate_limit";
			break;
		case typeof status === "number" && status >= 500:
			kind = "server_error";
			break;
		case typeof status === "number" && status >= 400:
			kind = "client_error";
			break;
		case typeof code === "string" && /ECONN|ETIMEDOUT|ENOTFOUND|NETWORK/i.test(code):
			kind = "network";
			break;
	}
	return {
		error_kind: kind,
		...code ? { error_code: code } : {},
		error_message: redactCloudSandboxText(error)
	};
}
function cloudSandboxDurationSince(startedAt) {
	return Math.max(0, Math.round(Date.now() - startedAt));
}
function buildCloudSandboxPayload(reporter, fields) {
	const out = { surface: reporter.surface };
	const entries = [
		["project_id", fields.projectId],
		["conversation_id", fields.conversationId],
		["session_id", fields.sessionId],
		["sandbox_id", fields.sandboxId],
		["request_id", fields.requestId],
		["trace_id", fields.traceId],
		...Object.entries(fields).filter(([key]) => ALLOWED_EXTRA_KEYS.has(key))
	];
	for (const [key, value] of entries) {
		if (value === void 0 || value === null) continue;
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") out[key] = typeof value === "string" ? redactCloudSandboxText(value) : value;
	}
	out.ext1 = reporter.surface;
	const outcome = typeof fields.outcome === "string" ? fields.outcome : "";
	out.ext2 = (typeof fields.error_kind === "string" ? fields.error_kind : "") || outcome || "none";
	const durationMs = typeof fields.duration_ms === "number" ? fields.duration_ms : void 0;
	out.ext3 = durationMs !== void 0 ? String(durationMs) : "";
	return out;
}
function emit(reporter, eventName, fields) {
	if (!reporter) return;
	try {
		reporter.reportEvent(eventName, buildCloudSandboxPayload(reporter, fields));
	} catch {}
}
function summarizeArtifactTypes(entries) {
	const counts = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const type = typeof entry?.artifact?.type === "string" && entry.artifact.type ? entry.artifact.type : "unknown";
		counts.set(type, (counts.get(type) ?? 0) + 1);
	}
	return Array.from(counts.entries()).map(([type, count]) => `${type}:${count}`).join(",");
}
var ERROR_MESSAGE_MAX_LENGTH, ALLOWED_EXTRA_KEYS, TOKEN_PATTERNS, URL_PATTERN, UNIX_PATH_PATTERN, WINDOWS_PATH_PATTERN, CloudSandboxTelemetryObserver;
var init_cloud_sandbox_telemetry = __esmMin((() => {
	ERROR_MESSAGE_MAX_LENGTH = 500;
	ALLOWED_EXTRA_KEYS = new Set([
		"event_stage",
		"outcome",
		"duration_ms",
		"cold_start",
		"reuse_type",
		"session_mode",
		"mode",
		"model",
		"operation",
		"filesystem_source",
		"artifact_count",
		"artifact_types",
		"artifact_event",
		"sync_source",
		"close_reason",
		"error_kind",
		"error_code",
		"error_message",
		"message_count",
		"chunk_type"
	]);
	TOKEN_PATTERNS = [
		[/Bearer\s+[A-Za-z0-9._~+\-/]+=*/gi, "Bearer [REDACTED]"],
		[/(token|access_token|authToken|authorization|cookie)=([^\s&]+)/gi, "$1=[REDACTED]"],
		[/(sk-[A-Za-z0-9]{16,})/g, "[REDACTED_TOKEN]"],
		[/(ghp_[A-Za-z0-9_]+)/g, "[REDACTED_TOKEN]"]
	];
	URL_PATTERN = /https?:\/\/[^\s)"']+/gi;
	UNIX_PATH_PATTERN = /(?:\/[A-Za-z0-9._-]+){2,}/g;
	WINDOWS_PATH_PATTERN = /(?:[A-Za-z]:[\\/]|\\\\)[^\s)"']+/g;
	CloudSandboxTelemetryObserver = class {
		constructor(reporter) {
			this.reporter = reporter;
		}
		emitEvent(eventName, baseFields, error) {
			const fields = error === void 0 ? baseFields : {
				...baseFields,
				...classifyCloudSandboxError(error)
			};
			emit(this.reporter, eventName, fields);
		}
		sessionConnectStart(fields) {
			emit(this.reporter, "cloud_sandbox_session_connect_start", {
				event_stage: "session_connect",
				...fields
			});
		}
		sessionReady(fields) {
			emit(this.reporter, "cloud_sandbox_session_ready", {
				event_stage: "session_connect",
				outcome: "success",
				...fields
			});
		}
		sessionError(fields, error) {
			this.emitEvent("cloud_sandbox_session_error", {
				event_stage: "session_connect",
				outcome: "failed",
				...fields
			}, error);
		}
		sessionClose(fields) {
			emit(this.reporter, "cloud_sandbox_session_close", {
				event_stage: "session_close",
				outcome: "success",
				...fields
			});
		}
		promptSubmit(fields) {
			emit(this.reporter, "cloud_sandbox_prompt_submit", {
				event_stage: "prompt",
				...fields
			});
		}
		promptComplete(fields, error) {
			this.emitEvent("cloud_sandbox_prompt_complete", {
				event_stage: "prompt",
				...fields
			}, error);
		}
		filesystemOutcome(fields, error) {
			this.emitEvent("cloud_sandbox_filesystem_outcome", {
				event_stage: "filesystem",
				...fields
			}, error);
		}
		artifactSync(fields, error) {
			this.emitEvent("cloud_sandbox_artifact_sync", {
				event_stage: "artifact",
				...fields
			}, error);
		}
		promptFirstChunk(fields) {
			emit(this.reporter, "cloud_sandbox_prompt_first_chunk", {
				event_stage: "prompt",
				...fields
			});
		}
		sessionHistoryLoaded(fields) {
			emit(this.reporter, "cloud_sandbox_session_history_loaded", {
				event_stage: "session_connect",
				...fields
			});
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/collab-cloud-e2b-filesystem.ts
function mapFileType(proto) {
	if (proto === 1 || proto === "FILE_TYPE_FILE") return FileType.FILE;
	if (proto === 2 || proto === "FILE_TYPE_DIR" || proto === "FILE_TYPE_DIRECTORY") return FileType.DIR;
}
function mapTimestamp(ts) {
	if (!ts) return;
	if (typeof ts === "string") return new Date(ts);
	return new Date(Number(ts.seconds) * 1e3 + Math.floor(ts.nanos / 1e6));
}
function mapEntry(e) {
	const type = mapFileType(e.type);
	if (!type) return;
	return {
		name: e.name,
		type,
		path: e.path,
		size: Number(e.size),
		mode: e.mode,
		permissions: e.permissions,
		owner: e.owner,
		group: e.group,
		modifiedTime: mapTimestamp(e.modifiedTime),
		symlinkTarget: e.symlinkTarget
	};
}
var RPC_BASE, DEFAULT_TIMEOUT_MS, CollabCloudE2BFilesystem;
var init_collab_cloud_e2b_filesystem = __esmMin((() => {
	init_common$1();
	RPC_BASE = "/filesystem.Filesystem";
	DEFAULT_TIMEOUT_MS = 3e4;
	CollabCloudE2BFilesystem = class CollabCloudE2BFilesystem {
		constructor(apiUrl, accessToken, headers, timeoutMs, sandboxId, domain, logFn) {
			this.apiUrl = apiUrl;
			this.accessToken = accessToken;
			this.headers = headers;
			this.timeoutMs = timeoutMs;
			this.sandboxId = sandboxId;
			this.domain = domain;
			this.logFn = logFn;
		}
		/**
		* Create a filesystem client from sandbox connection info.
		* Synchronous — no network calls needed to construct.
		*
		* @param logFn Optional log sink — every debug log will be forwarded here
		*              (in addition to console.log) so callers can persist to disk.
		*/
		static connect(info, logFn) {
			const apiUrl = info.apiUrl || `https://49983-${info.sandboxId}.${info.domain || "e2b.dev"}`;
			const token = info.accessToken || info.apiKey || "";
			const sandboxId = info.sandboxId || "";
			const domain = info.domain || "e2b.dev";
			const connectInfo = {
				apiUrl,
				sandboxId,
				domain,
				hasAccessToken: !!info.accessToken,
				hasApiKey: !!info.apiKey,
				tokenPrefix: token ? token.slice(0, 20) + "..." : "(empty)",
				tokenLength: token.length,
				extraHeaders: info.headers ? Object.keys(info.headers) : []
			};
			console.log("[CollabCloudE2BFilesystem] connect", connectInfo);
			logFn?.("e2bFs:connect", connectInfo);
			return new CollabCloudE2BFilesystem(apiUrl, token, info.headers || {}, info.requestTimeoutMs || DEFAULT_TIMEOUT_MS, sandboxId, domain, logFn);
		}
		/** Log to console AND forward to the injected logFn (file_attachment.log). */
		log(tag, data) {
			const fullTag = `[CollabCloudE2BFilesystem] ${tag}`;
			console.log(fullTag, typeof data === "string" ? data : JSON.stringify(data));
			this.logFn?.(`e2bFs:${tag}`, data);
		}
		restHeaders() {
			const h = { ...this.headers };
			if (this.accessToken) h["X-Access-Token"] = this.accessToken;
			return h;
		}
		rpcHeaders() {
			return {
				"Content-Type": "application/json",
				"Connect-Protocol-Version": "1",
				...this.restHeaders()
			};
		}
		/** Sanitize headers for logging — mask long tokens but keep enough for debugging */
		sanitizeHeadersForLog(headers) {
			const result = {};
			for (const [key, value] of Object.entries(headers)) if (key.toLowerCase() === "x-access-token" && value.length > 40) result[key] = value.slice(0, 30) + "..." + value.slice(-10) + ` (len=${value.length})`;
			else result[key] = value;
			return result;
		}
		/** Convert response Headers to plain object for logging */
		responseHeadersToObj(headers) {
			const obj = {};
			headers.forEach((value, key) => {
				obj[key] = value;
			});
			return obj;
		}
		/** Build a reproducible curl command string from request params. */
		buildCurl(url, headers, bodyStr) {
			const parts = [`curl '${url}'`];
			for (const [key, value] of Object.entries(headers)) {
				const escaped = value.replace(/'/g, "'\\''");
				parts.push(`  -H '${key}: ${escaped}'`);
			}
			parts.push(`  --data-raw '${bodyStr.replace(/'/g, "'\\''")}'`);
			return parts.join(" \\\n");
		}
		async rpc(method, body, timeoutMs) {
			const url = `${this.apiUrl}${RPC_BASE}/${method}`;
			const headers = this.rpcHeaders();
			const bodyStr = JSON.stringify(body);
			const curl = this.buildCurl(url, headers, bodyStr);
			this.log(`rpc:${method}:CURL`, curl);
			const reqInfo = {
				url,
				headers: this.sanitizeHeadersForLog(headers),
				body: bodyStr,
				sandboxId: this.sandboxId,
				domain: this.domain,
				apiUrl: this.apiUrl,
				timeoutMs: timeoutMs ?? this.timeoutMs
			};
			this.log(`rpc:${method}:REQUEST`, reqInfo);
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), timeoutMs ?? this.timeoutMs);
			try {
				const resp = await fetch(url, {
					method: "POST",
					headers,
					body: bodyStr,
					signal: controller.signal
				});
				const respText = await resp.text();
				const respInfo = {
					status: resp.status,
					statusText: resp.statusText,
					responseHeaders: this.responseHeadersToObj(resp.headers),
					bodyLength: respText.length,
					bodyPreview: respText.slice(0, 2e3)
				};
				this.log(`rpc:${method}:RESPONSE`, respInfo);
				if (!resp.ok) throw new Error(`E2B RPC ${method} failed: ${resp.status} ${respText}`);
				return JSON.parse(respText);
			} catch (err) {
				this.log(`rpc:${method}:ERROR`, {
					error: err.message,
					url,
					headers: this.sanitizeHeadersForLog(headers),
					body: bodyStr
				});
				throw err;
			} finally {
				clearTimeout(timer);
			}
		}
		async list(path, opts) {
			const depth = opts?.depth ?? 1;
			if (depth < 1) throw new Error("depth should be at least one");
			this.log("list:start", {
				path,
				depth,
				requestTimeoutMs: opts?.requestTimeoutMs
			});
			const res = await this.rpc("ListDir", {
				path,
				depth
			}, opts?.requestTimeoutMs);
			this.log("list:rawResult", {
				path,
				depth,
				hasEntries: !!res.entries,
				entryCount: res.entries?.length ?? 0,
				rawKeys: Object.keys(res),
				firstFewEntries: (res.entries || []).slice(0, 5).map((e) => ({
					name: e.name,
					type: e.type,
					path: e.path
				}))
			});
			const entries = [];
			for (const e of res.entries || []) {
				const mapped = mapEntry(e);
				if (mapped) entries.push(mapped);
			}
			this.log("list:mapped", {
				path,
				depth,
				mappedCount: entries.length
			});
			return entries;
		}
		async read(path, opts) {
			const format = opts?.format ?? "text";
			const url = `${this.apiUrl}/files?path=${encodeURIComponent(path)}`;
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
			try {
				const resp = await fetch(url, {
					headers: this.restHeaders(),
					signal: controller.signal
				});
				if (!resp.ok) {
					const text = await resp.text().catch(() => "");
					throw new Error(`E2B read failed: ${resp.status} ${text}`);
				}
				switch (format) {
					case "bytes": return new Uint8Array(await resp.arrayBuffer());
					case "blob": return await resp.blob();
					case "stream": return resp.body;
					default: return await resp.text();
				}
			} finally {
				clearTimeout(timer);
			}
		}
		async write(pathOrFiles, dataOrOpts, opts) {
			if (Array.isArray(pathOrFiles)) {
				const results = [];
				for (const entry of pathOrFiles) results.push(await this.writeSingle(entry.path, entry.data, opts));
				return results;
			}
			return this.writeSingle(pathOrFiles, dataOrOpts, opts);
		}
		/**
		* 写单个文件。用 multipart/form-data 格式（envd REST 标准写法），
		* 对齐 MiniProgramE2BFilesystem 的 multipart 构造逻辑。
		* 纯字符串 body 在 agentos worker 等 envd 版本会返回 500。
		*/
		async writeSingle(writtenPath, data, opts) {
			const url = `${this.apiUrl}/files?path=${encodeURIComponent(writtenPath)}`;
			this.log("write:start", {
				path: writtenPath,
				kind: typeof data
			});
			const encoder = new TextEncoder();
			const boundary = `----CollabBoundary${Date.now()}${Math.random().toString(36).slice(2)}`;
			const fileName = writtenPath.split("/").pop() || "file";
			let fileBytes;
			if (typeof data === "string") fileBytes = encoder.encode(data);
			else if (data instanceof ArrayBuffer) fileBytes = new Uint8Array(data);
			else if (data instanceof Blob) {
				const arrayBuf = await data.arrayBuffer();
				fileBytes = new Uint8Array(arrayBuf);
			} else {
				this.log("write:readableStream_fallback", { path: writtenPath });
				const controller = new AbortController();
				const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
				try {
					const resp = await fetch(url, {
						method: "POST",
						headers: this.restHeaders(),
						body: data,
						signal: controller.signal
					});
					if (!resp.ok) {
						const text = await resp.text().catch(() => "");
						throw new Error(`E2B write failed: ${resp.status} ${text}`);
					}
					return {
						path: writtenPath,
						type: FileType.FILE
					};
				} finally {
					clearTimeout(timer);
				}
			}
			const headerStr = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: application/octet-stream\r\n\r\n`;
			const footerStr = `\r\n--${boundary}--\r\n`;
			const parts = [
				encoder.encode(headerStr),
				fileBytes,
				encoder.encode(footerStr)
			];
			const totalLen = parts.reduce((s, p) => s + p.byteLength, 0);
			const body = new Uint8Array(totalLen);
			let offset = 0;
			for (const part of parts) {
				body.set(part, offset);
				offset += part.byteLength;
			}
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), opts?.requestTimeoutMs ?? this.timeoutMs);
			try {
				const multipartHeaders = {
					...this.restHeaders(),
					"Content-Type": `multipart/form-data; boundary=${boundary}`
				};
				const resp = await fetch(url, {
					method: "POST",
					headers: multipartHeaders,
					body: body.buffer,
					signal: controller.signal
				});
				if (!resp.ok) {
					const text = await resp.text().catch(() => "");
					this.log("write:http_error", {
						path: writtenPath,
						status: resp.status,
						body: text.slice(0, 500)
					});
					throw new Error(`E2B write failed: ${resp.status} ${text}`);
				}
				this.log("write:done", { path: writtenPath });
				return {
					path: writtenPath,
					type: FileType.FILE
				};
			} catch (err) {
				this.log("write:error", {
					path: writtenPath,
					error: err.message
				});
				throw err;
			} finally {
				clearTimeout(timer);
			}
		}
		async exists(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: exists() not implemented");
		}
		async makeDir(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: makeDir() not implemented");
		}
		async remove(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: remove() not implemented");
		}
		async rename(_oldPath, _newPath, _opts) {
			throw new Error("CollabCloudE2BFilesystem: rename() not implemented");
		}
		async getInfo(_path, _opts) {
			throw new Error("CollabCloudE2BFilesystem: getInfo() not implemented");
		}
		/**
		* 监听目录变化（list 轮询版）。
		*
		* agentos-worker envd 的 CreateWatcher/GetWatcherEvents RPC 永远返回空事件 {}，
		* 因此放弃 envd 原生 watcher 协议，改用 list() 轮询 + modifyTime 对比。
		*
		* 工作原理：
		*   - 每 2s 调一次 list(path) 获取当前目录 entries；
		*   - 维护上一次的 modifyTime 快照（Map<name, modifyTime>）；
		*   - 比较发现变化时 fire `onEvent({ name, type: WRITE })`。
		*
		* 注意：
		*   - 仅检测 modifyTime 变化（文件写入 / 重命名都会触发），不区分 CREATE vs WRITE；
		*   - 首次 poll 用空快照，不 fire 任何事件（只建立基线）；
		*   - 间隔 2s：对"AI 刚刚改完 → 右侧预览刷新"的场景感知延迟在 2s 内。
		*/
		async watchDir(path, onEvent, opts) {
			this.log("watchDir:start", {
				path,
				mode: "list-poll"
			});
			let stopped = false;
			let lastSnapshot = null;
			const POLL_INTERVAL_MS = 2e3;
			const getMtime = (e) => String(e.modifiedTime ?? e.modifyTime ?? "");
			const poll = async () => {
				{
					const entries = await this.list(path, { depth: 1 });
					lastSnapshot = new Map(entries.map((e) => [e.name, getMtime(e)]));
					this.log("watchDir:baseline", {
						path,
						files: entries.length
					});
				}
				while (!stopped) {
					await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
					if (stopped) return;
					let entries;
					try {
						entries = await this.list(path, { depth: 1 });
					} catch (err) {
						this.log("watchDir:poll_error", {
							path,
							error: err.message
						});
						continue;
					}
					if (stopped) return;
					const current = new Map(entries.map((e) => [e.name, getMtime(e)]));
					const prev = lastSnapshot;
					for (const [name, mtime] of current) {
						const prevMtime = prev.get(name);
						if (!prevMtime) try {
							await onEvent({
								name,
								type: FilesystemEventType.WRITE
							});
						} catch {}
						else if (mtime !== prevMtime) try {
							await onEvent({
								name,
								type: FilesystemEventType.WRITE
							});
						} catch {}
					}
					lastSnapshot = current;
				}
			};
			poll().catch((err) => {
				this.log("watchDir:exit", {
					path,
					error: err.message
				});
				try {
					opts?.onExit?.(err instanceof Error ? err : new Error(String(err)));
				} catch {}
			});
			return { stop: async () => {
				stopped = true;
				this.log("watchDir:stop", { path });
			} };
		}
	};
}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/strip-injected-context.ts
/**
* Strip injected context XML from user-visible text.
*
* Removes `<project-instructions>`, `<ticket-context>`, and `<system-reminder>` blocks
* that are injected by the frontend (buildPromptBlocks / injectTodoContext) before
* sending to the ACP session. These should never be shown in chat bubbles, queue previews,
* or task titles.
*/
function stripInjectedContext(text) {
	return text.replace(/<system-reminder[^>]*>[\s\S]*?<\/system-reminder>\s*/g, "").replace(/<project-instructions>[\s\S]*?<\/project-instructions>\s*/g, "").replace(/<ticket-context>[\s\S]*?<\/ticket-context>\s*/g, "").trim();
}
var init_strip_injected_context = __esmMin((() => {}));
//#endregion
//#region ../../packages/workbuddy-server/src/project/project-chat-service.ts
/**
* 从 session/load response 读取服务端下发的历史末位 offset。
*
* 服务端（sandbox-proxy）在 `_meta['codebuddy.ai'].historyEndOffset` 下发"客户端实际
* 会收到的最后一条历史消息的 offset"（tailOffset 语义，考虑 chunk 合并）。collectHistoryRaw
* 据此精确判定历史/实时边界，避免 resume tailOffset 竞态把历史 assistant chunk 错标
* `mode:stream` 导致提前截断。
*
* 返回 undefined 表示服务端未下发（旧版本 / 降级路径），调用方回退到 mode 判定。
*/
function readHistoryEndOffset(resp) {
	const val = (resp._meta?.["codebuddy.ai"])?.historyEndOffset;
	return typeof val === "number" ? val : void 0;
}
/**
* 历史回放兜底：sandbox-proxy 持久化时丢了 `_meta.sourceTool`，给 media entry
* 重新打上 `PresentFiles` 标记，让 `ArtifactSlotPanel` 的过滤能命中。
*
* 与 `cloud-agent-colleague-service.ts` 中的同名函数语义一致：
* 仅作用于 `artifact.type === 'media'` 且确实缺失 `_meta.sourceTool` 的 entry；
* 其他类型 / 已有 sourceTool 都按原样返回，避免覆盖正常字段。
* sandbox 内的 media artifact 都来自 agent-cli 的 `present_files` 工具调用，
* 这一兜底逻辑因此是安全的。
*/
function restoreSourceToolForMediaEntry(entry) {
	const artifact = entry?.artifact;
	if (!artifact || artifact.type !== "media") return entry;
	if (typeof artifact._meta?.sourceTool === "string" && artifact._meta.sourceTool.length > 0) return entry;
	const restoredArtifact = {
		...artifact,
		_meta: {
			...artifact._meta ?? {},
			sourceTool: "PresentFiles"
		}
	};
	return {
		...entry,
		artifact: restoredArtifact
	};
}
function normalizeProjectSandboxPreviewPath(path) {
	const normalized = path.trim().replace(/\\/g, "/").replace(/\/+/g, "/");
	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
function normalizeProjectSandboxPreviewRoot(root) {
	const normalized = (root || "/workspace").trim().replace(/\\/g, "/").replace(/\/+$/, "");
	if (!normalized) return "/workspace";
	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
function joinProjectSandboxPreviewRoot(root, relativePath) {
	return normalizeProjectSandboxPreviewPath(`${normalizeProjectSandboxPreviewRoot(root)}/${relativePath.replace(/^\/+/, "")}`);
}
/**
* 将 project 会话产物 URL（agent:// 各种形态 / sandbox 绝对路径）解析为 sandbox
* 内的文件绝对路径。解析不出已知格式时返回 undefined，调用方原样透传 URL。
*/
function resolveProjectSandboxPreviewFilePath(url, root) {
	if (url.startsWith("agent:///")) return normalizeProjectSandboxPreviewPath(url.slice(8));
	if (url.startsWith("agent://files/")) {
		const rawPath = url.slice(14);
		if (!rawPath) return;
		if (rawPath.startsWith("/")) return normalizeProjectSandboxPreviewPath(rawPath);
		if (rawPath === "workspace" || rawPath.startsWith("workspace/")) return normalizeProjectSandboxPreviewPath(`/${rawPath}`);
		return joinProjectSandboxPreviewRoot(root, rawPath);
	}
	if (url.startsWith("agent://files")) {
		const rawPath = url.slice(13).replace(/^\/+/, "");
		if (!rawPath) return;
		return joinProjectSandboxPreviewRoot(root, rawPath);
	}
	if (url.startsWith("/workspace/")) return normalizeProjectSandboxPreviewPath(url);
}
/** 把 sandbox 绝对路径转成 sandbox-preview 代理 URL 的相对段（去掉前导 /）。 */
function toProjectSandboxPreviewProxyPath(filePath) {
	return normalizeProjectSandboxPreviewPath(filePath).replace(/^\/+/, "");
}
var EventChannel, ProjectChatService;
var init_project_chat_service = __esmMin((() => {
	init_common$1();
	init_file_tree_utils();
	init_netdrive_attachments();
	init_cloud_sandbox_telemetry();
	init_collab_cloud_e2b_filesystem();
	init_strip_injected_context();
	EventChannel = class {
		buffer = [];
		waiter = null;
		closed = false;
		push(notification) {
			if (this.closed) return;
			if (this.waiter) {
				const w = this.waiter;
				this.waiter = null;
				w(notification);
			} else this.buffer.push(notification);
		}
		/** Wait for next notification (or null if channel is closed). */
		next() {
			if (this.buffer.length > 0) return Promise.resolve(this.buffer.shift());
			if (this.closed) return Promise.resolve(null);
			return new Promise((resolve) => {
				this.waiter = resolve;
			});
		}
		/** Drain any buffered items without waiting. */
		drain() {
			const items = this.buffer;
			this.buffer = [];
			return items;
		}
		/** Close the channel, unblocking any pending waiter. */
		close() {
			this.closed = true;
			this.buffer = [];
			if (this.waiter) {
				const w = this.waiter;
				this.waiter = null;
				w(null);
			}
		}
		/** Check if the channel has been closed. */
		isClosed() {
			return this.closed;
		}
	};
	ProjectChatService = class ProjectChatService {
		static SAMPLED_CHUNK_UPDATES = new Set([
			"agent_message_chunk",
			"agent_thought_chunk",
			"user_message_chunk"
		]);
		static CHUNK_SAMPLE_EVERY = 20;
		static TURN_END_UPDATES = new Set(["session_end_turn"]);
		taskOps;
		logWriter;
		filesystemFactory;
		netdriveRootResolver;
		cloudSandboxTelemetry;
		sandboxPreviewRegisterMount;
		connections = /* @__PURE__ */ new Map();
		filesystems = /* @__PURE__ */ new Map();
		chunkSamples = /* @__PURE__ */ new Map();
		connecting = /* @__PURE__ */ new Map();
		pendingConnect = /* @__PURE__ */ new Map();
		refCount = /* @__PURE__ */ new Map();
		disconnectTimers = /* @__PURE__ */ new Map();
		/**
		* 正在进行中的 prompt 计数（按 conversationId 分桶）。
		*
		* 背景（issue：sandbox queue 卡死在 paused 状态）：
		* 渲染端 `useChatMessages` 切对话/卸载时会调用 `disconnect()`，过去 grace=0
		* 会立即 tearDown → `connection.disconnect()` → SSE abort，把仍在 streaming
		* 的 prompt 强行中断；sandbox 侧任务队列因此停留在 paused，后续 immediate
		* 都会被 HTTP 409 code=11017 拒绝（"queue is paused, immediate operation rejected"）。
		*
		* 解法：sendPrompt 入口 +1，prompt 完成/失败 -1；disconnect/tearDown 入口
		* 检测到 inflight>0 时不立即拆连接，而是把 tearDown defer 到 prompt 真正结束。
		*/
		inflightPrompts = /* @__PURE__ */ new Map();
		/** 因 inflight 而被推迟的 tearDown 唤醒回调（finally 中触发） */
		pendingTearDownAfterInflight = /* @__PURE__ */ new Map();
		/**
		* resolveSessionId 的 in-flight 缓存。
		*
		* 目的：让 UI 能在 ACP `connect()` 真正握手之前**先**拿到 sessionId，
		* 把"GET /console/as/conversations/{id}/session"和"建立 ACP 连接 + loadSession"
		* 解耦。网盘历史预加载只需要 sessionId（CA2 的 runtime_id），不依赖 ACP 连接，
		* 因此可以与 connect() 真正并发竞速首屏（对齐 task/xxx 路由的语义）。
		*
		* 内部约定：
		* - 同一 conversationId 在 in-flight 期间只发一次 GET，多个调用方共用 Promise；
		* - connectToTask 从这里命中复用 TaskSessionInfo，避免重复 HTTP；
		* - 命中已有 ActiveChatConnection 时直接走那条捷径（不再发 GET）；
		* - GET 失败时立即清缓存，下次重试。
		*/
		pendingSessionInfo = /* @__PURE__ */ new Map();
		/**
		* #57806: 正在预热的连接 Promise。点击命中时直接 join 并提升为正式连接，
		* 避免重复 ACP connect/loadSession；未点击的连接在 TTL 后释放。
		*/
		prewarming = /* @__PURE__ */ new Map();
		prewarmExpiryTimers = /* @__PURE__ */ new Map();
		static PREWARM_TTL_MS = 12e4;
		constructor(deps) {
			this.taskOps = deps.taskOps;
			this.logWriter = deps.logWriter;
			this.filesystemFactory = deps.filesystemFactory;
			this.netdriveRootResolver = deps.netdriveRootResolver;
			this.cloudSandboxTelemetry = new CloudSandboxTelemetryObserver(deps.cloudSandboxTelemetry);
			this.sandboxPreviewRegisterMount = deps.sandboxPreviewRegisterMount;
		}
		createFallbackRequestId() {
			return `project_prompt_${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
		}
		getTelemetryBaseFields(projectId, conversationId, sessionId, sandboxId, requestId) {
			return {
				projectId,
				conversationId,
				sessionId,
				sandboxId,
				requestId
			};
		}
		getTelemetryActiveFields(active, requestId) {
			return this.getTelemetryBaseFields(active.projectId, void 0, active.sessionId, active.sandboxId, requestId);
		}
		logPath(projectId, sessionId, file) {
			return `${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}/teams-${projectId}/${sessionId}/${file}`;
		}
		/** 高频 tag（每条 SSE chunk 一次），只落盘不打 console */
		static QUIET_TAGS = new Set([
			"stream:notification",
			"historyRaw:notification",
			"history:notification",
			"rawStream:notification",
			"subscribe:notification"
		]);
		log(projectId, sessionId, tag, data) {
			this.maybeFlushSamplesOnTurnEnd(projectId, sessionId, data);
			const sampled = sessionId ? this.takeSampleDecision(sessionId, data) : void 0;
			if (sampled === "drop") return;
			const payload = typeof data === "string" ? data : JSON.stringify(data);
			if (!ProjectChatService.QUIET_TAGS.has(tag)) console.log(`[ProjectChatService] [${tag}]`, payload);
			if (!this.logWriter || !sessionId) return;
			const pid = projectId || "no-project";
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			const line = `${sampled?.kind === "summary" ? `[${ts}] [${tag}:sampled count=${sampled.count} totalChars=${sampled.totalChars}]` : `[${ts}] [${tag}]`} ${payload}\n`;
			try {
				this.logWriter.append(this.logPath(pid, sessionId, "chat.log"), line);
			} catch {}
		}
		maybeFlushSamplesOnTurnEnd(projectId, sessionId, data) {
			if (!sessionId || this.chunkSamples.size === 0 || !this.logWriter) return;
			const sessionUpdate = data?.update?.sessionUpdate;
			if (!sessionUpdate || !ProjectChatService.TURN_END_UPDATES.has(sessionUpdate)) return;
			const prefix = `${sessionId}::`;
			const pid = projectId || "no-project";
			const path = this.logPath(pid, sessionId, "chat.log");
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			for (const key of Array.from(this.chunkSamples.keys())) {
				if (!key.startsWith(prefix)) continue;
				const state = this.chunkSamples.get(key);
				this.chunkSamples.delete(key);
				if (state.count % ProjectChatService.CHUNK_SAMPLE_EVERY === 0) continue;
				const line = `[${ts}] [chunkSample:final update=${key.split("::")[2] ?? "unknown"} count=${state.count} totalChars=${state.totalChars}]\n`;
				try {
					this.logWriter.append(path, line);
				} catch {}
			}
		}
		takeSampleDecision(sessionId, data) {
			const update = data?.update;
			const sessionUpdate = update?.sessionUpdate;
			if (!sessionUpdate || !ProjectChatService.SAMPLED_CHUNK_UPDATES.has(sessionUpdate)) return;
			const chunkText = typeof update?.content?.text === "string" ? update.content.text : "";
			const key = `${sessionId}::${data?._meta?.["codebuddy.ai"]?.requestId ?? update?._meta?.["codebuddy.ai"]?.requestId ?? "no-req"}::${sessionUpdate}`;
			let state = this.chunkSamples.get(key);
			if (!state) {
				state = {
					count: 1,
					totalChars: chunkText.length
				};
				this.chunkSamples.set(key, state);
				return;
			}
			state.count += 1;
			state.totalChars += chunkText.length;
			if (state.count % ProjectChatService.CHUNK_SAMPLE_EVERY === 0) return {
				kind: "summary",
				count: state.count,
				totalChars: state.totalChars
			};
			return "drop";
		}
		/** Log to file_attachment.log for filesystem operations */
		logFs(conversationId, tag, data) {
			const conn = this.connections.get(conversationId);
			const payload = typeof data === "string" ? data : JSON.stringify(data);
			console.log(`[ProjectChatService:fs] [${tag}]`, payload);
			if (!this.logWriter) return;
			const pid = conn?.projectId || "no-project";
			const sessionId = conn?.sessionId || conversationId;
			const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [${tag}] ${payload}\n`;
			try {
				this.logWriter.append(this.logPath(pid, sessionId, "file_attachment.log"), line);
			} catch {}
		}
		/**
		* 解析项目网盘 root（projectId → { fileId, dirName }）。
		*
		* issue #54923：Web 端发消息走 resolveMessage 链路（POST /console/as/message/resolve），
		* 该接口需要调用方显式带上 `tdrive_root_id` / `tdrive_root_dir_name` 才会在响应里
		* 注入 `<tdrive-root />`。sendPrompt 内部的 ensureProjectNetdriveRoot 只在「不经过
		* resolveMessage 的兜底发送」时生效，resolveMessage 走的是另一条链路，故需要把同一份
		* root 解析能力暴露出来，让 resolveAndSendPrompt 在调 resolveMessage 前先拿到 root。
		*
		* resolver 未注入或解析失败（未登录 / 接口异常 / 项目未配置网盘）时返回 undefined，
		* 调用方据此安全降级为不传 tdrive_root_id —— 行为与修复前一致，不退化。
		*/
		async resolveProjectNetdriveRoot(projectId) {
			if (!projectId || !this.netdriveRootResolver) return;
			try {
				const root = await this.netdriveRootResolver(projectId);
				return root?.fileId ? root : void 0;
			} catch {
				return;
			}
		}
		async ensureProjectNetdriveRoot(prompt, _projectId) {
			return prompt;
		}
		/**
		* Send a prompt in a project task conversation.
		* If conversationId is not provided, creates a new task conversation first.
		*
		* Returns both `rawStream` (raw SessionNotifications for ACPMessageAccumulator)
		* and `stream` (parsed ProjectChatChunk for simple text-only consumption).
		* NOTE: Only ONE of `rawStream` or `stream` should be consumed — they share the same event channel.
		*/
		async sendPrompt(params) {
			const { projectId, prompt, model, tags, modeId, language, displayBlocks } = params;
			const requestId = params.requestId || this.createFallbackRequestId();
			let { conversationId } = params;
			let promptText = typeof prompt === "string" ? stripInjectedContext(prompt) : stripInjectedContext(prompt.filter((b) => b.type === "text").map((b) => b.text || "").join("\n"));
			if (!promptText.trim() && typeof prompt !== "string") {
				const resourceBlock = prompt.find((b) => b.type === "resource_link");
				if (resourceBlock) promptText = resourceBlock.name || resourceBlock.title || "";
			}
			this.log(projectId, conversationId ?? "new", "sendPrompt", {
				projectId,
				conversationId,
				model,
				tags
			});
			if (!conversationId) {
				const createParams = {
					projectId,
					prompt: promptText.slice(0, 100),
					model,
					tags
				};
				this.log(projectId, "new", "createTask:req", createParams);
				try {
					const result = await this.taskOps.createTask(createParams);
					conversationId = result.id;
					this.log(projectId, conversationId, "createTask:res", result);
				} catch (err) {
					this.log(projectId, "new", "createTask:ERROR", {
						message: err?.message,
						stack: err?.stack
					});
					throw err;
				}
			}
			let active = this.connections.get(conversationId);
			if (!active) try {
				active = await this.openConnection(conversationId, "create", projectId);
			} catch (err) {
				this.log(projectId, conversationId, "connectToTask:ERROR", {
					message: err?.message,
					stack: err?.stack
				});
				throw err;
			}
			if (modeId) {
				this.log(projectId, active.sessionId, "acp:setMode", {
					modeId,
					reason: "sendPrompt"
				});
				try {
					await active.connection.setSessionMode(active.sessionId, modeId);
				} catch (err) {
					this.log(projectId, active.sessionId, "acp:setMode:error", {
						modeId,
						message: err?.message
					});
					throw err;
				}
				active.currentModeId = modeId;
				if (active.initialModes) active.initialModes = {
					...active.initialModes,
					currentModeId: modeId
				};
				this.log(projectId, active.sessionId, "acp:setMode:done", "ok");
			}
			if (model) {
				this.log(projectId, active.sessionId, "acp:setModel", {
					model,
					reason: "sendPrompt"
				});
				try {
					await active.connection.setSessionModel(active.sessionId, model);
					this.log(projectId, active.sessionId, "acp:setModel:done", "ok");
					if (active.initialModels) active.initialModels = {
						...active.initialModels,
						currentModelId: model
					};
					else active.initialModels = {
						currentModelId: model,
						availableModels: []
					};
				} catch (err) {
					this.log(projectId, active.sessionId, "acp:setModel:warn", { message: err?.message });
				}
			}
			if (language && typeof active.connection.setSessionConfigOption === "function") {
				this.log(projectId, active.sessionId, "acp:setLanguage", {
					language,
					reason: "sendPrompt"
				});
				try {
					await active.connection.setSessionConfigOption(active.sessionId, "language", language);
					this.log(projectId, active.sessionId, "acp:setLanguage:done", "ok");
				} catch (err) {
					this.log(projectId, active.sessionId, "acp:setLanguage:warn", { message: err?.message });
				}
			}
			const { connection, sessionId, eventChannel } = active;
			const promptParams = {
				content: injectNetDriveAttachments(await this.ensureProjectNetdriveRoot(prompt, projectId)),
				_meta: { "codebuddy.ai": {
					...projectId ? { projectId } : {},
					...language ? {
						language,
						locale: language
					} : {},
					requestId,
					...Array.isArray(displayBlocks) && displayBlocks.length > 0 ? { extra: { sourceContentBlocks: displayBlocks } } : {}
				} }
			};
			this.log(projectId, sessionId, "prompt:start", {
				conversationId,
				model,
				requestId
			});
			this.incInflightPrompt(conversationId);
			let promptDone = false;
			const promptStartedAt = Date.now();
			this.cloudSandboxTelemetry.promptSubmit({
				...this.getTelemetryActiveFields(active, requestId),
				conversationId,
				mode: modeId ?? active.currentModeId,
				model: model ?? active.initialModels?.currentModelId
			});
			const promptPromise = connection.prompt(sessionId, promptParams);
			const baseFields = this.getTelemetryActiveFields(active, requestId);
			const promptCompleted = promptPromise.then(() => {
				this.log(projectId, sessionId, "prompt:resolved", "ok");
				promptDone = true;
				this.cloudSandboxTelemetry.promptComplete({
					...baseFields,
					conversationId,
					outcome: "success",
					duration_ms: cloudSandboxDurationSince(promptStartedAt)
				});
			}, (err) => {
				promptDone = true;
				this.log(projectId, sessionId, "prompt:error", { message: err?.message });
				this.cloudSandboxTelemetry.promptComplete({
					...baseFields,
					conversationId,
					outcome: "failed",
					duration_ms: cloudSandboxDurationSince(promptStartedAt)
				}, err);
				throw err;
			}).finally(() => {
				this.decInflightPrompt(conversationId);
			});
			const innerRawStream = this.buildRawStream(eventChannel, () => promptDone, 200, projectId, sessionId, conversationId);
			let firstChunkEmitted = false;
			const telemetryRef = this.cloudSandboxTelemetry;
			const rawStream = { [Symbol.asyncIterator]() {
				const inner = innerRawStream[Symbol.asyncIterator]();
				return {
					async next() {
						const result = await inner.next();
						if (!result.done && !firstChunkEmitted) {
							const updateType = result.value.update?.sessionUpdate;
							if (updateType === "agent_message_chunk" || updateType === "agent_thought_chunk") {
								firstChunkEmitted = true;
								telemetryRef.promptFirstChunk({
									...baseFields,
									conversationId,
									duration_ms: cloudSandboxDurationSince(promptStartedAt),
									chunk_type: updateType
								});
							}
						}
						return result;
					},
					return() {
						return inner.return?.() ?? Promise.resolve({
							value: void 0,
							done: true
						});
					}
				};
			} };
			const stream = this.parseStream(rawStream, projectId, sessionId);
			return {
				conversationId,
				sessionId,
				stream,
				rawStream,
				events: active.artifactEvents,
				promptCompleted,
				requestId
			};
		}
		/**
		* 仅解析 sessionId（GET /console/as/conversations/{id}/session），不建 ACP 连接。
		*
		* 用于把"拿 sessionId"和"建立 ACP 连接 + loadSession"解耦：
		* - 网盘历史预加载（CA2 download）只需要 sessionId 即可定位 runtime 目录，
		*   把它从 connect() 后的 fire-and-forget 提前到 connect() 之前发起，
		*   就能与 ACP 握手 + loadSession 真正并发竞速首屏（对齐 task/xxx 路由）。
		* - 命中点：
		*   1) 已有 ActiveChatConnection → 直接返回 sessionId（零网络）；
		*   2) in-flight 的 GET → join 同一个 Promise；
		*   3) 否则发新 GET，结果缓存到 pendingSessionInfo，让随后真正的 connect()
		*      内部 connectToTask 也走同一份 sessionInfo，不再重发请求。
		* - 失败时清缓存，下次自动重试。
		*/
		async resolveSessionId(conversationId, projectId) {
			return (await this.fetchSessionInfo(conversationId, projectId)).sessionId || conversationId;
		}
		/**
		* 内部：拿到 TaskSessionInfo（sessionId/link/cwd/sandboxId/token），带 in-flight 去重。
		*/
		async fetchSessionInfo(conversationId, projectId) {
			const existing = this.connections.get(conversationId);
			if (existing) return {
				sessionId: existing.sessionId,
				link: existing.endpoint,
				cwd: existing.cwd,
				sandboxId: existing.sandboxId,
				token: existing.token
			};
			const pending = this.pendingSessionInfo.get(conversationId);
			if (pending) {
				this.log(projectId, conversationId, "resolveSessionId:joinPending", {});
				return pending;
			}
			this.log(projectId, conversationId, "resolveSessionId:fetch", {});
			const work = this.taskOps.connectTask(conversationId).then((info) => {
				this.log(projectId, conversationId, "resolveSessionId:res", {
					sessionId: info.sessionId,
					sandboxId: info.sandboxId
				});
				return info;
			}).catch((err) => {
				this.pendingSessionInfo.delete(conversationId);
				this.log(projectId, conversationId, "resolveSessionId:error", { message: err?.message });
				throw err;
			});
			this.pendingSessionInfo.set(conversationId, work);
			return work;
		}
		/**
		* #57806: 预热任务连接——在用户真正进入任务前（focus/hover/click），提前建一条
		* 临时连接并跑一次 loadSession，把 sandbox agent 侧的 session 加载进内存缓存。
		*
		* 背景：实测「首次切到自动化任务」慢在后端 loadSession（冷启动 5-10s，agent 侧要从
		* JSONL 反序列化累积的长历史）；一旦 agent 内存里有了 session（热），后续全新连接的
		* loadSession 只要 ~0.75s。agent 侧缓存跨客户端连接保留（reuseActiveConnection 全程
		* 不命中，每次切换都是全新连接，但热态 loadSession 仍快 → 证明热在 agent 侧）。
		*
		* 实现：connectToTask('load') 提前完成 ACP connect/loadSession 并暂存连接；用户点击时
		* connect() join/提升该连接，直接消费 eventChannel 中的历史。未点击则 2min 后释放。
		* 幂等：已连接/正连/正预热则跳过。失败静默（connect() 会走标准路径重试）。
		*/
		prewarmConnect(conversationId, projectId) {
			if (this.connections.has(conversationId) || this.pendingSessionInfo.has(conversationId) || this.pendingConnect.has(conversationId) || this.connecting.has(conversationId) || this.prewarming.has(conversationId)) return;
			const work = this.connectToTask(conversationId, "load", projectId).then((active) => {
				this.log(projectId, conversationId, "prewarm:warmed", { sessionId: active.sessionId });
				const timer = setTimeout(() => {
					this.prewarmExpiryTimers.delete(conversationId);
					if ((this.refCount.get(conversationId) ?? 0) > 0 || this.connections.get(conversationId) !== active) return;
					this.connections.delete(conversationId);
					try {
						active.eventChannel.close();
					} catch {}
					try {
						active.connection.removeAllListeners();
					} catch {}
					active.connection.disconnect().catch(() => {});
					this.log(projectId, conversationId, "prewarm:expired", { sessionId: active.sessionId });
				}, ProjectChatService.PREWARM_TTL_MS);
				this.prewarmExpiryTimers.set(conversationId, timer);
				return active;
			}).finally(() => {
				this.prewarming.delete(conversationId);
			});
			this.prewarming.set(conversationId, work);
			work.catch((err) => {
				this.log(projectId, conversationId, "prewarm:failed", { message: err?.message });
			});
		}
		/**
		* Connect to an existing conversation and load history.
		* Returns both raw notification stream and parsed chunk stream.
		* NOTE: Only ONE of `rawStream` or `stream` should be consumed — they share the same event channel.
		*/
		async connect(conversationId, projectId) {
			const wasReleasedInGrace = this.cancelPendingDisconnect(conversationId);
			const newCount = (this.refCount.get(conversationId) ?? 0) + 1;
			this.refCount.set(conversationId, newCount);
			this.log(projectId, conversationId, "connect:enter", {
				connectionCount: this.connections.size,
				hasExisting: this.connections.has(conversationId),
				hasPending: this.pendingConnect.has(conversationId),
				refCount: newCount,
				wasReleasedInGrace
			});
			const prewarming = this.prewarming.get(conversationId);
			if (prewarming) {
				this.log(projectId, conversationId, "connect:joinPrewarm", {});
				try {
					const active = await prewarming;
					return this.promotePrewarmedConnection(conversationId, active);
				} catch {}
			}
			const prewarmed = this.connections.get(conversationId);
			if (prewarmed && this.prewarmExpiryTimers.has(conversationId)) return this.promotePrewarmedConnection(conversationId, prewarmed);
			if (this.connections.has(conversationId)) {
				if (!wasReleasedInGrace) return this.reuseActiveConnection(conversationId, newCount);
				await this.tearDownStaleConnection(conversationId, newCount);
			}
			const pending = this.pendingConnect.get(conversationId);
			if (pending) {
				this.log(projectId, conversationId, "connect:joinPending", { refCount: newCount });
				let result;
				try {
					result = await pending;
				} catch (err) {
					this.releaseRefCount(conversationId, "connect:joinPending:failed");
					throw err;
				}
				const emptyStream = (async function* () {})();
				return {
					sessionId: result.sessionId,
					stream: emptyStream,
					rawStream: emptyStream,
					events: result.events,
					currentModeId: result.currentModeId,
					currentModelId: result.currentModelId
				};
			}
			const guarded = (async () => {
				const active = await this.openConnection(conversationId, "connect-only", projectId);
				const { connection: conn, sessionId: sid, cwd: cwdVal } = active;
				this.log(active.projectId, sid, "acp:loadSession", {
					sessionId: sid,
					cwd: cwdVal
				});
				const loadStartedAt = Date.now();
				try {
					const loadResp = await conn.loadSession({
						sessionId: sid,
						cwd: cwdVal
					});
					active.initialModels = loadResp.models ?? void 0;
					active.initialModes = loadResp.modes ?? void 0;
					active.currentModeId = active.initialModes?.currentModeId;
					active.historyEndOffset = readHistoryEndOffset(loadResp);
					this.log(active.projectId, sid, "acp:loadSession:done", {
						currentModeId: active.currentModeId,
						currentModelId: active.initialModels?.currentModelId,
						historyEndOffset: active.historyEndOffset
					});
					this.cloudSandboxTelemetry.sessionReady({
						...this.getTelemetryActiveFields(active),
						conversationId,
						cold_start: true,
						reuse_type: active.reuseType ?? "new_connection",
						duration_ms: cloudSandboxDurationSince(loadStartedAt),
						session_mode: "connect-only"
					});
				} catch (error) {
					this.cloudSandboxTelemetry.sessionError({
						...this.getTelemetryActiveFields(active),
						conversationId,
						session_mode: "connect-only"
					}, error);
					this.connections.delete(conversationId);
					this.filesystems.delete(conversationId);
					try {
						active.eventChannel.close();
					} catch {}
					try {
						active.connection.removeAllListeners();
					} catch {}
					try {
						await active.connection.disconnect();
					} catch {}
					throw error;
				}
				return this.createHistoryConnectResult(conversationId, active);
			})().finally(() => {
				this.pendingConnect.delete(conversationId);
			});
			this.pendingConnect.set(conversationId, guarded);
			return guarded.catch((err) => {
				this.releaseRefCount(conversationId, "connect:work:failed");
				throw err;
			});
		}
		promotePrewarmedConnection(conversationId, active) {
			const timer = this.prewarmExpiryTimers.get(conversationId);
			if (timer) clearTimeout(timer);
			this.prewarmExpiryTimers.delete(conversationId);
			this.pendingSessionInfo.delete(conversationId);
			this.log(active.projectId, conversationId, "connect:promotePrewarm", { sessionId: active.sessionId });
			this.cloudSandboxTelemetry.sessionReady({
				...this.getTelemetryActiveFields(active),
				conversationId,
				cold_start: false,
				reuse_type: "active_connection"
			});
			return this.createHistoryConnectResult(conversationId, active);
		}
		createHistoryConnectResult(conversationId, active) {
			this.log(active.projectId, active.sessionId, "connect:history", { conversationId });
			const stream = this.collectHistory(active);
			const innerHistoryRaw = this.collectHistoryRaw(active);
			const historyStartedAt = Date.now();
			let historyMessageCount = 0;
			const historyTelemetry = this.cloudSandboxTelemetry;
			const historyBaseFields = this.getTelemetryActiveFields(active);
			const historyLog = this.log.bind(this);
			const rawStream = { async *[Symbol.asyncIterator]() {
				try {
					for await (const notification of innerHistoryRaw) {
						historyMessageCount++;
						yield notification;
					}
				} finally {
					historyTelemetry.sessionHistoryLoaded({
						...historyBaseFields,
						conversationId,
						duration_ms: cloudSandboxDurationSince(historyStartedAt),
						message_count: historyMessageCount
					});
					historyLog(active.projectId, active.sessionId, "connect:history_loaded", {
						conversationId,
						duration_ms: cloudSandboxDurationSince(historyStartedAt),
						message_count: historyMessageCount
					});
				}
			} };
			return {
				sessionId: active.sessionId,
				stream,
				rawStream,
				events: active.artifactEvents,
				currentModeId: active.currentModeId,
				currentModelId: active.initialModels?.currentModelId
			};
		}
		reuseActiveConnection(conversationId, refCount) {
			const existing = this.connections.get(conversationId);
			this.log(existing.projectId, conversationId, "connect", {
				msg: "already connected (handoff), returning empty",
				connectionCount: this.connections.size,
				refCount
			});
			this.cloudSandboxTelemetry.sessionReady({
				...this.getTelemetryActiveFields(existing),
				conversationId,
				cold_start: false,
				reuse_type: "active_connection"
			});
			const emptyStream = (async function* () {})();
			return {
				sessionId: existing.sessionId,
				stream: emptyStream,
				rawStream: emptyStream,
				events: existing.artifactEvents,
				currentModeId: existing.currentModeId,
				currentModelId: existing.initialModels?.currentModelId
			};
		}
		async tearDownStaleConnection(conversationId, refCount) {
			const existing = this.connections.get(conversationId);
			this.log(existing.projectId, conversationId, "connect:rebuildReleased", {
				msg: "reconnect within grace, tearing down stale connection to reload history",
				connectionCount: this.connections.size,
				refCount
			});
			this.cloudSandboxTelemetry.sessionClose({
				...this.getTelemetryActiveFields(existing),
				conversationId,
				close_reason: "rebuild_stale_connection"
			});
			this.connections.delete(conversationId);
			this.filesystems.delete(conversationId);
			try {
				existing.eventChannel.close();
			} catch (e) {
				this.log(existing.projectId, existing.sessionId, "connect:rebuild:eventChannel.close:ERROR", { message: e?.message });
			}
			try {
				existing.connection.removeAllListeners();
			} catch (e) {
				this.log(existing.projectId, existing.sessionId, "connect:rebuild:removeAllListeners:ERROR", { message: e?.message });
			}
			try {
				await existing.connection.disconnect();
			} catch {}
		}
		releaseRefCount(conversationId, reason) {
			const current = this.refCount.get(conversationId) ?? 0;
			if (current <= 1) this.refCount.delete(conversationId);
			else this.refCount.set(conversationId, current - 1);
			this.log(void 0, conversationId, "refCount:release", {
				reason,
				before: current,
				after: Math.max(0, current - 1)
			});
		}
		cancelPendingDisconnect(conversationId) {
			const timer = this.disconnectTimers.get(conversationId);
			if (!timer) return false;
			clearTimeout(timer);
			this.disconnectTimers.delete(conversationId);
			this.log(void 0, conversationId, "disconnect:cancelled", { reason: "reconnect-within-grace" });
			return true;
		}
		incInflightPrompt(conversationId) {
			const next = (this.inflightPrompts.get(conversationId) ?? 0) + 1;
			this.inflightPrompts.set(conversationId, next);
			this.log(void 0, conversationId, "inflight:inc", { inflight: next });
		}
		decInflightPrompt(conversationId) {
			const current = this.inflightPrompts.get(conversationId) ?? 0;
			const next = Math.max(0, current - 1);
			if (next === 0) this.inflightPrompts.delete(conversationId);
			else this.inflightPrompts.set(conversationId, next);
			this.log(void 0, conversationId, "inflight:dec", { inflight: next });
			if (next === 0) {
				const waiter = this.pendingTearDownAfterInflight.get(conversationId);
				if (waiter) {
					this.pendingTearDownAfterInflight.delete(conversationId);
					this.log(void 0, conversationId, "tearDown:resumeAfterInflight", {});
					waiter();
				}
			}
		}
		isInflight(conversationId) {
			return (this.inflightPrompts.get(conversationId) ?? 0) > 0;
		}
		/**
		* Disconnect and clean up a task conversation connection.
		*
		* Grace 期：默认 0（沿用原行为，由渲染端的 useDeferredUnmount 100ms 兜底）。
		* 但若 sendPrompt 正在 streaming（inflight>0），即使 grace 走完也不会立刻
		* tearDown，而是注册到 pendingTearDownAfterInflight，等 promptCompleted.finally
		* 唤醒，避免把仍在响应的 SSE 流强行 abort 把 sandbox 队列卡在 paused。
		*/
		static DISCONNECT_GRACE_MS = 0;
		async disconnect(conversationId) {
			const current = this.refCount.get(conversationId) ?? 0;
			if (current > 1) {
				const next = current - 1;
				this.refCount.set(conversationId, next);
				this.log(void 0, conversationId, "disconnect:refDec", { refCount: next });
				return;
			}
			this.refCount.delete(conversationId);
			if (this.disconnectTimers.has(conversationId)) return;
			const delayMs = ProjectChatService.DISCONNECT_GRACE_MS;
			const inflight = this.inflightPrompts.get(conversationId) ?? 0;
			this.log(void 0, conversationId, "disconnect:scheduled", {
				delayMs,
				inflight
			});
			const timer = setTimeout(() => {
				this.disconnectTimers.delete(conversationId);
				if ((this.refCount.get(conversationId) ?? 0) >= 1) {
					this.log(void 0, conversationId, "disconnect:skipped", { reason: "reconnected-during-grace" });
					return;
				}
				this.runTearDownGuarded(conversationId);
			}, delayMs);
			this.disconnectTimers.set(conversationId, timer);
		}
		/**
		* 真正执行 tearDown 前的最后一道闸门：inflight 进行中就先挂起，
		* 等 decInflightPrompt 归零回调里再触发。期间若有人重新 connect（refCount>=1）
		* 就放弃 tearDown。
		*/
		runTearDownGuarded(conversationId) {
			if (!this.isInflight(conversationId)) {
				this.tearDown(conversationId).catch(() => {});
				return;
			}
			if (this.pendingTearDownAfterInflight.has(conversationId)) {
				this.log(void 0, conversationId, "tearDown:deferred:dedup", { inflight: this.inflightPrompts.get(conversationId) ?? 0 });
				return;
			}
			this.log(void 0, conversationId, "tearDown:deferred", {
				reason: "prompt-inflight",
				inflight: this.inflightPrompts.get(conversationId) ?? 0
			});
			this.pendingTearDownAfterInflight.set(conversationId, () => {
				if ((this.refCount.get(conversationId) ?? 0) >= 1) {
					this.log(void 0, conversationId, "tearDown:abortAfterInflight", { reason: "reconnected-during-inflight" });
					return;
				}
				this.tearDown(conversationId).catch(() => {});
			});
		}
		async tearDown(conversationId) {
			const pending = this.pendingConnect.get(conversationId);
			if (pending) {
				this.log(void 0, conversationId, "tearDown:awaitingPending", {});
				try {
					await pending;
				} catch {}
			} else {
				const inflight = this.connecting.get(conversationId);
				if (inflight) {
					this.log(void 0, conversationId, "tearDown:awaitingInflight", {});
					try {
						await inflight;
					} catch {}
				}
			}
			if ((this.refCount.get(conversationId) ?? 0) >= 1) {
				this.log(void 0, conversationId, "tearDown:abort", { reason: "reconnected" });
				return;
			}
			const active = this.connections.get(conversationId);
			if (!active) {
				this.log(void 0, conversationId, "tearDown:noActive", { conversationId });
				return;
			}
			this.log(active.projectId, active.sessionId, "disconnect", { conversationId });
			this.cloudSandboxTelemetry.sessionClose({
				...this.getTelemetryActiveFields(active),
				conversationId,
				close_reason: "disconnect"
			});
			this.connections.delete(conversationId);
			this.filesystems.delete(conversationId);
			try {
				active.eventChannel.close();
			} catch (e) {
				this.log(active.projectId, active.sessionId, "disconnect:eventChannel.close:ERROR", { message: e?.message });
			}
			try {
				active.connection.removeAllListeners();
			} catch (e) {
				this.log(active.projectId, active.sessionId, "disconnect:removeAllListeners:ERROR", { message: e?.message });
			}
			try {
				await active.connection.disconnect();
			} catch {}
		}
		/**
		* Subscribe to the persistent event channel for a connected conversation.
		* Returns an infinite AsyncIterable that yields notifications until the connection is closed.
		* Used by the UI to listen for queue-dispatched turns after the initial sendMessage completes.
		*/
		subscribe(conversationId) {
			const active = this.connections.get(conversationId);
			if (!active) return null;
			const { eventChannel, projectId, sessionId } = active;
			const log = this.log.bind(this);
			return { [Symbol.asyncIterator]() {
				return {
					async next() {
						const notification = await eventChannel.next();
						if (notification === null) return {
							value: void 0,
							done: true
						};
						log(projectId, sessionId, "subscribe:notification", notification);
						return {
							value: notification,
							done: false
						};
					},
					return() {
						return Promise.resolve({
							value: void 0,
							done: true
						});
					}
				};
			} };
		}
		/**
		* Disconnect all connections (cleanup).
		*/
		async disconnectAll() {
			const ids = Array.from(this.connections.keys());
			await Promise.all(ids.map((id) => this.disconnect(id)));
		}
		answerQuestion(conversationId, toolCallId, answers) {
			const active = this.connections.get(conversationId);
			if (!active) return false;
			return active.connection.answerQuestion(toolCallId, answers);
		}
		cancelQuestion(conversationId, toolCallId, reason) {
			const active = this.connections.get(conversationId);
			if (!active) return false;
			return active.connection.cancelQuestion(toolCallId, reason);
		}
		async cancel(conversationId) {
			const active = this.connections.get(conversationId);
			if (!active) return;
			this.log(active.projectId, active.sessionId, "cancel", { conversationId });
			await active.connection.cancel(active.sessionId);
		}
		async setModel(conversationId, modelId) {
			const active = this.connections.get(conversationId);
			if (!active) throw new Error(`[ProjectChatService] No active connection for conversation: ${conversationId}`);
			this.log(active.projectId, active.sessionId, "acp:setModel", {
				model: modelId,
				reason: "user-switch"
			});
			try {
				await active.connection.setSessionModel(active.sessionId, modelId);
				this.log(active.projectId, active.sessionId, "acp:setModel:done", "ok");
				if (active.initialModels) active.initialModels = {
					...active.initialModels,
					currentModelId: modelId
				};
				else active.initialModels = {
					currentModelId: modelId,
					availableModels: []
				};
			} catch (err) {
				this.log(active.projectId, active.sessionId, "acp:setModel:warn", { message: err?.message });
				throw err;
			}
		}
		async setMode(conversationId, modeId) {
			const active = this.connections.get(conversationId);
			if (!active) throw new Error(`[ProjectChatService] No active connection for conversation: ${conversationId}`);
			this.log(active.projectId, active.sessionId, "acp:setMode", {
				modeId,
				reason: "user-switch"
			});
			try {
				await active.connection.setSessionMode(active.sessionId, modeId);
				this.log(active.projectId, active.sessionId, "acp:setMode:done", "ok");
				active.currentModeId = modeId;
				if (active.initialModes) active.initialModes = {
					...active.initialModes,
					currentModeId: modeId
				};
			} catch (err) {
				this.log(active.projectId, active.sessionId, "acp:setMode:warn", { message: err?.message });
				throw err;
			}
		}
		switchExpert(conversationId, params) {
			return this.taskOps.switchExpert(conversationId, params);
		}
		getConversationDetail(conversationId) {
			return this.taskOps.getConversationDetail(conversationId);
		}
		setConversationStatus(conversationId, status) {
			this.log(void 0, conversationId, "setConversationStatus", {
				conversationId,
				status
			});
			return this.taskOps.setConversationStatus(conversationId, status);
		}
		getSandboxId(conversationId) {
			return this.connections.get(conversationId)?.sandboxId;
		}
		/**
		* 将项目会话产物 URL（agent:// 各种形态 / sandbox 绝对路径）解析为可在 Desktop
		* webview 中加载的 sandbox-preview 本地代理 URL（HTML 产物统一 Webview 预览方案）。
		*
		* 非 agent:// / 非 sandbox 绝对路径的 URL 原样透传；无活跃连接或未注入
		* `sandboxPreviewRegisterMount` 时也原样透传（调用方据此判断是否走旧路径）。
		*/
		async resolvePreviewUrl(conversationId, url) {
			if (!url.startsWith("agent://") && !url.startsWith("/workspace/")) return url;
			const active = this.connections.get(conversationId) ?? Array.from(this.connections.values()).find((connection) => connection.sessionId === conversationId);
			if (!active || !this.sandboxPreviewRegisterMount) {
				this.log(active?.projectId, conversationId, "sandboxPreview:skip", {
					hasConnection: !!active,
					hasRegistrar: !!this.sandboxPreviewRegisterMount
				});
				return url;
			}
			const filePath = resolveProjectSandboxPreviewFilePath(url, active.cwd || "/workspace");
			if (!filePath) {
				this.log(active.projectId, conversationId, "sandboxPreview:unknownUrl", { url: url.slice(0, 120) });
				return url;
			}
			try {
				const result = await this.sandboxPreviewRegisterMount({
					source: "project",
					sessionId: active.sessionId,
					sandbox: {
						link: active.endpoint,
						token: active.token,
						sandboxId: active.sandboxId
					},
					root: "/"
				});
				const previewUrl = result.baseUrl + encodeURI(toProjectSandboxPreviewProxyPath(filePath));
				this.log(active.projectId, conversationId, "sandboxPreview:resolved", {
					filePath,
					previewUrl,
					mountId: result.mountId
				});
				return previewUrl;
			} catch (err) {
				this.log(active.projectId, conversationId, "sandboxPreview:error", { message: err?.message });
				return url;
			}
		}
		/**
		* 主动拉取会话累积的全部产物列表。
		* 通过 sandbox-proxy 的 GET /api/session/artifacts?sessionId=xxx 接口获取。
		*
		* 历史回放兜底（与 CloudAgentColleagueService.listSessionArtifacts 同源问题）：
		* sandbox-proxy 的 Go `types.Artifact` 没有 `_meta` 字段，REST 反序列化时
		* 会把 `_meta.sourceTool` 抹掉。但 `ArtifactSlotPanel.getArtifactAndMedia`
		* 又只显示 `sourceTool === 'PresentFiles'` 的 media，两者叠加导致 web 端
		* 任务对话历史产物卡片全部不可见（desktop 走 watcher/checkpoint + 实时
		* ACP `_codebuddy.ai/artifact` 事件原生带 `_meta`，不受影响）。
		*
		* sandbox 内的 media artifact 都来自 agent-cli 的 `present_files` 工具调用，
		* 因此对缺失 `_meta.sourceTool` 的 type === 'media' entry 兜底标记为
		* 'PresentFiles'，让历史回放与实时事件落到下游时形状一致。
		*/
		async listSessionArtifacts(conversationId) {
			const conn = this.connections.get(conversationId);
			if (!conn) {
				this.log("", conversationId, "listSessionArtifacts:noConn", { conversationId });
				return [];
			}
			const { endpoint, token, sessionId } = conn;
			const startedAt = Date.now();
			const url = `${endpoint.replace(/\/acp\/?$/, "").replace(/\/+$/, "")}/api/session/artifacts?sessionId=${encodeURIComponent(sessionId)}`;
			const baseFields = this.getTelemetryActiveFields(conn);
			try {
				const resp = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
				if (!resp.ok) {
					this.log(conn.projectId, sessionId, "listSessionArtifacts:httpError", { status: resp.status });
					this.cloudSandboxTelemetry.artifactSync({
						...baseFields,
						conversationId,
						outcome: "failed",
						duration_ms: cloudSandboxDurationSince(startedAt),
						error_kind: "http",
						error_code: `HTTP_${resp.status}`
					});
					return [];
				}
				const entries = ((await resp.json())?.data?.artifacts ?? []).map(restoreSourceToolForMediaEntry);
				this.log(conn.projectId, sessionId, "listSessionArtifacts:ok", { count: entries.length });
				this.cloudSandboxTelemetry.artifactSync({
					...baseFields,
					conversationId,
					outcome: "success",
					duration_ms: cloudSandboxDurationSince(startedAt),
					artifact_count: Array.isArray(entries) ? entries.length : 0,
					artifact_types: Array.isArray(entries) ? summarizeArtifactTypes(entries) : "",
					sync_source: "compensation_fetch"
				});
				return entries;
			} catch (err) {
				this.log(conn.projectId, sessionId, "listSessionArtifacts:ERROR", { message: err?.message });
				this.cloudSandboxTelemetry.artifactSync({
					...baseFields,
					conversationId,
					outcome: "failed",
					duration_ms: cloudSandboxDurationSince(startedAt)
				}, err);
				return [];
			}
		}
		/**
		* Get or create a FilesResource for the given conversation's sandbox.
		* Returns null if no active connection or no filesystem factory configured.
		*/
		async getFilesystem(conversationId) {
			const cached = this.filesystems.get(conversationId);
			if (cached) return cached;
			const conn = this.connections.get(conversationId);
			if (!conn) {
				this.logFs(conversationId, "getFilesystem:noConn", { conversationId });
				return null;
			}
			const startedAt = Date.now();
			if (this.filesystemFactory) {
				this.logFs(conversationId, "getFilesystem:factory", { sandboxId: conn.sandboxId });
				try {
					const fs = await this.filesystemFactory({
						sandboxId: conn.sandboxId,
						accessToken: conn.token
					});
					this.filesystems.set(conversationId, fs);
					this.cloudSandboxTelemetry.filesystemOutcome({
						...this.getTelemetryActiveFields(conn),
						conversationId,
						operation: "connect",
						outcome: "success",
						duration_ms: cloudSandboxDurationSince(startedAt),
						filesystem_source: "factory"
					});
					return fs;
				} catch (error) {
					this.cloudSandboxTelemetry.filesystemOutcome({
						...this.getTelemetryActiveFields(conn),
						conversationId,
						operation: "connect",
						outcome: "failed",
						duration_ms: cloudSandboxDurationSince(startedAt),
						filesystem_source: "factory"
					}, error);
					throw error;
				}
			}
			const domain = conn.endpoint.match(/https?:\/\/[^.]+\.(.+?)(?:\/|$)/)?.[1] || "e2b.dev";
			this.logFs(conversationId, "getFilesystem:connect", {
				sandboxId: conn.sandboxId,
				domain
			});
			try {
				const fs = CollabCloudE2BFilesystem.connect({
					sandboxId: conn.sandboxId,
					accessToken: conn.token,
					domain
				}, (tag, data) => this.logFs(conversationId, tag, data));
				this.filesystems.set(conversationId, fs);
				this.cloudSandboxTelemetry.filesystemOutcome({
					...this.getTelemetryActiveFields(conn),
					conversationId,
					operation: "connect",
					outcome: "success",
					duration_ms: cloudSandboxDurationSince(startedAt),
					filesystem_source: "default"
				});
				return fs;
			} catch (error) {
				this.cloudSandboxTelemetry.filesystemOutcome({
					...this.getTelemetryActiveFields(conn),
					conversationId,
					operation: "connect",
					outcome: "failed",
					duration_ms: cloudSandboxDurationSince(startedAt),
					filesystem_source: "default"
				}, error);
				throw error;
			}
		}
		async listDirectory(conversationId, path, depth) {
			const fs = await this.getFilesystem(conversationId);
			if (!fs) {
				this.logFs(conversationId, "listDirectory:noFs", { path });
				return [];
			}
			try {
				return convertEntriesToTreeEntries(await fs.list(path, { depth: depth ?? 1 }), path, depth ?? 1);
			} catch (err) {
				this.logFs(conversationId, "listDirectory:error", {
					path,
					error: err.message,
					stack: err.stack?.slice(0, 500)
				});
				return [];
			}
		}
		async readFile(conversationId, path, format) {
			const fs = await this.getFilesystem(conversationId);
			if (!fs) return {
				success: false,
				error: "No active connection"
			};
			try {
				if (format === "bytes") return {
					success: true,
					content: await fs.read(path, { format: "bytes" })
				};
				return {
					success: true,
					content: await fs.read(path, { format: "text" })
				};
			} catch (err) {
				this.logFs(conversationId, "readFile:error", {
					path,
					error: err.message
				});
				return {
					success: false,
					error: err.message
				};
			}
		}
		/**
		* 覆盖式写入沙箱文件（用于 markdown 编辑器保存）。
		*
		* 失败时返回 `{ success: false, error }` 而不抛错，让 UI 侧统一展示 toast。
		*/
		async writeFile(conversationId, path, content) {
			const fs = await this.getFilesystem(conversationId);
			if (!fs) return {
				success: false,
				error: "No active connection"
			};
			try {
				await fs.write(path, content);
				return { success: true };
			} catch (err) {
				this.logFs(conversationId, "writeFile:error", {
					path,
					error: err.message
				});
				return {
					success: false,
					error: err.message
				};
			}
		}
		/**
		* 订阅沙箱内单个文件变更。
		*
		* 实现策略：
		* 1. envd 只支持目录粒度的 watcher，所以这里取 path 的父目录传给 fs.watchDir；
		* 2. 拿到事件后用文件名匹配过滤，只在 name 命中时调用 callback；
		* 3. fs.watchDir 是异步建立 watcher 的，但 useEffect cleanup 必须同步拿到 unsubscribe，
		*    所以这里立刻返回一个 stop 函数；如果 watcher 还没建立完就被取消，
		*    `stopped` 标志位会让后续 .then 里的 handle.stop() 自动收尾，
		*    模式参照 workbuddy-agent-adapter-next.ts:21952 的本地 fileWatchSubscribe。
		*/
		subscribeFileChange(conversationId, path, callback) {
			const lastSlash = path.lastIndexOf("/");
			const dir = lastSlash > 0 ? path.substring(0, lastSlash) : "/";
			const fileName = lastSlash >= 0 ? path.substring(lastSlash + 1) : path;
			if (!fileName) {
				this.logFs(conversationId, "subscribeFileChange:noFileName", { path });
				return () => {};
			}
			let stopped = false;
			let handle;
			this.logFs(conversationId, "subscribeFileChange:begin", {
				path,
				dir,
				fileName
			});
			(async () => {
				const fs = await this.getFilesystem(conversationId);
				if (!fs) {
					this.logFs(conversationId, "subscribeFileChange:noFs", { path });
					return;
				}
				if (stopped) return;
				try {
					const created = await fs.watchDir(dir, (event) => {
						if (stopped) return;
						if (event.name === fileName) try {
							callback();
						} catch (cbErr) {
							this.logFs(conversationId, "subscribeFileChange:callback_error", {
								path,
								error: cbErr.message
							});
						}
					}, { recursive: false });
					if (stopped) {
						try {
							await created.stop();
						} catch {}
						return;
					}
					handle = created;
					this.logFs(conversationId, "subscribeFileChange:ready", { path });
				} catch (err) {
					this.logFs(conversationId, "subscribeFileChange:create_error", {
						path,
						error: err.message
					});
				}
			})();
			return () => {
				if (stopped) return;
				stopped = true;
				this.logFs(conversationId, "subscribeFileChange:dispose", { path });
				if (handle) {
					handle.stop().catch((err) => {
						this.logFs(conversationId, "subscribeFileChange:stop_error", {
							path,
							error: err?.message
						});
					});
					handle = void 0;
				}
			};
		}
		async connectToTask(conversationId, sessionMode, projectId) {
			this.log(projectId, conversationId, "connectTask:req", {
				conversationId,
				sessionMode
			});
			const connectStartedAt = Date.now();
			const reuseType = this.pendingSessionInfo.has(conversationId) ? "cached_session_info" : "new_connection";
			this.cloudSandboxTelemetry.sessionConnectStart({
				projectId,
				conversationId,
				cold_start: true,
				reuse_type: reuseType,
				session_mode: sessionMode
			});
			const cached = this.pendingSessionInfo.get(conversationId);
			let sessionInfo;
			if (cached) {
				this.log(projectId, conversationId, "connectTask:reuseCachedSessionInfo", {});
				this.pendingSessionInfo.delete(conversationId);
				try {
					sessionInfo = await cached;
				} catch {
					sessionInfo = await this.taskOps.connectTask(conversationId);
				}
			} else sessionInfo = await this.taskOps.connectTask(conversationId);
			this.log(projectId, conversationId, "connectTask:res", {
				sessionId: sessionInfo.sessionId,
				link: sessionInfo.link,
				cwd: sessionInfo.cwd,
				sandboxId: sessionInfo.sandboxId
			});
			const endpoint = sessionInfo.link.replace(/^http:\/\//, "https://");
			const cwd = sessionInfo.cwd || "/workspace";
			const sessionId = sessionInfo.sessionId || conversationId;
			const connection = new CloudAgentConnection(sessionId, {
				endpoint,
				authToken: sessionInfo.token,
				headers: { "X-Teams-Mode": "true" }
			}, cwd);
			this.log(projectId, sessionId, "acp:connect", {
				endpoint,
				cwd
			});
			await connection.connect();
			this.log(projectId, sessionId, "acp:connected", "ok");
			const eventChannel = new EventChannel();
			connection.on("sessionUpdate", (notification) => {
				eventChannel.push(notification);
			});
			const artifactHandlers = /* @__PURE__ */ new Set();
			const checkpointHandlers = /* @__PURE__ */ new Set();
			let artifactBuffer = [];
			let checkpointBuffer = [];
			const emitArtifactSync = (artifactType, event) => {
				this.cloudSandboxTelemetry.artifactSync({
					projectId,
					conversationId,
					sessionId,
					sandboxId: sessionInfo.sandboxId,
					outcome: "success",
					artifact_count: 1,
					artifact_types: `${artifactType || "unknown"}:1`,
					artifact_event: event,
					sync_source: "live_event"
				});
			};
			connection.on("artifactCreated", (artifact) => {
				emitArtifactSync(String(artifact?.type ?? "unknown"), "created");
				if (artifactHandlers.size === 0 && artifactBuffer) artifactBuffer.push({
					artifact,
					event: "created"
				});
				for (const h of artifactHandlers) h(artifact, "created");
			});
			connection.on("artifactUpdated", (artifact) => {
				emitArtifactSync(String(artifact?.type ?? "unknown"), "updated");
				if (artifactHandlers.size === 0 && artifactBuffer) artifactBuffer.push({
					artifact,
					event: "updated"
				});
				for (const h of artifactHandlers) h(artifact, "updated");
			});
			connection.on("artifactDeleted", (artifact) => {
				emitArtifactSync(String(artifact?.type ?? "unknown"), "deleted");
				if (artifactHandlers.size === 0 && artifactBuffer) artifactBuffer.push({
					artifact,
					event: "deleted"
				});
				for (const h of artifactHandlers) h(artifact, "deleted");
			});
			connection.on("checkpointCreated", (checkpoint) => {
				emitArtifactSync("checkpoint", "checkpoint_created");
				if (checkpointHandlers.size === 0 && checkpointBuffer) checkpointBuffer.push({
					checkpoint,
					event: "created"
				});
				for (const h of checkpointHandlers) h(checkpoint, "created");
			});
			connection.on("checkpointUpdated", (checkpoint) => {
				emitArtifactSync("checkpoint", "checkpoint_updated");
				if (checkpointHandlers.size === 0 && checkpointBuffer) checkpointBuffer.push({
					checkpoint,
					event: "updated"
				});
				for (const h of checkpointHandlers) h(checkpoint, "updated");
			});
			const TEAMS_METHOD = "_codebuddy.ai/teams";
			const extNotificationHandlers = /* @__PURE__ */ new Set();
			const teamsHandlers = /* @__PURE__ */ new Set();
			connection.on("extNotification", ({ method, params }) => {
				for (const h of extNotificationHandlers) h(method, params);
				if (method === TEAMS_METHOD) for (const h of teamsHandlers) h(params);
				if (method === "session/endTurn") eventChannel.push({
					sessionId: params.sessionId,
					update: {
						sessionUpdate: "session_end_turn",
						_meta: { "codebuddy.ai": { stopReason: params.stopReason } }
					}
				});
			});
			const artifactEvents = {
				onArtifact(handler) {
					artifactHandlers.add(handler);
					if (artifactBuffer && artifactBuffer.length > 0) {
						const buffered = artifactBuffer;
						artifactBuffer = null;
						for (const entry of buffered) handler(entry.artifact, entry.event);
					} else artifactBuffer = null;
					return () => {
						artifactHandlers.delete(handler);
					};
				},
				onCheckpoint(handler) {
					checkpointHandlers.add(handler);
					if (checkpointBuffer && checkpointBuffer.length > 0) {
						const buffered = checkpointBuffer;
						checkpointBuffer = null;
						for (const entry of buffered) handler(entry.checkpoint, entry.event);
					} else checkpointBuffer = null;
					return () => {
						checkpointHandlers.delete(handler);
					};
				},
				onTeamsEvent(handler) {
					teamsHandlers.add(handler);
					return () => {
						teamsHandlers.delete(handler);
					};
				},
				onExtNotification(handler) {
					extNotificationHandlers.add(handler);
					return () => {
						extNotificationHandlers.delete(handler);
					};
				}
			};
			let initialModels;
			let initialModes;
			let historyEndOffset;
			if (sessionMode === "load") {
				this.log(projectId, sessionId, "acp:loadSession", {
					sessionId,
					cwd
				});
				const response = await connection.loadSession({
					sessionId,
					cwd
				});
				initialModels = response?.models ?? void 0;
				initialModes = response?.modes ?? void 0;
				historyEndOffset = response ? readHistoryEndOffset(response) : void 0;
				this.log(projectId, sessionId, "acp:loadSession:done", {
					currentModelId: initialModels?.currentModelId,
					currentModeId: initialModes?.currentModeId,
					historyEndOffset
				});
			} else if (sessionMode === "create") {
				this.log(projectId, sessionId, "acp:createSession", { cwd });
				const response = await connection.createSession({ cwd });
				initialModels = response?.models ?? void 0;
				initialModes = response?.modes ?? void 0;
				this.log(projectId, sessionId, "acp:createSession:done", {
					currentModelId: initialModels?.currentModelId,
					currentModeId: initialModes?.currentModeId
				});
			}
			const active = {
				conversationId,
				connection,
				sessionId,
				sandboxId: sessionInfo.sandboxId,
				endpoint,
				token: sessionInfo.token,
				cwd,
				projectId,
				initialModels,
				initialModes,
				currentModeId: initialModes?.currentModeId,
				reuseType,
				connectStartedAt,
				historyEndOffset,
				eventChannel,
				artifactEvents
			};
			this.connections.set(conversationId, active);
			return active;
		}
		async openConnection(conversationId, sessionMode, projectId) {
			const existingPending = this.connecting.get(conversationId);
			if (existingPending) {
				this.log(projectId, conversationId, "openConnection:joinPending", { sessionMode });
				return existingPending;
			}
			const pending = (async () => {
				try {
					const active = await this.connectToTask(conversationId, sessionMode, projectId);
					const stale = this.connections.get(conversationId);
					if (stale && stale !== active) {
						this.log(projectId, active.sessionId, "openConnection:disposeStale", { conversationId });
						this.cloudSandboxTelemetry.sessionClose({
							...this.getTelemetryActiveFields(stale),
							conversationId,
							close_reason: "replace_stale_connection"
						});
						try {
							stale.eventChannel.close();
						} catch {}
						try {
							stale.connection.removeAllListeners();
						} catch {}
						try {
							await stale.connection.disconnect();
						} catch {}
					}
					this.connections.set(conversationId, active);
					if (sessionMode !== "connect-only") this.cloudSandboxTelemetry.sessionReady({
						...this.getTelemetryActiveFields(active),
						conversationId,
						cold_start: true,
						reuse_type: active.reuseType ?? "new_connection",
						duration_ms: cloudSandboxDurationSince(active.connectStartedAt ?? Date.now()),
						session_mode: sessionMode
					});
					this.log(projectId, active.sessionId, "openConnection:registered", {
						conversationId,
						sessionMode,
						connectionCount: this.connections.size
					});
					return active;
				} catch (error) {
					this.cloudSandboxTelemetry.sessionError({
						projectId,
						conversationId,
						session_mode: sessionMode
					}, error);
					throw error;
				} finally {
					this.connecting.delete(conversationId);
				}
			})();
			this.connecting.set(conversationId, pending);
			return pending;
		}
		/**
		* Build a raw async iterable from the eventChannel.
		* Yields notifications until the isDone callback returns true and no more events arrive
		* within the drain timeout window.
		*/
		buildRawStream(eventChannel, isDone, drainTimeout, projectId, sessionId, _conversationId) {
			const log = this.log.bind(this);
			return { [Symbol.asyncIterator]() {
				return {
					async next() {
						while (true) {
							const timeout = isDone() ? drainTimeout : 3e4;
							const notification = await Promise.race([eventChannel.next(), new Promise((r) => setTimeout(() => r(null), timeout))]);
							if (notification !== null) {
								log(projectId, sessionId, "rawStream:notification", notification);
								return {
									value: notification,
									done: false
								};
							}
							if (isDone() || eventChannel.isClosed()) return {
								value: void 0,
								done: true
							};
						}
					},
					return() {
						return Promise.resolve({
							value: void 0,
							done: true
						});
					}
				};
			} };
		}
		/**
		* Collect history as raw SessionNotifications.
		* loadSession is called in connect() before this generator runs.
		* This just drains history notifications from the eventChannel.
		*
		* 历史/实时边界判定（加固）：
		* - 优先用 `active.historyEndOffset`（load response 下发的权威末位 offset）做判定：
		*   notification.offset > historyEndOffset → 实时消息，push 回 + break。
		*   无 offset 的通知（如 Restore 快照 isSnapshot）保守当历史处理（前端会跳过 isSnapshot）。
		* - 服务端未下发 historyEndOffset（undefined / 旧版本）时降级到 `mode` 判定：mode 非 history 即 break。
		*
		* 这修复了 resume tailOffset 竞态把历史 assistant chunk 错标 `mode:stream`、
		* 导致 collectHistoryRaw 提前 break、历史数组缺 assistant → UI 只渲染用户消息的问题。
		*/
		async *collectHistoryRaw(active) {
			const { projectId, sessionId, eventChannel, historyEndOffset } = active;
			const QUIET_TIMEOUT = 500;
			const useOffsetBoundary = typeof historyEndOffset === "number";
			let count = 0;
			while (true) {
				const notification = await Promise.race([eventChannel.next(), new Promise((resolve) => setTimeout(() => resolve(null), QUIET_TIMEOUT))]);
				if (notification === null) break;
				const codebuddyMeta = notification._meta?.["codebuddy.ai"];
				const mode = codebuddyMeta?.mode;
				const offset = codebuddyMeta?.offset;
				const hasOffset = typeof offset === "number";
				if (useOffsetBoundary ? hasOffset ? offset > historyEndOffset : mode === "stream" : Boolean(mode && mode !== "history")) {
					this.log(projectId, sessionId, "historyRaw:non-history-event", {
						mode,
						offset,
						hasOffset,
						historyEndOffset,
						useOffsetBoundary,
						update: notification.update?.sessionUpdate
					});
					eventChannel.push(notification);
					break;
				}
				this.log(projectId, sessionId, "historyRaw:notification", notification);
				count++;
				yield notification;
			}
			this.log(projectId, sessionId, "historyRaw:done", {
				count,
				historyEndOffset,
				useOffsetBoundary
			});
		}
		/**
		* Collect history events pushed after loadSession.
		*
		* After loadSession, the server pushes all historical messages as sessionUpdate
		* events with _meta['codebuddy.ai'].mode = 'history'. When replay finishes,
		* the server switches to mode = 'stream' for live events.
		*
		* 历史/实时边界判定与 collectHistoryRaw 一致（加固）：
		* - 优先用 `active.historyEndOffset` 做权威 offset 比对；
		* - 缺失时降级到 `mode` 判定。
		*
		* 注意：与 collectHistoryRaw 不同，这里遇到实时事件不 push 回（原行为）——
		* parsed stream 通常不被 UI 消费（UI 走 rawStream），且原注释说明 non-history
		* 事件（多为 session_info_update）不需要重放给 prompt 链路。
		*
		* Uses the persistent eventChannel (registered at connect time).
		*/
		async *collectHistory(active) {
			const { projectId, sessionId, eventChannel, historyEndOffset } = active;
			const QUIET_TIMEOUT = 500;
			const useOffsetBoundary = typeof historyEndOffset === "number";
			let chunkCount = 0;
			let currentRequestId;
			while (true) {
				const notification = await Promise.race([eventChannel.next(), new Promise((resolve) => setTimeout(() => resolve(null), QUIET_TIMEOUT))]);
				if (notification === null) break;
				const codebuddyMeta = notification._meta?.["codebuddy.ai"];
				const mode = codebuddyMeta?.mode;
				const offset = codebuddyMeta?.offset;
				const hasOffset = typeof offset === "number";
				if (useOffsetBoundary ? hasOffset ? offset > historyEndOffset : mode === "stream" : Boolean(mode && mode !== "history")) {
					this.log(projectId, sessionId, "history:non-history-event", {
						mode,
						offset,
						hasOffset,
						historyEndOffset,
						useOffsetBoundary,
						update: notification.update?.sessionUpdate
					});
					break;
				}
				this.log(projectId, sessionId, "history:notification", notification);
				const notifRequestId = this.extractRequestId(notification);
				if (notifRequestId) currentRequestId = notifRequestId;
				const chunk = this.notificationToChunk(notification);
				if (chunk) {
					if (!chunk.requestId && currentRequestId) chunk.requestId = currentRequestId;
					if (chunk.role === "user") currentRequestId = void 0;
					chunkCount++;
					yield chunk;
				}
			}
			this.log(projectId, sessionId, "history:done", { chunkCount });
		}
		/** Extract requestId from any SessionNotification's _meta. */
		extractRequestId(notification) {
			const meta = notification._meta;
			const codebuddyMeta = meta?.["codebuddy.ai"];
			const updateMeta = notification.update?._meta;
			const updateCbMeta = updateMeta?.["codebuddy.ai"];
			return codebuddyMeta?.requestId || meta?.["codebuddy.ai/requestId"] || updateCbMeta?.requestId || updateMeta?.["codebuddy.ai/requestId"];
		}
		/** Parse a single SessionNotification into a ProjectChatChunk (or null if not relevant). */
		notificationToChunk(notification) {
			const update = notification.update;
			const updateType = update?.sessionUpdate;
			const meta = notification._meta;
			const codebuddyMeta = meta?.["codebuddy.ai"];
			const turnSenderUserId = codebuddyMeta?.turnSenderUserId;
			const updateMeta = update?._meta;
			const updateCbMeta = updateMeta?.["codebuddy.ai"];
			const requestId = codebuddyMeta?.requestId || meta?.["codebuddy.ai/requestId"] || updateCbMeta?.requestId || updateMeta?.["codebuddy.ai/requestId"];
			if (updateType === "user_message" || updateType === "user_message_chunk") {
				const content = update.content;
				if (!content || content.type !== "text") return null;
				const text = content.text;
				if (!text) return null;
				return {
					messageId: update.messageId,
					text,
					type: updateType,
					role: "user",
					turnSenderUserId,
					requestId
				};
			}
			if (updateType === "agent_message_chunk" || updateType === "agent_message") {
				const content = update.content;
				if (!content || content.type !== "text") return null;
				const text = content.text;
				if (!text) return null;
				const role = turnSenderUserId ? "user" : "assistant";
				return {
					messageId: update.messageId,
					text,
					type: updateType,
					role,
					turnSenderUserId,
					requestId
				};
			}
			if (updateType === "agent_thought_chunk") {
				const content = update.content;
				if (!content || content.type !== "text") return null;
				const text = content.text;
				if (!text) return null;
				return {
					messageId: update.messageId,
					text,
					type: updateType,
					role: "assistant",
					requestId,
					isReasoning: true
				};
			}
			return null;
		}
		/**
		* Transform raw SessionNotification stream into ProjectChatChunk stream.
		* Used for live prompt streaming — only yields assistant text chunks.
		* Tracks requestId across the turn so all chunks share the same ID.
		*/
		async *parseStream(raw, projectId, sessionId) {
			let chunkCount = 0;
			let currentRequestId;
			for await (const notification of raw) {
				this.log(projectId, sessionId, "stream:notification", notification);
				const notifRequestId = this.extractRequestId(notification);
				if (notifRequestId) currentRequestId = notifRequestId;
				const chunk = this.notificationToChunk(notification);
				if (chunk && chunk.role === "assistant") {
					if (!chunk.requestId && currentRequestId) chunk.requestId = currentRequestId;
					chunkCount++;
					yield chunk;
				}
			}
			this.log(projectId, sessionId, "stream:done", { chunkCount });
		}
	};
}));
//#endregion
export { isExclusivePlanError as _, init_cloud_sandbox_telemetry as a, tryUseNormalizedMemberQuotaData as b, ensureProjectTodoNetdiskAttachmentFolder as c, init_todo_errors as d, isTodoNotFoundError as f, init_quota_errors as g, ProjectQuotaExceededError as h, cloudSandboxDurationSince as i, init_todo_netdisk_attachment_service as l, MemberQuotaExceededError as m, init_project_chat_service as n, summarizeArtifactTypes as o, ExclusivePlanNotSupportedError as p, CloudSandboxTelemetryObserver as r, ensureProjectMessageNetdiskAttachmentFolder as s, ProjectChatService as t, init_cloud_repo as u, tryParseMemberQuotaError as v, tryParseProjectQuotaError as y };
