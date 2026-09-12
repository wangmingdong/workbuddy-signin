import { n as __esmMin, r as __exportAll, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Mi as UnpinIcon, Ni as PinIcon, ji as ShareTaskIcon, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { A as RefreshCw, At as CircleQuestionMark, Ft as ChevronsDownUp, Gt as Building2, J as List, N as PlugZap, P as Pickaxe, Pt as ChevronsUpDown, Q as LayoutGrid, Rt as ChevronLeft, Tt as Compass, Ut as CalendarDays, Vt as ChartGantt, Wt as Cable, X as Link2, Y as ListTodo, Zt as createLucideIcon, ct as Folder, g as Table2, kt as CircleX, n as Zap, pt as FileText, qt as BookOpen, s as Users, t as init_lucide_react, vt as EllipsisVertical, y as Sparkle, yt as Download } from "./lucide-react-CmX0JwWL.js";
import { n as init_ArtifactFileIconTypes, t as getArtifactFileIconKind } from "./ArtifactFileIconTypes-mWPconF_.js";
//#region ../../packages/agent-ui/src/foundation/components/Icon/Icon.scss
var init_Icon$1 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/Icon.tsx
/** 把 IconSize / number / string 解析成像素值（number 优先；string 原样透传给 width/height） */
function resolveSize(size) {
	if (size === void 0 || size === null) return;
	if (typeof size === "number") return size;
	if (typeof size === "string" && size in SIZE_MAP) return SIZE_MAP[size];
	return size;
}
/**
* 工厂：把一份图标资产固化成具名组件 —— 等价 antd 自动生成的 `<HomeOutlined />`
*
* 用法：
* ```tsx
* import { Settings } from 'lucide-react';
* export const SettingsIcon = createIcon(Settings);
*
* import mySvg from './my-brand.svg';
* export const MyBrandIcon = createIcon({ url: mySvg, themable: true });
*
* // 支持 active 态切换（注册 activeAsset）：
* import ProjectSvg from './project.svg';
* import ProjectFilledSvg from './project-filled.svg';
* export const ProjectIcon = createIcon(ProjectSvg, { activeAsset: ProjectFilledSvg });
* // 使用：<ProjectIcon active={isActive} size="md" />
* ```
*
* `defaults` 用于固化部分默认值（例如 lucide 图标统一 strokeWidth=1.5）。
*/
function createIcon(asset, defaults) {
	return (0, import_react$201.forwardRef)(function GeneratedIcon(props, ref) {
		return /* @__PURE__ */ (0, import_jsx_runtime$200.jsx)(Icon, {
			ref,
			component: props.active && defaults?.activeAsset ? defaults.activeAsset : asset,
			size: props.size ?? defaults?.size,
			strokeWidth: props.strokeWidth ?? defaults?.strokeWidth,
			color: props.color ?? defaults?.color,
			...props
		});
	});
}
var import_react$201, import_jsx_runtime$200, SIZE_MAP, Icon;
var init_Icon = __esmMin((() => {
	init_Icon$1();
	import_react$201 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$200 = require_jsx_runtime();
	SIZE_MAP = {
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24
	};
	Icon = (0, import_react$201.forwardRef)(function Icon(props, ref) {
		const { component, size = "md", width, height, color, spin, rotate, strokeWidth, className, style, children, active: _active, ...rest } = props;
		const resolvedW = resolveSize(width ?? size);
		const resolvedH = resolveSize(height ?? size);
		const merged = {
			...color ? { color } : null,
			...rotate && !spin ? { transform: `rotate(${rotate}deg)` } : null,
			...style
		};
		const cls = [
			"wb-icon",
			spin ? "wb-icon--spin" : "",
			className
		].filter(Boolean).join(" ");
		const domStyle = merged;
		if (component && typeof component === "object" && "url" in component) {
			const { url, themable, alt } = component;
			const imgClass = [cls, themable ? "wb-icon--themable" : ""].filter(Boolean).join(" ");
			return /* @__PURE__ */ (0, import_jsx_runtime$200.jsx)("img", {
				ref,
				src: url,
				alt: alt ?? "",
				"aria-hidden": alt ? void 0 : true,
				width: resolvedW,
				height: resolvedH,
				className: imgClass,
				style: domStyle,
				draggable: false
			});
		}
		if (component) return /* @__PURE__ */ (0, import_jsx_runtime$200.jsx)(component, {
			ref,
			width: resolvedW,
			height: resolvedH,
			className: cls,
			style: merged,
			"aria-hidden": true,
			...strokeWidth !== void 0 ? { strokeWidth } : null,
			...rest,
			children
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$200.jsx)("svg", {
			ref,
			width: resolvedW,
			height: resolvedH,
			className: cls,
			style: domStyle,
			"aria-hidden": true,
			xmlns: "http://www.w3.org/2000/svg",
			...rest,
			children
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AddCircleIcon.tsx
var import_react$200, import_jsx_runtime$199, AddCircleIconRaw, AddCircleIcon;
var init_AddCircleIcon = __esmMin((() => {
	import_react$200 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$199 = require_jsx_runtime();
	AddCircleIconRaw = (0, import_react$200.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$199.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$199.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1 1)",
			d: "M7 0Q9.8995 0 11.9497 2.0503Q14 4.1005 14 7Q14 9.8995 11.9497 11.9497Q9.8995 14 7 14Q4.1005 14 2.0503 11.9497Q0 9.8995 0 7Q0 4.1005 2.0503 2.0503Q4.1005 0 7 0ZM7 1.33Q4.6514 1.33 2.9907 2.9907Q1.33 4.6514 1.33 7Q1.33 9.3486 2.9907 11.0093Q4.6514 12.67 7 12.67Q9.3486 12.67 11.0093 11.0093Q12.67 9.3486 12.67 7Q12.67 4.6514 11.0093 2.9907Q9.3486 1.33 7 1.33ZM6.335 4L6.335 6.335L4 6.335L4 7.665L6.335 7.665L6.335 10L7.665 10L7.665 7.665L10 7.665L10 6.335L7.665 6.335L7.665 4L6.335 4Z",
			fillRule: "evenodd"
		})
	}));
	AddCircleIconRaw.displayName = "AddCircleIconRaw";
	AddCircleIcon = createIcon(AddCircleIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AddConversationIcon.tsx
var import_react$199, import_jsx_runtime$198, AddConversationIconRaw, AddConversationIcon;
var init_AddConversationIcon = __esmMin((() => {
	import_react$199 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$198 = require_jsx_runtime();
	AddConversationIconRaw = (0, import_react$199.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$198.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$198.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.77319 0.77897)",
			d: "M7.2266 0.0001C7.9263 0.0001 8.9357 -0.0101 9.9521 0.17C10.9684 0.3502 12.061 0.7315 12.8926 1.5636C14.2855 2.9577 14.4531 4.8385 14.4531 6.2804C14.4531 7.7222 14.2853 9.6021 12.8926 10.9962C12.094 11.7954 11.0936 12.1824 10.1406 12.3721C9.1916 12.5611 8.2453 12.5626 7.5312 12.5606C7.2983 12.56 6.9785 12.7013 6.5684 13.0948C6.17 13.4771 5.7651 14.0227 5.3662 14.6495L4.3535 14.005C4.7714 13.3484 5.2367 12.709 5.7373 12.2286C6.2261 11.7597 6.8348 11.3587 7.5342 11.3604C8.2533 11.3624 9.0891 11.3581 9.9062 11.1954C10.7192 11.0335 11.4695 10.7233 12.0439 10.1485C13.073 9.1185 13.2539 7.6783 13.2539 6.2804C13.2539 4.8825 13.0729 3.4423 12.0439 2.4122C11.4564 1.8243 10.6378 1.5103 9.7432 1.3517C8.8486 1.1931 7.9467 1.1993 7.2266 1.1993C6.5064 1.1993 5.6045 1.1931 4.71 1.3517C3.8153 1.5103 2.9967 1.8242 2.4092 2.4122C1.3801 3.4423 1.1992 4.8825 1.1992 6.2804C1.1993 7.6783 1.3802 9.1185 2.4092 10.1485C3.0494 10.7892 3.9083 11.1001 4.8252 11.2442L4.7324 11.837L4.6387 12.4298C3.5897 12.2648 2.45 11.8863 1.5605 10.9962C0.1678 9.6021 0 7.7222 0 6.2804C0 4.8385 0.1676 2.9577 1.5605 1.5636C2.392 0.7316 3.4838 0.3502 4.5 0.17C5.5166 -0.0102 6.5267 0.0001 7.2266 0.0001Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$198.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 5.2986 4.3631)",
			d: "M3.2959 2.0967L5.3994 2.0967L5.3994 3.2959L3.2959 3.2959L3.2959 5.4023L2.0967 5.4023L2.0967 3.2959L0 3.2959L0 2.0967L2.0967 2.0967L2.0967 0L3.2959 0L3.2959 2.0967Z"
		})]
	}));
	AddConversationIconRaw.displayName = "AddConversationIconRaw";
	AddConversationIcon = createIcon(AddConversationIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AddIcon.tsx
var import_react$198, import_jsx_runtime$197, AddIconRaw, AddIcon;
var init_AddIcon = __esmMin((() => {
	import_react$198 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$197 = require_jsx_runtime();
	AddIconRaw = (0, import_react$198.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$197.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$197.jsx)("path", {
			d: "M8 3V13M3 8H13",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})
	}));
	AddIconRaw.displayName = "AddIconRaw";
	AddIcon = createIcon(AddIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AtmAddFromTemplateIcon.tsx
var import_react$197, import_jsx_runtime$196, AtmAddFromTemplateIconRaw, AtmAddFromTemplateIcon;
var init_AtmAddFromTemplateIcon = __esmMin((() => {
	import_react$197 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$196 = require_jsx_runtime();
	AtmAddFromTemplateIconRaw = (0, import_react$197.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$196.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$196.jsx)("path", {
				transform: "translate(1.76556 1.63308)",
				fillRule: "evenodd",
				d: "M12.8344 6.9769L12.8344 6.4172Q12.8344 4.0594 12.7322 3.2518Q12.5622 1.9087 11.8987 1.1788Q11.8408 1.1152 11.78 1.0544Q11.7192 0.9936 11.6556 0.9358Q10.9258 0.2722 9.5826 0.1022Q8.7751 0 6.4173 0Q4.0594 0 3.2519 0.1022Q1.9087 0.2722 1.1789 0.9358Q1.117 0.992 1.0579 1.0511Q0.9953 1.1135 0.9358 1.1789Q0.2723 1.9087 0.1023 3.2518Q0.0001 4.0594 0.0001 6.4172L0.0001 6.6555Q0 9.1121 0.1142 9.9547Q0.3047 11.36 1.0445 12.1056L1.0536 12.1148L1.0636 12.1247Q1.8101 12.8653 3.2154 13.0558Q4.0581 13.1701 6.5147 13.17L6.6034 13.17L6.6034 11.97L6.5147 11.97Q4.139 11.9701 3.3765 11.8667Q2.3698 11.7302 1.9105 11.2745L1.9038 11.2679L1.8964 11.2604Q1.4398 10.8003 1.3034 9.7936Q1.2 9.0311 1.2001 6.6555L1.2001 6.4172Q1.2001 4.135 1.2928 3.4025Q1.4152 2.4354 1.8237 1.9861Q1.8634 1.9424 1.9053 1.9007Q1.9448 1.8612 1.9862 1.8236Q2.4355 1.4151 3.4025 1.2927Q4.1351 1.2 6.4173 1.2Q8.6994 1.2 9.432 1.2927Q10.399 1.4151 10.8483 1.8236Q10.8908 1.8623 10.9315 1.903Q10.9721 1.9436 11.0108 1.9861Q11.4193 2.4354 11.5417 3.4025Q11.6344 4.135 11.6344 6.4172L11.6344 6.9769L12.8344 6.9769Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$196.jsx)("rect", {
				transform: "translate(5.18271 5.94669)",
				y: "-0.6",
				width: "6",
				height: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$196.jsx)("rect", {
				transform: "translate(5.18271 8.82034)",
				y: "-0.6",
				width: "3.21",
				height: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$196.jsx)("path", {
				transform: "translate(9.59958 9.69877)",
				fillRule: "evenodd",
				d: "M3.32 2.12L3.32 0L2.12 0L2.12 2.12L0 2.12L0 3.32L2.12 3.32L2.12 5.44L3.32 5.44L3.32 3.32L5.44 3.32L5.44 2.12L3.32 2.12Z"
			})
		]
	}));
	AtmAddFromTemplateIconRaw.displayName = "AtmAddFromTemplateIconRaw";
	AtmAddFromTemplateIcon = createIcon(AtmAddFromTemplateIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AtmBatchManageIcon.tsx
var import_react$196, import_jsx_runtime$195, AtmBatchManageIconRaw, AtmBatchManageIcon;
var init_AtmBatchManageIcon = __esmMin((() => {
	import_react$196 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$195 = require_jsx_runtime();
	AtmBatchManageIconRaw = (0, import_react$196.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$195.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$195.jsx)("path", {
			transform: "translate(1.15487 1.04172)",
			fillRule: "evenodd",
			d: "M3.4497 0L9.6388 0Q11.4613 0 12.75 1.2887Q14.0388 2.5775 14.0388 4.4L14.0388 10.8216L12.8388 10.8216L12.8388 4.4Q12.8388 3.0745 11.9015 2.1373Q10.9643 1.2 9.6388 1.2L3.4497 1.2L3.4497 0ZM0.0001 7.5827L0.0001 8.9318C0 11.3286 0 12.5419 0.7625 13.3044C1.5251 14.0669 2.7383 14.0669 5.1352 14.0668L5.2063 14.0668L6.3506 14.0668L6.4217 14.0668C8.8186 14.0669 10.0318 14.0669 10.7944 13.3044C11.5569 12.5419 11.5569 11.3286 11.5568 8.9318L11.5568 8.8607L11.5568 7.6538L11.5568 7.5827C11.5569 5.1858 11.5569 3.9725 10.7944 3.21C10.0318 2.4475 8.8186 2.4475 6.4217 2.4476L5.1352 2.4476C2.7383 2.4475 1.5251 2.4475 0.7625 3.21C0 3.9725 0 5.1858 0.0001 7.5827ZM1.2001 8.8607L1.2001 7.6538L1.2001 7.5826Q1.2 5.5632 1.2843 4.9457Q1.3729 4.2967 1.6111 4.0585Q1.8492 3.8204 2.4983 3.7318Q3.1157 3.6475 5.1351 3.6476L5.2063 3.6476L6.3506 3.6476L6.4217 3.6476Q8.4412 3.6475 9.0586 3.7318Q9.7077 3.8204 9.9458 4.0585Q10.184 4.2967 10.2726 4.9457Q10.3568 5.5632 10.3568 7.5826L10.3568 7.6537L10.3568 8.8607L10.3568 8.9318Q10.3568 10.9512 10.2726 11.5687Q10.184 12.2177 9.9458 12.4559Q9.7077 12.694 9.0586 12.7826Q8.4412 12.8669 6.4217 12.8668L6.3506 12.8668L5.2063 12.8668L5.1351 12.8668Q3.1157 12.8669 2.4983 12.7826Q1.8492 12.694 1.6111 12.4559Q1.3729 12.2177 1.2843 11.5687Q1.2 10.9512 1.2001 8.9318L1.2001 8.8607ZM6.3414 9.6657L8.887 6.9223L8.0073 6.1061L5.4618 8.8495Q5.4516 8.8605 5.4313 8.8824Q5.2324 9.0969 5.1383 9.186Q5.0442 9.0969 4.8453 8.8824Q4.8254 8.8609 4.8148 8.8495L3.6874 7.6344L2.8077 8.4506L3.9352 9.6657Q3.9451 9.6764 3.9654 9.6983Q4.2875 10.0456 4.4343 10.1642Q4.7702 10.4355 5.1383 10.4355Q5.5064 10.4355 5.8423 10.1642Q5.9891 10.0456 6.3112 9.6983Q6.3312 9.6768 6.3414 9.6657Z"
		})
	}));
	AtmBatchManageIconRaw.displayName = "AtmBatchManageIconRaw";
	AtmBatchManageIcon = createIcon(AtmBatchManageIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/use-scoped-ids.ts
/**
* 给 SVG 内 `<defs>` id 加上一次性前缀。
*
* 用途：figma 导出的 svg 通常带 `paint0_linear_*` / `filter0_d_*` 这样的
* 全局 id；同一页面渲染多份 → id 冲突 → 渐变/滤镜失效。
*
* @example
* ```tsx
* const ids = useScopedIds(['grad', 'filter']);
* <svg>
*     <path fill={`url(#${ids.grad})`} />
*     <filter id={ids.filter}>...</filter>
*     <linearGradient id={ids.grad}>...</linearGradient>
* </svg>
* ```
*/
function useScopedIds(keys) {
	const reactId = (0, import_react$195.useId)();
	return (0, import_react$195.useMemo)(() => {
		const result = {};
		for (const key of keys) result[key] = `wb-${key}-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
		return result;
	}, [reactId]);
}
var import_react$195;
var init_use_scoped_ids = __esmMin((() => {
	import_react$195 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AgentMailBrandIcon.tsx
var import_react$194, import_jsx_runtime$194, AgentMailBrandIconRaw, AgentMailBrandIcon;
var init_AgentMailBrandIcon = __esmMin((() => {
	import_react$194 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	init_use_scoped_ids();
	import_jsx_runtime$194 = require_jsx_runtime();
	AgentMailBrandIconRaw = (0, import_react$194.forwardRef)((props, ref) => {
		const ids = useScopedIds(["gradient"]);
		return /* @__PURE__ */ (0, import_jsx_runtime$194.jsxs)("svg", {
			ref,
			viewBox: "0 0 36 36",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			...props,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$194.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime$194.jsxs)("linearGradient", {
					id: ids.gradient,
					gradientTransform: "matrix(0 36 -36 0 18 0)",
					gradientUnits: "userSpaceOnUse",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$194.jsx)("stop", {
						offset: "0",
						stopColor: "#25C9A5"
					}), /* @__PURE__ */ (0, import_jsx_runtime$194.jsx)("stop", {
						offset: "1",
						stopColor: "#4BD79A"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime$194.jsx)("circle", {
					fill: `url(#${ids.gradient})`,
					cx: "18",
					cy: "18",
					r: "18"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$194.jsx)("path", {
					fill: "#FFF",
					transform: "matrix(1 0 0 1 9.89878 11.0874)",
					d: "M6.2136 5.622L0.4144 1.894C0.5559 1.5472 0.7456 1.2545 1 1C2 0 3.5911 0 6.7345 0.0001L6.8277 0.0001L9.1035 0.0001L9.1968 0.0001C12.3401 0 13.9312 0 14.9312 1C15.1856 1.2545 15.3753 1.5472 15.5168 1.894L9.7177 5.622Q8.3462 6.5036 7.9656 6.5036Q7.585 6.5036 6.2136 5.622ZM0.0001 6.8277L0.0001 6.7345C0.0001 5.259 0.0001 4.1256 0.1035 3.2347L5.5127 6.7121Q6.435 7.305 6.7922 7.4845Q7.4194 7.7996 7.9656 7.7996Q8.5118 7.7996 9.139 7.4845Q9.4963 7.305 10.4185 6.7121L15.8278 3.2347C15.9311 4.1256 15.9311 5.259 15.9311 6.7345L15.9311 6.8277L15.9311 6.9209C15.9311 7.7652 15.9311 8.4976 15.9118 9.1365C15.4369 9.263 15.0858 9.5738 14.8584 10.0687L14.1906 11.5234L12.7138 12.1422C12.0868 12.4051 11.7401 12.8702 11.6739 13.5376C11.6709 13.5675 11.6687 13.5973 11.6673 13.6269C10.97 13.6553 10.1556 13.6552 9.1967 13.6552L9.1035 13.6552L6.8277 13.6552L6.7345 13.6552C3.5911 13.6553 2 13.6554 1 12.6554C0 11.6553 0 10.0643 0.0001 6.9209L0.0001 6.8277ZM15.6938 11.2027C15.5478 11.808 15.312 12.2746 14.9312 12.6554C14.4441 13.1425 13.8167 13.3923 12.938 13.5204C12.9839 13.4198 13.0689 13.3295 13.19 13.2787L14.936 12.5472C15.0461 12.5009 15.1384 12.4122 15.1883 12.3037L15.6938 11.2027Z",
					fillRule: "evenodd"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$194.jsx)("path", {
					fill: "#FFF",
					transform: "matrix(1 0 0 1 21.5641 20.16)",
					d: "M5.042 1.4623L5.4984 3.1017C5.5273 3.2049 5.6029 3.2825 5.7051 3.3148L7.3281 3.8257C7.6538 3.9285 7.6063 4.4064 7.2558 4.5535L5.5098 5.2851C5.3996 5.3314 5.3075 5.4212 5.2575 5.5298L4.4663 7.2491C4.3076 7.5948 3.8289 7.6266 3.7373 7.2973L3.2808 5.6591C3.252 5.5556 3.1766 5.4772 3.0741 5.4449L1.4525 4.9339C1.1265 4.8312 1.1739 4.3532 1.5247 4.2061L3.2707 3.4745C3.3808 3.4283 3.4731 3.3395 3.523 3.2311L4.3129 1.5105C4.4717 1.1649 4.9502 1.1333 5.042 1.4623Z"
				})
			]
		});
	});
	AgentMailBrandIconRaw.displayName = "AgentMailBrandIconRaw";
	AgentMailBrandIcon = createIcon(AgentMailBrandIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AgentMailIcon.tsx
var import_react$193, import_jsx_runtime$193, AgentMailIconRaw, AgentMailIcon;
var init_AgentMailIcon = __esmMin((() => {
	import_react$193 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$193 = require_jsx_runtime();
	AgentMailIconRaw = (0, import_react$193.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$193.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$193.jsx)("path", {
			transform: "matrix(1 0 0 1 0.999871 1.99987)",
			d: "M0.0001 5.9182L0.0001 6.0821C0 8.8444 0 10.2426 0.8788 11.1214C1.7576 12.0003 3.1558 12.0002 5.9182 12.0001L6.0001 12.0001L8.0001 12.0001L8.0821 12.0001L8.0825 12.0001C8.2609 12.0001 8.4336 12.0001 8.6008 11.9999L8.6008 10.7988Q8.3522 10.8001 8.0821 10.8001L8.0001 10.8001L6.0001 10.8001L5.9182 10.8001Q3.5784 10.8002 2.8544 10.7014Q2.0454 10.591 1.7273 10.2729Q1.4093 9.9549 1.2989 9.1458Q1.2001 8.4219 1.2001 6.0821L1.2001 6.0001L1.2001 5.9182Q1.2001 4.4165 1.2408 3.5804L4.8193 5.5073Q5.6561 5.9578 5.9769 6.0937Q6.5317 6.3286 7.0001 6.3286Q7.4686 6.3286 8.0233 6.0937Q8.3442 5.9578 9.181 5.5073L12.7595 3.5804Q12.8002 4.4165 12.8001 5.9182L12.8001 6.0001L12.8001 6.0821Q12.8001 6.5886 12.7955 7.0194L13.9987 7.0121C14.0001 6.7206 14.0001 6.4112 14.0001 6.0824L14.0001 6.0821L14.0001 6.0001L14.0001 5.9182C14.0002 3.1558 14.0003 1.7576 13.1214 0.8788C12.2426 0 10.8444 0 8.0821 0.0001L5.9182 0.0001C3.1558 0 1.7576 0 0.8788 0.8788C0 1.7576 0 3.1558 0.0001 5.9182ZM12.5874 2.3101Q12.47 1.9244 12.2729 1.7273Q11.9549 1.4093 11.1458 1.2989Q10.4219 1.2001 8.0821 1.2001L8.0001 1.2001L6.0001 1.2001L5.9182 1.2001Q3.5784 1.2001 2.8544 1.2989Q2.0454 1.4093 1.7273 1.7273Q1.5302 1.9244 1.4129 2.3101L5.3882 4.4507Q6.6472 5.1286 7.0001 5.1286Q7.3531 5.1286 8.6121 4.4507L12.5874 2.3101ZM11.5724 7.5142C11.6947 7.248 12.0632 7.2237 12.1339 7.4771L12.4855 8.7398C12.5078 8.8192 12.566 8.879 12.6447 8.9038L13.8947 9.2974C14.1456 9.3765 14.109 9.7446 13.839 9.8579L12.4943 10.4214C12.4093 10.457 12.3384 10.5262 12.3 10.6099L11.6906 11.9341C11.5683 12.2003 11.1996 12.2248 11.1291 11.9712L10.7775 10.7095C10.7553 10.6298 10.6972 10.5693 10.6183 10.5445L9.3693 10.1509C9.1182 10.0718 9.1548 9.7036 9.425 9.5904L10.7697 9.0269C10.8545 8.9913 10.9256 8.9229 10.964 8.8394L11.5724 7.5142Z",
			fillRule: "evenodd"
		})
	}));
	AgentMailIconRaw.displayName = "AgentMailIconRaw";
	AgentMailIcon = createIcon(AgentMailIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AlarmClockIcon.tsx
var import_react$192, import_jsx_runtime$192, AlarmClockIconRaw, AlarmClockIcon;
var init_AlarmClockIcon = __esmMin((() => {
	import_react$192 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$192 = require_jsx_runtime();
	AlarmClockIconRaw = (0, import_react$192.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$192.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$192.jsx)("circle", {
				cx: "12",
				cy: "13",
				r: "8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$192.jsx)("path", { d: "M12 9v4l2 2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$192.jsx)("path", { d: "M5 3 2 6" }),
			/* @__PURE__ */ (0, import_jsx_runtime$192.jsx)("path", { d: "m22 6-3-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime$192.jsx)("path", { d: "M6.38 18.7 4 21" }),
			/* @__PURE__ */ (0, import_jsx_runtime$192.jsx)("path", { d: "M17.64 18.67 20 21" })
		]
	}));
	AlarmClockIconRaw.displayName = "AlarmClockIconRaw";
	AlarmClockIcon = createIcon(AlarmClockIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ArchivedIcon.tsx
var import_react$191, import_jsx_runtime$191, ArchivedIconRaw, ArchivedIcon;
var init_ArchivedIcon = __esmMin((() => {
	import_react$191 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$191 = require_jsx_runtime();
	ArchivedIconRaw = (0, import_react$191.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$191.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$191.jsx)("path", { d: "M12 3v6" }),
			/* @__PURE__ */ (0, import_jsx_runtime$191.jsx)("path", { d: "M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$191.jsx)("path", { d: "M3.054 9.013h17.893" })
		]
	}));
	ArchivedIconRaw.displayName = "ArchivedIconRaw";
	ArchivedIcon = createIcon(ArchivedIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ArchiveIcon.tsx
var import_react$190, import_jsx_runtime$190, ArchiveIconRaw, ArchiveIcon;
var init_ArchiveIcon = __esmMin((() => {
	import_react$190 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$190 = require_jsx_runtime();
	ArchiveIconRaw = (0, import_react$190.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$190.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$190.jsx)("path", {
			transform: "translate(0.603, 1.218)",
			d: "M0.8506 4.4201Q0.9473 4.4745 1.09 4.515L1.09 7.9648Q1.0899 10.0279 1.1876 10.7433Q1.3555 11.9737 2.0175 12.6357Q2.6795 13.2977 3.9099 13.4656Q4.6253 13.5633 6.6884 13.5632L8.1049 13.5632Q10.168 13.5633 10.8835 13.4656Q12.1139 13.2977 12.7758 12.6357Q13.4378 11.9737 13.6058 10.7433Q13.7034 10.0279 13.7033 7.9648L13.7033 4.515Q13.846 4.4745 13.9427 4.4201Q14.3507 4.1907 14.5801 3.7827Q14.7933 3.4034 14.7933 2.3167Q14.7933 1.2299 14.5801 0.8506Q14.3507 0.4426 13.9427 0.2133Q13.5634 0 12.4767 0L2.3167 0Q1.2299 0 0.8506 0.2133Q0.4426 0.4426 0.2132 0.8506Q0 1.2299 0 2.3167Q0 3.4034 0.2132 3.7827Q0.4426 4.1907 0.8506 4.4201ZM2.2365 3.2999L12.5568 3.2999Q13.2185 3.2977 13.2893 3.2578Q13.3716 3.2116 13.4178 3.1293Q13.46 3.0543 13.46 2.3167Q13.46 1.579 13.4178 1.504Q13.3716 1.4218 13.2893 1.3755Q13.2143 1.3333 12.4767 1.3333L2.3167 1.3333Q1.579 1.3333 1.504 1.3755Q1.4218 1.4218 1.3755 1.504Q1.3333 1.579 1.3333 2.3167Q1.3333 3.0543 1.3755 3.1293Q1.4218 3.2116 1.504 3.2578Q1.5749 3.2977 2.2365 3.2999ZM12.37 4.6333L2.4233 4.6333L2.4233 7.9648Q2.4233 9.9373 2.5087 10.563Q2.6159 11.3485 2.9603 11.6929Q3.3047 12.0373 4.0902 12.1446Q4.7159 12.2299 6.6884 12.2299L8.105 12.2299Q10.0775 12.2299 10.7031 12.1446Q11.4886 12.0373 11.833 11.6929Q12.1775 11.3485 12.2847 10.563Q12.3701 9.9373 12.37 7.9648L12.37 4.6333ZM4.4113 6.4146L10.3889 6.4456L10.382 7.7756L4.4044 7.7446L4.4113 6.4146Z",
			fillRule: "evenodd"
		})
	}));
	ArchiveIconRaw.displayName = "ArchiveIconRaw";
	ArchiveIcon = createIcon(ArchiveIconRaw);
})), import_jsx_runtime$189, ArtifactAudioLineColorIcon;
var init_ArtifactAudioLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$189 = require_jsx_runtime();
	ArtifactAudioLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$189.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$189.jsx)("path", {
			fill: "#4EA0A6",
			transform: "matrix(1 0 0 1 1.08333 1.75)",
			d: "M13.8333 6.75L13.8333 7.9713C13.8334 9.0738 13.8072 9.817 13.7548 10.2009C13.6637 10.8682 13.4377 11.3824 13.0767 11.7434C12.7157 12.1044 12.2015 12.3304 11.5342 12.4215C11.1504 12.4739 10.4072 12.5 9.3046 12.5L4.5287 12.5C3.4262 12.5 2.683 12.4739 2.2991 12.4215C1.6318 12.3304 1.1176 12.1044 0.7566 11.7434C0.3956 11.3824 0.1696 10.8682 0.0785 10.2009C0.0261 9.817 -0 9.0738 0 7.9713L0 4.5287C-0 3.4262 0.0261 2.683 0.0785 2.2991C0.1696 1.6318 0.3956 1.1176 0.7566 0.7566C1.1176 0.3956 1.6318 0.1696 2.2991 0.0785C2.683 0.0261 3.4262 -0 4.5287 0L9.3046 0C10.4072 -0 11.1504 0.0261 11.5342 0.0785C12.2015 0.1696 12.7157 0.3956 13.0767 0.7566C13.4377 1.1176 13.6637 1.6318 13.7548 2.2991C13.8072 2.683 13.8334 3.4262 13.8333 4.5287L13.8333 5.25L12.6667 5.25L12.6667 4.5287C12.6667 3.479 12.6441 2.7884 12.5988 2.4569C12.5432 2.0491 12.4275 1.7574 12.2517 1.5816C12.076 1.4058 11.7842 1.2901 11.3764 1.2345C11.045 1.1892 10.3544 1.1666 9.3047 1.1667L4.5287 1.1667C3.479 1.1666 2.7884 1.1892 2.4569 1.2345C2.0491 1.2901 1.7574 1.4058 1.5816 1.5816C1.4058 1.7574 1.2901 2.0491 1.2345 2.4569C1.1892 2.7884 1.1666 3.479 1.1667 4.5287L1.1667 7.9713C1.1666 9.021 1.1892 9.7116 1.2345 10.0431C1.2901 10.4509 1.4058 10.7426 1.5816 10.9184C1.7574 11.0942 2.0491 11.2099 2.4569 11.2655C2.7884 11.3108 3.479 11.3334 4.5287 11.3333L9.3047 11.3333C10.3544 11.3334 11.045 11.3108 11.3764 11.2655C11.7842 11.2099 12.076 11.0942 12.2517 10.9184C12.4275 10.7426 12.5432 10.4509 12.5988 10.0431C12.6441 9.7116 12.6667 9.021 12.6667 7.9713L12.6667 6.75L13.8333 6.75ZM8.4 4.3049L8.4 6.5851C8.3889 6.5845 8.3778 6.5841 8.3667 6.5838C8.3556 6.5835 8.3445 6.5833 8.3333 6.5833C7.9882 6.5833 7.6935 6.7054 7.4495 6.9495C7.2054 7.1935 7.0833 7.4882 7.0833 7.8333C7.0833 8.1785 7.2054 8.4731 7.4495 8.7172C7.6935 8.9613 7.9882 9.0833 8.3333 9.0833C8.6785 9.0833 8.9731 8.9613 9.2172 8.7172C9.4613 8.4731 9.5833 8.1785 9.5833 7.8333C9.5833 7.7993 9.5819 7.7652 9.5792 7.7313C9.5764 7.6973 9.5722 7.6635 9.5667 7.6299L9.5667 4.3049C9.5667 4.2867 9.5667 4.26 9.5668 4.2248C9.5673 3.9918 9.5595 3.8255 9.5433 3.726C9.5013 3.4672 9.3869 3.2677 9.2003 3.1277C9.0136 2.9876 8.7902 2.9335 8.53 2.9654C8.4298 2.9777 8.268 3.0166 8.0445 3.0822C8.0107 3.0921 7.9851 3.0996 7.9675 3.1047L5.9675 3.6865C5.6116 3.79 5.3725 3.9233 5.2502 4.0863C5.1278 4.2493 5.0667 4.5161 5.0667 4.8867L5.0667 7.2518C5.0556 7.2512 5.0445 7.2507 5.0334 7.2505C5.0222 7.2501 5.0111 7.25 5 7.25C4.6548 7.25 4.3602 7.372 4.1161 7.6161C3.872 7.8602 3.75 8.1548 3.75 8.5C3.75 8.8452 3.872 9.1398 4.1161 9.3839C4.3602 9.628 4.6548 9.75 5 9.75C5.297 9.75 5.5605 9.6561 5.7906 9.4683C6.0206 9.2804 6.1653 9.041 6.2247 8.75L6.2333 8.75L6.2333 8.7034C6.2389 8.6698 6.243 8.636 6.2458 8.6021C6.2486 8.5681 6.25 8.5341 6.25 8.5C6.25 8.4659 6.2486 8.4319 6.2458 8.3979C6.243 8.364 6.2389 8.3302 6.2333 8.2966L6.2333 4.8867C6.2333 4.8642 6.2334 4.8434 6.2335 4.8243C6.2518 4.8189 6.2718 4.813 6.2934 4.8067L8.2934 4.2249C8.3118 4.2195 8.3382 4.2118 8.3728 4.2017C8.3821 4.1989 8.3913 4.1963 8.4002 4.1937C8.4002 4.2029 8.4001 4.2124 8.4001 4.2221C8.4 4.2584 8.4 4.286 8.4 4.3049Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$188, ArtifactDocLineColorIcon;
var init_ArtifactDocLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$188 = require_jsx_runtime();
	ArtifactDocLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$188.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$188.jsx)("path", {
			fill: "#5A89CC",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M12.5 9.3046L12.5 6.25L12.4172 6.25L11.3333 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6529 12.6433 8.9845 12.6659 7.9713 12.6667L7.9346 12.6667L7.9185 12.6667L4.5287 12.6667L4.4987 12.6667C3.4658 12.6663 2.7852 12.6437 2.4569 12.5988C2.0491 12.5432 1.7574 12.4275 1.5816 12.2517C1.4058 12.076 1.2901 11.7842 1.2345 11.3764C1.1892 11.045 1.1666 10.3544 1.1667 9.3047L1.1667 4.5287C1.1666 3.479 1.1892 2.7884 1.2345 2.4569C1.2901 2.0491 1.4058 1.7574 1.5816 1.5816C1.7574 1.4058 2.0491 1.2901 2.4569 1.2345C2.7852 1.1897 3.4658 1.1671 4.4987 1.1667L4.5165 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0303 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5L11.8377 5.5L11.9167 5.5L12.5 5.5C12.5 5.472 12.4995 5.4442 12.4985 5.4167L12.5 5.4167C12.5 5.0206 12.4797 4.744 12.4391 4.5868C12.4238 4.5275 12.4057 4.469 12.3847 4.4114C12.3643 4.3553 12.3413 4.3002 12.3158 4.2462C12.2464 4.0995 12.0849 3.874 11.8313 3.5697L10.2309 1.6491C9.8764 1.2238 9.6274 0.9384 9.4841 0.7931C9.2374 0.543 8.9901 0.36 8.7423 0.2439C8.4945 0.1278 8.1956 0.0551 7.8456 0.0257C7.6421 0.0086 7.2636 -0 6.7098 0L4.5287 0L4.5169 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333L7.934 13.8333L7.9713 13.8333C9.0738 13.8334 9.817 13.8072 10.2009 13.7548C10.8682 13.6637 11.3824 13.4377 11.7434 13.0767C12.1044 12.7157 12.3304 12.2015 12.4215 11.5342C12.4739 11.1504 12.5 10.4072 12.5 9.3046ZM8.1667 1.2892L8.1667 2.2864C8.1666 2.9774 8.1811 3.4291 8.2101 3.6413C8.2413 3.8699 8.3 4.0274 8.3863 4.1137C8.4726 4.2 8.6301 4.2587 8.8587 4.2899C9.0709 4.3189 9.5226 4.3334 10.2136 4.3333L10.8765 4.3333L10.8626 4.3166L9.2728 2.396C8.7419 1.7548 8.382 1.3896 8.1928 1.3004C8.1847 1.2966 8.176 1.2928 8.1667 1.2892ZM6.6667 7.6667L2.8333 7.6667L2.8333 8.8333L6.6667 8.8333L6.6667 7.6667ZM2.8333 10L9.3333 10L9.3333 11.1667L2.8333 11.1667L2.8333 10Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$187, ArtifactDrawioLineColorIcon;
var init_ArtifactDrawioLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$187 = require_jsx_runtime();
	ArtifactDrawioLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$187.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$187.jsx)("path", {
			fill: "#EB9752",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM4.8288 6.9166C4.8288 6.6862 4.8288 6.571 4.8539 6.4763C4.923 6.2159 5.128 6.0108 5.3885 5.9417C5.4832 5.9166 5.5984 5.9166 5.8288 5.9166L6.8421 5.9166C7.0725 5.9166 7.1877 5.9166 7.2824 5.9417C7.5429 6.0108 7.7479 6.2159 7.817 6.4763C7.8421 6.571 7.8421 6.6862 7.8421 6.9166C7.8421 7.147 7.8421 7.2622 7.817 7.3569C7.7503 7.6086 7.5565 7.8086 7.3084 7.8841L8.3268 9.4949L8.7256 9.4949C8.956 9.4949 9.0712 9.4949 9.1659 9.52C9.4263 9.5891 9.6314 9.7941 9.7005 10.0546C9.7256 10.1493 9.7256 10.2645 9.7256 10.4949C9.7256 10.7253 9.7256 10.8405 9.7005 10.9352C9.6314 11.1956 9.4263 11.4007 9.1659 11.4698C9.0712 11.4949 8.956 11.4949 8.7256 11.4949L7.7122 11.4949C7.4819 11.4949 7.3667 11.4949 7.272 11.4698C7.0115 11.4007 6.8064 11.1956 6.7374 10.9352C6.7122 10.8405 6.7122 10.7253 6.7122 10.4949C6.7122 10.2645 6.7122 10.1493 6.7374 10.0546C6.8064 9.7941 7.0115 9.5891 7.272 9.52C7.3185 9.5076 7.37 9.5014 7.4376 9.4982L6.4377 7.9166L6.2299 7.9166L5.232 9.4982C5.2993 9.5014 5.3506 9.5077 5.397 9.52C5.6574 9.5891 5.8625 9.7941 5.9316 10.0546C5.9567 10.1493 5.9567 10.2645 5.9567 10.4949C5.9567 10.7253 5.9567 10.8405 5.9316 10.9352C5.8625 11.1956 5.6574 11.4007 5.397 11.4698C5.3023 11.4949 5.1871 11.4949 4.9567 11.4949L3.9434 11.4949C3.713 11.4949 3.5978 11.4949 3.5031 11.4698C3.2426 11.4007 3.0375 11.1956 2.9685 10.9352C2.9434 10.8405 2.9434 10.7253 2.9434 10.4949C2.9434 10.2645 2.9434 10.1493 2.9685 10.0546C3.0375 9.7941 3.2426 9.5891 3.5031 9.52C3.5978 9.4949 3.713 9.4949 3.9434 9.4949L4.3433 9.4949L5.3601 7.8833C5.1132 7.8073 4.9204 7.6078 4.8539 7.3569C4.8288 7.2622 4.8288 7.147 4.8288 6.9166Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$186, ArtifactFolderLineColorIcon;
var init_ArtifactFolderLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$186 = require_jsx_runtime();
	ArtifactFolderLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$186.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$186.jsx)("path", {
			fill: "#8C8C91",
			transform: "matrix(1 0 0 1 1.08333 1.58333)",
			d: "M6.281 1.5222C6.6311 1.7593 6.8847 2.0741 7.0417 2.4666L8.1249 2.0334C7.8793 1.4193 7.4827 0.9269 6.9351 0.5562C6.3874 0.1854 5.7829 0 5.1216 0L4.0136 0C3.2588 0 2.7625 0.0271 2.5247 0.0814C1.9182 0.2197 1.3939 0.5099 0.9519 0.9519C0.5099 1.3939 0.2197 1.9182 0.0814 2.5247C0.0271 2.7625 0 3.2588 0 4.0136L0 8.25L0 8.3046C-0 9.4072 0.0261 10.1504 0.0785 10.5342C0.1696 11.2015 0.3956 11.7157 0.7566 12.0767C1.1176 12.4377 1.6318 12.6637 2.2991 12.7548C2.683 12.8072 3.4262 12.8334 4.5287 12.8333L4.5833 12.8333L9.25 12.8333L9.3046 12.8333C10.4072 12.8334 11.1504 12.8072 11.5342 12.7548C12.2015 12.6637 12.7157 12.4377 13.0767 12.0767C13.4377 11.7157 13.6637 11.2015 13.7548 10.5342C13.8072 10.1504 13.8334 9.4072 13.8333 8.3046L13.8333 8.25L13.8333 7.9167L13.8333 7.903L13.8333 7.8893L13.8333 7.8757L13.8333 7.8621C13.8334 6.7595 13.8072 6.0163 13.7548 5.6325C13.6637 4.9651 13.4377 4.451 13.0767 4.09C12.7157 3.729 12.2015 3.5029 11.5342 3.4119C11.1504 3.3595 10.4072 3.3333 9.3046 3.3333L9.25 3.3333L3.25 3.3333L3.25 4.5L9.25 4.5L9.3047 4.5C10.3544 4.5 11.045 4.5226 11.3764 4.5678C11.7842 4.6235 12.076 4.7392 12.2517 4.9149C12.4275 5.0907 12.5432 5.3825 12.5988 5.7903C12.6441 6.1217 12.6667 6.8123 12.6667 7.862L12.6667 7.8756L12.6667 7.8893L12.6667 7.903L12.6667 7.9167L12.6667 8.25L12.6667 8.3047C12.6667 9.3544 12.6441 10.045 12.5988 10.3764C12.5432 10.7842 12.4275 11.076 12.2517 11.2517C12.076 11.4275 11.7842 11.5432 11.3764 11.5988C11.045 11.6441 10.3544 11.6667 9.3047 11.6667L9.25 11.6667L4.5833 11.6667L4.5287 11.6667C3.479 11.6667 2.7884 11.6441 2.4569 11.5988C2.0491 11.5432 1.7574 11.4275 1.5816 11.2517C1.4058 11.076 1.2901 10.7842 1.2345 10.3764C1.1892 10.045 1.1666 9.3544 1.1667 8.3047L1.1667 8.25L1.1667 4.0136C1.1667 3.3464 1.184 2.9366 1.2188 2.7842C1.3073 2.3962 1.4933 2.0604 1.7769 1.7769C2.0604 1.4933 2.3962 1.3073 2.7842 1.2188C2.9366 1.184 3.3464 1.1667 4.0136 1.1667L5.1216 1.1667C5.5444 1.1667 5.9309 1.2852 6.281 1.5222Z"
		})
	});
})), import_jsx_runtime$185, ArtifactHtmlLineColorIcon;
var init_ArtifactHtmlLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$185 = require_jsx_runtime();
	ArtifactHtmlLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$185.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$185.jsx)("path", {
			fill: "#5A89CC",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M11.8377 5.5L10.146 5.5C9.407 5.5 8.9061 5.482 8.6433 5.4459C8.1584 5.3792 7.781 5.2102 7.5113 4.9386C7.2416 4.6671 7.0736 4.2872 7.0074 3.7991C6.9715 3.5345 6.9536 3.0302 6.9536 2.2864L6.9536 1.1686C6.8623 1.1673 6.7662 1.1667 6.6654 1.1667L4.4987 1.1667C3.4559 1.1666 2.7699 1.1892 2.4406 1.2345C2.0356 1.2901 1.7457 1.4058 1.5711 1.5816C1.3965 1.7574 1.2816 2.0491 1.2263 2.4569C1.1814 2.7884 1.1589 3.479 1.1589 4.5287L1.1589 9.3047C1.1589 10.3544 1.1814 11.045 1.2263 11.3764C1.2816 11.7842 1.3965 12.076 1.5711 12.2517C1.7457 12.4275 2.0356 12.5432 2.4406 12.5988C2.7699 12.6441 3.4559 12.6667 4.4987 12.6667L7.9185 12.6667C8.9613 12.6667 9.6473 12.6441 9.9766 12.5988C10.3817 12.5432 10.6715 12.4275 10.8461 12.2517C11.0207 12.076 11.1356 11.7842 11.1909 11.3764C11.2359 11.0449 11.2583 10.3544 11.2583 9.3047L11.2583 6.25L12.4172 6.25L12.4172 9.3046C12.4173 10.4072 12.3912 11.1504 12.3392 11.5342C12.2487 12.2015 12.0242 12.7157 11.6656 13.0767C11.307 13.4377 10.7962 13.6637 10.1333 13.7548C9.752 13.8072 9.0137 13.8334 7.9185 13.8333L4.4987 13.8333C3.4035 13.8334 2.6652 13.8072 2.2839 13.7548C1.621 13.6637 1.1102 13.4377 0.7516 13.0767C0.393 12.7157 0.1685 12.2015 0.078 11.5342C0.026 11.1504 -0 10.4072 0 9.3046L0 4.5287C-0 3.4262 0.026 2.683 0.078 2.2991C0.1685 1.6318 0.393 1.1176 0.7516 0.7566C1.1102 0.3956 1.621 0.1696 2.2839 0.0785C2.6652 0.0261 3.4035 -0 4.4987 0L6.6654 0C7.2155 0 7.5915 0.0086 7.7936 0.0257C8.1413 0.0551 8.4383 0.1278 8.6844 0.2439C8.9306 0.36 9.1762 0.543 9.4213 0.7931C9.5637 0.9384 9.811 1.2238 10.1631 1.6491L11.753 3.5697C12.0048 3.874 12.1653 4.0995 12.2342 4.2462C12.2596 4.3002 12.2824 4.3553 12.3027 4.4114C12.3235 4.469 12.3415 4.5275 12.3568 4.5868C12.3971 4.744 12.5 5.1039 12.5 5.5L11.8377 5.5ZM8.1126 1.2707L8.1126 2.2864C8.1126 2.9774 8.1269 3.4291 8.1557 3.6413C8.1867 3.8699 8.2451 4.0274 8.3308 4.1137C8.4165 4.2 8.5729 4.2587 8.8 4.2899C9.0109 4.3189 9.4595 4.3334 10.1459 4.3333L10.8765 4.3333L10.8626 4.3166L9.2728 2.396C8.7419 1.7548 8.382 1.3896 8.1928 1.3004C8.1706 1.2899 8.1438 1.28 8.1126 1.2707ZM3.069 9.5648L4.5791 11.075L5.4041 10.25L4.0707 8.9167L5.4041 7.5833L4.5791 6.7584L3.069 8.2685C2.89 8.4475 2.8005 8.6635 2.8005 8.9167C2.8005 9.1698 2.89 9.3859 3.069 9.5648ZM7.5 9.8375L8.4208 8.9167L7.0875 7.5833L7.9124 6.7584L9.344 8.1899C9.5447 8.3906 9.645 8.6329 9.645 8.9167C9.645 9.2005 9.5447 9.4427 9.344 9.6434L7.9124 11.075L7.0875 10.25L7.5 9.8375Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$184, ArtifactImageLineColorIcon;
var init_ArtifactImageLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$184 = require_jsx_runtime();
	ArtifactImageLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$184.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$184.jsx)("path", {
			fill: "#5A89CC",
			transform: "matrix(1 0 0 1 1.08333 1.75)",
			d: "M1.1667 5.5833L1.1667 4.5287C1.1666 3.479 1.1892 2.7884 1.2345 2.4569C1.2901 2.0491 1.4058 1.7574 1.5816 1.5816C1.7574 1.4058 2.0491 1.2901 2.4569 1.2345C2.7884 1.1892 3.479 1.1666 4.5287 1.1667L9.3047 1.1667C10.3544 1.1666 11.045 1.1892 11.3764 1.2345C11.7842 1.2901 12.076 1.4058 12.2517 1.5816C12.4275 1.7574 12.5432 2.0491 12.5988 2.4569C12.6441 2.7884 12.6667 3.479 12.6667 4.5287L12.6667 7.9713C12.6667 9.021 12.6441 9.7116 12.5988 10.0431C12.5432 10.4509 12.4275 10.7426 12.2517 10.9184C12.076 11.0942 11.7842 11.2099 11.3764 11.2655C11.045 11.3108 10.3544 11.3334 9.3047 11.3333L2.9167 11.3333C2.6316 11.3333 2.4581 11.3293 2.3964 11.3212C2.0802 11.2797 1.8086 11.1454 1.5816 10.9184C1.3546 10.6914 1.2203 10.4198 1.1788 10.1036C1.1716 10.0486 1.1676 9.9051 1.1668 9.6729C1.1675 9.5091 1.1703 9.4046 1.1753 9.3593C1.2078 9.0673 1.3202 8.8102 1.5127 8.5882C1.547 8.5486 1.6406 8.4581 1.7937 8.3167L3.0746 7.1328C3.2804 6.9443 3.5316 6.8448 3.8282 6.8341C4.1247 6.8235 4.3837 6.904 4.6051 7.0757C4.6268 7.0925 4.6443 7.1071 4.6576 7.1196C4.6583 7.1202 4.6865 7.1488 4.7422 7.2053C6.0025 8.4827 7.1396 9.3643 8.1535 9.8502C8.9413 10.2277 9.7558 10.2719 10.597 9.9828C11.0099 9.8409 11.3521 9.6568 11.6234 9.4307L10.8766 8.5345C10.715 8.669 10.4955 8.784 10.2179 8.8795C9.6781 9.065 9.158 9.0378 8.6576 8.7981C7.766 8.3708 6.7377 7.5668 5.5727 6.386C5.5062 6.3185 5.4669 6.2792 5.455 6.268C5.4153 6.2308 5.3702 6.1927 5.3199 6.1537C4.8757 5.8093 4.3646 5.6475 3.7865 5.6682C3.2036 5.6891 2.7036 5.8905 2.2866 6.2725L1.0019 7.4599C0.8171 7.6306 0.6935 7.752 0.631 7.8241C0.2801 8.2291 0.075 8.6979 0.0158 9.2304C0.0078 9.3026 0.0028 9.4203 0.0009 9.5833L0 9.5833C0 9.6138 0.0001 9.6433 0.0002 9.6719C0.0001 9.697 0 9.7231 0 9.75L0.0007 9.75C0.0028 9.9945 0.0099 10.163 0.0221 10.2554C0.098 10.8336 0.3428 11.3295 0.7566 11.7434C1.1705 12.1572 1.6664 12.402 2.2446 12.4779C2.3567 12.4926 2.5807 12.5 2.9167 12.5L9.3046 12.5C10.4072 12.5 11.1504 12.4739 11.5342 12.4215C12.2015 12.3304 12.7157 12.1044 13.0767 11.7434C13.4377 11.3824 13.6637 10.8682 13.7548 10.2009C13.8072 9.817 13.8334 9.0738 13.8333 7.9713L13.8333 4.5287C13.8334 3.4262 13.8072 2.683 13.7548 2.2991C13.6637 1.6318 13.4377 1.1176 13.0767 0.7566C12.7157 0.3956 12.2015 0.1696 11.5342 0.0785C11.1504 0.0261 10.4072 -0 9.3046 0L4.5287 0C3.4262 -0 2.683 0.0261 2.2991 0.0785C1.6318 0.1696 1.1176 0.3956 0.7566 0.7566C0.3956 1.1176 0.1696 1.6318 0.0785 2.2991C0.0261 2.683 -0 3.4262 0 4.5287L0 5.5833L1.1667 5.5833ZM10.9386 5.6053C11.3129 5.2311 11.5 4.7793 11.5 4.25C11.5 3.7207 11.3129 3.269 10.9386 2.8947C10.5644 2.5205 10.1126 2.3333 9.5833 2.3333C9.0541 2.3333 8.6023 2.5205 8.228 2.8947C7.8538 3.269 7.6667 3.7207 7.6667 4.25C7.6667 4.7793 7.8538 5.2311 8.2281 5.6053C8.6023 5.9795 9.0541 6.1667 9.5833 6.1667C10.1126 6.1667 10.5644 5.9795 10.9386 5.6053ZM10.1137 3.7197C10.2601 3.8661 10.3333 4.0429 10.3333 4.25C10.3333 4.4571 10.2601 4.6339 10.1137 4.7803C9.9672 4.9268 9.7905 5 9.5833 5C9.3762 5 9.1994 4.9268 9.053 4.7803C8.9066 4.6339 8.8333 4.4571 8.8333 4.25C8.8333 4.0429 8.9066 3.8661 9.053 3.7197C9.1994 3.5732 9.3762 3.5 9.5833 3.5C9.7904 3.5 9.9672 3.5732 10.1137 3.7197Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$183, ArtifactMarkdownLineColorIcon;
var init_ArtifactMarkdownLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$183 = require_jsx_runtime();
	ArtifactMarkdownLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$183.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$183.jsx)("path", {
			fill: "#4EA0A6",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM8.1667 10.9167L8.1667 8.2853L6.654 9.7375L6.25 10.1253L4.3333 8.2853L4.3333 10.9167L3.1667 10.9167L3.1667 7.2295C3.1667 7.2211 3.1666 7.2084 3.1665 7.1914C3.1635 6.8275 3.2953 6.5887 3.5618 6.4751C3.8284 6.3615 4.0919 6.4318 4.3523 6.686C4.3645 6.6979 4.3736 6.7067 4.3796 6.7125L6.25 8.508L8.1204 6.7125C8.1264 6.7067 8.1355 6.6978 8.1477 6.686C8.4081 6.4318 8.6716 6.3615 8.9382 6.4751C9.2047 6.5887 9.3365 6.8275 9.3335 7.1914C9.3334 7.2085 9.3333 7.2212 9.3333 7.2295L9.3333 10.9167L8.1667 10.9167Z",
			fillRule: "evenodd"
		})
	});
})), import_jsx_runtime$182, ArtifactPdfLineColorIcon;
var init_ArtifactPdfLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$182 = require_jsx_runtime();
	ArtifactPdfLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$182.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$182.jsx)("path", {
			fill: "#E07B85",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM6.5907 5.25L6.0618 5.3017L5.5322 5.2575L6.5907 5.25ZM9.2077 9.8623C9.3233 9.5978 9.2086 9.2962 8.9694 9.1346C8.5957 8.8822 8.1541 8.4876 7.7477 7.9704C7.2676 7.3595 6.862 6.6095 6.6764 5.7769C6.612 5.4878 6.3565 5.2729 6.0618 5.3017C5.7701 5.2773 5.5132 5.4893 5.474 5.7794C5.3831 6.4511 5.2075 7.2914 4.8743 8.1085C4.5119 8.9971 3.9777 9.8238 3.1957 10.3923C2.9687 10.5573 2.8703 10.8555 2.9932 11.1036C2.9973 11.1118 3.0015 11.1198 3.006 11.1279C3.1484 11.3811 3.4633 11.4739 3.7292 11.357C4.9386 10.8253 6.7796 10.381 8.6658 10.3726C8.9538 10.3713 9.1958 10.15 9.2077 9.8623ZM7.6097 9.3782C7.367 9.1483 7.1282 8.8882 6.9046 8.6037C6.6483 8.2776 6.4063 7.9123 6.1979 7.5136C6.1064 7.8354 5.9957 8.1651 5.8618 8.4934C5.686 8.9246 5.4674 9.3597 5.1957 9.7729C5.945 9.586 6.7648 9.4459 7.6097 9.3782ZM9.2077 9.8623C9.2308 9.8093 9.3143 9.8275 9.3012 9.8839C9.2882 9.9402 9.2053 9.92 9.2077 9.8623Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$181, ArtifactSheetLineColorIcon;
var init_ArtifactSheetLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$181 = require_jsx_runtime();
	ArtifactSheetLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$181.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$181.jsx)("path", {
			fill: "#50B36E",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M11.8377 5.5L10.146 5.5C9.407 5.5 8.9061 5.482 8.6433 5.4459C8.1584 5.3792 7.781 5.2102 7.5113 4.9386C7.2416 4.6671 7.0736 4.2872 7.0074 3.7991C6.9715 3.5345 6.9536 3.0302 6.9536 2.2864L6.9536 1.1686C6.8623 1.1673 6.7662 1.1667 6.6654 1.1667L4.4987 1.1667C3.4559 1.1666 2.7699 1.1892 2.4406 1.2345C2.0356 1.2901 1.7457 1.4058 1.5711 1.5816C1.3965 1.7574 1.2816 2.0491 1.2263 2.4569C1.1814 2.7884 1.1589 3.479 1.1589 4.5287L1.1589 9.3047C1.1589 10.3544 1.1814 11.045 1.2263 11.3764C1.2816 11.7842 1.3965 12.076 1.5711 12.2517C1.7457 12.4275 2.0356 12.5432 2.4406 12.5988C2.7699 12.6441 3.4559 12.6667 4.4987 12.6667L7.9185 12.6667C8.9613 12.6667 9.6473 12.6441 9.9766 12.5988C10.3817 12.5432 10.6715 12.4275 10.8461 12.2517C11.0207 12.076 11.1356 11.7842 11.1909 11.3764C11.2359 11.0449 11.2583 10.3544 11.2583 9.3047L11.2583 6.25L12.4172 6.25L12.4172 9.3046C12.4173 10.4072 12.3912 11.1504 12.3392 11.5342C12.2487 12.2015 12.0242 12.7157 11.6656 13.0767C11.307 13.4377 10.7962 13.6637 10.1333 13.7548C9.752 13.8072 9.0137 13.8334 7.9185 13.8333L4.4987 13.8333C3.4035 13.8334 2.6652 13.8072 2.2839 13.7548C1.621 13.6637 1.1102 13.4377 0.7516 13.0767C0.393 12.7157 0.1685 12.2015 0.078 11.5342C0.026 11.1504 -0 10.4072 0 9.3046L0 4.5287C-0 3.4262 0.026 2.683 0.078 2.2991C0.1685 1.6318 0.393 1.1176 0.7516 0.7566C1.1102 0.3956 1.621 0.1696 2.2839 0.0785C2.6652 0.0261 3.4035 -0 4.4987 0L6.6654 0C7.2155 0 7.5915 0.0086 7.7936 0.0257C8.1413 0.0551 8.4383 0.1278 8.6844 0.2439C8.9306 0.36 9.1762 0.543 9.4213 0.7931C9.5637 0.9384 9.811 1.2238 10.1631 1.6491L11.753 3.5697C12.0048 3.874 12.1653 4.0995 12.2342 4.2462C12.2596 4.3002 12.2824 4.3553 12.3027 4.4114C12.3235 4.469 12.3415 4.5275 12.3568 4.5868C12.3971 4.744 12.5 5.1039 12.5 5.5L11.8377 5.5ZM8.1126 1.2707L8.1126 2.2864C8.1126 2.9774 8.1269 3.4291 8.1557 3.6413C8.1867 3.8699 8.2451 4.0274 8.3308 4.1137C8.4165 4.2 8.5729 4.2587 8.8 4.2899C9.0109 4.3189 9.4595 4.3334 10.1459 4.3333L10.8765 4.3333L10.8626 4.3166L9.2728 2.396C8.7419 1.7548 8.382 1.3896 8.1928 1.3004C8.1706 1.2899 8.1438 1.28 8.1126 1.2707ZM5.7142 7.6667L2.8333 7.6667L2.8333 8.8333L5.7142 8.8333L5.7142 7.6667ZM9.7143 7.6667L6.8333 7.6667L6.8333 8.8333L9.7143 8.8333L9.7143 7.6667ZM2.8333 10L5.7142 10L5.7142 11.1667L2.8333 11.1667L2.8333 10ZM6.8333 10L9.7143 10L9.7143 11.1667L6.8333 11.1667L6.8333 10Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$180, ArtifactSlideLineColorIcon;
var init_ArtifactSlideLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$180 = require_jsx_runtime();
	ArtifactSlideLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$180.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$180.jsx)("path", {
			fill: "#EB9752",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM2.8433 7.5334C2.7811 7.6534 2.75 7.8478 2.75 8.1167L2.75 10.3833C2.75 10.6522 2.7811 10.8466 2.8433 10.9666C2.9245 11.1233 3.0434 11.2422 3.2 11.3234C3.32 11.3856 3.5145 11.4167 3.7833 11.4167L8.7167 11.4167C8.9855 11.4167 9.18 11.3856 9.3 11.3234C9.4566 11.2422 9.5755 11.1233 9.6567 10.9666C9.7189 10.8466 9.75 10.6522 9.75 10.3833L9.75 8.1167C9.75 7.8478 9.7189 7.6534 9.6567 7.5334C9.5755 7.3767 9.4566 7.2578 9.3 7.1766C9.18 7.1144 8.9855 7.0833 8.7167 7.0833L3.7833 7.0833C3.5145 7.0833 3.32 7.1144 3.2 7.1766C3.0434 7.2578 2.9245 7.3767 2.8433 7.5334ZM3.75 10.3833L3.75 8.1167C3.75 8.105 3.75 8.0939 3.75 8.0834C3.7606 8.0833 3.7717 8.0833 3.7833 8.0833L8.7167 8.0833C8.7283 8.0833 8.7394 8.0833 8.75 8.0834C8.75 8.0939 8.75 8.105 8.75 8.1167L8.75 10.3833C8.75 10.395 8.75 10.4061 8.75 10.4166C8.7394 10.4167 8.7283 10.4167 8.7167 10.4167L3.7833 10.4167C3.7717 10.4167 3.7606 10.4167 3.75 10.4166C3.75 10.4061 3.75 10.395 3.75 10.3833Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$179, ArtifactUnknownLineColorIcon;
var init_ArtifactUnknownLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$179 = require_jsx_runtime();
	ArtifactUnknownLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$179.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$179.jsx)("path", {
			fill: "#8C8C91",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M11.9167 5.5L10.2136 5.5C9.4698 5.5 8.9655 5.482 8.7009 5.4459C8.2128 5.3792 7.8329 5.2102 7.5614 4.9386C7.2898 4.6671 7.1208 4.2872 7.0541 3.7991C7.018 3.5345 7 3.0302 7 2.2864L7 1.1686C6.908 1.1673 6.8113 1.1667 6.7098 1.1667L4.5287 1.1667C3.479 1.1666 2.7884 1.1892 2.4569 1.2345C2.0491 1.2901 1.7574 1.4058 1.5816 1.5816C1.4058 1.7574 1.2901 2.0491 1.2345 2.4569C1.1892 2.7884 1.1666 3.479 1.1667 4.5287L1.1667 9.3047C1.1666 10.3544 1.1892 11.045 1.2345 11.3764C1.2901 11.7842 1.4058 12.076 1.5816 12.2517C1.7574 12.4275 2.0491 12.5432 2.4569 12.5988C2.7884 12.6441 3.479 12.6667 4.5287 12.6667L7.9713 12.6667C9.021 12.6667 9.7116 12.6441 10.0431 12.5988C10.4509 12.5432 10.7426 12.4275 10.9184 12.2517C11.0942 12.076 11.2099 11.7842 11.2655 11.3764C11.3108 11.0449 11.3334 10.3544 11.3333 9.3047L11.3333 6.25L12.5 6.25L12.5 9.3046C12.5 10.4072 12.4739 11.1504 12.4215 11.5342C12.3304 12.2015 12.1044 12.7157 11.7434 13.0767C11.3824 13.4377 10.8682 13.6637 10.2009 13.7548C9.817 13.8072 9.0738 13.8334 7.9713 13.8333L4.5287 13.8333C3.4262 13.8334 2.683 13.8072 2.2991 13.7548C1.6318 13.6637 1.1176 13.4377 0.7566 13.0767C0.3956 12.7157 0.1696 12.2015 0.0785 11.5342C0.0261 11.1504 -0 10.4072 0 9.3046L0 4.5287C-0 3.4262 0.0261 2.683 0.0785 2.2991C0.1696 1.6318 0.3956 1.1176 0.7566 0.7566C1.1176 0.3956 1.6318 0.1696 2.2991 0.0785C2.683 0.0261 3.4262 -0 4.5287 0L6.7098 0C7.2636 0 7.6421 0.0086 7.8456 0.0257C8.1956 0.0551 8.4945 0.1278 8.7423 0.2439C8.9901 0.36 9.2374 0.543 9.4841 0.7931C9.6274 0.9384 9.8764 1.2238 10.2309 1.6491L11.8313 3.5697C12.0849 3.874 12.2464 4.0995 12.3158 4.2462C12.3413 4.3002 12.3643 4.3553 12.3847 4.4114C12.4057 4.469 12.4238 4.5275 12.4391 4.5868C12.4797 4.744 12.5 5.1039 12.5 5.5L11.9167 5.5ZM8.1667 1.2707L8.1667 2.2864C8.1666 2.9774 8.1811 3.4291 8.2101 3.6413C8.2413 3.8699 8.3 4.0274 8.3863 4.1137C8.4726 4.2 8.6301 4.2587 8.8587 4.2899C9.0709 4.3189 9.5226 4.3334 10.2136 4.3333L10.949 4.3333C10.9443 4.3277 10.9397 4.3222 10.9351 4.3166L9.3346 2.396C8.8002 1.7548 8.4378 1.3896 8.2475 1.3004C8.225 1.2899 8.1981 1.28 8.1667 1.2707Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$178, ArtifactVideoLineColorIcon;
var init_ArtifactVideoLineColorIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$178 = require_jsx_runtime();
	ArtifactVideoLineColorIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$178.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$178.jsx)("path", {
			fill: "#50B36E",
			transform: "matrix(1 0 0 1 1.08333 1.75)",
			d: "M13.8333 6.75L13.8333 7.9713C13.8334 9.0738 13.8072 9.817 13.7548 10.2009C13.6637 10.8682 13.4377 11.3824 13.0767 11.7434C12.7157 12.1044 12.2015 12.3304 11.5342 12.4215C11.1504 12.4739 10.4072 12.5 9.3046 12.5L4.5287 12.5C3.4262 12.5 2.683 12.4739 2.2991 12.4215C1.6318 12.3304 1.1176 12.1044 0.7566 11.7434C0.3956 11.3824 0.1696 10.8682 0.0785 10.2009C0.0261 9.817 -0 9.0738 0 7.9713L0 4.5287C-0 3.4262 0.0261 2.683 0.0785 2.2991C0.1696 1.6318 0.3956 1.1176 0.7566 0.7566C1.1176 0.3956 1.6318 0.1696 2.2991 0.0785C2.683 0.0261 3.4262 -0 4.5287 0L9.3046 0C10.4072 -0 11.1504 0.0261 11.5342 0.0785C12.2015 0.1696 12.7157 0.3956 13.0767 0.7566C13.4377 1.1176 13.6637 1.6318 13.7548 2.2991C13.8072 2.683 13.8334 3.4262 13.8333 4.5287L13.8333 5.25L12.6667 5.25L12.6667 4.5287C12.6667 3.479 12.6441 2.7884 12.5988 2.4569C12.5432 2.0491 12.4275 1.7574 12.2517 1.5816C12.076 1.4058 11.7842 1.2901 11.3764 1.2345C11.045 1.1892 10.3544 1.1666 9.3047 1.1667L4.5287 1.1667C3.479 1.1666 2.7884 1.1892 2.4569 1.2345C2.0491 1.2901 1.7574 1.4058 1.5816 1.5816C1.4058 1.7574 1.2901 2.0491 1.2345 2.4569C1.1892 2.7884 1.1666 3.479 1.1667 4.5287L1.1667 7.9713C1.1666 9.021 1.1892 9.7116 1.2345 10.0431C1.2901 10.4509 1.4058 10.7426 1.5816 10.9184C1.7574 11.0942 2.0491 11.2099 2.4569 11.2655C2.7884 11.3108 3.479 11.3334 4.5287 11.3333L9.3047 11.3333C10.3544 11.3334 11.045 11.3108 11.3764 11.2655C11.7842 11.2099 12.076 11.0942 12.2517 10.9184C12.4275 10.7426 12.5432 10.4509 12.5988 10.0431C12.6441 9.7116 12.6667 9.021 12.6667 7.9713L12.6667 6.75L13.8333 6.75ZM5.1667 8.25L5.1667 4.25C5.1666 4.1971 5.1737 4.1452 5.1878 4.0943C5.2019 4.0433 5.2225 3.9952 5.2498 3.9499C5.3296 3.8077 5.4492 3.7191 5.6085 3.6841C5.7655 3.64 5.9127 3.6619 6.0501 3.7498L9.3835 5.7498C9.4245 5.7744 9.462 5.8036 9.4958 5.8375C9.5297 5.8713 9.5589 5.9088 9.5835 5.9499C9.6714 6.0873 9.6933 6.2345 9.6493 6.3915C9.6143 6.5508 9.5257 6.6704 9.3835 6.7502L6.0501 8.7502C6.0048 8.7775 5.9567 8.7981 5.9057 8.8122C5.8548 8.8263 5.8029 8.8334 5.75 8.8333C5.587 8.838 5.4495 8.7811 5.3375 8.6625C5.2189 8.5505 5.162 8.413 5.1667 8.25Z",
			"fill-rule": "evenodd"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/artifact-file-icons/line-color/index.ts
var init_line_color = __esmMin((() => {
	init_ArtifactAudioLineColorIcon();
	init_ArtifactDocLineColorIcon();
	init_ArtifactDrawioLineColorIcon();
	init_ArtifactFolderLineColorIcon();
	init_ArtifactHtmlLineColorIcon();
	init_ArtifactImageLineColorIcon();
	init_ArtifactMarkdownLineColorIcon();
	init_ArtifactPdfLineColorIcon();
	init_ArtifactSheetLineColorIcon();
	init_ArtifactSlideLineColorIcon();
	init_ArtifactUnknownLineColorIcon();
	init_ArtifactVideoLineColorIcon();
})), import_jsx_runtime$177, ArtifactAudioLineMonoIcon;
var init_ArtifactAudioLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$177 = require_jsx_runtime();
	ArtifactAudioLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$177.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$177.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.08333 1.75)",
			d: "M13.8333 6.75L13.8333 7.9713C13.8334 9.0738 13.8072 9.817 13.7548 10.2009C13.6637 10.8682 13.4377 11.3824 13.0767 11.7434C12.7157 12.1044 12.2015 12.3304 11.5342 12.4215C11.1504 12.4739 10.4072 12.5 9.3046 12.5L4.5287 12.5C3.4262 12.5 2.683 12.4739 2.2991 12.4215C1.6318 12.3304 1.1176 12.1044 0.7566 11.7434C0.3956 11.3824 0.1696 10.8682 0.0785 10.2009C0.0261 9.817 -0 9.0738 0 7.9713L0 4.5287C-0 3.4262 0.0261 2.683 0.0785 2.2991C0.1696 1.6318 0.3956 1.1176 0.7566 0.7566C1.1176 0.3956 1.6318 0.1696 2.2991 0.0785C2.683 0.0261 3.4262 -0 4.5287 0L9.3046 0C10.4072 -0 11.1504 0.0261 11.5342 0.0785C12.2015 0.1696 12.7157 0.3956 13.0767 0.7566C13.4377 1.1176 13.6637 1.6318 13.7548 2.2991C13.8072 2.683 13.8334 3.4262 13.8333 4.5287L13.8333 5.25L12.6667 5.25L12.6667 4.5287C12.6667 3.479 12.6441 2.7884 12.5988 2.4569C12.5432 2.0491 12.4275 1.7574 12.2517 1.5816C12.076 1.4058 11.7842 1.2901 11.3764 1.2345C11.045 1.1892 10.3544 1.1666 9.3047 1.1667L4.5287 1.1667C3.479 1.1666 2.7884 1.1892 2.4569 1.2345C2.0491 1.2901 1.7574 1.4058 1.5816 1.5816C1.4058 1.7574 1.2901 2.0491 1.2345 2.4569C1.1892 2.7884 1.1666 3.479 1.1667 4.5287L1.1667 7.9713C1.1666 9.021 1.1892 9.7116 1.2345 10.0431C1.2901 10.4509 1.4058 10.7426 1.5816 10.9184C1.7574 11.0942 2.0491 11.2099 2.4569 11.2655C2.7884 11.3108 3.479 11.3334 4.5287 11.3333L9.3047 11.3333C10.3544 11.3334 11.045 11.3108 11.3764 11.2655C11.7842 11.2099 12.076 11.0942 12.2517 10.9184C12.4275 10.7426 12.5432 10.4509 12.5988 10.0431C12.6441 9.7116 12.6667 9.021 12.6667 7.9713L12.6667 6.75L13.8333 6.75ZM8.4 4.3049L8.4 6.5851C8.3889 6.5845 8.3778 6.5841 8.3667 6.5838C8.3556 6.5835 8.3445 6.5833 8.3333 6.5833C7.9882 6.5833 7.6935 6.7054 7.4495 6.9495C7.2054 7.1935 7.0833 7.4882 7.0833 7.8333C7.0833 8.1785 7.2054 8.4731 7.4495 8.7172C7.6935 8.9613 7.9882 9.0833 8.3333 9.0833C8.6785 9.0833 8.9731 8.9613 9.2172 8.7172C9.4613 8.4731 9.5833 8.1785 9.5833 7.8333C9.5833 7.7993 9.5819 7.7652 9.5792 7.7313C9.5764 7.6973 9.5722 7.6635 9.5667 7.6299L9.5667 4.3049C9.5667 4.2867 9.5667 4.26 9.5668 4.2248C9.5673 3.9918 9.5595 3.8255 9.5433 3.726C9.5013 3.4672 9.3869 3.2677 9.2003 3.1277C9.0136 2.9876 8.7902 2.9335 8.53 2.9654C8.4298 2.9777 8.268 3.0166 8.0445 3.0822C8.0107 3.0921 7.9851 3.0996 7.9675 3.1047L5.9675 3.6865C5.6116 3.79 5.3725 3.9233 5.2502 4.0863C5.1278 4.2493 5.0667 4.5161 5.0667 4.8867L5.0667 7.2518C5.0556 7.2512 5.0445 7.2507 5.0334 7.2505C5.0222 7.2501 5.0111 7.25 5 7.25C4.6548 7.25 4.3602 7.372 4.1161 7.6161C3.872 7.8602 3.75 8.1548 3.75 8.5C3.75 8.8452 3.872 9.1398 4.1161 9.3839C4.3602 9.628 4.6548 9.75 5 9.75C5.297 9.75 5.5605 9.6561 5.7906 9.4683C6.0206 9.2804 6.1653 9.041 6.2247 8.75L6.2333 8.75L6.2333 8.7034C6.2389 8.6698 6.243 8.636 6.2458 8.6021C6.2486 8.5681 6.25 8.5341 6.25 8.5C6.25 8.4659 6.2486 8.4319 6.2458 8.3979C6.243 8.364 6.2389 8.3302 6.2333 8.2966L6.2333 4.8867C6.2333 4.8642 6.2334 4.8434 6.2335 4.8243C6.2518 4.8189 6.2718 4.813 6.2934 4.8067L8.2934 4.2249C8.3118 4.2195 8.3382 4.2118 8.3728 4.2017C8.3821 4.1989 8.3913 4.1963 8.4002 4.1937C8.4002 4.2029 8.4001 4.2124 8.4001 4.2221C8.4 4.2584 8.4 4.286 8.4 4.3049Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$176, ArtifactDocLineMonoIcon;
var init_ArtifactDocLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$176 = require_jsx_runtime();
	ArtifactDocLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$176.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$176.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M12.5 9.3046L12.5 6.25L12.4172 6.25L11.3333 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6529 12.6433 8.9845 12.6659 7.9713 12.6667L7.9346 12.6667L7.9185 12.6667L4.5287 12.6667L4.4987 12.6667C3.4658 12.6663 2.7852 12.6437 2.4569 12.5988C2.0491 12.5432 1.7574 12.4275 1.5816 12.2517C1.4058 12.076 1.2901 11.7842 1.2345 11.3764C1.1892 11.045 1.1666 10.3544 1.1667 9.3047L1.1667 4.5287C1.1666 3.479 1.1892 2.7884 1.2345 2.4569C1.2901 2.0491 1.4058 1.7574 1.5816 1.5816C1.7574 1.4058 2.0491 1.2901 2.4569 1.2345C2.7852 1.1897 3.4658 1.1671 4.4987 1.1667L4.5165 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0303 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5L11.8377 5.5L11.9167 5.5L12.5 5.5C12.5 5.472 12.4995 5.4442 12.4985 5.4167L12.5 5.4167C12.5 5.0206 12.4797 4.744 12.4391 4.5868C12.4238 4.5275 12.4057 4.469 12.3847 4.4114C12.3643 4.3553 12.3413 4.3002 12.3158 4.2462C12.2464 4.0995 12.0849 3.874 11.8313 3.5697L10.2309 1.6491C9.8764 1.2238 9.6274 0.9384 9.4841 0.7931C9.2374 0.543 8.9901 0.36 8.7423 0.2439C8.4945 0.1278 8.1956 0.0551 7.8456 0.0257C7.6421 0.0086 7.2636 -0 6.7098 0L4.5287 0L4.5169 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333L7.934 13.8333L7.9713 13.8333C9.0738 13.8334 9.817 13.8072 10.2009 13.7548C10.8682 13.6637 11.3824 13.4377 11.7434 13.0767C12.1044 12.7157 12.3304 12.2015 12.4215 11.5342C12.4739 11.1504 12.5 10.4072 12.5 9.3046ZM8.1667 1.2892L8.1667 2.2864C8.1666 2.9774 8.1811 3.4291 8.2101 3.6413C8.2413 3.8699 8.3 4.0274 8.3863 4.1137C8.4726 4.2 8.6301 4.2587 8.8587 4.2899C9.0709 4.3189 9.5226 4.3334 10.2136 4.3333L10.8765 4.3333L10.8626 4.3166L9.2728 2.396C8.7419 1.7548 8.382 1.3896 8.1928 1.3004C8.1847 1.2966 8.176 1.2928 8.1667 1.2892ZM6.6667 7.6667L2.8333 7.6667L2.8333 8.8333L6.6667 8.8333L6.6667 7.6667ZM2.8333 10L9.3333 10L9.3333 11.1667L2.8333 11.1667L2.8333 10Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$175, ArtifactDrawioLineMonoIcon;
var init_ArtifactDrawioLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$175 = require_jsx_runtime();
	ArtifactDrawioLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$175.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$175.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM4.8288 6.9166C4.8288 6.6862 4.8288 6.571 4.8539 6.4763C4.923 6.2159 5.128 6.0108 5.3885 5.9417C5.4832 5.9166 5.5984 5.9166 5.8288 5.9166L6.8421 5.9166C7.0725 5.9166 7.1877 5.9166 7.2824 5.9417C7.5429 6.0108 7.7479 6.2159 7.817 6.4763C7.8421 6.571 7.8421 6.6862 7.8421 6.9166C7.8421 7.147 7.8421 7.2622 7.817 7.3569C7.7503 7.6086 7.5565 7.8086 7.3084 7.8841L8.3268 9.4949L8.7256 9.4949C8.956 9.4949 9.0712 9.4949 9.1659 9.52C9.4263 9.5891 9.6314 9.7941 9.7005 10.0546C9.7256 10.1493 9.7256 10.2645 9.7256 10.4949C9.7256 10.7253 9.7256 10.8405 9.7005 10.9352C9.6314 11.1956 9.4263 11.4007 9.1659 11.4698C9.0712 11.4949 8.956 11.4949 8.7256 11.4949L7.7122 11.4949C7.4819 11.4949 7.3667 11.4949 7.272 11.4698C7.0115 11.4007 6.8064 11.1956 6.7374 10.9352C6.7122 10.8405 6.7122 10.7253 6.7122 10.4949C6.7122 10.2645 6.7122 10.1493 6.7374 10.0546C6.8064 9.7941 7.0115 9.5891 7.272 9.52C7.3185 9.5076 7.37 9.5014 7.4376 9.4982L6.4377 7.9166L6.2299 7.9166L5.232 9.4982C5.2993 9.5014 5.3506 9.5077 5.397 9.52C5.6574 9.5891 5.8625 9.7941 5.9316 10.0546C5.9567 10.1493 5.9567 10.2645 5.9567 10.4949C5.9567 10.7253 5.9567 10.8405 5.9316 10.9352C5.8625 11.1956 5.6574 11.4007 5.397 11.4698C5.3023 11.4949 5.1871 11.4949 4.9567 11.4949L3.9434 11.4949C3.713 11.4949 3.5978 11.4949 3.5031 11.4698C3.2426 11.4007 3.0375 11.1956 2.9685 10.9352C2.9434 10.8405 2.9434 10.7253 2.9434 10.4949C2.9434 10.2645 2.9434 10.1493 2.9685 10.0546C3.0375 9.7941 3.2426 9.5891 3.5031 9.52C3.5978 9.4949 3.713 9.4949 3.9434 9.4949L4.3433 9.4949L5.3601 7.8833C5.1132 7.8073 4.9204 7.6078 4.8539 7.3569C4.8288 7.2622 4.8288 7.147 4.8288 6.9166Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$174, ArtifactFolderLineMonoIcon;
var init_ArtifactFolderLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$174 = require_jsx_runtime();
	ArtifactFolderLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$174.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$174.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.08333 1.58333)",
			d: "M6.281 1.5222C6.6311 1.7593 6.8847 2.0741 7.0417 2.4666L8.1249 2.0334C7.8793 1.4193 7.4827 0.9269 6.9351 0.5562C6.3874 0.1854 5.7829 0 5.1216 0L4.0136 0C3.2588 0 2.7625 0.0271 2.5247 0.0814C1.9182 0.2197 1.3939 0.5099 0.9519 0.9519C0.5099 1.3939 0.2197 1.9182 0.0814 2.5247C0.0271 2.7625 0 3.2588 0 4.0136L0 8.25L0 8.3046C-0 9.4072 0.0261 10.1504 0.0785 10.5342C0.1696 11.2015 0.3956 11.7157 0.7566 12.0767C1.1176 12.4377 1.6318 12.6637 2.2991 12.7548C2.683 12.8072 3.4262 12.8334 4.5287 12.8333L4.5833 12.8333L9.25 12.8333L9.3046 12.8333C10.4072 12.8334 11.1504 12.8072 11.5342 12.7548C12.2015 12.6637 12.7157 12.4377 13.0767 12.0767C13.4377 11.7157 13.6637 11.2015 13.7548 10.5342C13.8072 10.1504 13.8334 9.4072 13.8333 8.3046L13.8333 8.25L13.8333 7.9167L13.8333 7.903L13.8333 7.8893L13.8333 7.8757L13.8333 7.8621C13.8334 6.7595 13.8072 6.0163 13.7548 5.6325C13.6637 4.9651 13.4377 4.451 13.0767 4.09C12.7157 3.729 12.2015 3.5029 11.5342 3.4119C11.1504 3.3595 10.4072 3.3333 9.3046 3.3333L9.25 3.3333L3.25 3.3333L3.25 4.5L9.25 4.5L9.3047 4.5C10.3544 4.5 11.045 4.5226 11.3764 4.5678C11.7842 4.6235 12.076 4.7392 12.2517 4.9149C12.4275 5.0907 12.5432 5.3825 12.5988 5.7903C12.6441 6.1217 12.6667 6.8123 12.6667 7.862L12.6667 7.8756L12.6667 7.8893L12.6667 7.903L12.6667 7.9167L12.6667 8.25L12.6667 8.3047C12.6667 9.3544 12.6441 10.045 12.5988 10.3764C12.5432 10.7842 12.4275 11.076 12.2517 11.2517C12.076 11.4275 11.7842 11.5432 11.3764 11.5988C11.045 11.6441 10.3544 11.6667 9.3047 11.6667L9.25 11.6667L4.5833 11.6667L4.5287 11.6667C3.479 11.6667 2.7884 11.6441 2.4569 11.5988C2.0491 11.5432 1.7574 11.4275 1.5816 11.2517C1.4058 11.076 1.2901 10.7842 1.2345 10.3764C1.1892 10.045 1.1666 9.3544 1.1667 8.3047L1.1667 8.25L1.1667 4.0136C1.1667 3.3464 1.184 2.9366 1.2188 2.7842C1.3073 2.3962 1.4933 2.0604 1.7769 1.7769C2.0604 1.4933 2.3962 1.3073 2.7842 1.2188C2.9366 1.184 3.3464 1.1667 4.0136 1.1667L5.1216 1.1667C5.5444 1.1667 5.9309 1.2852 6.281 1.5222Z"
		})
	});
})), import_jsx_runtime$173, ArtifactHtmlLineMonoIcon;
var init_ArtifactHtmlLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$173 = require_jsx_runtime();
	ArtifactHtmlLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$173.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$173.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M11.8377 5.5L10.146 5.5C9.407 5.5 8.9061 5.482 8.6433 5.4459C8.1584 5.3792 7.781 5.2102 7.5113 4.9386C7.2416 4.6671 7.0736 4.2872 7.0074 3.7991C6.9715 3.5345 6.9536 3.0302 6.9536 2.2864L6.9536 1.1686C6.8623 1.1673 6.7662 1.1667 6.6654 1.1667L4.4987 1.1667C3.4559 1.1666 2.7699 1.1892 2.4406 1.2345C2.0356 1.2901 1.7457 1.4058 1.5711 1.5816C1.3965 1.7574 1.2816 2.0491 1.2263 2.4569C1.1814 2.7884 1.1589 3.479 1.1589 4.5287L1.1589 9.3047C1.1589 10.3544 1.1814 11.045 1.2263 11.3764C1.2816 11.7842 1.3965 12.076 1.5711 12.2517C1.7457 12.4275 2.0356 12.5432 2.4406 12.5988C2.7699 12.6441 3.4559 12.6667 4.4987 12.6667L7.9185 12.6667C8.9613 12.6667 9.6473 12.6441 9.9766 12.5988C10.3817 12.5432 10.6715 12.4275 10.8461 12.2517C11.0207 12.076 11.1356 11.7842 11.1909 11.3764C11.2359 11.0449 11.2583 10.3544 11.2583 9.3047L11.2583 6.25L12.4172 6.25L12.4172 9.3046C12.4173 10.4072 12.3912 11.1504 12.3392 11.5342C12.2487 12.2015 12.0242 12.7157 11.6656 13.0767C11.307 13.4377 10.7962 13.6637 10.1333 13.7548C9.752 13.8072 9.0137 13.8334 7.9185 13.8333L4.4987 13.8333C3.4035 13.8334 2.6652 13.8072 2.2839 13.7548C1.621 13.6637 1.1102 13.4377 0.7516 13.0767C0.393 12.7157 0.1685 12.2015 0.078 11.5342C0.026 11.1504 -0 10.4072 0 9.3046L0 4.5287C-0 3.4262 0.026 2.683 0.078 2.2991C0.1685 1.6318 0.393 1.1176 0.7516 0.7566C1.1102 0.3956 1.621 0.1696 2.2839 0.0785C2.6652 0.0261 3.4035 -0 4.4987 0L6.6654 0C7.2155 0 7.5915 0.0086 7.7936 0.0257C8.1413 0.0551 8.4383 0.1278 8.6844 0.2439C8.9306 0.36 9.1762 0.543 9.4213 0.7931C9.5637 0.9384 9.811 1.2238 10.1631 1.6491L11.753 3.5697C12.0048 3.874 12.1653 4.0995 12.2342 4.2462C12.2596 4.3002 12.2824 4.3553 12.3027 4.4114C12.3235 4.469 12.3415 4.5275 12.3568 4.5868C12.3971 4.744 12.5 5.1039 12.5 5.5L11.8377 5.5ZM8.1126 1.2707L8.1126 2.2864C8.1126 2.9774 8.1269 3.4291 8.1557 3.6413C8.1867 3.8699 8.2451 4.0274 8.3308 4.1137C8.4165 4.2 8.5729 4.2587 8.8 4.2899C9.0109 4.3189 9.4595 4.3334 10.1459 4.3333L10.8765 4.3333L10.8626 4.3166L9.2728 2.396C8.7419 1.7548 8.382 1.3896 8.1928 1.3004C8.1706 1.2899 8.1438 1.28 8.1126 1.2707ZM3.069 9.5648L4.5791 11.075L5.4041 10.25L4.0707 8.9167L5.4041 7.5833L4.5791 6.7584L3.069 8.2685C2.89 8.4475 2.8005 8.6635 2.8005 8.9167C2.8005 9.1698 2.89 9.3859 3.069 9.5648ZM7.5 9.8375L8.4208 8.9167L7.0875 7.5833L7.9124 6.7584L9.344 8.1899C9.5447 8.3906 9.645 8.6329 9.645 8.9167C9.645 9.2005 9.5447 9.4427 9.344 9.6434L7.9124 11.075L7.0875 10.25L7.5 9.8375Z",
			fillRule: "evenodd"
		})
	});
})), import_jsx_runtime$172, ArtifactImageLineMonoIcon;
var init_ArtifactImageLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$172 = require_jsx_runtime();
	ArtifactImageLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$172.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$172.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.08333 1.75)",
			d: "M1.1667 5.5833L1.1667 4.5287C1.1666 3.479 1.1892 2.7884 1.2345 2.4569C1.2901 2.0491 1.4058 1.7574 1.5816 1.5816C1.7574 1.4058 2.0491 1.2901 2.4569 1.2345C2.7884 1.1892 3.479 1.1666 4.5287 1.1667L9.3047 1.1667C10.3544 1.1666 11.045 1.1892 11.3764 1.2345C11.7842 1.2901 12.076 1.4058 12.2517 1.5816C12.4275 1.7574 12.5432 2.0491 12.5988 2.4569C12.6441 2.7884 12.6667 3.479 12.6667 4.5287L12.6667 7.9713C12.6667 9.021 12.6441 9.7116 12.5988 10.0431C12.5432 10.4509 12.4275 10.7426 12.2517 10.9184C12.076 11.0942 11.7842 11.2099 11.3764 11.2655C11.045 11.3108 10.3544 11.3334 9.3047 11.3333L2.9167 11.3333C2.6316 11.3333 2.4581 11.3293 2.3964 11.3212C2.0802 11.2797 1.8086 11.1454 1.5816 10.9184C1.3546 10.6914 1.2203 10.4198 1.1788 10.1036C1.1716 10.0486 1.1676 9.9051 1.1668 9.6729C1.1675 9.5091 1.1703 9.4046 1.1753 9.3593C1.2078 9.0673 1.3202 8.8102 1.5127 8.5882C1.547 8.5486 1.6406 8.4581 1.7937 8.3167L3.0746 7.1328C3.2804 6.9443 3.5316 6.8448 3.8282 6.8341C4.1247 6.8235 4.3837 6.904 4.6051 7.0757C4.6268 7.0925 4.6443 7.1071 4.6576 7.1196C4.6583 7.1202 4.6865 7.1488 4.7422 7.2053C6.0025 8.4827 7.1396 9.3643 8.1535 9.8502C8.9413 10.2277 9.7558 10.2719 10.597 9.9828C11.0099 9.8409 11.3521 9.6568 11.6234 9.4307L10.8766 8.5345C10.715 8.669 10.4955 8.784 10.2179 8.8795C9.6781 9.065 9.158 9.0378 8.6576 8.7981C7.766 8.3708 6.7377 7.5668 5.5727 6.386C5.5062 6.3185 5.4669 6.2792 5.455 6.268C5.4153 6.2308 5.3702 6.1927 5.3199 6.1537C4.8757 5.8093 4.3646 5.6475 3.7865 5.6682C3.2036 5.6891 2.7036 5.8905 2.2866 6.2725L1.0019 7.4599C0.8171 7.6306 0.6935 7.752 0.631 7.8241C0.2801 8.2291 0.075 8.6979 0.0158 9.2304C0.0078 9.3026 0.0028 9.4203 0.0009 9.5833L0 9.5833C0 9.6138 0.0001 9.6433 0.0002 9.6719C0.0001 9.697 0 9.7231 0 9.75L0.0007 9.75C0.0028 9.9945 0.0099 10.163 0.0221 10.2554C0.098 10.8336 0.3428 11.3295 0.7566 11.7434C1.1705 12.1572 1.6664 12.402 2.2446 12.4779C2.3567 12.4926 2.5807 12.5 2.9167 12.5L9.3046 12.5C10.4072 12.5 11.1504 12.4739 11.5342 12.4215C12.2015 12.3304 12.7157 12.1044 13.0767 11.7434C13.4377 11.3824 13.6637 10.8682 13.7548 10.2009C13.8072 9.817 13.8334 9.0738 13.8333 7.9713L13.8333 4.5287C13.8334 3.4262 13.8072 2.683 13.7548 2.2991C13.6637 1.6318 13.4377 1.1176 13.0767 0.7566C12.7157 0.3956 12.2015 0.1696 11.5342 0.0785C11.1504 0.0261 10.4072 -0 9.3046 0L4.5287 0C3.4262 -0 2.683 0.0261 2.2991 0.0785C1.6318 0.1696 1.1176 0.3956 0.7566 0.7566C0.3956 1.1176 0.1696 1.6318 0.0785 2.2991C0.0261 2.683 -0 3.4262 0 4.5287L0 5.5833L1.1667 5.5833ZM10.9386 5.6053C11.3129 5.2311 11.5 4.7793 11.5 4.25C11.5 3.7207 11.3129 3.269 10.9386 2.8947C10.5644 2.5205 10.1126 2.3333 9.5833 2.3333C9.0541 2.3333 8.6023 2.5205 8.228 2.8947C7.8538 3.269 7.6667 3.7207 7.6667 4.25C7.6667 4.7793 7.8538 5.2311 8.2281 5.6053C8.6023 5.9795 9.0541 6.1667 9.5833 6.1667C10.1126 6.1667 10.5644 5.9795 10.9386 5.6053ZM10.1137 3.7197C10.2601 3.8661 10.3333 4.0429 10.3333 4.25C10.3333 4.4571 10.2601 4.6339 10.1137 4.7803C9.9672 4.9268 9.7905 5 9.5833 5C9.3762 5 9.1994 4.9268 9.053 4.7803C8.9066 4.6339 8.8333 4.4571 8.8333 4.25C8.8333 4.0429 8.9066 3.8661 9.053 3.7197C9.1994 3.5732 9.3762 3.5 9.5833 3.5C9.7904 3.5 9.9672 3.5732 10.1137 3.7197Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$171, ArtifactMarkdownLineMonoIcon;
var init_ArtifactMarkdownLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$171 = require_jsx_runtime();
	ArtifactMarkdownLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$171.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$171.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM8.1667 10.9167L8.1667 8.2853L6.654 9.7375L6.25 10.1253L4.3333 8.2853L4.3333 10.9167L3.1667 10.9167L3.1667 7.2295C3.1667 7.2211 3.1666 7.2084 3.1665 7.1914C3.1635 6.8275 3.2953 6.5887 3.5618 6.4751C3.8284 6.3615 4.0919 6.4318 4.3523 6.686C4.3645 6.6979 4.3736 6.7067 4.3796 6.7125L6.25 8.508L8.1204 6.7125C8.1264 6.7067 8.1355 6.6978 8.1477 6.686C8.4081 6.4318 8.6716 6.3615 8.9382 6.4751C9.2047 6.5887 9.3365 6.8275 9.3335 7.1914C9.3334 7.2085 9.3333 7.2212 9.3333 7.2295L9.3333 10.9167L8.1667 10.9167Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$170, ArtifactPdfLineMonoIcon;
var init_ArtifactPdfLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$170 = require_jsx_runtime();
	ArtifactPdfLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$170.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$170.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM6.5907 5.25L6.0618 5.3017L5.5322 5.2575L6.5907 5.25ZM9.2077 9.8623C9.3233 9.5978 9.2086 9.2962 8.9694 9.1346C8.5957 8.8822 8.1541 8.4876 7.7477 7.9704C7.2676 7.3595 6.862 6.6095 6.6764 5.7769C6.612 5.4878 6.3565 5.2729 6.0618 5.3017C5.7701 5.2773 5.5132 5.4893 5.474 5.7794C5.3831 6.4511 5.2075 7.2914 4.8743 8.1085C4.5119 8.9971 3.9777 9.8238 3.1957 10.3923C2.9687 10.5573 2.8703 10.8555 2.9932 11.1036C2.9973 11.1118 3.0015 11.1198 3.006 11.1279C3.1484 11.3811 3.4633 11.4739 3.7292 11.357C4.9386 10.8253 6.7796 10.381 8.6658 10.3726C8.9538 10.3713 9.1958 10.15 9.2077 9.8623ZM7.6097 9.3782C7.367 9.1483 7.1282 8.8882 6.9046 8.6037C6.6483 8.2776 6.4063 7.9123 6.1979 7.5136C6.1064 7.8354 5.9957 8.1651 5.8618 8.4934C5.686 8.9246 5.4674 9.3597 5.1957 9.7729C5.945 9.586 6.7648 9.4459 7.6097 9.3782ZM9.2077 9.8623C9.2308 9.8093 9.3143 9.8275 9.3012 9.8839C9.2882 9.9402 9.2053 9.92 9.2077 9.8623Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$169, ArtifactSheetLineMonoIcon;
var init_ArtifactSheetLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$169 = require_jsx_runtime();
	ArtifactSheetLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$169.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$169.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M11.8377 5.5L10.146 5.5C9.407 5.5 8.9061 5.482 8.6433 5.4459C8.1584 5.3792 7.781 5.2102 7.5113 4.9386C7.2416 4.6671 7.0736 4.2872 7.0074 3.7991C6.9715 3.5345 6.9536 3.0302 6.9536 2.2864L6.9536 1.1686C6.8623 1.1673 6.7662 1.1667 6.6654 1.1667L4.4987 1.1667C3.4559 1.1666 2.7699 1.1892 2.4406 1.2345C2.0356 1.2901 1.7457 1.4058 1.5711 1.5816C1.3965 1.7574 1.2816 2.0491 1.2263 2.4569C1.1814 2.7884 1.1589 3.479 1.1589 4.5287L1.1589 9.3047C1.1589 10.3544 1.1814 11.045 1.2263 11.3764C1.2816 11.7842 1.3965 12.076 1.5711 12.2517C1.7457 12.4275 2.0356 12.5432 2.4406 12.5988C2.7699 12.6441 3.4559 12.6667 4.4987 12.6667L7.9185 12.6667C8.9613 12.6667 9.6473 12.6441 9.9766 12.5988C10.3817 12.5432 10.6715 12.4275 10.8461 12.2517C11.0207 12.076 11.1356 11.7842 11.1909 11.3764C11.2359 11.0449 11.2583 10.3544 11.2583 9.3047L11.2583 6.25L12.4172 6.25L12.4172 9.3046C12.4173 10.4072 12.3912 11.1504 12.3392 11.5342C12.2487 12.2015 12.0242 12.7157 11.6656 13.0767C11.307 13.4377 10.7962 13.6637 10.1333 13.7548C9.752 13.8072 9.0137 13.8334 7.9185 13.8333L4.4987 13.8333C3.4035 13.8334 2.6652 13.8072 2.2839 13.7548C1.621 13.6637 1.1102 13.4377 0.7516 13.0767C0.393 12.7157 0.1685 12.2015 0.078 11.5342C0.026 11.1504 -0 10.4072 0 9.3046L0 4.5287C-0 3.4262 0.026 2.683 0.078 2.2991C0.1685 1.6318 0.393 1.1176 0.7516 0.7566C1.1102 0.3956 1.621 0.1696 2.2839 0.0785C2.6652 0.0261 3.4035 -0 4.4987 0L6.6654 0C7.2155 0 7.5915 0.0086 7.7936 0.0257C8.1413 0.0551 8.4383 0.1278 8.6844 0.2439C8.9306 0.36 9.1762 0.543 9.4213 0.7931C9.5637 0.9384 9.811 1.2238 10.1631 1.6491L11.753 3.5697C12.0048 3.874 12.1653 4.0995 12.2342 4.2462C12.2596 4.3002 12.2824 4.3553 12.3027 4.4114C12.3235 4.469 12.3415 4.5275 12.3568 4.5868C12.3971 4.744 12.5 5.1039 12.5 5.5L11.8377 5.5ZM8.1126 1.2707L8.1126 2.2864C8.1126 2.9774 8.1269 3.4291 8.1557 3.6413C8.1867 3.8699 8.2451 4.0274 8.3308 4.1137C8.4165 4.2 8.5729 4.2587 8.8 4.2899C9.0109 4.3189 9.4595 4.3334 10.1459 4.3333L10.8765 4.3333L10.8626 4.3166L9.2728 2.396C8.7419 1.7548 8.382 1.3896 8.1928 1.3004C8.1706 1.2899 8.1438 1.28 8.1126 1.2707ZM5.7142 7.6667L2.8333 7.6667L2.8333 8.8333L5.7142 8.8333L5.7142 7.6667ZM9.7143 7.6667L6.8333 7.6667L6.8333 8.8333L9.7143 8.8333L9.7143 7.6667ZM2.8333 10L5.7142 10L5.7142 11.1667L2.8333 11.1667L2.8333 10ZM6.8333 10L9.7143 10L9.7143 11.1667L6.8333 11.1667L6.8333 10Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$168, ArtifactSlideLineMonoIcon;
var init_ArtifactSlideLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$168 = require_jsx_runtime();
	ArtifactSlideLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$168.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$168.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M10.146 5.5L11.8377 5.5L12.5 5.5C12.5 5.1039 12.3971 4.744 12.3568 4.5868C12.3415 4.5275 12.3235 4.469 12.3027 4.4114C12.2824 4.3553 12.2596 4.3002 12.2342 4.2462C12.1653 4.0995 12.0048 3.874 11.753 3.5697L10.1631 1.6491C9.811 1.2238 9.5637 0.9384 9.4213 0.7931C9.1762 0.543 8.9306 0.36 8.6844 0.2439C8.4383 0.1278 8.1413 0.0551 7.7936 0.0257C7.5915 0.0086 7.2155 0 6.6654 0L4.4987 0C3.4035 -0 2.6652 0.0261 2.2839 0.0785C1.621 0.1696 1.1102 0.3956 0.7516 0.7566C0.393 1.1176 0.1685 1.6318 0.078 2.2991C0.026 2.683 -0 3.4262 0 4.5287L0 9.3046C-0 10.4072 0.026 11.1504 0.078 11.5342C0.1685 12.2015 0.393 12.7157 0.7516 13.0767C1.1102 13.4377 1.621 13.6637 2.2839 13.7548C2.6652 13.8072 3.4035 13.8334 4.4987 13.8333L7.9185 13.8333C9.0137 13.8334 9.752 13.8072 10.1333 13.7548C10.7962 13.6637 11.307 13.4377 11.6656 13.0767C12.0242 12.7157 12.2487 12.2015 12.3392 11.5342C12.3912 11.1504 12.4173 10.4072 12.4172 9.3046L12.4172 6.25L11.2583 6.25L11.2583 9.3047C11.2583 10.3544 11.2359 11.0449 11.1909 11.3764C11.1356 11.7842 11.0207 12.076 10.8461 12.2517C10.6715 12.4275 10.3817 12.5432 9.9766 12.5988C9.6473 12.6441 8.9613 12.6667 7.9185 12.6667L4.4987 12.6667C3.4559 12.6667 2.7699 12.6441 2.4406 12.5988C2.0356 12.5432 1.7457 12.4275 1.5711 12.2517C1.3965 12.076 1.2816 11.7842 1.2263 11.3764C1.1814 11.045 1.1589 10.3544 1.1589 9.3047L1.1589 4.5287C1.1589 3.479 1.1814 2.7884 1.2263 2.4569C1.2816 2.0491 1.3965 1.7574 1.5711 1.5816C1.7457 1.4058 2.0356 1.2901 2.4406 1.2345C2.7699 1.1892 3.4559 1.1666 4.4987 1.1667L6.6654 1.1667C6.7662 1.1667 6.8623 1.1673 6.9536 1.1686L6.9536 2.2864C6.9536 3.0302 6.9715 3.5345 7.0074 3.7991C7.0736 4.2872 7.2416 4.6671 7.5113 4.9386C7.781 5.2102 8.1584 5.3792 8.6433 5.4459C8.9061 5.482 9.407 5.5 10.146 5.5ZM8.1126 2.2864L8.1126 1.2707C8.1438 1.28 8.1706 1.2899 8.1928 1.3004C8.382 1.3896 8.7419 1.7548 9.2728 2.396L10.8626 4.3166L10.8765 4.3333L10.1459 4.3333C9.4595 4.3334 9.0109 4.3189 8.8 4.2899C8.5729 4.2587 8.4165 4.2 8.3308 4.1137C8.2451 4.0274 8.1867 3.8699 8.1557 3.6413C8.1269 3.4291 8.1126 2.9774 8.1126 2.2864ZM2.8433 7.5334C2.7811 7.6534 2.75 7.8478 2.75 8.1167L2.75 10.3833C2.75 10.6522 2.7811 10.8466 2.8433 10.9666C2.9245 11.1233 3.0434 11.2422 3.2 11.3234C3.32 11.3856 3.5145 11.4167 3.7833 11.4167L8.7167 11.4167C8.9855 11.4167 9.18 11.3856 9.3 11.3234C9.4566 11.2422 9.5755 11.1233 9.6567 10.9666C9.7189 10.8466 9.75 10.6522 9.75 10.3833L9.75 8.1167C9.75 7.8478 9.7189 7.6534 9.6567 7.5334C9.5755 7.3767 9.4566 7.2578 9.3 7.1766C9.18 7.1144 8.9855 7.0833 8.7167 7.0833L3.7833 7.0833C3.5145 7.0833 3.32 7.1144 3.2 7.1766C3.0434 7.2578 2.9245 7.3767 2.8433 7.5334ZM3.75 10.3833L3.75 8.1167C3.75 8.105 3.75 8.0939 3.75 8.0834C3.7606 8.0833 3.7717 8.0833 3.7833 8.0833L8.7167 8.0833C8.7283 8.0833 8.7394 8.0833 8.75 8.0834C8.75 8.0939 8.75 8.105 8.75 8.1167L8.75 10.3833C8.75 10.395 8.75 10.4061 8.75 10.4166C8.7394 10.4167 8.7283 10.4167 8.7167 10.4167L3.7833 10.4167C3.7717 10.4167 3.7606 10.4167 3.75 10.4166C3.75 10.4061 3.75 10.395 3.75 10.3833Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$167, ArtifactUnknownLineMonoIcon;
var init_ArtifactUnknownLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$167 = require_jsx_runtime();
	ArtifactUnknownLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$167.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$167.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.75 1.08333)",
			d: "M11.9167 5.5L10.2136 5.5C9.4698 5.5 8.9655 5.482 8.7009 5.4459C8.2128 5.3792 7.8329 5.2102 7.5614 4.9386C7.2898 4.6671 7.1208 4.2872 7.0541 3.7991C7.018 3.5345 7 3.0302 7 2.2864L7 1.1686C6.908 1.1673 6.8113 1.1667 6.7098 1.1667L4.5287 1.1667C3.479 1.1666 2.7884 1.1892 2.4569 1.2345C2.0491 1.2901 1.7574 1.4058 1.5816 1.5816C1.4058 1.7574 1.2901 2.0491 1.2345 2.4569C1.1892 2.7884 1.1666 3.479 1.1667 4.5287L1.1667 9.3047C1.1666 10.3544 1.1892 11.045 1.2345 11.3764C1.2901 11.7842 1.4058 12.076 1.5816 12.2517C1.7574 12.4275 2.0491 12.5432 2.4569 12.5988C2.7884 12.6441 3.479 12.6667 4.5287 12.6667L7.9713 12.6667C9.021 12.6667 9.7116 12.6441 10.0431 12.5988C10.4509 12.5432 10.7426 12.4275 10.9184 12.2517C11.0942 12.076 11.2099 11.7842 11.2655 11.3764C11.3108 11.0449 11.3334 10.3544 11.3333 9.3047L11.3333 6.25L12.5 6.25L12.5 9.3046C12.5 10.4072 12.4739 11.1504 12.4215 11.5342C12.3304 12.2015 12.1044 12.7157 11.7434 13.0767C11.3824 13.4377 10.8682 13.6637 10.2009 13.7548C9.817 13.8072 9.0738 13.8334 7.9713 13.8333L4.5287 13.8333C3.4262 13.8334 2.683 13.8072 2.2991 13.7548C1.6318 13.6637 1.1176 13.4377 0.7566 13.0767C0.3956 12.7157 0.1696 12.2015 0.0785 11.5342C0.0261 11.1504 -0 10.4072 0 9.3046L0 4.5287C-0 3.4262 0.0261 2.683 0.0785 2.2991C0.1696 1.6318 0.3956 1.1176 0.7566 0.7566C1.1176 0.3956 1.6318 0.1696 2.2991 0.0785C2.683 0.0261 3.4262 -0 4.5287 0L6.7098 0C7.2636 0 7.6421 0.0086 7.8456 0.0257C8.1956 0.0551 8.4945 0.1278 8.7423 0.2439C8.9901 0.36 9.2374 0.543 9.4841 0.7931C9.6274 0.9384 9.8764 1.2238 10.2309 1.6491L11.8313 3.5697C12.0849 3.874 12.2464 4.0995 12.3158 4.2462C12.3413 4.3002 12.3643 4.3553 12.3847 4.4114C12.4057 4.469 12.4238 4.5275 12.4391 4.5868C12.4797 4.744 12.5 5.1039 12.5 5.5L11.9167 5.5ZM8.1667 1.2707L8.1667 2.2864C8.1666 2.9774 8.1811 3.4291 8.2101 3.6413C8.2413 3.8699 8.3 4.0274 8.3863 4.1137C8.4726 4.2 8.6301 4.2587 8.8587 4.2899C9.0709 4.3189 9.5226 4.3334 10.2136 4.3333L10.949 4.3333C10.9443 4.3277 10.9397 4.3222 10.9351 4.3166L9.3346 2.396C8.8002 1.7548 8.4378 1.3896 8.2475 1.3004C8.225 1.2899 8.1981 1.28 8.1667 1.2707Z",
			"fill-rule": "evenodd"
		})
	});
})), import_jsx_runtime$166, ArtifactVideoLineMonoIcon;
var init_ArtifactVideoLineMonoIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$166 = require_jsx_runtime();
	ArtifactVideoLineMonoIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$166.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$166.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.08333 1.75)",
			d: "M13.8333 6.75L13.8333 7.9713C13.8334 9.0738 13.8072 9.817 13.7548 10.2009C13.6637 10.8682 13.4377 11.3824 13.0767 11.7434C12.7157 12.1044 12.2015 12.3304 11.5342 12.4215C11.1504 12.4739 10.4072 12.5 9.3046 12.5L4.5287 12.5C3.4262 12.5 2.683 12.4739 2.2991 12.4215C1.6318 12.3304 1.1176 12.1044 0.7566 11.7434C0.3956 11.3824 0.1696 10.8682 0.0785 10.2009C0.0261 9.817 -0 9.0738 0 7.9713L0 4.5287C-0 3.4262 0.0261 2.683 0.0785 2.2991C0.1696 1.6318 0.3956 1.1176 0.7566 0.7566C1.1176 0.3956 1.6318 0.1696 2.2991 0.0785C2.683 0.0261 3.4262 -0 4.5287 0L9.3046 0C10.4072 -0 11.1504 0.0261 11.5342 0.0785C12.2015 0.1696 12.7157 0.3956 13.0767 0.7566C13.4377 1.1176 13.6637 1.6318 13.7548 2.2991C13.8072 2.683 13.8334 3.4262 13.8333 4.5287L13.8333 5.25L12.6667 5.25L12.6667 4.5287C12.6667 3.479 12.6441 2.7884 12.5988 2.4569C12.5432 2.0491 12.4275 1.7574 12.2517 1.5816C12.076 1.4058 11.7842 1.2901 11.3764 1.2345C11.045 1.1892 10.3544 1.1666 9.3047 1.1667L4.5287 1.1667C3.479 1.1666 2.7884 1.1892 2.4569 1.2345C2.0491 1.2901 1.7574 1.4058 1.5816 1.5816C1.4058 1.7574 1.2901 2.0491 1.2345 2.4569C1.1892 2.7884 1.1666 3.479 1.1667 4.5287L1.1667 7.9713C1.1666 9.021 1.1892 9.7116 1.2345 10.0431C1.2901 10.4509 1.4058 10.7426 1.5816 10.9184C1.7574 11.0942 2.0491 11.2099 2.4569 11.2655C2.7884 11.3108 3.479 11.3334 4.5287 11.3333L9.3047 11.3333C10.3544 11.3334 11.045 11.3108 11.3764 11.2655C11.7842 11.2099 12.076 11.0942 12.2517 10.9184C12.4275 10.7426 12.5432 10.4509 12.5988 10.0431C12.6441 9.7116 12.6667 9.021 12.6667 7.9713L12.6667 6.75L13.8333 6.75ZM5.1667 8.25L5.1667 4.25C5.1666 4.1971 5.1737 4.1452 5.1878 4.0943C5.2019 4.0433 5.2225 3.9952 5.2498 3.9499C5.3296 3.8077 5.4492 3.7191 5.6085 3.6841C5.7655 3.64 5.9127 3.6619 6.0501 3.7498L9.3835 5.7498C9.4245 5.7744 9.462 5.8036 9.4958 5.8375C9.5297 5.8713 9.5589 5.9088 9.5835 5.9499C9.6714 6.0873 9.6933 6.2345 9.6493 6.3915C9.6143 6.5508 9.5257 6.6704 9.3835 6.7502L6.0501 8.7502C6.0048 8.7775 5.9567 8.7981 5.9057 8.8122C5.8548 8.8263 5.8029 8.8334 5.75 8.8333C5.587 8.838 5.4495 8.7811 5.3375 8.6625C5.2189 8.5505 5.162 8.413 5.1667 8.25Z",
			"fill-rule": "evenodd"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/artifact-file-icons/line-mono/index.ts
var init_line_mono = __esmMin((() => {
	init_ArtifactAudioLineMonoIcon();
	init_ArtifactDocLineMonoIcon();
	init_ArtifactDrawioLineMonoIcon();
	init_ArtifactFolderLineMonoIcon();
	init_ArtifactHtmlLineMonoIcon();
	init_ArtifactImageLineMonoIcon();
	init_ArtifactMarkdownLineMonoIcon();
	init_ArtifactPdfLineMonoIcon();
	init_ArtifactSheetLineMonoIcon();
	init_ArtifactSlideLineMonoIcon();
	init_ArtifactUnknownLineMonoIcon();
	init_ArtifactVideoLineMonoIcon();
})), import_jsx_runtime$165, ArtifactAudioSolidIcon;
var init_ArtifactAudioSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$165 = require_jsx_runtime();
	ArtifactAudioSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$165.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$165.jsx)("path", {
				fill: "#4AA5AD",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$165.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$165.jsx)("path", {
					fill: "#72E2E6",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$165.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.2334 6.82308)",
				d: "M5.2733 3.0738L5.2733 1.2336C5.2733 1.2159 5.2733 1.1991 5.2733 1.1831C5.2579 1.1876 5.2417 1.1925 5.2249 1.1975L2.6635 1.9659C2.6541 1.9687 2.6452 1.9714 2.6367 1.974L2.6367 2.002L2.6367 5.3203L2.6231 5.3203C2.5763 5.6446 2.4291 5.914 2.1814 6.1285C1.9337 6.343 1.646 6.4503 1.3183 6.4503C0.9543 6.4503 0.6436 6.3216 0.3861 6.0641C0.1287 5.8067 0 5.496 0 5.132C0 4.7679 0.1287 4.4572 0.3861 4.1997C0.6436 3.9423 0.9543 3.8136 1.3183 3.8136C1.3498 3.8136 1.3813 3.8147 1.4128 3.817C1.4442 3.8193 1.4755 3.8226 1.5067 3.8271L1.5067 2.002C1.5067 1.7667 1.5299 1.592 1.5764 1.4781C1.6376 1.3283 1.7311 1.2026 1.857 1.101C1.9528 1.0237 2.1134 0.9512 2.3388 0.8836L4.9001 0.1152C5.2678 0.0049 5.5385 -0.0262 5.7122 0.0219C5.9472 0.0869 6.1295 0.2226 6.2593 0.429C6.3553 0.5816 6.4033 0.8498 6.4033 1.2336L6.4033 4.567L6.3898 4.567C6.343 4.8913 6.1957 5.1607 5.9481 5.3752C5.7004 5.5897 5.4127 5.6969 5.085 5.6969C4.721 5.6969 4.4102 5.5682 4.1528 5.3108C3.8954 5.0534 3.7667 4.7427 3.7667 4.3786C3.7667 4.0146 3.8954 3.7038 4.1528 3.4464C4.4102 3.189 4.721 3.0603 5.085 3.0603C5.1165 3.0603 5.148 3.0614 5.1794 3.0637C5.2108 3.0659 5.2421 3.0693 5.2733 3.0738Z"
			})
		]
	});
})), import_jsx_runtime$164, ArtifactCodeSolidIcon;
var init_ArtifactCodeSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$164 = require_jsx_runtime();
	ArtifactCodeSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$164.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$164.jsx)("path", {
				fill: "#8078D6",
				transform: "matrix(1 0 0 1 0.00683081 0.00682074)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$164.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$164.jsx)("path", {
					fill: "#CEC4FF",
					transform: "matrix(1 0 0 1 4.80696 0.00682327)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$164.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 2.73356 6.56542)",
				d: "M0.3795 3.5798C-0.1265 3.0737 -0.1265 2.2534 0.3795 1.7472L2.1267 0C2.6327 0.506 2.6328 1.3266 2.1268 1.8326L0.3795 3.5798Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$164.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 2.73356 6.56542)",
				d: "M0.4172 1.823C-0.0888 2.3292 -0.0888 3.1496 0.4172 3.6556L2.1644 5.4028C2.6704 4.8967 2.6704 4.0762 2.1644 3.5703L0.4172 1.823Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$164.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 2.73356 6.56542)",
				d: "M6.8338 3.5798C7.3398 3.0737 7.3398 2.2534 6.8338 1.7472L5.0866 0C4.5806 0.506 4.5805 1.3266 5.0865 1.8326L6.8338 3.5798Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$164.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 2.73356 6.56542)",
				d: "M6.7961 1.823C7.3021 2.3292 7.3021 3.1496 6.7961 3.6556L5.0489 5.4028C4.5429 4.8967 4.5429 4.0762 5.0489 3.5703L6.7961 1.823Z"
			})
		]
	});
})), import_jsx_runtime$163, ArtifactDocSolidIcon;
var init_ArtifactDocSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$163 = require_jsx_runtime();
	ArtifactDocSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$163.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$163.jsx)("path", {
				fill: "#5484D1",
				transform: "matrix(1 0 0 1 1.66667 1)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$163.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$163.jsx)("path", {
					fill: "#A1D7FF",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$163.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.63249 8.9432)",
				d: "M0 3.4146C0 2.7906 0.5059 2.2846 1.13 2.2846L4.4748 2.2846L4.4748 2.4776C4.4748 3.1016 3.9688 3.6076 3.3448 3.6076L0 3.6076L0 3.4146Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$163.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.63249 8.9432)",
				d: "M0 1.13C0 0.506 0.5059 0 1.13 0L6.7347 0L6.7347 0.1929C6.7348 0.817 6.2288 1.3229 5.6048 1.3229L0 1.3229L0 1.13Z"
			})
		]
	});
})), import_jsx_runtime$162, ArtifactDrawioSolidIcon;
var init_ArtifactDrawioSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$162 = require_jsx_runtime();
	ArtifactDrawioSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$162.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$162.jsx)("path", {
				fill: "#EB9752",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$162.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$162.jsx)("path", {
					fill: "#FFE2AB",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$162.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.61003 7)",
				d: "M1.9105 0.5597C1.8854 0.6544 1.8854 0.7696 1.8854 1C1.8854 1.2304 1.8854 1.3456 1.9105 1.4403C1.9771 1.6912 2.1699 1.8907 2.4168 1.9668L1.3999 3.5783L1 3.5783C0.7696 3.5783 0.6544 3.5783 0.5597 3.6034C0.2993 3.6725 0.0942 3.8776 0.0251 4.138C0 4.2327 0 4.3479 0 4.5783C0 4.8087 0 4.9239 0.0251 5.0186C0.0942 5.279 0.2993 5.4841 0.5597 5.5532C0.6544 5.5783 0.7696 5.5783 1 5.5783L2.0133 5.5783C2.2437 5.5783 2.3589 5.5783 2.4536 5.5532C2.7141 5.4841 2.9192 5.279 2.9882 5.0186C3.0133 4.9239 3.0133 4.8087 3.0133 4.5783C3.0133 4.3479 3.0133 4.2327 2.9882 4.138C2.9192 3.8776 2.7141 3.6725 2.4536 3.6034C2.4072 3.5911 2.3559 3.5848 2.2886 3.5816L3.2866 2L3.4944 2L4.4942 3.5816C4.4266 3.5848 4.3751 3.5911 4.3286 3.6034C4.0681 3.6725 3.8631 3.8776 3.794 4.138C3.7689 4.2327 3.7689 4.3479 3.7689 4.5783C3.7689 4.8087 3.7689 4.9239 3.794 5.0186C3.8631 5.279 4.0681 5.4841 4.3286 5.5532C4.4233 5.5783 4.5385 5.5783 4.7689 5.5783L5.7822 5.5783C6.0126 5.5783 6.1278 5.5783 6.2225 5.5532C6.4829 5.4841 6.688 5.279 6.7571 5.0186C6.7822 4.9239 6.7822 4.8087 6.7822 4.5783C6.7822 4.3479 6.7822 4.2327 6.7571 4.138C6.688 3.8776 6.4829 3.6725 6.2225 3.6034C6.1278 3.5783 6.0126 3.5783 5.7822 3.5783L5.3834 3.5783L4.3651 1.9675C4.6131 1.892 4.8069 1.692 4.8736 1.4403C4.8987 1.3456 4.8988 1.2304 4.8987 1C4.8988 0.7696 4.8987 0.6544 4.8736 0.5597C4.8046 0.2993 4.5995 0.0942 4.339 0.0251C4.2443 0 4.1291 0 3.8987 0L2.8854 0C2.655 0 2.5398 0 2.4451 0.0251C2.1847 0.0942 1.9796 0.2993 1.9105 0.5597Z"
			})
		]
	});
})), import_jsx_runtime$161, ArtifactFolderSolidIcon;
var init_ArtifactFolderSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$161 = require_jsx_runtime();
	ArtifactFolderSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$161.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$161.jsx)("path", {
				fill: "#CACAD1",
				transform: "matrix(1 0 0 1 1.33333 2.33333)",
				d: "M0 2.6667C0 1.7321 0 1.2648 0.1815 0.9095C0.3413 0.5968 0.5968 0.3413 0.9095 0.1815C1.2648 0 1.7321 0 2.6667 0L4.8187 0C5.4854 0 5.8187 0 6.1049 0.1091C6.3574 0.2053 6.583 0.3617 6.7618 0.5643C6.9644 0.794 7.0814 1.1061 7.3156 1.7303L8.6667 5.3333L0 5.3333L0 2.6667Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$161.jsx)("path", {
				fill: "#A4A4A9",
				transform: "matrix(1 0 0 1 1.33333 2.33333)",
				d: "M0 2.6667C0 1.7321 0 1.2648 0.1815 0.9095C0.3413 0.5968 0.5968 0.3413 0.9095 0.1815C1.2648 0 1.7321 0 2.6667 0L4.8187 0C5.4854 0 5.8187 0 6.1049 0.1091C6.3574 0.2053 6.583 0.3617 6.7618 0.5643C6.9644 0.794 7.0814 1.1061 7.3156 1.7303L8.6667 5.3333L0 5.3333L0 2.6667Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$161.jsx)("path", {
				fill: "#A4A4A9",
				transform: "matrix(1 0 0 1 1.33333 4.33333)",
				d: "M10.6667 0C11.6012 0 12.0685 0 12.4239 0.1815C12.7365 0.3413 12.9921 0.5968 13.1518 0.9095C13.3333 1.2648 13.3333 1.7321 13.3333 2.6667L13.3333 6.6667C13.3333 7.6012 13.3333 8.0685 13.1518 8.4239C12.9921 8.7365 12.7365 8.9921 12.4239 9.1518C12.0685 9.3333 11.6012 9.3333 10.6667 9.3333L2.6667 9.3333C1.7321 9.3333 1.2648 9.3333 0.9095 9.1518C0.5968 8.9921 0.3413 8.7365 0.1815 8.4239C0 8.0685 0 7.6012 0 6.6667L0 0L10.6667 0Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$161.jsx)("path", {
				fill: "#CACAD1",
				transform: "matrix(1 0 0 1 1.33333 4.33333)",
				d: "M10.6667 0C11.6012 0 12.0685 0 12.4239 0.1815C12.7365 0.3413 12.9921 0.5968 13.1518 0.9095C13.3333 1.2648 13.3333 1.7321 13.3333 2.6667L13.3333 6.6667C13.3333 7.6012 13.3333 8.0685 13.1518 8.4239C12.9921 8.7365 12.7365 8.9921 12.4239 9.1518C12.0685 9.3333 11.6012 9.3333 10.6667 9.3333L2.6667 9.3333C1.7321 9.3333 1.2648 9.3333 0.9095 9.1518C0.5968 8.9921 0.3413 8.7365 0.1815 8.4239C0 8.0685 0 7.6012 0 6.6667L0 0L10.6667 0Z"
			})
		]
	});
})), import_jsx_runtime$160, ArtifactHtmlSolidIcon;
var init_ArtifactHtmlSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$160 = require_jsx_runtime();
	ArtifactHtmlSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$160.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$160.jsx)("path", {
				fill: "#5484D1",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$160.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$160.jsx)("path", {
					fill: "#A1D7FF",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$160.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M0.3795 3.5798C-0.1265 3.0737 -0.1265 2.2534 0.3795 1.7472L2.1267 0C2.6327 0.506 2.6328 1.3266 2.1268 1.8326L0.3795 3.5798Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$160.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M0.4172 1.823C-0.0888 2.3292 -0.0888 3.1496 0.4172 3.6556L2.1644 5.4028C2.6704 4.8967 2.6704 4.0762 2.1644 3.5703L0.4172 1.823Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$160.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M6.8338 3.5798C7.3398 3.0737 7.3398 2.2534 6.8338 1.7472L5.0866 0C4.5806 0.506 4.5805 1.3266 5.0865 1.8326L6.8338 3.5798Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$160.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M6.7961 1.823C7.3021 2.3292 7.3021 3.1496 6.7961 3.6556L5.0489 5.4028C4.5429 4.8967 4.5429 4.0762 5.0489 3.5703L6.7961 1.823Z"
			})
		]
	});
})), import_jsx_runtime$159, ArtifactImageSolidIcon;
var init_ArtifactImageSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$159 = require_jsx_runtime();
	ArtifactImageSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$159.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$159.jsx)("path", {
				fill: "#5484D1",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$159.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$159.jsx)("path", {
					fill: "#A1D7FF",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$159.jsx)("circle", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 9.13005 6.86995)",
				cx: "1.13",
				cy: "1.13",
				r: "1.13"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$159.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.18311 8.55046)",
				d: "M7.2282 3.9695C7.5346 3.9695 7.7128 3.6232 7.5347 3.3739L6.5937 2.0565C6.3231 1.6777 5.7772 1.6325 5.448 1.9617L5.2539 2.1558C5.0918 2.3179 4.8238 2.2988 4.6862 2.1154L3.3257 0.3013C3.0138 -0.1145 2.3845 -0.097 2.0962 0.3355L0.0639 3.3839C-0.103 3.6342 0.0765 3.9695 0.3773 3.9695L7.2282 3.9695Z"
			})
		]
	});
})), import_jsx_runtime$158, ArtifactMarkdownSolidIcon;
var init_ArtifactMarkdownSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$158 = require_jsx_runtime();
	ArtifactMarkdownSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$158.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$158.jsx)("path", {
				fill: "#4AA5AD",
				transform: "matrix(1 0 0 1 0.00683081 0.00682074)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$158.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$158.jsx)("path", {
					fill: "#72E2E6",
					transform: "matrix(1 0 0 1 4.80696 0.0068233)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$158.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 2.95019 6.25308)",
				d: "M0 1.2148C0 0.5622 0.5145 0.0299 1.1599 0.0012C1.1667 0.0008 1.1737 0.0005 1.1806 0.0005C1.192 0.0002 1.2033 0 1.2148 0L1.2148 0.0008C1.6818 0.0124 2.0994 0.2985 2.278 0.7322L3.39 3.431L4.502 0.7322C4.6806 0.2985 5.0982 0.0124 5.5652 0.0008L5.5652 0C5.5767 0 5.588 0.0002 5.5994 0.0005C5.6063 0.0005 5.6133 0.0008 5.6201 0.0012C6.2655 0.0299 6.78 0.5622 6.78 1.2148L6.78 5.65C6.1091 5.65 5.5652 5.1061 5.5652 4.4353L5.5652 1.3824L4.2246 4.2297C4.106 4.4815 3.8904 4.6677 3.6346 4.7522C3.5842 4.7839 3.5242 4.8025 3.4582 4.8025C3.4353 4.8025 3.4126 4.8017 3.39 4.8002C3.3674 4.8017 3.3447 4.8025 3.3218 4.8025C3.2558 4.8025 3.1958 4.7839 3.1454 4.7522C2.8896 4.6677 2.674 4.4815 2.5554 4.2297L1.2148 1.3824L1.2148 4.4353C1.2148 5.1061 0.6709 5.65 0 5.65L0 1.2148Z"
			})
		]
	});
})), import_jsx_runtime$157, ArtifactPdfSolidIcon;
var init_ArtifactPdfSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$157 = require_jsx_runtime();
	ArtifactPdfSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$157.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$157.jsx)("path", {
				fill: "#DE6A76",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$157.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$157.jsx)("path", {
					fill: "#FFC2C2",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$157.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.38021 6.67253)",
				d: "M2.7868 0.0877C3.2114 0.0818 3.4236 0.0787 3.5843 0.1596C3.7265 0.2311 3.8413 0.347 3.9079 0.4892C4.0033 0.6926 3.9742 0.8881 3.9161 1.2793C3.7488 2.405 3.3239 3.4317 2.5764 4.4019C2.3033 4.7563 1.9928 5.0726 1.6543 5.3566C1.3551 5.6076 1.2056 5.7332 0.9834 5.7592C0.83 5.7772 0.6733 5.7421 0.5389 5.6617C0.3874 5.5714 0.2772 5.3961 0.0567 5.0459L0 4.9558C0.6276 4.5878 1.1292 4.1449 1.5196 3.6382C2.2821 2.6486 2.711 1.4316 2.6985 0.3825C2.696 0.2845 2.6943 0.1868 2.6834 0.0893L2.7868 0.0877Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$157.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.38021 6.67253)",
				d: "M3.2715 0.0058C3.1395 -0.0128 2.9846 0.0145 2.6747 0.0687C2.9559 1.5732 3.5977 2.8095 4.7656 3.8475C5.366 4.3811 6.0664 4.7627 6.8157 5.0426C6.9675 4.6557 7.0434 4.4624 7.0261 4.2838C7.0094 4.1105 6.9337 3.9448 6.8157 3.8093C6.7259 3.7059 6.5229 3.6038 6.1572 3.3647C5.963 3.2376 5.7821 3.0993 5.614 2.9498C5.0443 2.4435 4.5275 1.783 4.2122 1.0551C4.0814 0.7527 4.0329 0.5916 3.9794 0.5033C3.8193 0.2399 3.5641 0.047 3.2715 0.0058Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$157.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.38021 6.67253)",
				d: "M6.8139 4.9319C6.8423 4.5212 6.8566 4.3158 6.7889 4.1532C6.729 4.0096 6.6253 3.888 6.4931 3.8091C6.3173 3.7044 6.1189 3.7052 5.7222 3.7068C5.2359 3.7087 4.7492 3.7388 4.2702 3.7914C2.9283 3.9387 1.5876 4.2759 0.3071 4.8493L0.0262 4.9796L0.1058 5.1225C0.3011 5.4728 0.3988 5.6479 0.5424 5.748C0.6677 5.8355 0.8172 5.8841 0.9713 5.8894C1.1134 5.8942 1.3106 5.8208 1.7047 5.6799C2.5878 5.3647 3.5106 5.1594 4.4445 5.057C4.9202 5.0047 5.5882 4.9922 6.0046 4.9932C6.2509 4.9937 6.5615 5.0115 6.8069 5.0325L6.8139 4.9319Z"
			})
		]
	});
})), import_jsx_runtime$156, ArtifactSheetSolidIcon;
var init_ArtifactSheetSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$156 = require_jsx_runtime();
	ArtifactSheetSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$156.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$156.jsx)("path", {
				fill: "#49AB69",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$156.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$156.jsx)("path", {
					fill: "#8FF57A",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$156.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 3.85677 8.9917)",
				d: "M8.2867 2.4012C8.2867 3.0253 7.7302 3.5312 7.0437 3.5312L4.6613 3.5312L4.6613 2.2365L8.2867 2.2365L8.2867 2.4012ZM0 3.3665C0 2.7424 0.5565 2.2365 1.243 2.2365L3.6254 2.2365L3.6254 3.5312L0 3.5312L0 3.3665ZM8.2867 0.1648C8.2867 0.7888 7.7302 1.2948 7.0437 1.2948L4.6613 1.2948L4.6613 0L8.2867 0L8.2867 0.1648ZM0 1.13C0 0.506 0.5565 0 1.243 0L3.6254 0L3.6254 1.2948L0 1.2948L0 1.13Z"
			})
		]
	});
})), import_jsx_runtime$155, ArtifactSlideSolidIcon;
var init_ArtifactSlideSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$155 = require_jsx_runtime();
	ArtifactSlideSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$155.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$155.jsx)("path", {
				fill: "#EB9752",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$155.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$155.jsx)("path", {
					fill: "#FFE2AB",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$155.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.04508 7.4349)",
				d: "M0 2.825C0 2.8182 0 2.8079 0 2.7942C-0 2.1605 0.0155 1.73 0.0465 1.5026C0.1051 1.0732 0.2551 0.7378 0.4965 0.4965C0.7378 0.2551 1.0732 0.1051 1.5026 0.0465C1.73 0.0155 2.1605 -0 2.7942 0C2.8079 0 2.8182 0 2.825 0L5.085 0C5.0918 0 5.1021 0 5.1158 0C5.7495 -0 6.18 0.0155 6.4074 0.0465C6.8368 0.1051 7.1722 0.2551 7.4135 0.4965C7.6549 0.7378 7.8049 1.0732 7.8635 1.5026C7.8945 1.73 7.91 2.1605 7.91 2.7942C7.91 2.8098 7.91 2.8201 7.91 2.825C7.91 2.8299 7.91 2.8402 7.91 2.8558C7.91 3.4895 7.8945 3.92 7.8635 4.1474C7.8049 4.5768 7.6549 4.9122 7.4135 5.1535C7.1722 5.3949 6.8368 5.5449 6.4074 5.6035C6.18 5.6345 5.7495 5.65 5.1158 5.65C5.1002 5.65 5.0899 5.65 5.085 5.65L2.825 5.65C2.8201 5.65 2.8098 5.65 2.7942 5.65C2.1605 5.65 1.73 5.6345 1.5026 5.6035C1.0732 5.5449 0.7378 5.3949 0.4965 5.1535C0.2551 4.9122 0.1051 4.5768 0.0465 4.1474C0.0155 3.92 -0 3.4895 0 2.8558C0 2.8421 0 2.8318 0 2.825ZM1.13 2.825C1.13 2.8319 1.13 2.8421 1.13 2.8559C1.13 3.4383 1.142 3.8179 1.1661 3.9946C1.1904 4.1726 1.2336 4.2926 1.2955 4.3545C1.3574 4.4164 1.4774 4.4596 1.6554 4.4839C1.8321 4.508 2.2117 4.52 2.7941 4.52C2.8098 4.52 2.8201 4.52 2.825 4.52L5.085 4.52C5.0899 4.52 5.1002 4.52 5.1159 4.52C5.6983 4.52 6.0779 4.508 6.2546 4.4839C6.4326 4.4596 6.5526 4.4164 6.6145 4.3545C6.6764 4.2926 6.7196 4.1726 6.7438 3.9946C6.768 3.8179 6.78 3.4383 6.78 2.8559C6.78 2.8402 6.78 2.8299 6.78 2.825C6.78 2.8201 6.78 2.8098 6.78 2.7941C6.78 2.2117 6.768 1.8321 6.7438 1.6554C6.7196 1.4774 6.6764 1.3574 6.6145 1.2955C6.5526 1.2336 6.4326 1.1904 6.2546 1.1661C6.0779 1.142 5.6983 1.13 5.1159 1.13C5.1021 1.13 5.0919 1.13 5.085 1.13L2.825 1.13C2.8181 1.13 2.8079 1.13 2.7941 1.13C2.2117 1.13 1.8321 1.142 1.6554 1.1661C1.4774 1.1904 1.3574 1.2336 1.2955 1.2955C1.2336 1.3574 1.1904 1.4774 1.1661 1.6554C1.142 1.8321 1.13 2.2117 1.13 2.7941C1.13 2.8079 1.13 2.8181 1.13 2.825Z"
			})
		]
	});
})), import_jsx_runtime$154, ArtifactUnknownSolidIcon;
var init_ArtifactUnknownSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$154 = require_jsx_runtime();
	ArtifactUnknownSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$154.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$154.jsx)("path", {
			fill: "#CACAD1",
			transform: "matrix(1 0 0 1 1.66666 0.999997)",
			d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$154.jsx)("g", {
			opacity: "0.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime$154.jsx)("path", {
				fill: "#7F7F82",
				transform: "matrix(1 0 0 1 6.4668 1)",
				d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
			})
		})]
	});
})), import_jsx_runtime$153, ArtifactVideoSolidIcon;
var init_ArtifactVideoSolidIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$153 = require_jsx_runtime();
	ArtifactVideoSolidIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$153.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$153.jsx)("path", {
				fill: "#49AB69",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$153.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$153.jsx)("path", {
					fill: "#8FF57A",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$153.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(-4.37114e-08 1 -1 -4.37114e-08 10.5599 6.889)",
				d: "M1.3496 1.335C1.8866 0.4978 2.1552 0 2.6177 0C3.0803 0 3.3489 0.4978 3.8859 1.335L4.3914 2.123C4.9967 3.0666 5.4088 3.5978 5.1635 4.0493C4.917 4.5032 4.2454 4.4431 3.1232 4.4431L2.1123 4.4431C0.9901 4.4431 0.3185 4.5032 0.072 4.0493C-0.1733 3.5978 0.2388 3.0666 0.8441 2.123L1.3496 1.335Z"
			})
		]
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/artifact-file-icons/solid/index.ts
var init_solid = __esmMin((() => {
	init_ArtifactAudioSolidIcon();
	init_ArtifactCodeSolidIcon();
	init_ArtifactDocSolidIcon();
	init_ArtifactDrawioSolidIcon();
	init_ArtifactFolderSolidIcon();
	init_ArtifactHtmlSolidIcon();
	init_ArtifactImageSolidIcon();
	init_ArtifactMarkdownSolidIcon();
	init_ArtifactPdfSolidIcon();
	init_ArtifactSheetSolidIcon();
	init_ArtifactSlideSolidIcon();
	init_ArtifactUnknownSolidIcon();
	init_ArtifactVideoSolidIcon();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/artifact-file-icons/index.ts
var init_artifact_file_icons = __esmMin((() => {
	init_line_color();
	init_line_mono();
	init_solid();
})), import_jsx_runtime$152, ICON_TABLE, ArtifactFileTypeIcon;
var init_ArtifactFileTypeIcon = __esmMin((() => {
	require_react();
	init_artifact_file_icons();
	init_ArtifactFileIconTypes();
	import_jsx_runtime$152 = require_jsx_runtime();
	ICON_TABLE = {
		"line-color": {
			word: ArtifactDocLineColorIcon,
			spreadsheet: ArtifactSheetLineColorIcon,
			presentation: ArtifactSlideLineColorIcon,
			pdf: ArtifactPdfLineColorIcon,
			markdown: ArtifactMarkdownLineColorIcon,
			html: ArtifactHtmlLineColorIcon,
			code: ArtifactUnknownLineColorIcon,
			drawio: ArtifactDrawioLineColorIcon,
			image: ArtifactImageLineColorIcon,
			video: ArtifactVideoLineColorIcon,
			audio: ArtifactAudioLineColorIcon,
			folder: ArtifactFolderLineColorIcon,
			default: ArtifactUnknownLineColorIcon
		},
		"line-mono": {
			word: ArtifactDocLineMonoIcon,
			spreadsheet: ArtifactSheetLineMonoIcon,
			presentation: ArtifactSlideLineMonoIcon,
			pdf: ArtifactPdfLineMonoIcon,
			markdown: ArtifactMarkdownLineMonoIcon,
			html: ArtifactHtmlLineMonoIcon,
			code: ArtifactUnknownLineMonoIcon,
			drawio: ArtifactDrawioLineMonoIcon,
			image: ArtifactImageLineMonoIcon,
			video: ArtifactVideoLineMonoIcon,
			audio: ArtifactAudioLineMonoIcon,
			folder: ArtifactFolderLineMonoIcon,
			default: ArtifactUnknownLineMonoIcon
		},
		"solid": {
			word: ArtifactDocSolidIcon,
			spreadsheet: ArtifactSheetSolidIcon,
			presentation: ArtifactSlideSolidIcon,
			pdf: ArtifactPdfSolidIcon,
			markdown: ArtifactMarkdownSolidIcon,
			html: ArtifactCodeSolidIcon,
			code: ArtifactCodeSolidIcon,
			drawio: ArtifactDrawioSolidIcon,
			image: ArtifactImageSolidIcon,
			video: ArtifactVideoSolidIcon,
			audio: ArtifactAudioSolidIcon,
			folder: ArtifactFolderSolidIcon,
			default: ArtifactUnknownSolidIcon
		}
	};
	ArtifactFileTypeIcon = (props) => {
		const { fileName, kind, type, ...rest } = props;
		const resolvedKind = kind ?? getArtifactFileIconKind(fileName);
		const Icon = ICON_TABLE[type][resolvedKind];
		return /* @__PURE__ */ (0, import_jsx_runtime$152.jsx)(Icon, { ...rest });
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AutomationEmptyAlarmIcon.tsx
var import_react$151, import_jsx_runtime$151, AutomationEmptyAlarmIconRaw, AutomationEmptyAlarmIcon;
var init_AutomationEmptyAlarmIcon = __esmMin((() => {
	import_react$151 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$151 = require_jsx_runtime();
	AutomationEmptyAlarmIconRaw = (0, import_react$151.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$151.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 48 48",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$151.jsx)("path", {
			fill: "currentColor",
			fillOpacity: .5,
			transform: "matrix(1 0 0 1 0.0543442 0.048645)",
			d: "M8.959 0Q3.4537 3.4515 0 8.9556L3.3882 11.0816Q6.3548 6.3538 11.0837 3.389L8.959 0ZM47.8879 8.9556Q44.4342 3.4515 38.9288 0L36.8041 3.389Q41.5331 6.3538 44.4996 11.0816L47.8879 8.9556ZM24 2.5Q28.101 2.5 31.914 4.0096Q36.0542 5.6486 39.2028 8.7972Q42.3514 11.9458 43.9904 16.086Q45.5 19.899 45.5 24Q45.5 28.101 43.9904 31.914Q42.7222 35.1176 40.5501 37.7274L44.8599 42.0371L42.0314 44.8656L37.7212 40.5553Q35.1137 42.7237 31.914 43.9905Q28.101 45.5 24 45.5Q19.899 45.5 16.0859 43.9905Q12.8498 42.7093 10.2195 40.5059L5.8599 44.8656L3.0314 42.0371L7.4006 37.668Q5.2634 35.0812 4.0095 31.914Q2.5 28.101 2.5 24Q2.5 19.899 4.0095 16.086Q5.6486 11.9458 8.7972 8.7972Q11.9458 5.6486 16.0859 4.0096Q19.899 2.5 24 2.5ZM24 6.5Q20.662 6.5 17.5583 7.7287Q14.1884 9.0628 11.6256 11.6256Q9.0628 14.1884 7.7287 17.5583Q6.5 20.662 6.5 24Q6.5 27.338 7.7287 30.4417Q9.0628 33.8116 11.6256 36.3744Q14.1884 38.9372 17.5583 40.2713Q20.6619 41.5 24 41.5Q27.338 41.5 30.4416 40.2713Q33.8115 38.9372 36.3743 36.3744Q38.9372 33.8116 40.2713 30.4417Q41.5 27.338 41.5 24Q41.5 20.662 40.2713 17.5583Q38.9372 14.1884 36.3743 11.6256Q33.8115 9.0628 30.4416 7.7287Q27.338 6.5 24 6.5Z",
			fillRule: "evenodd"
		}), /* @__PURE__ */ (0, import_jsx_runtime$151.jsx)("path", {
			fill: "currentColor",
			fillOpacity: .5,
			transform: "matrix(1 0 0 1 15 18)",
			d: "M8.4324 12.396L19.4142 1.4142L16.5858 -1.4142L6 9.1716L1.4142 4.5858L-1.4142 7.4142L3.5676 12.396L3.5814 12.4099Q4.0884 12.9169 4.3518 13.117Q5.1214 13.7018 6 13.7018Q6.8786 13.7018 7.6482 13.117Q7.9116 12.9169 8.4186 12.4099L8.4324 12.396Z",
			fillRule: "evenodd"
		})]
	}));
	AutomationEmptyAlarmIconRaw.displayName = "AutomationEmptyAlarmIconRaw";
	AutomationEmptyAlarmIcon = createIcon(AutomationEmptyAlarmIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AutomationEmptyRecordsIcon.tsx
var import_react$150, import_jsx_runtime$150, AutomationEmptyRecordsIconRaw, AutomationEmptyRecordsIcon;
var init_AutomationEmptyRecordsIcon = __esmMin((() => {
	import_react$150 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$150 = require_jsx_runtime();
	AutomationEmptyRecordsIconRaw = (0, import_react$150.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$150.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 48 48",
		fill: "none",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$150.jsx)("path", {
				fill: "currentColor",
				fillOpacity: .5,
				transform: "matrix(1 0 0 1 6 6)",
				d: "M12 1.995L27 1.995L27 -1.995L12 -1.995L11.8362 -1.995Q6.858 -1.9952 5.1143 -1.7572Q2.0295 -1.3361 0.3467 0.3467Q-1.3361 2.0295 -1.7572 5.1143Q-1.9952 6.858 -1.995 11.8362L-1.995 12L-1.995 24L-1.995 24.1638Q-1.9952 29.142 -1.7572 30.8857Q-1.3361 33.9705 0.3467 35.6533Q2.0295 37.3361 5.1143 37.7572Q6.858 37.9952 11.8362 37.995L12 37.995L24 37.995L24.1638 37.995Q29.142 37.9952 30.8857 37.7572Q33.9705 37.3361 35.6533 35.6533Q37.3361 33.9705 37.7572 30.8857Q37.9952 29.142 37.995 24.1638L37.995 24L37.995 9L34.005 9L34.005 24L34.005 24.1639Q34.0051 28.871 33.8038 30.3461Q33.5645 32.0994 32.832 32.832Q32.0994 33.5645 30.3461 33.8038Q28.871 34.0051 24.1639 34.005L24 34.005L12 34.005L11.8361 34.005Q7.129 34.0051 5.6539 33.8038Q3.9006 33.5645 3.168 32.832Q2.4355 32.0994 2.1962 30.3461Q1.9949 28.871 1.995 24.1639L1.995 24L1.995 12L1.995 11.8361Q1.9949 7.129 2.1962 5.6539Q2.4355 3.9006 3.168 3.168Q3.9006 2.4355 5.6539 2.1962Q7.129 1.9949 11.8361 1.995L12 1.995Z",
				fillRule: "evenodd"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$150.jsx)("path", {
				fill: "currentColor",
				fillOpacity: .5,
				transform: "matrix(1 0 0 1 27 3)",
				d: "M1.4107 19.4107L19.4107 1.4107L16.5893 -1.4107L-1.4107 16.5893L1.4107 19.4107Z",
				fillRule: "evenodd"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$150.jsx)("rect", {
				fill: "currentColor",
				fillOpacity: .5,
				transform: "matrix(1 0 0 1 13.5 16.5)",
				y: "-1.995",
				width: "10.5",
				height: "3.99"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$150.jsx)("rect", {
				fill: "currentColor",
				fillOpacity: .5,
				transform: "matrix(1 0 0 1 13.5 28.5)",
				y: "-1.995",
				width: "21",
				height: "3.99"
			})
		]
	}));
	AutomationEmptyRecordsIconRaw.displayName = "AutomationEmptyRecordsIconRaw";
	AutomationEmptyRecordsIcon = createIcon(AutomationEmptyRecordsIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ArrowUpIcon.tsx
var import_react$149, import_jsx_runtime$149, ArrowUpIconRaw, ArrowUpIcon;
var init_ArrowUpIcon = __esmMin((() => {
	import_react$149 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$149 = require_jsx_runtime();
	ArrowUpIconRaw = (0, import_react$149.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$149.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$149.jsx)("path", {
			d: "M8 3L8 13",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$149.jsx)("path", {
			d: "M3.5 7L8 3L12.5 7",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	}));
	ArrowUpIconRaw.displayName = "ArrowUpIconRaw";
	ArrowUpIcon = createIcon(ArrowUpIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ArrowUpRightIcon.tsx
var import_react$148, import_jsx_runtime$148, ArrowUpRightIconRaw, ArrowUpRightIcon;
var init_ArrowUpRightIcon = __esmMin((() => {
	import_react$148 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$148 = require_jsx_runtime();
	ArrowUpRightIconRaw = (0, import_react$148.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$148.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$148.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(0.707107 -0.707107 0.707107 0.707107 -0.352462 8.28647)",
			d: "M7.4694 11.9404L11.5552 7.8546L11.5649 7.845L11.5745 7.8354Q12.1772 7.2327 12.3683 6.9812Q12.75 6.4788 12.75 5.9702Q12.75 5.4616 12.3683 4.9593Q12.1772 4.7077 11.5745 4.1051L11.5552 4.0858L7.4694 0L6.529 0.9404L10.6148 5.0262L10.6341 5.0456Q10.7743 5.1858 10.8895 5.3054L0 5.3054L0 6.6354L10.8892 6.6354Q10.7741 6.7548 10.6341 6.8949L10.6245 6.9045L10.6148 6.9142L6.529 11L7.4694 11.9404Z"
		})
	}));
	ArrowUpRightIconRaw.displayName = "ArrowUpRightIconRaw";
	ArrowUpRightIcon = createIcon(ArrowUpRightIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AssistantFilledIcon.tsx
var import_react$147, import_jsx_runtime$147, AssistantFilledIconRaw, AssistantFilledIcon;
var init_AssistantFilledIcon = __esmMin((() => {
	import_react$147 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$147 = require_jsx_runtime();
	AssistantFilledIconRaw = (0, import_react$147.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$147.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$147.jsx)("path", {
			transform: "matrix(1 0 0 1 0.999871 0.252975)",
			fillRule: "evenodd",
			d: "M3.8917 1.7665C2.4102 1.8164 1.5104 1.9941 0.8788 2.6257C0 3.5045 0 4.9027 0.0001 7.665L0.0001 7.747L0.0001 7.8289C0 10.5913 0 11.9895 0.8788 12.8683C1.5021 13.4916 2.3866 13.6728 3.8338 13.7254Q3.0603 14.2464 2.5299 14.7768L3.4703 15.7172Q3.9238 15.2638 4.619 14.8003Q5.9515 13.912 7.0001 13.912Q8.0488 13.912 9.3813 14.8003Q10.0765 15.2638 10.5299 15.7172L11.4703 14.7768Q10.94 14.2464 10.1664 13.7254C11.6136 13.6728 12.4982 13.4916 13.1214 12.8683C14.0003 11.9895 14.0002 10.5913 14.0001 7.8289L14.0001 7.747L14.0001 7.665C14.0002 4.9027 14.0003 3.5045 13.1214 2.6257C12.4899 1.9941 11.5901 1.8164 10.1085 1.7665L10.6176 0.494L9.3827 0L8.6838 1.7473C8.4908 1.747 8.2904 1.747 8.0823 1.747L8.0821 1.747L8.0001 1.747L6.0001 1.747L5.9182 1.747L5.918 1.747C5.7099 1.747 5.5095 1.747 5.3165 1.7473L4.6176 0L3.3827 0.494L3.8917 1.7665ZM4.66 7.6646Q4.6788 7.8153 4.7784 8.0367Q4.9709 8.4645 5.3301 8.6697Q5.8762 8.9817 6.8163 8.7838Q8.1753 8.4977 10.1313 7.1937L10.869 8.3004Q6.777 11.0283 4.6702 9.8244Q3.9356 9.4046 3.5656 8.5824Q3.3839 8.1788 3.3403 7.8295L4.66 7.6646Z"
		})
	}));
	AssistantFilledIconRaw.displayName = "AssistantFilledIconRaw";
	AssistantFilledIcon = createIcon(AssistantFilledIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AssistantIcon.tsx
var import_react$146, import_jsx_runtime$146, AssistantIconRaw, AssistantIcon;
var init_AssistantIcon = __esmMin((() => {
	import_react$146 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$146 = require_jsx_runtime();
	AssistantIconRaw = (0, import_react$146.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$146.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$146.jsx)("path", {
			transform: "matrix(1 0 0 1 0.999871 0.252975)",
			fillRule: "evenodd",
			d: "M0.8788 2.6257C1.5104 1.9941 2.4102 1.8164 3.8917 1.7665L3.3827 0.494L4.6176 0L5.3165 1.7473C5.5095 1.747 5.7099 1.747 5.918 1.747L8.0821 1.747C8.2903 1.747 8.4907 1.747 8.6838 1.7473L9.3827 0L10.6176 0.494L10.1085 1.7665C11.5901 1.8164 12.4899 1.9941 13.1214 2.6257C14.0003 3.5045 14.0002 4.9027 14.0001 7.665L14.0001 7.747L14.0001 7.8289C14.0002 10.5913 14.0003 11.9895 13.1214 12.8683C12.4982 13.4916 11.6136 13.6728 10.1664 13.7254Q10.94 14.2464 11.4703 14.7768L10.5299 15.7172Q10.0765 15.2638 9.3813 14.8003Q8.0488 13.912 7.0001 13.912Q5.9515 13.912 4.619 14.8003Q3.9238 15.2638 3.4703 15.7172L2.5299 14.7768Q3.0603 14.2464 3.8338 13.7254C2.3866 13.6728 1.5021 13.4916 0.8788 12.8683C0 11.9895 0 10.5913 0.0001 7.8289L0.0001 7.665C0 4.9027 0 3.5045 0.8788 2.6257ZM1.3301 7.829L1.3301 7.747L1.3301 7.665Q1.3301 5.334 1.4277 4.6189Q1.5322 3.8532 1.8193 3.5661Q2.1064 3.279 2.872 3.1745Q3.5872 3.0769 5.9181 3.077L6.0001 3.077L8.0001 3.077L8.0821 3.077Q10.4131 3.0769 11.1282 3.1745Q11.8939 3.279 12.181 3.5661Q12.4681 3.8532 12.5726 4.6189Q12.6702 5.334 12.6701 7.665L12.6701 7.747L12.6701 7.829Q12.6702 10.1599 12.5726 10.8751Q12.4681 11.6408 12.181 11.9278Q11.8939 12.2149 11.1282 12.3194Q10.4131 12.4171 8.0821 12.417L8.0001 12.417L6.0001 12.417L5.9181 12.417Q3.5872 12.4171 2.872 12.3194Q2.1064 12.2149 1.8193 11.9278Q1.5322 11.6408 1.4277 10.8751Q1.3301 10.1599 1.3301 7.829ZM4.66 7.6645Q4.6788 7.8153 4.7784 8.0366Q4.9709 8.4644 5.3301 8.6696Q5.8762 8.9817 6.8163 8.7838Q8.1753 8.4977 10.1313 7.1937L10.869 8.3003Q6.777 11.0283 4.6702 9.8244Q3.9356 9.4046 3.5656 8.5824Q3.3839 8.1787 3.3403 7.8295L4.66 7.6645Z"
		})
	}));
	AssistantIconRaw.displayName = "AssistantIconRaw";
	AssistantIcon = createIcon(AssistantIconRaw);
})), import_jsx_runtime$145, OUTLINE_PATH, FILLED_PATH, PATH_OFFSET_X, PATH_OFFSET_Y, AssistantSpinnerIcon;
var init_AssistantSpinnerIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$145 = require_jsx_runtime();
	OUTLINE_PATH = "M0.8788 2.6257C1.5104 1.9941 2.4102 1.8164 3.8917 1.7665L3.3827 0.494L4.6176 0L5.3165 1.7473C5.5095 1.747 5.7099 1.747 5.918 1.747L8.0821 1.747C8.2903 1.747 8.4907 1.747 8.6838 1.7473L9.3827 0L10.6176 0.494L10.1085 1.7665C11.5901 1.8164 12.4899 1.9941 13.1214 2.6257C14.0003 3.5045 14.0002 4.9027 14.0001 7.665L14.0001 7.747L14.0001 7.8289C14.0002 10.5913 14.0003 11.9895 13.1214 12.8683C12.4982 13.4916 11.6136 13.6728 10.1664 13.7254Q10.94 14.2464 11.4703 14.7768L10.5299 15.7172Q10.0765 15.2638 9.3813 14.8003Q8.0488 13.912 7.0001 13.912Q5.9515 13.912 4.619 14.8003Q3.9238 15.2638 3.4703 15.7172L2.5299 14.7768Q3.0603 14.2464 3.8338 13.7254C2.3866 13.6728 1.5021 13.4916 0.8788 12.8683C0 11.9895 0 10.5913 0.0001 7.8289L0.0001 7.665C0 4.9027 0 3.5045 0.8788 2.6257ZM1.3301 7.829L1.3301 7.747L1.3301 7.665Q1.3301 5.334 1.4277 4.6189Q1.5322 3.8532 1.8193 3.5661Q2.1064 3.279 2.872 3.1745Q3.5872 3.0769 5.9181 3.077L6.0001 3.077L8.0001 3.077L8.0821 3.077Q10.4131 3.0769 11.1282 3.1745Q11.8939 3.279 12.181 3.5661Q12.4681 3.8532 12.5726 4.6189Q12.6702 5.334 12.6701 7.665L12.6701 7.747L12.6701 7.829Q12.6702 10.1599 12.5726 10.8751Q12.4681 11.6408 12.181 11.9278Q11.8939 12.2149 11.1282 12.3194Q10.4131 12.4171 8.0821 12.417L8.0001 12.417L6.0001 12.417L5.9181 12.417Q3.5872 12.4171 2.872 12.3194Q2.1064 12.2149 1.8193 11.9278Q1.5322 11.6408 1.4277 10.8751Q1.3301 10.1599 1.3301 7.829ZM4.66 7.6645Q4.6788 7.8153 4.7784 8.0366Q4.9709 8.4644 5.3301 8.6696Q5.8762 8.9817 6.8163 8.7838Q8.1753 8.4977 10.1313 7.1937L10.869 8.3003Q6.777 11.0283 4.6702 9.8244Q3.9356 9.4046 3.5656 8.5824Q3.3839 8.1787 3.3403 7.8295L4.66 7.6645Z";
	FILLED_PATH = "M3.8917 1.7665C2.4102 1.8164 1.5104 1.9941 0.8788 2.6257C0 3.5045 0 4.9027 0.0001 7.665L0.0001 7.747L0.0001 7.8289C0 10.5913 0 11.9895 0.8788 12.8683C1.5021 13.4916 2.3866 13.6728 3.8338 13.7254Q3.0603 14.2464 2.5299 14.7768L3.4703 15.7172Q3.9238 15.2638 4.619 14.8003Q5.9515 13.912 7.0001 13.912Q8.0488 13.912 9.3813 14.8003Q10.0765 15.2638 10.5299 15.7172L11.4703 14.7768Q10.94 14.2464 10.1664 13.7254C11.6136 13.6728 12.4982 13.4916 13.1214 12.8683C14.0003 11.9895 14.0002 10.5913 14.0001 7.8289L14.0001 7.747L14.0001 7.665C14.0002 4.9027 14.0003 3.5045 13.1214 2.6257C12.4899 1.9941 11.5901 1.8164 10.1085 1.7665L10.6176 0.494L9.3827 0L8.6838 1.7473C8.4908 1.747 8.2904 1.747 8.0823 1.747L8.0821 1.747L8.0001 1.747L6.0001 1.747L5.9182 1.747L5.918 1.747C5.7099 1.747 5.5095 1.747 5.3165 1.7473L4.6176 0L3.3827 0.494L3.8917 1.7665ZM4.66 7.6646Q4.6788 7.8153 4.7784 8.0367Q4.9709 8.4645 5.3301 8.6697Q5.8762 8.9817 6.8163 8.7838Q8.1753 8.4977 10.1313 7.1937L10.869 8.3004Q6.777 11.0283 4.6702 9.8244Q3.9356 9.4046 3.5656 8.5824Q3.3839 8.1788 3.3403 7.8295L4.66 7.6646Z";
	PATH_OFFSET_X = .999871;
	PATH_OFFSET_Y = .252975;
	AssistantSpinnerIcon = ({ width = 16, height = 16, className, style, spin = true, duration = 1.2, filled = false, ...rest }) => {
		const d = filled ? FILLED_PATH : OUTLINE_PATH;
		return /* @__PURE__ */ (0, import_jsx_runtime$145.jsx)("svg", {
			width,
			height,
			viewBox: "0 0 16 16",
			fill: "currentColor",
			xmlns: "http://www.w3.org/2000/svg",
			className,
			style,
			"aria-hidden": "true",
			...rest,
			children: /* @__PURE__ */ (0, import_jsx_runtime$145.jsx)("g", {
				transform: `translate(${PATH_OFFSET_X} ${PATH_OFFSET_Y})`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$145.jsxs)("g", {
					style: { transformOrigin: "7px 7.747px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime$145.jsx)("path", {
						fillRule: "evenodd",
						d
					}), spin ? /* @__PURE__ */ (0, import_jsx_runtime$145.jsx)("animateTransform", {
						attributeName: "transform",
						attributeType: "XML",
						type: "rotate",
						from: "0 7 7.747",
						to: "360 7 7.747",
						dur: `${duration}s`,
						repeatCount: "indefinite"
					}) : null]
				})
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/BatchOperationIcon.tsx
var import_react$144, import_jsx_runtime$144, BATCH_OPERATION_PATH, BatchOperationIconRaw, BatchOperationIcon;
var init_BatchOperationIcon = __esmMin((() => {
	import_react$144 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$144 = require_jsx_runtime();
	BATCH_OPERATION_PATH = [
		"M13.5497 11.5495C13.2223 11.8769 12.7755 12.0968 12.2093 12.2093C12.0968 12.7755 11.8769 13.2223 11.5495 13.5497",
		"C11.1755 13.9237 10.6458 14.1574 9.9603 14.251C9.5728 14.3039 8.8259 14.3303 7.7196 14.3303L7.665 14.3303L4.665 14.3303L4.6104 14.3303",
		"C3.5042 14.3303 2.7573 14.3039 2.3698 14.251C1.6843 14.1574 1.1546 13.9237 0.7806 13.5497C0.4066 13.1758 0.1729 12.646 0.0793 11.9605",
		"C0.0264 11.573 0 10.8261 0 9.7199L0 6.6107C0 5.5044 0.0264 4.7575 0.0793 4.37C0.1729 3.6845 0.4066 3.1548 0.7806 2.7808",
		"C1.108 2.4534 1.5548 2.2335 2.121 2.121C2.2335 1.5548 2.4534 1.108 2.7808 0.7806C3.1548 0.4066 3.6845 0.1729 4.37 0.0793",
		"C4.7575 0.0264 5.5044 0 6.6107 0L9.7199 0C10.8261 0 11.573 0.0264 11.9605 0.0793C12.646 0.1729 13.1758 0.4066 13.5497 0.7806",
		"C13.9237 1.1546 14.1574 1.6843 14.251 2.3698C14.3039 2.7573 14.3303 3.5042 14.3303 4.6104L14.3303 4.665L14.3303 7.665L14.3303 7.7196",
		"C14.3303 8.8259 14.3039 9.5728 14.251 9.9603C14.1574 10.6458 13.9237 11.1755 13.5497 11.5495ZM4.6104 2.0003Q3.9992 2.0003 3.5343 2.011",
		"C3.5854 1.8912 3.6478 1.7946 3.7213 1.721C3.8841 1.5583 4.1603 1.4503 4.5499 1.3971C4.8777 1.3524 5.5646 1.33 6.6106 1.33",
		"L9.7199 1.33C10.7659 1.33 11.4529 1.3524 11.7806 1.3971C12.1703 1.4503 12.4465 1.5583 12.6093 1.721C12.7721 1.8838 12.88 2.16 12.9332 2.5497",
		"C12.978 2.8775 13.0003 3.5644 13.0003 4.6104L13.0003 7.7197C13.0003 8.7657 12.978 9.4526 12.9332 9.7804C12.88 10.17 12.7721 10.4462 12.6093 10.609",
		"C12.5357 10.6825 12.4391 10.7449 12.3193 10.796C12.3265 10.4861 12.3301 10.1274 12.3301 9.7199L12.33 9.6653L12.33 6.6653L12.3301 6.6107",
		"C12.3301 5.5044 12.3036 4.7575 12.2508 4.37C12.1572 3.6845 11.9234 3.1548 11.5495 2.7808C11.1755 2.4069 10.6458 2.1731 9.9603 2.0796",
		"C9.5728 2.0267 8.8259 2.0002 7.7196 2.0003L4.6104 2.0003ZM1.33 6.6106L1.33 9.7199C1.33 10.7659 1.3524 11.4529 1.3971 11.7806",
		"C1.4503 12.1703 1.5583 12.4465 1.721 12.6093C1.8838 12.7721 2.16 12.88 2.5497 12.9332C2.8775 12.978 3.5644 13.0003 4.6104 13.0003",
		"L7.7197 13.0003C8.7657 13.0003 9.4526 12.978 9.7804 12.9332C10.17 12.88 10.4462 12.7721 10.609 12.6093C10.7718 12.4465 10.8798 12.1703 10.933 11.7806",
		"C10.9777 11.4529 11.0001 10.7659 11 9.7199L11 6.6106C11.0001 5.5646 10.9777 4.8777 10.933 4.5499C10.8798 4.1603 10.7718 3.8841 10.609 3.7213",
		"C10.4462 3.5585 10.17 3.4505 9.7804 3.3973C9.4526 3.3526 8.7657 3.3302 7.7197 3.3303L4.6104 3.3303C3.5644 3.3302 2.8775 3.3526 2.5497 3.3973",
		"C2.16 3.4505 1.8838 3.5585 1.721 3.7213C1.5583 3.8841 1.4503 4.1603 1.3971 4.5499C1.3524 4.8777 1.33 5.5646 1.33 6.6106",
		"ZM10.2313 7.2032L5.9195 11.515C5.7034 11.731 5.4402 11.8325 5.1298 11.8195C4.8417 11.8073 4.5938 11.6978 4.3861 11.4909",
		"L2.1948 9.2989L3.1354 8.3586L5.1649 10.3887L9.2908 6.2627L10.2313 7.2032Z"
	].join(" ");
	BatchOperationIconRaw = (0, import_react$144.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$144.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$144.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.834846 0.834845)",
			fillRule: "evenodd",
			d: BATCH_OPERATION_PATH
		})
	}));
	BatchOperationIconRaw.displayName = "BatchOperationIconRaw";
	BatchOperationIcon = createIcon(BatchOperationIconRaw, { size: 16 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/BellIcon.tsx
var import_react$143, import_jsx_runtime$143, BellIconRaw, BellIcon;
var init_BellIcon = __esmMin((() => {
	import_react$143 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$143 = require_jsx_runtime();
	BellIconRaw = (0, import_react$143.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$143.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$143.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.97998 0.201859)",
			d: "M6.622 1.2412L6.622 1.249C6.6191 1.5103 6.543 1.7455 6.4033 1.9414C6.2684 2.1303 6.0958 2.2532 5.9404 2.334C5.6527 2.4834 5.3139 2.5372 5.2079 2.5596C3.4456 2.9331 2.1231 4.499 2.123 6.3721L2.123 8.2314C2.123 8.7745 1.9825 9.3088 1.7148 9.7812L1.4384 10.2675C1.3519 10.4202 1.2954 10.5202 1.2558 10.5966C1.2164 10.6727 1.2106 10.6939 1.2119 10.6895C1.1898 10.7727 1.2031 10.8488 1.246 10.92C1.2924 10.9963 1.3795 11.0732 1.5029 11.1172C4.1424 12.0562 7.8982 12.0564 10.538 11.1172C10.6614 11.0732 10.7475 10.9963 10.7939 10.92C10.8371 10.8485 10.8503 10.7721 10.828 10.6884C10.8257 10.682 10.8157 10.6558 10.7851 10.5966C10.7455 10.5202 10.6881 10.4203 10.6015 10.2675L10.3261 9.7812C10.0584 9.3088 9.9179 8.7744 9.9179 8.2314L9.9179 6.3721C9.9178 4.6943 8.8564 3.2626 7.3671 2.7139L7.7822 1.5879C9.7279 2.3048 11.117 4.1755 11.1171 6.3721L11.1171 8.2314C11.1171 8.5671 11.2046 8.8974 11.37 9.1895L11.6454 9.6758C11.7273 9.8203 11.798 9.9435 11.8505 10.045C11.902 10.1443 11.9546 10.2576 11.9872 10.3799C12.2179 11.2454 11.6596 11.992 10.9403 12.248C10.3199 12.4688 9.6467 12.6393 8.9442 12.7657C8.7971 14.2528 7.5463 15.4147 6.0204 15.415C4.4941 15.4148 3.2393 14.2525 3.0927 12.7646C2.3917 12.6384 1.7197 12.4683 1.1005 12.248C0.3813 11.992 -0.178 11.2454 0.0527 10.3799C0.0853 10.2576 0.1389 10.1453 0.1904 10.0459C0.2429 9.9444 0.3124 9.8205 0.3945 9.6758L0.6699 9.1895C0.8354 8.8974 0.9228 8.5672 0.9228 8.2314L0.9228 6.3721C0.9229 3.9205 2.6535 1.8744 4.9589 1.3857C5.0574 1.3649 5.1224 1.354 5.2079 1.332C5.2866 1.3119 5.3451 1.2901 5.3867 1.2686C5.4039 1.2596 5.4146 1.2518 5.4208 1.2471L5.4218 1.2432L5.4199 0.002L6.6201 0L6.622 1.2412ZM4.3408 12.9366C4.544 13.6735 5.219 14.2146 6.0204 14.2148C6.8215 14.2146 7.4956 13.6738 7.6992 12.9375C6.5924 13.0461 5.4474 13.0452 4.3408 12.9366Z",
			fillRule: "evenodd"
		})
	}));
	BellIconRaw.displayName = "BellIconRaw";
	BellIcon = createIcon(BellIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/BriefcaseIcon.tsx
var import_react$142, import_jsx_runtime$142, BriefcaseIconRaw, BriefcaseIcon;
var init_BriefcaseIcon = __esmMin((() => {
	import_react$142 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$142 = require_jsx_runtime();
	BriefcaseIconRaw = (0, import_react$142.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$142.jsxs)("svg", {
		ref,
		viewBox: "0 0 22 22",
		fill: "none",
		stroke: "currentColor",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$142.jsx)("rect", {
				x: "3",
				y: "6.5",
				width: "16",
				height: "11",
				rx: "1.6",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$142.jsx)("path", {
				d: "M8 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 14 5v1.5",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$142.jsx)("path", {
				d: "M3 11.5h16",
				strokeWidth: "1.5"
			})
		]
	}));
	BriefcaseIconRaw.displayName = "BriefcaseIconRaw";
	BriefcaseIcon = createIcon(BriefcaseIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/BubbleCheckIcon.tsx
var import_react$141, import_jsx_runtime$141, BubbleCheckIconRaw, BubbleCheckIcon;
var init_BubbleCheckIcon = __esmMin((() => {
	import_react$141 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$141 = require_jsx_runtime();
	BubbleCheckIconRaw = (0, import_react$141.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$141.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$141.jsx)("path", {
			d: "M13.3332 4L5.99984 11.3333L2.6665 8",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	}));
	BubbleCheckIconRaw.displayName = "BubbleCheckIconRaw";
	BubbleCheckIcon = createIcon(BubbleCheckIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/BuildingIcon.tsx
var BuildingIcon;
var init_BuildingIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	BuildingIcon = createIcon(Building2, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CableIcon.tsx
var CableIcon;
var init_CableIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	CableIcon = createIcon(Cable, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CalendarDaysIcon.tsx
var CalendarDaysIcon;
var init_CalendarDaysIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	CalendarDaysIcon = createIcon(CalendarDays, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ChatBubbleIcon.tsx
var import_react$140, import_jsx_runtime$140, ChatBubbleIconRaw, ChatBubbleIcon;
var init_ChatBubbleIcon = __esmMin((() => {
	import_react$140 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$140 = require_jsx_runtime();
	ChatBubbleIconRaw = (0, import_react$140.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$140.jsxs)("svg", {
		ref,
		viewBox: "0 0 22 22",
		fill: "none",
		stroke: "currentColor",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$140.jsx)("path", {
			d: "M4 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-4 3v-3H7a3 3 0 0 1-3-3V6Z",
			strokeWidth: "1.5",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$140.jsx)("path", {
			d: "M8 8.5h6M8 11h4",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	}));
	ChatBubbleIconRaw.displayName = "ChatBubbleIconRaw";
	ChatBubbleIcon = createIcon(ChatBubbleIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CheckBoldIcon.tsx
var import_react$139, import_jsx_runtime$139, CheckBoldIconRaw, CheckBoldIcon;
var init_CheckBoldIcon = __esmMin((() => {
	import_react$139 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$139 = require_jsx_runtime();
	CheckBoldIconRaw = (0, import_react$139.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$139.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$139.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 2.67627 3.97617)",
			d: "M11.3137 0.9428L4.2426 8.0139L0 3.7712L0.9428 2.8284L4.2426 6.1283L10.3709 0L11.3137 0.9428Z"
		})
	}));
	CheckBoldIconRaw.displayName = "CheckBoldIconRaw";
	CheckBoldIcon = createIcon(CheckBoldIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CheckIcon.tsx
var import_react$138, import_jsx_runtime$138, CheckIconRaw, CheckIcon;
var init_CheckIcon = __esmMin((() => {
	import_react$138 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$138 = require_jsx_runtime();
	CheckIconRaw = (0, import_react$138.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$138.jsx)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$138.jsx)("polyline", { points: "20 6 9 17 4 12" })
	}));
	CheckIconRaw.displayName = "CheckIconRaw";
	CheckIcon = createIcon(CheckIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CheckinBubbleIcon.tsx
var import_react$137, import_jsx_runtime$137, CheckinBubbleIconRaw, CheckinBubbleIcon;
var init_CheckinBubbleIcon = __esmMin((() => {
	import_react$137 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$137 = require_jsx_runtime();
	CheckinBubbleIconRaw = (0, import_react$137.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$137.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$137.jsxs)("g", {
			clipPath: "url(#clip0_716_4958)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$137.jsx)("path", {
					d: "M7.3335 4.66669V11.3334C8.21755 11.3334 9.0654 10.9822 9.69052 10.357C10.3156 9.73192 10.6668 8.88408 10.6668 8.00002",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$137.jsx)("path", {
					d: "M10 5.33331L6 7.33331",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$137.jsx)("path", {
					d: "M2.5668 5.74669C2.46949 5.30838 2.48443 4.85259 2.61023 4.42158C2.73604 3.99058 2.96863 3.59832 3.28644 3.28117C3.60425 2.96402 3.997 2.73225 4.42827 2.60735C4.85953 2.48245 5.31535 2.46847 5.75346 2.56669C5.9946 2.18956 6.3268 1.8792 6.71943 1.66421C7.11206 1.44923 7.55249 1.33655 8.00013 1.33655C8.44776 1.33655 8.8882 1.44923 9.28083 1.66421C9.67346 1.8792 10.0057 2.18956 10.2468 2.56669C10.6856 2.46804 11.1422 2.48196 11.5741 2.60717C12.0061 2.73237 12.3994 2.96478 12.7174 3.28279C13.0354 3.6008 13.2678 3.99407 13.393 4.42603C13.5182 4.85798 13.5321 5.31458 13.4335 5.75336C13.8106 5.9945 14.121 6.32669 14.3359 6.71932C14.5509 7.11196 14.6636 7.55239 14.6636 8.00002C14.6636 8.44766 14.5509 8.88809 14.3359 9.28072C14.121 9.67336 13.8106 10.0056 13.4335 10.2467C13.5317 10.6848 13.5177 11.1406 13.3928 11.5719C13.2679 12.0032 13.0361 12.3959 12.719 12.7137C12.4018 13.0315 12.0096 13.2641 11.5786 13.3899C11.1476 13.5157 10.6918 13.5307 10.2535 13.4334C10.0126 13.8119 9.68018 14.1236 9.28688 14.3396C8.89358 14.5555 8.45215 14.6687 8.00346 14.6687C7.55478 14.6687 7.11335 14.5555 6.72004 14.3396C6.32674 14.1236 5.99429 13.8119 5.75346 13.4334C5.31535 13.5316 4.85953 13.5176 4.42827 13.3927C3.997 13.2678 3.60425 13.036 3.28644 12.7189C2.96863 12.4017 2.73604 12.0095 2.61023 11.5785C2.48443 11.1475 2.46949 10.6917 2.5668 10.2534C2.18677 10.0129 1.87374 9.68014 1.65683 9.28617C1.43992 8.8922 1.32617 8.44976 1.32617 8.00002C1.32617 7.55029 1.43992 7.10785 1.65683 6.71388C1.87374 6.31991 2.18677 5.9872 2.5668 5.74669Z",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$137.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime$137.jsx)("clipPath", {
			id: "clip0_716_4958",
			children: /* @__PURE__ */ (0, import_jsx_runtime$137.jsx)("rect", {
				width: "16",
				height: "16",
				fill: "white"
			})
		}) })]
	}));
	CheckinBubbleIconRaw.displayName = "CheckinBubbleIconRaw";
	CheckinBubbleIcon = createIcon(CheckinBubbleIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ChevronDownIcon.tsx
var import_react$136, import_jsx_runtime$136, ChevronDownIconRaw, ChevronDownIcon;
var init_ChevronDownIcon = __esmMin((() => {
	import_react$136 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$136 = require_jsx_runtime();
	ChevronDownIconRaw = (0, import_react$136.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$136.jsx)("svg", {
		ref,
		viewBox: "0 0 14 14",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$136.jsx)("path", {
			transform: "translate(2.967, 4.717)",
			d: "M7.2416 0L4.0333 3.2083L0.825 0L0 0.825L4.0333 4.8582L8.0666 0.825L7.2416 0Z"
		})
	}));
	ChevronDownIconRaw.displayName = "ChevronDownIconRaw";
	ChevronDownIcon = createIcon(ChevronDownIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ChevronLeftIcon.tsx
var ChevronLeftIcon;
var init_ChevronLeftIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	ChevronLeftIcon = createIcon(ChevronLeft, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ChevronRightIcon.tsx
var import_react$135, import_jsx_runtime$135, ChevronRightIconRaw, ChevronRightIcon;
var init_ChevronRightIcon = __esmMin((() => {
	import_react$135 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$135 = require_jsx_runtime();
	ChevronRightIconRaw = (0, import_react$135.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$135.jsx)("svg", {
		ref,
		viewBox: "0 0 10 10",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$135.jsx)("path", {
			d: "M3.5 2L6.5 5L3.5 8",
			stroke: "currentColor",
			strokeWidth: "1",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	}));
	ChevronRightIconRaw.displayName = "ChevronRightIconRaw";
	ChevronRightIcon = createIcon(ChevronRightIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ChevronsDownUpIcon.tsx
var ChevronsDownUpIcon;
var init_ChevronsDownUpIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	ChevronsDownUpIcon = createIcon(ChevronsDownUp, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ChevronsUpDownIcon.tsx
var ChevronsUpDownIcon;
var init_ChevronsUpDownIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	ChevronsUpDownIcon = createIcon(ChevronsUpDown, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CirclePauseIcon.tsx
var import_react$134, import_jsx_runtime$134, CirclePauseIconRaw, CirclePauseIcon;
var init_CirclePauseIcon = __esmMin((() => {
	import_react$134 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$134 = require_jsx_runtime();
	CirclePauseIconRaw = (0, import_react$134.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$134.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$134.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$134.jsx)("line", {
				x1: "10",
				y1: "15",
				x2: "10",
				y2: "9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$134.jsx)("line", {
				x1: "14",
				y1: "15",
				x2: "14",
				y2: "9"
			})
		]
	}));
	CirclePauseIconRaw.displayName = "CirclePauseIconRaw";
	CirclePauseIcon = createIcon(CirclePauseIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CirclePlayIcon.tsx
var import_react$133, import_jsx_runtime$133, CirclePlayIconRaw, CirclePlayIcon;
var init_CirclePlayIcon = __esmMin((() => {
	import_react$133 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$133 = require_jsx_runtime();
	CirclePlayIconRaw = (0, import_react$133.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$133.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$133.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}), /* @__PURE__ */ (0, import_jsx_runtime$133.jsx)("path", { d: "M10 8l6 4-6 4V8z" })]
	}));
	CirclePlayIconRaw.displayName = "CirclePlayIconRaw";
	CirclePlayIcon = createIcon(CirclePlayIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CircleXIcon.tsx
var CircleXIcon;
var init_CircleXIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	CircleXIcon = createIcon(CircleX, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ClawFilledIcon.tsx
var LobsterClawFilled;
var init_ClawFilledIcon = __esmMin((() => {
	init_lucide_react();
	LobsterClawFilled = createLucideIcon("lobster-claw-filled", [["path", {
		d: `
    M3.8917 1.7665
    C2.4102 1.8164 1.5104 1.9941 0.8788 2.6257
    C0 3.5045 0 4.9027 0.0001 7.665
    L0.0001 7.747
    L0.0001 7.8289
    C0 10.5913 0 11.9895 0.8788 12.8683
    C1.5021 13.4916 2.3866 13.6728 3.8338 13.7254
    Q3.0603 14.2464 2.5299 14.7768
    L3.4703 15.7172
    Q3.9238 15.2638 4.619 14.8003
    Q5.9515 13.912 7.0001 13.912
    Q8.0488 13.912 9.3813 14.8003
    Q10.0765 15.2638 10.5299 15.7172
    L11.4703 14.7768
    Q10.94 14.2464 10.1664 13.7254
    C11.6136 13.6728 12.4982 13.4916 13.1214 12.8683
    C14.0003 11.9895 14.0002 10.5913 14.0001 7.8289
    L14.0001 7.747
    L14.0001 7.665
    C14.0002 4.9027 14.0003 3.5045 13.1214 2.6257
    C12.4899 1.9941 11.5901 1.8164 10.1085 1.7665
    L10.6176 0.494
    L9.3827 0
    L8.6838 1.7473
    C8.4908 1.747 8.2904 1.747 8.0823 1.747
    L8.0821 1.747
    L8.0001 1.747
    L6.0001 1.747
    L5.9182 1.747
    L5.918 1.747
    C5.7099 1.747 5.5095 1.747 5.3165 1.7473
    L4.6176 0
    L3.3827 0.494
    L3.8917 1.7665
    Z
    M4.66 7.6646
    Q4.6788 7.8153 4.7784 8.0367
    Q4.9709 8.4645 5.3301 8.6697
    Q5.8762 8.9817 6.8163 8.7838
    Q8.1753 8.4977 10.1313 7.1937
    L10.869 8.3004
    Q6.777 11.0283 4.6702 9.8244
    Q3.9356 9.4046 3.5656 8.5824
    Q3.3839 8.1788 3.3403 7.8295
    L4.66 7.6646
    Z
`.replace(/\s+/g, " ").trim(),
		transform: "translate(0.999871 0.252975) scale(1.5)",
		fill: "currentColor",
		fillRule: "evenodd",
		stroke: "none",
		key: "lobster-claw-filled"
	}]]);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ClawIcon.tsx
var LobsterClaw, ClawIcon;
var init_ClawIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	init_ClawFilledIcon();
	LobsterClaw = createLucideIcon("lobster-claw", [["path", {
		d: `
    M0.8788 2.6257
    C1.5104 1.9941 2.4102 1.8164 3.8917 1.7665
    L3.3827 0.494
    L4.6176 0
    L5.3165 1.7473
    C5.5095 1.747 5.7099 1.747 5.918 1.747
    L8.0821 1.747
    C8.2903 1.747 8.4907 1.747 8.6838 1.7473
    L9.3827 0
    L10.6176 0.494
    L10.1085 1.7665
    C11.5901 1.8164 12.4899 1.9941 13.1214 2.6257
    C14.0003 3.5045 14.0002 4.9027 14.0001 7.665
    L14.0001 7.747
    L14.0001 7.8289
    C14.0002 10.5913 14.0003 11.9895 13.1214 12.8683
    C12.4982 13.4916 11.6136 13.6728 10.1664 13.7254
    Q10.94 14.2464 11.4703 14.7768
    L10.5299 15.7172
    Q10.0765 15.2638 9.3813 14.8003
    Q8.0488 13.912 7.0001 13.912
    Q5.9515 13.912 4.619 14.8003
    Q3.9238 15.2638 3.4703 15.7172
    L2.5299 14.7768
    Q3.0603 14.2464 3.8338 13.7254
    C2.3866 13.6728 1.5021 13.4916 0.8788 12.8683
    C0 11.9895 0 10.5913 0.0001 7.8289
    L0.0001 7.665
    C0 4.9027 0 3.5045 0.8788 2.6257
    Z
    M1.3301 7.829
    L1.3301 7.747
    L1.3301 7.665
    Q1.3301 5.334 1.4277 4.6189
    Q1.5322 3.8532 1.8193 3.5661
    Q2.1064 3.279 2.872 3.1745
    Q3.5872 3.0769 5.9181 3.077
    L6.0001 3.077
    L8.0001 3.077
    L8.0821 3.077
    Q10.4131 3.0769 11.1282 3.1745
    Q11.8939 3.279 12.181 3.5661
    Q12.4681 3.8532 12.5726 4.6189
    Q12.6702 5.334 12.6701 7.665
    L12.6701 7.747
    L12.6701 7.829
    Q12.6702 10.1599 12.5726 10.8751
    Q12.4681 11.6408 12.181 11.9278
    Q11.8939 12.2149 11.1282 12.3194
    Q10.4131 12.4171 8.0821 12.417
    L8.0001 12.417
    L6.0001 12.417
    L5.9181 12.417
    Q3.5872 12.4171 2.872 12.3194
    Q2.1064 12.2149 1.8193 11.9278
    Q1.5322 11.6408 1.4277 10.8751
    Q1.3301 10.1599 1.3301 7.829
    Z
    M4.66 7.6645
    Q4.6788 7.8153 4.7784 8.0366
    Q4.9709 8.4644 5.3301 8.6696
    Q5.8762 8.9817 6.8163 8.7838
    Q8.1753 8.4977 10.1313 7.1937
    L10.869 8.3003
    Q6.777 11.0283 4.6702 9.8244
    Q3.9356 9.4046 3.5656 8.5824
    Q3.3839 8.1787 3.3403 7.8295
    L4.66 7.6645
    Z
`.replace(/\s+/g, " ").trim(),
		transform: "translate(0.999871 0.252975) scale(1.5)",
		fill: "currentColor",
		fillRule: "evenodd",
		stroke: "none",
		key: "lobster-claw"
	}]]);
	ClawIcon = createIcon(LobsterClaw, {
		strokeWidth: 1.5,
		activeAsset: LobsterClawFilled
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ClawIconV2.tsx
var import_react$132, import_jsx_runtime$132, ClawIconV2Raw, ClawIconV2;
var init_ClawIconV2 = __esmMin((() => {
	import_react$132 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$132 = require_jsx_runtime();
	ClawIconV2Raw = (0, import_react$132.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$132.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$132.jsx)("path", {
			transform: "matrix(1 0 0 1 4.20955 5.7998)",
			fillRule: "evenodd",
			d: "M3.79 0C5.1154 0 6.1903 1.0741 6.1905 2.3994C6.1904 3.0519 5.9285 3.6426 5.5059 4.0752C5.8526 4.2701 6.1756 4.5168 6.458 4.8018C6.9822 5.3308 7.3934 6.0155 7.58 6.79L6.4121 7.0693C6.2817 6.5295 5.9929 6.0375 5.6055 5.6465C5.0685 5.1049 4.3932 4.8011 3.7988 4.7988C3.7959 4.7989 3.7929 4.7998 3.79 4.7998C3.7872 4.7998 3.7841 4.7988 3.7812 4.7988C3.1864 4.8027 2.5111 5.1066 1.9746 5.6475C1.5872 6.0383 1.2965 6.5295 1.166 7.0693L0 6.79C0.1866 6.0155 0.5987 5.3316 1.123 4.8027C1.4057 4.5178 1.7284 4.2711 2.0752 4.0762C1.6524 3.6435 1.3907 3.0522 1.3906 2.3994C1.3908 1.0742 2.4648 0.0002 3.79 0ZM3.79 1.1992C3.1276 1.1994 2.5901 1.737 2.5898 2.3994C2.5901 3.0619 3.1276 3.5994 3.79 3.5996C4.4527 3.5996 4.99 3.062 4.9902 2.3994C4.99 1.7369 4.4527 1.1992 3.79 1.1992Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$132.jsx)("path", {
			transform: "matrix(1 0 0 1 1.59693 0)",
			fillRule: "evenodd",
			d: "M4.5023 0C4.5023 0.4147 4.5614 0.9263 4.6819 1.4414C5.0593 1.4129 5.4341 1.4027 5.7933 1.4004L7.0159 1.4004C7.3582 1.4026 7.7154 1.4115 8.0755 1.4365C8.2229 0.8987 8.3031 0.3825 8.303 0L9.5023 0C9.5023 0.4584 9.4204 1.0212 9.2728 1.6006C10.067 1.7768 10.853 2.1124 11.5091 2.7598C12.2599 3.5006 12.5768 4.4021 12.7103 5.293C12.8405 6.162 12.8031 7.089 12.8031 7.8643L12.8031 9.4648C12.8031 10.2534 12.8233 11.1787 12.6742 12.0566C12.5223 12.9503 12.1878 13.8505 11.4417 14.5869C9.9962 16.0132 7.9676 15.9805 6.4183 15.9805C4.8657 15.9805 2.7964 15.9957 1.3519 14.5703C0.6056 13.8338 0.274 12.9373 0.1253 12.0469C-0.0205 11.1736 0.0032 10.251 0.0032 9.4648L0.0032 7.8643C0.0032 7.0846 -0.0287 6.1598 0.1077 5.2891C0.2473 4.3984 0.5697 3.4989 1.3187 2.7598C1.9596 2.1274 2.721 1.7917 3.4935 1.6123C3.3651 1.0301 3.3031 0.4646 3.303 0L4.5023 0ZM5.7943 2.6006C5.5541 2.6022 5.3166 2.6072 5.0823 2.6182C5.1345 2.7283 5.19 2.8346 5.2494 2.9355C5.4996 3.361 5.7831 3.64 6.0775 3.7695C6.3481 3.8884 6.7056 3.9152 7.2054 3.6846L7.4564 4.2295L7.7083 4.7744C6.9459 5.1263 6.2264 5.1452 5.5941 4.8672C4.9858 4.5995 4.5375 4.0919 4.2152 3.5439C4.0718 3.3002 3.9477 3.0373 3.8402 2.7656C3.1899 2.9062 2.6215 3.1603 2.1615 3.6143C1.6538 4.1154 1.408 4.7428 1.2933 5.4746C1.2344 5.8505 1.2112 6.2369 1.2034 6.6348L1.2034 9.4648C1.2034 10.3025 1.1838 11.099 1.3089 11.8486C1.4312 12.5808 1.6845 13.2121 2.1946 13.7158C3.2313 14.7388 4.7594 14.7803 6.4183 14.7803C8.0806 14.7803 9.563 14.7556 10.599 13.7334C11.1097 13.2294 11.3662 12.5932 11.4916 11.8555C11.6196 11.102 11.6029 10.3 11.6029 9.4648L11.6029 7.8643C11.6029 7.0158 11.6367 6.2243 11.5238 5.4707C11.4141 4.7387 11.1726 4.1128 10.6664 3.6133C10.1605 3.1144 9.5189 2.856 8.7787 2.7256C8.2143 2.6262 7.6216 2.6047 7.015 2.6006L5.7943 2.6006Z"
		})]
	}));
	ClawIconV2Raw.displayName = "ClawIconV2Raw";
	ClawIconV2 = createIcon(ClawIconV2Raw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ClockFilledIcon.tsx
var import_react$131, import_jsx_runtime$131, ClockFilledIconRaw;
var init_ClockFilledIcon = __esmMin((() => {
	import_react$131 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$131 = require_jsx_runtime();
	ClockFilledIconRaw = (0, import_react$131.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$131.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$131.jsx)("path", {
			transform: "matrix(1 0 0 1 0.0201073 0.0176201)",
			fillRule: "evenodd",
			d: "M2.9858 0Q1.151 1.1503 -0 2.9847L1.1266 3.6916Q2.1156 2.1153 3.6923 1.1268L2.9858 0ZM15.9598 2.9847Q14.8088 1.1503 12.974 0L12.2675 1.1268Q13.8441 2.1153 14.8332 3.6916L15.9598 2.9847ZM7.9805 0.8174Q10.9483 0.8174 13.0469 2.916Q15.1455 5.0145 15.1455 7.9824Q15.1455 10.6121 13.4979 12.5593L14.9507 14.0122L14.0103 14.9526L12.5574 13.4997Q10.6102 15.1474 7.9805 15.1474Q5.3508 15.1474 3.4035 13.4997L1.9507 14.9526L1.0103 14.0122L2.4631 12.5593Q0.8155 10.6121 0.8155 7.9824Q0.8155 5.0145 2.9141 2.916Q5.0126 0.8174 7.9805 0.8174ZM11.4501 6.4526L7.7895 10.1132L7.7849 10.1178Q7.3548 10.548 6.9799 10.548Q6.605 10.548 6.1749 10.1178L6.1703 10.1132L4.5097 8.4526L5.4501 7.5122L6.9799 9.0419L10.5097 5.5122L11.4501 6.4526Z"
		})
	}));
	ClockFilledIconRaw.displayName = "ClockFilledIconRaw";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ClockIcon.tsx
var import_react$130, import_jsx_runtime$130, ClockIconRaw, ClockIcon;
var init_ClockIcon = __esmMin((() => {
	import_react$130 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	init_ClockFilledIcon();
	import_jsx_runtime$130 = require_jsx_runtime();
	ClockIconRaw = (0, import_react$130.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$130.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$130.jsx)("path", {
			transform: "matrix(1 0 0 1 0.0196185 0.0176206)",
			fillRule: "evenodd",
			d: "M2.9858 0Q1.151 1.1503 -0 2.9847L1.1266 3.6916Q2.1156 2.1153 3.6923 1.1268L2.9858 0ZM15.9598 2.9847Q14.8088 1.1503 12.974 0L12.2675 1.1268Q13.8441 2.1153 14.8332 3.6916L15.9598 2.9847ZM13.0469 2.916Q10.9483 0.8174 7.9805 0.8174Q5.0126 0.8174 2.9141 2.916Q0.8155 5.0145 0.8155 7.9824Q0.8155 10.6121 2.4631 12.5593L1.0103 14.0122L1.9507 14.9526L3.4035 13.4997Q5.3508 15.1474 7.9805 15.1474Q10.6102 15.1474 12.5574 13.4997L14.0103 14.9526L14.9507 14.0122L13.4979 12.5593Q15.1455 10.6121 15.1455 7.9824Q15.1455 5.0145 13.0469 2.916ZM3.8545 3.8564Q5.5635 2.1474 7.9805 2.1474Q10.3974 2.1474 12.1064 3.8564Q13.8155 5.5654 13.8155 7.9824Q13.8155 10.3993 12.1064 12.1083Q10.3974 13.8174 7.9805 13.8174Q5.5635 13.8174 3.8545 12.1083Q2.1455 10.3993 2.1455 7.9824Q2.1455 5.5654 3.8545 3.8564ZM11.4507 6.4526L7.7901 10.1132L7.7855 10.1178Q7.3554 10.548 6.9805 10.548Q6.6056 10.548 6.1755 10.1178L6.1708 10.1132L4.5103 8.4526L5.4507 7.5122L6.9805 9.0419L10.5103 5.5122L11.4507 6.4526Z"
		})
	}));
	ClockIconRaw.displayName = "ClockIconRaw";
	ClockIcon = createIcon(ClockIconRaw, { activeAsset: ClockFilledIconRaw });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ClockIconV2.tsx
var import_react$129, import_jsx_runtime$129, ClockIconV2Raw, ClockIconV2;
var init_ClockIconV2 = __esmMin((() => {
	import_react$129 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$129 = require_jsx_runtime();
	ClockIconV2Raw = (0, import_react$129.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$129.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$129.jsx)("path", {
				transform: "matrix(1 0 0 1 1.28125 1.76855)",
				d: "M6.7197 0C10.4307 0.0003 13.4391 3.0087 13.4395 6.7197C13.4395 8.5168 12.7318 10.1479 11.583 11.3535L13.0634 13.2032L12.1259 13.9532L10.6807 12.1465C9.57 12.9586 8.2012 13.4394 6.7197 13.4395C5.6928 13.4395 4.7177 13.209 3.8457 12.796L4.3594 11.7119C5.0742 12.0505 5.8742 12.2402 6.7197 12.2403C9.7682 12.24 12.2402 9.7683 12.2403 6.7197C12.24 3.6715 9.768 1.1995 6.7197 1.1992C3.6712 1.1992 1.1995 3.6713 1.1992 6.7197C1.1992 8.068 1.6828 9.302 2.4854 10.2607C2.6321 10.4361 2.7721 10.6032 2.8711 10.7491C2.9691 10.8937 3.0899 11.1068 3.0918 11.3751C3.0935 11.6307 2.9914 11.8347 2.8965 11.9825C2.8065 12.1223 2.6787 12.2772 2.5527 12.4316L1.3086 13.9571L0.8438 13.5782L0.3789 13.1982L1.6221 11.6739C1.7331 11.5378 1.8018 11.4485 1.8486 11.3838C1.7906 11.3046 1.7035 11.1974 1.5645 11.0312C0.5879 9.8646 0 8.36 0 6.7197C0.0003 3.0086 3.0085 0 6.7197 0Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$129.jsx)("path", {
				transform: "matrix(1 0 0 1 4.87598 6.37598)",
				d: "M6.3476 0.8477L2.8477 4.3476C2.6133 4.5819 2.2343 4.5819 2 4.3476L0 2.3477L0.8477 1.5L2.4238 3.0762L5.5 0L6.3476 0.8477Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$129.jsx)("path", {
				transform: "matrix(1 0 0 1 0.287109 0.518555)",
				d: "M4.2637 1.0732C2.9155 1.749 1.7939 2.8086 1.04 4.1084L0 3.5078C0.8713 2.0051 2.169 0.781 3.7275 0L4.2637 1.0732Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$129.jsx)("path", {
				transform: "matrix(1 0 0 1 11.4492 0.518555)",
				d: "M0.5371 0C2.0952 0.7808 3.3934 2.0038 4.2647 3.5059L3.2246 4.1074C2.4707 2.8077 1.3483 1.7489 0 1.0732L0.5371 0Z"
			})
		]
	}));
	ClockIconV2Raw.displayName = "ClockIconV2Raw";
	ClockIconV2 = createIcon(ClockIconV2Raw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CnbIcon.tsx
var import_react$128, import_jsx_runtime$128, CnbIconRaw, CnbIcon;
var init_CnbIcon = __esmMin((() => {
	import_react$128 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$128 = require_jsx_runtime();
	CnbIconRaw = (0, import_react$128.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$128.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		stroke: "none",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$128.jsx)("path", { d: "M11.5286 1.87149C11.5769 1.73005 11.5356 1.5733 11.4233 1.47452C11.0472 1.14247 10.0965 0.443125 8.66911 0.339708C7.07054 0.223769 6.08089 0.652279 5.58096 0.969951C5.36531 1.10676 5.35326 1.41748 5.55499 1.57422L9.62723 4.73936C9.98617 5.01807 10.5125 4.8604 10.6591 4.43003L11.5286 1.87149Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$128.jsx)("path", { d: "M1.49017 11.2664C1.32368 11.3781 1.24855 11.584 1.30235 11.7774C1.45724 12.3339 1.91868 13.4919 3.22833 14.5456C4.53797 15.5992 6.08738 15.7128 6.74962 15.6966C6.94764 15.692 7.12016 15.5617 7.17998 15.3724L9.79046 7.11064C9.97875 6.51425 9.31048 6.01386 8.79154 6.3626L1.49017 11.2664Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$128.jsx)("path", { d: "M3.39813 2.54827C3.27013 2.49773 3.12683 2.50607 3.00579 2.57193C2.52256 2.83488 1.28526 3.64506 0.647135 5.30947C0.154627 6.59222 0.328071 8.01085 0.463488 8.70463C0.508009 8.9314 0.747306 9.06218 0.962489 8.97824L8.79485 5.92024C9.35414 5.70181 9.35646 4.91111 8.7981 4.6899L3.39813 2.54827Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$128.jsx)("path", { d: "M15.0167 8.46843C15.243 8.62194 15.5528 8.48652 15.5922 8.21569C15.6961 7.49872 15.7861 6.25076 15.371 5.30933C14.8177 4.05487 13.8786 3.28133 13.433 2.9669C13.292 2.86766 13.1019 2.87786 12.9725 2.99241L10.9959 4.74541C10.6732 5.03154 10.7066 5.54492 11.0636 5.78746L15.0167 8.46936V8.46843Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$128.jsx)("path", { d: "M9.49413 15.1604C9.47372 15.3937 9.67128 15.5866 9.90409 15.5616C10.6531 15.4813 12.1918 15.1841 13.3447 14.0827C14.467 13.0109 14.832 11.7384 14.9382 11.2319C14.9669 11.0951 14.9326 10.9528 14.8445 10.8442L11.3886 6.57909C11.0143 6.11719 10.2681 6.34535 10.2162 6.93757L9.49366 15.1604H9.49413Z" })
		]
	}));
	CnbIconRaw.displayName = "CnbIconRaw";
	CnbIcon = createIcon(CnbIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ConfigureIcon.tsx
var import_react$127, import_jsx_runtime$127, ConfigureIconRaw, ConfigureIcon;
var init_ConfigureIcon = __esmMin((() => {
	import_react$127 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$127 = require_jsx_runtime();
	ConfigureIconRaw = (0, import_react$127.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$127.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$127.jsx)("path", {
			transform: "matrix(1 0 0 1 0.999868 1.49989)",
			fillRule: "evenodd",
			d: "M0.3011 12.4122Q0.6022 12.7102 1.0178 12.6286L1.9012 12.4553Q4.4733 11.9508 6.3267 10.0973L11.9021 4.5219Q12.678 3.7461 12.678 2.6489Q12.678 1.5517 11.9021 0.7758Q11.1263 0 10.0291 0Q8.9319 0 8.1561 0.7758L2.6125 6.3194Q0.7248 8.2071 0.2379 10.8318L0.0773 11.6977Q0 12.1142 0.3011 12.4122ZM11.0536 3.6734L10.7156 4.0114L8.6671 1.9618L9.0046 1.6244Q9.429 1.2 10.0291 1.2Q10.6292 1.2 11.0536 1.6244Q11.478 2.0487 11.478 2.6489Q11.478 3.249 11.0536 3.6734ZM1.3645 11.3378L1.6702 11.2778Q3.8834 10.8436 5.4782 9.2488L9.8671 4.86L7.8186 2.8103L3.461 7.1679Q1.8368 8.7922 1.4178 11.0507L1.3645 11.3378ZM6.0001 11.3L13.0001 11.3L13.0001 12.5L6.0001 12.5L6.0001 11.3Z"
		})
	}));
	ConfigureIconRaw.displayName = "ConfigureIconRaw";
	ConfigureIcon = createIcon(ConfigureIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ConnectorButtonIcon.tsx
var import_react$126, import_jsx_runtime$126, ConnectorButtonIconRaw, ConnectorButtonIcon;
var init_ConnectorButtonIcon = __esmMin((() => {
	import_react$126 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$126 = require_jsx_runtime();
	ConnectorButtonIconRaw = (0, import_react$126.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$126.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$126.jsx)("path", { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$126.jsx)("path", { d: "m2 22 3-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime$126.jsx)("path", { d: "M7.5 13.5 10 11" }),
			/* @__PURE__ */ (0, import_jsx_runtime$126.jsx)("path", { d: "M10.5 16.5 13 14" }),
			/* @__PURE__ */ (0, import_jsx_runtime$126.jsx)("path", { d: "m18 3-4 4h6l-4 4" })
		]
	}));
	ConnectorButtonIconRaw.displayName = "ConnectorButtonIconRaw";
	ConnectorButtonIcon = createIcon(ConnectorButtonIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ConnectorTabIcon.tsx
var import_react$125, import_jsx_runtime$125, ConnectorTabIconRaw, ConnectorTabIcon;
var init_ConnectorTabIcon = __esmMin((() => {
	import_react$125 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$125 = require_jsx_runtime();
	ConnectorTabIconRaw = (0, import_react$125.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$125.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$125.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.435199 0.715962)",
			d: "M7.5656 4.2827C8.2868 4.6991 8.7999 5.2128 9.1214 5.8068C9.4424 6.4 9.5528 7.0359 9.5284 7.6644C9.5192 7.8997 9.4911 8.1358 9.4474 8.3709L8.3226 7.7215C8.325 7.6869 8.3279 7.6525 8.3293 7.6183C8.3469 7.1636 8.2661 6.7484 8.0655 6.3778C7.8653 6.0082 7.5257 5.6444 6.966 5.3213C6.4063 4.9981 5.9214 4.8859 5.5013 4.8973C5.08 4.9089 4.68 5.0465 4.2951 5.2892C3.5056 5.787 2.8232 6.6961 2.254 7.6819C1.6848 8.6678 1.2387 9.7133 1.2024 10.6459C1.1847 11.1006 1.2655 11.5158 1.4661 11.8864C1.6663 12.256 2.0059 12.6198 2.5656 12.9429C3.1254 13.2661 3.6102 13.3783 4.0304 13.3669C4.4516 13.3553 4.8516 13.2177 5.2365 12.975C5.7924 12.6245 6.2937 12.0689 6.7412 11.4273L7.784 12.0294C7.2672 12.7855 6.6365 13.511 5.876 13.9904C5.3439 14.3258 4.738 14.5482 4.0638 14.5668C3.3886 14.5853 2.6872 14.3978 1.966 13.9815C1.2448 13.5651 0.7317 13.0514 0.4102 12.4574C0.0892 11.8642 -0.0211 11.2283 0.0033 10.5998C0.0512 9.3663 0.6211 8.1118 1.2154 7.0823C1.8098 6.0528 2.6114 4.932 3.6556 4.2738C4.1877 3.9384 4.7936 3.716 5.4678 3.6974C6.143 3.6789 6.8445 3.8663 7.5656 4.2827ZM13.1637 0.5865C13.8848 1.0029 14.3979 1.5167 14.7195 2.1106C15.0405 2.7038 15.1508 3.3397 15.1264 3.9683C15.0785 5.2017 14.5086 6.4563 13.9142 7.4858C13.3199 8.5153 12.5183 9.636 11.4741 10.2943C10.942 10.6296 10.3361 10.8521 9.6618 10.8706C8.9867 10.8892 8.2852 10.7017 7.5641 10.2853C6.8429 9.869 6.3298 9.3552 6.0083 8.7613C5.6873 8.1681 5.5769 7.5322 5.6013 6.9037C5.6105 6.6684 5.6386 6.4323 5.6823 6.1971L6.8071 6.8465C6.8046 6.8811 6.8018 6.9155 6.8004 6.9498C6.7828 7.4045 6.8636 7.8197 7.0642 8.1903C7.2643 8.5599 7.6039 8.9236 8.1637 9.2468C8.7234 9.5699 9.2083 9.6822 9.6284 9.6707C10.0497 9.6591 10.4496 9.5215 10.8346 9.2789C11.6241 8.7811 12.3065 7.872 12.8757 6.8862C13.4449 5.9003 13.8909 4.8548 13.9273 3.9221C13.945 3.4674 13.8642 3.0523 13.6636 2.6816C13.4634 2.3121 13.1238 1.9483 12.5641 1.6251C12.0043 1.3019 11.5195 1.1897 11.0993 1.2012C10.6781 1.2128 10.2781 1.3504 9.8932 1.593C9.3373 1.9435 8.836 2.4991 8.3884 3.1407L7.3456 2.5387C7.8624 1.7825 8.4932 1.057 9.2537 0.5776C9.7858 0.2422 10.3917 0.0198 11.0659 0.0013C11.7411 -0.0173 12.4425 0.1702 13.1637 0.5865Z"
		})
	}));
	ConnectorTabIconRaw.displayName = "ConnectorTabIconRaw";
	ConnectorTabIcon = createIcon(ConnectorTabIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DateIcon.tsx
var import_react$124, import_jsx_runtime$124, DateIconRaw, DateIcon;
var init_DateIcon = __esmMin((() => {
	import_react$124 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$124 = require_jsx_runtime();
	DateIconRaw = (0, import_react$124.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$124.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$124.jsx)("path", { d: "M8 2v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$124.jsx)("path", { d: "M16 2v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$124.jsx)("rect", {
				width: "18",
				height: "18",
				x: "3",
				y: "4",
				rx: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$124.jsx)("path", { d: "M3 10h18" })
		]
	}));
	DateIconRaw.displayName = "DateIconRaw";
	DateIcon = createIcon(DateIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DeleteIcon.tsx
var import_react$123, import_jsx_runtime$123, DeleteIconRaw, DeleteIcon;
var init_DeleteIcon = __esmMin((() => {
	import_react$123 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$123 = require_jsx_runtime();
	DeleteIconRaw = (0, import_react$123.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$123.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$123.jsx)("path", {
			transform: "matrix(1 0 0 1 1 0.999994)",
			fillRule: "evenodd",
			d: "M10.9 2.4L14 2.4L14 3.6L10 3.6L10 3.6L2.6 3.6L2.6 8Q2.6 9.9963 2.7623 10.4595Q3.2238 11.7762 4.5405 12.2377Q5.0037 12.4 7 12.4Q8.9963 12.4 9.4595 12.2377Q10.7762 11.7762 11.2377 10.4595Q11.4 9.9963 11.4 8L11.4 4.8L12.6 4.8L12.6 8Q12.6 10.2005 12.3702 10.8564Q11.7178 12.7178 9.8564 13.3702Q9.2005 13.6 7 13.6Q4.7995 13.6 4.1436 13.3702Q2.2822 12.7178 1.6298 10.8564Q1.4 10.2005 1.4 8L1.4 3.6L0 3.6L0 2.4L3.1 2.4L3.1769 2.2154Q3.5157 1.4024 3.6718 1.1187Q3.9532 0.6073 4.3351 0.3527Q4.717 0.0981 5.2973 0.035Q5.6192 0 6.5 0L7.5 0Q8.3808 0 8.7027 0.035Q9.283 0.0981 9.6649 0.3527Q10.0468 0.6073 10.3282 1.1187Q10.4843 1.4024 10.8231 2.2154L10.9 2.4ZM4.4025 2.4Q4.8023 1.4835 5.0008 1.3512Q5.2275 1.2 6.5 1.2L7.5 1.2Q8.7725 1.2 8.9992 1.3512Q9.1977 1.4835 9.5975 2.4L4.4025 2.4ZM7.6 5L6.4 5L6.4 11L7.6 11L7.6 5Z"
		})
	}));
	DeleteIconRaw.displayName = "DeleteIconRaw";
	DeleteIcon = createIcon(DeleteIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DiscoverIcon.tsx
var DiscoverIcon;
var init_DiscoverIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	DiscoverIcon = createIcon(Compass, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DownloadIcon.tsx
var DownloadIcon;
var init_DownloadIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	DownloadIcon = createIcon(Download, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DownloadTrayIcon.tsx
var import_react$122, import_jsx_runtime$122, DownloadTrayIconRaw, DownloadTrayIcon;
var init_DownloadTrayIcon = __esmMin((() => {
	import_react$122 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$122 = require_jsx_runtime();
	DownloadTrayIconRaw = (0, import_react$122.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$122.jsx)("svg", {
		ref,
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$122.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(0 -1 1 0 1.63754 12.3219)",
			d: "M3.072 10.6849Q3.5599 10.725 4.9563 10.725L4.9563 9.75Q3.5999 9.75 3.1519 9.7132Q2.5469 9.6635 2.2227 9.4965Q1.5665 9.1585 1.2285 8.5023Q1.0615 8.1781 1.0118 7.5731Q0.975 7.1252 0.975 5.7688L0.975 4.9563Q0.975 3.5999 1.0118 3.1519Q1.0615 2.5469 1.2285 2.2227Q1.5665 1.5665 2.2227 1.2285Q2.5469 1.0615 3.1519 1.0118Q3.5999 0.975 4.9563 0.975L4.9563 0Q3.5599 0 3.072 0.0401Q2.2733 0.1057 1.7763 0.3617Q0.8426 0.8426 0.3617 1.7763Q0.1057 2.2733 0.0401 3.072Q0 3.5599 0 4.9563L0 5.7688Q0 7.1652 0.0401 7.653Q0.1057 8.4517 0.3617 8.9487Q0.8426 9.8824 1.7763 10.3633Q2.2733 10.6193 3.072 10.6849ZM5.3207 5.8501L7.3323 7.8616L6.6429 8.5511L4.4557 6.3639L4.4467 6.3549Q4.1584 6.0666 4.0623 5.9401Q3.8486 5.6589 3.8486 5.3626Q3.8486 5.0662 4.0623 4.7851Q4.1584 4.6586 4.4467 4.3702L4.4557 4.3613L6.6429 2.1741L7.3323 2.8636L5.3207 4.8751L10.6438 4.8751L10.6438 5.8501L5.3207 5.8501Z"
		})
	}));
	DownloadTrayIconRaw.displayName = "DownloadTrayIconRaw";
	DownloadTrayIcon = createIcon(DownloadTrayIconRaw, { size: "sm" });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/EditorIcon.tsx
var import_react$121, import_jsx_runtime$121, EditorIconRaw, EditorIcon;
var init_EditorIcon = __esmMin((() => {
	import_react$121 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$121 = require_jsx_runtime();
	EditorIconRaw = (0, import_react$121.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("svg", {
		ref,
		viewBox: "0 0 20 20",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("g", {
			clipPath: "url(#clip0_editor)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("rect", {
					width: "20",
					height: "20",
					rx: "10",
					fill: "url(#paint0_linear_editor)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("g", {
					filter: "url(#filter0_f_editor)",
					children: /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("circle", {
						cx: "6.30367",
						cy: "17.4899",
						r: "7.04048",
						fill: "#32E6B9",
						fillOpacity: "0.4"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("g", {
					filter: "url(#filter1_f_editor)",
					children: /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("circle", {
						cx: "16.6701",
						cy: "21.8092",
						r: "6.43522",
						fill: "#32E6B9"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("path", {
					d: "M15.2962 1.56379C15.4923 1.38793 15.5045 1.38153 15.6483 1.3729C15.8812 1.35596 16.0947 1.46793 16.4579 1.79857C17.3065 2.56982 18.4879 4.15522 19.2226 5.50904L19.5065 6.03408L19.907 6.23361C20.294 6.42916 20.9291 6.83028 21.1944 7.04538C21.3142 7.1445 21.3316 7.14679 21.4561 7.09836C22.0189 6.87918 22.8251 7.16943 23.5362 7.8516C24.1763 8.46505 24.7893 9.51304 25.0242 10.3878C25.0585 10.5286 25.1042 10.8317 25.1208 11.0571C25.1744 11.8486 24.9199 12.4806 24.4311 12.7668C24.3315 12.8243 24.3247 12.8405 24.3275 13.0893C24.35 14.2747 24.0306 15.4578 23.3887 16.6117C22.6641 17.9073 21.3742 19.2477 19.6282 20.5104C18.6906 21.1927 16.472 22.485 15.4688 22.9389C13.0659 24.0207 11.1389 24.4357 9.46567 24.2307C8.46779 24.1097 7.33866 23.72 6.67033 23.2679C6.49439 23.1463 6.46636 23.1395 6.33198 23.178C5.61649 23.3835 4.67927 22.9607 3.88318 22.0772C3.56573 21.724 3.05317 20.8568 2.88691 20.3926C2.50259 19.3063 2.5789 18.3253 3.09083 17.7399C3.22283 17.5894 3.22677 17.583 3.19789 17.3296C3.15021 16.9147 3.12908 16.3008 3.15085 15.9044L3.16797 15.5337L2.61198 14.5511C1.75112 13.0194 1.20431 11.7323 0.993364 10.7496C0.882147 10.2113 0.888755 9.97199 1.02533 9.79517C1.10858 9.68836 1.3826 9.57806 1.71174 9.51728C2.54047 9.37193 4.34715 9.50352 6.35722 9.8584L6.56633 9.89442L7.02542 9.48841C7.78719 8.81363 8.29342 8.43518 9.22644 7.85342C10.1989 7.24502 11.2963 6.74489 12.5321 6.34857L12.9287 6.22108L13.1464 5.64886C13.9269 3.58854 14.7263 2.06908 15.2962 1.56379ZM8.75899 12.1219C7.87702 12.6311 7.43578 12.8857 7.11171 13.1711C5.79932 14.3267 5.3087 16.1577 5.86743 17.8148C6.00545 18.2238 6.26036 18.6652 6.76944 19.547C7.27858 20.4288 7.53327 20.8702 7.81861 21.1943C8.97427 22.5065 10.8049 22.9964 12.4618 22.4377C12.8709 22.2997 13.3121 22.0449 14.194 21.5357L19.2684 18.606C20.1504 18.0968 20.5916 17.8422 20.9157 17.5568C22.2279 16.4013 22.7181 14.5713 22.1596 12.9145C22.0217 12.5054 21.7676 12.0636 21.2585 11.1818C20.7493 10.2999 20.4937 9.85903 20.2084 9.53497C19.0528 8.22262 17.2226 7.73156 15.5656 8.29021C15.1564 8.42818 14.7154 8.683 13.8334 9.19222L8.75899 12.1219Z",
					fill: "url(#paint1_linear_editor)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("rect", {
					x: "9.2478",
					y: "15.6673",
					width: "2.00452",
					height: "4.16323",
					rx: "1.00226",
					transform: "rotate(-30 9.2478 15.6673)",
					fill: "white"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("rect", {
					x: "14.656",
					y: "12.5449",
					width: "2.00452",
					height: "4.16323",
					rx: "1.00226",
					transform: "rotate(-30 14.656 12.5449)",
					fill: "white"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("filter", {
				id: "filter0_f_editor",
				x: "-7.45804",
				y: "3.72824",
				width: "27.5235",
				height: "27.5234",
				filterUnits: "userSpaceOnUse",
				colorInterpolationFilters: "sRGB",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("feFlood", {
						floodOpacity: "0",
						result: "BackgroundImageFix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("feBlend", {
						mode: "normal",
						in: "SourceGraphic",
						in2: "BackgroundImageFix",
						result: "shape"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("feGaussianBlur", {
						stdDeviation: "3.36061",
						result: "effect1_foregroundBlur_editor"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("filter", {
				id: "filter1_f_editor",
				x: "4.73467",
				y: "9.87377",
				width: "23.8707",
				height: "23.8708",
				filterUnits: "userSpaceOnUse",
				colorInterpolationFilters: "sRGB",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("feFlood", {
						floodOpacity: "0",
						result: "BackgroundImageFix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("feBlend", {
						mode: "normal",
						in: "SourceGraphic",
						in2: "BackgroundImageFix",
						result: "shape"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("feGaussianBlur", {
						stdDeviation: "2.75009",
						result: "effect1_foregroundBlur_editor"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("linearGradient", {
				id: "paint0_linear_editor",
				x1: "10",
				y1: "0",
				x2: "10",
				y2: "20",
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("stop", { stopColor: "#6C4DFF" }), /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("stop", {
					offset: "1",
					stopColor: "#583ED3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$121.jsxs)("linearGradient", {
				id: "paint1_linear_editor",
				x1: "8.33162",
				y1: "5.53968",
				x2: "17.6877",
				y2: "21.7449",
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("stop", {
					stopColor: "white",
					stopOpacity: "0.8"
				}), /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("stop", {
					offset: "0.437689",
					stopColor: "white"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("clipPath", {
				id: "clip0_editor",
				children: /* @__PURE__ */ (0, import_jsx_runtime$121.jsx)("rect", {
					width: "20",
					height: "20",
					rx: "10",
					fill: "white"
				})
			})
		] })]
	}));
	EditorIconRaw.displayName = "EditorIconRaw";
	EditorIcon = createIcon(EditorIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ErrorCircleIcon.tsx
var import_react$120, import_jsx_runtime$120, ErrorCircleIconRaw, ErrorCircleIcon;
var init_ErrorCircleIcon = __esmMin((() => {
	import_react$120 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$120 = require_jsx_runtime();
	ErrorCircleIconRaw = (0, import_react$120.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$120.jsx)("svg", {
		ref,
		viewBox: "0 0 14.2 14.2",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$120.jsx)("path", {
			fill: "#F64041",
			fillRule: "evenodd",
			d: "M7.1 1.2Q9.1261 1.2 10.7207 2.4413L11.4578 1.4943Q9.5381 0 7.1 0Q4.1591 0 2.0796 2.0796Q0 4.1591 0 7.1Q0 10.0409 2.0796 12.1205Q4.1591 14.2 7.1 14.2Q10.0409 14.2 12.1205 12.1205Q14.2 10.0409 14.2 7.1Q14.2 4.8675 12.9272 3.0426L11.9429 3.7291Q13 5.2447 13 7.1Q13 9.5439 11.2719 11.2719Q9.5439 13 7.1 13Q4.6561 13 2.9281 11.2719Q1.2 9.5439 1.2 7.1Q1.2 4.6561 2.9281 2.9281Q4.6561 1.2 7.1 1.2ZM7.6985 8.6V3.1H6.4985V8.6H7.6985ZM6.4985 11.1V9.9H7.6985V11.1H6.4985Z"
		})
	}));
	ErrorCircleIconRaw.displayName = "ErrorCircleIconRaw";
	ErrorCircleIcon = createIcon(ErrorCircleIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ExpertIcon.tsx
var import_react$119, import_jsx_runtime$119, ExpertIconRaw, ExpertFilledIconRaw, ExpertIcon, SummonIcon;
var init_ExpertIcon = __esmMin((() => {
	init_lucide_react();
	import_react$119 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$119 = require_jsx_runtime();
	ExpertIconRaw = (0, import_react$119.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("path", {
			transform: "matrix(1 0 0 1 1.36963 0.768944)",
			fillRule: "evenodd",
			d: "M7.1035 0C8.6643 0 10.7053 0.0099 12.0742 1.5205C13.2979 2.8714 13.3086 4.7621 13.3086 6.1885L13.3086 8.1777C13.3086 10.1172 12.4294 11.8523 11.0498 13.004C8.8995 14.7989 5.3968 15.0938 3.2227 13.0078C2.3428 12.1634 1.8536 11.0199 1.7246 9.7939C0.8046 9.5348 0.112 8.7337 0.0127 7.7568L0 7.5146C0.0001 6.2068 1.0603 5.1465 2.3682 5.1465L2.6104 5.1592C3.6191 5.2617 4.4383 5.9978 4.6689 6.9629L5.6562 6.9629C5.9052 5.9216 6.8394 5.1465 7.957 5.1465L8.1992 5.1592C9.3932 5.2805 10.3251 6.2887 10.3252 7.5146L10.3125 7.7568C10.1912 8.9509 9.1831 9.8828 7.957 9.8828L7.7148 9.8701C6.7393 9.7711 5.939 9.0803 5.6787 8.1621L4.6445 8.1621C4.4136 8.9759 3.7594 9.6106 2.9346 9.8134C3.0599 10.7423 3.4425 11.555 4.0537 12.1416C5.6974 13.7188 8.498 13.5697 10.2803 12.0821C11.3984 11.1486 12.1084 9.7464 12.1084 8.1777L12.1084 6.1885C12.1084 4.677 12.0504 3.281 11.1856 2.3262C10.2269 1.2683 8.7608 1.1992 7.1035 1.1992C5.2192 1.1992 3.708 1.2459 2.6699 1.292C2.179 1.3138 1.7933 1.3357 1.5244 1.3525C1.4552 1.8424 1.5142 2.1892 1.625 2.4326C1.7619 2.733 2.0131 2.9569 2.3867 3.1113C3.1734 3.4364 4.3684 3.392 5.4512 3.1201L5.7441 4.2842C4.5613 4.5812 3.0644 4.6898 1.9287 4.2207C1.3415 3.978 0.8226 3.567 0.5322 2.9297C0.2457 2.2999 0.2194 1.5309 0.4434 0.6396L0.4736 0.5488C0.5603 0.3473 0.7528 0.2058 0.9766 0.1875L0.9785 0.1875C0.9785 0.1875 0.9822 0.1867 0.9844 0.1865C0.9892 0.1862 0.997 0.1862 1.0059 0.1855C1.0243 0.1841 1.0517 0.1813 1.0869 0.1787C1.1586 0.1735 1.265 0.166 1.4033 0.1572C1.6808 0.1396 2.0904 0.1162 2.6172 0.0928C3.6711 0.046 5.1999 0 7.1035 0ZM2.3682 6.3467C1.7231 6.3467 1.2003 6.8696 1.2002 7.5146C1.2002 8.1598 1.723 8.6826 2.3682 8.6826C3.0133 8.6826 3.5361 8.1598 3.5361 7.5146C3.5361 6.8696 3.0132 6.3467 2.3682 6.3467ZM7.957 6.3467C7.312 6.3467 6.7892 6.8696 6.7891 7.5146C6.7891 8.1598 7.3119 8.6826 7.957 8.6826C8.6021 8.6825 9.125 8.1598 9.125 7.5146C9.1249 6.8697 8.602 6.3468 7.957 6.3467Z"
		})
	}));
	ExpertIconRaw.displayName = "ExpertIconRaw";
	ExpertFilledIconRaw = (0, import_react$119.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$119.jsx)("path", {
			transform: "matrix(1 0 0 1 1.26228 1.23854)",
			fillRule: "evenodd",
			d: "M7.2762 1.9293C6.85 1.9293 6.4385 1.9463 6.0416 1.9803C5.8491 1.9968 5.8199 2.0275 5.8063 2.0216C5.7921 2.0155 5.7951 1.9695 5.6467 1.8256C5.1333 1.3277 4.5367 0.8792 3.857 0.48L3.8311 0.4648C3.5215 0.283 3.2967 0.1667 3.1567 0.1161C2.8357 0 2.5327 0.0054 2.2476 0.1323C1.9626 0.2592 1.7558 0.4808 1.6272 0.797C1.5712 0.9349 1.5071 1.1797 1.4351 1.5315C1.4325 1.5443 1.4305 1.5541 1.4291 1.5609C1.2781 2.2982 1.2112 3.01 1.2285 3.6964C1.2335 3.8966 1.2657 3.9159 1.263 3.926C1.2606 3.9352 1.2288 3.9368 1.1199 4.0635C1.1172 4.0667 1.1145 4.0697 1.112 4.0727Q1.242 4.0487 1.3737 4.0367Q1.5053 4.0246 1.6375 4.0246Q2.6467 4.0246 3.4378 4.6511Q4.2289 5.2775 4.4603 6.2598L5.5464 6.2598Q5.7777 5.2775 6.5689 4.6511Q7.36 4.0246 8.3691 4.0246Q9.5704 4.0246 10.4197 4.874Q11.2691 5.7234 11.2691 6.9246Q11.2691 8.1259 10.4197 8.9752Q9.5704 9.8246 8.3691 9.8246Q7.3601 9.8246 6.569 9.1983Q5.7779 8.5719 5.5464 7.5898L4.4602 7.5898Q4.2288 8.5719 3.4377 9.1983Q2.6466 9.8246 1.6375 9.8246Q1.1992 9.8246 0.7805 9.6951Q0.3618 9.5656 0 9.3181C0.3165 10.7338 1.1104 11.8179 2.3817 12.5703C3.6233 13.3052 5.2548 13.6726 7.2762 13.6726C9.2977 13.6726 10.9292 13.3052 12.1707 12.5703C13.8635 11.5685 14.7098 9.9787 14.7098 7.801C14.7098 6.3982 14.3491 5.2311 13.6275 4.2998C13.6204 4.2906 13.6109 4.2783 13.5989 4.2629C13.4991 4.1342 13.4739 4.1428 13.4735 4.1417C13.4731 4.1406 13.5001 4.1286 13.4961 3.9338C13.4808 3.1895 13.3623 2.4198 13.1407 1.6246C13.1391 1.6188 13.1364 1.6091 13.1326 1.5957C13.0363 1.2498 12.9553 1.0101 12.8897 0.8764C12.7395 0.57 12.5177 0.3634 12.2245 0.2567C11.9313 0.1499 11.6286 0.1657 11.3165 0.3038C11.1804 0.3641 10.9642 0.4958 10.6681 0.6988L10.6434 0.7157C10.1305 1.0673 9.6693 1.4479 9.2599 1.8577C9.0948 2.0229 9.0996 2.0729 9.09 2.0759C9.0806 2.0788 9.0576 2.0374 8.8523 2.0142C8.352 1.9576 7.8266 1.9293 7.2762 1.9293ZM1.6375 5.4179Q1.0134 5.4179 0.5721 5.8592Q0.1308 6.3005 0.1308 6.9246Q0.1308 7.5488 0.5721 7.9901Q1.0134 8.4314 1.6375 8.4314Q2.2617 8.4314 2.703 7.9901Q3.1443 7.5488 3.1443 6.9246Q3.1443 6.3005 2.703 5.8592Q2.2617 5.4179 1.6375 5.4179ZM8.3691 5.4179Q7.745 5.4179 7.3037 5.8592Q6.8624 6.3005 6.8624 6.9246Q6.8624 7.5488 7.3037 7.9901Q7.745 8.4314 8.3691 8.4314Q8.9933 8.4314 9.4346 7.9901Q9.8759 7.5488 9.8759 6.9246Q9.8759 6.3005 9.4346 5.8592Q8.9933 5.4179 8.3691 5.4179Z"
		})
	}));
	ExpertFilledIconRaw.displayName = "ExpertFilledIconRaw";
	ExpertIcon = createIcon(ExpertIconRaw, { activeAsset: ExpertFilledIconRaw });
	SummonIcon = createIcon(Zap, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ExpertFilledIcon.tsx
var ExpertFilledIcon;
var init_ExpertFilledIcon = __esmMin((() => {
	init_Icon();
	init_ExpertIcon();
	ExpertFilledIcon = createIcon(ExpertFilledIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ExpertIconV2.tsx
var import_react$118, import_jsx_runtime$118, ExpertIconV2Raw, ExpertIconV2;
var init_ExpertIconV2 = __esmMin((() => {
	import_react$118 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$118 = require_jsx_runtime();
	ExpertIconV2Raw = (0, import_react$118.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$118.jsx)("path", {
			transform: "matrix(1 0 0 1 1.36963 0.768944)",
			fillRule: "evenodd",
			d: "M7.1035 0C8.6643 0 10.7053 0.0099 12.0742 1.5205C13.2979 2.8714 13.3086 4.7621 13.3086 6.1885L13.3086 8.1777C13.3086 10.1172 12.4294 11.8523 11.0498 13.004C8.8995 14.7989 5.3968 15.0938 3.2227 13.0078C2.3428 12.1634 1.8536 11.0199 1.7246 9.7939C0.8046 9.5348 0.112 8.7337 0.0127 7.7568L0 7.5146C0.0001 6.2068 1.0603 5.1465 2.3682 5.1465L2.6104 5.1592C3.6191 5.2617 4.4383 5.9978 4.6689 6.9629L5.6562 6.9629C5.9052 5.9216 6.8394 5.1465 7.957 5.1465L8.1992 5.1592C9.3932 5.2805 10.3251 6.2887 10.3252 7.5146L10.3125 7.7568C10.1912 8.9509 9.1831 9.8828 7.957 9.8828L7.7148 9.8701C6.7393 9.7711 5.939 9.0803 5.6787 8.1621L4.6445 8.1621C4.4136 8.9759 3.7594 9.6106 2.9346 9.8134C3.0599 10.7423 3.4425 11.555 4.0537 12.1416C5.6974 13.7188 8.498 13.5697 10.2803 12.0821C11.3984 11.1486 12.1084 9.7464 12.1084 8.1777L12.1084 6.1885C12.1084 4.677 12.0504 3.281 11.1856 2.3262C10.2269 1.2683 8.7608 1.1992 7.1035 1.1992C5.2192 1.1992 3.708 1.2459 2.6699 1.292C2.179 1.3138 1.7933 1.3357 1.5244 1.3525C1.4552 1.8424 1.5142 2.1892 1.625 2.4326C1.7619 2.733 2.0131 2.9569 2.3867 3.1113C3.1734 3.4364 4.3684 3.392 5.4512 3.1201L5.7441 4.2842C4.5613 4.5812 3.0644 4.6898 1.9287 4.2207C1.3415 3.978 0.8226 3.567 0.5322 2.9297C0.2457 2.2999 0.2194 1.5309 0.4434 0.6396L0.4736 0.5488C0.5603 0.3473 0.7528 0.2058 0.9766 0.1875L0.9785 0.1875C0.9785 0.1875 0.9822 0.1867 0.9844 0.1865C0.9892 0.1862 0.997 0.1862 1.0059 0.1855C1.0243 0.1841 1.0517 0.1813 1.0869 0.1787C1.1586 0.1735 1.265 0.166 1.4033 0.1572C1.6808 0.1396 2.0904 0.1162 2.6172 0.0928C3.6711 0.046 5.1999 0 7.1035 0ZM2.3682 6.3467C1.7231 6.3467 1.2003 6.8696 1.2002 7.5146C1.2002 8.1598 1.723 8.6826 2.3682 8.6826C3.0133 8.6826 3.5361 8.1598 3.5361 7.5146C3.5361 6.8696 3.0132 6.3467 2.3682 6.3467ZM7.957 6.3467C7.312 6.3467 6.7892 6.8696 6.7891 7.5146C6.7891 8.1598 7.3119 8.6826 7.957 8.6826C8.6021 8.6825 9.125 8.1598 9.125 7.5146C9.1249 6.8697 8.602 6.3468 7.957 6.3467Z"
		})
	}));
	ExpertIconV2Raw.displayName = "ExpertIconV2Raw";
	ExpertIconV2 = createIcon(ExpertIconV2Raw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ExpertTabIcon.tsx
var import_react$117, import_jsx_runtime$117, ExpertTabIconRaw, ExpertTabIcon;
var init_ExpertTabIcon = __esmMin((() => {
	import_react$117 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$117 = require_jsx_runtime();
	ExpertTabIconRaw = (0, import_react$117.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$117.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$117.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.36963 0.768944)",
			d: "M7.1035 0C8.6643 0 10.7053 0.0099 12.0742 1.5205C13.2979 2.8714 13.3086 4.7621 13.3086 6.1885L13.3086 8.1777C13.3086 10.1172 12.4294 11.8523 11.0498 13.004C8.8995 14.7989 5.3968 15.0938 3.2227 13.0078C2.3428 12.1634 1.8536 11.0199 1.7246 9.7939C0.8046 9.5348 0.112 8.7337 0.0127 7.7568L0 7.5146C0.0001 6.2068 1.0603 5.1465 2.3682 5.1465L2.6104 5.1592C3.6191 5.2617 4.4383 5.9978 4.6689 6.9629L5.6562 6.9629C5.9052 5.9216 6.8394 5.1465 7.957 5.1465L8.1992 5.1592C9.3932 5.2805 10.3251 6.2887 10.3252 7.5146L10.3125 7.7568C10.1912 8.9509 9.1831 9.8828 7.957 9.8828L7.7148 9.8701C6.7393 9.7711 5.939 9.0803 5.6787 8.1621L4.6445 8.1621C4.4136 8.9759 3.7594 9.6106 2.9346 9.8134C3.0599 10.7423 3.4425 11.555 4.0537 12.1416C5.6974 13.7188 8.498 13.5697 10.2803 12.0821C11.3984 11.1486 12.1084 9.7464 12.1084 8.1777L12.1084 6.1885C12.1084 4.677 12.0504 3.281 11.1856 2.3262C10.2269 1.2683 8.7608 1.1992 7.1035 1.1992C5.2192 1.1992 3.708 1.2459 2.6699 1.292C2.179 1.3138 1.7933 1.3357 1.5244 1.3525C1.4552 1.8424 1.5142 2.1892 1.625 2.4326C1.7619 2.733 2.0131 2.9569 2.3867 3.1113C3.1734 3.4364 4.3684 3.392 5.4512 3.1201L5.7441 4.2842C4.5613 4.5812 3.0644 4.6898 1.9287 4.2207C1.3415 3.978 0.8226 3.567 0.5322 2.9297C0.2457 2.2999 0.2194 1.5309 0.4434 0.6396L0.4736 0.5488C0.5603 0.3473 0.7528 0.2058 0.9766 0.1875L0.9785 0.1875C0.9785 0.1875 0.9822 0.1867 0.9844 0.1865C0.9892 0.1862 0.997 0.1862 1.0059 0.1855C1.0243 0.1841 1.0517 0.1813 1.0869 0.1787C1.1586 0.1735 1.265 0.166 1.4033 0.1572C1.6808 0.1396 2.0904 0.1162 2.6172 0.0928C3.6711 0.046 5.1999 0 7.1035 0ZM2.3682 6.3467C1.7231 6.3467 1.2003 6.8696 1.2002 7.5146C1.2002 8.1598 1.723 8.6826 2.3682 8.6826C3.0133 8.6826 3.5361 8.1598 3.5361 7.5146C3.5361 6.8696 3.0132 6.3467 2.3682 6.3467ZM7.957 6.3467C7.312 6.3467 6.7892 6.8696 6.7891 7.5146C6.7891 8.1598 7.3119 8.6826 7.957 8.6826C8.6021 8.6825 9.125 8.1598 9.125 7.5146C9.1249 6.8697 8.602 6.3468 7.957 6.3467Z",
			fillRule: "evenodd"
		})
	}));
	ExpertTabIconRaw.displayName = "ExpertTabIconRaw";
	ExpertTabIcon = createIcon(ExpertTabIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FailedIcon.tsx
var import_react$116, import_jsx_runtime$116, FailedIconRaw, FailedIcon;
var init_FailedIcon = __esmMin((() => {
	import_react$116 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$116 = require_jsx_runtime();
	FailedIconRaw = (0, import_react$116.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$116.jsx)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 14 14",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$116.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 2.21356 2.21356)",
			d: "M5.6093 4.7864L9.5729 8.75L8.75 9.5729L4.7864 5.6093L0.8229 9.5729L0 8.75L3.9636 4.7864L0 0.8229L0.8229 0L4.7864 3.9636L8.75 0L9.5729 0.8229L5.6093 4.7864Z"
		})
	}));
	FailedIconRaw.displayName = "FailedIconRaw";
	FailedIcon = createIcon(FailedIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FigmaIcon.tsx
var import_react$115, import_jsx_runtime$115, FigmaIconRaw, FigmaIcon;
var init_FigmaIcon = __esmMin((() => {
	import_react$115 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$115 = require_jsx_runtime();
	FigmaIconRaw = (0, import_react$115.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$115.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "none",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("path", {
				d: "M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z",
				fill: "#0ACF83"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("path", {
				d: "M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z",
				fill: "#A259FF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("path", {
				d: "M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z",
				fill: "#F24E1E"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("path", {
				d: "M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z",
				fill: "#FF7262"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$115.jsx)("path", {
				d: "M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z",
				fill: "#1ABCFE"
			})
		]
	}));
	FigmaIconRaw.displayName = "FigmaIconRaw";
	FigmaIcon = createIcon(FigmaIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FileTextIcon.tsx
var FileTextIcon;
var init_FileTextIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	FileTextIcon = createIcon(FileText, { size: 20 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FilterIcon.tsx
var import_react$114, import_jsx_runtime$114, TaskFilterIconRaw, TaskFilterIcon;
var init_FilterIcon = __esmMin((() => {
	import_react$114 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$114 = require_jsx_runtime();
	TaskFilterIconRaw = (0, import_react$114.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$114.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$114.jsx)("path", {
			transform: "matrix(1 0 0 1 1.73821 0.40004)",
			fillRule: "evenodd",
			d: "M10.7438 0.7054Q10.7153 0.6955 10.7021 0.691Q8.6955 0 6.2618 0Q3.8281 0 1.8215 0.691Q1.8082 0.6956 1.7798 0.7054Q1.0226 0.966 0.7521 1.1338Q0.2068 1.472 0.0906 2.0762Q0 2.5475 0.2777 3.0717Q0.416 3.3326 0.8801 3.9702Q0.9169 4.0207 0.9358 4.0467L3.0115 6.9009Q3.5245 7.6064 3.5932 7.8174Q3.6618 8.0285 3.6618 8.9007L3.6617 14.6Q3.6545 14.8515 3.8375 15.0243Q4.0102 15.2072 4.2617 15.2Q4.3461 15.2001 4.4271 15.1768Q4.5083 15.1536 4.5797 15.1088L4.8617 14.9325L4.8617 11.6L4.8618 11.6L4.8618 8.9007Q4.8618 7.8383 4.7343 7.4464Q4.6069 7.0544 3.982 6.1952L2.1555 3.6836Q4.5143 4.5049 8.8045 4.1985L8.719 3.0015Q4.4786 3.3044 2.3543 2.4783Q1.8692 2.2896 1.5634 2.0662Q1.7721 1.9771 2.1704 1.84Q2.199 1.8302 2.2123 1.8256Q4.0289 1.2 6.2618 1.2Q8.4946 1.2 10.3114 1.8256Q10.3245 1.8301 10.3533 1.84Q10.9831 2.0568 11.1391 2.1535Q11.2378 2.2148 11.2547 2.3027Q11.2795 2.4315 10.6734 3.264Q10.636 3.3154 10.6174 3.341L8.3769 6.4216Q8.0215 6.9103 7.9199 7.121Q7.7666 7.439 7.7036 7.7863Q7.6618 8.0164 7.6618 8.6207Q7.6618 10.377 7.5215 10.8498Q7.3075 11.5711 6.8092 12.1349Q6.6235 12.345 6.0618 12.7367L6.0618 14.1782Q7.3279 13.3601 7.7083 12.9296Q8.3824 12.1669 8.6719 11.1911Q8.8617 10.5512 8.8618 8.6207Q8.8618 8.1244 8.8843 8.0005Q8.9182 7.8135 9.0008 7.6423Q9.0555 7.5288 9.3474 7.1274L11.5879 4.0468L11.6436 3.9703Q12.1078 3.3327 12.246 3.0717Q12.5238 2.5475 12.4331 2.0762Q12.317 1.472 11.7716 1.1338Q11.5011 0.966 10.7438 0.7054Z"
		})
	}));
	TaskFilterIconRaw.displayName = "TaskFilterIconRaw";
	TaskFilterIcon = createIcon(TaskFilterIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FolderDownloadIcon.tsx
var import_react$113, import_jsx_runtime$113, FolderDownloadIconRaw, FolderDownloadIcon;
var init_FolderDownloadIcon = __esmMin((() => {
	import_react$113 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$113 = require_jsx_runtime();
	FolderDownloadIconRaw = (0, import_react$113.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$113.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$113.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.00327 1.00333)",
			fillRule: "evenodd",
			d: "M5.1578 0.8849L5.5895 1.3166Q6.146 1.8731 6.2991 1.9366Q6.4523 2 7.2394 2L9.3813 2Q11.0408 1.9999 11.6222 2.0793Q12.651 2.2197 13.2124 2.781Q13.7737 3.3424 13.9141 4.3712Q13.9934 4.9525 13.9934 6.6121L13.9934 8.3949Q13.9935 10.458 13.8958 11.1734Q13.7279 12.4039 13.0659 13.0658Q12.4039 13.7278 11.1735 13.8958Q10.4581 13.9934 8.395 13.9933L5.5985 13.9933Q3.5354 13.9934 2.8199 13.8957Q1.5895 13.7278 0.9276 13.0658Q0.2656 12.4039 0.0976 11.1734Q0 10.458 0.0001 8.3949L0.0001 3.0213Q0.0001 1.6715 0.2138 1.2276Q0.5433 0.5432 1.2277 0.2137Q1.6715 0 3.0214 0Q3.6198 0 3.858 0.0544Q4.2164 0.1363 4.5278 0.3318Q4.7347 0.4618 5.1578 0.8849ZM4.215 1.8277Q3.8982 1.5109 3.8186 1.461Q3.6989 1.3858 3.561 1.3543Q3.4694 1.3333 3.0214 1.3333Q1.9758 1.3333 1.8061 1.415Q1.5422 1.5421 1.4151 1.806Q1.3334 1.9757 1.3334 3.0213L1.3334 5L12.6303 5Q12.6154 4.7157 12.593 4.5515Q12.5133 3.9676 12.2695 3.7239Q12.0257 3.4801 11.4419 3.4004Q10.9503 3.3333 9.3814 3.3333L7.2394 3.3333Q6.1871 3.3333 5.7889 3.1684Q5.3907 3.0035 4.6467 2.2594L4.215 1.8277ZM12.6595 6.3333L1.3334 6.3333L1.3334 8.395Q1.3333 10.3674 1.4187 10.9931Q1.5259 11.7786 1.8704 12.123Q2.2148 12.4675 3.0003 12.5747Q3.6259 12.6601 5.5984 12.66L8.395 12.66Q10.3675 12.6601 10.9932 12.5747Q11.7787 12.4675 12.1231 12.123Q12.4675 11.7786 12.5747 10.9931Q12.6601 10.3675 12.6601 8.395L12.6601 6.612Q12.6601 6.4682 12.6595 6.3333Z"
		})
	}));
	FolderDownloadIconRaw.displayName = "FolderDownloadIconRaw";
	FolderDownloadIcon = createIcon(FolderDownloadIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FolderIcon.tsx
var FolderIcon;
var init_FolderIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	FolderIcon = createIcon(Folder, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FolderOpenIcon.tsx
var import_react$112, import_jsx_runtime$112, FolderOpenIconRaw, FolderOpenIcon;
var init_FolderOpenIcon = __esmMin((() => {
	import_react$112 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$112 = require_jsx_runtime();
	FolderOpenIconRaw = (0, import_react$112.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$112.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$112.jsx)("path", {
			transform: "matrix(1 0 0 1 0.900391 0.90039)",
			d: "M4.4893 0C4.8371 0 5.0591 -0.0008 5.2754 0.0244C6.3094 0.1455 7.0485 0.6989 7.6641 1.3145L8.6494 2.2998L6.9521 2.2998L6.8154 2.1631C6.2812 1.6289 5.7808 1.2913 5.1367 1.2158C5.0059 1.2005 4.8651 1.1992 4.4893 1.1992C3.3369 1.1992 2.5394 1.4806 2.0293 1.9717C1.5234 2.4588 1.1992 3.2499 1.1992 4.4893L1.1992 8.0996C1.1992 9.0452 1.1999 9.7144 1.2471 10.2353C1.2935 10.7481 1.382 11.0583 1.5215 11.2998C1.8929 11.9429 2.4455 12.2436 3.1484 12.3867C3.519 12.4622 3.9095 12.4906 4.3184 12.5L9.2217 12.5C9.8441 12.4975 10.462 12.477 11.0312 12.3564C11.7703 12.1999 12.3358 11.8919 12.6777 11.2998C12.8172 11.0583 12.9057 10.7481 12.9521 10.2353C12.9914 9.8018 12.9958 9.2656 12.9971 8.5527L12.9961 8.1064C12.9832 6.8588 12.9095 6.3058 12.6777 5.9043C12.3358 5.3123 11.7703 5.0042 11.0312 4.8477C10.462 4.7271 9.8441 4.7066 9.2217 4.7041L2.5996 4.7041L2.5996 3.5049L8.1572 3.5049L8.1514 3.499L9.8486 3.499L9.8652 3.5156C10.3318 3.533 10.8171 3.5747 11.2803 3.6729C12.2112 3.8701 13.1449 4.3124 13.7178 5.3047C14.1305 6.02 14.1839 6.8921 14.1963 8.0938L14.1963 8.0996L14.1992 8.0996C14.1992 8.2186 14.1974 8.3345 14.1973 8.4473L14.1992 9.1025L14.1982 9.1035L14.1992 9.1045L14.1934 9.1045C14.1885 9.5777 14.1788 9.9874 14.1465 10.3437C14.0925 10.9395 13.9801 11.4449 13.7178 11.8994C13.1449 12.8917 12.2112 13.334 11.2803 13.5312C10.3688 13.7243 9.3719 13.6992 8.5996 13.6992L5.5996 13.6992C4.8004 13.6992 3.8041 13.7447 2.9092 13.5625C1.9757 13.3724 1.0723 12.9228 0.4814 11.8994C0.2191 11.4449 0.1067 10.9395 0.0527 10.3437C-0.0005 9.7561 0 9.0232 0 8.0996L0 4.4893C0 3.0495 0.3791 1.8952 1.1973 1.1074C2.0113 0.3238 3.1594 0 4.4893 0Z"
		})
	}));
	FolderOpenIconRaw.displayName = "FolderOpenIconRaw";
	FolderOpenIcon = createIcon(FolderOpenIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/GanttIcon.tsx
var GanttIcon;
var init_GanttIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	GanttIcon = createIcon(ChartGantt, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/GemRewardIcon.tsx
var import_react$111, import_jsx_runtime$111, GemRewardIconRaw, GemRewardIcon;
var init_GemRewardIcon = __esmMin((() => {
	import_react$111 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$111 = require_jsx_runtime();
	GemRewardIconRaw = (0, import_react$111.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$111.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$111.jsx)("path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime$111.jsx)("path", { d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$111.jsx)("path", { d: "M2 9h20" })
		]
	}));
	GemRewardIconRaw.displayName = "GemRewardIconRaw";
	GemRewardIcon = createIcon(GemRewardIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/GithubIcon.tsx
var import_react$110, import_jsx_runtime$110, GithubIconRaw, GithubIcon;
var init_GithubIcon = __esmMin((() => {
	import_react$110 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$110 = require_jsx_runtime();
	GithubIconRaw = (0, import_react$110.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$110.jsx)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		stroke: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$110.jsx)("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" })
	}));
	GithubIconRaw.displayName = "GithubIconRaw";
	GithubIcon = createIcon(GithubIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/GlobeIcon.tsx
var import_react$109, import_jsx_runtime$109, GlobeIconRaw, GlobeIcon;
var init_GlobeIcon = __esmMin((() => {
	import_react$109 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$109 = require_jsx_runtime();
	GlobeIconRaw = (0, import_react$109.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$109.jsx)("svg", {
		ref,
		viewBox: "0 0 14.1992 14.1992",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$109.jsx)("path", {
			fill: "currentColor",
			d: "M7.0996 0C10.3989 0 13.172 2.2503 13.9687 5.2998L12.7197 5.2998C12.0925 3.3403 10.4692 1.8268 8.4453 1.3545C8.5835 1.5636 8.7294 1.7983 8.874 2.0586C9.4714 3.1339 10.0702 4.6474 10.1797 6.5L12.9697 6.5L12.9697 6.499L14.1719 6.499C14.1885 6.6971 14.1992 6.8973 14.1992 7.0996C14.1992 11.0208 11.0208 14.1992 7.0996 14.1992C3.1784 14.1992 0 11.0208 0 7.0996C0 3.1784 3.1784 0 7.0996 0ZM1.2295 7.6992C1.4844 10.2247 3.3325 12.2784 5.7529 12.8437C5.615 12.6349 5.4696 12.4005 5.3252 12.1406C4.7278 11.0653 4.1291 9.5518 4.0195 7.6992L1.2295 7.6992ZM10.1797 7.6992C10.0702 9.5518 9.4714 11.0653 8.874 12.1406C8.7295 12.4007 8.5833 12.6348 8.4453 12.8437C10.8662 12.2787 12.7147 10.225 12.9697 7.6992L10.1797 7.6992ZM5.2207 7.6992C5.3282 9.2993 5.8489 10.6134 6.374 11.5586C6.6331 12.0249 6.8929 12.398 7.0996 12.6689C7.3063 12.398 7.5661 12.0249 7.8252 11.5586C8.3503 10.6134 8.871 9.2993 8.9785 7.6992L5.2207 7.6992ZM5.7529 1.3545C3.3323 1.9198 1.4844 3.9745 1.2295 6.5L4.0195 6.5C4.1291 4.6474 4.7278 3.1339 5.3252 2.0586C5.4697 1.7984 5.6149 1.5635 5.7529 1.3545ZM7.0996 1.5293C6.8928 1.8003 6.6333 2.174 6.374 2.6406C5.8489 3.5858 5.3282 4.8999 5.2207 6.5L8.9785 6.5C8.871 4.8999 8.3503 3.5858 7.8252 2.6406C7.5659 2.174 7.3064 1.8003 7.0996 1.5293Z"
		})
	}));
	GlobeIconRaw.displayName = "GlobeIconRaw";
	GlobeIcon = createIcon(GlobeIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/GongfengIcon.tsx
var import_react$108, import_jsx_runtime$108, GongfengIconRaw, GongfengIcon;
var init_GongfengIcon = __esmMin((() => {
	import_react$108 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$108 = require_jsx_runtime();
	GongfengIconRaw = (0, import_react$108.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$108.jsxs)("svg", {
		ref,
		viewBox: "0 0 100 88.2",
		fill: "currentColor",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M19 7.2h38.42V0H23.08zM9.75 23.45H87.9l-4.17-7.2h-69.9zm78.31 41.43H9.41l4.16 7.2H84z",
				fill: "#5270a4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M74.34 0H62.73v7.2h15.84z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M97.57 48.69H76.7v7.2h16.79z",
				fill: "#5270a4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M4.23 55.89H25.7v-7.2H0z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M31.5 48.69h40.13v7.2H31.5z",
				fill: "#5270a4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M78.86 81h-48v7.2h44z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M22.86 88.2h2.6V81h-6.83zM.38 39.7h42.29v-7.2H4.46z",
				fill: "#5270a4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$108.jsx)("path", {
				d: "M93 32.5H48.48v7.2h48.78z",
				fill: "currentColor"
			})
		]
	}));
	GongfengIconRaw.displayName = "GongfengIconRaw";
	GongfengIcon = createIcon(GongfengIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/HelpCircleIcon.tsx
var HelpCircleIcon;
var init_HelpCircleIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	HelpCircleIcon = createIcon(CircleQuestionMark, {
		size: 14,
		strokeWidth: 2
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ima-0527.svg
var ima_0527_default;
var init_ima_0527 = __esmMin((() => {
	ima_0527_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='15'%20height='15'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20d='M10.6982%200.0059C11.8358%200.0237%2012.5274%200.0957%2013.0889%200.3818C13.7474%200.7174%2014.2826%201.2526%2014.6182%201.9111C14.9996%202.6598%2015%203.6397%2015%205.5996L15%209.4004L14.9941%2010.6982C14.9763%2011.8358%2014.9043%2012.5274%2014.6182%2013.0889C14.2826%2013.7474%2013.7474%2014.2826%2013.0889%2014.6182C12.5274%2014.9043%2011.8358%2014.9763%2010.6982%2014.9941L9.4004%2015L5.5996%2015C3.7624%2015%202.7864%2014.9997%202.0547%2014.6855L1.9111%2014.6182C1.3349%2014.3246%200.8529%2013.8783%200.5166%2013.3301L0.3818%2013.0889C0.0957%2012.5274%200.0237%2011.8358%200.0059%2010.6982L0%209.4004L0%205.5996C0%203.7624%200.0003%202.7864%200.3145%202.0547L0.3818%201.9111C0.6754%201.3349%201.1217%200.8529%201.6699%200.5166L1.9111%200.3818C2.6598%200.0004%203.6397%200%205.5996%200L9.4004%200L10.6982%200.0059ZM4.3779%201.335C4.6478%201.9177%204.4641%202.8147%203.8711%203.5508C3.145%204.4518%202.0849%204.7668%201.499%204.2549C1.4386%204.2022%201.3874%204.1414%201.3418%204.0762C1.3315%204.4851%201.3301%204.979%201.3301%205.5996L1.3301%209.4004C1.3301%2010.4022%201.3308%2011.074%201.373%2011.5908C1.414%2012.092%201.4871%2012.3298%201.5664%2012.4854C1.7744%2012.8936%202.1064%2013.2256%202.5146%2013.4336C2.6702%2013.5129%202.908%2013.586%203.4092%2013.627C3.926%2013.6692%204.5978%2013.6699%205.5996%2013.6699L9.4004%2013.6699C10.4022%2013.6699%2011.074%2013.6692%2011.5908%2013.627C12.092%2013.586%2012.3298%2013.5129%2012.4854%2013.4336C12.8936%2013.2256%2013.2256%2012.8936%2013.4336%2012.4854C13.5129%2012.3298%2013.586%2012.092%2013.627%2011.5908C13.6692%2011.074%2013.6699%2010.4022%2013.6699%209.4004L13.6699%205.5996C13.6699%204.979%2013.6675%204.4851%2013.6572%204.0762C13.6119%204.1408%2013.5619%204.2016%2013.502%204.2539C12.9162%204.7663%2011.8561%204.4517%2011.1299%203.5508C10.5368%202.8148%2010.3522%201.9177%2010.6221%201.335C10.2767%201.3303%209.8757%201.3301%209.4004%201.3301L5.5996%201.3301C5.1243%201.3301%204.7233%201.3303%204.3779%201.335ZM2.9492%207.0449C3.7545%206.053%204.9345%205.7076%205.585%206.2695C6.2354%206.8315%206.1072%208.0892%205.3008%209.0811C4.497%2010.0695%203.3145%2010.4187%202.6641%209.8564C2.0139%209.2942%202.1443%208.0367%202.9492%207.0449ZM9.415%206.2695C10.0655%205.7076%2011.2455%206.053%2012.0508%207.0449C12.8559%208.0367%2012.9862%209.2941%2012.3359%209.8564C11.6854%2010.4185%2010.5029%2010.0695%209.6992%209.0811C8.8928%208.0893%208.7649%206.8316%209.415%206.2695ZM7.499%208.625C8.1211%208.625%208.624%208.9404%208.624%209.3281C8.6239%209.7158%208.121%2010.0312%207.499%2010.0312C6.8772%2010.0311%206.3742%209.7157%206.374%209.3281C6.374%208.9405%206.8771%208.6251%207.499%208.625Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ImaKnowledgeIcon.tsx
var ImaKnowledgeIcon;
var init_ImaKnowledgeIcon = __esmMin((() => {
	init_Icon();
	init_ima_0527();
	ImaKnowledgeIcon = createIcon({
		url: ima_0527_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ima-0509.svg
var ima_0509_default;
var init_ima_0509 = __esmMin((() => {
	ima_0509_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.29126%202C9.98708%202%2010.5497%202.00003%2011.0042%202.03711C11.4665%202.07488%2011.8764%202.15523%2012.2561%202.34863C12.8568%202.65472%2013.3455%203.14345%2013.6516%203.74414C13.8449%204.12372%2013.9253%204.53301%2013.9631%204.99512C14.0003%205.44975%2013.9993%206.01276%2013.9993%206.70898V9.29199C13.9993%209.98795%2014.0002%2010.5504%2013.9631%2011.0049C13.9253%2011.4672%2013.8451%2011.8771%2013.6516%2012.2568C13.3455%2012.8574%2012.8568%2013.3463%2012.2561%2013.6523C11.8764%2013.8457%2011.4664%2013.9261%2011.0042%2013.9639C10.5497%2014.0009%209.98705%2014%209.29126%2014H6.70825C6.01214%2014%205.44894%2014.001%204.99438%2013.9639C4.53243%2013.9261%204.1229%2013.8456%203.74341%2013.6523C3.14284%2013.3462%202.65396%2012.8574%202.3479%2012.2568C2.15447%2011.8771%202.07417%2011.4672%202.03638%2011.0049C1.99926%2010.5504%201.99927%209.98793%201.99927%209.29199V6.70898C1.99927%206.01278%201.99925%205.44974%202.03638%204.99512C2.07416%204.53306%202.15465%204.12369%202.3479%203.74414C2.65393%203.14353%203.14287%202.65477%203.74341%202.34863C4.12292%202.15531%204.5324%202.07492%204.99438%202.03711C5.44894%201.99997%206.01214%202%206.70825%202H9.29126ZM6.70825%202.66699C5.29385%202.66699%204.58548%202.66708%204.04517%202.94238L3.87134%203.04004C3.47612%203.28267%203.15343%203.63044%202.94165%204.0459L2.85083%204.25781C2.66646%204.77455%202.66626%205.47128%202.66626%206.70898V9.29199L2.67017%2010.2285C2.68308%2011.0493%202.73529%2011.5489%202.94165%2011.9541C3.18375%2012.4292%203.57015%2012.8164%204.04517%2013.0586C4.45043%2013.2651%204.9507%2013.3162%205.77173%2013.3291L6.70825%2013.334H9.29126L10.2278%2013.3291C10.9119%2013.3183%2011.3734%2013.2811%2011.7424%2013.1494L11.9534%2013.0586C12.3693%2012.8467%2012.7175%2012.5236%2012.9602%2012.1279L13.0579%2011.9541C13.2642%2011.5489%2013.3155%2011.0494%2013.3284%2010.2285L13.3333%209.29199V6.70898C13.3333%205.4712%2013.3331%204.77456%2013.1487%204.25781L13.0579%204.0459C12.8459%203.63012%2012.5229%203.28269%2012.1272%203.04004L11.9534%202.94238C11.5482%202.73608%2011.0486%202.6838%2010.2278%202.6709L9.29126%202.66699H6.70825ZM8.03833%209.0127C8.42844%209.0127%208.74406%209.20693%208.74438%209.44531C8.74414%209.68373%208.42849%209.87793%208.03833%209.87793C7.64836%209.87779%207.33252%209.68365%207.33228%209.44531C7.3326%209.20702%207.64841%209.01283%208.03833%209.0127ZM4.99341%207.7793C5.55164%207.11107%206.3684%206.87691%206.81665%207.25586C7.26487%207.63491%207.17744%208.4829%206.61938%209.15137C6.06139%209.81942%205.24637%2010.0526%204.79614%209.67383C4.34612%209.29464%204.43539%208.44751%204.99341%207.7793ZM9.26001%207.25586C9.71011%206.87702%2010.527%207.11062%2011.0842%207.7793C11.6409%208.44773%2011.7311%209.29474%2011.2815%209.67383C10.8314%2010.0525%2010.0134%209.81752%209.45728%209.15137C8.89934%208.48284%208.81025%207.63482%209.26001%207.25586ZM3.79419%203.97559C4.32487%203.34016%205.10137%203.11824%205.52759%203.47852C5.95374%203.8391%205.87087%204.64569%205.34009%205.28125C4.80946%205.91626%204.03479%206.13819%203.60669%205.77734C3.17881%205.41701%203.2636%204.61111%203.79419%203.97559ZM10.4709%203.47852C10.8971%203.11825%2011.6746%203.33949%2012.2053%203.97461C12.7361%204.61017%2012.8211%205.41697%2012.3928%205.77734C11.9642%206.13804%2011.189%205.91552%2010.6584%205.28027C10.1278%204.64485%2010.0451%203.83918%2010.4709%203.47852Z'%20fill='%23333333'%20style='fill:%23333333;fill:color(display-p3%200.2000%200.2000%200.2000);fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ImaKnowledgeIcon0509.tsx
var ImaKnowledgeIcon0509;
var init_ImaKnowledgeIcon0509 = __esmMin((() => {
	init_Icon();
	init_ima_0509();
	ImaKnowledgeIcon0509 = createIcon({
		url: ima_0509_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ima-source.svg
var ima_source_default;
var init_ima_source = __esmMin((() => {
	ima_source_default = "" + new URL("ima-source-NdrsSw0O.svg", import.meta.url).href;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ImaSourceIcon.tsx
var ImaSourceIcon;
var init_ImaSourceIcon = __esmMin((() => {
	init_Icon();
	init_ima_source();
	ImaSourceIcon = createIcon({
		url: ima_source_default,
		themable: false,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/InspirationIcon.tsx
var InspirationIcon;
var init_InspirationIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	InspirationIcon = createIcon(Sparkle, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/InstalledSkillIcon.tsx
var import_react$107, import_jsx_runtime$107, InstalledSkillIconRaw, InstalledSkillIcon;
var init_InstalledSkillIcon = __esmMin((() => {
	import_react$107 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$107 = require_jsx_runtime();
	InstalledSkillIconRaw = (0, import_react$107.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$107.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$107.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.334961 1.69101)",
			d: "M7.2589 12.6484C7.4818 12.8464 7.8481 12.8467 8.0712 12.6489C9.1777 11.7959 10.5577 11.4678 12.2112 11.665C13.0598 11.7666 13.7863 11.9541 14.3904 12.228C14.5575 12.3096 14.7271 12.3154 14.8992 12.2446C15.075 12.1846 15.1989 12.0684 15.2706 11.897C15.2903 11.854 15.3051 11.8091 15.3151 11.7627C15.3251 11.7168 15.3301 11.6699 15.3301 11.6225C15.3301 9.0083 15.1863 5.9365 14.8989 2.4072C14.8678 2.0254 14.748 1.6812 14.5397 1.374C14.313 1.0405 14.0165 0.8027 13.65 0.6616C12.2047 0.105 10.7223 0 9.2029 0.3467C8.6075 0.4824 8.0951 0.6553 7.6654 0.8657C7.2351 0.6553 6.7219 0.4819 6.126 0.3462C4.6069 0 3.125 0.105 1.6801 0.6616C1.3136 0.8027 1.0171 1.04 0.7904 1.374C0.582 1.6807 0.4623 2.0249 0.4312 2.4072C0.1438 5.936 0 9.0078 0 11.6221Q0 11.6931 0.015 11.7627C0.025 11.8086 0.0398 11.8535 0.0594 11.8965C0.1312 12.0684 0.2551 12.1841 0.4309 12.2446C0.603 12.3149 0.7726 12.3096 0.9397 12.2275C1.5438 11.9536 2.2703 11.7661 3.1189 11.665C4.7723 11.4673 6.1523 11.7954 7.2589 12.6484ZM8.009 2.1914C7.799 2.3243 7.5309 2.324 7.321 2.1909C6.9517 1.9678 6.4548 1.7852 5.8304 1.6426C4.575 1.3564 3.3508 1.4434 2.1581 1.9028C1.9161 1.9956 1.7825 2.1997 1.7567 2.5151C1.5066 5.5864 1.3665 8.3042 1.3363 10.668C1.8325 10.5225 2.3741 10.4141 2.9612 10.3442C4.783 10.1265 6.3511 10.4478 7.6653 11.3066C8.9795 10.4478 10.5474 10.127 12.3689 10.3447Q13.2495 10.4495 13.9938 10.6684C13.9636 8.3042 13.8235 5.5869 13.5734 2.5156C13.5476 2.2002 13.4139 1.9961 13.172 1.9028C11.979 1.4434 10.7545 1.3569 9.4987 1.6431C8.8744 1.7856 8.3778 1.9683 8.009 2.1914ZM5.1353 5.539L6.665 7.0687L10.1948 3.539L11.1353 4.4794L7.1353 8.4794Q6.9438 8.6822 6.665 8.6742Q6.3863 8.6822 6.1948 8.4794L4.1948 6.4794L5.1353 5.539Z",
			fillRule: "evenodd"
		})
	}));
	InstalledSkillIconRaw.displayName = "InstalledSkillIconRaw";
	InstalledSkillIcon = createIcon(InstalledSkillIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/LayoutGridIcon.tsx
var LayoutGridIcon;
var init_LayoutGridIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	LayoutGridIcon = createIcon(LayoutGrid, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/LibraryIcon.tsx
var LibraryIcon;
var init_LibraryIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	LibraryIcon = createIcon(BookOpen, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/LinkIcon.tsx
var LinkIcon;
var init_LinkIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	LinkIcon = createIcon(Link2, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ListIcon.tsx
var ListIcon;
var init_ListIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	ListIcon = createIcon(List, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/LocationIcon.tsx
var import_react$106, import_jsx_runtime$106, LocationIconRaw, LocationIcon;
var init_LocationIcon = __esmMin((() => {
	import_react$106 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$106 = require_jsx_runtime();
	LocationIconRaw = (0, import_react$106.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$106.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$106.jsx)("path", {
			d: "M8 1.667c-2.577 0-4.667 2.09-4.667 4.666 0 3.111 4.667 8 4.667 8s4.667-4.889 4.667-8c0-2.577-2.09-4.666-4.667-4.666Z",
			stroke: "currentColor",
			strokeWidth: 1.3,
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$106.jsx)("circle", {
			cx: "8",
			cy: "6.333",
			r: "1.667",
			stroke: "currentColor",
			strokeWidth: 1.3
		})]
	}));
	LocationIconRaw.displayName = "LocationIconRaw";
	LocationIcon = createIcon(LocationIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/LoaderIcon.tsx
var import_react$105, import_jsx_runtime$105, LoaderIconRaw, LoaderIcon;
var init_LoaderIcon = __esmMin((() => {
	import_react$105 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$105 = require_jsx_runtime();
	LoaderIconRaw = (0, import_react$105.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$105.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "M12 2v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "m16.2 7.8 2.9-2.9" }),
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "M18 12h4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "m16.2 16.2 2.9 2.9" }),
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "M12 18v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "m4.9 19.1 2.9-2.9" }),
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "M2 12h4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$105.jsx)("path", { d: "m4.9 4.9 2.9 2.9" })
		]
	}));
	LoaderIconRaw.displayName = "LoaderIconRaw";
	LoaderIcon = createIcon(LoaderIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/LoadingIcon.tsx
var import_react$104, import_jsx_runtime$104, LoadingIconRaw, LoadingIcon;
var init_LoadingIcon = __esmMin((() => {
	import_react$104 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$104 = require_jsx_runtime();
	LoadingIconRaw = (0, import_react$104.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$104.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$104.jsx)("path", {
			transform: "matrix(1 0 0 1 2.07097 1.5)",
			fillRule: "evenodd",
			d: "M6.529 0L6.529 4L5.329 4L5.329 0L6.529 0ZM8.394 5.7697L11.8581 3.7697L11.258 2.7305L7.7939 4.7305L8.394 5.7697ZM3.4641 5.7698L0 3.7698L0.6 2.7305L4.0641 4.7305L3.4641 5.7698ZM7.7939 8.2697L11.258 10.2697L11.8581 9.2305L8.394 7.2305L7.7939 8.2697ZM4.0641 8.2697L0.6 10.2697L0 9.2305L3.4641 7.2305L4.0641 8.2697ZM6.529 9L6.529 13L5.329 13L5.329 9L6.529 9Z"
		})
	}));
	LoadingIconRaw.displayName = "LoadingIconRaw";
	LoadingIcon = createIcon(LoadingIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MailIcon.tsx
var import_react$103, import_jsx_runtime$103, MailIconRaw, MailIcon;
var init_MailIcon = __esmMin((() => {
	import_react$103 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$103 = require_jsx_runtime();
	MailIconRaw = (0, import_react$103.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$103.jsxs)("svg", {
		ref,
		viewBox: "0 0 22 22",
		fill: "none",
		stroke: "currentColor",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$103.jsx)("rect", {
			x: "3",
			y: "5",
			width: "16",
			height: "12",
			rx: "1.8",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$103.jsx)("path", {
			d: "m4 6 7 6 7-6",
			strokeWidth: "1.5",
			strokeLinejoin: "round"
		})]
	}));
	MailIconRaw.displayName = "MailIconRaw";
	MailIcon = createIcon(MailIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/McpIcon.tsx
var import_react$102, import_jsx_runtime$102, McpIconRaw, McpIcon;
var init_McpIcon = __esmMin((() => {
	import_react$102 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$102 = require_jsx_runtime();
	McpIconRaw = (0, import_react$102.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$102.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$102.jsx)("rect", {
				x: "2",
				y: "2",
				width: "20",
				height: "8",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$102.jsx)("rect", {
				x: "2",
				y: "14",
				width: "20",
				height: "8",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$102.jsx)("line", {
				x1: "6",
				y1: "6",
				x2: "6.01",
				y2: "6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$102.jsx)("line", {
				x1: "6",
				y1: "18",
				x2: "6.01",
				y2: "18"
			})
		]
	}));
	McpIconRaw.displayName = "McpIconRaw";
	McpIcon = createIcon(McpIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MemoryIcon.tsx
var import_react$101, import_jsx_runtime$101, MemoryIconRaw, MemoryIcon;
var init_MemoryIcon = __esmMin((() => {
	import_react$101 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$101 = require_jsx_runtime();
	MemoryIconRaw = (0, import_react$101.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$101.jsxs)("svg", {
		ref,
		viewBox: "0 0 22 22",
		fill: "none",
		stroke: "currentColor",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$101.jsx)("path", {
			d: "M11 3.8a5 5 0 0 0-3.4 8.7c.5.5.9 1.1 1 1.8h4.8c.1-.7.5-1.3 1-1.8A5 5 0 0 0 11 3.8Z",
			strokeWidth: "1.5",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$101.jsx)("path", {
			d: "M8.7 16.2h4.6M9.4 18.2h3.2",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	}));
	MemoryIconRaw.displayName = "MemoryIconRaw";
	MemoryIcon = createIcon(MemoryIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoonIcon.tsx
var import_react$100, import_jsx_runtime$100, MoonIconRaw, MoonIcon;
var init_MoonIcon = __esmMin((() => {
	import_react$100 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$100 = require_jsx_runtime();
	MoonIconRaw = (0, import_react$100.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$100.jsx)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$100.jsx)("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" })
	}));
	MoonIconRaw.displayName = "MoonIconRaw";
	MoonIcon = createIcon(MoonIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreDotsIcon.tsx
var import_react$99, import_jsx_runtime$99, MoreDotsIconRaw, MoreDotsIcon;
var init_MoreDotsIcon = __esmMin((() => {
	import_react$99 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$99 = require_jsx_runtime();
	MoreDotsIconRaw = (0, import_react$99.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$99.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$99.jsx)("circle", {
				cx: "5",
				cy: "12",
				r: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$99.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$99.jsx)("circle", {
				cx: "19",
				cy: "12",
				r: "2"
			})
		]
	}));
	MoreDotsIconRaw.displayName = "MoreDotsIconRaw";
	MoreDotsIcon = createIcon(MoreDotsIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreFilledIcon.tsx
var import_react$98, import_jsx_runtime$98, MoreFilledIconRaw;
var init_MoreFilledIcon = __esmMin((() => {
	import_react$98 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$98 = require_jsx_runtime();
	MoreFilledIconRaw = (0, import_react$98.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$98.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$98.jsx)("path", {
			transform: "matrix(1 0 0 1 1 1)",
			fillRule: "evenodd",
			d: "M12.42 12.42Q14.665 10.1749 14.665 7Q14.665 3.8251 12.42 1.58Q10.1749 -0.665 7 -0.665Q3.8251 -0.665 1.58 1.58Q-0.665 3.8251 -0.665 7Q-0.665 10.1749 1.58 12.42Q3.825 14.665 7 14.665Q10.1749 14.665 12.42 12.42ZM3.6641 7C3.6641 6.4477 4.1118 6 4.6641 6C5.2163 6 5.6641 6.4477 5.6641 7C5.6641 7.5523 5.2163 8 4.6641 8C4.1118 8 3.6641 7.5523 3.6641 7ZM6 7C6 6.4477 6.4477 6 7 6C7.5523 6 8 6.4477 8 7C8 7.5523 7.5523 8 7 8C6.4477 8 6 7.5523 6 7ZM9.3359 7C9.3359 6.4477 9.7837 6 10.3359 6C10.8882 6 11.3359 6.4477 11.3359 7C11.3359 7.5523 10.8882 8 10.3359 8C9.7837 8 9.3359 7.5523 9.3359 7Z"
		})
	}));
	MoreFilledIconRaw.displayName = "MoreFilledIconRaw";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreIcon.tsx
var import_react$97, import_jsx_runtime$97, MoreIconRaw, MoreIcon;
var init_MoreIcon = __esmMin((() => {
	import_react$97 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	init_MoreFilledIcon();
	import_jsx_runtime$97 = require_jsx_runtime();
	MoreIconRaw = (0, import_react$97.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$97.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$97.jsx)("path", {
				transform: "matrix(1 0 0 1 1 1)",
				fillRule: "evenodd",
				d: "M12.42 12.42Q14.665 10.1749 14.665 7Q14.665 3.8251 12.42 1.58Q10.1749 -0.665 7 -0.665Q3.8251 -0.665 1.58 1.58Q-0.665 3.8251 -0.665 7Q-0.665 10.1749 1.58 12.42Q3.825 14.665 7 14.665Q10.1749 14.665 12.42 12.42ZM11.4795 2.5205Q13.335 4.376 13.335 7Q13.335 9.624 11.4795 11.4795Q9.624 13.335 7 13.335Q4.376 13.335 2.5205 11.4795Q0.665 9.624 0.665 7Q0.665 4.376 2.5205 2.5205Q4.376 0.665 7 0.665Q9.624 0.665 11.4795 2.5205Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$97.jsx)("path", {
				transform: "matrix(1 0 0 1 3.66406 7)",
				fillRule: "evenodd",
				d: "M1 2C0.4477 2 0 1.5523 0 1C0 0.4477 0.4477 0 1 0C1.5523 0 2 0.4477 2 1C2 1.5523 1.5523 2 1 2Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$97.jsx)("path", {
				transform: "matrix(1 0 0 1 7 7)",
				fillRule: "evenodd",
				d: "M1 2C0.4477 2 0 1.5523 0 1C0 0.4477 0.4477 0 1 0C1.5523 0 2 0.4477 2 1C2 1.5523 1.5523 2 1 2Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$97.jsx)("path", {
				transform: "matrix(1 0 0 1 10.3359 7)",
				fillRule: "evenodd",
				d: "M1 2C0.4477 2 0 1.5523 0 1C0 0.4477 0.4477 0 1 0C1.5523 0 2 0.4477 2 1C2 1.5523 1.5523 2 1 2Z"
			})
		]
	}));
	MoreIconRaw.displayName = "MoreIconRaw";
	MoreIcon = createIcon(MoreIconRaw, { activeAsset: MoreFilledIconRaw });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreIconV2.tsx
var import_react$96, import_jsx_runtime$96, MoreIconV2Raw, MoreIconV2;
var init_MoreIconV2 = __esmMin((() => {
	import_react$96 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$96 = require_jsx_runtime();
	MoreIconV2Raw = (0, import_react$96.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$96.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$96.jsx)("path", {
				transform: "matrix(1 0 0 1 8.50012 8.50096)",
				fillRule: "evenodd",
				d: "M3 0C4.6567 0.0002 6 1.3433 6 3C5.9996 4.6563 4.6564 5.9998 3 6C1.3436 5.9997 0.0004 4.6563 0 3C0 1.3433 1.3433 0.0002 3 0ZM3 1.1992C2.0061 1.1994 1.1992 2.006 1.1992 3C1.1996 3.9936 2.0064 4.7995 3 4.7998C3.9937 4.7996 4.7994 3.9936 4.7998 3C4.7998 2.006 3.994 1.1994 3 1.1992Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$96.jsx)("path", {
				transform: "matrix(1 0 0 1 1.53149 8.66698)",
				fillRule: "evenodd",
				d: "M3.1591 0.0146C3.5836 0.0821 3.8861 0.3688 4.1132 0.6602C4.3701 0.9901 4.6382 1.4682 4.952 2.0234L5.076 2.2412C5.3809 2.7806 5.6449 3.2449 5.7919 3.6269C5.9409 4.0146 6.0336 4.4805 5.7733 4.9267C5.5129 5.3726 5.0619 5.521 4.6512 5.582C4.2464 5.6421 3.712 5.6406 3.0927 5.6406L2.8456 5.6406C2.2261 5.6406 1.6918 5.6421 1.287 5.582C0.8762 5.521 0.4243 5.3729 0.1639 4.9267C-0.0962 4.4806 -0.0036 4.0145 0.1454 3.6269C0.2923 3.2449 0.5573 2.7805 0.8622 2.2412L0.9852 2.0234C1.2989 1.4685 1.5672 0.9901 1.8241 0.6602C2.0836 0.3271 2.4422 0.0002 2.9686 0L3.1591 0.0146ZM2.954 1.209C2.9214 1.2305 2.8607 1.2825 2.7704 1.3984C2.5814 1.6414 2.3635 2.0236 2.0302 2.6133L1.9061 2.832C1.5814 3.4064 1.3728 3.7786 1.2655 4.0576C1.2144 4.1905 1.2016 4.2661 1.2001 4.3037C1.1997 4.3129 1.1997 4.3193 1.2001 4.3222C1.2024 4.3239 1.208 4.3266 1.2167 4.331C1.2501 4.3481 1.3217 4.3745 1.4628 4.3955C1.7585 4.4394 2.1855 4.4414 2.8456 4.4414L3.0927 4.4414C3.7523 4.4414 4.1788 4.4393 4.4745 4.3955C4.615 4.3746 4.6869 4.3482 4.7206 4.331C4.7281 4.3272 4.7335 4.3241 4.7362 4.3222C4.7365 4.3193 4.7375 4.313 4.7372 4.3037C4.7356 4.2661 4.7229 4.1907 4.6718 4.0576C4.5644 3.7785 4.3559 3.4066 4.0311 2.832L3.9071 2.6133C3.5736 2.0232 3.356 1.6413 3.1669 1.3984C3.0765 1.2824 3.0168 1.2304 2.9843 1.209C2.9771 1.2043 2.9716 1.2016 2.9686 1.2002C2.9657 1.2017 2.9606 1.2047 2.954 1.209Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$96.jsx)("path", {
				transform: "matrix(1 0 0 1 1.6007 1.60056)",
				fillRule: "evenodd",
				d: "M2.8994 0C3.3548 0 3.7435 -0.0015 4.0576 0.0312C4.382 0.0651 4.6953 0.1406 4.9785 0.3359C5.1678 0.4667 5.3322 0.631 5.4629 0.8203C5.6584 1.1037 5.7337 1.4176 5.7676 1.7422C5.8003 2.0563 5.7998 2.4442 5.7998 2.8994C5.7998 3.3549 5.8003 3.7435 5.7676 4.0576C5.7337 4.3821 5.6584 4.6953 5.4629 4.9785C5.3322 5.168 5.1679 5.3322 4.9785 5.4629C4.6953 5.6584 4.3821 5.7337 4.0576 5.7676C3.7435 5.8004 3.3548 5.7998 2.8994 5.7998C2.4443 5.7998 2.0562 5.8003 1.7422 5.7676C1.4176 5.7338 1.1037 5.6584 0.8203 5.4629C0.631 5.3322 0.4667 5.1678 0.3359 4.9785C0.1405 4.6953 0.0651 4.382 0.0312 4.0576C-0.0015 3.7435 0 3.3549 0 2.8994C0 2.4442 -0.0014 2.0563 0.0312 1.7422C0.0651 1.4175 0.1403 1.1038 0.3359 0.8203C0.4667 0.6309 0.6309 0.4667 0.8203 0.3359C1.1037 0.1404 1.4176 0.0651 1.7422 0.0312C2.0562 -0.0014 2.4443 0 2.8994 0ZM2.8994 1.1992C2.4185 1.1992 2.1037 1.2009 1.8662 1.2256C1.6397 1.2492 1.5519 1.2888 1.502 1.3233C1.4322 1.3714 1.3714 1.4322 1.3232 1.502C1.2888 1.5519 1.2493 1.6395 1.2256 1.8662C1.2009 2.1037 1.1992 2.4185 1.1992 2.8994C1.1992 3.3804 1.2009 3.6952 1.2256 3.9326C1.2492 4.1589 1.2889 4.2469 1.3232 4.2969C1.3714 4.3666 1.4323 4.4275 1.502 4.4756C1.552 4.51 1.6397 4.5506 1.8662 4.5742C2.1037 4.599 2.4186 4.5996 2.8994 4.5996C3.3803 4.5996 3.6952 4.599 3.9326 4.5742C4.1591 4.5506 4.2469 4.51 4.2969 4.4756C4.3666 4.4274 4.4274 4.3667 4.4756 4.2969C4.51 4.2469 4.5506 4.1592 4.5742 3.9326C4.599 3.6952 4.5996 3.3803 4.5996 2.8994C4.5996 2.4185 4.599 2.1037 4.5742 1.8662C4.5506 1.6397 4.51 1.552 4.4756 1.502C4.4275 1.4323 4.3665 1.3714 4.2969 1.3233C4.2469 1.2889 4.1588 1.2492 3.9326 1.2256C3.6952 1.2009 3.3803 1.1992 2.8994 1.1992Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$96.jsx)("path", {
				transform: "matrix(1 0 0 1 8.79993 1.79979)",
				d: "M3.3047 2.1055L5.4004 2.1055L5.4004 3.3047L3.3047 3.3047L3.3047 5.4004L2.1055 5.4004L2.1055 3.3047L0 3.3047L0 2.1055L2.1055 2.1055L2.1055 0L3.3047 0L3.3047 2.1055Z"
			})
		]
	}));
	MoreIconV2Raw.displayName = "MoreIconV2Raw";
	MoreIconV2 = createIcon(MoreIconV2Raw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreMenuImaKnowledgeIcon.tsx
var MoreMenuImaKnowledgeIcon;
var init_MoreMenuImaKnowledgeIcon = __esmMin((() => {
	init_Icon();
	init_ima_0527();
	MoreMenuImaKnowledgeIcon = createIcon({
		url: ima_0527_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/inspiration-0527.svg
var inspiration_0527_default;
var init_inspiration_0527 = __esmMin((() => {
	inspiration_0527_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='15.8654'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(1%200%200%201%200%201.4782e-05)'%20d='M2.4702%200L3.8844%201.4142L2.9439%202.3547L1.5297%200.9405L2.4702%200ZM12.1156%201.4142L13.5298%200L14.4703%200.9405L13.0561%202.3547L12.1156%201.4142ZM5.6674%2010.0103Q4.5843%209.3847%203.9601%208.3026Q3.335%207.2204%203.335%205.9703Q3.335%204.0383%204.7011%202.6718Q6.0678%201.3053%208%201.3053Q9.9322%201.3053%2011.2988%202.6717Q12.665%204.0383%2012.665%205.9703Q12.665%207.2204%2012.0397%208.3029Q11.5148%209.213%2010.665%209.8001L10.665%2010.6895Q10.665%2010.7257%2010.6651%2010.7961Q10.666%2011.2934%2010.6336%2011.4963Q10.5558%2011.9836%2010.2169%2012.2482Q9.8781%2012.5127%209.3865%2012.47Q9.1818%2012.4523%208.6996%2012.3308Q8.6317%2012.3137%208.5962%2012.3048L5.8387%2011.6154L6.1613%2010.3252L8.9188%2011.0145Q8.9554%2011.0237%209.0244%2011.0411Q9.2128%2011.0885%209.3318%2011.1145Q9.3355%2010.9927%209.3351%2010.7985Q9.335%2010.727%209.335%2010.6895L9.335%209.4344Q9.3334%209.2558%209.4241%209.102Q9.512%208.9465%209.6674%208.8586Q10.4418%208.4113%2010.888%207.6377Q11.335%206.8639%2011.335%205.9703Q11.335%204.5891%2010.3584%203.6122Q9.3814%202.6353%208%202.6353Q6.6186%202.6353%205.6417%203.6121Q4.665%204.5891%204.665%205.9703Q4.665%206.8639%205.1122%207.638Q5.5582%208.4113%206.3326%208.8586L5.6674%2010.0103ZM2%206.3053L0%206.3053L0%207.6353L2%207.6353L2%206.3053ZM14%206.3053L16%206.3053L16%207.6353L14%207.6353L14%206.3053ZM6.1613%2012.0251L10.1613%2013.0251L9.8387%2014.3154L5.8387%2013.3154L6.1613%2012.0251ZM9.1613%2014.5752L6.1613%2013.8252L5.8387%2015.1154L8.8387%2015.8654L9.1613%2014.5752Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreMenuInspirationIcon.tsx
var MoreMenuInspirationIcon;
var init_MoreMenuInspirationIcon = __esmMin((() => {
	init_Icon();
	init_inspiration_0527();
	MoreMenuInspirationIcon = createIcon({
		url: inspiration_0527_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/tdoc-0527.svg
var tdoc_0527_default;
var init_tdoc_0527 = __esmMin((() => {
	tdoc_0527_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='16'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(1%200%200%201%200.334635%201.13167)'%20d='M11.9846%200.665L12.4297%200.1708L12.24%200L11.9846%200L11.9846%200.665ZM2.748%200.878L3.4031%200.9925L3.4031%200.9924L2.748%200.878ZM0.669%2012.7737L0.0139%2012.6591L0.0139%2012.6594L0.669%2012.7737ZM12.9551%2012.8632L13.6101%2012.9779L13.6101%2012.9777L12.9551%2012.8632ZM14.6651%203.0786L15.3202%203.193L15.3835%202.8306L15.1101%202.5844L14.6651%203.0786ZM7.9403%202.2147L8.3861%201.7213C8.2063%201.5589%207.9525%201.5071%207.7236%201.586C7.4946%201.665%207.3266%201.8622%207.2852%202.1008L7.9403%202.2147ZM7.4372%205.1085L7.4383%205.7734C7.7612%205.7729%208.037%205.5405%208.0923%205.2224L7.4372%205.1085ZM2.5317%205.117L2.5306%204.452C2.2672%204.4525%202.029%204.6083%201.923%204.8493C1.817%205.0904%201.8632%205.3713%202.0409%205.5656L2.5317%205.117ZM4.663%207.4489L4.1721%207.8975C4.2981%208.0353%204.4763%208.1139%204.663%208.1139L4.663%207.4489ZM7.0284%207.4489L7.6835%207.5634C7.7173%207.3699%207.6639%207.1714%207.5375%207.021C7.4112%206.8707%207.2248%206.7839%207.0284%206.7839L7.0284%207.4489ZM10.0463%207.4489L10.0463%206.7839C9.7233%206.7839%209.4469%207.016%209.3913%207.3343L10.0463%207.4489ZM13.608%207.4489L13.608%208.1139C13.613%208.1139%2013.6179%208.1138%2013.6229%208.1137L13.608%207.4489ZM13.7318%207.4461L13.7467%208.1109C14.019%208.1048%2014.2601%207.9333%2014.3549%207.6779C14.45%207.4226%2014.3797%207.1352%2014.1775%206.9526L13.7318%207.4461ZM6.045%2013.076L6.045%2013.7411C6.368%2013.741%206.6444%2013.5089%206.7%2013.1906L6.045%2013.076ZM9.0617%2013.076L8.4067%2012.9615C8.3728%2013.155%208.4262%2013.3534%208.5526%2013.5038C8.6789%2013.6543%208.8653%2013.741%209.0617%2013.7411L9.0617%2013.076ZM11.9846%200.665L11.9846%200L2.9996%200L2.9996%200.665L2.9996%201.33L11.9846%201.33L11.9846%200.665ZM2.9996%200.665L2.9996%200C2.5486%200%202.1694%200.326%202.093%200.7636L2.748%200.878L3.4031%200.9924C3.3698%201.1835%203.2028%201.33%202.9996%201.33L2.9996%200.665ZM2.748%200.878L2.093%200.7635L0.0139%2012.6591L0.669%2012.7737L1.3241%2012.8881L3.4031%200.9925L2.748%200.878ZM0.669%2012.7737L0.0139%2012.6594C-0.0833%2013.2168%200.3415%2013.741%200.9206%2013.7411L0.9206%2013.076L0.9206%2012.411C1.182%2012.411%201.3663%2012.646%201.3241%2012.8878L0.669%2012.7737ZM12.7035%2013.076L12.7035%2013.7411C13.1549%2013.741%2013.5335%2013.4148%2013.6101%2012.9779L12.9551%2012.8632L12.3001%2012.7484C12.3335%2012.5577%2012.5%2012.411%2012.7035%2012.411L12.7035%2013.076ZM12.9551%2012.8632L13.6101%2012.9777L15.3202%203.193L14.6651%203.0786L14.01%202.9641L12.3%2012.7487L12.9551%2012.8632ZM14.6651%203.0786L15.1101%202.5844L12.4297%200.1708L11.9846%200.665L11.5397%201.1592L14.2201%203.5727L14.6651%203.0786ZM7.9403%202.2147L7.2852%202.1008L6.782%204.9945L7.4372%205.1085L8.0923%205.2224L8.5955%202.3286L7.9403%202.2147ZM7.4372%205.1085L7.436%204.4435L2.5306%204.452L2.5317%205.117L2.5329%205.782L7.4383%205.7734L7.4372%205.1085ZM2.5317%205.117L2.0409%205.5656L4.1721%207.8975L4.663%207.4489L5.1539%207.0002L3.0226%204.6684L2.5317%205.117ZM4.663%207.4489L4.663%208.1139L7.0284%208.1139L7.0284%207.4489L7.0284%206.7839L4.663%206.7839L4.663%207.4489ZM10.0463%207.4489L10.0463%208.1139L13.608%208.1139L13.608%207.4489L13.608%206.7839L10.0463%206.7839L10.0463%207.4489ZM13.608%207.4489L13.6229%208.1137L13.7467%208.1109L13.7318%207.4461L13.7169%206.7813L13.5931%206.784L13.608%207.4489ZM13.7318%207.4461L14.1775%206.9526L8.3861%201.7213L7.9403%202.2147L7.4946%202.7082L13.2859%207.9396L13.7318%207.4461ZM7.0284%207.4489L6.3734%207.3344L5.3899%2012.9615L6.045%2013.076L6.7%2013.1906L7.6835%207.5634L7.0284%207.4489ZM0.9206%2013.076L0.9206%2013.7411L6.045%2013.7411L6.045%2013.076L6.045%2012.411L0.9206%2012.411L0.9206%2013.076ZM9.0617%2013.076L9.0617%2013.7411L12.7035%2013.7411L12.7035%2013.076L12.7035%2012.411L9.0617%2012.411L9.0617%2013.076ZM9.0617%2013.076L9.7168%2013.1906L10.7014%207.5635L10.0463%207.4489L9.3913%207.3343L8.4067%2012.9615L9.0617%2013.076Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreMenuTencentDocsIcon.tsx
var MoreMenuTencentDocsIcon;
var init_MoreMenuTencentDocsIcon = __esmMin((() => {
	init_Icon();
	init_tdoc_0527();
	MoreMenuTencentDocsIcon = createIcon({
		url: tdoc_0527_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/lexiang-0527.svg
var lexiang_0527_default;
var init_lexiang_0527 = __esmMin((() => {
	lexiang_0527_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='16'%20height='16'%3e%3cclipPath%20id='clip_0'%3e%3crect%20width='16'%20height='16'/%3e%3c/clipPath%3e%3cg%20clip-path='url(%23clip_0)'%3e%3cpath%20fill='%23000'%20fill-opacity='0.7'%20transform='matrix(1%200%200%201%200.779811%200.000608444)'%20d='M6.1311%200.2917C6.805%20-0.0972%207.6352%20-0.0973%208.3091%200.2917L13.3506%203.2022C14.0247%203.5914%2014.4402%204.3111%2014.4402%205.0894L14.4402%207.9999L14.4423%208.0021L14.4402%208.0053L14.4402%2010.9105L14.4348%2011.0559C14.3866%2011.7775%2013.9825%2012.4329%2013.3506%2012.7977L8.3091%2015.7082L8.1808%2015.7766C7.575%2016.0744%206.8641%2016.0746%206.2583%2015.7766L6.1311%2015.7082L1.0896%2012.7977C0.4155%2012.4085%200.0001%2011.6888%200%2010.9105L0%205.0894C0%204.3599%200.3647%203.6818%200.9655%203.2792L1.0896%203.2022L6.1311%200.2917ZM1.7461%204.3399C1.4786%204.4944%201.3141%204.7805%201.3141%205.0894L1.3141%2010.9105C1.3142%2011.2193%201.4786%2011.5055%201.7461%2011.66L6.7876%2014.5705C7.0551%2014.7248%207.3852%2014.7249%207.6526%2014.5705L12.6941%2011.66C12.9615%2011.5055%2013.126%2011.2193%2013.1261%2010.9105L13.1261%208.7591L10.8293%207.4322L10.8293%209.4424L10.8197%209.5888C10.7745%209.9278%2010.5752%2010.2309%2010.2744%2010.4047L7.7756%2011.8471L7.643%2011.9123C7.372%2012.0239%207.0671%2012.024%206.7961%2011.9123L6.6636%2011.8471L4.1658%2010.4047C3.8649%2010.2309%203.6646%209.9279%203.6194%209.5888L3.6098%209.4424L3.6098%203.2632L1.7461%204.3399ZM6.2679%205.8978L6.2669%205.8967L4.9239%206.673L4.9239%209.3247L7.2196%2010.6506L9.5163%209.3247L9.5163%206.6751L8.0087%205.8047L8.0087%205.8026L7.2196%205.3471L6.2679%205.8978ZM8.5326%204.589L10.2744%205.5941C10.2792%205.5969%2010.2835%205.6009%2010.2883%205.6037L13.1261%207.2418L13.1261%205.0894C13.1261%204.7805%2012.9615%204.4944%2012.6941%204.3399L10.8293%203.2632L8.5326%204.589ZM7.6526%201.4294C7.3851%201.2749%207.0551%201.275%206.7876%201.4294L4.9239%202.505L4.9239%205.1557L6.6636%204.1517C6.6658%204.1504%206.6678%204.1487%206.67%204.1474L9.5152%202.505L7.6526%201.4294Z'/%3e%3c/g%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreMenuTencentLexiangIcon.tsx
var MoreMenuTencentLexiangIcon;
var init_MoreMenuTencentLexiangIcon = __esmMin((() => {
	init_Icon();
	init_lexiang_0527();
	MoreMenuTencentLexiangIcon = createIcon({
		url: lexiang_0527_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MoreVerticalIcon.tsx
var MoreVerticalIcon;
var init_MoreVerticalIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	MoreVerticalIcon = createIcon(EllipsisVertical, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MyExpertIcon.tsx
var import_react$95, import_jsx_runtime$95, MyExpertIconRaw, MyExpertIcon;
var init_MyExpertIcon = __esmMin((() => {
	import_react$95 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$95 = require_jsx_runtime();
	MyExpertIconRaw = (0, import_react$95.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$95.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.46815 0.938622)",
			d: "M1.4068 3.9801L1.4069 6.0292L1.4073 9.4832Q1.4073 9.8118 1.4116 9.9148Q1.4911 11.8282 2.8489 13.1841Q4.206 14.5394 6.1197 14.6185Q6.2226 14.6227 6.5501 14.6227Q6.9953 14.6227 7.1318 14.6171Q9.6669 14.5122 11.4642 12.7149Q13.2616 10.9176 13.3665 8.3824Q13.3721 8.246 13.3721 7.8008L13.3721 6.262Q13.3722 4.3022 13.2222 3.7094Q12.8911 2.4003 11.9315 1.4407Q10.9719 0.4811 9.6629 0.15Q9.07 0 7.1102 0L0.5985 0L0.4147 0.3676Q0.2823 0.6323 0.1899 1.0022Q0 1.7617 0.1649 2.4214Q0.4235 3.4555 1.4068 3.9801ZM2.7368 4.4082Q3.3886 4.5203 4.1998 4.5203L4.1998 3.1903Q1.7281 3.1903 1.4552 2.0988Q1.3602 1.7187 1.4634 1.33L7.1102 1.33Q8.9044 1.33 9.3367 1.4394Q10.2906 1.6806 10.9911 2.3811Q11.6916 3.0816 11.9328 4.0355Q12.0422 4.4678 12.0422 6.262L12.0421 7.8008L12.0421 7.8008Q12.0421 8.2185 12.0376 8.3275Q11.9542 10.3441 10.5238 11.7745Q9.0934 13.2048 7.0768 13.2882Q6.9678 13.2927 6.5501 13.2928Q6.2501 13.2927 6.1746 13.2896Q4.7789 13.232 3.7887 12.243Q2.7984 11.2541 2.7405 9.8596Q2.7373 9.7841 2.7373 9.4831L2.7369 6.0291L2.7368 4.4082ZM5.4619 8.1614L5.4619 5.7614L4.1318 5.7614L4.1318 8.1614L5.4619 8.1614ZM8.2969 8.1614L8.2969 5.7614L6.9668 5.7614L6.9668 8.1614L8.2969 8.1614ZM8.9025 11.099Q10.0968 10.1701 10.0968 8.7616L8.7667 8.7616Q8.7668 9.5197 8.086 10.0491Q7.3822 10.5966 6.4318 10.5966L6.4318 11.9266Q7.8385 11.9266 8.9025 11.099Z",
			fillRule: "evenodd"
		})
	}));
	MyExpertIconRaw.displayName = "MyExpertIconRaw";
	MyExpertIcon = createIcon(MyExpertIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/MyFilesIconV2.tsx
var import_react$94, import_jsx_runtime$94, MyFilesIconV2Raw, MyFilesIconV2;
var init_MyFilesIconV2 = __esmMin((() => {
	import_react$94 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$94 = require_jsx_runtime();
	MyFilesIconV2Raw = (0, import_react$94.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$94.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$94.jsx)("path", {
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.4 0.9)",
			d: "M8.4003 10.2847C8.4005 9.6043 8.3575 9.1273 8.6104 9.0476C8.8633 8.9679 9.1016 9.3833 9.4918 9.9407L11.2901 12.5089C11.512 12.8259 11.6451 12.9984 11.6894 13.0266C11.7827 13.0859 11.8833 13.1037 11.9913 13.0798C12.0425 13.0685 12.2266 12.9519 12.5436 12.7299C12.8605 12.508 13.0331 12.3749 13.0612 12.3307C13.1206 12.2374 13.1383 12.1367 13.1145 12.0287C13.1031 11.9775 12.9865 11.7934 12.7646 11.4765L9.0363 6.152C8.8144 5.8351 8.6813 5.6625 8.6371 5.6344C8.5438 5.575 8.4431 5.5573 8.3351 5.5811C8.2839 5.5924 8.0998 5.7091 7.7829 5.931C7.4659 6.1529 7.2934 6.286 7.2652 6.3303C7.2119 6.4142 7.1921 6.5041 7.2061 6.5999L7.2013 6.5999L7.2007 8.7609L7.2 8.7598L7.2 12.1C7.2 12.6463 7.1594 13.0173 7.0782 13.213C6.909 13.6206 6.6206 13.909 6.213 14.0782C6.0173 14.1594 5.6463 14.2 5.1 14.2C4.5537 14.2 4.1827 14.1594 3.987 14.0782C3.8432 14.0185 3.7142 13.944 3.6 13.8546C3.4859 13.944 3.3568 14.0185 3.213 14.0782C3.0173 14.1594 2.6463 14.2 2.1 14.2C1.5537 14.2 1.1827 14.1594 0.987 14.0782C0.5794 13.909 0.291 13.6206 0.1218 13.213C0.0406 13.0173 0 12.6463 0 12.1L0 2.1C0 1.5537 0.0406 1.1827 0.1218 0.987C0.291 0.5794 0.5794 0.291 0.987 0.1218C1.1827 0.0406 1.5537 0 2.1 0C2.6463 0 3.0173 0.0406 3.213 0.1218C3.6206 0.291 3.909 0.5794 4.0782 0.987C4.1594 1.1827 4.2 1.5537 4.2 2.1L4.2 3.0617C4.4112 3.0206 4.7112 3 5.1 3C5.6463 3 6.0173 3.0406 6.213 3.1218C6.6206 3.291 6.909 3.5794 7.0782 3.987C7.1478 4.1548 7.1876 4.4514 7.1975 4.8769C7.5926 4.6073 7.8855 4.4515 8.0762 4.4094C8.5071 4.3141 8.9088 4.385 9.2812 4.6219C9.4599 4.7356 9.706 5.0162 10.0193 5.4637L13.7476 10.7882C14.0609 11.2357 14.2405 11.5629 14.2862 11.7698C14.3814 12.2007 14.3106 12.6024 14.0737 12.9748C13.96 13.1535 13.6794 13.3996 13.2319 13.7129C12.7843 14.0263 12.4572 14.2058 12.2503 14.2516C11.8193 14.3468 11.4177 14.276 11.0453 14.0391C10.8666 13.9254 10.6205 13.6447 10.3071 13.1972L8.4003 10.4739L8.4003 10.2847ZM6 6.4815C5.9991 6.5122 5.9991 6.543 6 6.5741L6 12.1C6 12.4869 5.9899 12.7046 5.9698 12.7531C5.9275 12.8552 5.8552 12.9275 5.7531 12.9698C5.7046 12.9899 5.4869 13 5.1 13C4.7131 13 4.4954 12.9899 4.447 12.9698C4.3448 12.9275 4.2725 12.8552 4.2302 12.7531C4.2101 12.7046 4.2 12.4869 4.2 12.1L4.2 5.1C4.2 4.7131 4.2101 4.4954 4.2302 4.447C4.2725 4.3448 4.3448 4.2725 4.447 4.2302C4.4954 4.2101 4.7131 4.2 5.1 4.2C5.4869 4.2 5.7046 4.2101 5.7531 4.2302C5.8552 4.2725 5.9275 4.3448 5.9698 4.447C5.9899 4.4954 6 4.7131 6 5.1L6 6.4815ZM1.2 2.1L1.2 12.1C1.2 12.4869 1.2101 12.7046 1.2302 12.7531C1.2725 12.8552 1.3448 12.9275 1.447 12.9698C1.4954 12.9899 1.7131 13 2.1 13C2.4869 13 2.7046 12.9899 2.7531 12.9698C2.8552 12.9275 2.9275 12.8552 2.9698 12.7531C2.9899 12.7046 3 12.4869 3 12.1L3 2.1C3 1.7131 2.9899 1.4954 2.9698 1.447C2.9275 1.3448 2.8552 1.2725 2.7531 1.2302C2.7046 1.2101 2.4869 1.2 2.1 1.2C1.7131 1.2 1.4954 1.2101 1.447 1.2302C1.3448 1.2725 1.2725 1.3448 1.2302 1.447C1.2101 1.4954 1.2 1.7131 1.2 2.1Z"
		})
	}));
	MyFilesIconV2Raw.displayName = "MyFilesIconV2Raw";
	MyFilesIconV2 = createIcon(MyFilesIconV2Raw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/NewChatIcon.tsx
var import_react$93, import_jsx_runtime$93, NewChatIconRaw, NewChatIcon;
var init_NewChatIcon = __esmMin((() => {
	import_react$93 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$93 = require_jsx_runtime();
	NewChatIconRaw = (0, import_react$93.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$93.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$93.jsx)("path", {
			transform: "matrix(1 0 0 1 0.999871 0.252975)",
			fillRule: "evenodd",
			d: "M0.8788 2.6257C1.5104 1.9941 2.4102 1.8164 3.8917 1.7665L3.3827 0.494L4.6176 0L5.3165 1.7473C5.5095 1.747 5.7099 1.747 5.918 1.747L8.0821 1.747C8.2903 1.747 8.4907 1.747 8.6838 1.7473L9.3827 0L10.6176 0.494L10.1085 1.7665C11.5901 1.8164 12.4899 1.9941 13.1214 2.6257C14.0003 3.5045 14.0002 4.9027 14.0001 7.665L14.0001 7.747L14.0001 7.8289C14.0002 10.5913 14.0003 11.9895 13.1214 12.8683C12.4982 13.4916 11.6136 13.6728 10.1664 13.7254Q10.94 14.2464 11.4703 14.7768L10.5299 15.7172Q10.0765 15.2638 9.3813 14.8003Q8.0488 13.912 7.0001 13.912Q5.9515 13.912 4.619 14.8003Q3.9238 15.2638 3.4703 15.7172L2.5299 14.7768Q3.0603 14.2464 3.8338 13.7254C2.3866 13.6728 1.5021 13.4916 0.8788 12.8683C0 11.9895 0 10.5913 0.0001 7.8289L0.0001 7.665C0 4.9027 0 3.5045 0.8788 2.6257ZM1.3301 7.829L1.3301 7.747L1.3301 7.665Q1.3301 5.334 1.4277 4.6189Q1.5322 3.8532 1.8193 3.5661Q2.1064 3.279 2.872 3.1745Q3.5872 3.0769 5.9181 3.077L6.0001 3.077L8.0001 3.077L8.0821 3.077Q10.4131 3.0769 11.1282 3.1745Q11.8939 3.279 12.181 3.5661Q12.4681 3.8532 12.5726 4.6189Q12.6702 5.334 12.6701 7.665L12.6701 7.747L12.6701 7.829Q12.6702 10.1599 12.5726 10.8751Q12.4681 11.6408 12.181 11.9278Q11.8939 12.2149 11.1282 12.3194Q10.4131 12.4171 8.0821 12.417L8.0001 12.417L6.0001 12.417L5.9181 12.417Q3.5872 12.4171 2.872 12.3194Q2.1064 12.2149 1.8193 11.9278Q1.5322 11.6408 1.4277 10.8751Q1.3301 10.1599 1.3301 7.829ZM4.66 7.6645Q4.6788 7.8153 4.7784 8.0366Q4.9709 8.4644 5.3301 8.6696Q5.8762 8.9817 6.8163 8.7838Q8.1753 8.4977 10.1313 7.1937L10.869 8.3003Q6.777 11.0283 4.6702 9.8244Q3.9356 9.4046 3.5656 8.5824Q3.3839 8.1787 3.3403 7.8295L4.66 7.6645Z"
		})
	}));
	NewChatIconRaw.displayName = "NewChatIconRaw";
	NewChatIcon = createIcon(NewChatIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/NewTaskFilledIcon.tsx
var import_react$92, import_jsx_runtime$92, NewTaskFilledIconRaw;
var init_NewTaskFilledIcon = __esmMin((() => {
	import_react$92 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$92 = require_jsx_runtime();
	NewTaskFilledIconRaw = (0, import_react$92.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$92.jsx)("svg", {
		ref,
		viewBox: "0 0 14.4531 14.6597",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$92.jsx)("path", {
			transform: "matrix(1 0 0 1 0 0.0102059)",
			fillRule: "evenodd",
			d: "M7.2266 0.0001C7.9263 0.0001 8.9357 -0.0101 9.9521 0.17C10.9684 0.3502 12.061 0.7315 12.8926 1.5636C14.2855 2.9577 14.4531 4.8385 14.4531 6.2804C14.4531 7.7222 14.2853 9.6021 12.8926 10.9962C12.094 11.7954 11.0936 12.1824 10.1406 12.3721C9.1916 12.5611 8.2453 12.5626 7.5312 12.5606C7.2983 12.56 6.9785 12.7013 6.5684 13.0948C6.17 13.4771 5.7651 14.0227 5.3662 14.6495L4.3535 14.005C4.7714 13.3484 5.2367 12.709 5.7373 12.2286C6.2261 11.7597 6.8348 11.3587 7.5342 11.3604C8.2533 11.3624 9.0891 11.3581 9.9062 11.1954C10.7192 11.0335 11.4695 10.7233 12.0439 10.1485C13.073 9.1185 13.2539 7.6783 13.2539 6.2804C13.2539 4.8825 13.0729 3.4423 12.0439 2.4122C11.4564 1.8243 10.6378 1.5103 9.7432 1.3517C8.8486 1.1931 7.9467 1.1993 7.2266 1.1993C6.5064 1.1993 5.6045 1.1931 4.71 1.3517C3.8153 1.5103 2.9967 1.8242 2.4092 2.4122C1.3801 3.4423 1.1992 4.8825 1.1992 6.2804C1.1993 7.6783 1.3802 9.1185 2.4092 10.1485C3.0494 10.7892 3.9083 11.1001 4.8252 11.2442L4.7324 11.837L4.6387 12.4298C3.5897 12.2648 2.45 11.8863 1.5605 10.9962C0.1678 9.6021 0 7.7222 0 6.2804C0 4.8385 0.1676 2.9577 1.5605 1.5636C2.392 0.7316 3.4838 0.3502 4.5 0.17C5.5166 -0.0102 6.5267 0.0001 7.2266 0.0001ZM7.8226 5.6908L7.8226 3.5941L6.6234 3.5941L6.6234 5.6908L4.5254 5.6908L4.5254 6.89L6.6234 6.89L6.6234 8.9966L7.8226 8.9966L7.8226 6.89L9.9246 6.89L9.9246 5.6908L7.8226 5.6908Z"
		})
	}));
	NewTaskFilledIconRaw.displayName = "NewTaskFilledIconRaw";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/NewTaskIcon.tsx
var import_react$91, import_jsx_runtime$91, NewTaskIconRaw, NewTaskIcon;
var init_NewTaskIcon = __esmMin((() => {
	import_react$91 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	init_NewTaskFilledIcon();
	import_jsx_runtime$91 = require_jsx_runtime();
	NewTaskIconRaw = (0, import_react$91.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$91.jsxs)("svg", {
		ref,
		viewBox: "0 0 14.4531 14.6597",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$91.jsx)("path", {
			transform: "matrix(1 0 0 1 0 0.0102059)",
			d: "M7.2266 0.0001C7.9263 0.0001 8.9357 -0.0101 9.9521 0.17C10.9684 0.3502 12.061 0.7315 12.8926 1.5636C14.2855 2.9577 14.4531 4.8385 14.4531 6.2804C14.4531 7.7222 14.2853 9.6021 12.8926 10.9962C12.094 11.7954 11.0936 12.1824 10.1406 12.3721C9.1916 12.5611 8.2453 12.5626 7.5312 12.5606C7.2983 12.56 6.9785 12.7013 6.5684 13.0948C6.17 13.4771 5.7651 14.0227 5.3662 14.6495L4.3535 14.005C4.7714 13.3484 5.2367 12.709 5.7373 12.2286C6.2261 11.7597 6.8348 11.3587 7.5342 11.3604C8.2533 11.3624 9.0891 11.3581 9.9062 11.1954C10.7192 11.0335 11.4695 10.7233 12.0439 10.1485C13.073 9.1185 13.2539 7.6783 13.2539 6.2804C13.2539 4.8825 13.0729 3.4423 12.0439 2.4122C11.4564 1.8243 10.6378 1.5103 9.7432 1.3517C8.8486 1.1931 7.9467 1.1993 7.2266 1.1993C6.5064 1.1993 5.6045 1.1931 4.71 1.3517C3.8153 1.5103 2.9967 1.8242 2.4092 2.4122C1.3801 3.4423 1.1992 4.8825 1.1992 6.2804C1.1993 7.6783 1.3802 9.1185 2.4092 10.1485C3.0494 10.7892 3.9083 11.1001 4.8252 11.2442L4.7324 11.837L4.6387 12.4298C3.5897 12.2648 2.45 11.8863 1.5605 10.9962C0.1678 9.6021 0 7.7222 0 6.2804C0 4.8385 0.1676 2.9577 1.5605 1.5636C2.392 0.7316 3.4838 0.3502 4.5 0.17C5.5166 -0.0102 6.5267 0.0001 7.2266 0.0001Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$91.jsx)("path", {
			transform: "matrix(1 0 0 1 4.52539 3.5943)",
			d: "M3.2959 2.0967L5.3994 2.0967L5.3994 3.2959L3.2959 3.2959L3.2959 5.4023L2.0967 5.4023L2.0967 3.2959L0 3.2959L0 2.0967L2.0967 2.0967L2.0967 0L3.2959 0L3.2959 2.0967Z"
		})]
	}));
	NewTaskIconRaw.displayName = "NewTaskIconRaw";
	NewTaskIcon = createIcon(NewTaskIconRaw, { activeAsset: NewTaskFilledIconRaw });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/NewTaskIconV2.tsx
var import_react$90, import_jsx_runtime$90, NewTaskIconV2Raw, NewTaskIconV2;
var init_NewTaskIconV2 = __esmMin((() => {
	import_react$90 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$90 = require_jsx_runtime();
	NewTaskIconV2Raw = (0, import_react$90.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$90.jsxs)("svg", {
		ref,
		viewBox: "0 0 14.4531 14.6597",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$90.jsx)("path", {
			transform: "matrix(1 0 0 1 0 0.0102059)",
			d: "M7.2266 0.0001C7.9263 0.0001 8.9357 -0.0101 9.9521 0.17C10.9684 0.3502 12.061 0.7315 12.8926 1.5636C14.2855 2.9577 14.4531 4.8385 14.4531 6.2804C14.4531 7.7222 14.2853 9.6021 12.8926 10.9962C12.094 11.7954 11.0936 12.1824 10.1406 12.3721C9.1916 12.5611 8.2453 12.5626 7.5312 12.5606C7.2983 12.56 6.9785 12.7013 6.5684 13.0948C6.17 13.4771 5.7651 14.0227 5.3662 14.6495L4.3535 14.005C4.7714 13.3484 5.2367 12.709 5.7373 12.2286C6.2261 11.7597 6.8348 11.3587 7.5342 11.3604C8.2533 11.3624 9.0891 11.3581 9.9062 11.1954C10.7192 11.0335 11.4695 10.7233 12.0439 10.1485C13.073 9.1185 13.2539 7.6783 13.2539 6.2804C13.2539 4.8825 13.0729 3.4423 12.0439 2.4122C11.4564 1.8243 10.6378 1.5103 9.7432 1.3517C8.8486 1.1931 7.9467 1.1993 7.2266 1.1993C6.5064 1.1993 5.6045 1.1931 4.71 1.3517C3.8153 1.5103 2.9967 1.8242 2.4092 2.4122C1.3801 3.4423 1.1992 4.8825 1.1992 6.2804C1.1993 7.6783 1.3802 9.1185 2.4092 10.1485C3.0494 10.7892 3.9083 11.1001 4.8252 11.2442L4.7324 11.837L4.6387 12.4298C3.5897 12.2648 2.45 11.8863 1.5605 10.9962C0.1678 9.6021 0 7.7222 0 6.2804C0 4.8385 0.1676 2.9577 1.5605 1.5636C2.392 0.7316 3.4838 0.3502 4.5 0.17C5.5166 -0.0102 6.5267 0.0001 7.2266 0.0001Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$90.jsx)("path", {
			transform: "matrix(1 0 0 1 4.52539 3.5943)",
			d: "M3.2959 2.0967L5.3994 2.0967L5.3994 3.2959L3.2959 3.2959L3.2959 5.4023L2.0967 5.4023L2.0967 3.2959L0 3.2959L0 2.0967L2.0967 2.0967L2.0967 0L3.2959 0L3.2959 2.0967Z"
		})]
	}));
	NewTaskIconV2Raw.displayName = "NewTaskIconV2Raw";
	NewTaskIconV2 = createIcon(NewTaskIconV2Raw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/OpenExternalIcon.tsx
var import_react$89, import_jsx_runtime$89, OpenExternalIconRaw, OpenExternalIcon;
var init_OpenExternalIcon = __esmMin((() => {
	import_react$89 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$89 = require_jsx_runtime();
	OpenExternalIconRaw = (0, import_react$89.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$89.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$89.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 1.00327 1.00333)",
			fillRule: "evenodd",
			d: "M5.1578 0.8849L5.5895 1.3166Q6.146 1.8731 6.2991 1.9366Q6.4523 2 7.2394 2L9.3813 2Q11.0408 1.9999 11.6222 2.0793Q12.651 2.2197 13.2124 2.781Q13.7737 3.3424 13.9141 4.3712Q13.9934 4.9525 13.9934 6.6121L13.9934 8.3949Q13.9935 10.458 13.8958 11.1734Q13.7279 12.4039 13.0659 13.0658Q12.4039 13.7278 11.1735 13.8958Q10.4581 13.9934 8.395 13.9933L5.5985 13.9933Q3.5354 13.9934 2.8199 13.8957Q1.5895 13.7278 0.9276 13.0658Q0.2656 12.4039 0.0976 11.1734Q0 10.458 0.0001 8.3949L0.0001 3.0213Q0.0001 1.6715 0.2138 1.2276Q0.5433 0.5432 1.2277 0.2137Q1.6715 0 3.0214 0Q3.6198 0 3.858 0.0544Q4.2164 0.1363 4.5278 0.3318Q4.7347 0.4618 5.1578 0.8849ZM4.215 1.8277Q3.8982 1.5109 3.8186 1.461Q3.6989 1.3858 3.561 1.3543Q3.4694 1.3333 3.0214 1.3333Q1.9758 1.3333 1.8061 1.415Q1.5422 1.5421 1.4151 1.806Q1.3334 1.9757 1.3334 3.0213L1.3334 5L12.6303 5Q12.6154 4.7157 12.593 4.5515Q12.5133 3.9676 12.2695 3.7239Q12.0257 3.4801 11.4419 3.4004Q10.9503 3.3333 9.3814 3.3333L7.2394 3.3333Q6.1871 3.3333 5.7889 3.1684Q5.3907 3.0035 4.6467 2.2594L4.215 1.8277ZM12.6595 6.3333L1.3334 6.3333L1.3334 8.395Q1.3333 10.3674 1.4187 10.9931Q1.5259 11.7786 1.8704 12.123Q2.2148 12.4675 3.0003 12.5747Q3.6259 12.6601 5.5984 12.66L8.395 12.66Q10.3675 12.6601 10.9932 12.5747Q11.7787 12.4675 12.1231 12.123Q12.4675 11.7786 12.5747 10.9931Q12.6601 10.3675 12.6601 8.395L12.6601 6.612Q12.6601 6.4682 12.6595 6.3333Z"
		})
	}));
	OpenExternalIconRaw.displayName = "OpenExternalIconRaw";
	OpenExternalIcon = createIcon(OpenExternalIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PanelIcon.tsx
var import_react$88, import_jsx_runtime$88, PanelIconRaw, PanelIcon;
var init_PanelIcon = __esmMin((() => {
	import_react$88 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$88 = require_jsx_runtime();
	PanelIconRaw = (0, import_react$88.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$88.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$88.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.399923 1.39992)",
			d: "M6.6001 0.0001L8.682 0.0001Q11.1441 0 11.9892 0.1153Q13.3989 0.3078 14.1457 1.0545Q14.8924 1.8012 15.0848 3.211Q15.2002 4.0561 15.2001 6.5182L15.2001 6.682Q15.2002 9.1441 15.0848 9.9892Q14.8924 11.3989 14.1457 12.1457Q13.3989 12.8924 11.9892 13.0848Q11.1441 13.2002 8.682 13.2001L6.5182 13.2001Q4.0561 13.2002 3.211 13.0848Q1.8012 12.8924 1.0545 12.1457Q0.3078 11.3989 0.1153 9.9892Q0 9.1441 0.0001 6.682L0.0001 6.5182Q0 4.0561 0.1153 3.211Q0.3078 1.8012 1.0545 1.0545Q1.8012 0.3078 3.211 0.1153Q4.0561 0 6.5182 0.0001L6.6001 0.0001ZM6.6001 1.2001L6.5181 1.2001Q4.1376 1.2 3.3733 1.3043Q2.364 1.4421 1.903 1.903Q1.4421 2.364 1.3043 3.3733Q1.2 4.1376 1.2001 6.5181L1.2001 6.682Q1.2 9.0626 1.3043 9.8269Q1.4421 10.8362 1.903 11.2971Q2.364 11.7581 3.3733 11.8958Q4.1376 12.0001 6.5181 12.0001L8.682 12.0001Q11.0626 12.0001 11.8269 11.8958Q12.8362 11.7581 13.2971 11.2971Q13.7581 10.8362 13.8958 9.8269Q14.0001 9.0626 14.0001 6.682L14.0001 6.5181Q14.0002 4.1376 13.8958 3.3733Q13.7581 2.364 13.2971 1.903Q12.8362 1.4421 11.8269 1.3043Q11.0626 1.2 8.682 1.2001L6.6001 1.2001ZM11.0001 2.6001L12.2001 2.6001L12.2001 10.6001L11.0001 10.6001L11.0001 2.6001Z",
			fillRule: "evenodd"
		})
	}));
	PanelIconRaw.displayName = "PanelIconRaw";
	PanelIcon = createIcon(PanelIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PhoneIcon.tsx
var import_react$87, import_jsx_runtime$87, PhoneIconRaw, PhoneIcon;
var init_PhoneIcon = __esmMin((() => {
	import_react$87 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$87 = require_jsx_runtime();
	PhoneIconRaw = (0, import_react$87.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$87.jsxs)("svg", {
		ref,
		viewBox: "0 0 22 22",
		fill: "none",
		stroke: "currentColor",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$87.jsx)("rect", {
				x: "6",
				y: "3",
				width: "10",
				height: "16",
				rx: "2",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$87.jsx)("path", {
				d: "M9.5 16.5h3",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$87.jsx)("path", {
				d: "M8 6.2h6",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	}));
	PhoneIconRaw.displayName = "PhoneIconRaw";
	PhoneIcon = createIcon(PhoneIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PlaneIcon.tsx
var import_react$86, import_jsx_runtime$86, PlaneIconRaw, PlaneIcon;
var init_PlaneIcon = __esmMin((() => {
	import_react$86 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$86 = require_jsx_runtime();
	PlaneIconRaw = (0, import_react$86.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$86.jsx)("svg", {
		ref,
		viewBox: "0 0 22 22",
		fill: "none",
		stroke: "currentColor",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$86.jsx)("path", {
			d: "m3 12 16-7-3 14-4-5-3 4v-4l-6-2Z",
			strokeWidth: "1.5",
			strokeLinejoin: "round"
		})
	}));
	PlaneIconRaw.displayName = "PlaneIconRaw";
	PlaneIcon = createIcon(PlaneIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PlanInProgressStatusIcon.tsx
var import_react$85, import_jsx_runtime$85, PLAN_IN_PROGRESS_STATUS_RING, PlanInProgressStatusIconRaw, PlanInProgressStatusIcon;
var init_PlanInProgressStatusIcon = __esmMin((() => {
	import_react$85 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$85 = require_jsx_runtime();
	PLAN_IN_PROGRESS_STATUS_RING = [
		"M12.25 6.125C12.25 4.4336 11.652 2.99 10.456 1.794C9.26 0.598 7.8164 0 6.125 0C4.4336 0 2.99 0.598 1.794 1.794",
		"C0.598 2.99 0 4.4336 0 6.125C0 7.8164 0.598 9.26 1.794 10.456C2.99 11.652 4.4336 12.25 6.125 12.25",
		"C7.8164 12.25 9.26 11.652 10.456 10.456C11.652 9.26 12.25 7.8164 12.25 6.125ZM2.4127 2.4127",
		"C3.4378 1.3876 4.6753 0.875 6.125 0.875C7.5747 0.875 8.8122 1.3876 9.8373 2.4127C10.8624 3.4378 11.375 4.6753 11.375 6.125",
		"C11.375 7.5747 10.8624 8.8122 9.8373 9.8373C8.8122 10.8624 7.5747 11.375 6.125 11.375C4.6753 11.375 3.4378 10.8624 2.4127 9.8373",
		"C1.3876 8.8122 0.875 7.5747 0.875 6.125C0.875 4.6753 1.3876 3.4378 2.4127 2.4127Z"
	].join(" ");
	PlanInProgressStatusIconRaw = (0, import_react$85.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$85.jsxs)("svg", {
		ref,
		viewBox: "0 0 14 14",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$85.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: PLAN_IN_PROGRESS_STATUS_RING,
			fillRule: "evenodd"
		}), /* @__PURE__ */ (0, import_jsx_runtime$85.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 7 3.5)",
			d: "M3.5 3.5C3.5 5.433 1.933 7 0 7L0 0C1.933 0 3.5 1.567 3.5 3.5Z"
		})]
	}));
	PlanInProgressStatusIconRaw.displayName = "PlanInProgressStatusIconRaw";
	PlanInProgressStatusIcon = createIcon(PlanInProgressStatusIconRaw, { size: 14 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PlanPendingStatusIcon.tsx
var import_react$84, import_jsx_runtime$84, PLAN_PENDING_STATUS_PATH, PlanPendingStatusIconRaw, PlanPendingStatusIcon;
var init_PlanPendingStatusIcon = __esmMin((() => {
	import_react$84 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$84 = require_jsx_runtime();
	PLAN_PENDING_STATUS_PATH = [
		"M2.4047 1.2593C2.6164 1.0974 2.8377 0.95 3.0687 0.817C3.2996 0.6841 3.5382 0.5667 3.7845 0.4648L4.1188 1.2734C3.6949 1.4487 3.3006 1.6757 2.9362 1.9544L2.4047 1.2593ZM0.4648 3.7845C0.5667 3.5382 0.6841 3.2996 0.817 3.0687C0.95 2.8377 1.0974 2.6164 1.2593 2.4047L1.9544 2.9362C1.6757 3.3006 1.4487 3.6949 1.2734 4.1188L0.4648 3.7845Z",
		"M0.0484 6.8931C0.0323 6.7657 0.0202 6.638 0.0121 6.5098C0.004 6.3817 0 6.2534 0 6.125C0 5.9966 0.004 5.8683 0.0121 5.7402C0.0202 5.612 0.0323 5.4843 0.0484 5.3569L0.9164 5.4666C0.8888 5.6852 0.875 5.9047 0.875 6.125C0.875 6.3453 0.8888 6.5648 0.9164 6.7834L0.0484 6.8931Z",
		"M1.2593 9.8453C1.0974 9.6336 0.95 9.4123 0.817 9.1813C0.6841 8.9504 0.5667 8.7118 0.4648 8.4655L1.2734 8.1312C1.4487 8.5551 1.6757 8.9494 1.9544 9.3138L1.2593 9.8453ZM3.7845 11.7852C3.5382 11.6833 3.2996 11.5659 3.0687 11.433C2.8377 11.3 2.6164 11.1526 2.4047 10.9907L2.9362 10.2956C3.3006 10.5743 3.6949 10.8013 4.1188 10.9766L3.7845 11.7852Z",
		"M6.8931 12.2017C6.7657 12.2177 6.638 12.2298 6.5098 12.2379C6.3817 12.246 6.2534 12.25 6.125 12.25C5.9966 12.25 5.8683 12.246 5.7402 12.2379C5.612 12.2298 5.4843 12.2177 5.3569 12.2017L5.4666 11.3336C5.6852 11.3612 5.9047 11.375 6.125 11.375C6.3453 11.375 6.5648 11.3612 6.7834 11.3336L6.8931 12.2017Z",
		"M9.8453 10.9907C9.6336 11.1526 9.4123 11.3 9.1813 11.433C8.9504 11.5659 8.7118 11.6833 8.4655 11.7852L8.1312 10.9766C8.5551 10.8013 8.9494 10.5743 9.3138 10.2956L9.8453 10.9907ZM11.7852 8.4655C11.6833 8.7118 11.5659 8.9504 11.433 9.1813C11.3 9.4123 11.1526 9.6336 10.9907 9.8453L10.2956 9.3138C10.5743 8.9494 10.8013 8.5552 10.9766 8.1312L11.7852 8.4655Z",
		"M12.2017 5.3569C12.2177 5.4843 12.2298 5.612 12.2379 5.7402C12.246 5.8683 12.25 5.9966 12.25 6.125C12.25 6.2534 12.246 6.3817 12.2379 6.5098C12.2298 6.638 12.2177 6.7657 12.2017 6.8931L11.3336 6.7834C11.3612 6.5648 11.375 6.3453 11.375 6.125C11.375 5.9047 11.3612 5.6852 11.3336 5.4666L12.2017 5.3569Z",
		"M10.9907 2.4047C11.1526 2.6164 11.3 2.8377 11.433 3.0687C11.5659 3.2996 11.6833 3.5382 11.7852 3.7845L10.9766 4.1188C10.8013 3.6949 10.5743 3.3006 10.2956 2.9362L10.9907 2.4047ZM8.4655 0.4648C8.7118 0.5667 8.9504 0.6841 9.1813 0.817C9.4123 0.95 9.6336 1.0974 9.8453 1.2593L9.3138 1.9544C8.9494 1.6757 8.5551 1.4487 8.1312 1.2734L8.4655 0.4648Z",
		"M6.8931 0.0484L6.7834 0.9164C6.5648 0.8888 6.3453 0.875 6.125 0.875C5.9047 0.875 5.6852 0.8888 5.4666 0.9164L5.3569 0.0484C5.4843 0.0323 5.612 0.0202 5.7402 0.0121C5.8683 0.004 5.9966 0 6.125 0C6.2534 0 6.3817 0.004 6.5098 0.0121C6.638 0.0202 6.7657 0.0323 6.8931 0.0484Z"
	].join(" ");
	PlanPendingStatusIconRaw = (0, import_react$84.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$84.jsx)("svg", {
		ref,
		viewBox: "0 0 14 14",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$84.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: PLAN_PENDING_STATUS_PATH,
			fillRule: "evenodd"
		})
	}));
	PlanPendingStatusIconRaw.displayName = "PlanPendingStatusIconRaw";
	PlanPendingStatusIcon = createIcon(PlanPendingStatusIconRaw, { size: 14 });
})), import_jsx_runtime$83, PreviewMaximizeIcon;
var init_PreviewMaximizeIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$83 = require_jsx_runtime();
	PreviewMaximizeIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$83.jsxs)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$83.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 8.17 2.33)",
			d: "M4.835 5.5L4.835 2.9794L4.835 2.959Q4.835 2.0528 4.8055 1.635L1.3003 5.1403L0.3599 4.1998L3.8652 0.6945Q3.4475 0.665 2.541 0.665L2.5 0.665L0 0.665L0 -0.665L2.5 -0.665L2.541 -0.665Q3.7967 -0.665 4.2438 -0.604Q5.0703 -0.4912 5.5307 -0.0309Q5.9911 0.4293 6.104 1.2561Q6.165 1.7032 6.165 2.959L6.165 2.9795L6.165 5.5L4.835 5.5Z",
			fillRule: "evenodd"
		}), /* @__PURE__ */ (0, import_jsx_runtime$83.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 2.33 8.17)",
			d: "M0.665 0L0.665 2.5L0.665 2.541Q0.665 3.4472 0.6945 3.865L4.1997 0.3597L5.1401 1.3002L1.6348 4.8055Q2.0525 4.835 2.959 4.835L3 4.835L5.5 4.835L5.5 6.165L3 6.165L2.959 6.165Q1.7033 6.165 1.2562 6.104Q0.4297 5.9912 -0.0307 5.5309Q-0.4911 5.0707 -0.604 4.2439Q-0.665 3.7968 -0.665 2.541L-0.665 2.5L-0.665 0L0.665 0Z",
			fillRule: "evenodd"
		})]
	});
})), import_jsx_runtime$82, PreviewPanelToggleIcon;
var init_PreviewPanelToggleIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$82 = require_jsx_runtime();
	PreviewPanelToggleIcon = ({ width = 16, height = 16, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("svg", {
		className,
		style,
		xmlns: "http://www.w3.org/2000/svg",
		width,
		height,
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$82.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.334923 1.33492)",
			d: "M6.6651 0.0001L8.747 0.0001Q11.2135 0 12.063 0.1159Q13.4944 0.3113 14.2566 1.0735Q15.0188 1.8358 15.2142 3.2672Q15.3302 4.1166 15.3301 6.5832L15.3301 6.747Q15.3302 9.2135 15.2142 10.063Q15.0188 11.4944 14.2566 12.2566Q13.4944 13.0188 12.063 13.2142Q11.2135 13.3302 8.747 13.3301L6.5832 13.3301Q4.1167 13.3302 3.2672 13.2142Q1.8357 13.0188 1.0735 12.2566Q0.3113 11.4944 0.1159 10.063Q0 9.2135 0.0001 6.747L0.0001 6.5832Q0 4.1167 0.1159 3.2672Q0.3113 1.8358 1.0735 1.0735Q1.8358 0.3113 3.2672 0.1159Q4.1167 0 6.5832 0.0001L6.6651 0.0001ZM6.6651 1.3301L6.5831 1.3301Q4.207 1.33 3.4471 1.4337Q2.4595 1.5685 2.014 2.014Q1.5685 2.4594 1.4337 3.4471Q1.33 4.207 1.3301 6.5831L1.3301 6.747Q1.33 9.1232 1.4337 9.8831Q1.5685 10.8707 2.014 11.3162Q2.4594 11.7616 3.4471 11.8964Q4.207 12.0002 6.5831 12.0001L8.747 12.0001Q11.1232 12.0002 11.8831 11.8964Q12.8707 11.7616 13.3162 11.3162Q13.7616 10.8707 13.8964 9.8831Q14.0002 9.1232 14.0001 6.747L14.0001 6.5831Q14.0002 4.207 13.8964 3.4471Q13.7616 2.4594 13.3162 2.014Q12.8707 1.5685 11.8831 1.4337Q11.1232 1.33 8.747 1.3301L6.6651 1.3301ZM12.3301 2.6651L12.3301 10.6651L11.0001 10.6651L11.0001 2.6651L12.3301 2.6651Z",
			fillRule: "evenodd"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PendingIcon.tsx
var import_react$81, import_jsx_runtime$81, PendingIconRaw, PendingIcon;
var init_PendingIcon = __esmMin((() => {
	import_react$81 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$81 = require_jsx_runtime();
	PendingIconRaw = (0, import_react$81.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$81.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$81.jsx)("path", { d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" }),
			/* @__PURE__ */ (0, import_jsx_runtime$81.jsx)("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
			/* @__PURE__ */ (0, import_jsx_runtime$81.jsx)("path", { d: "M12 17h.01" })
		]
	}));
	PendingIconRaw.displayName = "PendingIconRaw";
	PendingIcon = createIcon(PendingIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PinFilledIcon.tsx
var import_react$80, import_jsx_runtime$80, PinFilledIconRaw, PinFilledIcon;
var init_PinFilledIcon = __esmMin((() => {
	import_react$80 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$80 = require_jsx_runtime();
	PinFilledIconRaw = (0, import_react$80.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$80.jsx)("path", {
			transform: "matrix(1 0 0 1 2.20556 0)",
			d: "M1.2944 10C0.4704 10 0 9.0594 0.4943 8.4001L2.294 6L2.294 2C2.294 0.8954 3.1895 0 4.294 0L7.294 0C8.3986 0 9.294 0.8954 9.294 2L9.294 6L11.0944 8.3999C11.5889 9.0592 11.1185 10 10.2944 10L6.459 10L6.4594 16L5.1294 16.0001L5.129 10L1.2944 10Z",
			fill: "currentColor",
			fillRule: "evenodd"
		})
	}));
	PinFilledIconRaw.displayName = "PinFilledIconRaw";
	PinFilledIcon = createIcon(PinFilledIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PinTopIcon.tsx
var init_PinTopIcon = __esmMin((() => {
	init_src();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PlayIcon.tsx
var import_react$79, import_jsx_runtime$79, PlayIconRaw, PlayIcon;
var init_PlayIcon = __esmMin((() => {
	import_react$79 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$79 = require_jsx_runtime();
	PlayIconRaw = (0, import_react$79.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$79.jsx)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$79.jsx)("path", { d: "M5 5l14 7-14 7V5z" })
	}));
	PlayIconRaw.displayName = "PlayIconRaw";
	PlayIcon = createIcon(PlayIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PluginsIcon.tsx
var PluginsIcon;
var init_PluginsIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	PluginsIcon = createIcon(PlugZap, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ProjectIcon.tsx
var import_react$78, import_jsx_runtime$78, ProjectIconRaw, ProjectFilledIconRaw$1, ProjectIcon;
var init_ProjectIcon = __esmMin((() => {
	import_react$78 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$78 = require_jsx_runtime();
	ProjectIconRaw = (0, import_react$78.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$78.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$78.jsx)("path", {
			fillOpacity: .7,
			transform: "matrix(1 0 0 1 1.00488 1.00494)",
			fillRule: "evenodd",
			d: "M6.126 2.4856L4.8185 0.6703Q4.3356 0 3.5095 0Q2.0558 0 1.0279 1.0279Q0 2.0558 0 3.5095L0 7.9358Q0 9.9322 0.0748 10.6261Q0.2002 11.789 0.6942 12.4716Q1.0402 12.9498 1.5184 13.2958Q2.201 13.7898 3.364 13.9152Q3.8543 13.9681 4.9951 13.9836L4.9951 13.9901L7.4071 13.9901Q9.8736 13.9901 10.7231 13.8742Q12.1545 13.6788 12.9167 12.9166Q13.6789 12.1544 13.8743 10.7229Q13.9902 9.8735 13.9902 7.407L13.9902 5.1492Q13.9902 3.9151 13.9608 3.4785Q13.9117 2.7495 13.7174 2.2755Q13.1351 0.8551 11.7147 0.2728Q11.2407 0.0785 10.5117 0.0294Q10.0751 0 8.841 0Q8.3459 0 8.138 0.0546Q7.7129 0.1663 7.3983 0.4732Q7.2444 0.6233 6.9895 1.0478L6.126 2.4856ZM6.0543 12.66L6.0548 12.66Q6.5367 12.66 6.5972 12.6355Q6.6122 12.6294 6.6266 12.6219Q6.6411 12.6143 6.6549 12.6053Q6.7095 12.5695 6.9843 12.173L8.6438 9.7777Q9.1067 9.1095 9.1057 9.0031Q9.1048 8.8967 8.6297 8.2372L3.7393 1.4477Q3.6545 1.33 3.5095 1.33Q2.6067 1.33 1.9684 1.9684Q1.33 2.6067 1.33 3.5095L1.33 7.9358Q1.33 9.8607 1.3972 10.4835Q1.4847 11.2954 1.7717 11.692Q1.9927 11.9974 2.2981 12.2184Q2.6946 12.5053 3.5066 12.5929Q4.1293 12.66 6.0543 12.66ZM9.7089 7.4598Q10.0799 7.9749 10.1983 8.1856Q10.4321 8.6018 10.4357 8.9909Q10.4393 9.38 10.2131 9.8004Q10.0985 10.0133 9.737 10.5351L8.2675 12.6562Q9.9305 12.64 10.5432 12.5564Q11.5308 12.4216 11.9763 11.9761Q12.4217 11.5307 12.5565 10.5431Q12.6602 9.7831 12.6602 7.407L12.6602 5.1492Q12.6602 3.2029 12.4868 2.78Q12.1156 1.8746 11.2101 1.5034Q10.7873 1.33 8.841 1.33Q8.5176 1.33 8.4759 1.341Q8.3903 1.3635 8.327 1.4252Q8.2961 1.4554 8.1296 1.7325L6.972 3.6601L8.1748 5.33L10.9951 5.33L10.9951 6.66L9.1328 6.66L9.7089 7.4598ZM5.4951 5.33L2.9951 5.33L2.9951 6.66L5.4951 6.66L5.4951 5.33Z"
		})
	}));
	ProjectIconRaw.displayName = "ProjectIconRaw";
	ProjectFilledIconRaw$1 = (0, import_react$78.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$78.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$78.jsx)("path", {
			fillOpacity: .9,
			transform: "matrix(1 0 0 1 1.00593 1.00497)",
			fillRule: "evenodd",
			d: "M9.7089 7.4598Q10.0799 7.9749 10.1983 8.1856Q10.4321 8.6018 10.4357 8.9909C10.4381 9.2503 10.3639 9.5202 10.2131 9.8004C10.1367 9.9424 9.978 10.1873 9.737 10.5351L8.0775 12.9304Q7.6551 13.5401 7.3835 13.718C7.3379 13.7478 7.291 13.7754 7.2427 13.8006C7.1952 13.8254 7.1466 13.8479 7.0969 13.8681C6.8963 13.9494 6.5488 13.99 6.0542 13.9901C4.7233 13.99 3.8265 13.9651 3.364 13.9152Q2.201 13.7898 1.5184 13.2958C1.1996 13.0652 0.9249 12.7904 0.6942 12.4716Q0.2002 11.789 0.0748 10.6261C0.0249 10.1635 0 9.2667 0 7.9358L0 3.5095Q0 2.0558 1.0279 1.0279Q2.0558 0 3.5095 0C4.0603 0 4.4966 0.2235 4.8185 0.6703L9.7089 7.4598ZM10.8392 7.8257C10.7467 7.6612 10.5688 7.3961 10.3054 7.0303L10.0386 6.66L10.9944 6.66L10.9944 5.33L9.0806 5.33L6.5378 1.7997L6.9894 1.0479C7.1593 0.7649 7.2956 0.5734 7.3981 0.4734C7.6079 0.2687 7.8545 0.1292 8.1379 0.0547C8.2765 0.0183 8.5108 0.0001 8.8409 0.0001C9.6636 0.0001 10.2205 0.0099 10.5115 0.0295Q11.2406 0.0786 11.7145 0.2729Q13.135 0.8552 13.7173 2.2757C13.8468 2.5916 13.9279 2.9926 13.9607 3.4787Q13.99 3.9152 13.9901 5.1493L13.9901 7.4071C13.9901 9.0514 13.9515 10.1567 13.8742 10.723Q13.6788 12.1545 12.9166 12.9167Q12.1544 13.6789 10.7229 13.8743C10.2505 13.9388 9.4028 13.9763 8.1799 13.987Q8.4151 13.734 8.6818 13.3491L10.3413 10.9538C10.598 10.5833 10.771 10.315 10.8604 10.1488C11.0708 9.7577 11.1743 9.3695 11.1707 8.9843C11.1672 8.5991 11.0567 8.2129 10.8392 7.8257ZM5.4944 5.33L2.9944 5.33L2.9944 6.66L5.4944 6.66L5.4944 5.33Z"
		})
	}));
	ProjectFilledIconRaw$1.displayName = "ProjectFilledIconRaw";
	ProjectIcon = createIcon(ProjectIconRaw, { activeAsset: ProjectFilledIconRaw$1 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/QQIcon.tsx
var import_react$77, import_jsx_runtime$77, QQIconRaw, QQIcon;
var init_QQIcon = __esmMin((() => {
	import_react$77 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$77 = require_jsx_runtime();
	QQIconRaw = (0, import_react$77.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("svg", {
		ref,
		viewBox: "0 0 22 22",
		fill: "none",
		stroke: "currentColor",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$77.jsx)("path", {
			d: "M11 3C8.1 3 5.8 5.2 5.8 8.2v1.5c-.8 1.4-1.4 3.2-1 4.1.2.5.6.7 1 .6.2.8.7 1.5 1.3 2-.3.5-.8 1-1.5 1.3-.3.1-.2.7.3.7 1 0 1.8-.3 2.4-.7.8.4 1.7.6 2.7.6s1.9-.2 2.7-.6c.6.4 1.4.7 2.4.7.5 0 .6-.6.3-.7-.7-.3-1.2-.8-1.5-1.3.6-.5 1.1-1.2 1.3-2 .4.1.8-.1 1-.6.4-.9-.2-2.7-1-4.1V8.2C16.2 5.2 13.9 3 11 3Z",
			strokeWidth: "1.5",
			strokeLinejoin: "round"
		})
	}));
	QQIconRaw.displayName = "QQIconRaw";
	QQIcon = createIcon(QQIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ProjectIconV2.tsx
var import_react$76, import_jsx_runtime$76, ProjectIconV2Raw, ProjectIconV2, ProjectFilledIconV2;
var init_ProjectIconV2 = __esmMin((() => {
	import_react$76 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$76 = require_jsx_runtime();
	ProjectIconV2Raw = (0, import_react$76.forwardRef)((props, ref) => {
		const clipId = import_react$76.useId();
		return /* @__PURE__ */ (0, import_jsx_runtime$76.jsxs)("svg", {
			ref,
			viewBox: "0 0 16 16",
			fill: "currentColor",
			xmlns: "http://www.w3.org/2000/svg",
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$76.jsx)("clipPath", {
				id: clipId,
				children: /* @__PURE__ */ (0, import_jsx_runtime$76.jsx)("path", {
					d: "M5.0718 -2.9282L18.9282 5.0718L10.9282 18.9282L-2.9282 10.9282L5.0718 -2.9282Z",
					clipRule: "evenodd"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$76.jsx)("g", {
				clipPath: `url(#${clipId})`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$76.jsx)("path", {
					transform: "matrix(0.866025 0.5 -0.5 0.866025 5.61601 -2.4408)",
					fillRule: "evenodd",
					d: "M8.9467 0.6883Q8.2584 0 7.285 0Q6.3116 0 5.6233 0.6883Q4.935 1.3766 4.935 2.35Q4.935 3.3234 5.6233 4.0117Q6.3116 4.7 7.285 4.7Q8.2584 4.7 8.9467 4.0117Q9.2206 3.7378 9.3855 3.4188Q10.3442 3.8684 11.0479 4.711Q11.9938 5.8435 12.1553 7.3052L13.348 7.1734Q13.1468 5.352 11.9689 3.9417Q10.9966 2.7777 9.6317 2.2159Q9.5871 1.3287 8.9467 0.6883ZM6.4718 1.5368Q6.8087 1.2 7.285 1.2Q7.7613 1.2 8.0982 1.5368Q8.435 1.8737 8.435 2.35Q8.435 2.8263 8.0982 3.1632Q7.7613 3.5 7.285 3.5Q6.8087 3.5 6.4718 3.1632Q6.135 2.8263 6.135 2.35Q6.135 1.8737 6.4718 1.5368ZM3.1301 8.3301Q2.7579 8.2303 2.4009 8.2464Q2.3852 8.0494 2.3852 7.8499Q2.3852 6.6837 2.9052 5.6504Q3.4087 4.65 4.2991 3.9646L3.567 3.0137Q2.4598 3.8661 1.8333 5.1109Q1.1852 6.3988 1.1851 7.8499Q1.1852 8.2453 1.2349 8.6331Q0.4867 9.1155 0.2519 9.9918Q0 10.932 0.4867 11.775Q0.9734 12.618 1.9136 12.8699Q2.8539 13.1219 3.6969 12.6352Q4.5399 12.1485 4.7918 11.2082Q5.0437 10.268 4.557 9.425Q4.0703 8.582 3.1301 8.3301ZM11.4399 8.3301Q10.4997 8.582 10.013 9.425Q9.5263 10.268 9.7782 11.2082Q9.8785 11.5824 10.0723 11.8847Q8.8451 12.7499 7.2852 12.7499Q6.2732 12.7499 5.3522 12.3541L4.8784 13.4566Q6.0263 13.9499 7.2852 13.9499Q9.378 13.9499 10.9899 12.6988Q11.781 13.1045 12.6564 12.8699Q13.5966 12.618 14.0833 11.775Q14.57 10.932 14.3181 9.9918Q14.0661 9.0515 13.2231 8.5648Q12.3801 8.0781 11.4399 8.3301ZM10.9373 10.8976Q10.814 10.4375 11.0522 10.025Q11.2904 9.6125 11.7505 9.4892Q12.2106 9.3659 12.6231 9.6041Q13.0357 9.8422 13.159 10.3024Q13.2822 10.7625 13.0441 11.175Q12.8059 11.5875 12.3458 11.7108Q11.8857 11.8341 11.4731 11.5959Q11.0606 11.3578 10.9373 10.8976ZM3.5178 10.025Q3.2796 9.6125 2.8195 9.4892Q2.3594 9.3659 1.9469 9.6041Q1.5343 9.8422 1.411 10.3024Q1.2878 10.7625 1.5259 11.175Q1.7641 11.5875 2.2242 11.7108Q2.6843 11.8341 3.0969 11.5959Q3.5094 11.3578 3.6327 10.8976Q3.756 10.4375 3.5178 10.025Z"
				})
			})]
		});
	});
	ProjectIconV2Raw.displayName = "ProjectIconV2Raw";
	ProjectIconV2 = createIcon(ProjectIconV2Raw);
	ProjectFilledIconV2 = ProjectIconV2;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ProjectFilledIcon.tsx
var import_react$75, import_jsx_runtime$75, ProjectFilledIconRaw, ProjectFilledIcon;
var init_ProjectFilledIcon = __esmMin((() => {
	import_react$75 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$75 = require_jsx_runtime();
	ProjectFilledIconRaw = (0, import_react$75.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$75.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$75.jsx)("clipPath", {
			id: "wb-project-clip",
			children: /* @__PURE__ */ (0, import_jsx_runtime$75.jsx)("path", {
				d: "M5.0716 -2.9278L18.928 5.0722L10.928 18.9286L-2.9284 10.9286L5.0716 -2.9278Z",
				clipRule: "evenodd"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$75.jsx)("g", {
			clipPath: "url(#wb-project-clip)",
			children: /* @__PURE__ */ (0, import_jsx_runtime$75.jsx)("path", {
				transform: "matrix(0.866025 0.5 -0.5 0.866025 5.61601 -2.4408)",
				d: "M8.9467 0.6883Q8.2584 0 7.285 0Q6.3116 0 5.6233 0.6883Q4.935 1.3766 4.935 2.35Q4.935 3.3234 5.6233 4.0117Q6.3116 4.7 7.285 4.7Q8.2584 4.7 8.9467 4.0117Q9.2206 3.7378 9.3855 3.4188Q10.3442 3.8684 11.0479 4.711Q11.9938 5.8435 12.1553 7.3052L13.348 7.1734Q13.1468 5.352 11.9689 3.9417Q10.9966 2.7777 9.6317 2.2159Q9.5871 1.3287 8.9467 0.6883ZM6.4718 1.5368Q6.8087 1.2 7.285 1.2Q7.7613 1.2 8.0982 1.5368Q8.435 1.8737 8.435 2.35Q8.435 2.8263 8.0982 3.1632Q7.7613 3.5 7.285 3.5Q6.8087 3.5 6.4718 3.1632Q6.135 2.8263 6.135 2.35Q6.135 1.8737 6.4718 1.5368ZM3.1301 8.3301Q2.7579 8.2303 2.4009 8.2464Q2.3852 8.0494 2.3852 7.8499Q2.3852 6.6837 2.9052 5.6504Q3.4087 4.65 4.2991 3.9646L3.567 3.0137Q2.4598 3.8661 1.8333 5.1109Q1.1852 6.3988 1.1851 7.8499Q1.1852 8.2453 1.2349 8.6331Q0.4867 9.1155 0.2519 9.9918Q0 10.932 0.4867 11.775Q0.9734 12.618 1.9136 12.8699Q2.8539 13.1219 3.6969 12.6352Q4.5399 12.1485 4.7918 11.2082Q5.0437 10.268 4.557 9.425Q4.0703 8.582 3.1301 8.3301ZM11.4399 8.3301Q10.4997 8.582 10.013 9.425Q9.5263 10.268 9.7782 11.2082Q9.8785 11.5824 10.0723 11.8847Q8.8451 12.7499 7.2852 12.7499Q6.2732 12.7499 5.3522 12.3541L4.8784 13.4566Q6.0263 13.9499 7.2852 13.9499Q9.378 13.9499 10.9899 12.6988Q11.781 13.1045 12.6564 12.8699Q13.5966 12.618 14.0833 11.775Q14.57 10.932 14.3181 9.9918Q14.0661 9.0515 13.2231 8.5648Q12.3801 8.0781 11.4399 8.3301ZM10.9373 10.8976Q10.814 10.4375 11.0522 10.025Q11.2904 9.6125 11.7505 9.4892Q12.2106 9.3659 12.6231 9.6041Q13.0357 9.8422 13.159 10.3024Q13.2822 10.7625 13.0441 11.175Q12.8059 11.5875 12.3458 11.7108Q11.8857 11.8341 11.4731 11.5959Q11.0606 11.3578 10.9373 10.8976ZM1.411 10.3024Q1.5343 9.8422 1.9469 9.6041Q2.3594 9.3659 2.8195 9.4892Q3.2796 9.6125 3.5178 10.025Q3.756 10.4375 3.6327 10.8976Q3.5094 11.3578 3.0969 11.5959Q2.6843 11.8341 2.2242 11.7108Q1.7641 11.5875 1.5259 11.175Q1.2878 10.7625 1.411 10.3024Z"
			})
		})]
	}));
	ProjectFilledIconRaw.displayName = "ProjectFilledIconRaw";
	ProjectFilledIcon = createIcon(ProjectFilledIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/RefreshCwIcon.tsx
var RefreshCwIcon;
var init_RefreshCwIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	RefreshCwIcon = createIcon(RefreshCw, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/RepoConnectIcon.tsx
var import_react$74, import_jsx_runtime$74, RepoConnectIconRaw, RepoConnectIcon;
var init_RepoConnectIcon = __esmMin((() => {
	import_react$74 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$74 = require_jsx_runtime();
	RepoConnectIconRaw = (0, import_react$74.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("svg", {
		ref,
		viewBox: "0 0 14 14",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$74.jsx)("path", {
			d: "M7.5819 6.4181L7.5819 1.75L6.4181 1.75L6.4181 6.4181L1.75 6.4181L1.75 7.5819L6.4181 7.5819L6.4181 12.25L7.5819 12.25L7.5819 7.5819L12.25 7.5819L12.25 6.4181L7.5819 6.4181Z",
			fill: "currentColor",
			fillRule: "evenodd"
		})
	}));
	RepoConnectIconRaw.displayName = "RepoConnectIconRaw";
	RepoConnectIcon = createIcon(RepoConnectIconRaw, { size: 14 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/RepoIcon.tsx
var import_react$73, import_jsx_runtime$73, RepoIconRaw, RepoIcon;
var init_RepoIcon = __esmMin((() => {
	import_react$73 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$73 = require_jsx_runtime();
	RepoIconRaw = (0, import_react$73.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$73.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$73.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ (0, import_jsx_runtime$73.jsx)("polyline", { points: "14 2 14 8 20 8" })]
	}));
	RepoIconRaw.displayName = "RepoIconRaw";
	RepoIcon = createIcon(RepoIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ResumeCircleIcon.tsx
var import_react$72, import_jsx_runtime$72, ResumeCircleIconRaw, ResumeCircleIcon;
var init_ResumeCircleIcon = __esmMin((() => {
	import_react$72 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$72 = require_jsx_runtime();
	ResumeCircleIconRaw = (0, import_react$72.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$72.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.991547 0.991547)",
			d: "M14.0169 7.0085Q14.0169 9.9114 11.9642 11.9642Q9.9114 14.0169 7.0085 14.0169Q4.1055 14.0169 2.0527 11.9642Q0 9.9114 0 7.0085Q0 4.1055 2.0527 2.0527Q4.1055 0 7.0085 0Q9.2354 0 11.0484 1.2809Q12.046 1.9858 12.7216 2.9356L12.7216 0.6957L13.9216 0.6957L13.9216 3.5092Q13.9216 3.9478 13.898 4.1204Q13.8436 4.5194 13.6015 4.7615Q13.3593 5.0036 12.9604 5.0581Q12.7877 5.0816 12.3491 5.0816L9.5357 5.0816L9.5357 3.8816L11.9106 3.8816Q11.3115 2.9361 10.356 2.261Q8.8543 1.2 7.0085 1.2Q4.6025 1.2 2.9012 2.9012Q1.2 4.6025 1.2 7.0085Q1.2 9.4144 2.9012 11.1156Q4.6025 12.8169 7.0085 12.8169Q9.4144 12.8169 11.1156 11.1156Q12.8169 9.4144 12.8169 7.0085L14.0169 7.0085Z"
		})
	}));
	ResumeCircleIconRaw.displayName = "ResumeCircleIconRaw";
	ResumeCircleIcon = createIcon(ResumeCircleIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/RunningCheckIcon.tsx
var import_react$71, import_jsx_runtime$71, RunningCheckIconRaw, RunningCheckIcon;
var init_RunningCheckIcon = __esmMin((() => {
	import_react$71 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$71 = require_jsx_runtime();
	RunningCheckIconRaw = (0, import_react$71.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)("svg", {
		ref,
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$71.jsx)("path", {
			fill: "#00C29A",
			transform: "matrix(1 0 0 1 0.406242 0.406086)",
			d: "M7.5968 1.5299Q8.7661 1.7614 9.6971 2.4659L10.4036 1.6846Q9.2548 0.7878 7.8008 0.4999Q5.2765 0 3.1381 1.4315Q0.9997 2.863 0.4999 5.3873Q0 7.9116 1.4315 10.05Q2.863 12.1883 5.3873 12.6882Q7.9116 13.188 10.05 11.7566Q12.1883 10.3251 12.6882 7.8008Q12.9535 6.4612 12.6384 5.1519L11.7283 6.0281Q11.8148 6.8058 11.6582 7.5968Q11.2428 9.6945 9.4659 10.884Q7.6889 12.0736 5.5912 11.6582Q3.4936 11.2428 2.304 9.4659Q1.1145 7.6889 1.5299 5.5912Q1.9452 3.4936 3.7222 2.304Q5.4992 1.1145 7.5968 1.5299ZM4.7305 6.136Q4.8069 6.7977 5.0924 7.3746Q5.5307 8.2604 6.2777 7.9678Q7.3587 7.5443 9.4932 5.1938Q10.5876 3.9886 11.4442 2.8782L12.2756 3.5196Q11.3932 4.6633 10.2705 5.8997Q7.9707 8.4323 6.6607 8.9454Q5.766 9.296 5.0436 8.8725Q4.5061 8.5574 4.1513 7.8403Q3.7848 7.0996 3.6874 6.2565L4.7305 6.136Z",
			fillRule: "evenodd"
		})
	}));
	RunningCheckIconRaw.displayName = "RunningCheckIconRaw";
	RunningCheckIcon = createIcon(RunningCheckIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/RunningStatusIcon.tsx
var import_react$70, import_jsx_runtime$70, RunningStatusIconRaw, RunningStatusIcon;
var init_RunningStatusIcon = __esmMin((() => {
	import_react$70 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$70 = require_jsx_runtime();
	RunningStatusIconRaw = (0, import_react$70.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$70.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$70.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.5 0.5)",
			d: "M8.165 4L8.165 0L6.835 0L6.835 4L8.165 4ZM3.374 2.4331L5.4954 4.5544L4.5549 5.4949L2.4336 3.3735L3.374 2.4331ZM10.4451 5.4952L12.5664 3.3739L11.626 2.4335L9.5046 4.5548L10.4451 5.4952ZM0 8.165L4 8.165L4 6.835L0 6.835L0 8.165ZM11 8.165L15 8.165L15 6.835L11 6.835L11 8.165ZM10.4451 9.5042L12.5664 11.6255L11.626 12.5659L9.5046 10.4446L10.4451 9.5042ZM3.374 12.5663L5.4954 10.445L4.5549 9.5045L2.4336 11.6258L3.374 12.5663ZM8.165 15L8.165 11L6.835 11L6.835 15L8.165 15Z"
		})
	}));
	RunningStatusIconRaw.displayName = "RunningStatusIconRaw";
	RunningStatusIcon = createIcon(RunningStatusIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SaveIcon.tsx
var import_react$69, import_jsx_runtime$69, SaveIconRaw, SaveIcon;
var init_SaveIcon = __esmMin((() => {
	import_react$69 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$69 = require_jsx_runtime();
	SaveIconRaw = (0, import_react$69.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$69.jsx)("path", {
			transform: "matrix(1 0 0 1 1.39992 1.39992)",
			fillRule: "evenodd",
			d: "M6.5182 0.0001L9.1859 0.0001Q9.6118 0.0001 9.8139 0.0838Q10.0161 0.1675 10.3172 0.4687L12.7315 2.8829Q13.0326 3.1841 13.1163 3.3862Q13.2001 3.5884 13.2001 4.0143L13.2001 6.682Q13.2002 9.1441 13.0848 9.9892Q12.8924 11.3989 12.1457 12.1457Q11.3989 12.8924 9.9892 13.0848Q9.7896 13.1121 9.4999 13.1329L9.4999 11.93L9.5001 11.9299L9.5001 10.1001Q9.5001 10.0184 9.4999 9.9406L9.4999 9.6001L9.4981 9.6001Q9.4913 8.814 9.461 8.5166Q9.4129 8.044 9.2644 7.8223Q9.1093 7.5908 8.8778 7.4357Q8.6561 7.2872 8.1835 7.2391Q7.7995 7.2001 6.6001 7.2001Q5.4007 7.2001 5.0166 7.2391Q4.544 7.2872 4.3223 7.4357Q4.0908 7.5908 3.9357 7.8223Q3.7872 8.0441 3.7391 8.5166Q3.7001 8.9007 3.7001 10.1001L3.7001 11.9299Q4.5653 12.0001 6.5181 12.0001L6.682 12.0001Q7.6151 12.0001 8.2999 11.9841L8.2999 13.1839Q7.6044 13.2001 6.682 13.2001L6.5182 13.2001Q4.0561 13.2002 3.211 13.0848Q1.8012 12.8924 1.0545 12.1457Q0.3078 11.3989 0.1153 9.9892Q0 9.1441 0.0001 6.682L0.0001 6.5182Q0 4.0561 0.1153 3.211Q0.3078 1.8012 1.0545 1.0545Q1.8012 0.3078 3.211 0.1153Q4.0561 0 6.5182 0.0001ZM8.3796 2.0503Q8.4673 1.8991 8.4911 1.2001L6.5181 1.2001Q5.4518 1.2 4.7097 1.221Q4.7342 1.9014 4.8205 2.0503Q4.9413 2.2588 5.1499 2.3796Q5.3576 2.5001 6.6001 2.5001Q7.8425 2.5001 8.0503 2.3796Q8.2588 2.2588 8.3796 2.0503ZM9.6725 1.7505Q9.6803 1.6642 9.6859 1.5344L11.8829 3.7315Q11.9628 3.8113 11.9985 3.8493Q12.0001 3.9013 12.0001 4.0143L12.0001 6.682Q12.0002 9.0626 11.8958 9.8269Q11.7581 10.8362 11.2971 11.2971Q11.067 11.5273 10.7001 11.6769L10.7001 10.1001Q10.7001 8.8398 10.6549 8.3952Q10.5765 7.6249 10.2614 7.1545Q9.9743 6.7259 9.5457 6.4387Q9.0753 6.1237 8.305 6.0453Q7.8604 6.0001 6.6001 6.0001Q5.3398 6.0001 4.8952 6.0453Q4.1249 6.1237 3.6545 6.4387Q3.2259 6.7259 2.9387 7.1545Q2.6237 7.6249 2.5453 8.3952Q2.5001 8.8398 2.5001 10.1001L2.5001 11.6769Q2.1332 11.5273 1.903 11.2971Q1.4421 10.8362 1.3043 9.8269Q1.2 9.0626 1.2001 6.682L1.2001 6.5181Q1.2 4.1376 1.3043 3.3733Q1.4421 2.364 1.903 1.903Q2.364 1.4421 3.3733 1.3043Q3.4346 1.296 3.5065 1.2882Q3.5133 1.5924 3.5277 1.7505Q3.5774 2.2986 3.7823 2.652Q4.0633 3.1369 4.5481 3.4179Q4.9016 3.6227 5.4496 3.6725Q5.754 3.7001 6.6001 3.7001Q7.4461 3.7001 7.7505 3.6725Q8.2986 3.6227 8.652 3.4179Q9.1369 3.1369 9.4179 2.652Q9.6227 2.2986 9.6725 1.7505Z"
		})
	}));
	SaveIconRaw.displayName = "SaveIconRaw";
	SaveIcon = createIcon(SaveIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SearchIcon.tsx
var import_react$68, import_jsx_runtime$68, SearchIconRaw, SearchIcon;
var init_SearchIcon = __esmMin((() => {
	import_react$68 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$68 = require_jsx_runtime();
	SearchIconRaw = (0, import_react$68.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$68.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$68.jsx)("path", {
			transform: "matrix(1 0 0 1 0.694254 0.694255)",
			fillRule: "evenodd",
			d: "M1.3646 9.8956Q2.0746 10.8983 3.1116 11.5182Q4.1346 12.1607 5.3503 12.3381Q7.2619 12.6647 9.0751 11.7409L8.5303 10.6717Q7.4402 11.2271 6.3057 11.2198L6.3057 11.2057Q5.9108 11.2057 5.5384 11.1514Q5.1673 11.088 4.7916 10.9659Q4.2218 10.7808 3.74 10.4928Q3.2646 10.1942 2.8409 9.7706Q2.5616 9.4912 2.3366 9.1893Q2.1191 8.8821 1.9398 8.5303Q1.6678 7.9965 1.5308 7.4521Q1.4058 6.9048 1.4058 6.3057Q1.4058 5.9108 1.4601 5.5385Q1.5235 5.1673 1.6456 4.7916Q1.8307 4.2218 2.1187 3.7399Q2.4173 3.2645 2.8409 2.8409Q3.1203 2.5615 3.4222 2.3366Q3.7294 2.1191 4.0812 1.9398Q4.615 1.6678 5.1594 1.5308Q5.7067 1.4057 6.3057 1.4058Q6.7006 1.4057 7.073 1.4601Q7.4442 1.5235 7.8199 1.6456Q8.3897 1.8307 8.8716 2.1187Q9.347 2.4173 9.7706 2.8409Q10.0499 3.1203 10.2749 3.4222Q10.4924 3.7293 10.6717 4.0812L10.6842 4.0748Q11.2057 5.0823 11.2057 6.3057Q11.2057 7.8337 10.3414 9.0858Q10.2978 9.1489 10.2187 9.2616Q9.7975 9.8616 9.8001 10.1951Q9.8029 10.5402 10.0492 10.8638Q10.1573 11.0058 10.4777 11.3262L13.8815 14.73L14.73 13.8815L11.3262 10.4777Q11.1239 10.2754 11.0423 10.1828Q11.095 10.1019 11.2009 9.951Q11.2826 9.8346 11.3289 9.7675Q12.4057 8.2077 12.4058 6.3057Q12.4057 4.2708 11.2469 2.7159Q10.5369 1.7132 9.4999 1.0933Q8.4769 0.4508 7.2612 0.2734Q6.0501 0.0665 4.8786 0.3614Q3.7009 0.6305 2.7159 1.3646Q1.7132 2.0746 1.0933 3.1116Q0.4508 4.1346 0.2734 5.3504Q0.0665 6.5614 0.3614 7.7329Q0.6305 8.9106 1.3646 9.8956Z"
		})
	}));
	SearchIconRaw.displayName = "SearchIconRaw";
	SearchIcon = createIcon(SearchIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SendPlaneIcon.tsx
var import_react$67, import_jsx_runtime$67, SendPlaneIconRaw, SendPlaneIcon;
var init_SendPlaneIcon = __esmMin((() => {
	import_react$67 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$67 = require_jsx_runtime();
	SendPlaneIconRaw = (0, import_react$67.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$67.jsx)("path", {
			transform: "matrix(1 0 0 1 1.06714 2.08111)",
			d: "M11.8783 0.1634C12.2194 0.3481 12.5001 0.6288 12.6849 0.9699C13.1 1.7367 12.6874 2.9569 11.8631 5.3962L10.6837 8.8848C9.8737 11.282 9.4685 12.4807 8.7564 12.747L8.6383 12.7863C8.3579 12.8668 8.0596 12.8689 7.7765 12.7918C7.1348 12.617 6.6614 11.7101 5.8651 9.9372L5.5019 9.1237L4.9557 7.8925L3.7245 7.3463L2.911 6.9831C1.2648 6.2437 0.3648 5.7829 0.1047 5.207L0.0564 5.0717C-0.0207 4.7886 -0.0187 4.4903 0.0619 4.2099L0.1012 4.0918C0.3342 3.4687 1.2809 3.0802 3.1196 2.4504L3.9634 2.1645L7.452 0.9851C9.8912 0.1609 11.1115 -0.2516 11.8783 0.1634ZM11.629 1.541C11.5552 1.4049 11.4434 1.293 11.3073 1.2192C11.3068 1.219 11.3051 1.2186 11.3031 1.2178C11.3006 1.2168 11.2955 1.215 11.2872 1.213C11.2694 1.2087 11.2338 1.2028 11.1747 1.2012C11.0485 1.1979 10.852 1.2157 10.5484 1.282C9.9235 1.4186 9.0836 1.7001 7.8359 2.1217L4.3473 3.3011C3.1215 3.7154 2.2962 3.9958 1.7357 4.2541C1.3894 4.4137 1.2547 4.5171 1.213 4.5531C1.1997 4.6053 1.1972 4.6594 1.2054 4.7126C1.2427 4.7514 1.366 4.8671 1.6985 5.0592C2.2328 5.368 3.0285 5.7237 4.2113 6.249L5.3583 6.758L8.0914 4.0248L8.9394 4.8728L6.162 7.6501L6.5992 8.6369C7.1245 9.8197 7.4802 10.6154 7.7889 11.1498C7.981 11.4821 8.0967 11.6054 8.1356 11.6428C8.1886 11.651 8.2424 11.6477 8.2944 11.6345C8.3304 11.5928 8.4345 11.4587 8.5941 11.1125C8.8524 10.552 9.1328 9.7268 9.5471 8.5009L10.7258 5.0116C11.1474 3.7639 11.4297 2.9247 11.5662 2.2999C11.6326 1.996 11.6503 1.7997 11.647 1.6736C11.6454 1.6142 11.6395 1.5788 11.6353 1.561C11.6332 1.5526 11.6314 1.5476 11.6304 1.5451C11.6296 1.5428 11.6291 1.5411 11.629 1.541Z"
		})
	}));
	SendPlaneIconRaw.displayName = "SendPlaneIconRaw";
	SendPlaneIcon = createIcon(SendPlaneIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SettingsIcon.tsx
var import_react$66, import_jsx_runtime$66, SettingsIconRaw, SettingsIcon;
var init_SettingsIcon = __esmMin((() => {
	import_react$66 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$66 = require_jsx_runtime();
	SettingsIconRaw = (0, import_react$66.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$66.jsx)("path", {
			transform: "matrix(1 0 0 1 0.709401 1.33782)",
			fillRule: "evenodd",
			d: "M13.6555 4.3622Q14.1634 5.2418 14.3164 5.5797Q14.5812 6.1642 14.5812 6.6622Q14.5812 7.1602 14.3164 7.7447Q14.1634 8.0826 13.6555 8.9622L12.4649 11.0244Q11.9571 11.904 11.741 12.2055Q11.3672 12.727 10.9359 12.976Q10.5046 13.225 9.866 13.288Q9.4969 13.3244 8.4812 13.3244L6.1 13.3244Q5.0843 13.3244 4.7152 13.288Q4.0766 13.225 3.6453 12.976Q3.214 12.727 2.8402 12.2055Q2.6241 11.904 2.1163 11.0244L0.9257 8.9622Q0.4178 8.0826 0.2648 7.7447Q0 7.1602 0 6.6622Q0 6.1642 0.2648 5.5797Q0.4178 5.2418 0.9257 4.3622L2.1163 2.3Q2.6241 1.4204 2.8402 1.1189Q3.214 0.5973 3.6453 0.3483Q4.0766 0.0993 4.7152 0.0364Q5.0843 0 6.1 0L8.4812 0Q9.4969 0 9.866 0.0364Q10.5046 0.0993 10.9359 0.3483Q11.3672 0.5973 11.741 1.1189Q11.7677 1.1562 11.7989 1.2023L8.8057 1.2023Q8.6509 1.2 8.4812 1.2L6.1 1.2Q4.5702 1.2 4.2453 1.3876Q3.9204 1.5751 3.1555 2.9L1.9649 4.9622Q1.2 6.287 1.2 6.6622Q1.2 7.0373 1.9649 8.3622L3.1555 10.4244Q3.9204 11.7492 4.2453 11.9368Q4.5702 12.1244 6.1 12.1244L8.4812 12.1244Q10.011 12.1244 10.3359 11.9368Q10.6608 11.7492 11.4257 10.4244L12.6163 8.3622Q13.3812 7.0373 13.3812 6.6622Q13.3812 6.287 12.6163 4.9622L11.4257 2.9Q11.2681 2.627 11.1292 2.4023L12.524 2.4023L13.6555 4.3622ZM7.2911 3.6622Q8.5337 3.6622 9.4124 4.5409Q10.2911 5.4195 10.2911 6.6622Q10.2911 7.9048 9.4124 8.7835Q8.5337 9.6622 7.2911 9.6622Q6.0484 9.6622 5.1698 8.7835Q4.2911 7.9048 4.2911 6.6622Q4.2911 5.4195 5.1698 4.5409Q6.0484 3.6622 7.2911 3.6622ZM7.2911 4.8622Q6.5455 4.8622 6.0183 5.3894Q5.4911 5.9166 5.4911 6.6622Q5.4911 7.4078 6.0183 7.935Q6.5455 8.4622 7.2911 8.4622Q8.0367 8.4622 8.5639 7.935Q9.0911 7.4078 9.0911 6.6622Q9.0911 5.9166 8.5639 5.3894Q8.0367 4.8622 7.2911 4.8622Z"
		})
	}));
	SettingsIconRaw.displayName = "SettingsIconRaw";
	SettingsIcon = createIcon(SettingsIconRaw);
})), import_jsx_runtime$65, ShareIcon;
var init_ShareIcon = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$65 = require_jsx_runtime();
	ShareIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime$65.jsx)(ShareTaskIcon, { ...props });
	ShareIcon.displayName = "ShareIcon";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ShieldCheckIcon.tsx
var import_react$64, import_jsx_runtime$64, ShieldCheckIconRaw, ShieldCheckIcon;
var init_ShieldCheckIcon = __esmMin((() => {
	import_react$64 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$64 = require_jsx_runtime();
	ShieldCheckIconRaw = (0, import_react$64.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$64.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.39985 0.567383)",
			d: "M6.5999 0C7.4983 0 8.6888 0.3456 9.7542 0.7861C10.8242 1.2286 11.8821 1.8142 12.5013 2.3691C13.2364 3.028 13.1996 3.9261 13.1996 4.5039L13.1996 8.4326C13.1994 12.1628 9.8389 14.5332 6.5999 14.5332C5.4321 14.5331 3.807 13.9176 2.4847 12.9014C1.1536 11.8783 0.0004 10.3461 0.0003 8.4326L0.0003 4.5039C0.0003 3.9262 -0.0361 3.028 0.6985 2.3691C0.8435 2.2392 1.013 2.1076 1.2005 1.9766L1.2005 4.4541C1.2005 4.4704 1.1995 4.4872 1.1995 4.5039L1.1995 8.4326C1.1997 9.8325 2.0465 11.0518 3.2151 11.9502C4.3924 12.8551 5.7678 13.3329 6.5999 13.333L6.8587 13.3271C9.5234 13.2067 12.0001 11.2388 12.0002 8.4326L12.0002 4.5039C12.0003 3.8201 11.9751 3.5088 11.7004 3.2627C11.2284 2.8395 10.3144 2.3166 9.2961 1.8955C8.2736 1.4726 7.259 1.1992 6.5999 1.1992C5.9408 1.1993 4.9261 1.4727 3.9036 1.8955C3.3541 2.1228 2.8354 2.3808 2.3997 2.6357L2.3997 1.2686C2.7367 1.0964 3.0903 0.9331 3.4456 0.7861C4.511 0.3456 5.7015 0.0001 6.5999 0ZM10.0237 5.3564L6.7318 8.6494C6.5771 8.804 6.4185 8.9637 6.2698 9.0771C6.1073 9.2012 5.8873 9.3252 5.5999 9.3252C5.3126 9.3251 5.0925 9.2012 4.93 9.0771C4.7813 8.9637 4.6227 8.804 4.4681 8.6494L3.1761 7.3564L4.0237 6.5088L5.3167 7.8008C5.4015 7.8856 5.4695 7.9536 5.5286 8.0098C5.5554 8.0352 5.5801 8.0547 5.5999 8.0723C5.6197 8.0547 5.6444 8.0352 5.6712 8.0098C5.7303 7.9536 5.7983 7.8856 5.8831 7.8008L9.1761 4.5088L10.0237 5.3564Z"
		})
	}));
	ShieldCheckIconRaw.displayName = "ShieldCheckIconRaw";
	ShieldCheckIcon = createIcon(ShieldCheckIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ShieldAlertIcon.tsx
var import_react$63, import_jsx_runtime$63, ShieldAlertIconRaw, ShieldAlertIcon;
var init_ShieldAlertIcon = __esmMin((() => {
	import_react$63 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$63 = require_jsx_runtime();
	ShieldAlertIconRaw = (0, import_react$63.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)("svg", {
		ref,
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$63.jsx)("path", {
			fill: "#F64041",
			transform: "matrix(1 0 0 1 1.22167 0.496582)",
			d: "M5.7782 0C6.5643 0 7.606 0.3024 8.5383 0.6879C9.4744 1.075 10.4001 1.5874 10.9419 2.073C11.5565 2.6238 11.5544 3.3657 11.5531 3.8718L11.553 3.8733C11.553 3.8963 11.5529 3.9189 11.5529 3.9409L11.5529 7.3785C11.5527 10.6425 8.6123 12.7166 5.7782 12.7166C4.7564 12.7165 3.3344 12.1779 2.1774 11.2887C1.0127 10.3935 0.0037 9.0529 0.0036 7.3785L0.0036 3.9409C0.0036 3.9186 0.0035 3.8958 0.0034 3.8725C0.0021 3.3666 0 2.6241 0.6145 2.073C0.7413 1.9593 0.8897 1.8441 1.0537 1.7295L1.0537 3.8973C1.0537 3.9043 1.0535 3.9114 1.0533 3.9185L1.0533 3.9186C1.0531 3.926 1.0529 3.9335 1.0529 3.9409L1.0529 7.3785C1.053 8.6035 1.794 9.6703 2.8166 10.4565C3.8467 11.2482 5.0501 11.6663 5.7782 11.6664L6.0046 11.6612C8.3362 11.5559 10.5033 9.834 10.5035 7.3785L10.5035 3.9409C10.5035 3.3426 10.4815 3.0702 10.2412 2.8549C9.8281 2.4846 9.0284 2.027 8.1374 1.6586C7.2427 1.2886 6.3549 1.0493 5.7782 1.0493C5.2015 1.0494 4.3136 1.2886 3.419 1.6586C2.9381 1.8575 2.4843 2.0832 2.1031 2.3063L2.1031 1.11C2.3979 0.9594 2.7074 0.8164 3.0182 0.6879C3.9504 0.3024 4.9921 0.0001 5.7782 0ZM6.3021 7.8159L6.3021 3.0034L5.2521 3.0034L5.2521 7.8159L6.3021 7.8159ZM5.2521 10.0031L5.2521 8.9531L6.3021 8.9531L6.3021 10.0031L5.2521 10.0031Z",
			fillRule: "evenodd"
		})
	}));
	ShieldAlertIconRaw.displayName = "ShieldAlertIconRaw";
	ShieldAlertIcon = createIcon(ShieldAlertIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SidebarToggleIcon.tsx
var import_react$62, import_jsx_runtime$62, SidebarCollapseIconRaw, SidebarExpandIconRaw, SidebarCollapseIcon, SidebarExpandIcon;
var init_SidebarToggleIcon = __esmMin((() => {
	import_react$62 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$62 = require_jsx_runtime();
	SidebarCollapseIconRaw = (0, import_react$62.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.334923 1.33492)",
			d: "M6.6651 0.0001L8.747 0.0001Q11.2135 0 12.063 0.1159Q13.4944 0.3113 14.2566 1.0735Q15.0188 1.8358 15.2142 3.2672Q15.3302 4.1166 15.3301 6.5832L15.3301 6.747Q15.3302 9.2135 15.2142 10.063Q15.0188 11.4944 14.2566 12.2566Q13.4944 13.0188 12.063 13.2142Q11.2135 13.3302 8.747 13.3301L6.5832 13.3301Q4.1167 13.3302 3.2672 13.2142Q1.8357 13.0188 1.0735 12.2566Q0.3113 11.4944 0.1159 10.063Q0 9.2135 0.0001 6.747L0.0001 6.5832Q0 4.1167 0.1159 3.2672Q0.3113 1.8358 1.0735 1.0735Q1.8358 0.3113 3.2672 0.1159Q4.1167 0 6.5832 0.0001L6.6651 0.0001ZM6.6651 1.3301L6.5831 1.3301Q4.207 1.33 3.4471 1.4337Q2.4595 1.5685 2.014 2.014Q1.5685 2.4594 1.4337 3.4471Q1.33 4.207 1.3301 6.5831L1.3301 6.747Q1.33 9.1232 1.4337 9.8831Q1.5685 10.8707 2.014 11.3162Q2.4594 11.7616 3.4471 11.8964Q4.207 12.0002 6.5831 12.0001L8.747 12.0001Q11.1232 12.0002 11.8831 11.8964Q12.8707 11.7616 13.3162 11.3162Q13.7616 10.8707 13.8964 9.8831Q14.0002 9.1232 14.0001 6.747L14.0001 6.5831Q14.0002 4.207 13.8964 3.4471Q13.7616 2.4594 13.3162 2.014Q12.8707 1.5685 11.8831 1.4337Q11.1232 1.33 8.747 1.3301L6.6651 1.3301ZM4.3301 2.6651L4.3301 10.6651L3.0001 10.6651L3.0001 2.6651L4.3301 2.6651Z",
			fillRule: "evenodd"
		})
	}));
	SidebarCollapseIconRaw.displayName = "SidebarCollapseIconRaw";
	SidebarExpandIconRaw = (0, import_react$62.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("g", {
			transform: "matrix(-1 0 0 1 16 0)",
			children: /* @__PURE__ */ (0, import_jsx_runtime$62.jsx)("path", {
				fill: "currentColor",
				transform: "matrix(1 0 0 1 0.334923 1.33492)",
				d: "M6.6651 0.0001L8.747 0.0001Q11.2135 0 12.063 0.1159Q13.4944 0.3113 14.2566 1.0735Q15.0188 1.8358 15.2142 3.2672Q15.3302 4.1166 15.3301 6.5832L15.3301 6.747Q15.3302 9.2135 15.2142 10.063Q15.0188 11.4944 14.2566 12.2566Q13.4944 13.0188 12.063 13.2142Q11.2135 13.3302 8.747 13.3301L6.5832 13.3301Q4.1167 13.3302 3.2672 13.2142Q1.8357 13.0188 1.0735 12.2566Q0.3113 11.4944 0.1159 10.063Q0 9.2135 0.0001 6.747L0.0001 6.5832Q0 4.1167 0.1159 3.2672Q0.3113 1.8358 1.0735 1.0735Q1.8358 0.3113 3.2672 0.1159Q4.1167 0 6.5832 0.0001L6.6651 0.0001ZM6.6651 1.3301L6.5831 1.3301Q4.207 1.33 3.4471 1.4337Q2.4595 1.5685 2.014 2.014Q1.5685 2.4594 1.4337 3.4471Q1.33 4.207 1.3301 6.5831L1.3301 6.747Q1.33 9.1232 1.4337 9.8831Q1.5685 10.8707 2.014 11.3162Q2.4594 11.7616 3.4471 11.8964Q4.207 12.0002 6.5831 12.0001L8.747 12.0001Q11.1232 12.0002 11.8831 11.8964Q12.8707 11.7616 13.3162 11.3162Q13.7616 10.8707 13.8964 9.8831Q14.0002 9.1232 14.0001 6.747L14.0001 6.5831Q14.0002 4.207 13.8964 3.4471Q13.7616 2.4594 13.3162 2.014Q12.8707 1.5685 11.8831 1.4337Q11.1232 1.33 8.747 1.3301L6.6651 1.3301ZM4.3301 2.6651L4.3301 10.6651L3.0001 10.6651L3.0001 2.6651L4.3301 2.6651Z",
				fillRule: "evenodd"
			})
		})
	}));
	SidebarExpandIconRaw.displayName = "SidebarExpandIconRaw";
	SidebarCollapseIcon = createIcon(SidebarCollapseIconRaw);
	SidebarExpandIcon = createIcon(SidebarExpandIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SkillIcon.tsx
var import_react$61, import_jsx_runtime$61, DEFAULT_VIEW_BOX, SkillIconRaw, SkillIcon;
var init_SkillIcon = __esmMin((() => {
	init_lucide_react();
	import_react$61 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$61 = require_jsx_runtime();
	DEFAULT_VIEW_BOX = "-1.2 -1.2 26.4 26.4";
	SkillIconRaw = (0, import_react$61.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$61.jsx)(Pickaxe, {
		ref,
		viewBox: props.viewBox ?? DEFAULT_VIEW_BOX,
		...props
	}));
	SkillIconRaw.displayName = "SkillIconRaw";
	SkillIcon = createIcon(SkillIconRaw, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SkillTabIcon.tsx
var import_react$60, import_jsx_runtime$60, SkillTabIconRaw, SkillTabIcon;
var init_SkillTabIcon = __esmMin((() => {
	import_react$60 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$60 = require_jsx_runtime();
	SkillTabIconRaw = (0, import_react$60.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$60.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.48584 0.198341)",
			d: "M4.6062 4.6186C4.7017 4.6532 4.7748 4.6796 4.8254 4.6982C5.4214 4.9159 5.995 5.1566 6.5463 5.4213L0.59 11.3778C0.1967 11.7709 0 12.2455 0 12.8022C0 13.3583 0.1967 13.8329 0.59 14.226C0.9833 14.6195 1.458 14.8163 2.0142 14.8163C2.5704 14.8163 3.0452 14.6195 3.4385 14.226L8.8444 8.8202L7.9958 7.9716L2.59 13.3778C2.431 13.5365 2.239 13.6161 2.0142 13.6161C1.7894 13.6161 1.5974 13.5365 1.4385 13.3778C1.2795 13.2187 1.2 13.0268 1.2 12.8022C1.2 12.577 1.2795 12.3852 1.4385 12.226L7.6602 6.0048C8.4607 6.4613 9.2085 6.973 9.9038 7.5404C11.526 8.8637 12.6401 10.3251 13.2462 11.9247C13.3011 12.0834 13.406 12.1947 13.5609 12.2592C13.7118 12.3324 13.8647 12.3373 14.0199 12.2733C14.136 12.2313 14.2288 12.1591 14.2985 12.057C14.3706 11.9569 14.407 11.8451 14.4072 11.7216C14.4418 9.4774 13.7079 7.3163 12.2057 5.2372C10.7145 3.1732 8.734 1.5644 6.264 0.4106C5.8638 0.2235 5.5808 0.1068 5.415 0.0609C5.0775 -0.0333 4.7667 -0.0182 4.4825 0.1059C4.2285 0.2167 4.0161 0.4198 3.8452 0.7162C3.762 0.8603 3.6353 1.1381 3.4651 1.5497L3.4637 1.5526L3.4221 1.6537C3.4137 1.6737 3.4014 1.704 3.3849 1.7436C3.1986 2.1937 3.083 2.5082 3.0381 2.6874C2.9459 3.0561 2.9677 3.3808 3.1034 3.6625C3.2231 3.9105 3.4406 4.1156 3.7555 4.2768C3.9059 4.3539 4.1896 4.4677 4.6062 4.6186ZM10.6624 6.6103C9.0975 5.3339 7.2891 4.3207 5.2372 3.5707C5.1853 3.5521 5.1111 3.5248 5.0144 3.4901C4.48 3.2968 4.2032 3.1806 4.1843 3.141C4.1559 3.0819 4.2589 2.7694 4.4937 2.2025C4.5101 2.163 4.5226 2.1327 4.5311 2.1122L4.5728 2.0111L4.5741 2.0082C4.787 1.4931 4.9164 1.2255 4.9625 1.2055C5.0206 1.1801 5.2852 1.2777 5.7561 1.4975C8.0378 2.5639 9.8635 4.0448 11.233 5.9398C11.8647 6.8144 12.345 7.7011 12.6737 8.601C12.1068 7.9052 11.4364 7.2421 10.6624 6.6103ZM10.0311 10.4843C9.9585 10.223 9.5796 10.2484 9.4539 10.5229L8.8284 11.8896C8.7889 11.9755 8.7157 12.0463 8.6287 12.0829L7.2451 12.664C6.9677 12.7807 6.9302 13.1601 7.1879 13.2421L8.4729 13.6479C8.5541 13.6737 8.6138 13.7357 8.6366 13.8183L8.998 15.1195C9.0707 15.3808 9.4496 15.3554 9.5753 15.081L10.2008 13.7143C10.2404 13.6283 10.3135 13.5575 10.4006 13.5209L11.7831 12.9398C12.0609 12.8231 12.0984 12.4433 11.8403 12.3617L10.5562 11.956C10.4752 11.9301 10.4155 11.8686 10.3926 11.7865L10.0311 10.4843Z",
			fillRule: "evenodd"
		})
	}));
	SkillTabIconRaw.displayName = "SkillTabIconRaw";
	SkillTabIcon = createIcon(SkillTabIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SparklesIcon.tsx
var import_react$59, import_jsx_runtime$59, SparklesIconRaw, SparklesIcon;
var init_SparklesIcon = __esmMin((() => {
	import_react$59 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$59 = require_jsx_runtime();
	SparklesIconRaw = (0, import_react$59.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$59.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$59.jsx)("path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }),
			/* @__PURE__ */ (0, import_jsx_runtime$59.jsx)("path", { d: "M20 2v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$59.jsx)("path", { d: "M22 4h-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$59.jsx)("circle", {
				cx: "4",
				cy: "20",
				r: "2"
			})
		]
	}));
	SparklesIconRaw.displayName = "SparklesIconRaw";
	SparklesIcon = createIcon(SparklesIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/StatusIcon.tsx
var import_react$58, import_jsx_runtime$58, StatusIconRaw, StatusIcon;
var init_StatusIcon = __esmMin((() => {
	import_react$58 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$58 = require_jsx_runtime();
	StatusIconRaw = (0, import_react$58.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$58.jsx)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.3",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$58.jsx)("path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" })
	}));
	StatusIconRaw.displayName = "StatusIconRaw";
	StatusIcon = createIcon(StatusIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SubRepoIcon.tsx
var import_react$57, import_jsx_runtime$57, SubRepoIconRaw, SubRepoIcon;
var init_SubRepoIcon = __esmMin((() => {
	import_react$57 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$57 = require_jsx_runtime();
	SubRepoIconRaw = (0, import_react$57.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$57.jsxs)("svg", {
		ref,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("polyline", { points: "15 10 20 15 15 20" }), /* @__PURE__ */ (0, import_jsx_runtime$57.jsx)("path", { d: "M4 4v7a4 4 0 0 0 4 4h12" })]
	}));
	SubRepoIconRaw.displayName = "SubRepoIconRaw";
	SubRepoIcon = createIcon(SubRepoIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SunIcon.tsx
var import_react$56, import_jsx_runtime$56, SunIconRaw, SunIcon;
var init_SunIcon = __esmMin((() => {
	import_react$56 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$56 = require_jsx_runtime();
	SunIconRaw = (0, import_react$56.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$56.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "M12 2v2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "M12 20v2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "m4.93 4.93 1.41 1.41" }),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "m17.66 17.66 1.41 1.41" }),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "M2 12h2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "M20 12h2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "m6.34 17.66-1.41 1.41" }),
			/* @__PURE__ */ (0, import_jsx_runtime$56.jsx)("path", { d: "m19.07 4.93-1.41 1.41" })
		]
	}));
	SunIconRaw.displayName = "SunIconRaw";
	SunIcon = createIcon(SunIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TableIcon.tsx
var TableIcon;
var init_TableIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	TableIcon = createIcon(Table2, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TaskBubbleIcon.tsx
var import_react$55, import_jsx_runtime$55, TaskBubbleIconRaw, TaskBubbleIcon;
var init_TaskBubbleIcon = __esmMin((() => {
	import_react$55 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$55 = require_jsx_runtime();
	TaskBubbleIconRaw = (0, import_react$55.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("path", {
			transform: "matrix(1 0 0 1 0.773203 0.777812)",
			fillRule: "evenodd",
			d: "M7.2266 0.0013C7.2614 0.0013 7.297 0.0013 7.3333 0.0012C8.0268 0.0007 8.9863 0 9.9521 0.1712C10.9684 0.3514 12.061 0.7327 12.8926 1.5647C14.2855 2.9589 14.4531 4.8397 14.4531 6.2816C14.4531 7.7234 14.2853 9.6033 12.8926 10.9974C12.094 11.7966 11.0936 12.1836 10.1406 12.3733C9.1916 12.5623 8.2453 12.5638 7.5312 12.5618C7.2983 12.5612 6.9785 12.7025 6.5684 13.096C6.17 13.4783 5.7651 14.0239 5.3662 14.6507L4.3535 14.0062C4.7714 13.3496 5.2367 12.7102 5.7373 12.2298C6.2261 11.7609 6.8348 11.3599 7.5342 11.3616C8.2533 11.3636 9.0891 11.3593 9.9062 11.1966C10.7192 11.0347 11.4695 10.7245 12.0439 10.1497C13.073 9.1197 13.2539 7.6794 13.2539 6.2816C13.2539 4.8837 13.0729 3.4434 12.0439 2.4134C11.4564 1.8254 10.6378 1.5115 9.7432 1.3528C8.8809 1.2 8.0118 1.2003 7.3052 1.2005L7.2266 1.2005L7.1478 1.2005C6.4412 1.2003 5.5722 1.2 4.71 1.3528C3.8153 1.5115 2.9967 1.8254 2.4092 2.4134C1.3801 3.4435 1.1992 4.8836 1.1992 6.2816C1.1993 7.6794 1.3802 9.1197 2.4092 10.1497C3.0494 10.7904 3.9083 11.1013 4.8252 11.2454L4.7324 11.8382L4.6387 12.431C3.5897 12.266 2.45 11.8875 1.5605 10.9974C0.1678 9.6033 0 7.7233 0 6.2816C0 4.8397 0.1676 2.9589 1.5605 1.5647C2.392 0.7328 3.4838 0.3514 4.5 0.1712C5.4656 0 6.4253 0.0007 7.1189 0.0012C7.1555 0.0013 7.1914 0.0013 7.2266 0.0013ZM5.2028 8.2222L5.2028 4.2222L4.0028 4.2222L4.0028 8.2222L5.2028 8.2222ZM10.2028 4.2222L10.2028 8.2222L9.0028 8.2222L9.0028 4.2222L10.2028 4.2222Z"
		})
	}));
	TaskBubbleIconRaw.displayName = "TaskBubbleIconRaw";
	TaskBubbleIcon = createIcon(TaskBubbleIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TaskListIcon.tsx
var TaskListIcon;
var init_TaskListIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	TaskListIcon = createIcon(ListTodo, { strokeWidth: 1.5 });
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateAlarmClockIcon.tsx
var import_react$54, import_jsx_runtime$54, TemplateAlarmClockIconRaw, TemplateAlarmClockIcon;
var init_TemplateAlarmClockIcon = __esmMin((() => {
	import_react$54 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$54 = require_jsx_runtime();
	TemplateAlarmClockIconRaw = (0, import_react$54.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$54.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("circle", {
				cx: "12",
				cy: "13",
				r: "8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("path", { d: "M12 9v4l2 2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("path", { d: "M5 3 2 6" }),
			/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("path", { d: "m22 6-3-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("path", { d: "M6.38 18.7 4 21" }),
			/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("path", { d: "M17.64 18.67 20 21" })
		]
	}));
	TemplateAlarmClockIconRaw.displayName = "TemplateAlarmClockIconRaw";
	TemplateAlarmClockIcon = createIcon(TemplateAlarmClockIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateCalendarIcon.tsx
var import_react$53, import_jsx_runtime$53, TemplateCalendarIconRaw, TemplateCalendarIcon;
var init_TemplateCalendarIcon = __esmMin((() => {
	import_react$53 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$53 = require_jsx_runtime();
	TemplateCalendarIconRaw = (0, import_react$53.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$53.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M8 2v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M16 2v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("rect", {
				width: "18",
				height: "18",
				x: "3",
				y: "4",
				rx: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M3 10h18" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M8 14h.01" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M12 14h.01" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M16 14h.01" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M8 18h.01" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M12 18h.01" }),
			/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", { d: "M16 18h.01" })
		]
	}));
	TemplateCalendarIconRaw.displayName = "TemplateCalendarIconRaw";
	TemplateCalendarIcon = createIcon(TemplateCalendarIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateFilmIcon.tsx
var import_react$52, import_jsx_runtime$52, TemplateFilmIconRaw, TemplateFilmIcon;
var init_TemplateFilmIcon = __esmMin((() => {
	import_react$52 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$52 = require_jsx_runtime();
	TemplateFilmIconRaw = (0, import_react$52.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$52.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("rect", {
				width: "20",
				height: "20",
				x: "2",
				y: "2",
				rx: "2.18",
				ry: "2.18"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("line", {
				x1: "7",
				x2: "7",
				y1: "2",
				y2: "22"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("line", {
				x1: "17",
				x2: "17",
				y1: "2",
				y2: "22"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("line", {
				x1: "2",
				x2: "22",
				y1: "12",
				y2: "12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("line", {
				x1: "2",
				x2: "7",
				y1: "7",
				y2: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("line", {
				x1: "2",
				x2: "7",
				y1: "17",
				y2: "17"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("line", {
				x1: "17",
				x2: "22",
				y1: "17",
				y2: "17"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("line", {
				x1: "17",
				x2: "22",
				y1: "7",
				y2: "7"
			})
		]
	}));
	TemplateFilmIconRaw.displayName = "TemplateFilmIconRaw";
	TemplateFilmIcon = createIcon(TemplateFilmIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateHospitalIcon.tsx
var import_react$51, import_jsx_runtime$51, TemplateHospitalIconRaw, TemplateHospitalIcon;
var init_TemplateHospitalIcon = __esmMin((() => {
	import_react$51 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$51 = require_jsx_runtime();
	TemplateHospitalIconRaw = (0, import_react$51.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$51.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("path", { d: "M12 7v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }),
			/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("path", { d: "M14 9h-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("path", { d: "M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("path", { d: "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" })
		]
	}));
	TemplateHospitalIconRaw.displayName = "TemplateHospitalIconRaw";
	TemplateHospitalIcon = createIcon(TemplateHospitalIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateImageIcon.tsx
var import_react$50, import_jsx_runtime$50, TemplateImageIconRaw, TemplateImageIcon;
var init_TemplateImageIcon = __esmMin((() => {
	import_react$50 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$50 = require_jsx_runtime();
	TemplateImageIconRaw = (0, import_react$50.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$50.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("rect", {
				width: "18",
				height: "18",
				x: "3",
				y: "3",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("circle", {
				cx: "9",
				cy: "9",
				r: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("path", { d: "m21 15-3.1-3.1a2 2 0 0 0-2.83 0L6 21" })
		]
	}));
	TemplateImageIconRaw.displayName = "TemplateImageIconRaw";
	TemplateImageIcon = createIcon(TemplateImageIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateLanguagesIcon.tsx
var import_react$49, import_jsx_runtime$49, TemplateLanguagesIconRaw, TemplateLanguagesIcon;
var init_TemplateLanguagesIcon = __esmMin((() => {
	import_react$49 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$49 = require_jsx_runtime();
	TemplateLanguagesIconRaw = (0, import_react$49.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "m5 8 6 6" }),
			/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "m4 14 6-6 2-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "M2 5h12" }),
			/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "M7 2h1" }),
			/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "m22 22-5-10-5 10" }),
			/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "M14 18h6" })
		]
	}));
	TemplateLanguagesIconRaw.displayName = "TemplateLanguagesIconRaw";
	TemplateLanguagesIcon = createIcon(TemplateLanguagesIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateLightbulbIcon.tsx
var import_react$48, import_jsx_runtime$48, TemplateLightbulbIconRaw, TemplateLightbulbIcon;
var init_TemplateLightbulbIcon = __esmMin((() => {
	import_react$48 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$48 = require_jsx_runtime();
	TemplateLightbulbIconRaw = (0, import_react$48.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$48.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("path", { d: "M15 14c.2-.63.76-1.2 1.36-1.75A6 6 0 1 0 6 8c0 1.47.63 2.79 1.64 3.7.6.55 1.16 1.12 1.36 1.75" }),
			/* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("path", { d: "M9 18h6" }),
			/* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("path", { d: "M10 22h4" })
		]
	}));
	TemplateLightbulbIconRaw.displayName = "TemplateLightbulbIconRaw";
	TemplateLightbulbIcon = createIcon(TemplateLightbulbIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateListTodoIcon.tsx
var import_react$47, import_jsx_runtime$47, TemplateListTodoIconRaw, TemplateListTodoIcon;
var init_TemplateListTodoIcon = __esmMin((() => {
	import_react$47 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$47 = require_jsx_runtime();
	TemplateListTodoIconRaw = (0, import_react$47.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("path", { d: "M13 5h8" }),
			/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("path", { d: "M13 12h8" }),
			/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("path", { d: "M13 19h8" }),
			/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("path", { d: "m3 17 2 2 4-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("rect", {
				x: "3",
				y: "4",
				width: "6",
				height: "6",
				rx: "1"
			})
		]
	}));
	TemplateListTodoIconRaw.displayName = "TemplateListTodoIconRaw";
	TemplateListTodoIcon = createIcon(TemplateListTodoIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateMessagesSquareIcon.tsx
var import_react$46, import_jsx_runtime$46, TemplateMessagesSquareIconRaw, TemplateMessagesSquareIcon;
var init_TemplateMessagesSquareIcon = __esmMin((() => {
	import_react$46 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$46 = require_jsx_runtime();
	TemplateMessagesSquareIconRaw = (0, import_react$46.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("path", { d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" }), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("path", { d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" })]
	}));
	TemplateMessagesSquareIconRaw.displayName = "TemplateMessagesSquareIconRaw";
	TemplateMessagesSquareIcon = createIcon(TemplateMessagesSquareIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateMoonIcon.tsx
var import_react$45, import_jsx_runtime$45, TemplateMoonIconRaw, TemplateMoonIcon;
var init_TemplateMoonIcon = __esmMin((() => {
	import_react$45 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$45 = require_jsx_runtime();
	TemplateMoonIconRaw = (0, import_react$45.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)("path", { d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" })
	}));
	TemplateMoonIconRaw.displayName = "TemplateMoonIconRaw";
	TemplateMoonIcon = createIcon(TemplateMoonIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateNewsIcon.tsx
var import_react$44, import_jsx_runtime$44, TemplateNewsIconRaw, TemplateNewsIcon;
var init_TemplateNewsIcon = __esmMin((() => {
	import_react$44 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$44 = require_jsx_runtime();
	TemplateNewsIconRaw = (0, import_react$44.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("path", { d: "M15 18h-5" }),
			/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("path", { d: "M18 14h-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("path", { d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("rect", {
				width: "8",
				height: "4",
				x: "10",
				y: "6",
				rx: "1"
			})
		]
	}));
	TemplateNewsIconRaw.displayName = "TemplateNewsIconRaw";
	TemplateNewsIcon = createIcon(TemplateNewsIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TemplateWeeklyReportIcon.tsx
var import_react$43, import_jsx_runtime$43, TemplateWeeklyReportIconRaw, TemplateWeeklyReportIcon;
var init_TemplateWeeklyReportIcon = __esmMin((() => {
	import_react$43 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$43 = require_jsx_runtime();
	TemplateWeeklyReportIconRaw = (0, import_react$43.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$43.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("rect", {
				width: "8",
				height: "4",
				x: "8",
				y: "2",
				rx: "1",
				ry: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }),
			/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("path", { d: "M12 11h4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("path", { d: "M12 16h4" }),
			/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("path", { d: "M8 11h.01" }),
			/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("path", { d: "M8 16h.01" })
		]
	}));
	TemplateWeeklyReportIconRaw.displayName = "TemplateWeeklyReportIconRaw";
	TemplateWeeklyReportIcon = createIcon(TemplateWeeklyReportIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentDocsBrandIcon.tsx
var import_react$42, import_jsx_runtime$42, TencentDocsBrandIconRaw, TencentDocsBrandIcon;
var init_TencentDocsBrandIcon = __esmMin((() => {
	import_react$42 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$42 = require_jsx_runtime();
	TencentDocsBrandIconRaw = (0, import_react$42.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("svg", {
		ref,
		viewBox: "0 0 28 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("path", {
				fill: "#2A65F5",
				d: "M21.93 0H4.523a.495.495 0 0 0-.487.408L.008 23.19a.494.494 0 0 0 .487.579h9.596l.76-.235h4.457l.623.235h7.392c.24 0 .445-.172.487-.408l3.313-18.74L21.93 0Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("path", {
				fill: "#00DCFF",
				d: "M21.703 4.622h5.42L21.93 0l-.715 4.043c-.053.302.18.58.488.58"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("path", {
				fill: "#FFF",
				d: "m14.125.976-.974 5.525-9.497.016 4.126 4.452h4.579L10.091 23.77h5.84l2.271-12.801h6.894l.24-.005z"
			})
		]
	}));
	TencentDocsBrandIconRaw.displayName = "TencentDocsBrandIconRaw";
	TencentDocsBrandIcon = createIcon(TencentDocsBrandIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentDocsIcon.tsx
var TencentDocsIcon;
var init_TencentDocsIcon = __esmMin((() => {
	init_Icon();
	init_tdoc_0527();
	TencentDocsIcon = createIcon({
		url: tdoc_0527_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/tdoc-0509.svg
var tdoc_0509_default;
var init_tdoc_0509 = __esmMin((() => {
	tdoc_0509_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_400_12410)'%3e%3cmask%20id='mask0_400_12410'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='16'%20height='16'%3e%3cpath%20d='M14.6667%200H1.33333C0.596952%200%200%200.596952%200%201.33333V14.6667C0%2015.403%200.596952%2016%201.33333%2016H14.6667C15.403%2016%2016%2015.403%2016%2014.6667V1.33333C16%200.596952%2015.403%200%2014.6667%200Z'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_400_12410)'%3e%3cpath%20d='M11.5116%202.27832L11.6219%202.38038L14.5132%205.06608L13.0321%2013.223C12.9805%2013.5132%2012.7278%2013.7213%2012.4368%2013.7214H8.34834L9.49413%207.87171H11.262L8.46678%205.08172L8.11292%206.62609L5.24247%206.63205L6.39869%207.87171H7.914L6.7697%2013.7214H2.11798C1.74561%2013.7213%201.45629%2013.3862%201.52272%2013.0129L3.3338%202.77598C3.38551%202.48568%203.63882%202.27834%203.92979%202.27832H11.5116ZM3.56027%205.87216L4.3671%205.87141L7.50501%205.86396L8.03097%203.56864L13.0835%208.61224L12.1896%208.63234L12.0815%208.63459H10.1222L9.2751%2012.9585H12.3057L13.687%205.34023L11.2121%203.0412H4.06241L3.56027%205.87216ZM2.3072%2012.9585H6.14167L6.98799%208.63459H6.06717L4.08847%206.51285L3.54985%205.93399L2.3072%2012.9585Z'%20fill='%23333333'%20style='fill:%23333333;fill:color(display-p3%200.2000%200.2000%200.2000);fill-opacity:1;'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_400_12410'%3e%3crect%20width='16'%20height='16'%20fill='white'%20style='fill:white;fill-opacity:1;'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentDocsIcon0509.tsx
var TencentDocsIcon0509;
var init_TencentDocsIcon0509 = __esmMin((() => {
	init_Icon();
	init_tdoc_0509();
	TencentDocsIcon0509 = createIcon({
		url: tdoc_0509_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/tdoc-source.svg
var tdoc_source_default;
var init_tdoc_source = __esmMin((() => {
	tdoc_source_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='14'%20height='14'%3e%3cpath%20fill='%231E6FFF'%20transform='matrix(1%200%200%201%201.16667%201.16667)'%20d='M0%204.6667C0%203.0312%200%202.2134%200.3177%201.5916C0.5972%201.0444%201.0444%200.5972%201.5916%200.3177C2.2134%200%203.0312%200%204.6667%200L7%200C8.6355%200%209.4533%200%2010.0751%200.3177C10.6222%200.5972%2011.0694%201.0444%2011.349%201.5916C11.6667%202.2134%2011.6667%203.0312%2011.6667%204.6667L11.6667%207C11.6667%208.6355%2011.6667%209.4533%2011.349%2010.0751C11.0694%2010.6222%2010.6222%2011.0694%2010.0751%2011.349C9.4533%2011.6667%208.6355%2011.6667%207%2011.6667L4.6667%2011.6667C3.0312%2011.6667%202.2134%2011.6667%201.5916%2011.349C1.0444%2011.0694%200.5972%2010.6222%200.3177%2010.0751C0%209.4533%200%208.6355%200%207L0%204.6667Z'/%3e%3cpath%20fill='%23FFF'%20transform='matrix(1%200%200%201%201.92722%202.24884)'%20d='M4.8641%200L4.4116%202.6029L0%202.6107L1.9167%204.7082L4.044%204.7082L3.0157%2010.5906L5.7295%2010.5906L6.7581%204.7082L9.9612%204.7082L10.0724%204.7057L4.8641%200Z'/%3e%3cpath%20fill='%2302DCFF'%20transform='matrix(1%200%200%201%2010.0334%201.22976)'%20d='M2.7265%202.3718C2.7227%202.3443%202.7187%202.3173%202.7145%202.2906L0.3694%200.0111C0.3415%200.0072%200.3131%200.0035%200.2843%200L0.0045%202.0157C-0.0271%202.2015%200.1109%202.3718%200.293%202.3718L2.7265%202.3718Z'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentDocsSourceIcon.tsx
var TencentDocsSourceIcon;
var init_TencentDocsSourceIcon = __esmMin((() => {
	init_Icon();
	init_tdoc_source();
	TencentDocsSourceIcon = createIcon({
		url: tdoc_source_default,
		themable: false,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentLexiangColorIcon.tsx
var import_react$41, import_jsx_runtime$41, TencentLexiangColorIconRaw, TencentLexiangColorIcon;
var init_TencentLexiangColorIcon = __esmMin((() => {
	import_react$41 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$41 = require_jsx_runtime();
	TencentLexiangColorIconRaw = (0, import_react$41.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("path", {
				d: "M10.7515 2.42862C10.9066 2.51811 10.9066 2.74186 10.7516 2.83137L5.94596 5.60596C5.79094 5.69546 5.59717 5.58359 5.59717 5.40459V2.40623C5.59717 2.29546 5.65626 2.19311 5.75219 2.13773L7.14737 1.33224C7.67495 1.02764 8.32497 1.02764 8.85255 1.33224L10.7515 2.42862Z",
				fill: "#30BF60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("path", {
				d: "M13.348 3.92783C13.8756 4.23244 14.2006 4.79536 14.2006 5.40457V7.59794C14.2006 7.77695 14.0068 7.88882 13.8518 7.79931L9.04613 5.02423C8.89113 4.93472 8.89113 4.71098 9.04615 4.62149L11.6428 3.12229C11.7387 3.0669 11.8569 3.0669 11.9529 3.12229L13.348 3.92783Z",
				fill: "#FCB900"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)("path", {
				d: "M4.89963 9.61105C4.89963 9.72182 4.95872 9.82417 5.05465 9.87955L7.84499 11.4906C7.94091 11.546 8.0591 11.546 8.15503 11.4906L10.9454 9.87955C11.0413 9.82417 11.1004 9.72182 11.1004 9.61105V7.41889C11.1004 7.23989 11.2942 7.12802 11.4492 7.21752L14.0457 8.7167C14.1417 8.77208 14.2008 8.87443 14.2008 8.98519V10.5955C14.2008 11.2047 13.8757 11.7677 13.3482 12.0723L8.85261 14.6678C8.32502 14.9724 7.675 14.9724 7.14741 14.6678L2.65187 12.0723C2.12427 11.7677 1.79926 11.2047 1.79926 10.5955V5.40451C1.79926 4.79531 2.12426 4.23238 2.65184 3.92777L4.55084 2.83135C4.70586 2.74185 4.89963 2.85372 4.89963 3.03272V9.61105Z",
				fill: "#3388FF"
			})
		]
	}));
	TencentLexiangColorIconRaw.displayName = "TencentLexiangColorIconRaw";
	TencentLexiangColorIcon = createIcon(TencentLexiangColorIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentLexiangIcon.tsx
var TencentLexiangIcon;
var init_TencentLexiangIcon = __esmMin((() => {
	init_Icon();
	init_lexiang_0527();
	TencentLexiangIcon = createIcon({
		url: lexiang_0527_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/lexiang-0509.svg
var lexiang_0509_default;
var init_lexiang_0509 = __esmMin((() => {
	lexiang_0509_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.25738%201.49989C7.71687%201.23474%208.28314%201.23474%208.74263%201.49989L13.2574%204.10683C13.7167%204.3721%2013.9997%204.86221%2014%205.39263V10.6065C13.9999%2011.137%2013.7167%2011.627%2013.2574%2011.8923L8.74263%2014.4993C8.28305%2014.7645%207.71696%2014.7645%207.25738%2014.4993L2.74263%2011.8923C2.28326%2011.627%202.00014%2011.137%202%2010.6065V5.39263C2.00028%204.86221%202.28327%204.3721%202.74263%204.10683L7.25738%201.49989ZM3.1144%204.74973C2.88479%204.88229%202.74291%205.12754%202.74263%205.39263V10.6065C2.74278%2010.8716%202.88479%2011.1168%203.1144%2011.2494L7.62823%2013.8564C7.85806%2013.989%208.14195%2013.989%208.37177%2013.8564L12.8856%2011.2494C13.1152%2011.1168%2013.2573%2010.8716%2013.2574%2010.6065V8.49285L10.9442%207.15718V9.16385C10.9442%209.49546%2010.7672%209.80234%2010.48%209.96819L8.46426%2011.1325C8.17708%2011.2981%207.8229%2011.2981%207.53575%2011.1325L5.51911%209.96819C5.32897%209.85825%205.18886%209.68556%205.11471%209.48575H5.05485V3.62897L3.1144%204.74973ZM8.0925%205.51141C8.03508%205.47836%207.964%205.47827%207.9066%205.51141L5.89089%206.67569C5.83371%206.7089%205.79844%206.77004%205.7984%206.83619V9.16385C5.79851%209.23006%205.83354%209.29213%205.89089%209.32526L7.9066%2010.4896C7.96386%2010.5226%208.03515%2010.5223%208.0925%2010.4896L10.1091%209.32526C10.1663%209.29211%2010.2015%209.23%2010.2016%209.16385V6.83619C10.2016%206.77003%2010.1663%206.70889%2010.1091%206.67569L8.0925%205.51141ZM8.68551%204.99455L13.2574%207.63415V5.39263C13.2571%205.12754%2013.1152%204.88229%2012.8856%204.74973L10.9977%203.6598L8.68551%204.99455ZM8.37177%202.14278C8.14203%202.01022%207.85798%202.01022%207.62823%202.14278L5.7984%203.19917V5.80248L10.2551%203.22999L8.37177%202.14278Z'%20fill='%23333333'%20style='fill:%23333333;fill:color(display-p3%200.2000%200.2000%200.2000);fill-opacity:1;'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentLexiangIcon0509.tsx
var TencentLexiangIcon0509;
var init_TencentLexiangIcon0509 = __esmMin((() => {
	init_Icon();
	init_lexiang_0509();
	TencentLexiangIcon0509 = createIcon({
		url: lexiang_0509_default,
		themable: true,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/lexiang-source.svg
var lexiang_source_default;
var init_lexiang_source = __esmMin((() => {
	lexiang_source_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'%20?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='14'%20height='14'%3e%3cpath%20fill='%231A79FF'%20transform='matrix(1%200%200%201%201.16667%201.16667)'%20d='M0%204.6667C0%203.0312%200%202.2134%200.3177%201.5916C0.5972%201.0444%201.0444%200.5972%201.5916%200.3177C2.2134%200%203.0312%200%204.6667%200L7%200C8.6355%200%209.4533%200%2010.0751%200.3177C10.6222%200.5972%2011.0694%201.0444%2011.349%201.5916C11.6667%202.2134%2011.6667%203.0312%2011.6667%204.6667L11.6667%207C11.6667%208.6355%2011.6667%209.4533%2011.349%2010.0751C11.0694%2010.6222%2010.6222%2011.0694%2010.0751%2011.349C9.4533%2011.6667%208.6355%2011.6667%207%2011.6667L4.6667%2011.6667C3.0312%2011.6667%202.2134%2011.6667%201.5916%2011.349C1.0444%2011.0694%200.5972%2010.6222%200.3177%2010.0751C0%209.4533%200%208.6355%200%207L0%204.6667Z'/%3e%3cpath%20fill='%23FFF'%20transform='matrix(1%200%200%201%203.37094%202.96356)'%20d='M4.219%202.2782C4.2259%202.2843%204.2336%202.2899%204.242%202.2948L7.0551%203.9192C7.1458%203.9716%207.2593%203.9061%207.2592%203.8013L7.2592%202.5175C7.2593%202.1608%207.069%201.8313%206.7602%201.653L6.031%201.232L4.219%202.2782ZM2.404%202.6461C2.4119%202.6433%202.4197%202.6398%202.4273%202.6353L5.2403%201.0112C5.331%200.9588%205.331%200.8279%205.2403%200.7755L4.1287%200.1337C3.8199%20-0.0446%203.4394%20-0.0446%203.1306%200.1337L2.404%200.5532L2.404%202.6461ZM1.9055%205.1369C1.8494%205.1045%201.8148%205.0446%201.8148%204.9798L1.8148%201.1291C1.8148%201.0243%201.7014%200.9589%201.6107%201.0112L0.4991%201.653C0.1902%201.8313%200%202.1609%200%202.5175L0%205.556C0%205.9126%200.1902%206.2421%200.4991%206.4204L3.1306%207.9397C3.4394%208.118%203.8199%208.118%204.1287%207.9397L6.7602%206.4204C7.069%206.2421%207.2593%205.9126%207.2593%205.556L7.2593%204.7241L5.4458%203.6771C5.4449%203.6834%205.4444%203.6899%205.4445%203.6966L5.4445%204.9798C5.4444%205.0446%205.4099%205.1045%205.3537%205.1369L3.7204%206.08C3.6642%206.1124%203.595%206.1124%203.5389%206.08L1.9055%205.1369Z'%20fill-rule='evenodd'/%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TencentLexiangSourceIcon.tsx
var TencentLexiangSourceIcon;
var init_TencentLexiangSourceIcon = __esmMin((() => {
	init_Icon();
	init_lexiang_source();
	TencentLexiangSourceIcon = createIcon({
		url: lexiang_source_default,
		themable: false,
		alt: ""
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/UnpinTopIcon.tsx
var init_UnpinTopIcon = __esmMin((() => {
	init_src();
}));
//#endregion
//#region ../../packages/agent-ui/src/assets/user-avatar.svg
var user_avatar_default;
var init_user_avatar = __esmMin((() => {
	user_avatar_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_3693_4228)'%3e%3crect%20width='30'%20height='30'%20rx='15'%20fill='%2328B894'%20/%3e%3cpath%20d='M20.7473%202.51611C21.021%202.27066%2021.0379%202.26155%2021.2384%202.2495C21.5638%202.22573%2021.8623%202.38172%2022.3696%202.84357C23.5545%203.92041%2025.2043%206.13396%2026.2302%208.02438L26.6269%208.75835L27.187%209.03712C27.7275%209.3103%2028.6134%209.87027%2028.9836%2010.1705C29.1511%2010.309%2029.1752%2010.3112%2029.3494%2010.2435C30.1352%209.93772%2031.261%2010.3432%2032.2538%2011.2955C33.1476%2012.1521%2034.0035%2013.6161%2034.3316%2014.8377C34.3794%2015.0342%2034.4428%2015.4568%2034.4659%2015.7716C34.5408%2016.8769%2034.1863%2017.76%2033.5037%2018.1596C33.3642%2018.2401%2033.3548%2018.262%2033.3587%2018.6097C33.3902%2020.2651%2032.9442%2021.9173%2032.0478%2023.5286C31.0361%2025.3379%2029.2342%2027.2096%2026.7958%2028.9729C25.4864%2029.9258%2022.3885%2031.7309%2020.9879%2032.3645C17.6327%2033.875%2014.9429%2034.4541%2012.6066%2034.1678C11.2131%2033.999%209.63581%2033.455%208.7024%2032.8236C8.45684%2032.6539%208.41758%2032.6435%208.23016%2032.6971C7.23098%2032.9841%205.92185%2032.3942%204.81015%2031.1602C4.36685%2030.667%203.65156%2029.4562%203.41941%2028.808C2.88276%2027.2912%202.98982%2025.9222%203.70466%2025.1048C3.88914%2024.8945%203.89431%2024.8852%203.854%2024.5314C3.78739%2023.9519%203.7579%2023.0942%203.78832%2022.5407L3.81194%2022.023L3.03521%2020.6503C1.83331%2018.5117%201.07%2016.7158%200.775418%2015.3437C0.619921%2014.5913%200.629989%2014.2574%200.820961%2014.0105C0.937203%2013.8613%201.31847%2013.7062%201.77808%2013.6214C2.93521%2013.4183%205.45836%2013.6023%208.26532%2014.0978L8.55711%2014.1481L9.19778%2013.582C10.2616%2012.6397%2010.9688%2012.1111%2012.2717%2011.2987C13.6296%2010.4491%2015.1619%209.74978%2016.8877%209.19635L17.4415%209.01874L17.7457%208.2195C18.8355%205.34277%2019.9515%203.22171%2020.7473%202.51611ZM11.621%2017.2596C10.3895%2017.9706%209.773%2018.3259%209.32049%2018.7242C7.4879%2020.338%206.80273%2022.8951%207.58294%2025.2089C7.77564%2025.7801%208.13192%2026.3961%208.84291%2027.6275C9.55395%2028.8591%209.90908%2029.4755%2010.3075%2029.928C11.9213%2031.7605%2014.4779%2032.4449%2016.7917%2031.6647C17.363%2031.472%2017.9793%2031.1166%2019.2108%2030.4056L26.2963%2026.3148C27.528%2025.6037%2028.1438%2025.2478%2028.5963%2024.8493C30.4288%2023.2357%2031.1136%2020.6797%2030.3335%2018.366C30.1409%2017.7947%2029.7855%2017.1784%2029.0744%2015.9469C28.3634%2014.7153%2028.0073%2014.0994%2027.6089%2013.6469C25.9952%2011.8143%2023.439%2011.1286%2021.1252%2011.9088C20.5538%2012.1015%2019.9382%2012.4577%2018.7065%2013.1688L11.621%2017.2596Z'%20fill='%23191A23'%20/%3e%3crect%20x='12.3022'%20y='22.21'%20width='2.79906'%20height='5.81344'%20rx='1.39953'%20transform='rotate(-30%2012.3022%2022.21)'%20fill='%23191A23'%20/%3e%3crect%20x='19.8552'%20y='17.8506'%20width='2.79906'%20height='5.81344'%20rx='1.39953'%20transform='rotate(-30%2019.8552%2017.8506)'%20fill='%23191A23'%20/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_3693_4228'%3e%3crect%20width='30'%20height='30'%20rx='15'%20fill='white'%20/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/UserIcon.tsx
var UserIcon;
var init_UserIcon = __esmMin((() => {
	init_user_avatar();
	init_Icon();
	UserIcon = createIcon({
		url: user_avatar_default,
		alt: "user avatar"
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/UserPromptListIcon.tsx
var import_react$40, import_jsx_runtime$40, UserPromptListIconRaw, UserPromptListIcon;
var init_UserPromptListIcon = __esmMin((() => {
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$40 = require_jsx_runtime();
	UserPromptListIconRaw = (0, import_react$40.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("svg", {
		ref,
		viewBox: "0 0 14.2 14.2",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 -0.000360489 0.000120163)",
			d: "M7.1 0Q10.0409 0 12.1205 2.0795Q14.2 4.1591 14.2 7.1Q14.2 9.7363 12.5289 11.6804L11.6771 10.8286Q13 9.2383 13 7.1Q13 4.6561 11.2719 2.9281Q9.5439 1.2 7.1 1.2Q4.6561 1.2 2.9281 2.9281Q1.2 4.6561 1.2 7.1Q1.2 9.5439 2.9281 11.2719Q4.6561 13 7.1 13Q9.2383 13 10.8286 11.6771L11.6804 12.5289Q9.7363 14.2 7.1 14.2Q4.1591 14.2 2.0795 12.1205Q0 10.0409 0 7.1Q0 4.1591 2.0795 2.0795Q4.1591 0 7.1 0ZM9.4756 10.3256L7.261 8.1099Q6.5 7.3485 6.5 6.2719L6.5 3.1L7.7 3.1L7.7 6.2719Q7.7 6.8516 8.1098 7.2616L10.3243 9.4773L9.4756 10.3256Z"
		})
	}));
	UserPromptListIconRaw.displayName = "UserPromptListIconRaw";
	UserPromptListIcon = createIcon(UserPromptListIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/UsersIcon.tsx
var UsersIcon;
var init_UsersIcon = __esmMin((() => {
	init_lucide_react();
	init_Icon();
	UsersIcon = createIcon(Users, {
		size: 14,
		strokeWidth: 1.2
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFolderIcon.tsx
var import_react$39, import_jsx_runtime$39, WbFolderIconRaw, WbFolderIcon;
var init_WbFolderIcon = __esmMin((() => {
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$39 = require_jsx_runtime();
	WbFolderIconRaw = (0, import_react$39.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)("path", {
			transform: "matrix(1 0 0 1 0.900391 0.90039)",
			d: "M4.4893 0C4.8371 0 5.0591 -0.0008 5.2754 0.0244C6.3094 0.1455 7.0485 0.6989 7.6641 1.3145L8.6494 2.2998L6.9521 2.2998L6.8154 2.1631C6.2812 1.6289 5.7808 1.2913 5.1367 1.2158C5.0059 1.2005 4.8651 1.1992 4.4893 1.1992C3.3369 1.1992 2.5394 1.4806 2.0293 1.9717C1.5234 2.4588 1.1992 3.2499 1.1992 4.4893L1.1992 8.0996C1.1992 9.0452 1.1999 9.7144 1.2471 10.2353C1.2935 10.7481 1.382 11.0583 1.5215 11.2998C1.8929 11.9429 2.4455 12.2436 3.1484 12.3867C3.519 12.4622 3.9095 12.4906 4.3184 12.5L9.2217 12.5C9.8441 12.4975 10.462 12.477 11.0312 12.3564C11.7703 12.1999 12.3358 11.8919 12.6777 11.2998C12.8172 11.0583 12.9057 10.7481 12.9521 10.2353C12.9914 9.8018 12.9958 9.2656 12.9971 8.5527L12.9961 8.1064C12.9832 6.8588 12.9095 6.3058 12.6777 5.9043C12.3358 5.3123 11.7703 5.0042 11.0312 4.8477C10.462 4.7271 9.8441 4.7066 9.2217 4.7041L2.5996 4.7041L2.5996 3.5049L8.1572 3.5049L8.1514 3.499L9.8486 3.499L9.8652 3.5156C10.3318 3.533 10.8171 3.5747 11.2803 3.6729C12.2112 3.8701 13.1449 4.3124 13.7178 5.3047C14.1305 6.02 14.1839 6.8921 14.1963 8.0938L14.1963 8.0996L14.1992 8.0996C14.1992 8.2186 14.1974 8.3345 14.1973 8.4473L14.1992 9.1025L14.1982 9.1035L14.1992 9.1045L14.1934 9.1045C14.1885 9.5777 14.1788 9.9874 14.1465 10.3437C14.0925 10.9395 13.9801 11.4449 13.7178 11.8994C13.1449 12.8917 12.2112 13.334 11.2803 13.5312C10.3688 13.7243 9.3719 13.6992 8.5996 13.6992L5.5996 13.6992C4.8004 13.6992 3.8041 13.7447 2.9092 13.5625C1.9757 13.3724 1.0723 12.9228 0.4814 11.8994C0.2191 11.4449 0.1067 10.9395 0.0527 10.3437C-0.0005 9.7561 0 9.0232 0 8.0996L0 4.4893C0 3.0495 0.3791 1.8952 1.1973 1.1074C2.0113 0.3238 3.1594 0 4.4893 0Z"
		})
	}));
	WbFolderIconRaw.displayName = "WbFolderIconRaw";
	WbFolderIcon = createIcon(WbFolderIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbPinIcon.tsx
var import_react$38, import_jsx_runtime$38, WbPinIconRaw, WbPinIcon;
var init_WbPinIcon = __esmMin((() => {
	import_react$38 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$38 = require_jsx_runtime();
	WbPinIconRaw = (0, import_react$38.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("path", {
			transform: "matrix(0.707107 0.707107 -0.707107 0.707107 9.66 -1.44)",
			fillRule: "evenodd",
			d: "M8.9091 1.7259C9.0313 2.1014 9.0313 2.5676 9.0313 3.5L9.0313 3.9998C9.0313 4.6592 9.0313 4.9889 9.0829 5.3072C9.1518 5.7316 9.2887 6.1423 9.4883 6.5232C9.638 6.8088 9.8359 7.0725 10.2316 7.6C10.7349 8.271 11.0022 8.6051 11.0295 8.9079C11.0634 9.2833 10.8774 9.6554 10.5568 9.8535C10.3173 10.0015 9.9329 10.001 9.2114 10.0002L9.2087 10.0002L9.208 10.0002C9.1513 10.0001 9.0926 10 9.0317 10L7.3316 10L7.3316 8.8L9.0317 8.8Q9.0949 8.8 9.2128 8.8002Q9.457 8.8005 9.628 8.7982Q9.5272 8.66 9.3804 8.4649Q9.3093 8.3703 9.2717 8.3201Q8.62 7.4515 8.4255 7.0803Q8.0336 6.3326 7.8984 5.4994Q7.8313 5.0857 7.8313 3.9998L7.8313 3.5Q7.8313 2.2917 7.768 2.0971Q7.5633 1.468 6.9341 1.2633Q6.7396 1.2 5.5313 1.2Q4.323 1.2 4.1284 1.2633Q3.4992 1.468 3.2946 2.0971Q3.2313 2.2917 3.2313 3.5L3.2313 4.0002Q3.2313 5.0862 3.1641 5.4999Q3.029 6.3325 2.6376 7.0797Q2.4431 7.451 1.7916 8.3199Q1.754 8.37 1.6829 8.4647Q1.5361 8.6599 1.4352 8.7982Q1.6064 8.8005 1.8507 8.8002Q1.9695 8.8 2.0318 8.8L6.1316 8.8L6.1316 10L6.1313 10L6.1317 17L4.9317 17.0001L4.9313 10L2.0318 10C1.9696 10 1.9098 10.0001 1.8521 10.0002C1.1304 10.001 0.7459 10.0015 0.5064 9.8534C0.1859 9.6553 0 9.2835 0.0338 8.9083C0.061 8.6054 0.3283 8.2712 0.8316 7.6C1.2272 7.0723 1.425 6.8085 1.5746 6.5229C1.774 6.1422 1.9108 5.7319 1.9796 5.3077C2.0313 4.9894 2.0313 4.6597 2.0313 4.0002L2.0313 3.5C2.0313 2.5676 2.0313 2.1014 2.1534 1.7259C2.4 0.9678 2.9991 0.3688 3.7572 0.1222C4.1327 0 4.5989 0 5.5313 0C6.4637 0 6.9299 0 7.3054 0.1222C8.0634 0.3688 8.6625 0.9678 8.9091 1.7259Z"
		})
	}));
	WbPinIconRaw.displayName = "WbPinIconRaw";
	WbPinIcon = createIcon(WbPinIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbSettingsIcon.tsx
var import_react$37, import_jsx_runtime$37, WbSettingsIconRaw, WbSettingsIcon;
var init_WbSettingsIcon = __esmMin((() => {
	import_react$37 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$37 = require_jsx_runtime();
	WbSettingsIconRaw = (0, import_react$37.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)("path", {
			transform: "matrix(1 0 0 1 0.386006 0.999972)",
			fillRule: "evenodd",
			d: "M1.2811 10.0311C0.427 8.5518 0 7.8122 0 7C0 6.1878 0.427 5.4482 1.2811 3.9689L1.8225 3.0311C2.6766 1.5518 3.1036 0.8122 3.807 0.4061C4.5104 0 5.3644 0 7.0725 0L8.1555 0C9.8636 0 10.7176 0 11.421 0.4061C12.1244 0.8122 12.5514 1.5518 13.4055 3.0311L13.9469 3.9689C14.801 5.4482 15.228 6.1878 15.228 7C15.228 7.8122 14.801 8.5518 13.9469 10.0311L13.4055 10.9689C12.5514 12.4482 12.1244 13.1878 11.421 13.5939C10.7176 14 9.8636 14 8.1555 14L7.0725 14C5.3644 14 4.5104 14 3.807 13.5939C3.1036 13.1878 2.6766 12.4482 1.8225 10.9689L1.2811 10.0311ZM2.9744 10.3039Q3.689 11.5416 3.9523 11.9091Q4.2372 12.3065 4.472 12.4421Q4.7068 12.5777 5.1935 12.6256Q5.6433 12.67 7.0725 12.67L8.1555 12.67Q9.5847 12.67 10.0345 12.6256Q10.5212 12.5777 10.756 12.4421Q10.9908 12.3065 11.2757 11.9091Q11.539 11.5417 12.2536 10.3039L12.7951 9.3661Q13.5097 8.1284 13.6962 7.7166Q13.898 7.2712 13.898 7Q13.898 6.7288 13.6962 6.2834Q13.5097 5.8716 12.7951 4.6339L12.2536 3.6961Q11.539 2.4584 11.2757 2.0909Q10.9908 1.6935 10.756 1.5579Q10.5212 1.4223 10.0345 1.3744Q9.5847 1.33 8.1555 1.33L7.0725 1.33Q5.6433 1.33 5.1935 1.3744Q4.7069 1.4223 4.472 1.5579Q4.2372 1.6935 3.9523 2.0909Q3.689 2.4584 2.9744 3.6961L2.4329 4.6339Q1.7183 5.8716 1.5318 6.2834Q1.33 6.7288 1.33 7Q1.33 7.2712 1.5318 7.7166Q1.7183 8.1284 2.4329 9.3661L2.9744 10.3039ZM7.6145 4Q8.8571 4 9.7358 4.8787Q10.6145 5.7574 10.6145 7Q10.6145 8.2427 9.7358 9.1213Q8.8571 10 7.6145 10Q6.3718 10 5.4931 9.1213Q4.6145 8.2427 4.6145 7Q4.6145 5.7574 5.4931 4.8787Q6.3718 4 7.6145 4ZM7.6145 5.33Q6.9227 5.33 6.4336 5.8191Q5.9445 6.3083 5.9445 7Q5.9445 7.6918 6.4336 8.1809Q6.9227 8.67 7.6145 8.67Q8.3062 8.67 8.7953 8.1809Q9.2845 7.6918 9.2845 7Q9.2845 6.3083 8.7953 5.8191Q8.3062 5.33 7.6145 5.33Z"
		})
	}));
	WbSettingsIconRaw.displayName = "WbSettingsIconRaw";
	WbSettingsIcon = createIcon(WbSettingsIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbUnpinIcon.tsx
var import_react$36, import_jsx_runtime$36, WbUnpinIconRaw, WbUnpinIcon;
var init_WbUnpinIcon = __esmMin((() => {
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$36 = require_jsx_runtime();
	WbUnpinIconRaw = (0, import_react$36.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("path", {
			transform: "matrix(1 0 0 1 1.12637 0.941389)",
			fillRule: "evenodd",
			d: "M13.6129 5.1387C13.4338 5.4905 13.1041 5.8202 12.4448 6.4795L12.0914 6.8329C11.6251 7.2992 11.392 7.5323 11.2035 7.7939C10.952 8.1427 10.7584 8.5299 10.6303 8.9404C10.6282 8.9471 10.6261 8.9538 10.6241 8.9605L13.7979 12.1344L12.9494 12.9829L0.9494 0.9829L1.7979 0.1344L5.0142 3.3507C5.021 3.3486 5.0279 3.3465 5.0347 3.3444C5.4448 3.2162 5.8317 3.0227 6.1803 2.7715C6.4419 2.5829 6.6751 2.3498 7.1414 1.8834L7.4951 1.5297C8.1544 0.8704 8.484 0.5408 8.8359 0.3617C9.5463 0 10.3935 0 11.104 0.3617C11.4558 0.5408 11.7855 0.8704 12.4448 1.5297C13.1041 2.1891 13.4338 2.5187 13.6129 2.8706C13.9746 3.581 13.9746 4.4282 13.6129 5.1387ZM5.9457 4.2821Q6.4391 4.0641 6.882 3.745Q7.222 3.4999 7.9899 2.732L8.3436 2.3783Q9.198 1.5239 9.3803 1.4311Q9.9699 1.1309 10.5596 1.4311Q10.7419 1.5239 11.5963 2.3783Q12.4507 3.2327 12.5435 3.415Q12.8437 4.0046 12.5435 4.5942Q12.4507 4.7766 11.5963 5.631L11.2429 5.9844Q10.475 6.7522 10.23 7.0922Q9.9106 7.5353 9.6926 8.029L5.9457 4.2821ZM5.7982 9.0253L6.6451 8.1785L2.3466 3.88C2.3144 3.8988 2.2852 3.9192 2.2584 3.9415C1.9692 4.183 1.8377 4.5774 1.9243 4.944C1.9889 5.2182 2.2611 5.4897 2.772 5.9994C2.8129 6.0401 2.8553 6.0824 2.8992 6.1263L4.9495 8.1766L0 13.1267L0.8486 13.9751L5.798 9.0251L5.7982 9.0253ZM7.4936 9.027L10.0951 11.6286C10.0764 11.6606 10.0561 11.6898 10.0338 11.7164C9.7923 12.0059 9.3977 12.1374 9.0309 12.0508C8.7569 11.9861 8.4854 11.714 7.9759 11.2032L7.974 11.2013L7.9734 11.2008C7.9334 11.1607 7.892 11.1191 7.8489 11.076L6.6468 9.8739L7.4936 9.027Z"
		})
	}));
	WbUnpinIconRaw.displayName = "WbUnpinIconRaw";
	WbUnpinIcon = createIcon(WbUnpinIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileAudioIcon.tsx
var import_react$35, import_jsx_runtime$35, WbFileAudioIconRaw, WbFileAudioIcon;
var init_WbFileAudioIcon = __esmMin((() => {
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$35 = require_jsx_runtime();
	WbFileAudioIconRaw = (0, import_react$35.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("path", {
				fill: "#4AA5AD",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("path", {
					fill: "#72E2E6",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.2334 6.82308)",
				d: "M5.2733 3.0738L5.2733 1.2336C5.2733 1.2159 5.2733 1.1991 5.2733 1.1831C5.2579 1.1876 5.2417 1.1925 5.2249 1.1975L2.6635 1.9659C2.6541 1.9687 2.6452 1.9714 2.6367 1.974L2.6367 2.002L2.6367 5.3203L2.6231 5.3203C2.5763 5.6446 2.4291 5.914 2.1814 6.1285C1.9337 6.343 1.646 6.4503 1.3183 6.4503C0.9543 6.4503 0.6436 6.3216 0.3861 6.0641C0.1287 5.8067 0 5.496 0 5.132C0 4.7679 0.1287 4.4572 0.3861 4.1997C0.6436 3.9423 0.9543 3.8136 1.3183 3.8136C1.3498 3.8136 1.3813 3.8147 1.4128 3.817C1.4442 3.8193 1.4755 3.8226 1.5067 3.8271L1.5067 2.002C1.5067 1.7667 1.5299 1.592 1.5764 1.4781C1.6376 1.3283 1.7311 1.2026 1.857 1.101C1.9528 1.0237 2.1134 0.9512 2.3388 0.8836L4.9001 0.1152C5.2678 0.0049 5.5385 -0.0262 5.7122 0.0219C5.9472 0.0869 6.1295 0.2226 6.2593 0.429C6.3553 0.5816 6.4033 0.8498 6.4033 1.2336L6.4033 4.567L6.3898 4.567C6.343 4.8913 6.1957 5.1607 5.9481 5.3752C5.7004 5.5897 5.4127 5.6969 5.085 5.6969C4.721 5.6969 4.4102 5.5682 4.1528 5.3108C3.8954 5.0534 3.7667 4.7427 3.7667 4.3786C3.7667 4.0146 3.8954 3.7038 4.1528 3.4464C4.4102 3.189 4.721 3.0603 5.085 3.0603C5.1165 3.0603 5.148 3.0614 5.1794 3.0637C5.2108 3.0659 5.2421 3.0693 5.2733 3.0738Z"
			})
		]
	}));
	WbFileAudioIconRaw.displayName = "WbFileAudioIconRaw";
	WbFileAudioIcon = createIcon(WbFileAudioIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileDiagramIcon.tsx
var import_react$34, import_jsx_runtime$34, WbFileDiagramIconRaw, WbFileDiagramIcon;
var init_WbFileDiagramIcon = __esmMin((() => {
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$34 = require_jsx_runtime();
	WbFileDiagramIconRaw = (0, import_react$34.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("path", {
				fill: "#EB9752",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("path", {
					fill: "#FFE2AB",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.61003 7)",
				d: "M1.9105 0.5597C1.8854 0.6544 1.8854 0.7696 1.8854 1C1.8854 1.2304 1.8854 1.3456 1.9105 1.4403C1.9771 1.6912 2.1699 1.8907 2.4168 1.9668L1.3999 3.5783L1 3.5783C0.7696 3.5783 0.6544 3.5783 0.5597 3.6034C0.2993 3.6725 0.0942 3.8776 0.0251 4.138C0 4.2327 0 4.3479 0 4.5783C0 4.8087 0 4.9239 0.0251 5.0186C0.0942 5.279 0.2993 5.4841 0.5597 5.5532C0.6544 5.5783 0.7696 5.5783 1 5.5783L2.0133 5.5783C2.2437 5.5783 2.3589 5.5783 2.4536 5.5532C2.7141 5.4841 2.9192 5.279 2.9882 5.0186C3.0133 4.9239 3.0133 4.8087 3.0133 4.5783C3.0133 4.3479 3.0133 4.2327 2.9882 4.138C2.9192 3.8776 2.7141 3.6725 2.4536 3.6034C2.4072 3.5911 2.3559 3.5848 2.2886 3.5816L3.2866 2L3.4944 2L4.4942 3.5816C4.4266 3.5848 4.3751 3.5911 4.3286 3.6034C4.0681 3.6725 3.8631 3.8776 3.794 4.138C3.7689 4.2327 3.7689 4.3479 3.7689 4.5783C3.7689 4.8087 3.7689 4.9239 3.794 5.0186C3.8631 5.279 4.0681 5.4841 4.3286 5.5532C4.4233 5.5783 4.5385 5.5783 4.7689 5.5783L5.7822 5.5783C6.0126 5.5783 6.1278 5.5783 6.2225 5.5532C6.4829 5.4841 6.688 5.279 6.7571 5.0186C6.7822 4.9239 6.7822 4.8087 6.7822 4.5783C6.7822 4.3479 6.7822 4.2327 6.7571 4.138C6.688 3.8776 6.4829 3.6725 6.2225 3.6034C6.1278 3.5783 6.0126 3.5783 5.7822 3.5783L5.3834 3.5783L4.3651 1.9675C4.6131 1.892 4.8069 1.692 4.8736 1.4403C4.8987 1.3456 4.8988 1.2304 4.8987 1C4.8988 0.7696 4.8987 0.6544 4.8736 0.5597C4.8046 0.2993 4.5995 0.0942 4.339 0.0251C4.2443 0 4.1291 0 3.8987 0L2.8854 0C2.655 0 2.5398 0 2.4451 0.0251C2.1847 0.0942 1.9796 0.2993 1.9105 0.5597Z"
			})
		]
	}));
	WbFileDiagramIconRaw.displayName = "WbFileDiagramIconRaw";
	WbFileDiagramIcon = createIcon(WbFileDiagramIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileDocIcon.tsx
var import_react$33, import_jsx_runtime$33, WbFileDocIconRaw, WbFileDocIcon;
var init_WbFileDocIcon = __esmMin((() => {
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$33 = require_jsx_runtime();
	WbFileDocIconRaw = (0, import_react$33.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("path", {
				fill: "#5484D1",
				transform: "matrix(1 0 0 1 1.66667 1)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("path", {
					fill: "#A1D7FF",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.63249 8.9432)",
				d: "M0 3.4146C0 2.7906 0.5059 2.2846 1.13 2.2846L4.4748 2.2846L4.4748 2.4776C4.4748 3.1016 3.9688 3.6076 3.3448 3.6076L0 3.6076L0 3.4146Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.63249 8.9432)",
				d: "M0 1.13C0 0.506 0.5059 0 1.13 0L6.7347 0L6.7347 0.1929C6.7348 0.817 6.2288 1.3229 5.6048 1.3229L0 1.3229L0 1.13Z"
			})
		]
	}));
	WbFileDocIconRaw.displayName = "WbFileDocIconRaw";
	WbFileDocIcon = createIcon(WbFileDocIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileFolderIcon.tsx
var import_react$32, import_jsx_runtime$32, WbFileFolderIconRaw, WbFileFolderIcon;
var init_WbFileFolderIcon = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$32 = require_jsx_runtime();
	WbFileFolderIconRaw = (0, import_react$32.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("path", {
			fill: "#589ADB",
			transform: "matrix(1 0 0 1 1 1.66667)",
			d: "M0 3.2C0 2.0785 0 1.5178 0.2179 1.0913C0.4095 0.7162 0.7162 0.4095 1.0913 0.2179C1.5178 0 2.0785 0 3.2 0L5.1157 0C5.9158 0 6.3158 0 6.6592 0.1309C6.9622 0.2464 7.233 0.434 7.4475 0.6772C7.6906 0.9528 7.8311 1.3273 8.112 2.0764L9.3333 5.3333L0 5.3333L0 3.2Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("path", {
			fill: "#5FB4FF",
			transform: "matrix(1 0 0 1 1 4)",
			d: "M10.8 0C11.9215 0 12.4822 0 12.9087 0.2179C13.2838 0.4095 13.5905 0.7162 13.7821 1.0913C14 1.5178 14 2.0785 14 3.2L14 7.1333C14 8.2548 14 8.8156 13.7821 9.242C13.5905 9.6172 13.2838 9.9238 12.9087 10.1155C12.4822 10.3333 11.9215 10.3333 10.8 10.3333L3.2 10.3333C2.0785 10.3333 1.5178 10.3333 1.0913 10.1155C0.7162 9.9238 0.4095 9.6172 0.2179 9.242C0 8.8156 0 8.2548 0 7.1333L0 0L10.8 0Z"
		})]
	}));
	WbFileFolderIconRaw.displayName = "WbFileFolderIconRaw";
	WbFileFolderIcon = createIcon(WbFileFolderIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileHtmlIcon.tsx
var import_react$31, import_jsx_runtime$31, WbFileHtmlIconRaw, WbFileHtmlIcon;
var init_WbFileHtmlIcon = __esmMin((() => {
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$31 = require_jsx_runtime();
	WbFileHtmlIconRaw = (0, import_react$31.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("path", {
				fill: "#5484D1",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("path", {
					fill: "#A1D7FF",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M0.3795 3.5798C-0.1265 3.0737 -0.1265 2.2534 0.3795 1.7472L2.1267 0C2.6327 0.506 2.6328 1.3266 2.1268 1.8326L0.3795 3.5798Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M0.4172 1.823C-0.0888 2.3292 -0.0888 3.1496 0.4172 3.6556L2.1644 5.4028C2.6704 4.8967 2.6704 4.0762 2.1644 3.5703L0.4172 1.823Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M6.8338 3.5798C7.3398 3.0737 7.3398 2.2534 6.8338 1.7472L5.0866 0C4.5806 0.506 4.5805 1.3266 5.0865 1.8326L6.8338 3.5798Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.39339 7.55859)",
				d: "M6.7961 1.823C7.3021 2.3292 7.3021 3.1496 6.7961 3.6556L5.0489 5.4028C4.5429 4.8967 4.5429 4.0762 5.0489 3.5703L6.7961 1.823Z"
			})
		]
	}));
	WbFileHtmlIconRaw.displayName = "WbFileHtmlIconRaw";
	WbFileHtmlIcon = createIcon(WbFileHtmlIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileImageIcon.tsx
var import_react$30, import_jsx_runtime$30, WbFileImageIconRaw, WbFileImageIcon;
var init_WbFileImageIcon = __esmMin((() => {
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$30 = require_jsx_runtime();
	WbFileImageIconRaw = (0, import_react$30.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("path", {
				fill: "#5484D1",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("path", {
					fill: "#A1D7FF",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("circle", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 9.13005 6.86995)",
				cx: "1.13",
				cy: "1.13",
				r: "1.13"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.18311 8.55046)",
				d: "M7.2282 3.9695C7.5346 3.9695 7.7128 3.6232 7.5347 3.3739L6.5937 2.0565C6.3231 1.6777 5.7772 1.6325 5.448 1.9617L5.2539 2.1558C5.0918 2.3179 4.8238 2.2988 4.6862 2.1154L3.3257 0.3013C3.0138 -0.1145 2.3845 -0.097 2.0962 0.3355L0.0639 3.3839C-0.103 3.6342 0.0765 3.9695 0.3773 3.9695L7.2282 3.9695Z"
			})
		]
	}));
	WbFileImageIconRaw.displayName = "WbFileImageIconRaw";
	WbFileImageIcon = createIcon(WbFileImageIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileMarkdownIcon.tsx
var import_react$29, import_jsx_runtime$29, WbFileMarkdownIconRaw, WbFileMarkdownIcon;
var init_WbFileMarkdownIcon = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$29 = require_jsx_runtime();
	WbFileMarkdownIconRaw = (0, import_react$29.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("path", {
				fill: "#4AA5AD",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("path", {
					fill: "#72E2E6",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.61003 7.24626)",
				d: "M0 1.2148C0 0.5622 0.5145 0.0299 1.1599 0.0012C1.1667 0.0008 1.1737 0.0005 1.1806 0.0005C1.192 0.0002 1.2033 0 1.2148 0L1.2148 0.0008C1.6818 0.0124 2.0994 0.2985 2.278 0.7322L3.39 3.431L4.502 0.7322C4.6806 0.2985 5.0982 0.0124 5.5652 0.0008L5.5652 0C5.5767 0 5.588 0.0002 5.5994 0.0005C5.6063 0.0005 5.6133 0.0008 5.6201 0.0012C6.2655 0.0299 6.78 0.5622 6.78 1.2148L6.78 5.65C6.1091 5.65 5.5652 5.1061 5.5652 4.4353L5.5652 1.3824L4.2246 4.2297C4.106 4.4815 3.8904 4.6677 3.6346 4.7522C3.5842 4.7839 3.5242 4.8025 3.4582 4.8025C3.4353 4.8025 3.4126 4.8017 3.39 4.8002C3.3674 4.8017 3.3447 4.8025 3.3218 4.8025C3.2558 4.8025 3.1958 4.7839 3.1454 4.7522C2.8896 4.6677 2.674 4.4815 2.5554 4.2297L1.2148 1.3824L1.2148 4.4353C1.2148 5.1061 0.6709 5.65 0 5.65L0 1.2148Z"
			})
		]
	}));
	WbFileMarkdownIconRaw.displayName = "WbFileMarkdownIconRaw";
	WbFileMarkdownIcon = createIcon(WbFileMarkdownIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFilePdfIcon.tsx
var import_react$28, import_jsx_runtime$28, WbFilePdfIconRaw, WbFilePdfIcon;
var init_WbFilePdfIcon = __esmMin((() => {
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$28 = require_jsx_runtime();
	WbFilePdfIconRaw = (0, import_react$28.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("path", {
				fill: "#DE6A76",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("path", {
					fill: "#FFC2C2",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.38021 6.67253)",
				d: "M2.7868 0.0877C3.2114 0.0818 3.4236 0.0787 3.5843 0.1596C3.7265 0.2311 3.8413 0.347 3.9079 0.4892C4.0033 0.6926 3.9742 0.8881 3.9161 1.2793C3.7488 2.405 3.3239 3.4317 2.5764 4.4019C2.3033 4.7563 1.9928 5.0726 1.6543 5.3566C1.3551 5.6076 1.2056 5.7332 0.9834 5.7592C0.83 5.7772 0.6733 5.7421 0.5389 5.6617C0.3874 5.5714 0.2772 5.3961 0.0567 5.0459L0 4.9558C0.6276 4.5878 1.1292 4.1449 1.5196 3.6382C2.2821 2.6486 2.711 1.4316 2.6985 0.3825C2.696 0.2845 2.6943 0.1868 2.6834 0.0893L2.7868 0.0877Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.38021 6.67253)",
				d: "M3.2715 0.0058C3.1395 -0.0128 2.9846 0.0145 2.6747 0.0687C2.9559 1.5732 3.5977 2.8095 4.7656 3.8475C5.366 4.3811 6.0664 4.7627 6.8157 5.0426C6.9675 4.6557 7.0434 4.4624 7.0261 4.2838C7.0094 4.1105 6.9337 3.9448 6.8157 3.8093C6.7259 3.7059 6.5229 3.6038 6.1572 3.3647C5.963 3.2376 5.7821 3.0993 5.614 2.9498C5.0443 2.4435 4.5275 1.783 4.2122 1.0551C4.0814 0.7527 4.0329 0.5916 3.9794 0.5033C3.8193 0.2399 3.5641 0.047 3.2715 0.0058Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.38021 6.67253)",
				d: "M6.8139 4.9319C6.8423 4.5212 6.8566 4.3158 6.7889 4.1532C6.729 4.0096 6.6253 3.888 6.4931 3.8091C6.3173 3.7044 6.1189 3.7052 5.7222 3.7068C5.2359 3.7087 4.7492 3.7388 4.2702 3.7914C2.9283 3.9387 1.5876 4.2759 0.3071 4.8493L0.0262 4.9796L0.1058 5.1225C0.3011 5.4728 0.3988 5.6479 0.5424 5.748C0.6677 5.8355 0.8172 5.8841 0.9713 5.8894C1.1134 5.8942 1.3106 5.8208 1.7047 5.6799C2.5878 5.3647 3.5106 5.1594 4.4445 5.057C4.9202 5.0047 5.5882 4.9922 6.0046 4.9932C6.2509 4.9937 6.5615 5.0115 6.8069 5.0325L6.8139 4.9319Z"
			})
		]
	}));
	WbFilePdfIconRaw.displayName = "WbFilePdfIconRaw";
	WbFilePdfIcon = createIcon(WbFilePdfIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileSheetIcon.tsx
var import_react$27, import_jsx_runtime$27, WbFileSheetIconRaw, WbFileSheetIcon;
var init_WbFileSheetIcon = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$27 = require_jsx_runtime();
	WbFileSheetIconRaw = (0, import_react$27.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("path", {
				fill: "#49AB69",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("path", {
					fill: "#8FF57A",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 3.85677 8.9917)",
				d: "M8.2867 2.4012C8.2867 3.0253 7.7302 3.5312 7.0437 3.5312L4.6613 3.5312L4.6613 2.2365L8.2867 2.2365L8.2867 2.4012ZM0 3.3665C0 2.7424 0.5565 2.2365 1.243 2.2365L3.6254 2.2365L3.6254 3.5312L0 3.5312L0 3.3665ZM8.2867 0.1648C8.2867 0.7888 7.7302 1.2948 7.0437 1.2948L4.6613 1.2948L4.6613 0L8.2867 0L8.2867 0.1648ZM0 1.13C0 0.506 0.5565 0 1.243 0L3.6254 0L3.6254 1.2948L0 1.2948L0 1.13Z"
			})
		]
	}));
	WbFileSheetIconRaw.displayName = "WbFileSheetIconRaw";
	WbFileSheetIcon = createIcon(WbFileSheetIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileSlideIcon.tsx
var import_react$26, import_jsx_runtime$26, WbFileSlideIconRaw, WbFileSlideIcon;
var init_WbFileSlideIcon = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$26 = require_jsx_runtime();
	WbFileSlideIconRaw = (0, import_react$26.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("path", {
				fill: "#EB9752",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("path", {
					fill: "#FFE2AB",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.04508 7.4349)",
				d: "M0 2.825C0 2.8182 0 2.8079 0 2.7942C-0 2.1605 0.0155 1.73 0.0465 1.5026C0.1051 1.0732 0.2551 0.7378 0.4965 0.4965C0.7378 0.2551 1.0732 0.1051 1.5026 0.0465C1.73 0.0155 2.1605 -0 2.7942 0C2.8079 0 2.8182 0 2.825 0L5.085 0C5.0918 0 5.1021 0 5.1158 0C5.7495 -0 6.18 0.0155 6.4074 0.0465C6.8368 0.1051 7.1722 0.2551 7.4135 0.4965C7.6549 0.7378 7.8049 1.0732 7.8635 1.5026C7.8945 1.73 7.91 2.1605 7.91 2.7942C7.91 2.8098 7.91 2.8201 7.91 2.825C7.91 2.8299 7.91 2.8402 7.91 2.8558C7.91 3.4895 7.8945 3.92 7.8635 4.1474C7.8049 4.5768 7.6549 4.9122 7.4135 5.1535C7.1722 5.3949 6.8368 5.5449 6.4074 5.6035C6.18 5.6345 5.7495 5.65 5.1158 5.65C5.1002 5.65 5.0899 5.65 5.085 5.65L2.825 5.65C2.8201 5.65 2.8098 5.65 2.7942 5.65C2.1605 5.65 1.73 5.6345 1.5026 5.6035C1.0732 5.5449 0.7378 5.3949 0.4965 5.1535C0.2551 4.9122 0.1051 4.5768 0.0465 4.1474C0.0155 3.92 -0 3.4895 0 2.8558C0 2.8421 0 2.8318 0 2.825ZM1.13 2.825C1.13 2.8319 1.13 2.8421 1.13 2.8559C1.13 3.4383 1.142 3.8179 1.1661 3.9946C1.1904 4.1726 1.2336 4.2926 1.2955 4.3545C1.3574 4.4164 1.4774 4.4596 1.6554 4.4839C1.8321 4.508 2.2117 4.52 2.7941 4.52C2.8098 4.52 2.8201 4.52 2.825 4.52L5.085 4.52C5.0899 4.52 5.1002 4.52 5.1159 4.52C5.6983 4.52 6.0779 4.508 6.2546 4.4839C6.4326 4.4596 6.5526 4.4164 6.6145 4.3545C6.6764 4.2926 6.7196 4.1726 6.7438 3.9946C6.768 3.8179 6.78 3.4383 6.78 2.8559C6.78 2.8402 6.78 2.8299 6.78 2.825C6.78 2.8201 6.78 2.8098 6.78 2.7941C6.78 2.2117 6.768 1.8321 6.7438 1.6554C6.7196 1.4774 6.6764 1.3574 6.6145 1.2955C6.5526 1.2336 6.4326 1.1904 6.2546 1.1661C6.0779 1.142 5.6983 1.13 5.1159 1.13C5.1021 1.13 5.0919 1.13 5.085 1.13L2.825 1.13C2.8181 1.13 2.8079 1.13 2.7941 1.13C2.2117 1.13 1.8321 1.142 1.6554 1.1661C1.4774 1.1904 1.3574 1.2336 1.2955 1.2955C1.2336 1.3574 1.1904 1.4774 1.1661 1.6554C1.142 1.8321 1.13 2.2117 1.13 2.7941C1.13 2.8079 1.13 2.8181 1.13 2.825Z"
			})
		]
	}));
	WbFileSlideIconRaw.displayName = "WbFileSlideIconRaw";
	WbFileSlideIcon = createIcon(WbFileSlideIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileTxtIcon.tsx
var import_react$25, import_jsx_runtime$25, WbFileTxtIconRaw, WbFileTxtIcon;
var init_WbFileTxtIcon = __esmMin((() => {
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$25 = require_jsx_runtime();
	WbFileTxtIconRaw = (0, import_react$25.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("path", {
				fill: "#4AA5AD",
				transform: "matrix(1 0 0 1 1.66667 1)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("path", {
					fill: "#72E2E6",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(1 0 0 1 4.63272 7.33335)",
				d: "M1.13 0C0.5059 0 0 0.5059 0 1.13L0 1.3229L2.7061 1.3229L2.7061 4.6047C2.7061 5.2288 3.212 5.7347 3.8361 5.7347L4.029 5.7347L4.029 1.4633C4.029 1.4158 4.026 1.3689 4.0203 1.3229L5.6047 1.3229C6.2288 1.3229 6.7347 0.817 6.7347 0.1929L6.7347 0L1.13 0Z"
			})
		]
	}));
	WbFileTxtIconRaw.displayName = "WbFileTxtIconRaw";
	WbFileTxtIcon = createIcon(WbFileTxtIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileUnknownIcon.tsx
var import_react$24, import_jsx_runtime$24, WbFileUnknownIconRaw, WbFileUnknownIcon;
var init_WbFileUnknownIcon = __esmMin((() => {
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$24 = require_jsx_runtime();
	WbFileUnknownIconRaw = (0, import_react$24.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("path", {
			fill: "#CACAD1",
			transform: "matrix(1 0 0 1 1.66666 0.999997)",
			d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("g", {
			opacity: "0.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("path", {
				fill: "#7F7F82",
				transform: "matrix(1 0 0 1 6.4668 1)",
				d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
			})
		})]
	}));
	WbFileUnknownIconRaw.displayName = "WbFileUnknownIconRaw";
	WbFileUnknownIcon = createIcon(WbFileUnknownIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WbFileVideoIcon.tsx
var import_react$23, import_jsx_runtime$23, WbFileVideoIconRaw, WbFileVideoIcon;
var init_WbFileVideoIcon = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$23 = require_jsx_runtime();
	WbFileVideoIconRaw = (0, import_react$23.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("svg", {
		ref,
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		viewBox: "0 0 16 16",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("path", {
				fill: "#49AB69",
				transform: "matrix(1 0 0 1 1.66666 0.999997)",
				d: "M12.6667 6.4526C12.6667 5.6429 12.6667 5.2381 12.5171 4.8733C12.3675 4.5086 12.0832 4.2204 11.5146 3.6439L9.0958 1.1913C8.5163 0.6036 8.2265 0.3098 7.8562 0.1549C7.4858 0 7.0732 0 6.2478 0L4.6667 0C2.4759 0 1.3737 -0.0068 0.6834 0.6834C-0.0068 1.3737 0 2.4759 0 4.6667L0 9.3333C0 11.5241 -0.0068 12.6263 0.6834 13.3166C1.3737 14.0068 2.4759 14 4.6667 14L8 14C10.1908 14 11.293 14.0068 11.9832 13.3166C12.6735 12.6263 12.6667 11.5241 12.6667 9.3333L12.6667 6.4526Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("g", {
				opacity: "0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("path", {
					fill: "#8FF57A",
					transform: "matrix(1 0 0 1 6.4668 1)",
					d: "M7.8649 5.4766C7.8617 5.3089 7.8522 5.1927 7.8257 5.0811C7.7894 4.9289 7.7297 4.783 7.6484 4.6491C7.5568 4.4979 7.4287 4.368 7.1724 4.1081L3.8289 0.7179C3.5677 0.453 3.437 0.3205 3.284 0.2257C3.1486 0.1419 3.0005 0.0799 2.8456 0.0423C2.6707 0 2.4847 0 2.1126 0L0 0L0 0.0067L1.5067 0.0067L1.5272 0.0067C2.2209 0.0067 2.5719 0.0067 2.7926 0.2274C3.0133 0.4479 3.0133 0.7992 3.0133 1.4928L3.0133 1.5133L3.0133 1.89L3.0133 1.9312C3.0133 3.3185 3.0133 4.0207 3.4546 4.4621C3.896 4.9033 4.5981 4.9033 5.9855 4.9033L6.0267 4.9033L6.4033 4.9033L6.4238 4.9033C7.1175 4.9033 7.4688 4.9033 7.6893 5.124C7.7799 5.2145 7.8333 5.3271 7.8649 5.4766Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("path", {
				fill: "#FFF",
				transform: "matrix(-4.37114e-08 1 -1 -4.37114e-08 10.5599 6.889)",
				d: "M1.3496 1.335C1.8866 0.4978 2.1552 0 2.6177 0C3.0803 0 3.3489 0.4978 3.8859 1.335L4.3914 2.123C4.9967 3.0666 5.4088 3.5978 5.1635 4.0493C4.917 4.5032 4.2454 4.4431 3.1232 4.4431L2.1123 4.4431C0.9901 4.4431 0.3185 4.5032 0.072 4.0493C-0.1733 3.5978 0.2388 3.0666 0.8441 2.123L1.3496 1.335Z"
			})
		]
	}));
	WbFileVideoIconRaw.displayName = "WbFileVideoIconRaw";
	WbFileVideoIcon = createIcon(WbFileVideoIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/XCloseIcon.tsx
var import_react$22, import_jsx_runtime$22, XCloseIconRaw, XCloseIcon;
var init_XCloseIcon = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$22 = require_jsx_runtime();
	XCloseIconRaw = (0, import_react$22.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z"
		})
	}));
	XCloseIconRaw.displayName = "XCloseIconRaw";
	XCloseIcon = createIcon(XCloseIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/AgentToolIcon.tsx
var import_react$21, import_jsx_runtime$21, AgentToolIconRaw, AgentToolIcon;
var init_AgentToolIcon = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$21 = require_jsx_runtime();
	AgentToolIconRaw = (0, import_react$21.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.15076 0.454529)",
			d: "M1.0851 3.9791Q1.1442 3.5901 1.2785 3.2216Q1.3778 2.9472 1.5764 2.5831Q1.5807 2.5753 1.5844 2.5686Q2.0306 1.7504 2.672 1.0152L2.6797 1.0063Q3.2667 0.3322 3.6477 0.1913Q4.1656 0 4.6898 0.1687Q5.0803 0.2919 5.7321 0.9786L5.7323 0.9788Q6.4452 1.7272 7.0777 2.5892Q7.84 2.5517 8.6203 2.6831L8.6205 2.6832L9.0466 2.0246Q9.4148 1.4563 9.5635 1.2672Q9.8646 0.8842 10.1899 0.7624Q10.7773 0.5421 11.3356 0.8386Q11.6406 1.0019 11.8869 1.4183Q12.0082 1.6233 12.2948 2.2281L12.3029 2.245L12.4212 2.4983Q12.7242 3.1357 12.8039 3.3889Q12.912 3.7252 12.9554 4.0641Q12.991 4.3231 12.991 5.0342L12.991 5.2373C13.0409 5.2464 13.0849 5.2588 13.126 5.2758C13.331 5.3608 13.4927 5.5225 13.5777 5.7274C13.641 5.8808 13.641 6.0741 13.641 6.4625C13.641 6.8508 13.641 7.0441 13.5777 7.1975C13.4927 7.4025 13.331 7.5641 13.126 7.6491C13.0666 7.6737 13.0012 7.6887 12.9208 7.6979Q12.8349 8.3625 12.6074 8.808Q12.0889 9.8264 11.0712 10.3453Q10.5366 10.618 9.6889 10.6874Q9.1781 10.7292 7.7243 10.7291L6.3076 10.7291Q4.8539 10.7292 4.3431 10.6874Q3.4954 10.618 2.9608 10.3453Q1.9413 9.8252 1.4243 8.8084Q1.2887 8.5424 1.2035 8.1989C0.9981 8.1839 0.8462 8.1523 0.7102 8.0857C0.474 7.9724 0.2555 7.7557 0.1382 7.5207C0.0098 7.2624 0.0068 6.974 0.001 6.3974C0.0003 6.3224 0 6.249 0.0003 6.1741C0.0027 5.6141 0.0038 5.3357 0.1317 5.0757C0.247 4.8424 0.4698 4.6207 0.704 4.5057C0.8061 4.4559 0.9162 4.4257 1.05 4.4074Q1.061 4.1387 1.0851 3.9794L1.0851 3.9791ZM2.2716 4.159L2.2715 4.1593Q2.241 4.3614 2.241 4.9275L2.241 5.4625Q2.241 6.8672 2.2787 7.329Q2.3287 7.9403 2.4933 8.2633Q2.8342 8.9335 3.5062 9.2764Q3.8296 9.4413 4.4409 9.4914Q4.9029 9.5292 6.3076 9.5292L7.7243 9.5292Q9.1291 9.5292 9.591 9.4914Q10.2024 9.4413 10.5258 9.2764Q11.1964 8.9344 11.538 8.2636Q11.7032 7.9401 11.7532 7.329Q11.791 6.8672 11.791 5.4625L11.791 5.0342Q11.791 4.4052 11.7666 4.2275Q11.7358 3.9873 11.6614 3.7561Q11.6046 3.5756 11.3374 3.0134L11.2158 2.7533L11.2104 2.742Q10.8235 1.9256 10.7691 1.8964Q10.6922 1.8556 10.6114 1.8859Q10.5518 1.9083 10.0537 2.6771L9.4156 3.6634Q9.3213 3.8128 9.1595 3.884Q8.9995 3.9587 8.825 3.9312Q8.6755 3.9093 8.4211 3.8664Q7.6197 3.7315 6.847 3.8095Q6.6851 3.8273 6.5376 3.7583Q6.3888 3.6919 6.2962 3.5579Q5.6288 2.6099 4.8632 1.8064L4.8619 1.8049Q4.4234 1.343 4.3285 1.313Q4.1927 1.2693 4.0636 1.317Q3.9704 1.3514 3.5847 1.7943L3.577 1.8032Q3.0212 2.4402 2.6379 3.1431L2.6299 3.1579Q2.475 3.4416 2.4068 3.63Q2.3127 3.8884 2.2716 4.159ZM6.8908 5.2957L8.0908 5.2957L8.0908 7.5457L6.8908 7.5457L6.8908 5.2957ZM9.4325 5.2957L10.6325 5.2957L10.6325 7.5457L9.4325 7.5457L9.4325 5.2957ZM1.0521 14.3417Q1.7418 12.8069 3.4728 11.9913Q5.0075 11.2682 6.9377 11.2927Q8.8398 11.3169 10.4274 12.0546Q12.1791 12.8687 12.9595 14.3005L11.9058 14.8748Q11.3147 13.7902 9.9217 13.1429Q8.5674 12.5135 6.9224 12.4926Q5.2688 12.4716 3.9843 13.0768Q2.6546 13.7034 2.1466 14.8336L1.0521 14.3417Z"
		})
	}));
	AgentToolIconRaw.displayName = "AgentToolIconRaw";
	AgentToolIcon = createIcon(AgentToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ArrowToolIcon.tsx
var import_react$20, import_jsx_runtime$20, ArrowToolIconRaw, ArrowToolIcon;
var init_ArrowToolIcon = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$20 = require_jsx_runtime();
	ArrowToolIconRaw = (0, import_react$20.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("path", {
			d: "M4 6l4 4 4-4",
			stroke: "currentColor",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	}));
	ArrowToolIconRaw.displayName = "ArrowToolIconRaw";
	ArrowToolIcon = createIcon(ArrowToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CheckCircleToolIcon.tsx
var import_react$19, import_jsx_runtime$19, CheckCircleToolIconRaw, CheckCircleToolIcon;
var init_CheckCircleToolIcon = __esmMin((() => {
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$19 = require_jsx_runtime();
	CheckCircleToolIconRaw = (0, import_react$19.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "6",
			stroke: "currentColor",
			strokeWidth: "1.2"
		}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("path", {
			d: "M5.5 8l2 2 3.5-3.5",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	}));
	CheckCircleToolIconRaw.displayName = "CheckCircleToolIconRaw";
	CheckCircleToolIcon = createIcon(CheckCircleToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/CloudToolIcon.tsx
var import_react$18, import_jsx_runtime$18, CloudToolIconRaw, CloudToolIcon;
var init_CloudToolIcon = __esmMin((() => {
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$18 = require_jsx_runtime();
	CloudToolIconRaw = (0, import_react$18.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.0669512 1.40008)",
			d: "M11.4367 1.3344Q9.9391 0 7.9332 0Q5.9272 0 4.4296 1.3344Q3.0801 2.5368 2.7594 4.2735Q1.6261 4.6934 0.8743 5.679Q0 6.8251 0 8.2667Q0 10.034 1.2497 11.2837Q2.4994 12.5333 4.2675 12.5333L4.2802 12.5333L4.2912 12.5333L11.5734 12.5332L11.5999 12.5333Q13.3672 12.5333 14.6169 11.2837Q15.8666 10.034 15.8666 8.2667Q15.8666 6.825 14.9922 5.6789Q14.2592 4.718 13.1636 4.2949L13.1175 4.3328L12.6467 4.7214L12.0531 5.2111L12.4104 5.309Q13.4097 5.5829 14.0381 6.4067Q14.6666 7.2305 14.6666 8.2667Q14.6666 9.5369 13.7684 10.4351Q12.8702 11.3333 11.5999 11.3333L11.5774 11.3333L4.2912 11.3333L4.2744 11.3333L4.2658 11.3333Q2.9964 11.3333 2.0982 10.4351Q1.2 9.5369 1.2 8.2667Q1.2 7.2306 1.8284 6.4068Q2.4568 5.583 3.456 5.3091L3.8469 5.202L3.8934 4.7994Q4.0714 3.2608 5.2279 2.2304Q6.3843 1.2 7.9332 1.2Q9.482 1.2 10.6385 2.2304Q11.1869 2.719 11.5153 3.322L12.487 2.5979Q12.0781 1.9058 11.4367 1.3344Z"
		})
	}));
	CloudToolIconRaw.displayName = "CloudToolIconRaw";
	CloudToolIcon = createIcon(CloudToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DatabaseToolIcon.tsx
var import_react$17, import_jsx_runtime$17, DatabaseToolIconRaw, DatabaseToolIcon;
var init_DatabaseToolIcon = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$17 = require_jsx_runtime();
	DatabaseToolIconRaw = (0, import_react$17.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.65013 1.0189)",
			d: "M6.35 0Q8.8558 0 10.654 0.7993Q12.6921 1.7053 12.6921 3.1525Q12.6921 3.1717 12.6917 3.1908L12.692 3.1908L12.6921 7.1082L12.6925 7.1082Q12.6925 7.1297 12.6921 7.1512L12.6921 10.81Q12.6921 12.2572 10.654 13.1632Q8.8558 13.9625 6.35 13.9625Q3.8442 13.9625 2.046 13.1632Q0.0079 12.2572 0.0079 10.81L0.0079 3.1525L0.0079 3.1525Q0.0079 1.7053 2.046 0.7993Q3.8442 0 6.35 0ZM11.492 7.1322L11.492 5.0548Q11.1282 5.2949 10.654 5.5057Q8.8558 6.305 6.35 6.305Q3.8442 6.305 2.046 5.5057Q1.5718 5.2949 1.2079 5.0548L1.2079 7.1082L1.2084 7.1082Q1.2084 7.7524 2.5195 8.2952Q4.0616 8.9336 6.35 8.9336Q8.6385 8.9336 10.181 8.2952Q11.468 7.7624 11.492 7.1322ZM1.2079 8.9708Q1.5773 9.2039 2.0605 9.4039Q3.8231 10.1336 6.35 10.1337Q8.877 10.1336 10.64 9.4039Q11.1228 9.2041 11.4921 8.9712L11.4921 10.81Q11.4921 11.4774 10.1665 12.0666Q8.6011 12.7625 6.35 12.7625Q4.0989 12.7625 2.5335 12.0666Q1.2079 11.4774 1.2079 10.81L1.2079 8.9708ZM2.5335 4.4091Q1.2108 3.8212 1.2079 3.1554L1.2079 3.1525L1.2079 3.1525Q1.2079 2.4851 2.5335 1.8959Q4.0989 1.2 6.35 1.2Q8.6011 1.2 10.1665 1.8959Q11.4921 2.4851 11.4921 3.1525Q11.4921 3.8199 10.1665 4.4091Q8.6011 5.105 6.35 5.105Q4.0989 5.105 2.5335 4.4091Z"
		})
	}));
	DatabaseToolIconRaw.displayName = "DatabaseToolIconRaw";
	DatabaseToolIcon = createIcon(DatabaseToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DebugToolIcon.tsx
var import_react$16, import_jsx_runtime$16, DebugToolIconRaw, DebugToolIcon;
var init_DebugToolIcon = __esmMin((() => {
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$16 = require_jsx_runtime();
	DebugToolIconRaw = (0, import_react$16.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("rect", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 12.6587 7.54688)",
			y: "-0.6",
			width: "2.7893",
			height: "1.2"
		}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.499878 0.91316)",
			d: "M2.5436 4.1529Q2.7704 3.4988 3.0939 2.9191L1.3605 1.6922L2.0538 0.7127L3.7651 1.924Q4.3912 1.1522 5.1824 0.6689Q6.2776 0 7.5001 0Q8.4336 0 9.4374 0.4965Q10.3535 0.9496 11.1248 1.7094Q11.3075 1.8895 11.543 1.9112Q11.7488 1.9302 11.8901 1.8047L13.0742 0.7537L13.8708 1.6512L12.6867 2.7021Q12.1564 3.1729 11.4328 3.1061Q10.7706 3.045 10.2826 2.5643Q8.8978 1.2 7.5001 1.2Q5.6619 1.2 4.3968 3.0875Q4.0651 3.5824 3.8265 4.1548L11.2693 4.1661Q11.811 4.1669 12.2328 4.4922Q12.68 4.8371 12.7829 5.3839Q12.9401 6.2189 12.9401 7.0869Q12.9401 8.8297 12.3369 10.3436L13.9437 11.994L13.0839 12.8311L11.7737 11.4854Q11.1526 12.5171 10.2647 13.1978Q8.9917 14.1737 7.5001 14.1737Q6.023 14.1737 4.7587 13.2155Q3.8699 12.5419 3.2449 11.5156L1.6414 13.0776L0.8041 12.2181L2.6814 10.3893Q2.0859 8.9215 2.0611 7.2337L0 7.2337L0 6.0337L2.1188 6.0337Q2.2026 5.2944 2.406 4.5877L2.5311 4.1529L2.5436 4.1529ZM3.448 5.3543Q3.26 6.1929 3.26 7.0869Q3.26 8.8214 3.9406 10.2752Q4.5316 11.5377 5.4835 12.2591Q6.1583 12.7705 6.9001 12.9159L6.9001 7.1972L8.1001 7.1972L8.1001 12.916Q8.8521 12.7686 9.5347 12.2454Q10.4944 11.5096 11.0825 10.2257Q11.7401 8.7898 11.7401 7.0869Q11.7401 6.3308 11.6037 5.6059Q11.5586 5.3665 11.2675 5.3661L3.448 5.3543Z"
		})]
	}));
	DebugToolIconRaw.displayName = "DebugToolIconRaw";
	DebugToolIcon = createIcon(DebugToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/DeleteToolIcon.tsx
var import_react$15, import_jsx_runtime$15, DeleteToolIconRaw, DeleteToolIcon;
var init_DeleteToolIcon = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$15 = require_jsx_runtime();
	DeleteToolIconRaw = (0, import_react$15.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1 0.999994)",
			d: "M10.9 2.4L14 2.4L14 3.6L10 3.6L10 3.6L2.6 3.6L2.6 8Q2.6 9.9963 2.7623 10.4595Q3.2238 11.7762 4.5405 12.2377Q5.0037 12.4 7 12.4Q8.9963 12.4 9.4595 12.2377Q10.7762 11.7762 11.2377 10.4595Q11.4 9.9963 11.4 8L11.4 4.8L12.6 4.8L12.6 8Q12.6 10.2005 12.3702 10.8564Q11.7178 12.7178 9.8564 13.3702Q9.2005 13.6 7 13.6Q4.7995 13.6 4.1436 13.3702Q2.2822 12.7178 1.6298 10.8564Q1.4 10.2005 1.4 8L1.4 3.6L0 3.6L0 2.4L3.1 2.4L3.1769 2.2154Q3.5157 1.4024 3.6718 1.1187Q3.9532 0.6073 4.3351 0.3527Q4.717 0.0981 5.2973 0.035Q5.6192 0 6.5 0L7.5 0Q8.3808 0 8.7027 0.035Q9.283 0.0981 9.6649 0.3527Q10.0468 0.6073 10.3282 1.1187Q10.4843 1.4024 10.8231 2.2154L10.9 2.4ZM4.4025 2.4Q4.8023 1.4835 5.0008 1.3512Q5.2275 1.2 6.5 1.2L7.5 1.2Q8.7725 1.2 8.9992 1.3512Q9.1977 1.4835 9.5975 2.4L4.4025 2.4ZM7.6 5L6.4 5L6.4 11L7.6 11L7.6 5Z"
		})
	}));
	DeleteToolIconRaw.displayName = "DeleteToolIconRaw";
	DeleteToolIcon = createIcon(DeleteToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/EditToolIcon.tsx
var import_react$14, import_jsx_runtime$14, EditToolIconRaw, EditToolIcon;
var init_EditToolIcon = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$14 = require_jsx_runtime();
	EditToolIconRaw = (0, import_react$14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.999868 1.49989)",
			d: "M0.3011 12.4122Q0.6022 12.7102 1.0178 12.6286L1.9012 12.4553Q4.4733 11.9508 6.3267 10.0973L11.9021 4.5219Q12.678 3.7461 12.678 2.6489Q12.678 1.5517 11.9021 0.7758Q11.1263 0 10.0291 0Q8.9319 0 8.1561 0.7758L2.6125 6.3194Q0.7248 8.2071 0.2379 10.8318L0.0773 11.6977Q0 12.1142 0.3011 12.4122ZM11.0536 3.6734L10.7156 4.0114L8.6671 1.9618L9.0046 1.6244Q9.429 1.2 10.0291 1.2Q10.6292 1.2 11.0536 1.6244Q11.478 2.0487 11.478 2.6489Q11.478 3.249 11.0536 3.6734ZM1.3645 11.3378L1.6702 11.2778Q3.8834 10.8436 5.4782 9.2488L9.8671 4.86L7.8186 2.8103L3.461 7.1679Q1.8368 8.7922 1.4178 11.0507L1.3645 11.3378ZM6.0001 11.3L13.0001 11.3L13.0001 12.5L6.0001 12.5L6.0001 11.3Z"
		})
	}));
	EditToolIconRaw.displayName = "EditToolIconRaw";
	EditToolIcon = createIcon(EditToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/FolderToolIcon.tsx
var import_react$13, import_jsx_runtime$13, FolderToolIconRaw, FolderToolIcon;
var init_FolderToolIcon = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$13 = require_jsx_runtime();
	FolderToolIconRaw = (0, import_react$13.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.00327 1.00333)",
			d: "M5.1578 0.8849L5.5895 1.3166Q6.146 1.8731 6.2991 1.9366Q6.4523 2 7.2394 2L9.3813 2Q11.0408 1.9999 11.6222 2.0793Q12.651 2.2197 13.2124 2.781Q13.7737 3.3424 13.9141 4.3712Q13.9934 4.9525 13.9934 6.6121L13.9934 8.3949Q13.9935 10.458 13.8958 11.1734Q13.7279 12.4039 13.0659 13.0658Q12.4039 13.7278 11.1735 13.8958Q10.4581 13.9934 8.395 13.9933L5.5985 13.9933Q3.5354 13.9934 2.8199 13.8957Q1.5895 13.7278 0.9276 13.0658Q0.2656 12.4039 0.0976 11.1734Q0 10.458 0.0001 8.3949L0.0001 3.0213Q0.0001 1.6715 0.2138 1.2276Q0.5433 0.5432 1.2277 0.2137Q1.6715 0 3.0214 0Q3.6198 0 3.858 0.0544Q4.2164 0.1363 4.5278 0.3318Q4.7347 0.4618 5.1578 0.8849ZM4.215 1.8277Q3.8982 1.5109 3.8186 1.461Q3.6989 1.3858 3.561 1.3543Q3.4694 1.3333 3.0214 1.3333Q1.9758 1.3333 1.8061 1.415Q1.5422 1.5421 1.4151 1.806Q1.3334 1.9757 1.3334 3.0213L1.3334 5L12.6303 5Q12.6154 4.7157 12.593 4.5515Q12.5133 3.9676 12.2695 3.7239Q12.0257 3.4801 11.4419 3.4004Q10.9503 3.3333 9.3814 3.3333L7.2394 3.3333Q6.1871 3.3333 5.7889 3.1684Q5.3907 3.0035 4.6467 2.2594L4.215 1.8277ZM12.6595 6.3333L1.3334 6.3333L1.3334 8.395Q1.3333 10.3674 1.4187 10.9931Q1.5259 11.7786 1.8704 12.123Q2.2148 12.4675 3.0003 12.5747Q3.6259 12.6601 5.5984 12.66L8.395 12.66Q10.3675 12.6601 10.9932 12.5747Q11.7787 12.4675 12.1231 12.123Q12.4675 11.7786 12.5747 10.9931Q12.6601 10.3675 12.6601 8.395L12.6601 6.612Q12.6601 6.4682 12.6595 6.3333Z"
		})
	}));
	FolderToolIconRaw.displayName = "FolderToolIconRaw";
	FolderToolIcon = createIcon(FolderToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ImageToolIcon.tsx
var import_react$12, import_jsx_runtime$12, ImageToolIconRaw, ImageToolIcon;
var init_ImageToolIcon = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$12 = require_jsx_runtime();
	ImageToolIconRaw = (0, import_react$12.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 3.07593 4.49969)",
			d: "M8.9239 1C8.9237 0.4479 8.476 0 7.9239 0C7.3718 0.0001 6.924 0.4479 6.9238 1C6.9238 1.5522 7.3717 1.9999 7.9239 2C8.4761 2 8.9239 1.5523 8.9239 1ZM7.2657 3.0693C6.2871 2.1186 5.0193 1.4004 3.4238 1.4004C2.7127 1.4004 2.1142 1.5458 1.5508 1.8457C1.0018 2.1379 0.5126 2.5635 0 3.0762L0.8477 3.9238C1.3348 3.4367 1.725 3.112 2.1152 2.9043C2.491 2.7044 2.893 2.5996 3.4238 2.5996C4.6236 2.5996 5.6062 3.1316 6.4287 3.9307C7.2589 4.7373 7.8992 5.7935 8.3867 6.7685L9.461 6.2314C8.9485 5.2066 8.2364 4.0125 7.2657 3.0693Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.975098 1.70117)",
			d: "M0 5.9181L0 6.6922C-0.0001 9.4545 -0.0001 10.8527 0.8787 11.7316C1.7575 12.6104 3.1557 12.6103 5.9181 12.6102L6 12.6102L8.05 12.6102L8.132 12.6102C10.8943 12.6103 12.2925 12.6104 13.1713 11.7316C14.0501 10.8527 14.0501 9.4545 14.05 6.6922L14.05 6.6102L14.05 6L14.05 5.9181C14.0501 3.1557 14.0501 1.7575 13.1713 0.8787C12.2925 -0.0001 10.8943 -0.0001 8.1319 0L5.9181 0C3.1557 -0.0001 1.7575 -0.0001 0.8787 0.8787C-0.0001 1.7575 -0.0001 3.1557 0 5.9181ZM1.2 6.6102L1.2 6L1.2 5.918Q1.1999 3.5782 1.2987 2.8543Q1.4092 2.0453 1.7272 1.7272Q2.0453 1.4092 2.8543 1.2987Q3.5782 1.1999 5.918 1.2L6 1.2L8.05 1.2L8.132 1.2Q10.4718 1.1999 11.1957 1.2987Q12.0048 1.4092 12.3228 1.7272Q12.6409 2.0453 12.7513 2.8543Q12.8501 3.5782 12.85 5.918L12.85 6L12.85 6.6102L12.85 6.6922Q12.8501 9.032 12.7513 9.7559Q12.6409 10.565 12.3228 10.883Q12.0048 11.2011 11.1957 11.3115Q10.4718 11.4103 8.132 11.4102L8.05 11.4102L6 11.4102L5.918 11.4102Q3.5782 11.4103 2.8543 11.3115Q2.0453 11.2011 1.7272 10.883Q1.4092 10.565 1.2987 9.7559Q1.1999 9.032 1.2 6.6922L1.2 6.6102Z"
		})]
	}));
	ImageToolIconRaw.displayName = "ImageToolIconRaw";
	ImageToolIcon = createIcon(ImageToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/LoadingToolIcon.tsx
var import_react$11, import_jsx_runtime$11, LoadingToolIconRaw, LoadingToolIcon;
var init_LoadingToolIcon = __esmMin((() => {
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$11 = require_jsx_runtime();
	LoadingToolIconRaw = (0, import_react$11.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("path", {
			d: "M8 2a6 6 0 0 1 4.5 10",
			strokeDasharray: "4 2",
			children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("animateTransform", {
				attributeName: "transform",
				type: "rotate",
				from: "0 8 8",
				to: "360 8 8",
				dur: "1s",
				repeatCount: "indefinite"
			})
		})
	}));
	LoadingToolIconRaw.displayName = "LoadingToolIconRaw";
	LoadingToolIcon = createIcon(LoadingToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/PlanToolIcon.tsx
var import_react$10, import_jsx_runtime$10, PlanToolIconRaw, PlanToolIcon;
var init_PlanToolIcon = __esmMin((() => {
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$10 = require_jsx_runtime();
	PlanToolIconRaw = (0, import_react$10.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.70422 0.217766)",
			d: "M6.1678 0.0147L6.424 0.0147Q7.0223 0.0148 7.231 0.0567Q7.8621 0.1836 8.3192 0.6406Q8.7763 1.0977 8.9031 1.7289Q8.9451 1.9375 8.9451 2.5359Q8.9451 2.7751 8.9233 2.8837Q8.7775 3.6087 8.0525 3.7544Q7.944 3.7762 7.7047 3.7762L4.8871 3.7762Q4.6478 3.7762 4.5393 3.7544Q3.8143 3.6087 3.6685 2.8837Q3.6586 2.8343 3.6532 2.7577Q3.4154 2.7638 3.326 2.7763Q2.5105 2.8908 1.9246 3.4767Q1.3387 4.0626 1.2242 4.8782Q1.2 5.0504 1.2 5.7734L1.2 8.362Q1.2 10.4816 1.2791 11.1674Q1.384 12.0776 1.7343 12.5192Q1.9129 12.7443 2.138 12.9229Q2.5796 13.2732 3.4898 13.3781Q4.1757 13.4572 6.2953 13.4572Q8.4148 13.4572 9.1007 13.3781Q10.0109 13.2732 10.4525 12.9229Q10.6776 12.7443 10.8562 12.5192Q11.2065 12.0776 11.3114 11.1674Q11.3905 10.4816 11.3905 8.362L11.3905 5.8022Q11.3905 5.0412 11.3637 4.8603Q11.2448 4.0555 10.6659 3.4767Q10.4443 3.2551 10.1896 3.1009L10.1896 1.775Q10.9301 2.0438 11.5145 2.6282Q12.3738 3.4875 12.5508 4.6848Q12.5905 4.953 12.5905 5.8022L12.5905 8.362Q12.5905 10.5505 12.5035 11.3049Q12.3594 12.5551 11.7964 13.2649Q11.5318 13.5985 11.1982 13.8631Q10.4884 14.4261 9.2382 14.5702Q8.4838 14.6572 6.2953 14.6572Q4.1067 14.6572 3.3523 14.5702Q2.1021 14.4261 1.3923 13.8631Q1.0587 13.5985 0.7941 13.2649Q0.2311 12.5551 0.087 11.3049Q0 10.5505 0 8.362L0 5.7734Q0 4.9666 0.0358 4.7114Q0.2061 3.4981 1.076 2.6282Q1.9459 1.7583 3.1592 1.588Q3.3264 1.5645 3.7304 1.5564Q3.8792 1.034 4.2726 0.6406Q4.7297 0.1836 5.3608 0.0567Q5.5694 0.0148 6.1678 0.0147ZM6.1678 1.2148Q5.6889 1.2148 5.5973 1.2332Q4.9877 1.3557 4.8651 1.9653Q4.8467 2.0569 4.8467 2.5359L4.8467 2.5762Q4.8651 2.5762 4.8871 2.5762L7.7047 2.5762Q7.7267 2.5762 7.745 2.5762L7.7451 2.5359Q7.7451 2.0569 7.7267 1.9653Q7.6041 1.3557 6.9945 1.2332Q6.9029 1.2148 6.424 1.2148L6.1678 1.2148ZM3.7345 5.9674L8.8575 5.9674L8.8575 7.1674L3.7345 7.1674L3.7345 5.9674ZM8.8575 9.0411L3.7345 9.0411L3.7345 10.2411L8.8575 10.2411L8.8575 9.0411Z"
		})
	}));
	PlanToolIconRaw.displayName = "PlanToolIconRaw";
	PlanToolIcon = createIcon(PlanToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SearchToolIcon.tsx
var import_react$9, import_jsx_runtime$9, SearchToolIconRaw, SearchToolIcon;
var init_SearchToolIcon = __esmMin((() => {
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$9 = require_jsx_runtime();
	SearchToolIconRaw = (0, import_react$9.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.760723 0.760718)",
			d: "M1.2982 9.8292Q2.0082 10.8318 3.0451 11.4517Q4.0682 12.0942 5.2839 12.2716Q7.1954 12.5983 9.0086 11.6744L8.4638 10.6052Q7.3737 11.1607 6.2393 11.1534L6.2393 11.1393Q5.8444 11.1393 5.472 11.085Q5.1009 11.0215 4.7251 10.8994Q4.1553 10.7143 3.6735 10.4263Q3.1981 10.1277 2.7745 9.7041Q2.4951 9.4247 2.2701 9.1228Q2.0526 8.8157 1.8734 8.4638Q1.6014 7.9301 1.4643 7.3857Q1.3393 6.8384 1.3393 6.2393Q1.3393 5.8444 1.3936 5.472Q1.457 5.1009 1.5791 4.7251Q1.7642 4.1553 2.0523 3.6735Q2.3508 3.1981 2.7745 2.7745Q3.0538 2.4951 3.3557 2.2701Q3.6629 2.0526 4.0147 1.8734Q4.5485 1.6014 5.0929 1.4643Q5.6402 1.3393 6.2393 1.3393Q6.6342 1.3393 7.0066 1.3936Q7.3777 1.457 7.7535 1.5791Q8.3232 1.7642 8.8051 2.0523Q9.2805 2.3509 9.7041 2.7745Q9.9835 3.0538 10.2085 3.3557Q10.4259 3.6629 10.6052 4.0147L10.6178 4.0083Q11.1393 5.0158 11.1393 6.2393Q11.1393 7.7672 10.2749 9.0193Q10.2313 9.0825 10.1522 9.1951Q9.731 9.7952 9.7337 10.1287Q9.7364 10.4738 9.9827 10.7974Q10.0908 10.9394 10.4112 11.2597L13.815 14.6635L14.6635 13.815L11.2597 10.4112Q11.0574 10.2089 10.9758 10.1163Q11.0285 10.0355 11.1344 9.8846Q11.2162 9.7681 11.2624 9.7011Q12.3393 8.1412 12.3393 6.2393Q12.3393 4.2043 11.1804 2.6494Q10.4704 1.6467 9.4334 1.0269Q8.4104 0.3843 7.1947 0.2069Q5.9837 0 4.8122 0.2949Q3.6345 0.564 2.6494 1.2982Q1.6467 2.0082 1.0269 3.0451Q0.3843 4.0682 0.2069 5.2839Q0 6.4949 0.2949 7.6664Q0.564 8.8441 1.2982 9.8292Z"
		})
	}));
	SearchToolIconRaw.displayName = "SearchToolIconRaw";
	SearchToolIcon = createIcon(SearchToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SkillToolIcon.tsx
var import_react$8, import_jsx_runtime$8, SkillToolIconRaw, SkillToolIcon;
var init_SkillToolIcon = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$8 = require_jsx_runtime();
	SkillToolIconRaw = (0, import_react$8.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.485779 0.117911)",
			d: "M4.6063 4.6987Q4.7494 4.7505 4.8255 4.7783Q5.7193 5.1048 6.5463 5.5015L0.59 11.4578Q0 12.0478 0 12.8821Q0 13.7164 0.59 14.3064Q1.1799 14.8963 2.0142 14.8963Q2.8485 14.8963 3.4385 14.3064L8.8444 8.9005L7.9958 8.052L2.59 13.4578Q2.3515 13.6963 2.0142 13.6963Q1.677 13.6963 1.4385 13.4578Q1.2 13.2193 1.2 12.8821Q1.2 12.5448 1.4385 12.3064L7.6601 6.0847Q8.8609 6.7696 9.9038 7.6204Q12.3371 9.6056 13.2462 12.0051Q13.3286 12.2429 13.5609 12.3395Q13.7872 12.4495 14.0199 12.3536Q14.194 12.2902 14.2984 12.1372Q14.4068 11.987 14.4072 11.8017Q14.459 8.4358 12.2057 5.3174Q9.969 2.2218 6.2641 0.4907Q5.6636 0.2101 5.415 0.1409Q4.9087 0 4.4826 0.1859Q4.1015 0.3522 3.8452 0.7962Q3.7204 1.0124 3.4651 1.6298L3.4638 1.633L3.4222 1.7337Q3.4095 1.7643 3.3849 1.8238Q3.1054 2.4987 3.0381 2.7676Q2.8998 3.3203 3.1034 3.7425Q3.2831 4.1152 3.7555 4.3571Q3.9811 4.4726 4.6063 4.6987ZM10.6624 6.6906Q8.315 4.7755 5.2372 3.6511Q5.1593 3.6227 5.0145 3.5703Q4.2127 3.2802 4.1843 3.2213Q4.1416 3.1328 4.4936 2.2829Q4.5183 2.2232 4.5311 2.1922L4.5728 2.0915L4.5741 2.0883Q4.8934 1.3159 4.9625 1.2858Q5.0496 1.2478 5.7561 1.5779Q9.1787 3.1771 11.233 6.0201Q12.1806 7.3316 12.6737 8.6809Q11.8234 7.6378 10.6624 6.6906ZM10.0312 10.5647C9.9585 10.3032 9.5796 10.3284 9.4539 10.6029L8.8284 11.9696C8.7889 12.0557 8.7157 12.1262 8.6286 12.163L7.2451 12.7441C6.9676 12.861 6.9301 13.2405 7.1879 13.3222L8.473 13.7281C8.5541 13.7537 8.6138 13.8161 8.6366 13.8983L8.998 15.1995C9.0706 15.461 9.4496 15.4358 9.5753 15.1612L10.2008 13.7945C10.2404 13.7084 10.3135 13.6379 10.4006 13.6012L11.7831 13.0201C12.0609 12.9032 12.0984 12.5235 11.8403 12.442L10.5562 12.0361C10.4752 12.0105 10.4155 11.9488 10.3926 11.8669L10.0312 10.5647Z"
		})
	}));
	SkillToolIconRaw.displayName = "SkillToolIconRaw";
	SkillToolIcon = createIcon(SkillToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/SuccessToolIcon.tsx
var import_react$7, import_jsx_runtime$7, SuccessToolIconRaw, SuccessToolIcon;
var init_SuccessToolIcon = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$7 = require_jsx_runtime();
	SuccessToolIconRaw = (0, import_react$7.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "6",
			stroke: "var(--wb-status-success)",
			strokeWidth: "1.2"
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("path", {
			d: "M5 8l2 2 4-4",
			stroke: "var(--wb-status-success)",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	}));
	SuccessToolIconRaw.displayName = "SuccessToolIconRaw";
	SuccessToolIcon = createIcon(SuccessToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/TerminalToolIcon.tsx
var import_react$6, import_jsx_runtime$6, TerminalToolIconRaw, TerminalToolIcon;
var init_TerminalToolIcon = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$6 = require_jsx_runtime();
	TerminalToolIconRaw = (0, import_react$6.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				fill: "currentColor",
				fillRule: "evenodd",
				transform: "matrix(1 0 0 1 1 1)",
				d: "M0.1942 3.7746C0 4.463 0 5.3087 0 7C0 8.6913 0 9.537 0.1942 10.2254C0.6821 11.9551 2.0449 13.3179 3.7746 13.8058C4.463 14 5.3087 14 7 14C8.6913 14 9.537 14 10.2254 13.8058C11.9551 13.3179 13.3179 11.9551 13.8058 10.2254C14 9.537 14 8.6913 14 7C14 5.3087 14 4.463 13.8058 3.7746C13.3179 2.0449 11.9551 0.6821 10.2254 0.1942C9.537 0 8.6913 0 7 0C5.3087 0 4.463 0 3.7746 0.1942C2.0449 0.6821 0.6821 2.0449 0.1942 3.7746ZM1.438 9.8746Q1.2923 9.3582 1.2923 7Q1.2923 4.6418 1.438 4.1254Q1.7123 3.1527 2.4325 2.4325Q3.1527 1.7123 4.1254 1.438Q4.6418 1.2923 7 1.2923Q9.3582 1.2923 9.8746 1.438Q10.8473 1.7123 11.5675 2.4325Q12.2877 3.1527 12.562 4.1254Q12.7077 4.6418 12.7077 7Q12.7077 9.3582 12.562 9.8746Q12.2877 10.8473 11.5675 11.5675Q10.8473 12.2877 9.8746 12.562Q9.3582 12.7077 7 12.7077Q4.6418 12.7077 4.1254 12.562Q3.1527 12.2877 2.4325 11.5675Q1.7123 10.8473 1.438 9.8746Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("path", {
				fill: "currentColor",
				fillRule: "evenodd",
				transform: "matrix(1 0 0 1 4.54077 5.49414)",
				d: "M1.0062 2.5573L-0.435 4.074L0.435 4.9006L1.8761 3.3839Q2.3084 2.9288 2.316 2.3012Q2.3237 1.6736 1.9025 1.2082L0.4449 -0.4026L-0.4449 0.4026L1.0128 2.0134Q1.2616 2.2884 1.0062 2.5573Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("rect", {
				fill: "currentColor",
				transform: "matrix(1 0 0 1 7.47461 9.78662)",
				y: -.6,
				width: 3.9841,
				height: 1.2
			})
		]
	}));
	TerminalToolIconRaw.displayName = "TerminalToolIconRaw";
	TerminalToolIcon = createIcon(TerminalToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ToolDefaultIcon.tsx
var import_react$5, import_jsx_runtime$5, ToolDefaultIconRaw, ToolDefaultIcon;
var init_ToolDefaultIcon = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$5 = require_jsx_runtime();
	ToolDefaultIconRaw = (0, import_react$5.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.749756 0.80127)",
			d: "M2.9742 -0.1497Q4.7809 -0.8846 6.7846 -0.5826Q8.9271 -0.2598 10.3195 1.1327Q11.4886 2.3017 11.9529 3.8781Q12.4023 5.4037 12.0956 6.9671Q12.0432 7.2343 12.196 7.383L14.7029 9.8217L15.1796 10.2854L14.2522 11.2387L13.7756 10.775L11.2686 8.3363Q10.5994 7.6853 10.7905 6.7111Q11.0345 5.4672 10.6771 4.2539Q10.3085 3.0026 9.3791 2.0731Q8.2961 0.9901 6.5865 0.7325Q4.9438 0.485 3.4752 1.0823L2.8592 1.3328L2.3582 0.1008L2.9742 -0.1497ZM7.4176 12.1607L9.9379 14.6129L10.4145 15.0766L11.342 14.1234L10.8654 13.6596L8.3451 11.2075Q7.6955 10.5755 6.7505 10.764Q5.5032 11.0129 4.2851 10.6562Q3.0289 10.2884 2.0963 9.3559Q1.0092 8.2687 0.7389 6.5366Q0.5637 5.4143 0.775 4.3859L2.7244 6.2659Q3.4782 6.9928 4.5252 6.9833Q5.5723 6.9738 6.3128 6.2334Q7.0596 5.4866 7.0628 4.4305Q7.0661 3.3745 6.3239 2.6231L5.6828 1.974L5.2155 1.5009L4.2693 2.4355L4.7366 2.9087L5.3777 3.5577Q5.7344 3.9189 5.7328 4.4264Q5.7313 4.934 5.3723 5.2929Q5.0165 5.6488 4.5132 5.6534Q4.0099 5.6579 3.6477 5.3086L0.9185 2.6765Q0.8727 2.6323 0.8195 2.5977Q0.7662 2.5631 0.7074 2.5392Q0.4521 2.4267 0.1984 2.5424Q-0.0616 2.6433 -0.1592 2.9046Q-0.8927 4.7079 -0.5752 6.7417Q-0.238 8.9024 1.1559 10.2963Q2.3289 11.4693 3.9114 11.9326Q5.443 12.3811 7.0107 12.0683Q7.2696 12.0167 7.4176 12.1607Z"
		})
	}));
	ToolDefaultIconRaw.displayName = "ToolDefaultIconRaw";
	ToolDefaultIcon = createIcon(ToolDefaultIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ViewedToolIcon.tsx
var import_react$4, import_jsx_runtime$4, ViewedToolIconRaw, ViewedToolIcon;
var init_ViewedToolIcon = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$4 = require_jsx_runtime();
	ViewedToolIconRaw = (0, import_react$4.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 0.100567 1.1451)",
			d: "M7.7407 13.66Q10.4983 13.66 12.6655 11.7478Q14.8326 9.8356 15.4815 6.83Q15.4809 6.8274 15.4803 6.8247Q15.4798 6.8221 15.4792 6.8194L14.2476 6.8194Q14.2489 6.8247 14.2502 6.83Q13.6517 9.2773 11.8715 10.848Q10.0446 12.46 7.7407 12.46Q5.4369 12.46 3.61 10.848Q1.8298 9.2773 1.2312 6.83Q1.8298 4.3827 3.61 2.812Q5.4369 1.2 7.7407 1.2Q10.0446 1.2 11.8715 2.812Q13.1087 3.9036 13.7751 5.4186L15.0632 5.4186Q14.1228 2.9534 12.1272 1.4767Q10.1316 0 7.7407 0Q4.9832 0 2.816 1.9122Q0.6488 3.8244 0 6.83Q0.6488 9.8356 2.816 11.7478Q4.9832 13.66 7.7407 13.66ZM11.0757 6.8301Q11.0757 5.4487 10.0989 4.4719Q9.1221 3.4951 7.7407 3.4951Q6.3593 3.4951 5.3825 4.4719Q4.4057 5.4487 4.4057 6.8301Q4.4057 8.2115 5.3825 9.1883Q6.3593 10.1651 7.7407 10.1651Q9.1221 10.1651 10.0989 9.1883Q11.0757 8.2115 11.0757 6.8301ZM6.231 5.3204Q6.8564 4.6951 7.7407 4.6951Q8.6251 4.6951 9.2504 5.3204Q9.8757 5.9457 9.8757 6.8301Q9.8757 7.7144 9.2504 8.3398Q8.6251 8.9651 7.7407 8.9651Q6.8564 8.9651 6.231 8.3398Q5.6057 7.7144 5.6057 6.8301Q5.6057 5.9457 6.231 5.3204Z"
		})
	}));
	ViewedToolIconRaw.displayName = "ViewedToolIconRaw";
	ViewedToolIcon = createIcon(ViewedToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WarningOutlineIcon.tsx
var import_react$3, import_jsx_runtime$3, WarningOutlineIconRaw, WarningOutlineIcon;
var init_WarningOutlineIcon = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$3 = require_jsx_runtime();
	WarningOutlineIconRaw = (0, import_react$3.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
				d: "M6.86 2.572L1.215 12.002A1.333 1.333 0 002.355 14h11.29a1.333 1.333 0 001.14-2L9.14 2.572a1.333 1.333 0 00-2.28 0z",
				stroke: "currentColor",
				strokeWidth: "1.2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
				d: "M8 6v2.667",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
				d: "M8 11.333h.007",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	}));
	WarningOutlineIconRaw.displayName = "WarningOutlineIconRaw";
	WarningOutlineIcon = createIcon(WarningOutlineIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WarnToolIcon.tsx
var import_react$2, import_jsx_runtime$2, WarnToolIconRaw, WarnToolIcon;
var init_WarnToolIcon = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$2 = require_jsx_runtime();
	WarnToolIconRaw = (0, import_react$2.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M8 2L1.5 13h13L8 2z",
				stroke: "var(--wb-status-warning)",
				strokeWidth: "1.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
				d: "M8 6.5v3",
				stroke: "var(--wb-status-warning)",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
				cx: "8",
				cy: "11",
				r: "0.5",
				fill: "var(--wb-status-warning)"
			})
		]
	}));
	WarnToolIconRaw.displayName = "WarnToolIconRaw";
	WarnToolIcon = createIcon(WarnToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WebToolIcon.tsx
var import_react$1, import_jsx_runtime$1, WebToolIconRaw, WebToolIcon;
var init_WebToolIcon = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$1 = require_jsx_runtime();
	WebToolIconRaw = (0, import_react$1.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.666748 0.666687)",
			d: "M1.37 6.6667C1.6351 4.2684 3.3137 2.2961 5.5544 1.6014C4.6723 3.1032 4.1261 4.8264 4.0193 6.6667L1.37 6.6667ZM6.6615 0.0304C2.9263 0.3696 -0 3.5097 0 7.3333C0 11.1569 2.9263 14.297 6.6614 14.6363L6.6667 14.6429L6.9503 14.6568C6.9954 14.6592 7.0407 14.6611 7.0861 14.6626C7.1682 14.6653 7.2506 14.6667 7.3333 14.6667C7.4124 14.6667 7.4912 14.6654 7.5697 14.6629C7.6188 14.6614 7.6677 14.6593 7.7164 14.6568L8 14.6429L8.0052 14.6363C11.7404 14.297 14.6667 11.1569 14.6667 7.3333C14.6667 3.5097 11.7404 0.3696 8.0052 0.0304L7.9999 0.0238L7.7157 0.0098C7.6511 0.0065 7.5863 0.004 7.5213 0.0023C7.4588 0.0008 7.3962 0 7.3333 0C7.2701 0 7.207 0.0008 7.144 0.0024C7.0795 0.004 7.0151 0.0065 6.9509 0.0098L6.6667 0.0238L6.6615 0.0304ZM7.3341 1.3333C8.4648 2.8384 9.1803 4.6722 9.3115 6.6667L5.3552 6.6667C5.4864 4.6722 6.2019 2.8384 7.3326 1.3333C7.3328 1.3333 7.3331 1.3333 7.3333 1.3333C7.3336 1.3333 7.3338 1.3333 7.3341 1.3333ZM4.0193 8C4.1261 9.8403 4.6723 11.5634 5.5543 13.0652C3.3137 12.3706 1.6351 10.3983 1.37 8L4.0193 8ZM7.3325 13.3333C6.2019 11.8282 5.4864 9.9945 5.3552 8L9.3115 8C9.1803 9.9945 8.4648 11.8282 7.3341 13.3333C7.3339 13.3333 7.3336 13.3333 7.3333 13.3333C7.3331 13.3333 7.3328 13.3333 7.3325 13.3333ZM9.1123 13.0652C9.9944 11.5634 10.5406 9.8403 10.6474 8L13.2967 8C13.0316 10.3983 11.3529 12.3706 9.1123 13.0652ZM10.6474 6.6667C10.5405 4.8264 9.9943 3.1032 9.1123 1.6014C11.3529 2.2961 13.0316 4.2684 13.2967 6.6667L10.6474 6.6667Z"
		})
	}));
	WebToolIconRaw.displayName = "WebToolIconRaw";
	WebToolIcon = createIcon(WebToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/WidgetToolIcon.tsx
var import_react, import_jsx_runtime, WidgetToolIconRaw, WidgetToolIcon;
var init_WidgetToolIcon = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime = require_jsx_runtime();
	WidgetToolIconRaw = (0, import_react.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref,
		viewBox: "0 0 16 16",
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 5.50024 7.74072)",
			d: "M2.754 3.3116L5.7624 0.4336L4.9329 -0.4336L2.0093 2.3634L0.4243 0.7784L-0.4243 1.6269L1.2437 3.2949L1.2454 3.2966Q1.6519 3.7031 1.9944 3.7069Q2.3369 3.7107 2.7523 3.3133L2.754 3.3116Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			transform: "matrix(1 0 0 1 1.84521 2.0625)",
			d: "M0.6 3.779L0.6 6.0861L0.6 6.1681Q0.5999 8.5486 0.7043 9.3129Q0.842 10.3222 1.3029 10.7832Q1.7639 11.2441 2.7732 11.3819Q3.5375 11.4862 5.918 11.4861L6 11.4861L6.3001 11.4861L6.382 11.4861Q8.7626 11.4862 9.5269 11.3819Q10.5362 11.2441 10.9971 10.7832Q11.4581 10.3223 11.5958 9.313Q11.7002 8.5487 11.7001 6.1682L11.7001 6.0862L11.7002 5.4469L12.9002 5.447L12.9001 6.0863L12.9001 6.1682Q12.9002 8.6302 12.7848 9.4753Q12.5924 10.885 11.8456 11.6317Q11.0989 12.3785 9.6891 12.5709Q8.8441 12.6862 6.382 12.6861L6.3001 12.6861L6 12.6861L5.9181 12.6861Q3.456 12.6862 2.6109 12.5709Q1.2011 12.3784 0.4544 11.6317Q-0.2923 10.885 -0.4847 9.4752Q-0.6001 8.6301 -0.6 6.168L-0.6 6.0861L-0.6 3.179Q-0.6 2.9146 -0.596 2.8293Q-0.531 1.4398 0.4544 0.4545Q1.4399 -0.5309 2.8294 -0.5959Q2.9146 -0.5999 3.179 -0.5999L9.1213 -0.5998Q9.3856 -0.5998 9.4707 -0.5958Q10.8602 -0.5307 11.8456 0.4547Q12.831 1.4401 12.896 2.8296Q12.9 2.9147 12.9 3.179L12.9 3.779L12.3 3.779L0.6 3.779ZM0.6351 2.579L11.6649 2.579Q11.5424 1.8486 10.9971 1.3032Q10.3401 0.6462 9.4146 0.6029Q9.3575 0.6002 9.1213 0.6003L3.179 0.6001Q2.9426 0.6001 2.8855 0.6028Q1.9599 0.6461 1.303 1.303Q0.7575 1.8484 0.6351 2.579Z"
		})]
	}));
	WidgetToolIconRaw.displayName = "WidgetToolIconRaw";
	WidgetToolIcon = createIcon(WidgetToolIconRaw);
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/index.ts
var icons_exports = /* @__PURE__ */ __exportAll({
	AddCircleIcon: () => AddCircleIcon,
	AddConversationIcon: () => AddConversationIcon,
	AddIcon: () => AddIcon,
	AgentMailBrandIcon: () => AgentMailBrandIcon,
	AgentMailIcon: () => AgentMailIcon,
	AgentToolIcon: () => AgentToolIcon,
	AlarmClockIcon: () => AlarmClockIcon,
	ArchiveIcon: () => ArchiveIcon,
	ArchivedIcon: () => ArchivedIcon,
	ArrowToolIcon: () => ArrowToolIcon,
	ArrowUpIcon: () => ArrowUpIcon,
	ArrowUpRightIcon: () => ArrowUpRightIcon,
	ArtifactAudioLineColorIcon: () => ArtifactAudioLineColorIcon,
	ArtifactAudioLineMonoIcon: () => ArtifactAudioLineMonoIcon,
	ArtifactAudioSolidIcon: () => ArtifactAudioSolidIcon,
	ArtifactCodeSolidIcon: () => ArtifactCodeSolidIcon,
	ArtifactDocLineColorIcon: () => ArtifactDocLineColorIcon,
	ArtifactDocLineMonoIcon: () => ArtifactDocLineMonoIcon,
	ArtifactDocSolidIcon: () => ArtifactDocSolidIcon,
	ArtifactDrawioLineColorIcon: () => ArtifactDrawioLineColorIcon,
	ArtifactDrawioLineMonoIcon: () => ArtifactDrawioLineMonoIcon,
	ArtifactDrawioSolidIcon: () => ArtifactDrawioSolidIcon,
	ArtifactFileTypeIcon: () => ArtifactFileTypeIcon,
	ArtifactFolderLineColorIcon: () => ArtifactFolderLineColorIcon,
	ArtifactFolderLineMonoIcon: () => ArtifactFolderLineMonoIcon,
	ArtifactFolderSolidIcon: () => ArtifactFolderSolidIcon,
	ArtifactHtmlLineColorIcon: () => ArtifactHtmlLineColorIcon,
	ArtifactHtmlLineMonoIcon: () => ArtifactHtmlLineMonoIcon,
	ArtifactHtmlSolidIcon: () => ArtifactHtmlSolidIcon,
	ArtifactImageLineColorIcon: () => ArtifactImageLineColorIcon,
	ArtifactImageLineMonoIcon: () => ArtifactImageLineMonoIcon,
	ArtifactImageSolidIcon: () => ArtifactImageSolidIcon,
	ArtifactMarkdownLineColorIcon: () => ArtifactMarkdownLineColorIcon,
	ArtifactMarkdownLineMonoIcon: () => ArtifactMarkdownLineMonoIcon,
	ArtifactMarkdownSolidIcon: () => ArtifactMarkdownSolidIcon,
	ArtifactPdfLineColorIcon: () => ArtifactPdfLineColorIcon,
	ArtifactPdfLineMonoIcon: () => ArtifactPdfLineMonoIcon,
	ArtifactPdfSolidIcon: () => ArtifactPdfSolidIcon,
	ArtifactSheetLineColorIcon: () => ArtifactSheetLineColorIcon,
	ArtifactSheetLineMonoIcon: () => ArtifactSheetLineMonoIcon,
	ArtifactSheetSolidIcon: () => ArtifactSheetSolidIcon,
	ArtifactSlideLineColorIcon: () => ArtifactSlideLineColorIcon,
	ArtifactSlideLineMonoIcon: () => ArtifactSlideLineMonoIcon,
	ArtifactSlideSolidIcon: () => ArtifactSlideSolidIcon,
	ArtifactUnknownLineColorIcon: () => ArtifactUnknownLineColorIcon,
	ArtifactUnknownLineMonoIcon: () => ArtifactUnknownLineMonoIcon,
	ArtifactUnknownSolidIcon: () => ArtifactUnknownSolidIcon,
	ArtifactVideoLineColorIcon: () => ArtifactVideoLineColorIcon,
	ArtifactVideoLineMonoIcon: () => ArtifactVideoLineMonoIcon,
	ArtifactVideoSolidIcon: () => ArtifactVideoSolidIcon,
	AssistantFilledIcon: () => AssistantFilledIcon,
	AssistantIcon: () => AssistantIcon,
	AssistantSpinnerIcon: () => AssistantSpinnerIcon,
	AtmAddFromTemplateIcon: () => AtmAddFromTemplateIcon,
	AtmBatchManageIcon: () => AtmBatchManageIcon,
	AutomationEmptyAlarmIcon: () => AutomationEmptyAlarmIcon,
	AutomationEmptyRecordsIcon: () => AutomationEmptyRecordsIcon,
	BatchOperationIcon: () => BatchOperationIcon,
	BellIcon: () => BellIcon,
	BriefcaseIcon: () => BriefcaseIcon,
	BubbleCheckIcon: () => BubbleCheckIcon,
	BuildingIcon: () => BuildingIcon,
	CableIcon: () => CableIcon,
	CalendarDaysIcon: () => CalendarDaysIcon,
	ChatBubbleIcon: () => ChatBubbleIcon,
	CheckBoldIcon: () => CheckBoldIcon,
	CheckCircleToolIcon: () => CheckCircleToolIcon,
	CheckIcon: () => CheckIcon,
	CheckinBubbleIcon: () => CheckinBubbleIcon,
	ChevronDownIcon: () => ChevronDownIcon,
	ChevronLeftIcon: () => ChevronLeftIcon,
	ChevronRightIcon: () => ChevronRightIcon,
	ChevronsDownUpIcon: () => ChevronsDownUpIcon,
	ChevronsUpDownIcon: () => ChevronsUpDownIcon,
	CirclePauseIcon: () => CirclePauseIcon,
	CirclePlayIcon: () => CirclePlayIcon,
	CircleXIcon: () => CircleXIcon,
	ClawIcon: () => ClawIcon,
	ClawIconV2: () => ClawIconV2,
	ClockIcon: () => ClockIcon,
	ClockIconV2: () => ClockIconV2,
	CloudToolIcon: () => CloudToolIcon,
	CnbIcon: () => CnbIcon,
	ConfigureIcon: () => ConfigureIcon,
	ConnectorButtonIcon: () => ConnectorButtonIcon,
	ConnectorTabIcon: () => ConnectorTabIcon,
	DatabaseToolIcon: () => DatabaseToolIcon,
	DateIcon: () => DateIcon,
	DebugToolIcon: () => DebugToolIcon,
	DeleteIcon: () => DeleteIcon,
	DeleteToolIcon: () => DeleteToolIcon,
	DiscoverIcon: () => DiscoverIcon,
	DownloadIcon: () => DownloadIcon,
	DownloadTrayIcon: () => DownloadTrayIcon,
	EditToolIcon: () => EditToolIcon,
	EditorIcon: () => EditorIcon,
	ErrorCircleIcon: () => ErrorCircleIcon,
	ExpertFilledIcon: () => ExpertFilledIcon,
	ExpertIcon: () => ExpertIcon,
	ExpertIconV2: () => ExpertIconV2,
	ExpertTabIcon: () => ExpertTabIcon,
	FailedIcon: () => FailedIcon,
	FigmaIcon: () => FigmaIcon,
	FileTextIcon: () => FileTextIcon,
	FolderDownloadIcon: () => FolderDownloadIcon,
	FolderIcon: () => FolderIcon,
	FolderOpenIcon: () => FolderOpenIcon,
	FolderToolIcon: () => FolderToolIcon,
	GanttIcon: () => GanttIcon,
	GemRewardIcon: () => GemRewardIcon,
	GithubIcon: () => GithubIcon,
	GlobeIcon: () => GlobeIcon,
	GongfengIcon: () => GongfengIcon,
	HelpCircleIcon: () => HelpCircleIcon,
	ImaKnowledgeIcon: () => ImaKnowledgeIcon,
	ImaKnowledgeIcon0509: () => ImaKnowledgeIcon0509,
	ImaSourceIcon: () => ImaSourceIcon,
	ImageToolIcon: () => ImageToolIcon,
	InspirationIcon: () => InspirationIcon,
	InstalledSkillIcon: () => InstalledSkillIcon,
	LayoutGridIcon: () => LayoutGridIcon,
	LibraryIcon: () => LibraryIcon,
	LinkIcon: () => LinkIcon,
	ListIcon: () => ListIcon,
	LoaderIcon: () => LoaderIcon,
	LoadingIcon: () => LoadingIcon,
	LoadingToolIcon: () => LoadingToolIcon,
	LocationIcon: () => LocationIcon,
	MailIcon: () => MailIcon,
	McpIcon: () => McpIcon,
	MemoryIcon: () => MemoryIcon,
	MoonIcon: () => MoonIcon,
	MoreDotsIcon: () => MoreDotsIcon,
	MoreIcon: () => MoreIcon,
	MoreIconV2: () => MoreIconV2,
	MoreMenuImaKnowledgeIcon: () => MoreMenuImaKnowledgeIcon,
	MoreMenuInspirationIcon: () => MoreMenuInspirationIcon,
	MoreMenuTencentDocsIcon: () => MoreMenuTencentDocsIcon,
	MoreMenuTencentLexiangIcon: () => MoreMenuTencentLexiangIcon,
	MoreVerticalIcon: () => MoreVerticalIcon,
	MyExpertIcon: () => MyExpertIcon,
	MyFilesIconV2: () => MyFilesIconV2,
	NewChatIcon: () => NewChatIcon,
	NewTaskIcon: () => NewTaskIcon,
	NewTaskIconV2: () => NewTaskIconV2,
	OpenExternalIcon: () => OpenExternalIcon,
	PanelIcon: () => PanelIcon,
	PendingIcon: () => PendingIcon,
	PhoneIcon: () => PhoneIcon,
	PinFilledIcon: () => PinFilledIcon,
	PinTopIcon: () => PinIcon,
	PlanInProgressStatusIcon: () => PlanInProgressStatusIcon,
	PlanPendingStatusIcon: () => PlanPendingStatusIcon,
	PlanToolIcon: () => PlanToolIcon,
	PlaneIcon: () => PlaneIcon,
	PlayIcon: () => PlayIcon,
	PluginsIcon: () => PluginsIcon,
	PreviewMaximizeIcon: () => PreviewMaximizeIcon,
	PreviewPanelToggleIcon: () => PreviewPanelToggleIcon,
	ProjectFilledIcon: () => ProjectFilledIcon,
	ProjectFilledIconV2: () => ProjectFilledIconV2,
	ProjectIcon: () => ProjectIcon,
	ProjectIconV2: () => ProjectIconV2,
	QQIcon: () => QQIcon,
	RefreshCwIcon: () => RefreshCwIcon,
	RepoConnectIcon: () => RepoConnectIcon,
	RepoIcon: () => RepoIcon,
	ResumeCircleIcon: () => ResumeCircleIcon,
	RunningCheckIcon: () => RunningCheckIcon,
	RunningStatusIcon: () => RunningStatusIcon,
	SaveIcon: () => SaveIcon,
	SearchIcon: () => SearchIcon,
	SearchToolIcon: () => SearchToolIcon,
	SendPlaneIcon: () => SendPlaneIcon,
	SettingsIcon: () => SettingsIcon,
	ShareIcon: () => ShareIcon,
	ShieldAlertIcon: () => ShieldAlertIcon,
	ShieldCheckIcon: () => ShieldCheckIcon,
	SidebarCollapseIcon: () => SidebarCollapseIcon,
	SidebarExpandIcon: () => SidebarExpandIcon,
	SkillIcon: () => SkillIcon,
	SkillTabIcon: () => SkillTabIcon,
	SkillToolIcon: () => SkillToolIcon,
	SparklesIcon: () => SparklesIcon,
	StatusIcon: () => StatusIcon,
	SubRepoIcon: () => SubRepoIcon,
	SuccessToolIcon: () => SuccessToolIcon,
	SummonIcon: () => SummonIcon,
	SunIcon: () => SunIcon,
	TableIcon: () => TableIcon,
	TaskBubbleIcon: () => TaskBubbleIcon,
	TaskFilterIcon: () => TaskFilterIcon,
	TaskListIcon: () => TaskListIcon,
	TemplateAlarmClockIcon: () => TemplateAlarmClockIcon,
	TemplateCalendarIcon: () => TemplateCalendarIcon,
	TemplateFilmIcon: () => TemplateFilmIcon,
	TemplateHospitalIcon: () => TemplateHospitalIcon,
	TemplateImageIcon: () => TemplateImageIcon,
	TemplateLanguagesIcon: () => TemplateLanguagesIcon,
	TemplateLightbulbIcon: () => TemplateLightbulbIcon,
	TemplateListTodoIcon: () => TemplateListTodoIcon,
	TemplateMessagesSquareIcon: () => TemplateMessagesSquareIcon,
	TemplateMoonIcon: () => TemplateMoonIcon,
	TemplateNewsIcon: () => TemplateNewsIcon,
	TemplateWeeklyReportIcon: () => TemplateWeeklyReportIcon,
	TencentDocsBrandIcon: () => TencentDocsBrandIcon,
	TencentDocsIcon: () => TencentDocsIcon,
	TencentDocsIcon0509: () => TencentDocsIcon0509,
	TencentDocsSourceIcon: () => TencentDocsSourceIcon,
	TencentLexiangColorIcon: () => TencentLexiangColorIcon,
	TencentLexiangIcon: () => TencentLexiangIcon,
	TencentLexiangIcon0509: () => TencentLexiangIcon0509,
	TencentLexiangSourceIcon: () => TencentLexiangSourceIcon,
	TerminalToolIcon: () => TerminalToolIcon,
	ToolDefaultIcon: () => ToolDefaultIcon,
	UnpinTopIcon: () => UnpinIcon,
	UserIcon: () => UserIcon,
	UserPromptListIcon: () => UserPromptListIcon,
	UsersIcon: () => UsersIcon,
	ViewedToolIcon: () => ViewedToolIcon,
	WarnToolIcon: () => WarnToolIcon,
	WarningOutlineIcon: () => WarningOutlineIcon,
	WbFileAudioIcon: () => WbFileAudioIcon,
	WbFileDiagramIcon: () => WbFileDiagramIcon,
	WbFileDocIcon: () => WbFileDocIcon,
	WbFileFolderIcon: () => WbFileFolderIcon,
	WbFileHtmlIcon: () => WbFileHtmlIcon,
	WbFileImageIcon: () => WbFileImageIcon,
	WbFileMarkdownIcon: () => WbFileMarkdownIcon,
	WbFilePdfIcon: () => WbFilePdfIcon,
	WbFileSheetIcon: () => WbFileSheetIcon,
	WbFileSlideIcon: () => WbFileSlideIcon,
	WbFileTxtIcon: () => WbFileTxtIcon,
	WbFileUnknownIcon: () => WbFileUnknownIcon,
	WbFileVideoIcon: () => WbFileVideoIcon,
	WbFolderIcon: () => WbFolderIcon,
	WbPinIcon: () => WbPinIcon,
	WbSettingsIcon: () => WbSettingsIcon,
	WbUnpinIcon: () => WbUnpinIcon,
	WebToolIcon: () => WebToolIcon,
	WidgetToolIcon: () => WidgetToolIcon,
	XCloseIcon: () => XCloseIcon,
	getArtifactFileIconKind: () => getArtifactFileIconKind
});
var init_icons = __esmMin((() => {
	init_AddCircleIcon();
	init_AddConversationIcon();
	init_AddIcon();
	init_AtmAddFromTemplateIcon();
	init_AtmBatchManageIcon();
	init_AgentMailBrandIcon();
	init_AgentMailIcon();
	init_AlarmClockIcon();
	init_ArchivedIcon();
	init_ArchiveIcon();
	init_ArtifactFileTypeIcon();
	init_artifact_file_icons();
	init_AutomationEmptyAlarmIcon();
	init_AutomationEmptyRecordsIcon();
	init_ArrowUpIcon();
	init_ArrowUpRightIcon();
	init_AssistantFilledIcon();
	init_AssistantIcon();
	init_AssistantSpinnerIcon();
	init_BatchOperationIcon();
	init_BellIcon();
	init_BriefcaseIcon();
	init_BubbleCheckIcon();
	init_BuildingIcon();
	init_CableIcon();
	init_CalendarDaysIcon();
	init_ChatBubbleIcon();
	init_CheckBoldIcon();
	init_CheckIcon();
	init_CheckinBubbleIcon();
	init_ChevronDownIcon();
	init_ChevronLeftIcon();
	init_ChevronRightIcon();
	init_ChevronsDownUpIcon();
	init_ChevronsUpDownIcon();
	init_CirclePauseIcon();
	init_CirclePlayIcon();
	init_CircleXIcon();
	init_ClawIcon();
	init_ClawIconV2();
	init_ClockIcon();
	init_ClockIconV2();
	init_CnbIcon();
	init_ConfigureIcon();
	init_ConnectorButtonIcon();
	init_ConnectorTabIcon();
	init_DateIcon();
	init_DeleteIcon();
	init_DiscoverIcon();
	init_DownloadIcon();
	init_DownloadTrayIcon();
	init_EditorIcon();
	init_ErrorCircleIcon();
	init_ExpertFilledIcon();
	init_ExpertIcon();
	init_ExpertIconV2();
	init_ExpertTabIcon();
	init_FailedIcon();
	init_FigmaIcon();
	init_FileTextIcon();
	init_FilterIcon();
	init_FolderDownloadIcon();
	init_FolderIcon();
	init_FolderOpenIcon();
	init_GanttIcon();
	init_GemRewardIcon();
	init_GithubIcon();
	init_GlobeIcon();
	init_GongfengIcon();
	init_HelpCircleIcon();
	init_ImaKnowledgeIcon();
	init_ImaKnowledgeIcon0509();
	init_ImaSourceIcon();
	init_InspirationIcon();
	init_InstalledSkillIcon();
	init_LayoutGridIcon();
	init_LibraryIcon();
	init_LinkIcon();
	init_ListIcon();
	init_LocationIcon();
	init_LoaderIcon();
	init_LoadingIcon();
	init_MailIcon();
	init_McpIcon();
	init_MemoryIcon();
	init_MoonIcon();
	init_MoreDotsIcon();
	init_MoreIcon();
	init_MoreIconV2();
	init_MoreMenuImaKnowledgeIcon();
	init_MoreMenuInspirationIcon();
	init_MoreMenuTencentDocsIcon();
	init_MoreMenuTencentLexiangIcon();
	init_MoreVerticalIcon();
	init_MyExpertIcon();
	init_MyFilesIconV2();
	init_NewChatIcon();
	init_NewTaskIcon();
	init_NewTaskIconV2();
	init_OpenExternalIcon();
	init_PanelIcon();
	init_PhoneIcon();
	init_PlaneIcon();
	init_PlanInProgressStatusIcon();
	init_PlanPendingStatusIcon();
	init_PreviewMaximizeIcon();
	init_PreviewPanelToggleIcon();
	init_PendingIcon();
	init_PinFilledIcon();
	init_PinTopIcon();
	init_PlayIcon();
	init_PluginsIcon();
	init_ProjectIcon();
	init_QQIcon();
	init_ProjectIconV2();
	init_ProjectFilledIcon();
	init_RefreshCwIcon();
	init_RepoConnectIcon();
	init_RepoIcon();
	init_ResumeCircleIcon();
	init_RunningCheckIcon();
	init_RunningStatusIcon();
	init_SaveIcon();
	init_SearchIcon();
	init_SendPlaneIcon();
	init_SettingsIcon();
	init_ShareIcon();
	init_ShieldCheckIcon();
	init_ShieldAlertIcon();
	init_SidebarToggleIcon();
	init_SkillIcon();
	init_SkillTabIcon();
	init_SparklesIcon();
	init_StatusIcon();
	init_SubRepoIcon();
	init_SunIcon();
	init_TableIcon();
	init_TaskBubbleIcon();
	init_TaskListIcon();
	init_TemplateAlarmClockIcon();
	init_TemplateCalendarIcon();
	init_TemplateFilmIcon();
	init_TemplateHospitalIcon();
	init_TemplateImageIcon();
	init_TemplateLanguagesIcon();
	init_TemplateLightbulbIcon();
	init_TemplateListTodoIcon();
	init_TemplateMessagesSquareIcon();
	init_TemplateMoonIcon();
	init_TemplateNewsIcon();
	init_TemplateWeeklyReportIcon();
	init_TencentDocsBrandIcon();
	init_TencentDocsIcon();
	init_TencentDocsIcon0509();
	init_TencentDocsSourceIcon();
	init_TencentLexiangColorIcon();
	init_TencentLexiangIcon();
	init_TencentLexiangIcon0509();
	init_TencentLexiangSourceIcon();
	init_UnpinTopIcon();
	init_UserIcon();
	init_UserPromptListIcon();
	init_UsersIcon();
	init_WbFolderIcon();
	init_WbPinIcon();
	init_WbSettingsIcon();
	init_WbUnpinIcon();
	init_WbFileAudioIcon();
	init_WbFileDiagramIcon();
	init_WbFileDocIcon();
	init_WbFileFolderIcon();
	init_WbFileHtmlIcon();
	init_WbFileImageIcon();
	init_WbFileMarkdownIcon();
	init_WbFilePdfIcon();
	init_WbFileSheetIcon();
	init_WbFileSlideIcon();
	init_WbFileTxtIcon();
	init_WbFileUnknownIcon();
	init_WbFileVideoIcon();
	init_XCloseIcon();
	init_AgentToolIcon();
	init_ArrowToolIcon();
	init_CheckCircleToolIcon();
	init_CloudToolIcon();
	init_DatabaseToolIcon();
	init_DebugToolIcon();
	init_DeleteToolIcon();
	init_EditToolIcon();
	init_FolderToolIcon();
	init_ImageToolIcon();
	init_LoadingToolIcon();
	init_PlanToolIcon();
	init_SearchToolIcon();
	init_SkillToolIcon();
	init_SuccessToolIcon();
	init_TerminalToolIcon();
	init_ToolDefaultIcon();
	init_ViewedToolIcon();
	init_WarningOutlineIcon();
	init_WarnToolIcon();
	init_WebToolIcon();
	init_WidgetToolIcon();
}));
//#endregion
export { TencentLexiangIcon as $, init_ClawIconV2 as $n, init_MoreMenuTencentLexiangIcon as $t, WbFileSlideIcon as A, init_FilterIcon as An, AtmBatchManageIcon as Ar, init_RunningCheckIcon as At, init_WbUnpinIcon as B, ErrorCircleIcon as Bn, PhoneIcon as Bt, CheckCircleToolIcon as C, init_ImaKnowledgeIcon as Cn, init_ArtifactFileTypeIcon as Cr, SearchIcon as Ct, WbFileVideoIcon as D, init_FolderOpenIcon as Dn, init_AgentMailIcon as Dr, RunningStatusIcon as Dt, XCloseIcon as E, FolderOpenIcon as En, AgentMailIcon as Er, init_SaveIcon as Et, WbFileHtmlIcon as F, ExpertIconV2 as Fn, AddCircleIcon as Fr, ProjectFilledIconV2 as Ft, UserPromptListIcon as G, ConnectorTabIcon as Gn, init_NewTaskIconV2 as Gt, init_WbPinIcon as H, DownloadTrayIcon as Hn, init_PanelIcon as Ht, WbFileFolderIcon as I, init_ExpertIconV2 as In, Icon as Ir, ProjectIconV2 as It, user_avatar_default as J, init_ConfigureIcon as Jn, MyFilesIconV2 as Jt, init_UserPromptListIcon as K, init_ConnectorTabIcon as Kn, NewTaskIcon as Kt, WbFileDocIcon as L, init_ExpertFilledIcon as Ln, createIcon as Lr, init_ProjectIconV2 as Lt, WbFilePdfIcon as M, FailedIcon as Mn, AddIcon as Mr, init_ResumeCircleIcon as Mt, WbFileMarkdownIcon as N, ExpertTabIcon as Nn, init_AddIcon as Nr, RepoConnectIcon as Nt, WbFileUnknownIcon as O, FolderIcon as On, AgentMailBrandIcon as Or, init_RunningStatusIcon as Ot, WbFileImageIcon as P, init_ExpertTabIcon as Pn, AddConversationIcon as Pr, init_ProjectFilledIcon as Pt, init_TencentLexiangIcon0509 as Q, ClawIconV2 as Qn, MoreMenuTencentLexiangIcon as Qt, WbFileDiagramIcon as R, ExpertIcon as Rn, init_Icon as Rr, QQIcon as Rt, CloudToolIcon as S, ImaKnowledgeIcon as Sn, ArtifactFileTypeIcon as Sr, init_SendPlaneIcon as St, AgentToolIcon as T, GlobeIcon as Tn, init_ArchiveIcon as Tr, SaveIcon as Tt, WbFolderIcon as U, DeleteIcon as Un, OpenExternalIcon as Ut, WbPinIcon as V, init_ErrorCircleIcon as Vn, PanelIcon as Vt, init_WbFolderIcon as W, init_DeleteIcon as Wn, NewTaskIconV2 as Wt, init_TencentLexiangSourceIcon as X, init_ClockIconV2 as Xn, MyExpertIcon as Xt, TencentLexiangSourceIcon as Y, ClockIconV2 as Yn, init_MyFilesIconV2 as Yt, TencentLexiangIcon0509 as Z, init_ClockIcon as Zn, init_MyExpertIcon as Zt, FolderToolIcon as _, init_InspirationIcon as _n, ArrowUpRightIcon as _r, init_ShieldAlertIcon as _t, WarnToolIcon as a, init_MoreMenuImaKnowledgeIcon as an, init_ChevronDownIcon as ar, TencentDocsIcon as at, DebugToolIcon as b, ImaKnowledgeIcon0509 as bn, AutomationEmptyAlarmIcon as br, init_ShareIcon as bt, ViewedToolIcon as c, init_MoreIcon as cn, CheckBoldIcon as cr, init_TencentDocsBrandIcon as ct, SuccessToolIcon as d, MailIcon as dn, init_ChatBubbleIcon as dr, SparklesIcon as dt, MoreMenuTencentDocsIcon as en, init_ClawIcon as er, init_TencentLexiangIcon as et, SkillToolIcon as f, LoadingIcon as fn, BriefcaseIcon as fr, SkillTabIcon as ft, ImageToolIcon as g, LinkIcon as gn, AssistantIcon as gr, ShieldAlertIcon as gt, LoadingToolIcon as h, LocationIcon as hn, AssistantSpinnerIcon as hr, SidebarExpandIcon as ht, WebToolIcon as i, MoreMenuImaKnowledgeIcon as in, ChevronDownIcon as ir, init_TencentDocsIcon0509 as it, WbFileSheetIcon as j, FileTextIcon as jn, AtmAddFromTemplateIcon as jr, ResumeCircleIcon as jt, WbFileTxtIcon as k, TaskFilterIcon as kn, init_AgentMailBrandIcon as kr, RunningCheckIcon as kt, ToolDefaultIcon as l, MoreDotsIcon as ln, init_CheckBoldIcon as lr, TaskBubbleIcon as lt, PlanToolIcon as m, LoaderIcon as mn, init_BellIcon as mr, SidebarCollapseIcon as mt, init_icons as n, MoreMenuInspirationIcon as nn, ChevronRightIcon as nr, init_TencentDocsSourceIcon as nt, WarningOutlineIcon as o, MoreIconV2 as on, CheckIcon as or, init_TencentDocsIcon as ot, SearchToolIcon as p, init_LoadingIcon as pn, BellIcon as pr, init_SkillTabIcon as pt, init_user_avatar as q, ConfigureIcon as qn, init_NewTaskIcon as qt, WidgetToolIcon as r, init_MoreMenuInspirationIcon as rn, ChevronLeftIcon as rr, TencentDocsIcon0509 as rt, init_WarningOutlineIcon as s, init_MoreIconV2 as sn, init_CheckIcon as sr, TencentDocsBrandIcon as st, icons_exports as t, init_MoreMenuTencentDocsIcon as tn, ChevronsUpDownIcon as tr, TencentDocsSourceIcon as tt, TerminalToolIcon as u, MemoryIcon as un, ChatBubbleIcon as ur, init_TaskBubbleIcon as ut, EditToolIcon as v, ImaSourceIcon as vn, AutomationEmptyRecordsIcon as vr, ShieldCheckIcon as vt, ArrowToolIcon as w, HelpCircleIcon as wn, ArchiveIcon as wr, init_SearchIcon as wt, DatabaseToolIcon as x, init_ImaKnowledgeIcon0509 as xn, init_AutomationEmptyAlarmIcon as xr, SendPlaneIcon as xt, DeleteToolIcon as y, init_ImaSourceIcon as yn, init_AutomationEmptyRecordsIcon as yr, ShareIcon as yt, WbFileAudioIcon as z, init_ExpertIcon as zn, PlaneIcon as zt };
