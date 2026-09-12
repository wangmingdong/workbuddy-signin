import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { A as Switch, Ba as Tooltip, t as init_src } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { Lr as createIcon, Rr as init_Icon, or as CheckIcon, sr as init_CheckIcon } from "./icons-Cj3UopO9.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
import { T as init_SkillIcon, w as SkillIcon } from "./oauth-callback-IQ0UCaVX.js";
import { Q as formatNumber, X as coerceSkillText, et as init_types } from "./center-Cjtv6Q1N.js";
import { r as init_SkillAvatar, t as SkillAvatar } from "./SkillAvatar-CEySvDFr.js";
//#region ../../packages/agent-ui/src/modules/skills/components/category-chip.tsx
var import_react$3, import_jsx_runtime$3, MoreIcon$1, CategoryChip;
var init_category_chip = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$3 = require_jsx_runtime();
	MoreIcon$1 = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
				cx: "4",
				cy: "8",
				r: "1.25",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
				cx: "8",
				cy: "8",
				r: "1.25",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
				cx: "12",
				cy: "8",
				r: "1.25",
				fill: "currentColor"
			})
		]
	});
	CategoryChip = ({ label, active = false, onClick, loading = false, moreMenu, className = "", track }) => {
		const menuRef = (0, import_react$3.useRef)(null);
		(0, import_react$3.useEffect)(() => {
			if (!moreMenu?.open) return;
			const handleClickOutside = (e) => {
				if (menuRef.current && !menuRef.current.contains(e.target)) moreMenu.onToggle();
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, [moreMenu?.open, moreMenu?.onToggle]);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
			type: "button",
			className: `category-chip${active ? " category-chip--active" : ""} ${className}`.trim(),
			onClick,
			...track ? {
				"data-track-id": track.elementId,
				"data-track-name": track.elementName,
				...track.props ? { "data-track-props": JSON.stringify(track.props) } : {}
			} : {},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "category-chip-label",
					children: label
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", { className: "category-chip-loading" }),
				moreMenu && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "category-chip-more",
					ref: moreMenu.open ? menuRef : null,
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "category-chip-more-btn",
						onClick: (e) => {
							e.stopPropagation();
							moreMenu.onToggle();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(MoreIcon$1, {})
					}), moreMenu.open && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "category-chip-dropdown",
						children: moreMenu.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: `category-chip-dropdown-item${item.danger ? " category-chip-dropdown-item--danger" : ""}`,
							onClick: () => {
								item.onClick();
							},
							children: item.label
						}, idx))
					})]
				})
			]
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/icons/ApiKeyIcon.tsx
var import_react$2, import_jsx_runtime$2, ApiKeyIconRaw, ApiKeyIcon;
var init_ApiKeyIcon = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_Icon();
	import_jsx_runtime$2 = require_jsx_runtime();
	ApiKeyIconRaw = (0, import_react$2.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("svg", {
		ref,
		viewBox: "0 0 13.9559 13.9243",
		fill: "none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("path", {
			d: "M8.0761 6.6927L9.5813 5.1876L10.8535 6.4597L11.702 5.6112L10.4298 4.339L11.8363 2.9325L13.1074 4.2035L13.9559 3.355L12.6849 2.084L13.9203 0.8485L13.0718 0L7.2282 5.8437C7.0018 5.6715 6.7578 5.5207 6.4962 5.3913C5.8673 5.0799 5.2018 4.9243 4.5 4.9243C3.2574 4.9243 2.1967 5.3636 1.318 6.2423C0.4393 7.121 0 8.1816 0 9.4243C0 10.6669 0.4393 11.7276 1.318 12.6062C2.1967 13.4849 3.2574 13.9243 4.5 13.9243Q6.364 13.9243 7.682 12.6062C8.5607 11.7276 9 10.6669 9 9.4243C9 9.1431 8.9739 8.8644 8.9217 8.5882C8.8694 8.312 8.792 8.043 8.6893 7.7812L7.7339 8.7367C7.778 8.9567 7.8 9.1859 7.8 9.4243C7.8 10.3355 7.4778 11.1133 6.8335 11.7577C6.1891 12.4021 5.4113 12.7243 4.5 12.7242C3.5887 12.7243 2.8109 12.4021 2.1665 11.7577C1.5222 11.1133 1.2 10.3355 1.2 9.4243C1.2 8.513 1.5222 7.7352 2.1665 7.0908C2.8109 6.4464 3.5887 6.1243 4.5 6.1243C5.4113 6.1243 6.1891 6.4464 6.8335 7.0908C7.0588 7.3162 7.4235 7.35 7.6489 7.1246L8.0782 6.6954C8.0775 6.6945 8.0768 6.6936 8.0761 6.6927Z",
			fill: "currentColor",
			fillRule: "evenodd"
		})
	}));
	ApiKeyIconRaw.displayName = "ApiKeyIconRaw";
	ApiKeyIcon = createIcon(ApiKeyIconRaw);
})), import_jsx_runtime$1, BackIcon, MoreIcon, SettingsIcon, EyeIcon, CodeIcon, DownloadIcon, StarIcon, RiskWarningIcon, EditIcon, TrashIcon, CloseCircleIcon, CheckCircleIcon, PinIcon, UseSkillIcon;
var init_skills_icons = __esmMin((() => {
	require_react();
	import_jsx_runtime$1 = require_jsx_runtime();
	BackIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("polyline", { points: "15 18 9 12 15 6" })
	});
	MoreIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
				cx: "3",
				cy: "8",
				r: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
				cx: "8",
				cy: "8",
				r: "1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
				cx: "13",
				cy: "8",
				r: "1",
				fill: "currentColor"
			})
		]
	});
	SettingsIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.620726 1.17059)",
			d: "M11.9486 3.8169Q12.3929 4.5866 12.5269 4.8822Q12.7585 5.3937 12.7585 5.8294Q12.7585 6.2651 12.5269 6.7766Q12.3929 7.0722 11.9486 7.8419L10.9068 9.6463Q10.4624 10.416 10.2734 10.6798Q9.9463 11.1361 9.5689 11.354Q9.1915 11.5719 8.6328 11.627Q8.3098 11.6588 7.421 11.6588L5.3375 11.6588Q4.4488 11.6588 4.1258 11.627Q3.567 11.5719 3.1896 11.354Q2.8123 11.1361 2.4852 10.6798Q2.2961 10.416 1.8517 9.6463L0.81 7.8419Q0.3656 7.0723 0.2317 6.7766Q0 6.2651 0 5.8294Q0 5.3937 0.2317 4.8822Q0.3656 4.5866 0.81 3.8169L1.8517 2.0125Q2.2961 1.2428 2.4852 0.979Q2.8123 0.5227 3.1896 0.3048Q3.567 0.0869 4.1258 0.0318Q4.4488 0 5.3375 0L7.4211 0Q8.3098 0 8.6328 0.0318Q9.1915 0.0869 9.5689 0.3048Q9.9463 0.5227 10.2734 0.979Q10.2968 1.0117 10.324 1.052L7.7058 1.052Q7.5699 1.05 7.4211 1.05L5.3375 1.05Q3.9989 1.05 3.7146 1.2141Q3.4304 1.3782 2.7611 2.5375L1.7193 4.3419Q1.05 5.5012 1.05 5.8294Q1.05 6.1576 1.7193 7.3169L2.7611 9.1213Q3.4304 10.2806 3.7146 10.4447Q3.9989 10.6088 5.3375 10.6088L7.421 10.6088Q8.7596 10.6088 9.0439 10.4447Q9.3282 10.2806 9.9975 9.1213L11.0392 7.3169Q11.7085 6.1576 11.7085 5.8294Q11.7085 5.5012 11.0392 4.3419L9.9975 2.5375Q9.8596 2.2986 9.738 2.102L10.9585 2.102L11.9486 3.8169ZM6.3798 3.2044Q7.4671 3.2044 8.2359 3.9733Q9.0048 4.7421 9.0048 5.8294Q9.0048 6.9167 8.2359 7.6856Q7.4671 8.4544 6.3798 8.4544Q5.2925 8.4544 4.5236 7.6856Q3.7548 6.9167 3.7548 5.8294Q3.7548 4.7421 4.5236 3.9733Q5.2925 3.2044 6.3798 3.2044ZM6.3798 4.2544Q5.7274 4.2544 5.2661 4.7157Q4.8048 5.177 4.8048 5.8294Q4.8048 6.4818 5.2661 6.9431Q5.7274 7.4044 6.3798 7.4044Q7.0321 7.4044 7.4935 6.9431Q7.9548 6.4818 7.9548 5.8294Q7.9548 5.177 7.4935 4.7157Q7.0321 4.2544 6.3798 4.2544Z",
			fillRule: "evenodd"
		})
	});
	EyeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M1.33301 8.00016C2.26634 5.66683 4.53301 4.00016 7.99967 4.00016C11.4663 4.00016 13.733 5.66683 14.6663 8.00016C13.733 10.3335 11.4663 12.0002 7.99967 12.0002C4.53301 12.0002 2.26634 10.3335 1.33301 8.00016Z",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M8 9.66683C8.92047 9.66683 9.66667 8.92064 9.66667 8.00016C9.66667 7.07969 8.92047 6.3335 8 6.3335C7.07953 6.3335 6.33333 7.07969 6.33333 8.00016C6.33333 8.92064 7.07953 9.66683 8 9.66683Z",
			stroke: "currentColor",
			strokeWidth: "1.2"
		})]
	});
	CodeIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M6 12L2 8L6 4",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M10 4L14 8L10 12",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	DownloadIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M8 2v8m0 0l-3-3m3 3l3-3M3 12h10",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	StarIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			d: "M8 1.5l1.854 3.756 4.146.603-3 2.924.708 4.13L8 10.904l-3.708 1.951.708-4.072-3-2.924 4.146-.603L8 1.5z",
			stroke: "currentColor",
			strokeWidth: "1.2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
	RiskWarningIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
		className,
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M8 1.5L2.5 3.8v3.8c0 3 1.8 5.4 4.4 6.3l1.1.4 1.1-.4c2.6-.9 4.4-3.3 4.4-6.3V3.8L8 1.5Z",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
				d: "M8 5v3.5",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
				cx: "8",
				cy: "11",
				r: "0.75",
				fill: "currentColor"
			})
		]
	});
	EditIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.999868 1.49989)",
			d: "M0.3011 12.4122Q0.6022 12.7102 1.0178 12.6286L1.9012 12.4553Q4.4733 11.9508 6.3267 10.0973L11.9021 4.5219Q12.678 3.7461 12.678 2.6489Q12.678 1.5517 11.9021 0.7758Q11.1263 0 10.0291 0Q8.9319 0 8.1561 0.7758L2.6125 6.3194Q0.7248 8.2071 0.2379 10.8318L0.0773 11.6977Q0 12.1142 0.3011 12.4122ZM11.0536 3.6734L10.7156 4.0114L8.6671 1.9618L9.0046 1.6244Q9.429 1.2 10.0291 1.2Q10.6292 1.2 11.0536 1.6244Q11.478 2.0487 11.478 2.6489Q11.478 3.249 11.0536 3.6734ZM1.3645 11.3378L1.6702 11.2778Q3.8834 10.8436 5.4782 9.2488L9.8671 4.86L7.8186 2.8103L3.461 7.1679Q1.8368 8.7922 1.4178 11.0507L1.3645 11.3378ZM6.0001 11.3L13.0001 11.3L13.0001 12.5L6.0001 12.5L6.0001 11.3Z",
			fillRule: "evenodd"
		})
	});
	TrashIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: "M9.5375 2.1L12.25 2.1L12.25 3.15L8.75 3.15L8.75 3.15L2.275 3.15L2.275 7Q2.275 8.7468 2.417 9.152Q2.8208 10.3042 3.973 10.708Q4.3782 10.85 6.125 10.85Q7.8718 10.85 8.277 10.708Q9.4292 10.3042 9.833 9.152Q9.975 8.7468 9.975 7L9.975 4.2L11.025 4.2L11.025 7Q11.025 8.9254 10.8239 9.4993Q10.2531 11.1281 8.6243 11.6989Q8.0504 11.9 6.125 11.9Q4.1996 11.9 3.6257 11.6989Q1.9969 11.1281 1.4261 9.4993Q1.225 8.9254 1.225 7L1.225 3.15L0 3.15L0 2.1L2.7125 2.1L2.7798 1.9384Q3.0762 1.227 3.2128 0.9788Q3.4591 0.5314 3.7932 0.3086Q4.1274 0.0858 4.6351 0.0306Q4.9168 -0 5.6875 0L6.5625 0Q7.3332 -0 7.6149 0.0306Q8.1226 0.0858 8.4568 0.3086Q8.7909 0.5314 9.0371 0.9788Q9.1738 1.2271 9.4702 1.9384L9.5375 2.1ZM3.8522 2.1Q4.202 1.298 4.3757 1.1823Q4.5741 1.05 5.6875 1.05L6.5625 1.05Q7.6759 1.05 7.8743 1.1823Q8.048 1.298 8.3978 2.1L3.8522 2.1ZM6.65 4.375L5.6 4.375L5.6 9.625L6.65 9.625L6.65 4.375Z",
			fillRule: "evenodd"
		})
	});
	CloseCircleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: "M12.25 6.125Q12.25 3.5879 10.456 1.794Q8.6621 0 6.125 0Q3.5879 0 1.794 1.794Q0 3.5879 0 6.125Q0 8.6621 1.794 10.456Q3.5879 12.25 6.125 12.25Q7.1814 12.25 8.1768 11.8961Q9.1722 11.5422 9.9915 10.8753L9.2474 10.1312Q7.9076 11.2 6.125 11.2Q4.0229 11.2 2.5364 9.7136Q1.05 8.2271 1.05 6.125Q1.05 4.0229 2.5364 2.5364Q4.0229 1.05 6.125 1.05Q8.2271 1.05 9.7136 2.5364Q11.2 4.0229 11.2 6.125Q11.2 7.9205 10.1155 9.2669L10.8595 10.0109Q11.5338 9.1893 11.8919 8.1886Q12.25 7.1879 12.25 6.125ZM8.6837 7.9413L6.8675 6.125L8.6837 4.3087L7.9413 3.5663L6.125 5.3825L4.3087 3.5663L3.5663 4.3087L5.3825 6.125L3.5663 7.9413L4.3087 8.6837L6.125 6.8675L7.9413 8.6837L8.6837 7.9413Z",
			fillRule: "evenodd"
		})
	});
	CheckCircleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0.875 0.875)",
			d: "M0 6.125Q0 8.6621 1.794 10.456Q3.5879 12.25 6.125 12.25Q8.6621 12.25 10.456 10.456Q12.25 8.6621 12.25 6.125Q12.25 3.5879 10.456 1.794Q8.6621 0 6.125 0Q4.5809 0 3.2214 0.732Q1.8618 1.464 1.0118 2.753L1.7646 3.5059Q2.0807 2.9922 2.5364 2.5364Q4.0229 1.05 6.125 1.05Q8.2271 1.05 9.7136 2.5364Q11.2 4.0229 11.2 6.125Q11.2 8.2271 9.7136 9.7136Q8.2271 11.2 6.125 11.2Q4.0229 11.2 2.5364 9.7136Q1.05 8.2271 1.05 6.125Q1.05 5.3791 1.2371 4.7108L0.4207 3.8943Q0.2122 4.4274 0.1061 4.99Q0 5.5525 0 6.125ZM3.8712 5.7538L5.25 7.1325L8.3788 4.0038L9.1212 4.7462L5.6212 8.2462Q5.4701 8.4063 5.25 8.4Q5.0299 8.4063 4.8788 8.2462L3.1288 6.4962L3.8712 5.7538Z",
			fillRule: "evenodd"
		})
	});
	PinIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(0.707107 0.707107 -0.707107 0.707107 9.66 -1.44)",
			d: "M8.9091 1.7259C9.0313 2.1014 9.0313 2.5676 9.0313 3.5L9.0313 3.9998C9.0313 4.6592 9.0313 4.9889 9.0829 5.3072C9.1518 5.7316 9.2887 6.1423 9.4883 6.5232C9.638 6.8088 9.8359 7.0725 10.2316 7.6C10.7349 8.271 11.0022 8.6051 11.0295 8.9079C11.0634 9.2833 10.8774 9.6554 10.5568 9.8535C10.3173 10.0015 9.9329 10.001 9.2114 10.0002L9.2087 10.0002L9.208 10.0002C9.1513 10.0001 9.0926 10 9.0317 10L7.3316 10L7.3316 8.8L9.0317 8.8Q9.0949 8.8 9.2128 8.8002Q9.457 8.8005 9.628 8.7982Q9.5272 8.66 9.3804 8.4649Q9.3093 8.3703 9.2717 8.3201Q8.62 7.4515 8.4255 7.0803Q8.0336 6.3326 7.8984 5.4994Q7.8313 5.0857 7.8313 3.9998L7.8313 3.5Q7.8313 2.2917 7.768 2.0971Q7.5633 1.468 6.9341 1.2633Q6.7396 1.2 5.5313 1.2Q4.323 1.2 4.1284 1.2633Q3.4992 1.468 3.2946 2.0971Q3.2313 2.2917 3.2313 3.5L3.2313 4.0002Q3.2313 5.0862 3.1641 5.4999Q3.029 6.3325 2.6376 7.0797Q2.4431 7.451 1.7916 8.3199Q1.754 8.37 1.6829 8.4647Q1.5361 8.6599 1.4352 8.7982Q1.6064 8.8005 1.8507 8.8002Q1.9695 8.8 2.0318 8.8L6.1316 8.8L6.1316 10L6.1313 10L6.1317 17L4.9317 17.0001L4.9313 10L2.0318 10C1.9696 10 1.9098 10.0001 1.8521 10.0002C1.1304 10.001 0.7459 10.0015 0.5064 9.8534C0.1859 9.6553 0 9.2835 0.0338 8.9083C0.061 8.6054 0.3283 8.2712 0.8316 7.6C1.2272 7.0723 1.425 6.8085 1.5746 6.5229C1.774 6.1422 1.9108 5.7319 1.9796 5.3077C2.0313 4.9894 2.0313 4.6597 2.0313 4.0002L2.0313 3.5C2.0313 2.5676 2.0313 2.1014 2.1534 1.7259C2.4 0.9678 2.9991 0.3688 3.7572 0.1222C4.1327 0 4.5989 0 5.5313 0C6.4637 0 6.9299 0 7.3054 0.1222C8.0634 0.3688 8.6625 0.9678 8.9091 1.7259Z",
			fillRule: "evenodd"
		})
	});
	UseSkillIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14.4531 14.6507",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("path", {
			fill: "currentColor",
			transform: "matrix(1 0 0 1 0 -0.00904646)",
			d: "M7.2266 0.0103C7.2614 0.0103 7.297 0.0103 7.3333 0.0103C8.0268 0.0098 8.9863 0.0091 9.9521 0.1802C10.9684 0.3604 12.061 0.7417 12.8926 1.5738C14.2855 2.9679 14.4531 4.8487 14.4531 6.2906C14.4531 7.7324 14.2853 9.6123 12.8926 11.0065C12.094 11.8056 11.0936 12.1926 10.1406 12.3823C9.1916 12.5713 8.2453 12.5728 7.5312 12.5708C7.2983 12.5702 6.9785 12.7115 6.5684 13.105C6.17 13.4873 5.7651 14.0329 5.3662 14.6597L4.3535 14.0152C4.7714 13.3586 5.2367 12.7192 5.7373 12.2388C6.2261 11.7699 6.8348 11.3689 7.5342 11.3706C8.2533 11.3726 9.0891 11.3683 9.9062 11.2056C10.7192 11.0437 11.4695 10.7335 12.0439 10.1587C13.073 9.1287 13.2539 7.6885 13.2539 6.2906C13.2539 4.8927 13.0729 3.4525 12.0439 2.4224C11.4564 1.8345 10.6378 1.5205 9.7432 1.3619C8.8809 1.209 8.0118 1.2093 7.3052 1.2095L7.2266 1.2095L7.1478 1.2095C6.4412 1.2093 5.5722 1.209 4.71 1.3619C3.8153 1.5205 2.9967 1.8344 2.4092 2.4224C1.3801 3.4525 1.1992 4.8927 1.1992 6.2906C1.1993 7.6885 1.3802 9.1287 2.4092 10.1587C3.0494 10.7994 3.9083 11.1103 4.8252 11.2544L4.7324 11.8472L4.6387 12.44C3.5897 12.275 2.45 11.8965 1.5605 11.0065C0.1678 9.6123 0 7.7324 0 6.2906C0 4.8487 0.1676 2.9679 1.5605 1.5738C2.392 0.7418 3.4838 0.3604 4.5 0.1802C5.4656 0.009 6.4253 0.0098 7.1189 0.0103C7.1555 0.0103 7.1914 0.0103 7.2266 0.0103ZM5.2028 8.2222L5.2028 4.2222L4.0028 4.2222L4.0028 8.2222L5.2028 8.2222ZM10.2028 4.2222L10.2028 8.2222L9.0028 8.2222L9.0028 4.2222L10.2028 4.2222Z",
			fillRule: "evenodd"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/skill-card-helpers.ts
