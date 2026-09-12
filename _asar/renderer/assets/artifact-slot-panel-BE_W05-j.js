import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { a as prepareArtifactRemoteDragFile, i as init_artifact_drag, r as handleArtifactDragStart, t as getArtifactRemoteDragCacheKey } from "./artifact-drag-Dlide0j-.js";
import { c as getArtifactRelativePath, o as getArtifactFileExtension, s as getArtifactFilePath, u as init_file_path } from "./file-path-DzzGeaqx.js";
import { Sr as ArtifactFileTypeIcon, Tn as GlobeIcon, _r as ArrowUpRightIcon, n as init_icons } from "./icons-Cj3UopO9.js";
import { n as init_format_bytes, t as formatBytes } from "./format-bytes-CfLBp0EL.js";
//#region ../../packages/agent-ui/src/components/main-content-core/artifact-slot-panel-icons.tsx
/**
* 判定 artifact 是否为可浏览器预览的 HTML 类产物。
* 判定逻辑与 main-content-core.tsx 中的 getLatestHtmlArtifactUrl 保持一致：
* 必须是 media-artifact + artifact 类目，且 url 后缀为 .html / .htm（允许 ?query / #hash）。
*/
function isHtmlArtifact(item) {
	if (item.type !== "media-artifact" || item.category !== "artifact") return false;
	const url = item.url;
	if (!url) return false;
	return /\.(?:html|htm)(?:[?#].*)?$/i.test(url);
}
/**
* 判定 artifact 是否为 Markdown 文档。
* 注意：Markdown artifact 的 category 是 'media'（不同于 HTML 的 'artifact'），
* 上游的 contentType 会归到 'document' 大类，因此判定按 url 后缀；mimeType 作为兜底。
*/
function isMarkdownArtifact(item) {
	if (item.type !== "media-artifact") return false;
	const url = item.url;
	if (url && /\.(?:md|markdown|mdx)(?:[?#].*)?$/i.test(url)) return true;
	return item.mimeType === "text/markdown";
}
/**
* Ardot canvas custom artifact 图标：文件 + Ardot C 字符 + 品牌绿角标。
*
* 不走 foundation `ArtifactFileTypeIcon`：这是 Ardot 自家品牌图标（绿角标），
* 设计稿 12 类通用文件 kind 里没有等价物，保留手写。
*/
function ArdotFileIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 50 56",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinejoin: "round",
				d: "M8.375 3H31.25L43.75 15.5V52.875A2.125 2.125 0 0 1 41.625 55H8.375A2.125 2.125 0 0 1 6.25 52.875V5.125A2.125 2.125 0 0 1 8.375 3Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinejoin: "round",
				d: "M31.25 3V13.375A2.125 2.125 0 0 0 33.375 15.5H43.75"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				fill: "currentColor",
				transform: "translate(14.5 21)",
				d: "M10.157 0C12.335 0.007 14.482 0.827 15.727 2.53 17.89 5.488 16.843 9.18 14.703 11.364L12.534 9.239C13.977 7.766 14.302 5.725 13.276 4.322 12.754 3.607 11.652 3.041 10.147 3.036 8.677 3.032 6.976 3.578 5.5 4.873 3.101 6.979 2.457 10.314 3.557 12.826 4.918 15.935 8.122 16.87 10.776 16.267 13.813 15.576 15.987 12.967 17.364 10.828L20.242 11.445V11.521C20.242 13.717 20.553 16.612 21 18.66H17.901C17.722 17.727 17.569 16.689 17.453 15.636 15.948 17.199 13.964 18.656 11.449 19.227 7.768 20.064 2.868 18.826 0.775 14.044-0.868 10.289 0.129 5.547 3.497 2.591 5.528 0.809 7.944 -0.007 10.157 0Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				fill: "#30F472",
				transform: "rotate(44.47494 -23.2133 46.5249)",
				d: "M0 0H3.0363V3.0363H0Z"
			})
		]
	});
}
/**
* 计划类 artifact 图标：文件外形 + 内部段落横线，表"计划/大纲"语义。
*
* 服务于 `implementation-plan` / `overview` / `walkthrough` / 通用 `custom-artifact`。
* 这些不是文件类型而是"计划"语义，不走 foundation 文件类型图标。
*/
function PlanFileIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M4 2h5.5L13 5.5V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
			stroke: "currentColor",
			strokeWidth: "1.2",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M5.5 8h5M5.5 10.5h3.5",
			stroke: "currentColor",
			strokeWidth: "1",
			strokeLinecap: "round"
		})]
	});
}
/**
* 任务类 artifact 图标：勾选 ✓ 圆环。
*
* 服务于 `task` 类型，是"任务完成态"的语义图标，与文件类型无关，不走 foundation。
*/
function TaskFileIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("polyline", { points: "22 4 12 14.01 9 11.01" })]
	});
}
/**
* 地球图标 / 右上跳转箭头：已下沉到 foundation
* （`foundation/components/Icon/icons/{GlobeIcon,ArrowUpRightIcon}.tsx`），
* 调用方请直接从 foundation 引入。
*/
/**
* 底部 action 行专用的窄长右箭头（5.55×9.22）。
*
* 与 foundation 的 `ChevronRightIcon`（V 形 chevron）不同：设计稿在"查看所有产物 / 查看所有变更"
* 这两个二级文字按钮尾部用的是一根更窄长的实心箭头，开角更窄，与 14px 行高视觉更契合。
*
* 仅在本组件 1 处使用，按 agent-ui CODEBUDDY 规则 2.1 暂不沉淀到 foundation；
* 后续若 ≥3 处需要同款窄箭头再迁移。
*
* fill 使用 `currentColor` 跟随父级文字色，暗色主题下不会消失。
*/
function ActionChevronRightIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "5.5523",
		height: "9.219",
		viewBox: "0 0 5.5523 9.219",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			d: "M0 8.2762L3.6667 4.6095L0 0.9428L0.9428 0L5.5523 4.6095L0.9428 9.219L0 8.2762Z"
		})
	});
}
/**
* 把 ArtifactItem 映射到 foundation `ArtifactFileTypeIcon` 的 kind。
*
* 优先级（与 TypeIcon 的早返回顺序保持一致，仅文件类才走到这里）：
* 1. HTML（按 url 后缀，contentType 上游会标成 'code'，不可依赖）
* 2. Markdown（按 url 后缀 + mimeType 兜底，contentType 上游会标成 'document'）
* 3. media-artifact 各子类
* 4. 兜底 default
*
* 注意 contentType === 'document' 的歧义：
* - .md：上游也会标成 'document'，已在第 2 步按 url 后缀分流到 markdown
* - .pdf：上游也会标成 'document'，所以 PDF 分支必须排在 document 分支之前（按 mimeType）
* - 其余 docx/doc/rtf/odt 等：落到 word
*/
function getArtifactKindFromItem(item) {
	if (isHtmlArtifact(item)) return "html";
	if (isMarkdownArtifact(item)) return "markdown";
	if (item.type === "media-artifact") {
		const contentType = item.contentType;
		const mimeType = item.mimeType;
		if (contentType === "snapshot" || contentType === "diagram") return "image";
		if (contentType === "video") return "video";
		if (contentType === "audio") return "audio";
		if (contentType === "spreadsheet") return "spreadsheet";
		if (contentType === "presentation") return "presentation";
		if (mimeType === "application/pdf") return "pdf";
		if (contentType === "document") return "word";
	}
	return "default";
}
/**
* 根据 artifact item 类型返回对应的卡片左侧图标（28×28）。
*
* 整体策略：
* - **非文件类**（Ardot 品牌画板 / 计划类 / 任务类）走本文件保留的手写 svg，保留语义
* - **文件类**（HTML/Markdown/Image/Video/Audio/Spreadsheet/Presentation/PDF/Word/兜底）
*   统一接入 foundation `ArtifactFileTypeIcon`（solid 面型风格），与设计稿对齐
*/
function TypeIcon({ item }) {
	const type = item.type;
	if (type === "custom-artifact" && "customType" in item && item.customType === "ardot/canvas") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArdotFileIcon, {});
	if (type === "implementation-plan" || type === "overview" || type === "walkthrough" || type === "custom-artifact") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PlanFileIcon, {});
	if (type === "task") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(TaskFileIcon, {});
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArtifactFileTypeIcon, {
		kind: getArtifactKindFromItem(item),
		type: "solid",
		height: 28,
		width: 28
	});
}
var import_jsx_runtime$1;
var init_artifact_slot_panel_icons = __esmMin((() => {
	require_react();
	init_icons();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/artifact-slot-panel.tsx
function isHiddenPath(item) {
	const filePath = item.uri || item.url || getArtifactFilePath(item) || item.id || "";
	if (!HIDDEN_PATHS.some((p) => filePath.includes(p))) return false;
	return !ALLOWLIST_PATHS.some((p) => filePath.includes(p));
}
/**
* 过滤出 artifact 和 media 类型。
*
* 当前规则（与下方 `presentFilesOnly` 配合）：
* - 实时事件链路有 `sourceTool` → 仅放行 `'PresentFiles'`，挡掉 watcher / checkpoint
*   自动登记的被动产物。
* - 历史回放链路（sandbox-proxy）整体没有 `sourceTool` → 视作 LLM 主动产出，全部放行。
*
* 同时排除 file-changes（另由 getFileChanges 处理）以及隐藏路径（与 DetailPanel 一致）。
*/
function getArtifactAndMedia(artifacts, extraFilter) {
	return artifacts.filter((a) => {
		if (a.category !== "artifact" && a.category !== "media") return false;
		if (isHiddenPath(a)) return false;
		if (a.type === "task") return false;
		if (extraFilter && !extraFilter(a)) return false;
		return true;
	});
}
/**
* 按更新时间排序（最近更新的排在前面）。
* 没有 updatedAt 的排在最后，同时间保持原始顺序（稳定排序）。
*/
function sortByUpdateTime(items) {
	return [...items].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
}
/** 过滤出 file-changes 类型（排除隐藏路径） */
function getFileChanges(artifacts) {
	return artifacts.filter((a) => a.category === "file-changes" && !isHiddenPath(a));
}
var import_react, import_jsx_runtime, HIDDEN_PATHS, ALLOWLIST_PATHS, ArtifactSlotPanel;
var init_artifact_slot_panel = __esmMin((() => {
	init_artifact_drag();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_icons();
	init_file_path();
	init_format_bytes();
	init_artifact_slot_panel_icons();
	import_jsx_runtime = require_jsx_runtime();
	HIDDEN_PATHS = ["Claw/.memory", ".workbuddy"];
	ALLOWLIST_PATHS = [
		".workbuddy/brain/",
		".workbuddy/plans/",
		".workbuddy/tasks/",
		".workbuddy/todos/",
		".workbuddy/skills/",
		".workbuddy/memory/",
		".workbuddy/artifact-index/",
		".codebuddy/brain/",
		".codebuddy/plans/",
		".codebuddy/tasks/",
		".codebuddy/todos/",
		".codebuddy/skills/",
		".codebuddy/memory/"
	];
	ArtifactSlotPanel = ({ artifacts, onSelect, onViewMore, onViewAllFiles, onOpenArtifactPreview, taskId, taskName, hideArtifactGrid = false, artifactDragResolver, disableLocalFileActions = false, t, allArtifacts }) => {
		/**
		* 产物显式声明过滤：
		* - 实时事件链路（desktop 主进程 MediaArtifactService.detectAndAddMedia 写入 _meta.sourceTool）
		*   会带 sourceTool，仅放行 'PresentFiles' 以避免 watcher 扫描 / checkpoint 自动登记的
		*   被动产物污染产物栏。
		* - 历史回放链路（sandbox-proxy `GET /api/session/artifacts`）的 Go `types.Artifact`
		*   不带 _meta 字段，反序列化后整条 entry 没有 sourceTool。这种来源天然只来自 LLM
		*   主动产出（不存在 watcher 噪声），所以"无 sourceTool"也作为放行条件，避免历史回放
		*   时产物卡片整列消失、只剩"查看 N 个文件变更"按钮的回归。
		*
		* 之后如果某条历史回放链路开始混入被动产物，可在 server 出口处对 entry 标注一个
		* 哨兵 sourceTool（如 'NonInteractive'）并在此显式排除。
		*/
		const presentFilesOnly = (a) => {
			const sourceTool = a.sourceTool;
			if (sourceTool === void 0 || sourceTool === "") return true;
			return sourceTool === "PresentFiles";
		};
		/** 产物列表：仅展示 PresentFiles 声明的产物，按更新时间降序 */
		const artifactItems = (0, import_react.useMemo)(() => sortByUpdateTime(getArtifactAndMedia(artifacts, presentFilesOnly)), [artifacts]);
		/** 产物总数：全量产物使用与面板相同的 getArtifactAndMedia 过滤，确保按钮数字等于实际可见数 */
		const artifactTotal = (0, import_react.useMemo)(() => {
			if (!allArtifacts) return artifactItems.length;
			return getArtifactAndMedia(allArtifacts, presentFilesOnly).length;
		}, [allArtifacts, artifactItems.length]);
		/** 面板内最多展示 6 条产物，其余通过"查看全部"入口查看 */
		const MAX_DISPLAY_ITEMS = 6;
		const displayedItems = (0, import_react.useMemo)(() => artifactItems.slice(0, MAX_DISPLAY_ITEMS), [artifactItems]);
		const fileTotal = (0, import_react.useMemo)(() => getFileChanges(artifacts).length, [artifacts]);
		if (artifactItems.length === 0 && fileTotal === 0 && artifactTotal === 0) return null;
		const gridClassName = `artifact-slot-panel__grid${displayedItems.length === 1 ? " artifact-slot-panel__grid--single" : ""}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "artifact-slot-panel",
			"data-chat-search-skip": true,
			children: [!hideArtifactGrid && displayedItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: gridClassName,
				children: displayedItems.map((item) => {
					const showGlobe = isHtmlArtifact(item) && !!onOpenArtifactPreview;
					const itemUrl = item.url;
					/**
					* 拖拽/分享相关 data-* 属性：仅非 task 类型才挂载（task 没有真实文件路径）。
					* 提取为变量避免 JSX 行过长。
					*/
					const fileDataAttrs = item.type !== "task" ? {
						"data-dir": getArtifactRelativePath(item),
						"data-share": getArtifactFilePath(item),
						"data-ext": getArtifactFileExtension(item),
						"data-artifact-drag-cache-key": getArtifactRemoteDragCacheKey(item)
					} : {};
					/**
					* 🌐点击逻辑：调用 onOpenArtifactPreview 由上层用 adapter.openExternal 在外部浏览器打开。
					* stopPropagation/preventDefault 防止外层祖先委托捕获或触发主操作；
					* 在当前结构（与 .card-main 同级）下亦无害。
					*/
					const handleGlobeActivate = (e) => {
						e.stopPropagation();
						e.preventDefault();
						if (itemUrl && onOpenArtifactPreview) onOpenArtifactPreview(itemUrl);
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "artifact-slot-panel__card",
						...fileDataAttrs,
						"data-task-id": taskId,
						"data-task-name": taskName,
						"data-disable-local-file-actions": disableLocalFileActions ? "true" : void 0,
						draggable: item.type !== "task",
						onPointerEnter: () => prepareArtifactRemoteDragFile(item, artifactDragResolver),
						onPointerDown: () => prepareArtifactRemoteDragFile(item, artifactDragResolver),
						onDragStart: (e) => handleArtifactDragStart(e, item, { resolveRemoteFile: artifactDragResolver }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "artifact-slot-panel__card-main",
								"aria-label": item.title,
								onClick: () => onSelect(item.id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "artifact-slot-panel__card-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { item })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "artifact-slot-panel__card-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "artifact-slot-panel__card-title",
									children: item.title
								}), item.type === "media-artifact" && item.size != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "artifact-slot-panel__card-subtitle",
									children: formatBytes(item.size)
								})]
							}),
							showGlobe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "artifact-slot-panel__card-globe",
								"aria-label": t("artifactSlot.openInBrowser"),
								title: t("artifactSlot.openInBrowser"),
								onClick: handleGlobeActivate,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeIcon, { size: 14 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "artifact-slot-panel__card-arrow",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRightIcon, { size: 14 })
							})
						]
					}, item.id);
				})
			}), (artifactTotal > 0 || fileTotal > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "artifact-slot-panel__actions",
				children: [artifactTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "artifact-slot-panel__action-btn",
					"data-track-id": "agent_artifact_top_menu_clicked",
					"data-track-name": "查看所有产物",
					"data-track-props": "{\"type\":\"artifact\"}",
					onClick: onViewMore,
					children: [t("artifactSlot.viewAll", { count: artifactTotal }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "artifact-slot-panel__action-chevron",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionChevronRightIcon, {})
					})]
				}), fileTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "artifact-slot-panel__action-btn",
					"data-track-id": "agent_artifact_top_menu_clicked",
					"data-track-name": "查看所有变更",
					"data-track-props": "{\"type\":\"file-changes\"}",
					onClick: onViewAllFiles,
					children: [t("artifactSlot.viewFileChanges", { count: fileTotal }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "artifact-slot-panel__action-chevron",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionChevronRightIcon, {})
					})]
				})]
			})]
		});
	};
}));
//#endregion
export { init_artifact_slot_panel as n, ArtifactSlotPanel as t };
