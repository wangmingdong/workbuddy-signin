import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { B as accountService, n as init_common } from "./common-CwB_VqKR.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { b as isWorkBuddyDesktop, p as init_environment } from "./environment-DKqg3f0G.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { a as myFilesStore, n as init_store } from "./store-BI1MDwNq.js";
import { n as isStorageUpgradeEntryEnabled, t as init_storage_upgrade_entry_snapshot } from "./storage-upgrade-entry-snapshot-BgU4-HWF.js";
import { n as init_route_path_tracker, t as getCurrentRoutePath } from "./route-path-tracker-D4O9Dve0.js";
import { i as fetchPurchaseCode, o as init_netdrive_service } from "./netdrive-service-B_rY4sKl.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/my-files/components/cloud-files/space-utils.ts
/** 字节数格式化为人类可读字符串（B / KB / MB / GB / TB） */
function formatBytes(n) {
	if (!Number.isFinite(n) || n < 0) return "0 B";
	if (n < 1024) return `${n} B`;
	const units = [
		"KB",
		"MB",
		"GB",
		"TB"
	];
	let v = n / 1024;
	let i = 0;
	while (v >= 1024 && i < units.length - 1) {
		v /= 1024;
		i++;
	}
	return `${v.toFixed(2)} ${units[i]}`;
}
/**
* 判断当前账号是否为付费用户。
*
* 判定顺序：
* 1. `editionType` 有值（enrichAccountWithUsage 成功）→ 以其是否 `'free'` 为准，最精确
* 2. `editionType` 缺失 → 回退到登录即有的稳定字段：
*    - `account.type ∈ {ultimate, exclusive, pro}`：企业/Pro 版本，直接付费
*    - `account.type === 'personal' && account.isPro`：个人版 Pro 订阅
*    - 其他一律免费
*
* ⚠️ 为什么要兜底：
* 1. `editionType` 由 `enrichAccountWithUsage` 异步派生，用量接口失败时其 catch 分支
*    会返回不含 `editionType` 的账号（见 backend-provider.ts），只看 `editionType`
*    会把付费用户误判成免费（#58600）。
* 2. Desktop 侧 `WorkbuddyAgentAdapterNext.syncAccountService` 为不阻塞
*    `flushDeferredAccountBoundSessionUpserts`，采用"先裸 set uid 立即可用 → 异步
*    enrich 覆盖"的两段写策略，首帧窗口内 account 也可能缺 `editionType`。
* iframe-menu/store.ts、file-list-view/index.tsx 等处已就同一问题留有明确警告注释，
* 本函数遵循相同兜底策略。
*/
function isPaidAccount() {
	const account = accountService.getAccount();
	if (!account) return false;
	if (account.editionType) return account.editionType !== "free";
	if (account.type === "ultimate" || account.type === "exclusive" || account.type === "pro") return true;
	if (account.type === "personal" && account.isPro === true) return true;
	return false;
}
/**
* 单文件大小自检：按文件大小分档提示。
* - 付费用户：≤ 50G 放行，> 50G 提示文件过大
* - 免费用户：≤ 1G 放行，1G ~ 50G 引导升级，> 50G 提示文件过大
*
* @param isPaid 是否为付费用户。不传时自动读取 accountService 判断。
*   纯函数场景（如模块级 store 工厂）可显式传入，避免初始化时序问题。
*
* 设计原因：服务端免费用户单文件限额 1G，会员 50G；前端先卡可避免用户上传几分钟才失败。
*/
function checkSingleFileSize(files, isPaid) {
	const paid = isPaid ?? isPaidAccount();
	const effectiveLimit = paid ? VIP_SINGLE_FILE_SIZE : MAX_SINGLE_FILE_SIZE;
	const overLimit = files.filter((f) => (f.size ?? 0) > effectiveLimit);
	if (overLimit.length === 0) return true;
	if (paid) {
		toast({
			type: "warning",
			message: t("myFiles.upload.fileOverMaxSize"),
			action: {
				label: t("myFiles.upload.iKnow"),
				onClick: () => {}
			}
		});
		return false;
	}
	if (overLimit.some((f) => (f.size ?? 0) > VIP_SINGLE_FILE_SIZE)) {
		toast({
			type: "warning",
			message: t("myFiles.upload.fileOverMaxSize"),
			action: {
				label: t("myFiles.upload.iKnow"),
				onClick: () => {}
			}
		});
		return false;
	}
	if (!isStorageUpgradeEntryEnabled()) {
		toast({
			type: "warning",
			message: t("myFiles.upload.fileOverFreeLimitOverseas"),
			action: {
				label: t("myFiles.upload.iKnow"),
				onClick: () => {}
			}
		});
		return false;
	}
	toast({
		type: "warning",
		message: t("myFiles.upload.fileOverFreeLimit"),
		action: {
			label: t("myFiles.upload.goUpgrade"),
			onClick: () => {
				window.open(UPGRADE_URL, "_blank", "noopener,noreferrer");
			}
		}
	});
	return false;
}
/**
* 上传前空间自检：sum(file.size) <= total - used 才放行。
* - 容量未加载或 total<=0：跳过自检（不阻断，由后端兜底）
* - 不足：非 IOA 用户弹出升级引导 toast（含"前往升级"按钮）；IOA 用户沿用旧文案
*
* @param store 容量来源（个人盘默认 myFilesStore；项目盘按 projectId 取实例）。
*              不同盘各自独立配额，必须显式传入对应 store，避免误用个人盘容量校验项目盘上传。
* @param isIOA 是否为 IOA 账户（仅影响超容提醒文案：非 IOA 引导升级，IOA 仅提示不足）
* @param upgradeReturnUrl 升级后跳回的页面地址（如 workbuddy://my-files?tab=cloudFiles），
*                         传入则透传给 showStorageUpgradeToast，不传则自动推导
*/
function checkSpaceBeforeUpload(files, store = myFilesStore, isProject = false, isIOA = false, upgradeReturnUrl) {
	const cap = store.getState().storageCapacity;
	if (!cap || cap.total <= 0) return true;
	const required = files.reduce((s, f) => s + (f.size || 0), 0);
	if (required <= 0) return true;
	const remaining = Math.max(0, cap.total - cap.used);
	if (required > remaining) {
		if (!isIOA) showStorageUpgradeToast(upgradeReturnUrl);
		else toast.error(t(isProject ? "myFiles.upload.notEnoughSpaceProject" : "myFiles.upload.notEnoughSpace", {
			remaining: formatBytes(remaining),
			required: formatBytes(required)
		}));
		return false;
	}
	return true;
}
/**
* 已知是文件夹时的拒绝提示（用于 onFolderDropped 回调）。
*
* 调用方约定：DropZone 已通过 `webkitGetAsEntry()` 在拖拽入口
* 准确识别出文件夹，folderName 必然有效，这里只负责给 toast。
*/
function rejectFolderUpload(folderName) {
	toast.error(t("myFiles.upload.folderNotSupported", { name: folderName }));
}
/**
* 识别"上传中后端报空间不足"类错误。
*
* 优先按 retcode 命中（最准）；retcode 未透传时按 payload 的 "size:N, unused:M" 数值兜底。
* 已移除纯文本关键词正则，避免误命中"QPS 超限/频率超限"等限流类错误。
* 命中后整批 abort，避免进度条卡死（#45612）。
*
* 已知 retcode：
*   - 20010：file.upload 单文件超出剩余容量，payload msg 形如 "size: 1181116006, unused: 1073741824"
*/
function isSpaceLimitError(err) {
	const retcodeCandidates = [
		err?.retcode,
		err?.code,
		err?.data?.retcode,
		err?.data?.code,
		err?.response?.data?.retcode
	];
	for (const c of retcodeCandidates) {
		if (typeof c === "number" && SPACE_LIMIT_RETCODES.has(c)) return true;
		if (typeof c === "string" && SPACE_LIMIT_RETCODES.has(Number(c))) return true;
	}
	const msg = String(err?.message ?? err?.data?.message ?? err?.msg ?? "").toLowerCase();
	if (!msg) return false;
	if (/size:\s*\d+.*unused:\s*\d+/.test(msg)) {
		const detail = extractSpaceLimitDetail(err);
		if (detail && detail.required > detail.remaining) return true;
	}
	return false;
}
/**
* 从后端"空间不足"错误里提取字节数，用于构造人类可读的 toast。
*
* 优先级：
*   1. err.data.size / err.data.unused（结构化字段，最可靠）
*   2. message 文本里 "size: N, unused: M" 的正则提取（后端 retcode=20010 的标准格式）
*
* 提取不到时返回 null，调用方需走 store.storageCapacity 兜底。
*/
function extractSpaceLimitDetail(err) {
	const data = err?.data ?? err?.response?.data;
	const sizeFromData = Number(data?.size);
	const unusedFromData = Number(data?.unused);
	if (Number.isFinite(sizeFromData) && Number.isFinite(unusedFromData) && sizeFromData > 0 && unusedFromData >= 0) return {
		required: sizeFromData,
		remaining: unusedFromData
	};
	const m = String(err?.message ?? data?.message ?? err?.msg ?? "").match(/size:\s*(\d+)[^0-9]+unused:\s*(\d+)/i);
	if (m) {
		const required = Number(m[1]);
		const remaining = Number(m[2]);
		if (Number.isFinite(required) && Number.isFinite(remaining)) return {
			required,
			remaining
		};
	}
	return null;
}
/**
* 构造"空间不足"的友好提示文本。
*
* - 优先用后端透出的 size/unused 字节数（最准，反映上传瞬间真实剩余）
* - 退而求其次用 store 缓存的 storageCapacity（可能略旧）
* - 都拿不到时只给一句通用文案
*
* @param store 容量来源（默认个人盘；项目盘场景按 projectId 取实例）。
*/
function buildSpaceLimitMessage(err, store = myFilesStore, isProject = false) {
	const detail = extractSpaceLimitDetail(err);
	if (detail) return t(isProject ? "myFiles.upload.failedDueToSpaceWithDetailProject" : "myFiles.upload.failedDueToSpaceWithDetail", {
		remaining: formatBytes(detail.remaining),
		required: formatBytes(detail.required)
	});
	const cap = store.getState().storageCapacity;
	if (cap && cap.total > 0) {
		const remaining = Math.max(0, cap.total - cap.used);
		return t(isProject ? "myFiles.upload.failedDueToSpaceWithRemainingProject" : "myFiles.upload.failedDueToSpaceWithRemaining", { remaining: formatBytes(remaining) });
	}
	return t(isProject ? "myFiles.upload.failedDueToSpaceProject" : "myFiles.upload.failedDueToSpace");
}
/**
* 判断错误是否为存储空间不足（retcode 20010）。
*
* 与 isSpaceLimitError 的区别：isSpaceLimitError 做宽泛匹配（含 payload 兜底），
* 本函数仅精确匹配 retcode/code === 20010，用于需要区分"容量满需升级"的场景。
*/
function isStorageFullError(err) {
	const candidates = [
		err?.retcode,
		err?.code,
		err?.data?.retcode,
		err?.data?.code,
		err?.response?.data?.retcode
	];
	for (const c of candidates) if (c === 20010 || c === "20010") return true;
	return false;
}
/**
* 将当前路由路径转换为 workbuddy:// deeplink，用于购买页 return_url 跳回。
*
* 转换逻辑：用路径前缀直接匹配 deeplink host，剩余路径段追加到 host 后面。
* 例如：/task/4b36e102-xxx → workbuddy://chat/4b36e102-xxx
*/
function routePathToDeeplink(currentPath) {
	for (const [prefix, host] of ROUTE_PREFIX_TO_DEEPLINK_HOST) if (currentPath.startsWith(prefix)) {
		const remaining = currentPath.slice(prefix.length);
		return remaining ? `workbuddy://${host}${remaining}` : `workbuddy://${host}`;
	}
	return "workbuddy://home";
}
/**
* 显示"存储空间不足 + 前往升级"的 toast。
*
* - toast 带操作按钮，点击后跳转网盘购买页（调用 fetchPurchaseCode 获取 code）
* - 若传入 returnUrl 则直接使用；否则桌面端用 workbuddy:// deeplink，Web 用当前页面 URL
*
* 供 use-upload-queue（个人盘 hook）和 upload-queue-store（通用 store 工厂）共用。
*/
function showStorageUpgradeToast(returnUrl) {
	if (!isStorageUpgradeEntryEnabled()) {
		toast({
			message: t("myFiles.upload.storageFullOverseas"),
			type: "warning",
			duration: 3e3
		});
		return;
	}
	const action = {
		label: t("myFiles.upload.storageFullUpgrade"),
		onClick: () => {
			fetchPurchaseCode().then((code) => {
				const finalReturnUrl = returnUrl || (isWorkBuddyDesktop() ? routePathToDeeplink(getCurrentRoutePath()) : window.location.href);
				const url = `https://drive.tencent.com/purchase?code=${encodeURIComponent(code)}&source=workbuddy&action=overCapacity&return_url=${encodeURIComponent(finalReturnUrl)}`;
				window.open(url, "_blank", "noopener,noreferrer");
			}).catch(() => {});
		}
	};
	toast({
		message: t("myFiles.upload.storageFull"),
		type: "warning",
		action,
		duration: 3e3
	});
}
var SPACE_LIMIT_RETCODES, MAX_SINGLE_FILE_SIZE, VIP_SINGLE_FILE_SIZE, UPGRADE_URL, ROUTE_PREFIX_TO_DEEPLINK_HOST;
var init_space_utils = __esmMin((() => {
	init_common();
	init_src();
	init_storage_upgrade_entry_snapshot();
	init_i18n();
	init_environment();
	init_route_path_tracker();
	init_netdrive_service();
	init_store();
	SPACE_LIMIT_RETCODES = new Set([20010]);
	MAX_SINGLE_FILE_SIZE = 1024 * 1024 * 1024;
	VIP_SINGLE_FILE_SIZE = 50 * 1024 * 1024 * 1024;
	UPGRADE_URL = "https://www.codebuddy.cn/profile/plan/?fromSource=gwzcw.14988903.14988903.14988903&utm_medium=cpc&utm_id=gwzcw.14988903.14988903.14988903";
	ROUTE_PREFIX_TO_DEEPLINK_HOST = [
		["/library/my-files", "my-files"],
		["/library/tencent-docs", "tdoc"],
		["/library/ima", "ima"],
		["/library/lexiang", "lexiang"],
		["/experts/skills", "skills"],
		["/experts/connectors", "connectors"],
		["/experts", "experts"],
		["/task", "chat"],
		["/projects", "home"],
		["/automation", "automation"],
		["/colleagues", "colleagues"],
		["/claw", "claw"],
		["/skills", "skills"],
		["/discover", "discover"],
		["/connectors", "connectors"],
		["/plugins", "plugins"],
		["/inspiration", "playbook"]
	];
}));
//#endregion
export { isSpaceLimitError as a, showStorageUpgradeToast as c, init_space_utils as i, checkSingleFileSize as n, isStorageFullError as o, checkSpaceBeforeUpload as r, rejectFolderUpload as s, buildSpaceLimitMessage as t };