/**
* 已安装卡片专用的描述取值,locale-aware 优先策略。
*
* 与公共 {@link getLocalizedDescription} 优先级相反:
* - 优先 description_zh/en(按当前 locale)——已安装的 BuiltinMarket skill 这两个字段
*   由 skills-manager 从 _skillhub_meta.json 注入(meta 是运营源 + backfill 真源);
*   纯本地或没有双语字段的 skill 会自然回退到 description。
* - 其他来源(skillhub/knot/本地 SKILL.md):若 frontmatter 没写 description_zh/en,
*   localized 取值是 undefined,直接走 description 兜底——行为与原来一致。
*
* 名字保留 "BuiltinMarket" 是历史遗留(主要为 BM 设计),实际逻辑对所有已安装来源都安全。
*/
function getBuiltinMarketLocalizedDescription(skill) {
	const locale = getLocale();
	const localized = locale === "en" ? skill.description_en : skill.description_zh;
	if (localized) return coerceSkillText(localized);
	if (skill.description) return coerceSkillText(skill.description);
	const fallback = locale === "en" ? skill.description_zh : skill.description_en;
	return fallback ? coerceSkillText(fallback) : "";
}
/**
* Get the localized display name for a BuiltinMarketSkill.
*
* Fallback chain:
*   - English env: display_name_en → description (= display_name_zh) → name (slug)
*   - Chinese env: description (= display_name_zh) → name (slug)
*
* This is the single source of truth for display name resolution;
* all call-sites should use this helper instead of inline fallback logic.
*/
function getBuiltinMarketDisplayName(skill) {
	return getLocale() === "en" ? skill.display_name_en || skill.description || skill.name || "" : skill.description || skill.name || "";
}
/**
* 已装 UISkill 显示名 locale-aware 解析（列表卡片 + 详情页共用，issue #63320）。
* name 可能被后端 pickName 中文化，用 display_name_* / slug 做 locale 兜底。
*/
function getInstalledSkillDisplayName(skill) {
	const ss = skill;
	return getLocale() === "en" ? ss.display_name_en || ss.display_name || ss.slug || ss.name || "" : ss.display_name_zh || ss.name || ss.display_name || ss.slug || "";
}
var resolveIconUrl, HUB_SOURCE_TO_MARKETPLACE, needsApiKeyFromLabels, getSourceLabel, hubSkillToCardProps, builtinMarketSkillToCardProps, pluginToCardProps, installedPluginToCardProps, installedSkillToCardProps;
var init_skill_card_helpers = __esmMin((() => {
	init_i18n();
	init_types();
	resolveIconUrl = (...candidates) => {
		for (const raw of candidates) {
			const trimmed = (raw || "").trim();
			if (/^(https?|local-file|file):\/\//i.test(trimmed)) return trimmed;
		}
	};
	HUB_SOURCE_TO_MARKETPLACE = {
		recommend: "marketplace",
		knot: "knot",
		skillhub: "skillhub"
	};
	needsApiKeyFromLabels = (labels) => labels?.requires_api_key === "true";
	getSourceLabel = (source, t) => {
		switch (source) {
			case "recommend": return t ? t("skills.tab.recommend") : "Recommend";
			case "knot": return t ? t("skills.tab.knot") : "Knot";
			default: return t ? t("skills.tab.skillhub") : "SkillHub";
		}
	};
	hubSkillToCardProps = (skill, onCardClick, onInstall, showSource, t, isInstalling, isInstalled, onTryNow) => {
		const iconUrl = resolveIconUrl(skill.iconUrl);
		const isRecommend = skill._source === "recommend";
		const marketplaceSource = HUB_SOURCE_TO_MARKETPLACE[skill._source ?? ""] ?? "skillhub";
		const labels = skill.labels;
		return {
			name: skill.name,
			description: skill.description_zh,
			descriptionEn: skill.description,
			downloads: skill.downloads,
			stars: skill.stars,
			sourceLabel: getSourceLabel(skill._source, t),
			showSource,
			onCardClick: () => onCardClick(skill),
			onInstall: () => onInstall(skill),
			useAvatar: true,
			skillSource: isRecommend ? skill.slug : void 0,
			skillIconUrl: iconUrl,
			skillMarketplaceSource: marketplaceSource,
			isInstalling,
			isInstalled,
			onTryNow,
			needsApiKey: needsApiKeyFromLabels(labels)
		};
	};
	builtinMarketSkillToCardProps = (skill, categories, onCardClick, onInstall, btnState, onTryNow) => {
		const description = getLocale() === "en" ? skill.description_en || skill.description || skill.description_zh || "" : skill.description_zh || skill.description || skill.description_en || "";
		if (categories.length === -1) {}
		const iconUrl = resolveIconUrl(skill.icon_url, skill.icon);
		return {
			name: getBuiltinMarketDisplayName(skill),
			description,
			descriptionEn: skill.description_en,
			useAvatar: true,
			skillSource: skill.source,
			skillIconUrl: iconUrl,
			skillMarketplaceSource: "builtin-market",
			onCardClick: () => onCardClick(skill),
			onInstall: () => onInstall(skill),
			isInstalling: btnState.variant === "installing",
			isInstalled: btnState.variant === "installed",
			onTryNow
		};
	};
	pluginToCardProps = (plugin, onCardClick, badgeText, onInstall, isInstalling) => ({
		name: plugin.name,
		description: plugin.description,
		onCardClick: () => onCardClick(plugin),
		badgeText,
		onInstall,
		useAvatar: true,
		isInstalling
	});
	installedPluginToCardProps = ({ plugin, onCardClick, onTogglePlugin, enabled, badgeText, isBatchMode, isSelected, onToggleSelect, onUninstallPlugin, showInstalledIndicator, pinned, onTogglePin, installedListMode }) => ({
		name: plugin.name,
		description: plugin.description,
		installed: true,
		disabled: !enabled,
		onCardClick: () => onCardClick(plugin),
		badgeText,
		isBatchMode,
		isSelected,
		onToggleSelect,
		useAvatar: true,
		onToggle: (newEnabled) => onTogglePlugin(plugin, newEnabled),
		onUninstall: onUninstallPlugin ? () => onUninstallPlugin(plugin) : void 0,
		showInstalledIndicator,
		pinned,
		onTogglePin,
		installedListMode
	});
	installedSkillToCardProps = ({ skill, onCardClick, onToggleSkill, enabled, isBatchMode, isSelected, onToggleSelect, showUpdate, isUpdating, onUpdate, updateLabels, riskResult, onUninstallSkill, onEditSkill, showInstalledIndicator, onTryNow, pinned, onTogglePin, installedListMode, downloads, stars }) => {
		const skillIconUrl = resolveIconUrl(skill.iconUrl, skill.iconSource);
		return {
			name: getInstalledSkillDisplayName(skill),
			description: getBuiltinMarketLocalizedDescription(skill),
			useAvatar: true,
			installed: true,
			skillSource: skill.iconSource,
			skillIconUrl,
			skillMarketplaceSource: skill.marketplaceSource,
			disabled: !enabled,
			onCardClick: () => onCardClick(skill),
			isBatchMode,
			isSelected,
			onToggleSelect,
			showUpdate,
			isUpdating,
			onUpdate,
			updateLabels,
			riskResult,
			onToggle: (newEnabled) => onToggleSkill(skill.filePath, newEnabled),
			onUninstall: onUninstallSkill ? () => onUninstallSkill(skill) : void 0,
			onEdit: onEditSkill ? () => onEditSkill(skill) : void 0,
			showInstalledIndicator,
			onTryNow: enabled && onTryNow ? () => onTryNow(skill) : void 0,
			pinned,
			onTogglePin,
			installedListMode,
			downloads,
			stars,
			needsApiKey: needsApiKeyFromLabels(skill.labels)
		};
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/modules/skills/components/skill-card.tsx
var import_react, import_jsx_runtime, SkillCardSkeleton, SkillCard;
var init_skill_card = __esmMin((() => {
	init_src();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_SkillAvatar();
	init_SkillIcon();
	init_ApiKeyIcon();
	init_CheckIcon();
	init_i18n();
	init_useI18n();
	init_types();
	init_skills_icons();
	import_jsx_runtime = require_jsx_runtime();
	init_skill_card_helpers();
	SkillCardSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "skill-card skill-card--skeleton",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "skill-card-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skill-card-icon skill-card-skeleton-block" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "skill-card-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skill-card-skeleton-line skill-card-skeleton-line--name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skill-card-skeleton-line skill-card-skeleton-line--desc" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skill-card-skeleton-toggle" })
			]
		})
	});
	SkillCard = ({ name, description, descriptionEn, downloads = 0, stars = 0, sourceLabel, showSource = false, onCardClick, onInstall, useAvatar = false, installed = false, disabled = false, showUpdate = false, isUpdating = false, onUpdate, updateLabels, isBatchMode = false, isSelected = false, onToggleSelect, toggleElement, onToggle, onUninstall, onEdit, badgeText, riskResult, className, skillSource, skillIconUrl, skillMarketplaceSource, isInstalling = false, isInstalled = false, needsApiKey = false, onTryNow, reasonLabel, isFeatured = false, showInstalledIndicator = false, installedListMode = false, pinned, onTogglePin }) => {
		const t = useTranslation();
		const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
		const menuRef = (0, import_react.useRef)(null);
		(0, import_react.useEffect)(() => {
			if (!menuOpen) return;
			const handleClick = (e) => {
				if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
			};
			document.addEventListener("mousedown", handleClick);
			return () => document.removeEventListener("mousedown", handleClick);
		}, [menuOpen]);
		const hasStats = downloads > 0 || stars > 0;
		const safeName = coerceSkillText(name);
		const safeDescription = coerceSkillText(description);
		const safeDescriptionEn = coerceSkillText(descriptionEn);
		const safeSourceLabel = coerceSkillText(sourceLabel);
		const safeBadgeText = coerceSkillText(badgeText);
		const displayDesc = getLocale() !== "en" ? safeDescription || safeDescriptionEn : safeDescriptionEn || safeDescription;
		const nameRef = (0, import_react.useRef)(null);
		const descRef = (0, import_react.useRef)(null);
		const [isNameOverflow, setIsNameOverflow] = (0, import_react.useState)(false);
		const [isDescOverflow, setIsDescOverflow] = (0, import_react.useState)(false);
		(0, import_react.useEffect)(() => {
			const nameEl = nameRef.current;
			if (nameEl) setIsNameOverflow(nameEl.scrollWidth > nameEl.clientWidth);
		}, [safeName]);
		(0, import_react.useEffect)(() => {
			const descEl = descRef.current;
			if (descEl) setIsDescOverflow(descEl.scrollHeight > descEl.clientHeight);
		}, [displayDesc]);
		const getRiskTooltipContent = (0, import_react.useCallback)((result) => {
			const riskDescription = result.tags[0]?.desc || result.fileAnalysis[0]?.description || t("skills.security.riskTooltip.default");
			if (result.riskLevel === "high") return t("skills.security.riskTooltip.high", { desc: riskDescription });
			if (result.riskLevel === "medium") return t("skills.security.riskTooltip.medium", { desc: riskDescription });
			return t("skills.security.riskTooltip.low", { desc: riskDescription });
		}, [t]);
		const cardClassNames = [
			"skill-card",
			installed && "skill-card--installed",
			installedListMode && "skill-card--installed-list-mode",
			showUpdate && "skill-card--has-update",
			disabled && "skill-card--disabled",
			isBatchMode && "skill-card--batch-mode",
			isSelected && "skill-card--selected",
			badgeText && "skill-card--plugin",
			className
		].filter(Boolean).join(" ");
		const checkboxEl = isBatchMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "skill-checkbox",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked: isSelected,
				readOnly: true,
				tabIndex: -1
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "skill-checkbox-mark" })]
		});
		const handleCardClick = isBatchMode ? onToggleSelect : onCardClick;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cardClassNames,
			"data-track-id": "skill_card_click",
			"data-track-name": "点击技能卡片",
			"data-track-props": JSON.stringify({ source: name }),
			onClick: handleCardClick,
			role: isBatchMode ? "checkbox" : void 0,
			"aria-checked": isBatchMode ? isSelected : void 0,
			children: [
				checkboxEl,
				reasonLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "skill-card-reason",
					children: reasonLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "skill-card-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "skill-card-icon",
							children: useAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillAvatar, {
								name: safeName,
								source: skillSource,
								iconUrl: skillIconUrl,
								marketplaceSource: skillMarketplaceSource,
								size: 28
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillIcon, {
								width: 28,
								height: 28
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "skill-card-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "skill-card-body",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "skill-card-name-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: isNameOverflow ? safeName : "",
											placement: "top",
											maxWidth: 250,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												ref: nameRef,
												className: "skill-card-name",
												children: safeName
											})
										}),
										showSource && safeSourceLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "skill-card-source",
											children: safeSourceLabel
										}),
										safeBadgeText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "skill-card-badge skill-card-badge--plugin",
											children: safeBadgeText
										}),
										riskResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: getRiskTooltipContent(riskResult),
											placement: "top",
											maxWidth: 280,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `skill-risk-badge skill-risk-badge--${riskResult.riskLevel}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskWarningIcon, { className: "skill-risk-badge__icon" })
											})
										}),
										needsApiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											content: t("skills.needsApiKey"),
											placement: "top",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "skill-card-name-status-icon skill-card-name-status-icon--api-key",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiKeyIcon, {
													width: 14,
													height: 14
												})
											})
										}),
										showUpdate && updateLabels && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `skill-update-icon${isUpdating ? " skill-update-icon--updating" : ""}`,
											onClick: (e) => {
												e.stopPropagation();
												if (!isUpdating && onUpdate) onUpdate();
											},
											role: "button",
											tabIndex: 0,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "skill-update-icon__label",
												children: isUpdating ? updateLabels.updating : updateLabels.hover
											})
										})
									]
								})
							})
						}),
						installed && installedListMode && (onToggle || onUninstall || onEdit || onTogglePin) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skill-status",
							onClick: (e) => e.stopPropagation(),
							children: [
								(onTryNow || onEdit || onUninstall) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "skill-card-menu-wrap",
									ref: menuRef,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `skill-card-menu-btn${menuOpen ? " is-open" : ""}`,
										onClick: (e) => {
											e.stopPropagation();
											setMenuOpen((prev) => !prev);
										},
										"aria-label": "more",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "5",
													cy: "12",
													r: "1"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "12",
													r: "1"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "19",
													cy: "12",
													r: "1"
												})
											]
										})
									}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "skill-card-menu",
										children: [
											onTryNow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "skill-card-menu-item",
												onClick: (e) => {
													e.stopPropagation();
													onTryNow();
													setMenuOpen(false);
												},
												"data-track-id": "skill_action",
												"data-track-name": "去对话",
												"data-track-props": JSON.stringify({
													source: name,
													type: "try"
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseSkillIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("skills.card.goChat") })]
											}),
											onEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "skill-card-menu-item",
												onClick: (e) => {
													e.stopPropagation();
													onEdit();
													setMenuOpen(false);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("skills.card.edit") })]
											}),
											onUninstall && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "skill-card-menu-item skill-card-menu-item--danger",
												onClick: (e) => {
													e.stopPropagation();
													onUninstall();
													setMenuOpen(false);
												},
												"data-track-id": "skill_action",
												"data-track-name": "卸载技能",
												"data-track-props": JSON.stringify({
													source: name,
													type: "uninstall"
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrashIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("skills.card.uninstall") })]
											})
										]
									})]
								}),
								onTogglePin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: pinned ? t("skills.card.unpin") : t("skills.card.pin"),
									placement: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: `skill-card-pin${pinned ? " skill-card-pin--active" : ""}`,
										"aria-label": pinned ? t("skills.card.unpin") : t("skills.card.pin"),
										"aria-pressed": pinned ? true : false,
										onClick: (e) => {
											e.stopPropagation();
											onTogglePin(!pinned);
										},
										"data-track-id": "skill_action",
										"data-track-name": pinned ? "取消置顶" : "置顶",
										"data-track-props": JSON.stringify({
											source: name,
											type: pinned ? "unpin" : "pin"
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinIcon, {})
									})
								}),
								onToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: disabled ? t("skills.card.enable") : t("skills.card.disable"),
									placement: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "skill-card-switch-wrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											size: "small",
											checked: !disabled,
											onChange: (next) => {
												onToggle(next);
											},
											"aria-label": disabled ? t("skills.card.enable") : t("skills.card.disable")
										})
									})
								}),
								showInstalledIndicator && (onTryNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("skills.tryNow"),
									placement: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "skill-card-installed-check skill-card-installed-check--actionable",
										"aria-label": t("skills.tryNow"),
										onClick: (e) => {
											e.stopPropagation();
											onTryNow();
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "skill-card-installed-check__default",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "skill-card-installed-check__hover",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseSkillIcon, {})
										})]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "skill-card-installed-check",
									"aria-label": t("skills.card.installed"),
									title: t("skills.card.installed"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {})
								}))
							]
						}),
						installed && !installedListMode && (onToggle || onUninstall || onEdit) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "skill-status",
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "skill-card-menu-wrap",
								ref: menuRef,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `skill-card-menu-btn${menuOpen ? " is-open" : ""}`,
									onClick: (e) => {
										e.stopPropagation();
										setMenuOpen((prev) => !prev);
									},
									"aria-label": "more",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "14",
										height: "14",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "5",
												cy: "12",
												r: "1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "12",
												cy: "12",
												r: "1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "19",
												cy: "12",
												r: "1"
											})
										]
									})
								}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "skill-card-menu",
									children: [
										onToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "skill-card-menu-item",
											onClick: (e) => {
												e.stopPropagation();
												onToggle(disabled);
												setMenuOpen(false);
											},
											...!disabled ? {
												"data-track-id": "skill_post_install_dismiss",
												"data-track-name": "安装后关闭",
												"data-track-props": JSON.stringify({ source: name })
											} : {},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "13",
												height: "13",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.5",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "2",
														x2: "22",
														y2: "22"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: disabled ? t("skills.card.enable") : t("skills.card.disable") })]
										}),
										onEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "skill-card-menu-item",
											onClick: (e) => {
												e.stopPropagation();
												onEdit();
												setMenuOpen(false);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("skills.card.edit") })]
										}),
										onUninstall && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "skill-card-menu-item skill-card-menu-item--danger",
											onClick: (e) => {
												e.stopPropagation();
												onUninstall();
												setMenuOpen(false);
											},
											"data-track-id": "skill_action",
											"data-track-name": "卸载技能",
											"data-track-props": JSON.stringify({
												source: name,
												type: "uninstall"
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrashIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("skills.card.uninstall") })]
										})
									]
								})]
							}), showInstalledIndicator && (onTryNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("skills.tryNow"),
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "skill-card-installed-check skill-card-installed-check--actionable",
									"aria-label": t("skills.tryNow"),
									onClick: (e) => {
										e.stopPropagation();
										onTryNow();
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "skill-card-installed-check__default",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "skill-card-installed-check__hover",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseSkillIcon, {})
									})]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "skill-card-installed-check",
								"aria-label": t("skills.card.installed"),
								title: t("skills.card.installed"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {})
							}))]
						}),
						installed && !installedListMode && showInstalledIndicator && !(onToggle || onUninstall || onEdit) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "skill-status",
							onClick: (e) => e.stopPropagation(),
							children: onTryNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("skills.tryNow"),
								placement: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "skill-card-installed-check skill-card-installed-check--actionable",
									"aria-label": t("skills.tryNow"),
									onClick: (e) => {
										e.stopPropagation();
										onTryNow();
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "skill-card-installed-check__default",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "skill-card-installed-check__hover",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseSkillIcon, {})
									})]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "skill-card-installed-check",
								"aria-label": t("skills.card.installed"),
								title: t("skills.card.installed"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {})
							})
						}),
						onInstall && !installed && (isInstalled && onTryNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t("skills.tryNow"),
							placement: "top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "skill-add-btn skill-use-btn",
								onClick: (e) => {
									e.stopPropagation();
									onTryNow();
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseSkillIcon, {})
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `skill-add-btn${isInstalling ? " skill-add-btn--loading" : ""}${isInstalled ? " skill-use-btn" : ""}`,
							onClick: (e) => {
								e.stopPropagation();
								if (!isInstalled && !isInstalling) onInstall();
							},
							disabled: isInstalling || isInstalled || disabled,
							"data-track-id": "skill_action",
							"data-track-name": "直接安装技能",
							"data-track-props": JSON.stringify({
								source: name,
								type: "install",
								mode: "list"
							}),
							children: isInstalling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "skill-install-loading" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "12",
									y1: "5",
									x2: "12",
									y2: "19"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "5",
									y1: "12",
									x2: "19",
									y2: "12"
								})]
							})
						}))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: isDescOverflow ? displayDesc || "" : "",
					placement: "top",
					maxWidth: 250,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: descRef,
						className: "skill-card-desc skill-card-desc--two-lines",
						children: displayDesc || "-"
					})
				}),
				hasStats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "skill-card-stats",
					children: [downloads > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "skill-card-stat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadIcon, {}),
							" ",
							formatNumber(downloads)
						]
					}), stars > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "skill-card-stat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarIcon, {}),
							" ",
							formatNumber(stars)
						]
					})]
				})
			]
		});
	};
}));
//#endregion
export { CategoryChip as C, init_skills_icons as S, EyeIcon as _, getBuiltinMarketDisplayName as a, StarIcon as b, init_skill_card_helpers as c, pluginToCardProps as d, BackIcon as f, DownloadIcon as g, CodeIcon as h, builtinMarketSkillToCardProps as i, installedPluginToCardProps as l, CloseCircleIcon as m, SkillCardSkeleton as n, getInstalledSkillDisplayName as o, CheckCircleIcon as p, init_skill_card as r, hubSkillToCardProps as s, SkillCard as t, installedSkillToCardProps as u, MoreIcon as v, init_category_chip as w, TrashIcon as x, SettingsIcon as y };
