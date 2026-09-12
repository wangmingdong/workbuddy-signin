import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase, toCamelCase, toPascalCase, mergeClasses, hasA11yProp;
var init_utils = __esmMin((() => {
	toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
	toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
	toPascalCase = (string) => {
		const camelCase = toCamelCase(string);
		return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
	};
	mergeClasses = (...classes) => classes.filter((className, index, array) => {
		return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
	}).join(" ").trim();
	hasA11yProp = (props) => {
		for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	};
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes;
var init_defaultAttributes = __esmMin((() => {
	defaultAttributes = {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	};
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/Icon.js
var import_react$1, Icon;
var init_Icon = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_defaultAttributes();
	init_utils();
	Icon = (0, import_react$1.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react$1.createElement)("svg", {
		ref,
		...defaultAttributes,
		width: size,
		height: size,
		stroke: color,
		strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
		className: mergeClasses("lucide", className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => (0, import_react$1.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react, createLucideIcon;
var init_createLucideIcon = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_utils();
	init_Icon();
	createLucideIcon = (iconName, iconNode) => {
		const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
			ref,
			iconNode,
			className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
			...props
		}));
		Component.displayName = toPascalCase(iconName);
		return Component;
	};
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/archive.js
var __iconNode$102, Archive;
var init_archive = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$102 = [
		["rect", {
			width: "20",
			height: "5",
			x: "2",
			y: "3",
			rx: "1",
			key: "1wp1u1"
		}],
		["path", {
			d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
			key: "1s80jp"
		}],
		["path", {
			d: "M10 12h4",
			key: "a56b0p"
		}]
	];
	Archive = createLucideIcon("archive", __iconNode$102);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/arrow-left-right.js
var __iconNode$101, ArrowLeftRight;
var init_arrow_left_right = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$101 = [
		["path", {
			d: "M8 3 4 7l4 4",
			key: "9rb6wj"
		}],
		["path", {
			d: "M4 7h16",
			key: "6tx8e3"
		}],
		["path", {
			d: "m16 21 4-4-4-4",
			key: "siv7j2"
		}],
		["path", {
			d: "M20 17H4",
			key: "h6l3hr"
		}]
	];
	ArrowLeftRight = createLucideIcon("arrow-left-right", __iconNode$101);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/book-open-check.js
var __iconNode$100, BookOpenCheck;
var init_book_open_check = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$100 = [
		["path", {
			d: "M12 21V7",
			key: "gj6g52"
		}],
		["path", {
			d: "m16 12 2 2 4-4",
			key: "mdajum"
		}],
		["path", {
			d: "M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",
			key: "8arnkb"
		}]
	];
	BookOpenCheck = createLucideIcon("book-open-check", __iconNode$100);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/book-open.js
var __iconNode$99, BookOpen;
var init_book_open = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$99 = [["path", {
		d: "M12 7v14",
		key: "1akyts"
	}], ["path", {
		d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
		key: "ruj8y"
	}]];
	BookOpen = createLucideIcon("book-open", __iconNode$99);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/box.js
var __iconNode$98, Box;
var init_box = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$98 = [
		["path", {
			d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
			key: "hh9hay"
		}],
		["path", {
			d: "m3.3 7 8.7 5 8.7-5",
			key: "g66t2b"
		}],
		["path", {
			d: "M12 22V12",
			key: "d0xqtd"
		}]
	];
	Box = createLucideIcon("box", __iconNode$98);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/building-2.js
var __iconNode$97, Building2;
var init_building_2 = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$97 = [
		["path", {
			d: "M10 12h4",
			key: "a56b0p"
		}],
		["path", {
			d: "M10 8h4",
			key: "1sr2af"
		}],
		["path", {
			d: "M14 21v-3a2 2 0 0 0-4 0v3",
			key: "1rgiei"
		}],
		["path", {
			d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
			key: "secmi2"
		}],
		["path", {
			d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
			key: "16ra0t"
		}]
	];
	Building2 = createLucideIcon("building-2", __iconNode$97);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/cable.js
var __iconNode$96, Cable;
var init_cable = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$96 = [
		["path", {
			d: "M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z",
			key: "trhst0"
		}],
		["path", {
			d: "M17 21v-2",
			key: "ds4u3f"
		}],
		["path", {
			d: "M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10",
			key: "1mo9zo"
		}],
		["path", {
			d: "M21 21v-2",
			key: "eo0ou"
		}],
		["path", {
			d: "M3 5V3",
			key: "1k5hjh"
		}],
		["path", {
			d: "M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z",
			key: "1dd30t"
		}],
		["path", {
			d: "M7 5V3",
			key: "1t1388"
		}]
	];
	Cable = createLucideIcon("cable", __iconNode$96);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/calendar-days.js
var __iconNode$95, CalendarDays;
var init_calendar_days = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$95 = [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 14h.01",
			key: "6423bh"
		}],
		["path", {
			d: "M12 14h.01",
			key: "1etili"
		}],
		["path", {
			d: "M16 14h.01",
			key: "1gbofw"
		}],
		["path", {
			d: "M8 18h.01",
			key: "lrp35t"
		}],
		["path", {
			d: "M12 18h.01",
			key: "mhygvu"
		}],
		["path", {
			d: "M16 18h.01",
			key: "kzsmim"
		}]
	];
	CalendarDays = createLucideIcon("calendar-days", __iconNode$95);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/camera.js
var __iconNode$94, Camera;
var init_camera = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$94 = [["path", {
		d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
		key: "18u6gg"
	}], ["circle", {
		cx: "12",
		cy: "13",
		r: "3",
		key: "1vg3eu"
	}]];
	Camera = createLucideIcon("camera", __iconNode$94);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chart-gantt.js
var __iconNode$93, ChartGantt;
var init_chart_gantt = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$93 = [
		["path", {
			d: "M10 6h8",
			key: "zvc2xc"
		}],
		["path", {
			d: "M12 16h6",
			key: "yi5mkt"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M8 11h7",
			key: "wz2hg0"
		}]
	];
	ChartGantt = createLucideIcon("chart-gantt", __iconNode$93);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/check.js
var __iconNode$92, Check;
var init_check = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$92 = [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]];
	Check = createLucideIcon("check", __iconNode$92);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevron-down.js
var __iconNode$91, ChevronDown;
var init_chevron_down = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$91 = [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]];
	ChevronDown = createLucideIcon("chevron-down", __iconNode$91);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevron-left.js
var __iconNode$90, ChevronLeft;
var init_chevron_left = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$90 = [["path", {
		d: "m15 18-6-6 6-6",
		key: "1wnfg3"
	}]];
	ChevronLeft = createLucideIcon("chevron-left", __iconNode$90);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevron-right.js
var __iconNode$89, ChevronRight;
var init_chevron_right = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$89 = [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]];
	ChevronRight = createLucideIcon("chevron-right", __iconNode$89);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevron-up.js
var __iconNode$88, ChevronUp;
var init_chevron_up = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$88 = [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]];
	ChevronUp = createLucideIcon("chevron-up", __iconNode$88);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevrons-down-up.js
var __iconNode$87, ChevronsDownUp;
var init_chevrons_down_up = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$87 = [["path", {
		d: "m7 20 5-5 5 5",
		key: "13a0gw"
	}], ["path", {
		d: "m7 4 5 5 5-5",
		key: "1kwcof"
	}]];
	ChevronsDownUp = createLucideIcon("chevrons-down-up", __iconNode$87);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js
var __iconNode$86, ChevronsUpDown;
var init_chevrons_up_down = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$86 = [["path", {
		d: "m7 15 5 5 5-5",
		key: "1hf1tw"
	}], ["path", {
		d: "m7 9 5-5 5 5",
		key: "sgt6xg"
	}]];
	ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$86);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/circle-alert.js
