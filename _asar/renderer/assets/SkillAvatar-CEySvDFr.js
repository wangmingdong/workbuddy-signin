import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
//#region ../../packages/agent-ui/src/components/icons/SkillAvatar.tsx
/**
* 将本地绝对路径转换为 webview 可加载的 vscode-file:// URL
* 格式：vscode-file://vscode-app/<absolutePath>
*/
function toFileUrl(filePath) {
	if (!filePath) return "";
	if (/^[a-zA-Z]:[/\\]/.test(filePath)) return `vscode-file://vscode-app/${filePath.replace(/\\/g, "/")}`;
	if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(filePath)) return filePath;
	if (filePath.startsWith("/")) return `vscode-file://vscode-app${filePath}`;
	return filePath;
}
/**
* 解析图标 URL：将本地路径转换为 webview 可用的 URL
* 没有本地路径时返回空数组，走首字母 fallback
*/
function resolveIconUrls(iconUrl) {
	if (iconUrl) return [toFileUrl(iconUrl)];
	return [];
}
/** 检测当前是否为暗色主题 */
function isDarkTheme() {
	if (typeof document === "undefined") return true;
	return document.documentElement.classList.contains("dark");
}
/** 根据字符串稳定地选取字母头像配色 */
function getAvatarColor(name) {
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = hash * 31 + name.charCodeAt(i) >>> 0;
	const entry = AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
	const dark = isDarkTheme();
	return {
		bg: dark ? entry.darkBg : entry.lightBg,
		fg: dark ? entry.darkFg : entry.lightFg
	};
}
/**
* 从 skill 文件路径中提取目录名，用于匹配 COS 图标文件名。
* 例如：/path/to/skills/tencent-docs/SKILL.md → tencent-docs
* @deprecated 请直接使用 SkillInfo.iconSource 字段，该函数仅作为兜底备用
*/
function extractSkillDirName(filePath) {
	const parts = filePath.replace(/\\/g, "/").split("/");
	const skillsIdx = parts.lastIndexOf("skills");
	if (skillsIdx >= 0 && parts[skillsIdx + 1]) return parts[skillsIdx + 1];
	return parts[parts.length - 2] || "";
}
var import_react, import_jsx_runtime, LIGHT_BG_SOURCES, AVATAR_PALETTE, SkillAvatar;
var init_SkillAvatar = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime = require_jsx_runtime();
	LIGHT_BG_SOURCES = new Set(["github"]);
	AVATAR_PALETTE = [
		{
			label: "01 樱粉",
			lightBg: "#ffe0ec",
			lightFg: "#d6336c",
			darkBg: "rgba(255, 77, 139, 0.22)",
			darkFg: "#ff8fab"
		},
		{
			label: "02 晴蓝",
			lightBg: "#d8ecff",
			lightFg: "#1971c2",
			darkBg: "rgba(51, 154, 240, 0.22)",
			darkFg: "#74c0fc"
		},
		{
			label: "03 草绿",
			lightBg: "#dcfce7",
			lightFg: "#16a34a",
			darkBg: "rgba(81, 207, 102, 0.22)",
			darkFg: "#8ce99a"
		},
		{
			label: "04 电紫",
			lightBg: "#ede2ff",
			lightFg: "#7c3aed",
			darkBg: "rgba(132, 94, 247, 0.24)",
			darkFg: "#b197fc"
		},
		{
			label: "05 阳橙",
			lightBg: "#ffe5d0",
			lightFg: "#f76707",
			darkBg: "rgba(255, 146, 43, 0.22)",
			darkFg: "#ffc078"
		},
		{
			label: "06 湖青",
			lightBg: "#d3f9f3",
			lightFg: "#0ca678",
			darkBg: "rgba(32, 201, 151, 0.22)",
			darkFg: "#63e6be"
		},
		{
			label: "07 珊红",
			lightBg: "#ffe3e3",
			lightFg: "#e03131",
			darkBg: "rgba(255, 107, 107, 0.23)",
			darkFg: "#ffa8a8"
		},
		{
			label: "08 靛蓝",
			lightBg: "#dbe4ff",
			lightFg: "#4263eb",
			darkBg: "rgba(92, 124, 250, 0.24)",
			darkFg: "#91a7ff"
		},
		{
			label: "09 柠黄",
			lightBg: "#fff3bf",
			lightFg: "#f08c00",
			darkBg: "rgba(250, 176, 5, 0.24)",
			darkFg: "#ffe066"
		},
		{
			label: "10 青柠",
			lightBg: "#f4fce3",
			lightFg: "#74b816",
			darkBg: "rgba(148, 216, 45, 0.23)",
			darkFg: "#c0eb75"
		}
	];
	SkillAvatar = ({ name, source, iconUrl, size = 18, marketplaceSource }) => {
		const effectiveIconUrl = iconUrl;
		const effectiveSource = marketplaceSource === "marketplace" ? source : void 0;
		const candidateUrls = resolveIconUrls(effectiveIconUrl);
		const [candidateIndex, setCandidateIndex] = (0, import_react.useState)(0);
		const [loaded, setLoaded] = (0, import_react.useState)(false);
		const currentUrl = candidateUrls[candidateIndex];
		(0, import_react.useEffect)(() => {
			setCandidateIndex(0);
			setLoaded(false);
		}, [effectiveIconUrl]);
		if (currentUrl) {
			const needLightBg = effectiveSource ? LIGHT_BG_SOURCES.has(effectiveSource) : false;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: currentUrl,
				alt: name,
				width: size,
				height: size,
				decoding: "async",
				loading: "eager",
				style: {
					borderRadius: 6,
					objectFit: "cover",
					flexShrink: 0,
					background: !loaded ? needLightBg ? "color-mix(in srgb, #e8e8e8 50%, transparent)" : "rgba(128,128,128,0.15)" : "#ffffff",
					...needLightBg ? { padding: 1 } : {}
				},
				onLoad: () => setLoaded(true),
				onError: () => {
					setLoaded(false);
					setCandidateIndex((prev) => prev + 1);
				}
			});
		}
		const safeName = typeof name === "string" ? name : "";
		const firstChar = [...safeName][0]?.toUpperCase() ?? "?";
		const { bg, fg } = getAvatarColor(safeName);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: size,
				height: size,
				borderRadius: 6,
				backgroundColor: bg,
				color: fg,
				fontSize: Math.round(size * .55),
				fontWeight: 600,
				lineHeight: 1,
				flexShrink: 0,
				userSelect: "none"
			},
			"aria-label": name,
			children: firstChar
		});
	};
}));
//#endregion
export { extractSkillDirName as n, init_SkillAvatar as r, SkillAvatar as t };
