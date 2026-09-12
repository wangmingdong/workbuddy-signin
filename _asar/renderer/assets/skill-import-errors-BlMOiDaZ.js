import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { a as Subject, i as BehaviorSubject, n as init__esm5, r as combineLatest } from "./_esm5-RYAsZ7Wr.js";
import { t as init_common } from "./common-Czfscgga.js";
import { a as useOptionalModuleHost } from "./module-host-context-CI9spvhq.js";
//#region ../../packages/agent-ui/src/modules/skills/extension-refresh-events.ts
/** 通知 plugin 列表刷新 */
function notifyPluginListRefresh() {
	pluginListRefresh$.next();
}
/** 通知 mcp 列表刷新 */
function notifyMcpListRefresh() {
	mcpListRefresh$.next();
}
/** 通知技能更新红点重新检测 */
function notifySkillsUpdateBadgeRefresh() {
	skillsUpdateBadgeRefresh$.next();
}
var pluginListRefresh$, mcpListRefresh$, skillsUpdateBadgeRefresh$;
var init_extension_refresh_events = __esmMin((() => {
	init__esm5();
	pluginListRefresh$ = new Subject();
	mcpListRefresh$ = new Subject();
	skillsUpdateBadgeRefresh$ = new Subject();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/high-risk-notification-store.ts
/** 发布一条高风险通知（追加入队，按 md5 去重） */
function publishHighRiskNotification(task, result) {
	const current = highRiskNotification$.getValue();
	if (current.some((entry) => entry.task.md5 === task.md5)) return;
	highRiskNotification$.next([...current, {
		task,
		result,
		timestamp: Date.now()
	}]);
}
/** 消费（清除）所有高风险通知 */
function consumeAllHighRiskNotifications() {
	const current = highRiskNotification$.getValue();
	if (current.length > 0) highRiskNotification$.next([]);
	return current;
}
/** 更新上传弹窗可见状态 */
function setUploadModalVisible(visible) {
	uploadModalVisible$.next(visible);
}
/** 通知 skill 列表刷新 */
function notifySkillListRefresh() {
	skillListRefresh$.next();
}
var highRiskNotification$, uploadModalVisible$, skillListRefresh$;
var init_high_risk_notification_store = __esmMin((() => {
	init__esm5();
	init_extension_refresh_events();
	highRiskNotification$ = new BehaviorSubject([]);
	uploadModalVisible$ = new BehaviorSubject(false);
	skillListRefresh$ = new Subject();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-high-risk-notification.ts
/**
* 将新条目合并到已有列表中（按 md5 去重）
*/
function mergeNotifications(existing, incoming) {
	const existingMd5s = new Set(existing.map((e) => e.task.md5));
	const newEntries = incoming.filter((e) => !existingMd5s.has(e.task.md5));
	if (newEntries.length === 0) return existing;
	return [...existing, ...newEntries];
}
function useHighRiskNotification() {
	const t = useTranslation();
	const [notifications, setNotifications] = (0, import_react$1.useState)([]);
	const pendingRef = (0, import_react$1.useRef)([]);
	const personalSkills = useOptionalModuleHost()?.facades.personalSkills;
	(0, import_react$1.useEffect)(() => {
		const sub = combineLatest([highRiskNotification$, uploadModalVisible$]).subscribe(([entries, uploadModalOpen]) => {
			if (entries.length > 0) {
				if (uploadModalOpen) pendingRef.current = mergeNotifications(pendingRef.current, entries);
				else setNotifications((prev) => mergeNotifications(prev, entries));
				queueMicrotask(() => consumeAllHighRiskNotifications());
			} else if (!uploadModalOpen && pendingRef.current.length > 0) {
				const pending = pendingRef.current;
				pendingRef.current = [];
				setNotifications((prev) => mergeNotifications(prev, pending));
			}
		});
		return () => sub.unsubscribe();
	}, []);
	return {
		notifications,
		handleUninstall: (0, import_react$1.useCallback)(async (md5) => {
			const target = notifications.find((n) => n.task.md5 === md5);
			if (!target) {
				setNotifications((prev) => prev.filter((n) => n.task.md5 !== md5));
				return;
			}
			const { task } = target;
			if (!personalSkills) {
				console.warn("[useHighRiskNotification] personalSkills not available, cannot uninstall");
				setNotifications((prev) => prev.filter((n) => n.task.md5 !== md5));
				return;
			}
			const result = await personalSkills.delete({
				filePath: task.skillFilePath,
				name: task.skillName
			});
			if (result.success) {
				toast({
					message: t("skills.security.scanResultDialog.uninstallSuccess", { name: task.skillName }),
					type: "success"
				});
				notifySkillListRefresh();
			} else toast({
				message: result.error || t("skills.toast.deleteFailed"),
				type: "error"
			});
			setNotifications((prev) => prev.filter((n) => n.task.md5 !== md5));
		}, [
			personalSkills,
			notifications,
			t
		]),
		handleKeep: (0, import_react$1.useCallback)((md5) => {
			setNotifications((prev) => prev.filter((n) => n.task.md5 !== md5));
		}, [])
	};
}
var import_react$1;
var init_use_high_risk_notification = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init__esm5();
	init_useI18n();
	init_common();
	init_high_risk_notification_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/security-scan-store.ts
/**
* 发布某个 md5 的检测完成结果
*/
function publishScanResult(md5, result) {
	const current = scanResultMap$.getValue();
	const next = new Map(current);
	next.set(md5, {
		result,
		completedAt: Date.now()
	});
	scanResultMap$.next(next);
}
/**
* 消费（读取并移除）某个 md5 的检测结果
*
* 调用后该 md5 条目将从 store 中删除，避免重复消费。
*/
function consumeScanResult(md5) {
	const current = scanResultMap$.getValue();
	const entry = current.get(md5);
	if (!entry) return;
	const next = new Map(current);
	next.delete(md5);
	scanResultMap$.next(next);
	return entry;
}
var scanResultMap$;
var init_security_scan_store = __esmMin((() => {
	init__esm5();
	scanResultMap$ = new BehaviorSubject(/* @__PURE__ */ new Map());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/async-security-scan-service.ts
function loadRiskMapFromStorage() {
	try {
		const raw = localStorage.getItem(RISK_MAP_STORAGE_KEY);
		if (!raw) return /* @__PURE__ */ new Map();
		const entries = JSON.parse(raw);
		return new Map(entries);
	} catch {
		return /* @__PURE__ */ new Map();
	}
}
function saveRiskMapToStorage(map) {
	try {
		const entries = Array.from(map.entries());
		localStorage.setItem(RISK_MAP_STORAGE_KEY, JSON.stringify(entries));
	} catch {}
}
function isHighRisk(result) {
	return result.threatLevel >= 4 || result.verdict === "black";
}
var POLL_INITIAL_INTERVAL, POLL_MAX_INTERVAL, POLL_BACKOFF_FACTOR, POLL_MAX_WAIT, RISK_MAP_STORAGE_KEY, AsyncSecurityScanService, asyncSecurityScanService;
var init_async_security_scan_service = __esmMin((() => {
	init__esm5();
	init_high_risk_notification_store();
	init_security_scan_store();
	POLL_INITIAL_INTERVAL = 5e3;
	POLL_MAX_INTERVAL = 15e3;
	POLL_BACKOFF_FACTOR = 1.5;
	POLL_MAX_WAIT = 120 * 1e3;
	RISK_MAP_STORAGE_KEY = "skill-security-risk-map";
	AsyncSecurityScanService = class {
		constructor() {
			this.pendingTasks$ = new BehaviorSubject([]);
			this.skillRiskMap$ = new BehaviorSubject(loadRiskMapFromStorage());
			this.completedEvent$ = new Subject();
			this.pollTimers = /* @__PURE__ */ new Map();
			this.personalSkillsFacade = null;
		}
		/** @deprecated adapter 已被 facade 替代，保留空操作兼容外部调用 */
		setAdapter(_adapter) {}
		setPersonalSkillsFacade(facade) {
			this.personalSkillsFacade = facade;
		}
		addTask(task) {
			const current = this.pendingTasks$.getValue();
			if (current.some((t) => t.md5 === task.md5)) {
				console.info("[SecurityScan][async] skip duplicate task", {
					md5: task.md5,
					skillName: task.skillName
				});
				return;
			}
			console.info("[SecurityScan][async] add task", {
				md5: task.md5,
				skillName: task.skillName,
				skillFilePath: task.skillFilePath,
				pendingCount: current.length + 1
			});
			this.pendingTasks$.next([...current, task]);
			this.pollTask(task, POLL_INITIAL_INTERVAL);
		}
		removeTask(md5) {
			const timer = this.pollTimers.get(md5);
			if (timer) {
				clearTimeout(timer);
				this.pollTimers.delete(md5);
			}
			const current = this.pendingTasks$.getValue();
			console.info("[SecurityScan][async] remove task", {
				md5,
				hadTimer: !!timer,
				pendingCount: current.length
			});
			this.pendingTasks$.next(current.filter((t) => t.md5 !== md5));
		}
		updateTask(md5, updates) {
			const current = this.pendingTasks$.getValue();
			console.info("[SecurityScan][async] update task", {
				md5,
				updates,
				matched: current.some((t) => t.md5 === md5)
			});
			this.pendingTasks$.next(current.map((t) => t.md5 === md5 ? {
				...t,
				...updates
			} : t));
		}
		clearRisk(filePath) {
			const current = this.skillRiskMap$.getValue();
			const next = new Map(current);
			next.delete(filePath);
			this.skillRiskMap$.next(next);
			saveRiskMapToStorage(next);
		}
		pollTask(task, currentInterval) {
			const elapsed = Date.now() - task.startTime;
			if (elapsed >= POLL_MAX_WAIT) {
				this.pollTimers.delete(task.md5);
				console.warn("[SecurityScan][async] poll timeout", {
					md5: task.md5,
					skillName: task.skillName,
					elapsed
				});
				this.handleScanTimeout(task);
				return;
			}
			console.info("[SecurityScan][async] schedule poll", {
				md5: task.md5,
				skillName: task.skillName,
				interval: currentInterval,
				elapsed
			});
			const timer = setTimeout(async () => {
				this.pollTimers.delete(task.md5);
				const latestTask = this.pendingTasks$.getValue().find((t) => t.md5 === task.md5) ?? task;
				const facade = this.personalSkillsFacade;
				if (!facade?.querySecurityScan) {
					console.warn("[SecurityScan][async] missing querySecurityScan facade", {
						md5: latestTask.md5,
						hasFacade: !!facade
					});
					this.handleScanError(latestTask);
					return;
				}
				try {
					console.info("[SecurityScan][async] query result start", {
						md5: latestTask.md5,
						skillName: latestTask.skillName
					});
					const result = await facade.querySecurityScan({ md5: latestTask.md5 });
					console.info("[SecurityScan][async] query result finished", {
						md5: latestTask.md5,
						hasResult: !!result,
						verdict: result?.verdict,
						riskLevel: result?.riskLevel,
						threatLevel: result?.threatLevel,
						staticAnalysisStatus: result?.staticAnalysisStatus
					});
					if (!result || result.staticAnalysisStatus && result.staticAnalysisStatus !== "done") {
						const nextInterval = Math.min(currentInterval * POLL_BACKOFF_FACTOR, POLL_MAX_INTERVAL);
						this.pollTask(latestTask, nextInterval);
						return;
					}
					this.handleScanCompleted(latestTask, result);
				} catch (error) {
					console.warn("[SecurityScan][async] query result failed", {
						md5: latestTask.md5,
						error: error instanceof Error ? error.message : String(error)
					});
					this.handleScanError(latestTask);
				}
			}, currentInterval);
			this.pollTimers.set(task.md5, timer);
		}
		async handleScanCompleted(task, result) {
			console.info("[SecurityScan][async] scan completed", {
				md5: task.md5,
				skillName: task.skillName,
				skillFilePath: task.skillFilePath,
				verdict: result.verdict,
				riskLevel: result.riskLevel,
				threatLevel: result.threatLevel
			});
			const current = this.pendingTasks$.getValue();
			this.pendingTasks$.next(current.filter((t) => t.md5 !== task.md5));
			publishScanResult(task.md5, result);
			if (isHighRisk(result)) {
				if (!task.skillName) return;
				try {
					const facade = this.personalSkillsFacade;
					if (facade) {
						if (!((await facade.list({
							cwd: "",
							global: false,
							excludePluginSkills: true
						})).results || []).some((s) => s.name === task.skillName)) return;
					}
				} catch {}
				publishHighRiskNotification(task, result);
			} else if (result.threatLevel > 0) {
				const riskMap = this.skillRiskMap$.getValue();
				const next = new Map(riskMap);
				next.set(task.skillFilePath, result);
				this.skillRiskMap$.next(next);
				saveRiskMapToStorage(next);
				this.completedEvent$.next({
					task,
					result,
					type: "riskFound"
				});
			} else this.completedEvent$.next({
				task,
				result,
				type: "safe"
			});
		}
		handleScanTimeout(task) {
			const current = this.pendingTasks$.getValue();
			console.warn("[SecurityScan][async] scan timeout", {
				md5: task.md5,
				skillName: task.skillName
			});
			this.pendingTasks$.next(current.filter((t) => t.md5 !== task.md5));
			this.completedEvent$.next({
				task,
				result: null,
				type: "timeout"
			});
		}
		handleScanError(task) {
			const current = this.pendingTasks$.getValue();
			console.warn("[SecurityScan][async] scan error", {
				md5: task.md5,
				skillName: task.skillName
			});
			this.pendingTasks$.next(current.filter((t) => t.md5 !== task.md5));
			this.completedEvent$.next({
				task,
				result: null,
				type: "error"
			});
		}
	};
	asyncSecurityScanService = new AsyncSecurityScanService();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-scan-result-subscription.ts
/**
* 监听指定 md5 的异步检测结果
*
* @param md5 - 需要监听的文件 md5，传 null/undefined 时不监听
* @param onResult - 结果到达时的回调
*/
function useScanResultSubscription(md5, onResult) {
	(0, import_react.useEffect)(() => {
		if (!md5) return;
		const subscription = scanResultMap$.subscribe((map) => {
			if (!map.has(md5)) return;
			const entry = consumeScanResult(md5);
			if (entry) onResult(entry.result);
		});
		return () => subscription.unsubscribe();
	}, [md5, onResult]);
}
var import_react;
var init_use_scan_result_subscription = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_security_scan_store();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/skill-import-errors.ts
/** 判断导入 Skill 的错误是否为用户主动取消 */
function isUserCancelledImportSkill(error) {
	return !!error && USER_CANCELLED_ERRORS.includes(error);
}
/**
* 从 SkillPackageTooLargeError 的 message 中解析最大允许字节数。
* message 形如：`Skill package too large: 12345 > 67890 bytes`。
* 解析失败返回 null，调用方走 fallback 文案。
*/
function parseMaxBytesFromError(error) {
	const m = error.match(/>\s*(\d+)\s*bytes/);
	if (!m) return null;
	const n = Number(m[1]);
	return Number.isFinite(n) && n > 0 ? n : null;
}
/** 把字节数格式化成人类可读单位，保留 1 位小数（整数则不带小数）。 */
function formatBytes(bytes) {
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let value = bytes;
	let i = 0;
	while (value >= 1024 && i < units.length - 1) {
		value /= 1024;
		i += 1;
	}
	return `${i === 0 || Number.isInteger(value) ? String(value) : value.toFixed(1)} ${units[i]}`;
}
function getLocalizedImportSkillError(error) {
	if (!error) return t("skill.importError.default");
	const duplicateNameMatch = error.match(/^(?:A skill with name|Skill) "(.+)" already exists$/);
	if (duplicateNameMatch) return t("skill.importError.duplicateName", { name: duplicateNameMatch[1] });
	if (/ENOENT[\s\S]*SKILL\.md/.test(error)) return t("skill.importError.skillFileMissing");
	if (/^Skill package too large(:|\b)/.test(error)) {
		const max = parseMaxBytesFromError(error);
		return t("skill.importError.sizeLimitExceeded", { max: max != null ? formatBytes(max) : t("skill.importError.sizeLimitFallback") });
	}
	if (/^Skill upload denied by enterprise policy(:|\b)/.test(error)) return t("skill.importError.operationDisallowed");
	switch (error) {
		case "No file or folder selected": return t("skill.importError.noFileSelected");
		case "No folder selected": return t("skill.importError.noFolderSelected");
		case "Source must be a directory": return t("skill.importError.sourceMustBeDirectory");
		case "Selected path is not a folder": return t("skill.importError.notFolder");
		case "SKILL.md file not found in selected folder":
		case "SKILL.md file not found in the selected folder. The folder does not conform to the skill specification.":
		case "SKILL.md not found in zip archive": return t("skill.importError.skillFileMissing");
		case "SKILL.md format is incorrect. Required fields: name, description": return t("skill.importError.invalidFrontMatter");
		case "SKILL.md format is incorrect. Required field \"name\" is missing.": return t("skill.importError.nameMissing");
		case "SKILL.md format is incorrect. Required field \"description\" is missing.": return t("skill.importError.descriptionMissing");
		case "Selected skill folder is already in target location": return t("skill.importError.alreadyInTarget");
		case "Invalid source, must be localSettings or userSettings": return t("skill.importError.invalidSource");
		case "cwd is required when source is localSettings": return t("skill.importError.cwdRequired");
		case "security_check_blocked": return t("skill.importError.securityCheckBlocked");
		case "Size limit exceeded": return t("skill.importError.sizeLimitExceeded", { max: t("skill.importError.sizeLimitFallback") });
		case "Skill operation disallowed": return t("skill.importError.operationDisallowed");
		default: return t("skill.importError.withReason", { error });
	}
}
/** 统一处理导入 Skill 失败时的错误提示，自动过滤用户取消操作 */
function showImportSkillError(error) {
	if (isUserCancelledImportSkill(error)) return;
	toast.error(getLocalizedImportSkillError(error));
}
var USER_CANCELLED_ERRORS;
var init_skill_import_errors = __esmMin((() => {
	init_src();
	init_i18n();
	USER_CANCELLED_ERRORS = ["No folder selected"];
}));
//#endregion
export { notifyPluginListRefresh as _, useScanResultSubscription as a, skillsUpdateBadgeRefresh$ as b, init_use_high_risk_notification as c, notifySkillListRefresh as d, setUploadModalVisible as f, notifyMcpListRefresh as g, mcpListRefresh$ as h, init_use_scan_result_subscription as i, useHighRiskNotification as l, init_extension_refresh_events as m, init_skill_import_errors as n, asyncSecurityScanService as o, skillListRefresh$ as p, showImportSkillError as r, init_async_security_scan_service as s, getLocalizedImportSkillError as t, init_high_risk_notification_store as u, notifySkillsUpdateBadgeRefresh as v, pluginListRefresh$ as y };