var __iconNode$85, CircleAlert;
var init_circle_alert = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$85 = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12",
			key: "1pkeuh"
		}],
		["line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16",
			key: "4dfq90"
		}]
	];
	CircleAlert = createLucideIcon("circle-alert", __iconNode$85);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/circle-check-big.js
var __iconNode$84, CircleCheckBig;
var init_circle_check_big = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$84 = [["path", {
		d: "M21.801 10A10 10 0 1 1 17 3.335",
		key: "yps3ct"
	}], ["path", {
		d: "m9 11 3 3L22 4",
		key: "1pflzl"
	}]];
	CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$84);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/circle-check.js
var __iconNode$83, CircleCheck;
var init_circle_check = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$83 = [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]];
	CircleCheck = createLucideIcon("circle-check", __iconNode$83);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/circle-question-mark.js
var __iconNode$82, CircleQuestionMark;
var init_circle_question_mark = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$82 = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
			key: "1u773s"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	];
	CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$82);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/circle-x.js
var __iconNode$81, CircleX;
var init_circle_x = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$81 = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	];
	CircleX = createLucideIcon("circle-x", __iconNode$81);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/cloud-upload.js
var __iconNode$80, CloudUpload;
var init_cloud_upload = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$80 = [
		["path", {
			d: "M12 13v8",
			key: "1l5pq0"
		}],
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "m8 17 4-4 4 4",
			key: "1quai1"
		}]
	];
	CloudUpload = createLucideIcon("cloud-upload", __iconNode$80);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/code-xml.js
var __iconNode$79, CodeXml;
var init_code_xml = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$79 = [
		["path", {
			d: "m18 16 4-4-4-4",
			key: "1inbqp"
		}],
		["path", {
			d: "m6 8-4 4 4 4",
			key: "15zrgr"
		}],
		["path", {
			d: "m14.5 4-5 16",
			key: "e7oirm"
		}]
	];
	CodeXml = createLucideIcon("code-xml", __iconNode$79);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/code.js
var __iconNode$78, Code;
var init_code = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$78 = [["path", {
		d: "m16 18 6-6-6-6",
		key: "eg8j8"
	}], ["path", {
		d: "m8 6-6 6 6 6",
		key: "ppft3o"
	}]];
	Code = createLucideIcon("code", __iconNode$78);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/compass.js
var __iconNode$77, Compass;
var init_compass = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$77 = [["path", {
		d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
		key: "9ktpf1"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]];
	Compass = createLucideIcon("compass", __iconNode$77);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/copy.js
var __iconNode$76, Copy;
var init_copy = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$76 = [["rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2",
		key: "17jyea"
	}], ["path", {
		d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
		key: "zix9uf"
	}]];
	Copy = createLucideIcon("copy", __iconNode$76);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/corner-down-left.js
var __iconNode$75, CornerDownLeft;
var init_corner_down_left = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$75 = [["path", {
		d: "M20 4v7a4 4 0 0 1-4 4H4",
		key: "6o5b7l"
	}], ["path", {
		d: "m9 10-5 5 5 5",
		key: "1kshq7"
	}]];
	CornerDownLeft = createLucideIcon("corner-down-left", __iconNode$75);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/corner-left-up.js
var __iconNode$74, CornerLeftUp;
var init_corner_left_up = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$74 = [["path", {
		d: "M14 9 9 4 4 9",
		key: "1af5af"
	}], ["path", {
		d: "M20 20h-7a4 4 0 0 1-4-4V4",
		key: "1blwi3"
	}]];
	CornerLeftUp = createLucideIcon("corner-left-up", __iconNode$74);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/credit-card.js
