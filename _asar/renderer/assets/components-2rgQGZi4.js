const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jszip.min-BFuwQ38O.js","./jszip.min-BlT6AB6w.js","./chunk-BRZcfu7K.js","./dist-DNjXzICC.js","./dist-CSHw4oQX.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { $a as SECURITY_AUTO_INSTALL_CHANGE_EVENT, Kd as init_task_starter_store, Qa as ENABLE_SKILL_SECURITY_SCAN_KEY, Sc as init_app_providers, Tc as useAgentServices, Vd as createSkillMode$, al as init_keyword_match, co as init_use_disable_all_extensions, eo as SECURITY_AUTO_INSTALL_KEY, ol as textMatchesKeyword, ro as init_use_suite_auto_update_preference, to as init_skills_security_types } from "./agent-mail-CiuzbR2o.js";
import { m as getBuiltinMarketSkillId, n as init_common } from "./common-CwB_VqKR.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { C as AddMarketplaceModal, S as PluginDetail, Yr as toast, a as ScrollList, k as Checkbox, ni as ConfirmDialog, oi as MarkdownRenderer, t as init_src, za as Button } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as require_client } from "./client-BPkZUIji.js";
import { b as isWorkBuddyDesktop, p as init_environment } from "./environment-DKqg3f0G.js";
import { a as init_i18n, n as getLocale, u as t } from "./i18n-Bt_Wap4p.js";
import { D as useAccountService, E as init_auth_context, t as init_contexts, xt as useConversations } from "./contexts-D7XKqa2J.js";
import { n as useTheme, t as init_useTheme } from "./useTheme-KZ-Qaric.js";
import { T as Checkbox$1, t as init_foundation } from "./foundation-QOglV606.js";
import { n as useI18n, r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as BehaviorSubject, n as init__esm5 } from "./_esm5-RYAsZ7Wr.js";
import { ct as useSkillHubFeature, t as init_product_features } from "./product-features-N4Z0q4SS.js";
import { t as init_common$1 } from "./common-Czfscgga.js";
import { i as useModuleHost } from "./module-host-context-CI9spvhq.js";
import { R as McpIcon, r as init_icons } from "./oauth-callback-IQ0UCaVX.js";
import { a as useScanResultSubscription, d as notifySkillListRefresh, f as setUploadModalVisible, i as init_use_scan_result_subscription, n as init_skill_import_errors, o as asyncSecurityScanService, p as skillListRefresh$, s as init_async_security_scan_service, t as getLocalizedImportSkillError, u as init_high_risk_notification_store, y as pluginListRefresh$ } from "./skill-import-errors-BlMOiDaZ.js";
import { $ as getLocalizedDescription, H as SKILLS_CACHE_KEY_FEATURED, J as buildFallbackSkillMarkdown, K as SKILLS_WARNING_DISMISSED_KEY, M as getFilePathSafe, N as init_skills_utils, P as isNewerVersion, Q as formatNumber, R as PLUGINS_CACHE_KEY_INSTALLED, U as SKILLS_CACHE_KEY_FEATURED_TS, V as SKILLS_CACHE_KEY_BUILTIN_MARKET, W as SKILLS_CACHE_KEY_INSTALLED, Y as buildSkillMarkdownWithMeta, Z as extractExamplesFromMarkdown, et as init_types, ht as writeCache, j as fetchLatestVersions, k as init_use_skills_update_badge, mt as readCache, nt as parseFrontmatter, pt as init_local_cache, q as SORT_OPTIONS, rt as pickLocalizedExamples, tt as normalizeSkill, z as SKILLHUB_CACHE_KEY_CATEGORIES } from "./center-Cjtv6Q1N.js";
import { n as init_format_bytes, t as formatBytes } from "./format-bytes-CfLBp0EL.js";
import { C as CategoryChip, S as init_skills_icons, _ as EyeIcon, a as getBuiltinMarketDisplayName, b as StarIcon, c as init_skill_card_helpers, d as pluginToCardProps, f as BackIcon, g as DownloadIcon, h as CodeIcon, i as builtinMarketSkillToCardProps, l as installedPluginToCardProps, m as CloseCircleIcon, n as SkillCardSkeleton, o as getInstalledSkillDisplayName, p as CheckCircleIcon, r as init_skill_card, s as hubSkillToCardProps, t as SkillCard, u as installedSkillToCardProps, v as MoreIcon, w as init_category_chip, x as TrashIcon, y as SettingsIcon } from "./skill-card-BX-gt0I0.js";
import { t as init_context } from "./context-2xODbZdo.js";
import { t as require_jszip_min } from "./jszip.min-BlT6AB6w.js";
//#region ../../packages/agent-ui/src/hooks/use-delayed-visible.ts
/**
* Returns `true` only after `trigger` has been `true` for at least `delayMs` milliseconds.
* Resets immediately when `trigger` becomes `false`.
*/
function useDelayedVisible(trigger, delayMs) {
	const [visible, setVisible] = (0, import_react$40.useState)(false);
	(0, import_react$40.useEffect)(() => {
		if (!trigger) {
			setVisible(false);
			return;
		}
		const timer = setTimeout(() => {
			setVisible(true);
		}, delayMs);
		return () => {
			clearTimeout(timer);
		};
	}, [trigger, delayMs]);
	return visible;
}
var import_react$40;
var init_use_delayed_visible = __esmMin((() => {
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
})), import_jsx_runtime$20, PluginDetailView;
var init_plugin_detail_view = __esmMin((() => {
	init_src();
	require_react();
	init_i18n();
	init_environment();
	import_jsx_runtime$20 = require_jsx_runtime();
	PluginDetailView = ({ data, selectedPlugin }) => {
		const { handleBackFromDetail, handleInstallPlugin, handleUninstallPlugin, handleTogglePluginStatus, handleUpdatePlugin, handleOpenPluginInFolder, handleOpenPluginHomepage, hasProjectPath, setDiscoverTab, currentPluginMarketplace, handlePluginMarketplaceChange, t } = data;
		const isDesktop = isWorkBuddyDesktop();
		return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(PluginDetail, {
			plugin: selectedPlugin,
			isZhLocale: getLocale() !== "en",
			userScopeOnly: true,
			hideToggleInMenu: true,
			backText: t("skills.title"),
			onBack: handleBackFromDetail,
			onUpdate: isDesktop ? handleUpdatePlugin : void 0,
			onToggleStatus: handleTogglePluginStatus,
			onUninstall: handleUninstallPlugin,
			onInstall: handleInstallPlugin,
			onOpenInFolder: isDesktop ? handleOpenPluginInFolder : void 0,
			onOpenHomepage: handleOpenPluginHomepage,
			hasProjectPath,
			onMarketplaceClick: (marketplaceName) => {
				handleBackFromDetail();
				setDiscoverTab("plugins");
				if (currentPluginMarketplace !== marketplaceName) handlePluginMarketplaceChange(marketplaceName);
			}
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/upload-modal.less
var init_upload_modal$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/security-warning-block.tsx
var import_react$38, import_jsx_runtime$19, HIGH_RISK_COUNTDOWN_SECONDS, SecurityWarningBlock, SecurityWarningActions, RiskInfoBlock, RiskActions;
var init_security_warning_block = __esmMin((() => {
	import_react$38 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$19 = require_jsx_runtime();
	HIGH_RISK_COUNTDOWN_SECONDS = 5;
	SecurityWarningBlock = ({ scanResult, t }) => {
		if (scanResult.verdict === "") return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(RiskInfoBlock, {
			scanResult,
			t
		});
	};
	SecurityWarningActions = ({ scanResult, onCancel, onConfirmInstall, onSkipScan, t }) => {
		if (scanResult.verdict === "") return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
			className: "skill-security-warning-actions skill-security-warning-actions--center",
			children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("button", {
				type: "button",
				className: "skill-security-warning-btn skill-security-warning-btn--skip",
				onClick: onSkipScan,
				children: t("skills.security.skipDirectInstall")
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(RiskActions, {
			scanResult,
			onCancel,
			onConfirmInstall,
			t
		});
	};
	RiskInfoBlock = ({ scanResult, t }) => {
		const isSuspicious = scanResult.verdict === "suspicious";
		const riskLevelClass = isSuspicious ? "skill-security-warning--suspicious" : `skill-security-warning--${scanResult.riskLevel}`;
		const titleKey = isSuspicious ? "skills.security.verdict.grey" : `skills.security.result.${scanResult.riskLevel}`;
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
			className: `skill-security-warning ${riskLevelClass}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
					className: "skill-security-warning-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
						className: "skill-security-warning-icon",
						children: "⚠"
					}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
						className: "skill-security-warning-title",
						children: t(titleKey)
					})]
				}),
				scanResult.description && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("p", {
					className: "skill-security-warning-desc",
					children: scanResult.description
				}),
				scanResult.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("div", {
					className: "skill-security-warning-tags",
					children: scanResult.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
						className: "skill-security-warning-tag",
						children: tag.desc || tag.tag
					}, tag.tag))
				})
			]
		});
	};
	RiskActions = ({ scanResult, onCancel, onConfirmInstall, t }) => {
		const isHighRisk = !(scanResult.verdict === "suspicious") && scanResult.riskLevel === "high";
		const [countdown, setCountdown] = (0, import_react$38.useState)(isHighRisk ? HIGH_RISK_COUNTDOWN_SECONDS : 0);
		(0, import_react$38.useEffect)(() => {
			if (!isHighRisk) {
				setCountdown(0);
				return;
			}
			setCountdown(HIGH_RISK_COUNTDOWN_SECONDS);
			const timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						return 0;
					}
					return prev - 1;
				});
			}, 1e3);
			return () => clearInterval(timer);
		}, [isHighRisk, scanResult]);
		const handleConfirm = (0, import_react$38.useCallback)(() => {
			if (countdown > 0) return;
			onConfirmInstall();
		}, [countdown, onConfirmInstall]);
		const confirmDisabled = countdown > 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
			className: "skill-security-warning-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("button", {
				type: "button",
				className: "skill-security-warning-btn skill-security-warning-btn--confirm",
				disabled: confirmDisabled,
				onClick: handleConfirm,
				children: confirmDisabled ? t("skills.security.confirmCountdown", { seconds: String(countdown) }) : t("skills.security.continueInstall")
			}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("button", {
				type: "button",
				className: "skill-security-warning-btn skill-security-warning-btn--cancel",
				onClick: onCancel,
				children: t("skills.security.cancelInstall")
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/upload-modal.tsx
/** 4 个 reason 映射到对应 i18n key（与 `use-installed-skills.ts` 一致）。 */
function policyReasonKey(reason) {
	switch (reason) {
		case "DISABLED": return "skills.upload.policy.disabled";
		case "NOT_IN_WHITELIST": return "skills.upload.policy.notInWhitelist";
		case "IN_BLACKLIST": return "skills.upload.policy.inBlacklist";
		default: return "skills.upload.policy.invalidMode";
	}
}
var import_react_dom$2, import_jsx_runtime$18, UploadModal;
var init_upload_modal = __esmMin((() => {
	init_upload_modal$1();
	init_src();
	require_react();
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_format_bytes();
	init_security_warning_block();
	import_jsx_runtime$18 = require_jsx_runtime();
	UploadModal = ({ isDraggingOver, showUploadOverlay, scanEnabled, autoInstallNonHighRisk, onAutoInstallNonHighRiskChange, uploadScanResult, policy, onClose, onConfirm, useWindowsStyleDesktopPick, onConfirmZip, onDragOver, onDragLeave, onDrop, onCancelScanResult, onConfirmRiskyInstall, onSkipScan, t }) => {
		const hasVerdict = !!uploadScanResult?.verdict;
		const isSecurityScanning = showUploadOverlay && scanEnabled || uploadScanResult && !hasVerdict;
		const policyBlocked = policy?.allowed === false;
		const dropZoneDisabled = isSecurityScanning || policyBlocked;
		return import_react_dom$2.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
			className: "skill-upload-modal-overlay",
			onClick: onClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "skill-upload-modal",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "skill-upload-modal-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: t("skills.upload.modal.title") }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
							type: "button",
							className: "skill-upload-modal-close",
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
									d: "M12 4L4 12M4 4l8 8",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						})]
					}),
					policyBlocked && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "skill-upload-requirements-list-item",
						style: {
							color: "var(--cb-error-foreground)",
							padding: "8px 12px"
						},
						role: "alert",
						children: t(policyReasonKey(policy?.reason))
					}),
					!hasVerdict && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: [
							"skill-upload-drop-zone",
							isDraggingOver && "skill-upload-drop-zone--dragging",
							dropZoneDisabled && "skill-upload-drop-zone--disabled"
						].filter(Boolean).join(" "),
						onClick: dropZoneDisabled ? void 0 : onConfirm,
						onDragOver: dropZoneDisabled ? void 0 : onDragOver,
						onDragLeave: dropZoneDisabled ? void 0 : onDragLeave,
						onDrop: dropZoneDisabled ? void 0 : onDrop,
						"aria-disabled": policyBlocked || void 0,
						title: policyBlocked ? t(policyReasonKey(policy?.reason)) : void 0,
						children: [
							(showUploadOverlay || uploadScanResult && !hasVerdict) && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
								className: "skill-upload-overlay",
								children: scanEnabled ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
									className: "skill-upload-overlay-icon",
									children: "⏳"
								}), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
									className: "skill-upload-overlay-text",
									children: t("skills.upload.modal.securityChecking")
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", { className: "skill-upload-overlay-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
									className: "skill-upload-overlay-text",
									children: t("skills.upload.modal.uploadingText")
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
								className: "skill-upload-drop-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("svg", {
									width: "32",
									height: "32",
									viewBox: "0 0 32 32",
									fill: "none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("rect", {
											x: "3",
											y: "6",
											width: "26",
											height: "20",
											rx: "2",
											stroke: "currentColor",
											strokeWidth: "1.6",
											fill: "none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
											d: "M3 11h26",
											stroke: "currentColor",
											strokeWidth: "1.6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
											d: "M10 6V3M22 6V3",
											stroke: "currentColor",
											strokeWidth: "1.6",
											strokeLinecap: "round"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
											d: "M16 17v5M13 20l3-3 3 3",
											stroke: "currentColor",
											strokeWidth: "1.6",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
								className: "skill-upload-drop-title",
								children: isDraggingOver ? t("skills.upload.modal.dragging") : t("skills.upload.modal.dropTitle")
							})
						]
					}),
					isSecurityScanning && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "skill-upload-requirements-list-item",
						children: t("skills.security.intent.pendingContent")
					}),
					scanEnabled && !hasVerdict && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Checkbox, {
						checked: autoInstallNonHighRisk,
						onChange: (checked) => onAutoInstallNonHighRiskChange?.(checked),
						label: t("skills.security.autoInstall")
					}),
					uploadScanResult && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(SecurityWarningBlock, {
						scanResult: uploadScanResult,
						t
					}),
					uploadScanResult && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(SecurityWarningActions, {
						scanResult: uploadScanResult,
						onCancel: onCancelScanResult,
						onConfirmInstall: onConfirmRiskyInstall,
						onSkipScan,
						t
					}),
					!showUploadOverlay && !uploadScanResult && /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
						className: "skill-upload-requirements",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
								className: "skill-upload-requirements-title",
								children: t("skills.upload.modal.requirementsTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("ul", {
								className: "skill-upload-requirements-list",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("li", {
										className: "skill-upload-requirements-list-item",
										children: t("skills.upload.modal.requirementFolder")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("li", {
										className: "skill-upload-requirements-list-item",
										children: t("skills.upload.modal.requirementMd")
									}),
									policy && policy.max_size_bytes > 0 && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("li", {
										className: "skill-upload-requirements-list-item",
										children: t("skills.upload.policy.tooLarge", { limit: formatBytes(policy.max_size_bytes) })
									})
								]
							}),
							useWindowsStyleDesktopPick && onConfirmZip && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
								type: "button",
								className: "skill-upload-pick-zip-link",
								onClick: onConfirmZip,
								children: t("skills.upload.modal.pickZipFile")
							})
						]
					})
				]
			})
		}), document.body);
	};
})), import_react_dom$1, import_jsx_runtime$17, BatchUpdateModal;
var init_batch_update_modal = __esmMin((() => {
	init_src();
	require_react();
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	import_jsx_runtime$17 = require_jsx_runtime();
	BatchUpdateModal = ({ visible, updatableSkills, updating, onClose, onConfirm, t }) => {
		if (!visible || updatableSkills.length === 0) return null;
		return import_react_dom$1.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
			className: "skill-batch-update-modal-overlay",
			onClick: onClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "skill-batch-update-modal",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "skill-batch-update-modal-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", { children: t("skills.batchUpdate.title") }), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("button", {
							type: "button",
							className: "skill-batch-update-modal-close",
							onClick: onClose,
							disabled: updating,
							children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
									d: "M12 4L4 12M4 4l8 8",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "skill-batch-update-modal-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("p", {
							className: "skill-batch-update-description",
							children: t("skills.batchUpdate.description", { count: String(updatableSkills.length) })
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("ul", {
							className: "skill-batch-update-list",
							children: updatableSkills.map(({ skill, currentVersion, latestVersion }) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("li", {
								className: "skill-batch-update-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
									className: "skill-batch-update-item-name",
									children: skill.name
								}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
									className: "skill-batch-update-item-version",
									children: currentVersion ? `${currentVersion} → ${latestVersion}` : latestVersion
								})]
							}, skill.name))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
						className: "skill-batch-update-modal-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Button, {
							variant: "secondary",
							onClick: onClose,
							disabled: updating,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Button, {
							variant: "primary",
							onClick: onConfirm,
							disabled: updating,
							style: { backgroundColor: "#4cd964" },
							children: updating ? t("skills.batchUpdate.updating") : t("skills.batchUpdate.confirmUpdate")
						})]
					})
				]
			})
		}), document.body);
	};
})), import_jsx_runtime$16, BatchUninstallConfirmModal;
var init_batch_uninstall_confirm_modal = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$16 = require_jsx_runtime();
	BatchUninstallConfirmModal = ({ visible, count, onCancel, onConfirm, theme, t }) => {
		if (count <= 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(ConfirmDialog, {
			visible,
			theme,
			showCloseButton: true,
			title: t("skills.batchUninstall.title"),
			content: t("skills.batchUninstall.description", { count: String(count) }),
			confirmText: t("skills.batchUninstall.confirm"),
			cancelText: t("common.cancel"),
			onClose: onCancel,
			onConfirm
		});
	};
})), import_react_dom, import_jsx_runtime$15, ModifiedSkillUpdateConfirmModal;
var init_modified_skill_update_confirm_modal = __esmMin((() => {
	init_src();
	require_react();
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	import_jsx_runtime$15 = require_jsx_runtime();
	ModifiedSkillUpdateConfirmModal = ({ visible, onCancel, onConfirm, t }) => {
		if (!visible) return null;
		return import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
			className: "skill-batch-update-modal-overlay",
			onClick: onCancel,
			children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
				className: "skill-batch-update-modal",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
						className: "skill-batch-update-modal-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", { children: t("skills.update.modifiedConfirm.title") }), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("button", {
							type: "button",
							className: "skill-batch-update-modal-close",
							onClick: onCancel,
							children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("path", {
									d: "M12 4L4 12M4 4l8 8",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
						className: "skill-batch-update-modal-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("p", {
							className: "skill-batch-update-description",
							children: t("skills.update.modifiedConfirm.desc")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
						className: "skill-batch-update-modal-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Button, {
							variant: "secondary",
							onClick: onCancel,
							children: t("skills.update.modifiedConfirm.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(Button, {
							variant: "primary",
							onClick: onConfirm,
							children: t("skills.update.modifiedConfirm.confirm")
						})]
					})
				]
			})
		}), document.body);
	};
})), import_jsx_runtime$14, SkillDetailView;
var init_skill_detail_view = __esmMin((() => {
	init_src();
	require_react();
	init_i18n();
	init_environment();
	init_types();
	init_skill_card_helpers();
	init_skills_icons();
	import_jsx_runtime$14 = require_jsx_runtime();
	SkillDetailView = ({ data }) => {
		const isDesktop = isWorkBuddyDesktop();
		const { selectedSkill, selectedHubSkill, skillPreviewMode, setSkillPreviewMode, showDeleteSkillConfirm, setShowDeleteSkillConfirm, openMoreMenu, setOpenMoreMenu, skillContentLoading, skillDetailMarkdown, moreMenuRef, handleBackFromDetail, handleToggleSkill, handleDeleteSkill, handleOpenSkillInFolder, handleInstallHubSkill, handleUpdateHubSkill, handleInstallKnotSkill, handleInstallBuiltinMarketSkill, handleUpdateBuiltinMarketSkill, handleInstallEnterpriseSkill, getHubInstallBtnState, getKnotInstallBtnState, getBuiltinMarketInstallBtnState, isEnterpriseSkillInstalled, isEnterpriseSkillInstalling, handleTrySkill, installedSkills, t } = data;
		const hubSlug = selectedHubSkill?.slug;
		const isEnterpriseSkill = !!selectedHubSkill && selectedHubSkill.source === "custom";
		const isBuiltinMarketSkill = !!selectedHubSkill && !isEnterpriseSkill && typeof hubSlug !== "string";
		const isKnotSkill = !!selectedHubSkill && !isEnterpriseSkill && !isBuiltinMarketSkill && typeof selectedHubSkill.id === "number";
		const isEn = getLocale() === "en";
		let detailSkillName;
		let detailSkillDesc;
		if (selectedSkill) {
			detailSkillName = getInstalledSkillDisplayName(selectedSkill);
			detailSkillDesc = getLocalizedDescription(selectedSkill);
		} else if (selectedHubSkill) if (isEnterpriseSkill) {
			const es = selectedHubSkill;
			detailSkillName = isEn ? es.display_name_en || es.display_name_zh || es.name || "" : es.display_name_zh || es.display_name_en || es.name || "";
			detailSkillDesc = isEn ? es.description_en || es.description_zh || "" : es.description_zh || es.description_en || "";
		} else if (isBuiltinMarketSkill) {
			const bm = selectedHubSkill;
			detailSkillName = getBuiltinMarketDisplayName(bm) || "";
			detailSkillDesc = isEn ? bm.description_en || bm.description || bm.description_zh || "" : bm.description_zh || bm.description || bm.description_en || "";
		} else {
			detailSkillName = selectedHubSkill.name || "";
			detailSkillDesc = (isEn ? selectedHubSkill.description : selectedHubSkill.description_zh) || "";
		}
		else {
			detailSkillName = "";
			detailSkillDesc = "";
		}
		const isRecommendedSkill = selectedSkill?.filePath?.startsWith("marketplace://");
		const recommendedSkillInstalledSkill = isRecommendedSkill && selectedSkill ? installedSkills.find((s) => s.name === selectedSkill.name) : null;
		const isRecommendedSkillInstalled = !!recommendedSkillInstalledSkill;
		let hubSkillInstalledSkill = null;
		if (selectedHubSkill) if (isEnterpriseSkill || isBuiltinMarketSkill) {
			const slugKey = selectedHubSkill.name?.toLowerCase();
			const descKey = selectedHubSkill.description?.toLowerCase();
			const dispZhKey = selectedHubSkill.display_name_zh?.toLowerCase();
			const dispEnKey = selectedHubSkill.display_name_en?.toLowerCase();
			const idKey = selectedHubSkill.id;
			const idStr = typeof idKey === "string" ? idKey.toLowerCase() : void 0;
			hubSkillInstalledSkill = installedSkills.find((s) => {
				const n = s.name?.toLowerCase();
				if (!n) return false;
				if (n === slugKey || n === descKey || n === dispZhKey || n === dispEnKey) return true;
				if (idStr && s.skillId?.toLowerCase() === idStr) return true;
				return false;
			}) || null;
		} else {
			const hubSlugStr = typeof hubSlug === "string" ? hubSlug : void 0;
			hubSkillInstalledSkill = installedSkills.find((s) => s.name === selectedHubSkill.name || !!hubSlugStr && s.slug === hubSlugStr) || null;
		}
		const isEnterpriseInstalled = !!selectedHubSkill && isEnterpriseSkill && isEnterpriseSkillInstalled(selectedHubSkill);
		const isHubSkillInstalled = !!hubSkillInstalledSkill || isEnterpriseInstalled;
		const enterpriseBtnState = isEnterpriseSkill && selectedHubSkill ? isEnterpriseSkillInstalling(selectedHubSkill) ? {
			label: t("skills.skillhub.installing"),
			disabled: true,
			variant: "installing"
		} : isEnterpriseInstalled ? {
			label: t("skills.skillhub.installed"),
			disabled: true,
			variant: "installed"
		} : {
			label: t("skills.skillhub.install"),
			disabled: false,
			variant: "install"
		} : null;
		const hubBtnState = selectedHubSkill ? isEnterpriseSkill ? enterpriseBtnState : isBuiltinMarketSkill ? getBuiltinMarketInstallBtnState(selectedHubSkill) : isKnotSkill ? getKnotInstallBtnState(selectedHubSkill) : getHubInstallBtnState(selectedHubSkill) : null;
		const handleHubInstallClick = () => {
			if (!selectedHubSkill) return;
			if (isEnterpriseSkill) handleInstallEnterpriseSkill(selectedHubSkill);
			else if (isBuiltinMarketSkill) handleInstallBuiltinMarketSkill(selectedHubSkill);
			else if (isKnotSkill) handleInstallKnotSkill(selectedHubSkill);
			else handleInstallHubSkill(selectedHubSkill);
		};
		const handleHubUpdateClick = () => {
			if (!selectedHubSkill) return;
			if (isEnterpriseSkill) handleInstallEnterpriseSkill(selectedHubSkill);
			else if (isBuiltinMarketSkill) handleUpdateBuiltinMarketSkill(selectedHubSkill);
			else if (isKnotSkill) handleInstallKnotSkill(selectedHubSkill);
			else handleUpdateHubSkill(selectedHubSkill);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			className: "skill-detail-view",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("button", {
					type: "button",
					className: "skill-detail-back",
					onClick: handleBackFromDetail,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(BackIcon, {}),
						" ",
						t("skills.title")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: "skill-detail-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
							className: "skill-detail-header-main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("h2", { children: detailSkillName }),
								selectedSkill && isRecommendedSkill && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
									className: "skill-detail-actions",
									children: isRecommendedSkillInstalled && recommendedSkillInstalledSkill ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
										!recommendedSkillInstalledSkill.disable && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
											type: "button",
											className: "skillhub-install-btn skillhub-install-btn--secondary",
											onClick: () => {
												const examples = pickLocalizedExamples(selectedSkill) ?? pickLocalizedExamples(recommendedSkillInstalledSkill) ?? pickLocalizedExamples(extractExamplesFromMarkdown(skillDetailMarkdown));
												const stableId = recommendedSkillInstalledSkill.skillId ?? recommendedSkillInstalledSkill.name;
												handleTrySkill(recommendedSkillInstalledSkill.name, examples, recommendedSkillInstalledSkill.name, stableId);
											},
											"data-track-id": "skill_post_install_try",
											"data-track-name": "安装后去试试",
											"data-track-props": JSON.stringify({ source: recommendedSkillInstalledSkill.name }),
											children: t("skills.toast.trySkill")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
											className: "skill-toggle",
											...!recommendedSkillInstalledSkill.disable ? {
												"data-track-id": "skill_post_install_dismiss",
												"data-track-name": "安装后关闭",
												"data-track-props": JSON.stringify({ source: recommendedSkillInstalledSkill.name })
											} : {},
											children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
												type: "checkbox",
												checked: !recommendedSkillInstalledSkill.disable,
												onChange: (e) => handleToggleSkill(recommendedSkillInstalledSkill.filePath, e.target.checked)
											}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { className: "skill-toggle-slider" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
											className: "skill-detail-more",
											ref: moreMenuRef,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
												type: "button",
												className: "skill-detail-more-btn",
												onClick: () => setOpenMoreMenu(!openMoreMenu),
												children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(MoreIcon, {})
											}), openMoreMenu && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
												className: "skill-detail-dropdown",
												children: [isDesktop && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
													className: "skill-detail-dropdown-item",
													onClick: () => {
														setOpenMoreMenu(false);
														handleOpenSkillInFolder(recommendedSkillInstalledSkill);
													},
													children: t("skills.openInFolder")
												}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
													className: "skill-detail-dropdown-item skill-detail-dropdown-item--danger",
													onClick: () => {
														setOpenMoreMenu(false);
														setShowDeleteSkillConfirm(true);
													},
													"data-track-id": "skill_action",
													"data-track-name": "卸载技能",
													"data-track-props": JSON.stringify({
														source: recommendedSkillInstalledSkill.name,
														type: "uninstall"
													}),
													children: t("skills.uninstall")
												})]
											})]
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
										type: "button",
										className: "skillhub-install-btn skillhub-install-btn--primary",
										onClick: () => handleInstallBuiltinMarketSkill(selectedSkill),
										"data-track-id": "skill_action",
										"data-track-name": "详情页安装技能",
										"data-track-props": JSON.stringify({
											source: selectedSkill.slug || selectedSkill.name,
											type: "install",
											mode: "detail"
										}),
										children: t("skills.skillhub.install")
									})
								}),
								selectedSkill && !isRecommendedSkill && selectedSkill.source !== "builtin" && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
									className: "skill-detail-actions",
									children: [
										!selectedSkill.disable && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
											type: "button",
											className: "skillhub-install-btn skillhub-install-btn--secondary",
											onClick: () => {
												const examples = pickLocalizedExamples(selectedSkill) ?? pickLocalizedExamples(extractExamplesFromMarkdown(skillDetailMarkdown));
												const stableId = selectedSkill.skillId ?? selectedSkill.name;
												handleTrySkill(selectedSkill.name, examples, selectedSkill.name, stableId);
											},
											"data-track-id": "skill_post_install_try",
											"data-track-name": "安装后去试试",
											"data-track-props": JSON.stringify({ source: selectedSkill.name }),
											children: t("skills.toast.trySkill")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
											className: "skill-toggle",
											...!selectedSkill.disable ? {
												"data-track-id": "skill_post_install_dismiss",
												"data-track-name": "安装后关闭",
												"data-track-props": JSON.stringify({ source: selectedSkill.name })
											} : {},
											children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
												type: "checkbox",
												checked: !selectedSkill.disable,
												onChange: (e) => handleToggleSkill(selectedSkill.filePath, e.target.checked)
											}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { className: "skill-toggle-slider" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
											className: "skill-detail-more",
											ref: moreMenuRef,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
												type: "button",
												className: "skill-detail-more-btn",
												onClick: () => setOpenMoreMenu(!openMoreMenu),
												children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(MoreIcon, {})
											}), openMoreMenu && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
												className: "skill-detail-dropdown",
												children: [isDesktop && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
													className: "skill-detail-dropdown-item",
													onClick: () => {
														setOpenMoreMenu(false);
														handleOpenSkillInFolder(selectedSkill);
													},
													children: t("skills.openInFolder")
												}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
													className: "skill-detail-dropdown-item skill-detail-dropdown-item--danger",
													onClick: () => {
														setOpenMoreMenu(false);
														setShowDeleteSkillConfirm(true);
													},
													"data-track-id": "skill_action",
													"data-track-name": "卸载技能",
													"data-track-props": JSON.stringify({
														source: selectedSkill.name,
														type: "uninstall"
													}),
													children: t("skills.uninstall")
												})]
											})]
										})
									]
								}),
								selectedHubSkill && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
									className: "skill-detail-actions",
									children: isHubSkillInstalled && hubSkillInstalledSkill ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [
										hubBtnState && (hubBtnState.variant === "update" || hubBtnState.variant === "installing") && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
											type: "button",
											className: `skillhub-install-btn skillhub-install-btn--${hubBtnState.variant}`,
											disabled: hubBtnState.disabled,
											onClick: handleHubUpdateClick,
											children: hubBtnState.label
										}),
										!hubSkillInstalledSkill.disable && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
											type: "button",
											className: "skillhub-install-btn skillhub-install-btn--secondary",
											onClick: () => {
												const examples = pickLocalizedExamples(selectedHubSkill) ?? pickLocalizedExamples(hubSkillInstalledSkill) ?? pickLocalizedExamples(extractExamplesFromMarkdown(skillDetailMarkdown));
												const displayText = isBuiltinMarketSkill || isEnterpriseSkill ? detailSkillName || hubSkillInstalledSkill.name : hubSkillInstalledSkill.name;
												const stableId = hubSkillInstalledSkill.skillId ?? hubSkillInstalledSkill.name;
												handleTrySkill(hubSkillInstalledSkill.name, examples, displayText, stableId);
											},
											"data-track-id": "skill_post_install_try",
											"data-track-name": "安装后去试试",
											"data-track-props": JSON.stringify({ source: hubSkillInstalledSkill.name }),
											children: t("skills.toast.trySkill")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
											className: "skill-toggle",
											...!hubSkillInstalledSkill.disable ? {
												"data-track-id": "skill_post_install_dismiss",
												"data-track-name": "安装后关闭",
												"data-track-props": JSON.stringify({ source: hubSkillInstalledSkill.name })
											} : {},
											children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
												type: "checkbox",
												checked: !hubSkillInstalledSkill.disable,
												onChange: (e) => handleToggleSkill(hubSkillInstalledSkill.filePath, e.target.checked)
											}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { className: "skill-toggle-slider" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
											className: "skill-detail-more",
											ref: moreMenuRef,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
												type: "button",
												className: "skill-detail-more-btn",
												onClick: () => setOpenMoreMenu(!openMoreMenu),
												children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(MoreIcon, {})
											}), openMoreMenu && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
												className: "skill-detail-dropdown",
												children: [isDesktop && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
													className: "skill-detail-dropdown-item",
													onClick: () => {
														setOpenMoreMenu(false);
														handleOpenSkillInFolder(hubSkillInstalledSkill);
													},
													children: t("skills.openInFolder")
												}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
													className: "skill-detail-dropdown-item skill-detail-dropdown-item--danger",
													onClick: () => {
														setOpenMoreMenu(false);
														setShowDeleteSkillConfirm(true);
													},
													"data-track-id": "skill_action",
													"data-track-name": "卸载技能",
													"data-track-props": JSON.stringify({
														source: hubSkillInstalledSkill.name,
														type: "uninstall"
													}),
													children: t("skills.uninstall")
												})]
											})]
										})
									] }) : hubBtnState && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
										type: "button",
										className: `skillhub-install-btn skillhub-install-btn--${hubBtnState.variant}`,
										disabled: hubBtnState.disabled,
										onClick: handleHubInstallClick,
										"data-track-id": "skill_action",
										"data-track-name": "详情页安装技能",
										"data-track-props": JSON.stringify({
											source: typeof hubSlug === "string" && hubSlug ? hubSlug : selectedHubSkill.name || "",
											type: "install",
											mode: "detail"
										}),
										children: hubBtnState.label
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("p", { children: detailSkillDesc }),
						selectedHubSkill && (selectedHubSkill.downloads > 0 || selectedHubSkill.stars > 0) && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
							className: "skill-detail-stats",
							children: [selectedHubSkill.downloads > 0 && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("span", {
								className: "skill-card-stat",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DownloadIcon, {}),
									" ",
									formatNumber(selectedHubSkill.downloads)
								]
							}), selectedHubSkill.stars > 0 && /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("span", {
								className: "skill-card-stat",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(StarIcon, {}),
									" ",
									formatNumber(selectedHubSkill.stars)
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
					className: "skill-detail-content-box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
						className: "skill-detail-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
							type: "button",
							className: skillPreviewMode === "preview" ? "active" : "",
							onClick: () => setSkillPreviewMode("preview"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(EyeIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("button", {
							type: "button",
							className: skillPreviewMode === "code" ? "active" : "",
							onClick: () => setSkillPreviewMode("code"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(CodeIcon, {})
						})]
					}), skillContentLoading ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
						className: "skill-detail-loading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { className: "skill-detail-skeleton-line skill-detail-skeleton-line--title" }),
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { className: "skill-detail-skeleton-line skill-detail-skeleton-line--full" }),
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { className: "skill-detail-skeleton-line skill-detail-skeleton-line--full" }),
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { className: "skill-detail-skeleton-line skill-detail-skeleton-line--medium" }),
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { className: "skill-detail-skeleton-line skill-detail-skeleton-line--full" }),
							/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", { className: "skill-detail-skeleton-line skill-detail-skeleton-line--short" })
						]
					}) : skillPreviewMode === "preview" ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
						className: "skill-detail-preview",
						children: [selectedSkill?.license && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
							className: "skill-detail-meta-grid",
							children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
								className: "skill-detail-meta-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
									className: "skill-detail-meta-label",
									children: t("skills.detail.license")
								}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
									className: "skill-detail-meta-value",
									children: selectedSkill.license
								})]
							})
						}), (() => {
							const { meta, body } = parseFrontmatter(skillDetailMarkdown);
							const metaEntries = Object.entries(meta).filter(([key]) => key !== "slug").map(([key, value]) => {
								if (key === "name" && detailSkillName) return [key, detailSkillName];
								if (key === "description" && detailSkillDesc) return [key, detailSkillDesc];
								return [key, value];
							});
							return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [metaEntries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
								className: "skill-detail-meta-grid",
								children: metaEntries.map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
									className: "skill-detail-meta-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
										className: "skill-detail-meta-label",
										children: key
									}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
										className: "skill-detail-meta-value",
										children: value
									})]
								}, key))
							}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(MarkdownRenderer, { children: body })] });
						})()]
					}) : /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("pre", {
						className: "skill-detail-code",
						children: skillDetailMarkdown
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(ConfirmDialog, {
			visible: showDeleteSkillConfirm,
			title: t("skills.delete.title"),
			content: t("skills.delete.content"),
			confirmText: t("skills.uninstall"),
			cancelText: t("common.cancel"),
			confirmButtonColor: "#4cd964",
			onConfirm: handleDeleteSkill,
			onClose: () => setShowDeleteSkillConfirm(false)
		})] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/services/hooks/use-skill-upload-policy.ts
/**
* 广播最新策略快照到所有订阅方。
*
* 任一消费方主动 refresh 拿到新快照后调用，让另一处的 React state
* 即时跟进，避免跨组件树状态不一致。
*/
function publishSkillUploadPolicy(snapshot) {
	skillUploadPolicy$.next(snapshot);
}
/**
* 订阅企业 Skill 上传策略快照。
*
* **频率控制**：
* - 每次组件 mount 都调 `refreshSkillUploadPolicy()`（绕主进程缓存）拉后端最新状态。
*   产品要求：每次进入面板必须反映企业管理员当前的最新策略，不允许吃 5min 旧缓存。
* - mount 时**先订阅 subject 的 latest 值作为初始 state**（重 mount 时第一帧就是上次
*   拉到的真实策略，不再从「默认放行」开始 → 消除"按钮闪一下又消失"）。
* - refresh 完成后无论快照变没变都 publish，所有订阅方同步。值不变时 React 自带
*   的引用比较 + 消费方 useMemo 即可避免不必要的 re-render。
* - 调用方主动 `refresh()`（关键路径 last-mile check 如 handleImportSkill /
*   保存前校验）→ 同样绕缓存强刷，并 publish 给所有订阅方。
*
* facade 不存在（host 没注入 enterprisePolicy）时默认 allowed=true（capability-missing 兜底）。
*
* @returns
* - `policy`：当前策略快照（capability-missing 时为 undefined，按 allowed=true 兜底）
* - `refresh`：主动绕缓存拉取最新策略，并广播给所有订阅方；返回最新快照
*   （facade 不存在或网络失败时返回 undefined，调用方应按 allowed=true 兜底）
*/
function useSkillUploadPolicy() {
	const facade = useAgentServices()?.enterprisePolicy;
	const facadeRef = (0, import_react$32.useRef)(facade);
	facadeRef.current = facade;
	const [policy, setPolicy] = (0, import_react$32.useState)(() => skillUploadPolicy$.value);
	(0, import_react$32.useEffect)(() => {
		const sub = skillUploadPolicy$.subscribe(setPolicy);
		return () => sub.unsubscribe();
	}, []);
	(0, import_react$32.useEffect)(() => {
		if (!facade) {
			publishSkillUploadPolicy(void 0);
			return;
		}
		let disposed = false;
		facade.refreshSkillUploadPolicy().then((snapshot) => {
			if (!disposed) publishSkillUploadPolicy(snapshot);
		}).catch((error) => {
			console.warn("[useSkillUploadPolicy] refreshSkillUploadPolicy failed:", error);
		});
		return () => {
			disposed = true;
		};
	}, [facade]);
	return {
		policy,
		refresh: (0, import_react$32.useCallback)(async () => {
			const f = facadeRef.current;
			if (!f) return;
			try {
				const next = await f.refreshSkillUploadPolicy();
				if (next) publishSkillUploadPolicy(next);
				return next;
			} catch (error) {
				console.warn("[useSkillUploadPolicy] refresh failed:", error);
				return;
			}
		}, [])
	};
}
var import_react$32, skillUploadPolicy$;
var init_use_skill_upload_policy = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	init__esm5();
	init_app_providers();
	skillUploadPolicy$ = new BehaviorSubject(void 0);
})), import_jsx_runtime$13, PersonalSkillImportModal;
var init_personal_skill_import_modal = __esmMin((() => {
	require_react();
	init_useI18n();
	init_upload_modal();
	import_jsx_runtime$13 = require_jsx_runtime();
	PersonalSkillImportModal = ({ flow, scanEnabled, showUploadOverlay }) => {
		const t = useTranslation();
		if (!flow.showUploadModal) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(UploadModal, {
			isDraggingOver: flow.isDraggingOver,
			showUploadOverlay,
			scanEnabled,
			autoInstallNonHighRisk: flow.autoInstallNonHighRisk,
			onAutoInstallNonHighRiskChange: flow.setAutoInstallNonHighRisk,
			uploadScanResult: flow.uploadScanResult ?? null,
			onClose: () => flow.setShowUploadModal(false),
			onConfirm: flow.handleUploadConfirm,
			useWindowsStyleDesktopPick: flow.useWindowsStyleDesktopPick,
			onConfirmZip: flow.useWindowsStyleDesktopPick ? flow.handleUploadConfirmZip : void 0,
			onDragOver: flow.handleDragOver,
			onDragLeave: flow.handleDragLeave,
			onDrop: flow.handleDrop,
			onCancelScanResult: flow.handleCancelScanResult,
			onConfirmRiskyInstall: flow.handleConfirmRiskyInstall,
			onSkipScan: flow.handleSkipScanResult,
			t
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/desktop-skill-source-picker.ts
/**
* 探测 Electron preload 暴露的原生对话框 API。
* Web 端不存在 workbuddyDesktop，返回 null。
*/
function getDesktopDialogOpen() {
	try {
		const open = window.workbuddyDesktop?.dialog?.open;
		return typeof open === "function" ? open : null;
	} catch {
		return null;
	}
}
function getDesktopPlatform() {
	if (typeof window === "undefined") return "";
	const platform = window.workbuddyDesktop?.platform;
	return typeof platform === "string" ? platform : "";
}
function isMacDesktop(platform) {
	return platform === "darwin";
}
/**
* 构造 Desktop 原生 open 对话框参数。
* - macOS：`openFile` + `openDirectory`，zip 过滤器
* - Windows/Linux：纯目录选择器，**不带 filters**（否则文件夹不可见）
*/
function buildDesktopSkillPickDialogOptions(options) {
	const base = {
		title: options.title,
		multiple: false
	};
	if (isMacDesktop(options.platform)) return {
		...base,
		fileAndDirectory: true,
		filters: [{
			name: "Skill Package",
			extensions: ["zip"]
		}]
	};
	return {
		...base,
		directory: true
	};
}
/**
* Windows/Linux 下通过文件选择器选 zip（openFile 模式，与目录选择器互斥）。
*/
function buildDesktopSkillZipPickDialogOptions(title) {
	return {
		title,
		multiple: false,
		filters: [{
			name: "Skill Package",
			extensions: ["zip"]
		}]
	};
}
function normalizeDesktopDialogSelection(result) {
	if (!result) return;
	return (typeof result === "string" ? result : result[0]) || void 0;
}
/**
* 选中 `.md` 时取其所在目录作为技能根目录（与 VSCode / workbuddy-server 旧逻辑一致）。
*/
function resolveSkillRootDirFromSelectedPath(selectedPath) {
	if (selectedPath.toLowerCase().endsWith(".md")) {
		const parts = selectedPath.split(/[/\\]/);
		parts.pop();
		return parts.join(selectedPath.includes("\\") ? "\\" : "/") || selectedPath;
	}
	return selectedPath;
}
/**
* 从 Desktop 拖拽事件的 File 对象解析本地绝对路径。
* Web 端无路径时返回 undefined，调用方应回退到 JSZip 打包。
*/
function resolveDesktopDropPath(file) {
	if (!file) return;
	return getFilePathSafe(file);
}
async function pickDesktopSkillFolder(dialogOpen, options) {
	return normalizeDesktopDialogSelection(await dialogOpen(buildDesktopSkillPickDialogOptions(options)));
}
async function pickDesktopSkillZipFile(dialogOpen, title) {
	return normalizeDesktopDialogSelection(await dialogOpen(buildDesktopSkillZipPickDialogOptions(title)));
}
var init_desktop_skill_source_picker = __esmMin((() => {
	init_skills_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/personal-skill-import/use-personal-skill-desktop-pick.ts
/**
* @param runImportFlow 主 hook 提供的导入执行函数，接受可选 folderPath
*/
function useDesktopSkillPick(runImportFlow) {
	const t = useTranslation();
	const desktopDialogOpen = (0, import_react$30.useMemo)(() => getDesktopDialogOpen(), []);
	const desktopPlatform = (0, import_react$30.useMemo)(() => getDesktopPlatform(), []);
	const useWindowsStyleDesktopPick = Boolean(desktopDialogOpen && desktopPlatform && !isMacDesktop(desktopPlatform));
	const uploadTitle = t("skills.upload.modal.title");
	const pickPathFromDesktopDialog = (0, import_react$30.useCallback)(async (mode) => {
		if (!desktopDialogOpen) return;
		if (mode === "zip") return pickDesktopSkillZipFile(desktopDialogOpen, uploadTitle);
		return pickDesktopSkillFolder(desktopDialogOpen, {
			title: uploadTitle,
			platform: desktopPlatform
		});
	}, [
		desktopDialogOpen,
		desktopPlatform,
		uploadTitle
	]);
	return {
		useWindowsStyleDesktopPick,
		handleUploadConfirm: (0, import_react$30.useCallback)(async () => {
			const selectedPath = await pickPathFromDesktopDialog("folder");
			if (selectedPath) {
				await runImportFlow(resolveSkillRootDirFromSelectedPath(selectedPath));
				return;
			}
			if (!desktopDialogOpen) await runImportFlow();
		}, [
			pickPathFromDesktopDialog,
			desktopDialogOpen,
			runImportFlow
		]),
		handleUploadConfirmZip: (0, import_react$30.useCallback)(async () => {
			const selectedPath = await pickPathFromDesktopDialog("zip");
			if (selectedPath) await runImportFlow(resolveSkillRootDirFromSelectedPath(selectedPath));
		}, [pickPathFromDesktopDialog, runImportFlow])
	};
}
var import_react$30;
var init_use_personal_skill_desktop_pick = __esmMin((() => {
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_desktop_skill_source_picker();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/personal-skill-import/use-personal-skill-import.ts
/**
* 个人 Skill 本地导入流程 hook。
*
* 注意：此 hook 通过 useHost() 取 personalSkills facade，所以必须在 ModuleHost
* 上下文内挂载（任何 agent-ui 模块组件都满足此前提）。
*/
function usePersonalSkillImport(options = {}) {
	const t = useTranslation();
	const { scanEnabled = true, onSuccess, autoInstallNonHighRisk: externalAutoInstall, onAutoInstallNonHighRiskChange: externalOnAutoInstallChange } = options;
	const host = useModuleHost();
	const personalSkills = host.facades.personalSkills;
	const [showUploadModal, setShowUploadModal] = (0, import_react$29.useState)(false);
	const [uploading, setUploading] = (0, import_react$29.useState)(false);
	const [isDraggingOver, setIsDraggingOver] = (0, import_react$29.useState)(false);
	const [uploadScanResult, setUploadScanResult] = (0, import_react$29.useState)(null);
	/** 被安全检测阻止时的文件路径，用于确认安装时重新调用 installByPath */
	const [pendingInstallPath, setPendingInstallPath] = (0, import_react$29.useState)(null);
	/** 标记是否通过"跳过扫描"已安装 skill，避免弹窗关闭时误取消轮询 */
	const skipInstalledRef = (0, import_react$29.useRef)(false);
	const isExternallyControlled = externalAutoInstall !== void 0 && externalOnAutoInstallChange !== void 0;
	const [internalAutoInstall, setInternalAutoInstallState] = (0, import_react$29.useState)(() => readCache("skills-security-auto-install-non-high-risk") ?? false);
	const autoInstallNonHighRisk = isExternallyControlled ? externalAutoInstall : internalAutoInstall;
	const setAutoInstallNonHighRisk = (0, import_react$29.useCallback)((enabled) => {
		if (isExternallyControlled) {
			externalOnAutoInstallChange(enabled);
			return;
		}
		setInternalAutoInstallState(enabled);
		writeCache(SECURITY_AUTO_INSTALL_KEY, enabled);
		window.dispatchEvent(new CustomEvent(SECURITY_AUTO_INSTALL_CHANGE_EVENT, { detail: { enabled } }));
	}, [isExternallyControlled, externalOnAutoInstallChange]);
	(0, import_react$29.useEffect)(() => {
		if (isExternallyControlled) return;
		const handler = (event) => {
			const detail = event.detail;
			if (typeof detail?.enabled === "boolean") setInternalAutoInstallState(detail.enabled);
		};
		window.addEventListener(SECURITY_AUTO_INSTALL_CHANGE_EVENT, handler);
		return () => {
			window.removeEventListener(SECURITY_AUTO_INSTALL_CHANGE_EVENT, handler);
		};
	}, [isExternallyControlled]);
	(0, import_react$29.useEffect)(() => {
		if (showUploadModal) return;
		if (uploadScanResult?.md5 && !uploadScanResult.verdict && !skipInstalledRef.current) asyncSecurityScanService.removeTask(uploadScanResult.md5);
		skipInstalledRef.current = false;
		setUploading(false);
		setIsDraggingOver(false);
		setUploadScanResult(null);
		setPendingInstallPath(null);
	}, [showUploadModal]);
	(0, import_react$29.useEffect)(() => {
		setUploadModalVisible(showUploadModal);
	}, [showUploadModal]);
	const pendingMd5 = uploadScanResult?.verdict === "" ? uploadScanResult.md5 : null;
	const showUploadModalRef = (0, import_react$29.useRef)(showUploadModal);
	(0, import_react$29.useEffect)(() => {
		showUploadModalRef.current = showUploadModal;
	}, [showUploadModal]);
	useScanResultSubscription(pendingMd5, (0, import_react$29.useCallback)(async (result) => {
		if (!showUploadModalRef.current) return;
		if (result.verdict === "white" || result.verdict === "suspicious" && autoInstallNonHighRisk) {
			if (personalSkills && pendingInstallPath) {
				setUploadScanResult(null);
				setUploading(true);
				try {
					const installResult = await personalSkills.installByPath({
						source: "userSettings",
						folderPath: pendingInstallPath
					});
					if (installResult.success) {
						setShowUploadModal(false);
						setPendingInstallPath(null);
						notifySkillListRefresh();
						onSuccess?.(installResult.skillName ?? "");
						toast({
							message: t("skills.toast.imported"),
							type: "success"
						});
					} else toast.error(getLocalizedImportSkillError(installResult.error));
				} catch (error) {
					toast.error(getLocalizedImportSkillError(error instanceof Error ? error.message : void 0));
				} finally {
					setUploading(false);
				}
			} else {
				setUploadScanResult(null);
				setShowUploadModal(false);
			}
			return;
		}
		setUploadScanResult(result);
		if (result.verdict === "black") toast.error(t("skill.importError.securityCheckBlocked"));
	}, [
		autoInstallNonHighRisk,
		personalSkills,
		pendingInstallPath,
		t,
		onSuccess
	]));
	const handleImportSkill = (0, import_react$29.useCallback)(() => {
		setShowUploadModal(true);
	}, []);
	const runImportFlow = (0, import_react$29.useCallback)(async (folderPath) => {
		if (!personalSkills) return;
		setUploading(true);
		try {
			let appKey;
			if (scanEnabled) try {
				appKey = (await host.adapter?.getProductConfiguration?.())?.skillSecurityAppKey;
			} catch {}
			const result = await personalSkills.importFromPath({
				source: "userSettings",
				folderPath,
				securityCheck: scanEnabled,
				appKey
			});
			const { preCheck } = result;
			const showScanWarning = (scan, installPath) => {
				setUploadScanResult(scan);
				setPendingInstallPath(installPath || folderPath || null);
			};
			if (!result.success && preCheck && (result.error === "security_check_blocked" || !preCheck.scanResult)) {
				const scan = preCheck?.scanResult ?? {
					md5: preCheck?.md5 || "",
					hashHit: false,
					threatLevel: 0,
					riskLevel: "safe",
					verdict: "",
					description: "",
					tags: [],
					fileAnalysis: [],
					virusName: []
				};
				if (scan.verdict === "suspicious" && autoInstallNonHighRisk) {
					const installPath = preCheck.selectedPath || folderPath;
					if (installPath) {
						const installResult = await personalSkills.installByPath({
							source: "userSettings",
							folderPath: installPath
						});
						if (installResult.success) {
							notifySkillListRefresh();
							onSuccess?.(installResult.skillName ?? "");
							setShowUploadModal(false);
							toast({
								message: t("skills.toast.imported"),
								type: "success"
							});
						} else toast.error(getLocalizedImportSkillError(installResult.error));
					}
					return;
				}
				showScanWarning(scan, preCheck.selectedPath);
				if (scan.verdict === "black" || scan.verdict === "suspicious") toast.error(t("skill.importError.securityCheckBlocked"));
				if (preCheck?.md5 && !scan.verdict) {
					asyncSecurityScanService.setPersonalSkillsFacade(personalSkills);
					asyncSecurityScanService.addTask({
						md5: preCheck.md5,
						skillName: result.skillName ?? "",
						skillFilePath: preCheck.selectedPath || folderPath || "",
						startTime: Date.now()
					});
				}
				return;
			}
			if (!result.success) {
				toast.error(getLocalizedImportSkillError(result.error));
				return;
			}
			notifySkillListRefresh();
			onSuccess?.(result.skillName ?? "");
			setShowUploadModal(false);
			setUploadScanResult(null);
			toast({
				message: t("skills.toast.imported"),
				type: "success"
			});
		} catch (error) {
			toast.error(getLocalizedImportSkillError(error instanceof Error ? error.message : void 0));
		} finally {
			setUploading(false);
		}
	}, [
		personalSkills,
		scanEnabled,
		autoInstallNonHighRisk,
		t,
		onSuccess,
		host.adapter
	]);
	const desktopPick = useDesktopSkillPick(runImportFlow);
	const handleDragOver = (0, import_react$29.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(true);
	}, []);
	const handleDragLeave = (0, import_react$29.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(false);
	}, []);
	const handleDrop = (0, import_react$29.useCallback)(async (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingOver(false);
		const droppedFile = Array.from(e.dataTransfer.files)[0];
		if (!droppedFile) {
			await runImportFlow();
			return;
		}
		const folderPath = getFilePathSafe(droppedFile);
		if (!folderPath) {
			await runImportFlow();
			return;
		}
		await runImportFlow(folderPath);
	}, [runImportFlow]);
	const handleCancelScanResult = (0, import_react$29.useCallback)(() => {
		setUploadScanResult(null);
		setPendingInstallPath(null);
	}, []);
	/**
	* 通用的"跳过安全检测 / 确认有风险后安装"逻辑
	* @param isSkipScan true: 跳过扫描场景（保留异步轮询，Toast 提示后台检测）
	*                   false: 确认有风险安装场景（Toast 提示安装成功）
	*/
	const executeInstallByPath = (0, import_react$29.useCallback)(async (isSkipScan) => {
		if (!personalSkills || !pendingInstallPath) return;
		const installPath = pendingInstallPath;
		const taskMd5 = isSkipScan ? uploadScanResult?.md5 : void 0;
		if (isSkipScan) {
			skipInstalledRef.current = true;
			setShowUploadModal(false);
		}
		setUploadScanResult(null);
		setPendingInstallPath(null);
		setUploading(true);
		try {
			const result = await personalSkills.installByPath({
				source: "userSettings",
				folderPath: installPath
			});
			if (!result.success) {
				toast.error(getLocalizedImportSkillError(result.error));
				if (taskMd5) asyncSecurityScanService.removeTask(taskMd5);
				return;
			}
			notifySkillListRefresh();
			onSuccess?.(result.skillName ?? "");
			if (taskMd5 && result.skillName) asyncSecurityScanService.updateTask(taskMd5, { skillName: result.skillName });
			if (isSkipScan) toast({
				message: t("skills.security.async.backgroundRunning"),
				type: "info"
			});
			else {
				setShowUploadModal(false);
				toast({
					message: t("skills.toast.imported"),
					type: "success"
				});
			}
		} catch (error) {
			toast.error(getLocalizedImportSkillError(error instanceof Error ? error.message : void 0));
		} finally {
			setUploading(false);
		}
	}, [
		personalSkills,
		pendingInstallPath,
		uploadScanResult,
		t,
		onSuccess
	]);
	/** verdict 为空时点击"跳过"→ 直接安装成功（无弹窗），Toast 提示后台检测 */
	const handleSkipScanResult = (0, import_react$29.useCallback)(() => executeInstallByPath(true), [executeInstallByPath]);
	/** 用户在安全检测警告中点击"确认安装" */
	const handleConfirmRiskyInstall = (0, import_react$29.useCallback)(() => executeInstallByPath(false), [executeInstallByPath]);
	return {
		showUploadModal,
		setShowUploadModal,
		uploading,
		isDraggingOver,
		uploadScanResult,
		autoInstallNonHighRisk,
		setAutoInstallNonHighRisk,
		handleImportSkill,
		handleUploadConfirm: desktopPick.handleUploadConfirm,
		handleUploadConfirmZip: desktopPick.handleUploadConfirmZip,
		useWindowsStyleDesktopPick: desktopPick.useWindowsStyleDesktopPick,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleCancelScanResult,
		handleConfirmRiskyInstall,
		handleSkipScanResult
	};
}
var import_react$29;
var init_use_personal_skill_import = __esmMin((() => {
	init_src();
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_local_cache();
	init_async_security_scan_service();
	init_context();
	init_high_risk_notification_store();
	init_skill_import_errors();
	init_skills_utils();
	init_use_scan_result_subscription();
	init_skills_security_types();
	init_use_personal_skill_desktop_pick();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/personal-skill-import/index.ts
var init_personal_skill_import = __esmMin((() => {
	init_personal_skill_import_modal();
	init_use_personal_skill_import();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-installed-skills.ts
/** 4 个 reason 映射到对应 i18n key，其他兜底到 invalidMode。 */
function buildPolicyDeniedMessage(t, reason) {
	switch (reason) {
		case "DISABLED": return t("skills.upload.policy.disabled");
		case "NOT_IN_WHITELIST": return t("skills.upload.policy.notInWhitelist");
		case "IN_BLACKLIST": return t("skills.upload.policy.inBlacklist");
		default: return t("skills.upload.policy.invalidMode");
	}
}
function useInstalledSkills({ t, reportEvent, Events, skillRiskMap = /* @__PURE__ */ new Map(), clearRisk = () => void 0, autoInstallNonHighRisk = false, onAutoInstallNonHighRiskChange, scanEnabled = true }) {
	const { personalSkills } = useModuleHost().facades;
	const { adapter } = useModuleHost();
	const { disableAllExtensions, setDisableAllExtensionsState } = useConversations();
	const [_installingSkillNames, setInstallingSkillNames] = (0, import_react$28.useState)(/* @__PURE__ */ new Set());
	const installingSkillNamesRef = (0, import_react$28.useRef)(/* @__PURE__ */ new Set());
	const hasCacheRef = (0, import_react$28.useRef)(false);
	const [installedLoading, setInstalledLoading] = (0, import_react$28.useState)(false);
	const [recommendLoading, setRecommendLoading] = (0, import_react$28.useState)(false);
	/**
	* 是否已成功完成至少一次 loadSkills（不区分 silent）。
	* 区别于 hasCacheRef：本字段是 reactive state，可被下游 hook（如
	* useEnterpriseSkills 的卸载对账 effect，issue #50996）依赖。
	* 初始值跟随 hasCacheRef：如果有 cache，视为已加载（cache 也是
	* 上次成功结果，足以驱动对账）。
	*/
	const [installedLoaded, setInstalledLoaded] = (0, import_react$28.useState)(() => {
		const cached = readCache(SKILLS_CACHE_KEY_INSTALLED);
		return !!(cached && cached.length);
	});
	const [installedSkills, setInstalledSkills] = (0, import_react$28.useState)(() => {
		const cached = readCache(SKILLS_CACHE_KEY_INSTALLED);
		if (cached?.length) hasCacheRef.current = true;
		return cached || [];
	});
	const [recommendedSkills, setRecommendedSkills] = (0, import_react$28.useState)(() => readCache("skills-cache-recommended") || []);
	const [installedExpanded, setInstalledExpanded] = (0, import_react$28.useState)(false);
	const tagCategories = {};
	const importFlow = usePersonalSkillImport({
		scanEnabled,
		autoInstallNonHighRisk,
		onAutoInstallNonHighRiskChange,
		onSuccess: () => {
			loadSkillsRef.current?.(true);
		}
	});
	const { policy: rawUploadPolicy, refresh: refreshSharedUploadPolicy } = useSkillUploadPolicy();
	const uploadPolicy = rawUploadPolicy ?? DEFAULT_PERMISSIVE_POLICY;
	/**
	* 关键路径 last-mile check：绕主进程缓存强刷。
	* 失败 / 无 facade 时回退到 DEFAULT_PERMISSIVE_POLICY，保持调用方 `policy.allowed`
	* 直接可用的契约（不会出现 undefined 触达 `.allowed` 抛错）。
	*/
	const refreshUploadPolicy = (0, import_react$28.useCallback)(async () => {
		return await refreshSharedUploadPolicy() ?? DEFAULT_PERMISSIVE_POLICY;
	}, [refreshSharedUploadPolicy]);
	const [showDeleteSkillConfirm, setShowDeleteSkillConfirm] = (0, import_react$28.useState)(false);
	/** Request ID for loadSkills to handle concurrent calls */
	const loadSkillsRequestIdRef = (0, import_react$28.useRef)(0);
	/** importFlow.onSuccess 通过此 ref 调用 loadSkills（声明在下方） */
	const loadSkillsRef = (0, import_react$28.useRef)(null);
	const loadSkills = (0, import_react$28.useCallback)(async (silent = false) => {
		const requestId = ++loadSkillsRequestIdRef.current;
		if (!personalSkills) {
			setInstalledSkills([]);
			setRecommendedSkills([]);
			return [];
		}
		if (!silent) {
			setInstalledLoading(true);
			setRecommendLoading(true);
		}
		try {
			const response = await personalSkills.list({
				cwd: "",
				global: false,
				excludePluginSkills: true
			});
			if (requestId !== loadSkillsRequestIdRef.current) {
				console.warn("[useInstalledSkills] loadSkills: STALE requestId, discarding", {
					requestId,
					current: loadSkillsRequestIdRef.current
				});
				return [];
			}
			if (response.error) console.warn("[useInstalledSkills] response.error:", response.error);
			const allSkills = (response.results || []).map((s) => normalizeSkill(s));
			let installed = allSkills.filter((skill) => skill.source !== "builtin" && skill.source !== "connector");
			console.log("[useInstalledSkills] loadSkills done:", {
				silent,
				allCount: allSkills.length,
				installedCount: installed.length,
				names: installed.map((s) => s.name)
			});
			installed = installed.sort((a, b) => (b.installedAt ?? 0) - (a.installedAt ?? 0));
			hasCacheRef.current = true;
			setInstalledLoading(false);
			setInstalledSkills(installed);
			setInstalledLoaded(true);
			writeCache(SKILLS_CACHE_KEY_INSTALLED, installed);
			setRecommendedSkills([]);
			return installed;
		} finally {
			if (requestId === loadSkillsRequestIdRef.current) {
				setInstalledLoading(false);
				setRecommendLoading(false);
			}
		}
	}, [personalSkills]);
	(0, import_react$28.useEffect)(() => {
		loadSkillsRef.current = loadSkills;
	}, [loadSkills]);
	(0, import_react$28.useEffect)(() => {
		const sub = skillListRefresh$.subscribe(() => {
			loadSkills(true);
		});
		return () => sub.unsubscribe();
	}, [loadSkills]);
	const handleToggleSkill = (0, import_react$28.useCallback)(async (skillPath, enabled, selectedSkill, setSelectedSkill) => {
		const disable = !enabled;
		if (enabled && disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
		const toggle = (list) => list.map((item) => {
			if (item.filePath !== skillPath) return item;
			return {
				...item,
				disable
			};
		});
		setInstalledSkills((prev) => toggle(prev));
		if (selectedSkill?.filePath === skillPath) setSelectedSkill(selectedSkill ? {
			...selectedSkill,
			disable
		} : null);
		if (personalSkills) {
			const startedAt = Date.now();
			const result = await personalSkills.toggle({
				filePath: skillPath,
				disable
			});
			const durationMs = Date.now() - startedAt;
			const skill = selectedSkill?.filePath === skillPath ? selectedSkill : installedSkills.find((s) => s.filePath === skillPath);
			const baseDims = {
				name: skill?.name ?? skillPath,
				skillId: skill?.skillId || skill?.slug,
				skillVersion: skill?.version,
				action: enabled ? "enable" : "disable",
				source: "installed",
				durationMs
			};
			if (!result.success) {
				toast({
					message: result.error || t("skills.toast.toggleFailed"),
					type: "error"
				});
				setInstalledSkills((prev) => toggle(prev));
				if (selectedSkill?.filePath === skillPath) setSelectedSkill(selectedSkill ? {
					...selectedSkill,
					disable: !disable
				} : null);
				reportEvent(Events.SkillAction, {
					...baseDims,
					outcome: "failed",
					errorReason: result.error ?? ""
				});
				return;
			}
			reportEvent(Events.SkillAction, {
				...baseDims,
				outcome: "success"
			});
		}
	}, [
		adapter,
		personalSkills,
		t,
		disableAllExtensions,
		setDisableAllExtensionsState,
		installedSkills,
		reportEvent,
		Events
	]);
	const handleInstallRecommendedSkill = (0, import_react$28.useCallback)(async (skill, onTrySkill) => {
		if (!adapter?.installMarketplaceSkill) return;
		if (installingSkillNamesRef.current.has(skill.name)) return;
		const next = new Set(installingSkillNamesRef.current).add(skill.name);
		installingSkillNamesRef.current = next;
		setInstallingSkillNames(next);
		try {
			const result = await adapter.installMarketplaceSkill({ skillName: skill.name });
			if (result.success) {
				reportEvent(Events.SkillInstalled, {
					name: skill.name,
					skillId: skill.skillId,
					skillVersion: skill.version
				});
				toast({
					message: t("skills.toast.installed", { name: skill.name }),
					type: "success",
					...onTrySkill ? { action: {
						label: t("skills.toast.trySkill"),
						onClick: () => onTrySkill(skill.name, pickLocalizedExamples(skill), skill.name, skill.skillId),
						track: {
							elementId: "skill_post_install_try",
							elementName: "安装后去试试",
							props: { source: skill.name }
						}
					} } : {}
				});
				await loadSkills(true);
			} else toast({
				message: result.errorMessage || t("skills.toast.installFailed"),
				type: "error"
			});
		} finally {
			const updated = new Set(installingSkillNamesRef.current);
			updated.delete(skill.name);
			installingSkillNamesRef.current = updated;
			setInstallingSkillNames(updated);
		}
	}, [
		adapter,
		loadSkills,
		reportEvent,
		Events,
		t
	]);
	const { navigation } = useModuleHost();
	const handleCreateSkill = (0, import_react$28.useCallback)(async () => {
		const policy = await refreshUploadPolicy();
		if (!policy.allowed) {
			toast.error(buildPolicyDeniedMessage(t, policy.reason));
			return;
		}
		navigation.goHome();
		createSkillMode$.next({
			prompt: t("skills.create.examplePrompt"),
			skillName: "skill-creator"
		});
	}, [
		navigation,
		t,
		refreshUploadPolicy
	]);
	const handleFindSkill = (0, import_react$28.useCallback)(() => {
		navigation.goHome();
		createSkillMode$.next({ prompt: t("skills.find.examplePrompt") });
	}, [navigation, t]);
	const isDesktop = adapter?.environmentType === "local";
	const handleEditSkill = (0, import_react$28.useCallback)((skill) => {
		if (!skill?.name) return;
		navigation.goHome();
		createSkillMode$.next({
			prompt: t("skills.edit.examplePrompt"),
			skillName: "skill-creator",
			targetSkillName: skill.name
		});
	}, [navigation, t]);
	const handleImportSkill = (0, import_react$28.useCallback)(async () => {
		const policy = await refreshUploadPolicy();
		if (!policy.allowed) {
			toast.error(buildPolicyDeniedMessage(t, policy.reason));
			return;
		}
		importFlow.setShowUploadModal(true);
	}, [
		refreshUploadPolicy,
		t,
		importFlow
	]);
	const handleDeleteSkill = (0, import_react$28.useCallback)(async (selectedSkill, setSelectedSkill) => {
		if (!selectedSkill) return;
		const deleted = selectedSkill;
		if (personalSkills) {
			const result = await personalSkills.delete({
				filePath: deleted.filePath,
				name: deleted.name,
				assetType: deleted.assetType
			});
			if (!result.success) {
				toast({
					message: result.error || t("skills.toast.deleteFailed"),
					type: "error"
				});
				setShowDeleteSkillConfirm(false);
				return;
			}
		}
		setSelectedSkill(null);
		setShowDeleteSkillConfirm(false);
		toast({
			message: t("skills.toast.deleted", { name: deleted.name }),
			type: "success"
		});
		reportEvent(Events.SkillAction, {
			name: deleted.name,
			skillId: deleted.skillId || deleted.slug,
			skillVersion: deleted.version,
			action: "uninstall",
			source: "installed"
		});
		await loadSkills(true);
	}, [
		personalSkills,
		loadSkills,
		t,
		reportEvent,
		Events
	]);
	const handleBatchUninstall = (0, import_react$28.useCallback)(async (skills) => {
		if (!personalSkills || skills.length === 0) return;
		let successCount = 0;
		for (const skill of skills) if ((await personalSkills.delete({
			filePath: skill.filePath,
			name: skill.name,
			assetType: skill.assetType
		})).success) {
			successCount++;
			clearRisk(skill.filePath);
			reportEvent(Events.SkillAction, {
				name: skill.name,
				skillId: skill.skillId || skill.slug,
				skillVersion: skill.version,
				action: "uninstall",
				source: "installed"
			});
		}
		if (successCount > 0) {
			toast({
				message: t("skills.batch.uninstallSuccess", { count: String(successCount) }),
				type: "success"
			});
			await loadSkills(true);
		} else toast({
			message: t("skills.toast.deleteFailed"),
			type: "error"
		});
	}, [
		personalSkills,
		loadSkills,
		t,
		clearRisk,
		reportEvent,
		Events
	]);
	const handleBatchToggle = (0, import_react$28.useCallback)(async (skills, enable) => {
		if (!personalSkills || skills.length === 0) return;
		const disable = !enable;
		const toToggle = skills.filter((skill) => skill.disable !== disable);
		if (toToggle.length === 0) return;
		if (enable && disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
		let successCount = 0;
		const failedSkills = [];
		for (const skill of toToggle) {
			const startedAt = Date.now();
			const result = await personalSkills.toggle({
				filePath: skill.filePath,
				disable
			});
			const durationMs = Date.now() - startedAt;
			const baseDims = {
				name: skill.name,
				skillId: skill.skillId || skill.slug,
				skillVersion: skill.version,
				action: enable ? "enable" : "disable",
				source: "installed",
				durationMs
			};
			if (result.success) {
				successCount++;
				reportEvent(Events.SkillAction, {
					...baseDims,
					outcome: "success"
				});
			} else {
				failedSkills.push(skill.name);
				reportEvent(Events.SkillAction, {
					...baseDims,
					outcome: "failed",
					errorReason: result.error ?? ""
				});
			}
		}
		if (successCount > 0) {
			toast({
				message: t(enable ? "skills.batch.enableSuccess" : "skills.batch.disableSuccess", { count: String(successCount) }),
				type: "success"
			});
			await loadSkills(true);
		}
		if (failedSkills.length > 0) toast({
			message: t("skills.batch.togglePartialFailed", { names: failedSkills.join(", ") }),
			type: "error"
		});
	}, [
		personalSkills,
		loadSkills,
		t,
		disableAllExtensions,
		setDisableAllExtensionsState,
		reportEvent,
		Events
	]);
	return {
		hasCacheRef,
		importFlow,
		installedLoading,
		installedLoaded,
		recommendLoading,
		installedSkills,
		recommendedSkills,
		installedExpanded,
		setInstalledExpanded,
		showDeleteSkillConfirm,
		setShowDeleteSkillConfirm,
		showUploadModal: importFlow.showUploadModal,
		setShowUploadModal: importFlow.setShowUploadModal,
		uploading: importFlow.uploading,
		isDraggingOver: importFlow.isDraggingOver,
		uploadScanResult: importFlow.uploadScanResult,
		autoInstallNonHighRisk: importFlow.autoInstallNonHighRisk,
		onAutoInstallNonHighRiskChange: importFlow.setAutoInstallNonHighRisk,
		skillRiskMap,
		clearRisk,
		tagCategories,
		loadSkills,
		handleToggleSkill,
		handleCreateSkill,
		handleFindSkill,
		handleEditSkill: isDesktop ? handleEditSkill : void 0,
		handleImportSkill,
		handleUploadConfirm: importFlow.handleUploadConfirm,
		handleDragOver: importFlow.handleDragOver,
		handleDragLeave: importFlow.handleDragLeave,
		handleDrop: importFlow.handleDrop,
		handleDeleteSkill,
		handleBatchUninstall,
		handleBatchToggle,
		handleInstallRecommendedSkill,
		uploadPolicy,
		refreshUploadPolicy,
		handleCancelScanResult: importFlow.handleCancelScanResult,
		handleConfirmRiskyInstall: importFlow.handleConfirmRiskyInstall,
		handleSkipScanResult: importFlow.handleSkipScanResult
	};
}
var import_react$28, DEFAULT_PERMISSIVE_POLICY;
var init_use_installed_skills = __esmMin((() => {
	init_src();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_task_starter_store();
	init_contexts();
	init_use_skill_upload_policy();
	init_local_cache();
	init_personal_skill_import();
	init_context();
	init_high_risk_notification_store();
	init_types();
	DEFAULT_PERMISSIVE_POLICY = {
		allowed: true,
		mode: "all",
		max_size_bytes: 10 * 1024 * 1024,
		require_review: false,
		source: "capability-missing",
		fetchedAt: 0
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-skillhub.ts
function useSkillHub({ t, reportEvent, Events, installedSkills, installedLoading, loadSkills, visible, active, discoverTab }) {
	let facade;
	try {
		facade = useModuleHost().facades.skillsMarketplace;
	} catch {
		facade = void 0;
	}
	const [hubSkills, setHubSkills] = (0, import_react$27.useState)([]);
	const [hubTotal, setHubTotal] = (0, import_react$27.useState)(0);
	const [hubPage, setHubPage] = (0, import_react$27.useState)(1);
	const [hubLoading, setHubLoading] = (0, import_react$27.useState)(false);
	const [hubError, setHubError] = (0, import_react$27.useState)(false);
	const [hubCategories, setHubCategories] = (0, import_react$27.useState)([]);
	const [hubSelectedCategory, setHubSelectedCategory] = (0, import_react$27.useState)("");
	const [hubSortBy, setHubSortBy] = (0, import_react$27.useState)("score");
	const [hubInstallingSlug, setHubInstallingSlug] = (0, import_react$27.useState)(null);
	const [hubInstalledSlugs, setHubInstalledSlugs] = (0, import_react$27.useState)(/* @__PURE__ */ new Set());
	const [hubVersionMap, setHubVersionMap] = (0, import_react$27.useState)({});
	const [localVersionMap, setLocalVersionMap] = (0, import_react$27.useState)({});
	const [hubMetaSlugs, setHubMetaSlugs] = (0, import_react$27.useState)(/* @__PURE__ */ new Set());
	const hubLoadedRef = (0, import_react$27.useRef)(false);
	const updateCheckingRef = (0, import_react$27.useRef)(false);
	const [hubUpdateCheckCompleted, setHubUpdateCheckCompleted] = (0, import_react$27.useState)(false);
	const resetHubUpdateCheck = (0, import_react$27.useCallback)(() => {
		updateCheckingRef.current = false;
		setHubUpdateCheckCompleted(false);
		setLocalVersionMap({});
		setHubMetaSlugs(/* @__PURE__ */ new Set());
	}, []);
	const loadHubCategories = (0, import_react$27.useCallback)(async () => {
		if (!facade) {
			setHubCategories([]);
			return;
		}
		const cached = readCache(SKILLHUB_CACHE_KEY_CATEGORIES);
		if (cached && Date.now() - cached.ts < 864e5) {
			setHubCategories(cached.data);
			return;
		}
		try {
			const sorted = ((await facade.skillhub.getCategories()).items || []).filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder);
			setHubCategories(sorted);
			writeCache(SKILLHUB_CACHE_KEY_CATEGORIES, {
				data: sorted,
				ts: Date.now()
			});
		} catch {
			setHubCategories([]);
		}
	}, [facade]);
	const loadHubSkills = (0, import_react$27.useCallback)(async (page = 1, append = false) => {
		if (!facade) {
			setHubError(true);
			return;
		}
		setHubLoading(true);
		setHubError(false);
		try {
			const res = await facade.skillhub.list({
				page,
				pageSize: 100,
				sortBy: hubSortBy,
				order: "desc",
				category: hubSelectedCategory || void 0
			});
			const skills = res.data?.skills || [];
			setHubSkills((prev) => append ? [...prev, ...skills] : skills);
			setHubTotal(res.data?.total ?? 0);
			setHubPage(page);
			const versionMap = {};
			for (const s of skills) versionMap[s.slug] = s.version;
			setHubVersionMap((prev) => ({
				...prev,
				...versionMap
			}));
		} catch {
			setHubError(true);
		} finally {
			setHubLoading(false);
		}
	}, [
		facade,
		hubSortBy,
		hubSelectedCategory
	]);
	(0, import_react$27.useEffect)(() => {
		if (discoverTab === "skillhub" && !hubLoadedRef.current) {
			hubLoadedRef.current = true;
			loadHubCategories();
			loadHubSkills(1);
		}
	}, [
		discoverTab,
		loadHubCategories,
		loadHubSkills
	]);
	(0, import_react$27.useEffect)(() => {
		if (discoverTab === "skillhub" && hubLoadedRef.current) loadHubSkills(1);
	}, [hubSortBy, hubSelectedCategory]);
	(0, import_react$27.useEffect)(() => {
		if (!visible || !active) {
			updateCheckingRef.current = false;
			setHubUpdateCheckCompleted(false);
			return;
		}
		if (installedLoading) return;
		if (updateCheckingRef.current) return;
		updateCheckingRef.current = true;
		(async () => {
			try {
				const metas = await facade?.skillhub.getInstalledMetas() ?? [];
				console.log("[useSkillHub] SkillHub installed metas:", metas);
				if (metas.length === 0) {
					console.log("[useSkillHub] No SkillHub skills found, skipping update check");
					setHubUpdateCheckCompleted(true);
					return;
				}
				const localMap = {};
				const metaSlugsSet = /* @__PURE__ */ new Set();
				const slugsToFetch = [];
				for (const meta of metas) {
					metaSlugsSet.add(meta.slug);
					slugsToFetch.push(meta.slug);
					if (meta.version) localMap[meta.slug] = meta.version;
				}
				setLocalVersionMap(localMap);
				setHubMetaSlugs(metaSlugsSet);
				console.log("[useSkillHub] Update check - localVersionMap:", JSON.stringify(localMap, null, 2));
				console.log("[useSkillHub] Update check - slugsToFetch:", slugsToFetch);
				if (slugsToFetch.length > 0) {
					console.log("[useSkillHub] Fetching latest versions for slugs:", slugsToFetch);
					const remoteVersions = await fetchLatestVersions(facade, slugsToFetch);
					console.log("[useSkillHub] Remote versions response:", JSON.stringify(remoteVersions, null, 2));
					if (Object.keys(remoteVersions).length > 0) setHubVersionMap((prev) => ({
						...prev,
						...remoteVersions
					}));
				}
			} catch (error) {
				console.error("[useSkillHub] Failed to check SkillHub updates:", error);
			} finally {
				setHubUpdateCheckCompleted(true);
			}
		})();
	}, [
		visible,
		active,
		facade,
		installedLoading
	]);
	(0, import_react$27.useEffect)(() => {
		if (hubSkills.length === 0 || installedSkills.length === 0) return;
		const installedIds = /* @__PURE__ */ new Set();
		for (const s of installedSkills) {
			if (s.name) installedIds.add(s.name.toLowerCase());
			if (s.slug) installedIds.add(s.slug.toLowerCase());
			if (s.filePath) {
				const segs = s.filePath.split(/[\\/]/);
				const dir = segs.length >= 2 ? segs[segs.length - 2] : void 0;
				if (dir) installedIds.add(dir.toLowerCase());
			}
		}
		const slugsInstalled = /* @__PURE__ */ new Set();
		for (const hs of hubSkills) if (installedIds.has(hs.name.toLowerCase()) || installedIds.has(hs.slug.toLowerCase())) slugsInstalled.add(hs.slug);
		setHubInstalledSlugs(slugsInstalled);
		const versionMap = {};
		for (const hs of hubSkills) if (hs.version) versionMap[hs.slug] = hs.version;
		if (Object.keys(versionMap).length > 0) setHubVersionMap((prev) => ({
			...prev,
			...versionMap
		}));
	}, [hubSkills, installedSkills]);
	const hubSkillByName = (0, import_react$27.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const s of hubSkills) {
			map.set(s.name.toLowerCase(), s);
			map.set(s.slug.toLowerCase(), s);
		}
		return map;
	}, [hubSkills]);
	return {
		hubSkills,
		hubTotal,
		hubPage,
		hubLoading,
		hubError,
		hubCategories,
		hubSelectedCategory,
		setHubSelectedCategory,
		hubSortBy,
		setHubSortBy,
		hubInstalledSlugs,
		hubVersionMap,
		localVersionMap,
		hubMetaSlugs,
		hubSkillByName,
		hubUpdateCheckCompleted,
		loadHubSkills,
		handleInstallHubSkill: (0, import_react$27.useCallback)(async (skill, onTrySkill, isUpdate = false) => {
			setHubInstallingSlug(skill.slug);
			try {
				const result = facade ? await facade.skillhub.install(skill.slug, skill.version, skill.name, skill.iconUrl, skill.labels) : {
					success: false,
					skillName: skill.slug,
					errorMessage: "SkillsMarketplace facade not available"
				};
				if (result.success) {
					facade?.skillhub.reportStats(skill.slug, {
						installs: 1,
						downloads: 1
					}).catch(() => {});
					reportEvent(Events.SkillInstalled, {
						name: skill.name,
						skillId: skill.slug,
						skillVersion: skill.version
					});
					reportEvent(Events.SkillAction, {
						name: skill.name,
						skillId: skill.slug,
						skillVersion: skill.version,
						action: isUpdate ? "update" : "install",
						source: "marketplace"
					});
					toast({
						message: t(isUpdate ? "skills.skillhub.updateSuccess" : "skills.skillhub.installSuccess", { name: skill.name }),
						type: "success",
						...onTrySkill ? { action: {
							label: t("skills.toast.trySkill"),
							onClick: () => onTrySkill(skill.name, pickLocalizedExamples(skill)),
							track: {
								elementId: "skill_post_install_try",
								elementName: "安装后去试试",
								props: { source: skill.name }
							}
						} } : {}
					});
					setHubInstalledSlugs((prev) => new Set([...prev, skill.slug]));
					const installedVersion = hubVersionMap[skill.slug] || skill.version;
					if (installedVersion) setLocalVersionMap((prev) => ({
						...prev,
						[skill.slug]: installedVersion
					}));
					await loadSkills(true);
				} else toast({
					message: t((result.errorMessage || "").startsWith("[DOWNLOAD_ERROR]") ? "skills.skillhub.installFailed.download" : "skills.skillhub.installFailed.package"),
					type: "error"
				});
			} catch (error) {
				toast({
					message: t("skills.skillhub.installFailed.download"),
					type: "error"
				});
			} finally {
				setHubInstallingSlug(null);
			}
		}, [
			facade,
			loadSkills,
			reportEvent,
			Events,
			t,
			hubVersionMap
		]),
		getHubInstallBtnState: (0, import_react$27.useCallback)((skill) => {
			if (hubInstallingSlug === skill.slug) return {
				label: t("skills.skillhub.installing"),
				disabled: true,
				variant: "installing"
			};
			if (hubInstalledSlugs.has(skill.slug)) {
				const remoteVersion = hubVersionMap[skill.slug] || skill.version;
				const localVersion = localVersionMap[skill.slug];
				if (localVersion && remoteVersion && localVersion !== remoteVersion) return {
					label: t("skills.skillhub.update"),
					disabled: false,
					variant: "update"
				};
				return {
					label: t("skills.skillhub.installed"),
					disabled: true,
					variant: "installed"
				};
			}
			return {
				label: t("skills.skillhub.install"),
				disabled: false,
				variant: "install"
			};
		}, [
			hubInstallingSlug,
			hubInstalledSlugs,
			hubVersionMap,
			localVersionMap,
			t
		]),
		getInstalledHubSkillUpdate: (0, import_react$27.useCallback)((skill) => {
			const hubSkill = hubSkillByName.get(skill.name.toLowerCase());
			const slug = skill.slug ?? hubSkill?.slug ?? skill.name.toLowerCase();
			if (!hubMetaSlugs.has(slug)) return {
				hasUpdate: false,
				isUpdating: false,
				hubSkill: void 0,
				slug,
				remoteVersion: void 0
			};
			const remoteVersion = hubVersionMap[slug] || hubSkill?.version;
			if (hubInstallingSlug === slug) return {
				hasUpdate: false,
				isUpdating: true,
				hubSkill,
				slug,
				remoteVersion
			};
			const localVersion = localVersionMap[slug];
			if (remoteVersion) {
				if (!localVersion && hubMetaSlugs.has(slug)) return {
					hasUpdate: true,
					isUpdating: false,
					hubSkill,
					slug,
					remoteVersion
				};
				if (localVersion && isNewerVersionStr(remoteVersion, localVersion)) return {
					hasUpdate: true,
					isUpdating: false,
					hubSkill,
					slug,
					remoteVersion
				};
			}
			return {
				hasUpdate: false,
				isUpdating: false,
				hubSkill,
				slug,
				remoteVersion
			};
		}, [
			hubSkillByName,
			hubInstallingSlug,
			hubVersionMap,
			localVersionMap,
			hubMetaSlugs
		]),
		resetHubUpdateCheck,
		isHubSkillInstalling: (slug) => hubInstallingSlug === slug,
		isHubSkillInstalled: (slug) => hubInstalledSlugs.has(slug)
	};
}
function isNewerVersionStr(remote, local) {
	return remote !== local;
}
var import_react$27;
var init_use_skillhub = __esmMin((() => {
	init_src();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_local_cache();
	init_context();
	init_types();
	init_skills_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-knot.ts
/**
* Knot tab 专用 hook。
*
* 设计原则：
*  - 调用链路全部走 `useSkillsMarketplaceFacade()` → SkillsMarketplaceRepo → daemon
*  - Knot 真实 API: list / get_by_ids / download / list_tags
*  - 安装后在本地写 `_knot_meta.json`，再通过 getKnotInstalledMetas 判断已安装与版本。
*  - 非 IOA 用户：完全不发起任何 Knot 远端请求（tab 本身也不展示）。
*/
function useKnot({ t, reportEvent, Events, installedSkills, loadSkills, discoverTab, isIOAUser = false }) {
	let facade;
	try {
		facade = useModuleHost().facades.skillsMarketplace;
	} catch {
		facade = void 0;
	}
	const [knotSkills, setKnotSkills] = (0, import_react$26.useState)([]);
	const [knotTotal, setKnotTotal] = (0, import_react$26.useState)(0);
	const [knotPage, setKnotPage] = (0, import_react$26.useState)(1);
	const [knotLoading, setKnotLoading] = (0, import_react$26.useState)(false);
	const [knotError, setKnotError] = (0, import_react$26.useState)(false);
	const [knotCategories, setKnotCategories] = (0, import_react$26.useState)([]);
	const [knotTags, setKnotTags] = (0, import_react$26.useState)([]);
	const [knotSelectedCategory, setKnotSelectedCategory] = (0, import_react$26.useState)("");
	const [knotSelectedTag, setKnotSelectedTag] = (0, import_react$26.useState)("");
	const [knotSortBy, setKnotSortBy] = (0, import_react$26.useState)("score");
	const [knotInstallingSlug, setKnotInstallingSlug] = (0, import_react$26.useState)(null);
	const [knotInstalledSlugs, setKnotInstalledSlugs] = (0, import_react$26.useState)(/* @__PURE__ */ new Set());
	/** slug → 远端最新版本（来自列表拉取 + getKnotByIds 批量查询） */
	const [knotVersionMap, setKnotVersionMap] = (0, import_react$26.useState)({});
	/** slug → 本地已安装版本（来自 _knot_meta.json） */
	const [knotLocalVersionMap, setKnotLocalVersionMap] = (0, import_react$26.useState)({});
	/** slug → 已安装 Knot skill 的完整元数据（来自 getKnotByIds 响应） */
	const [knotInstalledSkillsBySlug, setKnotInstalledSkillsBySlug] = (0, import_react$26.useState)({});
	/** Knot 已安装 skill 更新检查是否完成 */
	const [knotUpdateCheckCompleted, setKnotUpdateCheckCompleted] = (0, import_react$26.useState)(false);
	const knotLoadedRef = (0, import_react$26.useRef)(false);
	const loadKnotSkillsRef = (0, import_react$26.useRef)();
	const loadKnotTagsRef = (0, import_react$26.useRef)();
	const loadKnotCategoriesRef = (0, import_react$26.useRef)();
	/** @deprecated 使用 loadKnotTags 替代 */
	const loadKnotCategories = (0, import_react$26.useCallback)(async () => {
		if (!facade) {
			setKnotCategories([]);
			return;
		}
		try {
			setKnotCategories(((await facade.knot.getCategories()).items || []).filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder));
		} catch {
			setKnotCategories([]);
		}
	}, [facade]);
	const loadKnotTags = (0, import_react$26.useCallback)(async () => {
		console.log("[useKnot] loadKnotTags facade=", !!facade);
		if (!facade) {
			setKnotTags([]);
			return;
		}
		try {
			console.log("[useKnot] loadKnotTags request");
			const res = await facade.knot.getTags();
			console.log("[useKnot] loadKnotTags response:", JSON.stringify(res, null, 2));
			if (res.code === 0 && Array.isArray(res.data)) setKnotTags(res.data);
			else {
				console.warn("[useKnot] loadKnotTags unexpected response format, code:", res.code);
				setKnotTags([]);
			}
		} catch (err) {
			console.error("[useKnot] loadKnotTags error:", err);
			setKnotTags([]);
		}
	}, [facade]);
	const loadKnotSkills = (0, import_react$26.useCallback)(async (page = 1, append = false) => {
		if (!facade) {
			setKnotError(true);
			return;
		}
		setKnotLoading(true);
		setKnotError(false);
		try {
			const category = knotSelectedCategory || knotSelectedTag || void 0;
			console.log("[useKnot] loadKnotSkills request params:", {
				page,
				pageSize: 100,
				sortBy: knotSortBy,
				order: "desc",
				category
			});
			const res = await facade.knot.list({
				page,
				pageSize: 100,
				sortBy: knotSortBy,
				order: "desc",
				category
			});
			console.log("[useKnot] loadKnotSkills response:", JSON.stringify(res, null, 2));
			const skills = res.data?.skills || [];
			console.log("[useKnot] parsed skills count:", skills.length, "total:", res.data?.total);
			setKnotSkills((prev) => append ? [...prev, ...skills] : skills);
			setKnotTotal(res.data?.total ?? 0);
			setKnotPage(page);
			const versionMap = {};
			for (const s of skills) versionMap[s.slug] = s.version;
			setKnotVersionMap((prev) => ({
				...prev,
				...versionMap
			}));
		} catch (err) {
			console.error("[useKnot] loadKnotSkills error:", err);
			setKnotError(true);
		} finally {
			setKnotLoading(false);
		}
	}, [
		facade,
		knotSortBy,
		knotSelectedCategory,
		knotSelectedTag
	]);
	loadKnotSkillsRef.current = loadKnotSkills;
	loadKnotTagsRef.current = loadKnotTags;
	loadKnotCategoriesRef.current = loadKnotCategories;
	(0, import_react$26.useEffect)(() => {
		if (!isIOAUser) return;
		if (discoverTab === "knot") {
			if (!knotLoadedRef.current) {
				knotLoadedRef.current = true;
				loadKnotSkillsRef.current?.(1);
			}
			loadKnotTagsRef.current?.();
			loadKnotCategoriesRef.current?.();
		}
	}, [discoverTab, isIOAUser]);
	(0, import_react$26.useEffect)(() => {
		if (!isIOAUser) return;
		if (discoverTab === "knot" && knotLoadedRef.current) loadKnotSkills(1);
	}, [
		knotSortBy,
		knotSelectedCategory,
		knotSelectedTag,
		isIOAUser
	]);
	const installedSkillsSignature = (0, import_react$26.useMemo)(() => installedSkills.map((s) => `${s.slug ?? s.name}`).sort().join("|"), [installedSkills]);
	(0, import_react$26.useEffect)(() => {
		if (!isIOAUser) {
			setKnotUpdateCheckCompleted(true);
			return;
		}
		let cancelled = false;
		(async () => {
			try {
				const metas = facade ? await facade.knot.getInstalledMetas() : [];
				if (cancelled) return;
				setKnotInstalledSlugs(new Set(metas.map((m) => m.slug)));
				const localMap = {};
				for (const m of metas) if (m.version) localMap[m.slug] = m.version;
				setKnotLocalVersionMap(localMap);
				if (metas.length === 0) {
					setKnotUpdateCheckCompleted(true);
					return;
				}
				const ids = metas.map((m) => m.id).filter((v) => typeof v === "number");
				if (ids.length === 0 || !facade) {
					setKnotUpdateCheckCompleted(true);
					return;
				}
				const byIdsRes = await facade.knot.getByIds(ids);
				if (cancelled) return;
				if (byIdsRes?.code === 0 && Array.isArray(byIdsRes.data)) {
					const remoteMap = {};
					const skillMap = {};
					for (const s of byIdsRes.data) {
						if (s?.slug && s?.version) remoteMap[s.slug] = s.version;
						if (s?.slug) skillMap[s.slug] = s;
					}
					if (Object.keys(remoteMap).length > 0) setKnotVersionMap((prev) => ({
						...prev,
						...remoteMap
					}));
					if (Object.keys(skillMap).length > 0) setKnotInstalledSkillsBySlug((prev) => ({
						...prev,
						...skillMap
					}));
				}
			} catch (err) {
				console.error("[useKnot] getKnotInstalledMetas / getKnotByIds failed:", err);
				if (!cancelled) {
					setKnotInstalledSlugs(/* @__PURE__ */ new Set());
					setKnotLocalVersionMap({});
				}
			} finally {
				if (!cancelled) setKnotUpdateCheckCompleted(true);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		facade,
		installedSkillsSignature,
		isIOAUser
	]);
	const knotSkillByName = (0, import_react$26.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const s of knotSkills) {
			map.set(s.name.toLowerCase(), s);
			map.set(s.slug.toLowerCase(), s);
		}
		return map;
	}, [knotSkills]);
	const handleInstallKnotSkill = (0, import_react$26.useCallback)(async (skill, onTrySkill, isUpdate = false) => {
		setKnotInstallingSlug(skill.slug);
		try {
			const result = facade ? await facade.knot.install(skill.id, skill.version, skill.name, skill.skill_name, skill.slug) : {
				success: false,
				skillName: skill.slug,
				errorMessage: "SkillsMarketplace facade not available"
			};
			if (result.success) {
				facade?.knot.reportStats(skill.slug, {
					installs: 1,
					downloads: 1
				}).catch(() => {});
				const skillId = skill.slug || String(skill.id);
				reportEvent(Events.SkillInstalled, {
					name: skill.name,
					skillId,
					skillVersion: skill.version
				});
				reportEvent(Events.SkillAction, {
					name: skill.name,
					skillId,
					skillVersion: skill.version,
					action: isUpdate ? "update" : "install",
					source: "knot"
				});
				toast({
					message: t(isUpdate ? "skills.knot.updateSuccess" : "skills.knot.installSuccess", { name: skill.name }),
					type: "success",
					...onTrySkill ? { action: {
						label: t("skills.toast.trySkill"),
						onClick: () => onTrySkill(skill.name, pickLocalizedExamples(skill)),
						track: {
							elementId: "skill_post_install_try",
							elementName: "安装后去试试",
							props: { source: skill.name }
						}
					} } : {}
				});
				setKnotInstalledSlugs((prev) => new Set([...prev, skill.slug]));
				const installedVersion = knotVersionMap[skill.slug] || skill.version;
				if (installedVersion) setKnotLocalVersionMap((prev) => ({
					...prev,
					[skill.slug]: installedVersion
				}));
				await loadSkills(true);
			} else toast({
				message: t((result.errorMessage || "").startsWith("[DOWNLOAD_ERROR]") ? "skills.knot.installFailed.download" : "skills.knot.installFailed.package"),
				type: "error"
			});
		} catch {
			toast({
				message: t("skills.knot.installFailed.download"),
				type: "error"
			});
		} finally {
			setKnotInstallingSlug(null);
		}
	}, [
		facade,
		loadSkills,
		reportEvent,
		Events,
		t,
		knotVersionMap
	]);
	const resetKnotUpdateCheck = (0, import_react$26.useCallback)(() => {
		setKnotUpdateCheckCompleted(false);
		setKnotLocalVersionMap({});
		setKnotInstalledSlugs(/* @__PURE__ */ new Set());
		setKnotInstalledSkillsBySlug({});
	}, []);
	return {
		knotSkills,
		knotTotal,
		knotPage,
		knotLoading,
		knotError,
		knotCategories,
		knotTags,
		knotSelectedCategory,
		setKnotSelectedCategory,
		knotSelectedTag,
		setKnotSelectedTag,
		knotSortBy,
		setKnotSortBy,
		knotInstalledSlugs,
		knotVersionMap,
		knotLocalVersionMap,
		knotSkillByName,
		knotUpdateCheckCompleted,
		loadKnotSkills,
		loadKnotTags,
		handleInstallKnotSkill,
		getKnotInstallBtnState: (0, import_react$26.useCallback)((skill) => {
			if (knotInstallingSlug === skill.slug) return {
				label: t("skills.knot.installing"),
				disabled: true,
				variant: "installing"
			};
			if (knotInstalledSlugs.has(skill.slug)) {
				const remoteVersion = knotVersionMap[skill.slug] || skill.version;
				const localVersion = knotLocalVersionMap[skill.slug];
				if (localVersion && remoteVersion && isNewerVersion(remoteVersion, localVersion)) return {
					label: t("skills.knot.update"),
					disabled: false,
					variant: "update"
				};
				return {
					label: t("skills.knot.installed"),
					disabled: true,
					variant: "installed"
				};
			}
			return {
				label: t("skills.knot.install"),
				disabled: false,
				variant: "install"
			};
		}, [
			knotInstallingSlug,
			knotInstalledSlugs,
			knotVersionMap,
			knotLocalVersionMap,
			t
		]),
		getInstalledKnotSkillUpdate: (0, import_react$26.useCallback)((skill) => {
			const lowerName = skill.name.toLowerCase();
			const knotSkill = knotSkillByName.get(lowerName) ?? knotInstalledSkillsBySlug[skill.slug ?? ""] ?? knotInstalledSkillsBySlug[lowerName];
			const slug = skill.slug ?? knotSkill?.slug ?? lowerName;
			if (!knotInstalledSlugs.has(slug)) return {
				hasUpdate: false,
				isUpdating: false,
				knotSkill: void 0,
				slug,
				remoteVersion: void 0
			};
			const remoteVersion = knotVersionMap[slug] || knotSkill?.version;
			if (knotInstallingSlug === slug) return {
				hasUpdate: false,
				isUpdating: true,
				knotSkill,
				slug,
				remoteVersion
			};
			const localVersion = knotLocalVersionMap[slug];
			if (remoteVersion) {
				if (!localVersion) return {
					hasUpdate: true,
					isUpdating: false,
					knotSkill,
					slug,
					remoteVersion
				};
				if (isNewerVersion(remoteVersion, localVersion)) return {
					hasUpdate: true,
					isUpdating: false,
					knotSkill,
					slug,
					remoteVersion
				};
			}
			return {
				hasUpdate: false,
				isUpdating: false,
				knotSkill,
				slug,
				remoteVersion
			};
		}, [
			knotSkillByName,
			knotInstalledSkillsBySlug,
			knotInstalledSlugs,
			knotInstallingSlug,
			knotVersionMap,
			knotLocalVersionMap
		]),
		resetKnotUpdateCheck,
		isKnotSkillInstalling: (slug) => knotInstallingSlug === slug,
		isKnotSkillInstalled: (slug) => knotInstalledSlugs.has(slug)
	};
}
var import_react$26;
var init_use_knot = __esmMin((() => {
	init_src();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_types();
	init_skills_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-builtin-market.ts
/**
* 内置 Skill 市场 hook（recommend tab 数据源）。
*
* 设计原则：
*  - 调用链路全部走 `useSkillsMarketplaceFacade()` → SkillsMarketplaceRepo → daemon
*  - 真实 API: `listBuiltin / getBuiltinByIds / installBuiltin / getBuiltinInstalledMetas /
*              getBuiltinCategories / backfillBuiltinSkillId / backfillBuiltinIconSource`
*  - 安装后在本地写 `_skillhub_meta.json`（source=marketplace + skillId 即 backend 主键）；
*    通过 `getBuiltinInstalledMetas` 判断是否已安装与版本。
*  - 分页模式（page / pageSize），支持下拉加载更多与筛选变更时重新加载第一页。
*/
function useBuiltinMarket({ t, reportEvent, Events, installedSkills, loadSkills, discoverTab, visible, active }) {
	let facade;
	let enterpriseId;
	try {
		const host = useModuleHost();
		facade = host.facades.skillsMarketplace;
		const eid = host.accountInfo?.enterpriseId;
		enterpriseId = typeof eid === "string" && eid.trim() ? eid.trim() : void 0;
	} catch {
		facade = void 0;
		enterpriseId = void 0;
	}
	const [builtinMarketSkills, setBuiltinMarketSkills] = (0, import_react$25.useState)(() => readCache("skills-cache-builtin-market") || []);
	const [builtinMarketTotal, setBuiltinMarketTotal] = (0, import_react$25.useState)(0);
	const [builtinMarketPage, setBuiltinMarketPage] = (0, import_react$25.useState)(1);
	const [builtinMarketLoading, setBuiltinMarketLoading] = (0, import_react$25.useState)(false);
	const [builtinMarketError, setBuiltinMarketError] = (0, import_react$25.useState)(false);
	const [featuredSkills, setFeaturedSkills] = (0, import_react$25.useState)(() => readCache("skills-cache-featured") || []);
	const [featuredLoading, setFeaturedLoading] = (0, import_react$25.useState)(false);
	const featuredLoadedRef = (0, import_react$25.useRef)(false);
	const [builtinMarketCategories, setBuiltinMarketCategories] = (0, import_react$25.useState)([]);
	const [builtinMarketSelectedCategory, setBuiltinMarketSelectedCategory] = (0, import_react$25.useState)("");
	const [builtinMarketInstallingSkill, setBuiltinMarketInstallingSkill] = (0, import_react$25.useState)(null);
	/** skillId → 已安装标记 */
	const [installedSkillIds, setInstalledSkillIds] = (0, import_react$25.useState)(/* @__PURE__ */ new Set());
	/** skillId → 远端最新版本（来自 list 拉取 + get-by-ids 批量查询） */
	const [builtinMarketVersionMap, setBuiltinMarketVersionMap] = (0, import_react$25.useState)({});
	/** skillId → 本地已安装版本（来自 _skillhub_meta.json） */
	const [builtinMarketLocalVersionMap, setBuiltinMarketLocalVersionMap] = (0, import_react$25.useState)({});
	/** skillId → 已安装 skill 的完整元数据（来自 get-by-ids 响应） */
	const [installedBuiltinMarketSkillsById, setInstalledBuiltinMarketSkillsById] = (0, import_react$25.useState)({});
	/** BuiltinMarket 已安装 skill 更新检查是否完成 */
	const [updateCheckCompleted, setUpdateCheckCompleted] = (0, import_react$25.useState)(false);
	const builtinMarketLoadedRef = (0, import_react$25.useRef)(false);
	const prefetchedRef = (0, import_react$25.useRef)(false);
	const loadListRef = (0, import_react$25.useRef)();
	const loadCategoriesRef = (0, import_react$25.useRef)();
	/**
	* 老 meta（source=marketplace 但缺 skillId）的缓存 —— 来自 getBuiltinInstalledMetas。
	* key = 占位 id（通常为 name.toLowerCase()），用于在 list 加载完毕后做 description ↔ name 匹配回填。
	* 回填成功后该条会被移除。
	*/
	const legacyMetasByPlaceholderRef = (0, import_react$25.useRef)(/* @__PURE__ */ new Map());
	/** 已经发起过 backfill 请求的 matchName 集合，避免重复写盘 */
	const backfilledNamesRef = (0, import_react$25.useRef)(/* @__PURE__ */ new Set());
	/**
	* 已装但本地 meta 缺失 iconSource 或 iconSource 不是 URL 的记录。
	* key = meta.name.trim().toLowerCase()；loadBuiltinMarketList 拉到 skills 后，
	* 用 skill.description 做 case-insensitive 比对，匹配成功且接口返回 icon 是 URL 时回填。
	*/
	const iconSourceMissingByNameRef = (0, import_react$25.useRef)(/* @__PURE__ */ new Map());
	/** 已经发起过 iconSource backfill 请求的 matchName 集合，避免重复写盘 */
	const iconBackfilledNamesRef = (0, import_react$25.useRef)(/* @__PURE__ */ new Set());
	/**
	* 已装但本地 meta 缺失 description_zh / description_en 的记录(运营源描述)。
	* key = meta.name.trim().toLowerCase();loadBuiltinMarketList 拉到 skills 后,
	* 用 skill.description(meta 写入时也是用它做 name)做 case-insensitive 比对,
	* 匹配成功且接口返回的 description_zh/en 至少一个非空时回填到磁盘。
	*
	* 与 iconSource 不同点:不强制要求是 URL,字段就是文案;但要求接口侧"至少一个非空",
	* 否则没意义(老 meta 反正也是空)。
	*/
	const descriptionMissingByNameRef = (0, import_react$25.useRef)(/* @__PURE__ */ new Map());
	/** 已经发起过 description backfill 请求的 matchName 集合,避免重复写盘 */
	const descriptionBackfilledNamesRef = (0, import_react$25.useRef)(/* @__PURE__ */ new Set());
	const loadBuiltinMarketCategories = (0, import_react$25.useCallback)(async () => {
		if (!facade) {
			setBuiltinMarketCategories([]);
			return;
		}
		try {
			const res = await facade.builtin.getCategories("skill");
			if (res.code === 0 && Array.isArray(res.data?.items)) setBuiltinMarketCategories([...res.data.items].sort((a, b) => a.sort_order - b.sort_order));
			else setBuiltinMarketCategories([]);
		} catch (err) {
			console.warn("[useBuiltinMarket] loadBuiltinMarketCategories failed:", err);
			setBuiltinMarketCategories([]);
		}
	}, [facade]);
	/**
	* 老 marketplace 安装 skillId 回填：
	*   - 输入一批刚从 /skill/list 拉到的 skills
	*   - 用 skill.description（= 安装时写入的 displayName）与 legacyMetasByPlaceholderRef 里的
	*     meta.name 做不区分大小写比对，匹配成功则认为找到了该 skill 的真实 id
	*   - 调 facade.builtin.backfillSkillId 把 skillId 写回磁盘
	*   - 更新内存 state：installedSkillIds / localVersionMap 里的占位 key 换成真 skillId
	*   - 收集新发现的 skillId，再调一次 getBuiltinByIds 拿 remote version，
	*     这样本次进入面板就能展示 "有更新"（无需重启）
	*/
	const backfillLegacySkillIds = (0, import_react$25.useCallback)(async (skills) => {
		if (!skills.length) return;
		if (legacyMetasByPlaceholderRef.current.size === 0) return;
		if (!facade) return;
		const matched = /* @__PURE__ */ new Map();
		for (const s of skills) {
			const desc = (s.description || "").trim().toLowerCase();
			if (!desc) continue;
			const meta = legacyMetasByPlaceholderRef.current.get(desc);
			if (!meta) continue;
			const realId = getBuiltinMarketSkillId(s);
			if (!realId) continue;
			matched.set(desc, {
				skillId: realId,
				version: s.version,
				name: meta.name
			});
		}
		if (matched.size === 0) return;
		await Promise.all(Array.from(matched.entries()).map(async ([placeholder, info]) => {
			const matchName = info.name ?? placeholder;
			if (backfilledNamesRef.current.has(matchName)) return;
			backfilledNamesRef.current.add(matchName);
			try {
				await facade.builtin.backfillSkillId({
					matchName,
					skillId: info.skillId
				});
			} catch (err) {
				console.warn("[useBuiltinMarket] backfillBuiltinSkillId failed:", err);
			}
		}));
		setInstalledSkillIds((prev) => {
			const next = new Set(prev);
			for (const [placeholder, info] of matched) {
				next.delete(placeholder);
				next.add(info.skillId);
			}
			return next;
		});
		setBuiltinMarketLocalVersionMap((prev) => {
			const next = { ...prev };
			for (const [placeholder, info] of matched) {
				const v = next[placeholder];
				if (v !== void 0) {
					delete next[placeholder];
					next[info.skillId] = v;
				} else if (info.version) {}
			}
			return next;
		});
		for (const placeholder of matched.keys()) legacyMetasByPlaceholderRef.current.delete(placeholder);
		try {
			const ids = Array.from(matched.values()).map((v) => v.skillId);
			const byIdsRes = await facade.builtin.getByIds(ids);
			if (byIdsRes?.code === 0 && Array.isArray(byIdsRes.data?.skills)) {
				const remoteMap = {};
				const skillMap = {};
				for (const s of byIdsRes.data.skills) {
					const sid = getBuiltinMarketSkillId(s);
					if (sid && s.version) remoteMap[sid] = s.version;
					if (sid) skillMap[sid] = s;
				}
				if (Object.keys(remoteMap).length > 0) setBuiltinMarketVersionMap((prev) => ({
					...prev,
					...remoteMap
				}));
				if (Object.keys(skillMap).length > 0) setInstalledBuiltinMarketSkillsById((prev) => ({
					...prev,
					...skillMap
				}));
			}
		} catch (err) {
			console.warn("[useBuiltinMarket] post-backfill getByIds failed:", err);
		}
	}, [facade]);
	/**
	* iconSource 回填：
	*   - 输入一批从 /skill/list 拉到的 skills
	*   - 对每个 skill，用 skill.description ↔ iconSourceMissingByNameRef 里的 meta.name（已 lowercase）
	*     做比对；匹配成功 + 接口返回的 icon 是 URL → 调 facade.builtin.backfillIconSource 写回磁盘
	*   - 判别条件（UI 侧预筛）：本地 meta 缺失 iconSource，或 iconSource 不是 http(s):// 链接
	*   - 回填是 fire-and-forget，不阻塞渲染；成功后也不更新内存 state（下次 list 刷新自然生效）
	*/
	const backfillLegacyIconSources = (0, import_react$25.useCallback)(async (skills) => {
		if (!skills.length) return;
		if (iconSourceMissingByNameRef.current.size === 0) return;
		if (!facade) return;
		const isUrl = (s) => typeof s === "string" && /^https?:\/\//i.test(s);
		const matched = /* @__PURE__ */ new Map();
		for (const s of skills) {
			const icon = isUrl(s.icon) ? s.icon : isUrl(s.icon_url) ? s.icon_url : "";
			if (!icon) continue;
			const desc = (s.description ?? "").trim();
			if (!desc) continue;
			const key = desc.toLowerCase();
			if (!iconSourceMissingByNameRef.current.get(key)) continue;
			matched.set(key, {
				icon,
				matchName: desc
			});
		}
		if (matched.size === 0) return;
		await Promise.all(Array.from(matched.values()).map(async ({ icon, matchName }) => {
			if (iconBackfilledNamesRef.current.has(matchName)) return;
			iconBackfilledNamesRef.current.add(matchName);
			try {
				if (await facade.builtin.backfillIconSource({
					matchName,
					icon
				}) > 0) iconSourceMissingByNameRef.current.delete(matchName.toLowerCase());
			} catch (err) {
				console.warn("[useBuiltinMarket] backfillBuiltinIconSource failed:", err);
			}
		}));
	}, [facade]);
	/**
	* description_zh / description_en 回填：
	*   - 输入一批从 /skill/list 拉到的 skills
	*   - 对每个 skill,用 skill.description ↔ descriptionMissingByNameRef 里的 meta.name(已 lowercase)做比对
	*   - 匹配成功 + 接口返回的 description_zh / description_en 至少一个非空 → 调
	*     facade.builtin.backfillDescription 写回磁盘
	*   - 字段级粒度:只把"接口非空 && 本地缺失"的那一个语种回填(由后端 service 实现保证),
	*     这里只负责把数据原样透传过去
	*   - 回填是 fire-and-forget,不阻塞渲染;成功后从 missing 集合移除避免重试
	*/
	const backfillLegacyDescriptions = (0, import_react$25.useCallback)(async (skills) => {
		if (!skills.length) return;
		if (descriptionMissingByNameRef.current.size === 0) return;
		if (!facade?.builtin.backfillDescription) return;
		const trim = (s) => typeof s === "string" ? s.trim() : "";
		const matched = /* @__PURE__ */ new Map();
		for (const s of skills) {
			const desc = trim(s.description);
			if (!desc) continue;
			const key = desc.toLowerCase();
			if (!descriptionMissingByNameRef.current.has(key)) continue;
			const dzh = trim(s.description_zh);
			const den = trim(s.description_en);
			if (!dzh && !den) continue;
			matched.set(key, {
				description_zh: dzh,
				description_en: den,
				matchName: desc
			});
		}
		if (matched.size === 0) return;
		await Promise.all(Array.from(matched.values()).map(async ({ description_zh, description_en, matchName }) => {
			if (descriptionBackfilledNamesRef.current.has(matchName)) return;
			descriptionBackfilledNamesRef.current.add(matchName);
			try {
				if (await facade.builtin.backfillDescription({
					matchName,
					description_zh,
					description_en
				}) > 0) descriptionMissingByNameRef.current.delete(matchName.toLowerCase());
			} catch (err) {
				console.warn("[useBuiltinMarket] backfillBuiltinDescription failed:", err);
			}
		}));
	}, [facade]);
	const loadBuiltinMarketList = (0, import_react$25.useCallback)(async (page = 1, append = false) => {
		if (!facade) {
			setBuiltinMarketError(true);
			return;
		}
		setBuiltinMarketLoading(true);
		setBuiltinMarketError(false);
		try {
			const categories = builtinMarketSelectedCategory ? [builtinMarketSelectedCategory] : void 0;
			const res = await facade.builtin.list({
				page,
				pageSize: 100,
				categories,
				enterpriseId
			});
			if (res.code !== 0) {
				setBuiltinMarketError(true);
				return;
			}
			const skills = res.data?.skills || [];
			const total = res.data?.total_count ?? 0;
			setBuiltinMarketSkills((prev) => {
				const next = append ? [...prev, ...skills] : skills;
				writeCache(SKILLS_CACHE_KEY_BUILTIN_MARKET, next);
				return next;
			});
			setBuiltinMarketTotal(total);
			setBuiltinMarketPage(page);
			const versionMap = {};
			for (const s of skills) {
				const sid = getBuiltinMarketSkillId(s);
				if (sid && s.version) versionMap[sid] = s.version;
			}
			if (Object.keys(versionMap).length > 0) setBuiltinMarketVersionMap((prev) => ({
				...prev,
				...versionMap
			}));
			backfillLegacySkillIds(skills);
			backfillLegacyIconSources(skills);
			backfillLegacyDescriptions(skills);
		} catch (err) {
			console.error("[useBuiltinMarket] loadBuiltinMarketList error:", err);
			setBuiltinMarketError(true);
		} finally {
			setBuiltinMarketLoading(false);
		}
	}, [
		facade,
		enterpriseId,
		builtinMarketSelectedCategory,
		backfillLegacySkillIds,
		backfillLegacyIconSources,
		backfillLegacyDescriptions
	]);
	loadListRef.current = loadBuiltinMarketList;
	loadCategoriesRef.current = loadBuiltinMarketCategories;
	const loadFeaturedSkills = (0, import_react$25.useCallback)(async (force = false) => {
		if (!facade) return;
		if (!force) {
			const cachedTs = readCache(SKILLS_CACHE_KEY_FEATURED_TS);
			if (cachedTs && Date.now() - cachedTs < 3e5) return;
		}
		setFeaturedLoading(true);
		try {
			const res = await facade.builtin.list({
				feature: [1],
				page: 1,
				pageSize: 100,
				enterpriseId
			});
			if (res.code === 0 && Array.isArray(res.data?.skills)) {
				const skills = res.data.skills;
				setFeaturedSkills(skills);
				writeCache(SKILLS_CACHE_KEY_FEATURED, skills);
				writeCache(SKILLS_CACHE_KEY_FEATURED_TS, Date.now());
			}
		} catch (err) {
			console.warn("[useBuiltinMarket] loadFeaturedSkills failed:", err);
		} finally {
			setFeaturedLoading(false);
		}
	}, [facade, enterpriseId]);
	const loadFeaturedRef = (0, import_react$25.useRef)(loadFeaturedSkills);
	loadFeaturedRef.current = loadFeaturedSkills;
	(0, import_react$25.useEffect)(() => {
		if (facade && visible && active && !prefetchedRef.current) {
			prefetchedRef.current = true;
			builtinMarketLoadedRef.current = true;
			loadListRef.current?.(1);
			loadCategoriesRef.current?.();
			if (!featuredLoadedRef.current) {
				featuredLoadedRef.current = true;
				loadFeaturedRef.current?.();
			}
		}
	}, [
		facade,
		visible,
		active
	]);
	(0, import_react$25.useEffect)(() => {
		if (discoverTab === "recommend" && !builtinMarketLoadedRef.current) {
			builtinMarketLoadedRef.current = true;
			loadListRef.current?.(1);
			loadCategoriesRef.current?.();
		}
		if (discoverTab === "recommend" && !featuredLoadedRef.current) {
			featuredLoadedRef.current = true;
			loadFeaturedRef.current?.();
		}
	}, [discoverTab]);
	const categoryMountedRef = (0, import_react$25.useRef)(false);
	(0, import_react$25.useEffect)(() => {
		if (!categoryMountedRef.current) {
			categoryMountedRef.current = true;
			return;
		}
		if (builtinMarketLoadedRef.current) loadBuiltinMarketList(1);
	}, [builtinMarketSelectedCategory]);
	const installedSkillsSignature = (0, import_react$25.useMemo)(() => installedSkills.map((s) => `${s.slug ?? s.name}`).sort().join("|"), [installedSkills]);
	/**
	* 重新读取本地 `_builtin_market_meta.json` 并刷新已安装/版本状态。
	* 抽成可被 effect 与 reset 函数共享调用的逻辑，避免 batch update 后
	* 因 installedSkillsSignature 不变而无法重跑 detect、导致已装 skill
	* 短暂回流到推荐 tab "未安装" 列表（issue: skill 弹窗确认更新后已装推荐 skill 出现在未安装列表）。
	*
	* @returns cleanup 函数，调用后取消尚未完成的 setState 副作用
	*/
	const detectInstalledBuiltinMarketSkills = (0, import_react$25.useCallback)(() => {
		let cancelled = false;
		(async () => {
			try {
				const metas = facade ? await facade.builtin.getInstalledMetas() : [];
				if (cancelled) return;
				const installedIds = /* @__PURE__ */ new Set();
				const legacyMap = /* @__PURE__ */ new Map();
				const iconMissingMap = /* @__PURE__ */ new Map();
				const descriptionMissingMap = /* @__PURE__ */ new Map();
				const isUrlStr = (s) => typeof s === "string" && /^https?:\/\//i.test(s);
				const isNonEmptyStr = (s) => typeof s === "string" && s.trim().length > 0;
				for (const m of metas) {
					if (m.skillId) installedIds.add(m.skillId);
					else {
						const placeholder = (m.name || m.skillName || "").toLowerCase();
						if (placeholder) {
							installedIds.add(placeholder);
							legacyMap.set(placeholder, m);
						}
					}
					if (!isUrlStr(m.iconSource)) {
						const nameKey = (m.name || m.skillName || "").trim().toLowerCase();
						if (nameKey) iconMissingMap.set(nameKey, m);
					}
					if (!isNonEmptyStr(m.description_zh) || !isNonEmptyStr(m.description_en)) {
						const nameKey = (m.name || m.skillName || "").trim().toLowerCase();
						if (nameKey) descriptionMissingMap.set(nameKey, m);
					}
				}
				legacyMetasByPlaceholderRef.current = legacyMap;
				iconSourceMissingByNameRef.current = iconMissingMap;
				descriptionMissingByNameRef.current = descriptionMissingMap;
				setInstalledSkillIds(installedIds);
				const localMap = {};
				for (const m of metas) {
					if (!m.version) continue;
					const key = m.skillId || (m.name || m.skillName || "").toLowerCase();
					if (key) localMap[key] = m.version;
				}
				setBuiltinMarketLocalVersionMap(localMap);
				if (metas.length === 0) {
					setUpdateCheckCompleted(true);
					return;
				}
				const ids = metas.map((m) => m.skillId).filter((v) => !!v);
				if (ids.length === 0 || !facade) {
					setUpdateCheckCompleted(true);
					return;
				}
				const byIdsRes = await facade.builtin.getByIds(ids);
				if (cancelled) return;
				if (byIdsRes?.code === 0 && Array.isArray(byIdsRes.data?.skills)) {
					const remoteMap = {};
					const skillMap = {};
					for (const s of byIdsRes.data.skills) {
						const sid = getBuiltinMarketSkillId(s);
						if (sid && s.version) remoteMap[sid] = s.version;
						if (sid) skillMap[sid] = s;
					}
					if (Object.keys(remoteMap).length > 0) setBuiltinMarketVersionMap((prev) => ({
						...prev,
						...remoteMap
					}));
					if (Object.keys(skillMap).length > 0) setInstalledBuiltinMarketSkillsById((prev) => ({
						...prev,
						...skillMap
					}));
				}
			} catch (err) {
				console.error("[useBuiltinMarket] getBuiltinInstalledMetas / getByIds failed:", err);
			} finally {
				if (!cancelled) setUpdateCheckCompleted(true);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [facade, installedSkillsSignature]);
	(0, import_react$25.useEffect)(() => {
		return detectInstalledBuiltinMarketSkills();
	}, [detectInstalledBuiltinMarketSkills]);
	(0, import_react$25.useEffect)(() => {
		if (!updateCheckCompleted) return;
		if (builtinMarketSkills.length === 0) return;
		if (legacyMetasByPlaceholderRef.current.size === 0 && iconSourceMissingByNameRef.current.size === 0 && descriptionMissingByNameRef.current.size === 0) return;
		backfillLegacySkillIds(builtinMarketSkills);
		backfillLegacyIconSources(builtinMarketSkills);
		backfillLegacyDescriptions(builtinMarketSkills);
	}, [
		updateCheckCompleted,
		builtinMarketSkills,
		backfillLegacySkillIds,
		backfillLegacyIconSources,
		backfillLegacyDescriptions
	]);
	const builtinMarketSkillByName = (0, import_react$25.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const s of builtinMarketSkills) map.set(s.name.toLowerCase(), s);
		for (const s of Object.values(installedBuiltinMarketSkillsById)) map.set(s.name.toLowerCase(), s);
		return map;
	}, [builtinMarketSkills, installedBuiltinMarketSkillsById]);
	const displayBuiltinMarketSkills = (0, import_react$25.useMemo)(() => builtinMarketSkills, [builtinMarketSkills]);
	const handleInstallBuiltinMarketSkill = (0, import_react$25.useCallback)(async (skill, onTrySkill, isUpdate = false) => {
		const skillId = getBuiltinMarketSkillId(skill);
		setBuiltinMarketInstallingSkill(skillId);
		const localizedName = getBuiltinMarketDisplayName(skill);
		try {
			const resolvedVersion = skillId && builtinMarketVersionMap[skillId] || skill.version;
			const result = facade ? await facade.builtin.install({
				skillId,
				version: resolvedVersion,
				name: skill.description,
				skillName: skill.name,
				icon: skill.icon || skill.icon_url,
				examples_zh: skill.examples_zh,
				examples_en: skill.examples_en,
				description_zh: skill.description_zh,
				description_en: skill.description_en
			}) : {
				success: false,
				skillName: skill.name,
				errorMessage: "SkillsMarketplace facade not available"
			};
			if (result.success) {
				const skillId = getBuiltinMarketSkillId(skill);
				reportEvent(Events.SkillInstalled, {
					name: skill.name,
					skillId,
					skillVersion: resolvedVersion
				});
				reportEvent(Events.SkillAction, {
					name: skill.name,
					skillId,
					skillVersion: resolvedVersion,
					action: isUpdate ? "update" : "install",
					source: "builtin-market"
				});
				toast({
					message: t(isUpdate ? "skills.recommend.updateSuccess" : "skills.recommend.installSuccess", { name: localizedName }),
					type: "success",
					...onTrySkill ? { action: {
						label: t("skills.toast.trySkill"),
						onClick: () => onTrySkill(skill.name, pickLocalizedExamples(skill), localizedName, skillId),
						track: {
							elementId: "skill_post_install_try",
							elementName: "安装后去试试",
							props: { source: skill.name }
						}
					} } : {}
				});
				setInstalledSkillIds((prev) => {
					const next = new Set([...prev, skillId]);
					const nameLower = (skill.name || "").toLowerCase();
					if (nameLower && nameLower !== skillId) next.add(nameLower);
					return next;
				});
				const installedVersion = result.version || skill.version;
				if (installedVersion) setBuiltinMarketLocalVersionMap((prev) => ({
					...prev,
					[skillId]: installedVersion
				}));
				await loadSkills(true);
			} else toast({
				message: t("skills.recommend.installFailed", { name: localizedName }),
				type: "error"
			});
		} catch (err) {
			console.error("[useBuiltinMarket] install error:", err);
			toast({
				message: t("skills.recommend.installFailed", { name: localizedName }),
				type: "error"
			});
		} finally {
			setBuiltinMarketInstallingSkill(null);
		}
	}, [
		facade,
		loadSkills,
		reportEvent,
		Events,
		t,
		builtinMarketVersionMap
	]);
	const resetBuiltinMarketUpdateCheck = (0, import_react$25.useCallback)(() => {
		setUpdateCheckCompleted(false);
		legacyMetasByPlaceholderRef.current = /* @__PURE__ */ new Map();
		backfilledNamesRef.current = /* @__PURE__ */ new Set();
		iconBackfilledNamesRef.current = /* @__PURE__ */ new Set();
		descriptionBackfilledNamesRef.current = /* @__PURE__ */ new Set();
		detectInstalledBuiltinMarketSkills();
	}, [detectInstalledBuiltinMarketSkills]);
	const installedSkillNameSet = (0, import_react$25.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		for (const skill of installedSkills) {
			if (skill.name) s.add(skill.name.toLowerCase());
			if (skill.slug) s.add(skill.slug.toLowerCase());
			if (skill.skillId) s.add(skill.skillId.toLowerCase());
		}
		return s;
	}, [installedSkills]);
	return {
		builtinMarketSkills,
		displayBuiltinMarketSkills,
		builtinMarketTotal,
		builtinMarketPage,
		builtinMarketLoading,
		builtinMarketError,
		builtinMarketCategories,
		builtinMarketSelectedCategory,
		setBuiltinMarketSelectedCategory,
		builtinMarketSkillByName,
		installedSkillIds,
		builtinMarketVersionMap,
		builtinMarketLocalVersionMap,
		builtinMarketUpdateCheckCompleted: updateCheckCompleted,
		featuredSkills,
		featuredLoading,
		loadFeaturedSkills,
		loadBuiltinMarketList,
		loadBuiltinMarketCategories,
		handleInstallBuiltinMarketSkill,
		getBuiltinMarketInstallBtnState: (0, import_react$25.useCallback)((skill) => {
			const skillId = getBuiltinMarketSkillId(skill);
			const nameLower = (skill.name || "").toLowerCase();
			if (builtinMarketInstallingSkill === skillId || builtinMarketInstallingSkill === nameLower) return {
				label: t("skills.recommend.installing"),
				disabled: true,
				variant: "installing"
			};
			const matchedKey = installedSkillIds.has(skillId) ? skillId : nameLower && installedSkillIds.has(nameLower) ? nameLower : null;
			const isFallbackInstalled = !matchedKey && (installedSkillNameSet.has(skillId) || installedSkillNameSet.has(nameLower));
			if (matchedKey || isFallbackInstalled) {
				const effectiveKey = matchedKey || skillId;
				const remoteVersion = builtinMarketVersionMap[effectiveKey] || builtinMarketVersionMap[skillId] || skill.version;
				const localVersion = builtinMarketLocalVersionMap[effectiveKey] || builtinMarketLocalVersionMap[skillId];
				if (localVersion && remoteVersion && isNewerVersion(remoteVersion, localVersion)) return {
					label: t("skills.recommend.update"),
					disabled: false,
					variant: "update"
				};
				return {
					label: t("skills.recommend.installed"),
					disabled: true,
					variant: "installed"
				};
			}
			return {
				label: t("skills.recommend.install"),
				disabled: false,
				variant: "install"
			};
		}, [
			builtinMarketInstallingSkill,
			installedSkillIds,
			installedSkillNameSet,
			builtinMarketVersionMap,
			builtinMarketLocalVersionMap,
			t
		]),
		getInstalledBuiltinMarketSkillUpdate: (0, import_react$25.useCallback)((skill) => {
			const backendSkillId = typeof skill.skillId === "string" && skill.skillId.trim().length > 0 ? skill.skillId : void 0;
			const lowerName = skill.name.toLowerCase();
			const bmSkillByName = builtinMarketSkillByName.get(lowerName);
			const skillId = backendSkillId ?? (bmSkillByName ? getBuiltinMarketSkillId(bmSkillByName) : lowerName);
			const bmSkill = bmSkillByName ?? builtinMarketSkills.find((s) => getBuiltinMarketSkillId(s) === skillId);
			if (!installedSkillIds.has(skillId)) return {
				hasUpdate: false,
				isUpdating: false,
				builtinMarketSkill: void 0,
				skillId,
				remoteVersion: void 0
			};
			const remoteVersion = builtinMarketVersionMap[skillId] || bmSkill?.version;
			if (builtinMarketInstallingSkill === skillId) return {
				hasUpdate: false,
				isUpdating: true,
				builtinMarketSkill: bmSkill,
				skillId,
				remoteVersion
			};
			const localVersion = builtinMarketLocalVersionMap[skillId];
			if (remoteVersion) {
				if (!localVersion) return {
					hasUpdate: true,
					isUpdating: false,
					builtinMarketSkill: bmSkill,
					skillId,
					remoteVersion
				};
				if (isNewerVersion(remoteVersion, localVersion)) return {
					hasUpdate: true,
					isUpdating: false,
					builtinMarketSkill: bmSkill,
					skillId,
					remoteVersion
				};
			}
			return {
				hasUpdate: false,
				isUpdating: false,
				builtinMarketSkill: bmSkill,
				skillId,
				remoteVersion
			};
		}, [
			builtinMarketSkillByName,
			builtinMarketSkills,
			installedSkillIds,
			builtinMarketInstallingSkill,
			builtinMarketVersionMap,
			builtinMarketLocalVersionMap
		]),
		resetBuiltinMarketUpdateCheck,
		isBuiltinMarketSkillInstalling: (skillId) => builtinMarketInstallingSkill === skillId
	};
}
var import_react$25;
var init_use_builtin_market = __esmMin((() => {
	init_common();
	init_src();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_local_cache();
	init_skill_card_helpers();
	init_context();
	init_types();
	init_skills_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/enterprise-skills-storage.ts
function getSeenStorageKey(enterpriseId) {
	return `${SEEN_STORAGE_KEY_PREFIX}${enterpriseId}`;
}
function readSeenFlag(enterpriseId) {
	if (!enterpriseId) return true;
	try {
		return localStorage.getItem(getSeenStorageKey(enterpriseId)) === "1";
	} catch {
		return true;
	}
}
function writeSeenFlag(enterpriseId) {
	if (!enterpriseId) return;
	try {
		localStorage.setItem(getSeenStorageKey(enterpriseId), "1");
	} catch {}
}
/**
* 已装 skill.id 集合的 localStorage key（按 enterpriseId 分桶）。
*
* 持久化原因：
*   企业自建 skill 安装后，user-asset GetList 调 operation-platform 拿不到
*   展示字段（自建 skill 不在 t_skill 表），即便 cloud-personal-skills-repo
*   已用 asset_id 兜底 name，installedNameSet 仍可能因 name/skillId 双匹配
*   漂移而失败。这里在前端独立持久化一份「会话内已装」集合，确保切换面板/
*   页面重新挂载 hook 后已安装态不丢失，避免用户看到 + 号反复出现并重复安装。
*
* 卸载对账（issue #50996）：
*   仅依赖 add 而不剔除会导致卸载后图标停留在「试一试」。useEnterpriseSkills
*   会在 installedSkills 加载完成后，把不在已安装列表的 id 从此集合剔除。
*/
function getInstalledStorageKey(enterpriseId) {
	return `${INSTALLED_STORAGE_KEY_PREFIX}${enterpriseId}`;
}
function readInstalledIds(enterpriseId) {
	if (!enterpriseId) return /* @__PURE__ */ new Set();
	try {
		const raw = localStorage.getItem(getInstalledStorageKey(enterpriseId));
		if (!raw) return /* @__PURE__ */ new Set();
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return new Set(parsed.filter((v) => typeof v === "string"));
	} catch {}
	return /* @__PURE__ */ new Set();
}
function writeInstalledIds(enterpriseId, ids) {
	if (!enterpriseId) return;
	try {
		localStorage.setItem(getInstalledStorageKey(enterpriseId), JSON.stringify([...ids]));
	} catch {}
}
var SEEN_STORAGE_KEY_PREFIX, INSTALLED_STORAGE_KEY_PREFIX;
var init_enterprise_skills_storage = __esmMin((() => {
	SEEN_STORAGE_KEY_PREFIX = "wb:enterprise-tab-seen:";
	INSTALLED_STORAGE_KEY_PREFIX = "wb:enterprise-installed-ids:";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-enterprise-skills.ts
/** 取卡片展示用的"显示名"，安装 toast / 失败 toast 都走这个，避免英文环境出现裸 slug。 */
function pickEnterpriseDisplayName(skill) {
	return skill.display_name_zh || skill.display_name_en || skill.name || skill.id;
}
/**
* 企业自建 Skill Tab 数据 hook
*/
function useEnterpriseSkills({ discoverTab, visible = true, t, reportEvent, Events, installedSkills, installedLoaded = false, loadSkills, searchKeyword = "" }) {
	const { account } = useAccountService();
	const enterpriseId = account?.enterpriseId ?? "";
	let facade;
	try {
		facade = useModuleHost().facades.enterpriseSkills;
	} catch {
		facade = void 0;
	}
	const [enterpriseVisible, setEnterpriseVisible] = (0, import_react$24.useState)(false);
	const [enterpriseSkills, setEnterpriseSkills] = (0, import_react$24.useState)([]);
	const [enterpriseCategories, setEnterpriseCategories] = (0, import_react$24.useState)([]);
	const [enterpriseSelectedCategory, setEnterpriseSelectedCategory] = (0, import_react$24.useState)("");
	const [enterpriseLoading, setEnterpriseLoading] = (0, import_react$24.useState)(false);
	const [enterpriseError, setEnterpriseError] = (0, import_react$24.useState)(void 0);
	const [enterpriseTotal, setEnterpriseTotal] = (0, import_react$24.useState)(0);
	const [enterprisePage, setEnterprisePage] = (0, import_react$24.useState)(1);
	const [enterpriseHasNewBadge, setEnterpriseHasNewBadge] = (0, import_react$24.useState)(false);
	/** 当前正在安装的 skill.id（同时只允许一个，避免并发误点） */
	const [installingId, setInstallingId] = (0, import_react$24.useState)(null);
	/**
	* 已安装的 skill.id 集合（实时反馈按钮态，配合 installedSkills 兜底）。
	*
	* 通过 localStorage 跨组件卸载持久化：企业自建 skill 在 user-asset GetList
	* 时拿不到 operation-platform 详情，installedNameSet 不一定能匹配上，
	* 必须依赖此集合保证切换面板/页面再回来仍能识别已装态。
	*/
	const [installedIds, setInstalledIds] = (0, import_react$24.useState)(() => readInstalledIds(enterpriseId));
	(0, import_react$24.useEffect)(() => {
		setInstalledIds(readInstalledIds(enterpriseId));
	}, [enterpriseId]);
	const probedRef = (0, import_react$24.useRef)(false);
	const categoriesLoadedRef = (0, import_react$24.useRef)(false);
	(0, import_react$24.useEffect)(() => {
		if (!visible || !facade || !enterpriseId || probedRef.current) return;
		probedRef.current = true;
		(async () => {
			try {
				const res = await facade.probeVisibility({ enterpriseId });
				setEnterpriseVisible(!!res?.visible);
				if (res?.visible) setEnterpriseHasNewBadge(!readSeenFlag(enterpriseId));
			} catch {
				setEnterpriseVisible(false);
			}
		})();
	}, [
		visible,
		facade,
		enterpriseId
	]);
	(0, import_react$24.useEffect)(() => {
		if (discoverTab !== "enterprise") return;
		if (!facade || !enterpriseId || categoriesLoadedRef.current) return;
		categoriesLoadedRef.current = true;
		(async () => {
			try {
				setEnterpriseCategories((await facade.getCategories({ enterpriseId }))?.items ?? []);
			} catch {
				setEnterpriseCategories([]);
			}
		})();
	}, [
		discoverTab,
		facade,
		enterpriseId
	]);
	const loadEnterpriseSkills = (0, import_react$24.useCallback)(async (page = 1) => {
		if (!facade || !enterpriseId) return;
		setEnterpriseLoading(true);
		setEnterpriseError(void 0);
		try {
			const categoryFilter = enterpriseSelectedCategory ? [enterpriseSelectedCategory] : void 0;
			const res = await facade.list({
				enterpriseId,
				categories: categoryFilter,
				page,
				pageSize: PAGE_SIZE
			});
			const items = res?.skills ?? [];
			setEnterpriseSkills((prev) => page <= 1 ? items : [...prev, ...items]);
			setEnterpriseTotal(res?.total_count ?? items.length);
			setEnterprisePage(page);
		} catch (err) {
			setEnterpriseError(err?.message ?? "load failed");
		} finally {
			setEnterpriseLoading(false);
		}
	}, [
		facade,
		enterpriseId,
		enterpriseSelectedCategory
	]);
	(0, import_react$24.useEffect)(() => {
		if (discoverTab !== "enterprise") return;
		if (!enterpriseVisible) return;
		loadEnterpriseSkills(1).catch(() => {});
	}, [
		discoverTab,
		enterpriseVisible,
		enterpriseSelectedCategory
	]);
	const [enterpriseSearchResults, setEnterpriseSearchResults] = (0, import_react$24.useState)([]);
	const [isEnterpriseSearching, setIsEnterpriseSearching] = (0, import_react$24.useState)(false);
	const searchDebounceRef = (0, import_react$24.useRef)(null);
	(0, import_react$24.useEffect)(() => {
		if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
		let cancelled = false;
		const keyword = (searchKeyword || "").trim();
		if (!keyword || !facade || !enterpriseId) {
			setEnterpriseSearchResults([]);
			setIsEnterpriseSearching(false);
			return () => {
				cancelled = true;
			};
		}
		searchDebounceRef.current = setTimeout(async () => {
			if (cancelled) return;
			setIsEnterpriseSearching(true);
			try {
				const res = await facade.list({
					enterpriseId,
					keyword,
					page: 1,
					pageSize: 100
				});
				if (!cancelled) setEnterpriseSearchResults(res?.skills ?? []);
			} catch {
				if (!cancelled) setEnterpriseSearchResults([]);
			} finally {
				if (!cancelled) setIsEnterpriseSearching(false);
			}
		}, 300);
		return () => {
			cancelled = true;
			if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
		};
	}, [
		searchKeyword,
		facade,
		enterpriseId
	]);
	const markEnterpriseTabSeen = (0, import_react$24.useCallback)(() => {
		if (!enterpriseId) return;
		if (!enterpriseHasNewBadge) return;
		writeSeenFlag(enterpriseId);
		setEnterpriseHasNewBadge(false);
	}, [enterpriseId, enterpriseHasNewBadge]);
	const installedNameSet = (0, import_react$24.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		for (const sk of installedSkills) {
			if (sk.name) s.add(sk.name.toLowerCase());
			if (sk.skillId) s.add(sk.skillId.toLowerCase());
			if (sk.slug) s.add(sk.slug.toLowerCase());
			if (sk.filePath) s.add(sk.filePath.toLowerCase());
		}
		return s;
	}, [installedSkills]);
	(0, import_react$24.useEffect)(() => {
		if (!installedLoaded) return;
		if (!enterpriseId) return;
		setInstalledIds((prev) => {
			if (prev.size === 0) return prev;
			const next = /* @__PURE__ */ new Set();
			for (const id of prev) if (installedNameSet.has(id.toLowerCase())) next.add(id);
			if (next.size === prev.size) return prev;
			writeInstalledIds(enterpriseId, next);
			return next;
		});
	}, [
		installedLoaded,
		installedNameSet,
		enterpriseId
	]);
	const isEnterpriseSkillInstalled = (0, import_react$24.useCallback)((skill) => {
		if (installedIds.has(skill.id)) return true;
		const idLower = (skill.id || "").toLowerCase();
		if (idLower && installedNameSet.has(idLower)) return true;
		const nameLower = (skill.name || "").toLowerCase();
		if (nameLower && installedNameSet.has(nameLower)) return true;
		return false;
	}, [installedIds, installedNameSet]);
	const isEnterpriseSkillInstalling = (0, import_react$24.useCallback)((skill) => installingId === skill.id, [installingId]);
	const handleInstallEnterpriseSkill = (0, import_react$24.useCallback)(async (skill, onTrySkill) => {
		if (!facade) {
			toast({
				message: t("skills.recommend.installFailed", { name: pickEnterpriseDisplayName(skill) }),
				type: "error"
			});
			return;
		}
		const display = pickEnterpriseDisplayName(skill);
		setInstallingId(skill.id);
		try {
			const res = await facade.install({
				skillId: skill.id,
				version: skill.version ?? "",
				name: display,
				downloadUrl: skill.download_url
			});
			if (res?.success) {
				reportEvent(Events.SkillInstalled, {
					name: skill.name,
					skillId: skill.id,
					skillVersion: skill.version
				});
				reportEvent(Events.SkillAction, {
					name: skill.name,
					skillId: skill.id,
					skillVersion: skill.version,
					action: "install",
					source: "enterprise"
				});
				toast({
					message: t("skills.recommend.installSuccess", { name: display }),
					type: "success",
					...onTrySkill ? { action: {
						label: t("skills.toast.trySkill"),
						onClick: () => onTrySkill(skill.name, void 0, display),
						track: {
							elementId: "skill_post_install_try",
							elementName: "安装后去试试",
							props: { source: skill.name }
						}
					} } : {}
				});
				setInstalledIds((prev) => {
					const next = new Set(prev);
					next.add(skill.id);
					writeInstalledIds(enterpriseId, next);
					return next;
				});
				await loadSkills(true);
			} else {
				const detail = res?.errorMessage ? `（${res.errorMessage}）` : "";
				toast({
					message: `${t("skills.recommend.installFailed", { name: display })}${detail}`,
					type: "error"
				});
			}
		} catch {
			toast({
				message: t("skills.recommend.installFailed", { name: display }),
				type: "error"
			});
		} finally {
			setInstallingId(null);
		}
	}, [
		facade,
		t,
		reportEvent,
		Events,
		loadSkills,
		enterpriseId
	]);
	const handleEnterpriseSkillCardClick = (0, import_react$24.useCallback)((_skill) => {}, []);
	return (0, import_react$24.useMemo)(() => ({
		enterpriseVisible,
		enterpriseSkills,
		enterpriseCategories,
		enterpriseSelectedCategory,
		setEnterpriseSelectedCategory,
		enterpriseLoading,
		enterpriseError,
		enterpriseTotal,
		enterprisePage,
		loadEnterpriseSkills,
		enterpriseHasNewBadge,
		markEnterpriseTabSeen,
		handleEnterpriseSkillCardClick,
		handleInstallEnterpriseSkill,
		isEnterpriseSkillInstalling,
		isEnterpriseSkillInstalled,
		enterpriseSearchResults,
		isEnterpriseSearching
	}), [
		enterpriseVisible,
		enterpriseSkills,
		enterpriseCategories,
		enterpriseSelectedCategory,
		enterpriseLoading,
		enterpriseError,
		enterpriseTotal,
		enterprisePage,
		loadEnterpriseSkills,
		enterpriseHasNewBadge,
		markEnterpriseTabSeen,
		handleEnterpriseSkillCardClick,
		handleInstallEnterpriseSkill,
		isEnterpriseSkillInstalling,
		isEnterpriseSkillInstalled,
		enterpriseSearchResults,
		isEnterpriseSearching
	]);
}
var import_react$24, PAGE_SIZE;
var init_use_enterprise_skills = __esmMin((() => {
	init_src();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_auth_context();
	init_context();
	init_enterprise_skills_storage();
	PAGE_SIZE = 20;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-plugins.ts
function getPluginKey(name, marketplaceName) {
	return `${name}@${marketplaceName}`;
}
function getPluginInstalledAt(name, marketplaceName) {
	return (readCache(PLUGINS_INSTALL_TIME_CACHE_KEY) || {})[getPluginKey(name, marketplaceName)] ?? 0;
}
function usePlugins({ pluginFacade, adapter, discoverTab, t }) {
	const { disableAllExtensions, setDisableAllExtensionsState } = useConversations();
	const [installedPlugins, setInstalledPlugins] = (0, import_react$23.useState)(() => readCache("plugins-cache-installed-skills-tab") || []);
	const [pluginsLoading, setPluginsLoading] = (0, import_react$23.useState)(false);
	const [selectedPluginKey, setSelectedPluginKey] = (0, import_react$23.useState)(null);
	const [marketplacePlugins, setMarketplacePlugins] = (0, import_react$23.useState)([]);
	const [marketplacePluginsLoading, setMarketplacePluginsLoading] = (0, import_react$23.useState)(false);
	const [pluginMarketplaces, setPluginMarketplaces] = (0, import_react$23.useState)([]);
	const [pluginMarketplacesLoading, setPluginMarketplacesLoading] = (0, import_react$23.useState)(false);
	const [currentPluginMarketplace, setCurrentPluginMarketplace] = (0, import_react$23.useState)(null);
	const marketplaceNameToIdRef = (0, import_react$23.useRef)(/* @__PURE__ */ new Map());
	const resolveMarketplaceId = (0, import_react$23.useCallback)((marketplaceName) => marketplaceNameToIdRef.current.get(marketplaceName) || marketplaceName, []);
	const [allMarketplacePlugins, setAllMarketplacePlugins] = (0, import_react$23.useState)([]);
	const [allMarketplacePluginsLoading, setAllMarketplacePluginsLoading] = (0, import_react$23.useState)(false);
	const [allMarketplacePluginsLoaded, setAllMarketplacePluginsLoaded] = (0, import_react$23.useState)(false);
	const [showAddMarketplaceModal, setShowAddMarketplaceModal] = (0, import_react$23.useState)(false);
	const [addMarketplaceLoading, setAddMarketplaceLoading] = (0, import_react$23.useState)(false);
	const [addMarketplaceError, setAddMarketplaceError] = (0, import_react$23.useState)("");
	const [refreshingMarketplaces, setRefreshingMarketplaces] = (0, import_react$23.useState)(/* @__PURE__ */ new Set());
	const pluginMarketplacesLoadedRef = (0, import_react$23.useRef)(false);
	const [pluginsInitialized, setPluginsInitialized] = (0, import_react$23.useState)(false);
	const [installingPluginKeys, setInstallingPluginKeys] = (0, import_react$23.useState)(/* @__PURE__ */ new Set());
	const installingPluginKeysRef = (0, import_react$23.useRef)(/* @__PURE__ */ new Set());
	const selectedPlugin = (0, import_react$23.useMemo)(() => {
		if (!selectedPluginKey) return null;
		const match = (p) => p.name === selectedPluginKey.name && p.marketplaceName === selectedPluginKey.marketplaceName;
		return installedPlugins.find(match) ?? marketplacePlugins.find(match) ?? allMarketplacePlugins.find(match) ?? null;
	}, [
		selectedPluginKey,
		installedPlugins,
		marketplacePlugins,
		allMarketplacePlugins
	]);
	const setSelectedPlugin = (0, import_react$23.useCallback)((plugin) => {
		setSelectedPluginKey(plugin ? {
			name: plugin.name,
			marketplaceName: plugin.marketplaceName
		} : null);
	}, []);
	const loadInstalledPlugins = (0, import_react$23.useCallback)(async (silent = false) => {
		if (!pluginFacade) {
			setInstalledPlugins([]);
			return;
		}
		if (!silent) setPluginsLoading(true);
		try {
			const result = await pluginFacade.getInstalledPlugins(false);
			const installTimeCache = readCache(PLUGINS_INSTALL_TIME_CACHE_KEY) || {};
			let pluginsList = result.map((p) => {
				const mapScope = (scope) => {
					if (scope === "local") return "project-local";
					return scope || "user";
				};
				return {
					name: p.name,
					marketplaceName: p.marketplaceName || "local",
					description: p.description,
					version: p.version,
					status: p.status,
					installedScopes: p.installedScopes?.map(mapScope) || (p.installScope ? [mapScope(p.installScope)] : ["user"]),
					installedScopesStatus: p.installedScopesStatus,
					installedPath: p.installedPath,
					source: "",
					agents: p.agents,
					commands: p.commands,
					skills: p.skills,
					mcpServers: p.mcpServers,
					hooks: p.hooks,
					rules: p.rules,
					lsp: p.lsp,
					canRemove: p.canRemove,
					canSwitchoff: p.canSwitchoff,
					canEdit: p.canEdit
				};
			});
			pluginsList = pluginsList.sort((a, b) => {
				const aKey = getPluginKey(a.name, a.marketplaceName);
				const bKey = getPluginKey(b.name, b.marketplaceName);
				const aTime = installTimeCache[aKey] ?? 0;
				return (installTimeCache[bKey] ?? 0) - aTime;
			});
			setInstalledPlugins(pluginsList);
			writeCache(PLUGINS_CACHE_KEY_INSTALLED, pluginsList);
		} catch (error) {
			console.error("[usePlugins] Failed to load installed plugins:", error);
		} finally {
			setPluginsLoading(false);
		}
	}, [pluginFacade]);
	const loadPluginMarketplaces = (0, import_react$23.useCallback)(async () => {
		if (!pluginFacade) {
			setPluginMarketplaces([]);
			return;
		}
		setPluginMarketplacesLoading(true);
		try {
			const result = await pluginFacade.getPluginMarketplaces(false);
			if (result && result.length > 0) {
				const marketplaceList = result.filter((m) => !HIDDEN_EXPERT_MARKETPLACES.has(m.name)).map((m) => ({
					id: m.id || m.name,
					name: m.name,
					type: m.type,
					source: typeof m.source === "string" ? m.source : void 0
				}));
				const nextMap = /* @__PURE__ */ new Map();
				for (const m of marketplaceList) nextMap.set(m.name, m.id);
				marketplaceNameToIdRef.current = nextMap;
				setPluginMarketplaces(marketplaceList);
				pluginMarketplacesLoadedRef.current = true;
				if (!currentPluginMarketplace) setCurrentPluginMarketplace(marketplaceList[0].name);
			} else {
				setPluginMarketplaces([]);
				setCurrentPluginMarketplace(null);
				setMarketplacePlugins([]);
				marketplaceNameToIdRef.current = /* @__PURE__ */ new Map();
			}
		} catch {
			setPluginMarketplaces([]);
		} finally {
			setPluginMarketplacesLoading(false);
		}
	}, [pluginFacade, currentPluginMarketplace]);
	const loadMarketplacePlugins = (0, import_react$23.useCallback)(async (marketplaceName, silent = false, forceRefresh = false) => {
		if (!pluginFacade || !marketplaceName) {
			setMarketplacePlugins([]);
			return;
		}
		if (!silent) setMarketplacePluginsLoading(true);
		try {
			const marketplaceId = resolveMarketplaceId(marketplaceName);
			setMarketplacePlugins((await pluginFacade.getMarketplacePlugins(marketplaceId, forceRefresh)).map((p) => ({
				name: p.name,
				marketplaceName: p.marketplaceName,
				description: p.description,
				version: p.version,
				author: p.author,
				homepage: p.homepage,
				status: p.status,
				installedScopes: p.installedScopes,
				installedScopesStatus: p.installedScopesStatus,
				installedPath: p.installedPath,
				hasUpdate: p.hasUpdate,
				source: "",
				agents: p.agents,
				commands: p.commands,
				skills: p.skills,
				mcpServers: p.mcpServers,
				hooks: p.hooks,
				rules: p.rules,
				lsp: p.lsp
			})));
		} catch {
			setMarketplacePlugins([]);
		} finally {
			setMarketplacePluginsLoading(false);
			setPluginsInitialized(true);
		}
	}, [pluginFacade]);
	const loadAllMarketplacePlugins = (0, import_react$23.useCallback)(async (marketplaceList, force = false) => {
		if (!pluginFacade || marketplaceList.length === 0) {
			setAllMarketplacePlugins([]);
			return;
		}
		if (allMarketplacePluginsLoaded && !force) return;
		setAllMarketplacePluginsLoading(true);
		try {
			const results = await Promise.allSettled(marketplaceList.map((m) => pluginFacade.getMarketplacePlugins(resolveMarketplaceId(m.name), false)));
			const allPlugins = [];
			for (let i = 0; i < results.length; i++) {
				const result = results[i];
				if (result.status === "fulfilled") {
					const marketplaceName = marketplaceList[i].name;
					const pluginsList = result.value.map((p) => ({
						name: p.name,
						marketplaceName: p.marketplaceName || marketplaceName,
						description: p.description,
						version: p.version,
						author: p.author,
						homepage: p.homepage,
						status: p.status,
						installedScopes: p.installedScopes,
						installedScopesStatus: p.installedScopesStatus,
						installedPath: p.installedPath,
						hasUpdate: p.hasUpdate,
						source: "",
						agents: p.agents,
						commands: p.commands,
						skills: p.skills,
						mcpServers: p.mcpServers,
						hooks: p.hooks,
						rules: p.rules,
						lsp: p.lsp
					}));
					allPlugins.push(...pluginsList);
				}
			}
			setAllMarketplacePlugins(allPlugins);
			setAllMarketplacePluginsLoaded(true);
		} catch {
			setAllMarketplacePlugins([]);
		} finally {
			setAllMarketplacePluginsLoading(false);
		}
	}, [pluginFacade, allMarketplacePluginsLoaded]);
	const handlePluginMarketplaceChange = (0, import_react$23.useCallback)((marketplaceName) => {
		setCurrentPluginMarketplace(marketplaceName);
		loadMarketplacePlugins(marketplaceName, true);
	}, [loadMarketplacePlugins]);
	const handlePluginCardClick = (0, import_react$23.useCallback)((plugin) => {
		setSelectedPlugin(plugin);
	}, []);
	const handleAddMarketplace = (0, import_react$23.useCallback)(async (source) => {
		if (!pluginFacade) throw new Error(t("plugins.addMarketplace.notSupported"));
		setAddMarketplaceLoading(true);
		setAddMarketplaceError("");
		try {
			const suiteAutoUpdateEnabled = readCache("suites_auto_update_enabled") ?? true;
			const result = await pluginFacade.addPluginMarketplace(source, void 0, suiteAutoUpdateEnabled);
			console.log("[usePlugins] addPluginMarketplace result:", JSON.stringify(result, null, 2));
			if (result.success) {
				const returnedName = result.marketplace?.name;
				if (result.alreadyExists && returnedName) {
					setShowAddMarketplaceModal(false);
					setCurrentPluginMarketplace(returnedName);
					loadMarketplacePlugins(returnedName, true);
					toast({
						message: t("plugins.addMarketplace.alreadyExists", { name: returnedName }),
						type: "info"
					});
					return;
				}
				pluginMarketplacesLoadedRef.current = false;
				setAllMarketplacePlugins([]);
				setAllMarketplacePluginsLoaded(false);
				await loadPluginMarketplaces();
				if (returnedName) {
					setCurrentPluginMarketplace(returnedName);
					await loadMarketplacePlugins(returnedName, false);
				}
				setShowAddMarketplaceModal(false);
				toast({
					message: t("plugins.addMarketplace.success"),
					type: "success"
				});
			} else {
				setAddMarketplaceError(result.error || t("plugins.addMarketplace.failed"));
				throw new Error(result.error || t("plugins.addMarketplace.failed"));
			}
		} catch (error) {
			setAddMarketplaceError(error?.message || t("plugins.addMarketplace.failed"));
			throw error;
		} finally {
			setAddMarketplaceLoading(false);
		}
	}, [
		pluginFacade,
		t,
		loadPluginMarketplaces,
		loadMarketplacePlugins
	]);
	const [deleteConfirmVisible, setDeleteConfirmVisible] = (0, import_react$23.useState)(false);
	const [pendingDeleteMarketplace, setPendingDeleteMarketplace] = (0, import_react$23.useState)(null);
	const [pendingDeletePluginNames, setPendingDeletePluginNames] = (0, import_react$23.useState)([]);
	const [deleteConfirmLoading, setDeleteConfirmLoading] = (0, import_react$23.useState)(false);
	const executeDeleteMarketplace = (0, import_react$23.useCallback)(async (marketplaceId, displayName) => {
		if (!pluginFacade) return;
		setDeleteConfirmLoading(true);
		try {
			const result = await pluginFacade.removePluginMarketplace(marketplaceId);
			if (result.success) {
				const uninstalledCount = result.uninstalledCount ?? 0;
				if (uninstalledCount > 0) toast({
					message: t("plugins.deleteMarketplace.successWithCount", {
						name: displayName,
						count: String(uninstalledCount)
					}),
					type: "success"
				});
				else toast({
					message: t("plugins.deleteMarketplace.success", { name: displayName }),
					type: "success"
				});
				pluginMarketplacesLoadedRef.current = false;
				setAllMarketplacePlugins([]);
				setAllMarketplacePluginsLoaded(false);
				if (adapter?.getPluginMarketplaces) {
					setPluginMarketplacesLoading(true);
					try {
						const freshList = await pluginFacade.getPluginMarketplaces(true);
						if (freshList && freshList.length > 0) {
							const marketplaceList = freshList.filter((m) => !HIDDEN_EXPERT_MARKETPLACES.has(m.name)).map((m) => ({
								id: m.id || m.name,
								name: m.name,
								type: m.type,
								source: typeof m.source === "string" ? m.source : void 0
							}));
							const nextMap = /* @__PURE__ */ new Map();
							for (const m of marketplaceList) nextMap.set(m.name, m.id);
							marketplaceNameToIdRef.current = nextMap;
							setPluginMarketplaces(marketplaceList);
							pluginMarketplacesLoadedRef.current = true;
							if (currentPluginMarketplace === displayName) {
								setCurrentPluginMarketplace(marketplaceList[0].name);
								setMarketplacePlugins([]);
							}
						} else {
							setPluginMarketplaces([]);
							setCurrentPluginMarketplace(null);
							setMarketplacePlugins([]);
							marketplaceNameToIdRef.current = /* @__PURE__ */ new Map();
						}
					} finally {
						setPluginMarketplacesLoading(false);
					}
				}
				await loadInstalledPlugins(true);
			} else toast({
				message: result.error || t("plugins.deleteMarketplace.failed"),
				type: "error"
			});
		} catch (error) {
			toast({
				message: error?.message || t("plugins.deleteMarketplace.failed"),
				type: "error"
			});
		} finally {
			setDeleteConfirmLoading(false);
			setDeleteConfirmVisible(false);
			setPendingDeleteMarketplace(null);
			setPendingDeletePluginNames([]);
		}
	}, [
		pluginFacade,
		t,
		currentPluginMarketplace,
		loadInstalledPlugins
	]);
	const handleDeleteMarketplace = (0, import_react$23.useCallback)(async (marketplaceId) => {
		if (!pluginFacade) {
			toast({
				message: t("plugins.deleteMarketplace.notSupported"),
				type: "warning"
			});
			return;
		}
		const displayName = pluginMarketplaces.find((m) => m.id === marketplaceId)?.name ?? marketplaceId;
		const relatedPlugins = installedPlugins.filter((p) => p.marketplaceName === displayName);
		if (relatedPlugins.length > 0) {
			setPendingDeleteMarketplace({
				id: marketplaceId,
				name: displayName
			});
			setPendingDeletePluginNames(relatedPlugins.map((p) => p.name));
			setDeleteConfirmVisible(true);
		} else {
			setPendingDeleteMarketplace({
				id: marketplaceId,
				name: displayName
			});
			setPendingDeletePluginNames([]);
			await executeDeleteMarketplace(marketplaceId, displayName);
		}
	}, [
		pluginFacade,
		t,
		installedPlugins,
		pluginMarketplaces,
		executeDeleteMarketplace
	]);
	const confirmDeleteMarketplace = (0, import_react$23.useCallback)(async () => {
		if (pendingDeleteMarketplace) await executeDeleteMarketplace(pendingDeleteMarketplace.id, pendingDeleteMarketplace.name);
	}, [pendingDeleteMarketplace, executeDeleteMarketplace]);
	const cancelDeleteMarketplace = (0, import_react$23.useCallback)(() => {
		setDeleteConfirmVisible(false);
		setPendingDeleteMarketplace(null);
		setPendingDeletePluginNames([]);
	}, []);
	const handleRefreshMarketplace = (0, import_react$23.useCallback)(async (marketplaceName) => {
		setRefreshingMarketplaces((prev) => new Set(prev).add(marketplaceName));
		try {
			const marketplaceId = resolveMarketplaceId(marketplaceName);
			if (adapter?.refreshPluginMarketplace) {
				const result = await pluginFacade.refreshPluginMarketplace(marketplaceId);
				if (result.success) {
					setAllMarketplacePlugins([]);
					setAllMarketplacePluginsLoaded(false);
					if (currentPluginMarketplace === marketplaceName) await loadMarketplacePlugins(marketplaceName, false, true);
					await loadInstalledPlugins(true);
					toast({
						message: t("plugins.refreshMarketplace.success", { name: marketplaceName }),
						type: "success"
					});
				} else toast({
					message: result.error || t("plugins.refreshMarketplace.failed"),
					type: "error"
				});
			} else if (currentPluginMarketplace) {
				await loadMarketplacePlugins(currentPluginMarketplace, true, true);
				await loadInstalledPlugins(true);
				toast({
					message: t("plugins.refreshMarketplace.success", { name: marketplaceName }),
					type: "success"
				});
			}
		} catch (error) {
			toast({
				message: error?.message || t("plugins.refreshMarketplace.failed"),
				type: "error"
			});
		} finally {
			setRefreshingMarketplaces((prev) => {
				const newSet = new Set(prev);
				newSet.delete(marketplaceName);
				return newSet;
			});
		}
	}, [
		pluginFacade,
		currentPluginMarketplace,
		loadMarketplacePlugins,
		loadInstalledPlugins,
		t
	]);
	const handleInstallPlugin = (0, import_react$23.useCallback)(async (plugin, scope) => {
		if (!pluginFacade) {
			toast({
				message: t("plugins.installNotSupported"),
				type: "warning"
			});
			return;
		}
		const pluginKey = getPluginKey(plugin.name, plugin.marketplaceName);
		if (installingPluginKeysRef.current.has(pluginKey)) return;
		const next = new Set(installingPluginKeysRef.current).add(pluginKey);
		installingPluginKeysRef.current = next;
		setInstallingPluginKeys(next);
		try {
			const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
			const result = await pluginFacade.installPlugins([plugin.name], marketplaceId, scope);
			if (result.success) {
				toast({
					message: t("plugins.installSuccess", { name: plugin.name }),
					type: "success"
				});
				const installTimeCache = readCache(PLUGINS_INSTALL_TIME_CACHE_KEY) || {};
				installTimeCache[pluginKey] = Date.now();
				writeCache(PLUGINS_INSTALL_TIME_CACHE_KEY, installTimeCache);
				await loadInstalledPlugins(true);
			} else toast({
				message: result.error || t("plugins.installFailed", { name: plugin.name }),
				type: "error"
			});
		} catch (error) {
			toast({
				message: error?.message || t("plugins.installFailed", { name: plugin.name }),
				type: "error"
			});
		} finally {
			const updated = new Set(installingPluginKeysRef.current);
			updated.delete(pluginKey);
			installingPluginKeysRef.current = updated;
			setInstallingPluginKeys(updated);
		}
	}, [
		pluginFacade,
		t,
		loadInstalledPlugins
	]);
	const handleUninstallPlugin = (0, import_react$23.useCallback)(async (plugin, scope) => {
		if (!pluginFacade) {
			toast({
				message: t("plugins.uninstallNotSupported"),
				type: "warning"
			});
			return;
		}
		try {
			const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
			const result = await pluginFacade.uninstallPlugin(plugin.name, marketplaceId, scope);
			if (result.success) {
				toast({
					message: t("plugins.uninstallSuccess", { name: plugin.name }),
					type: "success"
				});
				const installTimeCache = readCache(PLUGINS_INSTALL_TIME_CACHE_KEY) || {};
				const pluginKey = getPluginKey(plugin.name, plugin.marketplaceName);
				delete installTimeCache[pluginKey];
				writeCache(PLUGINS_INSTALL_TIME_CACHE_KEY, installTimeCache);
				await loadInstalledPlugins(true);
				setSelectedPlugin(null);
			} else toast({
				message: result.error || t("plugins.uninstallFailed", { name: plugin.name }),
				type: "error"
			});
		} catch (error) {
			toast({
				message: error?.message || t("plugins.uninstallFailed", { name: plugin.name }),
				type: "error"
			});
		}
	}, [
		pluginFacade,
		t,
		loadInstalledPlugins
	]);
	const handleTogglePluginStatus = (0, import_react$23.useCallback)(async (plugin, enabled, scope) => {
		if (!pluginFacade) {
			toast({
				message: t("plugins.toggleNotSupported"),
				type: "warning"
			});
			return;
		}
		if (enabled && disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
		try {
			const result = await pluginFacade.batchTogglePlugins({ items: [{
				pluginName: plugin.name,
				marketplaceName: resolveMarketplaceId(plugin.marketplaceName),
				scope,
				operation: enabled ? "enable" : "disable"
			}] });
			if (result.success) await loadInstalledPlugins(true);
			else {
				const failedItem = result.failedPlugins?.[0];
				toast({
					message: failedItem?.error || t("plugins.toggleFailed", { name: plugin.name }),
					type: "error"
				});
			}
		} catch (error) {
			toast({
				message: error?.message || t("plugins.toggleFailed", { name: plugin.name }),
				type: "error"
			});
		}
	}, [
		pluginFacade,
		t,
		loadInstalledPlugins,
		disableAllExtensions,
		setDisableAllExtensionsState
	]);
	const handleUpdatePlugin = (0, import_react$23.useCallback)(async (plugin) => {
		if (!pluginFacade) {
			toast({
				message: t("plugins.updateNotSupported"),
				type: "warning"
			});
			return;
		}
		try {
			const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
			const result = await pluginFacade.updatePlugin(plugin.name, marketplaceId);
			if (result.success) {
				toast({
					message: t("plugins.updateSuccess", { name: plugin.name }),
					type: "success"
				});
				await loadInstalledPlugins(true);
			} else toast({
				message: result.error || t("plugins.updateFailed", { name: plugin.name }),
				type: "error"
			});
		} catch (error) {
			toast({
				message: error?.message || t("plugins.updateFailed", { name: plugin.name }),
				type: "error"
			});
		}
	}, [
		pluginFacade,
		t,
		loadInstalledPlugins
	]);
	const handleBackFromPluginDetail = (0, import_react$23.useCallback)(() => {
		setSelectedPlugin(null);
	}, []);
	const handleBatchUninstallPlugins = (0, import_react$23.useCallback)(async (plugins) => {
		if (!pluginFacade || plugins.length === 0) return;
		let successCount = 0;
		let failCount = 0;
		const successfullyUninstalled = [];
		for (const plugin of plugins) try {
			const scope = plugin.installedScopes?.[0] || "user";
			const marketplaceId = resolveMarketplaceId(plugin.marketplaceName);
			if ((await pluginFacade.uninstallPlugin(plugin.name, marketplaceId, scope)).success) {
				successCount++;
				successfullyUninstalled.push(plugin);
			} else failCount++;
		} catch {
			failCount++;
		}
		if (successfullyUninstalled.length > 0) {
			const installTimeCache = readCache(PLUGINS_INSTALL_TIME_CACHE_KEY) || {};
			for (const plugin of successfullyUninstalled) {
				const pluginKey = getPluginKey(plugin.name, plugin.marketplaceName);
				delete installTimeCache[pluginKey];
			}
			writeCache(PLUGINS_INSTALL_TIME_CACHE_KEY, installTimeCache);
		}
		await loadInstalledPlugins(true);
		if (successCount > 0 && failCount === 0) toast({
			message: t("plugins.batchUninstallSuccess", { count: String(successCount) }),
			type: "success"
		});
		else if (failCount > 0) toast({
			message: t("plugins.batchUninstallPartial", {
				success: String(successCount),
				fail: String(failCount)
			}),
			type: "warning"
		});
	}, [
		pluginFacade,
		t,
		loadInstalledPlugins
	]);
	const handleBatchTogglePlugins = (0, import_react$23.useCallback)(async (plugins, enabled) => {
		if (!adapter?.batchTogglePlugins || plugins.length === 0) return;
		const isPluginCurrentlyDisabled = (plugin) => {
			if (plugin.installedScopesStatus) return Object.values(plugin.installedScopesStatus).every((status) => status === false);
			return plugin.status === "disabled";
		};
		const toToggle = plugins.filter((plugin) => isPluginCurrentlyDisabled(plugin) === enabled);
		if (toToggle.length === 0) return;
		if (enabled && disableAllExtensions && setDisableAllExtensionsState) setDisableAllExtensionsState(false, null);
		try {
			const items = toToggle.map((plugin) => ({
				pluginName: plugin.name,
				marketplaceName: resolveMarketplaceId(plugin.marketplaceName),
				scope: plugin.installedScopes?.[0] || "user",
				operation: enabled ? "enable" : "disable"
			}));
			const result = await pluginFacade.batchTogglePlugins({ items });
			if (result.success) {
				toast({
					message: t(enabled ? "plugins.batchToggleEnableSuccess" : "plugins.batchToggleDisableSuccess", { count: String(toToggle.length) }),
					type: "success"
				});
				await loadInstalledPlugins(true);
			} else {
				const failedCount = result.failedPlugins?.length || 0;
				const successCount = toToggle.length - failedCount;
				if (failedCount > 0) toast({
					message: t("plugins.batchTogglePartial", {
						success: String(successCount),
						fail: String(failedCount)
					}),
					type: "warning"
				});
			}
		} catch (error) {
			toast({
				message: error?.message || t("plugins.batchToggleFailed"),
				type: "error"
			});
		}
	}, [
		adapter,
		pluginFacade,
		t,
		loadInstalledPlugins,
		disableAllExtensions,
		setDisableAllExtensionsState
	]);
	const handleOpenInEditor = (0, import_react$23.useCallback)(async (plugin) => {
		if (plugin.installedPath && adapter?.openFolderInNewWindow) await adapter.openFolderInNewWindow(plugin.installedPath);
		else toast({
			message: t("plugins.openInEditorNotSupported"),
			type: "warning"
		});
	}, [adapter, t]);
	const handleOpenInFolder = (0, import_react$23.useCallback)(async (plugin) => {
		if (plugin.installedPath && adapter?.openFolder) await adapter.openFolder(plugin.installedPath);
		else toast({
			message: t("plugins.openInFolderNotSupported"),
			type: "warning"
		});
	}, [adapter, t]);
	const handleOpenHomepage = (0, import_react$23.useCallback)((homepage) => {
		window.open(homepage, "_blank");
	}, []);
	const hasProjectPath = (0, import_react$23.useCallback)(async () => false, []);
	(0, import_react$23.useEffect)(() => {
		if (discoverTab === "plugins" && !pluginMarketplacesLoadedRef.current) {
			pluginMarketplacesLoadedRef.current = true;
			loadPluginMarketplaces();
		}
	}, [discoverTab, loadPluginMarketplaces]);
	(0, import_react$23.useEffect)(() => {
		if (discoverTab === "plugins" && currentPluginMarketplace) loadMarketplacePlugins(currentPluginMarketplace, false);
	}, [
		discoverTab,
		currentPluginMarketplace,
		loadMarketplacePlugins
	]);
	(0, import_react$23.useEffect)(() => {
		const sub = pluginListRefresh$.subscribe(() => {
			loadInstalledPlugins(true);
		});
		return () => sub.unsubscribe();
	}, [loadInstalledPlugins]);
	return {
		installedPlugins,
		pluginsLoading,
		loadInstalledPlugins,
		selectedPlugin,
		setSelectedPlugin,
		marketplacePlugins,
		marketplacePluginsLoading,
		pluginMarketplaces,
		pluginMarketplacesLoading,
		pluginsInitialized,
		currentPluginMarketplace,
		loadPluginMarketplaces,
		allMarketplacePlugins,
		allMarketplacePluginsLoading,
		allMarketplacePluginsLoaded,
		loadAllMarketplacePlugins,
		showAddMarketplaceModal,
		setShowAddMarketplaceModal,
		addMarketplaceLoading,
		addMarketplaceError,
		setAddMarketplaceError,
		refreshingMarketplaces,
		handlePluginMarketplaceChange,
		handlePluginCardClick,
		handleAddMarketplace,
		handleDeleteMarketplace,
		handleRefreshMarketplace,
		deleteConfirmVisible,
		pendingDeleteMarketplace,
		pendingDeletePluginNames,
		deleteConfirmLoading,
		confirmDeleteMarketplace,
		cancelDeleteMarketplace,
		handleInstallPlugin,
		handleUninstallPlugin,
		handleTogglePluginStatus,
		handleUpdatePlugin,
		handleBackFromPluginDetail,
		handleOpenInEditor,
		handleOpenInFolder,
		handleOpenHomepage,
		hasProjectPath,
		handleBatchUninstallPlugins,
		handleBatchTogglePlugins,
		isPluginInstalling: (pluginName, marketplaceName) => installingPluginKeys.has(getPluginKey(pluginName, marketplaceName))
	};
}
var import_react$23, PLUGINS_INSTALL_TIME_CACHE_KEY, HIDDEN_EXPERT_MARKETPLACES;
var init_use_plugins = __esmMin((() => {
	init_src();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_local_cache();
	init_high_risk_notification_store();
	init_types();
	init_use_suite_auto_update_preference();
	PLUGINS_INSTALL_TIME_CACHE_KEY = "plugins-install-time-cache";
	HIDDEN_EXPERT_MARKETPLACES = new Set(["experts", "my-experts"]);
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-remote-skill-search.ts
/** 将 SkillHub SearchResult 映射为 SkillHubSkill（统一展示结构） */
function mapHubResult(r) {
	const en = r.description ?? r.summary ?? "";
	const zh = r.description_zh ?? r.summary_zh ?? en;
	return {
		slug: r.slug,
		ownerName: "",
		category: "",
		name: r.displayName,
		description: en,
		description_zh: zh,
		version: r.version,
		homepage: "",
		tags: [],
		downloads: 0,
		stars: 0,
		installs: 0,
		updated_at: r.updatedAt,
		score: r.score,
		iconUrl: r.iconUrl ?? r.icon_url,
		_source: "skillhub"
	};
}
/** 按 slug 去重合并两组 SkillHubSkill */
function mergeBySlug(primary, secondary) {
	if (secondary.length === 0) return primary;
	const existing = new Set(primary.map((s) => s.slug.toLowerCase()));
	return [...primary, ...secondary.filter((s) => !existing.has(s.slug.toLowerCase()))];
}
/** 按 name 去重合并两组 BuiltinMarketSkill */
function mergeByName(primary, secondary) {
	if (secondary.length === 0) return primary;
	const existing = new Set(primary.map((s) => s.name.toLowerCase()));
	return [...primary, ...secondary.filter((s) => !existing.has(s.name.toLowerCase()))];
}
/**
* 远程技能搜索 hook：负责向 SkillHub / Knot / BuiltinMarket 发起 debounced 搜索请求。
* 当关键词含中间空格时，并行发送原始 + 去空格两组请求并合并去重。
*/
function useRemoteSkillSearch({ skillsSearch, isIOAUser }) {
	let marketplace;
	let reporter;
	let enterpriseId;
	try {
		const host = useModuleHost();
		marketplace = host.facades.skillsMarketplace;
		reporter = host.reporter;
		const eid = host.accountInfo?.enterpriseId;
		enterpriseId = typeof eid === "string" && eid.trim() ? eid.trim() : void 0;
	} catch {
		marketplace = void 0;
	}
	const [hubSearchResults, setHubSearchResults] = (0, import_react$22.useState)([]);
	const [isHubSearching, setIsHubSearching] = (0, import_react$22.useState)(false);
	const [knotSearchResults, setKnotSearchResults] = (0, import_react$22.useState)([]);
	const [isKnotSearching, setIsKnotSearching] = (0, import_react$22.useState)(false);
	const [builtinMarketSearchResults, setBuiltinMarketSearchResults] = (0, import_react$22.useState)([]);
	const [isBuiltinMarketSearching, setIsBuiltinMarketSearching] = (0, import_react$22.useState)(false);
	const [searchPartialFail, setSearchPartialFail] = (0, import_react$22.useState)(false);
	const searchDebounceRef = (0, import_react$22.useRef)(null);
	const lastReportedKeywordRef = (0, import_react$22.useRef)("");
	(0, import_react$22.useEffect)(() => {
		if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
		let cancelled = false;
		const keyword = skillsSearch.trim();
		if (!keyword) {
			setHubSearchResults([]);
			setKnotSearchResults([]);
			setBuiltinMarketSearchResults([]);
			setIsHubSearching(false);
			setIsKnotSearching(false);
			setIsBuiltinMarketSearching(false);
			setSearchPartialFail(false);
			return () => {
				cancelled = true;
			};
		}
		searchDebounceRef.current = setTimeout(async () => {
			if (cancelled) return;
			if (keyword !== lastReportedKeywordRef.current) {
				lastReportedKeywordRef.current = keyword;
				const source = keyword.length > 50 ? keyword.slice(0, 50) : keyword;
				reporter?.reportEvent?.("web_element_click", {
					elementId: "skill_search",
					elementName: "搜索技能",
					source,
					type: "search"
				});
			}
			setIsHubSearching(true);
			setIsKnotSearching(true);
			setIsBuiltinMarketSearching(true);
			setSearchPartialFail(false);
			let hubFailed = false;
			let knotFailed = false;
			let builtinMarketFailed = false;
			const noSpaceKeyword = keyword.includes(" ") ? keyword.replace(/\s+/g, "") : "";
			try {
				const promises = [marketplace ? marketplace.skillhub.search(keyword, 100) : Promise.resolve({ results: [] })];
				if (noSpaceKeyword && marketplace) promises.push(marketplace.skillhub.search(noSpaceKeyword, 100));
				const settled = await Promise.allSettled(promises);
				if (cancelled) return;
				const primaryResult = settled[0].status === "fulfilled" ? settled[0].value : null;
				const secondaryResult = settled.length > 1 && settled[1].status === "fulfilled" ? settled[1].value : null;
				if (primaryResult || secondaryResult) {
					let searchSkills = primaryResult ? (primaryResult.results || []).map(mapHubResult) : [];
					if (secondaryResult) searchSkills = mergeBySlug(searchSkills, (secondaryResult.results || []).map(mapHubResult));
					if (!cancelled) setHubSearchResults(searchSkills);
				} else {
					hubFailed = true;
					if (!cancelled) setHubSearchResults([]);
				}
			} catch {
				hubFailed = true;
				if (!cancelled) setHubSearchResults([]);
			} finally {
				if (!cancelled) setIsHubSearching(false);
			}
			if (!isIOAUser) {
				if (!cancelled) {
					setKnotSearchResults([]);
					setIsKnotSearching(false);
				}
			} else try {
				const promises = [marketplace ? marketplace.knot.list({
					keyword,
					page: 1,
					pageSize: 100
				}) : Promise.resolve({
					code: 0,
					message: "",
					data: {
						total: 0,
						skills: []
					}
				})];
				if (noSpaceKeyword && marketplace) promises.push(marketplace.knot.list({
					keyword: noSpaceKeyword,
					page: 1,
					pageSize: 100
				}));
				const settled = await Promise.allSettled(promises);
				if (cancelled) return;
				const mapKnot = (s) => ({
					...s,
					description_zh: s.description_zh || s.description || "",
					_source: "knot"
				});
				const primaryResult = settled[0].status === "fulfilled" ? settled[0].value : null;
				const secondaryResult = settled.length > 1 && settled[1].status === "fulfilled" ? settled[1].value : null;
				if (primaryResult || secondaryResult) {
					let searchSkills = primaryResult ? (primaryResult.data?.skills || []).map(mapKnot) : [];
					if (secondaryResult) searchSkills = mergeBySlug(searchSkills, (secondaryResult.data?.skills || []).map(mapKnot));
					if (!cancelled) setKnotSearchResults(searchSkills);
				} else {
					knotFailed = true;
					if (!cancelled) setKnotSearchResults([]);
				}
			} catch {
				knotFailed = true;
				if (!cancelled) setKnotSearchResults([]);
			} finally {
				if (!cancelled) setIsKnotSearching(false);
			}
			try {
				const promises = [marketplace ? marketplace.builtin.list({
					keyword,
					page: 1,
					pageSize: 100,
					enterpriseId
				}) : Promise.resolve({
					code: 0,
					msg: "",
					data: {
						total_count: 0,
						skills: []
					}
				})];
				if (noSpaceKeyword && marketplace) promises.push(marketplace.builtin.list({
					keyword: noSpaceKeyword,
					page: 1,
					pageSize: 100,
					enterpriseId
				}));
				const settled = await Promise.allSettled(promises);
				if (cancelled) return;
				const primaryOk = settled[0].status === "fulfilled" && settled[0].value.code === 0 ? settled[0].value : null;
				const secondaryOk = settled.length > 1 && settled[1].status === "fulfilled" && settled[1].value.code === 0 ? settled[1].value : null;
				if (primaryOk || secondaryOk) {
					let builtinSkills = primaryOk ? primaryOk.data?.skills || [] : [];
					if (secondaryOk) builtinSkills = mergeByName(builtinSkills, secondaryOk.data?.skills || []);
					if (!cancelled) setBuiltinMarketSearchResults(builtinSkills);
				} else {
					builtinMarketFailed = true;
					if (!cancelled) setBuiltinMarketSearchResults([]);
				}
			} catch {
				builtinMarketFailed = true;
				if (!cancelled) setBuiltinMarketSearchResults([]);
			} finally {
				if (!cancelled) setIsBuiltinMarketSearching(false);
			}
			if (!cancelled && (isIOAUser ? [
				hubFailed,
				knotFailed,
				builtinMarketFailed
			] : [hubFailed, builtinMarketFailed]).every(Boolean)) setSearchPartialFail(true);
		}, 300);
		return () => {
			cancelled = true;
			if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
		};
	}, [
		marketplace,
		reporter,
		skillsSearch,
		isIOAUser,
		enterpriseId
	]);
	return {
		hubSearchResults,
		knotSearchResults,
		builtinMarketSearchResults,
		isHubSearching,
		isKnotSearching,
		isBuiltinMarketSearching,
		searchPartialFail
	};
}
var import_react$22;
var init_use_remote_skill_search = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_context();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-skill-search.ts
function useSkillSearch({ installedSkills, recommendedSkills, isIOAUser = false, hideInstalled = false }) {
	const [skillsSearch, setSkillsSearch] = (0, import_react$21.useState)("");
	const remote = useRemoteSkillSearch({
		skillsSearch,
		isIOAUser
	});
	/**
	* Identity keys for installed skills (lowercased), used to de-dup against
	* hub / recommended skills. We index by `name`, `slug`, and directory
	* basename because LLM-driven bash installs produce arbitrary frontmatter
	* names and directory names that rarely match the hub's `slug`.
	*
	* Known gap (issue 31935): if directory name / frontmatter name / hub slug
	* are all different (e.g. dir `tencent-meeting-skill` + frontmatter name
	* `tencent-meeting-mcp` + hub slug `tencent-meeting`), this set still
	* cannot dedupe. The proper fix would be to write `_skillhub_meta.json`
	* during install; treated as out of scope per user direction.
	*/
	const installedIdSet = (0, import_react$21.useMemo)(() => {
		const keys = /* @__PURE__ */ new Set();
		for (const s of installedSkills) {
			if (s.name) keys.add(s.name.toLowerCase());
			if (s.slug) keys.add(s.slug.toLowerCase());
			if (s.filePath) {
				const segs = s.filePath.split(/[\\/]/);
				const dir = segs.length >= 2 ? segs[segs.length - 2] : void 0;
				if (dir) keys.add(dir.toLowerCase());
			}
		}
		return keys;
	}, [installedSkills]);
	/**
	* @deprecated Use `installedIdSet` instead. Retained as an alias to
	* preserve the original export contract while all call-sites migrate.
	*/
	const installedNameSet = installedIdSet;
	const filteredInstalledSkills = (0, import_react$21.useMemo)(() => {
		const keyword = skillsSearch.trim().toLowerCase();
		if (!keyword) return installedSkills;
		return installedSkills.filter((skill) => {
			const name = skill.name.toLowerCase();
			const desc = skill.description?.toLowerCase() ?? "";
			const descZh = skill.description_zh?.toLowerCase() ?? "";
			const descEn = skill.description_en?.toLowerCase() ?? "";
			return textMatchesKeyword(name, keyword) || textMatchesKeyword(desc, keyword) || textMatchesKeyword(descZh, keyword) || textMatchesKeyword(descEn, keyword);
		});
	}, [installedSkills, skillsSearch]);
	const filteredRecommendedSkills = (0, import_react$21.useMemo)(() => {
		const keyword = skillsSearch.trim().toLowerCase();
		if (!keyword) return recommendedSkills;
		return recommendedSkills.filter((skill) => {
			const name = skill.name.toLowerCase();
			const desc = skill.description?.toLowerCase() ?? "";
			const descZh = skill.description_zh?.toLowerCase() ?? "";
			const descEn = skill.description_en?.toLowerCase() ?? "";
			return textMatchesKeyword(name, keyword) || textMatchesKeyword(desc, keyword) || textMatchesKeyword(descZh, keyword) || textMatchesKeyword(descEn, keyword);
		});
	}, [recommendedSkills, skillsSearch]);
	/** Recommended skills (non-search mode only), excluding already-installed skills.
	*  Check name, slug, and iconSource — matches the installedIdSet multi-key
	*  contract, so dedupe still fires when frontmatter/hub display names
	*  diverge but the marketplace source/slug matches (issue 31935).
	*  Note: recommended items built from the marketplace API carry the slug
	*  in `iconSource` rather than `slug` — see use-installed-skills.ts. */
	const mergedRecommendedSkills = (0, import_react$21.useMemo)(() => {
		if (!hideInstalled) return filteredRecommendedSkills;
		return filteredRecommendedSkills.filter((s) => !installedIdSet.has(s.name.toLowerCase()) && !(s.slug && installedIdSet.has(s.slug.toLowerCase())) && !(s.iconSource && installedIdSet.has(s.iconSource.toLowerCase())));
	}, [
		filteredRecommendedSkills,
		installedIdSet,
		hideInstalled
	]);
	/**
	* Search results: SkillHub results + Knot results, each tagged with source.
	* BuiltinMarket results 字段结构与 SkillHubSkill 不同构，独立保存在
	* `builtinMarketSearchResults` 中，不塞入本数组。
	*
	* 注意：老的 `_source: 'recommend'`（市场 marketplace recommendedSkills 本地过滤）已移除，
	* recommend tab 统一以 BuiltinMarket 远程搜索为唯一数据源。
	*/
	const mergedSearchResults = (0, import_react$21.useMemo)(() => {
		if (!skillsSearch.trim()) return [];
		const keyword = skillsSearch.trim().toLowerCase();
		const matchesKw = (text) => {
			if (!text) return false;
			return textMatchesKeyword(text.toLowerCase(), keyword);
		};
		const taggedHub = remote.hubSearchResults.filter((s) => matchesKw(s.name) || matchesKw(s.slug) || matchesKw(s.description) || matchesKw(s.description_zh)).map((s) => ({
			...s,
			_source: s._source || "skillhub"
		}));
		const taggedKnot = remote.knotSearchResults.filter((s) => matchesKw(s.name) || matchesKw(s.slug) || matchesKw(s.description) || matchesKw(s.description_zh)).map((s) => ({
			...s,
			_source: s._source || "knot"
		}));
		const all = [...taggedHub, ...taggedKnot];
		if (!hideInstalled) return all;
		return all.filter((s) => !installedIdSet.has(s.name.toLowerCase()) && !installedIdSet.has(s.slug.toLowerCase()));
	}, [
		skillsSearch,
		remote.hubSearchResults,
		remote.knotSearchResults,
		installedIdSet,
		hideInstalled
	]);
	/**
	* BuiltinMarket 搜索结果：已装过滤。
	* 后端 /list 已按 keyword 模糊匹配，前端不再重复过滤关键词。
	*/
	const filteredBuiltinMarketSearchResults = (0, import_react$21.useMemo)(() => {
		if (!skillsSearch.trim()) return [];
		if (!hideInstalled) return remote.builtinMarketSearchResults;
		return remote.builtinMarketSearchResults.filter((s) => {
			const nameKey = s.name?.toLowerCase();
			const descKey = s.description?.toLowerCase();
			if (nameKey && installedIdSet.has(nameKey)) return false;
			if (descKey && installedIdSet.has(descKey)) return false;
			return true;
		});
	}, [
		skillsSearch,
		remote.builtinMarketSearchResults,
		installedIdSet,
		hideInstalled
	]);
	return {
		skillsSearch,
		setSkillsSearch,
		searchPartialFail: remote.searchPartialFail,
		isHubSearching: remote.isHubSearching,
		isKnotSearching: remote.isKnotSearching,
		isBuiltinMarketSearching: remote.isBuiltinMarketSearching,
		hubSearchResults: remote.hubSearchResults,
		knotSearchResults: remote.knotSearchResults,
		builtinMarketSearchResults: filteredBuiltinMarketSearchResults,
		mergedSearchResults,
		installedIdSet,
		installedNameSet,
		filteredInstalledSkills,
		filteredRecommendedSkills,
		mergedRecommendedSkills
	};
}
var import_react$21;
var init_use_skill_search = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_keyword_match();
	init_use_remote_skill_search();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-installed-lookup.ts
/**
* 共享 hook：浏览态各 tab（recommend / skillhub / knot）和搜索态结果区
* 都需要做「这条市场卡片是否已装？已装则改用已安装态卡片渲染」的反查。
*
* 抽出此 hook 是为了：
* 1. 反查 key 生成规则（name/slug/dirName/skillId 全部小写化）只在一处定义，
*    与 `useSkillSearch.installedIdSet` 保持一致；
* 2. 已安装态卡片的回调集合（点击/启停/卸载/编辑/试用）只在一处组装，
*    避免 4 处粘贴 4 份易漂移的代码。
*/
function useInstalledLookup(args) {
	const { installedSkills, handleSkillCardClick, handleToggleSkill, handleBatchUninstall, handleEditSkill, handleTrySkill } = args;
	const installedSkillByKey = (0, import_react$20.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const s of installedSkills) {
			if (s.name) map.set(s.name.toLowerCase(), s);
			if (s.slug) map.set(s.slug.toLowerCase(), s);
			if (s.skillId) map.set(s.skillId.toLowerCase(), s);
			if (s.filePath) {
				const segs = s.filePath.split(/[\\/]/);
				const dir = segs.length >= 2 ? segs[segs.length - 2] : void 0;
				if (dir) map.set(dir.toLowerCase(), s);
			}
		}
		return map;
	}, [installedSkills]);
	return {
		findInstalledSkill: (0, import_react$20.useMemo)(() => (keys, expectedSource) => {
			const allow = expectedSource === void 0 ? void 0 : new Set(Array.isArray(expectedSource) ? expectedSource : [expectedSource]);
			for (const k of keys) {
				if (!k) continue;
				const hit = installedSkillByKey.get(k.toLowerCase());
				if (!hit) continue;
				if (allow && !(hit.marketplaceSource && allow.has(hit.marketplaceSource))) continue;
				return hit;
			}
		}, [installedSkillByKey]),
		installedSkillHandlers: (0, import_react$20.useMemo)(() => ({
			onCardClick: handleSkillCardClick,
			onToggleSkill: handleToggleSkill,
			onUninstallSkill: (skill) => handleBatchUninstall([skill]),
			onEditSkill: handleEditSkill,
			onTryNow: (skill) => handleTrySkill(skill.name, pickLocalizedExamples(skill), skill.name, skill.skillId)
		}), [
			handleSkillCardClick,
			handleToggleSkill,
			handleBatchUninstall,
			handleEditSkill,
			handleTrySkill
		])
	};
}
var import_react$20;
var init_use_installed_lookup = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-pinned-installed.ts
/** 从 localStorage 安全读取，破损/越权时静默回退到空 */
function readStorage() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
		const result = {};
		for (const [k, v] of Object.entries(parsed)) if (typeof v === "number" && Number.isFinite(v)) result[k] = v;
		return result;
	} catch {
		return {};
	}
}
/** 写回 localStorage，写不进去（隐私模式 / 配额满）静默失败 */
function writeStorage(map) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
	} catch {}
}
/**
* Skill / plugin 置顶状态 hook。
*
* - 仅在「我安装的」InstalledSection 里挂载一次（避免多份 state 不一致）；
*   其它消费方通过 props 拿到 pinnedMap / togglePin，不要重复调用本 hook。
* - 监听 storage 事件 → 多 tab 内置顶状态会同步（同一浏览器多 tab 的常见场景）。
*/
function usePinnedInstalled() {
	const [pinnedMap, setPinnedMap] = (0, import_react$19.useState)(() => readStorage());
	(0, import_react$19.useEffect)(() => {
		const handler = (e) => {
			if (e.key !== STORAGE_KEY) return;
			setPinnedMap(readStorage());
		};
		window.addEventListener("storage", handler);
		return () => window.removeEventListener("storage", handler);
	}, []);
	const isPinned = (0, import_react$19.useCallback)((key) => Object.prototype.hasOwnProperty.call(pinnedMap, key), [pinnedMap]);
	const togglePin = (0, import_react$19.useCallback)((key, next) => {
		setPinnedMap((prev) => {
			const currentlyPinned = Object.prototype.hasOwnProperty.call(prev, key);
			const target = typeof next === "boolean" ? next : !currentlyPinned;
			if (target === currentlyPinned) return prev;
			const updated = { ...prev };
			if (target) updated[key] = Date.now();
			else delete updated[key];
			writeStorage(updated);
			return updated;
		});
	}, []);
	return (0, import_react$19.useMemo)(() => ({
		pinnedMap,
		isPinned,
		togglePin
	}), [
		pinnedMap,
		isPinned,
		togglePin
	]);
}
var import_react$19, STORAGE_KEY;
var init_use_pinned_installed = __esmMin((() => {
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	STORAGE_KEY = "workbuddy.skills.installed.pinned.v1";
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-skill-detail.ts
function useSkillDetail() {
	const personalSkills = useModuleHost().facades.personalSkills;
	let marketplace;
	try {
		marketplace = useModuleHost().facades.skillsMarketplace;
	} catch {
		marketplace = void 0;
	}
	const { locale } = useI18n();
	const [selectedSkill, setSelectedSkill] = (0, import_react$18.useState)(null);
	const [selectedHubSkill, setSelectedHubSkill] = (0, import_react$18.useState)(null);
	const [skillPreviewMode, setSkillPreviewMode] = (0, import_react$18.useState)("preview");
	const [openMoreMenu, setOpenMoreMenu] = (0, import_react$18.useState)(false);
	const [skillContentLoading, setSkillContentLoading] = (0, import_react$18.useState)(false);
	const [skillDetailMarkdown, setSkillDetailMarkdown] = (0, import_react$18.useState)("");
	const moreMenuRef = (0, import_react$18.useRef)(null);
	const isSkillDetailView = !!selectedSkill || !!selectedHubSkill;
	const handleSkillCardClick = (0, import_react$18.useCallback)((skill) => {
		setSelectedSkill(skill);
		setSelectedHubSkill(null);
		setSkillPreviewMode("preview");
	}, []);
	const handleHubSkillCardClick = (0, import_react$18.useCallback)((skill) => {
		setSelectedHubSkill(skill);
		setSelectedSkill(null);
		setSkillPreviewMode("preview");
	}, []);
	const handleBackFromDetail = (0, import_react$18.useCallback)(() => {
		setSelectedSkill(null);
		setSelectedHubSkill(null);
		setSkillPreviewMode("preview");
	}, []);
	const clearSkillSelection = (0, import_react$18.useCallback)(() => {
		setSelectedSkill(null);
		setSelectedHubSkill(null);
	}, []);
	(0, import_react$18.useEffect)(() => {
		if (!openMoreMenu) return;
		const handleClickOutside = (event) => {
			if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) setOpenMoreMenu(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [openMoreMenu]);
	(0, import_react$18.useEffect)(() => {
		if (!selectedSkill && !selectedHubSkill) {
			setSkillDetailMarkdown("");
			return;
		}
		if (selectedHubSkill) {
			if (typeof selectedHubSkill.slug !== "string") {
				const bm = selectedHubSkill;
				const isEn = getLocale() === "en";
				const displayName = getBuiltinMarketDisplayName(bm) || "";
				const bodyDesc = isEn ? bm.description_en || bm.description_zh || "" : bm.description_zh || bm.description_en || "";
				setSkillDetailMarkdown(`---\n${[
					`name: ${displayName}`,
					bm.name ? `slug: ${bm.name}` : "",
					bm.version ? `version: ${bm.version}` : ""
				].filter(Boolean).join("\n")}\n---\n\n# ${displayName}\n\n${bodyDesc}`);
				return;
			}
			let cancelled = false;
			setSkillContentLoading(true);
			(marketplace ? marketplace.skillhub.getDetail(selectedHubSkill.slug) : Promise.reject(/* @__PURE__ */ new Error("marketplace facade not available"))).then((response) => {
				if (cancelled) return;
				const skill = response.skill;
				const desc = getLocale() !== "en" && skill.summary_zh ? skill.summary_zh : skill.summary;
				const authorName = response.publisher?.name || response.owner.displayName;
				setSkillDetailMarkdown(`---\nname: ${skill.displayName}\ncategory: ${skill.category}\nversion: ${response.latestVersion.version}\nauthor: ${authorName}\n---\n\n# ${skill.displayName}\n\n${desc}`);
			}).catch(() => {
				if (cancelled) return;
				const desc = getLocale() !== "en" ? selectedHubSkill.description_zh : selectedHubSkill.description;
				setSkillDetailMarkdown(`# ${selectedHubSkill.name}\n\n${desc}`);
			}).finally(() => {
				setSkillContentLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}
		if (!selectedSkill) return;
		if (selectedSkill.source === "builtin" && marketplace) {
			let cancelled = false;
			setSkillContentLoading(true);
			marketplace.local.getContent({ skillName: selectedSkill.name }).then((response) => {
				if (cancelled) return;
				setSkillDetailMarkdown(response.content ? buildSkillMarkdownWithMeta(selectedSkill, response.content) : buildFallbackSkillMarkdown(selectedSkill));
			}).catch(() => {
				if (cancelled) return;
				setSkillDetailMarkdown(buildFallbackSkillMarkdown(selectedSkill));
			}).finally(() => {
				setSkillContentLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}
		if (!selectedSkill) {
			setSkillDetailMarkdown("");
			return;
		}
		let cancelled = false;
		setSkillContentLoading(true);
		personalSkills?.getContent({ filePath: selectedSkill.filePath }).then((response) => {
			if (cancelled) return;
			setSkillDetailMarkdown(response.content ? buildSkillMarkdownWithMeta(selectedSkill, response.content) : buildFallbackSkillMarkdown(selectedSkill));
		}).catch(() => {
			if (cancelled) return;
			setSkillDetailMarkdown(buildFallbackSkillMarkdown(selectedSkill));
		}).finally(() => {
			setSkillContentLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		marketplace,
		personalSkills,
		selectedSkill,
		selectedHubSkill,
		locale
	]);
	return {
		selectedSkill,
		setSelectedSkill,
		selectedHubSkill,
		setSelectedHubSkill,
		skillPreviewMode,
		setSkillPreviewMode,
		openMoreMenu,
		setOpenMoreMenu,
		skillContentLoading,
		skillDetailMarkdown,
		isSkillDetailView,
		moreMenuRef,
		handleSkillCardClick,
		handleHubSkillCardClick,
		handleBackFromDetail,
		clearSkillSelection
	};
}
var import_react$18;
var init_use_skill_detail = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_useI18n();
	init_skill_card_helpers();
	init_context();
	init_types();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/use-min-height-lock.ts
/**
* 最小高度锁定 Hook
*
* 用于防止内容切换时由于高度变化导致滚动位置跳动。
* 在内容切换前锁定当前高度作为最小高度，一段时间后自动释放。
*
* @param delay - 锁定持续时间（毫秒），默认 300ms
* @returns
*   - containerRef: 需要绑定到内容容器的 ref
*   - minHeight: 当前最小高度值，用于设置 style.minHeight
*   - lockHeight: 调用此函数锁定当前高度
*   - wrapWithLock: 包装函数，自动在执行前锁定高度
*/
function useMinHeightLock(delay = 300) {
	const containerRef = (0, import_react$17.useRef)(null);
	const [minHeight, setMinHeight] = (0, import_react$17.useState)(void 0);
	const timeoutRef = (0, import_react$17.useRef)(null);
	const lockHeight = (0, import_react$17.useCallback)(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (containerRef.current) setMinHeight(containerRef.current.offsetHeight);
		timeoutRef.current = setTimeout(() => {
			setMinHeight(void 0);
			timeoutRef.current = null;
		}, delay);
	}, [delay]);
	return {
		containerRef,
		minHeight,
		lockHeight,
		wrapWithLock: (0, import_react$17.useCallback)((fn) => (...args) => {
			lockHeight();
			return fn(...args);
		}, [lockHeight])
	};
}
var import_react$17;
var init_use_min_height_lock = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/hooks/index.ts
var init_hooks = __esmMin((() => {
	init_use_installed_skills();
	init_use_skillhub();
	init_use_knot();
	init_use_builtin_market();
	init_use_enterprise_skills();
	init_use_plugins();
	init_use_skill_search();
	init_use_installed_lookup();
	init_use_pinned_installed();
	init_use_skill_detail();
	init_use_min_height_lock();
	init_use_skills_update_badge();
	init_use_disable_all_extensions();
	init_skills_utils();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/tabs/recommend-tab.tsx
function useInfiniteScroll$3(onLoadMore, enabled) {
	const [sentinelEl, setSentinelEl] = import_react$16.useState(null);
	(0, import_react$16.useEffect)(() => {
		if (!sentinelEl || !enabled) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onLoadMore();
		}, { rootMargin: "200px" });
		observer.observe(sentinelEl);
		return () => observer.disconnect();
	}, [
		sentinelEl,
		onLoadMore,
		enabled
	]);
	return (0, import_react$16.useCallback)((node) => setSentinelEl(node), []);
}
var import_react$16, import_jsx_runtime$12, RecommendTab;
var init_recommend_tab = __esmMin((() => {
	init_common();
	init_src();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_components();
	init_skill_card_helpers();
	init_use_installed_lookup();
	init_types();
	import_jsx_runtime$12 = require_jsx_runtime();
	RecommendTab = ({ data }) => {
		const { builtinMarketSkills: rawSkills, displayBuiltinMarketSkills: skills, builtinMarketTotal: total, builtinMarketPage: page, builtinMarketLoading: loading, builtinMarketError: error, builtinMarketCategories: categories, builtinMarketSelectedCategory: selectedCategory, setBuiltinMarketSelectedCategory: onCategoryChange, loadBuiltinMarketList: onLoadMore, handleBuiltinMarketSkillCardClick: onSkillClick, handleInstallBuiltinMarketSkill: onInstall, getBuiltinMarketInstallBtnState, handleTrySkill, installedSkills, handleSkillCardClick, handleToggleSkill, handleBatchUninstall, handleEditSkill, t } = data;
		const { findInstalledSkill, installedSkillHandlers } = useInstalledLookup({
			installedSkills,
			handleSkillCardClick,
			handleToggleSkill,
			handleBatchUninstall,
			handleEditSkill,
			handleTrySkill
		});
		const hasMore = rawSkills.length < total && !loading;
		const sentinelRef = useInfiniteScroll$3((0, import_react$16.useCallback)(() => {
			if (!loading) onLoadMore(page + 1, true);
		}, [
			loading,
			page,
			onLoadMore
		]), hasMore);
		const isEn = getLocale() === "en";
		const hasCategories = categories && categories.length > 0;
		const gridSkills = skills;
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "skills-discover-content",
			children: [hasCategories && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
				className: "skillhub-filter-bar",
				children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(ScrollList, {
					className: "skillhub-categories",
					gap: 6,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CategoryChip, {
						label: t("skills.recommend.allTags"),
						active: !selectedCategory,
						onClick: () => onCategoryChange(""),
						track: {
							elementId: "skill_market_category_switch",
							elementName: "推荐分类切换",
							props: {
								type: "all",
								mode: "recommend"
							}
						}
					}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CategoryChip, {
						label: isEn ? cat.name_en || cat.name_zh : cat.name_zh || cat.name_en,
						active: selectedCategory === cat.id,
						onClick: () => onCategoryChange(cat.id),
						track: {
							elementId: "skill_market_category_switch",
							elementName: "推荐分类切换",
							props: {
								type: cat.id,
								mode: "recommend"
							}
						}
					}, cat.id))]
				})
			}), error && !loading && rawSkills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
				className: "skillhub-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: t("skills.recommend.empty") }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("button", {
					type: "button",
					className: "skillhub-retry-btn",
					onClick: () => onLoadMore(1),
					children: t("skills.knot.retry")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
				error && rawSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					className: "skillhub-error-banner",
					role: "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", { children: t("skills.recommend.loadError") }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("button", {
						type: "button",
						className: "skillhub-error-banner-retry",
						onClick: () => onLoadMore(1),
						children: t("skills.knot.retry")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "skills-grid",
					children: loading && rawSkills.length === 0 ? Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SkillCardSkeleton, {}, `recommend-skeleton-${i}`)) : gridSkills.map((skill) => {
						const installedHit = findInstalledSkill([
							skill.name,
							getBuiltinMarketSkillId(skill),
							skill.id,
							skill.skill_id
						], ["builtin-market", "marketplace"]);
						if (installedHit) return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SkillCard, { ...installedSkillToCardProps({
							skill: installedHit,
							enabled: !installedHit.disable,
							showInstalledIndicator: true,
							...installedSkillHandlers
						}) }, `recommend-installed-${installedHit.filePath}`);
						return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SkillCard, { ...builtinMarketSkillToCardProps(skill, categories, onSkillClick, onInstall, getBuiltinMarketInstallBtnState(skill), () => handleTrySkill(skill.name, pickLocalizedExamples(skill), getBuiltinMarketDisplayName(skill), getBuiltinMarketSkillId(skill))) }, getBuiltinMarketSkillId(skill));
					})
				}),
				gridSkills.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "skills-empty",
					children: t("skills.recommend.empty")
				}),
				hasMore && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					ref: sentinelRef,
					className: "skillhub-scroll-sentinel"
				})
			] })]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/tabs/skillhub-tab.tsx
function useInfiniteScroll$2(onLoadMore, enabled) {
	const [sentinelEl, setSentinelEl] = import_react$15.useState(null);
	(0, import_react$15.useEffect)(() => {
		if (!sentinelEl || !enabled) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onLoadMore();
		}, { rootMargin: "200px" });
		observer.observe(sentinelEl);
		return () => observer.disconnect();
	}, [
		sentinelEl,
		onLoadMore,
		enabled
	]);
	return (0, import_react$15.useCallback)((node) => {
		setSentinelEl(node);
	}, []);
}
var import_react$15, import_jsx_runtime$11, SortDropdown, SkillhubTab;
var init_skillhub_tab = __esmMin((() => {
	init_src();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_components();
	init_use_installed_lookup();
	init_types();
	import_jsx_runtime$11 = require_jsx_runtime();
	SortDropdown = ({ sortBy, onSortChange, t }) => {
		const [open, setOpen] = (0, import_react$15.useState)(false);
		const ref = (0, import_react$15.useRef)(null);
		(0, import_react$15.useEffect)(() => {
			if (!open) return;
			const handleClick = (e) => {
				if (ref.current && !ref.current.contains(e.target)) setOpen(false);
			};
			document.addEventListener("mousedown", handleClick);
			return () => document.removeEventListener("mousedown", handleClick);
		}, [open]);
		const currentLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.labelKey ?? SORT_OPTIONS[0].labelKey;
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "skillhub-sort-dropdown",
			ref,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("button", {
				type: "button",
				className: "skillhub-sort-dropdown-btn",
				onClick: () => setOpen((prev) => !prev),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", { d: "m3 16 4 4 4-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", { d: "M7 20V4" }),
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", { d: "m21 8-4-4-4 4" }),
							/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", { d: "M17 4v16" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { children: t(currentLabel) }),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("svg", {
						width: "10",
						height: "10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", { d: "m6 9 6 6 6-6" })
					})
				]
			}), open && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "skillhub-sort-dropdown-menu",
				children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
					className: `skillhub-sort-dropdown-option${sortBy === opt.value ? " skillhub-sort-dropdown-option--active" : ""}`,
					onClick: () => {
						onSortChange(opt.value);
						setOpen(false);
					},
					"data-track-id": "skill_market_hub_sort",
					"data-track-name": "skillhub排序",
					"data-track-props": JSON.stringify({
						type: opt.value,
						mode: "skillhub"
					}),
					children: t(opt.labelKey)
				}, opt.value))
			})]
		});
	};
	SkillhubTab = ({ data }) => {
		const { hubCategories: categories, hubSelectedCategory: selectedCategory, setHubSelectedCategory: onCategoryChange, hubSortBy: sortBy, setHubSortBy: onSortChange, hubLoading: loading, hubError: error, hubSkills: rawSkills, displayHubSkills: skills, hubTotal: total, hubPage: page, loadHubSkills: onLoadMore, handleHubSkillCardClick: onSkillClick, handleInstallHubSkill: onInstall, isHubSkillInstalling, isHubSkillInstalled, handleTrySkill, installedSkills, handleSkillCardClick, handleToggleSkill, handleBatchUninstall, handleEditSkill, t } = data;
		const { findInstalledSkill, installedSkillHandlers } = useInstalledLookup({
			installedSkills,
			handleSkillCardClick,
			handleToggleSkill,
			handleBatchUninstall,
			handleEditSkill,
			handleTrySkill
		});
		const hasMore = rawSkills.length < total && !loading;
		const sentinelRef = useInfiniteScroll$2((0, import_react$15.useCallback)(() => {
			if (!loading) onLoadMore(page + 1, true);
		}, [
			loading,
			page,
			onLoadMore
		]), hasMore);
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
			className: "skillhub-filter-bar",
			children: categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
				className: "skillhub-categories",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(ScrollList, {
						className: "skillhub-categories-scroll",
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(CategoryChip, {
							label: t("skills.skillhub.allCategories"),
							active: !selectedCategory,
							onClick: () => onCategoryChange(""),
							track: {
								elementId: "skill_market_hub_category",
								elementName: "skillhub分类",
								props: {
									type: "all",
									mode: "skillhub"
								}
							}
						}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(CategoryChip, {
							label: getLocale() !== "en" ? cat.name : cat.nameEn,
							active: selectedCategory === cat.key,
							onClick: () => onCategoryChange(cat.key),
							track: {
								elementId: "skill_market_hub_category",
								elementName: "skillhub分类",
								props: {
									type: cat.key,
									mode: "skillhub"
								}
							}
						}, cat.key))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
						className: "skillhub-hub-link",
						role: "link",
						tabIndex: 0,
						title: "skillhub.cn",
						onClick: (e) => {
							e.preventDefault();
							window.open("https://skillhub.cn", "_blank", "noopener,noreferrer");
						},
						onKeyDown: (e) => {
							if (e.key === "Enter") window.open("https://skillhub.cn", "_blank", "noopener,noreferrer");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("svg", {
							width: "11",
							height: "11",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("polyline", { points: "15 3 21 3 21 9" }),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("line", {
									x1: "10",
									y1: "14",
									x2: "21",
									y2: "3"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { children: "skillhub.cn" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(SortDropdown, {
						sortBy,
						onSortChange: (v) => onSortChange(v),
						t
					})
				]
			})
		}), error && !loading ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "skillhub-error",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("p", { children: t("skills.skillhub.error") }), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
				type: "button",
				className: "skillhub-retry-btn",
				onClick: () => onLoadMore(1),
				children: t("skills.skillhub.retry")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "skills-grid",
				children: loading && skills.length === 0 ? Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(SkillCardSkeleton, {}, `hub-skeleton-${i}`)) : skills.map((skill) => {
					const installedHit = findInstalledSkill([skill.slug, skill.name], "skillhub");
					if (installedHit) return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(SkillCard, {
						...installedSkillToCardProps({
							skill: installedHit,
							enabled: !installedHit.disable,
							showInstalledIndicator: true,
							downloads: skill.downloads,
							stars: skill.stars,
							...installedSkillHandlers
						}),
						skillSource: skill.slug
					}, `hub-installed-${installedHit.filePath}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(SkillCard, { ...hubSkillToCardProps(skill, onSkillClick, onInstall, void 0, t, isHubSkillInstalling(skill.slug), isHubSkillInstalled(skill.slug), isHubSkillInstalled(skill.slug) ? () => handleTrySkill(skill.name || skill.slug, void 0, skill.name || skill.slug) : void 0) }, skill.slug);
				})
			}),
			skills.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "skills-empty",
				children: t("skills.skillhub.empty")
			}),
			hasMore && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				ref: sentinelRef,
				className: "skillhub-scroll-sentinel"
			}),
			loading && skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "skillhub-loading-more",
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", { className: "skill-detail-skeleton-line skill-detail-skeleton-line--medium" })
			})
		] })] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/tabs/marketplace-display-name.ts
/**
* 把 marketplace 内部标识符转成用于展示的分类名。
* 未命中映射表时原样返回原始标识符。
*/
function getMarketplaceDisplayName(name) {
	return MARKETPLACE_DISPLAY_NAME_MAP[name] ?? name;
}
var MARKETPLACE_DISPLAY_NAME_MAP;
var init_marketplace_display_name = __esmMin((() => {
	MARKETPLACE_DISPLAY_NAME_MAP = { cb_teams_marketplace: "cb-teams-marketplace" };
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/tabs/plugins-tab.tsx
var import_react$14, import_jsx_runtime$10, PluginsTab;
var init_plugins_tab = __esmMin((() => {
	init_src();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_components();
	init_hooks();
	init_types();
	init_marketplace_display_name();
	import_jsx_runtime$10 = require_jsx_runtime();
	PluginsTab = ({ data }) => {
		const { installedPlugins, marketplacePlugins, marketplacePluginsLoading, pluginsLoading, pluginMarketplaces, currentPluginMarketplace, handlePluginMarketplaceChange: onMarketplaceChange, refreshingMarketplaces, handleRefreshMarketplace: onRefreshMarketplace, handleDeleteMarketplace: onDeleteMarketplace, showAddMarketplaceModal, setShowAddMarketplaceModal, addMarketplaceLoading, addMarketplaceError, setAddMarketplaceError, handleAddMarketplace: onAddMarketplace, handlePluginCardClick: onPluginClick, handleInstallPlugin: onInstallPlugin, isPluginInstalling, deleteConfirmVisible, pendingDeletePluginNames, deleteConfirmLoading, confirmDeleteMarketplace, cancelDeleteMarketplace, t } = data;
		const [openMarketplaceMenu, setOpenMarketplaceMenu] = (0, import_react$14.useState)(null);
		const [addMarketplaceLoadingMessage, setAddMarketplaceLoadingMessage] = (0, import_react$14.useState)("");
		(0, import_react$14.useEffect)(() => {
			if (!addMarketplaceLoading) return;
			setAddMarketplaceLoadingMessage(t("plugins.addMarketplace.downloading") || "Downloading marketplace...");
			const messages = [
				t("plugins.addMarketplace.downloading") || "Downloading marketplace...",
				t("plugins.addMarketplace.extracting") || "Extracting marketplace...",
				t("plugins.addMarketplace.installing") || "Installing marketplace..."
			];
			let messageIndex = 0;
			const interval = setInterval(() => {
				messageIndex = (messageIndex + 1) % messages.length;
				setAddMarketplaceLoadingMessage(messages[messageIndex]);
			}, 3e3);
			return () => clearInterval(interval);
		}, [addMarketplaceLoading, t]);
		const { containerRef: gridRef, minHeight: gridMinHeight, wrapWithLock } = useMinHeightLock();
		const handleMarketplaceChangeWithLock = wrapWithLock(onMarketplaceChange);
		const realtimeInstalledNames = (0, import_react$14.useMemo)(() => new Set(installedPlugins.map((p) => p.name)), [installedPlugins]);
		const uninstalledPlugins = marketplacePlugins.filter((plugin) => !realtimeInstalledNames.has(plugin.name));
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "skills-discover-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "plugins-marketplace-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
						className: "plugins-marketplace-tabs",
						children: [pluginMarketplaces.map((marketplace) => {
							const isRefreshing = refreshingMarketplaces.has(marketplace.name);
							const isSelected = currentPluginMarketplace === marketplace.name;
							return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(CategoryChip, {
								label: getMarketplaceDisplayName(marketplace.name),
								active: isSelected,
								loading: isRefreshing,
								onClick: () => handleMarketplaceChangeWithLock(marketplace.name),
								moreMenu: {
									open: openMarketplaceMenu === marketplace.name,
									onToggle: () => setOpenMarketplaceMenu(openMarketplaceMenu === marketplace.name ? null : marketplace.name),
									items: [{
										label: t("plugins.marketplace.refresh"),
										onClick: () => {
											setOpenMarketplaceMenu(null);
											onRefreshMarketplace(marketplace.name);
										}
									}, {
										label: t("plugins.marketplace.delete"),
										onClick: () => {
											setOpenMarketplaceMenu(null);
											onDeleteMarketplace(marketplace.id);
										},
										danger: true
									}]
								}
							}, marketplace.name);
						}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
							type: "button",
							className: "plugins-add-marketplace-btn plugins-add-marketplace-btn--inline",
							onClick: () => setShowAddMarketplaceModal(true),
							title: t("plugins.addMarketplace"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", {
									d: "M8 3V13M3 8H13",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						})]
					})
				}),
				marketplacePluginsLoading || pluginsLoading ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "skills-grid",
					ref: gridRef,
					style: { minHeight: gridMinHeight },
					children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SkillCardSkeleton, {}, `marketplace-plugins-skeleton-${i}`))
				}) : /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "skills-grid",
					ref: gridRef,
					style: { minHeight: gridMinHeight },
					children: uninstalledPlugins.map((plugin) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SkillCard, {
						...pluginToCardProps(plugin, onPluginClick, void 0, () => onInstallPlugin(plugin, "user"), isPluginInstalling(plugin.name, plugin.marketplaceName)),
						isInstalled: realtimeInstalledNames.has(plugin.name)
					}, `marketplace-${plugin.marketplaceName}/${plugin.name}`))
				}), uninstalledPlugins.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "skills-empty",
					children: t("skills.plugins.marketplaceEmpty")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AddMarketplaceModal, {
					show: showAddMarketplaceModal,
					title: t("plugins.addMarketplace"),
					sourceLabel: t("plugins.addMarketplace.sourceLabel"),
					sourceTip: t("plugins.addMarketplace.sourceTip"),
					placeholder: t("plugins.addMarketplace.placeholder"),
					submitText: t("plugins.addMarketplace.submit"),
					cancelText: t("common.cancel"),
					errorMessage: addMarketplaceError,
					loading: addMarketplaceLoading,
					loadingMessage: addMarketplaceLoadingMessage,
					errorBrief: t("plugins.addMarketplace.errorBrief"),
					showDetailsText: t("plugins.addMarketplace.showDetails"),
					hideDetailsText: t("plugins.addMarketplace.hideDetails"),
					onSubmit: onAddMarketplace,
					onCancel: () => {
						setShowAddMarketplaceModal(false);
						setAddMarketplaceError("");
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ConfirmDialog, {
					visible: deleteConfirmVisible,
					title: t("plugins.deleteMarketplace.confirmTitle"),
					content: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", { children: t("plugins.deleteMarketplace.confirmDesc") }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(ScrollList, {
						direction: "vertical",
						fadeSize: 16,
						draggable: false,
						hideScrollbar: true,
						style: {
							marginTop: 8,
							maxHeight: 120
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
							style: { fontWeight: "bold" },
							children: pendingDeletePluginNames.join(", ")
						})
					})] }),
					confirmText: t("plugins.deleteMarketplace.confirmButton"),
					cancelText: t("common.cancel"),
					confirmVariant: "danger",
					confirmLoading: deleteConfirmLoading,
					onClose: cancelDeleteMarketplace,
					onConfirm: confirmDeleteMarketplace
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/tabs/knot-tab.tsx
function useInfiniteScroll$1(onLoadMore, enabled) {
	const [sentinelEl, setSentinelEl] = import_react$13.useState(null);
	(0, import_react$13.useEffect)(() => {
		if (!sentinelEl || !enabled) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onLoadMore();
		}, { rootMargin: "200px" });
		observer.observe(sentinelEl);
		return () => observer.disconnect();
	}, [
		sentinelEl,
		onLoadMore,
		enabled
	]);
	return (0, import_react$13.useCallback)((node) => setSentinelEl(node), []);
}
var import_react$13, import_jsx_runtime$9, KNOT_MARKET_URL, KNOT_MARKET_LABEL, KnotTab;
var init_knot_tab = __esmMin((() => {
	init_src();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_components();
	init_use_installed_lookup();
	init_types();
	import_jsx_runtime$9 = require_jsx_runtime();
	KNOT_MARKET_URL = "https://knot.woa.com/skills/market";
	KNOT_MARKET_LABEL = "knot.woa.com";
	KnotTab = ({ data }) => {
		const { knotCategories: categories, knotTags: tags, knotSelectedCategory: selectedCategory, setKnotSelectedCategory: onCategoryChange, knotSelectedTag: selectedTag, setKnotSelectedTag: onTagChange, knotLoading: loading, knotError: error, knotSkills: rawSkills, displayKnotSkills: skills, knotTotal: total, knotPage: page, loadKnotSkills: onLoadMore, handleKnotSkillCardClick: onSkillClick, handleInstallKnotSkill: onInstall, isKnotSkillInstalling, isKnotSkillInstalled, handleTrySkill, installedSkills, handleSkillCardClick, handleToggleSkill, handleBatchUninstall, handleEditSkill, t } = data;
		const { findInstalledSkill, installedSkillHandlers } = useInstalledLookup({
			installedSkills,
			handleSkillCardClick,
			handleToggleSkill,
			handleBatchUninstall,
			handleEditSkill,
			handleTrySkill
		});
		const hasMore = rawSkills.length < total && !loading;
		const sentinelRef = useInfiniteScroll$1((0, import_react$13.useCallback)(() => {
			if (!loading) onLoadMore(page + 1, true);
		}, [
			loading,
			page,
			onLoadMore
		]), hasMore);
		const hasTags = tags && tags.length > 0;
		const hasCategories = categories && categories.length > 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "skillhub-filter-bar",
			children: (() => {
				const knotMarketLink = /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("span", {
					className: "skillhub-hub-link",
					role: "link",
					tabIndex: 0,
					title: KNOT_MARKET_LABEL,
					onClick: (e) => {
						e.preventDefault();
						window.open(KNOT_MARKET_URL, "_blank", "noopener,noreferrer");
					},
					onKeyDown: (e) => {
						if (e.key === "Enter") window.open(KNOT_MARKET_URL, "_blank", "noopener,noreferrer");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("svg", {
						width: "11",
						height: "11",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("polyline", { points: "15 3 21 3 21 9" }),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("line", {
								x1: "10",
								y1: "14",
								x2: "21",
								y2: "3"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", { children: KNOT_MARKET_LABEL })]
				});
				if (hasTags) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "skillhub-categories",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(ScrollList, {
						className: "skillhub-categories-scroll",
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(CategoryChip, {
							label: t("skills.knot.allTags"),
							active: !selectedTag,
							onClick: () => onTagChange("")
						}), tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(CategoryChip, {
							label: tag.display_name || tag.tag_name,
							active: selectedTag === tag.id,
							onClick: () => onTagChange(tag.id)
						}, tag.id))]
					}), knotMarketLink]
				});
				if (hasCategories) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
					className: "skillhub-categories",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(ScrollList, {
						className: "skillhub-categories-scroll",
						gap: 6,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(CategoryChip, {
							label: t("skills.knot.allCategories"),
							active: !selectedCategory,
							onClick: () => onCategoryChange("")
						}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(CategoryChip, {
							label: getLocale() !== "en" ? cat.name : cat.nameEn,
							active: selectedCategory === cat.key,
							onClick: () => onCategoryChange(cat.key)
						}, cat.key))]
					}), knotMarketLink]
				});
				return null;
			})()
		}), error && !loading ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "skillhub-error",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", { children: t("skills.knot.error") }), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
				type: "button",
				className: "skillhub-retry-btn",
				onClick: () => onLoadMore(1),
				children: t("skills.knot.retry")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: "skills-grid",
				children: loading && skills.length === 0 ? Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SkillCardSkeleton, {}, `knot-skeleton-${i}`)) : skills.map((skill) => {
					const installedHit = findInstalledSkill([skill.slug, skill.name], "knot");
					if (installedHit) return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SkillCard, {
						...installedSkillToCardProps({
							skill: installedHit,
							enabled: !installedHit.disable,
							showInstalledIndicator: true,
							downloads: skill.downloads,
							stars: skill.stars,
							...installedSkillHandlers
						}),
						skillSource: skill.slug
					}, `knot-installed-${installedHit.filePath}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SkillCard, { ...hubSkillToCardProps(skill, (s) => onSkillClick(s), (s) => onInstall(s), void 0, t, isKnotSkillInstalling(skill.slug), isKnotSkillInstalled(skill.slug), isKnotSkillInstalled(skill.slug) ? () => handleTrySkill(skill.name || skill.slug, void 0, skill.name || skill.slug) : void 0) }, skill.slug);
				})
			}),
			skills.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				className: "skills-empty",
				children: t("skills.knot.empty")
			}),
			hasMore && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
				ref: sentinelRef,
				className: "skillhub-scroll-sentinel"
			})
		] })] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/tabs/enterprise-tab.tsx
