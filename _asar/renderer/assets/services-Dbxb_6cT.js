import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Yr as toast, ni as ConfirmDialog, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as useModuleHost, n as init_module_host_context } from "./module-host-context-CI9spvhq.js";
import { a as useScanResultSubscription, o as asyncSecurityScanService, r as showImportSkillError } from "./skill-import-errors-BlMOiDaZ.js";
import { C as init_context, D as isSecurityHighRisk, E as createPendingSecurityScanResult, O as isSecurityScanPending, T as buildSecurityScanDialogProps, _ as getLocalizedText, b as init_import_security_risk, f as init_config, h as useLocale, i as init_use_expert_theme, m as init_use_locale, n as init_use_expert_avatar, o as useThemeClassName, r as useExpertAvatar, t as init_center, v as init_locale_text, w as init_skills, x as runBackgroundExpertImportSecurityCheck } from "./center-Cjtv6Q1N.js";
import { r as subscribePendingExpertInstallIntent, t as init_expert_install_intent_buffer } from "./expert-install-intent-buffer-CtJJBbyk.js";
import { n as init_get_source_url, t as getSourceUrl } from "./get-source-url-aEA3ojcO.js";
//#region ../../packages/agent-ui/src/modules/expert/components/expert-install-intent-coordinator.tsx
function isNonHighRiskCompletedResult(result) {
	return !!result.verdict && result.verdict !== "black" && result.riskLevel !== "high" && result.threatLevel < 4;
}
function resolveMetadataText(text) {
	if (!text) return "";
	if (typeof text === "string") return text;
	if (typeof text === "object") {
		const localized = text;
		return resolveMetadataText(localized.zh) || resolveMetadataText(localized.en) || resolveMetadataText(localized.displayName) || resolveMetadataText(localized.profession) || resolveMetadataText(localized.name) || resolveMetadataText(localized.role) || resolveMetadataText(localized.id);
	}
	return "";
}
function resolveMetadataItems(value) {
	if (!Array.isArray(value)) return [];
	return value.map(resolveMetadataText).filter(Boolean);
}
function resolveShareDetailData(value) {
	if (!value || typeof value !== "object") return null;
	const result = value;
	const data = result.data && typeof result.data === "object" ? result.data : result;
	return data.shareCode || Array.isArray(data.inodes) || data.error ? data : null;
}
function parseMetadataJson(value) {
	if (typeof value !== "string") return value;
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
}
function isExpertShareMetadata(value) {
	return !!value && typeof value === "object" && value.type === "expert";
}
function parseExpertShareMetadata(value, seen = /* @__PURE__ */ new WeakSet()) {
	const parsedValue = parseMetadataJson(value);
	if (isExpertShareMetadata(parsedValue)) return parsedValue;
	if (!parsedValue || typeof parsedValue !== "object") return null;
	if (seen.has(parsedValue)) return null;
	seen.add(parsedValue);
	const detail = parsedValue;
	const directMetadata = parseMetadataJson(detail.metadata ?? detail.shareMetadata);
	if (isExpertShareMetadata(directMetadata)) return directMetadata;
	for (const child of Object.values(parsedValue)) {
		const metadata = parseExpertShareMetadata(child, seen);
		if (metadata) return metadata;
	}
	return null;
}
/**
* 导入预览仅展示分享包内置头像：data: / http(s) / file: 直接使用，其余视为缺失走 placeholder。
* 自定义专家不会发布到 COS，这里不能像市场专家那样把相对路径拼到 EXPERT_ASSET_BASE_URL。
*/
function resolveImportInlineAvatar(avatar) {
	if (typeof avatar !== "string" || !avatar) return "";
	if (/^(https?|file|data):/i.test(avatar)) return avatar;
	return "";
}
var import_react$1, import_react_dom, import_jsx_runtime$1, SMH_HOST, IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS, ExpertImportModal, ExpertImportSecurityCheckingModal, ExpertInstallIntentCoordinator;
var init_expert_install_intent_coordinator = __esmMin((() => {
	init_center();
	init_src();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_expert_install_intent_buffer();
	init_get_source_url();
	init_skills();
	init_config();
	init_context();
	init_use_expert_avatar();
	init_use_expert_theme();
	init_use_locale();
	init_import_security_risk();
	init_locale_text();
	import_jsx_runtime$1 = require_jsx_runtime();
	SMH_HOST = "https://smh26tqjmz2qlj4i.api.tencentsmh.cn";
	IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS = 3e3;
	ExpertImportModal = ({ request, metadata, metadataLoading, loading, categories, onConfirm, onClose, t }) => {
		const themeClassName = useThemeClassName();
		const locale = useLocale();
		const [imageBroken, setImageBroken] = (0, import_react$1.useState)(false);
		const avatarUrl = (0, import_react$1.useMemo)(() => resolveImportInlineAvatar(metadata?.avatar), [metadata?.avatar]);
		const { finalAvatarUrl } = useExpertAvatar(avatarUrl);
		(0, import_react$1.useEffect)(() => {
			setImageBroken(false);
		}, [avatarUrl]);
		if (!request) return null;
		const expertName = resolveMetadataText(metadata?.profession) || resolveMetadataText(metadata?.displayName) || metadata?.expertName || request.expertName;
		const displayName = resolveMetadataText(metadata?.displayName) || metadata?.expertName || request.expertName;
		const description = resolveMetadataText(metadata?.displayDescription) || resolveMetadataText(metadata?.description);
		const modalSubtitle = displayName && displayName !== expertName ? displayName : "";
		const shareAuthor = resolveMetadataText(metadata?.sharedBy) || t("expertCenter.import.defaultSharer");
		/**
		* 分类名解析优先级（fix #60974）：
		* 1. metadata.categoryName —— 未来 zip manifest 若带上，可直接使用
		* 2. 通过 metadata.categoryId 在本地 categories 表反查（zh/en）
		* 3. 最后兜底 categoryId 裸值（旧路径，避免完全空）
		* 旧分享包只带 categoryId（形如 `12-IndustryConsultant`）
		* 走第 2 步反查即可显示
		*/
		const categoryLabel = (() => {
			const fromMetadata = resolveMetadataText(metadata?.categoryName);
			if (fromMetadata) return fromMetadata;
			const categoryId = metadata?.categoryId;
			if (categoryId) {
				const matched = categories.find((item) => item.id === categoryId);
				if (matched) return getLocalizedText(matched.name, locale, categoryId);
				return categoryId;
			}
			return "";
		})();
		const tags = resolveMetadataItems(metadata?.tags);
		const quickPrompts = resolveMetadataItems(metadata?.quickPrompts).concat(resolveMetadataItems(metadata?.triggerPrompts)).slice(0, 10);
		const members = Array.isArray(metadata?.members) ? metadata.members.slice(0, 8) : [];
		const hasPackageSource = !!request.shareCode;
		const isWaitingForMetadata = metadataLoading && !metadata;
		const closeIfIdle = () => {
			if (!loading) onClose();
		};
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: `ec-modal-overlay expert-import-modal-overlay ${themeClassName}`.trim(),
			onClick: (event) => {
				event.stopPropagation();
				if (event.target === event.currentTarget) closeIfIdle();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "expert-import-modal-shell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "expert-import-modal-heading",
					children: isWaitingForMetadata ? t("expertCenter.import.loadingTitle") : t("expertCenter.import.sharedBy", { name: shareAuthor })
				}), isWaitingForMetadata ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "ec-modal-card expert-import-modal-card expert-import-loading-card",
					role: "dialog",
					"aria-modal": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
						className: "ec-modal-close",
						onClick: closeIfIdle,
						"aria-label": t("common.close"),
						disabled: loading,
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
								x1: "18",
								y1: "6",
								x2: "6",
								y2: "18"
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
								x1: "6",
								y1: "6",
								x2: "18",
								y2: "18"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "expert-import-loading-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
							className: "expert-import-loading-spinner",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "expert-import-loading-text",
							children: t("expertCenter.import.loadingContent")
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "ec-modal-card expert-import-modal-card",
					role: "dialog",
					"aria-modal": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							className: "ec-modal-close",
							onClick: closeIfIdle,
							"aria-label": t("common.close"),
							disabled: loading,
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
								width: "18",
								height: "18",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
									x1: "18",
									y1: "6",
									x2: "6",
									y2: "18"
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
									x1: "6",
									y1: "6",
									x2: "18",
									y2: "18"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "ec-modal-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "ec-modal-avatar",
								children: !imageBroken && finalAvatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
									src: finalAvatarUrl,
									alt: expertName,
									onError: () => setImageBroken(true)
								}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: "ec-modal-avatar-fallback",
									children: expertName.charAt(0)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
								className: "ec-modal-info",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: "ec-modal-title-row",
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-role",
										children: expertName
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
									className: "ec-modal-meta",
									children: [
										modalSubtitle && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
											className: "ec-modal-name",
											children: modalSubtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
											className: "ec-modal-category-badge",
											children: metadata?.expertType === "team" ? t("expertCenter.teamBadge") : t("expertCenter.expertBadge")
										}),
										categoryLabel && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
											className: "ec-modal-category-badge",
											children: categoryLabel
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "ec-modal-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
									className: "ec-modal-content",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-section-title",
										children: t("expertCenter.abilityIntro")
									}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
										className: "ec-modal-desc",
										children: metadataLoading ? t("expertCenter.loading") : description || t("expertCenter.import.content")
									})]
								}),
								tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
									className: "ec-modal-tags-section",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-section-title",
										children: t("expertCenter.tagsTitle")
									}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-tags-list",
										children: tags.map((tag, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
											className: "ec-modal-tag-chip",
											children: tag
										}, `tag-${index}-${tag}`))
									})]
								}),
								members.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
									className: "ec-modal-team",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-section-title",
										children: t("expertCenter.teamMembers")
									}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-team-list",
										children: members.map((member, index) => {
											const memberName = resolveMetadataText(member);
											if (!memberName) return null;
											const memberAvatarUrl = resolveImportInlineAvatar(member && typeof member === "object" ? member.avatar : void 0);
											return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
												className: "ec-modal-team-member",
												children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
													className: "ec-modal-member-avatar",
													children: memberAvatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
														src: memberAvatarUrl,
														alt: memberName
													}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
														className: "ec-modal-member-avatar-placeholder",
														children: memberName.charAt(0)
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
													className: "ec-modal-member-info",
													children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
														className: "ec-modal-member-role",
														children: memberName
													})
												})]
											}, `member-${index}-${memberName}`);
										})
									})]
								}),
								quickPrompts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
									className: "ec-modal-quick-prompts",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-section-title",
										children: t("expertCenter.quickPromptsTitle")
									}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
										className: "ec-modal-quick-prompts-list",
										children: quickPrompts.map((prompt, index) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
											className: "ec-modal-quick-prompt-btn expert-import-prompt-preview",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
												className: "ec-modal-quick-prompt-text",
												children: [
													"“",
													prompt,
													"”"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
												className: "ec-modal-quick-prompt-arrow",
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 16 16",
													fill: "none",
													children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
														d: "M6 4L10 8L6 12",
														stroke: "currentColor",
														strokeWidth: "1.5",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													})
												})
											})]
										}, `quick-prompt-${index}`))
									})]
								}),
								!hasPackageSource && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
									className: "expert-import-dialog-error",
									children: t("expertCenter.import.missingDownloadUrl")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "ec-modal-footer",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								className: "ec-modal-summon-btn",
								onClick: onConfirm,
								disabled: !hasPackageSource || loading,
								children: loading ? t("expertCenter.import.importing") : t("expertCenter.import.confirm")
							})
						})
					]
				})]
			})
		}), document.body);
	};
	ExpertImportSecurityCheckingModal = ({ visible, autoInstallNonHighRisk, onAutoInstallNonHighRiskChange, onSkipInstall, onClose, t }) => {
		const themeClassName = useThemeClassName();
		if (!visible) return null;
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: `ec-modal-overlay expert-import-security-overlay ${themeClassName}`.trim(),
			onClick: (event) => event.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "expert-import-security-card",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "expert-import-security-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
						className: "expert-import-security-close",
						onClick: onClose,
						"aria-label": t("common.close"),
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
								x1: "18",
								y1: "6",
								x2: "6",
								y2: "18"
							}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("line", {
								x1: "6",
								y1: "6",
								x2: "18",
								y2: "18"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						id: "expert-import-security-title",
						className: "expert-import-security-title",
						children: t("expertCenter.import.security.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "expert-import-security-status-box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "expert-import-security-hourglass",
							"aria-hidden": true,
							children: "⌛"
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "expert-import-security-status-text",
							children: t("expertCenter.import.security.checking")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "expert-import-security-desc",
						children: t("expertCenter.import.security.description")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("label", {
						className: "expert-import-security-checkbox",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("input", {
							type: "checkbox",
							checked: autoInstallNonHighRisk,
							onChange: (event) => onAutoInstallNonHighRiskChange(event.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: t("expertCenter.import.security.autoInstallNonHighRisk") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "expert-import-security-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
							className: "expert-import-security-skip-btn",
							onClick: onSkipInstall,
							children: t("expertCenter.import.security.skipInstall")
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "expert-import-security-skip-tip",
							children: t("expertCenter.import.security.skipTip")
						})]
					})
				]
			})
		}), document.body);
	};
	ExpertInstallIntentCoordinator = ({ adapter, onExpertInstallSuccess }) => {
		const t = useTranslation();
		const { accountInfo, facades, reporter } = useModuleHost();
		const { reportEvent, Events } = reporter;
		const expertFacade = facades.expert;
		const enterpriseId = accountInfo?.enterpriseId ?? "";
		const [expertImportRequest, setExpertImportRequest] = (0, import_react$1.useState)(null);
		const [expertImportLoading, setExpertImportLoading] = (0, import_react$1.useState)(false);
		const [expertShareMetadata, setExpertShareMetadata] = (0, import_react$1.useState)(null);
		const [expertShareMetadataLoading, setExpertShareMetadataLoading] = (0, import_react$1.useState)(false);
		/**
		* 分享导入预览用的分类表（fix #60974）。
		* 旧分享包的 manifest 只写了 categoryId（形如 `12-IndustryConsultant`），
		* 拿到本地 categories 表后可反查中文名，避免弹窗显示裸英文 ID。
		*/
		const [importCategories, setImportCategories] = (0, import_react$1.useState)([]);
		const [securityState, setSecurityState] = (0, import_react$1.useState)(null);
		const [securityCheckingVisible, setSecurityCheckingVisible] = (0, import_react$1.useState)(false);
		const [autoInstallNonHighRisk, setAutoInstallNonHighRisk] = (0, import_react$1.useState)(false);
		const [highRiskCountdown, setHighRiskCountdown] = (0, import_react$1.useState)(0);
		const [overwriteRequest, setOverwriteRequest] = (0, import_react$1.useState)(null);
		const overwriteResolverRef = (0, import_react$1.useRef)(null);
		const skipSecurityInstallWhenReadyRef = (0, import_react$1.useRef)(false);
		const securityDialogShownAtRef = (0, import_react$1.useRef)(null);
		/**
		* 分享弹窗展开时才拉 categories，避免无必要的启动开销。
		* 已有数据后不重复请求；接口失败时降级到裸 categoryId（保持旧行为）。
		*/
		(0, import_react$1.useEffect)(() => {
			if (!expertImportRequest || importCategories.length > 0 || !expertFacade?.getCategories) return;
			let cancelled = false;
			expertFacade.getCategories({
				enterpriseId,
				source: "builtin"
			}).then((result) => {
				if (cancelled || !result?.categories) return;
				setImportCategories(result.categories);
			}).catch((error) => {
				console.warn("[App][ExpertImport] load categories for preview failed:", error);
			});
			return () => {
				cancelled = true;
			};
		}, [
			enterpriseId,
			expertFacade,
			expertImportRequest,
			importCategories.length
		]);
		const reportInstallSucceeded = (0, import_react$1.useCallback)((expertName) => {
			reportEvent(Events.ExpertImportSuccess, {
				id: expertName,
				name: expertName,
				expertType: typeof expertShareMetadata?.expertType === "string" ? expertShareMetadata.expertType : "custom",
				triggerSource: "share_link"
			});
		}, [
			Events,
			expertShareMetadata?.expertType,
			reportEvent
		]);
		const rememberInstalledExpert = (0, import_react$1.useCallback)(async (expertId) => {
			const userId = accountInfo?.userId;
			if (!expertId || !userId || !adapter?.addToUserExperts) return;
			try {
				await adapter.addToUserExperts(userId, [expertId]);
				console.info("[App][ExpertImport] added expert to user list", {
					expertId,
					userId
				});
			} catch (error) {
				console.warn("[App][ExpertImport] failed to add expert to user list", error);
			}
		}, [accountInfo?.userId, adapter]);
		const isExpertOwnedByCurrentUser = (0, import_react$1.useCallback)(async (expertId) => {
			const userId = accountInfo?.userId;
			if (!expertId || !userId || !adapter?.scanLocalExperts) return true;
			try {
				return (await adapter.scanLocalExperts(userId)).some((expert) => expert.id === expertId);
			} catch (error) {
				console.warn("[App][ExpertImport] failed to check current user expert ownership", error);
				return true;
			}
		}, [accountInfo?.userId, adapter]);
		const startBackgroundImportSecurityCheck = (0, import_react$1.useCallback)((expertId, expertRootDir) => {
			if (!expertId || !expertRootDir) return;
			runBackgroundExpertImportSecurityCheck({
				expertFacade,
				expertId,
				expertRootDir
			}).catch(() => void 0);
		}, [expertFacade]);
		(0, import_react$1.useEffect)(() => {
			asyncSecurityScanService.setAdapter(adapter);
		}, [adapter]);
		const requestOverwriteConfirm = (0, import_react$1.useCallback)((expertName) => new Promise((resolve) => {
			if (overwriteResolverRef.current) overwriteResolverRef.current(false);
			overwriteResolverRef.current = resolve;
			setOverwriteRequest(expertName);
		}), []);
		const resolveOverwriteConfirm = (0, import_react$1.useCallback)((confirmed) => {
			const resolver = overwriteResolverRef.current;
			overwriteResolverRef.current = null;
			setOverwriteRequest(null);
			resolver?.(confirmed);
		}, []);
		const showSecurityCheckingDialog = (0, import_react$1.useCallback)(() => {
			securityDialogShownAtRef.current = Date.now();
			setSecurityCheckingVisible(true);
		}, []);
		const hideSecurityCheckingDialog = (0, import_react$1.useCallback)(async () => {
			const shownAt = securityDialogShownAtRef.current;
			const elapsed = shownAt ? Date.now() - shownAt : IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS;
			if (elapsed < IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS) await new Promise((resolve) => setTimeout(resolve, IMPORT_SECURITY_DIALOG_MIN_VISIBLE_MS - elapsed));
			securityDialogShownAtRef.current = null;
			setSecurityCheckingVisible(false);
		}, []);
		const closeSecurityDialog = (0, import_react$1.useCallback)((cancelPendingTask) => {
			setSecurityState((prev) => {
				if (cancelPendingTask && prev?.scanResult.verdict === "" && prev.preCheck.md5) asyncSecurityScanService.removeTask(prev.preCheck.md5);
				return null;
			});
			securityDialogShownAtRef.current = null;
			setSecurityCheckingVisible(false);
			setAutoInstallNonHighRisk(false);
			skipSecurityInstallWhenReadyRef.current = false;
		}, []);
		const installFromPathAfterSecurityCheck = (0, import_react$1.useCallback)(async (options) => {
			const activeSecurityState = options.state ?? securityState;
			if (!expertFacade?.installFromPath || !activeSecurityState?.preCheck.selectedPath) return;
			const { isSkipScan, suppressSuccessToast = false } = options;
			const { detail, preCheck, installName, usedOverwrite } = activeSecurityState;
			const pendingMd5 = isSkipScan && preCheck.md5 ? preCheck.md5 : void 0;
			console.info("[App][ExpertImport][security] install from checked path start", {
				expertName: detail.expertName,
				installName,
				md5: preCheck.md5,
				selectedPath: preCheck.selectedPath,
				isSkipScan,
				suppressSuccessToast,
				usedOverwrite
			});
			if (isSkipScan) closeSecurityDialog(false);
			const runInstall = async (overwrite) => expertFacade.installFromPath({
				zipPath: preCheck.selectedPath,
				expertName: detail.expertName,
				overwrite
			});
			try {
				let result = await runInstall(usedOverwrite);
				console.info("[App][ExpertImport][security] install from checked path result", {
					success: !!result?.success,
					expertId: result?.expertId,
					localPath: result?.localPath,
					errorKey: result?.errorKey,
					errorMessage: result?.errorMessage,
					overwrite: usedOverwrite
				});
				if (!result?.success && result?.errorKey === "duplicate_expert" && !usedOverwrite) {
					const duplicateName = result.expertId || detail.expertName;
					if (!await isExpertOwnedByCurrentUser(duplicateName)) {
						if (pendingMd5) asyncSecurityScanService.updateTask(pendingMd5, {
							skillName: duplicateName,
							skillFilePath: result.localPath || preCheck.selectedPath
						});
						await rememberInstalledExpert(duplicateName);
						reportInstallSucceeded(duplicateName);
						closeSecurityDialog(false);
						setExpertImportRequest(null);
						onExpertInstallSuccess?.();
						toast.success(t("expertCenter.import.success", { name: duplicateName }));
						return;
					}
					if (!await requestOverwriteConfirm(duplicateName)) return;
					result = await runInstall(true);
					console.info("[App][ExpertImport][security] overwrite install from checked path result", {
						success: !!result?.success,
						expertId: result?.expertId,
						localPath: result?.localPath,
						errorKey: result?.errorKey,
						errorMessage: result?.errorMessage
					});
				}
				if (!result?.success) {
					if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
					showImportSkillError(result?.errorMessage || result?.errorKey || "installFromUrlFailed");
					return;
				}
				if (pendingMd5) asyncSecurityScanService.updateTask(pendingMd5, {
					skillName: result.expertId || detail.expertName,
					skillFilePath: result.localPath || preCheck.selectedPath
				});
				const finalExpertName = result.expertId || detail.expertName;
				await rememberInstalledExpert(result.expertId || finalExpertName);
				reportInstallSucceeded(finalExpertName);
				closeSecurityDialog(false);
				setExpertImportRequest(null);
				onExpertInstallSuccess?.();
				toast.success(t("expertCenter.import.success", { name: finalExpertName }));
			} catch (error) {
				if (pendingMd5) asyncSecurityScanService.removeTask(pendingMd5);
				showImportSkillError(error instanceof Error ? error.message : "installFromUrlFailed");
			}
		}, [
			closeSecurityDialog,
			expertFacade,
			isExpertOwnedByCurrentUser,
			onExpertInstallSuccess,
			rememberInstalledExpert,
			reportInstallSucceeded,
			requestOverwriteConfirm,
			securityState,
			t
		]);
		const isPendingAsync = isSecurityScanPending(securityState);
		const isHighRisk = isSecurityHighRisk(securityState);
		useScanResultSubscription(isPendingAsync ? securityState?.preCheck.md5 || null : null, (0, import_react$1.useCallback)((result) => {
			console.info("[App][ExpertImport][security] pending scan result arrived", {
				md5: result.md5,
				verdict: result.verdict,
				riskLevel: result.riskLevel,
				threatLevel: result.threatLevel,
				staticAnalysisStatus: result.staticAnalysisStatus
			});
			setSecurityState((prev) => {
				if (!prev || prev.preCheck.md5 !== result.md5) {
					console.warn("[App][ExpertImport][security] ignore scan result: state mismatch", {
						resultMd5: result.md5,
						stateMd5: prev?.preCheck.md5,
						hasState: !!prev
					});
					return prev;
				}
				return {
					...prev,
					scanResult: result
				};
			});
			if (autoInstallNonHighRisk && isNonHighRiskCompletedResult(result)) {
				console.info("[App][ExpertImport][security] non-high-risk result arrived, continue install automatically", {
					md5: result.md5,
					verdict: result.verdict,
					riskLevel: result.riskLevel,
					autoInstallNonHighRisk
				});
				installFromPathAfterSecurityCheck({ isSkipScan: false }).catch((error) => {
					console.warn("[App][ExpertImport][security] auto install after security result failed", error);
				});
			}
		}, [autoInstallNonHighRisk, installFromPathAfterSecurityCheck]));
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
			console.info("[App][ExpertImport][security] dialog confirm", {
				md5: securityState.preCheck.md5,
				verdict: securityState.scanResult.verdict,
				riskLevel: securityState.scanResult.riskLevel,
				threatLevel: securityState.scanResult.threatLevel,
				isPendingAsync,
				highRiskCountdown
			});
			if (isPendingAsync) {
				installFromPathAfterSecurityCheck({ isSkipScan: true }).catch((error) => {
					console.warn("[App][ExpertImport][security] skip scan install failed", error);
				});
				return;
			}
			if (highRiskCountdown > 0) return;
			installFromPathAfterSecurityCheck({ isSkipScan: false }).catch((error) => {
				console.warn("[App][ExpertImport][security] continue risk install failed", error);
			});
		}, [
			highRiskCountdown,
			installFromPathAfterSecurityCheck,
			isPendingAsync,
			securityState
		]);
		const handleSkipSecurityCheckInstall = (0, import_react$1.useCallback)(() => {
			if (securityState && isPendingAsync) {
				handleRiskDialogConfirm();
				return;
			}
			skipSecurityInstallWhenReadyRef.current = true;
		}, [
			handleRiskDialogConfirm,
			isPendingAsync,
			securityState
		]);
		const riskDialogProps = (0, import_react$1.useMemo)(() => buildSecurityScanDialogProps({
			state: securityState,
			highRiskCountdown,
			t
		}), [
			highRiskCountdown,
			securityState,
			t
		]);
		(0, import_react$1.useEffect)(() => {
			let cancelled = false;
			setExpertShareMetadata(null);
			const request = expertImportRequest;
			if (!request?.shareCode) {
				setExpertShareMetadataLoading(false);
				return;
			}
			const shareCode = request.shareCode;
			const backend = adapter?.getBackendProvider?.();
			const loadMetadata = async () => {
				setExpertShareMetadataLoading(true);
				let metadata = null;
				const getShareDetail = backend?.getShareDetail?.bind(backend) ?? adapter?.getShareDetail?.bind(adapter);
				const verifyShare = backend?.verifyShare?.bind(backend) ?? adapter?.verifyShare?.bind(adapter);
				console.info("[App][ExpertImport] preview metadata loading started", {
					expertName: request.expertName,
					hasShareCode: !!shareCode,
					hasGetShareDetail: !!getShareDetail,
					hasVerifyShare: !!verifyShare,
					hasPreviewExpertFromUrl: !!expertFacade?.previewFromUrl
				});
				let shareDetailData = null;
				if (getShareDetail) try {
					const detailResult = await getShareDetail(shareCode);
					shareDetailData = resolveShareDetailData(detailResult);
					metadata = parseExpertShareMetadata(detailResult);
					console.info("[App][ExpertImport] share detail metadata result", {
						hasMetadata: !!metadata,
						hasData: !!detailResult?.data,
						inodeCount: shareDetailData?.inodes?.length ?? 0,
						error: detailResult?.error || shareDetailData?.error
					});
				} catch (error) {
					console.warn("[App][ExpertImport] failed to load share metadata:", error);
				}
				if (!metadata && expertFacade?.previewFromUrl) {
					let previewDownloadUrl;
					if (shareDetailData?.inodes?.[0] && verifyShare) try {
						const verifyRes = await verifyShare({ shareCode });
						const accessToken = "error" in verifyRes ? "" : verifyRes.accessToken;
						previewDownloadUrl = accessToken ? getSourceUrl(SMH_HOST, shareCode, shareDetailData.inodes[0], accessToken) : void 0;
						console.info("[App][ExpertImport] public preview URL resolved", {
							success: !!previewDownloadUrl,
							hasInode: !!shareDetailData.inodes[0],
							error: "error" in verifyRes ? verifyRes.error : void 0
						});
					} catch (error) {
						console.warn("[App][ExpertImport] failed to resolve public preview URL:", error);
					}
					if (previewDownloadUrl) {
						const previewRes = await expertFacade.previewFromUrl({
							downloadUrl: previewDownloadUrl,
							expertName: request.expertName
						});
						console.info("[App][ExpertImport] zip preview metadata result", {
							success: !!previewRes?.success,
							hasMetadata: !!previewRes?.metadata,
							errorKey: previewRes?.errorKey,
							errorMessage: previewRes?.errorMessage
						});
						if (previewRes?.success && previewRes.metadata) metadata = previewRes.metadata;
					} else console.warn("[App][ExpertImport] skip zip preview: missing preview download URL");
				}
				if (!cancelled) {
					console.info("[App][ExpertImport] preview metadata loading finished", { hasMetadata: !!metadata });
					setExpertShareMetadata(metadata);
					setExpertShareMetadataLoading(false);
				}
			};
			loadMetadata().catch((error) => {
				if (!cancelled) {
					console.warn("[App][ExpertImport] failed to load expert preview metadata:", error);
					setExpertShareMetadata(null);
					setExpertShareMetadataLoading(false);
				}
			});
			return () => {
				cancelled = true;
			};
		}, [
			adapter,
			expertFacade,
			expertImportRequest
		]);
		const handleExpertImportConfirm = (0, import_react$1.useCallback)(async () => {
			const detail = expertImportRequest;
			if (!detail || expertImportLoading) return;
			if (!detail.shareCode) {
				toast.error(t("expertCenter.import.missingDownloadUrl"));
				return;
			}
			if (!expertFacade?.importFromUrl) {
				showImportSkillError("Install expert from URL is not available in current mode");
				return;
			}
			skipSecurityInstallWhenReadyRef.current = false;
			setSecurityState(null);
			setAutoInstallNonHighRisk(false);
			showSecurityCheckingDialog();
			setExpertImportLoading(true);
			/**
			* 通过公开分享详情 + verifyShare 生成本次安装可用的临时 source URL。
			*/
			const resolveDownloadUrl = async () => {
				const backend = adapter?.getBackendProvider?.();
				const getShareDetail = backend?.getShareDetail?.bind(backend) ?? adapter?.getShareDetail?.bind(adapter);
				const verifyShare = backend?.verifyShare?.bind(backend) ?? adapter?.verifyShare?.bind(adapter);
				if (!getShareDetail || !verifyShare || !detail.shareCode) return { error: "shareCode resolution is not available in current mode" };
				try {
					const shareDetail = resolveShareDetailData(await getShareDetail(detail.shareCode));
					const inode = shareDetail?.inodes?.[0];
					if (!inode) return { error: shareDetail?.error || "No file inode found in share detail" };
					const verifyRes = await verifyShare({ shareCode: detail.shareCode });
					if ("error" in verifyRes || !verifyRes.accessToken) return { error: "error" in verifyRes ? verifyRes.error : "Failed to verify share" };
					return { url: getSourceUrl(SMH_HOST, detail.shareCode, inode, verifyRes.accessToken) };
				} catch (error) {
					return { error: error instanceof Error ? error.message : String(error) };
				}
			};
			const runInstall = async (downloadUrl, overwrite, securityCheck) => expertFacade.importFromUrl({
				downloadUrl,
				expertName: detail.expertName,
				overwrite,
				securityCheck
			});
			try {
				const resolved = await resolveDownloadUrl();
				if (!resolved.url) {
					showImportSkillError(resolved.error || "installFromUrlFailed");
					await hideSecurityCheckingDialog();
					return;
				}
				let result = await runInstall(resolved.url, false, true);
				console.info("[App][ExpertImport][security] initial install from url result", {
					success: !!result?.success,
					expertId: result?.expertId,
					localPath: result?.localPath,
					errorKey: result?.errorKey,
					errorMessage: result?.errorMessage,
					hasPreCheck: !!result?.preCheck
				});
				let usedOverwrite = false;
				if (!result?.success && result?.errorKey === "security_check_blocked" && result.preCheck) {
					const preCheck = result.preCheck;
					const scanResult = preCheck.scanResult || createPendingSecurityScanResult(preCheck.md5);
					console.info("[App][ExpertImport][security] blocked by preCheck", {
						md5: preCheck.md5,
						hashHit: preCheck.hashHit,
						selectedPath: preCheck.selectedPath,
						preCheckError: preCheck.error,
						verdict: scanResult.verdict,
						riskLevel: scanResult.riskLevel,
						threatLevel: scanResult.threatLevel,
						staticAnalysisStatus: scanResult.staticAnalysisStatus
					});
					const nextSecurityState = {
						detail,
						installName: detail.expertName,
						usedOverwrite,
						preCheck,
						scanResult
					};
					setAutoInstallNonHighRisk(false);
					setSecurityState(nextSecurityState);
					if (preCheck.md5 && !scanResult.verdict) {
						console.info("[App][ExpertImport][security] add pending scan task", {
							md5: preCheck.md5,
							expertName: detail.expertName,
							selectedPath: preCheck.selectedPath
						});
						asyncSecurityScanService.addTask({
							md5: preCheck.md5,
							skillName: detail.expertName,
							skillFilePath: preCheck.selectedPath,
							startTime: Date.now()
						});
						if (skipSecurityInstallWhenReadyRef.current) {
							skipSecurityInstallWhenReadyRef.current = false;
							installFromPathAfterSecurityCheck({
								isSkipScan: true,
								state: nextSecurityState
							}).catch((error) => {
								console.warn("[App][ExpertImport][security] pending skip install failed", error);
							});
						}
					} else {
						skipSecurityInstallWhenReadyRef.current = false;
						await hideSecurityCheckingDialog();
						if (autoInstallNonHighRisk && isNonHighRiskCompletedResult(scanResult)) installFromPathAfterSecurityCheck({
							isSkipScan: false,
							state: nextSecurityState
						}).catch((error) => {
							console.warn("[App][ExpertImport][security] sync auto install after security result failed", error);
						});
					}
					return;
				}
				if (!result?.success && result?.errorKey === "duplicate_expert") {
					await hideSecurityCheckingDialog();
					const duplicateName = result.expertId || detail.expertName;
					if (!await isExpertOwnedByCurrentUser(duplicateName)) {
						await rememberInstalledExpert(duplicateName);
						reportInstallSucceeded(duplicateName);
						startBackgroundImportSecurityCheck(duplicateName, result.localPath);
						setExpertImportRequest(null);
						onExpertInstallSuccess?.();
						toast.success(t("expertCenter.import.success", { name: duplicateName }));
						return;
					}
					if (!await requestOverwriteConfirm(duplicateName)) return;
					usedOverwrite = true;
					const refreshed = await resolveDownloadUrl();
					if (!refreshed.url) {
						showImportSkillError(refreshed.error || "installFromUrlFailed");
						await hideSecurityCheckingDialog();
						return;
					}
					result = await runInstall(refreshed.url, true, true);
					if (!result?.success && result?.errorKey === "security_check_blocked" && result.preCheck) {
						const preCheck = result.preCheck;
						const scanResult = preCheck.scanResult || createPendingSecurityScanResult(preCheck.md5);
						const nextSecurityState = {
							detail,
							installName: detail.expertName,
							usedOverwrite,
							preCheck,
							scanResult
						};
						setAutoInstallNonHighRisk(false);
						setSecurityState(nextSecurityState);
						if (preCheck.md5 && !scanResult.verdict) {
							asyncSecurityScanService.addTask({
								md5: preCheck.md5,
								skillName: detail.expertName,
								skillFilePath: preCheck.selectedPath,
								startTime: Date.now()
							});
							if (skipSecurityInstallWhenReadyRef.current) {
								skipSecurityInstallWhenReadyRef.current = false;
								installFromPathAfterSecurityCheck({
									isSkipScan: true,
									state: nextSecurityState
								}).catch((error) => {
									console.warn("[App][ExpertImport][security] overwrite pending skip install failed", error);
								});
							}
						} else {
							skipSecurityInstallWhenReadyRef.current = false;
							await hideSecurityCheckingDialog();
							if (autoInstallNonHighRisk && isNonHighRiskCompletedResult(scanResult)) installFromPathAfterSecurityCheck({
								isSkipScan: false,
								state: nextSecurityState
							}).catch((error) => {
								console.warn("[App][ExpertImport][security] overwrite sync auto install after security result failed", error);
							});
						}
						return;
					}
				}
				if (!result?.success) {
					showImportSkillError(result?.errorMessage || result?.errorKey || "installFromUrlFailed");
					await hideSecurityCheckingDialog();
					return;
				}
				await hideSecurityCheckingDialog();
				const finalExpertName = result.expertId || detail.expertName;
				await rememberInstalledExpert(result.expertId || finalExpertName);
				reportInstallSucceeded(finalExpertName);
				startBackgroundImportSecurityCheck(finalExpertName, result.localPath);
				setExpertImportRequest(null);
				onExpertInstallSuccess?.();
				toast.success(t("expertCenter.import.success", { name: finalExpertName }));
			} catch (error) {
				showImportSkillError(error instanceof Error ? error.message : "installFromUrlFailed");
				await hideSecurityCheckingDialog();
			} finally {
				setExpertImportLoading(false);
			}
		}, [
			adapter,
			autoInstallNonHighRisk,
			expertFacade,
			expertImportLoading,
			expertImportRequest,
			hideSecurityCheckingDialog,
			installFromPathAfterSecurityCheck,
			isExpertOwnedByCurrentUser,
			onExpertInstallSuccess,
			rememberInstalledExpert,
			reportInstallSucceeded,
			requestOverwriteConfirm,
			showSecurityCheckingDialog,
			startBackgroundImportSecurityCheck,
			t
		]);
		const handleExpertInstallIntent = (0, import_react$1.useCallback)((data) => {
			const detail = data;
			if (!detail?.expertName || !detail.shareCode) {
				console.warn("[App][ExpertInstallIntent] ignore invalid intent payload", detail);
				return;
			}
			setExpertImportRequest(detail);
		}, []);
		(0, import_react$1.useEffect)(() => {
			const unsubscribePending = subscribePendingExpertInstallIntent(handleExpertInstallIntent);
			if (!adapter) return unsubscribePending;
			const unsubscribeAdapter = adapter.on("expert-install-intent", handleExpertInstallIntent);
			return () => {
				unsubscribeAdapter();
				unsubscribePending();
			};
		}, [adapter, handleExpertInstallIntent]);
		const overwriteDialogProps = (0, import_react$1.useMemo)(() => ({
			visible: !!overwriteRequest,
			title: t("expertCenter.import.overwrite.title"),
			content: t("expertCenter.import.overwrite.content", { name: overwriteRequest || "" }),
			confirmText: t("expertCenter.import.overwrite.confirm"),
			cancelText: t("common.cancel"),
			confirmVariant: "danger"
		}), [overwriteRequest, t]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExpertImportModal, {
				request: expertImportRequest,
				metadata: expertShareMetadata,
				metadataLoading: expertShareMetadataLoading,
				categories: importCategories,
				loading: expertImportLoading,
				onConfirm: handleExpertImportConfirm,
				onClose: () => {
					setExpertImportRequest(null);
				},
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
				visible: overwriteDialogProps.visible,
				title: overwriteDialogProps.title,
				content: overwriteDialogProps.content,
				confirmText: overwriteDialogProps.confirmText,
				cancelText: overwriteDialogProps.cancelText,
				confirmVariant: overwriteDialogProps.confirmVariant,
				onConfirm: () => {
					resolveOverwriteConfirm(true);
				},
				onClose: () => {
					resolveOverwriteConfirm(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ExpertImportSecurityCheckingModal, {
				visible: securityCheckingVisible && (!securityState || isPendingAsync),
				autoInstallNonHighRisk,
				onAutoInstallNonHighRiskChange: setAutoInstallNonHighRisk,
				onSkipInstall: handleSkipSecurityCheckInstall,
				onClose: () => closeSecurityDialog(true),
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ConfirmDialog, {
				visible: !!securityState && !isPendingAsync,
				title: riskDialogProps.title,
				content: riskDialogProps.content,
				confirmText: riskDialogProps.confirmText,
				cancelText: riskDialogProps.cancelText,
				confirmVariant: "primary",
				confirmButtonColor: "var(--cb-button-dark-background)",
				onConfirm: handleRiskDialogConfirm,
				onClose: () => closeSecurityDialog(true),
				confirmDisabled: isHighRisk && highRiskCountdown > 0
			})
		] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/expert/services.tsx
function ExpertServices() {
	const host = useModuleHost();
	const handleExpertInstallSuccess = import_react.useCallback(() => {
		window.dispatchEvent(new Event("workbuddy:open-my-experts"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpertInstallIntentCoordinator, {
		adapter: host.adapter,
		onExpertInstallSuccess: handleExpertInstallSuccess
	});
}
var import_react, import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_module_host_context();
	init_expert_install_intent_coordinator();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { ExpertServices };