var __iconNode$73, CreditCard;
var init_credit_card = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$73 = [["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "5",
		rx: "2",
		key: "ynyp8z"
	}], ["line", {
		x1: "2",
		x2: "22",
		y1: "10",
		y2: "10",
		key: "1b3vmo"
	}]];
	CreditCard = createLucideIcon("credit-card", __iconNode$73);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/database.js
var __iconNode$72, Database;
var init_database = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$72 = [
		["ellipse", {
			cx: "12",
			cy: "5",
			rx: "9",
			ry: "3",
			key: "msslwz"
		}],
		["path", {
			d: "M3 5V19A9 3 0 0 0 21 19V5",
			key: "1wlel7"
		}],
		["path", {
			d: "M3 12A9 3 0 0 0 21 12",
			key: "mv7ke4"
		}]
	];
	Database = createLucideIcon("database", __iconNode$72);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/download.js
var __iconNode$71, Download;
var init_download = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$71 = [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	];
	Download = createLucideIcon("download", __iconNode$71);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js
var __iconNode$70, EllipsisVertical;
var init_ellipsis_vertical = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$70 = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "12",
			cy: "5",
			r: "1",
			key: "gxeob9"
		}],
		["circle", {
			cx: "12",
			cy: "19",
			r: "1",
			key: "lyex9k"
		}]
	];
	EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$70);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/ellipsis.js
var __iconNode$69, Ellipsis;
var init_ellipsis = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$69 = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}]
	];
	Ellipsis = createLucideIcon("ellipsis", __iconNode$69);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/eye.js
var __iconNode$68, Eye;
var init_eye = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$68 = [["path", {
		d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
		key: "1nclc0"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]];
	Eye = createLucideIcon("eye", __iconNode$68);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/file-code-corner.js
var __iconNode$67, FileCodeCorner;
var init_file_code_corner = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$67 = [
		["path", {
			d: "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",
			key: "1wthlu"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "m5 16-3 3 3 3",
			key: "331omg"
		}],
		["path", {
			d: "m9 22 3-3-3-3",
			key: "lsp7cz"
		}]
	];
	FileCodeCorner = createLucideIcon("file-code-corner", __iconNode$67);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/file-plus-corner.js
var __iconNode$66, FilePlusCorner;
var init_file_plus_corner = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$66 = [
		["path", {
			d: "M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35",
			key: "17jvcc"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M14 19h6",
			key: "bvotb8"
		}],
		["path", {
			d: "M17 16v6",
			key: "18yu1i"
		}]
	];
	FilePlusCorner = createLucideIcon("file-plus-corner", __iconNode$66);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/file-text.js
var __iconNode$65, FileText;
var init_file_text = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$65 = [
		["path", {
			d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
			key: "1oefj6"
		}],
		["path", {
			d: "M14 2v5a1 1 0 0 0 1 1h5",
			key: "wfsgrz"
		}],
		["path", {
			d: "M10 9H8",
			key: "b1mrlr"
		}],
		["path", {
			d: "M16 13H8",
			key: "t4e002"
		}],
		["path", {
			d: "M16 17H8",
			key: "z1uh3a"
		}]
	];
	FileText = createLucideIcon("file-text", __iconNode$65);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/files.js
var __iconNode$64, Files;
var init_files = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$64 = [
		["path", {
			d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8",
			key: "14sh0y"
		}],
		["path", {
			d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
			key: "1970lx"
		}],
		["path", {
			d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1",
			key: "l4dndm"
		}]
	];
	Files = createLucideIcon("files", __iconNode$64);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/folder-lock.js
var __iconNode$63, FolderLock;
var init_folder_lock = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$63 = [
		["rect", {
			width: "8",
			height: "5",
			x: "14",
			y: "17",
			rx: "1",
			key: "19aais"
		}],
		["path", {
			d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",
			key: "1w6v7t"
		}],
		["path", {
			d: "M20 17v-2a2 2 0 1 0-4 0v2",
			key: "pwaxnr"
		}]
	];
	FolderLock = createLucideIcon("folder-lock", __iconNode$63);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/folder-open.js
var __iconNode$62, FolderOpen;
var init_folder_open = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$62 = [["path", {
		d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
		key: "usdka0"
	}]];
	FolderOpen = createLucideIcon("folder-open", __iconNode$62);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/folder-plus.js
var __iconNode$61, FolderPlus;
var init_folder_plus = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$61 = [
		["path", {
			d: "M12 10v6",
			key: "1bos4e"
		}],
		["path", {
			d: "M9 13h6",
			key: "1uhe8q"
		}],
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
			key: "1kt360"
		}]
	];
	FolderPlus = createLucideIcon("folder-plus", __iconNode$61);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/folder.js
