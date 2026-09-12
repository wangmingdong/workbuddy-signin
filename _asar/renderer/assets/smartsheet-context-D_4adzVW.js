import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
//#region ../../packages/agent-ui/src/modules/smart-sheet/context/smartsheet-context.ts
var smartsheet_context_exports = /* @__PURE__ */ __exportAll({ SmartsheetContext: () => SmartsheetContext });
var DEFAULT_WARMUP_TABLES, SmartsheetContext;
var init_smartsheet_context = __esmMin((() => {
	DEFAULT_WARMUP_TABLES = ["todos"];
	SmartsheetContext = class {
		constructor(options) {
			this.tableNameToId = /* @__PURE__ */ new Map();
			this.fieldNameToId = /* @__PURE__ */ new Map();
			this.viewNameToId = /* @__PURE__ */ new Map();
			this.viewGroupNameToId = /* @__PURE__ */ new Map();
			this.viewGroupOrderByTable = /* @__PURE__ */ new Map();
			this.core = options.core;
			this.warmUpTables = options.warmUpTables ?? DEFAULT_WARMUP_TABLES;
		}
		/**
		* 预热缓存：
		* 1. 从 core 已加载的 block 列表填充 table 映射
		* 2. 对 `warmUpTables` 中每张表，加载首 chunk 后扫描 viewGroup 列表写入缓存
		*
		* 建议在 core.ready 完成后调用一次。重复调用安全（幂等）。
		*/
		async warmUp() {
			await this.core.ready;
			const list = this.core.getTableList();
			for (const item of list) this.tableNameToId.set(item.title.toLowerCase(), item.blockId);
			await Promise.all(this.warmUpTables.map((name) => this.loadViewGroupsForTable(name)));
		}
		/** 清除全部缓存 */
		clearCache() {
			this.tableNameToId.clear();
			this.fieldNameToId.clear();
			this.viewNameToId.clear();
			this.viewGroupNameToId.clear();
			this.viewGroupOrderByTable.clear();
		}
		/** 清除指定 tableId 关联的 field / view / viewGroup 缓存 */
		clearTableCache(tableId) {
			const prefix = `${tableId}:`;
			for (const key of this.fieldNameToId.keys()) if (key.startsWith(prefix)) this.fieldNameToId.delete(key);
			for (const key of this.viewNameToId.keys()) if (key.startsWith(prefix)) this.viewNameToId.delete(key);
			for (const key of this.viewGroupNameToId.keys()) if (key.startsWith(prefix)) this.viewGroupNameToId.delete(key);
			this.viewGroupOrderByTable.delete(tableId);
		}
		/** 同步读取 table 缓存 */
		getTableIdByNameCached(name) {
			return this.tableNameToId.get(name.toLowerCase());
		}
		/**
		* 根据子表名称获取 blockId。
		* 优先读缓存；未命中时调用 core.getTableByName 查询并写入缓存。
		*/
		async getTableIdByName(name) {
			const cached = this.getTableIdByNameCached(name);
			if (cached) return cached;
			try {
				const table = await this.core.getTableByName(name);
				if (table) {
					this.tableNameToId.set(name.toLowerCase(), table.id);
					return table.id;
				}
			} catch {}
		}
		/** 同步读取 field 缓存 */
		getFieldIdByNameCached(tableId, fieldName) {
			return this.fieldNameToId.get(`${tableId}:${fieldName.toLowerCase()}`);
		}
		/**
		* 根据 field 名称获取 fieldId。
		* 优先读缓存；未命中时通过 core 加载 table 并遍历 field 列表查询。
		*
		* 走 `getTableForRenderByBlockId`（首片即可）：field 元信息随首片应用后即可读，
		* 避免在 cache miss 时退化成"等所有 body 分片拉完"的全量加载拖慢首屏。
		*/
		async getFieldIdByName(tableId, fieldName) {
			const cacheKey = `${tableId}:${fieldName.toLowerCase()}`;
			const cached = this.fieldNameToId.get(cacheKey);
			if (cached) return cached;
			const table = await this.core.getTableForRenderByBlockId(tableId);
			if (!table) return;
			const fields = this.extractFieldsFromTable(table);
			for (const field of fields) if ((field.name || field.title || "").toLowerCase() === fieldName.toLowerCase()) {
				this.fieldNameToId.set(cacheKey, field.id);
				return field.id;
			}
		}
		/** 同步读取 view 缓存 */
		getViewIdByNameCached(tableId, viewName) {
			return this.viewNameToId.get(`${tableId}:${viewName.toLowerCase()}`);
		}
		/**
		* 根据 view 名称获取 viewId。
		* 优先读缓存；未命中时通过 core 加载 table 并遍历 view 列表查询。
		*
		* 走 `getTableForRenderByBlockId`（首片即可）：view 元信息随首片应用后即可读，
		* 避免在 cache miss 时退化成"等所有 body 分片拉完"的全量加载拖慢首屏。
		*/
		async getViewIdByName(tableId, viewName) {
			const cacheKey = `${tableId}:${viewName.toLowerCase()}`;
			const cached = this.viewNameToId.get(cacheKey);
			if (cached) return cached;
			const table = await this.core.getTableForRenderByBlockId(tableId);
			if (!table) return;
			const views = table.getAllVisibleViews();
			for (const view of views) if (String(view.title ?? "").toLowerCase() === viewName.toLowerCase()) {
				this.viewNameToId.set(cacheKey, view.id);
				return view.id;
			}
		}
		/** 同步读取 viewGroup 缓存（按 name） */
		getViewGroupIdByNameCached(tableId, vgName) {
			return this.viewGroupNameToId.get(`${tableId}:${vgName.toLowerCase()}`);
		}
		/**
		* 根据 viewGroup 名称获取 viewGroupId。
		* 优先读缓存；未命中时通过 core 加载 table 并扫描 viewGroup 列表（自动写入缓存）。
		*/
		async getViewGroupIdByName(tableId, vgName) {
			const cacheKey = `${tableId}:${vgName.toLowerCase()}`;
			const cached = this.viewGroupNameToId.get(cacheKey);
			if (cached) return cached;
			await this.loadViewGroupsForTableId(tableId);
			return this.viewGroupNameToId.get(cacheKey);
		}
		/**
		* 取指定 tableId 当前缓存的 viewGroup 顺序快照（含 id + 解析后的 name）。
		*
		* UI 默认选中"第一个 viewGroup"等顺序场景用本方法（同步），不需要 await。
		* 缓存未命中（warmUp 未执行 / table 未加载）时返回空数组，由调用方显式
		* `await loadViewGroupsForTableId(tableId)` 后再读。
		*/
		getViewGroupOrderCached(tableId) {
			return (this.viewGroupOrderByTable.get(tableId) ?? []).map((g) => ({
				id: g.id,
				name: (g.title ?? g.name ?? "").toString()
			}));
		}
		/**
		* 强制刷新指定 tableId 的 viewGroup 缓存。
		*
		* 通常用在 createViewGroup / deleteViewGroup / renameViewGroup 之后—— mutation
		* 写入后 xtable model 同步更新，但 context 自己的 name→id 映射需要重新扫描。
		*/
		async refreshViewGroupsForTable(tableId) {
			await this.loadViewGroupsForTableId(tableId);
		}
		/** 从 ITable 对象中提取 field 元信息列表（兼容多种 xtable-core 内部 API） */
		extractFieldsFromTable(table) {
			const t = table;
			if (typeof t.getFieldMetaList === "function") return t.getFieldMetaList() ?? [];
			if (typeof t.getFields === "function") return t.getFields() ?? [];
			if (Array.isArray(t.fieldMetaList)) return t.fieldMetaList;
			return [];
		}
		/** 从 ITable 对象中提取 viewGroup 列表 */
		extractViewGroupsFromTable(table) {
			return table.getViewGroups() ?? [];
		}
		/** 通过 table title 触发一次 viewGroup 缓存填充；找不到表静默忽略 */
		async loadViewGroupsForTable(tableName) {
			const tableId = await this.getTableIdByName(tableName);
			if (!tableId) return;
			await this.loadViewGroupsForTableId(tableId);
		}
		/**
		* 通过 tableId 加载并写入 viewGroup name→id 缓存 + 顺序快照
		*
		* 走 `getTableForRenderByBlockId`（首片即可）：viewGroup 元信息随首片应用后
		* 即可读，避免 `getTableByBlockId` 在 ensureReady 路径上退化成"等所有 body
		* 分片拉完"的全量加载——这是首屏渲染被卡到第二次 /plan/sheet/get 完成的根因。
		*
		* 错误传播（关键）：加载抛错时**不吞**——沿 `warmUp` → `ensureReady` →
		* board mount 的 try/catch 冒上去，让 board 立刻显示错误占位（首屏 sheet/get
		* 失败场景）。此前这里 `try/catch { return }` 静默返回会让 warmUp 成功 resolve、
		* 后续 view-renderer 再次触发一遍 startBackgroundLoad 走 3×3s 重试，用户看到
		* 的是**永久转圈直到第二遍重试也失败**。
		*/
		async loadViewGroupsForTableId(tableId) {
			const table = await this.core.getTableForRenderByBlockId(tableId);
			if (!table) return;
			const groups = this.extractViewGroupsFromTable(table);
			const prefix = `${tableId}:`;
			for (const key of this.viewGroupNameToId.keys()) if (key.startsWith(prefix)) this.viewGroupNameToId.delete(key);
			for (const g of groups) {
				const rawName = (g.title ?? g.name ?? "").toString();
				if (!rawName || !g.id) continue;
				this.viewGroupNameToId.set(`${tableId}:${rawName.toLowerCase()}`, g.id);
			}
			this.viewGroupOrderByTable.set(tableId, groups);
		}
	};
}));
//#endregion
export { smartsheet_context_exports as n, init_smartsheet_context as t };
