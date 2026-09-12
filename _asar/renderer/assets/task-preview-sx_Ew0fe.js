import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Gn as init_src$1, Wn as init_theme, Yr as toast, lr as CrConfigProvider, o as FileTypeIcon, qn as TaskChatList, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { p as init_environment, t as getBrandName } from "./environment-DKqg3f0G.js";
import { a as init_i18n, u as t } from "./i18n-Bt_Wap4p.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { r as normalizeMessages, t as init_message_transforms } from "./message-transforms-DGKAEdDo.js";
import { n as parsePayload, t as init_visualizer_show_widget_payload } from "./visualizer-show-widget-payload-BO60iXXM.js";
import { a as init_markdown_types, c as isImageFile, l as isMarkdownFile, n as highlightText, o as isHtmlFile, r as init_markdown_utils, s as isIframePreviewFile, t as getHighlightLanguage, u as init_markdown_preview } from "./markdown-utils-HwTwYIv3.js";
import { n as init_artifact_slot_panel, t as ArtifactSlotPanel } from "./artifact-slot-panel-BE_W05-j.js";
import { n as init_StatusPlaceholder, t as StatusPlaceholder } from "./StatusPlaceholder-ap1bLSpN.js";
import { i as isWXMiniProgram, n as init_is_mobile_ua, r as init_ua, t as IS_MOBILE_UA } from "./is-mobile-ua-B8SGTv_t.js";
import { a as HtmlPreview, i as init_MarkdownPreview, n as init_PreviewIframe, o as init_HtmlPreview, r as MarkdownPreview, t as PreviewIframe } from "./PreviewIframe-DY_P1ukz.js";
//#region ../../packages/agent-ui/src/components/share-preview/task/task-preview.less
var init_task_preview$1 = __esmMin((() => {})), import_jsx_runtime$9, FileListItem;
var init_FileListItem = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$9 = require_jsx_runtime();
	FileListItem = ({ fileName, selected, onClick, animateIn }) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
		className: `stp-file-item ${selected ? "stp-file-item--selected" : ""}${animateIn ? " stp-file-item--animate-in" : ""}`,
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "stp-file-item__icon",
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(FileTypeIcon, { fileName })
		}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "stp-file-item__name",
			title: fileName,
			children: fileName
		})]
	});
})), import_jsx_runtime$8, FileList;
var init_FileList = __esmMin((() => {
	require_react();
	init_useI18n();
	init_FileListItem();
	import_jsx_runtime$8 = require_jsx_runtime();
	FileList = ({ visibleFileItems, allFileItems, selectedFileIdx, onSelectFile, replayActive, width }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "stp-middle",
			style: {
				width,
				flexShrink: 0
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "stp-middle__header",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
					className: "stp-middle__header-title",
					children: t("preview.artifacts")
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "stp-middle__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					className: "stp-middle__list",
					children: [visibleFileItems.map((fi) => {
						const absoluteIdx = allFileItems.findIndex((f) => f.filePath === fi.filePath);
						return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(FileListItem, {
							fileName: fi.fileName,
							filePath: fi.filePath,
							selected: selectedFileIdx === absoluteIdx,
							onClick: () => onSelectFile(absoluteIdx),
							animateIn: replayActive
						}, fi.filePath);
					}), allFileItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
						className: "stp-middle__placeholder",
						children: t("shareTaskPreview.noFileChanges")
					})]
				})
			})]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/image/ImagePreview.tsx