var __iconNode$60, Folder;
var init_folder = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$60 = [["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}]];
	Folder = createLucideIcon("folder", __iconNode$60);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/git-branch.js
var __iconNode$59, GitBranch;
var init_git_branch = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$59 = [
		["line", {
			x1: "6",
			x2: "6",
			y1: "3",
			y2: "15",
			key: "17qcm7"
		}],
		["circle", {
			cx: "18",
			cy: "6",
			r: "3",
			key: "1h7g24"
		}],
		["circle", {
			cx: "6",
			cy: "18",
			r: "3",
			key: "fqmcym"
		}],
		["path", {
			d: "M18 9a9 9 0 0 1-9 9",
			key: "n2h4wq"
		}]
	];
	GitBranch = createLucideIcon("git-branch", __iconNode$59);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/globe-lock.js
var __iconNode$58, GlobeLock;
var init_globe_lock = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$58 = [
		["path", {
			d: "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13",
			key: "qkt0x6"
		}],
		["path", {
			d: "M2 12h8.5",
			key: "ovaggd"
		}],
		["path", {
			d: "M20 6V4a2 2 0 1 0-4 0v2",
			key: "1of5e8"
		}],
		["rect", {
			width: "8",
			height: "5",
			x: "14",
			y: "6",
			rx: "1",
			key: "1fmf51"
		}]
	];
	GlobeLock = createLucideIcon("globe-lock", __iconNode$58);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/grid-2x2-plus.js
var __iconNode$57, Grid2x2Plus;
var init_grid_2x2_plus = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$57 = [
		["path", {
			d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
			key: "11za1p"
		}],
		["path", {
			d: "M16 19h6",
			key: "xwg31i"
		}],
		["path", {
			d: "M19 22v-6",
			key: "qhmiwi"
		}]
	];
	Grid2x2Plus = createLucideIcon("grid-2x2-plus", __iconNode$57);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/hard-drive.js
var __iconNode$56, HardDrive;
var init_hard_drive = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$56 = [
		["line", {
			x1: "22",
			x2: "2",
			y1: "12",
			y2: "12",
			key: "1y58io"
		}],
		["path", {
			d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
			key: "oot6mr"
		}],
		["line", {
			x1: "6",
			x2: "6.01",
			y1: "16",
			y2: "16",
			key: "sgf278"
		}],
		["line", {
			x1: "10",
			x2: "10.01",
			y1: "16",
			y2: "16",
			key: "1l4acy"
		}]
	];
	HardDrive = createLucideIcon("hard-drive", __iconNode$56);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/history.js
var __iconNode$55, History;
var init_history = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$55 = [
		["path", {
			d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "1357e3"
		}],
		["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}],
		["path", {
			d: "M12 7v5l4 2",
			key: "1fdv2h"
		}]
	];
	History = createLucideIcon("history", __iconNode$55);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/image-down.js
var __iconNode$54, ImageDown;
var init_image_down = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$54 = [
		["path", {
			d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
			key: "9csbqa"
		}],
		["path", {
			d: "m14 19 3 3v-5.5",
			key: "9ldu5r"
		}],
		["path", {
			d: "m17 22 3-3",
			key: "1nkfve"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}]
	];
	ImageDown = createLucideIcon("image-down", __iconNode$54);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/info.js
var __iconNode$53, Info;
var init_info = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$53 = [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	];
	Info = createLucideIcon("info", __iconNode$53);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/key-round.js
var __iconNode$52, KeyRound;
var init_key_round = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$52 = [["path", {
		d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
		key: "1s6t7t"
	}], ["circle", {
		cx: "16.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "w0ekpg"
	}]];
	KeyRound = createLucideIcon("key-round", __iconNode$52);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/keyboard.js
var __iconNode$51, Keyboard;
var init_keyboard = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$51 = [
		["path", {
			d: "M10 8h.01",
			key: "1r9ogq"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M14 8h.01",
			key: "1primd"
		}],
		["path", {
			d: "M16 12h.01",
			key: "1l6xoz"
		}],
		["path", {
			d: "M18 8h.01",
			key: "emo2bl"
		}],
		["path", {
			d: "M6 8h.01",
			key: "x9i8wu"
		}],
		["path", {
			d: "M7 16h10",
			key: "wp8him"
		}],
		["path", {
			d: "M8 12h.01",
			key: "czm47f"
		}],
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}]
	];
	Keyboard = createLucideIcon("keyboard", __iconNode$51);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/layout-grid.js
var __iconNode$50, LayoutGrid;
var init_layout_grid = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$50 = [
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "1g98yp"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "3",
			rx: "1",
			key: "6d4xhi"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1",
			key: "nxv5o0"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "1bb6yr"
		}]
	];
	LayoutGrid = createLucideIcon("layout-grid", __iconNode$50);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/layout-panel-top.js
var __iconNode$49, LayoutPanelTop;
var init_layout_panel_top = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$49 = [
		["rect", {
			width: "18",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "f1a2em"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "1bb6yr"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1",
			key: "nxv5o0"
		}]
	];
	LayoutPanelTop = createLucideIcon("layout-panel-top", __iconNode$49);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/link-2.js
var __iconNode$48, Link2;
var init_link_2 = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$48 = [
		["path", {
			d: "M9 17H7A5 5 0 0 1 7 7h2",
			key: "8i5ue5"
		}],
		["path", {
			d: "M15 7h2a5 5 0 1 1 0 10h-2",
			key: "1b9ql8"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "12",
			y2: "12",
			key: "1jonct"
		}]
	];
	Link2 = createLucideIcon("link-2", __iconNode$48);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/list-todo.js
var __iconNode$47, ListTodo;
var init_list_todo = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$47 = [
		["path", {
			d: "M13 5h8",
			key: "a7qcls"
		}],
		["path", {
			d: "M13 12h8",
			key: "h98zly"
		}],
		["path", {
			d: "M13 19h8",
			key: "c3s6r1"
		}],
		["path", {
			d: "m3 17 2 2 4-4",
			key: "1jhpwq"
		}],
		["rect", {
			x: "3",
			y: "4",
			width: "6",
			height: "6",
			rx: "1",
			key: "cif1o7"
		}]
	];
	ListTodo = createLucideIcon("list-todo", __iconNode$47);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/list.js
var __iconNode$46, List;
var init_list = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$46 = [
		["path", {
			d: "M3 5h.01",
			key: "18ugdj"
		}],
		["path", {
			d: "M3 12h.01",
			key: "nlz23k"
		}],
		["path", {
			d: "M3 19h.01",
			key: "noohij"
		}],
		["path", {
			d: "M8 5h13",
			key: "1pao27"
		}],
		["path", {
			d: "M8 12h13",
			key: "1za7za"
		}],
		["path", {
			d: "M8 19h13",
			key: "m83p4d"
		}]
	];
	List = createLucideIcon("list", __iconNode$46);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/loader-circle.js
