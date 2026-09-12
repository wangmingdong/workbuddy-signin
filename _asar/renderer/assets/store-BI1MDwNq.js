import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { t as require_zustand } from "./zustand-BGHu9tpa.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/store.ts
/**
* registry 去重比较：影响后续拖拽 / 多选加任务 / 批量上传的字段任一变化都要刷新 registry。
* 仅比 id 不够——同 ID 文件可能更新了 uri/name/sessionId/size/updatedAt（重存、改名、换会话、
* 重新计算大小），下游从 fileRegistry 取完整对象时若不刷新就会拿到旧路径 / 旧文件名。
*/
function isSameRegisteredFile(a, b) {
	return a.name === b.name && a.uri === b.uri && a.sessionId === b.sessionId && a.size === b.size && a.updatedAt === b.updatedAt && a.type === b.type && a.mimeType === b.mimeType;
}
/**
* 把 files 合并进 registry：
* - 出现新文件，或已注册文件的关键字段变化 → 返回新 Map（写 store）
* - 全部未变 → 返回 null（调用方据此跳过 setState，避免 fileRegistry 订阅者无谓 re-render）
*
* 第一遍只读 + 比较（不复制 Map），确认有变化后才 `new Map` 复制，
* 让「集合 / 字段都没变」的常见路径零分配、零订阅者通知。
*/
function mergeFileRegistry(prev, files) {
	let changed = false;
	for (const f of files) {
		const old = prev.get(f.id);
		if (!old || !isSameRegisteredFile(old, f)) {
			changed = true;
			break;
		}
	}
	if (!changed) return null;
	const next = new Map(prev);
	for (const f of files) next.set(f.id, f);
	return next;
}
function useMyFilesStore(selector) {
	return (0, import_zustand.useStore)(myFilesStore, selector);
}
/**
* 工厂函数：创建独立的 myFilesStore 实例。
* 项目盘场景使用，避免和个人盘共享导航状态。
*/
function createMyFilesStore() {
	return createStore((set) => ({
		...initialState,
		setActiveTab: (tab) => set({
			activeTab: tab,
			searchKeyword: "",
			selectedFileIds: /* @__PURE__ */ new Set()
		}),
		setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
		setViewMode: (mode) => set({ viewMode: mode }),
		setFileTypeFilter: (filter) => set({ fileTypeFilter: filter }),
		setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),
		toggleFavorite: (fileId) => set((state) => {
			return { favoriteIds: state.favoriteIds.includes(fileId) ? state.favoriteIds.filter((id) => id !== fileId) : [...state.favoriteIds, fileId] };
		}),
		setFavoriteIds: (ids) => set({ favoriteIds: ids }),
		setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
		setCurrentFolderId: (folderId) => set({ currentFolderId: folderId }),
		navigateToFolder: (folderId, folderName) => set((state) => ({
			currentFolderId: folderId,
			breadcrumbs: [...state.breadcrumbs, {
				id: folderId,
				name: folderName
			}],
			searchKeyword: ""
		})),
		navigateToBreadcrumb: (index) => set((state) => {
			if (index < 0) return {
				currentFolderId: null,
				breadcrumbs: []
			};
			const newBreadcrumbs = state.breadcrumbs.slice(0, index + 1);
			return {
				currentFolderId: newBreadcrumbs[newBreadcrumbs.length - 1]?.id ?? null,
				breadcrumbs: newBreadcrumbs
			};
		}),
		setCloudFileCount: (count) => set({ cloudFileCount: count }),
		setStorageCapacity: (cap) => set({ storageCapacity: cap }),
		toggleFileSelected: (fileId) => set((state) => {
			const next = new Set(state.selectedFileIds);
			if (next.has(fileId)) next.delete(fileId);
			else next.add(fileId);
			return { selectedFileIds: next };
		}),
		clearFileSelected: () => set({ selectedFileIds: /* @__PURE__ */ new Set() }),
		registerFiles: (files) => set((state) => {
			const next = mergeFileRegistry(state.fileRegistry, files);
			return next ? { fileRegistry: next } : state;
		}),
		setPendingCloudFileView: (info) => set({ pendingCloudFileView: info }),
		triggerCloudFilesRefresh: () => set((state) => ({ cloudFilesRefreshToken: state.cloudFilesRefreshToken + 1 })),
		triggerTaskArtifactsRefresh: () => set((state) => ({ taskArtifactsRefreshToken: state.taskArtifactsRefreshToken + 1 })),
		triggerCapacityRefresh: () => set((state) => ({ capacityRefreshToken: state.capacityRefreshToken + 1 })),
		reset: () => set(initialState)
	}));
}
/**
* 加载存储容量并写入 store。
* - 每次调用都请求接口（无缓存），确保切换账号等场景下数据始终最新
* - 已有 in-flight 请求：复用同一 promise（防止并发重复请求）
* - 失败：弹 toast 提示
* - 失败后清空 promise，允许下次调用重试
*
* @param targetStore 目标 store 实例（默认全局 myFilesStore，项目盘传独立实例）
*/
function loadStorageCapacity(getClient, targetStore = myFilesStore, options) {
	if (!options?.force) {
		const existing = _capacityPromises.get(targetStore);
		if (existing) return existing;
	}
	const promise = (async () => {
		try {
			const cap = await getClient().dir.spaceCapacity();
			targetStore.getState().setStorageCapacity({
				total: cap.total,
				used: cap.used,
				composition: cap.composition ?? null
			});
			targetStore.setState({ storageCapacityError: false });
		} catch (err) {
			console.error("[NetDrive] loadCapacity: 失败:", err);
			targetStore.setState({ storageCapacityError: true });
			const msg = err?.message || t("myFiles.error.capacityFailed");
			toast.error(msg);
		}
	})().finally(() => {
		_capacityPromises.delete(targetStore);
	});
	_capacityPromises.set(targetStore, promise);
	return promise;
}
/**
* 预取云端文件根目录的文件数量，写入 store.cloudFileCount。
* - 已有数据（cloudFileCountLoaded）：立即跳过
* - 已有 in-flight 请求：复用同一 promise
* - 失败后静默（不影响 UI，badge 保持 0）
*
* 当 FileListView 真正挂载后会用精确数据覆写 cloudFileCount，
* 这里只是为了在未切换 tab 时提前给出一个大致数量。
*/
function loadCloudFileCount(getClient) {
	if (myFilesStore.getState().cloudFileCountLoaded) return Promise.resolve();
	if (_countPromise) return _countPromise;
	_countPromise = (async () => {
		if (myFilesStore.getState().cloudFileCountLoaded) return;
		try {
			const result = await getClient().dir.list({
				parentID: "",
				limit: 20,
				cursor: ""
			});
			if (!myFilesStore.getState().cloudFileCountLoaded) myFilesStore.setState({
				cloudFileCount: result.totalNum ?? result.entries.length,
				cloudFileCountLoaded: true
			});
		} catch (err) {
			console.error("[loadCloudFileCount] 预取文件数量失败:", err);
		}
	})().finally(() => {
		_countPromise = null;
	});
	return _countPromise;
}
var import_zustand, initialState, myFilesStore, _capacityPromises, _countPromise;
var init_store = __esmMin((() => {
	init_src();
	import_zustand = require_zustand();
	init_vanilla();
	init_i18n();
	initialState = {
		activeTab: "taskArtifacts",
		searchKeyword: "",
		viewMode: "list",
		fileTypeFilter: "all",
		showFavoritesOnly: false,
		favoriteIds: [],
		breadcrumbs: [],
		currentFolderId: null,
		cloudFileCount: 0,
		cloudFileCountLoaded: false,
		storageCapacity: null,
		storageCapacityError: false,
		selectedFileIds: /* @__PURE__ */ new Set(),
		fileRegistry: /* @__PURE__ */ new Map(),
		pendingCloudFileView: null,
		cloudFilesRefreshToken: 0,
		taskArtifactsRefreshToken: 0,
		capacityRefreshToken: 0
	};
	myFilesStore = createStore((set) => ({
		...initialState,
		setActiveTab: (tab) => set({
			activeTab: tab,
			searchKeyword: "",
			selectedFileIds: /* @__PURE__ */ new Set()
		}),
		setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
		setViewMode: (mode) => set({ viewMode: mode }),
		setFileTypeFilter: (filter) => set({ fileTypeFilter: filter }),
		setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),
		toggleFavorite: (fileId) => set((state) => {
			return { favoriteIds: state.favoriteIds.includes(fileId) ? state.favoriteIds.filter((id) => id !== fileId) : [...state.favoriteIds, fileId] };
		}),
		setFavoriteIds: (ids) => set({ favoriteIds: ids }),
		setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
		setCurrentFolderId: (folderId) => set({ currentFolderId: folderId }),
		navigateToFolder: (folderId, folderName) => set((state) => ({
			currentFolderId: folderId,
			breadcrumbs: [...state.breadcrumbs, {
				id: folderId,
				name: folderName
			}],
			searchKeyword: ""
		})),
		navigateToBreadcrumb: (index) => set((state) => {
			if (index < 0) return {
				currentFolderId: null,
				breadcrumbs: []
			};
			const newBreadcrumbs = state.breadcrumbs.slice(0, index + 1);
			return {
				currentFolderId: newBreadcrumbs[newBreadcrumbs.length - 1]?.id ?? null,
				breadcrumbs: newBreadcrumbs
			};
		}),
		setCloudFileCount: (count) => set({ cloudFileCount: count }),
		setStorageCapacity: (cap) => set({ storageCapacity: cap }),
		toggleFileSelected: (fileId) => set((state) => {
			const next = new Set(state.selectedFileIds);
			if (next.has(fileId)) next.delete(fileId);
			else next.add(fileId);
			return { selectedFileIds: next };
		}),
		clearFileSelected: () => set({ selectedFileIds: /* @__PURE__ */ new Set() }),
		registerFiles: (files) => set((state) => {
			const next = mergeFileRegistry(state.fileRegistry, files);
			return next ? { fileRegistry: next } : state;
		}),
		setPendingCloudFileView: (info) => set({ pendingCloudFileView: info }),
		triggerCloudFilesRefresh: () => set((state) => ({ cloudFilesRefreshToken: state.cloudFilesRefreshToken + 1 })),
		triggerTaskArtifactsRefresh: () => set((state) => ({ taskArtifactsRefreshToken: state.taskArtifactsRefreshToken + 1 })),
		triggerCapacityRefresh: () => set((state) => ({ capacityRefreshToken: state.capacityRefreshToken + 1 })),
		reset: () => set(initialState)
	}));
	_capacityPromises = /* @__PURE__ */ new WeakMap();
	_countPromise = null;
}));
//#endregion
export { myFilesStore as a, loadStorageCapacity as i, init_store as n, useMyFilesStore as o, loadCloudFileCount as r, createMyFilesStore as t };
