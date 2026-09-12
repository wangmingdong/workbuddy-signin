import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Yl as useNamedPageShow, a as WorkBuddyTopBar, c as useTopBarRootClassName, ll as init_telemetry_context, o as init_workbuddy_topbar, ql as init_use_named_page_show, ul as useAgentTelemetry } from "./agent-mail-CiuzbR2o.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { i as useSearchParams, r as init_dist } from "./dist-BlOCCi14.js";
import { _t as useAccount, t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { H as Modal, t as init_foundation } from "./foundation-QOglV606.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { i as init_types, n as PlaybookCtaSource } from "./types-B5gc2qW1.js";
import { a as isPortraitCover, d as init_types$1, i as init_utils, l as FEATURED_CATEGORY_ID, n as getLocalizedField, o as resolvePlaybookAssetUrl, r as getLocalizedText, t as getHighlightParts } from "./utils-CV8kqybT.js";
import { f as useDiscover, i as init_discover_panel$1, m as useLocale, n as init_case_detail_page, p as init_use_locale, r as init_hooks, t as CaseDetailPage, u as useFavorites } from "./case-detail-page-CGL6gexc.js";
//#region ../../packages/agent-ui/src/components/discover-panel/views/detail-view/index.tsx
var import_jsx_runtime$12, DiscoverDetailView;
var init_detail_view = __esmMin((() => {
	require_react();
	init_case_detail_page();
	import_jsx_runtime$12 = require_jsx_runtime();
	DiscoverDetailView = ({ caseId, isFavorite, environmentType, onBack, onToggleFavorite, onLaunchSuccess, source, position, categories, searchKeyword }) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(CaseDetailPage, {
		caseId,
		isFavorite,
		onBack,
		onToggleFavorite,
		onLaunchSuccess,
		environmentType,
		source,
		position,
		categories,
		searchKeyword
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/search-bar/index.tsx
var import_react$11, import_jsx_runtime$11, DEBOUNCE_DELAY, SearchIcon, ClearIcon, DiscoverSearchBar;
var init_search_bar = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$11 = require_jsx_runtime();
	DEBOUNCE_DELAY = 200;
	SearchIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("svg", {
		className: "dc-search-icon",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("circle", {
			cx: "11",
			cy: "11",
			r: "8"
		}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("line", {
			x1: "21",
			y1: "21",
			x2: "16.65",
			y2: "16.65"
		})]
	});
	ClearIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "8",
			fill: "currentColor",
			fillOpacity: "0.15"
		}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", {
			d: "M5 5L11 11M11 5L5 11",
			stroke: "currentColor",
			strokeOpacity: "0.45",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
	DiscoverSearchBar = ({ value, onChange, placeholder }) => {
		const t = useTranslation();
		const [localValue, setLocalValue] = (0, import_react$11.useState)(value);
		const debounceRef = (0, import_react$11.useRef)(null);
		const inputRef = (0, import_react$11.useRef)(null);
		(0, import_react$11.useEffect)(() => {
			setLocalValue(value);
		}, [value]);
		(0, import_react$11.useEffect)(() => () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		}, []);
		const handleChange = (0, import_react$11.useCallback)((e) => {
			const newValue = e.target.value;
			setLocalValue(newValue);
			if (debounceRef.current) clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(() => {
				onChange(newValue);
			}, DEBOUNCE_DELAY);
		}, [onChange]);
		const handleClear = (0, import_react$11.useCallback)(() => {
			setLocalValue("");
			if (debounceRef.current) clearTimeout(debounceRef.current);
			onChange("");
			inputRef.current?.focus();
		}, [onChange]);
		const defaultPlaceholder = t("discover.searchPlaceholder");
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "dc-search-wrapper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("input", {
					ref: inputRef,
					type: "text",
					className: "dc-search-input",
					value: localValue,
					onChange: handleChange,
					placeholder: placeholder ?? defaultPlaceholder
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(SearchIcon, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("button", {
					type: "button",
					className: `dc-search-clear ${localValue ? "is-visible" : ""}`,
					onClick: handleClear,
					"aria-label": t("discover.clearSearch") || "Clear search",
					children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ClearIcon, {})
				})
			]
		});
	};
})), import_jsx_runtime$10, DiscoverHeader;
var init_header = __esmMin((() => {
	require_react();
	init_useI18n();
	init_search_bar();
	import_jsx_runtime$10 = require_jsx_runtime();
	DiscoverHeader = ({ favFilterActive, favoriteCount, searchKeyword, onToggleFavFilter, onSearchChange }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("header", {
			className: "dc-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "dc-header-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h1", {
					className: "dc-title",
					children: t("discover.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
					className: "dc-subtitle",
					children: t("discover.subtitle")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "dc-header-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
					type: "button",
					className: `dc-fav-filter-btn ${favFilterActive ? "is-active" : ""}`.trim(),
					"data-track-id": "explore_favorite_list",
					"data-track-name": "查看收藏",
					"data-track-props": "{\"type\":\"list\"}",
					onClick: onToggleFavFilter,
					title: t("discover.myFavorites"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: t("discover.myFavorites") }), favoriteCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
						className: "dc-fav-count",
						children: favoriteCount
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(DiscoverSearchBar, {
					value: searchKeyword,
					onChange: onSearchChange
				})]
			})]
		});
	};
})), import_jsx_runtime$9, ArrowLeftIcon;
var init_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$9 = require_jsx_runtime();
	ArrowLeftIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("path", {
			d: "M19 12H5M12 19l-7-7 7-7",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/category-tabs/index.tsx
/** 获取分类名称 */
function getCategoryName(category, locale) {
	return locale === "en" ? category.name_en : category.name;
}
var import_jsx_runtime$8, DiscoverCategoryTabs;
var init_category_tabs = __esmMin((() => {
	require_react();
	init_useI18n();
	init_use_locale();
	init_types$1();
	import_jsx_runtime$8 = require_jsx_runtime();
	DiscoverCategoryTabs = ({ categories, selectedCategory, onChange, hidden }) => {
		const t = useTranslation();
		const locale = useLocale();
		if (hidden) return null;
		const handleTabClick = (categoryId) => {
			if (categoryId === selectedCategory) return;
			onChange(categoryId);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "dc-category-tabs",
			role: "tablist",
			"aria-label": t("discover.title"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": selectedCategory === null,
					className: `dc-category-tab ${selectedCategory === null ? "is-active" : ""}`.trim(),
					"data-track-id": "explore_tab_switch",
					"data-track-name": "切换场景标签",
					"data-track-props": "{\"type\":\"all\"}",
					onClick: () => handleTabClick(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: t("discover.allCategory") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": selectedCategory === FEATURED_CATEGORY_ID,
					className: `dc-category-tab ${selectedCategory === "__featured__" ? "is-active" : ""}`.trim(),
					onClick: () => handleTabClick(FEATURED_CATEGORY_ID),
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: t("discover.featured") })
				}),
				categories.map((category) => {
					const name = getCategoryName(category, locale);
					return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": selectedCategory === category.id,
						className: `dc-category-tab ${selectedCategory === category.id ? "is-active" : ""}`.trim(),
						"data-track-id": "explore_tab_switch",
						"data-track-name": "切换场景标签",
						"data-track-props": JSON.stringify({ type: category.id }),
						onClick: () => handleTabClick(category.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: name || category.id })
					}, category.id);
				})
			]
		});
	};
})), import_jsx_runtime$7, DiscoverEmpty;
var init_empty_state = __esmMin((() => {
	require_react();
	init_useI18n();
	import_jsx_runtime$7 = require_jsx_runtime();
	DiscoverEmpty = ({ favFilterActive, isSearching, hasCategory }) => {
		const t = useTranslation();
		let title;
		let hint;
		if (isSearching && favFilterActive) {
			title = t("discover.noSearchResults");
			hint = t("discover.noSearchResultsHint");
		} else if (isSearching) {
			title = t("discover.noSearchResults");
			hint = t("discover.noSearchResultsHint");
		} else if (favFilterActive && hasCategory) {
			title = t("discover.noFavorites");
			hint = t("discover.noCategoryResultsHint");
		} else if (favFilterActive) {
			title = t("discover.noFavorites");
			hint = t("discover.noFavoritesHint");
		} else if (hasCategory) {
			title = t("discover.noCategoryResults");
			hint = t("discover.noCategoryResultsHint");
		} else {
			title = t("discover.noFavorites");
			hint = t("discover.noFavoritesHint");
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "dc-fav-empty-inline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
				className: "dc-fav-empty-hint",
				children: hint
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/constants.ts
var ARTIFACT_TYPE_CONFIG;
var init_constants = __esmMin((() => {
	ARTIFACT_TYPE_CONFIG = {
		doc: {
			icon: "FileText",
			color: "#3B82F6",
			label: {
				zh: "文档",
				en: "Document"
			}
		},
		ppt: {
			icon: "Presentation",
			color: "#F0913A",
			label: {
				zh: "PPT",
				en: "PPT"
			}
		},
		md: {
			icon: "FileCode2",
			color: "#4ECBA0",
			label: {
				zh: "Markdown",
				en: "Markdown"
			}
		},
		html: {
			icon: "Code2",
			color: "#EF4444",
			label: {
				zh: "HTML",
				en: "HTML"
			}
		},
		image: {
			icon: "Image",
			color: "#D946A8",
			label: {
				zh: "图片",
				en: "Image"
			}
		},
		table: {
			icon: "Table2",
			color: "#06B6D4",
			label: {
				zh: "表格",
				en: "Table"
			}
		},
		code: {
			icon: "Code2",
			color: "#6366F1",
			label: {
				zh: "代码",
				en: "Code"
			}
		},
		other: {
			icon: "Package",
			color: "#94A3B8",
			label: {
				zh: "其他",
				en: "Other"
			}
		},
		video: {
			icon: "Video",
			color: "#A855F7",
			label: {
				zh: "视频",
				en: "Video"
			}
		},
		link: {
			icon: "ExternalLink",
			color: "#14B8A6",
			label: {
				zh: "链接",
				en: "Link"
			}
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/playbook-card/index.tsx
/** 解析封面图 URL */
function resolveCoverUrl(coverImage, caseId, coverMode) {
	return resolvePlaybookAssetUrl(coverImage, caseId, coverMode) ?? "";
}
function formatUsageCount(count) {
	if (count >= 1e4) return `${(count / 1e4).toFixed(1)}万`;
	if (count >= 1e3) return `${(count / 1e3).toFixed(1)}k`;
	return count.toString();
}
var import_react$6, import_jsx_runtime$6, HeartIcon, ImagePlaceholderIcon, HighlightedText, CardErrorBoundary, PlaybookCard;
var init_playbook_card = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_constants();
	init_use_locale();
	init_utils();
	import_jsx_runtime$6 = require_jsx_runtime();
	HeartIcon = ({ filled }) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: filled ? "currentColor" : "none",
		stroke: "currentColor",
		strokeWidth: filled ? 2.5 : 2,
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
			d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	ImagePlaceholderIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("circle", {
				cx: "8.5",
				cy: "8.5",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", { d: "M21 15l-5-5L5 21" })
		]
	});
	HighlightedText = ({ text, keyword }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(import_jsx_runtime$6.Fragment, { children: getHighlightParts(text, keyword).map((part, index) => part.isHighlight ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
			className: "dc-search-highlight",
			children: part.text
		}, index) : part.text) });
	};
	CardErrorBoundary = class extends import_react$6.Component {
		constructor(props) {
			super(props);
			this.state = { hasError: false };
		}
		static getDerivedStateFromError() {
			return { hasError: true };
		}
		componentDidCatch(error) {
			console.warn("[PlaybookCard] Render error caught:", error.message);
		}
		render() {
			if (this.state.hasError) return null;
			return this.props.children;
		}
	};
	PlaybookCard = ({ caseData, cardPosition, isFavorite, onClick, onToggleFavorite, highlightKeyword, badget, source }) => {
		const locale = useLocale();
		const [hovered, setHovered] = (0, import_react$6.useState)(false);
		const [imageBroken, setImageBroken] = (0, import_react$6.useState)(false);
		const title = (0, import_react$6.useMemo)(() => getLocalizedField(caseData.title, caseData.title_en, locale, caseData.id), [
			caseData.title,
			caseData.title_en,
			caseData.id,
			locale
		]);
		const subtitle = (0, import_react$6.useMemo)(() => getLocalizedField(caseData.subtitle, caseData.subtitle_en, locale), [
			caseData.subtitle,
			caseData.subtitle_en,
			locale
		]);
		const coverUrl = (0, import_react$6.useMemo)(() => resolveCoverUrl(caseData.cover_image, caseData.id, caseData.cover_mode), [
			caseData.cover_image,
			caseData.id,
			caseData.cover_mode
		]);
		/** 是否为竖向封面 */
		const isPortrait = isPortraitCover(caseData.cover_mode);
		/** 产物类型标签文本 */
		const artifactLabel = (0, import_react$6.useMemo)(() => {
			if (!caseData.artifact_type) return null;
			const config = ARTIFACT_TYPE_CONFIG[caseData.artifact_type];
			if (!config) return null;
			return getLocalizedText(config.label, locale);
		}, [caseData.artifact_type, locale]);
		const handleCardClick = (0, import_react$6.useCallback)(() => {
			onClick(caseData.id, cardPosition, source);
		}, [
			caseData.id,
			cardPosition,
			onClick,
			source
		]);
		const handleFavoriteClick = (0, import_react$6.useCallback)((e) => {
			e.stopPropagation();
			onToggleFavorite(caseData.id, source);
		}, [
			caseData.id,
			onToggleFavorite,
			source
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(CardErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("article", {
			className: `dc-playbook-card ${hovered ? "is-hovered" : ""}`.trim(),
			"data-track-id": "explore_case_card_click",
			"data-track-name": "点击案例卡片",
			"data-track-props": JSON.stringify({
				source: caseData.id,
				type: "card"
			}),
			onMouseEnter: () => setHovered(true),
			onMouseLeave: () => setHovered(false),
			onClick: handleCardClick,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: `dc-card-cover${isPortrait ? " dc-card-cover-portrait" : ""}`,
				children: coverUrl && !imageBroken ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("img", {
					src: coverUrl,
					alt: title,
					loading: "lazy",
					onError: () => setImageBroken(true)
				}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "dc-card-cover-placeholder",
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ImagePlaceholderIcon, {})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
				className: "dc-card-info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "dc-card-title-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("h3", {
							className: "dc-card-title",
							children: highlightKeyword ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(HighlightedText, {
								text: title,
								keyword: highlightKeyword
							}) : title
						}), artifactLabel && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "dc-card-artifact-type",
							children: artifactLabel
						})]
					}),
					subtitle && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
						className: "dc-card-subtitle",
						children: highlightKeyword ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(HighlightedText, {
							text: subtitle,
							keyword: highlightKeyword
						}) : subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
						className: "dc-card-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
							className: "dc-card-type-badge",
							children: badget || "官方"
						}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
							className: "dc-card-footer-right",
							children: [caseData.usage_count !== void 0 && caseData.usage_count > 0 && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", {
								className: "dc-card-usage",
								children: [formatUsageCount(caseData.usage_count), " 使用"]
							}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
								"data-track-id": isFavorite ? "explore_favorite_remove" : "explore_favorite_add",
								"data-track-name": isFavorite ? "取消收藏" : "收藏",
								"data-track-props": JSON.stringify({
									source: caseData.id,
									type: isFavorite ? "remove" : "add"
								}),
								type: "button",
								className: `dc-card-favorite-btn ${isFavorite ? "is-favorite" : ""}`.trim(),
								onClick: handleFavoriteClick,
								"aria-label": isFavorite ? "Remove from favorites" : "Add to favorites",
								children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(HeartIcon, { filled: isFavorite })
							})]
						})]
					})
				]
			})]
		}) });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/components/playbook-grid/index.tsx
