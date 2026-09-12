import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { _t as useAccount, t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { n as isIOAUser, t as init_account } from "./account-BDHahT9K.js";
import { a as getNetDriveAppId, o as init_netdrive_service, s as netDriveServiceStore } from "./netdrive-service-B_rY4sKl.js";
import { c as showStorageUpgradeToast, i as init_space_utils, o as isStorageFullError } from "./space-utils-DyQDtFfF.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/hooks/use-upload-queue.ts
/** 安全 decode 文件名：如果是 URI 编码的则 decode，否则原样返回 */
function safeDecodeFileName(name) {
	if (!name || !name.includes("%")) return name;
	try {
		return decodeURIComponent(name);
	} catch {
		return name;
	}
}
/** 读取上次上传的目标目录 */
function getLastUploadFolder() {
	try {
		const id = localStorage.getItem(LAST_UPLOAD_FOLDER_ID_KEY);
		const name = localStorage.getItem(LAST_UPLOAD_FOLDER_NAME_KEY);
		if (id && name) return {
			id,
			name
		};
		return null;
	} catch {
		return null;
	}
}
/** 保存上次上传的目标目录 */
function setLastUploadFolder(id, name) {
	try {
		localStorage.setItem(LAST_UPLOAD_FOLDER_ID_KEY, id);
		localStorage.setItem(LAST_UPLOAD_FOLDER_NAME_KEY, name);
	} catch {}
}
function uploadQueueReducer(state, action) {
	switch (action.type) {
		case "ADD_FILES": return [...state, ...action.items];
		case "UPDATE_PROGRESS": return state.map((item) => item.id === action.id ? {
			...item,
			progress: action.progress,
			loadedBytes: action.loadedBytes,
			totalBytes: action.totalBytes
		} : item);
		case "SET_STATUS": return state.map((item) => item.id === action.id ? {
			...item,
			status: action.status,
			error: action.error,
			uploadedFileId: action.uploadedFileId ?? item.uploadedFileId
		} : item);
		case "SET_CONFLICT": return state.map((item) => item.id === action.id ? {
			...item,
			status: "conflict",
			conflictFileId: action.conflictFileId,
			conflictInfo: action.conflictInfo
		} : item);
		case "REMOVE": return state.filter((item) => item.id !== action.id);
		case "CLEAR_COMPLETED": return state.filter((item) => item.status !== "success");
		case "RESET": return [];
		default: return state;
	}
}
function useUploadQueue({ targetFolderId, onUploadComplete, netDriveStore: storeOverride }) {
	const store = storeOverride ?? netDriveServiceStore;
	const t = useTranslation();
	const { account } = useAccount();
	const isIOA = isIOAUser(account?.enterpriseId ?? "");
	const [queue, dispatch] = (0, import_react.useReducer)(uploadQueueReducer, []);
	const isUploadingRef = (0, import_react.useRef)(false);
	const abortControllersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const queueRef = (0, import_react.useRef)([]);
	queueRef.current = queue;
	const hasUploadedAnyRef = (0, import_react.useRef)(false);
	const pendingCompleteCallbackRef = (0, import_react.useRef)(false);
	const onUploadCompleteRef = (0, import_react.useRef)(onUploadComplete);
	onUploadCompleteRef.current = onUploadComplete;
	const generateId = (0, import_react.useCallback)(() => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, []);
	const addFiles = (0, import_react.useCallback)((files) => {
		const newItems = files.map((file) => {
			const decodedName = safeDecodeFileName(file.name);
			const actualFile = decodedName !== file.name ? new File([file], decodedName, {
				type: file.type,
				lastModified: file.lastModified
			}) : file;
			return {
				id: generateId(),
				file: actualFile,
				fileName: decodedName,
				size: actualFile.size,
				status: "pending",
				progress: 0,
				loadedBytes: 0,
				totalBytes: actualFile.size
			};
		});
		dispatch({
			type: "ADD_FILES",
			items: newItems
		});
		queueRef.current = [...queueRef.current, ...newItems];
	}, [generateId]);
	const isConflictError = (0, import_react.useCallback)((err) => {
		if (err?.code === "SameNameDirectoryOrFileExists" || err?.code === "SameNameExist") return true;
		if (err?.code === 329119) return true;
		if (err?.retcode === 329119 || err?.data?.retcode === 329119 || err?.response?.retcode === 329119) return true;
		const msg = (err?.message ?? "").toLowerCase();
		if (msg.includes("同名") || msg.includes("conflict") || msg.includes("exist") || msg.includes("same name")) return true;
		return false;
	}, []);
	const extractConflictInfo = (0, import_react.useCallback)((err) => {
		const info = {};
		if (err?.data?.fileId || err?.data?.fileID) info.fileId = err.data.fileId || err.data.fileID;
		if (err?.data?.lastModifiedBy) info.lastModifiedBy = err.data.lastModifiedBy;
		if (err?.data?.lastModifiedAt || err?.data?.modifiedTime) info.lastModifiedAt = err.data.lastModifiedAt || err.data.modifiedTime;
		return info;
	}, []);
	const uploadSingleFile = (0, import_react.useCallback)(async (item, strategy) => {
		const abortController = new AbortController();
		abortControllersRef.current.set(item.id, abortController);
		console.log("[CancelDebug][use-upload-queue] uploadSingleFile START", {
			id: item.id,
			fileName: item.fileName,
			size: item.size,
			strategy,
			controllersInMap: abortControllersRef.current.size
		});
		dispatch({
			type: "SET_STATUS",
			id: item.id,
			status: "uploading"
		});
		try {
			const client = store.getState().getClient();
			const resolvedStrategy = strategy ?? "ask";
			const uploadResult = await client.file.upload(item.file, {
				folderId: targetFolderId || void 0,
				appId: getNetDriveAppId(store),
				signal: abortController.signal,
				onProgress: (progress) => {
					const totalBytes = progress.total > 0 ? progress.total : item.size;
					const loadedBytes = Math.min(progress.loaded, totalBytes);
					const percent = totalBytes === 0 ? 0 : Math.round(loadedBytes / totalBytes * 100);
					dispatch({
						type: "UPDATE_PROGRESS",
						id: item.id,
						progress: percent,
						loadedBytes,
						totalBytes
					});
				},
				conflictResolutionStrategy: resolvedStrategy
			});
			const uploadedFileId = uploadResult?.fileID || uploadResult?.fileId || "";
			dispatch({
				type: "SET_STATUS",
				id: item.id,
				status: "success",
				uploadedFileId
			});
			dispatch({
				type: "UPDATE_PROGRESS",
				id: item.id,
				progress: 100,
				loadedBytes: item.size,
				totalBytes: item.size
			});
			return true;
		} catch (err) {
			if (err?.name === "AbortError" || abortController.signal.aborted) {
				console.log("[CancelDebug][use-upload-queue] uploadSingleFile ABORTED", {
					id: item.id,
					fileName: item.fileName,
					errName: err?.name,
					signalAborted: abortController.signal.aborted
				});
				dispatch({
					type: "SET_STATUS",
					id: item.id,
					status: "cancelled"
				});
				return false;
			}
			if (isConflictError(err)) {
				console.log("[useUploadQueue] conflict detected for file:", item.fileName, "error:", err);
				const conflictInfo = extractConflictInfo(err);
				dispatch({
					type: "SET_CONFLICT",
					id: item.id,
					conflictFileId: conflictInfo.fileId || "",
					conflictInfo
				});
				return false;
			}
			dispatch({
				type: "SET_STATUS",
				id: item.id,
				status: "error",
				error: err?.message ?? t("myFiles.upload.failed")
			});
			if (isStorageFullError(err) && !isIOA) {
				showStorageUpgradeToast();
				return false;
			}
			toast.error(t("myFiles.upload.failedWithName", {
				name: safeDecodeFileName(item.fileName),
				error: err?.message ?? t("myFiles.upload.failed")
			}));
			return false;
		} finally {
			abortControllersRef.current.delete(item.id);
		}
	}, [
		targetFolderId,
		isConflictError,
		extractConflictInfo,
		isIOA
	]);
	const isQueueFullySettled = (0, import_react.useCallback)((items) => {
		if (items.length === 0) return false;
		return items.every((it) => it.status === "success" || it.status === "error" || it.status === "cancelled");
	}, []);
	(0, import_react.useEffect)(() => {
		if (!pendingCompleteCallbackRef.current) return;
		if (!hasUploadedAnyRef.current) return;
		if (!isQueueFullySettled(queue)) return;
		pendingCompleteCallbackRef.current = false;
		hasUploadedAnyRef.current = false;
		onUploadCompleteRef.current?.();
	}, [queue, isQueueFullySettled]);
	const startUpload = (0, import_react.useCallback)(async () => {
		console.log("[CancelDebug][use-upload-queue] startUpload CALLED", {
			isUploadingRefBefore: isUploadingRef.current,
			queueLen: queueRef.current.length,
			pendingLen: queueRef.current.filter((i) => i.status === "pending").length
		});
		if (isUploadingRef.current) return false;
		isUploadingRef.current = true;
		pendingCompleteCallbackRef.current = true;
		try {
			const pendingItems = queueRef.current.filter((item) => item.status === "pending");
			if (pendingItems.length === 0) {
				pendingCompleteCallbackRef.current = false;
				return false;
			}
			const results = await Promise.all(pendingItems.map((item) => uploadSingleFile(item)));
			if (results.some(Boolean)) hasUploadedAnyRef.current = true;
			return results.every(Boolean);
		} finally {
			isUploadingRef.current = false;
			console.log("[CancelDebug][use-upload-queue] startUpload FINALLY → isUploadingRef=false");
		}
	}, [uploadSingleFile]);
	const resolveConflict = (0, import_react.useCallback)(async (id, action) => {
		const item = queue.find((q) => q.id === id);
		if (!item) return;
		switch (action) {
			case "overwrite":
				dispatch({
					type: "SET_STATUS",
					id,
					status: "pending"
				});
				if (await uploadSingleFile(item, "overwrite")) hasUploadedAnyRef.current = true;
				break;
			case "keep-both":
				dispatch({
					type: "SET_STATUS",
					id,
					status: "pending"
				});
				if (await uploadSingleFile(item, "rename")) hasUploadedAnyRef.current = true;
				break;
			case "skip":
				dispatch({
					type: "REMOVE",
					id
				});
				break;
		}
	}, [queue, uploadSingleFile]);
	const removeItem = (0, import_react.useCallback)((id) => {
		const controller = abortControllersRef.current.get(id);
		console.log("[CancelDebug][use-upload-queue] removeItem CALLED", {
			id,
			hasController: !!controller,
			controllersInMap: abortControllersRef.current.size
		});
		if (controller) controller.abort();
		dispatch({
			type: "REMOVE",
			id
		});
	}, []);
	const clearCompleted = (0, import_react.useCallback)(() => {
		dispatch({ type: "CLEAR_COMPLETED" });
	}, []);
	const reset = (0, import_react.useCallback)(() => {
		console.log("[CancelDebug][use-upload-queue] reset CALLED", {
			controllersInMap: abortControllersRef.current.size,
			queueLen: queueRef.current.length,
			isUploadingRefBefore: isUploadingRef.current
		});
		abortControllersRef.current.forEach((controller, id) => {
			console.log("[CancelDebug][use-upload-queue]   reset → abort id=", id);
			controller.abort();
		});
		abortControllersRef.current.clear();
		dispatch({ type: "RESET" });
		isUploadingRef.current = false;
		pendingCompleteCallbackRef.current = false;
		hasUploadedAnyRef.current = false;
	}, []);
	const totalCount = queue.length;
	const completedCount = queue.filter((q) => q.status === "success").length;
	const totalBytes = queue.reduce((sum, q) => sum + q.totalBytes, 0);
	const loadedBytes = queue.reduce((sum, q) => sum + q.loadedBytes, 0);
	const overallProgress = totalBytes === 0 ? 0 : Math.round(loadedBytes / totalBytes * 100);
	return {
		queue,
		addFiles,
		startUpload,
		removeItem,
		clearCompleted,
		reset,
		resolveConflict,
		isUploading: isUploadingRef.current,
		overallProgress,
		completedCount,
		totalCount
	};
}
var import_react, LAST_UPLOAD_FOLDER_ID_KEY, LAST_UPLOAD_FOLDER_NAME_KEY;
var init_use_upload_queue = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_account();
	init_netdrive_service();
	init_space_utils();
	LAST_UPLOAD_FOLDER_ID_KEY = "myFiles.lastUploadFolderId";
	LAST_UPLOAD_FOLDER_NAME_KEY = "myFiles.lastUploadFolderName";
}));
//#endregion
export { useUploadQueue as i, init_use_upload_queue as n, setLastUploadFolder as r, getLastUploadFolder as t };
