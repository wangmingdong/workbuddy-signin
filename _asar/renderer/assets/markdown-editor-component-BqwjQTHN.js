const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./equation-plugin-component-B0giiUyW.js","./chunk-BRZcfu7K.js","./dist-BfO6AyhP.js","./preload-helper-E3UYCQGP.js","./floating-ui.react-dom-Dlx505Sy.js","./react-dom-IYSM6kDg.js","./react-ierAfTWN.js","./esm-w-aC9ppW.js","./build-DXCkEJOV.js","./es2015-CLmyTLNE.js","./tslib.es6-8NkKEYUK.js","./longest-streak-DZAwMnxV.js","./zwitch-DUgkY_He.js","./stringify-entities-C5RQyvNv.js","./clsx-kwfm3TVm.js","./index.dom-Hjybw7gi.js","./decode-HthuYB5G.js","./property-information-BlPRl7pB.js","./decode-B87zreRo.css","./katex-sFwAzkhG.js","./mitt-C7Q-cPZf.js","./jsx-runtime-BNEdAQtr.js","./dist-DNjXzICC.js","./dist-CSHw4oQX.js","./dist-CDCqkvTw.css","./dist-DLhiyn8o.js","./dist-a9d7NwS-.css","./lucide-react-CmX0JwWL.js","./equation-plugin-component-reT6D2TH.css","./footnote-plugin-component-BjY_P2JD.js","./footnote-ops-Df7sU36u.js","./footnote-plugin-component-B0fC9MOB.css","./dist-6YtuqzF3.js","./mermaid.core-CucdCh_4.js","./mermaid-59c9be08-DUdjYWP7.js","./purify.es-CUVKlOTh.js","./merge-CDI2sNhv.js","./mermaid.core-Dpz8E3J4.js","./dist-DewaBQ09.js","./dist-DUFtP4fy.js","./hast-util-whitespace-C3G7AbkX.js","./dist-CVNH20o7.js","./github-light-Bl2rp99q.js","./mermaid-DrqiU3eE.js","./mermaid-plugin-component-COJIvlF1.js","./i18n-DwQDLlZq.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { t as init_dist$6 } from "./dist-CSHw4oQX.js";
import { Yr as toast, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as require_react_dom } from "./react-dom-IYSM6kDg.js";
import { Bt as Check, Dt as CodeXml, F as Pencil, _t as Ellipsis, p as Trash2, st as GitBranch, t as init_lucide_react, wt as Copy, x as Sigma, yt as Download, zt as ChevronDown } from "./lucide-react-CmX0JwWL.js";
import { Q as init_katex_min } from "./decode-HthuYB5G.js";
import { t as require_katex } from "./katex-sFwAzkhG.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-EyL4WIXZ.js";
import { A as ms, D as J$2, M as n$11, O as n$12, S as s$11, T as s$12, _ as i$17, a as r$19, at as i$14, b as f$7, c as u$10, ct as p$6, d as i$15, dt as t$11, g as t$13, h as e$14, i as r$16, it as e$9, j as ps, k as init_dist$8, l as m$4, lt as v$2, m as t$12, mt as e$11, n as r$17, nt as O$2, o as u$11, ot as d$10, p as r$15, pt as e$10, r as i$16, rt as o$10, s as r$18, st as e$12, t as init_dist$7, u as a$11, v as e$13, w as o$9, x as a$10, y as t$10 } from "./dist-BfO6AyhP.js";
import { c as a$12, i as m$5, l as init_events, o as c$12, r as r$20, t as init_dist$9, u as n$13 } from "./dist-DLhiyn8o.js";
import { a as init_i18n, f as a$13, h as n$14, i as o$12, l as init_footnote_context, m as init_events$1, n as i$18, o as o$11, r as init_footnote_ops, u as s$13 } from "./footnote-ops-Df7sU36u.js";
import { n as o$13, t as init_i18n$1 } from "./i18n-DwQDLlZq.js";
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/index.module.scss
var previewContainer, editorWrapper, editorRoot, placeholderButton, index_module_default;
var init_index_module = __esmMin((() => {
	previewContainer = "_previewContainer_ohbm6_1";
	editorWrapper = "_editorWrapper_ohbm6_8";
	editorRoot = "_editorRoot_ohbm6_16";
	placeholderButton = "_placeholderButton_ohbm6_25";
	index_module_default = {
		previewContainer,
		editorWrapper,
		editorRoot,
		placeholderButton
	};
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/empty-markdown-placeholder.tsx
function EmptyMarkdownPlaceholder() {
	const t = useTranslation();
	const editor = o$9();
	const readOnly = s$11();
	const rootId = a$10();
	const domRegistry = o$10();
	const childrenIds = r$15(rootId);
	const [portalTarget, setPortalTarget] = (0, import_react$18.useState)(null);
	(0, import_react$18.useEffect)(() => {
		setPortalTarget(domRegistry.getPageBodyEl());
	}, [domRegistry]);
	const handleClick = (0, import_react$18.useCallback)(() => {
		let newId = null;
		editor.dispatch((draft) => {
			newId = O$2.appendChildBlock(editor, draft, rootId, "text").newBlockId;
		});
		if (newId) n$11(editor, newId, 0);
	}, [editor, rootId]);
	if (childrenIds.length > 0 || readOnly || !portalTarget) return null;
	return import_react_dom$2.createPortal(/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
		type: "button",
		className: index_module_default.placeholderButton,
		contentEditable: false,
		onClick: handleClick,
		children: t("markdownEditor.emptyPlaceholder")
	}), portalTarget);
}
var import_react$18, import_react_dom$2, import_jsx_runtime$4;
var init_empty_markdown_placeholder = __esmMin((() => {
	init_dist$7();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$2 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_index_module();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/selection-quote/index.scss
var init_selection_quote$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/selection-quote/selection-deco-state.ts
/** 获取当前高亮范围（供 decorator 使用） */
function getHighlightRange() {
	return currentRange;
}
/** 获取当前高亮颜色类型（供 decorator 选择对应的 CSS class） */
function getHighlightColorType() {
	return currentColorType;
}
/** 设置高亮范围及颜色类型，同时递增 version 通知订阅者 */
function setHighlightRange(range, colorType) {
	currentRange = range;
	currentColorType = colorType || "normal";
	version$1 += 1;
	for (const cb of listeners) cb();
}
/** 获取当前版本号（供外部订阅用） */
function getHighlightVersion() {
	return version$1;
}
/** 订阅变更（返回取消订阅函数） */
function subscribeHighlight(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
/**
* 临时高亮指定范围（闪烁效果）：
* 设置高亮 → 经过 durationMs 后自动清除。
* 用于点击定位 icon 时让编辑器对应选区短暂闪烁。
*
* @param range      高亮范围
* @param durationMs 闪烁持续时长（ms）
* @param colorType  高亮颜色类型，默认 'normal'
*/
function flashHighlightRange(range, colorType, durationMs = 1500) {
	setHighlightRange(range, colorType);
	setTimeout(() => {
		setHighlightRange(null);
	}, durationMs);
}
/**
* 从当前 DOM 收集文档内所有 block 的顺序（data-block-id 属性），
* 将 LocateRange（4 元素）补全为 HighlightRange（5 元素）。
*
* 在定位命令触发时调用，而非在构造 locationData 时调用，避免把全文快照序列化进 DOM。
* 返回 null 表示起止 block 不在当前 DOM 中（文档已变更或尚未渲染）。
*/
function buildHighlightRangeFromDOM(locateRange) {
	const [startBlock, startOff, endBlock, endOff] = locateRange;
	const orderedIds = Array.from(document.querySelectorAll("[data-block-id]")).map((n) => n.getAttribute("data-block-id"));
	if (!orderedIds.includes(startBlock) || !orderedIds.includes(endBlock)) return null;
	return [
		startBlock,
		startOff,
		endBlock,
		endOff,
		orderedIds
	];
}
/**
* 从 TextSelection 构建 HighlightRange。
* 将 anchor/focus 归一化为文档顺序的 [startBlock, startOff, endBlock, endOff, orderedIds]。
*/
function toHighlightRange(sel, orderedBlockIds) {
	const { anchor, focus } = sel;
	if (anchor.blockId === focus.blockId && anchor.offset === focus.offset) return null;
	const aIdx = orderedBlockIds.indexOf(anchor.blockId);
	const fIdx = orderedBlockIds.indexOf(focus.blockId);
	if (aIdx < 0 || fIdx < 0) return null;
	const startIdx = Math.min(aIdx, fIdx);
	const endIdx = Math.max(aIdx, fIdx);
	const startOffset = aIdx <= fIdx ? anchor.offset : focus.offset;
	const endOffset = aIdx <= fIdx ? focus.offset : anchor.offset;
	return [
		orderedBlockIds[startIdx],
		startOffset,
		orderedBlockIds[endIdx],
		endOffset,
		orderedBlockIds
	];
}
var currentRange, currentColorType, version$1, listeners;
var init_selection_deco_state = __esmMin((() => {
	currentRange = null;
	currentColorType = "normal";
	version$1 = 0;
	listeners = /* @__PURE__ */ new Set();
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/selection-quote/selection-highlight.tsx
/**
* 纯函数：为单个 block 计算选区高亮 decoration。
*
* @param text    block 展平纯文本
* @param blockId 当前 block 的 ID
* @param range  归一化后的高亮范围 [startBlock, startOff, endBlock, endOff, orderedIds]
* @param decoType  decoration type，映射到 CSS class .sc-deco-{type}
* @returns 该 block 内的装饰列表（最多 1 项）
*/
function computeBlockDecoration(text, blockId, range, decoType) {
	const [startBlock, startOff, endBlock, endOff, orderedIds] = range;
	const blockIdx = orderedIds.indexOf(blockId);
	const startIdx = orderedIds.indexOf(startBlock);
	const endIdx = orderedIds.indexOf(endBlock);
	if (blockIdx < startIdx || blockIdx > endIdx) return [];
	let from;
	let to;
	if (blockIdx === startIdx && blockIdx === endIdx) {
		from = Math.min(startOff, endOff);
		to = Math.max(startOff, endOff);
	} else if (blockIdx === startIdx) {
		from = startOff;
		to = text.length;
	} else if (blockIdx === endIdx) {
		from = 0;
		to = endOff;
	} else {
		from = 0;
		to = text.length;
	}
	if (from >= to || from >= text.length) return [];
	return [{
		from,
		to: Math.min(to, text.length),
		type: decoType,
		priority: -10
	}];
}
/**
* 挂载后自动注册选区高亮装饰器。
*
* 模块级 `selection-deco-state` 负责存储当前高亮范围，
* 当 SelectionInputPopup 打开/关闭时更新。
*
* 必须在 <EditorRoot> 内部渲染（以访问 DecorationRegistry Context）。
*/
function SelectionHighlightDecorator() {
	const [highlightVersion, setHighlightVersion] = (0, import_react$17.useState)(getHighlightVersion);
	(0, import_react$17.useEffect)(() => subscribeHighlight(() => {
		setHighlightVersion(getHighlightVersion());
	}), []);
	r$16({
		id: "selection:highlight",
		scope: "all",
		deps: highlightVersion,
		decorator: (text, _tokens, ctx) => {
			const range = getHighlightRange();
			if (!range) return [];
			const decoType = getHighlightColorType() === "active" ? DECO_TYPE_ACTIVE : DECO_TYPE_NORMAL;
			return computeBlockDecoration(text, ctx.blockId, range, decoType);
		}
	});
	return null;
}
var import_react$17, DECO_TYPE_NORMAL, DECO_TYPE_ACTIVE;
var init_selection_highlight = __esmMin((() => {
	init_dist$7();
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_selection_deco_state();
	DECO_TYPE_NORMAL = "selection-highlight";
	DECO_TYPE_ACTIVE = "selection-highlight-active";
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/selection-quote/selection-quote-input-box.tsx
function SelectionQuoteInputBox({ selectedText, highlightRangeRef, onSendToChat, onInsertToInput, onClose, onMultilineChange }) {
	const t = useTranslation();
	const inputRef = (0, import_react$16.useRef)(null);
	const [showTooltip, setShowTooltip] = (0, import_react$16.useState)(false);
	(0, import_react$16.useEffect)(() => {
		const el = inputRef.current;
		if (!el) return;
		el.value = "";
		requestAnimationFrame(() => {
			el.focus();
		});
	}, []);
	const autoResize = (0, import_react$16.useCallback)(() => {
		const el = inputRef.current;
		if (!el) return;
		el.style.height = "auto";
		const lineHeight = 22;
		const maxHeight = lineHeight * 5;
		const newHeight = Math.min(el.scrollHeight, maxHeight);
		el.style.height = `${newHeight}px`;
		el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
		onMultilineChange(Math.round(el.scrollHeight / lineHeight) > 1);
	}, [onMultilineChange]);
	const getInputValue = (0, import_react$16.useCallback)(() => inputRef.current?.value ?? "", []);
	const handleSend = (0, import_react$16.useCallback)(() => {
		const value = getInputValue().trim();
		const locateRange = highlightRangeRef.current?.slice(0, 4) ?? null;
		onSendToChat?.({
			selectedText,
			message: value,
			highlightRange: locateRange
		});
		onClose();
	}, [
		getInputValue,
		selectedText,
		highlightRangeRef,
		onSendToChat,
		onClose
	]);
	const handleAdd = (0, import_react$16.useCallback)(() => {
		const value = getInputValue().trim();
		const locateRange = highlightRangeRef.current?.slice(0, 4) ?? null;
		onInsertToInput?.({
			selectedText,
			message: value,
			highlightRange: locateRange
		});
		onClose();
	}, [
		getInputValue,
		selectedText,
		highlightRangeRef,
		onInsertToInput,
		onClose
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "selection-quote-popup__container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("textarea", {
			ref: inputRef,
			defaultValue: "",
			className: "selection-quote-popup__input",
			rows: 1,
			onKeyDown: (0, import_react$16.useCallback)((e) => {
				if (e.key === "Enter" && !e.shiftKey) {
					e.preventDefault();
					if (e.metaKey || e.ctrlKey) handleSend();
					else handleAdd();
				}
				if (e.key === "Escape") {
					e.preventDefault();
					onClose();
				}
			}, [
				handleSend,
				handleAdd,
				onClose
			]),
			onMouseDown: (e) => e.stopPropagation(),
			onInput: (e) => {
				autoResize();
			},
			placeholder: t("markdownEditor.selectionQuote.inputPlaceholder")
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "selection-quote-popup__submit-wrap",
			onMouseEnter: () => setShowTooltip(true),
			onMouseLeave: () => setShowTooltip(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
				type: "button",
				className: "selection-quote-popup__submit-btn selection-quote-popup__submit-btn--active",
				onMouseDown: (e) => e.preventDefault(),
				onClick: handleAdd,
				"aria-label": t("markdownEditor.selectionQuote.send"),
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
					width: "16",
					height: "16",
					viewBox: "0 0 16 16",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
						fill: "currentColor",
						transform: "matrix(1 0 0 1 2.75586 3.64697)",
						d: "M1.1106 3.979L3.8252 5.7221C4.0099 5.8408 4.2504 5.825 4.4181 5.6833L10.7711 0.3148C10.9784 0.1397 11.2875 0.1619 11.4677 0.3647C11.6368 0.5552 11.7034 0.9185 11.5329 1.1077L5.1776 8.1579C4.7957 8.5816 4.1371 8.6004 3.7316 8.1992L0.367 4.8706C0.1663 4.672 0.1697 4.3466 0.3747 4.1523L0.4965 4.0369C0.6635 3.8786 0.917 3.8547 1.1106 3.979Z"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: `selection-quote-popup__tooltip${showTooltip ? " selection-quote-popup__tooltip--visible" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "selection-quote-popup__tooltip-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "selection-quote-popup__tooltip-label",
						children: t("markdownEditor.selectionQuote.tooltipAdd")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("kbd", {
						className: "selection-quote-popup__tooltip-kbd",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(EnterSvg, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "selection-quote-popup__tooltip-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "selection-quote-popup__tooltip-label",
						children: t("markdownEditor.selectionQuote.tooltipSend")
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
						className: "selection-quote-popup__tooltip-kbd-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("kbd", {
							className: "selection-quote-popup__tooltip-kbd",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
								width: "10",
								height: "10",
								viewBox: "0 0 10 10",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
									fill: "currentColor",
									fillOpacity: "0.5",
									transform: "matrix(1 0 0 1 0.415719 0.416451)",
									d: "M2.6903 3.1061L1.553 3.1061Q0.9097 3.1061 0.4549 2.6512Q0 2.1963 0 1.553Q0 0.9097 0.4549 0.4549Q0.9097 0 1.553 0Q2.1963 0 2.6512 0.4549Q3.1061 0.9097 3.1061 1.553L3.1061 2.6899L6.0606 2.6899L6.0606 1.553Q6.0605 0.9097 6.5154 0.4549Q6.9703 0 7.6136 0Q8.2569 0 8.7117 0.4549Q9.1666 0.9097 9.1666 1.553Q9.1666 2.1963 8.7117 2.6512Q8.2569 3.1061 7.6136 3.1061L6.4782 3.1061L6.4782 6.0606L7.6136 6.0606Q8.2569 6.0605 8.7117 6.5154Q9.1666 6.9703 9.1666 7.6136Q9.1666 8.2569 8.7117 8.7117Q8.2569 9.1666 7.6136 9.1666Q6.9703 9.1666 6.5154 8.7117Q6.0605 8.2569 6.0606 7.6136L6.0606 6.4777L3.1061 6.4777L3.1061 7.6136Q3.1061 8.2569 2.6512 8.7117Q2.1963 9.1666 1.553 9.1666Q0.9097 9.1666 0.4549 8.7117Q0 8.2569 0 7.6136Q0 6.9703 0.4549 6.5154Q0.9097 6.0605 1.553 6.0606L2.6903 6.0606L2.6903 3.1061ZM2.2727 2.2727L2.2727 1.553Q2.2727 1.2549 2.0619 1.0441Q1.8511 0.8333 1.553 0.8333Q1.2549 0.8333 1.0441 1.0441Q0.8333 1.2549 0.8333 1.553Q0.8333 1.8511 1.0441 2.0619Q1.2549 2.2727 1.553 2.2727L2.2727 2.2727ZM6.8939 2.2727L7.6136 2.2727Q7.9117 2.2727 8.1225 2.0619Q8.3333 1.8511 8.3333 1.553Q8.3333 1.2549 8.1225 1.0441Q7.9117 0.8333 7.6136 0.8333Q7.3155 0.8333 7.1047 1.0441Q6.8939 1.2549 6.8939 1.553L6.8939 2.2727ZM3.5237 3.5232L3.5237 5.6444L5.6449 5.6444L5.6449 3.5232L3.5237 3.5232ZM2.2727 6.8939L1.553 6.8939Q1.2549 6.8939 1.0441 7.1047Q0.8333 7.3155 0.8333 7.6136Q0.8333 7.9117 1.0441 8.1225Q1.2549 8.3333 1.553 8.3333Q1.8511 8.3333 2.0619 8.1225Q2.2727 7.9117 2.2727 7.6136L2.2727 6.8939ZM8.3333 7.6136Q8.3333 7.3155 8.1225 7.1047Q7.9117 6.8939 7.6136 6.8939L6.8939 6.8939L6.8939 7.6136Q6.8939 7.9117 7.1047 8.1225Q7.3155 8.3333 7.6136 8.3333Q7.9117 8.3333 8.1225 8.1225Q8.3333 7.9117 8.3333 7.6136Z",
									fillRule: "evenodd"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("kbd", {
							className: "selection-quote-popup__tooltip-kbd",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(EnterSvg, {})
						})]
					})]
				})]
			})]
		})]
	});
}
var import_react$16, import_jsx_runtime$3, EnterSvg;
var init_selection_quote_input_box = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$3 = require_jsx_runtime();
	EnterSvg = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
		width: "10",
		height: "10",
		viewBox: "0 0 10 10",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
			fill: "currentColor",
			fillOpacity: "0.5",
			transform: "matrix(1 0 0 1 0.720703 1.75244)",
			d: "M0.9461 5.064L2.8257 7.1796L2.1903 7.7441L-0.3177 4.9213Q-0.4291 4.8017 -0.425 4.6383Q-0.4285 4.4749 -0.3167 4.3557L2.1913 1.5525L2.8247 2.1192L0.9505 4.214L7.5579 4.214Q7.796 4.214 7.9645 4.0456Q8.1329 3.8772 8.1329 3.639L8.1327 1Q8.1327 0.7618 7.9643 0.5934Q7.7958 0.425 7.5577 0.425L4.918 0.425L4.918 -0.425L7.5577 -0.425Q8.1479 -0.425 8.5653 -0.0077Q8.9826 0.4097 8.9827 0.9999L8.9828 3.6389Q8.9829 4.2292 8.5655 4.6466Q8.1481 5.064 7.5579 5.064L0.9461 5.064Z",
			fillRule: "evenodd"
		})
	});
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/selection-quote/selection-quote-popover.tsx
/** 判断文本选区是否折叠（光标状态） */
function isTextSelectionCollapsed(sel) {
	return sel.anchor.blockId === sel.focus.blockId && sel.anchor.offset === sel.focus.offset;
}
/**
* 获取当前浏览器选区的 BoundingRect（视口坐标）。
* 返回 null 表示当前没有有效的非折叠 DOM 选区。
*/
function getSelectionBoundingRect() {
	const sel = window.getSelection();
	if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
	const r = sel.getRangeAt(0).getBoundingClientRect();
	if (r.width === 0 && r.height === 0) return null;
	return {
		top: r.top,
		left: r.left,
		right: r.right,
		bottom: r.bottom
	};
}
/**
* 获取选区末尾的视口位置。
*/
function getSelectionEndRect() {
	const sel = window.getSelection();
	if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
	const rects = sel.getRangeAt(0).getClientRects();
	if (rects.length === 0) return null;
	const lastRect = rects[rects.length - 1];
	return {
		top: lastRect.top,
		left: lastRect.left,
		right: lastRect.right,
		bottom: lastRect.bottom
	};
}
/**
* 划选文字后的两阶段交互：
*
* 1. **批注触发按钮**：选区稳定后，在选区末尾右侧悬浮显示"批注"胶囊按钮。
* 2. **输入框**：点击批注按钮后，在选区下方弹出输入框（见 SelectionQuoteInputBox）。
*
* ## 定位策略
* - 触发按钮：挂载到内容覆盖层（absolute 坐标，随内容滚动）。
* - 输入框：useOverlayPosition 计算 absolute 坐标。
*
* ## 生命周期
* - 选区稳定（非折叠 + 经历过拖选过程）→ 显示触发按钮
* - 点击触发按钮 → 切换到输入框
* - 选区折叠 / 变为非文本类型 → 关闭（触发按钮阶段时关闭）
* - Escape / 成功发送 → 关闭
*/
function SelectionQuotePopup({ onSendToChat, onInsertToInput }) {
	const t = useTranslation();
	const editor = o$9();
	const { selection: settledSelection, isSelecting } = r$17();
	const [realtimeSelection] = s$12();
	const domRegistry = o$10();
	/** 当前阶段：null=隐藏 / 'trigger'=批注按钮 / 'input'=输入框 */
	const [phase, setPhase] = (0, import_react$15.useState)(null);
	const [anchorRect, setAnchorRect] = (0, import_react$15.useState)(null);
	const [selectedText, setSelectedText] = (0, import_react$15.useState)("");
	const [isMultiline, setIsMultiline] = (0, import_react$15.useState)(false);
	const currentHighlightRangeRef = (0, import_react$15.useRef)(null);
	const portalTarget = domRegistry.contentOverlayRef.current;
	const orderedBlockIds = (0, import_react$15.useMemo)(() => {
		const roots = editor.recordView.roots();
		if (roots.length === 0) return [];
		return editor.recordView.iterateSubtreeIds(roots[0]);
	}, [editor.recordView]);
	(0, import_react$15.useEffect)(() => {
		if (isSelecting) return;
		if (!settledSelection || settledSelection.type !== "text") return;
		if (isTextSelectionCollapsed(settledSelection)) return;
		const text = n$12(editor);
		if (!text) return;
		const selRect = getSelectionBoundingRect();
		if (!selRect) return;
		const endRect = getSelectionEndRect();
		setSelectedText(text);
		setAnchorRect(endRect ?? selRect);
		setPhase("trigger");
		currentHighlightRangeRef.current = toHighlightRange(settledSelection, orderedBlockIds);
	}, [
		editor,
		settledSelection,
		isSelecting,
		orderedBlockIds
	]);
	(0, import_react$15.useEffect)(() => {
		if (phase !== "trigger" && phase !== "input") return;
		if (realtimeSelection === null) return;
		if (realtimeSelection.type !== "text") {
			setPhase(null);
			return;
		}
		if (isTextSelectionCollapsed(realtimeSelection)) setPhase(null);
	}, [phase, realtimeSelection]);
	const triggerBtnRef = (0, import_react$15.useRef)(null);
	const popoverRef = (0, import_react$15.useRef)(null);
	(0, import_react$15.useEffect)(() => {
		if (!phase || !portalTarget) return;
		if (!portalTarget.parentElement) return;
		const handleMouseDown = (e) => {
			const target = e.target;
			if (triggerBtnRef.current?.contains(target)) return;
			if (popoverRef.current?.contains(target)) return;
			setPhase(null);
		};
		document.addEventListener("mousedown", handleMouseDown, true);
		return () => document.removeEventListener("mousedown", handleMouseDown, true);
	}, [phase, portalTarget]);
	const closePopup = (0, import_react$15.useCallback)(() => {
		setPhase(null);
		setAnchorRect(null);
		currentHighlightRangeRef.current = null;
	}, []);
	(0, import_react$15.useEffect)(() => {
		if (!phase) setHighlightRange(null);
	}, [phase]);
	const handleTriggerActivate = (0, import_react$15.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (currentHighlightRangeRef.current) setHighlightRange(currentHighlightRangeRef.current);
		setPhase("input");
	}, []);
	if (!phase || !portalTarget) return null;
	const containerRect = portalTarget.getBoundingClientRect();
	const calcTop = anchorRect ? anchorRect.bottom - containerRect.top + 4 : 0;
	const calcLeft = anchorRect ? anchorRect.right - containerRect.left : 0;
	if (phase === "trigger") {
		const containerRect = portalTarget.getBoundingClientRect();
		const maxBtnLeft = Math.max(0, containerRect.width - 100);
		return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", {
			ref: triggerBtnRef,
			type: "button",
			className: "selection-quote-trigger",
			style: {
				position: "absolute",
				top: calcTop,
				left: Math.max(0, Math.min(calcLeft, maxBtnLeft)),
				zIndex: 50,
				pointerEvents: "auto"
			},
			onMouseDown: handleTriggerActivate,
			"aria-label": t("markdownEditor.selectionQuote.aiEdit"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
				className: "selection-quote-trigger__icon",
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
					fill: "currentColor",
					fillOpacity: "0.9",
					transform: "matrix(1 0 0 1 8.44751 0.0244669)",
					d: "M3.66 3.65L3.66 6L2.36 6L2.36 3.65L0 3.65L0 2.35L2.36 2.35L2.36 0L3.66 0L3.66 2.35L6.02 2.35L6.02 3.65L3.66 3.65Z"
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
					fill: "currentColor",
					fillOpacity: "0.9",
					transform: "matrix(1 0 0 1 -4.72069e-05 0.000653565)",
					d: "M7.6367 1.2495L7.6367 0.0001L7.6116 0.0001L7.3584 0L7.2515 0.0001L7.1438 0C6.0403 -0.0008 5.1658 0.056 4.5205 0.1704C3.2622 0.3936 2.2778 0.8604 1.5679 1.5709C0.5227 2.617 0 4.1951 0 6.3054C0 8.4148 0.5227 9.9926 1.5679 11.0389C2.322 11.7936 3.3528 12.2739 4.6597 12.4795L4.6846 12.4834L4.7822 11.8659L4.8787 11.2484L4.854 11.2445C3.8147 11.0811 3.0139 10.7183 2.4519 10.1558C1.6501 9.3533 1.2493 8.0698 1.2493 6.3054C1.2493 4.5409 1.6501 3.2574 2.4519 2.4548C2.9766 1.9298 3.739 1.5786 4.7393 1.4012C5.3127 1.2996 6.1238 1.249 7.1729 1.2493L7.3303 1.2493L7.6367 1.2495ZM14.4934 6.861L13.2429 6.861L13.2417 6.8848C13.1768 8.3361 12.78 9.4264 12.0513 10.1558C11.5381 10.6693 10.8298 11.0159 9.9263 11.1959C9.3613 11.3084 8.5723 11.3632 7.5593 11.3604C6.9595 11.359 6.3547 11.6506 5.7451 12.2355C5.3098 12.6531 4.8474 13.2467 4.3574 14.0165L4.344 14.0377L5.3989 14.709L5.4124 14.6879C5.8484 14.0028 6.2478 13.4862 6.6106 13.1378C6.9778 12.7857 7.293 12.6099 7.5562 12.6106C8.6511 12.6137 9.5225 12.5507 10.1704 12.4216C11.3215 12.1925 12.2432 11.7316 12.9353 11.0389C13.9016 10.0715 14.4207 8.6875 14.4922 6.887L14.4934 6.861Z"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "selection-quote-trigger__label",
				children: t("markdownEditor.selectionQuote.aiEdit")
			})]
		}), portalTarget);
	}
	const POPOVER_FIXED_WIDTH = 320;
	const maxPopoverLeft = Math.max(0, containerRect.width - POPOVER_FIXED_WIDTH);
	return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		ref: popoverRef,
		className: isMultiline ? "selection-quote-popup--multiline" : void 0,
		style: {
			position: "absolute",
			top: calcTop,
			left: Math.max(0, Math.min(calcLeft, maxPopoverLeft)),
			width: POPOVER_FIXED_WIDTH,
			zIndex: 50,
			pointerEvents: "auto"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SelectionQuoteInputBox, {
			selectedText,
			highlightRangeRef: currentHighlightRangeRef,
			onSendToChat,
			onInsertToInput,
			onClose: closePopup,
			onMultilineChange: setIsMultiline
		})
	}), portalTarget);
}
var import_react$15, import_react_dom$1, import_jsx_runtime$2;
var init_selection_quote_popover = __esmMin((() => {
	init_dist$7();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_useI18n();
	init_selection_deco_state();
	init_selection_quote_input_box();
	import_jsx_runtime$2 = require_jsx_runtime();
})), import_jsx_runtime$1, SelectionQuote;
var init_selection_quote = __esmMin((() => {
	init_selection_quote$1();
	require_react();
	init_selection_highlight();
	init_selection_quote_popover();
	import_jsx_runtime$1 = require_jsx_runtime();
	SelectionQuote = ({ onSendSelectionQuoteToChat, onInsertSelectionQuoteToInput }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SelectionHighlightDecorator, {}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SelectionQuotePopup, {
		onSendToChat: onSendSelectionQuoteToChat,
		onInsertToInput: onInsertSelectionQuoteToInput
	})] });
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-editor/dist/presets/markdown-mode/index.less
var init_markdown_mode = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/katex/dist/katex.mjs
/**
* Escapes text to prevent scripting attacks.
*/
function escape(text) {
	return String(text).replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function getDefaultValue(schema) {
	if (schema.default) return schema.default;
	var type = schema.type;
	var defaultType = Array.isArray(type) ? type[0] : type;
	if (typeof defaultType !== "string") return defaultType.enum[0];
	switch (defaultType) {
		case "boolean": return false;
		case "string": return "";
		case "number": return 0;
		case "object": return {};
	}
}
/**
* Given a codepoint, return the name of the script or script family
* it is from, or null if it is not part of a known block
*/
function scriptFromCodepoint(codepoint) {
	for (var i = 0; i < scriptData.length; i++) {
		var script = scriptData[i];
		for (var _i = 0; _i < script.blocks.length; _i++) {
			var block = script.blocks[_i];
			if (codepoint >= block[0] && codepoint <= block[1]) return script.name;
		}
	}
	return null;
}
/**
* Given a codepoint, return true if it falls within one of the
* scripts or script families defined above and false otherwise.
*
* Micro benchmarks shows that this is faster than
* /[\u3000-\u30FF\u4E00-\u9FAF\uFF00-\uFF60\uAC00-\uD7AF\u0900-\u109F]/.test()
* in Firefox, Chrome and Node.
*/
function supportedCodepoint(codepoint) {
	for (var i = 0; i < allBlocks.length; i += 2) if (codepoint >= allBlocks[i] && codepoint <= allBlocks[i + 1]) return true;
	return false;
}
/**
* This function adds new font metrics to default metricMap
* It can also override existing metrics
*/
function setFontMetrics(fontName, metrics) {
	fontMetricsData[fontName] = metrics;
}
/**
* This function is a convenience function for looking up information in the
* metricMap table. It takes a character as a string, and a font.
*
* Note: the `width` property may be undefined if fontMetricsData.js wasn't
* built using `Make extended_metrics`.
*/
function getCharacterMetrics(character, font, mode) {
	if (!fontMetricsData[font]) throw new Error("Font metrics not found for font: " + font + ".");
	var ch = character.charCodeAt(0);
	var metrics = fontMetricsData[font][ch];
	if (!metrics && character[0] in extraCharacterMap) {
		ch = extraCharacterMap[character[0]].charCodeAt(0);
		metrics = fontMetricsData[font][ch];
	}
	if (!metrics && mode === "text") {
		if (supportedCodepoint(ch)) metrics = fontMetricsData[font][77];
	}
	if (metrics) return {
		depth: metrics[0],
		height: metrics[1],
		italic: metrics[2],
		skew: metrics[3],
		width: metrics[4]
	};
}
/**
* Get the font metrics for a given size.
*/
function getGlobalMetrics(size) {
	var sizeIndex;
	if (size >= 5) sizeIndex = 0;
	else if (size >= 3) sizeIndex = 1;
	else sizeIndex = 2;
	if (!fontMetricsBySizeIndex[sizeIndex]) {
		var metrics = fontMetricsBySizeIndex[sizeIndex] = { cssEmPerMu: sigmasAndXis.quad[sizeIndex] / 18 };
		for (var key in sigmasAndXis) if (sigmasAndXis.hasOwnProperty(key)) metrics[key] = sigmasAndXis[key][sizeIndex];
	}
	return fontMetricsBySizeIndex[sizeIndex];
}
function assertSymbolDomNode(group) {
	if (group instanceof SymbolNode) return group;
	else throw new Error("Expected symbolNode but got " + String(group) + ".");
}
function assertSpan(group) {
	if (group instanceof Span) return group;
	else throw new Error("Expected span<HtmlDomNode> but got " + String(group) + ".");
}
/** `acceptUnicodeChar = true` is only applicable if `replace` is set. */
function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
	symbols[mode][name] = {
		font,
		group,
		replace
	};
	if (acceptUnicodeChar && replace) symbols[mode][replace] = symbols[mode][name];
}
function defineFunction(_ref) {
	var { type, names, props, handler, htmlBuilder, mathmlBuilder } = _ref;
	var data = {
		type,
		numArgs: props.numArgs,
		argTypes: props.argTypes,
		allowedInArgument: !!props.allowedInArgument,
		allowedInText: !!props.allowedInText,
		allowedInMath: props.allowedInMath === void 0 ? true : props.allowedInMath,
		numOptionalArgs: props.numOptionalArgs || 0,
		infix: !!props.infix,
		primitive: !!props.primitive,
		handler
	};
	for (var i = 0; i < names.length; ++i) _functions[names[i]] = data;
	if (type) {
		if (htmlBuilder) _htmlGroupBuilders[type] = htmlBuilder;
		if (mathmlBuilder) _mathmlGroupBuilders[type] = mathmlBuilder;
	}
}
/**
* Use this to register only the HTML and MathML builders for a function (e.g.
* if the function's ParseNode is generated in Parser.js rather than via a
* stand-alone handler provided to `defineFunction`).
*/
function defineFunctionBuilders(_ref2) {
	var { type, htmlBuilder, mathmlBuilder } = _ref2;
	defineFunction({
		type,
		names: [],
		props: { numArgs: 0 },
		handler() {
			throw new Error("Should never be called.");
		},
		htmlBuilder,
		mathmlBuilder
	});
}
/**
* Combine an array of HTML DOM nodes (e.g., the output of `buildExpression`)
* into an unbreakable HTML node of class .base, with proper struts to
* guarantee correct vertical extent.  `buildHTML` calls this repeatedly to
* make up the entire expression as a sequence of unbreakable units.
*/
function buildHTMLUnbreakable(children, options) {
	var body = makeSpan$1(["base"], children, options);
	var strut = makeSpan$1(["strut"]);
	strut.style.height = makeEm(body.height + body.depth);
	if (body.depth) strut.style.verticalAlign = makeEm(-body.depth);
	body.children.unshift(strut);
	return body;
}
/**
* Take an entire parse tree, and build it into an appropriate set of HTML
* nodes.
*/
function buildHTML(tree, options) {
	var tag = null;
	if (tree.length === 1 && tree[0].type === "tag") {
		tag = tree[0].tag;
		tree = tree[0].body;
	}
	var expression = buildExpression$1(tree, options, "root");
	var eqnNum;
	if (expression.length === 2 && expression[1].hasClass("tag")) eqnNum = expression.pop();
	var children = [];
	var parts = [];
	for (var i = 0; i < expression.length; i++) {
		parts.push(expression[i]);
		if (expression[i].hasClass("mbin") || expression[i].hasClass("mrel") || expression[i].hasClass("allowbreak")) {
			var nobreak = false;
			while (i < expression.length - 1 && expression[i + 1].hasClass("mspace") && !expression[i + 1].hasClass("newline")) {
				i++;
				parts.push(expression[i]);
				if (expression[i].hasClass("nobreak")) nobreak = true;
			}
			if (!nobreak) {
				children.push(buildHTMLUnbreakable(parts, options));
				parts = [];
			}
		} else if (expression[i].hasClass("newline")) {
			parts.pop();
			if (parts.length > 0) {
				children.push(buildHTMLUnbreakable(parts, options));
				parts = [];
			}
			children.push(expression[i]);
		}
	}
	if (parts.length > 0) children.push(buildHTMLUnbreakable(parts, options));
	var tagChild;
	if (tag) {
		tagChild = buildHTMLUnbreakable(buildExpression$1(tag, options, true));
		tagChild.classes = ["tag"];
		children.push(tagChild);
	} else if (eqnNum) children.push(eqnNum);
	var htmlNode = makeSpan$1(["katex-html"], children);
	htmlNode.setAttribute("aria-hidden", "true");
	if (tagChild) {
		var strut = tagChild.children[0];
		strut.style.height = makeEm(htmlNode.height + htmlNode.depth);
		if (htmlNode.depth) strut.style.verticalAlign = makeEm(-htmlNode.depth);
	}
	return htmlNode;
}
/**
* These objects store data about MathML nodes. This is the MathML equivalent
* of the types in domTree.js. Since MathML handles its own rendering, and
* since we're mainly using MathML to improve accessibility, we don't manage
* any of the styling state that the plain DOM nodes do.
*
* The `toNode` and `toMarkup` functions work similarly to how they do in
* domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
*/
function newDocumentFragment(children) {
	return new DocumentFragment(children);
}
/**
* Check for <mi>.</mi> which is how a dot renders in MathML,
* or <mo separator="true" lspace="0em" rspace="0em">,</mo>
* which is how a braced comma {,} renders in MathML
*/
function isNumberPunctuation(group) {
	if (!group) return false;
	if (group.type === "mi" && group.children.length === 1) {
		var child = group.children[0];
		return child instanceof TextNode && child.text === ".";
	} else if (group.type === "mo" && group.children.length === 1 && group.getAttribute("separator") === "true" && group.getAttribute("lspace") === "0em" && group.getAttribute("rspace") === "0em") {
		var _child = group.children[0];
		return _child instanceof TextNode && _child.text === ",";
	} else return false;
}
/**
* Takes a full parse tree and settings and builds a MathML representation of
* it. In particular, we put the elements from building the parse tree into a
* <semantics> tag so we can also include that TeX source as an annotation.
*
* Note that we actually return a domTree element with a `<math>` inside it so
* we can do appropriate styling.
*/
function buildMathML(tree, texExpression, options, isDisplayMode, forMathmlOnly) {
	var expression = buildExpression(tree, options);
	var wrapper;
	if (expression.length === 1 && expression[0] instanceof MathNode && ["mrow", "mtable"].includes(expression[0].type)) wrapper = expression[0];
	else wrapper = new mathMLTree.MathNode("mrow", expression);
	var annotation = new mathMLTree.MathNode("annotation", [new mathMLTree.TextNode(texExpression)]);
	annotation.setAttribute("encoding", "application/x-tex");
	var semantics = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
	var math = new mathMLTree.MathNode("math", [semantics]);
	math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
	if (isDisplayMode) math.setAttribute("display", "block");
	var wrapperClass = forMathmlOnly ? "katex" : "katex-mathml";
	return buildCommon.makeSpan([wrapperClass], [math]);
}
/**
* Asserts that the node is of the given type and returns it with stricter
* typing. Throws if the node's type does not match.
*/
function assertNodeType(node, type) {
	if (!node || node.type !== type) throw new Error("Expected node of type " + type + ", but got " + (node ? "node of type " + node.type : String(node)));
	return node;
}
/**
* Returns the node more strictly typed iff it is of the given type. Otherwise,
* returns null.
*/
function assertSymbolNodeType(node) {
	var typedNode = checkSymbolNodeType(node);
	if (!typedNode) throw new Error("Expected node of symbol group type, but got " + (node ? "node of type " + node.type : String(node)));
	return typedNode;
}
/**
* Returns the node more strictly typed iff it is of the given type. Otherwise,
* returns null.
*/
function checkSymbolNodeType(node) {
	if (node && (node.type === "atom" || NON_ATOMS.hasOwnProperty(node.type))) return node;
	return null;
}
function htmlBuilder$9(group, options) {
	var elements = buildExpression$1(group.body, options, true);
	return makeSpan([group.mclass], elements, options);
}
function mathmlBuilder$8(group, options) {
	var node;
	var inner = buildExpression(group.body, options);
	if (group.mclass === "minner") node = new mathMLTree.MathNode("mpadded", inner);
	else if (group.mclass === "mord") if (group.isCharacterBox) {
		node = inner[0];
		node.type = "mi";
	} else node = new mathMLTree.MathNode("mi", inner);
	else {
		if (group.isCharacterBox) {
			node = inner[0];
			node.type = "mo";
		} else node = new mathMLTree.MathNode("mo", inner);
		if (group.mclass === "mbin") {
			node.attributes.lspace = "0.22em";
			node.attributes.rspace = "0.22em";
		} else if (group.mclass === "mpunct") {
			node.attributes.lspace = "0em";
			node.attributes.rspace = "0.17em";
		} else if (group.mclass === "mopen" || group.mclass === "mclose") {
			node.attributes.lspace = "0em";
			node.attributes.rspace = "0em";
		} else if (group.mclass === "minner") {
			node.attributes.lspace = "0.0556em";
			node.attributes.width = "+0.1111em";
		}
	}
	return node;
}
function cdArrow(arrowChar, labels, parser) {
	var funcName = cdArrowFunctionName[arrowChar];
	switch (funcName) {
		case "\\\\cdrightarrow":
		case "\\\\cdleftarrow": return parser.callFunction(funcName, [labels[0]], [labels[1]]);
		case "\\uparrow":
		case "\\downarrow":
			var leftLabel = parser.callFunction("\\\\cdleft", [labels[0]], []);
			var bareArrow = {
				type: "atom",
				text: funcName,
				mode: "math",
				family: "rel"
			};
			var arrowGroup = {
				type: "ordgroup",
				mode: "math",
				body: [
					leftLabel,
					parser.callFunction("\\Big", [bareArrow], []),
					parser.callFunction("\\\\cdright", [labels[1]], [])
				]
			};
			return parser.callFunction("\\\\cdparent", [arrowGroup], []);
		case "\\\\cdlongequal": return parser.callFunction("\\\\cdlongequal", [], []);
		case "\\Vert": return parser.callFunction("\\Big", [{
			type: "textord",
			text: "\\Vert",
			mode: "math"
		}], []);
		default: return {
			type: "textord",
			text: " ",
			mode: "math"
		};
	}
}
function parseCD(parser) {
	var parsedRows = [];
	parser.gullet.beginGroup();
	parser.gullet.macros.set("\\cr", "\\\\\\relax");
	parser.gullet.beginGroup();
	while (true) {
		parsedRows.push(parser.parseExpression(false, "\\\\"));
		parser.gullet.endGroup();
		parser.gullet.beginGroup();
		var next = parser.fetch().text;
		if (next === "&" || next === "\\\\") parser.consume();
		else if (next === "\\end") {
			if (parsedRows[parsedRows.length - 1].length === 0) parsedRows.pop();
			break;
		} else throw new ParseError("Expected \\\\ or \\cr or \\end", parser.nextToken);
	}
	var row = [];
	var body = [row];
	for (var i = 0; i < parsedRows.length; i++) {
		var rowNodes = parsedRows[i];
		var cell = newCell();
		for (var j = 0; j < rowNodes.length; j++) if (!isStartOfArrow(rowNodes[j])) cell.body.push(rowNodes[j]);
		else {
			row.push(cell);
			j += 1;
			var arrowChar = assertSymbolNodeType(rowNodes[j]).text;
			var labels = new Array(2);
			labels[0] = {
				type: "ordgroup",
				mode: "math",
				body: []
			};
			labels[1] = {
				type: "ordgroup",
				mode: "math",
				body: []
			};
			if ("=|.".indexOf(arrowChar) > -1);
			else if ("<>AV".indexOf(arrowChar) > -1) for (var labelNum = 0; labelNum < 2; labelNum++) {
				var inLabel = true;
				for (var k = j + 1; k < rowNodes.length; k++) {
					if (isLabelEnd(rowNodes[k], arrowChar)) {
						inLabel = false;
						j = k;
						break;
					}
					if (isStartOfArrow(rowNodes[k])) throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[k]);
					labels[labelNum].body.push(rowNodes[k]);
				}
				if (inLabel) throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[j]);
			}
			else throw new ParseError("Expected one of \"<>AV=|.\" after @", rowNodes[j]);
			var wrappedArrow = {
				type: "styling",
				body: [cdArrow(arrowChar, labels, parser)],
				mode: "math",
				style: "display"
			};
			row.push(wrappedArrow);
			cell = newCell();
		}
		if (i % 2 === 0) row.push(cell);
		else row.shift();
		row = [];
		body.push(row);
	}
	parser.gullet.endGroup();
	parser.gullet.endGroup();
	return {
		type: "array",
		mode: "math",
		body,
		arraystretch: 1,
		addJot: true,
		rowGaps: [null],
		cols: new Array(body[0].length).fill({
			type: "align",
			align: "c",
			pregap: .25,
			postgap: .25
		}),
		colSeparationType: "CD",
		hLinesBeforeRow: new Array(body.length + 1).fill([])
	};
}
function checkDelimiter(delim, context) {
	var symDelim = checkSymbolNodeType(delim);
	if (symDelim && delimiters.includes(symDelim.text)) return symDelim;
	else if (symDelim) throw new ParseError("Invalid delimiter '" + symDelim.text + "' after '" + context.funcName + "'", delim);
	else throw new ParseError("Invalid delimiter type '" + delim.type + "'", delim);
}
function assertParsed(group) {
	if (!group.body) throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
function defineEnvironment(_ref) {
	var { type, names, props, handler, htmlBuilder, mathmlBuilder } = _ref;
	var data = {
		type,
		numArgs: props.numArgs || 0,
		allowedInText: false,
		numOptionalArgs: 0,
		handler
	};
	for (var i = 0; i < names.length; ++i) _environments[names[i]] = data;
	if (htmlBuilder) _htmlGroupBuilders[type] = htmlBuilder;
	if (mathmlBuilder) _mathmlGroupBuilders[type] = mathmlBuilder;
}
function defineMacro(name, body) {
	_macros[name] = body;
}
function getHLines(parser) {
	var hlineInfo = [];
	parser.consumeSpaces();
	var nxt = parser.fetch().text;
	if (nxt === "\\relax") {
		parser.consume();
		parser.consumeSpaces();
		nxt = parser.fetch().text;
	}
	while (nxt === "\\hline" || nxt === "\\hdashline") {
		parser.consume();
		hlineInfo.push(nxt === "\\hdashline");
		parser.consumeSpaces();
		nxt = parser.fetch().text;
	}
	return hlineInfo;
}
function getAutoTag(name) {
	if (name.indexOf("ed") === -1) return name.indexOf("*") === -1;
}
/**
* Parse the body of the environment, with rows delimited by \\ and
* columns delimited by &, and create a nested list in row-major order
* with one group per cell.  If given an optional argument style
* ("text", "display", etc.), then each cell is cast into that style.
*/
function parseArray(parser, _ref, style) {
	var { hskipBeforeAndAfter, addJot, cols, arraystretch, colSeparationType, autoTag, singleRow, emptySingleRow, maxNumCols, leqno } = _ref;
	parser.gullet.beginGroup();
	if (!singleRow) parser.gullet.macros.set("\\cr", "\\\\\\relax");
	if (!arraystretch) {
		var stretch = parser.gullet.expandMacroAsText("\\arraystretch");
		if (stretch == null) arraystretch = 1;
		else {
			arraystretch = parseFloat(stretch);
			if (!arraystretch || arraystretch < 0) throw new ParseError("Invalid \\arraystretch: " + stretch);
		}
	}
	parser.gullet.beginGroup();
	var row = [];
	var body = [row];
	var rowGaps = [];
	var hLinesBeforeRow = [];
	var tags = autoTag != null ? [] : void 0;
	function beginRow() {
		if (autoTag) parser.gullet.macros.set("\\@eqnsw", "1", true);
	}
	function endRow() {
		if (tags) if (parser.gullet.macros.get("\\df@tag")) {
			tags.push(parser.subparse([new Token("\\df@tag")]));
			parser.gullet.macros.set("\\df@tag", void 0, true);
		} else tags.push(Boolean(autoTag) && parser.gullet.macros.get("\\@eqnsw") === "1");
	}
	beginRow();
	hLinesBeforeRow.push(getHLines(parser));
	while (true) {
		var cell = parser.parseExpression(false, singleRow ? "\\end" : "\\\\");
		parser.gullet.endGroup();
		parser.gullet.beginGroup();
		cell = {
			type: "ordgroup",
			mode: parser.mode,
			body: cell
		};
		if (style) cell = {
			type: "styling",
			mode: parser.mode,
			style,
			body: [cell]
		};
		row.push(cell);
		var next = parser.fetch().text;
		if (next === "&") {
			if (maxNumCols && row.length === maxNumCols) if (singleRow || colSeparationType) throw new ParseError("Too many tab characters: &", parser.nextToken);
			else parser.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
			parser.consume();
		} else if (next === "\\end") {
			endRow();
			if (row.length === 1 && cell.type === "styling" && cell.body[0].body.length === 0 && (body.length > 1 || !emptySingleRow)) body.pop();
			if (hLinesBeforeRow.length < body.length + 1) hLinesBeforeRow.push([]);
			break;
		} else if (next === "\\\\") {
			parser.consume();
			var size = void 0;
			if (parser.gullet.future().text !== " ") size = parser.parseSizeGroup(true);
			rowGaps.push(size ? size.value : null);
			endRow();
			hLinesBeforeRow.push(getHLines(parser));
			row = [];
			body.push(row);
			beginRow();
		} else throw new ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
	}
	parser.gullet.endGroup();
	parser.gullet.endGroup();
	return {
		type: "array",
		mode: parser.mode,
		addJot,
		arraystretch,
		body,
		cols,
		rowGaps,
		hskipBeforeAndAfter,
		hLinesBeforeRow,
		colSeparationType,
		tags,
		leqno
	};
}
function dCellStyle(envName) {
	if (envName.slice(0, 1) === "d") return "display";
	else return "text";
}
function sizingGroup(value, options, baseOptions) {
	var inner = buildExpression$1(value, options, false);
	var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
	for (var i = 0; i < inner.length; i++) {
		var pos = inner[i].classes.indexOf("sizing");
		if (pos < 0) Array.prototype.push.apply(inner[i].classes, options.sizingClasses(baseOptions));
		else if (inner[i].classes[pos + 1] === "reset-size" + options.size) inner[i].classes[pos + 1] = "reset-size" + baseOptions.size;
		inner[i].height *= multiplier;
		inner[i].depth *= multiplier;
	}
	return buildCommon.makeFragment(inner);
}
var SourceLocation, Token, ParseError, deflt, uppercase, hyphenate, ESCAPE_LOOKUP, ESCAPE_REGEX, getBaseElem, isCharacterBox, assert, utils, SETTINGS_SCHEMA, Settings, Style, D$2, Dc, T$3, Tc, S$1, Sc, SS, SSc, styles, sup, sub, fracNum, fracDen, cramp, text$1, Style$1, scriptData, allBlocks, hLinePad, sqrtMain, sqrtSize1, sqrtSize2, sqrtSize3, sqrtSize4, phasePath, sqrtTall, sqrtPath, innerPath, path, tallDelim, DocumentFragment, fontMetricsData, sigmasAndXis, extraCharacterMap, fontMetricsBySizeIndex, sizeStyleMap, sizeMultipliers, sizeAtStyle, Options, ptPerUnit, relativeUnit, validUnit, calculateSize, makeEm, createClass, initNode, toNode, invalidAttributeNameRegex, toMarkup, Span, Anchor, Img, iCombinations, SymbolNode, SvgNode, PathNode, LineNode, ATOMS, NON_ATOMS, symbols, math, text, main, ams, accent, bin, close, inner, mathord, op, open, punct, rel, spacing, textord, ligatures, mathTextSymbols, i$13, ch, textSymbols, _i, _ch, letters, _i2, _ch2, wideChar, _i3, _ch3, _i4, _ch4, extraLatin, _i5, _ch5, wideLatinLetterData, wideNumeralData, wideCharacterFont, lookupSymbol, makeSymbol, mathsym, boldsymbol, makeOrd, canCombine, tryCombineChars, sizeElementFromChildren, makeSpan$2, makeSvgSpan, makeLineSpan, makeAnchor, makeFragment, wrapFragment, getVListChildrenAndDepth, makeVList, makeGlue, retrieveTextFontName, fontMap, svgData, buildCommon, thinspace, mediumspace, thickspace, spacings, tightSpacings, _functions, _htmlGroupBuilders, _mathmlGroupBuilders, normalizeArgument, ordargument, makeSpan$1, binLeftCanceller, binRightCanceller, styleMap$1, DomEnum, buildExpression$1, traverseNonSpaceNodes, checkPartialGroup, getOutermostNode, getTypeOfDomTree, makeNullDelimiter, buildGroup$1, MathNode, TextNode, SpaceNode, mathMLTree, makeText, makeRow, getVariant, buildExpression, buildExpressionRow, buildGroup, optionsFromSettings, displayWrap, buildTree, buildHTMLTree, stretchyCodePoint, mathMLnode, katexImagesData, groupLength, stretchy, htmlBuilder$a, mathmlBuilder$9, NON_STRETCHY_ACCENT_REGEX, paddedNode, makeSpan, binrelClass, cdArrowFunctionName, newCell, isStartOfArrow, isLabelEnd, htmlBuilder$8, mathmlBuilder$7, globalMap, checkControlSequence, getRHS, letCommand, getMetrics, styleWrap, centerSpan, makeSmallDelim, mathrmSize, makeLargeDelim, makeGlyphSpan, makeInner, lapInEms, lap, verts, doubleVerts, makeStackedDelim, vbPad, emPad, sqrtSvg, makeSqrtImage, stackLargeDelimiters, stackAlwaysDelimiters, stackNeverDelimiters, sizeToMaxHeight, makeSizedDelim, stackNeverDelimiterSequence, stackAlwaysDelimiterSequence, stackLargeDelimiterSequence, delimTypeToFont, traverseSequence, makeCustomSizedDelim, delimiter, delimiterSizes, delimiters, htmlBuilder$7, mathmlBuilder$6, _environments, _macros, validateAmsEnvironmentContext, htmlBuilder$6, alignMap, mathmlBuilder$5, alignedHandler, environments, htmlBuilder$5, mathmlBuilder$4, fontAliases, adjustStyle, htmlBuilder$4, mathmlBuilder$3, stylArray, delimFromValue, htmlBuilder$3, mathmlBuilder$2, sizeData, chooseMathStyle, assembleSupSub, noSuccessor, htmlBuilder$2, mathmlBuilder$1, singleCharBigOps, singleCharIntegrals, htmlBuilder$1, mathmlBuilder, sizeFuncs, htmlBuilder, styleMap, htmlBuilderDelegate, defaultVariant, cssSpace, regularSpace, pad, textFontFamilies, textFontWeights, textFontShapes, optionsWithFont, makeVerb, functions, spaceRegexString, controlWordRegexString, controlSymbolRegexString, controlWordWhitespaceRegexString, controlSpaceRegexString, combiningDiacriticalMarkString, combiningDiacriticalMarksEndRegex, tokenRegexString, Lexer, Namespace, macros, digitToNumber, newcommand, dotsByToken, spaceAfterDots, latexRaiseA, braketHelper, implicitCommands, MacroExpander, unicodeSubRegEx, uSubsAndSups, unicodeAccents, unicodeSymbols, Parser, parseTree, render, renderToString, generateParseTree, renderError, renderToDomTree, renderToHTMLTree, version, __domTree, katex;
var init_katex = __esmMin((() => {
	SourceLocation = class SourceLocation {
		constructor(lexer, start, end) {
			this.lexer = void 0;
			this.start = void 0;
			this.end = void 0;
			this.lexer = lexer;
			this.start = start;
			this.end = end;
		}
		/**
		* Merges two `SourceLocation`s from location providers, given they are
		* provided in order of appearance.
		* - Returns the first one's location if only the first is provided.
		* - Returns a merged range of the first and the last if both are provided
		*   and their lexers match.
		* - Otherwise, returns null.
		*/
		static range(first, second) {
			if (!second) return first && first.loc;
			else if (!first || !first.loc || !second.loc || first.loc.lexer !== second.loc.lexer) return null;
			else return new SourceLocation(first.loc.lexer, first.loc.start, second.loc.end);
		}
	};
	Token = class Token {
		constructor(text, loc) {
			this.text = void 0;
			this.loc = void 0;
			this.noexpand = void 0;
			this.treatAsRelax = void 0;
			this.text = text;
			this.loc = loc;
		}
		/**
		* Given a pair of tokens (this and endToken), compute a `Token` encompassing
		* the whole input range enclosed by these two.
		*/
		range(endToken, text) {
			return new Token(text, SourceLocation.range(this, endToken));
		}
	};
	ParseError = class ParseError {
		constructor(message, token) {
			this.name = void 0;
			this.position = void 0;
			this.length = void 0;
			this.rawMessage = void 0;
			var error = "KaTeX parse error: " + message;
			var start;
			var end;
			var loc = token && token.loc;
			if (loc && loc.start <= loc.end) {
				var input = loc.lexer.input;
				start = loc.start;
				end = loc.end;
				if (start === input.length) error += " at end of input: ";
				else error += " at position " + (start + 1) + ": ";
				var underlined = input.slice(start, end).replace(/[^]/g, "$&̲");
				var left;
				if (start > 15) left = "…" + input.slice(start - 15, start);
				else left = input.slice(0, start);
				var right;
				if (end + 15 < input.length) right = input.slice(end, end + 15) + "…";
				else right = input.slice(end);
				error += left + underlined + right;
			}
			var self = new Error(error);
			self.name = "ParseError";
			self.__proto__ = ParseError.prototype;
			self.position = start;
			if (start != null && end != null) self.length = end - start;
			self.rawMessage = message;
			return self;
		}
	};
	ParseError.prototype.__proto__ = Error.prototype;
	deflt = function deflt(setting, defaultIfUndefined) {
		return setting === void 0 ? defaultIfUndefined : setting;
	};
	uppercase = /([A-Z])/g;
	hyphenate = function hyphenate(str) {
		return str.replace(uppercase, "-$1").toLowerCase();
	};
	ESCAPE_LOOKUP = {
		"&": "&amp;",
		">": "&gt;",
		"<": "&lt;",
		"\"": "&quot;",
		"'": "&#x27;"
	};
	ESCAPE_REGEX = /[&><"']/g;
	getBaseElem = function getBaseElem(group) {
		if (group.type === "ordgroup") if (group.body.length === 1) return getBaseElem(group.body[0]);
		else return group;
		else if (group.type === "color") if (group.body.length === 1) return getBaseElem(group.body[0]);
		else return group;
		else if (group.type === "font") return getBaseElem(group.body);
		else return group;
	};
	isCharacterBox = function isCharacterBox(group) {
		var baseElem = getBaseElem(group);
		return baseElem.type === "mathord" || baseElem.type === "textord" || baseElem.type === "atom";
	};
	assert = function assert(value) {
		if (!value) throw new Error("Expected non-null, but got " + String(value));
		return value;
	};
	utils = {
		deflt,
		escape,
		hyphenate,
		getBaseElem,
		isCharacterBox,
		protocolFromUrl: function protocolFromUrl(url) {
			var protocol = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(url);
			if (!protocol) return "_relative";
			if (protocol[2] !== ":") return null;
			if (!/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(protocol[1])) return null;
			return protocol[1].toLowerCase();
		}
	};
	SETTINGS_SCHEMA = {
		displayMode: {
			type: "boolean",
			description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
			cli: "-d, --display-mode"
		},
		output: {
			type: { enum: [
				"htmlAndMathml",
				"html",
				"mathml"
			] },
			description: "Determines the markup language of the output.",
			cli: "-F, --format <type>"
		},
		leqno: {
			type: "boolean",
			description: "Render display math in leqno style (left-justified tags)."
		},
		fleqn: {
			type: "boolean",
			description: "Render display math flush left."
		},
		throwOnError: {
			type: "boolean",
			default: true,
			cli: "-t, --no-throw-on-error",
			cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
		},
		errorColor: {
			type: "string",
			default: "#cc0000",
			cli: "-c, --error-color <color>",
			cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
			cliProcessor: (color) => "#" + color
		},
		macros: {
			type: "object",
			cli: "-m, --macro <def>",
			cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
			cliDefault: [],
			cliProcessor: (def, defs) => {
				defs.push(def);
				return defs;
			}
		},
		minRuleThickness: {
			type: "number",
			description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
			processor: (t) => Math.max(0, t),
			cli: "--min-rule-thickness <size>",
			cliProcessor: parseFloat
		},
		colorIsTextColor: {
			type: "boolean",
			description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
			cli: "-b, --color-is-text-color"
		},
		strict: {
			type: [
				{ enum: [
					"warn",
					"ignore",
					"error"
				] },
				"boolean",
				"function"
			],
			description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
			cli: "-S, --strict",
			cliDefault: false
		},
		trust: {
			type: ["boolean", "function"],
			description: "Trust the input, enabling all HTML features such as \\url.",
			cli: "-T, --trust"
		},
		maxSize: {
			type: "number",
			default: Infinity,
			description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
			processor: (s) => Math.max(0, s),
			cli: "-s, --max-size <n>",
			cliProcessor: parseInt
		},
		maxExpand: {
			type: "number",
			default: 1e3,
			description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
			processor: (n) => Math.max(0, n),
			cli: "-e, --max-expand <n>",
			cliProcessor: (n) => n === "Infinity" ? Infinity : parseInt(n)
		},
		globalGroup: {
			type: "boolean",
			cli: false
		}
	};
	Settings = class {
		constructor(options) {
			this.displayMode = void 0;
			this.output = void 0;
			this.leqno = void 0;
			this.fleqn = void 0;
			this.throwOnError = void 0;
			this.errorColor = void 0;
			this.macros = void 0;
			this.minRuleThickness = void 0;
			this.colorIsTextColor = void 0;
			this.strict = void 0;
			this.trust = void 0;
			this.maxSize = void 0;
			this.maxExpand = void 0;
			this.globalGroup = void 0;
			options = options || {};
			for (var prop in SETTINGS_SCHEMA) if (SETTINGS_SCHEMA.hasOwnProperty(prop)) {
				var schema = SETTINGS_SCHEMA[prop];
				this[prop] = options[prop] !== void 0 ? schema.processor ? schema.processor(options[prop]) : options[prop] : getDefaultValue(schema);
			}
		}
		/**
		* Report nonstrict (non-LaTeX-compatible) input.
		* Can safely not be called if `this.strict` is false in JavaScript.
		*/
		reportNonstrict(errorCode, errorMsg, token) {
			var strict = this.strict;
			if (typeof strict === "function") strict = strict(errorCode, errorMsg, token);
			if (!strict || strict === "ignore") return;
			else if (strict === true || strict === "error") throw new ParseError("LaTeX-incompatible input and strict mode is set to 'error': " + (errorMsg + " [" + errorCode + "]"), token);
			else if (strict === "warn") typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
			else typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
		}
		/**
		* Check whether to apply strict (LaTeX-adhering) behavior for unusual
		* input (like `\\`).  Unlike `nonstrict`, will not throw an error;
		* instead, "error" translates to a return value of `true`, while "ignore"
		* translates to a return value of `false`.  May still print a warning:
		* "warn" prints a warning and returns `false`.
		* This is for the second category of `errorCode`s listed in the README.
		*/
		useStrictBehavior(errorCode, errorMsg, token) {
			var strict = this.strict;
			if (typeof strict === "function") try {
				strict = strict(errorCode, errorMsg, token);
			} catch (error) {
				strict = "error";
			}
			if (!strict || strict === "ignore") return false;
			else if (strict === true || strict === "error") return true;
			else if (strict === "warn") {
				typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
				return false;
			} else {
				typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
				return false;
			}
		}
		/**
		* Check whether to test potentially dangerous input, and return
		* `true` (trusted) or `false` (untrusted).  The sole argument `context`
		* should be an object with `command` field specifying the relevant LaTeX
		* command (as a string starting with `\`), and any other arguments, etc.
		* If `context` has a `url` field, a `protocol` field will automatically
		* get added by this function (changing the specified object).
		*/
		isTrusted(context) {
			if (context.url && !context.protocol) {
				var protocol = utils.protocolFromUrl(context.url);
				if (protocol == null) return false;
				context.protocol = protocol;
			}
			var trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
			return Boolean(trust);
		}
	};
	Style = class {
		constructor(id, size, cramped) {
			this.id = void 0;
			this.size = void 0;
			this.cramped = void 0;
			this.id = id;
			this.size = size;
			this.cramped = cramped;
		}
		/**
		* Get the style of a superscript given a base in the current style.
		*/
		sup() {
			return styles[sup[this.id]];
		}
		/**
		* Get the style of a subscript given a base in the current style.
		*/
		sub() {
			return styles[sub[this.id]];
		}
		/**
		* Get the style of a fraction numerator given the fraction in the current
		* style.
		*/
		fracNum() {
			return styles[fracNum[this.id]];
		}
		/**
		* Get the style of a fraction denominator given the fraction in the current
		* style.
		*/
		fracDen() {
			return styles[fracDen[this.id]];
		}
		/**
		* Get the cramped version of a style (in particular, cramping a cramped style
		* doesn't change the style).
		*/
		cramp() {
			return styles[cramp[this.id]];
		}
		/**
		* Get a text or display version of this style.
		*/
		text() {
			return styles[text$1[this.id]];
		}
		/**
		* Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
		*/
		isTight() {
			return this.size >= 2;
		}
	};
	D$2 = 0;
	Dc = 1;
	T$3 = 2;
	Tc = 3;
	S$1 = 4;
	Sc = 5;
	SS = 6;
	SSc = 7;
	styles = [
		new Style(D$2, 0, false),
		new Style(Dc, 0, true),
		new Style(T$3, 1, false),
		new Style(Tc, 1, true),
		new Style(S$1, 2, false),
		new Style(Sc, 2, true),
		new Style(SS, 3, false),
		new Style(SSc, 3, true)
	];
	sup = [
		S$1,
		Sc,
		S$1,
		Sc,
		SS,
		SSc,
		SS,
		SSc
	];
	sub = [
		Sc,
		Sc,
		Sc,
		Sc,
		SSc,
		SSc,
		SSc,
		SSc
	];
	fracNum = [
		T$3,
		Tc,
		S$1,
		Sc,
		SS,
		SSc,
		SS,
		SSc
	];
	fracDen = [
		Tc,
		Tc,
		Sc,
		Sc,
		SSc,
		SSc,
		SSc,
		SSc
	];
	cramp = [
		Dc,
		Dc,
		Tc,
		Tc,
		Sc,
		Sc,
		SSc,
		SSc
	];
	text$1 = [
		D$2,
		Dc,
		T$3,
		Tc,
		T$3,
		Tc,
		T$3,
		Tc
	];
	Style$1 = {
		DISPLAY: styles[D$2],
		TEXT: styles[T$3],
		SCRIPT: styles[S$1],
		SCRIPTSCRIPT: styles[SS]
	};
	scriptData = [
		{
			name: "latin",
			blocks: [[256, 591], [768, 879]]
		},
		{
			name: "cyrillic",
			blocks: [[1024, 1279]]
		},
		{
			name: "armenian",
			blocks: [[1328, 1423]]
		},
		{
			name: "brahmic",
			blocks: [[2304, 4255]]
		},
		{
			name: "georgian",
			blocks: [[4256, 4351]]
		},
		{
			name: "cjk",
			blocks: [
				[12288, 12543],
				[19968, 40879],
				[65280, 65376]
			]
		},
		{
			name: "hangul",
			blocks: [[44032, 55215]]
		}
	];
	allBlocks = [];
	scriptData.forEach((s) => s.blocks.forEach((b) => allBlocks.push(...b)));
	hLinePad = 80;
	sqrtMain = function sqrtMain(extraVinculum, hLinePad) {
		return "M95," + (622 + extraVinculum + hLinePad) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + extraVinculum / 2.075 + " -" + extraVinculum + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + extraVinculum) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
	};
	sqrtSize1 = function sqrtSize1(extraVinculum, hLinePad) {
		return "M263," + (601 + extraVinculum + hLinePad) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + extraVinculum / 2.084 + " -" + extraVinculum + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + extraVinculum) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
	};
	sqrtSize2 = function sqrtSize2(extraVinculum, hLinePad) {
		return "M983 " + (10 + extraVinculum + hLinePad) + "\nl" + extraVinculum / 3.13 + " -" + extraVinculum + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + extraVinculum) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "h-400000z";
	};
	sqrtSize3 = function sqrtSize3(extraVinculum, hLinePad) {
		return "M424," + (2398 + extraVinculum + hLinePad) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + extraVinculum / 4.223 + " -" + extraVinculum + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + extraVinculum) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + extraVinculum) + " " + hLinePad + "\nh400000v" + (40 + extraVinculum) + "h-400000z";
	};
	sqrtSize4 = function sqrtSize4(extraVinculum, hLinePad) {
		return "M473," + (2713 + extraVinculum + hLinePad) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + extraVinculum / 5.298 + " -" + extraVinculum + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + extraVinculum) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + extraVinculum) + " " + hLinePad + "h400000v" + (40 + extraVinculum) + "H1017.7z";
	};
	phasePath = function phasePath(y) {
		var x = y / 2;
		return "M400000 " + y + " H0 L" + x + " 0 l65 45 L145 " + (y - 80) + " H400000z";
	};
	sqrtTall = function sqrtTall(extraVinculum, hLinePad, viewBoxHeight) {
		var vertSegment = viewBoxHeight - 54 - hLinePad - extraVinculum;
		return "M702 " + (extraVinculum + hLinePad) + "H400000" + (40 + extraVinculum) + "\nH742v" + vertSegment + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + hLinePad + "H400000v" + (40 + extraVinculum) + "H742z";
	};
	sqrtPath = function sqrtPath(size, extraVinculum, viewBoxHeight) {
		extraVinculum = 1e3 * extraVinculum;
		var path = "";
		switch (size) {
			case "sqrtMain":
				path = sqrtMain(extraVinculum, hLinePad);
				break;
			case "sqrtSize1":
				path = sqrtSize1(extraVinculum, hLinePad);
				break;
			case "sqrtSize2":
				path = sqrtSize2(extraVinculum, hLinePad);
				break;
			case "sqrtSize3":
				path = sqrtSize3(extraVinculum, hLinePad);
				break;
			case "sqrtSize4":
				path = sqrtSize4(extraVinculum, hLinePad);
				break;
			case "sqrtTall": path = sqrtTall(extraVinculum, hLinePad, viewBoxHeight);
		}
		return path;
	};
	innerPath = function innerPath(name, height) {
		switch (name) {
			case "⎜": return "M291 0 H417 V" + height + " H291z M291 0 H417 V" + height + " H291z";
			case "∣": return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z";
			case "∥": return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z" + ("M367 0 H410 V" + height + " H367z M367 0 H410 V" + height + " H367z");
			case "⎟": return "M457 0 H583 V" + height + " H457z M457 0 H583 V" + height + " H457z";
			case "⎢": return "M319 0 H403 V" + height + " H319z M319 0 H403 V" + height + " H319z";
			case "⎥": return "M263 0 H347 V" + height + " H263z M263 0 H347 V" + height + " H263z";
			case "⎪": return "M384 0 H504 V" + height + " H384z M384 0 H504 V" + height + " H384z";
			case "⏐": return "M312 0 H355 V" + height + " H312z M312 0 H355 V" + height + " H312z";
			case "‖": return "M257 0 H300 V" + height + " H257z M257 0 H300 V" + height + " H257z" + ("M478 0 H521 V" + height + " H478z M478 0 H521 V" + height + " H478z");
			default: return "";
		}
	};
	path = {
		doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
		doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
		leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
		leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
		leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
		leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
		leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
		leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
		leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
		leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
		leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
		lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
		leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
		leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
		leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
		longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
		midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
		midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
		oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
		oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
		oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
		oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
		rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
		rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
		rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
		rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
		rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
		rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
		rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
		rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
		rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
		righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
		rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
		rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
		twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
		twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
		tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
		tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
		tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
		tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
		vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
		widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
		widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
		widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
		widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
		widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
		widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
		widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
		widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
		baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
		rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
		baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
		rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
		shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
		shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
	};
	tallDelim = function tallDelim(label, midHeight) {
		switch (label) {
			case "lbrack": return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + midHeight + " v1759 h84z";
			case "rbrack": return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + midHeight + " v1759 h84z";
			case "vert": return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z";
			case "doublevert": return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z\nM367 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + midHeight + " v585 h43z";
			case "lfloor": return "M319 602 V0 H403 V602 v" + midHeight + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
			case "rfloor": return "M319 602 V0 H403 V602 v" + midHeight + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
			case "lceil": return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v602 h84z\nM403 1759 V0 H319 V1759 v" + midHeight + " v602 h84z";
			case "rceil": return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + midHeight + " v602 h84z";
			case "lparen": return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (midHeight + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (midHeight + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
			case "rparen": return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (midHeight + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (midHeight + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
			default: throw new Error("Unknown stretchy delimiter.");
		}
	};
	DocumentFragment = class {
		constructor(children) {
			this.children = void 0;
			this.classes = void 0;
			this.height = void 0;
			this.depth = void 0;
			this.maxFontSize = void 0;
			this.style = void 0;
			this.children = children;
			this.classes = [];
			this.height = 0;
			this.depth = 0;
			this.maxFontSize = 0;
			this.style = {};
		}
		hasClass(className) {
			return this.classes.includes(className);
		}
		/** Convert the fragment into a node. */
		toNode() {
			var frag = document.createDocumentFragment();
			for (var i = 0; i < this.children.length; i++) frag.appendChild(this.children[i].toNode());
			return frag;
		}
		/** Convert the fragment into HTML markup. */
		toMarkup() {
			var markup = "";
			for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
			return markup;
		}
		/**
		* Converts the math node into a string, similar to innerText. Applies to
		* MathDomNode's only.
		*/
		toText() {
			var toText = (child) => child.toText();
			return this.children.map(toText).join("");
		}
	};
	fontMetricsData = {
		"AMS-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"65": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"66": [
				0,
				.68889,
				0,
				0,
				.66667
			],
			"67": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"68": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"69": [
				0,
				.68889,
				0,
				0,
				.66667
			],
			"70": [
				0,
				.68889,
				0,
				0,
				.61111
			],
			"71": [
				0,
				.68889,
				0,
				0,
				.77778
			],
			"72": [
				0,
				.68889,
				0,
				0,
				.77778
			],
			"73": [
				0,
				.68889,
				0,
				0,
				.38889
			],
			"74": [
				.16667,
				.68889,
				0,
				0,
				.5
			],
			"75": [
				0,
				.68889,
				0,
				0,
				.77778
			],
			"76": [
				0,
				.68889,
				0,
				0,
				.66667
			],
			"77": [
				0,
				.68889,
				0,
				0,
				.94445
			],
			"78": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"79": [
				.16667,
				.68889,
				0,
				0,
				.77778
			],
			"80": [
				0,
				.68889,
				0,
				0,
				.61111
			],
			"81": [
				.16667,
				.68889,
				0,
				0,
				.77778
			],
			"82": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"83": [
				0,
				.68889,
				0,
				0,
				.55556
			],
			"84": [
				0,
				.68889,
				0,
				0,
				.66667
			],
			"85": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"86": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"87": [
				0,
				.68889,
				0,
				0,
				1
			],
			"88": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"89": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"90": [
				0,
				.68889,
				0,
				0,
				.66667
			],
			"107": [
				0,
				.68889,
				0,
				0,
				.55556
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"165": [
				0,
				.675,
				.025,
				0,
				.75
			],
			"174": [
				.15559,
				.69224,
				0,
				0,
				.94666
			],
			"240": [
				0,
				.68889,
				0,
				0,
				.55556
			],
			"295": [
				0,
				.68889,
				0,
				0,
				.54028
			],
			"710": [
				0,
				.825,
				0,
				0,
				2.33334
			],
			"732": [
				0,
				.9,
				0,
				0,
				2.33334
			],
			"770": [
				0,
				.825,
				0,
				0,
				2.33334
			],
			"771": [
				0,
				.9,
				0,
				0,
				2.33334
			],
			"989": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"1008": [
				0,
				.43056,
				.04028,
				0,
				.66667
			],
			"8245": [
				0,
				.54986,
				0,
				0,
				.275
			],
			"8463": [
				0,
				.68889,
				0,
				0,
				.54028
			],
			"8487": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"8498": [
				0,
				.68889,
				0,
				0,
				.55556
			],
			"8502": [
				0,
				.68889,
				0,
				0,
				.66667
			],
			"8503": [
				0,
				.68889,
				0,
				0,
				.44445
			],
			"8504": [
				0,
				.68889,
				0,
				0,
				.66667
			],
			"8513": [
				0,
				.68889,
				0,
				0,
				.63889
			],
			"8592": [
				-.03598,
				.46402,
				0,
				0,
				.5
			],
			"8594": [
				-.03598,
				.46402,
				0,
				0,
				.5
			],
			"8602": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8603": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8606": [
				.01354,
				.52239,
				0,
				0,
				1
			],
			"8608": [
				.01354,
				.52239,
				0,
				0,
				1
			],
			"8610": [
				.01354,
				.52239,
				0,
				0,
				1.11111
			],
			"8611": [
				.01354,
				.52239,
				0,
				0,
				1.11111
			],
			"8619": [
				0,
				.54986,
				0,
				0,
				1
			],
			"8620": [
				0,
				.54986,
				0,
				0,
				1
			],
			"8621": [
				-.13313,
				.37788,
				0,
				0,
				1.38889
			],
			"8622": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8624": [
				0,
				.69224,
				0,
				0,
				.5
			],
			"8625": [
				0,
				.69224,
				0,
				0,
				.5
			],
			"8630": [
				0,
				.43056,
				0,
				0,
				1
			],
			"8631": [
				0,
				.43056,
				0,
				0,
				1
			],
			"8634": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8635": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8638": [
				.19444,
				.69224,
				0,
				0,
				.41667
			],
			"8639": [
				.19444,
				.69224,
				0,
				0,
				.41667
			],
			"8642": [
				.19444,
				.69224,
				0,
				0,
				.41667
			],
			"8643": [
				.19444,
				.69224,
				0,
				0,
				.41667
			],
			"8644": [
				.1808,
				.675,
				0,
				0,
				1
			],
			"8646": [
				.1808,
				.675,
				0,
				0,
				1
			],
			"8647": [
				.1808,
				.675,
				0,
				0,
				1
			],
			"8648": [
				.19444,
				.69224,
				0,
				0,
				.83334
			],
			"8649": [
				.1808,
				.675,
				0,
				0,
				1
			],
			"8650": [
				.19444,
				.69224,
				0,
				0,
				.83334
			],
			"8651": [
				.01354,
				.52239,
				0,
				0,
				1
			],
			"8652": [
				.01354,
				.52239,
				0,
				0,
				1
			],
			"8653": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8654": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8655": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8666": [
				.13667,
				.63667,
				0,
				0,
				1
			],
			"8667": [
				.13667,
				.63667,
				0,
				0,
				1
			],
			"8669": [
				-.13313,
				.37788,
				0,
				0,
				1
			],
			"8672": [
				-.064,
				.437,
				0,
				0,
				1.334
			],
			"8674": [
				-.064,
				.437,
				0,
				0,
				1.334
			],
			"8705": [
				0,
				.825,
				0,
				0,
				.5
			],
			"8708": [
				0,
				.68889,
				0,
				0,
				.55556
			],
			"8709": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"8717": [
				0,
				.43056,
				0,
				0,
				.42917
			],
			"8722": [
				-.03598,
				.46402,
				0,
				0,
				.5
			],
			"8724": [
				.08198,
				.69224,
				0,
				0,
				.77778
			],
			"8726": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"8733": [
				0,
				.69224,
				0,
				0,
				.77778
			],
			"8736": [
				0,
				.69224,
				0,
				0,
				.72222
			],
			"8737": [
				0,
				.69224,
				0,
				0,
				.72222
			],
			"8738": [
				.03517,
				.52239,
				0,
				0,
				.72222
			],
			"8739": [
				.08167,
				.58167,
				0,
				0,
				.22222
			],
			"8740": [
				.25142,
				.74111,
				0,
				0,
				.27778
			],
			"8741": [
				.08167,
				.58167,
				0,
				0,
				.38889
			],
			"8742": [
				.25142,
				.74111,
				0,
				0,
				.5
			],
			"8756": [
				0,
				.69224,
				0,
				0,
				.66667
			],
			"8757": [
				0,
				.69224,
				0,
				0,
				.66667
			],
			"8764": [
				-.13313,
				.36687,
				0,
				0,
				.77778
			],
			"8765": [
				-.13313,
				.37788,
				0,
				0,
				.77778
			],
			"8769": [
				-.13313,
				.36687,
				0,
				0,
				.77778
			],
			"8770": [
				-.03625,
				.46375,
				0,
				0,
				.77778
			],
			"8774": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8776": [
				-.01688,
				.48312,
				0,
				0,
				.77778
			],
			"8778": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"8782": [
				.06062,
				.54986,
				0,
				0,
				.77778
			],
			"8783": [
				.06062,
				.54986,
				0,
				0,
				.77778
			],
			"8785": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8786": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8787": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8790": [
				0,
				.69224,
				0,
				0,
				.77778
			],
			"8791": [
				.22958,
				.72958,
				0,
				0,
				.77778
			],
			"8796": [
				.08198,
				.91667,
				0,
				0,
				.77778
			],
			"8806": [
				.25583,
				.75583,
				0,
				0,
				.77778
			],
			"8807": [
				.25583,
				.75583,
				0,
				0,
				.77778
			],
			"8808": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"8809": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"8812": [
				.25583,
				.75583,
				0,
				0,
				.5
			],
			"8814": [
				.20576,
				.70576,
				0,
				0,
				.77778
			],
			"8815": [
				.20576,
				.70576,
				0,
				0,
				.77778
			],
			"8816": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8817": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8818": [
				.22958,
				.72958,
				0,
				0,
				.77778
			],
			"8819": [
				.22958,
				.72958,
				0,
				0,
				.77778
			],
			"8822": [
				.1808,
				.675,
				0,
				0,
				.77778
			],
			"8823": [
				.1808,
				.675,
				0,
				0,
				.77778
			],
			"8828": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"8829": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"8830": [
				.22958,
				.72958,
				0,
				0,
				.77778
			],
			"8831": [
				.22958,
				.72958,
				0,
				0,
				.77778
			],
			"8832": [
				.20576,
				.70576,
				0,
				0,
				.77778
			],
			"8833": [
				.20576,
				.70576,
				0,
				0,
				.77778
			],
			"8840": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8841": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8842": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8843": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8847": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"8848": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"8858": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8859": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8861": [
				.08198,
				.58198,
				0,
				0,
				.77778
			],
			"8862": [
				0,
				.675,
				0,
				0,
				.77778
			],
			"8863": [
				0,
				.675,
				0,
				0,
				.77778
			],
			"8864": [
				0,
				.675,
				0,
				0,
				.77778
			],
			"8865": [
				0,
				.675,
				0,
				0,
				.77778
			],
			"8872": [
				0,
				.69224,
				0,
				0,
				.61111
			],
			"8873": [
				0,
				.69224,
				0,
				0,
				.72222
			],
			"8874": [
				0,
				.69224,
				0,
				0,
				.88889
			],
			"8876": [
				0,
				.68889,
				0,
				0,
				.61111
			],
			"8877": [
				0,
				.68889,
				0,
				0,
				.61111
			],
			"8878": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"8879": [
				0,
				.68889,
				0,
				0,
				.72222
			],
			"8882": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"8883": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"8884": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"8885": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"8888": [
				0,
				.54986,
				0,
				0,
				1.11111
			],
			"8890": [
				.19444,
				.43056,
				0,
				0,
				.55556
			],
			"8891": [
				.19444,
				.69224,
				0,
				0,
				.61111
			],
			"8892": [
				.19444,
				.69224,
				0,
				0,
				.61111
			],
			"8901": [
				0,
				.54986,
				0,
				0,
				.27778
			],
			"8903": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"8905": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"8906": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"8907": [
				0,
				.69224,
				0,
				0,
				.77778
			],
			"8908": [
				0,
				.69224,
				0,
				0,
				.77778
			],
			"8909": [
				-.03598,
				.46402,
				0,
				0,
				.77778
			],
			"8910": [
				0,
				.54986,
				0,
				0,
				.76042
			],
			"8911": [
				0,
				.54986,
				0,
				0,
				.76042
			],
			"8912": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"8913": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"8914": [
				0,
				.54986,
				0,
				0,
				.66667
			],
			"8915": [
				0,
				.54986,
				0,
				0,
				.66667
			],
			"8916": [
				0,
				.69224,
				0,
				0,
				.66667
			],
			"8918": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"8919": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"8920": [
				.03517,
				.54986,
				0,
				0,
				1.33334
			],
			"8921": [
				.03517,
				.54986,
				0,
				0,
				1.33334
			],
			"8922": [
				.38569,
				.88569,
				0,
				0,
				.77778
			],
			"8923": [
				.38569,
				.88569,
				0,
				0,
				.77778
			],
			"8926": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"8927": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"8928": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8929": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8934": [
				.23222,
				.74111,
				0,
				0,
				.77778
			],
			"8935": [
				.23222,
				.74111,
				0,
				0,
				.77778
			],
			"8936": [
				.23222,
				.74111,
				0,
				0,
				.77778
			],
			"8937": [
				.23222,
				.74111,
				0,
				0,
				.77778
			],
			"8938": [
				.20576,
				.70576,
				0,
				0,
				.77778
			],
			"8939": [
				.20576,
				.70576,
				0,
				0,
				.77778
			],
			"8940": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8941": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"8994": [
				.19444,
				.69224,
				0,
				0,
				.77778
			],
			"8995": [
				.19444,
				.69224,
				0,
				0,
				.77778
			],
			"9416": [
				.15559,
				.69224,
				0,
				0,
				.90222
			],
			"9484": [
				0,
				.69224,
				0,
				0,
				.5
			],
			"9488": [
				0,
				.69224,
				0,
				0,
				.5
			],
			"9492": [
				0,
				.37788,
				0,
				0,
				.5
			],
			"9496": [
				0,
				.37788,
				0,
				0,
				.5
			],
			"9585": [
				.19444,
				.68889,
				0,
				0,
				.88889
			],
			"9586": [
				.19444,
				.74111,
				0,
				0,
				.88889
			],
			"9632": [
				0,
				.675,
				0,
				0,
				.77778
			],
			"9633": [
				0,
				.675,
				0,
				0,
				.77778
			],
			"9650": [
				0,
				.54986,
				0,
				0,
				.72222
			],
			"9651": [
				0,
				.54986,
				0,
				0,
				.72222
			],
			"9654": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"9660": [
				0,
				.54986,
				0,
				0,
				.72222
			],
			"9661": [
				0,
				.54986,
				0,
				0,
				.72222
			],
			"9664": [
				.03517,
				.54986,
				0,
				0,
				.77778
			],
			"9674": [
				.11111,
				.69224,
				0,
				0,
				.66667
			],
			"9733": [
				.19444,
				.69224,
				0,
				0,
				.94445
			],
			"10003": [
				0,
				.69224,
				0,
				0,
				.83334
			],
			"10016": [
				0,
				.69224,
				0,
				0,
				.83334
			],
			"10731": [
				.11111,
				.69224,
				0,
				0,
				.66667
			],
			"10846": [
				.19444,
				.75583,
				0,
				0,
				.61111
			],
			"10877": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"10878": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"10885": [
				.25583,
				.75583,
				0,
				0,
				.77778
			],
			"10886": [
				.25583,
				.75583,
				0,
				0,
				.77778
			],
			"10887": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"10888": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"10889": [
				.26167,
				.75726,
				0,
				0,
				.77778
			],
			"10890": [
				.26167,
				.75726,
				0,
				0,
				.77778
			],
			"10891": [
				.48256,
				.98256,
				0,
				0,
				.77778
			],
			"10892": [
				.48256,
				.98256,
				0,
				0,
				.77778
			],
			"10901": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"10902": [
				.13667,
				.63667,
				0,
				0,
				.77778
			],
			"10933": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"10934": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"10935": [
				.26167,
				.75726,
				0,
				0,
				.77778
			],
			"10936": [
				.26167,
				.75726,
				0,
				0,
				.77778
			],
			"10937": [
				.26167,
				.75726,
				0,
				0,
				.77778
			],
			"10938": [
				.26167,
				.75726,
				0,
				0,
				.77778
			],
			"10949": [
				.25583,
				.75583,
				0,
				0,
				.77778
			],
			"10950": [
				.25583,
				.75583,
				0,
				0,
				.77778
			],
			"10955": [
				.28481,
				.79383,
				0,
				0,
				.77778
			],
			"10956": [
				.28481,
				.79383,
				0,
				0,
				.77778
			],
			"57350": [
				.08167,
				.58167,
				0,
				0,
				.22222
			],
			"57351": [
				.08167,
				.58167,
				0,
				0,
				.38889
			],
			"57352": [
				.08167,
				.58167,
				0,
				0,
				.77778
			],
			"57353": [
				0,
				.43056,
				.04028,
				0,
				.66667
			],
			"57356": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"57357": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"57358": [
				.41951,
				.91951,
				0,
				0,
				.77778
			],
			"57359": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"57360": [
				.30274,
				.79383,
				0,
				0,
				.77778
			],
			"57361": [
				.41951,
				.91951,
				0,
				0,
				.77778
			],
			"57366": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"57367": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"57368": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"57369": [
				.25142,
				.75726,
				0,
				0,
				.77778
			],
			"57370": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"57371": [
				.13597,
				.63597,
				0,
				0,
				.77778
			]
		},
		"Caligraphic-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"65": [
				0,
				.68333,
				0,
				.19445,
				.79847
			],
			"66": [
				0,
				.68333,
				.03041,
				.13889,
				.65681
			],
			"67": [
				0,
				.68333,
				.05834,
				.13889,
				.52653
			],
			"68": [
				0,
				.68333,
				.02778,
				.08334,
				.77139
			],
			"69": [
				0,
				.68333,
				.08944,
				.11111,
				.52778
			],
			"70": [
				0,
				.68333,
				.09931,
				.11111,
				.71875
			],
			"71": [
				.09722,
				.68333,
				.0593,
				.11111,
				.59487
			],
			"72": [
				0,
				.68333,
				.00965,
				.11111,
				.84452
			],
			"73": [
				0,
				.68333,
				.07382,
				0,
				.54452
			],
			"74": [
				.09722,
				.68333,
				.18472,
				.16667,
				.67778
			],
			"75": [
				0,
				.68333,
				.01445,
				.05556,
				.76195
			],
			"76": [
				0,
				.68333,
				0,
				.13889,
				.68972
			],
			"77": [
				0,
				.68333,
				0,
				.13889,
				1.2009
			],
			"78": [
				0,
				.68333,
				.14736,
				.08334,
				.82049
			],
			"79": [
				0,
				.68333,
				.02778,
				.11111,
				.79611
			],
			"80": [
				0,
				.68333,
				.08222,
				.08334,
				.69556
			],
			"81": [
				.09722,
				.68333,
				0,
				.11111,
				.81667
			],
			"82": [
				0,
				.68333,
				0,
				.08334,
				.8475
			],
			"83": [
				0,
				.68333,
				.075,
				.13889,
				.60556
			],
			"84": [
				0,
				.68333,
				.25417,
				0,
				.54464
			],
			"85": [
				0,
				.68333,
				.09931,
				.08334,
				.62583
			],
			"86": [
				0,
				.68333,
				.08222,
				0,
				.61278
			],
			"87": [
				0,
				.68333,
				.08222,
				.08334,
				.98778
			],
			"88": [
				0,
				.68333,
				.14643,
				.13889,
				.7133
			],
			"89": [
				.09722,
				.68333,
				.08222,
				.08334,
				.66834
			],
			"90": [
				0,
				.68333,
				.07944,
				.13889,
				.72473
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			]
		},
		"Fraktur-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69141,
				0,
				0,
				.29574
			],
			"34": [
				0,
				.69141,
				0,
				0,
				.21471
			],
			"38": [
				0,
				.69141,
				0,
				0,
				.73786
			],
			"39": [
				0,
				.69141,
				0,
				0,
				.21201
			],
			"40": [
				.24982,
				.74947,
				0,
				0,
				.38865
			],
			"41": [
				.24982,
				.74947,
				0,
				0,
				.38865
			],
			"42": [
				0,
				.62119,
				0,
				0,
				.27764
			],
			"43": [
				.08319,
				.58283,
				0,
				0,
				.75623
			],
			"44": [
				0,
				.10803,
				0,
				0,
				.27764
			],
			"45": [
				.08319,
				.58283,
				0,
				0,
				.75623
			],
			"46": [
				0,
				.10803,
				0,
				0,
				.27764
			],
			"47": [
				.24982,
				.74947,
				0,
				0,
				.50181
			],
			"48": [
				0,
				.47534,
				0,
				0,
				.50181
			],
			"49": [
				0,
				.47534,
				0,
				0,
				.50181
			],
			"50": [
				0,
				.47534,
				0,
				0,
				.50181
			],
			"51": [
				.18906,
				.47534,
				0,
				0,
				.50181
			],
			"52": [
				.18906,
				.47534,
				0,
				0,
				.50181
			],
			"53": [
				.18906,
				.47534,
				0,
				0,
				.50181
			],
			"54": [
				0,
				.69141,
				0,
				0,
				.50181
			],
			"55": [
				.18906,
				.47534,
				0,
				0,
				.50181
			],
			"56": [
				0,
				.69141,
				0,
				0,
				.50181
			],
			"57": [
				.18906,
				.47534,
				0,
				0,
				.50181
			],
			"58": [
				0,
				.47534,
				0,
				0,
				.21606
			],
			"59": [
				.12604,
				.47534,
				0,
				0,
				.21606
			],
			"61": [
				-.13099,
				.36866,
				0,
				0,
				.75623
			],
			"63": [
				0,
				.69141,
				0,
				0,
				.36245
			],
			"65": [
				0,
				.69141,
				0,
				0,
				.7176
			],
			"66": [
				0,
				.69141,
				0,
				0,
				.88397
			],
			"67": [
				0,
				.69141,
				0,
				0,
				.61254
			],
			"68": [
				0,
				.69141,
				0,
				0,
				.83158
			],
			"69": [
				0,
				.69141,
				0,
				0,
				.66278
			],
			"70": [
				.12604,
				.69141,
				0,
				0,
				.61119
			],
			"71": [
				0,
				.69141,
				0,
				0,
				.78539
			],
			"72": [
				.06302,
				.69141,
				0,
				0,
				.7203
			],
			"73": [
				0,
				.69141,
				0,
				0,
				.55448
			],
			"74": [
				.12604,
				.69141,
				0,
				0,
				.55231
			],
			"75": [
				0,
				.69141,
				0,
				0,
				.66845
			],
			"76": [
				0,
				.69141,
				0,
				0,
				.66602
			],
			"77": [
				0,
				.69141,
				0,
				0,
				1.04953
			],
			"78": [
				0,
				.69141,
				0,
				0,
				.83212
			],
			"79": [
				0,
				.69141,
				0,
				0,
				.82699
			],
			"80": [
				.18906,
				.69141,
				0,
				0,
				.82753
			],
			"81": [
				.03781,
				.69141,
				0,
				0,
				.82699
			],
			"82": [
				0,
				.69141,
				0,
				0,
				.82807
			],
			"83": [
				0,
				.69141,
				0,
				0,
				.82861
			],
			"84": [
				0,
				.69141,
				0,
				0,
				.66899
			],
			"85": [
				0,
				.69141,
				0,
				0,
				.64576
			],
			"86": [
				0,
				.69141,
				0,
				0,
				.83131
			],
			"87": [
				0,
				.69141,
				0,
				0,
				1.04602
			],
			"88": [
				0,
				.69141,
				0,
				0,
				.71922
			],
			"89": [
				.18906,
				.69141,
				0,
				0,
				.83293
			],
			"90": [
				.12604,
				.69141,
				0,
				0,
				.60201
			],
			"91": [
				.24982,
				.74947,
				0,
				0,
				.27764
			],
			"93": [
				.24982,
				.74947,
				0,
				0,
				.27764
			],
			"94": [
				0,
				.69141,
				0,
				0,
				.49965
			],
			"97": [
				0,
				.47534,
				0,
				0,
				.50046
			],
			"98": [
				0,
				.69141,
				0,
				0,
				.51315
			],
			"99": [
				0,
				.47534,
				0,
				0,
				.38946
			],
			"100": [
				0,
				.62119,
				0,
				0,
				.49857
			],
			"101": [
				0,
				.47534,
				0,
				0,
				.40053
			],
			"102": [
				.18906,
				.69141,
				0,
				0,
				.32626
			],
			"103": [
				.18906,
				.47534,
				0,
				0,
				.5037
			],
			"104": [
				.18906,
				.69141,
				0,
				0,
				.52126
			],
			"105": [
				0,
				.69141,
				0,
				0,
				.27899
			],
			"106": [
				0,
				.69141,
				0,
				0,
				.28088
			],
			"107": [
				0,
				.69141,
				0,
				0,
				.38946
			],
			"108": [
				0,
				.69141,
				0,
				0,
				.27953
			],
			"109": [
				0,
				.47534,
				0,
				0,
				.76676
			],
			"110": [
				0,
				.47534,
				0,
				0,
				.52666
			],
			"111": [
				0,
				.47534,
				0,
				0,
				.48885
			],
			"112": [
				.18906,
				.52396,
				0,
				0,
				.50046
			],
			"113": [
				.18906,
				.47534,
				0,
				0,
				.48912
			],
			"114": [
				0,
				.47534,
				0,
				0,
				.38919
			],
			"115": [
				0,
				.47534,
				0,
				0,
				.44266
			],
			"116": [
				0,
				.62119,
				0,
				0,
				.33301
			],
			"117": [
				0,
				.47534,
				0,
				0,
				.5172
			],
			"118": [
				0,
				.52396,
				0,
				0,
				.5118
			],
			"119": [
				0,
				.52396,
				0,
				0,
				.77351
			],
			"120": [
				.18906,
				.47534,
				0,
				0,
				.38865
			],
			"121": [
				.18906,
				.47534,
				0,
				0,
				.49884
			],
			"122": [
				.18906,
				.47534,
				0,
				0,
				.39054
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"8216": [
				0,
				.69141,
				0,
				0,
				.21471
			],
			"8217": [
				0,
				.69141,
				0,
				0,
				.21471
			],
			"58112": [
				0,
				.62119,
				0,
				0,
				.49749
			],
			"58113": [
				0,
				.62119,
				0,
				0,
				.4983
			],
			"58114": [
				.18906,
				.69141,
				0,
				0,
				.33328
			],
			"58115": [
				.18906,
				.69141,
				0,
				0,
				.32923
			],
			"58116": [
				.18906,
				.47534,
				0,
				0,
				.50343
			],
			"58117": [
				0,
				.69141,
				0,
				0,
				.33301
			],
			"58118": [
				0,
				.62119,
				0,
				0,
				.33409
			],
			"58119": [
				0,
				.47534,
				0,
				0,
				.50073
			]
		},
		"Main-Bold": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69444,
				0,
				0,
				.35
			],
			"34": [
				0,
				.69444,
				0,
				0,
				.60278
			],
			"35": [
				.19444,
				.69444,
				0,
				0,
				.95833
			],
			"36": [
				.05556,
				.75,
				0,
				0,
				.575
			],
			"37": [
				.05556,
				.75,
				0,
				0,
				.95833
			],
			"38": [
				0,
				.69444,
				0,
				0,
				.89444
			],
			"39": [
				0,
				.69444,
				0,
				0,
				.31944
			],
			"40": [
				.25,
				.75,
				0,
				0,
				.44722
			],
			"41": [
				.25,
				.75,
				0,
				0,
				.44722
			],
			"42": [
				0,
				.75,
				0,
				0,
				.575
			],
			"43": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"44": [
				.19444,
				.15556,
				0,
				0,
				.31944
			],
			"45": [
				0,
				.44444,
				0,
				0,
				.38333
			],
			"46": [
				0,
				.15556,
				0,
				0,
				.31944
			],
			"47": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"48": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"49": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"50": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"51": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"52": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"53": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"54": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"55": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"56": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"57": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"58": [
				0,
				.44444,
				0,
				0,
				.31944
			],
			"59": [
				.19444,
				.44444,
				0,
				0,
				.31944
			],
			"60": [
				.08556,
				.58556,
				0,
				0,
				.89444
			],
			"61": [
				-.10889,
				.39111,
				0,
				0,
				.89444
			],
			"62": [
				.08556,
				.58556,
				0,
				0,
				.89444
			],
			"63": [
				0,
				.69444,
				0,
				0,
				.54305
			],
			"64": [
				0,
				.69444,
				0,
				0,
				.89444
			],
			"65": [
				0,
				.68611,
				0,
				0,
				.86944
			],
			"66": [
				0,
				.68611,
				0,
				0,
				.81805
			],
			"67": [
				0,
				.68611,
				0,
				0,
				.83055
			],
			"68": [
				0,
				.68611,
				0,
				0,
				.88194
			],
			"69": [
				0,
				.68611,
				0,
				0,
				.75555
			],
			"70": [
				0,
				.68611,
				0,
				0,
				.72361
			],
			"71": [
				0,
				.68611,
				0,
				0,
				.90416
			],
			"72": [
				0,
				.68611,
				0,
				0,
				.9
			],
			"73": [
				0,
				.68611,
				0,
				0,
				.43611
			],
			"74": [
				0,
				.68611,
				0,
				0,
				.59444
			],
			"75": [
				0,
				.68611,
				0,
				0,
				.90138
			],
			"76": [
				0,
				.68611,
				0,
				0,
				.69166
			],
			"77": [
				0,
				.68611,
				0,
				0,
				1.09166
			],
			"78": [
				0,
				.68611,
				0,
				0,
				.9
			],
			"79": [
				0,
				.68611,
				0,
				0,
				.86388
			],
			"80": [
				0,
				.68611,
				0,
				0,
				.78611
			],
			"81": [
				.19444,
				.68611,
				0,
				0,
				.86388
			],
			"82": [
				0,
				.68611,
				0,
				0,
				.8625
			],
			"83": [
				0,
				.68611,
				0,
				0,
				.63889
			],
			"84": [
				0,
				.68611,
				0,
				0,
				.8
			],
			"85": [
				0,
				.68611,
				0,
				0,
				.88472
			],
			"86": [
				0,
				.68611,
				.01597,
				0,
				.86944
			],
			"87": [
				0,
				.68611,
				.01597,
				0,
				1.18888
			],
			"88": [
				0,
				.68611,
				0,
				0,
				.86944
			],
			"89": [
				0,
				.68611,
				.02875,
				0,
				.86944
			],
			"90": [
				0,
				.68611,
				0,
				0,
				.70277
			],
			"91": [
				.25,
				.75,
				0,
				0,
				.31944
			],
			"92": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"93": [
				.25,
				.75,
				0,
				0,
				.31944
			],
			"94": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"95": [
				.31,
				.13444,
				.03194,
				0,
				.575
			],
			"97": [
				0,
				.44444,
				0,
				0,
				.55902
			],
			"98": [
				0,
				.69444,
				0,
				0,
				.63889
			],
			"99": [
				0,
				.44444,
				0,
				0,
				.51111
			],
			"100": [
				0,
				.69444,
				0,
				0,
				.63889
			],
			"101": [
				0,
				.44444,
				0,
				0,
				.52708
			],
			"102": [
				0,
				.69444,
				.10903,
				0,
				.35139
			],
			"103": [
				.19444,
				.44444,
				.01597,
				0,
				.575
			],
			"104": [
				0,
				.69444,
				0,
				0,
				.63889
			],
			"105": [
				0,
				.69444,
				0,
				0,
				.31944
			],
			"106": [
				.19444,
				.69444,
				0,
				0,
				.35139
			],
			"107": [
				0,
				.69444,
				0,
				0,
				.60694
			],
			"108": [
				0,
				.69444,
				0,
				0,
				.31944
			],
			"109": [
				0,
				.44444,
				0,
				0,
				.95833
			],
			"110": [
				0,
				.44444,
				0,
				0,
				.63889
			],
			"111": [
				0,
				.44444,
				0,
				0,
				.575
			],
			"112": [
				.19444,
				.44444,
				0,
				0,
				.63889
			],
			"113": [
				.19444,
				.44444,
				0,
				0,
				.60694
			],
			"114": [
				0,
				.44444,
				0,
				0,
				.47361
			],
			"115": [
				0,
				.44444,
				0,
				0,
				.45361
			],
			"116": [
				0,
				.63492,
				0,
				0,
				.44722
			],
			"117": [
				0,
				.44444,
				0,
				0,
				.63889
			],
			"118": [
				0,
				.44444,
				.01597,
				0,
				.60694
			],
			"119": [
				0,
				.44444,
				.01597,
				0,
				.83055
			],
			"120": [
				0,
				.44444,
				0,
				0,
				.60694
			],
			"121": [
				.19444,
				.44444,
				.01597,
				0,
				.60694
			],
			"122": [
				0,
				.44444,
				0,
				0,
				.51111
			],
			"123": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"124": [
				.25,
				.75,
				0,
				0,
				.31944
			],
			"125": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"126": [
				.35,
				.34444,
				0,
				0,
				.575
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"163": [
				0,
				.69444,
				0,
				0,
				.86853
			],
			"168": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"172": [
				0,
				.44444,
				0,
				0,
				.76666
			],
			"176": [
				0,
				.69444,
				0,
				0,
				.86944
			],
			"177": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"184": [
				.17014,
				0,
				0,
				0,
				.51111
			],
			"198": [
				0,
				.68611,
				0,
				0,
				1.04166
			],
			"215": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"216": [
				.04861,
				.73472,
				0,
				0,
				.89444
			],
			"223": [
				0,
				.69444,
				0,
				0,
				.59722
			],
			"230": [
				0,
				.44444,
				0,
				0,
				.83055
			],
			"247": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"248": [
				.09722,
				.54167,
				0,
				0,
				.575
			],
			"305": [
				0,
				.44444,
				0,
				0,
				.31944
			],
			"338": [
				0,
				.68611,
				0,
				0,
				1.16944
			],
			"339": [
				0,
				.44444,
				0,
				0,
				.89444
			],
			"567": [
				.19444,
				.44444,
				0,
				0,
				.35139
			],
			"710": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"711": [
				0,
				.63194,
				0,
				0,
				.575
			],
			"713": [
				0,
				.59611,
				0,
				0,
				.575
			],
			"714": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"715": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"728": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"729": [
				0,
				.69444,
				0,
				0,
				.31944
			],
			"730": [
				0,
				.69444,
				0,
				0,
				.86944
			],
			"732": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"733": [
				0,
				.69444,
				0,
				0,
				.575
			],
			"915": [
				0,
				.68611,
				0,
				0,
				.69166
			],
			"916": [
				0,
				.68611,
				0,
				0,
				.95833
			],
			"920": [
				0,
				.68611,
				0,
				0,
				.89444
			],
			"923": [
				0,
				.68611,
				0,
				0,
				.80555
			],
			"926": [
				0,
				.68611,
				0,
				0,
				.76666
			],
			"928": [
				0,
				.68611,
				0,
				0,
				.9
			],
			"931": [
				0,
				.68611,
				0,
				0,
				.83055
			],
			"933": [
				0,
				.68611,
				0,
				0,
				.89444
			],
			"934": [
				0,
				.68611,
				0,
				0,
				.83055
			],
			"936": [
				0,
				.68611,
				0,
				0,
				.89444
			],
			"937": [
				0,
				.68611,
				0,
				0,
				.83055
			],
			"8211": [
				0,
				.44444,
				.03194,
				0,
				.575
			],
			"8212": [
				0,
				.44444,
				.03194,
				0,
				1.14999
			],
			"8216": [
				0,
				.69444,
				0,
				0,
				.31944
			],
			"8217": [
				0,
				.69444,
				0,
				0,
				.31944
			],
			"8220": [
				0,
				.69444,
				0,
				0,
				.60278
			],
			"8221": [
				0,
				.69444,
				0,
				0,
				.60278
			],
			"8224": [
				.19444,
				.69444,
				0,
				0,
				.51111
			],
			"8225": [
				.19444,
				.69444,
				0,
				0,
				.51111
			],
			"8242": [
				0,
				.55556,
				0,
				0,
				.34444
			],
			"8407": [
				0,
				.72444,
				.15486,
				0,
				.575
			],
			"8463": [
				0,
				.69444,
				0,
				0,
				.66759
			],
			"8465": [
				0,
				.69444,
				0,
				0,
				.83055
			],
			"8467": [
				0,
				.69444,
				0,
				0,
				.47361
			],
			"8472": [
				.19444,
				.44444,
				0,
				0,
				.74027
			],
			"8476": [
				0,
				.69444,
				0,
				0,
				.83055
			],
			"8501": [
				0,
				.69444,
				0,
				0,
				.70277
			],
			"8592": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8593": [
				.19444,
				.69444,
				0,
				0,
				.575
			],
			"8594": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8595": [
				.19444,
				.69444,
				0,
				0,
				.575
			],
			"8596": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8597": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"8598": [
				.19444,
				.69444,
				0,
				0,
				1.14999
			],
			"8599": [
				.19444,
				.69444,
				0,
				0,
				1.14999
			],
			"8600": [
				.19444,
				.69444,
				0,
				0,
				1.14999
			],
			"8601": [
				.19444,
				.69444,
				0,
				0,
				1.14999
			],
			"8636": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8637": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8640": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8641": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8656": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8657": [
				.19444,
				.69444,
				0,
				0,
				.70277
			],
			"8658": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8659": [
				.19444,
				.69444,
				0,
				0,
				.70277
			],
			"8660": [
				-.10889,
				.39111,
				0,
				0,
				1.14999
			],
			"8661": [
				.25,
				.75,
				0,
				0,
				.70277
			],
			"8704": [
				0,
				.69444,
				0,
				0,
				.63889
			],
			"8706": [
				0,
				.69444,
				.06389,
				0,
				.62847
			],
			"8707": [
				0,
				.69444,
				0,
				0,
				.63889
			],
			"8709": [
				.05556,
				.75,
				0,
				0,
				.575
			],
			"8711": [
				0,
				.68611,
				0,
				0,
				.95833
			],
			"8712": [
				.08556,
				.58556,
				0,
				0,
				.76666
			],
			"8715": [
				.08556,
				.58556,
				0,
				0,
				.76666
			],
			"8722": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"8723": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"8725": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"8726": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"8727": [
				-.02778,
				.47222,
				0,
				0,
				.575
			],
			"8728": [
				-.02639,
				.47361,
				0,
				0,
				.575
			],
			"8729": [
				-.02639,
				.47361,
				0,
				0,
				.575
			],
			"8730": [
				.18,
				.82,
				0,
				0,
				.95833
			],
			"8733": [
				0,
				.44444,
				0,
				0,
				.89444
			],
			"8734": [
				0,
				.44444,
				0,
				0,
				1.14999
			],
			"8736": [
				0,
				.69224,
				0,
				0,
				.72222
			],
			"8739": [
				.25,
				.75,
				0,
				0,
				.31944
			],
			"8741": [
				.25,
				.75,
				0,
				0,
				.575
			],
			"8743": [
				0,
				.55556,
				0,
				0,
				.76666
			],
			"8744": [
				0,
				.55556,
				0,
				0,
				.76666
			],
			"8745": [
				0,
				.55556,
				0,
				0,
				.76666
			],
			"8746": [
				0,
				.55556,
				0,
				0,
				.76666
			],
			"8747": [
				.19444,
				.69444,
				.12778,
				0,
				.56875
			],
			"8764": [
				-.10889,
				.39111,
				0,
				0,
				.89444
			],
			"8768": [
				.19444,
				.69444,
				0,
				0,
				.31944
			],
			"8771": [
				.00222,
				.50222,
				0,
				0,
				.89444
			],
			"8773": [
				.027,
				.638,
				0,
				0,
				.894
			],
			"8776": [
				.02444,
				.52444,
				0,
				0,
				.89444
			],
			"8781": [
				.00222,
				.50222,
				0,
				0,
				.89444
			],
			"8801": [
				.00222,
				.50222,
				0,
				0,
				.89444
			],
			"8804": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"8805": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"8810": [
				.08556,
				.58556,
				0,
				0,
				1.14999
			],
			"8811": [
				.08556,
				.58556,
				0,
				0,
				1.14999
			],
			"8826": [
				.08556,
				.58556,
				0,
				0,
				.89444
			],
			"8827": [
				.08556,
				.58556,
				0,
				0,
				.89444
			],
			"8834": [
				.08556,
				.58556,
				0,
				0,
				.89444
			],
			"8835": [
				.08556,
				.58556,
				0,
				0,
				.89444
			],
			"8838": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"8839": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"8846": [
				0,
				.55556,
				0,
				0,
				.76666
			],
			"8849": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"8850": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"8851": [
				0,
				.55556,
				0,
				0,
				.76666
			],
			"8852": [
				0,
				.55556,
				0,
				0,
				.76666
			],
			"8853": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"8854": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"8855": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"8856": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"8857": [
				.13333,
				.63333,
				0,
				0,
				.89444
			],
			"8866": [
				0,
				.69444,
				0,
				0,
				.70277
			],
			"8867": [
				0,
				.69444,
				0,
				0,
				.70277
			],
			"8868": [
				0,
				.69444,
				0,
				0,
				.89444
			],
			"8869": [
				0,
				.69444,
				0,
				0,
				.89444
			],
			"8900": [
				-.02639,
				.47361,
				0,
				0,
				.575
			],
			"8901": [
				-.02639,
				.47361,
				0,
				0,
				.31944
			],
			"8902": [
				-.02778,
				.47222,
				0,
				0,
				.575
			],
			"8968": [
				.25,
				.75,
				0,
				0,
				.51111
			],
			"8969": [
				.25,
				.75,
				0,
				0,
				.51111
			],
			"8970": [
				.25,
				.75,
				0,
				0,
				.51111
			],
			"8971": [
				.25,
				.75,
				0,
				0,
				.51111
			],
			"8994": [
				-.13889,
				.36111,
				0,
				0,
				1.14999
			],
			"8995": [
				-.13889,
				.36111,
				0,
				0,
				1.14999
			],
			"9651": [
				.19444,
				.69444,
				0,
				0,
				1.02222
			],
			"9657": [
				-.02778,
				.47222,
				0,
				0,
				.575
			],
			"9661": [
				.19444,
				.69444,
				0,
				0,
				1.02222
			],
			"9667": [
				-.02778,
				.47222,
				0,
				0,
				.575
			],
			"9711": [
				.19444,
				.69444,
				0,
				0,
				1.14999
			],
			"9824": [
				.12963,
				.69444,
				0,
				0,
				.89444
			],
			"9825": [
				.12963,
				.69444,
				0,
				0,
				.89444
			],
			"9826": [
				.12963,
				.69444,
				0,
				0,
				.89444
			],
			"9827": [
				.12963,
				.69444,
				0,
				0,
				.89444
			],
			"9837": [
				0,
				.75,
				0,
				0,
				.44722
			],
			"9838": [
				.19444,
				.69444,
				0,
				0,
				.44722
			],
			"9839": [
				.19444,
				.69444,
				0,
				0,
				.44722
			],
			"10216": [
				.25,
				.75,
				0,
				0,
				.44722
			],
			"10217": [
				.25,
				.75,
				0,
				0,
				.44722
			],
			"10815": [
				0,
				.68611,
				0,
				0,
				.9
			],
			"10927": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"10928": [
				.19667,
				.69667,
				0,
				0,
				.89444
			],
			"57376": [
				.19444,
				.69444,
				0,
				0,
				0
			]
		},
		"Main-BoldItalic": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69444,
				.11417,
				0,
				.38611
			],
			"34": [
				0,
				.69444,
				.07939,
				0,
				.62055
			],
			"35": [
				.19444,
				.69444,
				.06833,
				0,
				.94444
			],
			"37": [
				.05556,
				.75,
				.12861,
				0,
				.94444
			],
			"38": [
				0,
				.69444,
				.08528,
				0,
				.88555
			],
			"39": [
				0,
				.69444,
				.12945,
				0,
				.35555
			],
			"40": [
				.25,
				.75,
				.15806,
				0,
				.47333
			],
			"41": [
				.25,
				.75,
				.03306,
				0,
				.47333
			],
			"42": [
				0,
				.75,
				.14333,
				0,
				.59111
			],
			"43": [
				.10333,
				.60333,
				.03306,
				0,
				.88555
			],
			"44": [
				.19444,
				.14722,
				0,
				0,
				.35555
			],
			"45": [
				0,
				.44444,
				.02611,
				0,
				.41444
			],
			"46": [
				0,
				.14722,
				0,
				0,
				.35555
			],
			"47": [
				.25,
				.75,
				.15806,
				0,
				.59111
			],
			"48": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"49": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"50": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"51": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"52": [
				.19444,
				.64444,
				.13167,
				0,
				.59111
			],
			"53": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"54": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"55": [
				.19444,
				.64444,
				.13167,
				0,
				.59111
			],
			"56": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"57": [
				0,
				.64444,
				.13167,
				0,
				.59111
			],
			"58": [
				0,
				.44444,
				.06695,
				0,
				.35555
			],
			"59": [
				.19444,
				.44444,
				.06695,
				0,
				.35555
			],
			"61": [
				-.10889,
				.39111,
				.06833,
				0,
				.88555
			],
			"63": [
				0,
				.69444,
				.11472,
				0,
				.59111
			],
			"64": [
				0,
				.69444,
				.09208,
				0,
				.88555
			],
			"65": [
				0,
				.68611,
				0,
				0,
				.86555
			],
			"66": [
				0,
				.68611,
				.0992,
				0,
				.81666
			],
			"67": [
				0,
				.68611,
				.14208,
				0,
				.82666
			],
			"68": [
				0,
				.68611,
				.09062,
				0,
				.87555
			],
			"69": [
				0,
				.68611,
				.11431,
				0,
				.75666
			],
			"70": [
				0,
				.68611,
				.12903,
				0,
				.72722
			],
			"71": [
				0,
				.68611,
				.07347,
				0,
				.89527
			],
			"72": [
				0,
				.68611,
				.17208,
				0,
				.8961
			],
			"73": [
				0,
				.68611,
				.15681,
				0,
				.47166
			],
			"74": [
				0,
				.68611,
				.145,
				0,
				.61055
			],
			"75": [
				0,
				.68611,
				.14208,
				0,
				.89499
			],
			"76": [
				0,
				.68611,
				0,
				0,
				.69777
			],
			"77": [
				0,
				.68611,
				.17208,
				0,
				1.07277
			],
			"78": [
				0,
				.68611,
				.17208,
				0,
				.8961
			],
			"79": [
				0,
				.68611,
				.09062,
				0,
				.85499
			],
			"80": [
				0,
				.68611,
				.0992,
				0,
				.78721
			],
			"81": [
				.19444,
				.68611,
				.09062,
				0,
				.85499
			],
			"82": [
				0,
				.68611,
				.02559,
				0,
				.85944
			],
			"83": [
				0,
				.68611,
				.11264,
				0,
				.64999
			],
			"84": [
				0,
				.68611,
				.12903,
				0,
				.7961
			],
			"85": [
				0,
				.68611,
				.17208,
				0,
				.88083
			],
			"86": [
				0,
				.68611,
				.18625,
				0,
				.86555
			],
			"87": [
				0,
				.68611,
				.18625,
				0,
				1.15999
			],
			"88": [
				0,
				.68611,
				.15681,
				0,
				.86555
			],
			"89": [
				0,
				.68611,
				.19803,
				0,
				.86555
			],
			"90": [
				0,
				.68611,
				.14208,
				0,
				.70888
			],
			"91": [
				.25,
				.75,
				.1875,
				0,
				.35611
			],
			"93": [
				.25,
				.75,
				.09972,
				0,
				.35611
			],
			"94": [
				0,
				.69444,
				.06709,
				0,
				.59111
			],
			"95": [
				.31,
				.13444,
				.09811,
				0,
				.59111
			],
			"97": [
				0,
				.44444,
				.09426,
				0,
				.59111
			],
			"98": [
				0,
				.69444,
				.07861,
				0,
				.53222
			],
			"99": [
				0,
				.44444,
				.05222,
				0,
				.53222
			],
			"100": [
				0,
				.69444,
				.10861,
				0,
				.59111
			],
			"101": [
				0,
				.44444,
				.085,
				0,
				.53222
			],
			"102": [
				.19444,
				.69444,
				.21778,
				0,
				.4
			],
			"103": [
				.19444,
				.44444,
				.105,
				0,
				.53222
			],
			"104": [
				0,
				.69444,
				.09426,
				0,
				.59111
			],
			"105": [
				0,
				.69326,
				.11387,
				0,
				.35555
			],
			"106": [
				.19444,
				.69326,
				.1672,
				0,
				.35555
			],
			"107": [
				0,
				.69444,
				.11111,
				0,
				.53222
			],
			"108": [
				0,
				.69444,
				.10861,
				0,
				.29666
			],
			"109": [
				0,
				.44444,
				.09426,
				0,
				.94444
			],
			"110": [
				0,
				.44444,
				.09426,
				0,
				.64999
			],
			"111": [
				0,
				.44444,
				.07861,
				0,
				.59111
			],
			"112": [
				.19444,
				.44444,
				.07861,
				0,
				.59111
			],
			"113": [
				.19444,
				.44444,
				.105,
				0,
				.53222
			],
			"114": [
				0,
				.44444,
				.11111,
				0,
				.50167
			],
			"115": [
				0,
				.44444,
				.08167,
				0,
				.48694
			],
			"116": [
				0,
				.63492,
				.09639,
				0,
				.385
			],
			"117": [
				0,
				.44444,
				.09426,
				0,
				.62055
			],
			"118": [
				0,
				.44444,
				.11111,
				0,
				.53222
			],
			"119": [
				0,
				.44444,
				.11111,
				0,
				.76777
			],
			"120": [
				0,
				.44444,
				.12583,
				0,
				.56055
			],
			"121": [
				.19444,
				.44444,
				.105,
				0,
				.56166
			],
			"122": [
				0,
				.44444,
				.13889,
				0,
				.49055
			],
			"126": [
				.35,
				.34444,
				.11472,
				0,
				.59111
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"168": [
				0,
				.69444,
				.11473,
				0,
				.59111
			],
			"176": [
				0,
				.69444,
				0,
				0,
				.94888
			],
			"184": [
				.17014,
				0,
				0,
				0,
				.53222
			],
			"198": [
				0,
				.68611,
				.11431,
				0,
				1.02277
			],
			"216": [
				.04861,
				.73472,
				.09062,
				0,
				.88555
			],
			"223": [
				.19444,
				.69444,
				.09736,
				0,
				.665
			],
			"230": [
				0,
				.44444,
				.085,
				0,
				.82666
			],
			"248": [
				.09722,
				.54167,
				.09458,
				0,
				.59111
			],
			"305": [
				0,
				.44444,
				.09426,
				0,
				.35555
			],
			"338": [
				0,
				.68611,
				.11431,
				0,
				1.14054
			],
			"339": [
				0,
				.44444,
				.085,
				0,
				.82666
			],
			"567": [
				.19444,
				.44444,
				.04611,
				0,
				.385
			],
			"710": [
				0,
				.69444,
				.06709,
				0,
				.59111
			],
			"711": [
				0,
				.63194,
				.08271,
				0,
				.59111
			],
			"713": [
				0,
				.59444,
				.10444,
				0,
				.59111
			],
			"714": [
				0,
				.69444,
				.08528,
				0,
				.59111
			],
			"715": [
				0,
				.69444,
				0,
				0,
				.59111
			],
			"728": [
				0,
				.69444,
				.10333,
				0,
				.59111
			],
			"729": [
				0,
				.69444,
				.12945,
				0,
				.35555
			],
			"730": [
				0,
				.69444,
				0,
				0,
				.94888
			],
			"732": [
				0,
				.69444,
				.11472,
				0,
				.59111
			],
			"733": [
				0,
				.69444,
				.11472,
				0,
				.59111
			],
			"915": [
				0,
				.68611,
				.12903,
				0,
				.69777
			],
			"916": [
				0,
				.68611,
				0,
				0,
				.94444
			],
			"920": [
				0,
				.68611,
				.09062,
				0,
				.88555
			],
			"923": [
				0,
				.68611,
				0,
				0,
				.80666
			],
			"926": [
				0,
				.68611,
				.15092,
				0,
				.76777
			],
			"928": [
				0,
				.68611,
				.17208,
				0,
				.8961
			],
			"931": [
				0,
				.68611,
				.11431,
				0,
				.82666
			],
			"933": [
				0,
				.68611,
				.10778,
				0,
				.88555
			],
			"934": [
				0,
				.68611,
				.05632,
				0,
				.82666
			],
			"936": [
				0,
				.68611,
				.10778,
				0,
				.88555
			],
			"937": [
				0,
				.68611,
				.0992,
				0,
				.82666
			],
			"8211": [
				0,
				.44444,
				.09811,
				0,
				.59111
			],
			"8212": [
				0,
				.44444,
				.09811,
				0,
				1.18221
			],
			"8216": [
				0,
				.69444,
				.12945,
				0,
				.35555
			],
			"8217": [
				0,
				.69444,
				.12945,
				0,
				.35555
			],
			"8220": [
				0,
				.69444,
				.16772,
				0,
				.62055
			],
			"8221": [
				0,
				.69444,
				.07939,
				0,
				.62055
			]
		},
		"Main-Italic": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69444,
				.12417,
				0,
				.30667
			],
			"34": [
				0,
				.69444,
				.06961,
				0,
				.51444
			],
			"35": [
				.19444,
				.69444,
				.06616,
				0,
				.81777
			],
			"37": [
				.05556,
				.75,
				.13639,
				0,
				.81777
			],
			"38": [
				0,
				.69444,
				.09694,
				0,
				.76666
			],
			"39": [
				0,
				.69444,
				.12417,
				0,
				.30667
			],
			"40": [
				.25,
				.75,
				.16194,
				0,
				.40889
			],
			"41": [
				.25,
				.75,
				.03694,
				0,
				.40889
			],
			"42": [
				0,
				.75,
				.14917,
				0,
				.51111
			],
			"43": [
				.05667,
				.56167,
				.03694,
				0,
				.76666
			],
			"44": [
				.19444,
				.10556,
				0,
				0,
				.30667
			],
			"45": [
				0,
				.43056,
				.02826,
				0,
				.35778
			],
			"46": [
				0,
				.10556,
				0,
				0,
				.30667
			],
			"47": [
				.25,
				.75,
				.16194,
				0,
				.51111
			],
			"48": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"49": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"50": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"51": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"52": [
				.19444,
				.64444,
				.13556,
				0,
				.51111
			],
			"53": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"54": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"55": [
				.19444,
				.64444,
				.13556,
				0,
				.51111
			],
			"56": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"57": [
				0,
				.64444,
				.13556,
				0,
				.51111
			],
			"58": [
				0,
				.43056,
				.0582,
				0,
				.30667
			],
			"59": [
				.19444,
				.43056,
				.0582,
				0,
				.30667
			],
			"61": [
				-.13313,
				.36687,
				.06616,
				0,
				.76666
			],
			"63": [
				0,
				.69444,
				.1225,
				0,
				.51111
			],
			"64": [
				0,
				.69444,
				.09597,
				0,
				.76666
			],
			"65": [
				0,
				.68333,
				0,
				0,
				.74333
			],
			"66": [
				0,
				.68333,
				.10257,
				0,
				.70389
			],
			"67": [
				0,
				.68333,
				.14528,
				0,
				.71555
			],
			"68": [
				0,
				.68333,
				.09403,
				0,
				.755
			],
			"69": [
				0,
				.68333,
				.12028,
				0,
				.67833
			],
			"70": [
				0,
				.68333,
				.13305,
				0,
				.65277
			],
			"71": [
				0,
				.68333,
				.08722,
				0,
				.77361
			],
			"72": [
				0,
				.68333,
				.16389,
				0,
				.74333
			],
			"73": [
				0,
				.68333,
				.15806,
				0,
				.38555
			],
			"74": [
				0,
				.68333,
				.14028,
				0,
				.525
			],
			"75": [
				0,
				.68333,
				.14528,
				0,
				.76888
			],
			"76": [
				0,
				.68333,
				0,
				0,
				.62722
			],
			"77": [
				0,
				.68333,
				.16389,
				0,
				.89666
			],
			"78": [
				0,
				.68333,
				.16389,
				0,
				.74333
			],
			"79": [
				0,
				.68333,
				.09403,
				0,
				.76666
			],
			"80": [
				0,
				.68333,
				.10257,
				0,
				.67833
			],
			"81": [
				.19444,
				.68333,
				.09403,
				0,
				.76666
			],
			"82": [
				0,
				.68333,
				.03868,
				0,
				.72944
			],
			"83": [
				0,
				.68333,
				.11972,
				0,
				.56222
			],
			"84": [
				0,
				.68333,
				.13305,
				0,
				.71555
			],
			"85": [
				0,
				.68333,
				.16389,
				0,
				.74333
			],
			"86": [
				0,
				.68333,
				.18361,
				0,
				.74333
			],
			"87": [
				0,
				.68333,
				.18361,
				0,
				.99888
			],
			"88": [
				0,
				.68333,
				.15806,
				0,
				.74333
			],
			"89": [
				0,
				.68333,
				.19383,
				0,
				.74333
			],
			"90": [
				0,
				.68333,
				.14528,
				0,
				.61333
			],
			"91": [
				.25,
				.75,
				.1875,
				0,
				.30667
			],
			"93": [
				.25,
				.75,
				.10528,
				0,
				.30667
			],
			"94": [
				0,
				.69444,
				.06646,
				0,
				.51111
			],
			"95": [
				.31,
				.12056,
				.09208,
				0,
				.51111
			],
			"97": [
				0,
				.43056,
				.07671,
				0,
				.51111
			],
			"98": [
				0,
				.69444,
				.06312,
				0,
				.46
			],
			"99": [
				0,
				.43056,
				.05653,
				0,
				.46
			],
			"100": [
				0,
				.69444,
				.10333,
				0,
				.51111
			],
			"101": [
				0,
				.43056,
				.07514,
				0,
				.46
			],
			"102": [
				.19444,
				.69444,
				.21194,
				0,
				.30667
			],
			"103": [
				.19444,
				.43056,
				.08847,
				0,
				.46
			],
			"104": [
				0,
				.69444,
				.07671,
				0,
				.51111
			],
			"105": [
				0,
				.65536,
				.1019,
				0,
				.30667
			],
			"106": [
				.19444,
				.65536,
				.14467,
				0,
				.30667
			],
			"107": [
				0,
				.69444,
				.10764,
				0,
				.46
			],
			"108": [
				0,
				.69444,
				.10333,
				0,
				.25555
			],
			"109": [
				0,
				.43056,
				.07671,
				0,
				.81777
			],
			"110": [
				0,
				.43056,
				.07671,
				0,
				.56222
			],
			"111": [
				0,
				.43056,
				.06312,
				0,
				.51111
			],
			"112": [
				.19444,
				.43056,
				.06312,
				0,
				.51111
			],
			"113": [
				.19444,
				.43056,
				.08847,
				0,
				.46
			],
			"114": [
				0,
				.43056,
				.10764,
				0,
				.42166
			],
			"115": [
				0,
				.43056,
				.08208,
				0,
				.40889
			],
			"116": [
				0,
				.61508,
				.09486,
				0,
				.33222
			],
			"117": [
				0,
				.43056,
				.07671,
				0,
				.53666
			],
			"118": [
				0,
				.43056,
				.10764,
				0,
				.46
			],
			"119": [
				0,
				.43056,
				.10764,
				0,
				.66444
			],
			"120": [
				0,
				.43056,
				.12042,
				0,
				.46389
			],
			"121": [
				.19444,
				.43056,
				.08847,
				0,
				.48555
			],
			"122": [
				0,
				.43056,
				.12292,
				0,
				.40889
			],
			"126": [
				.35,
				.31786,
				.11585,
				0,
				.51111
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"168": [
				0,
				.66786,
				.10474,
				0,
				.51111
			],
			"176": [
				0,
				.69444,
				0,
				0,
				.83129
			],
			"184": [
				.17014,
				0,
				0,
				0,
				.46
			],
			"198": [
				0,
				.68333,
				.12028,
				0,
				.88277
			],
			"216": [
				.04861,
				.73194,
				.09403,
				0,
				.76666
			],
			"223": [
				.19444,
				.69444,
				.10514,
				0,
				.53666
			],
			"230": [
				0,
				.43056,
				.07514,
				0,
				.71555
			],
			"248": [
				.09722,
				.52778,
				.09194,
				0,
				.51111
			],
			"338": [
				0,
				.68333,
				.12028,
				0,
				.98499
			],
			"339": [
				0,
				.43056,
				.07514,
				0,
				.71555
			],
			"710": [
				0,
				.69444,
				.06646,
				0,
				.51111
			],
			"711": [
				0,
				.62847,
				.08295,
				0,
				.51111
			],
			"713": [
				0,
				.56167,
				.10333,
				0,
				.51111
			],
			"714": [
				0,
				.69444,
				.09694,
				0,
				.51111
			],
			"715": [
				0,
				.69444,
				0,
				0,
				.51111
			],
			"728": [
				0,
				.69444,
				.10806,
				0,
				.51111
			],
			"729": [
				0,
				.66786,
				.11752,
				0,
				.30667
			],
			"730": [
				0,
				.69444,
				0,
				0,
				.83129
			],
			"732": [
				0,
				.66786,
				.11585,
				0,
				.51111
			],
			"733": [
				0,
				.69444,
				.1225,
				0,
				.51111
			],
			"915": [
				0,
				.68333,
				.13305,
				0,
				.62722
			],
			"916": [
				0,
				.68333,
				0,
				0,
				.81777
			],
			"920": [
				0,
				.68333,
				.09403,
				0,
				.76666
			],
			"923": [
				0,
				.68333,
				0,
				0,
				.69222
			],
			"926": [
				0,
				.68333,
				.15294,
				0,
				.66444
			],
			"928": [
				0,
				.68333,
				.16389,
				0,
				.74333
			],
			"931": [
				0,
				.68333,
				.12028,
				0,
				.71555
			],
			"933": [
				0,
				.68333,
				.11111,
				0,
				.76666
			],
			"934": [
				0,
				.68333,
				.05986,
				0,
				.71555
			],
			"936": [
				0,
				.68333,
				.11111,
				0,
				.76666
			],
			"937": [
				0,
				.68333,
				.10257,
				0,
				.71555
			],
			"8211": [
				0,
				.43056,
				.09208,
				0,
				.51111
			],
			"8212": [
				0,
				.43056,
				.09208,
				0,
				1.02222
			],
			"8216": [
				0,
				.69444,
				.12417,
				0,
				.30667
			],
			"8217": [
				0,
				.69444,
				.12417,
				0,
				.30667
			],
			"8220": [
				0,
				.69444,
				.1685,
				0,
				.51444
			],
			"8221": [
				0,
				.69444,
				.06961,
				0,
				.51444
			],
			"8463": [
				0,
				.68889,
				0,
				0,
				.54028
			]
		},
		"Main-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"34": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"35": [
				.19444,
				.69444,
				0,
				0,
				.83334
			],
			"36": [
				.05556,
				.75,
				0,
				0,
				.5
			],
			"37": [
				.05556,
				.75,
				0,
				0,
				.83334
			],
			"38": [
				0,
				.69444,
				0,
				0,
				.77778
			],
			"39": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"40": [
				.25,
				.75,
				0,
				0,
				.38889
			],
			"41": [
				.25,
				.75,
				0,
				0,
				.38889
			],
			"42": [
				0,
				.75,
				0,
				0,
				.5
			],
			"43": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"44": [
				.19444,
				.10556,
				0,
				0,
				.27778
			],
			"45": [
				0,
				.43056,
				0,
				0,
				.33333
			],
			"46": [
				0,
				.10556,
				0,
				0,
				.27778
			],
			"47": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"48": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"49": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"50": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"51": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"52": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"53": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"54": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"55": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"56": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"57": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"58": [
				0,
				.43056,
				0,
				0,
				.27778
			],
			"59": [
				.19444,
				.43056,
				0,
				0,
				.27778
			],
			"60": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"61": [
				-.13313,
				.36687,
				0,
				0,
				.77778
			],
			"62": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"63": [
				0,
				.69444,
				0,
				0,
				.47222
			],
			"64": [
				0,
				.69444,
				0,
				0,
				.77778
			],
			"65": [
				0,
				.68333,
				0,
				0,
				.75
			],
			"66": [
				0,
				.68333,
				0,
				0,
				.70834
			],
			"67": [
				0,
				.68333,
				0,
				0,
				.72222
			],
			"68": [
				0,
				.68333,
				0,
				0,
				.76389
			],
			"69": [
				0,
				.68333,
				0,
				0,
				.68056
			],
			"70": [
				0,
				.68333,
				0,
				0,
				.65278
			],
			"71": [
				0,
				.68333,
				0,
				0,
				.78472
			],
			"72": [
				0,
				.68333,
				0,
				0,
				.75
			],
			"73": [
				0,
				.68333,
				0,
				0,
				.36111
			],
			"74": [
				0,
				.68333,
				0,
				0,
				.51389
			],
			"75": [
				0,
				.68333,
				0,
				0,
				.77778
			],
			"76": [
				0,
				.68333,
				0,
				0,
				.625
			],
			"77": [
				0,
				.68333,
				0,
				0,
				.91667
			],
			"78": [
				0,
				.68333,
				0,
				0,
				.75
			],
			"79": [
				0,
				.68333,
				0,
				0,
				.77778
			],
			"80": [
				0,
				.68333,
				0,
				0,
				.68056
			],
			"81": [
				.19444,
				.68333,
				0,
				0,
				.77778
			],
			"82": [
				0,
				.68333,
				0,
				0,
				.73611
			],
			"83": [
				0,
				.68333,
				0,
				0,
				.55556
			],
			"84": [
				0,
				.68333,
				0,
				0,
				.72222
			],
			"85": [
				0,
				.68333,
				0,
				0,
				.75
			],
			"86": [
				0,
				.68333,
				.01389,
				0,
				.75
			],
			"87": [
				0,
				.68333,
				.01389,
				0,
				1.02778
			],
			"88": [
				0,
				.68333,
				0,
				0,
				.75
			],
			"89": [
				0,
				.68333,
				.025,
				0,
				.75
			],
			"90": [
				0,
				.68333,
				0,
				0,
				.61111
			],
			"91": [
				.25,
				.75,
				0,
				0,
				.27778
			],
			"92": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"93": [
				.25,
				.75,
				0,
				0,
				.27778
			],
			"94": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"95": [
				.31,
				.12056,
				.02778,
				0,
				.5
			],
			"97": [
				0,
				.43056,
				0,
				0,
				.5
			],
			"98": [
				0,
				.69444,
				0,
				0,
				.55556
			],
			"99": [
				0,
				.43056,
				0,
				0,
				.44445
			],
			"100": [
				0,
				.69444,
				0,
				0,
				.55556
			],
			"101": [
				0,
				.43056,
				0,
				0,
				.44445
			],
			"102": [
				0,
				.69444,
				.07778,
				0,
				.30556
			],
			"103": [
				.19444,
				.43056,
				.01389,
				0,
				.5
			],
			"104": [
				0,
				.69444,
				0,
				0,
				.55556
			],
			"105": [
				0,
				.66786,
				0,
				0,
				.27778
			],
			"106": [
				.19444,
				.66786,
				0,
				0,
				.30556
			],
			"107": [
				0,
				.69444,
				0,
				0,
				.52778
			],
			"108": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"109": [
				0,
				.43056,
				0,
				0,
				.83334
			],
			"110": [
				0,
				.43056,
				0,
				0,
				.55556
			],
			"111": [
				0,
				.43056,
				0,
				0,
				.5
			],
			"112": [
				.19444,
				.43056,
				0,
				0,
				.55556
			],
			"113": [
				.19444,
				.43056,
				0,
				0,
				.52778
			],
			"114": [
				0,
				.43056,
				0,
				0,
				.39167
			],
			"115": [
				0,
				.43056,
				0,
				0,
				.39445
			],
			"116": [
				0,
				.61508,
				0,
				0,
				.38889
			],
			"117": [
				0,
				.43056,
				0,
				0,
				.55556
			],
			"118": [
				0,
				.43056,
				.01389,
				0,
				.52778
			],
			"119": [
				0,
				.43056,
				.01389,
				0,
				.72222
			],
			"120": [
				0,
				.43056,
				0,
				0,
				.52778
			],
			"121": [
				.19444,
				.43056,
				.01389,
				0,
				.52778
			],
			"122": [
				0,
				.43056,
				0,
				0,
				.44445
			],
			"123": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"124": [
				.25,
				.75,
				0,
				0,
				.27778
			],
			"125": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"126": [
				.35,
				.31786,
				0,
				0,
				.5
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"163": [
				0,
				.69444,
				0,
				0,
				.76909
			],
			"167": [
				.19444,
				.69444,
				0,
				0,
				.44445
			],
			"168": [
				0,
				.66786,
				0,
				0,
				.5
			],
			"172": [
				0,
				.43056,
				0,
				0,
				.66667
			],
			"176": [
				0,
				.69444,
				0,
				0,
				.75
			],
			"177": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"182": [
				.19444,
				.69444,
				0,
				0,
				.61111
			],
			"184": [
				.17014,
				0,
				0,
				0,
				.44445
			],
			"198": [
				0,
				.68333,
				0,
				0,
				.90278
			],
			"215": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"216": [
				.04861,
				.73194,
				0,
				0,
				.77778
			],
			"223": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"230": [
				0,
				.43056,
				0,
				0,
				.72222
			],
			"247": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"248": [
				.09722,
				.52778,
				0,
				0,
				.5
			],
			"305": [
				0,
				.43056,
				0,
				0,
				.27778
			],
			"338": [
				0,
				.68333,
				0,
				0,
				1.01389
			],
			"339": [
				0,
				.43056,
				0,
				0,
				.77778
			],
			"567": [
				.19444,
				.43056,
				0,
				0,
				.30556
			],
			"710": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"711": [
				0,
				.62847,
				0,
				0,
				.5
			],
			"713": [
				0,
				.56778,
				0,
				0,
				.5
			],
			"714": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"715": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"728": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"729": [
				0,
				.66786,
				0,
				0,
				.27778
			],
			"730": [
				0,
				.69444,
				0,
				0,
				.75
			],
			"732": [
				0,
				.66786,
				0,
				0,
				.5
			],
			"733": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"915": [
				0,
				.68333,
				0,
				0,
				.625
			],
			"916": [
				0,
				.68333,
				0,
				0,
				.83334
			],
			"920": [
				0,
				.68333,
				0,
				0,
				.77778
			],
			"923": [
				0,
				.68333,
				0,
				0,
				.69445
			],
			"926": [
				0,
				.68333,
				0,
				0,
				.66667
			],
			"928": [
				0,
				.68333,
				0,
				0,
				.75
			],
			"931": [
				0,
				.68333,
				0,
				0,
				.72222
			],
			"933": [
				0,
				.68333,
				0,
				0,
				.77778
			],
			"934": [
				0,
				.68333,
				0,
				0,
				.72222
			],
			"936": [
				0,
				.68333,
				0,
				0,
				.77778
			],
			"937": [
				0,
				.68333,
				0,
				0,
				.72222
			],
			"8211": [
				0,
				.43056,
				.02778,
				0,
				.5
			],
			"8212": [
				0,
				.43056,
				.02778,
				0,
				1
			],
			"8216": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"8217": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"8220": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"8221": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"8224": [
				.19444,
				.69444,
				0,
				0,
				.44445
			],
			"8225": [
				.19444,
				.69444,
				0,
				0,
				.44445
			],
			"8230": [
				0,
				.123,
				0,
				0,
				1.172
			],
			"8242": [
				0,
				.55556,
				0,
				0,
				.275
			],
			"8407": [
				0,
				.71444,
				.15382,
				0,
				.5
			],
			"8463": [
				0,
				.68889,
				0,
				0,
				.54028
			],
			"8465": [
				0,
				.69444,
				0,
				0,
				.72222
			],
			"8467": [
				0,
				.69444,
				0,
				.11111,
				.41667
			],
			"8472": [
				.19444,
				.43056,
				0,
				.11111,
				.63646
			],
			"8476": [
				0,
				.69444,
				0,
				0,
				.72222
			],
			"8501": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"8592": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8593": [
				.19444,
				.69444,
				0,
				0,
				.5
			],
			"8594": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8595": [
				.19444,
				.69444,
				0,
				0,
				.5
			],
			"8596": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8597": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"8598": [
				.19444,
				.69444,
				0,
				0,
				1
			],
			"8599": [
				.19444,
				.69444,
				0,
				0,
				1
			],
			"8600": [
				.19444,
				.69444,
				0,
				0,
				1
			],
			"8601": [
				.19444,
				.69444,
				0,
				0,
				1
			],
			"8614": [
				.011,
				.511,
				0,
				0,
				1
			],
			"8617": [
				.011,
				.511,
				0,
				0,
				1.126
			],
			"8618": [
				.011,
				.511,
				0,
				0,
				1.126
			],
			"8636": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8637": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8640": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8641": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8652": [
				.011,
				.671,
				0,
				0,
				1
			],
			"8656": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8657": [
				.19444,
				.69444,
				0,
				0,
				.61111
			],
			"8658": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8659": [
				.19444,
				.69444,
				0,
				0,
				.61111
			],
			"8660": [
				-.13313,
				.36687,
				0,
				0,
				1
			],
			"8661": [
				.25,
				.75,
				0,
				0,
				.61111
			],
			"8704": [
				0,
				.69444,
				0,
				0,
				.55556
			],
			"8706": [
				0,
				.69444,
				.05556,
				.08334,
				.5309
			],
			"8707": [
				0,
				.69444,
				0,
				0,
				.55556
			],
			"8709": [
				.05556,
				.75,
				0,
				0,
				.5
			],
			"8711": [
				0,
				.68333,
				0,
				0,
				.83334
			],
			"8712": [
				.0391,
				.5391,
				0,
				0,
				.66667
			],
			"8715": [
				.0391,
				.5391,
				0,
				0,
				.66667
			],
			"8722": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"8723": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"8725": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"8726": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"8727": [
				-.03472,
				.46528,
				0,
				0,
				.5
			],
			"8728": [
				-.05555,
				.44445,
				0,
				0,
				.5
			],
			"8729": [
				-.05555,
				.44445,
				0,
				0,
				.5
			],
			"8730": [
				.2,
				.8,
				0,
				0,
				.83334
			],
			"8733": [
				0,
				.43056,
				0,
				0,
				.77778
			],
			"8734": [
				0,
				.43056,
				0,
				0,
				1
			],
			"8736": [
				0,
				.69224,
				0,
				0,
				.72222
			],
			"8739": [
				.25,
				.75,
				0,
				0,
				.27778
			],
			"8741": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"8743": [
				0,
				.55556,
				0,
				0,
				.66667
			],
			"8744": [
				0,
				.55556,
				0,
				0,
				.66667
			],
			"8745": [
				0,
				.55556,
				0,
				0,
				.66667
			],
			"8746": [
				0,
				.55556,
				0,
				0,
				.66667
			],
			"8747": [
				.19444,
				.69444,
				.11111,
				0,
				.41667
			],
			"8764": [
				-.13313,
				.36687,
				0,
				0,
				.77778
			],
			"8768": [
				.19444,
				.69444,
				0,
				0,
				.27778
			],
			"8771": [
				-.03625,
				.46375,
				0,
				0,
				.77778
			],
			"8773": [
				-.022,
				.589,
				0,
				0,
				.778
			],
			"8776": [
				-.01688,
				.48312,
				0,
				0,
				.77778
			],
			"8781": [
				-.03625,
				.46375,
				0,
				0,
				.77778
			],
			"8784": [
				-.133,
				.673,
				0,
				0,
				.778
			],
			"8801": [
				-.03625,
				.46375,
				0,
				0,
				.77778
			],
			"8804": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8805": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8810": [
				.0391,
				.5391,
				0,
				0,
				1
			],
			"8811": [
				.0391,
				.5391,
				0,
				0,
				1
			],
			"8826": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"8827": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"8834": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"8835": [
				.0391,
				.5391,
				0,
				0,
				.77778
			],
			"8838": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8839": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8846": [
				0,
				.55556,
				0,
				0,
				.66667
			],
			"8849": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8850": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"8851": [
				0,
				.55556,
				0,
				0,
				.66667
			],
			"8852": [
				0,
				.55556,
				0,
				0,
				.66667
			],
			"8853": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"8854": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"8855": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"8856": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"8857": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"8866": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"8867": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"8868": [
				0,
				.69444,
				0,
				0,
				.77778
			],
			"8869": [
				0,
				.69444,
				0,
				0,
				.77778
			],
			"8872": [
				.249,
				.75,
				0,
				0,
				.867
			],
			"8900": [
				-.05555,
				.44445,
				0,
				0,
				.5
			],
			"8901": [
				-.05555,
				.44445,
				0,
				0,
				.27778
			],
			"8902": [
				-.03472,
				.46528,
				0,
				0,
				.5
			],
			"8904": [
				.005,
				.505,
				0,
				0,
				.9
			],
			"8942": [
				.03,
				.903,
				0,
				0,
				.278
			],
			"8943": [
				-.19,
				.313,
				0,
				0,
				1.172
			],
			"8945": [
				-.1,
				.823,
				0,
				0,
				1.282
			],
			"8968": [
				.25,
				.75,
				0,
				0,
				.44445
			],
			"8969": [
				.25,
				.75,
				0,
				0,
				.44445
			],
			"8970": [
				.25,
				.75,
				0,
				0,
				.44445
			],
			"8971": [
				.25,
				.75,
				0,
				0,
				.44445
			],
			"8994": [
				-.14236,
				.35764,
				0,
				0,
				1
			],
			"8995": [
				-.14236,
				.35764,
				0,
				0,
				1
			],
			"9136": [
				.244,
				.744,
				0,
				0,
				.412
			],
			"9137": [
				.244,
				.745,
				0,
				0,
				.412
			],
			"9651": [
				.19444,
				.69444,
				0,
				0,
				.88889
			],
			"9657": [
				-.03472,
				.46528,
				0,
				0,
				.5
			],
			"9661": [
				.19444,
				.69444,
				0,
				0,
				.88889
			],
			"9667": [
				-.03472,
				.46528,
				0,
				0,
				.5
			],
			"9711": [
				.19444,
				.69444,
				0,
				0,
				1
			],
			"9824": [
				.12963,
				.69444,
				0,
				0,
				.77778
			],
			"9825": [
				.12963,
				.69444,
				0,
				0,
				.77778
			],
			"9826": [
				.12963,
				.69444,
				0,
				0,
				.77778
			],
			"9827": [
				.12963,
				.69444,
				0,
				0,
				.77778
			],
			"9837": [
				0,
				.75,
				0,
				0,
				.38889
			],
			"9838": [
				.19444,
				.69444,
				0,
				0,
				.38889
			],
			"9839": [
				.19444,
				.69444,
				0,
				0,
				.38889
			],
			"10216": [
				.25,
				.75,
				0,
				0,
				.38889
			],
			"10217": [
				.25,
				.75,
				0,
				0,
				.38889
			],
			"10222": [
				.244,
				.744,
				0,
				0,
				.412
			],
			"10223": [
				.244,
				.745,
				0,
				0,
				.412
			],
			"10229": [
				.011,
				.511,
				0,
				0,
				1.609
			],
			"10230": [
				.011,
				.511,
				0,
				0,
				1.638
			],
			"10231": [
				.011,
				.511,
				0,
				0,
				1.859
			],
			"10232": [
				.024,
				.525,
				0,
				0,
				1.609
			],
			"10233": [
				.024,
				.525,
				0,
				0,
				1.638
			],
			"10234": [
				.024,
				.525,
				0,
				0,
				1.858
			],
			"10236": [
				.011,
				.511,
				0,
				0,
				1.638
			],
			"10815": [
				0,
				.68333,
				0,
				0,
				.75
			],
			"10927": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"10928": [
				.13597,
				.63597,
				0,
				0,
				.77778
			],
			"57376": [
				.19444,
				.69444,
				0,
				0,
				0
			]
		},
		"Math-BoldItalic": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"48": [
				0,
				.44444,
				0,
				0,
				.575
			],
			"49": [
				0,
				.44444,
				0,
				0,
				.575
			],
			"50": [
				0,
				.44444,
				0,
				0,
				.575
			],
			"51": [
				.19444,
				.44444,
				0,
				0,
				.575
			],
			"52": [
				.19444,
				.44444,
				0,
				0,
				.575
			],
			"53": [
				.19444,
				.44444,
				0,
				0,
				.575
			],
			"54": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"55": [
				.19444,
				.44444,
				0,
				0,
				.575
			],
			"56": [
				0,
				.64444,
				0,
				0,
				.575
			],
			"57": [
				.19444,
				.44444,
				0,
				0,
				.575
			],
			"65": [
				0,
				.68611,
				0,
				0,
				.86944
			],
			"66": [
				0,
				.68611,
				.04835,
				0,
				.8664
			],
			"67": [
				0,
				.68611,
				.06979,
				0,
				.81694
			],
			"68": [
				0,
				.68611,
				.03194,
				0,
				.93812
			],
			"69": [
				0,
				.68611,
				.05451,
				0,
				.81007
			],
			"70": [
				0,
				.68611,
				.15972,
				0,
				.68889
			],
			"71": [
				0,
				.68611,
				0,
				0,
				.88673
			],
			"72": [
				0,
				.68611,
				.08229,
				0,
				.98229
			],
			"73": [
				0,
				.68611,
				.07778,
				0,
				.51111
			],
			"74": [
				0,
				.68611,
				.10069,
				0,
				.63125
			],
			"75": [
				0,
				.68611,
				.06979,
				0,
				.97118
			],
			"76": [
				0,
				.68611,
				0,
				0,
				.75555
			],
			"77": [
				0,
				.68611,
				.11424,
				0,
				1.14201
			],
			"78": [
				0,
				.68611,
				.11424,
				0,
				.95034
			],
			"79": [
				0,
				.68611,
				.03194,
				0,
				.83666
			],
			"80": [
				0,
				.68611,
				.15972,
				0,
				.72309
			],
			"81": [
				.19444,
				.68611,
				0,
				0,
				.86861
			],
			"82": [
				0,
				.68611,
				.00421,
				0,
				.87235
			],
			"83": [
				0,
				.68611,
				.05382,
				0,
				.69271
			],
			"84": [
				0,
				.68611,
				.15972,
				0,
				.63663
			],
			"85": [
				0,
				.68611,
				.11424,
				0,
				.80027
			],
			"86": [
				0,
				.68611,
				.25555,
				0,
				.67778
			],
			"87": [
				0,
				.68611,
				.15972,
				0,
				1.09305
			],
			"88": [
				0,
				.68611,
				.07778,
				0,
				.94722
			],
			"89": [
				0,
				.68611,
				.25555,
				0,
				.67458
			],
			"90": [
				0,
				.68611,
				.06979,
				0,
				.77257
			],
			"97": [
				0,
				.44444,
				0,
				0,
				.63287
			],
			"98": [
				0,
				.69444,
				0,
				0,
				.52083
			],
			"99": [
				0,
				.44444,
				0,
				0,
				.51342
			],
			"100": [
				0,
				.69444,
				0,
				0,
				.60972
			],
			"101": [
				0,
				.44444,
				0,
				0,
				.55361
			],
			"102": [
				.19444,
				.69444,
				.11042,
				0,
				.56806
			],
			"103": [
				.19444,
				.44444,
				.03704,
				0,
				.5449
			],
			"104": [
				0,
				.69444,
				0,
				0,
				.66759
			],
			"105": [
				0,
				.69326,
				0,
				0,
				.4048
			],
			"106": [
				.19444,
				.69326,
				.0622,
				0,
				.47083
			],
			"107": [
				0,
				.69444,
				.01852,
				0,
				.6037
			],
			"108": [
				0,
				.69444,
				.0088,
				0,
				.34815
			],
			"109": [
				0,
				.44444,
				0,
				0,
				1.0324
			],
			"110": [
				0,
				.44444,
				0,
				0,
				.71296
			],
			"111": [
				0,
				.44444,
				0,
				0,
				.58472
			],
			"112": [
				.19444,
				.44444,
				0,
				0,
				.60092
			],
			"113": [
				.19444,
				.44444,
				.03704,
				0,
				.54213
			],
			"114": [
				0,
				.44444,
				.03194,
				0,
				.5287
			],
			"115": [
				0,
				.44444,
				0,
				0,
				.53125
			],
			"116": [
				0,
				.63492,
				0,
				0,
				.41528
			],
			"117": [
				0,
				.44444,
				0,
				0,
				.68102
			],
			"118": [
				0,
				.44444,
				.03704,
				0,
				.56666
			],
			"119": [
				0,
				.44444,
				.02778,
				0,
				.83148
			],
			"120": [
				0,
				.44444,
				0,
				0,
				.65903
			],
			"121": [
				.19444,
				.44444,
				.03704,
				0,
				.59028
			],
			"122": [
				0,
				.44444,
				.04213,
				0,
				.55509
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"915": [
				0,
				.68611,
				.15972,
				0,
				.65694
			],
			"916": [
				0,
				.68611,
				0,
				0,
				.95833
			],
			"920": [
				0,
				.68611,
				.03194,
				0,
				.86722
			],
			"923": [
				0,
				.68611,
				0,
				0,
				.80555
			],
			"926": [
				0,
				.68611,
				.07458,
				0,
				.84125
			],
			"928": [
				0,
				.68611,
				.08229,
				0,
				.98229
			],
			"931": [
				0,
				.68611,
				.05451,
				0,
				.88507
			],
			"933": [
				0,
				.68611,
				.15972,
				0,
				.67083
			],
			"934": [
				0,
				.68611,
				0,
				0,
				.76666
			],
			"936": [
				0,
				.68611,
				.11653,
				0,
				.71402
			],
			"937": [
				0,
				.68611,
				.04835,
				0,
				.8789
			],
			"945": [
				0,
				.44444,
				0,
				0,
				.76064
			],
			"946": [
				.19444,
				.69444,
				.03403,
				0,
				.65972
			],
			"947": [
				.19444,
				.44444,
				.06389,
				0,
				.59003
			],
			"948": [
				0,
				.69444,
				.03819,
				0,
				.52222
			],
			"949": [
				0,
				.44444,
				0,
				0,
				.52882
			],
			"950": [
				.19444,
				.69444,
				.06215,
				0,
				.50833
			],
			"951": [
				.19444,
				.44444,
				.03704,
				0,
				.6
			],
			"952": [
				0,
				.69444,
				.03194,
				0,
				.5618
			],
			"953": [
				0,
				.44444,
				0,
				0,
				.41204
			],
			"954": [
				0,
				.44444,
				0,
				0,
				.66759
			],
			"955": [
				0,
				.69444,
				0,
				0,
				.67083
			],
			"956": [
				.19444,
				.44444,
				0,
				0,
				.70787
			],
			"957": [
				0,
				.44444,
				.06898,
				0,
				.57685
			],
			"958": [
				.19444,
				.69444,
				.03021,
				0,
				.50833
			],
			"959": [
				0,
				.44444,
				0,
				0,
				.58472
			],
			"960": [
				0,
				.44444,
				.03704,
				0,
				.68241
			],
			"961": [
				.19444,
				.44444,
				0,
				0,
				.6118
			],
			"962": [
				.09722,
				.44444,
				.07917,
				0,
				.42361
			],
			"963": [
				0,
				.44444,
				.03704,
				0,
				.68588
			],
			"964": [
				0,
				.44444,
				.13472,
				0,
				.52083
			],
			"965": [
				0,
				.44444,
				.03704,
				0,
				.63055
			],
			"966": [
				.19444,
				.44444,
				0,
				0,
				.74722
			],
			"967": [
				.19444,
				.44444,
				0,
				0,
				.71805
			],
			"968": [
				.19444,
				.69444,
				.03704,
				0,
				.75833
			],
			"969": [
				0,
				.44444,
				.03704,
				0,
				.71782
			],
			"977": [
				0,
				.69444,
				0,
				0,
				.69155
			],
			"981": [
				.19444,
				.69444,
				0,
				0,
				.7125
			],
			"982": [
				0,
				.44444,
				.03194,
				0,
				.975
			],
			"1009": [
				.19444,
				.44444,
				0,
				0,
				.6118
			],
			"1013": [
				0,
				.44444,
				0,
				0,
				.48333
			],
			"57649": [
				0,
				.44444,
				0,
				0,
				.39352
			],
			"57911": [
				.19444,
				.44444,
				0,
				0,
				.43889
			]
		},
		"Math-Italic": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"48": [
				0,
				.43056,
				0,
				0,
				.5
			],
			"49": [
				0,
				.43056,
				0,
				0,
				.5
			],
			"50": [
				0,
				.43056,
				0,
				0,
				.5
			],
			"51": [
				.19444,
				.43056,
				0,
				0,
				.5
			],
			"52": [
				.19444,
				.43056,
				0,
				0,
				.5
			],
			"53": [
				.19444,
				.43056,
				0,
				0,
				.5
			],
			"54": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"55": [
				.19444,
				.43056,
				0,
				0,
				.5
			],
			"56": [
				0,
				.64444,
				0,
				0,
				.5
			],
			"57": [
				.19444,
				.43056,
				0,
				0,
				.5
			],
			"65": [
				0,
				.68333,
				0,
				.13889,
				.75
			],
			"66": [
				0,
				.68333,
				.05017,
				.08334,
				.75851
			],
			"67": [
				0,
				.68333,
				.07153,
				.08334,
				.71472
			],
			"68": [
				0,
				.68333,
				.02778,
				.05556,
				.82792
			],
			"69": [
				0,
				.68333,
				.05764,
				.08334,
				.7382
			],
			"70": [
				0,
				.68333,
				.13889,
				.08334,
				.64306
			],
			"71": [
				0,
				.68333,
				0,
				.08334,
				.78625
			],
			"72": [
				0,
				.68333,
				.08125,
				.05556,
				.83125
			],
			"73": [
				0,
				.68333,
				.07847,
				.11111,
				.43958
			],
			"74": [
				0,
				.68333,
				.09618,
				.16667,
				.55451
			],
			"75": [
				0,
				.68333,
				.07153,
				.05556,
				.84931
			],
			"76": [
				0,
				.68333,
				0,
				.02778,
				.68056
			],
			"77": [
				0,
				.68333,
				.10903,
				.08334,
				.97014
			],
			"78": [
				0,
				.68333,
				.10903,
				.08334,
				.80347
			],
			"79": [
				0,
				.68333,
				.02778,
				.08334,
				.76278
			],
			"80": [
				0,
				.68333,
				.13889,
				.08334,
				.64201
			],
			"81": [
				.19444,
				.68333,
				0,
				.08334,
				.79056
			],
			"82": [
				0,
				.68333,
				.00773,
				.08334,
				.75929
			],
			"83": [
				0,
				.68333,
				.05764,
				.08334,
				.6132
			],
			"84": [
				0,
				.68333,
				.13889,
				.08334,
				.58438
			],
			"85": [
				0,
				.68333,
				.10903,
				.02778,
				.68278
			],
			"86": [
				0,
				.68333,
				.22222,
				0,
				.58333
			],
			"87": [
				0,
				.68333,
				.13889,
				0,
				.94445
			],
			"88": [
				0,
				.68333,
				.07847,
				.08334,
				.82847
			],
			"89": [
				0,
				.68333,
				.22222,
				0,
				.58056
			],
			"90": [
				0,
				.68333,
				.07153,
				.08334,
				.68264
			],
			"97": [
				0,
				.43056,
				0,
				0,
				.52859
			],
			"98": [
				0,
				.69444,
				0,
				0,
				.42917
			],
			"99": [
				0,
				.43056,
				0,
				.05556,
				.43276
			],
			"100": [
				0,
				.69444,
				0,
				.16667,
				.52049
			],
			"101": [
				0,
				.43056,
				0,
				.05556,
				.46563
			],
			"102": [
				.19444,
				.69444,
				.10764,
				.16667,
				.48959
			],
			"103": [
				.19444,
				.43056,
				.03588,
				.02778,
				.47697
			],
			"104": [
				0,
				.69444,
				0,
				0,
				.57616
			],
			"105": [
				0,
				.65952,
				0,
				0,
				.34451
			],
			"106": [
				.19444,
				.65952,
				.05724,
				0,
				.41181
			],
			"107": [
				0,
				.69444,
				.03148,
				0,
				.5206
			],
			"108": [
				0,
				.69444,
				.01968,
				.08334,
				.29838
			],
			"109": [
				0,
				.43056,
				0,
				0,
				.87801
			],
			"110": [
				0,
				.43056,
				0,
				0,
				.60023
			],
			"111": [
				0,
				.43056,
				0,
				.05556,
				.48472
			],
			"112": [
				.19444,
				.43056,
				0,
				.08334,
				.50313
			],
			"113": [
				.19444,
				.43056,
				.03588,
				.08334,
				.44641
			],
			"114": [
				0,
				.43056,
				.02778,
				.05556,
				.45116
			],
			"115": [
				0,
				.43056,
				0,
				.05556,
				.46875
			],
			"116": [
				0,
				.61508,
				0,
				.08334,
				.36111
			],
			"117": [
				0,
				.43056,
				0,
				.02778,
				.57246
			],
			"118": [
				0,
				.43056,
				.03588,
				.02778,
				.48472
			],
			"119": [
				0,
				.43056,
				.02691,
				.08334,
				.71592
			],
			"120": [
				0,
				.43056,
				0,
				.02778,
				.57153
			],
			"121": [
				.19444,
				.43056,
				.03588,
				.05556,
				.49028
			],
			"122": [
				0,
				.43056,
				.04398,
				.05556,
				.46505
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"915": [
				0,
				.68333,
				.13889,
				.08334,
				.61528
			],
			"916": [
				0,
				.68333,
				0,
				.16667,
				.83334
			],
			"920": [
				0,
				.68333,
				.02778,
				.08334,
				.76278
			],
			"923": [
				0,
				.68333,
				0,
				.16667,
				.69445
			],
			"926": [
				0,
				.68333,
				.07569,
				.08334,
				.74236
			],
			"928": [
				0,
				.68333,
				.08125,
				.05556,
				.83125
			],
			"931": [
				0,
				.68333,
				.05764,
				.08334,
				.77986
			],
			"933": [
				0,
				.68333,
				.13889,
				.05556,
				.58333
			],
			"934": [
				0,
				.68333,
				0,
				.08334,
				.66667
			],
			"936": [
				0,
				.68333,
				.11,
				.05556,
				.61222
			],
			"937": [
				0,
				.68333,
				.05017,
				.08334,
				.7724
			],
			"945": [
				0,
				.43056,
				.0037,
				.02778,
				.6397
			],
			"946": [
				.19444,
				.69444,
				.05278,
				.08334,
				.56563
			],
			"947": [
				.19444,
				.43056,
				.05556,
				0,
				.51773
			],
			"948": [
				0,
				.69444,
				.03785,
				.05556,
				.44444
			],
			"949": [
				0,
				.43056,
				0,
				.08334,
				.46632
			],
			"950": [
				.19444,
				.69444,
				.07378,
				.08334,
				.4375
			],
			"951": [
				.19444,
				.43056,
				.03588,
				.05556,
				.49653
			],
			"952": [
				0,
				.69444,
				.02778,
				.08334,
				.46944
			],
			"953": [
				0,
				.43056,
				0,
				.05556,
				.35394
			],
			"954": [
				0,
				.43056,
				0,
				0,
				.57616
			],
			"955": [
				0,
				.69444,
				0,
				0,
				.58334
			],
			"956": [
				.19444,
				.43056,
				0,
				.02778,
				.60255
			],
			"957": [
				0,
				.43056,
				.06366,
				.02778,
				.49398
			],
			"958": [
				.19444,
				.69444,
				.04601,
				.11111,
				.4375
			],
			"959": [
				0,
				.43056,
				0,
				.05556,
				.48472
			],
			"960": [
				0,
				.43056,
				.03588,
				0,
				.57003
			],
			"961": [
				.19444,
				.43056,
				0,
				.08334,
				.51702
			],
			"962": [
				.09722,
				.43056,
				.07986,
				.08334,
				.36285
			],
			"963": [
				0,
				.43056,
				.03588,
				0,
				.57141
			],
			"964": [
				0,
				.43056,
				.1132,
				.02778,
				.43715
			],
			"965": [
				0,
				.43056,
				.03588,
				.02778,
				.54028
			],
			"966": [
				.19444,
				.43056,
				0,
				.08334,
				.65417
			],
			"967": [
				.19444,
				.43056,
				0,
				.05556,
				.62569
			],
			"968": [
				.19444,
				.69444,
				.03588,
				.11111,
				.65139
			],
			"969": [
				0,
				.43056,
				.03588,
				0,
				.62245
			],
			"977": [
				0,
				.69444,
				0,
				.08334,
				.59144
			],
			"981": [
				.19444,
				.69444,
				0,
				.08334,
				.59583
			],
			"982": [
				0,
				.43056,
				.02778,
				0,
				.82813
			],
			"1009": [
				.19444,
				.43056,
				0,
				.08334,
				.51702
			],
			"1013": [
				0,
				.43056,
				0,
				.05556,
				.4059
			],
			"57649": [
				0,
				.43056,
				0,
				.02778,
				.32246
			],
			"57911": [
				.19444,
				.43056,
				0,
				.08334,
				.38403
			]
		},
		"SansSerif-Bold": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69444,
				0,
				0,
				.36667
			],
			"34": [
				0,
				.69444,
				0,
				0,
				.55834
			],
			"35": [
				.19444,
				.69444,
				0,
				0,
				.91667
			],
			"36": [
				.05556,
				.75,
				0,
				0,
				.55
			],
			"37": [
				.05556,
				.75,
				0,
				0,
				1.02912
			],
			"38": [
				0,
				.69444,
				0,
				0,
				.83056
			],
			"39": [
				0,
				.69444,
				0,
				0,
				.30556
			],
			"40": [
				.25,
				.75,
				0,
				0,
				.42778
			],
			"41": [
				.25,
				.75,
				0,
				0,
				.42778
			],
			"42": [
				0,
				.75,
				0,
				0,
				.55
			],
			"43": [
				.11667,
				.61667,
				0,
				0,
				.85556
			],
			"44": [
				.10556,
				.13056,
				0,
				0,
				.30556
			],
			"45": [
				0,
				.45833,
				0,
				0,
				.36667
			],
			"46": [
				0,
				.13056,
				0,
				0,
				.30556
			],
			"47": [
				.25,
				.75,
				0,
				0,
				.55
			],
			"48": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"49": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"50": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"51": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"52": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"53": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"54": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"55": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"56": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"57": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"58": [
				0,
				.45833,
				0,
				0,
				.30556
			],
			"59": [
				.10556,
				.45833,
				0,
				0,
				.30556
			],
			"61": [
				-.09375,
				.40625,
				0,
				0,
				.85556
			],
			"63": [
				0,
				.69444,
				0,
				0,
				.51945
			],
			"64": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"65": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"66": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"67": [
				0,
				.69444,
				0,
				0,
				.70278
			],
			"68": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"69": [
				0,
				.69444,
				0,
				0,
				.64167
			],
			"70": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"71": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"72": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"73": [
				0,
				.69444,
				0,
				0,
				.33056
			],
			"74": [
				0,
				.69444,
				0,
				0,
				.51945
			],
			"75": [
				0,
				.69444,
				0,
				0,
				.76389
			],
			"76": [
				0,
				.69444,
				0,
				0,
				.58056
			],
			"77": [
				0,
				.69444,
				0,
				0,
				.97778
			],
			"78": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"79": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"80": [
				0,
				.69444,
				0,
				0,
				.70278
			],
			"81": [
				.10556,
				.69444,
				0,
				0,
				.79445
			],
			"82": [
				0,
				.69444,
				0,
				0,
				.70278
			],
			"83": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"84": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"85": [
				0,
				.69444,
				0,
				0,
				.76389
			],
			"86": [
				0,
				.69444,
				.01528,
				0,
				.73334
			],
			"87": [
				0,
				.69444,
				.01528,
				0,
				1.03889
			],
			"88": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"89": [
				0,
				.69444,
				.0275,
				0,
				.73334
			],
			"90": [
				0,
				.69444,
				0,
				0,
				.67223
			],
			"91": [
				.25,
				.75,
				0,
				0,
				.34306
			],
			"93": [
				.25,
				.75,
				0,
				0,
				.34306
			],
			"94": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"95": [
				.35,
				.10833,
				.03056,
				0,
				.55
			],
			"97": [
				0,
				.45833,
				0,
				0,
				.525
			],
			"98": [
				0,
				.69444,
				0,
				0,
				.56111
			],
			"99": [
				0,
				.45833,
				0,
				0,
				.48889
			],
			"100": [
				0,
				.69444,
				0,
				0,
				.56111
			],
			"101": [
				0,
				.45833,
				0,
				0,
				.51111
			],
			"102": [
				0,
				.69444,
				.07639,
				0,
				.33611
			],
			"103": [
				.19444,
				.45833,
				.01528,
				0,
				.55
			],
			"104": [
				0,
				.69444,
				0,
				0,
				.56111
			],
			"105": [
				0,
				.69444,
				0,
				0,
				.25556
			],
			"106": [
				.19444,
				.69444,
				0,
				0,
				.28611
			],
			"107": [
				0,
				.69444,
				0,
				0,
				.53056
			],
			"108": [
				0,
				.69444,
				0,
				0,
				.25556
			],
			"109": [
				0,
				.45833,
				0,
				0,
				.86667
			],
			"110": [
				0,
				.45833,
				0,
				0,
				.56111
			],
			"111": [
				0,
				.45833,
				0,
				0,
				.55
			],
			"112": [
				.19444,
				.45833,
				0,
				0,
				.56111
			],
			"113": [
				.19444,
				.45833,
				0,
				0,
				.56111
			],
			"114": [
				0,
				.45833,
				.01528,
				0,
				.37222
			],
			"115": [
				0,
				.45833,
				0,
				0,
				.42167
			],
			"116": [
				0,
				.58929,
				0,
				0,
				.40417
			],
			"117": [
				0,
				.45833,
				0,
				0,
				.56111
			],
			"118": [
				0,
				.45833,
				.01528,
				0,
				.5
			],
			"119": [
				0,
				.45833,
				.01528,
				0,
				.74445
			],
			"120": [
				0,
				.45833,
				0,
				0,
				.5
			],
			"121": [
				.19444,
				.45833,
				.01528,
				0,
				.5
			],
			"122": [
				0,
				.45833,
				0,
				0,
				.47639
			],
			"126": [
				.35,
				.34444,
				0,
				0,
				.55
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"168": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"176": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"180": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"184": [
				.17014,
				0,
				0,
				0,
				.48889
			],
			"305": [
				0,
				.45833,
				0,
				0,
				.25556
			],
			"567": [
				.19444,
				.45833,
				0,
				0,
				.28611
			],
			"710": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"711": [
				0,
				.63542,
				0,
				0,
				.55
			],
			"713": [
				0,
				.63778,
				0,
				0,
				.55
			],
			"728": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"729": [
				0,
				.69444,
				0,
				0,
				.30556
			],
			"730": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"732": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"733": [
				0,
				.69444,
				0,
				0,
				.55
			],
			"915": [
				0,
				.69444,
				0,
				0,
				.58056
			],
			"916": [
				0,
				.69444,
				0,
				0,
				.91667
			],
			"920": [
				0,
				.69444,
				0,
				0,
				.85556
			],
			"923": [
				0,
				.69444,
				0,
				0,
				.67223
			],
			"926": [
				0,
				.69444,
				0,
				0,
				.73334
			],
			"928": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"931": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"933": [
				0,
				.69444,
				0,
				0,
				.85556
			],
			"934": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"936": [
				0,
				.69444,
				0,
				0,
				.85556
			],
			"937": [
				0,
				.69444,
				0,
				0,
				.79445
			],
			"8211": [
				0,
				.45833,
				.03056,
				0,
				.55
			],
			"8212": [
				0,
				.45833,
				.03056,
				0,
				1.10001
			],
			"8216": [
				0,
				.69444,
				0,
				0,
				.30556
			],
			"8217": [
				0,
				.69444,
				0,
				0,
				.30556
			],
			"8220": [
				0,
				.69444,
				0,
				0,
				.55834
			],
			"8221": [
				0,
				.69444,
				0,
				0,
				.55834
			]
		},
		"SansSerif-Italic": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69444,
				.05733,
				0,
				.31945
			],
			"34": [
				0,
				.69444,
				.00316,
				0,
				.5
			],
			"35": [
				.19444,
				.69444,
				.05087,
				0,
				.83334
			],
			"36": [
				.05556,
				.75,
				.11156,
				0,
				.5
			],
			"37": [
				.05556,
				.75,
				.03126,
				0,
				.83334
			],
			"38": [
				0,
				.69444,
				.03058,
				0,
				.75834
			],
			"39": [
				0,
				.69444,
				.07816,
				0,
				.27778
			],
			"40": [
				.25,
				.75,
				.13164,
				0,
				.38889
			],
			"41": [
				.25,
				.75,
				.02536,
				0,
				.38889
			],
			"42": [
				0,
				.75,
				.11775,
				0,
				.5
			],
			"43": [
				.08333,
				.58333,
				.02536,
				0,
				.77778
			],
			"44": [
				.125,
				.08333,
				0,
				0,
				.27778
			],
			"45": [
				0,
				.44444,
				.01946,
				0,
				.33333
			],
			"46": [
				0,
				.08333,
				0,
				0,
				.27778
			],
			"47": [
				.25,
				.75,
				.13164,
				0,
				.5
			],
			"48": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"49": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"50": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"51": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"52": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"53": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"54": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"55": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"56": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"57": [
				0,
				.65556,
				.11156,
				0,
				.5
			],
			"58": [
				0,
				.44444,
				.02502,
				0,
				.27778
			],
			"59": [
				.125,
				.44444,
				.02502,
				0,
				.27778
			],
			"61": [
				-.13,
				.37,
				.05087,
				0,
				.77778
			],
			"63": [
				0,
				.69444,
				.11809,
				0,
				.47222
			],
			"64": [
				0,
				.69444,
				.07555,
				0,
				.66667
			],
			"65": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"66": [
				0,
				.69444,
				.08293,
				0,
				.66667
			],
			"67": [
				0,
				.69444,
				.11983,
				0,
				.63889
			],
			"68": [
				0,
				.69444,
				.07555,
				0,
				.72223
			],
			"69": [
				0,
				.69444,
				.11983,
				0,
				.59722
			],
			"70": [
				0,
				.69444,
				.13372,
				0,
				.56945
			],
			"71": [
				0,
				.69444,
				.11983,
				0,
				.66667
			],
			"72": [
				0,
				.69444,
				.08094,
				0,
				.70834
			],
			"73": [
				0,
				.69444,
				.13372,
				0,
				.27778
			],
			"74": [
				0,
				.69444,
				.08094,
				0,
				.47222
			],
			"75": [
				0,
				.69444,
				.11983,
				0,
				.69445
			],
			"76": [
				0,
				.69444,
				0,
				0,
				.54167
			],
			"77": [
				0,
				.69444,
				.08094,
				0,
				.875
			],
			"78": [
				0,
				.69444,
				.08094,
				0,
				.70834
			],
			"79": [
				0,
				.69444,
				.07555,
				0,
				.73611
			],
			"80": [
				0,
				.69444,
				.08293,
				0,
				.63889
			],
			"81": [
				.125,
				.69444,
				.07555,
				0,
				.73611
			],
			"82": [
				0,
				.69444,
				.08293,
				0,
				.64584
			],
			"83": [
				0,
				.69444,
				.09205,
				0,
				.55556
			],
			"84": [
				0,
				.69444,
				.13372,
				0,
				.68056
			],
			"85": [
				0,
				.69444,
				.08094,
				0,
				.6875
			],
			"86": [
				0,
				.69444,
				.1615,
				0,
				.66667
			],
			"87": [
				0,
				.69444,
				.1615,
				0,
				.94445
			],
			"88": [
				0,
				.69444,
				.13372,
				0,
				.66667
			],
			"89": [
				0,
				.69444,
				.17261,
				0,
				.66667
			],
			"90": [
				0,
				.69444,
				.11983,
				0,
				.61111
			],
			"91": [
				.25,
				.75,
				.15942,
				0,
				.28889
			],
			"93": [
				.25,
				.75,
				.08719,
				0,
				.28889
			],
			"94": [
				0,
				.69444,
				.0799,
				0,
				.5
			],
			"95": [
				.35,
				.09444,
				.08616,
				0,
				.5
			],
			"97": [
				0,
				.44444,
				.00981,
				0,
				.48056
			],
			"98": [
				0,
				.69444,
				.03057,
				0,
				.51667
			],
			"99": [
				0,
				.44444,
				.08336,
				0,
				.44445
			],
			"100": [
				0,
				.69444,
				.09483,
				0,
				.51667
			],
			"101": [
				0,
				.44444,
				.06778,
				0,
				.44445
			],
			"102": [
				0,
				.69444,
				.21705,
				0,
				.30556
			],
			"103": [
				.19444,
				.44444,
				.10836,
				0,
				.5
			],
			"104": [
				0,
				.69444,
				.01778,
				0,
				.51667
			],
			"105": [
				0,
				.67937,
				.09718,
				0,
				.23889
			],
			"106": [
				.19444,
				.67937,
				.09162,
				0,
				.26667
			],
			"107": [
				0,
				.69444,
				.08336,
				0,
				.48889
			],
			"108": [
				0,
				.69444,
				.09483,
				0,
				.23889
			],
			"109": [
				0,
				.44444,
				.01778,
				0,
				.79445
			],
			"110": [
				0,
				.44444,
				.01778,
				0,
				.51667
			],
			"111": [
				0,
				.44444,
				.06613,
				0,
				.5
			],
			"112": [
				.19444,
				.44444,
				.0389,
				0,
				.51667
			],
			"113": [
				.19444,
				.44444,
				.04169,
				0,
				.51667
			],
			"114": [
				0,
				.44444,
				.10836,
				0,
				.34167
			],
			"115": [
				0,
				.44444,
				.0778,
				0,
				.38333
			],
			"116": [
				0,
				.57143,
				.07225,
				0,
				.36111
			],
			"117": [
				0,
				.44444,
				.04169,
				0,
				.51667
			],
			"118": [
				0,
				.44444,
				.10836,
				0,
				.46111
			],
			"119": [
				0,
				.44444,
				.10836,
				0,
				.68334
			],
			"120": [
				0,
				.44444,
				.09169,
				0,
				.46111
			],
			"121": [
				.19444,
				.44444,
				.10836,
				0,
				.46111
			],
			"122": [
				0,
				.44444,
				.08752,
				0,
				.43472
			],
			"126": [
				.35,
				.32659,
				.08826,
				0,
				.5
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"168": [
				0,
				.67937,
				.06385,
				0,
				.5
			],
			"176": [
				0,
				.69444,
				0,
				0,
				.73752
			],
			"184": [
				.17014,
				0,
				0,
				0,
				.44445
			],
			"305": [
				0,
				.44444,
				.04169,
				0,
				.23889
			],
			"567": [
				.19444,
				.44444,
				.04169,
				0,
				.26667
			],
			"710": [
				0,
				.69444,
				.0799,
				0,
				.5
			],
			"711": [
				0,
				.63194,
				.08432,
				0,
				.5
			],
			"713": [
				0,
				.60889,
				.08776,
				0,
				.5
			],
			"714": [
				0,
				.69444,
				.09205,
				0,
				.5
			],
			"715": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"728": [
				0,
				.69444,
				.09483,
				0,
				.5
			],
			"729": [
				0,
				.67937,
				.07774,
				0,
				.27778
			],
			"730": [
				0,
				.69444,
				0,
				0,
				.73752
			],
			"732": [
				0,
				.67659,
				.08826,
				0,
				.5
			],
			"733": [
				0,
				.69444,
				.09205,
				0,
				.5
			],
			"915": [
				0,
				.69444,
				.13372,
				0,
				.54167
			],
			"916": [
				0,
				.69444,
				0,
				0,
				.83334
			],
			"920": [
				0,
				.69444,
				.07555,
				0,
				.77778
			],
			"923": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"926": [
				0,
				.69444,
				.12816,
				0,
				.66667
			],
			"928": [
				0,
				.69444,
				.08094,
				0,
				.70834
			],
			"931": [
				0,
				.69444,
				.11983,
				0,
				.72222
			],
			"933": [
				0,
				.69444,
				.09031,
				0,
				.77778
			],
			"934": [
				0,
				.69444,
				.04603,
				0,
				.72222
			],
			"936": [
				0,
				.69444,
				.09031,
				0,
				.77778
			],
			"937": [
				0,
				.69444,
				.08293,
				0,
				.72222
			],
			"8211": [
				0,
				.44444,
				.08616,
				0,
				.5
			],
			"8212": [
				0,
				.44444,
				.08616,
				0,
				1
			],
			"8216": [
				0,
				.69444,
				.07816,
				0,
				.27778
			],
			"8217": [
				0,
				.69444,
				.07816,
				0,
				.27778
			],
			"8220": [
				0,
				.69444,
				.14205,
				0,
				.5
			],
			"8221": [
				0,
				.69444,
				.00316,
				0,
				.5
			]
		},
		"SansSerif-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"33": [
				0,
				.69444,
				0,
				0,
				.31945
			],
			"34": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"35": [
				.19444,
				.69444,
				0,
				0,
				.83334
			],
			"36": [
				.05556,
				.75,
				0,
				0,
				.5
			],
			"37": [
				.05556,
				.75,
				0,
				0,
				.83334
			],
			"38": [
				0,
				.69444,
				0,
				0,
				.75834
			],
			"39": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"40": [
				.25,
				.75,
				0,
				0,
				.38889
			],
			"41": [
				.25,
				.75,
				0,
				0,
				.38889
			],
			"42": [
				0,
				.75,
				0,
				0,
				.5
			],
			"43": [
				.08333,
				.58333,
				0,
				0,
				.77778
			],
			"44": [
				.125,
				.08333,
				0,
				0,
				.27778
			],
			"45": [
				0,
				.44444,
				0,
				0,
				.33333
			],
			"46": [
				0,
				.08333,
				0,
				0,
				.27778
			],
			"47": [
				.25,
				.75,
				0,
				0,
				.5
			],
			"48": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"49": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"50": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"51": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"52": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"53": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"54": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"55": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"56": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"57": [
				0,
				.65556,
				0,
				0,
				.5
			],
			"58": [
				0,
				.44444,
				0,
				0,
				.27778
			],
			"59": [
				.125,
				.44444,
				0,
				0,
				.27778
			],
			"61": [
				-.13,
				.37,
				0,
				0,
				.77778
			],
			"63": [
				0,
				.69444,
				0,
				0,
				.47222
			],
			"64": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"65": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"66": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"67": [
				0,
				.69444,
				0,
				0,
				.63889
			],
			"68": [
				0,
				.69444,
				0,
				0,
				.72223
			],
			"69": [
				0,
				.69444,
				0,
				0,
				.59722
			],
			"70": [
				0,
				.69444,
				0,
				0,
				.56945
			],
			"71": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"72": [
				0,
				.69444,
				0,
				0,
				.70834
			],
			"73": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"74": [
				0,
				.69444,
				0,
				0,
				.47222
			],
			"75": [
				0,
				.69444,
				0,
				0,
				.69445
			],
			"76": [
				0,
				.69444,
				0,
				0,
				.54167
			],
			"77": [
				0,
				.69444,
				0,
				0,
				.875
			],
			"78": [
				0,
				.69444,
				0,
				0,
				.70834
			],
			"79": [
				0,
				.69444,
				0,
				0,
				.73611
			],
			"80": [
				0,
				.69444,
				0,
				0,
				.63889
			],
			"81": [
				.125,
				.69444,
				0,
				0,
				.73611
			],
			"82": [
				0,
				.69444,
				0,
				0,
				.64584
			],
			"83": [
				0,
				.69444,
				0,
				0,
				.55556
			],
			"84": [
				0,
				.69444,
				0,
				0,
				.68056
			],
			"85": [
				0,
				.69444,
				0,
				0,
				.6875
			],
			"86": [
				0,
				.69444,
				.01389,
				0,
				.66667
			],
			"87": [
				0,
				.69444,
				.01389,
				0,
				.94445
			],
			"88": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"89": [
				0,
				.69444,
				.025,
				0,
				.66667
			],
			"90": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"91": [
				.25,
				.75,
				0,
				0,
				.28889
			],
			"93": [
				.25,
				.75,
				0,
				0,
				.28889
			],
			"94": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"95": [
				.35,
				.09444,
				.02778,
				0,
				.5
			],
			"97": [
				0,
				.44444,
				0,
				0,
				.48056
			],
			"98": [
				0,
				.69444,
				0,
				0,
				.51667
			],
			"99": [
				0,
				.44444,
				0,
				0,
				.44445
			],
			"100": [
				0,
				.69444,
				0,
				0,
				.51667
			],
			"101": [
				0,
				.44444,
				0,
				0,
				.44445
			],
			"102": [
				0,
				.69444,
				.06944,
				0,
				.30556
			],
			"103": [
				.19444,
				.44444,
				.01389,
				0,
				.5
			],
			"104": [
				0,
				.69444,
				0,
				0,
				.51667
			],
			"105": [
				0,
				.67937,
				0,
				0,
				.23889
			],
			"106": [
				.19444,
				.67937,
				0,
				0,
				.26667
			],
			"107": [
				0,
				.69444,
				0,
				0,
				.48889
			],
			"108": [
				0,
				.69444,
				0,
				0,
				.23889
			],
			"109": [
				0,
				.44444,
				0,
				0,
				.79445
			],
			"110": [
				0,
				.44444,
				0,
				0,
				.51667
			],
			"111": [
				0,
				.44444,
				0,
				0,
				.5
			],
			"112": [
				.19444,
				.44444,
				0,
				0,
				.51667
			],
			"113": [
				.19444,
				.44444,
				0,
				0,
				.51667
			],
			"114": [
				0,
				.44444,
				.01389,
				0,
				.34167
			],
			"115": [
				0,
				.44444,
				0,
				0,
				.38333
			],
			"116": [
				0,
				.57143,
				0,
				0,
				.36111
			],
			"117": [
				0,
				.44444,
				0,
				0,
				.51667
			],
			"118": [
				0,
				.44444,
				.01389,
				0,
				.46111
			],
			"119": [
				0,
				.44444,
				.01389,
				0,
				.68334
			],
			"120": [
				0,
				.44444,
				0,
				0,
				.46111
			],
			"121": [
				.19444,
				.44444,
				.01389,
				0,
				.46111
			],
			"122": [
				0,
				.44444,
				0,
				0,
				.43472
			],
			"126": [
				.35,
				.32659,
				0,
				0,
				.5
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"168": [
				0,
				.67937,
				0,
				0,
				.5
			],
			"176": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"184": [
				.17014,
				0,
				0,
				0,
				.44445
			],
			"305": [
				0,
				.44444,
				0,
				0,
				.23889
			],
			"567": [
				.19444,
				.44444,
				0,
				0,
				.26667
			],
			"710": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"711": [
				0,
				.63194,
				0,
				0,
				.5
			],
			"713": [
				0,
				.60889,
				0,
				0,
				.5
			],
			"714": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"715": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"728": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"729": [
				0,
				.67937,
				0,
				0,
				.27778
			],
			"730": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"732": [
				0,
				.67659,
				0,
				0,
				.5
			],
			"733": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"915": [
				0,
				.69444,
				0,
				0,
				.54167
			],
			"916": [
				0,
				.69444,
				0,
				0,
				.83334
			],
			"920": [
				0,
				.69444,
				0,
				0,
				.77778
			],
			"923": [
				0,
				.69444,
				0,
				0,
				.61111
			],
			"926": [
				0,
				.69444,
				0,
				0,
				.66667
			],
			"928": [
				0,
				.69444,
				0,
				0,
				.70834
			],
			"931": [
				0,
				.69444,
				0,
				0,
				.72222
			],
			"933": [
				0,
				.69444,
				0,
				0,
				.77778
			],
			"934": [
				0,
				.69444,
				0,
				0,
				.72222
			],
			"936": [
				0,
				.69444,
				0,
				0,
				.77778
			],
			"937": [
				0,
				.69444,
				0,
				0,
				.72222
			],
			"8211": [
				0,
				.44444,
				.02778,
				0,
				.5
			],
			"8212": [
				0,
				.44444,
				.02778,
				0,
				1
			],
			"8216": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"8217": [
				0,
				.69444,
				0,
				0,
				.27778
			],
			"8220": [
				0,
				.69444,
				0,
				0,
				.5
			],
			"8221": [
				0,
				.69444,
				0,
				0,
				.5
			]
		},
		"Script-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"65": [
				0,
				.7,
				.22925,
				0,
				.80253
			],
			"66": [
				0,
				.7,
				.04087,
				0,
				.90757
			],
			"67": [
				0,
				.7,
				.1689,
				0,
				.66619
			],
			"68": [
				0,
				.7,
				.09371,
				0,
				.77443
			],
			"69": [
				0,
				.7,
				.18583,
				0,
				.56162
			],
			"70": [
				0,
				.7,
				.13634,
				0,
				.89544
			],
			"71": [
				0,
				.7,
				.17322,
				0,
				.60961
			],
			"72": [
				0,
				.7,
				.29694,
				0,
				.96919
			],
			"73": [
				0,
				.7,
				.19189,
				0,
				.80907
			],
			"74": [
				.27778,
				.7,
				.19189,
				0,
				1.05159
			],
			"75": [
				0,
				.7,
				.31259,
				0,
				.91364
			],
			"76": [
				0,
				.7,
				.19189,
				0,
				.87373
			],
			"77": [
				0,
				.7,
				.15981,
				0,
				1.08031
			],
			"78": [
				0,
				.7,
				.3525,
				0,
				.9015
			],
			"79": [
				0,
				.7,
				.08078,
				0,
				.73787
			],
			"80": [
				0,
				.7,
				.08078,
				0,
				1.01262
			],
			"81": [
				0,
				.7,
				.03305,
				0,
				.88282
			],
			"82": [
				0,
				.7,
				.06259,
				0,
				.85
			],
			"83": [
				0,
				.7,
				.19189,
				0,
				.86767
			],
			"84": [
				0,
				.7,
				.29087,
				0,
				.74697
			],
			"85": [
				0,
				.7,
				.25815,
				0,
				.79996
			],
			"86": [
				0,
				.7,
				.27523,
				0,
				.62204
			],
			"87": [
				0,
				.7,
				.27523,
				0,
				.80532
			],
			"88": [
				0,
				.7,
				.26006,
				0,
				.94445
			],
			"89": [
				0,
				.7,
				.2939,
				0,
				.70961
			],
			"90": [
				0,
				.7,
				.24037,
				0,
				.8212
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			]
		},
		"Size1-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"40": [
				.35001,
				.85,
				0,
				0,
				.45834
			],
			"41": [
				.35001,
				.85,
				0,
				0,
				.45834
			],
			"47": [
				.35001,
				.85,
				0,
				0,
				.57778
			],
			"91": [
				.35001,
				.85,
				0,
				0,
				.41667
			],
			"92": [
				.35001,
				.85,
				0,
				0,
				.57778
			],
			"93": [
				.35001,
				.85,
				0,
				0,
				.41667
			],
			"123": [
				.35001,
				.85,
				0,
				0,
				.58334
			],
			"125": [
				.35001,
				.85,
				0,
				0,
				.58334
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"710": [
				0,
				.72222,
				0,
				0,
				.55556
			],
			"732": [
				0,
				.72222,
				0,
				0,
				.55556
			],
			"770": [
				0,
				.72222,
				0,
				0,
				.55556
			],
			"771": [
				0,
				.72222,
				0,
				0,
				.55556
			],
			"8214": [
				-99e-5,
				.601,
				0,
				0,
				.77778
			],
			"8593": [
				1e-5,
				.6,
				0,
				0,
				.66667
			],
			"8595": [
				1e-5,
				.6,
				0,
				0,
				.66667
			],
			"8657": [
				1e-5,
				.6,
				0,
				0,
				.77778
			],
			"8659": [
				1e-5,
				.6,
				0,
				0,
				.77778
			],
			"8719": [
				.25001,
				.75,
				0,
				0,
				.94445
			],
			"8720": [
				.25001,
				.75,
				0,
				0,
				.94445
			],
			"8721": [
				.25001,
				.75,
				0,
				0,
				1.05556
			],
			"8730": [
				.35001,
				.85,
				0,
				0,
				1
			],
			"8739": [
				-.00599,
				.606,
				0,
				0,
				.33333
			],
			"8741": [
				-.00599,
				.606,
				0,
				0,
				.55556
			],
			"8747": [
				.30612,
				.805,
				.19445,
				0,
				.47222
			],
			"8748": [
				.306,
				.805,
				.19445,
				0,
				.47222
			],
			"8749": [
				.306,
				.805,
				.19445,
				0,
				.47222
			],
			"8750": [
				.30612,
				.805,
				.19445,
				0,
				.47222
			],
			"8896": [
				.25001,
				.75,
				0,
				0,
				.83334
			],
			"8897": [
				.25001,
				.75,
				0,
				0,
				.83334
			],
			"8898": [
				.25001,
				.75,
				0,
				0,
				.83334
			],
			"8899": [
				.25001,
				.75,
				0,
				0,
				.83334
			],
			"8968": [
				.35001,
				.85,
				0,
				0,
				.47222
			],
			"8969": [
				.35001,
				.85,
				0,
				0,
				.47222
			],
			"8970": [
				.35001,
				.85,
				0,
				0,
				.47222
			],
			"8971": [
				.35001,
				.85,
				0,
				0,
				.47222
			],
			"9168": [
				-99e-5,
				.601,
				0,
				0,
				.66667
			],
			"10216": [
				.35001,
				.85,
				0,
				0,
				.47222
			],
			"10217": [
				.35001,
				.85,
				0,
				0,
				.47222
			],
			"10752": [
				.25001,
				.75,
				0,
				0,
				1.11111
			],
			"10753": [
				.25001,
				.75,
				0,
				0,
				1.11111
			],
			"10754": [
				.25001,
				.75,
				0,
				0,
				1.11111
			],
			"10756": [
				.25001,
				.75,
				0,
				0,
				.83334
			],
			"10758": [
				.25001,
				.75,
				0,
				0,
				.83334
			]
		},
		"Size2-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"40": [
				.65002,
				1.15,
				0,
				0,
				.59722
			],
			"41": [
				.65002,
				1.15,
				0,
				0,
				.59722
			],
			"47": [
				.65002,
				1.15,
				0,
				0,
				.81111
			],
			"91": [
				.65002,
				1.15,
				0,
				0,
				.47222
			],
			"92": [
				.65002,
				1.15,
				0,
				0,
				.81111
			],
			"93": [
				.65002,
				1.15,
				0,
				0,
				.47222
			],
			"123": [
				.65002,
				1.15,
				0,
				0,
				.66667
			],
			"125": [
				.65002,
				1.15,
				0,
				0,
				.66667
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"710": [
				0,
				.75,
				0,
				0,
				1
			],
			"732": [
				0,
				.75,
				0,
				0,
				1
			],
			"770": [
				0,
				.75,
				0,
				0,
				1
			],
			"771": [
				0,
				.75,
				0,
				0,
				1
			],
			"8719": [
				.55001,
				1.05,
				0,
				0,
				1.27778
			],
			"8720": [
				.55001,
				1.05,
				0,
				0,
				1.27778
			],
			"8721": [
				.55001,
				1.05,
				0,
				0,
				1.44445
			],
			"8730": [
				.65002,
				1.15,
				0,
				0,
				1
			],
			"8747": [
				.86225,
				1.36,
				.44445,
				0,
				.55556
			],
			"8748": [
				.862,
				1.36,
				.44445,
				0,
				.55556
			],
			"8749": [
				.862,
				1.36,
				.44445,
				0,
				.55556
			],
			"8750": [
				.86225,
				1.36,
				.44445,
				0,
				.55556
			],
			"8896": [
				.55001,
				1.05,
				0,
				0,
				1.11111
			],
			"8897": [
				.55001,
				1.05,
				0,
				0,
				1.11111
			],
			"8898": [
				.55001,
				1.05,
				0,
				0,
				1.11111
			],
			"8899": [
				.55001,
				1.05,
				0,
				0,
				1.11111
			],
			"8968": [
				.65002,
				1.15,
				0,
				0,
				.52778
			],
			"8969": [
				.65002,
				1.15,
				0,
				0,
				.52778
			],
			"8970": [
				.65002,
				1.15,
				0,
				0,
				.52778
			],
			"8971": [
				.65002,
				1.15,
				0,
				0,
				.52778
			],
			"10216": [
				.65002,
				1.15,
				0,
				0,
				.61111
			],
			"10217": [
				.65002,
				1.15,
				0,
				0,
				.61111
			],
			"10752": [
				.55001,
				1.05,
				0,
				0,
				1.51112
			],
			"10753": [
				.55001,
				1.05,
				0,
				0,
				1.51112
			],
			"10754": [
				.55001,
				1.05,
				0,
				0,
				1.51112
			],
			"10756": [
				.55001,
				1.05,
				0,
				0,
				1.11111
			],
			"10758": [
				.55001,
				1.05,
				0,
				0,
				1.11111
			]
		},
		"Size3-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"40": [
				.95003,
				1.45,
				0,
				0,
				.73611
			],
			"41": [
				.95003,
				1.45,
				0,
				0,
				.73611
			],
			"47": [
				.95003,
				1.45,
				0,
				0,
				1.04445
			],
			"91": [
				.95003,
				1.45,
				0,
				0,
				.52778
			],
			"92": [
				.95003,
				1.45,
				0,
				0,
				1.04445
			],
			"93": [
				.95003,
				1.45,
				0,
				0,
				.52778
			],
			"123": [
				.95003,
				1.45,
				0,
				0,
				.75
			],
			"125": [
				.95003,
				1.45,
				0,
				0,
				.75
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"710": [
				0,
				.75,
				0,
				0,
				1.44445
			],
			"732": [
				0,
				.75,
				0,
				0,
				1.44445
			],
			"770": [
				0,
				.75,
				0,
				0,
				1.44445
			],
			"771": [
				0,
				.75,
				0,
				0,
				1.44445
			],
			"8730": [
				.95003,
				1.45,
				0,
				0,
				1
			],
			"8968": [
				.95003,
				1.45,
				0,
				0,
				.58334
			],
			"8969": [
				.95003,
				1.45,
				0,
				0,
				.58334
			],
			"8970": [
				.95003,
				1.45,
				0,
				0,
				.58334
			],
			"8971": [
				.95003,
				1.45,
				0,
				0,
				.58334
			],
			"10216": [
				.95003,
				1.45,
				0,
				0,
				.75
			],
			"10217": [
				.95003,
				1.45,
				0,
				0,
				.75
			]
		},
		"Size4-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.25
			],
			"40": [
				1.25003,
				1.75,
				0,
				0,
				.79167
			],
			"41": [
				1.25003,
				1.75,
				0,
				0,
				.79167
			],
			"47": [
				1.25003,
				1.75,
				0,
				0,
				1.27778
			],
			"91": [
				1.25003,
				1.75,
				0,
				0,
				.58334
			],
			"92": [
				1.25003,
				1.75,
				0,
				0,
				1.27778
			],
			"93": [
				1.25003,
				1.75,
				0,
				0,
				.58334
			],
			"123": [
				1.25003,
				1.75,
				0,
				0,
				.80556
			],
			"125": [
				1.25003,
				1.75,
				0,
				0,
				.80556
			],
			"160": [
				0,
				0,
				0,
				0,
				.25
			],
			"710": [
				0,
				.825,
				0,
				0,
				1.8889
			],
			"732": [
				0,
				.825,
				0,
				0,
				1.8889
			],
			"770": [
				0,
				.825,
				0,
				0,
				1.8889
			],
			"771": [
				0,
				.825,
				0,
				0,
				1.8889
			],
			"8730": [
				1.25003,
				1.75,
				0,
				0,
				1
			],
			"8968": [
				1.25003,
				1.75,
				0,
				0,
				.63889
			],
			"8969": [
				1.25003,
				1.75,
				0,
				0,
				.63889
			],
			"8970": [
				1.25003,
				1.75,
				0,
				0,
				.63889
			],
			"8971": [
				1.25003,
				1.75,
				0,
				0,
				.63889
			],
			"9115": [
				.64502,
				1.155,
				0,
				0,
				.875
			],
			"9116": [
				1e-5,
				.6,
				0,
				0,
				.875
			],
			"9117": [
				.64502,
				1.155,
				0,
				0,
				.875
			],
			"9118": [
				.64502,
				1.155,
				0,
				0,
				.875
			],
			"9119": [
				1e-5,
				.6,
				0,
				0,
				.875
			],
			"9120": [
				.64502,
				1.155,
				0,
				0,
				.875
			],
			"9121": [
				.64502,
				1.155,
				0,
				0,
				.66667
			],
			"9122": [
				-99e-5,
				.601,
				0,
				0,
				.66667
			],
			"9123": [
				.64502,
				1.155,
				0,
				0,
				.66667
			],
			"9124": [
				.64502,
				1.155,
				0,
				0,
				.66667
			],
			"9125": [
				-99e-5,
				.601,
				0,
				0,
				.66667
			],
			"9126": [
				.64502,
				1.155,
				0,
				0,
				.66667
			],
			"9127": [
				1e-5,
				.9,
				0,
				0,
				.88889
			],
			"9128": [
				.65002,
				1.15,
				0,
				0,
				.88889
			],
			"9129": [
				.90001,
				0,
				0,
				0,
				.88889
			],
			"9130": [
				0,
				.3,
				0,
				0,
				.88889
			],
			"9131": [
				1e-5,
				.9,
				0,
				0,
				.88889
			],
			"9132": [
				.65002,
				1.15,
				0,
				0,
				.88889
			],
			"9133": [
				.90001,
				0,
				0,
				0,
				.88889
			],
			"9143": [
				.88502,
				.915,
				0,
				0,
				1.05556
			],
			"10216": [
				1.25003,
				1.75,
				0,
				0,
				.80556
			],
			"10217": [
				1.25003,
				1.75,
				0,
				0,
				.80556
			],
			"57344": [
				-.00499,
				.605,
				0,
				0,
				1.05556
			],
			"57345": [
				-.00499,
				.605,
				0,
				0,
				1.05556
			],
			"57680": [
				0,
				.12,
				0,
				0,
				.45
			],
			"57681": [
				0,
				.12,
				0,
				0,
				.45
			],
			"57682": [
				0,
				.12,
				0,
				0,
				.45
			],
			"57683": [
				0,
				.12,
				0,
				0,
				.45
			]
		},
		"Typewriter-Regular": {
			"32": [
				0,
				0,
				0,
				0,
				.525
			],
			"33": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"34": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"35": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"36": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"37": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"38": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"39": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"40": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"41": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"42": [
				0,
				.52083,
				0,
				0,
				.525
			],
			"43": [
				-.08056,
				.53055,
				0,
				0,
				.525
			],
			"44": [
				.13889,
				.125,
				0,
				0,
				.525
			],
			"45": [
				-.08056,
				.53055,
				0,
				0,
				.525
			],
			"46": [
				0,
				.125,
				0,
				0,
				.525
			],
			"47": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"48": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"49": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"50": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"51": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"52": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"53": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"54": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"55": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"56": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"57": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"58": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"59": [
				.13889,
				.43056,
				0,
				0,
				.525
			],
			"60": [
				-.05556,
				.55556,
				0,
				0,
				.525
			],
			"61": [
				-.19549,
				.41562,
				0,
				0,
				.525
			],
			"62": [
				-.05556,
				.55556,
				0,
				0,
				.525
			],
			"63": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"64": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"65": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"66": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"67": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"68": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"69": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"70": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"71": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"72": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"73": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"74": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"75": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"76": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"77": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"78": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"79": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"80": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"81": [
				.13889,
				.61111,
				0,
				0,
				.525
			],
			"82": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"83": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"84": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"85": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"86": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"87": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"88": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"89": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"90": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"91": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"92": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"93": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"94": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"95": [
				.09514,
				0,
				0,
				0,
				.525
			],
			"96": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"97": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"98": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"99": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"100": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"101": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"102": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"103": [
				.22222,
				.43056,
				0,
				0,
				.525
			],
			"104": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"105": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"106": [
				.22222,
				.61111,
				0,
				0,
				.525
			],
			"107": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"108": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"109": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"110": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"111": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"112": [
				.22222,
				.43056,
				0,
				0,
				.525
			],
			"113": [
				.22222,
				.43056,
				0,
				0,
				.525
			],
			"114": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"115": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"116": [
				0,
				.55358,
				0,
				0,
				.525
			],
			"117": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"118": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"119": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"120": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"121": [
				.22222,
				.43056,
				0,
				0,
				.525
			],
			"122": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"123": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"124": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"125": [
				.08333,
				.69444,
				0,
				0,
				.525
			],
			"126": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"127": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"160": [
				0,
				0,
				0,
				0,
				.525
			],
			"176": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"184": [
				.19445,
				0,
				0,
				0,
				.525
			],
			"305": [
				0,
				.43056,
				0,
				0,
				.525
			],
			"567": [
				.22222,
				.43056,
				0,
				0,
				.525
			],
			"711": [
				0,
				.56597,
				0,
				0,
				.525
			],
			"713": [
				0,
				.56555,
				0,
				0,
				.525
			],
			"714": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"715": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"728": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"730": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"770": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"771": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"776": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"915": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"916": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"920": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"923": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"926": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"928": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"931": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"933": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"934": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"936": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"937": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"8216": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"8217": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"8242": [
				0,
				.61111,
				0,
				0,
				.525
			],
			"9251": [
				.11111,
				.21944,
				0,
				0,
				.525
			]
		}
	};
	sigmasAndXis = {
		slant: [
			.25,
			.25,
			.25
		],
		space: [
			0,
			0,
			0
		],
		stretch: [
			0,
			0,
			0
		],
		shrink: [
			0,
			0,
			0
		],
		xHeight: [
			.431,
			.431,
			.431
		],
		quad: [
			1,
			1.171,
			1.472
		],
		extraSpace: [
			0,
			0,
			0
		],
		num1: [
			.677,
			.732,
			.925
		],
		num2: [
			.394,
			.384,
			.387
		],
		num3: [
			.444,
			.471,
			.504
		],
		denom1: [
			.686,
			.752,
			1.025
		],
		denom2: [
			.345,
			.344,
			.532
		],
		sup1: [
			.413,
			.503,
			.504
		],
		sup2: [
			.363,
			.431,
			.404
		],
		sup3: [
			.289,
			.286,
			.294
		],
		sub1: [
			.15,
			.143,
			.2
		],
		sub2: [
			.247,
			.286,
			.4
		],
		supDrop: [
			.386,
			.353,
			.494
		],
		subDrop: [
			.05,
			.071,
			.1
		],
		delim1: [
			2.39,
			1.7,
			1.98
		],
		delim2: [
			1.01,
			1.157,
			1.42
		],
		axisHeight: [
			.25,
			.25,
			.25
		],
		defaultRuleThickness: [
			.04,
			.049,
			.049
		],
		bigOpSpacing1: [
			.111,
			.111,
			.111
		],
		bigOpSpacing2: [
			.166,
			.166,
			.166
		],
		bigOpSpacing3: [
			.2,
			.2,
			.2
		],
		bigOpSpacing4: [
			.6,
			.611,
			.611
		],
		bigOpSpacing5: [
			.1,
			.143,
			.143
		],
		sqrtRuleThickness: [
			.04,
			.04,
			.04
		],
		ptPerEm: [
			10,
			10,
			10
		],
		doubleRuleSep: [
			.2,
			.2,
			.2
		],
		arrayRuleWidth: [
			.04,
			.04,
			.04
		],
		fboxsep: [
			.3,
			.3,
			.3
		],
		fboxrule: [
			.04,
			.04,
			.04
		]
	};
	extraCharacterMap = {
		"Å": "A",
		"Ð": "D",
		"Þ": "o",
		"å": "a",
		"ð": "d",
		"þ": "o",
		"А": "A",
		"Б": "B",
		"В": "B",
		"Г": "F",
		"Д": "A",
		"Е": "E",
		"Ж": "K",
		"З": "3",
		"И": "N",
		"Й": "N",
		"К": "K",
		"Л": "N",
		"М": "M",
		"Н": "H",
		"О": "O",
		"П": "N",
		"Р": "P",
		"С": "C",
		"Т": "T",
		"У": "y",
		"Ф": "O",
		"Х": "X",
		"Ц": "U",
		"Ч": "h",
		"Ш": "W",
		"Щ": "W",
		"Ъ": "B",
		"Ы": "X",
		"Ь": "B",
		"Э": "3",
		"Ю": "X",
		"Я": "R",
		"а": "a",
		"б": "b",
		"в": "a",
		"г": "r",
		"д": "y",
		"е": "e",
		"ж": "m",
		"з": "e",
		"и": "n",
		"й": "n",
		"к": "n",
		"л": "n",
		"м": "m",
		"н": "n",
		"о": "o",
		"п": "n",
		"р": "p",
		"с": "c",
		"т": "o",
		"у": "y",
		"ф": "b",
		"х": "x",
		"ц": "n",
		"ч": "n",
		"ш": "w",
		"щ": "w",
		"ъ": "a",
		"ы": "m",
		"ь": "a",
		"э": "e",
		"ю": "m",
		"я": "r"
	};
	fontMetricsBySizeIndex = {};
	sizeStyleMap = [
		[
			1,
			1,
			1
		],
		[
			2,
			1,
			1
		],
		[
			3,
			1,
			1
		],
		[
			4,
			2,
			1
		],
		[
			5,
			2,
			1
		],
		[
			6,
			3,
			1
		],
		[
			7,
			4,
			2
		],
		[
			8,
			6,
			3
		],
		[
			9,
			7,
			6
		],
		[
			10,
			8,
			7
		],
		[
			11,
			10,
			9
		]
	];
	sizeMultipliers = [
		.5,
		.6,
		.7,
		.8,
		.9,
		1,
		1.2,
		1.44,
		1.728,
		2.074,
		2.488
	];
	sizeAtStyle = function sizeAtStyle(size, style) {
		return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
	};
	Options = class Options {
		/**
		* The base size index.
		*/
		constructor(data) {
			this.style = void 0;
			this.color = void 0;
			this.size = void 0;
			this.textSize = void 0;
			this.phantom = void 0;
			this.font = void 0;
			this.fontFamily = void 0;
			this.fontWeight = void 0;
			this.fontShape = void 0;
			this.sizeMultiplier = void 0;
			this.maxSize = void 0;
			this.minRuleThickness = void 0;
			this._fontMetrics = void 0;
			this.style = data.style;
			this.color = data.color;
			this.size = data.size || Options.BASESIZE;
			this.textSize = data.textSize || this.size;
			this.phantom = !!data.phantom;
			this.font = data.font || "";
			this.fontFamily = data.fontFamily || "";
			this.fontWeight = data.fontWeight || "";
			this.fontShape = data.fontShape || "";
			this.sizeMultiplier = sizeMultipliers[this.size - 1];
			this.maxSize = data.maxSize;
			this.minRuleThickness = data.minRuleThickness;
			this._fontMetrics = void 0;
		}
		/**
		* Returns a new options object with the same properties as "this".  Properties
		* from "extension" will be copied to the new options object.
		*/
		extend(extension) {
			var data = {
				style: this.style,
				size: this.size,
				textSize: this.textSize,
				color: this.color,
				phantom: this.phantom,
				font: this.font,
				fontFamily: this.fontFamily,
				fontWeight: this.fontWeight,
				fontShape: this.fontShape,
				maxSize: this.maxSize,
				minRuleThickness: this.minRuleThickness
			};
			for (var key in extension) if (extension.hasOwnProperty(key)) data[key] = extension[key];
			return new Options(data);
		}
		/**
		* Return an options object with the given style. If `this.style === style`,
		* returns `this`.
		*/
		havingStyle(style) {
			if (this.style === style) return this;
			else return this.extend({
				style,
				size: sizeAtStyle(this.textSize, style)
			});
		}
		/**
		* Return an options object with a cramped version of the current style. If
		* the current style is cramped, returns `this`.
		*/
		havingCrampedStyle() {
			return this.havingStyle(this.style.cramp());
		}
		/**
		* Return an options object with the given size and in at least `\textstyle`.
		* Returns `this` if appropriate.
		*/
		havingSize(size) {
			if (this.size === size && this.textSize === size) return this;
			else return this.extend({
				style: this.style.text(),
				size,
				textSize: size,
				sizeMultiplier: sizeMultipliers[size - 1]
			});
		}
		/**
		* Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
		* changes to at least `\textstyle`.
		*/
		havingBaseStyle(style) {
			style = style || this.style.text();
			var wantSize = sizeAtStyle(Options.BASESIZE, style);
			if (this.size === wantSize && this.textSize === Options.BASESIZE && this.style === style) return this;
			else return this.extend({
				style,
				size: wantSize
			});
		}
		/**
		* Remove the effect of sizing changes such as \Huge.
		* Keep the effect of the current style, such as \scriptstyle.
		*/
		havingBaseSizing() {
			var size;
			switch (this.style.id) {
				case 4:
				case 5:
					size = 3;
					break;
				case 6:
				case 7:
					size = 1;
					break;
				default: size = 6;
			}
			return this.extend({
				style: this.style.text(),
				size
			});
		}
		/**
		* Create a new options object with the given color.
		*/
		withColor(color) {
			return this.extend({ color });
		}
		/**
		* Create a new options object with "phantom" set to true.
		*/
		withPhantom() {
			return this.extend({ phantom: true });
		}
		/**
		* Creates a new options object with the given math font or old text font.
		* @type {[type]}
		*/
		withFont(font) {
			return this.extend({ font });
		}
		/**
		* Create a new options objects with the given fontFamily.
		*/
		withTextFontFamily(fontFamily) {
			return this.extend({
				fontFamily,
				font: ""
			});
		}
		/**
		* Creates a new options object with the given font weight
		*/
		withTextFontWeight(fontWeight) {
			return this.extend({
				fontWeight,
				font: ""
			});
		}
		/**
		* Creates a new options object with the given font weight
		*/
		withTextFontShape(fontShape) {
			return this.extend({
				fontShape,
				font: ""
			});
		}
		/**
		* Return the CSS sizing classes required to switch from enclosing options
		* `oldOptions` to `this`. Returns an array of classes.
		*/
		sizingClasses(oldOptions) {
			if (oldOptions.size !== this.size) return [
				"sizing",
				"reset-size" + oldOptions.size,
				"size" + this.size
			];
			else return [];
		}
		/**
		* Return the CSS sizing classes required to switch to the base size. Like
		* `this.havingSize(BASESIZE).sizingClasses(this)`.
		*/
		baseSizingClasses() {
			if (this.size !== Options.BASESIZE) return [
				"sizing",
				"reset-size" + this.size,
				"size" + Options.BASESIZE
			];
			else return [];
		}
		/**
		* Return the font metrics for this size.
		*/
		fontMetrics() {
			if (!this._fontMetrics) this._fontMetrics = getGlobalMetrics(this.size);
			return this._fontMetrics;
		}
		/**
		* Gets the CSS color of the current options object
		*/
		getColor() {
			if (this.phantom) return "transparent";
			else return this.color;
		}
	};
	Options.BASESIZE = 6;
	ptPerUnit = {
		"pt": 1,
		"mm": 7227 / 2540,
		"cm": 7227 / 254,
		"in": 72.27,
		"bp": 803 / 800,
		"pc": 12,
		"dd": 1238 / 1157,
		"cc": 14856 / 1157,
		"nd": 685 / 642,
		"nc": 1370 / 107,
		"sp": 1 / 65536,
		"px": 803 / 800
	};
	relativeUnit = {
		"ex": true,
		"em": true,
		"mu": true
	};
	validUnit = function validUnit(unit) {
		if (typeof unit !== "string") unit = unit.unit;
		return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
	};
	calculateSize = function calculateSize(sizeValue, options) {
		var scale;
		if (sizeValue.unit in ptPerUnit) scale = ptPerUnit[sizeValue.unit] / options.fontMetrics().ptPerEm / options.sizeMultiplier;
		else if (sizeValue.unit === "mu") scale = options.fontMetrics().cssEmPerMu;
		else {
			var unitOptions;
			if (options.style.isTight()) unitOptions = options.havingStyle(options.style.text());
			else unitOptions = options;
			if (sizeValue.unit === "ex") scale = unitOptions.fontMetrics().xHeight;
			else if (sizeValue.unit === "em") scale = unitOptions.fontMetrics().quad;
			else throw new ParseError("Invalid unit: '" + sizeValue.unit + "'");
			if (unitOptions !== options) scale *= unitOptions.sizeMultiplier / options.sizeMultiplier;
		}
		return Math.min(sizeValue.number * scale, options.maxSize);
	};
	makeEm = function makeEm(n) {
		return +n.toFixed(4) + "em";
	};
	createClass = function createClass(classes) {
		return classes.filter((cls) => cls).join(" ");
	};
	initNode = function initNode(classes, options, style) {
		this.classes = classes || [];
		this.attributes = {};
		this.height = 0;
		this.depth = 0;
		this.maxFontSize = 0;
		this.style = style || {};
		if (options) {
			if (options.style.isTight()) this.classes.push("mtight");
			var color = options.getColor();
			if (color) this.style.color = color;
		}
	};
	toNode = function toNode(tagName) {
		var node = document.createElement(tagName);
		node.className = createClass(this.classes);
		for (var style in this.style) if (this.style.hasOwnProperty(style)) node.style[style] = this.style[style];
		for (var attr in this.attributes) if (this.attributes.hasOwnProperty(attr)) node.setAttribute(attr, this.attributes[attr]);
		for (var i = 0; i < this.children.length; i++) node.appendChild(this.children[i].toNode());
		return node;
	};
	invalidAttributeNameRegex = /[\s"'>/=\x00-\x1f]/;
	toMarkup = function toMarkup(tagName) {
		var markup = "<" + tagName;
		if (this.classes.length) markup += " class=\"" + utils.escape(createClass(this.classes)) + "\"";
		var styles = "";
		for (var style in this.style) if (this.style.hasOwnProperty(style)) styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
		if (styles) markup += " style=\"" + utils.escape(styles) + "\"";
		for (var attr in this.attributes) if (this.attributes.hasOwnProperty(attr)) {
			if (invalidAttributeNameRegex.test(attr)) throw new ParseError("Invalid attribute name '" + attr + "'");
			markup += " " + attr + "=\"" + utils.escape(this.attributes[attr]) + "\"";
		}
		markup += ">";
		for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
		markup += "</" + tagName + ">";
		return markup;
	};
	Span = class {
		constructor(classes, children, options, style) {
			this.children = void 0;
			this.attributes = void 0;
			this.classes = void 0;
			this.height = void 0;
			this.depth = void 0;
			this.width = void 0;
			this.maxFontSize = void 0;
			this.style = void 0;
			initNode.call(this, classes, options, style);
			this.children = children || [];
		}
		/**
		* Sets an arbitrary attribute on the span. Warning: use this wisely. Not
		* all browsers support attributes the same, and having too many custom
		* attributes is probably bad.
		*/
		setAttribute(attribute, value) {
			this.attributes[attribute] = value;
		}
		hasClass(className) {
			return this.classes.includes(className);
		}
		toNode() {
			return toNode.call(this, "span");
		}
		toMarkup() {
			return toMarkup.call(this, "span");
		}
	};
	Anchor = class {
		constructor(href, classes, children, options) {
			this.children = void 0;
			this.attributes = void 0;
			this.classes = void 0;
			this.height = void 0;
			this.depth = void 0;
			this.maxFontSize = void 0;
			this.style = void 0;
			initNode.call(this, classes, options);
			this.children = children || [];
			this.setAttribute("href", href);
		}
		setAttribute(attribute, value) {
			this.attributes[attribute] = value;
		}
		hasClass(className) {
			return this.classes.includes(className);
		}
		toNode() {
			return toNode.call(this, "a");
		}
		toMarkup() {
			return toMarkup.call(this, "a");
		}
	};
	Img = class {
		constructor(src, alt, style) {
			this.src = void 0;
			this.alt = void 0;
			this.classes = void 0;
			this.height = void 0;
			this.depth = void 0;
			this.maxFontSize = void 0;
			this.style = void 0;
			this.alt = alt;
			this.src = src;
			this.classes = ["mord"];
			this.style = style;
		}
		hasClass(className) {
			return this.classes.includes(className);
		}
		toNode() {
			var node = document.createElement("img");
			node.src = this.src;
			node.alt = this.alt;
			node.className = "mord";
			for (var style in this.style) if (this.style.hasOwnProperty(style)) node.style[style] = this.style[style];
			return node;
		}
		toMarkup() {
			var markup = "<img src=\"" + utils.escape(this.src) + "\"" + (" alt=\"" + utils.escape(this.alt) + "\"");
			var styles = "";
			for (var style in this.style) if (this.style.hasOwnProperty(style)) styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
			if (styles) markup += " style=\"" + utils.escape(styles) + "\"";
			markup += "'/>";
			return markup;
		}
	};
	iCombinations = {
		"î": "ı̂",
		"ï": "ı̈",
		"í": "ı́",
		"ì": "ı̀"
	};
	SymbolNode = class {
		constructor(text, height, depth, italic, skew, width, classes, style) {
			this.text = void 0;
			this.height = void 0;
			this.depth = void 0;
			this.italic = void 0;
			this.skew = void 0;
			this.width = void 0;
			this.maxFontSize = void 0;
			this.classes = void 0;
			this.style = void 0;
			this.text = text;
			this.height = height || 0;
			this.depth = depth || 0;
			this.italic = italic || 0;
			this.skew = skew || 0;
			this.width = width || 0;
			this.classes = classes || [];
			this.style = style || {};
			this.maxFontSize = 0;
			var script = scriptFromCodepoint(this.text.charCodeAt(0));
			if (script) this.classes.push(script + "_fallback");
			if (/[îïíì]/.test(this.text)) this.text = iCombinations[this.text];
		}
		hasClass(className) {
			return this.classes.includes(className);
		}
		/**
		* Creates a text node or span from a symbol node. Note that a span is only
		* created if it is needed.
		*/
		toNode() {
			var node = document.createTextNode(this.text);
			var span = null;
			if (this.italic > 0) {
				span = document.createElement("span");
				span.style.marginRight = makeEm(this.italic);
			}
			if (this.classes.length > 0) {
				span = span || document.createElement("span");
				span.className = createClass(this.classes);
			}
			for (var style in this.style) if (this.style.hasOwnProperty(style)) {
				span = span || document.createElement("span");
				span.style[style] = this.style[style];
			}
			if (span) {
				span.appendChild(node);
				return span;
			} else return node;
		}
		/**
		* Creates markup for a symbol node.
		*/
		toMarkup() {
			var needsSpan = false;
			var markup = "<span";
			if (this.classes.length) {
				needsSpan = true;
				markup += " class=\"";
				markup += utils.escape(createClass(this.classes));
				markup += "\"";
			}
			var styles = "";
			if (this.italic > 0) styles += "margin-right:" + this.italic + "em;";
			for (var style in this.style) if (this.style.hasOwnProperty(style)) styles += utils.hyphenate(style) + ":" + this.style[style] + ";";
			if (styles) {
				needsSpan = true;
				markup += " style=\"" + utils.escape(styles) + "\"";
			}
			var escaped = utils.escape(this.text);
			if (needsSpan) {
				markup += ">";
				markup += escaped;
				markup += "</span>";
				return markup;
			} else return escaped;
		}
	};
	SvgNode = class {
		constructor(children, attributes) {
			this.children = void 0;
			this.attributes = void 0;
			this.children = children || [];
			this.attributes = attributes || {};
		}
		toNode() {
			var node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) node.setAttribute(attr, this.attributes[attr]);
			for (var i = 0; i < this.children.length; i++) node.appendChild(this.children[i].toNode());
			return node;
		}
		toMarkup() {
			var markup = "<svg xmlns=\"http://www.w3.org/2000/svg\"";
			for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) markup += " " + attr + "=\"" + utils.escape(this.attributes[attr]) + "\"";
			markup += ">";
			for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
			markup += "</svg>";
			return markup;
		}
	};
	PathNode = class {
		constructor(pathName, alternate) {
			this.pathName = void 0;
			this.alternate = void 0;
			this.pathName = pathName;
			this.alternate = alternate;
		}
		toNode() {
			var node = document.createElementNS("http://www.w3.org/2000/svg", "path");
			if (this.alternate) node.setAttribute("d", this.alternate);
			else node.setAttribute("d", path[this.pathName]);
			return node;
		}
		toMarkup() {
			if (this.alternate) return "<path d=\"" + utils.escape(this.alternate) + "\"/>";
			else return "<path d=\"" + utils.escape(path[this.pathName]) + "\"/>";
		}
	};
	LineNode = class {
		constructor(attributes) {
			this.attributes = void 0;
			this.attributes = attributes || {};
		}
		toNode() {
			var node = document.createElementNS("http://www.w3.org/2000/svg", "line");
			for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) node.setAttribute(attr, this.attributes[attr]);
			return node;
		}
		toMarkup() {
			var markup = "<line";
			for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) markup += " " + attr + "=\"" + utils.escape(this.attributes[attr]) + "\"";
			markup += "/>";
			return markup;
		}
	};
	ATOMS = {
		"bin": 1,
		"close": 1,
		"inner": 1,
		"open": 1,
		"punct": 1,
		"rel": 1
	};
	NON_ATOMS = {
		"accent-token": 1,
		"mathord": 1,
		"op-token": 1,
		"spacing": 1,
		"textord": 1
	};
	symbols = {
		"math": {},
		"text": {}
	};
	math = "math";
	text = "text";
	main = "main";
	ams = "ams";
	accent = "accent-token";
	bin = "bin";
	close = "close";
	inner = "inner";
	mathord = "mathord";
	op = "op-token";
	open = "open";
	punct = "punct";
	rel = "rel";
	spacing = "spacing";
	textord = "textord";
	defineSymbol(math, main, rel, "≡", "\\equiv", true);
	defineSymbol(math, main, rel, "≺", "\\prec", true);
	defineSymbol(math, main, rel, "≻", "\\succ", true);
	defineSymbol(math, main, rel, "∼", "\\sim", true);
	defineSymbol(math, main, rel, "⊥", "\\perp");
	defineSymbol(math, main, rel, "⪯", "\\preceq", true);
	defineSymbol(math, main, rel, "⪰", "\\succeq", true);
	defineSymbol(math, main, rel, "≃", "\\simeq", true);
	defineSymbol(math, main, rel, "∣", "\\mid", true);
	defineSymbol(math, main, rel, "≪", "\\ll", true);
	defineSymbol(math, main, rel, "≫", "\\gg", true);
	defineSymbol(math, main, rel, "≍", "\\asymp", true);
	defineSymbol(math, main, rel, "∥", "\\parallel");
	defineSymbol(math, main, rel, "⋈", "\\bowtie", true);
	defineSymbol(math, main, rel, "⌣", "\\smile", true);
	defineSymbol(math, main, rel, "⊑", "\\sqsubseteq", true);
	defineSymbol(math, main, rel, "⊒", "\\sqsupseteq", true);
	defineSymbol(math, main, rel, "≐", "\\doteq", true);
	defineSymbol(math, main, rel, "⌢", "\\frown", true);
	defineSymbol(math, main, rel, "∋", "\\ni", true);
	defineSymbol(math, main, rel, "∝", "\\propto", true);
	defineSymbol(math, main, rel, "⊢", "\\vdash", true);
	defineSymbol(math, main, rel, "⊣", "\\dashv", true);
	defineSymbol(math, main, rel, "∋", "\\owns");
	defineSymbol(math, main, punct, ".", "\\ldotp");
	defineSymbol(math, main, punct, "⋅", "\\cdotp");
	defineSymbol(math, main, textord, "#", "\\#");
	defineSymbol(text, main, textord, "#", "\\#");
	defineSymbol(math, main, textord, "&", "\\&");
	defineSymbol(text, main, textord, "&", "\\&");
	defineSymbol(math, main, textord, "ℵ", "\\aleph", true);
	defineSymbol(math, main, textord, "∀", "\\forall", true);
	defineSymbol(math, main, textord, "ℏ", "\\hbar", true);
	defineSymbol(math, main, textord, "∃", "\\exists", true);
	defineSymbol(math, main, textord, "∇", "\\nabla", true);
	defineSymbol(math, main, textord, "♭", "\\flat", true);
	defineSymbol(math, main, textord, "ℓ", "\\ell", true);
	defineSymbol(math, main, textord, "♮", "\\natural", true);
	defineSymbol(math, main, textord, "♣", "\\clubsuit", true);
	defineSymbol(math, main, textord, "℘", "\\wp", true);
	defineSymbol(math, main, textord, "♯", "\\sharp", true);
	defineSymbol(math, main, textord, "♢", "\\diamondsuit", true);
	defineSymbol(math, main, textord, "ℜ", "\\Re", true);
	defineSymbol(math, main, textord, "♡", "\\heartsuit", true);
	defineSymbol(math, main, textord, "ℑ", "\\Im", true);
	defineSymbol(math, main, textord, "♠", "\\spadesuit", true);
	defineSymbol(math, main, textord, "§", "\\S", true);
	defineSymbol(text, main, textord, "§", "\\S");
	defineSymbol(math, main, textord, "¶", "\\P", true);
	defineSymbol(text, main, textord, "¶", "\\P");
	defineSymbol(math, main, textord, "†", "\\dag");
	defineSymbol(text, main, textord, "†", "\\dag");
	defineSymbol(text, main, textord, "†", "\\textdagger");
	defineSymbol(math, main, textord, "‡", "\\ddag");
	defineSymbol(text, main, textord, "‡", "\\ddag");
	defineSymbol(text, main, textord, "‡", "\\textdaggerdbl");
	defineSymbol(math, main, close, "⎱", "\\rmoustache", true);
	defineSymbol(math, main, open, "⎰", "\\lmoustache", true);
	defineSymbol(math, main, close, "⟯", "\\rgroup", true);
	defineSymbol(math, main, open, "⟮", "\\lgroup", true);
	defineSymbol(math, main, bin, "∓", "\\mp", true);
	defineSymbol(math, main, bin, "⊖", "\\ominus", true);
	defineSymbol(math, main, bin, "⊎", "\\uplus", true);
	defineSymbol(math, main, bin, "⊓", "\\sqcap", true);
	defineSymbol(math, main, bin, "∗", "\\ast");
	defineSymbol(math, main, bin, "⊔", "\\sqcup", true);
	defineSymbol(math, main, bin, "◯", "\\bigcirc", true);
	defineSymbol(math, main, bin, "∙", "\\bullet", true);
	defineSymbol(math, main, bin, "‡", "\\ddagger");
	defineSymbol(math, main, bin, "≀", "\\wr", true);
	defineSymbol(math, main, bin, "⨿", "\\amalg");
	defineSymbol(math, main, bin, "&", "\\And");
	defineSymbol(math, main, rel, "⟵", "\\longleftarrow", true);
	defineSymbol(math, main, rel, "⇐", "\\Leftarrow", true);
	defineSymbol(math, main, rel, "⟸", "\\Longleftarrow", true);
	defineSymbol(math, main, rel, "⟶", "\\longrightarrow", true);
	defineSymbol(math, main, rel, "⇒", "\\Rightarrow", true);
	defineSymbol(math, main, rel, "⟹", "\\Longrightarrow", true);
	defineSymbol(math, main, rel, "↔", "\\leftrightarrow", true);
	defineSymbol(math, main, rel, "⟷", "\\longleftrightarrow", true);
	defineSymbol(math, main, rel, "⇔", "\\Leftrightarrow", true);
	defineSymbol(math, main, rel, "⟺", "\\Longleftrightarrow", true);
	defineSymbol(math, main, rel, "↦", "\\mapsto", true);
	defineSymbol(math, main, rel, "⟼", "\\longmapsto", true);
	defineSymbol(math, main, rel, "↗", "\\nearrow", true);
	defineSymbol(math, main, rel, "↩", "\\hookleftarrow", true);
	defineSymbol(math, main, rel, "↪", "\\hookrightarrow", true);
	defineSymbol(math, main, rel, "↘", "\\searrow", true);
	defineSymbol(math, main, rel, "↼", "\\leftharpoonup", true);
	defineSymbol(math, main, rel, "⇀", "\\rightharpoonup", true);
	defineSymbol(math, main, rel, "↙", "\\swarrow", true);
	defineSymbol(math, main, rel, "↽", "\\leftharpoondown", true);
	defineSymbol(math, main, rel, "⇁", "\\rightharpoondown", true);
	defineSymbol(math, main, rel, "↖", "\\nwarrow", true);
	defineSymbol(math, main, rel, "⇌", "\\rightleftharpoons", true);
	defineSymbol(math, ams, rel, "≮", "\\nless", true);
	defineSymbol(math, ams, rel, "", "\\@nleqslant");
	defineSymbol(math, ams, rel, "", "\\@nleqq");
	defineSymbol(math, ams, rel, "⪇", "\\lneq", true);
	defineSymbol(math, ams, rel, "≨", "\\lneqq", true);
	defineSymbol(math, ams, rel, "", "\\@lvertneqq");
	defineSymbol(math, ams, rel, "⋦", "\\lnsim", true);
	defineSymbol(math, ams, rel, "⪉", "\\lnapprox", true);
	defineSymbol(math, ams, rel, "⊀", "\\nprec", true);
	defineSymbol(math, ams, rel, "⋠", "\\npreceq", true);
	defineSymbol(math, ams, rel, "⋨", "\\precnsim", true);
	defineSymbol(math, ams, rel, "⪹", "\\precnapprox", true);
	defineSymbol(math, ams, rel, "≁", "\\nsim", true);
	defineSymbol(math, ams, rel, "", "\\@nshortmid");
	defineSymbol(math, ams, rel, "∤", "\\nmid", true);
	defineSymbol(math, ams, rel, "⊬", "\\nvdash", true);
	defineSymbol(math, ams, rel, "⊭", "\\nvDash", true);
	defineSymbol(math, ams, rel, "⋪", "\\ntriangleleft");
	defineSymbol(math, ams, rel, "⋬", "\\ntrianglelefteq", true);
	defineSymbol(math, ams, rel, "⊊", "\\subsetneq", true);
	defineSymbol(math, ams, rel, "", "\\@varsubsetneq");
	defineSymbol(math, ams, rel, "⫋", "\\subsetneqq", true);
	defineSymbol(math, ams, rel, "", "\\@varsubsetneqq");
	defineSymbol(math, ams, rel, "≯", "\\ngtr", true);
	defineSymbol(math, ams, rel, "", "\\@ngeqslant");
	defineSymbol(math, ams, rel, "", "\\@ngeqq");
	defineSymbol(math, ams, rel, "⪈", "\\gneq", true);
	defineSymbol(math, ams, rel, "≩", "\\gneqq", true);
	defineSymbol(math, ams, rel, "", "\\@gvertneqq");
	defineSymbol(math, ams, rel, "⋧", "\\gnsim", true);
	defineSymbol(math, ams, rel, "⪊", "\\gnapprox", true);
	defineSymbol(math, ams, rel, "⊁", "\\nsucc", true);
	defineSymbol(math, ams, rel, "⋡", "\\nsucceq", true);
	defineSymbol(math, ams, rel, "⋩", "\\succnsim", true);
	defineSymbol(math, ams, rel, "⪺", "\\succnapprox", true);
	defineSymbol(math, ams, rel, "≆", "\\ncong", true);
	defineSymbol(math, ams, rel, "", "\\@nshortparallel");
	defineSymbol(math, ams, rel, "∦", "\\nparallel", true);
	defineSymbol(math, ams, rel, "⊯", "\\nVDash", true);
	defineSymbol(math, ams, rel, "⋫", "\\ntriangleright");
	defineSymbol(math, ams, rel, "⋭", "\\ntrianglerighteq", true);
	defineSymbol(math, ams, rel, "", "\\@nsupseteqq");
	defineSymbol(math, ams, rel, "⊋", "\\supsetneq", true);
	defineSymbol(math, ams, rel, "", "\\@varsupsetneq");
	defineSymbol(math, ams, rel, "⫌", "\\supsetneqq", true);
	defineSymbol(math, ams, rel, "", "\\@varsupsetneqq");
	defineSymbol(math, ams, rel, "⊮", "\\nVdash", true);
	defineSymbol(math, ams, rel, "⪵", "\\precneqq", true);
	defineSymbol(math, ams, rel, "⪶", "\\succneqq", true);
	defineSymbol(math, ams, rel, "", "\\@nsubseteqq");
	defineSymbol(math, ams, bin, "⊴", "\\unlhd");
	defineSymbol(math, ams, bin, "⊵", "\\unrhd");
	defineSymbol(math, ams, rel, "↚", "\\nleftarrow", true);
	defineSymbol(math, ams, rel, "↛", "\\nrightarrow", true);
	defineSymbol(math, ams, rel, "⇍", "\\nLeftarrow", true);
	defineSymbol(math, ams, rel, "⇏", "\\nRightarrow", true);
	defineSymbol(math, ams, rel, "↮", "\\nleftrightarrow", true);
	defineSymbol(math, ams, rel, "⇎", "\\nLeftrightarrow", true);
	defineSymbol(math, ams, rel, "△", "\\vartriangle");
	defineSymbol(math, ams, textord, "ℏ", "\\hslash");
	defineSymbol(math, ams, textord, "▽", "\\triangledown");
	defineSymbol(math, ams, textord, "◊", "\\lozenge");
	defineSymbol(math, ams, textord, "Ⓢ", "\\circledS");
	defineSymbol(math, ams, textord, "®", "\\circledR");
	defineSymbol(text, ams, textord, "®", "\\circledR");
	defineSymbol(math, ams, textord, "∡", "\\measuredangle", true);
	defineSymbol(math, ams, textord, "∄", "\\nexists");
	defineSymbol(math, ams, textord, "℧", "\\mho");
	defineSymbol(math, ams, textord, "Ⅎ", "\\Finv", true);
	defineSymbol(math, ams, textord, "⅁", "\\Game", true);
	defineSymbol(math, ams, textord, "‵", "\\backprime");
	defineSymbol(math, ams, textord, "▲", "\\blacktriangle");
	defineSymbol(math, ams, textord, "▼", "\\blacktriangledown");
	defineSymbol(math, ams, textord, "■", "\\blacksquare");
	defineSymbol(math, ams, textord, "⧫", "\\blacklozenge");
	defineSymbol(math, ams, textord, "★", "\\bigstar");
	defineSymbol(math, ams, textord, "∢", "\\sphericalangle", true);
	defineSymbol(math, ams, textord, "∁", "\\complement", true);
	defineSymbol(math, ams, textord, "ð", "\\eth", true);
	defineSymbol(text, main, textord, "ð", "ð");
	defineSymbol(math, ams, textord, "╱", "\\diagup");
	defineSymbol(math, ams, textord, "╲", "\\diagdown");
	defineSymbol(math, ams, textord, "□", "\\square");
	defineSymbol(math, ams, textord, "□", "\\Box");
	defineSymbol(math, ams, textord, "◊", "\\Diamond");
	defineSymbol(math, ams, textord, "¥", "\\yen", true);
	defineSymbol(text, ams, textord, "¥", "\\yen", true);
	defineSymbol(math, ams, textord, "✓", "\\checkmark", true);
	defineSymbol(text, ams, textord, "✓", "\\checkmark");
	defineSymbol(math, ams, textord, "ℶ", "\\beth", true);
	defineSymbol(math, ams, textord, "ℸ", "\\daleth", true);
	defineSymbol(math, ams, textord, "ℷ", "\\gimel", true);
	defineSymbol(math, ams, textord, "ϝ", "\\digamma", true);
	defineSymbol(math, ams, textord, "ϰ", "\\varkappa");
	defineSymbol(math, ams, open, "┌", "\\@ulcorner", true);
	defineSymbol(math, ams, close, "┐", "\\@urcorner", true);
	defineSymbol(math, ams, open, "└", "\\@llcorner", true);
	defineSymbol(math, ams, close, "┘", "\\@lrcorner", true);
	defineSymbol(math, ams, rel, "≦", "\\leqq", true);
	defineSymbol(math, ams, rel, "⩽", "\\leqslant", true);
	defineSymbol(math, ams, rel, "⪕", "\\eqslantless", true);
	defineSymbol(math, ams, rel, "≲", "\\lesssim", true);
	defineSymbol(math, ams, rel, "⪅", "\\lessapprox", true);
	defineSymbol(math, ams, rel, "≊", "\\approxeq", true);
	defineSymbol(math, ams, bin, "⋖", "\\lessdot");
	defineSymbol(math, ams, rel, "⋘", "\\lll", true);
	defineSymbol(math, ams, rel, "≶", "\\lessgtr", true);
	defineSymbol(math, ams, rel, "⋚", "\\lesseqgtr", true);
	defineSymbol(math, ams, rel, "⪋", "\\lesseqqgtr", true);
	defineSymbol(math, ams, rel, "≑", "\\doteqdot");
	defineSymbol(math, ams, rel, "≓", "\\risingdotseq", true);
	defineSymbol(math, ams, rel, "≒", "\\fallingdotseq", true);
	defineSymbol(math, ams, rel, "∽", "\\backsim", true);
	defineSymbol(math, ams, rel, "⋍", "\\backsimeq", true);
	defineSymbol(math, ams, rel, "⫅", "\\subseteqq", true);
	defineSymbol(math, ams, rel, "⋐", "\\Subset", true);
	defineSymbol(math, ams, rel, "⊏", "\\sqsubset", true);
	defineSymbol(math, ams, rel, "≼", "\\preccurlyeq", true);
	defineSymbol(math, ams, rel, "⋞", "\\curlyeqprec", true);
	defineSymbol(math, ams, rel, "≾", "\\precsim", true);
	defineSymbol(math, ams, rel, "⪷", "\\precapprox", true);
	defineSymbol(math, ams, rel, "⊲", "\\vartriangleleft");
	defineSymbol(math, ams, rel, "⊴", "\\trianglelefteq");
	defineSymbol(math, ams, rel, "⊨", "\\vDash", true);
	defineSymbol(math, ams, rel, "⊪", "\\Vvdash", true);
	defineSymbol(math, ams, rel, "⌣", "\\smallsmile");
	defineSymbol(math, ams, rel, "⌢", "\\smallfrown");
	defineSymbol(math, ams, rel, "≏", "\\bumpeq", true);
	defineSymbol(math, ams, rel, "≎", "\\Bumpeq", true);
	defineSymbol(math, ams, rel, "≧", "\\geqq", true);
	defineSymbol(math, ams, rel, "⩾", "\\geqslant", true);
	defineSymbol(math, ams, rel, "⪖", "\\eqslantgtr", true);
	defineSymbol(math, ams, rel, "≳", "\\gtrsim", true);
	defineSymbol(math, ams, rel, "⪆", "\\gtrapprox", true);
	defineSymbol(math, ams, bin, "⋗", "\\gtrdot");
	defineSymbol(math, ams, rel, "⋙", "\\ggg", true);
	defineSymbol(math, ams, rel, "≷", "\\gtrless", true);
	defineSymbol(math, ams, rel, "⋛", "\\gtreqless", true);
	defineSymbol(math, ams, rel, "⪌", "\\gtreqqless", true);
	defineSymbol(math, ams, rel, "≖", "\\eqcirc", true);
	defineSymbol(math, ams, rel, "≗", "\\circeq", true);
	defineSymbol(math, ams, rel, "≜", "\\triangleq", true);
	defineSymbol(math, ams, rel, "∼", "\\thicksim");
	defineSymbol(math, ams, rel, "≈", "\\thickapprox");
	defineSymbol(math, ams, rel, "⫆", "\\supseteqq", true);
	defineSymbol(math, ams, rel, "⋑", "\\Supset", true);
	defineSymbol(math, ams, rel, "⊐", "\\sqsupset", true);
	defineSymbol(math, ams, rel, "≽", "\\succcurlyeq", true);
	defineSymbol(math, ams, rel, "⋟", "\\curlyeqsucc", true);
	defineSymbol(math, ams, rel, "≿", "\\succsim", true);
	defineSymbol(math, ams, rel, "⪸", "\\succapprox", true);
	defineSymbol(math, ams, rel, "⊳", "\\vartriangleright");
	defineSymbol(math, ams, rel, "⊵", "\\trianglerighteq");
	defineSymbol(math, ams, rel, "⊩", "\\Vdash", true);
	defineSymbol(math, ams, rel, "∣", "\\shortmid");
	defineSymbol(math, ams, rel, "∥", "\\shortparallel");
	defineSymbol(math, ams, rel, "≬", "\\between", true);
	defineSymbol(math, ams, rel, "⋔", "\\pitchfork", true);
	defineSymbol(math, ams, rel, "∝", "\\varpropto");
	defineSymbol(math, ams, rel, "◀", "\\blacktriangleleft");
	defineSymbol(math, ams, rel, "∴", "\\therefore", true);
	defineSymbol(math, ams, rel, "∍", "\\backepsilon");
	defineSymbol(math, ams, rel, "▶", "\\blacktriangleright");
	defineSymbol(math, ams, rel, "∵", "\\because", true);
	defineSymbol(math, ams, rel, "⋘", "\\llless");
	defineSymbol(math, ams, rel, "⋙", "\\gggtr");
	defineSymbol(math, ams, bin, "⊲", "\\lhd");
	defineSymbol(math, ams, bin, "⊳", "\\rhd");
	defineSymbol(math, ams, rel, "≂", "\\eqsim", true);
	defineSymbol(math, main, rel, "⋈", "\\Join");
	defineSymbol(math, ams, rel, "≑", "\\Doteq", true);
	defineSymbol(math, ams, bin, "∔", "\\dotplus", true);
	defineSymbol(math, ams, bin, "∖", "\\smallsetminus");
	defineSymbol(math, ams, bin, "⋒", "\\Cap", true);
	defineSymbol(math, ams, bin, "⋓", "\\Cup", true);
	defineSymbol(math, ams, bin, "⩞", "\\doublebarwedge", true);
	defineSymbol(math, ams, bin, "⊟", "\\boxminus", true);
	defineSymbol(math, ams, bin, "⊞", "\\boxplus", true);
	defineSymbol(math, ams, bin, "⋇", "\\divideontimes", true);
	defineSymbol(math, ams, bin, "⋉", "\\ltimes", true);
	defineSymbol(math, ams, bin, "⋊", "\\rtimes", true);
	defineSymbol(math, ams, bin, "⋋", "\\leftthreetimes", true);
	defineSymbol(math, ams, bin, "⋌", "\\rightthreetimes", true);
	defineSymbol(math, ams, bin, "⋏", "\\curlywedge", true);
	defineSymbol(math, ams, bin, "⋎", "\\curlyvee", true);
	defineSymbol(math, ams, bin, "⊝", "\\circleddash", true);
	defineSymbol(math, ams, bin, "⊛", "\\circledast", true);
	defineSymbol(math, ams, bin, "⋅", "\\centerdot");
	defineSymbol(math, ams, bin, "⊺", "\\intercal", true);
	defineSymbol(math, ams, bin, "⋒", "\\doublecap");
	defineSymbol(math, ams, bin, "⋓", "\\doublecup");
	defineSymbol(math, ams, bin, "⊠", "\\boxtimes", true);
	defineSymbol(math, ams, rel, "⇢", "\\dashrightarrow", true);
	defineSymbol(math, ams, rel, "⇠", "\\dashleftarrow", true);
	defineSymbol(math, ams, rel, "⇇", "\\leftleftarrows", true);
	defineSymbol(math, ams, rel, "⇆", "\\leftrightarrows", true);
	defineSymbol(math, ams, rel, "⇚", "\\Lleftarrow", true);
	defineSymbol(math, ams, rel, "↞", "\\twoheadleftarrow", true);
	defineSymbol(math, ams, rel, "↢", "\\leftarrowtail", true);
	defineSymbol(math, ams, rel, "↫", "\\looparrowleft", true);
	defineSymbol(math, ams, rel, "⇋", "\\leftrightharpoons", true);
	defineSymbol(math, ams, rel, "↶", "\\curvearrowleft", true);
	defineSymbol(math, ams, rel, "↺", "\\circlearrowleft", true);
	defineSymbol(math, ams, rel, "↰", "\\Lsh", true);
	defineSymbol(math, ams, rel, "⇈", "\\upuparrows", true);
	defineSymbol(math, ams, rel, "↿", "\\upharpoonleft", true);
	defineSymbol(math, ams, rel, "⇃", "\\downharpoonleft", true);
	defineSymbol(math, main, rel, "⊶", "\\origof", true);
	defineSymbol(math, main, rel, "⊷", "\\imageof", true);
	defineSymbol(math, ams, rel, "⊸", "\\multimap", true);
	defineSymbol(math, ams, rel, "↭", "\\leftrightsquigarrow", true);
	defineSymbol(math, ams, rel, "⇉", "\\rightrightarrows", true);
	defineSymbol(math, ams, rel, "⇄", "\\rightleftarrows", true);
	defineSymbol(math, ams, rel, "↠", "\\twoheadrightarrow", true);
	defineSymbol(math, ams, rel, "↣", "\\rightarrowtail", true);
	defineSymbol(math, ams, rel, "↬", "\\looparrowright", true);
	defineSymbol(math, ams, rel, "↷", "\\curvearrowright", true);
	defineSymbol(math, ams, rel, "↻", "\\circlearrowright", true);
	defineSymbol(math, ams, rel, "↱", "\\Rsh", true);
	defineSymbol(math, ams, rel, "⇊", "\\downdownarrows", true);
	defineSymbol(math, ams, rel, "↾", "\\upharpoonright", true);
	defineSymbol(math, ams, rel, "⇂", "\\downharpoonright", true);
	defineSymbol(math, ams, rel, "⇝", "\\rightsquigarrow", true);
	defineSymbol(math, ams, rel, "⇝", "\\leadsto");
	defineSymbol(math, ams, rel, "⇛", "\\Rrightarrow", true);
	defineSymbol(math, ams, rel, "↾", "\\restriction");
	defineSymbol(math, main, textord, "‘", "`");
	defineSymbol(math, main, textord, "$", "\\$");
	defineSymbol(text, main, textord, "$", "\\$");
	defineSymbol(text, main, textord, "$", "\\textdollar");
	defineSymbol(math, main, textord, "%", "\\%");
	defineSymbol(text, main, textord, "%", "\\%");
	defineSymbol(math, main, textord, "_", "\\_");
	defineSymbol(text, main, textord, "_", "\\_");
	defineSymbol(text, main, textord, "_", "\\textunderscore");
	defineSymbol(math, main, textord, "∠", "\\angle", true);
	defineSymbol(math, main, textord, "∞", "\\infty", true);
	defineSymbol(math, main, textord, "′", "\\prime");
	defineSymbol(math, main, textord, "△", "\\triangle");
	defineSymbol(math, main, textord, "Γ", "\\Gamma", true);
	defineSymbol(math, main, textord, "Δ", "\\Delta", true);
	defineSymbol(math, main, textord, "Θ", "\\Theta", true);
	defineSymbol(math, main, textord, "Λ", "\\Lambda", true);
	defineSymbol(math, main, textord, "Ξ", "\\Xi", true);
	defineSymbol(math, main, textord, "Π", "\\Pi", true);
	defineSymbol(math, main, textord, "Σ", "\\Sigma", true);
	defineSymbol(math, main, textord, "Υ", "\\Upsilon", true);
	defineSymbol(math, main, textord, "Φ", "\\Phi", true);
	defineSymbol(math, main, textord, "Ψ", "\\Psi", true);
	defineSymbol(math, main, textord, "Ω", "\\Omega", true);
	defineSymbol(math, main, textord, "A", "Α");
	defineSymbol(math, main, textord, "B", "Β");
	defineSymbol(math, main, textord, "E", "Ε");
	defineSymbol(math, main, textord, "Z", "Ζ");
	defineSymbol(math, main, textord, "H", "Η");
	defineSymbol(math, main, textord, "I", "Ι");
	defineSymbol(math, main, textord, "K", "Κ");
	defineSymbol(math, main, textord, "M", "Μ");
	defineSymbol(math, main, textord, "N", "Ν");
	defineSymbol(math, main, textord, "O", "Ο");
	defineSymbol(math, main, textord, "P", "Ρ");
	defineSymbol(math, main, textord, "T", "Τ");
	defineSymbol(math, main, textord, "X", "Χ");
	defineSymbol(math, main, textord, "¬", "\\neg", true);
	defineSymbol(math, main, textord, "¬", "\\lnot");
	defineSymbol(math, main, textord, "⊤", "\\top");
	defineSymbol(math, main, textord, "⊥", "\\bot");
	defineSymbol(math, main, textord, "∅", "\\emptyset");
	defineSymbol(math, ams, textord, "∅", "\\varnothing");
	defineSymbol(math, main, mathord, "α", "\\alpha", true);
	defineSymbol(math, main, mathord, "β", "\\beta", true);
	defineSymbol(math, main, mathord, "γ", "\\gamma", true);
	defineSymbol(math, main, mathord, "δ", "\\delta", true);
	defineSymbol(math, main, mathord, "ϵ", "\\epsilon", true);
	defineSymbol(math, main, mathord, "ζ", "\\zeta", true);
	defineSymbol(math, main, mathord, "η", "\\eta", true);
	defineSymbol(math, main, mathord, "θ", "\\theta", true);
	defineSymbol(math, main, mathord, "ι", "\\iota", true);
	defineSymbol(math, main, mathord, "κ", "\\kappa", true);
	defineSymbol(math, main, mathord, "λ", "\\lambda", true);
	defineSymbol(math, main, mathord, "μ", "\\mu", true);
	defineSymbol(math, main, mathord, "ν", "\\nu", true);
	defineSymbol(math, main, mathord, "ξ", "\\xi", true);
	defineSymbol(math, main, mathord, "ο", "\\omicron", true);
	defineSymbol(math, main, mathord, "π", "\\pi", true);
	defineSymbol(math, main, mathord, "ρ", "\\rho", true);
	defineSymbol(math, main, mathord, "σ", "\\sigma", true);
	defineSymbol(math, main, mathord, "τ", "\\tau", true);
	defineSymbol(math, main, mathord, "υ", "\\upsilon", true);
	defineSymbol(math, main, mathord, "ϕ", "\\phi", true);
	defineSymbol(math, main, mathord, "χ", "\\chi", true);
	defineSymbol(math, main, mathord, "ψ", "\\psi", true);
	defineSymbol(math, main, mathord, "ω", "\\omega", true);
	defineSymbol(math, main, mathord, "ε", "\\varepsilon", true);
	defineSymbol(math, main, mathord, "ϑ", "\\vartheta", true);
	defineSymbol(math, main, mathord, "ϖ", "\\varpi", true);
	defineSymbol(math, main, mathord, "ϱ", "\\varrho", true);
	defineSymbol(math, main, mathord, "ς", "\\varsigma", true);
	defineSymbol(math, main, mathord, "φ", "\\varphi", true);
	defineSymbol(math, main, bin, "∗", "*", true);
	defineSymbol(math, main, bin, "+", "+");
	defineSymbol(math, main, bin, "−", "-", true);
	defineSymbol(math, main, bin, "⋅", "\\cdot", true);
	defineSymbol(math, main, bin, "∘", "\\circ", true);
	defineSymbol(math, main, bin, "÷", "\\div", true);
	defineSymbol(math, main, bin, "±", "\\pm", true);
	defineSymbol(math, main, bin, "×", "\\times", true);
	defineSymbol(math, main, bin, "∩", "\\cap", true);
	defineSymbol(math, main, bin, "∪", "\\cup", true);
	defineSymbol(math, main, bin, "∖", "\\setminus", true);
	defineSymbol(math, main, bin, "∧", "\\land");
	defineSymbol(math, main, bin, "∨", "\\lor");
	defineSymbol(math, main, bin, "∧", "\\wedge", true);
	defineSymbol(math, main, bin, "∨", "\\vee", true);
	defineSymbol(math, main, textord, "√", "\\surd");
	defineSymbol(math, main, open, "⟨", "\\langle", true);
	defineSymbol(math, main, open, "∣", "\\lvert");
	defineSymbol(math, main, open, "∥", "\\lVert");
	defineSymbol(math, main, close, "?", "?");
	defineSymbol(math, main, close, "!", "!");
	defineSymbol(math, main, close, "⟩", "\\rangle", true);
	defineSymbol(math, main, close, "∣", "\\rvert");
	defineSymbol(math, main, close, "∥", "\\rVert");
	defineSymbol(math, main, rel, "=", "=");
	defineSymbol(math, main, rel, ":", ":");
	defineSymbol(math, main, rel, "≈", "\\approx", true);
	defineSymbol(math, main, rel, "≅", "\\cong", true);
	defineSymbol(math, main, rel, "≥", "\\ge");
	defineSymbol(math, main, rel, "≥", "\\geq", true);
	defineSymbol(math, main, rel, "←", "\\gets");
	defineSymbol(math, main, rel, ">", "\\gt", true);
	defineSymbol(math, main, rel, "∈", "\\in", true);
	defineSymbol(math, main, rel, "", "\\@not");
	defineSymbol(math, main, rel, "⊂", "\\subset", true);
	defineSymbol(math, main, rel, "⊃", "\\supset", true);
	defineSymbol(math, main, rel, "⊆", "\\subseteq", true);
	defineSymbol(math, main, rel, "⊇", "\\supseteq", true);
	defineSymbol(math, ams, rel, "⊈", "\\nsubseteq", true);
	defineSymbol(math, ams, rel, "⊉", "\\nsupseteq", true);
	defineSymbol(math, main, rel, "⊨", "\\models");
	defineSymbol(math, main, rel, "←", "\\leftarrow", true);
	defineSymbol(math, main, rel, "≤", "\\le");
	defineSymbol(math, main, rel, "≤", "\\leq", true);
	defineSymbol(math, main, rel, "<", "\\lt", true);
	defineSymbol(math, main, rel, "→", "\\rightarrow", true);
	defineSymbol(math, main, rel, "→", "\\to");
	defineSymbol(math, ams, rel, "≱", "\\ngeq", true);
	defineSymbol(math, ams, rel, "≰", "\\nleq", true);
	defineSymbol(math, main, spacing, "\xA0", "\\ ");
	defineSymbol(math, main, spacing, "\xA0", "\\space");
	defineSymbol(math, main, spacing, "\xA0", "\\nobreakspace");
	defineSymbol(text, main, spacing, "\xA0", "\\ ");
	defineSymbol(text, main, spacing, "\xA0", " ");
	defineSymbol(text, main, spacing, "\xA0", "\\space");
	defineSymbol(text, main, spacing, "\xA0", "\\nobreakspace");
	defineSymbol(math, main, spacing, null, "\\nobreak");
	defineSymbol(math, main, spacing, null, "\\allowbreak");
	defineSymbol(math, main, punct, ",", ",");
	defineSymbol(math, main, punct, ";", ";");
	defineSymbol(math, ams, bin, "⊼", "\\barwedge", true);
	defineSymbol(math, ams, bin, "⊻", "\\veebar", true);
	defineSymbol(math, main, bin, "⊙", "\\odot", true);
	defineSymbol(math, main, bin, "⊕", "\\oplus", true);
	defineSymbol(math, main, bin, "⊗", "\\otimes", true);
	defineSymbol(math, main, textord, "∂", "\\partial", true);
	defineSymbol(math, main, bin, "⊘", "\\oslash", true);
	defineSymbol(math, ams, bin, "⊚", "\\circledcirc", true);
	defineSymbol(math, ams, bin, "⊡", "\\boxdot", true);
	defineSymbol(math, main, bin, "△", "\\bigtriangleup");
	defineSymbol(math, main, bin, "▽", "\\bigtriangledown");
	defineSymbol(math, main, bin, "†", "\\dagger");
	defineSymbol(math, main, bin, "⋄", "\\diamond");
	defineSymbol(math, main, bin, "⋆", "\\star");
	defineSymbol(math, main, bin, "◃", "\\triangleleft");
	defineSymbol(math, main, bin, "▹", "\\triangleright");
	defineSymbol(math, main, open, "{", "\\{");
	defineSymbol(text, main, textord, "{", "\\{");
	defineSymbol(text, main, textord, "{", "\\textbraceleft");
	defineSymbol(math, main, close, "}", "\\}");
	defineSymbol(text, main, textord, "}", "\\}");
	defineSymbol(text, main, textord, "}", "\\textbraceright");
	defineSymbol(math, main, open, "{", "\\lbrace");
	defineSymbol(math, main, close, "}", "\\rbrace");
	defineSymbol(math, main, open, "[", "\\lbrack", true);
	defineSymbol(text, main, textord, "[", "\\lbrack", true);
	defineSymbol(math, main, close, "]", "\\rbrack", true);
	defineSymbol(text, main, textord, "]", "\\rbrack", true);
	defineSymbol(math, main, open, "(", "\\lparen", true);
	defineSymbol(math, main, close, ")", "\\rparen", true);
	defineSymbol(text, main, textord, "<", "\\textless", true);
	defineSymbol(text, main, textord, ">", "\\textgreater", true);
	defineSymbol(math, main, open, "⌊", "\\lfloor", true);
	defineSymbol(math, main, close, "⌋", "\\rfloor", true);
	defineSymbol(math, main, open, "⌈", "\\lceil", true);
	defineSymbol(math, main, close, "⌉", "\\rceil", true);
	defineSymbol(math, main, textord, "\\", "\\backslash");
	defineSymbol(math, main, textord, "∣", "|");
	defineSymbol(math, main, textord, "∣", "\\vert");
	defineSymbol(text, main, textord, "|", "\\textbar", true);
	defineSymbol(math, main, textord, "∥", "\\|");
	defineSymbol(math, main, textord, "∥", "\\Vert");
	defineSymbol(text, main, textord, "∥", "\\textbardbl");
	defineSymbol(text, main, textord, "~", "\\textasciitilde");
	defineSymbol(text, main, textord, "\\", "\\textbackslash");
	defineSymbol(text, main, textord, "^", "\\textasciicircum");
	defineSymbol(math, main, rel, "↑", "\\uparrow", true);
	defineSymbol(math, main, rel, "⇑", "\\Uparrow", true);
	defineSymbol(math, main, rel, "↓", "\\downarrow", true);
	defineSymbol(math, main, rel, "⇓", "\\Downarrow", true);
	defineSymbol(math, main, rel, "↕", "\\updownarrow", true);
	defineSymbol(math, main, rel, "⇕", "\\Updownarrow", true);
	defineSymbol(math, main, op, "∐", "\\coprod");
	defineSymbol(math, main, op, "⋁", "\\bigvee");
	defineSymbol(math, main, op, "⋀", "\\bigwedge");
	defineSymbol(math, main, op, "⨄", "\\biguplus");
	defineSymbol(math, main, op, "⋂", "\\bigcap");
	defineSymbol(math, main, op, "⋃", "\\bigcup");
	defineSymbol(math, main, op, "∫", "\\int");
	defineSymbol(math, main, op, "∫", "\\intop");
	defineSymbol(math, main, op, "∬", "\\iint");
	defineSymbol(math, main, op, "∭", "\\iiint");
	defineSymbol(math, main, op, "∏", "\\prod");
	defineSymbol(math, main, op, "∑", "\\sum");
	defineSymbol(math, main, op, "⨂", "\\bigotimes");
	defineSymbol(math, main, op, "⨁", "\\bigoplus");
	defineSymbol(math, main, op, "⨀", "\\bigodot");
	defineSymbol(math, main, op, "∮", "\\oint");
	defineSymbol(math, main, op, "∯", "\\oiint");
	defineSymbol(math, main, op, "∰", "\\oiiint");
	defineSymbol(math, main, op, "⨆", "\\bigsqcup");
	defineSymbol(math, main, op, "∫", "\\smallint");
	defineSymbol(text, main, inner, "…", "\\textellipsis");
	defineSymbol(math, main, inner, "…", "\\mathellipsis");
	defineSymbol(text, main, inner, "…", "\\ldots", true);
	defineSymbol(math, main, inner, "…", "\\ldots", true);
	defineSymbol(math, main, inner, "⋯", "\\@cdots", true);
	defineSymbol(math, main, inner, "⋱", "\\ddots", true);
	defineSymbol(math, main, textord, "⋮", "\\varvdots");
	defineSymbol(text, main, textord, "⋮", "\\varvdots");
	defineSymbol(math, main, accent, "ˊ", "\\acute");
	defineSymbol(math, main, accent, "ˋ", "\\grave");
	defineSymbol(math, main, accent, "¨", "\\ddot");
	defineSymbol(math, main, accent, "~", "\\tilde");
	defineSymbol(math, main, accent, "ˉ", "\\bar");
	defineSymbol(math, main, accent, "˘", "\\breve");
	defineSymbol(math, main, accent, "ˇ", "\\check");
	defineSymbol(math, main, accent, "^", "\\hat");
	defineSymbol(math, main, accent, "⃗", "\\vec");
	defineSymbol(math, main, accent, "˙", "\\dot");
	defineSymbol(math, main, accent, "˚", "\\mathring");
	defineSymbol(math, main, mathord, "", "\\@imath");
	defineSymbol(math, main, mathord, "", "\\@jmath");
	defineSymbol(math, main, textord, "ı", "ı");
	defineSymbol(math, main, textord, "ȷ", "ȷ");
	defineSymbol(text, main, textord, "ı", "\\i", true);
	defineSymbol(text, main, textord, "ȷ", "\\j", true);
	defineSymbol(text, main, textord, "ß", "\\ss", true);
	defineSymbol(text, main, textord, "æ", "\\ae", true);
	defineSymbol(text, main, textord, "œ", "\\oe", true);
	defineSymbol(text, main, textord, "ø", "\\o", true);
	defineSymbol(text, main, textord, "Æ", "\\AE", true);
	defineSymbol(text, main, textord, "Œ", "\\OE", true);
	defineSymbol(text, main, textord, "Ø", "\\O", true);
	defineSymbol(text, main, accent, "ˊ", "\\'");
	defineSymbol(text, main, accent, "ˋ", "\\`");
	defineSymbol(text, main, accent, "ˆ", "\\^");
	defineSymbol(text, main, accent, "˜", "\\~");
	defineSymbol(text, main, accent, "ˉ", "\\=");
	defineSymbol(text, main, accent, "˘", "\\u");
	defineSymbol(text, main, accent, "˙", "\\.");
	defineSymbol(text, main, accent, "¸", "\\c");
	defineSymbol(text, main, accent, "˚", "\\r");
	defineSymbol(text, main, accent, "ˇ", "\\v");
	defineSymbol(text, main, accent, "¨", "\\\"");
	defineSymbol(text, main, accent, "˝", "\\H");
	defineSymbol(text, main, accent, "◯", "\\textcircled");
	ligatures = {
		"--": true,
		"---": true,
		"``": true,
		"''": true
	};
	defineSymbol(text, main, textord, "–", "--", true);
	defineSymbol(text, main, textord, "–", "\\textendash");
	defineSymbol(text, main, textord, "—", "---", true);
	defineSymbol(text, main, textord, "—", "\\textemdash");
	defineSymbol(text, main, textord, "‘", "`", true);
	defineSymbol(text, main, textord, "‘", "\\textquoteleft");
	defineSymbol(text, main, textord, "’", "'", true);
	defineSymbol(text, main, textord, "’", "\\textquoteright");
	defineSymbol(text, main, textord, "“", "``", true);
	defineSymbol(text, main, textord, "“", "\\textquotedblleft");
	defineSymbol(text, main, textord, "”", "''", true);
	defineSymbol(text, main, textord, "”", "\\textquotedblright");
	defineSymbol(math, main, textord, "°", "\\degree", true);
	defineSymbol(text, main, textord, "°", "\\degree");
	defineSymbol(text, main, textord, "°", "\\textdegree", true);
	defineSymbol(math, main, textord, "£", "\\pounds");
	defineSymbol(math, main, textord, "£", "\\mathsterling", true);
	defineSymbol(text, main, textord, "£", "\\pounds");
	defineSymbol(text, main, textord, "£", "\\textsterling", true);
	defineSymbol(math, ams, textord, "✠", "\\maltese");
	defineSymbol(text, ams, textord, "✠", "\\maltese");
	mathTextSymbols = "0123456789/@.\"";
	for (i$13 = 0; i$13 < mathTextSymbols.length; i$13++) {
		ch = mathTextSymbols.charAt(i$13);
		defineSymbol(math, main, textord, ch, ch);
	}
	textSymbols = "0123456789!@*()-=+\";:?/.,";
	for (_i = 0; _i < textSymbols.length; _i++) {
		_ch = textSymbols.charAt(_i);
		defineSymbol(text, main, textord, _ch, _ch);
	}
	letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (_i2 = 0; _i2 < letters.length; _i2++) {
		_ch2 = letters.charAt(_i2);
		defineSymbol(math, main, mathord, _ch2, _ch2);
		defineSymbol(text, main, textord, _ch2, _ch2);
	}
	defineSymbol(math, ams, textord, "C", "ℂ");
	defineSymbol(text, ams, textord, "C", "ℂ");
	defineSymbol(math, ams, textord, "H", "ℍ");
	defineSymbol(text, ams, textord, "H", "ℍ");
	defineSymbol(math, ams, textord, "N", "ℕ");
	defineSymbol(text, ams, textord, "N", "ℕ");
	defineSymbol(math, ams, textord, "P", "ℙ");
	defineSymbol(text, ams, textord, "P", "ℙ");
	defineSymbol(math, ams, textord, "Q", "ℚ");
	defineSymbol(text, ams, textord, "Q", "ℚ");
	defineSymbol(math, ams, textord, "R", "ℝ");
	defineSymbol(text, ams, textord, "R", "ℝ");
	defineSymbol(math, ams, textord, "Z", "ℤ");
	defineSymbol(text, ams, textord, "Z", "ℤ");
	defineSymbol(math, main, mathord, "h", "ℎ");
	defineSymbol(text, main, mathord, "h", "ℎ");
	wideChar = "";
	for (_i3 = 0; _i3 < letters.length; _i3++) {
		_ch3 = letters.charAt(_i3);
		wideChar = String.fromCharCode(55349, 56320 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56372 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56424 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56580 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56684 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56736 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56788 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56840 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		wideChar = String.fromCharCode(55349, 56944 + _i3);
		defineSymbol(math, main, mathord, _ch3, wideChar);
		defineSymbol(text, main, textord, _ch3, wideChar);
		if (_i3 < 26) {
			wideChar = String.fromCharCode(55349, 56632 + _i3);
			defineSymbol(math, main, mathord, _ch3, wideChar);
			defineSymbol(text, main, textord, _ch3, wideChar);
			wideChar = String.fromCharCode(55349, 56476 + _i3);
			defineSymbol(math, main, mathord, _ch3, wideChar);
			defineSymbol(text, main, textord, _ch3, wideChar);
		}
	}
	wideChar = String.fromCharCode(55349, 56668);
	defineSymbol(math, main, mathord, "k", wideChar);
	defineSymbol(text, main, textord, "k", wideChar);
	for (_i4 = 0; _i4 < 10; _i4++) {
		_ch4 = _i4.toString();
		wideChar = String.fromCharCode(55349, 57294 + _i4);
		defineSymbol(math, main, mathord, _ch4, wideChar);
		defineSymbol(text, main, textord, _ch4, wideChar);
		wideChar = String.fromCharCode(55349, 57314 + _i4);
		defineSymbol(math, main, mathord, _ch4, wideChar);
		defineSymbol(text, main, textord, _ch4, wideChar);
		wideChar = String.fromCharCode(55349, 57324 + _i4);
		defineSymbol(math, main, mathord, _ch4, wideChar);
		defineSymbol(text, main, textord, _ch4, wideChar);
		wideChar = String.fromCharCode(55349, 57334 + _i4);
		defineSymbol(math, main, mathord, _ch4, wideChar);
		defineSymbol(text, main, textord, _ch4, wideChar);
	}
	extraLatin = "ÐÞþ";
	for (_i5 = 0; _i5 < extraLatin.length; _i5++) {
		_ch5 = extraLatin.charAt(_i5);
		defineSymbol(math, main, mathord, _ch5, _ch5);
		defineSymbol(text, main, textord, _ch5, _ch5);
	}
	wideLatinLetterData = [
		[
			"mathbf",
			"textbf",
			"Main-Bold"
		],
		[
			"mathbf",
			"textbf",
			"Main-Bold"
		],
		[
			"mathnormal",
			"textit",
			"Math-Italic"
		],
		[
			"mathnormal",
			"textit",
			"Math-Italic"
		],
		[
			"boldsymbol",
			"boldsymbol",
			"Main-BoldItalic"
		],
		[
			"boldsymbol",
			"boldsymbol",
			"Main-BoldItalic"
		],
		[
			"mathscr",
			"textscr",
			"Script-Regular"
		],
		[
			"",
			"",
			""
		],
		[
			"",
			"",
			""
		],
		[
			"",
			"",
			""
		],
		[
			"mathfrak",
			"textfrak",
			"Fraktur-Regular"
		],
		[
			"mathfrak",
			"textfrak",
			"Fraktur-Regular"
		],
		[
			"mathbb",
			"textbb",
			"AMS-Regular"
		],
		[
			"mathbb",
			"textbb",
			"AMS-Regular"
		],
		[
			"mathboldfrak",
			"textboldfrak",
			"Fraktur-Regular"
		],
		[
			"mathboldfrak",
			"textboldfrak",
			"Fraktur-Regular"
		],
		[
			"mathsf",
			"textsf",
			"SansSerif-Regular"
		],
		[
			"mathsf",
			"textsf",
			"SansSerif-Regular"
		],
		[
			"mathboldsf",
			"textboldsf",
			"SansSerif-Bold"
		],
		[
			"mathboldsf",
			"textboldsf",
			"SansSerif-Bold"
		],
		[
			"mathitsf",
			"textitsf",
			"SansSerif-Italic"
		],
		[
			"mathitsf",
			"textitsf",
			"SansSerif-Italic"
		],
		[
			"",
			"",
			""
		],
		[
			"",
			"",
			""
		],
		[
			"mathtt",
			"texttt",
			"Typewriter-Regular"
		],
		[
			"mathtt",
			"texttt",
			"Typewriter-Regular"
		]
	];
	wideNumeralData = [
		[
			"mathbf",
			"textbf",
			"Main-Bold"
		],
		[
			"",
			"",
			""
		],
		[
			"mathsf",
			"textsf",
			"SansSerif-Regular"
		],
		[
			"mathboldsf",
			"textboldsf",
			"SansSerif-Bold"
		],
		[
			"mathtt",
			"texttt",
			"Typewriter-Regular"
		]
	];
	wideCharacterFont = function wideCharacterFont(wideChar, mode) {
		var H = wideChar.charCodeAt(0);
		var L = wideChar.charCodeAt(1);
		var codePoint = (H - 55296) * 1024 + (L - 56320) + 65536;
		var j = mode === "math" ? 0 : 1;
		if (119808 <= codePoint && codePoint < 120484) {
			var i = Math.floor((codePoint - 119808) / 26);
			return [wideLatinLetterData[i][2], wideLatinLetterData[i][j]];
		} else if (120782 <= codePoint && codePoint <= 120831) {
			var _i = Math.floor((codePoint - 120782) / 10);
			return [wideNumeralData[_i][2], wideNumeralData[_i][j]];
		} else if (codePoint === 120485 || codePoint === 120486) return [wideLatinLetterData[0][2], wideLatinLetterData[0][j]];
		else if (120486 < codePoint && codePoint < 120782) return ["", ""];
		else throw new ParseError("Unsupported character: " + wideChar);
	};
	lookupSymbol = function lookupSymbol(value, fontName, mode) {
		if (symbols[mode][value] && symbols[mode][value].replace) value = symbols[mode][value].replace;
		return {
			value,
			metrics: getCharacterMetrics(value, fontName, mode)
		};
	};
	makeSymbol = function makeSymbol(value, fontName, mode, options, classes) {
		var lookup = lookupSymbol(value, fontName, mode);
		var metrics = lookup.metrics;
		value = lookup.value;
		var symbolNode;
		if (metrics) {
			var italic = metrics.italic;
			if (mode === "text" || options && options.font === "mathit") italic = 0;
			symbolNode = new SymbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
		} else {
			typeof console !== "undefined" && console.warn("No character metrics " + ("for '" + value + "' in style '" + fontName + "' and mode '" + mode + "'"));
			symbolNode = new SymbolNode(value, 0, 0, 0, 0, 0, classes);
		}
		if (options) {
			symbolNode.maxFontSize = options.sizeMultiplier;
			if (options.style.isTight()) symbolNode.classes.push("mtight");
			var color = options.getColor();
			if (color) symbolNode.style.color = color;
		}
		return symbolNode;
	};
	mathsym = function mathsym(value, mode, options, classes) {
		if (classes === void 0) classes = [];
		if (options.font === "boldsymbol" && lookupSymbol(value, "Main-Bold", mode).metrics) return makeSymbol(value, "Main-Bold", mode, options, classes.concat(["mathbf"]));
		else if (value === "\\" || symbols[mode][value].font === "main") return makeSymbol(value, "Main-Regular", mode, options, classes);
		else return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
	};
	boldsymbol = function boldsymbol(value, mode, options, classes, type) {
		if (type !== "textord" && lookupSymbol(value, "Math-BoldItalic", mode).metrics) return {
			fontName: "Math-BoldItalic",
			fontClass: "boldsymbol"
		};
		else return {
			fontName: "Main-Bold",
			fontClass: "mathbf"
		};
	};
	makeOrd = function makeOrd(group, options, type) {
		var mode = group.mode;
		var text = group.text;
		var classes = ["mord"];
		var isFont = mode === "math" || mode === "text" && options.font;
		var fontOrFamily = isFont ? options.font : options.fontFamily;
		var wideFontName = "";
		var wideFontClass = "";
		if (text.charCodeAt(0) === 55349) [wideFontName, wideFontClass] = wideCharacterFont(text, mode);
		if (wideFontName.length > 0) return makeSymbol(text, wideFontName, mode, options, classes.concat(wideFontClass));
		else if (fontOrFamily) {
			var fontName;
			var fontClasses;
			if (fontOrFamily === "boldsymbol") {
				var fontData = boldsymbol(text, mode, options, classes, type);
				fontName = fontData.fontName;
				fontClasses = [fontData.fontClass];
			} else if (isFont) {
				fontName = fontMap[fontOrFamily].fontName;
				fontClasses = [fontOrFamily];
			} else {
				fontName = retrieveTextFontName(fontOrFamily, options.fontWeight, options.fontShape);
				fontClasses = [
					fontOrFamily,
					options.fontWeight,
					options.fontShape
				];
			}
			if (lookupSymbol(text, fontName, mode).metrics) return makeSymbol(text, fontName, mode, options, classes.concat(fontClasses));
			else if (ligatures.hasOwnProperty(text) && fontName.slice(0, 10) === "Typewriter") {
				var parts = [];
				for (var i = 0; i < text.length; i++) parts.push(makeSymbol(text[i], fontName, mode, options, classes.concat(fontClasses)));
				return makeFragment(parts);
			}
		}
		if (type === "mathord") return makeSymbol(text, "Math-Italic", mode, options, classes.concat(["mathnormal"]));
		else if (type === "textord") {
			var font = symbols[mode][text] && symbols[mode][text].font;
			if (font === "ams") return makeSymbol(text, retrieveTextFontName("amsrm", options.fontWeight, options.fontShape), mode, options, classes.concat("amsrm", options.fontWeight, options.fontShape));
			else if (font === "main" || !font) return makeSymbol(text, retrieveTextFontName("textrm", options.fontWeight, options.fontShape), mode, options, classes.concat(options.fontWeight, options.fontShape));
			else {
				var _fontName3 = retrieveTextFontName(font, options.fontWeight, options.fontShape);
				return makeSymbol(text, _fontName3, mode, options, classes.concat(_fontName3, options.fontWeight, options.fontShape));
			}
		} else throw new Error("unexpected type: " + type + " in makeOrd");
	};
	canCombine = (prev, next) => {
		if (createClass(prev.classes) !== createClass(next.classes) || prev.skew !== next.skew || prev.maxFontSize !== next.maxFontSize) return false;
		if (prev.classes.length === 1) {
			var cls = prev.classes[0];
			if (cls === "mbin" || cls === "mord") return false;
		}
		for (var style in prev.style) if (prev.style.hasOwnProperty(style) && prev.style[style] !== next.style[style]) return false;
		for (var _style in next.style) if (next.style.hasOwnProperty(_style) && prev.style[_style] !== next.style[_style]) return false;
		return true;
	};
	tryCombineChars = (chars) => {
		for (var i = 0; i < chars.length - 1; i++) {
			var prev = chars[i];
			var next = chars[i + 1];
			if (prev instanceof SymbolNode && next instanceof SymbolNode && canCombine(prev, next)) {
				prev.text += next.text;
				prev.height = Math.max(prev.height, next.height);
				prev.depth = Math.max(prev.depth, next.depth);
				prev.italic = next.italic;
				chars.splice(i + 1, 1);
				i--;
			}
		}
		return chars;
	};
	sizeElementFromChildren = function sizeElementFromChildren(elem) {
		var height = 0;
		var depth = 0;
		var maxFontSize = 0;
		for (var i = 0; i < elem.children.length; i++) {
			var child = elem.children[i];
			if (child.height > height) height = child.height;
			if (child.depth > depth) depth = child.depth;
			if (child.maxFontSize > maxFontSize) maxFontSize = child.maxFontSize;
		}
		elem.height = height;
		elem.depth = depth;
		elem.maxFontSize = maxFontSize;
	};
	makeSpan$2 = function makeSpan(classes, children, options, style) {
		var span = new Span(classes, children, options, style);
		sizeElementFromChildren(span);
		return span;
	};
	makeSvgSpan = (classes, children, options, style) => new Span(classes, children, options, style);
	makeLineSpan = function makeLineSpan(className, options, thickness) {
		var line = makeSpan$2([className], [], options);
		line.height = Math.max(thickness || options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
		line.style.borderBottomWidth = makeEm(line.height);
		line.maxFontSize = 1;
		return line;
	};
	makeAnchor = function makeAnchor(href, classes, children, options) {
		var anchor = new Anchor(href, classes, children, options);
		sizeElementFromChildren(anchor);
		return anchor;
	};
	makeFragment = function makeFragment(children) {
		var fragment = new DocumentFragment(children);
		sizeElementFromChildren(fragment);
		return fragment;
	};
	wrapFragment = function wrapFragment(group, options) {
		if (group instanceof DocumentFragment) return makeSpan$2([], [group], options);
		return group;
	};
	getVListChildrenAndDepth = function getVListChildrenAndDepth(params) {
		if (params.positionType === "individualShift") {
			var oldChildren = params.children;
			var children = [oldChildren[0]];
			var _depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
			var currPos = _depth;
			for (var i = 1; i < oldChildren.length; i++) {
				var diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
				var size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);
				currPos = currPos + diff;
				children.push({
					type: "kern",
					size
				});
				children.push(oldChildren[i]);
			}
			return {
				children,
				depth: _depth
			};
		}
		var depth;
		if (params.positionType === "top") {
			var bottom = params.positionData;
			for (var _i = 0; _i < params.children.length; _i++) {
				var child = params.children[_i];
				bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
			}
			depth = bottom;
		} else if (params.positionType === "bottom") depth = -params.positionData;
		else {
			var firstChild = params.children[0];
			if (firstChild.type !== "elem") throw new Error("First child must have type \"elem\".");
			if (params.positionType === "shift") depth = -firstChild.elem.depth - params.positionData;
			else if (params.positionType === "firstBaseline") depth = -firstChild.elem.depth;
			else throw new Error("Invalid positionType " + params.positionType + ".");
		}
		return {
			children: params.children,
			depth
		};
	};
	makeVList = function makeVList(params, options) {
		var { children, depth } = getVListChildrenAndDepth(params);
		var pstrutSize = 0;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.type === "elem") {
				var elem = child.elem;
				pstrutSize = Math.max(pstrutSize, elem.maxFontSize, elem.height);
			}
		}
		pstrutSize += 2;
		var pstrut = makeSpan$2(["pstrut"], []);
		pstrut.style.height = makeEm(pstrutSize);
		var realChildren = [];
		var minPos = depth;
		var maxPos = depth;
		var currPos = depth;
		for (var _i2 = 0; _i2 < children.length; _i2++) {
			var _child = children[_i2];
			if (_child.type === "kern") currPos += _child.size;
			else {
				var _elem = _child.elem;
				var classes = _child.wrapperClasses || [];
				var style = _child.wrapperStyle || {};
				var childWrap = makeSpan$2(classes, [pstrut, _elem], void 0, style);
				childWrap.style.top = makeEm(-pstrutSize - currPos - _elem.depth);
				if (_child.marginLeft) childWrap.style.marginLeft = _child.marginLeft;
				if (_child.marginRight) childWrap.style.marginRight = _child.marginRight;
				realChildren.push(childWrap);
				currPos += _elem.height + _elem.depth;
			}
			minPos = Math.min(minPos, currPos);
			maxPos = Math.max(maxPos, currPos);
		}
		var vlist = makeSpan$2(["vlist"], realChildren);
		vlist.style.height = makeEm(maxPos);
		var rows;
		if (minPos < 0) {
			var depthStrut = makeSpan$2(["vlist"], [makeSpan$2([], [])]);
			depthStrut.style.height = makeEm(-minPos);
			rows = [makeSpan$2(["vlist-r"], [vlist, makeSpan$2(["vlist-s"], [new SymbolNode("​")])]), makeSpan$2(["vlist-r"], [depthStrut])];
		} else rows = [makeSpan$2(["vlist-r"], [vlist])];
		var vtable = makeSpan$2(["vlist-t"], rows);
		if (rows.length === 2) vtable.classes.push("vlist-t2");
		vtable.height = maxPos;
		vtable.depth = -minPos;
		return vtable;
	};
	makeGlue = (measurement, options) => {
		var rule = makeSpan$2(["mspace"], [], options);
		var size = calculateSize(measurement, options);
		rule.style.marginRight = makeEm(size);
		return rule;
	};
	retrieveTextFontName = function retrieveTextFontName(fontFamily, fontWeight, fontShape) {
		var baseFontName = "";
		switch (fontFamily) {
			case "amsrm":
				baseFontName = "AMS";
				break;
			case "textrm":
				baseFontName = "Main";
				break;
			case "textsf":
				baseFontName = "SansSerif";
				break;
			case "texttt":
				baseFontName = "Typewriter";
				break;
			default: baseFontName = fontFamily;
		}
		var fontStylesName;
		if (fontWeight === "textbf" && fontShape === "textit") fontStylesName = "BoldItalic";
		else if (fontWeight === "textbf") fontStylesName = "Bold";
		else if (fontWeight === "textit") fontStylesName = "Italic";
		else fontStylesName = "Regular";
		return baseFontName + "-" + fontStylesName;
	};
	fontMap = {
		"mathbf": {
			variant: "bold",
			fontName: "Main-Bold"
		},
		"mathrm": {
			variant: "normal",
			fontName: "Main-Regular"
		},
		"textit": {
			variant: "italic",
			fontName: "Main-Italic"
		},
		"mathit": {
			variant: "italic",
			fontName: "Main-Italic"
		},
		"mathnormal": {
			variant: "italic",
			fontName: "Math-Italic"
		},
		"mathsfit": {
			variant: "sans-serif-italic",
			fontName: "SansSerif-Italic"
		},
		"mathbb": {
			variant: "double-struck",
			fontName: "AMS-Regular"
		},
		"mathcal": {
			variant: "script",
			fontName: "Caligraphic-Regular"
		},
		"mathfrak": {
			variant: "fraktur",
			fontName: "Fraktur-Regular"
		},
		"mathscr": {
			variant: "script",
			fontName: "Script-Regular"
		},
		"mathsf": {
			variant: "sans-serif",
			fontName: "SansSerif-Regular"
		},
		"mathtt": {
			variant: "monospace",
			fontName: "Typewriter-Regular"
		}
	};
	svgData = {
		vec: [
			"vec",
			.471,
			.714
		],
		oiintSize1: [
			"oiintSize1",
			.957,
			.499
		],
		oiintSize2: [
			"oiintSize2",
			1.472,
			.659
		],
		oiiintSize1: [
			"oiiintSize1",
			1.304,
			.499
		],
		oiiintSize2: [
			"oiiintSize2",
			1.98,
			.659
		]
	};
	buildCommon = {
		fontMap,
		makeSymbol,
		mathsym,
		makeSpan: makeSpan$2,
		makeSvgSpan,
		makeLineSpan,
		makeAnchor,
		makeFragment,
		wrapFragment,
		makeVList,
		makeOrd,
		makeGlue,
		staticSvg: function staticSvg(value, options) {
			var [pathName, width, height] = svgData[value];
			var span = makeSvgSpan(["overlay"], [new SvgNode([new PathNode(pathName)], {
				"width": makeEm(width),
				"height": makeEm(height),
				"style": "width:" + makeEm(width),
				"viewBox": "0 0 " + 1e3 * width + " " + 1e3 * height,
				"preserveAspectRatio": "xMinYMin"
			})], options);
			span.height = height;
			span.style.height = makeEm(height);
			span.style.width = makeEm(width);
			return span;
		},
		svgData,
		tryCombineChars
	};
	thinspace = {
		number: 3,
		unit: "mu"
	};
	mediumspace = {
		number: 4,
		unit: "mu"
	};
	thickspace = {
		number: 5,
		unit: "mu"
	};
	spacings = {
		mord: {
			mop: thinspace,
			mbin: mediumspace,
			mrel: thickspace,
			minner: thinspace
		},
		mop: {
			mord: thinspace,
			mop: thinspace,
			mrel: thickspace,
			minner: thinspace
		},
		mbin: {
			mord: mediumspace,
			mop: mediumspace,
			mopen: mediumspace,
			minner: mediumspace
		},
		mrel: {
			mord: thickspace,
			mop: thickspace,
			mopen: thickspace,
			minner: thickspace
		},
		mopen: {},
		mclose: {
			mop: thinspace,
			mbin: mediumspace,
			mrel: thickspace,
			minner: thinspace
		},
		mpunct: {
			mord: thinspace,
			mop: thinspace,
			mrel: thickspace,
			mopen: thinspace,
			mclose: thinspace,
			mpunct: thinspace,
			minner: thinspace
		},
		minner: {
			mord: thinspace,
			mop: thinspace,
			mbin: mediumspace,
			mrel: thickspace,
			mopen: thinspace,
			mpunct: thinspace,
			minner: thinspace
		}
	};
	tightSpacings = {
		mord: { mop: thinspace },
		mop: {
			mord: thinspace,
			mop: thinspace
		},
		mbin: {},
		mrel: {},
		mopen: {},
		mclose: { mop: thinspace },
		mpunct: {},
		minner: { mop: thinspace }
	};
	_functions = {};
	_htmlGroupBuilders = {};
	_mathmlGroupBuilders = {};
	normalizeArgument = function normalizeArgument(arg) {
		return arg.type === "ordgroup" && arg.body.length === 1 ? arg.body[0] : arg;
	};
	ordargument = function ordargument(arg) {
		return arg.type === "ordgroup" ? arg.body : [arg];
	};
	makeSpan$1 = buildCommon.makeSpan;
	binLeftCanceller = [
		"leftmost",
		"mbin",
		"mopen",
		"mrel",
		"mop",
		"mpunct"
	];
	binRightCanceller = [
		"rightmost",
		"mrel",
		"mclose",
		"mpunct"
	];
	styleMap$1 = {
		"display": Style$1.DISPLAY,
		"text": Style$1.TEXT,
		"script": Style$1.SCRIPT,
		"scriptscript": Style$1.SCRIPTSCRIPT
	};
	DomEnum = {
		mord: "mord",
		mop: "mop",
		mbin: "mbin",
		mrel: "mrel",
		mopen: "mopen",
		mclose: "mclose",
		mpunct: "mpunct",
		minner: "minner"
	};
	buildExpression$1 = function buildExpression(expression, options, isRealGroup, surrounding) {
		if (surrounding === void 0) surrounding = [null, null];
		var groups = [];
		for (var i = 0; i < expression.length; i++) {
			var output = buildGroup$1(expression[i], options);
			if (output instanceof DocumentFragment) {
				var children = output.children;
				groups.push(...children);
			} else groups.push(output);
		}
		buildCommon.tryCombineChars(groups);
		if (!isRealGroup) return groups;
		var glueOptions = options;
		if (expression.length === 1) {
			var node = expression[0];
			if (node.type === "sizing") glueOptions = options.havingSize(node.size);
			else if (node.type === "styling") glueOptions = options.havingStyle(styleMap$1[node.style]);
		}
		var dummyPrev = makeSpan$1([surrounding[0] || "leftmost"], [], options);
		var dummyNext = makeSpan$1([surrounding[1] || "rightmost"], [], options);
		var isRoot = isRealGroup === "root";
		traverseNonSpaceNodes(groups, (node, prev) => {
			var prevType = prev.classes[0];
			var type = node.classes[0];
			if (prevType === "mbin" && binRightCanceller.includes(type)) prev.classes[0] = "mord";
			else if (type === "mbin" && binLeftCanceller.includes(prevType)) node.classes[0] = "mord";
		}, { node: dummyPrev }, dummyNext, isRoot);
		traverseNonSpaceNodes(groups, (node, prev) => {
			var prevType = getTypeOfDomTree(prev);
			var type = getTypeOfDomTree(node);
			var space = prevType && type ? node.hasClass("mtight") ? tightSpacings[prevType][type] : spacings[prevType][type] : null;
			if (space) return buildCommon.makeGlue(space, glueOptions);
		}, { node: dummyPrev }, dummyNext, isRoot);
		return groups;
	};
	traverseNonSpaceNodes = function traverseNonSpaceNodes(nodes, callback, prev, next, isRoot) {
		if (next) nodes.push(next);
		var i = 0;
		for (; i < nodes.length; i++) {
			var node = nodes[i];
			var partialGroup = checkPartialGroup(node);
			if (partialGroup) {
				traverseNonSpaceNodes(partialGroup.children, callback, prev, null, isRoot);
				continue;
			}
			var nonspace = !node.hasClass("mspace");
			if (nonspace) {
				var result = callback(node, prev.node);
				if (result) if (prev.insertAfter) prev.insertAfter(result);
				else {
					nodes.unshift(result);
					i++;
				}
			}
			if (nonspace) prev.node = node;
			else if (isRoot && node.hasClass("newline")) prev.node = makeSpan$1(["leftmost"]);
			prev.insertAfter = ((index) => (n) => {
				nodes.splice(index + 1, 0, n);
				i++;
			})(i);
		}
		if (next) nodes.pop();
	};
	checkPartialGroup = function checkPartialGroup(node) {
		if (node instanceof DocumentFragment || node instanceof Anchor || node instanceof Span && node.hasClass("enclosing")) return node;
		return null;
	};
	getOutermostNode = function getOutermostNode(node, side) {
		var partialGroup = checkPartialGroup(node);
		if (partialGroup) {
			var children = partialGroup.children;
			if (children.length) {
				if (side === "right") return getOutermostNode(children[children.length - 1], "right");
				else if (side === "left") return getOutermostNode(children[0], "left");
			}
		}
		return node;
	};
	getTypeOfDomTree = function getTypeOfDomTree(node, side) {
		if (!node) return null;
		if (side) node = getOutermostNode(node, side);
		return DomEnum[node.classes[0]] || null;
	};
	makeNullDelimiter = function makeNullDelimiter(options, classes) {
		var moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
		return makeSpan$1(classes.concat(moreClasses));
	};
	buildGroup$1 = function buildGroup(group, options, baseOptions) {
		if (!group) return makeSpan$1();
		if (_htmlGroupBuilders[group.type]) {
			var groupNode = _htmlGroupBuilders[group.type](group, options);
			if (baseOptions && options.size !== baseOptions.size) {
				groupNode = makeSpan$1(options.sizingClasses(baseOptions), [groupNode], options);
				var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
				groupNode.height *= multiplier;
				groupNode.depth *= multiplier;
			}
			return groupNode;
		} else throw new ParseError("Got group of unknown type: '" + group.type + "'");
	};
	MathNode = class {
		constructor(type, children, classes) {
			this.type = void 0;
			this.attributes = void 0;
			this.children = void 0;
			this.classes = void 0;
			this.type = type;
			this.attributes = {};
			this.children = children || [];
			this.classes = classes || [];
		}
		/**
		* Sets an attribute on a MathML node. MathML depends on attributes to convey a
		* semantic content, so this is used heavily.
		*/
		setAttribute(name, value) {
			this.attributes[name] = value;
		}
		/**
		* Gets an attribute on a MathML node.
		*/
		getAttribute(name) {
			return this.attributes[name];
		}
		/**
		* Converts the math node into a MathML-namespaced DOM element.
		*/
		toNode() {
			var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
			for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) node.setAttribute(attr, this.attributes[attr]);
			if (this.classes.length > 0) node.className = createClass(this.classes);
			for (var i = 0; i < this.children.length; i++) if (this.children[i] instanceof TextNode && this.children[i + 1] instanceof TextNode) {
				var text = this.children[i].toText() + this.children[++i].toText();
				while (this.children[i + 1] instanceof TextNode) text += this.children[++i].toText();
				node.appendChild(new TextNode(text).toNode());
			} else node.appendChild(this.children[i].toNode());
			return node;
		}
		/**
		* Converts the math node into an HTML markup string.
		*/
		toMarkup() {
			var markup = "<" + this.type;
			for (var attr in this.attributes) if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
				markup += " " + attr + "=\"";
				markup += utils.escape(this.attributes[attr]);
				markup += "\"";
			}
			if (this.classes.length > 0) markup += " class =\"" + utils.escape(createClass(this.classes)) + "\"";
			markup += ">";
			for (var i = 0; i < this.children.length; i++) markup += this.children[i].toMarkup();
			markup += "</" + this.type + ">";
			return markup;
		}
		/**
		* Converts the math node into a string, similar to innerText, but escaped.
		*/
		toText() {
			return this.children.map((child) => child.toText()).join("");
		}
	};
	TextNode = class {
		constructor(text) {
			this.text = void 0;
			this.text = text;
		}
		/**
		* Converts the text node into a DOM text node.
		*/
		toNode() {
			return document.createTextNode(this.text);
		}
		/**
		* Converts the text node into escaped HTML markup
		* (representing the text itself).
		*/
		toMarkup() {
			return utils.escape(this.toText());
		}
		/**
		* Converts the text node into a string
		* (representing the text itself).
		*/
		toText() {
			return this.text;
		}
	};
	SpaceNode = class {
		/**
		* Create a Space node with width given in CSS ems.
		*/
		constructor(width) {
			this.width = void 0;
			this.character = void 0;
			this.width = width;
			if (width >= .05555 && width <= .05556) this.character = " ";
			else if (width >= .1666 && width <= .1667) this.character = " ";
			else if (width >= .2222 && width <= .2223) this.character = " ";
			else if (width >= .2777 && width <= .2778) this.character = "  ";
			else if (width >= -.05556 && width <= -.05555) this.character = " ⁣";
			else if (width >= -.1667 && width <= -.1666) this.character = " ⁣";
			else if (width >= -.2223 && width <= -.2222) this.character = " ⁣";
			else if (width >= -.2778 && width <= -.2777) this.character = " ⁣";
			else this.character = null;
		}
		/**
		* Converts the math node into a MathML-namespaced DOM element.
		*/
		toNode() {
			if (this.character) return document.createTextNode(this.character);
			else {
				var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
				node.setAttribute("width", makeEm(this.width));
				return node;
			}
		}
		/**
		* Converts the math node into an HTML markup string.
		*/
		toMarkup() {
			if (this.character) return "<mtext>" + this.character + "</mtext>";
			else return "<mspace width=\"" + makeEm(this.width) + "\"/>";
		}
		/**
		* Converts the math node into a string, similar to innerText.
		*/
		toText() {
			if (this.character) return this.character;
			else return " ";
		}
	};
	mathMLTree = {
		MathNode,
		TextNode,
		SpaceNode,
		newDocumentFragment
	};
	makeText = function makeText(text, mode, options) {
		if (symbols[mode][text] && symbols[mode][text].replace && text.charCodeAt(0) !== 55349 && !(ligatures.hasOwnProperty(text) && options && (options.fontFamily && options.fontFamily.slice(4, 6) === "tt" || options.font && options.font.slice(4, 6) === "tt"))) text = symbols[mode][text].replace;
		return new mathMLTree.TextNode(text);
	};
	makeRow = function makeRow(body) {
		if (body.length === 1) return body[0];
		else return new mathMLTree.MathNode("mrow", body);
	};
	getVariant = function getVariant(group, options) {
		if (options.fontFamily === "texttt") return "monospace";
		else if (options.fontFamily === "textsf") if (options.fontShape === "textit" && options.fontWeight === "textbf") return "sans-serif-bold-italic";
		else if (options.fontShape === "textit") return "sans-serif-italic";
		else if (options.fontWeight === "textbf") return "bold-sans-serif";
		else return "sans-serif";
		else if (options.fontShape === "textit" && options.fontWeight === "textbf") return "bold-italic";
		else if (options.fontShape === "textit") return "italic";
		else if (options.fontWeight === "textbf") return "bold";
		var font = options.font;
		if (!font || font === "mathnormal") return null;
		var mode = group.mode;
		if (font === "mathit") return "italic";
		else if (font === "boldsymbol") return group.type === "textord" ? "bold" : "bold-italic";
		else if (font === "mathbf") return "bold";
		else if (font === "mathbb") return "double-struck";
		else if (font === "mathsfit") return "sans-serif-italic";
		else if (font === "mathfrak") return "fraktur";
		else if (font === "mathscr" || font === "mathcal") return "script";
		else if (font === "mathsf") return "sans-serif";
		else if (font === "mathtt") return "monospace";
		var text = group.text;
		if (["\\imath", "\\jmath"].includes(text)) return null;
		if (symbols[mode][text] && symbols[mode][text].replace) text = symbols[mode][text].replace;
		var fontName = buildCommon.fontMap[font].fontName;
		if (getCharacterMetrics(text, fontName, mode)) return buildCommon.fontMap[font].variant;
		return null;
	};
	buildExpression = function buildExpression(expression, options, isOrdgroup) {
		if (expression.length === 1) {
			var group = buildGroup(expression[0], options);
			if (isOrdgroup && group instanceof MathNode && group.type === "mo") {
				group.setAttribute("lspace", "0em");
				group.setAttribute("rspace", "0em");
			}
			return [group];
		}
		var groups = [];
		var lastGroup;
		for (var i = 0; i < expression.length; i++) {
			var _group = buildGroup(expression[i], options);
			if (_group instanceof MathNode && lastGroup instanceof MathNode) {
				if (_group.type === "mtext" && lastGroup.type === "mtext" && _group.getAttribute("mathvariant") === lastGroup.getAttribute("mathvariant")) {
					lastGroup.children.push(..._group.children);
					continue;
				} else if (_group.type === "mn" && lastGroup.type === "mn") {
					lastGroup.children.push(..._group.children);
					continue;
				} else if (isNumberPunctuation(_group) && lastGroup.type === "mn") {
					lastGroup.children.push(..._group.children);
					continue;
				} else if (_group.type === "mn" && isNumberPunctuation(lastGroup)) {
					_group.children = [...lastGroup.children, ..._group.children];
					groups.pop();
				} else if ((_group.type === "msup" || _group.type === "msub") && _group.children.length >= 1 && (lastGroup.type === "mn" || isNumberPunctuation(lastGroup))) {
					var base = _group.children[0];
					if (base instanceof MathNode && base.type === "mn") {
						base.children = [...lastGroup.children, ...base.children];
						groups.pop();
					}
				} else if (lastGroup.type === "mi" && lastGroup.children.length === 1) {
					var lastChild = lastGroup.children[0];
					if (lastChild instanceof TextNode && lastChild.text === "̸" && (_group.type === "mo" || _group.type === "mi" || _group.type === "mn")) {
						var child = _group.children[0];
						if (child instanceof TextNode && child.text.length > 0) {
							child.text = child.text.slice(0, 1) + "̸" + child.text.slice(1);
							groups.pop();
						}
					}
				}
			}
			groups.push(_group);
			lastGroup = _group;
		}
		return groups;
	};
	buildExpressionRow = function buildExpressionRow(expression, options, isOrdgroup) {
		return makeRow(buildExpression(expression, options, isOrdgroup));
	};
	buildGroup = function buildGroup(group, options) {
		if (!group) return new mathMLTree.MathNode("mrow");
		if (_mathmlGroupBuilders[group.type]) return _mathmlGroupBuilders[group.type](group, options);
		else throw new ParseError("Got group of unknown type: '" + group.type + "'");
	};
	optionsFromSettings = function optionsFromSettings(settings) {
		return new Options({
			style: settings.displayMode ? Style$1.DISPLAY : Style$1.TEXT,
			maxSize: settings.maxSize,
			minRuleThickness: settings.minRuleThickness
		});
	};
	displayWrap = function displayWrap(node, settings) {
		if (settings.displayMode) {
			var classes = ["katex-display"];
			if (settings.leqno) classes.push("leqno");
			if (settings.fleqn) classes.push("fleqn");
			node = buildCommon.makeSpan(classes, [node]);
		}
		return node;
	};
	buildTree = function buildTree(tree, expression, settings) {
		var options = optionsFromSettings(settings);
		var katexNode;
		if (settings.output === "mathml") return buildMathML(tree, expression, options, settings.displayMode, true);
		else if (settings.output === "html") {
			var htmlNode = buildHTML(tree, options);
			katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
		} else {
			var mathMLNode = buildMathML(tree, expression, options, settings.displayMode, false);
			var _htmlNode = buildHTML(tree, options);
			katexNode = buildCommon.makeSpan(["katex"], [mathMLNode, _htmlNode]);
		}
		return displayWrap(katexNode, settings);
	};
	buildHTMLTree = function buildHTMLTree(tree, expression, settings) {
		var htmlNode = buildHTML(tree, optionsFromSettings(settings));
		return displayWrap(buildCommon.makeSpan(["katex"], [htmlNode]), settings);
	};
	stretchyCodePoint = {
		widehat: "^",
		widecheck: "ˇ",
		widetilde: "~",
		utilde: "~",
		overleftarrow: "←",
		underleftarrow: "←",
		xleftarrow: "←",
		overrightarrow: "→",
		underrightarrow: "→",
		xrightarrow: "→",
		underbrace: "⏟",
		overbrace: "⏞",
		overgroup: "⏠",
		undergroup: "⏡",
		overleftrightarrow: "↔",
		underleftrightarrow: "↔",
		xleftrightarrow: "↔",
		Overrightarrow: "⇒",
		xRightarrow: "⇒",
		overleftharpoon: "↼",
		xleftharpoonup: "↼",
		overrightharpoon: "⇀",
		xrightharpoonup: "⇀",
		xLeftarrow: "⇐",
		xLeftrightarrow: "⇔",
		xhookleftarrow: "↩",
		xhookrightarrow: "↪",
		xmapsto: "↦",
		xrightharpoondown: "⇁",
		xleftharpoondown: "↽",
		xrightleftharpoons: "⇌",
		xleftrightharpoons: "⇋",
		xtwoheadleftarrow: "↞",
		xtwoheadrightarrow: "↠",
		xlongequal: "=",
		xtofrom: "⇄",
		xrightleftarrows: "⇄",
		xrightequilibrium: "⇌",
		xleftequilibrium: "⇋",
		"\\cdrightarrow": "→",
		"\\cdleftarrow": "←",
		"\\cdlongequal": "="
	};
	mathMLnode = function mathMLnode(label) {
		var node = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(stretchyCodePoint[label.replace(/^\\/, "")])]);
		node.setAttribute("stretchy", "true");
		return node;
	};
	katexImagesData = {
		overrightarrow: [
			["rightarrow"],
			.888,
			522,
			"xMaxYMin"
		],
		overleftarrow: [
			["leftarrow"],
			.888,
			522,
			"xMinYMin"
		],
		underrightarrow: [
			["rightarrow"],
			.888,
			522,
			"xMaxYMin"
		],
		underleftarrow: [
			["leftarrow"],
			.888,
			522,
			"xMinYMin"
		],
		xrightarrow: [
			["rightarrow"],
			1.469,
			522,
			"xMaxYMin"
		],
		"\\cdrightarrow": [
			["rightarrow"],
			3,
			522,
			"xMaxYMin"
		],
		xleftarrow: [
			["leftarrow"],
			1.469,
			522,
			"xMinYMin"
		],
		"\\cdleftarrow": [
			["leftarrow"],
			3,
			522,
			"xMinYMin"
		],
		Overrightarrow: [
			["doublerightarrow"],
			.888,
			560,
			"xMaxYMin"
		],
		xRightarrow: [
			["doublerightarrow"],
			1.526,
			560,
			"xMaxYMin"
		],
		xLeftarrow: [
			["doubleleftarrow"],
			1.526,
			560,
			"xMinYMin"
		],
		overleftharpoon: [
			["leftharpoon"],
			.888,
			522,
			"xMinYMin"
		],
		xleftharpoonup: [
			["leftharpoon"],
			.888,
			522,
			"xMinYMin"
		],
		xleftharpoondown: [
			["leftharpoondown"],
			.888,
			522,
			"xMinYMin"
		],
		overrightharpoon: [
			["rightharpoon"],
			.888,
			522,
			"xMaxYMin"
		],
		xrightharpoonup: [
			["rightharpoon"],
			.888,
			522,
			"xMaxYMin"
		],
		xrightharpoondown: [
			["rightharpoondown"],
			.888,
			522,
			"xMaxYMin"
		],
		xlongequal: [
			["longequal"],
			.888,
			334,
			"xMinYMin"
		],
		"\\cdlongequal": [
			["longequal"],
			3,
			334,
			"xMinYMin"
		],
		xtwoheadleftarrow: [
			["twoheadleftarrow"],
			.888,
			334,
			"xMinYMin"
		],
		xtwoheadrightarrow: [
			["twoheadrightarrow"],
			.888,
			334,
			"xMaxYMin"
		],
		overleftrightarrow: [
			["leftarrow", "rightarrow"],
			.888,
			522
		],
		overbrace: [
			[
				"leftbrace",
				"midbrace",
				"rightbrace"
			],
			1.6,
			548
		],
		underbrace: [
			[
				"leftbraceunder",
				"midbraceunder",
				"rightbraceunder"
			],
			1.6,
			548
		],
		underleftrightarrow: [
			["leftarrow", "rightarrow"],
			.888,
			522
		],
		xleftrightarrow: [
			["leftarrow", "rightarrow"],
			1.75,
			522
		],
		xLeftrightarrow: [
			["doubleleftarrow", "doublerightarrow"],
			1.75,
			560
		],
		xrightleftharpoons: [
			["leftharpoondownplus", "rightharpoonplus"],
			1.75,
			716
		],
		xleftrightharpoons: [
			["leftharpoonplus", "rightharpoondownplus"],
			1.75,
			716
		],
		xhookleftarrow: [
			["leftarrow", "righthook"],
			1.08,
			522
		],
		xhookrightarrow: [
			["lefthook", "rightarrow"],
			1.08,
			522
		],
		overlinesegment: [
			["leftlinesegment", "rightlinesegment"],
			.888,
			522
		],
		underlinesegment: [
			["leftlinesegment", "rightlinesegment"],
			.888,
			522
		],
		overgroup: [
			["leftgroup", "rightgroup"],
			.888,
			342
		],
		undergroup: [
			["leftgroupunder", "rightgroupunder"],
			.888,
			342
		],
		xmapsto: [
			["leftmapsto", "rightarrow"],
			1.5,
			522
		],
		xtofrom: [
			["leftToFrom", "rightToFrom"],
			1.75,
			528
		],
		xrightleftarrows: [
			["baraboveleftarrow", "rightarrowabovebar"],
			1.75,
			901
		],
		xrightequilibrium: [
			["baraboveshortleftharpoon", "rightharpoonaboveshortbar"],
			1.75,
			716
		],
		xleftequilibrium: [
			["shortbaraboveleftharpoon", "shortrightharpoonabovebar"],
			1.75,
			716
		]
	};
	groupLength = function groupLength(arg) {
		if (arg.type === "ordgroup") return arg.body.length;
		else return 1;
	};
	stretchy = {
		encloseSpan: function encloseSpan(inner, label, topPad, bottomPad, options) {
			var img;
			var totalHeight = inner.height + inner.depth + topPad + bottomPad;
			if (/fbox|color|angl/.test(label)) {
				img = buildCommon.makeSpan(["stretchy", label], [], options);
				if (label === "fbox") {
					var color = options.color && options.getColor();
					if (color) img.style.borderColor = color;
				}
			} else {
				var lines = [];
				if (/^[bx]cancel$/.test(label)) lines.push(new LineNode({
					"x1": "0",
					"y1": "0",
					"x2": "100%",
					"y2": "100%",
					"stroke-width": "0.046em"
				}));
				if (/^x?cancel$/.test(label)) lines.push(new LineNode({
					"x1": "0",
					"y1": "100%",
					"x2": "100%",
					"y2": "0",
					"stroke-width": "0.046em"
				}));
				var svgNode = new SvgNode(lines, {
					"width": "100%",
					"height": makeEm(totalHeight)
				});
				img = buildCommon.makeSvgSpan([], [svgNode], options);
			}
			img.height = totalHeight;
			img.style.height = makeEm(totalHeight);
			return img;
		},
		mathMLnode,
		svgSpan: function svgSpan(group, options) {
			function buildSvgSpan_() {
				var viewBoxWidth = 4e5;
				var label = group.label.slice(1);
				if ([
					"widehat",
					"widecheck",
					"widetilde",
					"utilde"
				].includes(label)) {
					var numChars = groupLength(group.base);
					var viewBoxHeight;
					var pathName;
					var _height;
					if (numChars > 5) if (label === "widehat" || label === "widecheck") {
						viewBoxHeight = 420;
						viewBoxWidth = 2364;
						_height = .42;
						pathName = label + "4";
					} else {
						viewBoxHeight = 312;
						viewBoxWidth = 2340;
						_height = .34;
						pathName = "tilde4";
					}
					else {
						var imgIndex = [
							1,
							1,
							2,
							2,
							3,
							3
						][numChars];
						if (label === "widehat" || label === "widecheck") {
							viewBoxWidth = [
								0,
								1062,
								2364,
								2364,
								2364
							][imgIndex];
							viewBoxHeight = [
								0,
								239,
								300,
								360,
								420
							][imgIndex];
							_height = [
								0,
								.24,
								.3,
								.3,
								.36,
								.42
							][imgIndex];
							pathName = label + imgIndex;
						} else {
							viewBoxWidth = [
								0,
								600,
								1033,
								2339,
								2340
							][imgIndex];
							viewBoxHeight = [
								0,
								260,
								286,
								306,
								312
							][imgIndex];
							_height = [
								0,
								.26,
								.286,
								.3,
								.306,
								.34
							][imgIndex];
							pathName = "tilde" + imgIndex;
						}
					}
					var svgNode = new SvgNode([new PathNode(pathName)], {
						"width": "100%",
						"height": makeEm(_height),
						"viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
						"preserveAspectRatio": "none"
					});
					return {
						span: buildCommon.makeSvgSpan([], [svgNode], options),
						minWidth: 0,
						height: _height
					};
				} else {
					var spans = [];
					var data = katexImagesData[label];
					var [paths, _minWidth, _viewBoxHeight] = data;
					var _height2 = _viewBoxHeight / 1e3;
					var numSvgChildren = paths.length;
					var widthClasses;
					var aligns;
					if (numSvgChildren === 1) {
						var align1 = data[3];
						widthClasses = ["hide-tail"];
						aligns = [align1];
					} else if (numSvgChildren === 2) {
						widthClasses = ["halfarrow-left", "halfarrow-right"];
						aligns = ["xMinYMin", "xMaxYMin"];
					} else if (numSvgChildren === 3) {
						widthClasses = [
							"brace-left",
							"brace-center",
							"brace-right"
						];
						aligns = [
							"xMinYMin",
							"xMidYMin",
							"xMaxYMin"
						];
					} else throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
					for (var i = 0; i < numSvgChildren; i++) {
						var _svgNode = new SvgNode([new PathNode(paths[i])], {
							"width": "400em",
							"height": makeEm(_height2),
							"viewBox": "0 0 " + viewBoxWidth + " " + _viewBoxHeight,
							"preserveAspectRatio": aligns[i] + " slice"
						});
						var _span = buildCommon.makeSvgSpan([widthClasses[i]], [_svgNode], options);
						if (numSvgChildren === 1) return {
							span: _span,
							minWidth: _minWidth,
							height: _height2
						};
						else {
							_span.style.height = makeEm(_height2);
							spans.push(_span);
						}
					}
					return {
						span: buildCommon.makeSpan(["stretchy"], spans, options),
						minWidth: _minWidth,
						height: _height2
					};
				}
			}
			var { span, minWidth, height } = buildSvgSpan_();
			span.height = height;
			span.style.height = makeEm(height);
			if (minWidth > 0) span.style.minWidth = makeEm(minWidth);
			return span;
		}
	};
	htmlBuilder$a = (grp, options) => {
		var base;
		var group;
		var supSubGroup;
		if (grp && grp.type === "supsub") {
			group = assertNodeType(grp.base, "accent");
			base = group.base;
			grp.base = base;
			supSubGroup = assertSpan(buildGroup$1(grp, options));
			grp.base = group;
		} else {
			group = assertNodeType(grp, "accent");
			base = group.base;
		}
		var body = buildGroup$1(base, options.havingCrampedStyle());
		var mustShift = group.isShifty && utils.isCharacterBox(base);
		var skew = 0;
		if (mustShift) skew = assertSymbolDomNode(buildGroup$1(utils.getBaseElem(base), options.havingCrampedStyle())).skew;
		var accentBelow = group.label === "\\c";
		var clearance = accentBelow ? body.height + body.depth : Math.min(body.height, options.fontMetrics().xHeight);
		var accentBody;
		if (!group.isStretchy) {
			var accent;
			var width;
			if (group.label === "\\vec") {
				accent = buildCommon.staticSvg("vec", options);
				width = buildCommon.svgData.vec[1];
			} else {
				accent = buildCommon.makeOrd({
					mode: group.mode,
					text: group.label
				}, options, "textord");
				accent = assertSymbolDomNode(accent);
				accent.italic = 0;
				width = accent.width;
				if (accentBelow) clearance += accent.depth;
			}
			accentBody = buildCommon.makeSpan(["accent-body"], [accent]);
			var accentFull = group.label === "\\textcircled";
			if (accentFull) {
				accentBody.classes.push("accent-full");
				clearance = body.height;
			}
			var left = skew;
			if (!accentFull) left -= width / 2;
			accentBody.style.left = makeEm(left);
			if (group.label === "\\textcircled") accentBody.style.top = ".2em";
			accentBody = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [
					{
						type: "elem",
						elem: body
					},
					{
						type: "kern",
						size: -clearance
					},
					{
						type: "elem",
						elem: accentBody
					}
				]
			}, options);
		} else {
			accentBody = stretchy.svgSpan(group, options);
			accentBody = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [{
					type: "elem",
					elem: body
				}, {
					type: "elem",
					elem: accentBody,
					wrapperClasses: ["svg-align"],
					wrapperStyle: skew > 0 ? {
						width: "calc(100% - " + makeEm(2 * skew) + ")",
						marginLeft: makeEm(2 * skew)
					} : void 0
				}]
			}, options);
		}
		var accentWrap = buildCommon.makeSpan(["mord", "accent"], [accentBody], options);
		if (supSubGroup) {
			supSubGroup.children[0] = accentWrap;
			supSubGroup.height = Math.max(accentWrap.height, supSubGroup.height);
			supSubGroup.classes[0] = "mord";
			return supSubGroup;
		} else return accentWrap;
	};
	mathmlBuilder$9 = (group, options) => {
		var accentNode = group.isStretchy ? stretchy.mathMLnode(group.label) : new mathMLTree.MathNode("mo", [makeText(group.label, group.mode)]);
		var node = new mathMLTree.MathNode("mover", [buildGroup(group.base, options), accentNode]);
		node.setAttribute("accent", "true");
		return node;
	};
	NON_STRETCHY_ACCENT_REGEX = new RegExp([
		"\\acute",
		"\\grave",
		"\\ddot",
		"\\tilde",
		"\\bar",
		"\\breve",
		"\\check",
		"\\hat",
		"\\vec",
		"\\dot",
		"\\mathring"
	].map((accent) => "\\" + accent).join("|"));
	defineFunction({
		type: "accent",
		names: [
			"\\acute",
			"\\grave",
			"\\ddot",
			"\\tilde",
			"\\bar",
			"\\breve",
			"\\check",
			"\\hat",
			"\\vec",
			"\\dot",
			"\\mathring",
			"\\widecheck",
			"\\widehat",
			"\\widetilde",
			"\\overrightarrow",
			"\\overleftarrow",
			"\\Overrightarrow",
			"\\overleftrightarrow",
			"\\overgroup",
			"\\overlinesegment",
			"\\overleftharpoon",
			"\\overrightharpoon"
		],
		props: { numArgs: 1 },
		handler: (context, args) => {
			var base = normalizeArgument(args[0]);
			var isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context.funcName);
			var isShifty = !isStretchy || context.funcName === "\\widehat" || context.funcName === "\\widetilde" || context.funcName === "\\widecheck";
			return {
				type: "accent",
				mode: context.parser.mode,
				label: context.funcName,
				isStretchy,
				isShifty,
				base
			};
		},
		htmlBuilder: htmlBuilder$a,
		mathmlBuilder: mathmlBuilder$9
	});
	defineFunction({
		type: "accent",
		names: [
			"\\'",
			"\\`",
			"\\^",
			"\\~",
			"\\=",
			"\\u",
			"\\.",
			"\\\"",
			"\\c",
			"\\r",
			"\\H",
			"\\v",
			"\\textcircled"
		],
		props: {
			numArgs: 1,
			allowedInText: true,
			allowedInMath: true,
			argTypes: ["primitive"]
		},
		handler: (context, args) => {
			var base = args[0];
			var mode = context.parser.mode;
			if (mode === "math") {
				context.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + context.funcName + " works only in text mode");
				mode = "text";
			}
			return {
				type: "accent",
				mode,
				label: context.funcName,
				isStretchy: false,
				isShifty: true,
				base
			};
		},
		htmlBuilder: htmlBuilder$a,
		mathmlBuilder: mathmlBuilder$9
	});
	defineFunction({
		type: "accentUnder",
		names: [
			"\\underleftarrow",
			"\\underrightarrow",
			"\\underleftrightarrow",
			"\\undergroup",
			"\\underlinesegment",
			"\\utilde"
		],
		props: { numArgs: 1 },
		handler: (_ref, args) => {
			var { parser, funcName } = _ref;
			var base = args[0];
			return {
				type: "accentUnder",
				mode: parser.mode,
				label: funcName,
				base
			};
		},
		htmlBuilder: (group, options) => {
			var innerGroup = buildGroup$1(group.base, options);
			var accentBody = stretchy.svgSpan(group, options);
			var kern = group.label === "\\utilde" ? .12 : 0;
			var vlist = buildCommon.makeVList({
				positionType: "top",
				positionData: innerGroup.height,
				children: [
					{
						type: "elem",
						elem: accentBody,
						wrapperClasses: ["svg-align"]
					},
					{
						type: "kern",
						size: kern
					},
					{
						type: "elem",
						elem: innerGroup
					}
				]
			}, options);
			return buildCommon.makeSpan(["mord", "accentunder"], [vlist], options);
		},
		mathmlBuilder: (group, options) => {
			var accentNode = stretchy.mathMLnode(group.label);
			var node = new mathMLTree.MathNode("munder", [buildGroup(group.base, options), accentNode]);
			node.setAttribute("accentunder", "true");
			return node;
		}
	});
	paddedNode = (group) => {
		var node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
		node.setAttribute("width", "+0.6em");
		node.setAttribute("lspace", "0.3em");
		return node;
	};
	defineFunction({
		type: "xArrow",
		names: [
			"\\xleftarrow",
			"\\xrightarrow",
			"\\xLeftarrow",
			"\\xRightarrow",
			"\\xleftrightarrow",
			"\\xLeftrightarrow",
			"\\xhookleftarrow",
			"\\xhookrightarrow",
			"\\xmapsto",
			"\\xrightharpoondown",
			"\\xrightharpoonup",
			"\\xleftharpoondown",
			"\\xleftharpoonup",
			"\\xrightleftharpoons",
			"\\xleftrightharpoons",
			"\\xlongequal",
			"\\xtwoheadrightarrow",
			"\\xtwoheadleftarrow",
			"\\xtofrom",
			"\\xrightleftarrows",
			"\\xrightequilibrium",
			"\\xleftequilibrium",
			"\\\\cdrightarrow",
			"\\\\cdleftarrow",
			"\\\\cdlongequal"
		],
		props: {
			numArgs: 1,
			numOptionalArgs: 1
		},
		handler(_ref, args, optArgs) {
			var { parser, funcName } = _ref;
			return {
				type: "xArrow",
				mode: parser.mode,
				label: funcName,
				body: args[0],
				below: optArgs[0]
			};
		},
		htmlBuilder(group, options) {
			var style = options.style;
			var newOptions = options.havingStyle(style.sup());
			var upperGroup = buildCommon.wrapFragment(buildGroup$1(group.body, newOptions, options), options);
			var arrowPrefix = group.label.slice(0, 2) === "\\x" ? "x" : "cd";
			upperGroup.classes.push(arrowPrefix + "-arrow-pad");
			var lowerGroup;
			if (group.below) {
				newOptions = options.havingStyle(style.sub());
				lowerGroup = buildCommon.wrapFragment(buildGroup$1(group.below, newOptions, options), options);
				lowerGroup.classes.push(arrowPrefix + "-arrow-pad");
			}
			var arrowBody = stretchy.svgSpan(group, options);
			var arrowShift = -options.fontMetrics().axisHeight + .5 * arrowBody.height;
			var upperShift = -options.fontMetrics().axisHeight - .5 * arrowBody.height - .111;
			if (upperGroup.depth > .25 || group.label === "\\xleftequilibrium") upperShift -= upperGroup.depth;
			var vlist;
			if (lowerGroup) {
				var lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + .5 * arrowBody.height + .111;
				vlist = buildCommon.makeVList({
					positionType: "individualShift",
					children: [
						{
							type: "elem",
							elem: upperGroup,
							shift: upperShift
						},
						{
							type: "elem",
							elem: arrowBody,
							shift: arrowShift
						},
						{
							type: "elem",
							elem: lowerGroup,
							shift: lowerShift
						}
					]
				}, options);
			} else vlist = buildCommon.makeVList({
				positionType: "individualShift",
				children: [{
					type: "elem",
					elem: upperGroup,
					shift: upperShift
				}, {
					type: "elem",
					elem: arrowBody,
					shift: arrowShift
				}]
			}, options);
			vlist.children[0].children[0].children[1].classes.push("svg-align");
			return buildCommon.makeSpan(["mrel", "x-arrow"], [vlist], options);
		},
		mathmlBuilder(group, options) {
			var arrowNode = stretchy.mathMLnode(group.label);
			arrowNode.setAttribute("minsize", group.label.charAt(0) === "x" ? "1.75em" : "3.0em");
			var node;
			if (group.body) {
				var upperNode = paddedNode(buildGroup(group.body, options));
				if (group.below) {
					var lowerNode = paddedNode(buildGroup(group.below, options));
					node = new mathMLTree.MathNode("munderover", [
						arrowNode,
						lowerNode,
						upperNode
					]);
				} else node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
			} else if (group.below) {
				var _lowerNode = paddedNode(buildGroup(group.below, options));
				node = new mathMLTree.MathNode("munder", [arrowNode, _lowerNode]);
			} else {
				node = paddedNode();
				node = new mathMLTree.MathNode("mover", [arrowNode, node]);
			}
			return node;
		}
	});
	makeSpan = buildCommon.makeSpan;
	defineFunction({
		type: "mclass",
		names: [
			"\\mathord",
			"\\mathbin",
			"\\mathrel",
			"\\mathopen",
			"\\mathclose",
			"\\mathpunct",
			"\\mathinner"
		],
		props: {
			numArgs: 1,
			primitive: true
		},
		handler(_ref, args) {
			var { parser, funcName } = _ref;
			var body = args[0];
			return {
				type: "mclass",
				mode: parser.mode,
				mclass: "m" + funcName.slice(5),
				body: ordargument(body),
				isCharacterBox: utils.isCharacterBox(body)
			};
		},
		htmlBuilder: htmlBuilder$9,
		mathmlBuilder: mathmlBuilder$8
	});
	binrelClass = (arg) => {
		var atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;
		if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) return "m" + atom.family;
		else return "mord";
	};
	defineFunction({
		type: "mclass",
		names: ["\\@binrel"],
		props: { numArgs: 2 },
		handler(_ref2, args) {
			var { parser } = _ref2;
			return {
				type: "mclass",
				mode: parser.mode,
				mclass: binrelClass(args[0]),
				body: ordargument(args[1]),
				isCharacterBox: utils.isCharacterBox(args[1])
			};
		}
	});
	defineFunction({
		type: "mclass",
		names: [
			"\\stackrel",
			"\\overset",
			"\\underset"
		],
		props: { numArgs: 2 },
		handler(_ref3, args) {
			var { parser, funcName } = _ref3;
			var baseArg = args[1];
			var shiftedArg = args[0];
			var mclass;
			if (funcName !== "\\stackrel") mclass = binrelClass(baseArg);
			else mclass = "mrel";
			var baseOp = {
				type: "op",
				mode: baseArg.mode,
				limits: true,
				alwaysHandleSupSub: true,
				parentIsSupSub: false,
				symbol: false,
				suppressBaseShift: funcName !== "\\stackrel",
				body: ordargument(baseArg)
			};
			var supsub = {
				type: "supsub",
				mode: shiftedArg.mode,
				base: baseOp,
				sup: funcName === "\\underset" ? null : shiftedArg,
				sub: funcName === "\\underset" ? shiftedArg : null
			};
			return {
				type: "mclass",
				mode: parser.mode,
				mclass,
				body: [supsub],
				isCharacterBox: utils.isCharacterBox(supsub)
			};
		},
		htmlBuilder: htmlBuilder$9,
		mathmlBuilder: mathmlBuilder$8
	});
	defineFunction({
		type: "pmb",
		names: ["\\pmb"],
		props: {
			numArgs: 1,
			allowedInText: true
		},
		handler(_ref, args) {
			var { parser } = _ref;
			return {
				type: "pmb",
				mode: parser.mode,
				mclass: binrelClass(args[0]),
				body: ordargument(args[0])
			};
		},
		htmlBuilder(group, options) {
			var elements = buildExpression$1(group.body, options, true);
			var node = buildCommon.makeSpan([group.mclass], elements, options);
			node.style.textShadow = "0.02em 0.01em 0.04px";
			return node;
		},
		mathmlBuilder(group, style) {
			var inner = buildExpression(group.body, style);
			var node = new mathMLTree.MathNode("mstyle", inner);
			node.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px");
			return node;
		}
	});
	cdArrowFunctionName = {
		">": "\\\\cdrightarrow",
		"<": "\\\\cdleftarrow",
		"=": "\\\\cdlongequal",
		"A": "\\uparrow",
		"V": "\\downarrow",
		"|": "\\Vert",
		".": "no arrow"
	};
	newCell = () => {
		return {
			type: "styling",
			body: [],
			mode: "math",
			style: "display"
		};
	};
	isStartOfArrow = (node) => {
		return node.type === "textord" && node.text === "@";
	};
	isLabelEnd = (node, endChar) => {
		return (node.type === "mathord" || node.type === "atom") && node.text === endChar;
	};
	defineFunction({
		type: "cdlabel",
		names: ["\\\\cdleft", "\\\\cdright"],
		props: { numArgs: 1 },
		handler(_ref, args) {
			var { parser, funcName } = _ref;
			return {
				type: "cdlabel",
				mode: parser.mode,
				side: funcName.slice(4),
				label: args[0]
			};
		},
		htmlBuilder(group, options) {
			var newOptions = options.havingStyle(options.style.sup());
			var label = buildCommon.wrapFragment(buildGroup$1(group.label, newOptions, options), options);
			label.classes.push("cd-label-" + group.side);
			label.style.bottom = makeEm(.8 - label.depth);
			label.height = 0;
			label.depth = 0;
			return label;
		},
		mathmlBuilder(group, options) {
			var label = new mathMLTree.MathNode("mrow", [buildGroup(group.label, options)]);
			label = new mathMLTree.MathNode("mpadded", [label]);
			label.setAttribute("width", "0");
			if (group.side === "left") label.setAttribute("lspace", "-1width");
			label.setAttribute("voffset", "0.7em");
			label = new mathMLTree.MathNode("mstyle", [label]);
			label.setAttribute("displaystyle", "false");
			label.setAttribute("scriptlevel", "1");
			return label;
		}
	});
	defineFunction({
		type: "cdlabelparent",
		names: ["\\\\cdparent"],
		props: { numArgs: 1 },
		handler(_ref2, args) {
			var { parser } = _ref2;
			return {
				type: "cdlabelparent",
				mode: parser.mode,
				fragment: args[0]
			};
		},
		htmlBuilder(group, options) {
			var parent = buildCommon.wrapFragment(buildGroup$1(group.fragment, options), options);
			parent.classes.push("cd-vert-arrow");
			return parent;
		},
		mathmlBuilder(group, options) {
			return new mathMLTree.MathNode("mrow", [buildGroup(group.fragment, options)]);
		}
	});
	defineFunction({
		type: "textord",
		names: ["\\@char"],
		props: {
			numArgs: 1,
			allowedInText: true
		},
		handler(_ref, args) {
			var { parser } = _ref;
			var group = assertNodeType(args[0], "ordgroup").body;
			var number = "";
			for (var i = 0; i < group.length; i++) {
				var node = assertNodeType(group[i], "textord");
				number += node.text;
			}
			var code = parseInt(number);
			var text;
			if (isNaN(code)) throw new ParseError("\\@char has non-numeric argument " + number);
			else if (code < 0 || code >= 1114111) throw new ParseError("\\@char with invalid code point " + number);
			else if (code <= 65535) text = String.fromCharCode(code);
			else {
				code -= 65536;
				text = String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
			}
			return {
				type: "textord",
				mode: parser.mode,
				text
			};
		}
	});
	htmlBuilder$8 = (group, options) => {
		var elements = buildExpression$1(group.body, options.withColor(group.color), false);
		return buildCommon.makeFragment(elements);
	};
	mathmlBuilder$7 = (group, options) => {
		var inner = buildExpression(group.body, options.withColor(group.color));
		var node = new mathMLTree.MathNode("mstyle", inner);
		node.setAttribute("mathcolor", group.color);
		return node;
	};
	defineFunction({
		type: "color",
		names: ["\\textcolor"],
		props: {
			numArgs: 2,
			allowedInText: true,
			argTypes: ["color", "original"]
		},
		handler(_ref, args) {
			var { parser } = _ref;
			var color = assertNodeType(args[0], "color-token").color;
			var body = args[1];
			return {
				type: "color",
				mode: parser.mode,
				color,
				body: ordargument(body)
			};
		},
		htmlBuilder: htmlBuilder$8,
		mathmlBuilder: mathmlBuilder$7
	});
	defineFunction({
		type: "color",
		names: ["\\color"],
		props: {
			numArgs: 1,
			allowedInText: true,
			argTypes: ["color"]
		},
		handler(_ref2, args) {
			var { parser, breakOnTokenText } = _ref2;
			var color = assertNodeType(args[0], "color-token").color;
			parser.gullet.macros.set("\\current@color", color);
			var body = parser.parseExpression(true, breakOnTokenText);
			return {
				type: "color",
				mode: parser.mode,
				color,
				body
			};
		},
		htmlBuilder: htmlBuilder$8,
		mathmlBuilder: mathmlBuilder$7
	});
	defineFunction({
		type: "cr",
		names: ["\\\\"],
		props: {
			numArgs: 0,
			numOptionalArgs: 0,
			allowedInText: true
		},
		handler(_ref, args, optArgs) {
			var { parser } = _ref;
			var size = parser.gullet.future().text === "[" ? parser.parseSizeGroup(true) : null;
			var newLine = !parser.settings.displayMode || !parser.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
			return {
				type: "cr",
				mode: parser.mode,
				newLine,
				size: size && assertNodeType(size, "size").value
			};
		},
		htmlBuilder(group, options) {
			var span = buildCommon.makeSpan(["mspace"], [], options);
			if (group.newLine) {
				span.classes.push("newline");
				if (group.size) span.style.marginTop = makeEm(calculateSize(group.size, options));
			}
			return span;
		},
		mathmlBuilder(group, options) {
			var node = new mathMLTree.MathNode("mspace");
			if (group.newLine) {
				node.setAttribute("linebreak", "newline");
				if (group.size) node.setAttribute("height", makeEm(calculateSize(group.size, options)));
			}
			return node;
		}
	});
	globalMap = {
		"\\global": "\\global",
		"\\long": "\\\\globallong",
		"\\\\globallong": "\\\\globallong",
		"\\def": "\\gdef",
		"\\gdef": "\\gdef",
		"\\edef": "\\xdef",
		"\\xdef": "\\xdef",
		"\\let": "\\\\globallet",
		"\\futurelet": "\\\\globalfuture"
	};
	checkControlSequence = (tok) => {
		var name = tok.text;
		if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) throw new ParseError("Expected a control sequence", tok);
		return name;
	};
	getRHS = (parser) => {
		var tok = parser.gullet.popToken();
		if (tok.text === "=") {
			tok = parser.gullet.popToken();
			if (tok.text === " ") tok = parser.gullet.popToken();
		}
		return tok;
	};
	letCommand = (parser, name, tok, global) => {
		var macro = parser.gullet.macros.get(tok.text);
		if (macro == null) {
			tok.noexpand = true;
			macro = {
				tokens: [tok],
				numArgs: 0,
				unexpandable: !parser.gullet.isExpandable(tok.text)
			};
		}
		parser.gullet.macros.set(name, macro, global);
	};
	defineFunction({
		type: "internal",
		names: [
			"\\global",
			"\\long",
			"\\\\globallong"
		],
		props: {
			numArgs: 0,
			allowedInText: true
		},
		handler(_ref) {
			var { parser, funcName } = _ref;
			parser.consumeSpaces();
			var token = parser.fetch();
			if (globalMap[token.text]) {
				if (funcName === "\\global" || funcName === "\\\\globallong") token.text = globalMap[token.text];
				return assertNodeType(parser.parseFunction(), "internal");
			}
			throw new ParseError("Invalid token after macro prefix", token);
		}
	});
	defineFunction({
		type: "internal",
		names: [
			"\\def",
			"\\gdef",
			"\\edef",
			"\\xdef"
		],
		props: {
			numArgs: 0,
			allowedInText: true,
			primitive: true
		},
		handler(_ref2) {
			var { parser, funcName } = _ref2;
			var tok = parser.gullet.popToken();
			var name = tok.text;
			if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) throw new ParseError("Expected a control sequence", tok);
			var numArgs = 0;
			var insert;
			var delimiters = [[]];
			while (parser.gullet.future().text !== "{") {
				tok = parser.gullet.popToken();
				if (tok.text === "#") {
					if (parser.gullet.future().text === "{") {
						insert = parser.gullet.future();
						delimiters[numArgs].push("{");
						break;
					}
					tok = parser.gullet.popToken();
					if (!/^[1-9]$/.test(tok.text)) throw new ParseError("Invalid argument number \"" + tok.text + "\"");
					if (parseInt(tok.text) !== numArgs + 1) throw new ParseError("Argument number \"" + tok.text + "\" out of order");
					numArgs++;
					delimiters.push([]);
				} else if (tok.text === "EOF") throw new ParseError("Expected a macro definition");
				else delimiters[numArgs].push(tok.text);
			}
			var { tokens } = parser.gullet.consumeArg();
			if (insert) tokens.unshift(insert);
			if (funcName === "\\edef" || funcName === "\\xdef") {
				tokens = parser.gullet.expandTokens(tokens);
				tokens.reverse();
			}
			parser.gullet.macros.set(name, {
				tokens,
				numArgs,
				delimiters
			}, funcName === globalMap[funcName]);
			return {
				type: "internal",
				mode: parser.mode
			};
		}
	});
	defineFunction({
		type: "internal",
		names: ["\\let", "\\\\globallet"],
		props: {
			numArgs: 0,
			allowedInText: true,
			primitive: true
		},
		handler(_ref3) {
			var { parser, funcName } = _ref3;
			var name = checkControlSequence(parser.gullet.popToken());
			parser.gullet.consumeSpaces();
			letCommand(parser, name, getRHS(parser), funcName === "\\\\globallet");
			return {
				type: "internal",
				mode: parser.mode
			};
		}
	});
	defineFunction({
		type: "internal",
		names: ["\\futurelet", "\\\\globalfuture"],
		props: {
			numArgs: 0,
			allowedInText: true,
			primitive: true
		},
		handler(_ref4) {
			var { parser, funcName } = _ref4;
			var name = checkControlSequence(parser.gullet.popToken());
			var middle = parser.gullet.popToken();
			var tok = parser.gullet.popToken();
			letCommand(parser, name, tok, funcName === "\\\\globalfuture");
			parser.gullet.pushToken(tok);
			parser.gullet.pushToken(middle);
			return {
				type: "internal",
				mode: parser.mode
			};
		}
	});
	getMetrics = function getMetrics(symbol, font, mode) {
		var metrics = getCharacterMetrics(symbols.math[symbol] && symbols.math[symbol].replace || symbol, font, mode);
		if (!metrics) throw new Error("Unsupported symbol " + symbol + " and font size " + font + ".");
		return metrics;
	};
	styleWrap = function styleWrap(delim, toStyle, options, classes) {
		var newOptions = options.havingBaseStyle(toStyle);
		var span = buildCommon.makeSpan(classes.concat(newOptions.sizingClasses(options)), [delim], options);
		var delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
		span.height *= delimSizeMultiplier;
		span.depth *= delimSizeMultiplier;
		span.maxFontSize = newOptions.sizeMultiplier;
		return span;
	};
	centerSpan = function centerSpan(span, options, style) {
		var newOptions = options.havingBaseStyle(style);
		var shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;
		span.classes.push("delimcenter");
		span.style.top = makeEm(shift);
		span.height -= shift;
		span.depth += shift;
	};
	makeSmallDelim = function makeSmallDelim(delim, style, center, options, mode, classes) {
		var span = styleWrap(buildCommon.makeSymbol(delim, "Main-Regular", mode, options), style, options, classes);
		if (center) centerSpan(span, options, style);
		return span;
	};
	mathrmSize = function mathrmSize(value, size, mode, options) {
		return buildCommon.makeSymbol(value, "Size" + size + "-Regular", mode, options);
	};
	makeLargeDelim = function makeLargeDelim(delim, size, center, options, mode, classes) {
		var inner = mathrmSize(delim, size, mode, options);
		var span = styleWrap(buildCommon.makeSpan(["delimsizing", "size" + size], [inner], options), Style$1.TEXT, options, classes);
		if (center) centerSpan(span, options, Style$1.TEXT);
		return span;
	};
	makeGlyphSpan = function makeGlyphSpan(symbol, font, mode) {
		var sizeClass;
		if (font === "Size1-Regular") sizeClass = "delim-size1";
		else sizeClass = "delim-size4";
		return {
			type: "elem",
			elem: buildCommon.makeSpan(["delimsizinginner", sizeClass], [buildCommon.makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])])
		};
	};
	makeInner = function makeInner(ch, height, options) {
		var width = fontMetricsData["Size4-Regular"][ch.charCodeAt(0)] ? fontMetricsData["Size4-Regular"][ch.charCodeAt(0)][4] : fontMetricsData["Size1-Regular"][ch.charCodeAt(0)][4];
		var svgNode = new SvgNode([new PathNode("inner", innerPath(ch, Math.round(1e3 * height)))], {
			"width": makeEm(width),
			"height": makeEm(height),
			"style": "width:" + makeEm(width),
			"viewBox": "0 0 " + 1e3 * width + " " + Math.round(1e3 * height),
			"preserveAspectRatio": "xMinYMin"
		});
		var span = buildCommon.makeSvgSpan([], [svgNode], options);
		span.height = height;
		span.style.height = makeEm(height);
		span.style.width = makeEm(width);
		return {
			type: "elem",
			elem: span
		};
	};
	lapInEms = .008;
	lap = {
		type: "kern",
		size: -1 * lapInEms
	};
	verts = [
		"|",
		"\\lvert",
		"\\rvert",
		"\\vert"
	];
	doubleVerts = [
		"\\|",
		"\\lVert",
		"\\rVert",
		"\\Vert"
	];
	makeStackedDelim = function makeStackedDelim(delim, heightTotal, center, options, mode, classes) {
		var top;
		var middle;
		var repeat;
		var bottom;
		var svgLabel = "";
		var viewBoxWidth = 0;
		top = repeat = bottom = delim;
		middle = null;
		var font = "Size1-Regular";
		if (delim === "\\uparrow") repeat = bottom = "⏐";
		else if (delim === "\\Uparrow") repeat = bottom = "‖";
		else if (delim === "\\downarrow") top = repeat = "⏐";
		else if (delim === "\\Downarrow") top = repeat = "‖";
		else if (delim === "\\updownarrow") {
			top = "\\uparrow";
			repeat = "⏐";
			bottom = "\\downarrow";
		} else if (delim === "\\Updownarrow") {
			top = "\\Uparrow";
			repeat = "‖";
			bottom = "\\Downarrow";
		} else if (verts.includes(delim)) {
			repeat = "∣";
			svgLabel = "vert";
			viewBoxWidth = 333;
		} else if (doubleVerts.includes(delim)) {
			repeat = "∥";
			svgLabel = "doublevert";
			viewBoxWidth = 556;
		} else if (delim === "[" || delim === "\\lbrack") {
			top = "⎡";
			repeat = "⎢";
			bottom = "⎣";
			font = "Size4-Regular";
			svgLabel = "lbrack";
			viewBoxWidth = 667;
		} else if (delim === "]" || delim === "\\rbrack") {
			top = "⎤";
			repeat = "⎥";
			bottom = "⎦";
			font = "Size4-Regular";
			svgLabel = "rbrack";
			viewBoxWidth = 667;
		} else if (delim === "\\lfloor" || delim === "⌊") {
			repeat = top = "⎢";
			bottom = "⎣";
			font = "Size4-Regular";
			svgLabel = "lfloor";
			viewBoxWidth = 667;
		} else if (delim === "\\lceil" || delim === "⌈") {
			top = "⎡";
			repeat = bottom = "⎢";
			font = "Size4-Regular";
			svgLabel = "lceil";
			viewBoxWidth = 667;
		} else if (delim === "\\rfloor" || delim === "⌋") {
			repeat = top = "⎥";
			bottom = "⎦";
			font = "Size4-Regular";
			svgLabel = "rfloor";
			viewBoxWidth = 667;
		} else if (delim === "\\rceil" || delim === "⌉") {
			top = "⎤";
			repeat = bottom = "⎥";
			font = "Size4-Regular";
			svgLabel = "rceil";
			viewBoxWidth = 667;
		} else if (delim === "(" || delim === "\\lparen") {
			top = "⎛";
			repeat = "⎜";
			bottom = "⎝";
			font = "Size4-Regular";
			svgLabel = "lparen";
			viewBoxWidth = 875;
		} else if (delim === ")" || delim === "\\rparen") {
			top = "⎞";
			repeat = "⎟";
			bottom = "⎠";
			font = "Size4-Regular";
			svgLabel = "rparen";
			viewBoxWidth = 875;
		} else if (delim === "\\{" || delim === "\\lbrace") {
			top = "⎧";
			middle = "⎨";
			bottom = "⎩";
			repeat = "⎪";
			font = "Size4-Regular";
		} else if (delim === "\\}" || delim === "\\rbrace") {
			top = "⎫";
			middle = "⎬";
			bottom = "⎭";
			repeat = "⎪";
			font = "Size4-Regular";
		} else if (delim === "\\lgroup" || delim === "⟮") {
			top = "⎧";
			bottom = "⎩";
			repeat = "⎪";
			font = "Size4-Regular";
		} else if (delim === "\\rgroup" || delim === "⟯") {
			top = "⎫";
			bottom = "⎭";
			repeat = "⎪";
			font = "Size4-Regular";
		} else if (delim === "\\lmoustache" || delim === "⎰") {
			top = "⎧";
			bottom = "⎭";
			repeat = "⎪";
			font = "Size4-Regular";
		} else if (delim === "\\rmoustache" || delim === "⎱") {
			top = "⎫";
			bottom = "⎩";
			repeat = "⎪";
			font = "Size4-Regular";
		}
		var topMetrics = getMetrics(top, font, mode);
		var topHeightTotal = topMetrics.height + topMetrics.depth;
		var repeatMetrics = getMetrics(repeat, font, mode);
		var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
		var bottomMetrics = getMetrics(bottom, font, mode);
		var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
		var middleHeightTotal = 0;
		var middleFactor = 1;
		if (middle !== null) {
			var middleMetrics = getMetrics(middle, font, mode);
			middleHeightTotal = middleMetrics.height + middleMetrics.depth;
			middleFactor = 2;
		}
		var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;
		var realHeightTotal = minHeight + Math.max(0, Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal))) * middleFactor * repeatHeightTotal;
		var axisHeight = options.fontMetrics().axisHeight;
		if (center) axisHeight *= options.sizeMultiplier;
		var depth = realHeightTotal / 2 - axisHeight;
		var stack = [];
		if (svgLabel.length > 0) {
			var midHeight = realHeightTotal - topHeightTotal - bottomHeightTotal;
			var viewBoxHeight = Math.round(realHeightTotal * 1e3);
			var pathStr = tallDelim(svgLabel, Math.round(midHeight * 1e3));
			var path = new PathNode(svgLabel, pathStr);
			var width = (viewBoxWidth / 1e3).toFixed(3) + "em";
			var height = (viewBoxHeight / 1e3).toFixed(3) + "em";
			var svg = new SvgNode([path], {
				"width": width,
				"height": height,
				"viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight
			});
			var wrapper = buildCommon.makeSvgSpan([], [svg], options);
			wrapper.height = viewBoxHeight / 1e3;
			wrapper.style.width = width;
			wrapper.style.height = height;
			stack.push({
				type: "elem",
				elem: wrapper
			});
		} else {
			stack.push(makeGlyphSpan(bottom, font, mode));
			stack.push(lap);
			if (middle === null) {
				var innerHeight = realHeightTotal - topHeightTotal - bottomHeightTotal + 2 * lapInEms;
				stack.push(makeInner(repeat, innerHeight, options));
			} else {
				var _innerHeight = (realHeightTotal - topHeightTotal - bottomHeightTotal - middleHeightTotal) / 2 + 2 * lapInEms;
				stack.push(makeInner(repeat, _innerHeight, options));
				stack.push(lap);
				stack.push(makeGlyphSpan(middle, font, mode));
				stack.push(lap);
				stack.push(makeInner(repeat, _innerHeight, options));
			}
			stack.push(lap);
			stack.push(makeGlyphSpan(top, font, mode));
		}
		var newOptions = options.havingBaseStyle(Style$1.TEXT);
		var inner = buildCommon.makeVList({
			positionType: "bottom",
			positionData: depth,
			children: stack
		}, newOptions);
		return styleWrap(buildCommon.makeSpan(["delimsizing", "mult"], [inner], newOptions), Style$1.TEXT, options, classes);
	};
	vbPad = 80;
	emPad = .08;
	sqrtSvg = function sqrtSvg(sqrtName, height, viewBoxHeight, extraVinculum, options) {
		var svg = new SvgNode([new PathNode(sqrtName, sqrtPath(sqrtName, extraVinculum, viewBoxHeight))], {
			"width": "400em",
			"height": makeEm(height),
			"viewBox": "0 0 400000 " + viewBoxHeight,
			"preserveAspectRatio": "xMinYMin slice"
		});
		return buildCommon.makeSvgSpan(["hide-tail"], [svg], options);
	};
	makeSqrtImage = function makeSqrtImage(height, options) {
		var newOptions = options.havingBaseSizing();
		var delim = traverseSequence("\\surd", height * newOptions.sizeMultiplier, stackLargeDelimiterSequence, newOptions);
		var sizeMultiplier = newOptions.sizeMultiplier;
		var extraVinculum = Math.max(0, options.minRuleThickness - options.fontMetrics().sqrtRuleThickness);
		var span;
		var spanHeight = 0;
		var texHeight = 0;
		var viewBoxHeight = 0;
		var advanceWidth;
		if (delim.type === "small") {
			viewBoxHeight = 1e3 + 1e3 * extraVinculum + vbPad;
			if (height < 1) sizeMultiplier = 1;
			else if (height < 1.4) sizeMultiplier = .7;
			spanHeight = (1 + extraVinculum + emPad) / sizeMultiplier;
			texHeight = (1 + extraVinculum) / sizeMultiplier;
			span = sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, extraVinculum, options);
			span.style.minWidth = "0.853em";
			advanceWidth = .833 / sizeMultiplier;
		} else if (delim.type === "large") {
			viewBoxHeight = (1e3 + vbPad) * sizeToMaxHeight[delim.size];
			texHeight = (sizeToMaxHeight[delim.size] + extraVinculum) / sizeMultiplier;
			spanHeight = (sizeToMaxHeight[delim.size] + extraVinculum + emPad) / sizeMultiplier;
			span = sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, extraVinculum, options);
			span.style.minWidth = "1.02em";
			advanceWidth = 1 / sizeMultiplier;
		} else {
			spanHeight = height + extraVinculum + emPad;
			texHeight = height + extraVinculum;
			viewBoxHeight = Math.floor(1e3 * height + extraVinculum) + vbPad;
			span = sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, extraVinculum, options);
			span.style.minWidth = "0.742em";
			advanceWidth = 1.056;
		}
		span.height = texHeight;
		span.style.height = makeEm(spanHeight);
		return {
			span,
			advanceWidth,
			ruleWidth: (options.fontMetrics().sqrtRuleThickness + extraVinculum) * sizeMultiplier
		};
	};
	stackLargeDelimiters = [
		"(",
		"\\lparen",
		")",
		"\\rparen",
		"[",
		"\\lbrack",
		"]",
		"\\rbrack",
		"\\{",
		"\\lbrace",
		"\\}",
		"\\rbrace",
		"\\lfloor",
		"\\rfloor",
		"⌊",
		"⌋",
		"\\lceil",
		"\\rceil",
		"⌈",
		"⌉",
		"\\surd"
	];
	stackAlwaysDelimiters = [
		"\\uparrow",
		"\\downarrow",
		"\\updownarrow",
		"\\Uparrow",
		"\\Downarrow",
		"\\Updownarrow",
		"|",
		"\\|",
		"\\vert",
		"\\Vert",
		"\\lvert",
		"\\rvert",
		"\\lVert",
		"\\rVert",
		"\\lgroup",
		"\\rgroup",
		"⟮",
		"⟯",
		"\\lmoustache",
		"\\rmoustache",
		"⎰",
		"⎱"
	];
	stackNeverDelimiters = [
		"<",
		">",
		"\\langle",
		"\\rangle",
		"/",
		"\\backslash",
		"\\lt",
		"\\gt"
	];
	sizeToMaxHeight = [
		0,
		1.2,
		1.8,
		2.4,
		3
	];
	makeSizedDelim = function makeSizedDelim(delim, size, options, mode, classes) {
		if (delim === "<" || delim === "\\lt" || delim === "⟨") delim = "\\langle";
		else if (delim === ">" || delim === "\\gt" || delim === "⟩") delim = "\\rangle";
		if (stackLargeDelimiters.includes(delim) || stackNeverDelimiters.includes(delim)) return makeLargeDelim(delim, size, false, options, mode, classes);
		else if (stackAlwaysDelimiters.includes(delim)) return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
		else throw new ParseError("Illegal delimiter: '" + delim + "'");
	};
	stackNeverDelimiterSequence = [
		{
			type: "small",
			style: Style$1.SCRIPTSCRIPT
		},
		{
			type: "small",
			style: Style$1.SCRIPT
		},
		{
			type: "small",
			style: Style$1.TEXT
		},
		{
			type: "large",
			size: 1
		},
		{
			type: "large",
			size: 2
		},
		{
			type: "large",
			size: 3
		},
		{
			type: "large",
			size: 4
		}
	];
	stackAlwaysDelimiterSequence = [
		{
			type: "small",
			style: Style$1.SCRIPTSCRIPT
		},
		{
			type: "small",
			style: Style$1.SCRIPT
		},
		{
			type: "small",
			style: Style$1.TEXT
		},
		{ type: "stack" }
	];
	stackLargeDelimiterSequence = [
		{
			type: "small",
			style: Style$1.SCRIPTSCRIPT
		},
		{
			type: "small",
			style: Style$1.SCRIPT
		},
		{
			type: "small",
			style: Style$1.TEXT
		},
		{
			type: "large",
			size: 1
		},
		{
			type: "large",
			size: 2
		},
		{
			type: "large",
			size: 3
		},
		{
			type: "large",
			size: 4
		},
		{ type: "stack" }
	];
	delimTypeToFont = function delimTypeToFont(type) {
		if (type.type === "small") return "Main-Regular";
		else if (type.type === "large") return "Size" + type.size + "-Regular";
		else if (type.type === "stack") return "Size4-Regular";
		else throw new Error("Add support for delim type '" + type.type + "' here.");
	};
	traverseSequence = function traverseSequence(delim, height, sequence, options) {
		for (var i = Math.min(2, 3 - options.style.size); i < sequence.length; i++) {
			if (sequence[i].type === "stack") break;
			var metrics = getMetrics(delim, delimTypeToFont(sequence[i]), "math");
			var heightDepth = metrics.height + metrics.depth;
			if (sequence[i].type === "small") {
				var newOptions = options.havingBaseStyle(sequence[i].style);
				heightDepth *= newOptions.sizeMultiplier;
			}
			if (heightDepth > height) return sequence[i];
		}
		return sequence[sequence.length - 1];
	};
	makeCustomSizedDelim = function makeCustomSizedDelim(delim, height, center, options, mode, classes) {
		if (delim === "<" || delim === "\\lt" || delim === "⟨") delim = "\\langle";
		else if (delim === ">" || delim === "\\gt" || delim === "⟩") delim = "\\rangle";
		var sequence;
		if (stackNeverDelimiters.includes(delim)) sequence = stackNeverDelimiterSequence;
		else if (stackLargeDelimiters.includes(delim)) sequence = stackLargeDelimiterSequence;
		else sequence = stackAlwaysDelimiterSequence;
		var delimType = traverseSequence(delim, height, sequence, options);
		if (delimType.type === "small") return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
		else if (delimType.type === "large") return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
		else return makeStackedDelim(delim, height, center, options, mode, classes);
	};
	delimiter = {
		sqrtImage: makeSqrtImage,
		sizedDelim: makeSizedDelim,
		sizeToMaxHeight,
		customSizedDelim: makeCustomSizedDelim,
		leftRightDelim: function makeLeftRightDelim(delim, height, depth, options, mode, classes) {
			var axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier;
			var delimiterFactor = 901;
			var delimiterExtend = 5 / options.fontMetrics().ptPerEm;
			var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);
			return makeCustomSizedDelim(delim, Math.max(maxDistFromAxis / 500 * delimiterFactor, 2 * maxDistFromAxis - delimiterExtend), true, options, mode, classes);
		}
	};
	delimiterSizes = {
		"\\bigl": {
			mclass: "mopen",
			size: 1
		},
		"\\Bigl": {
			mclass: "mopen",
			size: 2
		},
		"\\biggl": {
			mclass: "mopen",
			size: 3
		},
		"\\Biggl": {
			mclass: "mopen",
			size: 4
		},
		"\\bigr": {
			mclass: "mclose",
			size: 1
		},
		"\\Bigr": {
			mclass: "mclose",
			size: 2
		},
		"\\biggr": {
			mclass: "mclose",
			size: 3
		},
		"\\Biggr": {
			mclass: "mclose",
			size: 4
		},
		"\\bigm": {
			mclass: "mrel",
			size: 1
		},
		"\\Bigm": {
			mclass: "mrel",
			size: 2
		},
		"\\biggm": {
			mclass: "mrel",
			size: 3
		},
		"\\Biggm": {
			mclass: "mrel",
			size: 4
		},
		"\\big": {
			mclass: "mord",
			size: 1
		},
		"\\Big": {
			mclass: "mord",
			size: 2
		},
		"\\bigg": {
			mclass: "mord",
			size: 3
		},
		"\\Bigg": {
			mclass: "mord",
			size: 4
		}
	};
	delimiters = [
		"(",
		"\\lparen",
		")",
		"\\rparen",
		"[",
		"\\lbrack",
		"]",
		"\\rbrack",
		"\\{",
		"\\lbrace",
		"\\}",
		"\\rbrace",
		"\\lfloor",
		"\\rfloor",
		"⌊",
		"⌋",
		"\\lceil",
		"\\rceil",
		"⌈",
		"⌉",
		"<",
		">",
		"\\langle",
		"⟨",
		"\\rangle",
		"⟩",
		"\\lt",
		"\\gt",
		"\\lvert",
		"\\rvert",
		"\\lVert",
		"\\rVert",
		"\\lgroup",
		"\\rgroup",
		"⟮",
		"⟯",
		"\\lmoustache",
		"\\rmoustache",
		"⎰",
		"⎱",
		"/",
		"\\backslash",
		"|",
		"\\vert",
		"\\|",
		"\\Vert",
		"\\uparrow",
		"\\Uparrow",
		"\\downarrow",
		"\\Downarrow",
		"\\updownarrow",
		"\\Updownarrow",
		"."
	];
	defineFunction({
		type: "delimsizing",
		names: [
			"\\bigl",
			"\\Bigl",
			"\\biggl",
			"\\Biggl",
			"\\bigr",
			"\\Bigr",
			"\\biggr",
			"\\Biggr",
			"\\bigm",
			"\\Bigm",
			"\\biggm",
			"\\Biggm",
			"\\big",
			"\\Big",
			"\\bigg",
			"\\Bigg"
		],
		props: {
			numArgs: 1,
			argTypes: ["primitive"]
		},
		handler: (context, args) => {
			var delim = checkDelimiter(args[0], context);
			return {
				type: "delimsizing",
				mode: context.parser.mode,
				size: delimiterSizes[context.funcName].size,
				mclass: delimiterSizes[context.funcName].mclass,
				delim: delim.text
			};
		},
		htmlBuilder: (group, options) => {
			if (group.delim === ".") return buildCommon.makeSpan([group.mclass]);
			return delimiter.sizedDelim(group.delim, group.size, options, group.mode, [group.mclass]);
		},
		mathmlBuilder: (group) => {
			var children = [];
			if (group.delim !== ".") children.push(makeText(group.delim, group.mode));
			var node = new mathMLTree.MathNode("mo", children);
			if (group.mclass === "mopen" || group.mclass === "mclose") node.setAttribute("fence", "true");
			else node.setAttribute("fence", "false");
			node.setAttribute("stretchy", "true");
			var size = makeEm(delimiter.sizeToMaxHeight[group.size]);
			node.setAttribute("minsize", size);
			node.setAttribute("maxsize", size);
			return node;
		}
	});
	defineFunction({
		type: "leftright-right",
		names: ["\\right"],
		props: {
			numArgs: 1,
			primitive: true
		},
		handler: (context, args) => {
			var color = context.parser.gullet.macros.get("\\current@color");
			if (color && typeof color !== "string") throw new ParseError("\\current@color set to non-string in \\right");
			return {
				type: "leftright-right",
				mode: context.parser.mode,
				delim: checkDelimiter(args[0], context).text,
				color
			};
		}
	});
	defineFunction({
		type: "leftright",
		names: ["\\left"],
		props: {
			numArgs: 1,
			primitive: true
		},
		handler: (context, args) => {
			var delim = checkDelimiter(args[0], context);
			var parser = context.parser;
			++parser.leftrightDepth;
			var body = parser.parseExpression(false);
			--parser.leftrightDepth;
			parser.expect("\\right", false);
			var right = assertNodeType(parser.parseFunction(), "leftright-right");
			return {
				type: "leftright",
				mode: parser.mode,
				body,
				left: delim.text,
				right: right.delim,
				rightColor: right.color
			};
		},
		htmlBuilder: (group, options) => {
			assertParsed(group);
			var inner = buildExpression$1(group.body, options, true, ["mopen", "mclose"]);
			var innerHeight = 0;
			var innerDepth = 0;
			var hadMiddle = false;
			for (var i = 0; i < inner.length; i++) if (inner[i].isMiddle) hadMiddle = true;
			else {
				innerHeight = Math.max(inner[i].height, innerHeight);
				innerDepth = Math.max(inner[i].depth, innerDepth);
			}
			innerHeight *= options.sizeMultiplier;
			innerDepth *= options.sizeMultiplier;
			var leftDelim;
			if (group.left === ".") leftDelim = makeNullDelimiter(options, ["mopen"]);
			else leftDelim = delimiter.leftRightDelim(group.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
			inner.unshift(leftDelim);
			if (hadMiddle) for (var _i = 1; _i < inner.length; _i++) {
				var isMiddle = inner[_i].isMiddle;
				if (isMiddle) inner[_i] = delimiter.leftRightDelim(isMiddle.delim, innerHeight, innerDepth, isMiddle.options, group.mode, []);
			}
			var rightDelim;
			if (group.right === ".") rightDelim = makeNullDelimiter(options, ["mclose"]);
			else {
				var colorOptions = group.rightColor ? options.withColor(group.rightColor) : options;
				rightDelim = delimiter.leftRightDelim(group.right, innerHeight, innerDepth, colorOptions, group.mode, ["mclose"]);
			}
			inner.push(rightDelim);
			return buildCommon.makeSpan(["minner"], inner, options);
		},
		mathmlBuilder: (group, options) => {
			assertParsed(group);
			var inner = buildExpression(group.body, options);
			if (group.left !== ".") {
				var leftNode = new mathMLTree.MathNode("mo", [makeText(group.left, group.mode)]);
				leftNode.setAttribute("fence", "true");
				inner.unshift(leftNode);
			}
			if (group.right !== ".") {
				var rightNode = new mathMLTree.MathNode("mo", [makeText(group.right, group.mode)]);
				rightNode.setAttribute("fence", "true");
				if (group.rightColor) rightNode.setAttribute("mathcolor", group.rightColor);
				inner.push(rightNode);
			}
			return makeRow(inner);
		}
	});
	defineFunction({
		type: "middle",
		names: ["\\middle"],
		props: {
			numArgs: 1,
			primitive: true
		},
		handler: (context, args) => {
			var delim = checkDelimiter(args[0], context);
			if (!context.parser.leftrightDepth) throw new ParseError("\\middle without preceding \\left", delim);
			return {
				type: "middle",
				mode: context.parser.mode,
				delim: delim.text
			};
		},
		htmlBuilder: (group, options) => {
			var middleDelim;
			if (group.delim === ".") middleDelim = makeNullDelimiter(options, []);
			else {
				middleDelim = delimiter.sizedDelim(group.delim, 1, options, group.mode, []);
				var isMiddle = {
					delim: group.delim,
					options
				};
				middleDelim.isMiddle = isMiddle;
			}
			return middleDelim;
		},
		mathmlBuilder: (group, options) => {
			var textNode = group.delim === "\\vert" || group.delim === "|" ? makeText("|", "text") : makeText(group.delim, group.mode);
			var middleNode = new mathMLTree.MathNode("mo", [textNode]);
			middleNode.setAttribute("fence", "true");
			middleNode.setAttribute("lspace", "0.05em");
			middleNode.setAttribute("rspace", "0.05em");
			return middleNode;
		}
	});
	htmlBuilder$7 = (group, options) => {
		var inner = buildCommon.wrapFragment(buildGroup$1(group.body, options), options);
		var label = group.label.slice(1);
		var scale = options.sizeMultiplier;
		var img;
		var imgShift = 0;
		var isSingleChar = utils.isCharacterBox(group.body);
		if (label === "sout") {
			img = buildCommon.makeSpan(["stretchy", "sout"]);
			img.height = options.fontMetrics().defaultRuleThickness / scale;
			imgShift = -.5 * options.fontMetrics().xHeight;
		} else if (label === "phase") {
			var lineWeight = calculateSize({
				number: .6,
				unit: "pt"
			}, options);
			var clearance = calculateSize({
				number: .35,
				unit: "ex"
			}, options);
			var newOptions = options.havingBaseSizing();
			scale = scale / newOptions.sizeMultiplier;
			var angleHeight = inner.height + inner.depth + lineWeight + clearance;
			inner.style.paddingLeft = makeEm(angleHeight / 2 + lineWeight);
			var viewBoxHeight = Math.floor(1e3 * angleHeight * scale);
			var svgNode = new SvgNode([new PathNode("phase", phasePath(viewBoxHeight))], {
				"width": "400em",
				"height": makeEm(viewBoxHeight / 1e3),
				"viewBox": "0 0 400000 " + viewBoxHeight,
				"preserveAspectRatio": "xMinYMin slice"
			});
			img = buildCommon.makeSvgSpan(["hide-tail"], [svgNode], options);
			img.style.height = makeEm(angleHeight);
			imgShift = inner.depth + lineWeight + clearance;
		} else {
			if (/cancel/.test(label)) {
				if (!isSingleChar) inner.classes.push("cancel-pad");
			} else if (label === "angl") inner.classes.push("anglpad");
			else inner.classes.push("boxpad");
			var topPad = 0;
			var bottomPad = 0;
			var ruleThickness = 0;
			if (/box/.test(label)) {
				ruleThickness = Math.max(options.fontMetrics().fboxrule, options.minRuleThickness);
				topPad = options.fontMetrics().fboxsep + (label === "colorbox" ? 0 : ruleThickness);
				bottomPad = topPad;
			} else if (label === "angl") {
				ruleThickness = Math.max(options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
				topPad = 4 * ruleThickness;
				bottomPad = Math.max(0, .25 - inner.depth);
			} else {
				topPad = isSingleChar ? .2 : 0;
				bottomPad = topPad;
			}
			img = stretchy.encloseSpan(inner, label, topPad, bottomPad, options);
			if (/fbox|boxed|fcolorbox/.test(label)) {
				img.style.borderStyle = "solid";
				img.style.borderWidth = makeEm(ruleThickness);
			} else if (label === "angl" && ruleThickness !== .049) {
				img.style.borderTopWidth = makeEm(ruleThickness);
				img.style.borderRightWidth = makeEm(ruleThickness);
			}
			imgShift = inner.depth + bottomPad;
			if (group.backgroundColor) {
				img.style.backgroundColor = group.backgroundColor;
				if (group.borderColor) img.style.borderColor = group.borderColor;
			}
		}
		var vlist;
		if (group.backgroundColor) vlist = buildCommon.makeVList({
			positionType: "individualShift",
			children: [{
				type: "elem",
				elem: img,
				shift: imgShift
			}, {
				type: "elem",
				elem: inner,
				shift: 0
			}]
		}, options);
		else {
			var classes = /cancel|phase/.test(label) ? ["svg-align"] : [];
			vlist = buildCommon.makeVList({
				positionType: "individualShift",
				children: [{
					type: "elem",
					elem: inner,
					shift: 0
				}, {
					type: "elem",
					elem: img,
					shift: imgShift,
					wrapperClasses: classes
				}]
			}, options);
		}
		if (/cancel/.test(label)) {
			vlist.height = inner.height;
			vlist.depth = inner.depth;
		}
		if (/cancel/.test(label) && !isSingleChar) return buildCommon.makeSpan(["mord", "cancel-lap"], [vlist], options);
		else return buildCommon.makeSpan(["mord"], [vlist], options);
	};
	mathmlBuilder$6 = (group, options) => {
		var fboxsep = 0;
		var node = new mathMLTree.MathNode(group.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [buildGroup(group.body, options)]);
		switch (group.label) {
			case "\\cancel":
				node.setAttribute("notation", "updiagonalstrike");
				break;
			case "\\bcancel":
				node.setAttribute("notation", "downdiagonalstrike");
				break;
			case "\\phase":
				node.setAttribute("notation", "phasorangle");
				break;
			case "\\sout":
				node.setAttribute("notation", "horizontalstrike");
				break;
			case "\\fbox":
				node.setAttribute("notation", "box");
				break;
			case "\\angl":
				node.setAttribute("notation", "actuarial");
				break;
			case "\\fcolorbox":
			case "\\colorbox":
				fboxsep = options.fontMetrics().fboxsep * options.fontMetrics().ptPerEm;
				node.setAttribute("width", "+" + 2 * fboxsep + "pt");
				node.setAttribute("height", "+" + 2 * fboxsep + "pt");
				node.setAttribute("lspace", fboxsep + "pt");
				node.setAttribute("voffset", fboxsep + "pt");
				if (group.label === "\\fcolorbox") {
					var thk = Math.max(options.fontMetrics().fboxrule, options.minRuleThickness);
					node.setAttribute("style", "border: " + thk + "em solid " + String(group.borderColor));
				}
				break;
			case "\\xcancel":
				node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
				break;
		}
		if (group.backgroundColor) node.setAttribute("mathbackground", group.backgroundColor);
		return node;
	};
	defineFunction({
		type: "enclose",
		names: ["\\colorbox"],
		props: {
			numArgs: 2,
			allowedInText: true,
			argTypes: ["color", "text"]
		},
		handler(_ref, args, optArgs) {
			var { parser, funcName } = _ref;
			var color = assertNodeType(args[0], "color-token").color;
			var body = args[1];
			return {
				type: "enclose",
				mode: parser.mode,
				label: funcName,
				backgroundColor: color,
				body
			};
		},
		htmlBuilder: htmlBuilder$7,
		mathmlBuilder: mathmlBuilder$6
	});
	defineFunction({
		type: "enclose",
		names: ["\\fcolorbox"],
		props: {
			numArgs: 3,
			allowedInText: true,
			argTypes: [
				"color",
				"color",
				"text"
			]
		},
		handler(_ref2, args, optArgs) {
			var { parser, funcName } = _ref2;
			var borderColor = assertNodeType(args[0], "color-token").color;
			var backgroundColor = assertNodeType(args[1], "color-token").color;
			var body = args[2];
			return {
				type: "enclose",
				mode: parser.mode,
				label: funcName,
				backgroundColor,
				borderColor,
				body
			};
		},
		htmlBuilder: htmlBuilder$7,
		mathmlBuilder: mathmlBuilder$6
	});
	defineFunction({
		type: "enclose",
		names: ["\\fbox"],
		props: {
			numArgs: 1,
			argTypes: ["hbox"],
			allowedInText: true
		},
		handler(_ref3, args) {
			var { parser } = _ref3;
			return {
				type: "enclose",
				mode: parser.mode,
				label: "\\fbox",
				body: args[0]
			};
		}
	});
	defineFunction({
		type: "enclose",
		names: [
			"\\cancel",
			"\\bcancel",
			"\\xcancel",
			"\\sout",
			"\\phase"
		],
		props: { numArgs: 1 },
		handler(_ref4, args) {
			var { parser, funcName } = _ref4;
			var body = args[0];
			return {
				type: "enclose",
				mode: parser.mode,
				label: funcName,
				body
			};
		},
		htmlBuilder: htmlBuilder$7,
		mathmlBuilder: mathmlBuilder$6
	});
	defineFunction({
		type: "enclose",
		names: ["\\angl"],
		props: {
			numArgs: 1,
			argTypes: ["hbox"],
			allowedInText: false
		},
		handler(_ref5, args) {
			var { parser } = _ref5;
			return {
				type: "enclose",
				mode: parser.mode,
				label: "\\angl",
				body: args[0]
			};
		}
	});
	_environments = {};
	_macros = {};
	validateAmsEnvironmentContext = (context) => {
		if (!context.parser.settings.displayMode) throw new ParseError("{" + context.envName + "} can be used only in display mode.");
	};
	htmlBuilder$6 = function htmlBuilder(group, options) {
		var r;
		var c;
		var nr = group.body.length;
		var hLinesBeforeRow = group.hLinesBeforeRow;
		var nc = 0;
		var body = new Array(nr);
		var hlines = [];
		var ruleThickness = Math.max(options.fontMetrics().arrayRuleWidth, options.minRuleThickness);
		var pt = 1 / options.fontMetrics().ptPerEm;
		var arraycolsep = 5 * pt;
		if (group.colSeparationType && group.colSeparationType === "small") arraycolsep = .2778 * (options.havingStyle(Style$1.SCRIPT).sizeMultiplier / options.sizeMultiplier);
		var baselineskip = group.colSeparationType === "CD" ? calculateSize({
			number: 3,
			unit: "ex"
		}, options) : 12 * pt;
		var jot = 3 * pt;
		var arrayskip = group.arraystretch * baselineskip;
		var arstrutHeight = .7 * arrayskip;
		var arstrutDepth = .3 * arrayskip;
		var totalHeight = 0;
		function setHLinePos(hlinesInGap) {
			for (var i = 0; i < hlinesInGap.length; ++i) {
				if (i > 0) totalHeight += .25;
				hlines.push({
					pos: totalHeight,
					isDashed: hlinesInGap[i]
				});
			}
		}
		setHLinePos(hLinesBeforeRow[0]);
		for (r = 0; r < group.body.length; ++r) {
			var inrow = group.body[r];
			var height = arstrutHeight;
			var depth = arstrutDepth;
			if (nc < inrow.length) nc = inrow.length;
			var outrow = new Array(inrow.length);
			for (c = 0; c < inrow.length; ++c) {
				var elt = buildGroup$1(inrow[c], options);
				if (depth < elt.depth) depth = elt.depth;
				if (height < elt.height) height = elt.height;
				outrow[c] = elt;
			}
			var rowGap = group.rowGaps[r];
			var gap = 0;
			if (rowGap) {
				gap = calculateSize(rowGap, options);
				if (gap > 0) {
					gap += arstrutDepth;
					if (depth < gap) depth = gap;
					gap = 0;
				}
			}
			if (group.addJot) depth += jot;
			outrow.height = height;
			outrow.depth = depth;
			totalHeight += height;
			outrow.pos = totalHeight;
			totalHeight += depth + gap;
			body[r] = outrow;
			setHLinePos(hLinesBeforeRow[r + 1]);
		}
		var offset = totalHeight / 2 + options.fontMetrics().axisHeight;
		var colDescriptions = group.cols || [];
		var cols = [];
		var colSep;
		var colDescrNum;
		var tagSpans = [];
		if (group.tags && group.tags.some((tag) => tag)) for (r = 0; r < nr; ++r) {
			var rw = body[r];
			var shift = rw.pos - offset;
			var tag = group.tags[r];
			var tagSpan = void 0;
			if (tag === true) tagSpan = buildCommon.makeSpan(["eqn-num"], [], options);
			else if (tag === false) tagSpan = buildCommon.makeSpan([], [], options);
			else tagSpan = buildCommon.makeSpan([], buildExpression$1(tag, options, true), options);
			tagSpan.depth = rw.depth;
			tagSpan.height = rw.height;
			tagSpans.push({
				type: "elem",
				elem: tagSpan,
				shift
			});
		}
		for (c = 0, colDescrNum = 0; c < nc || colDescrNum < colDescriptions.length; ++c, ++colDescrNum) {
			var colDescr = colDescriptions[colDescrNum] || {};
			var firstSeparator = true;
			while (colDescr.type === "separator") {
				if (!firstSeparator) {
					colSep = buildCommon.makeSpan(["arraycolsep"], []);
					colSep.style.width = makeEm(options.fontMetrics().doubleRuleSep);
					cols.push(colSep);
				}
				if (colDescr.separator === "|" || colDescr.separator === ":") {
					var lineType = colDescr.separator === "|" ? "solid" : "dashed";
					var separator = buildCommon.makeSpan(["vertical-separator"], [], options);
					separator.style.height = makeEm(totalHeight);
					separator.style.borderRightWidth = makeEm(ruleThickness);
					separator.style.borderRightStyle = lineType;
					separator.style.margin = "0 " + makeEm(-ruleThickness / 2);
					var _shift = totalHeight - offset;
					if (_shift) separator.style.verticalAlign = makeEm(-_shift);
					cols.push(separator);
				} else throw new ParseError("Invalid separator type: " + colDescr.separator);
				colDescrNum++;
				colDescr = colDescriptions[colDescrNum] || {};
				firstSeparator = false;
			}
			if (c >= nc) continue;
			var sepwidth = void 0;
			if (c > 0 || group.hskipBeforeAndAfter) {
				sepwidth = utils.deflt(colDescr.pregap, arraycolsep);
				if (sepwidth !== 0) {
					colSep = buildCommon.makeSpan(["arraycolsep"], []);
					colSep.style.width = makeEm(sepwidth);
					cols.push(colSep);
				}
			}
			var col = [];
			for (r = 0; r < nr; ++r) {
				var row = body[r];
				var elem = row[c];
				if (!elem) continue;
				var _shift2 = row.pos - offset;
				elem.depth = row.depth;
				elem.height = row.height;
				col.push({
					type: "elem",
					elem,
					shift: _shift2
				});
			}
			col = buildCommon.makeVList({
				positionType: "individualShift",
				children: col
			}, options);
			col = buildCommon.makeSpan(["col-align-" + (colDescr.align || "c")], [col]);
			cols.push(col);
			if (c < nc - 1 || group.hskipBeforeAndAfter) {
				sepwidth = utils.deflt(colDescr.postgap, arraycolsep);
				if (sepwidth !== 0) {
					colSep = buildCommon.makeSpan(["arraycolsep"], []);
					colSep.style.width = makeEm(sepwidth);
					cols.push(colSep);
				}
			}
		}
		body = buildCommon.makeSpan(["mtable"], cols);
		if (hlines.length > 0) {
			var line = buildCommon.makeLineSpan("hline", options, ruleThickness);
			var dashes = buildCommon.makeLineSpan("hdashline", options, ruleThickness);
			var vListElems = [{
				type: "elem",
				elem: body,
				shift: 0
			}];
			while (hlines.length > 0) {
				var hline = hlines.pop();
				var lineShift = hline.pos - offset;
				if (hline.isDashed) vListElems.push({
					type: "elem",
					elem: dashes,
					shift: lineShift
				});
				else vListElems.push({
					type: "elem",
					elem: line,
					shift: lineShift
				});
			}
			body = buildCommon.makeVList({
				positionType: "individualShift",
				children: vListElems
			}, options);
		}
		if (tagSpans.length === 0) return buildCommon.makeSpan(["mord"], [body], options);
		else {
			var eqnNumCol = buildCommon.makeVList({
				positionType: "individualShift",
				children: tagSpans
			}, options);
			eqnNumCol = buildCommon.makeSpan(["tag"], [eqnNumCol], options);
			return buildCommon.makeFragment([body, eqnNumCol]);
		}
	};
	alignMap = {
		c: "center ",
		l: "left ",
		r: "right "
	};
	mathmlBuilder$5 = function mathmlBuilder(group, options) {
		var tbl = [];
		var glue = new mathMLTree.MathNode("mtd", [], ["mtr-glue"]);
		var tag = new mathMLTree.MathNode("mtd", [], ["mml-eqn-num"]);
		for (var i = 0; i < group.body.length; i++) {
			var rw = group.body[i];
			var row = [];
			for (var j = 0; j < rw.length; j++) row.push(new mathMLTree.MathNode("mtd", [buildGroup(rw[j], options)]));
			if (group.tags && group.tags[i]) {
				row.unshift(glue);
				row.push(glue);
				if (group.leqno) row.unshift(tag);
				else row.push(tag);
			}
			tbl.push(new mathMLTree.MathNode("mtr", row));
		}
		var table = new mathMLTree.MathNode("mtable", tbl);
		var gap = group.arraystretch === .5 ? .1 : .16 + group.arraystretch - 1 + (group.addJot ? .09 : 0);
		table.setAttribute("rowspacing", makeEm(gap));
		var menclose = "";
		var align = "";
		if (group.cols && group.cols.length > 0) {
			var cols = group.cols;
			var columnLines = "";
			var prevTypeWasAlign = false;
			var iStart = 0;
			var iEnd = cols.length;
			if (cols[0].type === "separator") {
				menclose += "top ";
				iStart = 1;
			}
			if (cols[cols.length - 1].type === "separator") {
				menclose += "bottom ";
				iEnd -= 1;
			}
			for (var _i = iStart; _i < iEnd; _i++) if (cols[_i].type === "align") {
				align += alignMap[cols[_i].align];
				if (prevTypeWasAlign) columnLines += "none ";
				prevTypeWasAlign = true;
			} else if (cols[_i].type === "separator") {
				if (prevTypeWasAlign) {
					columnLines += cols[_i].separator === "|" ? "solid " : "dashed ";
					prevTypeWasAlign = false;
				}
			}
			table.setAttribute("columnalign", align.trim());
			if (/[sd]/.test(columnLines)) table.setAttribute("columnlines", columnLines.trim());
		}
		if (group.colSeparationType === "align") {
			var _cols = group.cols || [];
			var spacing = "";
			for (var _i2 = 1; _i2 < _cols.length; _i2++) spacing += _i2 % 2 ? "0em " : "1em ";
			table.setAttribute("columnspacing", spacing.trim());
		} else if (group.colSeparationType === "alignat" || group.colSeparationType === "gather") table.setAttribute("columnspacing", "0em");
		else if (group.colSeparationType === "small") table.setAttribute("columnspacing", "0.2778em");
		else if (group.colSeparationType === "CD") table.setAttribute("columnspacing", "0.5em");
		else table.setAttribute("columnspacing", "1em");
		var rowLines = "";
		var hlines = group.hLinesBeforeRow;
		menclose += hlines[0].length > 0 ? "left " : "";
		menclose += hlines[hlines.length - 1].length > 0 ? "right " : "";
		for (var _i3 = 1; _i3 < hlines.length - 1; _i3++) rowLines += hlines[_i3].length === 0 ? "none " : hlines[_i3][0] ? "dashed " : "solid ";
		if (/[sd]/.test(rowLines)) table.setAttribute("rowlines", rowLines.trim());
		if (menclose !== "") {
			table = new mathMLTree.MathNode("menclose", [table]);
			table.setAttribute("notation", menclose.trim());
		}
		if (group.arraystretch && group.arraystretch < 1) {
			table = new mathMLTree.MathNode("mstyle", [table]);
			table.setAttribute("scriptlevel", "1");
		}
		return table;
	};
	alignedHandler = function alignedHandler(context, args) {
		if (context.envName.indexOf("ed") === -1) validateAmsEnvironmentContext(context);
		var cols = [];
		var separationType = context.envName.indexOf("at") > -1 ? "alignat" : "align";
		var isSplit = context.envName === "split";
		var res = parseArray(context.parser, {
			cols,
			addJot: true,
			autoTag: isSplit ? void 0 : getAutoTag(context.envName),
			emptySingleRow: true,
			colSeparationType: separationType,
			maxNumCols: isSplit ? 2 : void 0,
			leqno: context.parser.settings.leqno
		}, "display");
		var numMaths;
		var numCols = 0;
		var emptyGroup = {
			type: "ordgroup",
			mode: context.mode,
			body: []
		};
		if (args[0] && args[0].type === "ordgroup") {
			var arg0 = "";
			for (var i = 0; i < args[0].body.length; i++) {
				var textord = assertNodeType(args[0].body[i], "textord");
				arg0 += textord.text;
			}
			numMaths = Number(arg0);
			numCols = numMaths * 2;
		}
		var isAligned = !numCols;
		res.body.forEach(function(row) {
			for (var _i4 = 1; _i4 < row.length; _i4 += 2) assertNodeType(assertNodeType(row[_i4], "styling").body[0], "ordgroup").body.unshift(emptyGroup);
			if (!isAligned) {
				var curMaths = row.length / 2;
				if (numMaths < curMaths) throw new ParseError("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row[0]);
			} else if (numCols < row.length) numCols = row.length;
		});
		for (var _i5 = 0; _i5 < numCols; ++_i5) {
			var align = "r";
			var pregap = 0;
			if (_i5 % 2 === 1) align = "l";
			else if (_i5 > 0 && isAligned) pregap = 1;
			cols[_i5] = {
				type: "align",
				align,
				pregap,
				postgap: 0
			};
		}
		res.colSeparationType = isAligned ? "align" : "alignat";
		return res;
	};
	defineEnvironment({
		type: "array",
		names: ["array", "darray"],
		props: { numArgs: 1 },
		handler(context, args) {
			var cols = (checkSymbolNodeType(args[0]) ? [args[0]] : assertNodeType(args[0], "ordgroup").body).map(function(nde) {
				var ca = assertSymbolNodeType(nde).text;
				if ("lcr".indexOf(ca) !== -1) return {
					type: "align",
					align: ca
				};
				else if (ca === "|") return {
					type: "separator",
					separator: "|"
				};
				else if (ca === ":") return {
					type: "separator",
					separator: ":"
				};
				throw new ParseError("Unknown column alignment: " + ca, nde);
			});
			var res = {
				cols,
				hskipBeforeAndAfter: true,
				maxNumCols: cols.length
			};
			return parseArray(context.parser, res, dCellStyle(context.envName));
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: [
			"matrix",
			"pmatrix",
			"bmatrix",
			"Bmatrix",
			"vmatrix",
			"Vmatrix",
			"matrix*",
			"pmatrix*",
			"bmatrix*",
			"Bmatrix*",
			"vmatrix*",
			"Vmatrix*"
		],
		props: { numArgs: 0 },
		handler(context) {
			var delimiters = {
				"matrix": null,
				"pmatrix": ["(", ")"],
				"bmatrix": ["[", "]"],
				"Bmatrix": ["\\{", "\\}"],
				"vmatrix": ["|", "|"],
				"Vmatrix": ["\\Vert", "\\Vert"]
			}[context.envName.replace("*", "")];
			var colAlign = "c";
			var payload = {
				hskipBeforeAndAfter: false,
				cols: [{
					type: "align",
					align: colAlign
				}]
			};
			if (context.envName.charAt(context.envName.length - 1) === "*") {
				var parser = context.parser;
				parser.consumeSpaces();
				if (parser.fetch().text === "[") {
					parser.consume();
					parser.consumeSpaces();
					colAlign = parser.fetch().text;
					if ("lcr".indexOf(colAlign) === -1) throw new ParseError("Expected l or c or r", parser.nextToken);
					parser.consume();
					parser.consumeSpaces();
					parser.expect("]");
					parser.consume();
					payload.cols = [{
						type: "align",
						align: colAlign
					}];
				}
			}
			var res = parseArray(context.parser, payload, dCellStyle(context.envName));
			var numCols = Math.max(0, ...res.body.map((row) => row.length));
			res.cols = new Array(numCols).fill({
				type: "align",
				align: colAlign
			});
			return delimiters ? {
				type: "leftright",
				mode: context.mode,
				body: [res],
				left: delimiters[0],
				right: delimiters[1],
				rightColor: void 0
			} : res;
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: ["smallmatrix"],
		props: { numArgs: 0 },
		handler(context) {
			var res = parseArray(context.parser, { arraystretch: .5 }, "script");
			res.colSeparationType = "small";
			return res;
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: ["subarray"],
		props: { numArgs: 1 },
		handler(context, args) {
			var cols = (checkSymbolNodeType(args[0]) ? [args[0]] : assertNodeType(args[0], "ordgroup").body).map(function(nde) {
				var ca = assertSymbolNodeType(nde).text;
				if ("lc".indexOf(ca) !== -1) return {
					type: "align",
					align: ca
				};
				throw new ParseError("Unknown column alignment: " + ca, nde);
			});
			if (cols.length > 1) throw new ParseError("{subarray} can contain only one column");
			var res = {
				cols,
				hskipBeforeAndAfter: false,
				arraystretch: .5
			};
			res = parseArray(context.parser, res, "script");
			if (res.body.length > 0 && res.body[0].length > 1) throw new ParseError("{subarray} can contain only one column");
			return res;
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: [
			"cases",
			"dcases",
			"rcases",
			"drcases"
		],
		props: { numArgs: 0 },
		handler(context) {
			var res = parseArray(context.parser, {
				arraystretch: 1.2,
				cols: [{
					type: "align",
					align: "l",
					pregap: 0,
					postgap: 1
				}, {
					type: "align",
					align: "l",
					pregap: 0,
					postgap: 0
				}]
			}, dCellStyle(context.envName));
			return {
				type: "leftright",
				mode: context.mode,
				body: [res],
				left: context.envName.indexOf("r") > -1 ? "." : "\\{",
				right: context.envName.indexOf("r") > -1 ? "\\}" : ".",
				rightColor: void 0
			};
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: [
			"align",
			"align*",
			"aligned",
			"split"
		],
		props: { numArgs: 0 },
		handler: alignedHandler,
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: [
			"gathered",
			"gather",
			"gather*"
		],
		props: { numArgs: 0 },
		handler(context) {
			if (["gather", "gather*"].includes(context.envName)) validateAmsEnvironmentContext(context);
			var res = {
				cols: [{
					type: "align",
					align: "c"
				}],
				addJot: true,
				colSeparationType: "gather",
				autoTag: getAutoTag(context.envName),
				emptySingleRow: true,
				leqno: context.parser.settings.leqno
			};
			return parseArray(context.parser, res, "display");
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: [
			"alignat",
			"alignat*",
			"alignedat"
		],
		props: { numArgs: 1 },
		handler: alignedHandler,
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: ["equation", "equation*"],
		props: { numArgs: 0 },
		handler(context) {
			validateAmsEnvironmentContext(context);
			var res = {
				autoTag: getAutoTag(context.envName),
				emptySingleRow: true,
				singleRow: true,
				maxNumCols: 1,
				leqno: context.parser.settings.leqno
			};
			return parseArray(context.parser, res, "display");
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineEnvironment({
		type: "array",
		names: ["CD"],
		props: { numArgs: 0 },
		handler(context) {
			validateAmsEnvironmentContext(context);
			return parseCD(context.parser);
		},
		htmlBuilder: htmlBuilder$6,
		mathmlBuilder: mathmlBuilder$5
	});
	defineMacro("\\nonumber", "\\gdef\\@eqnsw{0}");
	defineMacro("\\notag", "\\nonumber");
	defineFunction({
		type: "text",
		names: ["\\hline", "\\hdashline"],
		props: {
			numArgs: 0,
			allowedInText: true,
			allowedInMath: true
		},
		handler(context, args) {
			throw new ParseError(context.funcName + " valid only within array environment");
		}
	});
	environments = _environments;
	defineFunction({
		type: "environment",
		names: ["\\begin", "\\end"],
		props: {
			numArgs: 1,
			argTypes: ["text"]
		},
		handler(_ref, args) {
			var { parser, funcName } = _ref;
			var nameGroup = args[0];
			if (nameGroup.type !== "ordgroup") throw new ParseError("Invalid environment name", nameGroup);
			var envName = "";
			for (var i = 0; i < nameGroup.body.length; ++i) envName += assertNodeType(nameGroup.body[i], "textord").text;
			if (funcName === "\\begin") {
				if (!environments.hasOwnProperty(envName)) throw new ParseError("No such environment: " + envName, nameGroup);
				var env = environments[envName];
				var { args: _args, optArgs } = parser.parseArguments("\\begin{" + envName + "}", env);
				var context = {
					mode: parser.mode,
					envName,
					parser
				};
				var result = env.handler(context, _args, optArgs);
				parser.expect("\\end", false);
				var endNameToken = parser.nextToken;
				var end = assertNodeType(parser.parseFunction(), "environment");
				if (end.name !== envName) throw new ParseError("Mismatch: \\begin{" + envName + "} matched by \\end{" + end.name + "}", endNameToken);
				return result;
			}
			return {
				type: "environment",
				mode: parser.mode,
				name: envName,
				nameGroup
			};
		}
	});
	htmlBuilder$5 = (group, options) => {
		var font = group.font;
		var newOptions = options.withFont(font);
		return buildGroup$1(group.body, newOptions);
	};
	mathmlBuilder$4 = (group, options) => {
		var font = group.font;
		var newOptions = options.withFont(font);
		return buildGroup(group.body, newOptions);
	};
	fontAliases = {
		"\\Bbb": "\\mathbb",
		"\\bold": "\\mathbf",
		"\\frak": "\\mathfrak",
		"\\bm": "\\boldsymbol"
	};
	defineFunction({
		type: "font",
		names: [
			"\\mathrm",
			"\\mathit",
			"\\mathbf",
			"\\mathnormal",
			"\\mathsfit",
			"\\mathbb",
			"\\mathcal",
			"\\mathfrak",
			"\\mathscr",
			"\\mathsf",
			"\\mathtt",
			"\\Bbb",
			"\\bold",
			"\\frak"
		],
		props: {
			numArgs: 1,
			allowedInArgument: true
		},
		handler: (_ref, args) => {
			var { parser, funcName } = _ref;
			var body = normalizeArgument(args[0]);
			var func = funcName;
			if (func in fontAliases) func = fontAliases[func];
			return {
				type: "font",
				mode: parser.mode,
				font: func.slice(1),
				body
			};
		},
		htmlBuilder: htmlBuilder$5,
		mathmlBuilder: mathmlBuilder$4
	});
	defineFunction({
		type: "mclass",
		names: ["\\boldsymbol", "\\bm"],
		props: { numArgs: 1 },
		handler: (_ref2, args) => {
			var { parser } = _ref2;
			var body = args[0];
			var isCharacterBox = utils.isCharacterBox(body);
			return {
				type: "mclass",
				mode: parser.mode,
				mclass: binrelClass(body),
				body: [{
					type: "font",
					mode: parser.mode,
					font: "boldsymbol",
					body
				}],
				isCharacterBox
			};
		}
	});
	defineFunction({
		type: "font",
		names: [
			"\\rm",
			"\\sf",
			"\\tt",
			"\\bf",
			"\\it",
			"\\cal"
		],
		props: {
			numArgs: 0,
			allowedInText: true
		},
		handler: (_ref3, args) => {
			var { parser, funcName, breakOnTokenText } = _ref3;
			var { mode } = parser;
			var body = parser.parseExpression(true, breakOnTokenText);
			return {
				type: "font",
				mode,
				font: "math" + funcName.slice(1),
				body: {
					type: "ordgroup",
					mode: parser.mode,
					body
				}
			};
		},
		htmlBuilder: htmlBuilder$5,
		mathmlBuilder: mathmlBuilder$4
	});
	adjustStyle = (size, originalStyle) => {
		var style = originalStyle;
		if (size === "display") style = style.id >= Style$1.SCRIPT.id ? style.text() : Style$1.DISPLAY;
		else if (size === "text" && style.size === Style$1.DISPLAY.size) style = Style$1.TEXT;
		else if (size === "script") style = Style$1.SCRIPT;
		else if (size === "scriptscript") style = Style$1.SCRIPTSCRIPT;
		return style;
	};
	htmlBuilder$4 = (group, options) => {
		var style = adjustStyle(group.size, options.style);
		var nstyle = style.fracNum();
		var dstyle = style.fracDen();
		var newOptions = options.havingStyle(nstyle);
		var numerm = buildGroup$1(group.numer, newOptions, options);
		if (group.continued) {
			var hStrut = 8.5 / options.fontMetrics().ptPerEm;
			var dStrut = 3.5 / options.fontMetrics().ptPerEm;
			numerm.height = numerm.height < hStrut ? hStrut : numerm.height;
			numerm.depth = numerm.depth < dStrut ? dStrut : numerm.depth;
		}
		newOptions = options.havingStyle(dstyle);
		var denomm = buildGroup$1(group.denom, newOptions, options);
		var rule;
		var ruleWidth;
		var ruleSpacing;
		if (group.hasBarLine) {
			if (group.barSize) {
				ruleWidth = calculateSize(group.barSize, options);
				rule = buildCommon.makeLineSpan("frac-line", options, ruleWidth);
			} else rule = buildCommon.makeLineSpan("frac-line", options);
			ruleWidth = rule.height;
			ruleSpacing = rule.height;
		} else {
			rule = null;
			ruleWidth = 0;
			ruleSpacing = options.fontMetrics().defaultRuleThickness;
		}
		var numShift;
		var clearance;
		var denomShift;
		if (style.size === Style$1.DISPLAY.size || group.size === "display") {
			numShift = options.fontMetrics().num1;
			if (ruleWidth > 0) clearance = 3 * ruleSpacing;
			else clearance = 7 * ruleSpacing;
			denomShift = options.fontMetrics().denom1;
		} else {
			if (ruleWidth > 0) {
				numShift = options.fontMetrics().num2;
				clearance = ruleSpacing;
			} else {
				numShift = options.fontMetrics().num3;
				clearance = 3 * ruleSpacing;
			}
			denomShift = options.fontMetrics().denom2;
		}
		var frac;
		if (!rule) {
			var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
			if (candidateClearance < clearance) {
				numShift += .5 * (clearance - candidateClearance);
				denomShift += .5 * (clearance - candidateClearance);
			}
			frac = buildCommon.makeVList({
				positionType: "individualShift",
				children: [{
					type: "elem",
					elem: denomm,
					shift: denomShift
				}, {
					type: "elem",
					elem: numerm,
					shift: -numShift
				}]
			}, options);
		} else {
			var axisHeight = options.fontMetrics().axisHeight;
			if (numShift - numerm.depth - (axisHeight + .5 * ruleWidth) < clearance) numShift += clearance - (numShift - numerm.depth - (axisHeight + .5 * ruleWidth));
			if (axisHeight - .5 * ruleWidth - (denomm.height - denomShift) < clearance) denomShift += clearance - (axisHeight - .5 * ruleWidth - (denomm.height - denomShift));
			var midShift = -(axisHeight - .5 * ruleWidth);
			frac = buildCommon.makeVList({
				positionType: "individualShift",
				children: [
					{
						type: "elem",
						elem: denomm,
						shift: denomShift
					},
					{
						type: "elem",
						elem: rule,
						shift: midShift
					},
					{
						type: "elem",
						elem: numerm,
						shift: -numShift
					}
				]
			}, options);
		}
		newOptions = options.havingStyle(style);
		frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
		frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier;
		var delimSize;
		if (style.size === Style$1.DISPLAY.size) delimSize = options.fontMetrics().delim1;
		else if (style.size === Style$1.SCRIPTSCRIPT.size) delimSize = options.havingStyle(Style$1.SCRIPT).fontMetrics().delim2;
		else delimSize = options.fontMetrics().delim2;
		var leftDelim;
		var rightDelim;
		if (group.leftDelim == null) leftDelim = makeNullDelimiter(options, ["mopen"]);
		else leftDelim = delimiter.customSizedDelim(group.leftDelim, delimSize, true, options.havingStyle(style), group.mode, ["mopen"]);
		if (group.continued) rightDelim = buildCommon.makeSpan([]);
		else if (group.rightDelim == null) rightDelim = makeNullDelimiter(options, ["mclose"]);
		else rightDelim = delimiter.customSizedDelim(group.rightDelim, delimSize, true, options.havingStyle(style), group.mode, ["mclose"]);
		return buildCommon.makeSpan(["mord"].concat(newOptions.sizingClasses(options)), [
			leftDelim,
			buildCommon.makeSpan(["mfrac"], [frac]),
			rightDelim
		], options);
	};
	mathmlBuilder$3 = (group, options) => {
		var node = new mathMLTree.MathNode("mfrac", [buildGroup(group.numer, options), buildGroup(group.denom, options)]);
		if (!group.hasBarLine) node.setAttribute("linethickness", "0px");
		else if (group.barSize) {
			var ruleWidth = calculateSize(group.barSize, options);
			node.setAttribute("linethickness", makeEm(ruleWidth));
		}
		var style = adjustStyle(group.size, options.style);
		if (style.size !== options.style.size) {
			node = new mathMLTree.MathNode("mstyle", [node]);
			var isDisplay = style.size === Style$1.DISPLAY.size ? "true" : "false";
			node.setAttribute("displaystyle", isDisplay);
			node.setAttribute("scriptlevel", "0");
		}
		if (group.leftDelim != null || group.rightDelim != null) {
			var withDelims = [];
			if (group.leftDelim != null) {
				var leftOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.leftDelim.replace("\\", ""))]);
				leftOp.setAttribute("fence", "true");
				withDelims.push(leftOp);
			}
			withDelims.push(node);
			if (group.rightDelim != null) {
				var rightOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.rightDelim.replace("\\", ""))]);
				rightOp.setAttribute("fence", "true");
				withDelims.push(rightOp);
			}
			return makeRow(withDelims);
		}
		return node;
	};
	defineFunction({
		type: "genfrac",
		names: [
			"\\dfrac",
			"\\frac",
			"\\tfrac",
			"\\dbinom",
			"\\binom",
			"\\tbinom",
			"\\\\atopfrac",
			"\\\\bracefrac",
			"\\\\brackfrac"
		],
		props: {
			numArgs: 2,
			allowedInArgument: true
		},
		handler: (_ref, args) => {
			var { parser, funcName } = _ref;
			var numer = args[0];
			var denom = args[1];
			var hasBarLine;
			var leftDelim = null;
			var rightDelim = null;
			var size = "auto";
			switch (funcName) {
				case "\\dfrac":
				case "\\frac":
				case "\\tfrac":
					hasBarLine = true;
					break;
				case "\\\\atopfrac":
					hasBarLine = false;
					break;
				case "\\dbinom":
				case "\\binom":
				case "\\tbinom":
					hasBarLine = false;
					leftDelim = "(";
					rightDelim = ")";
					break;
				case "\\\\bracefrac":
					hasBarLine = false;
					leftDelim = "\\{";
					rightDelim = "\\}";
					break;
				case "\\\\brackfrac":
					hasBarLine = false;
					leftDelim = "[";
					rightDelim = "]";
					break;
				default: throw new Error("Unrecognized genfrac command");
			}
			switch (funcName) {
				case "\\dfrac":
				case "\\dbinom":
					size = "display";
					break;
				case "\\tfrac":
				case "\\tbinom":
					size = "text";
					break;
			}
			return {
				type: "genfrac",
				mode: parser.mode,
				continued: false,
				numer,
				denom,
				hasBarLine,
				leftDelim,
				rightDelim,
				size,
				barSize: null
			};
		},
		htmlBuilder: htmlBuilder$4,
		mathmlBuilder: mathmlBuilder$3
	});
	defineFunction({
		type: "genfrac",
		names: ["\\cfrac"],
		props: { numArgs: 2 },
		handler: (_ref2, args) => {
			var { parser, funcName } = _ref2;
			var numer = args[0];
			var denom = args[1];
			return {
				type: "genfrac",
				mode: parser.mode,
				continued: true,
				numer,
				denom,
				hasBarLine: true,
				leftDelim: null,
				rightDelim: null,
				size: "display",
				barSize: null
			};
		}
	});
	defineFunction({
		type: "infix",
		names: [
			"\\over",
			"\\choose",
			"\\atop",
			"\\brace",
			"\\brack"
		],
		props: {
			numArgs: 0,
			infix: true
		},
		handler(_ref3) {
			var { parser, funcName, token } = _ref3;
			var replaceWith;
			switch (funcName) {
				case "\\over":
					replaceWith = "\\frac";
					break;
				case "\\choose":
					replaceWith = "\\binom";
					break;
				case "\\atop":
					replaceWith = "\\\\atopfrac";
					break;
				case "\\brace":
					replaceWith = "\\\\bracefrac";
					break;
				case "\\brack":
					replaceWith = "\\\\brackfrac";
					break;
				default: throw new Error("Unrecognized infix genfrac command");
			}
			return {
				type: "infix",
				mode: parser.mode,
				replaceWith,
				token
			};
		}
	});
	stylArray = [
		"display",
		"text",
		"script",
		"scriptscript"
	];
	delimFromValue = function delimFromValue(delimString) {
		var delim = null;
		if (delimString.length > 0) {
			delim = delimString;
			delim = delim === "." ? null : delim;
		}
		return delim;
	};
	defineFunction({
		type: "genfrac",
		names: ["\\genfrac"],
		props: {
			numArgs: 6,
			allowedInArgument: true,
			argTypes: [
				"math",
				"math",
				"size",
				"text",
				"math",
				"math"
			]
		},
		handler(_ref4, args) {
			var { parser } = _ref4;
			var numer = args[4];
			var denom = args[5];
			var leftNode = normalizeArgument(args[0]);
			var leftDelim = leftNode.type === "atom" && leftNode.family === "open" ? delimFromValue(leftNode.text) : null;
			var rightNode = normalizeArgument(args[1]);
			var rightDelim = rightNode.type === "atom" && rightNode.family === "close" ? delimFromValue(rightNode.text) : null;
			var barNode = assertNodeType(args[2], "size");
			var hasBarLine;
			var barSize = null;
			if (barNode.isBlank) hasBarLine = true;
			else {
				barSize = barNode.value;
				hasBarLine = barSize.number > 0;
			}
			var size = "auto";
			var styl = args[3];
			if (styl.type === "ordgroup") {
				if (styl.body.length > 0) {
					var textOrd = assertNodeType(styl.body[0], "textord");
					size = stylArray[Number(textOrd.text)];
				}
			} else {
				styl = assertNodeType(styl, "textord");
				size = stylArray[Number(styl.text)];
			}
			return {
				type: "genfrac",
				mode: parser.mode,
				numer,
				denom,
				continued: false,
				hasBarLine,
				barSize,
				leftDelim,
				rightDelim,
				size
			};
		},
		htmlBuilder: htmlBuilder$4,
		mathmlBuilder: mathmlBuilder$3
	});
	defineFunction({
		type: "infix",
		names: ["\\above"],
		props: {
			numArgs: 1,
			argTypes: ["size"],
			infix: true
		},
		handler(_ref5, args) {
			var { parser, funcName, token } = _ref5;
			return {
				type: "infix",
				mode: parser.mode,
				replaceWith: "\\\\abovefrac",
				size: assertNodeType(args[0], "size").value,
				token
			};
		}
	});
	defineFunction({
		type: "genfrac",
		names: ["\\\\abovefrac"],
		props: {
			numArgs: 3,
			argTypes: [
				"math",
				"size",
				"math"
			]
		},
		handler: (_ref6, args) => {
			var { parser, funcName } = _ref6;
			var numer = args[0];
			var barSize = assert(assertNodeType(args[1], "infix").size);
			var denom = args[2];
			var hasBarLine = barSize.number > 0;
			return {
				type: "genfrac",
				mode: parser.mode,
				numer,
				denom,
				continued: false,
				hasBarLine,
				barSize,
				leftDelim: null,
				rightDelim: null,
				size: "auto"
			};
		},
		htmlBuilder: htmlBuilder$4,
		mathmlBuilder: mathmlBuilder$3
	});
	htmlBuilder$3 = (grp, options) => {
		var style = options.style;
		var supSubGroup;
		var group;
		if (grp.type === "supsub") {
			supSubGroup = grp.sup ? buildGroup$1(grp.sup, options.havingStyle(style.sup()), options) : buildGroup$1(grp.sub, options.havingStyle(style.sub()), options);
			group = assertNodeType(grp.base, "horizBrace");
		} else group = assertNodeType(grp, "horizBrace");
		var body = buildGroup$1(group.base, options.havingBaseStyle(Style$1.DISPLAY));
		var braceBody = stretchy.svgSpan(group, options);
		var vlist;
		if (group.isOver) {
			vlist = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [
					{
						type: "elem",
						elem: body
					},
					{
						type: "kern",
						size: .1
					},
					{
						type: "elem",
						elem: braceBody
					}
				]
			}, options);
			vlist.children[0].children[0].children[1].classes.push("svg-align");
		} else {
			vlist = buildCommon.makeVList({
				positionType: "bottom",
				positionData: body.depth + .1 + braceBody.height,
				children: [
					{
						type: "elem",
						elem: braceBody
					},
					{
						type: "kern",
						size: .1
					},
					{
						type: "elem",
						elem: body
					}
				]
			}, options);
			vlist.children[0].children[0].children[0].classes.push("svg-align");
		}
		if (supSubGroup) {
			var vSpan = buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
			if (group.isOver) vlist = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [
					{
						type: "elem",
						elem: vSpan
					},
					{
						type: "kern",
						size: .2
					},
					{
						type: "elem",
						elem: supSubGroup
					}
				]
			}, options);
			else vlist = buildCommon.makeVList({
				positionType: "bottom",
				positionData: vSpan.depth + .2 + supSubGroup.height + supSubGroup.depth,
				children: [
					{
						type: "elem",
						elem: supSubGroup
					},
					{
						type: "kern",
						size: .2
					},
					{
						type: "elem",
						elem: vSpan
					}
				]
			}, options);
		}
		return buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
	};
	mathmlBuilder$2 = (group, options) => {
		var accentNode = stretchy.mathMLnode(group.label);
		return new mathMLTree.MathNode(group.isOver ? "mover" : "munder", [buildGroup(group.base, options), accentNode]);
	};
	defineFunction({
		type: "horizBrace",
		names: ["\\overbrace", "\\underbrace"],
		props: { numArgs: 1 },
		handler(_ref, args) {
			var { parser, funcName } = _ref;
			return {
				type: "horizBrace",
				mode: parser.mode,
				label: funcName,
				isOver: /^\\over/.test(funcName),
				base: args[0]
			};
		},
		htmlBuilder: htmlBuilder$3,
		mathmlBuilder: mathmlBuilder$2
	});
	defineFunction({
		type: "href",
		names: ["\\href"],
		props: {
			numArgs: 2,
			argTypes: ["url", "original"],
			allowedInText: true
		},
		handler: (_ref, args) => {
			var { parser } = _ref;
			var body = args[1];
			var href = assertNodeType(args[0], "url").url;
			if (!parser.settings.isTrusted({
				command: "\\href",
				url: href
			})) return parser.formatUnsupportedCmd("\\href");
			return {
				type: "href",
				mode: parser.mode,
				href,
				body: ordargument(body)
			};
		},
		htmlBuilder: (group, options) => {
			var elements = buildExpression$1(group.body, options, false);
			return buildCommon.makeAnchor(group.href, [], elements, options);
		},
		mathmlBuilder: (group, options) => {
			var math = buildExpressionRow(group.body, options);
			if (!(math instanceof MathNode)) math = new MathNode("mrow", [math]);
			math.setAttribute("href", group.href);
			return math;
		}
	});
	defineFunction({
		type: "href",
		names: ["\\url"],
		props: {
			numArgs: 1,
			argTypes: ["url"],
			allowedInText: true
		},
		handler: (_ref2, args) => {
			var { parser } = _ref2;
			var href = assertNodeType(args[0], "url").url;
			if (!parser.settings.isTrusted({
				command: "\\url",
				url: href
			})) return parser.formatUnsupportedCmd("\\url");
			var chars = [];
			for (var i = 0; i < href.length; i++) {
				var c = href[i];
				if (c === "~") c = "\\textasciitilde";
				chars.push({
					type: "textord",
					mode: "text",
					text: c
				});
			}
			var body = {
				type: "text",
				mode: parser.mode,
				font: "\\texttt",
				body: chars
			};
			return {
				type: "href",
				mode: parser.mode,
				href,
				body: ordargument(body)
			};
		}
	});
	defineFunction({
		type: "hbox",
		names: ["\\hbox"],
		props: {
			numArgs: 1,
			argTypes: ["text"],
			allowedInText: true,
			primitive: true
		},
		handler(_ref, args) {
			var { parser } = _ref;
			return {
				type: "hbox",
				mode: parser.mode,
				body: ordargument(args[0])
			};
		},
		htmlBuilder(group, options) {
			var elements = buildExpression$1(group.body, options, false);
			return buildCommon.makeFragment(elements);
		},
		mathmlBuilder(group, options) {
			return new mathMLTree.MathNode("mrow", buildExpression(group.body, options));
		}
	});
	defineFunction({
		type: "html",
		names: [
			"\\htmlClass",
			"\\htmlId",
			"\\htmlStyle",
			"\\htmlData"
		],
		props: {
			numArgs: 2,
			argTypes: ["raw", "original"],
			allowedInText: true
		},
		handler: (_ref, args) => {
			var { parser, funcName, token } = _ref;
			var value = assertNodeType(args[0], "raw").string;
			var body = args[1];
			if (parser.settings.strict) parser.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
			var trustContext;
			var attributes = {};
			switch (funcName) {
				case "\\htmlClass":
					attributes.class = value;
					trustContext = {
						command: "\\htmlClass",
						class: value
					};
					break;
				case "\\htmlId":
					attributes.id = value;
					trustContext = {
						command: "\\htmlId",
						id: value
					};
					break;
				case "\\htmlStyle":
					attributes.style = value;
					trustContext = {
						command: "\\htmlStyle",
						style: value
					};
					break;
				case "\\htmlData":
					var data = value.split(",");
					for (var i = 0; i < data.length; i++) {
						var keyVal = data[i].split("=");
						if (keyVal.length !== 2) throw new ParseError("Error parsing key-value for \\htmlData");
						attributes["data-" + keyVal[0].trim()] = keyVal[1].trim();
					}
					trustContext = {
						command: "\\htmlData",
						attributes
					};
					break;
				default: throw new Error("Unrecognized html command");
			}
			if (!parser.settings.isTrusted(trustContext)) return parser.formatUnsupportedCmd(funcName);
			return {
				type: "html",
				mode: parser.mode,
				attributes,
				body: ordargument(body)
			};
		},
		htmlBuilder: (group, options) => {
			var elements = buildExpression$1(group.body, options, false);
			var classes = ["enclosing"];
			if (group.attributes.class) classes.push(...group.attributes.class.trim().split(/\s+/));
			var span = buildCommon.makeSpan(classes, elements, options);
			for (var attr in group.attributes) if (attr !== "class" && group.attributes.hasOwnProperty(attr)) span.setAttribute(attr, group.attributes[attr]);
			return span;
		},
		mathmlBuilder: (group, options) => {
			return buildExpressionRow(group.body, options);
		}
	});
	defineFunction({
		type: "htmlmathml",
		names: ["\\html@mathml"],
		props: {
			numArgs: 2,
			allowedInText: true
		},
		handler: (_ref, args) => {
			var { parser } = _ref;
			return {
				type: "htmlmathml",
				mode: parser.mode,
				html: ordargument(args[0]),
				mathml: ordargument(args[1])
			};
		},
		htmlBuilder: (group, options) => {
			var elements = buildExpression$1(group.html, options, false);
			return buildCommon.makeFragment(elements);
		},
		mathmlBuilder: (group, options) => {
			return buildExpressionRow(group.mathml, options);
		}
	});
	sizeData = function sizeData(str) {
		if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(str)) return {
			number: +str,
			unit: "bp"
		};
		else {
			var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(str);
			if (!match) throw new ParseError("Invalid size: '" + str + "' in \\includegraphics");
			var data = {
				number: +(match[1] + match[2]),
				unit: match[3]
			};
			if (!validUnit(data)) throw new ParseError("Invalid unit: '" + data.unit + "' in \\includegraphics.");
			return data;
		}
	};
	defineFunction({
		type: "includegraphics",
		names: ["\\includegraphics"],
		props: {
			numArgs: 1,
			numOptionalArgs: 1,
			argTypes: ["raw", "url"],
			allowedInText: false
		},
		handler: (_ref, args, optArgs) => {
			var { parser } = _ref;
			var width = {
				number: 0,
				unit: "em"
			};
			var height = {
				number: .9,
				unit: "em"
			};
			var totalheight = {
				number: 0,
				unit: "em"
			};
			var alt = "";
			if (optArgs[0]) {
				var attributes = assertNodeType(optArgs[0], "raw").string.split(",");
				for (var i = 0; i < attributes.length; i++) {
					var keyVal = attributes[i].split("=");
					if (keyVal.length === 2) {
						var str = keyVal[1].trim();
						switch (keyVal[0].trim()) {
							case "alt":
								alt = str;
								break;
							case "width":
								width = sizeData(str);
								break;
							case "height":
								height = sizeData(str);
								break;
							case "totalheight":
								totalheight = sizeData(str);
								break;
							default: throw new ParseError("Invalid key: '" + keyVal[0] + "' in \\includegraphics.");
						}
					}
				}
			}
			var src = assertNodeType(args[0], "url").url;
			if (alt === "") {
				alt = src;
				alt = alt.replace(/^.*[\\/]/, "");
				alt = alt.substring(0, alt.lastIndexOf("."));
			}
			if (!parser.settings.isTrusted({
				command: "\\includegraphics",
				url: src
			})) return parser.formatUnsupportedCmd("\\includegraphics");
			return {
				type: "includegraphics",
				mode: parser.mode,
				alt,
				width,
				height,
				totalheight,
				src
			};
		},
		htmlBuilder: (group, options) => {
			var height = calculateSize(group.height, options);
			var depth = 0;
			if (group.totalheight.number > 0) depth = calculateSize(group.totalheight, options) - height;
			var width = 0;
			if (group.width.number > 0) width = calculateSize(group.width, options);
			var style = { height: makeEm(height + depth) };
			if (width > 0) style.width = makeEm(width);
			if (depth > 0) style.verticalAlign = makeEm(-depth);
			var node = new Img(group.src, group.alt, style);
			node.height = height;
			node.depth = depth;
			return node;
		},
		mathmlBuilder: (group, options) => {
			var node = new mathMLTree.MathNode("mglyph", []);
			node.setAttribute("alt", group.alt);
			var height = calculateSize(group.height, options);
			var depth = 0;
			if (group.totalheight.number > 0) {
				depth = calculateSize(group.totalheight, options) - height;
				node.setAttribute("valign", makeEm(-depth));
			}
			node.setAttribute("height", makeEm(height + depth));
			if (group.width.number > 0) {
				var width = calculateSize(group.width, options);
				node.setAttribute("width", makeEm(width));
			}
			node.setAttribute("src", group.src);
			return node;
		}
	});
	defineFunction({
		type: "kern",
		names: [
			"\\kern",
			"\\mkern",
			"\\hskip",
			"\\mskip"
		],
		props: {
			numArgs: 1,
			argTypes: ["size"],
			primitive: true,
			allowedInText: true
		},
		handler(_ref, args) {
			var { parser, funcName } = _ref;
			var size = assertNodeType(args[0], "size");
			if (parser.settings.strict) {
				var mathFunction = funcName[1] === "m";
				var muUnit = size.value.unit === "mu";
				if (mathFunction) {
					if (!muUnit) parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " supports only mu units, " + ("not " + size.value.unit + " units"));
					if (parser.mode !== "math") parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " works only in math mode");
				} else if (muUnit) parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " doesn't support mu units");
			}
			return {
				type: "kern",
				mode: parser.mode,
				dimension: size.value
			};
		},
		htmlBuilder(group, options) {
			return buildCommon.makeGlue(group.dimension, options);
		},
		mathmlBuilder(group, options) {
			var dimension = calculateSize(group.dimension, options);
			return new mathMLTree.SpaceNode(dimension);
		}
	});
	defineFunction({
		type: "lap",
		names: [
			"\\mathllap",
			"\\mathrlap",
			"\\mathclap"
		],
		props: {
			numArgs: 1,
			allowedInText: true
		},
		handler: (_ref, args) => {
			var { parser, funcName } = _ref;
			var body = args[0];
			return {
				type: "lap",
				mode: parser.mode,
				alignment: funcName.slice(5),
				body
			};
		},
		htmlBuilder: (group, options) => {
			var inner;
			if (group.alignment === "clap") {
				inner = buildCommon.makeSpan([], [buildGroup$1(group.body, options)]);
				inner = buildCommon.makeSpan(["inner"], [inner], options);
			} else inner = buildCommon.makeSpan(["inner"], [buildGroup$1(group.body, options)]);
			var fix = buildCommon.makeSpan(["fix"], []);
			var node = buildCommon.makeSpan([group.alignment], [inner, fix], options);
			var strut = buildCommon.makeSpan(["strut"]);
			strut.style.height = makeEm(node.height + node.depth);
			if (node.depth) strut.style.verticalAlign = makeEm(-node.depth);
			node.children.unshift(strut);
			node = buildCommon.makeSpan(["thinbox"], [node], options);
			return buildCommon.makeSpan(["mord", "vbox"], [node], options);
		},
		mathmlBuilder: (group, options) => {
			var node = new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)]);
			if (group.alignment !== "rlap") {
				var offset = group.alignment === "llap" ? "-1" : "-0.5";
				node.setAttribute("lspace", offset + "width");
			}
			node.setAttribute("width", "0px");
			return node;
		}
	});
	defineFunction({
		type: "styling",
		names: ["\\(", "$"],
		props: {
			numArgs: 0,
			allowedInText: true,
			allowedInMath: false
		},
		handler(_ref, args) {
			var { funcName, parser } = _ref;
			var outerMode = parser.mode;
			parser.switchMode("math");
			var close = funcName === "\\(" ? "\\)" : "$";
			var body = parser.parseExpression(false, close);
			parser.expect(close);
			parser.switchMode(outerMode);
			return {
				type: "styling",
				mode: parser.mode,
				style: "text",
				body
			};
		}
	});
	defineFunction({
		type: "text",
		names: ["\\)", "\\]"],
		props: {
			numArgs: 0,
			allowedInText: true,
			allowedInMath: false
		},
		handler(context, args) {
			throw new ParseError("Mismatched " + context.funcName);
		}
	});
	chooseMathStyle = (group, options) => {
		switch (options.style.size) {
			case Style$1.DISPLAY.size: return group.display;
			case Style$1.TEXT.size: return group.text;
			case Style$1.SCRIPT.size: return group.script;
			case Style$1.SCRIPTSCRIPT.size: return group.scriptscript;
			default: return group.text;
		}
	};
	defineFunction({
		type: "mathchoice",
		names: ["\\mathchoice"],
		props: {
			numArgs: 4,
			primitive: true
		},
		handler: (_ref, args) => {
			var { parser } = _ref;
			return {
				type: "mathchoice",
				mode: parser.mode,
				display: ordargument(args[0]),
				text: ordargument(args[1]),
				script: ordargument(args[2]),
				scriptscript: ordargument(args[3])
			};
		},
		htmlBuilder: (group, options) => {
			var elements = buildExpression$1(chooseMathStyle(group, options), options, false);
			return buildCommon.makeFragment(elements);
		},
		mathmlBuilder: (group, options) => {
			return buildExpressionRow(chooseMathStyle(group, options), options);
		}
	});
	assembleSupSub = (base, supGroup, subGroup, options, style, slant, baseShift) => {
		base = buildCommon.makeSpan([], [base]);
		var subIsSingleCharacter = subGroup && utils.isCharacterBox(subGroup);
		var sub;
		var sup;
		if (supGroup) {
			var elem = buildGroup$1(supGroup, options.havingStyle(style.sup()), options);
			sup = {
				elem,
				kern: Math.max(options.fontMetrics().bigOpSpacing1, options.fontMetrics().bigOpSpacing3 - elem.depth)
			};
		}
		if (subGroup) {
			var _elem = buildGroup$1(subGroup, options.havingStyle(style.sub()), options);
			sub = {
				elem: _elem,
				kern: Math.max(options.fontMetrics().bigOpSpacing2, options.fontMetrics().bigOpSpacing4 - _elem.height)
			};
		}
		var finalGroup;
		if (sup && sub) {
			var bottom = options.fontMetrics().bigOpSpacing5 + sub.elem.height + sub.elem.depth + sub.kern + base.depth + baseShift;
			finalGroup = buildCommon.makeVList({
				positionType: "bottom",
				positionData: bottom,
				children: [
					{
						type: "kern",
						size: options.fontMetrics().bigOpSpacing5
					},
					{
						type: "elem",
						elem: sub.elem,
						marginLeft: makeEm(-slant)
					},
					{
						type: "kern",
						size: sub.kern
					},
					{
						type: "elem",
						elem: base
					},
					{
						type: "kern",
						size: sup.kern
					},
					{
						type: "elem",
						elem: sup.elem,
						marginLeft: makeEm(slant)
					},
					{
						type: "kern",
						size: options.fontMetrics().bigOpSpacing5
					}
				]
			}, options);
		} else if (sub) {
			var top = base.height - baseShift;
			finalGroup = buildCommon.makeVList({
				positionType: "top",
				positionData: top,
				children: [
					{
						type: "kern",
						size: options.fontMetrics().bigOpSpacing5
					},
					{
						type: "elem",
						elem: sub.elem,
						marginLeft: makeEm(-slant)
					},
					{
						type: "kern",
						size: sub.kern
					},
					{
						type: "elem",
						elem: base
					}
				]
			}, options);
		} else if (sup) {
			var _bottom = base.depth + baseShift;
			finalGroup = buildCommon.makeVList({
				positionType: "bottom",
				positionData: _bottom,
				children: [
					{
						type: "elem",
						elem: base
					},
					{
						type: "kern",
						size: sup.kern
					},
					{
						type: "elem",
						elem: sup.elem,
						marginLeft: makeEm(slant)
					},
					{
						type: "kern",
						size: options.fontMetrics().bigOpSpacing5
					}
				]
			}, options);
		} else return base;
		var parts = [finalGroup];
		if (sub && slant !== 0 && !subIsSingleCharacter) {
			var spacer = buildCommon.makeSpan(["mspace"], [], options);
			spacer.style.marginRight = makeEm(slant);
			parts.unshift(spacer);
		}
		return buildCommon.makeSpan(["mop", "op-limits"], parts, options);
	};
	noSuccessor = ["\\smallint"];
	htmlBuilder$2 = (grp, options) => {
		var supGroup;
		var subGroup;
		var hasLimits = false;
		var group;
		if (grp.type === "supsub") {
			supGroup = grp.sup;
			subGroup = grp.sub;
			group = assertNodeType(grp.base, "op");
			hasLimits = true;
		} else group = assertNodeType(grp, "op");
		var style = options.style;
		var large = false;
		if (style.size === Style$1.DISPLAY.size && group.symbol && !noSuccessor.includes(group.name)) large = true;
		var base;
		if (group.symbol) {
			var fontName = large ? "Size2-Regular" : "Size1-Regular";
			var stash = "";
			if (group.name === "\\oiint" || group.name === "\\oiiint") {
				stash = group.name.slice(1);
				group.name = stash === "oiint" ? "\\iint" : "\\iiint";
			}
			base = buildCommon.makeSymbol(group.name, fontName, "math", options, [
				"mop",
				"op-symbol",
				large ? "large-op" : "small-op"
			]);
			if (stash.length > 0) {
				var italic = base.italic;
				var oval = buildCommon.staticSvg(stash + "Size" + (large ? "2" : "1"), options);
				base = buildCommon.makeVList({
					positionType: "individualShift",
					children: [{
						type: "elem",
						elem: base,
						shift: 0
					}, {
						type: "elem",
						elem: oval,
						shift: large ? .08 : 0
					}]
				}, options);
				group.name = "\\" + stash;
				base.classes.unshift("mop");
				base.italic = italic;
			}
		} else if (group.body) {
			var inner = buildExpression$1(group.body, options, true);
			if (inner.length === 1 && inner[0] instanceof SymbolNode) {
				base = inner[0];
				base.classes[0] = "mop";
			} else base = buildCommon.makeSpan(["mop"], inner, options);
		} else {
			var output = [];
			for (var i = 1; i < group.name.length; i++) output.push(buildCommon.mathsym(group.name[i], group.mode, options));
			base = buildCommon.makeSpan(["mop"], output, options);
		}
		var baseShift = 0;
		var slant = 0;
		if ((base instanceof SymbolNode || group.name === "\\oiint" || group.name === "\\oiiint") && !group.suppressBaseShift) {
			baseShift = (base.height - base.depth) / 2 - options.fontMetrics().axisHeight;
			slant = base.italic;
		}
		if (hasLimits) return assembleSupSub(base, supGroup, subGroup, options, style, slant, baseShift);
		else {
			if (baseShift) {
				base.style.position = "relative";
				base.style.top = makeEm(baseShift);
			}
			return base;
		}
	};
	mathmlBuilder$1 = (group, options) => {
		var node;
		if (group.symbol) {
			node = new MathNode("mo", [makeText(group.name, group.mode)]);
			if (noSuccessor.includes(group.name)) node.setAttribute("largeop", "false");
		} else if (group.body) node = new MathNode("mo", buildExpression(group.body, options));
		else {
			node = new MathNode("mi", [new TextNode(group.name.slice(1))]);
			var operator = new MathNode("mo", [makeText("⁡", "text")]);
			if (group.parentIsSupSub) node = new MathNode("mrow", [node, operator]);
			else node = newDocumentFragment([node, operator]);
		}
		return node;
	};
	singleCharBigOps = {
		"∏": "\\prod",
		"∐": "\\coprod",
		"∑": "\\sum",
		"⋀": "\\bigwedge",
		"⋁": "\\bigvee",
		"⋂": "\\bigcap",
		"⋃": "\\bigcup",
		"⨀": "\\bigodot",
		"⨁": "\\bigoplus",
		"⨂": "\\bigotimes",
		"⨄": "\\biguplus",
		"⨆": "\\bigsqcup"
	};
	defineFunction({
		type: "op",
		names: [
			"\\coprod",
			"\\bigvee",
			"\\bigwedge",
			"\\biguplus",
			"\\bigcap",
			"\\bigcup",
			"\\intop",
			"\\prod",
			"\\sum",
			"\\bigotimes",
			"\\bigoplus",
			"\\bigodot",
			"\\bigsqcup",
			"\\smallint",
			"∏",
			"∐",
			"∑",
			"⋀",
			"⋁",
			"⋂",
			"⋃",
			"⨀",
			"⨁",
			"⨂",
			"⨄",
			"⨆"
		],
		props: { numArgs: 0 },
		handler: (_ref, args) => {
			var { parser, funcName } = _ref;
			var fName = funcName;
			if (fName.length === 1) fName = singleCharBigOps[fName];
			return {
				type: "op",
				mode: parser.mode,
				limits: true,
				parentIsSupSub: false,
				symbol: true,
				name: fName
			};
		},
		htmlBuilder: htmlBuilder$2,
		mathmlBuilder: mathmlBuilder$1
	});
	defineFunction({
		type: "op",
		names: ["\\mathop"],
		props: {
			numArgs: 1,
			primitive: true
		},
		handler: (_ref2, args) => {
			var { parser } = _ref2;
			var body = args[0];
			return {
				type: "op",
				mode: parser.mode,
				limits: false,
				parentIsSupSub: false,
				symbol: false,
				body: ordargument(body)
			};
		},
		htmlBuilder: htmlBuilder$2,
		mathmlBuilder: mathmlBuilder$1
	});
	singleCharIntegrals = {
		"∫": "\\int",
		"∬": "\\iint",
		"∭": "\\iiint",
		"∮": "\\oint",
		"∯": "\\oiint",
		"∰": "\\oiiint"
	};
	defineFunction({
		type: "op",
		names: [
			"\\arcsin",
			"\\arccos",
			"\\arctan",
			"\\arctg",
			"\\arcctg",
			"\\arg",
			"\\ch",
			"\\cos",
			"\\cosec",
			"\\cosh",
			"\\cot",
			"\\cotg",
			"\\coth",
			"\\csc",
			"\\ctg",
			"\\cth",
			"\\deg",
			"\\dim",
			"\\exp",
			"\\hom",
			"\\ker",
			"\\lg",
			"\\ln",
			"\\log",
			"\\sec",
			"\\sin",
			"\\sinh",
			"\\sh",
			"\\tan",
			"\\tanh",
			"\\tg",
			"\\th"
		],
		props: { numArgs: 0 },
		handler(_ref3) {
			var { parser, funcName } = _ref3;
			return {
				type: "op",
				mode: parser.mode,
				limits: false,
				parentIsSupSub: false,
				symbol: false,
				name: funcName
			};
		},
		htmlBuilder: htmlBuilder$2,
		mathmlBuilder: mathmlBuilder$1
	});
	defineFunction({
		type: "op",
		names: [
			"\\det",
			"\\gcd",
			"\\inf",
			"\\lim",
			"\\max",
			"\\min",
			"\\Pr",
			"\\sup"
		],
		props: { numArgs: 0 },
		handler(_ref4) {
			var { parser, funcName } = _ref4;
			return {
				type: "op",
				mode: parser.mode,
				limits: true,
				parentIsSupSub: false,
				symbol: false,
				name: funcName
			};
		},
		htmlBuilder: htmlBuilder$2,
		mathmlBuilder: mathmlBuilder$1
	});
	defineFunction({
		type: "op",
		names: [
			"\\int",
			"\\iint",
			"\\iiint",
			"\\oint",
			"\\oiint",
			"\\oiiint",
			"∫",
			"∬",
			"∭",
			"∮",
			"∯",
			"∰"
		],
		props: { numArgs: 0 },
		handler(_ref5) {
			var { parser, funcName } = _ref5;
			var fName = funcName;
			if (fName.length === 1) fName = singleCharIntegrals[fName];
			return {
				type: "op",
				mode: parser.mode,
				limits: false,
				parentIsSupSub: false,
				symbol: true,
				name: fName
			};
		},
		htmlBuilder: htmlBuilder$2,
		mathmlBuilder: mathmlBuilder$1
	});
	htmlBuilder$1 = (grp, options) => {
		var supGroup;
		var subGroup;
		var hasLimits = false;
		var group;
		if (grp.type === "supsub") {
			supGroup = grp.sup;
			subGroup = grp.sub;
			group = assertNodeType(grp.base, "operatorname");
			hasLimits = true;
		} else group = assertNodeType(grp, "operatorname");
		var base;
		if (group.body.length > 0) {
			var expression = buildExpression$1(group.body.map((child) => {
				var childText = child.text;
				if (typeof childText === "string") return {
					type: "textord",
					mode: child.mode,
					text: childText
				};
				else return child;
			}), options.withFont("mathrm"), true);
			for (var i = 0; i < expression.length; i++) {
				var child = expression[i];
				if (child instanceof SymbolNode) child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
			}
			base = buildCommon.makeSpan(["mop"], expression, options);
		} else base = buildCommon.makeSpan(["mop"], [], options);
		if (hasLimits) return assembleSupSub(base, supGroup, subGroup, options, options.style, 0, 0);
		else return base;
	};
	mathmlBuilder = (group, options) => {
		var expression = buildExpression(group.body, options.withFont("mathrm"));
		var isAllString = true;
		for (var i = 0; i < expression.length; i++) {
			var node = expression[i];
			if (node instanceof mathMLTree.SpaceNode);
			else if (node instanceof mathMLTree.MathNode) switch (node.type) {
				case "mi":
				case "mn":
				case "ms":
				case "mspace":
				case "mtext": break;
				case "mo":
					var child = node.children[0];
					if (node.children.length === 1 && child instanceof mathMLTree.TextNode) child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
					else isAllString = false;
					break;
				default: isAllString = false;
			}
			else isAllString = false;
		}
		if (isAllString) {
			var word = expression.map((node) => node.toText()).join("");
			expression = [new mathMLTree.TextNode(word)];
		}
		var identifier = new mathMLTree.MathNode("mi", expression);
		identifier.setAttribute("mathvariant", "normal");
		var operator = new mathMLTree.MathNode("mo", [makeText("⁡", "text")]);
		if (group.parentIsSupSub) return new mathMLTree.MathNode("mrow", [identifier, operator]);
		else return mathMLTree.newDocumentFragment([identifier, operator]);
	};
	defineFunction({
		type: "operatorname",
		names: ["\\operatorname@", "\\operatornamewithlimits"],
		props: { numArgs: 1 },
		handler: (_ref, args) => {
			var { parser, funcName } = _ref;
			var body = args[0];
			return {
				type: "operatorname",
				mode: parser.mode,
				body: ordargument(body),
				alwaysHandleSupSub: funcName === "\\operatornamewithlimits",
				limits: false,
				parentIsSupSub: false
			};
		},
		htmlBuilder: htmlBuilder$1,
		mathmlBuilder
	});
	defineMacro("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
	defineFunctionBuilders({
		type: "ordgroup",
		htmlBuilder(group, options) {
			if (group.semisimple) return buildCommon.makeFragment(buildExpression$1(group.body, options, false));
			return buildCommon.makeSpan(["mord"], buildExpression$1(group.body, options, true), options);
		},
		mathmlBuilder(group, options) {
			return buildExpressionRow(group.body, options, true);
		}
	});
	defineFunction({
		type: "overline",
		names: ["\\overline"],
		props: { numArgs: 1 },
		handler(_ref, args) {
			var { parser } = _ref;
			var body = args[0];
			return {
				type: "overline",
				mode: parser.mode,
				body
			};
		},
		htmlBuilder(group, options) {
			var innerGroup = buildGroup$1(group.body, options.havingCrampedStyle());
			var line = buildCommon.makeLineSpan("overline-line", options);
			var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
			var vlist = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [
					{
						type: "elem",
						elem: innerGroup
					},
					{
						type: "kern",
						size: 3 * defaultRuleThickness
					},
					{
						type: "elem",
						elem: line
					},
					{
						type: "kern",
						size: defaultRuleThickness
					}
				]
			}, options);
			return buildCommon.makeSpan(["mord", "overline"], [vlist], options);
		},
		mathmlBuilder(group, options) {
			var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("‾")]);
			operator.setAttribute("stretchy", "true");
			var node = new mathMLTree.MathNode("mover", [buildGroup(group.body, options), operator]);
			node.setAttribute("accent", "true");
			return node;
		}
	});
	defineFunction({
		type: "phantom",
		names: ["\\phantom"],
		props: {
			numArgs: 1,
			allowedInText: true
		},
		handler: (_ref, args) => {
			var { parser } = _ref;
			var body = args[0];
			return {
				type: "phantom",
				mode: parser.mode,
				body: ordargument(body)
			};
		},
		htmlBuilder: (group, options) => {
			var elements = buildExpression$1(group.body, options.withPhantom(), false);
			return buildCommon.makeFragment(elements);
		},
		mathmlBuilder: (group, options) => {
			var inner = buildExpression(group.body, options);
			return new mathMLTree.MathNode("mphantom", inner);
		}
	});
	defineFunction({
		type: "hphantom",
		names: ["\\hphantom"],
		props: {
			numArgs: 1,
			allowedInText: true
		},
		handler: (_ref2, args) => {
			var { parser } = _ref2;
			var body = args[0];
			return {
				type: "hphantom",
				mode: parser.mode,
				body
			};
		},
		htmlBuilder: (group, options) => {
			var node = buildCommon.makeSpan([], [buildGroup$1(group.body, options.withPhantom())]);
			node.height = 0;
			node.depth = 0;
			if (node.children) for (var i = 0; i < node.children.length; i++) {
				node.children[i].height = 0;
				node.children[i].depth = 0;
			}
			node = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [{
					type: "elem",
					elem: node
				}]
			}, options);
			return buildCommon.makeSpan(["mord"], [node], options);
		},
		mathmlBuilder: (group, options) => {
			var inner = buildExpression(ordargument(group.body), options);
			var phantom = new mathMLTree.MathNode("mphantom", inner);
			var node = new mathMLTree.MathNode("mpadded", [phantom]);
			node.setAttribute("height", "0px");
			node.setAttribute("depth", "0px");
			return node;
		}
	});
	defineFunction({
		type: "vphantom",
		names: ["\\vphantom"],
		props: {
			numArgs: 1,
			allowedInText: true
		},
		handler: (_ref3, args) => {
			var { parser } = _ref3;
			var body = args[0];
			return {
				type: "vphantom",
				mode: parser.mode,
				body
			};
		},
		htmlBuilder: (group, options) => {
			var inner = buildCommon.makeSpan(["inner"], [buildGroup$1(group.body, options.withPhantom())]);
			var fix = buildCommon.makeSpan(["fix"], []);
			return buildCommon.makeSpan(["mord", "rlap"], [inner, fix], options);
		},
		mathmlBuilder: (group, options) => {
			var inner = buildExpression(ordargument(group.body), options);
			var phantom = new mathMLTree.MathNode("mphantom", inner);
			var node = new mathMLTree.MathNode("mpadded", [phantom]);
			node.setAttribute("width", "0px");
			return node;
		}
	});
	defineFunction({
		type: "raisebox",
		names: ["\\raisebox"],
		props: {
			numArgs: 2,
			argTypes: ["size", "hbox"],
			allowedInText: true
		},
		handler(_ref, args) {
			var { parser } = _ref;
			var amount = assertNodeType(args[0], "size").value;
			var body = args[1];
			return {
				type: "raisebox",
				mode: parser.mode,
				dy: amount,
				body
			};
		},
		htmlBuilder(group, options) {
			var body = buildGroup$1(group.body, options);
			var dy = calculateSize(group.dy, options);
			return buildCommon.makeVList({
				positionType: "shift",
				positionData: -dy,
				children: [{
					type: "elem",
					elem: body
				}]
			}, options);
		},
		mathmlBuilder(group, options) {
			var node = new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)]);
			var dy = group.dy.number + group.dy.unit;
			node.setAttribute("voffset", dy);
			return node;
		}
	});
	defineFunction({
		type: "internal",
		names: ["\\relax"],
		props: {
			numArgs: 0,
			allowedInText: true,
			allowedInArgument: true
		},
		handler(_ref) {
			var { parser } = _ref;
			return {
				type: "internal",
				mode: parser.mode
			};
		}
	});
	defineFunction({
		type: "rule",
		names: ["\\rule"],
		props: {
			numArgs: 2,
			numOptionalArgs: 1,
			allowedInText: true,
			allowedInMath: true,
			argTypes: [
				"size",
				"size",
				"size"
			]
		},
		handler(_ref, args, optArgs) {
			var { parser } = _ref;
			var shift = optArgs[0];
			var width = assertNodeType(args[0], "size");
			var height = assertNodeType(args[1], "size");
			return {
				type: "rule",
				mode: parser.mode,
				shift: shift && assertNodeType(shift, "size").value,
				width: width.value,
				height: height.value
			};
		},
		htmlBuilder(group, options) {
			var rule = buildCommon.makeSpan(["mord", "rule"], [], options);
			var width = calculateSize(group.width, options);
			var height = calculateSize(group.height, options);
			var shift = group.shift ? calculateSize(group.shift, options) : 0;
			rule.style.borderRightWidth = makeEm(width);
			rule.style.borderTopWidth = makeEm(height);
			rule.style.bottom = makeEm(shift);
			rule.width = width;
			rule.height = height + shift;
			rule.depth = -shift;
			rule.maxFontSize = height * 1.125 * options.sizeMultiplier;
			return rule;
		},
		mathmlBuilder(group, options) {
			var width = calculateSize(group.width, options);
			var height = calculateSize(group.height, options);
			var shift = group.shift ? calculateSize(group.shift, options) : 0;
			var color = options.color && options.getColor() || "black";
			var rule = new mathMLTree.MathNode("mspace");
			rule.setAttribute("mathbackground", color);
			rule.setAttribute("width", makeEm(width));
			rule.setAttribute("height", makeEm(height));
			var wrapper = new mathMLTree.MathNode("mpadded", [rule]);
			if (shift >= 0) wrapper.setAttribute("height", makeEm(shift));
			else {
				wrapper.setAttribute("height", makeEm(shift));
				wrapper.setAttribute("depth", makeEm(-shift));
			}
			wrapper.setAttribute("voffset", makeEm(shift));
			return wrapper;
		}
	});
	sizeFuncs = [
		"\\tiny",
		"\\sixptsize",
		"\\scriptsize",
		"\\footnotesize",
		"\\small",
		"\\normalsize",
		"\\large",
		"\\Large",
		"\\LARGE",
		"\\huge",
		"\\Huge"
	];
	htmlBuilder = (group, options) => {
		var newOptions = options.havingSize(group.size);
		return sizingGroup(group.body, newOptions, options);
	};
	defineFunction({
		type: "sizing",
		names: sizeFuncs,
		props: {
			numArgs: 0,
			allowedInText: true
		},
		handler: (_ref, args) => {
			var { breakOnTokenText, funcName, parser } = _ref;
			var body = parser.parseExpression(false, breakOnTokenText);
			return {
				type: "sizing",
				mode: parser.mode,
				size: sizeFuncs.indexOf(funcName) + 1,
				body
			};
		},
		htmlBuilder,
		mathmlBuilder: (group, options) => {
			var newOptions = options.havingSize(group.size);
			var inner = buildExpression(group.body, newOptions);
			var node = new mathMLTree.MathNode("mstyle", inner);
			node.setAttribute("mathsize", makeEm(newOptions.sizeMultiplier));
			return node;
		}
	});
	defineFunction({
		type: "smash",
		names: ["\\smash"],
		props: {
			numArgs: 1,
			numOptionalArgs: 1,
			allowedInText: true
		},
		handler: (_ref, args, optArgs) => {
			var { parser } = _ref;
			var smashHeight = false;
			var smashDepth = false;
			var tbArg = optArgs[0] && assertNodeType(optArgs[0], "ordgroup");
			if (tbArg) {
				var letter = "";
				for (var i = 0; i < tbArg.body.length; ++i) {
					letter = tbArg.body[i].text;
					if (letter === "t") smashHeight = true;
					else if (letter === "b") smashDepth = true;
					else {
						smashHeight = false;
						smashDepth = false;
						break;
					}
				}
			} else {
				smashHeight = true;
				smashDepth = true;
			}
			var body = args[0];
			return {
				type: "smash",
				mode: parser.mode,
				body,
				smashHeight,
				smashDepth
			};
		},
		htmlBuilder: (group, options) => {
			var node = buildCommon.makeSpan([], [buildGroup$1(group.body, options)]);
			if (!group.smashHeight && !group.smashDepth) return node;
			if (group.smashHeight) {
				node.height = 0;
				if (node.children) for (var i = 0; i < node.children.length; i++) node.children[i].height = 0;
			}
			if (group.smashDepth) {
				node.depth = 0;
				if (node.children) for (var _i = 0; _i < node.children.length; _i++) node.children[_i].depth = 0;
			}
			var smashedNode = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [{
					type: "elem",
					elem: node
				}]
			}, options);
			return buildCommon.makeSpan(["mord"], [smashedNode], options);
		},
		mathmlBuilder: (group, options) => {
			var node = new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)]);
			if (group.smashHeight) node.setAttribute("height", "0px");
			if (group.smashDepth) node.setAttribute("depth", "0px");
			return node;
		}
	});
	defineFunction({
		type: "sqrt",
		names: ["\\sqrt"],
		props: {
			numArgs: 1,
			numOptionalArgs: 1
		},
		handler(_ref, args, optArgs) {
			var { parser } = _ref;
			var index = optArgs[0];
			var body = args[0];
			return {
				type: "sqrt",
				mode: parser.mode,
				body,
				index
			};
		},
		htmlBuilder(group, options) {
			var inner = buildGroup$1(group.body, options.havingCrampedStyle());
			if (inner.height === 0) inner.height = options.fontMetrics().xHeight;
			inner = buildCommon.wrapFragment(inner, options);
			var theta = options.fontMetrics().defaultRuleThickness;
			var phi = theta;
			if (options.style.id < Style$1.TEXT.id) phi = options.fontMetrics().xHeight;
			var lineClearance = theta + phi / 4;
			var minDelimiterHeight = inner.height + inner.depth + lineClearance + theta;
			var { span: img, ruleWidth, advanceWidth } = delimiter.sqrtImage(minDelimiterHeight, options);
			var delimDepth = img.height - ruleWidth;
			if (delimDepth > inner.height + inner.depth + lineClearance) lineClearance = (lineClearance + delimDepth - inner.height - inner.depth) / 2;
			var imgShift = img.height - inner.height - lineClearance - ruleWidth;
			inner.style.paddingLeft = makeEm(advanceWidth);
			var body = buildCommon.makeVList({
				positionType: "firstBaseline",
				children: [
					{
						type: "elem",
						elem: inner,
						wrapperClasses: ["svg-align"]
					},
					{
						type: "kern",
						size: -(inner.height + imgShift)
					},
					{
						type: "elem",
						elem: img
					},
					{
						type: "kern",
						size: ruleWidth
					}
				]
			}, options);
			if (!group.index) return buildCommon.makeSpan(["mord", "sqrt"], [body], options);
			else {
				var newOptions = options.havingStyle(Style$1.SCRIPTSCRIPT);
				var rootm = buildGroup$1(group.index, newOptions, options);
				var toShift = .6 * (body.height - body.depth);
				var rootVList = buildCommon.makeVList({
					positionType: "shift",
					positionData: -toShift,
					children: [{
						type: "elem",
						elem: rootm
					}]
				}, options);
				var rootVListWrap = buildCommon.makeSpan(["root"], [rootVList]);
				return buildCommon.makeSpan(["mord", "sqrt"], [rootVListWrap, body], options);
			}
		},
		mathmlBuilder(group, options) {
			var { body, index } = group;
			return index ? new mathMLTree.MathNode("mroot", [buildGroup(body, options), buildGroup(index, options)]) : new mathMLTree.MathNode("msqrt", [buildGroup(body, options)]);
		}
	});
	styleMap = {
		"display": Style$1.DISPLAY,
		"text": Style$1.TEXT,
		"script": Style$1.SCRIPT,
		"scriptscript": Style$1.SCRIPTSCRIPT
	};
	defineFunction({
		type: "styling",
		names: [
			"\\displaystyle",
			"\\textstyle",
			"\\scriptstyle",
			"\\scriptscriptstyle"
		],
		props: {
			numArgs: 0,
			allowedInText: true,
			primitive: true
		},
		handler(_ref, args) {
			var { breakOnTokenText, funcName, parser } = _ref;
			var body = parser.parseExpression(true, breakOnTokenText);
			var style = funcName.slice(1, funcName.length - 5);
			return {
				type: "styling",
				mode: parser.mode,
				style,
				body
			};
		},
		htmlBuilder(group, options) {
			var newStyle = styleMap[group.style];
			var newOptions = options.havingStyle(newStyle).withFont("");
			return sizingGroup(group.body, newOptions, options);
		},
		mathmlBuilder(group, options) {
			var newStyle = styleMap[group.style];
			var newOptions = options.havingStyle(newStyle);
			var inner = buildExpression(group.body, newOptions);
			var node = new mathMLTree.MathNode("mstyle", inner);
			var attr = {
				"display": ["0", "true"],
				"text": ["0", "false"],
				"script": ["1", "false"],
				"scriptscript": ["2", "false"]
			}[group.style];
			node.setAttribute("scriptlevel", attr[0]);
			node.setAttribute("displaystyle", attr[1]);
			return node;
		}
	});
	htmlBuilderDelegate = function htmlBuilderDelegate(group, options) {
		var base = group.base;
		if (!base) return null;
		else if (base.type === "op") return base.limits && (options.style.size === Style$1.DISPLAY.size || base.alwaysHandleSupSub) ? htmlBuilder$2 : null;
		else if (base.type === "operatorname") return base.alwaysHandleSupSub && (options.style.size === Style$1.DISPLAY.size || base.limits) ? htmlBuilder$1 : null;
		else if (base.type === "accent") return utils.isCharacterBox(base.base) ? htmlBuilder$a : null;
		else if (base.type === "horizBrace") return !group.sub === base.isOver ? htmlBuilder$3 : null;
		else return null;
	};
	defineFunctionBuilders({
		type: "supsub",
		htmlBuilder(group, options) {
			var builderDelegate = htmlBuilderDelegate(group, options);
			if (builderDelegate) return builderDelegate(group, options);
			var { base: valueBase, sup: valueSup, sub: valueSub } = group;
			var base = buildGroup$1(valueBase, options);
			var supm;
			var subm;
			var metrics = options.fontMetrics();
			var supShift = 0;
			var subShift = 0;
			var isCharacterBox = valueBase && utils.isCharacterBox(valueBase);
			if (valueSup) {
				var newOptions = options.havingStyle(options.style.sup());
				supm = buildGroup$1(valueSup, newOptions, options);
				if (!isCharacterBox) supShift = base.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
			}
			if (valueSub) {
				var _newOptions = options.havingStyle(options.style.sub());
				subm = buildGroup$1(valueSub, _newOptions, options);
				if (!isCharacterBox) subShift = base.depth + _newOptions.fontMetrics().subDrop * _newOptions.sizeMultiplier / options.sizeMultiplier;
			}
			var minSupShift;
			if (options.style === Style$1.DISPLAY) minSupShift = metrics.sup1;
			else if (options.style.cramped) minSupShift = metrics.sup3;
			else minSupShift = metrics.sup2;
			var multiplier = options.sizeMultiplier;
			var marginRight = makeEm(.5 / metrics.ptPerEm / multiplier);
			var marginLeft = null;
			if (subm) {
				var isOiint = group.base && group.base.type === "op" && group.base.name && (group.base.name === "\\oiint" || group.base.name === "\\oiiint");
				if (base instanceof SymbolNode || isOiint) marginLeft = makeEm(-base.italic);
			}
			var supsub;
			if (supm && subm) {
				supShift = Math.max(supShift, minSupShift, supm.depth + .25 * metrics.xHeight);
				subShift = Math.max(subShift, metrics.sub2);
				var maxWidth = 4 * metrics.defaultRuleThickness;
				if (supShift - supm.depth - (subm.height - subShift) < maxWidth) {
					subShift = maxWidth - (supShift - supm.depth) + subm.height;
					var psi = .8 * metrics.xHeight - (supShift - supm.depth);
					if (psi > 0) {
						supShift += psi;
						subShift -= psi;
					}
				}
				var vlistElem = [{
					type: "elem",
					elem: subm,
					shift: subShift,
					marginRight,
					marginLeft
				}, {
					type: "elem",
					elem: supm,
					shift: -supShift,
					marginRight
				}];
				supsub = buildCommon.makeVList({
					positionType: "individualShift",
					children: vlistElem
				}, options);
			} else if (subm) {
				subShift = Math.max(subShift, metrics.sub1, subm.height - .8 * metrics.xHeight);
				var _vlistElem = [{
					type: "elem",
					elem: subm,
					marginLeft,
					marginRight
				}];
				supsub = buildCommon.makeVList({
					positionType: "shift",
					positionData: subShift,
					children: _vlistElem
				}, options);
			} else if (supm) {
				supShift = Math.max(supShift, minSupShift, supm.depth + .25 * metrics.xHeight);
				supsub = buildCommon.makeVList({
					positionType: "shift",
					positionData: -supShift,
					children: [{
						type: "elem",
						elem: supm,
						marginRight
					}]
				}, options);
			} else throw new Error("supsub must have either sup or sub.");
			var mclass = getTypeOfDomTree(base, "right") || "mord";
			return buildCommon.makeSpan([mclass], [base, buildCommon.makeSpan(["msupsub"], [supsub])], options);
		},
		mathmlBuilder(group, options) {
			var isBrace = false;
			var isOver;
			var isSup;
			if (group.base && group.base.type === "horizBrace") {
				isSup = !!group.sup;
				if (isSup === group.base.isOver) {
					isBrace = true;
					isOver = group.base.isOver;
				}
			}
			if (group.base && (group.base.type === "op" || group.base.type === "operatorname")) group.base.parentIsSupSub = true;
			var children = [buildGroup(group.base, options)];
			if (group.sub) children.push(buildGroup(group.sub, options));
			if (group.sup) children.push(buildGroup(group.sup, options));
			var nodeType;
			if (isBrace) nodeType = isOver ? "mover" : "munder";
			else if (!group.sub) {
				var base = group.base;
				if (base && base.type === "op" && base.limits && (options.style === Style$1.DISPLAY || base.alwaysHandleSupSub)) nodeType = "mover";
				else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (base.limits || options.style === Style$1.DISPLAY)) nodeType = "mover";
				else nodeType = "msup";
			} else if (!group.sup) {
				var _base = group.base;
				if (_base && _base.type === "op" && _base.limits && (options.style === Style$1.DISPLAY || _base.alwaysHandleSupSub)) nodeType = "munder";
				else if (_base && _base.type === "operatorname" && _base.alwaysHandleSupSub && (_base.limits || options.style === Style$1.DISPLAY)) nodeType = "munder";
				else nodeType = "msub";
			} else {
				var _base2 = group.base;
				if (_base2 && _base2.type === "op" && _base2.limits && options.style === Style$1.DISPLAY) nodeType = "munderover";
				else if (_base2 && _base2.type === "operatorname" && _base2.alwaysHandleSupSub && (options.style === Style$1.DISPLAY || _base2.limits)) nodeType = "munderover";
				else nodeType = "msubsup";
			}
			return new mathMLTree.MathNode(nodeType, children);
		}
	});
	defineFunctionBuilders({
		type: "atom",
		htmlBuilder(group, options) {
			return buildCommon.mathsym(group.text, group.mode, options, ["m" + group.family]);
		},
		mathmlBuilder(group, options) {
			var node = new mathMLTree.MathNode("mo", [makeText(group.text, group.mode)]);
			if (group.family === "bin") {
				var variant = getVariant(group, options);
				if (variant === "bold-italic") node.setAttribute("mathvariant", variant);
			} else if (group.family === "punct") node.setAttribute("separator", "true");
			else if (group.family === "open" || group.family === "close") node.setAttribute("stretchy", "false");
			return node;
		}
	});
	defaultVariant = {
		"mi": "italic",
		"mn": "normal",
		"mtext": "normal"
	};
	defineFunctionBuilders({
		type: "mathord",
		htmlBuilder(group, options) {
			return buildCommon.makeOrd(group, options, "mathord");
		},
		mathmlBuilder(group, options) {
			var node = new mathMLTree.MathNode("mi", [makeText(group.text, group.mode, options)]);
			var variant = getVariant(group, options) || "italic";
			if (variant !== defaultVariant[node.type]) node.setAttribute("mathvariant", variant);
			return node;
		}
	});
	defineFunctionBuilders({
		type: "textord",
		htmlBuilder(group, options) {
			return buildCommon.makeOrd(group, options, "textord");
		},
		mathmlBuilder(group, options) {
			var text = makeText(group.text, group.mode, options);
			var variant = getVariant(group, options) || "normal";
			var node;
			if (group.mode === "text") node = new mathMLTree.MathNode("mtext", [text]);
			else if (/[0-9]/.test(group.text)) node = new mathMLTree.MathNode("mn", [text]);
			else if (group.text === "\\prime") node = new mathMLTree.MathNode("mo", [text]);
			else node = new mathMLTree.MathNode("mi", [text]);
			if (variant !== defaultVariant[node.type]) node.setAttribute("mathvariant", variant);
			return node;
		}
	});
	cssSpace = {
		"\\nobreak": "nobreak",
		"\\allowbreak": "allowbreak"
	};
	regularSpace = {
		" ": {},
		"\\ ": {},
		"~": { className: "nobreak" },
		"\\space": {},
		"\\nobreakspace": { className: "nobreak" }
	};
	defineFunctionBuilders({
		type: "spacing",
		htmlBuilder(group, options) {
			if (regularSpace.hasOwnProperty(group.text)) {
				var className = regularSpace[group.text].className || "";
				if (group.mode === "text") {
					var ord = buildCommon.makeOrd(group, options, "textord");
					ord.classes.push(className);
					return ord;
				} else return buildCommon.makeSpan(["mspace", className], [buildCommon.mathsym(group.text, group.mode, options)], options);
			} else if (cssSpace.hasOwnProperty(group.text)) return buildCommon.makeSpan(["mspace", cssSpace[group.text]], [], options);
			else throw new ParseError("Unknown type of space \"" + group.text + "\"");
		},
		mathmlBuilder(group, options) {
			var node;
			if (regularSpace.hasOwnProperty(group.text)) node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode("\xA0")]);
			else if (cssSpace.hasOwnProperty(group.text)) return new mathMLTree.MathNode("mspace");
			else throw new ParseError("Unknown type of space \"" + group.text + "\"");
			return node;
		}
	});
	pad = () => {
		var padNode = new mathMLTree.MathNode("mtd", []);
		padNode.setAttribute("width", "50%");
		return padNode;
	};
	defineFunctionBuilders({
		type: "tag",
		mathmlBuilder(group, options) {
			var table = new mathMLTree.MathNode("mtable", [new mathMLTree.MathNode("mtr", [
				pad(),
				new mathMLTree.MathNode("mtd", [buildExpressionRow(group.body, options)]),
				pad(),
				new mathMLTree.MathNode("mtd", [buildExpressionRow(group.tag, options)])
			])]);
			table.setAttribute("width", "100%");
			return table;
		}
	});
	textFontFamilies = {
		"\\text": void 0,
		"\\textrm": "textrm",
		"\\textsf": "textsf",
		"\\texttt": "texttt",
		"\\textnormal": "textrm"
	};
	textFontWeights = {
		"\\textbf": "textbf",
		"\\textmd": "textmd"
	};
	textFontShapes = {
		"\\textit": "textit",
		"\\textup": "textup"
	};
	optionsWithFont = (group, options) => {
		var font = group.font;
		if (!font) return options;
		else if (textFontFamilies[font]) return options.withTextFontFamily(textFontFamilies[font]);
		else if (textFontWeights[font]) return options.withTextFontWeight(textFontWeights[font]);
		else if (font === "\\emph") return options.fontShape === "textit" ? options.withTextFontShape("textup") : options.withTextFontShape("textit");
		return options.withTextFontShape(textFontShapes[font]);
	};
	defineFunction({
		type: "text",
		names: [
			"\\text",
			"\\textrm",
			"\\textsf",
			"\\texttt",
			"\\textnormal",
			"\\textbf",
			"\\textmd",
			"\\textit",
			"\\textup",
			"\\emph"
		],
		props: {
			numArgs: 1,
			argTypes: ["text"],
			allowedInArgument: true,
			allowedInText: true
		},
		handler(_ref, args) {
			var { parser, funcName } = _ref;
			var body = args[0];
			return {
				type: "text",
				mode: parser.mode,
				body: ordargument(body),
				font: funcName
			};
		},
		htmlBuilder(group, options) {
			var newOptions = optionsWithFont(group, options);
			var inner = buildExpression$1(group.body, newOptions, true);
			return buildCommon.makeSpan(["mord", "text"], inner, newOptions);
		},
		mathmlBuilder(group, options) {
			var newOptions = optionsWithFont(group, options);
			return buildExpressionRow(group.body, newOptions);
		}
	});
	defineFunction({
		type: "underline",
		names: ["\\underline"],
		props: {
			numArgs: 1,
			allowedInText: true
		},
		handler(_ref, args) {
			var { parser } = _ref;
			return {
				type: "underline",
				mode: parser.mode,
				body: args[0]
			};
		},
		htmlBuilder(group, options) {
			var innerGroup = buildGroup$1(group.body, options);
			var line = buildCommon.makeLineSpan("underline-line", options);
			var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
			var vlist = buildCommon.makeVList({
				positionType: "top",
				positionData: innerGroup.height,
				children: [
					{
						type: "kern",
						size: defaultRuleThickness
					},
					{
						type: "elem",
						elem: line
					},
					{
						type: "kern",
						size: 3 * defaultRuleThickness
					},
					{
						type: "elem",
						elem: innerGroup
					}
				]
			}, options);
			return buildCommon.makeSpan(["mord", "underline"], [vlist], options);
		},
		mathmlBuilder(group, options) {
			var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("‾")]);
			operator.setAttribute("stretchy", "true");
			var node = new mathMLTree.MathNode("munder", [buildGroup(group.body, options), operator]);
			node.setAttribute("accentunder", "true");
			return node;
		}
	});
	defineFunction({
		type: "vcenter",
		names: ["\\vcenter"],
		props: {
			numArgs: 1,
			argTypes: ["original"],
			allowedInText: false
		},
		handler(_ref, args) {
			var { parser } = _ref;
			return {
				type: "vcenter",
				mode: parser.mode,
				body: args[0]
			};
		},
		htmlBuilder(group, options) {
			var body = buildGroup$1(group.body, options);
			var axisHeight = options.fontMetrics().axisHeight;
			var dy = .5 * (body.height - axisHeight - (body.depth + axisHeight));
			return buildCommon.makeVList({
				positionType: "shift",
				positionData: dy,
				children: [{
					type: "elem",
					elem: body
				}]
			}, options);
		},
		mathmlBuilder(group, options) {
			return new mathMLTree.MathNode("mpadded", [buildGroup(group.body, options)], ["vcenter"]);
		}
	});
	defineFunction({
		type: "verb",
		names: ["\\verb"],
		props: {
			numArgs: 0,
			allowedInText: true
		},
		handler(context, args, optArgs) {
			throw new ParseError("\\verb ended by end of line instead of matching delimiter");
		},
		htmlBuilder(group, options) {
			var text = makeVerb(group);
			var body = [];
			var newOptions = options.havingStyle(options.style.text());
			for (var i = 0; i < text.length; i++) {
				var c = text[i];
				if (c === "~") c = "\\textasciitilde";
				body.push(buildCommon.makeSymbol(c, "Typewriter-Regular", group.mode, newOptions, ["mord", "texttt"]));
			}
			return buildCommon.makeSpan(["mord", "text"].concat(newOptions.sizingClasses(options)), buildCommon.tryCombineChars(body), newOptions);
		},
		mathmlBuilder(group, options) {
			var text = new mathMLTree.TextNode(makeVerb(group));
			var node = new mathMLTree.MathNode("mtext", [text]);
			node.setAttribute("mathvariant", "monospace");
			return node;
		}
	});
	makeVerb = (group) => group.body.replace(/ /g, group.star ? "␣" : "\xA0");
	functions = _functions;
	spaceRegexString = "[ \r\n	]";
	controlWordRegexString = "\\\\[a-zA-Z@]+";
	controlSymbolRegexString = "\\\\[^\ud800-\udfff]";
	controlWordWhitespaceRegexString = "(" + controlWordRegexString + ")" + spaceRegexString + "*";
	controlSpaceRegexString = "\\\\(\n|[ \r	]+\n?)[ \r	]*";
	combiningDiacriticalMarkString = "[̀-ͯ]";
	combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
	tokenRegexString = "(" + spaceRegexString + "+)|" + (controlSpaceRegexString + "|") + "([!-\\[\\]-‧‪-퟿豈-￿]" + (combiningDiacriticalMarkString + "*") + "|[\ud800-\udbff][\udc00-\udfff]" + (combiningDiacriticalMarkString + "*") + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + ("|" + controlWordWhitespaceRegexString) + ("|" + controlSymbolRegexString + ")");
	Lexer = class {
		constructor(input, settings) {
			this.input = void 0;
			this.settings = void 0;
			this.tokenRegex = void 0;
			this.catcodes = void 0;
			this.input = input;
			this.settings = settings;
			this.tokenRegex = new RegExp(tokenRegexString, "g");
			this.catcodes = {
				"%": 14,
				"~": 13
			};
		}
		setCatcode(char, code) {
			this.catcodes[char] = code;
		}
		/**
		* This function lexes a single token.
		*/
		lex() {
			var input = this.input;
			var pos = this.tokenRegex.lastIndex;
			if (pos === input.length) return new Token("EOF", new SourceLocation(this, pos, pos));
			var match = this.tokenRegex.exec(input);
			if (match === null || match.index !== pos) throw new ParseError("Unexpected character: '" + input[pos] + "'", new Token(input[pos], new SourceLocation(this, pos, pos + 1)));
			var text = match[6] || match[3] || (match[2] ? "\\ " : " ");
			if (this.catcodes[text] === 14) {
				var nlIndex = input.indexOf("\n", this.tokenRegex.lastIndex);
				if (nlIndex === -1) {
					this.tokenRegex.lastIndex = input.length;
					this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)");
				} else this.tokenRegex.lastIndex = nlIndex + 1;
				return this.lex();
			}
			return new Token(text, new SourceLocation(this, pos, this.tokenRegex.lastIndex));
		}
	};
	Namespace = class {
		/**
		* Both arguments are optional.  The first argument is an object of
		* built-in mappings which never change.  The second argument is an object
		* of initial (global-level) mappings, which will constantly change
		* according to any global/top-level `set`s done.
		*/
		constructor(builtins, globalMacros) {
			if (builtins === void 0) builtins = {};
			if (globalMacros === void 0) globalMacros = {};
			this.current = void 0;
			this.builtins = void 0;
			this.undefStack = void 0;
			this.current = globalMacros;
			this.builtins = builtins;
			this.undefStack = [];
		}
		/**
		* Start a new nested group, affecting future local `set`s.
		*/
		beginGroup() {
			this.undefStack.push({});
		}
		/**
		* End current nested group, restoring values before the group began.
		*/
		endGroup() {
			if (this.undefStack.length === 0) throw new ParseError("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
			var undefs = this.undefStack.pop();
			for (var undef in undefs) if (undefs.hasOwnProperty(undef)) if (undefs[undef] == null) delete this.current[undef];
			else this.current[undef] = undefs[undef];
		}
		/**
		* Ends all currently nested groups (if any), restoring values before the
		* groups began.  Useful in case of an error in the middle of parsing.
		*/
		endGroups() {
			while (this.undefStack.length > 0) this.endGroup();
		}
		/**
		* Detect whether `name` has a definition.  Equivalent to
		* `get(name) != null`.
		*/
		has(name) {
			return this.current.hasOwnProperty(name) || this.builtins.hasOwnProperty(name);
		}
		/**
		* Get the current value of a name, or `undefined` if there is no value.
		*
		* Note: Do not use `if (namespace.get(...))` to detect whether a macro
		* is defined, as the definition may be the empty string which evaluates
		* to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
		* `if (namespace.has(...))`.
		*/
		get(name) {
			if (this.current.hasOwnProperty(name)) return this.current[name];
			else return this.builtins[name];
		}
		/**
		* Set the current value of a name, and optionally set it globally too.
		* Local set() sets the current value and (when appropriate) adds an undo
		* operation to the undo stack.  Global set() may change the undo
		* operation at every level, so takes time linear in their number.
		* A value of undefined means to delete existing definitions.
		*/
		set(name, value, global) {
			if (global === void 0) global = false;
			if (global) {
				for (var i = 0; i < this.undefStack.length; i++) delete this.undefStack[i][name];
				if (this.undefStack.length > 0) this.undefStack[this.undefStack.length - 1][name] = value;
			} else {
				var top = this.undefStack[this.undefStack.length - 1];
				if (top && !top.hasOwnProperty(name)) top[name] = this.current[name];
			}
			if (value == null) delete this.current[name];
			else this.current[name] = value;
		}
	};
	macros = _macros;
	defineMacro("\\noexpand", function(context) {
		var t = context.popToken();
		if (context.isExpandable(t.text)) {
			t.noexpand = true;
			t.treatAsRelax = true;
		}
		return {
			tokens: [t],
			numArgs: 0
		};
	});
	defineMacro("\\expandafter", function(context) {
		var t = context.popToken();
		context.expandOnce(true);
		return {
			tokens: [t],
			numArgs: 0
		};
	});
	defineMacro("\\@firstoftwo", function(context) {
		return {
			tokens: context.consumeArgs(2)[0],
			numArgs: 0
		};
	});
	defineMacro("\\@secondoftwo", function(context) {
		return {
			tokens: context.consumeArgs(2)[1],
			numArgs: 0
		};
	});
	defineMacro("\\@ifnextchar", function(context) {
		var args = context.consumeArgs(3);
		context.consumeSpaces();
		var nextToken = context.future();
		if (args[0].length === 1 && args[0][0].text === nextToken.text) return {
			tokens: args[1],
			numArgs: 0
		};
		else return {
			tokens: args[2],
			numArgs: 0
		};
	});
	defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
	defineMacro("\\TextOrMath", function(context) {
		var args = context.consumeArgs(2);
		if (context.mode === "text") return {
			tokens: args[0],
			numArgs: 0
		};
		else return {
			tokens: args[1],
			numArgs: 0
		};
	});
	digitToNumber = {
		"0": 0,
		"1": 1,
		"2": 2,
		"3": 3,
		"4": 4,
		"5": 5,
		"6": 6,
		"7": 7,
		"8": 8,
		"9": 9,
		"a": 10,
		"A": 10,
		"b": 11,
		"B": 11,
		"c": 12,
		"C": 12,
		"d": 13,
		"D": 13,
		"e": 14,
		"E": 14,
		"f": 15,
		"F": 15
	};
	defineMacro("\\char", function(context) {
		var token = context.popToken();
		var base;
		var number = "";
		if (token.text === "'") {
			base = 8;
			token = context.popToken();
		} else if (token.text === "\"") {
			base = 16;
			token = context.popToken();
		} else if (token.text === "`") {
			token = context.popToken();
			if (token.text[0] === "\\") number = token.text.charCodeAt(1);
			else if (token.text === "EOF") throw new ParseError("\\char` missing argument");
			else number = token.text.charCodeAt(0);
		} else base = 10;
		if (base) {
			number = digitToNumber[token.text];
			if (number == null || number >= base) throw new ParseError("Invalid base-" + base + " digit " + token.text);
			var digit;
			while ((digit = digitToNumber[context.future().text]) != null && digit < base) {
				number *= base;
				number += digit;
				context.popToken();
			}
		}
		return "\\@char{" + number + "}";
	});
	newcommand = (context, existsOK, nonexistsOK, skipIfExists) => {
		var arg = context.consumeArg().tokens;
		if (arg.length !== 1) throw new ParseError("\\newcommand's first argument must be a macro name");
		var name = arg[0].text;
		var exists = context.isDefined(name);
		if (exists && !existsOK) throw new ParseError("\\newcommand{" + name + "} attempting to redefine " + (name + "; use \\renewcommand"));
		if (!exists && !nonexistsOK) throw new ParseError("\\renewcommand{" + name + "} when command " + name + " does not yet exist; use \\newcommand");
		var numArgs = 0;
		arg = context.consumeArg().tokens;
		if (arg.length === 1 && arg[0].text === "[") {
			var argText = "";
			var token = context.expandNextToken();
			while (token.text !== "]" && token.text !== "EOF") {
				argText += token.text;
				token = context.expandNextToken();
			}
			if (!argText.match(/^\s*[0-9]+\s*$/)) throw new ParseError("Invalid number of arguments: " + argText);
			numArgs = parseInt(argText);
			arg = context.consumeArg().tokens;
		}
		if (!(exists && skipIfExists)) context.macros.set(name, {
			tokens: arg,
			numArgs
		});
		return "";
	};
	defineMacro("\\newcommand", (context) => newcommand(context, false, true, false));
	defineMacro("\\renewcommand", (context) => newcommand(context, true, false, false));
	defineMacro("\\providecommand", (context) => newcommand(context, true, true, true));
	defineMacro("\\message", (context) => {
		var arg = context.consumeArgs(1)[0];
		console.log(arg.reverse().map((token) => token.text).join(""));
		return "";
	});
	defineMacro("\\errmessage", (context) => {
		var arg = context.consumeArgs(1)[0];
		console.error(arg.reverse().map((token) => token.text).join(""));
		return "";
	});
	defineMacro("\\show", (context) => {
		var tok = context.popToken();
		var name = tok.text;
		console.log(tok, context.macros.get(name), functions[name], symbols.math[name], symbols.text[name]);
		return "";
	});
	defineMacro("\\bgroup", "{");
	defineMacro("\\egroup", "}");
	defineMacro("~", "\\nobreakspace");
	defineMacro("\\lq", "`");
	defineMacro("\\rq", "'");
	defineMacro("\\aa", "\\r a");
	defineMacro("\\AA", "\\r A");
	defineMacro("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
	defineMacro("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
	defineMacro("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
	defineMacro("ℬ", "\\mathscr{B}");
	defineMacro("ℰ", "\\mathscr{E}");
	defineMacro("ℱ", "\\mathscr{F}");
	defineMacro("ℋ", "\\mathscr{H}");
	defineMacro("ℐ", "\\mathscr{I}");
	defineMacro("ℒ", "\\mathscr{L}");
	defineMacro("ℳ", "\\mathscr{M}");
	defineMacro("ℛ", "\\mathscr{R}");
	defineMacro("ℭ", "\\mathfrak{C}");
	defineMacro("ℌ", "\\mathfrak{H}");
	defineMacro("ℨ", "\\mathfrak{Z}");
	defineMacro("\\Bbbk", "\\Bbb{k}");
	defineMacro("·", "\\cdotp");
	defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
	defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
	defineMacro("\\clap", "\\mathclap{\\textrm{#1}}");
	defineMacro("\\mathstrut", "\\vphantom{(}");
	defineMacro("\\underbar", "\\underline{\\text{#1}}");
	defineMacro("\\not", "\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char\"338}");
	defineMacro("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
	defineMacro("\\ne", "\\neq");
	defineMacro("≠", "\\neq");
	defineMacro("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}");
	defineMacro("∉", "\\notin");
	defineMacro("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}");
	defineMacro("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
	defineMacro("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
	defineMacro("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
	defineMacro("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}");
	defineMacro("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
	defineMacro("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
	defineMacro("⟂", "\\perp");
	defineMacro("‼", "\\mathclose{!\\mkern-0.8mu!}");
	defineMacro("∌", "\\notni");
	defineMacro("⌜", "\\ulcorner");
	defineMacro("⌝", "\\urcorner");
	defineMacro("⌞", "\\llcorner");
	defineMacro("⌟", "\\lrcorner");
	defineMacro("©", "\\copyright");
	defineMacro("®", "\\textregistered");
	defineMacro("️", "\\textregistered");
	defineMacro("\\ulcorner", "\\html@mathml{\\@ulcorner}{\\mathop{\\char\"231c}}");
	defineMacro("\\urcorner", "\\html@mathml{\\@urcorner}{\\mathop{\\char\"231d}}");
	defineMacro("\\llcorner", "\\html@mathml{\\@llcorner}{\\mathop{\\char\"231e}}");
	defineMacro("\\lrcorner", "\\html@mathml{\\@lrcorner}{\\mathop{\\char\"231f}}");
	defineMacro("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
	defineMacro("⋮", "\\vdots");
	defineMacro("\\varGamma", "\\mathit{\\Gamma}");
	defineMacro("\\varDelta", "\\mathit{\\Delta}");
	defineMacro("\\varTheta", "\\mathit{\\Theta}");
	defineMacro("\\varLambda", "\\mathit{\\Lambda}");
	defineMacro("\\varXi", "\\mathit{\\Xi}");
	defineMacro("\\varPi", "\\mathit{\\Pi}");
	defineMacro("\\varSigma", "\\mathit{\\Sigma}");
	defineMacro("\\varUpsilon", "\\mathit{\\Upsilon}");
	defineMacro("\\varPhi", "\\mathit{\\Phi}");
	defineMacro("\\varPsi", "\\mathit{\\Psi}");
	defineMacro("\\varOmega", "\\mathit{\\Omega}");
	defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
	defineMacro("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
	defineMacro("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
	defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
	defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
	defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
	defineMacro("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
	defineMacro("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
	dotsByToken = {
		",": "\\dotsc",
		"\\not": "\\dotsb",
		"+": "\\dotsb",
		"=": "\\dotsb",
		"<": "\\dotsb",
		">": "\\dotsb",
		"-": "\\dotsb",
		"*": "\\dotsb",
		":": "\\dotsb",
		"\\DOTSB": "\\dotsb",
		"\\coprod": "\\dotsb",
		"\\bigvee": "\\dotsb",
		"\\bigwedge": "\\dotsb",
		"\\biguplus": "\\dotsb",
		"\\bigcap": "\\dotsb",
		"\\bigcup": "\\dotsb",
		"\\prod": "\\dotsb",
		"\\sum": "\\dotsb",
		"\\bigotimes": "\\dotsb",
		"\\bigoplus": "\\dotsb",
		"\\bigodot": "\\dotsb",
		"\\bigsqcup": "\\dotsb",
		"\\And": "\\dotsb",
		"\\longrightarrow": "\\dotsb",
		"\\Longrightarrow": "\\dotsb",
		"\\longleftarrow": "\\dotsb",
		"\\Longleftarrow": "\\dotsb",
		"\\longleftrightarrow": "\\dotsb",
		"\\Longleftrightarrow": "\\dotsb",
		"\\mapsto": "\\dotsb",
		"\\longmapsto": "\\dotsb",
		"\\hookrightarrow": "\\dotsb",
		"\\doteq": "\\dotsb",
		"\\mathbin": "\\dotsb",
		"\\mathrel": "\\dotsb",
		"\\relbar": "\\dotsb",
		"\\Relbar": "\\dotsb",
		"\\xrightarrow": "\\dotsb",
		"\\xleftarrow": "\\dotsb",
		"\\DOTSI": "\\dotsi",
		"\\int": "\\dotsi",
		"\\oint": "\\dotsi",
		"\\iint": "\\dotsi",
		"\\iiint": "\\dotsi",
		"\\iiiint": "\\dotsi",
		"\\idotsint": "\\dotsi",
		"\\DOTSX": "\\dotsx"
	};
	defineMacro("\\dots", function(context) {
		var thedots = "\\dotso";
		var next = context.expandAfterFuture().text;
		if (next in dotsByToken) thedots = dotsByToken[next];
		else if (next.slice(0, 4) === "\\not") thedots = "\\dotsb";
		else if (next in symbols.math) {
			if (["bin", "rel"].includes(symbols.math[next].group)) thedots = "\\dotsb";
		}
		return thedots;
	});
	spaceAfterDots = {
		")": true,
		"]": true,
		"\\rbrack": true,
		"\\}": true,
		"\\rbrace": true,
		"\\rangle": true,
		"\\rceil": true,
		"\\rfloor": true,
		"\\rgroup": true,
		"\\rmoustache": true,
		"\\right": true,
		"\\bigr": true,
		"\\biggr": true,
		"\\Bigr": true,
		"\\Biggr": true,
		"$": true,
		";": true,
		".": true,
		",": true
	};
	defineMacro("\\dotso", function(context) {
		if (context.future().text in spaceAfterDots) return "\\ldots\\,";
		else return "\\ldots";
	});
	defineMacro("\\dotsc", function(context) {
		var next = context.future().text;
		if (next in spaceAfterDots && next !== ",") return "\\ldots\\,";
		else return "\\ldots";
	});
	defineMacro("\\cdots", function(context) {
		if (context.future().text in spaceAfterDots) return "\\@cdots\\,";
		else return "\\@cdots";
	});
	defineMacro("\\dotsb", "\\cdots");
	defineMacro("\\dotsm", "\\cdots");
	defineMacro("\\dotsi", "\\!\\cdots");
	defineMacro("\\dotsx", "\\ldots\\,");
	defineMacro("\\DOTSI", "\\relax");
	defineMacro("\\DOTSB", "\\relax");
	defineMacro("\\DOTSX", "\\relax");
	defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
	defineMacro("\\,", "\\tmspace+{3mu}{.1667em}");
	defineMacro("\\thinspace", "\\,");
	defineMacro("\\>", "\\mskip{4mu}");
	defineMacro("\\:", "\\tmspace+{4mu}{.2222em}");
	defineMacro("\\medspace", "\\:");
	defineMacro("\\;", "\\tmspace+{5mu}{.2777em}");
	defineMacro("\\thickspace", "\\;");
	defineMacro("\\!", "\\tmspace-{3mu}{.1667em}");
	defineMacro("\\negthinspace", "\\!");
	defineMacro("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
	defineMacro("\\negthickspace", "\\tmspace-{5mu}{.277em}");
	defineMacro("\\enspace", "\\kern.5em ");
	defineMacro("\\enskip", "\\hskip.5em\\relax");
	defineMacro("\\quad", "\\hskip1em\\relax");
	defineMacro("\\qquad", "\\hskip2em\\relax");
	defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
	defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
	defineMacro("\\tag@literal", (context) => {
		if (context.macros.get("\\df@tag")) throw new ParseError("Multiple \\tag");
		return "\\gdef\\df@tag{\\text{#1}}";
	});
	defineMacro("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
	defineMacro("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
	defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
	defineMacro("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
	defineMacro("\\newline", "\\\\\\relax");
	defineMacro("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
	latexRaiseA = makeEm(fontMetricsData["Main-Regular"]["T".charCodeAt(0)][1] - .7 * fontMetricsData["Main-Regular"]["A".charCodeAt(0)][1]);
	defineMacro("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
	defineMacro("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
	defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
	defineMacro("\\@hspace", "\\hskip #1\\relax");
	defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
	defineMacro("\\ordinarycolon", ":");
	defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
	defineMacro("\\dblcolon", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char\"2237}}");
	defineMacro("\\coloneqq", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char\"2254}}");
	defineMacro("\\Coloneqq", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char\"2237\\char\"3d}}");
	defineMacro("\\coloneq", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char\"3a\\char\"2212}}");
	defineMacro("\\Coloneq", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char\"2237\\char\"2212}}");
	defineMacro("\\eqqcolon", "\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char\"2255}}");
	defineMacro("\\Eqqcolon", "\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char\"3d\\char\"2237}}");
	defineMacro("\\eqcolon", "\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char\"2239}}");
	defineMacro("\\Eqcolon", "\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char\"2212\\char\"2237}}");
	defineMacro("\\colonapprox", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char\"3a\\char\"2248}}");
	defineMacro("\\Colonapprox", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char\"2237\\char\"2248}}");
	defineMacro("\\colonsim", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char\"3a\\char\"223c}}");
	defineMacro("\\Colonsim", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char\"2237\\char\"223c}}");
	defineMacro("∷", "\\dblcolon");
	defineMacro("∹", "\\eqcolon");
	defineMacro("≔", "\\coloneqq");
	defineMacro("≕", "\\eqqcolon");
	defineMacro("⩴", "\\Coloneqq");
	defineMacro("\\ratio", "\\vcentcolon");
	defineMacro("\\coloncolon", "\\dblcolon");
	defineMacro("\\colonequals", "\\coloneqq");
	defineMacro("\\coloncolonequals", "\\Coloneqq");
	defineMacro("\\equalscolon", "\\eqqcolon");
	defineMacro("\\equalscoloncolon", "\\Eqqcolon");
	defineMacro("\\colonminus", "\\coloneq");
	defineMacro("\\coloncolonminus", "\\Coloneq");
	defineMacro("\\minuscolon", "\\eqcolon");
	defineMacro("\\minuscoloncolon", "\\Eqcolon");
	defineMacro("\\coloncolonapprox", "\\Colonapprox");
	defineMacro("\\coloncolonsim", "\\Colonsim");
	defineMacro("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
	defineMacro("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
	defineMacro("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
	defineMacro("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
	defineMacro("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
	defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
	defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
	defineMacro("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
	defineMacro("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
	defineMacro("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
	defineMacro("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
	defineMacro("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
	defineMacro("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
	defineMacro("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
	defineMacro("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
	defineMacro("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
	defineMacro("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
	defineMacro("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
	defineMacro("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
	defineMacro("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
	defineMacro("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
	defineMacro("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
	defineMacro("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
	defineMacro("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
	defineMacro("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
	defineMacro("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
	defineMacro("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
	defineMacro("\\imath", "\\html@mathml{\\@imath}{ı}");
	defineMacro("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
	defineMacro("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}");
	defineMacro("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}");
	defineMacro("⟦", "\\llbracket");
	defineMacro("⟧", "\\rrbracket");
	defineMacro("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}");
	defineMacro("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}");
	defineMacro("⦃", "\\lBrace");
	defineMacro("⦄", "\\rBrace");
	defineMacro("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}");
	defineMacro("⦵", "\\minuso");
	defineMacro("\\darr", "\\downarrow");
	defineMacro("\\dArr", "\\Downarrow");
	defineMacro("\\Darr", "\\Downarrow");
	defineMacro("\\lang", "\\langle");
	defineMacro("\\rang", "\\rangle");
	defineMacro("\\uarr", "\\uparrow");
	defineMacro("\\uArr", "\\Uparrow");
	defineMacro("\\Uarr", "\\Uparrow");
	defineMacro("\\N", "\\mathbb{N}");
	defineMacro("\\R", "\\mathbb{R}");
	defineMacro("\\Z", "\\mathbb{Z}");
	defineMacro("\\alef", "\\aleph");
	defineMacro("\\alefsym", "\\aleph");
	defineMacro("\\Alpha", "\\mathrm{A}");
	defineMacro("\\Beta", "\\mathrm{B}");
	defineMacro("\\bull", "\\bullet");
	defineMacro("\\Chi", "\\mathrm{X}");
	defineMacro("\\clubs", "\\clubsuit");
	defineMacro("\\cnums", "\\mathbb{C}");
	defineMacro("\\Complex", "\\mathbb{C}");
	defineMacro("\\Dagger", "\\ddagger");
	defineMacro("\\diamonds", "\\diamondsuit");
	defineMacro("\\empty", "\\emptyset");
	defineMacro("\\Epsilon", "\\mathrm{E}");
	defineMacro("\\Eta", "\\mathrm{H}");
	defineMacro("\\exist", "\\exists");
	defineMacro("\\harr", "\\leftrightarrow");
	defineMacro("\\hArr", "\\Leftrightarrow");
	defineMacro("\\Harr", "\\Leftrightarrow");
	defineMacro("\\hearts", "\\heartsuit");
	defineMacro("\\image", "\\Im");
	defineMacro("\\infin", "\\infty");
	defineMacro("\\Iota", "\\mathrm{I}");
	defineMacro("\\isin", "\\in");
	defineMacro("\\Kappa", "\\mathrm{K}");
	defineMacro("\\larr", "\\leftarrow");
	defineMacro("\\lArr", "\\Leftarrow");
	defineMacro("\\Larr", "\\Leftarrow");
	defineMacro("\\lrarr", "\\leftrightarrow");
	defineMacro("\\lrArr", "\\Leftrightarrow");
	defineMacro("\\Lrarr", "\\Leftrightarrow");
	defineMacro("\\Mu", "\\mathrm{M}");
	defineMacro("\\natnums", "\\mathbb{N}");
	defineMacro("\\Nu", "\\mathrm{N}");
	defineMacro("\\Omicron", "\\mathrm{O}");
	defineMacro("\\plusmn", "\\pm");
	defineMacro("\\rarr", "\\rightarrow");
	defineMacro("\\rArr", "\\Rightarrow");
	defineMacro("\\Rarr", "\\Rightarrow");
	defineMacro("\\real", "\\Re");
	defineMacro("\\reals", "\\mathbb{R}");
	defineMacro("\\Reals", "\\mathbb{R}");
	defineMacro("\\Rho", "\\mathrm{P}");
	defineMacro("\\sdot", "\\cdot");
	defineMacro("\\sect", "\\S");
	defineMacro("\\spades", "\\spadesuit");
	defineMacro("\\sub", "\\subset");
	defineMacro("\\sube", "\\subseteq");
	defineMacro("\\supe", "\\supseteq");
	defineMacro("\\Tau", "\\mathrm{T}");
	defineMacro("\\thetasym", "\\vartheta");
	defineMacro("\\weierp", "\\wp");
	defineMacro("\\Zeta", "\\mathrm{Z}");
	defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
	defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
	defineMacro("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
	defineMacro("\\bra", "\\mathinner{\\langle{#1}|}");
	defineMacro("\\ket", "\\mathinner{|{#1}\\rangle}");
	defineMacro("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
	defineMacro("\\Bra", "\\left\\langle#1\\right|");
	defineMacro("\\Ket", "\\left|#1\\right\\rangle");
	braketHelper = (one) => (context) => {
		var left = context.consumeArg().tokens;
		var middle = context.consumeArg().tokens;
		var middleDouble = context.consumeArg().tokens;
		var right = context.consumeArg().tokens;
		var oldMiddle = context.macros.get("|");
		var oldMiddleDouble = context.macros.get("\\|");
		context.macros.beginGroup();
		var midMacro = (double) => (context) => {
			if (one) {
				context.macros.set("|", oldMiddle);
				if (middleDouble.length) context.macros.set("\\|", oldMiddleDouble);
			}
			var doubled = double;
			if (!double && middleDouble.length) {
				if (context.future().text === "|") {
					context.popToken();
					doubled = true;
				}
			}
			return {
				tokens: doubled ? middleDouble : middle,
				numArgs: 0
			};
		};
		context.macros.set("|", midMacro(false));
		if (middleDouble.length) context.macros.set("\\|", midMacro(true));
		var arg = context.consumeArg().tokens;
		var expanded = context.expandTokens([
			...right,
			...arg,
			...left
		]);
		context.macros.endGroup();
		return {
			tokens: expanded.reverse(),
			numArgs: 0
		};
	};
	defineMacro("\\bra@ket", braketHelper(false));
	defineMacro("\\bra@set", braketHelper(true));
	defineMacro("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
	defineMacro("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
	defineMacro("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
	defineMacro("\\angln", "{\\angl n}");
	defineMacro("\\blue", "\\textcolor{##6495ed}{#1}");
	defineMacro("\\orange", "\\textcolor{##ffa500}{#1}");
	defineMacro("\\pink", "\\textcolor{##ff00af}{#1}");
	defineMacro("\\red", "\\textcolor{##df0030}{#1}");
	defineMacro("\\green", "\\textcolor{##28ae7b}{#1}");
	defineMacro("\\gray", "\\textcolor{gray}{#1}");
	defineMacro("\\purple", "\\textcolor{##9d38bd}{#1}");
	defineMacro("\\blueA", "\\textcolor{##ccfaff}{#1}");
	defineMacro("\\blueB", "\\textcolor{##80f6ff}{#1}");
	defineMacro("\\blueC", "\\textcolor{##63d9ea}{#1}");
	defineMacro("\\blueD", "\\textcolor{##11accd}{#1}");
	defineMacro("\\blueE", "\\textcolor{##0c7f99}{#1}");
	defineMacro("\\tealA", "\\textcolor{##94fff5}{#1}");
	defineMacro("\\tealB", "\\textcolor{##26edd5}{#1}");
	defineMacro("\\tealC", "\\textcolor{##01d1c1}{#1}");
	defineMacro("\\tealD", "\\textcolor{##01a995}{#1}");
	defineMacro("\\tealE", "\\textcolor{##208170}{#1}");
	defineMacro("\\greenA", "\\textcolor{##b6ffb0}{#1}");
	defineMacro("\\greenB", "\\textcolor{##8af281}{#1}");
	defineMacro("\\greenC", "\\textcolor{##74cf70}{#1}");
	defineMacro("\\greenD", "\\textcolor{##1fab54}{#1}");
	defineMacro("\\greenE", "\\textcolor{##0d923f}{#1}");
	defineMacro("\\goldA", "\\textcolor{##ffd0a9}{#1}");
	defineMacro("\\goldB", "\\textcolor{##ffbb71}{#1}");
	defineMacro("\\goldC", "\\textcolor{##ff9c39}{#1}");
	defineMacro("\\goldD", "\\textcolor{##e07d10}{#1}");
	defineMacro("\\goldE", "\\textcolor{##a75a05}{#1}");
	defineMacro("\\redA", "\\textcolor{##fca9a9}{#1}");
	defineMacro("\\redB", "\\textcolor{##ff8482}{#1}");
	defineMacro("\\redC", "\\textcolor{##f9685d}{#1}");
	defineMacro("\\redD", "\\textcolor{##e84d39}{#1}");
	defineMacro("\\redE", "\\textcolor{##bc2612}{#1}");
	defineMacro("\\maroonA", "\\textcolor{##ffbde0}{#1}");
	defineMacro("\\maroonB", "\\textcolor{##ff92c6}{#1}");
	defineMacro("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
	defineMacro("\\maroonD", "\\textcolor{##ca337c}{#1}");
	defineMacro("\\maroonE", "\\textcolor{##9e034e}{#1}");
	defineMacro("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
	defineMacro("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
	defineMacro("\\purpleC", "\\textcolor{##aa87ff}{#1}");
	defineMacro("\\purpleD", "\\textcolor{##7854ab}{#1}");
	defineMacro("\\purpleE", "\\textcolor{##543b78}{#1}");
	defineMacro("\\mintA", "\\textcolor{##f5f9e8}{#1}");
	defineMacro("\\mintB", "\\textcolor{##edf2df}{#1}");
	defineMacro("\\mintC", "\\textcolor{##e0e5cc}{#1}");
	defineMacro("\\grayA", "\\textcolor{##f6f7f7}{#1}");
	defineMacro("\\grayB", "\\textcolor{##f0f1f2}{#1}");
	defineMacro("\\grayC", "\\textcolor{##e3e5e6}{#1}");
	defineMacro("\\grayD", "\\textcolor{##d6d8da}{#1}");
	defineMacro("\\grayE", "\\textcolor{##babec2}{#1}");
	defineMacro("\\grayF", "\\textcolor{##888d93}{#1}");
	defineMacro("\\grayG", "\\textcolor{##626569}{#1}");
	defineMacro("\\grayH", "\\textcolor{##3b3e40}{#1}");
	defineMacro("\\grayI", "\\textcolor{##21242c}{#1}");
	defineMacro("\\kaBlue", "\\textcolor{##314453}{#1}");
	defineMacro("\\kaGreen", "\\textcolor{##71B307}{#1}");
	implicitCommands = {
		"^": true,
		"_": true,
		"\\limits": true,
		"\\nolimits": true
	};
	MacroExpander = class {
		constructor(input, settings, mode) {
			this.settings = void 0;
			this.expansionCount = void 0;
			this.lexer = void 0;
			this.macros = void 0;
			this.stack = void 0;
			this.mode = void 0;
			this.settings = settings;
			this.expansionCount = 0;
			this.feed(input);
			this.macros = new Namespace(macros, settings.macros);
			this.mode = mode;
			this.stack = [];
		}
		/**
		* Feed a new input string to the same MacroExpander
		* (with existing macros etc.).
		*/
		feed(input) {
			this.lexer = new Lexer(input, this.settings);
		}
		/**
		* Switches between "text" and "math" modes.
		*/
		switchMode(newMode) {
			this.mode = newMode;
		}
		/**
		* Start a new group nesting within all namespaces.
		*/
		beginGroup() {
			this.macros.beginGroup();
		}
		/**
		* End current group nesting within all namespaces.
		*/
		endGroup() {
			this.macros.endGroup();
		}
		/**
		* Ends all currently nested groups (if any), restoring values before the
		* groups began.  Useful in case of an error in the middle of parsing.
		*/
		endGroups() {
			this.macros.endGroups();
		}
		/**
		* Returns the topmost token on the stack, without expanding it.
		* Similar in behavior to TeX's `\futurelet`.
		*/
		future() {
			if (this.stack.length === 0) this.pushToken(this.lexer.lex());
			return this.stack[this.stack.length - 1];
		}
		/**
		* Remove and return the next unexpanded token.
		*/
		popToken() {
			this.future();
			return this.stack.pop();
		}
		/**
		* Add a given token to the token stack.  In particular, this get be used
		* to put back a token returned from one of the other methods.
		*/
		pushToken(token) {
			this.stack.push(token);
		}
		/**
		* Append an array of tokens to the token stack.
		*/
		pushTokens(tokens) {
			this.stack.push(...tokens);
		}
		/**
		* Find an macro argument without expanding tokens and append the array of
		* tokens to the token stack. Uses Token as a container for the result.
		*/
		scanArgument(isOptional) {
			var start;
			var end;
			var tokens;
			if (isOptional) {
				this.consumeSpaces();
				if (this.future().text !== "[") return null;
				start = this.popToken();
				({tokens, end} = this.consumeArg(["]"]));
			} else ({tokens, start, end} = this.consumeArg());
			this.pushToken(new Token("EOF", end.loc));
			this.pushTokens(tokens);
			return new Token("", SourceLocation.range(start, end));
		}
		/**
		* Consume all following space tokens, without expansion.
		*/
		consumeSpaces() {
			for (;;) if (this.future().text === " ") this.stack.pop();
			else break;
		}
		/**
		* Consume an argument from the token stream, and return the resulting array
		* of tokens and start/end token.
		*/
		consumeArg(delims) {
			var tokens = [];
			var isDelimited = delims && delims.length > 0;
			if (!isDelimited) this.consumeSpaces();
			var start = this.future();
			var tok;
			var depth = 0;
			var match = 0;
			do {
				tok = this.popToken();
				tokens.push(tok);
				if (tok.text === "{") ++depth;
				else if (tok.text === "}") {
					--depth;
					if (depth === -1) throw new ParseError("Extra }", tok);
				} else if (tok.text === "EOF") throw new ParseError("Unexpected end of input in a macro argument, expected '" + (delims && isDelimited ? delims[match] : "}") + "'", tok);
				if (delims && isDelimited) if ((depth === 0 || depth === 1 && delims[match] === "{") && tok.text === delims[match]) {
					++match;
					if (match === delims.length) {
						tokens.splice(-match, match);
						break;
					}
				} else match = 0;
			} while (depth !== 0 || isDelimited);
			if (start.text === "{" && tokens[tokens.length - 1].text === "}") {
				tokens.pop();
				tokens.shift();
			}
			tokens.reverse();
			return {
				tokens,
				start,
				end: tok
			};
		}
		/**
		* Consume the specified number of (delimited) arguments from the token
		* stream and return the resulting array of arguments.
		*/
		consumeArgs(numArgs, delimiters) {
			if (delimiters) {
				if (delimiters.length !== numArgs + 1) throw new ParseError("The length of delimiters doesn't match the number of args!");
				var delims = delimiters[0];
				for (var i = 0; i < delims.length; i++) {
					var tok = this.popToken();
					if (delims[i] !== tok.text) throw new ParseError("Use of the macro doesn't match its definition", tok);
				}
			}
			var args = [];
			for (var _i = 0; _i < numArgs; _i++) args.push(this.consumeArg(delimiters && delimiters[_i + 1]).tokens);
			return args;
		}
		/**
		* Increment `expansionCount` by the specified amount.
		* Throw an error if it exceeds `maxExpand`.
		*/
		countExpansion(amount) {
			this.expansionCount += amount;
			if (this.expansionCount > this.settings.maxExpand) throw new ParseError("Too many expansions: infinite loop or need to increase maxExpand setting");
		}
		/**
		* Expand the next token only once if possible.
		*
		* If the token is expanded, the resulting tokens will be pushed onto
		* the stack in reverse order, and the number of such tokens will be
		* returned.  This number might be zero or positive.
		*
		* If not, the return value is `false`, and the next token remains at the
		* top of the stack.
		*
		* In either case, the next token will be on the top of the stack,
		* or the stack will be empty (in case of empty expansion
		* and no other tokens).
		*
		* Used to implement `expandAfterFuture` and `expandNextToken`.
		*
		* If expandableOnly, only expandable tokens are expanded and
		* an undefined control sequence results in an error.
		*/
		expandOnce(expandableOnly) {
			var topToken = this.popToken();
			var name = topToken.text;
			var expansion = !topToken.noexpand ? this._getExpansion(name) : null;
			if (expansion == null || expandableOnly && expansion.unexpandable) {
				if (expandableOnly && expansion == null && name[0] === "\\" && !this.isDefined(name)) throw new ParseError("Undefined control sequence: " + name);
				this.pushToken(topToken);
				return false;
			}
			this.countExpansion(1);
			var tokens = expansion.tokens;
			var args = this.consumeArgs(expansion.numArgs, expansion.delimiters);
			if (expansion.numArgs) {
				tokens = tokens.slice();
				for (var i = tokens.length - 1; i >= 0; --i) {
					var tok = tokens[i];
					if (tok.text === "#") {
						if (i === 0) throw new ParseError("Incomplete placeholder at end of macro body", tok);
						tok = tokens[--i];
						if (tok.text === "#") tokens.splice(i + 1, 1);
						else if (/^[1-9]$/.test(tok.text)) tokens.splice(i, 2, ...args[+tok.text - 1]);
						else throw new ParseError("Not a valid argument number", tok);
					}
				}
			}
			this.pushTokens(tokens);
			return tokens.length;
		}
		/**
		* Expand the next token only once (if possible), and return the resulting
		* top token on the stack (without removing anything from the stack).
		* Similar in behavior to TeX's `\expandafter\futurelet`.
		* Equivalent to expandOnce() followed by future().
		*/
		expandAfterFuture() {
			this.expandOnce();
			return this.future();
		}
		/**
		* Recursively expand first token, then return first non-expandable token.
		*/
		expandNextToken() {
			for (;;) if (this.expandOnce() === false) {
				var token = this.stack.pop();
				if (token.treatAsRelax) token.text = "\\relax";
				return token;
			}
			throw new Error();
		}
		/**
		* Fully expand the given macro name and return the resulting list of
		* tokens, or return `undefined` if no such macro is defined.
		*/
		expandMacro(name) {
			return this.macros.has(name) ? this.expandTokens([new Token(name)]) : void 0;
		}
		/**
		* Fully expand the given token stream and return the resulting list of
		* tokens.  Note that the input tokens are in reverse order, but the
		* output tokens are in forward order.
		*/
		expandTokens(tokens) {
			var output = [];
			var oldStackLength = this.stack.length;
			this.pushTokens(tokens);
			while (this.stack.length > oldStackLength) if (this.expandOnce(true) === false) {
				var token = this.stack.pop();
				if (token.treatAsRelax) {
					token.noexpand = false;
					token.treatAsRelax = false;
				}
				output.push(token);
			}
			this.countExpansion(output.length);
			return output;
		}
		/**
		* Fully expand the given macro name and return the result as a string,
		* or return `undefined` if no such macro is defined.
		*/
		expandMacroAsText(name) {
			var tokens = this.expandMacro(name);
			if (tokens) return tokens.map((token) => token.text).join("");
			else return tokens;
		}
		/**
		* Returns the expanded macro as a reversed array of tokens and a macro
		* argument count.  Or returns `null` if no such macro.
		*/
		_getExpansion(name) {
			var definition = this.macros.get(name);
			if (definition == null) return definition;
			if (name.length === 1) {
				var catcode = this.lexer.catcodes[name];
				if (catcode != null && catcode !== 13) return;
			}
			var expansion = typeof definition === "function" ? definition(this) : definition;
			if (typeof expansion === "string") {
				var numArgs = 0;
				if (expansion.indexOf("#") !== -1) {
					var stripped = expansion.replace(/##/g, "");
					while (stripped.indexOf("#" + (numArgs + 1)) !== -1) ++numArgs;
				}
				var bodyLexer = new Lexer(expansion, this.settings);
				var tokens = [];
				var tok = bodyLexer.lex();
				while (tok.text !== "EOF") {
					tokens.push(tok);
					tok = bodyLexer.lex();
				}
				tokens.reverse();
				return {
					tokens,
					numArgs
				};
			}
			return expansion;
		}
		/**
		* Determine whether a command is currently "defined" (has some
		* functionality), meaning that it's a macro (in the current group),
		* a function, a symbol, or one of the special commands listed in
		* `implicitCommands`.
		*/
		isDefined(name) {
			return this.macros.has(name) || functions.hasOwnProperty(name) || symbols.math.hasOwnProperty(name) || symbols.text.hasOwnProperty(name) || implicitCommands.hasOwnProperty(name);
		}
		/**
		* Determine whether a command is expandable.
		*/
		isExpandable(name) {
			var macro = this.macros.get(name);
			return macro != null ? typeof macro === "string" || typeof macro === "function" || !macro.unexpandable : functions.hasOwnProperty(name) && !functions[name].primitive;
		}
	};
	unicodeSubRegEx = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/;
	uSubsAndSups = Object.freeze({
		"₊": "+",
		"₋": "-",
		"₌": "=",
		"₍": "(",
		"₎": ")",
		"₀": "0",
		"₁": "1",
		"₂": "2",
		"₃": "3",
		"₄": "4",
		"₅": "5",
		"₆": "6",
		"₇": "7",
		"₈": "8",
		"₉": "9",
		"ₐ": "a",
		"ₑ": "e",
		"ₕ": "h",
		"ᵢ": "i",
		"ⱼ": "j",
		"ₖ": "k",
		"ₗ": "l",
		"ₘ": "m",
		"ₙ": "n",
		"ₒ": "o",
		"ₚ": "p",
		"ᵣ": "r",
		"ₛ": "s",
		"ₜ": "t",
		"ᵤ": "u",
		"ᵥ": "v",
		"ₓ": "x",
		"ᵦ": "β",
		"ᵧ": "γ",
		"ᵨ": "ρ",
		"ᵩ": "ϕ",
		"ᵪ": "χ",
		"⁺": "+",
		"⁻": "-",
		"⁼": "=",
		"⁽": "(",
		"⁾": ")",
		"⁰": "0",
		"¹": "1",
		"²": "2",
		"³": "3",
		"⁴": "4",
		"⁵": "5",
		"⁶": "6",
		"⁷": "7",
		"⁸": "8",
		"⁹": "9",
		"ᴬ": "A",
		"ᴮ": "B",
		"ᴰ": "D",
		"ᴱ": "E",
		"ᴳ": "G",
		"ᴴ": "H",
		"ᴵ": "I",
		"ᴶ": "J",
		"ᴷ": "K",
		"ᴸ": "L",
		"ᴹ": "M",
		"ᴺ": "N",
		"ᴼ": "O",
		"ᴾ": "P",
		"ᴿ": "R",
		"ᵀ": "T",
		"ᵁ": "U",
		"ⱽ": "V",
		"ᵂ": "W",
		"ᵃ": "a",
		"ᵇ": "b",
		"ᶜ": "c",
		"ᵈ": "d",
		"ᵉ": "e",
		"ᶠ": "f",
		"ᵍ": "g",
		"ʰ": "h",
		"ⁱ": "i",
		"ʲ": "j",
		"ᵏ": "k",
		"ˡ": "l",
		"ᵐ": "m",
		"ⁿ": "n",
		"ᵒ": "o",
		"ᵖ": "p",
		"ʳ": "r",
		"ˢ": "s",
		"ᵗ": "t",
		"ᵘ": "u",
		"ᵛ": "v",
		"ʷ": "w",
		"ˣ": "x",
		"ʸ": "y",
		"ᶻ": "z",
		"ᵝ": "β",
		"ᵞ": "γ",
		"ᵟ": "δ",
		"ᵠ": "ϕ",
		"ᵡ": "χ",
		"ᶿ": "θ"
	});
	unicodeAccents = {
		"́": {
			"text": "\\'",
			"math": "\\acute"
		},
		"̀": {
			"text": "\\`",
			"math": "\\grave"
		},
		"̈": {
			"text": "\\\"",
			"math": "\\ddot"
		},
		"̃": {
			"text": "\\~",
			"math": "\\tilde"
		},
		"̄": {
			"text": "\\=",
			"math": "\\bar"
		},
		"̆": {
			"text": "\\u",
			"math": "\\breve"
		},
		"̌": {
			"text": "\\v",
			"math": "\\check"
		},
		"̂": {
			"text": "\\^",
			"math": "\\hat"
		},
		"̇": {
			"text": "\\.",
			"math": "\\dot"
		},
		"̊": {
			"text": "\\r",
			"math": "\\mathring"
		},
		"̋": { "text": "\\H" },
		"̧": { "text": "\\c" }
	};
	unicodeSymbols = {
		"á": "á",
		"à": "à",
		"ä": "ä",
		"ǟ": "ǟ",
		"ã": "ã",
		"ā": "ā",
		"ă": "ă",
		"ắ": "ắ",
		"ằ": "ằ",
		"ẵ": "ẵ",
		"ǎ": "ǎ",
		"â": "â",
		"ấ": "ấ",
		"ầ": "ầ",
		"ẫ": "ẫ",
		"ȧ": "ȧ",
		"ǡ": "ǡ",
		"å": "å",
		"ǻ": "ǻ",
		"ḃ": "ḃ",
		"ć": "ć",
		"ḉ": "ḉ",
		"č": "č",
		"ĉ": "ĉ",
		"ċ": "ċ",
		"ç": "ç",
		"ď": "ď",
		"ḋ": "ḋ",
		"ḑ": "ḑ",
		"é": "é",
		"è": "è",
		"ë": "ë",
		"ẽ": "ẽ",
		"ē": "ē",
		"ḗ": "ḗ",
		"ḕ": "ḕ",
		"ĕ": "ĕ",
		"ḝ": "ḝ",
		"ě": "ě",
		"ê": "ê",
		"ế": "ế",
		"ề": "ề",
		"ễ": "ễ",
		"ė": "ė",
		"ȩ": "ȩ",
		"ḟ": "ḟ",
		"ǵ": "ǵ",
		"ḡ": "ḡ",
		"ğ": "ğ",
		"ǧ": "ǧ",
		"ĝ": "ĝ",
		"ġ": "ġ",
		"ģ": "ģ",
		"ḧ": "ḧ",
		"ȟ": "ȟ",
		"ĥ": "ĥ",
		"ḣ": "ḣ",
		"ḩ": "ḩ",
		"í": "í",
		"ì": "ì",
		"ï": "ï",
		"ḯ": "ḯ",
		"ĩ": "ĩ",
		"ī": "ī",
		"ĭ": "ĭ",
		"ǐ": "ǐ",
		"î": "î",
		"ǰ": "ǰ",
		"ĵ": "ĵ",
		"ḱ": "ḱ",
		"ǩ": "ǩ",
		"ķ": "ķ",
		"ĺ": "ĺ",
		"ľ": "ľ",
		"ļ": "ļ",
		"ḿ": "ḿ",
		"ṁ": "ṁ",
		"ń": "ń",
		"ǹ": "ǹ",
		"ñ": "ñ",
		"ň": "ň",
		"ṅ": "ṅ",
		"ņ": "ņ",
		"ó": "ó",
		"ò": "ò",
		"ö": "ö",
		"ȫ": "ȫ",
		"õ": "õ",
		"ṍ": "ṍ",
		"ṏ": "ṏ",
		"ȭ": "ȭ",
		"ō": "ō",
		"ṓ": "ṓ",
		"ṑ": "ṑ",
		"ŏ": "ŏ",
		"ǒ": "ǒ",
		"ô": "ô",
		"ố": "ố",
		"ồ": "ồ",
		"ỗ": "ỗ",
		"ȯ": "ȯ",
		"ȱ": "ȱ",
		"ő": "ő",
		"ṕ": "ṕ",
		"ṗ": "ṗ",
		"ŕ": "ŕ",
		"ř": "ř",
		"ṙ": "ṙ",
		"ŗ": "ŗ",
		"ś": "ś",
		"ṥ": "ṥ",
		"š": "š",
		"ṧ": "ṧ",
		"ŝ": "ŝ",
		"ṡ": "ṡ",
		"ş": "ş",
		"ẗ": "ẗ",
		"ť": "ť",
		"ṫ": "ṫ",
		"ţ": "ţ",
		"ú": "ú",
		"ù": "ù",
		"ü": "ü",
		"ǘ": "ǘ",
		"ǜ": "ǜ",
		"ǖ": "ǖ",
		"ǚ": "ǚ",
		"ũ": "ũ",
		"ṹ": "ṹ",
		"ū": "ū",
		"ṻ": "ṻ",
		"ŭ": "ŭ",
		"ǔ": "ǔ",
		"û": "û",
		"ů": "ů",
		"ű": "ű",
		"ṽ": "ṽ",
		"ẃ": "ẃ",
		"ẁ": "ẁ",
		"ẅ": "ẅ",
		"ŵ": "ŵ",
		"ẇ": "ẇ",
		"ẘ": "ẘ",
		"ẍ": "ẍ",
		"ẋ": "ẋ",
		"ý": "ý",
		"ỳ": "ỳ",
		"ÿ": "ÿ",
		"ỹ": "ỹ",
		"ȳ": "ȳ",
		"ŷ": "ŷ",
		"ẏ": "ẏ",
		"ẙ": "ẙ",
		"ź": "ź",
		"ž": "ž",
		"ẑ": "ẑ",
		"ż": "ż",
		"Á": "Á",
		"À": "À",
		"Ä": "Ä",
		"Ǟ": "Ǟ",
		"Ã": "Ã",
		"Ā": "Ā",
		"Ă": "Ă",
		"Ắ": "Ắ",
		"Ằ": "Ằ",
		"Ẵ": "Ẵ",
		"Ǎ": "Ǎ",
		"Â": "Â",
		"Ấ": "Ấ",
		"Ầ": "Ầ",
		"Ẫ": "Ẫ",
		"Ȧ": "Ȧ",
		"Ǡ": "Ǡ",
		"Å": "Å",
		"Ǻ": "Ǻ",
		"Ḃ": "Ḃ",
		"Ć": "Ć",
		"Ḉ": "Ḉ",
		"Č": "Č",
		"Ĉ": "Ĉ",
		"Ċ": "Ċ",
		"Ç": "Ç",
		"Ď": "Ď",
		"Ḋ": "Ḋ",
		"Ḑ": "Ḑ",
		"É": "É",
		"È": "È",
		"Ë": "Ë",
		"Ẽ": "Ẽ",
		"Ē": "Ē",
		"Ḗ": "Ḗ",
		"Ḕ": "Ḕ",
		"Ĕ": "Ĕ",
		"Ḝ": "Ḝ",
		"Ě": "Ě",
		"Ê": "Ê",
		"Ế": "Ế",
		"Ề": "Ề",
		"Ễ": "Ễ",
		"Ė": "Ė",
		"Ȩ": "Ȩ",
		"Ḟ": "Ḟ",
		"Ǵ": "Ǵ",
		"Ḡ": "Ḡ",
		"Ğ": "Ğ",
		"Ǧ": "Ǧ",
		"Ĝ": "Ĝ",
		"Ġ": "Ġ",
		"Ģ": "Ģ",
		"Ḧ": "Ḧ",
		"Ȟ": "Ȟ",
		"Ĥ": "Ĥ",
		"Ḣ": "Ḣ",
		"Ḩ": "Ḩ",
		"Í": "Í",
		"Ì": "Ì",
		"Ï": "Ï",
		"Ḯ": "Ḯ",
		"Ĩ": "Ĩ",
		"Ī": "Ī",
		"Ĭ": "Ĭ",
		"Ǐ": "Ǐ",
		"Î": "Î",
		"İ": "İ",
		"Ĵ": "Ĵ",
		"Ḱ": "Ḱ",
		"Ǩ": "Ǩ",
		"Ķ": "Ķ",
		"Ĺ": "Ĺ",
		"Ľ": "Ľ",
		"Ļ": "Ļ",
		"Ḿ": "Ḿ",
		"Ṁ": "Ṁ",
		"Ń": "Ń",
		"Ǹ": "Ǹ",
		"Ñ": "Ñ",
		"Ň": "Ň",
		"Ṅ": "Ṅ",
		"Ņ": "Ņ",
		"Ó": "Ó",
		"Ò": "Ò",
		"Ö": "Ö",
		"Ȫ": "Ȫ",
		"Õ": "Õ",
		"Ṍ": "Ṍ",
		"Ṏ": "Ṏ",
		"Ȭ": "Ȭ",
		"Ō": "Ō",
		"Ṓ": "Ṓ",
		"Ṑ": "Ṑ",
		"Ŏ": "Ŏ",
		"Ǒ": "Ǒ",
		"Ô": "Ô",
		"Ố": "Ố",
		"Ồ": "Ồ",
		"Ỗ": "Ỗ",
		"Ȯ": "Ȯ",
		"Ȱ": "Ȱ",
		"Ő": "Ő",
		"Ṕ": "Ṕ",
		"Ṗ": "Ṗ",
		"Ŕ": "Ŕ",
		"Ř": "Ř",
		"Ṙ": "Ṙ",
		"Ŗ": "Ŗ",
		"Ś": "Ś",
		"Ṥ": "Ṥ",
		"Š": "Š",
		"Ṧ": "Ṧ",
		"Ŝ": "Ŝ",
		"Ṡ": "Ṡ",
		"Ş": "Ş",
		"Ť": "Ť",
		"Ṫ": "Ṫ",
		"Ţ": "Ţ",
		"Ú": "Ú",
		"Ù": "Ù",
		"Ü": "Ü",
		"Ǘ": "Ǘ",
		"Ǜ": "Ǜ",
		"Ǖ": "Ǖ",
		"Ǚ": "Ǚ",
		"Ũ": "Ũ",
		"Ṹ": "Ṹ",
		"Ū": "Ū",
		"Ṻ": "Ṻ",
		"Ŭ": "Ŭ",
		"Ǔ": "Ǔ",
		"Û": "Û",
		"Ů": "Ů",
		"Ű": "Ű",
		"Ṽ": "Ṽ",
		"Ẃ": "Ẃ",
		"Ẁ": "Ẁ",
		"Ẅ": "Ẅ",
		"Ŵ": "Ŵ",
		"Ẇ": "Ẇ",
		"Ẍ": "Ẍ",
		"Ẋ": "Ẋ",
		"Ý": "Ý",
		"Ỳ": "Ỳ",
		"Ÿ": "Ÿ",
		"Ỹ": "Ỹ",
		"Ȳ": "Ȳ",
		"Ŷ": "Ŷ",
		"Ẏ": "Ẏ",
		"Ź": "Ź",
		"Ž": "Ž",
		"Ẑ": "Ẑ",
		"Ż": "Ż",
		"ά": "ά",
		"ὰ": "ὰ",
		"ᾱ": "ᾱ",
		"ᾰ": "ᾰ",
		"έ": "έ",
		"ὲ": "ὲ",
		"ή": "ή",
		"ὴ": "ὴ",
		"ί": "ί",
		"ὶ": "ὶ",
		"ϊ": "ϊ",
		"ΐ": "ΐ",
		"ῒ": "ῒ",
		"ῑ": "ῑ",
		"ῐ": "ῐ",
		"ό": "ό",
		"ὸ": "ὸ",
		"ύ": "ύ",
		"ὺ": "ὺ",
		"ϋ": "ϋ",
		"ΰ": "ΰ",
		"ῢ": "ῢ",
		"ῡ": "ῡ",
		"ῠ": "ῠ",
		"ώ": "ώ",
		"ὼ": "ὼ",
		"Ύ": "Ύ",
		"Ὺ": "Ὺ",
		"Ϋ": "Ϋ",
		"Ῡ": "Ῡ",
		"Ῠ": "Ῠ",
		"Ώ": "Ώ",
		"Ὼ": "Ὼ"
	};
	Parser = class Parser {
		constructor(input, settings) {
			this.mode = void 0;
			this.gullet = void 0;
			this.settings = void 0;
			this.leftrightDepth = void 0;
			this.nextToken = void 0;
			this.mode = "math";
			this.gullet = new MacroExpander(input, settings, this.mode);
			this.settings = settings;
			this.leftrightDepth = 0;
		}
		/**
		* Checks a result to make sure it has the right type, and throws an
		* appropriate error otherwise.
		*/
		expect(text, consume) {
			if (consume === void 0) consume = true;
			if (this.fetch().text !== text) throw new ParseError("Expected '" + text + "', got '" + this.fetch().text + "'", this.fetch());
			if (consume) this.consume();
		}
		/**
		* Discards the current lookahead token, considering it consumed.
		*/
		consume() {
			this.nextToken = null;
		}
		/**
		* Return the current lookahead token, or if there isn't one (at the
		* beginning, or if the previous lookahead token was consume()d),
		* fetch the next token as the new lookahead token and return it.
		*/
		fetch() {
			if (this.nextToken == null) this.nextToken = this.gullet.expandNextToken();
			return this.nextToken;
		}
		/**
		* Switches between "text" and "math" modes.
		*/
		switchMode(newMode) {
			this.mode = newMode;
			this.gullet.switchMode(newMode);
		}
		/**
		* Main parsing function, which parses an entire input.
		*/
		parse() {
			if (!this.settings.globalGroup) this.gullet.beginGroup();
			if (this.settings.colorIsTextColor) this.gullet.macros.set("\\color", "\\textcolor");
			try {
				var parse = this.parseExpression(false);
				this.expect("EOF");
				if (!this.settings.globalGroup) this.gullet.endGroup();
				return parse;
			} finally {
				this.gullet.endGroups();
			}
		}
		/**
		* Fully parse a separate sequence of tokens as a separate job.
		* Tokens should be specified in reverse order, as in a MacroDefinition.
		*/
		subparse(tokens) {
			var oldToken = this.nextToken;
			this.consume();
			this.gullet.pushToken(new Token("}"));
			this.gullet.pushTokens(tokens);
			var parse = this.parseExpression(false);
			this.expect("}");
			this.nextToken = oldToken;
			return parse;
		}
		/**
		* Parses an "expression", which is a list of atoms.
		*
		* `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
		*                 happens when functions have higher precedence han infix
		*                 nodes in implicit parses.
		*
		* `breakOnTokenText`: The text of the token that the expression should end
		*                     with, or `null` if something else should end the
		*                     expression.
		*/
		parseExpression(breakOnInfix, breakOnTokenText) {
			var body = [];
			while (true) {
				if (this.mode === "math") this.consumeSpaces();
				var lex = this.fetch();
				if (Parser.endOfExpression.indexOf(lex.text) !== -1) break;
				if (breakOnTokenText && lex.text === breakOnTokenText) break;
				if (breakOnInfix && functions[lex.text] && functions[lex.text].infix) break;
				var atom = this.parseAtom(breakOnTokenText);
				if (!atom) break;
				else if (atom.type === "internal") continue;
				body.push(atom);
			}
			if (this.mode === "text") this.formLigatures(body);
			return this.handleInfixNodes(body);
		}
		/**
		* Rewrites infix operators such as \over with corresponding commands such
		* as \frac.
		*
		* There can only be one infix operator per group.  If there's more than one
		* then the expression is ambiguous.  This can be resolved by adding {}.
		*/
		handleInfixNodes(body) {
			var overIndex = -1;
			var funcName;
			for (var i = 0; i < body.length; i++) if (body[i].type === "infix") {
				if (overIndex !== -1) throw new ParseError("only one infix operator per group", body[i].token);
				overIndex = i;
				funcName = body[i].replaceWith;
			}
			if (overIndex !== -1 && funcName) {
				var numerNode;
				var denomNode;
				var numerBody = body.slice(0, overIndex);
				var denomBody = body.slice(overIndex + 1);
				if (numerBody.length === 1 && numerBody[0].type === "ordgroup") numerNode = numerBody[0];
				else numerNode = {
					type: "ordgroup",
					mode: this.mode,
					body: numerBody
				};
				if (denomBody.length === 1 && denomBody[0].type === "ordgroup") denomNode = denomBody[0];
				else denomNode = {
					type: "ordgroup",
					mode: this.mode,
					body: denomBody
				};
				var node;
				if (funcName === "\\\\abovefrac") node = this.callFunction(funcName, [
					numerNode,
					body[overIndex],
					denomNode
				], []);
				else node = this.callFunction(funcName, [numerNode, denomNode], []);
				return [node];
			} else return body;
		}
		/**
		* Handle a subscript or superscript with nice errors.
		*/
		handleSupSubscript(name) {
			var symbolToken = this.fetch();
			var symbol = symbolToken.text;
			this.consume();
			this.consumeSpaces();
			var group;
			do {
				var _group;
				group = this.parseGroup(name);
			} while (((_group = group) == null ? void 0 : _group.type) === "internal");
			if (!group) throw new ParseError("Expected group after '" + symbol + "'", symbolToken);
			return group;
		}
		/**
		* Converts the textual input of an unsupported command into a text node
		* contained within a color node whose color is determined by errorColor
		*/
		formatUnsupportedCmd(text) {
			var textordArray = [];
			for (var i = 0; i < text.length; i++) textordArray.push({
				type: "textord",
				mode: "text",
				text: text[i]
			});
			var textNode = {
				type: "text",
				mode: this.mode,
				body: textordArray
			};
			return {
				type: "color",
				mode: this.mode,
				color: this.settings.errorColor,
				body: [textNode]
			};
		}
		/**
		* Parses a group with optional super/subscripts.
		*/
		parseAtom(breakOnTokenText) {
			var base = this.parseGroup("atom", breakOnTokenText);
			if ((base == null ? void 0 : base.type) === "internal") return base;
			if (this.mode === "text") return base;
			var superscript;
			var subscript;
			while (true) {
				this.consumeSpaces();
				var lex = this.fetch();
				if (lex.text === "\\limits" || lex.text === "\\nolimits") {
					if (base && base.type === "op") {
						base.limits = lex.text === "\\limits";
						base.alwaysHandleSupSub = true;
					} else if (base && base.type === "operatorname") {
						if (base.alwaysHandleSupSub) base.limits = lex.text === "\\limits";
					} else throw new ParseError("Limit controls must follow a math operator", lex);
					this.consume();
				} else if (lex.text === "^") {
					if (superscript) throw new ParseError("Double superscript", lex);
					superscript = this.handleSupSubscript("superscript");
				} else if (lex.text === "_") {
					if (subscript) throw new ParseError("Double subscript", lex);
					subscript = this.handleSupSubscript("subscript");
				} else if (lex.text === "'") {
					if (superscript) throw new ParseError("Double superscript", lex);
					var prime = {
						type: "textord",
						mode: this.mode,
						text: "\\prime"
					};
					var primes = [prime];
					this.consume();
					while (this.fetch().text === "'") {
						primes.push(prime);
						this.consume();
					}
					if (this.fetch().text === "^") primes.push(this.handleSupSubscript("superscript"));
					superscript = {
						type: "ordgroup",
						mode: this.mode,
						body: primes
					};
				} else if (uSubsAndSups[lex.text]) {
					var isSub = unicodeSubRegEx.test(lex.text);
					var subsupTokens = [];
					subsupTokens.push(new Token(uSubsAndSups[lex.text]));
					this.consume();
					while (true) {
						var token = this.fetch().text;
						if (!uSubsAndSups[token]) break;
						if (unicodeSubRegEx.test(token) !== isSub) break;
						subsupTokens.unshift(new Token(uSubsAndSups[token]));
						this.consume();
					}
					var body = this.subparse(subsupTokens);
					if (isSub) subscript = {
						type: "ordgroup",
						mode: "math",
						body
					};
					else superscript = {
						type: "ordgroup",
						mode: "math",
						body
					};
				} else break;
			}
			if (superscript || subscript) return {
				type: "supsub",
				mode: this.mode,
				base,
				sup: superscript,
				sub: subscript
			};
			else return base;
		}
		/**
		* Parses an entire function, including its base and all of its arguments.
		*/
		parseFunction(breakOnTokenText, name) {
			var token = this.fetch();
			var func = token.text;
			var funcData = functions[func];
			if (!funcData) return null;
			this.consume();
			if (name && name !== "atom" && !funcData.allowedInArgument) throw new ParseError("Got function '" + func + "' with no arguments" + (name ? " as " + name : ""), token);
			else if (this.mode === "text" && !funcData.allowedInText) throw new ParseError("Can't use function '" + func + "' in text mode", token);
			else if (this.mode === "math" && funcData.allowedInMath === false) throw new ParseError("Can't use function '" + func + "' in math mode", token);
			var { args, optArgs } = this.parseArguments(func, funcData);
			return this.callFunction(func, args, optArgs, token, breakOnTokenText);
		}
		/**
		* Call a function handler with a suitable context and arguments.
		*/
		callFunction(name, args, optArgs, token, breakOnTokenText) {
			var context = {
				funcName: name,
				parser: this,
				token,
				breakOnTokenText
			};
			var func = functions[name];
			if (func && func.handler) return func.handler(context, args, optArgs);
			else throw new ParseError("No function handler for " + name);
		}
		/**
		* Parses the arguments of a function or environment
		*/
		parseArguments(func, funcData) {
			var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
			if (totalArgs === 0) return {
				args: [],
				optArgs: []
			};
			var args = [];
			var optArgs = [];
			for (var i = 0; i < totalArgs; i++) {
				var argType = funcData.argTypes && funcData.argTypes[i];
				var isOptional = i < funcData.numOptionalArgs;
				if (funcData.primitive && argType == null || funcData.type === "sqrt" && i === 1 && optArgs[0] == null) argType = "primitive";
				var arg = this.parseGroupOfType("argument to '" + func + "'", argType, isOptional);
				if (isOptional) optArgs.push(arg);
				else if (arg != null) args.push(arg);
				else throw new ParseError("Null argument, please report this as a bug");
			}
			return {
				args,
				optArgs
			};
		}
		/**
		* Parses a group when the mode is changing.
		*/
		parseGroupOfType(name, type, optional) {
			switch (type) {
				case "color": return this.parseColorGroup(optional);
				case "size": return this.parseSizeGroup(optional);
				case "url": return this.parseUrlGroup(optional);
				case "math":
				case "text": return this.parseArgumentGroup(optional, type);
				case "hbox":
					var group = this.parseArgumentGroup(optional, "text");
					return group != null ? {
						type: "styling",
						mode: group.mode,
						body: [group],
						style: "text"
					} : null;
				case "raw":
					var token = this.parseStringGroup("raw", optional);
					return token != null ? {
						type: "raw",
						mode: "text",
						string: token.text
					} : null;
				case "primitive":
					if (optional) throw new ParseError("A primitive argument cannot be optional");
					var _group2 = this.parseGroup(name);
					if (_group2 == null) throw new ParseError("Expected group as " + name, this.fetch());
					return _group2;
				case "original":
				case null:
				case void 0: return this.parseArgumentGroup(optional);
				default: throw new ParseError("Unknown group type as " + name, this.fetch());
			}
		}
		/**
		* Discard any space tokens, fetching the next non-space token.
		*/
		consumeSpaces() {
			while (this.fetch().text === " ") this.consume();
		}
		/**
		* Parses a group, essentially returning the string formed by the
		* brace-enclosed tokens plus some position information.
		*/
		parseStringGroup(modeName, optional) {
			var argToken = this.gullet.scanArgument(optional);
			if (argToken == null) return null;
			var str = "";
			var nextToken;
			while ((nextToken = this.fetch()).text !== "EOF") {
				str += nextToken.text;
				this.consume();
			}
			this.consume();
			argToken.text = str;
			return argToken;
		}
		/**
		* Parses a regex-delimited group: the largest sequence of tokens
		* whose concatenated strings match `regex`. Returns the string
		* formed by the tokens plus some position information.
		*/
		parseRegexGroup(regex, modeName) {
			var firstToken = this.fetch();
			var lastToken = firstToken;
			var str = "";
			var nextToken;
			while ((nextToken = this.fetch()).text !== "EOF" && regex.test(str + nextToken.text)) {
				lastToken = nextToken;
				str += lastToken.text;
				this.consume();
			}
			if (str === "") throw new ParseError("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
			return firstToken.range(lastToken, str);
		}
		/**
		* Parses a color description.
		*/
		parseColorGroup(optional) {
			var res = this.parseStringGroup("color", optional);
			if (res == null) return null;
			var match = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(res.text);
			if (!match) throw new ParseError("Invalid color: '" + res.text + "'", res);
			var color = match[0];
			if (/^[0-9a-f]{6}$/i.test(color)) color = "#" + color;
			return {
				type: "color-token",
				mode: this.mode,
				color
			};
		}
		/**
		* Parses a size specification, consisting of magnitude and unit.
		*/
		parseSizeGroup(optional) {
			var res;
			var isBlank = false;
			this.gullet.consumeSpaces();
			if (!optional && this.gullet.future().text !== "{") res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
			else res = this.parseStringGroup("size", optional);
			if (!res) return null;
			if (!optional && res.text.length === 0) {
				res.text = "0pt";
				isBlank = true;
			}
			var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);
			if (!match) throw new ParseError("Invalid size: '" + res.text + "'", res);
			var data = {
				number: +(match[1] + match[2]),
				unit: match[3]
			};
			if (!validUnit(data)) throw new ParseError("Invalid unit: '" + data.unit + "'", res);
			return {
				type: "size",
				mode: this.mode,
				value: data,
				isBlank
			};
		}
		/**
		* Parses an URL, checking escaped letters and allowed protocols,
		* and setting the catcode of % as an active character (as in \hyperref).
		*/
		parseUrlGroup(optional) {
			this.gullet.lexer.setCatcode("%", 13);
			this.gullet.lexer.setCatcode("~", 12);
			var res = this.parseStringGroup("url", optional);
			this.gullet.lexer.setCatcode("%", 14);
			this.gullet.lexer.setCatcode("~", 13);
			if (res == null) return null;
			var url = res.text.replace(/\\([#$%&~_^{}])/g, "$1");
			return {
				type: "url",
				mode: this.mode,
				url
			};
		}
		/**
		* Parses an argument with the mode specified.
		*/
		parseArgumentGroup(optional, mode) {
			var argToken = this.gullet.scanArgument(optional);
			if (argToken == null) return null;
			var outerMode = this.mode;
			if (mode) this.switchMode(mode);
			this.gullet.beginGroup();
			var expression = this.parseExpression(false, "EOF");
			this.expect("EOF");
			this.gullet.endGroup();
			var result = {
				type: "ordgroup",
				mode: this.mode,
				loc: argToken.loc,
				body: expression
			};
			if (mode) this.switchMode(outerMode);
			return result;
		}
		/**
		* Parses an ordinary group, which is either a single nucleus (like "x")
		* or an expression in braces (like "{x+y}") or an implicit group, a group
		* that starts at the current position, and ends right before a higher explicit
		* group ends, or at EOF.
		*/
		parseGroup(name, breakOnTokenText) {
			var firstToken = this.fetch();
			var text = firstToken.text;
			var result;
			if (text === "{" || text === "\\begingroup") {
				this.consume();
				var groupEnd = text === "{" ? "}" : "\\endgroup";
				this.gullet.beginGroup();
				var expression = this.parseExpression(false, groupEnd);
				var lastToken = this.fetch();
				this.expect(groupEnd);
				this.gullet.endGroup();
				result = {
					type: "ordgroup",
					mode: this.mode,
					loc: SourceLocation.range(firstToken, lastToken),
					body: expression,
					semisimple: text === "\\begingroup" || void 0
				};
			} else {
				result = this.parseFunction(breakOnTokenText, name) || this.parseSymbol();
				if (result == null && text[0] === "\\" && !implicitCommands.hasOwnProperty(text)) {
					if (this.settings.throwOnError) throw new ParseError("Undefined control sequence: " + text, firstToken);
					result = this.formatUnsupportedCmd(text);
					this.consume();
				}
			}
			return result;
		}
		/**
		* Form ligature-like combinations of characters for text mode.
		* This includes inputs like "--", "---", "``" and "''".
		* The result will simply replace multiple textord nodes with a single
		* character in each value by a single textord node having multiple
		* characters in its value.  The representation is still ASCII source.
		* The group will be modified in place.
		*/
		formLigatures(group) {
			var n = group.length - 1;
			for (var i = 0; i < n; ++i) {
				var a = group[i];
				var v = a.text;
				if (v === "-" && group[i + 1].text === "-") if (i + 1 < n && group[i + 2].text === "-") {
					group.splice(i, 3, {
						type: "textord",
						mode: "text",
						loc: SourceLocation.range(a, group[i + 2]),
						text: "---"
					});
					n -= 2;
				} else {
					group.splice(i, 2, {
						type: "textord",
						mode: "text",
						loc: SourceLocation.range(a, group[i + 1]),
						text: "--"
					});
					n -= 1;
				}
				if ((v === "'" || v === "`") && group[i + 1].text === v) {
					group.splice(i, 2, {
						type: "textord",
						mode: "text",
						loc: SourceLocation.range(a, group[i + 1]),
						text: v + v
					});
					n -= 1;
				}
			}
		}
		/**
		* Parse a single symbol out of the string. Here, we handle single character
		* symbols and special functions like \verb.
		*/
		parseSymbol() {
			var nucleus = this.fetch();
			var text = nucleus.text;
			if (/^\\verb[^a-zA-Z]/.test(text)) {
				this.consume();
				var arg = text.slice(5);
				var star = arg.charAt(0) === "*";
				if (star) arg = arg.slice(1);
				if (arg.length < 2 || arg.charAt(0) !== arg.slice(-1)) throw new ParseError("\\verb assertion failed --\n                    please report what input caused this bug");
				arg = arg.slice(1, -1);
				return {
					type: "verb",
					mode: "text",
					body: arg,
					star
				};
			}
			if (unicodeSymbols.hasOwnProperty(text[0]) && !symbols[this.mode][text[0]]) {
				if (this.settings.strict && this.mode === "math") this.settings.reportNonstrict("unicodeTextInMathMode", "Accented Unicode text character \"" + text[0] + "\" used in math mode", nucleus);
				text = unicodeSymbols[text[0]] + text.slice(1);
			}
			var match = combiningDiacriticalMarksEndRegex.exec(text);
			if (match) {
				text = text.substring(0, match.index);
				if (text === "i") text = "ı";
				else if (text === "j") text = "ȷ";
			}
			var symbol;
			if (symbols[this.mode][text]) {
				if (this.settings.strict && this.mode === "math" && extraLatin.indexOf(text) >= 0) this.settings.reportNonstrict("unicodeTextInMathMode", "Latin-1/Unicode text character \"" + text[0] + "\" used in math mode", nucleus);
				var group = symbols[this.mode][text].group;
				var loc = SourceLocation.range(nucleus);
				var s;
				if (ATOMS.hasOwnProperty(group)) {
					var family = group;
					s = {
						type: "atom",
						mode: this.mode,
						family,
						loc,
						text
					};
				} else s = {
					type: group,
					mode: this.mode,
					loc,
					text
				};
				symbol = s;
			} else if (text.charCodeAt(0) >= 128) {
				if (this.settings.strict) {
					if (!supportedCodepoint(text.charCodeAt(0))) this.settings.reportNonstrict("unknownSymbol", "Unrecognized Unicode character \"" + text[0] + "\"" + (" (" + text.charCodeAt(0) + ")"), nucleus);
					else if (this.mode === "math") this.settings.reportNonstrict("unicodeTextInMathMode", "Unicode text character \"" + text[0] + "\" used in math mode", nucleus);
				}
				symbol = {
					type: "textord",
					mode: "text",
					loc: SourceLocation.range(nucleus),
					text
				};
			} else return null;
			this.consume();
			if (match) for (var i = 0; i < match[0].length; i++) {
				var accent = match[0][i];
				if (!unicodeAccents[accent]) throw new ParseError("Unknown accent ' " + accent + "'", nucleus);
				var command = unicodeAccents[accent][this.mode] || unicodeAccents[accent].text;
				if (!command) throw new ParseError("Accent " + accent + " unsupported in " + this.mode + " mode", nucleus);
				symbol = {
					type: "accent",
					mode: this.mode,
					loc: SourceLocation.range(nucleus),
					label: command,
					isStretchy: false,
					isShifty: true,
					base: symbol
				};
			}
			return symbol;
		}
	};
	Parser.endOfExpression = [
		"}",
		"\\endgroup",
		"\\end",
		"\\right",
		"&"
	];
	parseTree = function parseTree(toParse, settings) {
		if (!(typeof toParse === "string" || toParse instanceof String)) throw new TypeError("KaTeX can only parse string typed expression");
		var parser = new Parser(toParse, settings);
		delete parser.gullet.macros.current["\\df@tag"];
		var tree = parser.parse();
		delete parser.gullet.macros.current["\\current@color"];
		delete parser.gullet.macros.current["\\color"];
		if (parser.gullet.macros.get("\\df@tag")) {
			if (!settings.displayMode) throw new ParseError("\\tag works only in display equations");
			tree = [{
				type: "tag",
				mode: "text",
				body: tree,
				tag: parser.subparse([new Token("\\df@tag")])
			}];
		}
		return tree;
	};
	render = function render(expression, baseNode, options) {
		baseNode.textContent = "";
		var node = renderToDomTree(expression, options).toNode();
		baseNode.appendChild(node);
	};
	if (typeof document !== "undefined") {
		if (document.compatMode !== "CSS1Compat") {
			typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
			render = function render() {
				throw new ParseError("KaTeX doesn't work in quirks mode.");
			};
		}
	}
	renderToString = function renderToString(expression, options) {
		return renderToDomTree(expression, options).toMarkup();
	};
	generateParseTree = function generateParseTree(expression, options) {
		return parseTree(expression, new Settings(options));
	};
	renderError = function renderError(error, expression, options) {
		if (options.throwOnError || !(error instanceof ParseError)) throw error;
		var node = buildCommon.makeSpan(["katex-error"], [new SymbolNode(expression)]);
		node.setAttribute("title", error.toString());
		node.setAttribute("style", "color:" + options.errorColor);
		return node;
	};
	renderToDomTree = function renderToDomTree(expression, options) {
		var settings = new Settings(options);
		try {
			return buildTree(parseTree(expression, settings), expression, settings);
		} catch (error) {
			return renderError(error, expression, settings);
		}
	};
	renderToHTMLTree = function renderToHTMLTree(expression, options) {
		var settings = new Settings(options);
		try {
			return buildHTMLTree(parseTree(expression, settings), expression, settings);
		} catch (error) {
			return renderError(error, expression, settings);
		}
	};
	version = "0.16.25";
	__domTree = {
		Span,
		Anchor,
		SymbolNode,
		SvgNode,
		PathNode,
		LineNode
	};
	katex = {
		version,
		render,
		renderToString,
		ParseError,
		SETTINGS_SCHEMA,
		__parse: generateParseTree,
		__renderToDomTree: renderToDomTree,
		__renderToHTMLTree: renderToHTMLTree,
		__setFontMetrics: setFontMetrics,
		__defineSymbol: defineSymbol,
		__defineFunction: defineFunction,
		__defineMacro: defineMacro,
		__domTree
	};
}));
//#endregion
//#region ../../node_modules/katex/dist/contrib/mhchem.mjs
var chemParse, mhchemParser, texify;
var init_mhchem = __esmMin((() => {
	init_katex();
	/*************************************************************
	*
	*  KaTeX mhchem.js
	*
	*  This file implements a KaTeX version of mhchem version 3.3.0.
	*  It is adapted from MathJax/extensions/TeX/mhchem.js
	*  It differs from the MathJax version as follows:
	*    1. The interface is changed so that it can be called from KaTeX, not MathJax.
	*    2. \rlap and \llap are replaced with \mathrlap and \mathllap.
	*    3. Four lines of code are edited in order to use \raisebox instead of \raise.
	*    4. The reaction arrow code is simplified. All reaction arrows are rendered
	*       using KaTeX extensible arrows instead of building non-extensible arrows.
	*    5. \tripledash vertical alignment is slightly adjusted.
	*
	*    This code, as other KaTeX code, is released under the MIT license.
	* 
	* /*************************************************************
	*
	*  MathJax/extensions/TeX/mhchem.js
	*
	*  Implements the \ce command for handling chemical formulas
	*  from the mhchem LaTeX package.
	*
	*  ---------------------------------------------------------------------
	*
	*  Copyright (c) 2011-2015 The MathJax Consortium
	*  Copyright (c) 2015-2018 Martin Hensel
	*
	*  Licensed under the Apache License, Version 2.0 (the "License");
	*  you may not use this file except in compliance with the License.
	*  You may obtain a copy of the License at
	*
	*      http://www.apache.org/licenses/LICENSE-2.0
	*
	*  Unless required by applicable law or agreed to in writing, software
	*  distributed under the License is distributed on an "AS IS" BASIS,
	*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	*  See the License for the specific language governing permissions and
	*  limitations under the License.
	*/
	katex.__defineMacro("\\ce", function(context) {
		return chemParse(context.consumeArgs(1)[0], "ce");
	});
	katex.__defineMacro("\\pu", function(context) {
		return chemParse(context.consumeArgs(1)[0], "pu");
	});
	katex.__defineMacro("\\tripledash", "{\\vphantom{-}\\raisebox{2.56mu}{$\\mkern2mu\\tiny\\text{-}\\mkern1mu\\text{-}\\mkern1mu\\text{-}\\mkern2mu$}}");
	chemParse = function chemParse(tokens, stateMachine) {
		var str = "";
		var expectedLoc = tokens.length && tokens[tokens.length - 1].loc.start;
		for (var i = tokens.length - 1; i >= 0; i--) {
			if (tokens[i].loc.start > expectedLoc) {
				str += " ";
				expectedLoc = tokens[i].loc.start;
			}
			str += tokens[i].text;
			expectedLoc += tokens[i].text.length;
		}
		return texify.go(mhchemParser.go(str, stateMachine));
	};
	mhchemParser = {
		go: function go(input, stateMachine) {
			if (!input) return [];
			if (stateMachine === void 0) stateMachine = "ce";
			var state = "0";
			/** @type {Buffer} */
			var buffer = {};
			buffer["parenthesisLevel"] = 0;
			input = input.replace(/\n/g, " ");
			input = input.replace(/[\u2212\u2013\u2014\u2010]/g, "-");
			input = input.replace(/[\u2026]/g, "...");
			var lastInput;
			var watchdog = 10;
			/** @type {ParserOutput[]} */
			var output = [];
			while (true) {
				if (lastInput !== input) {
					watchdog = 10;
					lastInput = input;
				} else watchdog--;
				var machine = mhchemParser.stateMachines[stateMachine];
				var t = machine.transitions[state] || machine.transitions["*"];
				iterateTransitions: for (var i = 0; i < t.length; i++) {
					var matches = mhchemParser.patterns.match_(t[i].pattern, input);
					if (matches) {
						var task = t[i].task;
						for (var iA = 0; iA < task.action_.length; iA++) {
							var o;
							if (machine.actions[task.action_[iA].type_]) o = machine.actions[task.action_[iA].type_](buffer, matches.match_, task.action_[iA].option);
							else if (mhchemParser.actions[task.action_[iA].type_]) o = mhchemParser.actions[task.action_[iA].type_](buffer, matches.match_, task.action_[iA].option);
							else throw ["MhchemBugA", "mhchem bug A. Please report. (" + task.action_[iA].type_ + ")"];
							mhchemParser.concatArray(output, o);
						}
						state = task.nextState || state;
						if (input.length > 0) {
							if (!task.revisit) input = matches.remainder;
							if (!task.toContinue) break iterateTransitions;
						} else return output;
					}
				}
				if (watchdog <= 0) throw ["MhchemBugU", "mhchem bug U. Please report."];
			}
		},
		concatArray: function concatArray(a, b) {
			if (b) if (Array.isArray(b)) for (var iB = 0; iB < b.length; iB++) a.push(b[iB]);
			else a.push(b);
		},
		patterns: {
			patterns: {
				"empty": /^$/,
				"else": /^./,
				"else2": /^./,
				"space": /^\s/,
				"space A": /^\s(?=[A-Z\\$])/,
				"space$": /^\s$/,
				"a-z": /^[a-z]/,
				"x": /^x/,
				"x$": /^x$/,
				"i$": /^i$/,
				"letters": /^(?:[a-zA-Z\u03B1-\u03C9\u0391-\u03A9?@]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))))+/,
				"\\greek": /^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))/,
				"one lowercase latin letter $": /^(?:([a-z])(?:$|[^a-zA-Z]))$/,
				"$one lowercase latin letter$ $": /^\$(?:([a-z])(?:$|[^a-zA-Z]))\$$/,
				"one lowercase greek letter $": /^(?:\$?[\u03B1-\u03C9]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)\s*\$?)(?:\s+|\{\}|(?![a-zA-Z]))$/,
				"digits": /^[0-9]+/,
				"-9.,9": /^[+\-]?(?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))/,
				"-9.,9 no missing 0": /^[+\-]?[0-9]+(?:[.,][0-9]+)?/,
				"(-)(9.,9)(e)(99)": function e99(input) {
					var m = input.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))?(\((?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))\))?(?:([eE]|\s*(\*|x|\\times|\u00D7)\s*10\^)([+\-]?[0-9]+|\{[+\-]?[0-9]+\}))?/);
					if (m && m[0]) return {
						match_: m.splice(1),
						remainder: input.substr(m[0].length)
					};
					return null;
				},
				"(-)(9)^(-9)": function _(input) {
					var m = input.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+)?)\^([+\-]?[0-9]+|\{[+\-]?[0-9]+\})/);
					if (m && m[0]) return {
						match_: m.splice(1),
						remainder: input.substr(m[0].length)
					};
					return null;
				},
				"state of aggregation $": function stateOfAggregation$(input) {
					var a = mhchemParser.patterns.findObserveGroups(input, "", /^\([a-z]{1,3}(?=[\),])/, ")", "");
					if (a && a.remainder.match(/^($|[\s,;\)\]\}])/)) return a;
					var m = input.match(/^(?:\((?:\\ca\s?)?\$[amothc]\$\))/);
					if (m) return {
						match_: m[0],
						remainder: input.substr(m[0].length)
					};
					return null;
				},
				"_{(state of aggregation)}$": /^_\{(\([a-z]{1,3}\))\}/,
				"{[(": /^(?:\\\{|\[|\()/,
				")]}": /^(?:\)|\]|\\\})/,
				", ": /^[,;]\s*/,
				",": /^[,;]/,
				".": /^[.]/,
				". ": /^([.\u22C5\u00B7\u2022])\s*/,
				"...": /^\.\.\.(?=$|[^.])/,
				"* ": /^([*])\s*/,
				"^{(...)}": function _(input) {
					return mhchemParser.patterns.findObserveGroups(input, "^{", "", "", "}");
				},
				"^($...$)": function $$(input) {
					return mhchemParser.patterns.findObserveGroups(input, "^", "$", "$", "");
				},
				"^a": /^\^([0-9]+|[^\\_])/,
				"^\\x{}{}": function x(input) {
					return mhchemParser.patterns.findObserveGroups(input, "^", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true);
				},
				"^\\x{}": function x(input) {
					return mhchemParser.patterns.findObserveGroups(input, "^", /^\\[a-zA-Z]+\{/, "}", "");
				},
				"^\\x": /^\^(\\[a-zA-Z]+)\s*/,
				"^(-1)": /^\^(-?\d+)/,
				"'": /^'/,
				"_{(...)}": function _(input) {
					return mhchemParser.patterns.findObserveGroups(input, "_{", "", "", "}");
				},
				"_($...$)": function _$$(input) {
					return mhchemParser.patterns.findObserveGroups(input, "_", "$", "$", "");
				},
				"_9": /^_([+\-]?[0-9]+|[^\\])/,
				"_\\x{}{}": function _X(input) {
					return mhchemParser.patterns.findObserveGroups(input, "_", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true);
				},
				"_\\x{}": function _X(input) {
					return mhchemParser.patterns.findObserveGroups(input, "_", /^\\[a-zA-Z]+\{/, "}", "");
				},
				"_\\x": /^_(\\[a-zA-Z]+)\s*/,
				"^_": /^(?:\^(?=_)|\_(?=\^)|[\^_]$)/,
				"{}": /^\{\}/,
				"{...}": function _(input) {
					return mhchemParser.patterns.findObserveGroups(input, "", "{", "}", "");
				},
				"{(...)}": function _(input) {
					return mhchemParser.patterns.findObserveGroups(input, "{", "", "", "}");
				},
				"$...$": function $$(input) {
					return mhchemParser.patterns.findObserveGroups(input, "", "$", "$", "");
				},
				"${(...)}$": function $$(input) {
					return mhchemParser.patterns.findObserveGroups(input, "${", "", "", "}$");
				},
				"$(...)$": function $$(input) {
					return mhchemParser.patterns.findObserveGroups(input, "$", "", "", "$");
				},
				"=<>": /^[=<>]/,
				"#": /^[#\u2261]/,
				"+": /^\+/,
				"-$": /^-(?=[\s_},;\]/]|$|\([a-z]+\))/,
				"-9": /^-(?=[0-9])/,
				"- orbital overlap": /^-(?=(?:[spd]|sp)(?:$|[\s,;\)\]\}]))/,
				"-": /^-/,
				"pm-operator": /^(?:\\pm|\$\\pm\$|\+-|\+\/-)/,
				"operator": /^(?:\+|(?:[\-=<>]|<<|>>|\\approx|\$\\approx\$)(?=\s|$|-?[0-9]))/,
				"arrowUpDown": /^(?:v|\(v\)|\^|\(\^\))(?=$|[\s,;\)\]\}])/,
				"\\bond{(...)}": function bond(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\bond{", "", "", "}");
				},
				"->": /^(?:<->|<-->|->|<-|<=>>|<<=>|<=>|[\u2192\u27F6\u21CC])/,
				"CMT": /^[CMT](?=\[)/,
				"[(...)]": function _(input) {
					return mhchemParser.patterns.findObserveGroups(input, "[", "", "", "]");
				},
				"1st-level escape": /^(&|\\\\|\\hline)\s*/,
				"\\,": /^(?:\\[,\ ;:])/,
				"\\x{}{}": function x(input) {
					return mhchemParser.patterns.findObserveGroups(input, "", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true);
				},
				"\\x{}": function x(input) {
					return mhchemParser.patterns.findObserveGroups(input, "", /^\\[a-zA-Z]+\{/, "}", "");
				},
				"\\ca": /^\\ca(?:\s+|(?![a-zA-Z]))/,
				"\\x": /^(?:\\[a-zA-Z]+\s*|\\[_&{}%])/,
				"orbital": /^(?:[0-9]{1,2}[spdfgh]|[0-9]{0,2}sp)(?=$|[^a-zA-Z])/,
				"others": /^[\/~|]/,
				"\\frac{(...)}": function frac(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\frac{", "", "", "}", "{", "", "", "}");
				},
				"\\overset{(...)}": function overset(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\overset{", "", "", "}", "{", "", "", "}");
				},
				"\\underset{(...)}": function underset(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\underset{", "", "", "}", "{", "", "", "}");
				},
				"\\underbrace{(...)}": function underbrace(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\underbrace{", "", "", "}_", "{", "", "", "}");
				},
				"\\color{(...)}0": function color0(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\color{", "", "", "}");
				},
				"\\color{(...)}{(...)}1": function color1(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\color{", "", "", "}", "{", "", "", "}");
				},
				"\\color(...){(...)}2": function color2(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\color", "\\", "", /^(?=\{)/, "{", "", "", "}");
				},
				"\\ce{(...)}": function ce(input) {
					return mhchemParser.patterns.findObserveGroups(input, "\\ce{", "", "", "}");
				},
				"oxidation$": /^(?:[+-][IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,
				"d-oxidation$": /^(?:[+-]?\s?[IVX]+|\\pm\s*0|\$\\pm\$\s*0)$/,
				"roman numeral": /^[IVX]+/,
				"1/2$": /^[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+(?:\$[a-z]\$|[a-z])?$/,
				"amount": function amount(input) {
					var match = input.match(/^(?:(?:(?:\([+\-]?[0-9]+\/[0-9]+\)|[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+|[+\-]?[0-9]+[.,][0-9]+|[+\-]?\.[0-9]+|[+\-]?[0-9]+)(?:[a-z](?=\s*[A-Z]))?)|[+\-]?[a-z](?=\s*[A-Z])|\+(?!\s))/);
					if (match) return {
						match_: match[0],
						remainder: input.substr(match[0].length)
					};
					var a = mhchemParser.patterns.findObserveGroups(input, "", "$", "$", "");
					if (a) {
						match = a.match_.match(/^\$(?:\(?[+\-]?(?:[0-9]*[a-z]?[+\-])?[0-9]*[a-z](?:[+\-][0-9]*[a-z]?)?\)?|\+|-)\$$/);
						if (match) return {
							match_: match[0],
							remainder: input.substr(match[0].length)
						};
					}
					return null;
				},
				"amount2": function amount2(input) {
					return this["amount"](input);
				},
				"(KV letters),": /^(?:[A-Z][a-z]{0,2}|i)(?=,)/,
				"formula$": function formula$(input) {
					if (input.match(/^\([a-z]+\)$/)) return null;
					var match = input.match(/^(?:[a-z]|(?:[0-9\ \+\-\,\.\(\)]+[a-z])+[0-9\ \+\-\,\.\(\)]*|(?:[a-z][0-9\ \+\-\,\.\(\)]+)+[a-z]?)$/);
					if (match) return {
						match_: match[0],
						remainder: input.substr(match[0].length)
					};
					return null;
				},
				"uprightEntities": /^(?:pH|pOH|pC|pK|iPr|iBu)(?=$|[^a-zA-Z])/,
				"/": /^\s*(\/)\s*/,
				"//": /^\s*(\/\/)\s*/,
				"*": /^\s*[*.]\s*/
			},
			findObserveGroups: function findObserveGroups(input, begExcl, begIncl, endIncl, endExcl, beg2Excl, beg2Incl, end2Incl, end2Excl, combine) {
				/** @type {{(input: string, pattern: string | RegExp): string | string[] | null;}} */
				var _match = function _match(input, pattern) {
					if (typeof pattern === "string") {
						if (input.indexOf(pattern) !== 0) return null;
						return pattern;
					} else {
						var match = input.match(pattern);
						if (!match) return null;
						return match[0];
					}
				};
				/** @type {{(input: string, i: number, endChars: string | RegExp): {endMatchBegin: number, endMatchEnd: number} | null;}} */
				var _findObserveGroups = function _findObserveGroups(input, i, endChars) {
					var braces = 0;
					while (i < input.length) {
						var a = input.charAt(i);
						var match = _match(input.substr(i), endChars);
						if (match !== null && braces === 0) return {
							endMatchBegin: i,
							endMatchEnd: i + match.length
						};
						else if (a === "{") braces++;
						else if (a === "}") if (braces === 0) throw ["ExtraCloseMissingOpen", "Extra close brace or missing open brace"];
						else braces--;
						i++;
					}
					if (braces > 0) return null;
					return null;
				};
				var match = _match(input, begExcl);
				if (match === null) return null;
				input = input.substr(match.length);
				match = _match(input, begIncl);
				if (match === null) return null;
				var e = _findObserveGroups(input, match.length, endIncl || endExcl);
				if (e === null) return null;
				var match1 = input.substring(0, endIncl ? e.endMatchEnd : e.endMatchBegin);
				if (!(beg2Excl || beg2Incl)) return {
					match_: match1,
					remainder: input.substr(e.endMatchEnd)
				};
				else {
					var group2 = this.findObserveGroups(input.substr(e.endMatchEnd), beg2Excl, beg2Incl, end2Incl, end2Excl);
					if (group2 === null) return null;
					/** @type {string[]} */
					var matchRet = [match1, group2.match_];
					return {
						match_: combine ? matchRet.join("") : matchRet,
						remainder: group2.remainder
					};
				}
			},
			match_: function match_(m, input) {
				var pattern = mhchemParser.patterns.patterns[m];
				if (pattern === void 0) throw ["MhchemBugP", "mhchem bug P. Please report. (" + m + ")"];
				else if (typeof pattern === "function") return mhchemParser.patterns.patterns[m](input);
				else {
					var match = input.match(pattern);
					if (match) {
						var mm;
						if (match[2]) mm = [match[1], match[2]];
						else if (match[1]) mm = match[1];
						else mm = match[0];
						return {
							match_: mm,
							remainder: input.substr(match[0].length)
						};
					}
					return null;
				}
			}
		},
		actions: {
			"a=": function a(buffer, m) {
				buffer.a = (buffer.a || "") + m;
			},
			"b=": function b(buffer, m) {
				buffer.b = (buffer.b || "") + m;
			},
			"p=": function p(buffer, m) {
				buffer.p = (buffer.p || "") + m;
			},
			"o=": function o(buffer, m) {
				buffer.o = (buffer.o || "") + m;
			},
			"q=": function q(buffer, m) {
				buffer.q = (buffer.q || "") + m;
			},
			"d=": function d(buffer, m) {
				buffer.d = (buffer.d || "") + m;
			},
			"rm=": function rm(buffer, m) {
				buffer.rm = (buffer.rm || "") + m;
			},
			"text=": function text(buffer, m) {
				buffer.text_ = (buffer.text_ || "") + m;
			},
			"insert": function insert(buffer, m, a) {
				return { type_: a };
			},
			"insert+p1": function insertP1(buffer, m, a) {
				return {
					type_: a,
					p1: m
				};
			},
			"insert+p1+p2": function insertP1P2(buffer, m, a) {
				return {
					type_: a,
					p1: m[0],
					p2: m[1]
				};
			},
			"copy": function copy(buffer, m) {
				return m;
			},
			"rm": function rm(buffer, m) {
				return {
					type_: "rm",
					p1: m || ""
				};
			},
			"text": function text(buffer, m) {
				return mhchemParser.go(m, "text");
			},
			"{text}": function text(buffer, m) {
				var ret = ["{"];
				mhchemParser.concatArray(ret, mhchemParser.go(m, "text"));
				ret.push("}");
				return ret;
			},
			"tex-math": function texMath(buffer, m) {
				return mhchemParser.go(m, "tex-math");
			},
			"tex-math tight": function texMathTight(buffer, m) {
				return mhchemParser.go(m, "tex-math tight");
			},
			"bond": function bond(buffer, m, k) {
				return {
					type_: "bond",
					kind_: k || m
				};
			},
			"color0-output": function color0Output(buffer, m) {
				return {
					type_: "color0",
					color: m[0]
				};
			},
			"ce": function ce(buffer, m) {
				return mhchemParser.go(m);
			},
			"1/2": function _(buffer, m) {
				/** @type {ParserOutput[]} */
				var ret = [];
				if (m.match(/^[+\-]/)) {
					ret.push(m.substr(0, 1));
					m = m.substr(1);
				}
				var n = m.match(/^([0-9]+|\$[a-z]\$|[a-z])\/([0-9]+)(\$[a-z]\$|[a-z])?$/);
				n[1] = n[1].replace(/\$/g, "");
				ret.push({
					type_: "frac",
					p1: n[1],
					p2: n[2]
				});
				if (n[3]) {
					n[3] = n[3].replace(/\$/g, "");
					ret.push({
						type_: "tex-math",
						p1: n[3]
					});
				}
				return ret;
			},
			"9,9": function _(buffer, m) {
				return mhchemParser.go(m, "9,9");
			}
		},
		createTransitions: function createTransitions(o) {
			var pattern, state;
			/** @type {string[]} */
			var stateArray;
			var i;
			/** @type {Transitions} */
			var transitions = {};
			for (pattern in o) for (state in o[pattern]) {
				stateArray = state.split("|");
				o[pattern][state].stateArray = stateArray;
				for (i = 0; i < stateArray.length; i++) transitions[stateArray[i]] = [];
			}
			for (pattern in o) for (state in o[pattern]) {
				stateArray = o[pattern][state].stateArray || [];
				for (i = 0; i < stateArray.length; i++) {
					/** @type {any} */
					var p = o[pattern][state];
					if (p.action_) {
						p.action_ = [].concat(p.action_);
						for (var k = 0; k < p.action_.length; k++) if (typeof p.action_[k] === "string") p.action_[k] = { type_: p.action_[k] };
					} else p.action_ = [];
					var patternArray = pattern.split("|");
					for (var j = 0; j < patternArray.length; j++) if (stateArray[i] === "*") for (var t in transitions) transitions[t].push({
						pattern: patternArray[j],
						task: p
					});
					else transitions[stateArray[i]].push({
						pattern: patternArray[j],
						task: p
					});
				}
			}
			return transitions;
		},
		stateMachines: {}
	};
	mhchemParser.stateMachines = {
		"ce": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": { action_: "output" } },
				"else": { "0|1|2": {
					action_: "beginsWithBond=false",
					revisit: true,
					toContinue: true
				} },
				"oxidation$": { "0": { action_: "oxidation-output" } },
				"CMT": {
					"r": {
						action_: "rdt=",
						nextState: "rt"
					},
					"rd": {
						action_: "rqt=",
						nextState: "rdt"
					}
				},
				"arrowUpDown": { "0|1|2|as": {
					action_: [
						"sb=false",
						"output",
						"operator"
					],
					nextState: "1"
				} },
				"uprightEntities": { "0|1|2": {
					action_: ["o=", "output"],
					nextState: "1"
				} },
				"orbital": { "0|1|2|3": {
					action_: "o=",
					nextState: "o"
				} },
				"->": {
					"0|1|2|3": {
						action_: "r=",
						nextState: "r"
					},
					"a|as": {
						action_: ["output", "r="],
						nextState: "r"
					},
					"*": {
						action_: ["output", "r="],
						nextState: "r"
					}
				},
				"+": {
					"o": {
						action_: "d= kv",
						nextState: "d"
					},
					"d|D": {
						action_: "d=",
						nextState: "d"
					},
					"q": {
						action_: "d=",
						nextState: "qd"
					},
					"qd|qD": {
						action_: "d=",
						nextState: "qd"
					},
					"dq": {
						action_: ["output", "d="],
						nextState: "d"
					},
					"3": {
						action_: [
							"sb=false",
							"output",
							"operator"
						],
						nextState: "0"
					}
				},
				"amount": { "0|2": {
					action_: "a=",
					nextState: "a"
				} },
				"pm-operator": { "0|1|2|a|as": {
					action_: [
						"sb=false",
						"output",
						{
							type_: "operator",
							option: "\\pm"
						}
					],
					nextState: "0"
				} },
				"operator": { "0|1|2|a|as": {
					action_: [
						"sb=false",
						"output",
						"operator"
					],
					nextState: "0"
				} },
				"-$": {
					"o|q": {
						action_: ["charge or bond", "output"],
						nextState: "qd"
					},
					"d": {
						action_: "d=",
						nextState: "d"
					},
					"D": {
						action_: ["output", {
							type_: "bond",
							option: "-"
						}],
						nextState: "3"
					},
					"q": {
						action_: "d=",
						nextState: "qd"
					},
					"qd": {
						action_: "d=",
						nextState: "qd"
					},
					"qD|dq": {
						action_: ["output", {
							type_: "bond",
							option: "-"
						}],
						nextState: "3"
					}
				},
				"-9": { "3|o": {
					action_: ["output", {
						type_: "insert",
						option: "hyphen"
					}],
					nextState: "3"
				} },
				"- orbital overlap": {
					"o": {
						action_: ["output", {
							type_: "insert",
							option: "hyphen"
						}],
						nextState: "2"
					},
					"d": {
						action_: ["output", {
							type_: "insert",
							option: "hyphen"
						}],
						nextState: "2"
					}
				},
				"-": {
					"0|1|2": {
						action_: [
							{
								type_: "output",
								option: 1
							},
							"beginsWithBond=true",
							{
								type_: "bond",
								option: "-"
							}
						],
						nextState: "3"
					},
					"3": { action_: {
						type_: "bond",
						option: "-"
					} },
					"a": {
						action_: ["output", {
							type_: "insert",
							option: "hyphen"
						}],
						nextState: "2"
					},
					"as": {
						action_: [{
							type_: "output",
							option: 2
						}, {
							type_: "bond",
							option: "-"
						}],
						nextState: "3"
					},
					"b": { action_: "b=" },
					"o": {
						action_: {
							type_: "- after o/d",
							option: false
						},
						nextState: "2"
					},
					"q": {
						action_: {
							type_: "- after o/d",
							option: false
						},
						nextState: "2"
					},
					"d|qd|dq": {
						action_: {
							type_: "- after o/d",
							option: true
						},
						nextState: "2"
					},
					"D|qD|p": {
						action_: ["output", {
							type_: "bond",
							option: "-"
						}],
						nextState: "3"
					}
				},
				"amount2": { "1|3": {
					action_: "a=",
					nextState: "a"
				} },
				"letters": {
					"0|1|2|3|a|as|b|p|bp|o": {
						action_: "o=",
						nextState: "o"
					},
					"q|dq": {
						action_: ["output", "o="],
						nextState: "o"
					},
					"d|D|qd|qD": {
						action_: "o after d",
						nextState: "o"
					}
				},
				"digits": {
					"o": {
						action_: "q=",
						nextState: "q"
					},
					"d|D": {
						action_: "q=",
						nextState: "dq"
					},
					"q": {
						action_: ["output", "o="],
						nextState: "o"
					},
					"a": {
						action_: "o=",
						nextState: "o"
					}
				},
				"space A": { "b|p|bp": {} },
				"space": {
					"a": { nextState: "as" },
					"0": { action_: "sb=false" },
					"1|2": { action_: "sb=true" },
					"r|rt|rd|rdt|rdq": {
						action_: "output",
						nextState: "0"
					},
					"*": {
						action_: ["output", "sb=true"],
						nextState: "1"
					}
				},
				"1st-level escape": {
					"1|2": { action_: ["output", {
						type_: "insert+p1",
						option: "1st-level escape"
					}] },
					"*": {
						action_: ["output", {
							type_: "insert+p1",
							option: "1st-level escape"
						}],
						nextState: "0"
					}
				},
				"[(...)]": {
					"r|rt": {
						action_: "rd=",
						nextState: "rd"
					},
					"rd|rdt": {
						action_: "rq=",
						nextState: "rdq"
					}
				},
				"...": {
					"o|d|D|dq|qd|qD": {
						action_: ["output", {
							type_: "bond",
							option: "..."
						}],
						nextState: "3"
					},
					"*": {
						action_: [{
							type_: "output",
							option: 1
						}, {
							type_: "insert",
							option: "ellipsis"
						}],
						nextState: "1"
					}
				},
				". |* ": { "*": {
					action_: ["output", {
						type_: "insert",
						option: "addition compound"
					}],
					nextState: "1"
				} },
				"state of aggregation $": { "*": {
					action_: ["output", "state of aggregation"],
					nextState: "1"
				} },
				"{[(": {
					"a|as|o": {
						action_: [
							"o=",
							"output",
							"parenthesisLevel++"
						],
						nextState: "2"
					},
					"0|1|2|3": {
						action_: [
							"o=",
							"output",
							"parenthesisLevel++"
						],
						nextState: "2"
					},
					"*": {
						action_: [
							"output",
							"o=",
							"output",
							"parenthesisLevel++"
						],
						nextState: "2"
					}
				},
				")]}": {
					"0|1|2|3|b|p|bp|o": {
						action_: ["o=", "parenthesisLevel--"],
						nextState: "o"
					},
					"a|as|d|D|q|qd|qD|dq": {
						action_: [
							"output",
							"o=",
							"parenthesisLevel--"
						],
						nextState: "o"
					}
				},
				", ": { "*": {
					action_: ["output", "comma"],
					nextState: "0"
				} },
				"^_": { "*": {} },
				"^{(...)}|^($...$)": {
					"0|1|2|as": {
						action_: "b=",
						nextState: "b"
					},
					"p": {
						action_: "b=",
						nextState: "bp"
					},
					"3|o": {
						action_: "d= kv",
						nextState: "D"
					},
					"q": {
						action_: "d=",
						nextState: "qD"
					},
					"d|D|qd|qD|dq": {
						action_: ["output", "d="],
						nextState: "D"
					}
				},
				"^a|^\\x{}{}|^\\x{}|^\\x|'": {
					"0|1|2|as": {
						action_: "b=",
						nextState: "b"
					},
					"p": {
						action_: "b=",
						nextState: "bp"
					},
					"3|o": {
						action_: "d= kv",
						nextState: "d"
					},
					"q": {
						action_: "d=",
						nextState: "qd"
					},
					"d|qd|D|qD": { action_: "d=" },
					"dq": {
						action_: ["output", "d="],
						nextState: "d"
					}
				},
				"_{(state of aggregation)}$": { "d|D|q|qd|qD|dq": {
					action_: ["output", "q="],
					nextState: "q"
				} },
				"_{(...)}|_($...$)|_9|_\\x{}{}|_\\x{}|_\\x": {
					"0|1|2|as": {
						action_: "p=",
						nextState: "p"
					},
					"b": {
						action_: "p=",
						nextState: "bp"
					},
					"3|o": {
						action_: "q=",
						nextState: "q"
					},
					"d|D": {
						action_: "q=",
						nextState: "dq"
					},
					"q|qd|qD|dq": {
						action_: ["output", "q="],
						nextState: "q"
					}
				},
				"=<>": { "0|1|2|3|a|as|o|q|d|D|qd|qD|dq": {
					action_: [{
						type_: "output",
						option: 2
					}, "bond"],
					nextState: "3"
				} },
				"#": { "0|1|2|3|a|as|o": {
					action_: [{
						type_: "output",
						option: 2
					}, {
						type_: "bond",
						option: "#"
					}],
					nextState: "3"
				} },
				"{}": { "*": {
					action_: {
						type_: "output",
						option: 1
					},
					nextState: "1"
				} },
				"{...}": {
					"0|1|2|3|a|as|b|p|bp": {
						action_: "o=",
						nextState: "o"
					},
					"o|d|D|q|qd|qD|dq": {
						action_: ["output", "o="],
						nextState: "o"
					}
				},
				"$...$": {
					"a": { action_: "a=" },
					"0|1|2|3|as|b|p|bp|o": {
						action_: "o=",
						nextState: "o"
					},
					"as|o": { action_: "o=" },
					"q|d|D|qd|qD|dq": {
						action_: ["output", "o="],
						nextState: "o"
					}
				},
				"\\bond{(...)}": { "*": {
					action_: [{
						type_: "output",
						option: 2
					}, "bond"],
					nextState: "3"
				} },
				"\\frac{(...)}": { "*": {
					action_: [{
						type_: "output",
						option: 1
					}, "frac-output"],
					nextState: "3"
				} },
				"\\overset{(...)}": { "*": {
					action_: [{
						type_: "output",
						option: 2
					}, "overset-output"],
					nextState: "3"
				} },
				"\\underset{(...)}": { "*": {
					action_: [{
						type_: "output",
						option: 2
					}, "underset-output"],
					nextState: "3"
				} },
				"\\underbrace{(...)}": { "*": {
					action_: [{
						type_: "output",
						option: 2
					}, "underbrace-output"],
					nextState: "3"
				} },
				"\\color{(...)}{(...)}1|\\color(...){(...)}2": { "*": {
					action_: [{
						type_: "output",
						option: 2
					}, "color-output"],
					nextState: "3"
				} },
				"\\color{(...)}0": { "*": { action_: [{
					type_: "output",
					option: 2
				}, "color0-output"] } },
				"\\ce{(...)}": { "*": {
					action_: [{
						type_: "output",
						option: 2
					}, "ce"],
					nextState: "3"
				} },
				"\\,": { "*": {
					action_: [{
						type_: "output",
						option: 1
					}, "copy"],
					nextState: "1"
				} },
				"\\x{}{}|\\x{}|\\x": {
					"0|1|2|3|a|as|b|p|bp|o|c0": {
						action_: ["o=", "output"],
						nextState: "3"
					},
					"*": {
						action_: [
							"output",
							"o=",
							"output"
						],
						nextState: "3"
					}
				},
				"others": { "*": {
					action_: [{
						type_: "output",
						option: 1
					}, "copy"],
					nextState: "3"
				} },
				"else2": {
					"a": {
						action_: "a to o",
						nextState: "o",
						revisit: true
					},
					"as": {
						action_: ["output", "sb=true"],
						nextState: "1",
						revisit: true
					},
					"r|rt|rd|rdt|rdq": {
						action_: ["output"],
						nextState: "0",
						revisit: true
					},
					"*": {
						action_: ["output", "copy"],
						nextState: "3"
					}
				}
			}),
			actions: {
				"o after d": function oAfterD(buffer, m) {
					var ret;
					if ((buffer.d || "").match(/^[0-9]+$/)) {
						var tmp = buffer.d;
						buffer.d = void 0;
						ret = this["output"](buffer);
						buffer.b = tmp;
					} else ret = this["output"](buffer);
					mhchemParser.actions["o="](buffer, m);
					return ret;
				},
				"d= kv": function dKv(buffer, m) {
					buffer.d = m;
					buffer.dType = "kv";
				},
				"charge or bond": function chargeOrBond(buffer, m) {
					if (buffer["beginsWithBond"]) {
						/** @type {ParserOutput[]} */
						var ret = [];
						mhchemParser.concatArray(ret, this["output"](buffer));
						mhchemParser.concatArray(ret, mhchemParser.actions["bond"](buffer, m, "-"));
						return ret;
					} else buffer.d = m;
				},
				"- after o/d": function afterOD(buffer, m, isAfterD) {
					var c1 = mhchemParser.patterns.match_("orbital", buffer.o || "");
					var c2 = mhchemParser.patterns.match_("one lowercase greek letter $", buffer.o || "");
					var c3 = mhchemParser.patterns.match_("one lowercase latin letter $", buffer.o || "");
					var c4 = mhchemParser.patterns.match_("$one lowercase latin letter$ $", buffer.o || "");
					var hyphenFollows = m === "-" && (c1 && c1.remainder === "" || c2 || c3 || c4);
					if (hyphenFollows && !buffer.a && !buffer.b && !buffer.p && !buffer.d && !buffer.q && !c1 && c3) buffer.o = "$" + buffer.o + "$";
					/** @type {ParserOutput[]} */
					var ret = [];
					if (hyphenFollows) {
						mhchemParser.concatArray(ret, this["output"](buffer));
						ret.push({ type_: "hyphen" });
					} else {
						c1 = mhchemParser.patterns.match_("digits", buffer.d || "");
						if (isAfterD && c1 && c1.remainder === "") {
							mhchemParser.concatArray(ret, mhchemParser.actions["d="](buffer, m));
							mhchemParser.concatArray(ret, this["output"](buffer));
						} else {
							mhchemParser.concatArray(ret, this["output"](buffer));
							mhchemParser.concatArray(ret, mhchemParser.actions["bond"](buffer, m, "-"));
						}
					}
					return ret;
				},
				"a to o": function aToO(buffer) {
					buffer.o = buffer.a;
					buffer.a = void 0;
				},
				"sb=true": function sbTrue(buffer) {
					buffer.sb = true;
				},
				"sb=false": function sbFalse(buffer) {
					buffer.sb = false;
				},
				"beginsWithBond=true": function beginsWithBondTrue(buffer) {
					buffer["beginsWithBond"] = true;
				},
				"beginsWithBond=false": function beginsWithBondFalse(buffer) {
					buffer["beginsWithBond"] = false;
				},
				"parenthesisLevel++": function parenthesisLevel(buffer) {
					buffer["parenthesisLevel"]++;
				},
				"parenthesisLevel--": function parenthesisLevel(buffer) {
					buffer["parenthesisLevel"]--;
				},
				"state of aggregation": function stateOfAggregation(buffer, m) {
					return {
						type_: "state of aggregation",
						p1: mhchemParser.go(m, "o")
					};
				},
				"comma": function comma(buffer, m) {
					var a = m.replace(/\s*$/, "");
					if (a !== m && buffer["parenthesisLevel"] === 0) return {
						type_: "comma enumeration L",
						p1: a
					};
					else return {
						type_: "comma enumeration M",
						p1: a
					};
				},
				"output": function output(buffer, m, entityFollows) {
					/** @type {ParserOutput | ParserOutput[]} */
					var ret;
					if (!buffer.r) {
						ret = [];
						if (!buffer.a && !buffer.b && !buffer.p && !buffer.o && !buffer.q && !buffer.d && !entityFollows);
						else {
							if (buffer.sb) ret.push({ type_: "entitySkip" });
							if (!buffer.o && !buffer.q && !buffer.d && !buffer.b && !buffer.p && entityFollows !== 2) {
								buffer.o = buffer.a;
								buffer.a = void 0;
							} else if (!buffer.o && !buffer.q && !buffer.d && (buffer.b || buffer.p)) {
								buffer.o = buffer.a;
								buffer.d = buffer.b;
								buffer.q = buffer.p;
								buffer.a = buffer.b = buffer.p = void 0;
							} else if (buffer.o && buffer.dType === "kv" && mhchemParser.patterns.match_("d-oxidation$", buffer.d || "")) buffer.dType = "oxidation";
							else if (buffer.o && buffer.dType === "kv" && !buffer.q) buffer.dType = void 0;
							ret.push({
								type_: "chemfive",
								a: mhchemParser.go(buffer.a, "a"),
								b: mhchemParser.go(buffer.b, "bd"),
								p: mhchemParser.go(buffer.p, "pq"),
								o: mhchemParser.go(buffer.o, "o"),
								q: mhchemParser.go(buffer.q, "pq"),
								d: mhchemParser.go(buffer.d, buffer.dType === "oxidation" ? "oxidation" : "bd"),
								dType: buffer.dType
							});
						}
					} else {
						/** @type {ParserOutput[]} */
						var rd;
						if (buffer.rdt === "M") rd = mhchemParser.go(buffer.rd, "tex-math");
						else if (buffer.rdt === "T") rd = [{
							type_: "text",
							p1: buffer.rd || ""
						}];
						else rd = mhchemParser.go(buffer.rd);
						/** @type {ParserOutput[]} */
						var rq;
						if (buffer.rqt === "M") rq = mhchemParser.go(buffer.rq, "tex-math");
						else if (buffer.rqt === "T") rq = [{
							type_: "text",
							p1: buffer.rq || ""
						}];
						else rq = mhchemParser.go(buffer.rq);
						ret = {
							type_: "arrow",
							r: buffer.r,
							rd,
							rq
						};
					}
					for (var p in buffer) if (p !== "parenthesisLevel" && p !== "beginsWithBond") delete buffer[p];
					return ret;
				},
				"oxidation-output": function oxidationOutput(buffer, m) {
					var ret = ["{"];
					mhchemParser.concatArray(ret, mhchemParser.go(m, "oxidation"));
					ret.push("}");
					return ret;
				},
				"frac-output": function fracOutput(buffer, m) {
					return {
						type_: "frac-ce",
						p1: mhchemParser.go(m[0]),
						p2: mhchemParser.go(m[1])
					};
				},
				"overset-output": function oversetOutput(buffer, m) {
					return {
						type_: "overset",
						p1: mhchemParser.go(m[0]),
						p2: mhchemParser.go(m[1])
					};
				},
				"underset-output": function undersetOutput(buffer, m) {
					return {
						type_: "underset",
						p1: mhchemParser.go(m[0]),
						p2: mhchemParser.go(m[1])
					};
				},
				"underbrace-output": function underbraceOutput(buffer, m) {
					return {
						type_: "underbrace",
						p1: mhchemParser.go(m[0]),
						p2: mhchemParser.go(m[1])
					};
				},
				"color-output": function colorOutput(buffer, m) {
					return {
						type_: "color",
						color1: m[0],
						color2: mhchemParser.go(m[1])
					};
				},
				"r=": function r(buffer, m) {
					buffer.r = m;
				},
				"rdt=": function rdt(buffer, m) {
					buffer.rdt = m;
				},
				"rd=": function rd(buffer, m) {
					buffer.rd = m;
				},
				"rqt=": function rqt(buffer, m) {
					buffer.rqt = m;
				},
				"rq=": function rq(buffer, m) {
					buffer.rq = m;
				},
				"operator": function operator(buffer, m, p1) {
					return {
						type_: "operator",
						kind_: p1 || m
					};
				}
			}
		},
		"a": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": {} },
				"1/2$": { "0": { action_: "1/2" } },
				"else": { "0": {
					nextState: "1",
					revisit: true
				} },
				"$(...)$": { "*": {
					action_: "tex-math tight",
					nextState: "1"
				} },
				",": { "*": { action_: {
					type_: "insert",
					option: "commaDecimal"
				} } },
				"else2": { "*": { action_: "copy" } }
			}),
			actions: {}
		},
		"o": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": {} },
				"1/2$": { "0": { action_: "1/2" } },
				"else": { "0": {
					nextState: "1",
					revisit: true
				} },
				"letters": { "*": { action_: "rm" } },
				"\\ca": { "*": { action_: {
					type_: "insert",
					option: "circa"
				} } },
				"\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } },
				"${(...)}$|$(...)$": { "*": { action_: "tex-math" } },
				"{(...)}": { "*": { action_: "{text}" } },
				"else2": { "*": { action_: "copy" } }
			}),
			actions: {}
		},
		"text": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": { action_: "output" } },
				"{...}": { "*": { action_: "text=" } },
				"${(...)}$|$(...)$": { "*": { action_: "tex-math" } },
				"\\greek": { "*": { action_: ["output", "rm"] } },
				"\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: ["output", "copy"] } },
				"else": { "*": { action_: "text=" } }
			}),
			actions: { "output": function output(buffer) {
				if (buffer.text_) {
					/** @type {ParserOutput} */
					var ret = {
						type_: "text",
						p1: buffer.text_
					};
					for (var p in buffer) delete buffer[p];
					return ret;
				}
			} }
		},
		"pq": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": {} },
				"state of aggregation $": { "*": { action_: "state of aggregation" } },
				"i$": { "0": {
					nextState: "!f",
					revisit: true
				} },
				"(KV letters),": { "0": {
					action_: "rm",
					nextState: "0"
				} },
				"formula$": { "0": {
					nextState: "f",
					revisit: true
				} },
				"1/2$": { "0": { action_: "1/2" } },
				"else": { "0": {
					nextState: "!f",
					revisit: true
				} },
				"${(...)}$|$(...)$": { "*": { action_: "tex-math" } },
				"{(...)}": { "*": { action_: "text" } },
				"a-z": { "f": { action_: "tex-math" } },
				"letters": { "*": { action_: "rm" } },
				"-9.,9": { "*": { action_: "9,9" } },
				",": { "*": { action_: {
					type_: "insert+p1",
					option: "comma enumeration S"
				} } },
				"\\color{(...)}{(...)}1|\\color(...){(...)}2": { "*": { action_: "color-output" } },
				"\\color{(...)}0": { "*": { action_: "color0-output" } },
				"\\ce{(...)}": { "*": { action_: "ce" } },
				"\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } },
				"else2": { "*": { action_: "copy" } }
			}),
			actions: {
				"state of aggregation": function stateOfAggregation(buffer, m) {
					return {
						type_: "state of aggregation subscript",
						p1: mhchemParser.go(m, "o")
					};
				},
				"color-output": function colorOutput(buffer, m) {
					return {
						type_: "color",
						color1: m[0],
						color2: mhchemParser.go(m[1], "pq")
					};
				}
			}
		},
		"bd": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": {} },
				"x$": { "0": {
					nextState: "!f",
					revisit: true
				} },
				"formula$": { "0": {
					nextState: "f",
					revisit: true
				} },
				"else": { "0": {
					nextState: "!f",
					revisit: true
				} },
				"-9.,9 no missing 0": { "*": { action_: "9,9" } },
				".": { "*": { action_: {
					type_: "insert",
					option: "electron dot"
				} } },
				"a-z": { "f": { action_: "tex-math" } },
				"x": { "*": { action_: {
					type_: "insert",
					option: "KV x"
				} } },
				"letters": { "*": { action_: "rm" } },
				"'": { "*": { action_: {
					type_: "insert",
					option: "prime"
				} } },
				"${(...)}$|$(...)$": { "*": { action_: "tex-math" } },
				"{(...)}": { "*": { action_: "text" } },
				"\\color{(...)}{(...)}1|\\color(...){(...)}2": { "*": { action_: "color-output" } },
				"\\color{(...)}0": { "*": { action_: "color0-output" } },
				"\\ce{(...)}": { "*": { action_: "ce" } },
				"\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "copy" } },
				"else2": { "*": { action_: "copy" } }
			}),
			actions: { "color-output": function colorOutput(buffer, m) {
				return {
					type_: "color",
					color1: m[0],
					color2: mhchemParser.go(m[1], "bd")
				};
			} }
		},
		"oxidation": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": {} },
				"roman numeral": { "*": { action_: "roman-numeral" } },
				"${(...)}$|$(...)$": { "*": { action_: "tex-math" } },
				"else": { "*": { action_: "copy" } }
			}),
			actions: { "roman-numeral": function romanNumeral(buffer, m) {
				return {
					type_: "roman numeral",
					p1: m || ""
				};
			} }
		},
		"tex-math": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": { action_: "output" } },
				"\\ce{(...)}": { "*": { action_: ["output", "ce"] } },
				"{...}|\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "o=" } },
				"else": { "*": { action_: "o=" } }
			}),
			actions: { "output": function output(buffer) {
				if (buffer.o) {
					/** @type {ParserOutput} */
					var ret = {
						type_: "tex-math",
						p1: buffer.o
					};
					for (var p in buffer) delete buffer[p];
					return ret;
				}
			} }
		},
		"tex-math tight": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": { action_: "output" } },
				"\\ce{(...)}": { "*": { action_: ["output", "ce"] } },
				"{...}|\\,|\\x{}{}|\\x{}|\\x": { "*": { action_: "o=" } },
				"-|+": { "*": { action_: "tight operator" } },
				"else": { "*": { action_: "o=" } }
			}),
			actions: {
				"tight operator": function tightOperator(buffer, m) {
					buffer.o = (buffer.o || "") + "{" + m + "}";
				},
				"output": function output(buffer) {
					if (buffer.o) {
						/** @type {ParserOutput} */
						var ret = {
							type_: "tex-math",
							p1: buffer.o
						};
						for (var p in buffer) delete buffer[p];
						return ret;
					}
				}
			}
		},
		"9,9": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": {} },
				",": { "*": { action_: "comma" } },
				"else": { "*": { action_: "copy" } }
			}),
			actions: { "comma": function comma() {
				return { type_: "commaDecimal" };
			} }
		},
		"pu": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": { action_: "output" } },
				"space$": { "*": { action_: ["output", "space"] } },
				"{[(|)]}": { "0|a": { action_: "copy" } },
				"(-)(9)^(-9)": { "0": {
					action_: "number^",
					nextState: "a"
				} },
				"(-)(9.,9)(e)(99)": { "0": {
					action_: "enumber",
					nextState: "a"
				} },
				"space": { "0|a": {} },
				"pm-operator": { "0|a": {
					action_: {
						type_: "operator",
						option: "\\pm"
					},
					nextState: "0"
				} },
				"operator": { "0|a": {
					action_: "copy",
					nextState: "0"
				} },
				"//": { "d": {
					action_: "o=",
					nextState: "/"
				} },
				"/": { "d": {
					action_: "o=",
					nextState: "/"
				} },
				"{...}|else": {
					"0|d": {
						action_: "d=",
						nextState: "d"
					},
					"a": {
						action_: ["space", "d="],
						nextState: "d"
					},
					"/|q": {
						action_: "q=",
						nextState: "q"
					}
				}
			}),
			actions: {
				"enumber": function enumber(buffer, m) {
					/** @type {ParserOutput[]} */
					var ret = [];
					if (m[0] === "+-" || m[0] === "+/-") ret.push("\\pm ");
					else if (m[0]) ret.push(m[0]);
					if (m[1]) {
						mhchemParser.concatArray(ret, mhchemParser.go(m[1], "pu-9,9"));
						if (m[2]) if (m[2].match(/[,.]/)) mhchemParser.concatArray(ret, mhchemParser.go(m[2], "pu-9,9"));
						else ret.push(m[2]);
						m[3] = m[4] || m[3];
						if (m[3]) {
							m[3] = m[3].trim();
							if (m[3] === "e" || m[3].substr(0, 1) === "*") ret.push({ type_: "cdot" });
							else ret.push({ type_: "times" });
						}
					}
					if (m[3]) ret.push("10^{" + m[5] + "}");
					return ret;
				},
				"number^": function number(buffer, m) {
					/** @type {ParserOutput[]} */
					var ret = [];
					if (m[0] === "+-" || m[0] === "+/-") ret.push("\\pm ");
					else if (m[0]) ret.push(m[0]);
					mhchemParser.concatArray(ret, mhchemParser.go(m[1], "pu-9,9"));
					ret.push("^{" + m[2] + "}");
					return ret;
				},
				"operator": function operator(buffer, m, p1) {
					return {
						type_: "operator",
						kind_: p1 || m
					};
				},
				"space": function space() {
					return { type_: "pu-space-1" };
				},
				"output": function output(buffer) {
					/** @type {ParserOutput | ParserOutput[]} */
					var ret;
					var md = mhchemParser.patterns.match_("{(...)}", buffer.d || "");
					if (md && md.remainder === "") buffer.d = md.match_;
					var mq = mhchemParser.patterns.match_("{(...)}", buffer.q || "");
					if (mq && mq.remainder === "") buffer.q = mq.match_;
					if (buffer.d) {
						buffer.d = buffer.d.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C");
						buffer.d = buffer.d.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F");
					}
					if (buffer.q) {
						buffer.q = buffer.q.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C");
						buffer.q = buffer.q.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F");
						var b5 = {
							d: mhchemParser.go(buffer.d, "pu"),
							q: mhchemParser.go(buffer.q, "pu")
						};
						if (buffer.o === "//") ret = {
							type_: "pu-frac",
							p1: b5.d,
							p2: b5.q
						};
						else {
							ret = b5.d;
							if (b5.d.length > 1 || b5.q.length > 1) ret.push({ type_: " / " });
							else ret.push({ type_: "/" });
							mhchemParser.concatArray(ret, b5.q);
						}
					} else ret = mhchemParser.go(buffer.d, "pu-2");
					for (var p in buffer) delete buffer[p];
					return ret;
				}
			}
		},
		"pu-2": {
			transitions: mhchemParser.createTransitions({
				"empty": { "*": { action_: "output" } },
				"*": { "*": {
					action_: ["output", "cdot"],
					nextState: "0"
				} },
				"\\x": { "*": { action_: "rm=" } },
				"space": { "*": {
					action_: ["output", "space"],
					nextState: "0"
				} },
				"^{(...)}|^(-1)": { "1": { action_: "^(-1)" } },
				"-9.,9": {
					"0": {
						action_: "rm=",
						nextState: "0"
					},
					"1": {
						action_: "^(-1)",
						nextState: "0"
					}
				},
				"{...}|else": { "*": {
					action_: "rm=",
					nextState: "1"
				} }
			}),
			actions: {
				"cdot": function cdot() {
					return { type_: "tight cdot" };
				},
				"^(-1)": function _(buffer, m) {
					buffer.rm += "^{" + m + "}";
				},
				"space": function space() {
					return { type_: "pu-space-2" };
				},
				"output": function output(buffer) {
					/** @type {ParserOutput | ParserOutput[]} */
					var ret = [];
					if (buffer.rm) {
						var mrm = mhchemParser.patterns.match_("{(...)}", buffer.rm || "");
						if (mrm && mrm.remainder === "") ret = mhchemParser.go(mrm.match_, "pu");
						else ret = {
							type_: "rm",
							p1: buffer.rm
						};
					}
					for (var p in buffer) delete buffer[p];
					return ret;
				}
			}
		},
		"pu-9,9": {
			transitions: mhchemParser.createTransitions({
				"empty": {
					"0": { action_: "output-0" },
					"o": { action_: "output-o" }
				},
				",": { "0": {
					action_: ["output-0", "comma"],
					nextState: "o"
				} },
				".": { "0": {
					action_: ["output-0", "copy"],
					nextState: "o"
				} },
				"else": { "*": { action_: "text=" } }
			}),
			actions: {
				"comma": function comma() {
					return { type_: "commaDecimal" };
				},
				"output-0": function output0(buffer) {
					/** @type {ParserOutput[]} */
					var ret = [];
					buffer.text_ = buffer.text_ || "";
					if (buffer.text_.length > 4) {
						var a = buffer.text_.length % 3;
						if (a === 0) a = 3;
						for (var i = buffer.text_.length - 3; i > 0; i -= 3) {
							ret.push(buffer.text_.substr(i, 3));
							ret.push({ type_: "1000 separator" });
						}
						ret.push(buffer.text_.substr(0, a));
						ret.reverse();
					} else ret.push(buffer.text_);
					for (var p in buffer) delete buffer[p];
					return ret;
				},
				"output-o": function outputO(buffer) {
					/** @type {ParserOutput[]} */
					var ret = [];
					buffer.text_ = buffer.text_ || "";
					if (buffer.text_.length > 4) {
						var a = buffer.text_.length - 3;
						for (var i = 0; i < a; i += 3) {
							ret.push(buffer.text_.substr(i, 3));
							ret.push({ type_: "1000 separator" });
						}
						ret.push(buffer.text_.substr(i));
					} else ret.push(buffer.text_);
					for (var p in buffer) delete buffer[p];
					return ret;
				}
			}
		}
	};
	texify = {
		go: function go(input, isInner) {
			if (!input) return "";
			var res = "";
			var cee = false;
			for (var i = 0; i < input.length; i++) {
				var inputi = input[i];
				if (typeof inputi === "string") res += inputi;
				else {
					res += texify._go2(inputi);
					if (inputi.type_ === "1st-level escape") cee = true;
				}
			}
			if (!isInner && !cee && res) res = "{" + res + "}";
			return res;
		},
		_goInner: function _goInner(input) {
			if (!input) return input;
			return texify.go(input, true);
		},
		_go2: function _go2(buf) {
			/** @type {undefined | string} */
			var res;
			switch (buf.type_) {
				case "chemfive":
					res = "";
					var b5 = {
						a: texify._goInner(buf.a),
						b: texify._goInner(buf.b),
						p: texify._goInner(buf.p),
						o: texify._goInner(buf.o),
						q: texify._goInner(buf.q),
						d: texify._goInner(buf.d)
					};
					if (b5.a) {
						if (b5.a.match(/^[+\-]/)) b5.a = "{" + b5.a + "}";
						res += b5.a + "\\,";
					}
					if (b5.b || b5.p) {
						res += "{\\vphantom{X}}";
						res += "^{\\hphantom{" + (b5.b || "") + "}}_{\\hphantom{" + (b5.p || "") + "}}";
						res += "{\\vphantom{X}}";
						res += "^{\\smash[t]{\\vphantom{2}}\\mathllap{" + (b5.b || "") + "}}";
						res += "_{\\vphantom{2}\\mathllap{\\smash[t]{" + (b5.p || "") + "}}}";
					}
					if (b5.o) {
						if (b5.o.match(/^[+\-]/)) b5.o = "{" + b5.o + "}";
						res += b5.o;
					}
					if (buf.dType === "kv") {
						if (b5.d || b5.q) res += "{\\vphantom{X}}";
						if (b5.d) res += "^{" + b5.d + "}";
						if (b5.q) res += "_{\\smash[t]{" + b5.q + "}}";
					} else if (buf.dType === "oxidation") {
						if (b5.d) {
							res += "{\\vphantom{X}}";
							res += "^{" + b5.d + "}";
						}
						if (b5.q) {
							res += "{\\vphantom{X}}";
							res += "_{\\smash[t]{" + b5.q + "}}";
						}
					} else {
						if (b5.q) {
							res += "{\\vphantom{X}}";
							res += "_{\\smash[t]{" + b5.q + "}}";
						}
						if (b5.d) {
							res += "{\\vphantom{X}}";
							res += "^{" + b5.d + "}";
						}
					}
					break;
				case "rm":
					res = "\\mathrm{" + buf.p1 + "}";
					break;
				case "text":
					if (buf.p1.match(/[\^_]/)) {
						buf.p1 = buf.p1.replace(" ", "~").replace("-", "\\text{-}");
						res = "\\mathrm{" + buf.p1 + "}";
					} else res = "\\text{" + buf.p1 + "}";
					break;
				case "roman numeral":
					res = "\\mathrm{" + buf.p1 + "}";
					break;
				case "state of aggregation":
					res = "\\mskip2mu " + texify._goInner(buf.p1);
					break;
				case "state of aggregation subscript":
					res = "\\mskip1mu " + texify._goInner(buf.p1);
					break;
				case "bond":
					res = texify._getBond(buf.kind_);
					if (!res) throw ["MhchemErrorBond", "mhchem Error. Unknown bond type (" + buf.kind_ + ")"];
					break;
				case "frac":
					var c = "\\frac{" + buf.p1 + "}{" + buf.p2 + "}";
					res = "\\mathchoice{\\textstyle" + c + "}{" + c + "}{" + c + "}{" + c + "}";
					break;
				case "pu-frac":
					var d = "\\frac{" + texify._goInner(buf.p1) + "}{" + texify._goInner(buf.p2) + "}";
					res = "\\mathchoice{\\textstyle" + d + "}{" + d + "}{" + d + "}{" + d + "}";
					break;
				case "tex-math":
					res = buf.p1 + " ";
					break;
				case "frac-ce":
					res = "\\frac{" + texify._goInner(buf.p1) + "}{" + texify._goInner(buf.p2) + "}";
					break;
				case "overset":
					res = "\\overset{" + texify._goInner(buf.p1) + "}{" + texify._goInner(buf.p2) + "}";
					break;
				case "underset":
					res = "\\underset{" + texify._goInner(buf.p1) + "}{" + texify._goInner(buf.p2) + "}";
					break;
				case "underbrace":
					res = "\\underbrace{" + texify._goInner(buf.p1) + "}_{" + texify._goInner(buf.p2) + "}";
					break;
				case "color":
					res = "{\\color{" + buf.color1 + "}{" + texify._goInner(buf.color2) + "}}";
					break;
				case "color0":
					res = "\\color{" + buf.color + "}";
					break;
				case "arrow":
					var b6 = {
						rd: texify._goInner(buf.rd),
						rq: texify._goInner(buf.rq)
					};
					var arrow = "\\x" + texify._getArrow(buf.r);
					if (b6.rq) arrow += "[{" + b6.rq + "}]";
					if (b6.rd) arrow += "{" + b6.rd + "}";
					else arrow += "{}";
					res = arrow;
					break;
				case "operator":
					res = texify._getOperator(buf.kind_);
					break;
				case "1st-level escape":
					res = buf.p1 + " ";
					break;
				case "space":
					res = " ";
					break;
				case "entitySkip":
					res = "~";
					break;
				case "pu-space-1":
					res = "~";
					break;
				case "pu-space-2":
					res = "\\mkern3mu ";
					break;
				case "1000 separator":
					res = "\\mkern2mu ";
					break;
				case "commaDecimal":
					res = "{,}";
					break;
				case "comma enumeration L":
					res = "{" + buf.p1 + "}\\mkern6mu ";
					break;
				case "comma enumeration M":
					res = "{" + buf.p1 + "}\\mkern3mu ";
					break;
				case "comma enumeration S":
					res = "{" + buf.p1 + "}\\mkern1mu ";
					break;
				case "hyphen":
					res = "\\text{-}";
					break;
				case "addition compound":
					res = "\\,{\\cdot}\\,";
					break;
				case "electron dot":
					res = "\\mkern1mu \\bullet\\mkern1mu ";
					break;
				case "KV x":
					res = "{\\times}";
					break;
				case "prime":
					res = "\\prime ";
					break;
				case "cdot":
					res = "\\cdot ";
					break;
				case "tight cdot":
					res = "\\mkern1mu{\\cdot}\\mkern1mu ";
					break;
				case "times":
					res = "\\times ";
					break;
				case "circa":
					res = "{\\sim}";
					break;
				case "^":
					res = "uparrow";
					break;
				case "v":
					res = "downarrow";
					break;
				case "ellipsis":
					res = "\\ldots ";
					break;
				case "/":
					res = "/";
					break;
				case " / ":
					res = "\\,/\\,";
					break;
				default: throw ["MhchemBugT", "mhchem bug T. Please report."];
			}
			return res;
		},
		_getArrow: function _getArrow(a) {
			switch (a) {
				case "->": return "rightarrow";
				case "→": return "rightarrow";
				case "⟶": return "rightarrow";
				case "<-": return "leftarrow";
				case "<->": return "leftrightarrow";
				case "<-->": return "rightleftarrows";
				case "<=>": return "rightleftharpoons";
				case "⇌": return "rightleftharpoons";
				case "<=>>": return "rightequilibrium";
				case "<<=>": return "leftequilibrium";
				default: throw ["MhchemBugT", "mhchem bug T. Please report."];
			}
		},
		_getBond: function _getBond(a) {
			switch (a) {
				case "-": return "{-}";
				case "1": return "{-}";
				case "=": return "{=}";
				case "2": return "{=}";
				case "#": return "{\\equiv}";
				case "3": return "{\\equiv}";
				case "~": return "{\\tripledash}";
				case "~-": return "{\\mathrlap{\\raisebox{-.1em}{$-$}}\\raisebox{.1em}{$\\tripledash$}}";
				case "~=": return "{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$\\tripledash$}}-}";
				case "~--": return "{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$\\tripledash$}}-}";
				case "-~-": return "{\\mathrlap{\\raisebox{-.2em}{$-$}}\\mathrlap{\\raisebox{.2em}{$-$}}\\tripledash}";
				case "...": return "{{\\cdot}{\\cdot}{\\cdot}}";
				case "....": return "{{\\cdot}{\\cdot}{\\cdot}{\\cdot}}";
				case "->": return "{\\rightarrow}";
				case "<-": return "{\\leftarrow}";
				case "<": return "{<}";
				case ">": return "{>}";
				default: throw ["MhchemBugT", "mhchem bug T. Please report."];
			}
		},
		_getOperator: function _getOperator(a) {
			switch (a) {
				case "+": return " {}+{} ";
				case "-": return " {}-{} ";
				case "=": return " {}={} ";
				case "<": return " {}<{} ";
				case ">": return " {}>{} ";
				case "<<": return " {}\\ll{} ";
				case ">>": return " {}\\gg{} ";
				case "\\pm": return " {}\\pm{} ";
				case "\\approx": return " {}\\approx{} ";
				case "$\\approx$": return " {}\\approx{} ";
				case "v": return " \\downarrow{} ";
				case "(v)": return " \\downarrow{} ";
				case "^": return " \\uparrow{} ";
				case "(^)": return " \\uparrow{} ";
				default: throw ["MhchemBugT", "mhchem bug T. Please report."];
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/block/equation-block.less
var init_equation_block$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/block/equation-block.mjs
function d$9(e) {
	let t = Array.from(e.querySelectorAll(`.katex-html .base`));
	if (!t.length) return null;
	let n = Infinity, r = Infinity, i = -Infinity, a = -Infinity;
	for (let e of t) {
		let t = e.offsetLeft, o = e.offsetTop, s = t + e.offsetWidth, c = o + e.offsetHeight;
		t < n && (n = t), o < r && (r = o), s > i && (i = s), c > a && (a = c);
	}
	return {
		width: i - n,
		height: a - r
	};
}
var import_katex$2, import_react$13, u$9;
var init_equation_block = __esmMin((() => {
	init_dist$7();
	import_katex$2 = /* @__PURE__ */ __toESM(require_katex(), 1);
	init_mhchem();
	init_katex_min();
	import_react$13 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_equation_block$1();
	u$9 = (u) => {
		let { block: f } = u, { width: p, title: m } = f.props, [, h] = s$12(), g = s$11(), _ = typeof p == `number`, v = (m ?? []).map(([e]) => e).join(``), y = (0, import_react$13.useRef)(null), b = (0, import_react$13.useRef)(null), [x, S] = (0, import_react$13.useState)(null), [C, w] = (0, import_react$13.useState)(null), T = (0, import_react$13.useMemo)(() => import_katex$2.default.renderToString(v, {
			displayMode: !0,
			throwOnError: !1
		}), [v]), E = (0, import_react$13.useCallback)((e) => {
			e.button === 0 && (g || (e.preventDefault(), e.stopPropagation(), window.getSelection()?.removeAllRanges(), h({
				type: `block-range`,
				blockIds: [f.id],
				anchorBlockId: f.id,
				focusBlockId: f.id
			})));
		}, [
			h,
			f.id,
			g
		]), D = (0, import_react$13.useCallback)((e) => {
			e.stopPropagation();
		}, []);
		(0, import_react$13.useLayoutEffect)(() => {
			if (!_) return;
			let e = y.current, t = b.current;
			if (!e || !t) return;
			let n = 0, r = () => {
				let n = d$9(t);
				if (!n) return;
				let r = e.clientWidth;
				if (!r) return;
				let i = r / n.width, a = n.height * i;
				S(i), w(a);
			}, i = () => {
				cancelAnimationFrame(n), n = requestAnimationFrame(r);
			};
			S(null), w(null), i();
			let a = new ResizeObserver(i);
			return a.observe(e), a.observe(t), () => {
				cancelAnimationFrame(n), a.disconnect();
			};
		}, [_, T]);
		let O = {
			position: `relative`,
			maxWidth: `100%`,
			overflow: `visible`,
			...typeof p == `number` ? { width: p } : {},
			..._ && typeof C == `number` ? { height: C } : {}
		}, k = _ ? {
			position: `absolute`,
			left: 0,
			top: 0,
			transform: typeof x == `number` ? `scale(${x})` : void 0,
			transformOrigin: `top left`,
			visibility: typeof x == `number` ? `visible` : `hidden`
		} : {}, A = _ ? { width: `max-content` } : {};
		return import_react$13.createElement(`div`, {
			className: `${e$9.block.content} ${e$9.block.embedContent}`,
			onMouseDown: E,
			onClick: D,
			contentEditable: !1,
			style: {
				cursor: `pointer`,
				userSelect: `none`
			}
		}, import_react$13.createElement(`div`, {
			ref: y,
			style: O
		}, import_react$13.createElement(`div`, { style: k }, import_react$13.createElement(`div`, {
			ref: b,
			contentEditable: !1,
			style: A,
			dangerouslySetInnerHTML: { __html: T }
		}))));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/block/equation-inline.less
var init_equation_inline$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/block/equation-inline.mjs
function l$12({ value: l, selected: u, editor: d, blockId: f, index: p, offset: m }) {
	let h = Array.isArray(l) ? l[0] : String(l ?? ``), g = (0, import_react$12.useRef)(null), _ = (0, import_react$12.useMemo)(() => import_katex$1.default.renderToString(h, {
		displayMode: !1,
		throwOnError: !1
	}), [h]);
	return a$11((n) => u ? {
		exclusive: !0,
		anchorRect: () => g.current?.getBoundingClientRect() ?? null,
		items: [{
			type: `icon-button`,
			key: `eq-inline-edit`,
			icon: import_react$12.createElement(Pencil, { size: 14 }),
			label: `编辑公式`,
			onClick: () => {
				n$13(d, {
					blockId: f,
					isNew: !1,
					mode: `inline`,
					insertOffset: m,
					editTokenIndex: p,
					initialLatex: h
				});
			}
		}, {
			type: `icon-button`,
			key: `eq-inline-delete`,
			icon: import_react$12.createElement(Trash2, { size: 14 }),
			label: `删除公式`,
			onClick: () => {
				let e = d.getBlock(f);
				if (!e) return;
				let n = [...e.props.title ?? []];
				n.splice(p, 1), i$14(d, f, n), d.setSelection({
					type: `text`,
					anchor: {
						blockId: f,
						offset: m
					},
					focus: {
						blockId: f,
						offset: m
					}
				});
			}
		}]
	} : null, [
		u,
		h,
		f,
		p,
		d,
		m
	]), import_react$12.createElement(`span`, {
		ref: g,
		className: `sc-equation-inline ${u ? `sc-equation-inline--selected` : ``}`,
		dangerouslySetInnerHTML: { __html: _ }
	});
}
var import_katex$1, import_react$12;
var init_equation_inline = __esmMin((() => {
	init_events();
	init_dist$7();
	init_lucide_react();
	import_katex$1 = /* @__PURE__ */ __toESM(require_katex(), 1);
	import_react$12 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_equation_inline$1();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/block/equation-inline-view.mjs
function r$13({ value: r }) {
	let i = Array.isArray(r) ? r[0] : String(r ?? ``), a = (0, import_react$11.useMemo)(() => import_katex.default.renderToString(i, {
		displayMode: !1,
		throwOnError: !1
	}), [i]);
	return import_react$11.createElement(`span`, {
		className: `sc-equation-inline`,
		style: {
			cursor: `default`,
			userSelect: `text`
		},
		dangerouslySetInnerHTML: { __html: a }
	});
}
var import_katex, import_react$11;
var init_equation_inline_view = __esmMin((() => {
	import_katex = /* @__PURE__ */ __toESM(require_katex(), 1);
	import_react$11 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_equation_inline$1();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/inline-token.mjs
var i$11;
var init_inline_token$1 = __esmMin((() => {
	init_events();
	init_equation_inline();
	init_equation_inline_view();
	init_dist$7();
	i$11 = {
		type: e$10.EquationInline,
		isAtom: !0,
		component: l$12,
		viewComponent: r$13,
		toPlainText(e) {
			return `$${Array.isArray(e) ? e[0] : String(e ?? ``)}$`;
		},
		twoStepDelete: !0,
		afterCreate: ({ editor: t, blockId: n, insertOffset: r }) => {
			n$13(t, {
				blockId: n,
				isNew: !0,
				insertOffset: r,
				mode: `inline`
			});
		},
		meta: { shortcut: `$...$` }
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/input-rules/equation-block-rule.mjs
var r$12, i$10, a$7;
var init_equation_block_rule = __esmMin((() => {
	init_dist$7();
	r$12 = /^\$\$([^$\n]+)\$\$ $/, i$10 = /^\$\$([^$\n]+)\$\$$/, a$7 = {
		name: `equation-block`,
		triggers: [`space`, `enter`],
		apply(a) {
			let o = a.editor.getRecord(a.blockId);
			if (!o || o.type !== e$11.Text) return { consumed: !1 };
			let s = e$12(a.tokens).slice(0, a.caretOffset), c = (a.trigger === `enter` ? i$10 : r$12).exec(s);
			if (!c) return { consumed: !1 };
			let l = c[1];
			return a.editor.blockStore.getParentId(a.blockId) ? (a.editor.dispatch((n) => {
				O$2.convertBlockType(a.editor, n, a.blockId, e$11.Equation, { title: [[l]] }), O$2.insertBlockAfter(a.editor, n, a.blockId, e$11.Text);
			}), { consumed: !0 }) : { consumed: !1 };
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-record/dist/index.mjs
var n$9;
var init_dist$5 = __esmMin((() => {
	n$9 = function(e) {
		return e.Bold = `b`, e.Italic = `i`, e.Underline = `u`, e.Strike = `s`, e.FontColor = `h`, e.BackgroundColor = `g`, e.Code = `c`, e.TextLink = `t`, e.EquationInline = `ei`, e.Footnote = `fn`, e;
	}({});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/input-rules/equation-inline-rule.mjs
var l$11, u$8;
var init_equation_inline_rule = __esmMin((() => {
	init_dist$7();
	init_dist$5();
	l$11 = /(?<!\$)\$(?!\s)([^$]+?)(?<!\s)\$$/, u$8 = {
		name: `equation-inline`,
		triggers: [`insert`],
		apply(u) {
			if (u.insertedChar !== `$`) return { consumed: !1 };
			let d = u.editor.getRecord(u.blockId);
			if (!d || !t$10(d.type)) return { consumed: !1 };
			let { windowText: f, windowStart: p } = e$13(e$12(u.tokens), u.caretOffset), m = l$11.exec(f);
			if (!m) return { consumed: !1 };
			let h = p + m.index, g = p + m.index + m[0].length, _ = m[1], v = p$6(u.tokens, h, g);
			v = d$10(v, h, t$11), v = v$2(v, h, h + 1, [n$9.EquationInline, [_]]);
			let y = h + 1;
			return u.editor.setSelection({
				type: `text`,
				anchor: {
					blockId: u.blockId,
					offset: y
				},
				focus: {
					blockId: u.blockId,
					offset: y
				}
			}), i$14(u.editor, u.blockId, v), { consumed: !0 };
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/node_modules/@tencent/smart-doc-spec/dist/index.mjs
function a$6(e) {
	let t = {};
	for (let n of e) t[n.key] = {
		light: n.light,
		dark: n.dark
	};
	return t;
}
function d$8(e, t = []) {
	return {
		ok: !0,
		value: e,
		warnings: t
	};
}
function f$6(e) {
	return {
		ok: !1,
		warnings: Array.isArray(e) ? e : [e]
	};
}
function p$5(e, t) {
	let n = e[t];
	if (n !== null) return typeof n == `string` ? n : void 0;
}
function m$3(e, t) {
	if (e[t] === null) return !0;
}
function ne$1(e, t) {
	if (!e || e === `undefined`) return {};
	let n = [];
	switch (t) {
		case `background`:
			n = c$9;
			break;
		case `border`:
			n = l$10;
			break;
		case `text`:
			n = s$8;
			break;
		case `divider`:
			n = u$7;
			break;
	}
	return n.includes(e) ? { value: e } : {
		value: e,
		warning: `unknown color token '${e}' for ${t}`
	};
}
function re$1(e, t) {
	for (let n of t) {
		let t = typeof e[n] == `string` ? e[n] : void 0;
		if (t !== void 0 && t !== `undefined`) return t;
	}
}
function h$3(e, t, n = `default`) {
	return !e || e === n || e.endsWith(t) ? e ?? void 0 : e + t;
}
function g$2(e, t, n, r) {
	let i = ne$1(e, t);
	return i.warning && r.push(`${n}: ${i.warning}`), i.value;
}
function _$1(e) {
	let t = [], n = h$3(re$1(e, [
		`blockColor`,
		`bgColor`,
		`backgroundColor`
	]), `_background`), r = re$1(e, [
		`borderColor`,
		`border`,
		`border_color`
	]), i = h$3(typeof e.dividerColor == `string` ? e.dividerColor : void 0, `_divider`), a = g$2(n, `background`, `blockColor`, t), o = g$2(r, `border`, `borderColor`, t), s = g$2(i, `divider`, `dividerColor`, t);
	return d$8({
		...a ? { blockColor: a } : {},
		...o ? { borderColor: o } : {},
		...s ? { dividerColor: s } : {}
	}, t);
}
function v$1(e, t) {
	typeof e.blockColor == `string` && (t.blockColor = e.blockColor), typeof e.borderColor == `string` && (t.borderColor = e.borderColor);
}
function y$1(e, t) {
	return typeof e.blockColor == `string` && (t.blockColor = e.blockColor.replace(`_background`, ``)), typeof e.borderColor == `string` && (t.borderColor = e.borderColor), e.id && (t.id = e.id), t;
}
function ie$1(e, t) {
	for (let n of [
		`underline`,
		`italic`,
		`bold`,
		`strike`
	]) m$3(e, n) && (t[n] = !0);
}
function b$2(e) {
	let t = [], n = {}, r = p$5(e, `color`);
	r && (n.color = g$2(r, `text`, `color`, t));
	let i = p$5(e, `backgroundColor`) || p$5(e, `bgColor`);
	return i && (n.backgroundColor = g$2(h$3(i, `_background`), `background`, `backgroundColor`, t)), ie$1(e, n), d$8(n, t);
}
function ce$1(e) {
	if (typeof crypto < `u` && typeof crypto.getRandomValues == `function`) crypto.getRandomValues(e);
	else for (let t = 0; t < e.length; t++) e[t] = Math.random() * 256 | 0;
}
function le$1(e = 22) {
	let t = Math.ceil(1.6 * 63 * e / 62), n = new Uint8Array(t), r = ``;
	for (;;) {
		ce$1(n);
		for (let i = 0; i < t; i++) {
			let t = n[i] & 63;
			if (t < 62 && (r += `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`[t], r.length === e)) return r;
		}
	}
}
function C$2(e, t) {
	let [n, r] = t;
	return r === void 0 && e.some(([e, t]) => e === n && t === void 0) ? e : [...e, t];
}
function de$1(e) {
	let t = [];
	if (!e || typeof e != `object`) return t;
	let n = e;
	n.bold === !0 && t.push([`b`]), n.italic === !0 && t.push([`i`]), n.underline === !0 && t.push([`u`]), n.strike === !0 && t.push([`s`]);
	let r = n.color;
	typeof r == `string` && r && t.push([`h`, r]);
	let { backgroundColor: i } = n;
	return typeof i == `string` && i && t.push([`g`, i]), t;
}
function w$2(e, t, n, r) {
	if (!e) return;
	let i = r ? C$2(t, r) : t;
	n.push([e, i.length ? i : void 0]);
}
function T$2(e, t, n) {
	let r = C$2(e, n);
	t.push([`△`, r.length ? r : void 0]);
}
function E$1(e, t, n) {
	if (e) switch (e.type) {
		case `text`:
			w$2(e.value ?? ``, t, n);
			return;
		case `inlineCode`:
			fe$1(e, t, n);
			return;
		case `inlineMath`:
			pe$1(e, t, n);
			return;
		case `footnoteRef`:
			me$1(e, t, n);
			return;
		case `strong`:
		case `emphasis`:
		case `delete`:
			he$1(e, t, n);
			return;
		case `link`:
			ge$1(e, t, n);
			return;
		case `span`:
			_e$1(e, t, n);
			return;
		default: return;
	}
}
function fe$1(e, t, n) {
	e.value && w$2(e.value, t, n, [`c`]);
}
function pe$1(e, t, n) {
	e.value && T$2(t, n, [`ei`, [e.value, le$1(10)]]);
}
function me$1(e, t, n) {
	e.id && T$2(t, n, [`fn`, e.id]);
}
function he$1(e, t, n) {
	let r = ue$1[e.type], i = r ? C$2(t, [r]) : t;
	D$1(e.children, i, n);
}
function ge$1(e, t, n) {
	let r = C$2(t, [`t`, e.url]);
	D$1(e.children, r, n);
}
function _e$1(e, t, n) {
	let r = t;
	for (let t of de$1(e.marks)) r = C$2(r, t);
	D$1(e.children, r, n);
}
function D$1(e, t, n) {
	for (let r of e ?? []) E$1(r, t, n);
}
function ve$1(e, t) {
	if (e === t) return !0;
	if (Array.isArray(e) || Array.isArray(t)) {
		if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) return !1;
		for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	return !1;
}
function ye$1(e, t) {
	if (!e?.length && !t?.length) return !0;
	if (!e || !t || e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let [r, i] = e[n], [a, o] = t[n];
		if (r !== a || !ve$1(i, o)) return !1;
	}
	return !0;
}
function be$1(e) {
	let t = [];
	for (let n of e) {
		let [e, r] = n;
		if (!e) continue;
		let i = t[t.length - 1];
		i && ye$1(i[1], r) ? i[0] += e : t.push([e, r]);
	}
	return t;
}
function O$1(e) {
	let t = [];
	for (let n of e) E$1(n, [], t);
	return be$1(t);
}
function k$1(e, t) {
	let { onMissing: n = `empty`, keepParagraph: r = !1 } = t ?? {};
	if (e.type !== `custom`) return n === `skip` ? { restChildren: [] } : {
		title: [],
		restChildren: [],
		inline: []
	};
	let i = e.children ?? [], a = i.findIndex((e) => e.type === `paragraph`);
	if (a !== 0 && t?.mustBeFirst && (a = -1), a === -1) return n === `skip` ? { restChildren: i } : {
		title: [],
		restChildren: i,
		inline: []
	};
	let o = i[a].content ?? [];
	return {
		title: O$1(o),
		restChildren: r ? i : i.filter((e, t) => t !== a),
		inline: o
	};
}
function A$1(e) {
	return {
		...e,
		parseMdxProps(t) {
			let n = [], r = e.parseMdxProps(t);
			if (n.push(...r.warnings), !r.ok) return f$6(n);
			let i = _$1(t);
			return n.push(...i.warnings), d$8({
				...r.value,
				...i.ok ? i.value : {}
			}, n);
		},
		toRecordProps(t) {
			let n = {};
			return v$1(t, n), {
				...n,
				...e.toRecordProps(t)
			};
		},
		toIRProps(t) {
			let n = {};
			y$1(t, n);
			let r = e.toIRProps(t);
			return r.dividerColor && delete n.blockColor, {
				...n,
				...r
			};
		}
	};
}
function j$1(e) {
	return {
		...e,
		deriveIR: ({ record: e, props: t, children: n, cap: r }) => {
			if (e.props.title && e.props.title.length > 0) {
				let t = {
					type: `paragraph`,
					content: r.tokensToInlineIR(e.props.title)
				};
				n.unshift(t);
			}
			return {
				props: { ...t },
				children: n
			};
		}
	};
}
function M$1(e, t) {
	return {
		...e,
		deriveRecord: ({ node: e, props: n }) => {
			let { title: r = [], restChildren: i } = k$1(e, {
				onMissing: `empty`,
				keepParagraph: !1,
				mustBeFirst: t?.mustBeFirst
			});
			return {
				props: {
					...n,
					title: r
				},
				consumeChildren: !1,
				restChildren: i
			};
		}
	};
}
function N$1(e) {
	return {
		...e,
		parseMdxProps(t) {
			let n = [], r = e.parseMdxProps(t);
			if (!r.ok) return f$6(r.warnings);
			n.push(...r.warnings);
			let i = b$2(t);
			return n.push(...i.warnings), d$8({
				...r.value,
				...i.ok ? { __marks: i.value } : {}
			}, n);
		},
		buildInlineIR({ props: t, children: n }) {
			let r = e.buildInlineIR({
				props: t,
				children: n
			}), i = t.__marks;
			return !i || Object.keys(i).length === 0 ? r : {
				type: `span`,
				marks: i,
				children: [r]
			};
		}
	};
}
function xe$1(e, t) {
	let n = e.children[0];
	return n?.type === `paragraph` ? t.serializeChildren(n.content) : ``;
}
function Se$1(e, t) {
	let [, ...n] = e.children;
	return t.serializeChildren(n);
}
function P$1(e, t) {
	return `${xe$1(e, t)}${Se$1(e, t)}`;
}
function q$1(e, t) {
	let n = {};
	return e.url && (n.src = e.url), e.alt && (n.alt = e.alt || e.title), t && (n.link = t), {
		type: `custom`,
		name: `Image`,
		props: n,
		children: []
	};
}
function Te$1(e) {
	let t = [];
	for (let n of e) {
		if (n.type !== `text`) {
			t.push(n);
			continue;
		}
		let e = De$1(n.value);
		e.length === 1 && e[0].type === `raw` ? t.push(n) : t.push(...Ee$1(e));
	}
	return t;
}
function Ee$1(e) {
	let t = [];
	for (let n of e) n.type === `raw` && n.value ? t.push({
		type: `text`,
		value: n.value
	}) : n.type === `underline` && t.push(Oe$1(n.value));
	return t;
}
function De$1(e) {
	let t = [], n = 0;
	we$1.lastIndex = 0;
	for (let r of e.matchAll(we$1)) {
		let i = r.index ?? 0, a = i + r[0].length;
		i > n && t.push({
			type: `raw`,
			value: e.slice(n, i)
		}), t.push({
			type: `underline`,
			value: r[1]
		}), n = a;
	}
	return n < e.length && t.push({
		type: `raw`,
		value: e.slice(n)
	}), t.length === 0 && t.push({
		type: `raw`,
		value: e
	}), t;
}
function Oe$1(e) {
	return {
		type: `mdxJsxTextElement`,
		name: `Mark`,
		attributes: [{
			type: `mdxJsxAttribute`,
			name: `underline`,
			value: null
		}],
		children: [{
			type: `text`,
			value: e
		}]
	};
}
function J$1(e, t) {
	let n = t;
	for (; (e[n] ?? 0) > 0;) --e[n], n += 1;
	return n;
}
function Y$1(e) {
	return e;
}
function X$1(e) {
	return {
		colspan: typeof e.props.colspan == `number` ? e.props.colspan : 1,
		rowspan: typeof e.props.rowspan == `number` ? e.props.rowspan : 1
	};
}
function Z$1(e, t) {
	for (let n = t; n < e.length; n++) (e[n] ?? 0) > 0 && --e[n];
}
function je$1(e) {
	let t = [], n = 0;
	for (let r of e.children) {
		let e = Y$1(r), i = 0;
		for (let r of e.children) {
			i = J$1(t, i);
			let { colspan: e, rowspan: a } = X$1(Y$1(r));
			if (a > 1) for (let n = i; n < i + e; n++) t[n] = (t[n] ?? 0) + (a - 1);
			i += e, i > n && (n = i);
		}
		Z$1(t, i);
	}
	return n;
}
function Me$1(e, t) {
	let n = [], r = [];
	for (let i = 0; i < e.children.length; i++) {
		let a = Y$1(e.children[i]), o = 0;
		for (let e = 0; e < a.children.length; e++) {
			o = J$1(n, o);
			let s = Y$1(a.children[e]), { colspan: c, rowspan: l } = X$1(s);
			if (s.props.columnKey = t[o] ?? t[t.length - 1], (c > 1 || l > 1) && r.push({
				startCell: [i, o],
				endCell: [i + l - 1, o + c - 1]
			}), l > 1) for (let e = o; e < o + c; e++) n[e] = (n[e] ?? 0) + (l - 1);
			o += c;
		}
		Z$1(n, o);
	}
	return r;
}
function Ne$1(e, t, n) {
	if (t.length === 0) return;
	let r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let [t, i] = e.startCell, [a, o] = e.endCell;
		for (let e = t; e <= a; e++) for (let a = i; a <= o; a++) {
			if (e === t && a === i) continue;
			let o = n[a] ?? n[n.length - 1], s = r.get(e);
			s || (s = [], r.set(e, s)), s.push({
				colIndex: a,
				columnKey: o
			});
		}
	}
	if (r.size === 0) return;
	let i = [];
	for (let t = 0; t < e.children.length; t++) {
		let n = Y$1(e.children[t]), a = r.get(t), o = [], s = 0;
		for (let e of n.children) {
			s = J$1(i, s);
			let { colspan: t, rowspan: n } = X$1(Y$1(e));
			if (o.push({
				gridCol: s,
				node: e
			}), n > 1) for (let e = s; e < s + t; e++) i[e] = (i[e] ?? 0) + (n - 1);
			s += t;
		}
		if (Z$1(i, s), !a?.length) continue;
		let c = [...o];
		for (let e of a) {
			let t = {
				type: `custom`,
				name: `TableCell`,
				props: { columnKey: e.columnKey },
				children: [{
					type: `paragraph`,
					content: []
				}]
			};
			c.push({
				gridCol: e.colIndex,
				node: t
			});
		}
		c.sort((e, t) => e.gridCol - t.gridCol), Y$1(e.children[t]).children = c.map((e) => e.node);
	}
}
function Pe$1(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	if (n) for (let e = 0; e < n.length; e++) r.set(n[e], e);
	let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
	for (let e of t) {
		let [t, n] = e.startCell, [r, o] = e.endCell;
		i.set(`${t},${n}`, {
			colspan: o - n + 1,
			rowspan: r - t + 1
		});
		for (let e = t; e <= r; e++) for (let r = n; r <= o; r++) e === t && r === n || a.add(`${e},${r}`);
	}
	let o = [];
	e.forEach((e, t) => {
		let n = Y$1(e), s = [];
		for (let e of n.children) {
			let n = Y$1(e), c = n.props.columnKey, l = c === void 0 ? -1 : r.get(c) ?? -1;
			if (l < 0) {
				s.push(e);
				continue;
			}
			if (a.has(`${t},${l}`)) continue;
			let u = i.get(`${t},${l}`);
			if (u && (n.props.colspan = u.colspan, n.props.rowspan = u.rowspan, u.rowspan > 1)) for (let e = l; e < l + u.colspan; e++) o[e] = (o[e] ?? 0) + (u.rowspan - 1);
			s.push(e);
		}
		n.children = s, Z$1(o, 0);
	});
}
var e$7, t$8, n$8, r$11, i$9, o$6, s$8, c$9, l$10, u$7, ue$1, V$1, we$1, ke$1, Fe$1;
var init_dist$4 = __esmMin((() => {
	init_dist$6();
	e$7 = [
		{
			key: `default`,
			label: `colors.default`,
			light: `rgb(31, 31, 31)`,
			dark: `rgb(237, 237, 237)`
		},
		{
			key: `grey`,
			label: `colors.grey`,
			light: `rgb(133, 133, 133)`,
			dark: `rgb(123, 123, 123)`
		},
		{
			key: `blue`,
			label: `colors.blue`,
			light: `rgb(41, 114, 244)`,
			dark: `rgb(78, 168, 246)`
		},
		{
			key: `sky_blue`,
			label: `colors.sky_blue`,
			light: `rgb(0, 163, 245)`,
			dark: `rgb(37, 184, 247)`
		},
		{
			key: `green`,
			label: `colors.green`,
			light: `rgb(69, 176, 118)`,
			dark: `rgb(114, 192, 146)`
		},
		{
			key: `yellow`,
			label: `colors.yellow`,
			light: `rgb(245, 196, 0)`,
			dark: `rgb(247, 212, 37)`
		},
		{
			key: `orange`,
			label: `colors.orange`,
			light: `rgb(248, 136, 37)`,
			dark: `rgb(249, 162, 74)`
		},
		{
			key: `red`,
			label: `colors.red`,
			light: `rgb(222, 60, 54)`,
			dark: `rgb(229, 100, 90)`
		},
		{
			key: `rose_red`,
			label: `colors.rose_red`,
			light: `rgb(221, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		{
			key: `purple`,
			label: `colors.purple`,
			light: `rgb(154, 56, 215)`,
			dark: `rgb(177, 92, 223)`
		}
	], t$8 = {
		code: {
			light: `rgb(211, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		reminder: {
			light: `rgb(224, 120, 0)`,
			dark: `rgb(230, 146, 35)`
		}
	}, n$8 = [
		{
			key: `default`,
			label: `colors.defaultBg`,
			light: `transparent`,
			dark: `transparent`
		},
		{
			key: `light_grey_background`,
			label: `colors.light_greyBg`,
			light: `rgb(243, 245, 247)`,
			dark: `rgb(45, 45, 45)`
		},
		{
			key: `light_blue_background`,
			label: `colors.light_blueBg`,
			light: `rgb(229, 239, 255)`,
			dark: `rgb(61, 92, 135)`
		},
		{
			key: `light_sky_blue_background`,
			label: `colors.light_sky_blueBg`,
			light: `rgb(229, 246, 255)`,
			dark: `rgb(40, 87, 129)`
		},
		{
			key: `light_green_background`,
			label: `colors.light_greenBg`,
			light: `rgb(234, 250, 241)`,
			dark: `rgb(23, 57, 43)`
		},
		{
			key: `light_yellow_background`,
			label: `colors.light_yellowBg`,
			light: `rgb(255, 249, 227)`,
			dark: `rgb(62, 52, 15)`
		},
		{
			key: `light_orange_background`,
			label: `colors.light_orangeBg`,
			light: `rgb(255, 243, 235)`,
			dark: `rgb(66, 39, 24)`
		},
		{
			key: `light_red_background`,
			label: `colors.light_redBg`,
			light: `rgb(255, 233, 232)`,
			dark: `rgb(74, 32, 34)`
		},
		{
			key: `light_rose_red_background`,
			label: `colors.light_rose_redBg`,
			light: `rgb(255, 236, 244)`,
			dark: `rgb(74, 31, 56)`
		},
		{
			key: `light_purple_background`,
			label: `colors.light_purpleBg`,
			light: `rgb(253, 235, 255)`,
			dark: `rgb(62, 32, 76)`
		},
		{
			key: `grey_background`,
			label: `colors.greyBg`,
			light: `rgb(235, 235, 235)`,
			dark: `rgb(58, 58, 58)`
		},
		{
			key: `dark_background`,
			label: `colors.darkBg`,
			light: `rgb(220, 223, 228)`,
			dark: `rgb(74, 74, 74)`
		},
		{
			key: `blue_background`,
			label: `colors.blueBg`,
			light: `rgb(199, 220, 255)`,
			dark: `rgb(34, 59, 108)`
		},
		{
			key: `sky_blue_background`,
			label: `colors.sky_blueBg`,
			light: `rgb(199, 236, 255)`,
			dark: `rgb(20, 72, 110)`
		},
		{
			key: `green_background`,
			label: `colors.greenBg`,
			light: `rgb(172, 226, 197)`,
			dark: `rgb(27, 82, 58)`
		},
		{
			key: `yellow_background`,
			label: `colors.yellowBg`,
			light: `rgb(255, 238, 173)`,
			dark: `rgb(91, 74, 12)`
		},
		{
			key: `orange_background`,
			label: `colors.orangeBg`,
			light: `rgb(255, 220, 196)`,
			dark: `rgb(98, 53, 28)`
		},
		{
			key: `red_background`,
			label: `colors.redBg`,
			light: `rgb(255, 201, 199)`,
			dark: `rgb(111, 40, 43)`
		},
		{
			key: `rose_red_background`,
			label: `colors.rose_redBg`,
			light: `rgb(255, 199, 226)`,
			dark: `rgb(111, 39, 80)`
		},
		{
			key: `purple_background`,
			label: `colors.purpleBg`,
			light: `rgb(242, 199, 255)`,
			dark: `rgb(91, 40, 113)`
		}
	], r$11 = [
		{
			key: `default`,
			label: `colors.defaultBorder`,
			light: `transparent`,
			dark: `transparent`
		},
		{
			key: `grey`,
			label: `colors.greyBorder`,
			light: `rgb(128, 134, 143)`,
			dark: `rgb(91, 92, 92)`
		},
		{
			key: `blue`,
			label: `colors.blueBorder`,
			light: `rgb(176, 205, 255)`,
			dark: `rgb(47, 74, 136)`
		},
		{
			key: `sky_blue`,
			label: `colors.sky_blueBorder`,
			light: `rgb(150, 222, 238)`,
			dark: `rgb(43, 108, 129)`
		},
		{
			key: `green`,
			label: `colors.greenBorder`,
			light: `rgb(168, 224, 194)`,
			dark: `rgb(49, 124, 88)`
		},
		{
			key: `yellow`,
			label: `colors.yellowBorder`,
			light: `rgb(249, 227, 139)`,
			dark: `rgb(134, 108, 37)`
		},
		{
			key: `orange`,
			label: `colors.orangeBorder`,
			light: `rgb(255, 186, 133)`,
			dark: `rgb(136, 73, 37)`
		},
		{
			key: `red`,
			label: `colors.redBorder`,
			light: `rgb(255, 166, 163)`,
			dark: `rgb(136, 44, 48)`
		},
		{
			key: `rose_red`,
			label: `colors.rose_redBorder`,
			light: `rgb(255, 174, 218)`,
			dark: `rgb(136, 47, 102)`
		},
		{
			key: `purple`,
			label: `colors.purpleBorder`,
			light: `rgb(231, 180, 255)`,
			dark: `rgb(101, 45, 136)`
		}
	], i$9 = [
		{
			key: `default`,
			label: `colors.defaultDivider`,
			light: `rgba(0, 0, 0, 0.12)`,
			dark: `rgb(237, 237, 237)`
		},
		{
			key: `black_divider`,
			label: `colors.blackDivider`,
			light: `rgb(0, 0, 0)`,
			dark: `rgb(65, 68, 74)`
		},
		{
			key: `grey_divider`,
			label: `colors.greyDivider`,
			light: `rgb(133, 133, 133)`,
			dark: `rgb(123, 123, 123)`
		},
		{
			key: `light_grey_divider`,
			label: `colors.light_greyDivider`,
			light: `rgb(220, 223, 228)`,
			dark: `rgb(91, 92, 92)`
		},
		{
			key: `blue_divider`,
			label: `colors.blueDivider`,
			light: `rgb(41, 114, 244)`,
			dark: `rgb(78, 168, 246)`
		},
		{
			key: `light_blue_divider`,
			label: `colors.light_blueDivider`,
			light: `rgb(176, 205, 255)`,
			dark: `rgb(47, 74, 136)`
		},
		{
			key: `table_blue_divider`,
			label: `colors.table_blueDivider`,
			light: `rgb(102, 183, 252)`,
			dark: `rgb(32, 93, 164)`
		},
		{
			key: `sky_blue_divider`,
			label: `colors.sky_blueDivider`,
			light: `rgb(0, 163, 245)`,
			dark: `rgb(37, 184, 247)`
		},
		{
			key: `light_sky_blue_divider`,
			label: `colors.light_sky_blueDivider`,
			light: `rgb(150, 222, 238)`,
			dark: `rgb(43, 108, 129)`
		},
		{
			key: `green_divider`,
			label: `colors.greenDivider`,
			light: `rgb(0, 179, 113)`,
			dark: `rgb(114, 192, 146)`
		},
		{
			key: `light_green_divider`,
			label: `colors.light_greenDivider`,
			light: `rgb(156, 228, 195)`,
			dark: `rgb(49, 124, 88)`
		},
		{
			key: `yellow_divider`,
			label: `colors.yellowDivider`,
			light: `rgb(254, 193, 0)`,
			dark: `rgb(247, 212, 37)`
		},
		{
			key: `light_yellow_divider`,
			label: `colors.light_yellowDivider`,
			light: `rgb(255, 237, 165)`,
			dark: `rgb(134, 108, 37)`
		},
		{
			key: `orange_divider`,
			label: `colors.orangeDivider`,
			light: `rgb(255, 128, 0)`,
			dark: `rgb(249, 162, 74)`
		},
		{
			key: `light_orange_divider`,
			label: `colors.light_orangeDivider`,
			light: `rgb(255, 218, 193)`,
			dark: `rgb(136, 73, 37)`
		},
		{
			key: `red_divider`,
			label: `colors.redDivider`,
			light: `rgb(242, 35, 41)`,
			dark: `rgb(229, 100, 90)`
		},
		{
			key: `light_red_divider`,
			label: `colors.light_redDivider`,
			light: `rgb(255, 198, 197)`,
			dark: `rgb(136, 44, 48)`
		},
		{
			key: `rose_red_divider`,
			label: `colors.rose_redDivider`,
			light: `rgb(221, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		{
			key: `light_rose_red_divider`,
			label: `colors.light_rose_redDivider`,
			light: `rgb(255, 174, 218)`,
			dark: `rgb(136, 47, 102)`
		},
		{
			key: `purple_divider`,
			label: `colors.purpleDivider`,
			light: `rgb(167, 46, 223)`,
			dark: `rgb(177, 92, 223)`
		},
		{
			key: `light_purple_divider`,
			label: `colors.light_purpleDivider`,
			light: `rgb(250, 197, 255)`,
			dark: `rgb(101, 45, 136)`
		}
	];
	o$6 = {
		text: {
			...a$6(e$7),
			...t$8
		},
		background: a$6(n$8),
		border: a$6(r$11),
		divider: a$6(i$9)
	}, s$8 = Object.keys(o$6.text), c$9 = Object.keys(o$6.background), l$10 = Object.keys(o$6.border), u$7 = Object.keys(o$6.divider);
	ue$1 = {
		strong: `b`,
		emphasis: `i`,
		delete: `s`
	};
	j$1(M$1(A$1({
		type: `bulleted_list`,
		category: `textContainer`,
		name: `BulletedList`,
		recordType: `bulleted_list`,
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ul><li>${P$1(e, t)}</li></ul>` : ``;
		}
	}))), j$1(A$1({
		type: `callout`,
		category: `container`,
		name: `Callout`,
		recordType: `callout`,
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `icon`);
			return n && (t.icon = n), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.icon && (t.pageIcon = e.icon), t.blockColor = e.blockColor ?? `blue_background`, t.borderColor = e.borderColor ?? `blue`, t;
		},
		toIRProps(e) {
			let t = {};
			return e.pageIcon && (t.icon = e.pageIcon), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="Callout">${t.serializeChildren(e.children)}</div>` : ``;
		}
	})), A$1({
		type: `column_list`,
		category: `container`,
		name: `ColumnList`,
		recordType: `column_list`,
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let n = e, r = n.children.map((e) => e.props.width ?? ``), i = (e) => {
				let t = -1;
				return e && (e.trim().endsWith(`%`) ? t = Number(e.trim().split(`%`)[0]) / 100 : e.indexOf(`.`) > -1 && (t = Number(e))), t;
			}, a = (e) => !(Number.isNaN(e) || e < 0 || e > 1), o = r.map(i).filter(a), s = (1 - o.reduce((e, t) => e + t, 0)) / (n.children.length - o.length);
			for (let e of n.children) {
				let t = e;
				a(i(t.props.width ?? ``)) || (t.props.width = `${s * 100}%`);
			}
			return {
				props: t,
				consumeChildren: !1
			};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="ColumnList">${t.serializeChildren(e.children)}</div>` : ``;
		}
	}), A$1({
		type: `column`,
		category: `container`,
		name: `Column`,
		recordType: `column`,
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `width`);
			return n && (t.width = n), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.width && (String(e.width).trim().endsWith(`%`) ? t.columnRatio = Number(String(e.width).trim().split(`%`)[0]) / 100 : t.columnRatio = Number(e.width)), t;
		},
		toIRProps(e) {
			let t = {};
			if (e.columnRatio) {
				let n = Number(e.columnRatio);
				Number.isNaN(n) || (t.width = `${(n * 100).toFixed(2)}%`);
			}
			return t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="Column"${typeof e.props.width == `string` ? ` data-width="${t.escapeHtml(e.props.width)}"` : ``}>${t.serializeChildren(e.children)}</div>` : ``;
		}
	}), A$1({
		type: `divider`,
		category: `embed`,
		name: `Divider`,
		recordType: `divider`,
		irType: `divider`,
		htmlMatch: [{ validTagName: `hr` }],
		mdastTypes: [`thematicBreak`],
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `dividerColor`) ?? p$5(e, `color`);
			return n && (t.dividerColor = n, delete e.color, delete e.dividerColor), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.dividerColor && (t.blockColor = e.dividerColor.endsWith(`_divider`) ? e.dividerColor : `${e.dividerColor}_divider`), t;
		},
		toIRProps(e) {
			let t = {};
			return e.blockColor && (t.dividerColor = e.blockColor.replace(`_divider`, ``)), t;
		},
		fromHtml(e, t) {
			return { type: `divider` };
		},
		toHtml(e, t) {
			return `<hr>`;
		},
		fromMdast(e, t) {
			return {
				node: { type: `divider` },
				warnings: []
			};
		},
		toMdast(e, t) {
			return { type: `thematicBreak` };
		},
		emitRecord(e, t, n) {
			let r = e.newId(), i = e.resolveType(`divider`, `divider`);
			e.putBlock({
				id: r,
				parentId: n,
				type: i,
				props: {},
				children: []
			}), e.appendChild(n, r);
		}
	}), V$1 = A$1({
		type: `equation`,
		category: `embed`,
		name: `MathBlock`,
		recordType: `equation`,
		irType: `math`,
		mdastTypes: [`math`],
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `width`);
			return n && (t.width = n), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.width && (t.width = e.width), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { children: n } = e, r = [[(n ?? []).filter((e) => e.type === `math`)[0]?.value ?? ``]];
			return {
				props: {
					...t,
					title: r
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.width && (t.width = e.width), t;
		},
		deriveIR: ({ record: e, props: t }) => {
			let n = {
				type: `math`,
				value: (e.props.title ?? []).map(([e]) => e).join(``)
			};
			return {
				props: { ...t },
				children: [n]
			};
		},
		toHtml(e, t) {
			if (e.type === `math`) return `<div data-type="math">${t.escapeHtml(e.value)}</div>`;
			if (e.type === `custom`) {
				let n = e.children.find((e) => e.type === `math`);
				return n?.type === `math` ? `<div data-type="MathBlock">${t.escapeHtml(n.value)}</div>` : `<div data-type="MathBlock"></div>`;
			}
			return ``;
		},
		fromMdast(e, t) {
			return {
				node: {
					type: `math`,
					value: e.value ?? ``
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			return {
				type: `math`,
				value: e.type === `math` ? e.value : ``
			};
		},
		emitRecord(e, t, n) {
			let r = t.type === `math` ? t.value : ``, i = e.newId(), a = e.resolveType(`math`, `equation`);
			e.putBlock({
				id: i,
				parentId: n,
				type: a,
				props: { title: [[r]] },
				children: []
			}), e.appendChild(n, i);
		}
	}), A$1({
		type: `header1`,
		category: `text`,
		name: `Heading`,
		recordTypes: [
			`header1`,
			`header2`,
			`header3`,
			`header4`,
			`header5`,
			`header6`
		],
		irType: `heading`,
		htmlMatch: [{ validTagName: [
			`h1`,
			`h2`,
			`h3`,
			`h4`,
			`h5`,
			`h6`
		] }],
		mdastTypes: [`heading`],
		recordType(e) {
			return `header${e.level}`;
		},
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `level`), r = p$5(e, `textAlign`);
			return n && (t.level = n), r && (t.textAlign = r), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { title: n = [] } = k$1(e, { onMissing: `empty` });
			return {
				props: {
					...t,
					title: n
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveIR: ({ record: e, props: t, cap: n }) => {
			let r = e.type.replace(`header`, ``), i = {
				type: `paragraph`,
				content: n.tokensToInlineIR(e.props.title ?? [])
			};
			return {
				props: {
					...t,
					level: r
				},
				children: [i]
			};
		},
		fromHtml(e, t) {
			let n = Number(e.tagName.slice(1)), r = t.blockTextAlign();
			return {
				type: `heading`,
				level: n,
				content: t.parseChildrenInline(),
				...r ? { textAlign: r } : {}
			};
		},
		toHtml(e, t) {
			if (e.type === `custom`) {
				let n = Number(e.props.level) || 1, r = e.props.textAlign ? ` style="text-align:${e.props.textAlign}"` : ``, i = e.children[0];
				return `<h${n}${r}>${i?.type === `paragraph` ? t.serializeChildren(i.content) : t.serializeChildren(e.children)}</h${n}>`;
			}
			if (e.type === `heading`) {
				let n = e.textAlign ? ` style="text-align:${e.textAlign}"` : ``;
				return `<h${e.level}${n}>${t.serializeChildren(e.content)}</h${e.level}>`;
			}
			return ``;
		},
		fromMdast(e, t) {
			let n = e;
			return {
				node: {
					type: `heading`,
					level: n.depth,
					content: t.parseInline(n.children, t.registries)
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			return e.type === `heading` ? {
				type: `heading`,
				depth: e.level,
				children: t.inlineIRsToMdast(e.content)
			} : {
				type: `paragraph`,
				children: []
			};
		},
		emitRecord(e, t, n) {
			if (t.type !== `heading`) return;
			let r = e.newId(), i = e.resolveType(`heading`, `header`);
			e.putBlock({
				id: r,
				parentId: n,
				type: `${i}${t.level}`,
				props: {
					title: O$1(t.content),
					...t.textAlign ? { textAlign: t.textAlign } : {}
				},
				children: []
			}), e.appendChild(n, r);
		}
	}), A$1({
		type: `image`,
		category: `embed`,
		name: `Image`,
		recordType: `image`,
		htmlMatch: [{ validTagName: `img` }],
		aliases: [`img`],
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `src`), r = p$5(e, `alt`), i = p$5(e, `width`), a = p$5(e, `height`), o = p$5(e, `align`), s = p$5(e, `linkUrl`);
			return n && (t.src = n), r && (t.alt = r), i && (t.width = Number(i)), a && (t.height = Number(a)), o && (t.align = o), s && (t.linkUrl = s), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.src && (t.displaySource = e.src), e.alt && (t.title = [[e.alt]]), e.width && (t.width = e.width), e.height && (t.height = e.height), e.align && (t.align = e.align), e.linkUrl && (t.linkUrl = e.linkUrl), t;
		},
		toIRProps(e) {
			let t = {};
			return e.align && (t.align = e.align), e.displaySource && (t.src = e.displaySource), e.width && (t.width = e.width), e.height && (t.height = e.height), e.linkUrl && (t.linkUrl = e.linkUrl), t;
		},
		deriveIR: ({ record: e, props: t }) => {
			let n = { ...t };
			return e.props.title && e.props.title.length > 0 && (n.alt = e.props.title.map(([e]) => e).join(``)), { props: n };
		},
		fromHtml(e, t) {
			let n = (t) => {
				let n = e.attributes[t];
				return typeof n == `string` ? n : void 0;
			}, r = n(`src`), i = n(`alt`), a = n(`width`), o = n(`height`), s = a === void 0 ? void 0 : Number(a), c = o === void 0 ? void 0 : Number(o);
			return {
				type: `custom`,
				name: `Image`,
				props: {
					...r ? { src: r } : {},
					...i ? { alt: i } : {},
					...s ? { width: s } : {},
					...c ? { height: c } : {}
				},
				children: []
			};
		},
		toHtml(e, t) {
			if (e.type !== `custom`) return ``;
			let n = typeof e.props.src == `string` ? e.props.src : ``, r = typeof e.props.alt == `string` ? e.props.alt : ``, i = e.props.width === void 0 ? `` : ` width="${t.escapeHtml(String(e.props.width))}"`, a = e.props.height === void 0 ? `` : ` height="${t.escapeHtml(String(e.props.height))}"`;
			return `<img src="${t.escapeHtml(n)}" alt="${t.escapeHtml(r)}"${i}${a} data-type="Image">`;
		}
	}), A$1({
		type: `mermaid`,
		category: `embed`,
		name: `MermaidBlock`,
		recordType: `mermaid`,
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps() {
			return {};
		},
		toIRProps() {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let { children: n } = e, r = [[(n ?? []).filter((e) => e.type === `code`)[0]?.value ?? ``]];
			return {
				props: {
					...t,
					title: r
				},
				consumeChildren: !0
			};
		},
		deriveIR: ({ record: e, props: t }) => {
			let n = {
				type: `code`,
				lang: `mermaid`,
				value: (e.props.title ?? []).map(([e]) => e).join(`
`)
			};
			return {
				props: { ...t },
				children: [n]
			};
		}
	}), j$1(M$1(A$1({
		type: `numbered_list`,
		category: `textContainer`,
		name: `NumberedList`,
		recordType: `numbered_list`,
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ol><li>${P$1(e, t)}</li></ol>` : ``;
		}
	}))), j$1(M$1(A$1({
		type: `page`,
		category: `embed`,
		name: `Page`,
		recordType: `page`,
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `icon`);
			return n && (t.icon = n), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.icon && (t.pageIcon = e.icon), t;
		},
		toIRProps(e) {
			let t = {};
			return e.pageIcon && (t.icon = e.pageIcon), t;
		}
	}))), A$1({
		type: `text`,
		category: `textContainer`,
		name: `Paragraph`,
		recordType: `text`,
		irType: `paragraph`,
		htmlMatch: [{ validTagName: `p` }],
		mdastTypes: [`paragraph`],
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `textAlign`);
			return n && (t.textAlign = n), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { title: n = [] } = k$1(e, { onMissing: `empty` });
			return {
				props: {
					...t,
					title: n
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveIR: ({ record: e, props: t, cap: n }) => ({
			props: t,
			children: [{
				type: `paragraph`,
				content: n.tokensToInlineIR(e.props.title ?? [])
			}]
		}),
		fromHtml(e, t) {
			let n = t.blockTextAlign();
			return {
				type: `paragraph`,
				content: t.parseChildrenInline(),
				...n ? { textAlign: n } : {}
			};
		},
		toHtml(e, t) {
			if (e.type === `custom`) {
				let n = e.props.textAlign ? ` style="text-align:${e.props.textAlign}"` : ``, r = e.children[0];
				return `<p${n}>${r?.type === `paragraph` ? t.serializeChildren(r.content) : t.serializeChildren(e.children)}</p>`;
			}
			return e.type === `paragraph` ? `<p${e.textAlign ? ` style="text-align:${e.textAlign}"` : ``}>${t.serializeChildren(e.content)}</p>` : ``;
		},
		fromMdast(e, t) {
			let n = e;
			if (n.children.length === 1 && n.children[0].type === `image`) return {
				node: q$1(n.children[0]),
				warnings: []
			};
			if (n.children.length === 1 && n.children[0].type === `link`) {
				let e = n.children[0];
				if (e.children.length === 1 && e.children[0].type === `image`) return {
					node: q$1(e.children[0], e.url),
					warnings: []
				};
			}
			return {
				node: {
					type: `paragraph`,
					content: t.parseInline(Te$1(n.children), t.registries)
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			let n = e.type === `paragraph` ? e.content : [];
			return {
				type: `paragraph`,
				children: t.inlineIRsToMdast(n)
			};
		},
		emitRecord(e, t, n) {
			if (t.type !== `paragraph`) return;
			let r = e.newId(), i = e.resolveType(`paragraph`, `text`);
			e.putBlock({
				id: r,
				parentId: n,
				type: i,
				props: {
					title: O$1(t.content),
					...t.textAlign ? { textAlign: t.textAlign } : {}
				},
				children: []
			}), e.appendChild(n, r);
		}
	}), we$1 = /(?<=\s)\/([^/\s][^/]*[^/\s]|[^/\s])\/(?=\s)/g;
	ke$1 = {
		type: `paragraph`,
		content: []
	}, j$1(A$1({
		type: `quote`,
		category: `container`,
		name: `BlockQuote`,
		recordType: `quote`,
		irType: `quote`,
		htmlMatch: [{ validTagName: `blockquote` }],
		mdastTypes: [`blockquote`],
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let n = `children` in e ? e.children : void 0;
			return {
				props: {
					...t,
					title: []
				},
				consumeChildren: !1,
				restChildren: n ?? []
			};
		},
		fromHtml(e, t) {
			return {
				type: `quote`,
				children: t.parseChildrenBlock()
			};
		},
		toHtml(e, t) {
			return e.type === `custom` || e.type === `quote` ? `<blockquote>${t.serializeChildren(e.children)}</blockquote>` : ``;
		},
		fromMdast(e, t) {
			let n = e, { nodes: r, warnings: i } = t.blocksToIR(n.children ?? [], { registries: t.registries });
			return {
				node: {
					type: `quote`,
					children: r
				},
				warnings: i
			};
		},
		toMdast(e, t) {
			return {
				type: `blockquote`,
				children: (e.type === `quote` ? e.children : []).map((e) => t.irNodeToMdastContent(e))
			};
		},
		emitRecord(e, t, n, r) {
			let i = e.newId(), a = e.resolveType(`quote`, `quote`);
			e.putBlock({
				id: i,
				parentId: n,
				type: a,
				props: { title: [] },
				children: []
			}), e.appendChild(n, i);
			let o = t.type === `quote` ? t.children : [], s = o.length ? o : [ke$1];
			for (let t of s) r(e, t, i);
		}
	}));
	Fe$1 = [
		`top`,
		`middle`,
		`bottom`
	], A$1({
		type: `simple_table`,
		category: `container`,
		name: `Table`,
		recordType: `simple_table`,
		parseMdxProps(e) {
			let t = {};
			return m$3(e, `columnHeader`) === !0 && (t.columnHeader = !0), m$3(e, `rowHeader`) === !0 && (t.rowHeader = !0), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.columnHeader === !0 && (t.tableColumnHeader = !0), e.rowHeader === !0 && (t.tableRowHeader = !0), t;
		},
		deriveRecord({ node: e, props: t, ctx: n }) {
			let r = e, i = je$1(r), a = Array.from({ length: i }, () => n.newId(8)), o = Me$1(r, a);
			Ne$1(r, o, a);
			let s = {
				...t,
				tableColumnOrder: a,
				tableColumnWidthMap: a.reduce((e, t) => (e[t] = 120, e), {})
			};
			return o.length > 0 && (s.cellRanges = o), {
				consumeChildren: !1,
				props: s
			};
		},
		toIRProps(e) {
			let t = { readonly: !0 };
			return e.tableColumnHeader === !0 && (t.columnHeader = !0), e.tableRowHeader === !0 && (t.rowHeader = !0), t;
		},
		deriveIR({ record: e, props: t, children: n }) {
			let r = e.props.cellRanges;
			if (!r?.length) return {
				props: t,
				children: n
			};
			let i = e.props.tableColumnOrder;
			return Pe$1(n, r, i), {
				props: t,
				children: n
			};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<table>${t.serializeChildren(e.children)}</table>` : ``;
		}
	}), A$1({
		type: `simple_table_row`,
		category: `container`,
		name: `TableRow`,
		recordType: `simple_table_row`,
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<tr>${t.serializeChildren(e.children)}</tr>` : ``;
		}
	}), A$1({
		type: `simple_table_cell`,
		category: `container`,
		name: `TableCell`,
		recordType: `simple_table_cell`,
		parseMdxProps(e) {
			let t = {}, n = p$5(e, `columnKey`);
			n && (t.columnKey = n);
			let r = p$5(e, `colspan`), i = r === void 0 ? NaN : Number(r);
			Number.isInteger(i) && i > 1 && (t.colspan = i);
			let a = p$5(e, `rowspan`), o = a === void 0 ? NaN : Number(a);
			Number.isInteger(o) && o > 1 && (t.rowspan = o);
			let s = p$5(e, `verticalAlign`);
			return s && Fe$1.includes(s) && (t.verticalAlign = s), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.columnKey && (t.columnKey = e.columnKey), e.verticalAlign && (t.verticalAlign = e.verticalAlign), t;
		},
		toIRProps(e) {
			let t = {};
			return e.verticalAlign && (t.verticalAlign = e.verticalAlign), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<td>${t.serializeChildren(e.children)}</td>` : ``;
		}
	}), j$1(M$1(A$1({
		type: `to_do`,
		category: `textContainer`,
		name: `Todo`,
		recordType: `to_do`,
		parseMdxProps(e) {
			let t = {}, n = m$3(e, `checked`);
			return n && (t.checked = n), d$8(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.checked && (t.checked = e.checked), t;
		},
		toIRProps(e) {
			let t = {};
			return typeof e.checked == `boolean` && (t.checked = e.checked), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ul data-type="todo"><li${e.props.checked === !0 || e.props.checked === `true` ? ` data-checked` : ``}>${P$1(e, t)}</li></ul>` : ``;
		}
	}))), j$1(M$1(A$1({
		type: `toggle`,
		category: `textContainer`,
		name: `Toggle`,
		recordType: `toggle`,
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		}
	}))), A$1({
		type: ``,
		category: `container`,
		name: `Unsupported`,
		recordType: ``,
		parseMdxProps(e) {
			return d$8({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {
				type: e.type,
				id: e.id,
				readonly: !0
			};
		}
	}), N$1({
		name: `Link`,
		inlineType: `link`,
		parseMdxProps(e) {
			let t = p$5(e, `href`);
			return t ? d$8({ href: t }, []) : f$6([`Link.href is required`]);
		},
		buildInlineIR({ props: e, children: t }) {
			return {
				type: `link`,
				url: String(e.href),
				children: t
			};
		},
		htmlMatch: [{ validTagName: `a` }],
		fromHtml(e, t) {
			let n = typeof e.attributes.href == `string` ? e.attributes.href : ``, r = typeof e.attributes.title == `string` ? e.attributes.title : void 0;
			return {
				type: `link`,
				url: n,
				...r ? { title: r } : {},
				children: t.parseChildrenInline()
			};
		},
		toHtml(e, t) {
			if (e.type !== `link`) return ``;
			let n = e.title ? ` title="${t.escapeHtml(e.title)}"` : ``;
			return `<a href="${t.escapeHtml(e.url)}"${n}>${t.serializeChildren(e.children)}</a>`;
		}
	}), N$1({
		name: `Mark`,
		inlineType: `span`,
		parseMdxProps() {
			return d$8({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: {},
				children: e
			};
		},
		toHtml(e, t) {
			if (e.type !== `span`) return ``;
			let n = t.marksToStyle(e.marks);
			return n ? `<span style="${n}">${t.serializeChildren(e.children)}</span>` : t.serializeChildren(e.children);
		}
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/plugin.mjs
var l$9;
var init_plugin$2 = __esmMin((() => {
	init_equation_block();
	init_events();
	init_inline_token$1();
	init_equation_block_rule();
	init_equation_inline_rule();
	init_dist$7();
	init_dist$4();
	init_lucide_react();
	init_preload_helper();
	l$9 = t$12({
		descriptor: V$1,
		component: u$9,
		meta: {
			label: `公式`,
			icon: Sigma,
			keywords: [
				`equation`,
				`math`,
				`latex`,
				`公式`
			],
			shortcut: `gs`,
			group: `media`
		},
		behaviors: {
			afterCreate: ({ editor: e, blockId: n }) => {
				n$13(e, {
					blockId: n,
					isNew: !0
				});
			},
			onDoubleClick: ({ editor: e, blockId: n }) => {
				n$13(e, {
					blockId: n,
					isNew: !1
				});
			}
		},
		inputRules: [a$7, u$8],
		inlineTokens: [i$11],
		editorComponent: e$14(() => __vitePreload(() => import("./equation-plugin-component-B0giiUyW.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]), import.meta.url)),
		loadOn: `immediately`
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-equation/dist/index.mjs
var init_dist$3 = __esmMin((() => {
	init_plugin$2();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/components/footnote-inline.less
var init_footnote_inline$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/components/footnote-inline.mjs
function l$8({ value: l, selected: u, editor: d }) {
	let f = typeof l == `string` ? l : String(l ?? ``), [p, m] = (0, import_react$10.useState)(!1), h = s$11(), g = o$11(), _ = s$13(d), v = _.numbers.get(f), y = !_.defs.some((e) => e.fnId === f), b = _.defs.find((e) => e.fnId === f), x = (0, import_react$10.useCallback)((e) => {
		e.preventDefault();
		let t = document.querySelector(`[data-footnote-id="${f}"]`);
		t instanceof HTMLElement && (t.scrollIntoView({
			behavior: `smooth`,
			block: `center`
		}), t.classList.add(`sc-footnote-list__item--flash`), setTimeout(() => t.classList.remove(`sc-footnote-list__item--flash`), 1500));
	}, [f]), S = (0, import_react$10.useCallback)((t) => {
		t.preventDefault(), t.stopPropagation(), m(!1), b && a$13(d, {
			editor: d,
			defRecordId: b.recordId,
			fnId: f
		});
	}, [
		b,
		d,
		f
	]), C = y ? `?` : v ?? `?`, w = [
		`sc-footnote-inline`,
		u ? `sc-footnote-inline--selected` : ``,
		y ? `sc-footnote-inline--missing` : ``
	].filter(Boolean).join(` `);
	return import_react$10.createElement(a$12.Provider, { delayDuration: 120 }, import_react$10.createElement(a$12.Root, {
		open: p,
		onOpenChange: m
	}, import_react$10.createElement(a$12.Trigger, { asChild: !0 }, import_react$10.createElement(`sup`, {
		className: w,
		onClick: x,
		onKeyDown: (e) => {
			(e.key === `Enter` || e.key === ` `) && (e.preventDefault(), x(e));
		},
		"data-footnote-ref-id": f
	}, C)), import_react$10.createElement(a$12.Content, {
		className: `sc-footnote-hover-card`,
		side: `bottom`,
		align: `start`,
		onPointerDownOutside: (e) => e.preventDefault()
	}, import_react$10.createElement(`p`, { className: `sc-footnote-hover-card__content ${y ? `sc-footnote-hover-card__missing` : ``}` }, y ? g(`footnote.popover.missing`, `脚注内容未定义`) : b?.preview || g(`footnote.popover.empty`, `（空内容）`)), !y && !h && import_react$10.createElement(import_react$10.Fragment, null, import_react$10.createElement(`div`, { className: `sc-footnote-hover-card__divider` }), import_react$10.createElement(`div`, { className: `sc-footnote-hover-card__actions` }, import_react$10.createElement(`button`, {
		type: `button`,
		className: `sc-footnote-hover-card__btn`,
		onClick: S
	}, import_react$10.createElement(Pencil, { size: 12 }), ` `, g(`footnote.popover.edit`, `修改`)))))));
}
var import_react$10;
var init_footnote_inline = __esmMin((() => {
	init_events$1();
	init_footnote_context();
	init_i18n();
	init_dist$7();
	init_dist$9();
	init_lucide_react();
	import_react$10 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_footnote_inline$1();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/inline-token.mjs
function s$6(e, t) {
	if (e.type === `footnote_def` || e.type === `footnote_list`) return !1;
	let n = e.props?.title ?? [];
	for (let e of n) {
		let n = e[1];
		if (n) {
			for (let [e, r] of n) if (e === e$10.Footnote && r === t) return !0;
		}
	}
	return !1;
}
function c$7(e, t) {
	for (let n of e.recordView.valuesOfTable(`block`)) if (s$6(n, t)) return !0;
	return !1;
}
var o$4, l$7;
var init_inline_token = __esmMin((() => {
	init_events$1();
	init_footnote_inline();
	init_footnote_ops();
	init_dist$7();
	o$4 = /* @__PURE__ */ new Map();
	l$7 = {
		type: e$10.Footnote,
		isAtom: !0,
		component: l$8,
		toPlainText(e) {
			return `[^${e}]`;
		},
		twoStepDelete: !0,
		beforeCreate: async ({ editor: t, blockId: n }) => {
			let r = await n$14(t, {
				editor: t,
				blockId: n,
				anchorRect: J$2.getSelectionRect(t)
			});
			return r ? typeof r == `string` ? r : (o$4.set(r.fnId, {
				content: r.content,
				rootId: r.rootId
			}), r.fnId) : null;
		},
		afterCreate: ({ editor: e, value: t }) => {
			let r = t, i = o$4.get(r);
			i && (o$4.delete(r), i$18(e, i.content, i.rootId, r));
		},
		afterDelete: ({ editor: e, value: t }) => {
			let n = t;
			if (n && !c$7(e, n)) {
				for (let t of e.recordView.valuesOfTable(`block`)) if (t.type === `footnote_def` && t.props?.fnId === n) {
					o$12(e, t.id);
					break;
				}
			}
		},
		meta: {
			label: `脚注`,
			keywords: [
				`footnote`,
				`fn`,
				`脚注`
			],
			shortcut: `[^...]`,
			group: `inline`
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/plugin.mjs
var r$10;
var init_plugin$1 = __esmMin((() => {
	init_inline_token();
	init_dist$7();
	init_preload_helper();
	r$10 = t$13({
		id: `footnote`,
		inlineTokens: [l$7],
		provides: [{
			type: `footnote_list`,
			category: `embed`,
			component: () => null,
			selfWrapper: `none`,
			deletable: !1
		}],
		component: e$14(() => __vitePreload(() => import("./footnote-plugin-component-BjY_P2JD.js"), __vite__mapDeps([29,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,30,27,31]), import.meta.url)),
		loadOn: `immediately`
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-footnote/dist/index.mjs
var init_dist$2 = __esmMin((() => {
	init_plugin$1();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/config.mjs
function f$5() {
	return (0, import_react$9.useContext)(d$7);
}
function p$4({ value: e, children: t }) {
	return import_react$9.createElement(d$7.Provider, { value: e }, t);
}
var import_react$9, u$6, d$7;
var init_config = __esmMin((() => {
	init_lucide_react();
	import_react$9 = /* @__PURE__ */ __toESM(require_react(), 1);
	u$6 = {
		more: Ellipsis,
		viewDiagram: GitBranch,
		viewCode: CodeXml,
		copyCode: Copy,
		download: Download,
		chevronDown: ChevronDown,
		check: Check
	}, d$7 = (0, import_react$9.createContext)(u$6);
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/utils/just-created.mjs
function n$7(n) {
	e$6.add(n);
	for (let e of t$7) e();
}
function r$9(t) {
	return e$6.has(t) ? (e$6.delete(t), !0) : !1;
}
function i$8(e) {
	return t$7.add(e), () => {
		t$7.delete(e);
	};
}
var e$6, t$7;
var init_just_created = __esmMin((() => {
	e$6 = /* @__PURE__ */ new Set(), t$7 = /* @__PURE__ */ new Set();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/renderers/lazy-module.mjs
function e$5(e) {
	let t = null;
	return () => (t ||= e().catch((e) => {
		throw t = null, e;
	}), t);
}
var init_lazy_module = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/renderers/default-renderer.mjs
function n$6(e) {
	return e.replace(/(--)([^\s\-=.|][^\n]*?[^\s\-=.|])(-->|---)(?!-)/g, `$1 $2 $3`).replace(/(==)([^\s\-=.|][^\n]*?[^\s\-=.|])(==>|===)(?!=)/g, `$1 $2 $3`).replace(/(-\.)([^\s\-=.|][^\n]*?[^\s\-=.|])(\.->|\.-)(?!\.)/g, `$1 $2 $3`);
}
var t$6, r$8;
var init_default_renderer = __esmMin((() => {
	init_lazy_module();
	init_preload_helper();
	t$6 = e$5(() => __vitePreload(() => import("./dist-6YtuqzF3.js"), __vite__mapDeps([32,1,22]), import.meta.url));
	r$8 = {
		name: `beautiful-mermaid`,
		async render(e, r) {
			let i = e.trim();
			if (!i) return {
				ok: !1,
				message: `empty`
			};
			try {
				let { renderMermaidSVG: e } = await t$6();
				return {
					ok: !0,
					svg: e(n$6(i), {
						bg: r.bg,
						fg: r.fg,
						accent: r.accent,
						border: r.border,
						surface: r.surface,
						muted: r.muted,
						transparent: r.transparent ?? !1
					})
				};
			} catch (e) {
				return {
					ok: !1,
					message: e instanceof Error ? e.message : String(e)
				};
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/renderers/detect-type.mjs
function n$5(e) {
	let t = e.split(`
`), n = 0;
	if (t[0]?.trim() === `---`) {
		for (n = 1; n < t.length && t[n]?.trim() !== `---`;) n++;
		n < t.length && n++;
	}
	for (; n < t.length; n++) {
		let e = t[n]?.trim() ?? ``;
		if (e && !e.startsWith(`%%`)) return e;
	}
	return ``;
}
function r$7(e, t) {
	if (e.length < t.length || e.slice(0, t.length).toLowerCase() !== t.toLowerCase()) return !1;
	let n = e[t.length];
	return n === void 0 || /\s|[:;]/.test(n);
}
function i$7(i) {
	let a = n$5(i);
	if (!a) return `fallback`;
	for (let t of e$4) if (r$7(a, t)) return `beautiful`;
	for (let e of t$5) if (r$7(a, e)) return `fallback`;
	return `fallback`;
}
var e$4, t$5;
var init_detect_type = __esmMin((() => {
	e$4 = [], t$5 = [
		`gantt`,
		`pie`,
		`mindmap`,
		`timeline`,
		`sankey-beta`,
		`quadrantChart`,
		`gitGraph`,
		`requirementDiagram`,
		`journey`,
		`C4Context`,
		`C4Container`,
		`C4Component`,
		`C4Dynamic`,
		`C4Deployment`,
		`block-beta`,
		`packet-beta`,
		`kanban`,
		`architecture-beta`,
		`radar-beta`,
		`treemap-beta`
	];
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/renderers/mermaidjs-renderer.mjs
function n$4(e, t) {
	let r = e.trim();
	if (!r.startsWith(`var(`)) return r || t;
	let i = r.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\s*\)$/);
	if (!i) return t;
	let [, a, o] = i;
	return typeof document > `u` ? o?.trim() ?? t : getComputedStyle(document.documentElement).getPropertyValue(a).trim() || (o ? n$4(o.trim(), t) : t);
}
function r$6(e) {
	let t = n$4(e.bg, `#ffffff`), r = n$4(e.fg, `#1f1f1f`), i = n$4(e.accent ?? e.fg, r), a = n$4(e.surface ?? e.bg, t), o = n$4(e.muted ?? e.fg, r), s = n$4(e.border ?? e.fg, r);
	return {
		background: e.transparent ? `transparent` : t,
		primaryColor: a,
		primaryTextColor: r,
		primaryBorderColor: s,
		secondaryColor: a,
		secondaryTextColor: r,
		secondaryBorderColor: s,
		tertiaryColor: t,
		tertiaryTextColor: o,
		tertiaryBorderColor: s,
		lineColor: i,
		textColor: r,
		mainBkg: a,
		nodeBorder: s,
		nodeTextColor: r,
		clusterBkg: t,
		clusterBorder: s,
		defaultLinkColor: i,
		titleColor: r,
		edgeLabelBackground: t,
		actorBkg: a,
		actorBorder: s,
		actorTextColor: r,
		actorLineColor: i,
		signalColor: i,
		signalTextColor: r,
		labelBoxBkgColor: a,
		labelBoxBorderColor: s,
		labelTextColor: r,
		loopTextColor: o,
		activationBorderColor: s,
		activationBkgColor: a,
		noteBkgColor: a,
		noteTextColor: r,
		noteBorderColor: s,
		fontFamily: `inherit`
	};
}
var t$4, i$6;
var init_mermaidjs_renderer = __esmMin((() => {
	init_lazy_module();
	init_preload_helper();
	t$4 = e$5(() => __vitePreload(() => import("./mermaid.core-CucdCh_4.js"), __vite__mapDeps([33,34,1,3,35,36,37]), import.meta.url));
	i$6 = {
		name: `mermaidjs`,
		async render(e, n) {
			let i = e.trim();
			if (!i) return {
				ok: !1,
				message: `empty`
			};
			try {
				let { default: e } = await t$4();
				e.initialize({
					startOnLoad: !1,
					securityLevel: `strict`,
					theme: `base`,
					themeVariables: r$6(n),
					flowchart: { useMaxWidth: !0 },
					sequence: { useMaxWidth: !0 }
				});
				let a = `sc-mmd-${Math.random().toString(36).slice(2, 10)}`, { svg: o } = await e.render(a, i);
				return {
					ok: !0,
					svg: o
				};
			} catch (e) {
				return {
					ok: !1,
					message: e instanceof Error ? e.message : String(e)
				};
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/renderers/index.mjs
function r$5(r) {
	return i$7(r) === `beautiful` ? r$8 : i$6;
}
var init_renderers = __esmMin((() => {
	init_default_renderer();
	init_detect_type();
	init_mermaidjs_renderer();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/utils/sanitize-svg.mjs
function r$4(e) {
	let r = [];
	for (let i of Array.from(e.attributes)) {
		let e = i.name.toLowerCase();
		if (e.startsWith(`on`)) {
			r.push(i.name);
			continue;
		}
		if (t$3.has(e)) {
			let e = i.value.trim().toLowerCase();
			n$3.some((t) => e.startsWith(t)) && r.push(i.name);
		}
	}
	for (let t of r) e.removeAttribute(t);
}
function i$5(t) {
	if (t.nodeType !== Node.ELEMENT_NODE) return;
	let n = t, a = n.tagName.toLowerCase();
	if (e$3.has(a)) {
		n.parentNode?.removeChild(n);
		return;
	}
	if ((a === `animate` || a === `set`) && n.getAttribute(`attributeName`)?.startsWith(`on`)) {
		n.parentNode?.removeChild(n);
		return;
	}
	r$4(n);
	for (let e of Array.from(n.childNodes)) i$5(e);
}
function a$5(e) {
	if (!e || typeof document > `u`) return e;
	let t = new DOMParser().parseFromString(e, `image/svg+xml`);
	if (t.querySelector(`parsererror`)) return ``;
	let n = t.documentElement;
	return i$5(n), new XMLSerializer().serializeToString(n);
}
var e$3, t$3, n$3;
var init_sanitize_svg = __esmMin((() => {
	e$3 = new Set([
		`script`,
		`iframe`,
		`object`,
		`embed`,
		`applet`,
		`form`,
		`input`,
		`button`,
		`textarea`,
		`select`,
		`base`,
		`link`,
		`meta`
	]), t$3 = new Set([
		`href`,
		`xlink:href`,
		`src`,
		`action`,
		`formaction`
	]), n$3 = [
		`javascript:`,
		`vbscript:`,
		`data:text/html`
	];
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/block/mermaid-preview.mjs
function s$4(e, t) {
	return e ? `${e} ${t}` : t;
}
var import_react$8, c$5, l$5, u$5, d$6;
var init_mermaid_preview = __esmMin((() => {
	init_i18n$1();
	init_renderers();
	init_sanitize_svg();
	import_react$8 = /* @__PURE__ */ __toESM(require_react(), 1);
	c$5 = ({ svg: e, className: t }) => import_react$8.createElement(`div`, {
		className: s$4(t ?? ``, `sc-mermaid-preview`),
		contentEditable: !1,
		dangerouslySetInnerHTML: { __html: a$5(e) }
	}), l$5 = ({ className: e, hint: t }) => import_react$8.createElement(`div`, { className: s$4(e ?? ``, `sc-mermaid-preview-empty`) }, import_react$8.createElement(`div`, { className: `sc-mermaid-preview-empty__hint` }, t)), u$5 = ({ className: e, title: t, hint: n, detail: i }) => import_react$8.createElement(`div`, { className: s$4(e ?? ``, `sc-mermaid-preview-error`) }, import_react$8.createElement(`div`, { className: `sc-mermaid-preview-error__title` }, t), import_react$8.createElement(`div`, { className: `sc-mermaid-preview-error__hint` }, n), import_react$8.createElement(`pre`, { className: `sc-mermaid-preview-error__detail` }, i)), d$6 = ({ code: n, theme: s, className: d }) => {
		let f = o$13(), [p, m] = (0, import_react$8.useState)({ status: `idle` }), h = (0, import_react$8.useRef)(null);
		(0, import_react$8.useEffect)(() => {
			let e = !1;
			return r$5(n).render(n, s).then((t) => {
				e || (t.ok ? (h.current = t.svg, m({
					status: `ok`,
					svg: t.svg
				})) : (h.current = null, m({
					status: `err`,
					message: t.message
				})));
			}, (t) => {
				e || (h.current = null, m({
					status: `err`,
					message: t instanceof Error ? t.message : String(t)
				}));
			}), () => {
				e = !0;
			};
		}, [n, s]);
		let g = f(`mermaid.empty`, `图表为空，请输入 Mermaid 源码`);
		return p.status === `idle` ? h.current ? import_react$8.createElement(c$5, {
			svg: h.current,
			className: d
		}) : import_react$8.createElement(l$5, {
			className: d,
			hint: g
		}) : p.status === `err` ? p.message === `empty` ? import_react$8.createElement(l$5, {
			className: d,
			hint: g
		}) : import_react$8.createElement(u$5, {
			className: d,
			title: f(`mermaid.errorTitle`, `图表渲染失败`),
			hint: f(`mermaid.errorHint`, `请检查 Mermaid 语法`),
			detail: p.message
		}) : import_react$8.createElement(c$5, {
			svg: p.svg,
			className: d
		});
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/behaviors/download-png.mjs
function t$2(e) {
	if (!e?.includes(`var(`)) return e ?? ``;
	let t = document.querySelector(`[data-sc-theme]`) ?? document.documentElement, n = getComputedStyle(t);
	return e.replace(/var\(--([^,)]+)(?:,\s*([^)]+))?\)/g, (e, t, r) => n.getPropertyValue(`--${t}`).trim() || r?.trim() || `#000000`);
}
function n$2(e) {
	return {
		bg: t$2(e.bg),
		fg: t$2(e.fg),
		accent: t$2(e.accent),
		border: t$2(e.border),
		surface: t$2(e.surface),
		muted: t$2(e.muted),
		transparent: e.transparent
	};
}
function r$2(e) {
	let t = e.match(/<svg\b([^>]*)>/);
	if (!t) return e;
	let n = t[1], r = n.match(/viewBox\s*=\s*["']([^"']+)["']/i);
	if (!r) return e;
	let i = r[1].trim().split(/\s+/).map(Number);
	if (i.length !== 4 || i.some((e) => !Number.isFinite(e))) return e;
	let [, , a, o] = i;
	if (a <= 0 || o <= 0) return e;
	let s = n;
	return s = s.replace(/\s+width\s*=\s*["'][^"']*["']/i, ``), s = s.replace(/\s+height\s*=\s*["'][^"']*["']/i, ``), s = s.replace(/\s+style\s*=\s*["']([^"']*)["']/i, (e, t) => {
		let n = t.split(`;`).map((e) => e.trim()).filter((e) => e && !/^max-width\s*:/i.test(e)).join(`; `);
		return n ? ` style="${n}"` : ``;
	}), s = ` width="${a}" height="${o}"${s}`, e.replace(/<svg\b[^>]*>/, `<svg${s}>`);
}
function i$3(e, t = 3) {
	return new Promise((n, r) => {
		let i = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`, a = new Image();
		a.onload = () => {
			let e = document.createElement(`canvas`);
			e.width = a.naturalWidth * t, e.height = a.naturalHeight * t;
			let i = e.getContext(`2d`);
			if (!i) {
				r(Error(`Canvas 2D context not available`));
				return;
			}
			i.scale(t, t), i.drawImage(a, 0, 0), e.toBlob((e) => {
				e ? n(e) : r(Error(`Canvas toBlob returned null`));
			}, `image/png`);
		}, a.onerror = () => {
			r(Error(`Failed to load SVG as image`));
		}, a.src = i;
	});
}
async function a$3(t, a, o = `mermaid-diagram.png`) {
	let s = n$2(a), c = await r$5(t).render(t, s);
	if (!c.ok) {
		console.warn(`[mermaid] download skipped, render failed:`, c.message);
		return;
	}
	let l = await i$3(r$2(c.svg)), u = URL.createObjectURL(l), d = document.createElement(`a`);
	d.href = u, d.download = o, document.body.appendChild(d), d.click(), document.body.removeChild(d), URL.revokeObjectURL(u);
}
var init_download_png = __esmMin((() => {
	init_renderers();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/components/mermaid-lightbox.less
var init_mermaid_lightbox$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/components/mermaid-lightbox.mjs
var import_react$7, f$4, p$3;
var init_mermaid_lightbox = __esmMin((() => {
	init_i18n$1();
	init_sanitize_svg();
	init_download_png();
	init_dist$7();
	init_lucide_react();
	import_react$7 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_mermaid_lightbox$1();
	f$4 = ({ onLoad: e, svg: n }) => {
		let r = (0, import_react$7.useRef)(null);
		return (0, import_react$7.useEffect)(() => {
			let t = r.current;
			if (!t || !e) return;
			let n = t.querySelector(`svg`);
			if (!n) return;
			let i = () => {
				let t = n.getBoundingClientRect();
				e({
					width: t.width + 14,
					height: t.height + 14
				});
			}, a = n.getBoundingClientRect();
			return a.width > 0 && a.height > 0 && i(), n.addEventListener(`load`, i), () => n.removeEventListener(`load`, i);
		}, [e, n]), import_react$7.createElement(`div`, {
			ref: r,
			className: `sc-mermaid-lightbox-svg sc-mobile-lightbox-item`,
			style: { padding: 14 },
			dangerouslySetInnerHTML: { __html: a$5(n) }
		});
	}, p$3 = ({ svg: l, code: d, theme: p, onClose: m }) => {
		let h = o$13(), g = i$15().group === `mobile`, _ = (0, import_react$7.useCallback)(() => {
			a$3(d, p);
		}, [d, p]), v = (0, import_react$7.useMemo)(() => [{}], []), y = (0, import_react$7.useMemo)(() => [{
			label: h(`mermaid.lightbox.download`, `下载`),
			onClick: _
		}], [_, h]), b = (0, import_react$7.useCallback)((e) => import_react$7.createElement(f$4, {
			...e,
			svg: l
		}), [l]);
		return g ? import_react$7.createElement(u$10, {
			items: v,
			onClose: m,
			longPressItems: y,
			ariaLabel: h(`mermaid.lightbox.title`, `Mermaid 图表预览`),
			ItemComponent: b
		}) : import_react$7.createElement(m$4, {
			ariaLabel: h(`mermaid.lightbox.title`, `Mermaid 图表预览`),
			onClose: m,
			toolbarExtra: import_react$7.createElement(import_react$7.Fragment, null, import_react$7.createElement(m$4.ZoomControls, null), import_react$7.createElement(`span`, { className: `sc-lightbox-shell__divider` }), import_react$7.createElement(`button`, {
				type: `button`,
				className: `sc-lightbox-shell__btn`,
				"aria-label": h(`mermaid.lightbox.download`, `下载`),
				onClick: _
			}, import_react$7.createElement(Download, { size: 16 })))
		}, import_react$7.createElement(`div`, {
			className: `sc-mermaid-lightbox-svg`,
			dangerouslySetInnerHTML: { __html: a$5(l) }
		}));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/editor/use-mermaid-highlight.mjs
async function a$2() {
	return i$2 ||= (async () => {
		let { createHighlighterCore: e } = await __vitePreload(async () => {
			const { createHighlighterCore: e } = await import("./dist-DewaBQ09.js");
			return { createHighlighterCore: e };
		}, __vite__mapDeps([38,39,1,12,13,40,17,23]), import.meta.url), { createJavaScriptRegexEngine: t } = await __vitePreload(async () => {
			const { createJavaScriptRegexEngine: t } = await import("./dist-CVNH20o7.js").then((n) => (n.n(), n.t));
			return { createJavaScriptRegexEngine: t };
		}, __vite__mapDeps([41,1]), import.meta.url);
		return await e({
			themes: [__vitePreload(() => import("./github-light-Bl2rp99q.js"), __vite__mapDeps([42,1]), import.meta.url)],
			langs: [__vitePreload(() => import("./mermaid-DrqiU3eE.js"), __vite__mapDeps([43,1]), import.meta.url)],
			engine: t()
		});
	})(), i$2;
}
function o$2(i) {
	let [o, l] = (0, import_react$6.useState)([]), u = (0, import_react$6.useRef)(0);
	return (0, import_react$6.useEffect)(() => {
		let e = ++u.current, t = `\`\`\`mermaid\n${i}\n\`\`\``;
		a$2().then((n) => {
			e === u.current && l(n.codeToTokens(t, {
				lang: `mermaid`,
				theme: `github-light`
			}).tokens.slice(1, -1));
		});
	}, [i]), (0, import_react$6.useMemo)(() => !o || o.length === 0 ? s$2 : c$3(o), [o]);
}
function c$3(e) {
	let t = [], n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = n, o = !1;
		for (let e of i) {
			let i = e.content.length;
			if (e.color || e.fontStyle) {
				let a = {};
				e.color && (a.color = e.color), e.fontStyle === 1 && (a[`font-style`] = `italic`), e.fontStyle === 2 && (a[`font-weight`] = `bold`), e.fontStyle === 4 && (a[`text-decoration`] = `underline`);
				let s = {
					from: n,
					to: n + i,
					type: `code-highlight`,
					style: a
				};
				o ||= (s.attrs = { "data-line": String(r + 1) }, !0), t.push(s);
			}
			n += i;
		}
		let s = r < e.length - 1;
		if (s && (n += 1), !o) {
			let e = i.reduce((e, t) => e + t.content.length, 0), n = e > 0 ? a + e : s ? a + 1 : a;
			t.push({
				from: a,
				to: n,
				type: `code-highlight`,
				attrs: { "data-line": String(r + 1) }
			});
		}
	}
	return t;
}
var import_react$6, i$2, s$2;
var init_use_mermaid_highlight = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_preload_helper();
	i$2 = null;
	s$2 = [];
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/editor/mermaid-split-view.mjs
function p$2() {
	typeof window < `u` && window.getSelection()?.removeAllRanges();
}
function m$2(e) {
	typeof document > `u` || (document.querySelector(`[data-block-id="${e}"]`)?.closest(`.sc-root-editable`))?.focus({ preventScroll: !0 });
}
var import_react$5, h$2;
var init_mermaid_split_view = __esmMin((() => {
	init_i18n$1();
	init_renderers();
	init_mermaid_preview();
	init_mermaid_lightbox();
	init_use_mermaid_highlight();
	init_dist$7();
	import_react$5 = /* @__PURE__ */ __toESM(require_react(), 1);
	h$2 = ({ editor: h, blockId: g, tokens: _, code: v, theme: y, viewMode: b, readOnly: x, showLineNumbers: S = !1 }) => {
		let C = o$13(), w = i$15().group === `mobile`, [T, E] = (0, import_react$5.useState)(!1), [D, O] = (0, import_react$5.useState)(null), k = (0, import_react$5.useRef)(null);
		(0, import_react$5.useEffect)(() => {
			if (w || !v) return;
			let e = !1;
			return r$5(v).render(v, y).then((t) => {
				e || O(t.ok ? t.svg : null);
			}), () => {
				e = !0;
			};
		}, [
			v,
			y,
			w
		]);
		let A = (0, import_react$5.useCallback)(() => {
			p$2(), h.setSelection({
				type: `block-range`,
				blockIds: [g],
				anchorBlockId: g,
				focusBlockId: g
			});
		}, [h, g]), j = (0, import_react$5.useCallback)((e) => {
			if (w) {
				if (x) return;
				e.stopPropagation(), A();
				return;
			}
			D && (e.stopPropagation(), E(!0));
		}, [
			w,
			x,
			A,
			D
		]);
		(0, import_react$5.useEffect)(() => {
			if (x || b !== `preview`) return;
			let e = () => {
				let e = h.selection;
				return e?.type === `text` && e.anchor.blockId === g && e.focus.blockId === g;
			}, t = -Infinity, n = new Set([
				`Backspace`,
				`Delete`,
				`ArrowUp`,
				`ArrowDown`,
				`ArrowLeft`,
				`ArrowRight`
			]), r = (e) => {
				n.has(e.key) && (t = performance.now());
			}, i = () => {
				if (!(v.length === 0 || !e())) {
					if (performance.now() - t < 500) {
						A(), m$2(g);
						return;
					}
					p$2(), h.setSelection(null);
				}
			};
			document.addEventListener(`keydown`, r, !0);
			let a = h.on(`selectionChange`, i);
			return i(), () => {
				document.removeEventListener(`keydown`, r, !0), a();
			};
		}, [
			b,
			x,
			v,
			h,
			g,
			A
		]), (0, import_react$5.useEffect)(() => {
			let e = k.current;
			if (!e) return;
			let t = (e) => {
				let t = h.selection;
				if (!t || t.type !== `text` || t.anchor.blockId !== g || t.focus.blockId !== g) return;
				let n = Math.min(t.anchor.offset, t.focus.offset), r = Math.max(t.anchor.offset, t.focus.offset);
				if (n === r) return;
				let i = v.slice(n, r);
				e.preventDefault(), e.stopPropagation(), e.clipboardData?.setData(`text/plain`, i);
			};
			return e.addEventListener(`copy`, t, !0), () => {
				e.removeEventListener(`copy`, t, !0);
			};
		}, [
			h,
			g,
			v
		]);
		let M = o$2(v), N = (0, import_react$5.useMemo)(() => !S || !v ? 1 : v.split(`
`).length, [v, S]);
		return import_react$5.createElement(`div`, { className: `sc-mermaid-editor sc-mermaid-editor--${b}` }, import_react$5.createElement(`div`, { className: `sc-mermaid-editor__body` }, import_react$5.createElement(`div`, {
			className: `sc-mermaid-code-pane`,
			ref: k
		}, S && import_react$5.createElement(`div`, {
			className: `sc-mermaid-line-numbers`,
			"aria-hidden": `true`,
			contentEditable: !1
		}, Array.from({ length: N }, (e, t) => import_react$5.createElement(`span`, {
			className: `sc-mermaid-line-number`,
			key: t
		}, t + 1))), import_react$5.createElement(f$7, {
			blockId: g,
			tokens: _,
			plainText: !0,
			className: `sc-mermaid-editable`,
			placeholder: C(`mermaid.placeholder`, `输入代码后，可在图表视图中查看图表`),
			decorations: M
		})), import_react$5.createElement(`div`, {
			className: `sc-mermaid-preview-pane`,
			contentEditable: !1,
			onClick: j,
			style: !w && D ? { cursor: `zoom-in` } : void 0
		}, import_react$5.createElement(d$6, {
			code: v,
			theme: y
		}))), T && D && import_react$5.createElement(p$3, {
			svg: D,
			code: v,
			theme: y,
			onClose: () => E(!1)
		}));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/themes/theme-map.mjs
var e$1;
var init_theme_map = __esmMin((() => {
	e$1 = {
		bg: `var(--sc-mermaid-bg)`,
		fg: `var(--sc-mermaid-fg)`,
		accent: `var(--sc-mermaid-accent)`,
		border: `var(--sc-mermaid-border)`,
		surface: `var(--sc-mermaid-surface)`,
		muted: `var(--sc-mermaid-muted)`
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/editor/toolbar/mermaid-toolbar.mjs
function w$1(e, t, n) {
	let r = e.getBoundingClientRect(), i = n.getBoundingClientRect(), a = t.offsetWidth, o = t.offsetHeight;
	return {
		top: r.top - i.top - o - 6,
		left: r.left - i.left + r.width / 2 - a / 2
	};
}
var import_react$4, import_react_dom, x, S, C$1, T$1;
var init_mermaid_toolbar = __esmMin((() => {
	init_i18n$1();
	init_renderers();
	init_download_png();
	init_mermaid_lightbox();
	init_config();
	init_theme_map();
	init_dist$7();
	import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_dist$9();
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
	x = [
		`split`,
		`source`,
		`preview`
	], S = {
		split: `代码和图表`,
		source: `代码`,
		preview: `图表`
	}, C$1 = ({ editor: m, blockId: _, currentViewMode: y, onViewModeChange: b, currentCode: C, readOnly: w }) => {
		let E = o$13(), D = i$15().group === `mobile`, O = f$5(), k = r$18(), A = o$10(), [j, M] = (0, import_react$4.useState)(null);
		(0, import_react$4.useEffect)(() => {
			M(A?.contentOverlayRef?.current ?? null);
		}, [A]);
		let [N, P] = (0, import_react$4.useState)(!1), [F, I] = (0, import_react$4.useState)(!1), [L, R] = (0, import_react$4.useState)(null), [ee, z] = (0, import_react$4.useState)(!1), B = (0, import_react$4.useRef)(null), V = (0, import_react$4.useRef)(null), H = (0, import_react$4.useRef)(null), U = (0, import_react$4.useCallback)(() => {
			B.current !== null && (window.clearTimeout(B.current), B.current = null);
		}, []), W = (0, import_react$4.useCallback)(() => {
			V.current !== null && (window.clearTimeout(V.current), V.current = null);
		}, []), G = (0, import_react$4.useCallback)(() => {
			W(), B.current === null && (B.current = window.setTimeout(() => {
				z(!0), B.current = null;
			}, 250));
		}, [W]), K = (0, import_react$4.useCallback)(() => {
			U(), V.current === null && (V.current = window.setTimeout(() => {
				z(!1), V.current = null;
			}, 200));
		}, [U]), te = (0, import_react$4.useCallback)(() => {
			W();
		}, [W]), ne = (0, import_react$4.useCallback)(() => {
			K();
		}, [K]), q = (0, import_react$4.useRef)(N);
		q.current = N, (0, import_react$4.useEffect)(() => {
			N && W();
		}, [N, W]), (0, import_react$4.useEffect)(() => {
			if (D) return;
			let e = document.querySelector(`[data-block-id="${_}"]`);
			if (!e) return;
			let t = e.querySelector(`.sc-mermaid-editor`) ?? e;
			H.current = t;
			let n = () => G(), r = () => {
				q.current || K();
			};
			return t.addEventListener(`mouseenter`, n), t.addEventListener(`mouseleave`, r), () => {
				t.removeEventListener(`mouseenter`, n), t.removeEventListener(`mouseleave`, r), U(), W();
			};
		}, [
			_,
			D,
			G,
			K,
			U,
			W
		]), (0, import_react$4.useEffect)(() => {
			let e = !1;
			return r$5(C).render(C, e$1).then((t) => {
				e || R(t.ok ? t.svg : null);
			}), () => {
				e = !0;
			};
		}, [C]);
		let J = (0, import_react$4.useCallback)(() => {
			m.dispatch((e) => {
				O$2.deleteBlock(m, e, _);
			});
		}, [m, _]), re = (0, import_react$4.useCallback)(() => {
			a$3(C, e$1).then(() => {
				k(`success`, E(`mermaid.toast.downloadImage`, `已下载图片`));
			});
		}, [
			C,
			E,
			k
		]), Y = (0, import_react$4.useRef)(L);
		Y.current = L;
		let X = (0, import_react$4.useCallback)(() => {
			D && typeof document < `u` && document.activeElement?.blur?.(), Y.current && I(!0);
		}, [D]), Z = (0, import_react$4.useCallback)(() => {
			typeof navigator < `u` && navigator.clipboard?.writeText && navigator.clipboard.writeText(C).then(() => {
				k(`success`, E(`mermaid.toast.copyCode`, `已复制代码`));
			});
		}, [
			C,
			E,
			k
		]);
		a$11((e) => {
			if (!e.isMobile || e.blockId !== _) return null;
			let t = !!w;
			if (t && e.selection?.type !== `block-range`) return null;
			let n = [];
			return n.push({
				type: `dropdown`,
				key: `mermaid-view`,
				trigger: import_react$4.createElement(`button`, {
					type: `button`,
					className: `sc-mobile-floating-toolbar-btn with-triangle`,
					style: { gap: 4 }
				}, import_react$4.createElement(`span`, null, E(`mermaid.viewMode.${y}`, S[y])), import_react$4.createElement(r$20, {
					src: O.chevronDown,
					size: 12,
					className: `sc-mermaid-mobile-chevron`
				})),
				options: x.map((e) => ({
					key: e,
					label: E(`mermaid.viewMode.${e}`, S[e])
				})),
				value: () => y,
				onChange: (e, t) => b(t)
			}), n.push({
				type: `icon-button`,
				key: `mermaid-fullscreen`,
				icon: null,
				label: E(`mermaid.toolbar.fullscreen`, `全屏预览`),
				disabled: () => L === null,
				onClick: X
			}), n.push({
				type: `icon-button`,
				key: `mermaid-copy`,
				icon: null,
				label: E(`mermaid.toolbar.copy`, `复制`),
				onClick: Z
			}), t || n.push({
				type: `icon-button`,
				key: `mermaid-delete`,
				icon: null,
				label: E(`mermaid.toolbar.delete`, `删除`),
				onClick: J
			}), {
				items: n,
				exclusive: !0,
				anchorSelector: `.sc-block-mermaid`
			};
		}, [
			_,
			y,
			b,
			w,
			L,
			X,
			Z,
			J,
			E
		]);
		let ie = L !== null, Q = F && L ? import_react$4.createElement(p$3, {
			svg: L,
			code: C,
			theme: e$1,
			onClose: () => I(!1)
		}) : null;
		if (D) return Q;
		let $ = y === `source`, ae = $ ? E(`mermaid.viewSwitch.code`, `代码视图`) : E(`mermaid.viewSwitch.diagram`, `图表视图`);
		return import_react$4.createElement(import_react$4.Fragment, null, import_react$4.createElement(T$1, {
			visible: ee,
			blockEl: H.current,
			overlayEl: j,
			menuOpen: N,
			setMenuOpen: P,
			onCardEnter: te,
			onCardLeave: ne,
			isSourceView: $,
			viewLabel: ae,
			onViewModeChange: b,
			copyCode: Z,
			handleDownload: re,
			hasSvg: ie,
			icons: O,
			t: E
		}), Q);
	};
	T$1 = ({ visible: e, blockEl: t, overlayEl: n, menuOpen: r, setMenuOpen: i, onCardEnter: a, onCardLeave: o, isSourceView: s, viewLabel: c, onViewModeChange: l, copyCode: u, handleDownload: x, hasSvg: S, icons: C, t: T }) => {
		let E = (0, import_react$4.useRef)(null), D = (0, import_react$4.useCallback)(() => {
			E.current !== null && (window.clearTimeout(E.current), E.current = null);
		}, []), O = (0, import_react$4.useCallback)(() => {
			D(), E.current = window.setTimeout(() => {
				i(!1), E.current = null;
			}, 150);
		}, [D, i]), k = (0, import_react$4.useCallback)(() => {
			D();
		}, [D]);
		(0, import_react$4.useEffect)(() => () => D(), [D]);
		let A = (0, import_react$4.useRef)(null), j = e || r, M = (0, import_react$4.useRef)(null), [N, P] = (0, import_react$4.useState)(null);
		if ((0, import_react$4.useLayoutEffect)(() => {
			if (!j || !t || !n) {
				P(null);
				return;
			}
			if (M.current) P(w$1(t, M.current, n));
			else {
				let e = requestAnimationFrame(() => {
					M.current && t && n && P(w$1(t, M.current, n));
				});
				return () => cancelAnimationFrame(e);
			}
		}, [
			j,
			t,
			n
		]), !j || !n) return null;
		let F = N === null;
		return (0, import_react_dom.createPortal)(import_react$4.createElement(`div`, {
			ref: M,
			className: `sc-mermaid-hover-toolbar`,
			style: {
				top: N?.top ?? 0,
				left: N?.left ?? 0,
				visibility: F ? `hidden` : `visible`
			},
			onMouseEnter: a,
			onMouseLeave: o,
			onMouseDown: (e) => e.preventDefault()
		}, import_react$4.createElement(m$5.Root, {
			open: r,
			onOpenChange: i
		}, import_react$4.createElement(m$5.Trigger, { asChild: !0 }, import_react$4.createElement(`button`, {
			ref: A,
			type: `button`,
			className: `sc-mermaid-hover-toolbar__view`,
			contentEditable: !1,
			onMouseEnter: () => {
				k(), i(!0);
			},
			onMouseLeave: O,
			onPointerDown: (e) => {
				r && e.preventDefault();
			}
		}, import_react$4.createElement(`span`, { className: `sc-mermaid-hover-toolbar__view-label` }, c), import_react$4.createElement(r$20, {
			src: C.chevronDown,
			size: 16,
			className: `sc-mermaid-hover-toolbar__chevron`
		}))), import_react$4.createElement(m$5.Portal, null, import_react$4.createElement(m$5.Content, {
			align: `start`,
			sideOffset: 6,
			className: `sc-mermaid-view-dropdown`,
			onMouseEnter: k,
			onMouseLeave: O,
			onInteractOutside: (e) => {
				let t = e.target;
				t && A.current?.contains(t) && e.preventDefault();
			}
		}, import_react$4.createElement(m$5.Item, {
			className: `sc-mermaid-menu-item`,
			onSelect: () => l(`preview`)
		}, import_react$4.createElement(`span`, { className: `sc-mermaid-menu-item__label` }, T(`mermaid.viewSwitch.diagram`, `图表视图`)), import_react$4.createElement(`span`, { className: `sc-mermaid-menu-item__check` }, !s && import_react$4.createElement(r$20, {
			src: C.check,
			size: 16
		}))), import_react$4.createElement(m$5.Item, {
			className: `sc-mermaid-menu-item`,
			onSelect: () => l(`source`)
		}, import_react$4.createElement(`span`, { className: `sc-mermaid-menu-item__label` }, T(`mermaid.viewSwitch.code`, `代码视图`)), import_react$4.createElement(`span`, { className: `sc-mermaid-menu-item__check` }, s && import_react$4.createElement(r$20, {
			src: C.check,
			size: 16
		})))))), import_react$4.createElement(`span`, { className: `sc-mermaid-hover-toolbar__divider` }), import_react$4.createElement(c$12, {
			size: `sm`,
			icon: import_react$4.createElement(r$20, {
				src: C.copyCode,
				size: 16
			}),
			"aria-label": T(`mermaid.toolbar.copyCode`, `复制代码`),
			tooltip: T(`mermaid.toolbar.copyCode`, `复制代码`),
			className: `sc-mermaid-hover-toolbar__icon-btn`,
			onClick: u
		}), import_react$4.createElement(c$12, {
			size: `sm`,
			icon: import_react$4.createElement(r$20, {
				src: C.download,
				size: 16
			}),
			"aria-label": T(`mermaid.toolbar.downloadImage`, `下载图片`),
			tooltip: T(`mermaid.toolbar.downloadImage`, `下载图片`),
			className: `sc-mermaid-hover-toolbar__icon-btn`,
			disabled: !S,
			onClick: x
		})), n);
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/themes/mermaid-tokens.less
var init_mermaid_tokens = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/block/mermaid-block.less
var init_mermaid_block$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/block/mermaid-block.mjs
function d$2(e) {
	return !e || e.length === 0 ? `` : e.map(([e]) => e).join(``);
}
var import_react$3, f$1;
var init_mermaid_block = __esmMin((() => {
	init_mermaid_split_view();
	init_theme_map();
	init_mermaid_toolbar();
	init_just_created();
	init_dist$7();
	import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_mermaid_tokens();
	init_mermaid_block$1();
	f$1 = (f) => {
		let { block: p } = f, m = o$9(), h = s$11(), g = p.props.title ?? [], _ = d$2(g), [v, y] = (0, import_react$3.useState)(`preview`);
		return (0, import_react$3.useLayoutEffect)(() => {
			if (!h) {
				if (r$9(p.id)) {
					y(`source`);
					return;
				}
				return i$8(() => {
					r$9(p.id) && y(`source`);
				});
			}
		}, [p.id, h]), import_react$3.createElement(`div`, { className: `${e$9.block.content} sc-block-mermaid` }, import_react$3.createElement(C$1, {
			editor: m,
			blockId: p.id,
			currentViewMode: v,
			onViewModeChange: y,
			currentCode: _,
			readOnly: h
		}), import_react$3.createElement(h$2, {
			editor: m,
			blockId: p.id,
			tokens: g,
			code: _,
			theme: e$1,
			viewMode: v,
			readOnly: h,
			showLineNumbers: !1
		}));
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/input-rules/mermaid-block-rule.mjs
var i$1, a$1, o$1;
var init_mermaid_block_rule = __esmMin((() => {
	init_just_created();
	init_dist$7();
	i$1 = /^([`｀·])\1{2}mermaid$/, a$1 = /^([`｀·])\1{2}mermaid $/, o$1 = {
		name: `mermaid-block`,
		triggers: [`enter`, `space`],
		apply(o) {
			let s = o.editor.getRecord(o.blockId);
			if (!s || s.type !== e$11.Text) return { consumed: !1 };
			let c = e$12(o.tokens).slice(0, o.caretOffset);
			return !(o.trigger === `enter` ? i$1 : a$1).test(c) || !o.editor.blockStore.getParentId(o.blockId) ? { consumed: !1 } : (o.editor.dispatch((e) => {
				O$2.convertBlockType(o.editor, e, o.blockId, e$11.Mermaid, { title: [[``]] });
			}), n$7(o.blockId), { consumed: !0 });
		}
	};
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/node_modules/@tencent/smart-doc-spec/dist/index.mjs
function a(e) {
	let t = {};
	for (let n of e) t[n.key] = {
		light: n.light,
		dark: n.dark
	};
	return t;
}
function d$1(e, t = []) {
	return {
		ok: !0,
		value: e,
		warnings: t
	};
}
function f(e) {
	return {
		ok: !1,
		warnings: Array.isArray(e) ? e : [e]
	};
}
function p(e, t) {
	let n = e[t];
	if (n !== null) return typeof n == `string` ? n : void 0;
}
function m(e, t) {
	if (e[t] === null) return !0;
}
function ne(e, t) {
	if (!e || e === `undefined`) return {};
	let n = [];
	switch (t) {
		case `background`:
			n = c;
			break;
		case `border`:
			n = l$1;
			break;
		case `text`:
			n = s;
			break;
		case `divider`:
			n = u$1;
			break;
	}
	return n.includes(e) ? { value: e } : {
		value: e,
		warning: `unknown color token '${e}' for ${t}`
	};
}
function re(e, t) {
	for (let n of t) {
		let t = typeof e[n] == `string` ? e[n] : void 0;
		if (t !== void 0 && t !== `undefined`) return t;
	}
}
function h(e, t, n = `default`) {
	return !e || e === n || e.endsWith(t) ? e ?? void 0 : e + t;
}
function g(e, t, n, r) {
	let i = ne(e, t);
	return i.warning && r.push(`${n}: ${i.warning}`), i.value;
}
function _(e) {
	let t = [], n = h(re(e, [
		`blockColor`,
		`bgColor`,
		`backgroundColor`
	]), `_background`), r = re(e, [
		`borderColor`,
		`border`,
		`border_color`
	]), i = h(typeof e.dividerColor == `string` ? e.dividerColor : void 0, `_divider`), a = g(n, `background`, `blockColor`, t), o = g(r, `border`, `borderColor`, t), s = g(i, `divider`, `dividerColor`, t);
	return d$1({
		...a ? { blockColor: a } : {},
		...o ? { borderColor: o } : {},
		...s ? { dividerColor: s } : {}
	}, t);
}
function v(e, t) {
	typeof e.blockColor == `string` && (t.blockColor = e.blockColor), typeof e.borderColor == `string` && (t.borderColor = e.borderColor);
}
function y(e, t) {
	return typeof e.blockColor == `string` && (t.blockColor = e.blockColor.replace(`_background`, ``)), typeof e.borderColor == `string` && (t.borderColor = e.borderColor), e.id && (t.id = e.id), t;
}
function ie(e, t) {
	for (let n of [
		`underline`,
		`italic`,
		`bold`,
		`strike`
	]) m(e, n) && (t[n] = !0);
}
function b(e) {
	let t = [], n = {}, r = p(e, `color`);
	r && (n.color = g(r, `text`, `color`, t));
	let i = p(e, `backgroundColor`) || p(e, `bgColor`);
	return i && (n.backgroundColor = g(h(i, `_background`), `background`, `backgroundColor`, t)), ie(e, n), d$1(n, t);
}
function ce(e) {
	if (typeof crypto < `u` && typeof crypto.getRandomValues == `function`) crypto.getRandomValues(e);
	else for (let t = 0; t < e.length; t++) e[t] = Math.random() * 256 | 0;
}
function le(e = 22) {
	let t = Math.ceil(1.6 * 63 * e / 62), n = new Uint8Array(t), r = ``;
	for (;;) {
		ce(n);
		for (let i = 0; i < t; i++) {
			let t = n[i] & 63;
			if (t < 62 && (r += `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`[t], r.length === e)) return r;
		}
	}
}
function C(e, t) {
	let [n, r] = t;
	return r === void 0 && e.some(([e, t]) => e === n && t === void 0) ? e : [...e, t];
}
function de(e) {
	let t = [];
	if (!e || typeof e != `object`) return t;
	let n = e;
	n.bold === !0 && t.push([`b`]), n.italic === !0 && t.push([`i`]), n.underline === !0 && t.push([`u`]), n.strike === !0 && t.push([`s`]);
	let r = n.color;
	typeof r == `string` && r && t.push([`h`, r]);
	let { backgroundColor: i } = n;
	return typeof i == `string` && i && t.push([`g`, i]), t;
}
function w(e, t, n, r) {
	if (!e) return;
	let i = r ? C(t, r) : t;
	n.push([e, i.length ? i : void 0]);
}
function T(e, t, n) {
	let r = C(e, n);
	t.push([`△`, r.length ? r : void 0]);
}
function E(e, t, n) {
	if (e) switch (e.type) {
		case `text`:
			w(e.value ?? ``, t, n);
			return;
		case `inlineCode`:
			fe(e, t, n);
			return;
		case `inlineMath`:
			pe(e, t, n);
			return;
		case `footnoteRef`:
			me(e, t, n);
			return;
		case `strong`:
		case `emphasis`:
		case `delete`:
			he(e, t, n);
			return;
		case `link`:
			ge(e, t, n);
			return;
		case `span`:
			_e(e, t, n);
			return;
		default: return;
	}
}
function fe(e, t, n) {
	e.value && w(e.value, t, n, [`c`]);
}
function pe(e, t, n) {
	e.value && T(t, n, [`ei`, [e.value, le(10)]]);
}
function me(e, t, n) {
	e.id && T(t, n, [`fn`, e.id]);
}
function he(e, t, n) {
	let r = ue[e.type], i = r ? C(t, [r]) : t;
	D(e.children, i, n);
}
function ge(e, t, n) {
	let r = C(t, [`t`, e.url]);
	D(e.children, r, n);
}
function _e(e, t, n) {
	let r = t;
	for (let t of de(e.marks)) r = C(r, t);
	D(e.children, r, n);
}
function D(e, t, n) {
	for (let r of e ?? []) E(r, t, n);
}
function ve(e, t) {
	if (e === t) return !0;
	if (Array.isArray(e) || Array.isArray(t)) {
		if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) return !1;
		for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	return !1;
}
function ye(e, t) {
	if (!e?.length && !t?.length) return !0;
	if (!e || !t || e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let [r, i] = e[n], [a, o] = t[n];
		if (r !== a || !ve(i, o)) return !1;
	}
	return !0;
}
function be(e) {
	let t = [];
	for (let n of e) {
		let [e, r] = n;
		if (!e) continue;
		let i = t[t.length - 1];
		i && ye(i[1], r) ? i[0] += e : t.push([e, r]);
	}
	return t;
}
function O(e) {
	let t = [];
	for (let n of e) E(n, [], t);
	return be(t);
}
function k(e, t) {
	let { onMissing: n = `empty`, keepParagraph: r = !1 } = t ?? {};
	if (e.type !== `custom`) return n === `skip` ? { restChildren: [] } : {
		title: [],
		restChildren: [],
		inline: []
	};
	let i = e.children ?? [], a = i.findIndex((e) => e.type === `paragraph`);
	if (a !== 0 && t?.mustBeFirst && (a = -1), a === -1) return n === `skip` ? { restChildren: i } : {
		title: [],
		restChildren: i,
		inline: []
	};
	let o = i[a].content ?? [];
	return {
		title: O(o),
		restChildren: r ? i : i.filter((e, t) => t !== a),
		inline: o
	};
}
function A(e) {
	return {
		...e,
		parseMdxProps(t) {
			let n = [], r = e.parseMdxProps(t);
			if (n.push(...r.warnings), !r.ok) return f(n);
			let i = _(t);
			return n.push(...i.warnings), d$1({
				...r.value,
				...i.ok ? i.value : {}
			}, n);
		},
		toRecordProps(t) {
			let n = {};
			return v(t, n), {
				...n,
				...e.toRecordProps(t)
			};
		},
		toIRProps(t) {
			let n = {};
			y(t, n);
			let r = e.toIRProps(t);
			return r.dividerColor && delete n.blockColor, {
				...n,
				...r
			};
		}
	};
}
function j(e) {
	return {
		...e,
		deriveIR: ({ record: e, props: t, children: n, cap: r }) => {
			if (e.props.title && e.props.title.length > 0) {
				let t = {
					type: `paragraph`,
					content: r.tokensToInlineIR(e.props.title)
				};
				n.unshift(t);
			}
			return {
				props: { ...t },
				children: n
			};
		}
	};
}
function M(e, t) {
	return {
		...e,
		deriveRecord: ({ node: e, props: n }) => {
			let { title: r = [], restChildren: i } = k(e, {
				onMissing: `empty`,
				keepParagraph: !1,
				mustBeFirst: t?.mustBeFirst
			});
			return {
				props: {
					...n,
					title: r
				},
				consumeChildren: !1,
				restChildren: i
			};
		}
	};
}
function N(e) {
	return {
		...e,
		parseMdxProps(t) {
			let n = [], r = e.parseMdxProps(t);
			if (!r.ok) return f(r.warnings);
			n.push(...r.warnings);
			let i = b(t);
			return n.push(...i.warnings), d$1({
				...r.value,
				...i.ok ? { __marks: i.value } : {}
			}, n);
		},
		buildInlineIR({ props: t, children: n }) {
			let r = e.buildInlineIR({
				props: t,
				children: n
			}), i = t.__marks;
			return !i || Object.keys(i).length === 0 ? r : {
				type: `span`,
				marks: i,
				children: [r]
			};
		}
	};
}
function xe(e, t) {
	let n = e.children[0];
	return n?.type === `paragraph` ? t.serializeChildren(n.content) : ``;
}
function Se(e, t) {
	let [, ...n] = e.children;
	return t.serializeChildren(n);
}
function P(e, t) {
	return `${xe(e, t)}${Se(e, t)}`;
}
function q(e, t) {
	let n = {};
	return e.url && (n.src = e.url), e.alt && (n.alt = e.alt || e.title), t && (n.link = t), {
		type: `custom`,
		name: `Image`,
		props: n,
		children: []
	};
}
function Te(e) {
	let t = [];
	for (let n of e) {
		if (n.type !== `text`) {
			t.push(n);
			continue;
		}
		let e = De(n.value);
		e.length === 1 && e[0].type === `raw` ? t.push(n) : t.push(...Ee(e));
	}
	return t;
}
function Ee(e) {
	let t = [];
	for (let n of e) n.type === `raw` && n.value ? t.push({
		type: `text`,
		value: n.value
	}) : n.type === `underline` && t.push(Oe(n.value));
	return t;
}
function De(e) {
	let t = [], n = 0;
	we.lastIndex = 0;
	for (let r of e.matchAll(we)) {
		let i = r.index ?? 0, a = i + r[0].length;
		i > n && t.push({
			type: `raw`,
			value: e.slice(n, i)
		}), t.push({
			type: `underline`,
			value: r[1]
		}), n = a;
	}
	return n < e.length && t.push({
		type: `raw`,
		value: e.slice(n)
	}), t.length === 0 && t.push({
		type: `raw`,
		value: e
	}), t;
}
function Oe(e) {
	return {
		type: `mdxJsxTextElement`,
		name: `Mark`,
		attributes: [{
			type: `mdxJsxAttribute`,
			name: `underline`,
			value: null
		}],
		children: [{
			type: `text`,
			value: e
		}]
	};
}
function J(e, t) {
	let n = t;
	for (; (e[n] ?? 0) > 0;) --e[n], n += 1;
	return n;
}
function Y(e) {
	return e;
}
function X(e) {
	return {
		colspan: typeof e.props.colspan == `number` ? e.props.colspan : 1,
		rowspan: typeof e.props.rowspan == `number` ? e.props.rowspan : 1
	};
}
function Z(e, t) {
	for (let n = t; n < e.length; n++) (e[n] ?? 0) > 0 && --e[n];
}
function je(e) {
	let t = [], n = 0;
	for (let r of e.children) {
		let e = Y(r), i = 0;
		for (let r of e.children) {
			i = J(t, i);
			let { colspan: e, rowspan: a } = X(Y(r));
			if (a > 1) for (let n = i; n < i + e; n++) t[n] = (t[n] ?? 0) + (a - 1);
			i += e, i > n && (n = i);
		}
		Z(t, i);
	}
	return n;
}
function Me(e, t) {
	let n = [], r = [];
	for (let i = 0; i < e.children.length; i++) {
		let a = Y(e.children[i]), o = 0;
		for (let e = 0; e < a.children.length; e++) {
			o = J(n, o);
			let s = Y(a.children[e]), { colspan: c, rowspan: l } = X(s);
			if (s.props.columnKey = t[o] ?? t[t.length - 1], (c > 1 || l > 1) && r.push({
				startCell: [i, o],
				endCell: [i + l - 1, o + c - 1]
			}), l > 1) for (let e = o; e < o + c; e++) n[e] = (n[e] ?? 0) + (l - 1);
			o += c;
		}
		Z(n, o);
	}
	return r;
}
function Ne(e, t, n) {
	if (t.length === 0) return;
	let r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let [t, i] = e.startCell, [a, o] = e.endCell;
		for (let e = t; e <= a; e++) for (let a = i; a <= o; a++) {
			if (e === t && a === i) continue;
			let o = n[a] ?? n[n.length - 1], s = r.get(e);
			s || (s = [], r.set(e, s)), s.push({
				colIndex: a,
				columnKey: o
			});
		}
	}
	if (r.size === 0) return;
	let i = [];
	for (let t = 0; t < e.children.length; t++) {
		let n = Y(e.children[t]), a = r.get(t), o = [], s = 0;
		for (let e of n.children) {
			s = J(i, s);
			let { colspan: t, rowspan: n } = X(Y(e));
			if (o.push({
				gridCol: s,
				node: e
			}), n > 1) for (let e = s; e < s + t; e++) i[e] = (i[e] ?? 0) + (n - 1);
			s += t;
		}
		if (Z(i, s), !a?.length) continue;
		let c = [...o];
		for (let e of a) {
			let t = {
				type: `custom`,
				name: `TableCell`,
				props: { columnKey: e.columnKey },
				children: [{
					type: `paragraph`,
					content: []
				}]
			};
			c.push({
				gridCol: e.colIndex,
				node: t
			});
		}
		c.sort((e, t) => e.gridCol - t.gridCol), Y(e.children[t]).children = c.map((e) => e.node);
	}
}
function Pe(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	if (n) for (let e = 0; e < n.length; e++) r.set(n[e], e);
	let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
	for (let e of t) {
		let [t, n] = e.startCell, [r, o] = e.endCell;
		i.set(`${t},${n}`, {
			colspan: o - n + 1,
			rowspan: r - t + 1
		});
		for (let e = t; e <= r; e++) for (let r = n; r <= o; r++) e === t && r === n || a.add(`${e},${r}`);
	}
	let o = [];
	e.forEach((e, t) => {
		let n = Y(e), s = [];
		for (let e of n.children) {
			let n = Y(e), c = n.props.columnKey, l = c === void 0 ? -1 : r.get(c) ?? -1;
			if (l < 0) {
				s.push(e);
				continue;
			}
			if (a.has(`${t},${l}`)) continue;
			let u = i.get(`${t},${l}`);
			if (u && (n.props.colspan = u.colspan, n.props.rowspan = u.rowspan, u.rowspan > 1)) for (let e = l; e < l + u.colspan; e++) o[e] = (o[e] ?? 0) + (u.rowspan - 1);
			s.push(e);
		}
		n.children = s, Z(o, 0);
	});
}
var e, t, n, r, i, o, s, c, l$1, u$1, ue, U, we, ke, Fe;
var init_dist$1 = __esmMin((() => {
	init_dist$6();
	e = [
		{
			key: `default`,
			label: `colors.default`,
			light: `rgb(31, 31, 31)`,
			dark: `rgb(237, 237, 237)`
		},
		{
			key: `grey`,
			label: `colors.grey`,
			light: `rgb(133, 133, 133)`,
			dark: `rgb(123, 123, 123)`
		},
		{
			key: `blue`,
			label: `colors.blue`,
			light: `rgb(41, 114, 244)`,
			dark: `rgb(78, 168, 246)`
		},
		{
			key: `sky_blue`,
			label: `colors.sky_blue`,
			light: `rgb(0, 163, 245)`,
			dark: `rgb(37, 184, 247)`
		},
		{
			key: `green`,
			label: `colors.green`,
			light: `rgb(69, 176, 118)`,
			dark: `rgb(114, 192, 146)`
		},
		{
			key: `yellow`,
			label: `colors.yellow`,
			light: `rgb(245, 196, 0)`,
			dark: `rgb(247, 212, 37)`
		},
		{
			key: `orange`,
			label: `colors.orange`,
			light: `rgb(248, 136, 37)`,
			dark: `rgb(249, 162, 74)`
		},
		{
			key: `red`,
			label: `colors.red`,
			light: `rgb(222, 60, 54)`,
			dark: `rgb(229, 100, 90)`
		},
		{
			key: `rose_red`,
			label: `colors.rose_red`,
			light: `rgb(221, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		{
			key: `purple`,
			label: `colors.purple`,
			light: `rgb(154, 56, 215)`,
			dark: `rgb(177, 92, 223)`
		}
	], t = {
		code: {
			light: `rgb(211, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		reminder: {
			light: `rgb(224, 120, 0)`,
			dark: `rgb(230, 146, 35)`
		}
	}, n = [
		{
			key: `default`,
			label: `colors.defaultBg`,
			light: `transparent`,
			dark: `transparent`
		},
		{
			key: `light_grey_background`,
			label: `colors.light_greyBg`,
			light: `rgb(243, 245, 247)`,
			dark: `rgb(45, 45, 45)`
		},
		{
			key: `light_blue_background`,
			label: `colors.light_blueBg`,
			light: `rgb(229, 239, 255)`,
			dark: `rgb(61, 92, 135)`
		},
		{
			key: `light_sky_blue_background`,
			label: `colors.light_sky_blueBg`,
			light: `rgb(229, 246, 255)`,
			dark: `rgb(40, 87, 129)`
		},
		{
			key: `light_green_background`,
			label: `colors.light_greenBg`,
			light: `rgb(234, 250, 241)`,
			dark: `rgb(23, 57, 43)`
		},
		{
			key: `light_yellow_background`,
			label: `colors.light_yellowBg`,
			light: `rgb(255, 249, 227)`,
			dark: `rgb(62, 52, 15)`
		},
		{
			key: `light_orange_background`,
			label: `colors.light_orangeBg`,
			light: `rgb(255, 243, 235)`,
			dark: `rgb(66, 39, 24)`
		},
		{
			key: `light_red_background`,
			label: `colors.light_redBg`,
			light: `rgb(255, 233, 232)`,
			dark: `rgb(74, 32, 34)`
		},
		{
			key: `light_rose_red_background`,
			label: `colors.light_rose_redBg`,
			light: `rgb(255, 236, 244)`,
			dark: `rgb(74, 31, 56)`
		},
		{
			key: `light_purple_background`,
			label: `colors.light_purpleBg`,
			light: `rgb(253, 235, 255)`,
			dark: `rgb(62, 32, 76)`
		},
		{
			key: `grey_background`,
			label: `colors.greyBg`,
			light: `rgb(235, 235, 235)`,
			dark: `rgb(58, 58, 58)`
		},
		{
			key: `dark_background`,
			label: `colors.darkBg`,
			light: `rgb(220, 223, 228)`,
			dark: `rgb(74, 74, 74)`
		},
		{
			key: `blue_background`,
			label: `colors.blueBg`,
			light: `rgb(199, 220, 255)`,
			dark: `rgb(34, 59, 108)`
		},
		{
			key: `sky_blue_background`,
			label: `colors.sky_blueBg`,
			light: `rgb(199, 236, 255)`,
			dark: `rgb(20, 72, 110)`
		},
		{
			key: `green_background`,
			label: `colors.greenBg`,
			light: `rgb(172, 226, 197)`,
			dark: `rgb(27, 82, 58)`
		},
		{
			key: `yellow_background`,
			label: `colors.yellowBg`,
			light: `rgb(255, 238, 173)`,
			dark: `rgb(91, 74, 12)`
		},
		{
			key: `orange_background`,
			label: `colors.orangeBg`,
			light: `rgb(255, 220, 196)`,
			dark: `rgb(98, 53, 28)`
		},
		{
			key: `red_background`,
			label: `colors.redBg`,
			light: `rgb(255, 201, 199)`,
			dark: `rgb(111, 40, 43)`
		},
		{
			key: `rose_red_background`,
			label: `colors.rose_redBg`,
			light: `rgb(255, 199, 226)`,
			dark: `rgb(111, 39, 80)`
		},
		{
			key: `purple_background`,
			label: `colors.purpleBg`,
			light: `rgb(242, 199, 255)`,
			dark: `rgb(91, 40, 113)`
		}
	], r = [
		{
			key: `default`,
			label: `colors.defaultBorder`,
			light: `transparent`,
			dark: `transparent`
		},
		{
			key: `grey`,
			label: `colors.greyBorder`,
			light: `rgb(128, 134, 143)`,
			dark: `rgb(91, 92, 92)`
		},
		{
			key: `blue`,
			label: `colors.blueBorder`,
			light: `rgb(176, 205, 255)`,
			dark: `rgb(47, 74, 136)`
		},
		{
			key: `sky_blue`,
			label: `colors.sky_blueBorder`,
			light: `rgb(150, 222, 238)`,
			dark: `rgb(43, 108, 129)`
		},
		{
			key: `green`,
			label: `colors.greenBorder`,
			light: `rgb(168, 224, 194)`,
			dark: `rgb(49, 124, 88)`
		},
		{
			key: `yellow`,
			label: `colors.yellowBorder`,
			light: `rgb(249, 227, 139)`,
			dark: `rgb(134, 108, 37)`
		},
		{
			key: `orange`,
			label: `colors.orangeBorder`,
			light: `rgb(255, 186, 133)`,
			dark: `rgb(136, 73, 37)`
		},
		{
			key: `red`,
			label: `colors.redBorder`,
			light: `rgb(255, 166, 163)`,
			dark: `rgb(136, 44, 48)`
		},
		{
			key: `rose_red`,
			label: `colors.rose_redBorder`,
			light: `rgb(255, 174, 218)`,
			dark: `rgb(136, 47, 102)`
		},
		{
			key: `purple`,
			label: `colors.purpleBorder`,
			light: `rgb(231, 180, 255)`,
			dark: `rgb(101, 45, 136)`
		}
	], i = [
		{
			key: `default`,
			label: `colors.defaultDivider`,
			light: `rgba(0, 0, 0, 0.12)`,
			dark: `rgb(237, 237, 237)`
		},
		{
			key: `black_divider`,
			label: `colors.blackDivider`,
			light: `rgb(0, 0, 0)`,
			dark: `rgb(65, 68, 74)`
		},
		{
			key: `grey_divider`,
			label: `colors.greyDivider`,
			light: `rgb(133, 133, 133)`,
			dark: `rgb(123, 123, 123)`
		},
		{
			key: `light_grey_divider`,
			label: `colors.light_greyDivider`,
			light: `rgb(220, 223, 228)`,
			dark: `rgb(91, 92, 92)`
		},
		{
			key: `blue_divider`,
			label: `colors.blueDivider`,
			light: `rgb(41, 114, 244)`,
			dark: `rgb(78, 168, 246)`
		},
		{
			key: `light_blue_divider`,
			label: `colors.light_blueDivider`,
			light: `rgb(176, 205, 255)`,
			dark: `rgb(47, 74, 136)`
		},
		{
			key: `table_blue_divider`,
			label: `colors.table_blueDivider`,
			light: `rgb(102, 183, 252)`,
			dark: `rgb(32, 93, 164)`
		},
		{
			key: `sky_blue_divider`,
			label: `colors.sky_blueDivider`,
			light: `rgb(0, 163, 245)`,
			dark: `rgb(37, 184, 247)`
		},
		{
			key: `light_sky_blue_divider`,
			label: `colors.light_sky_blueDivider`,
			light: `rgb(150, 222, 238)`,
			dark: `rgb(43, 108, 129)`
		},
		{
			key: `green_divider`,
			label: `colors.greenDivider`,
			light: `rgb(0, 179, 113)`,
			dark: `rgb(114, 192, 146)`
		},
		{
			key: `light_green_divider`,
			label: `colors.light_greenDivider`,
			light: `rgb(156, 228, 195)`,
			dark: `rgb(49, 124, 88)`
		},
		{
			key: `yellow_divider`,
			label: `colors.yellowDivider`,
			light: `rgb(254, 193, 0)`,
			dark: `rgb(247, 212, 37)`
		},
		{
			key: `light_yellow_divider`,
			label: `colors.light_yellowDivider`,
			light: `rgb(255, 237, 165)`,
			dark: `rgb(134, 108, 37)`
		},
		{
			key: `orange_divider`,
			label: `colors.orangeDivider`,
			light: `rgb(255, 128, 0)`,
			dark: `rgb(249, 162, 74)`
		},
		{
			key: `light_orange_divider`,
			label: `colors.light_orangeDivider`,
			light: `rgb(255, 218, 193)`,
			dark: `rgb(136, 73, 37)`
		},
		{
			key: `red_divider`,
			label: `colors.redDivider`,
			light: `rgb(242, 35, 41)`,
			dark: `rgb(229, 100, 90)`
		},
		{
			key: `light_red_divider`,
			label: `colors.light_redDivider`,
			light: `rgb(255, 198, 197)`,
			dark: `rgb(136, 44, 48)`
		},
		{
			key: `rose_red_divider`,
			label: `colors.rose_redDivider`,
			light: `rgb(221, 64, 151)`,
			dark: `rgb(228, 100, 166)`
		},
		{
			key: `light_rose_red_divider`,
			label: `colors.light_rose_redDivider`,
			light: `rgb(255, 174, 218)`,
			dark: `rgb(136, 47, 102)`
		},
		{
			key: `purple_divider`,
			label: `colors.purpleDivider`,
			light: `rgb(167, 46, 223)`,
			dark: `rgb(177, 92, 223)`
		},
		{
			key: `light_purple_divider`,
			label: `colors.light_purpleDivider`,
			light: `rgb(250, 197, 255)`,
			dark: `rgb(101, 45, 136)`
		}
	];
	o = {
		text: {
			...a(e),
			...t
		},
		background: a(n),
		border: a(r),
		divider: a(i)
	}, s = Object.keys(o.text), c = Object.keys(o.background), l$1 = Object.keys(o.border), u$1 = Object.keys(o.divider);
	ue = {
		strong: `b`,
		emphasis: `i`,
		delete: `s`
	};
	j(M(A({
		type: `bulleted_list`,
		category: `textContainer`,
		name: `BulletedList`,
		recordType: `bulleted_list`,
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ul><li>${P(e, t)}</li></ul>` : ``;
		}
	}))), j(A({
		type: `callout`,
		category: `container`,
		name: `Callout`,
		recordType: `callout`,
		parseMdxProps(e) {
			let t = {}, n = p(e, `icon`);
			return n && (t.icon = n), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.icon && (t.pageIcon = e.icon), t.blockColor = e.blockColor ?? `blue_background`, t.borderColor = e.borderColor ?? `blue`, t;
		},
		toIRProps(e) {
			let t = {};
			return e.pageIcon && (t.icon = e.pageIcon), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="Callout">${t.serializeChildren(e.children)}</div>` : ``;
		}
	})), A({
		type: `column_list`,
		category: `container`,
		name: `ColumnList`,
		recordType: `column_list`,
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let n = e, r = n.children.map((e) => e.props.width ?? ``), i = (e) => {
				let t = -1;
				return e && (e.trim().endsWith(`%`) ? t = Number(e.trim().split(`%`)[0]) / 100 : e.indexOf(`.`) > -1 && (t = Number(e))), t;
			}, a = (e) => !(Number.isNaN(e) || e < 0 || e > 1), o = r.map(i).filter(a), s = (1 - o.reduce((e, t) => e + t, 0)) / (n.children.length - o.length);
			for (let e of n.children) {
				let t = e;
				a(i(t.props.width ?? ``)) || (t.props.width = `${s * 100}%`);
			}
			return {
				props: t,
				consumeChildren: !1
			};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="ColumnList">${t.serializeChildren(e.children)}</div>` : ``;
		}
	}), A({
		type: `column`,
		category: `container`,
		name: `Column`,
		recordType: `column`,
		parseMdxProps(e) {
			let t = {}, n = p(e, `width`);
			return n && (t.width = n), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.width && (String(e.width).trim().endsWith(`%`) ? t.columnRatio = Number(String(e.width).trim().split(`%`)[0]) / 100 : t.columnRatio = Number(e.width)), t;
		},
		toIRProps(e) {
			let t = {};
			if (e.columnRatio) {
				let n = Number(e.columnRatio);
				Number.isNaN(n) || (t.width = `${(n * 100).toFixed(2)}%`);
			}
			return t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<div data-type="Column"${typeof e.props.width == `string` ? ` data-width="${t.escapeHtml(e.props.width)}"` : ``}>${t.serializeChildren(e.children)}</div>` : ``;
		}
	}), A({
		type: `divider`,
		category: `embed`,
		name: `Divider`,
		recordType: `divider`,
		irType: `divider`,
		htmlMatch: [{ validTagName: `hr` }],
		mdastTypes: [`thematicBreak`],
		parseMdxProps(e) {
			let t = {}, n = p(e, `dividerColor`) ?? p(e, `color`);
			return n && (t.dividerColor = n, delete e.color, delete e.dividerColor), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.dividerColor && (t.blockColor = e.dividerColor.endsWith(`_divider`) ? e.dividerColor : `${e.dividerColor}_divider`), t;
		},
		toIRProps(e) {
			let t = {};
			return e.blockColor && (t.dividerColor = e.blockColor.replace(`_divider`, ``)), t;
		},
		fromHtml(e, t) {
			return { type: `divider` };
		},
		toHtml(e, t) {
			return `<hr>`;
		},
		fromMdast(e, t) {
			return {
				node: { type: `divider` },
				warnings: []
			};
		},
		toMdast(e, t) {
			return { type: `thematicBreak` };
		},
		emitRecord(e, t, n) {
			let r = e.newId(), i = e.resolveType(`divider`, `divider`);
			e.putBlock({
				id: r,
				parentId: n,
				type: i,
				props: {},
				children: []
			}), e.appendChild(n, r);
		}
	}), A({
		type: `equation`,
		category: `embed`,
		name: `MathBlock`,
		recordType: `equation`,
		irType: `math`,
		mdastTypes: [`math`],
		parseMdxProps(e) {
			let t = {}, n = p(e, `width`);
			return n && (t.width = n), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.width && (t.width = e.width), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { children: n } = e, r = [[(n ?? []).filter((e) => e.type === `math`)[0]?.value ?? ``]];
			return {
				props: {
					...t,
					title: r
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.width && (t.width = e.width), t;
		},
		deriveIR: ({ record: e, props: t }) => {
			let n = {
				type: `math`,
				value: (e.props.title ?? []).map(([e]) => e).join(``)
			};
			return {
				props: { ...t },
				children: [n]
			};
		},
		toHtml(e, t) {
			if (e.type === `math`) return `<div data-type="math">${t.escapeHtml(e.value)}</div>`;
			if (e.type === `custom`) {
				let n = e.children.find((e) => e.type === `math`);
				return n?.type === `math` ? `<div data-type="MathBlock">${t.escapeHtml(n.value)}</div>` : `<div data-type="MathBlock"></div>`;
			}
			return ``;
		},
		fromMdast(e, t) {
			return {
				node: {
					type: `math`,
					value: e.value ?? ``
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			return {
				type: `math`,
				value: e.type === `math` ? e.value : ``
			};
		},
		emitRecord(e, t, n) {
			let r = t.type === `math` ? t.value : ``, i = e.newId(), a = e.resolveType(`math`, `equation`);
			e.putBlock({
				id: i,
				parentId: n,
				type: a,
				props: { title: [[r]] },
				children: []
			}), e.appendChild(n, i);
		}
	}), A({
		type: `header1`,
		category: `text`,
		name: `Heading`,
		recordTypes: [
			`header1`,
			`header2`,
			`header3`,
			`header4`,
			`header5`,
			`header6`
		],
		irType: `heading`,
		htmlMatch: [{ validTagName: [
			`h1`,
			`h2`,
			`h3`,
			`h4`,
			`h5`,
			`h6`
		] }],
		mdastTypes: [`heading`],
		recordType(e) {
			return `header${e.level}`;
		},
		parseMdxProps(e) {
			let t = {}, n = p(e, `level`), r = p(e, `textAlign`);
			return n && (t.level = n), r && (t.textAlign = r), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { title: n = [] } = k(e, { onMissing: `empty` });
			return {
				props: {
					...t,
					title: n
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveIR: ({ record: e, props: t, cap: n }) => {
			let r = e.type.replace(`header`, ``), i = {
				type: `paragraph`,
				content: n.tokensToInlineIR(e.props.title ?? [])
			};
			return {
				props: {
					...t,
					level: r
				},
				children: [i]
			};
		},
		fromHtml(e, t) {
			let n = Number(e.tagName.slice(1)), r = t.blockTextAlign();
			return {
				type: `heading`,
				level: n,
				content: t.parseChildrenInline(),
				...r ? { textAlign: r } : {}
			};
		},
		toHtml(e, t) {
			if (e.type === `custom`) {
				let n = Number(e.props.level) || 1, r = e.props.textAlign ? ` style="text-align:${e.props.textAlign}"` : ``, i = e.children[0];
				return `<h${n}${r}>${i?.type === `paragraph` ? t.serializeChildren(i.content) : t.serializeChildren(e.children)}</h${n}>`;
			}
			if (e.type === `heading`) {
				let n = e.textAlign ? ` style="text-align:${e.textAlign}"` : ``;
				return `<h${e.level}${n}>${t.serializeChildren(e.content)}</h${e.level}>`;
			}
			return ``;
		},
		fromMdast(e, t) {
			let n = e;
			return {
				node: {
					type: `heading`,
					level: n.depth,
					content: t.parseInline(n.children, t.registries)
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			return e.type === `heading` ? {
				type: `heading`,
				depth: e.level,
				children: t.inlineIRsToMdast(e.content)
			} : {
				type: `paragraph`,
				children: []
			};
		},
		emitRecord(e, t, n) {
			if (t.type !== `heading`) return;
			let r = e.newId(), i = e.resolveType(`heading`, `header`);
			e.putBlock({
				id: r,
				parentId: n,
				type: `${i}${t.level}`,
				props: {
					title: O(t.content),
					...t.textAlign ? { textAlign: t.textAlign } : {}
				},
				children: []
			}), e.appendChild(n, r);
		}
	}), A({
		type: `image`,
		category: `embed`,
		name: `Image`,
		recordType: `image`,
		htmlMatch: [{ validTagName: `img` }],
		aliases: [`img`],
		parseMdxProps(e) {
			let t = {}, n = p(e, `src`), r = p(e, `alt`), i = p(e, `width`), a = p(e, `height`), o = p(e, `align`), s = p(e, `linkUrl`);
			return n && (t.src = n), r && (t.alt = r), i && (t.width = Number(i)), a && (t.height = Number(a)), o && (t.align = o), s && (t.linkUrl = s), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.src && (t.displaySource = e.src), e.alt && (t.title = [[e.alt]]), e.width && (t.width = e.width), e.height && (t.height = e.height), e.align && (t.align = e.align), e.linkUrl && (t.linkUrl = e.linkUrl), t;
		},
		toIRProps(e) {
			let t = {};
			return e.align && (t.align = e.align), e.displaySource && (t.src = e.displaySource), e.width && (t.width = e.width), e.height && (t.height = e.height), e.linkUrl && (t.linkUrl = e.linkUrl), t;
		},
		deriveIR: ({ record: e, props: t }) => {
			let n = { ...t };
			return e.props.title && e.props.title.length > 0 && (n.alt = e.props.title.map(([e]) => e).join(``)), { props: n };
		},
		fromHtml(e, t) {
			let n = (t) => {
				let n = e.attributes[t];
				return typeof n == `string` ? n : void 0;
			}, r = n(`src`), i = n(`alt`), a = n(`width`), o = n(`height`), s = a === void 0 ? void 0 : Number(a), c = o === void 0 ? void 0 : Number(o);
			return {
				type: `custom`,
				name: `Image`,
				props: {
					...r ? { src: r } : {},
					...i ? { alt: i } : {},
					...s ? { width: s } : {},
					...c ? { height: c } : {}
				},
				children: []
			};
		},
		toHtml(e, t) {
			if (e.type !== `custom`) return ``;
			let n = typeof e.props.src == `string` ? e.props.src : ``, r = typeof e.props.alt == `string` ? e.props.alt : ``, i = e.props.width === void 0 ? `` : ` width="${t.escapeHtml(String(e.props.width))}"`, a = e.props.height === void 0 ? `` : ` height="${t.escapeHtml(String(e.props.height))}"`;
			return `<img src="${t.escapeHtml(n)}" alt="${t.escapeHtml(r)}"${i}${a} data-type="Image">`;
		}
	}), U = A({
		type: `mermaid`,
		category: `embed`,
		name: `MermaidBlock`,
		recordType: `mermaid`,
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps() {
			return {};
		},
		toIRProps() {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let { children: n } = e, r = [[(n ?? []).filter((e) => e.type === `code`)[0]?.value ?? ``]];
			return {
				props: {
					...t,
					title: r
				},
				consumeChildren: !0
			};
		},
		deriveIR: ({ record: e, props: t }) => {
			let n = {
				type: `code`,
				lang: `mermaid`,
				value: (e.props.title ?? []).map(([e]) => e).join(`
`)
			};
			return {
				props: { ...t },
				children: [n]
			};
		}
	}), j(M(A({
		type: `numbered_list`,
		category: `textContainer`,
		name: `NumberedList`,
		recordType: `numbered_list`,
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ol><li>${P(e, t)}</li></ol>` : ``;
		}
	}))), j(M(A({
		type: `page`,
		category: `embed`,
		name: `Page`,
		recordType: `page`,
		parseMdxProps(e) {
			let t = {}, n = p(e, `icon`);
			return n && (t.icon = n), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.icon && (t.pageIcon = e.icon), t;
		},
		toIRProps(e) {
			let t = {};
			return e.pageIcon && (t.icon = e.pageIcon), t;
		}
	}))), A({
		type: `text`,
		category: `textContainer`,
		name: `Paragraph`,
		recordType: `text`,
		irType: `paragraph`,
		htmlMatch: [{ validTagName: `p` }],
		mdastTypes: [`paragraph`],
		parseMdxProps(e) {
			let t = {}, n = p(e, `textAlign`);
			return n && (t.textAlign = n), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveRecord({ node: e, props: t }) {
			let { title: n = [] } = k(e, { onMissing: `empty` });
			return {
				props: {
					...t,
					title: n
				},
				consumeChildren: !0
			};
		},
		toIRProps(e) {
			let t = {};
			return e.textAlign && (t.textAlign = e.textAlign), t;
		},
		deriveIR: ({ record: e, props: t, cap: n }) => ({
			props: t,
			children: [{
				type: `paragraph`,
				content: n.tokensToInlineIR(e.props.title ?? [])
			}]
		}),
		fromHtml(e, t) {
			let n = t.blockTextAlign();
			return {
				type: `paragraph`,
				content: t.parseChildrenInline(),
				...n ? { textAlign: n } : {}
			};
		},
		toHtml(e, t) {
			if (e.type === `custom`) {
				let n = e.props.textAlign ? ` style="text-align:${e.props.textAlign}"` : ``, r = e.children[0];
				return `<p${n}>${r?.type === `paragraph` ? t.serializeChildren(r.content) : t.serializeChildren(e.children)}</p>`;
			}
			return e.type === `paragraph` ? `<p${e.textAlign ? ` style="text-align:${e.textAlign}"` : ``}>${t.serializeChildren(e.content)}</p>` : ``;
		},
		fromMdast(e, t) {
			let n = e;
			if (n.children.length === 1 && n.children[0].type === `image`) return {
				node: q(n.children[0]),
				warnings: []
			};
			if (n.children.length === 1 && n.children[0].type === `link`) {
				let e = n.children[0];
				if (e.children.length === 1 && e.children[0].type === `image`) return {
					node: q(e.children[0], e.url),
					warnings: []
				};
			}
			return {
				node: {
					type: `paragraph`,
					content: t.parseInline(Te(n.children), t.registries)
				},
				warnings: []
			};
		},
		toMdast(e, t) {
			let n = e.type === `paragraph` ? e.content : [];
			return {
				type: `paragraph`,
				children: t.inlineIRsToMdast(n)
			};
		},
		emitRecord(e, t, n) {
			if (t.type !== `paragraph`) return;
			let r = e.newId(), i = e.resolveType(`paragraph`, `text`);
			e.putBlock({
				id: r,
				parentId: n,
				type: i,
				props: {
					title: O(t.content),
					...t.textAlign ? { textAlign: t.textAlign } : {}
				},
				children: []
			}), e.appendChild(n, r);
		}
	}), we = /(?<=\s)\/([^/\s][^/]*[^/\s]|[^/\s])\/(?=\s)/g;
	ke = {
		type: `paragraph`,
		content: []
	}, j(A({
		type: `quote`,
		category: `container`,
		name: `BlockQuote`,
		recordType: `quote`,
		irType: `quote`,
		htmlMatch: [{ validTagName: `blockquote` }],
		mdastTypes: [`blockquote`],
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		deriveRecord({ node: e, props: t }) {
			let n = `children` in e ? e.children : void 0;
			return {
				props: {
					...t,
					title: []
				},
				consumeChildren: !1,
				restChildren: n ?? []
			};
		},
		fromHtml(e, t) {
			return {
				type: `quote`,
				children: t.parseChildrenBlock()
			};
		},
		toHtml(e, t) {
			return e.type === `custom` || e.type === `quote` ? `<blockquote>${t.serializeChildren(e.children)}</blockquote>` : ``;
		},
		fromMdast(e, t) {
			let n = e, { nodes: r, warnings: i } = t.blocksToIR(n.children ?? [], { registries: t.registries });
			return {
				node: {
					type: `quote`,
					children: r
				},
				warnings: i
			};
		},
		toMdast(e, t) {
			return {
				type: `blockquote`,
				children: (e.type === `quote` ? e.children : []).map((e) => t.irNodeToMdastContent(e))
			};
		},
		emitRecord(e, t, n, r) {
			let i = e.newId(), a = e.resolveType(`quote`, `quote`);
			e.putBlock({
				id: i,
				parentId: n,
				type: a,
				props: { title: [] },
				children: []
			}), e.appendChild(n, i);
			let o = t.type === `quote` ? t.children : [], s = o.length ? o : [ke];
			for (let t of s) r(e, t, i);
		}
	}));
	Fe = [
		`top`,
		`middle`,
		`bottom`
	], A({
		type: `simple_table`,
		category: `container`,
		name: `Table`,
		recordType: `simple_table`,
		parseMdxProps(e) {
			let t = {};
			return m(e, `columnHeader`) === !0 && (t.columnHeader = !0), m(e, `rowHeader`) === !0 && (t.rowHeader = !0), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.columnHeader === !0 && (t.tableColumnHeader = !0), e.rowHeader === !0 && (t.tableRowHeader = !0), t;
		},
		deriveRecord({ node: e, props: t, ctx: n }) {
			let r = e, i = je(r), a = Array.from({ length: i }, () => n.newId(8)), o = Me(r, a);
			Ne(r, o, a);
			let s = {
				...t,
				tableColumnOrder: a,
				tableColumnWidthMap: a.reduce((e, t) => (e[t] = 120, e), {})
			};
			return o.length > 0 && (s.cellRanges = o), {
				consumeChildren: !1,
				props: s
			};
		},
		toIRProps(e) {
			let t = { readonly: !0 };
			return e.tableColumnHeader === !0 && (t.columnHeader = !0), e.tableRowHeader === !0 && (t.rowHeader = !0), t;
		},
		deriveIR({ record: e, props: t, children: n }) {
			let r = e.props.cellRanges;
			if (!r?.length) return {
				props: t,
				children: n
			};
			let i = e.props.tableColumnOrder;
			return Pe(n, r, i), {
				props: t,
				children: n
			};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<table>${t.serializeChildren(e.children)}</table>` : ``;
		}
	}), A({
		type: `simple_table_row`,
		category: `container`,
		name: `TableRow`,
		recordType: `simple_table_row`,
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<tr>${t.serializeChildren(e.children)}</tr>` : ``;
		}
	}), A({
		type: `simple_table_cell`,
		category: `container`,
		name: `TableCell`,
		recordType: `simple_table_cell`,
		parseMdxProps(e) {
			let t = {}, n = p(e, `columnKey`);
			n && (t.columnKey = n);
			let r = p(e, `colspan`), i = r === void 0 ? NaN : Number(r);
			Number.isInteger(i) && i > 1 && (t.colspan = i);
			let a = p(e, `rowspan`), o = a === void 0 ? NaN : Number(a);
			Number.isInteger(o) && o > 1 && (t.rowspan = o);
			let s = p(e, `verticalAlign`);
			return s && Fe.includes(s) && (t.verticalAlign = s), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.columnKey && (t.columnKey = e.columnKey), e.verticalAlign && (t.verticalAlign = e.verticalAlign), t;
		},
		toIRProps(e) {
			let t = {};
			return e.verticalAlign && (t.verticalAlign = e.verticalAlign), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<td>${t.serializeChildren(e.children)}</td>` : ``;
		}
	}), j(M(A({
		type: `to_do`,
		category: `textContainer`,
		name: `Todo`,
		recordType: `to_do`,
		parseMdxProps(e) {
			let t = {}, n = m(e, `checked`);
			return n && (t.checked = n), d$1(t, []);
		},
		toRecordProps(e) {
			let t = {};
			return e.checked && (t.checked = e.checked), t;
		},
		toIRProps(e) {
			let t = {};
			return typeof e.checked == `boolean` && (t.checked = e.checked), t;
		},
		toHtml(e, t) {
			return e.type === `custom` ? `<ul data-type="todo"><li${e.props.checked === !0 || e.props.checked === `true` ? ` data-checked` : ``}>${P(e, t)}</li></ul>` : ``;
		}
	}))), j(M(A({
		type: `toggle`,
		category: `textContainer`,
		name: `Toggle`,
		recordType: `toggle`,
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {};
		}
	}))), A({
		type: ``,
		category: `container`,
		name: `Unsupported`,
		recordType: ``,
		parseMdxProps(e) {
			return d$1({}, []);
		},
		toRecordProps(e) {
			return {};
		},
		toIRProps(e) {
			return {
				type: e.type,
				id: e.id,
				readonly: !0
			};
		}
	}), N({
		name: `Link`,
		inlineType: `link`,
		parseMdxProps(e) {
			let t = p(e, `href`);
			return t ? d$1({ href: t }, []) : f([`Link.href is required`]);
		},
		buildInlineIR({ props: e, children: t }) {
			return {
				type: `link`,
				url: String(e.href),
				children: t
			};
		},
		htmlMatch: [{ validTagName: `a` }],
		fromHtml(e, t) {
			let n = typeof e.attributes.href == `string` ? e.attributes.href : ``, r = typeof e.attributes.title == `string` ? e.attributes.title : void 0;
			return {
				type: `link`,
				url: n,
				...r ? { title: r } : {},
				children: t.parseChildrenInline()
			};
		},
		toHtml(e, t) {
			if (e.type !== `link`) return ``;
			let n = e.title ? ` title="${t.escapeHtml(e.title)}"` : ``;
			return `<a href="${t.escapeHtml(e.url)}"${n}>${t.serializeChildren(e.children)}</a>`;
		}
	}), N({
		name: `Mark`,
		inlineType: `span`,
		parseMdxProps() {
			return d$1({}, []);
		},
		buildInlineIR({ children: e }) {
			return {
				type: `span`,
				marks: {},
				children: e
			};
		},
		toHtml(e, t) {
			if (e.type !== `span`) return ``;
			let n = t.marksToStyle(e.marks);
			return n ? `<span style="${n}">${t.serializeChildren(e.children)}</span>` : t.serializeChildren(e.children);
		}
	});
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/plugin.mjs
function u(u = {}) {
	let d = {
		...u$6,
		...u.icons
	};
	return t$12({
		descriptor: U,
		component: (e) => import_react$2.createElement(p$4, { value: d }, import_react$2.createElement(f$1, e)),
		plainText: !0,
		childrenLayout: `plain`,
		meta: {
			label: `文本绘图`,
			icon: GitBranch,
			keywords: [
				`mermaid`,
				`文本绘图`,
				`wbht`,
				`wenbenhuitu`
			],
			shortcut: `wbht`,
			group: `media`
		},
		behaviors: { afterCreate: ({ blockId: e }) => {
			n$7(e);
		} },
		inputRules: [o$1],
		editorComponent: e$14(() => __vitePreload(() => import("./mermaid-plugin-component-COJIvlF1.js"), __vite__mapDeps([44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,45]), import.meta.url)),
		loadOn: { blockType: `mermaid` }
	});
}
var import_react$2, d;
var init_plugin = __esmMin((() => {
	init_config();
	init_just_created();
	init_mermaid_block();
	init_mermaid_block_rule();
	init_dist$7();
	init_dist$1();
	init_lucide_react();
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_preload_helper();
	d = u();
}));
//#endregion
//#region ../../node_modules/@tencent/smart-doc-plugin-mermaid/dist/index.mjs
var init_dist = __esmMin((() => {
	init_plugin();
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/use-markdown-editor.ts
/**
* 把 editor 当前 records 序列化为 markdown (lossy)。
* 用于 contentChange 路径的自动保存，以及 loadIntoEditor 前的内容对比。
* 导出供 MarkdownEditorComponent 命令式保存（EditableEditorRef.onSave）使用。
*/
async function serializeMarkdown(editor) {
	if (!editor.rootId) return "";
	const block = {};
	for (const r of editor.recordView.valuesOfTable("block")) block[r.id] = r;
	return ms({
		schemaVersion: 1,
		rootId: editor.rootId,
		records: { block }
	}, { outputMode: "md-lossy" });
}
/**
* 封装 Markdown 编辑器的状态管理逻辑：
* - editor 实例创建
* - markdown 内容解析并注入 editor（注入前对比当前内容，无变化则跳过）
* - editor config 构建
* - 监听 contentChange 事件，用户编辑后 debounce 触发 onSave
*
* 注意：usePlugins 必须在 EditorRoot context 内调用，因此从本 hook 中移出，
* 改由 MarkdownEditorComponent 内部的 PluginsLayer 子组件负责。
*/
function useMarkdownEditor({ content, onSave, themeName, readOnly, imageUrlResolver }) {
	const editor = i$16();
	const imageUrlResolverRef = (0, import_react$1.useRef)(imageUrlResolver);
	(0, import_react$1.useEffect)(() => {
		imageUrlResolverRef.current = imageUrlResolver;
	}, [imageUrlResolver]);
	/**
	* 把 markdown 文本解析并塞进 editor。
	*/
	const loadIntoEditor = (0, import_react$1.useCallback)(async (text) => {
		const resolver = imageUrlResolverRef.current;
		const doc = await ps(text, {
			sourceType: "md",
			...resolver ? { imageUrlResolver: resolver } : {}
		});
		if (editor.destroyed) return;
		editor.load(doc.records, doc.rootId);
	}, [editor]);
	/**
	* 记录最近一次保存出去的 markdown 文本。
	*/
	const lastWrittenRef = (0, import_react$1.useRef)(null);
	const handleSave = (0, import_react$1.useCallback)(async () => {
		if (!onSave || !editor.rootId) return;
		let markdown;
		try {
			markdown = await serializeMarkdown(editor);
		} catch {
			return;
		}
		lastWrittenRef.current = markdown;
		await onSave(markdown);
	}, [editor, onSave]);
	const handleSaveRef = (0, import_react$1.useRef)(handleSave);
	(0, import_react$1.useEffect)(() => {
		handleSaveRef.current = handleSave;
	}, [handleSave]);
	/**
	* 把 content 同步到 editor。
	*/
	(0, import_react$1.useEffect)(() => {
		if (content === void 0) return;
		if (!editor.rootId) {
			loadIntoEditor(content);
			return;
		}
		if (content === lastWrittenRef.current) return;
		loadIntoEditor(content);
	}, [
		content,
		editor,
		loadIntoEditor
	]);
	(0, import_react$1.useEffect)(() => {
		let timer = null;
		const flush = async () => {
			timer = null;
			await handleSaveRef.current();
		};
		const unsub = editor.on("contentChange", ({ source }) => {
			if (source !== "user") return;
			if (timer) clearTimeout(timer);
			timer = setTimeout(flush, AUTO_SAVE_DELAY);
		});
		return () => {
			unsub();
			if (timer) {
				clearTimeout(timer);
				handleSaveRef.current();
			}
		};
	}, [editor]);
	return {
		editor,
		editorConfig: (0, import_react$1.useMemo)(() => r$19({
			mode: "markdown",
			readOnly,
			theme: { name: themeName ?? "auto" },
			toolbar: { floating: { enabled: false } },
			features: { shortcuts: { items: (defaults) => {
				return [...defaults.filter((item) => item.id !== "save:auto-save-hint"), {
					id: "save:noop",
					chord: "Mod+S",
					scopes: ["global"],
					run: () => {}
				}];
			} } }
		}), [themeName, readOnly]),
		updateContent: (0, import_react$1.useCallback)(async (text) => {
			if (editor.destroyed) return;
			if (text === lastWrittenRef.current) return;
			await loadIntoEditor(text);
		}, [editor, loadIntoEditor]),
		handleSave,
		compareAndFlashHighlight: (0, import_react$1.useCallback)((range, expectedText) => {
			const [startBlock, startOff, endBlock, endOff] = range;
			if (n$12(editor, {
				type: "text",
				anchor: {
					blockId: startBlock,
					offset: startOff
				},
				focus: {
					blockId: endBlock,
					offset: endOff
				}
			}) === expectedText) flashHighlightRange(range, "active");
		}, [editor])
	};
}
var import_react$1, MARKDOWN_PLUGINS, AUTO_SAVE_DELAY;
var init_use_markdown_editor = __esmMin((() => {
	init_markdown_mode();
	init_dist$8();
	init_dist$7();
	init_dist$3();
	init_dist$2();
	init_dist();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_selection_deco_state();
	MARKDOWN_PLUGINS = [
		l$9,
		r$10,
		d
	];
	AUTO_SAVE_DELAY = 1e3;
}));
//#endregion
//#region ../../packages/context-viewer-components/src/media-preview/components/markdown-editor/markdown-editor-component.tsx
var import_react, import_jsx_runtime, MarkdownEditorComponent;
var init_markdown_editor_component = __esmMin((() => {
	init_src();
	init_dist$7();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_empty_markdown_placeholder();
	init_index_module();
	init_selection_quote();
	init_use_markdown_editor();
	import_jsx_runtime = require_jsx_runtime();
	MarkdownEditorComponent = (0, import_react.forwardRef)((props, ref) => {
		const t = useTranslation();
		const { editor, updateContent, editorConfig, handleSave, compareAndFlashHighlight } = useMarkdownEditor({
			onSave: props.onSave,
			content: props.content,
			themeName: props.themeName,
			readOnly: props.readOnly,
			imageUrlResolver: props.imageUrlResolver
		});
		const { registryConfig, PluginContainer } = i$17(MARKDOWN_PLUGINS);
		(0, import_react.useImperativeHandle)(ref, () => ({
			onSave: async () => {
				handleSave();
			},
			updateContent,
			compareAndFlashHighlight
		}), [
			props.onSave,
			editor,
			updateContent,
			compareAndFlashHighlight
		]);
		/**
		* 标记编辑器是否处于"被动只读"：即上层没有主动设置 readOnly（props.readOnly=false），
		* 但编辑器因文档 block 数量过大内部强制降级为只读。
		* 用于点击获取焦点时判断是否需要提示"文档过大暂不支持编辑"。
		*/
		const forcedReadOnlyRef = (0, import_react.useRef)(false);
		import_react.useEffect(() => {
			if (props.readOnly) {
				forcedReadOnlyRef.current = false;
				return;
			}
			editor.setEditable(true);
			forcedReadOnlyRef.current = editor.readOnly;
			const unsubscribe = editor.on("editableChange", ({ readOnly }) => {
				forcedReadOnlyRef.current = readOnly;
			});
			return typeof unsubscribe === "function" ? unsubscribe : void 0;
		}, [editor, props.readOnly]);
		/**
		* 只读态下点击获取焦点时，提示文档过大暂不支持直接编辑。
		* dedupKey 去重，避免连续点击弹出多个 toast。
		*/
		const handleContainerMouseDown = (0, import_react.useCallback)(() => {
			if (props.readOnly || !forcedReadOnlyRef.current) return;
			toast.warning(t("markdownEditor.readOnlyTooLarge"), { dedupKey: "markdown-editor-readonly-too-large" });
		}, [props.readOnly, t]);
		/**
		* 在捕获阶段拦截链接，先于 smart-doc-editor 内部点击处理打开外链。
		* 否则编辑器自身 window.open 与外层 MediaPreview onClick 会各打开一次浏览器 tab。
		*/
		const handleLinkClickCapture = (0, import_react.useCallback)((event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			const anchor = target.closest("a");
			if (!anchor || !event.currentTarget.contains(anchor)) return;
			const href = anchor.getAttribute("href");
			if (!href) return;
			event.preventDefault();
			event.stopPropagation();
			event.nativeEvent.stopImmediatePropagation?.();
			if (props.onOpenExternal) props.onOpenExternal(href);
			else window.open(href, "_blank", "noopener,noreferrer");
		}, [props.onOpenExternal]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: index_module_default.previewContainer,
			onClickCapture: handleLinkClickCapture,
			onContextMenu: (event) => event.preventDefault(),
			onMouseDown: handleContainerMouseDown,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.editorWrapper,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(u$11, {
					editor,
					className: index_module_default.editorRoot,
					...editorConfig,
					registryConfig,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginContainer, { editor }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMarkdownPlaceholder, {}),
						!props.readOnly && (props.onSendSelectionQuoteToChat || props.onInsertSelectionQuoteToInput) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionQuote, {
							onSendSelectionQuoteToChat: props.onSendSelectionQuoteToChat,
							onInsertSelectionQuoteToInput: props.onInsertSelectionQuoteToInput
						})
					]
				})
			})
		});
	});
	MarkdownEditorComponent.displayName = "MarkdownEditorComponent";
}));
//#endregion
export { init_selection_deco_state as a, buildHighlightRangeFromDOM as i, init_markdown_editor_component as n, init_markdown_mode as r, MarkdownEditorComponent as t };