var import_react$10, import_jsx_runtime$7, ImagePreview;
var init_ImagePreview = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_StatusPlaceholder();
	import_jsx_runtime$7 = require_jsx_runtime();
	ImagePreview = ({ url, fileName, loadingText = t("common.loading"), errorText = t("preview.error.loadFailed") }) => {
		const [blobUrl, setBlobUrl] = (0, import_react$10.useState)(null);
		const [loading, setLoading] = (0, import_react$10.useState)(true);
		const [error, setError] = (0, import_react$10.useState)(null);
		(0, import_react$10.useEffect)(() => {
			let mounted = true;
			let objectUrl = null;
			const fetchImage = async () => {
				setLoading(true);
				setError(null);
				setBlobUrl(null);
				try {
					const response = await fetch(url);
					if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
					const blob = await response.blob();
					const finalBlob = fileName.toLowerCase().endsWith(".svg") && blob.type !== "image/svg+xml" ? new Blob([blob], { type: "image/svg+xml" }) : blob;
					objectUrl = URL.createObjectURL(finalBlob);
					if (mounted) setBlobUrl(objectUrl);
				} catch (err) {
					if (mounted) setError(err instanceof Error ? err.message : String(err));
				} finally {
					if (mounted) setLoading(false);
				}
			};
			fetchImage();
			return () => {
				mounted = false;
				if (objectUrl) URL.revokeObjectURL(objectUrl);
			};
		}, [url, fileName]);
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(StatusPlaceholder, {
			type: "loading",
			title: loadingText
		});
		if (error || !blobUrl) return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(StatusPlaceholder, {
			type: "error",
			title: errorText,
			description: error ?? void 0
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "stp-right__image-preview",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("img", {
				src: blobUrl,
				alt: fileName,
				className: "stp-right__image-preview-img"
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/components/markdown/TextPreview.tsx
var import_react$9, import_jsx_runtime$6, TextPreview;
var init_TextPreview = __esmMin((() => {
	init_markdown_preview();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_i18n();
	init_StatusPlaceholder();
	init_markdown_utils();
	import_jsx_runtime$6 = require_jsx_runtime();
	TextPreview = ({ url, fileName, loadingText = t("common.loading"), errorText = t("preview.error.loadFailed") }) => {
		const [content, setContent] = (0, import_react$9.useState)(null);
		const [loading, setLoading] = (0, import_react$9.useState)(true);
		const [error, setError] = (0, import_react$9.useState)(null);
		(0, import_react$9.useEffect)(() => {
			let mounted = true;
			const fetchText = async () => {
				setLoading(true);
				setError(null);
				try {
					const response = await fetch(url);
					if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
					const text = await response.text();
					if (mounted) setContent(text);
				} catch (err) {
					console.error("[TextPreview] Failed to fetch text:", err);
					if (mounted) setError(err instanceof Error ? err.message : String(err));
				} finally {
					if (mounted) setLoading(false);
				}
			};
			fetchText();
			return () => {
				mounted = false;
			};
		}, [url]);
		const language = (0, import_react$9.useMemo)(() => getHighlightLanguage(fileName), [fileName]);
		const highlightedHtml = (0, import_react$9.useMemo)(() => {
			if (content == null) return "";
			return highlightText(content, language);
		}, [content, language]);
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(StatusPlaceholder, {
			type: "loading",
			title: loadingText
		});
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(StatusPlaceholder, {
			type: "error",
			title: errorText,
			description: error
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "text-preview",
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("pre", {
				className: "text-preview__body hljs",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("code", {
					className: language ? `language-${language}` : "",
					dangerouslySetInnerHTML: { __html: highlightedHtml }
				})
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/components/FilePreviewPanel.tsx
/** 渲染预览内容（根据文件类型选择 Markdown / HTML / iframe / 文本高亮） */
function renderPreviewContent(file, t) {
	if (!file.downloadUrl) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(StatusPlaceholder, {
		type: "error",
		title: t("shareTaskPreview.previewFailed"),
		description: t("shareTaskPreview.previewFailedDesc", { fileName: file.fileName })
	});
	const previewUrl = file.previewUrl;
	if (isMarkdownFile(file.fileName)) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(MarkdownPreview, { url: previewUrl });
	if (isHtmlFile(file.fileName)) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(HtmlPreview, {
		url: file.downloadUrl,
		title: file.fileName,
		loadingText: t("common.loading"),
		errorText: t("preview.error.loadFailed")
	});
	if (isImageFile(file.fileName)) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ImagePreview, {
		url: file.downloadUrl,
		fileName: file.fileName,
		loadingText: t("common.loading"),
		errorText: t("preview.error.loadFailed")
	});
	if (isIframePreviewFile(file.fileName)) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PreviewIframe, {
		url: previewUrl,
		title: file.fileName,
		className: "stp-right__iframe",
		loadingText: t("common.loading"),
		errorText: t("preview.error.loadFailed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TextPreview, {
		url: previewUrl,
		fileName: file.fileName
	});
}
var import_jsx_runtime$5, FilePreviewPanel, FullscreenPreview;
var init_FilePreviewPanel = __esmMin((() => {
	require_react();
	init_useI18n();
	init_ua();
	init_HtmlPreview();
	init_ImagePreview();
	init_markdown_types();
	init_MarkdownPreview();
	init_TextPreview();
	init_PreviewIframe();
	init_StatusPlaceholder();
	import_jsx_runtime$5 = require_jsx_runtime();
	FilePreviewPanel = ({ file, style, isDownloading, onDownload, onFullscreen, onClose }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "stp-right",
			style,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "stp-right__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "stp-right__header-title",
					title: file.fileName,
					children: file.fileName
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "stp-right__header-actions",
					children: [
						!isWXMiniProgram() && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
							className: "stp-right__download-btn",
							onClick: onDownload,
							disabled: isDownloading,
							title: t("preview.download"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
									d: "M8 2v8M8 10l-3-3M8 10l3-3M3 13h10",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
							className: "stp-right__fullscreen-btn",
							onClick: onFullscreen,
							title: t("shareTaskPreview.fullscreen"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("polyline", { points: "15 3 21 3 21 9" }),
									/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("polyline", { points: "9 21 3 21 3 15" }),
									/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("line", {
										x1: "21",
										y1: "3",
										x2: "14",
										y2: "10"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("line", {
										x1: "3",
										y1: "21",
										x2: "10",
										y2: "14"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
							className: "stp-right__close-btn",
							onClick: onClose,
							title: t("shareTaskPreview.closePreview"),
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
									d: "M4 4l8 8M12 4l-8 8",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round"
								})
							})
						})
					]
				})]
			}), renderPreviewContent(file, t)]
		});
	};
	FullscreenPreview = ({ file, onClose }) => {
		const t = useTranslation();
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: "stp-fullscreen-overlay",
			onClick: onClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "stp-fullscreen-overlay__content",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
					className: "stp-fullscreen-overlay__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "stp-fullscreen-overlay__title",
						title: file.fileName,
						children: file.fileName
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
						className: "stp-fullscreen-overlay__close-btn",
						onClick: onClose,
						title: t("shareTaskPreview.exitFullscreen"),
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
							width: "18",
							height: "18",
							viewBox: "0 0 16 16",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
								d: "M4 4l8 8M12 4l-8 8",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round"
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
					className: "stp-fullscreen-overlay__body",
					children: renderPreviewContent(file, t)
				})]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/components/MessagePanel.tsx
function isToolCallPart(part) {
	return !!part && typeof part === "object" && part.type === "tool-call";
}
/** 根据文件名推断 MediaItem.contentType */
function getMediaContentType(name) {
	const ext = name.toLowerCase().split(".").pop() ?? "";
	if (["ppt", "pptx"].includes(ext)) return "presentation";
	if ([
		"xls",
		"xlsx",
		"csv"
	].includes(ext)) return "spreadsheet";
	if ([
		"doc",
		"docx",
		"pdf",
		"md",
		"txt"
	].includes(ext)) return "document";
	if ([
		"mp4",
		"webm",
		"mov",
		"avi"
	].includes(ext)) return "video";
	if ([
		"mp3",
		"wav",
		"ogg",
		"flac"
	].includes(ext)) return "audio";
	if ([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg"
	].includes(ext)) return "snapshot";
	return "code";
}
var import_react$7, import_jsx_runtime$4, HIDDEN_TOOL_NAMES, shareHiddenToolsExtension, SHOW_WIDGET_TOOL_NAMES, shareStaticWidgetExtension, SHARE_PREVIEW_EXTENSIONS, SHARE_EXPORT_EXTENSIONS, MessagePanel;
var init_MessagePanel = __esmMin((() => {
	init_theme();
	init_src$1();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_environment();
	init_artifact_slot_panel();
	init_visualizer_show_widget_payload();
	import_jsx_runtime$4 = require_jsx_runtime();
	HIDDEN_TOOL_NAMES = new Set([
		"enter_plan_mode",
		"EnterPlanMode",
		"exit_plan_mode",
		"ExitPlanMode",
		"ask_followup_question",
		"ask_user",
		"ask_user_question",
		"present_files",
		"PresentFiles"
	]);
	shareHiddenToolsExtension = {
		id: "share-preview:hidden-tools",
		converters: [{
			canHandle: (part) => isToolCallPart(part) && !!part.tool?.name && HIDDEN_TOOL_NAMES.has(part.tool.name),
			priority: 300,
			convert: () => []
		}]
	};
	SHOW_WIDGET_TOOL_NAMES = new Set([
		"show_widget",
		"visualizer:show_widget",
		"visualize:show_widget"
	]);
	shareStaticWidgetExtension = {
		id: "share-preview:static-widget",
		converters: [{
			canHandle: (part) => isToolCallPart(part) && !!part.tool?.name && SHOW_WIDGET_TOOL_NAMES.has(part.tool.name),
			priority: 400,
			convert: (part, context) => {
				const tool = part.tool;
				if (!tool) return [];
				const payload = parsePayload(tool);
				if (!payload.widget_code) return [];
				return [{
					id: `${context.messageId}-share-static-widget-${context.index}`,
					type: "share_static_widget",
					props: { widgetCode: payload.widget_code }
				}];
			}
		}],
		renderers: [{
			blockType: "share_static_widget",
			component: ({ block }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "stp-static-widget",
				"data-static-widget": true,
				dangerouslySetInnerHTML: { __html: block.props.widgetCode }
			})
		}]
	};
	SHARE_PREVIEW_EXTENSIONS = [shareHiddenToolsExtension];
	SHARE_EXPORT_EXTENSIONS = [shareHiddenToolsExtension, shareStaticWidgetExtension];
	MessagePanel = import_react$7.forwardRef(({ title, style, displayMessages, replayActive, isReplayCompleted, messagesRef, listApiRef, forExport = false, requestIdArtifactsMap, bottomArtifacts }, _ref) => {
		const t = useTranslation();
		/**
		* assistantMessageSlot：在每轮最后一条 assistant 消息下渲染产物卡片。
		* 与客户端行为对齐：卡片紧跟对应轮次消息，而不是堆在列表底部。
		*/
		const assistantMessageSlot = (0, import_react$7.useCallback)(({ requestId }) => {
			if (!forExport) return null;
			if (!requestIdArtifactsMap?.size) return null;
			const artifacts = requestIdArtifactsMap.get(requestId);
			if (!artifacts?.length) return null;
			const presentedArtifacts = artifacts.filter((a) => a.presented !== false);
			if (!presentedArtifacts.length) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				"data-inline-artifacts": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArtifactSlotPanel, {
					artifacts: presentedArtifacts.map((a) => ({
						id: a.path,
						sessionId: "",
						title: a.name,
						type: "media-artifact",
						category: "artifact",
						contentType: getMediaContentType(a.name),
						url: a.path,
						sourceTool: "PresentFiles"
					})),
					t,
					onSelect: () => void 0,
					onViewMore: () => void 0,
					onViewAllFiles: () => void 0
				})
			});
		}, [
			forExport,
			requestIdArtifactsMap,
			t
		]);
		const extensions = forExport ? SHARE_EXPORT_EXTENSIONS : SHARE_PREVIEW_EXTENSIONS;
		const finishedFooterSlotValue = forExport && requestIdArtifactsMap?.size ? assistantMessageSlot : void 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "stp-left",
			style,
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "stp-left__inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
					className: "stp-left__header",
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "stp-left__header-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "stp-left__title-row",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "stp-left__title",
								children: title
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: `stp-left__messages${replayActive ? " stp-left__messages--replay" : ""}`,
					ref: messagesRef,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							className: "stp-left__ai-disclaimer",
							children: t("shareTaskPreview.aiDisclaimer")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(CrConfigProvider, {
							theme: { mode: "dark" },
							className: "stp-left__cr-theme",
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(TaskChatList, {
								ref: listApiRef,
								messages: displayMessages,
								extensions,
								ui: {
									isStreaming: replayActive && !isReplayCompleted,
									maxContentWidth: 866,
									disableVirtualization: forExport,
									assistantDisplay: { name: getBrandName() },
									finishedFooterSlot: finishedFooterSlotValue
								}
							})
						}),
						forExport && bottomArtifacts && bottomArtifacts.length > 0 && (() => {
							const bottomItems = bottomArtifacts.map((a) => ({
								id: a.path,
								sessionId: "",
								title: a.name,
								type: "media-artifact",
								category: "artifact",
								contentType: getMediaContentType(a.name),
								url: a.path,
								sourceTool: "PresentFiles"
							}));
							const tBottom = (key, params) => {
								if (key === "artifactSlot.viewAll") return typeof params?.count === "number" && params.count > 0 ? `其他产物 (${params.count})` : "其他产物";
								return t(key, params);
							};
							return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								"data-bottom-artifacts": true,
								style: {
									marginTop: "12px",
									padding: "0 16px",
									marginBottom: "24px"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ArtifactSlotPanel, {
									artifacts: bottomItems,
									t: tBottom,
									onSelect: () => void 0,
									onViewMore: () => void 0,
									onViewAllFiles: () => void 0
								})
							});
						})()
					]
				})]
			})
		});
	});
	MessagePanel.displayName = "MessagePanel";
})), import_jsx_runtime$3, ReplayProgressBar;
var init_ReplayProgressBar = __esmMin((() => {
	require_react();
	init_useI18n();
	import_jsx_runtime$3 = require_jsx_runtime();
	ReplayProgressBar = ({ replayState, currentMessageStep, totalMessageSteps, onTogglePause, onSkip }) => {
		const t = useTranslation();
		const completed = replayState === "completed";
		const paused = replayState === "paused";
		const percent = totalMessageSteps > 0 ? currentMessageStep / totalMessageSteps * 100 : 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: `stp-replay-bar${completed ? " stp-replay-bar--completed" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "stp-replay-bar__progress",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: `stp-replay-bar__progress-fill${completed ? " stp-replay-bar__progress-fill--done" : ""}`,
					style: { width: `${percent}%` }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "stp-replay-bar__body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "stp-replay-bar__left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: `stp-replay-bar__spinner${paused ? " stp-replay-bar__spinner--paused" : ""}${completed ? " stp-replay-bar__spinner--completed" : ""}`,
						children: completed && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "3",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("polyline", { points: "20 6 9 17 4 12" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "stp-replay-bar__status",
						children: completed ? t("shareTaskPreview.replayStatusCompleted") : paused ? t("shareTaskPreview.replayStatusPaused", {
							current: currentMessageStep,
							total: totalMessageSteps
						}) : t("shareTaskPreview.replayStatusPlaying", {
							current: currentMessageStep,
							total: totalMessageSteps
						})
					})]
				}), !completed && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "stp-replay-bar__right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
						className: "stp-replay-bar__btn",
						onClick: onTogglePause,
						children: [paused ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("polygon", { points: "10 8 16 12 10 16 10 8" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
									cx: "12",
									cy: "12",
									r: "10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
									x1: "10",
									y1: "15",
									x2: "10",
									y2: "9"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
									x1: "14",
									y1: "15",
									x2: "14",
									y2: "9"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: paused ? t("shareTaskPreview.replayResume") : t("shareTaskPreview.replayPause") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
						className: "stp-replay-bar__btn",
						onClick: onSkip,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("polygon", { points: "5 4 15 12 5 20 5 4" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
								x1: "19",
								y1: "5",
								x2: "19",
								y2: "19"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { children: t("shareTaskPreview.replaySkip") })]
					})]
				})]
			})]
		});
	};
})), import_jsx_runtime$2, ResizeDivider;
var init_ResizeDivider = __esmMin((() => {
	require_react();
	import_jsx_runtime$2 = require_jsx_runtime();
	ResizeDivider = ({ onMouseDown, direction }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: `stp-resize-divider stp-resize-divider--${direction}`,
		onMouseDown,
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "stp-resize-divider__line" })
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/components/UserMessageNavigator.tsx
/**
* 收集所有可定位（带 requestId）的用户消息引用。
* TaskChatList 在 scenario 层维护 requestId → anchor 映射，core 不感知 requestId。
*/
function collectUserMessageRefs(messages) {
	const refs = [];
	for (let i = 0; i < messages.length; i += 1) {
		const msg = messages[i];
		if (msg?.messageType === "user" && typeof msg.requestId === "string" && msg.requestId.length > 0) refs.push({
			requestId: msg.requestId,
			msgIndex: i
		});
	}
	return refs;
}
var import_react$4, import_jsx_runtime$1, UserMessageNavigator;
var init_UserMessageNavigator = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	import_jsx_runtime$1 = require_jsx_runtime();
	UserMessageNavigator = ({ enhancedMessages, listApiRef }) => {
		const t = useTranslation();
		const userRefs = (0, import_react$4.useMemo)(() => collectUserMessageRefs(enhancedMessages), [enhancedMessages]);
		const [currentIdx, setCurrentIdx] = (0, import_react$4.useState)(-1);
		const scrollToRef = (0, import_react$4.useCallback)((targetIdx) => {
			const ref = userRefs[targetIdx];
			if (!ref) return;
			listApiRef.current?.scrollToRequest(ref.requestId, {
				behavior: "smooth",
				block: "start"
			});
			setCurrentIdx(targetIdx);
		}, [userRefs, listApiRef]);
		const handlePrev = (0, import_react$4.useCallback)(() => {
			scrollToRef(currentIdx < 0 ? userRefs.length - 1 : Math.max(0, currentIdx - 1));
		}, [
			currentIdx,
			userRefs.length,
			scrollToRef
		]);
		const handleNext = (0, import_react$4.useCallback)(() => {
			scrollToRef(currentIdx < 0 ? 0 : Math.min(userRefs.length - 1, currentIdx + 1));
		}, [
			currentIdx,
			userRefs.length,
			scrollToRef
		]);
		if (userRefs.length < 2) return null;
		const atFirst = currentIdx === 0;
		const atLast = currentIdx >= 0 && currentIdx >= userRefs.length - 1;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: "stp-mobile-nav-btn stp-mobile-nav-btn--up",
			onClick: handlePrev,
			disabled: atFirst,
			"aria-label": t("shareTaskPreview.prevUserMessage"),
			title: t("shareTaskPreview.prevUserMessage"),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
					d: "M4 10l4-4 4 4",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: "stp-mobile-nav-btn stp-mobile-nav-btn--down",
			onClick: handleNext,
			disabled: atLast,
			"aria-label": t("shareTaskPreview.nextUserMessage"),
			title: t("shareTaskPreview.nextUserMessage"),
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
					d: "M4 6l4 4 4-4",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})
		})] });
	};
	UserMessageNavigator.displayName = "UserMessageNavigator";
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/hooks/useColumnResize.ts
function useColumnResize(rightVisible) {
	const containerRef = (0, import_react$3.useRef)(null);
	const [leftWidth, setLeftWidth] = (0, import_react$3.useState)(null);
	const [middleWidth, setMiddleWidth] = (0, import_react$3.useState)(280);
	const [rightWidth, setRightWidth] = (0, import_react$3.useState)(null);
	const [isDragging, setIsDragging] = (0, import_react$3.useState)(false);
	const draggingRef = (0, import_react$3.useRef)(null);
	const startXRef = (0, import_react$3.useRef)(0);
	const startLeftWidthRef = (0, import_react$3.useRef)(0);
	const startMiddleWidthRef = (0, import_react$3.useRef)(0);
	const startRightWidthRef = (0, import_react$3.useRef)(0);
	const DIVIDER_TOTAL = (rightVisible ? 2 : 1) * DIVIDER_WIDTH;
	const getColumnWidths = (0, import_react$3.useCallback)(() => {
		if (!containerRef.current) return {
			left: 0,
			middle: middleWidth,
			right: 0
		};
		const total = containerRef.current.offsetWidth;
		if (!rightVisible) {
			const flexSpace = total - middleWidth - DIVIDER_TOTAL;
			return {
				left: leftWidth ?? flexSpace,
				middle: middleWidth,
				right: 0
			};
		}
		const flexSpace = total - middleWidth - DIVIDER_TOTAL;
		return {
			left: leftWidth ?? flexSpace / 2,
			middle: middleWidth,
			right: rightWidth ?? flexSpace / 2
		};
	}, [
		leftWidth,
		middleWidth,
		rightWidth,
		rightVisible,
		DIVIDER_TOTAL
	]);
	const handleMouseDown = (0, import_react$3.useCallback)((side, e) => {
		e.preventDefault();
		draggingRef.current = side;
		setIsDragging(true);
		startXRef.current = e.clientX;
		const widths = getColumnWidths();
		startLeftWidthRef.current = widths.left;
		startMiddleWidthRef.current = widths.middle;
		startRightWidthRef.current = widths.right;
	}, [getColumnWidths]);
	(0, import_react$3.useEffect)(() => {
		const handleMouseMove = (e) => {
			if (!draggingRef.current) return;
			const dx = e.clientX - startXRef.current;
			if (draggingRef.current === "left") {
				let newLeft = startLeftWidthRef.current + dx;
				let newMiddle = startMiddleWidthRef.current - dx;
				if (newLeft < MIN_LEFT_WIDTH) {
					newMiddle += newLeft - MIN_LEFT_WIDTH;
					newLeft = MIN_LEFT_WIDTH;
				}
				if (newMiddle < MIN_MIDDLE_WIDTH) {
					newLeft += newMiddle - MIN_MIDDLE_WIDTH;
					newMiddle = MIN_MIDDLE_WIDTH;
				}
				if (newLeft >= MIN_LEFT_WIDTH && newMiddle >= MIN_MIDDLE_WIDTH) {
					setLeftWidth(newLeft);
					setMiddleWidth(newMiddle);
				}
			} else {
				let newMiddle = startMiddleWidthRef.current + dx;
				let newRight = startRightWidthRef.current - dx;
				if (newMiddle < MIN_MIDDLE_WIDTH) {
					newRight += newMiddle - MIN_MIDDLE_WIDTH;
					newMiddle = MIN_MIDDLE_WIDTH;
				}
				if (newRight < MIN_RIGHT_WIDTH) {
					newMiddle += newRight - MIN_RIGHT_WIDTH;
					newRight = MIN_RIGHT_WIDTH;
				}
				if (newMiddle >= MIN_MIDDLE_WIDTH && newRight >= MIN_RIGHT_WIDTH) {
					setMiddleWidth(newMiddle);
					setRightWidth(newRight);
				}
			}
		};
		const handleMouseUp = () => {
			draggingRef.current = null;
			setIsDragging(false);
		};
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);
	(0, import_react$3.useEffect)(() => {
		if (!containerRef.current) {
			setLeftWidth(null);
			setRightWidth(null);
			return;
		}
		const total = containerRef.current.offsetWidth;
		const dividers = rightVisible ? 2 : 1;
		const available = total - middleWidth - dividers * DIVIDER_WIDTH;
		if (rightVisible) {
			const half = Math.floor(available / 2);
			setLeftWidth(Math.max(half, MIN_LEFT_WIDTH));
			setRightWidth(Math.max(available - half, MIN_RIGHT_WIDTH));
		} else {
			setLeftWidth(Math.max(available, MIN_LEFT_WIDTH));
			setRightWidth(null);
		}
	}, [rightVisible]);
	const lastTotalRef = (0, import_react$3.useRef)(0);
	const leftWidthRef = (0, import_react$3.useRef)(leftWidth);
	const rightWidthRef = (0, import_react$3.useRef)(rightWidth);
	const middleWidthRef = (0, import_react$3.useRef)(middleWidth);
	const rightVisibleRef = (0, import_react$3.useRef)(rightVisible);
	leftWidthRef.current = leftWidth;
	rightWidthRef.current = rightWidth;
	middleWidthRef.current = middleWidth;
	rightVisibleRef.current = rightVisible;
	(0, import_react$3.useEffect)(() => {
		const el = containerRef.current;
		if (!el || typeof ResizeObserver === "undefined") return;
		lastTotalRef.current = el.offsetWidth;
		const observer = new ResizeObserver((entries) => {
			if (draggingRef.current) return;
			const entry = entries[0];
			if (!entry) return;
			const newTotal = Math.round(entry.contentRect.width);
			if (newTotal === lastTotalRef.current || newTotal <= 0) return;
			lastTotalRef.current = newTotal;
			const curRightVisible = rightVisibleRef.current;
			const curMiddle = middleWidthRef.current;
			const curLeft = leftWidthRef.current;
			const curRight = rightWidthRef.current;
			const dividers = curRightVisible ? 2 : 1;
			const available = newTotal - curMiddle - dividers * DIVIDER_WIDTH;
			if (curRightVisible) if (curLeft != null && curRight != null && curLeft + curRight > 0) {
				const ratio = curLeft / (curLeft + curRight);
				let newLeft = Math.round(available * ratio);
				let newRight = available - newLeft;
				if (newLeft < MIN_LEFT_WIDTH) {
					newLeft = MIN_LEFT_WIDTH;
					newRight = Math.max(available - newLeft, MIN_RIGHT_WIDTH);
				}
				if (newRight < MIN_RIGHT_WIDTH) {
					newRight = MIN_RIGHT_WIDTH;
					newLeft = Math.max(available - newRight, MIN_LEFT_WIDTH);
				}
				setLeftWidth(newLeft);
				setRightWidth(newRight);
			} else {
				const half = Math.floor(available / 2);
				setLeftWidth(Math.max(half, MIN_LEFT_WIDTH));
				setRightWidth(Math.max(available - half, MIN_RIGHT_WIDTH));
			}
			else setLeftWidth(Math.max(available, MIN_LEFT_WIDTH));
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return {
		containerRef,
		leftStyle: leftWidth != null ? {
			width: leftWidth,
			flex: "none"
		} : {
			flex: 1,
			minWidth: 0
		},
		middleWidth,
		rightStyle: rightWidth != null ? {
			width: rightWidth,
			flex: "none"
		} : {
			flex: 1,
			minWidth: 0
		},
		isDragging,
		handleMouseDownLeft: (e) => handleMouseDown("left", e),
		handleMouseDownRight: (e) => handleMouseDown("right", e)
	};
}
var import_react$3, MIN_LEFT_WIDTH, MIN_MIDDLE_WIDTH, MIN_RIGHT_WIDTH, DIVIDER_WIDTH;
var init_useColumnResize = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	MIN_LEFT_WIDTH = 300;
	MIN_MIDDLE_WIDTH = 180;
	MIN_RIGHT_WIDTH = 300;
	DIVIDER_WIDTH = 5;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/hooks/useMessageAutoScroll.ts
function useMessageAutoScroll({ listApiRef, replayActive, replayIndex, messageCount }) {
	const hasScrolledToTopRef = (0, import_react$2.useRef)(false);
	const pendingScrollRef = (0, import_react$2.useRef)(null);
	const prevReplayActiveRef = (0, import_react$2.useRef)(replayActive);
	(0, import_react$2.useEffect)(() => {
		if (!replayActive || replayIndex === 0) return;
		const listApi = listApiRef.current;
		if (!listApi) return;
		if (pendingScrollRef.current != null) cancelAnimationFrame(pendingScrollRef.current);
		pendingScrollRef.current = requestAnimationFrame(() => {
			pendingScrollRef.current = null;
			listApi.scrollToBottom({
				behavior: "smooth",
				keepFollow: true
			});
		});
		return () => {
			if (pendingScrollRef.current != null) {
				cancelAnimationFrame(pendingScrollRef.current);
				pendingScrollRef.current = null;
			}
		};
	}, [
		listApiRef,
		replayIndex,
		replayActive
	]);
	(0, import_react$2.useEffect)(() => {
		const wasActive = prevReplayActiveRef.current;
		prevReplayActiveRef.current = replayActive;
		if (!wasActive || replayActive) return;
		const listApi = listApiRef.current;
		if (!listApi) return;
		const scrollToBottom = () => {
			listApi.scrollToBottom({ behavior: "auto" });
		};
		const timers = [];
		requestAnimationFrame(scrollToBottom);
		for (const delay of [
			50,
			150,
			300,
			500
		]) timers.push(setTimeout(scrollToBottom, delay));
		return () => {
			timers.forEach(clearTimeout);
		};
	}, [listApiRef, replayActive]);
	(0, import_react$2.useEffect)(() => {
		const listApi = listApiRef.current;
		if (!listApi || messageCount === 0) return;
		hasScrolledToTopRef.current = false;
		const scrollToTop = () => {
			listApi.scrollToTop({ behavior: "auto" });
		};
		const timers = [];
		const stopTime = Date.now() + 800;
		for (const delay of [
			50,
			150,
			300,
			500,
			800
		]) timers.push(setTimeout(() => {
			if (Date.now() < stopTime) scrollToTop();
			else hasScrolledToTopRef.current = true;
		}, delay));
		return () => {
			timers.forEach(clearTimeout);
		};
	}, [listApiRef, messageCount]);
}
/**
* 强制将消息容器滚到顶部（不经过 React 状态）。
* 用于回放开始时同步重置滚动位置。
*/
function scrollMessageContainerToTop(listApi) {
	listApi?.scrollToTop({ behavior: "auto" });
}
var import_react$2;
var init_useMessageAutoScroll = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/hooks/useReplayController.ts
/**
* 判断某个 content block 是否应该使用打字机效果展示。
*
* 仅对 **assistant 消息的 text block** 启用打字机。
*/
function isTypewriterBlock(block) {
	if (!block || typeof block !== "object") return false;
	if (block.type !== "text") return false;
	return (typeof block.text === "string" ? block.text : "").length >= TYPEWRITER_MIN_CHARS;
}
/**
* 将消息展开为回放步骤序列。
*
* 步骤结构：
*   { msgIndex, blockCount, charCount?, messageStep }
*   - msgIndex:    第几条消息
*   - blockCount:  当前已显示的 content block 数量
*   - charCount:   仅当最后一个 block 处于"打字中"时存在
*   - messageStep: 该 step 归属的"对话步骤"序号（从 1 开始），
*                  每条消息算 1 步（不被 block / 打字子步骤夸大）
*/
function buildReplaySteps(enhancedMessages) {
	const steps = [];
	const pushTypewriterSteps = (msgIndex, blockCount, fullText, ms) => {
		const total = fullText.length;
		for (let c = TYPEWRITER_CHARS_PER_STEP; c < total; c += TYPEWRITER_CHARS_PER_STEP) steps.push({
			msgIndex,
			blockCount,
			charCount: c,
			messageStep: ms
		});
		steps.push({
			msgIndex,
			blockCount,
			messageStep: ms
		});
	};
	for (let i = 0; i < enhancedMessages.length; i++) {
		const msg = enhancedMessages[i];
		const content = Array.isArray(msg.content) ? msg.content : [];
		const messageStep = i + 1;
		if (content.length === 0) {
			steps.push({
				msgIndex: i,
				blockCount: 1,
				messageStep
			});
			continue;
		}
		if (msg.messageType === "user") {
			steps.push({
				msgIndex: i,
				blockCount: content.length,
				messageStep
			});
			continue;
		}
		for (let b = 1; b <= content.length; b++) {
			const block = content[b - 1];
			if (isTypewriterBlock(block)) pushTypewriterSteps(i, b, block.text, messageStep);
			else steps.push({
				msgIndex: i,
				blockCount: b,
				messageStep
			});
		}
	}
	return steps;
}
function useReplayController({ enhancedMessages, onStart }) {
	const [replayState, setReplayState] = (0, import_react$1.useState)("idle");
	const [replayIndex, setReplayIndex] = (0, import_react$1.useState)(0);
	const replayTimerRef = (0, import_react$1.useRef)(null);
	const replayStateRef = (0, import_react$1.useRef)("idle");
	const replayIndexRef = (0, import_react$1.useRef)(0);
	(0, import_react$1.useEffect)(() => {
		replayStateRef.current = replayState;
	}, [replayState]);
	(0, import_react$1.useEffect)(() => {
		replayIndexRef.current = replayIndex;
	}, [replayIndex]);
	const replayActive = replayState !== "idle";
	const replaySteps = (0, import_react$1.useMemo)(() => buildReplaySteps(enhancedMessages), [enhancedMessages]);
	const totalSteps = replaySteps.length;
	const totalMessageSteps = enhancedMessages.length;
	const currentMessageStep = (0, import_react$1.useMemo)(() => {
		if (replayIndex <= 0) return 0;
		if (replayIndex >= replaySteps.length) return totalMessageSteps;
		return replaySteps[replayIndex - 1].messageStep;
	}, [
		replayIndex,
		replaySteps,
		totalMessageSteps
	]);
	const currentReplayMsgIndex = (0, import_react$1.useMemo)(() => {
		if (!replayActive || replayIndex <= 0) return -1;
		if (replayIndex >= replaySteps.length) return enhancedMessages.length - 1;
		return replaySteps[replayIndex - 1].msgIndex;
	}, [
		replayActive,
		replayIndex,
		replaySteps,
		enhancedMessages.length
	]);
	const scheduleNextMessage = (0, import_react$1.useCallback)(() => {
		if (replayStateRef.current !== "playing") return;
		const idx = replayIndexRef.current;
		if (idx >= totalSteps) {
			setReplayState("completed");
			replayTimerRef.current = setTimeout(() => {
				if (replayStateRef.current === "completed") {
					setReplayState("idle");
					setReplayIndex(0);
				}
			}, 300);
			return;
		}
		const step = replaySteps[idx];
		const msg = enhancedMessages[step.msgIndex];
		const isAI = msg.messageType === "assistant";
		const isBlockStep = isAI && Array.isArray(msg.content) && step.blockCount < msg.content.length;
		const nextStep = replaySteps[idx + 1];
		const isTypingStep = step.charCount !== void 0 || nextStep && nextStep.msgIndex === step.msgIndex && nextStep.blockCount === step.blockCount && nextStep.charCount !== void 0;
		let delay;
		if (idx === 0) delay = 320;
		else if (isTypingStep) delay = TYPEWRITER_STEP_DELAY;
		else if (isBlockStep) delay = 340;
		else if (isAI) delay = 420;
		else delay = 320;
		replayTimerRef.current = setTimeout(() => {
			setReplayIndex((prev) => prev + 1);
			scheduleNextMessage();
		}, delay);
	}, [
		totalSteps,
		replaySteps,
		enhancedMessages
	]);
	const startReplay = (0, import_react$1.useCallback)(() => {
		if (replayState === "playing" || replayState === "paused") return;
		onStart?.();
		setReplayIndex(0);
		replayIndexRef.current = 0;
		setReplayState("playing");
		replayStateRef.current = "playing";
		setTimeout(() => scheduleNextMessage(), 50);
	}, [
		replayState,
		scheduleNextMessage,
		onStart
	]);
	const togglePause = (0, import_react$1.useCallback)(() => {
		if (replayState === "playing") {
			setReplayState("paused");
			if (replayTimerRef.current) {
				clearTimeout(replayTimerRef.current);
				replayTimerRef.current = null;
			}
		} else if (replayState === "paused") {
			setReplayState("playing");
			replayStateRef.current = "playing";
			scheduleNextMessage();
		}
	}, [replayState, scheduleNextMessage]);
	const skip = (0, import_react$1.useCallback)(() => {
		if (replayTimerRef.current) {
			clearTimeout(replayTimerRef.current);
			replayTimerRef.current = null;
		}
		setReplayIndex(totalSteps);
		setReplayState("completed");
		replayTimerRef.current = setTimeout(() => {
			if (replayStateRef.current === "completed") {
				setReplayState("idle");
				setReplayIndex(0);
			}
		}, 300);
	}, [totalSteps]);
	(0, import_react$1.useEffect)(() => () => {
		if (replayTimerRef.current) clearTimeout(replayTimerRef.current);
	}, []);
	return {
		replayState,
		replayActive,
		replayIndex,
		currentReplayMsgIndex,
		currentMessageStep,
		totalMessageSteps,
		displayMessages: (0, import_react$1.useMemo)(() => {
			if (!replayActive) return enhancedMessages;
			if (replayIndex === 0) return [];
			if (replayIndex >= totalSteps) return enhancedMessages;
			const step = replaySteps[replayIndex - 1];
			const fullMessages = enhancedMessages.slice(0, step.msgIndex);
			const currentMsg = enhancedMessages[step.msgIndex];
			if (!currentMsg) return fullMessages;
			if (!Array.isArray(currentMsg.content)) {
				fullMessages.push(currentMsg);
				return fullMessages;
			}
			const visibleBlocks = currentMsg.content.slice(0, step.blockCount);
			if (visibleBlocks.length > 0 && step.charCount !== void 0) {
				const lastIdx = visibleBlocks.length - 1;
				const lastBlock = visibleBlocks[lastIdx];
				if (lastBlock && typeof lastBlock === "object" && typeof lastBlock.text === "string") {
					const fullText = lastBlock.text;
					visibleBlocks[lastIdx] = {
						...lastBlock,
						text: fullText.slice(0, step.charCount)
					};
				}
			}
			fullMessages.push({
				...currentMsg,
				content: visibleBlocks
			});
			return fullMessages;
		}, [
			replayActive,
			replayIndex,
			totalSteps,
			replaySteps,
			enhancedMessages
		]),
		startReplay,
		togglePause,
		skip
	};
}
var import_react$1, TYPEWRITER_CHARS_PER_STEP, TYPEWRITER_STEP_DELAY, TYPEWRITER_MIN_CHARS;
var init_useReplayController = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	TYPEWRITER_CHARS_PER_STEP = 3;
	TYPEWRITER_STEP_DELAY = 28;
	TYPEWRITER_MIN_CHARS = 6;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/utils/file-change.ts
/**
* 从消息的工具调用中提取文件变更信息（按 filePath 索引）
*/
function extractFileChangeMap(messages) {
	const changeMap = /* @__PURE__ */ new Map();
	for (const msg of messages) {
		if (msg.messageType !== "assistant" || !Array.isArray(msg.content)) continue;
		for (const block of msg.content) {
			if (block.type !== "tool-call" || !block.tool) continue;
			const { name, args, result } = block.tool;
			if ((name === "write_to_file" || name === "replace_in_file") && args?.filePath && result?.success) {
				const filePath = args._rawInput?.filePath || args.filePath;
				if (changeMap.has(filePath)) {
					const existing = changeMap.get(filePath);
					const r = result.result || {};
					existing.addLines += r.addLineCount ?? 0;
					existing.removeLines += r.removedLines ?? 0;
					existing.content = args._rawInput?.content || args.content || "";
					continue;
				}
				const r = result.result || {};
				changeMap.set(filePath, {
					addLines: r.addLineCount ?? 0,
					removeLines: r.removedLines ?? 0,
					content: args._rawInput?.content || args.content || "",
					isNewFile: !!r.isNewFile
				});
			}
		}
	}
	return changeMap;
}
/**
* 将 artifacts 合并为内部使用的 MergedFileItem 列表。
*/
function mergeFileItems(artifacts, messages) {
	const changeMap = extractFileChangeMap(messages);
	return artifacts.map((artifact) => {
		const change = changeMap.get(artifact.path);
		return {
			fileName: artifact.name,
			filePath: artifact.path,
			downloadUrl: artifact.downloadUrl,
			previewUrl: artifact.previewUrl,
			contentType: artifact.contentType,
			addLines: change?.addLines ?? 0,
			removeLines: change?.removeLines ?? 0,
			content: change?.content ?? "",
			isNewFile: change?.isNewFile ?? true,
			size: artifact.size
		};
	});
}
/**
* 计算每个 artifact 文件路径**首次出现**在消息序列中的 msgIndex。
*
* 用于重放过程中渐进式展示产物列表：消息回放推进到某条消息时，
* 只展示 firstMsgIndex ≤ 当前消息 index 的文件。
*
* 匹配策略（用文件名 basename 做关联，不依赖路径）：
* 1. artifact 的路径通常是 COS 存储路径（如 `.share/conversations/.../xxx.docx`），
*    与 tool-call 中的本地路径（如 `/Users/.../xxx.docx`）不完全相同，
*    但文件名一致。因此用 basename 做关联最稳妥。
* 2. 扫描所有 assistant 消息的 tool-call：把 tool.args 序列化后的字符串
*    视为该步的"操作证据"。若字符串中包含某 artifact 的 basename，
*    则认为该消息"涉及/产生了"该产物。覆盖了：
*      - write_to_file / replace_in_file 在 args.filePath 中显式指向产物
*      - execute_command 在 args.command 中运行脚本 / 生成文件
*      - use_skill / 其他工具的间接生成
* 3. 仅在工具 result.success === true 时记录，避免失败的调用导致误判。
*
* 对 artifacts 中从未被任何 tool-call 提及的文件（罕见：例如用户直接上传），
* 不出现在返回 Map 中；调用方视为"回放起始即可见"。
*/
function computeFileFirstMsgIndex(messages, artifacts) {
	const result = /* @__PURE__ */ new Map();
	if (artifacts.length === 0 || messages.length === 0) return result;
	const candidates = artifacts.map((a) => {
		const lastSlash = a.path.lastIndexOf("/");
		const basename = lastSlash >= 0 ? a.path.slice(lastSlash + 1) : a.path;
		return {
			path: a.path,
			name: a.name,
			basename
		};
	});
	for (let i = 0; i < messages.length; i++) {
		const msg = messages[i];
		if (msg.messageType !== "assistant" || !Array.isArray(msg.content)) continue;
		let searchable = "";
		for (const block of msg.content) {
			if (!block || typeof block !== "object") continue;
			if (block.type === "reasoning" || block.type === "text") {
				if (typeof block.text === "string") searchable += " " + block.text;
				continue;
			}
			if (block.type !== "tool-call" || !block.tool) continue;
			const r = block.tool.result;
			if (!r?.success) continue;
			try {
				searchable += " " + JSON.stringify(block.tool.args ?? {});
				searchable += " " + JSON.stringify(r.result ?? {});
				if (block.tool.metaData) searchable += " " + JSON.stringify(block.tool.metaData);
			} catch {}
		}
		if (!searchable) continue;
		for (const c of candidates) {
			if (result.has(c.path)) continue;
			if (c.basename && searchable.includes(c.basename)) {
				result.set(c.path, i);
				continue;
			}
			if (c.name && c.name !== c.basename && searchable.includes(c.name)) result.set(c.path, i);
		}
	}
	return result;
}
var init_file_change = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/components/share-preview/task/task-preview.tsx
var import_react, import_jsx_runtime, ShareTaskPreview;
//#endregion
__esmMin((() => {
	init_task_preview$1();
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_is_mobile_ua();
	init_FileList();
	init_FilePreviewPanel();
	init_MessagePanel();
	init_ReplayProgressBar();
	init_ResizeDivider();
	init_UserMessageNavigator();
	init_useColumnResize();
	init_useMessageAutoScroll();
	init_useReplayController();
	init_file_change();
	init_message_transforms();
	import_jsx_runtime = require_jsx_runtime();
	ShareTaskPreview = import_react.forwardRef(({ name, messages: rawMessages, artifacts, forExport = false, requestIdArtifactsMap, bottomArtifacts }, ref) => {
		const messages = rawMessages;
		const t = useTranslation();
		const fileItems = (0, import_react.useMemo)(() => mergeFileItems(artifacts, messages), [artifacts, messages]);
		const [selectedFileIdx, setSelectedFileIdx] = (0, import_react.useState)(-1);
		const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
		const [isDownloading, setIsDownloading] = (0, import_react.useState)(false);
		const [mobileDrawerOpen, setMobileDrawerOpen] = (0, import_react.useState)(false);
		const rightVisible = selectedFileIdx >= 0;
		const enhancedMessages = (0, import_react.useMemo)(() => normalizeMessages(messages), [messages]);
		const messagesRef = (0, import_react.useRef)(null);
		const listApiRef = (0, import_react.useRef)(null);
		const replay = useReplayController({
			enhancedMessages,
			onStart: () => {
				setSelectedFileIdx(-1);
				setIsFullscreen(false);
				setMobileDrawerOpen(false);
				scrollMessageContainerToTop(listApiRef.current);
			}
		});
		useMessageAutoScroll({
			listApiRef,
			replayActive: replay.replayActive,
			replayIndex: replay.replayIndex,
			messageCount: messages.length
		});
		const { containerRef, leftStyle, middleWidth, rightStyle, isDragging, handleMouseDownLeft, handleMouseDownRight } = useColumnResize(rightVisible);
		const fileFirstMsgIndex = (0, import_react.useMemo)(() => computeFileFirstMsgIndex(enhancedMessages, fileItems.map((f) => ({
			path: f.filePath,
			name: f.fileName
		}))), [enhancedMessages, fileItems]);
		const visibleFileItems = (0, import_react.useMemo)(() => {
			if (!replay.replayActive) return fileItems;
			return fileItems.filter((fi) => {
				const firstIdx = fileFirstMsgIndex.get(fi.filePath);
				if (firstIdx === void 0) return true;
				return firstIdx <= replay.currentReplayMsgIndex;
			});
		}, [
			replay.replayActive,
			replay.currentReplayMsgIndex,
			fileItems,
			fileFirstMsgIndex
		]);
		const selectedFile = fileItems[selectedFileIdx] || null;
		const handleSelectFile = (0, import_react.useCallback)((idx) => {
			setSelectedFileIdx(idx);
		}, []);
		const handleDownload = (0, import_react.useCallback)(async () => {
			if (!selectedFile?.downloadUrl) {
				toast.error(t("preview.downloadNotAvailable"));
				return;
			}
			setIsDownloading(true);
			try {
				window.open(selectedFile.downloadUrl);
			} catch {
				toast.error(t("preview.downloadFailed"));
			} finally {
				setIsDownloading(false);
			}
		}, [selectedFile, t]);
		(0, import_react.useImperativeHandle)(ref, () => ({
			startReplay: () => replay.startReplay(),
			replayState: replay.replayState
		}), [replay.startReplay, replay.replayState]);
		const conversationTitle = name || "";
		const handleClosePreview = (0, import_react.useCallback)(() => {
			setSelectedFileIdx(-1);
		}, []);
		const handleCloseMobileDrawer = (0, import_react.useCallback)(() => {
			setMobileDrawerOpen(false);
			setSelectedFileIdx(-1);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stp-container" + (isDragging ? " stp-container--dragging" : "") + (IS_MOBILE_UA ? " stp-container--mobile-ua" : "") + (mobileDrawerOpen ? " stp-container--drawer-open" : ""),
			ref: containerRef,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagePanel, {
					title: conversationTitle,
					style: leftStyle,
					displayMessages: forExport ? enhancedMessages : replay.displayMessages,
					replayActive: forExport ? false : replay.replayActive,
					isReplayCompleted: forExport ? false : replay.replayState === "completed",
					messagesRef,
					listApiRef,
					forExport,
					requestIdArtifactsMap: forExport ? requestIdArtifactsMap : void 0,
					bottomArtifacts: forExport ? bottomArtifacts : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `stp-mobile-drawer${mobileDrawerOpen ? " stp-mobile-drawer--open" : ""}`,
					role: "dialog",
					"aria-hidden": !mobileDrawerOpen,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stp-mobile-drawer__header",
							children: [
								rightVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "stp-mobile-drawer__back-btn",
									onClick: handleClosePreview,
									"aria-label": t("shareTaskPreview.backToArtifacts"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 16 16",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M10 12L6 8l4-4",
											stroke: "currentColor",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stp-mobile-drawer__title",
									children: rightVisible ? selectedFile?.fileName ?? t("preview.artifacts") : t("preview.artifacts")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "stp-mobile-drawer__close-btn",
									onClick: handleCloseMobileDrawer,
									"aria-label": t("shareTaskPreview.closeDrawer"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 16 16",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M4 4l8 8M12 4l-8 8",
											stroke: "currentColor",
											strokeWidth: "1.5",
											strokeLinecap: "round"
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeDivider, {
							direction: "left",
							onMouseDown: handleMouseDownLeft
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileList, {
							visibleFileItems,
							allFileItems: fileItems,
							selectedFileIdx,
							onSelectFile: handleSelectFile,
							replayActive: replay.replayActive,
							width: middleWidth
						}),
						rightVisible && selectedFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizeDivider, {
							direction: "right",
							onMouseDown: handleMouseDownRight
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewPanel, {
							file: selectedFile,
							style: rightStyle,
							isDownloading,
							onDownload: handleDownload,
							onFullscreen: () => setIsFullscreen(true),
							onClose: handleClosePreview
						})] })
					]
				}),
				!forExport && !mobileDrawerOpen && !replay.replayActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMessageNavigator, {
					enhancedMessages,
					listApiRef
				}),
				!forExport && fileItems.length > 0 && !mobileDrawerOpen && !replay.replayActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "stp-mobile-fab stp-mobile-fab--icon-only",
					onClick: () => setMobileDrawerOpen(true),
					"aria-label": t("shareTaskPreview.viewArtifacts"),
					title: t("shareTaskPreview.viewArtifacts"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "20",
						height: "20",
						viewBox: "0 0 20 20",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M3 6.5a1.5 1.5 0 0 1 1.5-1.5h3.086a1.5 1.5 0 0 1 1.06.44l1.122 1.121a1.5 1.5 0 0 0 1.06.439H15.5A1.5 1.5 0 0 1 17 8.5v6A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5v-8z",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinejoin: "round"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "stp-mobile-fab__count",
						children: fileItems.length
					})]
				}),
				mobileDrawerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stp-mobile-drawer-mask",
					onClick: handleCloseMobileDrawer,
					"aria-hidden": "true"
				}),
				isFullscreen && selectedFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullscreenPreview, {
					file: selectedFile,
					onClose: () => setIsFullscreen(false)
				}),
				!forExport && replay.replayActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReplayProgressBar, {
					replayState: replay.replayState,
					currentMessageStep: replay.currentMessageStep,
					totalMessageSteps: replay.totalMessageSteps,
					onTogglePause: replay.togglePause,
					onSkip: replay.skip
				})
			]
		});
	});
	ShareTaskPreview.displayName = "ShareTaskPreview";
}))();
export { ShareTaskPreview, ShareTaskPreview as default };