function useInfiniteScroll(onLoadMore, enabled) {
	const [sentinelEl, setSentinelEl] = import_react$12.useState(null);
	(0, import_react$12.useEffect)(() => {
		if (!sentinelEl || !enabled) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onLoadMore();
		}, { rootMargin: "200px" });
		observer.observe(sentinelEl);
		return () => observer.disconnect();
	}, [
		sentinelEl,
		onLoadMore,
		enabled
	]);
	return (0, import_react$12.useCallback)((node) => setSentinelEl(node), []);
}
/**
* 把 EnterpriseSkill 转成 SkillCard props。
*
* 与 builtinMarketSkillToCardProps 对齐：
*   - 已安装：onInstall 仍传，但 isInstalled=true 让 SkillCard 渲染"已安装"灰态；
*     同时给 onTryNow 让用户能直接试一试。
*   - 安装中：isInstalling=true。
*   - 未安装：正常 onInstall 触发安装。
*/
function enterpriseSkillToCardProps(skill, onCardClick, onInstall, isInstalling, isInstalled, onTryNow) {
	const rawIcon = (skill.icon_url || "").trim();
	const iconUrl = /^https?:\/\//i.test(rawIcon) ? rawIcon : void 0;
	return {
		name: skill.display_name_zh || skill.display_name_en || skill.name,
		description: skill.description_zh,
		descriptionEn: skill.description_en,
		showSource: false,
		useAvatar: true,
		skillIconUrl: iconUrl,
		onCardClick,
		onInstall,
		isInstalling,
		isInstalled,
		onTryNow: isInstalled ? onTryNow : void 0
	};
}
var import_react$12, import_jsx_runtime$8, EnterpriseTab;
var init_enterprise_tab = __esmMin((() => {
	init_src();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_components();
	init_types();
	import_jsx_runtime$8 = require_jsx_runtime();
	EnterpriseTab = ({ data }) => {
		const { enterpriseSkills, displayEnterpriseSkills, enterpriseCategories, enterpriseSelectedCategory, setEnterpriseSelectedCategory, enterpriseLoading, enterpriseError, enterpriseTotal, enterprisePage, loadEnterpriseSkills, handleEnterpriseSkillCardClick, handleInstallEnterpriseSkill, isEnterpriseSkillInstalling, isEnterpriseSkillInstalled, handleTrySkill, t } = data;
		const hasMore = enterpriseSkills.length < enterpriseTotal;
		const sentinelRef = useInfiniteScroll((0, import_react$12.useCallback)(() => {
			if (enterpriseLoading || !hasMore) return;
			loadEnterpriseSkills(enterprisePage + 1).catch(() => {});
		}, [
			enterpriseLoading,
			hasMore,
			loadEnterpriseSkills,
			enterprisePage
		]), hasMore && !enterpriseLoading);
		const categories = (0, import_react$12.useMemo)(() => enterpriseCategories, [enterpriseCategories]);
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "enterprise-skills-section",
			children: [categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "skillhub-filter-bar",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(ScrollList, {
					className: "skillhub-categories",
					gap: 6,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(CategoryChip, {
						label: t("skills.recommend.allTags"),
						active: !enterpriseSelectedCategory,
						onClick: () => setEnterpriseSelectedCategory("")
					}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(CategoryChip, {
						label: cat.name,
						active: enterpriseSelectedCategory === cat.id,
						onClick: () => setEnterpriseSelectedCategory(cat.id)
					}, cat.id))]
				})
			}), enterpriseError && !enterpriseLoading ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "skillhub-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("p", { children: t("skills.enterprise.empty") }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
					type: "button",
					className: "skillhub-retry-btn",
					onClick: () => loadEnterpriseSkills(1),
					children: t("skills.knot.retry")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "skills-grid",
					children: enterpriseLoading && enterpriseSkills.length === 0 ? Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillCardSkeleton, {}, `enterprise-skeleton-${i}`)) : displayEnterpriseSkills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(SkillCard, { ...enterpriseSkillToCardProps(skill, () => handleEnterpriseSkillCardClick(skill), () => handleInstallEnterpriseSkill(skill), isEnterpriseSkillInstalling(skill), isEnterpriseSkillInstalled(skill), () => handleTrySkill(skill.name, void 0, skill.display_name_zh || skill.display_name_en || skill.name)) }, skill.id))
				}),
				displayEnterpriseSkills.length === 0 && !enterpriseLoading && !enterpriseError && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "skills-empty",
					children: t("skills.enterprise.empty")
				}),
				hasMore && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					ref: sentinelRef,
					className: "skillhub-scroll-sentinel"
				})
			] })]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/tabs/index.ts
