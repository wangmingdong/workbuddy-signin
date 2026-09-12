import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Vn as LoadingDots, ps as defaultIconProvider, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { t as init_src$1 } from "./src-BNWvGoZP.js";
import { c as ArdotFileIcon } from "./useZoomControl-D-fnH4U0.js";
import { t as init_foundation } from "./foundation-QOglV606.js";
import { A as WbFileSlideIcon, Cr as init_ArtifactFileTypeIcon, D as WbFileVideoIcon, Er as AgentMailIcon, F as WbFileHtmlIcon, L as WbFileDocIcon, M as WbFilePdfIcon, N as WbFileMarkdownIcon, O as WbFileUnknownIcon, P as WbFileImageIcon, R as WbFileDiagramIcon, Sr as ArtifactFileTypeIcon, X as init_TencentLexiangSourceIcon, Y as TencentLexiangSourceIcon, dr as init_ChatBubbleIcon, j as WbFileSheetIcon, k as WbFileTxtIcon, n as init_icons, nt as init_TencentDocsSourceIcon, tt as TencentDocsSourceIcon, ur as ChatBubbleIcon, vn as ImaSourceIcon, yn as init_ImaSourceIcon, z as WbFileAudioIcon } from "./icons-Cj3UopO9.js";
import { t as getArtifactFileIconKind } from "./ArtifactFileIconTypes-mWPconF_.js";
import { G as GithubIcon, J as FigmaIcon$1, W as GongfengIcon, dt as CloudFilesIcon, r as init_icons$1, tt as CnbIcon, w as SkillIcon } from "./oauth-callback-IQ0UCaVX.js";
import { a as getFileIcon } from "./file-utils-BzZ2uFuU.js";
import { t as init_shared } from "./shared-C5jh3XCw.js";
//#region ../../packages/agent-ui/src/components/workspace-preparing/styles.scss
var init_styles = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/assets/mascot-new.png
var mascot_new_default;
var init_mascot_new = __esmMin((() => {
	mascot_new_default = "" + new URL("mascot-new-0kxfQU7k.png", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/components/workspace-preparing/index.tsx
var import_react$4, import_jsx_runtime$3, WorkspacePreparing;
var init_workspace_preparing = __esmMin((() => {
	init_styles();
	init_src();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_mascot_new();
	import_jsx_runtime$3 = require_jsx_runtime();
	WorkspacePreparing = ({ title = "Preparing your workspace", description = "This usually takes about 5 seconds for the first time.", showProgress = true, progress, className = "", visible = true, onExited }) => {
		const [animatedProgress, setAnimatedProgress] = (0, import_react$4.useState)(0);
		const [shouldRender, setShouldRender] = (0, import_react$4.useState)(visible);
		const [animationState, setAnimationState] = (0, import_react$4.useState)("entering");
		const onExitedRef = (0, import_react$4.useRef)(onExited);
		const prevVisibleRef = (0, import_react$4.useRef)(void 0);
		const isExitingRef = (0, import_react$4.useRef)(false);
		(0, import_react$4.useEffect)(() => {
			onExitedRef.current = onExited;
		}, [onExited]);
		(0, import_react$4.useEffect)(() => {
			if (prevVisibleRef.current === visible) return;
			const prevVisible = prevVisibleRef.current;
			prevVisibleRef.current = visible;
			if (visible) {
				isExitingRef.current = false;
				setShouldRender(true);
				setAnimationState("entering");
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						if (!isExitingRef.current) setAnimationState("entered");
					});
				});
			} else if (prevVisible !== void 0) {
				isExitingRef.current = true;
				setAnimationState("exiting");
				const timer = setTimeout(() => {
					setShouldRender(false);
					onExitedRef.current?.();
				}, 350);
				return () => clearTimeout(timer);
			}
		}, [visible]);
		const handleTransitionEnd = (e) => {
			if (e.propertyName === "opacity" && animationState === "exiting") {
				setShouldRender(false);
				onExitedRef.current?.();
			}
		};
		(0, import_react$4.useEffect)(() => {
			if (progress !== void 0) {
				setAnimatedProgress(progress);
				return;
			}
			let currentProgress = 0;
			const interval = setInterval(() => {
				currentProgress += Math.random() * 3;
				if (currentProgress > 85) currentProgress = 85;
				setAnimatedProgress(currentProgress);
			}, 200);
			return () => clearInterval(interval);
		}, [progress]);
		if (!shouldRender) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: `workspace-preparing ${animationState === "entering" ? "workspace-preparing--entering" : animationState === "exiting" ? "workspace-preparing--exiting" : ""} ${className}`,
			onTransitionEnd: handleTransitionEnd,
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "workspace-preparing__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "workspace-preparing__icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
							src: mascot_new_default,
							alt: "Workspace Robot",
							style: {
								width: 125,
								height: 120
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("h2", {
						className: "workspace-preparing__title",
						children: [title, /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(LoadingDots, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
						className: "workspace-preparing__description",
						children: description
					}),
					showProgress && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "workspace-preparing__progress",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "workspace-preparing__progress-track",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
								className: "workspace-preparing__progress-bar",
								style: { width: `${animatedProgress}%` }
							})
						})
					})
				]
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/icons/icon-protocol.ts
var IconType;
var init_icon_protocol = __esmMin((() => {
	IconType = /* @__PURE__ */ function(IconType) {
		IconType["SVG"] = "svg";
		IconType["VSCODE"] = "vscode";
		return IconType;
	}({});
})), import_jsx_runtime$2, FolderIcon, FigmaIcon, AgentIcon, FileIcon, AttachmentIcon, WbAddIcon, DefaultCustomIcon;
var init_svg_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$2 = require_jsx_runtime();
	FolderIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		width: "16",
		height: "17",
		viewBox: "0 0 16 17",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			d: "M3.5 5C3.5 4.72386 3.71208 4.5 3.97368 4.5H6.81579L8 6H12.0263C12.2879 6 12.5 6.22385 12.5 6.5V12C12.5 12.2761 12.2879 12.5 12.0263 12.5H3.97368C3.71208 12.5 3.5 12.2761 3.5 12V5Z",
			stroke: "currentColor",
			strokeWidth: "0.975",
			strokeLinejoin: "round"
		})
	});
	FigmaIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M5.87848 14.4067C7.04981 14.4067 8.00048 13.45 8.00048 12.2713V10.136H5.87848C4.70848 10.136 3.75781 11.092 3.75781 12.2713C3.75781 13.4507 4.70848 14.4067 5.87848 14.4067Z",
				fill: "#00E676"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M3.75781 8.00008C3.75781 6.82141 4.70848 5.86475 5.87848 5.86475H8.00048V10.1361H5.87848C4.70848 10.1361 3.75781 9.17941 3.75781 8.00008Z",
				fill: "#7C4DFF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M3.75781 3.72926C3.75781 2.55059 4.70848 1.59326 5.87848 1.59326H8.00048V5.86459H5.87848C4.70848 5.86459 3.75781 4.90793 3.75781 3.72926Z",
				fill: "#F4511E"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M8 1.59326H10.1213C11.292 1.59326 12.2427 2.55059 12.2427 3.72926C12.2427 4.90793 11.292 5.86459 10.1213 5.86459H8V1.59326Z",
				fill: "#FF8A65"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M12.2427 8.00008C12.2427 9.17941 11.292 10.1361 10.1213 10.1361C8.95067 10.1361 8 9.17941 8 8.00008C8 6.82075 8.95067 5.86475 10.1213 5.86475C11.292 5.86475 12.2427 6.82141 12.2427 8.00008Z",
				fill: "#29B6F6"
			})
		]
	});
	AgentIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "12",
		height: "13",
		viewBox: "0 0 12 13",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			d: "M9.13818 4.15137C9.35715 4.15134 9.56997 4.186 9.76904 4.24902C9.96819 4.31209 10.1551 4.40408 10.3247 4.52051C10.6647 4.754 10.9352 5.0843 11.0981 5.47461C11.2065 5.73404 11.2671 6.02086 11.2671 6.32031C11.2671 6.54495 11.233 6.76288 11.1704 6.9668C11.1077 7.17082 11.016 7.36226 10.9009 7.53516C10.67 7.88152 10.3447 8.15518 9.96338 8.31934C9.71001 8.42833 9.43059 8.48925 9.13916 8.48926H9.13818C8.98452 8.48927 8.83439 8.47303 8.68896 8.44336L8.54541 8.40918C8.35528 8.35763 8.17182 8.28237 7.99463 8.18848C7.63777 7.99892 7.31116 7.7389 6.99072 7.43555C6.88445 7.33476 6.77968 7.23055 6.67627 7.12305L6.36768 6.79199L6.3667 6.79004C6.3655 6.7887 6.3635 6.78703 6.36182 6.78516C6.26964 6.6826 6.13839 6.62338 6.00049 6.62305C5.86261 6.62276 5.73083 6.68107 5.63818 6.7832L5.60303 6.82227C5.23596 7.22416 4.87159 7.59394 4.47021 7.8916C4.29962 8.01782 4.12514 8.12879 3.94385 8.21973L3.76025 8.30371C3.47945 8.42069 3.17692 8.48952 2.86084 8.48926C2.64187 8.48928 2.42905 8.45462 2.22998 8.3916C2.03086 8.32854 1.84388 8.23653 1.67432 8.12012C1.33438 7.88663 1.06384 7.55621 0.900879 7.16602C0.792544 6.90658 0.731882 6.61977 0.731934 6.32031L0.73877 6.15332C0.751208 5.98773 0.781634 5.82683 0.828613 5.67383C0.891294 5.46972 0.98295 5.27843 1.09814 5.10547C1.32901 4.759 1.65424 4.48548 2.03564 4.32129C2.28914 4.21218 2.56915 4.15132 2.86084 4.15137C3.01451 4.15134 3.16462 4.1676 3.31006 4.19727L3.45361 4.23145C3.64381 4.28301 3.82735 4.35828 4.00439 4.45215C4.36125 4.6417 4.68786 4.90172 5.0083 5.20508V5.2041C5.22037 5.40518 5.42528 5.62116 5.62939 5.8457V5.84668C5.63011 5.84748 5.63109 5.84823 5.63232 5.84961C5.63354 5.85097 5.63539 5.85345 5.63721 5.85547C5.7294 5.95801 5.86065 6.01628 5.99854 6.0166C6.13658 6.01686 6.26821 5.9588 6.36084 5.85645L6.396 5.81836C6.7631 5.4164 7.12739 5.04672 7.52881 4.74902L7.52783 4.74805C7.75542 4.57962 7.99066 4.43908 8.23877 4.33594H8.23975C8.45018 4.24833 8.6726 4.18853 8.90381 4.16406L9.13818 4.15137Z",
			stroke: "currentColor",
			strokeWidth: "0.975",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	FileIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "12",
		height: "13",
		viewBox: "0 0 12 13",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M1.875 2.375C1.875 1.96079 2.21079 1.625 2.625 1.625L7.00463 1.625C7.10457 1.625 7.20037 1.66489 7.27078 1.73583L10.0162 4.50175C10.0859 4.57199 10.125 4.66695 10.125 4.76592V10.625C10.125 11.0392 9.78921 11.375 9.375 11.375H2.625C2.21079 11.375 1.875 11.0392 1.875 10.625V2.375Z",
				stroke: "currentColor",
				strokeWidth: "0.975"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M3.6626 5.67969H5.34439",
				stroke: "currentColor",
				strokeWidth: "0.975",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M3.6626 8.33594H6.92304",
				stroke: "currentColor",
				strokeWidth: "0.975",
				strokeLinecap: "round"
			})
		]
	});
	AttachmentIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", { d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" })
	});
	WbAddIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.5 1.49597)",
			d: "M7.165 7.165L7.165 13L5.835 13L5.835 7.165L0 7.165L0 5.835L5.835 5.835L5.835 0L7.165 0L7.165 5.835L13 5.835L13 7.165L7.165 7.165Z",
			fillRule: "evenodd"
		})
	});
	DefaultCustomIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		...props,
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
				cx: "7",
				cy: "7",
				r: "5.5",
				stroke: "currentColor",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M7 4V10",
				stroke: "currentColor",
				strokeWidth: "1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M4 7H10",
				stroke: "currentColor",
				strokeWidth: "1",
				strokeLinecap: "round"
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/icons/icon.tsx
/**
* Icon 组件
* @param name - 图标名称
* @param type - 图标类型，默认为 SVG
*/
function Icon({ name, type = IconType.SVG }) {
	const SvgIcon = name in SvgIconMap ? SvgIconMap[name] : void 0;
	if (SvgIcon) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgIcon, {});
}
var import_jsx_runtime$1, SvgIconMap, SvgIconName;
var init_icon = __esmMin((() => {
	require_react();
	init_icon_protocol();
	init_svg_icons();
	import_jsx_runtime$1 = require_jsx_runtime();
	SvgIconMap = {
		FolderIcon,
		FigmaIcon,
		AgentIcon,
		FileIcon,
		AttachmentIcon,
		DefaultCustomIcon
	};
	SvgIconName = Object.fromEntries(Object.keys(SvgIconMap).map((key) => [key, key]));
}));
//#endregion
//#region ../../packages/agent-ui/src/components/main-content-core/utils/file-type.ts
function getExtension(filename) {
	if (!filename) return "";
	const idx = filename.lastIndexOf(".");
	if (idx <= 0 || idx === filename.length - 1) return "";
	return filename.slice(idx + 1).toLowerCase();
}
function variantFromExtension(ext) {
	return EXTENSION_MAP[ext] ?? "blank";
}
function variantFromFilename(filename) {
	return variantFromExtension(getExtension(filename));
}
/**
* variant → foundation Icon 组件（ReactElement）。
* 替代旧版 getFileTypeIconUrl（返回 SVG URL 给 <img>）。
*/
function getFileTypeIcon(variant, size = 14) {
	const IconComp = VARIANT_ICON_MAP[variant];
	return import_react$1.createElement(IconComp, { size });
}
var import_react$1, VARIANT_ICON_MAP, EXTENSION_MAP;
var init_file_type = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_icons();
	VARIANT_ICON_MAP = {
		doc: WbFileDocIcon,
		markdown: WbFileMarkdownIcon,
		image: WbFileImageIcon,
		pdf: WbFilePdfIcon,
		audio: WbFileAudioIcon,
		video: WbFileVideoIcon,
		spreadsheet: WbFileSheetIcon,
		slides: WbFileSlideIcon,
		html: WbFileHtmlIcon,
		diagram: WbFileDiagramIcon,
		txt: WbFileTxtIcon,
		blank: WbFileUnknownIcon
	};
	EXTENSION_MAP = {
		doc: "doc",
		docx: "doc",
		rtf: "doc",
		odt: "doc",
		md: "markdown",
		markdown: "markdown",
		mdx: "markdown",
		png: "image",
		jpg: "image",
		jpeg: "image",
		gif: "image",
		webp: "image",
		bmp: "image",
		svg: "image",
		ico: "image",
		heic: "image",
		heif: "image",
		pdf: "pdf",
		mp3: "audio",
		wav: "audio",
		flac: "audio",
		aac: "audio",
		ogg: "audio",
		m4a: "audio",
		wma: "audio",
		mp4: "video",
		mov: "video",
		avi: "video",
		mkv: "video",
		webm: "video",
		m4v: "video",
		flv: "video",
		wmv: "video",
		xls: "spreadsheet",
		xlsx: "spreadsheet",
		csv: "spreadsheet",
		tsv: "spreadsheet",
		numbers: "spreadsheet",
		ods: "spreadsheet",
		ppt: "slides",
		pptx: "slides",
		key: "slides",
		keynote: "slides",
		odp: "slides",
		txt: "txt",
		log: "txt",
		...Object.fromEntries([
			"html",
			"htm",
			"xhtml",
			"js",
			"jsx",
			"mjs",
			"cjs",
			"ts",
			"tsx",
			"mts",
			"cts",
			"css",
			"scss",
			"sass",
			"less",
			"vue",
			"svelte",
			"json",
			"jsonc",
			"json5",
			"yaml",
			"yml",
			"xml",
			"xsl",
			"xslt",
			"py",
			"rb",
			"go",
			"rs",
			"java",
			"kt",
			"kts",
			"swift",
			"c",
			"h",
			"cpp",
			"cc",
			"hpp",
			"cs",
			"php",
			"sh",
			"bash",
			"zsh",
			"sql",
			"graphql",
			"gql",
			"wasm",
			"wxml",
			"wxss"
		].map((ext) => [ext, "html"])),
		xmind: "diagram",
		drawio: "diagram"
	};
})), import_jsx_runtime, codeBuddyIconProvider;
var init_codebuddy_icon_provider = __esmMin((() => {
	init_src();
	init_src$1();
	require_react();
	init_foundation();
	init_ArtifactFileTypeIcon();
	init_ChatBubbleIcon();
	init_ImaSourceIcon();
	init_TencentDocsSourceIcon();
	init_TencentLexiangSourceIcon();
	init_icons$1();
	init_shared();
	init_icon();
	init_file_type();
	import_jsx_runtime = require_jsx_runtime();
	codeBuddyIconProvider = { getIcon(iconKey, metadata) {
		if (typeof iconKey === "string") {
			const trimmed = iconKey.trimStart();
			if (trimmed.startsWith("<svg") || trimmed.startsWith("<?xml")) return;
		}
		const mentionType = metadata?.mentionType;
		const metaType = metadata?.type;
		if (iconKey === "agent-mail" || metadata?.agentMail === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMailIcon, { size: 14 });
		if (iconKey === "tencent-doc" || mentionType === "tencent-doc" || metaType === "tencent-doc") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentDocsSourceIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "tencent-lexiang" || mentionType === "tencent-lexiang" || metaType === "tencent-lexiang") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TencentLexiangSourceIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "ima" || mentionType === "ima" || metaType === "ima") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImaSourceIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "message" || mentionType === "message" || metaType === "message") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatBubbleIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "file" && mentionType !== "file" && mentionType !== "recent-file" && metaType !== "file") {
			const fileName = metadata?.fileName || "";
			if (fileName) {
				const kind = getArtifactFileIconKind(fileName);
				if (kind === "word" || kind === "presentation" || kind === "spreadsheet") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactFileTypeIcon, {
					kind,
					type: "solid",
					width: 14,
					height: 14
				});
			}
			return;
		}
		if ((iconKey === "netdrive" || metadata?.source === "personal" || metadata?.source === "project-assets") && !metadata?.isFolder) {
			const fileName = metadata?.fileName || metadata?.displayText || "";
			const fileType = metadata?.fileType || "";
			if (fileName) return getFileIcon(fileName, 14, fileType || void 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudFilesIcon, {
				width: 14,
				height: 14
			});
		}
		if (iconKey === "folder") return getFileIcon("", 14, "folder");
		if (iconKey === "github") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GithubIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "gongfeng") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GongfengIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "cnb") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CnbIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "figma") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigmaIcon$1, {
			width: 14,
			height: 14
		});
		if (iconKey === "ardot-file") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArdotFileIcon, {});
		if (iconKey === "agent" || mentionType === "colleague" || metaType === "colleague") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: SvgIconName.AgentIcon });
		if (iconKey === "skill") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillIcon, {
			width: 14,
			height: 14
		});
		if (iconKey === "default-custom") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: SvgIconName.DefaultCustomIcon });
		if (iconKey === "attachment") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: SvgIconName.AttachmentIcon });
		if (iconKey === "image" || iconKey === "img" || mentionType === "img" || metaType === "img") return getFileTypeIcon("image", 14);
		if (iconKey === "file" || mentionType === "file" || mentionType === "recent-file" || metaType === "file") {
			const fileName = metadata?.fileName || metadata?.displayText || "";
			if (fileName) return getFileTypeIcon(variantFromFilename(fileName), 14);
		}
		const defaultIcon = defaultIconProvider.getIcon(iconKey, metadata);
		if (defaultIcon) return defaultIcon;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: SvgIconName.FileIcon });
	} };
}));
//#endregion
export { variantFromFilename as a, WorkspacePreparing as c, init_file_type as i, init_workspace_preparing as l, init_codebuddy_icon_provider as n, WbAddIcon as o, getFileTypeIcon as r, init_svg_icons as s, codeBuddyIconProvider as t };
