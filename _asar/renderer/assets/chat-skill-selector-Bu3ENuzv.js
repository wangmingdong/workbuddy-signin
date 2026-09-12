import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Bc as DropdownArrowIcon, Wc as init_icons } from "./agent-mail-CiuzbR2o.js";
import { Ga as FloatingPortal, Ha as floatingAutoUpdateWithAnimationFrame, Ja as useClick, Qa as useInteractions, Ya as useDismiss, Yr as toast, eo as useRole, io as shift, no as flip, ro as offset, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { b as isWorkBuddyDesktop, p as init_environment } from "./environment-DKqg3f0G.js";
import { n as useFloating, t as init_floating } from "./floating-1_OFz6f-.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { r as init_icons$1, w as SkillIcon } from "./oauth-callback-IQ0UCaVX.js";
import { M as init_use_delayed_visible, N as useDelayedVisible, S as init_use_installed_skills, T as PersonalSkillImportModal, r as useSkillUploadModal, t as init_components, w as usePersonalSkillImport, x as buildPolicyDeniedMessage } from "./components-2rgQGZi4.js";
import { n as extractSkillDirName, r as init_SkillAvatar, t as SkillAvatar } from "./SkillAvatar-CEySvDFr.js";
import { n as useSkillSelector, t as init_use_skill_selector } from "./use-skill-selector-9juSRmYZ.js";
//#region ../../packages/agent-ui/src/components/chat-skill-selector/skill-selector.less
var init_skill_selector$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-skill-selector/skill-selector.tsx
var import_react, import_jsx_runtime, SkillSelector, SearchIcon, ImportIcon;
var init_skill_selector = __esmMin((() => {
	init_skill_selector$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_floating();
	init_use_delayed_visible();
	init_useI18n();
	init_components();
	init_use_installed_skills();
	init_environment();
	init_icons$1();
	init_SkillAvatar();
	init_icons();
	init_use_skill_selector();
	import_jsx_runtime = require_jsx_runtime();
	SkillSelector = ({ addContentBlocks, cwd, compact = false, projectId, className }) => {
		const t = useTranslation();
		const isDesktop = isWorkBuddyDesktop();
		const { filteredSkills, loading, searchKeyword, setSearchKeyword, selectSkill, refreshSkills, uploading, uploadPolicy, refreshUploadPolicy } = useSkillSelector(cwd, { projectId });
		const importFlow = usePersonalSkillImport({
			scanEnabled: true,
			onSuccess: () => {
				refreshSkills();
			}
		});
		const showUploadOverlay = useDelayedVisible(importFlow.uploading, 3e3);
		const { openPersonal } = useSkillUploadModal();
		const [isOpen, setIsOpen] = (0, import_react.useState)(false);
		const { refs, floatingStyles, context } = useFloating({
			open: isOpen,
			onOpenChange: (open) => {
				setIsOpen(open);
				if (open) {
					refreshSkills();
					refreshUploadPolicy().catch(() => void 0);
				} else setSearchKeyword("");
			},
			placement: "top-start",
			middleware: [
				offset(6),
				flip(),
				shift({ padding: 8 })
			],
			whileElementsMounted: floatingAutoUpdateWithAnimationFrame,
			strategy: "fixed"
		});
		const { getReferenceProps, getFloatingProps } = useInteractions([
			useClick(context),
			useDismiss(context),
			useRole(context, { role: "menu" })
		]);
		const handleSelectSkill = (0, import_react.useCallback)((skill) => {
			const block = selectSkill(skill);
			addContentBlocks?.(block);
			setIsOpen(false);
			setSearchKeyword("");
		}, [
			selectSkill,
			addContentBlocks,
			setSearchKeyword
		]);
		/**
		* 导入技能：
		* - Desktop：与"专家 → 技能 → 添加技能"完全相同的代码路径
		*   （usePersonalSkillImport.handleImportSkill → 弹 PersonalSkillImportModal）
		* - Web：走 cloud-upload-modal（multipart + 轮询）
		*
		* **last-mile policy check**（与 SkillsPanel 的 handleImportSkill 行为对齐）：
		* dropdown 打开时的 `refreshUploadPolicy()` 是 fire-and-forget，可能尚未返回；
		* 即使返回了，subject 上的 latest 也可能在用户点击瞬间已被收紧。点击「导入」
		* 一刻必须再 await 一次最新策略，拒绝时直接 toast 报错、不打开弹窗 / 不走云端上传，
		* 避免「按钮可见、点开后被后端拒」的体验。
		*/
		const handleImport = (0, import_react.useCallback)(async () => {
			setIsOpen(false);
			const policy = await refreshUploadPolicy();
			if (policy && !policy.allowed) {
				toast.error(buildPolicyDeniedMessage(t, policy.reason));
				return;
			}
			if (isDesktop) {
				importFlow.handleImportSkill();
				return;
			}
			openPersonal({ onSuccess: () => {
				refreshSkills();
			} });
		}, [
			isDesktop,
			importFlow,
			refreshSkills,
			openPersonal,
			refreshUploadPolicy,
			t
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `skill-selector${className ? ` ${className}` : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					ref: refs.setReference,
					className: `skill-selector__btn${compact ? " skill-selector__btn--compact" : ""}`,
					...getReferenceProps(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillIcon, {
							width: 16,
							height: 16
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "skill-selector__label",
							children: t("skill.label")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownArrowIcon, {})
					]
				}),
				isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: refs.setFloating,
					className: `skill-selector__dropdown${className ? ` ${className}__dropdown` : ""}`,
					style: floatingStyles,
					...getFloatingProps(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skill-selector__search",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "skill-selector__search-input",
								type: "text",
								placeholder: t("skill.searchPlaceholder"),
								value: searchKeyword,
								onChange: (e) => setSearchKeyword(e.target.value),
								autoFocus: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "skill-selector__search-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skill-selector__list",
							children: [
								loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "skill-selector__loading",
									children: t("common.loading")
								}),
								!loading && filteredSkills.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "skill-selector__empty",
									children: t("skill.noSkillsFound")
								}),
								!loading && filteredSkills.map((skill) => {
									const metaIconSource = (skill.iconSource || "").trim();
									const iconUrlFromSource = /^https?:\/\//i.test(metaIconSource) ? metaIconSource : void 0;
									const resolvedIconUrl = skill.iconUrl || iconUrlFromSource;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "skill-selector__item",
										onClick: () => handleSelectSkill(skill),
										"data-track-id": "skill_select",
										"data-track-name": "选择技能",
										"data-track-props": JSON.stringify({
											source: skill.name,
											type: "task_input"
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "skill-selector__item-icon",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillAvatar, {
												name: skill.name,
												source: skill.iconSource || skill.slug || extractSkillDirName(skill.filePath),
												iconUrl: resolvedIconUrl,
												marketplaceSource: skill.marketplaceSource,
												size: 16
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "skill-selector__item-content",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "skill-selector__item-name",
												children: skill.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "skill-selector__item-desc",
												children: skill.description || "-"
											})]
										})]
									}, skill.filePath);
								})
							]
						}),
						uploadPolicy?.allowed !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `skill-selector__footer${uploading ? " skill-selector__footer--disabled" : ""}`,
							onClick: uploading ? void 0 : handleImport,
							"aria-disabled": uploading || void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "skill-selector__import-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportIcon, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploading ? t("skill.uploading") : t("skill.importSkill") })]
						})
					]
				}) }),
				isDesktop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonalSkillImportModal, {
					flow: importFlow,
					scanEnabled: true,
					showUploadOverlay
				})
			]
		});
	};
	SearchIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6.41667 11.0833C8.994 11.0833 11.0833 8.994 11.0833 6.41667C11.0833 3.83934 8.994 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.994 3.83934 11.0833 6.41667 11.0833Z",
			stroke: "currentColor",
			strokeWidth: "1.16667",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12.25 12.25L9.71252 9.7125",
			stroke: "currentColor",
			strokeWidth: "1.16667",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	ImportIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13.333 13.3333C13.6866 13.3333 14.0258 13.1929 14.2758 12.9428C14.5259 12.6928 14.6663 12.3536 14.6663 12V5.33333C14.6663 4.97971 14.5259 4.64057 14.2758 4.39052C14.0258 4.14048 13.6866 4 13.333 4H8.06634C7.84335 4.00219 7.62337 3.94841 7.42654 3.84359C7.22971 3.73877 7.06231 3.58625 6.93967 3.4L6.39967 2.6C6.27827 2.41565 6.11299 2.26432 5.91867 2.1596C5.72436 2.05488 5.50708 2.00004 5.28634 2H2.66634C2.31272 2 1.97358 2.14048 1.72353 2.39052C1.47348 2.64057 1.33301 2.97971 1.33301 3.33333V12C1.33301 12.3536 1.47348 12.6928 1.72353 12.9428C1.97358 13.1929 2.31272 13.3333 2.66634 13.3333H13.333Z",
				stroke: "currentColor",
				strokeWidth: "0.666667",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 6.66675V10.6667",
				stroke: "currentColor",
				strokeWidth: "0.666667",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6 8.66675L8 6.66675L10 8.66675",
				stroke: "currentColor",
				strokeWidth: "0.666667",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/chat-skill-selector/index.ts
var init_chat_skill_selector = __esmMin((() => {
	init_skill_selector();
}));
//#endregion
export { SkillSelector as n, init_chat_skill_selector as t };
