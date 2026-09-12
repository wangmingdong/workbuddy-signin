import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Gs as createPhraseBlock, Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { b as isWorkBuddyDesktop, p as init_environment } from "./environment-DKqg3f0G.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
import { a as myFilesStore, i as loadStorageCapacity, n as init_store } from "./store-BI1MDwNq.js";
import { bt as createProductFeatureHook, xt as init_create_product_feature_hook } from "./product-features-N4Z0q4SS.js";
import { a as getNetDriveAppId, o as init_netdrive_service, s as netDriveServiceStore } from "./netdrive-service-B_rY4sKl.js";
import { a as isSpaceLimitError, c as showStorageUpgradeToast, i as init_space_utils, o as isStorageFullError, t as buildSpaceLimitMessage } from "./space-utils-DyQDtFfF.js";
//#region ../../packages/agent-ui/src/hooks/use-tencent-netdrive-knowledge-feature.ts
/**
* 获取腾讯网盘知识库功能开关状态
*
* - WorkBuddy Desktop：以远端 TencentNetDriveKnowledge 配置为准（默认关闭）
* - Web 端：直接返回 true，由前端入口自身（如项目会话判定、知识库总开关）控制可见性
*
* @returns true 表示当前环境下网盘相关入口可见
*/
function useTencentNetDriveKnowledgeFeature() {
	const remoteEnabled = feature.useFeature() ?? false;
	if (!isWorkBuddyDesktop()) return true;
	return remoteEnabled;
}
var feature, resetTencentNetDriveKnowledgeFeatureCache;
var init_use_tencent_netdrive_knowledge_feature = __esmMin((() => {
	init_environment();
	init_create_product_feature_hook();
	feature = createProductFeatureHook({
		featureKey: "TencentNetDriveKnowledge",
		resolve: (features) => features.TencentNetDriveKnowledge === true,
		disableDelayMs: 2500
	});
	resetTencentNetDriveKnowledgeFeatureCache = feature.resetFeatureCache;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/cloud-files/upload-queue-store.ts
/** 识别 SDK 透传的「同名冲突」错误（retcode 329119 / code 标识 / 文本兜底） */
function isConflictError(err) {
	if (err?.code === "SameNameDirectoryOrFileExists" || err?.code === "SameNameExist") return true;
	if (err?.code === 329119) return true;
	if (err?.retcode === 329119 || err?.data?.retcode === 329119) return true;
	const msg = (err?.message ?? "").toLowerCase();
	return msg.includes("同名") || msg.includes("conflict") || msg.includes("exist");
}
function createUploadQueueStore(options) {
	const { netDriveStore, capacityStore, idPrefix, logTag, refreshCapacityOnReset = false, isProject = false, getIsIOA } = options;
	const resolveIsIOA = () => getIsIOA?.() ?? false;
	let _uploadIdCounter = 0;
	let _batchIdCounter = 0;
	const _abortControllers = /* @__PURE__ */ new Map();
	/**
	* [issue-66649 后续] 尚未回调的 addFiles 批次登记表（batchId → PendingBatch）。
	*
	* 生命周期：`addFiles` 传 onBatchComplete 时登记；每次 items 状态变化后
	* `flushCompletedBatches` 检查是否全部达到终态，达到则触发 onComplete 并从表移除。
	* `reset` / `cancelUpload` 属于"用户主动清空"语义，会直接 clear() 表**不触发**任何回调。
	*/
	const _pendingBatches = /* @__PURE__ */ new Map();
	/** 刷新容量条（上传/取消/空间不足后用，让顶部容量条立即反映最新已用值） */
	const refreshCapacity = () => {
		loadStorageCapacity(() => netDriveStore.getState().getClient(), capacityStore, { force: true }).catch(() => {});
	};
	return createStore((set, get) => {
		/**
		* [issue-66649 后续] 判定 item 是否已达终态。
		* conflict / pending / uploading 都**不是**终态：
		* - conflict 挂起等 resolveConflict / resolveAllConflicts 才继续
		* - pending / uploading 仍在 startUpload 循环内
		* skip 语义在 store 里表现为"从 queue 移除"，不需要在这里判断（下方
		* flushCompletedBatches 通过 outstanding=0 判定）。
		*/
		const isFinalState = (s) => s === "success" || s === "error" || s === "cancelled";
		/**
		* [issue-66649 后续] 检查所有 pending 批次是否已全部达到终态，达到则触发一次 onComplete。
		*
		* 触发时机（必须覆盖）：
		* - `startUpload` 每轮 Promise.all 结束后 + finally 兜底一次
		* - `resolveConflict` / `resolveAllConflicts`：conflict → success/skip 后
		* - `removeItem`：可能是 conflict 项被移除，也可能是唯一 pending 被移除
		*
		* **不触发**：`reset` / `cancelUpload`（用户主动清空 = 未完成，直接 drop）。
		*
		* 判定规则：
		* - outstanding = 本批中还在 queue 且状态非终态的 items 数量
		* - skipped   = 本批总数 - 当前仍在 queue 的本批 items 数量（skip 后 item 已被移除）
		* - outstanding=0 说明本批已尘埃落定 → 触发 onComplete 并从 _pendingBatches 移除
		*/
		const flushCompletedBatches = () => {
			if (_pendingBatches.size === 0) return;
			const currentQueue = get().queue;
			const doneBatches = [];
			for (const [batchId, batch] of _pendingBatches) {
				const stillInQueue = currentQueue.filter((q) => batch.itemIds.has(q.id));
				if (stillInQueue.filter((q) => !isFinalState(q.status)).length > 0) continue;
				const success = stillInQueue.filter((q) => q.status === "success").length;
				const failed = stillInQueue.filter((q) => q.status === "error" || q.status === "cancelled").length;
				const skipped = batch.total - stillInQueue.length;
				doneBatches.push([
					batchId,
					batch,
					{
						total: batch.total,
						success,
						failed,
						skipped,
						itemIds: [...batch.itemIds]
					}
				]);
			}
			for (const [batchId] of doneBatches) _pendingBatches.delete(batchId);
			for (const [, batch, result] of doneBatches) try {
				batch.onComplete(result);
			} catch (err) {
				console.error(`${logTag} onBatchComplete 回调抛错:`, err);
			}
		};
		const uploadSingleFile = async (item, targetFolderId, strategy) => {
			const ac = new AbortController();
			_abortControllers.set(item.id, ac);
			set((s) => ({ queue: s.queue.map((q) => q.id === item.id ? {
				...q,
				status: "uploading"
			} : q) }));
			try {
				const uploadResult = await netDriveStore.getState().getClient().file.upload(item.file, {
					folderId: targetFolderId || void 0,
					appId: getNetDriveAppId(netDriveStore),
					signal: ac.signal,
					onProgress: (p) => {
						const total = p.total > 0 ? p.total : item.size;
						const loaded = Math.min(p.loaded, total);
						const pct = total === 0 ? 0 : Math.round(loaded / total * 100);
						set((s) => ({ queue: s.queue.map((q) => q.id === item.id ? {
							...q,
							progress: pct,
							loadedBytes: loaded,
							totalBytes: total
						} : q) }));
					},
					conflictResolutionStrategy: strategy ?? "ask"
				});
				const uploadedFileId = uploadResult?.fileID || uploadResult?.fileId || "";
				set((s) => ({ queue: s.queue.map((q) => q.id === item.id ? {
					...q,
					status: "success",
					progress: 100,
					loadedBytes: item.size,
					totalBytes: item.size,
					uploadedFileId
				} : q) }));
				return true;
			} catch (err) {
				if (err?.name === "AbortError" || ac.signal.aborted) {
					set((s) => ({ queue: s.queue.map((q) => q.id === item.id ? {
						...q,
						status: "cancelled"
					} : q) }));
					return false;
				}
				if (isConflictError(err)) {
					const info = {
						fileId: err?.data?.fileId || err?.data?.fileID,
						lastModifiedBy: err?.data?.lastModifiedBy,
						lastModifiedAt: err?.data?.lastModifiedAt || err?.data?.modifiedTime
					};
					set((s) => ({ queue: s.queue.map((q) => q.id === item.id ? {
						...q,
						status: "conflict",
						conflictFileId: info.fileId || "",
						conflictInfo: info
					} : q) }));
					return false;
				}
				if (isSpaceLimitError(err)) {
					console.warn(`${logTag} 上传失败：检测到空间不足类错误，整批中止`, err);
					_abortControllers.forEach((c) => c.abort());
					_abortControllers.clear();
					_pendingBatches.clear();
					set({
						queue: [],
						isUploading: false,
						showProgress: false,
						skippedCount: 0
					});
					if (isStorageFullError(err) && !resolveIsIOA()) showStorageUpgradeToast();
					else toast.error(buildSpaceLimitMessage(err, capacityStore, isProject));
					refreshCapacity();
					return false;
				}
				console.error(`${logTag} 上传文件失败:`, err);
				const errMsg = err?.message ?? t("myFiles.upload.failed");
				set((s) => ({ queue: s.queue.map((q) => q.id === item.id ? {
					...q,
					status: "error",
					error: errMsg
				} : q) }));
				if (!err?._sdkToasted) toast.error(t("myFiles.upload.failedWithName", {
					name: item.fileName,
					error: errMsg
				}));
				return false;
			} finally {
				_abortControllers.delete(item.id);
			}
		};
		return {
			queue: [],
			isUploading: false,
			showProgress: false,
			skippedCount: 0,
			addFiles: (files, dirPath, targetFolderId, batchOptions) => {
				const batchId = `${idPrefix}-b${++_batchIdCounter}-${Math.random().toString(36).slice(2, 7)}`;
				const items = files.map((f) => ({
					id: `${idPrefix}-${++_uploadIdCounter}-${Math.random().toString(36).slice(2, 7)}`,
					file: f,
					fileName: f.name,
					size: f.size,
					status: "pending",
					progress: 0,
					loadedBytes: 0,
					totalBytes: f.size,
					dirPath,
					targetFolderId,
					batchId
				}));
				set((s) => ({
					queue: [...s.queue, ...items],
					showProgress: true,
					skippedCount: 0
				}));
				if (batchOptions?.onBatchComplete) _pendingBatches.set(batchId, {
					total: files.length,
					itemIds: new Set(items.map((it) => it.id)),
					onComplete: batchOptions.onBatchComplete
				});
				return batchId;
			},
			startUpload: async (targetFolderId) => {
				if (get().isUploading) return false;
				set({ isUploading: true });
				try {
					let round = 0;
					let totalSuccess = 0;
					let totalTried = 0;
					while (true) {
						const pending = get().queue.filter((q) => q.status === "pending");
						if (pending.length === 0) {
							if (round === 0) return false;
							break;
						}
						round++;
						const results = await Promise.all(pending.map((item) => uploadSingleFile(item, item.targetFolderId ?? targetFolderId)));
						const roundSuccess = results.filter(Boolean).length;
						totalSuccess += roundSuccess;
						totalTried += results.length;
						flushCompletedBatches();
					}
					return totalTried > 0 && totalSuccess === totalTried;
				} finally {
					set({ isUploading: false });
					refreshCapacity();
					flushCompletedBatches();
				}
			},
			removeItem: (id) => {
				_abortControllers.get(id)?.abort();
				set((s) => ({ queue: s.queue.filter((q) => q.id !== id) }));
				flushCompletedBatches();
			},
			clearCompleted: () => {
				set((s) => ({ queue: s.queue.filter((q) => q.status !== "success") }));
				flushCompletedBatches();
			},
			reset: () => {
				_abortControllers.forEach((c) => c.abort());
				_abortControllers.clear();
				_pendingBatches.clear();
				set({
					queue: [],
					isUploading: false,
					showProgress: false,
					skippedCount: 0
				});
				if (refreshCapacityOnReset) refreshCapacity();
			},
			resolveConflict: async (id, action, targetFolderId) => {
				const item = get().queue.find((q) => q.id === id);
				if (!item) return;
				if (action === "skip") {
					set((s) => ({
						queue: s.queue.filter((q) => q.id !== id),
						skippedCount: s.skippedCount + 1
					}));
					flushCompletedBatches();
					return;
				}
				const strategy = action === "overwrite" ? "overwrite" : "rename";
				set((s) => ({ queue: s.queue.map((q) => q.id === id ? {
					...q,
					status: "pending"
				} : q) }));
				await uploadSingleFile(item, item.targetFolderId ?? targetFolderId, strategy);
				flushCompletedBatches();
			},
			resolveAllConflicts: async (action, targetFolderId) => {
				const conflicts = get().queue.filter((q) => q.status === "conflict");
				if (conflicts.length === 0) return;
				const ids = new Set(conflicts.map((c) => c.id));
				if (action === "skip") {
					set((s) => ({
						queue: s.queue.filter((q) => !ids.has(q.id)),
						skippedCount: s.skippedCount + ids.size
					}));
					flushCompletedBatches();
					return;
				}
				const strategy = action === "overwrite" ? "overwrite" : "rename";
				set((s) => ({ queue: s.queue.map((q) => ids.has(q.id) ? {
					...q,
					status: "pending"
				} : q) }));
				await Promise.all(conflicts.map((item) => uploadSingleFile(item, item.targetFolderId ?? targetFolderId, strategy)));
				flushCompletedBatches();
			},
			cancelUpload: () => {
				_abortControllers.forEach((c) => {
					c.abort();
				});
				_abortControllers.clear();
				_pendingBatches.clear();
				set({
					queue: [],
					isUploading: false,
					showProgress: false,
					skippedCount: 0
				});
			}
		};
	});
}
var init_upload_queue_store = __esmMin((() => {
	init_src();
	init_vanilla();
	init_i18n();
	init_netdrive_service();
	init_store();
	init_space_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/netdrive-store-context.tsx
function getGlobalFallback() {
	if (!_globalFallback) _globalFallback = {
		netDriveStore: netDriveServiceStore,
		filesStore: myFilesStore
	};
	return _globalFallback;
}
/**
* 获取当前 context 中的 store 实例。
* 如果没有 Provider 包裹，返回全局默认实例。
*/
function useNetDriveContext() {
	const ctx = (0, import_react.useContext)(NetDriveStoreContext);
	if (ctx) return ctx;
	return getGlobalFallback();
}
var import_react, import_jsx_runtime, NetDriveStoreContext, _globalFallback, NetDriveStoreProvider;
var init_netdrive_store_context = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_netdrive_service();
	init_store();
	import_jsx_runtime = require_jsx_runtime();
	NetDriveStoreContext = (0, import_react.createContext)(null);
	_globalFallback = null;
	NetDriveStoreProvider = ({ value, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetDriveStoreContext.Provider, {
		value,
		children
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/utils/netdrive-block-utils.ts
/** 从文件名中提取扩展名（不含前导点），如 "report.docx" → "docx" */
function getExtFromName(name) {
	const idx = name.lastIndexOf(".");
	return idx > 0 ? name.slice(idx + 1).toLowerCase() : "";
}
/** 扩展名 → fileType 映射（与列表页 inferTypeFromExt 完全一致） */
function getFileType(ext) {
	if (!ext) return "other";
	const e = ext.toLowerCase();
	if ([
		"doc",
		"docx",
		"dot",
		"dotx",
		"docm",
		"dotm",
		"wps",
		"wpt",
		"txt",
		"rtf",
		"odt"
	].includes(e)) return "doc";
	if ([
		"ppt",
		"pptx",
		"pot",
		"potx",
		"pps",
		"ppsx",
		"pptm",
		"potm",
		"ppsm",
		"dps",
		"dpt",
		"key",
		"odp"
	].includes(e)) return "slide";
	if (e === "pdf") return "pdf";
	if ([
		"xls",
		"xlsx",
		"xlt",
		"xltx",
		"xlsm",
		"xltm",
		"xlsb",
		"csv",
		"ods",
		"et",
		"ett",
		"ets"
	].includes(e)) return "sheet";
	if (["md", "markdown"].includes(e)) return "markdown";
	if (["html", "htm"].includes(e)) return "website";
	if ([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg",
		"bmp",
		"ico",
		"tiff",
		"tif",
		"heic",
		"avif"
	].includes(e)) return "image";
	if ([
		"mp4",
		"mov",
		"avi",
		"mkv",
		"webm",
		"wmv",
		"flv",
		"m4v",
		"3gp"
	].includes(e)) return "video";
	if ([
		"mp3",
		"wav",
		"flac",
		"aac",
		"ogg",
		"wma",
		"m4a",
		"opus"
	].includes(e)) return "audio";
	if ([
		"ts",
		"tsx",
		"js",
		"jsx",
		"mjs",
		"cjs",
		"py",
		"go",
		"java",
		"c",
		"cpp",
		"h",
		"hpp",
		"cs",
		"rs",
		"rb",
		"swift",
		"kt",
		"kts",
		"scala",
		"php",
		"vue",
		"svelte",
		"css",
		"scss",
		"less",
		"sass",
		"json",
		"yaml",
		"yml",
		"toml",
		"ini",
		"xml",
		"sh",
		"bash",
		"zsh",
		"bat",
		"cmd",
		"ps1",
		"sql",
		"r",
		"lua",
		"perl",
		"pl",
		"asm",
		"s",
		"asp",
		"bas",
		"prg",
		"makefile",
		"dockerfile",
		"cmake",
		"log",
		"conf",
		"cfg",
		"env",
		"lrc"
	].includes(e)) return "code";
	if ([
		"zip",
		"rar",
		"7z",
		"tar",
		"gz",
		"bz2",
		"xz",
		"tgz",
		"dmg",
		"iso",
		"pkg",
		"deb",
		"rpm"
	].includes(e)) return "archive";
	return "other";
}
/**
* 将网盘文件/文件夹信息转为统一的 ContentBlock（resource_link phraseBlock）。
*
* 各入口（@ mention、资产弹窗、活动面板、个人网盘选择器、my-files 列表）
* 都应调用此函数，确保 meta 字段结构一致，下游（发送/展示）无需分别适配。
*
* **关键约定**：
* - URI = `netdrive://{fileName}`（只用文件名，不含目录前缀）
*   沙箱侧 localizeResourceLinkBlock 会把它改写成 `file:///root/library/{fileName}`，
*   带目录会污染沙箱可见路径，且寻址完全依赖 meta.fileId 不需要路径。
* - meta.filePath 仍保留入参里的完整路径，仅作展示/审计用。
* - 主进程取 fileId 时**只信任** `meta.fileId`，所以这里必须把网盘真正的
*   fileId 写进 meta，不能省略。
*/
function createNetDriveFileBlock(params) {
	const { fileName, filePath, fileId, fileSize = 0, isFolder = false, source = "personal", description } = params;
	const ext = params.extension || getExtFromName(fileName);
	const fileType = getFileType(ext);
	const uri = `netdrive://${fileName}`;
	const itemType = isFolder ? "folder" : "file";
	return createPhraseBlock(fileName, uri, {
		title: fileName,
		icon: isFolder ? "folder" : "netdrive",
		description: description || (isFolder ? "文件夹" : filePath),
		meta: {
			displayAsContext: false,
			displayAsPhrase: true,
			displayText: fileName,
			extension: ext,
			fileId,
			fileName,
			filePath,
			fileSize,
			fileType,
			icon: isFolder ? "folder" : "netdrive",
			isFolder,
			itemType,
			mentionType: itemType,
			path: filePath,
			source,
			timestamp: Date.now(),
			title: fileName,
			type: itemType,
			url: uri
		}
	});
}
var init_netdrive_block_utils = __esmMin((() => {
	init_src();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/cloud-file-constants.ts
var init_cloud_file_constants = __esmMin((() => {}));
//#endregion
export { init_netdrive_block_utils as a, useNetDriveContext as c, init_use_tencent_netdrive_knowledge_feature as d, resetTencentNetDriveKnowledgeFeatureCache as f, getFileType as i, createUploadQueueStore as l, createNetDriveFileBlock as n, NetDriveStoreProvider as o, useTencentNetDriveKnowledgeFeature as p, getExtFromName as r, init_netdrive_store_context as s, init_cloud_file_constants as t, init_upload_queue_store as u };
