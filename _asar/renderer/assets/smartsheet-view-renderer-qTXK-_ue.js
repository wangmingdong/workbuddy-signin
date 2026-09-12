const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./grid-INmCojgK.js","./grid-58U_qx7D.js","./chunk-BRZcfu7K.js","./esm-cVQVEiWG.js","./slicedToArray-g9Xis8B6.js","./typeof-CTK7INj6.js","./esm-w-aC9ppW.js","./esm-mgJiqgJI.js","./build-DXCkEJOV.js","./call-bound-CtCE4EvK.js","./i18next-DWuHLQMZ.js","./merge-CDI2sNhv.js","./lodash-D1c13HHR.js","./object-inspect-Dp-_orAS.js","./dist-CSHw4oQX.js","./react-ierAfTWN.js","./tslib.es6-8NkKEYUK.js","./dist-DNjXzICC.js","./execution-result-erkS5q1j.js","./preload-helper-E3UYCQGP.js","./Snackbar-G7Ybe6Nb.js","./preventScrollPenetrate-D7xvP-pE.js","./classnames-BYn3_ESJ.js","./flatten-TiHiTCcv.js","./isObjectLike-Dan5H4Gd.js","./_arrayPush-BsNoX1T9.js","./isArray-DF8nWJvm.js","./react-dom-IYSM6kDg.js","./Button-CoSiBNM5.js","./Spin-B1fQ5dYI.js","./esm-6RpBOeSy.js","./show-BYv9hVgX.js","./i18nextBrowserLanguageDetector-Bv7nntNh.js","./set-CN3NcsdP.js","./_toKey-C_jhg8p3.js","./isSymbol-DlS8bGaY.js","./memoize-one.esm-vG75mWtZ.js","./locale-CF4APsfG.js","./merge-vXYl4M0x.js","./throttle-mAPE4S6V.js","./prop-types-DD6A3Rdg.js","./jsx-runtime-BNEdAQtr.js","./execution-result-DM_Yudyu.css","./canvas-view-DDuMsrmC.js","./resize-observer-QOR-7G1T.js","./toolbar_dele-ClM3mqBW.js","./es-BQsslXL1.js","./interface-CoGujpRf.js","./error-tips-CDT9HdQb.js","./events-BqDrbybI.js","./auto-scroll-Cn43Kqkt.js","./time-util-BfGHaEiB.js","./fix-scroll-delta-C4NjXGCK.js","./config-DWNn7aqz.js","./storage-sync-CZ5zDwyE.js","./common-action-BPA9xdl-.js","./url-hot-rect-D-NY8nLI.js","./field-title-CxPwqqcd.js","./esm-F18mgxoZ.js","./clamp-B7QjjXLG.js","./grid-DQGYTeXF.css","./kanban-todo-fozEDZ4G.js","./kanban-todo-v4lpZGLy.js","./view-DGZEPJsr.js","./state-t2amB7bn.js","./source-field-zJ5uL8Af.js","./kanban-Cja7Cg5i.js","./kanban-ieDNd4hz.js","./content-hover-DdfS9wKa.js","./gallery-Ct1Nkkx2.js","./gallery-CTyj4vqs.js","./gantt-Bz5gOpx_.js","./gantt-DbGAkSMD.js","./get-primary-title-B9E0hwv1.js","./calendar-Dq-25mz0.js","./calendar-zciZM1om.js","./grid-list-C-52BvO9.js","./grid-list-BTYm4O49.js","./lodash-CQINZbUj.js"])))=>i.map(i=>d[i]);
import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { n as __awaiter, p as init_tslib_es6 } from "./tslib.es6-8NkKEYUK.js";
import { a as init_i18n$1, n as getLocale, o as onLocaleChange, u as t } from "./i18n-Bt_Wap4p.js";
import { A as message, t as init_foundation } from "./foundation-QOglV606.js";
import { Dn as require_main, _n as Emitter, vn as init_event } from "./esm-cVQVEiWG.js";
import { $i as MutationId, $l as init_es$1, As as DEFAULT_TEXT_FORMAT, Gl as ViewPublicLevel, Iu as WeblogReportKey, Vl as ViewType, Xu as domainConfig, Yu as logger, js as TextType, md as WDOCS_BUSINESS_REPORT_MODULE, os as MutationOperationType, pd as WDOCS_BUSINESS_REPORT_ACTION, ql as FieldType, td as reporter } from "./execution-result-erkS5q1j.js";
import { t as init_es$2 } from "./es-BQsslXL1.js";
import { C as ActivePointButtonType, S as init_config, w as init_interface$1, x as init_copyright } from "./grid-58U_qx7D.js";
import { At as init_utils$1, Bt as performanceReport, Ct as init_field_icon, Dt as init_checkbox_icon, Pt as init_index_interface$4, Rt as init_common$1, _t as init_normal_icon, ft as init_hyperlink_icon, jt as init_render_app_config, st as init_cursor, zt as init_performance } from "./canvas-view-DDuMsrmC.js";
import { p as init_index_interface$5 } from "./time-util-BfGHaEiB.js";
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/internal/cell-builders.ts
function buildTextDelta(fieldId, text) {
	if (!text) return { [fieldId]: null };
	const cellValue = [{
		type: TextType.TEXT,
		text,
		format: { ...DEFAULT_TEXT_FORMAT }
	}];
	return { [fieldId]: cellValue };
}
function buildUserCDelta(fieldId, users) {
	return { [fieldId]: users ?? null };
}
function buildSingleSelectDelta(fieldId, optionId) {
	return { [fieldId]: optionId ? [optionId] : null };
}
function buildMultiSelectDelta(fieldId, optionIds) {
	return { [fieldId]: optionIds && optionIds.length > 0 ? optionIds : null };
}
function buildDateTimeDelta(fieldId, value) {
	if (value === null || value === void 0 || value === "") return { [fieldId]: null };
	let ms;
	if (typeof value === "number") ms = value;
	else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		const [y, m, d] = value.split("-").map(Number);
		ms = new Date(y, m - 1, d, 0, 0, 0, 0).getTime();
	} else ms = new Date(value).getTime();
	if (!Number.isFinite(ms)) return { [fieldId]: null };
	return { [fieldId]: ms };
}
function buildLinkRecordsDelta(fieldId, recordId) {
	return { [fieldId]: recordId ? [recordId] : null };
}
/**
* ATTACHMENT 列的清空 delta —— value=null 表示把整个附件数组清空。
*
* 附件列常规写路径是 add/removeAttachment（整数组 replace，含 uploader / createdAt 元数据），
* 但「Delete 键批量清空」不需要维护上述元数据，只是把 cell value 置为 null。
* xtable 底层对 ATTACHMENT 列的 setRecord `{ value: null }` 等价于清空，与 removeAttachment
* 最终把 next 数组变为空数组时的 `next.length > 0 ? next : null` 落地形态一致。
*/
function buildAttachmentClearDelta(fieldId) {
	return { [fieldId]: null };
}
function assertExecutionSuccess(result, operation) {
	if (!result.isSuccess) {
		const errorMessage = result.error instanceof Error ? result.error.message : String(result.error);
		throw new Error(`${operation} failed: ${errorMessage}`);
	}
}
function getDefaultViewId(table) {
	const viewIds = table.getViewIdList();
	if (viewIds.length === 0) throw new Error(`Table ${table.id} has no views`);
	return viewIds[0];
}
/** 把 SELECT 列的选项 text 解析成 optionId，找不到返回 null */
function findOptionIdByText(table, fieldId, text) {
	return (table.getFieldByFieldId(fieldId)?.getProperty()?.options ?? []).find((o) => o.text === text)?.id ?? null;
}
/**
* 前端乐观写入「更新时间」（sys_updated_at，MODIFIED_TIME 系统计算列）。
*
* sys_updated_at 是 MODIFIED_TIME 系统列，其展示值取自记录级 lastModifiedTime，
* 正常由服务端处理 changeset 时回填。但计划页没有 accept-commit 本地回填链路
* （对比 smart-sheet AcceptCommitHelper.setRecordModifyTime），新建/修改待办后要等
* 服务端数据 reload 才会刷新「更新时间」，短时间内为空或滞后。
*
* 这里对齐 smart-sheet setRecordModifyTime 的做法：把本次变更单元格的 modifiedTime
* 元数据写成 modifiedTime，driving 记录级 lastModifiedTime → MODIFIED_TIME 列即时刷新。
* 纯本地 model 更新（不产生新 mutation / 不触发 commit），服务端权威值随后覆盖。
*
* @param table        目标子表实例
* @param recordId     记录 id
* @param fieldIds     本次写入涉及的数据列 fieldId（即 delta 的 keys）
* @param modifiedTime 修改时间（ms），默认 Date.now()
*/
function touchRecordModifiedTime(table, recordId, fieldIds, modifiedTime = Date.now()) {
	if (fieldIds.length === 0) return;
	table.updateRecordsModifiedTime([recordId], fieldIds, modifiedTime);
}
var init_cell_builders = __esmMin((() => {
	init_es$2();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/internal/table-cell-readers.ts
/** 按 title 查找 fieldId（大小写不敏感） */
function findFieldIdByTitle(table, title) {
	for (const field of table.getFields()) if (field.getTitle().toLowerCase() === title.toLowerCase()) return field.getId();
}
/** 读 TEXT 列，拼出纯文本；空值返回 '' */
function readText(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return "";
	const cell = field.getStandardCell(recordId);
	if (!cell?.data) return "";
	if (field.type !== FieldType.TEXT && field.type !== FieldType.TITLE) return "";
	return cell.data.map((seg) => seg.text ?? "").join("");
}
/** 读 TEXT 列 → string | undefined（空字符串 → undefined） */
function readTextOpt(table, fieldId, recordId) {
	const text = readText(table, fieldId, recordId);
	return text.length > 0 ? text : void 0;
}
/** 从 DATE_TIME 字段读取 timestamp ms；类型不匹配或空值返回 undefined */
function readDateTimeData(field, recordId) {
	if (field.type !== FieldType.DATE_TIME && field.type !== FieldType.CREATED_TIME && field.type !== FieldType.MODIFIED_TIME) return;
	return field.getStandardCell(recordId)?.data;
}
/** 读时间戳列 → ms；空值 undefined */
function readTimestampMs(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return;
	return readDateTimeData(field, recordId)?.[0]?.timestamp ?? void 0;
}
/** 读时间戳列 → ISO string；空值 undefined */
function readIsoTime(table, fieldId, recordId) {
	const ms = readTimestampMs(table, fieldId, recordId);
	return typeof ms === "number" ? new Date(ms).toISOString() : void 0;
}
/**
* 读「纯日期」时间戳列 → 本地时区 `YYYY-MM-DD`；空值 undefined。
*
* 用于 dueDate / startedAt 这类 date-only 语义字段：日历视图（@tencent/xtable-view
* `ViewType.CALENDAR`）用本地时区 `dayjs().startOf('day')` 归一日程到「天」，拖拽 / 移动
* 落库的时间戳是「本地午夜」。若沿用 `readIsoTime`（`toISOString()` 转 UTC）再 `.slice(0,10)`，
* 在 UTC+ 时区下本地午夜会被折算到前一天的 UTC 日期，导致详情页展示的日期比日历少一天。
* 这里统一按本地时区取「年月日」，与日历的本地分桶语义对齐。
*/
function readLocalDate(table, fieldId, recordId) {
	const ms = readTimestampMs(table, fieldId, recordId);
	if (typeof ms !== "number") return;
	const date = new Date(ms);
	if (Number.isNaN(date.getTime())) return;
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
/** 从 SINGLE_SELECT / MULTIPLE_SELECT 字段读取选择项文本 */
function readSelectData(field, recordId) {
	if (field.type !== FieldType.SINGLE_SELECT && field.type !== FieldType.MULTIPLE_SELECT) return;
	return field.getStandardCell(recordId)?.data;
}
/** 读单选列首个 option 文本 */
function readSelectText(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return;
	return readSelectData(field, recordId)?.[0]?.text ?? void 0;
}
/**
* 读单选列首个 option 的 {id, text}；空值或字段不存在返回 undefined。
* 适用于需要把 optionId 持久化身份回传给业务的场景（priority 等）。
*/
function readSelectOption(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return;
	const first = readSelectData(field, recordId)?.[0];
	if (!first || !first.id || !first.text) return;
	return {
		id: String(first.id),
		text: first.text
	};
}
/** 读多选列全部 option 文本（按存储顺序）；空值返回 [] */
function readMultiSelectTexts(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return [];
	const data = readSelectData(field, recordId);
	if (!data) return [];
	return data.map((opt) => opt?.text ?? "").filter((t) => t.length > 0);
}
/** 从 LINK_RECORDS 字段读取关联记录数据 */
function readLinkRecordsData(field, recordId) {
	if (field.type !== FieldType.LINK_RECORDS && field.type !== FieldType.TWO_WAY_LINK_RECORDS) return;
	return field.getStandardCell(recordId)?.data;
}
/** 读关联列首个 recordId */
function readFirstLinkedRecordId(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return;
	return readLinkRecordsData(field, recordId)?.[0]?.recordId ?? void 0;
}
/** 从 USER_C 字段读取用户数据 */
function readUserTocData(field, recordId) {
	if (field.type !== FieldType.USER_C) return;
	return field.getStandardCell(recordId)?.data;
}
/** 读 USER_C 列全部用户 */
function readUsers(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return [];
	const data = readUserTocData(field, recordId);
	if (!data) return [];
	return data.map((u) => ({
		id: typeof u.id === "string" ? u.id : String(u.id ?? ""),
		name: u.name,
		avatarUrl: u.avatarUrl
	}));
}
/**
* 读 CREATED_USER / MODIFIED_USER 列首个用户。
*
* 与 USER_C 不同的是：这两类是 xtable 自动维护的"系统用户列"，
* 数据 shape 为 `IUserStandardCellData[]`（含 id / name / avatarUrl 等），
* 业务侧通常只取首位作为 creator / lastEditor 展示。
*/
function readSystemUser(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return;
	if (field.type !== FieldType.CREATED_USER && field.type !== FieldType.MODIFIED_USER) return;
	const u = (field.getStandardCell(recordId)?.data)?.[0];
	if (!u) return;
	const id = typeof u.id === "string" ? u.id : String(u.id ?? "");
	const rawName = u.name;
	return {
		id,
		name: rawName && rawName !== id ? rawName : void 0,
		avatarUrl: u.avatarUrl
	};
}
/**
* 把 xtable IAttachment → workbuddy ProjectTodoAttachment。
*
* 直接读 `IWorkBuddyAttachmentItem` 的 K9-K13 一等字段（provider / externalId /
* externalUrl / uploadedById / createdAtMs），不再走旧 toC `classify` JSON hack
* 和旧 toB `fileUrl/fileType/docType` 路径——@tencent/xtable-core 现已把这些
* workbuddy 业务字段并入 `IAttachment` 类型，写入和反序列化都由 xtable-core
* 内部完成。
*
* 旧序列化兜底：少量历史附件可能仍带 `classify` JSON，本函数不再解析它；
* 这类历史数据需要后端做一次性数据迁移补齐 K9-K13 字段。
*/
function attachmentToDto(raw) {
	const provider = raw.provider ?? "url";
	const createdAt = typeof raw.createdAtMs === "number" && raw.createdAtMs > 0 ? new Date(raw.createdAtMs).toISOString() : void 0;
	return {
		id: raw.id,
		provider,
		externalId: raw.externalId,
		externalUrl: raw.externalUrl,
		name: raw.name || void 0,
		fileType: raw.fileExt || void 0,
		fileSize: typeof raw.size === "number" && raw.size > 0 ? raw.size : void 0,
		uploadedById: raw.uploadedById,
		createdAt,
		isHandoffArtifact: parseHandoffArtifactFromMetadata(raw)
	};
}
/**
* 从 attachment metadata(K14) 解析「转交产物」标记。
*
* metadata 是 xtable-core K14 序列化的 JSON 字符串（约定 `{"isHandoffArtifact":true}`）。
* 读出后 JSON.parse 取 isHandoffArtifact 布尔；缺字段 / 解析失败 / metadata 为空 → undefined。
*/
function parseHandoffArtifactFromMetadata(raw) {
	const { metadata } = raw;
	if (typeof metadata !== "string" || metadata.length === 0) return;
	try {
		return JSON.parse(metadata)?.isHandoffArtifact === true ? true : void 0;
	} catch {
		return;
	}
}
/** 从 ATTACHMENT 字段读取附件数据 */
function readAttachmentData(field, recordId) {
	if (field.type !== FieldType.ATTACHMENT) return;
	return field.getStandardCell(recordId)?.data;
}
/** 读 ATTACHMENT 列 → ProjectTodoAttachment[] */
function readAttachments(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return [];
	const data = readAttachmentData(field, recordId);
	if (!data) return [];
	return data.map((item) => item?.attachment).filter((att) => Boolean(att)).map(attachmentToDto);
}
var init_table_cell_readers = __esmMin((() => {
	init_es$2();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/internal/table-constants.ts
/**
* 将数值优先级（`ProjectTodo.priority`）转换为 UI 实际使用的 `TodoPriorityOption` 对象。
*
* 映射规则：`PRIORITY_TEXTS` 索引 → `{ id: text, text }`。
* - 0 → `{ id: 'urgent', text: 'urgent' }`
* - 1 → `{ id: 'high', text: 'high' }`
* - 2 → `{ id: 'medium', text: 'medium' }`
* - 3 → `{ id: 'low', text: 'low' }`
*
* 注意：返回的 `id` 是选项 text 本身，而非 xtable 动态生成的 optionId。
* 需要精确匹配 xtable 选项 id 的场景（如 picker 高亮），应使用
* `priorityOptions.find(o => o.text === PRIORITY_TEXTS[num])?.id` 查找。
*
* @param priority 数值优先级（0-3）；`null`/`undefined` 返回 `null`
* @returns `TodoPriorityOption` 或 `null`
*/
function priorityToOption(priority) {
	if (priority == null) return null;
	const text = PRIORITY_TEXTS[priority];
	if (!text) return null;
	return {
		id: text,
		text
	};
}
/**
* 从 ProjectTodo 解析优先级选项（**统一入口，UI 消费点应优先用本函数**）。
*
* 优先读 `priorityOption`（智能表本地路径回填的完整 `{ id, text }`，**含自定义优先级**），
* 回退到 `priorityToOption(priority)`（云端 GraphQL 路径只回填 number 编码时的兼容）。
*
* - 自定义优先级：`priority` 为 null 但 `priorityOption` 有值 → 返回完整 option（不再丢失）。
* - 云端已知枚举：`priorityOption` 为 undefined → 回退 number 编码，行为不变。
* - 未设置：两者皆空 → 返回 null。
*
* 注意：`priorityOption.id` 是 xtable 真实 optionId（本地路径），比 `priorityToOption`
* 返回的 `id=text` 更精确，picker 高亮等按 id 匹配的场景更可靠。
*/
function resolvePriorityOption(todo) {
	if (!todo) return null;
	if (todo.priorityOption) return todo.priorityOption;
	return priorityToOption(todo.priority);
}
var TABLE_TODOS, TABLE_TODO_TYPES, TABLE_ITERATIONS, F_TODO, F_TODO_TYPE, PRIORITY_TEXTS, STATUS_OPTION_TO_DTO, STATUS_DTO_TO_OPTION;
var init_table_constants = __esmMin((() => {
	TABLE_TODOS = "todos";
	TABLE_TODO_TYPES = "todo_types";
	TABLE_ITERATIONS = "iterations";
	F_TODO = {
		title: "sys_title",
		description: "sys_description",
		summary: "sys_summary",
		attachments: "sys_attachments",
		assignee_ids: "sys_assignee_ids",
		subscribers: "sys_subscribers",
		due_date: "sys_due_date",
		started_at: "sys_started_at",
		completed_at: "sys_completed_at",
		status_id: "sys_status_id",
		priority: "sys_priority",
		tags: "sys_tags",
		pause_reason: "sys_pause_reason",
		blocking_reason: "sys_blocking_reason",
		parent_id: "sys_parent_id",
		todo_type: "sys_todo_type",
		iteration_id: "sys_iteration_id",
		source: "sys_source",
		created_by: "sys_created_by",
		updated_by: "sys_updated_by",
		created_at: "sys_created_at",
		updated_at: "sys_updated_at"
	};
	F_TODO_TYPE = {
		name: "sys_name",
		description: "sys_description"
	};
	PRIORITY_TEXTS = [
		"urgent",
		"high",
		"medium",
		"low"
	];
	STATUS_OPTION_TO_DTO = {
		pending: "pending",
		running: "in_progress",
		paused: "paused",
		done: "completed"
	};
	STATUS_DTO_TO_OPTION = {
		pending: "pending",
		in_progress: "running",
		paused: "paused",
		completed: "done",
		custom: ""
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/internal/table-state-readers.ts
/** 把选项 text 映射成 ProjectTodoStatusType；未识别 → 'custom' */
function mapStatusOptionToType(optionText) {
	if (!optionText) return "custom";
	return STATUS_OPTION_TO_DTO[optionText] ?? "custom";
}
/** 取 todos 表的 sys_status_id SINGLE_SELECT 字段（缺失返回 undefined） */
function getStatusField(todosTable) {
	const fieldId = findFieldIdByTitle(todosTable, F_TODO.status_id);
	if (!fieldId) return;
	const field = todosTable.getFieldByFieldId(fieldId);
	if (!field || field.type !== FieldType.SINGLE_SELECT) return;
	return field;
}
/**
* 读 todos.sys_status_id 的全部选项，构造 StateInfo 数组 + byOptionId 反查 map。
*
* @param todosTable todos 子表 ITable
*/
function readAllStates(todosTable) {
	const options = getStatusField(todosTable)?.getProperty()?.options ?? [];
	const list = [];
	const byOptionId = /* @__PURE__ */ new Map();
	options.forEach((opt, index) => {
		if (!opt.id) return;
		const name = (opt.text ?? "").trim();
		const type = mapStatusOptionToType(name);
		const info = {
			optionId: opt.id,
			name: name || opt.id,
			type,
			position: index,
			isDefault: type === "pending"
		};
		list.push(info);
		byOptionId.set(opt.id, info);
	});
	return {
		list,
		byOptionId
	};
}
/** StateInfo → ProjectTodoStatus DTO（id 即 optionId） */
function stateInfoToDto(info) {
	return {
		id: info.optionId,
		name: info.name,
		type: info.type,
		position: info.position,
		...info.isDefault ? { isDefault: true } : {}
	};
}
/**
* 允许的流转目标 —— 流转限制已移除，允许切到任意状态。
*
* 直接返回全部状态（DTO 形态）；调用方据此渲染状态选择器。
*/
function readAllowedTransitions(states) {
	return states.map((info) => ({
		id: info.optionId,
		name: info.name,
		type: info.type
	}));
}
/**
* 在状态列表里挑一条作为创建 todo 时的默认 status。
*
* 优先级：type === 'pending' 的第一条 → 列表第一条 → undefined。
*/
function pickDefaultState(states) {
	return states.find((s) => s.type === "pending") ?? states[0];
}
var init_table_state_readers = __esmMin((() => {
	init_es$2();
	init_table_cell_readers();
	init_table_constants();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/normalize-todo.ts
/**
* ProjectTodo DTO 协议层归一化。
*
* SmartsheetService 产出的 ProjectTodo 必须与 workbuddy-server
* `cloud-todo-utils.normalizeTodo` 输出**逐字段等值**。智能表存储语义与协议
* 语义不完全一致的字段在此集中处理。
*/
/**
* 反向归一化截止日期：协议层用 1970-01-01 哨兵值表示"已清空"，
* service 产出 DTO 时统一翻译为 undefined。
*
* 与后端 `cloud-todo-utils.normalizeDueDate` 一致。
*/
function normalizeDueDate(value) {
	if (!value) return;
	if (value.startsWith("1970-01-01")) return;
	return value;
}
var init_normalize_todo = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/schema/todo-field-schema.ts
/** 注册字段定义（todo-fields.ts 初始化时调用） */
function registerTodoFields(fields) {
	TODO_FIELDS = fields;
}
/** key → fieldTitle 正向查找（业务 dim → xtable 字段 title） */
function getFieldTitleByKey(key) {
	return TODO_FIELDS.find((f) => f.key === key)?.fieldTitle;
}
/** fieldTitle → key 反向查找（xtable 字段 title → 业务 dim） */
function getFieldKeyByTitle(fieldTitle) {
	return TODO_FIELDS.find((f) => f.fieldTitle === fieldTitle)?.key;
}
/** 所有可隐藏字段（供 view-decoders / view-mutations 遍历隐藏态） */
function getHideableFields() {
	return TODO_FIELDS.filter((f) => f.hideable).map((f) => ({
		key: f.key,
		fieldTitle: f.fieldTitle
	}));
}
/**
* 系统始终隐藏字段（如 description）——不进「字段显示」面板，由下推侧强制保持隐藏。
* 与 getHideableFields 互斥，供 applyHiddenFields / resetView 遍历确保其恒隐藏。
*/
function getAlwaysHiddenFields() {
	return TODO_FIELDS.filter((f) => f.alwaysHidden).map((f) => ({
		key: f.key,
		fieldTitle: f.fieldTitle
	}));
}
/** 按 key 获取字段定义 */
function getFieldDef(key) {
	return TODO_FIELDS.find((f) => f.key === key);
}
var TODO_FIELDS;
var init_todo_field_schema = __esmMin((() => {
	TODO_FIELDS = [];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/schema/todo-fields.ts
var FIELD_DEFS;
var init_todo_fields = __esmMin((() => {
	init_es$2();
	init_cell_builders();
	init_table_cell_readers();
	init_table_constants();
	init_table_state_readers();
	init_normalize_todo();
	init_todo_field_schema();
	FIELD_DEFS = [
		{
			key: "title",
			fieldTitle: "sys_title",
			writable: true,
			sortable: true,
			filterable: true,
			read: (table, fid, rid) => readText(table, fid, rid),
			buildDelta: (fid, value) => buildTextDelta(fid, value)
		},
		{
			key: "description",
			fieldTitle: "sys_description",
			writable: true,
			alwaysHidden: true,
			read: (table, fid, rid) => readTextOpt(table, fid, rid),
			buildDelta: (fid, value) => buildTextDelta(fid, value)
		},
		{
			key: "summary",
			fieldTitle: "sys_summary",
			writable: true,
			hideable: true,
			read: (table, fid, rid) => readTextOpt(table, fid, rid),
			buildDelta: (fid, value) => buildTextDelta(fid, value)
		},
		{
			key: "status",
			fieldTitle: "sys_status_id",
			writable: true,
			filterable: true,
			groupable: true,
			sortable: true,
			hideable: true,
			read: (table, fid, rid, ctx) => {
				const statusText = readSelectText(table, fid, rid);
				if (!statusText) return {
					id: "pending",
					name: "pending",
					type: "pending"
				};
				const info = ctx.statesByName.get(statusText);
				return info ? {
					id: info.optionId,
					name: info.name,
					type: info.type
				} : {
					id: statusText,
					name: statusText,
					type: mapStatusOptionToType(statusText)
				};
			},
			buildDelta: (fid, optionId) => buildSingleSelectDelta(fid, optionId)
		},
		{
			key: "priority",
			fieldTitle: "sys_priority",
			writable: true,
			filterable: true,
			sortable: true,
			hideable: true,
			read: (table, fid, rid) => {
				const option = readSelectOption(table, fid, rid);
				if (!option) return null;
				const idx = PRIORITY_TEXTS.indexOf(option.text);
				return idx >= 0 ? idx : null;
			},
			buildDelta: (fid, value, ctx) => {
				if (!value) return buildSingleSelectDelta(fid, null);
				return buildSingleSelectDelta(fid, (value.text ? findOptionIdByText(ctx.table, fid, value.text) : null) ?? value.id);
			}
		},
		{
			key: "priorityOption",
			fieldTitle: "sys_priority",
			writable: false,
			read: (table, fid, rid) => readSelectOption(table, fid, rid) ?? null
		},
		{
			key: "tags",
			fieldTitle: "sys_tags",
			writable: true,
			filterable: true,
			groupable: true,
			hideable: true,
			read: (table, fid, rid) => readMultiSelectTexts(table, fid, rid),
			buildDelta: (fid, value, ctx) => {
				const optionIds = [];
				for (const text of value) {
					const id = findOptionIdByText(ctx.table, fid, text);
					if (id) optionIds.push(id);
				}
				return { [fid]: optionIds.length > 0 ? optionIds : null };
			}
		},
		{
			key: "source",
			fieldTitle: "sys_source",
			writable: true,
			filterable: true,
			groupable: true,
			hideable: true,
			read: (table, fid, rid) => {
				return readSelectText(table, fid, rid) ?? "manual";
			},
			buildDelta: (fid, value, ctx) => {
				const field = ctx.table.getFieldByFieldId(fid);
				if (!field || field.type !== FieldType.SINGLE_SELECT) return;
				const opt = (field.getProperty?.()?.options ?? []).find((o) => o.text === value);
				return opt ? buildSingleSelectDelta(fid, opt.id) : void 0;
			}
		},
		{
			key: "assignee",
			fieldTitle: "sys_assignee_ids",
			writable: true,
			filterable: true,
			groupable: true,
			sortable: true,
			hideable: true,
			read: (table, fid, rid) => readUsers(table, fid, rid),
			buildDelta: async (fid, value, ctx) => {
				if (!ctx.resolveMembers) return buildUserCDelta(fid, null);
				const ids = [...new Set(value.filter(Boolean))];
				const members = ids.length > 0 ? await ctx.resolveMembers(ids) : [];
				return buildUserCDelta(fid, members.length > 0 ? members : null);
			}
		},
		{
			key: "subscribers",
			fieldTitle: "sys_subscribers",
			writable: true,
			read: (table, fid, rid) => readUsers(table, fid, rid),
			buildDelta: async (fid, value, ctx) => {
				if (!ctx.resolveMembers) return buildUserCDelta(fid, null);
				const ids = [...new Set(value.filter(Boolean))];
				const members = ids.length > 0 ? await ctx.resolveMembers(ids) : [];
				return buildUserCDelta(fid, members.length > 0 ? members : null);
			}
		},
		{
			key: "creator",
			fieldTitle: "sys_created_by",
			writable: false,
			filterable: true,
			read: (table, fid, rid) => readSystemUser(table, fid, rid)
		},
		{
			key: "dueDate",
			fieldTitle: "sys_due_date",
			writable: true,
			sortable: true,
			hideable: true,
			read: (table, fid, rid) => normalizeDueDate(readLocalDate(table, fid, rid)),
			buildDelta: (fid, value) => buildDateTimeDelta(fid, value)
		},
		{
			key: "startedAt",
			fieldTitle: "sys_started_at",
			writable: true,
			sortable: true,
			hideable: true,
			read: (table, fid, rid) => readLocalDate(table, fid, rid),
			buildDelta: (fid, value) => buildDateTimeDelta(fid, value)
		},
		{
			key: "completedAt",
			fieldTitle: "sys_completed_at",
			writable: true,
			read: (table, fid, rid) => readIsoTime(table, fid, rid),
			buildDelta: (fid, value) => buildDateTimeDelta(fid, value)
		},
		{
			key: "createdAt",
			fieldTitle: "sys_created_at",
			writable: false,
			sortable: true,
			hideable: true,
			read: (table, fid, rid) => readIsoTime(table, fid, rid) ?? (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			key: "updatedAt",
			fieldTitle: "sys_updated_at",
			writable: false,
			sortable: true,
			hideable: true,
			read: (table, fid, rid, _ctx, partial) => readIsoTime(table, fid, rid) ?? partial.createdAt ?? ""
		},
		{
			key: "pauseReason",
			fieldTitle: "sys_pause_reason",
			writable: true,
			read: (table, fid, rid, _ctx, partial) => {
				if (partial.status?.type !== "paused") return;
				return readTextOpt(table, fid, rid);
			},
			buildDelta: (fid, value) => buildTextDelta(fid, value)
		},
		{
			key: "parentId",
			fieldTitle: "sys_parent_id",
			writable: true,
			read: (table, fid, rid) => readFirstLinkedRecordId(table, fid, rid),
			buildDelta: (fid, value) => buildLinkRecordsDelta(fid, value)
		},
		{
			key: "blockingReason",
			fieldTitle: "sys_blocking_reason",
			writable: true,
			read: (table, fid, rid) => readTextOpt(table, fid, rid) ?? void 0,
			buildDelta: (fid, value) => buildTextDelta(fid, value)
		},
		{
			key: "attachments",
			fieldTitle: "sys_attachments",
			writable: false,
			alwaysHidden: true,
			read: (table, fid, rid) => {
				const items = readAttachments(table, fid, rid);
				return items.length > 0 ? items.map((a) => ({
					id: a.id,
					provider: a.provider ?? "url",
					externalId: a.externalId,
					externalUrl: a.externalUrl,
					name: a.name,
					fileType: a.fileType,
					fileSize: a.fileSize,
					uploadedBy: a.uploadedById ? { id: a.uploadedById } : void 0,
					createdAt: a.createdAt,
					isHandoffArtifact: a.isHandoffArtifact
				})) : void 0;
			}
		},
		{
			key: "todoType",
			fieldTitle: "sys_todo_type",
			writable: false,
			filterable: true,
			read: (table, fid, rid) => readFirstLinkedRecordId(table, fid, rid)
		},
		{
			key: "iteration",
			fieldTitle: "sys_iteration_id",
			writable: false,
			filterable: true,
			read: (table, fid, rid) => readFirstLinkedRecordId(table, fid, rid)
		}
	];
	registerTodoFields(FIELD_DEFS);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/view/sort-fields.ts
/** 取排序字段配置列表（顺序即选择器展示顺序）。 */
function getSortFields() {
	return SORT_FIELDS;
}
/** 取某字段的默认排序方向（未在 SORT_FIELDS 中的字段兜底升序）。 */
function getDefaultSortDirection(field) {
	return SORT_FIELDS.find((f) => f.key === field)?.defaultDirection ?? "asc";
}
/** 是否为选项（SINGLE_SELECT）字段——决定方向文案用「正序/逆序」还是「升序/降序」。 */
function isOptionSortField(field) {
	return SORT_FIELDS.find((f) => f.key === field)?.isOptionField ?? false;
}
var SORT_FIELDS;
var init_sort_fields = __esmMin((() => {
	SORT_FIELDS = [
		{
			key: "title",
			labelKey: "collab.plan.fields.title",
			defaultDirection: "asc"
		},
		{
			key: "status",
			labelKey: "collab.plan.fields.status",
			defaultDirection: "desc",
			isOptionField: true
		},
		{
			key: "priority",
			labelKey: "collab.plan.fields.priority",
			defaultDirection: "desc",
			isOptionField: true
		},
		{
			key: "assignee",
			labelKey: "collab.plan.fields.owner",
			defaultDirection: "asc"
		},
		{
			key: "updatedAt",
			labelKey: "collab.plan.fields.updatedAt",
			defaultDirection: "desc"
		},
		{
			key: "createdAt",
			labelKey: "collab.plan.fields.createdAt",
			defaultDirection: "desc"
		},
		{
			key: "startedAt",
			labelKey: "collab.plan.fields.startedAt",
			defaultDirection: "desc"
		},
		{
			key: "dueDate",
			labelKey: "collab.plan.fields.dueDate",
			defaultDirection: "asc"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/view/view-mode-config.ts
/** 正向映射：视图模式 → xtable CoreViewType（setViewMode 使用）。 */
function viewModeToCoreType(mode) {
	return VIEW_MODE_REGISTRY[mode]?.coreViewType ?? VIEW_MODE_REGISTRY["board"].coreViewType;
}
/**
* 反向映射：xtable CoreViewType → 视图模式（decodeViewMode 使用）。
*
* 这是修复「切甘特/表格/日历后工具栏高亮回退到列表」的关键：以前的实现只判断
* `=== KANBAN ? 'board' : 'list'`，把所有非看板类型都当成列表。现在按注册表精确反查。
*/
function coreTypeToViewMode(coreType) {
	return DEFINITION_BY_CORE_TYPE.get(coreType) ?? FALLBACK_DECODE_MODE;
}
/** 取某个视图模式的完整可配置能力（分组 / 排序 / 字段显隐）。 */
function getViewModeCapabilities(mode) {
	return (VIEW_MODE_REGISTRY[mode] ?? VIEW_MODE_REGISTRY["board"]).capabilities;
}
/**
* 取某个视图模式是否支持「分组」配置。
* 列表 / 日历返回 false——这是避免「设置分组触发 VIEW_NOT_SUPPORT_GROUP」的判断依据。
*/
function viewModeSupportsGrouping(mode) {
	return getViewModeCapabilities(mode).grouping;
}
/** 取某个视图模式是否支持「排序」配置。 */
function viewModeSupportsSorting(mode) {
	return getViewModeCapabilities(mode).sorting;
}
/** 取某个视图模式是否支持「字段显隐」配置。 */
function viewModeSupportsFieldVisibility(mode) {
	return getViewModeCapabilities(mode).fieldVisibility;
}
/** 取某个视图模式是否支持「显示子待办」配置。 */
function viewModeSupportsShowSubTodos(mode) {
	return getViewModeCapabilities(mode).showSubTodos;
}
/**
* 取某个视图模式「字段显隐」配置面板可选的列 key 列表。
*
* 返回的是 column key 字符串数组（与 `view-column-config.ts` 的 VIEW_COLUMNS[].key 对应）。
* 需要完整 `ViewColumnConfig[]`（含 labelKey 等渲染信息）时用
* `view-column-config.ts` 的 `getHideableColumnsForMode(mode)`，它会用本函数返回的
* key 列表过滤 VIEW_COLUMNS。
*/
function getViewModeHideableColumnKeys(mode) {
	return (VIEW_MODE_REGISTRY[mode] ?? VIEW_MODE_REGISTRY["board"]).hideableColumnKeys;
}
/** 取某个视图模式是否允许「不分组」（仅在支持分组时有意义）。 */
function viewModeAllowsNoGrouping(mode) {
	return getViewModeCapabilities(mode).allowNoGrouping;
}
/**
* 按 xtable CoreViewType 判断是否支持「分组」配置——供写入层（applyGrouping）守卫用。
*
* 写入层拿到的是 view.type（CoreViewType），先反查 ViewMode 再取能力；未知类型
* 反查兜底为 'list'（不支持分组），对未知视图最安全。
*/
function coreTypeSupportsGrouping(coreType) {
	return viewModeSupportsGrouping(coreTypeToViewMode(coreType));
}
/** 取全部视图模式定义（按 VIEW_MODE_ORDER 顺序），供 UI 渲染模式切换按钮。 */
function getViewModeOptions() {
	return VIEW_MODE_ORDER.map((mode) => ({
		mode,
		...VIEW_MODE_REGISTRY[mode]
	}));
}
var BOARD_HIDEABLE_KEYS, LIST_HIDEABLE_KEYS, TABLE_HIDEABLE_KEYS, GANTT_HIDEABLE_KEYS, EMPTY_HIDEABLE_KEYS, VIEW_MODE_REGISTRY, VIEW_MODE_ORDER, FALLBACK_DECODE_MODE, DEFINITION_BY_CORE_TYPE;
var init_view_mode_config = __esmMin((() => {
	init_es$2();
	BOARD_HIDEABLE_KEYS = [
		"status",
		"assignee",
		"source",
		"priority",
		"tags",
		"createdAt"
	];
	LIST_HIDEABLE_KEYS = [
		"status",
		"priority",
		"source",
		"tags",
		"assignee",
		"createdAt"
	];
	TABLE_HIDEABLE_KEYS = [
		"status",
		"assignee",
		"source",
		"startedAt",
		"dueDate",
		"priority",
		"tags",
		"createdAt",
		"updatedAt"
	];
	GANTT_HIDEABLE_KEYS = [
		"status",
		"assignee",
		"source",
		"startedAt",
		"dueDate",
		"priority",
		"tags",
		"summary",
		"createdAt",
		"updatedAt"
	];
	EMPTY_HIDEABLE_KEYS = [];
	VIEW_MODE_REGISTRY = {
		board: {
			coreViewType: ViewType.KANBAN,
			labelKey: "collab.plan.display.mode.board",
			capabilities: {
				grouping: true,
				allowNoGrouping: false,
				sorting: true,
				fieldVisibility: true,
				showSubTodos: false
			},
			hideableColumnKeys: BOARD_HIDEABLE_KEYS
		},
		list: {
			coreViewType: ViewType.LIST,
			labelKey: "collab.plan.display.mode.list",
			capabilities: {
				grouping: true,
				allowNoGrouping: true,
				sorting: true,
				fieldVisibility: true,
				showSubTodos: true
			},
			hideableColumnKeys: LIST_HIDEABLE_KEYS
		},
		table: {
			coreViewType: ViewType.GRID,
			labelKey: "collab.plan.display.mode.table",
			capabilities: {
				grouping: true,
				allowNoGrouping: true,
				sorting: true,
				fieldVisibility: true,
				showSubTodos: false
			},
			hideableColumnKeys: TABLE_HIDEABLE_KEYS
		},
		gantt: {
			coreViewType: ViewType.GANTT,
			labelKey: "collab.plan.display.mode.gantt",
			capabilities: {
				grouping: true,
				allowNoGrouping: true,
				sorting: true,
				fieldVisibility: true,
				showSubTodos: false
			},
			hideableColumnKeys: GANTT_HIDEABLE_KEYS
		},
		calendar: {
			coreViewType: ViewType.CALENDAR,
			labelKey: "collab.plan.display.mode.calendar",
			capabilities: {
				grouping: false,
				allowNoGrouping: true,
				sorting: false,
				fieldVisibility: false,
				showSubTodos: false
			},
			hideableColumnKeys: EMPTY_HIDEABLE_KEYS
		}
	};
	VIEW_MODE_ORDER = [
		"board",
		"list",
		"table",
		"gantt",
		"calendar"
	];
	FALLBACK_DECODE_MODE = "list";
	DEFINITION_BY_CORE_TYPE = new Map(Object.keys(VIEW_MODE_REGISTRY).map((mode) => [VIEW_MODE_REGISTRY[mode].coreViewType, mode]));
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/view/view-column-config.ts
function getColumnConfig(key) {
	return VIEW_COLUMNS.find((c) => c.key === key);
}
function getFilterableColumns() {
	return VIEW_COLUMNS.filter((c) => c.capabilities.filterable);
}
function getGroupableColumns() {
	return VIEW_COLUMNS.filter((c) => c.capabilities.groupable);
}
/**
* 分组下拉选项——根据视图模式决定是否包含"不分组"。
*
* - 视图**不支持分组**（列表 / 日历）：返回空数组。UI 据此隐藏分组配置项，
*   从源头杜绝「对不可配置项的修改即保存触发 VIEW_NOT_SUPPORT_GROUP」。
* - 视图支持分组：列出可分组列，是否追加"不分组"由 `allowNoGrouping` 决定
*   （看板必须分组，其余可选）。
*
* 能力均由 view-mode-config 注册表派生，新增视图类型时只需在注册表声明能力。
*/
function getGroupingOptions(mode) {
	if (!viewModeSupportsGrouping(mode)) return [];
	const columns = getGroupableColumns().map((c) => ({
		key: c.key,
		labelKey: c.labelKey
	}));
	return viewModeAllowsNoGrouping(mode) ? [...columns, {
		key: null,
		labelKey: "collab.plan.display.group.none"
	}] : columns;
}
/**
* 取所有可能被隐显的列配置——所有视图模式 hideableColumnKeys 的并集。
*
* 哪些列可配置隐隐完全由 `view-mode-config.ts` 的 `hideableColumnKeys` 控制，
* 本函数从所有模式的 key 列表取并集后过滤 VIEW_COLUMNS，供 snapshot 转换
* （visibleColumns ↔ hiddenFields）取全集用。
*/
function getHideableColumns() {
	const allKeys = /* @__PURE__ */ new Set();
	for (const mode of VIEW_MODE_ORDER) for (const key of getViewModeHideableColumnKeys(mode)) allKeys.add(key);
	return VIEW_COLUMNS.filter((c) => allKeys.has(c.key));
}
/**
* 取某个视图模式下「字段显隐」配置面板可选的列配置（含 labelKey 等渲染信息）。
*
* 完全以 `view-mode-config.ts` 的 `getViewModeHideableColumnKeys(mode)` 为准——
* 该函数返回该模式支持显隐的 column key **有序**列表，本函数按该顺序把 key 映射为
* 完整的 ViewColumnConfig。组件侧只需调本函数即可拿到要渲染的显隐选项，无需
* 自行按视图类型分支。
*
* 面板中字段的排列顺序 = 该模式 hideableColumnKeys 的声明顺序（如表格视图取
* TABLE_HIDEABLE_KEYS 顺序），因此各模式可独立控制显隐面板里字段的排列。
*
* 日历 `fieldVisibility=false`，hideableColumnKeys 为空，返回空数组
*/
function getHideableColumnsForMode(mode) {
	const keys = getViewModeHideableColumnKeys(mode);
	const columnMap = new Map(VIEW_COLUMNS.map((c) => [c.key, c]));
	return keys.map((k) => columnMap.get(k)).filter((c) => c !== void 0);
}
/**
* 取关联子表中指定 record 的字段展示文本。
*/
function readLinkedDisplayLabel(table, fieldId, recordId) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return "";
	const cell = field.getStandardCell(recordId);
	if (!cell?.data || !Array.isArray(cell.data)) return "";
	if (field.type === FieldType.TEXT || field.type === FieldType.TITLE) return cell.data.map((seg) => seg.text ?? "").join("");
	if (field.type === FieldType.SINGLE_SELECT || field.type === FieldType.MULTIPLE_SELECT) return cell.data[0]?.text ?? "";
	return "";
}
/**
* 根据字段类型派生筛选选项。
*
* value 格式按列类型分流——结果可直接写入 xtable IFilterCondition.value：
* - SINGLE_SELECT / MULTIPLE_SELECT → value=optionId
* - LINK_RECORDS / TWO_WAY_LINK_RECORDS → value=关联表展示字段文本
* - LOOKUP(SELECT formatter) → value=optionId
* - USER_C / CREATED_USER / MODIFIED_USER → value=userId
*/
function buildOptionsForField(field, column, ctx) {
	if (field.type === FieldType.SINGLE_SELECT || field.type === FieldType.MULTIPLE_SELECT) return (field.getProperty()?.options ?? []).map((o) => ({
		value: [o.id],
		label: o.text ?? ""
	})).filter((o) => o.label.length > 0);
	if (field.type === FieldType.LINK_RECORDS || field.type === FieldType.TWO_WAY_LINK_RECORDS) {
		if (!column.linkHint || !ctx.getRelatedTable) return [];
		const related = ctx.getRelatedTable(column.linkHint.targetTableName);
		if (!related) return [];
		const displayFieldId = findFieldIdByTitle(related, column.linkHint.displayFieldTitle);
		if (!displayFieldId) return [];
		const recordIds = related.getRecordIdList();
		const result = [];
		const seen = /* @__PURE__ */ new Set();
		for (const rid of recordIds) {
			const label = readLinkedDisplayLabel(related, displayFieldId, rid);
			if (label.length > 0 && !seen.has(label)) {
				seen.add(label);
				result.push({
					value: [label],
					label
				});
			}
		}
		return result;
	}
	if (field.type === FieldType.LOOKUP) {
		const property = field.getResultFieldAttributes()?.getProperty();
		if (!property) return [];
		const options = property.options ?? [];
		if (options.length === 0) return [];
		return options.map((o) => ({
			value: [o.id ?? ""],
			label: o.text ?? "",
			restValue: o.text ?? ""
		})).filter((o) => o.label.length > 0);
	}
	if (field.type === FieldType.USER_C || field.type === FieldType.CREATED_USER || field.type === FieldType.MODIFIED_USER) return (ctx.userCandidates ?? []).filter((u) => Boolean(u.id)).map((u) => ({
		value: [u.id],
		label: u.name?.trim() || u.id
	}));
	return [];
}
/**
* 根据 column key 构建筛选选项。
*
* 找不到 column / 字段未加载 → 返回 []。
*/
function buildColumnFilterOptions(columnKey, ctx) {
	const column = VIEW_COLUMNS.find((c) => c.key === columnKey);
	if (!column) return [];
	if (!column.capabilities.filterable) return [];
	const realFieldId = findFieldIdByTitle(ctx.table, column.fieldTitle);
	if (!realFieldId) return [];
	const field = ctx.table.getFieldByFieldId(realFieldId);
	if (!field) return [];
	const options = buildOptionsForField(field, column, ctx);
	if (column.filterOptionOrder && column.filterOptionOrder.length > 0) {
		const orderMap = new Map(column.filterOptionOrder.map((label, index) => [label, index]));
		return [...options].sort((a, b) => {
			const orderA = orderMap.get(a.label);
			const orderB = orderMap.get(b.label);
			if (orderA !== void 0 && orderB !== void 0) return orderA - orderB;
			if (orderA !== void 0) return -1;
			if (orderB !== void 0) return 1;
			return 0;
		});
	}
	return options;
}
/**
* 构建 `fieldId → ResolvedColumn` 反查表——基于当前 todos 表把 VIEW_COLUMNS
* 里每条配置的 `fieldTitle` 解析为该项目实际的 fieldId，再以 fieldId 为 key 倒排。
*
* 找不到对应 fieldId 的列会被跳过（典型场景：底层 schema 漂移、字段被删）。
*
* **title 列**：标题字段现已进 VIEW_COLUMNS（仅 filterable，用于"按标题内容筛选"），
* 上面的循环会为它建立映射；此处末尾再独立注入一次作为安全兜底，确保即便未来把 title
* 移出 VIEW_COLUMNS，GRID 单元格点击仍能识别标题字段并路由到 TitleCellEditor。
* title 不 groupable / hideable，故不会进分组、字段显隐等派生。
*/
function buildFieldIdToColumnIndex(table) {
	const map = /* @__PURE__ */ new Map();
	for (const column of VIEW_COLUMNS) {
		const fieldId = findFieldIdByTitle(table, column.fieldTitle);
		if (!fieldId) continue;
		map.set(fieldId, {
			key: column.key,
			displayName: column.labelKey,
			fieldTitle: column.fieldTitle,
			editable: true
		});
	}
	const titleFieldId = findFieldIdByTitle(table, F_TODO.title);
	if (titleFieldId) map.set(titleFieldId, {
		key: TITLE_COLUMN_KEY,
		displayName: "collab.plan.fields.title",
		fieldTitle: F_TODO.title,
		editable: true
	});
	return map;
}
var VIEW_COLUMNS_UI, SCHEMA_FIELD_MAP, VIEW_COLUMNS, HIDEABLE_COLUMN_KEYS, TITLE_COLUMN_KEY, DEFAULT_TOOLBAR_STATE;
var init_view_column_config = __esmMin((() => {
	init_es$2();
	init_todo_fields();
	init_table_cell_readers();
	init_table_constants();
	init_view_mode_config();
	init_sort_fields();
	VIEW_COLUMNS_UI = [
		{
			key: "title",
			labelKey: "collab.plan.fields.title",
			filterValueEditor: "text"
		},
		{
			key: "status",
			labelKey: "collab.plan.fields.status",
			filterMultiSelect: true,
			filterOptions: [
				{
					value: ["pending"],
					label: "collab.plan.status.label.pending"
				},
				{
					value: ["running"],
					label: "collab.plan.status.label.in_progress"
				},
				{
					value: ["paused"],
					label: "collab.plan.status.label.paused"
				},
				{
					value: ["done"],
					label: "collab.plan.status.label.completed"
				}
			],
			filterValueIsOptionText: true
		},
		{
			key: "assignee",
			labelKey: "collab.plan.fields.owner",
			filterMultiSelect: true,
			filterValueEditor: "user"
		},
		{
			key: "source",
			labelKey: "collab.plan.fields.source",
			filterMultiSelect: true,
			pinEmptyTextKey: "collab.plan.filter.source.all"
		},
		{
			key: "priority",
			labelKey: "collab.plan.fields.priority",
			filterMultiSelect: true,
			filterOptions: [
				{
					value: ["urgent"],
					label: "collab.plan.detail.priority.urgent"
				},
				{
					value: ["high"],
					label: "collab.plan.detail.priority.high"
				},
				{
					value: ["medium"],
					label: "collab.plan.detail.priority.medium"
				},
				{
					value: ["low"],
					label: "collab.plan.detail.priority.low"
				}
			],
			filterValueIsOptionText: true
		},
		{
			key: "tags",
			labelKey: "collab.plan.fields.tags",
			filterMultiSelect: true
		},
		{
			key: "updatedAt",
			labelKey: "collab.plan.fields.updatedAt"
		},
		{
			key: "createdAt",
			labelKey: "collab.plan.fields.createdAt"
		},
		{
			key: "dueDate",
			labelKey: "collab.plan.fields.dueDate"
		},
		{
			key: "description",
			labelKey: "collab.plan.fields.description"
		},
		{
			key: "summary",
			labelKey: "collab.plan.fields.summary"
		},
		{
			key: "startedAt",
			labelKey: "collab.plan.fields.startedAt"
		}
	];
	SCHEMA_FIELD_MAP = new Map(FIELD_DEFS.map((f) => [f.key, {
		fieldTitle: f.fieldTitle,
		capabilities: {
			filterable: f.filterable ?? false,
			groupable: f.groupable ?? false,
			sortable: f.sortable ?? false
		}
	}]));
	VIEW_COLUMNS = VIEW_COLUMNS_UI.map((ui) => {
		const schema = SCHEMA_FIELD_MAP.get(ui.key);
		if (!schema) throw new Error(`[view-column-config] VIEW_COLUMNS_UI key="${ui.key}" 在 TODO_FIELDS 中找不到`);
		return {
			...ui,
			fieldTitle: schema.fieldTitle,
			capabilities: schema.capabilities
		};
	});
	HIDEABLE_COLUMN_KEYS = getHideableColumns().map((c) => c.key);
	TITLE_COLUMN_KEY = "title";
	DEFAULT_TOOLBAR_STATE = {
		conditions: {},
		groupBy: "status",
		sorts: [],
		sortAuto: true,
		mode: "board",
		visibleColumns: getHideableColumns().map((c) => c.key)
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/common/grid-selection.ts
/**
* 尝试把 `viewEntry.getView()` 转成 `GridViewLike`。
*
* 非 GRID 视图 / 尚未渲染 / view 缺 `getSelectionData` 时统一返回 `undefined`，
* 让上层能用 optional chaining 一路降级到 null / false 分支，不必逐处判断。
*/
function getGridView$1(viewEntry) {
	const view = viewEntry.getView();
	if (!view || typeof view.getSelectionData !== "function") return;
	return view;
}
/**
* 订阅选区变化。回调无参数——由调用方在回调里用 `hasSelection` / `getSelectionAnchor` /
* `getSelectionMatrix` 取最新态。
*
* @returns disposable；当前视图无 RangeModel（非 GRID 或尚未渲染）时返回 undefined。
*/
function subscribeSelectionChange(viewEntry, onChange) {
	const rangeModel = viewEntry.getRangeModel();
	if (!rangeModel) return;
	return rangeModel.onSelectionChanged(() => onChange());
}
/** 当前是否存在非空选区（有效 record 与 field 均 ≥1） */
function hasSelection(viewEntry) {
	const data = getGridView$1(viewEntry)?.getSelectionData?.();
	return Boolean(data && data.selectFieldIds.length > 0 && data.selectRecordIds.length > 0);
}
/**
* 取当前选区里所有 recordId，按视图内可见顺序排序。
*
* 与 `getSelectionAnchor` 差异：anchor 只关心"任一格"用于漂移识别；此处返回
* **全部** recordIds，用于批量操作（右键菜单"删除"要把框选的所有行一并删掉）。
*
* 与 `getSelectionMatrix` 差异：矩阵版本会同时按 recordIds × fieldIds 组行优先
* 二维数组，专为复制/粘贴/键盘删除写入路径服务；此处只关心 record 集合，
* 与字段无关——单元格框选（1 record × 多 field）与整行框选返回同样的一个 recordId。
*
* 排序：优先按 `getRecordIndex` 视图顺序排（与矩阵版本一致，方便 UI 遍历时行序稳定）；
* view 未提供 getRecordIndex 时保持 `getSelectionData` 的原顺序。
*
* @returns recordId 数组；非 GRID / 无选区 / view 未渲染 → null。
*/
function getSelectedRecordIds(viewEntry) {
	const view = getGridView$1(viewEntry);
	const data = view?.getSelectionData?.();
	if (!data) return null;
	const { selectRecordIds } = data;
	if (selectRecordIds.length === 0) return null;
	if (typeof view?.getRecordIndex === "function") return [...selectRecordIds].sort((a, b) => view.getRecordIndex(a) - view.getRecordIndex(b));
	return [...selectRecordIds];
}
/**
* 取选区锚点（recordId + fieldId 的"任一格"），不做行/列排序，附带 isSingle 标志。
*
* 与 `getSelectionMatrix` 的差异：矩阵版本会按 getRecordIndex / getVisibleFieldIds
* 排序、拼二维数组，用于复制粘贴 / 键盘删除等需要行优先遍历的写入路径；这里的锚点
* 只用于"识别选区是否漂移"（cell editor 打开时记住锚点，选区变化时比对是否等值 +
* 是否仍为单格），因此直接取 selectRecordIds[0] + selectFieldIds[0]，不需要严格
* 的左上角语义。
*
* 非 GRID / 无 getSelectionData / 空选区 → null。
*/
function getSelectionAnchor(viewEntry) {
	const data = getGridView$1(viewEntry)?.getSelectionData?.();
	if (!data) return null;
	const recordId = data.selectRecordIds[0];
	const fieldId = data.selectFieldIds[0];
	if (!recordId || !fieldId) return null;
	return {
		recordId,
		fieldId,
		isSingle: data.selectRecordIds.length === 1 && data.selectFieldIds.length === 1
	};
}
/**
* 取当前选区并映射为行优先矩阵；无选区 / 非 GRID 时返回 null。
*
* 设计要点：
* - 行列 index → recordId/fieldId 不手工换算：records 用 `GridView.getRecordIndex` 排序、
*   fields 用 `GridView.getVisibleFieldIds` 的位置排序，天然规避虚拟滚动 / 隐藏列错位；
* - 选区来源统一走 `GridView.getSelectionData()`（xtable 已处理行选/列选/框选归一），
*   不直接解析 RangeModel 的多种 selection 子类型。
*
* 消费方：`grid-copy-paste`（复制/粘贴）、`grid-keyboard-delete`（Delete 删除）。
*/
function getSelectionMatrix(viewEntry) {
	const view = getGridView$1(viewEntry);
	const data = view?.getSelectionData?.();
	if (!data) return null;
	const { selectFieldIds, selectRecordIds } = data;
	if (selectFieldIds.length === 0 || selectRecordIds.length === 0) return null;
	const orderedRecordIds = typeof view?.getRecordIndex === "function" ? [...selectRecordIds].sort((a, b) => view.getRecordIndex(a) - view.getRecordIndex(b)) : [...selectRecordIds];
	const visibleFieldIds = typeof view?.getVisibleFieldIds === "function" ? view.getVisibleFieldIds() : [];
	const fieldOrder = /* @__PURE__ */ new Map();
	visibleFieldIds.forEach((id, idx) => fieldOrder.set(id, idx));
	const orderedFieldIds = [...selectFieldIds].sort((a, b) => (fieldOrder.get(a) ?? Number.MAX_SAFE_INTEGER) - (fieldOrder.get(b) ?? Number.MAX_SAFE_INTEGER));
	return orderedRecordIds.map((recordId) => orderedFieldIds.map((fieldId) => ({
		recordId,
		fieldId
	})));
}
/**
* 清空当前选区（把 xtable-view RangeModel 切成 EMPTY_SELECTION）。
*
* 语义：等价 xtable-view 内部的 `resetSelection()`——同时清空 range / row / column / activePoint。
* 用于「删除记录后选区落到已删除行残影」的场景，让 UI 视觉复位。
*
* @returns 是否实际调用了 resetSelection（无 RangeModel → false）
*/
function resetGridSelection(viewEntry) {
	const rangeModel = viewEntry.getRangeModel();
	if (!rangeModel) return false;
	rangeModel.resetSelection();
	return true;
}
/**
* 选中指定 record 的第一个可见列单元格。
*
* 用于「在上/下方插入 1 行」/「创建副本」后把选区打到新记录的第一格——用户下一步（例如按 Enter
* 或直接输入）能立刻编辑标题字段。
*
* 实现要点：
* - IRange 用 index（不是 recordId/fieldId），因此必须用 `getRecordIndex` 反查行号，
*   用 `getVisibleFieldIds()[0]` 拿"第一个可见字段"作为列 0；
* - 目标记录不在当前视图（被筛选掉 / 分组折叠 / recordIndex 为负）时 no-op，
*   避免误选到相邻行；
* - `selectRange` 的第二个参数 activePoint 决定「蓝框中心」，与 range 同格才能让
*   xtable-view 把 ActivePointFeature 也画到那格上——只传 range 会导致 activePoint 悬空。
*
* @returns 是否实际选中了目标格（非 GRID / record 不在视图 / 无可见字段 → false）
*/
function selectFirstCellOfRecord(viewEntry, recordId) {
	const rangeModel = viewEntry.getRangeModel();
	if (!rangeModel) return false;
	const view = getGridView$1(viewEntry);
	if (!view) return false;
	const rowIndex = typeof view.getRecordIndex === "function" ? view.getRecordIndex(recordId) : -1;
	if (rowIndex < 0) return false;
	if ((typeof view.getVisibleFieldIds === "function" ? view.getVisibleFieldIds() : []).length === 0) return false;
	rangeModel.selectRange({
		startRow: rowIndex,
		endRow: rowIndex,
		startColumn: 0,
		endColumn: 0
	}, {
		row: rowIndex,
		column: 0
	});
	return true;
}
/**
* 尝试把 `viewEntry.getView()` 转成 `GroupCapableViewLike`（GRID / LIST 视图共用）。
*
* 判据：view 存在，且至少提供 `setGroupFold` / `getGoupRangeRecordIds` / `collector` 其一——
* 缺一时 setGridGroupFold / getRecordIdsByGroupPath 会各自做 typeof / 结构兜底。
*
* 非分组能力视图（KANBAN / CALENDAR / FORM 等）/ view 未渲染 → undefined。
*/
function getGroupCapableView(viewEntry) {
	const view = viewEntry.getView();
	if (!view) return;
	if (typeof view.setGroupFold !== "function" && typeof view.isAllGroupFold !== "function" && typeof view.getGoupRangeRecordIds !== "function" && !view.collector?.rows?.getTypeRows) return;
	return view;
}
/**
* 查询 GRID / LIST 视图是否处于"所有分组均已折叠"状态。
*
* 直接透传底层 `GridView.isAllGroupFold` / `ListView.isAllGroupFold`（xtable-view
* `1.1007.0-patch-smartsheet-wb-teams-20260529.98` 起提供的 public API），用于修正
* 右键菜单「折叠/展开所有分组」的文案：不能只靠 UI 侧记账，否则用户从列头单独
* 折叠 / 展开某个分组后 UI 镜像感知不到，会显示错误文案。
*
* @returns `true` 当且仅当所有分组都折叠；否则 `false`。非分组能力视图 / view
*          未挂载 / view 缺 `isAllGroupFold`（旧版 xtable-view）→ 返回 `undefined`，
*          由上层决定回退策略（保留 UI 侧镜像 or 视为未折叠）。
*/
function isAllGridGroupFold(viewEntry) {
	const view = getGroupCapableView(viewEntry);
	if (!view || typeof view.isAllGroupFold !== "function") return;
	return view.isAllGroupFold();
}
/**
* 折叠 / 展开 GRID / LIST 分组。
*
* @param options `fold` 目标状态；`groupKeys` 缺省 → 作用于全部分组（右键菜单
*                「折叠所有分组」/「展开所有分组」的核心路径）；传 `[groupPath]`
*                → 只作用于该分组（保留以支持未来单分组折叠场景）。
* @returns 是否实际调用了 setGroupFold（非分组能力视图 / view 未挂载 / view
*          未提供 setGroupFold → false）
*/
function setGridGroupFold(viewEntry, options) {
	const view = getGroupCapableView(viewEntry);
	if (!view || typeof view.setGroupFold !== "function") return false;
	view.setGroupFold({
		fold: options.fold,
		groupKeys: options.groupKeys
	});
	return true;
}
/**
* 通过 collector.rows 结构化地取分组下所有 recordId（list 视图 fallback）。
*
* 复刻 GridView `getGoupRangeRecordIds` 的算法：
* 1. `getTypeRows('GroupHead')` 找 `path.toString() === groupPath.toString()` 的 head；
* 2. `getTypeRows('RecordRange')` 里找 `index === head.index + 1` 的那一段 —— xtable-view
*    的 runGroupTree 保证 GroupHead 紧接着 RecordRange，index 严格连续；
* 3. 读 `RecordRange.recordIds`，过滤掉 list 视图的 placeholder recordId（空分组占位）。
*
* `RecordRange` 的 `recordIds` 已按视图可见顺序排列（含被折叠的子行），语义与
* GridView.getGoupRangeRecordIds 一致，"删除分组"批量删除路径直接消费即可。
*
* @returns 分组下真实 recordId 列表；分组不存在 / collector 结构异常 → []。
*/
function getRecordIdsFromCollector(view, groupPath) {
	const rows = view.collector?.rows;
	if (!rows || typeof rows.getTypeRows !== "function") return [];
	const targetHead = rows.getTypeRows("GroupHead").find((head) => head.path?.toString() === groupPath.toString());
	if (!targetHead) return [];
	const targetRange = rows.getTypeRows("RecordRange").find((range) => range.index === targetHead.index + 1);
	if (!targetRange?.recordIds) return [];
	return targetRange.recordIds.filter((id) => !id.startsWith("__list_placeholder__:"));
}
/**
* 取指定分组路径下的所有 recordId（视图内顺序）。
*
* 用途：右键「删除分组」需要拿到该分组下**全部** todo id 再走批量删除路径。
* xtable 内部方法叫 `getGoupRangeRecordIds`（拼写有 typo：Goup vs Group），
* 本层封装成正常拼写，防止 typo 扩散到 UI 代码。
*
* **路径优先级**：
* 1. view 原生提供 `getGoupRangeRecordIds`（GridView）→ 直接委托；
* 2. 未提供（ListView）→ 走 `getRecordIdsFromCollector` 结构化 fallback。
*
* @param groupPath 分组主键路径（来自 `SmartsheetContextMenuGroupHeadPayload.groupPath`）
* @returns 该分组下 recordId 数组；分组不存在 / 非分组能力视图 / view 未挂载 → 空数组
*/
function getRecordIdsByGroupPath(viewEntry, groupPath) {
	const view = getGroupCapableView(viewEntry);
	if (!view) return [];
	if (typeof view.getGoupRangeRecordIds === "function") return view.getGoupRangeRecordIds(groupPath);
	return getRecordIdsFromCollector(view, groupPath);
}
/**
* 对指定字段列执行「自动调整列宽」。
*
* 仅 GRID 视图有效（xtable-view 只在 GridView 上挂 AdaptiveColumnWidth feature）；
* 传入的 fieldIds 会被 xtable-view 内部按字段索引匹配，非法 id 会被静默忽略。
* 若 feature 未挂载（例如视图刚初始化或非 GRID 视图），此函数为 no-op，
* 上层无需感知。
*/
function autoAdaptGridColumnWidth(viewEntry, fieldIds) {
	if (!fieldIds.length) return;
	const feature = getGridView$1(viewEntry)?.getAdaptColWidthFeature?.();
	if (!feature) return;
	feature.autoAdaptColWidth(Array.from(fieldIds));
}
var init_grid_selection = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/common/keyboard-guards.ts
/**
* view-services · 共享键盘守卫。
*
* 只收敛"跨多个 view-service 都要用"的键盘判定原语。当前只有一项：
* `isEditableTarget`——`grid-keyboard-delete` 与 `undo-redo` 都要在焦点位于
* `input` / `textarea` / `contenteditable` 时放行浏览器默认。
*
* 只有 undo/redo 用得到的按键识别（`isUndoKey` / `isRedoKey`）留在
* `undo-redo/` 内部，不向此处提升——就近原则，避免 common 目录成为杂物间。
*/
/**
* 焦点是否落在可编辑元素上。
*
* 此时应放行浏览器默认按键行为（如 input 退格删字符、textarea 上下箭头移动光标），
* 键盘 controller 不应拦截。
*/
function isEditableTarget$1(el) {
	if (!el) return false;
	const tag = el.tagName;
	if (tag === "INPUT" || tag === "TEXTAREA") return true;
	return el.isContentEditable === true;
}
var init_keyboard_guards$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/common/index.ts
var init_common = __esmMin((() => {
	init_grid_selection();
	init_keyboard_guards$1();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/emitter/index.js
function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of$1(subClass, superClass);
}
function _set_prototype_of$1(o, p) {
	_set_prototype_of$1 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of$1(o, p);
}
var import_main$1, ViewEmitter;
var init_emitter = __esmMin((() => {
	init_event();
	import_main$1 = require_main();
	ViewEmitter = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits$1(ViewEmitter, Disposable);
		function ViewEmitter() {
			var _this = Disposable.call(this) || this;
			_this.globalEmitter = _this._register(new Emitter());
			_this.global = {
				scroll: new Emitter(),
				resize: new Emitter(),
				contextMenu: new Emitter(),
				dblclick: new Emitter(),
				click: new Emitter(),
				mouseup: new Emitter(),
				mousedown: new Emitter(),
				mouseleave: new Emitter(),
				mousemove: new Emitter(),
				afterCollect: new Emitter()
			};
			_this.service = {
				tooltip: new Emitter(),
				stat: new Emitter(),
				statOperator: new Emitter(),
				fieldEditor: new Emitter(),
				expandRow: new Emitter(),
				expandHideRow: new Emitter(),
				addFieldClickEmitter: new Emitter(),
				addRecordClickEmitter: new Emitter(),
				editGroupClickEmitter: new Emitter(),
				activedRecordChanged: new Emitter(),
				activePointEditor: new Emitter(),
				moveGroupEmitter: new Emitter(),
				onFloatLayerPositionChange: new Emitter(),
				scaleChange: new Emitter(),
				moveGroupTooltip: new Emitter(),
				hideSearchPanel: new Emitter(),
				viewRenderBegin: new Emitter(),
				viewRenderEnd: new Emitter(),
				showSearchPanel: new Emitter(),
				expandDateConfigSetting: new Emitter(),
				ganttRecordFillTime: new Emitter(),
				ganttOpenDimensionSwitch: new Emitter(),
				kanbanGroupMenuEditor: new Emitter(),
				kanbanGroupTitleEditor: new Emitter(),
				kanbanMobileGroupMenuEditor: new Emitter(),
				searchChange: new Emitter(),
				collapseKanbanGroup: new Emitter(),
				setTemporaryCell: new Emitter(),
				setKeepScrollState: new Emitter(),
				schedulePanel: new Emitter(),
				unplanSchedulePanel: new Emitter(),
				scheduleOperation: new Emitter(),
				expandRowModal: new Emitter(),
				locationPreview: new Emitter(),
				showfieldEditPanel: new Emitter(),
				calendarHorizontalScroll: new Emitter(),
				onDashboardLiteColumnWidthChanged: new Emitter(),
				expandDashBoardRecord: new Emitter(),
				onDashboardLiteExpandIconChanged: new Emitter(),
				openFilterPanel: new Emitter(),
				openGroupMoreEditor: new Emitter(),
				openContextMenu: new Emitter(),
				attachmentUploadStateChange: new Emitter(),
				fieldTitleContextMenuEmitter: new Emitter(),
				editFieldTitleClickEmitter: new Emitter(),
				fieldTypeEditorToggle: new Emitter(),
				selectionStat: new Emitter(),
				cellStatusChangeEmmiter: new Emitter()
			};
			_this.action = {
				tap: new Emitter(),
				stageScroll: new Emitter(),
				touchstart: new Emitter(),
				touchmove: new Emitter(),
				touchend: new Emitter()
			};
			_this.wbService = {
				onRecordClick: new Emitter(),
				onGroupAddClick: new Emitter(),
				onRecordSelectChange: new Emitter(),
				onRecordMiniListShow: new Emitter(),
				onSubDepthLimit: new Emitter(),
				onGridExpandChange: new Emitter()
			};
			return _this;
		}
		var _proto = ViewEmitter.prototype;
		_proto.dispose = function dispose(trace) {
			Object.keys(this.global).forEach((eventName) => {
				var _a;
				return (_a = this.global[eventName]) === null || _a === void 0 ? void 0 : _a.dispose();
			});
			Object.keys(this.service).forEach((eventName) => {
				var _a;
				return (_a = this.service[eventName]) === null || _a === void 0 ? void 0 : _a.dispose();
			});
			Object.keys(this.action).forEach((eventName) => {
				var _a;
				return (_a = this.action[eventName]) === null || _a === void 0 ? void 0 : _a.dispose();
			});
			Disposable.prototype.dispose.call(this, trace);
		};
		return ViewEmitter;
	}(import_main$1.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/fetch-view.js
function fetchViewConstructor(viewType) {
	return __awaiter(this, void 0, void 0, function* () {
		switch (viewType) {
			case ViewType.GRID: return (yield __vitePreload(() => import(
				/* webpackChunkName: "smartsheet-grid-view" */
				"./grid-INmCojgK.js"
), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]), import.meta.url)).GridView;
			case ViewType.KANBAN:
				if (domainConfig.getIsWb()) return (yield __vitePreload(() => import(
					/* webpackChunkName: "smartsheet-kanban-todo-view" */
					"./kanban-todo-fozEDZ4G.js"
), __vite__mapDeps([61,62,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,63,52,55,64,58,65,53,57]), import.meta.url)).KanbanTodoView;
				return (yield __vitePreload(() => import(
					/* webpackChunkName: "smartsheet-kanban-view" */
					"./kanban-Cja7Cg5i.js"
), __vite__mapDeps([66,67,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,63,52,55,64,58,68,56]), import.meta.url)).KanbanView;
			case ViewType.GALLERY: return (yield __vitePreload(() => import(
				/* webpackChunkName: "smartsheet-gallery-view" */
				"./gallery-Ct1Nkkx2.js"
), __vite__mapDeps([69,70,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,63,52,55,68,56,59]), import.meta.url)).GalleryView;
			case ViewType.GANTT: return (yield __vitePreload(() => import(
				/* webpackChunkName: "smartsheet-gantt-view" */
				"./gantt-Bz5gOpx_.js"
), __vite__mapDeps([71,72,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,1,50,51,52,53,54,55,56,57,58,59,60,73]), import.meta.url)).GanttView;
			case ViewType.CALENDAR: return (yield __vitePreload(() => import(
				/* webpackChunkName: "smartsheet-calendar-view" */
				"./calendar-Dq-25mz0.js"
), __vite__mapDeps([74,75,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,51,73,55,57]), import.meta.url)).CalendarView;
			case ViewType.LIST: return (yield __vitePreload(() => import(
				/* webpackChunkName: "smartsheet-grid-list-view" */
				"./grid-list-C-52BvO9.js"
), __vite__mapDeps([76,77,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,53,54,65,57,78]), import.meta.url)).ListView;
			default: throw new Error(`不支持的视图类型：${viewType}.`);
		}
	});
}
var init_fetch_view = __esmMin((() => {
	init_tslib_es6();
	init_es$1();
	init_es$2();
	init_preload_helper();
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/enrty.js
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _set_prototype_of(subClass, superClass);
}
function _set_prototype_of(o, p) {
	_set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _set_prototype_of(o, p);
}
var import_main, ViewEntry;
var init_enrty = __esmMin((() => {
	init_tslib_es6();
	import_main = require_main();
	init_es$1();
	init_emitter();
	init_fetch_view();
	init_performance();
	ViewEntry = /* @__PURE__ */ function(Disposable) {
		"use strict";
		_inherits(ViewEntry, Disposable);
		function ViewEntry(context) {
			var _this = Disposable.call(this) || this;
			_this.context = context;
			/**
			* 渲染层对外事件 emitter
			* */ _this.emitter = _this._register(new ViewEmitter());
			/**
			* 存活状态，由于切表后视图都是销毁的，内部状态都会被重置
			* 当需要切表回来后仍然保持某种状态但又不希望存到 localStorage 时，可以存到这里
			* */ _this.liveState = /* @__PURE__ */ new Map();
			_this.renderScale = 1;
			return _this;
		}
		var _proto = ViewEntry.prototype;
		_proto.render = function render(viewType, source, renderScale = 1) {
			var _a, _b, _c;
			return __awaiter(this, void 0, void 0, function* () {
				if (!viewType) return;
				logger.info(`[xview][渲染视图]入口开始 type=${viewType}`);
				performanceReport.common.markViewRenderStart();
				this.renderScale = renderScale;
				performanceReport.common.markViewScriptFetchStart();
				var ViewConstructor = yield fetchViewConstructor(viewType);
				performanceReport.common.markViewScriptFetchEnd(this.context);
				this.destroy();
				try {
					performanceReport.common.markViewBuildStart();
					this.currentView = this._register(new ViewConstructor(this.getContext()));
					performanceReport.common.markViewBuildEnd(this.context);
				} catch (e) {
					logger.error("[xview][视图渲染]入口: 构建视图渲染异常", e);
					logger.report(WeblogReportKey.RENER_VIEW_FAIL);
					reporter.metricsWDocs({
						module: WDOCS_BUSINESS_REPORT_MODULE.RENDERER,
						action: WDOCS_BUSINESS_REPORT_ACTION.FAIL,
						scene: `${viewType}`,
						opername: "render",
						str1: "xview",
						str2: e.message,
						str3: `[${e.name}] ${(_a = e.stack) === null || _a === void 0 ? void 0 : _a.substring(0, 5e3)}`,
						str5: `${(_b = this.context.getCurrentTable()) === null || _b === void 0 ? void 0 : _b.id}${(_c = this.context.getCurrentView()) === null || _c === void 0 ? void 0 : _c.id}`
					});
					throw e;
				}
				performanceReport.common.markViewRenderEnd(this.context);
				logger.info(`[xview][渲染视图]入口结束 type=${viewType}`);
			});
		};
		_proto.rerender = function rerender(forcePatch = false) {
			var _a, _b;
			(_a = this.currentView) === null || _a === void 0 || _a.collector.patch(forcePatch ? [] : void 0);
			(_b = this.currentView) === null || _b === void 0 || _b.render();
		};
		_proto.getView = function getView() {
			return this.currentView;
		};
		_proto.destroy = function destroy() {
			var _a;
			(_a = this.currentView) === null || _a === void 0 || _a.dispose();
			this.currentView = void 0;
		};
		_proto.getRangeModel = function getRangeModel() {
			if (this.currentView && "getRangeModel" in this.currentView) return this.currentView.getRangeModel();
		};
		_proto.getContext = function getContext() {
			return new Proxy({
				emitter: this.emitter,
				liveState: this.liveState,
				getScale: () => this.renderScale
			}, { get: (obj, prop) => prop in obj ? obj[prop] : this.context[prop] });
		};
		return ViewEntry;
	}(import_main.Disposable);
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/enrty.interface.js
var init_enrty_interface = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/interface/offset.js
var init_offset = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/interface/xtable-for-render.lite.js
var init_xtable_for_render_lite = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/float-state/interface.js
var ExtraFloatLayerType;
var init_interface = __esmMin((() => {
	(function(ExtraFloatLayerType) {
		ExtraFloatLayerType[ExtraFloatLayerType["FORMULA_EDITOR"] = 0] = "FORMULA_EDITOR";
		ExtraFloatLayerType[ExtraFloatLayerType["DEFAULT"] = 1] = "DEFAULT";
	})(ExtraFloatLayerType || (ExtraFloatLayerType = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/column-selection/index.interface.js
var init_index_interface$3 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/event.interface.js
var init_event_interface = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/range-selection/index.interface.js
var init_index_interface$2 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/plugins/range-model/row-selection/index.interface.js
var init_index_interface$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/utils.js
var CARD_VIEW_LAYOUT_TYPE;
var init_utils = __esmMin((() => {
	(function(CARD_VIEW_LAYOUT_TYPE) {
		CARD_VIEW_LAYOUT_TYPE[CARD_VIEW_LAYOUT_TYPE["GROUP_HEAD"] = 0] = "GROUP_HEAD";
		CARD_VIEW_LAYOUT_TYPE[CARD_VIEW_LAYOUT_TYPE["RECORD"] = 1] = "RECORD";
	})(CARD_VIEW_LAYOUT_TYPE || (CARD_VIEW_LAYOUT_TYPE = {}));
}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/views/calendar/collector/index.interface.js
var init_index_interface = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/xtable-view/es/index.js
var init_es = __esmMin((() => {
	init_emitter();
	init_interface$1();
	init_enrty();
	init_enrty_interface();
	init_common$1();
	init_config();
	init_offset();
	init_xtable_for_render_lite();
	init_interface();
	init_index_interface$3();
	init_event_interface();
	init_index_interface$5();
	init_index_interface$2();
	init_index_interface$1();
	init_render_app_config();
	init_index_interface$4();
	init_utils$1();
	init_copyright();
	init_checkbox_icon();
	init_field_icon();
	init_hyperlink_icon();
	init_normal_icon();
	init_utils();
	init_index_interface();
	init_cursor();
	init_fetch_view();
})), FillColor$1, add_1_record$1, add_field_2$1, ai_client_tips$1, ai_custom$1, ai_entry_calculate$1, ai_entry_classify$1, ai_entry_formula$1, ai_entry_generate$1, ai_entry_judge$1, ai_entry_lookup$1, ai_field_has_deleted_changed$1, ai_field_select_hint_attachment$1, ai_field_select_hint_date$1, ai_field_select_hint_number$1, ai_field_select_hint_select$1, ai_generate_count$1, ai_generate_fail$1, ai_generate_fail_deps_all_empty$1, ai_generate_stop$1, ai_generating$1, ai_label$1, ai_loop_trigger$1, ai_placeholder_calculate$1, ai_placeholder_classify$1, ai_placeholder_formula$1, ai_placeholder_generate$1, ai_placeholder_generate_image$1, ai_placeholder_judge$1, ai_placeholder_lookup$1, ai_smart_field_input$1, ai_smart_field_prompt$1, ai_smart_field_prompt_desc$1, ai_smart_field_prompt_example$1, ai_smart_formula$1, ai_smart_script$1, ai_stopped$1, ai_use_limit_month$1, ai_use_limit_today$1, api_doc_edit_toast$1, apostrophe$1, at_least_one_view$1, auto_num_generating$1, auto_set_primary_field_will_change_permission_content$1, auto_set_primary_field_will_change_permission_title$1, bigdata_unable_to_open$1, cancel$1, cannot_move_primary_field$1, canvas_tip_add_record$1, capacity_exceeded$1, category$1, category_field$1, category_prompt$1, category_prompt_desc$1, category_prompt_desc_new$1, category_prompt_example$1, cell_max_size_reach$1, cell_max_size_reach_content$1, checkbox$1, click_to_refresh$1, col_attr_setting$1, collab_error_tip$1, collection_form$1, color_blue$1, color_dark$1, color_gray$1, color_green$1, color_light$1, color_orange$1, color_pink$1, color_purple$1, color_sky_blue$1, color_white$1, color_yellow$1, confirm$1, confirm2$1, continue_delete$1, continue_modify$1, continue_switch$1, cookie_expired_and_try_aggin$1, copy2$1, copy_col$1, created_time_explanation$1, created_user_explanation$1, custom_prompt$1, custom_prompt_desc_new$1, custom_prompt_example$1, dashboard$1, dashboard_component_num_limit$1, data_loading$1, date$1, default_query_result_title$1, del$1, delete_field_is_gantt_date_field$1, delete_field_is_kanban_group$1, delete_field_will_change_permission_content1$1, delete_field_will_change_permission_content2$1, delete_field_will_change_permission_title$1, delete_include_primary_field$1, dim_month$1, end_date$1, field$1, field_attachment$1, field_auto_number$1, field_barcode$1, field_create_time$1, field_creator$1, field_currency$1, field_email$1, field_exist_in_other_field_group$1, field_formula$1, field_group$1, field_group_b$1, field_group_max_size_reach$1, field_group_max_size_reach_content$1, field_group_name_too_long$1, field_last_edit_time$1, field_last_editor$1, field_link_records$1, field_location$1, field_lookup$1, field_max_size_reach$1, field_max_size_reach_content$1, field_not_support_option_group$1, field_number$1, field_percent$1, field_progress$1, field_tel$1, field_title$1, field_type_image$1, field_user$1, file_not_support_svg$1, file_not_support_type$1, filler$1, filter$1, form_collection_results$1, formula_array_data_oversize_default_message$1, formula_brackets_not_match_detail_message$1, formula_brackets_not_match_message$1, formula_calc_error_categories$1, formula_circle_categories$1, formula_circle_default_message$1, formula_circle_detail_message$1, formula_complex_formula_skip_default_message$1, formula_content_deleted_categories$1, formula_content_permission_limit_default_message$1, formula_convert_error_categories$1, formula_convert_error_default_message$1, formula_convert_error_detail_message$1, formula_convert_to_date_detail_message$1, formula_convert_to_double_detail_message$1, formula_division_by_zero_default_message$1, formula_dottable_default_message$1, formula_error_default_message$1, formula_explanation$1, formula_field_in_quotes_default_message$1, formula_field_not_existed_default_message$1, formula_formula_error_categories$1, formula_illegal_argument_default_message$1, formula_illegal_char_default_message$1, formula_incomplete_formula_categories$1, formula_invalid_param_default_message$1, formula_invalid_params_categories$1, formula_loading$1, formula_lookup_property_error_default_message$1, formula_missing_field_id_in_filter_for_ss_default_message$1, formula_missing_field_on_each_default_message$1, formula_missing_table_on_field_ref_default_message$1, formula_nested_filter_default_message$1, formula_param_calc_error_default_message$1, formula_param_should_be_greater_than_detail_message$1, formula_param_should_be_greater_than_or_equal_detail_message$1, formula_param_should_be_less_than_detail_message$1, formula_param_should_be_less_than_or_equal_detail_message$1, formula_parameter_exceeded_default_message$1, formula_parameter_exceeded_detail_message1$1, formula_parameter_exceeded_detail_message2$1, formula_parameter_missing_default_message$1, formula_parameter_missing_detail_message1$1, formula_parameter_missing_detail_message2$1, formula_performance_exceeded_categories$1, formula_result_exceeds_cell_32k_limit_default_message$1, formula_table_not_existed_default_message$1, formula_table_ref_not_supported_for_ss_default_message$1, formula_table_sumif_error_default_message$1, formula_text_without_quote_detail_message$1, formula_text_without_quote_slice_detail_message$1, formula_too_many_sub_process_default_message$1, formula_uninterrupted_default_message$1, formula_unknown_function_default_message$1, formula_unknown_function_detail_message$1, formula_unknown_name_default_message$1, formula_unknown_name_detail_message$1, formula_unrecognied_formula_categories$1, formula_upstream_standard_cell_error_default_message$1, get_link$1, group$1, hide_col$1, image_comprehension$1, image_comprehension_field$1, image_comprehension_prompt$1, image_comprehension_prompt_desc_new$1, image_comprehension_prompt_example$1, information_extraction$1, information_extraction_custom_prompt$1, information_extraction_custom_prompt_example$1, information_extraction_field$1, information_extraction_prompt_desc_new$1, input_valid_email$1, instruction_page$1, is_not_primary_field_types$1, left$1, link_records_explanation$1, m_bigdata_unable_to_open$1, m_open_with_pc$1, modified_time_explanation$1, modified_user_explanation$1, modify_date_time_field_is_gantt_date_field$1, modify_field_is_kanban_group$1, multiple_select$1, no_permission$1, no_permission_to_copy_formula_field$1, no_permission_to_create_view$1, no_permission_to_delete_view$1, no_permission_to_edit_field_group$1, no_permission_to_edit_view_config$1, no_permission_to_fill_selection$1, no_permission_to_fill_single_selection$1, no_permission_to_insert_record$1, no_permission_to_insert_record_external_restrict$1, no_permission_to_insert_record_in_group$1, no_permission_to_insert_record_in_group_restrict$1, no_permission_to_insert_table$1, no_permission_to_move_group_record_external_restrict$1, no_permission_to_move_record$1, no_permission_to_move_view$1, no_permission_to_read_link_field$1, no_permission_to_read_link_table$1, no_permission_to_redo$1, no_permission_to_set_primary_field$1, no_permission_to_set_primary_field_toc$1, no_permission_to_undo$1, not_find_field_group$1, nth$1, operation_invalid$1, option_unmber$1, paste_max_cell_reach$1, query_data_sources$1, quick_filter_over_size$1, record_copy_b$1, record_max_size_reach$1, record_max_size_reach_content$1, refresh_and_try$1, render_field_stat_calculating$1, request_run_catch_error$1, reselect_paste_area$1, right$1, set_field_attributes_will_change_permission_content$1, set_field_attributes_will_change_permission_content_link_record$1, set_field_attributes_will_change_permission_content_lookup_dependency$1, set_field_attributes_will_change_permission_property_only_title$1, set_field_attributes_will_change_permission_title$1, set_primary_field_will_change_permission_content$1, set_primary_field_will_change_permission_title$1, sheet_name_31$1, sheet_name_characters_invalid$1, sheet_name_characters_unprinted$1, single_choice$1, single_choice_default_value1$1, single_choice_default_value2$1, single_choice_default_value3$1, single_choice_ques$1, single_select$1, smartcanvas$1, smartsheet$1, sort$1, sort_records$1, start_date$1, sub_table$1, summary$1, summary_field$1, summary_prompt$1, summary_prompt_desc$1, summary_prompt_desc_new$1, summary_prompt_example$1, table_loading$1, table_max_size_reach$1, tag_field$1, tag_prompt$1, tag_prompt_desc$1, tag_prompt_desc_new$1, tag_prompt_example$1, ten_thousand$1, text$1, text_ques$1, the_feature$1, title_empty$1, title_exist$1, unauthorized_record$1, unknown_error$1, unname$1, unname_record$1, unnamed_calendar$1, unnamed_form$1, unnamed_gallery$1, unnamed_gantt$1, unnamed_kanban$1, unnamed_list$1, unnamed_query$1, unnamed_table$1, untitled$1, update_content$1, update_tip$1, update_version_err$1, user_explanation$1, view$1, view_calendar$1, view_form$1, view_gantt$1, view_kanban$1, view_list$1, view_max_size_reach$1, view_not_support_frozen_field_count$1, view_not_support_group$1, view_personal_disabled_1$1, view_personal_disabled_2$1, view_photo$1, view_query$1, view_setting$1, view_table$1, wecom_call_phone_error$1, wecom_send_email_error$1, x_month_1$1, x_month_10$1, x_month_10_day$1, x_month_11$1, x_month_11_day$1, x_month_12$1, x_month_12_day$1, x_month_1_day$1, x_month_2$1, x_month_2_day$1, x_month_3$1, x_month_3_day$1, x_month_4$1, x_month_4_day$1, x_month_5_day$1, x_month_6$1, x_month_6_day$1, x_month_7$1, x_month_7_day$1, x_month_8$1, x_month_8_day$1, x_month_9$1, x_month_9_day$1, x_year$1, x_year_month_1$1, x_year_month_10$1, x_year_month_11$1, x_year_month_12$1, x_year_month_2$1, x_year_month_3$1, x_year_month_4$1, x_year_month_5$1, x_year_month_6$1, x_year_month_7$1, x_year_month_8$1, x_year_month_9$1, 不展示$1, 中$1, 今天$1, 优先级$1, 修改字段设置$1, 全选$1, 公式计算结果不可直接编辑$1, 共$1, 刚刚$1, 创建人$1, 创建时间$1, 前一月$1, 前一页$1, 加载中$1, 去重$1, 去重占比$1, 去重计数$1, 发送邮件$1, 取消$1, 取消全选$1, 后一月$1, 后一页$1, 周$1, 周一$1, 周三$1, 周二$1, 周五$1, 周六$1, 周四$1, 周日$1, 图片数$1, 处理人$1, 天$1, 季$1, 学员$1, 完成时间$1, 客户$1, 客户跟进总结$1, 展开分组$1, 展开此行$1, 工作日$1, 已勾选$1, 已勾选占比$1, 已填写$1, 已填写占比$1, 已填写计数$1, 已完成$1, 已暂停$1, 已生成的内容将保留, 已筛选$1, 已选择单元格$1, 已选择字段$1, 已选择记录$1, 平均$1, 平均值$1, 年$1, 开始总结$1, 开始日期$1, 当前数值大于进度条目标值$1, 当前数值小于进度条起始值$1, 待开始$1, 待添加人进行总结$1, 待群主进行总结$1, 总数$1, 总结$1, 截止日期$1, 折叠分组$1, 拖拽调整冻结区域$1, 拨打电话$1, 按周查看$1, 按季查看$1, 按年查看$1, 按月查看$1, 描述$1, 插入位置$1, 操作记录$1, 文件数$1, 新建分组$1, 无$1, 无日期记录$1, 无权限的字段$1, 无权限的记录$1, 无法撤销此操作$1, 无法重做此操作$1, 显示表格$1, 暂停原因$1, 暂无事项$1, 更新人$1, 更新时间$1, 最早$1, 最早时间$1, 最晚$1, 最晚时间$1, 月$1, 未勾选$1, 未勾选占比$1, 未命名记录$1, 未填写$1, 未填写占比$1, 未设置$1, 来源$1, 标签$1, 标题$1, 此列类型不支持编辑分组$1, 此记录将按照分组规则调整至其他分组$1, 此记录将按照排序规则调整至其他位置$1, 没有文档查看权限$1, 添加一列$1, 添加一行$1, 添加列$1, 添加记录$1, 父任务$1, 状态$1, 由于权限设置无法查看该题目$1, 空$1, 紧急$1, 终点$1, 统计$1, 自动计算$1, 范围$1, 行数$1, 计数$1, 记录行数$1, 设置时间$1, 请升级企业微信版本后打开$1, 请在企业微信内打开$1, 请选择$1, 调整中$1, 起点$1, 跟进总结$1, 输入待办标题$1, 输入电话号$1, 输入邮箱$1, 进行中$1, 迭代$1, 选项$1, 重新配置$1, 阻塞原因$1, 附件$1, 隐藏表格$1, 高$1, smartsheet_en_US_default;
var init_smartsheet_en_US = __esmMin((() => {
	FillColor$1 = "Fill Color";
	add_1_record$1 = "Add record";
	add_field_2$1 = "Add field";
	ai_client_tips$1 = "For example: \"Extract customer intentions and generate service suggestions\"";
	ai_custom$1 = "Custom generation with AI";
	ai_entry_calculate$1 = "Calculate with AI";
	ai_entry_classify$1 = "Match Tags with AI";
	ai_entry_formula$1 = "Generate formula with AI";
	ai_entry_generate$1 = "Generate with AI";
	ai_entry_judge$1 = "Judge with AI";
	ai_entry_lookup$1 = "Lookup with AI";
	ai_field_has_deleted_changed$1 = "The referenced field has been changed or deleted";
	ai_field_select_hint_attachment$1 = "Please select an attachment field";
	ai_field_select_hint_date$1 = "Please select a date field";
	ai_field_select_hint_number$1 = "Please select a number field";
	ai_field_select_hint_select$1 = "Please select an option field";
	ai_generate_count$1 = "{{count}} records have been generated with AI";
	ai_generate_fail$1 = "Generation with AI failed, please try again later";
	ai_generate_fail_deps_all_empty$1 = "The field to be analyzed is empty, please enter content and try again.";
	ai_generate_stop$1 = "Failed to stop generating with AI. Please try again later";
	ai_generating$1 = "Generating with AI in progress, please try again later";
	ai_label$1 = "Label matching";
	ai_loop_trigger$1 = "There is a loop trigger, AI cannot update automatically";
	ai_placeholder_calculate$1 = "Help me calculate";
	ai_placeholder_classify$1 = "Help me classify";
	ai_placeholder_formula$1 = "Help me write a formula";
	ai_placeholder_generate$1 = "Help me generate";
	ai_placeholder_generate_image$1 = "Help me generate an image";
	ai_placeholder_judge$1 = "Help me judge";
	ai_placeholder_lookup$1 = "Help me lookup";
	ai_smart_field_input$1 = "Select fields";
	ai_smart_field_prompt$1 = "Describe your requirement";
	ai_smart_field_prompt_desc$1 = "Describe the formula/script logic in natural language. Field references are supported.";
	ai_smart_field_prompt_example$1 = "For example: Multiply \"Unit Price\" by \"Quantity\" and round the result to 2 decimal places";
	ai_smart_formula$1 = "AI Formula";
	ai_smart_script$1 = "AI Script";
	ai_stopped$1 = "Generation with AI stopped";
	ai_use_limit_month$1 = "The usage limit for AI fields this month has been reached. Please continue to use it next month";
	ai_use_limit_today$1 = "The usage limit for AI field today has been reached. Please continue using it tomorrow";
	api_doc_edit_toast$1 = "This smart sheet contains the {{showName}} app. Your edits can be accessed by the app.";
	apostrophe$1 = "子表名称的起止位置不能为单引号 ' ，请尝试修改单引号位置。";
	at_least_one_view$1 = "At least one public view in a table";
	auto_num_generating$1 = "Generating...";
	auto_set_primary_field_will_change_permission_content$1 = "The minimum permission for a record title is “viewable”. Members who have the permission to view the record can view the new title “{{fieldTitle}}”.";
	auto_set_primary_field_will_change_permission_title$1 = "This column is used as the title. Modifying it will affect data permissions.";
	bigdata_unable_to_open$1 = "The current data table has too many records, and it is temporarily not supported for viewing.";
	cancel$1 = "Cancel";
	cannot_move_primary_field$1 = "Cannot move primary field in Kanban or Gallery";
	canvas_tip_add_record$1 = "Add a row";
	capacity_exceeded$1 = "Document capacity exceeded";
	category$1 = "Category";
	category_field$1 = "Select a field to categorize";
	category_prompt$1 = "Custom categorization requirements";
	category_prompt_desc$1 = "Add custom requirements for categorization to meet personalized summary needs";
	category_prompt_desc_new$1 = "Call the AI model with user-defined custom prompts, taking the current row data as input and returning the model output result as is.";
	category_prompt_example$1 = "For example: 1. Categorize \"Page cannot be accessed, affecting normal work\" as \"Negative feedback\"; 2. If the feedback lacks effective information, categorize it as \"Neutral feedback\"";
	cell_max_size_reach$1 = "Worksheet cell count exceeded the limit.";
	cell_max_size_reach_content$1 = "Each worksheet can accommodate up to {{limit}} million cells.";
	checkbox$1 = "Checkbox";
	click_to_refresh$1 = "Click to refresh";
	col_attr_setting$1 = "Modify field";
	collab_error_tip$1 = "Other collaborators updated their content.";
	collection_form$1 = "Collection Form";
	color_blue$1 = "Blue";
	color_dark$1 = "dark";
	color_gray$1 = "Gray";
	color_green$1 = "Green";
	color_light$1 = "Light";
	color_orange$1 = "Orange";
	color_pink$1 = "Pink";
	color_purple$1 = "Purple";
	color_sky_blue$1 = "Sky Blue";
	color_white$1 = "White";
	color_yellow$1 = "Yellow";
	confirm$1 = "Confirm";
	confirm2$1 = "Confirm";
	continue_delete$1 = "Continue";
	continue_modify$1 = "Continue to modify";
	continue_switch$1 = "Continue";
	cookie_expired_and_try_aggin$1 = "Login status expired, please log in again";
	copy2$1 = "copy";
	copy_col$1 = "Duplicate column";
	created_time_explanation$1 = "Automatically display the creation time of each row of records, which cannot be modified";
	created_user_explanation$1 = "Automatically display the creator of each row of records, which cannot be modified";
	custom_prompt$1 = "Enter instructions";
	custom_prompt_desc_new$1 = "Call the AI model with user-defined custom prompts, taking the current row data as input and returning the model output result as is.";
	custom_prompt_example$1 = "For example: Combine \"product name\" and \"usage scenario\" to generate a promotion post for WeChat Moments";
	dashboard$1 = "Dashboard";
	dashboard_component_num_limit$1 = "The current number of dashboard components has reached the upper limit. Please delete some components and try again.";
	data_loading$1 = "Data loading, open for editing after loading";
	date$1 = "Date";
	default_query_result_title$1 = "Query Result";
	del$1 = "Delete";
	delete_field_is_gantt_date_field$1 = "This column is the start/end date column of \"{{viewsName}}\", are you sure you want to delete it?";
	delete_field_is_kanban_group$1 = "The {{viewsName}} is grouped by this column. Deleting the column will invalidate {{viewsName}}. Delete?";
	delete_field_will_change_permission_content1$1 = "Data permissions are determined by the “{{fieldTitle}}” field. Deleting it will affect the range of records visible to members.";
	delete_field_will_change_permission_content2$1 = "Data permissions are determined by some fields. Deleting a field will affect the range of records visible to members.";
	delete_field_will_change_permission_title$1 = "Deleting the field type will affect the permissions.";
	delete_include_primary_field$1 = "Due to view display requirements, at least one column must be of type 'text, number, link, date, phone, email, progress, formula'";
	dim_month$1 = "month";
	end_date$1 = "End time";
	field$1 = "field";
	field_attachment$1 = "Files";
	field_auto_number$1 = "Auto Numbering";
	field_barcode$1 = "barcode";
	field_create_time$1 = "Created time";
	field_creator$1 = "Created by";
	field_currency$1 = "Currency";
	field_email$1 = "Email";
	field_exist_in_other_field_group$1 = "The field already exists in another field group";
	field_formula$1 = "Formula";
	field_group$1 = "field group";
	field_group_b$1 = "Group";
	field_group_max_size_reach$1 = "Worksheet field group count exceeded the limit.";
	field_group_max_size_reach_content$1 = "Each worksheet can have up to {{limit}} field groups.";
	field_group_name_too_long$1 = "Field group name cannot exceed {{length}} characters";
	field_last_edit_time$1 = "Last modified time";
	field_last_editor$1 = "Last modified by";
	field_link_records$1 = "Relation";
	field_location$1 = "Location";
	field_lookup$1 = "Lookup";
	field_max_size_reach$1 = "Worksheet column count exceeded the limit.";
	field_max_size_reach_content$1 = "Each worksheet can have up to {{limit}} columns.";
	field_not_support_option_group$1 = "The field does not support option group";
	field_number$1 = "Number";
	field_percent$1 = "Percentage";
	field_progress$1 = "Progress";
	field_tel$1 = "Phone number";
	field_title$1 = "Field title";
	field_type_image$1 = "Picture";
	field_user$1 = "Collaborator";
	file_not_support_svg$1 = "Uploading SVG format images is not supported currently";
	file_not_support_type$1 = "Some pictures failed to upload, the pictures are damaged or do not support this format.";
	filler$1 = "Filler";
	filter$1 = "Filter";
	form_collection_results$1 = "Form collection results";
	formula_array_data_oversize_default_message$1 = "Data volume exceeds the formula calculation limit.";
	formula_brackets_not_match_detail_message$1 = "Missing {{type}} bracket, please check if the brackets are paired.";
	formula_brackets_not_match_message$1 = "Brackets not match.";
	formula_calc_error_categories$1 = "Calculation error";
	formula_circle_categories$1 = "Circular Reference";
	formula_circle_default_message$1 = "A circular reference exists. Modify the formula.";
	formula_circle_detail_message$1 = "Circular references exist between formula fields {{currTitle}} and {{circleTitle}}. Modify the formula.";
	formula_complex_formula_skip_default_message$1 = "Complex formula, skipped.";
	formula_content_deleted_categories$1 = "Content has been deleted";
	formula_content_permission_limit_default_message$1 = "Please view the calculation results in the smartsheet.";
	formula_convert_error_categories$1 = "Type conversion error";
	formula_convert_error_default_message$1 = "Unable to convert type, please change the output type.";
	formula_convert_error_detail_message$1 = "Unable to convert to {{formatterName}}, please change the output type.";
	formula_convert_to_date_detail_message$1 = "The parameter \"{{currValue}\" in \"{{formulaName}}\" cannot be parsed as a date/time.";
	formula_convert_to_double_detail_message$1 = "The {{paramOrdinal}} parameter in the \"{{formulaName}}\" function must be a numeric value, but \"{{currValue}}\" cannot be converted to a number.";
	formula_division_by_zero_default_message$1 = "Divisor cannot be zero.";
	formula_dottable_default_message$1 = "The full table reference can only be the first parameter in the FILTER function.";
	formula_error_default_message$1 = "Calculation error.";
	formula_explanation$1 = "You can perform function calculations by formula column";
	formula_field_in_quotes_default_message$1 = "Unrecognized quotes. Remove extra quotes.";
	formula_field_not_existed_default_message$1 = "The field has been deleted. Select again.";
	formula_formula_error_categories$1 = "Incorrect formula";
	formula_illegal_argument_default_message$1 = "Incorrect parameter.";
	formula_illegal_char_default_message$1 = "Incomplete formula.";
	formula_incomplete_formula_categories$1 = "Incomplete formula";
	formula_invalid_param_default_message$1 = "Invalid parameter value.";
	formula_invalid_params_categories$1 = "Invalid parameter value";
	formula_loading$1 = "Calculating...";
	formula_lookup_property_error_default_message$1 = "Unable to calculate. Field settings incomplete.";
	formula_missing_field_id_in_filter_for_ss_default_message$1 = "To reference a full table, the FILTER function must specify the referenced fields.";
	formula_missing_field_on_each_default_message$1 = "When referencing the entire table, the EACH parameter within the FILTER/COUNTIF/SUMIF function needs to reference specific fields.";
	formula_missing_table_on_field_ref_default_message$1 = "Only data tables and associated fields can reference fields";
	formula_nested_filter_default_message$1 = "The FILTER, SUMIF, and COUNTIF functions do not support nested usage.";
	formula_param_calc_error_default_message$1 = "Parameter calculation error.";
	formula_param_should_be_greater_than_detail_message$1 = "The value of the {{paramOrdinal}} parameter in the \"{{formulaName}}\" function is {{currValue}}. A valid value must be greater than {{validValue}}.";
	formula_param_should_be_greater_than_or_equal_detail_message$1 = "The value of the {{paramOrdinal}} parameter in the \"{{formulaName}}\" function is {{currValue}}. A valid value must be greater than or equal to {{validValue}}.";
	formula_param_should_be_less_than_detail_message$1 = "The value of the {{paramOrdinal}} parameter in the \"{{formulaName}}\" function is {{currValue}}. A valid value must be less than {{validValue}}.";
	formula_param_should_be_less_than_or_equal_detail_message$1 = "The value of the {{paramOrdinal}} parameter in the \"{{formulaName}}\" function is {{currValue}}. A valid value must be less than or equal to {{validValue}}.";
	formula_parameter_exceeded_default_message$1 = "Too many parameters.";
	formula_parameter_exceeded_detail_message1$1 = "Too many parameters for the \"{{formulaName}}\" function. The number should be {{paramCountLowerLimit}}-{{paramCountUpperLimit}}, and the current number is {{currParamCount}}.";
	formula_parameter_exceeded_detail_message2$1 = "Too many parameters for the \"{{formulaName}}\" function. The maximum number is {{paramCountLowerLimit}}, and the current number is {{currParamCount}}.";
	formula_parameter_missing_default_message$1 = "Insufficient parameters.";
	formula_parameter_missing_detail_message1$1 = "Missing parameters for the \"{{formulaName}}\" function. The number should be {{paramCountLowerLimit}}-{{paramCountUpperLimit}}, and the current number is {{currParamCount}}.";
	formula_parameter_missing_detail_message2$1 = "Missing parameters for the \"{{formulaName}}\" function. The minimum number is {{paramCountLowerLimit}}, and the current number is {{currParamCount}}.";
	formula_performance_exceeded_categories$1 = "Performance limit exceeded";
	formula_result_exceeds_cell_32k_limit_default_message$1 = "The calculation result is too large. Exceeding the data limit of a single cell.";
	formula_table_not_existed_default_message$1 = "The reference table has been deleted. Select again.";
	formula_table_ref_not_supported_for_ss_default_message$1 = "Full tables can only be referenced in FILTER, COUNTIF functions.";
	formula_table_sumif_error_default_message$1 = "When referencing the entire table, the SUMIF function needs to reference [Table].[Field] together";
	formula_text_without_quote_detail_message$1 = "No reference named 「{{originText}}」can be found. If necessary, enclose it in double quotes, such as {{quoteText}}";
	formula_text_without_quote_slice_detail_message$1 = "No reference named 「{{originText}}」can be found. If necessary, enclose it in double quotes, such as {{quoteText}}";
	formula_too_many_sub_process_default_message$1 = "Data volume exceeds the formula calculation limit.";
	formula_uninterrupted_default_message$1 = "Missing operator on the left. Complete it.";
	formula_unknown_function_default_message$1 = "Invalid function name.";
	formula_unknown_function_detail_message$1 = "\"{{name}}\" function not supported.";
	formula_unknown_name_default_message$1 = "Invalid parameter name.";
	formula_unknown_name_detail_message$1 = "{{name}} data table or field not found.";
	formula_unrecognied_formula_categories$1 = "Unrecognized content";
	formula_upstream_standard_cell_error_default_message$1 = "Calculation error at the backend.";
	get_link$1 = "Link copied";
	group$1 = "Group";
	hide_col$1 = "Hide column";
	image_comprehension$1 = "Image comprehension";
	image_comprehension_field$1 = "Image to understand";
	image_comprehension_prompt$1 = "Custom description requirements";
	image_comprehension_prompt_desc_new$1 = "Automatically understand image content, generate natural language descriptions, extract key text/numbers/objects/tables/scenes, or answer image-related questions. Supports invoices/contracts/product images/whiteboards.";
	image_comprehension_prompt_example$1 = "For example: Identify the express tracking number in the image";
	information_extraction$1 = "Information extraction";
	information_extraction_custom_prompt$1 = "Custom extraction requirements";
	information_extraction_custom_prompt_example$1 = "For example: 1. Extract \"address information\" from \"Chen Ming Guangdong 130xxxx1234\", output \"Guangdong\"; 2. The output result does not contain spaces";
	information_extraction_field$1 = "Field to extract information";
	information_extraction_prompt_desc_new$1 = "Accurately extract specified fields (such as name, phone number, amount, date, product model, address, order number, etc.) from unstructured text/notes/emails/chats. Supports multi-field extraction simultaneously.";
	input_valid_email$1 = "please enter a valid email address";
	instruction_page$1 = "Instruction";
	is_not_primary_field_types$1 = "The column type is not supported for primary field";
	left$1 = "left";
	link_records_explanation$1 = "You can get data from other smart tables by link-records column";
	m_bigdata_unable_to_open$1 = "The current data table has too many records and is temporarily not supported for viewing on mobile devices.";
	m_open_with_pc$1 = "Please view it on your computer";
	modified_time_explanation$1 = "Automatically display the time of the last edit of each row record, which cannot be modified";
	modified_user_explanation$1 = "Automatically display the last editor of each record, which cannot be modified";
	modify_date_time_field_is_gantt_date_field$1 = "This column is the start/end date column of \"{{viewsName}}\". After modifying the type, \"{{viewsName}}\" will be invalid. Are you sure you want to modify it?";
	modify_field_is_kanban_group$1 = "The {{viewsName}} is grouped by this column. Modifying the column will invalidate {{viewsName}}. Modify?";
	multiple_select$1 = "Multiple select";
	no_permission$1 = "User permission changed. Unable to perform this operation.";
	no_permission_to_copy_formula_field$1 = "You do not have full record permissions for the referenced table, so creating a column copy is not supported.";
	no_permission_to_create_view$1 = "The admin has set data permissions. Unable to add a view.";
	no_permission_to_delete_view$1 = "The admin has set data permissions. Unable to delete the view.";
	no_permission_to_edit_field_group$1 = "The admin has set data permissions and requires full permissions to edit field groups.";
	no_permission_to_edit_view_config$1 = "The admin has set data permissions. Unable to edit the view config.";
	no_permission_to_fill_selection$1 = "Unable to populate. Some fields are view-only.";
	no_permission_to_fill_single_selection$1 = "Unable to populate fields that are view-only.";
	no_permission_to_insert_record$1 = "The admin has set data permissions. Unable to add a record.";
	no_permission_to_insert_record_external_restrict$1 = "The sheet has synchronized data from other apps; records cannot be added.";
	no_permission_to_insert_record_in_group$1 = "No permission for the group field. Unable to add records to the group.";
	no_permission_to_insert_record_in_group_restrict$1 = "The sheet has synchronized data from other apps; records cannot be added to this group.";
	no_permission_to_insert_table$1 = "The admin has set data permissions. Unable to to create a new worksheet.";
	no_permission_to_move_group_record_external_restrict$1 = "The sheet has synchronized data from other apps; records cannot be moved.";
	no_permission_to_move_record$1 = "The admin has set data permissions. Unable to move the record.";
	no_permission_to_move_view$1 = "The admin has set data permissions. Unable to move the view.";
	no_permission_to_read_link_field$1 = "No permission for the referenced field.";
	no_permission_to_read_link_table$1 = "No permission for the associated worksheet.";
	no_permission_to_redo$1 = "No permission to redo.";
	no_permission_to_set_primary_field$1 = "The admin has set data permissions. Only admin can change the primary field.";
	no_permission_to_set_primary_field_toc$1 = "The owner has set data permissions. Only admin can change the primary field.";
	no_permission_to_undo$1 = "No permission to undo.";
	not_find_field_group$1 = "field group not exist";
	nth$1 = "{{index}}th";
	operation_invalid$1 = "Command invalid, please try again";
	option_unmber$1 = "Option{{number}}";
	paste_max_cell_reach$1 = "The data volume is too large and the operation was unsuccessful. Please try batch operation or reduce the data volume.";
	query_data_sources$1 = "Query page data sources";
	quick_filter_over_size$1 = "Fix a maximum of 3 fields to the toolbar";
	record_copy_b$1 = "Duplicate";
	record_max_size_reach$1 = "Worksheet row count exceeded the limit.";
	record_max_size_reach_content$1 = "Each worksheet can contain up to {{limit}} rows.";
	refresh_and_try$1 = "Command invalid, please reload and try again";
	render_field_stat_calculating$1 = "Loading";
	request_run_catch_error$1 = "An unknown error occurred in the smart table, please refresh and try again";
	reselect_paste_area$1 = "Please re-select the paste range";
	right$1 = "right";
	set_field_attributes_will_change_permission_content$1 = "Data permissions are determined by the “{{fieldTitle}}” field. If the type is changed, relevant members will be unable to view the worksheet.";
	set_field_attributes_will_change_permission_content_link_record$1 = "Data permissions are determined by the “{{fieldTitle}}”. If the configuration is changed, relevant members will be unable to view the worksheet.";
	set_field_attributes_will_change_permission_content_lookup_dependency$1 = "Data permissions are determined by the “{{fieldTitle}}”. If the configuration is changed, relevant members will be unable to view the worksheet.";
	set_field_attributes_will_change_permission_property_only_title$1 = "Changing the field attributes will affect the permissions.";
	set_field_attributes_will_change_permission_title$1 = "Changing the field type will affect the permissions.";
	set_primary_field_will_change_permission_content$1 = "The minimum permission for a record title is “viewable”. After changing the primary field, this column will be visible to all members.";
	set_primary_field_will_change_permission_title$1 = "Changing the record title will affect data permissions.";
	sheet_name_31$1 = "Sheet name shall not exceed 31 characters.";
	sheet_name_characters_invalid$1 = "Sheet name cannot contain the following characters: : \\, /, ?, *, [, and ]. Delete them.";
	sheet_name_characters_unprinted$1 = "Sheet name might contain non-printable special characters. Delete them (or spaces).";
	single_choice$1 = "Single select";
	single_choice_default_value1$1 = "Todo";
	single_choice_default_value2$1 = "In progress";
	single_choice_default_value3$1 = "Done";
	single_choice_ques$1 = "Single choice question";
	single_select$1 = "Single select";
	smartcanvas$1 = "Description page";
	smartsheet$1 = "Smartsheet";
	sort$1 = "Sort";
	sort_records$1 = "Sort records";
	start_date$1 = "Start time";
	sub_table$1 = "Sub Table";
	summary$1 = "Summary";
	summary_field$1 = "Select fields to summarize (multiple selection allowed)";
	summary_prompt$1 = "Custom summary requirements";
	summary_prompt_desc$1 = "Add custom requirements for the summary content to meet personalized summary needs";
	summary_prompt_desc_new$1 = "Automatically compress long texts, meeting notes, customer feedback, emails, and articles into concise summaries (supports control: 50 words/100 words/bullet points/key decision points)";
	summary_prompt_example$1 = "For example: Summarize the content, retain the key data";
	table_loading$1 = "Data loading, please hold on";
	table_max_size_reach$1 = "The number of sheets has reached the upper limit ({{table}}). You can delete some sheets and try again.";
	tag_field$1 = "Select a field to match with created tags";
	tag_prompt$1 = "Custom tag matching requirements";
	tag_prompt_desc$1 = "Add custom requirements for tag matching to meet personalized summary needs";
	tag_prompt_desc_new$1 = "Automatically match and output corresponding tag sets based on preset tag library + rules (keywords/regex/semantics) (suitable for multi-select tag fields). Can be used in combination with intelligent classification.";
	tag_prompt_example$1 = "For example: 1. \"The dish tastes good, but it takes too long to wait\" matches the tags \"taste\" and \"serving time\"; 2. Each tag does not exceed 5 characters";
	ten_thousand$1 = "ten thousand";
	text$1 = "Text";
	text_ques$1 = "Text question";
	the_feature$1 = "Function";
	title_empty$1 = "{{type}} name cannot be empty";
	title_exist$1 = "{{type}} named 「{{title}}」 already exists. Please enter another name.";
	unauthorized_record$1 = "Record without permission";
	unknown_error$1 = "Unknown error";
	unname$1 = "Unnamed";
	unname_record$1 = "Unnamed record";
	unnamed_calendar$1 = "Calendar";
	unnamed_form$1 = "Form";
	unnamed_gallery$1 = "Gallery";
	unnamed_gantt$1 = "Gantt";
	unnamed_kanban$1 = "Kanban";
	unnamed_list$1 = "List";
	unnamed_query$1 = "Query Page";
	unnamed_table$1 = "Grid";
	untitled$1 = "Untitled";
	update_content$1 = "A new version of SmartSheet is available. Reloading...";
	update_tip$1 = "Update Notification";
	update_version_err$1 = "Unable to open, the document contains incompatible data.";
	user_explanation$1 = "You can @ person in the person column";
	view$1 = "View";
	view_calendar$1 = "Calendar view";
	view_form$1 = "Form view";
	view_gantt$1 = "Gantt view";
	view_kanban$1 = "Kanban view";
	view_list$1 = "List view";
	view_max_size_reach$1 = "The number of views has reached the limit ({{view}} rows). Delete unwanted views and try again.";
	view_not_support_frozen_field_count$1 = "This view does not support fields frozen settings";
	view_not_support_group$1 = "This view does not support group setting";
	view_personal_disabled_1$1 = "Only the views created by yourself can be set as personal views";
	view_personal_disabled_2$1 = "After setting, the total number of public and locked views is less than 1";
	view_photo$1 = "Gallery view";
	view_query$1 = "Query view";
	view_setting$1 = "View setting";
	view_table$1 = "Grid view";
	wecom_call_phone_error$1 = "Unable to call this number using company-paid lines.";
	wecom_send_email_error$1 = "Sending failed. Check the email address.";
	x_month_1$1 = "January";
	x_month_10$1 = "October";
	x_month_10_day$1 = "{{day}} October";
	x_month_11$1 = "November";
	x_month_11_day$1 = "{{day}} November";
	x_month_12$1 = "December";
	x_month_12_day$1 = "{{day}} December";
	x_month_1_day$1 = "{{day}} January";
	x_month_2$1 = "February";
	x_month_2_day$1 = "{{day}} February";
	x_month_3$1 = "March";
	x_month_3_day$1 = "{{day}} March";
	x_month_4$1 = "April";
	x_month_4_day$1 = "{{day}} April";
	x_month_5_day$1 = "{{day}} May";
	x_month_6$1 = "June";
	x_month_6_day$1 = "{{day}} June";
	x_month_7$1 = "July";
	x_month_7_day$1 = "{{day}} July";
	x_month_8$1 = "August";
	x_month_8_day$1 = "{{day}} August";
	x_month_9$1 = "September";
	x_month_9_day$1 = "{{day}} September";
	x_year$1 = "{{year}}";
	x_year_month_1$1 = "January {{year}}";
	x_year_month_10$1 = "October {{year}}";
	x_year_month_11$1 = "November {{year}}";
	x_year_month_12$1 = "December {{year}}";
	x_year_month_2$1 = "February {{year}}";
	x_year_month_3$1 = "March {{year}}";
	x_year_month_4$1 = "April {{year}}";
	x_year_month_5$1 = "May {{year}}";
	x_year_month_6$1 = "June {{year}}";
	x_year_month_7$1 = "July {{year}}";
	x_year_month_8$1 = "August {{year}}";
	x_year_month_9$1 = "September {{year}}";
	不展示$1 = "None";
	中$1 = "Medium";
	今天$1 = "Today";
	优先级$1 = "Priority";
	修改字段设置$1 = "Modify field settings";
	全选$1 = "Select all";
	公式计算结果不可直接编辑$1 = "Formula calculation results cannot be edited directly";
	共$1 = "total ";
	刚刚$1 = "just now";
	创建人$1 = "Creator";
	创建时间$1 = "Created At";
	前一月$1 = "Previous month";
	前一页$1 = "Previous page";
	加载中$1 = "Loading";
	去重$1 = "Unique";
	去重占比$1 = "Percent Unique";
	去重计数$1 = "Unique";
	发送邮件$1 = "Send Email";
	取消$1 = "Cancel";
	取消全选$1 = "Deselect all";
	后一月$1 = "Next month";
	后一页$1 = "Next page";
	周$1 = "week";
	周一$1 = "Monday";
	周三$1 = "Wednesday";
	周二$1 = "Tuesday";
	周五$1 = "Friday";
	周六$1 = "Saturday";
	周四$1 = "Thursday";
	周日$1 = "Sunday";
	图片数$1 = "Image Count";
	处理人$1 = "Assignee";
	天$1 = " days";
	季$1 = "quarter";
	学员$1 = "Student";
	完成时间$1 = "Completed At";
	客户$1 = "Customer";
	客户跟进总结$1 = "Customer Follow-up Summary";
	展开分组$1 = "Expand group";
	展开此行$1 = "Expand record";
	工作日$1 = " workday(s)";
	已勾选$1 = "Checked";
	已勾选占比$1 = "Percent Checked";
	已填写$1 = "Filled";
	已填写占比$1 = "Percent Filled";
	已填写计数$1 = "filled count";
	已完成$1 = "Completed";
	已暂停$1 = "Paused";
	已生成的内容将保留 = "The generated content will be retained";
	已筛选$1 = "Filtered";
	已选择单元格$1 = "selected cell";
	已选择字段$1 = "selected field";
	已选择记录$1 = "selected record";
	平均$1 = "AVERAGE";
	平均值$1 = "Average";
	年$1 = "year";
	开始总结$1 = "Start";
	开始日期$1 = "Start Date";
	当前数值大于进度条目标值$1 = "Current value is greater than the target value of the progress bar";
	当前数值小于进度条起始值$1 = "Current value is less than the target value of the progress bar";
	待开始$1 = "To do";
	待添加人进行总结$1 = "To be added for summary";
	待群主进行总结$1 = "To be added for summary";
	总数$1 = "Count";
	总结$1 = "Summary";
	截止日期$1 = "Due Date";
	折叠分组$1 = "Collapse stack";
	拖拽调整冻结区域$1 = "Drag to change the frozen area";
	拨打电话$1 = "Phone call";
	按周查看$1 = "View by week";
	按季查看$1 = "View by quarter";
	按年查看$1 = "View by year";
	按月查看$1 = "View by month";
	描述$1 = "Description";
	插入位置$1 = "Insert a location";
	操作记录$1 = "Operation Record";
	文件数$1 = "File Count";
	新建分组$1 = "New stack";
	无$1 = "None";
	无日期记录$1 = "No date records";
	无权限的字段$1 = "Field without permission";
	无权限的记录$1 = "Record without permission";
	无法撤销此操作$1 = "This operation cannot be undone";
	无法重做此操作$1 = "This operation cannot be redone";
	显示表格$1 = "Show grid";
	暂停原因$1 = "Pause Reason";
	暂无事项$1 = "No items";
	更新人$1 = "Updated By";
	更新时间$1 = "Updated At";
	最早$1 = "Earliest";
	最早时间$1 = "Earliest Date";
	最晚$1 = "Latest";
	最晚时间$1 = "Latest Date";
	月$1 = "month";
	未勾选$1 = "Unchecked";
	未勾选占比$1 = "Percent Unchecked";
	未命名记录$1 = "Unnamed record";
	未填写$1 = "Empty";
	未填写占比$1 = "Percent Empty";
	未设置$1 = "unset";
	来源$1 = "Source";
	标签$1 = "Tags";
	标题$1 = "Title";
	此列类型不支持编辑分组$1 = "This column type does not support edit grouping";
	此记录将按照分组规则调整至其他分组$1 = "This record will be adjusted to other groups according to the grouping rules";
	此记录将按照排序规则调整至其他位置$1 = "This record will be moved to another location according to the sorting rules";
	没有文档查看权限$1 = "No document review permission";
	添加一列$1 = "Add column";
	添加一行$1 = "Add record";
	添加列$1 = "Add field";
	添加记录$1 = "Add record";
	父任务$1 = "Parent Task";
	状态$1 = "Status";
	由于权限设置无法查看该题目$1 = "Due to permission settings, you cannot view this question.";
	空$1 = "(Empty)";
	紧急$1 = "Urgent";
	终点$1 = "End point";
	统计$1 = "statistics";
	自动计算$1 = "Automatic Calculation";
	范围$1 = "range";
	行数$1 = "count";
	计数$1 = "Count";
	记录行数$1 = "Count all";
	设置时间$1 = "Set Time";
	请升级企业微信版本后打开$1 = "Please upgrade WeCom version to open";
	请在企业微信内打开$1 = "Please open in WeCom";
	请选择$1 = "Please select";
	调整中$1 = "调整中";
	起点$1 = "Starting point";
	跟进总结$1 = " Follow-up summary";
	输入待办标题$1 = "Enter to-do title";
	输入电话号$1 = "Input phone number";
	输入邮箱$1 = "Input Email";
	进行中$1 = "In progress";
	迭代$1 = "Iteration";
	选项$1 = "Option";
	重新配置$1 = "Reconfigure";
	阻塞原因$1 = "Blocking Reason";
	附件$1 = "Attachment";
	隐藏表格$1 = "Hide grid";
	高$1 = "High";
	smartsheet_en_US_default = {
		" 等 {{userCount}} 人": "etc. {{userCount}} collaborator",
		"0day": "0 day",
		"0month": "0 month",
		"@微信": "@WeChat",
		"AI 生成中({{progress}}%)": "AI Generating ({{progress}}%)",
		"AI 生成失败": "Generation with AI failed",
		FillColor: FillColor$1,
		add_1_record: add_1_record$1,
		add_field_2: add_field_2$1,
		ai_client_tips: ai_client_tips$1,
		ai_custom: ai_custom$1,
		ai_entry_calculate: ai_entry_calculate$1,
		ai_entry_classify: ai_entry_classify$1,
		ai_entry_formula: ai_entry_formula$1,
		ai_entry_generate: ai_entry_generate$1,
		ai_entry_judge: ai_entry_judge$1,
		ai_entry_lookup: ai_entry_lookup$1,
		ai_field_has_deleted_changed: ai_field_has_deleted_changed$1,
		ai_field_select_hint_attachment: ai_field_select_hint_attachment$1,
		ai_field_select_hint_date: ai_field_select_hint_date$1,
		ai_field_select_hint_number: ai_field_select_hint_number$1,
		ai_field_select_hint_select: ai_field_select_hint_select$1,
		ai_generate_count: ai_generate_count$1,
		ai_generate_fail: ai_generate_fail$1,
		ai_generate_fail_deps_all_empty: ai_generate_fail_deps_all_empty$1,
		ai_generate_stop: ai_generate_stop$1,
		ai_generating: ai_generating$1,
		ai_label: ai_label$1,
		ai_loop_trigger: ai_loop_trigger$1,
		ai_placeholder_calculate: ai_placeholder_calculate$1,
		ai_placeholder_classify: ai_placeholder_classify$1,
		ai_placeholder_formula: ai_placeholder_formula$1,
		ai_placeholder_generate: ai_placeholder_generate$1,
		ai_placeholder_generate_image: ai_placeholder_generate_image$1,
		ai_placeholder_judge: ai_placeholder_judge$1,
		ai_placeholder_lookup: ai_placeholder_lookup$1,
		ai_smart_field_input: ai_smart_field_input$1,
		ai_smart_field_prompt: ai_smart_field_prompt$1,
		ai_smart_field_prompt_desc: ai_smart_field_prompt_desc$1,
		ai_smart_field_prompt_example: ai_smart_field_prompt_example$1,
		ai_smart_formula: ai_smart_formula$1,
		ai_smart_script: ai_smart_script$1,
		ai_stopped: ai_stopped$1,
		ai_use_limit_month: ai_use_limit_month$1,
		ai_use_limit_today: ai_use_limit_today$1,
		api_doc_edit_toast: api_doc_edit_toast$1,
		apostrophe: apostrophe$1,
		application: "App",
		at_least_one_view: at_least_one_view$1,
		auto_num_generating: auto_num_generating$1,
		auto_set_primary_field_will_change_permission_content: auto_set_primary_field_will_change_permission_content$1,
		auto_set_primary_field_will_change_permission_title: auto_set_primary_field_will_change_permission_title$1,
		bigdata_unable_to_open: bigdata_unable_to_open$1,
		cancel: cancel$1,
		cannot_move_primary_field: cannot_move_primary_field$1,
		canvas_tip_add_record: canvas_tip_add_record$1,
		capacity_exceeded: capacity_exceeded$1,
		category: category$1,
		category_field: category_field$1,
		category_prompt: category_prompt$1,
		category_prompt_desc: category_prompt_desc$1,
		category_prompt_desc_new: category_prompt_desc_new$1,
		category_prompt_example: category_prompt_example$1,
		cell_max_size_reach: cell_max_size_reach$1,
		cell_max_size_reach_content: cell_max_size_reach_content$1,
		checkbox: checkbox$1,
		click_to_refresh: click_to_refresh$1,
		col_attr_setting: col_attr_setting$1,
		collab_error_tip: collab_error_tip$1,
		collection_form: collection_form$1,
		color_blue: color_blue$1,
		color_dark: color_dark$1,
		color_gray: color_gray$1,
		color_green: color_green$1,
		color_light: color_light$1,
		color_orange: color_orange$1,
		color_pink: color_pink$1,
		color_purple: color_purple$1,
		color_red: "Red",
		color_sky_blue: color_sky_blue$1,
		color_white: color_white$1,
		color_yellow: color_yellow$1,
		confirm: confirm$1,
		confirm2: confirm2$1,
		continue_delete: continue_delete$1,
		continue_modify: continue_modify$1,
		continue_switch: continue_switch$1,
		cookie_expired_and_try_aggin: cookie_expired_and_try_aggin$1,
		copy2: copy2$1,
		copy_col: copy_col$1,
		created_time_explanation: created_time_explanation$1,
		created_user_explanation: created_user_explanation$1,
		custom_prompt: custom_prompt$1,
		custom_prompt_desc_new: custom_prompt_desc_new$1,
		custom_prompt_example: custom_prompt_example$1,
		dashboard: dashboard$1,
		dashboard_component_num_limit: dashboard_component_num_limit$1,
		data_loading: data_loading$1,
		date: date$1,
		day: "day",
		default_query_result_title: default_query_result_title$1,
		del: del$1,
		delete_field_is_gantt_date_field: delete_field_is_gantt_date_field$1,
		delete_field_is_kanban_group: delete_field_is_kanban_group$1,
		delete_field_will_change_permission_content1: delete_field_will_change_permission_content1$1,
		delete_field_will_change_permission_content2: delete_field_will_change_permission_content2$1,
		delete_field_will_change_permission_title: delete_field_will_change_permission_title$1,
		delete_include_primary_field: delete_include_primary_field$1,
		dim_month: dim_month$1,
		end_date: end_date$1,
		field: field$1,
		field_attachment: field_attachment$1,
		field_auto_number: field_auto_number$1,
		field_barcode: field_barcode$1,
		field_create_time: field_create_time$1,
		field_creator: field_creator$1,
		field_currency: field_currency$1,
		field_email: field_email$1,
		field_exist_in_other_field_group: field_exist_in_other_field_group$1,
		field_formula: field_formula$1,
		field_group: field_group$1,
		field_group_b: field_group_b$1,
		field_group_max_size_reach: field_group_max_size_reach$1,
		field_group_max_size_reach_content: field_group_max_size_reach_content$1,
		field_group_name_too_long: field_group_name_too_long$1,
		field_last_edit_time: field_last_edit_time$1,
		field_last_editor: field_last_editor$1,
		field_link_records: field_link_records$1,
		field_location: field_location$1,
		field_lookup: field_lookup$1,
		field_max_size_reach: field_max_size_reach$1,
		field_max_size_reach_content: field_max_size_reach_content$1,
		field_not_support_option_group: field_not_support_option_group$1,
		field_number: field_number$1,
		field_percent: field_percent$1,
		field_progress: field_progress$1,
		field_tel: field_tel$1,
		field_title: field_title$1,
		field_type_image: field_type_image$1,
		field_user: field_user$1,
		file_not_support_svg: file_not_support_svg$1,
		file_not_support_type: file_not_support_type$1,
		filler: filler$1,
		filter: filter$1,
		first: "1st",
		form_collection_results: form_collection_results$1,
		formula_array_data_oversize_default_message: formula_array_data_oversize_default_message$1,
		formula_brackets_not_match_detail_message: formula_brackets_not_match_detail_message$1,
		formula_brackets_not_match_message: formula_brackets_not_match_message$1,
		formula_calc_error_categories: formula_calc_error_categories$1,
		formula_circle_categories: formula_circle_categories$1,
		formula_circle_default_message: formula_circle_default_message$1,
		formula_circle_detail_message: formula_circle_detail_message$1,
		formula_complex_formula_skip_default_message: formula_complex_formula_skip_default_message$1,
		formula_content_deleted_categories: formula_content_deleted_categories$1,
		formula_content_permission_limit_default_message: formula_content_permission_limit_default_message$1,
		formula_convert_error_categories: formula_convert_error_categories$1,
		formula_convert_error_default_message: formula_convert_error_default_message$1,
		formula_convert_error_detail_message: formula_convert_error_detail_message$1,
		formula_convert_to_date_detail_message: formula_convert_to_date_detail_message$1,
		formula_convert_to_double_detail_message: formula_convert_to_double_detail_message$1,
		formula_division_by_zero_default_message: formula_division_by_zero_default_message$1,
		formula_dottable_default_message: formula_dottable_default_message$1,
		formula_error_default_message: formula_error_default_message$1,
		formula_explanation: formula_explanation$1,
		formula_field_in_quotes_default_message: formula_field_in_quotes_default_message$1,
		formula_field_not_existed_default_message: formula_field_not_existed_default_message$1,
		formula_formula_error_categories: formula_formula_error_categories$1,
		formula_illegal_argument_default_message: formula_illegal_argument_default_message$1,
		formula_illegal_char_default_message: formula_illegal_char_default_message$1,
		formula_incomplete_formula_categories: formula_incomplete_formula_categories$1,
		formula_invalid_param_default_message: formula_invalid_param_default_message$1,
		formula_invalid_params_categories: formula_invalid_params_categories$1,
		formula_loading: formula_loading$1,
		formula_lookup_property_error_default_message: formula_lookup_property_error_default_message$1,
		formula_missing_field_id_in_filter_for_ss_default_message: formula_missing_field_id_in_filter_for_ss_default_message$1,
		formula_missing_field_on_each_default_message: formula_missing_field_on_each_default_message$1,
		formula_missing_table_on_field_ref_default_message: formula_missing_table_on_field_ref_default_message$1,
		formula_nested_filter_default_message: formula_nested_filter_default_message$1,
		formula_param_calc_error_default_message: formula_param_calc_error_default_message$1,
		formula_param_should_be_greater_than_detail_message: formula_param_should_be_greater_than_detail_message$1,
		formula_param_should_be_greater_than_or_equal_detail_message: formula_param_should_be_greater_than_or_equal_detail_message$1,
		formula_param_should_be_less_than_detail_message: formula_param_should_be_less_than_detail_message$1,
		formula_param_should_be_less_than_or_equal_detail_message: formula_param_should_be_less_than_or_equal_detail_message$1,
		formula_parameter_exceeded_default_message: formula_parameter_exceeded_default_message$1,
		formula_parameter_exceeded_detail_message1: formula_parameter_exceeded_detail_message1$1,
		formula_parameter_exceeded_detail_message2: formula_parameter_exceeded_detail_message2$1,
		formula_parameter_missing_default_message: formula_parameter_missing_default_message$1,
		formula_parameter_missing_detail_message1: formula_parameter_missing_detail_message1$1,
		formula_parameter_missing_detail_message2: formula_parameter_missing_detail_message2$1,
		formula_performance_exceeded_categories: formula_performance_exceeded_categories$1,
		formula_result_exceeds_cell_32k_limit_default_message: formula_result_exceeds_cell_32k_limit_default_message$1,
		formula_table_not_existed_default_message: formula_table_not_existed_default_message$1,
		formula_table_ref_not_supported_for_ss_default_message: formula_table_ref_not_supported_for_ss_default_message$1,
		formula_table_sumif_error_default_message: formula_table_sumif_error_default_message$1,
		formula_text_without_quote_detail_message: formula_text_without_quote_detail_message$1,
		formula_text_without_quote_slice_detail_message: formula_text_without_quote_slice_detail_message$1,
		formula_too_many_sub_process_default_message: formula_too_many_sub_process_default_message$1,
		formula_uninterrupted_default_message: formula_uninterrupted_default_message$1,
		formula_unknown_function_default_message: formula_unknown_function_default_message$1,
		formula_unknown_function_detail_message: formula_unknown_function_detail_message$1,
		formula_unknown_name_default_message: formula_unknown_name_default_message$1,
		formula_unknown_name_detail_message: formula_unknown_name_detail_message$1,
		formula_unrecognied_formula_categories: formula_unrecognied_formula_categories$1,
		formula_upstream_standard_cell_error_default_message: formula_upstream_standard_cell_error_default_message$1,
		get_link: get_link$1,
		group: group$1,
		hide_col: hide_col$1,
		hyperlink: "URL",
		image_comprehension: image_comprehension$1,
		image_comprehension_field: image_comprehension_field$1,
		image_comprehension_prompt: image_comprehension_prompt$1,
		image_comprehension_prompt_desc_new: image_comprehension_prompt_desc_new$1,
		image_comprehension_prompt_example: image_comprehension_prompt_example$1,
		information_extraction: information_extraction$1,
		information_extraction_custom_prompt: information_extraction_custom_prompt$1,
		information_extraction_custom_prompt_example: information_extraction_custom_prompt_example$1,
		information_extraction_field: information_extraction_field$1,
		information_extraction_prompt_desc_new: information_extraction_prompt_desc_new$1,
		input_valid_email: input_valid_email$1,
		instruction_page: instruction_page$1,
		is_not_primary_field_types: is_not_primary_field_types$1,
		left: left$1,
		link_records_explanation: link_records_explanation$1,
		m_bigdata_unable_to_open: m_bigdata_unable_to_open$1,
		m_open_with_pc: m_open_with_pc$1,
		modified_time_explanation: modified_time_explanation$1,
		modified_user_explanation: modified_user_explanation$1,
		modify_date_time_field_is_gantt_date_field: modify_date_time_field_is_gantt_date_field$1,
		modify_field_is_kanban_group: modify_field_is_kanban_group$1,
		multiple_select: multiple_select$1,
		no: "No",
		no_permission: no_permission$1,
		no_permission_to_copy_formula_field: no_permission_to_copy_formula_field$1,
		no_permission_to_create_view: no_permission_to_create_view$1,
		no_permission_to_delete_view: no_permission_to_delete_view$1,
		no_permission_to_edit_field_group: no_permission_to_edit_field_group$1,
		no_permission_to_edit_view_config: no_permission_to_edit_view_config$1,
		no_permission_to_fill_selection: no_permission_to_fill_selection$1,
		no_permission_to_fill_single_selection: no_permission_to_fill_single_selection$1,
		no_permission_to_insert_record: no_permission_to_insert_record$1,
		no_permission_to_insert_record_external_restrict: no_permission_to_insert_record_external_restrict$1,
		no_permission_to_insert_record_in_group: no_permission_to_insert_record_in_group$1,
		no_permission_to_insert_record_in_group_restrict: no_permission_to_insert_record_in_group_restrict$1,
		no_permission_to_insert_table: no_permission_to_insert_table$1,
		no_permission_to_move_group_record_external_restrict: no_permission_to_move_group_record_external_restrict$1,
		no_permission_to_move_record: no_permission_to_move_record$1,
		no_permission_to_move_view: no_permission_to_move_view$1,
		no_permission_to_read_link_field: no_permission_to_read_link_field$1,
		no_permission_to_read_link_table: no_permission_to_read_link_table$1,
		no_permission_to_redo: no_permission_to_redo$1,
		no_permission_to_set_primary_field: no_permission_to_set_primary_field$1,
		no_permission_to_set_primary_field_toc: no_permission_to_set_primary_field_toc$1,
		no_permission_to_undo: no_permission_to_undo$1,
		not_find_field_group: not_find_field_group$1,
		nth: nth$1,
		ok: "OK",
		operation_invalid: operation_invalid$1,
		option_unmber: option_unmber$1,
		paste_max_cell_reach: paste_max_cell_reach$1,
		query_data_sources: query_data_sources$1,
		quick_filter_over_size: quick_filter_over_size$1,
		record_copy_b: record_copy_b$1,
		record_max_size_reach: record_max_size_reach$1,
		record_max_size_reach_content: record_max_size_reach_content$1,
		refresh_and_try: refresh_and_try$1,
		render_field_stat_calculating: render_field_stat_calculating$1,
		request_run_catch_error: request_run_catch_error$1,
		reselect_paste_area: reselect_paste_area$1,
		right: right$1,
		second: "2nd",
		set_field_attributes_will_change_permission_content: set_field_attributes_will_change_permission_content$1,
		set_field_attributes_will_change_permission_content_link_record: set_field_attributes_will_change_permission_content_link_record$1,
		set_field_attributes_will_change_permission_content_lookup_dependency: set_field_attributes_will_change_permission_content_lookup_dependency$1,
		set_field_attributes_will_change_permission_property_only_title: set_field_attributes_will_change_permission_property_only_title$1,
		set_field_attributes_will_change_permission_title: set_field_attributes_will_change_permission_title$1,
		set_primary_field_will_change_permission_content: set_primary_field_will_change_permission_content$1,
		set_primary_field_will_change_permission_title: set_primary_field_will_change_permission_title$1,
		sheet_name_31: sheet_name_31$1,
		sheet_name_characters_invalid: sheet_name_characters_invalid$1,
		sheet_name_characters_unprinted: sheet_name_characters_unprinted$1,
		single_choice: single_choice$1,
		single_choice_default_value1: single_choice_default_value1$1,
		single_choice_default_value2: single_choice_default_value2$1,
		single_choice_default_value3: single_choice_default_value3$1,
		single_choice_ques: single_choice_ques$1,
		single_select: single_select$1,
		smartcanvas: smartcanvas$1,
		smartsheet: smartsheet$1,
		sort: sort$1,
		sort_records: sort_records$1,
		start_date: start_date$1,
		sub_table: sub_table$1,
		summary: summary$1,
		summary_field: summary_field$1,
		summary_prompt: summary_prompt$1,
		summary_prompt_desc: summary_prompt_desc$1,
		summary_prompt_desc_new: summary_prompt_desc_new$1,
		summary_prompt_example: summary_prompt_example$1,
		table_loading: table_loading$1,
		table_max_size_reach: table_max_size_reach$1,
		tag: "Tag",
		tag_field: tag_field$1,
		tag_prompt: tag_prompt$1,
		tag_prompt_desc: tag_prompt_desc$1,
		tag_prompt_desc_new: tag_prompt_desc_new$1,
		tag_prompt_example: tag_prompt_example$1,
		ten_thousand: ten_thousand$1,
		text: text$1,
		text_ques: text_ques$1,
		the_feature: the_feature$1,
		third: "3rd",
		title_empty: title_empty$1,
		title_exist: title_exist$1,
		unauthorized_record: unauthorized_record$1,
		unknown_error: unknown_error$1,
		unname: unname$1,
		unname_record: unname_record$1,
		unnamed_calendar: unnamed_calendar$1,
		unnamed_form: unnamed_form$1,
		unnamed_gallery: unnamed_gallery$1,
		unnamed_gantt: unnamed_gantt$1,
		unnamed_kanban: unnamed_kanban$1,
		unnamed_list: unnamed_list$1,
		unnamed_query: unnamed_query$1,
		unnamed_table: unnamed_table$1,
		untitled: untitled$1,
		update_content: update_content$1,
		update_tip: update_tip$1,
		update_version_err: update_version_err$1,
		user_explanation: user_explanation$1,
		view: view$1,
		view_calendar: view_calendar$1,
		view_form: view_form$1,
		view_gantt: view_gantt$1,
		view_kanban: view_kanban$1,
		view_list: view_list$1,
		view_max_size_reach: view_max_size_reach$1,
		view_not_support_frozen_field_count: view_not_support_frozen_field_count$1,
		view_not_support_group: view_not_support_group$1,
		view_personal_disabled_1: view_personal_disabled_1$1,
		view_personal_disabled_2: view_personal_disabled_2$1,
		view_photo: view_photo$1,
		view_query: view_query$1,
		view_setting: view_setting$1,
		view_table: view_table$1,
		wecom_call_phone_error: wecom_call_phone_error$1,
		wecom_send_email_error: wecom_send_email_error$1,
		x_month_1: x_month_1$1,
		x_month_10: x_month_10$1,
		x_month_10_day: x_month_10_day$1,
		x_month_11: x_month_11$1,
		x_month_11_day: x_month_11_day$1,
		x_month_12: x_month_12$1,
		x_month_12_day: x_month_12_day$1,
		x_month_1_day: x_month_1_day$1,
		x_month_2: x_month_2$1,
		x_month_2_day: x_month_2_day$1,
		x_month_3: x_month_3$1,
		x_month_3_day: x_month_3_day$1,
		x_month_4: x_month_4$1,
		x_month_4_day: x_month_4_day$1,
		x_month_5: "May",
		x_month_5_day: x_month_5_day$1,
		x_month_6: x_month_6$1,
		x_month_6_day: x_month_6_day$1,
		x_month_7: x_month_7$1,
		x_month_7_day: x_month_7_day$1,
		x_month_8: x_month_8$1,
		x_month_8_day: x_month_8_day$1,
		x_month_9: x_month_9$1,
		x_month_9_day: x_month_9_day$1,
		x_year: x_year$1,
		x_year_month_1: x_year_month_1$1,
		x_year_month_10: x_year_month_10$1,
		x_year_month_11: x_year_month_11$1,
		x_year_month_12: x_year_month_12$1,
		x_year_month_2: x_year_month_2$1,
		x_year_month_3: x_year_month_3$1,
		x_year_month_4: x_year_month_4$1,
		x_year_month_5: x_year_month_5$1,
		x_year_month_6: x_year_month_6$1,
		x_year_month_7: x_year_month_7$1,
		x_year_month_8: x_year_month_8$1,
		x_year_month_9: x_year_month_9$1,
		yes: "Yes",
		"{{count}}天": "{{count}} days",
		"{{count}}月": "{{count}} months",
		"{{count}}项": "{{count}} records",
		"{{dayFrom}}日 - {{dayTo}}日": "{{dayFrom}} - {{dayTo}}",
		一: "M",
		三: "W",
		不展示: 不展示$1,
		中: 中$1,
		二: "T",
		五: "F",
		今天: 今天$1,
		优先级: 优先级$1,
		"伟大的计划从这里开始，快来新建待办吧": "Every great plan starts here. Create your first to-do!",
		低: "Low",
		"例如：\"提炼学员意向，生成服务建议\"": "For example: \"Extract trainee intentions and generate service suggestions\"",
		"例如：\"提炼客户意向，生成服务建议\"": "For example: \"Extract customer intentions and generate service suggestions\"",
		修改字段设置: 修改字段设置$1,
		全选: 全选$1,
		公式计算结果不可直接编辑: 公式计算结果不可直接编辑$1,
		六: "S",
		共: 共$1,
		"列宽度：{{newWidth}} 像素": "Field width: {{newWidth}} pixels",
		"列编组宽度：{{newWidth}} 像素": "Field group width: {{newWidth}} pixels",
		刚刚: 刚刚$1,
		创建人: 创建人$1,
		创建时间: 创建时间$1,
		前一月: 前一月$1,
		前一页: 前一页$1,
		加载中: 加载中$1,
		"包含不能填充的单元格，因为这些单元格的内容是自动生成的": "There are cells that cannot be filled. The content in these cells is generated automatically.",
		去重: 去重$1,
		去重占比: 去重占比$1,
		去重计数: 去重计数$1,
		发送邮件: 发送邮件$1,
		取消: 取消$1,
		取消全选: 取消全选$1,
		后一月: 后一月$1,
		后一页: 后一页$1,
		周: 周$1,
		周一: 周一$1,
		周三: 周三$1,
		周二: 周二$1,
		周五: 周五$1,
		周六: 周六$1,
		周四: 周四$1,
		周日: 周日$1,
		四: "T",
		图片数: 图片数$1,
		处理人: 处理人$1,
		天: 天$1,
		季: 季$1,
		学员: 学员$1,
		完成时间: 完成时间$1,
		客户: 客户$1,
		客户跟进总结: 客户跟进总结$1,
		展开分组: 展开分组$1,
		展开此行: 展开此行$1,
		工作日: 工作日$1,
		"工作表已从其他应用同步数据，不可新增分组。": "The sheet has synchronized data from other apps; new groups cannot be added.",
		"工作表已从其他应用同步数据，不可编辑分组。": "The sheet has synchronized data from other apps; group editing is not allowed.",
		"左右滑动查看（{{shortcut}}+鼠标滚轮）": "Swipe left/right to view（{{shortcut}}+wheel）",
		已勾选: 已勾选$1,
		已勾选占比: 已勾选占比$1,
		已填写: 已填写$1,
		已填写占比: 已填写占比$1,
		已填写计数: 已填写计数$1,
		已完成: 已完成$1,
		已暂停: 已暂停$1,
		已生成的内容将保留,
		已筛选: 已筛选$1,
		"已设置筛选，修改记录符合筛选条件才会显示": "Filters have been set, and modified records will only be displayed if they meet the filter conditions",
		已选择单元格: 已选择单元格$1,
		已选择字段: 已选择字段$1,
		已选择记录: 已选择记录$1,
		平均: 平均$1,
		平均值: 平均值$1,
		年: 年$1,
		"开启了自动排序，记录无法移动。": "Automatic sorting is turned on, records cannot be moved.",
		开始总结: 开始总结$1,
		开始日期: 开始日期$1,
		当前数值大于进度条目标值: 当前数值大于进度条目标值$1,
		当前数值小于进度条起始值: 当前数值小于进度条起始值$1,
		待开始: 待开始$1,
		待添加人进行总结: 待添加人进行总结$1,
		待群主进行总结: 待群主进行总结$1,
		总数: 总数$1,
		总结: 总结$1,
		截止日期: 截止日期$1,
		"所有者已设置内容权限， 需全部权限才能添加分组。": "The owner has set data permissions and requires full permissions to add groups.",
		"所有者已设置内容权限，你无法添加记录。": "The owner has set data permissions. Unable to add a record.",
		"所有者已设置内容权限，需全部权限才能编辑字段。": "The owner has set data permissions and requires full permissions to edit fields.",
		折叠分组: 折叠分组$1,
		拖拽调整冻结区域: 拖拽调整冻结区域$1,
		拨打电话: 拨打电话$1,
		按周查看: 按周查看$1,
		按季查看: 按季查看$1,
		按年查看: 按年查看$1,
		按月查看: 按月查看$1,
		描述: 描述$1,
		插入位置: 插入位置$1,
		操作记录: 操作记录$1,
		文件数: 文件数$1,
		新建分组: 新建分组$1,
		无: 无$1,
		"无可 AI 生成的记录": "No records generated with AI",
		无日期记录: 无日期记录$1,
		无权限的字段: 无权限的字段$1,
		无权限的记录: 无权限的记录$1,
		"无法修改包含收集表问题的列类型，修改后会导致收集结果更新失败": "Unable to modify the type of columns with questions in the form. If the type is modified, collection results will not be updated.",
		"无法冻结到编组中的字段，请取消编组后再冻结。": "无法冻结到编组中的字段，请取消编组后再冻结。",
		无法撤销此操作: 无法撤销此操作$1,
		无法重做此操作: 无法重做此操作$1,
		日: "S",
		"时间异常，开始时间晚于结束时间": "Time is abnormal, start time is later than end time",
		"时间范围（日）": "Date range (days)",
		"时间范围（月）": "Date range (months)",
		显示表格: 显示表格$1,
		暂停原因: 暂停原因$1,
		暂无事项: 暂无事项$1,
		更新人: 更新人$1,
		更新时间: 更新时间$1,
		最大值: "Max",
		最小值: "Min",
		最早: 最早$1,
		最早时间: 最早时间$1,
		最晚: 最晚$1,
		最晚时间: 最晚时间$1,
		月: 月$1,
		未勾选: 未勾选$1,
		未勾选占比: 未勾选占比$1,
		未命名记录: 未命名记录$1,
		未填写: 未填写$1,
		未填写占比: 未填写占比$1,
		未设置: 未设置$1,
		来源: 来源$1,
		标签: 标签$1,
		标题: 标题$1,
		"正在总结…": "Summarizing...",
		"正在生成…": "Generating...",
		"正在输入…": "is typing...",
		"此列为右侧“时间”的{{point}}": "This column is the {{point}} of the \"time bar\" on the right",
		"此列为右侧“时间”的{{point}}，可点击修改": "This column is the {{point}} of the \"time bar\" on the right, click to modify",
		此列类型不支持编辑分组: 此列类型不支持编辑分组$1,
		"此记录不符合筛选条件，将被隐藏": "This record does not meet the filter criteria and will be hidden",
		此记录将按照分组规则调整至其他分组: 此记录将按照分组规则调整至其他分组$1,
		此记录将按照排序规则调整至其他位置: 此记录将按照排序规则调整至其他位置$1,
		求和: "Sum",
		"没有分组字段的权限，不支持添加记录到此分组。": "No permission for the group field. Unable to add records to the group.",
		"没有分组字段的权限，不支持编辑分组。": "No permission for the group field. Unable to edit the group.",
		没有文档查看权限: 没有文档查看权限$1,
		添加一列: 添加一列$1,
		添加一行: 添加一行$1,
		添加列: 添加列$1,
		添加记录: 添加记录$1,
		"点赞失败，请再试一下": "Like failed, please try again",
		父任务: 父任务$1,
		状态: 状态$1,
		由于权限设置无法查看该题目: 由于权限设置无法查看该题目$1,
		"确定停止 AI 生成？": "Are you sure to stop AI generation?",
		空: 空$1,
		"管理员已设置内容权限， 需全部权限才能添加分组。": "The administrator has set data permissions and requires full permissions to add groups.",
		"管理员已设置内容权限，你无法添加记录。": "The admin has set data permissions. Unable to add a record.",
		"管理员已设置内容权限，需全部权限才能编辑字段。": "The admin has set data permissions and requires full permissions to edit fields.",
		紧急: 紧急$1,
		终点: 终点$1,
		结束: "End",
		统计: 统计$1,
		自动计算: 自动计算$1,
		范围: 范围$1,
		行数: 行数$1,
		"表格宽度：{{newWidth}} 像素": "Grid width: {{newWidth}} pixels",
		计数: 计数$1,
		"计算中...": "Calculating...",
		记录行数: 记录行数$1,
		设置时间: 设置时间$1,
		请升级企业微信版本后打开: 请升级企业微信版本后打开$1,
		请在企业微信内打开: 请在企业微信内打开$1,
		请选择: 请选择$1,
		调整中: 调整中$1,
		起点: 起点$1,
		"超过1万行上限，可拖动列宽调整": "If the upper limit of 10,000 rows is exceeded, the column width can be adjusted by dragging",
		跟进总结: 跟进总结$1,
		输入待办标题: 输入待办标题$1,
		输入电话号: 输入电话号$1,
		输入邮箱: 输入邮箱$1,
		"还有{{count}}项": "{{count}} more",
		进行中: 进行中$1,
		迭代: 迭代$1,
		选项: 选项$1,
		"重新计算中...": "Calculating...",
		重新配置: 重新配置$1,
		阻塞原因: 阻塞原因$1,
		附件: 附件$1,
		隐藏表格: 隐藏表格$1,
		高: 高$1,
		"（未设置时间）": "(unset time)",
		"，": ",",
		"：": ":"
	};
})), FillColor, add_1_record, add_field_2, ai_client_tips, ai_custom, ai_entry_calculate, ai_entry_classify, ai_entry_formula, ai_entry_generate, ai_entry_judge, ai_entry_lookup, ai_field_has_deleted_changed, ai_field_select_hint_attachment, ai_field_select_hint_date, ai_field_select_hint_number, ai_field_select_hint_select, ai_generate_count, ai_generate_fail, ai_generate_fail_deps_all_empty, ai_generate_stop, ai_generating, ai_label, ai_loop_trigger, ai_placeholder_calculate, ai_placeholder_classify, ai_placeholder_formula, ai_placeholder_generate, ai_placeholder_generate_image, ai_placeholder_judge, ai_placeholder_lookup, ai_smart_field_input, ai_smart_field_prompt, ai_smart_field_prompt_desc, ai_smart_field_prompt_example, ai_smart_formula, ai_smart_script, ai_stopped, ai_use_limit_month, ai_use_limit_today, api_doc_edit_toast, apostrophe, application, at_least_one_view, auto_num_generating, auto_set_primary_field_will_change_permission_content, auto_set_primary_field_will_change_permission_title, bigdata_unable_to_open, cancel, cannot_move_primary_field, canvas_tip_add_record, capacity_exceeded, category, category_field, category_prompt, category_prompt_desc, category_prompt_desc_new, category_prompt_example, cell_max_size_reach, cell_max_size_reach_content, checkbox, click_to_refresh, col_attr_setting, collab_error_tip, collection_form, color_sky_blue, confirm, confirm2, continue_delete, continue_modify, continue_switch, cookie_expired_and_try_aggin, copy2, copy_col, created_time_explanation, created_user_explanation, custom_prompt, custom_prompt_desc_new, custom_prompt_example, dashboard, dashboard_component_num_limit, data_loading, date, default_query_result_title, del, delete_field_is_gantt_date_field, delete_field_is_kanban_group, delete_field_will_change_permission_content1, delete_field_will_change_permission_content2, delete_field_will_change_permission_title, delete_include_primary_field, end_date, field_attachment, field_auto_number, field_barcode, field_create_time, field_creator, field_currency, field_email, field_exist_in_other_field_group, field_formula, field_group, field_group_b, field_group_max_size_reach, field_group_max_size_reach_content, field_group_name_too_long, field_last_edit_time, field_last_editor, field_link_records, field_location, field_lookup, field_max_size_reach, field_max_size_reach_content, field_not_support_option_group, field_number, field_percent, field_progress, field_tel, field_title, field_type_image, field_user, file_not_support_svg, file_not_support_type, filler, filter, first, form_collection_results, formula_array_data_oversize_default_message, formula_brackets_not_match_detail_message, formula_brackets_not_match_message, formula_calc_error_categories, formula_circle_categories, formula_circle_default_message, formula_circle_detail_message, formula_complex_formula_skip_default_message, formula_content_deleted_categories, formula_content_permission_limit_default_message, formula_convert_error_categories, formula_convert_error_default_message, formula_convert_error_detail_message, formula_convert_to_date_detail_message, formula_convert_to_double_detail_message, formula_division_by_zero_default_message, formula_dottable_default_message, formula_error_default_message, formula_explanation, formula_field_in_quotes_default_message, formula_field_not_existed_default_message, formula_formula_error_categories, formula_illegal_argument_default_message, formula_illegal_char_default_message, formula_incomplete_formula_categories, formula_invalid_param_default_message, formula_invalid_params_categories, formula_loading, formula_lookup_property_error_default_message, formula_missing_field_id_in_filter_for_ss_default_message, formula_missing_field_on_each_default_message, formula_missing_table_on_field_ref_default_message, formula_nested_filter_default_message, formula_param_calc_error_default_message, formula_param_should_be_greater_than_detail_message, formula_param_should_be_greater_than_or_equal_detail_message, formula_param_should_be_less_than_detail_message, formula_param_should_be_less_than_or_equal_detail_message, formula_parameter_exceeded_default_message, formula_parameter_exceeded_detail_message1, formula_parameter_exceeded_detail_message2, formula_parameter_missing_default_message, formula_parameter_missing_detail_message1, formula_parameter_missing_detail_message2, formula_performance_exceeded_categories, formula_result_exceeds_cell_32k_limit_default_message, formula_table_not_existed_default_message, formula_table_ref_not_supported_for_ss_default_message, formula_table_sumif_error_default_message, formula_text_without_quote_detail_message, formula_text_without_quote_slice_detail_message, formula_too_many_sub_process_default_message, formula_uninterrupted_default_message, formula_unknown_function_default_message, formula_unknown_function_detail_message, formula_unknown_name_default_message, formula_unknown_name_detail_message, formula_unrecognied_formula_categories, formula_upstream_standard_cell_error_default_message, get_link, group, hide_col, hyperlink, image_comprehension, image_comprehension_field, image_comprehension_prompt, image_comprehension_prompt_desc_new, image_comprehension_prompt_example, information_extraction, information_extraction_custom_prompt, information_extraction_custom_prompt_example, information_extraction_field, information_extraction_prompt_desc_new, input_valid_email, instruction_page, is_not_primary_field_types, link_records_explanation, m_bigdata_unable_to_open, m_open_with_pc, modified_time_explanation, modified_user_explanation, modify_date_time_field_is_gantt_date_field, modify_field_is_kanban_group, multiple_select, no_permission, no_permission_to_copy_formula_field, no_permission_to_create_view, no_permission_to_delete_view, no_permission_to_edit_field_group, no_permission_to_edit_view_config, no_permission_to_fill_selection, no_permission_to_fill_single_selection, no_permission_to_insert_record, no_permission_to_insert_record_external_restrict, no_permission_to_insert_record_in_group, no_permission_to_insert_record_in_group_restrict, no_permission_to_insert_table, no_permission_to_move_group_record_external_restrict, no_permission_to_move_record, no_permission_to_move_view, no_permission_to_read_link_field, no_permission_to_read_link_table, no_permission_to_redo, no_permission_to_set_primary_field, no_permission_to_set_primary_field_toc, no_permission_to_undo, not_find_field_group, nth, ok, operation_invalid, option_unmber, paste_max_cell_reach, query_data_sources, quick_filter_over_size, record_copy_b, record_max_size_reach, record_max_size_reach_content, refresh_and_try, render_field_stat_calculating, request_run_catch_error, reselect_paste_area, second, set_field_attributes_will_change_permission_content, set_field_attributes_will_change_permission_content_link_record, set_field_attributes_will_change_permission_content_lookup_dependency, set_field_attributes_will_change_permission_property_only_title, set_field_attributes_will_change_permission_title, set_primary_field_will_change_permission_content, set_primary_field_will_change_permission_title, sheet_name_31, sheet_name_characters_invalid, sheet_name_characters_unprinted, single_choice, single_choice_default_value1, single_choice_default_value2, single_choice_default_value3, single_choice_ques, single_select, smartcanvas, smartsheet, sort, sort_records, start_date, sub_table, summary, summary_field, summary_prompt, summary_prompt_desc, summary_prompt_desc_new, summary_prompt_example, table_loading, table_max_size_reach, tag, tag_field, tag_prompt, tag_prompt_desc, tag_prompt_desc_new, tag_prompt_example, text, text_ques, the_feature, third, title_empty, title_exist, unauthorized_record, unknown_error, unname, unname_record, unnamed_calendar, unnamed_form, unnamed_gallery, unnamed_gantt, unnamed_kanban, unnamed_list, unnamed_query, unnamed_table, untitled, update_content, update_tip, update_version_err, user_explanation, view, view_calendar, view_form, view_gantt, view_kanban, view_list, view_max_size_reach, view_not_support_frozen_field_count, view_not_support_group, view_personal_disabled_1, view_personal_disabled_2, view_photo, view_query, view_setting, view_table, wecom_call_phone_error, wecom_send_email_error, x_month_1, x_month_10, x_month_10_day, x_month_11, x_month_11_day, x_month_12, x_month_12_day, x_month_1_day, x_month_2, x_month_2_day, x_month_3, x_month_3_day, x_month_4, x_month_4_day, x_month_5, x_month_5_day, x_month_6, x_month_6_day, x_month_7, x_month_7_day, x_month_8, x_month_8_day, x_month_9, x_month_9_day, x_year, x_year_month_1, x_year_month_10, x_year_month_11, x_year_month_12, x_year_month_2, x_year_month_3, x_year_month_4, x_year_month_5, x_year_month_6, x_year_month_7, x_year_month_8, x_year_month_9, 不展示, 今天, 优先级, 修改字段设置, 全选, 公式计算结果不可直接编辑, 刚刚, 创建人, 创建时间, 前一月, 前一页, 加载中, 去重, 去重占比, 去重计数, 发送邮件, 取消, 取消全选, 后一月, 后一页, 周一, 周三, 周二, 周五, 周六, 周四, 周日, 图片数, 处理人, 学员, 完成时间, 客户, 客户跟进总结, 展开分组, 展开此行, 工作日, 已勾选, 已勾选占比, 已填写, 已填写占比, 已填写计数, 已完成, 已暂停, 已筛选, 已选择单元格, 已选择字段, 已选择记录, 平均, 平均值, 开始总结, 开始日期, 当前数值大于进度条目标值, 当前数值小于进度条起始值, 待开始, 待添加人进行总结, 待群主进行总结, 总数, 总结, 截止日期, 折叠分组, 拖拽调整冻结区域, 拨打电话, 按周查看, 按季查看, 按年查看, 按月查看, 描述, 插入位置, 操作记录, 文件数, 新建分组, 无日期记录, 无权限的字段, 无权限的记录, 无法撤销此操作, 无法重做此操作, 显示表格, 暂停原因, 暂无事项, 更新人, 更新时间, 最大值, 最小值, 最早, 最早时间, 最晚, 最晚时间, 未勾选, 未勾选占比, 未命名记录, 未填写, 未填写占比, 未设置, 来源, 标签, 标题, 此列类型不支持编辑分组, 此记录将按照分组规则调整至其他分组, 此记录将按照排序规则调整至其他位置, 求和, 没有文档查看权限, 添加一列, 添加一行, 添加列, 添加记录, 父任务, 状态, 由于权限设置无法查看该题目, 紧急, 终点, 结束, 统计, 自动计算, 范围, 行数, 计数, 记录行数, 设置时间, 请升级企业微信版本后打开, 请在企业微信内打开, 请选择, 调整中, 起点, 跟进总结, 输入待办标题, 输入电话号, 输入邮箱, 进行中, 迭代, 选项, 重新配置, 阻塞原因, 附件, 隐藏表格, smartsheet_zh_CN_default;
var init_smartsheet_zh_CN = __esmMin((() => {
	FillColor = "填色";
	add_1_record = "添加记录";
	add_field_2 = "添加字段";
	ai_client_tips = "例如：\"提炼客户意向，生成服务建议\"";
	ai_custom = "自定义 AI 生成";
	ai_entry_calculate = "使用 AI 计算";
	ai_entry_classify = "使用 AI 匹配标签";
	ai_entry_formula = "使用 AI 生成公式";
	ai_entry_generate = "使用 AI 生成";
	ai_entry_judge = "使用 AI 判断";
	ai_entry_lookup = "使用 AI 查找引用";
	ai_field_has_deleted_changed = "引用字段发生变更或已被删除";
	ai_field_select_hint_attachment = "请选择附件字段";
	ai_field_select_hint_date = "请选择日期字段";
	ai_field_select_hint_number = "请选择数字字段";
	ai_field_select_hint_select = "请选择选项字段";
	ai_generate_count = "AI 已生成 {{count}} 条记录";
	ai_generate_fail = "AI 生成失败，请稍后再试";
	ai_generate_fail_deps_all_empty = "待分析的字段内容为空，请输入内容后重试。";
	ai_generate_stop = "AI 生成停止失败，请稍后再试";
	ai_generating = "AI 正在生成中，请稍后再试";
	ai_label = "标签匹配";
	ai_loop_trigger = "存在循环触发，AI 无法自动更新";
	ai_placeholder_calculate = "帮我计算";
	ai_placeholder_classify = "帮我分类";
	ai_placeholder_formula = "帮我写公式";
	ai_placeholder_generate = "帮我生成";
	ai_placeholder_generate_image = "帮我生成图片";
	ai_placeholder_judge = "帮我判断";
	ai_placeholder_lookup = "帮我查找引用";
	ai_smart_field_input = "选择字段";
	ai_smart_field_prompt = "描述要求";
	ai_smart_field_prompt_desc = "用自然语言描述需要生成的公式/脚本逻辑，可引用字段";
	ai_smart_field_prompt_example = "例如：计算「单价」乘以「数量」，结果保留两位小数";
	ai_smart_formula = "AI 公式";
	ai_smart_script = "AI 脚本";
	ai_stopped = "已停止 AI 生成";
	ai_use_limit_month = "本月 AI 字段使用次数已达上限，请次月再继续使用";
	ai_use_limit_today = "今日 AI 字段使用次数已达上限，请明天再继续使用";
	api_doc_edit_toast = "此智能表格包含{{showName}}应用，你编辑的内容可被应用获取。";
	apostrophe = "工作表名称的起止位置不能为单引号 ' ，请尝试修改单引号位置。";
	application = "应用";
	at_least_one_view = "子表上至少需要一个公开视图";
	auto_num_generating = "生成中...";
	auto_set_primary_field_will_change_permission_content = "记录标题的最小权限为可查看，可查看记录的成员将允许查看新的标题“{{fieldTitle}}”。";
	auto_set_primary_field_will_change_permission_title = "此列被用作标题，修改将影响内容权限";
	bigdata_unable_to_open = "当前数据表记录数过多，暂不支持查看。";
	cancel = "取消";
	cannot_move_primary_field = "画册和看板视图，标题列不能移动";
	canvas_tip_add_record = "添加一行";
	capacity_exceeded = "文档容量超过最大值";
	category = "分类";
	category_field = "要分类的字段";
	category_prompt = "自定义分类要求";
	category_prompt_desc = "添加对分类的自定义要求，满足个性化总结需求";
	category_prompt_desc_new = "按用户填写的自定义提示词调用大模型，将当前行数据作为输入，原样返回模型输出结果";
	category_prompt_example = "例如：1. 将 “页面无法访问，影响了正常工作” 分类为 “负面反馈”; 2. 如果反馈中缺少有效信息，分类为 “中性反馈”";
	cell_max_size_reach = "工作表的单元格数已达上限";
	cell_max_size_reach_content = "每张工作表最多可用{{limit}}万单元格。";
	checkbox = "复选框";
	click_to_refresh = "点击刷新";
	col_attr_setting = "修改字段";
	collab_error_tip = "其他成员的内容有更新。";
	collection_form = "收集表单";
	color_sky_blue = "天蓝";
	confirm = "确认";
	confirm2 = "确定";
	continue_delete = "继续删除";
	continue_modify = "继续修改";
	continue_switch = "继续切换";
	cookie_expired_and_try_aggin = "登录态过期, 请重新登录";
	copy2 = "副本";
	copy_col = "创建副本";
	created_time_explanation = "自动展示每行记录的创建时间，不可修改";
	created_user_explanation = "自动展示每行记录的创建人，不可修改";
	custom_prompt = "自定义生成要求";
	custom_prompt_desc_new = "按用户填写的自定义提示词调用大模型，将当前行数据作为输入，原样返回模型输出结果";
	custom_prompt_example = "例如：结合 “产品名称”“使用场景” 生成适合发朋友圈的推广文案";
	dashboard = "仪表盘";
	dashboard_component_num_limit = "当前仪表盘组件数量已达上限，请删除部分组件后重试。";
	data_loading = "数据加载中，待加载完成后开放编辑";
	date = "日期";
	default_query_result_title = "查询结果";
	del = "删除";
	delete_field_is_gantt_date_field = "此列是 “{{viewsName}}” 的开始/结束日期列，你确定要删除吗？";
	delete_field_is_kanban_group = "此列是 “{{viewsName}}” 的分组依据，删除后 “{{viewsName}}” 将失效，你确定要删除吗？";
	delete_field_will_change_permission_content1 = "内容权限已使用“{{fieldTitle}}”字段判断权限，删除字段后，将影响成员可查看的记录范围。";
	delete_field_will_change_permission_content2 = "内容权限已使用部分字段判断权限，删除字段后，将影响成员可查看的记录范围。";
	delete_field_will_change_permission_title = "删除字段将会影响权限";
	delete_include_primary_field = "因视图展示要求，至少有一列需是「文本、数字、链接、日期、电话、邮箱、进度、公式」类型";
	end_date = "结束时间";
	field_attachment = "文件";
	field_auto_number = "自动编号";
	field_barcode = "条码";
	field_create_time = "创建时间";
	field_creator = "创建人";
	field_currency = "货币";
	field_email = "邮箱";
	field_exist_in_other_field_group = "字段已存在于其他编组中";
	field_formula = "公式";
	field_group = "编组";
	field_group_b = "群聊";
	field_group_max_size_reach = "工作表的编组数已达上限";
	field_group_max_size_reach_content = "每张工作表最多{{limit}}个编组。";
	field_group_name_too_long = "编组名称最多支持 {{length}} 个字，请修改后再保存";
	field_last_edit_time = "最后编辑时间";
	field_last_editor = "最后编辑人";
	field_link_records = "关联";
	field_location = "地理位置";
	field_lookup = "查找引用";
	field_max_size_reach = "工作表的列数已达上限";
	field_max_size_reach_content = "每张工作表最多{{limit}}列字段。";
	field_not_support_option_group = "非选项列类型不支持设置选项分组";
	field_number = "数字";
	field_percent = "百分数";
	field_progress = "进度";
	field_tel = "电话";
	field_title = "列标题";
	field_type_image = "图片";
	field_user = "人员";
	file_not_support_svg = "暂不支持上传svg格式图片";
	file_not_support_type = "部分图片未上传，因为损坏或格式不支持。";
	filler = "填写者";
	filter = "筛选";
	first = "第1个";
	form_collection_results = "表单收集结果";
	formula_array_data_oversize_default_message = "数据量过大，超过公式计算限制。";
	formula_brackets_not_match_detail_message = "缺少{{type}}括号，请检查括号是否成对。";
	formula_brackets_not_match_message = "括号不足。";
	formula_calc_error_categories = "计算错误";
	formula_circle_categories = "循环引用";
	formula_circle_default_message = "存在循环引用，请修改公式。";
	formula_circle_detail_message = "公式字段“{{currTitle}}”和公式字段“{{circleTitle}}”存在循环引用，请修改公式。";
	formula_complex_formula_skip_default_message = "复杂公式，跳过计算。";
	formula_content_deleted_categories = "内容被删除";
	formula_content_permission_limit_default_message = "请前往智能表格中查看计算结果";
	formula_convert_error_categories = "类型转换错误";
	formula_convert_error_default_message = "无法转换类型，请修改输出类型。";
	formula_convert_error_detail_message = "无法转化为{{formatterName}}，请修改输出类型。";
	formula_convert_to_date_detail_message = "“{{formulaName}}”的参数“{{currValue}}”无法解析为日期/时间。";
	formula_convert_to_double_detail_message = "“{{formulaName}}”函数中的{{paramOrdinal}}参数需要数字值，但“{{currValue}}”无法强制转换为数字。";
	formula_division_by_zero_default_message = "除数不可为0。";
	formula_dottable_default_message = "整表引用只能是FILTER函数的第一个参数";
	formula_error_default_message = "计算错误。";
	formula_explanation = "你可以通过公式列进行函数计算";
	formula_field_in_quotes_default_message = "引号无法识别，请删除多余引号。";
	formula_field_not_existed_default_message = "字段已被删除，请重新选择。";
	formula_formula_error_categories = "公式错误";
	formula_illegal_argument_default_message = "参数输入错误。";
	formula_illegal_char_default_message = "公式不完整。";
	formula_incomplete_formula_categories = "公式不完整";
	formula_invalid_param_default_message = "参数值不对。";
	formula_invalid_params_categories = "参数值不对";
	formula_loading = "计算中...";
	formula_lookup_property_error_default_message = "无法计算，未完成字段设置。";
	formula_missing_field_id_in_filter_for_ss_default_message = "引用整表时，FILTER函数需指定引用字段。";
	formula_missing_field_on_each_default_message = "整表引用时,FILTER、COUNTIF、SUMIF函数内的EACH参数需要引用具体字段";
	formula_missing_table_on_field_ref_default_message = "仅支持数据表、关联字段引用字段";
	formula_nested_filter_default_message = "FILTER、SUMIF、COUNTIF函数不支持嵌套使用";
	formula_param_calc_error_default_message = "参数计算错误。";
	formula_param_should_be_greater_than_detail_message = "“{{formulaName}}”函数中的{{paramOrdinal}}参数的值为{{currValue}}。有效值应大于{{validValue}}。";
	formula_param_should_be_greater_than_or_equal_detail_message = "“{{formulaName}}”函数中的{{paramOrdinal}}参数的值为{{currValue}}。有效值应大于等于{{validValue}}。";
	formula_param_should_be_less_than_detail_message = "“{{formulaName}}”函数中的{{paramOrdinal}}参数的值为{{currValue}}。有效值应小于{{validValue}}。";
	formula_param_should_be_less_than_or_equal_detail_message = "“{{formulaName}}”函数中的{{paramOrdinal}}参数的值为{{currValue}}。有效值应小于等于{{validValue}}。";
	formula_parameter_exceeded_default_message = "参数个数太多。";
	formula_parameter_exceeded_detail_message1 = "“{{formulaName}}函数参数过多，应该有{{paramCountLowerLimit}}-{{paramCountUpperLimit}}个，实际有{{currParamCount}}个。";
	formula_parameter_exceeded_detail_message2 = "“{{formulaName}}函数参数过多，最多有{{paramCountLowerLimit}}个，实际有{{currParamCount}}个。";
	formula_parameter_missing_default_message = "参数个数不足。";
	formula_parameter_missing_detail_message1 = "“{{formulaName}}函数缺少参数，应该有{{paramCountLowerLimit}}-{{paramCountUpperLimit}}个，实际有{{currParamCount}}个。";
	formula_parameter_missing_detail_message2 = "“{{formulaName}}函数缺少参数，最少{{paramCountLowerLimit}}个，实际有{{currParamCount}}个。";
	formula_performance_exceeded_categories = "性能超限";
	formula_result_exceeds_cell_32k_limit_default_message = "计算结果过大，超过单个单元格数据上限";
	formula_table_not_existed_default_message = "引用的工作表已被删除，请重新选择。";
	formula_table_ref_not_supported_for_ss_default_message = "仅支持在FILTER、COUNTIF函数中引用整表。";
	formula_table_sumif_error_default_message = "整表引用时，SUMIF函数需要[整表].[字段]一起引用";
	formula_text_without_quote_detail_message = "找不到名为“{{originText}}”的引用，如需可使用双引号括起来，如{{quoteText}}";
	formula_text_without_quote_slice_detail_message = "找不到名为“{{originText}}”等的引用，如需可使用双引号括起来，如{{quoteText}}";
	formula_too_many_sub_process_default_message = "数据量过大，超过公式计算上限。";
	formula_uninterrupted_default_message = "左侧缺少运算符，请补充完整。";
	formula_unknown_function_default_message = "无效的函数名称。";
	formula_unknown_function_detail_message = "“{{name}}”函数不在支持的函数列表里。";
	formula_unknown_name_default_message = "无效的参数名称。";
	formula_unknown_name_detail_message = "找不到“{{name}}”数据表或字段。";
	formula_unrecognied_formula_categories = "不识别的内容";
	formula_upstream_standard_cell_error_default_message = "后台计算出错。";
	get_link = "链接已复制";
	group = "分组";
	hide_col = "隐藏";
	hyperlink = "链接";
	image_comprehension = "图片理解";
	image_comprehension_field = "要理解的图片";
	image_comprehension_prompt = "自定义描述要求";
	image_comprehension_prompt_desc_new = "自动理解图片内容，生成自然语言描述、提取关键文字/数字/物体/表格/场景，或回答图片相关问题 支持发票/合同/商品图/白板";
	image_comprehension_prompt_example = "例如：请识别图片内的快递单号";
	information_extraction = "信息提取";
	information_extraction_custom_prompt = "自定义提取要求";
	information_extraction_custom_prompt_example = "例如：1. 从 “陈明 广东 130xxxx1234” 中提取“地址信息”，输出 “广东”; 2. 输出结果不含空格";
	information_extraction_field = "要提取信息的字段";
	information_extraction_prompt_desc_new = "从非结构化文本/备注/邮件/聊天中精准提取指定字段（如姓名、电话、金额、日期、产品型号、地址、订单号等） 支持多字段同时提取";
	input_valid_email = "请输入有效的邮箱地址";
	instruction_page = "使用说明";
	is_not_primary_field_types = "标题列不支持设置该列类型";
	link_records_explanation = "你可以通过关联列获取其他智能表的数据";
	m_bigdata_unable_to_open = "当前数据表记录数过多，暂不支持在移动端查看。";
	m_open_with_pc = "请在电脑上查看";
	modified_time_explanation = "自动展示每行记录最后一次编辑的时间，不可修改";
	modified_user_explanation = "自动展示每行记录的最后编辑人，不可修改";
	modify_date_time_field_is_gantt_date_field = "此列是 “{{viewsName}}” 的开始/结束日期列，修改列类型后 “{{viewsName}}” 将失效，你确定要修改吗？";
	modify_field_is_kanban_group = "此列是 “{{viewsName}}” 的分组依据，修改后 “{{viewsName}}” 将失效，你确定要修改吗？";
	multiple_select = "多选";
	no_permission = "用户权限发生变化，暂不支持此操作。";
	no_permission_to_copy_formula_field = "你没有引用表的全部记录权限，不支持创建列副本";
	no_permission_to_create_view = "管理员已设置内容权限，你无法添加视图。";
	no_permission_to_delete_view = "管理员已设置内容权限，你无法删除视图。";
	no_permission_to_edit_field_group = "管理员已设置内容权限，需全部权限才能编辑字段编组。";
	no_permission_to_edit_view_config = "管理员已设置内容权限，你无法修改视图设置。";
	no_permission_to_fill_selection = "无法填充，部分字段内容只可查看。";
	no_permission_to_fill_single_selection = "无法填充只可查看的字段内容。";
	no_permission_to_insert_record = "管理员已设置内容权限，你无法添加记录。";
	no_permission_to_insert_record_external_restrict = "工作表已从其他应用同步数据，不可添加记录。";
	no_permission_to_insert_record_in_group = "没有分组字段的权限，不支持添加记录到此分组。";
	no_permission_to_insert_record_in_group_restrict = "工作表已从其他应用同步数据，不可添加记录到此分组。";
	no_permission_to_insert_table = "管理员已设置内容权限，你没有权限新建工作表。";
	no_permission_to_move_group_record_external_restrict = "工作表已从其他应用同步数据，不可移动记录。";
	no_permission_to_move_record = "管理员已设置内容权限，你没有权限移动记录。";
	no_permission_to_move_view = "管理员已设置内容权限，你无法移动视图。";
	no_permission_to_read_link_field = "无权查看被引用的字段";
	no_permission_to_read_link_table = "无权查看被关联的工作表";
	no_permission_to_redo = "无权限重做";
	no_permission_to_set_primary_field = "管理员已设置内容权限，仅管理员可以切换标题字段。";
	no_permission_to_set_primary_field_toc = "所有者已设置内容权限，仅所有者可以切换标题字段。";
	no_permission_to_undo = "无权限撤销";
	not_find_field_group = "编组不存在";
	nth = "第{{index}}个";
	ok = "好的";
	operation_invalid = "操作失败，请重试";
	option_unmber = "选项{{number}}";
	paste_max_cell_reach = "数据量过大，操作不成功，请尝试分批操作或减少数据量。";
	query_data_sources = "查询页数据源";
	quick_filter_over_size = "最多固定 3 个字段到工具栏";
	record_copy_b = "创建副本";
	record_max_size_reach = "工作表的行数已达上限";
	record_max_size_reach_content = "每张工作表最多{{limit}}行记录。";
	refresh_and_try = "操作无效，请刷新后重试";
	render_field_stat_calculating = "加载中";
	request_run_catch_error = "智能表发生未知错误，请刷新后再尝试";
	reselect_paste_area = "请重新选择粘贴范围";
	second = "第2个";
	set_field_attributes_will_change_permission_content = "内容权限已使用“{{fieldTitle}}”字段判断权限，修改类型后，相关成员将无法查看工作表。";
	set_field_attributes_will_change_permission_content_link_record = "内容权限已使用“{{fieldTitle}}”配置的引用字段判断权限，修改关联列配置信息后，将影响引用字段，相关成员将无法查看工作表。";
	set_field_attributes_will_change_permission_content_lookup_dependency = "内容权限已使用“{{fieldTitle}}”配置的引用字段判断权限，修改类型后，引用字段的字段类型也将改变，相关成员将无法查看工作表。";
	set_field_attributes_will_change_permission_property_only_title = "修改配置信息将会影响权限";
	set_field_attributes_will_change_permission_title = "修改字段类型将会影响权限";
	set_primary_field_will_change_permission_content = "记录标题的最小权限为可查看，切换标题后此列将对全员可见。";
	set_primary_field_will_change_permission_title = "切换记录标题将影响内容权限";
	sheet_name_31 = "子表名称不可以超过31个字符。";
	sheet_name_characters_invalid = "子表名称不能包含以下字符： : \\ / ? * [ ] ，请尝试删除这些字符。";
	sheet_name_characters_unprinted = "子表名称可能包含某些不可见的特殊字符，请删除这些字符或空格。";
	single_choice = "单选";
	single_choice_default_value1 = "未开始";
	single_choice_default_value2 = "进行中";
	single_choice_default_value3 = "已完成";
	single_choice_ques = "单选题";
	single_select = "单选";
	smartcanvas = "说明页";
	smartsheet = "智能表";
	sort = "排序";
	sort_records = "记录排序";
	start_date = "开始时间";
	sub_table = "子表";
	summary = "总结";
	summary_field = "要总结的字段（可多选）";
	summary_prompt = "自定义总结要求";
	summary_prompt_desc = "添加对总结内容的自定义要求，满足个性化总结需求";
	summary_prompt_desc_new = "将长文本、会议记录、客户反馈、邮件、文章自动压缩成简洁摘要（支持控制：50字/100字/bullet points/关键决策点）";
	summary_prompt_example = "例如：提炼内容要点，保留关键的数据";
	table_loading = "子表数据未加载完毕，请稍候";
	table_max_size_reach = "工作表数量已达上限（{{table}}个），可删除部分工作表后再试。";
	tag = "标签";
	tag_field = "要匹配标签的字段";
	tag_prompt = "自定义标签匹配要求";
	tag_prompt_desc = "添加对匹配标签的自定义要求，满足个性化总结需求";
	tag_prompt_desc_new = "根据预设标签库 + 规则（关键词/正则/语义），自动匹配并输出对应标签集合（适合多选标签字段） 可与智能分类结合使用";
	tag_prompt_example = "例如：1. “菜品味道不错，但等太久了” 的匹配标签为 “味道”、“出餐时间”; 2. 每个标签不超过5个字";
	text = "文本";
	text_ques = "文本题";
	the_feature = "该功能";
	third = "第3个";
	title_empty = "{{type}}名称不能为空";
	title_exist = "{{type}}名称 “{{title}}” 已存在，请输入其他名称";
	unauthorized_record = "无权限的记录";
	unknown_error = "未知错误";
	unname = "未命名";
	unname_record = "未命名记录";
	unnamed_calendar = "日历";
	unnamed_form = "表单";
	unnamed_gallery = "画册";
	unnamed_gantt = "甘特";
	unnamed_kanban = "看板";
	unnamed_list = "列表";
	unnamed_query = "查询页";
	unnamed_table = "表格";
	untitled = "无标题";
	update_content = "智能表格有新版本，即将重新加载";
	update_tip = "更新提示";
	update_version_err = "无法打开，文档中包含不兼容的数据";
	user_explanation = "你可以在人员列类型@人";
	view = "视图";
	view_calendar = "日历视图";
	view_form = "表单视图";
	view_gantt = "甘特视图";
	view_kanban = "看板视图";
	view_list = "列表视图";
	view_max_size_reach = "视图数量已达上限（{{view}}个），建议删除无用视图后再试。";
	view_not_support_frozen_field_count = "该视图不支持设置冻结列";
	view_not_support_group = "该视图类型不支持设置分组";
	view_personal_disabled_1 = "仅可设置自己创建的视图为个人视图";
	view_personal_disabled_2 = "设置后，公共视图&锁定视图总数小于1";
	view_photo = "画册视图";
	view_query = "查询视图";
	view_setting = "查看设置";
	view_table = "表格视图";
	wecom_call_phone_error = "暂不支持使用公费电话拨打此号码";
	wecom_send_email_error = "无法发送，请检查邮箱地址";
	x_month_1 = "1月";
	x_month_10 = "10月";
	x_month_10_day = "10月{{day}}日";
	x_month_11 = "11月";
	x_month_11_day = "11月{{day}}日";
	x_month_12 = "12月";
	x_month_12_day = "12月{{day}}日";
	x_month_1_day = "1月{{day}}日";
	x_month_2 = "2月";
	x_month_2_day = "2月{{day}}日";
	x_month_3 = "3月";
	x_month_3_day = "3月{{day}}日";
	x_month_4 = "4月";
	x_month_4_day = "4月{{day}}日";
	x_month_5 = "5月";
	x_month_5_day = "5月{{day}}日";
	x_month_6 = "6月";
	x_month_6_day = "6月{{day}}日";
	x_month_7 = "7月";
	x_month_7_day = "7月{{day}}日";
	x_month_8 = "8月";
	x_month_8_day = "8月{{day}}日";
	x_month_9 = "9月";
	x_month_9_day = "9月{{day}}日";
	x_year = "{{year}}年";
	x_year_month_1 = "{{year}}年1月";
	x_year_month_10 = "{{year}}年10月";
	x_year_month_11 = "{{year}}年11月";
	x_year_month_12 = "{{year}}年12月";
	x_year_month_2 = "{{year}}年2月";
	x_year_month_3 = "{{year}}年3月";
	x_year_month_4 = "{{year}}年4月";
	x_year_month_5 = "{{year}}年5月";
	x_year_month_6 = "{{year}}年6月";
	x_year_month_7 = "{{year}}年7月";
	x_year_month_8 = "{{year}}年8月";
	x_year_month_9 = "{{year}}年9月";
	不展示 = "不展示";
	今天 = "今天";
	优先级 = "优先级";
	修改字段设置 = "修改字段设置";
	全选 = "全选";
	公式计算结果不可直接编辑 = "公式计算结果不可直接编辑";
	刚刚 = "刚刚";
	创建人 = "创建人";
	创建时间 = "创建时间";
	前一月 = "前一月";
	前一页 = "前一页";
	加载中 = "加载中";
	去重 = "去重";
	去重占比 = "去重占比";
	去重计数 = "去重计数";
	发送邮件 = "发送邮件";
	取消 = "取消";
	取消全选 = "取消全选";
	后一月 = "后一月";
	后一页 = "后一页";
	周一 = "周一";
	周三 = "周三";
	周二 = "周二";
	周五 = "周五";
	周六 = "周六";
	周四 = "周四";
	周日 = "周日";
	图片数 = "图片数";
	处理人 = "处理人";
	学员 = "学员";
	完成时间 = "完成时间";
	客户 = "客户";
	客户跟进总结 = "客户跟进总结";
	展开分组 = "展开分组";
	展开此行 = "展开此行";
	工作日 = "工作日";
	已勾选 = "已勾选";
	已勾选占比 = "已勾选占比";
	已填写 = "已填写";
	已填写占比 = "已填写占比";
	已填写计数 = "已填写计数";
	已完成 = "已完成";
	已暂停 = "已暂停";
	已筛选 = "已筛选";
	已选择单元格 = "已选择单元格";
	已选择字段 = "已选择字段";
	已选择记录 = "已选择记录";
	平均 = "平均";
	平均值 = "平均值";
	开始总结 = "开始总结";
	开始日期 = "开始日期";
	当前数值大于进度条目标值 = "当前数值大于进度条目标值";
	当前数值小于进度条起始值 = "当前数值小于进度条起始值";
	待开始 = "待开始";
	待添加人进行总结 = "待添加人进行总结";
	待群主进行总结 = "待群主进行总结";
	总数 = "总数";
	总结 = "总结";
	截止日期 = "截止日期";
	折叠分组 = "折叠分组";
	拖拽调整冻结区域 = "拖拽调整冻结区域";
	拨打电话 = "拨打电话";
	按周查看 = "按周查看";
	按季查看 = "按季查看";
	按年查看 = "按年查看";
	按月查看 = "按月查看";
	描述 = "描述";
	插入位置 = "插入位置";
	操作记录 = "操作记录";
	文件数 = "文件数";
	新建分组 = "新建分组";
	无日期记录 = "无日期记录";
	无权限的字段 = "无权限的字段";
	无权限的记录 = "无权限的记录";
	无法撤销此操作 = "无法撤销此操作";
	无法重做此操作 = "无法重做此操作";
	显示表格 = "显示表格";
	暂停原因 = "暂停原因";
	暂无事项 = "暂无事项";
	更新人 = "更新人";
	更新时间 = "更新时间";
	最大值 = "最大值";
	最小值 = "最小值";
	最早 = "最早";
	最早时间 = "最早时间";
	最晚 = "最晚";
	最晚时间 = "最晚时间";
	未勾选 = "未勾选";
	未勾选占比 = "未勾选占比";
	未命名记录 = "未命名记录";
	未填写 = "未填写";
	未填写占比 = "未填写占比";
	未设置 = "未设置";
	来源 = "来源";
	标签 = "标签";
	标题 = "标题";
	此列类型不支持编辑分组 = "此列类型不支持编辑分组";
	此记录将按照分组规则调整至其他分组 = "此记录将按照分组规则调整至其他分组";
	此记录将按照排序规则调整至其他位置 = "此记录将按照排序规则调整至其他位置";
	求和 = "求和";
	没有文档查看权限 = "没有文档查看权限";
	添加一列 = "添加一列";
	添加一行 = "添加一行";
	添加列 = "添加列";
	添加记录 = "添加记录";
	父任务 = "父任务";
	状态 = "状态";
	由于权限设置无法查看该题目 = "由于权限设置无法查看该题目";
	紧急 = "紧急";
	终点 = "终点";
	结束 = "结束";
	统计 = "统计";
	自动计算 = "自动计算";
	范围 = "范围";
	行数 = "行数";
	计数 = "计数";
	记录行数 = "记录行数";
	设置时间 = "设置时间";
	请升级企业微信版本后打开 = "请升级企业微信版本后打开";
	请在企业微信内打开 = "请在企业微信内打开";
	请选择 = "请选择";
	调整中 = "调整中";
	起点 = "起点";
	跟进总结 = "跟进总结";
	输入待办标题 = "输入待办标题";
	输入电话号 = "输入电话号";
	输入邮箱 = "输入邮箱";
	进行中 = "进行中";
	迭代 = "迭代";
	选项 = "选项";
	重新配置 = "重新配置";
	阻塞原因 = "阻塞原因";
	附件 = "附件";
	隐藏表格 = "隐藏表格";
	smartsheet_zh_CN_default = {
		" 等 {{userCount}} 人": " 等 {{userCount}} 人",
		"0day": "0 天",
		"0month": "0 月",
		"@微信": "@微信",
		"AI 生成中({{progress}}%)": "AI 生成中({{progress}}%)",
		"AI 生成失败": "AI 生成失败",
		FillColor,
		add_1_record,
		add_field_2,
		ai_client_tips,
		ai_custom,
		ai_entry_calculate,
		ai_entry_classify,
		ai_entry_formula,
		ai_entry_generate,
		ai_entry_judge,
		ai_entry_lookup,
		ai_field_has_deleted_changed,
		ai_field_select_hint_attachment,
		ai_field_select_hint_date,
		ai_field_select_hint_number,
		ai_field_select_hint_select,
		ai_generate_count,
		ai_generate_fail,
		ai_generate_fail_deps_all_empty,
		ai_generate_stop,
		ai_generating,
		ai_label,
		ai_loop_trigger,
		ai_placeholder_calculate,
		ai_placeholder_classify,
		ai_placeholder_formula,
		ai_placeholder_generate,
		ai_placeholder_generate_image,
		ai_placeholder_judge,
		ai_placeholder_lookup,
		ai_smart_field_input,
		ai_smart_field_prompt,
		ai_smart_field_prompt_desc,
		ai_smart_field_prompt_example,
		ai_smart_formula,
		ai_smart_script,
		ai_stopped,
		ai_use_limit_month,
		ai_use_limit_today,
		api_doc_edit_toast,
		apostrophe,
		application,
		at_least_one_view,
		auto_num_generating,
		auto_set_primary_field_will_change_permission_content,
		auto_set_primary_field_will_change_permission_title,
		bigdata_unable_to_open,
		cancel,
		cannot_move_primary_field,
		canvas_tip_add_record,
		capacity_exceeded,
		category,
		category_field,
		category_prompt,
		category_prompt_desc,
		category_prompt_desc_new,
		category_prompt_example,
		cell_max_size_reach,
		cell_max_size_reach_content,
		checkbox,
		click_to_refresh,
		col_attr_setting,
		collab_error_tip,
		collection_form,
		color_blue: "蓝",
		color_dark: "深",
		color_gray: "灰",
		color_green: "绿",
		color_light: "浅",
		color_orange: "橙",
		color_pink: "粉",
		color_purple: "紫",
		color_red: "红",
		color_sky_blue,
		color_white: "白",
		color_yellow: "黄",
		confirm,
		confirm2,
		continue_delete,
		continue_modify,
		continue_switch,
		cookie_expired_and_try_aggin,
		copy2,
		copy_col,
		created_time_explanation,
		created_user_explanation,
		custom_prompt,
		custom_prompt_desc_new,
		custom_prompt_example,
		dashboard,
		dashboard_component_num_limit,
		data_loading,
		date,
		day: "日",
		default_query_result_title,
		del,
		delete_field_is_gantt_date_field,
		delete_field_is_kanban_group,
		delete_field_will_change_permission_content1,
		delete_field_will_change_permission_content2,
		delete_field_will_change_permission_title,
		delete_include_primary_field,
		dim_month: "月",
		end_date,
		field: "列",
		field_attachment,
		field_auto_number,
		field_barcode,
		field_create_time,
		field_creator,
		field_currency,
		field_email,
		field_exist_in_other_field_group,
		field_formula,
		field_group,
		field_group_b,
		field_group_max_size_reach,
		field_group_max_size_reach_content,
		field_group_name_too_long,
		field_last_edit_time,
		field_last_editor,
		field_link_records,
		field_location,
		field_lookup,
		field_max_size_reach,
		field_max_size_reach_content,
		field_not_support_option_group,
		field_number,
		field_percent,
		field_progress,
		field_tel,
		field_title,
		field_type_image,
		field_user,
		file_not_support_svg,
		file_not_support_type,
		filler,
		filter,
		first,
		form_collection_results,
		formula_array_data_oversize_default_message,
		formula_brackets_not_match_detail_message,
		formula_brackets_not_match_message,
		formula_calc_error_categories,
		formula_circle_categories,
		formula_circle_default_message,
		formula_circle_detail_message,
		formula_complex_formula_skip_default_message,
		formula_content_deleted_categories,
		formula_content_permission_limit_default_message,
		formula_convert_error_categories,
		formula_convert_error_default_message,
		formula_convert_error_detail_message,
		formula_convert_to_date_detail_message,
		formula_convert_to_double_detail_message,
		formula_division_by_zero_default_message,
		formula_dottable_default_message,
		formula_error_default_message,
		formula_explanation,
		formula_field_in_quotes_default_message,
		formula_field_not_existed_default_message,
		formula_formula_error_categories,
		formula_illegal_argument_default_message,
		formula_illegal_char_default_message,
		formula_incomplete_formula_categories,
		formula_invalid_param_default_message,
		formula_invalid_params_categories,
		formula_loading,
		formula_lookup_property_error_default_message,
		formula_missing_field_id_in_filter_for_ss_default_message,
		formula_missing_field_on_each_default_message,
		formula_missing_table_on_field_ref_default_message,
		formula_nested_filter_default_message,
		formula_param_calc_error_default_message,
		formula_param_should_be_greater_than_detail_message,
		formula_param_should_be_greater_than_or_equal_detail_message,
		formula_param_should_be_less_than_detail_message,
		formula_param_should_be_less_than_or_equal_detail_message,
		formula_parameter_exceeded_default_message,
		formula_parameter_exceeded_detail_message1,
		formula_parameter_exceeded_detail_message2,
		formula_parameter_missing_default_message,
		formula_parameter_missing_detail_message1,
		formula_parameter_missing_detail_message2,
		formula_performance_exceeded_categories,
		formula_result_exceeds_cell_32k_limit_default_message,
		formula_table_not_existed_default_message,
		formula_table_ref_not_supported_for_ss_default_message,
		formula_table_sumif_error_default_message,
		formula_text_without_quote_detail_message,
		formula_text_without_quote_slice_detail_message,
		formula_too_many_sub_process_default_message,
		formula_uninterrupted_default_message,
		formula_unknown_function_default_message,
		formula_unknown_function_detail_message,
		formula_unknown_name_default_message,
		formula_unknown_name_detail_message,
		formula_unrecognied_formula_categories,
		formula_upstream_standard_cell_error_default_message,
		get_link,
		group,
		hide_col,
		hyperlink,
		image_comprehension,
		image_comprehension_field,
		image_comprehension_prompt,
		image_comprehension_prompt_desc_new,
		image_comprehension_prompt_example,
		information_extraction,
		information_extraction_custom_prompt,
		information_extraction_custom_prompt_example,
		information_extraction_field,
		information_extraction_prompt_desc_new,
		input_valid_email,
		instruction_page,
		is_not_primary_field_types,
		left: "左",
		link_records_explanation,
		m_bigdata_unable_to_open,
		m_open_with_pc,
		modified_time_explanation,
		modified_user_explanation,
		modify_date_time_field_is_gantt_date_field,
		modify_field_is_kanban_group,
		multiple_select,
		no: "否",
		no_permission,
		no_permission_to_copy_formula_field,
		no_permission_to_create_view,
		no_permission_to_delete_view,
		no_permission_to_edit_field_group,
		no_permission_to_edit_view_config,
		no_permission_to_fill_selection,
		no_permission_to_fill_single_selection,
		no_permission_to_insert_record,
		no_permission_to_insert_record_external_restrict,
		no_permission_to_insert_record_in_group,
		no_permission_to_insert_record_in_group_restrict,
		no_permission_to_insert_table,
		no_permission_to_move_group_record_external_restrict,
		no_permission_to_move_record,
		no_permission_to_move_view,
		no_permission_to_read_link_field,
		no_permission_to_read_link_table,
		no_permission_to_redo,
		no_permission_to_set_primary_field,
		no_permission_to_set_primary_field_toc,
		no_permission_to_undo,
		not_find_field_group,
		nth,
		ok,
		operation_invalid,
		option_unmber,
		paste_max_cell_reach,
		query_data_sources,
		quick_filter_over_size,
		record_copy_b,
		record_max_size_reach,
		record_max_size_reach_content,
		refresh_and_try,
		render_field_stat_calculating,
		request_run_catch_error,
		reselect_paste_area,
		right: "右",
		second,
		set_field_attributes_will_change_permission_content,
		set_field_attributes_will_change_permission_content_link_record,
		set_field_attributes_will_change_permission_content_lookup_dependency,
		set_field_attributes_will_change_permission_property_only_title,
		set_field_attributes_will_change_permission_title,
		set_primary_field_will_change_permission_content,
		set_primary_field_will_change_permission_title,
		sheet_name_31,
		sheet_name_characters_invalid,
		sheet_name_characters_unprinted,
		single_choice,
		single_choice_default_value1,
		single_choice_default_value2,
		single_choice_default_value3,
		single_choice_ques,
		single_select,
		smartcanvas,
		smartsheet,
		sort,
		sort_records,
		start_date,
		sub_table,
		summary,
		summary_field,
		summary_prompt,
		summary_prompt_desc,
		summary_prompt_desc_new,
		summary_prompt_example,
		table_loading,
		table_max_size_reach,
		tag,
		tag_field,
		tag_prompt,
		tag_prompt_desc,
		tag_prompt_desc_new,
		tag_prompt_example,
		ten_thousand: "万",
		text,
		text_ques,
		the_feature,
		third,
		title_empty,
		title_exist,
		unauthorized_record,
		unknown_error,
		unname,
		unname_record,
		unnamed_calendar,
		unnamed_form,
		unnamed_gallery,
		unnamed_gantt,
		unnamed_kanban,
		unnamed_list,
		unnamed_query,
		unnamed_table,
		untitled,
		update_content,
		update_tip,
		update_version_err,
		user_explanation,
		view,
		view_calendar,
		view_form,
		view_gantt,
		view_kanban,
		view_list,
		view_max_size_reach,
		view_not_support_frozen_field_count,
		view_not_support_group,
		view_personal_disabled_1,
		view_personal_disabled_2,
		view_photo,
		view_query,
		view_setting,
		view_table,
		wecom_call_phone_error,
		wecom_send_email_error,
		x_month_1,
		x_month_10,
		x_month_10_day,
		x_month_11,
		x_month_11_day,
		x_month_12,
		x_month_12_day,
		x_month_1_day,
		x_month_2,
		x_month_2_day,
		x_month_3,
		x_month_3_day,
		x_month_4,
		x_month_4_day,
		x_month_5,
		x_month_5_day,
		x_month_6,
		x_month_6_day,
		x_month_7,
		x_month_7_day,
		x_month_8,
		x_month_8_day,
		x_month_9,
		x_month_9_day,
		x_year,
		x_year_month_1,
		x_year_month_10,
		x_year_month_11,
		x_year_month_12,
		x_year_month_2,
		x_year_month_3,
		x_year_month_4,
		x_year_month_5,
		x_year_month_6,
		x_year_month_7,
		x_year_month_8,
		x_year_month_9,
		yes: "是",
		"{{count}}天": "{{count}}天",
		"{{count}}月": "{{count}}月",
		"{{count}}项": "{{count}}项",
		"{{dayFrom}}日 - {{dayTo}}日": "{{dayFrom}}日 - {{dayTo}}日",
		一: "一",
		三: "三",
		不展示,
		中: "中",
		二: "二",
		五: "五",
		今天,
		优先级,
		"伟大的计划从这里开始，快来新建待办吧": "伟大的计划从这里开始，快来新建待办吧",
		低: "低",
		修改字段设置,
		全选,
		公式计算结果不可直接编辑,
		六: "六",
		共: "共",
		"列宽度：{{newWidth}} 像素": "列宽度：{{newWidth}} 像素",
		"列编组宽度：{{newWidth}} 像素": "列编组宽度：{{newWidth}} 像素",
		刚刚,
		创建人,
		创建时间,
		前一月,
		前一页,
		加载中,
		"包含不能填充的单元格，因为这些单元格的内容是自动生成的": "包含不能填充的单元格，因为这些单元格的内容是自动生成的",
		去重,
		去重占比,
		去重计数,
		发送邮件,
		取消,
		取消全选,
		后一月,
		后一页,
		周: "周",
		周一,
		周三,
		周二,
		周五,
		周六,
		周四,
		周日,
		四: "四",
		图片数,
		处理人,
		天: "天",
		季: "季",
		学员,
		完成时间,
		客户,
		客户跟进总结,
		展开分组,
		展开此行,
		工作日,
		"工作表已从其他应用同步数据，不可新增分组。": "工作表已从其他应用同步数据，不可新增分组。",
		"工作表已从其他应用同步数据，不可编辑分组。": "工作表已从其他应用同步数据，不可编辑分组。",
		"左右滑动查看（{{shortcut}}+鼠标滚轮）": "左右滑动查看（{{shortcut}}+鼠标滚轮）",
		已勾选,
		已勾选占比,
		已填写,
		已填写占比,
		已填写计数,
		已完成,
		已暂停,
		已筛选,
		"已设置筛选，修改记录符合筛选条件才会显示": "已设置筛选，修改记录符合筛选条件才会显示",
		已选择单元格,
		已选择字段,
		已选择记录,
		平均,
		平均值,
		年: "年",
		"开启了自动排序，记录无法移动。": "开启了自动排序，记录无法移动。",
		开始总结,
		开始日期,
		当前数值大于进度条目标值,
		当前数值小于进度条起始值,
		待开始,
		待添加人进行总结,
		待群主进行总结,
		总数,
		总结,
		截止日期,
		"所有者已设置内容权限， 需全部权限才能添加分组。": "所有者已设置内容权限， 需全部权限才能添加分组。",
		"所有者已设置内容权限，你无法添加记录。": "所有者已设置内容权限，你无法添加记录。",
		"所有者已设置内容权限，需全部权限才能编辑字段。": "所有者已设置内容权限，需全部权限才能编辑字段。",
		折叠分组,
		拖拽调整冻结区域,
		拨打电话,
		按周查看,
		按季查看,
		按年查看,
		按月查看,
		描述,
		插入位置,
		操作记录,
		文件数,
		新建分组,
		无: "无",
		"无可 AI 生成的记录": "无可 AI 生成的记录",
		无日期记录,
		无权限的字段,
		无权限的记录,
		"无法修改包含收集表问题的列类型，修改后会导致收集结果更新失败": "无法修改包含收集表问题的列类型，修改后会导致收集结果更新失败",
		"无法冻结到编组中的字段，请取消编组后再冻结。": "无法冻结到编组中的字段，请取消编组后再冻结。",
		无法撤销此操作,
		无法重做此操作,
		日: "日",
		"时间异常，开始时间晚于结束时间": "时间异常，开始时间晚于结束时间",
		"时间范围（日）": "时间范围（日）",
		"时间范围（月）": "时间范围（月）",
		显示表格,
		暂停原因,
		暂无事项,
		更新人,
		更新时间,
		最大值,
		最小值,
		最早,
		最早时间,
		最晚,
		最晚时间,
		月: "月",
		未勾选,
		未勾选占比,
		未命名记录,
		未填写,
		未填写占比,
		未设置,
		来源,
		标签,
		标题,
		"正在总结…": "正在总结…",
		"正在生成…": "正在生成…",
		"正在输入…": "正在输入…",
		"此列为右侧“时间”的{{point}}": "此列为右侧“时间”的{{point}}",
		"此列为右侧“时间”的{{point}}，可点击修改": "此列为右侧“时间”的{{point}}，可点击修改",
		此列类型不支持编辑分组,
		"此记录不符合筛选条件，将被隐藏": "此记录不符合筛选条件，将被隐藏",
		此记录将按照分组规则调整至其他分组,
		此记录将按照排序规则调整至其他位置,
		求和,
		"没有分组字段的权限，不支持添加记录到此分组。": "没有分组字段的权限，不支持添加记录到此分组。",
		"没有分组字段的权限，不支持编辑分组。": "没有分组字段的权限，不支持编辑分组。",
		没有文档查看权限,
		添加一列,
		添加一行,
		添加列,
		添加记录,
		"点赞失败，请再试一下": "点赞失败，请再试一下",
		父任务,
		状态,
		由于权限设置无法查看该题目,
		空: "空",
		"管理员已设置内容权限， 需全部权限才能添加分组。": "管理员已设置内容权限， 需全部权限才能添加分组。",
		"管理员已设置内容权限，你无法添加记录。": "管理员已设置内容权限，你无法添加记录。",
		"管理员已设置内容权限，需全部权限才能编辑字段。": "管理员已设置内容权限，需全部权限才能编辑字段。",
		紧急,
		终点,
		结束,
		统计,
		自动计算,
		范围,
		行数,
		"表格宽度：{{newWidth}} 像素": "表格宽度：{{newWidth}} 像素",
		计数,
		"计算中...": "计算中...",
		记录行数,
		设置时间,
		请升级企业微信版本后打开,
		请在企业微信内打开,
		请选择,
		调整中,
		起点,
		"超过1万行上限，可拖动列宽调整": "超过1万行上限，可拖动列宽调整",
		跟进总结,
		输入待办标题,
		输入电话号,
		输入邮箱,
		"还有{{count}}项": "还有{{count}}项",
		进行中,
		迭代,
		选项,
		"重新计算中...": "重新计算中...",
		重新配置,
		阻塞原因,
		附件,
		隐藏表格,
		高: "高",
		"（未设置时间）": "（未设置时间）",
		"，": "，",
		"：": "："
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/i18n/xtable-i18n-shim.ts
/**
* 把 genie 自研 i18n 的内部 locale（`en` / `zh-cn`）归一化为 xtable 侧 locale。
* 归一化正确尤为关键：xtable-common 日期本地兜底（`getI18nLanguage`）仅读
* `window.i18n.language` 判语言，错了英文下会拼出中文日期。
*/
function normalizeXtableLanguage(internalLocale) {
	const lower = internalLocale.toLowerCase();
	if (lower === "en" || lower.startsWith("en")) return "en-US";
	return "zh-CN";
}
/**
* 创建 shim 实例。资源与当前语言由内部状态持有，`getFixedT` 返回的闭包每次调用
* 时读实时 `language`，因此语言切换后无需重建 t 函数。
*/
function createXtableI18nShim(initialLanguage = "zh-CN") {
	const resources = {};
	const shim = {
		language: initialLanguage,
		getFixedT(_lng, ns) {
			if (ns !== "smartsheet") return () => void 0;
			return (key) => resources[shim.language]?.[key];
		},
		hasResourceBundle(lng, ns) {
			return ns === "smartsheet" && Boolean(resources[lng]);
		},
		loadResource(locale, dict) {
			resources[locale] = dict;
		},
		setLanguage(locale) {
			shim.language = locale;
		}
	};
	return shim;
}
var init_xtable_i18n_shim = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/i18n/xtable-i18n-bootstrap.ts
/**
* 取得（或安装）window.i18n 上的 shim 实例。若已存在本模块安装的 shim 则复用。
*/
function getOrInstallShim() {
	if (typeof window === "undefined") return null;
	const win = window;
	const existing = win.i18n;
	if (existing && existing[SHIM_MARKER]) return existing;
	if (existing && !existing[SHIM_MARKER]) return existing;
	const shim = createXtableI18nShim(normalizeXtableLanguage(getLocale()));
	shim[SHIM_MARKER] = true;
	win.i18n = shim;
	return shim;
}
/**
* 安装 shim + 载入双语子集 + 订阅 locale 变化。幂等、同步。
*
* 由 `ensureXtableI18nReady()` 在渲染器 init 时调用；词条为静态 import，
* 整个过程无 await，可同步完成。
*/
function installXtableI18nSync() {
	const shim = getOrInstallShim();
	if (!shim) return;
	if (!installed) {
		installed = true;
		shim.loadResource("en-US", RESOURCES["en-US"]);
		shim.loadResource("zh-CN", RESOURCES["zh-CN"]);
		onLocaleChange((internalLocale) => {
			shim.setLanguage(normalizeXtableLanguage(internalLocale));
		});
	}
	shim.setLanguage(normalizeXtableLanguage(getLocale()));
}
/**
* 幂等地准备好 xtable i18n。保留异步签名兼容旧调用点；内部走同步安装，立即 resolve。
*/
function ensureXtableI18nReady() {
	installXtableI18nSync();
	return Promise.resolve();
}
var SHIM_MARKER, RESOURCES, installed;
var init_xtable_i18n_bootstrap = __esmMin((() => {
	init_i18n$1();
	init_smartsheet_en_US();
	init_smartsheet_zh_CN();
	init_xtable_i18n_shim();
	SHIM_MARKER = "__genieXtableI18nShim__";
	RESOURCES = {
		"en-US": smartsheet_en_US_default,
		"zh-CN": smartsheet_zh_CN_default
	};
	installed = false;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/i18n/index.ts
var init_i18n = __esmMin((() => {
	init_xtable_i18n_bootstrap();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/canvas-context-menu-guard/canvas-context-menu-guard-controller.ts
/**
* 创建 canvas 原生右键菜单拦截守卫。
* 由所有 canvas 型视图（GRID/LIST/KANBAN/GANTT/CALENDAR）挂载。
*/
function createCanvasContextMenuGuardController(options) {
	const onContextMenu = (event) => {
		if (isEditableTarget$1(document.activeElement)) return;
		event.preventDefault();
	};
	options.container.addEventListener("contextmenu", onContextMenu, true);
	return { dispose() {
		options.container.removeEventListener("contextmenu", onContextMenu, true);
	} };
}
var init_canvas_context_menu_guard_controller = __esmMin((() => {
	init_common();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/canvas-context-menu-guard/index.ts
var init_canvas_context_menu_guard = __esmMin((() => {
	init_canvas_context_menu_guard_controller();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-context-menu/grid-context-menu-controller.ts
/**
* 尝试把 `viewEntry.getView()` 转成 `GridViewLike`，非 GRID / 尚未渲染 / 缺关键方法
* 时返回 undefined。这样上层能用 optional chaining 一路降级。
*/
function getGridView(viewEntry) {
	const view = viewEntry.getView();
	if (!view || typeof view.getTarget !== "function" || typeof view.getType !== "function") return;
	if (view.getType() !== ViewType.GRID) return;
	return view;
}
/**
* `GridTarget.rowInfo` 是运行时按 `type` 字段辨识的 discriminated union；下方两个
* extractor 分别负责 Record / GroupHead 两种命中形态的字段收敛，其它类型（RecordRange /
* RecordAdd / Spacing / Stat / GroupAdd / GroupFoot / GroupStat）返回 undefined，
* controller 顶层 if 分支据此决定是否 preventDefault + fire onOpen。
*/
/** Record 命中 → 取 recordId（无则视为未命中）。 */
function extractRecordId(target) {
	const rowInfo = target.rowInfo;
	if (!rowInfo || rowInfo.type !== "Record" || !rowInfo.recordId) return;
	return rowInfo.recordId;
}
function extractGroupHead(target) {
	const rowInfo = target.rowInfo;
	if (!rowInfo || rowInfo.type !== "GroupHead") return;
	if (!Array.isArray(rowInfo.path)) return;
	return {
		path: rowInfo.path,
		count: rowInfo.count ?? 0,
		fold: rowInfo.fold ?? false
	};
}
/**
* 列头命中提取器：只在 `target.isColumnHeader=true` 且 `columnInfo.isField=true`
* 时返回真实字段列的 id。占位符列（`isField=false`，如末尾"新增字段"占位）不参与
* 业务菜单——这类列没有对应 field，业务动作全都无意义，回退到不拦截浏览器默认。
*/
function extractColumnId(target) {
	if (!target.isColumnHeader) return;
	const columnInfo = target.columnInfo;
	if (!columnInfo || columnInfo.isField !== true || typeof columnInfo.id !== "string") return;
	return columnInfo.id;
}
/**
* 取当前选区中的"字段列"多选集合。仅在框选**整列**（`selectFieldIds` 非空）时返回；
* 单元格框选 / 无选区一律返回空数组——UI 层据此区分"多选列批量隐藏"与"仅当前列"。
*
* 归一化：过滤掉 null/undefined/非 string 项，兼容运行时数据。
*/
function getSelectedFieldIds(viewEntry) {
	const raw = (getGridView$1(viewEntry)?.getSelectionData?.())?.selectFieldIds;
	if (!Array.isArray(raw)) return [];
	return raw.filter((id) => typeof id === "string" && id.length > 0);
}
/**
* 创建 GRID 右键菜单 controller。仅在 ViewType=GRID 时由 view-services orchestrator 挂载。
*/
function createGridContextMenuController(options) {
	const onContextMenu = (event) => {
		if (isEditableTarget$1(document.activeElement)) return;
		const viewEntry = options.getViewEntry();
		if (!viewEntry) return;
		const view = getGridView(viewEntry);
		if (!view) return;
		const rect = options.container.getBoundingClientRect();
		const hitX = event.clientX - rect.left;
		const hitY = event.clientY - rect.top;
		let target;
		try {
			target = view.getTarget(hitX, hitY);
		} catch (err) {
			console.warn(`${LOG_TAG$5} getTarget failed:`, err);
			return;
		}
		const recordId = extractRecordId(target);
		if (recordId) {
			event.preventDefault();
			const selectedRecordIds = getSelectedRecordIds(viewEntry);
			const anchor = getSelectionAnchor(viewEntry);
			options.onOpen?.({
				hit: "record",
				source: "grid",
				recordId,
				clientX: event.clientX,
				clientY: event.clientY,
				selectedRecordIds,
				isSingleCell: anchor?.isSingle ?? false
			});
			return;
		}
		const groupHead = extractGroupHead(target);
		if (groupHead) {
			event.preventDefault();
			options.onOpen?.({
				hit: "group-head",
				source: "grid",
				clientX: event.clientX,
				clientY: event.clientY,
				groupPath: groupHead.path,
				groupCount: groupHead.count,
				groupFold: groupHead.fold
			});
			return;
		}
		const columnId = extractColumnId(target);
		if (columnId) {
			event.preventDefault();
			const selectedFieldIds = getSelectedFieldIds(viewEntry);
			const selectedColumnIds = selectedFieldIds.includes(columnId) ? selectedFieldIds : [columnId];
			options.onOpen?.({
				hit: "column-header",
				source: "grid",
				clientX: event.clientX,
				clientY: event.clientY,
				columnId,
				selectedColumnIds
			});
			return;
		}
	};
	options.container.addEventListener("contextmenu", onContextMenu, true);
	return { dispose() {
		options.container.removeEventListener("contextmenu", onContextMenu, true);
	} };
}
var LOG_TAG$5;
var init_grid_context_menu_controller = __esmMin((() => {
	init_es$2();
	init_common();
	LOG_TAG$5 = "[SmartsheetGridContextMenu]";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-context-menu/index.ts
var init_grid_context_menu = __esmMin((() => {
	init_grid_context_menu_controller();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/clipboard-format.ts
var PAYLOAD_ATTR;
var init_clipboard_format = __esmMin((() => {
	PAYLOAD_ATTR = "data-wb-smartsheet-payload";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/clipboard-parser.ts
/** 从 HTML 字符串中尝试提取自身结构化 payload；非自身格式返回 null */
function tryParseSmartsheetPayload(html) {
	if (!html || !html.includes("data-wb-smartsheet-payload")) return null;
	try {
		const encoded = new DOMParser().parseFromString(html, "text/html").querySelector(`table[${PAYLOAD_ATTR}]`)?.getAttribute(PAYLOAD_ATTR);
		if (!encoded) return null;
		const parsed = JSON.parse(decodeURIComponent(encoded));
		if (!isSmartsheetPayload(parsed)) return null;
		return parsed;
	} catch {
		return null;
	}
}
/** 运行时校验剪贴板 payload 结构（不信任外部输入） */
function isSmartsheetPayload(value) {
	if (typeof value !== "object" || value === null) return false;
	const v = value;
	if (v.source !== "smartsheet" || v.version !== 1 || !Array.isArray(v.cells)) return false;
	return v.cells.every((row) => Array.isArray(row) && row.every((cell) => typeof cell === "object" && cell !== null && typeof cell.text === "string"));
}
/** 把自身 payload 转为填充源矩阵（每格带 payload） */
function payloadToSourceMatrix(payload) {
	return payload.cells.map((row) => row.map((cell) => ({
		text: cell.text,
		payload: cell
	})));
}
/** 把纯文本 TSV 转为填充源矩阵（每格仅 text） */
function plainTextToSourceMatrix(text) {
	const normalized = text.replace(/\r\n/g, "\n").replace(/\n+$/, "");
	if (normalized.length === 0) return [];
	return normalized.split("\n").map((line) => line.split("	").map((cellText) => ({ text: cellText })));
}
/**
* 解析剪贴板为填充源矩阵。
*
* @param html 剪贴板 text/html（可能为空）
* @param text 剪贴板 text/plain（可能为空）
* @returns 二维填充源；无可用内容返回 null。
*/
function parseClipboard(html, text) {
	const payload = tryParseSmartsheetPayload(html);
	if (payload) {
		const matrix = payloadToSourceMatrix(payload);
		return matrix.length > 0 && matrix[0].length > 0 ? matrix : null;
	}
	const matrix = plainTextToSourceMatrix(text);
	return matrix.length > 0 && matrix[0].length > 0 ? matrix : null;
}
var init_clipboard_parser = __esmMin((() => {
	init_clipboard_format();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/enum-label-map.ts
/**
* 由 xtable 选项 raw text → 展示文案。
*
* @param columnKey ResolvedColumn.key（`status` / `source` / `priority` 才走翻译；
*                  其它列 / 空 columnKey 均返回 null，调用方自行退回 raw）
* @param raw       xtable 选项 text（未经翻译的英文原值；空串直接返回 null）
* @returns 翻译后的展示文案；无法映射时返回 null（调用方保持 raw 输出）
*/
function rawToLabel(columnKey, raw) {
	if (!raw) return null;
	switch (columnKey) {
		case COLUMN_STATUS: {
			const dto = STATUS_OPTION_TO_DTO[raw];
			if (!dto) return null;
			return t(`collab.plan.status.label.${dto}`);
		}
		case COLUMN_SOURCE:
			if (!KNOWN_SOURCES.has(raw)) return null;
			return t(`collab.plan.source.label.${raw}`);
		case COLUMN_PRIORITY:
			if (!KNOWN_PRIORITIES.has(raw)) return null;
			return t(`collab.plan.detail.priority.${raw}`);
		default: return null;
	}
}
/**
* 由展示文案 → xtable 选项 raw text（反查，供粘贴时把外部"紧急"落到 `urgent` 用）。
*
* 实现策略：直接枚举列的已知 raw 集合，逐个用 `rawToLabel` 反算 label，命中即返回。
* 集合最多 7 条，O(n) 完全够用；不缓存以简化实现（每次粘贴调用几次而已）。
*
* @returns 匹配到的 raw；未命中返回 null
*/
function labelToRaw(columnKey, label) {
	if (!label) return null;
	switch (columnKey) {
		case COLUMN_STATUS:
			for (const [rawOption, dto] of Object.entries(STATUS_OPTION_TO_DTO)) if (t(`collab.plan.status.label.${dto}`) === label) return rawOption;
			return STATUS_DTO_TO_OPTION[label] || null;
		case COLUMN_SOURCE:
			for (const raw of KNOWN_SOURCES) if (t(`collab.plan.source.label.${raw}`) === label) return raw;
			return null;
		case COLUMN_PRIORITY:
			for (const raw of KNOWN_PRIORITIES) if (t(`collab.plan.detail.priority.${raw}`) === label) return raw;
			return null;
		default: return null;
	}
}
var COLUMN_STATUS, COLUMN_SOURCE, COLUMN_PRIORITY, KNOWN_SOURCES, KNOWN_PRIORITIES;
var init_enum_label_map = __esmMin((() => {
	init_i18n$1();
	init_table_constants();
	COLUMN_STATUS = "status";
	COLUMN_SOURCE = "source";
	COLUMN_PRIORITY = "priority";
	KNOWN_SOURCES = new Set([
		"manual",
		"handoff",
		"cnb",
		"tapd",
		"jira",
		"linear",
		"github"
	]);
	KNOWN_PRIORITIES = new Set(PRIORITY_TEXTS);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/clipboard-serializer.ts
/** HTML 文本转义（td 内容 / 属性值通用） */
function escapeHtml(raw) {
	return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/** TSV 单元格：把内部的 \t / \n / \r 折成空格，避免破坏行列结构 */
function sanitizeTsv(raw) {
	return raw.replace(/[\t\r\n]+/g, " ");
}
/** 读取单格用于复制的结构化数据（文本 + 类型化还原信息） */
function readCopyCell(table, fieldId, recordId, columnKey) {
	const field = table.getFieldByFieldId(fieldId);
	const base = {
		fieldId,
		columnKey,
		fieldType: field?.type ?? FieldType.TEXT,
		text: ""
	};
	if (!field) return base;
	switch (field.type) {
		case FieldType.TEXT:
		case FieldType.TITLE: return {
			...base,
			text: readText(table, fieldId, recordId)
		};
		case FieldType.SINGLE_SELECT: {
			const opt = readSelectOption(table, fieldId, recordId);
			const raw = opt?.text ?? "";
			const label = rawToLabel(columnKey, raw) ?? raw;
			return {
				...base,
				text: label,
				optionId: opt?.id,
				optionRawText: raw && raw !== label ? raw : void 0
			};
		}
		case FieldType.MULTIPLE_SELECT: {
			const optionIds = (field.getStandardCell(recordId)?.data ?? []).map((d) => d?.id != null ? String(d.id) : "").filter((id) => id.length > 0);
			return {
				...base,
				text: readMultiSelectTexts(table, fieldId, recordId).join(", "),
				optionIds: optionIds.length > 0 ? optionIds : void 0
			};
		}
		case FieldType.DATE_TIME:
		case FieldType.CREATED_TIME:
		case FieldType.MODIFIED_TIME: return {
			...base,
			text: readIsoTime(table, fieldId, recordId) ?? ""
		};
		case FieldType.USER_C: {
			const users = readUsers(table, fieldId, recordId);
			return {
				...base,
				text: users.map((u) => u.name ?? u.id).join(", "),
				users: users.length > 0 ? users : void 0
			};
		}
		default: {
			const data = field.getStandardCell(recordId)?.data;
			if (Array.isArray(data)) {
				const text = data.map((seg) => {
					const s = seg;
					return s.text ?? s.name ?? "";
				}).filter(Boolean).join(", ");
				return {
					...base,
					text
				};
			}
			return base;
		}
	}
}
/**
* 序列化选区为剪贴板内容；空矩阵返回 null。
*
* @param table  当前 todos ITable
* @param matrix 选区行优先矩阵（getSelectionMatrix 产出）
*/
function serializeSelection(table, matrix) {
	if (matrix.length === 0 || matrix[0].length === 0) return null;
	const columnKeyMap = buildFieldIdToColumnIndex(table);
	const payloadCells = [];
	const htmlRows = [];
	const tsvRows = [];
	for (const row of matrix) {
		const payloadRow = [];
		const htmlCells = [];
		const tsvCells = [];
		for (const { recordId, fieldId } of row) {
			const cell = readCopyCell(table, fieldId, recordId, columnKeyMap.get(fieldId)?.key ?? "");
			payloadRow.push(cell);
			htmlCells.push(`<td>${escapeHtml(cell.text)}</td>`);
			tsvCells.push(sanitizeTsv(cell.text));
		}
		payloadCells.push(payloadRow);
		htmlRows.push(`<tr>${htmlCells.join("")}</tr>`);
		tsvRows.push(tsvCells.join("	"));
	}
	return {
		html: `<table ${PAYLOAD_ATTR}="${encodeURIComponent(JSON.stringify({
			source: "smartsheet",
			version: 1,
			cells: payloadCells
		}))}"><tbody>${htmlRows.join("")}</tbody></table>`,
		text: tsvRows.join("\n")
	};
}
var init_clipboard_serializer = __esmMin((() => {
	init_es$2();
	init_view_column_config();
	init_table_cell_readers();
	init_clipboard_format();
	init_enum_label_map();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/paste-writer.ts
/** 非 manual/handoff/空 的来源均视为外部同步来源（与 update-todo 同源判断一致） */
function isExternalSource(source) {
	if (!source) return false;
	return source !== "manual" && source !== "handoff";
}
/**
* SINGLE_SELECT 字段是否存在指定 optionId。
*
* 用在自身粘贴的第一优先级：payload.optionId 直接可用时省一次 text→id 反查。
* 跨表复制粘贴时源表 optionId 可能在目标表不存在，必须先校验。
*/
function hasOptionId(field, optionId) {
	return (field?.getProperty?.()?.options ?? []).some((o) => o.id === optionId);
}
/**
* 依填充语义取目标格 (r,c) 对应的源格。
* - 单格源：恒取 source[0][0]（铺满）
* - 多格源：取 source[r]?.[c]，越界返回 undefined（跳过）
*/
function pickSourceCell(source, r, c) {
	if (source.length === 1 && source[0].length === 1) return source[0][0];
	return source[r]?.[c];
}
/**
* 按目标字段类型构造写入值（RecordCellValue，形如 `{ [fieldId]: value }`）。
* 返回 undefined 表示该格不可表达 / 不支持 → 跳过。
*
* @param columnKey 目标列的业务 key（`status` / `priority` / `source` / ...）；
*                  SINGLE_SELECT 分支用它决定是否走 i18n 反查（枚举列）。
*/
function buildCellValue(table, fieldId, columnKey, source) {
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return;
	const text = source.text ?? "";
	switch (field.type) {
		case FieldType.TEXT:
		case FieldType.TITLE: return buildTextDelta(fieldId, text);
		case FieldType.SINGLE_SELECT: {
			if (text.length === 0) return buildSingleSelectDelta(fieldId, null);
			const payloadOptionId = source.payload?.optionId;
			if (payloadOptionId && hasOptionId(field, payloadOptionId)) return buildSingleSelectDelta(fieldId, payloadOptionId);
			const payloadRaw = source.payload?.optionRawText;
			if (payloadRaw) {
				const idByRaw = findOptionIdByText(table, fieldId, payloadRaw);
				if (idByRaw) return buildSingleSelectDelta(fieldId, idByRaw);
			}
			let optionId = findOptionIdByText(table, fieldId, text);
			if (!optionId && columnKey) {
				const rawFromLabel = labelToRaw(columnKey, text);
				if (rawFromLabel) optionId = findOptionIdByText(table, fieldId, rawFromLabel);
			}
			if (!optionId) return;
			return buildSingleSelectDelta(fieldId, optionId);
		}
		case FieldType.MULTIPLE_SELECT: {
			if (text.length === 0) return buildMultiSelectDelta(fieldId, null);
			const optionIds = [];
			for (const seg of text.split(",").map((s) => s.trim()).filter(Boolean)) {
				const id = findOptionIdByText(table, fieldId, seg);
				if (id) optionIds.push(id);
			}
			if (optionIds.length === 0) return;
			return buildMultiSelectDelta(fieldId, optionIds);
		}
		case FieldType.DATE_TIME:
			if (text.length === 0) return buildDateTimeDelta(fieldId, null);
			try {
				return buildDateTimeDelta(fieldId, text);
			} catch {
				return;
			}
		case FieldType.USER_C: {
			if (text.length === 0) return buildUserCDelta(fieldId, null);
			const users = source.payload?.users;
			if (!users || users.length === 0) return;
			return buildUserCDelta(fieldId, users.map((u) => ({
				id: u.id,
				name: u.name ?? "",
				avatarUrl: u.avatarUrl ?? ""
			})));
		}
		default: return;
	}
}
/**
* 执行粘贴写入。
*
* @param core   SmartsheetCore
* @param table  当前 todos ITable
* @param target 目标选区矩阵（getSelectionMatrix 产出）
* @param source 填充源矩阵（parseClipboard 产出）
*/
function writePaste(core, table, target, source) {
	if (target.length === 0 || target[0].length === 0) return {
		applied: false,
		writtenCells: 0,
		skippedCells: 0,
		reason: "empty target"
	};
	if (source.length === 0 || source[0].length === 0) return {
		applied: false,
		writtenCells: 0,
		skippedCells: 0,
		reason: "empty source"
	};
	const columnMap = buildFieldIdToColumnIndex(table);
	const sourceFieldId = findFieldIdByTitle(table, F_TODO.source);
	const records = {};
	let writtenCells = 0;
	let skippedCells = 0;
	for (let r = 0; r < target.length; r++) {
		const row = target[r];
		for (let c = 0; c < row.length; c++) {
			const { recordId, fieldId } = row[c];
			const src = pickSourceCell(source, r, c);
			if (!src) {
				skippedCells++;
				continue;
			}
			const column = columnMap.get(fieldId);
			if (!column || !column.editable) {
				skippedCells++;
				continue;
			}
			if (getFieldDef(column.key)?.writable === false) {
				skippedCells++;
				continue;
			}
			if ((column.key === "title" || column.key === "description") && sourceFieldId && isExternalSource(readSelectText(table, sourceFieldId, recordId))) {
				skippedCells++;
				continue;
			}
			const cellValue = buildCellValue(table, fieldId, column.key, src);
			if (!cellValue) {
				skippedCells++;
				continue;
			}
			const recordDelta = records[recordId] ??= {};
			for (const [fid, value] of Object.entries(cellValue)) {
				if (value === void 0) continue;
				recordDelta[fid] = { value };
				writtenCells++;
			}
		}
	}
	if (writtenCells === 0) return {
		applied: false,
		writtenCells: 0,
		skippedCells,
		reason: "no writable cells"
	};
	const viewId = getDefaultViewId(table);
	const result = core.behaviorApi.recordApi.setRangeRecord({
		tableId: table.id,
		viewId,
		records
	});
	if (!result.isSuccess) {
		const message = result.error instanceof Error ? result.error.message : String(result.error);
		return {
			applied: false,
			writtenCells: 0,
			skippedCells,
			reason: `setRangeRecord rejected: ${message}`
		};
	}
	return {
		applied: true,
		writtenCells,
		skippedCells
	};
}
var init_paste_writer = __esmMin((() => {
	init_es$2();
	init_todo_field_schema();
	init_view_column_config();
	init_cell_builders();
	init_table_cell_readers();
	init_table_constants();
	init_enum_label_map();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/selection-resolver.ts
var init_selection_resolver = __esmMin((() => {
	init_grid_selection();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/grid-copy-paste-controller.ts
/** 焦点是否落在可编辑元素上（此时应放行浏览器默认复制/粘贴） */
function isEditableTarget(el) {
	if (!el) return false;
	const tag = el.tagName;
	if (tag === "INPUT" || tag === "TEXTAREA") return true;
	return el.isContentEditable === true;
}
/**
* 把 writePaste 返回的 reason 映射成用户 tips i18n key。
* 未知 reason 返回 null，controller 只记日志、不打扰用户。
*/
function resolvePasteTipsKey(reason) {
	if (reason === "no writable cells") return "collab.plan.paste.tips.noWritableCells";
	if (reason.startsWith("setRangeRecord rejected")) return "collab.plan.paste.tips.rejected";
	return null;
}
/**
* 创建 GRID 复制粘贴 controller。应在 GRID 视图渲染完成、RangeModel 就绪后调用。
*/
function createGridCopyPasteController(options) {
	let bound = false;
	const onCopy = (event) => {
		if (isEditableTarget(document.activeElement)) return;
		const viewEntry = options.getViewEntry();
		const table = options.getTable();
		if (!viewEntry || !table || !event.clipboardData) return;
		const matrix = getSelectionMatrix(viewEntry);
		if (!matrix) return;
		const serialized = serializeSelection(table, matrix);
		if (!serialized) return;
		event.clipboardData.setData("text/html", serialized.html);
		event.clipboardData.setData("text/plain", serialized.text);
		event.preventDefault();
		const cellCount = matrix.length * (matrix[0]?.length ?? 0);
		if (cellCount > 0) message.success({
			content: t("collab.plan.copy.tips.success", { count: cellCount }),
			duration: COPY_TIPS_DURATION_MS,
			key: COPY_TIPS_KEY
		});
	};
	const onPaste = (event) => {
		if (isEditableTarget(document.activeElement)) return;
		const viewEntry = options.getViewEntry();
		const table = options.getTable();
		if (!viewEntry || !table || !event.clipboardData) return;
		const target = getSelectionMatrix(viewEntry);
		if (!target) return;
		const source = parseClipboard(event.clipboardData.getData("text/html"), event.clipboardData.getData("text/plain"));
		if (!source) return;
		event.preventDefault();
		try {
			const result = writePaste(options.core, table, target, source);
			if (!result.applied && result.reason) {
				console.warn(`${LOG_TAG$4} paste not applied: ${result.reason}`);
				const tipsKey = resolvePasteTipsKey(result.reason);
				if (tipsKey) message.warning({
					content: t(tipsKey),
					duration: PASTE_TIPS_DURATION_MS,
					key: PASTE_TIPS_KEY
				});
			}
		} catch (error) {
			console.error(`${LOG_TAG$4} paste failed:`, String(error));
		}
	};
	const bind = () => {
		if (bound) return;
		document.addEventListener("copy", onCopy, true);
		document.addEventListener("cut", onCopy, true);
		document.addEventListener("paste", onPaste, true);
		bound = true;
	};
	const unbind = () => {
		if (!bound) return;
		document.removeEventListener("copy", onCopy, true);
		document.removeEventListener("cut", onCopy, true);
		document.removeEventListener("paste", onPaste, true);
		bound = false;
	};
	const syncBinding = () => {
		const viewEntry = options.getViewEntry();
		if (viewEntry && hasSelection(viewEntry)) bind();
		else unbind();
	};
	let selectionDisposable;
	const viewEntry = options.getViewEntry();
	if (viewEntry) selectionDisposable = subscribeSelectionChange(viewEntry, syncBinding);
	syncBinding();
	return { dispose() {
		selectionDisposable?.dispose();
		selectionDisposable = void 0;
		unbind();
	} };
}
var LOG_TAG$4, PASTE_TIPS_KEY, PASTE_TIPS_DURATION_MS, COPY_TIPS_KEY, COPY_TIPS_DURATION_MS;
var init_grid_copy_paste_controller = __esmMin((() => {
	init_foundation();
	init_i18n$1();
	init_common();
	init_clipboard_parser();
	init_clipboard_serializer();
	init_paste_writer();
	init_selection_resolver();
	LOG_TAG$4 = "[SmartsheetGridPaste]";
	PASTE_TIPS_KEY = "smartsheet-grid-paste-warning";
	PASTE_TIPS_DURATION_MS = 2500;
	COPY_TIPS_KEY = "smartsheet-grid-copy-success";
	COPY_TIPS_DURATION_MS = 1500;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-copy-paste/index.ts
var init_grid_copy_paste = __esmMin((() => {
	init_grid_copy_paste_controller();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-keyboard-delete/deletable-column-config.ts
/**
* 判断某列是否禁止被 Delete 键清空。
*
* @param columnKey `ResolvedColumn.key`
*/
function isNonDeletableColumn(columnKey) {
	return NON_DELETABLE_COLUMNS.has(columnKey);
}
/**
* 判断某列 Delete 后是否需要设为默认值（而非清空）。
*/
function hasDeleteDefault(columnKey) {
	return COLUMNS_WITH_DELETE_DEFAULT.has(columnKey);
}
var NON_DELETABLE_COLUMNS, COLUMNS_WITH_DELETE_DEFAULT;
var init_deletable_column_config = __esmMin((() => {
	NON_DELETABLE_COLUMNS = new Set([
		"title",
		"createdAt",
		"updatedAt",
		"source",
		"summary"
	]);
	COLUMNS_WITH_DELETE_DEFAULT = new Set(["status"]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-keyboard-delete/delete-writer.ts
/**
* 依目标字段类型构造"清空 / 默认值"delta。
*
* @param defaultStatusOptionId status 列的默认 optionId（"待开始"）；未取到时该列跳过。
* @returns 未定义表示该单元格类型不支持删除（跳过）。
*/
function buildDeleteCellValue(table, fieldId, columnKey, defaultStatusOptionId) {
	if (hasDeleteDefault(columnKey) && columnKey === "status") {
		if (!defaultStatusOptionId) return;
		return buildSingleSelectDelta(fieldId, defaultStatusOptionId);
	}
	const field = table.getFieldByFieldId(fieldId);
	if (!field) return;
	switch (field.type) {
		case FieldType.TEXT:
		case FieldType.TITLE: return buildTextDelta(fieldId, null);
		case FieldType.SINGLE_SELECT: return buildSingleSelectDelta(fieldId, null);
		case FieldType.MULTIPLE_SELECT: return buildMultiSelectDelta(fieldId, null);
		case FieldType.DATE_TIME: return buildDateTimeDelta(fieldId, null);
		case FieldType.USER_C: return buildUserCDelta(fieldId, null);
		case FieldType.LINK_RECORDS: return buildLinkRecordsDelta(fieldId, null);
		case FieldType.ATTACHMENT: return buildAttachmentClearDelta(fieldId);
		default: return;
	}
}
/**
* 执行 Delete 键写入。
*
* @param core   SmartsheetCore
* @param table  当前 todos ITable
* @param target 目标选区矩阵（`getSelectionMatrix` 产出，行优先）
*/
function writeDelete(core, table, target) {
	if (target.length === 0 || target[0].length === 0) return {
		applied: false,
		writtenCells: 0,
		skippedCells: 0,
		skippedByNonDeletable: 0,
		reason: "empty selection"
	};
	const columnMap = buildFieldIdToColumnIndex(table);
	const { list: statusList } = readAllStates(table);
	const defaultStatusOptionId = pickDefaultState(statusList)?.optionId;
	const records = {};
	let writtenCells = 0;
	let skippedCells = 0;
	let skippedByNonDeletable = 0;
	for (const row of target) for (const { recordId, fieldId } of row) {
		const column = columnMap.get(fieldId);
		if (!column) {
			skippedByNonDeletable++;
			continue;
		}
		if (isNonDeletableColumn(column.key)) {
			skippedByNonDeletable++;
			continue;
		}
		if (!column.editable) {
			skippedCells++;
			continue;
		}
		const cellValue = buildDeleteCellValue(table, fieldId, column.key, defaultStatusOptionId);
		if (!cellValue) {
			skippedCells++;
			continue;
		}
		const recordDelta = records[recordId] ??= {};
		for (const [fid, value] of Object.entries(cellValue)) {
			recordDelta[fid] = { value };
			writtenCells++;
		}
	}
	if (writtenCells === 0) return {
		applied: false,
		writtenCells: 0,
		skippedCells,
		skippedByNonDeletable,
		reason: "no writable cells"
	};
	const viewId = getDefaultViewId(table);
	const result = core.behaviorApi.recordApi.setRangeRecord({
		tableId: table.id,
		viewId,
		records
	});
	if (!result.isSuccess) {
		const message = result.error instanceof Error ? result.error.message : String(result.error);
		return {
			applied: false,
			writtenCells: 0,
			skippedCells,
			skippedByNonDeletable,
			reason: `setRangeRecord rejected: ${message}`
		};
	}
	return {
		applied: true,
		writtenCells,
		skippedCells,
		skippedByNonDeletable
	};
}
var init_delete_writer = __esmMin((() => {
	init_es$2();
	init_view_column_config();
	init_cell_builders();
	init_table_state_readers();
	init_deletable_column_config();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-keyboard-delete/grid-keyboard-delete-controller.ts
/** 是否是本 controller 关心的删除键 */
function isDeleteKey(event) {
	return event.key === "Delete" || event.key === "Backspace";
}
/**
* 创建 GRID 键盘删除 controller。应在 GRID 视图渲染完成、RangeModel 就绪后调用。
*/
function createGridKeyboardDeleteController(options) {
	let bound = false;
	const onKeyDown = (event) => {
		if (!isDeleteKey(event)) return;
		if (isEditableTarget$1(document.activeElement)) return;
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		const viewEntry = options.getViewEntry();
		const table = options.getTable();
		if (!viewEntry || !table) return;
		const target = getSelectionMatrix(viewEntry);
		if (!target) return;
		event.preventDefault();
		try {
			const result = writeDelete(options.core, table, target);
			if (result.skippedByNonDeletable > 0) message.info({
				content: t("collab.plan.delete.tips.containsNonDeletable"),
				duration: DELETE_TIPS_DURATION_MS,
				key: DELETE_TIPS_KEY
			});
			if (result.applied) return;
			if (!result.reason) return;
			console.warn(`${LOG_TAG$3} delete not applied: ${result.reason}`);
			if (result.reason.startsWith("setRangeRecord rejected")) {
				message.warning({
					content: t("collab.plan.paste.tips.rejected"),
					duration: DELETE_TIPS_DURATION_MS,
					key: DELETE_TIPS_KEY
				});
				return;
			}
		} catch (error) {
			console.error(`${LOG_TAG$3} delete failed:`, String(error));
		}
	};
	const bind = () => {
		if (bound) return;
		document.addEventListener("keydown", onKeyDown, true);
		bound = true;
	};
	const unbind = () => {
		if (!bound) return;
		document.removeEventListener("keydown", onKeyDown, true);
		bound = false;
	};
	const syncBinding = () => {
		const viewEntry = options.getViewEntry();
		if (viewEntry && hasSelection(viewEntry)) bind();
		else unbind();
	};
	let selectionDisposable;
	const viewEntry = options.getViewEntry();
	if (viewEntry) selectionDisposable = subscribeSelectionChange(viewEntry, syncBinding);
	syncBinding();
	return { dispose() {
		selectionDisposable?.dispose();
		selectionDisposable = void 0;
		unbind();
	} };
}
var LOG_TAG$3, DELETE_TIPS_KEY, DELETE_TIPS_DURATION_MS;
var init_grid_keyboard_delete_controller = __esmMin((() => {
	init_foundation();
	init_i18n$1();
	init_common();
	init_delete_writer();
	LOG_TAG$3 = "[SmartsheetGridKeyboardDelete]";
	DELETE_TIPS_KEY = "smartsheet-grid-delete-warning";
	DELETE_TIPS_DURATION_MS = 2500;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/grid-keyboard-delete/index.ts
var init_grid_keyboard_delete = __esmMin((() => {
	init_grid_keyboard_delete_controller();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/kanban-context-menu/kanban-context-menu-controller.ts
/**
* 结构类型判：`viewEntry.getView()` 是不是 KanbanView（或其 wb 变体）。
*
* 判据：`getType() === CoreViewType.KANBAN` + 关键方法存在（防御 view 未渲染或
* API 变动）。与 grid / list 版 `getGridView` / `getListView` 同源思路。
*
* 注意：`KanbanTodoView.getType()` 也返回 `CoreViewType.KANBAN`（wb 变体沿用父
* view 的类型标识），因此这里 `=== KANBAN` 已覆盖 kanban-todo 场景；不需要额外
* 判 `getType() === KANBAN_TODO`。
*/
function getKanbanView(viewEntry) {
	const view = viewEntry.getView();
	if (!view || typeof view.getTarget !== "function" || typeof view.getType !== "function") return;
	if (view.getType() !== ViewType.KANBAN) return;
	return view;
}
/**
* 判定：当前命中是否落在**某个功能按钮**上（加卡 / 分组更多 / 全选）。
*
* 命中按钮时右键菜单应避让——让按钮自身的点击语义接管，保持"右键 = 卡片操作"
* 的心智一致性。
*/
function isButtonHit$1(target) {
	return Boolean(target.isGroupAddBtn || target.isGroupMoreBtn || target.isSelectAllBtn);
}
/**
* 创建 KANBAN 右键菜单 controller。仅在 ViewType=KANBAN 时由 view-services
* orchestrator 挂载（包含 kanban-todo wb 变体，因其 getType() 返回同一枚举值）。
*/
function createKanbanContextMenuController(options) {
	const onContextMenu = (event) => {
		if (isEditableTarget$1(document.activeElement)) return;
		const viewEntry = options.getViewEntry();
		if (!viewEntry) return;
		const view = getKanbanView(viewEntry);
		if (!view) return;
		const rect = options.container.getBoundingClientRect();
		const hitX = event.clientX - rect.left;
		const hitY = event.clientY - rect.top;
		let target;
		try {
			target = view.getTarget(hitX, hitY);
		} catch (err) {
			console.warn(`${LOG_TAG$2} getTarget failed:`, err);
			return;
		}
		if (isButtonHit$1(target)) return;
		if (target.isHead) return;
		if (target.isBody && target.recordId) {
			event.preventDefault();
			options.onOpen?.({
				hit: "record",
				source: "kanban",
				recordId: target.recordId,
				clientX: event.clientX,
				clientY: event.clientY,
				selectedRecordIds: null,
				isSingleCell: true
			});
			return;
		}
	};
	options.container.addEventListener("contextmenu", onContextMenu, true);
	return { dispose() {
		options.container.removeEventListener("contextmenu", onContextMenu, true);
	} };
}
var LOG_TAG$2;
var init_kanban_context_menu_controller = __esmMin((() => {
	init_es$2();
	init_common();
	LOG_TAG$2 = "[SmartsheetKanbanContextMenu]";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/kanban-context-menu/index.ts
var init_kanban_context_menu = __esmMin((() => {
	init_kanban_context_menu_controller();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/list-context-menu/list-context-menu-controller.ts
function isPlaceholderRecordId(recordId) {
	return typeof recordId === "string" && recordId.startsWith(PLACEHOLDER_RECORD_PREFIX);
}
/**
* 结构类型判：`viewEntry.getView()` 是不是 ListView。
*
* 判据：`getType() === CoreViewType.LIST` + 关键方法存在（防御 view 未渲染或 API 变动）。
* 与 grid 版 `getGridView` 同源思路，避免用 `instanceof` 触发跨 xtable-view 版本的
* nominal 匹配失败（详见 smartsheet-view-renderer.ts::buildContext 的 `as unknown as`
* 说明）。
*/
function getListView(viewEntry) {
	const view = viewEntry.getView();
	if (!view || typeof view.getTarget !== "function" || typeof view.getType !== "function") return;
	if (view.getType() !== ViewType.LIST) return;
	return view;
}
/**
* 判定：当前命中是否落在**某个功能按钮**上（折叠 / 加号 / 全选 / checkbox）。
*
* 命中按钮时右键菜单应避让——让按钮自身的点击语义（或未来的按钮级右键需求）接管，
* 保持"右键 = 行级操作"的心智一致性。
*/
function isButtonHit(target) {
	return Boolean(target.isFoldBtn || target.isGroupAddBtn || target.isSelectAllBtn || target.isCheckbox);
}
/**
* 从 ListTarget 里安全提取 GroupHead 路径。
*
* xtable-view 侧类型是 `GroupKey[]`（`string | null` 元素，null 表 root path 占位），
* 上层 payload `groupPath: readonly GroupKey[]` 契约完全一致。
*
* ⚠️ **原始 path 直通不 filter**：xtable-view 的 GroupHead.path 允许含 null 元素
* （root path 占位），下游 `getRecordIdsByGroupPath` 走 collector fallback 时用
* `head.path?.toString() === groupPath.toString()` 比对——若这里 filter 掉 null，
* 比对字符串两边不一致会永远找不到 head，导致「删除分组」返回空数组、菜单静默 no-op。
* 因此这里透传原始数组，让下游算法负责语义。
*/
function extractGroupPath(target) {
	if (!target.isGroupHead) return;
	const path = target.groupPath;
	if (!Array.isArray(path)) return;
	return path;
}
/**
* 创建 LIST 右键菜单 controller。仅在 ViewType=LIST 时由 view-services orchestrator 挂载。
*/
function createListContextMenuController(options) {
	const onContextMenu = (event) => {
		if (isEditableTarget$1(document.activeElement)) return;
		const viewEntry = options.getViewEntry();
		if (!viewEntry) return;
		const view = getListView(viewEntry);
		if (!view) return;
		const rect = options.container.getBoundingClientRect();
		const hitX = event.clientX - rect.left;
		const hitY = event.clientY - rect.top;
		let target;
		try {
			target = view.getTarget(hitX, hitY);
		} catch (err) {
			console.warn(`${LOG_TAG$1} getTarget failed:`, err);
			return;
		}
		if (isButtonHit(target)) return;
		if (target.isRecordRow && isPlaceholderRecordId(target.recordId)) return;
		if (target.isRecordRow && target.recordId) {
			event.preventDefault();
			const selectedRecordIds = typeof view.getSelectedRecordIds === "function" ? view.getSelectedRecordIds() : [];
			options.onOpen?.({
				hit: "record",
				source: "list",
				recordId: target.recordId,
				clientX: event.clientX,
				clientY: event.clientY,
				selectedRecordIds: selectedRecordIds.length > 0 ? selectedRecordIds : null,
				isSingleCell: true
			});
			return;
		}
		const groupPath = extractGroupPath(target);
		if (groupPath) {
			event.preventDefault();
			options.onOpen?.({
				hit: "group-head",
				source: "list",
				clientX: event.clientX,
				clientY: event.clientY,
				groupPath,
				groupCount: 0,
				groupFold: false
			});
			return;
		}
	};
	options.container.addEventListener("contextmenu", onContextMenu, true);
	return { dispose() {
		options.container.removeEventListener("contextmenu", onContextMenu, true);
	} };
}
var LOG_TAG$1, PLACEHOLDER_RECORD_PREFIX;
var init_list_context_menu_controller = __esmMin((() => {
	init_es$2();
	init_common();
	LOG_TAG$1 = "[SmartsheetListContextMenu]";
	PLACEHOLDER_RECORD_PREFIX = "__list_placeholder__:";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/list-context-menu/index.ts
var init_list_context_menu = __esmMin((() => {
	init_list_context_menu_controller();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/undo-redo/keyboard-guards.ts
/**
* undo-redo · 私有键盘识别工具。
*
* 只在本目录 controller 使用（识别 Ctrl/Cmd+Z / Ctrl+Y / Ctrl-Cmd+Shift+Z）。
* 焦点守卫 `isEditableTarget` 是跨 controller 共享的，放在了 `../common/keyboard-guards.ts`；
* 这里只放 undo/redo 键位识别——按就近原则不上升到 common。
*/
/**
* 是否是「跨平台的 undo」按键组合：
* - Windows / Linux: Ctrl+Z（无 Shift）
* - macOS: Cmd+Z（无 Shift）
*
* 排除 Shift 是因为 Shift+Ctrl/Cmd+Z 在大多数产品里语义等价于 redo（见 isRedoKey）。
*/
function isUndoKey(event) {
	if (event.key !== "z" && event.key !== "Z") return false;
	if (event.altKey || event.shiftKey) return false;
	return event.ctrlKey || event.metaKey;
}
/**
* 是否是「跨平台的 redo」按键组合。三种通用写法均识别：
* - Windows: Ctrl+Y（Office/浏览器风格）；
* - Windows: Ctrl+Shift+Z（部分设计工具风格）；
* - macOS: Cmd+Shift+Z（macOS 原生风格，Cmd+Y 在 macOS 上是"历史记录"等系统快捷键，不用）。
*
* 与 undo 组合互斥（isUndoKey/isRedoKey 不会同时为 true）：Shift+Z 走 redo、无 Shift 走 undo。
*/
function isRedoKey(event) {
	if (event.altKey) return false;
	if ((event.key === "y" || event.key === "Y") && event.ctrlKey && !event.shiftKey && !event.metaKey) return true;
	if ((event.key === "z" || event.key === "Z") && event.shiftKey && (event.ctrlKey || event.metaKey)) return true;
	return false;
}
var init_keyboard_guards = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/undo-redo/undo-redo-controller.ts
/**
* 创建 undo/redo controller。应在视图渲染完成后调用。
*
* 生命周期：controller 创建即绑定 keydown，dispose 时解绑；不随选区变化而绑定/解绑，
* 这也是与 grid-keyboard-delete controller 的核心差异。
*/
function createUndoRedoController(options) {
	const onKeyDown = (event) => {
		if (isEditableTarget$1(document.activeElement)) return;
		const isUndo = isUndoKey(event);
		const isRedo = !isUndo && isRedoKey(event);
		if (!isUndo && !isRedo) return;
		event.preventDefault();
		try {
			const api = options.core.behaviorApi.undoRedoApi;
			if (isUndo) api.undo();
			else api.redo();
		} catch (error) {
			console.error(`${LOG_TAG} ${isUndo ? "undo" : "redo"} failed:`, String(error));
		}
	};
	document.addEventListener("keydown", onKeyDown, true);
	return { dispose() {
		document.removeEventListener("keydown", onKeyDown, true);
	} };
}
var LOG_TAG;
var init_undo_redo_controller = __esmMin((() => {
	init_common();
	init_keyboard_guards();
	LOG_TAG = "[SmartsheetUndoRedo]";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/undo-redo/index.ts
var init_undo_redo = __esmMin((() => {
	init_undo_redo_controller();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/registry.ts
var VIEW_SERVICES;
var init_registry = __esmMin((() => {
	init_es$2();
	init_canvas_context_menu_guard();
	init_grid_context_menu();
	init_grid_copy_paste();
	init_grid_keyboard_delete();
	init_kanban_context_menu();
	init_list_context_menu();
	init_undo_redo();
	VIEW_SERVICES = [
		{
			id: "canvas-context-menu-guard",
			viewTypes: [
				ViewType.GRID,
				ViewType.LIST,
				ViewType.KANBAN,
				ViewType.GANTT,
				ViewType.CALENDAR
			],
			create: (ctx) => createCanvasContextMenuGuardController({ container: ctx.container })
		},
		{
			id: "grid-copy-paste",
			viewTypes: [ViewType.GRID],
			create: (ctx) => createGridCopyPasteController({
				core: ctx.core,
				container: ctx.container,
				getViewEntry: ctx.getViewEntry,
				getTable: ctx.getTable
			})
		},
		{
			id: "grid-keyboard-delete",
			viewTypes: [ViewType.GRID],
			create: (ctx) => createGridKeyboardDeleteController({
				core: ctx.core,
				container: ctx.container,
				getViewEntry: ctx.getViewEntry,
				getTable: ctx.getTable
			})
		},
		{
			id: "grid-context-menu",
			viewTypes: [ViewType.GRID],
			create: (ctx) => createGridContextMenuController({
				container: ctx.container,
				getViewEntry: ctx.getViewEntry,
				onOpen: (payload) => ctx.handlers.getContextMenuOpen()?.(payload)
			})
		},
		{
			id: "list-context-menu",
			viewTypes: [ViewType.LIST],
			create: (ctx) => createListContextMenuController({
				container: ctx.container,
				getViewEntry: ctx.getViewEntry,
				onOpen: (payload) => ctx.handlers.getContextMenuOpen()?.(payload)
			})
		},
		{
			id: "kanban-context-menu",
			viewTypes: [ViewType.KANBAN],
			create: (ctx) => createKanbanContextMenuController({
				container: ctx.container,
				getViewEntry: ctx.getViewEntry,
				onOpen: (payload) => ctx.handlers.getContextMenuOpen()?.(payload)
			})
		},
		{
			id: "undo-redo",
			viewTypes: [
				ViewType.GRID,
				ViewType.KANBAN,
				ViewType.LIST,
				ViewType.GANTT,
				ViewType.CALENDAR
			],
			create: (ctx) => createUndoRedoController({
				core: ctx.core,
				container: ctx.container
			})
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/orchestrator.ts
/**
* 判断 descriptor 是否匹配当前 view。
*
* matches 优先于 viewTypes；两者都未提供视为不匹配（避免误注册）。
*/
function isMatched(desc, view, ctx) {
	if (desc.matches) return desc.matches(view, ctx);
	if (desc.viewTypes && desc.viewTypes.length > 0) return desc.viewTypes.includes(view.type);
	return false;
}
/**
* 释放上一次激活的所有 service。
*
* dispose 抛错不应阻断后续 service 的释放——用 try/catch 包住每个 dispose。
*/
function disposeActiveViewServices(active) {
	for (const item of active) try {
		item.instance.dispose();
	} catch (err) {
		console.warn(`[ViewServices] dispose "${item.id}" failed:`, err);
	}
}
/**
* 全量释放 + 重建：先 dispose 上一次激活的 service，再按当前 view 匹配 create 新的。
*
* 调用方约定：
* - view 为 undefined（renderer 尚未渲染 / 已 dispose）→ 只释放不重建
* - 返回值需由调用方保存，下次 sync 时作为「上一次激活」传入并被释放
*/
function syncViewServices(prev, view, ctx) {
	disposeActiveViewServices(prev);
	if (!view) return [];
	const next = [];
	for (const desc of VIEW_SERVICES) {
		if (!isMatched(desc, view, ctx)) continue;
		try {
			next.push({
				id: desc.id,
				instance: desc.create(ctx)
			});
		} catch (err) {
			console.warn(`[ViewServices] create "${desc.id}" failed:`, err);
		}
	}
	return next;
}
var init_orchestrator = __esmMin((() => {
	init_registry();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/service/view-services/index.ts
var init_view_services = __esmMin((() => {
	init_orchestrator();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/smart-sheet/view/smartsheet-view-renderer.ts
var SmartsheetViewRenderer;
var init_smartsheet_view_renderer = __esmMin((() => {
	init_es$2();
	init_es();
	init_i18n$1();
	init_i18n();
	init_view_services();
	SmartsheetViewRenderer = class {
		constructor(options) {
			this.disposed = false;
			this.activeViewServices = [];
			this.core = options.core;
			this.container = options.container;
			this.onRecordClick = options.onRecordClick;
			this.onRecordTimeSlotClick = options.onRecordTimeSlotClick;
			this.onAddRecord = options.onAddRecord;
			this.onAddRecordAtTime = options.onAddRecordAtTime;
			this.onCardSelectChange = options.onCardSelectChange;
			this.onRecordMiniListShow = options.onRecordMiniListShow;
			this.onCellEdit = options.onCellEdit;
			this.onAttachmentPreview = options.onAttachmentPreview;
			this.onAttachmentDelete = options.onAttachmentDelete;
			this.onMemberRemove = options.onMemberRemove;
			this.onContextMenuOpen = options.onContextMenuOpen;
			this.onSubDepthLimit = options.onSubDepthLimit;
			this.onAddFieldClick = options.onAddFieldClick;
			this.onGridExpandChange = options.onGridExpandChange;
			this.viewGroupId = options.viewGroupId;
		}
		/**
		* 初始化并渲染视图。
		* 调用方应先 await core.ready，再调用本方法。
		*
		* 时序保障：
		* 1. 先确保 container 已插入 DOM 且有非零尺寸（首屏关键修复）
		* 2. 等待 todos / todo_statuses 表的首 chunk 加载完成
		* 3. 通过 ViewEntry.render(viewType) 挂载视图
		*/
		async init() {
			if (this.disposed) return;
			await ensureXtableI18nReady();
			if (this.disposed) return;
			await this.ensureContainerReady();
			if (this.disposed) return;
			const ssCore = this.getISmartSheetCore();
			const table = await this.core.getTableForRender("todos");
			if (!table) throw new Error("SmartsheetViewRenderer: todos 子表未找到");
			let view = this.findTargetView(table);
			if (!view) view = this.createLocalKanbanView(table);
			if (!view) throw new Error("SmartsheetViewRenderer: issues 子表没有可用的 view");
			this.currentView = view;
			this.currentTable = table;
			this.viewEntry = new ViewEntry(this.buildContext(ssCore, table));
			await this.viewEntry.render(view.type);
			this.bindEvents();
			this.syncActiveViewServices();
			this.observeResize();
			this.observeLocaleChange();
		}
		/** 销毁渲染器，释放 canvas 与事件 */
		dispose() {
			if (this.disposed) return;
			this.disposed = true;
			this.cardClickDisposable?.();
			this.cardClickDisposable = void 0;
			this.groupAddClickDisposable?.();
			this.groupAddClickDisposable = void 0;
			this.cardSelectChangeDisposable?.();
			this.cardSelectChangeDisposable = void 0;
			this.recordMiniListShowDisposable?.();
			this.recordMiniListShowDisposable = void 0;
			this.subDepthLimitDisposable?.();
			this.subDepthLimitDisposable = void 0;
			this.addFieldClickDisposable?.();
			this.addFieldClickDisposable = void 0;
			this.gridExpandChangeDisposable?.();
			this.gridExpandChangeDisposable = void 0;
			this.lastGridExpandRecordId = void 0;
			this.activePointEditorDisposable?.();
			this.activePointEditorDisposable = void 0;
			this.localeChangeDisposable?.();
			this.localeChangeDisposable = void 0;
			this.activeViewServices = syncViewServices(this.activeViewServices, void 0, this.buildViewServiceContext());
			this.viewEntry?.destroy();
			this.viewEntry = void 0;
		}
		/** 获取底层 ViewEntry 实例（供外部调用高级 API） */
		getViewEntry() {
			return this.viewEntry;
		}
		/**
		* 获取当前渲染的**数据层 view**（xtable-core `UnionViewModel`）。
		*
		* 与 `getViewEntry().getView()` 的**本质区别**：
		* - `viewEntry.getView()` 返回的是 xtable-**view** 层的 GridView / CanvasView
		*   等**渲染实例**——只暴露渲染相关 API（`getVisibleFieldIds` /
		*   `getSelectionData` / `getFrozenFields` 等），**不含** `getFrozenFieldCount`
		*   这种数据层方法。
		* - 本方法返回的是 xtable-**core** 层的 view model（业务侧持有的原始
		*   view 数据对象）——`getFrozenFieldCount` / `getFilterCondition` /
		*   `getSortCondition` 等真数据源方法都在这一层。
		*
		* 用途：ViewRendererHandle 里需要读"视图纯数据态"（如冻结列数、筛选条件）
		* 时用这个；需要读"渲染态"（如实际渲染出的可见列 id）时用 `getViewEntry().getView()`。
		*/
		getCurrentView() {
			return this.currentView;
		}
		/**
		* 切换到目标视图编组的 currentView（编组切换 / 视图类型切换通用）。
		*
		* 对齐 smart-sheet 做法：**不销毁重建整个渲染器**，复用同一个 ViewEntry 与
		* container 挂载点，仅调 `ViewEntry.render(newType)` 重建内部 View 实例。
		* emitter 跨 render 常驻，故已绑定的交互事件订阅（bindEvents）无需重绑。
		*
		* @param viewGroupId 目标视图编组 id；不传则沿用当前 viewGroupId
		*   （用于「先 setViewMode 改 currentViewId、再按新 currentView 重渲染」的类型切换）
		*/
		async switchView(viewGroupId) {
			if (this.disposed || !this.viewEntry) return;
			if (viewGroupId !== void 0) this.viewGroupId = viewGroupId;
			const table = await this.core.getTableForRender("todos");
			if (this.disposed || !this.viewEntry) return;
			if (!table) {
				console.warn("[SmartsheetViewRenderer] switchView: todos 子表未找到");
				return;
			}
			const view = this.findTargetView(table);
			if (!view) {
				console.warn("[SmartsheetViewRenderer] switchView: 未找到目标 view", this.viewGroupId);
				return;
			}
			if (this.currentView?.id === view.id && this.currentView?.type === view.type) return;
			this.currentView = view;
			this.currentTable = table;
			await this.viewEntry.render(view.type);
			this.syncActiveViewServices();
		}
		/**
		* 确保 container 已插入 DOM 且有非零尺寸。
		* 首屏时 React 可能还未完成布局，container 尺寸为 0，
		* 此时若立即创建 ViewEntry 会导致渲染异常（切 tab 后才能恢复）。
		*/
		async ensureContainerReady() {
			const container = this.container;
			const rect = container.getBoundingClientRect();
			if (rect.width > 0 && rect.height > 0) return;
			return new Promise((resolve, reject) => {
				const timeout = setTimeout(() => {
					observer.disconnect();
					resolve();
				}, 3e3);
				const observer = new ResizeObserver((entries) => {
					for (const entry of entries) {
						const { width, height } = entry.contentRect;
						if (width > 0 && height > 0) {
							clearTimeout(timeout);
							observer.disconnect();
							resolve();
							return;
						}
					}
				});
				observer.observe(container);
			});
		}
		/** 监听 container 尺寸变化，触发视图 rerender */
		observeResize() {
			const container = this.container;
			let prevWidth = container.clientWidth;
			let prevHeight = container.clientHeight;
			const observer = new ResizeObserver((entries) => {
				if (this.disposed) {
					observer.disconnect();
					return;
				}
				for (const entry of entries) {
					const { width, height } = entry.contentRect;
					if (width !== prevWidth || height !== prevHeight) {
						prevWidth = width;
						prevHeight = height;
						this.viewEntry?.rerender(true);
					}
				}
			});
			observer.observe(container);
			const originalDispose = this.dispose.bind(this);
			this.dispose = () => {
				observer.disconnect();
				originalDispose();
			};
		}
		/**
		* 监听 genie 语言切换，强制重绘 canvas。
		*
		* 根因：xtable-view 把 To do / In progress / High 等静态文案画在 canvas 上，
		* 且已改为惰性求值（渲染时才调 `i18n.t()`）。切语言时 `xtable-i18n-bootstrap`
		* 已同步 `shim.setLanguage()`，但 canvas 不会因语言变化自动重绘，导致已渲染的
		* 文案停留在旧语种，须显式 rerender 才会按新语种重新求值（对齐用户手动
		* `xview.viewEntry.rerender()` 的效果）。
		*
		* 时序：`onLocaleChange` 的多个监听器（含 bootstrap 的 setLanguage）同步顺序触发，
		* 这里用 rAF 把 rerender 推到下一帧，确保无论监听器注册顺序如何，shim.language
		* 都已切到新语种后再重绘。
		*/
		observeLocaleChange() {
			this.localeChangeDisposable = onLocaleChange(() => {
				if (this.disposed) return;
				requestAnimationFrame(() => {
					if (this.disposed) return;
					this.viewEntry?.rerender(true);
				});
			});
		}
		getISmartSheetCore() {
			const internal = this.core.core;
			if (!internal) throw new Error("SmartsheetViewRenderer: SmartsheetCore 尚未初始化");
			return internal;
		}
		/**
		* 同步视图 service 生命周期（GRID 复制粘贴、未来看板 WIP 限制等）。
		*
		* - 全量释放上一次激活的 service，按当前 view 匹配 `VIEW_SERVICES` 里的
		*   descriptor 重新 create。切走当前 view type 时对应 service 自动释放。
		* - 视图重建（switchView / render）会新建 View 与 RangeModel，旧 service
		*   持有的订阅指向已销毁对象，全量重建可规避悬挂订阅。
		* - 新增视图 service → 修改 `service/view-services/registry.ts`，不改本文件。
		*/
		syncActiveViewServices() {
			if (this.disposed) {
				this.activeViewServices = syncViewServices(this.activeViewServices, void 0, this.buildViewServiceContext());
				return;
			}
			this.activeViewServices = syncViewServices(this.activeViewServices, this.viewEntry ? this.currentView : void 0, this.buildViewServiceContext());
		}
		/**
		* 构造 `ViewServiceContext`。
		*
		* getter 形式而非快照——ViewEntry / currentView / currentTable 会随 switchView
		* 重建，闭包读取 this.* 才能拿到最新引用。
		*/
		buildViewServiceContext() {
			return {
				core: this.core,
				container: this.container,
				getViewEntry: () => this.viewEntry,
				getTable: () => this.currentTable,
				getCurrentView: () => this.currentView,
				handlers: { getContextMenuOpen: () => this.onContextMenuOpen }
			};
		}
		findTargetView(table) {
			if (this.viewGroupId) {
				const t = table;
				const target = (t.getViewGroups?.() ?? t.viewGroupList ?? []).find((g) => g.id === this.viewGroupId);
				if (target) {
					const candidateIds = [target.currentViewId, ...target.viewIds ?? []].filter((id) => Boolean(id));
					for (const vid of candidateIds) {
						const v = table.getViewByViewId(vid);
						if (v) return v;
					}
				}
			}
			const views = table.getAllVisibleViews();
			return views.find((v) => v.type === ViewType.KANBAN) ?? views[0];
		}
		/**
		* 在本地 model 中创建一个默认 kanban view。
		* ⚠️ 仅修改内存，不会同步到后端；页面刷新后消失。
		* 若后端 issues 子表已带 kanban view，本方法不会触发。
		*/
		createLocalKanbanView(table) {
			const ssCore = this.getISmartSheetCore();
			const viewId = `kanban-${Date.now()}`;
			const property = table.generateDefaultViewProperty(ViewType.KANBAN, viewId);
			const InsertViewMutation = ssCore.mutationApi.getMutationMap()[MutationId.INSERT_VIEW_MUTATION];
			if (!InsertViewMutation) return;
			ssCore.mutationApi.applyMutations([new InsertViewMutation({
				tableId: table.id,
				operationType: MutationOperationType.REPLAY,
				delta: {
					viewId,
					index: table.getViewCount(),
					type: ViewType.KANBAN,
					title: t("collab.plan.display.mode.board"),
					owner: "",
					publicLevel: ViewPublicLevel.PUBLIC,
					description: null,
					quickFilterIds: [],
					properties: property
				}
			})]);
			return table.getViewByViewId(viewId);
		}
		buildContext(ssCore, table) {
			const emitter = new ViewEmitter();
			const liveState = /* @__PURE__ */ new Map();
			const container = this.container;
			return {
				emitter,
				liveState,
				getScale: () => 1,
				getRenderRoot: () => container,
				getCore: () => ssCore,
				getCurrentTable: () => table,
				getCurrentView: () => this.currentView,
				getId: () => `smartsheet-view-${table.id}`,
				customConfig: void 0,
				isDashboardLite: false,
				isGridLite: false,
				getBehaviorApi: () => ssCore.behaviorApi,
				getTableDescriptionRoot: () => container
			};
		}
		/**
		* 选中（或取消选中）指定卡片。
		*
		* 内部会先退出批量选择模式（如果处于该模式），再设置 active card。
		* 传空字符串 '' 清空选中。
		*
		* 通过 KanbanTodoView.setActiveCard（运行时方法）实现；
		* 回退到 setActiveRecordId（类型声明中存在但可能为空实现）。
		*/
		setActiveCard(recordId) {
			const view = this.viewEntry?.getView();
			if (!view) return;
			this.setBatchSelectMode(false);
			const v = view;
			if (typeof v.setActiveCard === "function") v.setActiveCard(recordId);
			else if (typeof v.setActiveRecordId === "function") v.setActiveRecordId(recordId);
		}
		/**
		* 进入 / 退出批量选择模式。
		*
		* - 进入（enable=true）：分组头加号变为全选/取消全选，卡片出现 checkbox
		* - 退出（enable=false）：清空选中状态，恢复常规 UI
		*
		* 通过 KanbanTodoView.setBatchSelectMode 实现。
		*/
		setBatchSelectMode(enable) {
			const view = this.viewEntry?.getView();
			if (!view) return;
			const v = view;
			if (typeof v.setBatchSelectMode === "function") v.setBatchSelectMode(enable);
		}
		/**
		* 强制退出批量选择模式并清空已选集合（供业务层「取消选择」按钮显式调用）。
		*
		* 为什么不能直接用 `setBatchSelectMode(false)`：
		* KanbanTodoView.setBatchSelectMode(false) 对「分组级批量模式」（由分组头「全选」菜单
		* 进入、内部 batchGroupIndices 非空）设有退出守卫——外部因选中集合变空而调用
		* setBatchSelectMode(false) 会被当作 no-op，让用户仍可在该分组内重新勾选，退出交由
		* 用户显式操作（点空白区域）触发。看板批量态几乎总是分组级进入，故「取消选择」按钮走
		* 普通 setBatchSelectMode(false) 会被守卫吞掉、看不到任何效果（本次修复的根因）。
		*
		* 这里绕过守卫：先直接调 state.setBatchSelectMode(false) 清空 batchGroupIndices +
		* 选中集合，再走一次公共 view.setBatchSelectMode(false) 触发重收集 + 重渲染（此时已非
		* 批量模式、守卫条件不成立，不会被拦截），最后回调 onCardSelectChange([]) 通知业务层
		* 同步 React 状态。整条链与 hover feature「点击空白区域退出批量模式」的渲染层事件一致
		* （见 xtable-view kanban-todo hover onMouseDown）。
		*/
		exitBatchSelect() {
			const view = this.viewEntry?.getView();
			if (!view) return;
			const v = view;
			v.collector?.state?.setBatchSelectMode?.(false);
			v.setBatchSelectMode?.(false);
			this.onCardSelectChange?.([]);
		}
		/**
		* 切换 xtable-view ActivePointFeature 的图层 z 序。
		*
		* 背景：xtable-view 的"选中蓝框"由 Canvas 上的 ActivePointFeature 渲染，默认
		* 位于 stage 最上层，会盖住任何 DOM 浮层（包括 GRID 单元格内编辑器的 input）。
		*
		* - `'back'`：把 ActivePointFeature 放回后层，让 DOM 浮层（如 TitleCellEditor
		*   editing 阶段的 input + 1.5px brand 边框）能完整显示在 Canvas 蓝框之上。
		* - `'front'`：还原默认上层位置——cell preview / 非编辑态下 Canvas 蓝框需要
		*   稳定地遮住下方元素。
		*
		* 调用方契约：进入 editing 时调 'back'，回到 preview / 关闭浮层时务必调 'front'。
		* 不配对会导致 ActivePointFeature 残留在后层，影响其它单元格的选中视觉。
		*
		* 抽到 renderer 公共方法是为了让 UI 层（cell editor）不直接接触 xtable-view
		* 内部 API，避免业务代码 import xtable-view 类型——保持 service 边界一致。
		*/
		setActivePointStage(stage) {
			const view = this.viewEntry?.getView();
			if (!view) return;
			const v = view;
			if (typeof v.getActivePointFeature !== "function") return;
			const feature = v.getActivePointFeature();
			if (!feature) return;
			if (stage === "back") feature.toBackStage?.();
			else feature.toFrontStage?.();
		}
		/**
		* 获取当前 GRID 视图选中态（ActivePointFeature）的实际外边框矩形。
		*
		* 与 `emitter.wbService.onRecordClick` 派发的 `cellRect` 的关键区别：
		* - `cellRect`：xtable 内部单元格的 raw 区域（如描述列的 24px 单行高度，
		*   即使内容被截断为 "……" 也不会撑高）。
		* - `activePointInfo.rect`：xtable-view 蓝色选中框的**实际渲染区域**——
		*   对多行文本列（如 sys_description），会在被激活时按内容自适应高度，
		*   与用户看到的蓝色选中框一致。
		*
		* DescriptionCellEditor 需要覆盖到"用户看到的蓝框"上而不是原始 cell 上，
		* 视觉上才与详情弹窗描述编辑器一致（撑到多行的可视区域）。
		*
		* 返回：`{ x, y, width, height }`（相对 stage 视口）；未处于 GRID
		* 或 ActivePointFeature 未渲染时返回 null。上层拿到 null 时应回退 cellRect。
		*/
		getActivePointRect() {
			const view = this.viewEntry?.getView();
			if (!view) return null;
			const v = view;
			if (typeof v.getActivePointFeature !== "function") return null;
			const feature = v.getActivePointFeature();
			if (!feature || typeof feature.getActivePointInfo !== "function") return null;
			const rect = feature.getActivePointInfo()?.rect;
			if (!rect) return null;
			return {
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height
			};
		}
		/**
		* 绑定 xtable-view emitter.wbService 事件。
		*
		* 与 KanbanTodoView 的交互事件对接——KanbanTodoView 的 hover feature 在
		* 响应点击后通过 emitter.wbService 派发事件，本方法订阅这些事件并透传给
		* 外部回调。相比旧的 DOM 级别 click + getTarget 命中检测，此方式由 xtable
		* 内部精确判断命中，更可靠且与 KanbanTodoView 各 feature 状态（如 batch mode）
		* 天然同步。
		*/
		bindEvents() {
			if (!this.viewEntry?.getView() || !this.viewEntry) return;
			const { wbService } = this.viewEntry.emitter;
			if (this.onRecordClick || this.onRecordTimeSlotClick || this.onAddRecordAtTime || this.onCellEdit) {
				const disposable = wbService.onRecordClick.event((payload) => {
					const { recordId, time, fieldId, cellRect } = payload;
					if (recordId && fieldId && cellRect) {
						this.onCellEdit?.({
							recordId,
							fieldId,
							cellRect
						});
						return;
					}
					if (recordId) if (time !== void 0 && this.onRecordTimeSlotClick) this.onRecordTimeSlotClick(recordId, time);
					else this.onRecordClick?.(recordId);
					else this.onAddRecordAtTime?.(time);
				});
				this.cardClickDisposable = () => disposable.dispose();
			}
			if (this.onAddRecord) {
				const disposable = wbService.onGroupAddClick.event(({ groupPath }) => {
					this.onAddRecord?.(groupPath.map(String));
				});
				this.groupAddClickDisposable = () => disposable.dispose();
			}
			if (this.onCardSelectChange) {
				const disposable = wbService.onRecordSelectChange.event((recordIds) => {
					this.onCardSelectChange?.(recordIds);
				});
				this.cardSelectChangeDisposable = () => disposable.dispose();
			}
			if (this.onRecordMiniListShow) {
				const disposable = wbService.onRecordMiniListShow.event((payload) => {
					this.onRecordMiniListShow?.(payload);
				});
				this.recordMiniListShowDisposable = () => disposable.dispose();
			}
			if (this.onSubDepthLimit) {
				const disposable = wbService.onSubDepthLimit.event(() => {
					this.onSubDepthLimit?.();
				});
				this.subDepthLimitDisposable = () => disposable.dispose();
			}
			if (this.onGridExpandChange) {
				const disposable = wbService.onGridExpandChange?.event((payload) => {
					if (payload === null) {
						if (this.lastGridExpandRecordId === void 0) return;
						this.lastGridExpandRecordId = void 0;
						this.onGridExpandChange?.(null);
						return;
					}
					const { rect, recordId } = payload;
					if (!rect || !recordId) return;
					if (this.lastGridExpandRecordId === recordId) return;
					this.lastGridExpandRecordId = recordId;
					this.onGridExpandChange?.({
						rect: {
							x: rect.x,
							y: rect.y,
							width: rect.width,
							height: rect.height
						},
						recordId
					});
				});
				this.gridExpandChangeDisposable = () => disposable.dispose();
			}
			if (this.onAttachmentPreview || this.onAttachmentDelete || this.onMemberRemove) {
				const disposable = this.viewEntry.emitter.service.activePointEditor.event((payload) => {
					const cellData = payload.cellData;
					const attachment = cellData?.attachment;
					const todoId = payload.recordId;
					if (payload.buttonType === ActivePointButtonType.DELETE) {
						if (attachment) {
							if (todoId && attachment.id) this.onAttachmentDelete?.({
								attachment,
								todoId
							});
							return;
						}
						const memberId = cellData?.id;
						if (memberId && todoId) this.onMemberRemove?.({
							member: {
								id: memberId,
								name: cellData?.name,
								avatarUrl: cellData?.avatarUrl
							},
							fieldId: payload.fieldId || "",
							todoId
						});
						return;
					}
					if (attachment) this.onAttachmentPreview?.({
						attachment,
						text: cellData?.text
					});
				});
				this.activePointEditorDisposable = () => disposable.dispose();
			}
			if (this.onAddFieldClick) {
				const disposable = this.viewEntry.emitter.service.addFieldClickEmitter.event((payload) => {
					const rect = payload?.rect;
					if (!rect) return;
					this.onAddFieldClick?.({ rect: {
						x: rect.x,
						y: rect.y,
						width: rect.width,
						height: rect.height
					} });
				});
				this.addFieldClickDisposable = () => disposable.dispose();
			}
		}
	};
}));
//#endregion
export { F_TODO_TYPE as $, init_view_mode_config as A, init_todo_fields as B, getHideableColumns as C, coreTypeSupportsGrouping as D, VIEW_MODE_REGISTRY as E, viewModeToCoreType as F, getHideableFields as G, getFieldDef as H, getDefaultSortDirection as I, pickDefaultState as J, init_todo_field_schema as K, getSortFields as L, viewModeSupportsGrouping as M, viewModeSupportsShowSubTodos as N, coreTypeToViewMode as O, viewModeSupportsSorting as P, F_TODO as Q, isOptionSortField as R, getGroupingOptions as S, init_view_column_config as T, getFieldKeyByTitle as U, getAlwaysHiddenFields as V, getFieldTitleByKey as W, readAllowedTransitions as X, readAllStates as Y, stateInfoToDto as Z, buildColumnFilterOptions as _, getDefaultViewId as _t, getGridView$1 as a, resolvePriorityOption as at, getFilterableColumns as b, isAllGridGroupFold as c, readFirstLinkedRecordId as ct, setGridGroupFold as d, readTextOpt as dt, PRIORITY_TEXTS as et, subscribeSelectionChange as f, readUsers as ft, VIEW_COLUMNS as g, findOptionIdByText as gt, TITLE_COLUMN_KEY as h, buildUserCDelta as ht, autoAdaptGridColumnWidth as i, init_table_constants as it, viewModeSupportsFieldVisibility as j, getViewModeOptions as k, resetGridSelection as l, readSelectText as lt, HIDEABLE_COLUMN_KEYS as m, buildTextDelta as mt, init_smartsheet_view_renderer as n, TABLE_TODOS as nt, getRecordIdsByGroupPath as o, findFieldIdByTitle as ot, DEFAULT_TOOLBAR_STATE as p, assertExecutionSuccess as pt, init_table_state_readers as q, init_common as r, TABLE_TODO_TYPES as rt, getSelectionAnchor as s, init_table_cell_readers as st, SmartsheetViewRenderer as t, TABLE_ITERATIONS as tt, selectFirstCellOfRecord as u, readText as ut, buildFieldIdToColumnIndex as v, init_cell_builders as vt, getHideableColumnsForMode as w, getGroupableColumns as x, getColumnConfig as y, touchRecordModifiedTime as yt, FIELD_DEFS as z };