var init_tabs = __esmMin((() => {
	init_recommend_tab();
	init_skillhub_tab();
	init_plugins_tab();
	init_knot_tab();
	init_enterprise_tab();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/discover-tab-bar.tsx
var import_react$11, import_jsx_runtime$7, DiscoverTabBar;
var init_discover_tab_bar = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_icons();
	init_foundation();
	import_jsx_runtime$7 = require_jsx_runtime();
	DiscoverTabBar = ({ discoverTab, setDiscoverTab, t, showMcpButton, onMcpClick, isIOAUser = false, isDesktop = false, skillHubVisible = true, enterpriseVisible = false, enterpriseHasNewBadge = false, onEnterpriseTabSeen, hideInstalled = false, onHideInstalledChange }) => {
		const tabs = (0, import_react$11.useMemo)(() => {
			const list = ["recommend"];
			if (isDesktop && skillHubVisible) list.push("skillhub");
			list.push("plugins");
			if (isIOAUser && isDesktop) list.push("knot");
			if (enterpriseVisible) list.push("enterprise");
			return list;
		}, [
			isIOAUser,
			isDesktop,
			skillHubVisible,
			enterpriseVisible
		]);
		const handleClick = (tab) => {
			setDiscoverTab(tab);
			if (tab === "enterprise" && enterpriseHasNewBadge) onEnterpriseTabSeen?.();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "skills-segment-bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "skills-segment-group",
					children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("button", {
						type: "button",
						className: `skills-segment-item${discoverTab === tab ? " skills-segment-item--active" : ""}`,
						onClick: () => handleClick(tab),
						children: [t(`skills.tab.${tab}`), tab === "enterprise" && enterpriseHasNewBadge && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: "skills-segment-badge-new",
							"aria-label": "NEW"
						})]
					}, tab))
				}),
				showMcpButton && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("button", {
					type: "button",
					className: "skills-mcp-btn",
					onClick: onMcpClick,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(McpIcon, {
						width: 16,
						height: 16
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("mcp.title") })]
				}),
				onHideInstalledChange && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Checkbox$1, {
					className: "skills-hide-installed-checkbox",
					size: "small",
					checked: hideInstalled,
					onChange: (e) => onHideInstalledChange(e.target.checked),
					label: t("skills.filter.hideInstalled")
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/featured-section.tsx
var import_react$10, import_jsx_runtime$6, FeaturedSection;
var init_featured_section = __esmMin((() => {
	init_common();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_types();
	init_skill_card();
	init_skill_card_helpers();
	import_jsx_runtime$6 = require_jsx_runtime();
	FeaturedSection = ({ data }) => {
		const { builtinMarketCategories: categories, handleBuiltinMarketSkillCardClick: onSkillClick, handleInstallBuiltinMarketSkill: onInstall, getBuiltinMarketInstallBtnState, handleTrySkill, featuredSkills: apiFeaturedSkills, featuredLoading: apiFeaturedLoading, t } = data;
		const isEn = getLocale() === "en";
		const effectiveFeaturedSkills = apiFeaturedSkills;
		const gridRef = (0, import_react$10.useRef)(null);
		const [columns, setColumns] = (0, import_react$10.useState)(4);
		(0, import_react$10.useEffect)(() => {
			const el = gridRef.current;
			if (!el) return;
			const update = () => {
				const cols = window.getComputedStyle(el).getPropertyValue("grid-template-columns").split(" ").filter(Boolean).length;
				if (cols > 0) setColumns(cols);
			};
			update();
			const ro = new ResizeObserver(update);
			ro.observe(el);
			return () => ro.disconnect();
		}, []);
		const [featuredOffset, setFeaturedOffset] = (0, import_react$10.useState)(0);
		const displayFeatured = (0, import_react$10.useMemo)(() => {
			if (effectiveFeaturedSkills.length === 0) return [];
			const count = Math.min(columns, effectiveFeaturedSkills.length);
			const result = [];
			for (let i = 0; i < count; i++) result.push(effectiveFeaturedSkills[(featuredOffset + i) % effectiveFeaturedSkills.length]);
			return result;
		}, [
			effectiveFeaturedSkills,
			featuredOffset,
			columns
		]);
		const handleRefresh = (0, import_react$10.useCallback)(() => {
			setFeaturedOffset((prev) => prev + columns);
		}, [columns]);
		if (apiFeaturedLoading || displayFeatured.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: `skills-featured-section${displayFeatured.some((skill) => {
				const realReason = isEn ? skill.recommendation_en || skill.recommendation_zh : skill.recommendation_zh || skill.recommendation_en;
				return Boolean(realReason);
			}) ? " skills-featured-section--has-reasons" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: "skills-featured-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "skills-featured-title",
					children: t("skills.recommend.featured")
				}), effectiveFeaturedSkills.length > columns && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
					type: "button",
					className: "skills-featured-refresh-btn",
					onClick: handleRefresh,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", { d: "M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" })
					}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: t("skills.recommend.refresh") })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "skills-grid",
				ref: gridRef,
				children: displayFeatured.map((skill) => {
					const skillId = getBuiltinMarketSkillId(skill);
					const reasonLabel = isEn ? skill.recommendation_en || skill.recommendation_zh : skill.recommendation_zh || skill.recommendation_en;
					return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(SkillCard, {
						...builtinMarketSkillToCardProps(skill, categories, onSkillClick, onInstall, getBuiltinMarketInstallBtnState(skill), () => handleTrySkill(skill.name, pickLocalizedExamples(skill), getBuiltinMarketDisplayName(skill), getBuiltinMarketSkillId(skill))),
						reasonLabel
					}, `featured-${skillId}`);
				})
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/search-results.tsx
var import_react$9, import_jsx_runtime$5, SearchResults;
var init_search_results = __esmMin((() => {
	init_common();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_foundation();
	init_keyword_match();
	init_use_installed_lookup();
	init_types();
	init_skill_card();
	import_jsx_runtime$5 = require_jsx_runtime();
	SearchResults = ({ data, isIOAUser = false, skillHubVisible = true, searchTab, setSearchTab, autoSelectPendingRef, userPickedTabRef }) => {
		const { skillsSearch, isHubSearching, isKnotSearching, isBuiltinMarketSearching, recommendLoading, allMarketplacePluginsLoading, mergedSearchResults, builtinMarketSearchResults, builtinMarketCategories, featuredSkills, allMarketplacePlugins, recommendedSkills, installedSkills, installedPlugins, searchPartialFail, handleHubSkillCardClick, handleKnotSkillCardClick, handleBuiltinMarketSkillCardClick, handleSearchResultSkillClick, handleInstallHubSkill, handleInstallKnotSkill, handleInstallBuiltinMarketSkill, getBuiltinMarketInstallBtnState, handlePluginCardClick, handleInstallPlugin, handleSkillCardClick, handleToggleSkill, handleBatchUninstall, handleEditSkill, handleTrySkill, isHubSkillInstalling, isKnotSkillInstalling, isPluginInstalling, hideInstalled, setHideInstalled, enterpriseVisible, enterpriseSearchResults, isEnterpriseSearching, handleEnterpriseSkillCardClick, handleInstallEnterpriseSkill, isEnterpriseSkillInstalling, isEnterpriseSkillInstalled, t } = data;
		const handleSearchTabClick = (tab) => {
			userPickedTabRef.current = true;
			autoSelectPendingRef.current = false;
			setSearchTab(tab);
		};
		(0, import_react$9.useMemo)(() => {
			const map = /* @__PURE__ */ new Map();
			for (const s of recommendedSkills) map.set(s.name, {
				iconSource: s.iconSource,
				iconUrl: s.iconUrl
			});
			return map;
		}, [recommendedSkills]);
		const { findInstalledSkill, installedSkillHandlers } = useInstalledLookup({
			installedSkills,
			handleSkillCardClick,
			handleToggleSkill,
			handleBatchUninstall,
			handleEditSkill,
			handleTrySkill
		});
		const loading = isHubSearching || isKnotSearching || isBuiltinMarketSearching || isEnterpriseSearching || recommendLoading || allMarketplacePluginsLoading;
		const recommendResults = (0, import_react$9.useMemo)(() => {
			const keywordLower = skillsSearch.trim().toLowerCase();
			if (!keywordLower) return [];
			const matchKeyword = (s) => {
				return [
					s.name,
					s.description,
					s.description_zh,
					s.description_en,
					s.recommendation_zh,
					s.recommendation_en
				].some((v) => !!v && textMatchesKeyword(v.toLowerCase(), keywordLower));
			};
			const featuredMatched = featuredSkills.filter(matchKeyword);
			const seen = /* @__PURE__ */ new Set();
			const dedupKey = (s) => {
				return getBuiltinMarketSkillId(s) || (s.name || "").toLowerCase();
			};
			const result = [];
			for (const s of featuredMatched) {
				const key = dedupKey(s);
				if (!key || seen.has(key)) continue;
				seen.add(key);
				result.push(s);
			}
			for (const s of builtinMarketSearchResults) {
				const key = dedupKey(s);
				if (!key || seen.has(key)) continue;
				seen.add(key);
				result.push(s);
			}
			return result;
		}, [
			skillsSearch,
			featuredSkills,
			builtinMarketSearchResults
		]);
		const skillhubResults = (0, import_react$9.useMemo)(() => mergedSearchResults.filter((s) => s._source === "skillhub"), [mergedSearchResults]);
		const knotResults = (0, import_react$9.useMemo)(() => mergedSearchResults.filter((s) => s._source === "knot"), [mergedSearchResults]);
		const enterpriseResults = (0, import_react$9.useMemo)(() => {
			if (!hideInstalled) return enterpriseSearchResults;
			return enterpriseSearchResults.filter((s) => !isEnterpriseSkillInstalled(s));
		}, [
			enterpriseSearchResults,
			hideInstalled,
			isEnterpriseSkillInstalled
		]);
		const keyword = skillsSearch.trim().toLowerCase();
		const filteredMarketplacePlugins = (0, import_react$9.useMemo)(() => allMarketplacePlugins.filter((plugin) => {
			if (installedPlugins.some((installed) => installed.name === plugin.name && installed.marketplaceName === plugin.marketplaceName)) return false;
			const name = plugin.name.toLowerCase();
			const desc = plugin.description?.toLowerCase() ?? "";
			return textMatchesKeyword(name, keyword) || textMatchesKeyword(desc, keyword);
		}), [
			allMarketplacePlugins,
			installedPlugins,
			keyword
		]);
		const counts = {
			recommend: recommendResults.length,
			skillhub: skillhubResults.length,
			plugins: filteredMarketplacePlugins.length,
			knot: knotResults.length,
			enterprise: enterpriseResults.length
		};
		const hasResults = counts.recommend + (skillHubVisible ? counts.skillhub : 0) + counts.plugins + (isIOAUser ? counts.knot : 0) + (enterpriseVisible ? counts.enterprise : 0) > 0;
		const tabs = [
			"recommend",
			...skillHubVisible ? ["skillhub"] : [],
			"plugins",
			...isIOAUser ? ["knot"] : [],
			...enterpriseVisible ? ["enterprise"] : []
		];
		(0, import_react$9.useEffect)(() => {
			if (!autoSelectPendingRef.current) return;
			if (userPickedTabRef.current) {
				autoSelectPendingRef.current = false;
				return;
			}
			if (counts[searchTab] > 0) {
				autoSelectPendingRef.current = false;
				return;
			}
			const firstHit = tabs.find((tab) => counts[tab] > 0);
			if (firstHit) {
				setSearchTab(firstHit);
				autoSelectPendingRef.current = false;
			}
		}, [
			searchTab,
			isIOAUser,
			skillHubVisible,
			enterpriseVisible,
			counts.recommend,
			counts.skillhub,
			counts.plugins,
			counts.knot,
			counts.enterprise
		]);
		const renderTabContent = () => {
			switch (searchTab) {
				case "recommend": return recommendResults.map((skill, index) => {
					const installedHit = findInstalledSkill([
						skill.name,
						getBuiltinMarketSkillId(skill),
						skill.id,
						skill.skill_id
					], ["builtin-market", "marketplace"]);
					if (installedHit) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, { ...installedSkillToCardProps({
						skill: installedHit,
						enabled: !installedHit.disable,
						showInstalledIndicator: true,
						downloads: skill.downloads,
						stars: skill.stars,
						...installedSkillHandlers
					}) }, `recommend-installed-${installedHit.filePath}-${index}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, { ...builtinMarketSkillToCardProps(skill, builtinMarketCategories, handleBuiltinMarketSkillCardClick, handleInstallBuiltinMarketSkill, getBuiltinMarketInstallBtnState(skill)) }, `recommend-${skill.id || skill.skill_id || skill.name}-${index}`);
				});
				case "skillhub": return skillhubResults.map((skill, index) => {
					const installedHit = findInstalledSkill([skill.slug, skill.name], "skillhub");
					if (installedHit) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, {
						...installedSkillToCardProps({
							skill: installedHit,
							enabled: !installedHit.disable,
							showInstalledIndicator: true,
							downloads: skill.downloads,
							stars: skill.stars,
							...installedSkillHandlers
						}),
						skillSource: skill.slug
					}, `skillhub-installed-${installedHit.filePath}-${index}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, {
						...hubSkillToCardProps(skill, handleHubSkillCardClick, () => handleInstallHubSkill(skill), true, t, isHubSkillInstalling(skill.slug)),
						skillSource: skill.slug
					}, `skillhub-${skill.slug || skill.name}-${index}`);
				});
				case "plugins": return filteredMarketplacePlugins.map((plugin) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, { ...pluginToCardProps(plugin, handlePluginCardClick, t("skills.tab.plugins"), () => handleInstallPlugin(plugin, "user"), isPluginInstalling(plugin.name, plugin.marketplaceName)) }, `search-plugin-${plugin.marketplaceName}/${plugin.name}`));
				case "knot": return knotResults.map((skill, index) => {
					const installedHit = findInstalledSkill([skill.slug, skill.name], "knot");
					if (installedHit) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, {
						...installedSkillToCardProps({
							skill: installedHit,
							enabled: !installedHit.disable,
							showInstalledIndicator: true,
							downloads: skill.downloads,
							stars: skill.stars,
							...installedSkillHandlers
						}),
						skillSource: skill.slug
					}, `knot-installed-${installedHit.filePath}-${index}`);
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, {
						...hubSkillToCardProps(skill, handleKnotSkillCardClick, () => handleInstallKnotSkill(skill), true, t, isKnotSkillInstalling(skill.slug)),
						skillSource: skill.slug
					}, `knot-${skill.slug || skill.name}-${index}`);
				});
				case "enterprise": return enterpriseResults.map((skill) => {
					const rawIcon = (skill.icon_url || "").trim();
					const iconUrl = /^https?:\/\//i.test(rawIcon) ? rawIcon : void 0;
					const displayName = skill.display_name_zh || skill.display_name_en || skill.name;
					const isInstalled = isEnterpriseSkillInstalled(skill);
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCard, {
						name: displayName,
						description: skill.description_zh,
						descriptionEn: skill.description_en,
						sourceLabel: t("skills.enterprise.tag"),
						showSource: true,
						useAvatar: true,
						skillIconUrl: iconUrl,
						onCardClick: () => handleEnterpriseSkillCardClick(skill),
						onInstall: () => handleInstallEnterpriseSkill(skill),
						isInstalling: isEnterpriseSkillInstalling(skill),
						isInstalled,
						onTryNow: isInstalled ? () => handleTrySkill(skill.name, void 0, displayName) : void 0
					}, `enterprise-${skill.id}`);
				});
				default: return null;
			}
		};
		const currentTabCount = counts[searchTab];
		const showSkeleton = loading && !hasResults;
		const showTabEmpty = !loading && hasResults && currentTabCount === 0;
		const showGlobalEmpty = !loading && !hasResults;
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "skillhub-section",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "skills-segment-bar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "skills-segment-group",
						children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
							type: "button",
							className: `skills-segment-item${searchTab === tab ? " skills-segment-item--active" : ""}`,
							onClick: () => handleSearchTabClick(tab),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: t(`skills.tab.${tab}`) }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "skills-installed-pill-badge",
								children: counts[tab]
							})]
						}, tab))
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Checkbox$1, {
						className: "skills-hide-installed-checkbox",
						size: "small",
						checked: hideInstalled,
						onChange: (e) => setHideInstalled(e.target.checked),
						label: t("skills.filter.hideInstalled")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "skills-grid",
					children: showSkeleton ? Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(SkillCardSkeleton, {}, `search-skeleton-${i}`)) : renderTabContent()
				}),
				showTabEmpty && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "skills-empty",
					children: t("skills.search.tabEmpty")
				}),
				showGlobalEmpty && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "skills-empty",
					children: t("skills.skillhub.searchEmpty")
				}),
				searchPartialFail && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "skills-partial-fail",
					children: t("skills.search.partialFail")
				})
			]
		});
	};
})), import_jsx_runtime$4, TabContent, DiscoverSection;
var init_discover_section = __esmMin((() => {
	require_react();
	init_product_features();
	init_environment();
	init_hooks();
	init_tabs();
	init_discover_tab_bar();
	init_featured_section();
	init_search_results();
	import_jsx_runtime$4 = require_jsx_runtime();
	TabContent = ({ discoverTab, recommendLoading, pluginsInitialized, data, contentRef, minHeight, skillHubVisible }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		ref: contentRef,
		style: { minHeight },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: `skills-discover-section${discoverTab === "recommend" && !recommendLoading ? " skills-discover-section--ready" : ""}`,
				style: { display: discoverTab === "recommend" ? void 0 : "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(RecommendTab, { data })
			}),
			skillHubVisible && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "skillhub-section",
				style: { display: discoverTab === "skillhub" ? void 0 : "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(SkillhubTab, { data })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "skillhub-section",
				style: { display: discoverTab === "knot" ? void 0 : "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(KnotTab, { data })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: `skills-discover-section plugins-section${pluginsInitialized ? " skills-discover-section--ready" : ""}`,
				style: { display: discoverTab === "plugins" ? void 0 : "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(PluginsTab, { data })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "skillhub-section",
				style: { display: discoverTab === "enterprise" ? void 0 : "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(EnterpriseTab, { data })
			})
		]
	});
	DiscoverSection = ({ data, showMcpButton, onMcpClick, isIOAUser, onOpenExternal, searchTab, setSearchTab, autoSelectPendingRef, userPickedTabRef }) => {
		const { discoverTab, setDiscoverTab, skillsSearch, recommendLoading, pluginsInitialized, t } = data;
		const isDesktop = isWorkBuddyDesktop();
		const skillHubVisible = useSkillHubFeature() !== false;
		const isSearching = !!skillsSearch.trim();
		const { containerRef: contentRef, minHeight: contentMinHeight, wrapWithLock } = useMinHeightLock();
		const handleTabChange = wrapWithLock(setDiscoverTab);
		if (isSearching) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(SearchResults, {
			data,
			isIOAUser,
			skillHubVisible,
			searchTab,
			setSearchTab,
			autoSelectPendingRef,
			userPickedTabRef
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FeaturedSection, { data }),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DiscoverTabBar, {
				discoverTab,
				setDiscoverTab: handleTabChange,
				t,
				showMcpButton,
				onMcpClick,
				isIOAUser,
				isDesktop,
				skillHubVisible,
				onOpenExternal,
				enterpriseVisible: data.enterpriseVisible,
				enterpriseHasNewBadge: data.enterpriseHasNewBadge,
				onEnterpriseTabSeen: data.markEnterpriseTabSeen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TabContent, {
				discoverTab,
				recommendLoading,
				pluginsInitialized,
				data,
				contentRef,
				minHeight: contentMinHeight,
				skillHubVisible
			})
		] });
	};
})), import_jsx_runtime$3, BatchHeader, InstalledTitleRow;
var init_installed_header = __esmMin((() => {
	require_react();
	init_skills_icons();
	import_jsx_runtime$3 = require_jsx_runtime();
	BatchHeader = ({ totalSelectedCount, onSelectAll, onDeselectAll, onBatchAction, onExit, isBatchActionInProgress = false, t }) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "skills-batch-toolbar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "skills-batch-toolbar-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "skills-batch-selected",
					children: t("skills.batch.selected", { count: String(totalSelectedCount) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					type: "button",
					className: "skills-batch-select-all",
					onClick: onSelectAll,
					disabled: isBatchActionInProgress,
					children: t("skills.batch.selectAll")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					type: "button",
					className: "skills-batch-select-all",
					onClick: onDeselectAll,
					disabled: totalSelectedCount === 0 || isBatchActionInProgress,
					children: t("skills.batch.deselectAll")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "skills-batch-toolbar-right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
					type: "button",
					className: "skills-batch-action-btn",
					onClick: () => onBatchAction("enable"),
					disabled: totalSelectedCount === 0 || isBatchActionInProgress,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CheckCircleIcon, {}), t("skills.batch.enable")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
					type: "button",
					className: "skills-batch-action-btn",
					onClick: () => onBatchAction("disable"),
					disabled: totalSelectedCount === 0 || isBatchActionInProgress,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CloseCircleIcon, {}), t("skills.batch.disable")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
					type: "button",
					className: "skills-batch-action-btn skills-batch-action-btn--danger",
					onClick: () => onBatchAction("uninstall"),
					disabled: totalSelectedCount === 0 || isBatchActionInProgress,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(TrashIcon, {}), t("skills.batch.uninstall")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
					type: "button",
					className: "skills-batch-action-btn skills-batch-action-btn--cancel",
					onClick: onExit,
					children: t("common.cancel")
				})
			]
		})]
	});
	InstalledTitleRow = ({ totalInstalledCount, isBatchMode, batchHeaderProps }) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_jsx_runtime$3.Fragment, { children: isBatchMode && totalInstalledCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(BatchHeader, { ...batchHeaderProps }) });
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/installed-list.tsx
var import_react$6, import_jsx_runtime$2, InstalledList;
var init_installed_list = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_types();
	init_skill_card();
	import_jsx_runtime$2 = require_jsx_runtime();
	InstalledList = ({ visibleSkills, visiblePlugins, sortedOrder, isBatchMode, selectedSkills, selectedPlugins, handleSkillCardClick, handleToggleSkill, handleInstallHubSkill, handleUpdateHubSkill, handleUpdateKnotSkill, handleToggleSelect, getInstalledHubSkillUpdate, getInstalledKnotSkillUpdate, getMarketplaceSkillUpdate, handleUpdateMarketplaceSkill, handlePluginCardClick, handleToggleInstalledPlugin, handleToggleSelectPlugin, handleUninstallSkill, handleEditSkill, handleTrySkill, handleUninstallPlugin, t, installedGridRef, skillRiskMap, isSearchMode = false, pinnedMap, onTogglePin }) => {
		const skillsMap = (0, import_react$6.useMemo)(() => {
			const map = /* @__PURE__ */ new Map();
			for (const skill of visibleSkills) map.set(skill.filePath, skill);
			return map;
		}, [visibleSkills]);
		const pluginsMap = (0, import_react$6.useMemo)(() => {
			const map = /* @__PURE__ */ new Map();
			for (const plugin of visiblePlugins) {
				const key = `plugin-${plugin.marketplaceName}/${plugin.name}`;
				map.set(key, plugin);
			}
			return map;
		}, [visiblePlugins]);
		const renderItem = (key) => {
			const skill = skillsMap.get(key);
			if (skill) {
				const enabled = !skill.disable;
				const hubUpdateInfo = getInstalledHubSkillUpdate(skill);
				const knotUpdateInfo = getInstalledKnotSkillUpdate(skill);
				const marketplaceUpdateInfo = getMarketplaceSkillUpdate(skill);
				const showUpdate = hubUpdateInfo.hasUpdate || hubUpdateInfo.isUpdating || knotUpdateInfo.hasUpdate || knotUpdateInfo.isUpdating || marketplaceUpdateInfo.hasUpdate || marketplaceUpdateInfo.isUpdating;
				const isUpdating = hubUpdateInfo.isUpdating || knotUpdateInfo.isUpdating || marketplaceUpdateInfo.isUpdating;
				const isSelected = selectedSkills.has(skill.filePath);
				const handleUpdate = () => {
					if (hubUpdateInfo.hasUpdate || hubUpdateInfo.isUpdating) handleUpdateHubSkill(hubUpdateInfo.hubSkill ?? {
						slug: hubUpdateInfo.slug,
						name: skill.name,
						version: hubUpdateInfo.remoteVersion
					});
					else if (knotUpdateInfo.hasUpdate || knotUpdateInfo.isUpdating) {
						if (knotUpdateInfo.knotSkill) handleUpdateKnotSkill(knotUpdateInfo.knotSkill);
					} else if (marketplaceUpdateInfo.hasUpdate || marketplaceUpdateInfo.isUpdating) handleUpdateMarketplaceSkill(skill);
				};
				return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SkillCard, { ...installedSkillToCardProps({
					skill,
					onCardClick: handleSkillCardClick,
					onToggleSkill: handleToggleSkill,
					enabled,
					isBatchMode,
					isSelected,
					onToggleSelect: () => handleToggleSelect(skill.filePath),
					showUpdate,
					isUpdating,
					onUpdate: handleUpdate,
					updateLabels: {
						default: t("skills.skillhub.updateAvailable"),
						hover: t("skills.skillhub.updatable"),
						updating: t("skills.skillhub.updating")
					},
					riskResult: skillRiskMap?.get(skill.filePath),
					onUninstallSkill: handleUninstallSkill,
					onEditSkill: handleEditSkill,
					onTryNow: !isSearchMode && handleTrySkill ? (skill) => handleTrySkill(skill.name, pickLocalizedExamples(skill), skill.name, skill.skillId) : void 0,
					showInstalledIndicator: isSearchMode,
					pinned: !!pinnedMap?.[skill.filePath],
					onTogglePin: onTogglePin ? (next) => onTogglePin(skill.filePath, next) : void 0,
					installedListMode: !isSearchMode
				}) }, skill.filePath);
			}
			const plugin = pluginsMap.get(key);
			if (plugin) {
				const isPluginEnabled = plugin.installedScopesStatus ? Object.values(plugin.installedScopesStatus).some((status) => status === true) : plugin.status === "enabled";
				const pluginKey = `${plugin.marketplaceName}/${plugin.name}`;
				const isPluginSelected = selectedPlugins.has(pluginKey);
				const pluginPinKey = `plugin-${pluginKey}`;
				return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SkillCard, { ...installedPluginToCardProps({
					plugin,
					onCardClick: handlePluginCardClick,
					onTogglePlugin: handleToggleInstalledPlugin,
					enabled: isPluginEnabled,
					badgeText: t("skills.tab.plugins"),
					isBatchMode,
					isSelected: isPluginSelected,
					onToggleSelect: () => handleToggleSelectPlugin(pluginKey),
					onUninstallPlugin: handleUninstallPlugin,
					showInstalledIndicator: isSearchMode,
					pinned: !!pinnedMap?.[pluginPinKey],
					onTogglePin: onTogglePin ? (next) => onTogglePin(pluginPinKey, next) : void 0,
					installedListMode: !isSearchMode
				}) }, `plugin-${pluginKey}`);
			}
			return null;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "skills-grid",
			ref: installedGridRef,
			children: sortedOrder.map(renderItem)
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/use-batch-selection.ts
/**
* Hook for managing batch selection state and operations
*/
function useBatchSelection({ filteredInstalledSkills, displayPlugins, handleBatchUninstall, handleBatchToggle, handleBatchUninstallPlugins, handleBatchTogglePlugins }) {
	const [isBatchMode, setIsBatchMode] = (0, import_react$5.useState)(false);
	const [selectedSkills, setSelectedSkills] = (0, import_react$5.useState)(/* @__PURE__ */ new Set());
	const [selectedPlugins, setSelectedPlugins] = (0, import_react$5.useState)(/* @__PURE__ */ new Set());
	const [isUninstallConfirmVisible, setIsUninstallConfirmVisible] = (0, import_react$5.useState)(false);
	const [isBatchActionInProgress, setIsBatchActionInProgress] = (0, import_react$5.useState)(false);
	const inProgressRef = (0, import_react$5.useRef)(false);
	(0, import_react$5.useEffect)(() => {
		if (filteredInstalledSkills.length === 0 && displayPlugins.length === 0 && isBatchMode) {
			setIsBatchMode(false);
			setSelectedSkills(/* @__PURE__ */ new Set());
			setSelectedPlugins(/* @__PURE__ */ new Set());
			setIsUninstallConfirmVisible(false);
		}
	}, [
		filteredInstalledSkills.length,
		displayPlugins.length,
		isBatchMode
	]);
	const handleEnterBatchMode = (0, import_react$5.useCallback)(() => {
		setIsBatchMode(true);
		setSelectedSkills(/* @__PURE__ */ new Set());
		setSelectedPlugins(/* @__PURE__ */ new Set());
		setIsUninstallConfirmVisible(false);
	}, []);
	const handleExitBatchMode = (0, import_react$5.useCallback)(() => {
		setIsBatchMode(false);
		setSelectedSkills(/* @__PURE__ */ new Set());
		setSelectedPlugins(/* @__PURE__ */ new Set());
		setIsUninstallConfirmVisible(false);
	}, []);
	const handleSelectAll = (0, import_react$5.useCallback)(() => {
		const allSkillPaths = new Set(filteredInstalledSkills.map((s) => s.filePath));
		const allPluginKeys = new Set(displayPlugins.map((p) => `${p.marketplaceName}/${p.name}`));
		setSelectedSkills(allSkillPaths);
		setSelectedPlugins(allPluginKeys);
	}, [filteredInstalledSkills, displayPlugins]);
	const handleDeselectAll = (0, import_react$5.useCallback)(() => {
		setSelectedSkills(/* @__PURE__ */ new Set());
		setSelectedPlugins(/* @__PURE__ */ new Set());
	}, []);
	const handleToggleSelect = (0, import_react$5.useCallback)((filePath) => {
		setSelectedSkills((prev) => {
			const next = new Set(prev);
			if (next.has(filePath)) next.delete(filePath);
			else next.add(filePath);
			return next;
		});
	}, []);
	const handleToggleSelectPlugin = (0, import_react$5.useCallback)((pluginKey) => {
		setSelectedPlugins((prev) => {
			const next = new Set(prev);
			if (next.has(pluginKey)) next.delete(pluginKey);
			else next.add(pluginKey);
			return next;
		});
	}, []);
	const handleBatchAction = (0, import_react$5.useCallback)(async (action) => {
		if (inProgressRef.current) return;
		const selectedSkillList = filteredInstalledSkills.filter((s) => selectedSkills.has(s.filePath));
		const selectedPluginList = displayPlugins.filter((p) => selectedPlugins.has(`${p.marketplaceName}/${p.name}`));
		if (selectedSkillList.length === 0 && selectedPluginList.length === 0) return;
		inProgressRef.current = true;
		setIsBatchActionInProgress(true);
		try {
			if (selectedSkillList.length > 0) if (action === "uninstall") await handleBatchUninstall(selectedSkillList);
			else await handleBatchToggle(selectedSkillList, action === "enable");
			if (selectedPluginList.length > 0) if (action === "uninstall") await handleBatchUninstallPlugins(selectedPluginList);
			else await handleBatchTogglePlugins(selectedPluginList, action === "enable");
			setSelectedSkills(/* @__PURE__ */ new Set());
			setSelectedPlugins(/* @__PURE__ */ new Set());
		} finally {
			inProgressRef.current = false;
			setIsBatchActionInProgress(false);
		}
	}, [
		filteredInstalledSkills,
		displayPlugins,
		selectedSkills,
		selectedPlugins,
		handleBatchUninstall,
		handleBatchToggle,
		handleBatchUninstallPlugins,
		handleBatchTogglePlugins
	]);
	/**
	* 请求批量操作。
	* - `uninstall`：仅当存在已选项时弹出二次确认弹窗，确认后由 `confirmBatchUninstall` 真正执行；
	* - `enable` / `disable`：保持原有立即执行行为，无需二次确认。
	*/
	const requestBatchAction = (0, import_react$5.useCallback)((action) => {
		if (inProgressRef.current) return;
		if (action === "uninstall") {
			if (selectedSkills.size === 0 && selectedPlugins.size === 0) return;
			setIsUninstallConfirmVisible(true);
			return;
		}
		handleBatchAction(action).catch((err) => {
			console.error("[useBatchSelection] batch action failed", err);
		});
	}, [
		handleBatchAction,
		selectedSkills,
		selectedPlugins
	]);
	const cancelBatchUninstall = (0, import_react$5.useCallback)(() => {
		setIsUninstallConfirmVisible(false);
	}, []);
	const confirmBatchUninstall = (0, import_react$5.useCallback)(async () => {
		setIsUninstallConfirmVisible(false);
		await handleBatchAction("uninstall");
	}, [handleBatchAction]);
	return {
		isBatchMode,
		selectedSkills,
		selectedPlugins,
		totalSelectedCount: selectedSkills.size + selectedPlugins.size,
		isBatchActionInProgress,
		handleEnterBatchMode,
		handleExitBatchMode,
		handleSelectAll,
		handleDeselectAll,
		handleToggleSelect,
		handleToggleSelectPlugin,
		requestBatchAction,
		isUninstallConfirmVisible,
		cancelBatchUninstall,
		confirmBatchUninstall
	};
}
var import_react$5;
var init_use_batch_selection = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/installed-section.tsx
/** Check if a skill is disabled */
function isSkillDisabled(skill) {
	return !!skill.disable;
}
/** Check if a plugin is disabled based on its status */
function isPluginDisabled(plugin) {
	if (plugin.installedScopesStatus) return Object.values(plugin.installedScopesStatus).every((status) => status === false);
	return plugin.status === "disabled";
}
/**
* Merge skills and plugins into a single list sorted by (in order):
* 1. Pinned items (按 pinnedAt 倒序，**不区分启用/禁用**——置顶项整体上浮)
* 2. Non-pinned enabled items（按 installedAt 倒序）
* 3. Non-pinned disabled items（按 installedAt 倒序）
*
* 置顶项不再下沉到 disabled 末段——这是用户期望"置顶"的语义（置顶 = 始终在最前）。
*
* @param pinnedMap key -> pinnedAt(ms)；key 形态与 getItemKey 完全一致
*                  （skill.filePath / `plugin-${marketplace}/${name}`），未传则按全部未置顶处理
*/
function getMergedAndSortedItems(skills, plugins, pinnedMap) {
	const pinnedItems = [];
	const enabledItems = [];
	const disabledItems = [];
	const isItemPinned = (key) => pinnedMap?.[key];
	for (const skill of skills) {
		const base = {
			type: "skill",
			item: skill,
			installedAt: skill.installedAt ?? 0,
			disabled: isSkillDisabled(skill)
		};
		const pinnedAt = isItemPinned(skill.filePath);
		if (pinnedAt !== void 0) {
			pinnedItems.push({
				...base,
				pinnedAt
			});
			continue;
		}
		if (base.disabled) disabledItems.push(base);
		else enabledItems.push(base);
	}
	for (const plugin of plugins) {
		const base = {
			type: "plugin",
			item: plugin,
			installedAt: getPluginInstalledAt(plugin.name, plugin.marketplaceName),
			disabled: isPluginDisabled(plugin)
		};
		const pinnedAt = isItemPinned(`plugin-${plugin.marketplaceName}/${plugin.name}`);
		if (pinnedAt !== void 0) {
			pinnedItems.push({
				...base,
				pinnedAt
			});
			continue;
		}
		if (base.disabled) disabledItems.push(base);
		else enabledItems.push(base);
	}
	pinnedItems.sort((a, b) => b.pinnedAt - a.pinnedAt);
	enabledItems.sort((a, b) => b.installedAt - a.installedAt);
	disabledItems.sort((a, b) => b.installedAt - a.installedAt);
	return [
		...pinnedItems,
		...enabledItems,
		...disabledItems
	];
}
/** Get item key for stable ordering */
function getItemKey(item) {
	if (item.type === "skill") return item.item.filePath;
	return `plugin-${item.item.marketplaceName}/${item.item.name}`;
}
/**
* Calculate visible items using a stable sort order.
* Items are ordered according to stableOrder, with new items added at appropriate positions.
* Returns fullSortedOrder so caller can update the stable order ref.
*/
function getVisibleItemsWithStableOrder(allSkills, allPlugins, visibleCount, stableOrder) {
	const skillsMap = /* @__PURE__ */ new Map();
	for (const skill of allSkills) skillsMap.set(skill.filePath, skill);
	const pluginsMap = /* @__PURE__ */ new Map();
	for (const plugin of allPlugins) {
		const key = `plugin-${plugin.marketplaceName}/${plugin.name}`;
		pluginsMap.set(key, plugin);
	}
	const currentKeys = new Set([...skillsMap.keys(), ...pluginsMap.keys()]);
	const finalOrder = [];
	for (const key of stableOrder) if (currentKeys.has(key)) {
		finalOrder.push(key);
		currentKeys.delete(key);
	}
	const newItems = [];
	for (const key of currentKeys) if (key.startsWith("plugin-")) {
		const plugin = pluginsMap.get(key);
		if (plugin) newItems.push({
			key,
			installedAt: getPluginInstalledAt(plugin.name, plugin.marketplaceName)
		});
	} else {
		const skill = skillsMap.get(key);
		if (skill) newItems.push({
			key,
			installedAt: skill.installedAt ?? 0
		});
	}
	newItems.sort((a, b) => b.installedAt - a.installedAt);
	finalOrder.unshift(...newItems.map((item) => item.key));
	const fullSortedOrder = [...finalOrder];
	const totalCount = finalOrder.length;
	const itemsToShow = finalOrder.slice(0, visibleCount);
	const visibleSkills = [];
	const visiblePlugins = [];
	const sortedOrder = [];
	for (const key of itemsToShow) if (key.startsWith("plugin-")) {
		const plugin = pluginsMap.get(key);
		if (plugin) {
			visiblePlugins.push(plugin);
			sortedOrder.push(key);
		}
	} else {
		const skill = skillsMap.get(key);
		if (skill) {
			visibleSkills.push(skill);
			sortedOrder.push(key);
		}
	}
	return {
		visibleSkills,
		visiblePlugins,
		sortedOrder,
		fullSortedOrder,
		totalCount
	};
}
/**
* Calculate visible items with fresh sorting (used when initializing or resetting)
*/
function getVisibleItemsWithFreshSort(allSkills, allPlugins, visibleCount, pinnedMap) {
	const mergedItems = getMergedAndSortedItems(allSkills, allPlugins, pinnedMap);
	const fullSortedOrder = mergedItems.map(getItemKey);
	const totalCount = mergedItems.length;
	const itemsToShow = mergedItems.slice(0, visibleCount);
	const visibleSkills = [];
	const visiblePlugins = [];
	const sortedOrder = [];
	for (const entry of itemsToShow) if (entry.type === "skill") {
		visibleSkills.push(entry.item);
		sortedOrder.push(entry.item.filePath);
	} else {
		visiblePlugins.push(entry.item);
		sortedOrder.push(`plugin-${entry.item.marketplaceName}/${entry.item.name}`);
	}
	return {
		visibleSkills,
		visiblePlugins,
		sortedOrder,
		fullSortedOrder,
		totalCount
	};
}
function useScrollLoad(onLoadMore, enabled, scrollRoot) {
	const [sentinelEl, setSentinelEl] = (0, import_react$4.useState)(null);
	const onLoadMoreRef = (0, import_react$4.useRef)(onLoadMore);
	(0, import_react$4.useEffect)(() => {
		onLoadMoreRef.current = onLoadMore;
	}, [onLoadMore]);
	(0, import_react$4.useEffect)(() => {
		if (!enabled) return;
		const root = scrollRoot?.current ?? null;
		let observer;
		if (sentinelEl) {
			observer = new IntersectionObserver((entries) => {
				if (entries[0]?.isIntersecting) onLoadMoreRef.current();
			}, {
				root,
				rootMargin: "200px"
			});
			observer.observe(sentinelEl);
		}
		const onScroll = () => {
			if (!root) return;
			if (root.scrollHeight - (root.scrollTop + root.clientHeight) < 200) onLoadMoreRef.current();
		};
		if (root) root.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			observer?.disconnect();
			if (root) root.removeEventListener("scroll", onScroll);
		};
	}, [
		sentinelEl,
		enabled,
		scrollRoot
	]);
	return (0, import_react$4.useCallback)((node) => {
		setSentinelEl(node);
	}, []);
}
var import_react$4, import_jsx_runtime$1, SCROLL_BATCH_SIZE, InstalledSection;
var init_installed_section = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useTheme();
	init_hooks();
	init_types();
	init_batch_uninstall_confirm_modal();
	init_installed_header();
	init_installed_list();
	init_skill_card();
	init_skills_icons();
	init_use_batch_selection();
	import_jsx_runtime$1 = require_jsx_runtime();
	SCROLL_BATCH_SIZE = 100;
	InstalledSection = ({ data, resetSortOrder, scrollRef, subPage }) => {
		const { installedSkills, installedLoading, filteredInstalledSkills, installedGridRef, defaultVisibleCount, handleSkillCardClick, handleToggleSkill, handleInstallHubSkill, handleUpdateHubSkill, handleUpdateKnotSkill, handleBatchUninstall, handleBatchToggle, handleEditSkill, handleTrySkill, getInstalledHubSkillUpdate, getInstalledKnotSkillUpdate, getMarketplaceSkillUpdate, handleUpdateMarketplaceSkill, skillsSearch, installedPlugins, filteredInstalledPlugins, pluginsLoading, handlePluginCardClick, handleToggleInstalledPlugin, handleBatchUninstallPlugins, handleBatchTogglePlugins, skillRiskMap, t } = data;
		const { theme: appTheme } = useTheme();
		const dialogTheme = appTheme === "dark" ? "dark" : "light";
		const totalInstalledCount = installedSkills.length + installedPlugins.length;
		const enabledCount = (0, import_react$4.useMemo)(() => {
			return installedSkills.filter((s) => !isSkillDisabled(s)).length + installedPlugins.filter((p) => !isPluginDisabled(p)).length;
		}, [installedSkills, installedPlugins]);
		const isLoading = installedLoading || pluginsLoading;
		const ignoreSearch = !!subPage;
		const isSearchMode = !ignoreSearch && !!skillsSearch.trim();
		const displaySkills = ignoreSearch ? installedSkills : filteredInstalledSkills;
		const displayPlugins = isSearchMode ? filteredInstalledPlugins : installedPlugins;
		const [warningDismissed, setWarningDismissed] = (0, import_react$4.useState)(() => {
			try {
				return localStorage.getItem(SKILLS_WARNING_DISMISSED_KEY) === "1";
			} catch {
				return false;
			}
		});
		(0, import_react$4.useEffect)(() => {
			if (enabledCount <= 80 && warningDismissed) {
				setWarningDismissed(false);
				try {
					localStorage.removeItem(SKILLS_WARNING_DISMISSED_KEY);
				} catch {}
			}
		}, [enabledCount, warningDismissed]);
		const handleDismissWarning = (0, import_react$4.useCallback)(() => {
			setWarningDismissed(true);
			try {
				localStorage.setItem(SKILLS_WARNING_DISMISSED_KEY, "1");
			} catch {}
		}, []);
		const showWarningBanner = enabledCount > 80 && !warningDismissed;
		const [visibleCount, setVisibleCount] = (0, import_react$4.useState)(defaultVisibleCount);
		(0, import_react$4.useEffect)(() => {
			setVisibleCount((prev) => Math.max(prev, defaultVisibleCount));
		}, [defaultVisibleCount]);
		(0, import_react$4.useEffect)(() => {
			setVisibleCount(defaultVisibleCount);
		}, [skillsSearch]);
		const stableSortOrderRef = (0, import_react$4.useRef)([]);
		const hasUserOperatedRef = (0, import_react$4.useRef)(false);
		const wrappedHandleToggleSkill = import_react$4.useCallback((filePath, enabled) => {
			hasUserOperatedRef.current = true;
			handleToggleSkill(filePath, enabled);
		}, [handleToggleSkill]);
		const wrappedHandleToggleInstalledPlugin = import_react$4.useCallback((plugin, enabled) => {
			hasUserOperatedRef.current = true;
			handleToggleInstalledPlugin(plugin, enabled);
		}, [handleToggleInstalledPlugin]);
		const { pinnedMap, togglePin } = usePinnedInstalled();
		/**
		* 包装 togglePin —— 用户操作"置顶/取消置顶"时必须**强制重排**：
		*   - 置顶：项目必须从原位置上浮到最前
		*   - 取消置顶：项目必须从置顶组下沉到普通启用/禁用组
		*
		* 但当前 useMemo 在 `hasUserOperatedRef.current === true` 且 stableSortOrderRef 已存在时
		* 会走 stable 路径——stable 路径只让"新增项"上浮，不重新排序"已存在项"，会把刚置顶的项
		* 卡在原位置不动。
		*
		* 解决：togglePin 时清空 stableSortOrderRef → 下一帧 useMemo 重新走 fresh sort，
		* 排序结果会带上最新的 pinnedMap 分组。
		*
		* 不把 hasUserOperatedRef 一起改成 false，是因为"是否被用户改过"用于"resetSortOrder
		* 时是否还要重新排序" 的语义（详见上面 wrappedHandleToggleSkill 的设计），与 pin 操作无关。
		*/
		const wrappedTogglePin = import_react$4.useCallback((key, next) => {
			stableSortOrderRef.current = [];
			togglePin(key, next);
		}, [togglePin]);
		const batch = useBatchSelection({
			filteredInstalledSkills: displaySkills,
			displayPlugins,
			handleBatchUninstall,
			handleBatchToggle,
			handleBatchUninstallPlugins,
			handleBatchTogglePlugins
		});
		const handleUninstallSingleSkill = (0, import_react$4.useCallback)((skill) => {
			handleBatchUninstall([skill]);
		}, [handleBatchUninstall]);
		const handleUninstallSinglePlugin = (0, import_react$4.useCallback)((plugin) => {
			handleBatchUninstallPlugins([plugin]);
		}, [handleBatchUninstallPlugins]);
		const { visibleSkills, visiblePlugins, sortedOrder, fullSortedOrder, totalCount } = (0, import_react$4.useMemo)(() => {
			if (isSearchMode) return {
				...getVisibleItemsWithFreshSort(displaySkills, displayPlugins, visibleCount, pinnedMap),
				fullSortedOrder: stableSortOrderRef.current
			};
			const hasData = displaySkills.length > 0 || displayPlugins.length > 0;
			if (resetSortOrder && !hasUserOperatedRef.current || stableSortOrderRef.current.length === 0) {
				if (!hasData) return {
					visibleSkills: [],
					visiblePlugins: [],
					sortedOrder: [],
					fullSortedOrder: [],
					totalCount: 0
				};
				const result = getVisibleItemsWithFreshSort(displaySkills, displayPlugins, visibleCount, pinnedMap);
				stableSortOrderRef.current = result.fullSortedOrder;
				return result;
			}
			if (!hasData) return {
				visibleSkills: [],
				visiblePlugins: [],
				sortedOrder: [],
				fullSortedOrder: stableSortOrderRef.current,
				totalCount: 0
			};
			return getVisibleItemsWithStableOrder(displaySkills, displayPlugins, visibleCount, stableSortOrderRef.current);
		}, [
			displaySkills,
			displayPlugins,
			visibleCount,
			isSearchMode,
			resetSortOrder,
			pinnedMap
		]);
		(0, import_react$4.useEffect)(() => {
			if (!isSearchMode && fullSortedOrder.length > 0) stableSortOrderRef.current = fullSortedOrder;
		}, [fullSortedOrder, isSearchMode]);
		const hasMore = sortedOrder.length < totalCount;
		const sentinelRef = useScrollLoad((0, import_react$4.useCallback)(() => {
			setVisibleCount((prev) => prev + SCROLL_BATCH_SIZE);
		}, []), hasMore, scrollRef);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "skills-installed-section",
			children: [
				subPage && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "skills-installed-subpage",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "skills-installed-subpage-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("h2", {
							className: "skills-installed-subpage-title",
							children: [t("unifiedMarket.myInstalled"), totalInstalledCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "skills-installed-subpage-count",
								children: totalInstalledCount
							})]
						}), !batch.isBatchMode && totalInstalledCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
							type: "button",
							className: "skills-installed-batch-manage",
							onClick: batch.handleEnterBatchMode,
							"data-track-id": "skill_market_batch_manage",
							"data-track-name": "批量管理已安装技能",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t("skills.batchManage") }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SettingsIcon, {})]
						})]
					})
				}),
				showWarningBanner && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "skills-enabled-warning",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "skills-enabled-warning-icon",
							children: "⚠"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "skills-enabled-warning-text",
							children: t("skills.enabledWarning")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							className: "skills-enabled-warning-dismiss",
							onClick: handleDismissWarning,
							children: t("skills.enabledWarning.dismiss")
						})
					]
				}),
				totalInstalledCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InstalledTitleRow, {
					totalInstalledCount,
					isBatchMode: batch.isBatchMode,
					batchHeaderProps: {
						totalSelectedCount: batch.totalSelectedCount,
						onSelectAll: batch.handleSelectAll,
						onDeselectAll: batch.handleDeselectAll,
						onBatchAction: batch.requestBatchAction,
						onExit: batch.handleExitBatchMode,
						isBatchActionInProgress: batch.isBatchActionInProgress,
						t
					}
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "skills-grid",
					children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SkillCardSkeleton, {}, `skeleton-${i}`))
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InstalledList, {
						visibleSkills,
						visiblePlugins,
						sortedOrder,
						isBatchMode: batch.isBatchMode,
						selectedSkills: batch.selectedSkills,
						selectedPlugins: batch.selectedPlugins,
						handleSkillCardClick,
						handleToggleSkill: wrappedHandleToggleSkill,
						handleInstallHubSkill,
						handleUpdateHubSkill,
						handleUpdateKnotSkill,
						handleToggleSelect: batch.handleToggleSelect,
						getInstalledHubSkillUpdate,
						getInstalledKnotSkillUpdate,
						getMarketplaceSkillUpdate,
						handleUpdateMarketplaceSkill,
						handlePluginCardClick,
						handleToggleInstalledPlugin: wrappedHandleToggleInstalledPlugin,
						handleToggleSelectPlugin: batch.handleToggleSelectPlugin,
						handleUninstallSkill: handleUninstallSingleSkill,
						handleEditSkill,
						handleTrySkill,
						handleUninstallPlugin: handleUninstallSinglePlugin,
						t,
						installedGridRef,
						skillRiskMap,
						isSearchMode,
						pinnedMap,
						onTogglePin: wrappedTogglePin
					}),
					hasMore && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						ref: sentinelRef,
						className: "skills-scroll-sentinel"
					}),
					totalInstalledCount === 0 && !isSearchMode && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "skills-installed-empty",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "skills-installed-empty-icon-title",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "skills-installed-empty-title",
								children: t("skills.installed.empty.title")
							})
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BatchUninstallConfirmModal, {
					visible: batch.isUninstallConfirmVisible,
					count: batch.totalSelectedCount,
					onCancel: batch.cancelBatchUninstall,
					onConfirm: batch.confirmBatchUninstall,
					theme: dialogTheme,
					t
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/folder-to-zip.ts
/** 收集 drop 事件中的 entries（同步快照，需在事件回调内立即调用） */
function readEntriesFromDataTransfer(items) {
	const entries = [];
	for (let i = 0; i < items.length; i += 1) {
		const item = items[i];
		if (item.kind !== "file") continue;
		const entry = item.webkitGetAsEntry?.();
		if (entry) entries.push(entry);
	}
	return entries;
}
/** 判断 drop 事件首项是否是文件夹 */
function isFolderDrop(entries) {
	return entries.length > 0 && entries.some((e) => e.isDirectory);
}
/** 把 `<input webkitdirectory>` 选中的 FileList 拍平 */
function readEntriesFromInput(files) {
	const list = [];
	for (let i = 0; i < files.length; i += 1) {
		const file = files[i];
		const relativePath = file.webkitRelativePath || file.name;
		list.push({
			relativePath,
			file
		});
	}
	return list;
}
/** 递归把 FileSystemEntry 拍平成 FolderFileEntry 列表 */
async function flattenDirectoryEntry(entry) {
	const result = [];
	await walk(entry, "", result);
	return result;
}
/** 从 drop 的 entries 拍平（保留首项目录名作为 zip 根） */
async function flattenDropEntries(entries) {
	const merged = [];
	for (const entry of entries) if (entry.isDirectory) {
		const items = await flattenDirectoryEntry(entry);
		merged.push(...items);
	} else if (entry.isFile) {
		const file = await fileFromEntry(entry);
		merged.push({
			relativePath: file.name,
			file
		});
	}
	return merged;
}
/** 推断 zip 的根目录名（用作 `<rootName>.zip` 文件名） */
function inferRootName(entries, fallback = "skill") {
	for (const item of entries) {
		const segs = item.relativePath.split("/").filter(Boolean);
		if (segs.length >= 1) return sanitizeName(segs[0]) || fallback;
	}
	return fallback;
}
/**
* 把拍平后的文件列表打包成 `<rootName>.zip` 的 File。
*
* 注意：JSZip 内部读取 File 用的是 FileReader（异步），大文件夹会占用渲染线程，
* 但 skill 包通常很小（几个文本 + 少量资产），实测百KB 量级毫秒级完成，可接受。
*/
async function folderToZipFile(entries, options) {
	const rootName = options?.rootName || inferRootName(entries);
	const zip = new import_jszip_min.default();
	for (const { relativePath, file } of entries) zip.file(relativePath, file);
	const blob = await zip.generateAsync({
		type: "blob",
		compression: "DEFLATE",
		compressionOptions: { level: options?.compressionLevel ?? 6 }
	});
	return new File([blob], `${rootName}.zip`, { type: "application/zip" });
}
async function walk(entry, prefix, out) {
	if (entry.isFile) {
		const file = await fileFromEntry(entry);
		out.push({
			relativePath: prefix + file.name,
			file
		});
		return;
	}
	if (entry.isDirectory) {
		const dirEntry = entry;
		const childEntries = await readAllChildren(dirEntry);
		const subPrefix = `${prefix}${dirEntry.name}/`;
		for (const child of childEntries) await walk(child, subPrefix, out);
	}
}
async function readAllChildren(dir) {
	const reader = dir.createReader();
	const all = [];
	while (true) {
		const batch = await new Promise((resolve, reject) => {
			reader.readEntries(resolve, reject);
		});
		if (batch.length === 0) break;
		all.push(...batch);
	}
	return all;
}
function fileFromEntry(entry) {
	return new Promise((resolve, reject) => entry.file(resolve, reject));
}
/** zip 根目录名净化：去掉路径分隔符 / 控制字符 */
function sanitizeName(name) {
	return name.replace(/[\\/:*?"<>|]/g, "").trim();
}
/** 为异步打包操作增加超时，避免 readAllChildren 异常时 UI 长期 loading */
function withPromiseTimeout(promise, ms, timeoutMessage) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(new Error(timeoutMessage)), ms);
		promise.then((value) => {
			clearTimeout(timer);
			resolve(value);
		}, (error) => {
			clearTimeout(timer);
			reject(error);
		});
	});
}
var import_jszip_min, FOLDER_PACKAGING_TIMEOUT_MS;
var init_folder_to_zip = __esmMin((() => {
	import_jszip_min = /* @__PURE__ */ __toESM(require_jszip_min());
	FOLDER_PACKAGING_TIMEOUT_MS = 6e4;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/parse-skill-md-metadata.ts
function parseSkillMdMetadataFromContent(content, fallbackTitle) {
	const match = FRONTMATTER_RE.exec(content);
	if (!match) return fallbackTitle ? { title: fallbackTitle } : null;
	const yaml = match[1];
	const name = readScalarField(yaml, "name");
	const description = readScalarField(yaml, "description") || readScalarField(yaml, "description_zh") || readScalarField(yaml, "description_en");
	const title = fallbackTitle?.trim() || void 0;
	if (!name && !description && !title) return null;
	return {
		name: name || void 0,
		title,
		description: description || void 0
	};
}
function readScalarField(yaml, field) {
	const line = yaml.split(/\r?\n/).find((l) => new RegExp(`^${field}\\s*:`).test(l));
	if (!line) return "";
	return line.replace(new RegExp(`^${field}\\s*:\\s*`), "").trim().replace(/^['"]|['"]$/g, "");
}
/** 从 zip File 中读取 SKILL.md 元数据 */
async function parseSkillMdMetadataFromZipFile(file, fallbackTitle) {
	const zip = await (await __vitePreload(async () => {
		const { default: __vite_default__ } = await import("./jszip.min-BFuwQ38O.js").then((m) => /* @__PURE__ */ __toESM(m.default));
		return { default: __vite_default__ };
	}, __vite__mapDeps([0,1,2,3,4]), import.meta.url)).default.loadAsync(file);
	const skillMdPath = Object.keys(zip.files).find((p) => /(^|\/)SKILL\.md$/i.test(p.replace(/\\/g, "/")));
	if (!skillMdPath) return fallbackTitle ? { title: fallbackTitle } : null;
	const entry = zip.files[skillMdPath];
	if (!entry || entry.dir) return fallbackTitle ? { title: fallbackTitle } : null;
	return parseSkillMdMetadataFromContent(await entry.async("string"), fallbackTitle);
}
/** 从文件夹条目中找到 SKILL.md 并解析 */
async function parseSkillMdMetadataFromFolderEntries(entries, fallbackTitle) {
	const skillMd = entries.find((e) => /(^|\/)SKILL\.md$/i.test(e.relativePath.replace(/\\/g, "/")));
	if (!skillMd) return fallbackTitle ? { title: fallbackTitle } : null;
	return parseSkillMdMetadataFromContent(await skillMd.file.text(), fallbackTitle);
}
function mergeSkillUploadMetadata(baseName, fromCaller, fromSkillMd) {
	const titleFallback = baseName.trim() || void 0;
	return {
		name: fromCaller?.name?.trim() || fromSkillMd?.name?.trim() || void 0,
		title: fromCaller?.title?.trim() || fromSkillMd?.title?.trim() || titleFallback,
		description: fromCaller?.description?.trim() || fromSkillMd?.description?.trim() || void 0
	};
}
var FRONTMATTER_RE;
var init_parse_skill_md_metadata = __esmMin((() => {
	init_preload_helper();
	FRONTMATTER_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/use-skill-upload.ts
function useSkillUpload(options, facades) {
	const [phase, setPhase] = (0, import_react$3.useState)("idle");
	const [error, setError] = (0, import_react$3.useState)(null);
	const [result, setResult] = (0, import_react$3.useState)(null);
	const cancelledRef = (0, import_react$3.useRef)(false);
	const reset = (0, import_react$3.useCallback)(() => {
		setPhase("idle");
		setError(null);
		setResult(null);
		cancelledRef.current = false;
	}, []);
	return {
		phase,
		error,
		result,
		startUpload: (0, import_react$3.useCallback)(async (input, callerMetadata, source) => {
			const isPathPayload = "filePath" in input;
			const fileName = isPathPayload ? input.name : input.name;
			const baseName = fileName.replace(/\.(zip|tar\.gz|tgz|skill)$/i, "");
			if (!fileName.toLowerCase().endsWith(".zip")) {
				setPhase("error");
				const msg = t("skill.importError.withReason", { error: "仅支持 .zip 文件或文件夹" });
				setError(msg);
				options.onError?.({ message: msg });
				return;
			}
			if (!isPathPayload && input.size > MAX_FILE_SIZE) {
				setPhase("error");
				const msg = t("skill.importError.withReason", { error: "文件超过 20MB，请精简后重试" });
				setError(msg);
				options.onError?.({ message: msg });
				return;
			}
			setPhase("uploading");
			const filePayload = isPathPayload ? input : resolveFilePayload(input);
			assertDesktopUsesFilePath(filePayload, isPathPayload, source);
			const pathMetadata = isPathPayload ? input.metadata : void 0;
			let fromSkillMd = null;
			if (!callerMetadata?.name && !pathMetadata?.name && filePayload instanceof File) fromSkillMd = await parseSkillMdMetadataFromZipFile(filePayload, baseName).catch(() => null);
			const uploadOptions = toUploadOptions(mergeSkillUploadMetadata(baseName, {
				...pathMetadata,
				...callerMetadata
			}, fromSkillMd));
			try {
				let skillUid;
				let displayName;
				let pollFn;
				if (options.mode === "project") {
					const projectFacade = facades.project;
					if (!projectFacade?.uploadSkill || !projectFacade?.getProjectCustomSkill) throw new Error(t("skill.importError.default"));
					const pid = options.projectId;
					const { item } = await projectFacade.uploadSkill(pid, filePayload, uploadOptions);
					skillUid = item.skillId;
					displayName = item.title || item.displayNameZh || item.displayNameEn || item.name || item.skillId;
					pollFn = async (uid) => {
						const { item: polled } = await projectFacade.getProjectCustomSkill(pid, uid);
						return {
							status: polled.status,
							checkError: polled.checkError,
							name: polled.title || polled.name
						};
					};
				} else {
					const personalFacade = facades.personalSkills;
					if (!personalFacade?.uploadCustomSkill || !personalFacade?.getCustomSkill) throw new Error(t("skill.importError.default"));
					const { item } = await personalFacade.uploadCustomSkill({
						file: filePayload,
						...uploadOptions
					});
					skillUid = item.skillUid;
					displayName = fileName.replace(/\.zip$/i, "");
					pollFn = async (uid) => {
						const { item: polled } = await personalFacade.getCustomSkill(uid);
						return {
							status: polled.status,
							checkError: polled.checkError,
							name: polled.title || polled.name
						};
					};
				}
				if (cancelledRef.current) return;
				setPhase("checking");
				for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt += 1) {
					await sleep(POLL_INTERVAL_MS);
					if (cancelledRef.current) return;
					const polled = await pollFn(skillUid);
					if (cancelledRef.current) return;
					if (polled.status === "ready") {
						const finalName = polled.name || displayName;
						setPhase("success");
						const successResult = {
							skillUid,
							name: finalName,
							status: "ready"
						};
						setResult(successResult);
						options.onSuccess?.(successResult);
						return;
					}
					if (polled.status === "invalid") {
						const reason = polled.checkError || t("skill.uploadFailed.invalidReason");
						setPhase("error");
						const msg = t("skill.uploadFailed.invalid", { reason });
						setError(msg);
						options.onError?.({
							message: msg,
							status: "invalid"
						});
						return;
					}
					if (polled.status === "failed") {
						setPhase("error");
						const msg = t("skill.uploadFailed.cosError");
						setError(msg);
						options.onError?.({
							message: msg,
							status: "failed"
						});
						return;
					}
				}
				setPhase("error");
				const msg = t("skill.uploadFailed.timeout");
				setError(msg);
				options.onError?.({
					message: msg,
					status: "timeout"
				});
			} catch (err) {
				if (cancelledRef.current) return;
				const rawMsg = err instanceof Error ? err.message : void 0;
				const msg = rawMsg ? t("skill.importError.withReason", { error: rawMsg }) : t("skill.importError.default");
				setPhase("error");
				setError(msg);
				options.onError?.({ message: msg });
			}
		}, [options, facades]),
		reset
	};
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function toUploadOptions(metadata) {
	const options = {};
	if (metadata.name) options.name = metadata.name;
	if (metadata.title) options.title = metadata.title;
	if (metadata.description) options.description = metadata.description;
	return options;
}
/**
* IPC 序列化兼容：Desktop renderer 传 { filePath, name, type }，
* Web 端直传 File
*/
function resolveFilePayload(file) {
	const wu = globalThis.vscode?.webUtils;
	let electronPath;
	try {
		electronPath = wu?.getPathForFile?.(file) || void 0;
	} catch {
		electronPath = void 0;
	}
	if (electronPath) return {
		filePath: electronPath,
		name: file.name,
		type: file.type || void 0
	};
	return file;
}
function isWorkbuddyDesktop() {
	return typeof globalThis.workbuddyDesktop !== "undefined";
}
/**
* Desktop renderer 经 IPC 上传时必须带 filePath；内存 File（如 JSZip 产物）会导致 RPC 挂起。
* 仅对 drag-and-drop 来源断言：input fallback / JSZip 打包属于合法的浏览器侧上传路径。
*/
function assertDesktopUsesFilePath(payload, isPathPayload, source) {
	if (isPathPayload || !isWorkbuddyDesktop()) return;
	if (source === "drop" && payload instanceof File) throw new Error(t("skills.upload.modal.desktopUsePathUpload"));
}
var import_react$3, POLL_INTERVAL_MS, POLL_MAX_ATTEMPTS, MAX_FILE_SIZE;
var init_use_skill_upload = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_parse_skill_md_metadata();
	POLL_INTERVAL_MS = 2e3;
	POLL_MAX_ATTEMPTS = 150;
	MAX_FILE_SIZE = 20 * 1024 * 1024;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/skill-upload-modal.tsx
var import_react$2, import_jsx_runtime, SkillUploadModal;
var init_skill_upload_modal = __esmMin((() => {
	init_upload_modal$1();
	init_src();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_desktop_skill_source_picker();
	init_folder_to_zip();
	init_parse_skill_md_metadata();
	init_use_skill_upload();
	import_jsx_runtime = require_jsx_runtime();
	SkillUploadModal = ({ options, facades, onClose }) => {
		const t = useTranslation();
		const [isDraggingOver, setIsDraggingOver] = (0, import_react$2.useState)(false);
		const [isPackaging, setIsPackaging] = (0, import_react$2.useState)(false);
		const folderInputRef = (0, import_react$2.useRef)(null);
		const zipInputRef = (0, import_react$2.useRef)(null);
		const desktopDialogOpen = (0, import_react$2.useMemo)(() => getDesktopDialogOpen(), []);
		const desktopPlatform = (0, import_react$2.useMemo)(() => getDesktopPlatform(), []);
		const useWindowsStyleDesktopPick = Boolean(desktopDialogOpen && desktopPlatform && !isMacDesktop(desktopPlatform));
		const { phase, error, result: uploadResult, startUpload, reset } = useSkillUpload(options, facades);
		const handleClose = (0, import_react$2.useCallback)(() => {
			options.onClose?.();
			onClose();
		}, [options, onClose]);
		const uploadTitle = t(options.mode === "project" ? "skills.upload.modal.titleProject" : "skills.upload.modal.titlePersonal");
		const uploadFromLocalPath = (0, import_react$2.useCallback)(async (selectedPath) => {
			const normalizedPath = resolveSkillRootDirFromSelectedPath(selectedPath);
			if (normalizedPath.toLowerCase().endsWith(".zip")) {
				await startUpload({
					filePath: normalizedPath,
					name: normalizedPath.split(/[/\\]/).pop() || "skill.zip",
					type: "application/zip"
				});
				return;
			}
			const exportZip = facades.personalSkills?.exportZip;
			if (typeof exportZip === "function") {
				setIsPackaging(true);
				try {
					const folderName = normalizedPath.split(/[/\\]/).pop() || "skill";
					const zipResult = await exportZip({
						skillRootDir: normalizedPath,
						skillName: folderName
					});
					if (!zipResult.success || !zipResult.zipPath) {
						toast.error(zipResult.error || t("skill.importError.default"));
						return;
					}
					const zipFileName = `${folderName}.zip`;
					await startUpload({
						filePath: zipResult.zipPath,
						name: zipFileName,
						type: "application/zip",
						metadata: zipResult.metadata
					});
				} finally {
					setIsPackaging(false);
				}
				return;
			}
			folderInputRef.current?.click();
		}, [
			facades.personalSkills,
			startUpload,
			t
		]);
		const handleClickUpload = (0, import_react$2.useCallback)(async () => {
			if (phase !== "idle" && phase !== "error") return;
			if (phase === "error") reset();
			if (desktopDialogOpen) try {
				const selectedPath = await pickDesktopSkillFolder(desktopDialogOpen, {
					title: uploadTitle,
					platform: desktopPlatform
				});
				if (!selectedPath) return;
				await uploadFromLocalPath(selectedPath);
				return;
			} catch (err) {
				console.warn("[SkillUploadModal] native pick failed, falling back:", err);
			}
			folderInputRef.current?.click();
		}, [
			phase,
			reset,
			desktopDialogOpen,
			desktopPlatform,
			uploadFromLocalPath,
			uploadTitle
		]);
		const handleClickZipUpload = (0, import_react$2.useCallback)(async () => {
			if (phase !== "idle" && phase !== "error") return;
			if (phase === "error") reset();
			if (desktopDialogOpen && useWindowsStyleDesktopPick) try {
				const selectedPath = await pickDesktopSkillZipFile(desktopDialogOpen, uploadTitle);
				if (!selectedPath) return;
				await uploadFromLocalPath(selectedPath);
				return;
			} catch (err) {
				console.warn("[SkillUploadModal] native zip pick failed, falling back:", err);
			}
			zipInputRef.current?.click();
		}, [
			phase,
			reset,
			desktopDialogOpen,
			uploadFromLocalPath,
			uploadTitle,
			useWindowsStyleDesktopPick
		]);
		const handleZipFileSelected = (0, import_react$2.useCallback)(async (event) => {
			const input = event.target;
			const file = input.files?.[0];
			input.value = "";
			if (!file) return;
			await startUpload(file, void 0, "input");
		}, [startUpload]);
		const handleFolderSelected = (0, import_react$2.useCallback)(async (event) => {
			const input = event.target;
			const files = input.files;
			input.value = "";
			if (!files || files.length === 0) return;
			setIsPackaging(true);
			try {
				const entries = readEntriesFromInput(files);
				const rootName = inferRootName(entries);
				const metadata = await parseSkillMdMetadataFromFolderEntries(entries, rootName);
				await startUpload(await folderToZipFile(entries, { rootName }), metadata ?? void 0, "folder-zip");
			} finally {
				setIsPackaging(false);
			}
		}, [startUpload]);
		const handleDragOver = (0, import_react$2.useCallback)((e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDraggingOver(true);
		}, []);
		const handleDragLeave = (0, import_react$2.useCallback)((e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDraggingOver(false);
		}, []);
		const handleDrop = (0, import_react$2.useCallback)(async (e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDraggingOver(false);
			const droppedFile = e.dataTransfer.files?.[0];
			const localPath = resolveDesktopDropPath(droppedFile);
			if (localPath) {
				await uploadFromLocalPath(localPath);
				return;
			}
			const entries = readEntriesFromDataTransfer(e.dataTransfer.items);
			if (isFolderDrop(entries)) {
				setIsPackaging(true);
				try {
					const packagingTimeoutMsg = t("skills.upload.modal.packagingTimeout");
					const flat = await withPromiseTimeout(flattenDropEntries(entries), FOLDER_PACKAGING_TIMEOUT_MS, packagingTimeoutMsg);
					if (flat.length === 0) {
						toast.error(t("skills.upload.modal.emptyFolderDrop"));
						return;
					}
					const rootName = inferRootName(flat);
					const metadata = await parseSkillMdMetadataFromFolderEntries(flat, rootName);
					await startUpload(await withPromiseTimeout(folderToZipFile(flat, { rootName }), FOLDER_PACKAGING_TIMEOUT_MS, packagingTimeoutMsg), metadata ?? void 0, "folder-zip");
				} catch (err) {
					const rawMsg = err instanceof Error ? err.message : void 0;
					toast.error(rawMsg ? t("skill.importError.withReason", { error: rawMsg }) : t("skill.importError.default"));
				} finally {
					setIsPackaging(false);
				}
				return;
			}
			if (!droppedFile) return;
			await startUpload(droppedFile, void 0, "drop");
		}, [
			startUpload,
			uploadFromLocalPath,
			t
		]);
		(0, import_react$2.useEffect)(() => {
			if (phase === "success") {
				toast.success(t("skill.uploadSuccess", { name: uploadResult?.name || "" }));
				const timer = setTimeout(handleClose, 600);
				return () => clearTimeout(timer);
			}
		}, [
			phase,
			handleClose,
			t,
			uploadResult
		]);
		(0, import_react$2.useEffect)(() => {
			if (phase === "error" && error) {
				toast.error(error);
				reset();
			}
		}, [
			phase,
			error,
			reset
		]);
		const isUploading = phase === "uploading" || phase === "checking" || isPackaging;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "skill-upload-modal-overlay",
			onClick: handleClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "skill-upload-modal",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-upload-modal-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(options.mode === "project" ? "skills.upload.modal.titleProject" : "skills.upload.modal.titlePersonal") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "skill-upload-modal-close",
							onClick: handleClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 4L4 12M4 4l8 8",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: [
							"skill-upload-drop-zone",
							isDraggingOver && "skill-upload-drop-zone--dragging",
							isUploading && "skill-upload-drop-zone--disabled"
						].filter(Boolean).join(" "),
						onClick: isUploading ? void 0 : handleClickUpload,
						onDragOver: isUploading ? void 0 : handleDragOver,
						onDragLeave: isUploading ? void 0 : handleDragLeave,
						onDrop: isUploading ? void 0 : handleDrop,
						children: [
							isUploading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "skill-upload-overlay",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skill-upload-overlay-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "skill-upload-overlay-text",
									children: isPackaging ? t("skills.upload.modal.uploadingText") : phase === "checking" ? t("skills.upload.modal.securityChecking") : t("skills.upload.modal.uploadingText")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "skill-upload-drop-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "32",
									height: "32",
									viewBox: "0 0 32 32",
									fill: "none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: "3",
											y: "6",
											width: "26",
											height: "20",
											rx: "2",
											stroke: "currentColor",
											strokeWidth: "1.6",
											fill: "none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M3 11h26",
											stroke: "currentColor",
											strokeWidth: "1.6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M10 6V3M22 6V3",
											stroke: "currentColor",
											strokeWidth: "1.6",
											strokeLinecap: "round"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M16 17v5M13 20l3-3 3 3",
											stroke: "currentColor",
											strokeWidth: "1.6",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "skill-upload-drop-title",
								children: isDraggingOver ? t("skills.upload.modal.dragging") : t("skills.upload.modal.dropTitle")
							})
						]
					}),
					!isUploading && phase !== "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "skill-upload-requirements",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "skill-upload-requirements-title",
								children: t("skills.upload.modal.requirementsTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "skill-upload-requirements-list",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "skill-upload-requirements-list-item",
									children: t("skills.upload.modal.requirementFolder")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "skill-upload-requirements-list-item",
									children: t("skills.upload.modal.requirementMd")
								})]
							}),
							useWindowsStyleDesktopPick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "skill-upload-pick-zip-link",
								onClick: handleClickZipUpload,
								children: t("skills.upload.modal.pickZipFile")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: folderInputRef,
						type: "file",
						webkitdirectory: "",
						directory: "",
						multiple: true,
						style: { display: "none" },
						onChange: handleFolderSelected
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: zipInputRef,
						type: "file",
						accept: ".zip,application/zip",
						style: { display: "none" },
						onChange: handleZipFileSelected
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/open-skill-upload-modal.ts
/** 主入口：通用模式 */
function openSkillUploadModalFn(options) {
	const container = document.createElement("div");
	container.setAttribute("data-skill-upload-modal", "true");
	document.body.appendChild(container);
	const root = (0, import_client.createRoot)(container);
	const facades = options.facades || {};
	const cleanup = () => {
		root.unmount();
		container.remove();
	};
	const handleClose = () => {
		cleanup();
	};
	root.render(import_react$1.createElement(SkillUploadModal, {
		options,
		facades,
		onClose: handleClose
	}));
	return { close: cleanup };
}
var import_react$1, import_client, openSkillUploadModal;
var init_open_skill_upload_modal = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_client = /* @__PURE__ */ __toESM(require_client());
	init_skill_upload_modal();
	/** 快捷方法：个人 skill 上传 */
	openSkillUploadModalFn.personal = (options) => openSkillUploadModalFn({
		...options,
		mode: "personal"
	});
	/** 快捷方法：项目 skill 上传 */
	openSkillUploadModalFn.project = (options) => openSkillUploadModalFn({
		...options,
		mode: "project"
	});
	openSkillUploadModal = openSkillUploadModalFn;
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/use-skill-upload-modal.ts
function useSkillUploadModal() {
	const host = useModuleHost();
	const [scanEnabled, setScanEnabled] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const adapter = host.adapter;
		if (!adapter?.getProductFeatures) return;
		adapter.getProductFeatures().then((features) => {
			if (features && "SkillSecurityScan" in features) setScanEnabled(features[ENABLE_SKILL_SECURITY_SCAN_KEY] !== false);
		});
	}, [host.adapter]);
	const getFacades = (0, import_react.useCallback)(() => ({
		personalSkills: host.facades.personalSkills,
		project: host.facades.project
	}), [host]);
	return {
		open: (0, import_react.useCallback)((options) => openSkillUploadModal({
			...options,
			facades: getFacades(),
			scanEnabled
		}), [getFacades, scanEnabled]),
		openPersonal: (0, import_react.useCallback)((options) => openSkillUploadModal({
			...options,
			mode: "personal",
			facades: getFacades(),
			scanEnabled
		}), [getFacades, scanEnabled]),
		openProject: (0, import_react.useCallback)((options) => openSkillUploadModal({
			...options,
			mode: "project",
			facades: getFacades(),
			scanEnabled
		}), [getFacades, scanEnabled])
	};
}
var import_react;
var init_use_skill_upload_modal = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_common$1();
	init_skills_security_types();
	init_open_skill_upload_modal();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/cloud-upload-modal/index.ts
var init_cloud_upload_modal = __esmMin((() => {
	init_open_skill_upload_modal();
	init_skill_upload_modal();
	init_use_skill_upload();
	init_use_skill_upload_modal();
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/index.ts
var init_components = __esmMin((() => {
	init_plugin_detail_view();
	init_upload_modal();
	init_batch_update_modal();
	init_batch_uninstall_confirm_modal();
	init_modified_skill_update_confirm_modal();
	init_category_chip();
	init_skill_card();
	init_skill_detail_view();
	init_skills_icons();
	init_discover_section();
	init_discover_tab_bar();
	init_featured_section();
	init_installed_section();
	init_search_results();
	init_installed_header();
	init_installed_list();
	init_use_batch_selection();
	init_cloud_upload_modal();
	init_personal_skill_import();
}));
//#endregion
export { BatchUpdateModal as A, useInstalledSkills as C, useSkillUploadPolicy as D, init_use_skill_upload_policy as E, init_use_delayed_visible as M, useDelayedVisible as N, SkillDetailView as O, init_use_installed_skills as S, PersonalSkillImportModal as T, init_use_knot as _, InstalledSection as a, useSkillHub as b, useSkillDetail as c, init_use_plugins as d, usePlugins as f, useBuiltinMarket as g, init_use_builtin_market as h, openSkillUploadModal as i, PluginDetailView as j, ModifiedSkillUpdateConfirmModal as k, init_use_skill_search as l, useEnterpriseSkills as m, init_cloud_upload_modal as n, DiscoverSection as o, init_use_enterprise_skills as p, useSkillUploadModal as r, init_use_skill_detail as s, init_components as t, useSkillSearch as u, useKnot as v, usePersonalSkillImport as w, buildPolicyDeniedMessage as x, init_use_skillhub as y };