var __iconNode$45, LoaderCircle;
var init_loader_circle = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$45 = [["path", {
		d: "M21 12a9 9 0 1 1-6.219-8.56",
		key: "13zald"
	}]];
	LoaderCircle = createLucideIcon("loader-circle", __iconNode$45);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/loader.js
var __iconNode$44, Loader;
var init_loader = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$44 = [
		["path", {
			d: "M12 2v4",
			key: "3427ic"
		}],
		["path", {
			d: "m16.2 7.8 2.9-2.9",
			key: "r700ao"
		}],
		["path", {
			d: "M18 12h4",
			key: "wj9ykh"
		}],
		["path", {
			d: "m16.2 16.2 2.9 2.9",
			key: "1bxg5t"
		}],
		["path", {
			d: "M12 18v4",
			key: "jadmvz"
		}],
		["path", {
			d: "m4.9 19.1 2.9-2.9",
			key: "bwix9q"
		}],
		["path", {
			d: "M2 12h4",
			key: "j09sii"
		}],
		["path", {
			d: "m4.9 4.9 2.9 2.9",
			key: "giyufr"
		}]
	];
	Loader = createLucideIcon("loader", __iconNode$44);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/lock-keyhole.js
var __iconNode$43, LockKeyhole;
var init_lock_keyhole = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$43 = [
		["circle", {
			cx: "12",
			cy: "16",
			r: "1",
			key: "1au0dj"
		}],
		["rect", {
			x: "3",
			y: "10",
			width: "18",
			height: "12",
			rx: "2",
			key: "6s8ecr"
		}],
		["path", {
			d: "M7 10V7a5 5 0 0 1 10 0v3",
			key: "1pqi11"
		}]
	];
	LockKeyhole = createLucideIcon("lock-keyhole", __iconNode$43);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/lock.js
var __iconNode$42, Lock;
var init_lock = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$42 = [["rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2",
		key: "1w4ew1"
	}], ["path", {
		d: "M7 11V7a5 5 0 0 1 10 0v4",
		key: "fwvmzm"
	}]];
	Lock = createLucideIcon("lock", __iconNode$42);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/map-pin.js
var __iconNode$41, MapPin;
var init_map_pin = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$41 = [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["circle", {
		cx: "12",
		cy: "10",
		r: "3",
		key: "ilqhr7"
	}]];
	MapPin = createLucideIcon("map-pin", __iconNode$41);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/maximize-2.js
var __iconNode$40, Maximize2;
var init_maximize_2 = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$40 = [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "m21 3-7 7",
			key: "1l2asr"
		}],
		["path", {
			d: "m3 21 7-7",
			key: "tjx5ai"
		}],
		["path", {
			d: "M9 21H3v-6",
			key: "wtvkvv"
		}]
	];
	Maximize2 = createLucideIcon("maximize-2", __iconNode$40);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/message-square-text.js
var __iconNode$39, MessageSquareText;
var init_message_square_text = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$39 = [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M7 11h10",
			key: "1twpyw"
		}],
		["path", {
			d: "M7 15h6",
			key: "d9of3u"
		}],
		["path", {
			d: "M7 7h8",
			key: "af5zfr"
		}]
	];
	MessageSquareText = createLucideIcon("message-square-text", __iconNode$39);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/minimize-2.js
var __iconNode$38, Minimize2;
var init_minimize_2 = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$38 = [
		["path", {
			d: "m14 10 7-7",
			key: "oa77jy"
		}],
		["path", {
			d: "M20 10h-6V4",
			key: "mjg0md"
		}],
		["path", {
			d: "m3 21 7-7",
			key: "tjx5ai"
		}],
		["path", {
			d: "M4 14h6v6",
			key: "rmj7iw"
		}]
	];
	Minimize2 = createLucideIcon("minimize-2", __iconNode$38);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/minus.js
var __iconNode$37, Minus;
var init_minus = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$37 = [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}]];
	Minus = createLucideIcon("minus", __iconNode$37);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/monitor.js
var __iconNode$36, Monitor;
var init_monitor = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$36 = [
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "21",
			y2: "21",
			key: "1svkeh"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "17",
			y2: "21",
			key: "vw1qmm"
		}]
	];
	Monitor = createLucideIcon("monitor", __iconNode$36);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/package-check.js
var __iconNode$35, PackageCheck;
var init_package_check = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$35 = [
		["path", {
			d: "m16 16 2 2 4-4",
			key: "gfu2re"
		}],
		["path", {
			d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
			key: "e7tb2h"
		}],
		["path", {
			d: "m7.5 4.27 9 5.15",
			key: "1c824w"
		}],
		["polyline", {
			points: "3.29 7 12 12 20.71 7",
			key: "ousv84"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "12",
			key: "a4e8g8"
		}]
	];
	PackageCheck = createLucideIcon("package-check", __iconNode$35);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/pencil-line.js
var __iconNode$34, PencilLine;
var init_pencil_line = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$34 = [
		["path", {
			d: "M13 21h8",
			key: "1jsn5i"
		}],
		["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}],
		["path", {
			d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
			key: "1a8usu"
		}]
	];
	PencilLine = createLucideIcon("pencil-line", __iconNode$34);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/pencil.js
var __iconNode$33, Pencil;
var init_pencil = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$33 = [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]];
	Pencil = createLucideIcon("pencil", __iconNode$33);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/pickaxe.js
