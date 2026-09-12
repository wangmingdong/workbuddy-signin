import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
//#region ../../packages/conversation-render/src/shared/icons/agent/copilot-icon.tsx
var import_jsx_runtime, CopilotIcon;
//#endregion
__esmMin((() => {
	require_react();
	import_jsx_runtime = require_jsx_runtime();
	CopilotIcon = ({ className, style, id, ...rest }) => {
		const suffix = id || "default";
		const clipPathId = `cr-copilot-clip-${suffix}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			className,
			style,
			...rest,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				clipPath: `url(#${clipPathId})`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "24",
						height: "24",
						rx: "12",
						fill: "#4C4F6B"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M3.4689 11.0144C3.32344 11.2025 3.31607 11.4567 3.4345 12.0298C3.65883 13.0748 4.24029 14.4426 5.15579 16.0716L5.747 17.1172L5.72862 17.511C5.70544 17.9326 5.72848 18.5857 5.77921 19.0271C5.80994 19.2967 5.8055 19.3035 5.66483 19.4638C5.12042 20.0864 5.03916 21.1287 5.44787 22.2839C5.62456 22.7775 6.16958 23.6999 6.50726 24.0756C7.35392 25.0154 8.35051 25.4646 9.11147 25.246C9.25446 25.2051 9.28403 25.213 9.47117 25.3424C10.182 25.8233 11.3834 26.2377 12.4447 26.3663C14.2242 26.5843 16.2727 26.143 18.8281 24.9925C19.8948 24.5099 22.2541 23.1352 23.2513 22.4096C25.1083 21.0667 26.4805 19.6414 27.251 18.2635C27.9337 17.0364 28.2735 15.7781 28.2495 14.5174C28.2466 14.2525 28.2536 14.2359 28.3599 14.1746C28.8797 13.8703 29.1497 13.198 29.0927 12.3562C29.075 12.1165 29.0266 11.7946 28.9902 11.6448C28.7404 10.7144 28.0885 9.59971 27.4078 8.94729C26.6515 8.22182 25.7943 7.9129 25.1958 8.14598C25.0631 8.19758 25.0452 8.19542 24.9177 8.08995C24.6357 7.86124 23.9604 7.43473 23.5488 7.22673L23.1224 7.01477L22.8206 6.45595C22.0392 5.01609 20.7826 3.33003 19.8801 2.50992C19.4937 2.15818 19.2668 2.03929 19.019 2.05739C18.866 2.06657 18.8535 2.07379 18.645 2.26084C18.0389 2.79819 17.1889 4.41355 16.3588 6.60463L16.1271 7.21325L15.7053 7.34845C14.3909 7.76995 13.2238 8.30219 12.1896 8.94928C11.1973 9.56799 10.6591 9.97037 9.84886 10.688L9.36087 11.1197L9.13878 11.0813C7.00072 10.7039 5.07892 10.5639 4.19776 10.7186C3.84772 10.7832 3.55743 10.9008 3.4689 11.0144Z",
						fill: "#D2D3E0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "6.68555",
						y: "16.3788",
						width: "17.7918",
						height: "11.5605",
						rx: "4.61469",
						transform: "rotate(-30 6.68555 16.3788)",
						fill: "#212234"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("rect", {
						x: "12.2119",
						y: "17.2593",
						width: "2.13173",
						height: "4.42744",
						rx: "1.06587",
						transform: "rotate(-30 12.2119 17.2593)",
						fill: "#D2D3E0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "height",
								values: "4.42744;2.2;4.42744;4.42744;2.2;4.42744",
								dur: "0.6s",
								begin: `0s;blink1${suffix}.end+3s`,
								id: `blink1${suffix}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "y",
								values: "17.2593;18.2593;17.2593;17.2593;18.2593;17.2593",
								dur: "0.6s",
								begin: `0s;blink1${suffix}.end+3s`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "opacity",
								values: "1;0.2;1;1;0.2;1",
								dur: "0.6s",
								begin: `0s;blink1${suffix}.end+3s`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("rect", {
						x: "17.9634",
						y: "13.9387",
						width: "2.13173",
						height: "4.42744",
						rx: "1.06587",
						transform: "rotate(-30 17.9634 13.9387)",
						fill: "#D2D3E0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "height",
								values: "4.42744;2.2;4.42744;4.42744;2.2;4.42744",
								dur: "0.6s",
								begin: `0s;blink2${suffix}.end+3s`,
								id: `blink2${suffix}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "y",
								values: "13.9387;14.9387;13.9387;13.9387;14.9387;13.9387",
								dur: "0.6s",
								begin: `0s;blink2${suffix}.end+3s`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "opacity",
								values: "1;0.2;1;1;0.2;1",
								dur: "0.6s",
								begin: `0s;blink2${suffix}.end+3s`
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: clipPathId,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "24",
					height: "24",
					rx: "12",
					fill: "white"
				})
			}) })]
		});
	};
}))();
export { CopilotIcon as default };
