import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Xl as init_services, Zl as useTencentDocsFacade, dd as init_use_is_enterprise_admin, fu as init_use_oneid_app_status, pd as useIsEnterpriseEdition, pu as useOneidAppStatus } from "./agent-mail-CiuzbR2o.js";
import { Ba as Tooltip, Yr as toast, k as Checkbox, ko as getFilePathSafe, t as init_src, xa as MentionSkeleton } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { D as Search, O as SearchX, _t as Ellipsis, r as X, t as init_lucide_react } from "./lucide-react-CmX0JwWL.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { t as require_zustand } from "./zustand-BGHu9tpa.js";
import { n as init_vanilla, t as createStore } from "./vanilla-BfruURAe.js";
import { k as useCurrentAccount, ot as copyToClipboard, st as init_clipboard, t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { S as Segmented, x as init_Segmented } from "./foundation-QOglV606.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { A as init_auth_guide, B as useTencentDocsStore, E as FileTypeIcon, G as init_constants, K as isFileViewModelCheckable, M as tencent_docs_default, O as init_file_type_icon, R as init_store, T as init_empty_state, X as SearchField, Y as ListType, Z as init_types, _ as init_utils, a as init_use_file_list, b as VirtualList, c as init_folder_breadcrumb, d as AddToTaskIcon, f as init_add_to_task_icon, h as formatTime, i as useFileSearch, j as init_tencent_docs, k as AuthGuide, l as init_tdoc_columns, m as ActionPopover, n as useTdocCheckAuthGate, o as useFileList, p as init_action_popover, r as init_use_file_search, s as FolderBreadcrumb, t as init_use_tdoc_check_auth_gate, u as useTDocColumns, w as EmptyState, x as init_file_list, z as tencentDocsStore } from "./use-tdoc-check-auth-gate-x9L7eHnu.js";
import { n as reportAttachTDocChooser, t as init_telemetry } from "./telemetry-DmUpjlLA.js";
import { n as init_header_workbuddy, t as header_workbuddy_default } from "./header-workbuddy-UO2zaYBA.js";
import { i as init_oneid_env, n as init_lazy_oneid_app_activation, r as ONEID_ENV, t as LazyOneidAppActivation } from "./lazy-oneid-app-activation-BEI6P8Nb.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-bar/search-bar.less
var init_search_bar$2 = __esmMin((() => {})), import_jsx_runtime$7, ClearIcon;
var init_clear_icon = __esmMin((() => {
	require_react();
	import_jsx_runtime$7 = require_jsx_runtime();
	ClearIcon = ({ size = 14, className }) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M8.00064 1.3335C4.31875 1.3335 1.33398 4.31827 1.33398 8.00017C1.33398 11.682 4.31874 14.6668 8.00064 14.6668C11.6826 14.6668 14.6673 11.682 14.6673 8.00017C14.6673 4.31827 11.6826 1.3335 8.00064 1.3335ZM5.40769 9.65035L4.93629 10.1217L5.8791 11.0645L6.3505 10.5931L8.00065 8.94301L9.65033 10.5927L10.1218 11.0641L11.0646 10.1213L10.5932 9.6499L8.94346 8.00021L10.5932 6.35052L11.0646 5.87911L10.1218 4.9363L9.65033 5.40771L8.00065 7.0574L6.3505 5.40725L5.8791 4.93585L4.93629 5.87866L5.40769 6.35006L7.05784 8.00021L5.40769 9.65035Z",
			fill: "currentColor"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-bar/search-bar.tsx
var import_react$7, import_jsx_runtime$6, SearchBar;
var init_search_bar$1 = __esmMin((() => {
	init_search_bar$2();
	init_lucide_react();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_clear_icon();
	import_jsx_runtime$6 = require_jsx_runtime();
	SearchBar = ({ onSearch, placeholder }) => {
		const t = useTranslation();
		const [value, setValue] = (0, import_react$7.useState)("");
		const [focused, setFocused] = (0, import_react$7.useState)(false);
		const [submitted, setSubmitted] = (0, import_react$7.useState)(false);
		const submit = (0, import_react$7.useCallback)(() => {
			const trimmed = value.trim();
			if (!trimmed) return;
			onSearch(trimmed);
			setSubmitted(true);
		}, [value, onSearch]);
		const handleKeyDown = (0, import_react$7.useCallback)((e) => {
			if (e.key === "Enter") submit();
		}, [submit]);
		const handleChange = (0, import_react$7.useCallback)((e) => {
			setValue(e.target.value);
			setSubmitted(false);
		}, []);
		const handleClear = (0, import_react$7.useCallback)(() => {
			setValue("");
			setSubmitted(false);
		}, []);
		const handleFocus = (0, import_react$7.useCallback)(() => setFocused(true), []);
		const handleBlur = (0, import_react$7.useCallback)(() => setFocused(false), []);
		const showTip = focused && value.trim().length > 0 && !submitted;
		const iconLabel = t("knowledgeBase.search.iconButtonLabel");
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "tencent-docs-search-bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					type: "button",
					className: "tencent-docs-search-bar__icon-btn",
					onClick: submit,
					onMouseDown: (e) => e.preventDefault(),
					disabled: !value.trim(),
					"aria-label": iconLabel,
					title: iconLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Search, {
						size: 16,
						strokeWidth: 1.5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("input", {
					className: "tencent-docs-search-bar__input",
					type: "text",
					value,
					onChange: handleChange,
					onKeyDown: handleKeyDown,
					onFocus: handleFocus,
					onBlur: handleBlur,
					placeholder: placeholder ?? t("knowledgeBase.search.placeholder")
				}),
				value && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
					className: "tencent-docs-search-bar__clear",
					onClick: handleClear,
					onMouseDown: (e) => e.preventDefault(),
					type: "button",
					"aria-label": t("common.clear"),
					title: t("common.clear"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ClearIcon, { size: 14 })
				}),
				showTip && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "tencent-docs-search-bar__tip",
					role: "tooltip",
					children: t("knowledgeBase.search.triggerTip")
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-bar/index.ts
var init_search_bar = __esmMin((() => {
	init_search_bar$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-result-modal/search-result-modal.less
var init_search_result_modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/shared/selection-bar.less
var init_selection_bar$1 = __esmMin((() => {})), import_jsx_runtime$5, SelectionBar;
var init_selection_bar = __esmMin((() => {
	init_selection_bar$1();
	require_react();
	init_useI18n();
	init_add_to_task_icon();
	import_jsx_runtime$5 = require_jsx_runtime();
	SelectionBar = ({ count, onAddToTask, addToTaskLabel, renderCount, className }) => {
		const t = useTranslation();
		if (count <= 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: className ? `tdoc-selection-bar ${className}` : "tdoc-selection-bar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "tdoc-selection-bar__count",
				children: renderCount ? renderCount(count) : t("tdoc.selection.count", { count })
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("button", {
				type: "button",
				className: "tdoc-selection-bar__btn",
				onClick: onAddToTask,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(AddToTaskIcon, {}), addToTaskLabel ?? t("tdoc.selection.addToTask")]
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/shared/index.ts
var init_shared = __esmMin((() => {
	init_selection_bar();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-result-modal/search-result-modal.tsx
var import_react$5, import_react_dom$2, import_jsx_runtime$4, SEARCH_TABS, highlightKeyword, ItemMoreButton, SearchResultModal;
var init_search_result_modal$1 = __esmMin((() => {
	init_search_result_modal$2();
	init_src();
	init_lucide_react();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_Segmented();
	init_useI18n();
	init_clipboard();
	init_constants();
	init_shared();
	init_types();
	init_utils();
	init_action_popover();
	init_add_to_task_icon();
	init_file_type_icon();
	import_jsx_runtime$4 = require_jsx_runtime();
	SEARCH_TABS = [{
		key: SearchField.FILE_NAME,
		labelKey: "knowledgeBase.search.tabFileName"
	}, {
		key: SearchField.OWNER_NAME,
		labelKey: "knowledgeBase.search.tabOwnerName"
	}];
	highlightKeyword = (text, keyword) => {
		if (!keyword) return text;
		const lowerText = text.toLowerCase();
		const lowerKeyword = keyword.toLowerCase();
		const index = lowerText.indexOf(lowerKeyword);
		if (index === -1) return text;
		const before = text.slice(0, index);
		const match = text.slice(index, index + keyword.length);
		const after = text.slice(index + keyword.length);
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [
			before,
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "search-result-modal__highlight",
				children: match
			}),
			after
		] });
	};
	ItemMoreButton = ({ file, items, onAction }) => {
		const [open, setOpen] = (0, import_react$5.useState)(false);
		const [menuPos, setMenuPos] = (0, import_react$5.useState)({
			top: 0,
			bottom: 0,
			left: 0
		});
		const btnRef = (0, import_react$5.useRef)(null);
		const handleToggle = (0, import_react$5.useCallback)((e) => {
			e.stopPropagation();
			setOpen((prev) => {
				if (!prev && btnRef.current) {
					const rect = btnRef.current.getBoundingClientRect();
					setMenuPos({
						top: rect.top,
						bottom: rect.bottom,
						left: rect.left + rect.width / 2
					});
				}
				return !prev;
			});
		}, []);
		const handleItemClick = (0, import_react$5.useCallback)((key) => {
			setOpen(false);
			onAction(key, file);
		}, [file, onAction]);
		const handleClose = (0, import_react$5.useCallback)(() => {
			setOpen(false);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
			ref: btnRef,
			className: "search-result-modal__item-more",
			type: "button",
			onClick: handleToggle,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Ellipsis, { size: 16 })
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ActionPopover, {
			open,
			anchorPos: menuPos,
			items,
			onItemClick: handleItemClick,
			onClose: handleClose,
			triggerRef: btnRef
		})] });
	};
	SearchResultModal = ({ fileSearch, onClose, hideRowActions = false, onAddToTask, onItemClick, onOpenFile }) => {
		const t = useTranslation();
		const [inputValue, setInputValue] = (0, import_react$5.useState)(fileSearch.keyword);
		const [checkedKeys, setCheckedKeys] = (0, import_react$5.useState)(/* @__PURE__ */ new Set());
		const segmentedOptions = (0, import_react$5.useMemo)(() => SEARCH_TABS.map((tab) => ({
			value: tab.key,
			label: t(tab.labelKey)
		})), [t]);
		const actionItems = (0, import_react$5.useMemo)(() => [{
			key: "open",
			label: t("tdoc.action.open")
		}, {
			key: "copyLink",
			label: t("tdoc.action.copyLink")
		}], [t]);
		const handleAction = (0, import_react$5.useCallback)((key, file) => {
			if (key === "open") onOpenFile?.(file);
			else if (key === "copyLink" && file.url) copyToClipboard(file.url).then((ok) => {
				if (ok) toast.success(t("tdoc.action.linkCopied"));
			});
		}, [t, onOpenFile]);
		(0, import_react$5.useEffect)(() => {
			const handleKeyDown = (e) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [onClose]);
		const handleTabChange = (0, import_react$5.useCallback)((field) => {
			fileSearch.setField(field);
			setCheckedKeys(/* @__PURE__ */ new Set());
		}, [fileSearch]);
		const handleKeyDown = (0, import_react$5.useCallback)((e) => {
			if (e.key === "Enter") {
				const trimmed = inputValue.trim();
				if (trimmed) {
					fileSearch.search(trimmed);
					setCheckedKeys(/* @__PURE__ */ new Set());
				}
			}
		}, [inputValue, fileSearch]);
		const handleClearInput = (0, import_react$5.useCallback)(() => {
			setInputValue("");
		}, []);
		const handleOverlayClick = (0, import_react$5.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		const handleScroll = (0, import_react$5.useCallback)((e) => {
			const target = e.currentTarget;
			if (target.scrollHeight - target.scrollTop - target.clientHeight < 100) fileSearch.loadMore();
		}, [fileSearch]);
		return (0, import_react_dom$2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "search-result-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "search-result-modal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
						className: "search-result-modal__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "search-result-modal__search-input",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Search, {
								className: "search-result-modal__search-icon",
								size: 16
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("input", {
								type: "text",
								value: inputValue,
								onChange: (e) => setInputValue(e.target.value),
								onKeyDown: handleKeyDown,
								placeholder: t("knowledgeBase.search.placeholder"),
								autoFocus: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "search-result-modal__header-actions",
							children: [inputValue && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
								className: "search-result-modal__input-clear",
								onClick: handleClearInput,
								type: "button",
								"aria-label": t("common.clear"),
								title: t("common.clear"),
								children: t("common.clear")
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "search-result-modal__header-divider",
								"aria-hidden": "true"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
								className: "search-result-modal__close",
								onClick: onClose,
								type: "button",
								"aria-label": t("common.close"),
								title: t("common.close"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(X, { size: 16 })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "search-result-modal__tabs",
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Segmented, {
							options: segmentedOptions,
							value: fileSearch.field,
							onChange: handleTabChange,
							"aria-label": t("knowledgeBase.search.placeholder")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
						className: "search-result-modal__body",
						onScroll: handleScroll,
						children: [
							fileSearch.loading && fileSearch.results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "search-result-modal__status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "search-result-modal__loading-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: t("common.loading") })]
							}),
							fileSearch.isTimeout && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "search-result-modal__status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "search-result-modal__status-text",
									children: t("knowledgeBase.search.timeout")
								}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
									className: "search-result-modal__retry-btn",
									onClick: () => fileSearch.search(fileSearch.keyword),
									type: "button",
									children: t("common.retry")
								})]
							}),
							fileSearch.error && !fileSearch.isTimeout && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "search-result-modal__status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "search-result-modal__status-text",
									children: fileSearch.error
								}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
									className: "search-result-modal__retry-btn",
									onClick: () => fileSearch.search(fileSearch.keyword),
									type: "button",
									children: t("common.retry")
								})]
							}),
							!fileSearch.loading && !fileSearch.isTimeout && !fileSearch.error && fileSearch.results.length === 0 && fileSearch.keyword && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "search-result-modal__status",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
										className: "search-result-modal__empty-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(SearchX, {
											size: 48,
											strokeWidth: 1,
											opacity: .3
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "search-result-modal__empty-title",
										children: t("knowledgeBase.search.emptyTitle")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "search-result-modal__empty-desc",
										children: t("knowledgeBase.search.emptyDescription")
									})
								]
							}),
							fileSearch.results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "search-result-modal__list",
								children: [
									fileSearch.results.map((file) => {
										const checkable = isFileViewModelCheckable(file);
										const checked = checkedKeys.has(file.id);
										const handleRowClick = () => {
											if (onItemClick) onItemClick(file);
											else if (onAddToTask && checkable) setCheckedKeys((prev) => {
												const next = new Set(prev);
												if (next.has(file.id)) next.delete(file.id);
												else next.add(file.id);
												return next;
											});
										};
										return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
											className: [
												"search-result-modal__item",
												checked ? "search-result-modal__item--checked" : "",
												onItemClick ? "search-result-modal__item--clickable" : ""
											].filter(Boolean).join(" "),
											onClick: handleRowClick,
											children: [
												onAddToTask && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
													className: "search-result-modal__item-checkbox",
													onClick: (e) => e.stopPropagation(),
													children: !checkable ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
														content: t("tdoc.selection.unsupportedType"),
														placement: "bottom",
														children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
															className: "search-result-modal__checkbox-wrapper",
															children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Checkbox, {
																size: "small",
																checked,
																disabled: !checkable,
																onChange: (val) => {
																	setCheckedKeys((prev) => {
																		const next = new Set(prev);
																		if (val) next.add(file.id);
																		else next.delete(file.id);
																		return next;
																	});
																}
															})
														})
													}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Checkbox, {
														size: "small",
														checked,
														disabled: !checkable,
														onChange: (val) => {
															setCheckedKeys((prev) => {
																const next = new Set(prev);
																if (val) next.add(file.id);
																else next.delete(file.id);
																return next;
															});
														}
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FileTypeIcon, {
													type: file.type,
													ext: file.ext,
													isFolder: file.isFolder,
													size: 24
												}),
												/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
													className: "search-result-modal__item-content",
													children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
														className: "search-result-modal__item-name-row",
														children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
															className: "search-result-modal__item-name",
															children: highlightKeyword(file.name, fileSearch.keyword)
														}), onAddToTask && checkable && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Tooltip, {
															content: t("tdoc.selection.addToTask"),
															placement: "bottom",
															children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
																className: "search-result-modal__add-task-btn",
																onClick: (e) => {
																	e.stopPropagation();
																	onAddToTask([file]);
																},
																children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AddToTaskIcon, { size: 14 })
															})
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
														className: "search-result-modal__item-meta",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: fileSearch.field === SearchField.OWNER_NAME ? highlightKeyword(file.ownerName, fileSearch.keyword) : file.ownerName }),
															/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
																className: "search-result-modal__item-meta-sep",
																children: "|"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: formatTime(file.modifiedTimeRaw) })
														]
													})]
												}),
												!hideRowActions && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ItemMoreButton, {
													file,
													items: actionItems,
													onAction: handleAction
												})
											]
										}, file.id);
									}),
									fileSearch.loading && fileSearch.results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
										className: "search-result-modal__load-more",
										children: t("common.loadingMore")
									}),
									!fileSearch.hasMore && fileSearch.results.length > 0 && !fileSearch.loading && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
										className: "search-result-modal__load-more",
										children: t("knowledgeBase.search.loadedAll")
									})
								]
							})
						]
					}),
					onAddToTask && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(SelectionBar, {
						count: checkedKeys.size,
						onAddToTask: () => {
							onAddToTask(fileSearch.results.filter((f) => checkedKeys.has(f.id)));
						}
					})
				]
			})
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/search-result-modal/index.ts
var init_search_result_modal = __esmMin((() => {
	init_search_result_modal$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/tdoc-import-iframe-modal.tsx
/**
* 从 preload 转发过来的腾讯文档 message 中提取 action 字段。
*
* 腾讯文档真正抛出的消息结构通常形如 `{ action: 1, ...payload }`，
* 但也存在外面套一层 `{ data: {...} }` 的可能（不同版本 / 不同子页面），
* 这里做鲁棒解析：自身有 number 类型 action 直接用，否则尝试常见包装层。
*/
function extractAction(raw) {
	const tryRead = (obj) => {
		if (obj && typeof obj === "object") {
			const a = obj.action;
			if (typeof a === "number") return a;
			if (typeof a === "string" && /^\d+$/.test(a)) return Number(a);
		}
		return null;
	};
	const candidates = [raw];
	if (raw && typeof raw === "object") {
		const obj = raw;
		candidates.push(obj.data, obj.payload, obj.detail);
	}
	for (const c of candidates) {
		const n = tryRead(c);
		if (n !== null && n >= 1 && n <= 6) return n;
	}
	return null;
}
var import_react$4, import_react_dom$1, import_jsx_runtime$3, SELECTOR_URL, TdocImportIframeModal;
var init_tdoc_import_iframe_modal = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	import_jsx_runtime$3 = require_jsx_runtime();
	SELECTOR_URL = "https://docs.qq.com/desktop?type=selector&maxNumber=20&showMoreActions=1";
	TdocImportIframeModal = ({ visible, onClose, onPicked }) => {
		const [preloadUrl, setPreloadUrl] = (0, import_react$4.useState)(void 0);
		const [authMode, setAuthMode] = (0, import_react$4.useState)(false);
		const [webviewReady, setWebviewReady] = (0, import_react$4.useState)(false);
		const webviewRef = (0, import_react$4.useRef)(null);
		const adapter = useAdapter();
		const openDevToolsRef = (0, import_react$4.useRef)(null);
		const isDevEnv = false;
		(0, import_react$4.useEffect)(() => {
			if (!visible) {
				setPreloadUrl(void 0);
				setAuthMode(false);
				setWebviewReady(false);
				return;
			}
			let cancelled = false;
			const resolver = window.__getTdocImportPreloadUrl;
			if (typeof resolver !== "function") {
				setPreloadUrl(null);
				return;
			}
			Promise.resolve().then(() => resolver()).then((url) => {
				if (cancelled) return;
				setPreloadUrl(typeof url === "string" && url.length > 0 ? url : null);
			}).catch(() => {
				if (cancelled) return;
				setPreloadUrl(null);
			});
			return () => {
				cancelled = true;
			};
		}, [visible]);
		(0, import_react$4.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (e) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [visible, onClose]);
		(0, import_react$4.useEffect)(() => {
			if (!visible || preloadUrl === void 0) return;
			const webview = webviewRef.current;
			if (!webview) return;
			const handleIpcMessage = (event) => {
				const evt = event;
				if (evt?.channel === "tdoc-import:open-external") {
					const linkPayload = evt.args?.[0];
					const url = linkPayload?.url;
					if (typeof url !== "string" || url.length === 0) return;
					console.info("[TdocImport] preload captured external link → browser", {
						url,
						reason: linkPayload?.reason,
						frame: linkPayload?.frame
					});
					if (adapter && typeof adapter.openExternal === "function") adapter.openExternal(url).catch((err) => {
						console.warn("[TdocImport] openExternal failed", err);
						window.open(url, "_blank", "noopener,noreferrer");
					});
					else window.open(url, "_blank", "noopener,noreferrer");
					return;
				}
				if (evt?.channel !== "tdoc-import:picked") return;
				const payload = evt.args?.[0];
				const raw = payload?.data;
				const action = extractAction(raw);
				console.info("[TdocImport] ipc-message", "action=", action, "origin=", payload?.origin, "frame=", payload?.frame, "data=", raw);
				if (action === null) return;
				switch (action) {
					case 1:
						setAuthMode(false);
						onPicked({
							action,
							raw
						});
						break;
					case 2:
						onClose();
						break;
					case 5:
						setAuthMode(false);
						break;
					case 3:
					case 4:
						setAuthMode(true);
						break;
					case 6:
						setAuthMode(false);
						break;
					default: ((_) => void 0)(action);
				}
			};
			const handleConsoleMessage = (event) => {
				const evt = event;
				const msg = evt?.message ?? "";
				if (msg.includes("[tdoc-import-preload]") || (evt?.level ?? 0) >= 2) console.info("[TdocImport][webview]", `lvl=${evt?.level}`, msg, evt?.sourceId ? `(${evt.sourceId}:${evt.line})` : "");
			};
			const handleDidFailLoad = (event) => {
				const evt = event;
				if (evt?.errorCode === -3) return;
				console.warn("[TdocImport] webview did-fail-load", evt);
			};
			const openGuestDevTools = () => {
				const wv = webviewRef.current;
				try {
					if (wv?.isDevToolsOpened?.()) return;
					wv?.openDevTools?.();
					console.info("[TdocImport] guest webview devtools opened");
				} catch (err) {
					console.warn("[TdocImport] openDevTools failed", err);
				}
			};
			openDevToolsRef.current = openGuestDevTools;
			const handleDomReady = () => {
				setWebviewReady(true);
				console.info("[TdocImport] webview dom-ready, preload =", preloadUrl, "| 点击右上角 DevTools 按钮 / Cmd+Ctrl+Shift+D 打开 guest DevTools");
			};
			const handleBeforeInput = (event) => {
				const evt = event;
				if (evt?.type !== "keyDown") return;
				if (!evt.shift) return;
				if (!(evt.control || evt.meta)) return;
				if (evt.key !== "D" && evt.key !== "d") return;
				openGuestDevTools();
			};
			const handleHostKeyDown = (e) => {
				if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "d" || e.key === "D")) {
					e.preventDefault();
					openGuestDevTools();
				}
			};
			webview.addEventListener("ipc-message", handleIpcMessage);
			webview.addEventListener("console-message", handleConsoleMessage);
			webview.addEventListener("did-fail-load", handleDidFailLoad);
			webview.addEventListener("dom-ready", handleDomReady);
			webview.addEventListener("before-input-event", handleBeforeInput);
			document.addEventListener("keydown", handleHostKeyDown);
			return () => {
				webview.removeEventListener("ipc-message", handleIpcMessage);
				webview.removeEventListener("console-message", handleConsoleMessage);
				webview.removeEventListener("did-fail-load", handleDidFailLoad);
				webview.removeEventListener("dom-ready", handleDomReady);
				webview.removeEventListener("before-input-event", handleBeforeInput);
				document.removeEventListener("keydown", handleHostKeyDown);
				openDevToolsRef.current = null;
			};
		}, [
			visible,
			preloadUrl,
			onPicked,
			onClose,
			adapter
		]);
		(0, import_react$4.useEffect)(() => () => {
			const webview = webviewRef.current;
			try {
				webview?.stop?.();
				if (webview) webview.src = "about:blank";
			} catch {}
		}, []);
		const handleOverlayClick = (0, import_react$4.useCallback)((e) => {
			if (e.target === e.currentTarget) onClose();
		}, [onClose]);
		if (!visible) return null;
		return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "tdoc-import-iframe-modal-overlay",
			onClick: handleOverlayClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "tdoc-import-iframe-modal" + (authMode ? " tdoc-import-iframe-modal--auth" : ""),
				children: [isDevEnv, preloadUrl !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("webview", {
					ref: webviewRef,
					className: "tdoc-import-iframe-modal__webview" + (webviewReady ? " tdoc-import-iframe-modal__webview--ready" : ""),
					src: SELECTOR_URL,
					...typeof preloadUrl === "string" ? { preload: preloadUrl } : {},
					partition: "persist:tdoc-import",
					webpreferences: "contextIsolation=yes,nodeIntegrationInSubFrames=yes",
					nodeintegration: false
				})]
			})
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/upload/document-upload-task-store.ts
/** 从 tasks 数组派生汇总；避免每次 selector 重新分配，使用记忆化 */
function selectSummary(tasks) {
	const summary = {
		total: tasks.length,
		uploading: 0,
		queued: 0,
		success: 0,
		failed: 0,
		cancelled: 0,
		overallPercent: 0,
		speedBytesPerSec: 0
	};
	let totalBytes = 0;
	let uploadedBytes = 0;
	let totalUploadingBytesPerSec = 0;
	const now = Date.now();
	for (const t of tasks) {
		switch (t.status) {
			case "uploading":
			case "retrying":
				summary.uploading += 1;
				if (t.startedAt) {
					const elapsedSec = Math.max((now - t.startedAt) / 1e3, .001);
					totalUploadingBytesPerSec += t.bytesUploaded / elapsedSec;
				}
				break;
			case "queued":
				summary.queued += 1;
				break;
			case "success":
				summary.success += 1;
				break;
			case "failed":
				summary.failed += 1;
				break;
			case "cancelled":
				summary.cancelled += 1;
				break;
			default: break;
		}
		totalBytes += t.size;
		uploadedBytes += t.bytesUploaded;
	}
	summary.overallPercent = totalBytes > 0 ? Math.min(100, Math.round(uploadedBytes / totalBytes * 100)) : 0;
	summary.speedBytesPerSec = Math.max(0, Math.round(totalUploadingBytesPerSec));
	return summary;
}
/**
* 构造浮窗内部使用的 folder.path / currentFolderPath。
*
* @param batchId 该 folder 所属的批次 id（task.batchId 或 task.id 兜底）
* @param realPath 批次内相对路径（不带末尾 /），空串表示批次根
*/
function buildFolderPath(batchId, realPath) {
	return `${batchId}${realPath}`;
}
/** 把浮窗里 folder.path / currentFolderPath 解回 (batchId, realPath) 二元组 */
function parseFolderPath(folderPath) {
	const idx = folderPath.indexOf("");
	if (idx === -1) return {
		batchId: "",
		realPath: folderPath
	};
	return {
		batchId: folderPath.slice(0, idx),
		realPath: folderPath.slice(idx + 1)
	};
}
/** 取出 task 用于 UI 分组的 batch 键：缺省时退回到 task.id（视作独立批次） */
function getTaskBatchKey(task) {
	return task.batchId ?? task.id;
}
function selectFolderView(tasks, currentFolderPath) {
	const { batchId: filterBatchId, realPath: currentRealPath } = currentFolderPath ? parseFolderPath(currentFolderPath) : {
		batchId: "",
		realPath: ""
	};
	const prefix = currentRealPath ? currentRealPath + "/" : "";
	const directFiles = [];
	/**
	* key = `${batchId}${SEP}${folderName}` —— 每个批次内的同名子文件夹独立成桶，
	* 跨批次同名文件夹（同时也是本 bug 的修复点）不再被合并到一起。
	*/
	const folderBuckets = /* @__PURE__ */ new Map();
	for (const t of tasks) {
		const taskBatchId = getTaskBatchKey(t);
		if (filterBatchId && taskBatchId !== filterBatchId) continue;
		if (currentRealPath && !t.relativePath.startsWith(prefix) && t.relativePath !== currentRealPath) continue;
		const rest = currentRealPath ? t.relativePath.slice(prefix.length) : t.relativePath;
		if (!rest) continue;
		const slashIdx = rest.indexOf("/");
		if (slashIdx === -1) directFiles.push(t);
		else {
			const folderName = rest.slice(0, slashIdx);
			const bucketKey = `${taskBatchId}${folderName}`;
			const bucket = folderBuckets.get(bucketKey);
			if (bucket) bucket.tasks.push(t);
			else folderBuckets.set(bucketKey, {
				batchId: taskBatchId,
				folderName,
				tasks: [t]
			});
		}
	}
	const folders = [];
	for (const { batchId, folderName, tasks: bucketTasks } of folderBuckets.values()) {
		const localRealPath = currentRealPath ? `${currentRealPath}/${folderName}` : folderName;
		folders.push({
			name: folderName,
			path: buildFolderPath(batchId, localRealPath),
			summary: selectSummary(bucketTasks)
		});
	}
	folders.sort((a, b) => a.name.localeCompare(b.name, void 0, {
		numeric: true,
		sensitivity: "base"
	}));
	const filesWithIndex = directFiles.map((task, index) => ({
		task,
		index
	}));
	filesWithIndex.sort((a, b) => {
		const rankDiff = getUploadStatusRank(a.task.status) - getUploadStatusRank(b.task.status);
		return rankDiff !== 0 ? rankDiff : a.index - b.index;
	});
	return {
		folders,
		files: filesWithIndex.map((item) => item.task)
	};
}
/**
* 浮窗文件列表的状态优先级。数字越小越靠前。
*
* 产品预期：上传中（含等待/重试） > 失败 > 已完成（含取消）。
*/
function getUploadStatusRank(status) {
	switch (status) {
		case "uploading":
		case "retrying":
		case "queued": return 0;
		case "failed": return 1;
		case "success":
		case "cancelled": return 2;
		default: return 3;
	}
}
var import_zustand, DEFAULT_UI_STATE, documentUploadStore, useDocumentUploadStore;
var init_document_upload_task_store = __esmMin((() => {
	import_zustand = require_zustand();
	init_vanilla();
	DEFAULT_UI_STATE = {
		visible: false,
		collapsed: false,
		position: null,
		size: {
			width: 480,
			height: 480
		},
		currentFolderPath: ""
	};
	documentUploadStore = createStore((set) => ({
		tasks: [],
		ui: { ...DEFAULT_UI_STATE },
		enqueue: (tasks) => {
			if (tasks.length === 0) {
				console.warn("[DocumentUploadStore] enqueue called with empty array (dock will NOT show)");
				return;
			}
			console.info("[DocumentUploadStore] enqueue", {
				count: tasks.length,
				sources: tasks.map((t) => t.source ?? "local"),
				firstFileName: tasks[0]?.fileName
			});
			set((state) => ({
				tasks: [...state.tasks, ...tasks],
				ui: {
					...state.ui,
					visible: true,
					collapsed: true
				}
			}));
		},
		updateTask: (id, patch) => {
			set((state) => {
				let changed = false;
				const next = state.tasks.map((t) => {
					if (t.id !== id) return t;
					let dirty = false;
					for (const key in patch) if (Object.prototype.hasOwnProperty.call(patch, key)) {
						if (patch[key] !== t[key]) {
							dirty = true;
							break;
						}
					}
					if (!dirty) return t;
					changed = true;
					return {
						...t,
						...patch
					};
				});
				if (!changed) return state;
				return { tasks: next };
			});
		},
		removeTask: (id) => {
			set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
		},
		clearFinished: () => {
			set((state) => ({ tasks: state.tasks.filter((t) => t.status !== "success" && t.status !== "cancelled") }));
		},
		clearAll: () => {
			set((state) => ({
				tasks: [],
				ui: {
					...state.ui,
					visible: false,
					collapsed: false,
					currentFolderPath: ""
				}
			}));
		},
		setVisible: (visible) => {
			set((state) => ({ ui: {
				...state.ui,
				visible
			} }));
		},
		setCollapsed: (collapsed) => {
			set((state) => ({ ui: {
				...state.ui,
				collapsed,
				position: null
			} }));
		},
		setPosition: (position) => {
			set((state) => ({ ui: {
				...state.ui,
				position
			} }));
		},
		setSize: (size) => {
			set((state) => ({ ui: {
				...state.ui,
				size
			} }));
		},
		setCurrentFolderPath: (path) => {
			set((state) => ({ ui: {
				...state.ui,
				currentFolderPath: path
			} }));
		}
	}));
	useDocumentUploadStore = (selector) => (0, import_zustand.useStore)(documentUploadStore, selector);
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/upload/build-upload-tree.ts
/**
* 把扁平的 PickedFile[] 组织成 init-upload 接口需要的递归 nodes 树。
*
* 规则：
*  - 用 PickedFile.relativePath 拆分得到层级序列（最后一段是文件名）。
*  - 中间所有段落都视为文件夹节点；存在多个文件共享前缀时合并到同一个
*    文件夹节点下，避免重复创建。
*  - 单文件场景（relativePath 不含 `/`）也会作为根级文件节点出现，
*    这种情况一般不会被文件夹上传入口触发，但保持兼容。
*
* 注意：返回的是顶层节点数组，可能是多根（用户在某些 picker 里同时选
* 中多个目录），多数场景下只有一个根节点（webkitdirectory）。
*/
function buildUploadNodes(picked) {
	/** 多个根节点（顶层目录或顶层裸文件） */
	const roots = [];
	const rootFolders = /* @__PURE__ */ new Map();
	for (const file of picked) {
		const segments = file.relativePath.split("/").filter(Boolean);
		if (segments.length === 0) continue;
		const fileName = segments[segments.length - 1];
		const folderSegments = segments.slice(0, -1);
		let parentChildren = roots;
		let parentFolderMap = rootFolders;
		for (const segment of folderSegments) {
			let bucket = parentFolderMap.get(segment);
			if (!bucket) {
				const folderNode = {
					is_folder: true,
					name: segment,
					children: []
				};
				parentChildren.push(folderNode);
				bucket = {
					node: folderNode,
					subFolders: /* @__PURE__ */ new Map()
				};
				parentFolderMap.set(segment, bucket);
			}
			parentChildren = bucket.node.children;
			parentFolderMap = bucket.subFolders;
		}
		const ext = extractExt(fileName);
		const fileNode = {
			is_folder: false,
			name: fileName,
			size: String(file.size ?? 0),
			ext
		};
		parentChildren.push(fileNode);
	}
	return roots;
}
/**
* 计算 `PickedFile[]` 中的最大目录层级（按上面的「层级」定义）。
*
* 仅用于「文件夹批量上传」入口的前置校验，不影响实际上传逻辑。
* picked 为空数组时返回 0。
*
* 注意：使用 PickedFile.relativePath 做切分，不依赖具体文件存在与否，
* 因此和 buildUploadNodes 看到的目录树层级一致。
*/
function computeMaxUploadFolderDepth(picked) {
	let max = 0;
	for (const file of picked) {
		const segments = file.relativePath.split("/").filter(Boolean);
		const depth = Math.max(0, segments.length - 1);
		if (depth > max) max = depth;
	}
	return max;
}
/**
* 从文件名抽取扩展名（不含点），全小写。
* 没有扩展名时返回空字符串。
*/
function extractExt(fileName) {
	const idx = fileName.lastIndexOf(".");
	if (idx <= 0 || idx === fileName.length - 1) return "";
	return fileName.slice(idx + 1).toLowerCase();
}
/**
* 从一个文件夹节点上反推它自己的"服务端 file_id"。
*
* 当前 SaaS 域响应里 **节点对象本身不暴露 file_id**，只能从该文件夹的任意
* 一个 child 的 `parent_file_id` 取回。空文件夹拿不到 file_id（child=0）。
*
* 兜底顺序：children[*].parent_file_id → 老版本的 id / folder_id / file_id
* → 空串。返回空串意味着「无可用 folder_id」，调用方应该 fallback 到
* 父目录（最差情况下落到 panel 当前层）。
*/
function extractFolderFileId(node) {
	if (Array.isArray(node.children)) for (const child of node.children) {
		const pid = child?.parent_file_id;
		if (typeof pid === "string" && pid && pid !== "/") return pid;
	}
	const legacy = node.id || node.folder_id || node.file_id || "";
	return typeof legacy === "string" ? legacy : "";
}
/**
* 把后端响应中的 `nodes` 树展平成 (相对目录路径 → folderId) 映射。
*
* 路径规则与 PickedFile.relativePath 中"去掉文件名后的目录段"对齐：
*  - 用户选中的根目录本身（例如 `'projA'`）会被收录为
*    `'projA' → <serverFolderId>`；
*  - 子目录依次拼接，例如 `'projA/sub' → <serverFolderId>`。
*
* panel 在回填 task.targetFolderId 时直接用文件 relativePath 去掉
* 最后一段查表即可。
*/
function buildFolderIdMap(nodes) {
	const map = /* @__PURE__ */ new Map();
	if (!Array.isArray(nodes) || nodes.length === 0) return map;
	const walk = (list, parentPath) => {
		for (const node of list) {
			if (!node || typeof node !== "object") continue;
			if (!node.is_folder) continue;
			const path = parentPath ? `${parentPath}/${node.name}` : node.name;
			const id = extractFolderFileId(node);
			if (id) map.set(path, id);
			if (Array.isArray(node.children) && node.children.length > 0) walk(node.children, path);
		}
	};
	walk(nodes, "");
	return map;
}
/**
* 从 PickedFile.relativePath 推导其所属"目录键"（去掉文件名）。
* 用于在 buildFolderIdMap 返回的映射里查 folderId。
*
* 例：`'projA/sub/readme.md'` → `'projA/sub'`；
*     `'readme.md'` → `''`（根级，无对应子目录）。
*/
function getRelativeDirKey(relativePath) {
	const idx = relativePath.lastIndexOf("/");
	if (idx <= 0) return "";
	return relativePath.slice(0, idx);
}
function applyUniqFileNamesToFolders(requestNodes, responseNodes) {
	const renameMap = /* @__PURE__ */ new Map();
	if (!Array.isArray(responseNodes) || responseNodes.length === 0) return {
		nodes: [],
		renameMap,
		changed: false
	};
	let changed = false;
	/**
	* 递归处理一层兄弟节点。
	* - reqList：请求里这一层的兄弟节点（提供原始 name）
	* - respList：响应里这一层的兄弟节点（提供新 name + uniq_file_name 信号）
	* - 按 index 对齐（后端约定保持顺序）；若 index 越界或类型不匹配，
	*   退化到按响应里的 name 直接处理（renameMap 不建立）。
	*/
	const walk = (reqList, respList, parentOldPath, parentNewPath) => {
		const out = [];
		for (let i = 0; i < respList.length; i += 1) {
			const respNode = respList[i];
			if (!respNode || typeof respNode !== "object") continue;
			if (!respNode.is_folder) {
				const rebuilt = {
					is_folder: false,
					name: respNode.name
				};
				if (typeof respNode.size === "string") rebuilt.size = respNode.size;
				if (typeof respNode.ext === "string") rebuilt.ext = respNode.ext;
				out.push(rebuilt);
				continue;
			}
			const respName = respNode.name;
			const uniqName = typeof respNode.uniq_file_name === "string" ? respNode.uniq_file_name.trim() : "";
			const isRenamed = uniqName.length > 0;
			const reqNode = Array.isArray(reqList) && i < reqList.length ? reqList[i] : void 0;
			const reqName = reqNode && reqNode.is_folder && typeof reqNode.name === "string" ? reqNode.name : void 0;
			const effectiveName = isRenamed ? uniqName : respName;
			const oldNameForPath = reqName ?? respName;
			const oldPath = parentOldPath ? `${parentOldPath}/${oldNameForPath}` : oldNameForPath;
			const newPath = parentNewPath ? `${parentNewPath}/${effectiveName}` : effectiveName;
			if (isRenamed && reqName !== void 0 && effectiveName !== reqName) {
				changed = true;
				renameMap.set(oldPath, newPath);
			} else if (isRenamed && reqName === void 0) {
				changed = true;
				console.warn("[applyUniqFileNamesToFolders] cannot resolve original name for renamed folder", {
					responseName: respName,
					uniqFileName: uniqName,
					parentOldPath
				});
			}
			const rebuilt = {
				is_folder: true,
				name: effectiveName
			};
			if (Array.isArray(respNode.children) && respNode.children.length > 0) rebuilt.children = walk(reqNode && reqNode.is_folder && Array.isArray(reqNode.children) ? reqNode.children : void 0, respNode.children, oldPath, newPath);
			else rebuilt.children = [];
			out.push(rebuilt);
		}
		return out;
	};
	return {
		nodes: walk(requestNodes, responseNodes, "", ""),
		renameMap,
		changed
	};
}
/**
* 按 renameMap 重写一条 PickedFile 的 `relativePath`。
*
* 规则：找出最长的、可作为 relativePath 前缀的 oldPath（按 `/` 分段比对，
* 而非纯字符串前缀，避免 `项目资料` 误命中 `项目资料备份/...`），把该
* 段替换成对应的 newPath，其余部分保留。
*
* 例：renameMap = { "项目资料" => "项目资料(1)" }
*   - "项目资料/sub/a.docx"        → "项目资料(1)/sub/a.docx"
*   - "项目资料备份/a.docx"        → 不变
*   - "项目资料"（仅根目录）       → "项目资料(1)"
*
* 多层嵌套同时改名时，按 oldPath 长度从长到短匹配，命中最长的（更深的）
* 前缀；这样上层改名 + 下层改名都能正确叠加。
*/
function rewriteRelativePathByRenameMap(relativePath, renameMap) {
	if (renameMap.size === 0 || !relativePath) return relativePath;
	const segments = relativePath.split("/").filter(Boolean);
	if (segments.length === 0) return relativePath;
	const sortedKeys = Array.from(renameMap.keys()).sort((a, b) => b.split("/").length - a.split("/").length);
	for (const oldKey of sortedKeys) {
		const oldSegs = oldKey.split("/").filter(Boolean);
		if (oldSegs.length > segments.length) continue;
		let match = true;
		for (let i = 0; i < oldSegs.length; i += 1) if (segments[i] !== oldSegs[i]) {
			match = false;
			break;
		}
		if (!match) continue;
		return [...renameMap.get(oldKey).split("/").filter(Boolean), ...segments.slice(oldSegs.length)].join("/");
	}
	return relativePath;
}
var init_build_upload_tree = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/upload/pick-files-and-folders.ts
/**
* 根据文件名取出对应的文件大小上限（字节）。
* 不在白名单内的扩展名按默认 2 GiB 上限处理（实际会先在扩展名校验阶段被拦下）。
*/
function getUploadSizeLimit(fileName) {
	const ext = getExtLower(fileName);
	if (ext && MINDMAP_LIKE_EXTS.has(ext)) return TDOC_UPLOAD_MAX_BYTES_MINDMAP;
	return TDOC_UPLOAD_MAX_BYTES_DEFAULT;
}
/**
* 判断文件大小是否超过对应类型的上限。
* 严格大于上限即视为超限（== 上限不算超限，与产品口径一致）。
*/
function isOverSizeLimit(fileName, size) {
	return size > getUploadSizeLimit(fileName);
}
/**
* 文件是否属于「思维导图 / 流程图」类型（xmind / pos）。
*
* 这类文件单文件上限为 1 GiB，而其他类型为 2 GiB；UI 层在展示
* 「文件大小超过上限」的 hover 提示时需要据此分别给出
* 「仅支持上传 1G 以内的思维导图」/「仅支持上传 2G 以内的文件」。
*/
function isMindmapLikeFile(fileName) {
	const ext = getExtLower(fileName);
	return ext !== "" && MINDMAP_LIKE_EXTS.has(ext);
}
/** 取文件名的扩展名（不带点、小写）。无扩展名返回 ''。 */
function getExtLower(fileName) {
	if (!fileName) return "";
	const idx = fileName.lastIndexOf(".");
	if (idx <= 0 || idx === fileName.length - 1) return "";
	return fileName.slice(idx + 1).toLowerCase();
}
/**
* 文件是否属于腾讯文档支持上传的类型。
*
* issue #57882：黑名单语义——只要扩展名不在 `BLOCKED_UPLOAD_EXTS`（html 家族）
* 内就放行；无扩展名文件（ext === ''）同样按「非 html」放行。
*/
function isSupportedExt(fileName) {
	const ext = getExtLower(fileName);
	return !BLOCKED_UPLOAD_EXTS.has(ext);
}
/**
* 文件是否属于「腾讯文档明确不支持的 html 家族」（issue #61605 / #57882）。
*
* 用于 my-files / task-artifacts / space-panel 等**已有产物文件**入口
* 判断"上传到腾讯文档"入口是否要隐藏；本地文件选择器入口（openFilePicker /
* openFolderPicker / parseDropEvent）仍走 `isSupportedExt` 兜底，语义与本函数一致。
*
* 空扩展名（Makefile / Dockerfile 等）视为非 html，返回 false；
* 传入空字符串同样返回 false（保守：不隐藏）。
*/
function isHtmlLikeFileName(fileName) {
	if (!fileName) return false;
	const ext = getExtLower(fileName);
	return ext !== "" && BLOCKED_UPLOAD_EXTS.has(ext);
}
/**
* 已有产物文件是否能上传到腾讯文档（issue #61605 集中判定）。
*
* 各"上传到腾讯文档"入口的显隐判定唯一真源：只依赖文件名 + 能力开关，
* 不依赖 React / MyFileItem 具体形态，方便：
*   - task-artifacts 列表 / 二级菜单 / preview-modal 三处入口共用；
*   - useTencentDocsUpload 兜底短路复用；
*   - 未来 space-panel 等 iframe 入口直接接入，避免各自拼装
*     `tencentDocsEnabled && !isHtmlLikeFileName(name)`。
*
* 参数用最小结构 `{ name: string }`，让调用方不必绑定到 MyFileItem 或者
* File 具体类型（DOM File 也可以直接传）。
*/
function canUploadToTencentDocs(file, options) {
	if (!options.tencentDocsEnabled) return false;
	if (!file || !file.name) return false;
	return !isHtmlLikeFileName(file.name);
}
/**
* 批量场景：一批文件中是否**至少存在一个**能上传到腾讯文档的文件。
*
* 用于多选二级菜单的显隐判定 —— 只要还有非-html 文件就展示入口，
* 交由 `useTencentDocsUpload.triggerBatch` 内部再过滤 html 并 toast
* 「已跳过 N 个」。全 html 或全空则隐藏入口，避免"点了没反应 + toast"。
*/
function hasAnyUploadableToTencentDocs(files, options) {
	if (!options.tencentDocsEnabled) return false;
	for (const f of files) if (f && f.name && !isHtmlLikeFileName(f.name)) return true;
	return false;
}
/**
* 文件名的「主名」是否为空（含纯空白）。
*
* 主名 = 去掉扩展名（最后一个 `.` 及其后内容）后剩下的部分。
* 用户在系统里把文件改成「空标题」时，常见两种形态：
*   1) 直接没主名：`.docx` / `.pdf`
*   2) 主名只有空格：`   .docx` / `   `（纯空格无扩展名）
*
* 这类文件上传到腾讯文档会被上游拒掉，且上游回执通常是「类型不支持」之类
* 模糊错误，会误导用户去检查扩展名——所以在采集层就识别出来，单独给
* 「文件名为空」的提示，比「类型不支持」更准确。
*
* 规则（trim 后再判断空）：
* - 文件名为空字符串 → 视为主名为空。
* - 文件名以 `.` 开头（如 `.docx`、`.DS_Store`）→ 主名为空。
* - 文件名整串就是 `.` / `..` 等纯点 → 主名为空。
* - 主名 trim 后为空（如 `   .docx`、`   `）→ 主名为空。
* - 其他情况返回 false。
*/
function hasEmptyBaseName(fileName) {
	if (!fileName || fileName.trim() === "") return true;
	const idx = fileName.lastIndexOf(".");
	if (idx === -1) return false;
	return fileName.slice(0, idx).trim() === "";
}
/**
* 判断一个文件名是否属于「操作系统隐藏 / 元数据文件」。
*
* 文件夹上传 / 文件夹拖入场景下，浏览器 / Electron 会把目录里所有文件
* 全部递归出来，其中常常包含操作系统自动生成的元数据文件（macOS 的
* `.DS_Store`、Windows 的 `Thumbs.db` / `Desktop.ini`、`.开头隐藏文件`
* 比如 `.git/...`）。
*
* 这类文件：
* 1. 用户根本看不见、也不期望被上传；
* 2. 大概率没有「腾讯文档支持的扩展名」（如 `.DS_Store`、`.gitignore`），
*    发到上游会以 `400001 参数错误` 失败，污染失败列表；
* 3. 即便上传成功，对用户也是噪声。
*
* 因此在「文件夹采集 / DnD 目录递归」出口处直接丢弃。注意：
* - 「多选单文件」(`openFilePicker`) 不在此过滤——用户主动勾选什么就上传什么。
* - 这里只做名字判断，不依赖目录结构；不会误伤目录里**真正名字**就叫
*   `Makefile` / `Dockerfile` 这种「无扩展名但有用」的文件（这些另由
*   host 端「无扩展名」校验处理）。
*/
function isSystemJunkFile(fileName) {
	if (!fileName) return true;
	const lower = fileName.toLowerCase();
	if (lower === ".ds_store" || lower === ".localized") return true;
	if (lower.startsWith("._")) return true;
	if (lower === "thumbs.db" || lower === "desktop.ini" || lower === "ehthumbs.db") return true;
	if (lower.startsWith(".")) return true;
	return false;
}
/**
* 取本地绝对路径。
*
* Electron 28+ 起，渲染进程里 File.path 已被移除，必须用
* preload 暴露的 webUtils.getPathForFile(file)。
* cb-chat-ui 的 getFilePathSafe 已经做好了 webUtils 优先 + .path 兜底，
* 这里直接用，纯 Web 环境下返回 undefined → 转空字符串。
*/
function readElectronFilePath(file) {
	return getFilePathSafe(file) ?? "";
}
/**
* 从 File 构造 PickedFile。
* relativePath 的来源优先级：
*   1. 传入显式 override（DnD 递归时拼好）
*   2. file.webkitRelativePath（webkitdirectory 入口）
*   3. file.name（fallback）
*/
function fileToPicked(file, overrideRelativePath) {
	const filePath = readElectronFilePath(file);
	const relativePath = overrideRelativePath || file.webkitRelativePath || file.name;
	return {
		filePath,
		fileName: file.name,
		relativePath,
		size: file.size
	};
}
/**
* 弹出"多选文件"系统对话框。
* 用动态创建的 <input type=file multiple> 实现，绕过对 adapter 的依赖。
*/
function openFilePicker() {
	return new Promise((resolve) => {
		const input = document.createElement("input");
		input.type = "file";
		input.multiple = true;
		input.accept = "";
		let resolved = false;
		const openedAt = Date.now();
		console.info("[TDocPicker] openFilePicker: opened");
		const finish = (result, from) => {
			if (resolved) {
				console.warn("[TDocPicker] openFilePicker: finish ignored (already resolved)", {
					from,
					fileCount: result.accepted.length,
					elapsedMs: Date.now() - openedAt
				});
				return;
			}
			resolved = true;
			window.removeEventListener("focus", onFocus);
			console.info("[TDocPicker] openFilePicker: resolve", {
				from,
				fileCount: result.accepted.length,
				tooManyFiles: result.tooManyFiles,
				rawFileCount: result.rawFileCount,
				elapsedMs: Date.now() - openedAt
			});
			resolve(result);
		};
		const onFocus = () => {
			console.info("[TDocPicker] openFilePicker: window focus fired (cancel-fallback armed)");
			setTimeout(() => finish({ accepted: [] }, "focus-cancel"), FOCUS_FALLBACK_DELAY_MS);
		};
		input.addEventListener("change", () => {
			const rawCount = input.files ? input.files.length : 0;
			if (rawCount > 200) {
				console.warn("[TDocPicker] openFilePicker: short-circuit on too many files", {
					rawFileCount: rawCount,
					limit: 200,
					elapsedMs: Date.now() - openedAt
				});
				finish({
					accepted: [],
					tooManyFiles: true,
					rawFileCount: rawCount
				}, "change");
				return;
			}
			const list = input.files ? Array.from(input.files) : [];
			console.info("[TDocPicker] openFilePicker: change fired", {
				rawFileCount: list.length,
				elapsedMs: Date.now() - openedAt
			});
			const picked = list.map((f) => fileToPicked(f));
			const missingPath = picked.filter((p) => !p.filePath).length;
			if (missingPath > 0) console.warn("[TDocPicker] openFilePicker: some files have empty filePath", {
				missingPath,
				total: picked.length
			});
			finish({
				accepted: picked,
				rawFileCount: rawCount
			}, "change");
		});
		input.addEventListener("cancel", () => {
			console.info("[TDocPicker] openFilePicker: cancel event fired");
			finish({ accepted: [] }, "cancel");
		});
		input.value = "";
		input.click();
		requestAnimationFrame(() => {
			if (resolved) return;
			window.addEventListener("focus", onFocus, { once: true });
		});
	});
}
/**
* 弹出"选择文件夹"系统对话框。
* 使用 <input webkitdirectory>，浏览器会自动递归该目录下所有文件并填充
* file.webkitRelativePath = '<rootName>/<sub>/<name>'。
*
* 返回值带回「被白名单过滤掉的文件名」，由调用方聚合到 toast 提示
* （类型不支持的文件不进 `accepted`，因此不会调任何后台接口、也不会
* 出现在 dock 任务列表里）。0B 空文件**会**进 `accepted`，由 dock 端
* runner 入口的 sentinel 兜底置 failed 显示「上传失败：不支持上传 0B
* 大小的文件」。
* 用户取消选择时返回 `{ accepted: [], unsupportedNames: [] }`。
*/
function openFolderPicker() {
	return new Promise((resolve) => {
		const input = document.createElement("input");
		input.type = "file";
		input.webkitdirectory = true;
		input.multiple = true;
		let resolved = false;
		const openedAt = Date.now();
		console.info("[TDocPicker] openFolderPicker: opened");
		const finish = (result, from) => {
			if (resolved) {
				console.warn("[TDocPicker] openFolderPicker: finish ignored (already resolved)", {
					from,
					fileCount: result.accepted.length,
					unsupportedCount: result.unsupportedNames.length,
					elapsedMs: Date.now() - openedAt
				});
				return;
			}
			resolved = true;
			window.removeEventListener("focus", onFocus);
			console.info("[TDocPicker] openFolderPicker: resolve", {
				from,
				fileCount: result.accepted.length,
				unsupportedCount: result.unsupportedNames.length,
				elapsedMs: Date.now() - openedAt
			});
			resolve(result);
		};
		const onFocus = () => {
			console.info("[TDocPicker] openFolderPicker: window focus fired (cancel-fallback armed)");
			setTimeout(() => finish({
				accepted: [],
				unsupportedNames: []
			}, "focus-cancel"), FOCUS_FALLBACK_DELAY_MS);
		};
		input.addEventListener("change", () => {
			const rawCount = input.files ? input.files.length : 0;
			if (rawCount === 0) {
				console.info("[TDocPicker] openFolderPicker: empty folder selected", { elapsedMs: Date.now() - openedAt });
				finish({
					accepted: [],
					unsupportedNames: [],
					isEmptyFolder: true
				}, "change");
				return;
			}
			if (rawCount > 200) {
				console.warn("[TDocPicker] openFolderPicker: short-circuit on too many files", {
					rawFileCount: rawCount,
					limit: 200,
					elapsedMs: Date.now() - openedAt
				});
				toast.error(t("tdoc.upload.folderFileCountExceeded", { limit: 200 }));
				finish({
					accepted: [],
					unsupportedNames: [],
					tooManyFiles: true,
					rawFileCount: rawCount
				}, "change");
				return;
			}
			let detectedMaxDepth = 0;
			if (input.files) for (let i = 0; i < input.files.length; i += 1) {
				const f = input.files[i];
				const rel = f.webkitRelativePath || f.name;
				if (!rel) continue;
				const segs = rel.split("/").filter(Boolean);
				const depth = Math.max(0, segs.length - 1);
				if (depth > detectedMaxDepth) {
					detectedMaxDepth = depth;
					if (detectedMaxDepth > 6) break;
				}
			}
			if (detectedMaxDepth > 6) {
				console.warn("[TDocPicker] openFolderPicker: short-circuit on too deep folder", {
					maxDepth: detectedMaxDepth,
					limit: 6,
					rawFileCount: rawCount,
					elapsedMs: Date.now() - openedAt
				});
				finish({
					accepted: [],
					unsupportedNames: [],
					tooDeep: true,
					maxDepth: detectedMaxDepth,
					rawFileCount: rawCount
				}, "change");
				return;
			}
			const list = input.files ? Array.from(input.files) : [];
			console.info("[TDocPicker] openFolderPicker: change fired", {
				rawFileCount: list.length,
				elapsedMs: Date.now() - openedAt
			});
			const allPicked = list.map((f) => fileToPicked(f));
			const afterJunk = allPicked.filter((p) => !isSystemJunkFile(p.fileName));
			const accepted = [];
			const unsupportedNames = [];
			for (const p of afterJunk) if (!isSupportedExt(p.fileName)) unsupportedNames.push(p.fileName);
			else accepted.push(p);
			console.info("[TDocPicker] openFolderPicker: filter pipeline", {
				raw: allPicked.length,
				afterJunk: afterJunk.length,
				accepted: accepted.length,
				unsupported: unsupportedNames.length,
				missingPath: accepted.filter((p) => !p.filePath).length
			});
			finish({
				accepted,
				unsupportedNames
			}, "change");
		});
		input.addEventListener("cancel", () => {
			console.info("[TDocPicker] openFolderPicker: cancel event fired");
			finish({
				accepted: [],
				unsupportedNames: []
			}, "cancel");
		});
		input.value = "";
		input.click();
		requestAnimationFrame(() => {
			if (resolved) return;
			window.addEventListener("focus", onFocus, { once: true });
		});
	});
}
function filterPickedByLocalPath(picked) {
	const accepted = [];
	const rejectedNames = [];
	for (const p of picked) if (p.filePath) accepted.push(p);
	else rejectedNames.push(p.fileName);
	return {
		accepted,
		rejectedNames
	};
}
/**
* 按腾讯文档上传扩展名黑名单过滤（issue #57882：只拦 html 家族，余者放行）。
*
* 用于「多选文件」(`openFilePicker`) 这种**用户主动勾选**的入口：
* 用户明确选了某个文件，如果被静默丢弃用户会一脸懵——所以这里需要
* 把每类拒绝原因分别返回，让调用方合并到一条 toast「N 个文件已自动跳过」。
*
* 「文件夹采集 / DnD 目录递归」入口不调用此函数，它们在 picker 出口
* 内部就已经把不支持类型直接静默剪掉了。
*
* 0B 空文件的处理：**不**在此过滤，让它进 accepted。后续 enqueue 到
* dock 后，runner 入口的 `EMPTY_FILE_ERROR_SENTINEL` 会把它直接置 failed
* 并展示「上传失败：不支持上传 0B 大小的文件」。这样保留了「具体哪几
* 个文件是 0B」的可见性，与产品设计稿一致；toast 只聚合「主名为空」
* 和「类型不支持」这两类用户难以直接感知的拒因。
*
* 拒绝原因优先级：empty name > unsupported ext。
* 选这个优先级的理由：empty name 是"文件本身有问题"（连合法名字都没有），
* 用户没办法改扩展名解决，先告知更准确。
*/
function filterPickedBySupportedExt(picked) {
	const accepted = [];
	const rejectedNames = [];
	const emptyNameNames = [];
	for (const p of picked) if (hasEmptyBaseName(p.fileName)) emptyNameNames.push(p.fileName);
	else if (!isSupportedExt(p.fileName)) rejectedNames.push(p.fileName);
	else accepted.push(p);
	return {
		accepted,
		rejectedNames,
		emptyNameNames
	};
}
var BLOCKED_UPLOAD_EXTS, TDOC_UPLOAD_MAX_BYTES_MINDMAP, TDOC_UPLOAD_MAX_BYTES_DEFAULT, MINDMAP_LIKE_EXTS, FOCUS_FALLBACK_DELAY_MS;
var init_pick_files_and_folders = __esmMin((() => {
	init_src();
	init_i18n();
	init_build_upload_tree();
	BLOCKED_UPLOAD_EXTS = new Set([
		"html",
		"htm",
		"xhtml",
		"shtml",
		"mhtml",
		"mht"
	]);
	TDOC_UPLOAD_MAX_BYTES_MINDMAP = 1 * 1024 * 1024 * 1024;
	TDOC_UPLOAD_MAX_BYTES_DEFAULT = 2 * 1024 * 1024 * 1024;
	MINDMAP_LIKE_EXTS = new Set(["xmind", "pos"]);
	FOCUS_FALLBACK_DELAY_MS = 1500;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/upload/tdoc-import-error-codes.ts
/**
* 给定一个腾讯文档业务 retcode，返回对应的 sentinel 字符串；未命中返回 null。
*
* 调用方（runner.executeTask 的 catch 分支）应：
*   1. 先从 err.message 中解析出 retcode（runner 已有 TDOC_ERROR_PREFIX_RE）
*   2. 调用本函数获取 sentinel
*   3. 命中 → updateTask({ error: sentinel })
*   4. 未命中 → 走 stripTdocErrorPrefix 默认逻辑
*/
function mapTdocImportRetCodeToSentinel(retcode) {
	if (!Number.isFinite(retcode)) return null;
	return TDOC_IMPORT_RETCODE_TO_SENTINEL[retcode] ?? null;
}
/**
* 从一段错误 message 中提取腾讯文档 retcode。
*
* 兼容两种 message 模板（与 runner 内 TDOC_ERROR_PREFIX_RE / 通用退化匹配一致）：
*   1. `[TencentDocs] uploadFile.<step> failed: <retcode> <msg>`
*   2. `... retcode=<num> ...` / `... code=<num> ...` 等通用格式
*
* 第二种主要兜底 saas-imports/batch 链路 —— 主进程透传的 envelope 里通常会带
* `retcode=410807` / `"code":10000` 之类裸文本（详见 saasimportbatch.txt）。
*
* 命中规则：返回首个能解析出来的整数；解析失败返回 null。
*/
function extractTdocRetcodeFromMessage(message) {
	if (!message) return null;
	const std = /^\[TencentDocs\]\s*uploadFile\.[a-zA-Z_]+\s+failed:\s*(-?\d+)\b/.exec(message);
	if (std) {
		const code = Number(std[1]);
		if (Number.isFinite(code)) return code;
	}
	const generic = /(?:^|[^a-zA-Z0-9_])(?:retcode|code)\s*[=:]\s*"?(-?\d+)/i.exec(message);
	if (generic) {
		const code = Number(generic[1]);
		if (Number.isFinite(code)) return code;
	}
	return null;
}
var TdocImportRetCode, FILE_BREAK_ERROR_SENTINEL, SIZE_LIMIT_OWNER_ERROR_SENTINEL, SIZE_LIMIT_COLLABORATOR_ERROR_SENTINEL, OLD_VERSION_DOC_ERROR_SENTINEL, NO_SUPPORT_IMPORT_ERROR_SENTINEL, TOO_MANY_CELLS_ERROR_SENTINEL, NON_VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL, VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL, OVER_SYSTEM_LIMIT_ERROR_SENTINEL, NO_PERMISSION_ERROR_SENTINEL, LICENSE_EXPIRED_ERROR_SENTINEL, ZIP_FILE_CONTENT_NOT_SUPPORT_ERROR_SENTINEL, SHEET_TO_SMARTSHEET_CELL_EXCEED_LIMIT_ERROR_SENTINEL, SHEET_TO_SMARTSHEET_FIELD_EXCEED_LIMIT_ERROR_SENTINEL, SHEET_TO_SMARTSHEET_ROW_EXCEED_LIMIT_ERROR_SENTINEL, SHEET_TO_SMARTSHEET_SELECTED_RANGE_INVALID_ERROR_SENTINEL, TDOC_IMPORT_RETCODE_TO_SENTINEL;
var init_tdoc_import_error_codes = __esmMin((() => {
	TdocImportRetCode = /* @__PURE__ */ function(TdocImportRetCode) {
		TdocImportRetCode[TdocImportRetCode["FILE_BREAK"] = 108] = "FILE_BREAK";
		TdocImportRetCode[TdocImportRetCode["PASSWORD_ERROR"] = 112] = "PASSWORD_ERROR";
		TdocImportRetCode[TdocImportRetCode["NEED_PASSWORD"] = 115] = "NEED_PASSWORD";
		TdocImportRetCode[TdocImportRetCode["SIZE_LIMIT_OWNER"] = 105] = "SIZE_LIMIT_OWNER";
		TdocImportRetCode[TdocImportRetCode["OVER_SIZE_LIMIT_OWNER"] = 20010] = "OVER_SIZE_LIMIT_OWNER";
		TdocImportRetCode[TdocImportRetCode["SIZE_LIMIT_COLLABORATOR"] = 109] = "SIZE_LIMIT_COLLABORATOR";
		TdocImportRetCode[TdocImportRetCode["OVER_SIZE_LIMIT_COLLABORATOR"] = 20013] = "OVER_SIZE_LIMIT_COLLABORATOR";
		TdocImportRetCode[TdocImportRetCode["OLD_VERSION_DOC_1"] = 281] = "OLD_VERSION_DOC_1";
		TdocImportRetCode[TdocImportRetCode["OLD_VERSION_DOC_2"] = 283] = "OLD_VERSION_DOC_2";
		TdocImportRetCode[TdocImportRetCode["OLD_VERSION_DOC_3"] = 181] = "OLD_VERSION_DOC_3";
		TdocImportRetCode[TdocImportRetCode["NO_SUPPORT_IMPORT"] = 107] = "NO_SUPPORT_IMPORT";
		TdocImportRetCode[TdocImportRetCode["NOT_SUPPORTED_FILE_TYPE"] = 400] = "NOT_SUPPORTED_FILE_TYPE";
		TdocImportRetCode[TdocImportRetCode["TOO_MANY_CELLS"] = 520106] = "TOO_MANY_CELLS";
		TdocImportRetCode[TdocImportRetCode["NOT_VIP_FILE_LIMIT"] = 106] = "NOT_VIP_FILE_LIMIT";
		TdocImportRetCode[TdocImportRetCode["NEW_NOT_VIP_FILE_LIMIT"] = 520110] = "NEW_NOT_VIP_FILE_LIMIT";
		TdocImportRetCode[TdocImportRetCode["VIP_FILE_LIMIT"] = 520107] = "VIP_FILE_LIMIT";
		TdocImportRetCode[TdocImportRetCode["OVER_SYSTEM_LIMIT"] = 520113] = "OVER_SYSTEM_LIMIT";
		TdocImportRetCode[TdocImportRetCode["NO_PERMISSION"] = 10004] = "NO_PERMISSION";
		TdocImportRetCode[TdocImportRetCode["LICENSE_EXPIRED"] = -56029] = "LICENSE_EXPIRED";
		TdocImportRetCode[TdocImportRetCode["SHEETTOSMARTSHEET_CELL_EXCEED_LIMIT"] = 40001] = "SHEETTOSMARTSHEET_CELL_EXCEED_LIMIT";
		TdocImportRetCode[TdocImportRetCode["SHEETTOSMARTSHEET_FIELD_EXCEED_LIMIT"] = 40002] = "SHEETTOSMARTSHEET_FIELD_EXCEED_LIMIT";
		TdocImportRetCode[TdocImportRetCode["SHEETTOSMARTSHEET_ROW_EXCEED_LIMIT"] = 40003] = "SHEETTOSMARTSHEET_ROW_EXCEED_LIMIT";
		TdocImportRetCode[TdocImportRetCode["SHEETTOSMARTSHEET_SELECTED_RANGE_INVALID"] = 40004] = "SHEETTOSMARTSHEET_SELECTED_RANGE_INVALID";
		TdocImportRetCode[TdocImportRetCode["ZIP_FILE_CONTENT_NOT_SUPPORT"] = 617108] = "ZIP_FILE_CONTENT_NOT_SUPPORT";
		return TdocImportRetCode;
	}({});
	FILE_BREAK_ERROR_SENTINEL = "TDOC_UPLOAD_FILE_BREAK";
	SIZE_LIMIT_OWNER_ERROR_SENTINEL = "TDOC_UPLOAD_SIZE_LIMIT_OWNER";
	SIZE_LIMIT_COLLABORATOR_ERROR_SENTINEL = "TDOC_UPLOAD_SIZE_LIMIT_COLLABORATOR";
	OLD_VERSION_DOC_ERROR_SENTINEL = "TDOC_UPLOAD_OLD_VERSION_DOC";
	NO_SUPPORT_IMPORT_ERROR_SENTINEL = "TDOC_UPLOAD_NO_SUPPORT_IMPORT";
	TOO_MANY_CELLS_ERROR_SENTINEL = "TDOC_UPLOAD_TOO_MANY_CELLS";
	NON_VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL = "TDOC_UPLOAD_NON_VIP_OVER_FILE_SIZE_LIMIT";
	VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL = "TDOC_UPLOAD_VIP_OVER_FILE_SIZE_LIMIT";
	OVER_SYSTEM_LIMIT_ERROR_SENTINEL = "TDOC_UPLOAD_OVER_SYSTEM_LIMIT";
	NO_PERMISSION_ERROR_SENTINEL = "TDOC_UPLOAD_NO_PERMISSION";
	LICENSE_EXPIRED_ERROR_SENTINEL = "TDOC_UPLOAD_LICENSE_EXPIRED";
	ZIP_FILE_CONTENT_NOT_SUPPORT_ERROR_SENTINEL = "TDOC_UPLOAD_ZIP_FILE_CONTENT_NOT_SUPPORT";
	SHEET_TO_SMARTSHEET_CELL_EXCEED_LIMIT_ERROR_SENTINEL = "TDOC_UPLOAD_SHEET_TO_SMARTSHEET_CELL_EXCEED_LIMIT";
	SHEET_TO_SMARTSHEET_FIELD_EXCEED_LIMIT_ERROR_SENTINEL = "TDOC_UPLOAD_SHEET_TO_SMARTSHEET_FIELD_EXCEED_LIMIT";
	SHEET_TO_SMARTSHEET_ROW_EXCEED_LIMIT_ERROR_SENTINEL = "TDOC_UPLOAD_SHEET_TO_SMARTSHEET_ROW_EXCEED_LIMIT";
	SHEET_TO_SMARTSHEET_SELECTED_RANGE_INVALID_ERROR_SENTINEL = "TDOC_UPLOAD_SHEET_TO_SMARTSHEET_SELECTED_RANGE_INVALID";
	TDOC_IMPORT_RETCODE_TO_SENTINEL = {
		[TdocImportRetCode.FILE_BREAK]: FILE_BREAK_ERROR_SENTINEL,
		[TdocImportRetCode.SIZE_LIMIT_OWNER]: SIZE_LIMIT_OWNER_ERROR_SENTINEL,
		[TdocImportRetCode.OVER_SIZE_LIMIT_OWNER]: SIZE_LIMIT_OWNER_ERROR_SENTINEL,
		[TdocImportRetCode.SIZE_LIMIT_COLLABORATOR]: SIZE_LIMIT_COLLABORATOR_ERROR_SENTINEL,
		[TdocImportRetCode.OVER_SIZE_LIMIT_COLLABORATOR]: SIZE_LIMIT_COLLABORATOR_ERROR_SENTINEL,
		[TdocImportRetCode.OLD_VERSION_DOC_1]: OLD_VERSION_DOC_ERROR_SENTINEL,
		[TdocImportRetCode.OLD_VERSION_DOC_2]: OLD_VERSION_DOC_ERROR_SENTINEL,
		[TdocImportRetCode.OLD_VERSION_DOC_3]: OLD_VERSION_DOC_ERROR_SENTINEL,
		[TdocImportRetCode.NO_SUPPORT_IMPORT]: NO_SUPPORT_IMPORT_ERROR_SENTINEL,
		[TdocImportRetCode.NOT_SUPPORTED_FILE_TYPE]: NO_SUPPORT_IMPORT_ERROR_SENTINEL,
		[TdocImportRetCode.TOO_MANY_CELLS]: TOO_MANY_CELLS_ERROR_SENTINEL,
		[TdocImportRetCode.NOT_VIP_FILE_LIMIT]: NON_VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL,
		[TdocImportRetCode.NEW_NOT_VIP_FILE_LIMIT]: NON_VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL,
		[TdocImportRetCode.VIP_FILE_LIMIT]: VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL,
		[TdocImportRetCode.OVER_SYSTEM_LIMIT]: OVER_SYSTEM_LIMIT_ERROR_SENTINEL,
		[TdocImportRetCode.NO_PERMISSION]: NO_PERMISSION_ERROR_SENTINEL,
		[TdocImportRetCode.LICENSE_EXPIRED]: LICENSE_EXPIRED_ERROR_SENTINEL,
		[TdocImportRetCode.ZIP_FILE_CONTENT_NOT_SUPPORT]: ZIP_FILE_CONTENT_NOT_SUPPORT_ERROR_SENTINEL,
		[TdocImportRetCode.SHEETTOSMARTSHEET_CELL_EXCEED_LIMIT]: SHEET_TO_SMARTSHEET_CELL_EXCEED_LIMIT_ERROR_SENTINEL,
		[TdocImportRetCode.SHEETTOSMARTSHEET_FIELD_EXCEED_LIMIT]: SHEET_TO_SMARTSHEET_FIELD_EXCEED_LIMIT_ERROR_SENTINEL,
		[TdocImportRetCode.SHEETTOSMARTSHEET_ROW_EXCEED_LIMIT]: SHEET_TO_SMARTSHEET_ROW_EXCEED_LIMIT_ERROR_SENTINEL,
		[TdocImportRetCode.SHEETTOSMARTSHEET_SELECTED_RANGE_INVALID]: SHEET_TO_SMARTSHEET_SELECTED_RANGE_INVALID_ERROR_SENTINEL
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/upload/document-upload-runner.ts
/**
* 注入 adapter 供 runner 调用 local 上传链路。
* 组件层（TencentDocsPanel 或 DocumentUploadDock）在挂载时调用一次即可。
* 重复 set 同一 adapter 是幂等的。
*/
function setDocumentUploadAdapter(adapter) {
	activeAdapter = adapter;
}
/**
* 注入 TencentDocs facade 供 runner 调用 SaaS Import 链路。
* 调用方：TencentDocsFileList 在 mount 时通过 useEffect 注入；
* unmount 时传入 null 清空。
*/
function setSaasImportFacade(facade) {
	activeSaasImportFacade = facade;
}
/**
* 启动一个任务的「大小感知」模拟进度推进（issue #58313）。
*
* 旧实现按「剩余距离的固定百分比」步进，与 task.size 完全无关 —— 1GB 和 1MB
* 走一模一样的曲线，几个 tick 就冲到 95%，造成「大文件秒到 95% 再卡很久」的违和感。
*
* 新实现把推进与文件大小挂钩：用一个保守的经验带宽估算出「预期 PUT 时长」，
* 再按已用时间线性逼近封顶（FAKE_PROGRESS_MAX_PERCENT）：
* - 大文件爬得慢（1GB 按 ~8MB/s ≈ 128s 才到封顶），与浏览器端「一点点到 100%」体感对齐；
* - 小文件仍然很快（受 MIN_EXPECTED_PUT_MS 下限保护，不会瞬间封顶）；
* - 仍是「只增不减」单调推进，避免抖动。
*
* 注意：这依旧是估算而非真实字节进度（adapter.uploadTencentDocsFile 是一次性
* request/response，PUT 阶段无进度回传）。封顶后由 uploadFile 返回时切到 100%。
* 推进时同步更新 bytesUploaded（用于"总速度"派生）。
*/
function startFakeProgress(taskId) {
	stopFakeProgress(taskId);
	const task0 = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
	const size = Math.max(1, task0?.size ?? 1);
	const expectedMs = Math.max(MIN_EXPECTED_PUT_MS, size / ESTIMATED_THROUGHPUT_BYTES_PER_SEC * 1e3);
	const startedAt = Date.now();
	const timer = setInterval(() => {
		const task = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
		if (!task || task.status !== "uploading") {
			stopFakeProgress(taskId);
			return;
		}
		if (task.percent >= FAKE_PROGRESS_MAX_PERCENT) {
			stopFakeProgress(taskId);
			return;
		}
		const elapsed = Date.now() - startedAt;
		const ratio = Math.min(1, elapsed / expectedMs);
		const target = Math.round(ratio * FAKE_PROGRESS_MAX_PERCENT);
		if (target <= task.percent) return;
		documentUploadStore.getState().updateTask(task.id, {
			percent: target,
			bytesUploaded: Math.round(target / 100 * task.size)
		});
		if (target >= FAKE_PROGRESS_MAX_PERCENT) stopFakeProgress(taskId);
	}, FAKE_PROGRESS_TICK_MS);
	fakeProgressTimers.set(taskId, timer);
}
function stopFakeProgress(taskId) {
	const timer = fakeProgressTimers.get(taskId);
	if (timer) {
		clearInterval(timer);
		fakeProgressTimers.delete(taskId);
	}
}
/**
* 把真实转换进度 real(0..100) 映射到显示区间 [90,99]。
* real 已是百分比；clamp 到 [0,100] 后线性折算，结果再 clamp 到 band。
*/
function mapRealProgressToPercent(real) {
	const mapped = REAL_PROGRESS_BAND_MIN + Math.round(Math.min(100, Math.max(0, real)) / 100 * (REAL_PROGRESS_BAND_MAX - REAL_PROGRESS_BAND_MIN));
	return Math.min(REAL_PROGRESS_BAND_MAX, Math.max(REAL_PROGRESS_BAND_MIN, mapped));
}
/**
* 启动一个任务的「真实进度」轮询（issue #58313 补充）。
*
* 与 startFakeProgress 并行运行：
* - 字节上传段（apply / PUT / complete）host 端还没进入 query_task，
*   queryTencentDocsUploadProgress 返回 progress=0，本轮询不动 percent，
*   假进度继续推进（封顶 95）；
* - 一旦读到首个真实事件（progress > 0），立即 stopFakeProgress 交出控制权，
*   把 real 映射到 [90,99] 并以 max(当前, mapped) 单调写入；
* - 任务离开 uploading（成功 / 取消 / 失败）或 adapter 不支持时自动停。
*
* 不支持 queryTencentDocsUploadProgress 的环境（旧 adapter / Web）直接 no-op，
* 回退到纯假进度行为，向后兼容。
*/
function startRealProgress(taskId) {
	stopRealProgress(taskId);
	const adapter = activeAdapter;
	const task0 = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
	if (!adapter?.queryTencentDocsUploadProgress || !task0?.cancelToken) return;
	const cancelToken = task0.cancelToken;
	const timer = setInterval(() => {
		const task = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
		if (!task || task.status !== "uploading") {
			stopRealProgress(taskId);
			return;
		}
		adapter.queryTencentDocsUploadProgress({ cancelToken }).then(({ progress }) => {
			const latest = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
			if (!latest || latest.status !== "uploading") {
				stopRealProgress(taskId);
				return;
			}
			if (!(progress > 0)) return;
			stopFakeProgress(taskId);
			const mapped = mapRealProgressToPercent(progress);
			if (mapped <= latest.percent) return;
			documentUploadStore.getState().updateTask(taskId, {
				percent: mapped,
				bytesUploaded: Math.round(mapped / 100 * latest.size)
			});
		}).catch(() => {});
	}, REAL_PROGRESS_POLL_MS);
	realProgressTimers.set(taskId, timer);
}
function stopRealProgress(taskId) {
	const timer = realProgressTimers.get(taskId);
	if (timer) {
		clearInterval(timer);
		realProgressTimers.delete(taskId);
	}
}
/**
* 推动调度：找出 queued/retrying 任务，按并发上限发起新的 upload。
* 由 store.subscribe 自动触发，也可以由 enqueue 之后手动调一次（首次启动）。
*
* 不同 source 类型可执行性判断各自独立：
* - 'local'：依赖 adapter.uploadTencentDocsFile
* - 'tdoc-personal'：依赖 TencentDocs facade 的 batchCreateSaasImport + queryBatchSaasImportProgress
*   （getPersonalTdocCookie 在 panel 编排阶段已经取过并塞进 task，runner 不再去取）
*
* 任一类型不可执行时，仅把对应类型的 queued/retrying 任务 fail 掉，不影响另一类。
*
* tdoc-personal 调度路径与 local 不同：
* - local 走"单任务并发上限 DEFAULT_CONCURRENCY"调度，每个任务独立请求；
* - tdoc-personal 改为按 (enterpriseId | tdocCookie | targetFolderId) 分组合并，
*   一次提交一个 batch（最多 20 个 file_id），创建后挂到共享 poller 上轮询批次进度。
*   多个分组、多个批次互不阻塞，但 local 的并发上限不影响 tdoc-personal 批次数。
*/
function tick() {
	if (!activeAdapter) return;
	const localUploadAvailable = !!activeAdapter.uploadTencentDocsFile;
	const saasImportFacade = activeSaasImportFacade;
	const saasImportAvailable = !!saasImportFacade;
	const allTasks = documentUploadStore.getState().tasks;
	for (const t of allTasks) {
		if (t.status !== "queued" && t.status !== "retrying") continue;
		const source = t.source ?? "local";
		if (source === "local" && !localUploadAvailable) documentUploadStore.getState().updateTask(t.id, {
			status: "failed",
			error: "Upload not supported in current environment",
			finishedAt: Date.now()
		});
		else if (source === "tdoc-personal" && !saasImportAvailable) documentUploadStore.getState().updateTask(t.id, {
			status: "failed",
			error: "Tencent Docs personal import not supported in current environment",
			finishedAt: Date.now()
		});
	}
	const tasks = documentUploadStore.getState().tasks;
	if (saasImportFacade) scheduleSaasImportBatches(saasImportFacade, tasks);
	const uploadingCount = tasks.filter((t) => t.status === "uploading" && (t.source ?? "local") === "local").length;
	if (uploadingCount >= DEFAULT_CONCURRENCY) return;
	const slots = DEFAULT_CONCURRENCY - uploadingCount;
	const ready = tasks.filter((t) => (t.status === "queued" || t.status === "retrying") && (t.source ?? "local") === "local" && !inFlightTaskIds.has(t.id));
	if (ready.length === 0) return;
	for (const task of ready.slice(0, slots)) executeTask(task);
}
async function executeTask(task) {
	if (!activeAdapter?.uploadTencentDocsFile) return;
	if (task.size <= 0 && task.retryCount === 0) {
		documentUploadStore.getState().updateTask(task.id, {
			status: "failed",
			error: EMPTY_FILE_ERROR_SENTINEL,
			finishedAt: Date.now()
		});
		tick();
		return;
	}
	if (isOverSizeLimit(task.fileName, task.size)) {
		documentUploadStore.getState().updateTask(task.id, {
			status: "failed",
			error: FILE_TOO_LARGE_ERROR_SENTINEL,
			finishedAt: Date.now()
		});
		tick();
		return;
	}
	inFlightTaskIds.add(task.id);
	documentUploadStore.getState().updateTask(task.id, {
		status: "uploading",
		startedAt: Date.now(),
		percent: 0,
		bytesUploaded: 0,
		error: void 0
	});
	startFakeProgress(task.id);
	startRealProgress(task.id);
	const targetFolderId = await ensureFolderForTask(task);
	try {
		const result = await activeAdapter.uploadTencentDocsFile({
			filePath: task.filePath,
			fileName: task.fileName,
			folder_id: targetFolderId ?? void 0,
			cancelToken: task.cancelToken,
			password: task.password
		});
		if (documentUploadStore.getState().tasks.find((t) => t.id === task.id)?.status === "cancelled") {
			stopFakeProgress(task.id);
			inFlightTaskIds.delete(task.id);
			tick();
			return;
		}
		stopFakeProgress(task.id);
		documentUploadStore.getState().updateTask(task.id, {
			status: "success",
			percent: 100,
			bytesUploaded: task.size,
			finishedAt: Date.now(),
			resultFileId: extractFileId(result),
			resultDocUrl: extractFileUrl(result)
		});
	} catch (err) {
		stopFakeProgress(task.id);
		if (documentUploadStore.getState().tasks.find((t) => t.id === task.id)?.status === "cancelled") {
			inFlightTaskIds.delete(task.id);
			tick();
			return;
		}
		if (isPreflightEmptyFileError(err)) {
			documentUploadStore.getState().updateTask(task.id, {
				status: "failed",
				error: EMPTY_FILE_ERROR_SENTINEL,
				finishedAt: Date.now()
			});
			return;
		}
		if (isPasswordRetcode(err)) {
			const wasPrompted = !!task.passwordPromptedOnce || !!task.password;
			documentUploadStore.getState().updateTask(task.id, {
				status: "failed",
				error: wasPrompted ? PASSWORD_WRONG_ERROR_SENTINEL : PASSWORD_REQUIRED_ERROR_SENTINEL,
				password: void 0,
				passwordPromptedOnce: wasPrompted,
				finishedAt: Date.now()
			});
			return;
		}
		const businessSentinel = resolveTdocImportSentinel(err);
		if (businessSentinel) {
			documentUploadStore.getState().updateTask(task.id, {
				status: "failed",
				error: businessSentinel,
				finishedAt: Date.now()
			});
			return;
		}
		if (task.passwordPromptedOnce || task.password) {
			documentUploadStore.getState().updateTask(task.id, {
				status: "failed",
				error: PASSWORD_WRONG_ERROR_SENTINEL,
				password: void 0,
				passwordPromptedOnce: true,
				finishedAt: Date.now()
			});
			return;
		}
		documentUploadStore.getState().updateTask(task.id, {
			status: "failed",
			error: extractErrorMessage(err),
			finishedAt: Date.now()
		});
	} finally {
		stopRealProgress(task.id);
		inFlightTaskIds.delete(task.id);
		tick();
	}
}
/**
* 入口：把当前 queued/retrying 的 tdoc-personal 任务分组、切批、并发起 batch 创建。
*
* 与 local 路径不同，这里不受 DEFAULT_CONCURRENCY 限制：单次 tick 会把所有可执行
* 的分组都启动起来。上游 batch 接口本身就在做"批量"语义，前端再加并发上限意义不大。
*/
function scheduleSaasImportBatches(facade, tasks) {
	const ready = tasks.filter((t) => (t.source ?? "local") === "tdoc-personal" && (t.status === "queued" || t.status === "retrying") && !inFlightSaasTaskIds.has(t.id));
	if (ready.length === 0) return;
	const validReady = [];
	for (const task of ready) {
		const enterpriseId = task.enterpriseId?.trim() ?? "";
		const fileId = task.personalDocId?.trim() ?? "";
		const cookie = task.tdocCookie ?? "";
		if (!enterpriseId || !fileId || !cookie) {
			documentUploadStore.getState().updateTask(task.id, {
				status: "failed",
				error: !cookie ? "Missing Tencent Docs personal cookie (please log in first)" : "Missing enterpriseId or personalDocId",
				finishedAt: Date.now()
			});
			continue;
		}
		validReady.push(task);
	}
	if (validReady.length === 0) return;
	const groups = /* @__PURE__ */ new Map();
	for (const t of validReady) {
		const key = [
			t.enterpriseId ?? "",
			t.tdocCookie ?? "",
			t.targetFolderId ?? ""
		].join("|");
		const bucket = groups.get(key);
		if (bucket) bucket.push(t);
		else groups.set(key, [t]);
	}
	for (const [, groupTasks] of groups) for (let i = 0; i < groupTasks.length; i += SAAS_IMPORT_BATCH_SIZE) {
		const chunk = groupTasks.slice(i, i + SAAS_IMPORT_BATCH_SIZE);
		for (const t of chunk) inFlightSaasTaskIds.add(t.id);
		createSaasImportBatch(facade, chunk).catch((err) => {
			console.warn("[DocumentUpload] createSaasImportBatch failed:", err);
		});
	}
}
/**
* 发起一次批量创建，并把结果绑定到对应 task。失败时整批 task 一起 fail。
* 创建成功后立刻挂到共享 poller 上。
*/
async function createSaasImportBatch(facade, tasks) {
	if (tasks.length === 0) return;
	const head = tasks[0];
	const enterpriseId = head.enterpriseId.trim();
	const cookie = head.tdocCookie;
	const targetFolderId = head.targetFolderId ?? void 0;
	const startedAt = Date.now();
	for (const t of tasks) documentUploadStore.getState().updateTask(t.id, {
		status: "uploading",
		startedAt,
		percent: 0,
		bytesUploaded: 0,
		error: void 0
	});
	const liveTasks = tasks.filter((t) => !isCancelledNow(t.id));
	if (liveTasks.length === 0) {
		for (const t of tasks) inFlightSaasTaskIds.delete(t.id);
		return;
	}
	const liveFileIds = liveTasks.map((t) => t.personalDocId.trim());
	let createResp;
	try {
		createResp = await facade.batchCreateSaasImport({
			enterpriseId,
			file_ids: liveFileIds,
			target_folder_id: targetFolderId,
			cookie
		});
	} catch (err) {
		const message = resolveTdocImportSentinel(err) ?? extractErrorMessage(err);
		for (const t of tasks) {
			inFlightSaasTaskIds.delete(t.id);
			const latest = documentUploadStore.getState().tasks.find((x) => x.id === t.id);
			if (!latest || latest.status === "cancelled" || latest.status === "failed" || latest.status === "success") continue;
			documentUploadStore.getState().updateTask(t.id, {
				status: "failed",
				error: message,
				finishedAt: Date.now()
			});
		}
		return;
	}
	const batchOperationId = createResp?.batch_operation_id?.trim() ?? "";
	if (!batchOperationId) {
		const message = "batchCreateSaasImport returned empty batch_operation_id";
		for (const t of tasks) {
			inFlightSaasTaskIds.delete(t.id);
			const latest = documentUploadStore.getState().tasks.find((x) => x.id === t.id);
			if (!latest || latest.status === "cancelled" || latest.status === "failed" || latest.status === "success") continue;
			documentUploadStore.getState().updateTask(t.id, {
				status: "failed",
				error: message,
				finishedAt: Date.now()
			});
		}
		return;
	}
	const fileIdToOperationId = /* @__PURE__ */ new Map();
	for (const sub of createResp?.sub_tasks ?? []) if (sub?.file_id && sub?.operation_id) fileIdToOperationId.set(sub.file_id, sub.operation_id);
	const fileIdToTaskId = /* @__PURE__ */ new Map();
	const taskIdsInBatch = [];
	for (const t of liveTasks) {
		const fid = t.personalDocId.trim();
		fileIdToTaskId.set(fid, t.id);
		taskIdsInBatch.push(t.id);
		documentUploadStore.getState().updateTask(t.id, {
			batchOperationId,
			saasOperationId: fileIdToOperationId.get(fid) ?? ""
		});
	}
	for (const t of tasks) if (!liveTasks.includes(t)) inFlightSaasTaskIds.delete(t.id);
	const batch = {
		batchOperationId,
		enterpriseId,
		cookie,
		taskIds: taskIdsInBatch,
		fileIdToTaskId,
		startedAt: Date.now()
	};
	activeSaasImportBatches.set(batchOperationId, batch);
	pollSaasImportBatch(facade, batch).catch((err) => {
		console.warn("[DocumentUpload] pollSaasImportBatch failed:", err);
	});
}
/**
* 轮询一个 batch，直到批内所有 task 都进入终态 / 整体超时 / store 里全部 task 不再活跃。
*
* 单个轮询 cycle 内：
* - 取一次 batch progress
* - 按 file_id 路由到对应 task：成功 → success+doc_url；失败 → failed；
*   被取消（上游侧）→ cancelled；进行中 → 更新 percent/bytesUploaded
* - 已处于 cancelled / failed / success 的 task 不再写回，避免抹掉用户已看到的状态
*/
async function pollSaasImportBatch(facade, batch) {
	await sleep(1500);
	while (true) {
		if (Date.now() - batch.startedAt > SAAS_IMPORT_TIMEOUT_MS) {
			finalizeBatchTimeout(batch);
			return;
		}
		if (allBatchTasksInactive(batch)) {
			cleanupBatch(batch);
			return;
		}
		let resp;
		try {
			resp = await facade.queryBatchSaasImportProgress({
				enterpriseId: batch.enterpriseId,
				batch_operation_id: batch.batchOperationId,
				cookie: batch.cookie
			});
		} catch (err) {
			console.warn("[DocumentUpload] queryBatchSaasImportProgress error (will retry):", err);
			await sleep(SAAS_IMPORT_POLL_INTERVAL_MS);
			continue;
		}
		const results = resp?.results ?? [];
		for (const r of results) {
			const taskId = batch.fileIdToTaskId.get(r.file_id);
			if (!taskId) continue;
			const latest = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
			if (!latest) {
				batch.fileIdToTaskId.delete(r.file_id);
				continue;
			}
			if (latest.status === "success" || latest.status === "failed" || latest.status === "cancelled") continue;
			const status = r.status ?? 0;
			const rawPercent = r.progress ?? 0;
			const clampedPercent = status === SAAS_STATUS_SUCCESS ? 100 : Math.min(99, Math.max(0, Math.round(rawPercent)));
			if (status === SAAS_STATUS_SUCCESS) {
				documentUploadStore.getState().updateTask(taskId, {
					status: "success",
					percent: 100,
					bytesUploaded: latest.size,
					finishedAt: Date.now(),
					resultDocUrl: r.doc_url || void 0
				});
				continue;
			}
			if (status === SAAS_STATUS_FAILED) {
				documentUploadStore.getState().updateTask(taskId, {
					status: "failed",
					error: "SaaS import failed (upstream status=4)",
					finishedAt: Date.now()
				});
				continue;
			}
			if (status === SAAS_STATUS_CANCELLED) {
				documentUploadStore.getState().updateTask(taskId, {
					status: "cancelled",
					finishedAt: Date.now()
				});
				continue;
			}
			documentUploadStore.getState().updateTask(taskId, {
				percent: clampedPercent,
				bytesUploaded: Math.round(clampedPercent / 100 * latest.size)
			});
		}
		if (allBatchTasksInactive(batch)) {
			cleanupBatch(batch);
			return;
		}
		await sleep(SAAS_IMPORT_POLL_INTERVAL_MS);
	}
}
/**
* 整体超时收尾：把仍处于 uploading（或异常仍未结束）的 task 全部标 failed。
* 已经 success/failed/cancelled 的不动。
*/
function finalizeBatchTimeout(batch) {
	for (const taskId of batch.taskIds) {
		const latest = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
		if (!latest) continue;
		if (latest.status === "success" || latest.status === "failed" || latest.status === "cancelled") continue;
		documentUploadStore.getState().updateTask(taskId, {
			status: "failed",
			error: "SaaS import polling timed out (>5min)",
			finishedAt: Date.now()
		});
	}
	cleanupBatch(batch);
}
/** 全部 task 都已离开活跃态（success / failed / cancelled / 已被移除）→ true */
function allBatchTasksInactive(batch) {
	const tasks = documentUploadStore.getState().tasks;
	for (const taskId of batch.taskIds) {
		const t = tasks.find((x) => x.id === taskId);
		if (!t) continue;
		if (t.status === "queued" || t.status === "uploading" || t.status === "retrying") return false;
	}
	return true;
}
/** 把 batch 从 active 集合 / inFlight 集合中清掉 */
function cleanupBatch(batch) {
	activeSaasImportBatches.delete(batch.batchOperationId);
	for (const taskId of batch.taskIds) inFlightSaasTaskIds.delete(taskId);
	tick();
}
function isCancelledNow(taskId) {
	return documentUploadStore.getState().tasks.find((t) => t.id === taskId)?.status === "cancelled";
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
* TODO: 文件夹上传场景下"按 relativePath 创建并缓存 folder_id"。
* 后端目前不暴露 createTencentDocsFolder 接口，本函数直接返回 task.targetFolderId
* （即 panel 当前层），子路径会被平铺写入。
*
* 后端补 createFolder 后的实现思路：
* 1. 把 task.relativePath 按 / 切段，去掉最后一段（文件名）
* 2. 沿 segments 维护一个 (parentId, segmentName) → folderId 的模块级 LRU 缓存
* 3. 对每段 ensure：缓存命中直接用；未命中先 list（精确名搜索），再不命中才创建
* 4. 缓存的有效期建议 5min，避免跨 batch 错乱
*/
async function ensureFolderForTask(task) {
	return task.targetFolderId;
}
function isPreflightEmptyFileError(err) {
	const raw = err instanceof Error ? err.message ?? "" : typeof err === "string" ? err : "";
	if (!raw) return false;
	const m = TDOC_ERROR_PREFIX_RE.exec(raw);
	return !!(m && m[1] === "preflight" && Number(m[2]) === PREFLIGHT_EMPTY_FILE_RETCODE);
}
/**
* 从 unknown err 里尝试提取主进程透传的腾讯文档 retcode（见 stripTdocErrorPrefix
* 注释里的前缀模板），命中 12975 即返回 true。
*
* 不依赖具体 step 名（apply / complete / queryTask 都可能携带业务码），也不
* 依赖 stripTdocErrorPrefix 的剥壳结果——直接在原始 message 上跑正则，避免后续
* 调整剥壳逻辑时漏匹配。
*/
function isPasswordRetcode(err) {
	let raw;
	if (err instanceof Error) raw = err.message ?? "";
	else if (typeof err === "string") raw = err;
	else return false;
	if (!raw) return false;
	if (TDOC_ERROR_PREFIX_RE.test(raw)) {
		const m = TDOC_ERROR_PREFIX_RE.exec(raw);
		if (m && Number(m[2]) === PASSWORD_RETCODE) return true;
	}
	return new RegExp(`(?:^|[^\\d])${PASSWORD_RETCODE}(?:[^\\d]|$)`).test(raw);
}
/**
* 从原始 err 中尝试识别一个"已知腾讯文档导入业务错误码"，命中即返回对应 sentinel。
*
* 与 `isPasswordRetcode` 的关系：
* - 12975（密码相关）由 isPasswordRetcode 单独路径处理（涉及密码状态机），
*   本函数即便看到 12975 也只返回 null（保险起见，过滤掉以避免错位覆盖）；
* - 其它命中 ./tdoc-import-error-codes 表里的 retcode → 返回该 sentinel；
* - 未命中（包括无法解析出 retcode）→ 返回 null，由上层兜底逻辑处理。
*
* 兼容范围：runner 既能识别本地上传链路（`[TencentDocs] uploadFile.<step> failed`）
* 抛出的 retcode，也能识别 saas-imports/batch 链路里嵌套 `retcode=410807` /
* `"code":520106` 这类裸文本。
*/
function resolveTdocImportSentinel(err) {
	let raw;
	if (err instanceof Error) raw = err.message ?? "";
	else if (typeof err === "string") raw = err;
	else return null;
	if (!raw) return null;
	const code = extractTdocRetcodeFromMessage(raw);
	if (code === null || code === PASSWORD_RETCODE) return null;
	return mapTdocImportRetCodeToSentinel(code);
}
function isNetworkErrorMessage(message) {
	if (!message) return false;
	return NETWORK_ERROR_PATTERNS.some((re) => re.test(message));
}
function stripTdocSaasImportsPrefix(message) {
	const head = TDOC_SAAS_ERROR_PREFIX_RE.exec(message);
	if (!head) return null;
	const segment = head[1];
	const rawRespMatch = TDOC_SAAS_RAW_RESPONSE_MSG_RE.exec(message);
	if (rawRespMatch?.[1]) return rawRespMatch[1].trim();
	const kvMatch = TDOC_SAAS_KV_MSG_RE.exec(message);
	if (kvMatch?.[1]) return kvMatch[1].trim();
	const envMatch = TDOC_SAAS_ENVELOPE_MSG_RE.exec(message);
	if (envMatch?.[1]) {
		const envMsg = envMatch[1].replace(/\\"/g, "\"").trim();
		const inner = TDOC_SAAS_KV_MSG_RE.exec(envMsg);
		if (inner?.[1]) return inner[1].trim();
		return envMsg.replace(/^-?\d+:\s*/, "").trim() || null;
	}
	return `${segment} failed`;
}
function stripTdocErrorPrefix(message) {
	const saasMsg = stripTdocSaasImportsPrefix(message);
	if (saasMsg) return saasMsg;
	const m = TDOC_ERROR_PREFIX_RE.exec(message);
	if (!m) return message;
	const userMsg = (m[3] ?? "").trim();
	if (userMsg) return userMsg;
	return `${m[1]} failed (${m[2]})`;
}
/**
* 判断当前是否处于"用户已断网"状态。
*
* 仅在浏览器 / Electron renderer 环境中可用；headless / SSR 下 navigator
* 可能不存在，按"未断网"处理（依赖 message 模式匹配兜底）。
*/
function isOffline() {
	if (typeof navigator === "undefined") return false;
	return navigator.onLine === false;
}
function extractErrorMessage(err) {
	let raw;
	if (err instanceof Error) raw = err.message || err.name || "";
	else if (typeof err === "string") raw = err;
	else try {
		raw = JSON.stringify(err);
	} catch {
		raw = "Unknown error";
	}
	if (isOffline()) return NETWORK_ERROR_MESSAGE;
	if (isNetworkErrorMessage(raw)) return NETWORK_ERROR_MESSAGE;
	return stripTdocErrorPrefix(raw) || "Unknown error";
}
/** 上传成功响应里若带 file_id（结构因后端而异），尽量提取出来 */
function extractFileId(result) {
	if (!result || typeof result !== "object") return;
	const r = result;
	if (typeof r.file_id === "string") return r.file_id;
	if (typeof r.fileId === "string") return r.fileId;
}
/**
* 上传成功响应里若带文档原始链接（docs.qq.com URL），尽量提取出来。
*
* 上游 facade.uploadFile 实际返回的是完整的 TdocFileInfo（与 createFile 一致），
* 字段名是 `url`；同时兼容部分中间层把字段重命名为 `doc_url` / `docUrl` 的情况。
*
* 提取后落到 task.resultDocUrl，dock 行可在 success 状态下直接走
* adapter.openExternal 打开浏览器预览，与 PreviewModal 里的 openInBrowser
* 兜底行为对齐（不依赖 React Context，因此 dock 这个全局浮窗也能用）。
*/
function extractFileUrl(result) {
	if (!result || typeof result !== "object") return;
	const r = result;
	if (typeof r.url === "string" && r.url) return r.url;
	if (typeof r.doc_url === "string" && r.doc_url) return r.doc_url;
	if (typeof r.docUrl === "string" && r.docUrl) return r.docUrl;
}
/**
* 取消单个任务。
* - queued / retrying：直接置 cancelled
* - uploading（local）：调 adapter.cancelTencentDocsUpload。host 侧（issue #58313）
*   会 abort in-flight 的 PUT，并在 complete_upload 之前卡取消检查——取消后**不
*   调用 complete_upload**，文件不会落库；uploadFile 以 CANCELLED reject，
*   executeTask 的 catch 分支识别 store 里的 cancelled 状态，不写 success
* - uploading（tdoc-personal）：上游没有"取消导入"接口，runner 在轮询 loop
*   每轮开头都会检测 store 里的 cancelled 状态并跳出，所以本地置 cancelled 即可
*   尽快终止轮询
*/
function cancelTask(taskId) {
	const task = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
	if (!task) return;
	if (task.status === "success" || task.status === "cancelled" || task.status === "failed") return;
	stopFakeProgress(taskId);
	stopRealProgress(taskId);
	documentUploadStore.getState().updateTask(taskId, {
		status: "cancelled",
		finishedAt: Date.now()
	});
	if ((task.source ?? "local") === "local" && task.status === "uploading" && activeAdapter?.cancelTencentDocsUpload) activeAdapter.cancelTencentDocsUpload({ cancelToken: task.cancelToken }).catch((err) => {
		console.warn("[DocumentUpload] cancelTencentDocsUpload failed:", err);
	});
	tick();
}
/**
* 重试任务。
* - 对 status=failed 或 status=cancelled 生效（两种终态都允许"重新上传"）
*     - failed：自然失败的网络/服务端错误
*     - cancelled：用户主动点取消，但又想"再传一次"的场景
* - 切到 retrying，下一次 tick 会拉起新的执行
*
* `options.password` 可选：当 task 因加密文件 retcode 12975 失败、用户在密码
* 输入框里填了密码后，dock 会用这个参数把密码塞回 task 上，下一次 tick
* 调用 adapter 时就会带上该密码（透传给主进程的 complete_upload 阶段）。
*
* 不传 password（如普通"网络错误重试"或"取消后重试"）时不修改 task.password
* 字段，保留上次输入的密码用于继续重试场景。
*/
function retryTask(taskId, options) {
	const task = documentUploadStore.getState().tasks.find((t) => t.id === taskId);
	if (!task || task.status !== "failed" && task.status !== "cancelled") return;
	cleanupTaskRetryArtifacts(taskId);
	const patch = {
		status: "retrying",
		retryCount: task.retryCount + 1,
		error: void 0,
		startedAt: void 0,
		finishedAt: void 0,
		percent: 0,
		bytesUploaded: 0
	};
	if (options && Object.prototype.hasOwnProperty.call(options, "password")) patch.password = options.password;
	documentUploadStore.getState().updateTask(taskId, patch);
	tick();
}
/**
* 把 taskId 从所有 in-flight 占位 / 老 saas batch 的引用里清掉。
*
* 仅在 retry 入口（retryTask / retryAllFailed / retryFolder）调用，
* 用于打破 in-flight 残留导致的「重试无效」问题。详见 retryTask 注释。
*/
function cleanupTaskRetryArtifacts(taskId) {
	inFlightTaskIds.delete(taskId);
	inFlightSaasTaskIds.delete(taskId);
	for (const batch of activeSaasImportBatches.values()) {
		const idx = batch.taskIds.indexOf(taskId);
		if (idx !== -1) batch.taskIds.splice(idx, 1);
		for (const [fileId, mappedTaskId] of batch.fileIdToTaskId) if (mappedTaskId === taskId) batch.fileIdToTaskId.delete(fileId);
	}
}
/**
* 一键重试全部 failed。
*
* 跳过密码相关的失败：因为这类 task 必须等用户在密码弹框里输入密码后才能
* 重试，"全部重试"按钮直接走老路只会再次得到同一个错误。这些 task 由
* dock 层独立的密码弹框流程接管。
*
* 0B 失败保留在重试集合里：runner 入口的 0B 短路仅在 retryCount === 0 时
* 生效（issue #46568），retry 后会真正走到 main 进程重新 fs.stat 拿真实
* 大小，service 层有 0B preflight 兜底，可以安全放行。
*
* 超大文件失败排除在重试集合外：Desktop main 进程在 service preflight 之前
* 会先把整个文件读入内存计算 md5，一旦未改小的超大文件进入 main 就可能
* 引发内存暴涨 / 进程卡死。客户端继续把它当作硬终态，不暴露重试入口。
*/
function retryAllFailed() {
	const failed = documentUploadStore.getState().tasks.filter((t) => t.status === "failed" && !isPasswordSentinel(t.error) && t.error !== "TDOC_UPLOAD_FILE_TOO_LARGE");
	for (const t of failed) retryTask(t.id);
}
/** 判断 task.error 是否属于"需要密码 / 密码错误"sentinel */
function isPasswordSentinel(error) {
	return error === "TDOC_UPLOAD_PASSWORD_REQUIRED" || error === "TDOC_UPLOAD_PASSWORD_WRONG";
}
/**
* 取消当前 store 中所有"未完成"的任务（queued / uploading / retrying）。
*
* 用于浮窗关闭时的清理：把进行中的请求 / 假进度计时器 / saas 轮询统一打断，
* 避免后续 clearAll 把任务记录抹掉之后 runner 还在悬挂跑（无 task 命中时
* updateTask 是 no-op，但 fakeProgress / 轮询 loop 不会自己退出）。
*
* 已 success / failed / cancelled 的任务不会被改动。
*/
function cancelAllUnfinished() {
	const tasks = documentUploadStore.getState().tasks;
	for (const task of tasks) if (task.status === "queued" || task.status === "uploading" || task.status === "retrying") cancelTask(task.id);
}
/**
* 取消整个文件夹（节点）下所有"未完成"的任务。
*
* 语义：
* - 仅作用于状态为 queued / uploading / retrying 的任务
* - 不影响已 success / failed / cancelled 的任务
* - 文件夹节点由 folderPath（形如 `${batchId}\u0001a/b/c`）唯一标识，
*   只取该 batchId 下、relativePath 命中该子树（等于 realPath 或以 `realPath/` 开头）
*   的任务，避免跨批次或跨同名节点误伤
*
* 真正取消的副作用（adapter cancelToken / saas 轮询退出）走 cancelTask 内部逻辑。
*/
function cancelFolder(folderPath) {
	const { batchId: targetBatchId, realPath } = parseFolderPath(folderPath);
	if (!targetBatchId || !realPath) return;
	const prefix = `${realPath}/`;
	const tasks = documentUploadStore.getState().tasks;
	for (const task of tasks) {
		if (task.status !== "queued" && task.status !== "uploading" && task.status !== "retrying") continue;
		if ((task.batchId ?? task.id) !== targetBatchId) continue;
		if (task.relativePath !== realPath && !task.relativePath.startsWith(prefix)) continue;
		cancelTask(task.id);
	}
}
/**
* 重试整个文件夹（节点）下所有 failed / cancelled 的任务。
*
* 语义：
* - 作用于状态为 failed 或 cancelled 的子任务（含文件夹本身失败 + 子文件失败 / 被取消），
*   两种终态统一交给 retryTask 处理（其 guard 已放宽到 failed | cancelled）
* - 不影响 uploading / queued / success / retrying
* - 文件夹节点由 folderPath（形如 `${batchId}\u0001a/b/c`）唯一标识，
*   只取该 batchId 下、relativePath 命中该子树的任务，避免跨批次误伤
*
* 触发场景：用户在 dock 文件夹行 hover 出的"重试"按钮点击后调用。文件夹既可
* 能因网络出错处于 failed 终态，也可能被用户主动 cancel 后处于 cancelled
* 终态，两种终态都允许通过本函数一键拉起整个子树重新上传。
*/
function retryFolder(folderPath) {
	const { batchId: targetBatchId, realPath } = parseFolderPath(folderPath);
	if (!targetBatchId || !realPath) return;
	const prefix = `${realPath}/`;
	const tasks = documentUploadStore.getState().tasks;
	for (const task of tasks) {
		if (task.status !== "failed" && task.status !== "cancelled") continue;
		if (task.status === "failed" && isPasswordSentinel(task.error)) continue;
		if (task.status === "failed" && task.error === "TDOC_UPLOAD_FILE_TOO_LARGE") continue;
		if ((task.batchId ?? task.id) !== targetBatchId) continue;
		if (task.relativePath !== realPath && !task.relativePath.startsWith(prefix)) continue;
		retryTask(task.id);
	}
}
/**
* 监听浏览器 offline 事件：用户断网瞬间立即把所有 queued / uploading /
* retrying 的任务标记为 failed("Network Error")。
*
* 不这么做的话，PUT 阶段（COS 大文件直传）等动作会一直卡到 net.fetch 自身
* 超时（可能十几秒甚至更久）才能进入失败态，期间假进度还在动，用户体感是
* 「一直在传却没结果」。主动 fail 之后：
*   - 失败态副标题 / Tooltip 显示 'Network Error'
*   - 重试按钮立刻就绪，用户恢复联网后点一下就能从头再传
*
* 对仍在跑的 net.fetch 不强行 abort —— 任由它后续以网络错误自然 reject，
* executeTask 的 catch 已经能识别为 cancelled / failed 不冲突；fakeProgress
* 也会通过 stopFakeProgress(taskId) 在状态切换时停掉。
*
* online 事件不自动触发重试，避免用户网络刚抖一下就重新发起 N 个请求；
* 由用户点重试按钮显式触发，符合需求"用户恢复联网后，需要支持点击重试按钮"。
*/
function failAllInFlightTasksAsNetworkError() {
	const now = Date.now();
	const tasks = documentUploadStore.getState().tasks;
	for (const task of tasks) {
		if (task.status !== "queued" && task.status !== "uploading" && task.status !== "retrying") continue;
		stopFakeProgress(task.id);
		stopRealProgress(task.id);
		documentUploadStore.getState().updateTask(task.id, {
			status: "failed",
			error: NETWORK_ERROR_MESSAGE,
			finishedAt: now
		});
		inFlightTaskIds.delete(task.id);
		inFlightSaasTaskIds.delete(task.id);
	}
}
function bindNetworkListenersOnce() {
	if (networkListenersBound) return;
	if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
	networkListenersBound = true;
	window.addEventListener("offline", () => {
		console.info("[DocumentUpload] navigator went offline → fail in-flight uploads as Network Error");
		failAllInFlightTasksAsNetworkError();
	});
}
function startDocumentUploadRunner() {
	if (storeSubscribed) return;
	storeSubscribed = true;
	bindNetworkListenersOnce();
	documentUploadStore.subscribe(() => {
		Promise.resolve().then(() => {
			tick();
		});
	});
}
function nextCancelToken() {
	cancelTokenCounter += 1;
	return `tdoc-upload-${Date.now()}-${cancelTokenCounter}`;
}
function createTask(input) {
	return {
		id: nextCancelToken(),
		batchId: input.batchId,
		source: "local",
		filePath: input.filePath,
		fileName: input.fileName,
		relativePath: input.relativePath,
		size: input.size,
		targetFolderId: input.targetFolderId,
		status: "queued",
		percent: 0,
		bytesUploaded: 0,
		cancelToken: nextCancelToken(),
		retryCount: 0
	};
}
/**
* 生成一个新的 batchId。
* 同一次「点上传 → enqueue」内的所有 task 应共享同一个返回值，作为浮窗 UI
* 分组的隔离键，避免后续上传同名文件夹时与本批次同名节点被合并刷新。
*/
function nextBatchId() {
	return `tdoc-upload-batch-${Date.now()}-${++cancelTokenCounter}`;
}
/**
* 构造一个 source='tdoc-personal' 的 SaaS 导入任务。
*
* 与本地上传任务的差异：
* - filePath 留空（远端到远端导入，本地无物理文件）
* - relativePath 直接用 fileName（不存在嵌套目录）
* - size 设为 100：runner 不依赖真实字节，只用 size 折算 bytesUploaded 给"总速度"占位
*/
function createSaasImportTask(input) {
	return {
		id: nextCancelToken(),
		batchId: input.batchId,
		source: "tdoc-personal",
		personalDocId: input.personalDocId,
		enterpriseId: input.enterpriseId,
		tdocCookie: input.tdocCookie,
		mimeType: input.mimeType,
		filePath: "",
		fileName: input.fileName,
		relativePath: input.fileName,
		size: 100,
		targetFolderId: input.targetFolderId,
		status: "queued",
		percent: 0,
		bytesUploaded: 0,
		cancelToken: nextCancelToken(),
		retryCount: 0
	};
}
var DEFAULT_CONCURRENCY, FAKE_PROGRESS_TICK_MS, FAKE_PROGRESS_MAX_PERCENT, REAL_PROGRESS_POLL_MS, REAL_PROGRESS_BAND_MIN, REAL_PROGRESS_BAND_MAX, ESTIMATED_THROUGHPUT_BYTES_PER_SEC, MIN_EXPECTED_PUT_MS, SAAS_IMPORT_POLL_INTERVAL_MS, SAAS_IMPORT_TIMEOUT_MS, SAAS_STATUS_SUCCESS, SAAS_STATUS_FAILED, SAAS_STATUS_CANCELLED, SAAS_IMPORT_BATCH_SIZE, activeAdapter, activeSaasImportFacade, fakeProgressTimers, realProgressTimers, inFlightTaskIds, inFlightSaasTaskIds, activeSaasImportBatches, NETWORK_ERROR_MESSAGE, FILE_TOO_LARGE_ERROR_SENTINEL, EMPTY_FILE_ERROR_SENTINEL, PASSWORD_REQUIRED_ERROR_SENTINEL, PASSWORD_WRONG_ERROR_SENTINEL, PASSWORD_RETCODE, PREFLIGHT_EMPTY_FILE_RETCODE, NETWORK_ERROR_PATTERNS, TDOC_ERROR_PREFIX_RE, TDOC_SAAS_ERROR_PREFIX_RE, TDOC_SAAS_RAW_RESPONSE_MSG_RE, TDOC_SAAS_KV_MSG_RE, TDOC_SAAS_ENVELOPE_MSG_RE, storeSubscribed, networkListenersBound, cancelTokenCounter;
var init_document_upload_runner = __esmMin((() => {
	init_document_upload_task_store();
	init_pick_files_and_folders();
	init_tdoc_import_error_codes();
	DEFAULT_CONCURRENCY = 3;
	FAKE_PROGRESS_TICK_MS = 1500;
	FAKE_PROGRESS_MAX_PERCENT = 95;
	REAL_PROGRESS_POLL_MS = 2e3;
	REAL_PROGRESS_BAND_MIN = 90;
	REAL_PROGRESS_BAND_MAX = 99;
	ESTIMATED_THROUGHPUT_BYTES_PER_SEC = 8 * 1024 * 1024;
	MIN_EXPECTED_PUT_MS = 1500;
	SAAS_IMPORT_POLL_INTERVAL_MS = 3500;
	SAAS_IMPORT_TIMEOUT_MS = 300 * 1e3;
	SAAS_STATUS_SUCCESS = 3;
	SAAS_STATUS_FAILED = 4;
	SAAS_STATUS_CANCELLED = 5;
	SAAS_IMPORT_BATCH_SIZE = 20;
	activeAdapter = null;
	activeSaasImportFacade = null;
	fakeProgressTimers = /* @__PURE__ */ new Map();
	realProgressTimers = /* @__PURE__ */ new Map();
	inFlightTaskIds = /* @__PURE__ */ new Set();
	inFlightSaasTaskIds = /* @__PURE__ */ new Set();
	activeSaasImportBatches = /* @__PURE__ */ new Map();
	NETWORK_ERROR_MESSAGE = "Network Error";
	FILE_TOO_LARGE_ERROR_SENTINEL = "TDOC_UPLOAD_FILE_TOO_LARGE";
	EMPTY_FILE_ERROR_SENTINEL = "TDOC_UPLOAD_EMPTY_FILE";
	PASSWORD_REQUIRED_ERROR_SENTINEL = "TDOC_UPLOAD_PASSWORD_REQUIRED";
	PASSWORD_WRONG_ERROR_SENTINEL = "TDOC_UPLOAD_PASSWORD_WRONG";
	PASSWORD_RETCODE = 12975;
	PREFLIGHT_EMPTY_FILE_RETCODE = -1001;
	NETWORK_ERROR_PATTERNS = [
		/fetch failed/i,
		/failed to fetch/i,
		/network\s*error/i,
		/networkerror/i,
		/net::err_/i,
		/err_internet_disconnected/i,
		/err_network_changed/i,
		/err_name_not_resolved/i,
		/err_connection_/i,
		/err_address_unreachable/i,
		/err_timed_out/i,
		/\bENOTFOUND\b/,
		/\bECONNREFUSED\b/,
		/\bECONNRESET\b/,
		/\bETIMEDOUT\b/,
		/\bEAI_AGAIN\b/,
		/\bEHOSTUNREACH\b/,
		/\bENETUNREACH\b/,
		/\bENETDOWN\b/
	];
	TDOC_ERROR_PREFIX_RE = /^\[TencentDocs\]\s*uploadFile\.([a-zA-Z_]+)\s+failed:\s*(-?\d+)\s*(.*)$/s;
	TDOC_SAAS_ERROR_PREFIX_RE = /^\[TencentDocs\]\s*(saas-imports(?:\/[a-zA-Z_/-]+)?)\b/;
	TDOC_SAAS_RAW_RESPONSE_MSG_RE = /raw_response\s*=\s*\{[^}]*?\\*"msg\\*"\s*:\s*\\*"([^"\\]+)\\*"/;
	TDOC_SAAS_KV_MSG_RE = /(?:^|[\s,])msg=([^,}]+?)(?=\s*,\s*raw_response|\s*[,}]|$)/;
	TDOC_SAAS_ENVELOPE_MSG_RE = /"msg"\s*:\s*"((?:\\.|[^"\\])*)"/;
	storeSubscribed = false;
	networkListenersBound = false;
	cancelTokenCounter = 0;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/hooks/use-personal-tdoc-import.ts
function findListInObject(obj) {
	for (const k of KNOWN_LIST_KEYS) {
		const v = obj[k];
		if (Array.isArray(v) && v.length > 0) return v;
	}
	return null;
}
function extractDocList(raw) {
	if (Array.isArray(raw)) return raw;
	if (!raw || typeof raw !== "object") return null;
	const obj = raw;
	const payload = obj.payload;
	if (payload && typeof payload === "object" && !Array.isArray(payload)) {
		const files = payload.files;
		if (Array.isArray(files) && files.length > 0) return files;
	}
	const top = findListInObject(obj);
	if (top) return top;
	for (const v of Object.values(obj)) if (v && typeof v === "object" && !Array.isArray(v)) {
		const inner = findListInObject(v);
		if (inner) return inner;
	}
	return null;
}
function extractTitle(item) {
	if (typeof item === "string") return item;
	if (item && typeof item === "object") {
		const obj = item;
		for (const k of TITLE_KEYS) {
			const v = obj[k];
			if (typeof v === "string" && v.length > 0) return v;
		}
		for (const k of URL_KEYS) {
			const v = obj[k];
			if (typeof v === "string" && v.length > 0) {
				const tail = v.split("?")[0].split("/").filter(Boolean).pop();
				if (tail) return tail;
			}
		}
	}
	return null;
}
function usePersonalTdocImport(options = {}) {
	const t = useTranslation();
	const tencentDocs = useTencentDocsFacade();
	const currentAccount = useCurrentAccount();
	const [showImport, setShowImport] = (0, import_react$3.useState)(false);
	return {
		showImport,
		openImport: (0, import_react$3.useCallback)(() => setShowImport(true), []),
		closeImport: (0, import_react$3.useCallback)(() => setShowImport(false), []),
		handlePicked: (0, import_react$3.useCallback)((event) => {
			const data = event.raw;
			const list = extractDocList(data);
			if (!list || list.length === 0) {
				toast(t("tdoc.import.personalTdoc.pickedPrefix"));
				setShowImport(false);
				return;
			}
			if (list.map(extractTitle).filter((s) => !!s).length === 0) {
				toast(`${t("tdoc.import.personalTdoc.pickedPrefix")}${list.length}`);
				setShowImport(false);
				return;
			}
			const importItems = [];
			for (const item of list) {
				if (!item || typeof item !== "object") continue;
				const obj = item;
				const docIdRaw = obj.docId;
				const docId = typeof docIdRaw === "string" ? docIdRaw.trim() : "";
				if (!docId) continue;
				const titleRaw = extractTitle(item);
				const fileName = titleRaw && titleRaw.length > 0 ? titleRaw : docId;
				const mimeTypeRaw = obj.mimeType;
				const mimeType = typeof mimeTypeRaw === "string" && mimeTypeRaw.length > 0 ? mimeTypeRaw : void 0;
				importItems.push({
					docId,
					fileName,
					mimeType
				});
			}
			if (importItems.length === 0) {
				toast(`${t("tdoc.import.personalTdoc.pickedPrefix")}${list.length}`);
				setShowImport(false);
				return;
			}
			const enterpriseId = currentAccount?.enterpriseId?.trim() ?? "";
			if (!enterpriseId) {
				toast.error(t("tdoc.import.personalTdoc.pickedPrefix"));
				setShowImport(false);
				return;
			}
			const enqueueImports = async () => {
				let cookie = "";
				let hostUnavailable = false;
				try {
					if (tencentDocs?.getPersonalTdocCookie) cookie = await tencentDocs.getPersonalTdocCookie();
					else {
						hostUnavailable = true;
						console.warn("[TdocImport] tencentDocs.getPersonalTdocCookie not available");
					}
				} catch (err) {
					hostUnavailable = true;
					console.warn("[TdocImport] getPersonalTdocCookie failed:", err);
				}
				cookie = (cookie ?? "").trim();
				if (hostUnavailable) {
					toast.error(t("tdoc.import.personalTdoc.hostUnavailable"));
					return;
				}
				if (!cookie) {
					toast.error(t("tdoc.import.personalTdoc.noLogin"));
					return;
				}
				const targetFolderId = options.getTargetFolderId?.() ?? null;
				const batchId = nextBatchId();
				const tasks = importItems.map((it) => createSaasImportTask({
					personalDocId: it.docId,
					fileName: it.fileName,
					mimeType: it.mimeType,
					enterpriseId,
					tdocCookie: cookie,
					targetFolderId,
					batchId
				}));
				documentUploadStore.getState().enqueue(tasks);
				options.onEnqueued?.(tasks.map((task) => task.id));
				const preview = importItems.slice(0, 3).map((i) => i.fileName).join("、");
				const suffix = importItems.length > 3 ? `… (${importItems.length})` : "";
				toast(`${t("tdoc.import.personalTdoc.pickedPrefix")}${preview}${suffix}`);
			};
			enqueueImports().catch((err) => {
				console.warn("[TencentDocs] enqueueImports failed:", err);
			});
			setShowImport(false);
		}, [
			t,
			currentAccount,
			tencentDocs,
			options
		])
	};
}
var import_react$3, KNOWN_LIST_KEYS, TITLE_KEYS, URL_KEYS;
var init_use_personal_tdoc_import = __esmMin((() => {
	init_src();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_services();
	init_document_upload_runner();
	init_document_upload_task_store();
	KNOWN_LIST_KEYS = [
		"files",
		"fileList",
		"fileInfoList",
		"docList",
		"docs",
		"list",
		"data",
		"items",
		"selectedFiles",
		"result"
	];
	TITLE_KEYS = [
		"fileName",
		"title",
		"name",
		"docName",
		"file_name",
		"docTitle",
		"displayName",
		"display_name",
		"fileTitle"
	];
	URL_KEYS = [
		"url",
		"fileUrl",
		"docUrl",
		"link"
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/doc-selector-modal.less
var init_doc_selector_modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/oneid-activation-guide.tsx
var import_react$2, import_jsx_runtime$2, OneidAppActivation, BrandConnectArrows, OneidActivationGuide;
var init_oneid_activation_guide = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_header_workbuddy();
	init_tencent_docs();
	init_useI18n();
	init_lazy_oneid_app_activation();
	init_oneid_env();
	import_jsx_runtime$2 = require_jsx_runtime();
	OneidAppActivation = LazyOneidAppActivation;
	BrandConnectArrows = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "tencent-docs-auth-guide__connect-arrows",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--1",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--2",
				children: "›"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "tencent-docs-auth-guide__connect-arrow tencent-docs-auth-guide__connect-arrow--3",
				children: "›"
			})
		]
	});
	OneidActivationGuide = ({ appType, activationCode, appName, onActivated }) => {
		const t = useTranslation();
		const [active, setActive] = (0, import_react$2.useState)(false);
		const closeDialog = (0, import_react$2.useCallback)(() => {
			setActive(false);
			document.documentElement.classList.remove("dark");
		}, []);
		const handleOpen = (0, import_react$2.useCallback)(() => {
			if (!activationCode) return;
			setActive(true);
		}, [activationCode]);
		const handleSuccess = (0, import_react$2.useCallback)(() => {
			closeDialog();
			onActivated();
		}, [closeDialog, onActivated]);
		const handleFail = (0, import_react$2.useCallback)((event) => {
			const { phase, errCode, errMessage, id } = event.detail ?? {};
			console.error("[OneidActivationGuide] activation failed", {
				appType,
				phase,
				errCode,
				errMessage,
				traceId: id
			});
		}, [appType]);
		const title = t("oneid.activation.title", { appName: appName || (appType === "doc" ? "腾讯文档" : "腾讯乐享") });
		const description = t("oneid.activation.description");
		const buttonText = t("oneid.activation.activate");
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "tencent-docs-auth-guide",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "tencent-docs-auth-guide__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "tencent-docs-auth-guide__brands",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--wb",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("img", {
									src: header_workbuddy_default,
									alt: "WorkBuddy",
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(BrandConnectArrows, {}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
								className: "tencent-docs-auth-guide__brand-icon tencent-docs-auth-guide__brand-icon--tdoc",
								children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("img", {
									src: tencent_docs_default,
									alt: appName || "Tencent Docs",
									draggable: false
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", {
						className: "tencent-docs-auth-guide__title",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "tencent-docs-auth-guide__desc",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", {
						className: "tencent-docs-auth-guide__btn",
						onClick: handleOpen,
						disabled: !activationCode,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "tencent-docs-auth-guide__btn-label",
							children: buttonText
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
							className: "tencent-docs-auth-guide__btn-arrow",
							"aria-hidden": "true",
							children: "→"
						})]
					})
				]
			})
		}, "oneid-activation-guide"), active && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(OneidAppActivation, {
			code: activationCode,
			env: ONEID_ENV,
			language: "zh-CN",
			theme: "light",
			onSuccess: handleSuccess,
			onFail: handleFail,
			onClose: closeDialog
		})] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/doc-selector-content.tsx
/** 判断文件是否可被勾选（文件夹不可勾选，不支持的文件类型置灰） */
function isFileCheckable(file) {
	return isFileViewModelCheckable({
		type: file.type,
		isFolder: file.is_folder,
		ext: file.ext
	});
}
var import_react$1, import_jsx_runtime$1, DocSelectorContent;
var init_doc_selector_content = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_constants();
	init_use_file_list();
	init_use_file_search();
	init_types();
	init_document_upload_task_store();
	init_empty_state();
	init_file_list();
	init_tdoc_columns();
	init_folder_breadcrumb();
	init_search_bar();
	init_search_result_modal();
	import_jsx_runtime$1 = require_jsx_runtime();
	DocSelectorContent = ({ onSelect, onClose, pendingImportTaskIds, onImportTasksSettled }) => {
		const t = useTranslation();
		const [showSearchModal, setShowSearchModal] = (0, import_react$1.useState)(false);
		const [checkedKeys, setCheckedKeys] = (0, import_react$1.useState)(/* @__PURE__ */ new Set());
		const fileList = useFileList({ listType: ListType.RECENT });
		const fileSearch = useFileSearch();
		const importTaskStateKey = useDocumentUploadStore((s) => {
			if (pendingImportTaskIds.length === 0) return "";
			const idSet = new Set(pendingImportTaskIds);
			const parts = [];
			for (const task of s.tasks) if (idSet.has(task.id)) parts.push(`${task.id}|${task.status}`);
			return parts.join(",");
		});
		const loadFilesRef = (0, import_react$1.useRef)(fileList.loadFiles);
		loadFilesRef.current = fileList.loadFiles;
		const onSettledRef = (0, import_react$1.useRef)(onImportTasksSettled);
		onSettledRef.current = onImportTasksSettled;
		(0, import_react$1.useEffect)(() => {
			if (!importTaskStateKey) return;
			const settled = [];
			let anySuccess = false;
			for (const part of importTaskStateKey.split(",")) {
				const [id, status] = part.split("|");
				if (!id || !status) continue;
				if (status === "success") {
					settled.push(id);
					anySuccess = true;
				} else if (status === "failed" || status === "cancelled") settled.push(id);
			}
			if (settled.length === 0) return;
			if (anySuccess) loadFilesRef.current().catch(() => void 0);
			onSettledRef.current(settled);
		}, [importTaskStateKey]);
		const columns = useTDocColumns({ hideRowActions: true });
		const checkableFiles = (0, import_react$1.useMemo)(() => fileList.files.filter(isFileCheckable), [fileList.files]);
		const handleRowClick = (0, import_react$1.useCallback)((file) => {
			if (file.is_folder) {
				fileList.enterFolder(file.file_id, file.title);
				return;
			}
			if (isFileCheckable(file)) setCheckedKeys((prev) => {
				const next = new Set(prev);
				if (next.has(file.file_id)) next.delete(file.file_id);
				else next.add(file.file_id);
				return next;
			});
		}, [fileList]);
		const handleSortChange = (0, import_react$1.useCallback)((sortKey, desc) => {
			fileList.setOrderBy(sortKey);
			fileList.setDesc(desc);
		}, [fileList]);
		const handleSearch = (0, import_react$1.useCallback)((keyword) => {
			fileSearch.search(keyword);
			setShowSearchModal(true);
		}, [fileSearch]);
		const handleCloseSearch = (0, import_react$1.useCallback)(() => {
			setShowSearchModal(false);
			fileSearch.reset();
		}, [fileSearch]);
		const handleCheckChange = (0, import_react$1.useCallback)((key, checked) => {
			setCheckedKeys((prev) => {
				const next = new Set(prev);
				if (checked) next.add(key);
				else next.delete(key);
				return next;
			});
		}, []);
		const handleCheckAll = (0, import_react$1.useCallback)((checked) => {
			if (checked) setCheckedKeys(new Set(checkableFiles.map((f) => f.file_id)));
			else setCheckedKeys(/* @__PURE__ */ new Set());
		}, [checkableFiles]);
		const allChecked = checkableFiles.length > 0 && checkedKeys.size === checkableFiles.length;
		const indeterminate = checkedKeys.size > 0 && checkedKeys.size < checkableFiles.length;
		const handleConfirm = (0, import_react$1.useCallback)(() => {
			onSelect(fileList.files.filter((f) => checkedKeys.has(f.file_id)));
			onClose();
		}, [
			fileList.files,
			checkedKeys,
			onSelect,
			onClose
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "doc-selector-modal__search",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SearchBar, { onSearch: handleSearch })
			}),
			fileList.folderPath.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FolderBreadcrumb, {
				path: fileList.folderPath,
				onNavigate: fileList.navigateToFolder
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "doc-selector-modal__body",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(VirtualList, {
					data: fileList.files,
					columns,
					rowKey: (file) => file.file_id,
					loading: fileList.loading,
					loadingMore: fileList.loadingMore,
					hasMore: fileList.hasMore,
					error: fileList.error,
					sortKey: fileList.orderBy,
					sortDesc: fileList.desc,
					checkedKeys,
					isCheckable: isFileCheckable,
					showDisabledCheckbox: true,
					checkboxDisabledTooltip: t("tdoc.selection.unsupportedType"),
					onCheckChange: handleCheckChange,
					onCheckAll: handleCheckAll,
					allChecked,
					indeterminate,
					onRowClick: handleRowClick,
					onSortChange: handleSortChange,
					onLoadMore: fileList.loadMore,
					onRetry: fileList.loadFiles,
					loadingMoreText: t("common.loadingMore"),
					rowClassName: (file) => file.is_folder ? "tdoc-file-list-item--folder" : "",
					renderEmpty: () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(EmptyState, { type: "no-files" }),
					renderError: (err, retry) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "tdoc-file-list__error",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "tdoc-file-list__error-icon",
								children: "⚠️"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "tdoc-file-list__error-message",
								children: err
							}),
							retry && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
								className: "tdoc-file-list__error-retry",
								onClick: retry,
								children: t("tdoc.error.retry")
							})
						]
					})
				})
			}),
			checkedKeys.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "doc-selector-modal__footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "doc-selector-modal__footer-count",
					children: t("tdoc.selection.count", { count: checkedKeys.size })
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
					type: "button",
					className: "doc-selector-modal__footer-btn",
					onClick: handleConfirm,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 16 16",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
								d: "M8.005 13.3201C7.01 13.322 6.029 13.0986 5.133 12.6667L2 13.3334L2.867 10.7334C1.317 8.4421 1.916 5.4854 4.267 3.8174C6.617 2.1501 9.993 2.2867 12.163 4.1374C13.491 5.2707 14.117 6.8307 13.995 8.3641",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
								d: "M10.667 12.6667H14.667",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
								d: "M12.667 10.6667V14.6667",
								stroke: "currentColor",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						]
					}), t("tdoc.selection.addToTask")]
				})]
			}),
			showSearchModal && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SearchResultModal, {
				fileSearch,
				onClose: handleCloseSearch,
				hideRowActions: true,
				onAddToTask: (files) => {
					const mapped = files.map((f) => ({
						file_id: f.id,
						parent_id: f.parentId,
						title: f.name,
						url: f.url,
						type: f.type,
						ext: f.ext,
						create_time: 0,
						create_name: "",
						last_modify_time: 0,
						last_modify_name: "",
						access_time: 0,
						owner_name: f.ownerName,
						is_folder: f.isFolder,
						is_link: f.isLink,
						size: f.sizeRaw,
						is_top: f.isTop,
						is_star: f.isStar
					}));
					handleCloseSearch();
					onSelect(mapped);
					onClose();
				}
			})
		] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/doc-selector-modal.tsx