/**
* 估算单张卡片的相对高度（以列宽为 1）。
* - 封面：横版 9/16 ≈ 0.5625，竖版 16/9 ≈ 1.778
* - 信息区（padding + 标题 + 描述 + footer）约等效于 0.35 个宽度单位
* - 列间 gap 忽略（每列内等量 gap，对比较无影响）
*/
function estimateCardHeight(item) {
	return (isPortraitCover(item.cover_mode) ? 16 / 9 : 9 / 16) + .35;
}
var import_react$5, import_jsx_runtime$5, COLUMN_COUNT, EmptyIcon, PlaybookGrid;
var init_playbook_grid = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_utils();
	init_playbook_card();
	import_jsx_runtime$5 = require_jsx_runtime();
	COLUMN_COUNT = 4;
	EmptyIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("svg", {
		className: "dc-empty-icon",
		viewBox: "0 0 64 64",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("rect", {
				x: "8",
				y: "12",
				width: "48",
				height: "40",
				rx: "4",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
				d: "M8 24h48",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("circle", {
				cx: "16",
				cy: "18",
				r: "2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("circle", {
				cx: "24",
				cy: "18",
				r: "2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("circle", {
				cx: "32",
				cy: "18",
				r: "2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("rect", {
				x: "16",
				y: "32",
				width: "32",
				height: "4",
				rx: "1",
				fill: "currentColor",
				fillOpacity: "0.3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("rect", {
				x: "16",
				y: "40",
				width: "24",
				height: "4",
				rx: "1",
				fill: "currentColor",
				fillOpacity: "0.3"
			})
		]
	});
	PlaybookGrid = ({ cases, isFavorite, onCardClick, onToggleFavorite, searchKeyword, source }) => {
		const t = useTranslation();
		const columns = (0, import_react$5.useMemo)(() => {
			const cols = Array.from({ length: COLUMN_COUNT }, () => []);
			const colHeights = new Array(COLUMN_COUNT).fill(0);
			cases.forEach((item) => {
				let minIdx = 0;
				for (let i = 1; i < COLUMN_COUNT; i++) if (colHeights[i] < colHeights[minIdx]) minIdx = i;
				cols[minIdx].push(item);
				colHeights[minIdx] += estimateCardHeight(item);
			});
			return cols;
		}, [cases]);
		if (cases.length === 0) {
			const emptyMessage = searchKeyword ? t("discover.noSearchResult", { keyword: searchKeyword }) : t("discover.empty");
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "dc-empty-state",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(EmptyIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: emptyMessage })]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [searchKeyword && cases.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "dc-search-result-hint is-visible",
			children: [
				t("discover.searchResultPrefix"),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", {
					className: "keyword",
					children: [
						"\"",
						searchKeyword,
						"\""
					]
				}),
				t("discover.searchResultMiddle"),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
					className: "count",
					children: cases.length
				}),
				t("discover.searchResultSuffix")
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "dc-playbook-grid",
			children: columns.map((colCases, colIdx) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "dc-masonry-column",
				children: colCases.map((caseData) => {
					return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PlaybookCard, {
						caseData,
						cardPosition: cases.indexOf(caseData) + 1,
						isFavorite: isFavorite(caseData.id),
						onClick: onCardClick,
						onToggleFavorite,
						highlightKeyword: searchKeyword,
						source
					}, caseData.id);
				})
			}, colIdx))
		})] });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/views/main-view/index.tsx
