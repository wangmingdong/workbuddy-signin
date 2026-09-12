import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Nc as init_connector } from "./agent-mail-CiuzbR2o.js";
import { Gs as createPhraseBlock, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { ht as AccountContext, t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { t as init_router, x as useRouterContext } from "./router-O5ZnP5xt.js";
import { g as LEXIANG_MCP_CONNECTOR_ID, h as LEXIANG_AUTO_CONNECT_TOAST_KEY, y as connectorStore } from "./ima-auth-store-Cq8i4JCG.js";
import { n as getLexiangIconUrl, r as init_lexiang_file_type_icon } from "./lexiang-file-type-icon-BHHdkoaP.js";
import { a as appendBlocksToDraft, c as init_new_task_draft, o as buildNewTaskDraftKey, s as deduplicateBlocksByUri } from "./host-9mJqHhXr.js";
import { f as init_store, g as useTencentLexiangStore } from "./auth-guide-DhEAKsIJ.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/lexiang-content-blocks.ts
/**
* 构建乐享统一 URI。
*
* 权威协议（与 `main-content-core.tsx#handleLexiangPickerConfirm.makeLexiangUri`
* 和 `prompt-codec.ts#parseLexiangUri` 保持完全一致）：
*
*   lexiang://<entityId>?type=<entityType>[&kbId=<kbId>][&teamId=<teamId>]
*
* - entityType 仅允许 `'doc' | 'folder' | 'kb' | 'team'`
* - 所有 value 必须经 `encodeURIComponent`，避免特殊字符破坏 query 结构
*
* 协议对齐：乐享的文本 badge 与 tdoc / ima 完全同构，均为 `@<kind>:"<title>"`，
* 不在 badge 里冗余类型和 ID。URI query（type/kbId/teamId）承载的元数据会由后端
* `prompt-context.ts#getAttachedLexiangFiles` 抽取到 `<lexiang_usage><references>`
* 块，模型据此按 title 对齐 entity_id / entity_type / kb_id / team_id。
*
* 旧格式 `lexiang://<id>`（无 query）仅做 legacy 兼容：badge 依然是 `@lexiang:"<title>"`，
* 但 `<references>` 里不会有 entity_type/kb_id/team_id，模型需要走搜索回退。
*/
function buildLexiangUri(entityId, entityType, extras) {
	const params = [`type=${encodeURIComponent(entityType)}`];
	if (extras?.kbId) params.push(`kbId=${encodeURIComponent(extras.kbId)}`);
	if (extras?.teamId) params.push(`teamId=${encodeURIComponent(extras.teamId)}`);
	return `lexiang://${entityId}?${params.join("&")}`;
}
/**
* 构建乐享团队的 ContentBlock tag。
*
* 统一协议：`lexiang://<teamId>?type=team` + `_meta.entityType = 'team'`。
*
* tag 图标暂复用 picker 路径中 team / kb 的 `'tencent-lexiang'`（彩色乐享 logo），
* 与“知识库”图标保持一致；后续如需团队专属图标，再扩展 IconProvider。
*/
function buildTeamBlock(team) {
	return createPhraseBlock(team.name, buildLexiangUri(team.id, "team"), {
		title: team.name,
		icon: "tencent-lexiang",
		description: team.name,
		meta: {
			timestamp: Date.now(),
			mentionType: "tencent-lexiang",
			type: "tencent-lexiang",
			entityType: "team",
			title: team.name,
			displayText: team.name,
			teamId: team.id,
			teamName: team.name
		}
	});
}
/**
* 构建乐享知识库整体的 ContentBlock tag。
*
* 统一协议：`lexiang://<kbId>?type=kb` + `_meta.entityType = 'kb'`。
*/
function buildKnowledgeBaseBlock(kb) {
	return createPhraseBlock(kb.name, buildLexiangUri(kb.id, "kb"), {
		title: kb.name,
		icon: "file",
		description: kb.name,
		meta: {
			timestamp: Date.now(),
			mentionType: "tencent-lexiang",
			type: "tencent-lexiang",
			entityType: "kb",
			title: kb.name,
			displayText: kb.name,
			kbId: kb.id,
			kbName: kb.name
		}
	});
}
/**
* 构建乐享单文件/文件夹的 ContentBlock tag。
*
* 统一协议：`lexiang://<entityId>?type=<entityType>[&kbId=<kbId>]`，
* 其中 entityType：
* - 文件夹（`file.is_folder === true` 或 `file.type === 'folder'` 或 `file.entry_type === 'folder'`）→ `'folder'`
* - 普通文档 → `'doc'`
*
* 传入 `kb` 时会自动拼上 `kbId` query 参数，也会写入 `_meta.kbId/kbName`，
* 与 picker 确认路径的行为保持一致，方便后端定位父级知识库。
*/
function buildFileBlock(file, kb) {
	const isFolder = file.is_folder || file.type === "folder" || file.entry_type === "folder";
	const entityType = isFolder ? "folder" : "doc";
	const iconUrl = getLexiangIconUrl(file.type, file.extension, isFolder);
	const kbId = kb?.id;
	return createPhraseBlock(file.title, buildLexiangUri(file.id, entityType, { kbId }), {
		title: file.title,
		icon: {
			url: iconUrl,
			alt: file.title
		},
		description: file.title,
		meta: {
			timestamp: Date.now(),
			mentionType: "tencent-lexiang",
			type: "tencent-lexiang",
			entityType,
			title: file.title,
			displayText: file.title,
			docId: file.id,
			kind: file.type,
			kbId,
			kbName: kb?.name
		}
	});
}
var init_lexiang_content_blocks = __esmMin((() => {
	init_src();
	init_lexiang_file_type_icon();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/hooks/use-lexiang-add-to-task.ts
function useLexiangAddToTask() {
	const adapter = useAdapter();
	const router = useRouterContext();
	const conversationsContext = useConversations();
	const accountUid = (0, import_react.useContext)(AccountContext)?.account?.uid;
	const currentKb = useTencentLexiangStore((s) => s.currentKnowledgeBase);
	const clearSelected = useTencentLexiangStore((s) => s.clearSelected);
	/**
	* 进入真正的新建任务最终态。
	*
	* `handleNewTask` 是权威链路；兜底的 `router.updateUrl({ taskId: null })`
	* 保证未注册 handler 时也能离开 `/library/lexiang`，让侧栏 active 条件成立。
	*/
	const enterNewTaskView = (0, import_react.useCallback)(() => {
		if (conversationsContext?.handleNewTask) conversationsContext.handleNewTask(true);
		else router.updateUrl({ taskId: null }, { replace: true });
	}, [conversationsContext, router]);
	/**
	* 注入 blocks 并切到真正的新建任务最终态。
	*
	* 乐享页本身是 `/library/lexiang` shell-panel 路由；如果只关闭面板不离开该路由，
	* 侧边栏的新建任务 active 会被 `isNonTaskShellRoute('/library/lexiang')` 拦掉。
	* 因此这里统一复用 `handleNewTask(true)`：它会清 taskId/currentConversation/cwd
	* 并把 URL 切回 `/`。输入内容已经预写入 new-task draft，等待 MainContentCore 恢复。
	*/
	const injectAndNavigate = (0, import_react.useCallback)((blocks) => {
		if (blocks.length === 0) return;
		const draftKey = buildNewTaskDraftKey(accountUid);
		const uniqueBlocks = deduplicateBlocksByUri(blocks, draftKey);
		if (uniqueBlocks.length === 0) {
			enterNewTaskView();
			return;
		}
		appendBlocksToDraft(uniqueBlocks, draftKey);
		enterNewTaskView();
		connectorStore.getState().autoEnableMcpConnectorToggle(LEXIANG_MCP_CONNECTOR_ID, LEXIANG_AUTO_CONNECT_TOAST_KEY);
	}, [accountUid, enterNewTaskView]);
	return {
		addKnowledgeBaseToTask: (0, import_react.useCallback)((_source) => {
			if (!currentKb) return;
			injectAndNavigate([buildKnowledgeBaseBlock(currentKb)]);
			clearSelected();
		}, [
			currentKb,
			injectAndNavigate,
			clearSelected
		]),
		addFileToTask: (0, import_react.useCallback)((file, source) => {
			injectAndNavigate([buildFileBlock(file, currentKb)]);
			clearSelected();
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					pageName: "lexiang",
					elementId: source === "spark_icon" ? "lexiang_lib_add_to_task_hover" : "lexiang_lib_add_to_task_batch",
					elementName: source === "spark_icon" ? "hover添加至任务" : "批量添加至任务",
					mode: "lexiang"
				});
			} catch {}
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					pageName: "lexiang",
					elementId: "attach_lexiang_success",
					elementName: "乐享附件添加成功",
					source: file.type ?? "",
					type: file.extension ?? "",
					mode: "lexiang"
				});
			} catch {}
		}, [
			adapter,
			currentKb,
			injectAndNavigate,
			clearSelected
		]),
		addFilesToTask: (0, import_react.useCallback)((files, _source) => {
			injectAndNavigate(files.map((file) => buildFileBlock(file, currentKb)));
			clearSelected();
			try {
				adapter?.reportTelemetry?.("web_element_click", {
					pageName: "lexiang",
					elementId: "lexiang_lib_add_to_task_batch",
					elementName: "批量添加至任务",
					mode: "lexiang"
				});
			} catch {}
			files.forEach((file) => {
				try {
					adapter?.reportTelemetry?.("web_element_click", {
						pageName: "lexiang",
						elementId: "attach_lexiang_success",
						elementName: "乐享附件添加成功",
						source: file.type ?? "",
						type: file.extension ?? "",
						mode: "lexiang"
					});
				} catch {}
			});
		}, [
			adapter,
			currentKb,
			injectAndNavigate,
			clearSelected
		]),
		addBlocksToTask: injectAndNavigate
	};
}
/**
* 兼容 MainContentCore 挂载标记调用。
*
* 乐享添加任务现在统一依赖 `handleNewTask(true)` + adapter pending 机制，
* 不再依赖本标记；本地文件冷启动等场景仍通过 isMainContentMounted 读取状态。
*/
function markMainContentMounted() {
	mainContentMounted = true;
}
/** 兼容 MainContentCore 卸载标记调用（卸载时由 MainContentCore 调用） */
function markMainContentUnmounted() {
	mainContentMounted = false;
}
var import_react, mainContentMounted;
var init_use_lexiang_add_to_task = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_connector();
	init_router();
	init_new_task_draft();
	init_lexiang_content_blocks();
	init_store();
}));
//#endregion
export { buildFileBlock as a, init_lexiang_content_blocks as c, useLexiangAddToTask as i, markMainContentMounted as n, buildKnowledgeBaseBlock as o, markMainContentUnmounted as r, buildTeamBlock as s, init_use_lexiang_add_to_task as t };