var import_react, import_react_dom, import_jsx_runtime, DocSelectorModal;
var init_doc_selector_modal$1 = __esmMin((() => {
	init_doc_selector_modal$2();
	init_src();
	init_lucide_react();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_contexts();
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_useI18n();
	init_services();
	init_use_personal_tdoc_import();
	init_use_tdoc_check_auth_gate();
	init_store();
	init_telemetry();
	init_document_upload_runner();
	init_document_upload_task_store();
	init_auth_guide();
	init_oneid_activation_guide();
	init_tdoc_import_iframe_modal();
	init_doc_selector_content();
	import_jsx_runtime = require_jsx_runtime();
	DocSelectorModal = ({ visible, onClose, onSelect }) => {
		const t = useTranslation();
		const adapter = useAdapter();
		const tencentDocs = useTencentDocsFacade();
		const currentAccount = useCurrentAccount();
		const authStatus = useTencentDocsStore((state) => state.authStatus);
		const authError = useTencentDocsStore((state) => state.authError);
		const authorizeUrl = useTencentDocsStore((state) => state.authorizeUrl);
		const isAuthorized = authStatus === "connected";
		const isEnterpriseEdition = useIsEnterpriseEdition();
		const oneidStatus = useOneidAppStatus("doc");
		const triggerCheckAuth = useTdocCheckAuthGate();
		const [pendingImportTaskIds, setPendingImportTaskIds] = (0, import_react.useState)([]);
		/**
		* 累积集合：本弹窗本次打开期间发起的「全部」个人版导入 task id。
		*
		* 与 `pendingImportTaskIds` 的区别——后者会在每条 task settle（success /
		* failed / cancelled）时被 `onImportTasksSettled` 移除，目的是避免
		* `DocSelectorContent` 反复触发 `loadFiles` 刷新。
		*
		* 但 `handleClose` 关闭弹窗时需要清掉「整批」由本弹窗发起的任务（包括
		* 已经 success 的），否则用户在文件列表里勾选刚导入完成的文档 + 点「添加
		* 到任务」走 onClose 时，已 success 的任务已经被从 `pendingImportTaskIds`
		* 移出去了，handleClose 里 `if (pendingImportTaskIds.length > 0)` 不命中，
		* 全局上传浮窗（DocumentUploadDock）会残留这批已完成的任务记录与浮窗本身。
		*
		* 所以这里再维护一个不会被 settle 摘除的累积 ref，专供关闭时收尾使用。
		*/
		const enqueuedImportTaskIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
		const personalTdocImport = usePersonalTdocImport({
			getTargetFolderId: () => null,
			onEnqueued: (ids) => {
				for (const id of ids) enqueuedImportTaskIdsRef.current.add(id);
				setPendingImportTaskIds((prev) => [...prev, ...ids]);
			}
		});
		const isExclusiveEdition = currentAccount?.type === "exclusive";
		const hasEnterprise = !!currentAccount?.enterpriseId?.trim();
		const isDesktopHost = typeof window !== "undefined" && typeof window.__getTdocImportPreloadUrl === "function";
		const showImportPersonalBtn = isAuthorized && !isExclusiveEdition && hasEnterprise && isDesktopHost;
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			tencentDocsStore.getState().setAdapter(adapter);
			tencentDocsStore.getState().setFacade(tencentDocs);
			triggerCheckAuth();
			return () => {
				tencentDocsStore.getState().stopPolling();
			};
		}, [
			visible,
			adapter,
			tencentDocs,
			triggerCheckAuth
		]);
		(0, import_react.useEffect)(() => {
			if (visible && isAuthorized) reportAttachTDocChooser(adapter);
		}, [
			visible,
			isAuthorized,
			adapter
		]);
		const { closeImport: closePersonalImport } = personalTdocImport;
		(0, import_react.useEffect)(() => {
			if (!visible) {
				closePersonalImport();
				setPendingImportTaskIds((prev) => prev.length === 0 ? prev : []);
				if (enqueuedImportTaskIdsRef.current.size > 0) enqueuedImportTaskIdsRef.current = /* @__PURE__ */ new Set();
			}
		}, [visible, closePersonalImport]);
		/**
		* 关闭弹框统一入口：除了调用外层 onClose，还要把"由本弹窗发起的个人版导入
		* 任务"从全局上传浮窗（DocumentUploadDock）里收掉。
		*
		* 之前的实现是 cancelAllUnfinished() + clearAll()，但 DocumentUploadDock
		* 是 Root 级常驻组件，store 里可能同时承载来自 TencentDocsPanel 等其它
		* 入口的并发上传任务；在本弹窗关闭时一刀切会误取消那些任务。
		*
		* 现按 `enqueuedImportTaskIdsRef`（usePersonalTdocImport.onEnqueued 透出的
		* 「本弹窗发起的全部 task id」，已 settle 的也保留在内）收窄清理范围：
		*   1) 命中 id 且仍在 queued / uploading / retrying 状态 → cancelTask 打断
		*      adapter cancelToken / saas 轮询 / fakeProgress；
		*   2) 命中 id 一律 removeTask 从 store 中摘掉，避免残留导致 dock 继续显示；
		*   3) 不动其它入口的任务；
		*   4) 若清理完 store 已无任何任务，顺手把 dock ui.visible 置 false——这是
		*      为了修复以下场景的残留 dock：用户先导入个人版文档（dock 弹出），上传
		*      成功后在文件列表里勾选导入完成的文档 + 点「添加到任务」关闭弹窗，
		*      之前的实现里这批已 success 的任务已经从 `pendingImportTaskIds` 里
		*      被 `onImportTasksSettled` 移除，handleClose 早期 if 不命中，dock 残留。
		*      现在用 enqueuedImportTaskIdsRef 累积所有 id，确保整批清理。
		*
		* 触发路径覆盖：右上角 X / 遮罩点击 / Esc / 「添加到任务」均走 handleClose
		*（DocSelectorContent 的 onClose prop 直接绑到本函数）。
		*/
		const handleClose = (0, import_react.useCallback)(() => {
			const trackedSet = enqueuedImportTaskIdsRef.current;
			if (trackedSet.size > 0) {
				const tasks = documentUploadStore.getState().tasks;
				for (const task of tasks) {
					if (!trackedSet.has(task.id)) continue;
					if (task.status === "queued" || task.status === "uploading" || task.status === "retrying") cancelTask(task.id);
					documentUploadStore.getState().removeTask(task.id);
				}
				if (documentUploadStore.getState().tasks.length === 0) documentUploadStore.getState().setVisible(false);
				trackedSet.clear();
			}
			onClose();
		}, [onClose]);
		(0, import_react.useEffect)(() => {
			if (!visible) return;
			const handleKeyDown = (e) => {
				if (e.key === "Escape") handleClose();
			};
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [visible, handleClose]);
		const handleOverlayClick = (0, import_react.useCallback)((e) => {
			if (e.target === e.currentTarget) handleClose();
		}, [handleClose]);
		if (!visible) return null;
		const renderBody = () => {
			if (isEnterpriseEdition) {
				if (oneidStatus.status === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "doc-selector-modal__auth-loading",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentionSkeleton, {})
				});
				if (oneidStatus.status !== "enabled") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "doc-selector-modal__auth",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneidActivationGuide, {
						appType: "doc",
						activationCode: oneidStatus.activationCode,
						appName: oneidStatus.appName,
						onActivated: () => {
							oneidStatus.refresh().catch(() => void 0);
						}
					})
				});
			}
			if (authStatus === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "doc-selector-modal__auth-loading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentionSkeleton, {})
			});
			if (!isAuthorized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "doc-selector-modal__auth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuide, {
					authStatus,
					error: authError,
					authorizeUrl,
					onAuthorize: () => tencentDocsStore.getState().startAuthorization(),
					onRetry: triggerCheckAuth,
					authSource: "file_picker"
				})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocSelectorContent, {
				onSelect,
				onClose: handleClose,
				pendingImportTaskIds,
				onImportTasksSettled: (ids) => {
					setPendingImportTaskIds((prev) => prev.filter((id) => !ids.includes(id)));
				}
			});
		};
		return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "doc-selector-modal-overlay",
			onClick: handleOverlayClick,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "doc-selector-modal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "doc-selector-modal__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "doc-selector-modal__title",
						children: t("tdoc.selector.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "doc-selector-modal__header-actions",
						children: [showImportPersonalBtn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "doc-selector-modal__import-personal",
							onClick: personalTdocImport.openImport,
							type: "button",
							children: t("tdoc.import.personalTdoc")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "doc-selector-modal__close",
							onClick: handleClose,
							type: "button",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
						})]
					})]
				}), renderBody()]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TdocImportIframeModal, {
				visible: personalTdocImport.showImport,
				onClose: personalTdocImport.closeImport,
				onPicked: personalTdocImport.handlePicked
			})]
		}), document.body);
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-docs/components/doc-selector-modal/index.ts
var init_doc_selector_modal = __esmMin((() => {
	init_doc_selector_modal$1();
}));
//#endregion
export { getRelativeDirKey as $, SHEET_TO_SMARTSHEET_CELL_EXCEED_LIMIT_ERROR_SENTINEL as A, canUploadToTencentDocs as B, FILE_BREAK_ERROR_SENTINEL as C, NO_SUPPORT_IMPORT_ERROR_SENTINEL as D, NO_PERMISSION_ERROR_SENTINEL as E, SIZE_LIMIT_OWNER_ERROR_SENTINEL as F, isHtmlLikeFileName as G, filterPickedBySupportedExt as H, TOO_MANY_CELLS_ERROR_SENTINEL as I, openFolderPicker as J, isMindmapLikeFile as K, VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL as L, SHEET_TO_SMARTSHEET_ROW_EXCEED_LIMIT_ERROR_SENTINEL as M, SHEET_TO_SMARTSHEET_SELECTED_RANGE_INVALID_ERROR_SENTINEL as N, OLD_VERSION_DOC_ERROR_SENTINEL as O, SIZE_LIMIT_COLLABORATOR_ERROR_SENTINEL as P, computeMaxUploadFolderDepth as Q, ZIP_FILE_CONTENT_NOT_SUPPORT_ERROR_SENTINEL as R, startDocumentUploadRunner as S, NON_VIP_OVER_FILE_SIZE_LIMIT_ERROR_SENTINEL as T, hasAnyUploadableToTencentDocs as U, filterPickedByLocalPath as V, init_pick_files_and_folders as W, buildFolderIdMap as X, applyUniqFileNamesToFolders as Y, buildUploadNodes as Z, retryAllFailed as _, init_use_personal_tdoc_import as a, selectFolderView as at, setDocumentUploadAdapter as b, FILE_TOO_LARGE_ERROR_SENTINEL as c, TdocImportIframeModal as ct, cancelAllUnfinished as d, SearchResultModal as dt, init_build_upload_tree as et, cancelFolder as f, init_shared as ft, nextBatchId as g, init_document_upload_runner as h, SearchBar as ht, init_oneid_activation_guide as i, parseFolderPath as it, SHEET_TO_SMARTSHEET_FIELD_EXCEED_LIMIT_ERROR_SENTINEL as j, OVER_SYSTEM_LIMIT_ERROR_SENTINEL as k, PASSWORD_REQUIRED_ERROR_SENTINEL as l, init_tdoc_import_iframe_modal as lt, createTask as m, init_search_bar as mt, DocSelectorModal as n, documentUploadStore as nt, usePersonalTdocImport as o, selectSummary as ot, cancelTask as p, SelectionBar as pt, openFilePicker as q, OneidActivationGuide as r, init_document_upload_task_store as rt, EMPTY_FILE_ERROR_SENTINEL as s, useDocumentUploadStore as st, init_doc_selector_modal as t, rewriteRelativePathByRenameMap as tt, PASSWORD_WRONG_ERROR_SENTINEL as u, init_search_result_modal as ut, retryFolder as v, LICENSE_EXPIRED_ERROR_SENTINEL as w, setSaasImportFacade as x, retryTask as y, init_tdoc_import_error_codes as z };