var __iconNode$32, Pickaxe;
var init_pickaxe = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$32 = [
		["path", {
			d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999",
			key: "1lw9ds"
		}],
		["path", {
			d: "M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024",
			key: "ffj4ej"
		}],
		["path", {
			d: "M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069",
			key: "8tj4zw"
		}],
		["path", {
			d: "M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z",
			key: "hh6h97"
		}]
	];
	Pickaxe = createLucideIcon("pickaxe", __iconNode$32);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/plug-zap.js
var __iconNode$31, PlugZap;
var init_plug_zap = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$31 = [
		["path", {
			d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
			key: "goz73y"
		}],
		["path", {
			d: "m2 22 3-3",
			key: "19mgm9"
		}],
		["path", {
			d: "M7.5 13.5 10 11",
			key: "7xgeeb"
		}],
		["path", {
			d: "M10.5 16.5 13 14",
			key: "10btkg"
		}],
		["path", {
			d: "m18 3-4 4h6l-4 4",
			key: "16psg9"
		}]
	];
	PlugZap = createLucideIcon("plug-zap", __iconNode$31);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/plus.js
var __iconNode$30, Plus;
var init_plus = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$30 = [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]];
	Plus = createLucideIcon("plus", __iconNode$30);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/puzzle.js
var __iconNode$29, Puzzle;
var init_puzzle = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$29 = [["path", {
		d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
		key: "w46dr5"
	}]];
	Puzzle = createLucideIcon("puzzle", __iconNode$29);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/refresh-cw.js
var __iconNode$28, RefreshCw;
var init_refresh_cw = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$28 = [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	];
	RefreshCw = createLucideIcon("refresh-cw", __iconNode$28);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/scan-search.js
var __iconNode$27, ScanSearch;
var init_scan_search = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$27 = [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["path", {
			d: "m16 16-1.9-1.9",
			key: "1dq9hf"
		}]
	];
	ScanSearch = createLucideIcon("scan-search", __iconNode$27);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/search-x.js
var __iconNode$26, SearchX;
var init_search_x = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$26 = [
		["path", {
			d: "m13.5 8.5-5 5",
			key: "1cs55j"
		}],
		["path", {
			d: "m8.5 8.5 5 5",
			key: "a8mexj"
		}],
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["path", {
			d: "m21 21-4.3-4.3",
			key: "1qie3q"
		}]
	];
	SearchX = createLucideIcon("search-x", __iconNode$26);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/search.js
var __iconNode$25, Search;
var init_search = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$25 = [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]];
	Search = createLucideIcon("search", __iconNode$25);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/send.js
var __iconNode$24, Send;
var init_send = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$24 = [["path", {
		d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
		key: "1ffxy3"
	}], ["path", {
		d: "m21.854 2.147-10.94 10.939",
		key: "12cjpa"
	}]];
	Send = createLucideIcon("send", __iconNode$24);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/settings.js
var __iconNode$23, Settings;
var init_settings = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$23 = [["path", {
		d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
		key: "1i5ecw"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]];
	Settings = createLucideIcon("settings", __iconNode$23);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/share-2.js
var __iconNode$22, Share2;
var init_share_2 = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$22 = [
		["circle", {
			cx: "18",
			cy: "5",
			r: "3",
			key: "gq8acd"
		}],
		["circle", {
			cx: "6",
			cy: "12",
			r: "3",
			key: "w7nqdw"
		}],
		["circle", {
			cx: "18",
			cy: "19",
			r: "3",
			key: "1xt0gg"
		}],
		["line", {
			x1: "8.59",
			x2: "15.42",
			y1: "13.51",
			y2: "17.49",
			key: "47mynk"
		}],
		["line", {
			x1: "15.41",
			x2: "8.59",
			y1: "6.51",
			y2: "10.49",
			key: "1n3mei"
		}]
	];
	Share2 = createLucideIcon("share-2", __iconNode$22);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/shield-check.js
var __iconNode$21, ShieldCheck;
var init_shield_check = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$21 = [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]];
	ShieldCheck = createLucideIcon("shield-check", __iconNode$21);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/shield.js
var __iconNode$20, Shield;
var init_shield = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$20 = [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}]];
	Shield = createLucideIcon("shield", __iconNode$20);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/sigma.js
var __iconNode$19, Sigma;
var init_sigma = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$19 = [["path", {
		d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
		key: "wuwx1p"
	}]];
	Sigma = createLucideIcon("sigma", __iconNode$19);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js
var __iconNode$18, SlidersHorizontal;
var init_sliders_horizontal = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$18 = [
		["path", {
			d: "M10 5H3",
			key: "1qgfaw"
		}],
		["path", {
			d: "M12 19H3",
			key: "yhmn1j"
		}],
		["path", {
			d: "M14 3v4",
			key: "1sua03"
		}],
		["path", {
			d: "M16 17v4",
			key: "1q0r14"
		}],
		["path", {
			d: "M21 12h-9",
			key: "1o4lsq"
		}],
		["path", {
			d: "M21 19h-5",
			key: "1rlt1p"
		}],
		["path", {
			d: "M21 5h-7",
			key: "1oszz2"
		}],
		["path", {
			d: "M8 10v4",
			key: "tgpxqk"
		}],
		["path", {
			d: "M8 12H3",
			key: "a7s4jb"
		}]
	];
	SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode$18);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/sparkle.js