var import_react$4, import_jsx_runtime$4, LoadingOverlay, DiscoverMainView;
var init_main_view = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_types();
	init_category_tabs();
	init_empty_state();
	init_playbook_grid();
	init_types$1();
	import_jsx_runtime$4 = require_jsx_runtime();
	LoadingOverlay = ({ message }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "dc-loading-overlay",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "dc-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "dc-loading-message",
				children: message ?? t("common.loading")
			})]
		});
	};
	DiscoverMainView = ({ isLoading, error, cases, categories, selectedCategory, searchKeyword, isSearching, favFilterActive, isFavorite, onRefresh, onCardClick, onToggleFavorite, onCategoryChange }) => {
		const t = useTranslation();
		const currentSource = (0, import_react$4.useMemo)(() => {
			if (selectedCategory === "__featured__") return PlaybookCtaSource.Featured;
			if (favFilterActive) return PlaybookCtaSource.Favorite;
			if (isSearching) return PlaybookCtaSource.Search;
			return PlaybookCtaSource.Scene;
		}, [
			selectedCategory,
			favFilterActive,
			isSearching
		]);
		const renderContent = () => {
			if (isLoading && cases.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(LoadingOverlay, {});
			if (error && cases.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "dc-empty-state",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", { children: t("discover.loadFailed") }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
					type: "button",
					onClick: onRefresh,
					children: t("common.retry")
				})]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("section", {
				className: "dc-browse-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DiscoverCategoryTabs, {
					categories,
					selectedCategory,
					onChange: onCategoryChange,
					hidden: favFilterActive
				}), cases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DiscoverEmpty, {
					favFilterActive,
					isSearching,
					hasCategory: selectedCategory !== null
				}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(PlaybookGrid, {
					cases,
					isFavorite,
					onCardClick,
					onToggleFavorite,
					searchKeyword,
					source: currentSource
				})]
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "dc-content-wrapper",
			children: renderContent()
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/views/index.ts
var init_views = __esmMin((() => {
	init_detail_view();
	init_header();
	init_icons();
	init_main_view();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/discover-panel/page/index.tsx
var import_react$3, import_jsx_runtime$3, DiscoverPage$1;
var init_page = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_dist();
	init_contexts();
	init_foundation();
	init_use_named_page_show();
	init_useI18n();
	init_telemetry_context();
	init_types();
	init_workbuddy_topbar();
	init_hooks();
	init_types$1();
	init_views();
	init_icons();
	import_jsx_runtime$3 = require_jsx_runtime();
	DiscoverPage$1 = () => {
		const adapter = useAdapter();
		const { account } = useAccount();
		const enterpriseId = account?.enterpriseId ?? "";
		const { reportEvent, Events } = useAgentTelemetry();
		const t = useTranslation();
		const topBarClassName = useTopBarRootClassName();
		useNamedPageShow({
			active: true,
			elementId: "explore_entry_click",
			elementName: "探索入口"
		});
		const [selectedCategory, setSelectedCategory] = (0, import_react$3.useState)(null);
		const [searchKeyword, setSearchKeyword] = (0, import_react$3.useState)("");
		const [selectedCaseId, setSelectedCaseId] = (0, import_react$3.useState)(null);
		const [showDetailPage, setShowDetailPage] = (0, import_react$3.useState)(false);
		const [favFilterActive, setFavFilterActive] = (0, import_react$3.useState)(false);
		/** 进入详情页时的来源（用于 playbook_cta_click.source） */
		const [selectedCaseSource, setSelectedCaseSource] = (0, import_react$3.useState)(PlaybookCtaSource.Scene);
		/** 进入详情页时卡片在列表中的位置（用于 playbook_cta_click.position） */
		const [selectedCasePosition, setSelectedCasePosition] = (0, import_react$3.useState)(1);
		const [searchParams, setSearchParams] = useSearchParams();
		(0, import_react$3.useEffect)(() => {
			if (!showDetailPage || !selectedCaseId) return;
			if (searchParams.get("cardId") === selectedCaseId) return;
			const next = new URLSearchParams(searchParams);
			next.set("cardId", selectedCaseId);
			setSearchParams(next, { replace: true });
		}, [
			showDetailPage,
			selectedCaseId,
			searchParams,
			setSearchParams
		]);
		const { favorites, favoriteIds, isFavorite, toggleFavorite } = useFavorites();
		const { categories, cases, allCases, isLoading, error, refresh } = useDiscover(selectedCategory, searchKeyword, favFilterActive, favoriteIds, enterpriseId);
		const isSearching = searchKeyword.trim().length > 0;
		/** 列表页曝光（组件挂载时上报，因组件仅在面板激活时渲染） */
		(0, import_react$3.useEffect)(() => {
			reportEvent(Events.WebPageShow, { pageName: "playbook_list" });
		}, []);
		/** 详情页曝光 */
		(0, import_react$3.useEffect)(() => {
			if (showDetailPage) reportEvent(Events.WebPageShow, { pageName: "playbook_detail" });
		}, [showDetailPage]);
		/** 上一次上报的搜索词，防止重复上报 */
		const lastReportedSearchRef = (0, import_react$3.useRef)("");
		(0, import_react$3.useEffect)(() => {
			const keyword = searchKeyword.trim();
			if (!keyword || keyword === lastReportedSearchRef.current) return;
			lastReportedSearchRef.current = keyword;
			const resultIds = cases.map((c) => c.id).slice(0, 20).join(",");
			const resultNames = cases.map((c) => c.title).slice(0, 20).join(",");
			reportEvent(Events.PlaybookSearch, {
				query: keyword,
				count: cases.length,
				id: resultIds,
				name: resultNames
			});
		}, [
			searchKeyword,
			cases,
			reportEvent,
			Events
		]);
		const handleCategoryChange = (0, import_react$3.useCallback)((categoryId) => {
			setSelectedCategory(categoryId);
			const isFeatured = categoryId === FEATURED_CATEGORY_ID;
			reportEvent(Events.WebElementClick, {
				pageName: "playbook_list",
				elementId: "playbook_sceneFilter",
				elementName: isFeatured ? "featured" : categoryId ?? "all",
				source: isFeatured ? PlaybookCtaSource.Featured : PlaybookCtaSource.Scene
			});
		}, [reportEvent, Events]);
		const handleSearchChange = (0, import_react$3.useCallback)((keyword) => {
			setSearchKeyword(keyword);
			if (!keyword.trim()) {
				lastReportedSearchRef.current = "";
				return;
			}
			reportEvent(Events.WebElementClick, {
				pageName: "playbook_list",
				elementId: "playbook_searchSubmit",
				elementName: keyword,
				source: PlaybookCtaSource.Search
			});
		}, [reportEvent, Events]);
		const handleCardClick = (0, import_react$3.useCallback)((caseId, cardPosition, source) => {
			const caseName = allCases.find((c) => c.id === caseId)?.title ?? caseId;
			reportEvent(Events.WebElementClick, {
				pageName: "playbook_list",
				elementId: `playbookCard_${caseId}`,
				elementName: caseName,
				source
			});
			setSelectedCaseId(caseId);
			setShowDetailPage(true);
			setSelectedCaseSource(source);
			setSelectedCasePosition(cardPosition);
		}, [
			allCases,
			reportEvent,
			Events
		]);
		const handleToggleFavorite = (0, import_react$3.useCallback)((caseId, source) => {
			const wasAlreadyFavorite = isFavorite(caseId);
			toggleFavorite(caseId);
			const caseName = allCases.find((c) => c.id === caseId)?.title ?? caseId;
			const pageName = showDetailPage ? "playbook_detail" : "playbook_list";
			reportEvent(Events.WebElementClick, {
				pageName,
				elementId: wasAlreadyFavorite ? `playbookUnStar_${caseId}` : `playbookStar_${caseId}`,
				elementName: caseName,
				source
			});
		}, [
			toggleFavorite,
			isFavorite,
			allCases,
			showDetailPage,
			reportEvent,
			Events
		]);
		const handleToggleFavFilter = (0, import_react$3.useCallback)(() => {
			const willActivate = !favFilterActive;
			setFavFilterActive(willActivate);
			if (willActivate) {
				setSelectedCategory(null);
				reportEvent(Events.WebElementClick, {
					pageName: "playbook_list",
					elementId: "playbook_favoriteView",
					elementName: "myFavorites",
					source: PlaybookCtaSource.Scene
				});
			}
		}, [
			favFilterActive,
			reportEvent,
			Events
		]);
		const handleBackFromDetail = (0, import_react$3.useCallback)(() => {
			setShowDetailPage(false);
			setSelectedCaseId(null);
			if (searchParams.get("cardId")) {
				const next = new URLSearchParams(searchParams);
				next.delete("cardId");
				setSearchParams(next, { replace: true });
			}
		}, [searchParams, setSearchParams]);
		const handleLaunchSuccess = (0, import_react$3.useCallback)(() => {
			setShowDetailPage(false);
			setSelectedCaseId(null);
		}, []);
		const hasAppliedUrlCardIdRef = (0, import_react$3.useRef)(false);
		(0, import_react$3.useEffect)(() => {
			const urlCardId = searchParams.get("cardId");
			if (!urlCardId || allCases.length === 0) return;
			if (hasAppliedUrlCardIdRef.current && selectedCaseId === urlCardId) return;
			if (!allCases.some((c) => c.id === urlCardId)) return;
			hasAppliedUrlCardIdRef.current = true;
			setSelectedCaseId(urlCardId);
			setShowDetailPage(true);
			setSelectedCaseSource(PlaybookCtaSource.Scene);
			setSelectedCasePosition(1);
		}, [
			searchParams,
			allCases,
			selectedCaseId
		]);
		const isDetailMode = showDetailPage && selectedCaseId !== null;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "discover-panel-page",
			children: [
				favFilterActive ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("header", {
					className: `${topBarClassName} dc-fav-topbar`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
						type: "button",
						className: "dc-fav-mode-header-back",
						onClick: handleToggleFavFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ArrowLeftIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: t("discover.backToDiscover") })]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(WorkBuddyTopBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "dc-content-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DiscoverHeader, {
						favFilterActive,
						favoriteCount: favorites.length,
						searchKeyword,
						onToggleFavFilter: handleToggleFavFilter,
						onSearchChange: handleSearchChange
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DiscoverMainView, {
						isLoading,
						error,
						cases,
						categories,
						selectedCategory,
						searchKeyword,
						isSearching,
						favFilterActive,
						isFavorite,
						onRefresh: refresh,
						onCardClick: handleCardClick,
						onToggleFavorite: handleToggleFavorite,
						onCategoryChange: handleCategoryChange
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Modal, {
					open: isDetailMode,
					onOpenChange: (o) => {
						if (!o) handleBackFromDetail();
					},
					unstyled: true,
					closable: false,
					closeOnEscape: true,
					closeOnOverlayClick: true,
					ariaLabel: "playbook-detail",
					wrapClassName: "dc-detail-overlay is-open",
					className: "dc-detail-modal",
					children: isDetailMode && selectedCaseId && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DiscoverDetailView, {
						caseId: selectedCaseId,
						isFavorite: isFavorite(selectedCaseId),
						environmentType: adapter?.environmentType,
						onBack: handleBackFromDetail,
						onToggleFavorite: handleToggleFavorite,
						onLaunchSuccess: handleLaunchSuccess,
						source: selectedCaseSource,
						position: selectedCasePosition,
						categories,
						searchKeyword
					})
				})
			]
		});
	};
}));
var init_featured_section = __esmMin((() => {
	require_react();
	init_useI18n();
	init_telemetry_context();
	init_use_locale();
	init_playbook_card();
	require_jsx_runtime();
})), import_jsx_runtime$1, DiscoverPanel;
var init_discover_panel = __esmMin((() => {
	init_discover_panel$1();
	require_react();
	init_page();
	import_jsx_runtime$1 = require_jsx_runtime();
	init_case_detail_page();
	init_category_tabs();
	init_featured_section();
	init_playbook_card();
	init_playbook_grid();
	init_search_bar();
	init_hooks();
	DiscoverPanel = (props) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DiscoverPage$1, { ...props });
}));
//#endregion
//#region ../../packages/agent-ui/src/pages/discover.tsx
function DiscoverPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoverPanel, {});
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	require_react();
	init_discover_panel();
	import_jsx_runtime = require_jsx_runtime();
}))();
export { DiscoverPage };
