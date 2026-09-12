import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Sc as init_app_providers, Tc as useAgentServices, dd as init_use_is_enterprise_admin, fu as init_use_oneid_app_status, pd as useIsEnterpriseEdition, pu as useOneidAppStatus } from "./agent-mail-CiuzbR2o.js";
import { i as Breadcrumb, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { t as init_contexts } from "./contexts-D7XKqa2J.js";
import { r as useAdapter } from "./adapter-context-DGaRYQ5R.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { Dt as init_no_knowledge_base_update, Ot as no_knowledge_base_update_default, St as reportLicenseDeniedPageShow, a as KbDefaultIcon, at as isDirectlyUsableLogoUrl, c as init_team_default_icon, i as isLexiangOnlineDocIcon, n as getLexiangIconUrl, o as init_kb_default_icon, r as init_lexiang_file_type_icon, rt as init_mcp_client, s as TeamDefaultIcon, ut as init_telemetry } from "./lexiang-file-type-icon-BHHdkoaP.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/styles/tokens.less
var init_tokens = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/hooks/use-lexiang-license.ts
/**
* @param enabled 是否需要触发 license 校验，调用方典型传值：
*                `picker.visible && isAuthorized`
*
* 注意：本 hook 内部还会强制叠加一道
*   `useIsEnterpriseEdition()` + `useOneidAppStatus('lexiang').status === 'enabled'`
* 的兜底判定，即使 `enabled=true` 但企业态/OneID 不满足也会落到 `skip`，
* 避免误用造成 C 端打扰。
*/
function useLexiangLicense(enabled) {
	const isEnterpriseEdition = useIsEnterpriseEdition();
	const oneidStatus = useOneidAppStatus("lexiang");
	const facade = useAgentServices()?.tencentLexiang;
	const shouldCheck = enabled && isEnterpriseEdition && oneidStatus.status === "enabled" && !!facade?.checkLicense;
	const shouldWaitOneid = enabled && isEnterpriseEdition && oneidStatus.status === "checking";
	const [status, setStatus] = (0, import_react$9.useState)(() => {
		if (shouldCheck || shouldWaitOneid) return "checking";
		return "skip";
	});
	const requestSeqRef = (0, import_react$9.useRef)(0);
	const performCheck = (0, import_react$9.useCallback)(async () => {
		if (!facade?.checkLicense) {
			setStatus("skip");
			return;
		}
		const seq = ++requestSeqRef.current;
		setStatus("checking");
		try {
			const resp = await facade.checkLicense();
			if (seq !== requestSeqRef.current) return;
			setStatus(resp?.data?.is_pass === true ? "pass" : "denied");
		} catch {
			if (seq !== requestSeqRef.current) return;
			setStatus("denied");
		}
	}, [facade]);
	(0, import_react$9.useEffect)(() => {
		if (shouldWaitOneid) {
			requestSeqRef.current += 1;
			setStatus("checking");
			return;
		}
		if (!shouldCheck) {
			requestSeqRef.current += 1;
			setStatus("skip");
			return;
		}
		let cancelled = false;
		performCheck().catch(() => {
			if (!cancelled) setStatus("denied");
		});
		return () => {
			cancelled = true;
			requestSeqRef.current += 1;
		};
	}, [
		shouldCheck,
		shouldWaitOneid,
		performCheck
	]);
	const refresh = (0, import_react$9.useCallback)(async () => {
		if (!shouldCheck) return;
		await performCheck();
	}, [shouldCheck, performCheck]);
	return {
		status,
		isAdmin: oneidStatus.isAdmin,
		refresh
	};
}
var import_react$9;
var init_use_lexiang_license = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_use_is_enterprise_admin();
	init_use_oneid_app_status();
	init_app_providers();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/license-denied/index.less
var init_license_denied$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/license-denied/index.tsx
function LexiangLicenseDeniedView({ isAdmin, onAssign }) {
	const t = useTranslation();
	const adapter = useAdapter();
	const [busy, setBusy] = (0, import_react$8.useState)(false);
	const hasReportedShowRef = (0, import_react$8.useRef)(false);
	(0, import_react$8.useEffect)(() => {
		if (hasReportedShowRef.current) return;
		hasReportedShowRef.current = true;
		reportLicenseDeniedPageShow(adapter);
	}, [adapter]);
	const text = isAdmin ? t("tencentLexiang.license.deniedAdmin") : t("tencentLexiang.license.deniedMember");
	const handleAssign = (0, import_react$8.useCallback)(async () => {
		if (!onAssign || busy) return;
		setBusy(true);
		try {
			await onAssign();
		} finally {
			setBusy(false);
		}
	}, [onAssign, busy]);
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		className: "lexiang-license-denied",
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
				className: "lexiang-license-denied__icon",
				src: no_knowledge_base_update_default,
				alt: "",
				"aria-hidden": "true",
				draggable: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "lexiang-license-denied__text",
				children: text
			}),
			isAdmin && !!onAssign && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("button", {
				type: "button",
				className: "lexiang-license-denied__action",
				onClick: handleAssign,
				disabled: busy,
				"aria-label": t("tencentLexiang.license.assignAction"),
				children: [busy && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
					className: "lexiang-license-denied__action-spinner",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: t("tencentLexiang.license.assignAction") })]
			})
		]
	});
}
var import_react$8, import_jsx_runtime$7;
var init_license_denied = __esmMin((() => {
	init_license_denied$1();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_useI18n();
	init_no_knowledge_base_update();
	init_telemetry();
	import_jsx_runtime$7 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/kb-cascade-view.less
var init_kb_cascade_view$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/doc-tree-view.less
var init_doc_tree_view$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/picker-icons.tsx
/** 根据 DocItem.kind + extension 获取对应的图标 URL */
function getDocKindIconUrl(kind, extension) {
	return getLexiangIconUrl(kind, extension, kind === "folder");
}
/**
* 渲染文档类型图标（<img> 元素）。
*
* 在线文档（智能文档 / 智能表格等）使用品牌 PNG，带留白，视觉上在小尺寸下偏小。
* 调用方可通过 `onlineDocSize` 单独为在线文档指定更大的尺寸，保持与本地文件 SVG
* 视觉对齐（与 `LexiangFileTypeIcon` 的同名 prop 保持一致语义）。
*/
function DocKindIcon({ kind, extension, size = 24, onlineDocSize }) {
	if (kind === "kb") return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(KbDefaultIcon, { size });
	const iconUrl = getDocKindIconUrl(kind, extension);
	const renderSize = isLexiangOnlineDocIcon(kind, extension, kind === "folder") && onlineDocSize ? onlineDocSize : size;
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("img", {
		src: iconUrl,
		width: renderSize,
		height: renderSize,
		alt: extension || kind || "doc",
		draggable: false,
		style: {
			display: "block",
			width: renderSize,
			height: renderSize,
			flexShrink: 0
		}
	});
}
var import_jsx_runtime$6;
var init_picker_icons = __esmMin((() => {
	require_react();
	init_kb_default_icon();
	init_lexiang_file_type_icon();
	import_jsx_runtime$6 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/types.ts
/** 判断知识条目是否应展示展开入口 */
function isExpandableDoc(doc) {
	return doc.meta?.hasChildren === true;
}
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/doc-tree-view.tsx
function DocTreeFooter({ depth, nodeState, onLoadMore, onRetry }) {
	const t = useTranslation();
	const sentinelRef = (0, import_react$6.useRef)(null);
	const shouldAutoLoad = !!nodeState?.loaded && !!nodeState.nextPageToken && !nodeState.loading;
	(0, import_react$6.useEffect)(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || !shouldAutoLoad || !onLoadMore) return;
		const scrollRoot = sentinel.closest(".lexiang-kb-cascade__col-body");
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onLoadMore();
		}, {
			root: scrollRoot instanceof Element ? scrollRoot : null,
			rootMargin: "0px 0px 48px 0px",
			threshold: .1
		});
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [onLoadMore, shouldAutoLoad]);
	if (!nodeState) return null;
	if (nodeState.loading) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "lexiang-doc-tree-footer",
		style: { paddingLeft: 40 + depth * 20 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { className: "lexiang-doc-tree-footer__spinner" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: t("tencentLexiang.picker.loading") })]
	});
	if (nodeState.error) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
		type: "button",
		className: "lexiang-doc-tree-footer lexiang-doc-tree-footer--action",
		style: { paddingLeft: 40 + depth * 20 },
		onClick: onRetry,
		children: t("tencentLexiang.catalog.loadFailed")
	});
	if (shouldAutoLoad) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
		ref: sentinelRef,
		className: "lexiang-doc-tree-footer lexiang-doc-tree-footer--sentinel",
		style: { paddingLeft: 40 + depth * 20 },
		children: t("tencentLexiang.picker.loadMore")
	});
	return null;
}
function DocTreeNode({ doc, depth, getChildren, getNodeState, loadMoreChildren, retryChildren, selectionMode, selectedDocIds, onDocSelect, onFolderSelect, expandedIds, toggleExpand }) {
	const t = useTranslation();
	const isFolder = doc.kind === "folder";
	const canHaveChildren = isExpandableDoc(doc);
	const isExpanded = expandedIds.has(doc.id);
	const isSelected = selectedDocIds?.has(doc.id) ?? false;
	const children = canHaveChildren && isExpanded ? getChildren(doc.id) : [];
	const nodeState = canHaveChildren && isExpanded ? getNodeState?.(doc.id) : void 0;
	const collectDescendants = (0, import_react$6.useCallback)((folderId) => {
		const result = [];
		for (const child of getChildren(folderId)) {
			result.push(child);
			if (isExpandableDoc(child)) result.push(...collectDescendants(child.id));
		}
		return result;
	}, [getChildren]);
	const handleRowClick = () => {
		if (isFolder) toggleExpand(doc.id);
		else onDocSelect?.(doc);
	};
	const handleCheckboxClick = (e) => {
		e.stopPropagation();
		if (isFolder && onFolderSelect) onFolderSelect(doc, collectDescendants(doc.id));
		else onDocSelect?.(doc);
	};
	const handleArrowClick = (e) => {
		e.stopPropagation();
		toggleExpand(doc.id);
	};
	const isSticky = isFolder && isExpanded && depth === 0;
	const row = /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: [
			"lexiang-doc-tree-row",
			isFolder ? "lexiang-doc-tree-row--folder" : "",
			isSticky ? "lexiang-doc-tree-row--sticky" : "",
			isSelected ? "lexiang-doc-tree-row--selected" : ""
		].filter(Boolean).join(" "),
		style: {
			paddingLeft: 8 + depth * 20,
			top: isSticky ? -4 : void 0
		},
		onClick: handleRowClick,
		children: [
			canHaveChildren ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				className: `lexiang-doc-tree-row__expand-btn${isExpanded ? " lexiang-doc-tree-row__expand-btn--expanded" : ""}`,
				onClick: handleArrowClick,
				"aria-label": isExpanded ? t("tencentLexiang.picker.collapse") : t("tencentLexiang.picker.expand"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
					width: "6",
					height: "10",
					viewBox: "0 0 6 10",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
						d: "M1 1L5 5L1 9",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { className: "lexiang-doc-tree-row__expand-placeholder" }),
			selectionMode === "checkbox" && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "lexiang-doc-tree-row__selector-wrap",
				onClick: handleCheckboxClick,
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
					className: `lexiang-doc-tree-row__checkbox${isSelected ? " lexiang-doc-tree-row__checkbox--checked" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
						viewBox: "0 0 10 10",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
							d: "M1.5 5.5L4 8L8.5 2",
							stroke: "currentColor",
							strokeWidth: "1.6",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				})
			}),
			selectionMode === "radio" && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: `lexiang-doc-tree-row__radio${isSelected ? " lexiang-doc-tree-row__radio--checked" : ""}`,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "lexiang-doc-tree-row__icon",
				children: doc.icon ?? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DocKindIcon, {
					kind: doc.kind,
					extension: doc.extension,
					size: 20
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
				className: "lexiang-doc-tree-row__name",
				children: doc.name
			})
		]
	});
	if (!canHaveChildren || !isExpanded) return row;
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "lexiang-doc-tree-folder-group",
		children: [
			row,
			children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DocTreeNode, {
				doc: child,
				depth: depth + 1,
				getChildren,
				getNodeState,
				loadMoreChildren,
				retryChildren,
				selectionMode,
				selectedDocIds,
				onDocSelect,
				onFolderSelect,
				expandedIds,
				toggleExpand
			}, child.id)),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DocTreeFooter, {
				depth: depth + 1,
				nodeState,
				onLoadMore: loadMoreChildren ? () => loadMoreChildren(doc.id) : void 0,
				onRetry: retryChildren ? () => retryChildren(doc.id) : void 0
			})
		]
	});
}
function DocTreeView({ docs, getChildren, getNodeState, loadMoreChildren, retryChildren, rootNodeState, onRootLoadMore, onRootRetry, selectionMode = "none", selectedDocIds, onDocSelect, onFolderSelect }) {
	const [expandedIds, setExpandedIds] = (0, import_react$6.useState)(/* @__PURE__ */ new Set());
	const toggleExpand = (0, import_react$6.useCallback)((id) => {
		setExpandedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "lexiang-doc-tree-view",
		children: [docs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DocTreeNode, {
			doc,
			depth: 0,
			getChildren,
			getNodeState,
			loadMoreChildren,
			retryChildren,
			selectionMode,
			selectedDocIds,
			onDocSelect,
			onFolderSelect,
			expandedIds,
			toggleExpand
		}, doc.id)), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(DocTreeFooter, {
			depth: 0,
			nodeState: rootNodeState,
			onLoadMore: onRootLoadMore,
			onRetry: onRootRetry
		})]
	});
}
var import_react$6, import_jsx_runtime$5;
var init_doc_tree_view = __esmMin((() => {
	init_doc_tree_view$1();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_picker_icons();
	init_types();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/kb-cascade-view.tsx
function KbCascadeView({ teams, activeTeamId, onTeamChange, teamSelectionMode = "none", selectedTeamIds, onTeamSelect, teamsHasMore, teamsLoadingMore, onTeamsLoadMore, personalSpaceLabel, isPersonalSpaceActive, onPersonalSpaceClick, kbs, activeKbId, onKbChange, kbSelectionMode = "none", selectedKbIds, onKbSelect, kbsHasMore, kbsLoading, kbsLoadingMore, onKbsLoadMore, showKbArrow = true, columnRatio, docs, getDocChildren, getDocNodeState, loadMoreDocChildren, retryDocChildren, rootDocNodeState, loadMoreRootDocs, retryRootDocs, docSelectionMode = "none", selectedDocIds, onDocSelect, onFolderSelect, onDocClick, breadcrumbs, resizable = false }) {
	const t = useTranslation();
	const hasThirdColumn = docs !== void 0;
	const columnCount = hasThirdColumn ? 3 : 2;
	const teamSentinelRef = (0, import_react$5.useRef)(null);
	(0, import_react$5.useEffect)(() => {
		const sentinel = teamSentinelRef.current;
		if (!sentinel || !teamsHasMore || teamsLoadingMore) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onTeamsLoadMore?.();
		}, { threshold: .1 });
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [
		teamsHasMore,
		teamsLoadingMore,
		onTeamsLoadMore
	]);
	const kbSentinelRef = (0, import_react$5.useRef)(null);
	(0, import_react$5.useEffect)(() => {
		const sentinel = kbSentinelRef.current;
		if (!sentinel || !kbsHasMore || kbsLoadingMore) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onKbsLoadMore?.();
		}, { threshold: .1 });
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [
		kbsHasMore,
		kbsLoadingMore,
		onKbsLoadMore
	]);
	const cascadeRef = (0, import_react$5.useRef)(null);
	const [columnWidths, setColumnWidths] = (0, import_react$5.useState)(null);
	const columnWidthsRef = (0, import_react$5.useRef)(null);
	columnWidthsRef.current = columnWidths;
	const dragStartWidths = (0, import_react$5.useRef)([]);
	(0, import_react$5.useEffect)(() => {
		if (!cascadeRef.current) return;
		const raf = requestAnimationFrame(() => {
			if (!cascadeRef.current) return;
			const cols = cascadeRef.current.querySelectorAll(":scope > .lexiang-kb-cascade__column");
			const widths = [];
			cols.forEach((col) => widths.push(col.offsetWidth));
			if (widths.length === columnCount && widths.every((w) => w > 0)) setColumnWidths(widths);
		});
		return () => cancelAnimationFrame(raf);
	}, [columnCount]);
	(0, import_react$5.useEffect)(() => {
		if (!resizable || !cascadeRef.current || !columnWidths) return;
		const container = cascadeRef.current;
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;
			const currentWidths = columnWidthsRef.current;
			if (!currentWidths) return;
			const diff = entry.contentRect.width - (columnCount - 1) - currentWidths.reduce((a, b) => a + b, 0);
			if (Math.abs(diff) < 1) return;
			setColumnWidths((prev) => {
				if (!prev) return prev;
				const next = [...prev];
				next[next.length - 1] = Math.max(COLUMN_MIN_WIDTH, next[next.length - 1] + diff);
				return next;
			});
		});
		observer.observe(container);
		return () => observer.disconnect();
	}, [
		resizable,
		columnCount,
		columnWidths !== null
	]);
	const handleDividerMouseDown = (0, import_react$5.useCallback)((dividerIndex) => (e) => {
		e.preventDefault();
		if (columnWidths) dragStartWidths.current = [...columnWidths];
		const startX = e.clientX;
		const onMouseMove = (ev) => {
			const deltaX = ev.clientX - startX;
			const starts = dragStartWidths.current;
			if (!starts.length) return;
			const total = starts[dividerIndex] + starts[dividerIndex + 1];
			let newLeft = Math.max(COLUMN_MIN_WIDTH, starts[dividerIndex] + deltaX);
			const newRight = Math.max(COLUMN_MIN_WIDTH, total - newLeft);
			if (newLeft + newRight !== total) newLeft = total - newRight;
			setColumnWidths((prev) => {
				if (!prev) return prev;
				const next = [...prev];
				next[dividerIndex] = newLeft;
				next[dividerIndex + 1] = newRight;
				return next;
			});
		};
		const onMouseUp = () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		};
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	}, [columnWidths]);
	const getColStyle = (index) => {
		if (columnWidths) return {
			width: columnWidths[index],
			minWidth: COLUMN_MIN_WIDTH,
			flex: "0 0 auto"
		};
		if (!columnRatio) return { minWidth: COLUMN_MIN_WIDTH };
		if (index === 0) return {
			flex: columnRatio[0],
			minWidth: COLUMN_MIN_WIDTH
		};
		if (index === 1) return {
			flex: columnRatio[1],
			minWidth: COLUMN_MIN_WIDTH
		};
		return { minWidth: COLUMN_MIN_WIDTH };
	};
	const checkboxSvg = /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		viewBox: "0 0 10 10",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M1.5 5.5L4 8L8.5 2",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	const arrowSvg = /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		className: "lexiang-kb-cascade__arrow",
		width: "6",
		height: "10",
		viewBox: "0 0 6 10",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			d: "M1 1L5 5L1 9",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "lexiang-kb-cascade",
		children: [breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Breadcrumb, {
			className: "lexiang-kb-cascade__breadcrumb",
			size: "sm",
			collapseThreshold: BREADCRUMB_COLLAPSE_THRESHOLD,
			separator: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				"aria-hidden": "true",
				children: "›"
			}),
			items: breadcrumbs.map((crumb) => ({
				id: crumb.id,
				label: crumb.label,
				onClick: crumb.onClick
			}))
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			ref: cascadeRef,
			className: "lexiang-kb-cascade__columns",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "lexiang-kb-cascade__column",
					style: getColStyle(0),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "lexiang-kb-cascade__col-header",
						children: t("tencentLexiang.picker.team")
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
						className: "lexiang-kb-cascade__col-body",
						children: [personalSpaceLabel && onPersonalSpaceClick && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: `lexiang-kb-cascade__team-row${isPersonalSpaceActive ? " lexiang-kb-cascade__team-row--active" : ""}`,
							onClick: onPersonalSpaceClick,
							children: [
								teamSelectionMode !== "none" && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "lexiang-kb-cascade__selector-placeholder",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "lexiang-kb-cascade__team-avatar lexiang-kb-cascade__team-avatar--default",
									children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 16 16",
										fill: "none",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
											d: "M8 8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.5 5.25c0-2.071 2.462-3.75 5.5-3.75s5.5 1.679 5.5 3.75v.25h-11v-.25Z",
											stroke: "currentColor",
											strokeWidth: "1.2",
											strokeLinejoin: "round"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
									className: "lexiang-kb-cascade__name",
									children: personalSpaceLabel
								}),
								arrowSvg
							]
						}), teams.length === 0 && !personalSpaceLabel ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "lexiang-kb-cascade__empty lexiang-kb-cascade__empty--centered",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
									src: no_knowledge_base_update_default,
									alt: "",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-text",
								children: t("tencentLexiang.picker.noAccessibleTeams")
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [teams.map((team) => {
							const isActive = activeTeamId === team.id;
							const isSelected = selectedTeamIds?.has(`team:${team.id}`);
							return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: `lexiang-kb-cascade__team-row${isActive ? " lexiang-kb-cascade__team-row--active" : ""}`,
								onClick: () => {
									onTeamChange?.(team.id);
									if (teamSelectionMode === "radio") onTeamSelect?.(team);
								},
								children: [
									teamSelectionMode === "checkbox" && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "lexiang-kb-cascade__selector-wrap",
										onClick: (e) => {
											e.stopPropagation();
											onTeamSelect?.(team);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
											className: `lexiang-kb-cascade__checkbox${isSelected ? " lexiang-kb-cascade__checkbox--checked" : ""}`,
											children: checkboxSvg
										})
									}),
									teamSelectionMode === "radio" && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: `lexiang-kb-cascade__radio${isSelected ? " lexiang-kb-cascade__radio--checked" : ""}`,
										"aria-hidden": "true"
									}),
									team.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
										className: "lexiang-kb-cascade__team-avatar",
										src: team.avatarUrl,
										alt: ""
									}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "lexiang-kb-cascade__team-avatar lexiang-kb-cascade__team-avatar--default",
										children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TeamDefaultIcon, { size: 18 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "lexiang-kb-cascade__name",
										children: team.name
									}),
									arrowSvg
								]
							}, team.id);
						}), teamsHasMore && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [teamsLoadingMore && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "lexiang-kb-cascade__load-more-indicator",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "lexiang-kb-cascade__load-more-spinner" })
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							ref: teamSentinelRef,
							className: "lexiang-kb-cascade__load-more-sentinel"
						})] })] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: `lexiang-kb-cascade__divider${resizable ? " lexiang-kb-cascade__divider--resizable" : ""}`,
					onMouseDown: resizable ? handleDividerMouseDown(0) : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "lexiang-kb-cascade__column",
					style: getColStyle(1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "lexiang-kb-cascade__col-header",
						children: activeTeamId && kbSelectionMode === "radio" ? `\u201C${teams.find((tm) => tm.id === activeTeamId)?.name ?? ""}\u201D${t("tencentLexiang.picker.teamKbSuffix")}` : t("tencentLexiang.picker.knowledgeBase")
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "lexiang-kb-cascade__col-body",
						children: kbs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "lexiang-kb-cascade__empty lexiang-kb-cascade__empty--centered",
							children: kbsLoading ? t("tencentLexiang.picker.loading") : /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
									src: no_knowledge_base_update_default,
									alt: "",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-text",
								children: t("tencentLexiang.picker.noKb")
							})] })
						}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [kbs.map((kb) => {
							const isActive = kb.id === activeKbId;
							const isSelected = selectedKbIds?.has(kb.id);
							return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: `lexiang-kb-cascade__kb-row${isActive ? " lexiang-kb-cascade__kb-row--active" : ""}`,
								onClick: () => {
									onKbChange?.(kb.id);
									if (kbSelectionMode === "radio") onKbSelect?.(kb);
								},
								children: [
									kbSelectionMode === "checkbox" && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "lexiang-kb-cascade__selector-wrap",
										onClick: (e) => {
											e.stopPropagation();
											onKbSelect?.(kb);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
											className: `lexiang-kb-cascade__checkbox${isSelected ? " lexiang-kb-cascade__checkbox--checked" : ""}`,
											children: checkboxSvg
										})
									}),
									kbSelectionMode === "radio" && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: `lexiang-kb-cascade__radio${isSelected ? " lexiang-kb-cascade__radio--checked" : ""}`,
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "lexiang-kb-cascade__icon",
										children: (() => {
											const rawLogo = kb.meta?.rawLogo;
											const logoSrc = kb.logoUrl || (isDirectlyUsableLogoUrl(rawLogo) ? rawLogo : void 0);
											return logoSrc ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
												className: "lexiang-kb-cascade__kb-logo",
												src: logoSrc,
												alt: "",
												referrerPolicy: "no-referrer"
											}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(KbDefaultIcon, { size: 16 });
										})()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
										className: "lexiang-kb-cascade__name",
										children: kb.name
									}),
									showKbArrow && arrowSvg
								]
							}, kb.id);
						}), kbsHasMore && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [kbsLoadingMore && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "lexiang-kb-cascade__load-more-indicator",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { className: "lexiang-kb-cascade__load-more-spinner" })
						}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							ref: kbSentinelRef,
							className: "lexiang-kb-cascade__load-more-sentinel"
						})] })] })
					})]
				}),
				hasThirdColumn && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: `lexiang-kb-cascade__divider${resizable ? " lexiang-kb-cascade__divider--resizable" : ""}`,
					onMouseDown: resizable ? handleDividerMouseDown(1) : void 0
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "lexiang-kb-cascade__column",
					style: getColStyle(2),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "lexiang-kb-cascade__col-header",
						children: t("tencentLexiang.picker.knowledge")
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "lexiang-kb-cascade__col-body",
						children: !activeKbId ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "lexiang-kb-cascade__empty lexiang-kb-cascade__empty--centered",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
									src: "" + new URL("empty-CopzwuXE.svg", import.meta.url).href,
									alt: "",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-text",
								children: t("tencentLexiang.picker.noKnowledge")
							})]
						}) : rootDocNodeState?.loading && !rootDocNodeState.loaded ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "lexiang-kb-cascade__empty lexiang-kb-cascade__empty--centered",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-text",
								children: t("tencentLexiang.picker.loading")
							})
						}) : rootDocNodeState?.error && docs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
							type: "button",
							className: "lexiang-kb-cascade__empty lexiang-kb-cascade__empty--centered lexiang-kb-cascade__empty--action",
							onClick: retryRootDocs,
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-text",
								children: t("tencentLexiang.catalog.loadFailed")
							})
						}) : docs.length === 0 && rootDocNodeState?.loaded ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "lexiang-kb-cascade__empty lexiang-kb-cascade__empty--centered",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
									src: "" + new URL("empty-CopzwuXE.svg", import.meta.url).href,
									alt: "",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
								className: "lexiang-kb-cascade__empty-text",
								children: t("tencentLexiang.picker.noContentInDir")
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(DocTreeView, {
							docs,
							getChildren: getDocChildren ?? (() => []),
							getNodeState: getDocNodeState,
							loadMoreChildren: loadMoreDocChildren,
							retryChildren: retryDocChildren,
							rootNodeState: rootDocNodeState,
							onRootLoadMore: loadMoreRootDocs,
							onRootRetry: retryRootDocs,
							selectionMode: docSelectionMode,
							selectedDocIds,
							onDocSelect: onDocClick ?? onDocSelect,
							onFolderSelect
						})
					})]
				})] })
			]
		})]
	});
}
var import_react$5, import_jsx_runtime$4, BREADCRUMB_COLLAPSE_THRESHOLD, COLUMN_MIN_WIDTH;
var init_kb_cascade_view = __esmMin((() => {
	init_kb_cascade_view$1();
	init_src();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_mcp_client();
	init_no_knowledge_base_update();
	init_team_default_icon();
	init_doc_tree_view();
	init_picker_icons();
	import_jsx_runtime$4 = require_jsx_runtime();
	BREADCRUMB_COLLAPSE_THRESHOLD = 5;
	COLUMN_MIN_WIDTH = 120;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/kb-item-row.less
var init_kb_item_row$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/kb-item-row.tsx
function getKindIcon(kind, extension) {
	if (kind === "team") return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(TeamDefaultIcon, { size: 16 });
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DocKindIcon, {
		kind,
		extension,
		size: 16,
		onlineDocSize: 20
	});
}
function isKbItem(item) {
	return !("kind" in item);
}
function formatTime(ts) {
	if (!ts) return "";
	const d = new Date(ts);
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
/**
* 渲染带高亮的文本。
*
* 优先解析后端返回的 `<em>` 标签（搜索接口开启 highlight 后标题中会含 `<em>` 标签），
* 如果文本中没有 `<em>` 标签，则 fallback 使用前端关键字分割高亮。
*/
function HighlightText({ text, keyword }) {
	if (text.includes("<em>")) {
		const emRegex = /<em>(.*?)<\/em>/g;
		const parts = [];
		let lastIndex = 0;
		let match;
		let key = 0;
		while ((match = emRegex.exec(text)) !== null) {
			if (match.index > lastIndex) parts.push(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: text.slice(lastIndex, match.index) }, key++));
			parts.push(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("mark", {
				className: "lexiang-kb-item-row__highlight",
				children: match[1]
			}, key++));
			lastIndex = match.index + match[0].length;
		}
		if (lastIndex < text.length) parts.push(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: text.slice(lastIndex) }, key++));
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_jsx_runtime$3.Fragment, { children: parts });
	}
	if (!keyword?.trim()) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_jsx_runtime$3.Fragment, { children: text });
	const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(import_jsx_runtime$3.Fragment, { children: text.split(new RegExp(`(${escaped})`, "gi")).map((part, i) => part.toLowerCase() === keyword.toLowerCase() ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("mark", {
		className: "lexiang-kb-item-row__highlight",
		children: part
	}, i) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: part }, i)) });
}
function KbItemRow({ item, selected = false, active = false, disabled = false, selectionMode = "none", showArrow = false, showSource = false, showTime = false, highlightKeyword, onClick, rightSlot, teamLabel, hoverSourceLabel, sourceLabel }) {
	const isKb = isKbItem(item);
	const docItem = isKb ? void 0 : item;
	const kbItem = isKb ? item : void 0;
	const renderIcon = () => {
		if (kbItem) {
			const rawLogo = kbItem.meta?.rawLogo;
			const logoSrc = kbItem.logoUrl || (isDirectlyUsableLogoUrl(rawLogo) ? rawLogo : void 0);
			if (logoSrc) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__icon lexiang-kb-item-row__icon--logo",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
					src: logoSrc,
					alt: "",
					referrerPolicy: "no-referrer"
				})
			});
			if (kbItem.icon) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__icon",
				children: kbItem.icon
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(KbDefaultIcon, { size: 16 })
			});
		}
		if (docItem) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
			className: "lexiang-kb-item-row__icon",
			children: docItem.icon ?? getKindIcon(docItem.kind, docItem.extension)
		});
		return null;
	};
	const sourceText = showSource && docItem ? docItem.kind === "kb" ? docItem.teamName ?? "" : docItem.teamName && docItem.kbName ? `${docItem.teamName} / ${docItem.kbName}` : docItem.kbName ?? docItem.teamName ?? "" : "";
	const renderSelector = () => {
		if (selectionMode === "none") return null;
		if (selectionMode === "radio") {
			if (selected) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__radio lexiang-kb-item-row__radio--checked",
				"aria-hidden": "true"
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__radio",
				"aria-hidden": "true"
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
			className: `lexiang-kb-item-row__checkbox${selected ? " lexiang-kb-item-row__checkbox--checked" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
				viewBox: "0 0 10 10",
				fill: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
					d: "M1.5 5.5L4 8L8.5 2",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: [
			"lexiang-kb-item-row",
			selected ? "lexiang-kb-item-row--selected" : "",
			active ? "lexiang-kb-item-row--active" : "",
			disabled ? "lexiang-kb-item-row--disabled" : ""
		].filter(Boolean).join(" "),
		onClick: disabled ? void 0 : onClick,
		children: [
			renderSelector(),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("span", {
				className: "lexiang-kb-item-row__left",
				children: [
					renderIcon(),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "lexiang-kb-item-row__name",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(HighlightText, {
							text: item.name,
							keyword: highlightKeyword
						})
					}),
					teamLabel && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "lexiang-kb-item-row__team-label",
						children: teamLabel
					}),
					hoverSourceLabel && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "lexiang-kb-item-row__hover-source",
						children: hoverSourceLabel
					})
				]
			}),
			sourceText && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__source",
				children: sourceText
			}),
			!sourceText && sourceLabel && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__source",
				children: sourceLabel
			}),
			showTime && docItem?.updatedAt && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__time",
				children: formatTime(docItem.updatedAt)
			}),
			showArrow && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "lexiang-kb-item-row__arrow",
				children: "›"
			}),
			rightSlot
		]
	});
}
var import_jsx_runtime$3;
var init_kb_item_row = __esmMin((() => {
	init_kb_item_row$1();
	require_react();
	init_mcp_client();
	init_kb_default_icon();
	init_team_default_icon();
	init_picker_icons();
	import_jsx_runtime$3 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/picker-dialog-shell.less
var init_picker_dialog_shell$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/lexiang-search-input.less
var init_lexiang_search_input$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/lexiang-search-input.tsx
function LexiangSearchInput({ value, placeholder, onChange, onClear, onFocus, onBlur }) {
	const t = useTranslation();
	const resolvedPlaceholder = placeholder ?? t("tencentLexiang.picker.search");
	const inputRef = (0, import_react$3.useRef)(null);
	const handleClear = (0, import_react$3.useCallback)(() => {
		onClear?.();
		inputRef.current?.focus();
	}, [onClear]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "lexiang-search-input",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
				className: "lexiang-search-input__icon",
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
					d: "M7 1.5a5.5 5.5 0 0 1 4.288 8.94l3.136 3.136a.6.6 0 0 1-.849.849l-3.136-3.136A5.5 5.5 0 1 1 7 1.5zM7 2.7a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6z",
					fill: "currentColor"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("input", {
				ref: inputRef,
				type: "text",
				className: "lexiang-search-input__input",
				value,
				placeholder: resolvedPlaceholder,
				onChange: (e) => onChange(e.target.value),
				onFocus,
				onBlur
			}),
			value && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				type: "button",
				className: "lexiang-search-input__clear-btn",
				onClick: handleClear,
				"aria-label": t("tencentLexiang.picker.clear"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
						fillRule: "evenodd",
						clipRule: "evenodd",
						d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646Z",
						fill: "currentColor"
					})
				})
			})
		]
	});
}
var import_react$3, import_jsx_runtime$2;
var init_lexiang_search_input = __esmMin((() => {
	init_lexiang_search_input$1();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/lexiang-tabs.less
var init_lexiang_tabs$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/lexiang-tabs.tsx
function LexiangTabs({ items, activeId, onChange }) {
	const handleClick = (0, import_react$2.useCallback)((item) => {
		if (item.disabled || item.id === activeId) return;
		onChange(item.id);
	}, [activeId, onChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "lexiang-tabs",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: [
				"lexiang-tabs__item",
				item.id === activeId ? "lexiang-tabs__item--active" : "",
				item.disabled ? "lexiang-tabs__item--disabled" : ""
			].filter(Boolean).join(" "),
			onClick: () => handleClick(item),
			disabled: item.disabled,
			children: item.label
		}, item.id))
	});
}
var import_react$2, import_jsx_runtime$1;
var init_lexiang_tabs = __esmMin((() => {
	init_lexiang_tabs$1();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/picker-dialog-shell.tsx
function PickerDialogShell({ visible, title, subtitle, tabs, activeTabId, onTabChange, searchKeyword, onSearchKeywordChange, searchPlaceholder, searchFocused, onSearchFocusChange, confirmText, cancelText, confirmDisabled = false, confirmLoading = false, footerLeft, hideFooter = false, hideToolbar = false, footerExtra, maskClosable = false, children, onClose, onConfirm, className, containerStyle, resizable = false }) {
	const t = useTranslation();
	const resolvedSearchPlaceholder = searchPlaceholder ?? t("tencentLexiang.picker.search");
	const resolvedConfirmText = confirmText ?? t("tencentLexiang.picker.confirm");
	const resolvedCancelText = cancelText ?? t("tencentLexiang.picker.cancel");
	const containerRef = (0, import_react$1.useRef)(null);
	const isResizingRef = (0, import_react$1.useRef)(false);
	const [containerWidth, setContainerWidth] = (0, import_react$1.useState)(void 0);
	const prevTabIdRef = (0, import_react$1.useRef)(activeTabId);
	const [slideDirection, setSlideDirection] = (0, import_react$1.useState)(null);
	(0, import_react$1.useEffect)(() => {
		const prevId = prevTabIdRef.current;
		if (prevId !== activeTabId && tabs.length > 1) {
			const prevIdx = tabs.findIndex((t) => t.id === prevId);
			const nextIdx = tabs.findIndex((t) => t.id === activeTabId);
			if (prevIdx !== -1 && nextIdx !== -1) setSlideDirection(nextIdx > prevIdx ? "right" : "left");
		}
		prevTabIdRef.current = activeTabId;
	}, [activeTabId, tabs]);
	(0, import_react$1.useEffect)(() => {
		if (!visible) {
			setContainerWidth(void 0);
			setSlideDirection(null);
		}
	}, [visible]);
	(0, import_react$1.useEffect)(() => {
		if (!visible) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [visible, onClose]);
	const handleOverlayClick = (0, import_react$1.useCallback)((e) => {
		if (!maskClosable || isResizingRef.current) return;
		if (!containerRef.current?.contains(e.target)) onClose();
	}, [maskClosable, onClose]);
	const handleResizeMouseDown = (0, import_react$1.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		isResizingRef.current = true;
		const startX = e.clientX;
		const startWidth = containerRef.current?.offsetWidth ?? 960;
		const maxWidth = window.innerWidth - 48;
		const onMouseMove = (ev) => {
			setContainerWidth(Math.min(maxWidth, Math.max(MIN_WIDTH, startWidth + (ev.clientX - startX) * 2)));
		};
		const onMouseUp = () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
			requestAnimationFrame(() => {
				isResizingRef.current = false;
			});
		};
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	}, []);
	if (!visible) return null;
	const mergedStyle = {
		...containerStyle,
		...containerWidth !== void 0 ? { width: containerWidth } : {}
	};
	const bodyCls = [
		"lexiang-picker-dialog__body",
		slideDirection === "right" ? "lexiang-picker-dialog__body--slide-right" : "",
		slideDirection === "left" ? "lexiang-picker-dialog__body--slide-left" : ""
	].filter(Boolean).join(" ");
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lexiang-picker-dialog-overlay",
		onClick: handleOverlayClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: containerRef,
			className: ["lexiang-picker-dialog", className ?? ""].filter(Boolean).join(" "),
			style: mergedStyle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lexiang-picker-dialog__close-btn",
					onClick: onClose,
					"aria-label": t("tencentLexiang.picker.close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 16 16",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M2.626 2.626a.6.6 0 0 1 .849 0L8 7.152l4.525-4.526a.6.6 0 0 1 .849.849L8.848 8l4.526 4.525a.6.6 0 0 1-.849.849L8 8.848l-4.525 4.526a.6.6 0 0 1-.849-.849L7.152 8 2.626 3.475a.6.6 0 0 1 0-.849z",
							fill: "currentColor"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lexiang-picker-dialog__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lexiang-picker-dialog__title",
						children: title
					}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lexiang-picker-dialog__subtitle",
						children: subtitle
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lexiang-picker-dialog__content",
					children: [!hideToolbar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lexiang-picker-dialog__toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lexiang-picker-dialog__tabs-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LexiangTabs, {
								items: tabs,
								activeId: searchKeyword.trim() ? "" : activeTabId,
								onChange: (id) => {
									if (searchKeyword.trim()) {
										onSearchKeywordChange("");
										onSearchFocusChange?.(false);
									}
									onTabChange(id);
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lexiang-picker-dialog__search-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LexiangSearchInput, {
								value: searchKeyword,
								placeholder: resolvedSearchPlaceholder,
								onChange: onSearchKeywordChange,
								onClear: () => {
									onSearchKeywordChange("");
									onSearchFocusChange?.(false);
								},
								onFocus: () => onSearchFocusChange?.(true),
								onBlur: () => {
									if (!searchKeyword.trim()) onSearchFocusChange?.(false);
								}
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: bodyCls,
						children
					}, activeTabId)]
				}),
				!hideFooter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lexiang-picker-dialog__footer",
					children: [(footerLeft || footerExtra) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lexiang-picker-dialog__footer-left",
						children: [footerLeft, footerExtra]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lexiang-picker-dialog__footer-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "lexiang-picker-dialog__cancel-btn",
							onClick: onClose,
							children: resolvedCancelText
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "lexiang-picker-dialog__confirm-btn",
							disabled: confirmDisabled || confirmLoading,
							onClick: onConfirm,
							children: confirmLoading ? "..." : resolvedConfirmText
						})]
					})]
				}),
				resizable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lexiang-picker-dialog__resize-handle",
					onMouseDown: handleResizeMouseDown
				})
			]
		})
	}), document.body);
}
var import_react$1, import_react_dom, import_jsx_runtime, MIN_WIDTH;
var init_picker_dialog_shell = __esmMin((() => {
	init_picker_dialog_shell$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_lexiang_search_input();
	init_lexiang_tabs();
	import_jsx_runtime = require_jsx_runtime();
	MIN_WIDTH = 480;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/shared/use-debounced-value.ts
/**
* 受控值防抖 hook
*
* @param value 外部值
* @param delay 防抖 ms，默认 200
*/
function useDebouncedValue(value, delay = 200) {
	const [debounced, setDebounced] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);
	return debounced;
}
var import_react;
var init_use_debounced_value = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/components/picker/merge-pinned-spaces.ts
var mergePinnedAndNormalSpaces, filterOutPinned;
var init_merge_pinned_spaces = __esmMin((() => {
	mergePinnedAndNormalSpaces = (pinned, normal) => {
		const pinnedIds = /* @__PURE__ */ new Set();
		const dedupedPinned = [];
		for (const item of pinned) {
			if (pinnedIds.has(item.id)) continue;
			pinnedIds.add(item.id);
			dedupedPinned.push(item);
		}
		const filteredNormal = normal.filter((item) => !pinnedIds.has(item.id));
		return {
			merged: [...dedupedPinned, ...filteredNormal],
			pinnedIds
		};
	};
	filterOutPinned = (items, pinnedIds) => items.filter((item) => !pinnedIds.has(item.id));
}));
//#endregion
export { useLexiangLicense as _, useDebouncedValue as a, KbItemRow as c, init_kb_cascade_view as d, DocKindIcon as f, init_use_lexiang_license as g, init_license_denied as h, init_use_debounced_value as i, init_kb_item_row as l, LexiangLicenseDeniedView as m, init_merge_pinned_spaces as n, PickerDialogShell as o, init_picker_icons as p, mergePinnedAndNormalSpaces as r, init_picker_dialog_shell as s, filterOutPinned as t, KbCascadeView as u, init_tokens as v };