var __iconNode$17, Sparkle;
var init_sparkle = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$17 = [["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}]];
	Sparkle = createLucideIcon("sparkle", __iconNode$17);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/sparkles.js
var __iconNode$16, Sparkles;
var init_sparkles = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$16 = [
		["path", {
			d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
			key: "1s2grr"
		}],
		["path", {
			d: "M20 2v4",
			key: "1rf3ol"
		}],
		["path", {
			d: "M22 4h-4",
			key: "gwowj6"
		}],
		["circle", {
			cx: "4",
			cy: "20",
			r: "2",
			key: "6kqj1y"
		}]
	];
	Sparkles = createLucideIcon("sparkles", __iconNode$16);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/swatch-book.js
var __iconNode$15, SwatchBook;
var init_swatch_book = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$15 = [
		["path", {
			d: "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z",
			key: "1ldrpk"
		}],
		["path", {
			d: "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7",
			key: "11i5po"
		}],
		["path", {
			d: "M 7 17h.01",
			key: "1euzgo"
		}],
		["path", {
			d: "m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",
			key: "o2gii7"
		}]
	];
	SwatchBook = createLucideIcon("swatch-book", __iconNode$15);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/table-2.js
var __iconNode$14, Table2;
var init_table_2 = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$14 = [["path", {
		d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
		key: "gugj83"
	}]];
	Table2 = createLucideIcon("table-2", __iconNode$14);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/tags.js
var __iconNode$13, Tags;
var init_tags = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$13 = [
		["path", {
			d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
			key: "16rjxf"
		}],
		["path", {
			d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193",
			key: "178nd4"
		}],
		["circle", {
			cx: "10.5",
			cy: "6.5",
			r: ".5",
			fill: "currentColor",
			key: "12ikhr"
		}]
	];
	Tags = createLucideIcon("tags", __iconNode$13);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/tool-case.js
var __iconNode$12, ToolCase;
var init_tool_case = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$12 = [
		["path", {
			d: "M10 15h4",
			key: "192ueg"
		}],
		["path", {
			d: "m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27",
			key: "xbnumr"
		}],
		["path", {
			d: "m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122",
			key: "eaw7gc"
		}],
		["path", {
			d: "M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
			key: "1vaooh"
		}]
	];
	ToolCase = createLucideIcon("tool-case", __iconNode$12);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/trash-2.js
var __iconNode$11, Trash2;
var init_trash_2 = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$11 = [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	];
	Trash2 = createLucideIcon("trash-2", __iconNode$11);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/triangle-alert.js
var __iconNode$10, TriangleAlert;
var init_triangle_alert = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$10 = [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	];
	TriangleAlert = createLucideIcon("triangle-alert", __iconNode$10);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/type.js
var __iconNode$9, Type;
var init_type = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$9 = [
		["path", {
			d: "M12 4v16",
			key: "1654pz"
		}],
		["path", {
			d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",
			key: "e0r10z"
		}],
		["path", {
			d: "M9 20h6",
			key: "s66wpe"
		}]
	];
	Type = createLucideIcon("type", __iconNode$9);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/upload.js
var __iconNode$8, Upload;
var init_upload = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$8 = [
		["path", {
			d: "M12 3v12",
			key: "1x0j5s"
		}],
		["path", {
			d: "m17 8-5-5-5 5",
			key: "7q97r8"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}]
	];
	Upload = createLucideIcon("upload", __iconNode$8);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/user-round-cog.js
var __iconNode$7, UserRoundCog;
var init_user_round_cog = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$7 = [
		["path", {
			d: "m14.305 19.53.923-.382",
			key: "3m78fa"
		}],
		["path", {
			d: "m15.228 16.852-.923-.383",
			key: "npixar"
		}],
		["path", {
			d: "m16.852 15.228-.383-.923",
			key: "5xggr7"
		}],
		["path", {
			d: "m16.852 20.772-.383.924",
			key: "dpfhf9"
		}],
		["path", {
			d: "m19.148 15.228.383-.923",
			key: "1reyyz"
		}],
		["path", {
			d: "m19.53 21.696-.382-.924",
			key: "1goivc"
		}],
		["path", {
			d: "M2 21a8 8 0 0 1 10.434-7.62",
			key: "1yezr2"
		}],
		["path", {
			d: "m20.772 16.852.924-.383",
			key: "htqkph"
		}],
		["path", {
			d: "m20.772 19.148.924.383",
			key: "9w9pjp"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	];
	UserRoundCog = createLucideIcon("user-round-cog", __iconNode$7);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/user-round.js
var __iconNode$6, UserRound;
var init_user_round = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$6 = [["circle", {
		cx: "12",
		cy: "8",
		r: "5",
		key: "1hypcn"
	}], ["path", {
		d: "M20 21a8 8 0 0 0-16 0",
		key: "rfgkzh"
	}]];
	UserRound = createLucideIcon("user-round", __iconNode$6);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/users.js
var __iconNode$5, Users;
var init_users = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$5 = [
		["path", {
			d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
			key: "1yyitq"
		}],
		["path", {
			d: "M16 3.128a4 4 0 0 1 0 7.744",
			key: "16gr8j"
		}],
		["path", {
			d: "M22 21v-2a4 4 0 0 0-3-3.87",
			key: "kshegd"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}]
	];
	Users = createLucideIcon("users", __iconNode$5);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/variable.js
var __iconNode$4, Variable;
var init_variable = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$4 = [
		["path", {
			d: "M8 21s-4-3-4-9 4-9 4-9",
			key: "uto9ud"
		}],
		["path", {
			d: "M16 3s4 3 4 9-4 9-4 9",
			key: "4w2vsq"
		}],
		["line", {
			x1: "15",
			x2: "9",
			y1: "9",
			y2: "15",
			key: "f7djnv"
		}],
		["line", {
			x1: "9",
			x2: "15",
			y1: "9",
			y2: "15",
			key: "1shsy8"
		}]
	];
	Variable = createLucideIcon("variable", __iconNode$4);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/waves.js
var __iconNode$3, Waves;
var init_waves = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$3 = [
		["path", {
			d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "knzxuh"
		}],
		["path", {
			d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "2jd2cc"
		}],
		["path", {
			d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "rd2r6e"
		}]
	];
	Waves = createLucideIcon("waves", __iconNode$3);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/workflow.js
var __iconNode$2, Workflow;
var init_workflow = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$2 = [
		["rect", {
			width: "8",
			height: "8",
			x: "3",
			y: "3",
			rx: "2",
			key: "by2w9f"
		}],
		["path", {
			d: "M7 11v4a2 2 0 0 0 2 2h4",
			key: "xkn7yn"
		}],
		["rect", {
			width: "8",
			height: "8",
			x: "13",
			y: "13",
			rx: "2",
			key: "1cgmvn"
		}]
	];
	Workflow = createLucideIcon("workflow", __iconNode$2);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/x.js
var __iconNode$1, X;
var init_x = __esmMin((() => {
	init_createLucideIcon();
	__iconNode$1 = [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]];
	X = createLucideIcon("x", __iconNode$1);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/zap.js
var __iconNode, Zap;
var init_zap = __esmMin((() => {
	init_createLucideIcon();
	__iconNode = [["path", {
		d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
		key: "1xq2db"
	}]];
	Zap = createLucideIcon("zap", __iconNode);
}));
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/lucide-react.js
var init_lucide_react = __esmMin((() => {
	init_createLucideIcon();
	init_circle_alert();
	init_circle_check_big();
	init_circle_check();
	init_circle_question_mark();
	init_circle_x();
	init_cloud_upload();
	init_code_xml();
	init_ellipsis_vertical();
	init_ellipsis();
	init_file_code_corner();
	init_file_plus_corner();
	init_grid_2x2_plus();
	init_loader_circle();
	init_plug_zap();
	init_sparkles();
	init_triangle_alert();
	init_user_round_cog();
	init_user_round();
	init_archive();
	init_arrow_left_right();
	init_book_open_check();
	init_book_open();
	init_box();
	init_building_2();
	init_cable();
	init_calendar_days();
	init_camera();
	init_chart_gantt();
	init_check();
	init_chevron_down();
	init_chevron_left();
	init_chevron_up();
	init_chevron_right();
	init_chevrons_down_up();
	init_chevrons_up_down();
	init_code();
	init_compass();
	init_copy();
	init_corner_down_left();
	init_corner_left_up();
	init_credit_card();
	init_database();
	init_download();
	init_eye();
	init_file_text();
	init_files();
	init_folder_lock();
	init_folder_open();
	init_folder_plus();
	init_folder();
	init_git_branch();
	init_globe_lock();
	init_hard_drive();
	init_history();
	init_image_down();
	init_info();
	init_key_round();
	init_keyboard();
	init_layout_grid();
	init_layout_panel_top();
	init_link_2();
	init_list_todo();
	init_list();
	init_loader();
	init_lock_keyhole();
	init_lock();
	init_map_pin();
	init_maximize_2();
	init_message_square_text();
	init_minimize_2();
	init_minus();
	init_monitor();
	init_package_check();
	init_pencil_line();
	init_pencil();
	init_pickaxe();
	init_plus();
	init_puzzle();
	init_refresh_cw();
	init_scan_search();
	init_search_x();
	init_search();
	init_send();
	init_settings();
	init_share_2();
	init_shield_check();
	init_shield();
	init_sigma();
	init_sliders_horizontal();
	init_sparkle();
	init_swatch_book();
	init_table_2();
	init_tags();
	init_tool_case();
	init_trash_2();
	init_type();
	init_upload();
	init_users();
	init_variable();
	init_waves();
	init_workflow();
	init_x();
	init_zap();
	init_Icon();
}));
//#endregion
export { Keyboard as $, RefreshCw as A, CircleQuestionMark as At, Minimize2 as B, Check as Bt, ShieldCheck as C, CornerDownLeft as Ct, Search as D, CodeXml as Dt, Send as E, Code as Et, Pencil as F, ChevronsDownUp as Ft, LockKeyhole as G, Building2 as Gt, Maximize2 as H, Camera as Ht, PencilLine as I, ChevronUp as It, List as J, BookOpenCheck as Jt, Loader as K, Box as Kt, PackageCheck as L, ChevronRight as Lt, Plus as M, CircleCheckBig as Mt, PlugZap as N, CircleAlert as Nt, SearchX as O, CloudUpload as Ot, Pickaxe as P, ChevronsUpDown as Pt, LayoutGrid as Q, Monitor as R, ChevronLeft as Rt, Shield as S, CornerLeftUp as St, Settings as T, Compass as Tt, MapPin as U, CalendarDays as Ut, MessageSquareText as V, ChartGantt as Vt, Lock as W, Cable as Wt, Link2 as X, Archive as Xt, ListTodo as Y, ArrowLeftRight as Yt, LayoutPanelTop as Z, createLucideIcon as Zt, SwatchBook as _, Ellipsis as _t, Waves as a, Grid2x2Plus as at, SlidersHorizontal as b, Database as bt, UserRound as c, Folder as ct, Type as d, FolderLock as dt, KeyRound as et, TriangleAlert as f, Files as ft, Table2 as g, Eye as gt, Tags as h, FileCodeCorner as ht, Workflow as i, HardDrive as it, Puzzle as j, CircleCheck as jt, ScanSearch as k, CircleX as kt, UserRoundCog as l, FolderPlus as lt, ToolCase as m, FilePlusCorner as mt, Zap as n, ImageDown as nt, Variable as o, GlobeLock as ot, Trash2 as p, FileText as pt, LoaderCircle as q, BookOpen as qt, X as r, History as rt, Users as s, GitBranch as st, init_lucide_react as t, Info as tt, Upload as u, FolderOpen as ut, Sparkles as v, EllipsisVertical as vt, Share2 as w, Copy as wt, Sigma as x, CreditCard as xt, Sparkle as y, Download as yt, Minus as z, ChevronDown as zt };
