const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./skill-scan-result-dialog-B3GK8TTL.js","./chunk-BRZcfu7K.js","./src-DRGoWjIu.js","./preload-helper-E3UYCQGP.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./resize-observer-QOR-7G1T.js","./wasm-C4lriWle.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./classnames-BYn3_ESJ.js","./decode-HthuYB5G.js","./index.dom-Hjybw7gi.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./hast-util-whitespace-C3G7AbkX.js","./katex-sFwAzkhG.js","./lodash-D1c13HHR.js","./merge-CDI2sNhv.js","./throttle-mAPE4S6V.js","./isObjectLike-Dan5H4Gd.js","./isSymbol-DlS8bGaY.js","./lucide-react-CmX0JwWL.js","./client-BPkZUIji.js","./jsx-runtime-BNEdAQtr.js","./dist-CSHw4oQX.js","./i18n-DH8xcldp.js","./chevron-down-icon-Bs9CIPFg.js","./copied-icon-Cvsbo-xy.js","./copy-icon-BUIWKTIn.js","./edit-icon-9Lcq4c36.js","./src-D47LCgt5.css","./useI18n-DDytAo7_.js","./i18n-Bt_Wap4p.js","./environment-DKqg3f0G.js","./skill-scan-result-dialog-B9OvdekP.css"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { Yr as toast, ni as ConfirmDialog, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as useModuleHost, n as init_module_host_context } from "./module-host-context-CI9spvhq.js";
import { i as init_types, r as SkillUrlInstallFlowStage } from "./types-B5gc2qW1.js";
import { a as useScanResultSubscription, c as init_use_high_risk_notification, i as init_use_scan_result_subscription, l as useHighRiskNotification, n as init_skill_import_errors, o as asyncSecurityScanService, r as showImportSkillError, s as init_async_security_scan_service } from "./skill-import-errors-BlMOiDaZ.js";
import { t as init_context } from "./context-2xODbZdo.js";
//#region ../../packages/agent-ui/src/modules/skills/components/skill-install-intent-coordinator.tsx
var import_react$1, import_jsx_runtime$1, useSkillInstallIntentConfirm, createPendingScanResult, SkillInstallIntentCoordinator;
var init_skill_install_intent_coordinator = __esmMin((() => {
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_types();
	init_async_security_scan_service();
	init_context();
	init_skill_import_errors();
	init_use_scan_result_subscription();
	import_jsx_runtime$1 = require_jsx_runtime();
	useSkillInstallIntentConfirm = (t) => {
		const [request, setRequest] = (0, import_react$1.useState)(null);
		const resolverRef = (0, import_react$1.useRef)(null);
		return {
			requestSkillInstallIntentConfirm: (0, import_react$1.useCallback)((kind, skillName) => new Promise((resolve) => {
				if (resolverRef.current) resolverRef.current(false);
				resolverRef.current = resolve;
				setRequest({
					kind,
					skillName
				});
			}), []),
			resolveSkillInstallIntentConfirm: (0, import_react$1.useCallback)((confirmed) => {
				const resolver = resolverRef.current;
				resolverRef.current = null;
				setRequest(null);
				resolver?.(confirmed);
			}, []),
			skillInstallIntentDialogProps: (0, import_react$1.useMemo)(() => {
				const skillName = request?.skillName || "";
				const isOverwrite = request?.kind === "overwrite";
				const confirmContent = isOverwrite ? t("skills.installConfirm.content.overwrite") : t("skills.installConfirm.content.install");
				return {
					visible: !!request,
					title: t("skills.installConfirm.title.common"),
					content: `「${skillName}」${confirmContent}`,
					confirmText: isOverwrite ? t("skills.installConfirm.confirm.overwrite") : t("skills.installConfirm.confirm.install"),
					cancelText: t("common.cancel"),
					confirmVariant: isOverwrite ? "danger" : "primary"
				};
			}, [request, t])
		};
	};
	createPendingScanResult = (md5) => ({
		md5,
		hashHit: false,
		threatLevel: 0,
		riskLevel: "safe",
		verdict: "",
		description: "",
		tags: [],
		fileAnalysis: [],
		virusName: []
	});
	SkillInstallIntentCoordinator = ({ adapter }) => {
		const t = useTranslation();
		const { facades: { personalSkills: personalSkillsFacade } } = useModuleHost();
		if (!personalSkillsFacade) throw new Error("[SkillInstallIntentCoordinator] personalSkills facade is not available");
		const personalSkills = personalSkillsFacade;
		const { reportEvent, Events } = useModuleHost().reporter;
		const { requestSkillInstallIntentConfirm, resolveSkillInstallIntentConfirm, skillInstallIntentDialogProps } = useSkillInstallIntentConfirm(t);
		const [securityState, setSecurityState] = (0, import_react$1.useState)(null);
		const [highRiskCountdown, setHighRiskCountdown] = (0, import_react$1.useState)(0);
		const reportInstallFlow = (0, import_react$1.useCallback)((stage, params) => {
			reportEvent(Events.SkillUrlInstallFlow, {
				stage,
				skill_name: params.skillName,
				skill_id: params.skill_id,
				skill_version: params.skill_version,
				channel_type: params.channelType || "unknown",
				confirmed: params.confirmed,
				overwrite: params.overwrite,
				error_key: params.errorKey,
				error_message: params.errorMessage,
				warning_key: params.warningKey,
				warning_message: params.warningMessage
			});
		}, [reportEvent, Events]);
		const reportInstallSucceeded = (0, import_react$1.useCallback)((skillName, channelType, overwrite = false, skillVersion, skillId) => {
			reportInstallFlow(SkillUrlInstallFlowStage.InstallSucceeded, {
				skillName,
				channelType,
				overwrite,
				skill_id: skillId,
				skill_version: skillVersion
			});
			reportEvent(Events.SkillInstalled, {
				name: skillName,
				skillId,
				skillVersion
			});
			reportEvent(Events.SkillAction, {
				name: skillName,
				skillId,
				skillVersion,
				action: "install",
				channelType: channelType || "wecom"
			});
		}, [
			Events,
			reportEvent,
			reportInstallFlow
		]);
		(0, import_react$1.useEffect)(() => {
			asyncSecurityScanService.setAdapter(adapter);
			asyncSecurityScanService.setPersonalSkillsFacade(personalSkills);
		}, [adapter, personalSkills]);
		const closeSecurityDialog = (0, import_react$1.useCallback)((cancelPendingTask) => {
			setSecurityState((prev) => {
				if (cancelPendingTask && prev?.scanResult.verdict === "" && prev.preCheck.md5) asyncSecurityScanService.removeTask(prev.preCheck.md5);
				return null;
			});
		}, []);
		const installByPathAfterSecurityCheck = (0, import_react$1.useCallback)(async (options) => {
			if (!securityState?.preCheck.selectedPath) return;
			const { isSkipScan, suppressSuccessToast = false } = options;
			const { detail, preCheck, installName, channelType, usedOverwrite } = securityState;
			const installPath = preCheck.selectedPath;
			const pendingMd5 = isSkipScan && preCheck.md5 ? preCheck.md5 : void 0;
			if (isSkipScan) closeSecurityDialog(false);
			console.info("[App][SkillInstallIntent][Security] installByPath start", {
				skillName: installName,
				channelType,
				usedOverwrite,
				isSkipScan,
				installPath,
				pendingMd5
			});
			reportInstallFlow(SkillUrlInstallFlowStage.InstallStarted, {
				skillName: installName,
				channelType,
				overwrite: usedOverwrite
			});
			try {
				const result = await personalSkills.installByPath({
					source: "userSettings",
					folderPath: installPath
				});
				if (!result.success) {
					if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
					reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
						skillName: installName,
						channelType,
						overwrite: usedOverwrite,
						errorKey: "installByPathFailed",
						errorMessage: result.error
					});
					showImportSkillError(result.error || "installFromUrlFailed");
					return;
				}
				let installedFilePath = "";
				let installedVersion;
				let installedSkillId;
				if (result.skillName) try {
					const matched = ((await personalSkills.list({
						cwd: "",
						global: false,
						excludePluginSkills: true
					})).results || []).find((skill) => skill.name === result.skillName);
					installedFilePath = matched?.filePath || "";
					installedVersion = matched?.version;
					installedSkillId = matched?.skillId;
				} catch {
					installedFilePath = "";
				}
				if (pendingMd5 && result.skillName) asyncSecurityScanService.updateTask(pendingMd5, {
					skillName: result.skillName,
					skillFilePath: installedFilePath
				});
				const finalSkillName = result.skillName || detail.skillName || installName;
				reportInstallSucceeded(finalSkillName, channelType, usedOverwrite, installedVersion, installedSkillId);
				if (isSkipScan) toast({
					message: t("skills.security.async.backgroundRunning"),
					type: "info"
				});
				else {
					closeSecurityDialog(false);
					if (!suppressSuccessToast) toast.success(`Skill ${finalSkillName} has been installed.`);
				}
			} catch (error) {
				if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
				reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
					skillName: installName,
					channelType,
					overwrite: usedOverwrite,
					errorKey: "exception",
					errorMessage: error instanceof Error ? error.message : "installFromUrlFailed"
				});
				showImportSkillError(error instanceof Error ? error.message : "installFromUrlFailed");
			}
		}, [
			adapter,
			closeSecurityDialog,
			reportInstallFlow,
			reportInstallSucceeded,
			securityState,
			t
		]);
		const isScanFailed = !!securityState?.preCheck.error && securityState.scanResult.verdict === "";
		const isPendingAsync = securityState?.scanResult.verdict === "" && !isScanFailed;
		useScanResultSubscription(isPendingAsync ? securityState?.preCheck.md5 || null : null, (0, import_react$1.useCallback)((result) => {
			setSecurityState((prev) => {
				if (!prev || prev.preCheck.md5 !== result.md5) return prev;
				return {
					...prev,
					scanResult: result
				};
			});
			if (result.verdict === "white") installByPathAfterSecurityCheck({
				isSkipScan: false,
				suppressSuccessToast: true
			}).catch(() => void 0);
		}, [installByPathAfterSecurityCheck]));
		const isRiskDialogVisible = !!securityState;
		const isSuspicious = securityState?.scanResult.verdict === "suspicious";
		const isHighRisk = !isPendingAsync && !isSuspicious && securityState?.scanResult.riskLevel === "high";
		(0, import_react$1.useEffect)(() => {
			if (!isHighRisk) {
				setHighRiskCountdown(0);
				return;
			}
			setHighRiskCountdown(5);
			const timer = setInterval(() => {
				setHighRiskCountdown((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						return 0;
					}
					return prev - 1;
				});
			}, 1e3);
			return () => clearInterval(timer);
		}, [
			isHighRisk,
			securityState?.scanResult.md5,
			securityState?.scanResult.verdict,
			securityState?.scanResult.riskLevel
		]);
		const handleRiskDialogConfirm = (0, import_react$1.useCallback)(() => {
			if (!securityState) return;
			if (isPendingAsync) {
				installByPathAfterSecurityCheck({ isSkipScan: true }).catch(() => void 0);
				return;
			}
			if (highRiskCountdown > 0) return;
			installByPathAfterSecurityCheck({ isSkipScan: false }).catch(() => void 0);
		}, [
			highRiskCountdown,
			installByPathAfterSecurityCheck,
			securityState
		]);
		const riskDialogProps = (0, import_react$1.useMemo)(() => {
			if (!securityState) return {
				title: "",
				content: "",
				confirmText: "",
				cancelText: "",
				confirmVariant: "primary"
			};
			if (isPendingAsync) return {
				title: t("skills.security.intent.pendingTitle"),
				content: t("skills.security.intent.pendingContent"),
				confirmText: t("skills.security.skipDirectInstall"),
				cancelText: t("skills.security.cancelInstall"),
				confirmVariant: "primary"
			};
			if (isScanFailed) {
				const tagsText = securityState.scanResult.tags.map((tag) => tag.desc || tag.tag).filter(Boolean).join("，");
				const combinedDesc = [
					securityState.scanResult.description,
					tagsText,
					securityState.preCheck.error
				].filter(Boolean).join("\n");
				return {
					title: t("skills.security.error"),
					content: combinedDesc || t("skills.security.deepAnalysisHint"),
					confirmText: t("skills.security.continueInstall"),
					cancelText: t("skills.security.cancelInstall"),
					confirmVariant: "danger"
				};
			}
			const titleKey = securityState.scanResult.verdict === "suspicious" ? "skills.security.verdict.grey" : `skills.security.result.${securityState.scanResult.riskLevel}`;
			const tagsText = securityState.scanResult.tags.map((tag) => tag.desc || tag.tag).filter(Boolean).join("，");
			const combinedDesc = [securityState.scanResult.description, tagsText].filter(Boolean).join("\n");
			return {
				title: t(titleKey),
				content: combinedDesc || t("skills.installConfirm.content.install"),
				confirmText: highRiskCountdown > 0 ? t("skills.security.confirmCountdown", { seconds: String(highRiskCountdown) }) : t("skills.security.continueInstall"),
				cancelText: t("skills.security.cancelInstall"),
				confirmVariant: "danger"
			};
		}, [
			highRiskCountdown,
			isPendingAsync,
			isScanFailed,
			securityState,
			t
		]);
		(0, import_react$1.useEffect)(() => {
			if (!adapter) return;
			const unsubscribe = adapter.on("skill-install-intent", async (data) => {
				const detail = data;
				if (!detail?.skillName || !detail?.downloadUrl) {
					console.warn("[App][SkillInstallIntent] ignore invalid intent payload", detail);
					reportInstallFlow(SkillUrlInstallFlowStage.InvalidIntentPayload, {
						skillName: detail?.skillName || "unknown",
						channelType: detail?.channelType,
						errorKey: "invalid_intent_payload",
						errorMessage: "Missing skillName or downloadUrl"
					});
					return;
				}
				console.info("[App][SkillInstallIntent] intent received", {
					skillName: detail.skillName,
					channelType: detail.channelType,
					hasPrompt: !!detail.prompt
				});
				reportInstallFlow(SkillUrlInstallFlowStage.IntentReceived, {
					skillName: detail.skillName,
					channelType: detail.channelType
				});
				if (!personalSkills?.installFromUrl) {
					console.warn("[App][SkillInstallIntent] installFromUrl is unavailable on current facade");
					reportInstallFlow(SkillUrlInstallFlowStage.AdapterCapabilityMissing, {
						skillName: detail.skillName,
						channelType: detail.channelType,
						errorKey: "adapter_capability_missing",
						errorMessage: "installSkillFromUrl is unavailable"
					});
					showImportSkillError("Install skill from URL is not available in current mode");
					return;
				}
				const installName = detail.skillName || "skill";
				const installConfirmed = await requestSkillInstallIntentConfirm("install", installName);
				console.info("[App][SkillInstallIntent] install confirm resolved", {
					skillName: installName,
					confirmed: installConfirmed
				});
				reportInstallFlow(SkillUrlInstallFlowStage.ConfirmResult, {
					skillName: installName,
					channelType: detail.channelType,
					confirmed: installConfirmed,
					overwrite: false
				});
				if (!installConfirmed) return;
				const runInstall = async (overwrite) => {
					reportInstallFlow(SkillUrlInstallFlowStage.InstallStarted, {
						skillName: detail.skillName,
						channelType: detail.channelType,
						overwrite
					});
					console.info("[App][SkillInstallIntent] install start", {
						skillName: detail.skillName,
						overwrite,
						channelType: detail.channelType
					});
					const installResult = await personalSkills.installFromUrl({
						skillName: detail.skillName,
						downloadUrl: detail.downloadUrl,
						channelType: detail.channelType,
						prompt: detail.prompt,
						overwrite,
						securityCheck: true
					});
					console.info("[App][SkillInstallIntent] install result", {
						skillName: installResult?.skillName || detail.skillName,
						overwrite,
						success: installResult?.success,
						errorKey: installResult?.errorKey,
						warningKey: installResult?.warningKey,
						hasPreCheck: !!installResult?.preCheck
					});
					return installResult;
				};
				try {
					let result = await runInstall(false);
					let usedOverwrite = false;
					if (!result?.success && result?.errorKey === "duplicateSkillName") {
						const duplicateName = result.skillName || installName;
						console.info("[App][SkillInstallIntent] duplicate skill detected, requesting overwrite confirm", { skillName: duplicateName });
						reportInstallFlow(SkillUrlInstallFlowStage.DuplicateDetected, {
							skillName: duplicateName,
							channelType: detail.channelType,
							overwrite: true
						});
						const overwriteConfirmed = await requestSkillInstallIntentConfirm("overwrite", duplicateName);
						console.info("[App][SkillInstallIntent] overwrite confirm resolved", {
							skillName: duplicateName,
							confirmed: overwriteConfirmed
						});
						reportInstallFlow(SkillUrlInstallFlowStage.ConfirmResult, {
							skillName: duplicateName,
							channelType: detail.channelType,
							confirmed: overwriteConfirmed,
							overwrite: true
						});
						if (!overwriteConfirmed) return;
						usedOverwrite = true;
						result = await runInstall(true);
					}
					if (!result?.success && result?.errorKey === "security_check_blocked" && result.preCheck) {
						const preCheck = result.preCheck;
						const scanResult = preCheck.scanResult || createPendingScanResult(preCheck.md5);
						console.info("[App][SkillInstallIntent][Security] blocked, opening risk dialog", {
							skillName: result.skillName || installName,
							md5: preCheck.md5,
							selectedPath: preCheck.selectedPath,
							verdict: scanResult.verdict,
							riskLevel: scanResult.riskLevel,
							hashHit: preCheck.hashHit
						});
						setSecurityState({
							detail,
							installName: result.skillName || installName,
							channelType: detail.channelType,
							usedOverwrite,
							preCheck,
							scanResult
						});
						if (preCheck.md5 && !scanResult.verdict) asyncSecurityScanService.addTask({
							md5: preCheck.md5,
							skillName: result.skillName || detail.skillName || "",
							skillFilePath: preCheck.selectedPath,
							startTime: Date.now()
						});
						return;
					}
					if (!result?.success) {
						console.warn("[App][SkillInstallIntent] install failed", {
							skillName: result?.skillName || installName,
							overwrite: usedOverwrite,
							errorKey: result?.errorKey,
							errorMessage: result?.errorMessage
						});
						reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
							skillName: result?.skillName || installName,
							channelType: detail.channelType,
							overwrite: usedOverwrite,
							errorKey: result?.errorKey,
							errorMessage: result?.errorMessage
						});
						showImportSkillError(result?.errorMessage || result?.errorKey || "installFromUrlFailed");
						return;
					}
					if (result.warningMessage || result.warningKey) {
						console.info("[App][SkillInstallIntent] install warning", {
							skillName: result.skillName || installName,
							warningKey: result.warningKey,
							warningMessage: result.warningMessage
						});
						reportInstallFlow(SkillUrlInstallFlowStage.InstallWarning, {
							skillName: result.skillName || installName,
							channelType: detail.channelType,
							overwrite: usedOverwrite,
							warningKey: result.warningKey,
							warningMessage: result.warningMessage
						});
						toast.info(result.warningMessage || result.warningKey || "Skill installed with warning.");
					}
					const finalSkillName = result.skillName || installName;
					console.info("[App][SkillInstallIntent] install succeeded", {
						skillName: finalSkillName,
						overwrite: usedOverwrite,
						channelType: detail.channelType
					});
					let urlInstalledVersion;
					let urlInstalledSkillId;
					try {
						const matched = ((await personalSkills.list({
							cwd: "",
							global: false,
							excludePluginSkills: true
						})).results || []).find((skill) => skill.name === finalSkillName);
						urlInstalledVersion = matched?.version;
						urlInstalledSkillId = matched?.skillId;
					} catch {}
					reportInstallSucceeded(finalSkillName, detail.channelType, usedOverwrite, urlInstalledVersion, urlInstalledSkillId);
					toast.success(`Skill ${finalSkillName} has been installed.`);
				} catch (error) {
					console.error("[App][SkillInstallIntent] install threw exception", {
						skillName: installName,
						error
					});
					reportInstallFlow(SkillUrlInstallFlowStage.InstallFailed, {
						skillName: installName,
						channelType: detail.channelType,
						errorKey: "exception",
						errorMessage: error instanceof Error ? error.message : "installFromUrlFailed"
					});
					showImportSkillError(error instanceof Error ? error.message : "installFromUrlFailed");
				}
			});
			return () => {
				unsubscribe();
			};
		}, [
			adapter,
			reportInstallFlow,
			requestSkillInstallIntentConfirm,
			reportInstallSucceeded
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
			visible: skillInstallIntentDialogProps.visible,
			title: skillInstallIntentDialogProps.title,
			content: skillInstallIntentDialogProps.content,
			confirmText: skillInstallIntentDialogProps.confirmText,
			cancelText: skillInstallIntentDialogProps.cancelText,
			confirmVariant: skillInstallIntentDialogProps.confirmVariant,
			onConfirm: () => {
				resolveSkillInstallIntentConfirm(true);
			},
			onClose: () => {
				resolveSkillInstallIntentConfirm(false);
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
			visible: isRiskDialogVisible,
			title: riskDialogProps.title,
			content: riskDialogProps.content,
			confirmText: riskDialogProps.confirmText,
			cancelText: riskDialogProps.cancelText,
			confirmVariant: riskDialogProps.confirmVariant,
			onConfirm: handleRiskDialogConfirm,
			onClose: () => closeSecurityDialog(true)
		})] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/services.tsx
function SkillsServices() {
	const adapter = useModuleHost().adapter;
	const { notifications: scanResultNotifications, handleUninstall, handleKeep } = useHighRiskNotification();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillInstallIntentCoordinator, { adapter }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazySkillScanResultDialog, {
			notifications: scanResultNotifications,
			onConfirmUninstall: handleUninstall,
			onClose: handleKeep
		})
	})] });
}
var import_react, import_jsx_runtime, LazySkillScanResultDialog;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_module_host_context();
	init_skill_install_intent_coordinator();
	init_use_high_risk_notification();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	LazySkillScanResultDialog = import_react.lazy(() => __vitePreload(() => import("./skill-scan-result-dialog-B3GK8TTL.js").then((m) => ({ default: m.SkillScanResultDialog })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]), import.meta.url));
}))();
export { SkillsServices };
